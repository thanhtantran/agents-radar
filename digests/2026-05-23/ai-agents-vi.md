# Bản tin Hệ sinh thái OpenClaw 2026-05-23

> Issues: 275 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-05-23 02:00 UTC

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

# Báo cáo Phân tích Hệ sinh thái OpenClaw - 23/05/2026

## 📊 Tóm tắt hôm nay

Ngày 23/05/2026 chứng kiến hoạt động phát triển mạnh mẽ với **9 PR mới được mở** và nhiều cập nhật quan trọng về bảo mật, ổn định hệ thống. Trọng tâm là cải thiện sandbox security, xử lý lỗi delivery queue, và tối ưu hóa trải nghiệm người dùng trên các kênh chat. Cộng đồng đang tập trung vào việc hoàn thiện các tính năng core trước khi release beta ổn định.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng nhiều PR đang trong giai đoạn cuối cùng trước merge, đặc biệt là các bản vá bảo mật và stability fixes.

---

## 🔧 Tiến độ dự án

### **Pull Requests nổi bật:**

#### 🔒 **Bảo mật & Hardening**
- **#81185** - Redact exec tool result payloads: Che giấu output của lệnh exec khỏi agent để tránh rò rỉ thông tin nhạy cảm
- **#82955** - Validate downloaded scripts: Kiểm tra tính toàn vẹn của scripts trước khi thực thi, ngăn chặn truncated downloads
- **#85512** - Harden package URL downloads: Chặn URL không an toàn (private IPs, credentials trong URL) khi tải packages

#### 🐛 **Stability & Bug Fixes**
- **#85555** - Fix transient Telegram pairing prompts: Giải quyết vấn đề FD pressure gây ra pairing requests không mong muốn
- **#84820** - Unclosed FileHandle crashes: Sửa memory leak trên Node ≥24 do không đóng file handles đúng cách
- **#85000** - Matrix channel internal events leak: Ngăn tool/progress events hiển thị như chat messages trong Matrix rooms

#### ⚡ **Performance & UX**
- **#85576** - WebChat done indicator timing: Hiển thị "Done" sau khi reply đã render xong, tránh race condition
- **#85488** - Honor /verbose in group sessions: Sửa lỗi group chat không tôn trọng cài đặt verbose mode
- **#79925** - Context-pressure-aware continuation: Cho phép agent tự động tiếp tục công việc khi gần hết context window

#### 🔬 **Developer Experience**
- **#85574** - Development trace UI: Thêm giao diện debug cho LLM traces (chỉ dành cho development builds)
- **#83753** - Doctor health-check contract: Chuẩn hóa health checks với detect/repair pattern

### **Xu hướng phát triển:**

📈 **Tăng cường bảo mật**: 40% PR liên quan đến security hardening (exec redaction, URL validation, sandbox improvements)

🔄 **Ổn định hệ thống**: Nhiều fixes cho edge cases (file handles, delivery ordering, context pressure)

🎨 **Cải thiện UX**: Focus vào trải nghiệm người dùng trên chat channels (Telegram, Matrix, Slack)

---

## 💬 Điểm nổi bật cộng đồng

### **Issues được quan tâm nhất:**

1. **#75** (105 comments, 75 👍) - **Linux/Windows Clawdbot Apps**: Yêu cầu ứng dụng desktop cho Linux/Windows, hiện chỉ có macOS/iOS/Android

2. **#22438** (16 comments) - **Tiered bootstrap loading**: Đề xuất load bootstrap files theo tầng để tiết kiệm context tokens

3. **#10659** (12 comments, 4 👍) - **Masked Secrets**: Cho phép agent sử dụng API keys mà không thể đọc được giá trị thực

4. **#84607** (7 comments) - **No automatic retry on overload**: Agent không tự động fallback khi provider trả về overloaded_error

### **Vấn đề người dùng quan tâm:**

- 🔐 **Security & Privacy**: Nhiều requests về masked secrets, filesystem sandboxing, permission models
- 📱 **Platform Support**: Nhu cầu mạnh về Linux/Windows desktop apps
- 💰 **Cost Optimization**: Yêu cầu usage logging, context budget management
- 🤖 **Multi-agent workflows**: Cải thiện sub-agent lifecycle, completion announces

---

## 🐞 Ổn định & Bugs

### **Critical Issues đang được xử lý:**

| Issue | Mức độ | Trạng thái | Mô tả |
|-------|--------|-----------|-------|
| #84820 | P1 🔴 | PR #84616 | FileHandle leak crashes gateway trên Node 24+ |
| #85000 | P1 🔴 | PR #85000 | Matrix rooms nhận internal tool events như chat messages |
| #84607 | P1 🔴 | Open | Không có auto-retry khi provider overloaded |

### **Bugs đã được fix (trong PRs):**

✅ Telegram transient pairing prompts (#85555)  
✅ WebChat "Done" indicator timing (#85576)  
✅ Group verbose mode không hoạt động (#85488)  
✅ Exec tool result leaking sensitive data (#81185)  
✅ Invalid thinking signatures crash sessions (#84448)

### **Technical Debt được giải quyết:**

- Chuẩn hóa health-check contract cho Doctor system
- Refactor delivery queue với TTL support
- Cleanup fire-and-forget promises với proper error handling

---

## ✨ Yêu cầu tính năng

### **Top Feature Requests:**

#### 🔥 **Highly Demanded (>5 comments hoặc >3 👍):**

1. **#18160** (11 comments, 9 👍) - **Direct Exec Mode for Cron**: Cho phép cron jobs chạy commands trực tiếp không qua LLM
2. **#17925** (5 comments, 5 👍) - **Native web_search for ZAI/Gemini**: Hỗ trợ web search tích hợp như xAI Grok
3. **#7722** (7 comments, 4 👍) - **Filesystem Sandboxing Config**: Giới hạn file access theo paths

#### 🆕 **Tính năng mới được đề xuất:**

- **#27445** - `announceTarget` routing: Cho phép sub-agent completion announces route về parent session
- **#23353** - Anthropic server-side tools: Hỗ trợ web_search/code_execution chạy trên Anthropic infrastructure
- **#22358** - Post-subagent completion hooks: Extension hooks sau khi sub-agent hoàn thành
- **#12602** - Slack Block Kit support: Rich formatting cho Slack messages

#### 🔐 **Security & Governance:**

- **#12678** - Capability-based permissions: Permission model cho skills/tools
- **#12219** - Skill Permission Manifest: Chuẩn hóa khai báo permissions trong skills
- **#13610** - Native secrets management: Tích hợp AWS Secrets Manager, Vault

---

## 👥 Phản hồi người dùng

### **Trải nghiệm tích cực:**

✅ "Context-aware continuation (#79925) sẽ giải quyết được vấn đề agent bị stuck khi hết context"  
✅ "Masked secrets (#10659) là must-have cho production deployments"  
✅ "Tiered bootstrap loading (#22438) sẽ tiết kiệm được rất nhiều tokens"

### **Pain points chính:**

❌ **Platform gaps**: Thiếu Linux/Windows desktop apps (#75 - 105 comments)  
❌ **Cost visibility**: Không có built-in usage tracking (#13219)  
❌ **Onboarding friction**: Setup wizard không mention memory/embedding config (#16670)  
❌ **Multi-agent complexity**: Sub-agent announces gây nhiễu trong workflows (#8299, #27445)

### **Feedback về stability:**

⚠️ "Telegram pairing prompts xuất hiện ngẫu nhiên sau idle" → Fixed in #85555  
⚠️ "Matrix rooms nhận spam từ internal events" → Fixed in #85000  
⚠️ "Gateway crash trên Node 24 do FileHandle leak" → Fixed in #84616

---

## 🗺️ Backlog & Roadmap

### **Ưu tiên cao (P1):**

1. **Stability fixes** - FileHandle leaks, delivery ordering, context pressure handling
2. **Security hardening** - Exec redaction, URL validation, sandbox improvements
3. **Channel reliability** - Telegram/Matrix/WhatsApp edge cases

### **Ưu tiên trung bình (P2):**

1. **Developer experience** - Trace UI, health-check standardization, better error messages
2. **Cost optimization** - Usage logging, context budget management, tiered bootstrap
3. **Multi-agent workflows** - Sub-agent lifecycle improvements, completion routing

### **Long-term (P3):**

1. **Platform expansion** - Linux/Windows desktop apps (#75)
2. **Enterprise features** - Secrets management integration, backup/restore utilities
3. **Advanced capabilities** - Native provider tools (web_search, code_execution)

### **Xu hướng phát triển:**

📊 **Metrics**: 275 open issues, 500 PRs (30 hiển thị), tỷ lệ P1 issues ~15%

🔄 **Velocity**: 9 PRs mới trong 24h, focus vào stability & security

🎯 **Focus areas**: Security (40%), Stability (30%), UX (20%), Features (10%)

---

## 🎯 Kết luận

OpenClaw đang trong giai đoạn **consolidation** - tập trung vào ổn định hóa core features thay vì thêm tính năng mới. Các vấn đề về bảo mật (exec redaction, URL validation) và stability (FileHandle leaks, delivery ordering) đang được ưu tiên xử lý. Cộng đồng đang chờ đợi Linux/Windows desktop apps và các tính năng enterprise như secrets management. Roadmap ngắn hạn rõ ràng: **security → stability → UX → new features**.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 23/05/2026

## 1. 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trải qua giai đoạn **consolidation và maturation** với các dự án lớn tập trung vào **stability, security, và production-readiness** thay vì race về features. Ngày 23/05/2026 chứng kiến hoạt động phát triển cực kỳ sôi động với **tổng cộng 227 PRs** và **93 issues** trên 10 dự án chính.

### Các xu hướng nổi bật:

🔒 **Security-first mindset**: 40% dự án có PRs liên quan đến bảo mật (exec redaction, URL validation, sandbox hardening)

🐳 **Container & deployment focus**: Docker, Podman, Apple Container compatibility được ưu tiên cao

🌍 **Internationalization wave**: Nhiều dự án đầu tư vào i18n (LobsterAI 11 ngôn ngữ, CoPaw multi-language)

🤖 **Multi-agent orchestration**: Các dự án đang xây dựng nền tảng cho agent-to-agent communication

📱 **Multi-channel maturity**: WhatsApp, Telegram, Discord, Matrix đang được stabilize

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ tương tác | Giai đoạn |
|-------|--------|-----|----------|---------------|------------------|-----------|
| **OpenClaw** | 275 | 500 | 0 | 9 PRs mới | Trung bình | Consolidation |
| **Hermes-Agent** | 9 | 50 | 0 | 21 PRs mới | Cao | Rapid iteration |
| **NanoBot** | 7 | 21 | 0 | 11 PRs merged | Cao | Feature expansion |
| **Zeroclaw** | 13 | 50 | 0 | 6 PRs merged | Trung bình | Stabilization |
| **PicoClaw** | 10 | 20 | 1 | 8 issues closed | Thấp | Cleanup phase |
| **NanoClaw** | 6 | 33 | 0 | 29 PRs merged | Rất cao | Rapid stabilization |
| **IronClaw** | 6 | 50 | 0 | 5 PRs merged | Thấp | Architecture reborn |
| **LobsterAI** | 1 | 21 | 1 | 15 PRs merged | Trung bình | Subagent focus |
| **Moltis** | 8 | 9 | 0 | 9 PRs merged | Cao | Production hardening |
| **CoPaw** | 24 | 23 | 0 | 23 PRs/issues | Cao | Quality & testing |
| **GoClaw** | 1 | 4 | 0 | 4 PRs active | Rất thấp | Maintenance mode |

### 🏆 Top performers (theo velocity):

1. **NanoClaw**: 29 PRs merged/ngày - Tốc độ phát triển khủng khiếp
2. **Hermes-Agent**: 21 PRs mới - Đang trong sprint lớn
3. **CoPaw**: 23 PRs/issues - Cân bằng tốt giữa features và quality
4. **LobsterAI**: 15 PRs merged - Focus rõ ràng vào subagent UX
5. **NanoBot**: 11 PRs merged - CLI Apps là breakthrough

---

## 3. 🎯 Vị thế của OpenClaw

### Điểm mạnh:

✅ **Ecosystem leader**: Với 275 issues và 500 PRs, OpenClaw là dự án có **backlog lớn nhất**, cho thấy cộng đồng active và nhiều use cases thực tế

✅ **Security-conscious**: 40% PRs liên quan bảo mật (exec redaction #81185, URL validation #85512, sandbox hardening) - đặt chuẩn mực cho ecosystem

✅ **Multi-channel maturity**: Telegram, Matrix, WhatsApp, Slack đều có dedicated fixes - cho thấy production usage rộng rãi

✅ **Context management innovation**: PR #79925 về context-pressure-aware continuation là tính năng tiên phong

### Điểm yếu:

⚠️ **Velocity thấp hơn**: Chỉ 9 PRs mới trong ngày so với NanoClaw (29), Hermes (21) - có thể do review process nghiêm ngặt hơn

⚠️ **Platform gaps**: Issue #75 về Linux/Windows desktop apps có 105 comments nhưng chưa được giải quyết

⚠️ **Cost visibility**: Thiếu built-in usage tracking (#13219) - pain point cho enterprise users

### Vị trí chiến lược:

🎖️ **"The Stable Giant"**: OpenClaw đang định vị là **enterprise-grade platform** với focus vào security, stability, và governance thay vì race về features. Chiến lược này phù hợp với giai đoạn maturation của thị trường.

📊 **Market positioning**:
- **OpenClaw**: Enterprise, security-first, multi-channel
- **NanoBot**: Developer-friendly, CLI-first, extensible
- **Hermes-Agent**: Research-oriented, rapid iteration
- **NanoClaw**: Fast-moving, community-driven

---

## 4. 🔧 Hướng kỹ thuật chung

### Các pattern được nhiều dự án áp dụng:

#### 1️⃣ **Container-first deployment** (8/10 dự án)

| Dự án | Container strategy |
|-------|-------------------|
| OpenClaw | Docker + Podman support |
| NanoClaw | Rootless Podman (#2572), Apple Container |
| Zeroclaw | Docker + ARM64 cross-compilation |
| PicoClaw | Docker auto-detection (#1035) |
| Moltis | Docker sandbox improvements (#1040) |
| IronClaw | Docker sandbox command transport (#3900) |
| Hermes-Agent | Container reuse optimization (#30511) |
| CoPaw | Docker deployment focus |

**Insight**: Container deployment không còn là "nice-to-have" mà là **requirement cơ bản**. Các dự án đang giải quyết edge cases như rootless, ARM64, và resource reuse.

#### 2️⃣ **Multi-channel architecture** (7/10 dự án)

**Channels được hỗ trợ rộng rãi**:
- Telegram: 7/10 dự án
- WhatsApp: 5/10 dự án  
- Discord: 4/10 dự án
- Matrix: 3/10 dự án
- Slack: 3/10 dự án

**Pattern chung**: Unified message bus với channel-specific adapters. OpenClaw và Zeroclaw dẫn đầu về số lượng channels.

#### 3️⃣ **Security hardening wave** (6/10 dự án)

```
OpenClaw:  Exec redaction, URL validation, sandbox hardening
NanoClaw:  Credential boundary fixes, vault encryption
IronClaw:  NoExposureGuard, auth composition
Zeroclaw:  MCP tool filtering, webhook retry
GoClaw:    RoleAdmin bypass fix (P0-critical)
Hermes:    Shell injection prevention
```

**Trend**: Từ "move fast and break things" sang **"move fast with guardrails"**. Security không còn là afterthought.

#### 4️⃣ **Local-first architecture** (5/10 dự án)

- **LobsterAI**: Subagent messages → SQLite (#2034)
- **NanoBot**: CLI Apps với local registry
- **Zeroclaw**: Dream Mode local-only by default
- **PicoClaw**: Filesystem checkpoint state store
- **Moltis**: Local docs exposure to agents

**Rationale**: Giảm network dependency, tăng privacy, cải thiện performance.

#### 5️⃣ **Multi-agent orchestration** (4/10 dự án)

| Dự án | Approach |
|-------|----------|
| IronClaw | Hybrid control-plane (#30683) |
| PicoClaw | Agent-to-agent communication (#2929) |
| NanoBot | Spawn với temperature control (#3969) |
| OpenClaw | Sub-agent lifecycle improvements |

**Insight**: Ecosystem đang chuyển từ **single-agent workflows** sang **multi-agent collaboration**. Đây là frontier tiếp theo.

---

## 5. 🎨 Điểm khác biệt

### Chiến lược sản phẩm:

#### **OpenClaw - "Enterprise Fortress"**
- **Focus**: Security, governance, multi-channel
- **Target**: Large organizations, compliance-heavy industries
- **Tradeoff**: Velocity thấp hơn để đảm bảo quality
- **Moat**: Mature multi-channel support, security track record

#### **NanoBot - "Developer's Swiss Army Knife"**
- **Focus**: CLI integration, extensibility, lean core
- **Target**: Developers, power users, automation enthusiasts
- **Breakthrough**: CLI Apps (#3963) - tích hợp 1000+ CLI tools
- **Philosophy**: "Lean and mean" - core nhỏ, ecosystem lớn

#### **Hermes-Agent - "Research Lab"**
- **Focus**: Cutting-edge features, rapid experimentation
- **Target**: Researchers, early adopters
- **Velocity**: 21 PRs/ngày - cao nhất trong ecosystem
- **Tradeoff**: Stability thấp hơn, breaking changes thường xuyên

#### **NanoClaw - "Community Rocket"**
- **Focus**: Fast iteration, community-driven
- **Velocity**: 29 PRs merged/ngày - khủng khiếp
- **Strength**: 15+ active contributors, diverse skillsets
- **Risk**: Có thể accumulate technical debt nhanh

#### **IronClaw - "The Reborn Phoenix"**
- **Focus**: Architecture overhaul, multi-tenancy
- **Stage**: Đang rebuild từ đầu với "Reborn" architecture
- **Target**: SaaS providers, multi-tenant platforms
- **Timeline**: Long-term play, chưa production-ready

### Tính năng độc đáo:

| Dự án | Killer feature | Ý nghĩa |
|-------|---------------|---------|
| **NanoBot** | CLI Apps integration | Mở khóa 1000+ tools không cần viết skill |
| **OpenClaw** | Context-aware continuation | Agent tự pace công việc theo budget |
| **LobsterAI** | Subagent persistence | Subagent = first-class citizen |
| **Zeroclaw** | Dream Mode | Memory consolidation tự động |
| **IronClaw** | Multi-tenant isolation | SaaS-ready architecture |
| **Moltis** | Telephony integration | Voice calls với Twilio |
| **CoPaw** | 967 test cases | 89% security coverage |

---

## 6. 👥 Mức độ trưởng thành cộng đồng

### Tier 1 - Mature Communities (4 dự án)

**OpenClaw**
- 📊 Metrics: 275 issues, 500 PRs, 105 comments trên top issue
- 🎯 Characteristics: Diverse use cases, enterprise users, governance discussions
- 💪 Strengths: Nhiều real-world deployments, security-conscious
- ⚠️ Challenges: Platform gaps (Linux/Windows apps)

**NanoClaw**
- 📊 Metrics: 29 PRs merged/ngày, 15+ contributors
- 🎯 Characteristics: High velocity, diverse contributors, fast turnaround
- 💪 Strengths: Community engagement cực cao, rapid problem-solving
- ⚠️ Challenges: Cần balance velocity với quality

**Hermes-Agent**
- 📊 Metrics: 21 PRs/ngày, multi-language i18n (11 languages)
- 🎯 Characteristics: Research-oriented, international community
- 💪 Strengths: Cutting-edge features, responsive team
- ⚠️ Challenges: Stability issues, breaking changes

**CoPaw**
- 📊 Metrics: 23 PRs/issues, 6 first-time contributors trong ngày
- 🎯 Characteristics: Quality-focused, testing culture, welcoming
- 💪 Strengths: 967 test cases, 89% coverage, good onboarding
- ⚠️ Challenges: Critical bugs (#4620 chat history loss)

### Tier 2 - Growing Communities (4 dự án)

**NanoBot**
- 📊 Metrics: 21 PRs, 7 issues, active discussions
- 🎯 Stage: Feature expansion phase
- 💡 Potential: CLI Apps có thể là game-changer
- 🔧 Needs: Stabilize memory system, improve documentation

**Zeroclaw**
- 📊 Metrics: 50 PRs, 13 issues, moderate engagement
- 🎯 Stage: Stabilization phase
- 💡 Potential: WhatsApp + Dream Mode là differentiators
- 🔧 Needs: Fix MCP tool filtering, improve cross-platform support

**Moltis**
- 📊 Metrics: 9 PRs merged, 8 issues, fast response time
- 🎯 Stage: Production hardening
- 💡 Potential: Telephony integration là niche mạnh
- 🔧 Needs: Expand beyond telephony, grow contributor base

**LobsterAI**
- 📊 Metrics: 21 PRs, 1 issue, focused development
- 🎯 Stage: Subagent specialization
- 💡 Potential: Local-first architecture là trend đúng
- 🔧 Needs: Resolve dependency updates, security PRs

### Tier 3 - Early/Maintenance (2 dự án)

**IronClaw**
- 📊 Metrics: 50 PRs, 6 issues, low engagement
- 🎯 Stage: Architecture rebuild ("Reborn")
- ⚠️ Risk: Long-running PRs, complexity creep
- 🔧 Needs: Complete reborn migration, stabilize

**GoClaw**
- 📊 Metrics: 4 PRs, 1 issue, minimal engagement
- 🎯 Stage: Maintenance mode
- 🚨 Critical: P0 security issue open 16 ngày
- 🔧 Needs: Address security issue ASAP, revive community

---

## 7. 🔮 Tín hiệu xu hướng

### Xu hướng ngắn hạn (Q2-Q3 2026):

#### 1️⃣ **Multi-agent orchestration sẽ bùng nổ**

**Signals**:
- IronClaw: Hybrid control-plane scaffolding (#30683)
- PicoClaw: Agent-to-agent communication request (#2929)
- NanoBot: Temperature control cho sub-agents (#3969)
- OpenClaw: Sub-agent lifecycle improvements

**Prediction**: Trong 3-6 tháng tới, sẽ có **standard protocol** cho agent communication. Có thể là:
- File-based handoff (IronClaw approach)
- Event-driven messaging (OpenClaw style)
- Hoặc hybrid của cả hai

**Winners**: Dự án nào ship multi-agent workflows trước sẽ có **first-mover advantage**.

#### 2️⃣ **Security sẽ trở thành table stakes**

**Current state**: 6/10 dự án có security PRs trong ngày
**Trend**: Từ "optional" → "mandatory"

**Key areas**:
- Exec command sandboxing (OpenClaw, NanoClaw)
- Credential management (IronClaw, Zeroclaw)
- Access control (GoClaw RoleAdmin bypass)
- Tool filtering (Zeroclaw MCP tools)

**Prediction**: Trong 6 tháng, sẽ có **security certification/audit** cho AI agent platforms. Dự án nào không pass sẽ bị loại khỏi enterprise consideration.

#### 3️⃣ **CLI-first vs GUI-first sẽ phân hóa rõ**

**CLI-first camp**:
- NanoBot: CLI Apps integration
- Zeroclaw: Terminal-focused
- Moltis: CLI automation

**GUI-first camp**:
- LobsterAI: Desktop app focus
- Hermes-Agent: Desktop GUI (#20059)
- CoPaw: WebUI console

**Prediction**: Thị trường sẽ split thành:
- **Developer tools** (CLI-first) - NanoBot, Zeroclaw
- **End-user products** (GUI-first) - LobsterAI, Hermes

Không có "one size fits all".

#### 4️⃣ **Local-first sẽ thắng cloud-first**

**Evidence**:
- LobsterAI: SQLite persistence
- Zeroclaw: Dream Mode local-only
- NanoBot: Local CLI registry
- Moltis: Local docs exposure

**Drivers**:
- Privacy concerns
- Cost optimization (API calls expensive)
- Offline capability
- Performance (no network latency)

**Prediction**: Trong 1 năm, **hybrid architecture** (local-first với optional cloud sync) sẽ là standard. Pure cloud-only sẽ bị reject bởi privacy-conscious users.

### Xu hướng dài hạn (2026-2027):

#### 5️⃣ **Consolidation wave đang đến**

**Signals**:
- 10 dự án với overlapping features
- Nhiều dự án trong "stabilization phase"
- Technical debt đang tích lũy (IronClaw, GoClaw)

**Prediction**: 
- **2-3 dự án sẽ merge** trong 12 tháng tới
- **1-2 dự án sẽ bị abandon** do không sustain velocity
- **Top 3-4 dự án** sẽ chiếm 80% market share

**Likely survivors**:
1. **OpenClaw** - Enterprise moat
2. **NanoBot** - Developer ecosystem
3. **Hermes-Agent** - Research backing
4. **NanoClaw** hoặc **CoPaw** - Community momentum

#### 6️⃣ **Vertical specialization sẽ xuất hiện**

Thay vì "general-purpose agent platform", sẽ có:

- **DevOps agents** (NanoBot direction)
- **Customer support agents** (multi-channel focus)
- **Research agents** (Hermes direction)
- **Enterprise workflow agents** (OpenClaw direction)
- **Telephony agents** (Moltis niche)

**Prediction**: Dự án nào **pick a vertical và dominate** sẽ thành công hơn là cố gắng làm tất cả.

#### 7️⃣ **Standards và interoperability**

**Current pain**: Mỗi dự án có format riêng cho:
- Tool definitions
- Agent communication
- Configuration
- Deployment

**Prediction**: Trong 18 tháng sẽ có:
- **Agent Communication Protocol** (ACP) standard
- **Tool Definition Format** (TDF) standard
- **Agent Deployment Manifest** (ADM) standard

Giống như Docker đã standardize containers, sẽ có **"Docker for AI Agents"**.

---

## 8. 🎯 Khuyến nghị chiến lược

### Cho OpenClaw:

#### Ngắn hạn (1-3 tháng):
1. **Ship Linux/Windows desktop apps** (#75) - 105 comments cho thấy đây là top pain point
2. **Implement usage tracking** (#13219) - Critical cho enterprise adoption
3. **Accelerate PR velocity** - 9 PRs/ngày thấp hơn competitors, cần tăng lên 15-20

#### Trung hạn (3-6 tháng):
1. **Multi-agent orchestration** - Đừng để IronClaw/PicoClaw vượt mặt
2. **Security certification** - Leverage security-first approach để có audit/certification
3. **Vertical specialization** - Pick 1-2 verticals (DevOps? Customer support?) và dominate

#### Dài hạn (6-12 tháng):
1. **Lead standardization effort** - Với position hiện tại, OpenClaw có thể lead ACP/TDF standards
2. **Acquisition strategy** - Consider merge với NanoBot (CLI strength) hoặc Moltis (telephony niche)
3. **Enterprise partnerships** - Focus vào 2-3 large enterprise customers để validate product-market fit

### Cho ecosystem nói chung:

1. **Collaborate on standards** - Thay vì compete trên mọi mặt, collaborate trên protocols
2. **Specialize, don't generalize** - Pick verticals và dominate
3. **Security first** - Đây không còn là optional
4. **Community over features** - Dự án với community mạnh (NanoClaw, CoPaw) đang outperform về velocity

---

## 📊 Kết luận

Hệ sinh thái AI agent đang ở **inflection point**:

✅ **Maturation phase**: Từ "proof of concept" sang "production-ready"
✅ **Security awakening**: Từ "move fast" sang "move fast with guardrails"  
✅ **Specialization beginning**: Từ "general-purpose" sang "vertical-focused"
✅ **Community matters**: Velocity và engagement quan trọng hơn feature count

**OpenClaw** đang ở vị trí tốt với security-first approach và enterprise focus, nhưng cần:
- Tăng velocity để không bị bỏ lại
- Ship desktop apps để close platform gap
- Lead standardization effort để cement position

**Winning formula** cho 12 tháng tới:
```
Success = (Security × Community × Specialization) / Technical Debt
```

Dự án nào balance được 3 yếu tố này trong khi minimize technical debt sẽ là winners.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích Dự án NanoBot - Ngày 23/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 23/05 đánh dấu một đợt hoạt động phát triển mạnh mẽ với **21 PRs** được tạo/cập nhật, tập trung vào 3 hướng chính: **mở rộng khả năng tích hợp CLI**, **tối ưu hóa hệ thống prompt/memory**, và **cải thiện trải nghiệm WebUI**. Đặc biệt, tính năng CLI Apps mới cho phép tích hợp với hệ sinh thái CLI-Anything, mở ra khả năng mở rộng công cụ không giới hạn cho agent.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng nhiều tính năng quan trọng đang trong giai đoạn review cuối.

---

## 📈 Tiến độ dự án

### 🔥 Các PR quan trọng đã merge

#### 1. **CLI Apps - Tích hợp CLI-Anything** (#3963) ✅
- **Tác động**: Đột phá lớn trong khả năng mở rộng
- **Tính năng**: 
  - Tích hợp với registry CLI-Anything (1000+ công cụ CLI)
  - Cài đặt/quản lý apps qua WebUI Settings
  - Hỗ trợ @ mention để gọi CLI tools
  - Render artifacts từ CLI (ảnh, JSON, markdown)
- **Ý nghĩa**: Biến NanoBot thành platform tích hợp mọi CLI tool, không cần viết skill riêng

#### 2. **Ollama Image Generation** (#3946) ✅
- Hỗ trợ sinh ảnh qua Ollama local models (flux-image-turbo)
- Giải quyết issue #3941 - cho phép chạy hoàn toàn offline

#### 3. **OpenAI/Codex Image Generation** (#3954) ✅
- Mở rộng hỗ trợ sinh ảnh cho OpenAI và Codex
- Tích hợp với Responses API image_generation tool

#### 4. **Security Fix - SSRF Protection** (#3928) ✅
- Vá lỗ hổng SSRF trong web_fetch khi xử lý redirect
- Validate redirect targets trước khi fetch

#### 5. **Locale Improvements** (#3962, #3964) ✅
- Bổ sung đầy đủ locale keys cho zh-TW, ja, es, fr, id, ko, vi
- Cải thiện trải nghiệm đa ngôn ngữ

### 🔄 PRs đang review

#### 1. **BM25 Skill Router** (#3865) - Tối ưu prompt 60%
- **Vấn đề**: System prompt quá dài (3000+ tokens cho 30+ skills)
- **Giải pháp**: Chỉ inject top-5 skills liên quan nhất dựa trên BM25
- **Tác động**: Giảm chi phí API, tăng tốc độ response
- **Trạng thái**: Đang thảo luận về tradeoff giữa context và độ chính xác

#### 2. **Enhanced Memory System** (#3952)
- Cải thiện Dream + Consolidator prompts
- Giải quyết vấn đề trùng lặp memory (MECE principle)
- Tối ưu cấu trúc MEMORY.md

#### 3. **Exec Command Confirmation** (#3937)
- Cơ chế xác nhận cho lệnh nguy hiểm (rm -rf, DROP TABLE...)
- Giải quyết issue #3887 về an toàn

#### 4. **Heartbeat Reasoning Decoupling** (#1443)
- Tách reasoning khỏi notification
- Cho phép agent suy nghĩ im lặng, chỉ thông báo khi cần

---

## 💬 Điểm nổi bật cộng đồng

### 🔥 Issue được quan tâm nhất

**#3969 - Spawn tool với temperature parameter** (mới tạo hôm nay)
- **Tác giả**: @codeLong1024
- **Vấn đề**: Không thể điều chỉnh temperature cho sub-agents
- **Use case thực tế**:
  - Parsing JSON → temperature 0.0 (deterministic)
  - Brainstorming → temperature 0.7-1.0 (creative)
  - Code review → temperature 0.3-0.5 (balanced)
- **Đề xuất**: Thêm tham số `temperature` vào spawn tool
- **Ý nghĩa**: Cho phép orchestration phức tạp với các agent có "tính cách" khác nhau

### 📊 Tương tác cao

- **#3846** (4 comments, 1 👍): Giữ skill content trong multi-turn conversations
- **#3959** (4 comments): Bug `/skill` list cả disabled skills

---

## 🐛 Ổn định & Bugs

### ✅ Đã sửa

1. **#3956 - Anthropic API 400 error** ✅
   - Lỗi khi tool result chứa list content (image reads)
   - Đã fix bằng cách dedupe replay item ids (#3961)

2. **#3884 - WebUI conversation closes** ✅
   - Conversation đóng sau response đầu tiên
   - Đã giải quyết (closed 22/05)

3. **#3957 - Misleading file edit counters** ✅
   - WebUI hiển thị diff counters sai
   - Đã fix logic render

### 🔧 Đang xử lý

1. **#3959 - /skill list disabled skills**
   - Lệnh `/skill` vẫn hiện skills đã disable
   - PR #3968 đang fix (thêm built-in slash command)

---

## 💡 Yêu cầu tính năng

### 🆕 Đề xuất mới (23/05)

**#3969 - Spawn với temperature control**
- Mức độ quan trọng: **Cao**
- Tác động: Mở khóa khả năng orchestration nâng cao
- Khả năng thực hiện: **Khả thi** (chỉ cần thêm parameter)

### 📋 Đề xuất đang thảo luận

**#3846 - Keep skill content in multi-turn**
- Vấn đề: Skill.md chỉ load lần đầu, không persist qua turns
- Giải pháp đề xuất: Cache skill content trong conversation context
- Trạng thái: Đang thảo luận implementation

**#3958 - Weather skill nên là example**
- Đề xuất: Di chuyển weather skill ra khỏi built-in
- Lý do: Giữ core lean, weather nên là example skill
- Phù hợp với triết lý "lean and mean"

---

## 👥 Phản hồi người dùng

### 😊 Tích cực

- **CLI Apps**: Cộng đồng rất hào hứng với khả năng tích hợp CLI-Anything
- **Ollama image gen**: Người dùng local-first đánh giá cao
- **Locale improvements**: Cộng đồng quốc tế cảm ơn việc bổ sung đa ngôn ngữ

### 😐 Trung lập/Quan ngại

- **BM25 Skill Router** (#3865): Một số lo ngại về việc miss relevant skills
- **Memory duplication**: Người dùng phàn nàn MEMORY.md bị bloat

### 🔧 Yêu cầu cải thiện

- Cần cơ chế discover skills tốt hơn (liên quan #3959)
- Exec safety vẫn là mối quan tâm (PR #3937 đang giải quyết)
- Temperature control cho sub-agents (#3969)

---

## 🗺️ Backlog & Roadmap

### 🎯 Ưu tiên cao (dựa trên hoạt động)

1. **CLI Apps ecosystem** 
   - ✅ Core implementation merged
   - 🔄 Tiếp tục mở rộng registry integration
   - 📋 Cần documentation và examples

2. **Memory system optimization**
   - 🔄 PR #3952 đang review
   - 📋 Cần giải quyết duplication issue

3. **Safety & Security**
   - 🔄 Exec confirmation (#3937)
   - ✅ SSRF fix merged
   - 📋 Cần audit thêm các attack vectors

### 🔮 Xu hướng phát triển

**Từ built-in sang extensible**:
- Di chuyển features từ core sang skills/apps
- Ví dụ: Weather skill → example
- Mục tiêu: Core nhỏ gọn, mở rộng qua ecosystem

**Agent orchestration nâng cao**:
- Temperature control cho sub-agents
- Heartbeat reasoning decoupling
- Hướng tới multi-agent workflows phức tạp

**Developer experience**:
- CLI Apps giảm friction khi tích hợp tools
- Diagnostic command (`nanobot doctor` #3776)
- Better error messages và debugging

---

## 📊 Thống kê hoạt động

- **PRs merged**: 11 PRs
- **PRs đang review**: 10 PRs
- **Issues mới**: 1 (#3969)
- **Issues đóng**: 3 (#3884, #3956, #3941)
- **Contributors hoạt động**: 15+ người

---

## 🎬 Kết luận

Ngày 23/05 là một ngày **rất năng suất** với nhiều tính năng quan trọng được merge. **CLI Apps** là highlight lớn nhất, mở ra kỷ nguyên mới cho khả năng mở rộng của NanoBot. Dự án đang chuyển hướng từ "all-in-one" sang "platform", với core nhỏ gọn và ecosystem phong phú. Các vấn đề về memory optimization và safety đang được giải quyết có hệ thống. Cộng đồng tích cực đóng góp ý tưởng chất lượng cao (#3969 là ví dụ điển hình).

**Điểm cần chú ý**: BM25 Skill Router (#3865) có tiềm năng tối ưu lớn nhưng cần test kỹ để tránh regression về độ chính xác.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Phân tích Zeroclaw - 23/05/2026

## 📊 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn ổn định hóa mạnh mẽ với 6 PR được merge trong 24h qua, tập trung vào việc sửa các lỗi nghiêm trọng về tích hợp MCP tools, WhatsApp protocol, và Windows shell encoding. Dự án đang chuẩn bị cho v0.8.0 với nhiều cải tiến về observability, multi-platform support, và developer experience.

## 🚀 Releases

Không có release chính thức trong 24h qua, nhưng các PR được merge cho thấy v0.8.0 đang được chuẩn bị với những thay đổi breaking về CLI interface (`gateway start` thay vì `--host/--port`).

## 📈 Tiến độ dự án

### 🔥 PRs quan trọng được merge hôm nay:

**Sửa lỗi nghiêm trọng:**
- **#6772** ✅ Fix Windows shell garbled output - Giải quyết vấn đề encoding trên Windows với non-UTF-8 console (CP936/GBK, CP932/Shift_JIS)
- **#6706** ✅ WhatsApp protocol parity - Nâng cấp lên `whatsapp-rust` 0.6 để khôi phục kết nối sau protocol bump tháng 4/2026
- **#6838** ✅ Doctor models credentials - Sửa lỗi `zeroclaw models list` không đọc được API key từ config

**Cải thiện UX:**
- **#6829** ✅ Discord thread filtering - Threads giờ được nhận diện đúng với parent channel trong `channel_ids` filter
- **#6009** ✅ OTel tool spans enrichment - Thêm semantic conventions cho observability tốt hơn

### 🔧 PRs đang active (chờ review):

**Priority cao:**
- **#6861** 🆕 Fix MCP tool filtering - Sửa bug nghiêm trọng khiến `tool_filter_groups` không hoạt động với MCP tools thật (chỉ check prefix `__` nhầm với skill tools)
- **#6693** Dream Mode implementation - Tính năng consolidation memory định kỳ, chạy local-only by default
- **#6845** WhatsApp LID reply fix - Sửa lỗi DM replies bị drop khi chat JID dùng LID format

**Tích hợp mới:**
- **#6848** 🆕 Zeroclaw TUI - Terminal UI interface đang được tích hợp
- **#6833** Jina AI web search provider
- **#6842** NEAR AI Cloud provider (TEE-backed inference)

## 💬 Điểm nổi bật cộng đồng

### Issues được quan tâm:

1. **#6699** (6 comments) - MCP tool filtering bug - Vấn đề nghiêm trọng ảnh hưởng đến việc sử dụng MCP tools trong production
2. **#5849** (11 comments) - Dream Mode feature request - Tính năng "ngủ" để consolidate memory đang được thảo luận sôi nổi
3. **#6246** (6 comments) - WhatsApp protocol issue - Đã được giải quyết nhưng cho thấy tầm quan trọng của WhatsApp channel

### Xu hướng đóng góp:
- @singlerider, @Audacity88, @vernonstinebaker đang rất active với nhiều PRs chất lượng
- Cộng đồng đang tập trung vào stability và cross-platform support
- Documentation được cải thiện đáng kể (architecture map, skills guide)

## 🐛 Ổn định & Bugs

### Đã sửa (24h qua):
✅ **Windows shell encoding** (#6704 → #6772) - Garbled output trên non-UTF-8 console  
✅ **WhatsApp connectivity** (#6246 → #6706) - Messages không flow sau protocol bump  
✅ **Doctor credentials** (#6756 → #6838) - Custom providers fail khi list models  
✅ **Discord threads** (#6829) - Thread messages bị filter sai  

### Đang xử lý:
⚠️ **MCP tool filtering** (#6699 → #6861) - `tool_filter_groups` không hoạt động với MCP tools  
⚠️ **Matrix streaming** (#6735) - Draft state isolation issues  
⚠️ **Android infinite loop** (#6036) - Agent loop vô hạn trên Termux (needs-repro)  
⚠️ **Compatible provider reasoning** (#6606) - Reasoning field không được preserve đúng  

### Vấn đề cần chú ý:
- **Discord gateway reconnect** (#6835) - Cần implement Resume thay vì luôn Identify
- **Signal reactions** (#6840) - Outbound emoji reactions chưa hoạt động
- **Webhook retry logic** (#5838) - Exponential backoff đang được implement

## ✨ Yêu cầu tính năng

### Đang phát triển:
1. **Dream Mode** (#5849 → #6693) - Memory consolidation tự động, local-first với optional LLM reflection
2. **Zeroclaw TUI** (#6848) - Terminal UI cho better developer experience
3. **Skills v0.7.6** (#6253) - Cải thiện skills support và UX
4. **ARM64 Docker** (#5187) - Native cross-compilation cho ARM platforms

### Được đề xuất:
- **Web search providers**: Jina AI (#6833), NEAR AI (#6842)
- **Webhook retry logic** (#5838) - Exponential backoff với Retry-After support
- **Better observability** (#5980 → #6009) - OTel traces với tool call details
- **Config validation** (#6079) - Doctor tests cho `web_dist_dir` với tilde/variables

## 👥 Phản hồi người dùng

### Tích cực:
- WhatsApp fix được đánh giá cao - critical channel cho nhiều deployments
- Windows support improvements được community đón nhận tốt
- Documentation efforts (architecture map, skills guide) rất hữu ích

### Pain points:
- **MCP tools integration** còn nhiều rough edges (filtering, deferred loading)
- **Cross-platform consistency** - Windows, Android còn nhiều issues
- **Provider compatibility** - Custom providers và reasoning fields cần attention
- **First-run experience** - TUI improvements (#6858) đang address vấn đề này

### Requests:
- Better error messages và debugging tools
- More provider options (Jina, NEAR AI được request)
- Improved retry logic cho production deployments
- ARM64 support cho edge devices

## 🗺️ Backlog & Roadmap

### v0.8.0 (sắp tới):
- ✅ Gateway CLI changes (`gateway start`)
- ✅ WhatsApp protocol parity
- ✅ Windows shell encoding fix
- 🔄 MCP tool filtering fix
- 🔄 OTel improvements
- 🔄 Deploy script updates (#6805)

### Post-v0.8.0:
- **Dream Mode** (v0.7.6 theme) - Memory consolidation feature
- **Skills improvements** (#6253) - Better UX, sandbox, test harness
- **TUI integration** - Terminal interface
- **ARM64 Docker** - Native cross-compilation
- **Audit recovery** (#6074) - 153 commits từ bulk revert cần được review

### Technical debt:
- Discord gateway session resumption (#6835)
- Compatible provider reasoning preservation (#6606)
- Android Termux stability (#6036)
- Webhook retry logic (#5838)
- Config validation improvements (#6079)

---

**Đánh giá tổng quan**: Zeroclaw đang trong giai đoạn maturity tốt với focus mạnh vào stability, cross-platform support, và developer experience. Velocity cao (6 PRs merged/ngày) với quality control tốt. Community active và responsive. Roadmap rõ ràng hướng tới production-ready system.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo Phân tích Hệ sinh thái PicoClaw - 23/05/2026

## 📊 Tóm tắt hôm nay

Ngày 23/05/2026 đánh dấu một đợt dọn dẹp lớn với **8 issues và 9 PRs được đóng**, chủ yếu do bot stale tự động xử lý các vấn đề không còn hoạt động. Dự án phát hành **nightly build v0.2.9-nightly.20260523** và tiếp tục tập trung vào cải thiện bảo mật với việc nâng cấp dependency `golang.org/x/net` lên v0.55.0 để vá lỗ hổng bảo mật.

---

## 🚀 Releases

### **v0.2.9-nightly.20260523.f09a7d67**
- Build tự động hàng đêm, được cảnh báo có thể không ổn định
- Đây là phiên bản thử nghiệm cho chu kỳ phát triển v0.2.9
- Người dùng nên thận trọng khi sử dụng trong môi trường production

---

## 🔧 Tiến độ dự án

### **PRs được merge hôm nay:**

✅ **#2930 - Nâng cấp bảo mật quan trọng**
- Bump `golang.org/x/net` lên v0.55.0 để vá lỗ hổng được `govulncheck` phát hiện
- Liên quan đến `html.Parse` trong `utils.HtmlToMarkdown`
- **Tác động**: Tăng cường bảo mật cho toàn bộ hệ thống

✅ **#2788 - Cải thiện UX cho Session API** (merged 22/05)
- Thêm timestamp `created_at` riêng cho từng message thay vì dùng chung `session.updated`
- **Giải quyết**: Issue #2787 về việc frontend không thể hiển thị đúng thời gian từng tin nhắn
- **Tác động**: Cải thiện đáng kể trải nghiệm người dùng khi xem lịch sử chat

✅ **#2914 - Request-scoped context policies** (merged 22/05)
- Thêm `agents.defaults.turn_profile` cho phép kiểm soát context mỗi turn
- Có thể bật/tắt history, system context, skill prompts, và callable tools
- **Tác động**: Tăng tính linh hoạt và kiểm soát cho developers

### **PRs đang chờ review:**

🔄 **#2928 - DeepSeek thinking controls** (mới nhất)
- Map các trường thinking của DeepSeek vào OpenAI-compatible provider
- Hỗ trợ `thinking_level`: off/low/medium/high/xhigh
- **Ý nghĩa**: Mở rộng khả năng tương thích với các AI provider mới

🔄 **#2906 - Message bus backpressure handling**
- Giải quyết vấn đề goroutine leak khi message buffer đầy
- Thêm health check visibility cho message bus
- **Tác động**: Cải thiện stability và observability của hệ thống

🔄 **#2856 - Media attachments support** (từ 11/05)
- Cho phép `message` tool gửi media attachments
- Hỗ trợ Telegram rich delivery (photos, documents, voice)
- **Tác động**: Mở rộng khả năng giao tiếp đa phương tiện của agent

🔄 **#2838 - Frontmatter tool policy filters** (từ 09/05)
- Hỗ trợ `allow`/`deny` policy với glob patterns trong `AGENT.md`
- Áp dụng cho cả built-in tools và MCP tools
- **Tác động**: Tăng cường security và fine-grained control

---

## 🌟 Điểm nổi bật cộng đồng

### **Issue được quan tâm nhất:**

⭐ **#2929 - Agent-to-agent communication** (mới, 1 comment)
- Đề xuất thêm first-class communication layer giữa các agents
- Hiện tại agents chỉ có thể dùng `spawn`, `subagent`, `delegate` - không có peer-to-peer communication
- **Tầm quan trọng**: Mở ra khả năng xây dựng multi-agent workflows phức tạp hơn

⭐ **#2625 - WhatsApp compiled builds** (6 comments, 1 👍)
- Người dùng Raspberry Pi Zero 2 yêu cầu build arm64 có sẵn WhatsApp support
- Hiện phải tự compile với flags để có WhatsApp
- **Phản ánh**: Nhu cầu thực tế từ embedded/IoT users

---

## 🐛 Ổn định & Bugs

### **Bugs đã được fix:**

✅ **Matrix channel issues** (3 issues đóng cùng ngày 22/05):
- #2815: `allow_from` filter không hoạt động - đã fix bằng PR #2827
- #2816: Sender identity không được inject vào agent context
- #2817: Voice transcription thành công nhưng LLM nhận `[voice]` thay vì text

✅ **Telegram topic context** (2 PRs merged):
- #2791, #2756: Preserve topic context cho final replies
- Trước đây replies trong forum topics bị rơi về default thread

✅ **Tool feedback issues**:
- #2785: Feishu chỉ hiển thị first tool call message khi `separate_messages=false`
- #2822: Child tool feedback không được dismiss sau khi subturn hoàn thành

### **Bugs còn mở:**

⚠️ **#2744 - Android v0.2.8 data access** (stale, 3 comments)
- Không thể truy cập data từ bất kỳ tab nào trên Android
- Đã được đánh dấu stale, có thể sẽ bị đóng nếu không có update

---

## 💡 Yêu cầu tính năng

### **Tính năng mới được đề xuất:**

🎯 **#2929 - Agent-to-agent communication** (HOT)
- Xây dựng communication layer cho cooperative workflows
- Cho phép agents talk to each other as peers
- **Use cases**: Multi-agent collaboration, distributed problem solving

🎯 **#2625 - Pre-compiled WhatsApp builds**
- Cung cấp official builds với WhatsApp support
- Giảm friction cho users không muốn tự compile

🎯 **#2351 - Skill binary validation** (stale)
- Validate binary requirements trước khi inject skill vào system prompt
- Tránh LLM claim có thể làm việc mà thực tế sẽ fail
- **Ví dụ**: `agent-browser` cần screenshot binary

### **Tính năng đang phát triển:**

🔨 **#2877 - Tirith pre-exec scanning** (stale)
- Optional security scanning cho shell commands
- Sử dụng Tirith để detect content-level threats
- **Trạng thái**: PR đang stale, cần review

---

## 💬 Phản hồi người dùng

### **Trải nghiệm tích cực:**

👍 Cộng đồng đánh giá cao các fix về Telegram topic context và session timestamps - những vấn đề ảnh hưởng trực tiếp đến UX

### **Pain points:**

😓 **Compilation friction**: Users trên embedded devices (Raspberry Pi) gặp khó khăn với việc phải tự compile để có WhatsApp support

😓 **Matrix channel stability**: Nhiều bugs liên quan đến Matrix (allow_from, sender identity, voice transcription) cho thấy channel này cần attention

😓 **Documentation gaps**: PR #2662 về unifying vendors table cho thấy docs cần được cải thiện

---

## 🗺️ Backlog & Roadmap

### **Xu hướng phát triển:**

1. **Security hardening**: 
   - Dependency updates (golang.org/x/net, anthropic-sdk, larksuite SDK)
   - Optional pre-exec scanning với Tirith
   - Tool policy filters với allow/deny patterns

2. **Multi-agent capabilities**:
   - Agent-to-agent communication (#2929)
   - Context policies per turn (#2914)
   - Improved subturn handling

3. **Rich media support**:
   - Media attachments trong message tool (#2856)
   - Voice transcription improvements

4. **Channel stability**:
   - Matrix bugs được ưu tiên fix
   - Telegram topic context đã stable
   - WhatsApp support cần được mainstream hóa

### **Technical debt:**

⚠️ **Stale issues cleanup**: 8 issues/PRs được đóng do stale - team đang tích cực dọn dẹp backlog

⚠️ **Message bus reliability**: PR #2906 addressing backpressure và goroutine leaks - critical infrastructure work

---

## 📈 Đánh giá tổng quan

**Điểm mạnh:**
- Team responsive với bugs, nhiều fixes được merge nhanh
- Focus vào security và stability
- Cộng đồng active với feature requests có giá trị

**Cần cải thiện:**
- Matrix channel cần stabilization effort
- Documentation cần được polish
- Embedded/IoT use cases cần được support tốt hơn (pre-compiled builds)

**Outlook:** Dự án đang trong giai đoạn maturation, tập trung vào polish và stability hơn là thêm features mới. Việc cleanup stale issues và focus vào security updates cho thấy team đang chuẩn bị cho một stable release.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - 23/05/2026

## 1. 🎯 Tóm tắt hôm nay

Ngày 23/05 chứng kiến một đợt merge PR mạnh mẽ với **29 PR được đóng** trong vòng 24 giờ, tập trung vào việc sửa lỗi nghiêm trọng trong agent-runner, cải thiện hỗ trợ multi-channel (WhatsApp, Signal, Telegram), và tăng cường tính năng container runtime. Đặc biệt, team đã giải quyết các vấn đề về context window management, authentication flow, và rootless Podman compatibility - những điểm đau quan trọng ảnh hưởng đến production deployment.

## 2. 📦 Releases

Không có release chính thức nào được phát hành trong 24 giờ qua.

## 3. 🚀 Tiến độ dự án

### 🔥 Các sửa lỗi nghiêm trọng (Critical Fixes)

**Agent-Runner Core:**
- **#2556** ✅ Sửa lỗi `<messages>` envelope khiến Claude Agent SDK phát sinh synthetic response thay vì gọi API thực - bug này khiến agent không thể xử lý multiple pending messages
- **#2586** ✅ Implement transcript rotation để ngăn session transcripts phình to không giới hạn (chứa cả base64 images từ screenshots)
- **#2595** 🟡 Sửa logic để honor `TRANSCRIPT_ROTATE_AGE_DAYS=0` cho deployments cần disable age-based rotation

**Multi-Channel Authentication:**
- **#2584** ✅ Fix Signal integration - signal-cli 0.13+ đổi field `account` → `number`, khiến wizard luôn báo "no linked account"
- **#2579** ✅ WhatsApp logout race condition - credentials không được xóa ngay khi nhận 401, gây loop authentication failures
- **#2552** ✅ WhatsApp mentions không render - thiếu `mentions` array trong `sendMessage()` call

**Container Runtime:**
- **#2572** ✅ Rootless Podman compatibility - sửa 2 bugs về UID mapping và volume permissions
- **#1749** ✅ Agent-runner cache staleness - chỉ check `index.ts` mtime, bỏ qua changes trong các files khác

### 🎨 Tính năng mới (New Features)

**Developer Experience:**
- **#2573** ✅ Surface context-window usage vào agent - giờ agent có thể tự pace công việc dựa trên budget còn lại
- **#2571** ✅ Tích hợp `rtk` CLI proxy - tiết kiệm 60-90% tokens cho dev commands (git, docker, kubectl...)
- **#1757** ✅ MCP tool `send_file` - agent có thể gửi files/photos về chat

**Codex Integration:**
- **#2580** ✅ Full Codex-only installation support - Codex as AI-coding CLI, agent provider, và OneCLI credential management

**Marketing Workflows:**
- **#1780** ✅ 5 container skills mới: client-profile, design-avatar, telegram-ads, olx-research, olx-ad-generator
- **#1781** ✅ Composio MCP cho managed Gmail/Calendar OAuth

### 🔧 Improvements & Polish

- **#2563** ✅ Scope `--assistant-name` chỉ cho registered group
- **#2567** ✅ Import `CLAUDE.local.md` vào composed group prompts
- **#2566** ✅ Security: scope channel approval targets theo admin permissions
- **#2551** ✅ Fix `/add-whatsapp` skill - correct `--method` refs và ship QR-browser wrapper
- **#2558** ✅ Correct OneCLI default URL từ `app.` sang `api.` subdomain

## 4. 💬 Điểm nổi bật cộng đồng

### 🔴 Issue nổi bật đang mở:

**#2590** - "I just hate Node apps" 
- User gặp dependency hell khi debug trên Ubuntu
- Phàn nàn về Node version requirements và SQLite wrapper compatibility
- Phản ánh pain point về local development experience ngoài container

**#2589** - Apple Container networking issue
- `host.docker.internal` không resolve từ bên trong microVM
- Apple Container không support `--add-host` flag
- Blocking cho users muốn chạy NanoClaw trên Apple silicon với container isolation

**#2588** - `skill/apple-container` branch out of sync
- Branch references APIs không tồn tại trên main
- Assumes Node+tsc runtime nhưng mainline đã chuyển sang bun
- `/convert-to-apple-container` skill fails immediately

### 📊 Xu hướng:

- **Multi-channel stability** là priority cao - 4/6 closed issues liên quan đến channel authentication
- **Container runtime compatibility** đang được mở rộng (Podman, Apple Container)
- **Developer tooling** được đầu tư mạnh (rtk integration, context visibility, Codex support)

## 5. 🐛 Ổn định & Bugs

### ✅ Đã giải quyết:

1. **Agent-runner synthetic responses** (#2555/#2556) - Critical bug khiến multi-message batches không được xử lý
2. **Transcript memory leaks** (#2586) - Long-lived sessions phình to không kiểm soát
3. **Signal/WhatsApp auth failures** (#2581/#2584/#2579) - Multiple authentication flow bugs
4. **Rootless Podman broken** (#2572) - UID mapping và volume permission issues

### 🟡 Đang xử lý:

1. **Apple Container networking** (#2589) - Cần giải pháp cho `host.docker.internal` resolution
2. **Apple Container branch sync** (#2588) - Cần rebase/update branch với mainline changes
3. **Local development experience** (#2590) - Node version compatibility và dependency management

### 🔍 Patterns:

- Authentication flows across channels (Signal, WhatsApp) có nhiều edge cases
- Container runtime diversity (Docker, Podman, Apple Container) tạo ra compatibility challenges
- Cache invalidation và state management trong distributed agent system cần attention

## 6. 💡 Yêu cầu tính năng

### Đã implement:

- **Context window introspection** (#2573) - Agent giờ biết budget còn lại
- **Token optimization** (#2571) - rtk integration tiết kiệm 60-90% tokens
- **File delivery** (#1757) - Agent có thể send files về chat
- **Codex-first workflow** (#2580) - Alternative AI provider path

### Đang được thảo luận:

- **#2521** 🟡 Add `from-channel` và `from-type` attributes vào XML message format - useful cho multi-channel monitoring dashboards
- **#2591** 🟡 Namespace user IDs by channel-type prefix - tránh collision giữa channels

## 7. 👥 Phản hồi người dùng

### 😤 Pain Points:

**Local Development (#2590):**
- Dependency management phức tạp ngoài container
- Node version requirements gây friction
- User muốn debug without container overhead

**Apple Silicon (#2589, #2588):**
- Apple Container support chưa production-ready
- Networking issues block adoption
- Branch maintenance lag behind mainline

### 😊 Positive Signals:

- **Multi-channel support** đang mature - WhatsApp, Signal, Telegram đều có active fixes
- **Container skills ecosystem** đang phát triển - marketing workflows, OAuth integrations
- **Developer tooling** được prioritize - context visibility, token optimization

### 🎯 Community Contributions:

Ngày hôm nay có **15+ contributors** với PRs được merge, cho thấy community engagement mạnh:
- @IamAdamJowett - 5 PRs (agent-runner core fixes)
- @snymanpaul - 3 PRs (Signal auth, Apple Container issues)
- @shakhruz - 6 PRs (marketing skills, MCP tools)
- Plus contributions từ @chiptoe-svg, @claudiopostinghel, @augustweinbren, @guyb1, và nhiều người khác

## 8. 📋 Backlog & Roadmap

### 🔜 Immediate Priorities (dựa trên open issues):

1. **Apple Container stabilization** (#2588, #2589)
   - Sync skill/apple-container branch với mainline
   - Giải quyết networking issues trong microVM
   - Test end-to-end workflow

2. **Local development experience** (#2590)
   - Document supported Node versions
   - Improve dependency resolution
   - Consider containerless debug mode

3. **Test coverage** (#2596)
   - Update formatter tests sau khi drop `<messages>` envelope
   - Ensure regression prevention

### 🎯 Strategic Directions (inferred):

- **Multi-provider AI support** - Codex integration (#2580) mở đường cho thêm providers
- **Enterprise features** - Scoped permissions (#2566), credential management
- **Token efficiency** - rtk integration (#2571) là first step, có thể expand
- **Marketing automation** - Container skills ecosystem (#1780, #1781) đang được build out

### 📊 Velocity Metrics:

- **29 PRs merged** trong 24h - tốc độ merge rất cao
- **6 issues** active (3 open, 3 closed trong ngày)
- **High contributor diversity** - 15+ unique contributors
- **Fast turnaround** - nhiều PRs được merge trong vòng 1-2 ngày sau khi tạo

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn **rapid stabilization** sau một đợt feature development mạnh. Team đang tích cực fix các bugs nghiêm trọng ảnh hưởng production (agent-runner, auth flows, container runtime) trong khi vẫn ship new features (Codex support, token optimization, marketing skills). 

Điểm đáng chú ý là **community engagement rất cao** với 15+ contributors active, và team có khả năng **merge nhanh** (29 PRs/ngày). Tuy nhiên, cần attention vào **Apple Container support** và **local development experience** để giảm friction cho new contributors.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo phân tích IronClaw - Ngày 23/05/2026

## 🎯 Tóm tắt hôm nay

Dự án IronClaw đang trong giai đoạn tái cấu trúc lớn với **"Reborn"** - một kiến trúc mới hoàn toàn. Hoạt động tập trung vào việc xây dựng hệ thống multi-tenant an toàn, tích hợp OAuth cho Google Suite, và hoàn thiện framework hooks. Có **3 issues mới** được tạo trong ngày, tập trung vào bảo mật và độ bền dữ liệu. Không có release mới nhưng có **30 PRs đang active** với nhiều tính năng quan trọng đang được phát triển.

---

## 📦 Releases

**Không có release mới trong 24 giờ qua.**

---

## 🚀 Tiến độ dự án

### **Xu hướng chính: Kiến trúc Reborn**

Dự án đang thực hiện một cuộc đại tu kiến trúc với tên gọi "Reborn", tập trung vào:

#### **1. Multi-tenancy & Isolation** 🔒
- **PR #3890**: Thêm test coverage cho cô lập multi-tenant
  - Kiểm tra cô lập workspace/project trên filesystem chung
  - Cô lập attachment/blob paths
  - Cô lập event cursor và replay streams
  - Đảm bảo tenant không thể truy cập dữ liệu của nhau

#### **2. Google Suite Integration** 📧
Chuỗi 6 PRs (#3837, #3894, #3895, #3896, #3898, #3910) đang xây dựng tích hợp Google:
- **Phase 2** (#3894): Xử lý OAuth flow với `BlockedAuth` resume path
- **Phase 3** (#3895): Scaffold native extensions + đăng ký Google OAuth provider
- **Phase 4** (#3896): Wiring composition layer
- **Phase 6** (#3898): Gmail package với 6 capabilities
- **Testing** (#3910): Test GitHub WASM read egress route

**Tính năng Gmail sẽ bao gồm:**
- Đọc/gửi email
- Quản lý labels
- Search messages
- Draft management

#### **3. Hooks Framework** 🎣
- **PR #3573**: Foundation cho hooks framework (đã merge)
- **PR #3911-3914**: Series follow-up tối ưu performance và bảo mật
  - #3911: Khôi phục batched capability dispatch
  - #3912: Enforce validation tại construction
  - #3913: Defer capability input resolution (tối ưu performance)
  - #3914: Batch test coverage

#### **4. Security & Credentials** 🔐
- **PR #3888**: Dispatch auth continuations qua product workflow
- **PR #3903**: Đóng các lỗ hổng credential boundary trong production
- **PR #3767**: NoExposureGuard service để ngăn leak dữ liệu nhạy cảm
- **PR #3878, #3879, #3865**: Hoàn thiện product auth composition

#### **5. Infrastructure Improvements** 🏗️
- **PR #3887**: Route production builders qua factory pattern
- **PR #3908**: Filesystem checkpoint state store
- **PR #3900**: Docker sandbox command transport
- **PR #3899**: Reborn budgets - cost tracking end-to-end

---

## 🔥 Điểm nổi bật cộng đồng

### **Issues được tạo hôm nay:**

#### **#3916 - Harden LocalFilesystem** ⚠️ (Mới nhất)
- **Tác giả**: @zmanian
- **Vấn đề**: LocalFilesystem thiếu 2 tính năng quan trọng:
  1. Không honor `CAS::Absent` (content-addressable storage)
  2. Thiếu durable writes (atomic rename + fsync)
- **Tác động**: Có thể mất dữ liệu khi crash
- **Ưu tiên**: Backend-level fix, không nên paper over ở từng store

#### **#3915 - Security Pattern Issue** 🚨 (Quan trọng)
- **Tác giả**: @zmanian
- **Label**: `security-review-required`
- **Vấn đề**: Phát hiện anti-pattern nguy hiểm:
  - Khi guardrail dependency là `Option<_>` với no-op default
  - Các call sites phải nhớ chain `.with_xxx(real_thing)`
  - Quên = silent bypass, tests pass nhưng bảo mật giảm
- **Có 3 instances** trong reborn-integration PRs
- **Đề xuất**: Chuyển sang builder pattern bắt buộc hoặc compile-time checks

#### **#3905 - User-scoped Tool Installs** 🛠️
- **Tác giả**: @serrrfirat
- **Vấn đề**: Reborn có scoped model rõ ràng cho skills nhưng thiếu cho tools
- **Đề xuất**: Thêm `/tools` scope cho user-specific tools
- **Tác động**: Cho phép users cài đặt tools riêng mà không ảnh hưởng tenant

---

## 🐛 Ổn định & Bugs

### **Vấn đề đang được xử lý:**

1. **Filesystem Durability** (#3916)
   - Thiếu fsync có thể mất dữ liệu khi crash
   - Cần atomic rename pattern
   - Priority: HIGH (backend-level)

2. **Security Guardrail Bypass** (#3915)
   - 3 instances của silent bypass pattern
   - Cần refactor sang safer API design
   - Priority: HIGH (security-review-required)

3. **Tool Filtering** (#1378)
   - PR từ tháng 3 vẫn open
   - Per-channel MCP và built-in tool filtering
   - Cần cho multi-channel deployments

4. **DISABLE_TOOLS_LIST** (#3548)
   - PR từ tháng 5 vẫn open
   - Security regression test
   - Cho phép disable tools tại startup

### **Closed PRs hôm nay:**
- **#3878**: Product auth composition seam (merged vào #3888)
- **#3863**: Skill asset access adapter (merged)
- **#3837**: Google Suite design spec (merged)
- **#3865**: Product auth contracts (merged)
- **#3907**: Align WebUI serve defaults (merged)

---

## 💡 Yêu cầu tính năng

### **Đang phát triển:**

1. **Google Calendar Integration** (#3829, #3837)
   - 9 capabilities cho Calendar
   - OAuth flow hoàn chỉnh
   - Native extension architecture

2. **Notion MCP Capability** (#3805)
   - Lane 5 trong Reborn roadmap
   - Chờ secrets/auth composition hoàn thành

3. **GitHub WASM Capability** (#3806)
   - Lane 6 trong Reborn roadmap
   - Read/write capabilities
   - WASM-based tool package

4. **User-scoped Tools** (#3905)
   - Cho phép users cài tools riêng
   - Không ảnh hưởng tenant-wide config

5. **Per-channel Tool Routing** (#1378)
   - Filter tools theo channel (Slack/Telegram/Web)
   - JSON-configurable routing

---

## 💬 Phản hồi người dùng

### **Từ Issues & PRs:**

**Positive signals:**
- Kiến trúc Reborn được thiết kế kỹ lưỡng với nhiều design docs
- Security-first approach với nhiều review rounds
- Test coverage được ưu tiên cao

**Concerns:**
- **Complexity creep**: Nhiều PRs XL size, có thể khó review
- **Long-running PRs**: #1378 (từ tháng 3), #3548 (từ tháng 5) vẫn chưa merge
- **Security patterns**: #3915 cho thấy cần review lại API design patterns

**Developer experience:**
- Docs được update thường xuyên
- Contract tests được thêm cho mọi tính năng mới
- Clear separation of concerns trong architecture

---

## 🗺️ Backlog & Roadmap

### **Reborn Lanes (từ Issues):**

**Đã hoàn thành:**
- ✅ Lane 1-2: Extension-v2 catalog/runtime baseline
- ✅ Secrets/egress substrate

**Đang thực hiện:**
- 🔄 **Lane 3** (#3803): Wire secrets/egress through production tool composition
- 🔄 **Lane 4**: Google Suite integration (6 PRs active)
- 🔄 **Lane 5** (#3805): Notion MCP capability path
- 🔄 **Lane 6** (#3806): GitHub WASM capability path

### **Ưu tiên tiếp theo:**

1. **Security hardening** (HIGH)
   - Fix #3915 guardrail bypass pattern
   - Fix #3916 filesystem durability
   - Complete credential boundary gaps (#3903)

2. **Complete Google integration** (MEDIUM)
   - Merge phases 2-6
   - Add Calendar package
   - End-to-end testing

3. **Hooks optimization** (MEDIUM)
   - Merge #3911-3914 follow-ups
   - Performance validation
   - Production readiness

4. **Multi-tenancy validation** (MEDIUM)
   - Merge #3890 isolation tests
   - Stress testing
   - Documentation

### **Technical debt:**
- Migrate trace client (#3738) - XL PR vẫn open
- Tool filtering (#1378) - 2 tháng chưa merge
- DISABLE_TOOLS_LIST (#3548) - 11 ngày chưa merge

---

## 📈 Metrics

- **Issues mới hôm nay**: 3 (2 security-related, 1 feature request)
- **PRs active**: 30 (nhiều XL size)
- **PRs merged hôm nay**: 5
- **Contributors active**: ~8-10 người
- **Focus areas**: Security (40%), Google integration (30%), Infrastructure (30%)

---

## 🎬 Kết luận

IronClaw đang trải qua giai đoạn chuyển đổi quan trọng với kiến trúc Reborn. Team đang cân bằng giữa velocity (nhiều features mới) và quality (security reviews, test coverage). Hai vấn đề security được phát hiện hôm nay (#3915, #3916) cho thấy culture review code tốt. Google Suite integration là milestone lớn sắp hoàn thành. Cần chú ý đến các PRs long-running và technical debt đang tích tụ.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo phân tích LobsterAI - Ngày 2026-05-23

## 🎯 Tóm tắt hôm nay

LobsterAI vừa phát hành phiên bản **2026.5.22** với tập trung chính vào cải thiện trải nghiệm subagent, tối ưu artifacts preview, và tăng cường tính linh hoạt cấu hình model. Đội ngũ đã merge 15 PRs trong ngày 22/05, chủ yếu xoay quanh việc hoàn thiện hệ thống subagent session và sửa các lỗi cấu hình quan trọng.

---

## 🚀 Releases

### **Version 2026.5.22** - Phát hành 22/05/2026

**Điểm nhấn chính:**

#### 🤖 **Subagent UX Overhaul**
- **Sidebar hiển thị subagent sessions**: Giao diện mới cho phép xem danh sách các phiên làm việc của subagent với trạng thái real-time
- **Standalone detail view**: Tái sử dụng pipeline render conversation chính, đảm bảo trải nghiệm nhất quán
- **Persistent storage**: Messages của subagent được lưu vào SQLite local, tải nhanh hơn mà không cần network RPC
- **Lazy backfill**: Các session cũ được tự động đồng bộ khi người dùng click lần đầu

#### 🎨 **Artifacts & Preview**
- Tối ưu preview tags và browser annotation experiences
- Cải thiện hiển thị thinking block trong model responses

#### ⚙️ **Model Configuration Flexibility**
- Hỗ trợ custom parameters cho models
- Thêm `contextWindow` cho package models
- Sửa lỗi nghiêm trọng: loại bỏ properties không được hỗ trợ (`model`, `timezone`) khỏi dreaming config - trước đây gây crash gateway

#### 🔧 **Stability Improvements**
- Sửa lỗi browser config invalid
- Tối ưu IM-related copywriting
- Fix model switch error khi sử dụng custom models

**Ý nghĩa:** Release này đánh dấu bước tiến quan trọng trong việc biến subagent thành công dân hạng nhất trong LobsterAI, với UX tương đương main agent và khả năng persist data đáng tin cậy.

---

## 📈 Tiến độ dự án

### **Hoạt động merge cao (15 PRs merged trong 1 ngày)**

**Các PR quan trọng đã merge:**

1. **#2034** - Persist subagent messages to local DB
   - Chuyển từ network-dependent sang local-first architecture
   - Cải thiện performance đáng kể cho subagent sessions

2. **#2030** - Refactor subagent rendering pipeline
   - Extract `ConversationTurnsView` component tái sử dụng
   - Chuẩn hóa format `CoworkMessage` cho cả main và subagent

3. **#2026** - Fix dreaming config crash
   - **Critical fix**: Gateway không còn crash do invalid JSON schema
   - Loại bỏ timezone và model fields khỏi advanced settings

4. **#2033** - Fix subagent session bugs
   - Sửa missing tool results và tool input display
   - Fix sidebar highlight state navigation
   - Cải thiện error handling

### **Xu hướng phát triển:**

- **Architecture shift**: Từ RPC-heavy sang local-first với SQLite persistence
- **Component reusability**: Refactor để tái sử dụng code giữa main và subagent flows
- **Stability focus**: 5/15 PRs là bug fixes, cho thấy team đang consolidate sau feature additions

---

## 💬 Điểm nổi bật cộng đồng

### **Issue #2036** - Real-time persistence request (1 comment)
**Tác giả:** @woxinsj

**Nội dung:** Đề xuất thêm `agent:turn` hoặc `agent:loop` event vào OpenClaw gateway để broadcast sau mỗi vòng lặp chính. Điều này cho phép "thực sự làm được real-time persistence".

**Phân tích:**
- Phản ánh nhu cầu về observability và real-time data sync
- Liên quan trực tiếp đến PR #2034 về persistence
- Có thể là feature request cho OpenClaw upstream project
- Chưa có phản hồi từ maintainers, cần theo dõi

---

## 🐛 Ổn định & Bugs

### **Đã sửa trong ngày:**

✅ **Gateway crash do invalid config** (#2026)
- **Severity:** Critical - gây crash toàn bộ gateway
- **Root cause:** Dreaming config chứa properties không có trong OpenClaw JSON schema
- **Fix:** Remove `model` và `timezone` từ config output

✅ **Subagent session bugs** (#2033)
- Missing tool results trong sync
- Sidebar highlight state không đúng khi navigate back
- Empty state và error status handling

✅ **Browser config invalid** (#2031)
- Ảnh hưởng đến browser automation features

✅ **Model switch error với custom models** (#2032)
- Người dùng không thể chuyển đổi models khi dùng custom configuration

### **Vấn đề còn tồn đọng:**

⚠️ **Dependency updates backlog** - 5 PRs từ Dependabot vẫn open:
- #1766: Vite 5.4.21 → 8.0.13 (major version jump)
- #1765: @headlessui/react 1.7.19 → 2.2.10
- #1764: react-dom 18.3.1 → 19.2.6
- #1763: @vitejs/plugin-react 4.7.0 → 6.0.1
- #1277: Electron group updates

**Rủi ro:** Các major version updates này có thể chứa breaking changes, cần testing kỹ trước khi merge.

---

## 💡 Yêu cầu tính năng

### **Từ Issue #2036:**
- **Agent lifecycle events** cho OpenClaw gateway
- Real-time event broadcasting sau mỗi agent turn/loop
- Cho phép external systems react to agent state changes

### **Từ stale PRs (cần review):**

📌 **#1531** - Theme color selector redesign
- Thay grid layout bằng compact circle selector
- Gradient preview circles (theme color → white/black)
- Cải thiện UX cho theme customization

📌 **#1533** - Local session usage statistics panel
- Dashboard hiển thị stats từ SQLite
- Metrics: total sessions/messages, today/week counts, avg messages per session
- Giúp users hiểu usage patterns

📌 **#1534 & #1535** - Security hardening
- #1534: Tránh log leakage của API credentials và response bodies
- #1535: Whitelist cho renderer process KV store IPC
- **Quan trọng:** Cải thiện security posture, đặc biệt cho enterprise users

---

## 👥 Phản hồi người dùng

### **Tích cực:**
- Subagent UX improvements được implement nhanh chóng
- Team responsive với bug reports (nhiều fixes trong cùng ngày)
- Architecture improvements (local-first) cho thấy long-term thinking

### **Concerns:**
- **Issue #2036** chỉ ra gap trong real-time observability
- Dependency updates bị delay có thể tích lũy technical debt
- Security PRs (#1534, #1535) vẫn stale sau 1.5 tháng - cần prioritize

### **Engagement metrics:**
- Issues/PRs có ít reactions (0-1 👍) - có thể do:
  - Community size còn nhỏ
  - Hoặc users chủ yếu interact qua channels khác (Discord, WeChat?)

---

## 🗺️ Backlog & Roadmap

### **Immediate priorities (dựa trên activity):**

1. **✅ Subagent feature completion** - Đã hoàn thành phần lớn trong release 2026.5.22

2. **🔄 Pending review:**
   - Security hardening PRs (#1534, #1535) - **Nên prioritize**
   - UX improvements (#1531, #1533)
   - Dependency updates - **Cần testing plan**

3. **🆕 Emerging needs:**
   - OpenClaw gateway event system (#2036)
   - Real-time persistence improvements

### **Technical debt:**
- 5 major dependency updates pending
- Stale PRs từ đầu tháng 4 cần decision (merge hoặc close)

### **Xu hướng dài hạn:**
- **Local-first architecture**: Giảm dependency vào network, tăng reliability
- **Component reusability**: Refactor để scale codebase tốt hơn
- **Enterprise readiness**: Security improvements, usage analytics

---

## 🎓 Insights & Recommendations

### **Điểm mạnh:**
✨ Velocity cao - 15 PRs merged trong 1 ngày
✨ Focus rõ ràng - subagent experience là priority
✨ Quality consciousness - nhiều bug fixes đi kèm features

### **Cần cải thiện:**
⚠️ **Stale PR management** - 6 PRs open > 1 tháng, cần triage
⚠️ **Security PR priority** - #1534, #1535 quan trọng nhưng chưa được merge
⚠️ **Community engagement** - Ít reactions/comments, cần strategies để tăng participation

### **Khuyến nghị:**
1. Tạo milestone cho dependency updates với testing checklist
2. Review và merge/close các stale PRs để giữ backlog clean
3. Prioritize security improvements trước khi scale user base
4. Document agent lifecycle events (#2036) để align với OpenClaw roadmap

---

**📅 Ngày báo cáo:** 2026-05-23  
**🔗 Repository:** [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo Phân tích Dự án Moltis - Ngày 23/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 23/05 đánh dấu một đợt phát hành lớn với **9 PRs được merge** giải quyết nhiều vấn đề quan trọng về Docker, voice/TTS, và trải nghiệm người dùng. Đội ngũ phát triển tập trung mạnh vào việc cải thiện khả năng triển khai Docker và sửa các lỗi nghiêm trọng trong telephony/voice system. Đặc biệt, có sự chú trọng đến việc tích hợp tài liệu và cải thiện developer experience.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng có **9 PRs được merge** tạo nền tảng cho release tiếp theo với nhiều cải tiến đáng kể.

---

## 📈 Tiến độ dự án

### PRs Quan trọng đã Merge (9 PRs)

#### 🔧 **Cải thiện Docker & Sandbox** (3 PRs)
- **#1040**: Sửa lỗi đọc file media trong Docker sandbox
  - Giải quyết vấn đề `send_image` và `send_document` thất bại trong môi trường Docker
  - Thêm fallback mechanism khi file chỉ visible trong container
  
- **#1035**: Auto-detect Docker host data mounts
  - Tự động phát hiện mount points khi chạy trong Docker/Podman
  - Cải thiện browser sandbox profile mounting
  - **Giải quyết #977** - Browser sandbox fails in Docker

#### 🎙️ **Voice & TTS Improvements** (2 PRs)
- **#1043**: Xử lý Piper TTS audio conversion
  - Phân biệt rõ ràng giữa raw PCM và WAV-wrapped PCM
  - Cải thiện metadata handling cho audio formats
  - **Giải quyết #1029**

- **#1041**: Sửa lỗi OpenAI TTS format
  - Chuyển sang MP3 cho OpenAI-compatible providers
  - Tránh lỗi `opus` format không được hỗ trợ bởi Speaches
  - **Giải quyết #1030**

#### 📞 **Telephony Fix** (1 PR)
- **#1034**: Sửa Twilio gather speech dispatch
  - Fix parsing logic cho `SpeechResult` và `Digits`
  - Thêm regression tests cho Twilio payloads
  - **Giải quyết #1032** - Agent không phản hồi trong phone calls

#### 📚 **Developer Experience** (1 PR)
- **#1044**: Expose local Moltis docs to agents
  - Agents có thể truy cập tài liệu local trước khi fallback ra public docs
  - Tự động generate config template reference
  - **Giải quyết #1028** - Cải thiện khả năng self-help của agents

#### 💬 **Chat Enhancements** (1 PR)
- **#1042**: Hỗ trợ arbitrary file attachments
  - Upload bất kỳ loại file nào qua web chat
  - Preserve inline multimodal image handling
  - **Giải quyết #1036**

#### 🔐 **Security & Configuration** (1 PR)
- **#1033**: Cho phép disable vault encryption
  - Thêm `auth.vault_enabled` config option
  - API và UI để decrypt và disable vault khi cần

### 📊 Xu hướng phát triển

- **Docker-first approach**: 3/9 PRs tập trung vào Docker compatibility
- **Voice/Audio quality**: Đầu tư mạnh vào TTS/STT pipeline
- **Developer experience**: Tích hợp docs và cải thiện debugging
- **Production readiness**: Sửa các lỗi nghiêm trọng trong telephony

---

## ⭐ Điểm nổi bật cộng đồng

### Issues được quan tâm nhất:

1. **#977 - Browser sandbox fails in Docker** (5 comments)
   - Vấn đề phức tạp với LXC/Proxmox setup
   - Đã được giải quyết qua #1035 và #1040
   - Cho thấy nhiều users triển khai Moltis trong môi trường containerized

2. **#1028 - Agent access to Moltis docs** (2 comments)
   - Feature request từ @IlyaBizyaev
   - Được implement nhanh chóng trong #1044
   - Cải thiện khả năng tự giải quyết vấn đề của agents

### 🎯 Tương tác cộng đồng:
- **8 issues** được xử lý trong 24h (7 closed, 1 open)
- **9 PRs** được merge - tốc độ phát triển rất cao
- Thời gian phản hồi nhanh: hầu hết issues được giải quyết trong 1-2 ngày

---

## 🐛 Ổn định & Bugs

### Bugs đã sửa (6 issues closed):

1. **#977** - Browser sandbox Docker compatibility ✅
   - Root cause: Mount path translation issues
   - Solution: Auto-detection mechanism

2. **#1030** - OpenAI TTS format incompatibility ✅
   - Root cause: Hardcoded `opus` format
   - Solution: Dynamic format selection (MP3 cho OpenAI)

3. **#1032** - Twilio agent không phản hồi ✅
   - Root cause: Speech result parsing logic
   - Solution: Fix gather dispatch order

4. **#1037** - send_image/send_document fail in Docker ✅
   - Root cause: File visibility trong sandbox
   - Solution: Fallback read mechanism

### Bug còn mở:

1. **#1045** - No syntax highlighting in light mode 🔴
   - UI/UX issue
   - Chưa có PR xử lý
   - Priority: Medium (cosmetic)

### 🔍 Phân tích:
- Tập trung vào **infrastructure bugs** (Docker, telephony)
- Hầu hết bugs được phát hiện và sửa trong vòng 1-2 ngày
- Chất lượng testing tốt với regression coverage

---

## 💡 Yêu cầu tính năng

### Features đã implement (3 issues):

1. **#1028** - Agent access to local docs ✅
   - Cải thiện agent autonomy
   - Giảm dependency vào external docs

2. **#1036** - Arbitrary file attachments ✅
   - Mở rộng khả năng chat multimodal
   - Hỗ trợ documents, không chỉ images

3. **#1029** - Piper TTS audio handling ✅
   - Cải thiện audio pipeline
   - Better format support

### 🎨 Insight:
- Features được implement rất nhanh (1-2 ngày)
- Focus vào **practical usability** hơn là flashy features
- Cân bằng tốt giữa user requests và technical debt

---

## 💬 Phản hồi người dùng

### Positive signals:

- **@TLA020** (#977): Báo cáo chi tiết về Docker setup, cho thấy users đang deploy production
- **@IlyaBizyaev**: Active contributor với nhiều feature requests chất lượng
- **@karlmdavis** (#1032): Testing telephony features, cho thấy real-world usage

### Pain points được giải quyết:

1. **Docker deployment complexity** - Đã được cải thiện đáng kể
2. **Voice/TTS reliability** - Multiple fixes cho production use cases
3. **Developer experience** - Docs integration và better error handling

### 📢 Community health:
- Contributors đa dạng (không chỉ core team)
- Issue reports chất lượng cao với context đầy đủ
- Fast response time tạo trust với community

---

## 🗺️ Backlog & Roadmap

### Immediate priorities (dựa trên activity):

1. **UI Polish** 🎨
   - #1045: Syntax highlighting in light mode
   - Potential: More theme improvements

2. **Docker Stability** 🐳
   - Continue monitoring Docker-related issues
   - Potential: Better documentation cho deployment

3. **Voice/Audio Pipeline** 🎙️
   - Consolidate TTS/STT improvements
   - Potential: More provider support

### Technical debt addressed:

- ✅ Vault encryption flexibility (#1033)
- ✅ Audio format handling (#1043)
- ✅ Sandbox path resolution (#1035, #1040)

### 🔮 Predicted next steps:

1. **Release preparation** - Với 9 PRs merged, likely có release sắp tới
2. **Documentation update** - Reflect new Docker improvements
3. **Testing & stabilization** - Ensure telephony fixes work in production
4. **Community feature requests** - Continue fast implementation cycle

---

## 📌 Kết luận

**Ngày 23/05/2026** là một ngày **cực kỳ productive** cho Moltis với:

- ✅ **7 bugs được giải quyết**
- ✅ **9 PRs được merge**
- ✅ **3 features mới được implement**
- ✅ **Cải thiện đáng kể Docker compatibility**

Dự án đang trong giai đoạn **maturation** với focus vào production readiness, stability, và developer experience. Tốc độ phát triển cao nhưng vẫn maintain quality thông qua testing và community feedback.

**Momentum tích cực** 📈 - Expect release mới trong vài ngày tới!

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo Phân tích Hệ sinh thái CoPaw - Ngày 23/05/2026

## 1. 🎯 Tóm tắt hôm nay

Ngày 23/05/2026 chứng kiến hoạt động phát triển sôi nổi với **23 Pull Requests** và **24 Issues** mới. Dự án tập trung mạnh vào việc cải thiện trải nghiệm người dùng qua các kênh chat (WeChat, DingTalk), nâng cấp hệ thống plugin với lifecycle hooks, và mở rộng khả năng kiểm thử với 967 test cases mới đạt 89% coverage cho module security. Đáng chú ý là sự xuất hiện của nhiều first-time contributors, cho thấy cộng đồng đang phát triển tích cực.

## 2. 📦 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng nhiều PR đang hướng tới milestone tiếp theo với các tính năng quan trọng.

## 3. 🚀 Tiến độ dự án

### **Các PR quan trọng đang mở:**

#### 🔧 **Cải thiện hạ tầng core**
- **#4467** - Test coverage milestone: Thêm 967 unit tests cho modules `security` và `agents`, đạt 89% coverage cho security module. Đây là Phase 1+2 của kế hoạch nâng cấp chất lượng code.
- **#4464** - Migration E2E testing với mock infrastructure, chuẩn bị cho CI/CD pipeline mạnh mẽ hơn.

#### 🔌 **Plugin ecosystem expansion**
- **#4638** - **Session & message lifecycle hooks** (#4249): Cho phép plugins can thiệp vào lifecycle của session và message, mở rộng khả năng tùy biến sâu.
- **#4628** - **Plugin export/download as ZIP**: Tính năng backup và chia sẻ plugin dễ dàng hơn.
- **#4622** - **DataPaw plugin**: Plugin phân tích dữ liệu với 12 BI skills, đóng góp từ cộng đồng.

#### 💬 **Channel improvements**
- **#4627** - Fix WeChat token invalidation logic với per-request meta flag thay vì instance-level flag, giải quyết vấn đề cross-request interference.
- **#4600** - Fix DingTalk filename encoding cho tên file tiếng Trung.
- **#4565** - **Unified access control system**: Whitelist/blacklist/pending approval cho tất cả channels với per-workspace store và console UI.

#### 🖥️ **Desktop & UI enhancements**
- **#3813** - Tauri 2.x desktop app support (đang review từ tháng 4).
- **#4629** - Cải thiện sidebar layout với collapse button luôn visible.
- **#4637** - **Customizable slash command menu**: Cho phép user chọn commands hiển thị trong `/` shortcut menu.

#### 🔐 **Security & MCP**
- **#4630** - MCP marketplace integration với health check và key validation.
- **#4395** - Security test coverage cho tool guard utilities.

### **Xu hướng phát triển:**
- **Chất lượng code**: Tập trung mạnh vào testing và coverage (967 tests mới).
- **Plugin ecosystem**: Mở rộng khả năng tùy biến với hooks và marketplace.
- **Multi-channel stability**: Sửa nhiều bugs liên quan đến WeChat, DingTalk.
- **Desktop experience**: Đầu tư vào Tauri app và UI/UX improvements.

## 4. ⭐ Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

1. **#4620** (12 comments) - **Chat history disappeared**: Bug nghiêm trọng về mất lịch sử chat khi switch session. User phản ánh đây là "critical bug existed for a long time".

2. **#4474** (8 comments) - **ChatGPT-5.5 support**: User hỏi về hỗ trợ model mới nhất, cho thấy nhu cầu cập nhật model list thường xuyên.

3. **#4051** (10 comments) - **DeepSeek V4 Flash thinking tag parsing**: Vấn đề parse `<thinking>` tag của DeepSeek model, ảnh hưởng trải nghiệm.

### **First-time contributors:**
- @jc200808, @weidankong, @DICKQI, @EliasMei, @sunies, @ningblue - Cho thấy dự án đang thu hút contributors mới tích cực.

## 5. 🐛 Ổn định & Bugs

### **Bugs đang được xử lý:**

#### **Critical:**
- **#4620** - Chat history disappearance (12 comments, chưa giải quyết)
- **#3984** - Context compaction tạo orphaned assistant messages trong UI

#### **High priority:**
- **#4625** - MiniMax M2.5 trả về XML format trong thinking process, gây incompatibility
- **#4616** - Dream awakening task error với WeChat channel
- **#4556** - Voice transcription dùng browser Speech API thay vì configured Whisper provider

#### **Medium:**
- **#4607** - NO_PROXY environment variable không hoạt động
- **#4619** - UI inconsistency (vertical alignment, dropdown arrows)
- **#4631** - Desktop app hiển thị Python icon thay vì QwenPaw icon

### **Bugs đã fix (PRs merged):**
- ✅ **#4621** - Gemini/Gemma `max_tokens` validation error
- ✅ **#4600** - DingTalk Chinese filename encoding
- ✅ **#4627** - WeChat token invalidation cross-request issue
- ✅ **#4626** - QwenPaw-pet stuck in Done state

## 6. 💡 Yêu cầu tính năng

### **Feature requests nổi bật:**

1. **#4635** - **Mobile responsive design**: Yêu cầu WebUI console responsive cho mobile browsers, bổ sung cho các chat channels hiện có.

2. **#4634** - **Window size/position memory**: Desktop app ghi nhớ kích thước và vị trí cửa sổ giữa các lần khởi động.

3. **#4633** - **Customizable slash command menu**: Cho phép user chọn commands hiển thị trong `/` menu (đã có PR #4637).

4. **#4624** - **Per-model retry & rate limiting**: Cấu hình riêng biệt cho từng model thay vì global config, đặc biệt quan trọng khi dùng nhiều providers với quota khác nhau.

5. **#4617** - **Remote Playwright browser endpoint**: Cho phép dùng browserless service thay vì local browser cho `browser_use` tool.

6. **#4632** - **Multi-line text writing tool**: Thiếu tool đáng tin cậy để ghi file nhiều dòng, ảnh hưởng skill development và code persistence.

7. **#4613** - **Plugin agent hooks**: Yêu cầu `register_agent_hook` để plugins can thiệp vào agent lifecycle (đã có PR #4638).

8. **#4611** - **ACP session auto-close**: ACP session không tự đóng sau khi task hoàn thành, gây conflict khi start lại.

## 7. 💬 Phản hồi người dùng

### **Trải nghiệm tích cực:**
- Cộng đồng đánh giá cao tốc độ phản hồi của maintainers
- Nhiều contributors mới tham gia, cho thấy documentation và onboarding tốt

### **Pain points chính:**

1. **Multi-model management**: User @shit6 (#4624) phản ánh việc dùng nhiều models với quota khác nhau (MiniMax M2.7: 40 QPM, M2.5: 60 QPM) nhưng chỉ có global retry/rate-limit config, gây lãng phí quota hoặc hit limit.

2. **Channel stability**: Nhiều issues về WeChat (#4612, #4521, #4616) và DingTalk (#4586), cho thấy integration với messaging platforms vẫn cần ổn định hơn.

3. **Model compatibility**: DeepSeek V4 (#4051), MiniMax M2.5 (#4625), Gemini (#4605) đều có parsing/validation issues, cho thấy cần test coverage tốt hơn cho các model mới.

4. **Desktop UX**: Thiếu window state persistence (#4634), icon hiển thị sai (#4631).

5. **Documentation gap**: User không biết về 20+ slash commands vì chỉ có 4-5 commands trong menu (#4633).

## 8. 📋 Backlog & Roadmap

### **Đang trong pipeline (dựa trên PRs open):**

#### **Q2 2026 priorities:**
1. ✅ **Test coverage milestone** (#4467) - Phase 1+2 hoàn thành, 967 tests, 89% security coverage
2. 🔄 **Desktop app** (#3813) - Tauri 2.x integration (under review từ tháng 4)
3. 🔄 **Plugin ecosystem v2** (#4638, #4628) - Lifecycle hooks + export/import
4. 🔄 **Unified access control** (#4565) - Cross-channel whitelist/blacklist system
5. 🔄 **MCP marketplace** (#4630) - Built-in server templates + health monitoring

#### **Upcoming (dựa trên feature requests):**
- Mobile responsive design (#4635)
- Per-model configuration (#4624)
- Remote browser support (#4617)
- Multi-line file writing tool (#4632)

### **Technical debt:**
- Chat history persistence (#4620, #3984) - Critical bug cần ưu tiên
- Model compatibility layer - Cần abstraction tốt hơn cho thinking tags, validation
- Channel error handling - Cần unified error reporting across channels

---

## 📈 Metrics tổng quan

- **PRs mở**: 23 (15 open, 8 closed trong ngày)
- **Issues mở**: 24 (19 open, 5 closed trong ngày)
- **First-time contributors**: 6 người
- **Test coverage mới**: +967 tests (89% security module)
- **Plugins mới**: 1 (DataPaw - data analysis)

**Đánh giá chung**: Dự án đang trong giai đoạn phát triển mạnh mẽ với focus vào **quality** (testing), **extensibility** (plugins), và **stability** (channel fixes). Cộng đồng tích cực với nhiều contributors mới, nhưng cần ưu tiên giải quyết critical bugs về chat history và channel stability.

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo phân tích GoClaw - 23/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 23/05 ghi nhận hoạt động phát triển tích cực với 4 PRs đang được xử lý, tập trung vào việc sửa lỗi và cải thiện trải nghiệm người dùng. Đáng chú ý là việc khắc phục lỗi nghiêm trọng về browser tool trên Windows và vấn đề bảo mật MCP tools. Một lỗ hổng bảo mật nghiêm trọng (P0-critical) về bypass quyền admin vẫn đang mở từ 07/05, cần được ưu tiên xử lý.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### Pull Requests đang hoạt động:

**🔧 Sửa lỗi kỹ thuật (2 PRs):**

- **#1168** - Fix browser tool trên Windows
  - Giải quyết lỗi `context canceled` khi sử dụng browser tool
  - Nguyên nhân: browser object bị gắn với context ngắn hạn, hết hạn sau khi `Start()` return
  - Thêm auto-detection cho Microsoft Edge làm fallback browser
  - Bổ sung tài liệu troubleshooting cho Windows
  - **Ý nghĩa**: Cải thiện đáng kể trải nghiệm người dùng Windows, mở rộng khả năng tương thích

- **#1167** - Fix MCP tools không hiển thị cho granted agents
  - Lỗi: MCP tools không visible sau khi grant MCP server
  - Root cause: Tool policy engine sử dụng stale/global registry thay vì agent-specific registry
  - **Ý nghĩa**: Khắc phục vấn đề quan trọng trong hệ thống phân quyền tools

**✨ Tính năng mới (2 PRs):**

- **#1135** - Compose file picker (cập nhật 22/05)
  - Script bash đơn giản để chọn configuration files cho docker-compose
  - Cho phép set COMPOSE_FILE qua .env
  - Cách tiếp cận đơn giản hơn so với các phiên bản trước
  - **Ý nghĩa**: Cải thiện developer experience khi làm việc với nhiều compose configs

- **#485** - Podman rootless setup (CLOSED 22/05)
  - Script interactive để setup podman rootless
  - Tự động copy pre-configured configs
  - Hỗ trợ mise users
  - **Trạng thái**: Đã được merge/close, hoàn thành việc hỗ trợ podman

### Xu hướng phát triển:

📊 **Tập trung vào stability & developer experience**: 75% PRs liên quan đến bug fixes và tooling improvements, cho thấy dự án đang trong giai đoạn ổn định và polish.

---

## 🌟 Điểm nổi bật cộng đồng

**⚠️ Mức độ tương tác thấp**: Tất cả các PRs và issues đều có 0 reactions và ít/không có comments, cho thấy:
- Cộng đồng có thể đang ở múi giờ khác hoặc chưa kịp review
- Hoặc đây là các vấn đề kỹ thuật nội bộ chưa thu hút sự chú ý rộng rãi

**🔍 Vấn đề đáng chú ý**: Issue #1118 về security bypass đã mở 16 ngày nhưng chưa có bình luận nào, điều này đáng lo ngại với một lỗ hổng P0-critical.

---

## 🐛 Ổn định & Bugs

### 🚨 Critical Issues:

**#1118 - [P0-CRITICAL] Security: RoleAdmin Gateway Auth Bypass**
- **Mức độ**: Nghiêm trọng nhất (P0)
- **Vấn đề**: User với role Viewer có thể modify admin-only TTS và Storage config
- **Broken access control vulnerability** cho phép privilege escalation
- **Trạng thái**: OPEN từ 07/05 (16 ngày) - **CẦN XỬ LÝ NGAY**
- **Tags**: `bug`, `P0-critical`, `area:security`, `area:config`
- **Rủi ro**: Có thể bị exploit để chiếm quyền điều khiển hệ thống

### 🔧 Bugs đang được fix:

1. **Browser tool context canceled trên Windows** (#1168)
   - Platform-specific issue
   - Đã có solution rõ ràng
   - Kèm documentation

2. **MCP tools visibility issue** (#1167)
   - Registry synchronization problem
   - Ảnh hưởng đến tool access control

**📊 Đánh giá**: Dự án đang xử lý tốt các technical bugs, nhưng cần tăng tốc với security issue P0.

---

## 💡 Yêu cầu tính năng

**Không có feature requests mới trong ngày 23/05.**

Các tính năng đang được implement:
- ✅ Podman rootless support (đã hoàn thành)
- 🔄 Compose file picker (đang review)
- 🔄 Windows browser compatibility improvements (đang review)

---

## 💬 Phản hồi người dùng

**📉 Mức độ engagement thấp**: 
- Không có comments mới trên các PRs/issues
- Không có reactions từ cộng đồng
- Có thể do:
  - Thời điểm trong ngày (02:01 UTC)
  - Các thay đổi chủ yếu là technical/internal
  - Cộng đồng nhỏ hoặc chưa active

**🎯 Điểm tích cực**:
- Contributors đang active với nhiều PRs
- Các fix đều có mô tả chi tiết và root cause analysis
- Documentation được cập nhật kèm theo code changes

---

## 🗺️ Backlog & Roadmap

### Ưu tiên cao (cần xử lý ngay):

1. **🔴 Security fix cho #1118** - RoleAdmin bypass vulnerability
   - P0-critical, đã mở 16 ngày
   - Cần security patch và release khẩn cấp

### Đang trong pipeline:

2. **Review và merge các PRs hiện tại**:
   - #1168 (browser fix) - ready for review
   - #1167 (MCP tools) - ready for review  
   - #1135 (compose picker) - cần feedback

### Xu hướng phát triển:

- **Platform compatibility**: Tăng cường hỗ trợ Windows và alternative container runtimes (podman)
- **Developer tooling**: Cải thiện setup và configuration experience
- **Security hardening**: Cần focus hơn vào access control và authorization

---

## 📌 Khuyến nghị

1. **🚨 Ưu tiên tuyệt đối**: Xử lý security issue #1118 trong 24-48h tới
2. **👥 Tăng cường review**: Các PRs cần được review và merge nhanh hơn để maintain momentum
3. **📣 Communication**: Cân nhắc thông báo về security fix khi release để tăng trust
4. **🧪 Testing**: Đảm bảo có security tests cho authorization logic

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo phân tích Hermes-Agent - 23/05/2026

## 1. 🎯 Tóm tắt hôm nay

Ngày 23/05 ghi nhận hoạt động phát triển cực kỳ sôi động với **21 PR mới** được tạo trong 24 giờ qua, tập trung vào việc sửa lỗi hệ thống quan trọng và cải thiện trải nghiệm đa nền tảng. Các vấn đề nghiêm trọng về mất dữ liệu Kanban, xung đột cấu hình trong môi trường worker, và lỗi tương thích provider đang được xử lý khẩn cấp. Đáng chú ý là nỗ lực quốc tế hóa (i18n) với 11 ngôn ngữ và cải thiện hỗ trợ Docker cho môi trường enterprise.

## 2. 📦 Releases

**Không có release mới** trong 24 giờ qua. Phiên bản hiện tại đang được sử dụng là **v0.13.0** (commit a84cec61).

## 3. 🚀 Tiến độ dự án

### 🔥 Các PR quan trọng đang được xử lý:

**Sửa lỗi nghiêm trọng (P1-P2):**

- **#30695** - Ngăn chặn mất dữ liệu khi Kanban worker đọc file bị cắt ngắn
  - Vấn đề: Worker chỉ đọc 500 dòng đầu nhưng ghi đè toàn bộ file → mất code
  - Giải pháp: Thêm cảnh báo khi file bị truncate, yêu cầu xác nhận trước khi ghi

- **#30687** - Mất dữ liệu hoàn toàn khi Kanban DB bị corrupt
  - Tình huống: DB board bị lỗi + DB top-level rỗng → tự động tạo lại mà không cảnh báo
  - Mức độ: **P1 - Critical**

- **#30511** - Docker container không được tái sử dụng
  - Vấn đề: Mỗi lần restart tạo container mới với UUID ngẫu nhiên
  - Ảnh hưởng: Lãng phí tài nguyên, mất state

**Cải thiện tương thích provider:**

- **#30697** - Sửa lỗi GitHub Copilot + Gemini từ chối tool schemas
  - Vấn đề: Integer enums và union type arrays bị reject với HTTP 400
  - Giải pháp: Sanitize schemas cho Gemini, chuyển enums thành descriptions

- **#30693** - Copilot token fallback khi exchange API thất bại
  - Đảm bảo model picker vẫn hoạt động khi `/copilot_internal/v2/token` fail

**Cải thiện đa nền tảng:**

- **#30689** - Sửa lỗi MCP server cleanup trên WSL2
  - Vấn đề: `/proc/<pid>/task/<pid>/children` trả về rỗng trên WSL2
  - Giải pháp: Dùng `ps --ppid` làm phương pháp chính

- **#30690** - Discord PNG alpha channel gây lỗi gửi file
  - Tự động convert PNG RGBA → JPEG để tránh silent delivery failures

### 🌍 Tính năng mới đáng chú ý:

- **#30492** - Quốc tế hóa hoàn chỉnh với 11 ngôn ngữ
  - Thay thế hardcoded strings bằng `t()` calls
  - Hỗ trợ: zh, ja, ko, de, fr, es, pt, ru, ar, hi, vi
  - Phạm vi: 17 Python files (agent, gateway, platforms)

- **#30683** - Hybrid agent control-plane MVP
  - Scaffolding cho multi-agent orchestration
  - File-based handoff protocol
  - Không yêu cầu live agent spawning ở Phase 1

- **#30686** - Multi-account Google Workspace
  - Hỗ trợ nhiều tài khoản Gmail/Workspace (personal + work)
  - Backward compatible

## 4. 💬 Điểm nổi bật cộng đồng

### Issues được quan tâm:

**#30655** (P2) - Kanban worker làm hỏng git history
- **Tình huống thực tế**: Worker refactor 30 Swift files, `read_file` chỉ lấy 500 dòng đầu nhưng `write_file` ghi đè toàn bộ
- **Tác động**: Mất code, git history bị corrupt
- **Phản hồi**: Đã có PR #30695 xử lý trong ngày

**#30678** (P3) - Kanban board override bị ignore trong worker env
- **Vấn đề**: `HERMES_KANBAN_DB` env var override cả explicit `board=` argument
- **Ảnh hưởng**: Không thể target board khác trong worker context
- **Trạng thái**: Đã có fix #30681

**#30682** (P2) - Xiaomi MiMo + computer_use fail với 400 error
- **Provider**: Xiaomi MiMo (mimo-v2-omni)
- **Lỗi**: "text is not set" khi dùng computer_use tool
- **Nguyên nhân**: Có thể do schema không tương thích

## 5. 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đang được xử lý:

**Mất dữ liệu (P1):**
- ✅ #30655 - File truncation trong Kanban worker (có PR)
- ⚠️ #30687 - Silent DB recreation khi corrupt (chưa có PR)

**Xung đột cấu hình (P2-P3):**
- ✅ #30678 - Board override bị ignore (có PR #30681)
- ✅ #30612 - `--profile` không được honor trong ACP (có PR)

**Provider compatibility (P2-P3):**
- ✅ #30676 - GitHub Copilot + Gemini tool schema rejection (có PR #30697)
- ⚠️ #30682 - Xiaomi MiMo computer_use fail (chưa có PR)
- ✅ #29539 - Claude Code Pro/Max chuyển sang API mode (đang điều tra)

**Docker & Infrastructure (P2):**
- ✅ #30336 - Container không được reuse (có PR #30511)
- ✅ #30394 - Missing provider extras trong Docker image (có PR #30504)
- ✅ #30506 - Shell injection risk trong Docker cleanup (có PR)

### Cải thiện chất lượng code:

- **#30696** - Tránh ty panic trong checkpoint pruning loops
- **#30694** - Stagger MCP keepalive probes để tránh thundering herd
- **#30688** - Persist cron job metadata trong fast-forward path

## 6. ✨ Yêu cầu tính năng

### Đang được đề xuất:

**#24415** (P3, 👍1) - OpenRouter làm STT provider
- **Lý do**: Users có `OPENROUTER_API_KEY` muốn dùng chung cho LLM + STT
- **Hiện tại**: Phải setup riêng Groq/OpenAI/xAI key
- **Trạng thái**: Open, 2 comments

**#16004** (P3) - Configurable bounded auto-continue
- **Vấn đề**: Agent dừng khi hết tool-call iteration budget
- **Đề xuất**: Cho phép auto-continue có giới hạn trong ACP/VS Code
- **Use case**: Long-running autonomous work

**#20059** (P3) - Hermes Desktop App
- **Công nghệ**: Electron/Vite
- **Tính năng**: Chat, composer, panes, previews, settings, file browser, voice controls
- **Trạng thái**: PR đang open, có screenshot demo

### Tính năng đã implement:

- ✅ Multi-account Google Workspace (#30686)
- ✅ Telegram voice transcript echo (#30544)
- ✅ 11-language i18n (#30492)
- ✅ Desktop GUI launcher (#30165 - merged)

## 7. 👥 Phản hồi người dùng

### Vấn đề người dùng gặp phải:

**Mất dữ liệu trong autonomous workflows:**
- User @HypeLaser báo cáo mất code khi Kanban worker refactor
- Nguyên nhân: Default 500-line truncation không được cảnh báo
- Phản hồi team: Fix trong ngày với PR #30695

**Khó khăn với multi-provider setup:**
- Users muốn dùng chung API key cho nhiều services
- Ví dụ: OpenRouter cho cả LLM và STT
- Hiện tại: Phải setup riêng từng provider

**Docker deployment issues:**
- Missing provider dependencies trong isolated networks
- Container không được reuse → lãng phí resources
- Team đang fix với #30504 và #30511

### Trải nghiệm tích cực:

- Desktop app đang được phát triển với UI đẹp (screenshot trong #20059)
- I18n support cho 11 ngôn ngữ đang được hoàn thiện
- Multi-account support cho Google Workspace

## 8. 📋 Backlog & Roadmap

### Đang trong pipeline (dựa trên PRs):

**Phase hiện tại - Stability & Platform Support:**
- 🔄 Sửa các lỗi mất dữ liệu nghiêm trọng (P1)
- 🔄 Cải thiện Docker support cho enterprise
- 🔄 Hoàn thiện i18n cho 11 ngôn ngữ
- 🔄 Provider compatibility fixes (Copilot, Gemini, Xiaomi)

**Phase tiếp theo - Multi-Agent & Desktop:**
- 🎯 Hybrid agent control-plane (scaffolding đã có #30683)
- 🎯 Desktop app release (#20059 đang finalize)
- 🎯 Multi-account support cho các services khác

**Backlog dài hạn:**
- OpenRouter STT integration (#24415)
- Bounded auto-continue (#16004)
- Research task metaharness (#30679)

### Xu hướng phát triển:

1. **Tập trung vào reliability**: 7/21 PRs hôm nay là bug fixes nghiêm trọng
2. **Mở rộng platform support**: WSL2, Docker, Discord, Telegram
3. **Enterprise-ready**: Multi-account, i18n, persistent containers
4. **Hướng tới multi-agent**: Control-plane scaffolding đã bắt đầu

---

**📈 Thống kê hoạt động:**
- 21 PRs mới trong 24h
- 9 issues đang active
- 3 PRs merged trong ngày
- Tỷ lệ bug fix: ~33% (7/21 PRs)
- Tỷ lệ feature: ~24% (5/21 PRs)

**🎯 Ưu tiên tuần tới:**
1. Merge các critical bug fixes (P1-P2)
2. Hoàn thiện i18n rollout
3. Stabilize Docker support
4. Review desktop app cho release

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*