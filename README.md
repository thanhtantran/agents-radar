# agents-radar

Tiếng Việt | [中文](./README.zh.md) | [English](./README.en.md)

Một workflow GitHub Actions chạy mỗi sáng lúc 08:00 CST. Nó theo dõi hoạt động GitHub từ các công cụ AI CLI, OpenClaw và các dự án liên quan trong hệ sinh thái AI agent, thu thập tin tức và nghiên cứu chính thức từ Anthropic và OpenAI, đồng thời giám sát các repo AI trending trên GitHub hàng ngày — sau đó xuất bản bản tin hàng ngày đa ngôn ngữ dưới dạng GitHub Issues và các file Markdown được commit. Báo cáo tổng hợp hàng tuần và hàng tháng cũng được tạo tự động.

## Giao diện Web

**[https://compasify.github.io/agents-radar](https://compasify.github.io/agents-radar)**

Duyệt tất cả các bản tin lịch sử qua giao diện tối, sạch sẽ — không cần đăng nhập. Báo cáo được render từ các file Markdown trong repo này qua GitHub Pages.

## RSS Feed

**[https://compasify.github.io/agents-radar/feed.xml](https://compasify.github.io/agents-radar/feed.xml)**

Đăng ký qua bất kỳ RSS reader nào (Feedly, Reeder, NewsBlur, v.v.) để nhận bản tin mới tự động. Feed bao gồm 30 báo cáo mới nhất trên tất cả các loại, được cập nhật hàng ngày cùng với `manifest.json`.

## MCP Server

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Một [Model Context Protocol](https://modelcontextprotocol.io) server được host sẵn, cung cấp dữ liệu agents-radar dưới dạng các công cụ. Bất kỳ client nào tương thích MCP (Claude Desktop, OpenClaw, v.v.) đều có thể truy vấn các báo cáo hệ sinh thái AI mới nhất trực tiếp.

**Các công cụ khả dụng:**

| Công cụ        | Mô tả                                                     |
| -------------- | --------------------------------------------------------- |
| `list_reports` | Liệt kê các ngày và loại báo cáo có sẵn (N ngày gần nhất) |
| `get_latest`   | Lấy báo cáo mới nhất của một loại nhất định               |
| `get_report`   | Lấy báo cáo cụ thể theo ngày và loại                      |
| `search`       | Tìm kiếm từ khóa trong các báo cáo gần đây                |

**Cài đặt Claude Desktop** — thêm vào `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```

Khởi động lại Claude Desktop sau khi lưu. Bạn có thể hỏi Claude những câu như:

- _"Có gì mới trong các công cụ AI CLI?"_ → gọi `get_latest`
- _"Tìm kiếm các đề cập đến Claude Code tuần này"_ → gọi `search`
- _"Cho tôi xem báo cáo AI trending ngày 2026-03-05"_ → gọi `get_report`

**Cài đặt OpenClaw** — chạy lệnh sau:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```

Hoặc thêm thủ công vào `~/.openclaw/openclaw.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "type": "http",
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```

Bạn có thể hỏi OpenClaw những câu như:

- _"Có gì mới trong các công cụ AI CLI?"_ → gọi `get_latest`
- _"Tìm kiếm các đề cập đến Claude Code tuần này"_ → gọi `search`
- _"Cho tôi xem báo cáo AI trending ngày 2026-03-05"_ → gọi `get_report`

**Tự host** — triển khai instance của bạn từ thư mục `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```

## Kênh Telegram

**[t.me/agents_radar](https://t.me/agents_radar)**

Đăng ký để nhận thông báo bản tin hàng ngày trực tiếp trên Telegram. Mỗi tin nhắn liên kết đến tất cả báo cáo trong ngày (phiên bản ZH và EN) cùng với giao diện Web và RSS feed.

## Nguồn theo dõi

### Công cụ AI CLI (GitHub)

| Công cụ            | Repository                                                              |
| ------------------ | ----------------------------------------------------------------------- |
| Claude Code        | [anthropics/claude-code](https://github.com/anthropics/claude-code)     |
| OpenAI Codex       | [openai/codex](https://github.com/openai/codex)                         |
| Gemini CLI         | [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) |
| GitHub Copilot CLI | [github/copilot-cli](https://github.com/github/copilot-cli)             |
| Kimi Code CLI      | [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)           |
| OpenCode           | [anomalyco/opencode](https://github.com/anomalyco/opencode)             |
| Qwen Code          | [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)                 |

### Claude Code Skills (GitHub)

| Nguồn              | Repository                                                |
| ------------------ | --------------------------------------------------------- |
| Claude Code Skills | [anthropics/skills](https://github.com/anthropics/skills) |

PR và issue được lấy không có bộ lọc ngày và được sắp xếp theo mức độ phổ biến (số lượng comment), vì vậy báo cáo luôn phản ánh các skills được thảo luận nhiều nhất — không chỉ mới nhất.

### OpenClaw + Hệ sinh thái AI agent (GitHub)

OpenClaw được theo dõi như dự án tham chiếu chính. Mười dự án liên quan trong lĩnh vực trợ lý AI cá nhân / autonomous agent được theo dõi cùng để so sánh đa hệ sinh thái.

| Dự án     | Repository                                                              | Stars  |
| --------- | ----------------------------------------------------------------------- | ------ |
| OpenClaw  | [openclaw/openclaw](https://github.com/openclaw/openclaw)               | 240.5k |
| NanoBot   | [HKUDS/nanobot](https://github.com/HKUDS/nanobot)                       | 26.9k  |
| Zeroclaw  | [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)     | 21.2k  |
| PicoClaw  | [sipeed/picoclaw](https://github.com/sipeed/picoclaw)                   | 21.1k  |
| NanoClaw  | [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)               | 16.6k  |
| IronClaw  | [nearai/ironclaw](https://github.com/nearai/ironclaw)                   | 3.9k   |
| LobsterAI | [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI) | 3.0k   |
| TinyClaw  | [TinyAGI/tinyclaw](https://github.com/TinyAGI/tinyclaw)                 | 2.8k   |
| CoPaw     | [agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)           | 2.2k   |
| ZeptoClaw | [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)                     | 394    |
| EasyClaw  | [gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)           | 102    |

### GitHub AI Trending

Hai nguồn dữ liệu được lấy song song mỗi ngày:

| Nguồn                                                          | Chi tiết                                                                                                                                               |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [github.com/trending](https://github.com/trending?since=daily) | Các repo trending hôm nay — phân tích cú pháp từ HTML; bao gồm số star mới trong ngày                                                                  |
| GitHub Search API                                              | Các repo hoạt động trong 7 ngày gần nhất khớp với 6 chủ đề AI: `llm`, `ai-agent`, `rag`, `vector-database`, `large-language-model`, `machine-learning` |

LLM lọc bỏ các repo không liên quan đến AI khỏi danh sách trending, phân loại phần còn lại theo chiều (AI infrastructure / agents / applications / models / RAG), và trích xuất các tín hiệu xu hướng.

### Hacker News

Các câu chuyện AI hàng đầu trong 24 giờ qua, được lấy qua [Algolia HN Search API](https://hn.algolia.com/api). Sáu truy vấn chạy song song (`AI`, `LLM`, `Claude`, `OpenAI`, `Anthropic`, `machine learning`), kết quả được loại trùng và xếp hạng theo điểm. Top 30 câu chuyện được chuyển cho LLM để phân tích.

### Nội dung web chính thức (dựa trên sitemap)

| Tổ chức   | Trang web                                  | Các phần theo dõi                                                                              |
| --------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Anthropic | [anthropic.com](https://www.anthropic.com) | `/news/`, `/research/`, `/engineering/`, `/learn/`                                             |
| OpenAI    | [openai.com](https://openai.com)           | research, publication, release, company, engineering, milestone, learn-guides, safety, product |

Bài viết mới được phát hiện bằng cách so sánh timestamp `lastmod` của sitemap với file state được lưu trữ (`digests/web-state.json`). Ở **lần chạy đầu tiên**, tối đa 25 bài viết gần đây mỗi trang được lấy và một báo cáo tổng quan toàn diện được tạo ra. Ở các lần chạy tiếp theo, chỉ những URL mới hoặc đã cập nhật mới kích hoạt báo cáo; nếu không có gì thay đổi, bước báo cáo web sẽ bị bỏ qua hoàn toàn.

## Tính năng

- Lấy issues, pull requests và releases được cập nhật trong 24 giờ qua trên tất cả các repo theo dõi
- Theo dõi Claude Code Skills trending — được sắp xếp theo mức độ tham gia cộng đồng, không phải theo thời gian mới nhất
- Tạo tóm tắt cho từng công cụ trong mỗi CLI repository và phân tích so sánh đa công cụ
- Tạo báo cáo chuyên sâu về dự án OpenClaw cùng so sánh đa hệ sinh thái với 10 dự án liên quan
- Thu thập nội dung web chính thức của Anthropic và OpenAI qua sitemap; phát hiện bài viết mới theo từng bước
- Giám sát GitHub Trending hàng ngày + tìm kiếm 6 tag chủ đề AI; phân loại repo theo chiều và trích xuất tín hiệu xu hướng
- Lấy top 30 câu chuyện AI từ Hacker News (24 giờ gần nhất, xếp hạng theo điểm); tạo báo cáo cảm xúc cộng đồng
- Xuất bản GitHub Issues cho mỗi loại báo cáo; commit các file Markdown vào `digests/YYYY-MM-DD/`
- Chạy theo lịch hàng ngày qua GitHub Actions; hỗ trợ kích hoạt thủ công
- Tất cả các repository theo dõi có thể cấu hình qua `config.yml` — không cần thay đổi code

## Cài đặt

### 1. Fork repository này

### 2. Tùy chỉnh `config.yml` (tùy chọn)

Chỉnh sửa `config.yml` ở thư mục gốc của repo để thêm, xóa hoặc thay thế các repository theo dõi. File được comment đầy đủ. Không cần thay đổi code — pipeline đọc nó trong mỗi lần chạy và dùng giá trị mặc định tích hợp nếu file vắng mặt.

```yaml
# Add a new CLI tool
cli_repos:
  - id: my-tool
    repo: owner/my-ai-cli
    name: My AI Tool

# Add a new peer project to the OpenClaw ecosystem comparison
openclaw_peers:
  - id: my-agent
    repo: owner/my-agent
    name: My Agent
```

### 3. Thêm Secrets và Variables

Vào **Settings → Secrets and variables → Actions** và thêm:

**Secrets** (giá trị nhạy cảm):

| Secret               | Bắt buộc      | Mô tả                                                                                                                  |
| -------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY`  | một trong A/B | API key — dùng được với cả Anthropic và Kimi Code                                                                      |
| `ANTHROPIC_BASE_URL` | tùy chọn      | Ghi đè endpoint API. Đặt thành `https://api.kimi.com/coding/` cho Kimi Code; bỏ trống cho Anthropic                    |
| `OPENAI_API_KEY`     | một trong A/B | API key tương thích OpenAI. Khi được đặt, ưu tiên hơn Anthropic                                                        |
| `OPENAI_BASE_URL`    | tùy chọn      | Ghi đè endpoint tương thích OpenAI (ví dụ `https://gen.pollinations.ai/v1`)                                            |
| `TELEGRAM_BOT_TOKEN` | tùy chọn      | Token bot Telegram từ [@BotFather](https://t.me/BotFather). Nếu được đặt, tin nhắn sẽ được gửi sau mỗi lần chạy digest |
| `TELEGRAM_CHAT_ID`   | tùy chọn      | ID chat/channel/group Telegram để gửi thông báo                                                                        |

> Đặt **hoặc** `ANTHROPIC_API_KEY` (Tùy chọn A) **hoặc** `OPENAI_API_KEY` (Tùy chọn B). Nếu cả hai được đặt, OpenAI sẽ được ưu tiên.

**Variables** (không nhạy cảm, trong tab **Variables**):

| Variable       | Mặc định | Mô tả                                                                                          |
| -------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `OPENAI_MODEL` | `gpt-4o` | Tên model cho provider tương thích OpenAI                                                      |
| `DIGEST_LANGS` | `vi`     | Mã ngôn ngữ được phân cách bằng dấu phẩy để tạo: `vi`, `zh`, `en` (ví dụ `zh,en,vi` cho cả ba) |

> `GITHUB_TOKEN` được cung cấp tự động bởi GitHub Actions.

**Cài đặt thông báo Telegram** (tùy chọn):

1. Nhắn tin cho [@BotFather](https://t.me/BotFather) trên Telegram, tạo bot và sao chép token
2. Thêm bot vào channel/group của bạn, hoặc bắt đầu DM với nó
3. Lấy chat ID qua [@userinfobot](https://t.me/userinfobot) hoặc API [getUpdates](https://core.telegram.org/bots/api#getupdates)
4. Thêm `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID` làm repository secrets

> Nếu không có secret nào được đặt, bước thông báo sẽ bị bỏ qua im lặng.

### 3. Bật workflow

Xác nhận workflow đã được bật trong tab **Actions**.

Để kiểm tra ngay lập tức, vào **Actions → Daily Agents Radar → Run workflow**.

> **Lưu ý lần chạy đầu tiên**: Bước nội dung web sẽ lấy tối đa 50 bài viết (25 mỗi trang) và có thể mất thêm vài phút. Các lần chạy tiếp theo rất nhanh — chỉ các bài viết mới được xử lý.

## Chạy cục bộ

```bash
pnpm install

export GITHUB_TOKEN=ghp_xxxxx

# Option A — OpenAI-compatible (takes precedence when OPENAI_API_KEY is set)
export OPENAI_API_KEY=sk-xxxxx
export OPENAI_BASE_URL=https://your-provider/v1  # optional
export OPENAI_MODEL=gpt-4o                        # optional, default: gpt-4o

# Option B — Anthropic (default when OPENAI_API_KEY is absent)
export ANTHROPIC_API_KEY=sk-ant-xxxxx
export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/  # optional

export DIGEST_REPO=your-username/agents-radar  # optional; omit to only write files
export DIGEST_LANGS=vi                          # optional; default: vi

pnpm start
```

## Định dạng đầu ra

Các file được ghi vào `digests/YYYY-MM-DD/`:

| File             | Nội dung                                                                                                 | Nhãn GitHub Issue |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ----------------- |
| `ai-cli.md`      | Bản tin CLI — so sánh đa công cụ + chi tiết từng công cụ                                                 | `digest`          |
| `ai-agents.md`   | Báo cáo chuyên sâu OpenClaw + so sánh đa hệ sinh thái + chi tiết 10 dự án liên quan                      | `openclaw`        |
| `ai-web.md`      | Báo cáo nội dung web chính thức (chỉ ghi khi có nội dung mới)                                            | `web`             |
| `ai-trending.md` | Báo cáo GitHub AI trending — repo được phân loại theo chiều + tín hiệu xu hướng (chỉ ghi khi có dữ liệu) | `trending`        |
| `ai-hn.md`       | Bản tin cộng đồng AI Hacker News — câu chuyện hàng đầu + phân tích cảm xúc (chỉ ghi khi lấy thành công)  | `hn`              |

File state dùng chung `digests/web-state.json` theo dõi các URL web đã được thấy; nó được commit cùng với các bản tin hàng ngày.

Mỗi báo cáo được tạo bằng cả tiếng Trung (`ai-cli.md`) và tiếng Anh (`ai-cli-en.md`). Thanh bên giao diện Web hiển thị các nút chuyển đổi ZH / EN cho các báo cáo có cả hai phiên bản.

---

Cấu trúc `ai-cli.md` / `ai-cli-en.md`:

```
## Cross-Tool Comparison
  Ecosystem overview / Activity comparison table / Shared themes / Differentiation / Trend signals

## Per-Tool Reports
  <details> Claude Code    — [Claude Code Skills Highlights]
                             Top skills / Community demand trends / High-potential pending skills
                             ---
                             Today's summary / Hot issues / PR progress / Trends
  <details> OpenAI Codex   — Today's summary / Hot issues / PR progress / Trends
  <details> Gemini CLI     — ...
  <details> GitHub Copilot CLI — ...
  <details> Kimi Code CLI  — ...
  <details> OpenCode       — ...
  <details> Qwen Code      — ...
```

Cấu trúc `ai-agents.md` / `ai-agents-en.md`:

```
Issues: N | PRs: N | Projects covered: 10

## OpenClaw Deep Dive
  Today's summary / Releases / Project progress / Community highlights /
  Bug stability / Feature requests / User feedback / Backlog

## Cross-Ecosystem Comparison
  Ecosystem overview / Activity table / OpenClaw positioning /
  Shared technical directions / Differentiation / Community maturity / Trend signals

## Peer Project Reports
  <details> Zeroclaw   — Today's summary / Releases / Progress / ... (8 sections)
  <details> EasyClaw   — ...
  <details> LobsterAI  — ...
  <details> ZeptoClaw  — ...
  <details> NanoBot    — ...
  <details> PicoClaw   — ...
  <details> NanoClaw   — ...
  <details> IronClaw   — ...
  <details> TinyClaw   — ...
  <details> CoPaw      — ...
```

Cấu trúc `ai-web.md` / `ai-web-en.md`:

```
Sources: anthropic.com (N articles) + openai.com (N articles)

Today's summary
Anthropic / Claude highlights  (news / research / engineering / learn)
OpenAI highlights              (research / release / company / safety / ...)
Strategic signals
Notable details
[First full crawl also includes: Content landscape overview]
```

Cấu trúc `ai-trending.md` / `ai-trending-en.md`:

```
Sources: GitHub Trending + GitHub Search API

Today's summary
Top repos by dimension
  🔧 AI Infrastructure  — frameworks / SDKs / inference engines / CLIs
  🤖 AI Agents          — agent frameworks / multi-agent / automation
  📦 AI Applications    — vertical products / solutions
  🧠 Models & Training  — model weights / training frameworks / fine-tuning
  🔍 RAG & Knowledge    — vector databases / retrieval augmentation
Trend signal analysis
Community focus
```

Cấu trúc `ai-hn.md` / `ai-hn-en.md`:

```
Sources: Hacker News (top-30 AI stories, last 24h)

Today's summary
Top stories & discussions
  🔬 Models & Research  — new model releases / papers / benchmarks
  🛠️ Tools & Engineering — open-source projects / frameworks / engineering practice
  🏢 Industry news      — company news / funding / product launches
  💬 Opinions & debate  — Ask HN / Show HN / hot threads
Community sentiment signals
Worth reading
```

Cấu trúc `ai-weekly.md` / `ai-weekly-en.md` (được tạo mỗi thứ Hai):

```
Coverage: YYYY-MM-DD ~ YYYY-MM-DD  (last 7 daily digests)

Weekly highlights
Key trends & developments
Notable releases
Community momentum
Outlook
```

Cấu trúc `ai-monthly.md` / `ai-monthly-en.md` (được tạo vào ngày 1 mỗi tháng):

```
Sources: N weekly reports  (or sampled daily reports if fewer than 2 weeklies available)

Month in review
Major themes
Ecosystem shifts
Top projects & releases
Looking ahead
```

Các bản tin lịch sử được lưu trong [`digests/`](./digests/). Issues đã xuất bản được gắn thẻ theo loại: [`digest`](../../issues?label=digest) · [`openclaw`](../../issues?label=openclaw) · [`web`](../../issues?label=web) · [`trending`](../../issues?label=trending) · [`hn`](../../issues?label=hn) · [`weekly`](../../issues?label=weekly) · [`monthly`](../../issues?label=monthly).

## Lịch chạy

| Workflow            | Cron        | UTC             | CST             |
| ------------------- | ----------- | --------------- | --------------- |
| Bản tin hàng ngày   | `0 0 * * *` | 00:00 hàng ngày | 08:00 hàng ngày |
| Tổng hợp hàng tuần  | `0 1 * * 1` | 01:00 thứ Hai   | 09:00 thứ Hai   |
| Tổng hợp hàng tháng | `0 2 1 * *` | 02:00 ngày 1    | 10:00 ngày 1    |

Để thay đổi lịch, chỉnh sửa các biểu thức cron trong các file workflow tương ứng trong `.github/workflows/`.

## Lịch sử Star

[![Star History Chart](https://api.star-history.com/svg?repos=compasify/agents-radar&type=Date)](https://star-history.com/#compasify/agents-radar&Date)
