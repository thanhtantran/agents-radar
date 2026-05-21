# Bản tin Hệ sinh thái OpenClaw 2026-05-21

> Issues: 307 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-05-21 02:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [GoClaw](https://github.com/nextlevelbuilder/goclaw)
- [Hermes-Agent](https://github.com/nousresearch/hermes-agent)

---

## Phân tích sâu OpenClaw

# Báo cáo phân tích OpenClaw - 2026-05-21

## 1. 📊 Tóm tắt hôm nay

OpenClaw tiếp tục duy trì nhịp độ phát triển cao với 2 releases trong 24h (v2026.5.19 và v2026.5.20-beta.1). Trọng tâm chính là **tích hợp voice call cho Discord**, cải thiện **sandbox isolation**, và xử lý các vấn đề về **session management**. Cộng đồng đang tập trung vào các vấn đề bảo mật (masked secrets, filesystem sandboxing) và trải nghiệm đa nền tảng (Linux/Windows apps, Android APK).

---

## 2. 🚀 Releases

### **v2026.5.20-beta.1** (Beta)
- **Discord Voice Integration**: Cho phép voice sessions tự động theo user vào voice channels, hỗ trợ multi-user handoff và DAVE recovery
- **Voice Context Enhancement**: Tự động inject `IDENTITY.md`, `USER.md`, `SOUL.md` vào realtime voice instructions (có thể tắt qua config)
- **Dependencies**: Cập nhật `@openclaw/proxyline` lên 0.3.3

### **v2026.5.19** (Stable)
- **Refactoring Guidelines**: Làm rõ hướng dẫn về bounded refactors và plugin SDK deprecation
- **Node.js Requirement**: Nâng minimum Node.js 22 lên 22.19
- **Docker/Podman**: Thêm `OPENCLAW_IMAGE_APT_PACKAGES` để thay thế `OPENCLAW_DOCKER_APT_PACKAGES`

**Ý nghĩa**: Bản beta tập trung vào voice capabilities - một hướng đi chiến lược để mở rộng use cases sang customer support và interactive applications.

---

## 3. 🔧 Tiến độ dự án

### **PRs nổi bật đang mở**

#### 🎯 **High Priority (P1)**
- **#84748**: Fix `openclaw onboard` xóa mất `agents.list` và `bindings` khi chạy lại → Blocker cho production deployments
- **#84628**: Scope plugin metadata reads chỉ cho configured plugins → Cải thiện startup performance
- **#19328**: Fix race condition khiến sub-agent model overrides bị ignore (~3% failure rate)

#### 🔐 **Security & Isolation**
- **#81851**: Experimental Claude CLI interactive backend qua local TLS proxy để stream reasoning (chuẩn bị cho June 15 credit pool change)
- **#38222**: Enforce length limits cho hook-injected prompt context → Ngăn plugins chiếm hết context window
- **#37656**: Load workspace `.env` per-agent at exec time → Scoped environment variables

#### 🌐 **Multi-channel Support**
- **#36630**: Bidirectional quote-reply cho Signal (XL size, chạm 7 channels)
- **#25295**: Edit/delete message actions cho Mattermost
- **#84563**: Fix Telegram partial-stream truncation

### **Xu hướng phát triển**
1. **Voice-first features**: Discord voice integration là tín hiệu mạnh về hướng đi realtime/conversational
2. **Security hardening**: Nhiều PRs về sandboxing, secret masking, permission boundaries
3. **Multi-platform parity**: Nỗ lực đưa các tính năng lên ngang bằng giữa các channels

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác nhất**

#### 🔥 **#75** (105 comments, 75 👍) - Linux/Windows Clawdbot Apps
- **Vấn đề**: Chỉ có apps cho macOS/iOS/Android, thiếu Linux và Windows
- **Tác động**: Giới hạn adoption ở enterprise environments (nhiều công ty dùng Linux servers)
- **Trạng thái**: P2, cần maintainer review + product decision

#### 🐛 **#25592** (26 comments) - Text between tool calls leaks to messaging channels
- **Vấn đề nghiêm trọng**: Internal processing output (error handling, narration) bị gửi thành visible messages
- **Ví dụ**: `"Processing your request..."`, `"Error: retrying..."` xuất hiện trong Slack threads
- **Tác động UX**: Confusing cho end users, làm lộ internal logic
- **Trạng thái**: P1, có linked PR đang mở

#### 📱 **#9443** (24 comments) - Prebuilt Android APK releases
- **Yêu cầu**: Cung cấp APK builds trong GitHub releases thay vì chỉ source code
- **Lý do**: Không phải ai cũng có môi trường build Android
- **Trạng thái**: P2, đang chờ product decision

---

## 5. 🐞 Ổn định & Bugs

### **Critical Issues (P1)**

#### **#22676** - Signal daemon race condition on SIGUSR1 restart
- **Mô tả**: Khi restart gateway, signal-cli cũ chưa kịp tắt thì instance mới đã spawn → port conflict + orphaned processes
- **Root cause**: `stop()` không wait for process exit
- **Tác động**: Send failures, crash loops
- **Status**: Có linked PR, đang review

#### **#31331** - Docker + Sandbox workspace access broken
- **Mô tả**: Gateway trong Docker mount workspace path sai khi dùng Docker-outside-of-Docker sandboxing
- **Tác động**: `/workspace` không accessible, tools fail
- **Dedupe parent**: Có nhiều issues tương tự

### **Regression Bugs**

#### **#32473** - Control UI requires HTTPS/localhost for device identity
- **Mô tả**: Sau khi config Brave key, control UI báo lỗi secure context
- **Tác động**: Không dùng được trên VPS với HTTP
- **Votes**: 4 👍

#### **#38439** - Webchat avatar endpoint returns 404
- **Mô tả**: `/avatar/{agentId}` trả 404 dù có valid `IDENTITY.md` avatar
- **Tác động**: Broken UI, missing image icons

---

## 6. 💡 Yêu cầu tính năng

### **Security & Permissions**

#### **#10659** (12 comments, 4 👍) - Masked Secrets
- **Đề xuất**: Agent có thể *dùng* API keys nhưng không *thấy* raw values
- **Use case**: Ngăn prompt injection attacks extract credentials
- **Trạng thái**: P1, needs security review

#### **#7722** (7 comments, 4 👍) - Filesystem Sandboxing Config
- **Đề xuất**: `tools.fileAccess.allowedPaths` / `denyPaths` để restrict file operations
- **Hiện trạng**: Config tồn tại nhưng không được enforce
- **Tác động**: Security risk cho production deployments

### **Developer Experience**

#### **#22438** (16 comments) - Tiered Bootstrap File Loading
- **Vấn đề**: Bootstrap files tốn tokens cho mọi session, kể cả sub-agents không cần
- **Đề xuất**: Phân tier (always/main-only/on-demand) để kiểm soát context budget
- **Trạng thái**: Có linked PR (#22439)

#### **#14785** (6 comments) - Reduce Tool Schema Token Overhead
- **Vấn đề**: Tool schemas tốn ~3,500 tokens/session (fixed tax)
- **Đề xuất**: Lazy-load schemas, compress descriptions
- **Tác động**: Tiết kiệm context window cho actual work

### **Multi-Agent Collaboration**

#### **#35203** (7 comments) - Multi-Agent Enhancement RFC
- **Đề xuất**: 
  - Capability profiling (agents tự mô tả skills)
  - Shared blackboard (coordination state)
  - Layered memory boundaries
  - Token cost governance
- **Động lực**: Giải quyết information silos và uncontrolled token consumption

---

## 7. 👥 Phản hồi người dùng

### **Pain Points chính**

1. **Platform Coverage** (#75, #9443)
   - Linux/Windows desktop apps thiếu
   - Android APK builds không có sẵn
   - → Giới hạn adoption ở non-Mac users

2. **Sandbox Complexity** (#31331, #37634)
   - Docker-in-Docker setup phức tạp
   - Workspace mounting không intuitive
   - Read-only mounts gây tool failures

3. **Secret Management** (#10659, #13610)
   - Plaintext secrets trong config files
   - Không có native integration với Vault/AWS Secrets Manager
   - Prompt injection risk

4. **Documentation Gaps** (#13597, #16670)
   - Thiếu AWS deployment guides
   - Onboarding wizard không mention memory/embedding setup
   - → New users miss critical features

### **Positive Signals**

- **Voice integration** được đón nhận tích cực (Discord PR #84264)
- **ClawSweeper automation** đang giúp maintain code quality (nhiều automerge PRs)
- **Community contributions** tăng (nhiều first-time contributors)

---

## 8. 📋 Backlog & Roadmap

### **Immediate Priorities (từ P1 issues)**

1. **Stability Fixes**
   - Signal daemon restart race condition (#22676)
   - Docker sandbox workspace access (#31331)
   - Onboard command config preservation (#84748)

2. **Security Hardening**
   - Masked secrets implementation (#10659)
   - Filesystem sandboxing enforcement (#7722)
   - Hook-injected context length limits (#38222)

### **Strategic Initiatives (từ P2 issues & PRs)**

1. **Voice & Realtime**
   - Discord voice sessions (✅ shipped in beta)
   - Telegram Business Bot support (#20786)
   - Voice call plugin Vapi provider (#13337)

2. **Multi-Platform Expansion**
   - Linux/Windows desktop apps (#75)
   - Android APK releases (#9443)
   - AWS deployment documentation (#13597)

3. **Developer Experience**
   - Tiered bootstrap loading (#22438)
   - Tool schema optimization (#14785)
   - Session snapshots/checkpoints (#13700)

### **Long-term Vision (từ RFCs)**

- **Multi-agent orchestration** với capability profiling (#35203)
- **Native secrets management** integration (#13610)
- **Capability-based permissions** cho tools (#12678)
- **Anthropic native server-side tools** support (#23353)

---

## 🎯 Kết luận

OpenClaw đang trong giai đoạn **maturation** với focus vào:
- ✅ **Stability**: Xử lý race conditions, sandbox issues
- 🔐 **Security**: Masked secrets, filesystem sandboxing
- 🎙️ **Voice-first**: Discord integration là bước đầu cho realtime use cases
- 🌍 **Platform parity**: Nỗ lực đưa Linux/Windows/Android lên ngang macOS

**Rủi ro chính**: Backlog lớn (307 open issues), nhiều P1 issues chưa resolve, và complexity tăng nhanh (multi-channel, multi-agent, voice). Cần ưu tiên stability và security trước khi thêm features mới.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 2026-05-21

## 1. 🌐 Tổng quan Hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **bùng nổ phát triển** với 10 dự án chính thức hiện đang hoạt động mạnh mẽ. Ngày 21/05/2026 ghi nhận **tổng cộng 221 PRs** và **76 issues** được xử lý, phản ánh tốc độ innovation cực kỳ cao. Các dự án đang hội tụ về một số xu hướng chính: **multi-agent orchestration**, **voice/realtime capabilities**, **security hardening**, và **enterprise readiness**.

### Phân khúc thị trường rõ ràng:

```
🏢 Enterprise-focused:
├─ OpenClaw: Platform đa năng, multi-channel
├─ Zeroclaw: Multi-agent host, security-first
└─ IronClaw: Production-grade với auth/approval flows

🔬 Research/Innovation:
├─ NanoBot: Performance optimization leader
├─ Hermes-Agent: Memory architecture innovation
└─ CoPaw (QwenPaw): Coding-first với IDE integration

🎯 Specialized:
├─ PicoClaw: Lightweight, embedded systems
├─ NanoClaw: Developer tooling, IDE backend
├─ LobsterAI: Chinese market focus
├─ Moltis: Vault security, knowledge management
└─ GoClaw: Cloud-native, multi-tenant
```

---

## 2. 📈 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ tương tác | Giai đoạn |
|-------|--------|-----|----------|---------------|------------------|-----------|
| **OpenClaw** | 307 | 500 | 2 | 🔥🔥🔥 Rất cao | ⭐⭐⭐⭐ Cao | Maturation |
| **NanoBot** | 11 | 43 | 0 | 🔥🔥🔥 Rất cao | ⭐⭐⭐ Trung bình | Rapid dev |
| **Zeroclaw** | 9 | 50 | 1 | 🔥🔥 Cao | ⭐⭐⭐ Trung bình | Transformation |
| **PicoClaw** | 8 | 25 | 1 | 🔥🔥 Cao | ⭐⭐ Thấp | Consolidation |
| **NanoClaw** | 3 | 18 | 0 | 🔥🔥 Cao | ⭐ Rất thấp | Early growth |
| **IronClaw** | 12 | 46 | 0 | 🔥🔥🔥 Rất cao | ⭐⭐ Thấp | Reborn refactor |
| **LobsterAI** | 3 | 24 | 0 | 🔥🔥 Cao | ⭐⭐ Thấp | Backlog cleanup |
| **Moltis** | 3 | 3 | 0 | 🔥 Trung bình | ⭐⭐ Thấp | Stable |
| **CoPaw** | 23 | 36 | 1 | 🔥🔥🔥 Rất cao | ⭐⭐⭐ Trung bình | Rapid growth |
| **GoClaw** | 4 | 8 | 1 | 🔥 Trung bình | ⭐ Rất thấp | Security crisis |
| **Hermes-Agent** | 10 | 50 | 0 | 🔥🔥🔥 Rất cao | ⭐⭐⭐⭐ Cao | Maturation |

### Chỉ số tổng hợp:

```
Tổng Issues: 76
Tổng PRs: 221
Tổng Releases: 6

Phân bố hoạt động:
├─ Rất cao (>40 PRs): 5 dự án (45%)
├─ Cao (20-40 PRs): 4 dự án (36%)
└─ Trung bình (<20 PRs): 2 dự án (18%)

Tỷ lệ release:
├─ Có release: 4/11 (36%)
└─ Không release: 7/11 (64%)
```

---

## 3. 🎯 Vị thế của OpenClaw

### Điểm mạnh vượt trội:

**1. Quy mô và độ trưởng thành**
- **307 issues** - Cao nhất trong hệ sinh thái (gấp 13x NanoBot)
- **500 PRs** - Backlog lớn nhất, phản ánh cộng đồng đông đảo
- **2 releases trong 24h** - Tốc độ ship nhanh nhất

**2. Chiến lược đa kênh toàn diện**
```
OpenClaw channels:
├─ Voice: Discord voice integration (v2026.5.20-beta.1)
├─ Messaging: Telegram, Signal, Slack, Mattermost
├─ Email: IMAP/SMTP support
└─ Web: Control UI, webchat

So sánh:
├─ NanoBot: 4 channels (Telegram, Discord, Slack, Email)
├─ CoPaw: 3 channels (WeChat, Feishu, WeCom)
├─ LobsterAI: 2 channels (DingTalk, Telegram)
└─ Các dự án khác: 1-2 channels
```

**3. Voice-first innovation**
- Duy nhất có **Discord voice sessions** với multi-user handoff
- DAVE recovery mechanism cho voice context
- Tự động inject identity vào realtime instructions
- **Insight**: Đây là bước đi chiến lược để mở rộng sang customer support và interactive applications

### Thách thức:

**1. Backlog quá tải**
- 307 open issues - Nhiều nhất trong hệ sinh thái
- Nhiều P1 issues chưa resolve (#84748, #84628, #19328)
- Risk: Chất lượng có thể bị ảnh hưởng khi scale nhanh

**2. Complexity tăng nhanh**
- Multi-channel, multi-agent, voice capabilities cùng lúc
- Sandbox isolation issues tương tự PicoClaw, GoClaw
- Cần ưu tiên stability trước features mới

**3. Cạnh tranh về innovation**
- **NanoBot**: Cold start 480ms (vs OpenClaw chưa tối ưu)
- **CoPaw**: Coding Mode với IDE nhúng (OpenClaw chưa có)
- **Hermes-Agent**: 5-layer memory architecture (OpenClaw dùng simple memory)

### Vị trí trong hệ sinh thái:

```
OpenClaw = "Swiss Army Knife"
├─ Ưu điểm: Đa năng, nhiều channels, voice-first
├─ Nhược điểm: Complexity cao, backlog lớn
└─ Target: General-purpose platform cho mọi use case

Competitors positioning:
├─ NanoBot = "Performance Beast" (cold start 480ms)
├─ CoPaw = "Developer's Choice" (Coding Mode, IDE)
├─ Zeroclaw = "Enterprise Fortress" (security-first)
├─ IronClaw = "Production Ready" (auth/approval flows)
└─ Hermes-Agent = "Research Leader" (memory innovation)
```

---

## 4. 🔧 Hướng Kỹ thuật Chung

### Xu hướng được nhiều dự án áp dụng:

**1. Security Hardening (8/11 dự án)**

```
Sandbox isolation:
├─ OpenClaw: Filesystem sandboxing config (#7722)
├─ PicoClaw: Sandbox bypass blocks (#2693)
├─ GoClaw: Multi-tenant workspace isolation (#1163)
├─ NanoClaw: Rootless Podman support (#2572)
├─ Zeroclaw: Tool filter groups (#6699)
├─ IronClaw: NoExposureGuard service (#3767)
├─ Hermes-Agent: XML XXE protection (#28585)
└─ Moltis: Vault password sync (#1026)

Secret management:
├─ OpenClaw: Masked secrets (#10659)
├─ PicoClaw: MQTT TLS verification (#2899)
├─ IronClaw: Staged credentials (#3818)
└─ Moltis: Atomic vault rotation (#1026)
```

**2. Multi-Agent Orchestration (6/11 dự án)**

```
Architecture evolution:
├─ Zeroclaw: Single-agent → Multi-agent host (v0.8.0)
├─ OpenClaw: Sub-agent model overrides (#19328)
├─ IronClaw: Reborn architecture với service boundaries
├─ NanoBot: Delegate agents respect injection mode (#6688)
├─ Hermes-Agent: Background review fork optimization (#29568)
└─ CoPaw: Goal Mode cho long-term planning (#4443)

Coordination patterns:
├─ Capability profiling (OpenClaw #35203)
├─ Shared blackboard (OpenClaw #35203)
├─ Peer groups (Zeroclaw v0.8.0)
└─ Hierarchical delegation (IronClaw Reborn)
```

**3. Performance Optimization (5/11 dự án)**

```
Cold start optimization:
├─ NanoBot: 4.6s → 480ms (-90%) 🏆 Leader
├─ OpenClaw: Scope plugin metadata reads (#84628)
└─ IronClaw: Lazy-loading providers/channels

Context management:
├─ Hermes-Agent: Cache optimization (-50% tokens) (#29568)
├─ CoPaw: Context token estimation (#4463)
├─ NanoBot: Compaction benchmark (#3920)
└─ OpenClaw: Hook-injected context limits (#38222)

Memory efficiency:
├─ Moltis: Nested memory folders (#1010)
├─ Hermes-Agent: 5-layer architecture (#29549)
└─ NanoClaw: Context-window awareness (#2573)
```

**4. Multi-Modal Support (4/11 dự án)**

```
Voice/Audio:
├─ OpenClaw: Discord voice sessions (v2026.5.20-beta.1) 🏆
├─ NanoBot: Audio/video multimodal pipeline (#2908)
└─ CoPaw: Auto-routing cho voice input (#4539)

Vision:
├─ NanoBot: Generalized multimodal support (#2908)
├─ CoPaw: Auto-switch vision models (#4539)
└─ Hermes-Agent: Image generation backends (#29572)

Unified handling:
├─ NanoBot: Capability detection pipeline
└─ CoPaw: Content-type based routing
```

**5. Developer Experience (7/11 dự án)**

```
IDE Integration:
├─ CoPaw: Coding Mode với VS Code-like IDE (#4578) 🏆
├─ NanoClaw: ACP protocol cho WebStorm (#2542)
└─ Hermes-Agent: Hermes-Canvas text editing (#29565)

CLI/TUI:
├─ Hermes-Agent: Status bar với tier indicator (#29577)
├─ NanoBot: Coding workflows với apply_patch (#3923)
├─ Zeroclaw: Skills management CLI (#6253)
└─ OpenClaw: Onboard command fixes (#84748)

Testing:
├─ IronClaw: 105 integration test cases (#4561)
├─ NanoBot: Systematic compaction evaluation (#3920)
└─ Zeroclaw: Regression test coverage (#1026)
```

---

## 5. 🎨 Điểm Khác biệt

### Chiến lược sản phẩm:

**OpenClaw - "Platform Play"**
```
Strategy: Horizontal expansion
├─ Multi-channel: 7+ channels
├─ Multi-modal: Voice, text, vision
├─ Multi-agent: Sub-agents, delegation
└─ Target: General-purpose platform

Risk: Complexity, maintenance burden
Opportunity: Network effects, ecosystem lock-in
```

**NanoBot - "Performance First"**
```
Strategy: Technical excellence
├─ Cold start: 480ms (industry-leading)
├─ Provider optimization: Snapshot caching
├─ Systematic benchmarking
└─ Target: Performance-critical applications

Risk: Feature parity với competitors
Opportunity: Premium tier cho latency-sensitive use cases
```

**CoPaw (QwenPaw) - "Developer Focused"**
```
Strategy: Vertical integration cho coding
├─ Coding Mode: IDE nhúng trong browser
├─ Skill Market: Plugin ecosystem
├─ Goal Mode: Long-term planning
└─ Target: Software developers

Risk: Niche market size
Opportunity: High-value users, enterprise adoption
```

**Zeroclaw - "Enterprise Security"**
```
Strategy: Security-first architecture
├─ Multi-agent host: Isolation boundaries
├─ Config schema V3: Per-agent security profiles
├─ Tool filtering: MCP integration
└─ Target: Enterprise deployments

Risk: Complexity, migration pain
Opportunity: Compliance-heavy industries
```

**IronClaw - "Production Grade"**
```
Strategy: Operational excellence
├─ Reborn architecture: Service boundaries
├─ Auth/Approval flows: Governance
├─ WebUI v2: Native surface
└─ Target: Production workloads

Risk: Long refactor cycle
Opportunity: Mission-critical applications
```

### Tính năng độc đáo:

| Dự án | Killer Feature | Competitive Moat |
|-------|----------------|------------------|
| **OpenClaw** | Discord voice sessions | First-mover trong voice |
| **NanoBot** | 480ms cold start | Technical barrier cao |
| **CoPaw** | Coding Mode IDE | Developer lock-in |
| **Zeroclaw** | Multi-agent host | Architecture complexity |
| **IronClaw** | Approval workflows | Enterprise trust |
| **Hermes-Agent** | 5-layer memory | Research innovation |
| **NanoClaw** | ACP protocol | IDE ecosystem |
| **PicoClaw** | Embedded focus | Hardware integration |
| **LobsterAI** | Chinese market | Localization |
| **Moltis** | Vault security | Crypto expertise |
| **GoClaw** | Vertex AI | Google Cloud native |

### Cộng đồng:

**Engagement patterns:**

```
High engagement (>10 comments/issue):
├─ OpenClaw: #75 (105 comments) - Platform apps
├─ Hermes-Agent: #18080 (12 comments) - Dashboard themes
└─ CoPaw: #4559 (7 comments) - Performance

Medium engagement (3-10 comments):
├─ NanoBot: Multi-user memory (#3744)
├─ Zeroclaw: DeepSeek compatibility (#6059)
└─ GoClaw: Security issues (0 comments - mới)

Low engagement (<3 comments):
├─ PicoClaw, NanoClaw, IronClaw, LobsterAI, Moltis
└─ Reason: Smaller communities hoặc internal teams
```

**Contributor diversity:**

```
International contributions:
├─ CoPaw: Trung Quốc (WeChat, Feishu integrations)
├─ Hermes-Agent: Trung Quốc (#29549 - 5-layer memory)
├─ LobsterAI: Trung Quốc (DingTalk, 163.com email)
├─ NanoBot: Đa quốc gia (10 ngôn ngữ docs)
└─ OpenClaw: Chủ yếu English-speaking

First-time contributors:
├─ CoPaw: 5 PRs từ new contributors
├─ Zeroclaw: Community helping với bulk revert (#6074)
├─ NanoClaw: External contributors cho ACP
└─ OpenClaw: ClawSweeper automation giảm barrier
```

---

## 6. 📊 Mức độ Trưởng thành Cộng đồng

### Phân tích theo giai đoạn:

**🌱 Early Stage (0-6 tháng)**
```
NanoClaw, GoClaw
├─ Đặc điểm:
│  ├─ Issues ít (<5), PRs tập trung
│  ├─ Core team chủ đạo
│  └─ Tương tác cộng đồng thấp
├─ Thách thức:
│  ├─ Thiếu documentation
│  ├─ Onboarding khó
│  └─ Bus factor cao
└─ Cơ hội:
   ├─ Nhanh nhẹn, pivot dễ
   └─ Xây dựng culture từ đầu
```

**🌿 Growth Stage (6-18 tháng)**
```
PicoClaw, LobsterAI, Moltis, IronClaw
├─ Đặc điểm:
│  ├─ Issues 3-12, PRs 3-46
│  ├─ Bắt đầu có external contributors
│  └─ Tương tác trung bình
├─ Thách thức:
│  ├─ Scaling processes
│  ├─ Maintaining quality
│  └─ Balancing features vs stability
└─ Cơ hội:
   ├─ Community building
   └─ Ecosystem partnerships
```

**🌳 Maturity Stage (18+ tháng)**
```
OpenClaw, NanoBot, Zeroclaw, CoPaw, Hermes-Agent
├─ Đặc điểm:
│  ├─ Issues >10, PRs >30
│  ├─ Diverse contributor base
│  └─ High engagement
├─ Thách thức:
│  ├─ Backlog management (OpenClaw: 307 issues)
│  ├─ Breaking changes (Zeroclaw v0.8.0)
│  └─ Maintaining velocity
└─ Cơ hội:
   ├─ Enterprise adoption
   ├─ Ecosystem leadership
   └─ Standards setting
```

### Community Health Metrics:

| Dự án | Contributor Diversity | Response Time | Documentation | Governance | Overall |
|-------|----------------------|---------------|---------------|------------|---------|
| **OpenClaw** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 🟢 Healthy |
| **Hermes-Agent** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 🟢 Excellent |
| **CoPaw** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 🟢 Healthy |
| **NanoBot** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 🟢 Healthy |
| **Zeroclaw** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 🟡 Good |
| **IronClaw** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | 🟡 Developing |
| **NanoClaw** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | 🟡 Early |
| **PicoClaw** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | 🟡 Developing |
| **LobsterAI** | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | 🟡 Developing |
| **GoClaw** | ⭐ | ⭐⭐ | ⭐⭐ | ⭐ | 🔴 Crisis |
| **Moltis** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | 🟡 Stable |

---

## 7. 🔮 Tín hiệu Xu hướng

### Xu hướng ngắn hạn (Q2-Q3 2026):

**1. Voice & Realtime sẽ bùng nổ**
```
Signals:
├─ OpenClaw: Discord voice sessions (shipped)
├─ NanoBot: Audio/video multimodal (#2908)
├─ CoPaw: Voice transcription với Whisper (#4556)
└─ Hermes-Agent: Realtime streaming improvements

Prediction:
├─ 50% dự án sẽ có voice capabilities trong 3 tháng
├─ WebRTC integration sẽ trở thành standard
└─ Voice-first use cases: customer support, tutoring, accessibility
```

**2. IDE Integration là must-have**
```
Signals:
├─ CoPaw: Coding Mode với IDE nhúng (#4578)
├─ NanoClaw: ACP protocol cho WebStorm (#2542)
├─ Hermes-Agent: Hermes-Canvas text editing (#29565)
└─ NanoBot: apply_patch tool cho multi-file edits (#3923)

Prediction:
├─ Mọi dự án sẽ có IDE plugin/integration
├─ LSP (Language Server Protocol) adoption
└─ GitHub Copilot/Cursor sẽ là benchmark
```

**3. Security sẽ là differentiator**
```
Signals:
├─ 8/11 dự án đang hardening security
├─ GoClaw: 4 critical bugs phát hiện sau release
├─ Multi-tenant isolation là pain point chung
└─ Compliance requirements tăng

Prediction:
├─ Security certifications (SOC2, ISO27001) sẽ là yêu cầu
├─ Zero-trust architecture sẽ trở thành standard
└─ Dự án không secure sẽ bị loại khỏi enterprise market
```

### Xu hướng trung hạn (Q4 2026 - Q1 2027):

**4. Multi-Agent Orchestration trở thành core**
```
Current state:
├─ Zeroclaw: Multi-agent host architecture
├─ OpenClaw: Sub-agents, delegation
├─ IronClaw: Service boundaries
└─ Hermes-Agent: Background review forks

Future state:
├─ Agent marketplaces (tương tự Skill Market)
├─ Standardized agent communication protocols
├─ Hierarchical agent organizations
└─ Agent-to-agent authentication/authorization
```

**5. Memory architecture sẽ tiến hóa**
```
Innovation leaders:
├─ Hermes-Agent: 5-layer memory (#29549)
├─ Moltis: Nested memory folders (#1010)
└─ OpenClaw: Multi-user memory isolation (#3744)

Next generation:
├─ Graph-based memory (knowledge graphs)
├─ Semantic search với embeddings
├─ Automatic memory consolidation
└─ Privacy-preserving memory sharing
```

**6. Platform consolidation**
```
Prediction:
├─ 3-4 platforms sẽ chiếm 80% market share
├─ Smaller projects sẽ merge hoặc specialize
├─ Standards sẽ emerge (MCP, ACP, etc.)
└─ Interoperability sẽ là key differentiator

Winners likely:
├─ OpenClaw: Platform breadth
├─ Hermes-Agent: Innovation + community
├─ CoPaw: Developer focus
└─ Zeroclaw/IronClaw: Enterprise security
```

### Xu hướng dài hạn (2027+):

**7. AI Agent OS**
```
Vision:
├─ Agents sẽ trở thành "applications"
├─ Platform sẽ trở thành "operating system"
├─ Users sẽ "install" agents như apps
└─ Marketplace economy sẽ hình thành

Requirements:
├─ Standardized agent packaging
├─ Dependency management
├─ Version control
├─ Security sandboxing
└─ Resource quotas
```

**8. Regulatory compliance**
```
Drivers:
├─ EU AI Act
├─ Data privacy laws (GDPR, CCPA)
├─ Industry-specific regulations
└─ Liability concerns

Impact:
├─ Audit trails mandatory
├─ Explainability requirements
├─ Human-in-the-loop controls
└─ Data residency compliance
```

---

## 8. 🎯 Khuyến nghị Chiến lược

### Cho OpenClaw:

**Ngắn hạn (1-3 tháng):**
```
Priority 1: Stability
├─ Giải quyết P1 issues (#84748, #84628, #19328)
├─ Tăng test coverage cho multi-channel
└─ Improve error handling và logging

Priority 2: Voice ecosystem
├─ Expand voice channels (Telegram, Slack)
├─ Voice-to-text transcription
└─ Multi-language voice support

Priority 3: Developer experience
├─ Better onboarding documentation
├─ Sandbox setup automation
└─ Debugging tools
```

**Trung hạn (3-6 tháng):**
```
Strategic initiatives:
├─ IDE integration (VSCode, JetBrains)
├─ Enterprise features (SSO, RBAC, audit logs)
├─ Performance optimization (cold start, context management)
└─ Memory architecture v2 (inspired by Hermes-Agent)

Ecosystem building:
├─ Plugin marketplace
├─ Community contributions program
└─ Partner integrations
```

### Cho các dự án khác:

**NanoBot**: Maintain performance leadership, add enterprise features  
**CoPaw**: Double down on developer tools, expand Skill Market  
**Zeroclaw**: Complete v0.8.0 stabilization, focus on security certifications  
**IronClaw**: Finish Reborn refactor, ship WebUI v2  
**Hermes-Agent**: Productize 5-layer memory, improve documentation  
**NanoClaw**: Expand ACP support, build IDE plugin ecosystem  
**PicoClaw**: Focus on embedded use cases, IoT integration  
**LobsterAI**: Strengthen Chinese market position, improve Windows support  
**Moltis**: Enhance vault features, crypto integrations  
**GoClaw**: Fix security issues urgently, rebuild trust  

---

## 📌 Kết luận

Hệ sinh thái AI agent đang trong **golden age** với innovation bùng nổ trên mọi mặt trận. OpenClaw đang ở vị trí **platform leader** nhờ breadth và voice-first strategy, nhưng đối mặt với cạnh tranh gay gắt từ các dự án specialized (NanoBot về performance, CoPaw về developer tools, Zeroclaw về security).

**Key takeaways:**
1. **Voice/realtime** là next frontier - OpenClaw đang dẫn đầu
2. **Security** sẽ là table stakes cho enterprise adoption
3. **IDE integration** là must-have cho developer-focused platforms
4. **Multi-agent orchestration** sẽ định hình architecture tương lai
5. **Community health** quan trọng hơn feature count

**Winning formula**: Platform breadth + Technical excellence + Security-first + Developer experience + Healthy community

OpenClaw có potential để trở thành "Android của AI agents" nếu maintain momentum và address stability concerns.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích dự án NanoBot - 21/05/2026

## 📊 Tóm tắt hôm nay

Ngày 21/05/2026 đánh dấu một đợt hoạt động cực kỳ sôi động với **43 PRs** được xử lý (phần lớn đã merge), tập trung vào tối ưu hiệu năng, mở rộng hệ sinh thái provider/channel, và cải thiện trải nghiệm developer. Điểm nhấn là việc tối ưu cold start của gateway giảm **90%** (từ 4.6s xuống 480ms), tích hợp Signal channel, và loạt refactor lớn về kiến trúc agent.

---

## 🚀 Releases

Không có release chính thức trong 24h qua, nhưng các PR được merge cho thấy đang chuẩn bị cho một phiên bản lớn với nhiều breaking changes về cấu trúc config và API.

---

## 🔧 Tiến độ dự án

### **Tối ưu hiệu năng - Breakthrough lớn**
- **PR #3918** (đã merge): Giảm cold start gateway từ ~4.6s xuống ~480ms (-90%)
  - Provider snapshot: 638ms → 8ms (-98.7%)
  - Channel manager: 3170ms → 35ms (-98.9%)
  - Áp dụng lazy-loading cho provider/channel initialization
  - **Impact**: Cải thiện đáng kể trải nghiệm khởi động, đặc biệt quan trọng cho serverless deployments

### **Mở rộng hệ sinh thái**
- **PR #3935** (đã merge): Tích hợp Signal channel qua signal-cli daemon
  - Hỗ trợ DM và group chat với access policies (open/allowlist)
  - Markdown→Signal text style conversion
  - Typing indicators, attachment handling
  - **Ý nghĩa**: Mở rộng sang nền tảng messaging bảo mật cao, đáp ứng issue #49 (5 👍)

- **PR #3927** (đang review): Thêm Novita AI provider
  - Sử dụng OpenAI-compatible path
  - Mở rộng lựa chọn LLM cho users

- **PR #3936** (đang review): xAI Grok OAuth support
  - PKCE-based authentication flow
  - Loại bỏ nhu cầu paste API key thủ công

### **Refactoring kiến trúc - Chuẩn bị cho scale**
Một loạt PRs lớn đã được merge trong 24h qua, cho thấy đợt refactor có kế hoạch:

- **PR #3856** (đã merge): Tách checkpoint.py và turn_writer.py từ loop.py
  - Giảm độ phức tạp của AgentLoop
  - Cải thiện maintainability và testability

- **PR #2908** (đã merge): Generalize multimodal support
  - Mở rộng từ image-only sang audio/video
  - Unified media pipeline với capability detection

- **PR #3179, #2813, #2787** (đã merge): Chuỗi refactor về:
  - WebSocket tooling và session lifecycle
  - Template rendering cho context/heartbeat
  - Unified tool registration

### **Developer Experience**
- **PR #3923** (đang review): Tối ưu coding workflows
  - Thêm `apply_patch` tool cho multi-file edits
  - Workspace-aware validation, rollback on failures
  - Cải thiện hunk handling với unified-diff hints

- **PR #3920** (đang review): Compaction benchmark + prompt optimization
  - Systematic evaluation của context compaction
  - Tối ưu consolidator prompt dựa trên metrics

---

## 💬 Điểm nổi bật cộng đồng

### **Issues được quan tâm nhất**
1. **Issue #49** (5 👍): Signal channel support
   - Đã được giải quyết qua PR #3935
   - Phản ánh nhu cầu về privacy-focused messaging

2. **Issue #3744** (4 comments): Session-level MEMORY cho multi-user
   - Vấn đề về USER.md/MEMORY.md khi nhiều IM users dùng chung agent
   - Chưa có giải pháp rõ ràng, cần thiết kế architecture

3. **Issue #1123** (4 comments): 163.com IMAP "Unsafe Login"
   - Vấn đề với 163.com email server yêu cầu ID command
   - Technical debt cần xử lý cho Chinese users

### **PRs có nhiều discussion**
- Các PR về refactoring (#3856, #3179, #2908) cho thấy team đang có discussion sâu về architecture decisions
- Focus vào backward compatibility và migration path

---

## 🐛 Ổn định & Bugs

### **Bugs được fix trong 24h**
1. **PR #3932** (đang review): Fix duplicate tool_call_id trong stream mode
   - Gây invalid_request_error từ OpenAI API
   - Critical fix cho production stability

2. **PR #3940** (đang review): Fix Moonshot API rejection
   - Kimi k2.5/k2.6 reject khi có cả reasoning_effort và thinking
   - Provider-specific compatibility issue

3. **PR #3933** (đang review): Fix shell guard false positives
   - URL commands (curl, wget) bị block nhầm
   - Regression trong safety guard logic

4. **Issue #3907** (đã đóng): Page rendering issue với reasoning mode
   - DeepSeek v4-pro: mỗi word hiển thị trên dòng mới
   - Vấn đề với IncrementalThinkExtractor

### **Bugs đang mở**
1. **Issue #3884**: WebUI conversation closes sau first response
   - Ảnh hưởng WebSocket channel
   - Cần investigation về session lifecycle

2. **Issue #3934**: exec tool không thể pip install packages
   - System Python từ chối pip install
   - Virtual env path append không hoạt động đúng

3. **Issue #3931**: restrictToWorkspace=true blocks web requests
   - Safety guard quá aggressive
   - Block cả external API calls

---

## ✨ Yêu cầu tính năng

### **Đang được implement**
1. **PR #3937** (đang review): User confirmation cho dangerous commands
   - Giải quyết issue #3887
   - Cải thiện safety mechanism

2. **Issue #3941**: Ollama image generation support
   - Request hỗ trợ local models như x/z-image-turbo
   - Mở rộng image generation backends

### **Đang được thảo luận**
1. **Issue #3938**: Message buffering/debounce cho group chats
   - Pain point: mỗi message trigger riêng lẻ trong group
   - Đề xuất: buffer messages trong time window
   - **Impact**: Giảm API calls, cải thiện context coherence

2. **Issue #3744**: Session-level memory cho multi-user scenarios
   - Architecture challenge cho shared agent instances
   - Cần design document

---

## 👥 Phản hồi người dùng

### **Positive signals**
- Community đang active contribute (nhiều external contributors)
- Issues được respond nhanh (trong vòng 24h)
- PRs được review và merge efficiently

### **Pain points được raise**
1. **Group chat experience**: Cần debouncing/buffering (#3938)
2. **Multi-user memory isolation**: Chưa có giải pháp clear (#3744)
3. **Email integration**: 163.com compatibility issues (#1123)
4. **Safety guards**: Quá strict, block legitimate use cases (#3931)
5. **Local development**: Python package installation issues (#3934)

### **Documentation needs**
- PR #3930 (đã merge): Thêm multi-language doc links
- Hỗ trợ 10 ngôn ngữ trên nanobot.wiki
- Phản ánh nhu cầu internationalization

---

## 🗺️ Backlog & Roadmap

### **Immediate priorities (dựa trên PR activity)**
1. ✅ **Performance optimization** - Đã hoàn thành (cold start)
2. 🔄 **Provider ecosystem expansion** - Đang tiến hành (Novita, xAI OAuth)
3. 🔄 **Safety & UX improvements** - Đang review (confirmation mechanism, shell guards)
4. 📋 **Architecture refactoring** - Đã hoàn thành phần lớn

### **Medium-term (dựa trên open issues)**
1. **Multi-user session management** - Cần design (#3744)
2. **Group chat optimization** - Message buffering (#3938)
3. **Image generation expansion** - Ollama support (#3941)
4. **Email channel improvements** - 163.com fix (#1123)

### **Technical debt**
1. Migration path cho provider config format changes (#3026)
2. Backward compatibility cho refactored APIs
3. Test coverage cho new multimodal pipeline
4. Documentation updates cho breaking changes

---

## 🎯 Đánh giá tổng quan

**Strengths:**
- Tốc độ development và merge PR rất cao
- Focus rõ ràng vào performance và developer experience
- Active community engagement
- Systematic approach to refactoring

**Areas for improvement:**
- Multi-user scenarios cần architecture design rõ ràng hơn
- Safety guards cần fine-tuning để balance security vs usability
- Documentation cần catch up với code changes
- Breaking changes cần communication plan tốt hơn

**Momentum:** 🔥🔥🔥 Rất cao - dự án đang trong giai đoạn phát triển mạnh với nhiều improvements đồng thời.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Phân tích Zeroclaw - Ngày 2026-05-21

## 1. 📋 Tóm tắt hôm nay

Zeroclaw đã phát hành **v0.8.0-beta-1** - một bản cập nhật đột phá chuyển từ single-agent daemon sang multi-agent host platform. Cộng đồng đang tích cực xử lý các vấn đề tương thích provider (DeepSeek, Qwen), cải thiện hệ thống skills, và sửa lỗi cấu hình. Có 9 issues đang mở và 50 PRs đang được xử lý, cho thấy dự án đang trong giai đoạn phát triển mạnh mẽ với nhiều đóng góp từ cộng đồng.

## 2. 🚀 Releases

### v0.8.0-beta-1 (Phát hành: 2026-05-21)

**Thay đổi kiến trúc lớn:**
- **Multi-agent architecture**: Chuyển từ single-agent daemon sang multi-agent host - một cài đặt có thể chạy nhiều agents độc lập
- **Config schema V3**: Viết lại hoàn toàn hệ thống cấu hình, mỗi agent có:
  - Identity và workspace riêng
  - Memory store độc lập
  - Model provider riêng biệt
  - Channels và security profiles tách biệt
- **Agent communication**: Agents có thể giao tiếp qua peer groups hoặc spawn sub-agents với scope giới hạn
- **Breaking changes**: Yêu cầu migration tự động do thay đổi schema và on-disk layout

**Ý nghĩa:**
- Đây là bước tiến lớn về khả năng mở rộng - từ tool đơn lẻ thành platform
- Cho phép use cases phức tạp: specialized agents, team collaboration, hierarchical delegation
- Tăng độ phức tạp nhưng mở ra khả năng enterprise deployment

## 3. 📊 Tiến độ dự án

### Xu hướng phát triển chính:

**A. Provider Compatibility (Ưu tiên cao)**
- 🔴 **DeepSeek-V4 incompatibility** (#6059, P1): API format không tương thích với thinking mode
- 🔴 **Qwen 3.6 tool-call leaks** (#6734, đã đóng): Tool-call envelopes lộ vào Matrix replies
- 🟡 **Extended thinking support** (#5652): Thêm native reasoning cho Anthropic/Bedrock

**B. Skills System Enhancement (Track v0.7.6)**
- 🟢 **Skills UX improvements** (#6253): Tracker tổng thể cho CLI, loader, sandbox, test harness
- 🟢 **Skills management API** (#6700): Dashboard web với enable/disable toggle
- 🟡 **Prompt injection mode** (#6688): Delegate agents tôn trọng config injection mode

**C. Tool & Memory Fixes**
- 🔴 **tool_filter_groups bug** (#6699, P1): Không hoạt động với MCP tools do prefix-check bug
- 🔴 **purge_namespace bug** (#6801, P1): Xóa theo category thay vì namespace
- 🟢 **Multi-file upload** (#6775): Tool `file_upload_bundle` cho atomic uploads

**D. Channel Improvements**
- 🟡 **Email channel fixes** (#6512): HTML rendering, subject threading, attachment paths
- 🟡 **Slack thread backfill** (#6428): Backfill context khi agent được mention mid-thread
- 🟡 **WhatsApp protocol update** (#6706): Upgrade lên whatsapp-rust 0.6

### Phân tích PRs quan trọng:

**Merged/Active:**
- ✅ **Security leak detection** (#6812): Thêm Groq API key detection
- ✅ **Namespace purge fix** (#6777): Sửa SQL query xóa đúng namespace
- ✅ **Gateway tunnel picker** (#6815): Fix nested_option_entries để hiện tất cả providers
- ✅ **Policy heredoc support** (#6816): Cho phép multiline heredocs trong SecurityPolicy

**Cần review:**
- ⏳ **Extended thinking** (#5652, size: L): Cần author action, PR lớn về reasoning
- ⏳ **PostgreSQL nested runtime** (#6538): Fix panic khi enable pgvector
- ⏳ **Strict tool parsing** (#6675): Thêm mode strict cho mixed-provider setups

## 4. 💬 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

1. **DeepSeek-V4 incompatibility** (#6059) - 👍 4, 💬 11
   - Vấn đề ảnh hưởng cả Pro và Flash versions
   - Liên quan đến thinking mode format
   - Đánh dấu P1, đang in-progress

2. **Bulk revert recovery** (#6074) - 💬 2
   - Track 153 commits bị revert cần recovery
   - Ảnh hưởng bug fixes và features đã merge
   - Community đang giúp identify commits cần restore

3. **Skills support tracker** (#6253) - 💬 1
   - Coordinating tracker cho v0.7.6
   - Mời community input về skills UX
   - Tập trung vào CLI, loader, sandbox improvements

### Vấn đề người dùng quan tâm:

- **Provider compatibility**: DeepSeek và Qwen là 2 providers phổ biến gặp vấn đề
- **Tool filtering**: MCP tools không được filter đúng, ảnh hưởng security
- **Memory management**: Namespace purge bug có thể xóa nhầm data
- **Deployment**: Raspberry Pi deployment scripts cần fixes cho non-pi users

## 5. 🐛 Ổn định & Bugs

### Critical (P1):

1. **DeepSeek-V4 API format** (#6059)
   - Severity: S2 - degraded behavior
   - Impact: Không sử dụng được DeepSeek provider
   - Status: In-progress

2. **tool_filter_groups no-op** (#6699)
   - Severity: High risk
   - Impact: Security filtering không hoạt động với MCP tools
   - Root cause: Prefix mismatch + không integrate với deferred_loading

3. **purge_namespace SQL bug** (#6801)
   - Severity: S2 - degraded behavior
   - Impact: Xóa data theo category thay vì namespace
   - Fix: PR #6777 đã sửa

### Medium priority:

- **PostgreSQL nested runtime panic** (#6538): Khi enable pgvector
- **Channel parallel-dispatch test** (#6813): Brittle timing threshold
- **Homebrew config resolution** (#6639): Sai đường dẫn config directory
- **WeChat context persistence** (#6238): Mất context_tokens sau restart

### Infrastructure:

- **CI workflow blocked** (#6752): pr-title workflow dùng action không trong allowlist
- **Image optimization** (#6748): Tối ưu 24 assets, giảm repo size
- **No-default-features compile** (#6158): zeroclaw-channels không compile

## 6. ✨ Yêu cầu tính năng

### Đang phát triển:

1. **Extended thinking support** (#5652)
   - Native reasoning budget cho Anthropic/Bedrock
   - Cải thiện reasoning chains và temperature control
   - Size: L, cần author action

2. **Skills management dashboard** (#6700)
   - Web UI để enable/disable skills
   - API endpoints cho skills management
   - Size: M, risk: high (manual testing needed)

3. **Multi-file upload tool** (#6775)
   - Atomic bundle uploads
   - Multipart POST với N files
   - Size: L, risk: high

4. **Interactive events exposure** (#6297)
   - Poll-vote và interactive-reply events
   - Uniform discrete-choice API
   - Size: L, risk: high

### Đề xuất mới:

- **Feature matrix documentation** (#6810): User-facing support matrix
- **OTel tool spans enrichment** (#6009): Semantic convention attributes
- **Blog RSS/Atom feeds** (#6774): Feed discovery endpoints

## 7. 👥 Phản hồi người dùng

### Positive:

- **Multi-agent architecture**: Community đánh giá cao khả năng mở rộng của v0.8.0
- **Skills system**: Có tracker rõ ràng và mời community input (#6253)
- **Active maintenance**: Nhiều bugs được fix nhanh (namespace purge, security leaks)

### Pain points:

1. **Provider compatibility issues**:
   - DeepSeek-V4 không hoạt động (11 comments)
   - Qwen 3.6 tool-call leaks vào user messages
   - Cần test coverage tốt hơn cho OpenAI-compatible providers

2. **Configuration complexity**:
   - Schema V3 migration có thể gây confusion
   - Homebrew users gặp path resolution issues
   - Deployment scripts hardcode assumptions (user=pi)

3. **Tool filtering gaps**:
   - MCP tools bypass security filters
   - Không có strict parsing mode cho mixed providers
   - Deferred loading không integrate với filters

4. **Documentation gaps**:
   - Stale RUST_LOG examples (#6692)
   - Thiếu feature matrix (#6810)
   - Link rendering issues trong docs (#6769)

### Community contributions:

- **@Project516**: Image optimization, RSS feeds, docs fixes
- **@Audacity88**: Security fixes, namespace purge, strict parsing
- **@JordanTheJet**: CI fixes, delegate agent configs
- **@nixosclaw**: Memory namespace bug discovery & fix
- **@tidux**: Gateway tunnel picker, policy heredoc support

## 8. 🗺️ Backlog & Roadmap

### Immediate priorities (v0.8.0 stabilization):

1. **Provider compatibility**:
   - ✅ Fix DeepSeek-V4 API format (#6059)
   - ✅ Prevent tool-call leaks in Qwen/compatible providers
   - ✅ Add strict tool parsing mode (#6675)

2. **Security & data integrity**:
   - ✅ Fix tool_filter_groups for MCP (#6699)
   - ✅ Verify namespace purge fix (#6777)
   - ✅ Expand leak scanner coverage (#6812)

3. **Deployment & config**:
   - ✅ Fix Homebrew paths (#6639)
   - ✅ Parametrize deployment scripts (#6804, #6805)
   - ✅ Update gateway for v0.8.0 (#6805)

### v0.7.6 theme (Skills UX):

- CLI improvements
- Loader & audit enhancements
- Sandbox & test harness
- Skill authoring tools
- Management dashboard (#6700)

### Recovery work:

- **Bulk revert audit** (#6074): 153 commits cần review để restore
- Ưu tiên: bug fixes, security patches, protocol updates

### Future enhancements:

- **Observability**: OTel semantic conventions (#6009)
- **Channel features**: Thread backfill (#6428), interactive events (#6297)
- **Documentation**: Feature matrix (#6810), updated examples (#6692)
- **Testing**: Better provider compatibility coverage, channel integration tests

---

## 📈 Metrics Summary

- **Issues mở**: 9 (3 P1, 2 P2, 2 P3)
- **PRs active**: 50 (30 hiển thị)
- **Risk distribution**: 
  - High: ~40%
  - Medium: ~35%
  - Low: ~25%
- **Size distribution**:
  - XS: ~30%
  - S: ~25%
  - M: ~25%
  - L: ~20%
- **Release**: v0.8.0-beta-1 (breaking changes)

**Đánh giá tổng thể**: Dự án đang trong giai đoạn chuyển đổi lớn với v0.8.0 multi-agent architecture. Community active, nhiều contributors, nhưng cần ổn định provider compatibility và security filtering trước khi release stable. Skills system đang được cải thiện có hệ thống.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo phân tích PicoClaw - Ngày 2026-05-21

## 1. 🎯 Tóm tắt hôm nay

Ngày 21/05/2026 đánh dấu một đợt hoạt động phát triển cực kỳ mạnh mẽ với **25 pull requests** được tạo/cập nhật, tập trung vào **bảo mật, ổn định hệ thống và sửa lỗi nghiêm trọng**. Dự án phát hành **nightly build v0.2.8-nightly.20260521** và đang trong giai đoạn củng cố chất lượng code sau các báo cáo lỗi từ cộng đồng. Đặc biệt, có nhiều PR xử lý các vấn đề về memory leak, context handling, và security vulnerabilities.

## 2. 🚀 Releases

### **v0.2.8-nightly.20260521.33f9d638**
- ⚠️ **Nightly build tự động** - được cảnh báo có thể không ổn định
- Build này tích hợp hàng loạt fixes quan trọng về:
  - Security hardening (CSRF, path traversal)
  - Agent loop stability
  - Context budget overflow
  - TLS verification cho MQTT
- **Khuyến nghị**: Chỉ dùng cho testing, chưa nên deploy production

## 3. 📈 Tiến độ dự án

### **Xu hướng phát triển chính**

#### 🔒 **Security Hardening** (Ưu tiên cao)
- **#2900**: Thêm CSRF protection, path traversal validation, security headers cho web backend
- **#2899**: Fix TLS verification cho MQTT channel (trước đó hardcode `InsecureSkipVerify=true` - rất nguy hiểm!)
- **#2693**: Block sandbox bypass qua `find /` và `ls /` commands

#### 🛠️ **Stability & Resource Management** (Critical fixes)
- **#2904**: Fix agent loop reload và panic cleanup - xử lý resource leaks
- **#2905**: Fix fallback chain handling cho expired contexts
- **#2906**: Fix message bus backpressure - ngăn goroutine accumulation
- **#2907**: Fix JSONL store metadata drift sau crash

#### 🧠 **Context & Memory Management**
- **#2895**: Enforce budget trên fresh tail và rebuild paths (fix overflow #2894)
- **#2897**: Persist `model_name` across chat history
- **#2788**: Add per-message `created_at` timestamps

#### 🎨 **Provider & Model Management**
- **#2896**: Refactor provider metadata xung quanh backend catalog
- **#2908**: Restore provider logo fallbacks trên models page
- **#2898**: Honor explicit `thinking_level: "off"`

#### 📱 **Platform Support**
- **#2902**: Thêm Android Termux guide cho ARM64 devices

### **Closed PRs quan trọng**
- **#2891**: Factory reset feature (merged)
- **#2897**: Model name persistence (merged)
- **#2896**: Provider metadata refactor (merged)

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues được quan tâm**

#### 🔥 **#2720 - Singleton PID check bug** (Priority: HIGH)
- **Vấn đề**: Gateway crash khi PID file chứa PID đã được reuse bởi process khác
- **Impact**: Crash loop, không thể khởi động gateway
- **Tình trạng**: Có PR #2813 đang xử lý
- **Bình luận**: 5 comments - nhiều người gặp vấn đề tương tự

#### 📊 **#2404 - Streaming HTTP request** (👍 1)
- Yêu cầu thêm config `"streaming": true` để gửi streaming request tới LLM backend
- Tương tự Python OpenAI client behavior
- **Stale** nhưng vẫn được cộng đồng quan tâm

#### 📱 **#2625 - WhatsApp support trong compiled builds** (👍 1)
- User trên Raspberry Pi Zero 2 cần WhatsApp support
- Default arm64 build không include WhatsApp
- Yêu cầu thêm compiler flags

## 5. 🐛 Ổn định & Bugs

### **Critical Bugs đang được xử lý**

#### 🚨 **Resource Leaks & Stability** (Improvement Report)
Có vẻ team đã tạo một `improvement-report.md` nội bộ và đang systematically fix các issues:

1. **Agent loop resource leaks** → Fixed in #2904
2. **Context expiration handling** → Fixed in #2905  
3. **Message bus backpressure** → Fixed in #2906
4. **JSONL crash consistency** → Fixed in #2907

#### 🔐 **Security Vulnerabilities**
- **MQTT TLS bypass** → Fixed in #2899
- **Web backend security** → Fixed in #2900
- **Sandbox escape** → Fixed in #2693

#### ⚠️ **Known Issues**
- **#2769** (CLOSED): Authentication failures với valid API keys - có vẻ đã resolved
- **#2720** (OPEN): PID check bug - đang có PR fix
- **Context budget overflow** → Fixed in #2895

## 6. ✨ Yêu cầu tính năng

### **Tính năng mới được đề xuất**

#### 🤖 **#2901 - Native GPT4Free (g4f) Support**
- **Use case**: Low-cost inference cho lightweight hardware (homelabs, Raspberry Pi)
- **Đề xuất**: 
  - First-class g4f provider support
  - Automatic model fallback
  - Proxy routing
- **Tình trạng**: Mới tạo hôm nay, chưa có phản hồi

#### 🧠 **#2903 - DeepSeek thinking fields mapping**
- **Vấn đề**: DeepSeek treated as OpenAI-compatible nhưng thinking-mode controls không match
- **Yêu cầu**: Map `thinking_level` correctly cho DeepSeek
- **Tình trạng**: Mới tạo, chưa có discussion

#### 📨 **#2855 - Rich outbound delivery cho message tool**
- **Vấn đề**: Message tool chỉ support text, phải split media và text
- **Đề xuất**: Support media attachments và channel-aware rich delivery
- **Tình trạng**: Có PR #2856 đang implement

#### 🎨 **#1950 - Streaming output cho Web Chat**
- Enhancement request từ tháng 3
- **Stale** nhưng vẫn open
- 9 comments - có discussion

## 7. 👥 Phản hồi người dùng

### **Pain Points từ cộng đồng**

1. **Platform-specific builds**: 
   - Raspberry Pi users cần WhatsApp support (#2625)
   - Android Termux users cần dedicated guide (#2902 - đã có PR)

2. **Authentication issues**:
   - Multiple reports về 401 errors với valid API keys (#2769)
   - Đã được close - có vẻ fixed

3. **Stability concerns**:
   - PID file issues causing crash loops (#2720)
   - Resource leaks trong production (#2904, #2906)

4. **Feature gaps**:
   - Streaming support (#2404, #1950)
   - Rich media handling (#2855)
   - Low-cost inference options (#2901)

### **Positive signals**
- Team rất responsive với bug reports
- Systematic approach to fixing stability issues
- Good documentation efforts (Android guide)

## 8. 🗺️ Backlog & Roadmap

### **Immediate Focus (đang active)**
✅ **Stability & Security** - Đang được prioritize cao
- Resource leak fixes
- Security hardening
- Crash recovery

### **Short-term (có PRs đang review)**
- Rich media support (#2856)
- Provider metadata refactoring (#2896)
- Thinking mode improvements (#2898)

### **Medium-term (có issues, chưa có PRs)**
- Streaming support (#2404, #1950)
- GPT4Free integration (#2901)
- DeepSeek thinking mapping (#2903)
- Platform-specific builds (#2625)

### **Stale items cần attention**
- 6 issues/PRs được tag `stale` - cần review để close hoặc revive
- Một số enhancement requests từ tháng 3-4 chưa được address

---

## 📌 Kết luận

**PicoClaw đang trong giai đoạn "quality consolidation"** sau một period phát triển tính năng. Team đang systematically fix các stability và security issues được report từ production usage. Đây là dấu hiệu tốt cho sự trưởng thành của dự án.

**Điểm mạnh**: Responsive team, systematic bug fixing, good security awareness

**Điểm cần cải thiện**: Backlog management (nhiều stale issues), platform-specific support, streaming features

**Khuyến nghị**: Nên đợi stable release tiếp theo trước khi upgrade production deployments.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - 21/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 21/05 chứng kiến sự bùng nổ về tích hợp và bảo mật với 18 PR (3 merged) và 3 issue mới. Điểm nhấn là **tích hợp ACP (Agent Client Protocol)** cho phép NanoClaw kết nối với IDE như WebStorm, cùng với loạt cải tiến về container runtime và bảo mật agent-to-agent. Dự án đang chuyển hướng mạnh mẽ sang **developer tooling** và **enterprise security**.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng có 3 PR quan trọng được merge:
- **#2057**: Sửa lỗi cài đặt systemd trên LXC
- **#2054**: Khắc phục setup bị treo do sudo prompts ẩn
- **#2052**: Auto-bootstrap OneCLI admin cho lần cài đầu tiên

→ Các fix này chuẩn bị nền tảng cho release ổn định hơn, đặc biệt với môi trường containerized.

---

## 📈 Tiến độ dự án

### 🔥 Tính năng nổi bật

**1. Tích hợp ACP - Bước đột phá IDE integration** (#2542, #2575)
- **ACP Client Protocol provider**: NanoClaw giờ có thể hoạt động như editor/client trong Agent Client Protocol
- **claw-acp server bridge**: Demo thành công với WebStorm AI Chat - agent có thể đọc file từ IDE qua `fs/read_text_file`
- **Ý nghĩa**: Mở đường cho NanoClaw trở thành backend AI cho mọi IDE hỗ trợ ACP, cạnh tranh trực tiếp với GitHub Copilot/Cursor

**2. Context-window awareness** (#2573)
- Agent giờ biết được mức độ sử dụng context window của chính nó
- Cho phép agent tự điều chỉnh workload dựa trên budget còn lại
- Tương tự "Context: X/Y (Z%)" trong Claude Code nhưng ở cấp độ model

**3. RTK integration** (#2571)
- Tích hợp [rtk](https://github.com/rtk-ai/rtk) - CLI proxy tiết kiệm 60-90% token
- Tự động hook vào git, cargo, pytest, docker, kubectl
- Giảm chi phí API đáng kể cho dev workflows

### 🔒 Bảo mật (4 PR security-focused)

**Xu hướng rõ ràng**: Dự án đang hardening security boundaries trước khi scale

1. **#2566**: Scope channel approval - admin chỉ kết nối channel với group họ quản lý
2. **#2383**: Authorize `create_agent` actions - ngăn agent tự tạo agent khác tùy tiện
3. **#1999**: Reject symlinked host directories - chặn symlink attack
4. **#2004**: Trust only canonical channels remote - chỉ tin tưởng git remote chính thức

### 🐛 Bug fixes quan trọng

- **#2496**: Fix outbound DB write access - command-gate deny responses giờ được gửi đúng
- **#2572**: Rootless Podman compatibility - sửa 2 bug ngăn agent hoạt động dưới rootless mode
- **#2567**: Import CLAUDE.local.md - per-group memory giờ thực sự reach agent
- **#2531**: Suppress duplicate text khi `send_message` fires mid-turn

---

## 💬 Điểm nổi bật cộng đồng

**Tương tác thấp** (0 comments trên cả 3 issue mới) - có thể do:
- Issues mới được tạo trong 24h qua
- Cộng đồng nhỏ hoặc tập trung vào Discord/Slack
- Issues kỹ thuật cao, ít người có context để comment

**Issues đáng chú ý**:
- **#2574**: Branch `skill/apple-container` stale - cảnh báo về merge conflict lớn
- **#2570**: WhatsApp @-mention bug - UX issue ảnh hưởng shared-number mode
- **#2569**: Emoji reaction broken - schema vs implementation mismatch

---

## 🔧 Ổn định & Bugs

### Vấn đề nghiêm trọng

**1. Container infrastructure rollback risk** (#2574)
- Branch `skill/apple-container` lỗi thời 200+ commits
- Merge sẽ mất công việc container gần đây
- **Tác động**: Block tính năng Apple container nếu không rebase cẩn thận

**2. WhatsApp engagement logic flaw** (#2570)
- Agent phản hồi khi @-mention operator thay vì bot
- **Root cause**: Pattern matching không phân biệt bot vs operator trong shared-number mode
- **Workaround**: Chuyển sang dedicated number mode

**3. Emoji reaction platform incompatibility** (#2569)
- Schema yêu cầu shortcode (`thumbs_up`) nhưng handler pass verbatim
- Breaks trên WhatsApp + Discord
- **Fix needed**: Normalize emoji format ở handler layer

### Bugs đã fix (merged PRs)

✅ Setup hangs với sudo prompts ẩn  
✅ OneCLI authentication failure trên fresh install  
✅ Systemd không cài được trên LXC  
✅ Outbound DB readonly error  

---

## 💡 Yêu cầu tính năng

**Từ PRs đang mở**:

1. **Pluggable central DB** (#1723) - SQLite + optional SeekDB
   - Cho phép scale database layer
   - Hỗ trợ distributed deployments
   
2. **Admin cancel commands** (#2143) - đã merged
   - Cho phép admin dừng agent runs đang chạy
   - Critical cho production management

**Implicit requests từ bugs**:
- Better emoji normalization layer
- Improved WhatsApp mention detection
- Stale branch detection/warnings trong CI

---

## 👥 Phản hồi người dùng

**Thiếu feedback trực tiếp** trong issues/PRs, nhưng có thể suy luận:

**Pain points được address**:
- Setup experience (3 PRs fix setup bugs) → Users gặp khó khăn khi onboard
- Rootless Podman support → Enterprise users cần non-root containers
- Security boundaries → Teams cần multi-tenant safety

**Positive signals**:
- ACP integration có demo screenshot → Feature được test thực tế
- RTK integration → Community request về cost optimization
- Context awareness → Power users muốn control chi tiết hơn

---

## 🗺️ Backlog & Roadmap

### Đang trong pipeline (Open PRs)

**High priority** (security + stability):
- 4 security PRs chờ review (#1999, #2004, #2383, #2566)
- Rootless Podman fix (#2572)
- Stale branch resolution (#2574)

**Feature development**:
- ACP integration (2 PRs) - likely merge soon dựa trên demo quality
- Pluggable DB (#1723) - long-running architectural change
- Context awareness (#2573) - core capability enhancement

### Xu hướng phát triển

**1. IDE-first strategy**
- ACP integration → Universal IDE backend
- Context awareness → Better developer experience
- RTK → Cost-effective for dev workflows

**2. Enterprise readiness**
- Security hardening (4 active PRs)
- Multi-tenant isolation
- Admin controls (cancel commands)

**3. Platform expansion**
- WhatsApp improvements
- Container runtime compatibility (LXC, rootless Podman)
- Pluggable architecture (DB, channels)

### Dự đoán roadmap

**Q2 2026** (hiện tại):
- ✅ Stabilize setup experience
- 🔄 Complete ACP integration
- 🔄 Merge security PRs

**Q3 2026** (dự kiến):
- 🎯 Official IDE extensions (VS Code, JetBrains)
- 🎯 SeekDB production deployment
- 🎯 Advanced admin dashboard

---

## 📊 Metrics tổng quan

| Metric | Giá trị | Xu hướng |
|--------|---------|----------|
| PRs mở | 15 | ↗️ Tăng (nhiều feature lớn) |
| PRs merged | 3 | → Ổn định |
| Issues mới | 3 | → Bình thường |
| Security focus | 4 PRs | ↗️ Tăng mạnh |
| Community engagement | Thấp | ↘️ Cần cải thiện |

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn **maturation** với focus rõ ràng vào:
1. **Developer tooling** (ACP, IDE integration)
2. **Enterprise security** (4 security PRs đồng thời)
3. **Production stability** (setup fixes, container compatibility)

Dự án có tiềm năng lớn với ACP integration, nhưng cần cải thiện community engagement và documentation để scale adoption. Security-first approach là tín hiệu tích cực cho enterprise adoption.

**Recommendation**: Theo dõi sát PR #2575 (claw-acp) - đây có thể là game-changer cho positioning của NanoClaw trong AI coding tools landscape.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo phân tích IronClaw - Ngày 2026-05-21

## 1. 🎯 Tóm tắt hôm nay

Dự án IronClaw đang trong giai đoạn tái cấu trúc lớn với kiến trúc **Reborn**, tập trung vào việc di chuyển các thành phần cốt lõi sang hệ thống mới. Hoạt động chính xoay quanh việc xây dựng các service boundaries, cải thiện isolation và security, đồng thời thiết lập infrastructure cho WebUI v2 và các built-in capabilities. Có 46 PRs đang hoạt động với 12 issues được theo dõi, phản ánh tốc độ phát triển cao và sự phối hợp chặt chẽ giữa các thành viên core team.

## 2. 📦 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng PR #3708 đang chuẩn bị release với các thay đổi breaking:

- `ironclaw_common`: 0.4.2 → 0.5.0 (⚠️ API breaking changes)
- `ironclaw`: 0.24.0 → 0.28.2

Các thay đổi breaking chủ yếu liên quan đến enum discriminant values, cho thấy đang có sự điều chỉnh về data structures cơ bản.

## 3. 🚀 Tiến độ dự án

### **Kiến trúc Reborn - Trọng tâm chính**

Dự án đang thực hiện migration lớn sang kiến trúc "Reborn" với nhiều "lanes" song song:

#### **Lane 1-3: Core Runtime & Composition** ✅ Tiến triển tốt
- **#3800** (CLOSED): REPL golden path hoàn thành
- **#3816** (CLOSED): Shell được port sang Reborn built-ins
- **#3803** (OPEN): Đang wire secrets/egress substrate cho production tools

#### **Lane 5-9: Capabilities & Extensions** 🔄 Đang triển khai
- **#3805**: Notion MCP capability path
- **#3829**: Google Calendar & Gmail extension-v2
- **#3807**: WebUI beta route/tool surface

#### **Security & Isolation** 🔒 Ưu tiên cao
- **#3820** (CLOSED): Runtime policy enforcement trước khi dispatch
- **#3818** (CLOSED): Staged credentials cho production egress
- **#3767** (OPEN): NoExposureGuard service với leak detection
- **#3822** (OPEN): Scoped isolation test coverage

#### **WebUI v2 Migration** 🌐 Đang xây dựng
- **#3815** (OPEN): Gateway composition với 3 reviewers đang review
- **#3828** (OPEN): Delegate serve to WebUI ingress
- **#3590** (OPEN): Telegram v2 inbound tracer (webhook → ledger)

### **Xu hướng phát triển**

📈 **Tích cực:**
- Tốc độ merge cao: 9 PRs được close trong 24h
- Test coverage được chú trọng: nhiều PRs test-only (#3741, #3822, #3819)
- Security-first approach: mọi capability đều qua policy check

⚠️ **Thách thức:**
- Scope rất lớn: 46 PRs đang mở, nhiều dependencies phức tạp
- Breaking changes liên tục trong quá trình refactor
- Cần coordination cao giữa các lanes

## 4. 💬 Điểm nổi bật cộng đồng

### **Top PRs theo tương tác**

1. **#3590 - Telegram v2 inbound tracer** (XL, medium risk)
   - Scope lớn: webhook → ledger → binding
   - Chưa có reply path (intentionally stubbed)
   - Quan trọng cho multi-channel support

2. **#3708 - Release PR** 
   - Chứa breaking changes cần review kỹ
   - Đang chờ merge để release version mới

3. **#3834-#3836 - Benchmark dispatcher** 🆕
   - Thêm `/benchmark` slash command cho PRs
   - #3835 đã fix permission issue nhanh chóng
   - #3836 cải thiện UX với "started" comment

### **Issues được quan tâm**

- **#3811** (NEW): Wire product auth service - bước 2 của auth refactor
- **#3821** (NEW): Bug nghiêm trọng - `Thread::restore_from_messages` drops orphan assistant rows, ngăn out-of-band context injection
- **#1519**: Routine notifications thiếu context - issue cũ vẫn chưa giải quyết

## 5. 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng**

🔴 **#3821 - Thread restoration bug** (Mới phát hiện)
- `Thread::restore_from_messages` chỉ mở Turn khi gặp `Role::User`
- Assistant messages không có User message trước bị drop
- Ảnh hưởng: ngăn out-of-band context injection
- Chưa có PR fix

### **Stability improvements**

✅ **Đã giải quyết:**
- #3765 (CLOSED): Preserve typed filesystem errors trong ProcessError
- #3818 (CLOSED): Enforce staged credentials - ngăn credential leaks
- #3820 (CLOSED): Runtime policy gate - security improvement

🔄 **Đang xử lý:**
- #3831: Finish staged secret egress framework
- #3767: NoExposureGuard với sanitized violations

## 6. ✨ Yêu cầu tính năng

### **Đang implement**

1. **Multi-channel support** (#3580, #3590)
   - WebUI v2 native surface
   - Telegram v2 với webhook + ledger
   - Cần ProductAdapter/ProductWorkflow stack

2. **Extension system v2** (#3829, #3805)
   - Google Calendar & Gmail native
   - Notion MCP capability
   - IronHub tool installation (#3737)

3. **Auth & Approval flows** (#3094, #3811)
   - ApprovalInteractionService
   - AuthInteractionService
   - Product auth service seam

4. **Developer experience**
   - `/benchmark` slash command (#3808, #3834)
   - Temperature control in Responses API (#3641)
   - Better error messages (#3765)

### **Backlog**

- **#3290**: Migrate missions, jobs, legacy routines (P2)
- **#1519**: Routine notifications context (enhancement)
- **#3473**: Wire SkillContextService (P1)

## 7. 👥 Phản hồi người dùng

### **Pain points từ issues**

1. **Context loss** (#1519)
   - Routine notifications thiếu context trong chat thread
   - User phải switch giữa routine conversation và main thread
   - Ảnh hưởng UX nghiêm trọng

2. **Thread restoration** (#3821)
   - Technical issue nhưng ảnh hưởng đến reliability
   - Có thể gây mất data trong edge cases

### **Positive signals**

- Team responsive: bugs được phát hiện và track nhanh
- Test coverage tốt: nhiều test-only PRs
- Documentation: PRs có docs updates
- CI/CD improvements: benchmark automation

## 8. 🗺️ Backlog & Roadmap

### **Immediate priorities (đang làm)**

```
Week 1-2:
├─ Finish Reborn core lanes (1-3) ✅ Gần xong
├─ WebUI v2 composition (#3815) 🔄 In review
├─ Security hardening (#3767, #3831) 🔄 In progress
└─ Fix Thread restoration bug (#3821) ⚠️ Cần urgent
```

### **Next phase (2-4 weeks)**

```
Phase 2:
├─ Extension capabilities (lanes 5-9)
│  ├─ Notion MCP (#3805)
│  ├─ Google integrations (#3829)
│  └─ IronHub tools (#3737)
├─ Multi-channel rollout
│  ├─ Telegram v2 reply path (#3590)
│  └─ WebUI v2 beta (#3807)
└─ Auth/Approval services (#3094, #3811)
```

### **Future work (P2)**

- Missions & jobs migration (#3290)
- Routine notifications context (#1519)
- Skill context wiring (#3473)

---

## 📌 Kết luận

**Điểm mạnh:**
- ✅ Tốc độ phát triển cao, team coordination tốt
- ✅ Security-first approach rõ ràng
- ✅ Test coverage được chú trọng
- ✅ CI/CD automation cải thiện

**Cần chú ý:**
- ⚠️ Bug #3821 cần fix urgent
- ⚠️ Scope quá lớn, nhiều dependencies
- ⚠️ Breaking changes liên tục trong refactor
- ⚠️ Issue #1519 (UX) chưa được ưu tiên

**Đánh giá tổng thể:** Dự án đang trong giai đoạn transformation lớn với kiến trúc Reborn. Mặc dù có nhiều thách thức về coordination và breaking changes, team đang làm việc hiệu quả với focus rõ ràng vào security và modularity. Cần theo dõi sát bug #3821 và tiến độ WebUI v2 migration.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# Báo cáo phân tích LobsterAI - Ngày 2026-05-21

## 📊 Tóm tắt hôm nay

Dự án LobsterAI đang trong giai đoạn tích cực xử lý backlog với 24 PRs được đóng trong ngày, tập trung vào cải thiện trải nghiệm người dùng và sửa lỗi kỹ thuật. Không có release mới, nhưng có nhiều cải tiến đáng chú ý về UI/UX, tính ổn định của OpenClaw gateway, và khả năng tùy chỉnh model. Một số vấn đề nghiêm trọng về xung đột cổng và lỗi khởi động vẫn đang được xử lý.

## 🚀 Releases

**Không có release mới trong ngày hôm nay.**

## 📈 Tiến độ dự án

### PRs được merge (24 PRs đóng)

**Cải tiến chính:**

- **#2023** - Cải thiện độ ổn định và tỷ lệ thành công của browser và webfetch
- **#2022** - Tối ưu trải nghiệm xem trước HTML và hiển thị source code trong artifacts
  - Lazy loading cho source code preview
  - Hỗ trợ dark/light theme
  - Kiểm tra file tồn tại trước khi preview
  
- **#2021** - Hỗ trợ `contextWindow` cho package models, cho phép backend kiểm soát độ dài context truncation

- **#2020** - Sửa lỗi cửa sổ hiển thị quá nhỏ trên Windows khi sử dụng multi-monitor với DPI khác nhau

- **#2019** - Tính năng quan trọng: Model custom params + thinking block display
  - Cho phép truyền tham số tùy chỉnh (như `thinking`, `temperature`) qua JSON
  - Hiển thị thinking block độc lập với streaming support
  - Sửa lỗi message ordering

- **#2018** - Tránh restart OpenClaw gateway khi refresh token

- **#2015** - Xử lý OpenClaw compaction retries và tool result gaps

### Xu hướng phát triển

**Tập trung vào 3 trụ cột chính:**

1. **Ổn định hệ thống** - Sửa lỗi gateway, xử lý edge cases trong streaming
2. **Trải nghiệm người dùng** - Cải thiện UI/UX cho artifacts, preview, notifications
3. **Khả năng mở rộng** - Custom model params, context window control

## 🔥 Điểm nổi bật cộng đồng

### Issue #1698 - Xung đột gateway nghiêm trọng ⚠️
- **Vấn đề**: Khi chạy LobsterAI (有道龙虾) và cài đặt thêm 智企帝王蟹, xảy ra xung đột cổng gateway và process competition
- **Tác động**: Gateway authentication failed, 智企帝王蟹 không phản hồi
- **Tỷ lệ**: 100% reproduce
- **Trạng thái**: OPEN, 2 comments, đang chờ xử lý
- **Mức độ nghiêm trọng**: P0 - Blocker cho multi-product deployment

### Issue #2017 - Lỗi khởi động local development
- **Vấn đề**: Không thể login, không nhập được câu hỏi, không tạo được task
- **Lỗi**: "未检测到内置 OpenClaw runtime（cfmind），请先执行打包前构建脚本"
- **Trạng thái**: OPEN, 1 comment
- **Ảnh hưởng**: Developer experience, onboarding mới

### Issue #1568 - Cấu hình DingTalk streaming ✅
- **Trạng thái**: CLOSED
- **Vấn đề**: Không biết cách cài đặt dingtalk-openclaw-connector
- **Kết quả**: Đã được giải quyết

## 🐛 Ổn định & Bugs

### Bugs đã sửa trong ngày

1. **Multi-monitor DPI issues** (#2020) - Windows users với nhiều màn hình DPI khác nhau
2. **Gateway restart on token refresh** (#2018) - Tránh downtime không cần thiết
3. **Message ordering** (#2019) - Thinking blocks hiển thị đúng vị trí
4. **HTML preview errors** (#2022) - Kiểm tra file existence trước khi render

### Bugs đang xử lý (Stale PRs)

Có **16 PRs được đánh dấu [stale]** đang chờ review/merge, bao gồm:

- **#1626** - Sửa lỗi gateway không khởi động do invalid config fields (P0)
- **#1582** - Sửa lỗi pip không hoạt động trên Windows do file cũ không được overwrite
- **#1576** - Race condition trong SSE stream listeners
- **#1597** - SQLite foreign key constraints không được enable, gây orphan data

### Vấn đề kỹ thuật cần ưu tiên

1. **Gateway stability** - Xung đột cổng, config validation, restart logic
2. **Windows compatibility** - Python setup, DPI handling, pip issues
3. **Database integrity** - Foreign key constraints, cascade deletes
4. **Streaming reliability** - SSE listeners, race conditions

## ✨ Yêu cầu tính năng

### Tính năng đã implement (từ stale PRs)

1. **#1548** - Timer cho streaming activity bar và tool call groups
2. **#1553** - File preview panel với drag-to-resize (320-900px)
   - Markdown rendering, HTML sandbox, SVG inline, syntax highlighting
3. **#1557** - Search/filter trong settings sidebar
4. **#1573** - Slash commands cho IM channels (`/help`, `/status`, `/new`, `/compact`)
5. **#1578** - Bash syntax highlighting trong permission approval modal
6. **#1580** - Image thumbnail preview (64×64) trong prompt input
7. **#1583** - "Recently Used" tab cho Skills với usage count tracking
8. **#1615** - Cải thiện session export quality + copy-to-clipboard
9. **#1621** - System notifications khi scheduled task hoàn thành

### Tính năng đang chờ merge

Nhiều tính năng UX improvement đã hoàn thiện code nhưng chưa được merge do process review chậm.

## 💬 Phản hồi người dùng

### Tích cực
- Cộng đồng đang tích cực contribute PRs với nhiều cải tiến UX chi tiết
- Nhiều developer quan tâm đến integration với IM platforms (DingTalk, Telegram, etc.)

### Tiêu cực
- **Frustration về gateway issues** - Xung đột cổng ảnh hưởng production deployment
- **Local development setup khó** - Lỗi OpenClaw runtime gây khó khăn cho contributors mới
- **Slow PR review process** - 16 PRs stale, một số đã 40+ ngày chưa được merge

### Pain points chính

1. Multi-product deployment conflicts (LobsterAI + 帝王蟹)
2. Windows development environment setup
3. Documentation thiếu cho advanced features (IM connectors, custom models)

## 📋 Backlog & Roadmap

### Backlog hiện tại

**High Priority:**
- Giải quyết gateway port conflicts (#1698)
- Merge các stale PRs về stability (#1626, #1582, #1576, #1597)
- Cải thiện local development setup (#2017)

**Medium Priority:**
- Merge các UX improvements (16 stale PRs)
- Hoàn thiện IM integration documentation
- Cải thiện Windows compatibility

**Low Priority:**
- Feature enhancements (timers, previews, notifications)

### Roadmap insights

Dựa trên pattern của PRs:

1. **Q2 2026 Focus**: Stability & Core Experience
   - Gateway reliability
   - Cross-platform compatibility
   - Developer experience

2. **Emerging themes**:
   - **AI Model Flexibility** - Custom params, context window control
   - **Multi-channel Support** - IM platforms, slash commands
   - **Developer Tools** - Better debugging, export, notifications
   - **Enterprise Features** - Multi-product deployment, permission management

### Khuyến nghị

1. **Urgent**: Tăng tốc độ review PRs - 16 stale PRs là bottleneck lớn
2. **Critical**: Giải quyết gateway conflicts trước khi scale deployment
3. **Important**: Cải thiện documentation cho setup và advanced features
4. **Nice-to-have**: Merge các UX improvements để tăng user satisfaction

---

**Tổng kết**: LobsterAI đang trong giai đoạn maturity với focus vào stability và UX polish. Cộng đồng contributor tích cực nhưng process review cần được tối ưu. Các vấn đề về gateway và Windows compatibility cần được ưu tiên để đảm bảo adoption rộng rãi.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo phân tích dự án Moltis - Ngày 21/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 20/05 đánh dấu một đợt merge code quan trọng với 3 PR được đóng, tập trung vào việc cải thiện độ ổn định hệ thống. Các vấn đề về quản lý process, đồng bộ vault security, và khả năng mở rộng memory system đã được giải quyết. Cộng đồng đang đề xuất 2 tính năng mới: tích hợp tài liệu OOTB và hỗ trợ Google Antigravity SDK.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### Pull Requests đã merge (3 PRs)

**🔐 #1026 - Đồng bộ hóa vault password**
- **Tác giả**: @penso
- **Vấn đề giải quyết**: Trước đây việc thay đổi auth password và vault password không atomic, dẫn đến rủi ro mismatch
- **Giải pháp**: 
  - Đảm bảo rotation password atomic giữa auth và vault
  - Reject các flow first-password/reset có thể tạo mismatch với sealed vault
  - Thêm regression test coverage
- **Ý nghĩa**: Tăng cường bảo mật và tính nhất quán của hệ thống vault

**⚡ #1009 - Fix memory leak trong QMD timeout**
- **Tác giả**: @gmoigneu  
- **Vấn đề**: `QmdManager::run_with_timeout` leak child process khi timeout vì `Command::output()` không set `kill_on_drop`
- **Giải pháp**: Explicitly kill child process khi timeout
- **Impact**: Ngăn chặn resource leak nghiêm trọng, đặc biệt quan trọng cho long-running instances

**📁 #1010 - Mở rộng memory system**
- **Tác giả**: @gmoigneu
- **Cải tiến**:
  - Hỗ trợ nested subfolders trong memory operations
  - Collection-aware writes cho `memory_save`/`memory_delete`
  - Trước đây chỉ hỗ trợ `MEMORY.md`, `memory.md`, hoặc `memory/<single-name>.md`
  - Giờ có thể target arbitrary directory layouts (`memory/**`, `agents/**`, custom collections)
- **Ý nghĩa**: Tăng tính linh hoạt trong tổ chức và quản lý knowledge base

### Xu hướng phát triển

✅ **Focus vào stability & reliability**: Cả 3 PRs đều giải quyết các vấn đề về độ ổn định hệ thống  
✅ **Cải thiện architecture**: Memory system được mở rộng để hỗ trợ use cases phức tạp hơn  
✅ **Security hardening**: Vault password sync cho thấy sự chú trọng đến bảo mật

---

## 🌟 Điểm nổi bật cộng đồng

### Issue #977 - Browser sandbox Docker bug [CLOSED]

**Mức độ quan tâm**: Trung bình (3 comments, 0 reactions)

**Vấn đề**: Browser sandbox fails khi Moltis chạy trong Docker container (LXC trên Proxmox)
- Docker socket được mount cho sandbox execution
- Named volume cho data directory
- Browser sandbox mode enabled

**Trạng thái**: Đã được đóng vào 20/05, cho thấy vấn đề đã được giải quyết

**Insight**: Đây là vấn đề deployment phổ biến với containerized environments, việc giải quyết nhanh (trong 2 tuần) cho thấy team responsive với infrastructure issues.

---

## 🐛 Ổn định & Bugs

### Đã giải quyết ✅

1. **Memory leak trong QMD timeout** (#1009)
   - Severity: High
   - Mỗi timeout leak một child process
   - Đã fix bằng explicit process termination

2. **Vault password mismatch** (#1026)
   - Severity: High (security)
   - Race condition giữa auth và vault password changes
   - Đã fix với atomic operations

3. **Browser sandbox Docker compatibility** (#977)
   - Severity: Medium
   - Blocking cho Docker deployments
   - Đã resolved

### Đánh giá

🟢 **Tình trạng ổn định tốt**: Không có bug critical mới được report trong 24h qua. Team đang proactive trong việc fix các vấn đề về resource management và security.

---

## 💡 Yêu cầu tính năng

### #1028 - Agent access to Moltis docs OOTB

**Đề xuất bởi**: @IlyaBizyaev  
**Mức độ quan tâm**: Mới (1 comment)

**Nội dung**: Agent nên có sẵn access đến Moltis documentation out-of-the-box

**Phân tích**:
- Cải thiện developer experience
- Giảm friction khi onboarding
- Self-documenting system - agent có thể tự tra cứu capabilities
- Phù hợp với xu hướng "docs as code" và AI-native workflows

**Khả năng thực hiện**: Cao - có thể implement bằng cách pre-load docs vào memory collection hoặc tích hợp RAG pipeline

---

### #1027 - Support Google Antigravity SDK

**Đề xuất bởi**: @BrandonStudio  
**Mức độ quan tâm**: Mới (0 comments)

**Nội dung**: Hỗ trợ Google Antigravity SDK như một provider

**Phân tích**:
- Mở rộng ecosystem integrations
- Google Antigravity SDK (giả định là một AI/ML SDK mới của Google)
- Tăng tính cạnh tranh với các AI agent platforms khác

**Lưu ý**: Cần thêm thông tin về use cases cụ thể và priority so với các providers hiện có

---

## 💬 Phản hồi người dùng

### Sentiment tổng quan: 🟢 Tích cực

**Điểm mạnh được đánh giá cao**:
- Team responsive với bug reports (issue #977 resolved trong 2 tuần)
- Continuous improvements về stability
- Mở rộng capabilities (nested memory folders)

**Pain points**:
- Docker deployment complexity (đã được giải quyết)
- Documentation accessibility (đang được đề xuất cải thiện)

**Engagement level**: Trung bình - Issues mới có ít reactions nhưng được follow-up nhanh

---

## 🗺️ Backlog & Roadmap

### Backlog hiện tại

**High priority** (dựa trên activity):
1. ✅ Stability fixes (đang được xử lý tích cực)
2. 🔄 Documentation accessibility (#1028)
3. 🔄 Provider ecosystem expansion (#1027)

### Xu hướng phát triển

**Ngắn hạn** (1-2 tuần tới):
- Tiếp tục hardening stability sau các fixes gần đây
- Có thể có release mới tích hợp các PRs đã merge
- Xem xét implementation cho docs OOTB feature

**Trung hạn** (1-3 tháng):
- Mở rộng provider integrations (Google Antigravity, etc.)
- Cải thiện containerization support
- Enhanced memory/knowledge management capabilities

### Insights chiến lược

🎯 **Moltis đang trong giai đoạn maturity**: Focus chuyển từ feature development sang stability & reliability  
🔧 **Infrastructure-first approach**: Ưu tiên giải quyết deployment và operational issues  
🤝 **Community-driven**: Lắng nghe và respond nhanh với user feedback  
📚 **Self-service direction**: Xu hướng làm cho agent tự động hơn (docs OOTB)

---

## 📊 Metrics tóm tắt

| Metric | Giá trị | Xu hướng |
|--------|---------|----------|
| PRs merged | 3 | 🟢 Cao |
| Issues closed | 1 | 🟢 Bình thường |
| New issues | 2 | 🟡 Trung bình |
| Bug severity | Low-Medium | 🟢 Tốt |
| Community engagement | Medium | 🟡 Ổn định |
| Release cadence | N/A | ⚪ Chờ release |

---

**Kết luận**: Moltis đang có một ngày làm việc productive với focus vào quality và stability. Việc merge 3 PRs quan trọng cho thấy team đang actively maintain codebase. Hai feature requests mới mở ra hướng phát triển thú vị cho tương lai. Dự án đang trong trạng thái healthy với balance tốt giữa innovation và stability.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo Phân tích Hệ sinh thái AI Agent - CoPaw (QwenPaw)
## Ngày 21/05/2026

---

## 1. 📊 Tóm tắt hôm nay

Ngày 20-21/05 chứng kiến hoạt động cực kỳ sôi động với **36 PRs** và **23 issues** được xử lý. Dự án tập trung vào việc **ổn định plugin Pet**, **cải thiện trải nghiệm kênh tích hợp** (WeChat, Feishu), và **mở rộng hệ sinh thái** với Skill Market và Coding Mode. Phiên bản **v1.1.8.post1** được phát hành khẩn cấp để sửa lỗi nghiêm trọng về backup và tích hợp OpenCode Go.

---

## 2. 🚀 Releases

### **v1.1.8.post1** (Phát hành: 2026-05-20)

**Tính năng chính:**
- ✅ **Tích hợp OpenCode Go**: Thêm endpoint mới `https://opencode.ai/zen/go/v1` vào provider OpenCode, mở rộng từ 6 lên 12 models (#4536)
- 🔧 **Sửa lỗi backup nghiêm trọng**: Khắc phục vấn đề không thể restore secrets khi chạy container (#4583)
- 📚 **Cải thiện tài liệu**: Bổ sung hướng dẫn về thư mục backup

**Ý nghĩa:**
- Đây là bản **hotfix** phản ứng nhanh với bug nghiêm trọng ảnh hưởng người dùng Docker
- Việc tích hợp OpenCode Go cho thấy chiến lược **đa nhà cung cấp model** để tăng tính linh hoạt
- Tốc độ phát hành nhanh (chỉ 2 ngày sau v1.1.8) thể hiện quy trình CI/CD trưởng thành

---

## 3. 🏗️ Tiến độ dự án

### **Các PR quan trọng đang mở:**

#### 🎯 **Tính năng chiến lược**

1. **Coding Mode** (#4578) - 🔥 **Game changer**
   - IDE nhúng kiểu VS Code ngay trong browser
   - Tích hợp Git, file manager, terminal
   - Prompt hệ thống chuyên biệt cho coding tasks
   - **Tác động**: Biến QwenPaw thành môi trường phát triển hoàn chỉnh

2. **Skill Market** (#4518)
   - Tích hợp 3 providers (hub chính thức + 2 bên thứ ba)
   - Tìm kiếm async fan-out, pagination "Load More"
   - Tracking provenance (`installed_from`) cho mỗi skill
   - **Tác động**: Xây dựng hệ sinh thái plugin tương tự VSCode Marketplace

3. **Goal Mode** (#4443)
   - Chế độ `/goal` cho mục tiêu dài hạn theo session
   - Hỗ trợ pause/resume/clear
   - **Tác động**: Tăng khả năng lập kế hoạch và theo dõi tiến độ

#### 🔧 **Cải thiện kỹ thuật**

4. **Tauri 2.x Desktop App** (#3813)
   - Wrap Console frontend trong Tauri webview
   - Chạy FastAPI backend như local process
   - **Tác động**: Mở rộng sang desktop native app

5. **Integration Test Suite** (#4561)
   - Mở rộng từ 4 files/~10 cases → **23 files/105 cases**
   - Module-scoped fixtures, timeout 15s
   - **Tác động**: Tăng độ tin cậy và giảm regression bugs

### **Xu hướng phát triển:**
- 📈 **Mở rộng ngang**: Skill Market, nhiều providers (OpenCode Go, Google Antigravity #4553)
- 🎨 **Trải nghiệm người dùng**: Coding Mode, Pet plugin, streaming cards
- 🔒 **Ổn định hóa**: Refactor access control (#4565), auth bypass fix (#4562)
- 🌐 **Quốc tế hóa**: Hỗ trợ tiếng Trung cho Pet plugin (#4550)

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

1. **#4539** (👍 1, 3 comments) - **Yêu cầu tự động chuyển model đa phương thức**
   - Người dùng muốn hệ thống tự động chuyển sang model vision khi gửi ảnh/video (như Doubao)
   - Phản ánh nhu cầu **trải nghiệm liền mạch** không cần can thiệp thủ công

2. **#4541** (👍 2, 2 comments) - **Pet plugin crash trên Windows**
   - Bug nghiêm trọng: gửi tin nhắn đầu tiên → QwenPaw crash hoàn toàn
   - Đã được fix trong #4564 (Windows compatibility)

3. **#4559** (7 comments) - **Hiệu năng giảm với >40 agents**
   - Trang web chậm rõ rệt khi có nhiều agents
   - Liên quan đến #3499 (bug cũ chưa giải quyết triệt để)

### **Vấn đề người dùng quan tâm:**
- 🔄 **Tự động hóa**: Routing model thông minh, cron tasks ổn định
- 🪟 **Windows support**: Pet plugin, desktop app
- ⚡ **Hiệu năng**: Rendering với nhiều agents, CPU usage cao (#4558)
- 🔐 **Bảo mật**: Backup/restore secrets, auth bypass

---

## 5. 🐛 Ổn định & Bugs

### **Bugs đã được fix (CLOSED):**

1. **WeChat iLink cron tasks thất bại** (#4477) ✅
   - `context_token` hết hạn → ret=-2 không retry
   - Gửi file/ảnh thất bại không có log
   - **Fix**: Thêm retry logic và logging

2. **Feishu CardKit streaming thất bại** (#4572) ✅
   - `sequence` khởi tạo = 0 thay vì 1 (API yêu cầu ≥1)
   - **Fix**: Đổi initial value thành 1

3. **Pet plugin crash Windows** (#4541, #4575) ✅
   - KeyboardInterrupt gây terminate process
   - **Fix**: #4564 - Windows compatibility, lifecycle management

4. **AGENTS.md load sai nội dung** (#4496) ✅
   - Load template mặc định thay vì file workspace
   - **Fix**: Chưa rõ PR cụ thể, nhưng đã đóng

5. **Backup 403 từ localhost** (#4535) ✅
   - Docker bridge → backend thấy IP khác localhost
   - **Fix**: #4563 - Bỏ host allowlist gate

### **Bugs đang xử lý (OPEN):**

1. **#4559** - Hiệu năng với >40 agents (7 comments)
2. **#4558** - CPU usage cao khi output text dài (nghi ngờ frontend rendering)
3. **#4556** - Voice transcription dùng browser API thay vì Whisper đã config
4. **#4585** - Plugin tools không auto-discover trong WeCom channel

### **Đánh giá:**
- ✅ **Tốc độ phản hồi nhanh**: Nhiều bugs được fix trong 1-2 ngày
- ⚠️ **Vấn đề tái phát**: Hiệu năng (#4559 liên quan #3499), backup (#4583 tái phát từ #3827)
- 🔍 **Cần chú ý**: Windows compatibility, channel integrations (WeChat, Feishu, WeCom)

---

## 6. 💡 Yêu cầu tính năng

### **Tính năng mới được đề xuất:**

1. **#4539** - **Tự động routing model đa phương thức** 👍 1
   - Gửi ảnh → auto dùng vision model (Gemma 3N, Qwen-VL)
   - Gửi video → auto dùng video model
   - Gửi voice → auto dùng Whisper
   - **Tương tự**: Doubao (豆包) của ByteDance

2. **#4553** - **Hỗ trợ Google Antigravity SDK**
   - Thêm provider mới cho Google Antigravity
   - Mở rộng danh sách providers

3. **#4584** - **Nâng cấp browser automation**
   - Chuyển từ CDP sang Playwright
   - Lý do: Playwright ổn định hơn cho cron tasks

4. **#4463** - **Cải thiện ước lượng context token**
   - Tái sử dụng prompt usage từ provider
   - Chỉ ước lượng delta messages mới

### **Xu hướng yêu cầu:**
- 🤖 **Tự động hóa thông minh**: Routing, scheduling
- 🔌 **Mở rộng tích hợp**: Nhiều providers, channels
- ⚡ **Tối ưu hiệu năng**: Token estimation, rendering

---

## 7. 👥 Phản hồi người dùng

### **Trải nghiệm tích cực:**
- 🎉 **Skill Market**: Người dùng hào hứng với khả năng mở rộng plugin
- 🐾 **Pet plugin**: Tính năng độc đáo, tạo sự khác biệt (mặc dù có bugs)
- 📱 **Channel integrations**: WeChat, Feishu được sử dụng nhiều trong doanh nghiệp Trung Quốc

### **Điểm đau:**

1. **Windows support chưa tốt**
   - Pet plugin crash (#4541, #4575)
   - Desktop app còn nhiều vấn đề (#3813)

2. **Hiệu năng với scale lớn**
   - >40 agents → UI lag (#4559)
   - Long text output → CPU spike (#4558)

3. **Trải nghiệm channel phức tạp**
   - WeChat cron tasks không ổn định (#4477)
   - Feishu streaming cards lỗi (#4572)
   - WeCom plugin tools không hoạt động (#4585)

4. **Thiếu tự động hóa**
   - Phải chuyển model thủ công khi gửi ảnh/video (#4539)
   - Không có routing thông minh

### **Feedback từ contributors:**
- 🌟 **First-time contributors tích cực**: 5 PRs từ contributors mới (#4536, #4577, #4580, #3813, #4298)
- 📝 **Chất lượng PR tốt**: Descriptions chi tiết, test coverage cao
- 🔄 **Review process nhanh**: Nhiều PRs được merge trong ngày

---

## 8. 📋 Backlog & Roadmap

### **Ưu tiên cao (đang triển khai):**

1. ✅ **Coding Mode** (#4578) - Sắp merge
2. ✅ **Skill Market** (#4518) - Under review
3. ✅ **Goal Mode** (#4443) - Đang hoàn thiện
4. ✅ **Tauri Desktop App** (#3813) - Long-running PR

### **Ưu tiên trung bình:**

5. 🔄 **Access Control Refactor** (#4565) - DO NOT MERGE (cần review kỹ)
6. 🔄 **Integration Test Suite** (#4561) - Cần merge để tăng coverage
7. 🔄 **Context Token Optimization** (#4463) - Cải thiện hiệu năng

### **Backlog (chưa có PR):**

- 🤖 **Tự động routing model đa phương thức** (#4539)
- 🌐 **Google Antigravity provider** (#4553)
- 🔧 **Browser automation với Playwright** (#4584)
- ⚡ **Fix hiệu năng >40 agents** (#4559)
- 🎤 **Voice transcription với Whisper** (#4556)

### **Kế hoạch dài hạn (suy đoán từ xu hướng):**

1. **Hệ sinh thái plugin trưởng thành**
   - Skill Market → Plugin Marketplace
   - Versioning, dependency management
   - Community contributions

2. **Multi-modal intelligence**
   - Tự động routing theo content type
   - Unified API cho text/image/video/audio

3. **Enterprise features**
   - Advanced access control (#4565)
   - Audit logs, compliance
   - Multi-tenant support

4. **Performance & Scale**
   - Frontend optimization cho nhiều agents
   - Distributed architecture
   - Caching strategies

---

## 🎯 Kết luận

**QwenPaw đang trong giai đoạn tăng trưởng mạnh** với:
- ✅ Tốc độ phát triển cao (36 PRs/ngày)
- ✅ Cộng đồng tích cực (first-time contributors)
- ✅ Tính năng đột phá (Coding Mode, Skill Market)
- ⚠️ Cần ổn định Windows support và channel integrations
- ⚠️ Hiệu năng cần cải thiện khi scale lớn

**Điểm mạnh:** Đa dạng providers, tích hợp channels, hệ sinh thái plugin  
**Điểm yếu:** Windows bugs, hiệu năng UI, trải nghiệm channel chưa mượt  
**Cơ hội:** Desktop app, enterprise features, multi-modal routing  
**Thách thức:** Duy trì chất lượng khi tăng trưởng nhanh, tránh regression bugs

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo phân tích GoClaw - Ngày 2026-05-21

## 1. 🎯 Tóm tắt hôm nay

GoClaw vừa phát hành **v3.12.0** với tích hợp Google Cloud Vertex AI và cải tiến MCP (Model Context Protocol). Tuy nhiên, ngay sau release, team phát hiện **4 lỗi bảo mật nghiêm trọng** liên quan đến sandbox isolation và multi-tenancy. Đồng thời có 2 PR quan trọng đang được review để khắc phục command injection và bổ sung S3 storage backend.

## 2. 🚀 Releases

### v3.12.0 (Phát hành: 2026-05-20)

**Tính năng chính:**
- ✅ **Google Cloud Vertex AI Provider**: Hỗ trợ Gemini qua Vertex AI endpoint tương thích OpenAI, với OAuth2 credential handling
- ✅ **MCP Progress Tracking**: Tích hợp độc lập MCP Agent với khả năng callback tiến độ thời gian thực
- ✅ **UI Improvements**: Hiển thị progress của MCP tools trực quan trong chat interface
- ✅ **Bitrix24 Channel**: Tích hợp kênh Bitrix24 với MCP per-user OAuth (đang trong PR #1061)

**Ý nghĩa:**
Release này đánh dấu bước tiến quan trọng trong việc mở rộng khả năng tích hợp của GoClaw với các cloud providers lớn và cải thiện trải nghiệm người dùng với long-running tasks. Tuy nhiên, việc phát hiện 4 lỗi bảo mật ngay sau release cho thấy quy trình security review cần được tăng cường.

## 3. 📈 Tiến độ dự án

### 🔴 Critical Security Issues (Mới phát hiện - 2026-05-20)

**4 lỗi bảo mật nghiêm trọng cần xử lý ngay:**

1. **#1163 - Sandbox workspace mount exposes other tenants' workspaces** 🚨
   - Sandbox mount toàn bộ workspace root thay vì chỉ tenant hiện tại
   - Agent có thể đọc/ghi workspace của tenant khác
   - **Mức độ:** Critical - Vi phạm multi-tenant isolation

2. **#1162 - Sandbox does not mount skills-store**
   - Agent không thể đọc skill files trong sandbox mode
   - Ảnh hưởng: Chức năng core bị break trong production

3. **#1164 - Skill dependency scan/install mismatch**
   - Dependency được scan ở GoClaw runtime nhưng execute ở sandbox
   - Thiếu control switch để quản lý behavior
   - Risk: Runtime errors không dự đoán được

4. **#1161 - Loader không scan tenant skills-store directories**
   - Skills của tenant bị "mất tích" sau khi tạo
   - Multi-tenant skill management bị broken

### ✅ Security Fixes (Đang review)

**#1155 - Command Injection Fix** (Tác giả: @evgyur)
- Loại bỏ `sh -c` trong FsBridge.WriteFile
- Truyền filename như discrete argv thay vì string interpolation
- Đã có regression tests cho command-substitution attacks
- **Status:** Cần merge urgently

### 🎨 Infrastructure Improvements

**#1166 - Pluggable Storage Backend + S3** (Tác giả: @ilyaseverin)
- Thêm `media.Backend` interface
- S3Backend implementation cho ephemeral hosts
- Backward compatible với filesystem backend
- **Use case:** Giải quyết vấn đề mất media khi restart trên cloud

**#1138 - Self-building OCI Runtime** (Tác giả: @keithy)
- Buildah-based self-building runtime
- Podman rootless setup improvements
- Nginx resolver refactoring
- **Status:** Long-running PR, cần review kỹ

## 4. 💬 Điểm nổi bật cộng đồng

**Mức độ tương tác thấp:**
- Tất cả 4 security issues đều có 0 comments, 0 reactions
- Cho thấy issues mới được tạo, chưa có community awareness
- Hoặc team đang xử lý internal trước khi public discussion

**Contributors hoạt động:**
- @zclDragon: Phát hiện và report cả 4 security issues (impressive security audit!)
- @evgyur: Fix command injection
- @ilyaseverin: S3 backend implementation
- @xiongxz: MCP progress tracking (2 PRs merged)
- @mrgoonie: Release management

## 5. 🐛 Ổn định & Bugs

### Critical (Cần xử lý ngay)

1. **Multi-tenant isolation broken** (#1163)
   - Workspace leak giữa các tenants
   - Cần hotfix trước khi deploy production

2. **Sandbox functionality broken** (#1162, #1164)
   - Skills không accessible trong sandbox
   - Dependency mismatch gây runtime errors

3. **Command injection vulnerability** (#1155)
   - Đã có fix, đang review
   - Cần merge và release patch version

### Medium

4. **Skill loader không hỗ trợ multi-tenant** (#1161)
   - Skills bị "mất" sau khi tạo
   - Cần refactor loader logic

**Xu hướng:** Các bugs tập trung vào **sandbox isolation** và **multi-tenancy** - hai vấn đề core của enterprise deployment. Điều này cho thấy GoClaw đang trong giai đoạn hardening cho production use.

## 6. 🎁 Yêu cầu tính năng

### Đã implement (v3.12.0)

- ✅ Google Vertex AI provider
- ✅ MCP progress tracking với UI
- ✅ Bitrix24 channel integration (đang finalize)

### Đang phát triển

- 🔄 **S3 Storage Backend** (#1166)
  - Cho phép deploy trên ephemeral infrastructure
  - Quan trọng cho Kubernetes/serverless deployments

- 🔄 **Self-building OCI Runtime** (#1138)
  - Buildah integration
  - Podman rootless support
  - Tăng flexibility trong deployment options

### Implicit requirements (từ bugs)

- 🔜 **Proper sandbox isolation** - Cần thiết kế lại mount strategy
- 🔜 **Multi-tenant skill management** - Refactor loader và storage
- 🔜 **Dependency management control** - Switch giữa runtime vs sandbox scanning

## 7. 👥 Phản hồi người dùng

**Quan sát:**
- Không có comments trên issues/PRs mới → Có thể là:
  - Issues được tạo bởi internal team, chưa có user reports
  - Community chưa kịp phản ứng (issues mới 1 ngày)
  - Hoặc user base còn nhỏ

**Positive signals:**
- MCP progress tracking được implement dựa trên user pain point (long-running tasks thiếu feedback)
- S3 backend response đến nhu cầu cloud deployment
- Security issues được phát hiện proactive (không phải từ incidents)

**Concerns:**
- 4 critical security bugs sau release cho thấy testing coverage chưa đủ
- Multi-tenant features có nhiều gaps cần fill

## 8. 📋 Backlog & Roadmap

### Immediate (Tuần này)

1. **Hotfix v3.12.1** - Cần release ngay:
   - Merge #1155 (command injection fix)
   - Fix #1163 (workspace isolation)
   - Fix #1162 (skills-store mount)
   - Fix #1161 (tenant skills loader)

2. **Security audit**:
   - Review toàn bộ sandbox implementation
   - Multi-tenant isolation testing
   - Penetration testing cho file operations

### Short-term (Tháng này)

3. **Merge #1166** (S3 backend) - Unblock cloud deployments
4. **Finalize #1061** (Bitrix24 channel) - Complete integration
5. **Review #1138** (OCI runtime) - Evaluate for merge

### Medium-term (Quý này)

6. **Sandbox architecture redesign**:
   - Proper mount isolation per tenant
   - Unified dependency management
   - Security-first design

7. **Testing infrastructure**:
   - Multi-tenant integration tests
   - Security regression tests
   - Sandbox isolation tests

---

## 🎯 Kết luận

GoClaw đang trong giai đoạn **transition từ MVP sang production-ready**. Release v3.12.0 mang đến nhiều tính năng mới hấp dẫn, nhưng đồng thời bộc lộ các vấn đề nghiêm trọng về security và multi-tenancy cần được ưu tiên xử lý. 

**Khuyến nghị:**
- ⚠️ **Không deploy v3.12.0 lên production** cho đến khi có hotfix
- 🔒 Tăng cường security review process trước mỗi release
- 🧪 Bổ sung integration tests cho multi-tenant scenarios
- 📚 Document security best practices cho contributors

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo Phân tích Hermes-Agent - 21/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 21/05 ghi nhận hoạt động phát triển cực kỳ sôi động với **9 issues mới** và **30 PRs được tạo/cập nhật** trong 24 giờ qua. Dự án đang tập trung vào 3 hướng chính: **tối ưu hiệu suất cache** (giảm 50% cache-write tokens), **cải thiện trải nghiệm gateway** (Telegram, Slack, Discord), và **nâng cấp hệ thống memory** với kiến trúc 5 tầng đột phá. Đáng chú ý là sự xuất hiện của nhiều đóng góp từ cộng đồng quốc tế (Trung Quốc, Hàn Quốc) với các tính năng tiên tiến.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng dự án đang trong giai đoạn chuẩn bị cho **v0.15.0** với nhiều cải tiến quan trọng đang được merge.

---

## 📈 Tiến độ dự án

### 🔥 PRs quan trọng đang active

**1. Tối ưu hiệu suất cache (#29568, #29567)**
- **Vấn đề**: Background review fork gửi `tools[]` rộng hơn parent → phá vỡ Anthropic prefix cache → lãng phí ~50% cache-write tokens
- **Giải pháp**: Kế thừa `enabled_toolsets`/`disabled_toolsets` từ parent agent
- **Impact**: Tiết kiệm đáng kể chi phí API cho long-running sessions

**2. Cải thiện Gateway integrations**
- **Telegram** (#29564): Observe unmentioned group messages - cho phép agent "lắng nghe" context nhóm mà không cần mention
- **Slack** (#29578): Fix thread replies trong `send_message` - sửa lỗi reply không đúng thread
- **Discord** (#26058): Auto-thread cho free_response_channels - khôi phục tính năng bị disable nhầm

**3. Security hardening**
- **XML parsing** (#28585): Thay thế stdlib XML parser bằng `defusedxml` để chống XXE attacks
- **SSH backend** (#20085): Bảo vệ directory symlinks trong bulk file extract

**4. Developer Experience**
- **CLI status bar** (#29577, #29571): Hiển thị `⚡ FAST` indicator cho priority service tier
- **Config migration** (#29576): Preserve `api_key` cho unauthenticated servers (Ollama, llama.cpp)
- **Model switching** (#29575): Probe `/v1/models` cho providers không cần API key

### 📊 Xu hướng phát triển

```
Phân bố PRs theo category:
├─ Bug fixes: 40% (12 PRs)
├─ Features: 35% (10 PRs)  
├─ Performance: 15% (4 PRs)
└─ Security: 10% (3 PRs)

Platforms được cải thiện:
├─ Telegram: 4 PRs
├─ Slack: 2 PRs
├─ Discord: 1 PR
└─ CLI/TUI: 5 PRs
```

---

## 💬 Điểm nổi bật cộng đồng

### 🌟 Issue được quan tâm nhất

**#18080 - Improved Themes for Dashboard** (22 👍, 12 comments)
- **Vấn đề**: Themes hiện tại khó đọc, dùng serif fonts nhỏ với contrast thấp
- **Yêu cầu**: Redesign với sans-serif, contrast cao hơn, accessibility compliant
- **Tình trạng**: Đang được thảo luận, chưa có PR implementation

### 🔥 Thảo luận kỹ thuật sâu

**#29549 - "心智孪生体" (Mental Twin): 5-layer Memory Architecture** (0 👍 nhưng nội dung rất chất lượng)
- Đề xuất kiến trúc memory 5 tầng (L0→L4) dựa trên first principles
- Đã implement và test với 80 test cases trên DeepSeek V4
- Phân tích sâu về giới hạn của Hermes memory hiện tại và đề xuất evolution path
- **Insight**: Cộng đồng Trung Quốc đang đóng góp research-level innovations

### ⚠️ Vấn đề người dùng gặp nhiều

**#29285 - auth.json silently overrides config.yaml** (P1 priority)
- `active_provider` trong `auth.json` ghi đè `model.provider` trong `config.yaml`
- Gây confusion nghiêm trọng cho users
- Đang được ưu tiên xử lý

---

## 🐛 Ổn định & Bugs

### Critical bugs (P1)

**1. Context compression data loss (#29559)**
- **Severity**: HIGH - mất toàn bộ context khi network error
- **Root cause**: Summary generation fail → drop compressed messages silently
- **Impact**: Long tasks phải restart từ đầu
- **Status**: Issue mới, chưa có PR

**2. Config override confusion (#29285)**
- **Severity**: HIGH - silent behavior change
- **Impact**: Users không biết model nào đang chạy
- **Status**: Đang được investigate

### Medium bugs (P2)

**3. Dashboard scroll regression (#29562)**
- TUI chat window truncate long sessions
- PR fix đã được submit (#29573) - bump scrollback buffer
- **Solution**: Tăng buffer từ 5,000 → 50,000 rows

**4. Mouse tracking escape sequences leak (#29557)**
- Raw SGR codes xuất hiện trong input field
- Ảnh hưởng terminal UX nghiêm trọng

**5. Cache token fields missing (#29553)**
- `cache_read_tokens`/`cache_write_tokens` không có trong SSE responses
- Ảnh hưởng dashboard metrics và billing tracking

---

## ✨ Yêu cầu tính năng

### 🎨 UX Improvements

**1. Hermes-Canvas (#29565)** - Text editing environment
- Interactive collaborative workspace
- Highlight + natural language edit instructions
- Tương tự Claude Artifacts nhưng text-first
- **Use case**: Long-form writing, documentation, code review

**2. Model Router (#29572)** - Auto-routing skill
- Tự động route complex tasks sang dedicated model
- Keep simple conversations trên main model
- **Impact**: Optimize cost + performance

### 🔧 Infrastructure

**3. Docker network config (#16359)**
- `docker_network` field cho sandbox containers
- Cho phép access compose-deployed services
- **Use case**: Database connections, MCP servers

**4. Honcho session pinning (#18152)**
- `HONCHO_SESSION` env var cho persistent sessions
- **Use case**: Multi-launch workflows, testing

### 🛡️ Governance & Safety

**5. Workflow guardrails (#29556)**
- Advisory/nudge/block modes cho final answers
- Deterministic eval harness
- Conservative sampling defaults cho local backends

**6. Memory Evidence Repair (#29563)**
- Governance workflow cho memory corruption recovery
- Read-only preview → approval gates → commit receipts
- **Impact**: Production-grade memory reliability

---

## 💭 Phản hồi người dùng

### 😊 Positive feedback

- **Multi-language support**: Cộng đồng Trung Quốc, Hàn Quốc đang active contribute
- **Plugin ecosystem**: Skills system đang được mở rộng (model-router, MoA)
- **Gateway flexibility**: Telegram topics, Slack threads được cải thiện liên tục

### 😟 Pain points

**1. Configuration complexity**
- `auth.json` vs `config.yaml` confusion
- Provider aliases không consistent (`openai` không được recognize)
- Migration path từ v11→v12 drop API keys

**2. TUI/Dashboard stability**
- Scroll regression trong v0.14.0
- Mouse tracking issues trên Linux/Wayland
- Clipboard copy fails silently

**3. Documentation gaps**
- Telegram group_topics setup không rõ ràng
- Docker network configuration thiếu examples
- Memory architecture không có official docs

---

## 🗺️ Backlog & Roadmap

### 🎯 Short-term (đang active)

**Week of 2026-05-21:**
- ✅ Cache optimization (#29568) - ready to merge
- ✅ Gateway fixes (Telegram, Slack, Discord) - multiple PRs in review
- ✅ Security hardening (XML, SSH) - testing phase
- 🔄 Config system cleanup (#29285, #29576, #29575) - in progress

### 🔮 Medium-term (next 2-4 weeks)

**Predicted v0.15.0 features:**
- Memory architecture v2 (5-layer system từ #29549)
- Hermes-Canvas text editing environment
- Model router auto-routing
- Workflow guardrails system
- Dashboard theme redesign (#18080)

### 🌟 Long-term vision

**Emerging patterns:**
- **Multi-model orchestration**: Router, MoA, background review optimization
- **Production-grade reliability**: Governance workflows, evidence repair, guardrails
- **International expansion**: i18n support, multi-language contributions
- **Platform integrations**: Deeper Telegram/Slack/Discord features

---

## 📌 Kết luận

Hermes-Agent đang trong giai đoạn **maturation** với focus vào:
1. **Performance optimization** - giảm API costs, cache efficiency
2. **Production readiness** - security, governance, reliability
3. **Developer experience** - better configs, clearer docs, improved tooling
4. **Community growth** - international contributors, research-level innovations

**Điểm đáng chú ý**: Sự xuất hiện của #29549 (5-layer memory architecture) cho thấy cộng đồng không chỉ report bugs mà đang contribute **architectural innovations** - dấu hiệu của một open-source project healthy và có tương lai sáng.

**Risk watch**: Critical bugs (#29559, #29285) cần được prioritize để tránh user frustration và data loss.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*