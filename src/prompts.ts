/**
 * LLM prompt builders for simplified agents-radar.
 */

import type { RepoConfig, GitHubItem, GitHubRelease } from "./github.ts";
import type { TrendingData } from "./trending.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RepoDigest {
  config: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
  summary: string;
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export function formatItem(item: GitHubItem): string {
  const labels = item.labels.map((l) => l.name).join(", ");
  const labelStr = labels ? ` [${labels}]` : "";
  const body = (item.body ?? "").replace(/\n/g, " ").trim().slice(0, 300);
  const ellipsis = (item.body ?? "").length > 300 ? "..." : "";
  return [
    `#${item.number} [${item.state.toUpperCase()}]${labelStr} ${item.title}`,
    `  Tác giả: @${item.user.login} | Tạo: ${item.created_at.slice(0, 10)} | Cập nhật: ${item.updated_at.slice(0, 10)} | Bình luận: ${item.comments} | 👍: ${item.reactions?.["+1"] ?? 0}`,
    `  Liên kết: ${item.html_url}`,
    `  Tóm tắt: ${body}${ellipsis}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Sampling helpers
// ---------------------------------------------------------------------------

const ISSUE_LIMIT = 50;
const PR_LIMIT = 30;

function topN(items: GitHubItem[], n: number): GitHubItem[] {
  return [...items].sort((a, b) => b.comments - a.comments).slice(0, n);
}

function sampleNote(total: number, sampled: number): string {
  return total > sampled
    ? `(Tổng cộng: ${total} mục; hiển thị ${sampled} mục theo số bình luận)`
    : `(Tổng cộng: ${total} mục)`;
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

export function buildPeerPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
  issueLimit = ISSUE_LIMIT,
  prLimit = PR_LIMIT,
  lang: "vi" = "vi",
): string {
  const sampledIssues = topN(issues, issueLimit);
  const sampledPrs = topN(prs, prLimit);

  const issuesText = sampledIssues.length
    ? `## Issues ${sampleNote(issues.length, sampledIssues.length)}\n\n` +
      sampledIssues.map(formatItem).join("\n\n")
    : "## Issues\n\nKhông có issues nào được cập nhật trong 24 giờ qua.";

  const prsText = sampledPrs.length
    ? `## Pull Requests ${sampleNote(prs.length, sampledPrs.length)}\n\n` +
      sampledPrs.map(formatItem).join("\n\n")
    : "## Pull Requests\n\nKhông có PRs nào được cập nhật trong 24 giờ qua.";

  const releasesText = releases.length
    ? `## Releases (${releases.length})\n\n` +
      releases
        .map((r) => {
          const body = (r.body ?? "").replace(/\n/g, " ").trim().slice(0, 500);
          return `### ${r.tag_name} — ${r.name}\nPhát hành: ${r.published_at.slice(0, 10)}\n${body}`;
        })
        .join("\n\n")
    : "## Releases\n\nKhông có releases nào trong 24 giờ qua.";

  return `Bạn là một chuyên gia phân tích hệ sinh thái AI agent. Hãy phân tích hoạt động của dự án **${cfg.name}** (${cfg.repo}) trong ngày ${dateStr}.

# Dữ liệu đầu vào

${issuesText}

${prsText}

${releasesText}

# Yêu cầu báo cáo

Tạo báo cáo phân tích chi tiết bằng tiếng Việt với các phần sau:

1. **Tóm tắt hôm nay**: Tổng quan ngắn gọn về hoạt động chính (2-3 câu)

2. **Releases**: Nếu có release mới, phân tích các tính năng chính và ý nghĩa

3. **Tiến độ dự án**: Phân tích các PR và issue quan trọng, xu hướng phát triển

4. **Điểm nổi bật cộng đồng**: Issues/PRs có nhiều tương tác, vấn đề người dùng quan tâm

5. **Ổn định & Bugs**: Các vấn đề kỹ thuật đang được xử lý

6. **Yêu cầu tính năng**: Tính năng mới được đề xuất

7. **Phản hồi người dùng**: Ý kiến và trải nghiệm từ cộng đồng

8. **Backlog & Roadmap**: Kế hoạch phát triển tiếp theo (nếu có thông tin)

Sử dụng markdown, bullet points, và emoji phù hợp. Tập trung vào insights có giá trị, không chỉ liệt kê.`;
}

export function buildPeersComparisonPrompt(
  hermesDigest: RepoDigest,
  peerDigests: RepoDigest[],
  dateStr: string,
  lang: "vi" = "vi",
): string {
  const allDigests = [hermesDigest, ...peerDigests];
  const digestsText = allDigests
    .map((d) => {
      const { config, issues, prs, releases } = d;
      return [
        `## ${config.name} (${config.repo})`,
        `Issues: ${issues.length} | PRs: ${prs.length} | Releases: ${releases.length}`,
        ``,
        d.summary,
      ].join("\n");
    })
    .join("\n\n---\n\n");

  return `Bạn là một chuyên gia phân tích hệ sinh thái AI agent. Hãy so sánh và phân tích các dự án trong hệ sinh thái Hermes Agent và các dự án tương tự trong ngày ${dateStr}.

# Dữ liệu các dự án

${digestsText}

# Yêu cầu báo cáo so sánh

Tạo báo cáo so sánh chi tiết bằng tiếng Việt với các phần sau:

1. **Tổng quan hệ sinh thái**: Bức tranh tổng thể về hoạt động của các dự án AI agent

2. **Bảng so sánh hoạt động**: Tạo bảng markdown so sánh các chỉ số chính (issues, PRs, releases, mức độ tương tác)

3. **Vị thế của Hermes Agent**: Phân tích vị trí và vai trò của Hermes Agent trong hệ sinh thái

4. **Hướng kỹ thuật chung**: Các xu hướng công nghệ được nhiều dự án áp dụng

5. **Điểm khác biệt**: Phân tích sự khác biệt về chiến lược, tính năng, cộng đồng

6. **Mức độ trưởng thành cộng đồng**: Đánh giá sự phát triển của từng cộng đồng

7. **Tín hiệu xu hướng**: Dự đoán xu hướng phát triển trong tương lai

Sử dụng markdown, bảng, bullet points, và emoji. Tập trung vào insights chiến lược.`;
}

export function buildEmbeddedAiPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
): string {
  const sampledIssues = topN(issues, ISSUE_LIMIT);
  const sampledPrs = topN(prs, PR_LIMIT);

  const issuesText = sampledIssues.length
    ? `## Issues ${sampleNote(issues.length, sampledIssues.length)}\n\n` +
      sampledIssues.map(formatItem).join("\n\n")
    : "## Issues\n\nKhông có issues nào được cập nhật trong 24 giờ qua.";

  const prsText = sampledPrs.length
    ? `## Pull Requests ${sampleNote(prs.length, sampledPrs.length)}\n\n` +
      sampledPrs.map(formatItem).join("\n\n")
    : "## Pull Requests\n\nKhông có PRs nào được cập nhật trong 24 giờ qua.";

  const releasesText = releases.length
    ? `## Releases (${releases.length})\n\n` +
      releases
        .map((r) => {
          const body = (r.body ?? "").replace(/\n/g, " ").trim().slice(0, 500);
          return `### ${r.tag_name} — ${r.name}\nPhát hành: ${r.published_at.slice(0, 10)}\n${body}`;
        })
        .join("\n\n")
    : "## Releases\n\nKhông có releases nào trong 24 giờ qua.";

  return `Bạn là một chuyên gia về AI nhúng, NPU, và phần cứng AI edge. Hãy phân tích hoạt động của dự án **${cfg.name}** (${cfg.repo}) trong ngày ${dateStr}.

# Dữ liệu đầu vào

${issuesText}

${prsText}

${releasesText}

# Yêu cầu báo cáo

Tạo báo cáo phân tích chi tiết bằng tiếng Việt với các phần sau:

1. **Tóm tắt hôm nay**: Tổng quan về hoạt động chính

2. **Cập nhật phần cứng**: Thông tin về board mới, NPU, driver

3. **Tích hợp AI/LLM**: Các cập nhật về RKLLM, RKNPU, model optimization

4. **Hiệu năng & Benchmark**: Các cải tiến về tốc độ, hiệu suất

5. **Hỗ trợ phần mềm**: SDK, toolkit, framework updates

6. **Vấn đề kỹ thuật**: Bugs và fixes quan trọng

7. **Cộng đồng & Use cases**: Ứng dụng thực tế, feedback người dùng

8. **Roadmap**: Kế hoạch phát triển tiếp theo

Sử dụng markdown, bullet points, và emoji. Tập trung vào khía cạnh kỹ thuật và ứng dụng thực tế.`;
}

export function buildEmbeddedAiComparisonPrompt(
  embeddedAiDigests: RepoDigest[],
  dateStr: string,
): string {
  const digestsText = embeddedAiDigests
    .map((d) => {
      const { config, issues, prs, releases } = d;
      return [
        `## ${config.name} (${config.repo})`,
        `Issues: ${issues.length} | PRs: ${prs.length} | Releases: ${releases.length}`,
        ``,
        d.summary,
      ].join("\n");
    })
    .join("\n\n---\n\n");

  return `Bạn là một chuyên gia về AI nhúng và phần cứng AI edge. Hãy so sánh và phân tích các dự án Orange Pi, RKLLM, RKNPU trong ngày ${dateStr}.

# Dữ liệu các dự án

${digestsText}

# Yêu cầu báo cáo so sánh

Tạo báo cáo so sánh chi tiết bằng tiếng Việt với các phần sau:

1. **Tổng quan hệ sinh thái**: Bức tranh về AI nhúng trên nền tảng Rockchip/Orange Pi

2. **Bảng so sánh**: So sánh các chỉ số và tính năng chính

3. **Tích hợp phần cứng-phần mềm**: Phân tích sự kết hợp giữa hardware và AI software

4. **Hiệu năng NPU**: So sánh khả năng xử lý AI, model support

5. **Developer Experience**: Đánh giá về SDK, tools, documentation

6. **Use Cases**: Các ứng dụng thực tế đang được phát triển

7. **Xu hướng phát triển**: Dự đoán hướng đi của hệ sinh thái

Sử dụng markdown, bảng, bullet points, và emoji. Tập trung vào giá trị thực tế cho developers.`;
}

export function buildTrendingPrompt(
  data: TrendingData,
  dateStr: string,
  lang: "vi" = "vi",
): string {
  const trendingText = data.trendingRepos.length
    ? data.trendingRepos
        .map(
          (r, i) =>
            `${i + 1}. **${r.fullName}** ⭐ ${r.totalStars.toLocaleString()} (+${r.todayStars} hôm nay)\n` +
            `   Ngôn ngữ: ${r.language || "N/A"} | Forks: ${r.forks.toLocaleString()}\n` +
            `   ${r.description}\n` +
            `   ${r.url}`,
        )
        .join("\n\n")
    : "Không có dữ liệu trending.";

  const searchByQuery: Record<string, typeof data.searchRepos> = {};
  for (const repo of data.searchRepos) {
    if (!searchByQuery[repo.searchQuery]) searchByQuery[repo.searchQuery] = [];
    searchByQuery[repo.searchQuery]!.push(repo);
  }

  const searchText = Object.entries(searchByQuery)
    .map(([query, repos]) => {
      const repoList = repos
        .slice(0, 10)
        .map(
          (r, i) =>
            `${i + 1}. **${r.fullName}** ⭐ ${r.stargazersCount.toLocaleString()}\n` +
            `   Ngôn ngữ: ${r.language || "N/A"} | Cập nhật: ${r.pushedAt.slice(0, 10)}\n` +
            `   ${r.description || "Không có mô tả"}\n` +
            `   ${r.url}`,
        )
        .join("\n\n");
      return `### ${query}\n\n${repoList}`;
    })
    .join("\n\n");

  return `Bạn là một chuyên gia phân tích xu hướng AI mã nguồn mở. Hãy phân tích các repo trending và tìm kiếm theo chủ đề trong ngày ${dateStr}.

# GitHub Trending (hôm nay)

${trendingText}

# GitHub Search (7 ngày gần nhất, theo chủ đề)

${searchText}

# Yêu cầu báo cáo

Tạo báo cáo phân tích xu hướng bằng tiếng Việt với các phần sau:

1. **Tóm tắt hôm nay**: Tổng quan về các xu hướng chính

2. **Top repos theo chiều**:
   - 🤖 **AI Agents**: Frameworks, multi-agent systems, automation
   - 🔧 **AI Infrastructure**: SDKs, inference engines, CLIs, tools
   - 🧠 **Models & Training**: Model weights, training frameworks, fine-tuning
   - 📦 **AI Applications**: Vertical products, solutions
   - 🔍 **RAG & Knowledge**: Vector databases, retrieval systems
   - 🔌 **Embedded AI**: NPU, edge AI, Orange Pi, RKLLM, RKNPU

3. **Phân tích tín hiệu xu hướng**: Các công nghệ, pattern đang nổi lên

4. **Tâm điểm cộng đồng**: Các dự án đang thu hút sự chú ý

Sử dụng markdown, emoji, và bullet points. Phân loại repo vào đúng chiều, tập trung vào insights có giá trị.`;
}
