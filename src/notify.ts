/**
 * Telegram notification — reads manifest.json and sends a message
 * with links to the latest reports. Skips silently if secrets are not set.
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN  — bot token from @BotFather
 *   TELEGRAM_CHAT_ID    — channel/group/user chat ID
 * Optional:
 *   PAGES_URL           — GitHub Pages base URL (defaults to the public deployment)
 */

import fs from "node:fs";

const BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"] ?? "";
const CHAT_ID = process.env["TELEGRAM_CHAT_ID"] || "@agents_radar";
const PAGES_URL = (process.env["PAGES_URL"] ?? "https://thanhtantran.github.io/agents-radar").replace(/\/$/, "");

const VI_LABELS: Record<string, string> = {
  "ai-agents-vi": "🦞 Hệ sinh thái OpenClaw & AI Agents",
  "ai-embedded-vi": "🔌 AI Nhúng (Orange Pi, RKLLM, RKNPU)",
  "ai-trending-vi": "📈 Xu hướng AI GitHub",
};

async function sendTelegram(text: string): Promise<void> {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API ${res.status}: ${body}`);
  }
}

function buildMessage(date: string, reports: string[]): string {
  const lines: string[] = [`📊 <b>Báo cáo AI mới · ${date}</b>\n`];

  // All reports are Vietnamese-only
  for (const r of reports) {
    const viLabel = VI_LABELS[r] ?? r;
    const viUrl = `${PAGES_URL}/#${date}/${r}`;
    lines.push(`✅ <a href="${viUrl}">${viLabel}</a>`);
  }

  lines.push(`\n<a href="${PAGES_URL}">🌐 Xem tất cả</a>  ·  <a href="${PAGES_URL}/feed.xml">📡 RSS</a>`);
  return lines.join("\n");
}

async function main(): Promise<void> {
  if (!BOT_TOKEN) {
    console.log("[notify] TELEGRAM_BOT_TOKEN not set — skipping.");
    return;
  }

  if (!fs.existsSync("manifest.json")) {
    console.log("[notify] manifest.json not found — skipping.");
    return;
  }

  const { dates } = JSON.parse(fs.readFileSync("manifest.json", "utf-8")) as {
    dates: { date: string; reports: string[] }[];
  };

  const latest = dates?.[0];
  if (!latest) {
    console.log("[notify] manifest is empty — skipping.");
    return;
  }
  const { date, reports } = latest;
  const text = buildMessage(date, reports);

  console.log(`[notify] Sending Telegram message for ${date} (${reports.length} reports)…`);
  await sendTelegram(text);
  console.log("[notify] Done!");
}

main().catch((e: unknown) => {
  console.error("[notify]", e instanceof Error ? e.message : e);
  process.exit(1);
});
