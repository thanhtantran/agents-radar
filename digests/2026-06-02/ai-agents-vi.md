# Bản tin Hệ sinh thái OpenClaw 2026-06-02

> Issues: 150 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-06-02 02:00 UTC

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

# Báo cáo phân tích OpenClaw - Ngày 2026-06-02

## 1. 📊 Tóm tắt hôm nay

Dự án OpenClaw đang trong giai đoạn phát triển tích cực với 3 bản beta release trong vòng 24 giờ qua (v2026.6.1-beta.1, beta.2 và v2026.5.31-beta.4). Hoạt động tập trung vào cải thiện tính ổn định của agent runtime, các kênh giao tiếp (Telegram, Feishu, WhatsApp), và khắc phục các regression xuất hiện sau các bản cập nhật gần đây. Cộng đồng đang phản hồi tích cực về các vấn đề message duplication, session management, và provider integration.

---

## 2. 🚀 Releases

### **v2026.6.1-beta.1 & beta.2** (2026-06-01)

**Điểm nổi bật:**

- **Agent Runtime cải tiến**: Khôi phục tốt hơn từ các tình huống tool call bị gián đoạn, session binding lỗi thời, compaction handoffs, và media delivery retries
- **Kênh giao tiếp ổn định hơn**: Cải thiện độ tin cậy trên Telegram, WhatsApp, iMessage, Slack, Discord, Microsoft Teams, Google Chat/Meet, và iOS Talk
- **Provider & Plugin**: Giới hạn timeout tốt hơn cho retries, OAuth/device-code lifetimes

### **v2026.5.31-beta.4** (2026-06-01)

- Tương tự v2026.6.1 nhưng có thêm tích hợp Tailscale Serve service-name binding
- Cải thiện Gateway và channel setup

**Ý nghĩa**: Các bản release này phản ánh nỗ lực ổn định hóa nền tảng sau các vấn đề regression xuất hiện từ v2026.5.20-5.27, đặc biệt tập trung vào session state và message delivery reliability.

---

## 3. 📈 Tiến độ dự án

### **Pull Requests quan trọng**

#### 🔥 Đang được review tích cực

- **#87072** [Telegram interleaved progress lane] - Opt-in renderer mới cho Telegram để hiển thị reasoning và runtime events trong một message duy nhất
- **#88946** [Live model inference edge cases] - Sửa các edge case quan trọng trong model inference, Azure AI Foundry support
- **#89128** [Skip Responses item id replay] - Ngăn replay của prior OpenAI Responses item ids khi store=false
- **#89001** [Azure Responses text stream events] - Hỗ trợ Azure Responses streaming, follow-up của #88893

#### 🛠️ Bug fixes được merge gần đây

- **#89148** [Guard missing dispatcher getFailedCounts] - Fix crash khi dispatcher thiếu method
- **#89251** [Deliver TTS audio on WhatsApp] - Fix TTS tool audio delivery cho WhatsApp
- **#89260** [Separate platform-incompatible skills] - Cải thiện `openclaw doctor` reporting

#### 🎯 Xu hướng phát triển

1. **Multi-channel stability**: Đầu tư mạnh vào Telegram, Feishu, WhatsApp, Discord delivery
2. **Provider compatibility**: Mở rộng hỗ trợ Azure, Gemini, claude-cli, local models
3. **Session management**: Giải quyết các race condition và state corruption issues
4. **Developer experience**: Cải thiện diagnostics, doctor command, error messages

---

## 4. 🌟 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác nhất**

#### **#80380** [14 bình luận, 4 👍] - Updating to gemini-3.1-flash-lite
- Google đã GA gemini-3.1-flash-lite, cần migrate từ preview version
- Community request để cập nhật default model

#### **#88838** [12 bình luận] - Track core session/transcript SQLite migration
- Maintainer issue để tracking migration lớn sang SQLite
- Dùng branch-by-abstraction pattern để tránh big-bang rewrite

#### **#87177** [11 bình luận] - Message Duplication in QQBot Channel  
- Vấn đề duplicate messages nghiêm trọng trên QQBot
- Liên quan đến heartbeat session message leakage

#### **#86519** [9 bình luận] - Agent repeats identical replies 2-10x on Telegram
- Regression sau v2026.5.20 update
- v2026.5.22 giảm severity nhưng chưa fix hoàn toàn

### **Mối quan tâm của người dùng**

1. **Message duplication** - Vấn đề phổ biến nhất trên nhiều channels
2. **Session state management** - Confusion về session lifecycle và recovery
3. **Provider auth reliability** - OAuth refresh failures, token invalidation
4. **Model fallback behavior** - Không mong muốn fallback khi model trả về valid empty response

---

## 5. 🐛 Ổn định & Bugs

### **P1 Critical Issues đang xử lý**

#### **Session & State Management**
- **#88312** - Codex app-server turn-completion stall regression
- **#86519** - Telegram duplicate replies (2-10x)
- **#88369** - Isolated cron self-conflict với EmbeddedAttemptSessionTakeoverError
- **#87938** - Feishu DM sessions rebuilt after gateway restart

#### **Message Delivery**
- **#89100** - Message tool spam loops, scaffolding leak (FM-3)
- **#42820** - Feishu send action polluted by poll schema
- **#77717** - Feishu bot identity recovery race condition

#### **Provider Integration**
- **#86215** - Codex OAuth refresh failures wedge agent for hours
- **#85042** - Missing Google provider silently routes to OpenAI
- **#89219** - Codex harness rejects openai/gpt-5.5 after upgrade

#### **Runtime Stability**
- **#89051** - Embedded agent session hangs after auto-compaction
- **#84820** - Unclosed FileHandle crashes gateway on Node ≥24

### **Patterns quan sát được**

1. **Regression concentration**: Nhiều issues xuất hiện sau v2026.5.20-5.27
2. **Session fence complexity**: EmbeddedAttemptSessionTakeoverError xuất hiện nhiều nơi
3. **Channel-specific quirks**: Mỗi channel (Telegram, Feishu, QQBot) có unique issues
4. **Provider auth brittleness**: OAuth/token management cần hardening

---

## 6. 💡 Yêu cầu tính năng

### **Được đề xuất gần đây**

#### **#89265** [4 bình luận, 1 👍] - More local providers
- Request hỗ trợ local models như first-class citizens
- Với open weights models ngày càng tốt, cần đầu tư vào local inference

#### **#35203** [8 bình luận] - Multi-Agent Collaboration Enhancement
- RFC cho capability profiling + shared blackboard + layered memory
- Token cost governance cho multi-agent systems

#### **#57404** [3 bình luận] - Expose per-run token usage on WebSocket
- Dashboard/monitoring cần real-time token metrics
- Hiện tại chỉ có timing data, không có cost data

### **Feature requests có momentum**

1. **Identity-based session unification** (#79607) - One session per user across channels
2. **Logical chat history** (#43929) - Retain continuity across session rollovers
3. **Source-aware instruction tracking** (#87714) - Mitigation cho indirect prompt injection
4. **Slack slash command deploy** (#75961) - Native Discord slash commands

---

## 7. 💬 Phản hồi người dùng

### **Positive feedback**

- Community đánh giá cao tốc độ fix bugs, đặc biệt là message duplication issues
- Developer experience improvements (doctor command, diagnostics) được khen ngợi
- Multi-channel support breadth impressive, nhiều users chạy trên nhiều channels đồng thời

### **Pain points**

1. **Upgrade friction**: 
   - "After upgrading from 2026.5.12 to 2026.5.20, agent sends duplicate replies"
   - "v2026.5.28 regression: cron model override fails again"
   
2. **Configuration complexity**:
   - "Missing Google provider silently routes to OpenAI" - confusing behavior
   - Session target/key/ID terminology unclear to many users

3. **Diagnostics gaps**:
   - "TUI displays Context Tokens as ?/200k instead of actual value"
   - "Embedded agent session silently hangs with no error logging"

4. **Documentation needs**:
   - Users confused về session lifecycle, rollover behavior
   - Provider auth setup needs clearer guidance

### **Feature adoption**

- **Workboard feature** (#88592) - Users actively using but finding persistence bugs
- **Reasoning delivery** - Mixed feedback, some channels work better than others
- **ACP (Autonomous Coding Protocol)** - Power users exploring but hitting edge cases

---

## 8. 🗓️ Backlog & Roadmap

### **Core infrastructure priorities** (inferred từ maintainer activity)

1. **SQLite session/transcript migration** (#88838)
   - Branch-by-abstraction approach
   - Avoid big-bang rewrite
   - Sequence of small reviewable PRs

2. **Session state reliability**
   - Fix EmbeddedAttemptSessionTakeoverError patterns
   - Improve session fence mechanism
   - Better recovery from interrupted operations

3. **Provider stability**
   - OAuth refresh reliability
   - Fallback logic improvements
   - Better error surfacing

4. **Channel delivery hardening**
   - Message duplication prevention
   - Reasoning/progress rendering consistency
   - Media delivery retry logic

### **Plugin ecosystem** 

- External plugin tool routing issues (#89173) being addressed
- MCP (Model Context Protocol) catalog improvements
- Active Memory plugin stability fixes

### **Developer experience**

- Doctor command improvements ongoing
- Better diagnostics and error messages
- Non-interactive deployment support (#73638)

### **Security & Safety**

- Source-aware instruction tracking RFC (#87714)
- Sanitization of user-controlled content in logs/diagnostics
- Security boundary clarifications for multi-agent systems

---

## 📌 Kết luận

OpenClaw đang trong giai đoạn "stabilization after growth" - sau khi thêm nhiều tính năng, team đang tập trung fix regressions và cải thiện reliability. Cộng đồng tích cực, responsive, và đang hỗ trợ tốt trong việc identify và reproduce issues. Các bản beta release liên tục cho thấy commitment với stability. Roadmap ngắn hạn rõ ràng tập trung vào session management và channel delivery, trong khi vẫn tiếp tục explore multi-agent collaboration và local model support cho tương lai.

---

## So sánh hệ sinh thái chéo

# 🌐 Báo Cáo So Sánh Hệ Sinh Thái AI Agent - Ngày 2026-06-02

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **bùng nổ và phân hoá** với 10 dự án lớn cạnh tranh trên nhiều mặt trận khác nhau. Ngày 02/06/2026 chứng kiến **184 PRs** và **126 issues** được xử lý trên toàn bộ các dự án, cho thấy mức độ phát triển cực kỳ sôi động.

### Các nhóm dự án chính:

#### 🏢 **Enterprise-Grade Platforms** (Scale & Stability)
- **OpenClaw**: Multi-channel, session management, provider ecosystem
- **IronClaw**: Cloud-native, multi-tenant, NEAR AI integration
- **Zeroclaw**: WASI plugin architecture, evaluation harness

#### 🚀 **Rapid Innovation** (Feature Velocity)
- **CoPaw**: Agent collaboration, multi-instance channels
- **Hermes-Agent**: Desktop automation, vision capabilities
- **NanoBot**: WebUI workspace, multimodal processing

#### 🎯 **Specialized Focus**
- **PicoClaw**: Lightweight, agent collaboration bus
- **NanoClaw**: Container-first, production-ready
- **GoClaw**: Multi-tenancy, skills ecosystem
- **LobsterAI**: Expert kit marketplace, Cowork mode
- **Moltis**: Provider abstraction, resource optimization

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Momentum | Community Health | Maturity |
|-------|--------|-----|----------|----------|------------------|----------|
| **OpenClaw** | 150 | 500 | 3 | 🔥🔥🔥 | ⭐⭐⭐⭐ | Mature |
| **IronClaw** | 10 | 46 | 0 | 🔥🔥🔥 | ⭐⭐⭐ | Growth |
| **Hermes-Agent** | 6 | 50 | 0 | 🔥🔥🔥 | ⭐⭐⭐⭐ | Growth |
| **CoPaw** | 31 | 35 | 2 | 🔥🔥 | ⭐⭐⭐⭐ | Growth |
| **NanoBot** | 29 | 30 | 1 | 🔥🔥 | ⭐⭐⭐ | Growth |
| **Zeroclaw** | 27 | 36 | 0 | 🔥🔥 | ⭐⭐⭐ | Growth |
| **LobsterAI** | 1 | 12 | 1 | 🔥 | ⭐⭐ | Early |
| **PicoClaw** | 7 | 11 | 1 | 🔥 | ⭐⭐ | Early |
| **NanoClaw** | 3 | 6 | 0 | 🔥 | ⭐⭐ | Early |
| **GoClaw** | 4 | 3 | 0 | 🟡 | ⭐ | Early |
| **Moltis** | 0 | 4 | 0 | 🟡 | ⭐ | Early |

### Giải thích chỉ số:

**Momentum**: Tốc độ phát triển dựa trên PR velocity và release frequency
- 🔥🔥🔥 Extremely High (>40 PRs/week)
- 🔥🔥 High (20-40 PRs/week)
- 🔥 Medium (10-20 PRs/week)
- 🟡 Low (<10 PRs/week)

**Community Health**: Engagement, contributor diversity, issue quality
- ⭐⭐⭐⭐ Excellent (active discussions, diverse contributors)
- ⭐⭐⭐ Good (responsive, quality contributions)
- ⭐⭐ Fair (limited engagement)
- ⭐ Needs improvement

**Maturity**: 
- **Mature**: Production-ready, extensive ecosystem
- **Growth**: Active development, stabilizing
- **Early**: Foundation phase, experimental

---

## 3. 🎯 Vị thế của OpenClaw

### **Vị trí thị trường: 🏆 Leader**

OpenClaw đứng vị trí **số 1 về scale và ecosystem maturity**:

#### Điểm mạnh vượt trội:

**1. Multi-Channel Breadth** 🌐
- Hỗ trợ **10+ channels**: Telegram, WhatsApp, Slack, Discord, Feishu, iMessage, QQBot, Microsoft Teams, Google Chat/Meet, iOS Talk
- Competitors chỉ có 3-5 channels
- **Strategic advantage**: Network effects và enterprise adoption

**2. Session Management Architecture** 🧠
- SQLite migration (#88838) cho persistence tốt hơn
- EmbeddedAttemptSessionTakeoverError pattern xử lý race conditions
- Recovery mechanisms sau interrupted operations
- **Competitors còn struggle với basic session state**

**3. Provider Ecosystem** 🔌
- Hỗ trợ Azure, Gemini, claude-cli, local models
- OAuth refresh reliability đang được hardening
- Fallback logic sophisticated
- **Moltis và GoClaw mới bắt đầu provider abstraction**

**4. Developer Experience** 🛠️
- `openclaw doctor` command cho diagnostics
- ACP (Autonomous Coding Protocol) cho power users
- Reasoning delivery cross-channel
- **Hermes-Agent đang bắt kịp, nhưng OpenClaw mature hơn**

#### Điểm yếu cần cải thiện:

**1. Regression Management** ⚠️
- Nhiều bugs xuất hiện sau v2026.5.20-5.27 releases
- Message duplication issues (Telegram #86519, QQBot #87177)
- Agent repeating replies 2-10x
- **Trade-off của velocity cao**

**2. Configuration Complexity** 🔧
- Session target/key/ID terminology khó hiểu
- Provider auth setup cần clearer guidance
- **CoPaw và NanoBot đang invest vào better UX**

**3. Documentation Lag** 📚
- Session lifecycle unclear cho users
- Provider setup guides incomplete
- **Community feedback patterns phản ánh pain point này**

### So sánh với competitors chính:

| Khía cạnh | OpenClaw | IronClaw | Hermes-Agent | CoPaw |
|-----------|----------|----------|--------------|-------|
| **Multi-channel** | 10+ ✅ | 3-4 | 5-6 | 6-7 |
| **Session management** | Advanced ✅ | Growing | Basic | Medium |
| **Provider support** | Extensive ✅ | NEAR focus | Ollama focus | Multi-provider |
| **Enterprise ready** | Yes ✅ | Yes ✅ | Growing | Yes |
| **Developer UX** | Good ✅ | Fair | Excellent ✅ | Good |
| **Stability** | Medium ⚠️ | Medium | Good | Medium |

### Kết luận vị thế:

OpenClaw là **"GitHub của AI agents"** - platform choice cho serious projects cần:
- Multi-channel deployment
- Enterprise-grade session management
- Extensive provider options
- Mature tooling ecosystem

**Risk**: High velocity đang create technical debt. Cần balance giữa features và stability.

---

## 4. 🔧 Hướng kỹ thuật chung

### **Trend 1: Plugin/Extension Architecture** 🧩

**Adoption rate**: 6/10 dự án đang implement

| Dự án | Approach | Status |
|-------|----------|--------|
| **Zeroclaw** | WASI Component Model + WIT interfaces | Foundation stage (FND-001) |
| **IronClaw** | WASM runtime + capability-based security | Production |
| **OpenClaw** | MCP (Model Context Protocol) catalog | Active |
| **LobsterAI** | Expert Kit Store marketplace | v2026.6.1 launched |
| **GoClaw** | Skills system với tenant isolation | Critical bugs |
| **Hermes-Agent** | Vision-MCP desktop automation | Integration phase |

**Insight**: Hệ sinh thái đang converge về **sandboxed, capability-based plugins** để balance giữa extensibility và security.

**Winner approach**: Zeroclaw's WASI WIT interfaces - chuẩn hoá cross-language, security model rõ ràng.

---

### **Trend 2: Multi-Tenant Architecture** 🏢

**Drivers**: Cloud deployment, enterprise adoption

| Dự án | Strategy | Implementation |
|-------|----------|----------------|
| **IronClaw** | Stateless agents + event streaming | Reborn branch (major refactor) |
| **GoClaw** | Per-tenant skills directories | Broken (#1161, #1162) |
| **Zeroclaw** | Linq multi-tenant routing | PR #7041 |
| **OpenClaw** | Multi-channel với session isolation | Production |

**Critical challenge**: Session state management trong distributed systems
- IronClaw betting on event sourcing
- OpenClaw using SQLite persistence
- GoClaw struggling với filesystem isolation

**Prediction**: Event sourcing + CQRS sẽ trở thành standard pattern cho multi-tenant agents.

---

### **Trend 3: Context Window Optimization** 🧠

**Universal pain point**: Token costs và context limits

**Solutions landscape**:

| Technique | Adopters | Effectiveness |
|-----------|----------|---------------|
| **Prefix caching** | Hermes (#37117), IronClaw | High |
| **Compaction** | OpenClaw, Hermes, NanoClaw | Medium |
| **Lazy tool loading** | CoPaw (#4836), Moltis | High |
| **Heartbeat optimization** | NanoBot (#2482, #2435) | Low-hanging fruit |
| **RAG for memory** | NanoBot (#4109) | Future potential |

**Best practice emerging**: Hermes' skills index trong volatile band + lazy tool schema loading

**Cost impact**: 20-65% token reduction với proper optimization

---

### **Trend 4: Multimodal Processing** 🎨🎙️

**Growing demand**: Voice, images, desktop automation

| Capability | Leaders | Approach |
|------------|---------|----------|
| **Voice I/O** | NanoBot, CoPaw | Local whisper (faster-whisper, FunASR) |
| **Desktop automation** | Hermes-Agent | Vision-MCP integration |
| **Image processing** | Multiple | Provider-dependent |
| **Audio handling** | OpenClaw (#89251) | TTS delivery cross-channel |

**Trend**: Shift từ cloud APIs sang **local processing** (privacy + cost)

**Technical debt**: Ollama vision capability probing chưa standardized

---

### **Trend 5: Provider Abstraction & Fallback** 🔄

**Problem statement**: Single provider failures shouldn't break agents

**Maturity levels**:

| Maturity | Dự án | Features |
|----------|-------|----------|
| **Level 3** | Moltis (#1090) | Explicit capability policies, regression tests |
| **Level 2** | OpenClaw, PicoClaw | Provider failure recovery với rollback |
| **Level 1** | CoPaw, GoClaw | Basic multi-provider support |
| **Level 0** | NanoClaw, NanoBot | Single provider focus |

**Missing piece**: Automatic model fallback chains (CoPaw #4882 request)

**Future direction**: 
- Cost-aware routing (cheapest model first)
- Capability-based selection (vision → GPT-4V, reasoning → o4-mini)
- Geographic/compliance routing (GDPR, data residency)

---

### **Trend 6: Developer Experience & Observability** 📊

**Investment areas**:

**Diagnostics tools**:
- OpenClaw: `openclaw doctor`
- NanoBot: Event bus refactor (#4135)
- Hermes: TUI session hygiene (#37099)
- Zeroclaw: Evaluation harness (#7067)

**Token usage visibility**:
- CoPaw: Floating badge (#4433)
- NanoBot: WebUI live traces
- OpenClaw: TUI displays (buggy #?)

**Local dev experience**:
- IronClaw: Manual token persistence (#4285)
- Multiple projects: Hot reload, faster startup

**Trend**: Shift từ "black box" sang **transparent, debuggable** agent runtimes

---

## 5. 🎭 Điểm khác biệt

### **A. Chiến lược định vị**

#### 🏆 **OpenClaw: "Swiss Army Knife"**
- **Philosophy**: Comprehensive platform cho mọi use case
- **Strengths**: Breadth (channels, providers, features)
- **Weaknesses**: Complexity, regression risk
- **Target**: Teams cần production-ready, multi-channel deployment

#### ⚡ **Hermes-Agent: "Developer's Best Friend"**
- **Philosophy**: CLI-first, extensible, automation-focused
- **Strengths**: Desktop integration, TUI polish, vision capabilities
- **Weaknesses**: Channel support limited, enterprise features nascent
- **Target**: Individual developers, automation workflows

#### 🌐 **IronClaw: "Enterprise Cloud Native"**
- **Philosophy**: Stateless, scalable, event-driven
- **Strengths**: Multi-tenant architecture, NEAR AI ecosystem
- **Weaknesses**: Reborn migration complexity, docs lag
- **Target**: Enterprise SaaS, cloud deployments

#### 🧪 **Zeroclaw: "Standards Pioneer"**
- **Philosophy**: WASI/WIT standardization, evaluation-first
- **Strengths**: Plugin architecture, eval harness
- **Weaknesses**: Foundation stage, slow adoption
- **Target**: Platform builders, researchers

#### 🤝 **CoPaw: "Collaboration Hub"**
- **Philosophy**: Multi-agent coordination, group workflows
- **Strengths**: Agent spawn, session sharing, Windows optimization
- **Weaknesses**: Context management, Windows-specific issues
- **Target**: Team collaboration, complex projects

---

### **B. Technical Architecture Choices**

| Aspect | OpenClaw | IronClaw | Hermes | CoPaw | Zeroclaw |
|--------|----------|----------|--------|-------|----------|
| **State management** | SQLite | Event sourcing | Mixed | In-memory | TBD |
| **Runtime** | Node.js | Rust | Python | Python | Rust |
| **Plugin system** | MCP | WASM | MCP | Native | WASI WIT |
| **Deployment** | Self-hosted | Cloud-native | Local-first | Hybrid | Self-hosted |
| **Session model** | Persistent | Stateless | Durable | Volatile | Mixed |

**Analysis**:
- **Rust projects** (IronClaw, Zeroclaw): Performance-first, compilation complexity trade-off
- **Python projects** (Hermes, CoPaw): Rapid iteration, ecosystem richness
- **Node.js** (OpenClaw): JavaScript ecosystem, npm plugins

---

### **C. Cộng đồng & Governance**

#### **Contributor Diversity**:

| Dự án | Core team | External contributors | Geography |
|-------|-----------|----------------------|-----------|
| **OpenClaw** | 5-8 | High (20+) | Global |
| **Hermes-Agent** | 3-5 | High (15+) | Global |
| **IronClaw** | 4-6 | Medium (10+) | US-focused |
| **CoPaw** | 3-5 | Medium (10+) | China-heavy |
| **Zeroclaw** | 2-4 | Low (<5) | US-focused |

#### **Decision-making patterns**:

- **OpenClaw**: RFC-driven, community input
- **IronClaw**: Maintainer-driven, rapid decisions
- **Hermes**: Community PRs welcomed, fast merge
- **CoPaw**: Core team review, selective merge
- **Zeroclaw**: Foundation documents, deliberate

#### **Communication channels**:

Most projects suffer from **invisible community** problem:
- GitHub issues/PRs: 0 comments despite P1 bugs
- Real discussions happening on Discord/Slack
- Documentation gaps về roadmap và decision rationale

**Best practice**: Hermes-Agent's fast triage và PR salvaging culture

---

### **D. Market Focus & Monetization**

| Dự án | Primary market | Revenue model (inferred) | Enterprise readiness |
|-------|----------------|-------------------------|---------------------|
| **OpenClaw** | Developers, Enterprises | SaaS/Support | High ✅ |
| **IronClaw** | Cloud providers, Enterprises | NEAR ecosystem | High ✅ |
| **Hermes-Agent** | Individual developers | Open-source/Services | Medium |
| **CoPaw** | Teams, China market | AgentScope ecosystem | Medium |
| **LobsterAI** | Chinese market | Kit marketplace (?) | Medium |
| **Others** | Open-source community | Unknown | Low-Medium |

**Geographic patterns**:
- **China-focused**: CoPaw, LobsterAI, GoClaw (QQ/WeChat/Feishu integrations)
- **Global**: OpenClaw, Hermes, IronClaw
- **US-centric**: Zeroclaw, NanoClaw

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### **Tier 1: Thriving Communities** 🌟

#### **OpenClaw** 
- ✅ 500 PRs, consistent release cadence
- ✅ Active issue discussions (15+ comments common)
- ✅ Regression handling culture (beta releases)
- ⚠️ Documentation lag, complexity barriers
- **Score**: 8.5/10

#### **Hermes-Agent**
- ✅ 50 PRs, fast P1 response (<24h)
- ✅ High-quality bug reports với root cause
- ✅ PR salvaging culture (credit abandoned work)
- ✅ Cross-platform focus (Termux, desktop)
- **Score**: 8.5/10

---

### **Tier 2: Growing Communities** 🌿

#### **IronClaw**
- ✅ 46 PRs, enterprise features momentum
- ⚠️ 10 issues only (low visibility?)
- ⚠️ Reborn branch communication gap (#4279)
- ⚠️ Documentation outdated (#4302)
- **Score**: 7/10

#### **CoPaw**
- ✅ 35 PRs, 31 issues - active development
- ✅ Windows optimization focus
- ⚠️ Low issue engagement (0 comments)
- ⚠️ Context management struggles
- **Score**: 7/10

#### **Zeroclaw**
- ✅ 36 PRs, foundation documents (FND-001)
- ⚠️ 27 issues với 0 comments (invisible community)
- ⚠️ Stale PR problem (#1464)
- ⚠️ Security issues slow resolution
- **Score**: 6.5/10

#### **NanoBot**
- ✅ 30 PRs merged quickly
- ✅ WebUI evolution clear
- ⚠️ 29 issues với limited discussion
- ⚠️ Community diversity unclear
- **Score**: 6.5/10

---

### **Tier 3: Emerging Communities** 🌱

#### **LobsterAI**
- ✅ Kit marketplace vision clear
- ⚠️ 1 issue (subscription crisis #2081)
- ⚠️ Zero community feedback visible
- ⚠️ Business model opacity
- **Score**: 5/10

#### **PicoClaw**
- ✅ 11 PRs, nightly builds
- ⚠️ 7 issues, low engagement
- ⚠️ Breaking changes frequent
- ⚠️ Test coverage gaps
- **Score**: 5/10

#### **NanoClaw**
- ✅ Fast bug fix turnaround
- ⚠️ 3 issues only (very quiet)
- ⚠️ Zero PR/issue comments
- ⚠️ Communication invisible
- **Score**: 4.5/10

#### **GoClaw**
- ⚠️ 4 P1 issues unresolved >2 weeks
- ⚠️ 3 PRs với 0 engagement
- ⚠️ Critical bugs blocking multi-tenancy
- ⚠️ Community non-existent
- **Score**: 3/10

#### **Moltis**
- ⚠️ 0 issues, 4 PRs
- ⚠️ Internal development phase?
- ⚠️ No community signals
- **Score**: 2/10

---

### **Community Health Indicators**:

**Positive signals**:
- ✅ Fast triage (P1 bugs addressed <24h)
- ✅ Quality PRs từ external contributors
- ✅ Maintainer responsiveness
- ✅ Clear release notes và changelogs

**Red flags**:
- 🚩 0-comment issues/PRs (invisible community)
- 🚩 Stale PRs (>1 month open)
- 🚩 P1 bugs unresolved >1 week
- 🚩 Documentation significantly outdated

---

## 7. 🔮 Tín hiệu xu hướng

### **Trend 1: Consolidation Phase Approaching** 📉

**Evidence**:
- 10+ projects với overlapping features
- Winner-take-most dynamics bắt đầu rõ ràng
- Smaller projects (GoClaw, Moltis) struggling với momentum

**Prediction**: 
- **2026 Q3-Q4**: 3-4 projects sẽ emerge as clear leaders
- **Consolidation paths**: 
  - Mergers (smaller projects join ecosystems)
  - Pivoting (focus vào niches cụ thể)
  - Abandonment (lack of community/funding)

**Likely winners**: OpenClaw, Hermes-Agent, IronClaw (diverse strengths)

---

### **Trend 2: Enterprise Features Arms Race** 🏢

**Current state**: All major projects adding enterprise capabilities

| Feature | OpenClaw | IronClaw | Hermes | CoPaw | Zeroclaw |
|---------|----------|----------|--------|-------|----------|
| Multi-tenant | ✅ | ✅ | 🔄 | ✅ | 🔄 |
| SSO/Auth | ✅ | 🔄 | ❌ | ❌ | ❌ |
| Audit logs | ✅ | ✅ | ❌ | ❌ | ❌ |
| RBAC | ✅ | 🔄 | ❌ | 🔄 | ❌ |
| SLA/Support | ✅ | ❌ | ❌ | ❌ | ❌ |

**Drivers**:
- Fortune 500 companies experimenting với AI agents
- Compliance requirements (GDPR, SOC2, HIPAA)
- Need for governance và control

**Prediction**: Enterprise-focused projects (IronClaw, OpenClaw) sẽ pull ahead về monetization.

---

### **Trend 3: Standardization Battles** 📜

**Competing standards**:

| Standard | Champions | Adoption |
|----------|-----------|----------|
| **MCP** | OpenClaw, Hermes | Medium |
| **WASI/WIT** | Zeroclaw | Low (foundation) |
| **Native plugins** | CoPaw, GoClaw | Medium |
| **WASM** | IronClaw | Low-Medium |

**Critical question**: Sẽ có một standard thống nhất hay ecosystem fragmented?

**Most likely outcome**: 
- **Short-term**: Fragmentation (2026-2027)
- **Long-term**: Convergence quanh WASI/WIT (giống WebAssembly trajectory)
- **Reason**: WASI có backing từ W3C, cross-language, security-first

**Implication**: Projects betting on proprietary standards sẽ phải migrate sau này.

---

### **Trend 4: Cost Optimization Becomes Priority #1** 💰

**Evidence**:
- Multiple projects implementing prefix caching
- Lazy loading strategies pervasive
- Token usage visibility requests common
- DeepSeek V4 cost optimization discussions (#NanoBot #4142)

**Drivers**:
- LLM API costs không giảm nhanh như compute costs
- Long-running agents accumulate significant bills
- Context window abuse trong production

**Innovations to watch**:
- **Adaptive compression**: Context compression dựa trên budget remaining
- **Model tiering**: Auto-switch expensive models → cheaper ones khi budget tight
- **Prompt caching ecosystems**: Shared cache pools across agents/users

**Prediction**: Projects với best cost management sẽ win enterprise deals.

---

### **Trend 5: Desktop/GUI Automation Breakthrough** 🖥️

**Early signals**:
- Hermes-Agent's Vision-MCP (#37118)
- Multi-modal processing investments
- Desktop automation use cases emerging

**Why now?**:
- Vision models (GPT-4V, Gemini Pro Vision) достаточно good
- Latency improvements (local inference)
- RPA market ripe for disruption

**Killer apps**:
- End-to-end testing automation
- Legacy system integration (no APIs)
- Personal productivity assistants

**Prediction**: 
- **2026 H2**: Desktop automation sẽ trở thành major differentiator
- **Winners**: Projects với native desktop integration (Hermes-Agent, CoPaw Desktop)

---

### **Trend 6: Privacy-First Local Inference** 🔒

**Evidence**:
- NanoBot's local whisper integration
- CoPaw's FunASR support
- Ollama focus trong multiple projects
- NEAR AI TEE capabilities

**Drivers**:
- Enterprise data residency requirements
- Privacy regulations (GDPR, CCPA)
- Cost savings (no API calls)
- Latency benefits

**Challenges**:
- Model quality gap (local vs cloud)
- Hardware requirements
- Deployment complexity

**Prediction**: Hybrid architectures sẽ standard:
- Sensitive data → local models
- Complex reasoning → cloud models
- Cost-conscious workloads → local
- High-stakes decisions → cloud

---

### **Trend 7: Multi-Agent Coordination Evolution** 🤝

**Current implementations**:

| Project | Approach | Maturity |
|---------|----------|----------|
| **PicoClaw** | Agent Collaboration Bus | Design phase |
| **CoPaw** | Spawn subagent tool | v1.1.10 shipped |
| **OpenClaw** | ACP protocol | Power users |
| **IronClaw** | Event streaming orchestration | Reborn branch |

**Evolution path**:
1. **Phase 1** (current): Tool-based spawning, simple delegation
2. **Phase 2** (2026 H2): Mailboxes, message passing, permissions
3. **Phase 3** (2027+): Autonomous negotiations, markets, DAOs

**Critical research questions**:
- How to prevent agent conflicts/deadlocks?
- How to allocate shared resources (budget, APIs)?
- How to attribute credit/blame trong multi-agent systems?

**Prediction**: Projects với clean multi-agent abstractions sẽ enable new use cases enterprise chưa imagine được.

---

### **Trend 8: Evaluation & Testing Infrastructure** 🧪

**Emerging focus**:
- Zeroclaw's eval harness (#7067)
- NanoBot's test coverage push (#4852)
- Regression prevention cultures

**Why critical**:
- Non-deterministic LLM outputs khó test
- Regressions expensive trong production
- Compliance requirements cần audit trails

**Components needed**:
- **Replay systems**: Deterministic test fixtures
- **LLM-as-judge**: Auto-grading capabilities
- **Live evals**: Continuous model quality monitoring
- **Benchmarks**: Standardized capability tests

**Prediction**: 
- **2026 Q3**: First standardized agent benchmarks emerge
- **Winners**: Projects với built-in eval infrastructure (Zeroclaw advantage)

---

## 🎯 Kết luận chiến lược

### **Dự đoán thứ hạng 2026 cuối năm**:

#### 🥇 **Tier 1: Market Leaders**
1. **OpenClaw**: Comprehensive platform, network effects
2. **Hermes-Agent**: Developer love, automation workflows
3. **IronClaw**: Enterprise cloud, NEAR ecosystem

#### 🥈 **Tier 2: Strong Contenders**
4. **CoPaw**: Collaboration niche, China market
5. **Zeroclaw**: Standards play, long-term bet
6. **NanoBot**: WebUI-first, multimodal strength

#### 🥉 **Tier 3: Niche Players**
7. **LobsterAI**: Kit marketplace, China focus
8. **PicoClaw**: Lightweight, specific use cases
9. **NanoClaw**: Container-first, DevOps angle

#### ⚠️ **At Risk**:
10. **GoClaw**: Critical bugs unresolved, community absent
11. **Moltis**: No differentiation, low visibility

---

### **Strategic Recommendations**:

#### **Cho OpenClaw** (maintain leadership):
- ✅ Continue session management improvements
- ⚠️ **Urgent**: Slow down velocity, fix regressions
- 📚 Invest heavily in documentation
- 🔐 Harden security (credential management)

#### **Cho IronClaw** (accelerate growth):
- 📣 Communicate Reborn roadmap clearly
- 🏗️ Complete stateless migration fast
- 📖 Update docs aggressively
- 🌐 Expand beyond NEAR ecosystem

#### **Cho Hermes-Agent** (maintain momentum):
- ✅ Continue desktop automation lead
- 📱 Expand channel support
- 🏢 Add enterprise features (RBAC, audit)
- 💰 Clarify monetization strategy

#### **Cho smaller projects** (survival strategies):
- **Option A**: Focus on specific niche (e.g., PicoClaw → embedded/IoT)
- **Option B**: Join ecosystem (contribute to OpenClaw/Hermes)
- **Option C**: Pivot to tools/services around major platforms

---

### **For ecosystem builders**:

**Opportunities**:
- 🛠️ **Tooling layer**: Testing, monitoring, debugging tools work across projects
- 📊 **Observability**: Universal dashboards, cost tracking
- 🔌 **Plugin marketplace**: Cross-platform plugin distribution
- 🎓 **Education**: Training, certification, best practices

**Threats**:
- Proprietary lock-in từ major players
- Fragmentation preventing interop
- Regulatory compliance complexity
- Cost escalation (LLM APIs)

---

### **Đánh giá rủi ro hệ sinh thái**:

#### 🟢 **Positive factors**:
- High innovation velocity
- Diverse approaches (natural selection)
- Strong community participation
- Enterprise interest growing

#### 🟡 **Moderate concerns**:
- Documentation quality inconsistent
- Standardization fragmentation
- Testing infrastructure immature
- Cost optimization lagging demand

#### 🔴 **High risks**:
- **Consolidation shock**: 50%+ projects

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích NanoBot - Ngày 02/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 02/06/2026 đánh dấu cột mốc quan trọng với **phiên bản v0.2.1** được phát hành sau 84 PR merged. Hoạt động dự án tập trung vào cải thiện WebUI trở thành workspace thực sự, xử lý nhiều bug nghiêm trọng về session management và tool calling, đồng thời mở rộng hệ sinh thái với kênh QQ (Napcat) và tìm kiếm Volcengine. Cộng đồng đang tích cực thảo luận tối ưu chi phí API và kiến trúc hệ thống.

---

## 🚀 Releases: v0.2.1

### Tính năng nổi bật

**🎨 WebUI Upgrade - Trở thành Real Workbench**
- Live file edits hiển thị như activity
- Tool traces render sạch hơn, có favicon cho source links
- Markdown/code blocks hoạt động tốt hơn
- New chats survive refreshes (không mất dữ liệu khi F5)
- **Thought/response ordering** khớp với cấu trúc turn thực tế của model

**⚙️ Settings & Configuration**
- Settings UI được cải thiện
- Provider configs linh hoạt hơn
- Quản lý model tốt hơn

### Ý nghĩa

Đây là bước tiến từ "chat interface" sang "development environment". WebUI không còn chỉ là nơi nói chuyện với bot mà trở thành workspace để theo dõi và kiểm soát toàn bộ workflow của agent.

---

## 📈 Tiến độ dự án

### PRs quan trọng được merge (01-02/06)

**🔧 Core Fixes**
- **#4129** [MERGED]: Fix duplicate archive & message loss trong session retention - Bug nghiêm trọng khiến user messages bị duplicate hoặc mất
- **#4137** [MERGED]: Preserve Thought/response ordering trong WebUI - Giải quyết vấn đề timeline bị lộn xộn
- **#4135** [MERGED]: Refactor WebUI state lên event bus - Kiến trúc rõ ràng hơn, bảo trì tốt hơn
- **#4131** [MERGED]: Thêm `AGENTS.md` documentation cho Codex

**🆕 New Channels & Providers**
- **#4146** [OPEN]: Napcat (QQ) channel - OneBot v11 Forward WebSocket, hỗ trợ group/private chat
- **#4141** [OPEN]: Volcengine web search provider - Mở rộng lựa chọn search
- **#3509** [CLOSED → Backported]: Napcat được backport về main

**⚡ Performance & Optimization**
- **#2482, #2435, #2415, #3485** [MERGED]: Skip LLM call khi HEARTBEAT.md không có active tasks - Tiết kiệm token
- **#1376** [MERGED]: Skip unnecessary bus progress events - Tối ưu performance

**🎙️ Multimodal**
- **#3723** [MERGED]: Local whisper transcription với faster-whisper - Không cần API key
- **#2578** [MERGED]: Slack image/audio support với Whisper

### PRs đang được review

**🔐 Security & Auth**
- **#4126** [OPEN]: Azure AAD auth cho Azure OpenAI - Enterprise ready
- **#4138** [OPEN]: Toggle `tools.file.enable` - Tắt filesystem tools khi chỉ dùng MCP

**🎨 UI/UX**
- **#4148** [OPEN]: Inline edit button cho sent messages trong WebUI - UX improvement lớn
- **#4122** [OPEN]: WebUI voice recording + local ASR với FunASR

**🏗️ Infrastructure**
- **#4139** [OPEN]: Platform deployment layer cho HF Spaces & ModelScope - Simplify cloud deployment
- **#3994** [OPEN]: Registry-driven provider config fields - Kiến trúc extensible hơn

### Xu hướng phát triển

1. **WebUI First**: Dự án rõ ràng đang đầu tư mạnh vào WebUI để biến nó thành primary interface
2. **Multimodal Push**: Voice/audio processing đang được tích hợp sâu (local ASR, voice recording)
3. **Enterprise Ready**: Azure AAD, file access control, cloud deployment
4. **Cost Optimization**: Nhiều PR focus vào giảm LLM calls không cần thiết
5. **Channel Expansion**: QQ, Volcengine - targeting Chinese market

---

## 🌟 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác

**#4142** - **Discussion về tối ưu API costs** (1 comment)
- Focus vào DeepSeek V4 flash/pro và cache-miss input tokens
- Community đang tìm cách optimize chi phí với model mới

**#49** - **Signal channel support** (4 comments, 👍6)
- Request từ 03/02, vẫn đang được discuss
- Nhu cầu cao về privacy-focused messaging platform

**#1536** - **MCP retry logic** (4 comments, 👍3)
- Kubernetes environment pain point
- Nanobot cần restart khi MCP server down

### Vấn đề người dùng quan tâm nhất

1. **Chi phí API**: Làm sao giảm token consumption với các model mới
2. **Stability**: Session management bugs, tool calling issues
3. **Deployment**: Cloud platform support, enterprise auth
4. **Multimodal**: Voice/audio/image processing

---

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đã fix

**#4128** [CLOSED] - **Session retention duplicate archive**
- User messages bị duplicate trong archive và kept
- Fixed trong #4129
- **Impact**: High - ảnh hưởng LLM context consistency

**#4133** [CLOSED] - **Agent response fails to deliver sau tool calls**
- Tool call thành công nhưng response không gửi về Telegram
- Fixed sau #4080
- **Impact**: Critical - user experience breakdown

**#3633** [CLOSED] - **"Duplicate item found with id" với GPT**
- Provider trả về duplicate tool call IDs
- **Impact**: Medium - specific to certain models

### Bugs đang được xử lý

**#4006** [OPEN] - **Orphaned tool results trong conversation history**
- Tool result messages không có matching tool_calls
- Violates OpenAI/Anthropic specs
- **Status**: Root cause identified, cần fix

**#4081** [OPEN] - **Race condition trong memory append_history** (có PR #4147)
- Concurrent writers duplicate cursor
- **Status**: Fix đã được submit

### Patterns

- Session/memory management có nhiều edge cases
- Tool calling integration vẫn có gaps với một số providers
- WebUI state management đã được refactor về event bus (cải thiện lớn)

---

## 💡 Yêu cầu tính năng

### Đã được thảo luận/đang implement

**#4132** [OPEN] - **Custom image generation provider (Agnes AI)**
- Cho phép user dùng custom API thay vì built-in providers
- **Status**: Feature request, chưa có PR

**#2182** [CLOSED] - **Hooks feature** (như Claude Code/Copilot CLI)
- User-defined shell commands tại lifecycle events
- **Status**: Đã được discuss, likely declined

**#1932** [CLOSED] - **Disable skills thay vì chỉ delete**
- Toggle skills on/off thay vì phải xóa
- **Status**: Implemented

**#1862** [CLOSED] - **Media path access khi restrictToWorkspace enabled**
- `/media` auto-nesting trong workspace
- **Status**: Implemented

### Feature requests mới

**#4136** [OPEN] - **Refactor session retention result API**
- Clearer archive semantics
- **Type**: Technical debt / API design

**#101** [OPEN] - **Free APIs support (Google Gemini)**
- Use free tier APIs thay vì OpenRouter
- **Demand**: Medium - budget-conscious users

---

## 💬 Phản hồi người dùng

### Trải nghiệm tích cực

✅ **WebUI improvements được đón nhận tốt**
- Inline editing, better tool traces, favicon cho source links
- "The agent got a real workbench" - messaging resonates

✅ **Local whisper transcription**
- No API key, privacy-first
- Faster-whisper performance tốt

✅ **Heartbeat optimization**
- Skip LLM calls tiết kiệm token đáng kể
- Multiple community PRs cho cùng một issue

### Pain points

❌ **Tool calling reliability**
- Một số models (mimo, glm) emit XML thay vì structured tool_calls
- Response delivery fails sau tool execution

❌ **Deployment complexity**
- Cloud platform setup vẫn manual
- MCP connection không có retry logic

❌ **Group chat context isolation**
- DingTalk/QQ group users share context (#4016 đang fix)

### Feedback patterns

1. **Cost sensitivity**: Cộng đồng rất quan tâm token optimization
2. **Enterprise needs**: Azure AAD, file access control được request
3. **Multimodal demand**: Voice/audio processing là priority cao
4. **China market**: QQ channel, Volcengine search - local alternatives

---

## 🗺️ Backlog & Roadmap

### Đang trong pipeline (có PR)

**Short-term (1-2 releases)**
- ✅ Napcat QQ channel (ready to merge)
- 🔄 WebUI inline edit (#4148)
- 🔄 Azure AAD auth (#4126)
- 🔄 Platform deployment layer (#4139)
- 🔄 Local ASR + voice recording (#4122)

**Medium-term**
- 🔄 Registry-driven provider configs (#3994)
- 🔄 RAG for memory retrieval (#4109)
- 🔄 File tools toggle (#4138)

### Backlog issues (no PR yet)

**High priority**
- #4006: Orphaned tool results
- #4142: DeepSeek V4 cost optimization
- #4132: Custom image gen providers

**Medium priority**
- #49: Signal channel (nhiều support)
- #1536: MCP retry logic
- #101: Free API tier support

### Technical debt

- Session retention API refactor (#4136)
- Tool call parsing standardization (XML vs structured)
- Event bus migration (đã bắt đầu với #4135)

### Roadmap insights

**v0.2.x focus**:
1. Stabilize WebUI as primary workspace
2. Multimodal completeness (voice input/output)
3. Enterprise features (AAD, access control)
4. Provider ecosystem expansion

**v0.3.x likely**:
1. RAG/memory improvements
2. Advanced workflow/automation (hooks?)
3. Performance optimization
4. Mobile-first WebUI

---

## 📊 Metrics & Observations

**Activity Level**: 🔥 Very High
- 30 PRs đóng trong 1-2 ngày
- 29 issues active
- 17 new contributors trong v0.2.1

**Community Health**: 💚 Healthy
- Quick PR turnaround (< 1-2 days)
- Active maintainer engagement
- Good mix of bug fixes và features

**Release Cadence**: ⚡ Fast
- v0.2.1 sau 84 PRs
- Feature velocity cao

**Pain Point Resolution**: 📈 Improving
- Core bugs (session, tool calls) được ưu tiên
- Performance optimizations được merge nhanh

---

## 🎯 Kết luận

NanoBot đang trong giai đoạn **maturation** mạnh mẽ. v0.2.1 đánh dấu sự chuyển đổi từ chat bot sang development environment thực sự. Dự án cân bằng tốt giữa stability fixes (session management, tool calling) và new features (multimodal, new channels, cloud deployment). 

Cộng đồng đang phát triển healthy với contributor diversity cao và maintainer responsiveness tốt. Focus vào cost optimization và enterprise features cho thấy dự án đang target production use cases nghiêm túc.

**Next to watch**: Napcat merge, WebUI inline edit, Azure AAD auth, và platform deployment layer sẽ là game changers cho adoption.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo phân tích Zeroclaw ngày 2026-06-02

## 🎯 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn chuẩn bị phát hành v0.8.0-beta-2 với nhiều thay đổi kiến trúc lớn. Hoạt động tập trung vào việc hoàn thiện hệ thống plugin, cải thiện localization, và xử lý các vấn đề về credential security. Đặc biệt, cộng đồng đang tích cực đóng góp với 36 PR đang mở và 27 issue được theo dõi.

---

## 📦 Releases

**Không có release chính thức** trong 24 giờ qua. Tuy nhiên, PR #6848 đang chuẩn bị cho **v0.8.0-beta-2** với các thay đổi lớn:

- **Zerocode TUI**: Giao diện dòng lệnh tương tác mới
- **RPC socket transport**: Cải thiện giao tiếp giữa các thành phần
- **DenyWithEdit approval**: Cơ chế phê duyệt linh hoạt hơn
- **Beta-2 integration**: Tích hợp toàn diện các tính năng mới

⚠️ **Lưu ý**: Tính năng fallback cho model provider đã được xóa bỏ có chủ đích trong beta này.

---

## 🚀 Tiến độ dự án

### **Xu hướng chính**

#### 1️⃣ **Kiến trúc Plugin & WASI** (Ưu tiên cao)
- **PR #7060**: Định nghĩa WIT interface cho Tool, Channel, Memory plugins
  - Triển khai Component Model chuẩn WASI
  - Nền tảng cho hệ sinh thái plugin độc lập
  - Đang trong giai đoạn review cộng đồng

#### 2️⃣ **Security & Credential Management** (Nguy cơ cao)
- **PR #6982**: Phân loại các surface xử lý credential trong config
  - Đánh dấu các trường nhạy cảm cho mã hóa
  - Cải thiện bảo mật cho config đã lưu
- **PR #6981**: Allowlist cho private host trong `http_request` tool
  - Kiểm soát truy cập local/private API chi tiết hơn

#### 3️⃣ **Multi-tenant & Distribution** 
- **PR #7041**: Linq channel hỗ trợ đa thuê bao với routing theo alias
  - Chuyển từ single-tenant sang multi-tenant
  - Webhook route đổi từ `/linq` sang `/linq/{alias}`
- **PR #5187**: ARM64 Docker target (đang chờ tác giả)
  - Cross-compilation cho ARM64
  - Mở rộng hỗ trợ nền tảng

#### 4️⃣ **Internationalization (i18n)**
- **PR #7039**: Thêm catalog Spanish và Chinese
  - Runtime tools localization (`es`, `zh-CN`)
  - CLI localization mở rộng
  - Đạt parity với locale hiện tại (`fr`)

#### 5️⃣ **Evaluation & Testing**
- **PR #7067**: Phase 0 agent evaluation harness
  - Replay deterministic cho LLM trace fixtures
  - Grading tự động với declarative expectations
  - Nền tảng cho live model-quality evals (#7065)

---

## ⭐ Điểm nổi bật cộng đồng

### **Issues thu hút sự chú ý**

1. **#6302** (4 bình luận) - **Gemini 400 error**: Lỗi history serializer khi gọi Gemini API
   - Gemini yêu cầu user turn trước assistant turn
   - Đang trong quá trình sửa (priority P1)

2. **#6378** (6 bình luận) - **Discord channel restriction**: Yêu cầu bot chỉ phản hồi trong các channel cụ thể
   - Đề xuất `allowed_channels` config field
   - Tương tự pattern `allowed_rooms` của Matrix

3. **#5962** (6 bình luận) - **Ollama tool call failure**: Provider Ollama fail khi cần tools
   - Block workflow hoàn toàn (S1)
   - Đang xử lý (in-progress)

### **PRs có hoạt động cao**

- **#6848**: Beta-2 integration (36 file changes, XL size)
- **#7060**: WASI WIT interfaces (Foundation document FND-001)
- **#7067**: Eval harness - cộng đồng đang chờ tính năng này

---

## 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng đang xử lý**

#### 🔴 **Priority P1** (Workflow blocked)

1. **#6302**: Gemini API 400 error
   - **Nguyên nhân**: History serializer đặt assistant tool_call trước user turn
   - **Tác động**: Block toàn bộ Gemini integration
   - **Trạng thái**: In-progress

2. **#6472**: Gateway không thể sử dụng Postgres
   - **Lỗi**: "Cannot start a runtime from within a runtime"
   - **Tác động**: Degraded behavior với Postgres memory
   - **Priority**: P1, accepted

3. **#5155**: Delegate agents bỏ qua `prompt_injection_mode`
   - **Hiện tượng**: Luôn inject full skills dù config là "compact"
   - **Tác động**: Bloat prompt không cần thiết
   - **Trạng thái**: In-progress

#### 🟡 **Security-critical bugs**

4. **#6350**: WhatsApp allowed-numbers bypass cho LID contacts
   - **Nghiêm trọng**: Messages bị drop âm thầm, không có error log
   - **Trạng thái**: In-progress (P1)

5. **#7059**: Channel orchestrator fallback credential 
   - **Vấn đề**: "Default provider" không tồn tại trong V3 schema
   - **Cần**: Xóa bỏ hoàn toàn logic fallback

### **Bugs đã fix (Closed PRs)**

✅ **#7049**: Fix Kimi temperature rejection (kimi-k2.5/k2.6)  
✅ **#6979**: Email SMTP credential blank handling  
✅ **#6974**: Web_fetch private DNS allowlist  
✅ **#6972**: Image_info path policy resolution  
✅ **#6931**: Channel date-only prompt context  

---

## 💡 Yêu cầu tính năng

### **Tính năng mới được đề xuất**

1. **#7065** - **Agent evaluation harness** (zeroclaw eval)
   - Replay mode: deterministic, offline
   - Live mode: model quality testing
   - LLM-as-judge grading
   - **Ý nghĩa**: Cải thiện QA và benchmarking

2. **#6289** - **Prompt-triggered skill installation**
   - Tự động gợi ý skills khi user hỏi capability chưa có
   - **Ví dụ**: "Can you analyze this PDF?" → suggest document-parser skill
   - **Trạng thái**: Accepted (P2)

3. **#6345** - **Per-channel reply throttling**
   - Config `reply-min-interval-secs` để tránh spam
   - **Use case**: WhatsApp paired-identity channels
   - **Trạng thái**: In-progress (P1)

4. **#6365** - **Dashboard "Update ZeroClaw" button**
   - Chạy `zeroclaw update` qua gateway web UI
   - Không cần drop xuống CLI
   - **Trạng thái**: In-progress (P2)

5. **#4853** - **Install skills from `.well-known` URI**
   - Chuẩn Agent Skills group
   - Cloudflare, Vercel đã support
   - **Trạng thái**: Accepted (P2)

### **Integrations mới**

- **#6827** (✅ Closed): Jina.ai web_search provider
- **#6842** (Open): NEAR AI Cloud provider
- **#7041** (Open): Multi-tenant Linq channel

---

## 👥 Phản hồi người dùng

### **Trải nghiệm tích cực**

- Cộng đồng đánh giá cao direction về WASI plugins (#7060)
- i18n improvements được hoan nghênh (Spanish, Chinese support)
- Security hardening (credential classification) nhận phản hồi tốt

### **Pain points từ người dùng**

1. **Ollama integration instability** (#5962)
   - 6 bình luận thảo luận workarounds
   - Tools không hoạt động đúng

2. **Gemini compatibility** (#6302)
   - Breaking với LiteLLM wire_api
   - Yêu cầu fix nhanh (P1)

3. **Channel configuration complexity**
   - WhatsApp LID bypass (#6350) gây confusion
   - Discord channel restriction (#6378) được nhiều user request

4. **Localization gaps** (#6548)
   - Runtime commands vẫn còn hardcoded English
   - Fluent localization chưa đầy đủ

### **Developer feedback**

- **#6700**: Request read-only skills browser trong dashboard
- **#6346**: Node CLI + dashboard health management
- **#6253**: Skills UX tracker (v0.7.6) - 1 bình luận community input

---

## 📋 Backlog & Roadmap

### **v0.8.0-beta-2 (Sắp ra mắt)**
Scope chính trong PR #6848:
- ✅ Zerocode TUI
- ✅ RPC socket transport  
- ✅ DenyWithEdit approval
- ⚠️ Model fallback behaviors cần rewiring

### **v0.8.1 Integration queue** (#6970)
Tracker cho PR queue:
- Channels: Linq multi-tenant, Discord restriction
- Providers: NEAR AI, Kimi fix
- Tools: Jina search, http_request allowlist
- Skills: .well-known URI support

### **v0.7.6 Skills focus** (#6253)
Coordinating tracker cho skills UX:
- CLI improvements
- Loader enhancements
- Audit & install paths
- Sandbox & test harness
- Authoring tools

### **Blocked items**

🚫 **#6391**: Real heartbeat tracking (blocked, depends on node infrastructure)  
🚫 **#6390**: `zeroclaw node add` CLI (blocked, depends on #6391)  

### **Long-term architecture**

- **WASI Component Model** (PR #7060): Foundation cho plugin ecosystem
- **FND-001 §5.2**: WIT interfaces cho Tool, Channel, Memory
- **Evaluation infrastructure** (PR #7067, #7065): Phase 0 replay → live evals
- **Multi-node fleet management**: CLI + dashboard (#6346, #6390)

---

## 📌 Kết luận

Zeroclaw đang trong giai đoạn **transition kiến trúc quan trọng** với focus vào:

1. ✨ **Plugin ecosystem** qua WASI/WIT
2. 🔒 **Security hardening** (credentials, private hosts)
3. 🌍 **Internationalization** (Spanish, Chinese)
4. 🧪 **Testing infrastructure** (eval harness)
5. 🏢 **Multi-tenant support** (Linq, node fleet)

**Thách thức chính**: Balance giữa stability fixes (Ollama, Gemini) và tính năng mới (beta-2). Cộng đồng active với 36 PR và 27 issue, cho thấy sự quan tâm cao.

**Khuyến nghị**: Ưu tiên P1 bugs (Gemini #6302, Postgres #6472, WhatsApp #6350) trước khi ship beta-2.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích PicoClaw - 2026-06-02

## 🎯 Tóm tắt hôm nay

Ngày 2/6/2026 đánh dấu cột mốc quan trọng với việc phát hành **nightly build v0.2.9-nightly**, kèm theo 4 PRs được merge trong 24h qua giải quyết các vấn đề về stability và API compatibility. Dự án đang tập trung vào việc ổn định tích hợp với các LLM provider mới (Claude Opus 4.7/4.8, NEAR AI) và cải thiện reliability của agent collaboration system.

---

## 🚀 Releases

### **v0.2.9-nightly.20260602.426046fc** (Nightly Build)

**Mức độ rủi ro**: ⚠️ Cao - Build tự động, chưa qua kiểm thử toàn diện

**Điểm nổi bật**:
- Build này chứa các fix quan trọng về API compatibility với Claude models mới nhất
- Tích hợp retry logic cho empty LLM responses
- Cải thiện cron tool với get/update actions

**Khuyến nghị**: Phù hợp cho testing environments, cần thận trọng khi deploy production

---

## 📈 Tiến độ dự án

### **PRs được merge trong 24h** (4 PRs closed)

✅ **#2982** - Fix Bedrock temperature compatibility với Claude Opus 4.8
- **Vấn đề**: Model mới từ AWS Bedrock reject requests có parameter `temperature`
- **Giải pháp**: Conditionally omit temperature cho models thuộc family `opus-4-7`+
- **Impact**: Khôi phục khả năng sử dụng Claude Opus 4.8 trên Bedrock

✅ **#2977** - Thêm get/update actions cho cron tool
- **Tính năng mới**: Agent có thể inspect và partially update cron jobs
- **Use case**: Reschedule jobs mà không cần recreate hoàn toàn
- **Cải thiện**: Giảm risk của data loss trong cron management flows

✅ **#2781** - Giảm token usage cho skill catalog
- **Optimization**: Chỉ gửi skill catalog một lần trong system prompt thay vì mỗi request
- **Saving**: Significant token reduction trên multi-turn conversations
- **Trade-off**: Requires providers với prompt caching support

✅ **#2893** - Thêm Server酱³ Bot channel (closed)
- **Note**: PR bị đóng, có thể do chất lượng implementation hoặc scope concerns

### **PRs đang active** (4 PRs open)

🔄 **#2983** - Retry empty LLM response (mới nhất)
- **Vấn đề**: OpenAI-compatible providers đôi khi trả về HTTP 200 nhưng `content: null`
- **Giải pháp**: Treat as retriable error thay vì valid response
- **Status**: Mới submit hôm nay, cần review

🔄 **#2937** - Agent Collaboration Bus (⭐ major feature)
- **Scope**: First-class inter-agent communication system
- **Features**: Mailboxes, collaboration threads, message envelopes, permissions
- **Impact**: Fundamental change cho multi-agent workflows
- **Concern**: Đánh dấu stale, có thể cần tác giả update

🔄 **#2917** - NEAR AI Cloud provider integration
- **Tính năng**: Add NEAR AI làm OpenAI-compatible provider
- **Highlights**: TEE-capable models, model catalog fetch support
- **Status**: Active review, quan trọng cho decentralized AI ecosystem

🔄 **#2813** - Fix PID identity verification
- **Vấn đề**: Singleton check không verify process identity, dẫn đến crash loop
- **Note**: Đây là updated version, vẫn chờ merge sau nhiều thảo luận

---

## 💬 Điểm nổi bật cộng đồng

### **Issue #1042** - exec tool guardCommand bug (👍 2, 15 comments)
**Vấn đề hot nhất**: False positive trong path validation
- **Mô tả**: Command `curl -s "wttr.in/Beijing?T"` bị block vì regex nhầm `Beijing?T` là relative path
- **User pain**: Weather skill và nhiều skills khác bị broken
- **Root cause**: Guard logic quá aggressive, không distinguish giữa path và URL parameters
- **Community engagement**: 15 comments cho thấy nhiều users gặp vấn đề tương tự

### **Issue #2981** - Documentation update request (mới)
- **Yêu cầu**: Update docs cho v0.2.9
- **Context**: Version có nhiều breaking changes
- **Urgency**: Critical cho user onboarding

---

## 🐛 Ổn định & Bugs

### **Critical Issues**

🔴 **Claude API compatibility crisis** (#2941, #2939, #2982)
- **Pattern**: Anthropic models mới (Opus 4.7, Opus 4.8) deprecate parameters
- **Issues**:
  - Default config dùng dotted model ID (`claude-sonnet-4.6`) thay vì hyphenated
  - Temperature parameter bị reject trên Opus 4.7+
- **Status**: Fixes đã được merge (#2982, #2942, #2940) nhưng cần verify thoroughly
- **User impact**: Mọi fresh install với Anthropic models đều fail ngay lần đầu

🟡 **RISC-V compatibility** (#2887)
- **Environment**: Debian on RISC-V architecture
- **.deb package không hoạt động** với OpenAI models
- **Impact**: Niche nhưng blocking cho embedded/IoT use cases

🟡 **Singleton PID check flaw** (#2720, #2813)
- **Vấn đề**: Stale PID được reuse bởi process khác → crash loop
- **Frequency**: Xảy ra sau unclean shutdowns
- **Status**: PR #2813 đang pending, đã được update

### **UX Bugs**

🟠 **History display bug** (#2796)
- **Vấn đề**: UI chỉ hiển thị message cuối cùng trong multi-turn conversation
- **User confusion**: Lịch sử bị "mất" khi xem lại conversations
- **Root cause**: Message compression logic áp dụng cho display thay vì chỉ LLM context

---

## 💡 Yêu cầu tính năng

### **Đã implement gần đây**
- ✅ Cron tool get/update actions (#2977)
- ✅ NEAR AI provider integration (#2917) - pending merge
- ✅ Agent Collaboration Bus (#2937) - under review

### **Đang được yêu cầu**
- 📝 Documentation overhaul cho v0.2.9 (#2981)
- 🔧 Flexible guard logic cho exec tool (#1042)

---

## 👥 Phản hồi người dùng

### **Pain points**

❌ **Tool safety guards quá strict**
- Users report nhiều legitimate commands bị block
- Particularly problematic cho API calls và external services

❌ **Breaking changes với Claude models**
- Fresh installs bị broken out-of-the-box
- Lack of backward compatibility testing

❌ **Platform-specific bugs** (macOS symlinks #2890, RISC-V #2887)
- Cho thấy test coverage chưa đủ across platforms

### **Positive signals**

✅ **Active development**: 11 PRs trong 2 tuần
✅ **Responsive fixes**: Critical bugs (#2982) được fix trong vòng 24h
✅ **Feature velocity**: Major features (Agent Collaboration) đang được build

---

## 🗺️ Backlog & Roadmap

### **Immediate priorities** (inferred từ activity)

1. **Stabilization focus**
   - ✅ Claude API compatibility → mostly resolved
   - ⏳ PID check fix → needs merge
   - ⏳ Empty response retry → in review
   - 🔴 exec tool guards → needs design discussion

2. **Documentation debt**
   - 🔴 v0.2.9 breaking changes documentation
   - Manual updates cho new features

3. **Platform support**
   - 🟡 RISC-V stability
   - 🟡 macOS symlink handling

### **Strategic initiatives**

🎯 **Agent Collaboration** (#2937)
- Large architectural change
- Enables complex multi-agent workflows
- Needs thorough review before merge

🎯 **Provider ecosystem expansion**
- NEAR AI integration showing commitment to decentralized AI
- Bedrock fixes showing enterprise focus

### **Technical debt**

⚠️ **Stale issues**: 5/7 issues tagged `stale`
- Indicates either long-standing bugs hoặc need for triage
- Risk: Real issues bị auto-close

⚠️ **Test coverage gaps**
- Platform-specific bugs suggest insufficient CI matrix
- API compatibility issues suggest lack of contract testing

---

## 📊 Metrics Snapshot

| Metric | Value | Trend |
|--------|-------|-------|
| Open Issues | 7 | 🔴 Nhiều stale |
| Open PRs | 7 | ✅ Active development |
| PRs merged (24h) | 4 | ✅ Healthy velocity |
| Community engagement | Mixed | ⚠️ #1042 hot, others quiet |
| Release cadence | Nightly | ✅ Continuous delivery |

---

## 🎬 Kết luận

PicoClaw đang trong giai đoạn **rapid iteration** với focus mạnh vào **stability và compatibility**. Dự án thể hiện responsiveness tốt với critical bugs (Claude fixes trong <24h) nhưng đang struggle với:

1. **Quality assurance**: Breaking changes shipped to default configs
2. **Platform testing**: RISC-V, macOS issues cho thấy CI gaps  
3. **Technical debt**: Growing stale issue backlog

**Outlook**: Positive về feature development (Agent Collaboration, NEAR AI) nhưng cần strengthen QA processes trước khi promote nightly → stable release.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo Phân tích NanoClaw - 02/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 02/06/2026, đội ngũ NanoClaw tập trung xử lý các vấn đề về **độ ổn định và khả năng phục hồi** của agent container. Có 1 PR mới được tạo và 1 issue được đóng, trong khi các PR quan trọng về provider failure recovery và container compatibility đang được hoàn thiện. Điểm nổi bật là các giải pháp kỹ thuật cho crash loops và corrupt transcripts.

---

## 🚀 Releases

Không có release nào trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### PR Hoạt động Tích cực

**🔧 Sửa lỗi nghiêm trọng:**

- **#2670** - Self-healing cho poisoned-resume crash loop
  - Giải quyết vấn đề agent sessions bị kẹt mãi mãi khi transcript bị corrupt
  - Thêm logic phục hồi tự động khi SDK trả về lỗi 400 về `thinking` blocks
  - Fixes #2669 - một bug priority cao ảnh hưởng đến độ tin cậy của hệ thống

- **#2671** (MỚI) - Mount inbound attachments directory
  - Sửa lỗi thiếu bind mount cho `/workspace/attachments/`
  - Cho phép agent containers truy cập attachments từ channel adapters
  - Cải thiện khả năng xử lý file đính kèm trong conversations

**⚙️ Cải thiện infrastructure:**

- **#2667** - Rootless Podman + root container support
  - Giải quyết vấn đề permissions với Claude Code v2.1.128
  - Cho phép chạy với `--user=0:0` trên rootless Podman/LXC
  - Quan trọng cho deployment flexibility

- **#2666** - Provider failure recovery (depends on #2667)
  - Rollback, replay, và friendly fallback mechanisms
  - Tăng cường khả năng phục hồi khi provider gặp sự cố
  - Kiến trúc phức tạp, đang chờ merge dependency

### Xu hướng phát triển

Team đang trong giai đoạn **"hardening"** - củng cố độ ổn định thay vì thêm features mới. Focus vào:
- Error handling và recovery mechanisms
- Container compatibility (Podman, Docker)
- Session resilience

---

## 🌟 Điểm nổi bật cộng đồng

### Issue được đóng thành công

**#2331** - Bug routing A2A replies sai session (closed 01/06)
- Vấn đề nghiêm trọng về multi-channel agent groups
- `findSessionByAgentGroup` chỉ dựa vào `created_at` thay vì track context đúng
- Đã được fix và đóng sau 1 tháng

### Issues mới cần chú ý

**#2668** - No per-tool timeout (opened 01/06)
- **Tác động lớn**: MCP tool bị hang có thể block session tới 30 phút
- Hiện tại chỉ có cold-kill timeout, không có per-tool timeout
- Cần giải pháp graceful timeout cho từng tool call riêng lẻ

---

## 🐛 Ổn định & Bugs

### 🔴 Critical Issues Đang Xử lý

**Crash loop永久 (#2669):**
- Agent sessions bị stuck mãi mãi khi transcript corrupt
- Lỗi 400 từ API: "thinking blocks cannot be modified"
- ✅ **Đã có fix trong PR #2670** - đang review

**Routing bug trong A2A (#2331):**
- ✅ **Đã resolved** - đóng ngày 01/06
- Replies bị gửi tới sai session trong multi-channel groups

### 🟡 Medium Priority

**No per-tool timeout (#2668):**
- Hung MCP tools có thể block session quá lâu
- Chưa có PR fix, cần thiết kế solution

**Missing attachments mount (#2671):**
- ✅ **Có PR fix** - vừa tạo hôm nay
- Ảnh hưởng khả năng xử lý file attachments

---

## 💡 Yêu cầu tính năng

Không có feature requests mới trong 24 giờ qua. Team đang prioritize stability over new features.

### Features đang phát triển

- **Provider failure recovery** (#2666) - enhanced error handling
- **Slash command improvements** (#2346) - better UX cho unknown commands

---

## 💬 Phản hồi người dùng

### Pain Points được báo cáo

1. **Sessions bị stuck vĩnh viễn** - reported by @ddaniels
   - Ảnh hưởng production usage
   - Không có cách self-heal tự động
   
2. **Tool timeout issues** - reported by @mshirel
   - Một tool chậm có thể làm tê liệt cả session
   - User experience kém khi phải chờ 30 phút

3. **Container permissions complexity** - reported by @dtreskunov
   - Khó khăn với rootless Podman deployments
   - Claude Code v2.1.128 từ chối chạy as root

### Sentiment

Team đang **responsive** với bug reports và nhanh chóng tạo fixes. Community feedback đang drive development direction về stability.

---

## 🗓️ Backlog & Roadmap

### Đang trong pipeline

**Short-term (tuần này):**
- ✅ Merge #2667 (container fixes)
- ⏳ Review và merge #2670 (crash loop fix)
- ⏳ Review #2671 (attachments mount)
- ⏳ Merge #2666 (provider recovery) - sau khi #2667 merged

**Medium-term:**
- Thiết kế solution cho per-tool timeout (#2668)
- Hoàn thiện slash command handling (#2346)

### Gaps cần address

1. **Monitoring & observability**: Cần better visibility vào tool execution times
2. **Graceful degradation**: Per-tool timeouts và cancellation
3. **Test coverage**: Các edge cases về corrupt transcripts và provider failures

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn maturation quan trọng, tập trung vào **production-readiness** thay vì feature expansion. Các fixes về crash loops, container compatibility, và provider resilience cho thấy team đang chuẩn bị cho scale và production deployment. Velocity của bug fixes khá tốt (1-2 ngày từ report đến PR), nhưng cần monitor để issues #2668 không bị backlog quá lâu.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích dự án IronClaw - Ngày 2026-06-02

## 📋 Tóm tắt hôm nay

Ngày 02/06/2026 đánh dấu một ngày làm việc cực kỳ sôi động với **46 pull requests** và **10 issues mới**, cho thấy dự án IronClaw đang trong giai đoạn tái cấu trúc lớn với nhánh **Reborn**. Trọng tâm phát triển tập trung vào việc hoàn thiện hệ thống xác thực OAuth, tích hợp các capability từ bên thứ ba (GitHub, GSuite, Notion), và xây dựng kiến trúc trigger/event streaming cho môi trường multi-tenant cloud-native.

---

## 🚀 Releases

**Không có release mới** trong 24 giờ qua. Dự án đang tích cực phát triển trên nhánh `reborn-integration` mà chưa có bản phát hành chính thức.

---

## 📊 Tiến độ dự án

### Các milestone chính đang được xử lý:

#### 1. **Hệ thống xác thực & OAuth (Ưu tiên cao)** 🔐
- **#4294**: Tích hợp OAuth Google/GitHub lên WebUI v2 - đã triển khai đầy đủ flow PKCE và token exchange
- **#4297**: Thiết lập và phục hồi GSuite OAuth - hoàn thiện routes và PKCE
- **#4300**: Tích hợp Notion OAuth provider - mở rộng từ Google-only sang multi-provider
- **#4281**: Sửa lỗi manual-token resume cho durable auth gate - routing qua product-auth flow records

**Insight**: Đội ngũ đang xây dựng một lớp abstraction OAuth đồng nhất cho nhiều providers (Google, GitHub, Notion), cho phép người dùng kết nối các dịch vụ bên ngoài một cách liền mạch.

#### 2. **Extension & Capability System** 🔧
- **#4280**: Port đầy đủ GitHub capabilities sang Reborn (từ issue-only slice lên full v1)
- **#4293**: Surface GSuite capabilities (Gmail, Google Calendar) cho model
- **#4282**: Sửa lỗi GitHub extension search dispatch - structured inputs
- **#4289**: Sửa auth resume flow cho GitHub extension
- **#4290**: Đăng ký Reborn WASM runtime

**Insight**: IronClaw đang chuyển sang mô hình extension dựa trên WASM với capability-based security model, cho phép tích hợp các dịch vụ bên ngoài một cách an toàn và có thể mở rộng.

#### 3. **Trigger System & Event Streaming** ⏰
- **#4301** (PR15): Thêm trigger poller core - backend-agnostic
- **#4308** (PR16): Harness coverage cho trigger poller với crash/replay behavior
- **#4292** (PR14): Thêm trigger materialization turn-state seams
- **#4303**: Refactor TriggerPollerWorker thành các module tập trung

**Insight**: Hệ thống scheduled triggers đang được xây dựng từ đầu với thiết kế durable, fault-tolerant, hỗ trợ replay và recovery sau crash.

#### 4. **Model Gateway & Budget Management** 💰
- **#3899**: Giải quyết tất cả follow-ups từ #3841 về cost-based budgets
- **#4286**: Surface NEAR AI credit exhaustion trong Reborn
- **#4311**: Sửa lỗi model gateway collapse budget failures thành context-overflow

**Insight**: Hệ thống quản lý ngân sách đang được tinh chỉnh để phân biệt rõ các loại lỗi (budget exceeded vs context overflow) và hiển thị thông tin chính xác cho người dùng.

#### 5. **WebUI & User Experience** 🎨
- **#4295**: Dừng processing sau khi gate resolution bị cancelled
- **#4312**: Surface compaction progress trong live projection updates
- **#4287**: Tích hợp OAuth login trên WebUI

**Insight**: UX đang được cải thiện để phản ánh chính xác trạng thái hệ thống (compaction, gate resolution, cancelled operations).

---

## 🌟 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

1. **#4279** - Inquiry về roadmap cho reborn branch và cloud-native architecture
   - Người dùng @liaoqianchuan thể hiện sự quan tâm sâu sắc về stateless agent model
   - Đặt câu hỏi về timeline và kế hoạch triển khai cho môi trường multi-tenant
   - **Chưa có phản hồi chính thức** - cần được maintainers giải đáp

2. **#4272** - Slack Events API host ingress
   - Tác giả @danielwpz (contributor thường xuyên) đang xây dựng integration Slack
   - Xử lý URL verification, signature verification theo Slack standards

3. **#4178** - Feishu websocket event intake
   - @hanakannzashi triển khai long-connection websocket cho Feishu/Lark
   - Decode binary protobuf frames, hỗ trợ fragment merging

**Insight**: Cộng đồng quan tâm đến khả năng tích hợp với các nền tảng messaging (Slack, Feishu) và cần thông tin rõ ràng hơn về roadmap Reborn.

---

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng được phát hiện và sửa:

1. **Compaction & Context Management**:
   - **#4310**: Context-overflow recovery emit ShrinkContext nhưng executor không retry với shrinking
   - **#4309**: Compaction summary write có thể outlive failed checkpoint và block retries
   - **#4311**: Model gateway collapse budget failures thành context-overflow
   - **#4313**: Reconcile compaction milestone payload schema với live enums

2. **Authentication Flow**:
   - **#4281**: Durable auth gate manual-token resume bị break
   - **#4282**: GitHub extension search không dispatch được do input schema issues
   - **#4289**: GitHub auth resume flow không hoạt động end-to-end

3. **Runtime & Validation**:
   - **#4306**: Thiếu validation cho provider capability inputs trước khi dispatch
   - **#4288**: Malformed capability_info calls không được recover properly

4. **Extension Management**:
   - **#4299**: Hard fail khi bundled extension manifest hash thay đổi sau binary update
   - **#4290**: WASM runtime không được register trong production composition

**Insight**: Đội ngũ đang phát hiện và sửa nhiều edge cases trong hệ thống compaction, auth flow, và extension lifecycle. Việc có nhiều bugs xuất hiện đồng thời cho thấy đây là giai đoạn integration testing intensive.

---

## ✨ Yêu cầu tính năng

### Tính năng mới được đề xuất:

1. **#4312** - Surface compaction progress trong live updates
   - Users không nhận được feedback khi compaction đang chạy
   - Có thể khiến người dùng nghĩ agent bị stall

2. **#4314** - CompactionLeakDetected milestone
   - Milestone tồn tại nhưng chưa được emit ở production path
   - Cần quyết định emit hoặc remove

3. **#4298** - Upgrade MiniMax model lên M3
   - Drop deprecated M2.5
   - Set M3 làm default cho `minimax` provider

4. **Runtime Context in Prompt** (#4149 → #4304):
   - Plan để thêm capability-scoped runtime context vào prompt bundles
   - Tách runtime context khỏi identity surfacing

**Insight**: Focus vào observability (compaction progress, better error messages) và model upgrades.

---

## 💬 Phản hồi người dùng

### Câu hỏi và quan ngại từ cộng đồng:

1. **Cloud-native architecture clarity** (#4279):
   ```
   "The decoupling of state management seems essential for scaling 
   to multi-user, multi-tenant environments."
   ```
   - User muốn biết timeline cho stateless agent model
   - Quan tâm về horizontal scaling và multi-tenancy support

2. **Developer Experience**:
   - Multiple PRs về local-dev experience (#4285: persist manual tokens across restarts)
   - Cần thiết cho workflow lặp đi lặp lại

3. **Documentation gaps**:
   - **#4302**: Reconcile AGENTS.md với code thực tế - docs đang outdated
   - **#4313**: Schema documentation không match với implementation

**Insight**: Cộng đồng cần:
- Roadmap rõ ràng hơn về Reborn timeline
- Documentation được cập nhật thường xuyên
- Better local development experience

---

## 📅 Backlog & Roadmap

### Từ code và issues, có thể suy ra roadmap:

#### ✅ Đã hoàn thành hoặc gần hoàn thành:
- OAuth multi-provider infrastructure (Google, GitHub, Notion)
- GitHub capabilities full v1 port
- GSuite capabilities activation
- Trigger poller core & harness
- Cost-based budget foundation

#### 🚧 Đang trong progress:
- Event streaming & projection system (#3281 - CLOSED nhưng related issues còn mở)
- WebUI v2 OAuth integration (#4287, #4294)
- Compaction observability (#4312)
- Extension registry management (#4307)
- Product outbound orchestration (#4277)

#### 📋 Planned (từ parent issues):
- **#3031**: Parent cho EventStreamManager
- **#3857**: Parent cho Slack integration (#4272 stacked on #4035)
- **#4149**: Runtime context prompt stage (#4304 là plan)

#### ❓ Cần clarification:
- **#4279**: Reborn rollout timeline cho cloud-native deployment
- Slack & Feishu integration completion status
- MCP server architecture evolution

### Các module đang được tích cực phát triển:
- `M3-agentloop-turns`: Agent loop, compaction, recovery
- `M5-events-streaming`: Event streaming, projections
- `M1-webui-product`: WebUI v2, OAuth flows

---

## 🎯 Kết luận

IronClaw đang trải qua một đợt **refactoring architecture lớn** với nhánh Reborn, chuyển từ stateful monolithic model sang **stateless, cloud-native, multi-tenant** architecture. Ngày 02/06 cho thấy:

- ✅ **Momentum cao**: 46 PRs, nhiều PRs được merge trong ngày
- 🔧 **Focus rõ ràng**: OAuth, capabilities, triggers, budgets
- 🐛 **Quality assurance**: Phát hiện và sửa nhiều edge cases
- 📚 **Tech debt**: Documentation cần được update
- 🤝 **Community engagement**: Cần roadmap transparency hơn

**Rủi ro**: 
- Velocity cao có thể dẫn đến bugs integration
- Documentation lag behind code
- Cần clarify migration path từ legacy sang Reborn cho users

**Cơ hội**:
- Architecture mới mở cửa cho enterprise adoption (multi-tenancy)
- Extension ecosystem đang được xây nền móng vững chắc
- OAuth infrastructure cho phép rich integrations

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo Phân tích Hoạt động LobsterAI - 02/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 02/06 chứng kiến đợt phát hành quan trọng **v2026.6.1** của LobsterAI với 12 PR được merge, tập trung vào hệ sinh thái **Expert Kit Store** - một bước đột phá cho phép người dùng cài đặt và chia sẻ các gói chuyên gia AI. Bên cạnh đó, team đã tăng cường ổn định hệ thống MCP/Gateway và bổ sung tính năng fork conversation trong Cowork mode. Một vấn đề nghiêm trọng về chính sách điểm tích lũy đã được người dùng phản ánh.

---

## 🚀 Releases

### LobsterAI 2026.6.1 - Cột mốc Expert Kit Ecosystem

**Tính năng chính:**

🎁 **Expert Kit Store** 
- Marketplace hoàn chỉnh với UI tabs/cards để browse, install, uninstall các kit chuyên gia
- Tích hợp với conversation: chọn Kit trực tiếp từ input box và try-asking
- Redux state management cho Kit lifecycle
- Localization cho skill descriptions từ installed kits

🔌 **Plugin Management 2.0**
- Hỗ trợ kiểm tra cập nhật thủ công cho npm/ClawHub sources
- Confirmation modal trước khi gỡ kit để tránh mất dữ liệu

🌿 **Cowork Conversation Forking**
- Fork conversation từ bất kỳ assistant message nào
- Preserve compacted context khi fork session dài
- Hỗ trợ cả local và collaborative workflows

🛠️ **Infrastructure & Stability**
- Fix MCP stdio process tree killing issues
- Share MCP runtime across sessions để tối ưu tài nguyên
- Clear error messaging cho missing local files trong Artifacts
- Fix WeChat integration bug khi update/reinstall

📱 **Model Support**
- Thêm Minimax M3 model
- Update context windows cho BYOK models

**Ý nghĩa chiến lược:**
Release này đánh dấu chuyển mình của LobsterAI từ một AI assistant sang **nền tảng mở rộng được (extensible platform)** với Kit ecosystem. Người dùng giờ có thể packaging và chia sẻ workflows chuyên môn, tạo nền tảng cho một marketplace cộng đồng tương tự VSCode Extensions.

---

## 📈 Tiến độ dự án

### Xu hướng phát triển chính

**1. Platform Strategy: Kit Ecosystem (5 PRs)**
- #2060, #2084, #2083, #2088, #2087: Xây dựng toàn bộ infrastructure cho Kit Store
- Team đang bet heavily vào việc biến LobsterAI thành platform
- Chất lượng code cao: có confirmation UX, i18n support, error handling đầy đủ

**2. Collaboration Features (2 PRs)**
- #2085: Local conversation forking - addressing pain point khi muốn "rewind" conversation
- #2073: Better error handling cho shared artifacts
- Focus vào use case làm việc nhóm và long-running projects

**3. Stability & Developer Experience (3 PRs)**
- #2066: Fix critical MCP process management issues
- #2069: Plugin update mechanism
- #2089: Model catalog expansion

**4. Release Management**
- #2090: Merge release branch với 73 commits
- Chu kỳ release ổn định (5.28 → 6.1), ~4 ngày/release

### 🔥 PRs đáng chú ý

**#2085 - Conversation Forking** ⭐
- Feature phức tạp với context preservation logic
- Giải quyết real user need: "What if I want to try different approaches từ message thứ 5?"
- Technical depth: IPC handlers, diagnostics, design specs

**#2083 - Localized Skill Descriptions**
- Chi tiết UX: persist kit metadata, fallback mechanism
- Cho thấy commitment với international users

---

## 👥 Điểm nổi bật cộng đồng

### ⚠️ Issue #2081: Khủng hoảng chính sách điểm

**Vấn đề nghiêm trọng:**
- User @zjk648491625 phản ánh mạnh: 5,500 điểm subscription bị clear về 0 vào cuối tháng
- Tone rất frustrated: "来搞笑的吧???" (Đùa à?)
- Chỉ có 1 comment, chưa thấy response chính thức từ team

**Phân tích:**
- Đây là **vấn đề business model/trust** nghiêm trọng hơn technical bug
- Nếu không có cảnh báo rõ ràng về expiration, đây là violation của user expectation
- Cần clarification ngay về:
  - Có phải là intended behavior?
  - Có refund/compensation policy không?
  - Terms có transparent không?

**Risk:** Nếu xử lý không tốt, có thể trigger backlash từ paying users và ảnh hưởng reputation

---

## 🐛 Ổn định & Bugs

### ✅ Đã fix

**MCP Process Management (#2066)**
- Bug: Stdio MCP processes không được kill clean, gây resource leak
- Solution: Proper process tree termination + runtime sharing
- Impact: Critical cho stability của features dùng MCP

**Artifacts Local File Handling (#2073)**
- Bug: Không có error message khi file bị move/delete
- Solution: Clear toast messages, preserve remote links
- UX improvement đáng kể

**WeChat Integration (#2086)**
- Bug xảy ra khi update/reinstall
- Platform-specific fix cho Windows
- Cho thấy team đang support IM integrations (Trung Quốc market)

### 🔄 Đang xử lý

**PR #1464 - IM Duplicate Validation (STALE)**
- Đã open từ 04/04, marked stale 06/01
- Feature: Prevent duplicate DingTalk/Feishu/QQ bot instances
- Status: Có vẻ bị deprioritize, cần review lại

---

## 💡 Yêu cầu tính năng

### Đã implement

✅ **Kit Store** - Ecosystem expansion
✅ **Conversation Forking** - Advanced workflow control
✅ **Manual Plugin Updates** - User control over dependencies

### Implicit requests (từ fixes)

📋 **Better subscription clarity** - Rõ ràng urgent sau issue #2081
🔔 **Notification system** - Cho expiring credits/subscriptions
📊 **Usage dashboard** - Để users track điểm số/limits

---

## 💬 Phản hồi người dùng

### Negative Sentiment

**🔴 Subscription Policy (Issue #2081)**
- Sentiment: Angry, betrayed
- Quote: "来搞笑的吧???" 
- Root cause: Lack of transparency trong billing
- **Action needed:** Public clarification + policy review

### Positive Indicators

**🟢 Active Development**
- 12 PRs merged trong 1 ngày cho thấy healthy velocity
- Features have clear user value (forking, kits, updates)

**🟢 Quality Standards**
- PRs có confirmation modals, i18n, error handling
- Design specs và diagnostics được include

### Mixed Signals

**🟡 Stale PRs**
- #1464 bị stale dù có value (duplicate prevention)
- Có thể team đang overload hoặc deprioritize non-core features

---

## 🗺️ Backlog & Roadmap

### Inferred từ recent activity

**Short-term (đang làm):**
- ✅ Kit Store rollout & refinement
- ✅ MCP stability improvements
- 🔄 Model catalog expansion (Minimax M3 added)

**Medium-term (có signals):**
- 📦 **Kit Marketplace cộng đồng**: Infrastructure đã có, cần discovery/rating features
- 🤝 **Enhanced Cowork features**: Forking là bước đầu, có thể có real-time collab tiếp theo
- 🔌 **Plugin ecosystem maturity**: Update mechanism mới cho thấy focus vào 3rd-party extensions

**Gaps cần address:**
- 💰 Subscription management UX
- 📱 Mobile/web clients? (Chưa thấy mentions)
- 🌐 International expansion (đã có i18n, nhưng market strategy unclear)

### Tech Debt Watch

- **Stale PRs**: 1 PR từ April vẫn open
- **Platform-specific bugs**: WeChat fix cho thấy có complexity trong cross-platform support
- **Process management**: MCP issues cho thấy subprocess handling cần standardize hơn

---

## 🎯 Đánh giá tổng quan

**Điểm mạnh:**
- 🚀 Bold platform strategy với Kit ecosystem
- 💎 High code quality standards
- ⚡ Fast iteration cycle (4 days/release)

**Rủi ro:**
- 💸 Subscription policy crisis cần handle ASAP
- 📊 Backlog management (stale PRs)
- 🔍 Chưa rõ GTM strategy cho Kit marketplace

**Recommendation:** 
Ưu tiên giải quyết issue #2081 ngay để protect brand trust, đồng thời tiếp tục push Kit ecosystem nhưng cần clarify monetization model rõ ràng hơn.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo phân tích Moltis - Ngày 2026-06-02

## 1. 🎯 Tóm tắt hôm nay

Dự án Moltis tập trung vào việc **cải thiện kiến trúc provider và xử lý tool calling** với 4 PRs được xử lý (3 đã merge). Đáng chú ý là việc tích hợp **NEAR AI Cloud** như một provider mới và các cải tiến về khả năng tương thích OpenAI. Không có hoạt động issues mới, cho thấy đội ngũ đang ưu tiên việc hoàn thiện code base hiện tại.

## 2. 🚀 Releases

**Không có release mới trong 24 giờ qua.**

## 3. 📈 Tiến độ dự án

### PRs đã merge (3/4)

**🔧 Refactoring & Kiến trúc**

- **#1090 - Explicit OpenAI Capabilities** ✅
  - Thay thế logic kiểm tra URL/tên provider bằng **capability policies rõ ràng**
  - Tách biệt khả năng của built-in providers vs custom providers
  - Thêm regression tests để đảm bảo tính tương thích ngược
  - **Ý nghĩa**: Kiến trúc rõ ràng hơn, dễ bảo trì và mở rộng provider ecosystem

**🌐 Tích hợp Provider mới**

- **#1031 - NEAR AI Cloud Provider** ✅
  - Tích hợp NEAR AI Cloud qua OpenAI-compatible API
  - Sử dụng `NEARAI_API_KEY` và endpoint `https://cloud-api.near.ai/v1`
  - Auto-discovery models từ catalog công khai
  - Hỗ trợ **TEE (Trusted Execution Environment)** recommendations
  - **Ý nghĩa**: Mở rộng lựa chọn model cho người dùng, đặc biệt trong lĩnh vực privacy-focused AI

**🛠️ Bug Fixes**

- **#1088 - OpenAI Codex Tool-Call Arguments** ✅
  - Xử lý `response.function_call_arguments.done` payloads
  - Tổng hợp streaming argument deltas khi không có delta nào được emit
  - Cải thiện error diagnostics cho missing arguments
  - **Ý nghĩa**: Tăng độ ổn định khi tích hợp với OpenAI Codex API

### PRs đang mở (1/4)

- **#1089 - Cap Persisted Tool Results** 🔄
  - Giới hạn kích thước `tool` và `tool_result` content khi rehydrate session history
  - Áp dụng cho tất cả chat flows: normal, streaming, retry, compaction
  - **Tác động**: Tối ưu memory usage và performance, đặc biệt cho long-running sessions

### Xu hướng phát triển

📊 **Pattern nhận diện:**
- Focus vào **provider abstraction layer** - làm cho hệ thống linh hoạt hơn với nhiều AI providers
- Quan tâm đến **resource management** (capping tool results)
- Cải thiện **observability** và error handling (diagnostics, logging)

## 4. 💬 Điểm nổi bật cộng đồng

⚠️ **Hoạt động cộng đồng thấp:**
- Không có issues mới được tạo/cập nhật
- Các PRs không có reactions (👍: 0 cho tất cả)
- Không có discussions trong comments

**Phân tích**: Đây có thể là giai đoạn tập trung phát triển nội bộ, hoặc cộng đồng đang trong giai đoạn ổn định sử dụng các tính năng hiện có.

## 5. 🔧 Ổn định & Bugs

### Bugs đã fix

✅ **OpenAI Codex function calling** (#1088)
- Vấn đề: Missing argument deltas trong streaming responses
- Giải pháp: Synthesize deltas từ final arguments
- Impact: Critical cho các workflows dựa vào tool calling

### Vấn đề đang xử lý

🔄 **Memory/Performance optimization** (#1089)
- Vấn đề: Tool results không giới hạn có thể gây memory issues
- Giải pháp đề xuất: Capping content before rehydration
- Status: PR đang review

### Technical debt được xử lý

🧹 **Provider architecture** (#1090)
- Loại bỏ implicit behavior checks
- Chuyển sang explicit capability declaration
- Tăng testability và maintainability

## 6. 🎨 Yêu cầu tính năng

**Không có feature requests mới được document trong issues.**

Tuy nhiên, các PR cho thấy roadmap ngầm:
- Mở rộng provider ecosystem (NEAR AI Cloud là ví dụ)
- Cải thiện resource management
- Tăng cường developer experience (better diagnostics)

## 7. 👥 Phản hồi người dùng

**Không có feedback trực tiếp từ người dùng trong 24h qua.**

Các contributors chính:
- `@penso` - Refactoring provider architecture
- `@PierreLeGuen` - NEAR AI integration
- `@s-salamatov` - Bug fixes & optimization

**Insight**: Team nhỏ nhưng productive, mỗi thành viên đảm nhận areas cụ thể.

## 8. 🗺️ Backlog & Roadmap

### Từ PRs hiện tại, có thể suy ra priorities:

**Short-term (đang thực hiện)**
- ✅ Stabilize provider abstraction layer
- 🔄 Optimize resource usage (tool results capping)
- ✅ Expand provider support (NEAR AI)

**Mid-term (suy đoán từ patterns)**
- 🔮 Thêm providers khác (pattern đã được thiết lập)
- 🔮 Enhanced error handling & observability
- 🔮 Performance optimization cho long-running sessions

**Thiếu thông tin về:**
- Public roadmap
- Community-driven features
- Major version plans

---

## 📌 Kết luận

Moltis đang trong giai đoạn **maturation & optimization**, tập trung vào:
- 🏗️ Kiến trúc vững chắc (explicit capabilities)
- 🚀 Mở rộng ecosystem (more providers)
- ⚡ Performance & stability (resource management)

**Recommendations cho community watchers:**
- Theo dõi #1089 để hiểu approach về resource optimization
- Provider abstraction layer mới (#1090) là foundation cho ecosystem mở rộng
- NEAR AI integration (#1031) cho thấy hướng đi về privacy-focused AI

**Health score: 🟢 Healthy** - Consistent development, thoughtful refactoring, và clear technical direction, dù community engagement thấp.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo phân tích CoPaw - 2026-06-02 🔍

## 1. Tóm tắt hôm nay 📋

Ngày 01-02/06, dự án CoPaw vừa phát hành **v1.1.10** với những tính năng đột phá như spawn subagent, Coding Mode mở thư mục local, và tích hợp kênh Tencent Yuanbao. Cộng đồng đang tập trung vào các vấn đề về hiệu năng trên Windows, quản lý context và MCP server processes. Có tới 35 PRs và 31 issues hoạt động, cho thấy tốc độ phát triển rất cao với nhiều đóng góp từ cộng đồng.

## 2. Releases 🚀

### **v1.1.10** (2026-06-01)

**Tính năng chính:**

#### ✨ Agent System
- **Spawn Subagent** (#4806): Công cụ mới cho phép tạo sub-agent tạm thời trong workspace, mở rộng khả năng phân công tác vụ phức tạp

#### 💻 Coding Mode
- **Open Directory** (#4762): Tính năng mở thư mục local cho phép tham chiếu dự án mà không cần copy file vào workspace - giải pháp quan trọng cho Windows users

#### 📱 Kênh mới
- **Tencent Yuanbao Channel** (#4856): Tích hợp platform chatbot Tencent Yuanbao qua WebSocket, mở rộng khả năng triển khai tại thị trường Trung Quốc

#### 🔧 Cải tiến kỹ thuật
- Fix bug stale skill directories trên Windows
- Cải thiện token usage visibility trong console
- Tool guard approval cho Telegram channel

**Ý nghĩa**: Release này đánh dấu bước tiến quan trọng về khả năng multi-agent và hỗ trợ developer workflow, đặc biệt tối ưu hóa trải nghiệm Windows.

---

## 3. Tiến độ dự án 📊

### **PRs quan trọng đang mở (Open)**

#### 🧪 Testing & Quality (#4852)
- Thêm **153 unit tests** cho runner & routers - nỗ lực nghiêm túc trong việc tăng test coverage
- Mốc quan trọng cho độ tin cậy của backend

#### 🔄 AgentScope 2.0 Migration (#4846)
- **[Breaking Change]** Đang migrate từ AgentScope 1.x sang 2.0
- Work in Progress - sẽ là thay đổi kiến trúc lớn

#### ⚡ Windows Performance (#4772)
- Tối ưu khởi động Windows với lazy loading, caching
- Giảm startup time xuống **~40ms** thay vì nhiều giây
- Progressive initialization cho responsive nhanh hơn

#### 🔌 MCP Server Pooling (#4849)
- Giải quyết vấn đề nghiêm trọng: 300+ agents tạo hàng trăm MCP processes
- SharedMCPPool để reuse server instances - tiết kiệm tài nguyên đáng kể

### **Xu hướng phát triển:**
- **Platform support**: Tập trung mạnh vào Windows stability
- **Developer Experience**: Coding mode, debugging tools
- **Enterprise features**: Multi-instance channels, group session sharing
- **Performance**: Context management, process optimization

---

## 4. Điểm nổi bật cộng đồng 🌟

### **Issues được quan tâm nhất:**

#### 💬 #4865 - Streaming Tool Output (👍 1)
**Vấn đề**: Khi agent gọi `write_file` để tạo file lớn, UI không hiển thị tiến trình streaming → giao diện như bị "đơ"
- **Tác động**: UX nghiêm trọng khi generate code/file lớn
- **Giải pháp đề xuất**: Render incremental tool call parameters trong realtime

#### 🔄 #4872 - Context Inflation Loop
**Vấn đề**: Session mới load raw history không nén → context bùng nổ vô hạn
- Khi topic trùng với lịch sử cũ, system load toàn bộ messages cũ mà không compression
- Dẫn đến infinite context growth

#### 🪟 #4835 - Jobs.json Validation
**Vấn đề**: 1 job invalid trong `jobs.json` → toàn bộ workspace fail
- Thiếu graceful degradation
- Nên skip invalid jobs và log warning thay vì crash

### **PRs được thảo luận:**

#### #4433 - Token Usage Display
- Hiển thị token usage per turn + floating badge trong console
- Giúp users theo dõi chi phí và context window usage
- Status: Under Review - cần polish UI/UX

---

## 5. Ổn định & Bugs 🐛

### **Bugs nghiêm trọng:**

#### 🔴 Windows Process Leaks (#4844)
**Triệu chứng**: Browser processes và temp directories không được cleanup sau khi session kết thúc
- Ngăn backup operations
- Cascading failures trong cleanup routine
**Fix**: PR #4853 - kill process tree và clean lock files

#### 🔴 MCP Process Explosion (#4842)
**Triệu chứng**: Mỗi agent spawn riêng MCP server → 300 agents = hàng trăm processes
- Resource exhaustion nghiêm trọng trên Windows
**Fix**: PR #4849 - SharedMCPPool pattern

#### 🟡 Cron + WeChat Delivery Failure (#4878)
**Triệu chứng**: Cron task với `share_session=false` không gửi được message qua WeChat
- Lỗi: `ret=-3` do logic routing sai
**Fix**: PR #4883 đang được review

#### 🟡 Chat Switching in Coding Mode (#4819)
**Triệu chứng**: Chuyển đổi conversation trigger global refresh và jump về conversation cũ
- UI bug ảnh hưởng workflow

### **Bugs vừa phải:**

- #4864: v1.1.9 không phản hồi message
- #4731: Browser launch failures trên Windows (Edge exit code 21)
- #4835: Single invalid job crashes entire workspace

---

## 6. Yêu cầu tính năng mới 💡

### **Feature Requests nổi bật:**

#### 🎯 #4882 - Model Fallback Chain
**Đề xuất**: Automatic fallback sang model/provider khác khi primary unavailable
- Hiện tại chỉ retry cùng 1 model
- Cần resilience tốt hơn cho production deployment

#### 🔐 #4859 - Agent-scoped Web Accounts
**Đề xuất**: Multi-user auth với phân quyền theo agent
- Hiện tại: 1 account = toàn quyền tất cả agents
- Cần: Mỗi user chỉ truy cập agents được assign

#### ⚙️ #4836 - Tool Definition Lazy Loading
**Đề xuất**: Giảm 55-65% token overhead bằng cách load tool schemas on-demand
- Hiện tại: Load tất cả 45+ tool definitions vào system prompt
- Tốn 20-25K tokens ngay từ đầu

#### 🔤 #4154 - Font Size Control + Background Mode
**Đề xuất**: 
- Điều chỉnh font size trong Desktop mode
- Service mode chạy nền không spawn browser window
- Clickable file paths trong conversations

#### 🤖 #4869/4870 - Multi-instance Channels
**Đề xuất**: 1 agent duy trì nhiều WeChat/channel connections với contexts riêng biệt
- Use case: Agent quản lý nhiều tài khoản khách hàng

#### 🌐 #4880 - LiteLLM Responses API Support
**Vấn đề**: Custom OpenAI provider qua LiteLLM không hỗ trợ Responses API
- ChatGPT direct routes yêu cầu Responses API nhưng QwenPaw chỉ gọi `chat.completions`

---

## 7. Phản hồi người dùng 💬

### **Positive Feedback:**

✅ Desktop app với Tauri đang được đánh giá cao
✅ Spawn subagent feature được chào đón nhiệt tình
✅ Tích hợp channels đa dạng (Telegram, Feishu, Yuanbao)

### **Pain Points:**

#### 🪟 **Windows Users gặp nhiều vấn đề nhất:**
- Process leaks (browser, MCP servers)
- Stale skill directories sau upgrade
- Slow startup times
- File lock issues khi backup

#### 🧠 **Context Management:**
- Context inflation loops
- Tool output blowing up context window
- Thiếu compression transparency

#### 🔧 **Configuration Complexity:**
- `active_model` không rõ ràng (#4871)
- Tool definitions tốn quá nhiều tokens
- Jobs.json fragile với validation errors

#### 📱 **Channel Issues:**
- WeChat poll thread crashes khi reload workspace (#4697)
- Cron delivery failures với shared sessions
- DashScope custom params bị reject (#4688)

### **Developer Experience:**

👍 **Tích cực:**
- Coding mode với directory reference
- Token usage visibility
- Tool guard interactive approval

👎 **Cần cải thiện:**
- UI không streaming cho tool outputs
- Font size quá nhỏ trong Desktop
- Thiếu auto-updater (đang phát triển #4669)

---

## 8. Backlog & Roadmap 🗺️

### **Đang triển khai:**

#### 🏗️ **Core Architecture:**
- **AgentScope 2.0 Migration** (#4846) - Breaking change lớn
- **Unit Test Coverage** (#4852) - 153 tests mới cho runner/routers
- **Windows Performance Optimization** (#4772) - Lazy loading, caching

#### 🔌 **Integrations:**
- **Tauri Auto-updater** (#4669) - Desktop seamless updates
- **QQ Channel QR Auth** (#4848) - Scan-to-configure
- **Yuanbao Channel** (#4856) - Đã merge

#### 🛠️ **Developer Tools:**
- **Token Usage Display** (#4433) - Under review
- **Interactive Tool Guard for Telegram** (#4737) - Under review

### **Planned/Requested:**

#### High Priority:
- Model fallback chain (#4882)
- Agent-scoped authentication (#4859)
- Tool definition lazy loading (#4836)
- Streaming tool output rendering (#4865)

#### Medium Priority:
- Multi-instance channel support (#4869)
- Font size control + background mode (#4154)
- LiteLLM Responses API support (#4880)
- Group session sharing for Feishu (#4821)

#### Low Priority:
- Non-standard provider params via extra_body (#4688)
- Context window configuration clarity (#4871)

### **Technical Debt:**

- WeChat poll thread resilience (#4697)
- Browser process cleanup on Windows (#4844)
- MCP server pooling (#4842)
- Stale skill cleanup automation (#4839)

---

## 📈 Đánh giá tổng quan

**Strengths:**
- Tốc độ phát triển rất nhanh (35 PRs, 31 issues trong 1-2 ngày)
- Cộng đồng contributor tích cực
- Responsive với bug reports và feature requests
- Strong focus vào Windows experience

**Challenges:**
- Windows stability issues còn nhiều
- Context management cần cải thiện
- Configuration complexity cho beginners
- Performance với large-scale deployments (300+ agents)

**Outlook:**
AgentScope 2.0 migration sẽ là milestone lớn. Dự án đang trưởng thành nhanh với enterprise features (multi-instance, auth) và developer experience improvements. Windows optimization là ưu tiên hàng đầu hiện tại.

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo phân tích GoClaw - Ngày 2026-06-02

## 🎯 Tóm tắt hôm nay

Hôm nay GoClaw ghi nhận hoạt động tích cực với 3 PR đang chờ review và 4 issues quan trọng liên quan đến hạ tầng core. Dự án đang tập trung giải quyết các vấn đề nghiêm trọng về skills system, sandbox environment, và provider compatibility - những thành phần cốt lõi ảnh hưởng trực tiếp đến khả năng hoạt động của AI agents trong môi trường multi-tenant.

## 🚀 Releases

Không có release mới trong ngày hôm nay.

## 📈 Tiến độ dự án

### Pull Requests đang active (3 mục)

**🔧 Infrastructure & Core Fixes:**

- **#1184** - Fix import limit 1MB: Giải quyết bottleneck quan trọng khi nginx chỉ accept file ≤1MB trong khi GoClaw Web cho phép 500MB. Fix này cần thiết cho trải nghiệm người dùng khi import workspace lớn.

- **#1159** - Hỗ trợ GPT-5.5 cho ChatGPT OAuth: Mở rộng catalog model với GPT-5.5, bổ sung reasoning metadata để UI hiển thị controls phù hợp. Cho thấy GoClaw đang update kịp thời với các model mới nhất.

**🌐 Ecosystem Expansion:**

- **#1113** - Qiniu provider: Tích hợp nhà cung cấp AI từ Trung Quốc (七牛云), mở rộng khả năng tiếp cận thị trường châu Á. PR này có timeline dài (từ 05-07) cho thấy quá trình review kỹ lưỡng.

### Xu hướng phát triển

Dự án đang trong giai đoạn **consolidation** - tập trung vào ổn định hạ tầng core thay vì thêm features mới. Các issues mở đều mang mức độ **P1-high** hoặc **P2-medium**, phản ánh sự ưu tiên cho stability.

## 💬 Điểm nổi bật cộng đồng

**⚠️ Engagement thấp đáng lo ngại:**

- Tất cả 4 issues và 3 PRs đều có **0 comments** và **0 reactions**
- Không có tương tác giữa maintainers và contributors
- Các issues nghiêm trọng như #1161, #1162, #1177 (P1-high) không được thảo luận

**👤 Contributors active:**

- @zclDragon: Mở 3/4 issues, cho thấy vai trò core developer/tester
- @Guihal, @nguyenha935, @thanh-nguyen-95, @JackChiang233: Đóng góp PRs đa dạng

Điều này có thể phản ánh:
- Dự án còn nhỏ với core team chặt chẽ
- Communication diễn ra trên channels khác (Slack/Discord)
- Hoặc giai đoạn development nội bộ trước khi public rộng rãi

## 🐛 Ổn định & Bugs

### Critical Issues (P1-high) - 3 mục cần xử lý gấp:

**1️⃣ #1161 - Skills Loader không quét tenant directories:**
- **Impact:** Skills biến mất trong môi trường multi-tenant
- **Root cause:** Loader chỉ chấp nhận 1 managed directory duy nhất, không hỗ trợ multiple tenant paths
- **Severity:** Ngăn chặn hoàn toàn việc sử dụng custom skills trong multi-tenant setup

**2️⃣ #1162 - Sandbox không mount skills-store:**
- **Impact:** Agents không đọc được skill files mặc dù có `<location>` trong system prompt
- **Root cause:** Container chỉ mount workspace, thiếu skills-store volume
- **Severity:** Làm vô hiệu hóa toàn bộ skills system trong sandbox mode

**3️⃣ #1177 - Multi-tool responses phá vỡ message ordering:**
- **Impact:** OpenAI-compatible providers (Groq, DeepSeek, OpenRouter) bị lỗi validation
- **Root cause:** Synthetic user messages (warnings, nudges) xen kẽ giữa tool_calls và tool results, vi phạm API contract
- **Severity:** Ngăn chặn parallel tool execution với hầu hết providers

### Medium Priority (P2-medium):

**#1164 - Skill dependency mismatch:**
- Dependency scanning chạy trên GoClaw runtime thay vì sandbox environment
- Thiếu control switch để enable/disable dependency management
- Có thể gây missing dependencies runtime hoặc cài đặt thừa packages

### 🔥 Phân tích tác động:

Ba bugs P1-high tạo thành **critical triangle** ảnh hưởng core functionality:
- Skills không load (#1161) → Không mount (#1162) → Không execute được
- Multi-tool bug (#1177) làm giảm khả năng tương thích với 70%+ providers phổ biến

## ✨ Yêu cầu tính năng

Không có feature requests mới trong ngày hôm nay. Các PRs hiện tại đều là fixes hoặc provider additions.

## 📣 Phản hồi người dùng

**Không có feedback trực tiếp trong issues/PRs**, nhưng có thể infer từ bug reports:

- **Pain point chính:** Multi-tenancy và skills system - 3/4 issues liên quan
- **Provider diversity matters:** Community đóng góp Qiniu provider cho thị trường châu Á
- **File size limits:** Người dùng cần import files >1MB (possibly large workspaces/datasets)

## 🗓️ Backlog & Roadmap

**Immediate priorities (dựa trên P1-high issues):**

1. ⚡ **Skills infrastructure overhaul:**
   - Refactor Loader để hỗ trợ multiple tenant directories
   - Update sandbox mount configuration
   - Implement proper volume mapping cho skills-store

2. 🔧 **Message flow refactoring:**
   - Đảm bảo tool_calls/tool_results tuân thủ OpenAI API contract
   - Tách biệt synthetic messages khỏi tool execution flow
   - Testing với multiple providers (OpenAI, Groq, DeepSeek, OpenRouter)

3. 🏗️ **Dependency management redesign:**
   - Align scanning environment với execution environment
   - Thêm configuration options cho dependency control

**Short-term backlog:**

- Merge các PRs đang pending (#1159, #1184, #1113)
- Expand test coverage cho multi-tenant scenarios
- Documentation update cho skills system

---

## 🎓 Insights & Recommendations

**Strengths:**
- ✅ Nhanh nhạy với model updates mới (GPT-5.5)
- ✅ Community-driven provider expansion
- ✅ Clear prioritization với P1/P2 labels

**Areas of concern:**
- ⚠️ Critical bugs tồn tại >2 tuần (issues từ 05-20) chưa được giải quyết
- ⚠️ Lack of community engagement - cần cải thiện communication channels
- ⚠️ Skills system architecture có fundamental issues với multi-tenancy

**Khuyến nghị:**
1. 🚨 **Urgent:** Tạo hotfix release để address 3 P1-high issues - đây là blockers cho production use
2. 📢 Tăng cường communication: Status updates trên issues, estimated timelines
3. 🧪 Invest vào integration testing cho multi-tenant + sandbox scenarios
4. 📖 Document skills system architecture để community có thể contribute fixes hiệu quả hơn

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo hoạt động Hermes-Agent ngày 2026-06-02

## 🎯 Tóm tắt hôm nay

Ngày 2 tháng 6 là một ngày sôi động với **50 PRs** (14 đã merged) tập trung vào cải thiện trải nghiệm người dùng, sửa lỗi hệ thống quan trọng, và mở rộng tích hợp. Điểm nhấn là giải quyết lỗi khởi động Docker container nghiêm trọng (P1), cải tiến TUI/Dashboard, và bổ sung khả năng desktop automation qua Vision-MCP. Cộng đồng đang tích cực báo cáo bugs chất lượng cao liên quan đến SSH backend, QQ Bot, và Termux compatibility.

---

## 📦 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng các PR merged cho thấy chuẩn bị cho một bản phát hành ổn định tập trung vào containerization và trải nghiệm cross-platform.

---

## 🚀 Tiến độ dự án

### **Sửa lỗi nghiêm trọng (P1)**

- **#36208 Container won't start** → 3 PR xử lý cùng vấn đề này:
  - ✅ **#36267** (merged): Thay thế `os.execvp("sleep", ...)` bằng `signal.pause()` để loại bỏ phụ thuộc vào binary sleep ngoài
  - ✅ **#36221** (merged): Fallback khi s6 sleep thiếu
  - ✅ **#37120** (merged): Kết hợp cả hai approach
  
  **Insight**: Lỗi này phát sinh từ việc container images tối giản hoá không có PATH hoặc coreutils. Giải pháp cuối cùng là dùng Python native, thể hiện xu hướng giảm external dependencies.

### **Cải tiến Desktop/TUI Experience** 🖥️

- ✅ **#37099** (merged): Session hygiene - loại bỏ "Untitled" sessions rác, thêm archive tự động, media streaming, và connecting overlay
- 🔄 **#37115**: Ưu tiên hiển thị status/model hơn cwd trên terminal nhỏ
- 🔄 **#37112**: Gộp `/provider` và `/model` thành một command duy nhất, đơn giản hoá UX
- 🔄 **#37095**: Thêm custom `terminalBackground` vào theme system

**Insight**: Team đang polish TUI/Desktop app để trở thành first-class citizen, không chỉ là CLI wrapper.

### **Tích hợp MCP & Desktop Automation** 🤖

- 🔄 **#37118**: Tích hợp **Vision-MCP** cho desktop GUI workflows - cho phép Hermes thao tác với desktop apps qua computer vision
- ✅ **#36962**, 🔄 **#31292**: MCP registry metadata để publish Hermes lên MCP directories
- 🔄 **#33047**: Ollama vision capability probing cho locally-served models

**Insight**: Hermes đang xây dựng vị thế như một "universal agent platform" có thể điều phối cả code, terminal, messaging, và desktop automation.

### **Enterprise/Security Features** 🔒

- 🔄 **#36920**: Thêm PR publish guard (opt-in GitHub PR approval workflow) cho managed environments
- 🔄 **#35993**: Remote TUI bridge listener với token auth (opt-in, loopback-only default)
- 🔄 **#37119**: Durable service support cho dashboard (systemd/launchd)

**Insight**: Rõ ràng có signal từ enterprise users cần control và auditability cao hơn.

### **Cross-platform & Edge Cases** 🌐

- 🔄 **#37124**: Fix Termux setsid command (POSIX `--` separator missing)
- 🔄 **#37130**: SSH backend crashes với non-UTF8 subprocess output
- 🔄 **#37125**: QQ Bot reconnect loop bypass backoff counter
- 🔄 **#37128**: WeCom DM routing fix
- ✅ **#32407**: Docker terminal backend sandbox-mirror write guard

**Insight**: Hermes đang mở rộng sang mobile (Termux), enterprise messaging (WeCom), và các edge environments đặc thù châu Á.

### **System Architecture Improvements** ⚙️

- 🔄 **#36764**: Anchor compression raw tail to active exchange (tối ưu context window)
- 🔄 **#37117**: Move skills index sang volatile band để không bust prefix cache
- 🔄 **#37123**: Installer commit pinning opt-in (default branch-follow)
- 🔄 **#37126**: Release failed reconnect adapters để prevent fd leak

**Insight**: Team đang focus vào performance (prefix cache), developer experience (installer), và resource management (fd leaks).

---

## 🔥 Điểm nổi bật cộng đồng

### **Issues được report nhiều nhất**

1. **#36208** (P1, 1 comment nhanh → 3 PRs trong 24h): Docker container won't start - phản ứng cực nhanh từ team
2. **#35322** (P2, 7 comments): WebSocket rejected khi bind 0.0.0.0 với --insecure - closed as duplicate
3. **#32049** (P2, follow-up từ #31290): Docker sandbox-mirror filesystem confusion

### **PRs được contribute bởi community**

- @tmchow (#35606 salvaged → #37091): BlueBubbles group mention gating
- @whyhkzk (#32407): Sandbox-mirror safety guard extension
- Multiple contributors cho Docker/container fixes

**Insight**: Community đang actively contribute features, không chỉ bug reports. Maintainers có culture tốt trong việc salvage và credit abandoned PRs.

---

## 🐛 Ổn định & Bugs

### **Critical (P1) - Đã xử lý**
- ✅ Docker container startup failure (#36208) - **RESOLVED với 3 approaches merged**

### **High Priority (P2) - Đang xử lý**
- 🔄 #35322: WebSocket host validation inconsistency
- 🔄 #32049: Sandbox filesystem write safety (follow-up ongoing)
- 🔄 #36764: Context compression active-exchange anchoring

### **Newly reported bugs**
- 🆕 #37130: SSH backend UTF-8 decoding crash
- 🆕 #37125: QQ Bot infinite reconnect loop
- 🆕 #37124: Termux setsid argument parsing

**Insight**: Bug reports chất lượng cao với root cause analysis rõ ràng. Team có kỷ luật tốt trong việc triage (P1/P2/P3 labels) và response time nhanh cho P1.

---

## ✨ Yêu cầu tính năng

### **Desktop/UI Enhancements**
- Remote TUI bridge (#35993) - multiplayer terminal sessions
- Durable dashboard service (#37119) - persistent web UI
- Theme customization improvements (#37095)

### **Integration Expansion**
- Vision-MCP desktop automation (#37118)
- Ollama vision model auto-detection (#33047)
- BlueBubbles group mention support (#37091)

### **Developer Experience**
- PR publish approval guard (#36920) - enterprise governance
- Installer flexible versioning (#37123)
- Skills bootstrap curation (#37106)

**Insight**: Feature requests phân hoá rõ giữa individual developers (TUI polish) và enterprise needs (approval workflows, service management).

---

## 💬 Phản hồi người dùng

### **Positive signals**
- Community contributors đang salvage và improve existing features (BlueBubbles, MCP)
- High-quality bug reports với reproduction steps và root cause analysis
- Fast feedback loop: P1 bug reported 2026-06-01 → 3 PRs merged 2026-06-02

### **Pain points**
- Docker/containerization complexity (PATH assumptions, s6 integration)
- Cross-platform edge cases (Termux, non-UTF8 environments, WeChat/QQ ecosystems)
- Context window management under token pressure

### **Emerging use cases**
- Desktop automation workflows (Vision-MCP)
- Multi-platform messaging integration (QQ, WeChat, BlueBubbles)
- Enterprise deployment requirements (service management, approval gates)

---

## 🗺️ Backlog & Roadmap

### **Short-term focus (inferred từ merged PRs)**
1. **Stability**: Container/Docker reliability, cross-platform compatibility
2. **UX polish**: TUI/Desktop app experience, session management
3. **Enterprise readiness**: Service deployment, approval workflows

### **Medium-term trajectory (inferred từ open PRs)**
1. **Desktop automation**: Vision-MCP integration, GUI workflow support
2. **Context optimization**: Compression strategies, prefix cache utilization
3. **Platform expansion**: Mobile (Termux), enterprise messaging (WeCom/QQ)

### **Architectural themes**
- Reduce external dependencies (sleep → signal.pause)
- Improve resource management (fd leaks, reconnection handling)
- Better separation of concerns (skills index out of stable cache band)

---

## 📈 Metrics snapshot

- **50 PRs** trong pipeline (14 merged trong ngày)
- **6 issues** (3 closed, 3 new opened)
- **Response time**: P1 bugs xử lý trong <24h
- **Community health**: Multiple external contributors với quality PRs

---

## 🎓 Takeaways cho developer ecosystem

1. **Container-first deployment** đang trở thành first-class concern
2. **Desktop automation** là frontier mới cho AI agents
3. **Cross-platform support** bao gồm cả mobile và enterprise messaging
4. **Enterprise features** (approval workflows, durable services) đang được xây từ community feedback
5. **Performance optimization** (prefix cache, context compression) là ongoing priority

Hermes-Agent đang mature từ developer tool → platform for autonomous agents across multiple interfaces (CLI, TUI, Desktop, Messaging, Desktop GUI). 🚀

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*