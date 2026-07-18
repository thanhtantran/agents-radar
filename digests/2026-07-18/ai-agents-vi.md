# Bản tin Hệ sinh thái OpenClaw 2026-07-18

> Issues: 166 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-07-18 02:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/nanocoai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [Hermes-Agent](https://github.com/nousresearch/hermes-agent)

---

## Phân tích sâu OpenClaw

# Báo cáo Phân tích Hệ sinh thái OpenClaw - Ngày 2026-07-18

## 📊 Tóm tắt hôm nay

OpenClaw đang trong giai đoạn phát triển beta năng động với 30 PR mới được mở trong 24h qua và 1 release beta (v2026.7.2-beta.2) vừa phát hành. Dự án tập trung mạnh vào cải thiện trải nghiệm UI/UX (sidebar redesign, Linux Quick Chat), sửa lỗi stability quan trọng (session lifecycle, memory management), và hoàn thiện hệ thống plugins/memory. Cộng đồng phản ánh nhu cầu cao về bảo mật (masked secrets, memory trust tagging) và khả năng mở rộng (multi-agent workflows, dynamic model discovery).

---

## 🚀 Releases

### v2026.7.2-beta.2 (2026-07-17)

**Các tính năng chính:**

- **Remote coding sessions** - chạy Control UI sessions trên cloud workers, mở Codex/Claude catalog sessions trong terminal trên host, resume OpenCode/Pi sessions trực tiếp trong terminal
- **Native automation & nodes** - đưa Automations lên mobile với parity đầy đủ, thêm Voice Wake foreground trên Android, expose camera/location/notification từ headless Linux nodes
- **Safer cha...** (thông tin bị cắt cụt)

**Ý nghĩa:** Release này đánh dấu bước tiến quan trọng trong việc mở rộng OpenClaw từ desktop sang mobile và cloud, đồng thời tăng cường khả năng automation. Đây là nền tảng cho hệ sinh thái agent đa nền tảng.

---

## 📈 Tiến độ dự án

### **Xu hướng phát triển chính:**

#### 🎨 **UI/UX Modernization (Priority cao)**
- **#110269** - Permanent OpenClaw sidebar entry và Settings dock (Phase 6 của custodian onboarding redesign)
- **#110295** - Home page và identity-row IA cho five-zone sidebar
- **#110285** - Linux Quick Chat với agent switcher, avatars, per-agent routing
- **#109063**, **#105491** - Sửa lỗi i18n cho các ngôn ngữ như tiếng Trung

**Insight:** Đội ngũ đang có kế hoạch rõ ràng để redesign toàn diện UI, với focus vào việc làm OpenClaw "visible and reachable forever" thay vì disappear sau onboarding.

#### 🔧 **Stability & Performance Fixes**
- **#110297** - Fix synthetic context overflow trong tool-heavy sessions (vấn đề nghiêm trọng với conservative character estimates)
- **#108846** - Kill zombie child processes trong deleteSession (memory leak)
- **#110167** - Refactor memory-wiki compiled cache sang plugin state (giảm filesystem dependencies)
- **#109792** - Surface secret degradation trong logs và doctor command

**Insight:** Nhiều fix liên quan đến resource management và session lifecycle - dấu hiệu của sản phẩm đang scale và gặp các vấn đề real-world.

#### 🔌 **Plugin & Extension Ecosystem**
- **#109978**, **#109980** - Cancel unread response bodies để tránh connection leaks (Vault, Google Video extensions)
- **#106888** - Thêm hỗ trợ CLAW.md manifest (human-readable alternative cho JSON)
- **#93975** - Detect orphan plugin diagnostics

---

## 🔥 Điểm nổi bật cộng đồng

### **Issues có tương tác cao:**

1. **#75** (114 comments, 81 👍) - **Linux/Windows Clawdbot Apps**
   - Cộng đồng đang chờ đợi native apps cho Linux/Windows với tính năng tương đương macOS
   - Đây là feature request top 1 về user demand

2. **#88312** (21 comments, 5 👍) - **[Regression] Codex app-server turn-completion stall**
   - Vấn đề nghiêm trọng với Codex ChatGPT Plus: multi-tool agent turns fail với "Codex stopped before confirming turn complete"
   - Đã được đóng, nhưng có 21 comments cho thấy impact lớn

3. **#7707** (18 comments) - **Memory Trust Tagging by Source**
   - Feature request về bảo mật: tag memory entries theo trust level để prevent memory poisoning attacks
   - Phản ánh mối quan tâm về security trong multi-source agent environments

4. **#10659** (14 comments, 4 👍) - **Masked Secrets**
   - Cộng đồng muốn agents có thể "use" API keys mà không "see" chúng
   - Prevents prompt injection attacks và accidental leaks

### **Pull Requests đáng chú ý:**

- **#110223** - Exact web_fetch output contract với cleaned result shape (maintainer-led refactor)
- **#110308** - Normalized web_search output contract - chuẩn hóa 17 providers khác nhau
- **#104111** - Fix empty Telegram sends cho cron summaries (Pablo Daily Task Summary use case)

---

## 🐛 Ổn định & Bugs

### **Critical Issues đang được xử lý:**

1. **Session Lifecycle & State Management:**
   - **#108344** (CLOSED) - Session-store maintenance evicts in-flight cron sessions → mọi cron run fails với `CronSessionLifecycleClaimError`
   - **#107655** (liên quan #110297) - Synthetic context overflow trong tool-heavy sessions
   - **#98435** - MCP loopback transport không auto-reconnect sau gateway restart

2. **Performance & Resource Leaks:**
   - **#99071** - Repeated Codex Apps plugin discovery causing excessive disk I/O
   - **#108846** - Zombie bash processes không được cleanup
   - **#109978**, **#109980** - Unread HTTP response bodies gây connection stalls

3. **OAuth & Authentication:**
   - **#91352** (CLOSED) - OpenAI Codex OAuth migration leaves stale profiles
   - **#99449** (CLOSED) - Enabling Codex plugin switches runtime và breaks TPM limits
   - **#95121** (CLOSED) - Codex OAuth turns spend ~28s for tiny replies (regression)

### **String Handling & Encoding:**
- **#109974**, **#109993**, **#104851** - UTF-16 safety fixes (emoji/surrogate pairs breaking truncation)
- Pattern rõ ràng: team đang systematically fix các edge cases với Unicode

---

## 💡 Yêu cầu tính năng

### **Top Feature Requests (theo comments/votes):**

#### **Bảo mật & Privacy:**
1. **#7707** - Memory Trust Tagging (prevent memory poisoning)
2. **#10659** - Masked Secrets (agent không thấy raw API keys)
3. **#7722** - Filesystem Sandboxing Config
4. **#7403** - Private Mode cho demos/content creation

#### **Multi-Agent & Orchestration:**
1. **#11665** - Webhook multi-turn support (reuse session với consistent sessionKey)
2. **#10467** - Multi-lane concurrency cho sub-agents
3. **#10142** - `session:end` internal hook event (Temporal integration)
4. **#9797** - `queue_status` tool cho intelligent task dispatch
5. **#11040** - First-class session/task chain tracking (parent/root/trace DAG)

#### **Developer Experience:**
1. **#10687** - Fully dynamic model discovery (OpenRouter + beyond)
2. **#6792** - `configPatch` trong plugin manifest (auto-config on install)
3. **#10480** - Workers AI model selection during onboard
4. **#9986** - Trigger model fallback on context length exceeded

#### **UX Improvements:**
1. **#10118** - TUI: Support Shift+Enter for newline
2. **#9637** - Accessibility: disable emojis/unicode trong TUI
3. **#7476** - WhatsApp sticker send support
4. **#7909** - Plain text copy option (bên cạnh Markdown)
5. **#10944** - Telegram parseMode config

#### **Voice & Real-time:**
1. **#8355** - Streaming TTS pipeline cho voice calls (sentence-level LLM→TTS→audio)

---

## 💬 Phản hồi người dùng

### **Pain Points chính:**

1. **Context Management Confusion:**
   - Users muốn error messages cụ thể hơn khi context overflow (#9409)
   - Synthetic overflow trong tool-heavy sessions gây frustration (#107655)

2. **Multi-Agent Complexity:**
   - Sub-agents mất tools do thiếu sender identity (#109055)
   - Không có visibility vào queue status → blind task dispatch (#9797)
   - SessionKey không hoạt động như documented cho multi-turn (#11665)

3. **Platform Gaps:**
   - Linux/Windows users cảm thấy "second-class" so với macOS (#75)
   - Google Chat, Telegram, LINE còn thiếu features so với channels khác

4. **Security Concerns:**
   - Worry về prompt injection và memory poisoning (#7707, #10659)
   - Filesystem access không được sandbox (#7722)

### **Positive Signals:**

- Cộng đồng đang actively contribute (nhiều first-time contributors trong PRs)
- Detailed bug reports với reproduction steps
- Users tự file feature requests sau khi research thoroughly (ví dụ #6757 - "I am Wyatt, an OpenClaw agent autonomously filing this...")

---

## 🗓️ Backlog & Roadmap

### **Đang trong pipeline:**

#### **Onboarding Redesign (Phase 6+):**
- ✅ Phase 6 PR1: Permanent sidebar (#110269)
- 🚧 Follow-up: Home page & identity-row IA (#110295)
- Mục tiêu: OpenClaw custodian "stays reachable forever" thay vì disappear

#### **Security Hardening:**
- 🚧 Secret degradation visibility (#109792)
- 📋 Masked secrets system (#10659)
- 📋 Memory trust tagging (#7707)
- 📋 Filesystem sandboxing (#7722)

#### **Platform Expansion:**
- ✅ Linux Quick Chat shipped (#109947)
- 🚧 Linux Quick Chat enhancements (#110285)
- 📋 Linux/Windows native apps (#75) - high demand, chưa có timeline

#### **Memory & Context:**
- 🚧 Memory-wiki refactor to plugin state (#110167)
- 📋 Agent-triggered compaction (#6757)
- 📋 JSONL support cho memory indexer (#9820)
- 📋 Cross-session semantic search (#11955)

#### **Web Tools Standardization:**
- 🚧 Normalized web_search output (#110308)
- 🚧 Exact web_fetch contract (#110223)
- Pattern: Đang cleanup 17+ providers thành unified interface

### **Concerns từ activity patterns:**

1. **Technical debt:** Nhiều "fix unicode truncation" PRs cho thấy cần systematic review của string handling
2. **OAuth stability:** Multiple closed issues về Codex OAuth cho thấy integration vẫn còn brittle
3. **Documentation gaps:** Users report behaviors not matching docs (#11665)

---

## 🎯 Đánh giá tổng quan

**Điểm mạnh:**
- ✅ Tốc độ phát triển cao (30 PRs trong 24h)
- ✅ Responsive với bug reports (nhiều issues được close nhanh)
- ✅ Clear architectural vision (plugin system, multi-agent workflows)
- ✅ Community engagement tốt (detailed feature requests, contributions)

**Điểm cần cải thiện:**
- ⚠️ Stability issues với session lifecycle và OAuth flows
- ⚠️ Platform parity gaps (Linux/Windows users chờ native apps)
- ⚠️ Security features vẫn là "requests" chứ chưa được implement
- ⚠️ Documentation không match với actual behavior ở một số areas

**Khuyến nghị chiến lược:**
1. Ưu tiên stability trước features mới (session lifecycle, memory management)
2. Accelerate security features (masked secrets, trust tagging) trước khi scale users
3. Document breaking changes và migration paths rõ ràng hơn (OAuth migrations gây nhiều issues)
4. Xem xét feature freeze ngắn để pay down technical debt (Unicode handling, error messages)

---

## So sánh hệ sinh thái chéo

# 🌐 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 18/07/2026

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trải qua giai đoạn **consolidation và maturation** với các tín hiệu rõ rệt:

- **7 dự án chính** đang cạnh tranh và bổ sung lẫn nhau
- Tổng cộng **197 PRs** và **61 issues** được xử lý trong 24h
- Chỉ **2/7 dự án** có release mới (OpenClaw, LobsterAI)
- Xu hướng chung: **stability > features** - các dự án lớn đang polish thay vì thêm tính năng mới

**Đặc điểm nổi bật:**
- 🔄 **Tái cấu trúc kiến trúc lớn** đang diễn ra đồng thời ở 3 dự án (OpenClaw, IronClaw, ZeroClaw)
- 🔐 **Bảo mật** trở thành ưu tiên cao sau các lỗ hổng được phát hiện
- 🌍 **Globalization** - mở rộng thị trường châu Á (Trung Quốc, Czech, Đài Loan)
- 🤖 **Multi-agent workflows** là trọng tâm phát triển chung

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Velocity | Mức độ tương tác | Độ trưởng thành |
|-------|--------|-----|----------|----------|------------------|-----------------|
| **OpenClaw** | 166 | 500 | 1 (beta) | 🔥 30 PR/24h | ⭐⭐⭐⭐⭐ (114 comments) | 🏗️ Beta active |
| **NanoBot** | 2 | 11 | 0 | 🌟 11 PR/24h | ⭐⭐⭐ (4 comments) | 🚀 Pre-release sprint |
| **ZeroClaw** | 21 | 50 | 0 | 🔄 7 merged/24h | ⭐⭐ (transition) | ⚙️ Transition phase |
| **PicoClaw** | 4 | 12 | 0 | ⚠️ Stale spike | ⭐ (mass stale) | 🧹 Maintenance mode |
| **NanoClaw** | 4 | 15 | 0 | 🐛 8 bugfix/24h | ⭐⭐ (stability focus) | 🔧 Hardening |
| **IronClaw** | 18 | 50 | 0 | 🏗️ 10+ merged | ⭐⭐⭐⭐ (refactor sprint) | 🎯 Pre-v1.0 |
| **LobsterAI** | 7 | 15 | 1 (2026.7.16) | 💎 15 merged | ⭐⭐⭐ (gamification) | ✨ Polish phase |
| **CoPaw** | 19 | 40 | 1 (v2.0.0.post3) | 🚀 40 PR/24h | ⭐⭐⭐⭐ (migration fixes) | 🛠️ Post-2.0 stabilize |
| **Hermes** | 6 | 50 | 0 | ⚡ 13 PR/24h | ⭐⭐ (config fixes) | 🔬 Continuous improve |

**Chú thích:**
- Velocity: Số lượng PR/merged trong 24h
- Tương tác: Dựa trên comments, reactions trên issues/PRs
- Độ trưởng thành: Phase hiện tại của lifecycle

---

## 3. 🎯 Vị thế của OpenClaw

### Vị trí trong hệ sinh thái

OpenClaw đang ở vị trí **market leader** với các chỉ số vượt trội:

**📊 Số liệu nổi bật:**
- **Lớn nhất**: 166 issues, 500 PRs (gấp 3-10 lần các đối thủ)
- **Hoạt động nhất**: 30 PRs trong 24h (cao nhất hệ sinh thái)
- **Tương tác cộng đồng tốt nhất**: Issue #75 có 114 comments, 81 👍
- **Release frequency**: Duy nhất có beta release trong ngày

### Điểm mạnh cạnh tranh

✅ **Vision rõ ràng**: 
- Multi-platform (desktop → mobile → cloud)
- Native apps roadmap cho Linux/Windows (#75 - top request)
- Remote coding sessions architecture (#v2026.7.2-beta.2)

✅ **Ecosystem depth**:
- Plugin system với CLAW.md manifest
- 17+ web providers được standardized
- MCP protocol integration roadmap

✅ **Developer experience**:
- Comprehensive documentation
- Active maintainer response
- Systematic refactoring (memory-wiki, web tools)

### Thách thức

⚠️ **Technical debt**:
- Session lifecycle bugs (#108344, #107655)
- OAuth stability issues (multiple closed issues)
- Unicode handling edge cases (systematic cleanup needed)

⚠️ **Platform parity gap**:
- Linux/Windows users "second-class" vs macOS
- Feature requests backlog lớn (security, multi-agent)

⚠️ **Scaling challenges**:
- Context overflow trong tool-heavy sessions
- Memory management ở uptime dài

### So sánh trực tiếp

| Khía cạnh | OpenClaw | CoPaw | IronClaw | NanoClaw |
|-----------|----------|-------|----------|----------|
| **Scope** | Universal agent platform | QwenPaw fork | NEAR ecosystem | Experimental |
| **Target** | Developers + End-users | Developers | Blockchain devs | Research |
| **Maturity** | Beta (v2026.7) | Stable (v2.0) | Pre-v1.0 | Alpha |
| **Community** | 🔥 Rất mạnh | 💪 Mạnh | 🌱 Đang build | 🔬 Niche |
| **Innovation** | Remote sessions, multi-platform | Performance (40 PR/day) | Architecture clean-up | MCP focus |

---

## 4. 🛠️ Hướng kỹ thuật chung

### Xu hướng được nhiều dự án áp dụng

#### 🔐 **Security Hardening** (5/9 dự án)
- **Masked secrets** (OpenClaw #10659, PicoClaw #3246)
- **Memory trust tagging** (OpenClaw #7707)
- **Webhook authentication** (NanoClaw #3065)
- **OAuth timeout protection** (PicoClaw #3246)
- **Filesystem sandboxing** (OpenClaw #7722)

**Insight**: Sau giai đoạn MVP, bảo mật trở thành ưu tiên hàng đầu khi tiến gần production.

#### ⚡ **Performance Optimization** (6/9 dự án)
- **Parallel initialization** (CoPaw #6193 - 8x faster, NanoBot #4963)
- **Memory management** (CoPaw #6206, OpenClaw #110167, NanoClaw #3075)
- **Context compaction** (OpenClaw #6757, CoPaw #6533)
- **Resource eviction** (CoPaw #6537 - 32K threshold)
- **Connection pooling** (NanoBot #4965, PicoClaw #3243)

**Pattern**: Chuyển từ "works on my machine" sang "scales in production".

#### 🏗️ **Architecture Simplification** (4/9 dự án)
- **IronClaw**: §4.3 store consolidation (8 PRs), §4.4 deployment-mode cleanup
- **ZeroClaw**: Channel refactor (#4908), context overflow handling
- **OpenClaw**: Memory-wiki plugin state, web tools standardization
- **CoPaw**: Bounded concurrency, graceful shutdown

**Rationale**: Giảm complexity trước v1.0 để dễ maintain và extend.

#### 🔌 **Plugin/Extension Ecosystem** (7/9 dự án)
- **OpenClaw**: CLAW.md manifest, plugin diagnostics
- **ZeroClaw**: Webhook ingress (#8862), skill catalog
- **IronClaw**: WASM capabilities, skill loading
- **NanoBot**: ModelScope provider, Kimi K3 integration
- **PicoClaw**: Simplex channel, WhatsApp enhancements
- **CoPaw**: MCP parallel startup, PawApp SDK
- **Hermes**: ToolSnap MCP catalog (#58511), email providers

**Vision**: Từ "monolithic agent" sang "agent platform với marketplace".

#### 🤖 **Multi-Agent Orchestration** (4/9 dự án)
- **OpenClaw**: Multi-lane concurrency (#10467), session chains (#11040)
- **ZeroClaw**: Multi-agent routing (#2767), A2A protocol (#3566)
- **NanoClaw**: Session routing (#3081), cross-channel coordination
- **Hermes**: Delegation cleanup (#65955), sub-agent tools

**Use cases**: Team collaboration, specialized agents, workflow automation.

#### 🌍 **Internationalization** (5/9 dự án)
- **NanoBot**: Czech localization (#4958)
- **LobsterAI**: Tiếng Trung Phồn thể (#8974)
- **OpenClaw**: i18n fixes (#109063, #105491)
- **CoPaw**: Multi-language support
- **Hermes**: Feishu integration (#9978)

**Markets**: Châu Á (Trung Quốc, Đài Loan, Czech) là trọng tâm mở rộng.

---

## 5. 🔍 Điểm khác biệt

### Chiến lược phát triển

| Dự án | Chiến lược | Ví dụ điển hình |
|-------|-----------|-----------------|
| **OpenClaw** | **Breadth-first**: Nhiều channels, multi-platform | Remote sessions, native apps roadmap |
| **CoPaw** | **Depth-first**: Polish core experience | 40 PR stability fixes, graceful shutdown |
| **IronClaw** | **Architecture-first**: Clean code before scale | Store consolidation, rename cleanup |
| **ZeroClaw** | **Community-driven**: Respond to feedback | Fast security fixes, resizable sidebar |
| **NanoBot** | **Provider diversity**: Support nhiều LLM | ModelScope, Kimi K3, Moonshot |
| **Hermes** | **Autonomy-focused**: Self-managing agents | Self-triggered compaction, tool eviction |

### Tính năng độc quyền

#### **OpenClaw**
- 🌐 **Remote coding sessions** trên cloud workers
- 📱 **Mobile parity** cho Automations
- 🔊 **Voice Wake** foreground trên Android

#### **CoPaw/QwenPaw**
- 🖥️ **Desktop app** với Tauri (graceful shutdown)
- 🧠 **Bounded multi-agent startup** (memory spike control)
- 📊 **Langfuse observability** integration

#### **IronClaw**
- 🔗 **NEAR wallet integration** (blockchain native)
- 📝 **WASM tool execution**
- 🎨 **WebUI v2** với live thinking surface

#### **ZeroClaw**
- 📧 **Inkbox channel** (email + SMS + voice + iMessage)
- 🔐 **OIDC authentication provider** (v0.9.0)
- 🛡️ **Per-sender RBAC** cho multi-tenant

#### **NanoBot**
- 🇨🇳 **ModelScope provider** (Qwen, DeepSeek, GLM, MiniMax)
- ☁️ **One-click Render deploy**
- 🎨 **Live thinking surface** thay vì typing dots

#### **LobsterAI**
- 🎨 **AI-generated skins** cho toàn bộ UI
- 🎁 **Campaign reward system** (gamification)
- 🖥️ **Windows caption buttons** custom styling

#### **Hermes**
- 📍 **Deep links** (`hermes://session/<id>`)
- 📱 **QR code dashboard** cho mobile connect
- 🔍 **Curator staleness surfacing**

### Community culture khác biệt

**OpenClaw**: 
- 🏆 **Feature-rich, fast-paced**
- 👥 **Large contributor base**
- 💬 **High engagement** (114 comments/issue)
- ⚠️ **Some technical debt** từ velocity cao

**CoPaw**:
- 🛠️ **Quality-focused, stability-first**
- 🧪 **Strong test culture** (7/11 PRs có tests)
- 🐛 **Systematic bug fixes** (40 PRs post-2.0)
- 📊 **Metrics-driven** (8x speedup documented)

**IronClaw**:
- 🏗️ **Architecture purists**
- 📐 **Comprehensive refactoring plans** (documented specs)
- 🔬 **Clean code emphasis** (store consolidation)
- ⏳ **Slower, more deliberate**

**ZeroClaw**:
- 👂 **Community-responsive**
- ⚡ **Fast security fixes** (<24h)
- 🔄 **Transition challenges** (leadership change)
- 🚧 **Coordination bottlenecks** (merge conflicts)

**NanoBot**:
- 🌏 **China-market focused**
- 🤝 **Provider partnerships** (ModelScope, Moonshot, Kimi)
- ⚡ **High velocity** (11 PR/24h)
- 🔥 **Reactive** (Moonshot API change → 3 PRs trong ngày)

---

## 6. 👥 Mức độ trưởng thành cộng đồng

### Tier 1: Cộng đồng trưởng thành 🌳

**OpenClaw** ⭐⭐⭐⭐⭐
- ✅ Detailed bug reports với reproduction steps
- ✅ Active feature discussions (114 comments)
- ✅ First-time contributors welcome
- ✅ Autonomous agents filing issues (#6757)
- ⚠️ Documentation gaps reported by users

**CoPaw** ⭐⭐⭐⭐
- ✅ Technical depth trong issues (OAuth flow analysis)
- ✅ Production users reporting uptime issues
- ✅ Quality PRs với test coverage
- ⚠️ Migration 1.x→2.0 pain points
- ⚠️ Configuration complexity feedback

**IronClaw** ⭐⭐⭐⭐
- ✅ Systematic architecture discussions
- ✅ Multiple active contributors
- ✅ Clear refactoring roadmap buy-in
- ⚠️ Smaller community size
- ⚠️ Niche focus (NEAR ecosystem)

### Tier 2: Cộng đồng đang phát triển 🌱

**ZeroClaw** ⭐⭐⭐
- ✅ Security-conscious users
- ✅ Good bug report quality
- ⚠️ Leadership transition risk
- ⚠️ Stale issue management concerns
- ⚠️ Community engagement tạm thời giảm

**NanoBot** ⭐⭐⭐
- ✅ Fast iteration cycle
- ✅ Provider integration contributions
- ⚠️ Language barrier (China-focused)
- ⚠️ Less international visibility
- ⚠️ Reactive vs proactive development

**LobsterAI** ⭐⭐⭐
- ✅ Feature request quality tốt
- ✅ Screenshots/logs detailed
- ⚠️ Smaller contributor pool
- ⚠️ Stale issues auto-closed (có thể ẩn bugs)
- ⚠️ Windows-specific pain points

### Tier 3: Cộng đồng sơ khai 🌾

**NanoClaw** ⭐⭐
- ⚠️ Low issue interaction (0-3 comments)
- ⚠️ Experimental status
- ⚠️ Niche use cases
- ✅ Core team responsive
- ✅ Systematic bug fixing

**PicoClaw** ⭐
- 🔴 Mass stale marking (4 issues, 9 PRs cùng ngày)
- 🔴 Potential maintainer bandwidth issue
- 🔴 15-month-old PR still open (#1951)
- ⚠️ Community frustration risk
- ✅ Quality PRs từ contributors

**Hermes** ⭐⭐
- ⚠️ Dominated by single contributor (@webtecnica - 13 PR)
- ⚠️ Low community interaction
- ⚠️ Config-heavy → high entry barrier
- ✅ Sophisticated user base
- ✅ Production usage signals

### Đặc điểm chung theo tier

**Tier 1** 🌳:
- Issue discussions dài (10+ comments)
- Contributors tự research trước khi file
- Documentation improvements từ community
- Production usage feedback

**Tier 2** 🌱:
- Bug reports quality tốt nhưng ít discussion
- PR contributions chủ yếu từ core team
- Feature requests rõ ràng nhưng thiếu prioritization
- Growing pains (migration issues, stale management)

**Tier 3** 🌾:
- Maintainer-driven development
- Minimal community interaction
- High contributor concentration
- Niche or experimental status

---

## 7. 🔮 Tín hiệu xu hướng

### Ngắn hạn (Q3 2026)

#### 🔐 **Security sẽ là battleground**
**Dự đoán**: 
- Masked secrets sẽ trở thành table stakes (OpenClaw, PicoClaw đang implement)
- Memory trust tagging sẽ lan rộng sau khi OpenClaw ship
- RBAC/multi-tenancy sẽ tách các dự án enterprise vs developer-focused

**Catalyst**: Lỗ hổng IronClaw #6170 và NanoClaw #3065 đã raise awareness.

#### 🤖 **Multi-agent là must-have**
**Evidence**:
- 4/9 dự án có multi-agent roadmap
- OpenClaw: session chains, multi-lane concurrency
- ZeroClaw: A2A protocol, agent routing
- NanoClaw: cross-channel coordination

**Prediction**: Dự án nào không có multi-agent story sẽ bị bỏ lại (PicoClaw at risk).

#### 🌍 **Globalization wave**
**Markets**:
- 🇨🇳 Trung Quốc: NanoBot (ModelScope), CoPaw (QQ, NetEase)
- 🇹🇼 Đài Loan: LobsterAI localization
- 🇨🇿 Czech: NanoBot i18n

**Implication**: Dự án chỉ tiếng Anh sẽ miss 60%+ thị trường châu Á.

### Trung hạn (Q4 2026 - Q1 2027)

#### 🏪 **Plugin marketplaces sẽ xuất hiện**
**Foundation đang được xây**:
- OpenClaw: CLAW.md manifest, plugin diagnostics
- CoPaw: PawApp SDK, MCP catalog
- ZeroClaw: Webhook ingress, skill catalog
- Hermes: ToolSnap MCP (#58511)

**Prediction**: 
- Q4: OpenClaw ship plugin marketplace beta
- Q1 2027: Revenue sharing models xuất hiện
- Winners: Dự án có developer-friendly SDK

#### 🔄 **Consolidation bắt đầu**
**Signals**:
- IronClaw đổi tên binary: `ironclaw-reborn` → `ironclaw` (legacy đang phát thải)
- PicoClaw: Maintenance mode signs (stale spike)
- ZeroClaw: Leadership transition challenges

**At risk**:
- PicoClaw: Nếu không recover khỏi stale crisis → archive candidate
- NanoClaw: Nếu không tìm được product-market fit → merge vào NanoBot?
- Hermes: Nếu @webtecnica burnout → stagnate risk

**Potential mergers**:
- NanoClaw + NanoBot (tech overlap lớn)
- Các "Claw" projects có thể consolidate brand

#### 💰 **Commercialization rõ rệt**
**Evidence**:
- LobsterAI: Campaign reward system (gamification)
- CoPaw: Desktop app polish (product-ready)
- IronClaw: NEAR wallet (blockchain monetization)

**Business models emerging**:
- 💎 Premium plugins/skills
- ☁️ Hosted/managed services (NanoBot Render deploy)
- 🎨 Customization-as-a-service (LobsterAI AI skins)
- 🔗 Blockchain integration (IronClaw NEAR)

### Dài hạn (2027+)

#### 🧠 **Specialized vs General agents**
**Fork in the road**:

**General-purpose platforms** (survive):
- OpenClaw: Multi-platform, multi-channel, extensible
- CoPaw: Desktop + web, reasoning depth control
- IronClaw: Clean architecture, WASM extensibility

**Niche-specialized** (thrive or die):
- ✅ IronClaw: NEAR ecosystem niche có thể protect
- ⚠️ PicoClaw: Chưa rõ specialization
- ⚠️ NanoClaw: "Experimental" không phải niche

#### 🔗 **Interoperability standards**
**Prediction**:
- A2A protocol (ZeroClaw #3566) sẽ được adopt rộng rãi
- MCP catalog sẽ trở thành de facto standard
- Cross-platform agent discovery (.well-known/agent-card.json)

**Winners**: Early adopters với open APIs (OpenClaw, ZeroClaw, CoPaw).

#### 🏢 **Enterprise vs Consumer split**
**Enterprise track** (RBAC, security, scale):
- ZeroClaw: OIDC, RBAC, air-gapped mode
- OpenClaw: Multi-tenant architecture
- CoPaw: Bounded concurrency, observability

**Consumer track** (UX, personalization, simplicity):
- LobsterAI: AI skins, gamification
- NanoBot: Provider diversity, one-click deploy
- Hermes: Self-managing, autonomous agents

**Divergence point**: Q4 2026, khi enterprise features conflict với consumer simplicity.

---

## 📌 Kết luận chiến lược

### 🥇 Top 3 Positioned for Success

**1️⃣ OpenClaw** 
- ✅ Market leader traction
- ✅ Ecosystem depth
- ✅ Clear roadmap (multi-platform)
- ⚠️ Must address technical debt fast

**2️⃣ CoPaw**
- ✅ Stability focus post-2.0
- ✅ Desktop app maturity
- ✅ Strong China market position
- ⚠️ Migration pain needs resolution

**3️⃣ IronClaw**
- ✅ Clean architecture foundation
- ✅ NEAR ecosystem moat
- ✅ Pre-v1.0 discipline
- ⚠️ Smaller community size

### ⚠️ At Critical Juncture

**ZeroClaw**: Leadership transition + technical debt → Next 30 days critical

**NanoBot**: Fast velocity nhưng reactive → Cần product differentiation

**LobsterAI**: Good UX polish nhưng stale management → Community confidence risk

### 🔴 High Risk

**PicoClaw**: Mass stale crisis + 15-month PR backlog → Viability concern

**NanoClaw**: Experimental status + low traction → Need pivot or merge

**Hermes**: Single-contributor dependency → Bus factor = 1

### 🎯 Khuyến nghị cho OpenClaw

**Ngắn hạn** (Tháng 8):
1. 🔥 **Priority 1**: Merge session lifecycle fixes (#108344, #107655, #109055)
2. 🛡️ **Priority 2**: Ship masked secrets (#10659) trước competitors
3. 📱 **Priority 3**: Linux/Windows app prototype để giữ momentum #75

**Trung hạn** (Q3-Q4):
1. 📦 **Plugin marketplace beta** - leverage CLAW.md foundation
2. 🤖 **Multi-agent workflows** - stay ahead của ZeroClaw A2A
3. 🌍 **Internationalization sprint** - đuổi kịp NanoBot ở châu Á

**Dài hạn** (2027):
1. 🏪 **Revenue model** cho plugin ecosystem
2. 🔗 **A2A protocol adoption** - interop với ZeroClaw/NanoClaw
3. 🏢 **Enterprise tier** - RBAC, multi-tenant, audit logs

---

**📊 Tổng kết**: Hệ sinh thái đang chuyển từ "race to features" sang "race to stability & scale". OpenClaw có lợi thế đầu về community và breadth, nhưng cần address technical debt để consolidate lead. Security, multi-agent, và plugin ecosystems sẽ là 3 trụ cột quyết định winners trong 6-12 tháng tới. 🚀

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích Dự án NanoBot - 18/07/2026

## 🎯 Tóm tắt hôm nay

Ngày 18/07/2026 chứng kiến hoạt động rất tích cực với **11 PRs** và **2 issues được đóng nhanh** trong vòng 24h. Trọng tâm là việc tích hợp **Kimi K3**, cải thiện trải nghiệm WebUI, và sửa lỗi provider quan trọng liên quan đến Moonshot. Dự án đang trong giai đoạn hoàn thiện hệ sinh thái với nhiều tích hợp provider mới (ModelScope) và cải tiến kiến trúc channel.

---

## 🚀 Tiến độ dự án

### ⭐ Tính năng chính đang phát triển

**1. Hỗ trợ Kimi K3 (#4966)** 🔥
- Tích hợp mô hình Kimi K3 mới nhất với reasoning effort "max"
- Chuẩn hóa legacy reasoning presets sang K3
- Sử dụng `max_completion_tokens` thay vì sampling parameters cố định
- **Ý nghĩa**: Nâng cấp quan trọng cho khả năng reasoning của agent

**2. Tích hợp ModelScope Provider (#4965)** 🆕
- Thêm ModelScope như built-in provider qua OpenAI-compatible API
- Hỗ trợ nhiều mô hình open-source: Qwen, DeepSeek, Kimi, GLM, MiniMax
- Hỗ trợ cả LLM chat và image generation
- **Ý nghĩa**: Mở rộng đáng kể số lượng mô hình có sẵn cho người dùng Trung Quốc

**3. Cải tiến WebUI lớn (#4963, #4964)**
- Polish agent output với live thinking surface thay vì typing dots
- Group các trace thành semantic actions với chi tiết có thể expand
- Hot-apply image generation settings không cần restart
- Cải thiện hiển thị Markdown, task lists, tables
- **Ý nghĩa**: UX mượt mà hơn, phản hồi real-time tốt hơn

**4. Refactor kiến trúc Channels (#4908)**
- Làm built-in channels self-contained
- Tách channel discovery, setup, runtime loading khỏi central coupling
- Built-in và external channels dùng chung registration mechanism
- **Ý nghĩa**: Kiến trúc sạch hơn, dễ mở rộng và bảo trì

### 🔧 Infrastructure & DevOps

**5. One-click Deploy to Render (#4937)**
- Thêm Render Blueprint cho deployment
- Gateway + WebUI trong single web service
- Session history và memory persist qua deploys
- **Ý nghĩa**: Giảm friction cho người dùng muốn tự host

---

## 🐛 Ổn định & Bugs

### ✅ Bugs đã được xử lý nhanh (trong 24h)

**1. Moonshot Kimi K2.6 Temperature Issue (#4961, #4962, #4967)** 🔴
- **Vấn đề**: Moonshot đổi requirement từ `temperature >= 1.0` sang `exactly 0.6`, nhưng registry vẫn hardcode 1.0
- **Tác động**: Mọi request đều fail
- **Giải pháp**: 
  - PR #4962: Đổi override thành 0.6
  - PR #4967: Omit temperature hoàn toàn, để Moonshot tự chọn (1.0 cho thinking mode, 0.6 cho non-thinking)
- **Insight**: Điển hình của API provider thay đổi contract bất ngờ, cần monitoring tốt hơn

**2. Context Overflow Handling (#4925)**
- Chuẩn hóa provider context overflow errors
- Dừng retry/fallback cho deterministic input-size failures
- Trả về clear response với `stop_reason="context_overflow"`
- **Ý nghĩa**: Error handling rõ ràng hơn, tránh infinite retry

---

## 💡 Yêu cầu tính năng

**1. Unbound Cron Jobs (#4968)** ⏰
- **Đề xuất**: Cho phép tạo cron jobs không bound với agent cụ thể
- **Hiện trạng**: System hiện tại forbid unbound cron jobs
- **Tương tác**: 4 comments, đang thảo luận use cases
- **Insight**: Có nhu cầu về scheduled tasks độc lập với agent context

**2. Native Folder Picker (#4953)**
- Hỗ trợ native folder picker bridges từ external host
- Authentication với tab-scoped random token
- Preserve backward compatibility
- **Ý nghĩa**: Cải thiện file system access cho desktop apps

**3. Live Image Generation Settings (#4964)**
- Apply provider/model/credentials changes không cần restart
- Hot-reload `generate_image` tool
- **Ý nghĩa**: Faster iteration cho image generation workflows

---

## 👥 Điểm nổi bật cộng đồng

### 🌟 Contributors hoạt động tích cực

- **@Re-bin**: Lead nhiều PRs WebUI polish (#4963, #4964, #4953)
- **@chengyongru**: Refactor channels và context handling (#4908, #4925)
- **@bingqilinweimaotai**: Kimi K3 integration và Moonshot fixes (#4966, #4967)
- **@yrk111222**: ModelScope provider integration (#4965)
- **@Ho1yShif**: Render deployment support (#4937)

### 📝 Chất lượng đóng góp

- **Documentation**: 3/11 PRs có label documentation
- **Tests**: 7/11 PRs có label test - tỷ lệ test coverage cao
- **Priority distribution**: 7 PRs priority:p1 (high), 3 PRs priority:p2 (medium)

---

## 🎨 Cải thiện UX/UI

**Localization Enhancement (#4958)**
- Cải thiện chất lượng bản dịch tiếng Trung Phồn thể (zh-TW)
- Contributor: @PeterDaveHello
- **Ý nghĩa**: Quan tâm đến internationalization, mở rộng user base châu Á

---

## 📊 Phân tích xu hướng

### 🔍 Technical Debt Paydown
- 2/11 PRs có label "refactor" (#4908, #4925)
- Focus vào clean architecture và error handling
- Tách biệt concerns (channels, context management)

### 🌐 Provider Ecosystem Growth
- 4/11 PRs liên quan provider integration/fixes
- Chiến lược: Hỗ trợ nhiều providers (Moonshot, ModelScope, Kimi K3)
- Xu hướng: OpenAI-compatible APIs làm standard

### 🎯 Priority Management
- 70% PRs có priority labels (7 p1, 3 p2)
- Fast response: 2 bugs được fix trong <24h
- Clear triage process

---

## ⚠️ Conflict & Blockers

**Merge Conflicts (3 PRs)**
- #4965 (ModelScope): conflict label
- #4908 (Channels refactor): conflict label  
- #4925 (Context overflow): Không có conflict label nhưng có thể ảnh hưởng

**Insight**: Nhiều PRs đang modify core systems song song → cần coordination tốt hơn

---

## 🗓️ Backlog & Roadmap (suy luận từ PRs)

### Short-term (đang implement)
1. ✅ Kimi K3 integration
2. 🔄 ModelScope provider  
3. 🔄 Channels refactor
4. ✅ WebUI polish

### Mid-term (có PRs open)
1. Native folder picker for desktop
2. Render one-click deploy
3. Context overflow improvements

### Long-term (từ discussions)
1. Unbound cron jobs system
2. Advanced scheduling capabilities

---

## 💭 Nhận xét tổng quan

**Điểm mạnh:**
- ✅ Response time rất nhanh (bugs được fix trong ngày)
- ✅ Test coverage cao (7/11 PRs có tests)
- ✅ Clear priority management
- ✅ Active core team với nhiều contributors

**Cần cải thiện:**
- ⚠️ Merge conflicts do parallel development
- ⚠️ Provider API changes handling (Moonshot case)
- ⚠️ Coordination giữa large refactors

**Dự đoán:**
- NanoBot đang trong sprint feature-rich trước major release
- Focus vào enterprise readiness (deployment, stability)
- Mở rộng mạnh vào thị trường Trung Quốc (ModelScope, Kimi, localization)

---

**📈 Chỉ số hoạt động hôm nay:**
- 📝 PRs: 11 (8 open, 3 merged)
- 🐛 Issues: 2 (đều đã đóng)
- 👥 Contributors: 7 active
- ⚡ Response time: <24h cho critical bugs

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo phân tích ZeroClaw - Ngày 18/07/2026

## 📊 Tóm tắt hôm nay

Dự án ZeroClaw đang trong giai đoạn tái cấu trúc quan trọng với việc thay đổi nhân sự chủ chốt: @singlerider (contributor chính) đã rời dự án vào 15/07, @JordanTheJet được chỉ định làm người kế nhiệm. Hoạt động phát triển vẫn duy trì với **2 PRs mới được mở** và **7 PRs được merge** trong 24h qua, tập trung vào cải thiện trải nghiệm nâng cấp in-app, tối ưu CI/CD và sửa các lỗi runtime quan trọng.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua. Tuy nhiên, cộng đồng đang tập trung vào PR #8173 về tính năng nâng cấp tự động từ dashboard - một bước tiến quan trọng về trải nghiệm người dùng.

---

## 🔧 Tiến độ dự án

### PRs đáng chú ý được merge/đóng (24h qua):

**✅ Cải tiến quan trọng:**

- **#8173** - Tính năng nâng cấp in-app từ web dashboard (MERGED)
  - Cho phép người dùng detect → xem release notes → apply → restart ngay từ trình duyệt
  - Giải quyết vấn đề người dùng phải rời dashboard để cập nhật thủ công
  - Đặc biệt hỗ trợ Windows với cơ chế swap binary an toàn

- **#8768** - Sửa lỗi ZeroCode ẩn settings channel (MERGED)
  - Expose các cấu hình root `[channels]` như `show_tool_calls` trong TUI
  - Cải thiện khả năng khám phá cấu hình từ giao diện người dùng

**🧪 Test & Documentation:**

- **#9045** - Tài liệu về vòng đời generated docs và localization (MERGED)
- **#8974** - Sửa link tài liệu phần cứng ESP32 (MERGED)
- **#8882** - Test coverage cho escaped schema refs (MERGED)

**⚙️ CI/CD:**

- **#9118** - Align Code Analysis với MSRV workspace (MỚI MỞ)
  - Nâng Rust toolchain từ 1.93.0 → 1.96.1
  - Giải quyết lỗi CodeQL build

### PRs đang active có impact cao:

**🔴 Critical fixes:**

- **#8845** - Sửa lỗi session không rebuild khi đổi model_provider (OPEN, risk:high)
  - Khi thay đổi `agents.<alias>.model_provider`, session đang chạy không được refresh
  - Có thể gây inconsistency giữa config và runtime state

- **#8913** - Annotate max-iteration stop reason (OPEN)
  - Agent dừng khi hết iteration quota nhưng không có thông báo rõ ràng cho user
  - Cải thiện trải nghiệm debugging

**🌟 Tính năng mới quan trọng:**

- **#8996** - Preserve running goals across daemon reload (OPEN, risk:high)
  - Cho phép config reload mà không mất goals đang chạy
  - Critical cho production stability

- **#8862** - Host webhook ingress → plugin inbound queue (OPEN, risk:high)
  - Thêm khả năng webhook cho channel plugins
  - Mở đường cho tích hợp nhiều platform hơn

---

## 💡 Điểm nổi bật cộng đồng

### Issues được quan tâm nhất:

**🔥 Top priority (P1):**

- **#7141** - RFC: OIDC authentication provider (7 comments, risk:high)
  - Tracking issue cho authentication pluggable architecture
  - Nền tảng cho multi-tenant và enterprise deployment

- **#5869** - Lỗ hổng bảo mật từ rustls-webpki qua rumqttc (3 comments, BLOCKED)
  - 4 RUSTSEC advisories từ dependency cũ
  - Đang chờ rumqttc upstream fix

**🆕 Issues mới (24h qua):**

- **#9117** - ZeroCode không start trên Windows (0 comments)
  - Yêu cầu set `ZEROCLAW_SOCKET` env var thủ công
  - Ảnh hưởng trải nghiệm Windows users

- **#9116** - ACP console breaks thinking stream (0 comments)
  - Thought stream bị ngắt thành từng 1-2 từ
  - UX degradation trên web dashboard

### Thay đổi nhân sự:

**#9107** - CODEOWNERS restructuring
- @singlerider rời dự án, loại bỏ 44 CODEOWNERS entries
- @JordanTheJet kế nhiệm toàn bộ scope
- @IftekharUddin join với focus vào web + PM/process

---

## 🐛 Ổn định & Bugs

### Bugs đang được xử lý:

**Severity S2 (degraded behavior):**

- **#5628** - Daemon auto-start conflict với manual runs
  - Service systemd tự động bind port 42617 khi boot
  - Chạy manual `zeroclaw daemon` gây conflict
  
- **#8757** - ZeroCode config ẩn root channel settings (ĐÃ FIX #8768)

**Severity S3 (minor):**

- **#9117** - Windows socket path issue
- **#9116** - ACP console UI glitch

### Security concerns:

- **#5869** - RUSTSEC cluster từ rumqttc dependency (P1, BLOCKED)
  - Đang chờ upstream update
  - Tạm thời không có workaround

- **#9101** - Consolidate release attestation mechanisms
  - 3 cơ chế provenance/signing song song (cosign, GitHub attestations, slsa-github-generator)
  - Gây redundancy, tốn CI time
  - Cần unify thành 1 signing story duy nhất

---

## 🎯 Yêu cầu tính năng

### RFCs đang được thảo luận:

**🏗️ Architecture (Priority P1-P2):**

- **#7141** - OIDC authentication provider (v0.9.0 target)
- **#7142** - Pluggable security enforcement interface (v0.9.0 target)
- **#6293** - Air-gapped execution mode với unix socket (BLOCKED)
  - Tách agent offline/online qua companion daemon
  - Hỗ trợ enclave environments

**🤖 Multi-agent capabilities:**

- **#2767** - Multi-Agent Routing (9👍, 6 comments)
  - Nhiều agents isolated + channel accounts trong 1 Gateway
  - Routing logic based on bindings
  
- **#3566** - A2A (Agent-to-Agent) Protocol Support (7👍, 8 comments)
  - Native support cho Linux Foundation's A2A protocol
  - Interop với NanoClaw, OpenClaw, external agents

- **#7218** - A2A agent discovery (.well-known/agent-card.json)
  - Groundwork cho multi-agent discovery

**🔐 Security & Multi-tenancy:**

- **#5982** - Per-sender RBAC for multi-tenant deployments
  - Isolated workspaces, tool sets, rate limits per user class
  - Critical cho SaaS/enterprise use cases

**🔌 Integrations:**

- **#8384** - Native Inkbox channel (email + SMS + voice + iMessage) (OPEN PR)
- **#6378** - Discord bot restrict to specific channels

---

## 💬 Phản hồi người dùng

### Pain points được report:

**📦 Installation & Setup:**

- **#5269** - Tài liệu cài đặt cần cải thiện
  - Thiếu hướng dẫn `cargo binstall`
  - Binary releases không rõ ràng

**🪟 Windows experience:**

- Lỗi socket path (#9117)
- In-place upgrade đã được cải thiện (#8173)

**📚 Documentation gaps:**

- **#8367** - RFC: Capability-aware documentation
  - Agents không biết features nào available based on config
  - Cần dynamic capability discovery

### Positive feedback signals:

- Tính năng in-app upgrade được merge (#8173) - cải thiện đáng kể UX
- Active testing coverage expansion (#9111, #8882, #8743)
- Documentation improvements đang được ưu tiên (#9045, #8974)

---

## 📋 Backlog & Roadmap

### v0.9.0 Target (từ RFCs):

**Confirmed scope:**

- ✅ OIDC authentication provider (#7141)
- ✅ Pluggable security enforcement interface (#7142)
- ✅ `forbid(unsafe_code)` workspace-wide (#7130)

### High-priority backlog:

**P1 items:**

- Security: RUSTSEC advisories fix (#5869) - BLOCKED on upstream
- Config: Extract auth to middleware layer (#6250)

**P2 items:**

- Multi-agent routing (#2767)
- A2A protocol support (#3566)
- Discord channel restrictions (#6378)
- Per-sender RBAC (#5982)

### Emerging themes:

**🔄 Stability focus:**

- Session lifecycle management (#8845, #8996)
- Daemon reload without service disruption
- MCP registry optimization (#8866)

**🔌 Extensibility:**

- Webhook ingress for plugins (#8862)
- Git-based skill catalog vs hardcoded ClawHub (#8638)
- LAN peer discovery (#8325)

**🛡️ Security hardening:**

- Sandbox policy configuration (#7821)
- Air-gapped execution mode (#6293)
- RBAC and multi-tenancy primitives

---

## 🎯 Kết luận

ZeroClaw đang trải qua **giai đoạn chuyển đổi nhân sự quan trọng** nhưng vẫn duy trì momentum phát triển tốt. Dự án đang cân bằng giữa:

- ✅ **Stability fixes** (session lifecycle, daemon reload)
- ✅ **UX improvements** (in-app upgrade, better docs)
- ✅ **Security hardening** (OIDC, RBAC, sandbox policies)
- ✅ **Ecosystem expansion** (A2A protocol, multi-agent routing)

**Rủi ro cần theo dõi:**

- Transition period sau khi @singlerider rời dự án
- RUSTSEC advisories blocked on upstream dependency
- Multiple high-risk PRs đang open đồng thời

**Tín hiệu tích cực:**

- CI/CD đang được tối ưu (#9101, #9118)
- Test coverage expansion liên tục
- Documentation debt đang được xử lý có hệ thống

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo phân tích PicoClaw - 18/07/2026

## 🎯 Tóm tắt hôm nay

Ngày 18/07 đánh dấu một đợt cập nhật quản lý kỹ thuật quan trọng khi hàng loạt issues và PRs được đánh dấu "stale" (không hoạt động). Dự án đang tập trung vào **hardening bảo mật và tối ưu hiệu năng** với 9 PRs mở liên quan đến security, performance và refactoring. Không có releases mới nhưng có động thái dọn dẹp backlog rõ rệt, cho thấy đội ngũ đang chuẩn bị cho một milestone tiếp theo.

---

## 📦 Releases

**Không có releases mới trong 24h qua.**

Phiên bản mới nhất được đề cập trong dữ liệu là **v0.2.9** và **v0.3.1** (từ PR #3247), cho thấy dự án đã có ít nhất 2 minor releases gần đây.

---

## 🚀 Tiến độ dự án

### 📈 Xu hướng chính: **Security & Performance Hardening**

Dự án đang trải qua một giai đoạn **củng cố nền tảng** với focus vào 3 trục chính:

#### 1️⃣ **Bảo mật (Security)**
- **PR #3246** (corporatepiyush): Sửa 3 lỗ hổng nghiêm trọng:
  - MQTT TLS certificate verification bị disable mặc định (`InsecureSkipVerify: true`) → **rủi ro MITM cao**
  - OAuth requests không có timeout → dễ bị DoS
  - Search queries không giới hạn kích thước → memory leak tiềm tàng
  
  ⚠️ **Impact**: Đây là các lỗi critical ảnh hưởng production security posture.

#### 2️⃣ **Tối ưu hiệu năng (Performance)**
Chuỗi 3 PRs từ @corporatepiyush tập trung vào **giảm memory allocations**:
- **PR #3243**: Refactor seahorse compaction từ O(n²) string concatenation sang `strings.Builder`
- **PR #3244**: Tối ưu XML assembly, giảm từ 5 passes xuống 1 pass với `strings.NewReplacer`
- **PR #3245**: Refactor skills loader, loại bỏ redundant `fmt.Sprintf`

💡 **Insight**: Các micro-optimizations này chỉ ra dự án đang xử lý **high-volume message processing** và cần optimize hot paths.

#### 3️⃣ **OAuth & Authentication**
- **PR #3241** (As-tsaqib): Sửa lỗi OAuth refresh không tương thích với các providers:
  - OpenAI yêu cầu JSON body, code đang dùng form-encoded cho tất cả
  - Race condition khi concurrent refresh
  
  🔗 **Related issue**: #3239 mô tả chi tiết vấn đề này.

### 🆕 Tính năng mới đang phát triển

| Tính năng | PR | Trạng thái | Tác động |
|-----------|-----|-----------|---------|
| **Simplex Channel** | #3193 | Open | Mở rộng hỗ trợ platform mới |
| **WhatsApp Typing Presence** | #3242 | Open | Cải thiện UX trên WhatsApp native |
| **Czech i18n** | #3247 | Open | Localization cho thị trường Czech |

---

## 💬 Điểm nổi bật cộng đồng

### 🔥 Issues được quan tâm:

1. **#3201 - QQ Channel Streaming Support** (3 comments)
   - **Vấn đề**: Hiện chỉ Telegram và WebSocket có streaming output, QQ channel thiếu tính năng này
   - **User pain point**: Người dùng phải chờ toàn bộ response thay vì xem real-time
   - **Mức độ ưu tiên**: Medium (đã stale sau 17 ngày)

2. **#3240 - WhatsApp Typing Indicator** (1 comment)
   - Có **PR tương ứng #3242** đang được xử lý
   - Cho thấy responsive với feedback từ cộng đồng

### 📊 Mức độ đóng góp:
- **10 contributors** hoạt động trong period này
- **Chất lượng PRs cao**: Các PRs đều có mô tả chi tiết, test coverage, và follow chuẩn contribution guidelines
- **Code review culture mạnh**: PRs hardening có nhiều technical details, cho thấy review process kỹ lưỡng

---

## 🐛 Ổn định & Bugs

### ✅ Đã fix (Closed):
1. **#3206 - Config migration false positive** (Closed)
   - Lỗi v2→v3 migration báo sai "unknown fields"
   - **Impact**: Blocking fresh installs của v0.2.9
   - Status: Đã có PR #3204 fix và close

2. **#3180 - CLI tool call với invalid JSON** (Closed)
   - LLM trả về malformed JSON tool arguments crash toàn bộ batch
   - **Fix**: Skip invalid calls, giữ lại valid calls
   - Có test coverage

### ⏳ Đang xử lý (Open):
1. **#3202 - Agent ID normalization bug**
   - `NormalizeAgentID` không strip underscores dù documented
   - **Edge case**: IDs dạng `_test_` vẫn pass qua validation
   
2. **Security issues trong PR #3246** (mentioned above)

### 🎯 Bug pattern:
- **Input validation**: Nhiều bugs liên quan đến edge cases (underscores, invalid JSON, malformed OAuth)
- **Provider compatibility**: OAuth/external integrations là nguồn bugs chính

---

## ✨ Yêu cầu tính năng

### 🆕 Features được đề xuất:

1. **Streaming output cho QQ channel** (#3201)
   - **Rationale**: Parity với Telegram/WebSocket
   - **Technical requirement**: Implement `StreamingCapable` interface
   - **Status**: Stale sau 17 ngày - có thể bị downprioritize

2. **Native typing presence cho WhatsApp** (#3240)
   - **Đã có PR #3242 implementing**
   - **Implementation**: 
     - Send `composing` immediately
     - Refresh every 10s cho long responses
     - Send `paused` khi done
   - **UX impact**: Giảm perceived latency

3. **Simplex platform support** (#3193)
   - **New channel type** mở rộng ecosystem
   - **Status**: Open từ 27/06, chưa có feedback

### 📊 Feature request trends:
- **Multi-platform parity**: Users muốn feature consistency across channels
- **Real-time feedback**: Streaming, typing indicators → focus vào perceived performance
- **i18n expansion**: Czech translations cho thấy growing international adoption

---

## 👥 Phản hồi người dùng

### 😊 Tích cực:
- **Contribution process rõ ràng**: PRs đều follow template, có checkboxes cho type of change
- **Documentation tốt**: Issues có clear reproduction steps, expected vs actual behavior
- **Responsive maintainers**: Issues có comments và được address (dù một số bị stale)

### 😐 Điểm cần cải thiện:
- **Stale issue management**: 
  - 4/4 issues đều được mark stale trong cùng ngày (17/07)
  - 9/12 PRs được mark stale
  - **Concern**: Có thể khiến contributors nản lòng nếu không có communication
  
- **Migration pain**: Issue #3206 cho thấy version migration không smooth
  - Users gặp blocking errors trên fresh install
  - Config schema changes gây breaking

### 💭 User sentiment:
- **Technically engaged community**: Issues có quality technical writeups (e.g., #3239 với detailed OAuth flow analysis)
- **Production users**: Security/performance PRs cho thấy dự án được dùng ở scale

---

## 🗓️ Backlog & Roadmap

### 📋 Inferred priorities (từ PR activity):

**Q3 2026 Focus Areas:**

1. **🔒 Security Hardening** (Highest priority)
   - MQTT TLS verification
   - OAuth timeout + concurrency
   - Input validation across channels
   
2. **⚡ Performance Optimization**
   - Memory allocation reduction
   - Hot path optimization (seahorse, skills)
   - Prepare cho scale-up

3. **🌐 Platform Expansion**
   - Simplex channel
   - QQ streaming (lower priority - đã stale)
   - WhatsApp enhancements

4. **🧹 Technical Debt**
   - Config migration stability
   - Dependency management (Azure SDK freeze - PR #3204)
   - Installation scripts consolidation (PR #1951 - open từ 03/2024!)

### ⚠️ Bottlenecks:
- **PR #1951** (installation scripts) open từ **15 tháng** → Possible maintainer bandwidth issue hoặc deprioritized infra work
- **Stale marking aggressive**: 9 PRs marked stale cùng lúc có thể indicate backlog overwhelm

### 🔮 Next milestones (speculative):
- **v0.4.0**: Security hardening release (PR #3246)
- **v0.3.x**: Minor feature additions (WhatsApp, Czech i18n)
- **v1.0**: Nếu focus vào stability → có thể approach v1.0 sau security audit

---

## 📌 Kết luận

**PicoClaw đang ở giai đoạn "maturation"**: 
- Shift từ feature velocity sang **stability, security, performance**
- Technical debt được address systematically
- Community engaged nhưng maintainer bandwidth có thể là constraint

**Recommendations cho contributors:**
- Priority cao: Security/performance PRs
- Priority trung bình: Platform-specific enhancements
- Priority thấp: New platforms (đợi core stability)

**Red flags cần monitor:**
- Stale PR rate tăng → maintainer burnout risk
- Migration issues → cần investment vào upgrade tooling

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/nanocoai/nanoclaw">nanocoai/nanoclaw</a></summary>

# 📊 Báo cáo NanoClaw - Ngày 18/07/2026

## 🎯 Tóm tắt hôm nay

Hôm nay NanoClaw tập trung mạnh vào **sửa lỗi cốt lõi và cải thiện độ ổn định** với 8 PR bug-fix được mở trong 24h. Hai vấn đề quan trọng: lỗi định tuyến message cross-channel (#3081) và memory leak sau uptime dài (#3075) đang được xử lý khẩn cấp. Đồng thời, có 1 **lỗ hổng bảo mật xác thực webhook** (#3065) đã được phát hiện và sửa chữa.

---

## 🚀 Releases

❌ **Không có release mới trong 24h qua**

---

## 📈 Tiến độ dự án

### 🔧 Bug Fixes & Stability (Ưu tiên cao)

#### **Critical Infrastructure Fixes**

- **#3081** 🚨 `fix(agent-runner): route per-turn results by turn generation`
  - **Vấn đề**: Định tuyến message dựa vào `routing` cố định lúc entry, nhưng query kéo dài qua nhiều turn từ các channel khác nhau → sai routing
  - **Giải pháp**: Định tuyến theo generation của từng turn thay vì frozen routing
  - **Impact**: Fix lỗi nghiêm trọng trong multi-channel conversation

- **#3079** 🔥 `fix(agent-runner): gate mid-turn follow-up push on trigger=1`
  - **Vấn đề**: Agent phản hồi cả tin nhắn không liên quan (trigger=0) trong mid-turn
  - **Root cause**: Warm container bỏ qua accumulate gate
  - **Kết quả**: Hai agent cùng room tạo infinite loop tự phản hồi nhau

- **#3078** ⚙️ `fix(session): pin agent-shared resolution to an anchor session`
  - **Vấn đề**: Session resolution chọn NEWEST → fork ra 2 session/agent khi có wiring change
  - **Giải pháp**: Pin vào anchor session thay vì newest
  - **Impact**: Đảm bảo consistency trong agent-shared wirings

#### **Provider & Integration Fixes**

- **#3077** `fix(claude): only abort on rejected rate_limit_event`
  - Fix lỗi mapping: SDK emit `rate_limit_event` status=`allowed` (telemetry) bị hiểu nhầm thành quota error
  - Tách riêng `rate_limit` vs `quota` để tránh abort không cần thiết

- **#3080** `fix(add-matrix): ship matrix-js-sdk ESM fix as pnpm patch`
  - Matrix SDK có lỗi ESM import (thiếu `.js` extension)
  - Hiện tại fix bằng edit trực tiếp node_modules → revert khi reinstall
  - PR này chuyển sang dùng pnpm patch để persistent

#### **Testing & QA**

- **#3082** `test(uninstall): skip chmod test when running as root`
  - Test backup-failure dùng `chmod 0o555` nhưng root ignore permission
  - False-fail trên LXC containers → skip khi detect root

### 🔐 Security

- **#3065** 🛡️ `fix(security): authenticate loopback webhook` (GHSA-h9g4-589h-68xv)
  - **Lỗ hổng**: Webhook local forwarded-gateway không có authentication
  - **CWE-306**: Any unprivileged process trên cùng host có thể forge actions
  - **Status**: PR đã mở, đợi review

- **#3066** 📄 `docs(security): fix SECURITY.md accuracy for v2`
  - Cleanup stale v1 content trong security docs
  - Clarify `nonMainReadOnly` behavior

### ✨ Features & Integrations

- **#3076** `feat(imessage): unified local+hosted adapter` (targeting spectrum-ts v11)
- **#2999** `feat(channels): unify iMessage` - single channel với 2 backends (local + hosted)
- **#3073** `Add Adoption Companion pack` - Memory Receipts + Knowledge Inventory utility skills

### 📦 Merged Today

- **#2952** ✅ `Skill/add opencode stack` (CLOSED)
- **#2951** ✅ `fix(opencode): dedicated OPENCODE_BASE_URL` (CLOSED)
- **#3063** ✅ `docs(changelog): drop duplicated Unreleased bullets` (CLOSED)

---

## 🌟 Điểm nổi bật cộng đồng

### 💬 Issues được chú ý

1. **#3075** 👥 `Silent log loss + duplicate-insert errors after long uptime`
   - **Môi trường**: WSL2, Docker, Matrix local homeserver
   - **Triệu chứng**: 
     - Log bị mất sau uptime dài
     - Inbound message duplicate-insert errors
     - Không có systemd unit được cài
   - **Tác động**: Production stability issue, chưa có PR fix

2. **#3071** ✅ `Discord: bare URLs posted by agent arrive as literal [url](url)`
   - URLs không clickable trên Discord
   - Root cause: Chat SDK Discord adapter auto-wrap URLs vào markdown
   - **Status**: CLOSED (fix nhanh trong 1 ngày)

3. **#3074** `claude provider with custom ANTHROPIC_BASE_URL (OpenRouter)`
   - Turns bị drop khi SDK result event empty nhưng model reply valid
   - Ảnh hưởng: OpenRouter users mất responses

### 📉 Tương tác thấp
Các PR/issue mới (18/07) chưa có bình luận → cộng đồng đang theo dõi, chờ core team review

---

## 🐛 Ổn định & Bugs

### 🔴 Critical

1. **Agent routing & session management** (#3081, #3078, #3079)
   - Cụm lỗi liên quan đến multi-channel, multi-session coordination
   - Có thể gây agent loop, sai routing, session fork

2. **Memory & uptime issues** (#3075)
   - Log loss sau uptime dài
   - Duplicate inserts → database integrity concern

### 🟡 Medium

3. **Provider compatibility** (#3074, #3077)
   - Claude + OpenRouter: turn dropping
   - Rate limit handling: false-positive aborts

4. **Chat adapter issues** 
   - Discord markdown formatting (#3071) - fixed ✅
   - Matrix ESM import (#3080)

### 🟢 Low Priority

5. **Documentation** (#3072)
   - Skill docs chỉ document `/name` (Claude Code syntax)
   - Codex dùng `$name`, CLI không nhận `/name`

---

## 💡 Yêu cầu tính năng

### Skills & Integrations

- **iMessage unification** (#2999, #3076)
  - Merge local + hosted backends vào single `imessage` channel
  - Targeting spectrum-ts v11
  - Skill: `/add-imessage`

- **Adoption Companion pack** (#3073)
  - Memory Receipts utility
  - Knowledge Inventory utility
  - Hỗ trợ user onboarding

- **OpenCode stack** (#2952) - MERGED ✅
  - Operational/container skill

---

## 👥 Phản hồi người dùng

### 😤 Pain Points

1. **Production instability**
   - @libellebilai-collab: Log loss + duplicate errors sau uptime dài
   - Thiếu systemd unit → service management khó khăn

2. **Multi-provider pain**
   - @apelosi: OpenRouter + Claude → silent turn drops
   - Debugging khó vì SDK event empty

3. **Documentation gaps**
   - @glifocat: Skill invocation syntax inconsistent across harnesses
   - Docs chỉ cover Claude Code, bỏ qua Codex & CLI

### 😊 Positives

- **Quick response time**: #3071 (Discord URLs) closed trong 1 ngày
- **Security awareness**: Proactive fix #3065 cho webhook auth vulnerability

---

## 📋 Backlog & Roadmap

### 🎯 Immediate Focus (Dựa vào PR activity)

**Phase 1: Stability Sprint** (Current)
- ✅ Fix core routing/session bugs (#3081, #3078, #3079)
- ✅ Resolve provider compatibility issues (#3077, #3074)
- ✅ Security hardening (#3065)
- ⏳ Address uptime/memory issues (#3075)

**Phase 2: Integration Consolidation**
- iMessage unification (#2999, #3076)
- Matrix adapter stabilization (#3080)

**Phase 3: Developer Experience**
- Documentation accuracy (#3072, #3066)
- Testing infrastructure (#3082)
- Adoption tools (#3073)

### 📊 Trend Analysis

**Nhận xét chung**:
- **Mature project phase**: Tập trung vào stability over features
- **Production-ready concerns**: Uptime, memory, session management
- **Security-conscious**: Proactive vulnerability fixes
- **Multi-provider complexity**: OpenRouter, custom base URLs → edge cases

**Dự đoán**:
- Tuần tới: Merge wave cho 8 PR bug-fix hiện tại
- Sau đó: Feature release với iMessage unification + adoption tools
- Long-term: Provider abstraction layer để handle custom endpoints tốt hơn

---

## 📌 Tổng kết

**Điểm mạnh hôm nay**:
- 🏃 Velocity cao: 8 PR trong 24h
- 🎯 Focus rõ ràng: Core stability
- 🛡️ Security proactive

**Thách thức**:
- 🔥 Critical bugs chưa merge (#3081 routing, #3075 memory)
- 📚 Documentation debt (#3072)
- 🔌 Multi-provider edge cases (#3074)

**Khuyến nghị quan sát**:
- Theo dõi merge status của 3 critical PRs (#3081, #3079, #3078)
- Monitor #3075 memory issue - có thể cần architecture change
- Security PR #3065 cần priority review

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 18/07/2026

## 1. 📊 Tóm tắt hoạt động hôm nay

Dự án IronClaw đang trong giai đoạn **tái cấu trúc kiến trúc lớn** (architecture simplification) để chuẩn bị cho phiên bản 1.0. Hoạt động chính tập trung vào việc **hợp nhất các storage backend** (§4.3), **loại bỏ các prefix deployment-mode không cần thiết** (§4.4), và **nâng cấp trải nghiệm onboarding**. Đáng chú ý, đội ngũ đã **đổi tên binary chính từ `ironclaw-reborn` thành `ironclaw`**, đánh dấu sự trưởng thành của nền tảng mới.

## 2. 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng PR #5598 cho thấy đang chuẩn bị release với các thay đổi breaking API:
- `ironclaw_common`: 0.4.2 → 0.5.0 (breaking changes)
- `ironclaw_skills`: 0.3.0 → 0.4.0 (breaking changes)
- `ironclaw`: 0.24.0 → 0.29.1

## 3. 🏗️ Tiến độ dự án

### 🔥 Xu hướng chính: Architecture Simplification

Dự án đang thực hiện một **kế hoạch tái cấu trúc có hệ thống** theo tài liệu `docs/reborn/2026-07-17-architecture-simplification-dto-dyn-local.md`:

#### **A. Hợp nhất Storage Layer (§4.3)**
Đã merge hoặc đang review 8 PR loại bỏ các `InMemory*Store` thừa:

✅ **Đã hoàn thành:**
- #6203: Run-state & approval stores
- #6200: Process stores  
- #6197: Authorization lease store
- #6195: Approvals store
- #6210: Budget-gate store

🔄 **Đang review:**
- #6212: Outbound-state store (XL - phức tạp nhất)
- #6213: Triggered-run-delivery store
- #6214: Delivered-gate-route store

**Chiến lược:** Thay thế các hand-written in-memory stores bằng production `FilesystemXxxStore` chạy trên in-memory backend, giảm từ ~200 LOC/store xuống còn 1 implementation duy nhất.

#### **B. Loại bỏ Deployment-Mode Naming (§4.4)**

✅ **Bucket 2 - Filesystem rename:**
- #6209: `LocalFilesystem` → `DiskFilesystem` (đã merge)
- #6218: Xóa alias `LocalDevRootFilesystem` (đang review)

✅ **Bucket 3 - Trace submission:**
- #6207: `LocalTraceSubmission*` → `NodeTraceSubmission*` (đã merge)
- #6206: `LocalHostProcessPort` → `HostProcessPort` (đã merge)

🎯 **Mục tiêu cuối cùng:** Không có type name nào chứa `Local`/`LocalDev`/`Hosted`/`Enterprise` (đã có ratchet test #6222)

### 🎉 Milestone quan trọng: Binary Rename

**PR #6185** đổi tên binary chính:
- `ironclaw-reborn` → `ironclaw` (canonical command)
- `ironclaw` (legacy) → `ironclaw-v1` 

**Ý nghĩa:** Đánh dấu **Reborn stack chính thức trở thành main stack**, v1 legacy đang trong quá trình phát thải (#6077-#6080 tracking epic).

### 🌟 Cải tiến UX: Onboarding Journey

**PR #6174** (XL) giới thiệu workflow setup 2-bước:
```bash
cargo build -p ironclaw_reborn_cli --features full
ironclaw-reborn onboard
```

**Tính năng mới:**
- Keychain master key management
- Two-prompt setup (key → model)
- Background service daemon
- Auto-open browser login link

**Trước đây:** Người dùng phải tự config file, seed secrets, start server → **Ngay bây giờ:** Một lệnh là xong.

### 📱 Telegram Channel Integration

**PR #6159** (đã merge) đưa Telegram thành first-class channel:
- Admin bot setup
- WebGeneratedCode pairing (mã ghép nối web)
- DM ingress & replies
- Auth/approval status messages
- Default-off, feature-gated `telegram-v2-host-beta`

**Fix follow-up:** PR #6217 đảm bảo Telegram binary được compile trong production Docker image.

## 4. 💬 Điểm nổi bật cộng đồng

### 🔴 Vấn đề bảo mật được báo cáo (#6170)

**Mức độ nghiêm trọng:** Cao  
**Issue:** Người dùng trên multi-tenant instance có thể execute shell commands thông qua WebUI agent và truy cập filesystem không giới hạn (ví dụ: `ls -all`).

**Tình trạng:** CLOSED sau 1 ngày (2026-07-16 → 2026-07-17)  
**Giải pháp:** Không được công khai trong issue, nhưng response nhanh cho thấy đội ngũ xử lý nghiêm túc.

### 📊 Vấn đề được thảo luận nhiều

**Issue #4644** (OPEN, 2 comments): Universal attachments  
**Issue #5331** (CLOSED, 2 comments): Tool-approval 'always' bug  
**Issue #4181** (OPEN, 0 comments): NEAR wallet login trong WebChat v2

## 5. 🐛 Ổn định & Bugs

### ✅ Bugs đã fix trong 24h

1. **#6161 - WASM tool plain-text output**
   - **Vấn đề:** WASM capability trả về plain text (không phải JSON) gây lỗi `OutputDecode`, model không nhận được content
   - **Fix:** Host giờ đây handle cả JSON và plain text gracefully

2. **#6219 - Incomplete rename trong test code**
   - **Vấn đề:** `LocalFilesystem` → `DiskFilesystem` rename thiếu 5 references trong Telegram test code
   - **Fix:** Hoàn thiện rename, đảm bảo consistency

### 🔧 Đang xử lý

**#6215** (NEW): Model cost table/budget accountant không rebuild sau LLM reload  
- **Root cause:** PR #6174 hợp nhất boot LLM injection vào `reload()` chokepoint, nhưng không rebuild cost accounting
- **Impact:** Settings → LLM Provider change không cập nhật budget constraints
- **Status:** Vừa được mở, chưa có fix

### 🎯 Performance & Infrastructure

**#6221**: Tăng job timeout cho benchmark suite từ 240 phút → 350 phút  
- **Lý do:** claw-swe-bench chạy 350 tasks, bị timeout ở task thứ 7/350
- **Giải pháp:** Forward timeout cap để full suite hoàn thành

## 6. 🌈 Yêu cầu tính năng

### Epic đang active

**#6198 - Pre-v1 Refactoring Epic**  
Tổng hợp tất cả refactoring work cần làm trước khi release v1.0:
- Store consolidation (§4.3) - 80% hoàn thành
- Deployment-mode cleanup (§4.4) - đang triển khai
- Legacy runtime retirement (§10) - roadmap đã vẽ

**#3577 - Track v1 channel ports cho Reborn**  
Theo dõi porting guide cho từng channel surface: Telegram ✅, Slack 🔄, WASM 🔄

### Feature request quan trọng

**#4644 - Universal attachments** (suggested_P1)  
Yêu cầu hệ thống attachment thống nhất cross-channel với:
- Wire legacy pipeline vào v1
- Extensible format registry
- Polished web UX
- **Status:** Enhancement open, chưa assign

**#4181 - NEAR wallet login trong WebChat v2**  
Carry v1 NEAR wallet behavior sang WebChat v2 surface (tách riêng từ #4116 cho Google/GitHub login)

## 7. 👥 Phản hồi người dùng

### Tương tác cộng đồng

- **@liaoqianchuan** (#4278): Báo cáo performance issue về unbounded conversation growth trong ENGINE_V2 → đã được CLOSE, có giải pháp
- **@sergeiest** (#6170): Báo cáo security issue về filesystem access → response nhanh, CLOSE sau 1 ngày
- **Contributor mới @sergeiest** cũng submit PR #6211 fix CLI stubs

### Sentiment tổng quan

- **Tích cực:** Đội ngũ response nhanh cho security issues, onboarding UX được cải thiện đáng kể
- **Trung tính:** Nhiều internal refactoring, impact trực tiếp đến end-user chưa rõ
- **Cần cải thiện:** Attachment support vẫn đang bị drop trên Reborn stack (#4644)

## 8. 📋 Backlog & Roadmap

### Phase hiện tại: Pre-v1 Polish

**Đã hoàn thành ~70%:**
- ✅ Binary rename (ironclaw-reborn → ironclaw)
- ✅ Telegram channel integration
- ✅ Onboarding journey
- ✅ 5/8 store consolidation PRs merged

**Đang làm (~20%):**
- 🔄 3 store consolidation PRs còn lại (outbound family)
- 🔄 Deployment-mode naming cleanup (Bucket 2-3)
- 🔄 Slack connection-epoch refactor (#6169)

**Sắp tới (~10%):**
- 🎯 Complete §4.4 Bucket 1-4 renames
- 🎯 Legacy runtime retirement (#6077-#6080)
- 🎯 Release workflow updates (#6188)
- 🎯 Model cost accounting fix (#6215)

### Epic dài hạn

**#6198 - Pre-v1 Refactoring**: Tracking 20+ issues với label `refactoring`  
**#2721/2722 - Engine V2 quality regressions**: Eval suite cho V2 quality parity  
**#5119/5124 - Reborn channel support**: Track tất cả channels lên Reborn stack

### Roadmap tổng thể

```
Q3 2026: v1.0 Release
├── July: Architecture simplification (§4.3, §4.4) ← 🔥 Đang ở đây
├── Aug: Legacy runtime retirement (§10)
└── Sep: Production hardening & polish

Post-v1.0:
├── Channel ports completion (#3577)
├── Universal attachments (#4644)
└── Enterprise features
```

---

## 📈 Metrics tổng quan

- **PRs merged hôm nay:** ~10
- **Issues closed hôm nay:** ~5
- **Active contributors:** 8+ (core team + external)
- **Refactoring velocity:** 1-2 store consolidation PRs/ngày
- **Test coverage trend:** Tăng (ratchet tests được thêm cho §4.4, §10)

**Đánh giá:** Dự án đang trong **high-velocity refactoring phase** với quy trình rõ ràng, code review kỹ càng, và đội ngũ phối hợp tốt. Architecture simplification đang đi đúng kế hoạch hướng tới v1.0 milestone. 🚀

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo phân tích LobsterAI - 2026-07-18

## 1. 🎯 Tóm tắt hoạt động hôm nay

Ngày 17/7/2026 đánh dấu một đợt phát hành lớn với **15 PR được merge** và **1 release chính thức** (v2026.7.16). Đội ngũ tập trung vào việc cải thiện trải nghiệm người dùng thông qua **tính năng skin tùy chỉnh do AI tạo**, tối ưu hóa giao diện artifacts, và xử lý hàng loạt **5 issues cũ được đóng** (stale issues từ tháng 4). Đồng thời, hệ thống xử lý lỗi được nâng cấp với thông tin chi tiết hơn cho người dùng khi gặp sự cố.

## 2. 🚀 Releases

### 📦 LobsterAI 2026.7.16 (Phát hành: 17/07/2026)

**Tính năng chính:**

- **🎨 Campaign Reward System**: Tích hợp hệ thống phần thưởng chiến dịch với modal `CreditsFinalRewardModal`, cho phép người dùng nhận phần thưởng cuối cùng
- **📋 Clipboard Enhancement**: Tái cấu trúc module trích xuất file từ clipboard thành helper có thể test được, cải thiện độ tin cậy khi xử lý đính kèm file
- **🐛 Bug Fixes**: Sửa lỗi layout và padding trong modal phần thưởng

**Ý nghĩa:** Release này tập trung vào **gamification** và cải thiện chất lượng code thông qua refactoring, đặc biệt là khả năng kiểm thử.

## 3. 📈 Tiến độ dự án

### 🔥 Pull Requests quan trọng đã merge (17/07):

#### A. Tính năng mới nổi bật:

**🎨 #2352 - AI-Generated Skin System** (by @btc69m979y-dotcom)
- Cho phép tạo **theme/skin ứng dụng bằng AI**
- Quản lý skin: áp dụng, khôi phục, xóa, và chọn appearance cho chế độ sáng/tối
- Mở rộng skin trên toàn bộ UI: sidebar, title bars, conversations
- **Impact**: Tạo sự khác biệt lớn về khả năng cá nhân hóa, tăng tính hấp dẫn của sản phẩm

**🔍 #2348 - Structured Error Details** (by @fisherdaddy)
- Hiển thị thông tin lỗi chi tiết: provider, model, HTTP code, error type, failover reason
- User có thể **mở rộng xem chi tiết kỹ thuật** thay vì chỉ thấy thông báo chung chung
- **Impact**: Cải thiện khả năng troubleshoot và minh bạch hóa quy trình xử lý lỗi

#### B. UI/UX Improvements:

- **#2357**: Ổn định layout của artifact panel và input area, giảm hiện tượng flickering
- **#2355, #2351**: Cải thiện Windows caption buttons về màu sắc hover và kích thước
- **#2347**: Giảm chu kỳ kiểm tra update từ 12h xuống 2h (phản hồi nhanh hơn với bản cập nhật)
- **#2346**: Sửa lỗi email diagnostics không mở trong chat mới

#### C. Backend & Data:

- **#2349**: Persistence cho service deployment data
- **#2354**: Xử lý stale chat error sau khi deferred final thành công
- **#2345**: Localize NSIS web installer và sửa lỗi progress bar

### 📊 Xu hướng phát triển:

```
Phân bố PR theo area:
├─ renderer: 60% (giao diện người dùng)
├─ main: 25% (logic core)
├─ cowork: 20% (tính năng cộng tác)
├─ artifacts: 15%
└─ openclaw: 10%
```

**Insight**: Đội ngũ đang ưu tiên **polish UI/UX experience** và **error handling transparency**.

## 4. 💬 Điểm nổi bật cộng đồng

### ⭐ PR/Issue có tương tác:

**#1315 - Resizable Sidebar** (OPEN - stale)
- **Vấn đề**: Sidebar cố định 240px không phù hợp với tất cả màn hình
- **Giải pháp đề xuất**: Cho phép drag để thay đổi kích thước (180px-480px)
- **Trạng thái**: PR đã được tạo (#1315) nhưng vẫn chưa merge, được đánh dấu stale
- **Tác động**: Tính năng được yêu cầu nhiều từ cộng đồng nhưng chưa được ưu tiên

**#1308 - Agent-specific Input Draft** (OPEN - stale)
- Cho phép mỗi agent có draft riêng thay vì dùng chung
- PR đã sẵn sàng nhưng bị bỏ quên

## 5. 🐛 Ổn định & Bugs

### ✅ Đã khắc phục:

1. **#1354 - System Crash (Blue Screen)**: Pageant startup gây blue screen - đã đóng (stale)
2. **#1357 - False Positive**: Agent báo đã khởi động Pageant nhưng thực tế chưa - đã đóng
3. **#1359 - Zombie Tasks**: Task đã xóa vẫn xuất hiện sau restart - đã đóng
4. **#1360 - Duplicate Agent Names**: Không validate trùng tên khi tạo agent - đã đóng

### ⚠️ Vẫn tồn tại:

**#1311 - Table Display Issues** (OPEN)
- Nội dung xuống dòng hiển thị tag HTML thô
- Text dài bị cắt không có hover tooltip
- **Status**: Đang chờ xử lý

### 🔧 Pattern phát hiện:

Nhiều issues từ đầu tháng 4 bị đánh dấu **stale** và đóng tự động mà không có fix thực sự. Có thể do:
- Không tái hiện được
- Ưu tiên thấp
- Chuyển sang tracking nội bộ

## 6. 🎁 Yêu cầu tính năng

### 🔝 Top requests:

1. **Resizable Sidebar** (#1314, #1315) - Cao
   - Đã có implementation nhưng chưa merge
   - Ảnh hưởng trực tiếp đến productivity

2. **Table Content Enhancement** (#1311) - Trung bình
   - Cải thiện hiển thị HTML content
   - Thêm tooltip cho text bị cắt

3. **Agent Input Isolation** (#1308) - Trung bình
   - Tăng trải nghiệm multi-agent workflow

### 💡 Insight:

Cộng đồng quan tâm nhiều đến **workflow optimization** hơn là features mới. Các yêu cầu tập trung vào:
- Tùy chỉnh workspace (sidebar width)
- Data persistence (draft isolation)
- Information visibility (table display)

## 7. 👥 Phản hồi người dùng

### 😊 Positive signals:

- User tích cực report bugs kèm logs chi tiết (thấy qua các attachment .zip)
- Có screenshots chi tiết khi báo lỗi
- Follow-up discussion trong issues

### 😐 Pain points:

1. **Stability concerns**: Blue screen issue (#1354) rất nghiêm trọng
2. **Trust issues**: False positive responses (#1357) làm giảm độ tin cậy
3. **Data integrity**: Deleted tasks reappearing (#1359) gây khó chịu
4. **Polish needed**: UI details như HTML tags trong table (#1311)

### 📊 Quality of feedback:

**Tốt** ✅ - Users cung cấp:
- Steps to reproduce
- Expected vs actual results
- Log files
- Screenshots

## 8. 📅 Backlog & Roadmap

### 🎯 Priorities rõ ràng (dựa trên hoạt động gần đây):

**Q3 2026 Focus Areas:**

1. **🎨 Personalization**
   - ✅ AI-generated skins (completed)
   - ⏳ Sidebar resizing (pending)
   - ⏳ Theme management improvements

2. **🛡️ Reliability**
   - ✅ Structured error details (completed)
   - ✅ Clipboard handling refactor (completed)
   - ⏳ Stale task cleanup (in progress)

3. **⚡ Performance**
   - ⏳ Layout stability (ongoing - #2357)
   - ⏳ Update check optimization (completed)

### 🔮 Predicted next steps:

- **Short-term** (1-2 tuần): Merge resizable sidebar PR, fix table display issues
- **Mid-term** (1 tháng): Enhanced agent management, improved task persistence
- **Long-term**: Ecosystem expansion (dựa trên skin system foundation)

### ⚠️ Technical debt:

- Multiple stale PRs cần review (#1308, #1315)
- Automated issue closing có thể đang ẩn bugs thực sự
- Windows-specific issues (blue screen, caption buttons) cần attention đặc biệt

---

## 📌 Key Takeaways

✨ **Highlights:** LobsterAI đang chuyển mình từ "feature building" sang "experience polishing" với focus vào UI/UX và error transparency.

⚡ **Momentum:** 15 PR/ngày cho thấy velocity cao, nhưng cần cân bằng giữa new features và community requests.

🎯 **Recommendation:** Ưu tiên merge các PR từ cộng đồng (#1315, #1308) để tăng engagement và show commitment to open-source contributions.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo phân tích CoPaw/QwenPaw - 2026-07-18

## 1. 🎯 Tóm tắt hôm nay

Ngày 17/07/2026 đánh dấu một ngày làm việc cực kỳ hiệu quả với **40 pull requests** và **19 issues** được xử lý. Dự án vừa phát hành **v2.0.0.post3**, tập trung vào tối ưu hiệu năng, sửa lỗi nghiêm trọng trong quá trá migration từ 1.x sang 2.0, và cải thiện trải nghiệm người dùng. Đặc biệt nổi bật là các cải tiến về khởi động multi-agent, memory management, và desktop application graceful shutdown.

## 2. 🚀 Releases

### **v2.0.0.post3** (17/07/2026)

**Các cải tiến chính:**

- **🔄 MCP Migration Fix**: Sửa lỗi migration headers từ `${VAR}` sang env credential refs (#6091)
- **🧠 Memory Management**: 
  - Giới hạn automatic memory chỉ cho external user queries (#6120)
  - Bound summary task history để tránh memory leak (#6206)
- **🖥️ Desktop App**: 
  - Graceful shutdown thay vì force-kill backend (#6225)
  - Sửa lỗi import trong Tauri entry point (#6234)
- **⚡ Performance**: 
  - Bound concurrent ReMe initialization (#6198)
  - Cache và compress static assets trong Console (#6232)
- **🔧 Bug Fixes**:
  - Browser automation timeout protection (#6170)
  - Token usage buffer không persist cache chưa seed (#6220)
  - Multimodal detection fail-open logic (#6217)

**Ý nghĩa**: Release này tập trung vào ổn định hóa sau major update 2.0, sửa các lỗi migration nghiêm trọng và tối ưu resource usage cho production deployment.

## 3. 📈 Tiến độ dự án

### **🔥 Các PR quan trọng đang active:**

#### **Performance & Scalability** ⚡
- **#6193** - MCP drivers start parallel: Giảm thời gian khởi động từ ~40s xuống ~5s (8x nhanh hơn) khi dùng 8 MCP clients
- **#6198** - Bounded multi-agent startup: Giải quyết memory spike khi khởi động nhiều agents (ví dụ: 36 agents)
- **#6151** - Background tool call refactor: Dual-deadline architecture (`offload_deadline` + `kill_deadline`) để xử lý tool calls tốt hơn

#### **Memory & Context Management** 🧠
- **#6235** - Manual memory index rebuild: Thêm endpoint `/agents/{id}/memory/reindex` thay vì rebuild tự động lúc startup
- **#6237** - Scroll history improvement: Date-aware queries và complete conversational turns

#### **UX Improvements** 🎨
- **#6195** - Chat context/token usage từ per-message action lên session-level indicator
- **#6214** - Expose `history_retention_days` trong Context Compact panel

#### **Infrastructure** 🏗️
- **#5187** - Computer-use tool: Windows desktop automation với UIA + Tauri control mode
- **#6027** - CodeQL security scan + Dependabot (hiện tại không có security scanning)

### **📊 Xu hướng phát triển:**

1. **Tối ưu hiệu năng khởi động**: Chuyển từ sequential sang parallel initialization
2. **Memory footprint control**: Thêm các cơ chế bounded growth và manual cleanup
3. **Desktop app maturity**: Graceful shutdown, better process management
4. **Developer experience**: Better observability (Langfuse integration #5922), integration tests (#6213)

## 4. 💬 Điểm nổi bật cộng đồng

### **🔥 Issues được quan tâm nhất:**

**#6227** - Per-chat MCP server selection (👍 1, 1 comment)
- Yêu cầu cho phép chọn MCP servers và tools riêng biệt cho từng conversation
- Phản ánh nhu cầu granular control trong production use

**#6155** - Bug migration 1.x → 2.0 (5 comments)
- Nhiều vấn đề phát hiện sau upgrade:
  - Embedding config mapping bug
  - Auto-Memory parameters không hoạt động
  - Scheduler timezone không áp dụng
  - Channel tool trigger không tương thích backward
- **Tác động**: Ảnh hưởng nghiêm trọng đến users upgrade từ 1.x

**#6193** - MCP parallel startup (3 comments)
- Cải thiện 8x performance, từ ~40s xuống ~5s
- Đang được implement trong #6198

**#5976** - Channel tool call display control (4 comments)
- Request tách riêng hiển thị tool parameters và results
- Hỗ trợ truncation để tránh spam channel với results dài

### **👥 Feedback tích cực:**

- Community đánh giá cao việc team response nhanh với bugs
- Desktop app improvements được chào đón (graceful shutdown)
- Performance optimizations được ghi nhận rõ ràng

## 5. 🐛 Ổn định & Bugs

### **Critical Bugs (Đã fix trong v2.0.0.post3):**

1. **#6169** - UAC privilege escalation không cần thiết
   - `qwenpaw app` force user accept UAC
   - **Fixed**: Removed unnecessary elevation

2. **#6201** - PubMed MCP gây lỗi llama.cpp
   - Root cause: GBNF parser không nhận regex shorthands (`\d`, `\w`, `\s`)
   - **Fixed**: #6216 expand regex trong tool schemas

3. **#6219** - Desktop force-kill backend
   - Tauri dùng `TerminateProcess`/`SIGKILL` thay vì graceful shutdown
   - **Fixed**: #6225 implement proper shutdown sequence

### **In Progress:**

- **#6155** - Migration 1.x → 2.0 issues: Đang được xử lý từng phần
- **Memory leaks**: Summary task history unbounded growth (fixed #6206)
- **Token usage buffer**: Unseeded cache persistence issue (fixed #6220)

### **Performance Issues:**

- **Startup bottleneck**: Sequential MCP initialization → Parallel execution (#6193, #6198)
- **Memory spike**: Multi-agent concurrent initialization → Bounded concurrency (#6198)

## 6. 💡 Yêu cầu tính năng

### **High Priority:**

**#6227** - Granular MCP control per chat
- Enable/disable specific MCP servers và tools cho từng conversation
- Tránh tool pollution trong contexts không liên quan

**#6228** - Per-chat internet search toggle
- On/off web access control
- Privacy và cost management

**#6229** - Reasoning depth selection
- Light/Medium/Deep/Auto modes
- Balance giữa speed và thoroughness

**#6230** - Hermes model support
- Add Hermes-3, Nous-Hermes làm secondary reasoning engine
- Cross-session memory capabilities

**#6231** - Multiple configs cho cùng model ID
- Ví dụ: `deepseek-v4-pro` với/không thinking
- Hiện tại phải manually edit config

**#5976** - Channel display granularity
- Tách control cho tool calls và results
- Truncation support cho long outputs

**#6205** - Console asset optimization
- Compress và cache JS files
- Cải thiện loading trên "small pipe" connections
- **Status**: Đã implement trong #6232

### **Medium Priority:**

**#6162** - Auto-detect model context window
- `max_input_length: "auto"` thay vì hardcode
- Read từ `/v1/models` API response

**#5919** - Global agent configuration template
- Tránh phải reconfigure cho mỗi agent mới
- Copy settings từ template

## 7. 📣 Phản hồi người dùng

### **😊 Positive Feedback:**

- **Performance improvements** được đánh giá cao:
  - 8x faster MCP startup
  - Desktop app responsiveness
  
- **Developer Experience**:
  - Integration test coverage (#6213)
  - Better error messages
  - Langfuse observability (#5922)

### **😐 Pain Points:**

**Migration 1.x → 2.0** (#6155):
- Breaking changes không được document đầy đủ
- Multiple bugs trong migration path
- Backward compatibility issues với channel tools

**Desktop App** (#6169, #6219):
- UAC prompts không cần thiết
- Force-kill backend causing data loss risk

**Configuration Management** (#6231, #5919):
- Phải manually edit JSON cho simple changes
- Thiếu config templates
- Multiple configs cho cùng model không support

**Console Performance** (#6205):
- Slow loading trên low-bandwidth connections
- Large JS bundles không được cached/compressed

### **🎓 Learning Curve:**

- MCP server setup phức tạp cho beginners
- Memory management concepts (ReMe, Scroll) cần better docs
- Tool calling behavior không intuitive (offload deadlines, background execution)

## 8. 📋 Backlog & Roadmap

### **Immediate Focus (Sprint 4.2):**

✅ **Completed:**
- Multi-agent startup optimization (#6198)
- Desktop graceful shutdown (#6225)
- Memory management fixes (#6206, #6220)
- Console asset optimization (#6232)
- Integration test coverage (#6213)

🔄 **In Progress:**
- Computer-use tool (#5187) - Windows desktop automation
- Tool call background mechanism refactor (#6151)
- Scroll history improvements (#6237)
- PawApp SDK + Kanban app (#6150)

### **Short-term (Đang review/plan):**

🎯 **UX Improvements:**
- Per-chat MCP/tool selection (#6227)
- Internet search toggle (#6228)
- Reasoning depth control (#6229)
- Channel display granularity (#5976)

🔧 **Configuration:**
- Multiple configs per model ID (#6231)
- Global agent templates (#5919)
- Auto-detect context windows (#6162)

⚡ **Performance:**
- Parallel MCP driver start (#6193)
- Memory index rebuild API (#6235)

### **Medium-term:**

🔐 **Security & Quality:**
- CodeQL security scanning (#6027)
- Dependabot automated updates
- SAST integration (Bandit)

🤖 **AI Capabilities:**
- Hermes model family support (#6230)
- Enhanced reasoning modes
- Cross-session memory

🏗️ **Infrastructure:**
- PawApp ecosystem development (#6150)
- Better observability (Langfuse #5922)
- Batch tool execution improvements (#5698)

---

## 📌 Nhận xét tổng quan

**Điểm mạnh:**
- Team phản hồi và fix bugs cực kỳ nhanh (40 PRs trong 1 ngày)
- Tập trung đúng vào pain points: performance, stability, UX
- Test coverage đang được cải thiện đáng kể

**Thách thức:**
- Migration 1.x → 2.0 còn nhiều rough edges
- Configuration management cần được đơn giản hóa
- Documentation cho advanced features (MCP, memory, tool calling) cần improve

**Xu hướng tích cực:**
- Chuyển từ "ship features" sang "stabilize & optimize"
- Desktop app đang trưởng thành (proper process management)
- Security scanning cuối cùng cũng được prioritize (#6027)

CoPaw/QwenPaw đang trong giai đoạn "post-2.0 stabilization" rất tốt, với focus rõ ràng vào production readiness. 🚀

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo phân tích Hermes-Agent - Ngày 18/07/2026

## 🎯 Tóm tắt hôm nay

Ngày 18/07 ghi nhận hoạt động PR dày đặc với **13 PR mới** tập trung vào sửa lỗi cấu hình và tích hợp. Điểm nổi bật là chuỗi PR từ @webtecnica xử lý các lỗi môi trường (UTF-16, shell quoting, git path), trong khi team core bổ sung tính năng hạ tầng như dashboard proxy và deep link. Không có release mới nhưng độ hoạt động code rất cao, cho thấy sprint ổn định hóa trước milestone.

## 🚀 Tiến độ dự án

### Pull Requests nổi bật

**🔧 Chuỗi sửa lỗi cấu hình & môi trường** (13 PR từ @webtecnica)
- **#66583, #66585**: Sửa lỗi nghiêm trọng trong xử lý file `.env` - UTF-16 BOM và internal whitespace gây corrupt key/value
- **#66427**: Resolve git binary path động thay vì hardcode `"git"` → tăng khả năng tương thích Homebrew/custom PATH
- **#66367**: Model picker nhóm sai custom provider dưới "CUSTOM ENDPOINT" thay vì tên đúng
- **#66602**: Fix Anthropic adaptive thinking cho proxy aliases (third-party endpoints)

**🏗️ Tính năng hạ tầng mới**
- **#66498**: Dashboard proxy mode - API-only remote access với 3 cải thiện bảo mật: hidden env, CORS-only, HTTPS-enforced
- **#66647**: Deep link `hermes://session/<id>` cho desktop app → hoàn thiện flow #4335
- **#66504**: QR code cho dashboard (`--qr`) - giải quyết pain point kết nối mobile

**⚙️ Cải thiện vận hành**
- **#66533**: Self-triggered context compaction - agent tự động compact khi gần limit thay vì chờ user gõ `/compact`
- **#66537**: Evict tool results lớn (>32K) ra disk với head/tail preview → tiết kiệm token
- **#66648**: Curator staleness surfacing - hiển thị độ stale của skills trong `hermes status` và dashboard

**🐛 Sửa lỗi quan trọng**
- **#66650**: Tolerate UTF-16 surrogates trong tool guardrail → tránh crash khi scrape web text
- **#66532**: WSL2 MCP watchdog false-positive (kills healthy child) do clock resync sau sleep
- **#66456**: Cron DST wall-clock shift (croniter không xử lý DST đúng)

### Issues mới

**🔴 Bugs ưu tiên cao (P2)**
- **#66641**: `_resolve_task_provider_model` bỏ qua `key_env` → vision/compression task trả 401
- **#66642**: Terminal tool mất venv từ PATH do login-shell snapshot reset

**🟡 Feature requests (P3)**
- **#9978**: Feishu interactive card format với metadata footer (model, latency, tokens)
- **#66643**: Desktop `/new` không giữ active project's working dir nữa (regression)
- **#66025**: Memory prompt stale trong long-running desktop sessions

## 🔥 Điểm nổi bật cộng đồng

### Issues có tương tác
- **#58705** (👍 1): mem0 OSS + Qdrant lock conflict - plugin giữ lock, agent tools fail
  - Vấn đề kiến trúc: main process init mem0 → lock file, agent subprocess không mở được cùng Qdrant directory

### PRs có impact lớn
- **#31279**: Expose Hermes MCP tools cho Codex workers - cho phép Kanban worker dùng native `kanban_*` tools thay vì JSON-RPC workaround
- **#58511**: ToolSnap MCP catalog entry - 38 deterministic web/data microtools (Cloudflare Workers)
- **#66652**: Email category cho MCP catalog (Gmail, Outlook, QQ, NetEase) với optional `category` field

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đang xử lý

**Môi trường & cấu hình**
- UTF-16 BOM trong `.env` gây corrupt keys (#66585)
- Internal spaces trong env values không được quote → shell-sourcing fail (#66583)
- Git binary resolution fail trên non-default PATH (#66427)

**Session & memory**
- Memory prompt stale trong desktop long-running sessions (#66025) - tagged `sweeper:risk-session-state`
- TUI gateway memory leak: slash_worker không đóng khi WS detach (~13MB/worker × N sessions) (#57687)
- Double-prefix group session keys trong gateway (#66649)

**Platform-specific**
- WSL2 MCP watchdog kills healthy children sau host sleep (#66532 + #66518)
- Cron DST wall-clock shift (#66456 + #66436)

### Các lỗi đã có PR fix
- Empty assistant messages runaway loop (#66434) - filter trước khi gửi API
- Delegation cleanup race (#65955) - prune xóa result trước khi parent consume
- TUI foreground turns lost khi background delegation complete (#63671)

## ✨ Yêu cầu tính năng

### Tích hợp & extensibility
1. **Email MCP providers** (#66652) - Gmail, Outlook, QQ, NetEase với catalog category
2. **ToolSnap MCP** (#58511) - 38 web/data microtools, deterministic, Cloudflare Workers
3. **Feishu interactive cards** (#9978) - rich format với metadata footer

### UX & accessibility
1. **Dashboard QR code** (#66504) - phone quick-connect
2. **Deep links** (#66647) - `hermes://session/<id>` mở session từ browser/notification
3. **Dashboard proxy mode** (#66498) - hardened API-only remote access

### Autonomous operation
1. **Self-triggered compaction** (#66533) - agent tự động compact context khi gần limit
2. **Tool result eviction** (#66537) - offload lớn (>32K) ra disk, giữ head/tail preview
3. **Curator staleness surfacing** (#66648) - expose độ stale trong CLI/dashboard

## 💬 Phản hồi người dùng

### Pain points được report

**Desktop app regressions**
- `/new` không giữ active project directory nữa (#66643) - user phải manually cd lại
- Memory prompt stale trong long-running sessions (#66025) - MEMORY.md snapshot không refresh

**Third-party integrations**
- Anthropic proxy aliases không detect adaptive thinking (#66602)
- Custom OpenAI endpoints thiếu `/v1` suffix gây 404 (#65617)
- Model picker grouping sai cho named custom providers (#66367)

**Terminal & tooling**
- Terminal tool mất venv PATH (#66642) - `python` resolve về system thay vì venv
- Write_file clobbering external edits (#65618) - cần staleness check

### Community feedback patterns
- Demand cho **remote access** tăng (dashboard proxy, QR code, deep links)
- **Memory management** là pain point lớn ở desktop (staleness, long sessions)
- **Configuration ergonomics** cần polish (env file encoding, git path, quoting)

## 📋 Backlog & Roadmap

### Đang trong sprint (theo PR tags)
- **Desktop polish**: deep links, session management, memory refresh
- **Infrastructure hardening**: dashboard proxy, curator observability
- **Config robustness**: env file parsing, git resolution, endpoint normalization
- **Platform compatibility**: WSL2 fixes, DST handling, UTF-16 support

### Blockers & risks (theo sweeper tags)
- `sweeper:risk-session-state`: 8 PRs - memory leak, stale context, detached sessions
- `sweeper:risk-compatibility`: 7 PRs - breaking changes trong config, git, cron
- `sweeper:risk-message-delivery`: Slack reconnect loop (#66645)
- `sweeper:blast-broad`: TUI foreground preservation (#63671)

### Upcoming (theo needs-decision tag)
- Dashboard proxy security model (#66498)
- Empty message filtering strategy (#66434)
- Anthropic adaptive thinking fallback (#66602)
- Tool result eviction thresholds (#66537)

---

**🎯 Kết luận**: Sprint stability-focused với 13 PR/ngày từ một contributor chính (@webtecnica) xử lý technical debt. Core team song song phát triển infrastructure (dashboard, deep links, MCP catalog). Không có major feature release nhưng foundation đang được củng cố mạnh cho desktop + remote gateway use cases.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*