# Changelog

## [2.0.0] - 2026-04-22

### 🎯 Thay đổi lớn

#### Đơn giản hóa nguồn dữ liệu
- ❌ **Đã xóa**: CLI tools tracking (Claude Code, Codex, Gemini CLI, etc.)
- ❌ **Đã xóa**: Claude Code Skills tracking
- ❌ **Đã xóa**: Web scraping (Anthropic, OpenAI websites)
- ❌ **Đã xóa**: Hacker News tracking
- ❌ **Đã xóa**: Weekly và Monthly rollup reports
- ✅ **Giữ lại**: OpenClaw ecosystem tracking
- ✅ **Giữ lại**: GitHub Trending tracking
- ✅ **Thêm mới**: Embedded AI tracking (Orange Pi, RKLLM, RKNPU)

#### Đơn giản hóa ngôn ngữ
- ❌ **Đã xóa**: Hỗ trợ đa ngôn ngữ (Tiếng Trung, Tiếng Anh)
- ✅ **Chỉ giữ**: Tiếng Việt duy nhất
- ✅ **Cải thiện**: Tất cả prompts được tối ưu cho tiếng Việt

#### Chuyển sang LLM Local
- ❌ **Đã xóa**: Yêu cầu Anthropic API key
- ✅ **Mặc định**: OpenAI-compatible local endpoint
- ✅ **Endpoint**: `http://localhost:20128/v1` (có thể tùy chỉnh)
- ✅ **Không cần API key**: Chạy hoàn toàn offline

### 📊 Báo cáo mới

#### 1. `ai-agents-vi.md` - Hệ sinh thái OpenClaw
- Phân tích sâu OpenClaw
- So sánh với 10+ dự án AI agent tương tự
- Theo dõi issues, PRs, releases
- Phân tích xu hướng và insights

#### 2. `ai-embedded-vi.md` - AI Nhúng
- Orange Pi Build System
- RKNN Toolkit 2
- RKNPU2
- Tập trung vào NPU, edge AI, embedded systems

#### 3. `ai-trending-vi.md` - GitHub Trending
- Trending repos hàng ngày
- Search theo topics: llm, ai-agent, rag, orangepi, rkllm, rknpu
- Phân loại theo chiều: Agents, Infrastructure, Models, Applications, RAG, Embedded AI

### 🔧 Cấu hình

#### `config.yml` mới
```yaml
openclaw:
  id: openclaw
  repo: openclaw/openclaw
  name: OpenClaw

openclaw_peers:
  - id: nanobot
    repo: HKUDS/nanobot
    name: NanoBot
  # ... 10+ peers

embedded_ai_repos:
  - id: orangepi-5
    repo: orangepi-xunlong/orangepi-build
    name: Orange Pi Build System
  - id: rknn-toolkit
    repo: rockchip-linux/rknn-toolkit2
    name: RKNN Toolkit 2
  - id: rknpu2
    repo: rockchip-linux/rknpu2
    name: RKNPU2
```

#### Environment Variables
```bash
# Bắt buộc
GITHUB_TOKEN=ghp_xxx

# LLM Local (mặc định)
OPENAI_BASE_URL=http://localhost:20128/v1
OPENAI_MODEL=qwen2.5:14b

# Tùy chọn
DIGEST_REPO=thanhtantran/agents-radar
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=@channel
```

### 🗑️ Files đã xóa

- `src/web.ts` - Web scraping module
- `src/hn.ts` - Hacker News module
- `src/weekly.ts` - Weekly rollup
- `src/monthly.ts` - Monthly rollup
- `src/rollup.ts` - Rollup utilities

### ✨ Files mới

- `src/prompts.ts` - Simplified prompts (Vietnamese only)
- `docs/LLM-SETUP.md` - LLM setup guide
- `.env.example` - Environment variables template
- `CHANGELOG.md` - This file

### 📝 Files đã cập nhật

- `README.md` - Hoàn toàn viết lại với hướng dẫn chi tiết
- `README.en.md` - English version (simplified)
- `config.yml` - Cấu hình mới
- `src/index.ts` - Logic đơn giản hơn
- `src/config.ts` - Load embedded_ai_repos
- `src/trending.ts` - Thêm Orange Pi, RKLLM, RKNPU keywords
- `src/report.ts` - Thêm "embedded" label
- `src/github.ts` - Thêm màu cho "embedded" label
- `src/notify.ts` - Cập nhật cho Vietnamese only
- `src/generate-manifest.ts` - Cập nhật URL
- `package.json` - Xóa weekly/monthly scripts

### 🎨 GitHub Pages

- URL: `https://thanhtantran.github.io/agents-radar`
- RSS Feed: `https://thanhtantran.github.io/agents-radar/feed.xml`

### 🏷️ GitHub Issue Labels

- `openclaw` (🔴 red) - OpenClaw ecosystem reports
- `embedded` (🟢 green) - Embedded AI reports
- `trending` (🟡 yellow) - GitHub trending reports

### 🚀 Workflow

- Chạy hàng ngày lúc 00:00 UTC (08:00 CST)
- Không còn weekly/monthly workflows

### 📦 Dependencies

Không thay đổi, vẫn sử dụng:
- `@anthropic-ai/sdk` (cho backward compatibility)
- `openai` (cho local LLM)
- `js-yaml`
- TypeScript + tsx

### 🔄 Migration Guide

Nếu bạn đang sử dụng version cũ:

1. **Cập nhật config.yml**:
   - Xóa `cli_repos` và `skills_repo`
   - Thêm `embedded_ai_repos`

2. **Cập nhật environment variables**:
   - Xóa `ANTHROPIC_API_KEY` và `ANTHROPIC_BASE_URL`
   - Thêm `OPENAI_BASE_URL=http://localhost:20128/v1`
   - Đặt `OPENAI_API_KEY=not-needed` (hoặc bỏ trống)

3. **Cài đặt LLM local**:
   - Xem `docs/LLM-SETUP.md`
   - Khuyến nghị: Ollama với Qwen2.5

4. **Cập nhật GitHub Pages URL**:
   - Thay đổi từ `compasify` sang `thanhtantran`

5. **Xóa old digests** (tùy chọn):
   - Các file cũ vẫn tương thích
   - Có thể giữ lại hoặc xóa

### 🎯 Lợi ích

- ✅ **Đơn giản hơn**: Ít nguồn dữ liệu, ít code
- ✅ **Nhanh hơn**: Không cần web scraping, HN API
- ✅ **Rẻ hơn**: Không cần API key, chạy local
- ✅ **Tập trung hơn**: Chỉ theo dõi OpenClaw và embedded AI
- ✅ **Tiếng Việt tốt hơn**: Prompts được tối ưu
- ✅ **Dễ maintain hơn**: Ít dependencies, ít complexity

### 🐛 Known Issues

- Không có

### 📅 Roadmap

- [ ] Thêm hỗ trợ cho các board AI khác (Raspberry Pi, Jetson)
- [ ] Thêm tracking cho AI frameworks trên embedded
- [ ] Cải thiện phân loại trending repos
- [ ] Thêm metrics và analytics

---

## [1.0.0] - 2026-02-23

Version gốc từ compasify/agents-radar với:
- Multi-language support (ZH, EN, VI)
- CLI tools tracking
- Web scraping
- Hacker News
- Weekly/Monthly rollups
- Anthropic API
