# 🚀 Quick Start Guide

Hướng dẫn nhanh để chạy agents-radar trong 5 phút.

## ✅ Yêu cầu

- Node.js 18+
- pnpm (hoặc npm/yarn)
- LLM server local (Ollama khuyến nghị)
- GitHub token

## 📦 Bước 1: Cài đặt Ollama

```bash
# Linux/Mac
curl -fsSL https://ollama.ai/install.sh | sh

# Windows: Tải từ https://ollama.ai
```

Chạy model:
```bash
ollama run qwen2.5:14b
```

## 🔧 Bước 2: Clone và cài đặt

```bash
git clone https://github.com/thanhtantran/agents-radar.git
cd agents-radar
pnpm install
```

## 🔑 Bước 3: Cấu hình

Tạo file `.env`:

```bash
# GitHub token (lấy từ https://github.com/settings/tokens)
GITHUB_TOKEN=ghp_your_token_here

# LLM endpoint (Ollama mặc định)
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_MODEL=qwen2.5:14b

# Repository của bạn (tùy chọn)
DIGEST_REPO=your-username/agents-radar
```

## ▶️ Bước 4: Chạy

```bash
# Tạo báo cáo hàng ngày
pnpm start

# Tạo manifest và RSS feed
pnpm manifest

# Gửi thông báo Telegram (nếu đã cấu hình)
pnpm notify
```

## 📁 Bước 5: Xem kết quả

Báo cáo được lưu trong `digests/YYYY-MM-DD/`:
- `ai-agents-vi.md` - Hệ sinh thái OpenClaw
- `ai-embedded-vi.md` - AI nhúng (Orange Pi, RKLLM, RKNPU)
- `ai-trending-vi.md` - GitHub trending

## 🌐 Bước 6: Deploy lên GitHub Pages

1. Fork repo này
2. Vào **Settings → Pages**
3. Source: Deploy from a branch
4. Branch: `main` / folder: `/ (root)`
5. Save

Sau vài phút, truy cập: `https://your-username.github.io/agents-radar`

## 🤖 Bước 7: Tự động hóa

### Option A: Cronjob Local (Khuyến nghị)

**Linux/macOS:**
```bash
# Cấp quyền thực thi
chmod +x scripts/run-daily.sh

# Test
./scripts/run-daily.sh

# Thêm vào crontab (chạy lúc 9h sáng)
crontab -e
# Thêm dòng:
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

**Windows:**
```cmd
# Test
scripts\run-daily.bat

# Setup Task Scheduler:
# 1. Mở Task Scheduler
# 2. Create Task
# 3. Trigger: Daily at 9:00 AM
# 4. Action: Start scripts\run-daily.bat
```

Xem chi tiết: [docs/CRONJOB-SETUP.md](./docs/CRONJOB-SETUP.md)

### Option B: GitHub Actions (Không khuyến nghị)

**Lưu ý**: GitHub Actions không thể kết nối đến LLM local của bạn. Bạn cần:
- Sử dụng cloud LLM (OpenAI, Anthropic, v.v.) - TỐN PHÍ
- Hoặc host LLM server public với ngrok/cloudflare tunnel - PHỨC TẠP

Nếu vẫn muốn dùng GitHub Actions:

1. Vào **Settings → Secrets and variables → Actions**
2. Thêm secrets:
   - `GITHUB_TOKEN` (tự động có sẵn)
   - `TELEGRAM_BOT_TOKEN` (tùy chọn)
   - `TELEGRAM_CHAT_ID` (tùy chọn)

3. Thêm variables:
   - `OPENAI_BASE_URL`: `http://localhost:20128/v1`
   - `OPENAI_MODEL`: `qwen2.5:14b`
   - `DIGEST_REPO`: `your-username/agents-radar`

4. Bật workflow trong tab **Actions**

**Lưu ý**: GitHub Actions không thể kết nối đến LLM local của bạn. Bạn cần:
- Sử dụng cloud LLM (OpenAI, Anthropic, v.v.)
- Hoặc host LLM server public với ngrok/cloudflare tunnel
- Hoặc chỉ chạy local và commit results thủ công

## 🎯 Tùy chỉnh

### Thêm repository theo dõi

Chỉnh sửa `config.yml`:

```yaml
openclaw_peers:
  - id: my-agent
    repo: owner/my-agent
    name: My Agent

embedded_ai_repos:
  - id: my-board
    repo: owner/my-board
    name: My AI Board
```

### Thay đổi model

```bash
# Sử dụng model nhỏ hơn (nhanh hơn)
export OPENAI_MODEL=qwen2.5:7b

# Hoặc model lớn hơn (chất lượng cao hơn)
export OPENAI_MODEL=qwen2.5:32b
```

### Thêm Telegram notification

1. Tạo bot với [@BotFather](https://t.me/BotFather)
2. Lấy chat ID từ [@userinfobot](https://t.me/userinfobot)
3. Thêm vào `.env`:

```bash
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=@your_channel
```

## ❓ Troubleshooting

### LLM không kết nối được
```bash
# Kiểm tra Ollama đang chạy
curl http://localhost:11434/v1/models

# Nếu không, khởi động lại
ollama serve
```

### Out of memory
```bash
# Sử dụng model nhỏ hơn
ollama run qwen2.5:7b
```

### GitHub API rate limit
```bash
# Kiểm tra rate limit
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/rate_limit
```

## 📚 Tài liệu đầy đủ

- [README.md](./README.md) - Hướng dẫn chi tiết
- [docs/LLM-SETUP.md](./docs/LLM-SETUP.md) - Cài đặt LLM
- [CHANGELOG.md](./CHANGELOG.md) - Lịch sử thay đổi

## 💬 Hỗ trợ

Nếu gặp vấn đề, tạo issue tại: https://github.com/thanhtantran/agents-radar/issues

---

**🎉 Chúc bạn sử dụng vui vẻ!**
