# agents-radar

[English](./README.en.md) | Tiếng Việt

Một workflow GitHub Actions chạy hàng ngày để theo dõi và tạo báo cáo về:
1. **Hệ sinh thái Hermes Agent** và các dự án AI agent tương tự
2. **AI nhúng**: Orange Pi, RKLLM, RKNPU và các dự án liên quan

Báo cáo được tạo tự động bằng LLM (chạy local), lưu dưới dạng Markdown và xuất bản qua GitHub Pages.

## 🌐 Giao diện Web

**[https://thanhtantran.github.io/agents-radar](https://thanhtantran.github.io/agents-radar)**

Duyệt tất cả các bản tin lịch sử qua giao diện tối, sạch sẽ — không cần đăng nhập. Báo cáo được render từ các file Markdown trong repo này qua GitHub Pages.

## 📡 RSS Feed

**[https://thanhtantran.github.io/agents-radar/feed.xml](https://thanhtantran.github.io/agents-radar/feed.xml)**

Đăng ký qua bất kỳ RSS reader nào (Feedly, Reeder, NewsBlur, v.v.) để nhận bản tin mới tự động.

## 📊 Nguồn theo dõi

### Dự án tham chiếu chính

Dự án Hermes Agent được theo dõi là nguồn tham chiếu chính (deep-dive). Đây là trọng tâm báo cáo để so sánh các hệ sinh thái khác.

| Dự án  | Repository                                                      | Mô tả |
| ------ | --------------------------------------------------------------- | ----- |
| Hermes Agent | [nousresearch/hermes-agent](https://github.com/nousresearch/hermes-agent) | Dự án Hermes Agent (primary focus) |

### Hệ sinh thái peers & AI Agents

Các dự án liên quan trong lĩnh vực AI agent được theo dõi cùng để so sánh đa hệ sinh thái (danh sách đồng bộ từ `config.yml`). OpenClaw là một peer, không còn là dự án primary.

| Dự án     | Repository                                                              | Mô tả |
| --------- | ----------------------------------------------------------------------- | ----- |
| OpenClaw  | [openclaw/openclaw](https://github.com/openclaw/openclaw)               | Dự án OpenClaw (tham chiếu trong hệ sinh thái) |
| NanoBot   | [HKUDS/nanobot](https://github.com/HKUDS/nanobot)                       | AI agent framework |
| Zeroclaw  | [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)     | Alternative agent |
| PicoClaw  | [sipeed/picoclaw](https://github.com/sipeed/picoclaw)                   | Lightweight agent |
| NanoClaw  | [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)               | Nano-scale agent |
| NullClaw  | [nullclaw/nullclaw](https://github.com/nullclaw/nullclaw)               | Project in the claw family |
| IronClaw  | [nearai/ironclaw](https://github.com/nearai/ironclaw)                   | Robust agent implementation |
| QwenPaw   | [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)       | Agent project (Qwen-Paw) |

### AI Nhúng (Orange Pi / RKLLM / RKNPU)

Theo dõi các dự án liên quan đến AI trên phần cứng nhúng, đặc biệt là nền tảng Rockchip NPU. Danh sách được đồng bộ từ `config.yml`.

| Dự án              | Repository                                                                    | Mô tả |
| ------------------ | ----------------------------------------------------------------------------- | ----- |
| Orange Pi Build    | [orangepi-xunlong/orangepi-build](https://github.com/orangepi-xunlong/orangepi-build) | Hệ thống build cho Orange Pi |
| RKNN Toolkit 2     | [airockchip/rknn-toolkit2](https://github.com/airockchip/rknn-toolkit2)        | RKNN Toolkit 2 |
| RKNN Model Zoo     | [airockchip/rknn_model_zoo](https://github.com/airockchip/rknn_model_zoo)      | RKNN model zoo và mẫu |
| Media Process Platform (MPP) | [rockchip-linux/mpp](https://github.com/rockchip-linux/mpp)                | Media Process Platform (driver/runtime) |

### 3. GitHub Trending

Hai nguồn dữ liệu được lấy song song mỗi ngày:

| Nguồn                                                          | Chi tiết                                                                                                                     |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [github.com/trending](https://github.com/trending?since=daily) | Các repo trending hôm nay — phân tích cú pháp từ HTML; bao gồm số star mới trong ngày                           |
| GitHub Search API                                              | Các repo hoạt động trong 7 ngày gần nhất khớp với các chủ đề: `llm`, `ai-agent`, `rag`, `orangepi`, `rkllm`,... |

LLM phân loại các repo theo chiều (AI Infrastructure / Agents / Applications / Models / RAG / Embedded AI) và trích xuất các tín hiệu xu hướng.

## ✨ Tính năng

- ✅ Lấy issues, pull requests và releases được cập nhật trong 24 giờ qua
- ✅ Tạo tóm tắt chi tiết cho từng dự án
- ✅ Phân tích so sánh đa dự án trong hệ sinh thái
- ✅ Theo dõi GitHub Trending hàng ngày với phân loại thông minh
- ✅ Tìm kiếm repo theo chủ đề (AI agents, embedded AI, NPU)
- ✅ Xuất bản GitHub Issues cho mỗi loại báo cáo
- ✅ Commit các file Markdown vào `digests/YYYY-MM-DD/`
- ✅ Chạy theo lịch hàng ngày qua GitHub Actions
- ✅ Hỗ trợ LLM local (không cần API key)
- ✅ Thông báo qua Telegram (tùy chọn)
- ✅ Cấu hình linh hoạt qua `config.yml`

## 🚀 Cài đặt

### 1. Fork repository này

### 2. Tùy chỉnh `config.yml` (tùy chọn)

Chỉnh sửa `config.yml` ở thư mục gốc của repo để thêm, xóa hoặc thay thế các repository theo dõi:

```yaml
# Thêm dự án AI agent mới
openclaw_peers:
  - id: my-agent
    repo: owner/my-agent
    name: My Agent

# Thêm dự án embedded AI mới
embedded_ai_repos:
  - id: my-board
    repo: owner/my-board
    name: My AI Board
```

### 3. Cấu hình LLM Local

Hệ thống sử dụng LLM local qua OpenAI-compatible API. Bạn có thể sử dụng:

- **Ollama**: `http://localhost:11434/v1`
- **LM Studio**: `http://localhost:1234/v1`
- **vLLM**: `http://localhost:8000/v1`
- **Text Generation WebUI**: `http://localhost:5000/v1`
- **Hoặc bất kỳ server nào tương thích OpenAI API`

**Khuyến nghị model**: 
- Qwen2.5 7B/14B/32B
- Llama 3.1 8B/70B
- Mistral 7B/22B
- Hoặc bất kỳ model nào hỗ trợ tiếng Việt tốt

### 4. Cấu hình file .env

Tạo file `.env` trong thư mục gốc của project (copy từ `.env.example`):

```bash
cp .env.example .env
```

Sau đó chỉnh sửa file `.env`:

```bash
# GitHub Token (bắt buộc)
GITHUB_TOKEN=ghp_your_github_token_here

# LLM Local Endpoint (bắt buộc)
OPENAI_BASE_URL=http://localhost:20128/v1
OPENAI_MODEL=qwen2.5:14b

# Repository để tạo GitHub Issues (tùy chọn)
DIGEST_REPO=thanhtantran/agents-radar

# Telegram Notifications (tùy chọn - xem TELEGRAM-QUICKSTART.md)
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789

# GitHub Pages URL (tùy chọn)
PAGES_URL=https://thanhtantran.github.io/agents-radar
```

**Cài đặt thông báo Telegram** (tùy chọn):

Xem hướng dẫn tại: **[docs/TELEGRAM-SETUP.md](./docs/TELEGRAM-SETUP.md)**

Tóm tắt:
1. Tạo bot qua [@BotFather](https://t.me/BotFather) → Lấy Bot Token
2. Lấy Chat ID qua [@userinfobot](https://t.me/userinfobot)
3. Thêm vào file `.env`
4. Test: `pnpm notify`

### 5. Chạy local với Cronjob (Khuyến nghị)

Đây là cách đơn giản nhất vì LLM đã chạy trên máy của bạn:

1. Setup cronjob để chạy tự động mỗi ngày
2. Script sẽ tự động commit và push lên GitHub
3. GitHub Pages sẽ tự động deploy

Xem hướng dẫn: [docs/CRONJOB-SETUP.md](./docs/CRONJOB-SETUP.md)

#### Option B: Sử dụng GitHub Actions (Cần setup thêm)

Nếu muốn dùng GitHub Actions, bạn cần:

1. Host LLM server public (qua ngrok, cloudflare tunnel, v.v.)
2. Hoặc sử dụng cloud LLM (OpenAI, Anthropic, v.v.)
3. Cập nhật `OPENAI_BASE_URL` trong GitHub secrets

**Không khuyến nghị** vì phức tạp và tốn chi phí.

### 6. Kiểm tra

Để kiểm tra ngay lập tức:

**Local:**
```bash
./scripts/run-daily.sh  # Linux/macOS
scripts\run-daily.bat   # Windows
```

**GitHub Actions** (nếu đã setup):
Vào **Actions → Daily Agents Radar → Run workflow**.

## 💻 Chạy cục bộ

### Yêu cầu

- Node.js 18+
- pnpm (hoặc npm/yarn)
- LLM server đang chạy local (Ollama, LM Studio, v.v.)

### Cài đặt

```bash
# Clone repo
git clone https://github.com/thanhtantran/agents-radar.git
cd agents-radar

# Cài đặt dependencies
pnpm install
```

### Cấu hình

Tạo file `.env` hoặc export các biến môi trường:

```bash
# GitHub token (bắt buộc)
export GITHUB_TOKEN=ghp_xxxxx

# LLM local endpoint
export OPENAI_BASE_URL=http://localhost:11434/v1  # Ollama
export OPENAI_MODEL=qwen2.5:14b                    # Model name

# Repository để tạo issues (tùy chọn)
export DIGEST_REPO=thanhtantran/agents-radar

# Telegram (tùy chọn)
export TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
export TELEGRAM_CHAT_ID=your_telegram_id
```

### Chạy thủ công

```bash
# Tạo báo cáo hàng ngày
pnpm start

# Tạo manifest và RSS feed
pnpm manifest

# Gửi thông báo Telegram
pnpm notify
```

### Tự động hóa với Cronjob

Để chạy tự động mỗi ngày lúc 9h sáng:

**Linux/macOS:**
```bash
# Cấp quyền thực thi
chmod +x scripts/run-daily.sh

# Test script
./scripts/run-daily.sh

# Thêm vào crontab
crontab -e

# Thêm dòng này (chạy lúc 9h sáng mỗi ngày)
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

**Windows:**
```cmd
# Test script
scripts\run-daily.bat

# Sau đó setup Task Scheduler:
# 1. Mở Task Scheduler
# 2. Create Task
# 3. Trigger: Daily at 9:00 AM
# 4. Action: Start scripts\run-daily.bat
```

Xem hướng dẫn chi tiết: [docs/CRONJOB-SETUP.md](./docs/CRONJOB-SETUP.md)

## 📁 Định dạng đầu ra

Các file được ghi vào `digests/YYYY-MM-DD/`:

| File                  | Nội dung                                                                                                 | GitHub Issue Label |
| --------------------- | -------------------------------------------------------------------------------------------------------- | ------------------ |
| `ai-agents-vi.md`     | Báo cáo chuyên sâu Hermes Agent + so sánh đa hệ sinh thái + chi tiết các dự án liên quan                 | `hermes`           |
| `ai-embedded-vi.md`   | Báo cáo về Orange Pi, RKLLM, RKNPU và các dự án AI nhúng                                                | `embedded`         |
| `ai-trending-vi.md`   | Báo cáo GitHub AI trending — repo được phân loại theo chiều + tín hiệu xu hướng (chỉ ghi khi có dữ liệu) | `trending`         |

### Cấu trúc `ai-agents-vi.md`:

```markdown
# Bản tin Hệ sinh thái Hermes Agent YYYY-MM-DD

> Issues: N | PRs: N | Dự án: N | Thời gian tạo: UTC

## Phân tích sâu Hermes Agent
  Tóm tắt hôm nay / Releases / Tiến độ dự án / Điểm nổi bật cộng đồng /
  Ổn định & Bugs / Yêu cầu tính năng / Phản hồi người dùng / Backlog

## So sánh hệ sinh thái chéo
  Tổng quan / Bảng so sánh hoạt động / Vị thế Hermes Agent /
  Hướng kỹ thuật chung / Điểm khác biệt / Mức độ trưởng thành / Tín hiệu xu hướng

## Báo cáo các dự án cùng nhóm
  <details> Zeroclaw   — Tóm tắt / Releases / Tiến độ / ...
  <details> EasyClaw   — ...
  <details> LobsterAI  — ...
  ...
```

### Cấu trúc `ai-embedded-vi.md`:

```markdown
# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) YYYY-MM-DD

> Thời gian tạo: UTC | Dự án: N

## So sánh chéo
  Tổng quan hệ sinh thái / Bảng so sánh / Tích hợp phần cứng-phần mềm /
  Hiệu năng NPU / Developer Experience / Use Cases / Xu hướng

## Báo cáo chi tiết từng dự án
  <details> Orange Pi Build System — Tóm tắt / Cập nhật phần cứng / ...
  <details> RKNN Toolkit 2 — ...
  <details> RKNPU2 — ...
```

### Cấu trúc `ai-trending-vi.md`:

```markdown
# Xu hướng AI Mã nguồn mở YYYY-MM-DD

> Nguồn: GitHub Trending + GitHub Search API

## Tóm tắt hôm nay

## Top repos theo chiều
  🤖 AI Agents          — agent frameworks / multi-agent / automation
  🔧 AI Infrastructure  — frameworks / SDKs / inference engines / CLIs
  🧠 Models & Training  — model weights / training frameworks / fine-tuning
  📦 AI Applications    — vertical products / solutions
  🔍 RAG & Knowledge    — vector databases / retrieval augmentation
  🔌 Embedded AI        — NPU / edge AI / Orange Pi / RKLLM / RKNPU

## Phân tích tín hiệu xu hướng

## Tâm điểm cộng đồng
```

Các bản tin lịch sử được lưu trong [`digests/`](./digests/). Issues đã xuất bản được gắn thẻ theo loại: [`hermes`](../../issues?label=hermes) · [`embedded`](../../issues?label=embedded) · [`trending`](../../issues?label=trending)

## ⏰ Lịch chạy

### Cronjob (Local - Khuyến nghị)

```bash
# Chạy lúc 9h sáng mỗi ngày
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

Xem hướng dẫn setup: [docs/CRONJOB-SETUP.md](./docs/CRONJOB-SETUP.md)

### GitHub Actions (Nếu sử dụng)

| Workflow          | Cron        | UTC             | CST             |
| ----------------- | ----------- | --------------- | --------------- |
| Bản tin hàng ngày | `0 0 * * *` | 00:00 hàng ngày | 08:00 hàng ngày |

Để thay đổi lịch, chỉnh sửa biểu thức cron trong file workflow `.github/workflows/daily.yml`.

## 🛠️ Kiến trúc kỹ thuật

### Tech Stack

- **Runtime**: Node.js + TypeScript
- **Package Manager**: pnpm
- **LLM**: OpenAI-compatible API (local)
- **APIs**: GitHub REST API
- **Deployment**: GitHub Actions + GitHub Pages

### Quy trình hoạt động

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions (Daily)                    │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              1. Thu thập dữ liệu (Parallel)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ GitHub Repos │  │   Trending   │  │ Search API   │      │
│  │ Issues/PRs   │  │   (HTML)     │  │  (6 topics)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              2. Xử lý với LLM (Local)                        │
│  • Tóm tắt từng repo (Hermes, peers, embedded AI)           │
│  • So sánh chéo giữa các dự án                               │
│  • Phân loại trending repos theo chiều                       │
│  • Phân tích xu hướng và insights                            │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              3. Tạo báo cáo (Markdown)                       │
│  • ai-agents-vi.md    (Hermes Agent ecosystem)              │
│  • ai-embedded-vi.md  (Orange Pi / RKLLM / RKNPU)           │
│  • ai-trending-vi.md  (GitHub trending analysis)            │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              4. Xuất bản                                     │
│  • Commit files → digests/YYYY-MM-DD/                       │
│  • Create GitHub Issues (với labels)                        │
│  • Update manifest.json + feed.xml                          │
│  • Deploy to GitHub Pages                                   │
│  • Send Telegram notification (optional)                    │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Tùy chỉnh nâng cao

### Thêm repository mới

Chỉnh sửa `config.yml`:

```yaml
openclaw_peers:
  - id: my-new-agent
    repo: owner/repo-name
    name: My New Agent
    paginated: true  # Bật nếu repo có nhiều hoạt động

embedded_ai_repos:
  - id: my-board
    repo: owner/board-repo
    name: My AI Board
```

### Thay đổi giới hạn sampling

Chỉnh sửa `src/prompts-new.ts`:

```typescript
const ISSUE_LIMIT = 50;  // Số issues tối đa
const PR_LIMIT = 30;     // Số PRs tối đa
```

### Tùy chỉnh prompt

Các prompt template nằm trong `src/prompts-new.ts`. Bạn có thể chỉnh sửa để thay đổi:
- Cấu trúc báo cáo
- Ngôn ngữ và tone
- Các phần phân tích
- Độ chi tiết

### Thêm nguồn dữ liệu mới

1. Tạo module fetch trong `src/` (ví dụ: `src/my-source.ts`)
2. Thêm vào `fetchAllData()` trong `src/index.ts`
3. Tạo prompt builder trong `src/prompts-new.ts`
4. Thêm report builder và saver

## 🤝 Đóng góp

Contributions, issues và feature requests đều được chào đón!

1. Fork repo
2. Tạo branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Credits

- Dựa trên ý tưởng từ [compasify/agents-radar](https://github.com/compasify/agents-radar)
- Được tùy chỉnh để tập trung vào Hermes Agent ecosystem và embedded AI

## 📧 Liên hệ

Nếu bạn có câu hỏi hoặc đề xuất, vui lòng tạo issue hoặc liên hệ qua GitHub.

---

**⭐ Nếu project này hữu ích, hãy cho một star!**
