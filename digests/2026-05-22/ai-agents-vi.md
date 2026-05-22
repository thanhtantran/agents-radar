# Bản tin Hệ sinh thái OpenClaw 2026-05-22

> Issues: 257 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-05-22 02:00 UTC

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

# Báo cáo phân tích OpenClaw - 22/05/2026

## 1. 📊 Tóm tắt hôm nay

Ngày 22/05 chứng kiến hoạt động phát triển mạnh mẽ với **2 releases beta** (v2026.5.20 và v2026.5.20-beta.2) tập trung vào cải thiện bảo mật exec approvals và Discord voice sessions. Cộng đồng đang tích cực xử lý các vấn đề về auth provider, session state, và message delivery với **30 PRs mới** và nhiều issues quan trọng được cập nhật. Đáng chú ý là các nỗ lực tối ưu hiệu năng (non-blocking auth checks) và sửa lỗi bảo mật (credential leaks, sandbox escapes).

## 2. 🚀 Releases

### v2026.5.20 & v2026.5.20-beta.2

**Thay đổi chính:**

- **🔒 Bảo mật Exec Approvals**: Loại bỏ path tương thích cũ `cat SKILL.md && printf ... && <skill-wrapper>`, yêu cầu skill files phải được load qua read tool và chỉ skill executable thực sự được auto-allow
- **🎙️ Discord Voice Sessions**: Cho phép voice sessions theo configured Discord users vào voice channels với:
  - Kiểm tra allowed-channel
  - Multi-user handoff
  - Bounded reconciliation
  - DAVE recovery preservation
- **📄 Voice Context**: Bao gồm bounded `IDENTITY.md`, `USER.md` trong voice session context

**Ý nghĩa**: Release này tăng cường bảo mật đáng kể bằng cách loại bỏ các lỗ hổng trong exec approval flow, đồng thời mở rộng khả năng tương tác voice trên Discord - một bước tiến quan trọng cho use cases real-time collaboration.

## 3. 📈 Tiến độ dự án

### PRs quan trọng đang active:

**🔥 Hiệu năng & Stability (P1):**

- **#85152** - Non-blocking provider auth checks: Giải quyết timeout 3s của Discord bằng cách làm auth checks không chặn, critical cho UX
- **#85154** - Require configured subagent allowlist: Ngăn spawn agents không tồn tại, tăng reliability
- **#84993** - Recover final text after Codex timeout: Cải thiện message delivery khi có race condition

**🛡️ Bảo mật (P1-P2):**

- **#85049** (CLOSED) - Exec-denied params logging: Đã fix việc log cleartext credentials trong gateway.err.log
- **#85017** (CLOSED) - Matrix DM classification bypass: Sửa lỗi requireMention bị bypass do heuristic 2-member room
- **#83796** (CLOSED) - Codex sandbox escape: Agent có thể escape containment khi dùng Codex runtime + Docker sandbox

**🎨 UX Improvements:**

- **#85167** (CLOSED) - TUI idle abort coalescing: Giảm spam repeated notices
- **#85158** - Parallel web search provider: Thêm provider mới cho web_search
- **#85164** - Discord progress commentary: Hiển thị assistant commentary trong progress drafts

### Xu hướng phát triển:

1. **Auth & Provider Management**: Nhiều PRs tập trung vào cải thiện auth flow (#85152, #85125, #85163) - đây là pain point lớn
2. **Message Delivery Reliability**: Liên tục fix các edge cases về message loss và duplicate delivery
3. **Security Hardening**: Tích cực patch các lỗ hổng sandbox escape, credential leaks, và permission bypasses
4. **Multi-agent Orchestration**: Cải thiện subagent spawning, A2A communication, và session isolation

## 4. 💬 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

**🔝 Top concerns (8+ reactions/comments):**

1. **#39604** (12 comments, 8 👍) - Private network access cho web_fetch: Users cần fetch từ internal APIs nhưng bị block, đang chờ security review
2. **#31583** (11 comments, 1 👍) - Exec tool không inherit skill env vars: Regression nghiêm trọng khiến không thể inject secrets vào skills
3. **#40001** (10 comments) - Write tool thiếu append mode: Isolated cron sessions ghi đè shared files thay vì append, gây data loss

**🗣️ Vấn đề người dùng quan tâm:**

- **Auth complexity**: Nhiều issues về OAuth profile management, provider discovery failures (#40402, #33329)
- **Multi-agent isolation**: Users gặp vấn đề với shared state giữa agents (#26370 - isolated cron jobs, #38797 - memory scoping)
- **Message delivery gaps**: Flash bugs, duplicate messages, silent suppression failures (#38603, #39476, #32868)

## 5. 🐛 Ổn định & Bugs

### Critical bugs đang được xử lý:

**P1 - High Impact:**

- **#84880** - Subagent thinking rejection: v2026.5.19 vẫn reject non-off thinking cho subagents trên GPT-5, chưa fix dù có PR
- **#40611** - Heartbeat blocking Telegram: PR #39182 gây aggressive retry block message handling
- **#40540** - Windows update EBUSY: `openclaw update` fail trên Windows do file locking
- **#38327** - Gemini 3.1 crash: "Cannot convert undefined or null to object" regression trong 2026.3.2

**P2 - Medium Impact:**

- **#37966** - LiteLLM cache retention ignored: Anthropic prompt caching không hoạt động qua LiteLLM proxy
- **#40440** - Telegram media history loss: Group chat images chỉ lưu placeholder text, mất MediaPath
- **#38844** - Browser upload flaky: File chooser flow có race conditions, timeout misleading

### Pattern nhận diện:

- **Auth provider issues** chiếm ~30% bugs nghiêm trọng
- **Session state corruption** là recurring theme (compaction, isolation, handoff)
- **Platform-specific bugs** (Windows, macOS Keychain) cần attention

## 6. 💡 Yêu cầu tính năng

### Tính năng được đề xuất nhiều:

**🌟 High demand (4+ 👍):**

1. **#27445** (9 comments, 4 👍) - `announceTarget` cho sub-agent completion: Cho phép parent orchestrate multi-step workflows thay vì announce trực tiếp
2. **#13597** (6 comments, 3 👍) - AWS deployment guide: Thiếu docs cho EC2/ECS/Lambda deployment
3. **#40402** (4 comments, 3 👍) - `--profile-id` flag cho auth login: Cần để manage multiple accounts cùng provider

**🔧 Infrastructure & DevEx:**

- **#12219** - Skill permission manifest (skill.yaml): Standard để declare permissions trước khi install
- **#13610** - Native secrets management: Integration với AWS Secrets Manager, Vault thay vì plaintext config
- **#12855** - Built-in auto-update: Scheduled updates với confirmation và notifications

**🎯 Agent capabilities:**

- **#12602** - Slack Block Kit support: Rich interactive messages thay vì plain markdown
- **#40418** - Automated session memory: Preserve & synthesize memory khi `/new` reset
- **#13700** - Session snapshots: Save/load context checkpoints cho branching conversations

## 7. 👥 Phản hồi người dùng

### Sentiment analysis:

**😤 Pain points:**

- **Auth complexity quá cao**: Users phàn nàn về OAuth flow, profile management, và implicit discovery (#33329: "expired tokens, unreachable endpoints block gateway startup")
- **Documentation gaps**: Thiếu guides cho production deployment, multi-tenant setups
- **Breaking changes**: Frequent regressions gây frustration (#31583: "worked before, now fails")

**😊 Positive feedback:**

- **Codex integration**: Users appreciate Codex harness improvements và native compaction
- **Multi-channel support**: Đánh giá cao việc support nhiều platforms (Telegram, Discord, Slack, WhatsApp)
- **Active development**: Community thấy team responsive với bug fixes và security patches

**🤔 Feature requests reflect real use cases:**

- Enterprise users cần: secrets management, RBAC, audit logs, AWS deployment
- Power users muốn: session branching, memory synthesis, advanced orchestration
- Integration users cần: Block Kit, private network access, custom headers

## 8. 🗺️ Backlog & Roadmap

### Priorities rõ ràng từ labels:

**🚨 Security & Stability (P1):**

- Fix remaining auth provider issues (#85152, #85125)
- Close sandbox escape vectors (#83796 closed, monitoring for new ones)
- Resolve session state corruption bugs (#40001, #31583)

**⚡ Performance (P2):**

- Token overhead reduction (#14785: ~3,500 tok/session từ tool schemas)
- Non-blocking operations (auth checks, heartbeats)
- Cache optimization (LiteLLM retention, plugin loader memoization)

**🎨 UX & Features (P2-P3):**

- Improve TUI/WebChat experience (#85126: wrong authProfileOverride, #33102: --deliver default)
- Expand channel capabilities (Slack Block Kit, WhatsApp delete, Feishu doc insert)
- Better observability (/usage context display, verbose/reasoning menus)

**📚 Documentation (P2):**

- AWS deployment guide (#13597)
- Secrets management best practices
- Multi-agent architecture patterns

### Emerging themes:

1. **Enterprise readiness**: Secrets management, RBAC, audit, deployment guides
2. **Agent orchestration**: Better subagent control, memory isolation, workflow patterns
3. **Developer experience**: Reduce auth complexity, improve error messages, better defaults
4. **Platform maturity**: Fewer breaking changes, better backward compatibility

---

## 🎯 Kết luận

OpenClaw đang trong giai đoạn **maturation** với focus mạnh vào **stability, security, và enterprise features**. Team đang balance giữa fix bugs (đặc biệt auth/session issues) và ship new capabilities (voice, multi-agent, integrations). Community active và engaged, nhưng cần cải thiện documentation và reduce breaking changes để tăng adoption. Roadmap rõ ràng hướng tới production-ready platform cho enterprise use cases.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 22/05/2026

## 1. 🌐 Tổng quan Hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **bùng nổ phát triển** với 10 dự án chính thể hiện các mô hình kinh doanh và chiến lược kỹ thuật khác nhau. Ngày 22/05 chứng kiến **tổng cộng 228 PRs** và **89 issues** hoạt động, phản ánh một cộng đồng cực kỳ năng động.

### Phân loại theo định hướng:

**🏢 Enterprise-focused** (Production-ready, stability)
- OpenClaw, IronClaw, Hermes-Agent

**🚀 Innovation-focused** (Feature velocity, experimentation)  
- NanoBot, Zeroclaw, PicoClaw

**🎯 Niche-focused** (Specialized use cases)
- NanoClaw (Codex integration), LobsterAI (IM bots), Moltis (TEE/privacy)

**🌱 Emerging** (Early stage, finding PMF)
- CoPaw, GoClaw

---

## 2. 📈 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Velocity | Maturity | Focus Area |
|-------|--------|-----|----------|----------|----------|------------|
| **OpenClaw** | 257 | 500 | 2 | 🔥🔥🔥🔥🔥 | 🟢 Mature | Multi-agent, Security |
| **NanoBot** | 11 | 22 | 0 | 🔥🔥🔥 | 🟡 Growing | Memory, Providers |
| **Zeroclaw** | 17 | 50 | 0 | 🔥🔥🔥🔥 | 🟡 Beta | Multi-agent, TUI |
| **PicoClaw** | 9 | 30 | 1 | 🔥🔥🔥 | 🟢 Stable | Performance, Providers |
| **NanoClaw** | 3 | 11 | 0 | 🔥🔥 | 🟡 Growing | Codex, Voice |
| **IronClaw** | 12 | 46 | 0 | 🔥🔥🔥🔥 | 🟠 Reborn | Architecture, Skills |
| **LobsterAI** | 0 | 11 | 0 | 🔥 | 🟠 Cleanup | IM bots, UX |
| **Moltis** | 7 | 5 | 0 | 🔥 | 🟡 Growing | Docker, Telephony |
| **CoPaw** | 23 | 29 | 0 | 🔥🔥🔥 | 🟡 Growing | WeChat, Context |
| **GoClaw** | 1 | 4 | 0 | 🔥 | 🟠 Early | Podman, Bitrix24 |
| **Hermes-Agent** | 12 | 50 | 0 | 🔥🔥🔥🔥🔥 | 🟢 Mature | Orchestration, Desktop |

### Chỉ số tương tác cộng đồng:

| Dự án | Avg Comments/Issue | Top Issue Reactions | Community Health |
|-------|-------------------|---------------------|------------------|
| OpenClaw | 8.5 | 12 👍 | 🟢 Excellent |
| Zeroclaw | 4.2 | 3 👍 | 🟢 Good |
| IronClaw | 3.8 | 5 👍 | 🟢 Good |
| Hermes-Agent | 3.5 | 3 👍 | 🟢 Good |
| NanoBot | 3.2 | 0 👍 | 🟡 Moderate |
| CoPaw | 2.8 | 1 👍 | 🟡 Moderate |
| PicoClaw | 2.3 | 1 👍 | 🟡 Moderate |
| NanoClaw | 2.0 | 0 👍 | 🟡 Moderate |
| Moltis | 1.8 | 0 👍 | 🟠 Low |
| GoClaw | 1.5 | 0 👍 | 🟠 Low |
| LobsterAI | 0 | 0 👍 | 🔴 Inactive |

---

## 3. 🎯 Vị thế của OpenClaw

### **Vai trò: Market Leader & Standard Setter**

OpenClaw đang ở vị trí **dẫn đầu** hệ sinh thái với:

#### Điểm mạnh vượt trội:

**📊 Scale & Maturity**
- **257 issues, 500 PRs** - Gấp 2-5 lần các đối thủ
- **2 releases trong ngày** - Shipping velocity cao nhất
- **30 PRs mới/ngày** - Development momentum mạnh nhất

**🛡️ Security & Stability Focus**
- Duy nhất có **exec approval hardening** (v2026.5.20)
- **Sandbox escape fixes** được ưu tiên cao
- **Auth provider management** được đầu tư nhiều nhất

**🎙️ Innovation Leadership**
- **Discord voice sessions** - Tính năng độc quyền
- **Multi-agent orchestration** - Mature nhất trong hệ sinh thái
- **Subagent spawning** với isolation đầy đủ

**👥 Community Engagement**
- **12 👍 trên top issue** - Cao nhất hệ sinh thái
- **8.5 comments/issue** - Tương tác sâu nhất
- **Active contributor base** - Nhiều PR từ community

#### Thách thức:

**⚠️ Complexity Tax**
- Auth flow phức tạp - Pain point lớn nhất (#33329)
- Breaking changes thường xuyên - Gây frustration
- Documentation gaps - Đặc biệt cho production deployment

**🐛 Technical Debt**
- **~30% bugs** liên quan auth providers
- Session state corruption - Recurring theme
- Platform-specific issues (Windows, macOS)

### So sánh với đối thủ chính:

| Tiêu chí | OpenClaw | Zeroclaw | IronClaw | Hermes-Agent |
|----------|----------|----------|----------|--------------|
| **Maturity** | 🟢 Production | 🟡 Beta prep | 🟠 Reborn | 🟢 Production |
| **Security** | 🟢 Leading | 🟡 Good | 🟢 Excellent | 🟡 Good |
| **Multi-agent** | 🟢 Mature | 🟢 Core focus | 🟢 Advanced | 🟡 Basic |
| **Voice/Multimodal** | 🟢 Discord voice | 🔴 None | 🔴 None | 🟡 Basic |
| **Community** | 🟢 Largest | 🟢 Active | 🟡 Growing | 🟢 Active |
| **Complexity** | 🔴 High | 🟡 Medium | 🔴 Very High | 🟡 Medium |

### Vị trí chiến lược:

```
Innovation ←─────────────────────────→ Stability
                    ↑
              OpenClaw
                    |
    Zeroclaw ←──────┼──────→ IronClaw
                    |
              Hermes-Agent
```

OpenClaw đang **balance tốt** giữa innovation và stability, nhưng đang nghiêng về **enterprise readiness** với focus vào security và production features.

---

## 4. 🔧 Hướng Kỹ thuật Chung

### **Xu hướng được nhiều dự án áp dụng:**

#### 1️⃣ **Multi-Provider Ecosystem** (9/10 dự án)

**Động lực**: Giảm vendor lock-in, tăng resilience

| Dự án | Providers mới | Chiến lược |
|-------|---------------|------------|
| NanoBot | xAI Grok, Novita, Skywork | OAuth flows, APIFree |
| PicoClaw | GPT4Free, NEAR AI, MiMo | Low-cost + TEE |
| NanoClaw | Codex-only install | Provider-agnostic |
| Moltis | NEAR AI Cloud | TEE-capable |
| Hermes-Agent | Per-auxiliary fallback | Resilience |

**Insight**: Hệ sinh thái đang chuyển từ **OpenAI-centric** sang **multi-provider by default**.

#### 2️⃣ **Container & Deployment Optimization** (7/10 dự án)

**Pain points được giải quyết**:
- Docker/Podman compatibility (GoClaw, Moltis, IronClaw)
- Rootless containers (GoClaw #485)
- Browser sandbox trong containers (Moltis #977, PicoClaw)
- s6 init systems (Hermes-Agent #30136)

**Trend**: Production deployment đang là **top priority** sau giai đoạn MVP.

#### 3️⃣ **Context Management Evolution** (6/10 dự án)

**Approaches khác nhau**:

| Approach | Dự án | Đặc điểm |
|----------|-------|----------|
| **Compression** | NanoBot, CoPaw | Sliding window + summary |
| **Memory Systems** | NanoBot (Dream), CoPaw | Long-term consolidation |
| **Scoped Context** | PicoClaw, IronClaw | Per-turn policies |
| **Compaction** | OpenClaw, Zeroclaw | Native Codex integration |

**Insight**: Chưa có consensus về "best practice" - mỗi dự án đang thử nghiệm approach riêng.

#### 4️⃣ **Skills & Extensions Framework** (8/10 dự án)

**Convergence patterns**:
- Skill manifests (OpenClaw, Zeroclaw, IronClaw)
- Permission systems (PicoClaw, IronClaw)
- Marketplace/hub (NanoClaw IronHub, CoPaw Skill Pool)
- External execution (IronClaw Kanban lanes, Hermes-Agent Browser Use)

**Trend**: Hướng tới **plugin ecosystem** giống VSCode/Chrome extensions.

#### 5️⃣ **Multi-Channel Messaging** (10/10 dự án)

**Platform coverage**:

| Platform | Dự án hỗ trợ | Maturity |
|----------|--------------|----------|
| Discord | OpenClaw, Zeroclaw, PicoClaw | 🟢 Mature |
| Slack | OpenClaw, IronClaw, GoClaw | 🟢 Mature |
| Telegram | Hermes-Agent, CoPaw, PicoClaw | 🟢 Mature |
| WeChat/DingTalk | CoPaw, IronClaw, NanoBot | 🟡 Growing |
| WhatsApp | OpenClaw, PicoClaw | 🟡 Growing |
| Mastodon | Zeroclaw | 🟠 Emerging |
| Bitrix24 | GoClaw | 🟠 Emerging |

**Insight**: **Enterprise messaging** (WeChat, DingTalk, Bitrix24) đang là frontier mới.

---

## 5. 🎨 Điểm Khác biệt

### **Chiến lược phân hóa:**

#### **OpenClaw: Enterprise Platform**
- ✅ Voice sessions (Discord)
- ✅ Advanced auth (OAuth per-user)
- ✅ Security hardening (exec approvals, sandbox)
- ✅ Multi-agent orchestration
- ❌ Complexity cao, learning curve dốc

#### **Zeroclaw: Developer-First**
- ✅ TUI standalone (Terminal UI)
- ✅ RPC dispatch layer (Unix sockets)
- ✅ Lightweight, modular architecture
- ✅ RFC-driven governance
- ❌ Beta stage, chưa production-ready

#### **IronClaw: Architecture Excellence**
- ✅ Reborn architecture (ports & adapters)
- ✅ Cost-based budgets (USD-denominated)
- ✅ External worker lanes (Codex CLI)
- ✅ Comprehensive testing
- ❌ Complexity cực cao, steep learning curve

#### **Hermes-Agent: Feature Velocity**
- ✅ Desktop app (Electron)
- ✅ Parallel orchestration
- ✅ Rich integrations (Google Workspace, YouTube)
- ✅ 50 PRs/ngày
- ❌ Stability issues (data loss bug #30151)

#### **NanoBot: Memory Innovation**
- ✅ Dream system (long-term memory)
- ✅ MECE approach (duplicate prevention)
- ✅ BM25-lite skill router (60% token reduction)
- ❌ Memory system controversial (users complain)

#### **PicoClaw: Performance Focus**
- ✅ CPU/Memory/I/O optimizations
- ✅ JSONL crash consistency
- ✅ Agent loop stability
- ❌ Ít innovation về features

#### **NanoClaw: Codex Specialist**
- ✅ Codex-only installation
- ✅ Voice generation (Veo 3.1)
- ✅ Provider-agnostic skills
- ❌ Niche focus, smaller community

#### **Moltis: Privacy-First**
- ✅ NEAR AI Cloud (TEE)
- ✅ Vault encryption opt-out
- ✅ Telephony (Twilio)
- ❌ Small team, slow velocity

#### **CoPaw: Chinese Market**
- ✅ WeChat/DingTalk native
- ✅ 105 integration tests
- ✅ Access control system
- ❌ Limited international adoption

#### **GoClaw: Container Native**
- ✅ Podman rootless
- ✅ Compose file picker
- ❌ Very small community

---

## 6. 👥 Mức độ Trưởng thành Cộng đồng

### **Tier 1: Mature Communities** 🟢

**OpenClaw**
- 📊 Metrics: 257 issues, 500 PRs, 8.5 comments/issue
- 👥 Diverse contributors, active discussions
- 📚 Comprehensive docs (though gaps exist)
- 🎯 Clear roadmap, responsive maintainers
- ⚠️ Challenge: Managing complexity, reducing breaking changes

**Hermes-Agent**
- 📊 Metrics: 12 issues, 50 PRs, 3.5 comments/issue
- 🚀 Extremely high velocity (30 PRs/day)
- 🔧 Strong engineering culture (testing, diagnostics)
- ⚠️ Challenge: Stability vs velocity tradeoff

### **Tier 2: Growing Communities** 🟡

**Zeroclaw**
- 📊 Metrics: 17 issues, 50 PRs, 4.2 comments/issue
- 🏛️ RFC-driven governance (good process)
- 👥 Active contributors, quality PRs
- ⚠️ Challenge: Beta blockers, review bandwidth

**IronClaw**
- 📊 Metrics: 12 issues, 46 PRs, 3.8 comments/issue
- 🏗️ Reborn transformation (ambitious)
- 🧪 Strong testing culture
- ⚠️ Challenge: Complexity management, production wiring

**CoPaw**
- 📊 Metrics: 23 issues, 29 PRs, 2.8 comments/issue
- 🌏 Strong in Chinese market
- 🧪 105 integration tests (impressive)
- ⚠️ Challenge: International expansion

**PicoClaw**
- 📊 Metrics: 9 issues, 30 PRs, 2.3 comments/issue
- ⚡ Performance-focused
- 🔧 Stability improvements
- ⚠️ Challenge: Feature differentiation

**NanoBot**
- 📊 Metrics: 11 issues, 22 PRs, 3.2 comments/issue
- 💡 Memory innovation (Dream system)
- 🌐 Provider expansion
- ⚠️ Challenge: Memory UX controversy

**NanoClaw**
- 📊 Metrics: 3 issues, 11 PRs, 2.0 comments/issue
- 🎯 Niche focus (Codex)
- 🎬 Video generation (Veo 3.1)
- ⚠️ Challenge: Small community

### **Tier 3: Early Stage** 🟠

**Moltis**
- 📊 Metrics: 7 issues, 5 PRs, 1.8 comments/issue
- 🔐 Privacy focus (TEE)
- 📞 Telephony integration
- ⚠️ Challenge: Low velocity, small team

**GoClaw**
- 📊 Metrics: 1 issue, 4 PRs, 1.5 comments/issue
- 🐳 Container native
- ⚠️ Challenge: Very small community, low engagement

**LobsterAI**
- 📊 Metrics: 0 issues, 11 PRs, 0 comments/issue
- 🧹 Cleanup phase (9 stale PRs)
- ⚠️ Challenge: Inactive community, backlog debt

---

## 7. 🔮 Tín hiệu Xu hướng

### **Xu hướng đang nổi lên:**

#### 1️⃣ **Multi-Agent Orchestration** 🤖🤖🤖

**Dự án dẫn đầu**: OpenClaw, IronClaw, Hermes-Agent

**Patterns đang hình thành**:
- **Hierarchical**: Parent orchestrates children (OpenClaw subagents)
- **Parallel**: Batch execution (Hermes-Agent parallel skill)
- **External**: Delegate to specialized engines (IronClaw Kanban lanes)

**Prediction**: Sẽ có **standardization** về multi-agent protocols trong Q3 2026.

#### 2️⃣ **Cost-Based Resource Management** 💰

**Pioneer**: IronClaw (#3841)

**Concept**: USD-denominated budgets thay vì iteration caps
- Cascade: tenant → user → project → agent → mission → thread
- Graduated intervention: warn → throttle → block

**Prediction**: Sẽ trở thành **table stakes** cho enterprise deployments.

#### 3️⃣ **Desktop/Native Apps** 🖥️

**Active projects**:
- Hermes-Agent: Electron app (#20059)
- Zeroclaw: TUI standalone (#6826)

**Drivers**:
- Better UX than web UI
- Offline capabilities
- Native OS integrations

**Prediction**: **Desktop-first** sẽ là trend trong H2 2026.

#### 4️⃣ **TEE & Privacy-Preserving AI** 🔐

**Pioneers**: Moltis, PicoClaw (NEAR AI Cloud)

**Use cases**:
- Healthcare, finance, legal
- Sensitive data processing
- Compliance requirements

**Prediction**: TEE providers sẽ **mainstream** khi regulations tighten.

#### 5️⃣ **Voice & Multimodal** 🎙️🖼️

**Leaders**:
- OpenClaw: Discord voice sessions
- NanoClaw: Veo 3.1 video generation
- Moltis: Twilio telephony

**Trend**: Từ **text-only** → **multimodal by default**

**Prediction**: Voice-first agents sẽ là **killer app** cho consumer market.

#### 6️⃣ **Enterprise Messaging Platforms** 💼

**Frontier**: WeChat, DingTalk, Bitrix24, Zulip

**Drivers**:
- Enterprise adoption
- Regional markets (China, Russia, SEA)
- Compliance requirements

**Prediction**: **Enterprise channels** sẽ vượt consumer channels về revenue trong 2027.

### **Xu hướng đang suy giảm:**

❌ **Monolithic architectures** - Tất cả đang chuyển sang modular  
❌ **Single-provider lock-in** - Multi-provider là standard  
❌ **Manual configuration** - Auto-discovery đang được ưu tiên  
❌ **Iteration-based limits** - Cost-based budgets thay thế

### **Rủi ro hệ sinh thái:**

⚠️ **Fragmentation**: 10 dự án, 10 approaches khác nhau  
⚠️ **Complexity creep**: IronClaw, OpenClaw đang quá phức tạp  
⚠️ **Stability vs velocity**: Hermes-Agent data loss bug là warning sign  
⚠️ **Documentation debt**: Tất cả dự án đều thiếu production guides

---

## 8. 🎯 Kết luận & Khuyến nghị

### **Bức tranh tổng thể:**

Hệ sinh thái AI agent đang ở giai đoạn **Cambrian Explosion** với sự đa dạng cao về approaches và use cases. **OpenClaw** đang dẫn đầu về scale và maturity, nhưng **Zeroclaw** và **IronClaw** đang thách thức với architecture innovations.

### **Khuyến nghị cho OpenClaw:**

#### **Ngắn hạn (Q2 2026)**:
1. ✅ **Giải quyết auth complexity** - Top pain point
2. ✅ **Reduce breaking changes** - Cải thiện backward compatibility
3. ✅ **Production deployment guides** - AWS, GCP, Azure
4. ✅ **Desktop app** - Học từ Hermes-Agent và Zeroclaw TUI

#### **Trung hạn (Q3-Q4 2026)**:
1. 🎯 **Cost-based budgets** - Học từ IronClaw
2. 🎯 **TEE provider integration** - Chuẩn bị cho compliance wave
3. 🎯 **Enterprise messaging** - WeChat, DingTalk native support
4. 🎯 **Standardize multi-agent protocols** - Lead industry standard

#### **Dài hạn (2027)**:
1. 🚀 **Voice-first experiences** - Mở rộng Discord voice
2. 🚀 **Marketplace ecosystem** - Skills, plugins, templates
3. 🚀 **Regional expansion** - China, SEA, LATAM
4. 🚀 **Compliance certifications** - SOC2, HIPAA, GDPR

### **Cơ hội chiến lược:**

💡 **Lead standardization**: OpenClaw có scale để define industry standards  
💡 **Enterprise play**: Focus vào compliance và security để win enterprise  
💡 **Developer ecosystem**: Build marketplace để tạo network effects  
💡 **Regional champions**: Partner với local players (CoPaw cho China)

### **Threats to watch:**

⚠️ **Zeroclaw's simplicity**: Developer-first approach có thể win mindshare  
⚠️ **IronClaw's architecture**: Nếu Reborn thành công, sẽ set new bar  
⚠️ **Hermes-Agent's velocity**: Feature richness có thể attract users  
⚠️ **Fragmentation**: Ecosystem có thể split thành incompatible camps

---

**📌 Bottom line**: OpenClaw đang **winning** nhưng không thể **complacent**. Cần balance giữa **innovation** và **stability**, đồng thời **reduce complexity** để maintain leadership position.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích dự án NanoBot - 2026-05-22

## 📊 Tóm tắt hôm nay

Ngày 22/05 chứng kiến một đợt merge code mạnh mẽ với **15 PRs được đóng** trong 24 giờ qua, tập trung vào tối ưu hiệu năng WebUI, mở rộng hệ sinh thái provider (xAI Grok OAuth, Novita AI, Skywork), và sửa các lỗi nghiêm trọng về streaming tool calls. Đáng chú ý là các cải tiến về trải nghiệm coding với `apply_patch` tool mới và tối ưu hóa hệ thống memory dài hạn.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng codebase đang chuẩn bị cho một bản release lớn với nhiều tính năng mới được merge.

---

## 🔧 Tiến độ dự án

### PRs quan trọng đã merge (15 PRs)

**🎨 WebUI Performance & UX**
- **#3953** - Cải thiện hiệu năng sidebar với batch rendering cho chat histories lớn, thêm Cmd/Ctrl+K search
- **#3951** - Refine collapsible sidebar với icon thay wordmark, giữ rail khi collapsed
- **#3944** - Fix lỗi session refresh làm mất chat mới tạo (#3884)

**🤖 Provider Ecosystem Expansion**
- **#3936** - Thêm xAI Grok OAuth với PKCE flow, không cần paste API key thủ công
- **#3927** - Tích hợp Novita AI provider
- **#3916** - Skywork provider support với APIFree endpoint
- **#3867** - Fix OpenRouter reasoning.effort cho thinking models (follow-up #3851)
- **#3940** - Fix Moonshot API từ chối kimi-k2.5/k2.6 khi gửi cả `reasoning_effort` và `thinking`

**💻 Coding Tools Enhancement**
- **#3923** - Thêm `apply_patch` tool cho multi-file edits với rollback, workspace validation
- **#3922** - Detach stdin cho shell commands, tránh hang với interactive commands

**🐛 Critical Bug Fixes**
- **#3943** - Fix duplicate `tool_call_id` trong streaming mode (DeepSeek, GLM) gây lỗi API
- **#3933** - Fix shell guard false positives với URL commands (curl, wget)
- **#3947** - Stabilize Windows shell tests
- **#3684** - Fix WeChat channel silent message drops từ poll exceptions

**📚 Documentation**
- **#3619** - Document Xiaomi MiMo token plan configuration

### PRs đang mở (7 PRs)

**🔥 Đáng chú ý:**
- **#3952** - Enhance Dream + Consolidator prompts cho MECE long-term memory (giải quyết vấn đề trùng lặp memory)
- **#3954** - Thêm OpenAI và Codex image generation support
- **#3946** - Ollama image generation support
- **#3949** - Debounced group-message buffering cho Telegram/Feishu (giảm spam AI turns)
- **#3865** - BM25-lite skill router giảm 60% system prompt tokens
- **#3950** - Thêm FAQ section

---

## 🌟 Điểm nổi bật cộng đồng

### Issues có tương tác cao

**#3028** (3 comments) - Bug về heart beat tạo duplicate scheduled tasks
- Vấn đề: Heart beat mechanism tự tạo thêm cron jobs, dẫn đến duplicate messages
- Ảnh hưởng: User experience bị ảnh hưởng với repeated greetings

**#3790** (14 comments) - WebUI conversation print display bug
- Đã đóng với label `stale`, có thể đã được fix gián tiếp qua các PR WebUI optimization

**#3884** (5 comments) - WebUI conversation closes after first response
- **Đã fix** qua #3944 - vấn đề session refresh

---

## 🐛 Ổn định & Bugs

### Bugs đã fix trong 24h

1. **Streaming tool_call_id duplicates** (#3943, #3932)
   - Root cause: DeepSeek, GLM providers reuse tool_call_id trong parallel calls
   - Impact: API rejection với `invalid_request_error`
   - Solution: Deduplicate trong streaming parser

2. **WebUI session loss** (#3944)
   - Symptom: New chat disappears sau session refresh
   - Fix: Preserve optimistic chats until server sync

3. **Shell command false positives** (#3933)
   - Issue: URLs trong curl/wget bị block như workspace paths
   - Fix: Update path extractor để nhận diện URLs

4. **Moonshot API rejection** (#3940)
   - Conflict: Gửi cả `reasoning_effort` và `thinking` parameters
   - Fix: Drop redundant parameter

### Bugs đang mở

**#3028** - Heart beat duplicate tasks (chưa có PR fix)

---

## 💡 Yêu cầu tính năng

### Đã implement

1. **xAI Grok OAuth** (#3936) - Loại bỏ friction của manual API key setup
2. **Image generation expansion** (#3954, #3946) - OpenAI, Codex, Ollama support
3. **Coding workflow optimization** (#3923) - `apply_patch` tool cho professional dev experience

### Đang được đề xuất

**#3885** - Global switch cho Dream system jobs
- Motivation: User muốn disable memory consolidation hoàn toàn
- Proposed: Thêm `agents.defaults.dream.enabled` config flag

**#3948** - Tương tự #3885, user phàn nàn Dream feature "không thực dụng/không kiểm soát được"

**#3955** - NEXUS x402 prediction market data integration
- Spam/promotional issue, không phải feature request hợp lệ

---

## 💬 Phản hồi người dùng

### Tích cực
- WebUI performance improvements được đón nhận tốt
- Provider ecosystem mở rộng giúp users có nhiều lựa chọn LLM
- Coding tools enhancement (apply_patch) nâng cao developer experience

### Tiêu cực / Pain points

**Dream/Memory system** - Vấn đề lớn nhất:
- #3885, #3948: Users phàn nàn Dream feature "không kiểm soát được", tốn token, tạo duplicate memories
- #3952 (PR đang mở): Đang cố gắng fix với MECE approach
- Insight: Memory system cần rethink về UX và control mechanisms

**WebUI stability** - Đã được cải thiện đáng kể trong 24h qua

**Channel reliability** - WeChat message drops đã được fix (#3684)

---

## 📋 Backlog & Roadmap

### Ưu tiên cao (dựa trên activity)

1. **Memory system overhaul** (#3952)
   - MECE long-term memory
   - Giải quyết duplicate và information attribution issues
   - Critical cho user satisfaction

2. **Skill routing optimization** (#3865)
   - BM25-lite router giảm 60% system prompt
   - Quan trọng cho cost và latency

3. **Group messaging UX** (#3949)
   - Debounced buffering cho Telegram/Feishu
   - Giảm spam AI responses trong group chats

4. **Dream system control** (#3885)
   - Thêm global enable/disable switch
   - Addressing user complaints

### Xu hướng phát triển

- **Provider diversity**: Mở rộng sang nhiều LLM providers (xAI, Novita, Skywork)
- **Multimodal**: Image generation support đang được expand
- **Developer experience**: Coding tools (apply_patch, shell improvements)
- **Performance**: WebUI optimization, skill routing, memory efficiency
- **Enterprise readiness**: OAuth flows, better error handling, stability fixes

---

## 🎯 Đánh giá tổng quan

**Velocity**: 🔥🔥🔥 Rất cao - 15 PRs merged trong 24h

**Focus areas**: WebUI polish, provider ecosystem, bug fixes

**Community health**: Tốt - responsive với bug reports, nhưng có tension về Dream feature

**Technical debt**: Đang được address tích cực (memory system, shell safety, streaming bugs)

**Recommendation**: Ưu tiên merge #3952 (memory MECE) và #3865 (skill router) để giải quyết hai pain points lớn nhất của users.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo phân tích dự án Zeroclaw - 22/05/2026

## 1. 📊 Tóm tắt hôm nay

Zeroclaw đang trải qua giai đoạn chuyển đổi kiến trúc lớn với việc chuẩn bị phát hành **beta** dựa trên schema V3 và multi-agent runtime. Hoạt động chính tập trung vào việc xây dựng TUI (Terminal User Interface) độc lập, mở rộng hệ sinh thái channel (Mastodon, Twilio, Rocket.Chat, Zulip, Lemmy), và cải thiện trải nghiệm developer với RPC dispatch layer mới. Cộng đồng đang tích cực đóng góp với 50 PRs đang mở và 17 issues, phản ánh sự quan tâm cao đến khả năng mở rộng và tích hợp đa nền tảng.

## 2. 🚀 Releases

**Không có release chính thức trong 24h qua**, nhưng có dấu hiệu quan trọng:

- **PR #6398** (đã đóng, seeking approval) đánh dấu cột mốc **multi-agent runtime và schema V3** - nền tảng cho bản beta sắp tới
- Đây là breaking change lớn ảnh hưởng toàn bộ codebase (docs, dependencies, core, agent, channel, config, daemon, gateway, runtime, tools, providers)
- Maintainer đang tìm kiếm approval cuối cùng trước khi merge làm baseline cho beta release

## 3. 🏗️ Tiến độ dự án

### Xu hướng phát triển chính:

**A. Kiến trúc TUI và RPC Layer** 🎯
- **#6826** (Tracker): TUI độc lập đang được xây dựng với 5 sub-issues:
  - #6824: TUI Agent Chat (giao diện chat tương tác)
  - #6823: TUI ACP Bridge (kết nối RPC với daemon)
  - #6825: TUI UX (theming, keybindings, accessibility)
  - #6821: Di chuyển `crates/zeroclaw-tui` → `apps/tui` (chuẩn hóa cấu trúc)
  - #6822: Tích hợp TUI vào CI/CD và package managers

- **#6837** (XL, medium risk): Runtime RPC dispatch layer với Unix socket transport
  - Cho phép TUI và clients khác kết nối trực tiếp với daemon mà không qua HTTP/WS gateway
  - Peer transport, không thay thế gateway hiện tại

**B. Mở rộng Channel Ecosystem** 🌐
Zeroclaw đang mở rộng mạnh mẽ sang các nền tảng mới:
- **Mastodon/ActivityPub** (#6426) - tích hợp fediverse
- **Twilio SMS** (#6429) - SMS gateway chính thức
- **Rocket.Chat** (#6436) - REST polling MVP
- **Zulip** (#6438) - long-poll Events API
- **Lemmy** (#6442) - private message polling

Tất cả đều ở trạng thái OPEN, needs-author-action, cho thấy đang chờ review/refinement.

**C. Protocol Extensions** 🔧
- **#6820**: ACP protocol extensions cho diff/file-proposal message types
  - Cho phép TUI/web dashboard hiển thị side-by-side diffs
  - User có thể counter-propose edits
- **#6819**: File/attachment upload protocol cho RPC transport
- **#6817**: Session-scoped runtime overrides (model, temperature) không cần reload daemon

**D. Developer Experience** 💻
- **#6818**: `--ephemeral` daemon mode (tự động tắt khi client disconnect)
- **#6830**: Selective channel builds với feature flags
- **#6700**: Skills management API với web dashboard

## 4. 🔥 Điểm nổi bật cộng đồng

### Issues được quan tâm:

**#6808** - RFC: Work Lanes, Board Automation, and Label Cleanup (3 comments)
- Đề xuất cải thiện quy trình quản lý công việc
- Lightweight PR lanes, board-owned issue labels
- Phản ánh nhu cầu về governance và process khi dự án scale

**#5890** - RFC: Multi-agent UX flow (10 comments, CLOSED/ACCEPTED)
- RFC đã được chấp thuận sau 7 ngày discussion
- Core Team đã vote theo §8.2 (two-thirds majority)
- Đang chờ extract vào `docs/proposals/multi-agent-ux-flow.md`

### PRs có nhiều tương tác:

**#6611** (XL, high risk, BLOCKED) - File rotation crate
- Thêm `zeroclaw-file-rotation` crate cho file trace rotation
- Status: blocked, needs-author-action
- Quan trọng cho observability và log management

**#6675** (M, high risk) - Strict tool parsing mode
- Thêm `strict_tool_parsing` config cho từng agent
- Giải quyết vấn đề mixed-provider installs
- Cho phép opt-in native-only tool execution

## 5. 🐛 Ổn định & Bugs

### Critical Bugs (S1 - workflow blocked):

**#6844** - Slack bot_token không thể dùng environment variable
- Duplicate của #6237, supposed to be fixed nhưng vẫn tái phát
- Ảnh hưởng: workflow bị block, phải hardcode token vào config
- Severity: S1

**#6841** - `vision_provider` bị ignore, images route về `providers.fallback`
- Multimodal config không hoạt động đúng
- Images không được xử lý bởi vision-capable provider
- Severity: S1

### Medium Severity Bugs (S2):

**#6836** - Windows `setup.bat --minimal` tạo build 26MB thay vì 6MB
- Build size gấp 4 lần expected
- Có thể do strip/optimization flags không được apply đúng

### Fixes đang được deploy:

**#6845** - WhatsApp LID to phone reply target conversion
- Fix silent drop của DM replies khi chat JID dùng LID format
- Users thấy typing dots nhưng không nhận được response

**#6834** - Discord gateway preflight failures
- Park supervised listener thay vì restart loop
- Fail fast trên non-retryable auth/config errors

**#6835** - Discord gateway session resume
- Persist session state để Resume thay vì luôn Identify
- Giảm rate limit risk và improve reconnect reliability

## 6. ✨ Yêu cầu tính năng

### Đã được accept/đang implement:

1. **Multi-agent runtime** (#6398) - MERGED, basis cho beta
2. **TUI standalone** (#6826) - Đang active development
3. **RPC dispatch layer** (#6837) - Core infrastructure
4. **Skills management API** (#6700) - Web dashboard integration

### Đang được đề xuất:

1. **TOTP gate cho specific shell commands** (#5779)
   - Cho phép shell access nhưng require TOTP cho destructive commands
   - Pattern: `sudo *`, `rm -rf *`, `systemctl restart *`

2. **Thread context backfill** (#6428 - Slack)
   - Auto-load thread history khi agent được @-mention mid-thread
   - Tránh agent trả lời "blind" khi thiếu context

3. **File upload tool** (#6773)
   - HTTP multipart uploads không cần load file vào LLM context
   - Tiết kiệm tokens và improve performance

4. **Jina AI web search provider** (#6833)
   - Thêm Jina AI vào web_search provider options
   - Alternative cho existing providers

5. **NEAR AI Cloud provider** (#6842)
   - TEE-backed inference provider
   - OpenAI-compatible endpoint

### Governance & Process:

**#6808** - RFC về Work Lanes và Board Automation
- Đề xuất cải thiện project management
- Lightweight process không tạo overhead cho maintainers

## 7. 💬 Phản hồi người dùng

### Pain points được report:

1. **Configuration complexity** (#6844, #6841)
   - Environment variables không hoạt động consistent
   - Config overrides không được respect
   - Vision provider routing bị broken

2. **Windows build experience** (#6836)
   - Minimal build không thực sự minimal
   - Documentation không match reality

3. **Channel reliability** (#6845, #6834, #6835)
   - WhatsApp DM replies bị drop silent
   - Discord reconnect không stable
   - Cần better error handling và retry logic

### Positive signals:

1. **Active community contributions**
   - 50 PRs đang mở từ diverse contributors
   - Nhiều channel integrations mới từ community
   - RFC process đang hoạt động tốt (#5890 accepted)

2. **Feature requests alignment**
   - Community requests align với roadmap (TUI, multi-agent)
   - Good balance giữa stability fixes và new features

3. **Cross-platform interest**
   - ARM64 Docker (#5187)
   - Nix package (#5987)
   - Windows support improvements

## 8. 📋 Backlog & Roadmap

### Immediate priorities (Beta release):

1. ✅ **Multi-agent runtime** - Merged, đang stabilize
2. 🚧 **TUI implementation** - Active development (5 sub-issues)
3. 🚧 **RPC dispatch layer** - Core infrastructure (#6837)
4. ⏳ **Channel ecosystem expansion** - 5 new channels pending review

### Short-term (Post-beta):

1. **Governance improvements** (#6808 RFC)
2. **Skills management** (#6700)
3. **Security enhancements** (#5779 - TOTP gates)
4. **Developer experience**:
   - Selective channel builds (#6830)
   - Ephemeral daemon mode (#6818)
   - Session-scoped overrides (#6817)

### Medium-term:

1. **Protocol extensions**:
   - Diff/file-proposal messages (#6820)
   - File upload protocol (#6819)
   - Attachment handling improvements

2. **Channel reliability**:
   - Retry logic với exponential backoff (#5838)
   - Thread context backfill (#6428)
   - Better error handling across all channels

3. **Observability**:
   - File rotation (#6611 - blocked)
   - Better logging và monitoring

### Blockers cần resolve:

- **#6611** (file rotation) - blocked, needs unblock
- **#6844** (Slack env vars) - S1 bug, needs urgent fix
- **#6841** (vision provider) - S1 bug, workflow blocked
- Multiple PRs ở trạng thái "needs-author-action" - cần maintainer review bandwidth

---

## 🎯 Kết luận

Zeroclaw đang ở giai đoạn **transformation** với multi-agent runtime và TUI là hai trụ cột chính. Dự án có momentum tốt với community active, nhưng cần:

1. **Stabilize beta release** - Resolve S1 bugs trước khi ship
2. **Improve review bandwidth** - Nhiều PRs quality cao đang pending
3. **Better Windows support** - Build size và setup experience cần improve
4. **Channel reliability** - Fix silent failures và improve error handling

Roadmap rõ ràng, RFC process hoạt động tốt, và community engagement cao - dấu hiệu tích cực cho sự phát triển bền vững của dự án.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 22/05/2026

## 📊 Tóm tắt hôm nay

Ngày 22/05 đánh dấu một đợt hoạt động mạnh mẽ với **30 PRs** và **9 issues** được cập nhật. Dự án tập trung vào **tối ưu hiệu năng hệ thống** (CPU, memory, I/O), **mở rộng hỗ trợ providers** (GPT4Free, NEAR AI Cloud), và **sửa lỗi ổn định** quan trọng liên quan đến JSONL store và agent lifecycle. Đặc biệt, có **5 PRs lớn** về stability fixes từ @SiYue-ZO và nhiều dependency updates tự động.

---

## 🚀 Releases

### **v0.2.8-nightly.20260522.5bbebb5f**
- Build tự động hàng đêm, **không ổn định** - khuyến cáo thận trọng khi sử dụng
- Tích hợp các thay đổi mới nhất từ main branch
- Phù hợp cho testing và early adopters

---

## 🔧 Tiến độ dự án

### **Tối ưu hiệu năng hệ thống** 🎯
**#2916** - CPU, Memory và I/O optimizations (@corporatepiyush)
- Đề xuất tối ưu toàn diện cho codebase
- Tập trung vào giảm overhead trong agent loop, session management, và message bus
- Đang trong giai đoạn review, có thể là PR quan trọng nhất tuần này

### **Mở rộng Provider Ecosystem** 🌐

**#2917** - NEAR AI Cloud provider (@PierreLeGuen)
- Thêm hỗ trợ NEAR AI Cloud với TEE-capable models
- Sử dụng protocol `nearai`, tương thích OpenAI API
- Tích hợp model catalog từ `/model/list` endpoint

**#2909** [MERGED] - GPT4Free provider (@lc6464)
- Hỗ trợ G4F local inference API (`http://localhost:1337/v1`)
- Giải quyết **#2901** - yêu cầu từ cộng đồng về low-cost inference
- Phù hợp cho homelab và lightweight setups

**#2915** - MiMo provider CommonModels (@SiYue-ZO)
- Thêm `mimo-v2.5` (multimodal) và `mimo-v2.5-pro` (text-only)
- Cải thiện UX khi chọn model có khả năng vision

### **Stability & Architecture Fixes** 🛠️

Chuỗi 5 PRs quan trọng từ @SiYue-ZO:

**#2904** - Agent loop reload và panic cleanup
- Fix resource leaks trong agent turn lifecycle
- Loại bỏ detached goroutines trong `ReloadProviderAndConfig`
- Cải thiện panic recovery và cleanup

**#2905** - Fallback chain context handling
- Fix expired context không dừng fallback chain
- Tránh thử các candidates vô ích khi request đã timeout

**#2906** - Message bus backpressure
- Thêm backpressure handling cho full buffers
- Ngăn goroutine accumulation dưới high load
- Cải thiện health visibility

**#2907** - JSONL crash consistency
- Fix metadata drift khi crash giữa append và meta update
- Đảm bảo consistency giữa `.jsonl` và `.meta.json`

**#2913** - JSONL index hot-path optimization
- Loại bỏ unnecessary cloning trong `ResolveSessionKey`
- Fix TTL refresh semantics
- Cải thiện performance đáng kể cho session lookups

### **UX & Configuration Improvements** ✨

**#2914** - Request-scoped context policies (@lxowalle)
- Thêm `agents.defaults.turn_profile` global policy
- Kiểm soát history, system context, skills, tools per turn
- Tăng flexibility cho advanced use cases

**#2910** [MERGED] - WebUI API key handling (@imguoguo)
- Fix "Fetch Available Models" với saved providers
- Sử dụng stored API key thay vì yêu cầu nhập lại

**#2911** [MERGED] - i18n sync (@lc6464)
- Sync locale strings cho model provider UI
- Thêm missing `pt-BR` translations
- Cập nhật Chinese translations

**#2898** [MERGED] - Honor explicit thinking off (@lxowalle)
- Fix `thinking_level: "off"` không hoạt động đúng
- Đảm bảo explicit disable thực sự tắt thinking behavior

---

## 🌟 Điểm nổi bật cộng đồng

### **Top Issues theo tương tác**

**#2916** - CPU/Memory optimizations (2 comments)
- Đề xuất chi tiết từ @corporatepiyush
- Cộng đồng quan tâm đến performance improvements
- Có thể ảnh hưởng lớn đến production deployments

**#2901** [CLOSED] - GPT4Free support request
- Yêu cầu từ @opensource-elearning
- **Đã được implement nhanh chóng** trong #2909
- Phản ánh nhu cầu low-cost inference trong cộng đồng

**#2912** - FUNDING.yml suggestion (@nikolasdehor)
- Đề xuất thêm GitHub Sponsors support
- Thể hiện sự quan tâm đến sustainability của dự án

### **Tool Policy & Multi-Agent Architecture**

**#2838** - Frontmatter tool policy filters (@bogdanovich)
- Extend `AGENT.md` với `allow`/`deny` policies
- Hỗ trợ glob patterns cho tools và MCP servers
- Quan trọng cho enterprise security requirements

---

## 🐛 Ổn định & Bugs

### **Đã giải quyết** ✅

**#629** [CLOSED] - LLM call retry logic
- Bug: không retry khi gặp HTTP 500
- Đã được fix sau 15 comments và 3 tháng discussion

**#2795** [CLOSED] - Conversation history display
- Chỉ hiển thị message cuối cùng trong history
- Session compression không nên ảnh hưởng đến user view

**#2787** [CLOSED] - Message timestamps
- Tất cả messages dùng chung session.updated time
- Cần per-message timestamps cho accuracy

**#2798** [CLOSED] - PDF stream error in Telegram
- PDF attachments gây break stream/session
- Specific to PicoClaw (works in OpenClaw)

### **Đang xử lý** 🔄

**#2702** [CLOSED] - Multi-user group history attribution
- Default session scope thiếu sender attribution trong history
- Chỉ có current sender được identify
- Ảnh hưởng đến Discord và group channels

**#2775** [CLOSED] - Sub-agent AGENT.md inheritance
- Spawned agents inherit root AGENT.md
- Gây role confusion (Planner thinks it's root agent)
- Cần per-role system prompts

---

## 💡 Yêu cầu tính năng

### **Infrastructure & DevOps**

**#2812** [CLOSED] - Root Dockerfile
- Yêu cầu Dockerfile ở root để dễ development
- Đã được implement bởi @moltenbot000

### **Provider Ecosystem**

**#2901** → **#2909** - GPT4Free integration
- Native g4f support với automatic fallback
- Proxy routing cho reliability
- **Đã hoàn thành**

**#2917** - NEAR AI Cloud
- TEE-capable models
- Decentralized inference option
- **Đang review**

### **Agent Architecture**

**#2838** - Tool policy filters
- Granular control over tool access
- Security-focused feature
- **Đang review**

**#2914** - Context policies
- Per-turn control over context inclusion
- Advanced customization
- **Đang review**

---

## 💬 Phản hồi người dùng

### **Positive signals** 👍

- **Nhanh chóng respond** với community requests (GPT4Free implemented trong 1 ngày)
- **Active maintenance**: 14 dependency updates tự động
- **Quality focus**: 5 stability PRs trong 1 ngày từ core team

### **Pain points** 😓

- **Multi-user group chat** vẫn có issues với history attribution (#2702)
- **Sub-agent architecture** cần refactor để tránh role confusion (#2775)
- **Telegram integration** có stability issues với attachments (#2798)
- **Session management** có crash consistency gaps (#2907)

### **Community engagement** 🤝

- @nikolasdehor đề xuất funding mechanism - thể hiện community care
- @corporatepiyush contribute detailed optimization analysis
- Multiple contributors (7+ people) active trong 1 ngày

---

## 🗺️ Backlog & Roadmap

### **Immediate priorities** (dựa trên PR activity)

1. **Performance optimization** (#2916) - có thể merge trong tuần này
2. **Stability fixes** (#2904-#2907, #2913) - critical path
3. **Provider expansion** (#2917, #2915) - ecosystem growth

### **Medium-term focus**

1. **Multi-agent architecture improvements** (#2775, #2838)
   - Fix sub-agent AGENT.md inheritance
   - Implement tool policy filters
   
2. **Multi-user chat enhancements** (#2702)
   - Better sender attribution
   - Improved session scoping

3. **Context management** (#2914)
   - Flexible turn profiles
   - Advanced customization options

### **Technical debt**

- JSONL store consistency (đang được address)
- Agent lifecycle resource management (đang được address)
- Message bus backpressure (đang được address)

### **Ecosystem growth**

- Provider diversity: GPT4Free ✅, NEAR AI Cloud 🔄, MiMo improvements 🔄
- Funding mechanism discussion (#2912)
- Documentation improvements (#2662 - stale)

---

## 📈 Xu hướng phát triển

**Tích cực:**
- Tốc độ phát triển cao (30 PRs/day)
- Focus vào stability và performance
- Responsive với community feedback
- Active dependency management

**Cần chú ý:**
- Nhiều stale issues/PRs (7 items marked stale)
- Multi-user và multi-agent features cần attention
- Documentation PRs bị stale (#2662)

**Kết luận:** PicoClaw đang trong giai đoạn **maturation** với focus mạnh vào stability, performance, và ecosystem expansion. Dự án có community engagement tốt và responsive team.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo phân tích NanoClaw - 22/05/2026

## 📊 Tóm tắt hôm nay

Ngày 22/05 chứng kiến hoạt động tích cực với **11 PRs** và **3 issues mới**. Dự án đang trong giai đoạn mở rộng hệ sinh thái với việc tích hợp **Codex** như một lựa chọn thay thế Claude Code, đồng thời xử lý các vấn đề nghiêm trọng về **signal-cli authentication** và **WhatsApp logout**. Điểm nổi bật là PR #2532 đưa khả năng tạo video **Veo 3.1** vào Edna agent.

---

## 🚀 Releases

**Không có release mới** trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### 🎯 Xu hướng chính: Đa dạng hóa AI Provider

**PR #2580** - Codex-only installation support (mới nhất)
- Cho phép cài đặt NanoClaw hoàn toàn với **Codex** thay vì Claude Code
- Tích hợp OneCLI để quản lý credentials
- Đồng bộ skill catalog và persona giữa Codex, OpenCode và Claude Code
- **Ý nghĩa**: Giảm phụ thuộc vào một provider duy nhất, mở rộng khả năng tiếp cận người dùng

**PR #2474** - AI-coding-CLI picker
- Framework registry cho phép chọn Claude Code hoặc Codex trong setup
- Chuẩn bị cho việc tích hợp Aider, Gemini-CLI trong tương lai
- **Liên kết**: Hỗ trợ trực tiếp cho PR #2580

**PR #2337** - Surface Claude Code skills to non-Claude providers
- Chia sẻ skill catalog của Claude Code cho các provider khác
- Tạo `skill-catalog.ts` helper để build markdown discovery list
- **Impact**: Tăng khả năng tương thích cross-provider

### 🎬 Tính năng mới: Video Generation với Veo 3.1

**PR #2532** - Edna Veo 3.1 integration
- **Outbound**: Generate, extend, stitch videos qua Google Veo 3.1 API
- **Inbound**: Nhận và xử lý images/videos từ Slack
- Triển khai theo plan document `2026-05-17-001-feat-edna-video-generation-plan.md`
- **Trạng thái**: OPEN, đang review

### 🔧 Cải tiến kỹ thuật

**PR #2361** - Tighten Codex provider contracts
- Thay thế Codex SDK provider cũ bằng `codex app-server` JSON-RPC contract
- `CODEX_MODEL` trở thành optional override
- Loại bỏ guidance lỗi thời về 40K context/manual-compaction

**PR #2577** - Deshi auto-inject channelContext (CLOSED)
- Tự động inject `channelContext` từ `session_routing` SQLite table
- Loại bỏ việc agent phải fabricate thông tin này
- **Merged nhanh**: Cải thiện architecture rõ ràng

---

## 🔥 Điểm nổi bật cộng đồng

### ⚠️ Issues nghiêm trọng về Signal authentication

**3 issues liên tiếp** từ @snymanpaul phát hiện chuỗi lỗi trong signal-cli integration:

**#2581** - JSON field mismatch (có PR fix #2584)
- signal-cli 0.13+ đổi field `account` → `number`
- Wizard luôn báo "no linked account" dù đã setup
- **Severity**: HIGH - block onboarding flow

**#2582** - Deadlock khi daemon giữ config lock
- `listAccounts` dùng `spawnSync` không timeout
- Deadlock khi signal-cli daemon đang chạy
- **Impact**: Setup wizard bị treo vô thời hạn

**#2583** - `restartService` silent failure
- `launchctl kickstart -k` chỉ hoạt động khi plist đã loaded
- Không có error handling khi plist unloaded
- **Result**: Service không restart nhưng không báo lỗi

**Phân tích**: Đây là chuỗi issues chất lượng cao từ một contributor, cho thấy testing kỹ lưỡng trên macOS. Cả 3 issues đều ảnh hưởng đến **first-time user experience**.

---

## 🐛 Ổn định & Bugs

### 🔴 Critical Fixes

**PR #2579** - WhatsApp 401 logout handling
- **Problem**: Credentials không bị xóa sau 401 logout
- **Impact**: Service restart liên tục fail với dead credentials
- **Solution**: Clear auth credentials ngay lập tức khi nhận 401
- **Severity**: CRITICAL - ảnh hưởng production stability

**PR #2584** - Signal-cli 0.13+ compatibility
- Fix cho issue #2581
- Đọc field `number` thay vì `account`
- **Status**: OPEN, chờ merge

**PR #2576** - Progress display regression (CLOSED)
- Fix regression từ commit ea21e58
- Assistant text blocks bị suppress trong SDK mode
- Đổi `progressType='thinking'` → `progressType='text'`
- **Merged**: Fix nhanh cho UX issue

### 🟡 Architecture Issues

**Issue #2582** - Signal-cli deadlock
- Chưa có PR fix
- Cần thêm timeout cho `spawnSync` calls
- Có thể cần refactor sang async pattern

**Issue #2583** - launchctl silent failure
- Chưa có PR fix
- Cần thêm validation trước khi kickstart
- Hoặc fallback sang `launchctl load` + `kickstart`

---

## 💡 Yêu cầu tính năng

### 🎨 Telegram claim link (PR #2578)
- **Type**: Feature skill
- **Status**: OPEN
- **Details**: Thiếu description chi tiết trong PR
- **Note**: Đánh dấu `[follows-guidelines]` nhưng thiếu context

### 🔌 LiteLLM provider (PR #2490)
- **Type**: Operational/container skill
- **Status**: OPEN từ 15/05
- **Purpose**: Thêm LiteLLM như một provider option
- **Trend**: Phù hợp với chiến lược đa dạng hóa provider

---

## 💬 Phản hồi người dùng

### 👍 Positive signals

- **@snymanpaul**: Contributor mới với 3 high-quality bug reports trong 1 ngày
- **Quick merges**: PR #2576, #2577 được merge nhanh → responsive maintainers
- **Clear documentation**: Issues có reproduction steps rõ ràng

### 🤔 Concerns

- **Signal integration fragility**: 3 issues cùng lúc cho thấy testing coverage chưa đủ
- **Breaking changes**: signal-cli 0.13+ compatibility issue cho thấy dependency management cần cải thiện
- **Silent failures**: Issue #2583 về launchctl cho thấy cần better error reporting

---

## 🗺️ Backlog & Roadmap

### 🎯 Short-term priorities (dựa trên PR activity)

1. **Codex integration** (PR #2580, #2474, #2361, #2337)
   - 4 PRs liên quan đang active
   - Chiến lược rõ ràng: provider-agnostic architecture
   - Timeline: Có thể merge trong tuần này

2. **Signal-cli fixes** (Issues #2581-2583, PR #2584)
   - 1/3 issues có PR fix
   - 2 issues còn lại cần attention
   - **Priority**: HIGH - blocking onboarding

3. **Video generation** (PR #2532)
   - Feature lớn, đang review
   - Có plan document chi tiết
   - Timeline: Chưa rõ

### 🔮 Medium-term trends

- **Multi-provider ecosystem**: Aider, Gemini-CLI được mention
- **Skill portability**: Cross-provider skill sharing
- **Channel expansion**: Telegram, WhatsApp improvements
- **Media handling**: Video generation, inbound media processing

### ⚠️ Technical debt

- **Testing coverage**: Signal integration issues cho thấy gaps
- **Error handling**: Silent failures cần systematic fix
- **Dependency management**: Breaking changes từ signal-cli
- **Async patterns**: Deadlock issues suggest cần refactor sync calls

---

## 🎯 Kết luận

NanoClaw đang trong giai đoạn **mở rộng và ổn định hóa**. Chiến lược đa dạng hóa provider (Codex integration) cho thấy tầm nhìn dài hạn, trong khi các bug fixes về authentication cho thấy team responsive với production issues. Sự xuất hiện của contributor mới (@snymanpaul) với quality contributions là dấu hiệu tích cực cho sức khỏe cộng đồng.

**Điểm cần chú ý**: Signal-cli integration cần được ưu tiên fix trong vài ngày tới để không ảnh hưởng onboarding experience.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 22/05/2026

## 📊 Tóm tắt hôm nay

Dự án IronClaw đang trong giai đoạn tái cấu trúc lớn với **Reborn architecture**, tập trung vào việc hoàn thiện các thành phần cốt lõi. Hôm nay có 5 PR được merge liên quan đến skills framework, process isolation, và product workflow. Đáng chú ý là sự xuất hiện của các PR về tích hợp kênh mới (Slack, WeChat) và hệ thống auth/approval interactions, cho thấy dự án đang mở rộng khả năng tích hợp đa kênh.

## 🚀 Releases

Không có release chính thức nào trong 24 giờ qua.

## 🔨 Tiến độ dự án

### **Reborn Architecture - Giai đoạn hoàn thiện cốt lõi**

#### ✅ Đã hoàn thành (PRs merged hôm nay):

- **#3826** - Process port seam: Thêm abstraction layer cho việc thực thi command, tách biệt shell parsing khỏi process execution
- **#3827** - Nhóm các first-party host API bindings vào `InvocationServices`, cải thiện tổ chức code
- **#3759** - Durable product workflow ledger với libSQL/PostgreSQL backend, hỗ trợ idempotency và recovery
- **#3848** - Adapter skill bundles vào Reborn skill context, đọc `SKILL.md` với trust/visibility metadata
- **#3850** - Wire filesystem skills vào runtime context với scoped skill roots

#### 🔄 Đang triển khai (PRs open quan trọng):

**1. Cost-based budgets (#3841)** - XL, risk: low
- Thay thế iteration-count caps bằng USD-denominated reservations
- Cascade budgets: `tenant → user → project → agent → mission → thread`
- Hỗ trợ calendar/rolling-24h period rollover
- Graduated intervention (warn → throttle → block)

**2. Skills framework (chuỗi PRs #3854, #3859, #3861, #3863)**
- #3854: First-party skills extension crate với scoped filesystem
- #3859: Extension ports cho Reborn skills
- #3861: Skill activation selector với `/skill activate` command
- #3863: Skill asset access và execution adapter

**3. Auth & Approval system (#3864, #3865)**
- #3864: `ApprovalInteractionService` và `AuthInteractionService` cho user interactions
- #3865: Product auth contracts với OAuth flows, credential management

**4. Multi-channel expansion**
- #3857: Slack ProductAdapter MVP (Lane 10)
- #3815: WebChat v2 host gateway với auth + routes
- #3590: Telegram v2 inbound tracer (webhook → ledger)
- #2394: WeCom channel cho Enterprise WeChat

### **Xu hướng phát triển**

1. **Modularization**: Tách các concerns thành crates riêng biệt (`ironclaw_auth`, `ironclaw_interactions`, `ironclaw_first_party_extensions`)
2. **Security hardening**: Dispatch authority sealing (#3766), staged secret egress (#3831)
3. **Production readiness**: Durable ledgers, cost budgets, process isolation
4. **Extension ecosystem**: Skills và ProductAdapter framework đang được chuẩn hóa

## 💬 Điểm nổi bật cộng đồng

### **Issue #3866** - NEXUS x402 prediction market data
- Tác giả: @RileyCraig14
- Đề xuất tích hợp Kalshi/Polymarket prediction market data
- API arbitrage checking với x402 native validation
- Pricing: Free tier + $0.02 USDC paid tier
- **Insight**: Cho thấy nhu cầu tích hợp financial/market data vào AI agents

### **Issue #3846** - Mission notify_channels inheritance
- Tác giả: @sunglow666
- Vấn đề: Missions tạo từ Web UI Chat kế thừa source-channel label không rõ ràng
- Ảnh hưởng: Notification routing có thể không đúng kênh mong muốn
- **Insight**: UX confusion về channel context inheritance cần được làm rõ

### **PR #3737** - IronHub tool/skill installation
- Tác giả: @neo-sky (contributor mới)
- Cho phép install tools/skills từ IronHub runtime
- CLI commands: `ironclaw ironhub install/search/list/info`
- Agent-callable tools để self-install dependencies
- **Insight**: Hướng tới dynamic capability expansion cho agents

### **PR #1378** - Per-channel tool filtering
- Tác giả: @nick-stebbings
- JSON-configurable routing system
- Filter MCP servers và built-in tools theo channel
- Use case: Research channel chỉ dùng search tools, production channel full access
- **Insight**: Multi-tenancy và security scoping đang được ưu tiên

## 🐛 Ổn định & Bugs

### **Đã fix:**

- **#3852**: Before-inbound policy timeout (5s bound), rate limit key context, binding optimization
- **#3610**: Preserve typed filesystem errors trong `ProcessError` thay vì stringify

### **Đang theo dõi:**

- **#3333**: Production wiring audit - vẫn còn fake/in-memory/no-op seams cần thay thế bằng production implementations
- **Context compaction**: Các PR lớn (XL size) có thể gặp vấn đề với 200K token budget

### **Chất lượng code:**

- Nhiều PRs có comprehensive test coverage (E2E, integration, contract tests)
- Safety guardrails được enforce qua `AuthorizedDispatchRequest` (#3766)
- Network/outbound isolation tests (#3851)
- Projection subscription isolation tests (#3862)

## ✨ Yêu cầu tính năng

### **Đang implement:**

1. **Cost-based resource management** (#3841)
   - USD-denominated budgets thay vì iteration caps
   - Multi-level cascade với period rollover

2. **Skills ecosystem** (#3854-#3863)
   - Progressive disclosure
   - Scoped asset access
   - Activation selector
   - First-party extension framework

3. **Multi-channel auth** (#3865)
   - OAuth flows
   - Secure token handling
   - Provider callback exchange
   - Credential lifecycle management

### **Community requests:**

- **Prediction market integration** (#3866): Financial data APIs
- **Dynamic tool installation** (#3737): Runtime capability expansion
- **Channel-specific tool scoping** (#1378): Security và UX customization

## 👥 Phản hồi người dùng

### **Positive signals:**

- Contributors mới (@neo-sky, @righamgadhesriya) đang tham gia với PRs có giá trị
- Experienced contributors (@hanakannzashi, @nick-stebbings) đóng góp features lớn
- Documentation được cập nhật song song với code (#3680 - WeChat docs)

### **Pain points:**

- **Channel context confusion** (#3846): UX không rõ ràng về mission source inheritance
- **Production readiness gaps** (#3333): Vẫn còn nhiều fake implementations cần thay thế
- **Complexity**: Reborn architecture có learning curve cao (nhiều abstractions, ports, adapters)

### **Developer experience:**

- Code review thoroughness cao (follow-up PRs như #3852)
- Comprehensive testing culture
- Clear separation of concerns giữa các crates

## 🗺️ Backlog & Roadmap

### **Reborn cutover blockers** (từ #2987):

#### ✅ Completed:
- #3016: AgentLoopHost facade
- #3013: TurnCoordinator
- #3022: Event substrate integration tests
- #3039: Final integration PR checklist

#### 🔄 In progress:
- #3031: Product surface migration (EPIC)
- #3333: Production wiring và missing crates

### **Lane-based development** (10 lanes):

- **Lane 2**: Tool package readiness (#3860) - freezing contracts
- **Lane 10**: Slack ProductAdapter (#3857) - MVP phase
- **Lanes 4-10**: Phụ thuộc vào tool package readiness contract

### **Upcoming priorities** (suy luận từ open PRs):

1. **Q2 2026**: Hoàn thiện Reborn cutover
   - Production wiring (#3333)
   - Multi-channel adapters (Slack, Telegram v2, WebChat v2)
   - Cost budgets production deployment

2. **Extension ecosystem maturity**
   - Skills marketplace (IronHub integration)
   - ProductAdapter standardization
   - First-party vs third-party extension boundaries

3. **Enterprise features**
   - WeCom channel (#2394)
   - Advanced auth flows (#3865)
   - Approval workflows (#3864)

### **Technical debt:**

- Migration từ fake implementations sang production services
- Context window management cho large PRs
- Channel routing UX clarity

---

## 🎯 Kết luận

IronClaw đang trong giai đoạn **transformation lớn** với Reborn architecture. Tiến độ ổn định với ~5 PRs merged/day, focus vào **production readiness**, **security**, và **extensibility**. Cộng đồng đang mở rộng với contributors mới và use cases đa dạng (financial data, enterprise channels). Challenges chính là **complexity management** và **production wiring completion** trước khi cutover hoàn toàn sang Reborn stack.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo phân tích LobsterAI - 22/05/2026

## 🎯 Tóm tắt hôm nay

Dự án LobsterAI đang trong giai đoạn dọn dẹp backlog với 2 PR được đóng ngay trong ngày và 9 PR cũ được đánh dấu "stale". Hoạt động chính tập trung vào tối ưu hóa UI/UX của hệ thống IM bot và gateway settings, trong khi các tính năng mới từ đầu tháng 4 vẫn đang chờ review.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### ✅ Hoàn thành trong ngày

**#2025 & #2024** - Cải tiến trải nghiệm quản lý IM bot
- **#2025**: Thiết kế lại giao diện quản lý IM bot với UX hiện đại hơn
- **#2024**: Tối ưu hóa quy trình khởi động lại gateway trong settings
- Cả hai PR được merge nhanh chóng, cho thấy đây là các cải tiến ưu tiên cao

### ⏳ Backlog đang tồn đọng (9 PRs từ 07/04)

Các PR này đã không có hoạt động trong 6 tuần và được đánh dấu "stale":

**Nhóm UX/Notification (độ ưu tiên cao)**
- **#1536**: Thông báo hệ thống khi Cowork session hoàn thành - tính năng quan trọng cho trải nghiệm async
- **#1546**: Nút "Hủy khởi động" và "Xem log" khi engine timeout >30s - giải quyết pain point lớn về UX

**Nhóm Quản lý nội dung**
- **#1538**: Bookmark/đánh dấu sao cho tin nhắn AI - tính năng productivity cơ bản
- **#1542**: Hệ thống tag/label cho sessions với filter - nâng cao khả năng tổ chức

**Nhóm Bugs & i18n**
- **#1540**: Thiếu bản dịch nút "Edit" trong Memory settings
- **#1543**: Dialog xác nhận vẫn hiện tiếng Trung khi chuyển sang English
- **#1547**: Không thể đổi notification channel về "Không thông báo"
- **#1544**: OAuth polling không dừng khi đóng Settings
- **#1545**: Skill badges không cập nhật real-time khi sửa agent

### 📊 Xu hướng phát triển

- **Tích cực**: Team đang dọn dẹp technical debt và tối ưu core flows
- **Tiêu cực**: Backlog tồn đọng 6 tuần cho thấy thiếu bandwidth review hoặc ưu tiên không rõ ràng
- **Rủi ro**: 9 PRs stale có thể gây conflict lớn nếu codebase thay đổi nhiều

## 🌟 Điểm nổi bật cộng đồng

Không có tương tác cộng đồng đáng kể (0 reactions trên tất cả PRs). Điều này có thể do:
- Dự án đang trong giai đoạn phát triển nội bộ
- Cộng đồng chưa được kích hoạt mạnh
- Hoặc đơn giản là các PR này chưa được quảng bá rộng rãi

## 🐛 Ổn định & Bugs

### Bugs đã được fix (đang chờ merge)

**Critical UX bugs**:
- **#1544**: Memory leak tiềm ẩn - OAuth polling chạy ngầm 15 phút sau khi đóng Settings
- **#1545**: State sync issue - UI không phản ánh thay đổi ngay lập tức

**i18n regressions**:
- **#1540, #1543**: Hardcoded Chinese strings phá vỡ trải nghiệm đa ngôn ngữ
- **#1547**: Logic bug trong form initialization (từ commit `61cfe60`)

### Đánh giá chất lượng

Các PR bug fix đều có:
- ✅ Root cause analysis chi tiết
- ✅ Giải pháp rõ ràng với code diff
- ✅ Scope ảnh hưởng được xác định

Chất lượng engineering tốt, nhưng cần tăng tốc độ review.

## 💡 Yêu cầu tính năng

### Tính năng mới đang chờ merge

**Productivity enhancements**:
1. **Session bookmarks** (#1538) - Đánh dấu tin nhắn quan trọng trong long conversations
2. **Session tagging system** (#1542) - Tổ chức và filter sessions theo tags tùy chỉnh
3. **System notifications** (#1536) - Thông báo OS-level khi task hoàn thành

**Developer experience**:
4. **Engine startup escape hatch** (#1546) - Cho phép cancel/debug khi startup bị stuck

Tất cả đều là các tính năng "table stakes" cho một AI agent platform hiện đại.

## 👥 Phản hồi người dùng

Không có feedback trực tiếp từ users trong dữ liệu. Tuy nhiên, các issues được fix cho thấy pain points thực tế:

- 😤 **Frustration với engine startup**: Không thể làm gì khi bị stuck
- 🌐 **i18n experience bị broken**: Hardcoded strings phá vỡ trải nghiệm đa ngôn ngữ
- 🔔 **Thiếu awareness**: Không biết khi nào task hoàn thành nếu switch window
- 🗂️ **Organization chaos**: Thiếu cách tổ chức sessions và messages

## 🗺️ Backlog & Roadmap

### Ưu tiên đề xuất (dựa trên impact)

**P0 - Merge ngay** (blocking user experience):
1. #1544 - OAuth memory leak
2. #1543 - i18n broken dialogs
3. #1546 - Engine startup escape hatch

**P1 - Merge tuần này** (high-value features):
4. #1536 - System notifications
5. #1545 - Real-time skill badge sync

**P2 - Review & merge** (nice-to-have):
6. #1538 - Bookmarks
7. #1542 - Tagging system
8. #1540, #1547 - Minor UI bugs

### Rủi ro roadmap

⚠️ **Stale PR debt**: 9 PRs tồn đọng 6 tuần có thể:
- Gây conflict merge phức tạp
- Làm nản lòng contributors
- Tạo technical debt nếu bị abandon

**Khuyến nghị**: Cần một "PR cleanup sprint" để review/merge hoặc close với lý do rõ ràng.

---

**Kết luận**: LobsterAI đang có foundation tốt với các PR chất lượng cao, nhưng cần tăng tốc độ review để tránh backlog tích tụ. Ưu tiên xử lý các bug blocking UX và i18n trước khi thêm features mới.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo phân tích dự án Moltis - 22/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 22/05 chứng kiến hoạt động phát triển mạnh mẽ với 4 PR mới được mở để giải quyết các vấn đề quan trọng về Docker/sandbox, telephony, và mở rộng hệ sinh thái AI. Dự án đang tập trung vào việc cải thiện trải nghiệm triển khai trong môi trường container và tích hợp các nhà cung cấp AI mới. Một issue đặc biệt về tích hợp prediction market API (NEXUS x402) cho thấy cộng đồng đang khám phá các use case mới.

## 📦 Releases

Không có release mới trong 24 giờ qua.

## 🚀 Tiến độ dự án

### Pull Requests đang hoạt động

**🔧 Cải thiện hạ tầng & triển khai:**

- **#1035 - Auto-detect Docker host data mounts** 
  - Giải quyết vấn đề quan trọng #977 về browser sandbox trong Docker
  - Tự động phát hiện mount points khi chạy trong container
  - Cải thiện khả năng tương thích với Docker/Podman và các môi trường virtualization (LXC/Proxmox)
  - **Impact**: Giảm friction khi triển khai Moltis trong production environments

- **#1033 - Vault encryption opt-out**
  - Cho phép tắt encryption at rest cho vault
  - Thêm API và UI để disable vault với decryption tự động
  - **Use case**: Môi trường dev/test hoặc khi encryption được xử lý ở infrastructure layer

**📞 Sửa lỗi telephony:**

- **#1034 - Fix Twilio gather speech dispatch**
  - Giải quyết issue #1032 về agent không phản hồi trong cuộc gọi
  - Sửa parsing logic để xử lý `SpeechResult` và `Digits` đúng cách
  - Thêm test coverage cho Twilio payloads
  - **Impact**: Cải thiện đáng kể trải nghiệm voice interaction

**🤖 Mở rộng AI ecosystem:**

- **#1031 - NEAR AI Cloud provider**
  - Tích hợp NEAR AI Cloud với OpenAI-compatible API
  - Hỗ trợ TEE (Trusted Execution Environment) capabilities
  - Auto-discovery models từ public catalog
  - **Ý nghĩa**: Mở rộng lựa chọn AI provider, đặc biệt cho use cases yêu cầu privacy/security cao

**✅ Merged:**

- **#1005 - OpenAI Codex reasoning effort support** (đã đóng 21/05)
  - Hỗ trợ reasoning_effort parameter cho GPT-5 Codex
  - Cải thiện quality của reasoning outputs

### Xu hướng phát triển

1. **Infrastructure maturity**: Tập trung vào production-readiness với Docker/container support
2. **Multi-modal expansion**: Cải thiện voice/telephony capabilities
3. **Provider diversity**: Mở rộng hệ sinh thái AI providers (NEAR AI Cloud)
4. **Security flexibility**: Cho phép customize security posture (vault opt-out)

## 💬 Điểm nổi bật cộng đồng

**🔥 Issue mới đáng chú ý:**

- **#1038 - NEXUS x402 prediction market API** (0 comments, mới tạo)
  - Tích hợp Kalshi/Polymarket data với x402 protocol
  - Đã validate trên Agentic Market
  - **Insight**: Cộng đồng đang khám phá use cases về financial/prediction markets, cho thấy Moltis đang được áp dụng vào các domain đa dạng

**📊 Issues có tương tác:**

- **#977 - Browser sandbox Docker issue** (4 comments)
  - Vấn đề được quan tâm nhất, đang được giải quyết qua PR #1035
  - Ảnh hưởng đến nhiều users triển khai trong container environments

## 🐛 Ổn định & Bugs

### Bugs đang được xử lý

**🔴 Ưu tiên cao:**

1. **#977 - Browser sandbox fails in Docker** → PR #1035 đang fix
   - Root cause: Permission denied khi tạo browser profile trong container
   - Solution: Auto-detect host-visible mounts

2. **#1032 - Twilio agent không phản hồi** → PR #1034 đang fix
   - Root cause: Gather parsing logic không xử lý SpeechResult đúng
   - Solution: Fix dispatch order và thêm debug logging

3. **#1037 - send_image/send_document fail trong Docker**
   - Mới report, chưa có PR
   - Có thể liên quan đến mount/permission issues tương tự #977

**🟡 Ưu tiên trung bình:**

4. **#1030 - OpenAI TTS format issue**
   - Yêu cầu `opus` format nhưng Speaches không support
   - Cần investigation về compatibility layer

### Đánh giá

Các bugs chủ yếu tập trung vào **Docker/containerization** và **telephony integration** - hai areas quan trọng cho production deployment. Team đang phản ứng nhanh với PRs được tạo trong vòng 24h sau khi issues được report.

## ✨ Yêu cầu tính năng

**📝 Feature requests mới:**

1. **#1036 - Arbitrary file attachments trong web UI**
   - Cho phép upload bất kỳ file type nào, không chỉ images
   - **Use case**: Xử lý documents, code files, data files
   - **Priority**: Enhancement cho UX

2. **#1029 - Handle Piper TTS audio conversions internally**
   - Di chuyển audio conversion logic vào `crates/voice/src/tts/piper.rs`
   - **Benefit**: Giảm dependencies, cải thiện performance

### Phân tích

Feature requests cho thấy users đang:
- Sử dụng Moltis cho các tác vụ đa dạng cần xử lý nhiều loại files
- Quan tâm đến voice/TTS quality và performance
- Muốn giảm external dependencies

## 👥 Phản hồi người dùng

### Sentiment analysis

**Tích cực:**
- Users đang actively report issues với context đầy đủ (good bug reports)
- Community đang thử nghiệm Moltis trong production environments (Docker, Proxmox)
- Có sự đóng góp từ nhiều contributors khác nhau

**Thách thức:**
- Docker/container deployment vẫn có friction points
- Voice/telephony features cần stabilization
- Documentation có thể cần cải thiện (nhiều setup issues)

### User profiles

Từ issues/PRs, có thể thấy users đang:
- Self-host Moltis trong infrastructure phức tạp (LXC, Proxmox, Docker)
- Sử dụng telephony features (Twilio integration)
- Thử nghiệm với prediction markets và financial data
- Cần multi-modal capabilities (voice, images, documents)

## 🗺️ Backlog & Roadmap

### Priorities ngắn hạn (dựa trên activity)

1. **Stabilize Docker/container support** ✅ Đang xử lý
   - PR #1035 cần review và merge
   - Issue #1037 cần investigation

2. **Fix telephony issues** ✅ Đang xử lý
   - PR #1034 cần review và merge

3. **Expand AI provider ecosystem** 🔄 In progress
   - PR #1031 (NEAR AI Cloud) cần review

4. **Improve file handling** 📋 Planned
   - Issue #1036 chờ implementation

### Xu hướng dài hạn

- **Production-readiness**: Focus vào stability, deployment ease
- **Multi-modal AI**: Voice, vision, document processing
- **Provider diversity**: Không lock-in vào một AI provider
- **Security & privacy**: TEE support, flexible encryption options
- **Domain expansion**: Financial/prediction markets, enterprise use cases

---

**📈 Đánh giá tổng quan**: Dự án đang trong giai đoạn maturation với focus mạnh vào production deployment và stability. Response time từ maintainers rất tốt (PRs được tạo trong 24h sau bug reports). Community đang active và đa dạng về use cases.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo Phân tích Hệ sinh thái CoPaw - Ngày 22/05/2026

## 🎯 Tóm tắt hôm nay

Dự án CoPaw đang trong giai đoạn phát triển tích cực với **23 issues** và **29 pull requests** hoạt động. Trọng tâm hôm nay tập trung vào việc **cải thiện tích hợp kênh WeChat/DingTalk**, **tối ưu hóa hệ thống quản lý context**, và **nâng cấp trải nghiệm người dùng Console**. Đáng chú ý là nhiều contributor mới tham gia với các PR chất lượng, cho thấy cộng đồng đang phát triển mạnh mẽ.

---

## 🚀 Releases

**Không có release chính thức trong 24 giờ qua**, nhưng version đang phát triển là **v1.1.9b1** (theo PR #4589). Phiên bản hiện tại ổn định là **v1.1.8.post1**.

---

## 📈 Tiến độ dự án

### 🔥 Pull Requests quan trọng đang được review:

#### **1. Hệ thống Access Control thống nhất (#4565)** 
- **Tác động**: Lớn - Refactor toàn bộ hệ thống kiểm soát truy cập
- **Nội dung**: Whitelist/blacklist/pending approval cho tất cả channels, lưu trữ per-workspace, REST API + Console UI
- **Ý nghĩa**: Chuẩn hóa bảo mật và quản lý quyền truy cập trên toàn bộ nền tảng

#### **2. Skill Market & Refactor Skill Hub (#4518)**
- **Tác động**: Trung bình - Nâng cấp hệ sinh thái skill
- **Nội dung**: 3 providers, async search, pagination, queued install, provenance tracking
- **Ý nghĩa**: Tạo marketplace thống nhất cho skills, cải thiện khả năng mở rộng

#### **3. Tauri 2.x Desktop App (#3813)**
- **Tác động**: Lớn - Mở rộng nền tảng
- **Nội dung**: Desktop app đa nền tảng với Tauri 2.x
- **Trạng thái**: Đang review từ 24/04, cần attention

#### **4. Integration Test Suite Expansion (#4561)** ✅ Merged
- **Tác động**: Trung bình - Cải thiện chất lượng code
- **Nội dung**: Mở rộng từ 10 → **105 test cases**, refactor fixture infrastructure
- **Ý nghĩa**: Tăng độ tin cậy và phát hiện regression sớm

### 📊 Xu hướng phát triển:

```
🔧 Kênh tích hợp (WeChat/DingTalk/QQ): 35% PRs
🎨 Console UI/UX improvements: 25% PRs  
🧪 Testing & Infrastructure: 15% PRs
🔐 Security & Access Control: 15% PRs
⚡ Performance & Context Management: 10% PRs
```

---

## 🌟 Điểm nổi bật cộng đồng

### 🔥 Issues được quan tâm nhất:

#### **1. Context Compression Loss (#4551)** - 👍 1
- **Vấn đề**: Cơ chế nén context hiện tại (sliding window + summary) làm mất thông tin chi tiết
- **Đề xuất**: DAG-based summarization + CJK token fix
- **Tác động**: Ảnh hưởng đến long-running tasks (multi-day coding, report collection)

#### **2. Performance với 40+ agents (#4559)**
- **Vấn đề**: Trang web chậm rõ rệt khi có >40 agents
- **Nguyên nhân**: Có thể liên quan đến rendering hoặc state management
- **Trạng thái**: Đang điều tra

#### **3. WeChat iLink Message Dedup Failure (#4546)** ✅ Fixed
- **Vấn đề**: Tin nhắn bị xử lý trùng lặp, ret=-2 retry vô hạn
- **Giải pháp**: PR #4576 đã fix bằng content-based dedup

### 👥 Contributor mới nổi bật:

- **@Zachary-wW**: Fix Whisper transcription (#4601)
- **@jc200808**: Cron job context lifecycle (#4614)
- **@Andrai985**: Chat input draft persistence (#4520)
- **@ningblue**: extraSystemPrompt API support (#4580)

---

## 🐛 Ổn định & Bugs

### ✅ Đã giải quyết:

1. **WeChat message dedup & retry loop** (#4546) → Fixed in #4576
2. **DingTalk Chinese filename encoding** (#4600) → Percent-decode fix
3. **Pet import dark mode visibility** (#4592) → Fixed in #4599
4. **Topic list wipe in heavy tool-call sessions** (#4519) → Resolved
5. **max_input_length missing in WebUI** (#4590) → Restored

### 🔴 Đang xử lý:

1. **DeepSeek v4 Flash thinking tag parsing** (#4051)
   - Nội dung thinking không được parse đúng
   - 9 comments, đang điều tra

2. **Voice transcription ignores Whisper config** (#4556)
   - Browser native Speech API được dùng thay vì Whisper
   - PR #4601 đang fix

3. **ACP session không tự đóng** (#4611)
   - Orphan processes sau khi task hoàn thành
   - PR #4615 đang xử lý

4. **Gemini/Gemma ValidationError** (#4605) - 👍 1
   - `max_tokens` parameter không được Gemini API chấp nhận
   - Cần mapping sang `max_output_tokens`

5. **Dream awakening task error** (#4616)
   - WeChat channel error dù chưa config
   - Mới report, chưa có response

---

## 💡 Yêu cầu tính năng

### 🎯 Đề xuất có tác động cao:

#### **1. Plugin Agent Hook Support (#4613)**
- **Nhu cầu**: Cho phép plugin hook vào agent lifecycle
- **Use case**: LightRAG knowledge base plugin cần inject context
- **Đề xuất**: `register_agent_hook` API tương tự `register_tool`

#### **2. Cron Job Context Isolation (#4606)**
- **Nhu cầu**: Cron jobs cần isolated context nhưng vẫn track history
- **Giải pháp**: PR #4614 đang implement

#### **3. Unified Workspace File Organization (#4408)**
- **Nhu cầu**: Tập trung file mặc định vào `.qwenpaw/` folder
- **Lợi ích**: Workspace sạch hơn, dễ quản lý

#### **4. Console UI Consistency (#4593)**
- **Vấn đề**: Một số trang có animation/layout không nhất quán
- **Đề xuất**: Chuẩn hóa theo style của "Skill Pool" page

---

## 💬 Phản hồi người dùng

### 😊 Tích cực:

- **Integration test expansion** được đánh giá cao (105 test cases)
- **First-time contributors** được support tốt, nhiều PR quality cao
- **Bug response time** nhanh (nhiều issue được fix trong ngày)

### 😟 Tiêu cực/Khó khăn:

1. **Channel integration complexity**: 
   - WeChat/DingTalk có nhiều edge cases (encoding, dedup, retry logic)
   - Cần documentation tốt hơn cho channel development

2. **Context management confusion**:
   - `max_input_length` vs `max_context_length` gây nhầm lẫn
   - Compression behavior không rõ ràng với người dùng

3. **Performance với scale**:
   - 40+ agents làm chậm UI
   - Cần optimization hoặc pagination

4. **API documentation gaps**:
   - `/api/console/chat` thiếu docs về `extraSystemPrompt`
   - Channel API behavior không consistent

---

## 🗺️ Backlog & Roadmap

### 🎯 Ưu tiên cao (dựa trên activity):

1. **✅ Access Control System** (#4565) - Đang review
2. **✅ Tauri Desktop App** (#3813) - Cần merge
3. **🔄 Context Compression Improvement** (#4551) - Cần design decision
4. **🔄 Skill Market** (#4518) - Đang review
5. **🔄 Plugin Hook System** (#4613) - Đang thảo luận

### 📅 Dự kiến v1.1.9:

Dựa trên PR activity, version tiếp theo có thể bao gồm:
- ✅ WeChat/DingTalk stability fixes
- ✅ Console UI improvements (dark mode, draft persistence)
- ✅ Integration test coverage expansion
- 🔄 Access control system (nếu review xong)
- 🔄 Skill market (nếu review xong)

### 🔮 Dài hạn:

- **Desktop app** (Tauri) - Đang chờ merge
- **Context management overhaul** - Cần RFC/design doc
- **Performance optimization** - Cần profiling data
- **Channel ecosystem expansion** - Matrix refactor đang diễn ra

---

## 📊 Thống kê hoạt động

```
📝 Issues:
  - Mở: 18
  - Đóng hôm nay: 5
  - Trung bình comments: 2.8

🔀 Pull Requests:  
  - Mở: 10
  - Merged hôm nay: 15
  - Đóng không merge: 4
  - First-time contributors: 6

👥 Contributors hoạt động: 20+
🏷️ Labels phổ biến: bug (35%), enhancement (25%), question (20%)
```

---

## 🎬 Kết luận

CoPaw đang trong giai đoạn **phát triển ổn định và mở rộng tính năng**. Điểm mạnh là **community engagement cao**, **bug response nhanh**, và **nhiều contributor mới chất lượng**. Thách thức chính là **channel integration complexity** và **context management** cần được cải thiện. Roadmap rõ ràng với focus vào **stability**, **UX**, và **ecosystem expansion**.

**Đánh giá tổng thể**: 🟢 **Healthy & Growing** 

---

*Báo cáo được tạo tự động bởi Kiro AI - 22/05/2026*

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo phân tích GoClaw - 22/05/2026

## 🎯 Tóm tắt hôm nay

Hoạt động hôm nay tập trung vào việc đóng PR cải thiện UX cho Slack channel (#861) và cập nhật các PR đang mở liên quan đến hạ tầng Podman và tích hợp Bitrix24. Dự án đang trong giai đoạn hoàn thiện các tính năng channel messaging và cải thiện trải nghiệm triển khai với Podman rootless.

---

## 🚀 Releases

Không có release mới trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### Pull Requests đang hoạt động

**🔧 Hạ tầng & DevOps**
- **#485** - Podman rootless setup script (cập nhật 22/05)
  - Script tương tác giúp cấu hình Podman rootless
  - Tự động copy config, tích hợp mise, hướng dẫn biến môi trường
  - Quan trọng cho việc triển khai không cần root privileges

- **#1135** - Compose file picker (cập nhật 22/05)
  - Tool chọn file docker-compose qua biến COMPOSE_FILE
  - Đơn giản hóa việc quản lý nhiều cấu hình môi trường
  - Cải thiện workflow cho developers

**💬 Tích hợp Messaging**
- **#1061** - Bitrix24 channel (cập nhật 21/05)
  - PR 3/3 trong series tích hợp Bitrix24
  - Hỗ trợ OAuth per-user qua MCP
  - UI fields và agent layer cho group chats
  - Stacked PR cho thấy quy trình review có cấu trúc

### Xu hướng phát triển

🔹 **Multi-channel expansion**: Dự án đang mở rộng hỗ trợ nhiều nền tảng messaging (Slack, Bitrix24)  
🔹 **Container flexibility**: Đầu tư mạnh vào hỗ trợ Podman bên cạnh Docker  
🔹 **Developer experience**: Tập trung vào tooling và automation cho setup

---

## ⭐ Điểm nổi bật cộng đồng

### PR được đóng thành công
- **#861** - Tắt "Thinking..." placeholder trong Slack ✅
  - Giải quyết vấn đề UX: notification spam từ placeholder
  - Người dùng chỉ nhận thông báo cho câu trả lời thực sự
  - Cho thấy dự án lắng nghe feedback về trải nghiệm người dùng

**Insight**: Việc đóng PR này phản ánh sự chú trọng đến chi tiết UX trong messaging channels - một yếu tố quan trọng cho adoption.

---

## 🐛 Ổn định & Bugs

### Issue đang mở

**#550 - Docker resolver breaks Podman** 🔴 (cập nhật 22/05)
- **Mức độ**: Critical cho người dùng Podman
- **Triệu chứng**: "...but it used to work!" - regression từ commit a4a7a59b (20/03/2026)
- **Root cause**: Docker resolver `127.0.0.11` được hardcode trong nginx config
- **Workaround**: Thêm fallback resolver `10.89.1.1` và tắt IPv6
- **Impact**: Ảnh hưởng đến tất cả deployments dùng Podman

```nginx
resolver 127.0.0.11 10.89.1.1 valid=10s ipv6=off;
```

**Phân tích**: 
- Issue tồn tại 2 tháng (từ 29/03) với chỉ 2 comments
- Có fix đề xuất nhưng chưa được merge
- Mâu thuẫn với nỗ lực hỗ trợ Podman qua PR #485
- Cần ưu tiên cao hơn để không block adoption của Podman users

---

## 💡 Yêu cầu tính năng

### Đang phát triển

**Bitrix24 Integration** (#1061)
- OAuth per-user cho enterprise use cases
- MCP (Model Context Protocol) integration
- Group chat support với per-user credentials
- Phần 3/3 của series lớn, cho thấy tính năng phức tạp được chia nhỏ tốt

**Compose Configuration Management** (#1135)
- Dynamic compose file selection
- Environment-specific configurations
- Cải thiện multi-environment workflows

---

## 💬 Phản hồi người dùng

### Positive signals
✅ PR #861 được merge - responsive với UX feedback  
✅ Podman support đang được đầu tư (PR #485)

### Pain points
⚠️ Issue #550 tồn tại lâu - regression chưa được fix  
⚠️ Podman users gặp blockers nghiêm trọng  
⚠️ Thiếu tương tác trên issues (0 reactions, ít comments)

**Insight về cộng đồng**: 
- Cộng đồng nhỏ hoặc ít tương tác công khai
- Contributors chính: @keithy (infra), @tech-synity (channels), @SeHoJoo (UX)
- Cần khuyến khích nhiều feedback và testing từ users

---

## 🗺️ Backlog & Roadmap

### Ưu tiên ngắn hạn (suy luận từ hoạt động)

1. **🔥 Critical**: Fix Podman resolver issue (#550)
2. **🚀 High**: Hoàn thiện Bitrix24 integration (#1061)
3. **🔧 Medium**: Merge Podman setup tooling (#485)
4. **📦 Medium**: Compose file picker (#1135)

### Xu hướng dài hạn

**Multi-platform messaging**: Mở rộng sang nhiều channels (Slack ✅, Bitrix24 🚧, tiếp theo?)  
**Container agnostic**: Hỗ trợ đầy đủ cả Docker và Podman  
**Enterprise features**: OAuth per-user, group chat management  
**Developer tooling**: Setup automation, configuration management

---

## 🎯 Khuyến nghị

1. **Ưu tiên fix #550** - Regression nghiêm trọng ảnh hưởng Podman adoption
2. **Tăng visibility** - Issues có ít engagement, cần khuyến khích community testing
3. **Documentation** - Podman setup cần docs rõ ràng khi PR #485 merge
4. **Testing strategy** - Cần CI/CD test cả Docker và Podman để tránh regression

---

**📌 Kết luận**: GoClaw đang phát triển ổn định với focus rõ ràng vào multi-channel messaging và container flexibility. Cần giải quyết technical debt (issue #550) và tăng cường community engagement để scale tốt hơn.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Báo cáo phân tích Hermes-Agent - 22/05/2026

## 📊 Tóm tắt hôm nay

Ngày 22/05 ghi nhận hoạt động phát triển cực kỳ sôi nổi với **6 issues mới** và **30 PRs được tạo/cập nhật**. Dự án đang trong giai đoạn ổn định hóa hệ thống với trọng tâm vào **sửa lỗi nghiêm trọng** (data loss, polling race conditions) và **cải thiện trải nghiệm tích hợp** (fallback providers, external skills, multi-platform support). Đáng chú ý là xuất hiện bug P1 về mất dữ liệu workspace và nhiều cải tiến về khả năng mở rộng của hệ thống.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua. Dự án đang tích lũy các bản vá và tính năng mới cho phiên bản tiếp theo.

---

## 🔧 Tiến độ dự án

### **Xu hướng phát triển chính**

#### 1️⃣ **Ổn định hóa hệ thống core** (Ưu tiên cao)
- **#30151 [P1]** - Bug nghiêm trọng: Kanban cleanup xóa toàn bộ thư mục dự án
  - Vấn đề: Tính năng "Scratch Workspace" cleanup đã xóa nhầm thư mục projects của người dùng
  - Tác động: Mất dữ liệu không thể khôi phục
  - Trạng thái: Đang điều tra, chưa có PR fix

- **#30158** - Fix race condition trong Telegram polling
  - Vấn đề: Chu kỳ 409 Conflict kéo dài 31 giây, gây mất tin nhắn
  - Giải pháp: Loại bỏ xung đột giữa PTB retry loop và conflict handler
  - Tác động: Cải thiện độ tin cậy gateway

#### 2️⃣ **Mở rộng khả năng tích hợp** (Feature-rich)
- **#22201** - Per-auxiliary fallback providers
  - Cho phép mỗi auxiliary task (vision, web_extract, compression...) có fallback riêng
  - Tăng khả năng phục hồi khi provider chính gặp sự cố

- **#30160** - Fix fallback_chain endpoint overrides
  - Sửa lỗi auxiliary không nhận đúng endpoint override từ fallback chain
  - Quan trọng cho multi-provider deployments

- **#30148** - Thêm reference_images cho image generation
  - Hỗ trợ style transfer và likeness guidance (OpenAI gpt-image-2)
  - Mở rộng khả năng sáng tạo của agent

#### 3️⃣ **Cải thiện developer experience**
- **#30026** - Fix input freeze sau curses menu
  - Vấn đề: Terminal bị đóng băng sau khi chọn platform trong setup
  - Giải pháp: Khôi phục ICANON và ECHO flags

- **#30157** - Surface actual import failure cho Anthropic
  - Thay thế thông báo lỗi chung bằng diagnostic chi tiết (interpreter path, import traceback)
  - Giúp debug nhanh hơn khi gặp dependency issues

- **#29381** - Support categorized plugin names trong dashboard
  - Fix runtime actions cho plugin IDs có namespace (`observability/langfuse`, `browser/browser_use`)

#### 4️⃣ **Tính năng mới đáng chú ý**
- **#30163** - Parallel orchestration skill
  - Hướng dẫn agent xử lý goals phức tạp bằng parallel batch execution
  - Bổ sung cho `delegate_task` đã có sẵn

- **#30141** - Edit gateway status updates (Telegram)
  - Cập nhật status message tại chỗ thay vì spam nhiều tin nhắn
  - Cải thiện UX cho long-running tasks

- **#20059** - Hermes desktop app (Electron)
  - Full-featured desktop client: chat, composer, panes, voice controls
  - Đang trong giai đoạn review, có thể là milestone lớn

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues được quan tâm nhất**

1. **#30151 - Data loss bug** (P1, 1 comment)
   - Vấn đề nghiêm trọng nhất: Mất toàn bộ workspace
   - Cộng đồng đang chờ hotfix khẩn cấp

2. **#10011 - Auto-discover models** (3 👍, 2 comments)
   - Feature request phổ biến: Tự động phát hiện models từ OpenAI-compatible gateways
   - Giảm công sức cấu hình thủ công

3. **#22201 - Per-auxiliary fallback** (1 👍, 3 comments)
   - Nhu cầu thực tế từ production deployments
   - Tăng resilience cho multi-provider setups

### **PRs có tác động lớn**

- **#30136 - Docker s6 init** - Cải thiện Docker image với s6 supervision
- **#29777 - External Kanban worker lanes** - Tích hợp Codex CLI, mở rộng khả năng orchestration
- **#29720 - Clawbus & MyBrandMetrics skills** - Thêm Google Workspace và YouTube skills

---

## 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng (P1-P2)**

| Issue | Mức độ | Trạng thái | Mô tả |
|-------|--------|-----------|-------|
| #30151 | P1 | 🔴 Open | Kanban cleanup xóa nhầm workspace |
| #30144 | P2 | 🔴 Open | DingTalk sampleFile trả về "robot not found" |
| #30152 | P2 | 🔴 Open | Gemini providers route nhầm qua OpenAI SDK |
| #30125 | P2 | 🟡 PR | Fallback system: base_url dedup, timeout exclusion |

### **Bugs đã được fix (PRs merged/closed)**

- **#30084** - TUI mouse tracking DEC mode presets (closed, salvaged to #26681)
- **#29892** - Email polling transient errors (closed, re-opened as #30146)
- **#30137** - Streamed response wrapping stability

### **Vấn đề hạ tầng**

- **#30155** - `--replace` flag kill nhầm sibling gateways khi dùng shared HERMES_HOME
- **#30161** - `hermes doctor` không nhận diện Chromium của agent-browser 0.26+
- **#30139** - PIL Image FD leaks, non-atomic file writes

---

## 💡 Yêu cầu tính năng

### **Tính năng được đề xuất nhiều**

1. **Rich Spreadsheet Skill** (#4438, 5 comments)
   - Abstraction layer cho Excel/CSV handling
   - Giảm phụ thuộc vào raw Python code

2. **Browser Use cloud agent-mode** (#22290)
   - Expose Browser Use's `/api/v3/run-task` endpoint
   - Giảm số lượng round-trips cho browser automation

3. **Auto-discover models** (#10011, 3 👍)
   - Tự động sync models từ OpenAI-compatible gateways
   - Đặc biệt hữu ích cho self-hosted deployments

### **Tính năng đang phát triển**

- **Parallel orchestration skill** (#30163) - Hướng dẫn agent decompose goals phức tạp
- **Reference images for generation** (#30148) - Style transfer cho image tools
- **External Kanban worker lanes** (#29777) - Tích hợp external code execution engines
- **Desktop app** (#20059) - Native Electron client

---

## 💬 Phản hồi người dùng

### **Pain points chính**

1. **Cấu hình phức tạp**
   - Người dùng phải manually list models trong config.yaml (#10011)
   - Dependency issues khó debug (#30149, #30157)

2. **Stability issues**
   - Data loss risk (#30151) - **Cực kỳ nghiêm trọng**
   - Telegram polling instability (#30158)
   - Email adapter transient errors (#29892)

3. **Multi-provider complexity**
   - Fallback chain không hoạt động đúng với endpoint overrides (#30160)
   - Gemini providers route nhầm (#30152)

### **Điểm tích cực**

- Cộng đồng đánh giá cao tốc độ phản hồi của maintainers
- Nhiều PRs được tạo trong ngày để fix reported issues
- Documentation và error messages đang được cải thiện (#30157)

---

## 📋 Backlog & Roadmap

### **Ưu tiên ngắn hạn (Tuần tới)**

1. **Hotfix #30151** - Data loss bug (P1)
2. **Merge stability PRs** - Telegram polling, email adapter, fallback system
3. **Review desktop app** (#20059) - Có thể là release lớn

### **Ưu tiên trung hạn (Tháng tới)**

1. **Auto-discovery features** - Models, plugins, skills
2. **Enhanced browser automation** - Browser Use cloud integration
3. **Rich data handling** - Spreadsheet skill, structured data tools

### **Xu hướng dài hạn**

- **Multi-agent orchestration** - External worker lanes, parallel execution
- **Enterprise features** - OAuth login (#30156), advanced auth
- **Platform expansion** - DingTalk fixes, more messaging platforms
- **Developer tooling** - Better diagnostics, testing infrastructure (#30136)

---

## 🎯 Kết luận

Hermes-Agent đang trong giai đoạn **maturation** với focus vào **stability** và **extensibility**. Dự án có velocity cao (30 PRs/ngày) nhưng cần ưu tiên xử lý **data loss bug** (#30151) trước khi tiếp tục thêm features. Cộng đồng đang tích cực đóng góp, đặc biệt trong lĩnh vực **multi-provider support** và **platform integrations**.

**Rủi ro cần theo dõi**: Data integrity issues, multi-provider complexity, dependency management.

**Cơ hội**: Desktop app có thể mở rộng user base đáng kể, external worker lanes tạo ecosystem mở.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*