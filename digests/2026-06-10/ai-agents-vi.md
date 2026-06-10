# Bản tin Hệ sinh thái OpenClaw 2026-06-10

> Issues: 172 | PRs: 492 | Dự án: 11 | Thời gian tạo: 2026-06-10 02:00 UTC

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

# Báo cáo phân tích dự án OpenClaw - 2026-06-10

## 1. 📊 Tóm tắt hôm nay

Dự án OpenClaw tiếp tục duy trì nhịp độ phát triển cao với **2 releases** (v2026.6.5 và beta.6) được phát hành ngày 09/06. Hoạt động tập trung vào việc sửa lỗi nghiêm trọng liên quan đến **message delivery**, **session state**, và **memory management**. Cộng đồng đang phản ánh nhiều về các vấn đề regression trong phiên bản 2026.5.x, đặc biệt là context compaction và embedded run stability.

---

## 2. 🚀 Releases

### v2026.6.5 (Stable) & v2026.6.5-beta.6

**Các tính năng chính:**

- **QQBot content filtering**: Loại bỏ model reasoning scaffolding (`<thinking>`) trước khi gửi tin nhắn, ngăn nội dung internal leak ra channel (#89913, #90132)
- **MCP tool result coercion**: Xử lý các content block phức tạp (resource_link, audio, malformed image) để tránh lỗi 400 từ Anthropic và poisoned session history (#90710, #90728)
- **Regression fixes**: Sửa nhiều lỗi nghiêm trọng từ các phiên bản 5.x

**Ý nghĩa:**
- Cải thiện đáng kể **data safety** và **channel delivery reliability**
- Tăng cường tính tương thích với MCP ecosystem
- Phản ánh sự ưu tiên xử lý các regression nghiêm trọng trước khi phát triển tính năng mới

---

## 3. 📈 Tiến độ dự án

### PRs quan trọng đang active:

**🔴 Mức độ ưu tiên cao (P1):**

1. **#91803** - fix(imessage): Stage remote media trước plugin dispatch
   - Giải quyết race condition trong iMessage media handling
   - Ngăn plugin nhận stale metadata

2. **#91801** - fix(logging): Release stuck session lanes sau drained abort
   - Sửa deadlock khi session abort cleanly nhưng lane vẫn stuck
   - Critical cho WhatsApp/Telegram stability

3. **#91797** - fix(embedded-agent-runner): Xử lý no-op session rewrite
   - Giải quyết `EmbeddedAttemptSessionTakeoverError` trên streaming turns
   - Ảnh hưởng Matrix/Telegram channels

4. **#91794** - fix(cron): Treat disabled heartbeat as success
   - Ngăn one-shot cron retry vô hạn khi heartbeat disabled
   - Cải thiện cron reliability

**🟡 Các PR đáng chú ý khác:**

- **#81851** - feat(anthropic): claude-cli-interactive backend với streaming reasoning qua local TLS proxy (size: XL, cần proof)
- **#91091** - fix(memory): Không prune session index từ failed directory scan (maintainer review)
- **#89040** - perf: Tránh event-loop stall trong embedded_run bootstrap (14-22s blocking)

### Xu hướng phát triển:

📌 **Focus chính**: Stability over features
- Đa số PR là bug fixes và performance improvements
- Nhiều regression fixes cho phiên bản 5.x
- Tập trung vào message delivery reliability và session state integrity

📌 **Technical debt**: 
- Memory management issues đang được ưu tiên xử lý
- Event-loop blocking problems (nhiều reports về 14-22s stalls)
- Session lock timeout và deadlock scenarios

---

## 4. 🌟 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

1. **#25592** (29 comments) - **Text between tool calls leaks to messaging channels**
   - Vấn đề UX nghiêm trọng: internal processing output leak ra Slack/iMessage
   - Được đánh giá `🦞 diamond lobster` (mức độ quan trọng cao)
   - Status: đã có linked PR open

2. **#88312** (15 comments) - **Codex app-server turn-completion stall regression**
   - Regression từ 2026.5.27: "Codex stopped before confirming turn complete"
   - Đã được fix trước đó (#84076, #85107) nhưng bị regress
   - Community frustration cao với recurring issues

3. **#87307** (14 comments) - **Matrix thread replies sent as normal replies**
   - Regression từ 2026.5.22
   - `/status` và `/model` commands silent
   - Ảnh hưởng Matrix user experience nghiêm trọng

### Vấn đề người dùng quan tâm nhất:

🔥 **Message loss** - Xuất hiện trong nhiều scenarios:
- Heartbeat-driven replies stuck (#83184)
- WhatsApp session stalls (#84569)
- Subagent delivery lanes blocked (#86538)

🔥 **Memory management**:
- Gateway heap grows unbounded (#89315, #87109)
- Index identity corruption (#91167)
- Memory search failures after compaction

---

## 5. 🐛 Ổn định & Bugs

### Critical bugs đang được xử lý:

**🚨 Regression Issues (P1):**

1. **Session state corruption**:
   - `EmbeddedAttemptSessionTakeoverError` trên Discord/Telegram (#86508, #91797)
   - Session write-lock timeouts block delivery lanes (#86538)
   - Stale processing claims sau gateway recreate (#84674)

2. **Memory system instability**:
   - Gateway mở empty database khi main.sqlite absent (#91216)
   - QMD memory_search trigger synchronous force sync và stall turns (#90023)
   - Heap growth đến 1073MB+ trên macOS (#87109)

3. **Channel-specific issues**:
   - WhatsApp: long model_call stalls, incomplete turns (#84569)
   - Matrix: thread replies regression (#87307)
   - Telegram: isolated ingress spool blocked (#84674)

**⚠️ Security concerns:**

- Docker sandbox advertises host skill paths (#91761) - potential security boundary violation
- Text between tool calls leaks (#25592) - information disclosure
- File permissions hardcoded, breaks multi-user setups (#56263)

### Pattern nhận diện:

- Nhiều issues liên quan đến **embedded agent runner** và **session locking**
- Event-loop blocking là root cause của nhiều timeouts
- Compaction logic có nhiều edge cases chưa xử lý

---

## 6. 💡 Yêu cầu tính năng

### Feature requests đáng chú ý:

1. **#7524** (4👍) - **groupScope option** để consolidate group sessions vào main
   - Hiện tại groups luôn isolated, không có equivalent của `dmScope: "main"`
   - Use case: unified context across DMs và groups

2. **#90354** (6 comments) - **Bounded/validated append semantics** cho pre-compaction memory flush
   - Add hard guardrails cho append size
   - Post-write validation
   - Silent failure handling

3. **#87325** - **Azure Foundry GPT Realtime Talk** support via gateway relay
   - Extend Talk support cho Azure AI Foundry deployments
   - Currently chỉ support OpenAI Realtime

4. **#56276** - **Show hostname in TUI status bar**
   - Helpful cho multi-machine Tailscale setups
   - Simple UX improvement

### Trend:

- Community muốn **more configuration flexibility** (groupScope, file permissions)
- **Better multi-environment support** (Azure, self-hosted)
- **Improved observability** (hostname display, better diagnostics)

---

## 7. 💬 Phản hồi người dùng

### Positive feedback:

✅ **#90092** - Thank you note cho v2026.6.1 dashboard accessibility
- Blind user với VoiceOver: chat controls giờ accessible hơn nhiều
- Appreciated improvement trong a11y

### Negative sentiment:

❌ **Cost concerns**:
- **#91016** (3👍) - ⚠️ DeepSeek Prompt Cache hoàn toàn failed sau upgrade 2026.6.1, đốt ~$6/giờ
- User rất frustrated với cost impact từ regression

❌ **Reliability frustration**:
- Nhiều comments về recurring regressions (issues được fix rồi bị regress)
- #88312: "worked before, now fails" - community trust bị ảnh hưởng

❌ **Silent failures**:
- #90185: `/compact` reply bị dropped silently trên all channels
- #80700: Followup agent silent-drops trên billing/quota rejection
- Users không biết có issue cho đến khi investigate logs

### User pain points tóm tắt:

1. **Predictability**: Features hoạt động rồi lại break
2. **Visibility**: Nhiều failures xảy ra silently
3. **Cost**: Regressions có thể gây unexpected billing spikes
4. **Multi-version support**: Hard để maintain stable deployments

---

## 8. 🗺️ Backlog & Roadmap

### Inferred priorities từ issue labels:

**Immediate focus (Sprint hiện tại):**

🎯 **Message delivery reliability** (clawsweeper labels suggest automated tracking):
- Fix all `impact:message-loss` issues
- Session state integrity
- Embedded run stability

🎯 **Memory system stabilization**:
- Heap growth issues
- Index corruption scenarios
- Performance optimization (event-loop blocking)

🎯 **Regression cleanup**:
- Systematically fix 2026.5.x regressions
- Improve test coverage để prevent re-regressions

**Medium term (Backlog):**

📋 **Feature debt**:
- groupScope configuration (#7524)
- Azure Foundry Talk support (#87325)
- Enhanced memory flush semantics (#90354)

📋 **Security hardening**:
- File permissions configurability (#56263)
- Docker sandbox path isolation (#91761)
- Hook rejection diagnostics (#86607)

📋 **Developer experience**:
- Better error messages và diagnostics
- Improved observability tools
- Documentation updates

### Technical architecture shifts:

Dự án đang trong giai đoạn **stability consolidation**:
- Ít feature mới, focus vào fixing foundation
- Nhiều PRs marked `needs-real-behavior-proof` → tăng cường testing requirements
- `merge-risk` labels được apply nghiêm ngặt → careful release management

### Community-driven priorities:

Từ issue ratings (`🦞 diamond lobster`, `🐚 platinum hermit`, etc.), maintainers đang:
- Prioritize security và data-loss issues
- Track community impact thông qua reaction counts
- Use automated tooling (clawsweeper) để triage

---

## 📌 Kết luận

OpenClaw đang trải qua giai đoạn **maturation pains** sau rapid feature development. Team đang tập trung đúng hướng vào stability, nhưng cần:

1. **Improve regression testing** - quá nhiều re-regressions
2. **Better error visibility** - silent failures gây user frustration
3. **Cost awareness** - regressions có thể gây billing surprises
4. **Clearer communication** - về breaking changes và migration paths

Community vẫn active và engaged, nhưng sentiment có dấu hiệu negative từ reliability issues. Release v2026.6.5 là bước đi đúng hướng với nhiều critical fixes.

---

## So sánh hệ sinh thái chéo

# 🔬 Báo cáo So sánh Hệ sinh thái AI Agent - 10/06/2026

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang ở giai đoạn **consolidation** sau một năm phát triển bùng nổ. Từ dữ liệu 10 dự án phân tích, có thể thấy rõ 3 làn sóng phát triển song song:

### Làn sóng 1: Platform Maturation (OpenClaw, Hermes-Agent, CoPaw)
- **Đặc điểm**: Số lượng issues/PRs cao, focus vào stability over features
- **Giai đoạn**: Chuyển từ MVP sang production-ready
- **Thách thức chính**: Regression bugs, memory management, multi-channel reliability

### Làn sóng 2: Architecture Refactoring (NanoBot, IronClaw, Zeroclaw)
- **Đặc điểm**: Breaking changes lớn, redesign core systems
- **Giai đoạn**: Technical debt cleanup, scalability preparation
- **Thách thức chính**: Backward compatibility, migration complexity

### Làn sóng 3: Ecosystem Expansion (PicoClaw, GoClaw, NanoClaw)
- **Đặc điểm**: Plugin systems, multi-provider support, integration sprawl
- **Giai đoạn**: Building moats through ecosystem effects
- **Thách thức chính**: Security boundaries, testing coverage, fragmentation risk

**Dự án đặc biệt**:
- **LobsterAI**: Niche focus (orchestration), nhỏ nhưng technical depth cao
- **Moltis**: Không có hoạt động (possibly dormant/private dev)

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Mức độ tương tác | Giai đoạn | Độ ưu tiên |
|-------|--------|-----|----------|------------------|-----------|------------|
| **OpenClaw** | 172 | 492 | 2 | 🔥🔥🔥🔥 | Consolidation | Stability |
| **Hermes-Agent** | 11 | 50 | 0 | 🔥🔥🔥🔥 | Polish | Production UX |
| **CoPaw** | 28 | 35 | 1 | 🔥🔥🔥 | Beta cycle | Performance |
| **Zeroclaw** | 27 | 50 | 0 | 🔥🔥🔥 | Expansion | Channel coverage |
| **IronClaw** | 4 | 50 | 0 | 🔥🔥 | Refactoring | Architecture |
| **NanoBot** | 6 | 23 | 0 | 🔥🔥 | Stabilization | Memory system |
| **PicoClaw** | 20 | 19 | 1 | 🔥 | Security audit | Vulnerability fixes |
| **NanoClaw** | 1 | 43 | 0 | 🔥 | Backlog cleanup | Modularity |
| **GoClaw** | 2 | 3 | 0 | 💤 | Low activity | Bug fixes |
| **LobsterAI** | 2 | 5 | 0 | 💤 | Niche dev | Orchestration |
| **Moltis** | 0 | 0 | 0 | ⚰️ | Dormant | N/A |

### Chỉ số tổng hợp:

| Metric | Tổng | Trung bình | Median |
|--------|------|------------|--------|
| **Issues** | 301 | 27.4 | 11 |
| **PRs** | 770 | 70 | 35 |
| **Releases** | 4 | 0.36 | 0 |
| **Active projects** | 9/11 | - | - |

---

## 3. 🎯 Vị thế của OpenClaw

### Vị trí trong hệ sinh thái:

OpenClaw đang ở vị trí **market leader** với:

✅ **Thống trị về quy mô**:
- Issues: 172 (57% tổng hệ sinh thái)
- PRs: 492 (64% tổng hệ sinh thái)
- Community engagement cao nhất (29 comments trên single issue)

✅ **Mature release cycle**:
- Duy nhất có 2 releases trong 1 ngày (v2026.6.5 + beta.6)
- Rapid iteration model: fix bugs → release → gather feedback

✅ **Production deployment focus**:
- Message delivery reliability (#25592, #88312)
- Multi-channel support (WhatsApp, Telegram, Matrix, Slack)
- Enterprise concerns (memory management, session state)

### Điểm yếu so với competitors:

⚠️ **Regression problem**:
- Nhiều features được fix rồi lại break (#88312: "worked before, now fails")
- Community trust bị ảnh hưởng

⚠️ **Technical debt visibility**:
- Memory heap grows unbounded (#89315, #87109)
- Event-loop blocking (14-22s stalls)
- Context compaction edge cases

⚠️ **Cost concerns**:
- DeepSeek Prompt Cache regression đốt $6/hour (#91016)
- Silent failures gây unexpected billing spikes

### Lợi thế cạnh tranh:

🚀 **Network effects**:
- Largest contributor base
- Most comprehensive channel coverage
- Richest skill/plugin ecosystem

🚀 **Developer tools**:
- Best observability (gateway metrics, session diagnostics)
- Mature debugging workflows
- Extensive documentation

🚀 **Community momentum**:
- Active Discord/forum discussions
- Quick issue triage (clawsweeper automation)
- Responsive maintainers

### Strategic positioning:

OpenClaw đang theo **"platform play"** strategy:
- Không cạnh tranh về raw features
- Focus vào reliability, multi-channel ubiquity, và ecosystem depth
- Đối thủ gần nhất: Hermes-Agent (UX polish) và Zeroclaw (security-first)

---

## 4. 🔧 Hướng kỹ thuật chung

### Trends được nhiều dự án áp dụng:

#### 1️⃣ **Multi-Provider Abstraction**

**Ai đang làm**: OpenClaw, NanoClaw (#1690), Hermes-Agent (#43185), Zeroclaw (#5937)

**Pattern chung**:
```
Problem: Vendor lock-in với Claude/OpenAI
Solution: Provider abstraction layer
  ├─ Unified API contract
  ├─ Model capability negotiation
  └─ Fallback/routing logic
```

**Technical challenges**:
- Different tool calling formats (function_call vs tool_use)
- Context window variations
- Streaming vs batch modes
- Temperature/reasoning model incompatibilities

**Winner pattern**: Zeroclaw's `ProviderRegistry` với explicit capability declarations

---

#### 2️⃣ **Memory System Evolution**

**Progression observed**:
```
Gen 1 (Basic): Flat history in SQLite/JSON
         ↓
Gen 2 (Compaction): Sliding window + summarization
         ↓
Gen 3 (Semantic): Vector embeddings + retrieval
         ↓
Gen 4 (Hierarchical): Multi-tier memory (working/long-term/episodic)
```

**Implementations by stage**:
- Gen 2: OpenClaw, NanoBot
- Gen 3: IronClaw (trajectory observers), CoPaw (hierarchical proposal #4994)
- Gen 4: Hermes-Agent (unforgit memory #43190)

**Common pain points**:
- Context budget exceeded (#5808 IronClaw)
- Memory search stalls (#90023 OpenClaw)
- Cross-session pollution (#4259 NanoBot)

---

#### 3️⃣ **Session State Management**

**Problem space**:
- Multi-turn conversations
- Concurrent channels
- Process restarts
- Subagent coordination

**Architecture patterns**:

| Pattern | Projects | Trade-offs |
|---------|----------|------------|
| **Agent-keyed global** | OpenClaw, NanoBot | Simple but scales poorly |
| **Project-scoped** | IronClaw (#4662) | Better isolation, complex routing |
| **Embedded runner** | OpenClaw (#91797) | Performance, but deadlock prone |
| **Reborn composition** | IronClaw | Durable, needs refactor (#4666) |

**Emerging best practice**: Project-scoped with MountView-based storage (IronClaw)

---

#### 4️⃣ **MCP (Model Context Protocol) Integration**

**Adoption wave**:
- **Early**: OpenClaw (MCP tool result coercion #90710)
- **Active**: GoClaw (OAuth 2.1 #1196), NanoClaw (#1728 env vars)
- **Mature**: PicoClaw (OpenSandbox bridge #5043)

**Integration challenges**:
- **Auth**: Most struggle with credential passing (NanoClaw #1728, IronClaw #4561)
- **Tool discovery**: Schema passthrough issues (Hermes #43209)
- **Security**: SSRF risks (PicoClaw #3078, #3077, #3074)

**Best practice emerging**: GoClaw's OAuth 2.1 flow với PKCE + refresh tokens

---

#### 5️⃣ **Observability Infrastructure**

**Maturity levels**:

```
Level 1: Logs only
Level 2: Structured logs + traces
Level 3: OpenTelemetry spans
Level 4: Real-time dashboards + alerts
```

**Current state**:
- Level 4: OpenClaw (gateway metrics, clawsweeper), Zeroclaw (observability RFC #7232)
- Level 3: IronClaw (trajectory hooks #4588), Hermes-Agent (diagnostic context requests)
- Level 2: NanoBot, CoPaw
- Level 1: Others

**Key insight**: Observability correlates strongly with production readiness

---

## 5. 🎭 Điểm khác biệt

### 5.1 Chiến lược sản phẩm

#### **OpenClaw - "Swiss Army Knife"**
```
Philosophy: Comprehensive platform
Strengths: Channel breadth, skill ecosystem
Weaknesses: Complexity, maintenance burden
Target: Enterprise multi-channel deployments
```

#### **Hermes-Agent - "Desktop-first Experience"**
```
Philosophy: Developer IDE integration
Strengths: UX polish, terminal pane, kanban
Weaknesses: Channel support lagging
Target: Individual developers, power users
```

#### **Zeroclaw - "Security-first Platform"**
```
Philosophy: Safety & auditability
Strengths: RBAC (#5982), hook quarantine
Weaknesses: Feature velocity
Target: Regulated industries, enterprise compliance
```

#### **CoPaw (QwenPaw) - "Localization Champion"**
```
Philosophy: Chinese market optimization
Strengths: Feishu/DingTalk/WeChat deep integration
Weaknesses: International adoption
Target: Chinese enterprise market
```

#### **IronClaw - "Architecture Excellence"**
```
Philosophy: Clean abstractions, scalability
Strengths: Modular design, test coverage
Weaknesses: Slower feature delivery
Target: Large-scale deployments, SDK users
```

---

### 5.2 Độ mở của hệ sinh thái

| Dự án | Plugin System | Skill Marketplace | Custom Providers | Extension API |
|-------|---------------|-------------------|------------------|---------------|
| OpenClaw | ⭐⭐⭐ | Skill registry | ✅ Full | ✅ Complete |
| Hermes-Agent | ⭐⭐ | Emerging | ✅ Full | ⚠️ Limited |
| NanoClaw | ⭐⭐⭐ | #1309 Marketplace | ✅ Full | ✅ Complete |
| Zeroclaw | ⭐⭐ | Planned | ✅ Full | ✅ Complete |
| IronClaw | ⭐ | Reborn-only | ✅ Full | ⚠️ SDK-focused |
| CoPaw | ⭐⭐ | #5023 UI | ✅ Full | ⚠️ Limited |
| Others | ⭐ or less | No | Partial | No |

**Winner**: NanoClaw (most modular) và OpenClaw (most ecosystem)

---

### 5.3 Cộng đồng & Governance

#### **Mô hình đóng góp**:

**OpenClaw**: Core team + vetted external contributors
- Automated triage (clawsweeper)
- Strict merge-risk labels
- High bar for PRs (needs-real-behavior-proof)

**Hermes-Agent**: Core team + growing community
- 25 unique contributors in 1 day
- Multi-reviewer system (8 reviewers on #43185)
- Fast iteration, less strict gates

**IronClaw**: Small core team + occasional external
- Most PRs from zmanian, henrypark133, ilblackdragon
- High quality bar (comprehensive tests required)
- Slow but deliberate

**CoPaw**: Hybrid (corporate + community)
- Strong Qwen/AgentScope team involvement
- Community feature requests actively addressed
- Localization-first mindset

---

### 5.4 Release Philosophy

| Approach | Projects | Pros | Cons |
|----------|----------|------|------|
| **Rapid releases** | OpenClaw (2 in 1 day) | Fast feedback loop | Risk of regressions |
| **Beta cycles** | CoPaw (v1.1.11-beta.2) | Controlled testing | Slower adoption |
| **Continuous main** | Hermes, Zeroclaw | Always latest | Instability risk |
| **Milestone-based** | IronClaw | Predictable | Slow feature delivery |

**No clear winner** - depends on use case

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Tier 1: Mature Communities (>50 contributors, active discussions)

**🥇 OpenClaw**
- ✅ Automated tooling (clawsweeper)
- ✅ Community ratings (lobster/hermit emojis)
- ✅ Multi-channel support forums
- ✅ Comprehensive docs
- ⚠️ Trust issues from regressions

**🥈 Hermes-Agent**
- ✅ Active PR reviews (multi-reviewer culture)
- ✅ Diverse contributor base
- ✅ Quick issue responses
- ⚠️ Documentation gaps for production deployments

---

### Tier 2: Growing Communities (10-50 contributors)

**Zeroclaw**
- ✅ Responsive maintainers (9 PRs merged in 1 day)
- ✅ Clear RFC process (observability #7232)
- ⚠️ Small contributor base (mostly core team)
- ⚠️ Beta stability issues

**CoPaw**
- ✅ Strong corporate backing (Qwen team)
- ✅ Localization quality
- ⚠️ English documentation lacking
- ⚠️ International community small

**IronClaw**
- ✅ High technical standards
- ✅ New contributor onboarding (abbyshekit)
- ⚠️ Mostly core team PRs
- ⚠️ Steep learning curve

---

### Tier 3: Early Stage (<10 active contributors)

**NanoBot, PicoClaw, NanoClaw, GoClaw, LobsterAI**
- ⚠️ Low issue interaction (0-3 comments typical)
- ⚠️ Few external contributors
- ⚠️ Limited documentation
- ⚠️ Narrow use case focus

---

### Community Health Indicators:

| Indicator | OpenClaw | Hermes | Zeroclaw | CoPaw | IronClaw | Others |
|-----------|----------|--------|----------|-------|----------|--------|
| **Response time** | <24h | <12h | <24h | <48h | <48h | Varies |
| **PR review depth** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| **Documentation** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| **Onboarding ease** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ | ⭐ |
| **Governance transparency** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |

---

## 7. 🔮 Tín hiệu xu hướng

### 7.1 Ngắn hạn (Q3 2026)

#### **Trend 1: Convergence on MCP**
**Evidence**: 6/11 projects đang implement MCP integration

**Prediction**: MCP sẽ trở thành de facto standard cho tool protocols
- Winners: Projects có OAuth 2.1 flows (GoClaw)
- Losers: Proprietary tool formats

**Impact on OpenClaw**: Cần accelerate MCP adoption để không bị bỏ lại phía sau

---

#### **Trend 2: Memory System Wars**
**Evidence**: Mọi project đều có memory-related issues

**Prediction**: Gen 4 hierarchical memory sẽ emerge as standard
- Hermes-Agent's unforgit approach có thể dẫn đầu
- Semantic search trở thành table stakes

**Impact on OpenClaw**: Memory system là biggest technical debt, cần priority refactor

---

#### **Trend 3: Desktop-first vs Cloud-first Split**
**Evidence**: 
- Desktop focus: Hermes, CoPaw (Tauri migrations)
- Cloud focus: OpenClaw, Zeroclaw (gateway architectures)

**Prediction**: Market sẽ phân tách rõ ràng
- Enterprise → Cloud platforms (OpenClaw, Zeroclaw)
- Developers → Desktop apps (Hermes, CoPaw)

**Impact on OpenClaw**: Cần rõ ràng positioning, tránh "stuck in the middle"

---

### 7.2 Trung hạn (Q4 2026 - Q1 2027)

#### **Trend 4: Multi-Model Orchestration**
**Evidence**:
- NanoClaw #1690 (multi-runtime abstraction)
- LobsterAI (cross-model coordination #2132)
- IronClaw (project-scoped ownership)

**Prediction**: Agents sẽ route tasks đến specialized models
- Planning: Claude Opus / GPT-5
- Execution: DeepSeek / Local models
- Vision: Specialized vision models

**Technical requirement**: Sophisticated orchestration layers

**Impact on OpenClaw**: Provider abstraction cần support model routing logic

---

#### **Trend 5: Security Becomes Differentiator**
**Evidence**: PicoClaw's 13 security advisories in 1 day

**Prediction**: Enterprise adoption gated by security posture
- RBAC (Zeroclaw #5982)
- Audit trails (IronClaw security boundaries)
- Sandbox isolation (OpenSandbox integrations)

**Impact on OpenClaw**: Security audit cần thực hiện systematic, không chỉ reactive

---

#### **Trend 6: Plugin Marketplace Maturation**
**Evidence**:
- NanoClaw #1309 (Skill Marketplace)
- CoPaw #5023 (Plugin Market UI)
- Hermes community plugins

**Prediction**: Network effects sẽ tập trung vào 2-3 platforms
- Giống App Store/Play Store dynamics
- Winner-take-most market

**Impact on OpenClaw**: Plugin quality & curation sẽ quyết định ai thắng

---

### 7.3 Dài hạn (2027+)

#### **Trend 7: Agent-to-Agent (A2A) Protocols**
**Evidence**:
- IronClaw (Reborn composition, agent ownership)
- LobsterAI (agent collaboration bus #2937)
- OpenClaw (session coordination complexity)

**Prediction**: Agents sẽ cần communicate với nhau seamlessly
- Standard protocols giống HTTP
- Distributed agent networks
- Marketplace for specialized agents

**Strategic question**: Ai sẽ định nghĩa A2A protocol standard?

---

#### **Trend 8: "Self-Evolving" Agents**
**Evidence**: 
- Hermes-Agent mention trong NanoClaw #5017
- Learning loop discussions
- Skill generation automation

**Prediction**: Agents học từ interactions, tự develop skills
- Ít manual skill programming
- More AI-generated workflows
- Quality control becomes critical

**Risk**: "AI generating AI code" quality concerns

---

#### **Trend 9: Vertical Specialization**
**Evidence**: 
- CoPaw → Chinese enterprise
- LobsterAI → Orchestration niche
- Zeroclaw → Security-first

**Prediction**: Horizontal platforms (OpenClaw, Hermes) sẽ compete với vertical specialists
- Similar to Salesforce vs vertical SaaS
- Depth vs breadth trade-off

**Strategic choice**: OpenClaw cần quyết định platform play hay vertical focus

---

## 8. 🎯 Khuyến nghị chiến lược cho OpenClaw

### 🔴 Critical (0-3 tháng)

1. **Stabilization Sprint**
   - Fix top 10 regression bugs
   - Memory system refactor
   - Eliminate silent failures
   - **Goal**: Restore community trust

2. **Security Audit**
   - Learn from PicoClaw's 13 advisories
   - Systematic penetration testing
   - Public security posture statement
   - **Goal**: Enterprise readiness

3. **MCP Acceleration**
   - Complete OAuth 2.1 implementation
   - Tool schema passthrough fixes
   - MCP server showcase
   - **Goal**: Don't fall behind on standards

---

### 🟡 Important (3-6 tháng)

4. **Memory 2.0 Architecture**
   - Study Hermes unforgit approach
   - Implement hierarchical memory
   - Semantic search foundation
   - **Goal**: Technical differentiation

5. **Plugin Marketplace v2**
   - Curation & quality control
   - Revenue sharing model
   - Developer incentives
   - **Goal**: Lock in network effects

6. **Multi-Model Routing**
   - Implement intelligent model selection
   - Cost optimization algorithms
   - Capability-based routing
   - **Goal**: Reduce operational costs

---

### 🟢 Strategic (6-12 tháng)

7. **Platform Positioning Clarity**
   - Decide: Desktop vs Cloud vs Hybrid
   - Target customer definition
   - Competitive moat identification
   - **Goal**: Clear value proposition

8. **Agent-to-Agent Protocol**
   - Design A2A communication standard
   - Reference implementation
   - Developer SDK
   - **Goal**: Set the standard, own the ecosystem

9. **Self-Evolution Framework**
   - Skill generation pipeline
   - Quality guardrails
   - Learning loop infrastructure
   - **Goal**: Future-proof architecture

---

## 📊 Tổng kết

### OpenClaw's Position Today:
```
Strengths:  ████████████████████ (Market leader)
Community:  ███████████████      (Largest, but trust issues)
Tech Debt:  ████████             (Memory, regressions)
Innovation: ██████               (Following, not leading)
Security:   ███████              (Good, but needs audit)
```

### Competitive Landscape:
```
                    Features
                        ↑
                        │
         OpenClaw ●     │     ● Hermes (UX)
                        │
                        │
    IronClaw ●          │          ● Zeroclaw
    (Architecture)      │          (Security)
                        │
────────────────────────┼────────────────────→ Stability
                        │
         CoPaw ●        │     ● NanoClaw
         (Localization) │     (Modularity)
                        │
                        ↓
```

### Key Takeaway:

OpenClaw đang ở **crossroads**:
- Path A: Double down trên platform play → cần fixes stability & security ASAP
- Path B: Pivot sang vertical → choose specialization (e.g., enterprise, developer tools)

**Recommendation**: Path A với condition - 3 tháng "no new features, only fixes" để restore trust. Sau đó aggressive push trên MCP, memory 2.0, và A2A protocols để maintain leadership.

Thất bại trong stabilization = mất leadership position cho Hermes hoặc Zeroclaw.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích NanoBot - 10/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 10/06 chứng kiến hoạt động mạnh mẽ với 23 PRs và 6 issues mới, tập trung vào 3 hướng chính: **cải thiện độ tin cậy hệ thống bộ nhớ**, **tăng cường tính năng WebUI**, và **mở rộng hỗ trợ provider/channel**. Đáng chú ý là các bản sửa lỗi quan trọng về context management (#4259, #4264) và compatibility với GPT-5 series (#4261, #4263, #4268).

---

## 🚀 Releases

Không có release chính thức trong 24h qua.

---

## 📈 Tiến độ dự án

### 🔥 Các PR quan trọng đã merge

#### **🧠 Memory & Context Management** (Ưu tiên cao)
- **#4208** ✅ Fork conversation từ assistant reply (WebUI) - cho phép người dùng tạo nhánh hội thoại từ bất kỳ response nào
- **#4258** ✅ Email channel post-actions (move/delete) - giữ mailbox sạch sẽ tự động
- **#4252** ✅ Render TeX math trong WebUI - hỗ trợ `\(...\)`, `\[...\]`, và `$...$`
- **#4177** ✅ Docs overhaul - làm mới documentation cho beginners

#### **🔧 Bug fixes được triển khai**
- **#4190** ✅ Strict tool call validation - không còn im lặng repair malformed arguments
- **#3434** ✅ LaTeX rendering cho Feishu channel qua CodeCogs API
- **#3400** ✅ Dream config cho phép bảo vệ SOUL.md/USER.md khỏi auto-edit

### 🚧 Các PR đang review (Cần chú ý)

#### **🐛 Critical bugs**
- **#4267** - Fix WebUI silently drop assistant replies (bug nghiêm trọng về hiển thị)
- **#4266** - Fix `apply_patch` không giữ line separation khi add code
- **#4256** - Fix memory cursor không monotonic, gây conflict trong history tracking

#### **🔌 Provider compatibility**
- **#4268** / **#4263** - Duplicate PRs fix GPT-5/o-series max_tokens → max_completion_tokens
- **#4260** - Thêm StepFun ASR SSE transcription provider

#### **🧪 Testing infrastructure**
- **#4193** - Memory lifecycle test harness (quan trọng cho stability)
- **#3982** - Scripted agent runner harness
- **#3983** - Coverage cho blocked tool-call finish reasons

#### **🛡️ Security**
- **#4119** - Block symlink workspace escapes trong exec commands
- **#4053** - Enforce read-only cho extra allowed roots

---

## 🌟 Điểm nổi bật cộng đồng

### 💬 Issues được quan tâm nhất

1. **#4259** (3 bình luận) - **Context pollution nghiêm trọng**: `history.jsonl` inject cross-session data vào system prompt
   - Vấn đề kiến trúc: `ContextBuilder.build_system_prompt()` không isolate sessions
   - Ảnh hưởng: Model nhận context từ nhiều conversations khác nhau → câu trả lời không chính xác

2. **#4253** (3 bình luận) - **Feature request phổ biến**: Override model per conversation
   - Use case thực tế: Alternate giữa OpenRouter (fast) và local LlamaCpp (private)
   - Privacy-sensitive tasks vs time-sensitive tasks

3. **#4061** (1 bình luận) - **Provider compatibility**: OpenAI-compatible providers emit tool calls as text markup thay vì structured format
   - Hiện tại Nanobot chỉ execute structured `tool_calls`
   - User nhìn thấy raw markup thay vì tool execution

### 📊 Thống kê tương tác
- Tổng comments trên issues mới: **6**
- Reactions (👍): **0** - cho thấy community đang ở giai đoạn technical discussion nhiều hơn
- PRs được merge trong ngày: **7**

---

## 🐛 Ổn định & Bugs

### 🔴 Critical (Đang xử lý)
1. **Context pollution** (#4259) - Cross-session injection trong history.jsonl
   - Root cause: `Consolidator.archive()` + `ContextBuilder` không có session boundary
   - Impact: High - ảnh hưởng chất lượng response

2. **WebUI content loss** (#4267) - Assistant replies bị drop intermittently
   - Timing-dependent bug trong WebSocket handling
   - Data vẫn được lưu trong workspace/sessions/ nhưng không hiển thị

3. **Memory cursor regression** (#4256) - Stale/negative cursor values gây allocation conflicts
   - Cần monotonic guarantee

### 🟡 Medium
1. **idleCompact timing** (#4264) - Chỉ summarize history excluding last 8 messages
   - Scenario: User correction → correct result → idle compact → missing final correction trong summary
   
2. **GPT-5 compatibility** (#4261) - Azure GPT-5.4 reject `max_tokens` parameter
   - Cần `max_completion_tokens` thay thế
   - Đã có 2 PRs fix (#4263, #4268)

3. **Tool call parsing** (#4061) - Text-format tool calls từ OpenAI-compatible providers không được parse

---

## ✨ Yêu cầu tính năng

### 🎯 High demand
1. **Per-conversation model switching** (#4253)
   - Hiện tại: Global model setting
   - Yêu cầu: Switch giữa presets based on privacy/speed requirements
   - Use case: Business users cần balance giữa performance và data privacy

2. **Better bot icon handling** (#4262)
   - Agent mode vẫn hiển thị default "puppy" icon lần đầu tiên
   - Yêu cầu: Respect `botIcon` config từ startup

### 🔧 UX improvements
1. **Fork conversation** (✅ Đã merge #4208)
2. **TeX math rendering** (✅ Đã merge #4252)
3. **Version check on-demand** (#4255) - Thay thế real-time PyPI polling bằng click-to-check

---

## 💬 Phản hồi người dùng

### 😊 Positive signals
- **Documentation refresh** (#4177) được merge - giúp onboarding dễ dàng hơn cho beginners
- **Email channel automation** (#4258) - feature được yêu cầu cho agent-managed mailboxes
- **Fork conversation** - flexibility trong conversation management

### 😟 Pain points
1. **Context management bugs** - Nhiều issues về memory/history system cho thấy đây là pain point lớn
   - #4259: Cross-session pollution
   - #4264: Incomplete idle compaction
   - #4256: Cursor conflicts

2. **Provider compatibility** - OpenAI-compatible ecosystem rất fragmented
   - GPT-5 parameter differences
   - Tool call format variations
   - Max tokens vs max_completion_tokens

3. **WebUI reliability** - #4267 cho thấy vẫn có edge cases trong real-time rendering

---

## 🗺️ Backlog & Roadmap

### 🔜 Immediate priorities (dựa trên PR activity)

#### **Phase 1: Stability (đang progress)**
- ✅ Fix GPT-5 compatibility
- 🚧 Fix context pollution (#4259)
- 🚧 Fix WebUI content loss (#4267)
- 🚧 Fix memory cursor issues (#4256)

#### **Phase 2: Testing infrastructure**
- 🚧 Memory lifecycle harness (#4193)
- 🚧 Agent runner harness (#3982)
- 🚧 Tool call edge cases (#3983)
- 🚧 Security: symlink escapes (#4119)

#### **Phase 3: Feature expansion**
- ⏳ Per-conversation model override (#4253) - chưa có PR
- ⏳ Tool call text parsing (#4061) - chưa có PR
- 🚧 StepFun ASR provider (#4260)

### 📋 Patterns quan sát được
1. **Shift toward reliability**: Nhiều PR về testing, validation, và bug fixes hơn là features
2. **Memory system refactor**: Chuỗi PRs (#4193, #4256, #4259, #4264) cho thấy đây là focus area
3. **Multi-provider support**: Continuous expansion (StepFun ASR, GPT-5 series)
4. **Security hardening**: Workspace isolation và validation (#4119, #4053, #4190)

---

## 🎬 Kết luận

NanoBot đang ở giai đoạn **consolidation và hardening** với focus mạnh vào:
- 🔒 **Reliability**: Memory/context management bugs được ưu tiên cao
- 🧪 **Test coverage**: Infrastructure đang được xây dựng systematic
- 🔌 **Ecosystem compatibility**: Mở rộng provider support
- 📚 **Developer experience**: Documentation và tooling improvements

**Risk areas cần watch**: Context management bugs có thể ảnh hưởng user experience nghiêm trọng nếu không được resolve nhanh. Community size nhỏ (ít reactions) nhưng technical depth cao.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo phân tích Zeroclaw - Ngày 10/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 10/06 đánh dấu một đợt hoạt động **cực kỳ sôi động** của dự án Zeroclaw với **9 PR mới** được mở và hàng loạt sửa lỗi quan trọng. Đặc biệt, dự án đang trải qua giai đoạn **cải thiện observability** và **ổn định hệ thống** sau các releases beta. Các nhà phát triển tập trung vào việc sửa các lỗi nghiêm trọng về routing, cost tracking, và trải nghiệm người dùng trên zerocode TUI.

---

## 🚀 Releases

**Không có release mới** trong 24h qua, nhưng dự án đang trong giai đoạn **v0.8.0-beta-1** với nhiều hotfix đang được chuẩn bị.

---

## 📈 Tiến độ dự án

### 🔥 Các PR quan trọng nhất

#### **1. Sửa lỗi nghiêm trọng về Cost Tracking (#7425)** ⚠️
- **Vấn đề**: Channel cost tracking **im lặng ghi cost_usd = 0**, khiến budget enforcement không hoạt động
- **Nguyên nhân**: Pricing map sử dụng bare type `<type>` nhưng channel agent query bằng aliased type `<type>.<alias>`
- **Giải pháp**: Thêm fallback logic để resolve về bare type
- **Tác động**: **Critical** - ảnh hưởng đến toàn bộ tính năng quản lý chi phí

#### **2. Observability Breakthrough (#7385)** 🎉
- Supersede PR #7233, implement RFC #7232
- Thêm **turn metadata** vào observer events
- Tích hợp **OpenTelemetry spans** với turn_id correlation
- Mở đường cho việc monitor chi tiết từng lượt hội thoại

#### **3. Per-alias Webhook Routing (#7367)** 🔧
- Sửa lỗi **multi-instance webhook delivery** (ví dụ: whatsapp.work + whatsapp.personal)
- Trước đây chỉ deliver đến instance đầu tiên
- Thêm path-based routing: `/webhook/<channel_type>/<alias>`

#### **4. Dashboard State Labeling (#7444)** 🎨
- Sửa 4 vấn đề UX trên zerocode Dashboard:
  - Cost tab bị treo "Loading..." khi unavailable
  - History hiển thị sai "Active sessions"
  - Không có error states rõ ràng
  - Loading states mơ hồ

### 📊 Xu hướng phát triển

**Các chủ đề chính tuần này:**

1. **🔒 Security & Access Control**
   - Per-sender RBAC (#5982)
   - Skill-level permissions (#5775)
   - MCP tool restrictions (#6876)
   - Process memory limits (#6916)

2. **💬 Channel Expansion**
   - SMS channels batch: Twilio, Plivo, Telnyx, Sinch, Vonage (#7265)
   - Social/Chat: Mastodon, Rocket.Chat, Zulip, Lemmy (#7270)
   - Discord channel filtering (#6378)

3. **🏠 Smart Home Integrations**
   - Home Assistant, Philips Hue, 8Sleep, Spotify, Sonos (#7278)

4. **📖 Documentation Overhaul**
   - Rework mdBook with source-derived config (#7365)
   - SMS channels docs (#7272)
   - Chat/social channels docs (#7273)

---

## 🌟 Điểm nổi bật cộng đồng

### 🔥 Issues được quan tâm nhất

| Issue | Bình luận | Vấn đề | Độ ưu tiên |
|-------|-----------|---------|------------|
| **#4710** - Logo redesign | 19 💬 | Thiết kế logo mới | P2 |
| **#5937** - Unify providers architecture | 10 💬 | Refactor providers & reqwest | P2, High Risk |
| **#5982** - Per-sender RBAC | 9 💬 | Multi-tenant security | P2, High Risk |

### 👥 Đóng góp cộng đồng

- **@IftekharUddin**: 2 PR (webhook routing, cost tracking)
- **@chengzhichao-xydt**: 5 PR (bug fixes chủ yếu)
- **@singlerider**: 3 PR (governance, observability, docs)
- **@databillm**: 2 PR (cron fixes, doctor validation)

---

## 🐛 Ổn định & Bugs

### ⚠️ Bugs nghiêm trọng đã được sửa

#### **1. Context Budget Exceeded (#5808)** - P1
- **Triệu chứng**: Default 32k context bị vượt **3.3x** chỉ ở iteration đầu tiên
- **Nguyên nhân**: System prompt + tool definitions (~107k tokens)
- **Giải pháp**: PR #7440 - Skip trim khi system prompt vượt budget

#### **2. MCP Tool Deferred Loading Hang (#6721)** - P1
- **Triệu chứng**: `tool_search` bị treo 120s rồi auto-deny trong webhook mode
- **Nguyên nhân**: `tool_search` không nằm trong `default_auto_approve()`
- **Trạng thái**: Chưa có PR fix, cần urgent attention

#### **3. Web Gateway SPA Fallback (#6862)** - P1
- **Triệu chứng**: Dashboard crash với `JSON.parse` error
- **Nguyên nhân**: SPA fallback serve index.html cho `/api/*` routes chưa implement
- **Trạng thái**: Beta blocker, cần fix trước release stable

#### **4. Telegram Tool Execution (#6646)** - P1
- **Triệu chứng**: `web_search_tool` và `web_fetch` không fire qua Telegram
- **Fix**: PR #7438 - Sửa delivery prompt không còn "discourage tool use"

### 🔧 Bugs đang được xử lý

- **#6687**: MQTT SopEngine độc lập → không thấy runs từ agent
- **#6002**: Telegram message không rõ ràng addressed to assistant
- **#7253**: Web console Config page → JSON parse error

---

## 💡 Yêu cầu tính năng

### 🎯 Tính năng hot nhất

#### **1. Per-sender RBAC (#5982)** - 9 bình luận
```
Mục tiêu: Single ZeroClaw instance phục vụ nhiều user classes
- Isolated workspaces
- Tool sets theo role
- Rate limits riêng
- System prompts khác nhau
```

#### **2. `.well-known` Skills URI (#4853)** - 5 bình luận
- Chuẩn hóa skill installation theo Agent Skills group
- Cloudflare đã dùng internally
- Vercel added support in `npx`

#### **3. Discord Channel Filtering (#6378)** - 7 bình luận
- Thêm `allowed_channels` config
- Giống pattern `allowed_rooms` của Matrix

#### **4. Provider Architecture Refactor (#5937)** - 10 bình luận
- Unify reqwest client management
- Giảm code duplication
- Consistent model construction

### 🔮 Roadmap insights

Từ các PR batch, có thể thấy dự án đang hướng đến:

1. **Universal Channel Support**: SMS, Social, Chat platforms
2. **Smart Home First-class**: Home automation integrations
3. **Enterprise-ready**: RBAC, security, multi-tenancy
4. **Developer Experience**: Better docs, config UX parity

---

## 💬 Phản hồi người dùng

### 😊 Positive Feedback

- **Cost tracking fix** được đánh giá cao - blocking nhiều production deployments
- **Observability improvements** nhận response tích cực từ enterprise users
- **Channel expansion** đáp ứng nhu cầu đa nền tảng

### 😓 Pain Points

#### **1. Config UX Fragmentation (#7117)**
```
Người dùng phàn nàn:
- CLI config ≠ Quickstart config ≠ Web config ≠ zerocode config
- Không có single source of truth
- Navigation khó hiểu
```
→ **Đã đóng**, có thể đã được merge hoặc resolve

#### **2. zerocode TUI Issues**
- **#7376**: Dashboard ẩn error states
- **#7377**: Dark themes không đọc được text
- **#7378**: Cmd-C copy bị hiểu nhầm là quit
- **#7400**: Locale selection không có effect ngay

#### **3. Memory Over-emphasis (#5844)**
- System prompt ưu tiên memories **quá cao**
- Đặc biệt problematic trong cron jobs
- Cần rebalance priority

### 🎤 Community Requests

1. **Better Logo** (#4710) - 19 bình luận, 2 👍
2. **Provider reasoning field preservation** (#6584) → Fixed in #7423
3. **Cron catch-up behavior** (#7250) → Fixed in #7348

---

## 📋 Backlog & Roadmap

### 🚧 Công việc đang tiến hành

**High Priority (P1):**
- 🔴 MCP tool approval hang (#6721)
- 🔴 Web gateway SPA routing (#6862)
- 🔴 Context budget management (#5808) - **Có PR**
- 🔴 Telegram tool execution (#6646) - **Có PR**
- 🔴 MQTT SopEngine isolation (#6687)

**Medium Priority (P2):**
- 🟡 Per-sender RBAC (#5982)
- 🟡 Provider architecture refactor (#5937)
- 🟡 Discord channel filtering (#6378)
- 🟡 Skills security permissions (#5775)
- 🟡 Config UX parity (#7117) - **Đã đóng**

### 🎯 Roadmap ngắn hạn (Q3 2026)

Dựa trên các PR batch và RFC:

1. **v0.8.0 Stable Release**
   - Resolve tất cả P1 bugs
   - Gateway API stability
   - Observability foundation

2. **Channel Expansion Wave**
   - SMS providers (5 channels)
   - Social platforms (4 channels)
   - Webhook signature verification

3. **Smart Home Integrations**
   - Home Assistant
   - IoT device controls
   - Automation tools

4. **Security Hardening**
   - RBAC implementation
   - Per-skill permissions
   - Process isolation

### 📦 Backlog insights

**Blocked items cần attention:**
- #5982 (RBAC) - needs-author-action
- #5775 (Skill permissions) - blocked
- #6917 (Composio action scope) - blocked

**Low-hanging fruits:**
- zerocode TUI fixes (#7376, #7377, #7378) - nhiều có PR
- Doctor validation (#7439) - có PR
- Config field warnings (#7426, #7427) - có PR

---

## 🎬 Kết luận

Zeroclaw đang trong giai đoạn **maturation phase** với focus rõ ràng:

✅ **Strengths:**
- Tốc độ fix bugs nhanh (9 PR trong 1 ngày)
- Community engagement cao
- Clear roadmap cho enterprise features

⚠️ **Challenges:**
- Beta stability issues cần resolve urgently
- Config/UX fragmentation
- Technical debt trong providers architecture

🚀 **Outlook:**
Dự án đang trên đà phát triển tốt với community active và maintainer responsive. Kỳ vọng v0.8.0 stable release trong **2-3 tuần** nếu các P1 bugs được resolve đúng hạn.

---

**📊 Số liệu tổng hợp:**
- **27 Issues** đang mở (6 P1, 15 P2, 6 P3)
- **50 PRs** tổng cộng, 9 mới hôm nay
- **19 contributors** active trong 24h
- **High-risk changes:** 15/50 PRs (30%)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích dự án PicoClaw - Ngày 10/06/2026

## 1. 📊 Tóm tắt hôm nay

Ngày 10/06/2026 đánh dấu một sự kiện quan trọng với việc phát hiện và báo cáo **13 lỗ hổng bảo mật nghiêm trọng** bởi @YLChen-007, bao gồm SSRF bypass, CSRF, privilege escalation, và authorization bypass. Cùng lúc đó, cộng đồng đang tích cực đóng góp 19 PRs với các bản vá bảo mật, tính năng mới (DeltaChat gateway), và nhiều cải tiến về trải nghiệm người dùng.

## 2. 🚀 Releases

### Nightly Build v0.2.9-nightly.20260610.b9a8fad6
- Build tự động hàng đêm, **không khuyến nghị dùng production**
- Chứa các bản vá và tính năng mới nhất từ main branch
- Người dùng cần thận trọng khi sử dụng do tính không ổn định

## 3. 🔐 Tiến độ dự án - Bảo mật là ưu tiên hàng đầu

### **13 Security Advisories từ @YLChen-007** (Critical Priority)

#### Lỗ hổng SSRF & Network Access:
- **#3078**: `web_fetch` bypass qua HTTP proxy từ biến môi trường
- **#3077**: SSRF bypass qua IPv4 literal `198.18.0.0/15` 
- **#3074**: SSRF bypass qua ISATAP IPv6 literals
- **#3070**: OneBot channel cho phép fetch tùy ý từ mạng host
- **PR #3085**: Đã có bản vá block `198.18.0.0/15` range

#### Lỗ hổng Authorization & Access Control:
- **#3082**: Feishu reply-context bypass `allow_from` check
- **#3076**: WeCom group trigger policy bypass
- **#3068**: MQTT `allow_from` bypass qua spoofing `client_id`
- **#3069**: Launcher `allowed_cidrs` bypass qua reverse proxy
- **#3080**: First-run setup bypass qua same-host loopback proxy
- **PR #3083**: Hardening launcher access control với trusted proxy config

#### Lỗ hổng Command Injection & Privilege:
- **#3079**: `exec` whitelist bypass cho phép jq environment disclosure
- **#3081**: Approval hook symlink race trong `exec` tool
- **#3075**: Auto-load untrusted `skills/` metadata vào system prompt
- **#3071**: Authenticated WebSocket clients có thể trigger config reload

#### Lỗ hổng CSRF & Replay:
- **#3072**: CSRF trong first-run password setup
- **#3073**: LINE webhook replay attack

### **Các PR bảo mật đang được xử lý**:
- ✅ **#3085**: Block RFC 2544 benchmark addresses
- ✅ **#3083**: Harden launcher với localhost bypass config
- ⏳ **#3087**: Fix exec safety guard false positive với workspace paths

## 4. ✨ Điểm nổi bật cộng đồng

### Tính năng mới được đóng góp:
- **#3063 - DeltaChat Gateway** (@trufae): Tích hợp DeltaChat như một channel mới, mở rộng khả năng tương tác multi-platform

### Vấn đề người dùng quan tâm:
- **#2404** (👍 1, 11 comments): Yêu cầu streaming HTTP request config - cộng đồng muốn kiểm soát tốt hơn cách giao tiếp với LLM backend
- **#2984** (👍 1): Cần explicit turn completion signal cho WebSocket clients - vấn đề về protocol clarity
- **#3088**: Đề xuất migrate từ libolm (unmaintained) sang vodozemac - quan tâm về security long-term

## 5. 🐛 Ổn định & Bugs

### Bugs đã được xử lý:
- ✅ **#2939**: Claude Opus 4-7 temperature deprecation → Fixed qua **#2940** (merged)
- ✅ **#2796**: History chỉ hiện last message → Fixed qua **#2990** (pending review)
- ✅ **#2968**: Context compress hiển thị sai → Fixed qua **#2988** (pending review)
- ✅ **#2958**: Tool_calls bị drop during streaming → Fixed qua **#2987** (pending review)

### Code quality improvements:
- **#3064**: Add type assertion check trong migration (closed - có conflict)
- **#3066, #3065**: Explicitly ignore Close() errors cho consistency
- **#3084**: Normalize `.gitignore` encoding (UTF-8 with LF)

### Windows UX:
- **#3061**: Hide console flashes trong tất cả Windows child processes
- **#3067**: Fix DmScope không persist được trong UI

## 6. 💡 Yêu cầu tính năng

### Đang được thảo luận:
- **#2404**: Streaming HTTP request config - cho phép control flow tốt hơn
- **#2984**: WebSocket turn completion signal - cải thiện client protocol
- **#3088**: Migrate sang vodozemac thay vì libolm - modernize crypto dependency

### Agent Collaboration:
- **#2937**: Agent Collaboration Bus (pending) - hệ thống mailbox và collaboration threads cho inter-agent communication

### Provider ecosystem:
- **#2917**: NEAR AI Cloud provider integration - mở rộng LLM provider options

## 7. 👥 Phản hồi người dùng

### Tích cực:
- Cộng đồng đang active đóng góp fixes và improvements
- Nhiều contributors mới tham gia (13 security advisories từ 1 researcher chứng tỏ sự quan tâm)

### Tiêu cực / Pain points:
- **Lỗ hổng bảo mật nghiêm trọng**: 13 security issues trong 1 ngày cho thấy cần security audit toàn diện
- **Windows UX issues**: Console flashing vẫn còn ở nhiều nơi
- **Config persistence bugs**: Settings không save được (#3067)
- **History display issues**: Multi-turn conversations có vấn đề hiển thị

## 8. 📋 Backlog & Roadmap

### Immediate priorities (Tuần này):
1. **Security hardening** - Merge tất cả 13 security fixes
2. **Provider compatibility** - Fix Claude Opus 4-7 và các model mới
3. **Windows UX** - Eliminate console flashes hoàn toàn
4. **History & Session** - Fix display và persistence bugs

### Medium-term (Tháng tới):
1. **Crypto migration** - Evaluate và implement vodozemac
2. **Protocol improvements** - WebSocket turn completion signal
3. **Agent collaboration** - Review và merge collaboration bus PR
4. **Provider expansion** - NEAR AI Cloud và streaming config

### Technical debt:
- Security: Cần comprehensive security audit và penetration testing
- Testing: Nhiều PRs thiếu test coverage cho edge cases
- Documentation: Security best practices cần được document rõ ràng

---

## 🎯 Kết luận

Ngày 10/06/2026 là ngày quan trọng với **khối lượng phát hiện bảo mật lớn nhất** trong lịch sử dự án. Team cần **freeze feature development và focus vào security** trong tuần tới. Mặc dù có nhiều tính năng thú vị đang được develop, việc address 13 lỗ hổng nghiêm trọng phải là priority #1 trước khi tiếp tục phát triển.

Điểm tích cực là cộng đồng phản ứng nhanh với nhiều PRs bảo mật đã được submit trong cùng ngày. Tuy nhiên, cần có process security review chặt chẽ hơn và scheduled security audit định kỳ.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo Phân tích NanoClaw - 2026-06-10

## 🎯 Tóm tắt hôm nay

Ngày 10/6/2026 chứng kiến một đợt đóng PR hàng loạt với **30 PRs được merge** trong cùng một ngày, phản ánh nỗ lực dọn dẹp backlog lớn. Hoạt động chính tập trung vào việc tích hợp các tính năng đã phát triển từ tháng 2-5, bao gồm cải tiến bảo mật, tối ưu hóa trải nghiệm người dùng, và mở rộng khả năng tùy biến. Điểm đặc biệt là issue #1690 về multi-runtime agent SDK đang nhận được sự quan tâm, cho thấy cộng đồng muốn NanoClaw hỗ trợ nhiều mô hình AI hơn ngoài Claude.

## 🚀 Releases

**Không có release chính thức mới** trong 24 giờ qua. Tuy nhiên, khối lượng PRs được merge cho thấy đội ngũ đang chuẩn bị cho một bản phát hành lớn.

## 📈 Tiến độ dự án

### Các PR quan trọng được merge:

**🏗️ Kiến trúc & Core:**
- **#1723** - Pluggable central DB: Refactor lớn cho phép chuyển đổi giữa SQLite và SeekDB, nâng cao khả năng mở rộng
- **#1285** - Direct runner mode: Cho phép chạy agent in-process thay vì Docker container (cải thiện hiệu năng đáng kể)
- **#1728** - Forward MCP skill env vars: Sửa bug nghiêm trọng khiến tất cả MCP integrations bị lỗi

**🔒 Bảo mật:**
- **#1605** - Security policy engine: Hệ thống phân quyền chi tiết với user gating, tool restrictions, readonly mounts
- **#2722** - CSPRNG cho pairing codes: Fix lỗ hổng bảo mật nghiêm trọng (mã pairing có thể đoán được)
- **#1783** - Block catbox URLs: Ngăn agents upload file ra dịch vụ bên ngoài

**💡 Trải nghiệm người dùng:**
- **#2718** - Fix zombie active_cards trên Feishu: Sửa bug production quan trọng
- **#1668** - Cải tiến Feishu progress cards với UI mới, llmlog command
- **#2246** - QR code cho BotFather setup: Giảm friction trong onboarding
- **#2406** - Per-message reasoning-effort routing: Tối ưu token usage cho heavy commands

**🔧 Khả năng mở rộng:**
- **#1309** - Skill Marketplace/Registry: Hệ thống plugin store hoàn chỉnh
- **#1726** - NANOCLAW_EXTRA_MOUNTS: Cho phép mount thêm volumes vào containers
- **#1387** - Plugin system tương tự channels

**📊 Observability:**
- **#1202** - Agent trace observability với web UI (port 3001)
- **#337** - Prompt trace logging
- **#1333** - Build-time version metadata

### Xu hướng phát triển:

1. **Modularization**: Chuyển từ monolith sang kiến trúc pluggable (DB abstraction, skill marketplace, plugin system)
2. **Security hardening**: Nhiều cải tiến bảo mật từ crypto primitives đến policy engine
3. **Developer experience**: Tập trung vào observability, debugging tools, và documentation
4. **Multi-channel optimization**: Đầu tư sâu vào Feishu/Telegram UX

## ⭐ Điểm nổi bật cộng đồng

### Issue #1690 - Multi-runtime agent SDK abstraction (3 👍, 5 comments)

Đây là issue **duy nhất còn mở** trong dataset và đang thu hút nhiều chú ý:

**Vấn đề:** Người dùng @chiptoe-svg đã xây dựng một abstraction layer cho phép sử dụng nhiều agent SDKs (Claude + Codex + local models) như modular skills - tương tự pattern `/add-telegram`, `/add-slack`

**Ý nghĩa:**
- Phản ánh nhu cầu **vendor independence** - không bị khóa vào một provider duy nhất
- Cho thấy cộng đồng muốn dùng local models (privacy, cost) và các LLMs khác
- Pattern "runtime as skill" rất phù hợp với kiến trúc hiện tại của NanoClaw

**Thách thức tiềm ẩn:**
- Mỗi SDK có API contract khác nhau (tool calling, streaming, context management)
- Cần normalize khác biệt về capabilities giữa các models
- Test coverage và maintenance burden sẽ tăng đáng kể

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đã fix:

1. **#2718 - Feishu zombie cards**: Cards bị stuck "运行中" sau khi agent-runner timeout → Root cause: `deleteActiveCard()` chỉ fire trong SDK event handler, không handle container crashes
   
2. **#2722 - Predictable pairing codes**: `Math.random()` có thể bị predict → Chuyển sang `crypto.randomInt()` + lock down store permissions

3. **#1728 - MCP credentials**: Tất cả MCP integrations (Ollama, Home Assistant, etc.) bị lỗi vì không forward env vars vào containers

### Patterns đáng chú ý:

- **Container lifecycle management** vẫn là nguồn bugs (zombie cards, credential passing)
- Nhiều fixes liên quan đến **edge cases trong production** chứ không phải trong dev/test

## 💡 Yêu cầu tính năng

Từ các PRs và issue, có thể thấy cộng đồng đang yêu cầu:

1. **Multi-model support** (#1690) - Ưu tiên cao nhất
2. **Better observability** (#1202, #337, #1333) - Đã được deliver
3. **Security controls** (#1605) - Đã được deliver
4. **Easier customization** (#1309, #2721) - Đang được cải thiện qua skills + docs

### Gaps còn lại:

- **Testing infrastructure**: Nhiều PRs thiếu tests, dựa vào manual testing
- **Performance metrics**: Chưa có monitoring về latency, token usage, cost
- **Multi-tenancy**: Skill marketplace cần isolation tốt hơn cho enterprise

## 👥 Phản hồi người dùng

### Từ PR descriptions & comments:

**Tích cực:**
- Skill marketplace (#1309) được đánh giá cao về architecture design
- Direct runner mode (#1285) giải quyết pain point lớn về Docker overhead
- Feishu integration (#1668) cho thấy đầu tư sâu vào localization

**Concerns:**
- WebUI control panel (#212) bị mark "Status: Blocked, Pending Closure" - tính năng lớn nhưng không được merge
- Nhiều docs PRs (#214, #379, #380, #481) cũng bị pending/blocked
- Community skills (#1387) có label "Community Skill" nhưng không rõ review process

### Vấn đề quy trình:

Có dấu hiệu **PR bottleneck** - nhiều PRs tốt từ tháng 2-3 mới được merge tháng 6. Nguyên nhân có thể:
- Thiếu reviewer bandwidth
- Cần rebase vì conflicts
- Chờ security audit hoặc architecture decisions

## 🗺️ Backlog & Roadmap

### Từ patterns trong PRs:

**Đang làm (inferred):**
1. **V2 Architecture Refactor**: DB abstraction (#1723), direct runner (#1285) → Chuẩn bị cho scale
2. **Enterprise Features**: Security policies (#1605), multi-tenancy foundations
3. **Developer Ecosystem**: Skill marketplace (#1309), better docs (#2721)

**Nên làm tiếp (từ community signals):**
- ✅ **Multi-runtime support** (#1690) - Quan trọng nhất
- ⚡ **Performance optimization** - Direct runner là bước đầu, còn nhiều việc
- 📚 **Documentation overhaul** - Nhiều docs PRs bị stuck
- 🧪 **Testing infrastructure** - Nhiều PRs thiếu tests

**Rủi ro kỹ thuật:**
- Container orchestration complexity đang tăng (mounts, networks, env vars)
- Skill system cần clear contract để tránh fragmentation
- Backward compatibility với số lượng PRs merge cùng lúc

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn **consolidation** - dọn dẹp backlog và chuẩn bị infrastructure cho growth. Việc merge 30 PRs cùng ngày cho thấy quyết tâm ship features, nhưng cũng tiềm ẩn rủi ro về stability. 

**Điểm mạnh:** Architecture tốt (pluggable, skill-based), community engaged, security-conscious

**Cần cải thiện:** PR review velocity, testing coverage, documentation freshness

**Cơ hội lớn nhất:** Multi-runtime support (#1690) - nếu làm tốt sẽ tạo moat quan trọng so với competitors.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo Phân Tích IronClaw - Ngày 10/06/2026

## 🎯 Tóm tắt hôm nay

Dự án IronClaw đang trong giai đoạn refactoring và tăng cường kiến trúc mạnh mẽ với **50 PRs** đang mở và **4 issues mới**. Trọng tâm chính là tái cấu trúc hệ thống Reborn, cải thiện khả năng mở rộng của attachments, và hoàn thiện cơ chế bảo mật audit. Đáng chú ý là nỗ lực giải quyết nợ kỹ thuật với việc phân tách các file lớn và chuẩn hóa kiến trúc.

## 📦 Releases

Không có release mới trong 24 giờ qua. Tuy nhiên, PR #3708 (release PR) đang được cập nhật liên tục với các breaking changes đáng chú ý trong `ironclaw_common` (0.4.2 → 0.5.0) và `ironclaw_skills` (0.3.0 → 0.4.0), cho thấy một major release đang được chuẩn bị.

## 🚀 Tiến độ dự án

### Xu hướng chính:

**1. Kiến trúc hóa lại Reborn Composition** 🏗️
- **Vấn đề cấp bách**: 2 issues (#4666, #4665) cảnh báo các file vượt ngưỡng kích thước (2,823 và 3,359 dòng)
- **Giải pháp**: PRs #4662, #4663, #4664 đang thực hiện refactoring theo mô hình project-scoped ownership
- **Impact**: Chuyển từ agent-keyed shared scope sang project ownership model rõ ràng hơn

**2. Hệ thống Attachments toàn diện** 📎
- **Track đang triển khai**: PRs #4654, #4668, #4670 xây dựng registry format, storage layer, và transcript integration
- **Giải quyết**: Bug "CSV uploaded as text" do drift giữa 4 hardcoded lists khác nhau
- **Thiết kế**: MountView-based storage với `AttachmentRef` durable trong transcript

**3. Security Audit Hooks hoàn chỉnh** 🔒
- **Chuỗi PRs**: #4561, #4562, #4563, #4565, #4567 đang đóng tất cả các security boundaries
- **Scope**: MCP direct-lease denials, auth failures, credential egress blocks, hook quarantine
- **Approach**: Payload-free audit events với fail-closed semantics

**4. Observability & Testing Infrastructure** 🔍
- PR #4588, #4671: Trajectory observer hooks cho nearai-bench parity
- PR #4624: Security headers audit cho WebChat v2
- PR #4569: Tenant predicate key caps enforcement

### Các tính năng mới:

- **NEAR Mainnet Extension** (#4661): Read-only queries cho NEAR blockchain
- **Slack Personal DM Targets** (#4600): Mở rộng outbound delivery channels
- **Persistent Approval Policies** (#4613): Durable storage cho capability permissions
- **Trace Commons Onboarding** (#4559): Agent-driven flow qua invite link

## 💬 Điểm nổi bật cộng đồng

### Issues được quan tâm:

1. **#4667 - Ask-gated capability approvals** (mới nhất)
   - Vấn đề: Reborn REPL chưa surface approval requests cho PermissionMode::Ask
   - Tầm quan trọng: Ảnh hưởng UX của interactive REPL workflow

2. **#4657 - Google OAuth credentials unification**
   - Pain point: Users phải auth nhiều lần cho các Google APIs khác nhau
   - Expectation: Single OAuth consent cho multiple GSuite scopes

### PRs có tương tác cao:

Mặc dù data không hiển thị số bình luận cụ thể, các PRs có contributor labels cho thấy:
- **Core contributors** chiếm đa số (zmanian, henrypark133, ilblackdragon, serrrfirat)
- **New contributors** (#4661 - abbyshekit, #4650 - abbyshekit): Tín hiệu tích cực về onboarding
- **Experienced external** (#4588, #4671 - pranavraja99): Collaboration với nearai-bench team

## 🐛 Ổn định & Bugs

### Bugs đang được fix:

1. **#4659 - SSO operator WebUI auth** 🔴
   - **Root cause**: Env bearer token và SSO sessions không phân biệt operator role
   - **Fix**: Split authentication capabilities theo request scope

2. **#4660 - Reborn Docker production storage** 🐳
   - **Issue**: Docker image thiếu `postgres` feature flag
   - **Impact**: Production storage path không available trong container

3. **#4658 - Per-caller extension auth state** ⚠️
   - **Problem**: Extension listing hiển thị global state thay vì per-user
   - **Security concern**: Credential state bleeding giữa users

4. **#4575 - ResourceScope JSON round-trip** 🔄
   - **Bug**: `ResourceScope::system()` serialize OK nhưng deserialize fail
   - **Cause**: Control bytes (`\x1fSYSTEM\x1f`) rejected by validation

### Technical debt đang giải quyết:

- **File size management**: Architecture rules enforcement (#4666, #4665)
- **Error handling**: Normalize provider finish reasons (#4583)
- **Testing gaps**: Backfill connection-limit tests (#4624)

## ✨ Yêu cầu tính năng

### Từ Issues:

1. **Ask-gated approvals in REPL** (#4667)
   - Status: Đã identify, chưa có assignee
   - Priority: High (affects developer UX)

2. **Unified Google OAuth** (#4657)
   - Scope: GSuite-wide credential reuse
   - Complexity: Requires token refresh và scope negotiation

### Từ PRs - Features in progress:

1. **Subagent durability** (#4656)
   - WU-C2: Durable gate resolution store
   - Goal: Parent runs survive host restarts

2. **Extra capabilities seam** (#4671)
   - API: Host-supplied tools as reborn capabilities
   - Use case: nearai-bench custom tool injection

3. **LLM temperature handling** (#4650)
   - Fix: Drop temperature cho reasoning models (Opus 4.7/4.8, gpt-5.x)
   - Impact: Prevent 400 errors từ providers

## 💭 Phản hồi người dùng

### Pain points được thể hiện qua issues:

1. **Complexity trong auth flows** 
   - Google OAuth phải repeat cho mỗi scope
   - Extension credentials unclear ownership

2. **Developer experience gaps**
   - REPL thiếu interactive approval workflow
   - File size bloat ảnh hưởng maintainability

### Positive signals:

- **New contributor onboarding**: 2 PRs từ new contributor (abbyshekit) trong 1 ngày
- **Documentation quality**: Nhiều PRs có `scope: docs` label
- **Testing discipline**: Comprehensive test coverage trong mọi security PRs

## 🗺️ Backlog & Roadmap

### Immediate priorities (từ tracking issues):

1. **Architecture cleanup**
   - Decompose `slack_host_beta.rs` (3,359 lines) - #4665
   - Reduce `slack_host_state.rs` (2,823 lines) - #4666
   - Target: Mỗi PR phải giảm file size, không được tăng

2. **Attachments system** (Issue #4644)
   - ✅ Track 1: Format registry (#4654)
   - ✅ Track 6: Byte storage (#4668)
   - ✅ Track 2: Transcript refs (#4670)
   - 🔄 Track 3-5: Còn lại đang chờ stack

3. **Security audit completeness** (Issue #3959)
   - 5/7 boundaries covered qua PRs #4561-#4569
   - Remaining: 2 boundaries chưa được track

### Longer-term directions:

- **Project-scoped ownership model**: Foundation đã có (#4662-#4664), cần rollout product surface
- **WebChat v2**: Network limits + security headers audit đang progress
- **Reborn platform maturity**: Observability hooks, persistent policies, subagent durability

---

## 📈 Metrics tổng quan

- **Activity level**: 🟢 Cao (50 PRs mở, 4 issues mới trong 1 ngày)
- **Code quality focus**: 🟢 Mạnh (dedicated architecture tracking issues)
- **Security posture**: 🟢 Excellent (systematic audit boundary coverage)
- **Community health**: 🟡 Moderate (mostly core team, nhưng có new contributors)
- **Technical debt**: 🟡 Being addressed (file size issues được track chặt chẽ)

**Tổng kết**: IronClaw đang trong giai đoạn consolidation và professionalization - ưu tiên architecture quality, security completeness, và developer experience hơn là velocity tính năng thuần túy. Đây là dấu hiệu của một dự án đang trưởng thành.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo hoạt động LobsterAI - 10/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 09-10/06/2026, LobsterAI tập trung vào cải thiện trải nghiệm người dùng với tính năng thông báo hoàn thành tác vụ và quản lý dữ liệu. Team đã merge 4 PRs liên quan đến notifications system và data backup, đồng thời tiếp tục xử lý bug về export/copy code. Cộng đồng quan tâm đến khả năng tích hợp Hermes agent và cơ chế phối hợp đa mô hình AI.

## 🚀 Releases

Không có release chính thức nào được phát hành trong 24 giờ qua.

## 📈 Tiến độ dự án

### Pull Requests nổi bật:

**✅ Đã merge:**

- **#2130, #2134 - Task Completion Notifications** 
  - Thêm hệ thống thông báo khi tác vụ Cowork hoàn thành (ngay cả khi app chạy nền)
  - Tích hợp macOS Dock badge và Windows taskbar badge
  - Toggle bật/tắt thông báo trong General settings
  - Đảm bảo privacy: không hiển thị nội dung task hoặc prompt của người dùng
  - Xử lý edge case: khôi phục app khi main window đã bị đóng/destroyed
  
- **#2136 - Data Backup and Migration**
  - Tính năng sao lưu và di chuyển dữ liệu (sau đó tạm thời disable qua #2135)
  - Cho thấy team đang thử nghiệm và điều chỉnh chiến lược data management

**🔄 Đang mở:**

- **#2133 - Fix export and code copy bugs**
  - Sửa lỗi liên quan đến xuất dữ liệu và copy code
  - Ảnh hưởng đến workflow hàng ngày của developer

### Xu hướng phát triển:

- **UX Enhancement**: Focus mạnh vào cải thiện trải nghiệm background/notification
- **Data Management**: Thử nghiệm các phương án backup/migration
- **Bug Fixing**: Ổn định các tính năng core (export, copy)

## 💬 Điểm nổi bật cộng đồng

### Issue #2131 - Tích hợp Hermes Agent (1 comment)
Người dùng @wtgoku-create hỏi về kế hoạch hỗ trợ Hermes agent, cho thấy nhu cầu mở rộng ecosystem tích hợp với các AI framework khác.

### Issue #2132 - Phối hợp đa mô hình
Vấn đề phức tạp về cơ chế gọi sub-task cross-model:
- **Use case thực tế**: Dùng M3 cho planning/supervision + DeepSeek cho execution
- **Vấn đề core**: `call_function_gblu0nmqpcej_1` là gateway function call, không nằm trong sessions_spawn
- **Đề xuất cải tiến**:
  1. Học từ cơ chế same-model subtask (main task nhận kết quả ngay lập tức)
  2. Subtask chủ động thông báo main task khi hoàn thành hoặc gặp blockers
  
Issue này phản ánh nhu cầu quan trọng về **orchestration đa model** trong workflow phức tạp.

## 🐛 Ổn định & Bugs

### Đang xử lý:
- **Export & Code Copy** (#2133): Lỗi ảnh hưởng đến developer workflow
- **Cross-model Subtask Coordination** (#2132): Cơ chế giao tiếp giữa các model chưa seamless

### Đã giải quyết:
- **Notification System Edge Cases**: Fixed scenario khi main window closed/destroyed
- **macOS Notification Center**: Giữ active reference để click notification hoạt động đúng

## ✨ Yêu cầu tính năng

### 🔥 Priority cao:
1. **Hermes Agent Integration** (#2131) - Mở rộng khả năng tích hợp ecosystem
2. **Cross-model Task Orchestration** (#2132) - Nâng cấp cơ chế phối hợp giữa các AI model khác nhau

### 💡 Insights:
Cả hai feature request đều hướng đến **multi-agent, multi-model collaboration**, cho thấy người dùng đang sử dụng LobsterAI cho các workflow ngày càng phức tạp và cần khả năng orchestration mạnh hơn.

## 👥 Phản hồi người dùng

### Tích cực:
- Task completion notifications được thiết kế chu đáo với privacy-first approach
- System notification không leak thông tin nhạy cảm

### Pain points:
- **Cross-model coordination**: Người dùng gặp khó khăn khi phối hợp nhiều model với thế mạnh khác nhau
- **Gateway function calls**: Cơ chế hiện tại không tích hợp tốt với subtask system
- **Export/Copy bugs**: Ảnh hưởng đến productivity

### Yêu cầu ngầm:
- Cần documentation rõ ràng hơn về cách config multi-model workflows
- Cần cơ chế monitoring/debugging tốt hơn cho distributed agent tasks

## 📋 Backlog & Roadmap

### Short-term (đang active):
- ✅ Task completion notifications (completed)
- 🔄 Export/copy bug fixes (in progress)
- 🔄 Data backup strategy refinement

### Mid-term (từ community feedback):
- Cross-model task coordination improvements
- Hermes agent integration exploration
- Enhanced subtask notification mechanism

### Insights về direction:
LobsterAI đang evolve từ single-agent tool sang **multi-agent orchestration platform**. Team cần:
1. Standardize cross-model communication protocol
2. Build robust subtask lifecycle management
3. Expand integration ecosystem (Hermes, potentially others)

---

**📌 Key Takeaway**: Ngày 09-10/06 cho thấy LobsterAI đang ở giai đoạn **maturation** - hoàn thiện UX của core features đồng thời bắt đầu nhận được feedback về advanced use cases (multi-model orchestration). Đây là dấu hiệu tích cực cho thấy product-market fit với power users.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo phân tích CoPaw (QwenPaw) - 2026-06-10

## 1. 📊 Tóm tắt hôm nay

Dự án CoPaw (QwenPaw) đang trong giai đoạn tái cấu trúc chiến lược với việc phát hành **v1.1.11-beta.2**, tập trung vào việc chuẩn bị migration sang AgentScope 2.0, cải thiện trải nghiệm desktop (Tauri), và mở rộng hệ sinh thái plugin. Cộng đồng đang phản ánh mạnh mẽ về vấn đề hiệu năng frontend trên Windows desktop và các lỗi liên quan đến tích hợp channel (WeChat, DingTalk).

---

## 2. 🚀 Releases

### v1.1.11-beta.2 (2026-06-09)

**Highlights chính:**

- **Browser Control nâng cao** (#4905, #4944): 
  - Hỗ trợ click theo tọa độ page, không còn phụ thuộc vào DOM selectors
  - Thêm CDP timeout configuration và browser profile isolation cho multi-browser switching
  - → Tăng độ tin cậy cho automation workflows

- **Frontend UX fixes**:
  - Khắc phục scrollbar flickering trong Environment variables page (#4766)
  - Cải thiện trải nghiệm người dùng trên desktop

**Ý nghĩa**: Beta release này đánh dấu bước chuyển từ prototype sang production-ready cho tính năng browser automation - một trong những use cases quan trọng nhất của AI agents.

---

## 3. 🏗️ Tiến độ dự án

### 🔥 Breaking Changes đang được chuẩn bị

**#4727 - Migration sang AgentScope 2.0** (7 comments, 2 👍)
- Đang lên kế hoạch nâng cấp từ AgentScope 1.x lên 2.0
- Sẽ là breaking change lớn nhất trong lịch sử dự án
- Yêu cầu refactor toàn bộ backend architecture

### 🎯 Infrastructure & Testing Improvements

**#5058 - Sprint 2.1–2.2: Channel layer + multi-agent testing**
- Thêm **60 integration tests** mới cho channel config và multi-agent management
- Cải thiện test infrastructure với coverage ratchet

**#5054 - E2E Playwright CI pipeline** (MERGED)
- Hoàn thiện pipeline CI/CD cho E2E testing
- Backend coverage tracking qua subprocess mode
- Unified 4-tier coverage report

### 🔌 Plugin Ecosystem Expansion

**#5043 - OpenSandbox MCP integration** (MERGED)
- Tích hợp OpenSandbox với MCP protocol cho code execution sandbox
- Cải thiện security cho shell/code execution

**#5023 - Plugin Market UI** (đang review)
- Thêm tab "Plugin Market" tích hợp AgentScope Platform
- Cho phép browse & install community plugins trực tiếp từ UI

**#5033 - CloudPaw agent import** (OPEN)
- Hỗ trợ import agents từ AgentHub
- Tăng cường khả năng Agent-to-Agent (A2A)

### 🖥️ Desktop (Tauri) Improvements

**#4669 - Auto-updater** (đang review)
- Thêm Tauri plugin updater cho desktop app
- Riêng biệt với PyPI update flow

**#5051 - Persistent backend port** (OPEN)
- Fix vấn đề localStorage reset khi restart desktop app
- Giữ nguyên port để preserve user state

---

## 4. 💬 Điểm nổi bật cộng đồng

### 🔥 Hot Topics (>3 reactions/comments)

**#5017 - Đề xuất học hỏi từ Hermes Agent** (CLOSED, 10 comments, 3 👍)
- Cộng đồng đề xuất tham khảo "learning loop" từ Hermes (46k stars trên GitHub)
- **Phản hồi của team**: Đồng ý đây là hướng quan trọng, nhưng sẽ tích hợp sau khi hoàn thành AgentScope 2.0 migration
- → Cho thấy cộng đồng đang theo dõi sát ecosystem và muốn CoPaw tiếp thu best practices

**#4727 - AgentScope 2.0 migration discussion** (7 comments, 2 👍)
- Cộng đồng hào hứng với upgrade nhưng lo ngại về breaking changes
- Team đang có kế hoạch migration chi tiết trong docs/design

**#4994 - Yêu cầu nâng cấp Memory System** (3 comments, 1 👍)
- User phản ánh memory system hiện tại quá đơn giản
- Đề xuất hierarchical memory framework như các agent mainstream

---

## 5. 🐛 Ổn định & Bugs

### 🚨 Critical Issues

**#4989 - Local model không response (1.1.9+)** (4 comments)
- Qwen 3.6-27B qua vLLM không trả lời trong v1.1.9/1.1.10
- Hoạt động bình thường ở v1.1.5.post2
- → **Regression bug nghiêm trọng** cần hotfix

**#4937 - Context compaction ignore max_input_length** (5 comments)
- `/compact` command luôn dùng 128K default thay vì đọc model config
- **#5021 đã fix** - đang chờ merge

**#5052 - Tool calling crashes sau vài lần** (1 comment)
- Tất cả tools báo lỗi `unexpected keyword argument 'arguments'` sau 3-4 lần gọi
- Regression từ OpenAI client update hoặc AgentScope version

### ⚠️ Desktop Performance Issues

**#5047 - Windows Tauri slow startup** (2 comments)
- Khởi động tăng từ 1-2 phút lên **10-15 phút** sau khi chuyển sang Tauri
- Thường xuyên "not responding"

**#5053 - Frontend lag with 4+ sessions** (1 comment)
- Chuyển tab chậm **>10 giây** khi mở 4 conversations
- CPU spike, UI freeze

**#4917 - Chat UI lag với data lớn** (3 comments)
- Switch từ page khác về chat mất nhiều thời gian
- Nghi ngờ re-render toàn bộ history mỗi lần

→ **Xu hướng**: Desktop performance là pain point lớn nhất hiện tại

### 🔧 Channel Integration Bugs

**#5060 - WeChat cron job delivery failure** (1 comment)
- `WeChatChannel.to_handle_from_target` trả `session_id` thay vì `user_id`
- Khiến scheduled messages gửi sai

**#5057 - DingTalk empty AI Card** (1 comment)
- Gửi card rỗng khi agent output empty string
- **#5061 đã fix** - remove pre-creation logic

**#5030 - WeChat duplicate responses** (2 comments)
- Bật proactive mode → mỗi câu hỏi reply 2 lần
- Tắt proactive mode thì bình thường

---

## 6. ✨ Yêu cầu tính năng

### 🎨 UX Improvements

**#4971 - Session management sidebar** (3 comments, CLOSED)
- Đề xuất thêm sidebar cho quick session switching
- Hiện tại phải click 2 lần mới đổi session

**#4975 - Customizable column order** (đang review)
- Cho phép tùy chỉnh thứ tự cột trong sessions page

**#4778 - Cron job UX enhancements** (1 comment)
- Hiển thị session name thay vì chỉ ID
- Đơn giản hóa JSON input cho agent messages
- Thêm timestamp vào inbox messages
- Direct jump từ inbox message → session

### 🧠 Advanced Features

**#4992 - Visual Model Fallback** (3 comments, 1 👍)
- Hỗ trợ separate vision model cho text-only models
- Ví dụ: LongCat-2.0-Preview + Qwen-VL
- → Giải quyết vấn đề models thiếu multimodal capability

**#4057 - AgentScope tracing integration** (4 comments)
- Yêu cầu expose `agentscope.init(tracing_url=...)` 
- Để tích hợp với Arize Phoenix monitoring platform

---

## 7. 🗣️ Phản hồi người dùng

### 👍 Positive Feedback

- User @tecgic khen ngợi: *"Trải nghiệm rất tốt, localization đỉnh, dễ dùng hơn các tool nước ngoài"*
- Cộng đồng đánh giá cao tốc độ fix bugs (nhiều issues được close trong 1-2 ngày)

### 😓 Pain Points

1. **Desktop stability**: Multiple users báo cáo slow startup và UI lag
2. **Breaking changes anxiety**: Lo ngại về backward compatibility với AgentScope 2.0
3. **Documentation**: Một số features thiếu hướng dẫn (như tracing setup)

### 🎯 User Expectations

- Muốn có tính năng "self-evolving" như Hermes Agent
- Cần memory system phức tạp hơn (hierarchical, long-term)
- Mong muốn ecosystem rộng hơn với community plugins

---

## 8. 📋 Backlog & Roadmap

### 🔜 Ngắn hạn (trong beta cycle)

- [ ] **Hotfix**: Local model regression (#4989)
- [ ] **Hotfix**: Tool calling crashes (#5052)
- [ ] **Performance**: Desktop frontend optimization (#5047, #5053, #4917)
- [ ] **Channel fixes**: WeChat/DingTalk bugs (#5060, #5057, #5030)

### 🎯 Trung hạn (Q2-Q3 2026)

- [ ] **AgentScope 2.0 migration** (#4727) - Breaking change lớn nhất
- [ ] **Plugin Market** (#5023) - Community ecosystem
- [ ] **Desktop auto-updater** (#4669)
- [ ] **Visual model fallback** (#4992)
- [ ] **Tracing integration** (#4057)

### 🌟 Dài hạn (Vision)

- [ ] **Self-evolving skills** - Học hỏi từ Hermes Agent (#5017)
- [ ] **Advanced memory system** - Hierarchical, long-term memory (#4994)
- [ ] **Cross-platform optimization** - Giải quyết Windows-specific issues

---

## 📈 Insight & Recommendations

### Strengths
- ✅ Active development với **35 PRs** và **28 issues** trong timeframe ngắn
- ✅ Quick response time từ maintainers
- ✅ Strong testing culture (60+ new integration tests)
- ✅ Clear migration plan (AgentScope 2.0)

### Concerns
- ⚠️ Desktop performance crisis cần immediate attention
- ⚠️ Regression bugs từ upgrades (OpenAI client, Tauri migration)
- ⚠️ Breaking changes có thể fragment community

### Recommendations
1. **Priority 1**: Stabilize desktop performance trước khi release 1.1.11 stable
2. **Priority 2**: Setup regression test suite cho model integrations
3. **Priority 3**: Create migration guide & backward compatibility layer cho AgentScope 2.0

---

**Kết luận**: CoPaw đang trong giai đoạn "growth pains" với việc scale từ MVP sang production platform. Team có vision rõ ràng (AgentScope 2.0, plugin ecosystem) nhưng cần balance giữa innovation và stability.

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo phân tích GoClaw - 10/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 10/06 ghi nhận sự xuất hiện của **1 bug nghiêm trọng mới** (#1198) về TTS configuration bị bỏ qua khi khởi động hệ thống, cùng với **2 PR tính năng lớn** đang chờ review (MCP OAuth 2.1 và Instagram integration). Hoạt động chính tập trung vào việc mở rộng khả năng tích hợp (channels, MCP servers) và sửa lỗi về quản lý configuration.

---

## 🚀 Releases

Không có release mới trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### Pull Requests đang hoạt động

**🔐 #1196 - MCP OAuth 2.1 Client** (mới, 09/06)
- **Tác giả:** @thotam
- **Phạm vi:** Triển khai đầy đủ OAuth 2.1 flow cho MCP tool servers
- **Chi tiết kỹ thuật:**
  - RFC 9728 discovery → 8414/OIDC metadata → 7591 DCR
  - PKCE S256, refresh tokens, client_credentials
  - Mã hóa token storage, phân tách per-user vs global
  - Bảo vệ SSRF-safe outbound requests
- **Ý nghĩa:** Cho phép agents gọi MCP servers cần user-delegated access, mở rộng khả năng tích hợp với các dịch vụ bên ngoài

**📱 #1100 - Instagram Channel Integration** (đang review từ 05/05)
- **Tác giả:** @dijnie
- **Tiến độ:** Update mới nhất 09/06
- **Phạm vi:** Tích hợp Instagram như first-class channel
- **Chi tiết:**
  - Graph API client, webhook handler, message router
  - Per-entry dispatch theo `instagram_user_id`
  - Hỗ trợ multi-Meta-account
  - Tích hợp vào gateway startup, RPC/HTTP validation, web UI
- **Trạng thái:** Đang trong quá trình review kéo dài (5+ tuần), cần attention

**🔧 #1197 - MCP Bridge Agent Key Injection** (mới, 09/06)
- **Tác giả:** @zezaeoh
- **Vấn đề giải quyết:** Session tools luôn fail với "agent context required" khi gọi qua MCP bridge
- **Root cause:** Gateway không inject agent identity vào MCP bridge context
- **Impact:** Builtin tools (`sessions_list`, `sessions_history`, `sessions_send`, `session_status`) không sử dụng được với claude-cli provider agents

### Xu hướng phát triển

1. **MCP Ecosystem Focus:** 2/3 PR mới liên quan đến MCP (OAuth + bridge fix) → đang đẩy mạnh khả năng tích hợp MCP servers
2. **Multi-channel Strategy:** Instagram integration cho thấy chiến lược mở rộng channels tương tự Facebook
3. **Provider Compatibility:** Các fixes liên quan OpenAI-compatible providers (#1177) và MCP bridges (#1197)

---

## ⭐ Điểm nổi bật cộng đồng

**Tương tác thấp:** Không có issue hoặc PR nào có nhiều reactions trong ngày hôm nay. Các items mới đều ở mức 0 👍.

**Issues cần quan tâm:**
- #1177 (P1-high): 1 comment, đang được thảo luận
- #1198 (mới): 0 comments, chưa có phản hồi từ maintainers

---

## 🐛 Ổn định & Bugs

### Bug nghiêm trọng mới - #1198: TTS Provider Configuration Ignored

**📍 Mức độ:** Critical startup issue  
**📊 Phiên bản ảnh hưởng:** v3.13.2, dev branch (7484d0ec)  
**👤 Báo cáo bởi:** @tiennm99 (09/06)

**Vấn đề:**
- TTS provider được set qua dashboard/DB (`system_configs` table) bị **bỏ qua hoàn toàn** khi khởi động
- Hệ thống luôn fallback về Edge TTS thay vì provider đã cấu hình
- **Root cause:** TTS manager được khởi tạo **trước** khi `ApplySystemConfigs` chạy → đọc config cũ

**Impact:**
- User không thể sử dụng TTS provider đã chọn (OpenAI, ElevenLabs, etc.)
- Phải restart lại service sau khi đổi config → workflow bị gián đoạn
- Cấu hình DB bị vô hiệu hóa silently (no warning/error)

**Trạng thái:** Chưa có assignee, chưa có response từ team

---

### Bug đang được theo dõi - #1177: Multi-tool Response Ordering

**📍 Mức độ:** P1-high  
**🏷️ Areas:** providers, agent-loop  
**👤 Báo cáo bởi:** @Guihal (26/05)  
**💬 Hoạt động:** 1 comment, update cuối 09/06

**Vấn đề:**
- Khi assistant message có multiple `tool_calls` (parallel tools), GoClaw xử lý tuần tự
- Các synthetic `user`-role messages (warnings, nudges) được chèn **giữa** các tool results
- **Hậu quả:** Phá vỡ message ordering của OpenAI-compatible providers → dẫn đến lỗi validation hoặc sai context

**Ví dụ chuỗi message lỗi:**
```
assistant [tool_calls: A, B]
→ tool result A
→ user (synthetic warning)  ← Vấn đề ở đây
→ tool result B
```

**Trạng thái:** Đang thảo luận giải pháp, chưa có PR fix

---

## 💡 Yêu cầu tính năng

Không có feature request mới trong 24 giờ qua. Các tính năng đang được phát triển:

1. **Instagram Integration** (#1100) - messaging platform expansion
2. **MCP OAuth 2.1** (#1196) - advanced tool server authentication
3. **MCP Bridge Identity** (#1197) - session tool accessibility

---

## 👥 Phản hồi người dùng

### Feedback từ bug reports:

**#1198 - TTS Config Issue:**
- User frustrated với silent failure (config DB bị ignore)
- Mong đợi: Hot-reload config hoặc ít nhất là warning khi startup
- Pain point: Phải restart service để apply config mới

**#1177 - Multi-tool Ordering:**
- Developer concern về OpenAI provider compatibility
- Ảnh hưởng đến production workflows với parallel tool execution
- Community đánh giá P1-high là hợp lý

### Quan sát chung:
- **Low engagement:** Các issues/PRs mới chưa thu hút nhiều attention từ community
- **Quality reports:** Bug reports có chi tiết kỹ thuật tốt, dễ reproduce
- **Response time:** Một số issues chưa có feedback từ maintainers sau 24h

---

## 🗺️ Backlog & Roadmap

### Đang trong pipeline (dựa trên PRs mở):

**Gần hoàn thành:**
- ✅ Instagram channel (PR #1100) - đã 5+ tuần, cần final review
- 🔄 MCP bridge fixes (#1197) - bug fix cần merge nhanh

**Cần review:**
- 🆕 MCP OAuth 2.1 (#1196) - tính năng lớn, cần testing kỹ

### Ưu tiên sắp tới (dự đoán từ bugs):

1. **🔥 Urgent:** Fix TTS config loading order (#1198)
2. **🔥 High:** Resolve multi-tool message ordering (#1177)
3. **🚀 Feature:** Complete Instagram integration review
4. **🔐 Security:** MCP OAuth implementation validation

### Gaps & Technical Debt:

- **Configuration management:** Init order dependencies gây config load issues
- **Provider compatibility:** OpenAI message format compliance cần cải thiện
- **Testing coverage:** Complex flows (multi-tool, MCP bridges) thiếu test cases

---

## 📝 Kết luận & Khuyến nghị

**Điểm mạnh:**
- Có roadmap rõ ràng về MCP ecosystem expansion
- Bug reports chất lượng cao, technical depth tốt

**Điểm cần cải thiện:**
- Response time từ maintainers cho issues mới
- PR #1100 bị stuck quá lâu (5 tuần) cần resolution
- Configuration management architecture cần refactor (init order issues)

**Action items đề xuất:**
1. Ưu tiên fix #1198 (TTS config) - breaking user workflows
2. Review và merge #1197 (MCP bridge) - quick fix cho known issue
3. Push #1100 (Instagram) qua finish line - đã investment nhiều effort
4. Thiết lập test coverage cho parallel tool execution flows

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo Phân tích Dự án Hermes-Agent - 2026-06-10

## 1. 🎯 Tóm tắt hôm nay

Hermes-Agent ghi nhận một ngày hoạt động cực kỳ sôi động với **50 PRs** và **11 issues mới**, phản ánh giai đoạn ổn định và tinh chỉnh sau các phát triển lớn. Các hoạt động tập trung vào 3 nhóm chính: sửa lỗi tích hợp đa nền tảng (Discord, Telegram, Matrix), cải thiện trải nghiệm Dashboard/Desktop UI, và tăng cường độ tin cậy của cron jobs. Đáng chú ý là sự xuất hiện của nhiều contributor mới, cho thấy cộng đồng đang mở rộng.

## 2. 📦 Releases

**Không có release chính thức** trong 24h qua. Dự án đang trong giai đoạn tích hợp và kiểm thử các tính năng trước khi đóng gói phiên bản tiếp theo.

## 3. 🚀 Tiến độ dự án

### 🔧 Nhóm sửa lỗi hạ tầng (Critical)

**Vấn đề nghiêm trọng nhất:**

- **#43211 + #43222**: Lỗi stale stream không kích hoạt fallback provider
  - Khi stream SSE bị đơ (>180s không nhận chunk), hệ thống retry cùng provider thay vì chuyển sang provider dự phòng
  - PR #43222 đã fix bằng cách đếm consecutive failures và escalate sang fallback
  - **Impact**: Cải thiện độ tin cậy cho production deployments

- **#43186**: Core dump (SIGABRT) khi chạy nhiều `hermes chat -q` đồng thời
  - Xảy ra khi multiple subprocesses chia sẻ HERMES_HOME
  - Bug xảy ra *sau* khi agent hoàn thành, khi process exit
  - Chưa có PR fix → **cần ưu tiên cao**

### 🎨 Nhóm cải thiện Desktop/Dashboard UI

Chuỗi 4 PRs liên tiếp từ @Tortugasaur (#43202-#43205) nâng cấp trải nghiệm người dùng:

1. **#43203**: Nút "Back to present" khi scroll lên lịch sử chat
2. **#43204**: Hiển thị trạng thái "needs attention" trên sidebar bằng icon amber
3. **#43205**: Menu chuyển đổi approval mode (manual/smart/auto) trên status bar
4. **#43202**: Fix lỗi thinking blocks cũ mở lại khi có block mới đang chạy

**Insight**: Desktop app đang được đánh bóng để cạnh tranh với các AI IDE khác

### 🤖 Nhóm tích hợp nền tảng

- **Discord** (#43193): Chỉ request voice state intent khi bật voice mode → giảm latency cho text-only bots
- **Telegram** (#43200): Transcribe audio context theo nhu cầu thay vì upfront → tiết kiệm API calls
- **Matrix** (#43207): Chặn status messages để tránh ping-pong loop khi 2 Hermes agents chat với nhau

### ⏰ Nhóm cron jobs reliability

Chuỗi 3 issues (#43168, #43170, #43177) yêu cầu cải thiện error notifications:

- **Vấn đề**: Khi cron job fail, notification chỉ có exception message, không có context (provider/model/tokens)
- **Giải pháp đề xuất**: Attach diagnostic context vào error messages
- **Chưa có PR implement** → opportunity cho contributors

## 4. 🌟 Điểm nổi bật cộng đồng

### Issues được quan tâm:

1. **#43220** (python 3.13 compatibility): User phàn nàn Hermes cài đặt Python 3.11 và conflict với Python 3.13 đã có
   - **Phản ánh**: Vấn đề dependency management cần rõ ràng hơn

2. **#43196** (Dashboard wedges on systemd): Dashboard chạy như persistent service bị hang, cần SIGKILL
   - Xảy ra khi host trên VM với systemd --user
   - **Chưa được giải quyết** → blocker cho production deployments

3. **#43121** (Cron UI bug): Desktop chỉ hiển thị user prompt của cron job, ẩn toàn bộ tool calls + LLM response cho đến khi restart gateway
   - **Tái hiện 100%** → UX critical

### Contributors mới nổi:

- @Tortugasaur: 4 PRs UI liên tiếp → potential core contributor
- @testingbuddies24: 2 PRs về gateway/state management
- @Cole719: 2 PRs về Discord + Google Workspace

## 5. 🐛 Ổn định & Bugs

### 🔴 Critical (cần fix ngay):

1. **Core dump trên concurrent CLI** (#43186)
2. **Dashboard hang trên systemd** (#43196)
3. **Cron UI invisible content** (#43121)

### 🟡 High priority:

4. **Context compaction rehydration** (#43175): `session_search` có thể load huge compaction summaries làm tràn context
5. **Bedrock profile config ignored** (#43143 → #43187): Config `bedrock.profile` không được respect
6. **LaunchD restart notification missing** (#43199): Restart trên macOS không trigger "Gateway online" notification

### 🟢 Medium:

- **MCP tools schema passthrough** (#43209): Tool parameters không được forward đến MCP server
- **Orphan session rows** (#43212): Platform events tạo ghost sessions với `model=NULL`
- **Website build fails** (#43183): TypeScript không tìm thấy JSX namespace với React 19

## 6. 💡 Yêu cầu tính năng

### Được đề xuất hôm nay:

1. **#43201**: Hook `pre_tool_call` nên có khả năng terminate agent loop khi block request
   - Hiện tại: Block message → LLM retry với tools khác → infinite loop
   - Đề xuất: Thêm action "terminate" ngoài "block"

2. **#43216**: Kanban dashboard inline reply
   - Hiện tại: Reply blocked task cần 8+ clicks
   - Đề xuất: "Reply & unblock" button inline trên card

3. **#43190**: Unforgit memory provider
   - Plugin mới cho git-based memory persistence
   - Support `unforgit_search`, `unforgit_remember`, `unforgit_status` tools

### Trends:

- **Observability**: Nhiều requests về logging và diagnostic context
- **UX polish**: Focus vào giảm friction trong workflows phổ biến
- **Plugin ecosystem**: Cộng đồng bắt đầu contribute providers mới

## 7. 💬 Phản hồi người dùng

### Tích cực:

- Desktop terminal pane (#42521) nhận được đánh giá tốt về resizable + command palette
- Multi-provider support (#43185) được review kỹ lưỡng bởi 8 reviewers

### Tiêu cực/Pain points:

- **Python version conflicts** (#43220): Người dùng không hiểu tại sao Hermes force Python 3.11
- **Production deployment gaps**:
  - Cron error notifications thiếu context
  - Dashboard không stable khi host như service
  - Stale stream không có automatic recovery

### User sentiment:

Cộng đồng đang chuyển từ "explore features" sang "stabilize for production". Các issues mới tập trung vào edge cases trong production deployments thay vì feature requests.

## 8. 📋 Backlog & Roadmap

### Short-term (dựa trên PR activity):

✅ **Hoàn thành hoặc gần hoàn thành:**
- Multi-provider support (finalization phase)
- Desktop UI polish
- Platform integrations (Discord/Telegram/Matrix)

🚧 **Đang làm:**
- Cron reliability improvements
- Gateway lifecycle management
- Memory provider ecosystem

### Blockers cần giải quyết:

1. Core dump bug (#43186) - blocking concurrent usage
2. Dashboard systemd stability (#43196) - blocking server deployments
3. Python 3.13 compatibility (#43220) - blocking adoption

### Predicted focus (tuần tới):

- **Observability**: Implement diagnostic context for cron/gateway errors
- **Stability**: Fix core dump + dashboard wedge issues
- **Documentation**: Troubleshooting guides cho production deployments (đã thấy dấu hiệu với #43191)

---

## 📈 Metrics snapshot:

- **New PRs**: 50
- **New Issues**: 11
- **Active contributors (hôm nay)**: ~25 unique handles
- **Review activity**: High (multi-reviewer PRs xuất hiện)
- **Bug/Feature ratio**: 7:4 (stabilization phase)

**Nhận định chung**: Hermes-Agent đang trong **consolidation phase** sau các đợt feature development lớn. Priority đã chuyển sang production-readiness, với focus đặc biệt vào reliability, observability, và UX polish. Cộng đồng contributor đang mở rộng nhưng cần documentation và onboarding tốt hơn.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*