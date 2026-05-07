# Bản tin Hệ sinh thái OpenClaw 2026-05-07

> Issues: 202 | PRs: 500 | Dự án: 13 | Thời gian tạo: 2026-05-07 02:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## Phân tích sâu OpenClaw

⚠️ Tạo tóm tắt thất bại.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 2026-05-07

## 🌍 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **bùng nổ đa dạng hóa** với 13 dự án được theo dõi, trong đó **7 dự án có hoạt động tích cực** trong 24 giờ qua. Điểm đáng chú ý:

- **Velocity cực cao**: Zeroclaw dẫn đầu với 50 PRs, theo sau là NanoBot (38 PRs) và PicoClaw (62 PRs)
- **Phân hóa rõ rệt**: Các dự án đang tìm kiếm định vị riêng - từ enterprise (Zeroclaw) đến edge/mobile (NanoBot), multi-channel (PicoClaw)
- **Maturity phase**: Nhiều dự án chuyển từ "feature rush" sang "stability & polish" (NanoBot, NanoClaw, PicoClaw)
- **Security awareness**: Xu hướng hardening bảo mật xuất hiện đồng loạt (NanoBot API auth, NanoClaw container security, Zeroclaw multi-instance)

---

## 📈 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Velocity | Trạng thái | Điểm nổi bật |
|-------|--------|-----|----------|----------|------------|--------------|
| **OpenClaw** | 202 | 500 | 2 | 🔴 Không rõ | ⚠️ Thiếu dữ liệu | Dự án gốc, cần phân tích sâu |
| **Zeroclaw** | 24 | 50 | 0 | 🔥 Cực cao | 🚀 Mở rộng nhanh | Provider diversity (30+ integrations) |
| **PicoClaw** | 21 | 62 | 1 | 🔥 Cực cao | 🔧 Stability focus | Multi-channel, MCP integration |
| **NanoBot** | 16 | 38 | 0 | 🔥 Cao | 🔒 Security hardening | Edge/mobile, lightweight (~4K lines) |
| **NanoClaw** | 4 | 25 | 0 | 🔥 Cao | ✨ UX polish | Setup experience, Podman support |
| **CoPaw** | 27 | 26 | 1 | 🟡 Trung bình | ⚠️ Thiếu dữ liệu | Multi-agent collaboration |
| **LobsterAI** | 1 | 30 | 0 | 🟡 Trung bình | ⚠️ Thiếu dữ liệu | Youdao NetEase backing |
| **IronClaw** | 16 | 47 | 0 | 🟡 Trung bình | ⚠️ Thiếu dữ liệu | NEAR AI ecosystem |
| **Moltis** | 6 | 11 | 0 | 🟢 Thấp | ⚠️ Thiếu dữ liệu | Niche positioning |
| **NullClaw** | 1 | 1 | 0 | 🔵 Rất thấp | ⚠️ Thiếu dữ liệu | Early stage |
| **TinyClaw** | 0 | 0 | 0 | ⚫ Không hoạt động | 💤 Dormant | Không có hoạt động |
| **ZeptoClaw** | 0 | 0 | 0 | ⚫ Không hoạt động | 💤 Dormant | Không có hoạt động |
| **EasyClaw** | 0 | 0 | 1 | 🔵 Rất thấp | ⚠️ Thiếu dữ liệu | Release-only activity |

### 📊 Phân tích velocity:

- **Tier 1 (Cực cao)**: Zeroclaw, PicoClaw, NanoBot, NanoClaw - đây là các dự án **production-ready** với cộng đồng active
- **Tier 2 (Trung bình)**: CoPaw, LobsterAI, IronClaw - có tiềm năng nhưng thiếu visibility
- **Tier 3 (Thấp/Dormant)**: TinyClaw, ZeptoClaw, NullClaw, EasyClaw - có thể là side projects hoặc đã bị abandon

---

## 🎯 3. Vị thế của OpenClaw

### ⚠️ **Vấn đề nghiêm trọng: Thiếu dữ liệu phân tích**

OpenClaw có **202 issues** và **500 PRs** - con số lớn nhất trong hệ sinh thái, nhưng:

- ❌ Không có tóm tắt hoạt động chi tiết
- ❌ Không rõ velocity thực tế (500 PRs là tích lũy hay trong 24h?)
- ❌ Không có thông tin về releases gần đây
- ❌ Không có insights về community engagement

### 🔍 **Suy luận từ dữ liệu gián tiếp:**

**Giả thuyết 1: OpenClaw là "upstream" project**
- Các dự án khác (Zeroclaw, PicoClaw, NanoClaw) có tên gợi ý fork/variant
- 500 PRs và 202 issues cho thấy đây là dự án **mature** với lịch sử dài
- 2 releases có thể là major versions (v1, v2?)

**Giả thuyết 2: OpenClaw đang trong giai đoạn "slow burn"**
- Không có hoạt động nổi bật trong 24h qua
- Các fork đang phát triển nhanh hơn upstream
- Có thể đang focus vào stability thay vì features mới

**Giả thuyết 3: Fragmentation risk**
- Zeroclaw (50 PRs), PicoClaw (62 PRs) có velocity cao hơn nhiều
- Cộng đồng có thể đang phân tán sang các forks
- OpenClaw cần reassert leadership hoặc risk becoming "legacy"

### 💡 **Khuyến nghị cho OpenClaw:**

1. **Tăng transparency**: Publish daily/weekly activity reports
2. **Community engagement**: Highlight unique value vs forks
3. **Roadmap clarity**: Communicate vision để giữ contributors
4. **Governance model**: Xác định mối quan hệ với các forks (collaboration vs competition)

---

## 🔧 4. Hướng kỹ thuật chung

### 🎯 **Xu hướng được nhiều dự án áp dụng:**

#### 1️⃣ **Provider Diversity Strategy** 🌐
- **Zeroclaw**: 30+ AI providers (OpenAI-compatible)
- **PicoClaw**: Multi-provider với fallback logic
- **NanoBot**: Hỗ trợ DeepSeek, GLM, OpenAI, Codex

**Insight**: Không ai muốn bị lock-in vào một vendor. Chiến lược "embrace all providers" đang thắng.

#### 2️⃣ **Multi-Channel Architecture** 📱
- **Zeroclaw**: Twitch, Lemmy, Mastodon, Rocket.Chat, Zulip
- **PicoClaw**: Telegram, Discord, Feishu, DingTalk, LINE, QQ, Weixin
- **NanoClaw**: Slack, WhatsApp, Matrix

**Insight**: AI agents cần "meet users where they are" - không chỉ web UI.

#### 3️⃣ **MCP (Model Context Protocol) Integration** 🔌
- **PicoClaw**: MCP UI configuration (#2770)
- **NanoClaw**: yt-dlp MCP server, Baget.ai tools
- **NanoBot**: MCP server connection fixes

**Insight**: MCP đang trở thành "standard" cho tool integration, giống như LSP cho code editors.

#### 4️⃣ **Security Hardening** 🔒
- **NanoBot**: API Bearer token auth (#3649)
- **NanoClaw**: Container boundary security (#1999, #2000, #2004)
- **Zeroclaw**: Multi-instance isolation (#6487)

**Insight**: Dự án đang chuyển từ "demo" sang "production-ready" - security không còn là afterthought.

#### 5️⃣ **Edge/Mobile Optimization** 📲
- **NanoBot**: Ultra-lightweight (~4K lines), mobile-first
- **NanoClaw**: Podman support, Apple Container
- **PicoClaw**: Android app với voice recognition

**Insight**: Xu hướng "AI at the edge" - không phải mọi thứ đều cần cloud.

#### 6️⃣ **Dream/Memory Systems** 💭
- **NanoBot**: Dream system với auto-consolidation
- **PicoClaw**: Session management với timestamps
- **NanoClaw**: Context preservation across migrations

**Insight**: Long-term memory là differentiator - agents cần "remember" để hữu ích.

---

## 🎨 5. Điểm khác biệt

### 🏆 **Zeroclaw: The Enterprise Play**

**Chiến lược**: "Embrace everything"
- ✅ 30+ providers, 15+ channels
- ✅ Self-hosted focus (Mastodon, Lemmy, Rocket.Chat)
- ✅ Release automation (v0.7.5)
- ✅ Dashboard-first UX

**Target audience**: Enterprise, privacy-conscious orgs, self-hosters

**Weakness**: Complexity - có thể overwhelming cho individual users

---

### 🚀 **PicoClaw: The Multi-Channel Champion**

**Chiến lược**: "Be everywhere"
- ✅ Deepest channel integration (9+ platforms)
- ✅ Strong Asian market focus (Feishu, DingTalk, QQ, Weixin)
- ✅ MCP UI configuration
- ✅ Voice recognition (Groq ASR)

**Target audience**: Teams using diverse communication tools, Asian markets

**Weakness**: Session management issues (#2310, #2787) - stability concerns

---

### 🔬 **NanoBot: The Edge Specialist**

**Chiến lược**: "Small is beautiful"
- ✅ Ultra-lightweight (~4K lines)
- ✅ Mobile/edge optimization
- ✅ Agent Identity Protocol (#3639)
- ✅ Local-first features

**Target audience**: Mobile developers, edge computing, IoT

**Weakness**: Smaller feature set - tradeoff for size

---

### 🎨 **NanoClaw: The UX Perfectionist**

**Chiến lược**: "Make it easy"
- ✅ 7 PRs liên tiếp polish Slack setup
- ✅ Non-technical user focus
- ✅ Podman support (Docker alternative)
- ✅ GitHub polling mode (no port exposure)

**Target audience**: Non-technical users, macOS developers, firewall-restricted environments

**Weakness**: Chưa rõ unique technical moat - có thể bị commoditize

---

### 🤝 **CoPaw: The Collaboration Specialist**

**Chiến lược**: "Multi-agent orchestration"
- ✅ AgentScope backing (Alibaba research)
- ✅ Focus on agent-to-agent communication
- ✅ 27 issues, 26 PRs - balanced activity

**Target audience**: Researchers, complex workflow automation

**Weakness**: Thiếu visibility - cần marketing tốt hơn

---

## 👥 6. Mức độ trưởng thành cộng đồng

### 🥇 **Tier 1: Mature Communities**

**Zeroclaw** 🌟🌟🌟🌟🌟
- 50 PRs trong 24h, contributor @theonlyhennygod cực kỳ active
- Organized roadmap (v0.7.5, v0.8.0)
- High-quality discussions (logo design, architecture proposals)
- **Maturity score**: 9/10

**PicoClaw** 🌟🌟🌟🌟
- 62 PRs, strong Asian community presence
- Active issue triage (S1/S2/S3 severity labels)
- Nightly builds cho early adopters
- **Maturity score**: 8/10

**NanoBot** 🌟🌟🌟🌟
- 38 PRs, focus on quality over quantity
- Security-conscious community
- Technical depth (CPU leak diagnosis, MCP connection debugging)
- **Maturity score**: 8/10

---

### 🥈 **Tier 2: Growing Communities**

**NanoClaw** 🌟🌟🌟
- 25 PRs, strong UX focus
- Real user feedback driving changes
- Good contributor diversity
- **Maturity score**: 7/10

**CoPaw** 🌟🌟🌟
- 26 PRs, 27 issues - balanced
- Academic backing (AgentScope)
- Needs more public visibility
- **Maturity score**: 6/10

---

### 🥉 **Tier 3: Early Stage / Uncertain**

**LobsterAI, IronClaw, Moltis** 🌟🌟
- Activity present but lacking transparency
- Corporate backing (Youdao, NEAR) but unclear community
- **Maturity score**: 5/10

**NullClaw, EasyClaw** 🌟
- Minimal activity
- Unclear value proposition
- **Maturity score**: 3/10

**TinyClaw, ZeptoClaw** ⚫
- Dormant
- **Maturity score**: 1/10

---

## 🔮 7. Tín hiệu xu hướng

### 📈 **Xu hướng đang lên**

#### 1️⃣ **Consolidation Phase** 🏗️
**Tín hiệu:**
- NanoBot, PicoClaw, NanoClaw đều focus vào bug fixes > new features
- Security hardening xuất hiện đồng loạt
- UX polish (setup experience, error messages)

**Dự đoán**: Q3-Q4 2026 sẽ thấy các dự án mature release "v1.0 production-ready"

---

#### 2️⃣ **MCP Ecosystem Explosion** 🔌
**Tín hiệu:**
- 3/4 dự án active đang integrate MCP
- MCP UI configuration tools xuất hiện
- Streamable HTTP transport requests (#2782)

**Dự đoán**: MCP sẽ trở thành "de facto standard" cho AI agent tool integration, giống như LSP cho editors

---

#### 3️⃣ **Edge Computing Shift** 📲
**Tín hiệu:**
- NanoBot's lightweight architecture (~4K lines)
- Local Whisper transcription (#2009)
- Podman support, Apple Container
- Agent Identity Protocol cho cross-device trust

**Dự đoán**: 2027 sẽ thấy AI agents chạy native trên smartphones, không cần cloud

---

#### 4️⃣ **Self-Hosted Renaissance** 🏠
**Tín hiệu:**
- Zeroclaw focus vào Mastodon, Lemmy, Rocket.Chat
- GitHub polling mode (no port exposure)
- Privacy-first features

**Dự đoán**: Backlash against cloud lock-in sẽ thúc đẩy self-hosted solutions

---

#### 5️⃣ **Multi-Agent Orchestration** 🤖🤖🤖
**Tín hiệu:**
- CoPaw's multi-agent focus
- NanoBot's Agent Identity Protocol
- Zeroclaw's "everything is a plugin" proposal (#6489)

**Dự đoán**: 2027 sẽ thấy "agent swarms" - nhiều specialized agents collaborate thay vì một monolithic agent

---

### 📉 **Xu hướng đang xuống**

#### 1️⃣ **Monolithic Architectures** 🏢
- Các dự án đang tách thành plugins/modules
- Provider diversity thay vì single-vendor lock-in

#### 2️⃣ **Cloud-Only Solutions** ☁️
- Edge/mobile optimization đang được ưu tiên
- Local-first features (Whisper, tokenizer)

#### 3️⃣ **CLI-First UX** 💻
- Dashboard/UI improvements xuất hiện đồng loạt
- Non-technical user focus (NanoClaw)

---

### ⚠️ **Rủi ro cần theo dõi**

#### 1️⃣ **Fragmentation Risk** 🧩
- 13 dự án với overlapping features
- Không rõ ai là "winner"
- OpenClaw có thể mất vị trí leadership

**Khuyến nghị**: Cần consolidation hoặc clear differentiation

---

#### 2️⃣ **Sustainability Concerns** 💰
- Velocity cao nhưng không rõ funding model
- Nhiều dự án dựa vào individual contributors
- Risk of burnout

**Khuyến nghị**: Cần business model rõ ràng (SaaS, support contracts, enterprise licensing)

---

#### 3️⃣ **Security Debt** 🔓
- Nhiều dự án mới bắt đầu hardening
- Production deployment có thể expose vulnerabilities
- Multi-instance bugs (#6487) cho thấy architecture chưa mature

**Khuyến nghị**: Security audit trước khi claim "production-ready"

---

## 🎯 Kết luận chiến lược

### 🏆 **Winners hiện tại:**
1. **Zeroclaw** - Enterprise play với ecosystem rộng nhất
2. **PicoClaw** - Multi-channel champion, strong Asian presence
3. **NanoBot** - Edge specialist với technical depth

### 🚀 **Dark horses:**
1. **NanoClaw** - UX focus có thể win mainstream users
2. **CoPaw** - Multi-agent orchestration là future

### ⚠️ **At risk:**
1. **OpenClaw** - Cần reassert leadership hoặc risk becoming legacy
2. **TinyClaw, ZeptoClaw** - Dormant, có thể đã abandoned

### 💡 **Cơ hội cho OpenClaw:**

Nếu OpenClaw muốn giữ vị trí leadership:

1. **Transparency**: Publish activity reports, roadmap rõ ràng
2. **Governance**: Xác định mối quan hệ với forks (collaboration framework)
3. **Unique value**: Tìm moat riêng - có thể là:
   - **Standards body**: Define protocols mà forks implement
   - **Research platform**: Focus on cutting-edge features
   - **Enterprise grade**: Highest quality, slowest but most stable
4. **Community building**: Foster ecosystem thay vì compete với forks

**Bottom line**: Hệ sinh thái đang healthy và growing, nhưng cần consolidation để tránh fragmentation. OpenClaw có cơ hội trở thành "Linux kernel" của AI agents - nền tảng mà mọi người build on top - nhưng cần action nhanh. 🚀

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích NanoBot - 2026-05-07

## 📊 Tóm tắt hôm nay

Ngày 7/5/2026 chứng kiến một đợt sửa lỗi và cải tiến mạnh mẽ với **38 PRs** và **16 issues** được xử lý. Trọng tâm là khắc phục các vấn đề nghiêm trọng về bảo mật API, CPU leak trong MCP, và cải thiện trải nghiệm WebUI. Cộng đồng đang tích cực phản hồi về các lỗi liên quan đến DeepSeek API và tính năng Dream.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng nhiều bản vá quan trọng đã được merge vào nhánh `main` và `nightly`.

---

## 🔧 Tiến độ dự án

### **Bảo mật & Ổn định hạ tầng** 🔒

**PR #3649** - Thêm xác thực Bearer token cho API server
- Khắc phục lỗ hổng bảo mật mức độ **medium** khi API không có authentication
- Cho phép cấu hình `api_key` tùy chọn, yêu cầu header `Authorization: Bearer <token>`
- Endpoint `/health` vẫn public để monitoring

**PR #3640** [MERGED] - Sửa CPU spin 100% do MCP server
- **Root cause**: `asyncio.create_task` tạo MCP connections trong child task, nhưng `close_mcp` gọi từ main task → anyio CancelScope mismatch
- **Giải pháp**: Chuyển sang kết nối tuần tự thay vì song song
- Ảnh hưởng: Người dùng chạy nanobot-soulboard (embedding app) gặp CPU leak nghiêm trọng

### **Cải thiện WebUI** 🎨

**PR #3661** [MERGED] - Polish chat UX
- Cải tiến sidebar: search/grouping sessions, blank landing page cho new chat
- Thêm tính năng copy assistant reply
- **Tự động tạo session title** bất đồng bộ qua websocket event `session_updated`
- Cập nhật styling: composer, header controls, assistant message layout

**PR #3656 → #3658** - Sửa lỗi LAN access cho WebUI
- Ban đầu `/webui/bootstrap` chặn tất cả non-localhost → không thể truy cập từ LAN khi bind `0.0.0.0`
- PR #3656 nới lỏng check nhưng **không yêu cầu auth** → lỗ hổng bảo mật mới
- PR #3658 bổ sung: Bắt buộc `token_issue_secret` khi `host: "0.0.0.0"` để ngăn LAN devices lấy token tự do

### **Xử lý lỗi DeepSeek API** 🤖

**Issue #3665** [OPEN] - `reasoning_content` error sau vài queries
- Lỗi: `"The reasoning_content in the thinking mode must be passed back to the API"`
- Xảy ra với `deepseek-v4-flash` sau một số lượt hội thoại
- Liên quan đến **Issue #3584** [CLOSED] - đã có patch nhưng vẫn tái phát

**PR #3654** [OPEN] - Chỉ định `thinking_style` cho MIMO provider
- MIMO dùng `thinking_type` thay vì default → cần set explicit để enable extended thinking

### **Dream System Improvements** 💭

**PR #3660** [MERGED] - Restore cursor cùng memory state
- **Bug**: `/dream_restore` khôi phục memory files nhưng không rollback `.dream_cursor` → dream tiếp theo bỏ qua gap
- **Fix**: Track cursor trong GitStore, thêm regression test

**PR #3591** [OPEN] - Thêm update scope controls
- Cho phép disable Dream hoặc giới hạn chỉ update memory/context
- Tránh skill drift không mong muốn khi auto-consolidation

**Issue #3652** [OPEN] - Yêu cầu tùy chọn disable Dream hoàn toàn

### **Channel Fixes** 📱

**PR #3645** [MERGED] - Sửa WhatsApp gửi từng token riêng lẻ
- **Bug**: Khi provider có `supports_progress_deltas = True` (OpenAI Codex), WhatsApp gửi mỗi token LLM thành 1 message riêng
- **Fix**: Gate progress deltas cho non-streaming channels, chỉ gửi final reply

**PR #3659** [MERGED] - WeChat channel mất message im lặng
- **Root cause**: 2 bugs phối hợp:
  1. `except Exception: pass` nuốt lỗi API không retry
  2. Channel stuck khi API fail, chỉ recover khi user gửi message mới
- **Fix**: Raise exceptions thay vì silent catch, cho phép retry logic hoạt động

**PR #3664** [OPEN] - Log errors trong Matrix + Weixin silent handlers
- 5 bare `except Exception` blocks không output gì → khó debug
- Thêm `logger.exception` để preserve tracebacks

---

## 🌟 Điểm nổi bật cộng đồng

### **Issue #3618** [CLOSED] - Bug nghiêm trọng: Model not available in region (11 comments)
- User @bigsinger gặp lỗi 403 từ 25/4 đến 4/5
- **Giải pháp**: Restore từ backup, reinstall → fix
- Phản ánh vấn đề regional availability của GLM-5.1 (Zhipu)

### **Issue #3639** [CLOSED] - Proposal: Identity + Onboarding protocols (3 comments)
- @vystartasv đề xuất **Agent Identity Protocol** cho cross-agent trust
- Sử dụng Ed25519 keypairs, verifiable credentials
- Phù hợp với vision "ultra-lightweight AI agent" (~4K lines) cho mobile/edge

### **PR #3672** [OPEN] - Enable full Ruff F rules
- Nâng cấp CI từ chỉ check F401/F841 lên toàn bộ F rules
- Fix tất cả F821 errors (undefined names)
- Cải thiện code quality tại CI stage

---

## 🐛 Ổn định & Bugs

### **Đã sửa** ✅
1. **CPU leak 100%** do MCP server connection mismatch (#3640)
2. **WhatsApp token spam** khi dùng streaming providers (#3645)
3. **WeChat silent message loss** do exception swallowing (#3659)
4. **Dream cursor không rollback** khi restore (#3660)
5. **WebUI LAN access** bị chặn khi bind 0.0.0.0 (#3656, #3658)
6. **API không có authentication** (#3649)

### **Đang xử lý** 🔄
1. **DeepSeek reasoning_content error** sau vài queries (#3665)
2. **Runtime context leak** vào persisted chat history (#3670, #3671)
3. **Groq transcription config** không rõ ràng (#3637)
4. **Duplicate item ID** khi dùng GPT (#3633)

### **Cần chú ý** ⚠️
- **Issue #3605**: Safety guard abort không gửi error message đến user → silent failure
- **Issue #2132**: Runtime context metadata merge vào user messages (đang fix ở #3666, #3671)

---

## 💡 Yêu cầu tính năng

### **Đã implement** ✨
1. **Model presets** (#3358) - Quick switching giữa các model configs
2. **Configurable tool hint truncation** (#3641) - Control độ dài tool commands hiển thị
3. **Show reasoning content** trong CLI (#3655) - Display model thinking khi streaming
4. **Heartbeat decoupling** (#1443) - Reasoning im lặng, chỉ gửi explicit messages
5. **MCP ImageContent support** (#2438) - Handle charts/graphs từ FastMCP

### **Đang đề xuất** 🎯
1. **Bot name & icon customization** (#3650) - Thay "nanobot" bằng tên tùy chỉnh
2. **Local tokenizer** (#3647) - Tránh network dependency cho token estimation
3. **Dream disable option** (#3652) - Tắt hoàn toàn Dream system
4. **Preserve /stop context** (#2526) - Giữ user message + tool calls khi cancel

---

## 💬 Phản hồi người dùng

### **Tích cực** 👍
- Cộng đồng đánh giá cao tốc độ fix bugs (nhiều PRs merge trong ngày)
- WebUI improvements được chào đón (polish UX, session titles)
- Model presets giúp switching dễ dàng hơn

### **Khó khăn** 😓
- **DeepSeek API instability**: Lỗi `reasoning_content` tái phát sau khi đã patch
- **Dream system confusion**: Users không rõ cách restore hoạt động, muốn option disable
- **Transcription config**: Groq/OpenAI Whisper setup không intuitive (#3637)
- **Regional model availability**: GLM-5.1 không khả dụng ở một số regions (#3618)

### **Documentation gaps** 📚
- Cần clarify transcription provider configuration
- Dream restore behavior cần document rõ hơn
- Safety guard error handling cần visible feedback

---

## 🗺️ Backlog & Roadmap

### **Ưu tiên cao** 🔥
1. **Ổn định DeepSeek integration** - Lỗi reasoning_content cần root cause analysis
2. **Runtime context architecture** - Tách ephemeral metadata khỏi persisted history
3. **Error visibility** - Safety guard + channel errors cần user feedback
4. **MCP stability** - Đảm bảo không còn resource leaks

### **Cải tiến trải nghiệm** 🎨
1. **WebUI polish** - Tiếp tục refine chat layout, session management
2. **CLI reasoning display** - Show model thinking process
3. **Customization options** - Bot name, icon, Dream controls

### **Hạ tầng** 🏗️
1. **Code quality** - Full Ruff F rules enforcement (#3672)
2. **Logging improvements** - Preserve tracebacks, add context (#3651)
3. **Security hardening** - API auth, input validation

### **Tính năng mới** ✨
1. **Agent Identity Protocol** - Cross-agent trust framework (#3639)
2. **Focus key persistence** - Auto-inject vào sessions (#3622)
3. **Local tokenizer** - Offline token estimation (#3647)

---

## 📈 Xu hướng phát triển

- **Maturity phase**: Focus chuyển từ features sang stability + polish
- **Production readiness**: Security, error handling, logging được ưu tiên
- **User experience**: WebUI, CLI, channel improvements song song
- **Edge/mobile optimization**: Giữ lightweight (~4K lines), local-first features
- **Ecosystem thinking**: Agent identity, cross-agent protocols cho tương lai

**Kết luận**: NanoBot đang trong giai đoạn consolidation mạnh mẽ, chuẩn bị cho production deployment với focus vào reliability, security, và developer experience. 🚀

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo phân tích dự án Zeroclaw - Ngày 2026-05-07

## 🎯 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn mở rộng hệ sinh thái tích hợp mạnh mẽ với **30+ PRs mới** tập trung vào việc bổ sung các nhà cung cấp AI model và kênh giao tiếp. Đặc biệt, dự án đang chuẩn bị phát hành **v0.7.5** với chủ đề tự động hóa release pipeline. Một lỗi nghiêm trọng về xung đột multi-instance channel (#6487) đã được phát hiện, ảnh hưởng đến khả năng chạy nhiều agent với cùng loại channel.

---

## 🚀 Releases

### v0.7.5 - Đang chuẩn bị
**Chủ đề:** Release Automation Release

- **PR #6492** đã bump version lên v0.7.5 (merged vào master)
- **Issue #5878** tracking milestone với 8 comments, đánh dấu là `gateway`, `risk: high`, `priority:p1`
- **Mục tiêu:** Loại bỏ hoàn toàn quy trình release thủ công, mọi release từ đây đều được tự động hóa và có chủ đích
- **Ý nghĩa:** Đây là bước chuyển quan trọng trong việc chuyên nghiệp hóa quy trình phát triển, giảm thiểu lỗi human error trong quá trình release

---

## 📈 Tiến độ dự án

### 🔥 Xu hướng chính: Mở rộng hệ sinh thái tích hợp

#### 1️⃣ **Bổ sung nhà cung cấp AI Model (7 PRs mới)**
Zeroclaw đang tích hợp hàng loạt nhà cung cấp AI mới, tất cả đều OpenAI-compatible:

- **#6463** - Inception Labs (Mercury): Mô hình ngôn ngữ dựa trên diffusion thay vì transformer truyền thống
- **#6462** - Lambda AI Inference: GPU-cloud nổi tiếng với catalog Llama, DeepSeek, Qwen
- **#6461** - Arcee AI: Chuyên về các mô hình nhỏ, nhanh, fine-tuned cho tác vụ cụ thể
- **#6460** - Featherless AI: Nền tảng serverless với hàng nghìn mô hình từ HuggingFace
- **#6459** - Upstage Solar: Mô hình foundation từ Hàn Quốc, mạnh về đa ngôn ngữ (KO/EN/JA)
- **#6445** - GitHub Models: Tích hợp với GitHub PAT, free tier hào phóng
- **#6440** - Morph: Chuyên về fast apply-edits (10,500+ tok/s)

**Phân tích:** Chiến lược "provider diversity" này cho phép người dùng linh hoạt chọn model phù hợp với nhu cầu (tốc độ, chi phí, chuyên môn) thay vì bị lock-in vào một nhà cung cấp.

#### 2️⃣ **Mở rộng kênh giao tiếp (8 PRs mới)**
Zeroclaw đang tích hợp các nền tảng chat/messaging mới:

- **#6446** - Twitch Chat: Wrapper mỏng trên IRC cho streaming
- **#6442** - Lemmy: Private message polling cho fediverse
- **#6438** - Zulip: Long-poll Events API cho team chat
- **#6436** - Rocket.Chat: REST polling cho self-hosted Slack alternative
- **#6426** - Mastodon: ActivityPub cho fediverse
- **#6469** - Sinch SMS
- **#6468** - Telnyx SMS
- **#6467** - Plivo SMS
- **#6429** - Twilio SMS

**Phân tích:** Tập trung mạnh vào các nền tảng self-hosted và open-source (Mastodon, Lemmy, Rocket.Chat, Zulip) cho thấy Zeroclaw hướng đến cộng đồng privacy-conscious và enterprise có yêu cầu on-premise.

#### 3️⃣ **Cải tiến kiến trúc quan trọng**

**PR #6403** - Typed-family split cho model + TTS providers (XL, risk: high)
- Tái cấu trúc cách config provider thành typed family configs
- Loại bỏ aliases/synonyms trong registry
- **Chưa merge vào master**, đang target branch `integration/v0.8.0`
- Đây là groundwork cho v0.8.0, sẽ squash merge sau

**PR #6417** - Tách llama.cpp thành dedicated provider (XL, risk: high)
- Tạo `LlamaCppProvider` riêng biệt, route qua OpenAI Responses API
- Tách khỏi generic `OpenAICompatibleProvider`
- Cho phép llama.cpp có behavior riêng (streaming, tool-calling)

---

## 🌟 Điểm nổi bật cộng đồng

### 🎨 Issue #4710 - Logo mới cho Zeroclaw
- **10 comments, 2 👍**
- Cộng đồng đang thảo luận về thiết kế logo mới
- Đánh dấu `enhancement`, `priority:p2`, `status:accepted`
- Cho thấy dự án quan tâm đến brand identity

### 📊 Issue #6151 - Web interaction platform tracking
- **Closed** - Track UX/UI/onboarding cho gateway dashboard
- Mục tiêu: Biến dashboard thành first-class interaction surface, không cần CLI
- Liên quan đến PR #6370 (dashboard self-update) và #6392 (nodes dashboard)

---

## 🐛 Ổn định & Bugs

### 🚨 **Critical Bug #6487** - Multi-alias channel instances clobber each other
**Severity: S1 (blocker), Priority: P0**

**Vấn đề:**
- Khi chạy 2 agents với cùng loại channel (ví dụ: 2 Matrix instances), chúng silently clobber lẫn nhau
- Matrix shared `state_dir` corrupts sessions
- Multi-agent dispatch dùng single `ChannelRuntimeContext`

**Tác động:** Không thể chạy multi-agent setup với cùng channel type - đây là blocker cho production deployment

**Trạng thái:** Issue mới mở hôm nay, chưa có PR fix

---

### ⚠️ **High Severity Bugs**

#### Bug #6472 - Gateway không thể dùng Postgres
- **S2 severity, risk: high**
- Runtime panic: "Cannot start a runtime from within a runtime"
- Ảnh hưởng: Memory backend Postgres không hoạt động
- **2 comments**, đang được investigate

#### Bug #6413 - WhatsApp Web reacts to own-account messages (CLOSED)
- **S1 severity** - Agent xử lý tin nhắn của chính mình như prompt
- **Fixed trong PR #6414** - Drop `is_from_me == true` events trong non-self chats
- Đã merge và close issue

#### Bug #6368 - Agent tools button hover behavior (CLOSED)
- **S3 severity** - UI minor issue
- **Fixed trong PR #6369** - CSS height fix
- Đã merge

---

## 💡 Yêu cầu tính năng

### 🏗️ **Kiến trúc dài hạn**

#### Issue #6489 - "Everything is a plugin"
- Đề xuất collapse "Integrations" và "Plugins" thành unified plugin catalog
- Phased approach: Integrations → unified plugin system
- Cho phép channels, providers, tools đều là plugins
- **Chưa có implementation**, đang ở giai đoạn discussion

#### Issue #6273 - Typed-family split for providers
- Đã có PR #6403 implementing
- Restructure model và TTS provider configs
- Kill aliases/synonyms trong registry
- Target v0.8.0

---

### 🎯 **Dashboard & UX**

#### Issue #6365 - Dashboard "Update ZeroClaw" button
- **PR #6370 đang open** - Cho phép update qua web UI thay vì CLI
- Extract 6-phase update pipeline thành `zeroclaw-update` crate
- Gateway expose `/api/update` endpoint với SSE progress

#### Issue #6346 - Node CLI + dashboard health & management
- Follow-up từ #2991 (đã close without merge)
- Quản lý fleet của nhiều ZeroClaw instances
- **PR #6392 đang open** - Nodes dashboard với device identification

#### Issue #6488 - Human-readable integration category labels
- **PR #6490 đang open** - Fix dead category headings trong Integrations page
- Hiện tại render raw enum names (`PRODUCTIVITY`, `SMARTHOME`)
- Cần surface `category_label` field

---

### 🔧 **Technical Features**

#### Issue #6439 - Add Morph (Fast Apply) provider
- **PR #6440 đang open**
- 10,500+ tok/s cho apply-edits
- Hữu ích cho coding-agent flows

#### Issue #6230 - Allow WhatsApp as cron delivery channel
- **PR #6230 đang open** - Cho phép cron jobs deliver output qua WhatsApp
- Trước đây chỉ support Telegram, Discord, Slack

---

## 👥 Phản hồi người dùng

### 🔍 **Pain Points được phản ánh**

1. **Multi-instance deployment** (#6487): Người dùng gặp vấn đề khi scale horizontally với nhiều agents
2. **Postgres memory backend** (#6472): Enterprise users cần Postgres nhưng gặp runtime panic
3. **CLI-first onboarding**: Nhiều effort đang đổ vào dashboard để giảm dependency vào CLI (#6365, #6392)

### 📚 **Documentation & Onboarding**

**PR #6486** - Fix docs build
- Generate lang switcher trước khi mdbook sync
- Cho thấy dự án quan tâm đến i18n documentation

**PR #6473** - Clarify review and PR workflow
- Aligned PR template với contributing guide
- AI-assisted collaboration welcome, nhưng không attribution footers trong PR

---

## 🗺️ Backlog & Roadmap

### **v0.7.5 (Imminent)**
- ✅ Version bump done (#6492)
- 🔄 Release automation tracking (#5878)
- 🎯 Theme: Retire manual release workflows

### **v0.8.0 (In Progress)**
- 🏗️ Typed-family provider split (#6403) - đang ở branch `integration/v0.8.0`
- 🔄 Llama.cpp dedicated provider (#6417)
- 📋 Sẽ squash merge toàn bộ batch vào master khi release

### **Future (Proposed)**
- 🔌 "Everything is a plugin" architecture (#6489)
- 🌐 Node management & fleet orchestration (#6346)
- 🎨 Brand refresh với logo mới (#4710)

---

## 📊 Thống kê hoạt động

- **Issues mở:** 24 (trong đó 3 closed trong 24h qua)
- **PRs mở:** 50+ (30 PRs được highlight)
- **Contributors active:** @theonlyhennygod (dominant contributor với 15+ PRs), @singlerider, @tidux, @Audacity88, @ilteoood, và nhiều người khác
- **Velocity:** Rất cao - average 1-2 PRs/hour trong 24h qua
- **Focus areas:** 
  - 🥇 Provider integration (35%)
  - 🥈 Channel expansion (30%)
  - 🥉 Dashboard/UX (20%)
  - 🔧 Bug fixes (15%)

---

## 🎬 Kết luận

Zeroclaw đang trong giai đoạn **mở rộng nhanh** với chiến lược "embrace diversity" - tích hợp nhiều providers và channels để phục vụ đa dạng use cases. Dự án thể hiện sự trưởng thành qua việc tự động hóa release pipeline (v0.7.5) và chuẩn bị refactor kiến trúc lớn (v0.8.0). 

**Điểm mạnh:** Velocity cao, responsive với community feedback, focus vào self-hosted/open-source ecosystem.

**Thách thức:** Critical bug #6487 cần được ưu tiên fix trước khi v0.7.5 release, Postgres memory backend cần stability work.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích PicoClaw - Ngày 2026-05-07

## 🎯 Tóm tắt hôm nay

Hôm nay PicoClaw phát hành **nightly build v0.2.8** với nhiều cải tiến về trải nghiệm người dùng và sửa lỗi. Hoạt động chính tập trung vào việc cải thiện quản lý session với timestamps cho từng message (#2788), tăng cường UI cho cấu hình MCP (#2770), và xử lý các vấn đề về authentication với nhiều provider (#2769). Cộng đồng đang tích cực đóng góp với 7 issues mới và nhiều PR đang được review.

---

## 🚀 Releases

### **v0.2.8-nightly.20260507** (Nightly Build)
- ⚠️ **Cảnh báo**: Đây là bản build tự động, có thể không ổn định
- 🔗 **Changelog**: So sánh với v0.2.8 stable
- 📦 **Mục đích**: Kiểm thử các tính năng mới trước khi merge vào stable

---

## 📈 Tiến độ dự án

### **Pull Requests Quan trọng**

#### 🔥 **Đang Active (Cần chú ý)**

**#2788 - Timestamps cho từng message** ⭐
- **Vấn đề**: Hiện tại tất cả messages trong session đều dùng chung timestamp `session.updated`, gây hiển thị sai thời gian
- **Giải pháp**: Thêm field `created_at` cho mỗi message riêng biệt
- **Impact**: Cải thiện đáng kể UX, giúp người dùng theo dõi timeline chính xác
- **Trạng thái**: Mới mở hôm nay, cần review

**#2770 - MCP Configuration UI** 🎨
- **Tính năng**: Thêm giao diện quản lý MCP servers trực tiếp trên Web UI
- **Lợi ích**: Không cần edit config.json thủ công nữa
- **Chi tiết**: Hỗ trợ enable/disable discovery, quản lý servers, fix lỗi persistence khi xóa server
- **Trạng thái**: Đang review

**#2778 - Working Summary Tool Feedback** 💬
- **Tính năng**: Hiển thị progress message ngắn gọn khi agent đang làm việc
- **Format**: `Working... • tool: mcp_media_download_async`
- **UX**: Message tự động cập nhật và xóa khi hoàn thành
- **Trạng thái**: Mới mở, cần feedback

#### 🔧 **Đang được xử lý**

**#2715 - Multi-user Group Chat Attribution** 👥
- **Vấn đề**: Trong group chat (Discord, Telegram), không phân biệt được message của từng user
- **Giải pháp**: Thêm sender attribution cho history messages
- **Scope**: 9 commits tách biệt để dễ review
- **Impact**: Quan trọng cho use case group chat

**#2679 - ChatGPT OAuth Support** 🔐
- **Vấn đề**: ChatGPT Plus subscription không hoạt động với PicoClaw
- **Root cause**: Sai endpoint và streaming format
- **Fix**: Chuyển sang `chatgpt.com/backend-api/codex`, xử lý `delta` streaming
- **Trạng thái**: Đang test

**#2629 - Web Search Provider Fallback** 🔍
- **Cải tiến**: Tập trung hóa logic chọn search provider
- **Tính năng**: Hỗ trợ `prefer_native` để dùng built-in search của model
- **Trạng thái**: Đã đóng (merged)

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác**

**#293 - Autonomous Browser Operations** (8 👍)
- **Yêu cầu**: Thêm khả năng tự động hóa browser (navigate, extract data, interact)
- **Đề xuất**: Xem xét Playwright hoặc Puppeteer
- **Ý nghĩa**: Mở rộng khả năng của PicoClaw ra web automation
- **Trạng thái**: Priority HIGH, đang trong roadmap

**#2706 - DeepSeek v4 Thinking Model** (1 👍)
- **Vấn đề**: DeepSeek v4 thinking mode trả về `reasoning_content` nhưng PicoClaw không lưu và gửi lại
- **Hậu quả**: Gây lỗi 400 trong các request tiếp theo
- **Workaround hiện tại**: Dùng `extra_body` để disable thinking (mất chất lượng)
- **Cần**: Hỗ trợ lưu và forward `reasoning_content`

**#1042 - Exec Tool Guard Command Issue** (1 👍)
- **Vấn đề**: `guardCommand` quá strict, block cả commands không liên quan đến path
- **Ví dụ**: `curl -s "wttr.in/Beijing?T"` bị block vì regex nhầm `?T` thành relative path
- **Impact**: Weather skill và các API calls bị ảnh hưởng

---

## 🐛 Ổn định & Bugs

### **Critical Issues**

**#2769 - Authentication Fails Across Providers** 🚨
- **Mô tả**: Valid API keys bị reject với 401 error (Groq, OpenRouter, Nvidia)
- **Scope**: Cả stable và nightly builds
- **Root cause**: Có thể do cách PicoClaw xử lý authentication headers
- **Trạng thái**: Mới báo cáo, cần điều tra gấp

**#2704 - DingTalk SDK Panic** 💥
- **Vấn đề**: Gateway crash do `dingtalk-stream-sdk-go` gửi data vào closed channel
- **Trigger**: Ping timeout trong connection
- **Impact**: Gateway dừng hoàn toàn
- **Root cause**: Race condition trong SDK, không phải lỗi PicoClaw
- **Cần**: Upgrade SDK hoặc wrap với recovery

**#2780 - Reload Config Breaks Voice Recognition** 🎤
- **Vấn đề**: Sau khi reload config, voice recognition (groq-asr) ngừng hoạt động
- **Channel**: Telegram
- **Trạng thái**: Mới báo cáo, chưa có fix

### **Medium Priority**

**#2785 - Feishu Notification Issue**
- **Vấn đề**: Khi bật `separate_messages`, Feishu chỉ hiển thị tool call đầu tiên trong notification center
- **Impact**: UX không tốt cho Feishu users

**#2775 - Sub-Agent Identity Confusion** 🤖
- **Vấn đề**: Sub-agents (Planner, Builder, etc.) kế thừa `AGENT.md` của root agent
- **Hậu quả**: Tất cả sub-agents nghĩ mình là root agent
- **Cần**: Mỗi sub-agent load system prompt riêng theo role

---

## ✨ Yêu cầu tính năng

### **Đang được đề xuất**

**#2782 - MCP Streamable HTTP Transport** 🌐
- **Yêu cầu**: Hỗ trợ Streamable HTTP (giao thức mới của MCP)
- **Lý do**: Nhiều MCP servers đã chuyển sang protocol này (như mcp-go SDK)
- **Hiện tại**: PicoClaw chỉ hỗ trợ SSE transport cũ
- **Impact**: Không kết nối được với MCP servers mới

**#2691 - Get Current Time Tool** ⏰
- **Tính năng**: Tool mới để agent lấy thời gian hiện tại
- **Hỗ trợ**: Nhiều formats và timezones
- **Trạng thái**: PR đã submit, đang review

**#2671 - OpenCode Provider Support** 
- **Yêu cầu**: Thêm hỗ trợ cho OpenCode (zen và go subscriptions)
- **Trạng thái**: Feature request mới

**#2217 - Token Consumption Dashboard** 📊
- **Yêu cầu**: Dashboard hiển thị thống kê token usage
- **Mục đích**: Giúp users theo dõi chi phí
- **Trạng thái**: Đã đóng (có thể đã implement hoặc reject)

---

## 💬 Phản hồi người dùng

### **Trải nghiệm tích cực**

- **Multi-channel support**: Users đánh giá cao việc PicoClaw hỗ trợ nhiều channels (Telegram, Discord, Feishu, DingTalk, LINE, QQ, Weixin)
- **MCP integration**: Cộng đồng quan tâm đến khả năng tích hợp MCP servers (#2345 - Engram memory server)

### **Pain points**

**Session Management** 📝
- #2310, #2787: Lịch sử chat không đầy đủ, chỉ hiển thị 1-2 messages gần nhất
- #2621: Session context bị mất sau API timeout
- **Impact**: Ảnh hưởng nghiêm trọng đến UX, users không thể review lại conversations

**Configuration Complexity** ⚙️
- #2368: Android app - model configuration confusing ("not configured" message)
- #2367: UI translation issues (Chinese text in English mode)
- **Feedback**: Cần cải thiện config UX, đặc biệt cho mobile

**Provider Compatibility** 🔌
- #629: Không retry khi LLM call failed
- #2548: Multiple authentication credentials error với Gemini
- **Pattern**: Nhiều issues liên quan đến provider integration

### **Documentation requests**

- #2784: README cần update về Baidu Search free tier (50/day chứ không phải 1000/day)
- Cần thêm guides cho các use cases phức tạp (multi-agent, group chat)

---

## 📋 Backlog & Roadmap

### **High Priority (từ labels)**

1. **Browser Automation** (#293) - Priority HIGH
   - Đang xem xét Playwright/Puppeteer
   - Sẽ mở rộng đáng kể capabilities của PicoClaw

2. **Authentication & Provider Stability**
   - Fix #2769 (401 errors across providers)
   - Improve retry logic (#629)
   - Better error handling

3. **Session Management Overhaul**
   - Per-message timestamps (#2788)
   - Full history preservation (#2310, #2311)
   - Better context management (#2621)

### **Medium Priority**

4. **MCP Enhancements**
   - Streamable HTTP support (#2782)
   - Better UI for MCP config (#2770)
   - More MCP server examples

5. **Multi-user Support**
   - Group chat attribution (#2715)
   - Better user context in multi-agent scenarios

6. **Tool Improvements**
   - Current time tool (#2691)
   - Fix exec tool guard (#1042)
   - Web search fallback (#2629 - done)

### **Nice-to-have**

7. **UI/UX Polish**
   - Streaming responses in web chat (#2057)
   - Token usage dashboard (#2217)
   - Better mobile experience (#2367, #2368)

8. **Provider Expansion**
   - OpenCode support (#2671)
   - Better ChatGPT OAuth (#2679)
   - DeepSeek v4 thinking mode (#2706)

---

## 🎯 Kết luận

**Xu hướng phát triển**: PicoClaw đang tập trung vào **stability** và **user experience** hơn là thêm features mới. Nhiều PRs liên quan đến bug fixes và improvements cho existing features.

**Điểm mạnh**: 
- Cộng đồng active, nhiều contributions
- Hỗ trợ đa dạng channels và providers
- Roadmap rõ ràng với browser automation

**Cần cải thiện**:
- Session management stability
- Provider authentication reliability  
- Configuration UX (đặc biệt mobile)
- Documentation completeness

**Khuyến nghị**: Users nên đợi các critical bugs (#2769, #2704, #2780) được fix trước khi upgrade lên nightly builds.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - Ngày 07/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 07/05 đánh dấu một đợt hoạt động cực kỳ sôi nổi với **25 PRs** được tạo/cập nhật, tập trung mạnh vào **cải thiện trải nghiệm setup** (đặc biệt là Slack) và **bảo mật hệ thống**. Không có release mới nhưng dự án đang trong giai đoạn consolidation mạnh mẽ sau migration v2, với nhiều fix quan trọng cho container runtime, webhook security và developer experience.

---

## 🚀 Releases

**Không có release mới trong 24h qua.**

---

## 📈 Tiến độ dự án

### 🔥 Xu hướng chính: Setup UX Overhaul

Một loạt 7 PRs liên tiếp từ @alipgoldberg tập trung vào việc **làm mịn trải nghiệm setup Slack**:

- **#2305**: Thêm confirmation gate trước khi vào phần setup phức tạp (public URL, webhooks)
- **#2304**: Viết lại hướng dẫn bước 1 bằng ngôn ngữ dễ hiểu hơn cho non-technical users
- **#2303**: Fallback thông minh khi lookup Slack member ID thất bại
- **#2300**: Sửa hướng dẫn sai về vị trí "Copy member ID" button
- **#2299**: Chuẩn bị user cho việc paste token theo đúng thứ tự
- **#2297**: Tái cấu trúc card tạo Slack app, làm nổi bật link "Get started"
- **#2296**: Đánh số rõ ràng "Part 1" và "Part 2" cho 2-stage setup
- **#2295**: Làm rõ warning "needs public URL" ngay từ channel picker

**Insight**: Đây là dấu hiệu rõ ràng của việc **onboarding real users** - những vấn đề này chỉ xuất hiện khi có người thực sự dùng sản phẩm và gặp khó khăn. Team đang ưu tiên accessibility cho non-technical users.

### 🔒 Security Hardening (3 PRs từ @Hinotoi-agent)

- **#2004**: Chỉ tin tưởng canonical channels remote khi install
- **#2000**: Cap request body size trước khi dispatch đến webhook adapters
- **#1999**: Reject symlinked directories trong container filesystem boundary

**Đánh giá**: Đây là những security fixes **fundamental** - không phải hotfix mà là architectural hardening. Cho thấy dự án đang mature và chuẩn bị cho production usage.

### 🐳 Container Runtime Improvements

- **#2307** (@romanbsd): Upgrade lên Debian Trixie, giảm image size
- **#2291** (@meeech): Trust OneCLI gateway CA trong agent container (fix TLS MITM issues)
- **#2292** (@meeech): Skill mới `/convert-to-podman` cho macOS
- **#2293** (@meeech): Fix PATH issue với Homebrew docker trên Apple Silicon

**Insight**: Đang mở rộng support cho **Podman** như alternative cho Docker Desktop - quan trọng cho enterprise users và macOS developers.

### 🛠️ Developer Experience

- **#2309** (CLOSED): Thay thế sqlite3 CLI bằng better-sqlite3 wrapper in-tree
- **#2187**: Fix CLI platform ID namespacing
- **#2310**: Fallback sang raw text khi Slack blocks invalid

### 🎨 Feature Additions

- **#2306**: In-tree MCP server cho yt-dlp + installer skill
- **#2211**: Tool-visibility skill cho live tool-call previews
- **#2301**: GitHub polling mode (không cần expose port) + git access question
- **#2298**: 6 MCP tools mới cho Baget.ai integration (Tier 1)
- **#2009**: Local Whisper transcription skill (free alternative)

---

## 💬 Điểm nổi bật cộng đồng

### 🔴 Issues được quan tâm:

**#2312** - `CLAUDE.md` bị xóa mỗi lần startup
- **Tác động**: Dirty working tree trên mọi instance pull từ repo
- **Root cause**: Migration logic xóa file nhưng file vẫn được commit
- **Trạng thái**: OPEN, chưa có PR fix

**#2311** - Deprecate `/claw` skill
- **Lý do**: Incompatible với v2 architecture (DB schema, transport, container model)
- **Khuyến nghị**: Xóa hoàn toàn thay vì patch
- **Insight**: Đây là technical debt từ v1 → v2 migration

**#2294** - migrate-v2.sh không surface renamed env keys
- **Channels bị ảnh hưởng**: Matrix, Discord
- **Symptom**: Channels fail silently sau migration
- **Priority**: Medium nhưng ảnh hưởng đến migration experience

---

## 🐛 Ổn định & Bugs

### ✅ Đã fix (PRs merged/closed):

- **#2302** (CLOSED): WhatsApp self-chat messages bị drop do fromMe filter quá aggressive
- **#2308** (CLOSED): Tighten approval-card flow + xóa ghost tool reference
- **#2309** (CLOSED): Thay sqlite3 CLI dependency

### 🔄 Đang xử lý:

- **#2191** (CLOSED): Misleading error khi sqlite3 CLI không được cài
- **#2310** (OPEN): Chat SDK bridge fallback cho invalid Slack blocks

### 📊 Phân tích:

- **Migration issues** vẫn là pain point chính (3/4 issues liên quan đến v1→v2)
- **Channel adapters** có nhiều edge cases (WhatsApp, Slack, Matrix, Discord)
- **Setup experience** đang được polish intensively

---

## 💡 Yêu cầu tính năng

### 🆕 Features mới được implement:

1. **GitHub polling mode** (#2301) - Giải quyết vấn đề NAT/firewall cho users không thể expose port
2. **Podman support** (#2292) - Alternative cho Docker Desktop trên macOS
3. **Local Whisper transcription** (#2009) - Free alternative cho voice messages
4. **yt-dlp MCP server** (#2306) - Video download/processing capabilities
5. **Tool visibility skill** (#2211) - Live preview của tool calls

### 🎯 Pattern nhận diện:

- Focus vào **self-hosted, privacy-first alternatives** (local Whisper, polling mode)
- **Developer flexibility** (Podman, multiple container runtimes)
- **Enterprise readiness** (security hardening, better error messages)

---

## 👥 Phản hồi người dùng

### 😊 Positive signals:

- **7 PRs liên tiếp** cải thiện Slack setup → có users thực sự đang onboard
- **Security PRs** từ @Hinotoi-agent → có security-conscious users/reviewers
- **Container runtime diversity** → users đang deploy trên nhiều môi trường khác nhau

### 😓 Pain points:

1. **Slack setup quá phức tạp** - cần 2 stages, public URL, nhiều bước manual
2. **Migration v1→v2 không smooth** - nhiều edge cases với env vars và DB
3. **Documentation gaps** - hướng dẫn không match với UI thực tế (vị trí buttons, thứ tự prompts)

### 🔍 User personas xuất hiện:

- **Non-technical users** - cần plain language, step-by-step guidance
- **Enterprise users** - quan tâm security, Podman, firewall-friendly options
- **Self-hosters** - muốn local alternatives (Whisper), không muốn expose ports

---

## 🗺️ Backlog & Roadmap

### 🚧 Technical debt cần xử lý:

1. **Deprecate `/claw` skill** (#2311) - v1 legacy code
2. **Fix `CLAUDE.md` deletion** (#2312) - migration cleanup
3. **Improve migrate-v2.sh** (#2294) - surface renamed env keys

### 🎯 Xu hướng phát triển:

1. **Setup experience** - đang được polish mạnh, có thể sắp có major release
2. **Security hardening** - 3 PRs security đang OPEN, có thể bundle thành security release
3. **Container flexibility** - Podman support, Apple Container, multiple runtimes
4. **MCP ecosystem** - Baget.ai integration, yt-dlp server, tool visibility

### 📅 Dự đoán:

- **Tuần tới**: Có thể có release tập trung vào setup UX + security fixes
- **Tháng tới**: Hoàn thiện v2 migration experience, deprecate v1 legacy code
- **Dài hạn**: Mở rộng MCP integrations, enterprise features (SSO, audit logs?)

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn **post-v2 consolidation** với focus mạnh vào:
- ✨ **Polish setup experience** cho mainstream adoption
- 🔒 **Security hardening** cho production readiness  
- 🐳 **Container flexibility** cho diverse deployment scenarios
- 🔌 **MCP ecosystem expansion** cho richer integrations

Dự án đang chuyển từ "make it work" sang "make it production-ready" - một dấu hiệu tốt của maturity.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*