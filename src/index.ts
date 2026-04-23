/**
 * agents-radar: daily digest for OpenClaw ecosystem and embedded AI (Orange Pi, RKLLM, RKNPU).
 *
 * Environment variables:
 *   GITHUB_TOKEN        - GitHub token for API access (required)
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 *   OPENAI_BASE_URL     - Local LLM endpoint (default: http://localhost:20128/v1)
 *   OPENAI_MODEL        - Model name (default: gpt-4o)
 */

// Load environment variables from .env file
import "dotenv/config";

import {
  type RepoConfig,
  type GitHubItem,
  type GitHubRelease,
  fetchRecentItems,
  fetchRecentReleases,
  createGitHubIssue,
} from "./github.ts";
import {
  type RepoDigest,
  buildPeerPrompt,
  buildPeersComparisonPrompt,
  buildTrendingPrompt,
  buildEmbeddedAiPrompt,
  buildEmbeddedAiComparisonPrompt,
} from "./prompts.ts";
import { callLlm, saveFile, autoGenFooter, issueTitle } from "./report.ts";
import { fetchTrendingData, type TrendingData } from "./trending.ts";
import { loadConfig } from "./config.ts";

// ---------------------------------------------------------------------------
// Repo config — loaded from config.yml, falls back to built-in defaults
// ---------------------------------------------------------------------------

const {
  openclaw: OPENCLAW,
  openclawPeers: OPENCLAW_PEERS,
  embeddedAiRepos: EMBEDDED_AI_REPOS,
} = loadConfig();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RepoFetch {
  cfg: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
}

// ---------------------------------------------------------------------------
// Phase 1: Fetch
// ---------------------------------------------------------------------------

async function fetchAllData(
  since: Date,
): Promise<{
  fetched: RepoFetch[];
  trendingData: TrendingData;
}> {
  const allConfigs = [OPENCLAW, ...OPENCLAW_PEERS, ...EMBEDDED_AI_REPOS];
  console.log(`  Tracking: ${allConfigs.map((r) => r.id).join(", ")}`);

  const [fetched, trendingData] = await Promise.all([
    // Fetch repos sequentially in smaller batches to avoid overwhelming the connection
    (async () => {
      const results: RepoFetch[] = [];
      const batchSize = 3; // Process 3 repos at a time
      
      for (let i = 0; i < allConfigs.length; i += batchSize) {
        const batch = allConfigs.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(async (cfg) => {
            const [issuesRaw, prs, releases] = await Promise.all([
              fetchRecentItems(cfg, "issues", since),
              fetchRecentItems(cfg, "pulls", since),
              fetchRecentReleases(cfg.repo, since),
            ]);
            const issues = issuesRaw.filter((i) => !i.pull_request);
            console.log(
              `  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}`,
            );
            return { cfg, issues, prs, releases };
          }),
        );
        results.push(...batchResults);
        
        // Small delay between batches
        if (i + batchSize < allConfigs.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      return results;
    })(),
    fetchTrendingData().catch(
      (): TrendingData => ({
        trendingRepos: [],
        searchRepos: [],
        trendingFetchSuccess: false,
      }),
    ),
  ]);

  return { fetched, trendingData };
}

// ---------------------------------------------------------------------------
// Phase 2: LLM summaries
// ---------------------------------------------------------------------------

async function generateSummaries(
  fetchedOpenclaw: RepoFetch,
  fetchedPeers: RepoFetch[],
  fetchedEmbeddedAi: RepoFetch[],
  trendingData: TrendingData,
  dateStr: string,
): Promise<{
  openclawSummary: string;
  peerDigests: RepoDigest[];
  embeddedAiDigests: RepoDigest[];
  trendingSummary: string;
}> {
  const noActivity = "Không có hoạt động trong 24 giờ qua.";
  const summaryFailed = "⚠️ Tạo tóm tắt thất bại.";
  const trendingNoData = "⚠️ Dữ liệu xu hướng không khả dụng, không thể tạo báo cáo.";
  const trendingFailed = "⚠️ Tạo báo cáo xu hướng thất bại.";

  const [openclawSummary, peerDigests, embeddedAiDigests, trendingSummary] = await Promise.all([
    (async () => {
      const { cfg, issues, prs, releases } = fetchedOpenclaw;
      const hasData = issues.length || prs.length || releases.length;
      if (!hasData) {
        console.log(`  [openclaw] No activity, skipping LLM call`);
        return noActivity;
      }
      console.log(`  [openclaw] Calling LLM for OpenClaw report...`);
      try {
        return await callLlm(buildPeerPrompt(cfg, issues, prs, releases, dateStr, 50, 30, "vi"));
      } catch (err) {
        console.error(`  [openclaw] LLM call failed: ${err}`);
        return summaryFailed;
      }
    })(),
    Promise.all(
      fetchedPeers.map(async ({ cfg, issues, prs, releases }): Promise<RepoDigest> => {
        const hasData = issues.length || prs.length || releases.length;
        if (!hasData) {
          console.log(`  [${cfg.id}] No activity, skipping LLM call`);
          return { config: cfg, issues, prs, releases, summary: noActivity };
        }
        console.log(`  [${cfg.id}] Calling LLM for peer summary...`);
        try {
          return {
            config: cfg,
            issues,
            prs,
            releases,
            summary: await callLlm(
              buildPeerPrompt(cfg, issues, prs, releases, dateStr, undefined, undefined, "vi"),
            ),
          };
        } catch (err) {
          console.error(`  [${cfg.id}] LLM call failed: ${err}`);
          return { config: cfg, issues, prs, releases, summary: summaryFailed };
        }
      }),
    ),
    Promise.all(
      fetchedEmbeddedAi.map(async ({ cfg, issues, prs, releases }): Promise<RepoDigest> => {
        const hasData = issues.length || prs.length || releases.length;
        if (!hasData) {
          console.log(`  [${cfg.id}] No activity, skipping LLM call`);
          return { config: cfg, issues, prs, releases, summary: noActivity };
        }
        console.log(`  [${cfg.id}] Calling LLM for embedded AI summary...`);
        try {
          return {
            config: cfg,
            issues,
            prs,
            releases,
            summary: await callLlm(buildEmbeddedAiPrompt(cfg, issues, prs, releases, dateStr)),
          };
        } catch (err) {
          console.error(`  [${cfg.id}] LLM call failed: ${err}`);
          return { config: cfg, issues, prs, releases, summary: summaryFailed };
        }
      }),
    ),
    (async () => {
      const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
      if (!hasData) return trendingNoData;
      console.log("  [trending] Calling LLM for trending report...");
      try {
        return await callLlm(buildTrendingPrompt(trendingData, dateStr, "vi"), 6144);
      } catch (err) {
        console.error(`  [trending] LLM call failed: ${err}`);
        return trendingFailed;
      }
    })(),
  ]);

  return { openclawSummary, peerDigests, embeddedAiDigests, trendingSummary };
}

// ---------------------------------------------------------------------------
// Report content builders
// ---------------------------------------------------------------------------

function buildOpenclawReportContent(
  fetchedOpenclaw: RepoFetch,
  peerDigests: RepoDigest[],
  openclawSummary: string,
  peersComparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
): string {
  const { issues, prs } = fetchedOpenclaw;

  const peersRepoLinks =
    `- [OpenClaw](https://github.com/${OPENCLAW.repo})\n` +
    OPENCLAW_PEERS.map((p) => `- [${p.name}](https://github.com/${p.repo})`).join("\n");

  const peerDetailSections = peerDigests
    .map((d) =>
      [
        `<details>`,
        `<summary><strong>${d.config.name}</strong> — <a href="https://github.com/${d.config.repo}">${d.config.repo}</a></summary>`,
        ``,
        d.summary,
        ``,
        `</details>`,
      ].join("\n"),
    )
    .join("\n\n");

  return (
    `# Bản tin Hệ sinh thái OpenClaw ${dateStr}\n\n` +
    `> Issues: ${issues.length} | PRs: ${prs.length} | Dự án: ${1 + OPENCLAW_PEERS.length} | Thời gian tạo: ${utcStr} UTC\n\n` +
    `${peersRepoLinks}\n\n` +
    `---\n\n` +
    `## Phân tích sâu OpenClaw\n\n` +
    openclawSummary +
    `\n\n---\n\n` +
    `## So sánh hệ sinh thái chéo\n\n` +
    peersComparison +
    `\n\n---\n\n` +
    `## Báo cáo các dự án cùng nhóm\n\n` +
    peerDetailSections +
    footer
  );
}

function buildEmbeddedAiReportContent(
  embeddedAiDigests: RepoDigest[],
  embeddedAiComparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
): string {
  const repoLinks = embeddedAiDigests
    .map((d) => `- [${d.config.name}](https://github.com/${d.config.repo})`)
    .join("\n");

  const detailSections = embeddedAiDigests
    .map((d) =>
      [
        `<details>`,
        `<summary><strong>${d.config.name}</strong> — <a href="https://github.com/${d.config.repo}">${d.config.repo}</a></summary>`,
        ``,
        d.summary,
        ``,
        `</details>`,
      ].join("\n"),
    )
    .join("\n\n");

  return (
    `# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) ${dateStr}\n\n` +
    `> Thời gian tạo: ${utcStr} UTC | Dự án: ${embeddedAiDigests.length}\n\n` +
    `${repoLinks}\n\n` +
    `---\n\n` +
    `## So sánh chéo\n\n` +
    embeddedAiComparison +
    `\n\n---\n\n` +
    `## Báo cáo chi tiết từng dự án\n\n` +
    detailSections +
    footer
  );
}

// ---------------------------------------------------------------------------
// Report savers
// ---------------------------------------------------------------------------

async function saveTrendingReport(
  trendingData: TrendingData,
  trendingSummary: string,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
): Promise<void> {
  const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
  if (!hasData) {
    console.log(`  [trending] No data available, skipping report.`);
    return;
  }

  const fileName = `ai-trending-vi.md` as const;
  const header = `# Xu hướng AI Mã nguồn mở ${dateStr}\n\n> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: ${utcStr} UTC\n\n---\n\n`;

  const trendingContent = header + trendingSummary + footer;

  console.log(`  Saved ${saveFile(trendingContent, dateStr, fileName)}`);

  if (digestRepo) {
    const trendingUrl = await createGitHubIssue(
      issueTitle("trending", "vi", dateStr),
      trendingContent,
      "trending",
    );
    console.log(`  Created trending issue: ${trendingUrl}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  requireEnv("GITHUB_TOKEN");

  // Set default local LLM endpoint
  if (!process.env["OPENAI_BASE_URL"]) {
    process.env["OPENAI_BASE_URL"] = "http://localhost:20128/v1";
  }
  if (!process.env["OPENAI_API_KEY"]) {
    process.env["OPENAI_API_KEY"] = "not-needed";
  }

  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const dateStr = new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const utcStr = now.toISOString().slice(0, 16).replace("T", " ");
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  console.log(`[${now.toISOString()}] Starting digest | endpoint: ${process.env["OPENAI_BASE_URL"]}`);

  // 1. Fetch all data in parallel
  const { fetched, trendingData } = await fetchAllData(since);

  const peerIds = new Set(OPENCLAW_PEERS.map((p) => p.id));
  const embeddedAiIds = new Set(EMBEDDED_AI_REPOS.map((r) => r.id));
  const fetchedOpenclaw = fetched.find((f) => f.cfg.id === OPENCLAW.id)!;
  const fetchedPeers = fetched.filter((f) => peerIds.has(f.cfg.id));
  const fetchedEmbeddedAi = fetched.filter((f) => embeddedAiIds.has(f.cfg.id));

  // 2. Generate per-repo LLM summaries in parallel
  console.log(`  Generating summaries (Vietnamese only)...`);
  const { openclawSummary, peerDigests, embeddedAiDigests, trendingSummary } = await generateSummaries(
    fetchedOpenclaw,
    fetchedPeers,
    fetchedEmbeddedAi,
    trendingData,
    dateStr,
  );

  // 3. Generate cross-repo comparisons in parallel
  console.log(`  Calling LLM for comparative analyses...`);
  const openclawDig: RepoDigest = {
    config: OPENCLAW,
    issues: fetchedOpenclaw.issues,
    prs: fetchedOpenclaw.prs,
    releases: fetchedOpenclaw.releases,
    summary: openclawSummary,
  };
  const [peersComparison, embeddedAiComparison] = await Promise.all([
    callLlm(buildPeersComparisonPrompt(openclawDig, peerDigests, dateStr, "vi")),
    callLlm(buildEmbeddedAiComparisonPrompt(embeddedAiDigests, dateStr)),
  ]);

  // 4. Build + save all reports
  const footer = autoGenFooter("vi");
  const openclawContent = buildOpenclawReportContent(
    fetchedOpenclaw,
    peerDigests,
    openclawSummary,
    peersComparison,
    utcStr,
    dateStr,
    footer,
  );
  const embeddedAiContent = buildEmbeddedAiReportContent(
    embeddedAiDigests,
    embeddedAiComparison,
    utcStr,
    dateStr,
    footer,
  );

  console.log(`  Saved ${saveFile(openclawContent, dateStr, `ai-agents-vi.md`)}`);
  console.log(`  Saved ${saveFile(embeddedAiContent, dateStr, `ai-embedded-vi.md`)}`);

  // 5. Trending report
  await saveTrendingReport(trendingData, trendingSummary, utcStr, dateStr, digestRepo, footer);

  // 6. Create GitHub issues
  if (digestRepo) {
    const openclawUrl = await createGitHubIssue(
      issueTitle("openclaw", "vi", dateStr),
      openclawContent,
      "openclaw",
    );
    console.log(`  Created OpenClaw issue: ${openclawUrl}`);

    const embeddedUrl = await createGitHubIssue(
      issueTitle("embedded", "vi", dateStr),
      embeddedAiContent,
      "embedded",
    );
    console.log(`  Created Embedded AI issue: ${embeddedUrl}`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
