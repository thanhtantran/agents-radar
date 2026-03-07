/**
 * LLM invocation, file I/O, and GitHub issue creation helpers.
 *
 * Provider selection (checked once at startup):
 *   - If OPENAI_API_KEY is set → OpenAI-compatible provider
 *   - Otherwise             → Anthropic SDK (reads ANTHROPIC_API_KEY / ANTHROPIC_BASE_URL)
 */

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Provider detection — OpenAI takes precedence when OPENAI_API_KEY is set
// ---------------------------------------------------------------------------

const USE_OPENAI = Boolean(process.env["OPENAI_API_KEY"]);

const MODEL = USE_OPENAI
  ? (process.env["OPENAI_MODEL"] ?? "gpt-4o")
  : (process.env["ANTHROPIC_MODEL"] ?? "claude-sonnet-4-6");
// ---------------------------------------------------------------------------
// Concurrency limiter — prevents rate-limit (429) errors when many LLM calls
// are fired in parallel. At most LLM_CONCURRENCY requests are in-flight at
// any given time; the rest queue and run as slots free up.
// ---------------------------------------------------------------------------

const LLM_CONCURRENCY = 5;
let llmSlots = LLM_CONCURRENCY;
const llmQueue: Array<() => void> = [];

function acquireSlot(): Promise<void> {
  if (llmSlots > 0) {
    llmSlots--;
    return Promise.resolve();
  }
  return new Promise((resolve) => llmQueue.push(resolve));
}

function releaseSlot(): void {
  const next = llmQueue.shift();
  if (next) {
    next();
  } else {
    llmSlots++;
  }
}

// ---------------------------------------------------------------------------
// LLM
// ---------------------------------------------------------------------------

const MAX_RETRIES = 3;
const RETRY_BASE_MS = 5_000; // 5 s, 10 s, 20 s

function is429(err: unknown): boolean {
  return (err as { status?: number })?.status === 429 || String(err).includes("429");
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function callLlm(prompt: string, maxTokens = 4096): Promise<string> {
  return USE_OPENAI ? callOpenAi(prompt, maxTokens) : callAnthropic(prompt, maxTokens);
}

// ---------------------------------------------------------------------------
// Anthropic provider
// ---------------------------------------------------------------------------

async function callAnthropic(prompt: string, maxTokens: number): Promise<string> {
  for (let attempt = 0; ; attempt++) {
    await acquireSlot();
    let released = false;
    try {
      const client = new Anthropic();
      const message = await client.messages.create({
        model: MODEL,
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      });
      const block = message.content[0];
      if (block?.type !== "text") throw new Error("Unexpected response type from LLM");
      return block.text;
    } catch (err) {
      if (attempt < MAX_RETRIES && is429(err)) {
        releaseSlot();
        released = true;
        const wait = RETRY_BASE_MS * 2 ** attempt;
        console.error(`[llm] 429 — retry ${attempt + 1}/${MAX_RETRIES} in ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }
      throw err;
    } finally {
      if (!released) releaseSlot();
    }
  }
}

// ---------------------------------------------------------------------------
// OpenAI-compatible provider
// ---------------------------------------------------------------------------

async function callOpenAi(prompt: string, maxTokens: number): Promise<string> {
  for (let attempt = 0; ; attempt++) {
    await acquireSlot();
    let released = false;
    try {
      const client = new OpenAI({
        apiKey: process.env["OPENAI_API_KEY"],
        baseURL: process.env["OPENAI_BASE_URL"] ?? undefined,
      });
      const response = await client.chat.completions.create({
        model: MODEL,
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      });
      const text = response.choices[0]?.message?.content;
      if (!text) throw new Error("Unexpected empty response from LLM");
      return text;
    } catch (err) {
      if (attempt < MAX_RETRIES && is429(err)) {
        releaseSlot();
        released = true;
        const wait = RETRY_BASE_MS * 2 ** attempt;
        console.error(`[llm] 429 — retry ${attempt + 1}/${MAX_RETRIES} in ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }
      throw err;
    } finally {
      if (!released) releaseSlot();
    }
  }
}

// ---------------------------------------------------------------------------
// File output
// ---------------------------------------------------------------------------

export function saveFile(content: string, ...segments: string[]): string {
  const filepath = path.join("digests", ...segments);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

export function autoGenFooter(lang: "zh" | "en" | "vi" = "zh"): string {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (!digestRepo) return "";
  return lang === "vi"
    ? `\n\n---\n*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/${digestRepo}).*`
    : lang === "en"
      ? `\n\n---\n*This digest is auto-generated by [agents-radar](https://github.com/${digestRepo}).*`
      : `\n\n---\n*本日报由 [agents-radar](https://github.com/${digestRepo}) 自动生成。*`;
}

// ---------------------------------------------------------------------------
// Language configuration
// ---------------------------------------------------------------------------

export type Lang = "zh" | "en" | "vi";

const VALID_LANGS = new Set<Lang>(["zh", "en", "vi"]);

/**
 * Parse DIGEST_LANGS env var into a list of languages to generate.
 * Format: comma-separated, e.g. "vi" or "zh,en,vi".
 * Default: "vi" (Vietnamese only).
 * The first language in the list is the "primary" language used for GitHub Issues.
 */
export function getDigestLangs(): Lang[] {
  const raw = process.env["DIGEST_LANGS"]?.trim();
  if (!raw) return ["vi"];
  const langs = raw
    .split(",")
    .map((s) => s.trim().toLowerCase() as Lang)
    .filter((l) => VALID_LANGS.has(l));
  return langs.length > 0 ? langs : ["vi"];
}

// ---------------------------------------------------------------------------
// Issue title map — language-aware GitHub Issue titles
// ---------------------------------------------------------------------------

const ISSUE_TITLES: Record<string, Record<Lang, string>> = {
  cli: {
    zh: "📊 AI CLI 工具社区动态日报",
    en: "📊 AI CLI Tools Daily Digest",
    vi: "📊 Bản tin hàng ngày công cụ AI CLI",
  },
  openclaw: {
    zh: "🦞 OpenClaw 生态日报",
    en: "🦞 OpenClaw Ecosystem Daily Digest",
    vi: "🦞 Bản tin hàng ngày hệ sinh thái OpenClaw",
  },
  web: {
    zh: "🌐 AI 官方内容追踪报告",
    en: "🌐 AI Official Content Tracking Report",
    vi: "🌐 Báo cáo theo dõi nội dung AI chính thức",
  },
  trending: {
    zh: "📈 AI 开源趋势日报",
    en: "📈 AI Open Source Trends Daily",
    vi: "📈 Bản tin xu hướng AI mã nguồn mở",
  },
  hn: {
    zh: "📰 Hacker News AI 社区动态日报",
    en: "📰 Hacker News AI Community Daily",
    vi: "📰 Bản tin cộng đồng AI Hacker News",
  },
  weekly: {
    zh: "📅 AI 工具生态周报",
    en: "📅 AI Ecosystem Weekly Report",
    vi: "📅 Bản tin tuần hệ sinh thái AI",
  },
  monthly: {
    zh: "📆 AI 工具生态月报",
    en: "📆 AI Ecosystem Monthly Report",
    vi: "📆 Bản tin tháng hệ sinh thái AI",
  },
};

export function issueTitle(key: string, lang: Lang, suffix: string): string {
  return `${ISSUE_TITLES[key]?.[lang] ?? ISSUE_TITLES[key]?.zh ?? key} ${suffix}`;
}
