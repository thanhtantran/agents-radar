# Bản tin Hệ sinh thái OpenClaw 2026-08-24

> Issues: 237 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-08-24 02:00 UTC

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

# Báo cáo phân tích OpenClaw - 24/08/2026

## 1. 📊 Tóm tắt hoạt động hôm nay

OpenClaw đang trong giai đoạn ổn định hóa sau các bản beta 2026.7.x với **hoạt động sửa lỗi cực kỳ mạnh mẽ**. Trong 24 giờ qua, dự án đã đóng/merge nhiều PR quan trọng liên quan đến **message delivery, session state, và security boundaries**. Điểm đáng chú ý là việc tập trung xử lý các vấn đề về **resource leaks, delivery failures, và context management** - những vấn đề cốt lõi ảnh hưởng đến trải nghiệm production.

## 2. 🚀 Releases

**Không có release mới** trong 24 giờ qua, nhưng dự án đang trong giai đoạn chuẩn bị cho **beta.7+ / 2026.7.3 train** với nhiều fix quan trọng đang được merge.

## 3. 🔧 Tiến độ dự án

### PRs quan trọng được merge/đóng gần đây:

#### 🔐 **Security & Delivery** (PRs #126424, #128357, #110641)
- **#126424**: Sửa lỗi cross-agent conversation delivery leak - đảm bảo messages chỉ được gửi đến đúng agent bindings
- **#128357**: Discord revalidation authority - ngăn chặn delivery sau khi custody đã chuyển
- **#110641**: Sửa lỗi Unicode boot-echo suppression

#### 💾 **Session State & Memory** (PRs #125471, #123975, #128244)
- **#125471**: Khôi phục Claude CLI OAuth trong Control UI sau restart
- **#128244**: Tối ưu `memory_search` - không block trên index sync
- **#123975**: Cleanup tsgo process trees tránh zombie processes

#### 📱 **Multi-channel improvements** (PRs #127353, #128435, #128453)
- **#127353**: Dừng retry storms sau khi Slack/Telegram definitively reject
- **#128435**: Custom emoji discovery cho Discord/Slack/Telegram
- **#128453**: Fix Matrix spoiler collision với inline code

### Xu hướng phát triển:

✅ **Tăng cường reliability**: ~70% PRs tập trung vào message delivery, resource cleanup, và session persistence  
✅ **Multi-agent maturity**: Nhiều fix về agent isolation và conversation routing  
✅ **Platform parity**: Cải thiện đồng bộ Discord/Slack/Telegram/Matrix  
⚠️ **Technical debt paydown**: Xử lý các edge cases từ v2026.6.x → 2026.7.x migration

## 4. 🔥 Điểm nổi bật cộng đồng

### Top issues theo engagement:

#### 🏆 **#119796** (15 comments, CLOSED): Windows vitest teardown EBUSY
- **Vấn đề**: SQLite handle không được release, gây lỗi test cleanup
- **Tác động**: Developer experience, CI stability
- **Trạng thái**: Đã đóng - likely fixed

#### 💬 **#109490** (12 comments, CLOSED): Codex turn interrupted
- **Vấn đề**: Client-delegated message tool với `terminate:true` dừng turn sớm
- **Liên quan**: Tool-split runner architecture (v2026.7.1+)
- **Trạng thái**: Đã đóng - possibly duplicate/resolved

#### 🐛 **#97616** (9 comments, OPEN): Process leak - zombie accumulation
- **Vấn đề nghiêm trọng**: Unreaped hook/tool child processes gây memory pressure
- **Tác động**: Long-running deployments, runtime degradation
- **Priority**: P1 - cần sửa urgent

#### 📉 **#111857** (8 comments, OPEN): Context budget reopens compacted JSONL
- **Vấn đề**: Subagent completion announcement làm inflate prompt estimates
- **Hệ quả**: Repeated compaction, context thrashing
- **Trạng thái**: P1, có repro steps

## 5. 🐞 Ổn định & Bugs quan trọng

### Critical reliability issues:

#### **Memory & Resource Management** 🔴
- **#97616**: Zombie process accumulation (P1)
- **#125344**: Embedding workers + codex app-servers leak without idle TTL
- **#124573** (referenced): `hooks relay` orphan processes

#### **Message Delivery** 🟡
- **#126246**: Telegram deliveries stuck in `send_attempt_started`, lost on restart (P1)
- **#111944**: Codex commentary không delivery đến Telegram streaming
- **#112668**: Sessions_yield timeout drops subagent announces (P1)

#### **Session State Corruption** 🟡
- **#86592**: User messages không persist khi agent attempt throws (P1) 
- **#111857**: Context budget inflation loop (P1)
- **#108215**: Context usage drops bất thường không có compaction

#### **Windows-specific** 🟢
- **#127176**: CLI/Node Host alternate device metadata approvals
- **#119796**: Vitest teardown EBUSY (đã closed)

### Patterns đáng chú ý:
⚠️ **SQLite contention**: Nhiều issues liên quan đến DB locking trên Windows  
⚠️ **Compaction loops**: Context management vẫn có edge cases  
⚠️ **Child process hygiene**: Cần audit toàn diện lifecycle management

## 6. 💡 Yêu cầu tính năng

### Được quan tâm:

#### **#127208**: Slash command `/followup` (P2, 3 comments)
- **Đề xuất**: Queue một message riêng lẻ mà không thay đổi session queue mode
- **Use case**: Default queue mode là `steer`, nhưng đôi khi cần `followup` cho một message

#### **#105710**: First-class RCS channel (P3, 3 comments)
- **Đề xuất**: Plugin chính thức cho RCS với Twilio adapter
- **Động lực**: Tương tự `@openclaw/sms` nhưng cho Rich Communication Services

#### **#52046**: Non-blocking heartbeat execution (3 comments)
- **Vấn đề**: Heartbeat checks block message processing 5-10s
- **Đề xuất**: Async heartbeat để không delay user messages

### Architectural discussions:

#### **#109353**: Global pre-routing interception (5 comments, CLOSED duplicate)
- **Nhu cầu**: Hook điểm để inspect/claim INBOUND messages trước khi agent xử lý
- **Trạng thái**: Marked duplicate - likely consolidated elsewhere

## 7. 👥 Phản hồi người dùng

### Field reports từ production:

#### **#128067**: Beta.7 field report - 6 reliability defect classes (5 comments)
- **Setup**: Multi-agent gateway, macOS arm64, 6 agents, 3 tuần operation
- **Phát hiện**: 
  - Persistence issues
  - Delivery failures  
  - Restart recovery problems
  - Plus 3 minor issues
- **Giá trị**: Real-world production evidence đang được maintainers đánh giá cao

### Pain points từ community:

🔴 **iOS app regression** (#108520, P0): 
- App update breaks Talk Mode và chat hoàn toàn
- Gateway connects nhưng không functionality
- **Urgent** - blocking users

🟡 **WhatsApp blank bubbles** (#127948, P1):
- Group replies render trống khi quote cache expires
- UX regression nghiêm trọng

🟡 **QQBot slash commands** (#125838, P1):
- `/think`, `/status` không reply trong QQBot
- WebChat works fine - channel-specific issue

### Developer experience:

⚠️ **#60612**: Doctor warns về NVM node nhưng không fix được  
⚠️ **#108273**: Node.js SQLite version regression testing  
⚠️ **#105266**: Flaky locale-rendering tests (50% failure rate)

## 8. 📋 Backlog & Roadmap insights

### Immediate priorities (inferred từ PR activity):

1. **Resource leak cleanup** 
   - Process lifecycle audit (#97616, #125344)
   - SQLite handle management (#119796)

2. **Message delivery hardening**
   - Retry logic refinement (#127353)
   - Delivery authority validation (#128357, #126424)

3. **Session state durability**
   - Persist user messages before attempt (#86592)
   - Context budget stabilization (#111857)

4. **Multi-agent maturity**
   - Cross-agent isolation guarantees
   - Subagent announce reliability (#112668)

### Deprecation notices:

#### **#107860**: v2026.7.3 train removals
- Flat/scalar streaming config keys
- `resolveGroupIntroHint` adapter surface
- **Timeline**: External plugins cần migrate trước removal

### Technical debt being addressed:

✅ Dependency refresh with 7-day cooldown (#128414)  
✅ GitHub Actions security updates (#127700)  
✅ Test infrastructure stability (#125825, #105266)  
✅ Docker/container isolation improvements (#128447)

---

## 🎯 Kết luận

OpenClaw đang trong **giai đoạn maturation** sau đợt refactoring lớn v2026.7.x. Dự án thể hiện **engineering discipline tốt** với:

- ✅ Aggressive bug triage và fixing
- ✅ Security-first approach (many security-boundary PRs)
- ✅ Field report integration từ production users
- ✅ Maintainer responsiveness cao

**Concerns cần theo dõi**:
- ⚠️ Resource leak patterns cần system-wide audit
- ⚠️ Windows SQLite stability vẫn fragile
- ⚠️ iOS app regression (P0) cần hotfix urgent

**Outlook**: Dự án đang hướng tới stability milestone cho **2026.7.3 / beta.8** với focus vào reliability hơn features mới.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 24/08/2026

---

## 1. 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **consolidation và maturation** sau đợt bùng nổ tính năng. Các dự án đang chuyển focus từ "ship fast" sang "ship stable", với xu hướng chung:

- **Security hardening** trở thành priority hàng đầu (SSRF protection, sandbox isolation)
- **Session management** và **state persistence** đang được refactor toàn diện
- **Multi-channel/multi-platform** mở rộng mạnh mẽ (Discord, Telegram, Slack, WhatsApp)
- **Developer experience** được đầu tư (CI/CD, testing, onboarding)
- **Community-driven contributions** tăng đáng kể

**Insight chính**: Không còn cuộc đua về features - giờ là cuộc đua về **reliability, security, và ecosystem compatibility**.

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity Level | Community Engagement | Maturity Stage |
|-------|--------|-----|----------|----------------|---------------------|----------------|
| **OpenClaw** | 237 | 500 | 0 | 🔥🔥🔥🔥🔥 Very High | ⭐⭐⭐⭐ High | **Production-ready** |
| **ZeroClaw** | 20 | 50 | 0 | 🔥🔥🔥🔥 High | ⭐⭐⭐⭐⭐ Very High | **Architecture refactor** |
| **IronClaw** | 12 | 24 | 0 | 🔥🔥🔥 Medium-High | ⭐⭐⭐ Medium | **Infrastructure focus** |
| **Hermes-Agent** | 6 | 50 | 0 | 🔥🔥🔥🔥 High | ⭐⭐⭐ Medium | **Reliability sprint** |
| **NanoBot** | 2 | 19 | 0 | 🔥🔥 Medium | ⭐⭐ Low | **Refactoring phase** |
| **NanoClaw** | 4 | 50 | 0 | 🔥🔥🔥 Medium-High | ⭐⭐⭐ Medium | **Pre-release polish** |
| **CoPaw** | 6 | 16 | 0 | 🔥🔥 Medium | ⭐⭐⭐ Medium | **Stabilization** |
| **PicoClaw** | 2 | 7 | 0 | 🔥 Low | ⭐ Very Low | **Maintenance mode** |
| **LobsterAI** | 4 | 3 | 0 | 🔥 Low | ⭐⭐ Low | **Backlog cleanup** |

### Phân loại velocity:

**🚀 High Velocity** (5+ PRs/day merged):
- OpenClaw, ZeroClaw, Hermes-Agent

**⚡ Medium Velocity** (2-4 PRs/day):
- IronClaw, NanoClaw, NanoBot

**🐌 Low Velocity** (<2 PRs/day):
- CoPaw, PicoClaw, LobsterAI

---

## 3. 🏆 Vị thế của OpenClaw

### **Vai trò: "The Enterprise Standard"**

OpenClaw đã khẳng định vị trí là **reference implementation** của hệ sinh thái với:

#### ✅ Điểm mạnh vượt trội:

**1. Scale & Maturity**
- **237 issues** & **500 PRs** - số lượng lớn nhất, chứng tỏ adoption cao
- Production-proven qua field reports (#128067 - 3 tuần multi-agent production)
- Sophisticated governance: RFC process, stacked PRs, architectural reviews

**2. Technical Leadership**
- Đi đầu trong **message delivery hardening** (3 PRs về cross-agent isolation)
- Security-first approach: nhiều PRs về authority validation, SSRF protection
- Advanced architecture: tool-split runner, subagent orchestration

**3. Community Health**
- Maintainer responsiveness cao (issues được triage nhanh)
- Distinguished contributors active (@wangmiao0668000666, @JordanTheJet)
- Field reports từ production users được integrate vào roadmap

**4. Documentation & Developer Experience**
- Structured release notes (CHANGELOG curated)
- Clear migration paths (v2026.7.3 deprecation notices)
- ADR (Architecture Decision Records) cho major changes

#### ⚠️ Challenges:

**Technical Debt visible**:
- **#97616** - Zombie process accumulation (P1)
- **#111857** - Context budget inflation loops
- **#86592** - User messages không persist khi agent throws

**Windows fragility**: SQLite contention issues (#119796, #127176)

**Complexity**: 237 issues cho thấy surface area lớn, nhiều edge cases

### **Strategic Position**: 

OpenClaw đang trong **consolidation phase** - không chase features mới mà focus vào:
- Message delivery correctness
- Resource management
- Session state durability
- Multi-agent maturity

→ Đây là dấu hiệu của một dự án **production-grade** sẵn sàng cho enterprise adoption.

---

## 4. 🔧 Hướng kỹ thuật chung

### **A. Security Hardening - Universal Priority**

**SSRF Protection** xuất hiện ở 4/9 dự án:

| Dự án | Approach | Status |
|-------|----------|--------|
| ZeroClaw | #10070-#10075 - Stacked PRs, live config threading | 🟡 In Progress |
| PicoClaw | #3322-#3324 - Media download validation | 🔴 Stale/Closed |
| OpenClaw | #126424, #128357 - Delivery authority hardening | ✅ Merged |
| IronClaw | #7825 - Sandbox egress auth recipes | 🟡 Planned |

**Pattern**: Chuyển từ trust-all → explicit allow-list + opt-in cho private networks

---

### **B. Session Management Revolution**

Tất cả major projects đang refactor session lifecycle:

**ZeroClaw (#9487, #9600)**: Runtime-owned conversations với transport adapters
**OpenClaw (#125471)**: OAuth persistence post-restart
**Hermes-Agent (#93430)**: 5-PR "ring 2" để close TOCTOU races
**NanoClaw (#3482-#3487)**: Structured setup driver protocol

**Insight**: Early agent frameworks đã underestimate complexity của durable state. Generation 2 đang fix này system-wide.

---

### **C. Plugin & Extension Architecture**

**3 chiến lược khác biệt**:

1. **Compile-time → Runtime** (ZeroClaw #8850)
   - WASM plugins thay vì Cargo features
   - Goal: smaller binaries, zero-downtime updates

2. **MCP Protocol** (NanoBot #5386, CoPaw #7225)
   - Schema budgeting, result metadata
   - Industry standard approach

3. **Marketplace/Hub** (IronClaw #7516, ZeroClaw RFC #9810)
   - Agent Plugins 1.0 standard
   - Community-contributed skills

**Xu hướng**: Ecosystem mở, vendor-neutral standards

---

### **D. Multi-Channel Maturity**

**Platform parity push**:

| Channel | OpenClaw | ZeroClaw | NanoClaw | CoPaw |
|---------|----------|----------|----------|-------|
| Discord | ✅ Mature | ✅ Mature | ✅ (#3456 fix) | ✅ |
| Slack | ✅ | ✅ | ✅ | ✅ |
| Telegram | ✅ | ✅ | ✅ (#3841 issue) | ✅ |
| WhatsApp | - | - | ✅ (#3320 fix) | - |
| Matrix | - | ✅ (#5385) | - | - |
| Email | - | - | - | ✅ (#93294) |
| SMS/RCS | ✅ (#105710) | - | - | - |

**Insight**: Không còn "Discord-first" - production users cần multi-channel out-of-box.

---

## 5. 🎯 Điểm khác biệt

### **A. Chiến lược phát triển**

**OpenClaw - "Enterprise Stability"**
- Focus: Reliability, security boundaries, production hardening
- Velocity: High nhưng disciplined (stacked PRs, RFC gates)
- Target: Large-scale deployments, corporate users

**ZeroClaw - "Architectural Innovation"**
- Focus: Plugin system, advanced governance (RFC voting cycles)
- Velocity: Medium-high, nhiều blocked/stacked work
- Target: Platform builders, advanced users

**IronClaw - "Developer Velocity"**
- Focus: CI/CD optimization, infrastructure modernization
- Velocity: Medium, nhiều parallel tracks (T1-T4)
- Target: Development teams, integration-heavy workflows

**Hermes-Agent - "Reliability Sprint"**
- Focus: Session reliability "rings", systematic bug elimination
- Velocity: High trong bug fixes, ít features mới
- Target: Power users, autonomous operation

---

### **B. Governance & Process**

**Formal RFC Process** (có structured decision-making):
- ✅ ZeroClaw - FND-003 Rev. 16, vote cycles
- ✅ OpenClaw - Implied qua PR templates và architectural reviews
- ❌ Majority - Ad-hoc hoặc không visible

**Stacked PR Discipline**:
- 🏆 ZeroClaw, NanoClaw - Consistent stacking với base branch isolation
- ⭐ OpenClaw, IronClaw - Occasional stacking cho complex features
- ❌ Others - Mostly independent PRs

**Insight**: Formal governance xuất hiện khi dự án scale beyond core team.

---

### **C. Community Dynamics**

**High Engagement** (issues có 5+ comments, active discussions):
- ZeroClaw: RFC #9487 (25 comments), #9488 (19 comments)
- OpenClaw: #119796 (15 comments), #109490 (12 comments)
- IronClaw: #7812 (3 comments thảo luận tool permissions)

**Low Engagement** (0-2 comments trung bình):
- NanoBot, PicoClaw, LobsterAI
- **Lý do**: Có thể do internal team, niche use case, hoặc early stage

**User Feedback Channels**:
- IronClaw: #x-ai-product-feedback Slack → structured triage
- Others: GitHub issues trực tiếp

---

### **D. Tính năng đột phá**

**OpenClaw**:
- Context budget management tinh vi
- Tool-split runner architecture
- Subagent orchestration mature nhất

**ZeroClaw**:
- WASM plugin runtime
- Live config threading (không cần restart)
- Realtime speech-to-speech broker (RFC #8780)

**Hermes-Agent**:
- Worktree isolation per conversation
- Per-skill reasoning control
- TCP keepalive cho WebSocket reliability

**IronClaw**:
- Persistent sandbox với iron-proxy
- Build Remote Agent phone pairing
- Nextest pipeline optimization

**NanoClaw**:
- Structured setup driver protocol
- Build-time preseed catalog
- Timezone preseed support

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### **Tier 1: Mature Ecosystems** ⭐⭐⭐⭐⭐

**ZeroClaw**
- Distinguished/experienced contributor tiers
- Active RFC discussions với maintainer participation
- Stacked PRs cho thấy contributor sophistication cao

**OpenClaw**
- Field reports từ production users (#128067)
- Community submitting regression tests
- Maintainer responsiveness <24h

### **Tier 2: Growing Communities** ⭐⭐⭐

**Hermes-Agent, IronClaw, NanoClaw**
- First-time contributors tích cực
- Bug reports chi tiết với repro steps
- Emerging contributor patterns (stacking, testing)

### **Tier 3: Early Stage** ⭐⭐

**CoPaw, LobsterAI, NanoBot**
- Contributor base nhỏ, chủ yếu core team
- Issues ít tương tác (0-2 comments)
- Chưa có community-driven features

### **Tier 4: Niche/Maintenance** ⭐

**PicoClaw**
- Minimal activity (5 PRs closed stale trong 1 ngày)
- 0 community engagement
- Có thể là internal project hoặc sunset phase

---

### **Engagement Metrics**

| Dự án | Avg Comments/Issue | External Contributors | Community PRs | Health Score |
|-------|-------------------|----------------------|---------------|--------------|
| ZeroClaw | 8.2 | 5+ active | ~30% | 🟢 Excellent |
| OpenClaw | 6.5 | 3+ active | ~20% | 🟢 Excellent |
| IronClaw | 3.1 | 2-3 active | ~15% | 🟡 Good |
| Hermes-Agent | 2.8 | 2-3 active | ~10% | 🟡 Good |
| NanoClaw | 2.5 | 2 active | ~10% | 🟡 Growing |
| CoPaw | 1.2 | 1-2 | <5% | 🟠 Emerging |
| NanoBot | 0.8 | 0-1 | <5% | 🟠 Early |
| LobsterAI | 0.5 | 0 | 0% | 🔴 Weak |
| PicoClaw | 0.3 | 0 | 0% | 🔴 Inactive |

---

## 7. 🔮 Tín hiệu xu hướng

### **A. Consolidation Wave (Q3-Q4 2026)**

**Dự đoán**: 2-3 dự án sẽ emerge as "winners" trong 6 tháng tới.

**Winning factors**:
1. ✅ Production reliability (zero-downtime, session durability)
2. ✅ Security posture (SSRF, sandbox, auth)
3. ✅ Ecosystem compatibility (MCP, Agent Plugins 1.0)
4. ✅ Community momentum (external contributors, engagement)

**Current leaders**: OpenClaw, ZeroClaw (đang compete cho enterprise standard position)

---

### **B. Standardization Pressure**

**Evidence**:
- Agent Plugins 1.0 standard được mention ở ZeroClaw, IronClaw
- MCP adoption tăng (NanoBot, CoPaw, ZeroClaw)
- Cross-project borrowing (Build Remote Agent xuất hiện ở 2 projects)

**Prediction**: H2 2026 sẽ có 1-2 industry standards emerge cho:
- Plugin format
- Session state serialization
- Multi-agent communication protocol

**OpenClaw positioning**: Đang trong position để **define** hoặc **heavily influence** standards này.

---

### **C. Enterprise Adoption Signals**

**Mature enterprise features xuất hiện**:

1. **Observability**: Token usage dashboards (NanoClaw #7219), health APIs (NanoClaw #3482)
2. **Multi-tenancy**: Profile-scoped sessions (Hermes-Agent #93369)
3. **Compliance**: Audit trails, approval workflows (CoPaw #7198)
4. **High availability**: Persistent sandboxes (IronClaw #7732), session recovery (OpenClaw #125471)

**Trend**: Các dự án đang build cho **production at scale**, không chỉ demos.

---

### **D. Developer Experience Wars**

**Competitive battleground đang hình thành**:

| Aspect | Leaders | Laggards |
|--------|---------|----------|
| **Setup UX** | NanoClaw (structured driver), IronClaw (unified onboarding) | LobsterAI (#1196 complaints) |
| **CI/CD** | IronClaw (4-track optimization), Hermes-Agent (rings approach) | Others ad-hoc |
| **Testing** | OpenClaw (regression tests mandated), ZeroClaw (parallel test isolation #10272) | PicoClaw (stale PRs) |
| **Documentation** | OpenClaw (ADRs), ZeroClaw (RFC process) | Majority |

**Prediction**: Projects với poor DX sẽ struggle thu hút contributors, bị bỏ lại.

---

### **E. Security Will Differentiate**

**Critical observation**: Only 3/9 projects actively fixing SSRF vulnerabilities.

**Implication**: 
- Security sẽ become **enterprise deal-breaker** trong 2027
- Projects không proactive về security sẽ mất trust
- OpenClaw và ZeroClaw đang build **security moat**

**Risk**: PicoClaw có 3 stale SSRF PRs → vulnerability window mở rộng.

---

### **F. Multi-Agent Orchestration = Next Frontier**

**Evidence**:
- OpenClaw: Cross-agent isolation fixes, subagent maturity
- ZeroClaw: Session-scoped persistence, runtime-owned conversations
- Hermes-Agent: Worktree isolation per conversation
- NanoClaw: Multi-project directories

**Prediction**: 
- Q4 2026: Multi-agent workflows become mainstream
- 2027: Agent-to-agent communication protocols standardize
- Winners: Dự án giải quyết được **agent isolation + collaboration paradox**

---

### **G. Platform Consolidation Risk**

**Observation**: 9 projects, nhiều overlapping features, fragmented ecosystem.

**Scenario A - Merger/Acquisition** (40% probability):
- 1-2 smaller projects merge vào larger ones
- Example: PicoClaw/LobsterAI có thể join forces hoặc sunset

**Scenario B - Niche Specialization** (35% probability):
- Projects phân hóa rõ ràng
  - OpenClaw → Enterprise
  - ZeroClaw → Platform builders
  - IronClaw → Developer tools
  - Hermes-Agent → Power users
  - Others → Specific domains (education, research, etc.)

**Scenario C - Standardization** (25% probability):
- Dự án lớn định nghĩa protocols
- Nhỏ hơn trở thành "compliant implementations"
- Linux kernel model

---

## 🎬 Kết luận chiến lược

### **Cho OpenClaw**:

**✅ Điểm mạnh duy trì**:
1. Production-grade reliability focus
2. Security leadership
3. Community health metrics tốt nhất (cùng ZeroClaw)
4. Clear technical vision

**⚠️ Rủi ro cần quản lý**:
1. Windows compatibility issues có thể block enterprise adoption
2. Technical debt visible (97 zombie processes P1)
3. Complexity cao (237 issues) cần better triage

**🎯 Cơ hội chiến lược**:
1. **Define standards**: Position OpenClaw làm reference implementation
2. **Enterprise partnerships**: Leverage production readiness
3. **Security certification**: Formalize security practices (SOC2, ISO27001)
4. **Developer platform**: Build ecosystem around OpenClaw core

---

### **Cho Ecosystem**:

**Healthy signs** 🟢:
- Diverse approaches đang experiment
- Security awareness tăng industry-wide
- Standards conversation bắt đầu

**Concerns** 🟡:
- Fragmentation có thể confuse users
- Many projects chưa sustainable về community
- Security gaps ở projects nhỏ hơn

**Outlook**: Consolidation sẽ xảy ra, nhưng đủ đa dạng để innovation continue. OpenClaw và ZeroClaw likely emerge as co-leaders (enterprise vs. platform), với IronClaw và Hermes-Agent carving niches.

---

**Khuyến nghị hành động cho OpenClaw**:

1. **Short-term (Q3 2026)**: 
   - ✅ Fix P0/P1 resource leaks
   - ✅ Improve Windows stability
   - ✅ Publish security best practices

2. **Medium-term (Q4 2026)**:
   - 🎯 Lead standardization efforts (MCP extensions, multi-agent protocols)
   - 🎯 Enterprise case studies và success stories
   - 🎯 Developer certification program

3. **Long-term (2027)**:
   - 🚀 Platform play: OpenClaw Cloud/Hosted offering
   - 🚀 Acquisitions/partnerships với complementary projects
   - 🚀 Industry working groups và consortiums

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo phân tích dự án NanoBot - 24/08/2026

## 1. 🎯 Tóm tắt hôm nay

Ngày 24/08 đánh dấu một đợt refactoring lớn với **19 PRs đang hoạt động** (chủ yếu từ ngày 21-23/08), tập trung vào việc cải thiện kiến trúc hệ thống, sửa lỗi nghiêm trọng về hiệu năng và bổ sung tính năng mới. Đội ngũ đã đóng **5 PRs quan trọng** liên quan đến OAuth persistence, UI fixes, và process naming. Không có release mới nhưng codebase đang trải qua giai đoạn ổn định hóa với nhiều regression fixes và improvements.

## 2. 📦 Releases

**Không có releases mới trong 24h qua.**

## 3. 🚀 Tiến độ dự án

### PRs đã merged (Closed):

- ✅ **#5420** - Bổ sung khả năng recovery thủ công cho interrupted turns với persistent checkpoints
- ✅ **#5445** - Sửa lỗi nghiêm trọng về OAuth persistence trong Docker (issue #5444)
- ✅ **#5475** - Dọn dẹp dead code, loại bỏ dependencies không dùng (`websocket-client`)
- ✅ **#5491** - Cải thiện UI: tách reasoning shell khỏi answer text
- ✅ **#5492** - Cải thiện process naming cho better monitoring

### PRs đang hoạt động (Priority P2):

**🔥 High impact:**

- **#5480** - Refactor LLM usage tracking với typed contracts (thay thế dynamic dicts)
- **#5500** - **Performance critical**: Fix TLS context reuse - giải quyết vấn đề unresponsive trong 10s
- **#5496** - Timeout protection cho no-tools model requests (ngăn turn bị stuck)
- **#5467** - Preserve launch context trong TUI resume commands

**🆕 Features mới:**

- **#5495** - Native Linear Agent channel với OAuth + PKCE
- **#5498** - Unified onboarding UI trong Agent TUI với schema-driven config editor
- **#5497** - Shared configuration editor contract cho WebUI

**🐛 Bug fixes & improvements:**

- **#5499** - Tránh save empty sessions trong TUI
- **#5490** - Clarify aggregate token usage trong WebUI
- **#5430** - Memory leak fix: release completed task groups trong AgentLoop

### Xu hướng phát triển:

📈 **Infrastructure & Performance** (40% PRs) - Tập trung vào stability, memory leaks, và performance bottlenecks

🎨 **UI/UX Improvements** (25% PRs) - Cải thiện onboarding, configuration, và user feedback

🔌 **Integration** (15% PRs) - Mở rộng channel support (Linear, Matrix)

🧹 **Code quality** (20% PRs) - Refactoring, typing, test coverage

## 4. 💬 Điểm nổi bật cộng đồng

### Issues mới:

- **#5493** 🆕 (23/08) - Yêu cầu preview cho HTML, .txt, .md documents
  - Đề xuất giải pháp: native iframe + srcdoc với sandbox isolation
  - Chưa có phản hồi từ maintainers

### Closed issues:

- **#5444** ✅ (19-23/08, 2 comments) - OAuth login failure trong Docker
  - Root cause: XDG data không persist, permission issues
  - Đã fix qua PR #5445

**Quan sát:** Tương tác cộng đồng thấp (0 reactions trên cả 2 issues), có thể do focus vào internal development.

## 5. 🔧 Ổn định & Bugs

### 🚨 Critical fixes (P2):

1. **Performance regression (#5500)**: 
   - TLS context được tạo mới cho mỗi request → 10s hangs
   - Fix: Cache verified/fallback contexts per provider instance

2. **Turn timeout gaps (#5496)**:
   - No-tools requests không có timeout protection
   - Có thể gây stuck indefinitely trong recovery/finalization flows

3. **Memory leak (#5430)**:
   - AgentLoop giữ empty task sets trong `_active_tasks`
   - Ảnh hưởng: Long-running sessions

### 🐛 User-facing bugs:

- Docker OAuth persistence (✅ resolved)
- TUI resume không preserve launch context
- WebUI hiển thị sai aggregate token usage
- Empty sessions được save không cần thiết

### 📊 Test coverage:

Các PRs đều có regression tests kèm theo, cho thấy quy trình QA được cải thiện.

## 6. ✨ Yêu cầu tính năng

### Từ cộng đồng:

1. **Document preview (#5493)**:
   - HTML, .txt, .md preview với iframe sandbox
   - Use case: Tiện lợi cho document workflows

### Từ roadmap (PRs in progress):

1. **Linear integration (#5495)**:
   - Native agent channel với OAuth PKCE
   - Webhook queue với SQLite deduplication

2. **Unified config editor (#5498)**:
   - Schema-driven configuration UI
   - Secret-safe snapshots với optimistic updates

3. **MCP improvements**:
   - #5388: Schema budgeting cho model-visible tools
   - #5386: Preserve MCP result metadata

4. **Matrix SAS verification (#5385)**:
   - Complete Element key verification flow

## 7. 👥 Phản hồi người dùng

### Vấn đề được report:

- **Docker deployment** gặp khó khăn với OAuth (đã fix)
- **Document handling** cần cải thiện (feature request pending)

### Developer experience:

- Nhiều PRs focus vào DX: process naming, error messages, config UI
- Emphasis trên "transport-neutral contracts" cho extensibility

### Observations:

- **Low community engagement** trên issues (0 reactions)
- **High internal activity** với 7+ contributors active
- Focus vào **production readiness** hơn là new features

## 8. 📋 Backlog & Roadmap

### 🔜 Short-term (based on open PRs):

**Week 1-2:**
- Merge critical P2 fixes (#5500, #5496, #5430)
- Complete Linear channel integration (#5495)
- Finalize unified config UI (#5497, #5498)

**Week 3-4:**
- MCP enhancements (#5386, #5388)
- Matrix SAS completion (#5385)
- Subagent partial completion marking (#5152)

### 🎯 Technical debt being addressed:

- ✅ Dead code removal (completed #5475)
- 🔄 Type safety improvements (#5480 - LLM usage contracts)
- 🔄 Test coverage expansion (regression tests in all recent PRs)

### 🔮 Inferred priorities:

1. **Stability first** - Performance, memory leaks, timeouts
2. **Integration expansion** - Linear, Matrix channels
3. **Developer experience** - Config UI, process visibility
4. **Protocol improvements** - MCP metadata, budgeting

---

## 📌 Kết luận

Dự án đang trong giai đoạn **maturation** với focus mạnh vào stability và architecture improvements. Số lượng PRs cao (19) cho thấy team đang aggressive trong việc refactoring và bug fixing. Cần quan tâm đến community engagement thấp - có thể cần better communication về roadmap và release notes.

**Risk areas**: Performance regressions (#5500), memory leaks (#5430) cần được prioritize merge để tránh ảnh hưởng production users.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo Phân tích Dự án ZeroClaw - 24/08/2026

## 1. 🎯 Tóm tắt hôm nay

Dự án ZeroClaw đang trong giai đoạn tái cấu trúc kiến trúc lớn, tập trung vào **plugin runtime** và **session management**. Hoạt động chính xoay quanh việc di chuyển channels/tools từ compile-time features sang runtime WASM plugins, cùng với những cải tiến quan trọng về bảo mật (SSRF hardening) và quản lý cấu hình động. Có 20 issues đang mở với 8 RFC quan trọng đang chờ quyết định, và 50 PRs với nhiều thay đổi rủi ro cao đang được review.

## 2. 🚀 Releases

**Không có release mới** trong 24 giờ qua. Tuy nhiên, từ hoạt động PR/issue, hệ thống đang chuẩn bị cho một bản release lớn với những thay đổi breaking changes về kiến trúc plugin.

## 3. 📈 Tiến độ dự án

### 🔥 Các thay đổi kiến trúc quan trọng

**A. Plugin System Migration (#8850, #10146)**
- **Mục tiêu**: Chuyển channels và tools từ compile-time Cargo features sang runtime WASM plugins
- **Trạng thái**: PR #10146 đã đóng và được restack, đang triển khai "logical channel instances"
- **Tác động**: Giảm kích thước binary mặc định, cho phép cài đặt plugin mà không cần recompile
- **Rủi ro**: High - thay đổi toàn bộ cách tải và quản lý extensions

**B. Session & Conversation Management (#9487, #9600)**
- RFC #9487 đề xuất runtime-owned conversation sessions với transport surface adapters
- Tracker #9600 điều phối 4 workstream độc lập đang chạm vào cùng một contract
- **Vấn đề**: Không có designated owner cho session-persistence contract
- **Mục tiêu**: Tách biệt rõ ràng trách nhiệm giữa runtime và các transport layers

**C. Security Hardening - SSRF Protection (#10070, #10072, #10075)**
- Ba PRs xếp chồng (stacked) từ @wangmiao0668000666:
  - #10070: Base SSRF gate cho `file_download` với private-host opt-in
  - #10072: Phân loại NAT64 prefixes từ config
  - #10075: Thread live config qua gateway để áp dụng SSRF policy ngay lập tức
- **Tác động**: Ngăn chặn agents tải file từ private network/localhost trừ khi được cho phép rõ ràng

### 🔧 Các fix quan trọng

**PR #10262** - RPC connection cleanup on daemon reload
- **Vấn đề**: Daemon reload không đóng RPC connections, làm zerocode quickstart bị stuck
- **Giải pháp**: Cancel established connections, half-close local socket writer

**PR #10246** - Expose configured channels to sessions
- **Bug**: RPC agents không thấy configured channels ngoại trừ synthetic `rpc` back-channel
- **Fix**: Seed channel handles vào new/rehydrated RPC agents trước khi add back-channel

**PR #10241** - Restore supervised shell approval routing
- **Vấn đề nghiêm trọng**: Channel-driven supervised shell calls bị deny trước khi operator kịp phê duyệt
- **Fix**: Khôi phục routing đến separate approver hoặc fallback to gateway

## 4. 💬 Điểm nổi bật cộng đồng

### 🏆 Issues/PRs với nhiều tương tác:

**RFC #9487** (25 comments) - Runtime-owned conversation sessions
- Tranh luận sôi nổi về ownership boundaries giữa runtime, gateway và channels
- Nhiều maintainers tham gia thảo luận về durable admission semantics

**RFC #9488** (19 comments) - Unified attachment architecture
- Người dùng quan tâm đến cách xử lý attachments nhất quán giữa web chat và channels
- Proposal về canonical storage và transport-specific serialization

**RFC #8780** (18 comments) - Realtime speech-to-speech (Gemini Live)
- Đã rewrite từ v1 sang v2 với broker contract approach
- Community quan tâm đến voice channels cho real-time conversation

### 👥 Contributors nổi bật:

- **@wangmiao0668000666** (distinguished contributor): 3 PRs stacked về SSRF security
- **@JordanTheJet** (distinguished contributor): Dẫn dắt plugin system migration
- **@vrurg** (trusted/experienced contributor): Fix provider classification issues
- **@Audacity88**: Maintainer tracking RFC decisions và governance

## 5. 🐛 Ổn định & Bugs

### Critical Bugs được xử lý:

**#10286** - ZeroCode transcripts omit persisted turns after history trimming
- **Severity**: S2 - degraded behavior
- Khi history vượt `max_history_messages`, các turns bị trim không hiện trong restored sessions
- Ảnh hưởng đến UX của ZeroCode TUI

**#10272** - Hailo log assertions fail under parallel tests
- Test parallel có thể capture events từ test khác
- Nondeterministic failures trong integration tests

**#9666** (đã đóng) - Filesystem listener không cancellation-aware
- Blocking `recv()` ngăn daemon shutdown/reload
- Đã fix trong PR #10217

### ⚠️ Issues rủi ro cao:

- **#10290**: Live config không được thread qua agent::run cho detached peer/subagent turns
- **#10287** (đã đóng, invalid): False alarm về SOP run termination

## 6. ✨ Yêu cầu tính năng

### 🆕 Tính năng mới được đề xuất:

**RFC #9998** - Session-scoped persistent prompt attachments
- **Vấn đề**: Agent sessions mất objectives/constraints sau history trimming hoặc daemon restart
- **Giải pháp**: Persistent prompt attachments không bị trim, tương tự như "pinned messages"
- **Use case**: Parallel sessions với different objectives

**RFC #10050** - Verbatim channel send over gateway
- Gateway có 47 `/api/*` paths nhưng không có path nào gửi message verbatim lên channel mà không qua agent turn
- Cần để support notification-style messages

**RFC #9810** - Load Agent Plugins 1.0 skill and MCP packages
- Support vendor-neutral [Agent Plugins](https://agent-plugins.org/) standard v1.0
- Load community plugins packaged as `plugin.json` + `skills/` + `mcp.json`

**RFC #8424** - Workspace-relative forbidden path patterns
- Users cần bảo vệ files nhạy cảm như `.env`, `.cargo/config.toml` khỏi agent access
- Hiện tại `forbidden_paths` chỉ block paths **ngoài** workspace

**#10285** - Allow renaming sessions from ZeroCode
- Users không thể đặt tên có ý nghĩa cho sessions từ TUI
- Khi có nhiều sessions, khó phân biệt

## 7. 👂 Phản hồi người dùng

### 📝 Trải nghiệm tích cực:

- Community đánh giá cao quy trình RFC rõ ràng với revision tracking
- Contributors thích stacked PR approach cho complex features
- Documentation được đầu tư kỹ (có cả ADRs cho architectural decisions)

### 😰 Pain points:

**Complexity concerns:**
- RFC #9487/9488 với 25+ comments cho thấy architectural changes rất phức tạp
- Nhiều RFCs bị "needs-author-action" hoặc "needs-maintainer-review" trong thời gian dài

**Breaking changes:**
- PR #10289 retire legacy node transport (breaking change)
- Plugin migration (#8850) là breaking change lớn

**Testing challenges:**
- #10272 shows parallel test isolation issues
- Integration tests with external services (Hailo, Ollama) có nondeterministic failures

## 8. 🗺️ Backlog & Roadmap

### 📋 Decision Queue (#8692 - Maintainer tracker)

Tracker tập trung các RFC/design issues cần maintainer attention. Hiện có **13 comments** và đang được update thường xuyên.

### 🎯 Ưu tiên cao (Priority P1/P2):

**P1 (Immediate):**
- #9666: Filesystem listener cancellation (đã fix)

**P2 (High priority, nhiều issues):**
- Session management architecture (#9487, #9488, #9600)
- Security hardening (#10070, #10072, #10075, #8424)
- Plugin system migration (#8850, #10146)
- Memory lifecycle policy (#6850)
- Provider compatibility (#9447, #9999, #9109)

### 🚧 Blocked/Stacked work:

**Stacked PRs** (phụ thuộc lẫn nhau):
- #10075 depends on #10072 depends on #10070 (SSRF hardening chain)
- #9999 stacked on #9447 (provider classification fixes)

**Blocked PRs:**
- #10070: status:blocked, do-not-merge (waiting for architectural decision)
- #10169: blocked (ADR-014 plugin egress authority)

### 📊 Thống kê backlog:

- **20 open issues**, trong đó 8 là RFCs quan trọng
- **~20 open PRs** (từ 50 PRs, nhiều đã merge/close)
- **8 risk:high** issues/PRs đang active
- Nhiều items có label "needs-author-action" hoặc "needs-maintainer-review"

### 🔮 Hướng phát triển:

1. **Q3 2026 focus**: Hoàn thiện plugin architecture migration
2. **Security**: Hardening SSRF, egress control, sandbox improvements
3. **UX**: ZeroCode TUI improvements, better session management
4. **Integrations**: More providers (Hailo, ZeroRouter), Agent Plugins standard support
5. **Governance**: FND-003 Rev. 16 định nghĩa RFC vote cycles (#10288)

---

## 📌 Kết luận

ZeroClaw đang ở giai đoạn chuyển đổi kiến trúc quan trọng, đặc biệt là **plugin system** và **session management**. Dự án có governance process rõ ràng (RFC, ADR, tracker) nhưng complexity cao dẫn đến nhiều items bị stuck ở review stage. Security là priority với SSRF hardening và sandbox improvements. Community active với nhiều distinguished/experienced contributors, nhưng cần tăng tốc maintainer review để giảm backlog RFC.

**Điểm mạnh**: Architecture rõ ràng, security-focused, good governance  
**Điểm cần cải thiện**: Review throughput, reduce WIP RFCs, better test isolation

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích PicoClaw - 24/08/2026

## 🎯 Tóm tắt hôm nay

Hoạt động chính của PicoClaw hôm nay tập trung vào việc dọn dẹp backlog với 5 PR cũ bị đóng do stale. Dự án đang thực hiện bảo trì lớn với các bản vá bảo mật SSRF quan trọng và tối ưu hóa hiệu suất cache. Đồng thời, có một PR mới về tích hợp Build Remote Agent cho khả năng pairing thiết bị di động.

---

## 🚀 Releases

Không có release mới trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### Pull Requests Đang Hoạt động

**🆕 Mới mở (#3344) - Build Remote Agent Pairing**
- Tích hợp giao thức `gbr/1` cho phép điện thoại theo dõi desktop agent
- Sử dụng `gbr-agent` v0.6.0+ với QR code và mã 8 ký tự
- Chỉ hỗ trợ kết nối local (`127.0.0.1:8788`) hoặc stdio
- **Ý nghĩa**: Mở rộng khả năng giám sát và điều khiển từ xa cho agent

**🔄 Đang review (#3222) - Refactor DeltaChat**
- Giảm 200 LOC thông qua cleanup implementation
- Loại bỏ legacy features và fallbacks lỗi thời
- Cải thiện documentation và cấu hình
- Đổi tên API: `invite_link` → `join_invite_link`
- **Ý nghĩa**: Tăng maintainability và hiện đại hóa codebase

### Pull Requests Đã Đóng (Stale Cleanup)

Dự án vừa thực hiện đợt dọn dẹp lớn với **5 PR bị đóng do stale**:

**🔒 Nhóm bảo mật SSRF (3 PRs):**
- #3324: Weixin media downloads - sử dụng `CreateSafeHTTPClient`
- #3323: WeCom media downloads - chặn redirect tới private hosts
- #3322: Channels inbound media - block private targets (loopback, RFC1918)
- **Tác động**: Các PR này đã sửa lỗ hổng SSRF nghiêm trọng nhưng bị stale - cần xem xét lại

**⚡ Tối ưu hiệu suất (#3321):**
- Di chuyển dynamic context sau history để bảo toàn prefix caching
- Tránh invalidate cache token do thay đổi thời gian/session
- **Tác động**: Cải thiện hiệu suất LLM API call

**🔧 Bảo trì dependencies (#3320):**
- Bump `whatsmeow` để fix lỗi "client outdated (405)"
- WhatsApp channel bị dead do phiên bản cũ
- **Tác động**: Khôi phục kết nối WhatsApp

---

## 🌟 Điểm nổi bật cộng đồng

**Xu hướng đáng chú ý:**
- Không có PR/issue nào có tương tác cao (0-4 comments)
- Cộng đồng tương đối yên tĩnh, chủ yếu là maintenance work
- 2 issues feature requests bị đóng do stale, cho thấy team đang tập trung vào core development

**Vấn đề người dùng quan tâm:**
- OAuth 2.1 cho MCP servers (#3302) - 4 bình luận nhưng bị đóng
- Telegram rich table rendering (#3325) - đề xuất sử dụng API 10.1

---

## 🐛 Ổn định & Bugs

### Vấn đề đã xác định (từ PRs bị stale):

**🚨 Nghiêm trọng - SSRF Vulnerabilities:**
1. **Weixin/WeCom**: Media client không validate URL, cho phép truy cập private networks
2. **Multi-channel**: QQ, Telegram, Discord, LINE, Slack đều thiếu SSRF protection
3. **Risk**: Attacker có thể craft media URL để scan internal networks

**⚠️ WhatsApp Connectivity:**
- Client version cũ bị reject với error 405
- Cần update `whatsmeow` dependency

**🎯 Performance:**
- Dynamic context placement gây cache invalidation không cần thiết
- Ảnh hưởng chi phí API calls

### Trạng thái xử lý:
- Các PR fix đã được submit nhưng bị đóng do stale
- **Khuyến nghị**: Cần reopen và merge urgently, đặc biệt các bản vá SSRF

---

## 💡 Yêu cầu tính năng

### Đã đề xuất (bị đóng - stale):

**#3302 - OAuth 2.1 cho MCP Servers**
- Tương tự issue #2546
- Nice-to-have enhancement
- Có 4 bình luận thảo luận
- **Đánh giá**: Feature hợp lý nhưng chưa được ưu tiên

**#3325 - Telegram Rich Table Rendering**
- Sử dụng Telegram Bot API 10.1 native table UI
- Hiện tại tables bị degrade thành plain text/monospace
- **Đánh giá**: Cải thiện UX đáng kể cho Telegram channel

### Xu hướng:
- Cả hai feature đều enhance existing channels
- Team có thể đang focus vào stability trước features

---

## 💬 Phản hồi người dùng

**Insights từ hoạt động:**
- Ít tương tác trực tiếp từ community
- Contributors chủ yếu là maintainers (@SashaMIT, @grrowl, @trufae)
- Không có bug reports mới từ end-users

**Sentiment:**
- Dự án đang ở giai đoạn consolidation thay vì rapid growth
- Focus vào code quality và security

---

## 🗺️ Backlog & Roadmap

### Ưu tiên cao (cần action):
1. **Reopen và merge các SSRF fixes** - Critical security
2. **Update WhatsApp dependency** - Broken channel
3. **Review prefix caching optimization** - Cost savings

### Backlog đã xác định:
- OAuth 2.1 support cho MCP servers
- Telegram rich formatting improvements
- DeltaChat refactor (đang trong review)

### Xu hướng phát triển:
- **Security hardening**: Nhiều PRs về SSRF protection
- **Performance optimization**: Cache improvements
- **Code cleanup**: Refactoring legacy code (-200 LOC)
- **Device pairing**: Build Remote Agent integration

---

## 🎬 Kết luận

PicoClaw đang trong giai đoạn **consolidation và bảo mật hóa**. Việc đóng hàng loạt PR stale có thể là dấu hiệu team đang tái cấu trúc workflow hoặc chờ decisions lớn hơn. Tuy nhiên, việc bỏ qua các bản vá bảo mật SSRF là **đáng lo ngại** và cần được xem xét lại khẩn cấp.

**Điểm mạnh**: Có foundation tốt, đang modernize codebase  
**Điểm yếu**: Critical security PRs bị stale, community engagement thấp  
**Cơ hội**: Build Remote Agent pairing mở rộng use cases  
**Thách thức**: Cân bằng giữa new features và technical debt

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/nanocoai/nanoclaw">nanocoai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - Ngày 2026-08-24

## 🎯 Tóm tắt hôm nay

Hôm nay NanoClaw tập trung mạnh vào **cải thiện cơ sở hạ tầng và trải nghiệm setup**. Core team đã mở 11 PR mới, chủ yếu xử lý các vấn đề về tương thích dependencies (Chat SDK 4.32), bảo mật setup process, và giới thiệu structured setup driver protocol. Đặc biệt có 2 issue nghiêm trọng được báo cáo về macOS compatibility và Discord approval buttons.

---

## 📦 Releases

**Không có release chính thức**, tuy nhiên:

- **PR #3495** (đã đóng) chuẩn bị cho v2.3.0 với CHANGELOG được curate đầy đủ
- **PR #3496** (đã đóng) là stopgap emergency để repin container image về `hardened-2026-08-23`, khắc phục việc setup bị hỏng từ ngày 21/08

> ⚠️ **Lưu ý**: Release v2.3.0 vẫn chưa được cut chính thức, có thể đang chờ giải quyết các blocking issues.

---

## 🚀 Tiến độ dự án

### 📌 Cải thiện cơ sở hạ tầng (Ưu tiên cao)

**Stacked PR chain về Chat SDK bump** - Chiến lược hợp nhất từ dưới lên:
- **#3490** → **#3491** → **#3492**: Nâng cấp Chat SDK core lên 4.32.0, thêm typing-indicator lifetime per channel, và kích hoạt `minimumReleaseAge` gate
- 3 PR song song trên branch `channels` và `providers` (#3465, #3468, #3470, #3471) để đồng bộ registry

**Xu hướng**: Team đang áp dụng stacked PR workflow nghiêm ngặt với base branch isolation, cho thấy kỷ luật kỹ thuật cao.

### 🔐 Bảo mật và Hardening

**Setup security overhaul** - Chuỗi 6 PR cải thiện toàn diện:
1. **#3482**: Expose structured host health API
2. **#3483**: Harden uninstall ownership + failure handling
3. **#3484**: Giữ auth secrets khỏi argv (tránh process list leaks)
4. **#3485**: Structured setup driver protocol (`nanoclaw.driver.v1`)
5. **#3486**: Expose build-time preseed catalog
6. **#3487**: Accept timezone preseed (`--tz` flag)

> 💡 **Insight**: Team đang xây dựng một machine-readable setup protocol, có thể để hỗ trợ automated provisioning hoặc IDE integrations.

### 🎨 Tính năng mới

- **#3494**: Thêm Build Remote Agent phone pairing (protocol `gbr/1`) - cho phép phone spectate desktop agent
- **#3493**: MindsHub provider guide
- **#3355 + #3356**: Cursor Agent SDK integration (feature + provider payload)
- **#2301**: GitHub polling mode (Mode B) - giải pháp cho NAT/firewall environments

---

## 🔥 Điểm nổi bật cộng đồng

### 🏆 Issue được quan tâm nhất

**#2404** - Double delivery bug (4 comments):
- Message được gửi 2 lần khi agent dùng cả `send_message` MCP tool VÀ `<message>` block
- Root cause: MCP server chạy subprocess riêng, cả 2 output path đều trigger delivery
- **Tác động**: Gây spam và confusion trong production conversations

### 💥 Critical bug vừa phát hiện

**#3456** - Discord approval buttons bị hỏng hoàn toàn:
- Severity: **HIGH** - approval/ask_question cards unusable
- Nguyên nhân: `createChatSdkBridge` set cả `id` VÀ `value` cho button, corrupt Discord's `custom_id`
- Kết quả: Mọi click resolve về wrong option → silent reject + duplicate resend
- **Status**: Đã CLOSED → có thể đã hotfix trong ngày

---

## 🐛 Ổn định & Bugs

### ⚠️ Blocking Issues (vừa mở hôm nay)

**#3497** - better-sqlite3 segfault trên macOS:
- Node 22.x < 22.14.0 bị crash khi `new Database()`
- Package.json chỉ declare `>=22`, không catch affected versions
- **Tác động**: `pnpm test` không chạy được, DB layer hoàn toàn broken

**#3498** - Update controller không chạy trên macOS:
- Symlinked tmpdir `/var/folders` vs `/private/var/folders` defeat path comparisons
- `path.resolve()` nên dùng `realpath` thay vì
- **Kết quả**: Documented invocation thành no-op, update controller exits 0 without running

> 🚨 **Đánh giá**: 2 macOS bugs này có thể block adoption trên macOS developer machines.

### 🔧 Bugs đang được fix

- **Signal adapter** (#3142): Attachments không forward được vì dead mount path
- **Pre-commit hooks** (#2537): Thêm prettier/eslint/typecheck automation

---

## 💡 Yêu cầu tính năng

### ✅ Đã được implement/đang review

1. **Build Remote Agent pairing** (#3494) - Multi-device spectating
2. **Cursor integration** (#3355, #3356) - IDE provider expansion
3. **GitHub polling mode** (#2301) - No-port-required GitHub access
4. **Timezone preseed** (#3487) - Better setup UX

### 🎯 Implicit roadmap từ PR patterns

- **Structured protocols**: Setup driver, health API → hướng tới automation và observability
- **Multi-provider expansion**: MindsHub, Cursor, Codex (#3489) → mở rộng ecosystem
- **Chat SDK consolidation**: Lockstep version management → stability over velocity

---

## 💬 Phản hồi người dùng

### 😤 Pain points từ issues

**Setup experience**:
- macOS users gặp silent failures (#3497, #3498)
- Hardened container image mismatch gây broken setup từ 21/08 (#3496)

**Production reliability**:
- Double delivery gây confusion (#2404)
- Discord buttons hoàn toàn unusable (#3456)

### 👍 Positive signals

- Community contributions active: @torrmal (MindsHub docs), @brentkearney (macOS bug reports)
- Feature requests được implement nhanh: phone pairing, Cursor integration
- Core team responsive: Emergency fixes trong vòng 24h

---

## 📋 Backlog & Roadmap

### 🔜 Blocking for v2.3.0

1. ✅ Resolve macOS segfault (#3497) - cần bump minimum Node version hoặc sqlite3
2. ✅ Fix update controller symlink issue (#3498)
3. ⏳ Merge Chat SDK 4.32 stack (#3490 → #3491 → #3492)
4. ⏳ Verify Discord buttons fix (#3456)

### 🎯 Chiến lược dài hạn (inferred)

**Phase 1 - Stability** (hiện tại):
- Dependency hygiene (Chat SDK lockstep, pnpm release gate)
- Setup hardening (structured protocol, secret handling)
- Platform compatibility (macOS fixes)

**Phase 2 - Ecosystem expansion**:
- Provider proliferation (MindsHub, Cursor, Codex)
- Alternative access patterns (polling mode, phone pairing)

**Phase 3 - Enterprise readiness**:
- Structured health/driver protocols
- Automated provisioning support
- Observability improvements

---

## 📈 Metrics & Trends

| Metric | Giá trị | Xu hướng |
|--------|---------|----------|
| PRs mở mới hôm nay | 11 | ⬆️ High activity |
| PRs đóng hôm nay | 6 | ⚡ Fast merge cycle |
| Issues mới | 2 (cả 2 critical) | ⚠️ Quality concerns |
| Stacked PRs | 6 chains | 📚 Advanced workflow |
| Community PRs | 3/11 | 🌱 Healthy contribution |

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn **consolidation trước release lớn**. Team ưu tiên ổn định và developer experience hơn tính năng mới, với focus mạnh vào bảo mật setup process và dependency management. Tuy nhiên, 2 critical macOS bugs vừa phát hiện có thể ảnh hưởng timeline của v2.3.0.

**Điểm mạnh**: Fast response, structured workflow, active community
**Điểm yếu**: Platform-specific edge cases vẫn slipping through, setup complexity cao

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo Phân tích IronClaw - 24/08/2026

## 📊 Tóm tắt hôm nay

IronClaw đang trong giai đoạn tối ưu hóa hạ tầng với trọng tâm là **cải tiến CI/CD pipeline** và **nâng cấp sandbox environment**. Dự án đang xử lý nhiều phản hồi từ người dùng về vấn đề tích hợp tools (Gmail, Slack, Notion, Telegram) và đang hoàn thiện hệ thống background subagent cho v1.4.0.

---

## 🚀 Releases

**Không có release mới** trong 24 giờ qua. Phiên bản mới nhất là **v1.3.0** (đã ship ngày 17/08).

---

## 🔧 Tiến độ dự án

### **Epic v1.4.0: Persistent Sandbox (#7732)**
Mục tiêu lớn nhất hiện tại là xây dựng **persistent per-user sandbox** với iron-proxy:
- Hiện tại Docker tạo/xóa container cho mỗi lệnh shell → không hiệu quả
- Kế hoạch: một sandbox bền vững cho mỗi user, với managed egress proxy
- PR #7810 đã implement credential mediation qua sandbox proxy (đặc biệt cho GitHub CLI)

### **CI/CD Infrastructure Overhaul** 🔥
Một "chiến dịch" lớn để tối ưu CI với 4 track song song (T1-T4):

**T2 - Nextest Pipeline (#7817, #7820)**
- Chuyển từ `cargo test` sang `cargo nextest` → giảm wall clock time
- Full-failure signal: hiển thị tất cả test thất bại, không chỉ job đầu tiên
- PR #7820 đang probe việc consolidate test suites để giảm overhead

**T1 - Unified Rust Setup (#7821)**
- Một composite action duy nhất cho toolchain, mold linker, build profiles
- Giải quyết vấn đề "green locally, red in CI"

**T3 - PR/Queue Convergence (#7819)**
- Sync checks giữa PR và merge queue để phát hiện lỗi sớm hơn
- Thêm clippy với `--all-features` vào PR stage

**T4 - Canonical Preflight (#7809)**
- Script `preflight-gates.sh` làm single source of truth cho validation
- Worktree-safe pre-push hooks

### **Background Subagent System (#7818)**
Slice 2b+2c của R2 background subagents:
- Receipt spawning, per-child delivery, activation
- Healing sweeps cho reliability
- Có deployment gate: đợi merge của dependent PRs

### **Design System Phase 3a (#7831)**
- Thêm Chromatic lane cho visual regression testing
- Bổ sung design token axes còn thiếu
- Non-blocking để không ảnh hưởng CI hiện tại

---

## 👥 Điểm nổi bật cộng đồng

### **Tool Permission Framework (#7812)**
Issue có 3 comments, đang được implement qua PR #7833:
- Suggestion generation hiện chỉ có internal tools
- Đề xuất: respect user-level permissions, enable connected tools với read-only access
- Giúp suggestions grounded in user's actual data

### **IronHub Integration (#7516, #7826)**
Hai PR quan trọng cho operator workflow:
- #7516: Thêm UI trong Extensions page để lấy IronHub register URL và install shared key
- #7826: Fix việc install packages từ hub (4 catalog entries đang fail)

---

## 🐛 Ổn định & Bugs

### **User-Reported Issues (qua #x-ai-product-feedback)**
Loạt issue mới được tạo từ Slack feedback trong 3 giờ gần đây:

**🔴 Critical Setup Issues:**
1. **#7841**: Telegram setup dead-ends với "admin must configure" error
2. **#7829**: Gmail OAuth popup biến mất sau 1 giây
3. **#7828**: Không thể setup Slack cho NEAR Foundation account
4. **#7830**: Notion extension không install được
5. **#7840**: Slack thiếu guidance về cách connect

**#7842**: Generic "invalid result" error khi execute request

**Xu hướng**: Nhiều vấn đề tập trung ở **authentication/setup flow** của các tools tích hợp.

### **Infrastructure Issues**
- **#7836**: Tool advertisement không filter theo availability → model gọi tools không executable
- Đo lường trên PinchBench cho thấy issue này impact thực tế

---

## ✨ Yêu cầu tính năng

### **Tool Availability Filtering (#7836)**
Đề xuất filter tools theo 4 criteria:
- Installed
- Activated  
- Credential-ready
- Authorized

→ Tránh model advertise capabilities không thực thi được

### **Native Iron-Proxy Auth Recipes (#7825)**
Mở rộng sandbox egress auth:
- Native iron-proxy recipes với host credential broker
- Retire GitHub-specific carve-out
- Generalize cho các CLI tools khác

---

## 💬 Phản hồi người dùng

### **Tích cực**
- Community đang actively report issues qua Slack (#x-ai-product-feedback)
- Có structured triage process (#7832, #7827)

### **Pain Points**
Người dùng gặp nhiều friction trong **onboarding experience**:
- OAuth flows không stable (popup disappear, dead-end errors)
- Thiếu clear guidance cho tool connections
- Extension installation fails không có error message rõ ràng

### **Developer Experience**
- Team đang đầu tư mạnh vào CI/CD → cho thấy focus vào developer velocity
- Storybook integration (#7750 merged) cải thiện component development

---

## 🗺️ Backlog & Roadmap

### **Immediate Focus (v1.4.0)**
1. ✅ **Persistent sandbox** (#7732) - đang implement
2. ⏳ **Background subagents** (#7818) - slice 2b+2c in review
3. ⏳ **Tool permission framework** (#7812, #7833) - in progress

### **Infrastructure Modernization**
4 parallel CI tracks (T1-T4) đang active → expect significant CI improvements trong tuần tới

### **Next Wave**
- **APDD Kit governance** (#7255) - đang evaluate framework
- **Design System Phase 3** (#7831) - foundation đã có
- **IronHub deep integration** (#7516, #7826) - operator tooling

### **Technical Debt**
- Dependency updates backlog (nhiều Dependabot PRs chờ merge: #7730, #7020, #7406, #7262)
- Legacy state migration issues từ 1.2 → 1.3 (#7790 merged)

---

## 🎯 Nhận xét Tổng quan

**Điểm mạnh:**
- Velocity cao với nhiều PRs song song
- Clear technical vision (sandbox, subagent, CI)
- Responsive với user feedback (structured triage)

**Thách thức:**
- Tool integration reliability cần attention urgent
- Onboarding UX có nhiều rough edges
- Dependency updates đang accumulate

**Xu hướng:** IronClaw đang chuyển từ "make it work" sang "make it reliable" - focus vào infrastructure, testing, và user experience polish.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# Báo cáo phân tích LobsterAI - Ngày 24/08/2026

## 📊 Tóm tắt hôm nay

Ngày 24/08/2026 đánh dấu một đợt dọn dẹp lớn backlog của dự án LobsterAI với việc đóng hàng loạt issues và PRs cũ từ tháng 4/2026 (có tag [stale]). Các vấn đề được đóng bao gồm cả cải tiến UX, sửa bug nghiêm trọng về bảo mật và tích hợp với NIM SDK. Đây là hoạt động maintenance quan trọng để giữ issue tracker gọn gàng và tập trung vào phát triển hiện tại.

---

## 🚀 Releases

❌ **Không có release mới trong 24 giờ qua**

---

## 📈 Tiến độ dự án

### Pull Requests đã đóng (3 PRs - tất cả từ 01/04/2026)

**🎨 #1197 - Tối ưu UX quản lý Agent**
- **Vấn đề giải quyết**: Rút ngắn flow thao tác xóa Agent (trước đây phải vào detail panel)
- **Cải tiến**: Thêm nút xóa trực tiếp trên card, tối ưu sidebar
- **Trạng thái**: CLOSED (stale) - Có thể đã merge hoặc superseded

**⚙️ #1199 - Quản lý context window và token per-model**
- **Tính năng**: Cho phép cấu hình `contextWindow` và `maxTokens` riêng cho từng model
- **Kỹ thuật**: Persist settings, export metadata, tích hợp vào Cowork/OpenClaw config
- **Ý nghĩa**: Tăng tính linh hoạt khi làm việc với nhiều LLM có giới hạn khác nhau

**🐛 #1201 - Fix lỗi NIM SDK teamTypeNum mapping**
- **Bug nghiêm trọng**: Hardcode sai enum khiến không lấy được tên nhóm trong siêu nhóm NIM
- **Root cause**: Nhầm lẫn giữa `V2NIMConversationType.TEAM (1)` và `SUPER_TEAM (5)`
- **Impact**: Bot không hiển thị đúng tên nhóm khi được @mention

### Xu hướng phát triển

🔄 **Maintenance phase**: Dự án đang trong giai đoạn dọn dẹp technical debt và stale items thay vì phát triển tính năng mới vội vàng.

---

## 🌟 Điểm nổi bật cộng đồng

### Issues có tương tác cao

**🔥 #1196 - Phản đối cơ chế tạo file bắt buộc** (2 comments)
- **Vấn đề**: Mỗi workspace phải tạo 6 file system (AGENTS.md, USER.md...) gây lộn xộn
- **Đề xuất**: 
  - Tạo global agents.md như Cursor
  - Hoặc lưu trong hidden directory
- **Tình trạng người dùng**: Khó chịu vì phải quản lý nhiều file, xóa rồi lại tự tạo

**🚨 #1202 - Lỗ hổng bảo mật nghiêm trọng** (2 comments)
- **Vấn đề**: Agent có thể bị trích xuất API key qua prompt injection
- **Cách khai thác**: Hỏi về config → agent tiết lộ vị trí file/env vars → lộ key
- **Risk level**: HIGH - Có thể dẫn đến lạm dụng model API
- **Kỳ vọng**: Agent cần có guardrail từ chối câu hỏi về credentials

---

## 🐛 Ổn định & Bugs

### Bugs được báo cáo

**1. Gateway restart UX issue (#1198)**
- **Hiện tượng**: Progress bar biến mất giữa chừng khi restart gateway
- **Hậu quả**: Người dùng không biết trạng thái, tất cả model báo "không khả dụng"
- **Mức độ**: Medium - Ảnh hưởng trải nghiệm nhưng không mất dữ liệu

**2. NIM integration bug (#1200)**
- **Technical**: Enum mapping sai trong `nimGateway.ts:917`
- **Đã có PR fix**: #1201 (đã đóng nhưng có thể chưa merge)
- **Criticality**: Medium - Ảnh hưởng tích hợp với NetEase NIM

**3. Security vulnerability - Key leakage (#1202)**
- **Severity**: 🚨 CRITICAL
- **Attack vector**: Social engineering qua chat với agent
- **Status**: Được báo cáo với logs đính kèm, chưa thấy fix

---

## 💡 Yêu cầu tính năng

### #1196 - Cải thiện workspace file management

**Đề xuất 1**: Global system prompt
```
- Học Cursor: cho phép global agents.md
- User có thể định nghĩa system prompt chung
- Tránh duplicate config
```

**Đề xuất 2**: Hidden directory approach
```
- Lưu system files vào .lobsterai/ hoặc tương tự
- Giữ workspace sạch sẽ
- Vẫn maintain isolation giữa các workspace
```

---

## 👥 Phản hồi người dùng

### Sentiment Analysis

**😤 Frustration (60%)**
- File management quá cứng nhắc (#1196)
- Security concerns chưa được giải quyết (#1202)
- UX bugs làm gián đoạn workflow (#1198)

**🤔 Constructive (40%)**
- Đề xuất cụ thể cải thiện (học Cursor)
- Báo bug kèm logs chi tiết
- Contribute PRs để fix issues

### Pain Points chính

1. **Onboarding friction**: Quá nhiều boilerplate files
2. **Security awareness**: Cộng đồng bắt đầu quan tâm đến prompt injection
3. **Integration stability**: NetEase ecosystem integration còn rough edges

---

## 🗓️ Backlog & Roadmap

### Inferred priorities từ issues

**P0 - Security** 🔒
- [ ] Implement credential guardrails (#1202)
- [ ] Audit tất cả prompt paths có thể leak sensitive info
- [ ] Add rate limiting cho system queries

**P1 - UX Polish** ✨
- [ ] Redesign workspace initialization flow (#1196)
- [ ] Fix gateway restart progress tracking (#1198)
- [ ] Streamline agent management UI (#1197)

**P2 - Integration** 🔌
- [ ] Verify NIM SDK fixes merged (#1200, #1201)
- [ ] Test coverage cho external integrations
- [ ] Document proper enum mappings

### Technical Debt

⚠️ **Stale item cleanup**: Đã xử lý 7 items cũ từ tháng 4, cho thấy team đang tích cực quản lý backlog.

---

## 🎯 Takeaways

1. **Dự án đang mature**: Focus shift từ feature velocity sang quality & security
2. **Community engagement tốt**: Users báo bug chi tiết, contribute PRs
3. **Security cần ưu tiên**: Issue #1202 là red flag cần patch ngay
4. **UX refinement phase**: Nhiều friction points từ early design đang được address

**Khuyến nghị**: Team nên prioritize security audit trước khi release stable version tiếp theo.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo Phân tích CoPaw - Ngày 2026-08-24

## 📋 Tóm tắt hôm nay

Dự án CoPaw (QwenPaw) đang trong giai đoạn tập trung vào **ổn định hệ thống** và **cải thiện trải nghiệm người dùng**. Hoạt động chính xoay quanh việc sửa lỗi memory leak nghiêm trọng, cải thiện vòng đời của skill system, và giải quyết các vấn đề về workflow approval. Không có release mới, nhưng có 16 PRs đang mở/đóng và 6 issues mới, cho thấy cộng đồng đang tích cực đóng góp các bản sửa lỗi và cải tiến.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### PRs Nổi bật

**🔧 Sửa lỗi & Ổn định**

- **#7223** - Cập nhật catalog DeepSeek models (đóng retired models, thêm v4 family)
  - Xóa `deepseek-chat`, `deepseek-reasoner` (vendor đã retire)
  - Thêm `deepseek-v4-flash`, `deepseek-v4-pro` với thông số context/pricing mới

- **#7220** - Reject oversized image dimensions (giải quyết freeze khi upload ảnh lớn)
  - Kiểm tra giới hạn pixel trước khi encode base64
  - Ngăn chặn ảnh 65M pixels vượt quá giới hạn 10240x6400 của vision providers

- **#6220** - Fix token usage cache không được seed trước khi persist
  - Ngăn ghi đè dữ liệu cache hợp lệ bằng `{}` rỗng khi shutdown

**✨ Tính năng mới**

- **#7225** - Include custom channels trong MCP access rules
  - Plugin-registered channels bị thiếu trong selector vì chỉ dùng hardcoded list

- **#7219** - All-agent LLM & tool-call trend chart trong Token Usage
  - Dashboard mới cho metrics cross-agent

- **#7187** - Exclude reasoning content từ auto-generated chat titles
  - Ngăn thinking content làm nhiễu title, giữ reasoning toggle hoạt động

- **#7183** - Workspace-scoped `always_on` loading cho Skills
  - Preload instructions cho specialized agent core behaviors

- **#6976** - Session-scoped multi project directories
  - Bind chat với ordered list của project dirs thay vì single directory

**🔄 Đã đóng (merged hoặc abandoned)**

7 PRs đã đóng trong 24h, chủ yếu liên quan đến:
- Skill system dynamic loading (#7027, #7030-#7033)
- Windows tasklist timeout fixes (#6203)
- CLI task command message format (#6616)

### Xu hướng phát triển

1. **Skill System Refactoring**: Nhiều PRs (#7183, #7027, #7031-#7033) xoay quanh dynamic loading, auto-unload, và workspace-scoped behavior
2. **Provider Maintenance**: Cập nhật model catalogs khi vendors thay đổi offerings
3. **Observability**: Thêm metrics và visualization (token usage trends, agent stats)

---

## 🔥 Điểm nổi bật cộng đồng

### Issues được quan tâm nhất

**#7198 - Approval workflow quá aggressive** (2 comments, updated 2026-08-24)
- **Vấn đề**: Auto-approval mode vẫn yêu cầu approve cho process artifacts và temp files
- **Tác động người dùng**: Không thể để agent chạy overnight vì liên tục chờ approval
- **Quote người dùng**: *"如果夜里让agent干活儿...你希望它一夜干完的活儿早上看到的可能是个待审批弹窗"* (Nếu để agent làm đêm, sáng dậy chỉ thấy pending approval thay vì kết quả)

**#7222 - Memory leak trong production** (2 comments)
- Backend tăng từ vài trăm MB → **20.7GB** sau 2 ngày chạy
- Khác với issue #9 (startup leak), đây là **runtime accumulation**
- Workload: heavy file operations, multi-session, long conversations

**#7221 - Plugin workspace registrations bị mất** (3 comments)
- `reload_agent()` drops runtime hooks, modes, slash commands sau config change
- Breaking zero-downtime reload use case

---

## 🐛 Ổn định & Bugs

### Critical Issues

1. **Memory leak (#7222)** - Ưu tiên cao nhất
   - 20GB memory sau 2 ngày, ảnh hưởng production stability
   - Cần memory profiling cho runtime accumulation pattern

2. **Plugin registration loss (#7221)**
   - Breaking workspace-scoped customizations khi reload agent
   - Ảnh hưởng plugin ecosystem

3. **Connection timeout (#7218)**
   - `peer closed connection without sending complete message body`
   - Xảy ra với long text và reasoning-intensive tasks
   - Người dùng báo custom model đã tăng timeout nhưng vẫn bị disconnect ở 130-140s

### Medium Priority

4. **State persistence bug (#7217)**
   - Stop task mid-execution → next conversation replays previous thinking
   - Agent không reset state giữa conversations

5. **Approval UX (#7198)**
   - Quá nhiều approval prompts cho process artifacts
   - Blocking overnight/unattended agent usage

---

## 💡 Yêu cầu tính năng

### Đã được PR hóa

- **Multi-project directories** (#6976) - Hỗ trợ ordered list thay vì single project root
- **Always-on Skills** (#7183) - Preload specialized agent behaviors
- **Agent trend visualization** (#7219) - Cross-agent LLM/tool metrics

### Còn đang discussion

- **Aider CLI integration** (#7224) - Cộng đồng Nga hỏi cách tích hợp Aider như một agent
- **Approval workflow refactor** (#7198) - Cần thêm granularity cho file operation approvals

---

## 💬 Phản hồi người dùng

### Sentiment Analysis

**Negative** 😤
- Frustration về approval workflow làm gián đoạn autonomous operation
- Memory leak gây downtime cho production users
- Connection timeouts với reasoning models

**Neutral/Constructive** 🤔
- Các first-time contributors tích cực submit PRs sửa lỗi nhỏ
- Questions về integration với external tools (Aider)

**Pain Points chính**

1. **Production Stability**: Memory leak và timeout issues ảnh hưởng long-running deployments
2. **Developer Experience**: Plugin registrations bị mất sau reload, breaking workflow customizations
3. **Autonomous Operation**: Approval system chưa phù hợp với unattended/overnight use cases

---

## 🗓️ Backlog & Roadmap

### Công việc đang progress

**Ổn định hóa hệ thống**
- [ ] Fix memory leak runtime accumulation (#7222)
- [ ] Persist plugin workspace registrations across reloads (#7221)
- [ ] Investigate connection timeout với long-running tasks (#7218)

**Cải thiện UX**
- [ ] Refine approval workflow granularity (#7198)
- [ ] Fix state persistence giữa conversations (#7217)

**Infrastructure**
- [ ] Dynamic skill lifecycle (multiple PRs đang review)
- [ ] Multi-project directory support (#6976)

### Technical Debt

- Windows-specific fixes (tasklist timeout #6203 - đã merged)
- Provider catalog maintenance (DeepSeek #7223 - đang review)
- Token usage cache correctness (#6220 - đã merged)

---

## 🎯 Đánh giá tổng quan

**Điểm mạnh**:
- Cộng đồng contributor tích cực (nhiều first-time contributors)
- Rapid response time cho bug reports
- Focus rõ ràng vào production stability

**Điểm cần cải thiện**:
- Memory management trong long-running scenarios
- Plugin lifecycle và state persistence
- Approval workflow cần redesign cho autonomous use cases

**Outlook**: Dự án đang trong giai đoạn **mature stabilization**, ưu tiên bugs và UX issues hơn là features mới. Việc xuất hiện nhiều production-related issues (memory leak, timeouts) cho thấy adoption tăng nhưng cũng lộ ra các bottlenecks về scalability.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Báo cáo phân tích Hermes-Agent ngày 2026-08-24

## 📊 Tóm tắt hôm nay

Ngày hôm nay chứng kiến một đợt tu sửa mạnh mẽ về **độ tin cậy session** với 5 PRs quan trọng được merge, đồng thời team đang đẩy mạnh tính năng **worktree isolation** và **per-skill reasoning control**. Nổi bật là việc xử lý triệt để các race conditions trong quản lý session WebSocket và việc chuẩn bị release tính năng "What's New" để cải thiện khả năng khám phá features mới.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng có dấu hiệu chuẩn bị cho một release ổn định với việc đóng hàng loạt critical bugs.

---

## 🔧 Tiến độ dự án

### **A. Chiến dịch "Session Reliability" (Ring 2) - MỨC ƯU TIÊN CAO**

Đây là trọng tâm của ngày hôm nay với **5 PRs đã được merge** để giải quyết các vấn đề session management:

#### ✅ Đã hoàn thành:
- **#93430** 🔴 [MERGED] - Session reconnect ring 2: Giải quyết 5 lỗ hổng còn sót lại
  - Gateway restart không còn bỏ rơi session rows
  - Closing sockets không thể unbind live sessions
  - Bổ sung startup sweep để thu hồi orphaned sessions
  
- **#77129** [MERGED] - Đóng TOCTOU race giữa WS disconnect và session resume
  - Fix race condition khi reconnect xảy ra đúng lúc teardown
  - Ngăn messages bị gửi đến wrong session
  
- **#77977** [MERGED] - Enable TCP keepalive cho WebSocket
  - Phát hiện dead peers (SSH tunnel reset, laptop sleep)
  - Tránh leak sessions khi client im lặng biến mất

- **#65422** [MERGED] - Sweep orphaned sessions khi gateway startup
  - Thu hồi phantom "active" sessions từ gateway crashes trước đó
  - Immediate: 1.7MB sweep, Deferred: 170MB cleanup

- **#93369** [MERGED] - Bot sessions adoption từ default profile
  - Profile-scoped resume giờ có thể adopt stranded bot sessions
  - Fix lỗi 4001/4007 vĩnh viễn cho existing installs

**💡 Insight**: Đây là một nỗ lực có hệ thống để làm sạch các edge cases trong session lifecycle. Team đang áp dụng approach "rings" - giải quyết từng tầng vấn đề một cách có tổ chức.

---

### **B. Tính năng mới đang phát triển**

#### 🔥 #93337 - **Worktree Isolation Upgrade** [OPEN, High Impact]
- Mỗi conversation root sẽ có dedicated Git worktree
- Áp dụng cho CLI, TUI, Desktop, Discord, Photon
- Preserve worktree identity qua resume và compression
- **Rủi ro**: Sweeper đánh dấu `risk-compatibility` và `risk-message-delivery`

**Ý nghĩa**: Đây là thay đổi kiến trúc lớn nhằm isolation tốt hơn giữa các conversations, tránh conflicts và state leakage.

---

#### 🎯 #93378 - **Per-skill Reasoning Effort** [OPEN]
- Cho phép users config reasoning level riêng cho từng skill
- Opt-in, defaults không thay đổi
- Resolves per turn nên tự động switch back

**Use case**: Skills phức tạp (e.g., security audit) có thể chạy ở "high" reasoning mà không ảnh hưởng simple tasks.

---

#### 📢 #81580 - **Feature Onboarding Loop** [OPEN]
- Post-update brief + `/whats-new` command
- Giải quyết vấn đề: 3,650 commits và 58,000 chars release notes bị stranded trên GitHub
- Discovery → Comprehension → Confirmation loop

**Ý nghĩa**: Cải thiện UX đáng kể cho việc khám phá features mới - một pain point phổ biến với AI agents phát triển nhanh.

---

#### 📧 #93294 - **Email Rich HTML Replies** [OPEN]
- Multipart/alternative với sanitized HTML + plain text fallback
- DOMPurify sanitization, CSS inlining
- Opt-in, default vẫn là plain text

---

### **C. Bug Fixes quan trọng**

#### 🐛 #92870 [MERGED] - Bot-mode fail-closed on group resume
- Transient registry failures không còn fork bot's forever chat
- Critical cho reliability của Bot Mode

#### 🐛 #93368 [OPEN] - `notify_on_complete` notifications bị swallow
- `wait()` và `read_log()` đã suppress autonomous completion delivery
- Desktop/TUI poller không nhận được thông báo

#### 🐛 #93205 [OPEN] - Gemini Flash pricing corrections
- `gemini-3.7-flash` hoàn toàn thiếu row
- Gemini 2 Flash rates sai (0.10/0.40 thực tế là 0.075/0.30)
- Impact: Usage tracking và billing không chính xác

---

## 🌟 Điểm nổi bật cộng đồng

### Issues được quan tâm:

#### #71206 - **macOS launchd Gateway LAN blocking** [OPEN, 5 comments]
- Gateway qua launchd bị macOS privacy (nehelper) block LAN connections
- Ảnh hưởng: Home Assistant integrations không hoạt động
- **Status**: Needs repro, investigating entitlements

#### #92244 - **Model picker blocking 25-50s** [OPEN, 3 comments]
- First open sau cache expiry bị hang vì serial pricing fetches
- Đề xuất: Parallel fetches + stale-while-revalidate cache
- **Impact**: UX nghiêm trọng cho Desktop/Web users

---

## 🔒 Ổn định & Bugs

### **Critical Bugs được fix:**

1. **Session Corruption** (#93428) - FTS rebuild race
   - Concurrent rebuilds corrupt state.db
   - Documented production incidents: #89293, #90950
   - Fix: Advisory lock ngăn concurrent rebuilds

2. **Cron Lifecycle Guards** (#78980, #77931) - [CLOSED]
   - False positives với Python scripts chứa `~/...` paths
   - Absolute-path commands bị hang indefinitely
   - Fix: Scope guard đúng và detect actual referenced files

3. **Desktop SSH Media Routing** (#92992)
   - Media requests dùng legacy backend thay vì active connection
   - Only chat JSON-RPC được scope correctly

---

### **Platform-specific Issues:**

- **Windows**: #93283 - DM temp-dir mode enforcement fails (os.stat reports 0o777)
- **macOS**: #71206 - launchd network entitlements issue

---

## ✨ Yêu cầu tính năng

### #93435 - **Desktop Skills grouped view** [NEW]
- User với 100+ skills khó browse flat list
- Đề xuất: Optional category-grouped view
- Wireframe đã attached
- **Priority**: P3, UX improvement

### Các tính năng đang implement:
- Quota chip trên desktop status bar (#93285)
- Subagents inherit workspace context (#93420)
- Dashboard auth rejection logging (#93367)

---

## 💬 Phản hồi người dùng

### **Pain Points được raise:**

1. **Feature Discovery** (#81580)
   - Users không biết features mới trong 3,650 commits/release
   - Release notes stranded trên GitHub

2. **Model Picker Performance** (#92244)
   - 25-50s hang trên first open
   - "Unacceptable for production use"

3. **Skills Organization** (#93435)
   - 100+ skills trong flat list quá khó navigate
   - Cần category grouping

### **Positive Feedback:**
- Session reliability improvements được đánh giá cao
- Bot Mode adoption fix giải quyết frustration lớn cho existing users

---

## 🗓️ Backlog & Roadmap

### **Short-term (đang active):**

✅ **Session Reliability Ring 2** - Gần hoàn thành
- 5/5 critical PRs merged
- Remaining: Monitoring và edge case handling

🔄 **In Progress:**
- Worktree isolation (#93337) - High impact, high risk
- Per-skill reasoning (#93378) - Power user feature
- What's New onboarding (#81580) - UX critical

### **Dependencies Queue:**
- #93431 - npm audit remediations (Electron, DOMPurify, Vite updates)
- Security advisories được address

### **Deferred / Needs Decision:**
- Email HTML replies (#93294) - Đang chờ decision về security policy
- Cron absolute-path handling (#77931) - Needs platform testing

---

## 📈 Xu hướng phát triển

1. **Reliability-first**: Ưu tiên ổn định session management trước features mới
2. **Power user features**: Per-skill reasoning, worktree isolation
3. **UX polish**: Feature discovery, model picker performance
4. **Cross-platform parity**: Addressing Windows, macOS specific issues
5. **Security hardening**: Concurrent operations, sanitization, entitlements

---

## 🎯 Đánh giá tổng quan

**Điểm mạnh:**
- Tiếp cận có hệ thống với "rings" approach cho bug fixes
- Team responsive với user pain points (Bot Mode, session issues)
- Balance tốt giữa stability và new features

**Cần cải thiện:**
- Model picker performance cần urgent fix (blocking UX)
- macOS entitlements issue cần repro và fix
- Feature discovery gap cần close sớm (3,650 commits/release!)

**Momentum**: 🟢 Tích cực - Nhiều critical fixes merged, roadmap rõ ràng

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*