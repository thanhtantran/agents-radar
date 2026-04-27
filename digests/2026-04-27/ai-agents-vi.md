# Bản tin Hệ sinh thái OpenClaw 2026-04-27

> Issues: 314 | PRs: 500 | Dự án: 13 | Thời gian tạo: 2026-04-27 02:00 UTC

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

# 📊 Báo cáo phân tích OpenClaw - 27/04/2026

## 🎯 Tóm tắt hôm nay

Hôm nay OpenClaw tập trung vào việc **ổn định hệ thống sau bản release 2026.4.25**, với 10 PR được mở để sửa các vấn đề về routing, caching, và plugin infrastructure. Cộng đồng đang phản ánh mạnh về các vấn đề channel (Telegram, Discord, WhatsApp) và hiệu năng trên Windows. Đáng chú ý là các fix về CLI dispatch, workspace bootstrap cache, và Slack thread routing đang được ưu tiên xử lý.

---

## 🚀 Releases

### v2026.4.25-beta.1 → beta.4 (26/04/2026)

**Tính năng nổi bật:**

🎙️ **TTS Upgrade toàn diện**
- Lệnh `/tts latest` mới cho phép phát lại tin nhắn cuối
- Auto-TTS controls theo phạm vi chat
- Hỗ trợ personas và override theo agent/account
- **7 provider mới**: Azure Speech, Xiaomi, Local CLI, Inworld, Volcengine, ElevenLabs v3

🔌 **Plugin Infrastructure Overhaul**
- Chuyển sang cold persisted registry → giảm manifest scans
- Cải thiện plugin update, repair, provider discovery
- Tăng tốc khởi động gateway

**Ý nghĩa:** Đây là bước tiến lớn về trải nghiệm voice/audio, đáp ứng nhu cầu multi-modal ngày càng cao. Plugin registry mới giải quyết vấn đề hiệu năng khởi động - một pain point thường xuyên được báo cáo.

---

## 📈 Tiến độ dự án

### 🔥 PRs quan trọng đang active (27/04)

**Infrastructure & Core:**

1. **#72499** - CLI dispatch routing fix (XL)
   - Đảm bảo tất cả helper paths (queued runs, model probes, cron) đi qua CLI backend đúng cách
   - Follow-up của #57326, xử lý các edge cases còn sót

2. **#72498** - Slack thread session routing (M)
   - Normalize thread roots và replies về cùng session key
   - Seed thread-level routing cho app mentions
   - **Critical** cho Slack UX

3. **#72406** - Workspace bootstrap cache refresh (S)
   - Fix long-lived sessions không nhận workspace file changes
   - Giải quyết #64871 với cache invalidation thông minh

**Developer Experience:**

4. **#72493** - Core logger dependency staging (M)
   - Fix `tslog` missing trong runtime deps
   - `openclaw doctor --fix` tự động repair

5. **#72494** - Plugin registration fail-loud (S)
   - Throw error khi `registerHook` thiếu `opts.name`
   - Ngăn silent failures trong plugin development

**Channels:**

6. **#72489** - WhatsApp 408 disconnect runbook
7. **#72490** - Gateway daemon quick start clarification

### 📊 Xu hướng phát triển

- **Stability-first approach**: 7/10 PRs hôm nay là bugfixes
- **Channel reliability**: Slack, WhatsApp, Discord đang được ưu tiên
- **Developer tooling**: Doctor, error messages, documentation improvements
- **Performance**: Cache optimization, session management

---

## 💬 Điểm nổi bật cộng đồng

### 🔝 Issues hot nhất (theo comments)

**#53628** - XDG_CONFIG_HOME không được xử lý khi cài skill (12 comments)
- Docker environment variable handling
- Ảnh hưởng đến skill installation flow

**#63101** - Feishu channel config validation fails sau upgrade v4.5→v4.8 (10 comments)
- Breaking change trong config schema
- Nhiều users gặp phải sau upgrade

**#65824** - Feature bundle: 11 platform gaps từ intensive daily use (10 comments, 👍1)
- User @smonett audit toàn diện từ production usage
- Backed by working workaround scripts
- **High-value feedback** từ power user

**#54253** - RISC-V64 support issue (10 comments, 👍3)
- "LLM Request Failed" trên RISC-V architecture
- Community interest trong ARM/RISC-V deployment

### 🎭 Vấn đề người dùng quan tâm

1. **Multi-tenancy** (#60127) - Shared server + RBAC thay vì N instances
2. **Outbound task calls** (#59245) - Agent gọi điện thay user (đặt bàn, hỏi hãng bay)
3. **OpenAI Realtime cho Talk Mode** (#71195) - Speech-to-speech latency < 1s

---

## 🐛 Ổn định & Bugs

### 🚨 Critical Issues

**Channel Reliability:**

- **#70623** - Telegram & Discord channel issues trên 2026.4.21
  - Telegram: replies không gửi được
  - Discord: voice join không có audio reply
  
- **#63169** - WhatsApp media send "success" nhưng không deliver
  - Text OK, video/media bị mất
  - Logs báo "Sent" nhưng user không nhận được

- **#71066** - Telegram getUpdates polling silent failure
  - Bot token valid, API reachable
  - Polling loop không consume updates

**Performance:**

- **#70857** - Windows startup latency 191s
  - Session lock held quá lâu trên `sessions.json.lock`
  - Reply latency cao

- **#70856** - WhatsApp listener disconnect loop trên Windows
  - "No active WhatsApp Web listener"
  - Missed messages

**Core Logic:**

- **#70734** - `[object Object]` hallucination sau session wipe
  - Persist sau fix branch #69278
  - Fresh session vẫn bị

- **#66459** - Telegram transcript có reply nhưng không send
  - `[thinking, text]` turn không deliver
  - Session state inconsistent

### 🔧 Đang được xử lý

- **CLI backend routing** (#72499) - Comprehensive fix cho helper paths
- **Slack threading** (#72498) - Session routing normalization
- **Bootstrap cache** (#72406) - Workspace file change detection
- **Plugin registration** (#72494) - Fail-loud validation

---

## ✨ Yêu cầu tính năng

### 🎯 High-demand features

**1. Multi-tenancy (#60127)**
- Shared server với RBAC
- Scoped resources, data boundaries
- Thay vì chạy N instances riêng biệt
- **Use case:** Startup environments, team deployments

**2. Outbound Task Calls (#59259)**
- Agent chủ động gọi điện thoại
- Use cases: đặt bàn, hẹn bác sĩ, thay đổi vé máy bay
- Xử lý waiting states, flexible responses
- Real-time user consultation khi cần

**3. OpenAI Realtime for Talk Mode (#71195)**
- Speech-to-speech path cho macOS Talk
- Parity với voice-call plugin (sub-second latency)
- Hiện tại: STT → chat → TTS chain (1.7-4.9s)

**4. Context Provenance (#54373)**
- Metadata cho injected context segments
- Source tracking (SOUL.md, memory, skills)
- Volatility indicators (session-start vs fresh)
- Giúp agent phân biệt context types

**5. Skill Priority Config (#42669)**
- `skills.priority` ordering trong prompt
- Fix truncation của skills quan trọng
- Alphabetical ordering hiện tại không optimal

### 🌐 Localization & UX

- **#53556** - Backward compatibility cho channel config
  - Feishu: `botId` → `appId`, enum changes
  - Auto-migration needed

- **#52776** - Control UI localization
  - Shell labels vẫn hard-coded English
  - i18n system đã có, cần expand coverage

---

## 👥 Phản hồi người dùng

### 😊 Positive signals

- **TTS upgrade** trong 2026.4.25 được đón nhận tốt
- **Plugin registry** cải thiện startup time đáng kể
- **Doctor tooling** giúp troubleshooting dễ hơn

### 😟 Pain points

**1. Upgrade friction**
- Config breaking changes giữa versions
- Feishu, Telegram multi-account issues
- Cần better migration tooling

**2. Windows experience**
- Session lock performance (#70857)
- WhatsApp disconnect loops (#70856)
- Platform-specific issues chưa được ưu tiên

**3. Channel stability**
- Telegram, Discord, WhatsApp reliability issues
- Media sending inconsistencies
- Thread/session routing bugs

**4. Documentation gaps**
- Daemon vs foreground mode confusion (#72490)
- WhatsApp 408 troubleshooting (#72489)
- Missing runbooks cho common issues

### 💡 Community contributions

- **@smonett** (#65824) - Comprehensive feature audit với working workarounds
- **@imwyvern** - Multiple PRs cho skills priority, ACP timeouts
- **@deepujain** - Documentation improvements, config fixes

---

## 🗺️ Backlog & Roadmap

### 🔜 Near-term priorities (inferred từ PR activity)

**Q2 2026 Focus:**

1. **Channel Stability Sprint**
   - Telegram, Discord, WhatsApp reliability
   - Thread/session routing fixes
   - Media delivery consistency

2. **Windows Platform Support**
   - Session lock optimization
   - WhatsApp listener stability
   - Platform-specific testing

3. **Developer Experience**
   - Plugin registration validation
   - Doctor auto-repair expansion
   - Better error messages

4. **Performance**
   - Bootstrap cache optimization
   - CLI dispatch efficiency
   - Memory indexing concurrency

### 🎯 Medium-term (Q3 2026)

- Multi-tenancy architecture
- Outbound calling capabilities
- Realtime voice integration
- Context provenance system

### 📋 Technical debt

- Config backward compatibility layer
- Session management refactor
- Channel provider abstraction
- Test coverage expansion (especially Windows)

---

## 📌 Kết luận

OpenClaw đang trong giai đoạn **consolidation** sau major release 2026.4.25. Team tập trung vào stability, channel reliability, và developer experience. Community feedback rất active với nhiều production use cases thực tế. 

**Điểm mạnh:** Rapid iteration, responsive maintainers, strong plugin ecosystem

**Cần cải thiện:** Windows support, upgrade migration, channel stability, documentation completeness

**Outlook:** Healthy project với clear priorities và engaged community. Multi-tenancy và outbound calling có thể là game-changers cho enterprise adoption.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ Sinh thái AI Agent - 27/04/2026

## 🌍 1. Tổng quan Hệ Sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **phân hóa và chuyên môn hóa mạnh mẽ**. Từ 12 dự án được phân tích, chúng ta thấy rõ 3 nhóm chính:

### **🏆 Tier 1: Nền tảng Trưởng thành**
- **OpenClaw** (314 issues, 500 PRs) - Dẫn đầu về quy mô và tính năng
- **NanoBot** (10 issues, 125 PRs) - Focus vào multi-agent architecture
- **Zeroclaw** (17 issues, 50 PRs) - Chuyên sâu về plugin WASM

### **🚀 Tier 2: Đang Tăng tốc**
- **PicoClaw** (6 issues, 11 PRs) - Cải thiện UX và tool integration
- **NanoClaw** (9 issues, 23 PRs) - Chuyển đổi kiến trúc v2
- **IronClaw** (4 issues, 13 PRs) - Security-first approach
- **Moltis** (6 issues, 13 PRs) - Rapid iteration, security focus

### **⚠️ Tier 3: Ít Hoạt động**
- **LobsterAI** (4 issues, 0 PRs) - Maintenance mode
- **NullClaw** (1 issue, 0 PRs) - Minimal activity
- **CoPaw** (15 issues, 5 PRs) - Stability challenges
- **TinyClaw, ZeptoClaw, EasyClaw** - Không có hoạt động

---

## 📊 2. Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Tương tác | Trạng thái | Điểm mạnh |
|-------|--------|-----|----------|-----------|------------|-----------|
| **OpenClaw** | 314 | 500 | 4 | 🔥🔥🔥 | Consolidation | TTS, Plugin, Multi-channel |
| **NanoBot** | 10 | 125 | 0 | 🔥🔥 | Maturation | Multi-agent, Session mgmt |
| **Zeroclaw** | 17 | 50 | 0 | 🔥🔥 | Acceleration | WASM plugins, Security |
| **PicoClaw** | 6 | 11 | 1 | 🔥 | Stable | Tool calls, Config UX |
| **NanoClaw** | 9 | 23 | 0 | 🔥 | Transformation | v2 architecture |
| **IronClaw** | 4 | 13 | 0 | 🔥 | Maintenance | Audit logging, Channels |
| **Moltis** | 6 | 13 | 1 | 🔥 | Hardening | Security fixes, Model mgmt |
| **CoPaw** | 15 | 5 | 0 | ⚠️ | Struggling | Feature-rich nhưng unstable |
| **LobsterAI** | 4 | 0 | 0 | ❄️ | Dormant | Context issues |
| **NullClaw** | 1 | 0 | 0 | ❄️ | Minimal | CPU bug |
| **TinyClaw** | 0 | 0 | 0 | ❄️ | Inactive | - |
| **ZeptoClaw** | 0 | 0 | 0 | ❄️ | Inactive | - |
| **EasyClaw** | 0 | 0 | 0 | ❄️ | Inactive | - |

### **Chỉ số Velocity (PRs merged/24h)**
1. 🥇 **Moltis**: 10 PRs merged - Cực kỳ nhanh
2. 🥈 **OpenClaw**: 7-10 PRs merged - Rất cao
3. 🥉 **Zeroclaw**: 5-7 PRs merged - Cao
4. **NanoBot, PicoClaw, IronClaw**: 2-4 PRs - Trung bình
5. **Còn lại**: 0-1 PR - Thấp/Không hoạt động

---

## 🎯 3. Vị thế của OpenClaw

### **Vai trò: Platform Leader & Ecosystem Hub**

OpenClaw đang đóng vai trò **"WordPress của AI agents"** - nền tảng trung tâm mà các dự án khác tham chiếu và học hỏi.

#### **Điểm mạnh vượt trội:**

**📈 Quy mô & Độ phủ:**
- **500 PRs** - Gấp 4 lần dự án xếp thứ 2 (NanoBot: 125)
- **314 issues** - Phản ánh cộng đồng lớn và active
- **4 releases** - Duy nhất có release cadence ổn định

**🎨 Tính năng toàn diện:**
- **7 TTS providers mới** - Dẫn đầu về voice/audio
- **Plugin infrastructure** - Cold persisted registry, provider discovery
- **Multi-channel mature** - Telegram, Discord, Slack, WhatsApp
- **Developer tooling** - `openclaw doctor`, auto-repair, diagnostics

**🏗️ Kiến trúc vững chắc:**
- Session management được polish qua nhiều iterations
- CLI dispatch routing đã được refactor nhiều lần
- Bootstrap cache optimization cho long-lived sessions

#### **Thách thức:**

**⚠️ Windows Experience:**
- Session lock performance (#70857) - 191s startup
- WhatsApp disconnect loops (#70856)
- Platform-specific issues chưa được ưu tiên đủ

**⚠️ Channel Stability:**
- Telegram, Discord, WhatsApp reliability issues
- Thread/session routing bugs (#72498)
- Media delivery inconsistencies (#63169)

**⚠️ Upgrade Friction:**
- Config breaking changes giữa versions
- Feishu, Telegram multi-account issues (#63101)
- Thiếu migration tooling

#### **So sánh với đối thủ:**

| Tiêu chí | OpenClaw | NanoBot | Zeroclaw |
|----------|----------|---------|----------|
| **Scope** | All-in-one platform | Multi-agent specialist | Plugin-first framework |
| **Target** | End-users + Developers | Developers | Developers |
| **Maturity** | Production-ready | Near production | Beta |
| **Innovation** | Incremental | Architectural | Security-focused |
| **Community** | Largest | Growing | Technical |

---

## 🔧 4. Hướng Kỹ thuật Chung

### **Xu hướng được nhiều dự án áp dụng:**

#### **🔌 Plugin/Extension Architecture**
- **OpenClaw**: Cold persisted registry, provider discovery
- **Zeroclaw**: WASM plugins với 4 capabilities (tool, channel, memory, observer)
- **PicoClaw**: MCP tool integration, structured tool calls
- **Moltis**: Skill marketplace với security sandboxing

**Insight**: Tất cả đều hướng tới **extensibility** thay vì monolithic design.

#### **🔐 Security Hardening**
- **Zeroclaw**: Env allowlist (#5919), SSRF protection (#5918)
- **IronClaw**: Cryptographic audit logging với Ed25519 (#2684)
- **Moltis**: API keys vào credential store (#885), skill quarantine (#882)
- **NanoClaw**: Channel installer trust boundary (#2022)

**Insight**: Security đang chuyển từ "nice-to-have" sang **core requirement**.

#### **🤖 Multi-Agent Communication**
- **NanoBot**: Mailbox channel plugin (#3461), anti-loop protection
- **NanoClaw**: Origin-session threading (#2002), agent-to-agent routing
- **OpenClaw**: CLI dispatch routing (#72499), helper paths

**Insight**: Hệ sinh thái đang tiến tới **agent swarms** thay vì single-agent.

#### **💾 Session & Context Management**
- **NanoBot**: Session replay token budgeting (#3459), hard caps
- **OpenClaw**: Bootstrap cache refresh (#72406), workspace file changes
- **LobsterAI**: Context length exceeded issues (#60)
- **CoPaw**: Session history disappearing (#3843)

**Insight**: Context window management là **universal pain point**.

#### **🌐 Multi-Channel Support**
- **OpenClaw**: Telegram, Discord, Slack, WhatsApp mature
- **IronClaw**: WeChat Enterprise (#2394), Prismer Cloud IM (#1120)
- **NanoClaw**: Matrix E2EE (#1624)
- **PicoClaw**: QQ audio messages (#3845)

**Insight**: Mở rộng sang **enterprise IM** (WeChat, Feishu) và **privacy-focused** (Matrix E2EE).

---

## 🎭 5. Điểm Khác biệt

### **Chiến lược Sản phẩm:**

#### **OpenClaw: "WordPress Model"**
- **All-in-one platform** cho end-users
- Focus vào **ease of use** và **feature completeness**
- Trade-off: Complexity cao, upgrade friction
- Target: Non-technical users + developers

#### **NanoBot: "Kubernetes Model"**
- **Orchestration layer** cho multi-agent systems
- Focus vào **architectural elegance** và **composability**
- Trade-off: Steeper learning curve
- Target: Advanced developers, researchers

#### **Zeroclaw: "Rust/WASM Model"**
- **Security-first framework** với WASM isolation
- Focus vào **plugin ecosystem** và **safety**
- Trade-off: Binary size (35MB vs 15MB target)
- Target: Security-conscious developers

#### **Moltis: "Rapid Iteration Model"**
- **Fast-moving** với 10 PRs merged/day
- Focus vào **community feedback** và **quick fixes**
- Trade-off: Potential instability, regressions
- Target: Early adopters, experimenters

### **Tính năng Độc đáo:**

| Dự án | Killer Feature | Ý nghĩa |
|-------|----------------|---------|
| **OpenClaw** | 7 TTS providers + auto-TTS controls | Voice-first UX |
| **NanoBot** | Mailbox channel cho agent-to-agent | True multi-agent |
| **Zeroclaw** | WASM plugin với 4 capabilities | Security isolation |
| **PicoClaw** | Structured tool call visualization | Developer transparency |
| **IronClaw** | Ed25519 audit logging | Compliance-ready |
| **Moltis** | On-demand model loading/unloading | Memory efficiency |
| **NanoClaw** | Session-per-message model | Scalability |

### **Cộng đồng & Culture:**

#### **OpenClaw:**
- **Largest community** - 314 issues, nhiều power users
- **Production feedback** - Real-world use cases (#65824)
- **Pain points**: Windows, upgrade friction, channel stability

#### **NanoBot:**
- **Technical community** - Architectural discussions
- **Research-oriented** - Multi-agent experiments
- **Pain points**: Documentation, onboarding

#### **Zeroclaw:**
- **Security-conscious** - Nhiều security issues được report
- **Contributor-friendly** - "good first issue" labels
- **Pain points**: Windows setup, config docs

#### **Moltis:**
- **Responsive maintainers** - < 24h fix time cho critical bugs
- **Security-aware** - Community phát hiện nhiều vulnerabilities
- **Pain points**: Regressions, PR review bottleneck

---

## 🌱 6. Mức độ Trưởng thành Cộng đồng

### **Tier 1: Mature Communities**

#### **OpenClaw** ⭐⭐⭐⭐⭐
- **Indicators:**
  - Power users với comprehensive audits (#65824)
  - Working workarounds được share
  - Multi-account production deployments
- **Maturity level**: Production-grade
- **Growth stage**: Scaling

#### **NanoBot** ⭐⭐⭐⭐
- **Indicators:**
  - Architectural discussions về steering loops (#1181)
  - Meta-ReAct implementations
  - Research paper references
- **Maturity level**: Research-to-production
- **Growth stage**: Specialization

### **Tier 2: Growing Communities**

#### **Zeroclaw** ⭐⭐⭐⭐
- **Indicators:**
  - Active security research (#5919, #5918)
  - Hackathon projects (ESP32 demo #6148)
  - Cross-platform testing
- **Maturity level**: Beta
- **Growth stage**: Ecosystem building

#### **Moltis** ⭐⭐⭐
- **Indicators:**
  - First-time contributors (3/5 PRs)
  - Security vulnerability reports
  - Fast feedback loops
- **Maturity level**: Alpha-to-beta
- **Growth stage**: Rapid iteration

#### **PicoClaw** ⭐⭐⭐
- **Indicators:**
  - Structured feedback (#295 - 10 comments)
  - Root cause analysis (#1042)
  - Feature prioritization discussions
- **Maturity level**: Beta
- **Growth stage**: Stabilization

### **Tier 3: Early/Struggling**

#### **IronClaw** ⭐⭐⭐
- **Indicators:**
  - Canary failures không được xử lý (#2966-2968)
  - Feature requests có analysis (#2965)
  - Contributor activity tốt
- **Maturity level**: Alpha
- **Growth stage**: Infrastructure focus

#### **NanoClaw** ⭐⭐
- **Indicators:**
  - v1→v2 migration challenges
  - Setup friction (#1973, #2025)
  - Active development nhưng ít users
- **Maturity level**: Pre-alpha (v2)
- **Growth stage**: Transformation

#### **CoPaw** ⭐⭐
- **Indicators:**
  - Nhiều stability issues (#3854 - 45 crashes)
  - User frustration rõ ràng
  - First-time contributors nhưng core unstable
- **Maturity level**: Alpha
- **Growth stage**: Struggling

#### **LobsterAI** ⭐
- **Indicators:**
  - Issues cũ không được xử lý (60+ days)
  - Không có PR activity
  - Maintainer MIA
- **Maturity level**: Abandoned?
- **Growth stage**: Decline

---

## 🔮 7. Tín hiệu Xu hướng

### **🎯 Xu hướng Ngắn hạn (Q2-Q3 2026)**

#### **1. Multi-Agent Orchestration sẽ bùng nổ**
- **Dẫn chứng:**
  - NanoBot: Mailbox channel, long-task tool
  - NanoClaw: Origin-session threading
  - OpenClaw: CLI dispatch routing refactor
- **Dự đoán**: Các framework sẽ cạnh tranh về **agent coordination primitives**

#### **2. Security sẽ trở thành differentiator**
- **Dẫn chứng:**
  - Zeroclaw: WASM isolation, env allowlist
  - IronClaw: Cryptographic audit logs
  - Moltis: Credential store, skill quarantine
- **Dự đoán**: Enterprises sẽ chọn platforms có **compliance-ready features**

#### **3. Voice/Multi-modal sẽ là bàn cược lớn**
- **Dẫn chứng:**
  - OpenClaw: 7 TTS providers, auto-TTS controls
  - NanoBot: OpenAI Realtime requests (#71195)
  - PicoClaw: Speech-to-text auto-conversion
- **Dự đoán**: **Sub-second latency** voice agents sẽ là killer feature

#### **4. Windows/Cross-platform sẽ được ưu tiên**
- **Dẫn chứng:**
  - OpenClaw: Windows performance issues (#70857)
  - Zeroclaw: Windows setup fixes (#6137)
  - NullClaw: WSL2 CPU bug (#870)
- **Dự đoán**: Platforms không support Windows tốt sẽ **mất market share**

### **🌊 Xu hướng Trung hạn (Q4 2026 - Q1 2027)**

#### **5. Enterprise IM sẽ là battlefield mới**
- **Dẫn chứng:**
  - IronClaw: WeChat Enterprise (#2394)
  - OpenClaw: Feishu issues (#63101)
  - NanoClaw: Matrix E2EE (#1624)
- **Dự đoán**: **China market** và **privacy-conscious enterprises** sẽ drive adoption

#### **6. Cost optimization sẽ quan trọng hơn features**
- **Dẫn chứng:**
  - IronClaw: Aurora DSQL request (#2965)
  - Moltis: On-demand model loading (#884)
  - OpenClaw: Model priority config (#42669)
- **Dự đoán**: **Intelligent routing** và **resource management** sẽ là must-have

#### **7. Plugin ecosystems sẽ quyết định winners**
- **Dẫn chứng:**
  - Zeroclaw: Universal skill registry (#6143)
  - OpenClaw: Plugin infrastructure overhaul
  - Moltis: Skill marketplace
- **Dự đoán**: Platforms với **largest plugin library** sẽ thắng (như npm, PyPI)

### **🚀 Xu hướng Dài hạn (2027+)**

#### **8. Autonomous agents sẽ cần "steering loops"**
- **Dẫn chứng:**
  - NanoBot: Steering Loop architecture (#1181)
  - OpenClaw: Outbound task calls (#59259)
  - NanoBot: Long-task tool (#3460)
- **Dự đoán**: Agents sẽ chuyển từ **reactive** sang **proactive**, cần human-in-the-loop controls

#### **9. Compliance & Auditability sẽ là regulatory requirement**
- **Dẫn chứng:**
  - IronClaw: Ed25519 audit logging
  - Zeroclaw: SSRF protection, env allowlist
  - Moltis: Credential encryption
- **Dự đoán**: **EU AI Act** và tương tự sẽ force platforms implement audit trails

#### **10. Edge/IoT deployment sẽ mở rộng use cases**
- **Dẫn chứng:**
  - Zeroclaw: ESP32 demo (#6148)
  - PicoClaw: Raspberry Pi requests (#2675)
  - Moltis: Binary size concerns
- **Dự đoán**: **Smart home**, **robotics**, **industrial IoT** sẽ là markets mới

---

## 🎓 Kết luận Chiến lược

### **Cho OpenClaw:**

**✅ Điểm mạnh cần duy trì:**
1. **Feature completeness** - Tiếp tục lead về tính năng
2. **Community size** - Leverage largest user base
3. **Production feedback** - Learn from real-world use cases

**⚠️ Rủi ro cần giải quyết:**
1. **Windows experience** - Đang mất market share cho competitors
2. **Upgrade friction** - Cần migration tooling tốt hơn
3. **Channel stability** - Reliability issues ảnh hưởng trust

**🎯 Cơ hội chiến lược:**
1. **Voice-first positioning** - Double down on TTS/STT leadership
2. **Enterprise IM** - Mở rộng sang WeChat Enterprise, Feishu
3. **Plugin marketplace** - Tạo "App Store" cho OpenClaw plugins
4. **Multi-tenancy** - Capture startup/team deployment market (#60127)

### **Cho Hệ sinh thái:**

**Consolidation sẽ xảy ra** - Chỉ 3-4 platforms sẽ survive:
- **OpenClaw**: All-in-one leader
- **NanoBot**: Multi-agent specialist
- **Zeroclaw**: Security-first framework
- **1-2 niche players**: (IronClaw cho compliance, Moltis cho rapid iteration)

**Các dự án khác** (LobsterAI, NullClaw, TinyClaw, etc.) có nguy cơ **bị bỏ lại** nếu không tìm được niche rõ ràng.

---

**📅 Ngày báo cáo**: 27/04/2026  
**🔄 Cập nhật tiếp theo**: Khuyến nghị weekly để theo dõi xu hướng

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích Hệ Sinh thái NanoBot - 27/04/2026

## 🎯 Tóm tắt hôm nay

Ngày 27/04 chứng kiến hoạt động tích cực với 3 issues được đóng và nhiều PR quan trọng đang trong giai đoạn review. Dự án tập trung vào việc cải thiện trải nghiệm đa kênh (Slack, WeChat, Telegram), tối ưu hóa quản lý session, và mở rộng khả năng tương tác giữa các agent. Đáng chú ý là các cải tiến về streaming, xử lý media, và kiến trúc multi-agent đang được phát triển song song.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua. Tuy nhiên, các PR đang được merge vào nhánh `nightly` cho thấy version tiếp theo sẽ tập trung vào:
- Cải thiện WebUI với streaming và xử lý media
- Tối ưu session lifecycle
- Hỗ trợ đa kênh tốt hơn

---

## 📈 Tiến độ dự án

### 🔥 PRs quan trọng đang active:

**1. Cải thiện Session Management (#3459, #3427)**
- Giải quyết vấn đề session replay token budgeting
- Thêm hard cap để ngăn file session phình to không kiểm soát
- Normalize DeepSeek content payloads để tránh lỗi API
- **Impact**: Tăng độ ổn định cho các cuộc hội thoại dài hạn

**2. Multi-Agent Communication (#3461)**
- Thêm mailbox channel plugin cho giao tiếp giữa các agent
- Zero-modification approach - hoàn toàn là plugin
- Anti-loop protection với TTL mechanism
- **Impact**: Mở đường cho kiến trúc multi-agent phức tạp

**3. WebUI Enhancements (#3454, #3430)**
- Render video attachments inline
- Thêm ask_user choices UI với inline card
- Model settings page tập trung
- **Impact**: Trải nghiệm web chat chuyên nghiệp hơn

**4. Slack Thread Context (#3462, #3465)**
- Fix thread context preservation cho proactive replies
- Subagent announces giờ route đúng về thread gốc
- **Impact**: Slack bot hoạt động tự nhiên hơn trong threads

**5. Long-Running Tasks (#3460)**
- LongTaskTool cho multi-step agent tasks
- Meta-ReAct loop với sequential subagent steps
- **Impact**: Xử lý được các tác vụ phức tạp, dài hạn

### 📊 Xu hướng phát triển:

- **Channel Maturity**: Tập trung fix bugs cho WeChat, Slack, Telegram
- **Session Optimization**: Giải quyết memory leaks và context drift
- **Multi-Agent Architecture**: Hướng tới hệ thống agent phân tán
- **Developer Experience**: Thêm commands như `/history`, `/clear`, `/ping`

---

## 💬 Điểm nổi bật cộng đồng

### 🔝 Issues có nhiều tương tác:

**#1181 (9 👍) - Đề xuất kiến trúc hai tầng**
- Người dùng @MicroAgent-dev đề xuất Steering Loop + AgentMessage
- Phản ánh nhu cầu về autonomous task management
- Liên quan đến #2133 và #2915 về vấn đề agent loop
- **Insight**: Cộng đồng muốn agent tự chủ hơn, không bị block bởi user input

**#2915 - "Can't redirect nanobot while in loop"**
- User frustration: Agent không nghe lời khi đang trong loop
- Đã được đóng nhưng vẫn là pain point phổ biến
- **Insight**: Cần cơ chế interrupt/steering tốt hơn

**#3468 - MCP compatibility bug**
- Nanobot forward MCP capability names mà không sanitize
- Gây lỗi với một số MCP servers
- Được tag `good first issue` - cơ hội cho contributors mới

---

## 🐛 Ổn định & Bugs

### ✅ Đã giải quyết:

1. **#3469 - DeepSeek-v4 reasoning_content error**
   - Lỗi khi model cần multiple thinking rounds
   - Fixed trong #3427 với content normalization

2. **#3443 - Reasoning field leak**
   - Chain-of-thought nội bộ bị expose cho user
   - Fixed trong non-streaming parse path

3. **#410 - Reasoning content preservation**
   - Multi-turn conversations với reasoning models bị fail
   - Đã merge fix để preserve reasoning_content

### ⚠️ Đang xử lý:

1. **#3435 - WeChat media upload fails**
   - File attachments trả về `[file upload failed]`
   - Chưa có PR fix

2. **#3464 - Subagent thread routing**
   - Announces route sai về channel thay vì thread
   - Có PR #3465 đang review

3. **#3455 - AsyncOpenAI timeout issue**
   - Client không có timeout, có thể hang 10 phút
   - Cần set explicit timeout

---

## ✨ Yêu cầu tính năng

### 🆕 Đề xuất mới:

**#3452 - Per-channel sendProgress/sendToolHints**
- Hiện tại là global config
- User muốn config riêng cho từng channel
- **Use case**: Telegram có thể cần verbose, WeChat cần tối giản

### 🔨 Đang implement:

**#3137 - Unified manage_skill tool**
- CRUD operations cho skills thông qua single tool
- Builtin skills read-only, workspace skills writable
- **Impact**: Dễ dàng quản lý skills hơn

**#3466, #3467 - Session management commands**
- `/history [n]` - xem lịch sử messages
- `/clear` - reset session không cancel tasks
- `/ping` - health check nhanh
- **Impact**: Better debugging và user control

**#3457 - create-instance skill**
- Agent có thể tạo bot instances mới qua conversation
- Hỗ trợ multi-instance deployment
- **Impact**: Self-service bot creation

---

## 👥 Phản hồi người dùng

### 😊 Positive:

- WebUI improvements được đón nhận tốt (video rendering, ask_user UI)
- Multi-agent mailbox approach được khen là "elegant, zero-modification"
- Session optimization PRs giải quyết pain points thực tế

### 😕 Pain Points:

1. **Agent autonomy**: Users muốn agent tự chủ hơn trong long-running tasks
2. **Channel inconsistencies**: Mỗi channel (Slack, WeChat, Telegram) có quirks riêng
3. **Context management**: Session files phình to, token budgeting chưa tối ưu
4. **Interrupt mechanism**: Khó redirect agent khi đang trong loop

### 💡 Community Insights:

- Có xu hướng sử dụng NanoBot cho **multi-agent systems** (mailbox, subagents)
- Nhu cầu về **better observability** (history, task status)
- Quan tâm đến **production stability** (timeouts, memory leaks)

---

## 🗺️ Backlog & Roadmap

### 🎯 Short-term (đang active):

1. **Session lifecycle hardening** - Prevent context drift và unbounded growth
2. **Channel parity** - Fix bugs cho WeChat, Slack threads, Telegram forums
3. **Developer commands** - `/history`, `/clear`, `/ping`, `/tasks`
4. **WebUI polish** - Media rendering, model settings, ask_user UX

### 🔮 Medium-term (có PRs draft):

1. **Multi-agent architecture** - Mailbox channel, long-task tool
2. **Memory backends** - Graphiti knowledge graph (#2636)
3. **Advanced retrieval** - QMD re-ranking (#2620)
4. **OAuth improvements** - Provider logout (#2727)

### 🌟 Long-term (community requests):

1. **Steering Loop architecture** (#1181) - Autonomous task management
2. **Per-channel configurations** (#3452) - Granular control
3. **MCP ecosystem** - Better compatibility với MCP servers
4. **Forum/thread support** - Telegram forums (#2628), WhatsApp groups (#2663)

---

## 📌 Kết luận

NanoBot đang trong giai đoạn **maturation** với focus vào stability và production-readiness. Các cải tiến về session management, multi-channel support, và multi-agent capabilities cho thấy dự án đang phát triển từ MVP sang enterprise-grade solution. Community engagement tốt với nhiều quality PRs từ contributors, đặc biệt là các improvements về WebUI và channel plugins.

**Key takeaway**: Dự án cân bằng tốt giữa innovation (multi-agent, knowledge graphs) và stability (bug fixes, session optimization). Roadmap rõ ràng hướng tới autonomous, production-ready AI agent framework.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo phân tích Zeroclaw - Ngày 27/04/2026

## 🎯 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn tăng tốc phát triển với **50 PRs** và **17 issues** hoạt động. Dự án tập trung mạnh vào việc hoàn thiện hệ thống plugin WASM, sửa lỗi tương thích đa nền tảng (đặc biệt Windows), và cải thiện trải nghiệm tích hợp với các provider AI. Đáng chú ý là sự xuất hiện của các tính năng mới như skill registry và demo phần cứng IoT.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng có nhiều hoạt động chuẩn bị cho phiên bản tiếp theo:
- Các PR đang được merge tích cực để ổn định v0.7.3
- Tài liệu Windows setup đang được przepisane hoàn toàn (#6102)
- Binary size vẫn là mối quan tâm (35MB vs mục tiêu 15MB - #5873)

---

## 📈 Tiến độ dự án

### 🔥 Các PR quan trọng đã merge/đóng (24h qua):

**✅ Hạ tầng cốt lõi:**
- **#6141** - Thêm capability `skill` cho plugin markdown-only, mở đường cho agentskills.io integration
- **#6144** - Fix lỗi Bedrock từ chối Opus 4.7 do temperature parameter
- **#6135** - Refactor session validation sang typed errors (tăng type safety)
- **#137** - Sửa các lỗi nghiêm trọng trong `setup.bat` Windows (#6118)

**✅ Cải thiện trải nghiệm:**
- **#6124** - Sửa docs header trỏ về repo chính thức thay vì fork
- **#6142** - Tự động persist CNAME cho GitHub Pages deployment
- **#6035** - Sửa ACP tool output formatting (tool names hiển thị sai)

### 🔄 PRs đang hot (nhiều discussion):

**#6107** - Capture `reasoning_content` từ streaming responses
- **Vấn đề:** DeepSeek V4 thinking-mode reject requests khi thiếu reasoning_content
- **Tác động:** Critical cho các model có extended thinking capability
- **Rủi ro:** High - thay đổi core agent loop

**#6112** - Matrix channel rewrite hoàn toàn trên matrix-rust-sdk 0.16
- **Scope:** Clean-room rewrite, loại bỏ hand-rolled HTTP code
- **Tác động:** Cải thiện stability và maintainability
- **Rủi ro:** XL size, high risk

**#6138** - Apply `[providers.X]` config cho fallback providers
- **Vấn đề:** Fallback chain chỉ đọc từ env vars, bỏ qua config file
- **Fix:** Thread provider config qua ProviderRuntimeOptions
- **Liên quan:** #5803 (P1 bug)

**#6143** - Universal skill registry (agentskills.io, skills.sh)
- **Kiến trúc:** Trait-based registry thay vì hardcoded if-else
- **Mục tiêu:** Hỗ trợ nhiều skill sources (ClawHub, agentskills.io, custom)

---

## 💬 Điểm nổi bật cộng đồng

### 🔝 Issues được quan tâm:

**#6149** - Config.toml examples không khớp với binary thực tế (YOLO mode)
- **Severity:** S1 - workflow blocked
- **Vấn đề:** Docs hướng dẫn config keys đã outdated
- **Tác động:** Người dùng không thể test local được

**#6150** - Yêu cầu `/clear` command cho Telegram/Discord
- **Nhu cầu:** Clear memory nhanh từ chat channel
- **Hiện tại:** Phải dùng agent interpretation, rất awkward
- **Đề xuất:** Native channel command

**#6148** - Demo ESP32 smart-room với Telegram
- **Highlight:** Hackathon project - phone → Telegram → ZeroClaw → ESP32
- **Bao gồm:** Simulator cho testing không cần hardware
- **Ý nghĩa:** Mở rộng use case sang IoT/embedded

### 👥 Contributor activity:

- **@singlerider** - Cực kỳ active với 7 PRs (Matrix rewrite, reasoning_content, test fixes)
- **@JordanTheJet** - Focus vào plugin ecosystem (#6141, #6142, security issues)
- **@OmkumarSolanki** - Provider fixes (Bedrock, Anthropic temperature)

---

## 🐛 Ổn định & Bugs

### ⚠️ Critical issues đang xử lý:

**#6118** - Windows setup.bat failures ✅ FIXED
- 32-bit integer overflow
- Character escaping issues
- Label resolution bugs
- **Status:** Đã fix trong #6137

**#5803** - Fallback providers ignore config (P1) 🔄 IN PROGRESS
- **Severity:** S1 - workflow blocked
- **Root cause:** `create_resilient_provider_with_options` chỉ đọc env vars
- **Fix:** PR #6138 đang review

**#6147** - Anthropic native API có thể reject Opus 4.7 như Bedrock
- **Liên quan:** #6144 (Bedrock đã fix)
- **Cần verify:** Native Anthropic API có permissive hơn không?
- **Severity:** S2 (có thể lên S1 nếu confirm)

### 🔧 Technical debt:

**#6108** - 5 tests fail trên master branch
- Các test đã broken trước khi PR mới merge
- Đang được fix để unblock CI

**#6098** - Dead code: duplicate `tracker.rs` trong zeroclaw-runtime
- 566 lines orphan code không được compile
- Đã cleanup

---

## ✨ Yêu cầu tính năng

### 🆕 Tính năng mới được đề xuất:

**#6150** - Fast memory clear command
- **Mục tiêu:** `/clear` native cho Telegram/Discord
- **Lý do:** UX hiện tại quá phức tạp cho việc clear context
- **Priority:** User experience improvement

**#6145** - Recover chat từ memory trong Web UI
- **Đề xuất:** Click vào memory table để jump vào old chats
- **Use case:** Tiếp tục conversation cũ
- **Feasibility:** Cần verify technical possibility

**#6140** - Hybrid skills (markdown + WASM tools)
- **Concept:** Single plugin bundle với cả SKILL.md và .wasm binary
- **Benefit:** Orchestration instructions + executable tools
- **Status:** Planned sau khi #6141 merge

### 🔐 Security enhancements:

**#5919** - `zc_env_read` allowlist cho plugins
- **Vấn đề:** Plugin với `env_read` permission có thể đọc BẤT KỲ env var nào
- **Đề xuất:** Allowlist mechanism để restrict access
- **Status:** In progress

**#5918** - SSRF protection cho `zc_http_request`
- **Risk:** Plugin có thể reach internal networks, cloud metadata endpoints
- **Cần:** Domain allowlist, IP range restriction
- **Status:** In progress

---

## 💭 Phản hồi người dùng

### 😤 Pain points:

1. **Windows experience** - Setup script có nhiều bugs nghiêm trọng (đã fix)
2. **Config documentation** - Examples outdated, keys không match binary (#6149)
3. **Provider fallback** - Config bị ignore, chỉ dùng được env vars (#5803)
4. **Memory management** - Không có cách nhanh để clear context từ chat channels

### 😊 Positive signals:

1. **Plugin ecosystem** - Đang được xây dựng methodically với security-first approach
2. **Multi-provider support** - Đang được improve (Bedrock, Anthropic fixes)
3. **Community engagement** - Nhiều contributors active, hackathon projects xuất hiện
4. **Documentation** - Đang được przepisane và cập nhật tích cực

---

## 🗺️ Backlog & Roadmap

### 📋 Đang trong pipeline:

**Plugin ecosystem (Phase 2):**
- ✅ WASM runtime với 4 capabilities (tool, channel, memory, observer)
- ✅ Skill capability cho markdown-only plugins (#6141)
- 🔄 Universal skill registry (#6143)
- 📅 Hybrid skills (markdown + WASM) (#6140)
- 📅 Security hardening (env allowlist #5919, SSRF protection #5918)

**Provider stability:**
- 🔄 Fallback config support (#6138)
- 🔄 Reasoning content capture (#6107)
- ❓ Anthropic native API verification (#6147)

**Platform support:**
- ✅ Windows setup fixes (#6137)
- 🔄 Windows docs rewrite (#6102)
- 🔄 Matrix channel rewrite (#6112)

**Developer experience:**
- 🔄 Test suite stabilization (#6108)
- 🔄 Config documentation updates (#6149)
- 📅 Binary size optimization (#5873 - 35MB → 15MB target)

### 🎯 Xu hướng phát triển:

1. **Mở rộng ecosystem** - Focus vào plugin architecture và skill registries
2. **Cross-platform polish** - Đặc biệt Windows experience
3. **Provider reliability** - Cải thiện fallback mechanism và config handling
4. **Security hardening** - Tăng cường isolation cho plugin system
5. **IoT/Hardware** - Demo ESP32 cho thấy hướng mở rộng mới

---

## 📊 Metrics tổng quan:

- **PRs active:** 50 (30 open, 20 closed trong 24h)
- **Issues active:** 17 (13 open, 4 closed)
- **Contributors active:** ~15 người
- **Severity breakdown:** 3 S1 (workflow blocked), 4 S2 (degraded), 1 S3 (minor)
- **Risk profile:** 3 high-risk PRs, 5 medium-risk PRs đang review

**Tốc độ phát triển:** 🔥 Rất cao - merge velocity tốt, nhiều tính năng mới đang được ship song song.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích PicoClaw - Ngày 27/04/2026

## 🎯 Tóm tắt hôm nay

Hôm nay PicoClaw có hoạt động phát triển khá sôi động với **11 PRs** đang được xử lý và **1 nightly build** mới được phát hành. Trọng tâm chính là cải thiện trải nghiệm cấu hình, tích hợp tool calls có cấu trúc vào web chat, và sửa các lỗi liên quan đến OAuth ChatGPT và Gemini function calling. Đáng chú ý là có nhiều PR về refactoring hạ tầng (runtime events, message handling) cho thấy dự án đang củng cố nền tảng kỹ thuật.

---

## 🚀 Releases

### **v0.2.7-nightly.20260427.39dec354**
- Build tự động hàng đêm, có thể không ổn định
- Tích hợp các thay đổi mới nhất từ nhánh main
- ⚠️ Khuyến cáo: Sử dụng thận trọng trong môi trường production

---

## 📈 Tiến độ dự án

### **PRs Quan trọng đang hoạt động:**

#### 🔧 **Cải thiện UX & Cấu hình**
- **#2663** - Cải thiện feedback khi lưu config và restart
  - Giải quyết vấn đề người dùng không biết config đã được lưu hay chưa
  - Sửa lỗi `showThoughtsAtom` bị duplicate gây lỗi build frontend
  
- **#2682** - Sửa format cấu hình `agents.defaults.model` trong docs
  - Đổi từ format object (`primary` + `fallbacks`) sang flat format đúng
  - Quan trọng để tránh nhầm lẫn cho người dùng mới

#### 🛠️ **Tool & Agent Enhancement**
- **#2680** - Thống nhất xử lý message kind cho `tool_calls` và `thought`
  - Breaking change có chủ đích ở frontend
  - Chuẩn hóa protocol shape: `payload.kind = "thought"`
  
- **#2672** [CLOSED] - Thêm structured tool call support vào web chat
  - Hiển thị chi tiết tool calls dưới dạng collapsible blocks
  - Cải thiện đáng kể UX khi theo dõi agent reasoning

- **#2670** - Thêm options `pretty_print` và `disable_escape_html` cho tool feedback
  - Sửa vấn đề '&&' hiển thị thành '\u0026'
  - Cho phép format JSON đẹp hơn trong output

- **#2673** - Thêm cross-platform serial tool support
  - Hỗ trợ Linux, macOS, Windows
  - Mở rộng khả năng tương tác với hardware

#### 🐛 **Bug Fixes Quan trọng**
- **#2679** - Sửa ChatGPT OAuth subscription
  - Luôn dùng `chatgpt.com/backend-api/codex` cho OAuth
  - Xử lý `response.output_text.delta` streaming
  - Giải quyết vấn đề empty responses

- **#2681** - Sanitize MCP tool schemas cho Gemini function calling
  - Sửa crash HTTP 400 khi dùng Gemini với MCP tools phức tạp
  - Normalize JSON schemas để tương thích với Gemini

- **#2415** [CLOSED] - Cải thiện diagnostics cho malformed config
  - Hiển thị chính xác line/column của lỗi JSON
  - Preview source code với caret chỉ vị trí lỗi

#### 🏗️ **Infrastructure Refactoring**
- **#2677** - Unified runtime event infrastructure
  - Tạo `pkg/events` package mới
  - Migrate agent observability lên hệ thống event mới
  - Nền tảng cho monitoring và debugging tốt hơn

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues được quan tâm:**

1. **#2674** (👍 1) - Codex OAuth: empty assistant response
   - Vấn đề khi dùng ChatGPT backend với OAuth
   - Đã có PR #2679 để fix

2. **#2676** - Yêu cầu thêm Exa search provider
   - Người dùng hỏi về PR #997 cũ đã bị đóng
   - Cộng đồng quan tâm đến việc mở rộng search providers

3. **#2675** - Hỗ trợ Raspberry Pi và Pi Zero 2W
   - Yêu cầu instructions và support cho ARM devices
   - Phản ánh nhu cầu chạy PicoClaw trên edge devices

---

## 🐞 Ổn định & Bugs

### **Đang được xử lý:**

- ✅ **ChatGPT OAuth empty responses** - Đã có fix trong PR #2679
- ✅ **Gemini + MCP crash** - Đã có fix trong PR #2681  
- ✅ **Config diagnostics không rõ ràng** - Đã merge PR #2415

### **Vẫn mở:**

- ⚠️ **#1042** - `exec` tool's `guardCommand` method quá strict
  - Block cả commands không liên quan đến file path (vd: `curl wttr.in/Beijing`)
  - Regex match sai dẫn đến false positive
  - Cần refactor logic kiểm tra path

- ⚠️ **#2628** [CLOSED] - Không tắt được "Think" và "reasoning" response trong v0.2.7
  - Có thể liên quan đến PR #2680 về message kind handling

---

## 💡 Yêu cầu tính năng

### **Đang được thảo luận:**

1. **#295** - Intelligent Model Routing (10 comments)
   - Priority: Medium | Roadmap item
   - Tự động route requests đến model phù hợp dựa trên độ phức tạp
   - Tối ưu cost và performance
   - Đây là feature quan trọng cho production usage

2. **#2676** - Exa search provider
   - Mở rộng khả năng search
   - Đã có implementation cũ (PR #997) nhưng bị đóng

3. **#2675** - Raspberry Pi support
   - Hỗ trợ ARM architecture
   - Instructions cho embedded deployment

---

## 💬 Phản hồi người dùng

### **Tích cực:**
- Cộng đồng đánh giá cao việc cải thiện UX (config feedback, tool calls visualization)
- Nhiều contributors tham gia fix bugs và improve features

### **Vấn đề cần chú ý:**
- Một số breaking changes (như #2680) có thể gây khó khăn cho users hiện tại
- Documentation cần được cập nhật kịp thời (như #2682)
- Vấn đề về `exec` tool (#1042) đã tồn tại từ 04/03 chưa được giải quyết

---

## 🗺️ Backlog & Roadmap

### **Ưu tiên cao:**
- 🎯 **Model Routing** (#295) - Tối ưu cost/performance
- 🔧 **Exec tool safety** (#1042) - Cần refactor urgently
- 📱 **ARM/Raspberry Pi support** (#2675) - Mở rộng platform

### **Xu hướng phát triển:**
- **Infrastructure consolidation**: Runtime events, unified message handling
- **Better observability**: Improved diagnostics, structured logging
- **Cross-platform expansion**: Serial tools, ARM support
- **Provider ecosystem**: More search providers, better OAuth handling
- **UX polish**: Config feedback, tool visualization, better error messages

### **Technical debt đang được giải quyết:**
- Chuẩn hóa message protocols
- Refactor event system
- Improve schema validation cho different providers

---

## 📊 Thống kê nhanh

- **PRs mở**: 10 (1 closed hôm nay)
- **Issues mở**: 5 (1 closed hôm nay)
- **Contributors hoạt động**: ~10 người
- **Nightly builds**: Đều đặn hàng ngày
- **Tương tác cộng đồng**: Trung bình (1-10 comments/issue)

**Kết luận**: PicoClaw đang trong giai đoạn phát triển ổn định với focus vào quality improvements và infrastructure refactoring. Cộng đồng tích cực nhưng cần chú ý giải quyết các bugs tồn đọng và cải thiện documentation.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo phân tích NanoClaw - 27/04/2026

## 📊 Tóm tắt hôm nay

NanoClaw đang trong giai đoạn chuyển đổi kiến trúc lớn từ v1 sang v2 với 23 PRs hoạt động tích cực. Trọng tâm là hoàn thiện setup flow, sửa lỗi routing/threading cho multi-agent, và tăng cường bảo mật. Đáng chú ý là việc đóng issue #1 (tạo agent từ web UI) và các cải tiến về container resource management.

## 🚀 Tiến độ dự án

### **Kiến trúc v2 - Chuyển đổi lớn**

- **#1989** [CLOSED]: Hoàn tất nâng cấp fork lên v2 architecture
  - Thay đổi lớn: session-per-channel → session-per-message model
  - Loại bỏ phụ thuộc OneCLI proxy, agent containers tự quản lý credentials
  - Ảnh hưởng: Cần refactor toàn bộ deploy-lan và Telegram integration

### **Setup & Onboarding - Cải thiện trải nghiệm người dùng**

- **#2035** [CLOSED]: Advanced settings registry với remote OneCLI support
  - Thống nhất config qua CLI flags và interactive prompts
  - Cho phép kết nối OneCLI gateway từ xa thay vì cài local
  - Giải quyết vấn đề PATH propagation (#1973)

- **#2030** [CLOSED]: Thêm tùy chọn remote OneCLI trong setup wizard
  - 3 options: local install, remote gateway, hoặc custom endpoint

- **#2021** [OPEN]: Fix apt-get hanging trên Linux fresh installs
  - Thêm `DEBIAN_FRONTEND=noninteractive` để tránh interactive prompts
  - Critical cho automated deployments

### **Multi-Agent Routing - Sửa lỗi nghiêm trọng**

- **#2002** [OPEN]: Origin-session threading cho agent-to-agent replies
  - **Bug**: Replies từ agent A → agent B có thể đến sai session khi B có nhiều active sessions
  - **Root cause**: Routing chỉ dựa vào `agent_group_id`, không track origin session
  - **Solution**: Thêm `origin_session_id` vào message metadata

- **#2034** [OPEN]: `findSessionByAgentGroup` ưu tiên session active gần nhất
  - Thay đổi từ `created_at DESC` → `last_activity_at DESC`
  - Giảm risk routing đến stale sessions

### **Container Stability - Tăng độ tin cậy**

- **#2031** [CLOSED]: Giữ heartbeat fresh trong tool calls + nới ceiling
  - **Incident**: Container bị kill sau 30 phút khi MCP call bị hang
  - **Fix**: Emit heartbeat events trong tool execution, tăng timeout lên 45 phút

- **#2029** [OPEN]: Thêm container resource limits
  - Đề xuất: `--memory`, `--cpus`, `--pids-limit` configurable
  - Ngăn chặn runaway agents làm crash host

- **#2028** [CLOSED]: Build `allowedTools` dynamically từ MCP servers
  - **Bug**: Claude Code 2.1.116+ treat allowedTools như hard whitelist
  - Static list chỉ có `mcp__nanoclaw__*` → các MCP servers khác bị silent

### **Web UI - Milestone quan trọng**

- **#2037** [CLOSED]: New-agent wizard - tạo agent groups end-to-end
  - **Closes #1**: Giờ có thể tạo agents từ web UI mà không cần Claude Code
  - Thêm `create-agent.ts` integration shim
  - Load-bearing piece cho "work easily end-to-end"

### **Security Hardening**

- **#2022** [OPEN]: Harden channel installer remote trust boundary
  - Channel installers fetch code từ git branches → security risk
  - Đề xuất: Trusted remote resolver, checksum validation
  - Critical cho production deployments

## 🔧 Ổn định & Bugs

### **Đã sửa trong 24h**

1. **Container freezing on MCP calls** (#2031) - Critical stability fix
2. **MCP servers bị silent** (#2028) - Ảnh hưởng tất cả custom MCP integrations
3. **Wrong session routing** (#2002, #2034) - Multi-agent communication broken
4. **Setup hanging on Linux** (#2021) - Blocking new user onboarding

### **Đang xử lý**

1. **#1973**: `onecli not found` trên fresh Linux installs - PATH issue
2. **#2026**: OneCLI install fails - onecli.dev returning 521 (infrastructure issue)
3. **#2025**: Setup appears to hang khi sudo cần password
4. **#2032**: Scheduled tasks bypass wakeAgent gating trong follow-up polling

## ✨ Yêu cầu tính năng

### **Đã implement**

- **#2036** [OPEN]: Per-group environment variables trong ContainerConfig
  - Cho phép mỗi agent group có env vars riêng
  - Use case: Different API keys, custom configs per group

- **#2027** [OPEN]: Host-actions container skill
  - Dạy agents nhận diện requests cần host-side action
  - Route đến đúng host skill (channel/group management, mounts, credentials)

- **#2024** [CLOSED]: Bypass Discord bot filter cho specific bot IDs
  - `DISCORD_ALLOWED_BOT_IDS` env var
  - Use case: RSS bots (Feedcord) trong thread_per_message channels

### **Đang chờ review**

- **#1624** [OPEN]: Matrix E2EE channel + per-group model/effort config
  - Full Matrix support với end-to-end encryption
  - Per-group model selection và effort configuration
  - MCP skill integrations suite

- **#515** [CLOSED]: Perplexity-research skill
  - Access Perplexity sonar models cho web research với citations

- **#547** [CLOSED]: Shabbat mode 🕯️
  - Bot goes dark từ sunset Friday → motzei Shabbat
  - Unique feature cho kosher automation

### **Từ cộng đồng**

- **#1930** [OPEN]: Hỗ trợ models khác và third-party API channels
  - Request: Mở rộng hơn ngoài Anthropic
  - Tăng tính practical và open của platform

## 👥 Phản hồi người dùng

### **Pain points chính**

1. **Setup complexity**: Nhiều issues về installation failures (#1973, #2025, #2026)
   - Linux fresh installs đặc biệt problematic
   - OneCLI dependency tạo friction

2. **Multi-agent routing**: Bugs trong agent-to-agent communication (#2002)
   - Ảnh hưởng use cases phức tạp với nhiều agents

3. **Container stability**: Freezing và resource exhaustion (#2031, #2029)
   - Production deployments cần resource limits

### **Positive signals**

- Web UI milestone (#2037) - Major UX improvement
- Active security hardening (#2022) - Team coi trọng production readiness
- Responsive bug fixes - 13 PRs merged trong 24h

## 🗺️ Backlog & Roadmap

### **Immediate priorities (đang active)**

1. **v1 → v2 migration tooling** (#1931)
   - Automated port: agents, groups, wirings, env keys
   - Critical cho existing v1 users

2. **Pre-flight credential validation** (#1290)
   - Fail fast khi thiếu credentials
   - Tránh partial state trong data volume

3. **Matrix E2EE integration** (#1624)
   - Expanding messaging platform support
   - Enterprise use case với E2EE requirement

### **Technical debt**

- **Rename NanoClaw → Argus** (#1738) - 942 substitutions across 100 files
  - Branding change, đang pending merge

### **Infrastructure improvements needed**

- Container resource limits (#2029) - Prevent runaway agents
- Channel installer security (#2022) - Harden remote code execution
- Credential validation (#1290) - Better error handling

---

## 💡 Insights

**NanoClaw đang ở giai đoạn maturation quan trọng**: Chuyển từ proof-of-concept sang production-ready platform. Focus vào stability, security, và developer experience. V2 architecture là bước tiến lớn nhưng tạo migration challenges cho existing users. Team đang balance giữa new features và bug fixes rất tốt - 13 PRs merged trong 24h cho thấy velocity cao và responsive với community feedback.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# 📊 Báo cáo phân tích NullClaw - 27/04/2026

## 🎯 Tóm tắt hôm nay

Hoạt động dự án khá yên tĩnh với chỉ 1 issue mới được cập nhật. Không có PR hay release mới trong 24 giờ qua. Vấn đề chính đang được quan tâm là bug về hiệu năng CPU trên môi trường WSL2, cho thấy dự án đang trong giai đoạn ổn định và xử lý các vấn đề tương thích nền tảng.

## 🚀 Releases

Không có release mới trong ngày hôm nay.

## 📈 Tiến độ dự án

**Không có PR mới** - Dự án đang trong giai đoạn tạm lắng về mặt phát triển tính năng mới. Điều này có thể cho thấy:
- Team đang tập trung vào việc ổn định phiên bản hiện tại
- Đang trong chu kỳ nghỉ lễ hoặc planning cho sprint tiếp theo
- Chờ merge các PR lớn đang trong review

## 💬 Điểm nổi bật cộng đồng

Hoạt động cộng đồng khá thấp trong ngày hôm nay với chỉ 1 issue được cập nhật và không có tương tác đáng kể (0 reactions). Điều này cho thấy:
- Cộng đồng đang trong giai đoạn sử dụng ổn định
- Vấn đề được báo cáo khá cụ thể và kỹ thuật, chưa ảnh hưởng rộng rãi

## 🐛 Ổn định & Bugs

### Issue #870: Gateway accept4 busy loop (100% CPU) trên WSL2

**Mức độ nghiêm trọng:** 🔴 Cao

**Chi tiết kỹ thuật:**
- **Triệu chứng:** Thread của `nullclaw gateway` tiêu thụ 100% CPU liên tục ngay cả khi idle
- **Môi trường:** WSL2 (Windows 11, Linux x86_64)
- **Phiên bản:** 2026.4.17
- **Trạng thái chức năng:** Gateway vẫn hoạt động bình thường (Telegram bot phản hồi), nhưng hiệu năng bị ảnh hưởng nghiêm trọng

**Phân tích:**
- Đây là vấn đề về busy loop trong system call `accept4`, thường xảy ra khi:
  - Socket được set non-blocking mode không đúng cách
  - Event loop không có sleep/wait mechanism hợp lý
  - Polling mechanism không tối ưu trên WSL2
- Vấn đề đặc thù với WSL2 cho thấy có thể liên quan đến sự khác biệt trong cách WSL2 xử lý system calls so với Linux native
- Cần kiểm tra implementation của network listener và event loop

**Tác động:**
- Ảnh hưởng đến trải nghiệm người dùng Windows (WSL2 là môi trường phổ biến cho dev trên Windows)
- Tiêu tốn tài nguyên không cần thiết
- Có thể gây nóng máy và giảm tuổi thọ phần cứng

## 🎨 Yêu cầu tính năng

Không có feature request mới trong ngày hôm nay.

## 👥 Phản hồi người dùng

**Người dùng @weissfl** đã báo cáo vấn đề CPU usage trên WSL2 với thông tin chi tiết:
- Cung cấp đầy đủ thông tin môi trường
- Xác nhận gateway vẫn functional
- Đã có 1 comment phản hồi (nội dung chưa được cung cấp)

Chất lượng bug report tốt, cho thấy cộng đồng có kỹ năng kỹ thuật và ý thức đóng góp.

## 🗺️ Backlog & Roadmap

Dựa trên dữ liệu hiện tại, không có thông tin rõ ràng về roadmap. Tuy nhiên, ưu tiên ngắn hạn có thể là:

1. **Khẩn cấp:** Fix CPU busy loop trên WSL2 (#870)
2. **Tối ưu hóa:** Review và cải thiện performance của gateway component
3. **Testing:** Tăng cường test coverage cho các môi trường khác nhau (WSL2, native Linux, macOS)

---

**📌 Kết luận:** Ngày khá yên tĩnh với focus vào stability. Issue #870 cần được ưu tiên xử lý để đảm bảo trải nghiệm tốt cho người dùng Windows/WSL2.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo phân tích IronClaw - 27/04/2026

## 🎯 Tóm tắt hôm nay

Dự án IronClaw đang trong giai đoạn bảo trì và cải tiến tích cực với 13 PR đang mở và 4 issue mới. Hoạt động chính tập trung vào việc nâng cấp dependencies (wasmtime 44.0, tokio 1.52.1), sửa lỗi OAuth cho MCP servers, và cải thiện trải nghiệm TUI. Đáng chú ý là có 3 issue về live canary failures cho các provider chính (OpenAI, Anthropic), cho thấy hệ thống CI/CD đang phát hiện vấn đề tiềm ẩn.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### Các PR quan trọng đang được xử lý:

**🔐 Bảo mật & Kiểm toán**
- **#2684** - Tích hợp `signet-core` cho audit log mật mã: Đây là một bước tiến lớn về bảo mật, sử dụng Ed25519 để ký mỗi tool call và tạo hash-chained audit log. Không cần thay đổi DB schema, audit chain được lưu trong JSONL files.

**🐛 Sửa lỗi quan trọng**
- **#2961** - Sửa lỗi `api_key_required` cho self-hosted OpenAI compatible: Giải quyết vấn đề các setup tự host (vLLM, LiteLLM) bị chuyển về NearAI khi không có API key
- **#2960** - Sửa lỗi OAuth discovery cho MCP stdio/unix transports: Khắc phục lỗi "Invalid URL: relative URL without a base" khi kích hoạt MCP server qua stdio
- **#1941** - Tăng cường bảo mật MCP server names: Chuyển từ blocklist sang allowlist để ngăn shell injection

**🎨 Cải thiện UX**
- **#2974** - Cải thiện contrast TUI và process cleanup: Tối ưu theme cho dark mode, tăng contrast cho light theme, và tự động cleanup orphaned processes

**📦 Cập nhật Dependencies**
- **#2973** - Bump 39 packages trong everything-else group
- **#2972** - Nâng cấp wasmtime lên 44.0.0 (từ 43.0.1)
- **#2971** - Nâng cấp tokio ecosystem (tokio 1.52.1, tokio-tungstenite 0.28.0)
- **#2593** - Bump 14 GitHub Actions

**🌐 Tính năng mới**
- **#2394** - WeChat Enterprise (WeCom) channel: Đang WIP, thêm standalone WASM channel cho WeChat doanh nghiệp
- **#1120** - Prismer Cloud IM channel: Hỗ trợ dual mode (webhook + polling), two-step auth

**🏗️ Infrastructure**
- **#2970** - Build Railway từ source: Loại bỏ dependency vào GHCR visibility
- **#2969** - Clean up runtime authority boundaries (đã đóng): Cải thiện process resource management

### Xu hướng phát triển:

1. **Mở rộng channels**: Tích cực thêm các kênh IM mới (WeChat Enterprise, Prismer)
2. **Tăng cường bảo mật**: Focus vào audit logging và input validation
3. **Cải thiện developer experience**: Sửa lỗi self-hosted setups, TUI improvements
4. **Modernization**: Cập nhật dependencies liên tục để theo kịp ecosystem

## 🌟 Điểm nổi bật cộng đồng

**Contributor mới tích cực**:
- @Cloudymap1e đóng góp PR cải thiện TUI (#2974)
- @drchirag1991 cải thiện Railway build process (#2970)

**Contributor thường xuyên**:
- @willamhou rất năng suất với 5 PR đang mở, tập trung vào MCP fixes và security improvements
- @hanakannzashi đang phát triển WeChat Enterprise channel

**Vấn đề được quan tâm**:
- Self-hosted OpenAI compatible setups (#2961) - ảnh hưởng đến users chạy vLLM/LiteLLM
- MCP OAuth issues (#2960) - blocking việc sử dụng stdio MCP servers

## 🔧 Ổn định & Bugs

### ⚠️ Vấn đề nghiêm trọng:

**Live Canary Failures** (3 issues mới):
- **#2968** - OpenAI compatible provider failed
- **#2967** - Anthropic provider failed  
- **#2966** - Private OAuth lane failed

Cả 3 đều từ cùng một commit (7404e7d) và CI run, cho thấy có thể có regression trong code gần đây. Chưa có bình luận hay activity nào để xử lý.

### 🐛 Bugs đang được sửa:

- **MCP OAuth discovery** (#2960): Đã có fix, đang review
- **API key validation** (#2961): Đã có fix, đang review
- **MCP server name injection** (#1941): Đã có fix từ lâu, đang chờ merge
- **TUI contrast & process cleanup** (#2974): Fresh PR, đang review

## 💡 Yêu cầu tính năng

**#2965 - Aurora DSQL support**: 
- User @jousby đề xuất tách core database và vector DB để hỗ trợ Aurora DSQL (postgres scale-to-zero)
- Động lực: Giảm chi phí monthly cho agents không cần vector search
- Aurora DSQL không hỗ trợ pgvector extension
- Đây là feature request hợp lý cho cost optimization

**Channels mới đang phát triển**:
- WeChat Enterprise (#2394) - cho thị trường doanh nghiệp Trung Quốc
- Prismer Cloud IM (#1120) - mở rộng ecosystem IM

## 👥 Phản hồi người dùng

**Pain points được phản ánh qua PRs**:

1. **Self-hosted setups bị override** (#2961): Users frustration khi config bị ghi đè mỗi lần restart
2. **MCP stdio không hoạt động** (#2960): Blocking use case phổ biến
3. **TUI khó đọc** (#2974): Dark mode contrast issues
4. **Cost concerns** (#2965): Monthly costs cho agents đơn giản quá cao

**Positive signals**:
- Community contributions tăng (3 new contributors trong batch này)
- Active maintenance với dependency updates thường xuyên
- Security-first approach với signing và validation improvements

## 🗺️ Backlog & Roadmap

### Priorities rõ ràng từ PR labels:

**High priority** (risk: high):
- WeChat Enterprise channel (#2394) - WIP, scope lớn

**Medium priority**:
- Cryptographic audit logging (#2684) - security enhancement
- Database architecture refactoring (#2965) - cost optimization
- Prismer channel (#1120) - ecosystem expansion

**Maintenance**:
- Dependency updates (multiple PRs) - ongoing
- Bug fixes cho MCP và provider issues

### Roadmap insights:

Dự án đang cân bằng giữa:
1. **Stability**: Sửa bugs, update dependencies, improve CI
2. **Security**: Audit logging, input validation
3. **Growth**: New channels (WeChat, Prismer), database flexibility
4. **DX**: TUI improvements, self-hosted support

Không có roadmap công khai rõ ràng, nhưng pattern cho thấy focus vào enterprise readiness (WeChat Enterprise, audit logs) và cost optimization (Aurora DSQL).

---

**🔍 Đánh giá tổng quan**: IronClaw đang trong giai đoạn trưởng thành với focus vào stability, security và enterprise features. Canary failures cần được ưu tiên xử lý ngay. Community engagement tích cực là dấu hiệu tốt cho sức khỏe dự án.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo phân tích LobsterAI - Ngày 27/04/2026

## 🎯 Tóm tắt hôm nay

Hôm nay không có hoạt động phát triển mới (không có PR hay release). Tuy nhiên, hệ thống tự động đã đánh dấu 4 issues cũ là "stale" do không có hoạt động trong thời gian dài. Điều này cho thấy dự án đang trong giai đoạn ít hoạt động, với các vấn đề kỹ thuật quan trọng chưa được giải quyết từ tháng 2/2026.

## 📦 Releases

Không có release mới trong 24 giờ qua.

## 🚀 Tiến độ dự án

**Tình trạng**: Dự án đang trong giai đoạn trầm lắng
- ❌ Không có PR mới được tạo hoặc merge
- ⚠️ 4 issues cũ được đánh dấu "stale" (không hoạt động >60 ngày)
- 📉 Xu hướng: Thiếu sự tương tác từ maintainers với các vấn đề người dùng báo cáo

## 💬 Điểm nổi bật cộng đồng

**Issue được quan tâm nhất**: #88 - Yêu cầu thêm token statistics và logging
- 👍 3 reactions - cao nhất trong các issue hiện tại
- Phản ánh nhu cầu thực tế của người dùng về khả năng debug và giám sát chi phí

**Các vấn đề khác**:
- Issues còn lại có 0 reactions, cho thấy cộng đồng chưa thực sự tích cực

## 🐛 Ổn định & Bugs

### Vấn đề nghiêm trọng cần xử lý:

**#60 - Context length exceeded (DeepSeek)**
- 🔴 Mức độ: Cao
- Vấn đề: Model yêu cầu 141,403 tokens nhưng giới hạn chỉ 131,072 tokens
- Nguyên nhân: Thiếu cơ chế quản lý context window
- Ảnh hưởng: Người dùng không thể xử lý conversations dài

**#40 - Windows installation path issue**
- 🟡 Mức độ: Trung bình
- Vấn đề: Cài đặt vào D:\ nhưng agent tìm SKILLs ở C:\
- Nguyên nhân: Hard-coded path hoặc thiếu config cho working directory
- Ảnh hưởng: Trải nghiệm người dùng Windows kém

**#52 - WeChat article access blocked**
- 🟡 Mức độ: Trung bình
- Vấn đề: Không thể truy cập bài viết từ WeChat Official Account
- Nguyên nhân: Có thể do anti-scraping mechanism của WeChat
- Ảnh hưởng: Giới hạn khả năng thu thập thông tin

## ✨ Yêu cầu tính năng

**#88 - Token usage statistics & logging dashboard**
- 📊 Tính năng: Dashboard hiển thị token usage
- 📝 Logging: Hệ thống log chi tiết để debug
- Lý do: Người dùng sử dụng custom API gặp khó khăn trong việc troubleshoot
- Giá trị: Tăng transparency và khả năng kiểm soát chi phí

## 👥 Phản hồi người dùng

**Sentiment tổng quan**: ⚠️ Tiêu cực - Thất vọng

**Các điểm chính**:
- 😞 Người dùng gặp blocking issues nhưng không nhận được phản hồi từ team
- 🔧 Thiếu công cụ debug khiến việc tự troubleshoot khó khăn
- 🪟 Trải nghiệm trên Windows chưa được polish
- 🇨🇳 Các vấn đề liên quan đến ecosystem Trung Quốc (WeChat, DeepSeek) chưa được ưu tiên

## 📋 Backlog & Roadmap

**Ưu tiên cao** (cần xử lý ngay):
1. ⚡ Implement context window management cho các LLM models
2. 🔧 Fix Windows path configuration issue
3. 📊 Thêm logging và monitoring system

**Ưu tiên trung bình**:
4. 🌐 Cải thiện web scraping capabilities (WeChat support)
5. 📚 Cập nhật documentation về troubleshooting

**Khuyến nghị**:
- 🚨 Team cần tăng cường tương tác với community
- 🔄 Thiết lập quy trình triage issues định kỳ
- 📢 Communicate roadmap rõ ràng hơn để giữ chân users

---

**Kết luận**: LobsterAI đang trong giai đoạn maintenance mode với nhiều technical debt chưa được giải quyết. Cần có sự đầu tư trở lại từ maintainers để duy trì niềm tin của cộng đồng.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo phân tích dự án Moltis - Ngày 27/04/2026

## 🎯 Tóm tắt hôm nay

Ngày 27/04 đánh dấu một đợt sửa lỗi và cải tiến bảo mật mạnh mẽ cho Moltis với **13 PRs** (10 đã merge) và **6 issues** (4 đã đóng). Trọng tâm là xử lý các lỗ hổng bảo mật nghiêm trọng (API keys lưu plaintext), sửa lỗi skill import, và cải thiện UX với file upload và quản lý model tự động. Đây là một ngày làm việc cực kỳ hiệu quả với tốc độ xử lý issue/PR ấn tượng.

---

## 🚀 Releases

### **20260426.05** (Phát hành: 26/04/2026)

Release này tập trung vào **bảo mật và ổn định**:

- **Bảo mật nâng cao**: Di chuyển API keys từ plaintext config sang credential store được mã hóa
- **Quản lý skill an toàn hơn**: Loại bỏ auto-enable skills khi import repository
- **Cải thiện hiệu suất**: Tự động unload local LLM models khi idle để tiết kiệm RAM
- **UX tốt hơn**: Chat status badges hiển thị trực tiếp, không còn ẩn trong modal

Đây là một **security-focused release** quan trọng, giải quyết các vấn đề nghiêm trọng được phát hiện bởi cộng đồng.

---

## 📈 Tiến độ dự án

### **Merged PRs quan trọng (10/13)**

#### 🔒 **Bảo mật** (Ưu tiên cao)
- **#885**: Lưu trữ voice API keys trong credential store thay vì `moltis.toml` plaintext
  - Thêm vault encryption cho `provider_keys.json`
  - Async vault-aware read/write operations
  - **Impact**: Giải quyết lỗ hổng bảo mật nghiêm trọng #867

- **#882**: Ngừng auto-enable tất cả skills khi import repository
  - Loại bỏ `autoTrust` parameter
  - Giữ skills ở trạng thái quarantine để user review
  - **Impact**: Ngăn chặn malicious skills bypass security (#881)

#### 🛠️ **Bug Fixes**
- **#883**: Sửa lỗi skill import từ marketplace repos
  - Lưu đúng `relative_path` cho từng skill
  - Fix "No such file or directory" error (#880)

- **#878 + #877**: Sửa lỗi không thể disable bundled skills qua Web UI
  - Derive enabled state từ config thay vì hardcode
  - Handle bundled skills qua `disabled_bundled_categories` (#875)

- **#879**: Sửa code snippets background chuyển sang trắng sau khi stream xong
  - Fix Shiki highlight CSS conflict

#### ✨ **Tính năng mới**
- **#884**: On-demand model loading/unloading với idle timeout
  - Tự động unload models khi không dùng để free RAM
  - Manual Load/Unload RPC methods
  - WebSocket events cho model state changes
  - **Impact**: Cải thiện đáng kể memory management

- **#886**: Hiển thị chat status badges trực tiếp trên toolbar
  - Di chuyển sandbox, MCP, Debug badges ra khỏi modal ẩn
  - UX trực quan hơn

### **Open PRs đáng chú ý**

- **#891**: Make Telegram channel optional (đang review)
  - Giảm binary size và build time
  - Follow pattern của các optional channels khác

- **#876**: File upload button cho web chat (đang review)
  - Cho phép attach files vào messages
  - Match UX pattern của major LLM providers

- **#339**: Traditional Chinese (zh-TW) locale support (đang review từ 05/03)
  - Full i18n support cho Taiwan market

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues được quan tâm**

1. **#888** (OPEN): Session name không còn editable sau PR #886
   - **Tác động**: Regression bug ảnh hưởng UX
   - **Trạng thái**: Chưa có PR fix, cần xử lý gấp

2. **#867** (CLOSED): Voice API keys lưu plaintext - **Vấn đề bảo mật nghiêm trọng**
   - Phát hiện bởi @penso
   - Đã fix trong #885
   - **Lesson learned**: Cần security audit cho config storage

3. **#881** (CLOSED): Skill import auto-enable tất cả skills - **Security concern**
   - Phát hiện bởi @bsarkisov
   - Có thể cho phép malicious skills vào system
   - Đã fix trong #882

### **Contributor activity**

- **@penso**: Cực kỳ productive với 5 PRs (security fixes, model management, UI improvements)
- **@Cstewart-HC**: 5 PRs (optional channels, file upload, bug fixes)
- **@bsarkisov**: Phát hiện 2 security issues quan trọng
- **@faevourite**: Report bug về bundled skills

---

## 🐛 Ổn định & Bugs

### **Đã giải quyết** ✅

1. **Skill import broken** (#880) - Fixed trong #883
2. **Can't disable bundled skills** (#875) - Fixed trong #877 + #878
3. **Voice API keys plaintext** (#867) - Fixed trong #885
4. **Auto-enable malicious skills** (#881) - Fixed trong #882
5. **Code snippets background bug** - Fixed trong #879

### **Đang xử lý** ⚠️

1. **#888**: Session name không editable sau refactor
   - **Priority**: High (regression bug)
   - **Cần**: Restore session rename functionality

### **Xu hướng bugs**

- Phần lớn bugs liên quan đến **security** và **skill management**
- Tốc độ fix bugs rất nhanh (< 24h cho critical issues)
- Team có quy trình security response tốt

---

## 💡 Yêu cầu tính năng

### **Đang implement**

1. **File upload trong chat** (#876)
   - Status: PR đang review
   - Impact: Major UX improvement, match industry standard

2. **Optional Telegram channel** (#891)
   - Status: PR đang review (attempt thứ 3)
   - Impact: Giảm binary size, faster builds

3. **Traditional Chinese support** (#339)
   - Status: PR đang review từ lâu
   - Impact: Mở rộng thị trường Taiwan

### **Tính năng mới được merge**

1. **On-demand model loading/unloading** (#884)
   - Tự động quản lý RAM
   - Manual control qua RPC
   - WebSocket events

2. **Visible chat status badges** (#886)
   - Cải thiện visibility của sandbox/MCP/Debug status

---

## 💬 Phản hồi người dùng

### **Positive feedback**

- Tốc độ fix bugs rất nhanh, đặc biệt với security issues
- Team responsive với community reports
- Cải thiện UX liên tục (status badges, file upload)

### **Pain points**

1. **Session management regression** (#888)
   - Users không thể rename sessions sau update
   - Cần fix gấp

2. **Security concerns được phát hiện bởi community**
   - Plaintext API keys
   - Auto-enable malicious skills
   - → Cho thấy cần security audit toàn diện

3. **PR review bottleneck**
   - PR #339 (Chinese locale) đang pending từ 05/03
   - PR #876 (file upload) cần review

---

## 🗺️ Backlog & Roadmap

### **Immediate priorities** (Tuần tới)

1. ⚠️ **Fix session rename regression** (#888) - Critical
2. 🔍 **Security audit** - Review toàn bộ config storage và credential management
3. ✅ **Merge pending PRs**: #891 (Telegram optional), #876 (file upload)

### **Short-term** (Tháng tới)

1. **i18n expansion**: Merge #339 (zh-TW), consider more locales
2. **Memory optimization**: Monitor #884 (model unloading) performance
3. **Skill marketplace security**: Implement better sandboxing/review process

### **Patterns & Insights**

- **Security-first approach**: Team phản ứng nhanh với security reports
- **Community-driven**: Nhiều bugs được phát hiện bởi users
- **Rapid iteration**: 10 PRs merged trong 1-2 ngày
- **Technical debt**: Một số regressions do refactoring (session rename)

### **Recommendations**

1. 🔒 Thực hiện **comprehensive security audit** cho credential storage
2. 🧪 Tăng cường **regression testing** trước khi merge UI refactors
3. 📝 Cải thiện **PR review process** để giảm pending time
4. 🛡️ Xem xét **skill sandboxing framework** để prevent malicious code

---

## 📊 Metrics Summary

- **PRs merged**: 10/13 (77% merge rate)
- **Issues closed**: 4/6 (67% close rate)
- **Average time to fix critical bugs**: < 24h
- **Active contributors**: 4+ (high engagement)
- **Release cadence**: Daily (20260426.05)

**Đánh giá tổng thể**: Ngày làm việc **cực kỳ hiệu quả** với focus mạnh vào security và stability. Team đang trong giai đoạn **hardening** sau khi phát hiện nhiều security issues. Cần chú ý đến regression bugs và PR review bottleneck.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo phân tích dự án CoPaw - Ngày 27/04/2026

## 🎯 Tóm tắt hôm nay

Dự án CoPaw đang trong giai đoạn ổn định và mở rộng với 15 issues mới/cập nhật và 5 pull requests đang chờ xử lý. Hoạt động chính tập trung vào việc sửa lỗi giao thức kênh (XiaoYi, QQ), cải thiện trải nghiệm người dùng (UI freezing, session management), và mở rộng hỗ trợ nhà cung cấp model mới (GitHub Copilot). Cộng đồng đang phản ánh nhiều vấn đề về tính ổn định của hệ thống trong môi trường production.

## 🚀 Releases

Không có release chính thức nào trong 24 giờ qua. Phiên bản hiện tại đang được sử dụng là **v1.1.4.post2**.

## 📈 Tiến độ dự án

### Pull Requests đáng chú ý:

**🔧 Sửa lỗi & Cải thiện:**
- **#3839** - Sửa lỗi nghiêm trọng trong XiaoYi channel: Refactor toàn bộ giao thức A2A với dual WebSocket connections, thay thế heartbeat tùy chỉnh bằng PING/PONG chuẩn
- **#3848** - Tăng cường xử lý fallback cho context compaction: Ngăn chặn việc xóa lịch sử khi LLM summarization thất bại, thêm state machine an toàn hơn

**✨ Tính năng mới:**
- **#3846** - Hỗ trợ GitHub Copilot model provider (first-time contributor)
- **#3845** - Sửa lỗi audio message type trong QQ channel + thêm tính năng speech-to-text tự động
- **#3813** - Thêm hỗ trợ Tauri 2.x desktop app (thay thế Electrobun)

### Xu hướng phát triển:

📱 **Mở rộng kênh tích hợp** - Đang tích cực sửa lỗi và cải thiện các kênh hiện có (XiaoYi, QQ, Matrix)

🖥️ **Desktop app modernization** - Chuyển sang Tauri 2.x cho ứng dụng desktop

🤖 **Mở rộng model providers** - Thêm GitHub Copilot, cải thiện tương thích với các API như DeepSeek

## 🌟 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

**#3499** (5 bình luận) - Vấn đề hiệu năng: API response time không ổn định
- Người dùng báo cáo thời gian phản hồi dao động từ nhanh đến rất chậm
- Ảnh hưởng đến trải nghiệm production

**#3817** (4 bình luận) - Cấu hình vector model không được lưu sau khi restart container
- Vấn đề nghiêm trọng với Docker deployment
- Người dùng đã phân tích root cause: Logic khởi tạo ghi đè cấu hình đã lưu

### Vấn đề người dùng quan tâm nhất:

🔴 **Session management & UI stability** - Nhiều báo cáo về session history biến mất (#3843), multi-tab context switching (#3852), và UI freezing (#3853)

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đang được xử lý:

**Cấp độ cao:**
- **#3854** - ChromaDB Rust binding segfault: Crash toàn bộ process (45+ lần trong 1 session), cần fallback an toàn hơn
- **#3843** - Session history biến mất đột ngột, messages bị route sang session khác
- **#3850** - Nút pause trên Web UI chỉ dừng frontend rendering, backend agent vẫn tiếp tục thực thi

**Cấp độ trung bình:**
- **#3853** - UI freezing sau khi save model settings trên Debian (chỉ xảy ra với non-root user)
- **#3851** - MODEL_EXECUTION_FAILED với DeepSeek thinking mode do thiếu xử lý `reasoning_content`
- **#3840** - XiaoYi channel không gửi được replies do vấn đề protocol và connection

**Vấn đề cũ:**
- **#3499** - API response time không ổn định (đang điều tra)
- **#3817** - Vector model config bị reset sau restart (đã có root cause analysis)

### Pattern nhận diện:

⚠️ **Vấn đề về state management** - Nhiều bugs liên quan đến việc duy trì state giữa các sessions, tabs, và container restarts

⚠️ **Native dependencies instability** - ChromaDB Rust binding gây crash không thể handle được ở Python level

## 💡 Yêu cầu tính năng

**#3844** - Auto model listing sau khi đăng ký provider
- Hiện tại phải manually register từng model, rất bất tiện khi provider có hàng chục models
- Đề xuất: Tự động fetch và list models từ provider API

**#3856** - Đơn giản hóa source installation
- Đề xuất: Copy compiled frontend code vào source package để cài đặt từ source dễ dàng hơn

**#3847** - Sửa lỗi `qwenpaw mission` commands
- Tất cả subcommands (list/start/status) đều fail với 405 + TypeError
- Vấn đề: Double `/api` prefix trong URL construction

## 💬 Phản hồi người dùng

### Trải nghiệm tích cực:
- Cộng đồng first-time contributors tích cực (3/5 PRs từ first-time contributors)
- Người dùng chủ động phân tích root cause và đề xuất giải pháp (#3817, #3854)

### Điểm đau chính:

😤 **Production stability concerns:**
- "45+ crashes in a single session" (#3854)
- "Pause button is useless" (#3850)
- "Session history suddenly disappears" (#3843)

😤 **Configuration persistence:**
- Vector model settings không được lưu (#3817)
- Cần restart service sau mỗi lần thay đổi config (#3853)

😤 **Multi-user/multi-session issues:**
- Multi-tab không maintain độc lập context (#3852)
- Permission issues với non-root deployment (#3853)

## 📋 Backlog & Roadmap

### Ưu tiên cao (cần xử lý ngay):

1. **Stability fixes:**
   - ChromaDB segfault fallback mechanism (#3854)
   - Session state management overhaul (#3843, #3852)
   - Pause/resume functionality (#3850)

2. **Configuration persistence:**
   - Fix vector model config reset (#3817)
   - Improve settings save mechanism (#3853)

3. **Channel protocol fixes:**
   - XiaoYi A2A protocol (#3839, #3840)
   - QQ audio message handling (#3845)

### Ưu tiên trung bình:

- Auto model listing (#3844)
- DeepSeek thinking mode support (#3851)
- Mission commands fix (#3847)
- Performance optimization (#3499)

### Phát triển dài hạn:

- Desktop app migration to Tauri 2.x (#3813)
- GitHub Copilot integration (#3846)
- Source installation improvement (#3856)

---

**📊 Thống kê:** 15 issues hoạt động | 5 PRs đang chờ | 3 first-time contributors | 0 releases mới

**🎯 Đánh giá tổng quan:** Dự án đang trong giai đoạn "growth pains" - có tăng trưởng tốt về tính năng và cộng đồng, nhưng cần tập trung vào stability và production-readiness trong thời gian tới.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*