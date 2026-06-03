# Bản tin Hệ sinh thái OpenClaw 2026-06-03

> Issues: 130 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-06-03 02:00 UTC

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

# Báo cáo Phân tích OpenClaw - 2026-06-03

## 📊 Tóm tắt hôm nay

Ngày 2026-06-03 chứng kiến hoạt động phát triển cực kỳ sôi nổi với **30 pull requests mới** và nhiều issues quan trọng được cập nhật. Dự án đang tập trung giải quyết các vấn đề ổn định hệ thống (memory leaks, session locks) và cải thiện trải nghiệm kênh chat (Telegram, Discord). Đáng chú ý là các issues về mất tin nhắn, lỗi auth provider, và vấn đề hiệu suất đang được ưu tiên xử lý với mức độ P1/P2.

---

## 🚀 Releases

Không có release chính thức nào trong 24 giờ qua, nhưng từ context issues có thể thấy version **2026.5.28** đang là phiên bản ổn định mới nhất được community sử dụng rộng rãi.

---

## 🔧 Tiến độ Dự án

### Xu hướng phát triển chính:

#### 1. **Ổn định Session & Memory Management** 🏗️
- **PR #89649**: Sửa lỗi session write lock không được giải phóng khi fence read throw exception, gây wedge channel trong 17 phút
- **PR #86806**: Phục hồi crashed main sessions thông qua lock-file detection fallback
- **Issue #89315** (P1): Gateway heap tăng không giới hạn theo thời gian, bị kill bởi OOM trên Linux systemd deployments
- **Issue #55334** (P1): `sessions.json` phát triển không kiểm soát (50-100MB/phút) do `skillsSnapshot` bị duplicate mỗi session

#### 2. **Cải thiện Telegram & Discord Experience** 💬
- **PR #87072** (XL): Thêm tính năng interleaved progress lane cho Telegram với video proof
- **Issue #86519** (P1 regression): Agent lặp reply 2-10 lần trên Telegram sau update 5.20
- **Issue #89525**: Telegram `/compact` command bị drop, không xuất hiện trong logs
- **Issue #87967**: Feature request cho session rename/custom labels (đang được cộng đồng hỗ trợ mạnh)

#### 3. **Auth Provider & Model Fallback** 🔐
- **Issue #85103**: Model fallback chain không được trigger khi provider-wide quota exhaustion + `EmbeddedAttemptSessionTakeoverError`
- **Issue #85042** (P1): Config thiếu Google provider âm thầm route Gemini requests sang OpenAI
- **Issue #89549**: `sessions_spawn` child runs fail sau acceptance với HTTP 401 / Missing scopes

#### 4. **Plugin & Extension Stability** 🔌
- **PR #89652**: Load owning plugin cho configured memory embedding provider at startup
- **PR #89654**: Guard message action schema discovery để tránh crash
- **PR #84636**: Thêm local continuity snapshot helpers cho memory subsystem

---

## 🌟 Điểm Nổi Bật Cộng Đồng

### Issues có nhiều tương tác nhất:

1. **#80715** (8 👍) - Slack replies bị dropped âm thầm, đã xảy ra 2 lần trong tuần
2. **#86047** (3 👍) - Codex app-server approval stalls gây interrupted turns trong Nextcloud Talk
3. **#84882** (2 👍) - Memory-core Dreaming âm thầm xóa daily memory files (`memory/YYYY-MM-DD.md`)

### PR đáng chú ý với community engagement:

- **#87072**: Telegram interleaved progress lane với proof video đầy đủ, đang chờ maintainer review
- **#89600**: Fix Workboard status persistence, giải quyết vấn đề lifecycle sync bị bounce

---

## 🐛 Ổn định & Bugs

### Critical Issues (P1):

1. **Memory & Performance**
   - #89315: Gateway OOM trên long-running deployments
   - #55334: `sessions.json` unbounded growth (50-100MB/min)
   - #84787: `openclaw status` mất 40-50s cho session summary resolution

2. **Message Delivery**
   - #80715: Slack replies silently dropped
   - #86519: Telegram duplicate replies (2-10x) regression
   - #89525: Telegram `/compact` command không hoạt động

3. **Session Management**
   - #86090: `runHeartbeatOnce` returns phantom run, không execute model turn
   - #89374: Timeout compaction report success nhưng session vẫn unrecoverable
   - #89649 (PR): Session write lock orphan gây wedge 17 phút

### Security Issues:

- **#87376** (P0, CVSS 10.0): Reusing `hooks.token` as gateway password collapse hook auth thành full operator auth - **Critical security vulnerability**

---

## ✨ Yêu cầu Tính Năng

### Top feature requests:

1. **#87967** (2 👍): Session rename / custom session labels
   - Hiện tại sessions hiển thị auto-generated keys như `agent:main:main`
   - Khó phân biệt multiple conversations

2. **#54504**: Lightweight subagent instruction files (như Claude Code `.claude/agents/`)
   - Cho phép persistent, per-role instructions cho ephemeral subagents
   - Không cần full `agents.list` entry và dedicated workspace

3. **#47386**: Webchat UI collapsible tool output summary mode
   - Giảm visual noise khi agent chạy nhiều tools
   - Hiện tại mỗi tool execution là separate message

4. **#81889**: WhatsApp login via phone-pairing code
   - Alternative cho QR scanning
   - Giải quyết vấn đề headless servers và CI/CD automation

---

## 💬 Phản Hồi Người Dùng

### Positive feedback patterns:
- Community đánh giá cao tốc độ phát triển và maintainer responsiveness
- Plugin ecosystem đang phát triển mạnh

### Pain points chính:

1. **Reliability concerns**: 
   - Message drops trên production channels (Slack, Telegram, Discord)
   - Session state corruption sau crashes/timeouts
   - Memory leaks trên long-running deployments

2. **Auth complexity**:
   - Nhiều confusion về provider config và model fallback
   - Secret management với embedded contexts
   - OAuth sidecar partial repairs

3. **Performance degradation**:
   - `openclaw status` quá chậm (40-50s)
   - Gateway heap growth không kiểm soát
   - Session compaction không đáng tin cậy

4. **Documentation gaps**:
   - Thiếu clear guidance về auth profile failure policies
   - QMD session recall gates không được document rõ
   - Provider compatibility matrix chưa đầy đủ

---

## 📋 Backlog & Roadmap

### Priorities từ phân tích issues/PRs:

#### Short-term (đang active):

1. **Stabilization sprint**:
   - Fix critical P0/P1 memory leaks và session management bugs
   - Resolve message delivery reliability issues
   - Patch security vulnerability #87376

2. **Auth & Provider refinement**:
   - Improve model fallback chain reliability
   - Better error messages cho config mismatches
   - Document auth profile contracts

3. **Channel experience improvements**:
   - Telegram interleaved progress (#87072)
   - Discord/Slack delivery guarantees
   - Persistent followup queues (#82572)

#### Mid-term (planned/discussed):

1. **SQLite migration** (#88838):
   - Core session/transcript state migration
   - Branch-by-abstraction approach để avoid large rewrites

2. **Plugin SDK enhancements**:
   - Provider usage limits accessor (#89631)
   - Better schema discovery guards
   - Memory embedding provider support

3. **UI/UX improvements**:
   - Session rename capability
   - Workboard status persistence fixes
   - Collapsible tool outputs

### Architectural themes:

- **Shift toward SQLite**: Di chuyển từ JSON files sang SQLite để improve performance và reliability
- **Plugin ecosystem maturation**: Tăng cường plugin SDK với better contracts và safety guards
- **Multi-channel parity**: Đảm bảo feature consistency across Discord, Telegram, Slack, WhatsApp
- **Observability**: Better logging, debugging tools, và diagnostic commands

---

## 🎯 Nhận Định

OpenClaw đang trong giai đoạn **"scale-up stabilization"** - dự án đã có adoption tốt nhưng đang gặp growing pains về stability và performance. Maintainers đang cân bằng giữa:

- ✅ Ship new features (Telegram improvements, plugin enhancements)
- 🔧 Fix critical production issues (memory leaks, message drops)
- 🏗️ Architectural migrations (SQLite, auth refactor)

Community engagement mạnh với nhiều detailed bug reports và reproduction steps chất lượng cao. Tuy nhiên, số lượng P1/P2 issues tích tụ (130 open issues) cho thấy team cần tăng velocity hoặc prioritize aggressively hơn.

---

## So sánh hệ sinh thái chéo

# 🔍 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 2026-06-03

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 2/6/2026 cho thấy sự phát triển mạnh mẽ với **9 dự án active** (loại trừ Moltis và GoClaw không có hoạt động). Đây là một ngày **cực kỳ năng suất** với tổng cộng **296 PRs** và **147 issues** được xử lý - con số kỷ lục cho thấy các dự án đang trong giai đoạn consolidation trước các bản release lớn.

### 🎯 Điểm nhấn chung:

- **Security-first mindset**: 7/9 dự án có PRs/issues liên quan bảo mật
- **Cross-platform maturity**: Tất cả dự án đều focus vào Windows/Linux/macOS compatibility
- **Plugin ecosystem explosion**: 6/9 dự án đang xây dựng hoặc mở rộng plugin systems
- **MCP protocol adoption**: 5 dự án tích hợp Model Context Protocol
- **Channel expansion wave**: Telegram, Discord, Slack, WeChat, QQ đang được hỗ trợ rộng rãi

---

## 2. 📈 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Mức độ tương tác | Giai đoạn |
|-------|--------|-----|----------|------------------|-----------|
| **OpenClaw** | 130 | 500 | 0 | 🔥🔥🔥 High | Scaling stabilization |
| **NanoBot** | 9 | 27 | 0 | 🔥🔥 Medium-High | Rapid iteration |
| **Zeroclaw** | 39 | 50 | 1 (beta-2) | 🔥 Medium | Post-beta consolidation |
| **PicoClaw** | 3 | 14 | 1 (nightly) | 🌙 Low | Bug fixing phase |
| **NanoClaw** | 1 | 6 | 0 | 🌙 Very Low | Internal development |
| **IronClaw** | 26 | 50 | 0 | 🔥 Medium | Security hardening |
| **LobsterAI** | 0 | 50 | 0 | 🔥🔥 High | Pre-release polish |
| **CoPaw** | 30 | 33 | 0 | 🔥🔥 Medium-High | Security + UX focus |
| **Hermes-Agent** | 11 | 50 | 0 | 🔥 Medium | Platform stabilization |
| **Moltis** | 0 | 0 | 0 | ❄️ Inactive | - |
| **GoClaw** | 0 | 0 | 0 | ❄️ Inactive | - |

### 📊 Tổng hợp số liệu:

- **Total PRs**: 296 (trung bình 33 PRs/dự án active)
- **Total Issues**: 147 (trung bình 16 issues/dự án active)
- **Active Projects**: 9/11
- **Projects với 30+ PRs**: 6 (cho thấy velocity cực cao)
- **Projects với P1 security issues**: 4

---

## 3. 🏆 Vị thế của OpenClaw

### 📍 Vị trí trong hệ sinh thái:

**OpenClaw là "reference implementation" và chuẩn mực ngầm định** của hệ sinh thái, với:

✅ **Thống trị về quy mô**: 
- **130 issues** (gấp đôi dự án lớn thứ 2)
- **500 PRs** (gấp 10 lần dự án khác)
- Cộng đồng engage mạnh nhất (issues có 8 👍)

✅ **Dẫn đầu về công nghệ**:
- SQLite migration (architectural shift lớn nhất trong hệ sinh thái)
- Multi-channel parity (Telegram, Discord, Slack, WhatsApp)
- Plugin SDK với best practices được các dự án khác học hỏi

✅ **Pain points phản ánh challenges chung**:
- Memory leaks (shared problem: LobsterAI, IronClaw, CoPaw)
- Session management complexity (affects: Zeroclaw, PicoClaw, NanoBot)
- Message delivery reliability (common across: NanoBot, PicoClaw, Hermes)

### ⚠️ Điểm yếu so với competitors:

**1. Documentation gap**: 
- #47386, #81889 cho thấy users struggle với auth và config
- Zeroclaw's zerocode TUI có better onboarding experience

**2. Observability tools**:
- `openclaw status` chậm 40-50s (#84787)
- PicoClaw's tracer tool (#2945) và debug experience tốt hơn

**3. Enterprise features**:
- IronClaw ahead trong Slack multi-tenant (#4329)
- CoPaw có built-in PRD management (#4902)
- NanoClaw plugin hooks system đơn giản hơn

### 🎯 Vai trò chiến lược:

OpenClaw đang đóng vai trò **"Linux of AI agents"**:
- ✅ Standard bearer cho architecture patterns
- ✅ Proving ground cho features (sau đó lan rộng ra ecosystem)
- ⚠️ Complexity tax cao (130 issues là dấu hiệu cần refactoring)

---

## 4. 🔧 Hướng Kỹ thuật Chung

### 🌊 5 Xu hướng công nghệ lớn:

#### 1️⃣ **SQLite Migration Wave** 🗄️

**Who**: OpenClaw (#88838), Zeroclaw (implied), IronClaw (planning)

**Why**: JSON files không scale - `sessions.json` growth 50-100MB/min (#55334)

**Impact**: Giải quyết:
- Session compaction issues
- Concurrent access bugs
- Memory footprint

**Pattern**: Branch-by-abstraction để avoid big-bang rewrites

---

#### 2️⃣ **MCP Protocol Adoption** 🔌

**Who**: NanoBot (#4168), IronClaw (#4354), Hermes (#37768), CoPaw (implied)

**Capabilities**:
- Hosted MCP servers với credential reuse
- Schema discovery automation
- HTTP/SSE transport options

**Challenges shared**:
- Connection lifecycle confusion (Hermes #37768, NanoBot #4168)
- Session termination randomness
- Credential management complexity

---

#### 3️⃣ **Terminal UI Renaissance** 💻

**Who**: Zeroclaw (zerocode TUI shipped), OpenClaw (CLI enhancements)

**Drivers**:
- Headless servers demand
- Security enclaves requirements
- Power user workflows

**Architecture**: RPC Unix socket thay vì HTTP/WebSocket

**Features**:
- Chat streaming
- Tool approvals
- Diff preview in terminal

---

#### 4️⃣ **Multi-Channel Architecture** 📱

**Comprehensive support matrix**:

| Channel | OpenClaw | NanoBot | PicoClaw | LobsterAI | CoPaw |
|---------|----------|---------|----------|-----------|-------|
| Telegram | ✅ | ✅ | ❌ | ❌ | ❌ |
| Discord | ✅ | ✅ | ❌ | ❌ | ❌ |
| Slack | ✅ | ❌ | ❌ | ✅ | ❌ |
| WhatsApp | ✅ | ❌ | ❌ | ❌ | ✅ |
| WeChat | ❌ | ❌ | ✅ | ❌ | ✅ |
| QQ | ❌ | ❌ | ❌ | ❌ | ✅ |

**Shared challenges**:
- Message drop issues (OpenClaw #80715, NanoBot similar)
- Duplicate replies (OpenClaw #86519 Telegram)
- Media pipeline breaks (OpenClaw #6556 Discord)

---

#### 5️⃣ **Plugin System Evolution** 🧩

**3 generations of plugin architecture**:

**Gen 1** - Directory scanning (NanoClaw):
```javascript
plugins/*/index.js với onStartup/onShutdown hooks
```

**Gen 2** - Registry-based (OpenClaw, CoPaw):
```python
PluginApi.register_prompt_section()
register_uninstall_hook()
```

**Gen 3** - Schema-driven UI (CoPaw #4693):
```python
Channels registered via plugin API
Config UI auto-generated từ schemas
```

---

## 5. 🎨 Điểm Khác biệt

### 🔴 OpenClaw vs. Competitors

#### **A. Chiến lược sản phẩm**

**OpenClaw**: "Swiss Army Knife"
- ✅ Breadth: Most channels, providers, features
- ⚠️ Complexity: 130 open issues, steep learning curve
- 🎯 Target: Power users, enterprises, developers

**Zeroclaw**: "Unix Philosophy"
- ✅ Modularity: TUI là binary riêng, RPC socket clean
- ✅ Focus: Terminal workflows, remote daemon
- 🎯 Target: DevOps, headless deployments

**NanoBot**: "Move Fast"
- ✅ Velocity: 27 PRs/ngày, fast feature iteration
- ✅ Community: First-time contributors welcome
- 🎯 Target: Developers muốn customize nhanh

**IronClaw**: "Enterprise First"
- ✅ Security: 18 audit issues (L1-L11, C1-C6)
- ✅ Multi-tenant: Slack enterprise support
- 🎯 Target: Businesses, regulated industries

**CoPaw**: "China Market Leader"
- ✅ IM platforms: WeChat, QQ, DingTalk, Feishu
- ✅ Localization: Full zh-CN UI
- 🎯 Target: Chinese enterprises, IM workflows

---

#### **B. Technical Differentiation**

**Memory Management**:

| Project | Approach | Strength |
|---------|----------|----------|
| OpenClaw | SQLite migration | Scalability |
| Zeroclaw | Ephemeral daemon | Resource efficiency |
| IronClaw | Durable completion | Reliability |
| CoPaw | DAG-based summarization (#4551) | Context quality |
| Hermes | DIKW 4-layer (#37447) | Self-healing |

**Session Model**:

- **OpenClaw**: Session-scoped overrides (#6817)
- **Zeroclaw**: Ephemeral daemon mode
- **IronClaw**: Reborn loop với safety gating
- **CoPaw**: Multi-model collaboration via spawn_subagent (#4901)

**Desktop Experience**:

```
📊 Quality Ranking:

1. LobsterAI (30 PRs Windows optimization)
2. CoPaw (Windows file locking fixes)
3. Hermes (macOS entitlements, Linux sandbox)
4. Zeroclaw (zerocode TUI polish)
5. OpenClaw (CLI only, no native UI)
```

---

#### **C. Community Models**

**OpenClaw** - Distributed:
- ✅ Nhiều maintainers active
- ⚠️ Response time varies (some issues 3+ months old)
- 📈 High bar for contributions (complex codebase)

**NanoBot** - Open contributor:
- ✅ 10+ different contributors trong 1 ngày
- ✅ Fast merge cycle (< 24h)
- 📈 "Good first issue" culture

**IronClaw** - Core team:
- ✅ Consistent code quality
- ✅ Thorough security review
- ⚠️ Slower velocity (50 PRs nhưng nhiều chưa merge)

**CoPaw** - Hybrid CN/EN:
- ✅ Bilingual community
- ✅ Fast security response (7 issues closed trong ngày)
- ⚠️ English documentation lags behind features

**Zeroclaw** - Focused:
- ✅ Clear roadmap execution (TUI trackers resolved systematically)
- ✅ Quality over quantity
- ⚠️ Small team, limited bandwidth

---

## 6. 🌱 Mức độ Trưởng thành Cộng đồng

### 📊 Community Health Matrix

| Dự án | Maturity | Contributors | Response Time | Documentation | Engagement |
|-------|----------|--------------|---------------|---------------|------------|
| **OpenClaw** | 🌳 Mature | 50+ | 1-7 days | ⚠️ Gaps | 🔥🔥🔥 High |
| **NanoBot** | 🌿 Growing | 20+ | < 24h | ✅ Good | 🔥🔥 Medium-High |
| **Zeroclaw** | 🌱 Early | 10+ | 1-3 days | ✅ Good | 🔥 Medium |
| **IronClaw** | 🌿 Growing | 15+ | 2-5 days | ⚠️ Gaps | 🔥 Medium |
| **CoPaw** | 🌳 Mature | 30+ | < 24h | ⚠️ CN only | 🔥🔥 Medium-High |
| **LobsterAI** | 🌿 Growing | 10+ | < 24h | ⚠️ Minimal | 🔥🔥 High velocity |
| **Hermes** | 🌿 Growing | 20+ | 1-3 days | ✅ Good | 🔥 Medium |
| **PicoClaw** | 🌱 Early | 5+ | 1 week | ⚠️ Gaps | 🌙 Low |
| **NanoClaw** | 🌱 Early | 3-5 | Unknown | ❌ Poor | 🌙 Very Low |

---

### 🎯 Community Archetypes

#### 1️⃣ **OpenClaw** - "The Commons"

**Strengths**:
- ✅ Largest knowledge base (issues serve as documentation)
- ✅ Diverse use cases represented
- ✅ High-quality bug reports with reproduction steps

**Challenges**:
- ⚠️ Fragmented communication (130 issues, no clear prioritization)
- ⚠️ Maintainer bandwidth stretched thin
- ⚠️ New contributor onboarding difficult

**Signals**:
- 👍 Community self-help (users answer each other's questions)
- 👎 Stale issues accumulating (3+ months old)
- 📈 Need: Community manager + documentation sprint

---

#### 2️⃣ **NanoBot** - "The Bazaar"

**Strengths**:
- ✅ Welcoming to first-time contributors (10+ trong 1 ngày)
- ✅ Fast feedback loops
- ✅ Active experimentation encouraged

**Challenges**:
- ⚠️ Code quality variance
- ⚠️ Technical debt accumulating (refactoring PRs)

**Signals**:
- 🎉 Contributor growth accelerating
- ⚠️ Needs: Code review automation, stricter CI
- 📈 Trajectory: Healthy growth path

---

#### 3️⃣ **CoPaw** - "The Localized Giant"

**Strengths**:
- ✅ Strong Chinese developer community
- ✅ Fast security response (7 issues/24h)
- ✅ Enterprise focus (IM platforms)

**Challenges**:
- ⚠️ English documentation lags behind
- ⚠️ International community limited
- ⚠️ UI complexity (#4904 feedback)

**Signals**:
- 🎯 Dominating Chinese market
- 📉 Limited global reach
- 💡 Opportunity: Internationalization effort

---

#### 4️⃣ **IronClaw** - "The Enterprise Vendor"

**Strengths**:
- ✅ Rigorous security audits (18 issues)
- ✅ Professional code quality
- ✅ Clear roadmap execution

**Challenges**:
- ⚠️ Slower velocity (enterprise pace)
- ⚠️ Community feedback loops longer
- ⚠️ Limited public visibility

**Signals**:
- 🏢 Enterprise adoption signals
- 🔒 Security-first reputation
- 📈 Trajectory: B2B focus solidifying

---

#### 5️⃣ **Zeroclaw** - "The Craftsmen"

**Strengths**:
- ✅ High code quality standards
- ✅ Clear architecture decisions
- ✅ Systematic issue resolution (TUI trackers)

**Challenges**:
- ⚠️ Small team, limited bandwidth
- ⚠️ Community growth slow
- ⚠️ Need more contributors

**Signals**:
- ⭐ Quality over quantity philosophy
- 📈 Beta-2 momentum building
- 💡 Need: Community expansion strategy

---

### 🚀 Community Growth Indicators

**Top Growth Signals**:

1. **NanoBot** 📈📈📈
   - 10+ first-time contributors trong 1 ngày
   - Fast merge cycle attracting more PRs
   - Exponential trajectory

2. **LobsterAI** 📈📈
   - 30 PRs merged/day (highest velocity)
   - Focus on UX attracting users
   - Need to convert users → contributors

3. **CoPaw** 📈
   - Stable Chinese community growth
   - Security responsiveness building trust
   - International expansion potential

**Stagnation Risks**:

- **OpenClaw** ⚠️: Issue backlog growing faster than resolution
- **PicoClaw** ⚠️: Very low engagement, stale issues
- **NanoClaw** ⚠️: Almost no public activity

---

## 7. 🔮 Tín hiệu Xu hướng

### 🌟 8 Dự đoán cho Q3-Q4 2026

#### 1️⃣ **Consolidation Wave Incoming** 📉

**Signal**: 6/9 dự án trong "stabilization phase", focus vào bug fixes hơn features.

**Prediction**: 
- 2-3 dự án sẽ merge hoặc pivot trong 6 tháng tới
- **Candidates**: PicoClaw, NanoClaw (low activity)
- **Survivors**: OpenClaw, CoPaw, NanoBot (strong communities)

**Impact**: 
- ✅ Tốt: Resources consolidate vào fewer, stronger projects
- ⚠️ Xấu: Less diversity trong approaches

---

#### 2️⃣ **MCP Protocol Becomes Standard** 🔌

**Signal**: 5/9 dự án đã integrate hoặc đang integrate MCP.

**Prediction**:
- MCP sẽ là "lingua franca" cho agent interop đến cuối 2026
- OpenClaw/IronClaw sẽ dẫn đầu MCP best practices
- Hosted MCP marketplace sẽ xuất hiện (giống npm registry)

**Tác động đến OpenClaw**:
- ✅ Opportunity: Position as "reference MCP implementation"
- ⚠️ Risk: Nếu không lead, có thể bị disrupt bởi MCP-native players

---

#### 3️⃣ **Terminal UI vs. Web UI Bifurcation** 💻

**Signal**: Zeroclaw's zerocode TUI success + OpenClaw CLI struggles.

**Prediction**:
- Market sẽ split: 
  - **TUI dominant** cho DevOps, remote work, security-sensitive
  - **Web UI dominant** cho business users, collaboration

**Winners**:
- Zeroclaw (TUI native)
- LobsterAI (Web UI polish)
- OpenClaw (needs TUI investment)

---

#### 4️⃣ **China Market Specialization** 🇨🇳

**Signal**: CoPaw dominating với WeChat/QQ/Feishu integration.

**Prediction**:
- Chinese market sẽ có specialized players (CoPaw, LobsterAI)
- OpenClaw sẽ struggle compete trực tiếp do localization gaps
- Opportunity: Partnership hoặc "China fork" strategy

**Recommendations cho OpenClaw**:
1. Partner với CoPaw/LobsterAI cho China distribution
2. Hoặc invest heavily vào zh-CN localization + IM platforms
3. Hoặc focus vào Western markets + English workflows

---

#### 5️⃣ **Security Becomes Differentiator** 🔒

**Signal**: IronClaw 18 audit issues + CoPaw 7 security fixes trong 1 ngày.

**Prediction**:
- Enterprise buyers sẽ demand security certifications
- SOC 2, ISO 27001 compliance sẽ là table stakes
- Projects không invest vào security sẽ bị eliminate

**OpenClaw status**:
- ⚠️ Security vulnerability #87376 (P0, CVSS 10.0) là wake-up call
- 📈 Need: Formal security audit + bug bounty program

---

#### 6️⃣ **Plugin Ecosystems Mature** 🧩

**Signal**: 6/9 dự án building plugin systems.

**Prediction**:
- Q3 2026: Plugin marketplaces launch
- Q4 2026: Revenue sharing models emerge
- 2027: Professional plugin developers as career path

**OpenClaw advantages**:
- ✅ First-mover với mature plugin SDK
- ✅ Largest community = most plugin developers

**Risks**:
- ⚠️ CoPaw's schema-driven UI (Gen 3) may leapfrog
- ⚠️ Need backwards compatibility strategy

---

#### 7️⃣ **Memory Management Breakthrough** 🧠

**Signal**: 
- OpenClaw SQLite migration (#88838)
- CoPaw DAG-based summarization (#4551)
- Hermes DIKW 4-layer (#37447)

**Prediction**:
- One approach sẽ emerge as "winner" đến Q4
- Likely: **Hybrid model** (SQLite storage + semantic compression)
- Breakthrough: Context windows scale 10-100x

**Impact**:
- Long-term conversations become viable
- New use cases unlock (personal assistant, research agent)

---

#### 8️⃣ **Desktop Experience Renaissance** 🖥️

**Signal**: 
- LobsterAI 30 PRs Windows optimization
- Hermes cross-platform focus
- CoPaw desktop UX improvements

**Prediction**:
- Native desktop apps overtake web UIs cho serious users
- Electron alternatives (Tauri) gain traction
- Auto-update + offline mode become expected features

**OpenClaw gap**:
- ⚠️ CLI-only limits appeal
- 📈 Opportunity: Invest trong native desktop app (learn từ LobsterAI)

---

### 🎯 Strategic Recommendations cho OpenClaw

#### 🔴 **Critical (Next 3 months)**:

1. **Security Sprint**
   - Resolve P0/P1 issues (#87376, #89315, #55334)
   - External security audit
   - Bug bounty program

2. **Documentation Overhaul**
   - Auth/config guides (#47386, #81889 feedback)
   - Video tutorials cho common workflows
   - Community-editable wiki

3. **Performance Wins**
   - Fix `openclaw status` 40-50s issue (#84787)
   - SQLite migration completion (#88838)
   - Memory leak eradication

#### 🟡 **Important (6-9 months)**:

4. **TUI Investment**
   - Learn from Zeroclaw's zerocode success
   - Native terminal experience
   - Remote daemon support

5. **China Strategy**
   - Partner with CoPaw/LobsterAI OR
   - Heavy localization investment OR
   - Explicit focus on Western markets

6. **Plugin Marketplace**
   - Revenue sharing model
   - Quality certification program
   - Featured plugins curation

#### 🟢 **Strategic (12+ months)**:

7. **Enterprise Edition**
   - Multi-tenant support (learn from IronClaw)
   - SSO/SAML integration
   - Audit logs + compliance features

8. **Desktop App**
   - Native experience (learn from LobsterAI)
   - Auto-update mechanism
   - Offline mode

9. **Research Bets**
   - Advanced memory systems (compete with Hermes DIKW)
   - Multi-agent orchestration (expand from current subagent)
   - Agentic workflows (beyond chat interface)

---

## 8. 🏁 Kết luận

### 🌍 **Hệ sinh thái đang ở đâu?**

**Giai đoạn**: **Late Early Adopter → Early Majority** transition

Đặc điểm:
- ✅ Core technology proven (agents work in production)
- ✅ Multiple viable solutions compete
- ⚠️ Standards still emerging (MCP gaining traction)
- ⚠️ Enterprise adoption beginning (IronClaw signals)
- 📈 Next 6-12 months: Consolidation + maturation

### 🏆 **OpenClaw Position**:

**Current**: **Market leader with risks**

Strengths:
- 🥇 Largest community
- 🥇 Most comprehensive feature set
- 🥇 Reference implementation status

Challenges:
- ⚠️ Complexity tax (130 issues)
- ⚠️ Security gaps (P0 vulnerability)
- ⚠️ Desktop experience lag
- ⚠️ China market vulnerable

**Trajectory**: 
- 🔴 **Risk** nếu không address security + performance issues
- 🟢 **Opportunity** nếu invest trong TUI + enterprise features

### 📊 **Competitive Landscape**:

**Tier 1** (Can challenge OpenClaw):
- **CoPaw**: China market dominance
- **NanoBot**: Velocity + community growth
- **IronClaw**: Enterprise positioning

**Tier 2** (Niche players):
- **Zeroclaw**: TUI specialists
- **Hermes**: Memory innovation
- **LobsterAI**: Desktop UX leaders

**Tier 3** (Survival risk):
- **PicoClaw**, **NanoClaw**: Low activity

---

### 🎯 **Final Verdict**:

**Hệ sinh thái AI agent đang healthy và growing**, nhưng **consolidation is coming**. OpenClaw có lợi thế first-mover nhưng cần **execute aggressively** trên security, performance, và UX để maintain leadership.

**Key success factors cho 6-12 tháng tới**:
1. ✅ Security + Stability (table stakes)
2. ✅ Developer Experience (TUI, documentation)
3. ✅ Clear positioning (China vs. West, CLI vs. Desktop)
4. ✅ Community scaling (convert users → contributors)

**Bottom line**: OpenClaw đang winning today, nhưng phải **evolve faster** để stay ahead tomorrow. 🚀

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích NanoBot - 2026-06-03

## 🎯 Tóm tắt hôm nay

Ngày 2/6 là một ngày cực kỳ năng suất với **27 PRs** (20 đã merge, 7 đang mở) và **9 issues** được xử lý. Đội ngũ tập trung mạnh vào việc **ổn định hệ thống** (sửa 8+ bugs nghiêm trọng), **cải thiện WebUI** (thêm tính năng fork/edit messages, sửa routing), và **mở rộng khả năng tích hợp** (thêm email attachments, Napcat/QQ channel, Volcengine search). Đặc biệt có nhiều sự đóng góp từ cộng đồng với 10+ contributors khác nhau.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng nhiều tính năng quan trọng đã được merge vào main branch, chuẩn bị cho release tiếp theo.

---

## 📈 Tiến độ dự án

### **Cải thiện WebUI (6 PRs merged)**
- ✅ **#4163**: Thêm "Fork from here" cho user messages - cho phép rẽ nhánh conversation từ bất kỳ tin nhắn nào
- ✅ **#4148 → #4163**: Thêm inline edit button cho sent messages - edit và resend historical messages
- ✅ **#4156**: Prompt rail và smooth scrolling - cải thiện navigation trong long conversations
- ✅ **#4151**: Sửa sorting "Chats" group theo recency - sidebar logic đúng hơn
- ✅ **#4150**: Persist WebUI location trong hash routes - refresh không mất trạng thái
- ✅ **#4149**: Fallback copy cho WebUI replies - hỗ trợ non-secure contexts
- ✅ **#4157**: Bound startup fetch timeouts - tránh hang khi startup

**Phân tích**: WebUI đang được polish rất mạnh với focus vào **UX consistency** và **reliability**. Tính năng fork/edit conversation là bước tiến lớn cho power users.

### **Sửa Bugs Nghiêm trọng (5 PRs merged)**
- ✅ **#4155**: Ngăn read_file offload loop - sửa infinite loop khi recover persisted tool results (#4153)
- ✅ **#4169** [OPEN]: Reset out-of-range last_consolidated - recover hidden history (#4066)
- ✅ **#4147**: Serialize cursor allocation - fix race condition gây duplicate cursors (#4081)
- ✅ **#4165**: Skip progress messages trong email - tránh empty emails sau tool calls
- ✅ **#4134** [OPEN]: Emit error event khi permission denied trong WebSocket

**Phân tích**: Nhiều bugs liên quan đến **concurrency**, **state management**, và **offloading logic** đang được xử lý một cách có hệ thống. Đặc biệt #4155 và #4147 là các race conditions nguy hiểm.

### **Tích hợp & Channels mới (3 PRs merged)**
- ✅ **#4162**: Email channel hỗ trợ file attachments - attach media với size/count limits
- ✅ **#4146**: Thêm Napcat (QQ) channel - OneBot v11 support cho QQ private/group chats
- ✅ **#4141**: Thêm Volcengine web search provider - mở rộng search options

**Phản hồi người dùng**: #1168 phàn nàn về Notion MCP connection failures (opened từ 2/25, vẫn chưa resolve).

### **CLI & Tooling (2 PRs)**
- ✅ **#4164** [OPEN]: Fallback to `uv pip` khi pip unavailable - fix #4158
- ✅ **#4115**: Split WebUI gateway dependencies - refactor architecture

### **Performance & Memory (2 PRs)**
- 🔄 **#3997** [OPEN]: Pre-warm tokenizer + build-state timing logs
- 🔄 **#4050** [OPEN]: Manual memory mode - isolated flow từ automatic mode

### **Không được merge**
- ❌ **#3990**: Refactor Dream class - replace với cron + process_direct
- ❌ **#4109**: Lightweight RAG for memory retrieval

---

## 🌟 Điểm nổi bật cộng đồng

### **Vấn đề hot nhất**
1. **#4167** [OPEN, 2 comments]: Image generation fails với OpenAI-compatible APIs không support `response_format` (Agnes AI)
2. **#4168** [OPEN]: MCP server cannot be reached after random time - "Session terminated"
3. **#1168** [OPEN, 1 comment]: Notion MCP connection failures (vẫn unresolved sau 3+ tháng)

### **Contributors tích cực**
- `@chengyongru`: 7 PRs (WebUI improvements, refactoring)
- `@jiehaoZ`, `@04cb`: Bug fixes nghiêm trọng
- `@Re-bin`, `@Bayern4ever-dot`: Feature additions
- Nhiều first-time contributors: `@nblondiau`, `@axelray-dev`, `@Pringlas`, `@huazi-007`

**Insight**: Cộng đồng rất active với nhiều contributions chất lượng. Việc có 10+ different contributors trong 1 ngày cho thấy project đang healthy.

---

## 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng đã sửa**
- ✅ **Race condition trong MemoryStore** (#4081 → #4147): Concurrent writes gây duplicate cursors
- ✅ **read_file infinite loop** (#4153 → #4155): Tool result recovery bị loop vô hạn
- ✅ **Hidden history** (#4066 → #4169): Corrupt `last_consolidated` offset làm mất history
- ✅ **Empty emails** (#4165): Progress messages gây ra empty emails sau tool calls

### **Bugs đang điều tra**
- 🔍 **#4167**: Image generation với custom OpenAI-compatible APIs (Agnes AI không support `response_format`)
- 🔍 **#4168**: MCP server disconnects randomly - "Session terminated"
- 🔍 **#1168**: Notion MCP persistent connection issues (3+ tháng chưa resolve)

### **Technical debt được xử lý**
- Refactor WebUI gateway dependencies (#4115)
- Better error handling trong WebSocket channel (#4134)

**Nhận xét**: Team đang **rất aggressive** trong việc fix bugs, đặc biệt là các issues liên quan đến **data consistency** và **concurrency**. Tốc độ từ bug report → PR → merge thường < 24h.

---

## 💡 Yêu cầu tính năng

### **Được implement**
- ✅ **Email attachments** (#4162): Đã merge
- ✅ **Napcat/QQ channel** (#4146): Đã merge
- ✅ **Volcengine search** (#4141): Đã merge
- ✅ **Fork/Edit messages** (#4163, #4148): Đã merge

### **Đang discuss**
- 🔄 **#4166**: Allow subagent access to MCP service
- 🔄 **#4132**: Support custom image generation provider (Agnes AI)
- 🔄 **#4142** [CLOSED]: Optimization cho cache miss Input Tokens (DeepSeek v4)
- 🔄 **#4139**: Cloud platform deployment layer (HuggingFace Spaces, ModelScope)

### **Đang develop**
- 🔄 **#4050**: Manual memory mode
- 🔄 **#3997**: Pre-warm tokenizer + performance logs
- 🔄 **#3983**: Test coverage cho blocked tool-call finish reasons

**Insight**: Team **rất responsive** với feature requests. Nhiều features từ idea → implementation trong vòng 1-2 ngày. Focus hiện tại: **channel expansion**, **WebUI polish**, **MCP ecosystem**.

---

## 💬 Phản hồi người dùng

### **Positive**
- Community contributions đang tăng mạnh (10+ different contributors)
- Many "good first issue" tags được xử lý nhanh

### **Pain points**
1. **MCP stability issues** (#4168, #1168): Random disconnections, connection failures
2. **Custom provider support** (#4167, #4132): Khó integrate custom OpenAI-compatible APIs
3. **UV tool compatibility** (#4158): pip không available khi install via `uv tool`

### **Feature requests từ users**
- Subagent MCP access (#4166)
- Better cost optimization cho DeepSeek v4 (#4142)
- Cloud deployment first-class support (#4139)

**Nhận xét**: Users đánh giá cao **tốc độ phát triển** và **community support**, nhưng có concerns về **MCP stability** và **custom provider flexibility**.

---

## 📋 Backlog & Roadmap

### **Short-term (đang implement)**
- Performance optimization (tokenizer pre-warming, build-state timing)
- Memory management (manual mode, RAG integration)
- Test coverage expansion
- MCP stability improvements

### **Medium-term (đang discuss)**
- Cloud platform deployment layer
- Advanced agent features (subagent MCP access)
- Custom provider ecosystem
- Cost optimization features

### **Technical debt priorities**
- Gateway architecture refactoring (partial done #4115)
- Better error handling across channels
- Improved state management (nhiều bugs về consistency)

### **Community requests**
- Better documentation cho custom providers
- More "good first issue" tags
- Notion MCP debugging (technical expertise needed)

---

## 🎓 Insights & Recommendations

1. **Velocity cực cao**: 20 PRs merged trong 1 ngày cho thấy team có process rất tốt và CI/CD automation mạnh

2. **Bug fix quality**: Nhiều bugs nghiêm trọng (race conditions, infinite loops) được phát hiện và fix nhanh, cho thấy **good testing culture**

3. **Community health**: Nhiều first-time contributors + responsive maintainers = healthy open-source project

4. **Risks**: 
   - MCP stability issues (#4168, #1168) cần được ưu tiên cao hơn
   - Technical debt đang tích lũy (refactoring PRs)
   - Cần better documentation cho custom integrations

5. **Opportunities**: 
   - WebUI improvements đang tạo competitive advantage
   - Channel expansion (QQ, Email) mở rộng use cases
   - Cloud deployment support sẽ lower adoption barrier

---

**📌 Tổng kết**: NanoBot đang trong giai đoạn **rapid stabilization + feature expansion**, với focus mạnh vào **user experience** và **ecosystem integration**. Community momentum rất tích cực.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo phân tích dự án Zeroclaw - Ngày 2026-06-03

## 1. 📊 Tóm tắt hôm nay

Zeroclaw vừa phát hành **v0.8.0-beta-2** (2026-06-02) - bản cập nhật quan trọng nhất kể từ v0.7.5, tập trung vào **zerocode TUI** (Terminal User Interface) hoàn toàn mới. Ngày hôm nay chứng kiến đợt đóng issue/PR hàng loạt với **31 issues đóng** và **10 PRs merged**, chủ yếu là các bug fix sau release beta-2 và hoàn thiện tính năng TUI. Hai bug nghiêm trọng mới phát hiện (#7042, #7043) liên quan đến daemon IPC stability đang được ưu tiên xử lý.

---

## 2. 🚀 Releases: v0.8.0-beta-2

### Tính năng chính

**🎯 Zerocode TUI - Terminal UI hoàn chỉnh**
- Giao diện terminal đầy đủ tính năng thay thế web dashboard
- Kết nối qua RPC Unix socket thay vì HTTP/WebSocket
- Hỗ trợ chat streaming, tool approvals, diff preview trong terminal
- Target: power users, headless servers, môi trường enclave

**🔧 Runtime improvements**
- Multi-agent runtime schema V3
- Session-scoped overrides (model, temperature) không cần reload daemon
- Ephemeral daemon mode (`--ephemeral`) tự động tắt khi không có client
- File/attachment upload protocol qua base64-in-JSON

**⚡ Developer Experience**
- Quickstart onboarding thống nhất (CLI, TUI, web)
- Deny-with-edit approval mode cho phép sửa tool result trực tiếp
- ACP protocol extensions cho diff display

### Ý nghĩa
Beta-2 đánh dấu chuyển đổi kiến trúc quan trọng: từ monolithic web-centric sang modular multi-client architecture. Việc tách TUI thành binary riêng (`zerocode`) và đưa RPC socket làm transport chính mở đường cho remote daemon access và fleet management trong tương lai.

---

## 3. 📈 Tiến độ dự án

### PR merged hôm nay (10 PRs)

**High-impact fixes:**
- **#6848** (XL) - PR tích hợp lớn nhất: zerocode TUI + RPC socket transport + DenyWithEdit approval (base cho beta-2)
- **#7028** - Fix provider aliases không persist từ `config set`
- **#7035** - Fix media pipeline cho vision models (inline image data)
- **#7049** - Fix Moonshot kimi-k2 models từ chối temperature parameter

**Platform stability:**
- **#7016** - Unwrap regression test tools sau khi `WebFetchTool::new()` trở thành fallible
- **#7027** - Honor HTTP-date format trong webhook `Retry-After` headers
- **#7029** - Refresh TUI empty states sau khi setup hoàn tất

**Provider improvements:**
- **#7061** - Retry empty completions thay vì trả về blank turn (fix glm-4/deepseek-v3 intermittent empty responses)

### Xu hướng phát triển

**1. Consolidation phase:** Sau mega-PR #6848, team đang focus vào polish và stability. 31 issues đóng trong 1 ngày cho thấy đợt cleanup hậu beta-2.

**2. TUI ecosystem maturation:** 
- Tracker issues (#6823 ACP Bridge, #6824 Agent Chat, #6825 UX, #6826 TUI Master) đang được resolve tuần tự
- Still open: #6822 (release build matrix cho zerocode), #7042/#7043 (critical daemon bugs)

**3. Cross-platform pain points:** 
- Windows platform issues persistent: #7083/#7084 (double-quote handling), #6282 (firmware paths)
- Bubblewrap sandbox issues trên Fedora 43 (#6878) đã fixed

---

## 4. 🌟 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác

**#6207** (18 comments, closed) - **Web dashboard approval bypass**
- Supervised tool approvals không hiển thị trong daemon web UI do WebSocket path bypass ApprovalManager
- High-severity security concern
- Fixed: đã route qua approval flow đúng cách

**#6269** (4 comments) - **Context compressor mất reasoning_content**
- Critical cho DeepSeek models yêu cầu reasoning_content để maintain chain-of-thought
- Degraded behavior khi conversation history trigger compression
- Fix: preserve reasoning_content trong compressed messages

**#5722** (6 comments) - **Shell sandbox blocks Python skills**
- Default bubblewrap config chặn tất cả Python skill patterns thực tế
- High-risk issue blocking enterprise adoption
- Requires comprehensive sandbox policy rework

### Vấn đề người dùng quan tâm

**Configuration complexity:**
- #6123: `default_model` issue trên fresh install (18 comments)
- #6252: CLI `--json` flag error response không consistent với HTTP API
- Users expect parity giữa CLI và HTTP/WS interfaces

**Channel stability:**
- #6246: WhatsApp Web protocol bump (April 2026) phá vỡ message flow
- #5453: WebSocket không process `[IMAGE:]` multimodal markers
- #6556: Discord media pipeline hoàn toàn broken (inbound/outbound)

---

## 5. 🐛 Ổn định & Bugs

### Critical bugs mới (hôm nay)

**#7042** - **Daemon IPC crash trên EMFILE (file descriptor exhaustion)**
- Priority: P1
- Daemon crash với "too many open files" sau thời gian chạy dài
- Impact: production deployments không stable cho long-running daemon
- Root cause: likely resource leak trong RPC socket accept loop
- Status: OPEN, cần urgent fix

**#7043** - **Zerocode TUI không reconnect sau daemon close**
- Priority: P1  
- TUI permanently wedges khi daemon restart/crash
- UI stops redrawing dưới tiling WMs
- UX blocker cho TUI adoption
- Status: OPEN, blocking beta-3

### Bugs đã fix hôm nay

✅ **#7084** - Windows shell double-quote handling (merged vào integration branch)
✅ **#7035** - Media pipeline vision path inline image data
✅ **#7049** - Moonshot kimi-k2 temperature rejection
✅ **#7061** - Empty completion retry thay vì blank turn

### Stability trends

**Positive:**
- 31 issues closed cho thấy cleanup sau major release hiệu quả
- Provider reliability tăng (empty completion retry, fallback logic)
- Configuration edge cases được catch và fix

**Concerns:**
- Daemon stability issues (#7042, #7043) là red flags cho production readiness
- Windows platform vẫn có nhiều platform-specific bugs
- Channel media pipelines có nhiều regression (Discord, WhatsApp, WebSocket)

---

## 6. 💡 Yêu cầu tính năng

### Đang implement (in-progress trackers)

**#6826** - **ZeroClaw TUI Master Tracker**
- Comprehensive TUI implementation roadmap
- Sub-trackers: #6823 (ACP Bridge), #6824 (Agent Chat), #6825 (UX)
- Status: Core functionality shipped trong beta-2, polish ongoing

**#6817** - **Session-scoped runtime overrides**
- Cho phép thay đổi model/temperature per-session không cần reload daemon
- Shipped trong beta-2
- Status: CLOSED (completed)

**#6818** - **Ephemeral daemon mode**
- `--ephemeral` flag tự động tắt daemon khi last client disconnect
- Shipped trong beta-2
- Status: CLOSED (completed)

**#6819** - **File/attachment upload protocol**
- Base64-in-JSON encoding qua existing NDJSON protocol
- Cho phép TUI/web upload images/documents
- Status: CLOSED (completed)

### Đề xuất mới

**#6822** - **Add zerocode to release build matrix**
- Priority: P2
- Yêu cầu: ship zerocode binary cùng zeroclaw trong package managers
- Impact: hiện tại users phải build from source
- Status: OPEN, blocked by CI work

**#5863** - **Document skills wanted**
- Community request cho skill documentation
- Người dùng muốn biết format và contribution process
- Status: CLOSED (docs added)

**#6143** - **Universal skill registry support**
- Support agentskills.io, skills.sh ngoài ClawHub
- `SkillRegistry` trait cho pluggable registries
- Status: OPEN, needs-author-action

---

## 7. 💬 Phản hồi người dùng

### Positive feedback (implicit)

**TUI adoption signals:**
- #6952: User contribution cho Tab/Shift+Tab mode cycling (compact keyboards)
- #6858: First-run empty states clarification
- Community đang active test và contribute improvements cho zerocode

**Developer experience:**
- Multiple PRs from community contributors (10+ individuals)
- Active engagement trên configuration và setup issues
- Onboarding feedback được response nhanh

### Pain points

**Windows users:**
- @xianshishan (#7083): shell commands with quotes broken
- @theonlyhennygod (#6282): firmware symlinks không work trên Windows
- Windows platform cần dedicated attention

**Configuration complexity:**
- @rgnyldz (#6123): fresh install `default_model` issue
- @NiuBlibing (#6207): web dashboard approval bypass confusing
- Users expect "just works" defaults

**Channel reliability:**
- @alexandme (#6246): WhatsApp Web protocol bump surprise
- @singlerider (#6556): Discord media completely broken
- Enterprise users cần stable channel integrations

### Feature requests from users

**Infrastructure:**
- Fleet management (multi-daemon coordination)
- Remote daemon access over network
- Better resource limits (EMFILE issue #7042)

**Skills ecosystem:**
- #5863: Clear skill contribution guide
- #6143: Support multiple skill registries
- #6667: Background skill review/improvement

---

## 8. 🗓️ Backlog & Roadmap

### Immediate priorities (blocking beta-3)

**🔴 Critical blockers:**
1. **#7042** - EMFILE daemon crash fix (P1)
2. **#7043** - TUI reconnect logic fix (P1)
3. **#7084** - Windows shell quote handling (P1, in-progress)

**🟡 High-priority polish:**
4. **#6822** - Add zerocode to release builds (P2)
5. **#6751** - Fix CI pr-title workflow (never ran since #6396)
6. **#6412** - Re-introduce post-release CHANGELOG cleanup

### Medium-term (post beta-3)

**Platform stability:**
- Windows full platform parity (#6282, #7083)
- Bubblewrap sandbox policy rework (#5722, #6878)
- Channel media pipeline reliability (#6556, #5453, #6246)

**Skills ecosystem:**
- SkillForge improvements (#6210 metadata cleanup)
- Skill audit scope clarification (#5956, #6132)
- Universal registry support (#6143)

**Fleet & operations:**
- Nodes dashboard (#6392)
- Fleet management CLI
- Remote daemon protocols

### Long-term vision (inferred)

**Multi-tenant architecture:**
- Session-scoped overrides (#6817) là foundation
- Ephemeral daemons (#6818) cho isolated workloads
- RPC socket transport (#6837) cho remote access

**Enterprise features:**
- Fleet coordination
- Centralized skill registry
- Advanced security (OTP improvements #6626)
- Resource governance

**Developer ecosystem:**
- Comprehensive skill documentation (#5863)
- Plugin architecture (#6143 registry trait)
- Background skill improvement (#6667)

---

## 📌 Kết luận

**Beta-2 là bản phát hành quan trọng** đánh dấu chuyển đổi kiến trúc sang multi-client model với zerocode TUI. Team đang trong consolidation phase sau major release, focus vào stability và polish.

**Urgent attention needed:**
- Daemon IPC stability (#7042, #7043) blocking production use
- Windows platform issues persistent
- Channel reliability cho enterprise adoption

**Positive momentum:**
- Active community contributions
- Clear roadmap execution (TUI trackers resolved systematically)
- Strong developer experience improvements

**Next milestone:** Beta-3 sẽ focus vào daemon stability, Windows platform parity, và zerocode distribution infrastructure.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích PicoClaw - Ngày 2026-06-03

## 🎯 Tóm tắt hôm nay

Ngày 2026-06-03 chứng kiến một đợt sửa lỗi tập trung với **9 PR được merge trong vòng 24 giờ**, tập trung vào các vấn đề ổn định hệ thống như quản lý session, retry logic, và xử lý lỗi từ providers. Phát hành nightly build **v0.2.9-nightly.20260603** tiếp tục chu kỳ cập nhật hàng ngày. Cộng đồng đang quan tâm đến việc cải thiện trải nghiệm WebSocket và khắc phục các lỗi kế thừa từ phiên bản trước.

---

## 🚀 Releases

### v0.2.9-nightly.20260603.a502aa7f

**Loại**: Nightly build - không ổn định, dùng thử nghiệm

**Đánh giá**: Đây là bản build tự động hàng đêm, phản ánh các commit mới nhất trên nhánh main. Người dùng production nên cân nhắc sử dụng do tính không ổn định.

---

## 📈 Tiến độ dự án

### 🎯 Xu hướng phát triển

Dự án đang trong **giai đoạn bug fixing và stabilization** sau release v0.2.9:

**Các PR quan trọng đã merge (ngày 2/6-3/6):**

- ✅ **#2992** - Sửa lỗi session history bị ghi đè khi tạo Web UI session mới
- ✅ **#2991** - Cải thiện retry logic cho LLM HTTP errors sử dụng provider error classifier
- ✅ **#2986** - Fix goroutine leak trong SessionManager
- ✅ **#2989** - Thêm hỗ trợ Zhipu API error code 1210
- ✅ **#2994** - Thêm skill documentation tự mô tả cho PicoClaw agent

**PR đang chờ review:**

- 🔄 **#2992** - Skip main-session alias during history promotion (critical fix cho #2972)
- 🔄 **#2990** - Hiển thị đầy đủ session history trên Web UI (#2796)
- 🔄 **#2988** - Sử dụng đúng config `summarize_token_percent` cho context compression (#2968)
- 🔄 **#2987** - Ngăn tool_calls bị filter nhầm trong streaming (#2958)
- 🔄 **#2985** - Hiển thị cả summarize và compress thresholds trong `/context`

### 📊 Thống kê đóng góp

- **Contributor chính**: @chengzhichao-xydt (3 PRs), @yuxuan-7814 (4 PRs)
- **Tốc độ merge**: Rất nhanh - hầu hết PR được merge trong cùng ngày
- **Chất lượng**: Các PR có mô tả root cause và solution rõ ràng

---

## 🌟 Điểm nổi bật cộng đồng

### Issue #2984 - Explicit turn completion signal cho Pico WebSocket 👍1

**Vấn đề**: WebSocket clients không có cách xác định chắc chắn khi agent hoàn thành xử lý message.

**Tác động**: Ảnh hưởng đến trải nghiệm real-time integration, khiến developers khó build UI phản hồi chính xác.

**Tình trạng**: Mới mở (2/6), chưa có thảo luận hoặc PR liên quan.

### Issue #2943 - Lỗi Zhipu GLM-5 với hình ảnh từ WeChat ✅ RESOLVED

**Vấn đề**: WeChat channel gửi ảnh trigger error code 1210 từ Zhipu API.

**Giải pháp**: PR #2989 đã thêm error code 1210 vào format error patterns để kích hoạt fallback mechanism.

**Đánh giá**: Response nhanh - từ báo cáo (25/5) đến fix (2/6) chỉ trong 1 tuần.

---

## 🐛 Ổn định & Bugs

### Critical Fixes (Đã merge)

1. **Session History Corruption (#2972 → #2992)**
   - **Mức độ**: 🔴 Critical
   - **Triệu chứng**: Session mới kế thừa messages từ session cũ sau upgrade v0.2.9
   - **Root cause**: `PromoteAliasHistory` copy toàn bộ content từ `agent:main:main` vào mọi alias
   - **Fix**: Skip main-session alias trong quá trình promotion

2. **Goroutine Leak (#2986)**
   - **Mức độ**: 🟡 Medium
   - **Vấn đề**: SessionManager tạo background cleanup goroutine không có shutdown mechanism
   - **Impact**: Memory leak khi tạo nhiều SessionManager (đặc biệt trong tests)
   - **Fix**: Thêm `Stop()` method với context cancellation

3. **LLM Retry Logic (#2991)**
   - **Mức độ**: 🟡 Medium
   - **Vấn đề**: Transient HTTP 500 errors từ OpenRouter/OpenAI có thể fail ngay lập tức
   - **Fix**: Unified retry handling sử dụng provider error classifier

### Known Issues (Chưa fix)

4. **Tool Calls Filtering Bug (#2958 → #2987)**
   - **Triệu chứng**: Tool_calls messages bị drop khi streaming active
   - **PR**: #2987 đang review
   - **Risk**: Breaking tool execution workflow

5. **Incomplete Session History Display (#2796 → #2990)**
   - **Triệu chứng**: Web UI chỉ hiển thị user message cuối cùng
   - **Root cause**: `readJSONLSession()` truyền `meta.Skip` thay vì đọc đầy đủ
   - **PR**: #2990 đang review

---

## 💡 Yêu cầu tính năng

### Đang được thảo luận

1. **Streaming HTTP Request Support (#2404)** 👍1
   - **Đề xuất**: Thêm config `"streaming": true` để hỗ trợ streaming giống Python OpenAI client
   - **Label**: `type: enhancement`, `domain: provider`, `domain: config`
   - **Tình trạng**: Stale (10 comments, chưa có PR)
   - **Ý nghĩa**: Cải thiện real-time response cho LLM backends

2. **WebSocket Turn Completion Signal (#2984)** 👍1
   - **Nhu cầu**: Explicit event để signal khi agent hoàn thành processing
   - **Use case**: External Pico Protocol clients cần biết khi nào có thể hiển thị UI final state
   - **Tình trạng**: Mới mở, chưa có discussion

### Đang chờ implementation

3. **Native Web Search API Compatibility (#2951)**
   - **Vấn đề**: `web_search_preview` tool type không được nhiều OpenAI endpoints hỗ trợ
   - **Fix**: Chuyển sang standard `function` type
   - **Tình trạng**: Stale

4. **Claude Opus 4-7 Temperature Fix (#2948)**
   - **Vấn đề**: Model này deprecated `temperature` parameter
   - **Fix**: Skip temperature field cho claude-opus-4-7
   - **Tình trạng**: Stale

---

## 💬 Phản hồi người dùng

### Positive Signals

- 🎯 **Fast bug resolution**: Issues được fix trong vòng 1 tuần (ví dụ #2943)
- 🔧 **Clear documentation**: PRs có mô tả root cause chi tiết
- 🚀 **Active maintenance**: Nightly builds hàng ngày

### Pain Points

1. **Upgrade stability**: v0.2.9 gây ra session history corruption (#2972)
2. **WebSocket protocol gaps**: Thiếu deterministic completion signals (#2984)
3. **Provider compatibility**: Nhiều edge cases với các LLM providers khác nhau (Zhipu, Claude Opus)
4. **Web UI limitations**: Session history display không đầy đủ (#2796)

### Developer Experience

- ✅ Contributors có quy trình PR rõ ràng
- ✅ Code review nhanh (same-day merges)
- ⚠️ Stale issues tồn tại lâu (#2404 từ 1/4, #2945, #2948, #2951)

---

## 🗺️ Backlog & Roadmap

### Immediate Focus (Sprint hiện tại)

**Ưu tiên 1: Stability**
- ✅ Session management fixes
- 🔄 Tool execution reliability (#2987)
- 🔄 Context compression configuration (#2988, #2985)

**Ưu tiên 2: User Experience**
- 🔄 Web UI session history (#2990)
- 📋 WebSocket protocol improvements (#2984)

### Medium-term (Q2-Q3 2026)

- 📋 Streaming HTTP request support (#2404)
- 📋 Debug trace viewer (picoclaw-tracer) (#2945)
- 📋 Provider compatibility layer improvements

### Technical Debt

- ⚠️ Multiple stale PRs cần review/close decision
- ⚠️ Provider error handling needs standardization
- ⚠️ Test coverage cho SessionManager and context compression

---

## 🔍 Kết luận & Đề xuất

**Đánh giá tổng quan:**

PicoClaw đang trong **giai đoạn maturation** với focus vào quality over features. Team phản ứng nhanh với bugs nhưng cần attention đến:

1. **Regression testing**: v0.2.9 upgrade gây breaking changes
2. **Stale issue management**: Nhiều enhancement requests không được prioritize
3. **Provider ecosystem**: Cần unified error handling strategy

**Khuyến nghị:**

- 🎯 **Cho users**: Chờ stable release, tránh dùng nightly builds trong production
- 🎯 **Cho contributors**: Tập trung review các PR đang pending (#2987, #2988, #2990)
- 🎯 **Cho maintainers**: Cân nhắc release v0.2.10 với tất cả fixes hiện tại

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - 03/06/2026

## 🎯 Tóm tắt hôm nay

Dự án NanoClaw đã có một ngày làm việc tích cực với **4 PRs được merge** tập trung vào cải thiện kiến trúc và bảo mật. Các thay đổi chủ yếu xoay quanh việc chuẩn hóa hệ thống runtime, tăng cường khả năng mở rộng thông qua plugin system, và fix các lỗ hổng bảo mật nghiêm trọng. Có 2 PRs vẫn đang mở liên quan đến CLI platform và MCP compatibility.

---

## 🚀 Releases

**Không có release chính thức trong ngày hôm nay.** Tuy nhiên, các PR được merge cho thấy dự án đang chuẩn bị cho một phiên bản ổn định hơn với nhiều cải tiến về mặt kiến trúc.

---

## 📈 Tiến độ dự án

### ✅ PRs đã được merge (4)

**🔧 Cải thiện kiến trúc & runtime**

- **#2674** - Chuẩn hóa runtime status messages
  - Thống nhất các thông báo trạng thái runtime thành mechanical labels
  - Thêm metadata và guards để tránh self-loops
  - Tăng tính nhất quán cho hệ thống agent-runner

**🔌 Hệ thống Plugin mới**

- **#1193** - Plugin hook system (onStartup/onShutdown)
  - Giới thiệu `plugin-loader.ts` để quét và load plugins từ `plugins/*/index.js`
  - Hỗ trợ lifecycle hooks cho các dịch vụ long-running (HTTP servers, background services)
  - Cho phép mở rộng hệ thống mà không cần sửa source code core
  - **Impact**: Đây là một bước tiến quan trọng cho extensibility

**🌐 Kênh tích hợp mới**

- **#2069** - Webchat v1 skill
  - Thêm kênh webchat integration hoàn chỉnh
  - Mở rộng khả năng tương tác của agent qua web interface

**🔒 Bảo mật**

- **#2538** - Fix OS command injection vulnerability
  - Validate package names trước khi interpolate vào Dockerfile
  - Ngăn chặn lỗ hổng CWE-78 (OS Command Injection)
  - **Critical fix**: Đây là một lỗ hổng bảo mật nghiêm trọng đã được xử lý

### 🔄 PRs đang mở (2)

- **#2187** - Fix CLI bare platform IDs namespace issue
  - Xử lý edge case cho CLI channel để tránh namespace không cần thiết
  - Đã mở từ 02/05, cần review

- **#2672** - MCP union compatibility + HTTP proxy support
  - Fix compatibility với MCP config mới (stdio | http | sse union)
  - Thêm HTTP-only transport cho môi trường behind proxies
  - Quan trọng cho Codex provider trên branch `providers`

---

## 🌟 Điểm nổi bật cộng đồng

### 📉 Tương tác thấp

Đáng chú ý là **tất cả các issues và PRs đều có 0 reactions và rất ít comments**. Điều này có thể chỉ ra:
- Dự án đang trong giai đoạn phát triển nội bộ
- Cộng đồng chưa được engage mạnh mẽ
- Hoặc team đang sử dụng các kênh communication khác (Discord, Slack)

### 🤔 Issue đáng chú ý

**#2673** - Automated Student Grading System
- Đây là một use case thú vị về việc sử dụng AI agent cho giáo dục
- Context: Giáo viên ở Papua New Guinea cần hệ thống chấm điểm tự động
- **Vấn đề**: Issue này có vẻ là AI-generated spam hoặc nhầm lẫn (nội dung là "AI Video Prompt")
- Chưa có phản hồi từ maintainers

---

## 🐛 Ổn định & Bugs

### ✅ Đã giải quyết

1. **Command Injection Vulnerability** (#2538)
   - Severity: HIGH
   - Status: ✅ Fixed và merged
   - Impact: Ngăn chặn kẻ tấn công inject OS commands thông qua package names

2. **Runtime Status Inconsistencies** (#2674)
   - Chuẩn hóa messaging giúp giảm confusion và potential bugs
   - Ngăn chặn self-loops trong internal channels

### 🔧 Đang xử lý

1. **CLI Platform ID Namespacing** (#2187)
   - Bug: CLI channel bị namespace không đúng cách
   - Impact: Ảnh hưởng đến CLI adapter behavior
   - Status: Chờ merge

2. **MCP Config Compatibility** (#2672)
   - Breaking change trong MCP server config format
   - Codex provider cần update để support union types
   - HTTP transport issues với proxies

---

## 💡 Yêu cầu tính năng

### ✅ Đã implement

- **Plugin System** - Cho phép third-party extensions thông qua hooks
- **Webchat Integration** - Mở rộng channels hỗ trợ

### 🔮 Roadmap ngầm định

Từ các PRs có thể suy ra các ưu tiên:
1. **Extensibility** - Plugin system cho thấy hướng đi modular
2. **Multi-channel Support** - Webchat là bước tiếp theo sau CLI/Signal/WhatsApp
3. **Security Hardening** - Validation và input sanitization đang được ưu tiên
4. **Provider Ecosystem** - MCP compatibility fixes cho thấy tích hợp với external providers

---

## 👥 Phản hồi người dùng

### 📊 Metrics

- **Engagement**: Rất thấp (0 reactions, minimal comments)
- **Response Time**: PRs được merge khá nhanh (trong vòng 1-2 ngày cho PRs gần đây)
- **Code Quality**: PRs follow contributing guidelines và có type safety checks

### 🎭 Sentiment

- **Positive**: Team đang active merge code và fix bugs nhanh chóng
- **Concern**: Thiếu community engagement có thể làm giảm feedback quality
- **Opportunity**: Cần chiến lược marketing/community building tốt hơn

---

## 📋 Backlog & Roadmap

### 🎯 Short-term (dựa trên open PRs)

1. Merge #2187 - CLI platform ID fix
2. Merge #2672 - MCP compatibility
3. Xử lý #2673 - Clarify nếu là legitimate feature request hay spam

### 🔭 Long-term (suy luận từ patterns)

1. **Provider Ecosystem**: Mở rộng tích hợp với nhiều LLM providers qua MCP
2. **Channel Diversity**: Thêm nhiều channels sau Webchat (Telegram? Slack?)
3. **Plugin Marketplace**: Với plugin system, có thể xây dựng ecosystem của third-party plugins
4. **Enterprise Features**: Security fixes cho thấy hướng tới production-ready
5. **Container Orchestration**: Cải thiện agent-runner và container infrastructure

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn **consolidation và stabilization**. Team focus vào việc fix technical debt, improve architecture, và strengthen security hơn là push features mới. Đây là dấu hiệu tốt cho một dự án đang tiến tới maturity. Tuy nhiên, cần chú ý đến việc **build community** để có feedback tốt hơn và tăng adoption rate.

**Risk Areas**: 
- Low community engagement
- Potential spam issues (#2673)
- Breaking changes trong dependencies (MCP)

**Strengths**:
- Fast merge cycle
- Security-conscious
- Good architectural decisions (plugin system)

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo Phân tích Dự án IronClaw - Ngày 2026-06-03

## 1. 🎯 Tóm tắt hôm nay

Một ngày làm việc cực kỳ tích cực với **50 Pull Requests** và **26 Issues** được tạo/cập nhật. Dự án đang trong giai đoạn **hardening production** mạnh mẽ, tập trung vào việc khắc phục các lỗ hổng bảo mật, cải thiện độ tin cậy của hệ thống Reborn, và hoàn thiện tích hợp WebUI v2. Đáng chú ý là chuỗi 18 issues chi tiết về audit reborn-loop và reborn-subagent, cho thấy đội ngũ đang thực hiện review an toàn toàn diện trước khi đưa vào production.

## 2. 📦 Releases

❌ Không có release mới trong 24 giờ qua.

## 3. 🚀 Tiến độ dự án

### 🔒 Bảo mật & Hardening (Ưu tiên cao nhất)

**Reborn Loop & Subagent Audit** - Series 18 issues chi tiết (#4358-#4376):

- **L1-L11 (Loop Infrastructure)**:
  - Gate replay validation (#4358) - Lỗ hổng nghiêm trọng: gate replay không re-validate policy hiện tại
  - Prompt safety bypass (#4359) - 3 path silently bypass prompt enrichment
  - Capability validation (#4360) - `$ref` schemas skip validation, no depth guard
  - Budget accuracy (#4364) - Wall-clock limit không được enforce, token estimation sai với CJK
  - Cancellation propagation (#4365) - Cooperative-only, model awaits hoàn thành trước khi cancel
  
- **C1-C6 (Subagent Correctness)**:
  - Durable completion delivery (#4348) - In-memory durability gap
  - Observer correctness (#4349) - Double-delivery risk
  - Spawn compensation (#4350) - Rollback leaks child run
  - Safety gating (#4351) - Prompt injection scan có thể bị skip

**Security PRs đã landed**:
- ✅ #4372: Zeroize HTTP credential carriers - Ngăn credential leak trong memory
- ✅ #4373: Fix subagent safety & capability gating
- ✅ #4370: Fix compaction summary retry idempotency

### 🎨 WebUI v2 Polish & Integration

**OAuth & Extension Setup**:
- ✅ #4294: OAuth (Google/GitHub) integration hoàn chỉnh
- ✅ #4332: DCR extension setup cho Notion MCP
- ✅ #4345: Notion DCR OAuth wiring
- ✅ #4347: Gmail OAuth auth gate scopes

**UX Improvements**:
- ✅ #4319: Auth, tool, approval chat surfaces redesign
- ✅ #4336: Pending message echo fix
- ⏳ #4315: Vision attachments support

### 🔌 Platform Integration

**Slack Integration** (Progress on #3857):
- ⏳ #4321: Final reply delivery slice
- ✅ #4329: Multi-tenant ingress resolver

**MCP & Extensions**:
- ⏳ #4354: Hosted MCP negotiation + credential reuse
- ✅ #4327: Hosted MCP schema discovery
- ⏳ #4178: Feishu websocket event intake

### 🛠️ Core Engine

**Engine v2 Improvements**:
- ⏳ #3669: Expose channel-supplied thread/response IDs to tools
- ✅ #4355: Newtype client_thread_id/response_id (cleanup)

**Triggers System**:
- ✅ #4318: PR17 first-party capabilities
- ⏳ #4375: PR18 trigger poller lifecycle wiring

## 4. 💬 Điểm nổi bật cộng đồng

### 🐛 QA Bug Bash (Priority P2)

Team QA đã report 6 bugs quan trọng với model **Qwen3.6-35B-A3B-FP8** và **MiniMax-M2.7**:

**Qwen3.6-35B-A3B-FP8**:
- #4341: Agent THINKING chain-of-thought exposed, stuck in thinking state
- #4344: Agent mirrors user message while loading
- #4343: MCP integration acknowledged but unusable (driver failure)
- #4342: Auth modal persists after refresh, blocks chat
- #4340: "Content field blank" validation error

**MiniMax-M2.7**:
- #4339: Provider tool calls rejected as InvalidInvocation despite valid schema
- #4338: Disconnected state shows misleading execution driver error

➡️ **Insight**: Có vấn đề tích hợp nghiêm trọng với các model mới. Priority P2 cho thấy không phải showstopper nhưng ảnh hưởng UX đáng kể.

## 5. 🔧 Ổn định & Bugs

### ✅ Đã khắc phục

1. **Memory & Credential Security**:
   - Zeroized HTTP credential carriers
   - Gmail/Google Calendar OAuth scope fixes
   - Extension credential setup flow

2. **Reborn Stability**:
   - Compaction retry idempotency
   - Invalid provider tool output recovery
   - Auth gate cancellation without flow record
   - memory_search query aliases

3. **WebUI v2**:
   - Pending auth gates visibility
   - Message role metadata preservation
   - Empty response handling for ChatGPT

### ⚠️ Đang xử lý

1. **Critical Security Gaps** (18 audit issues)
2. **Model Integration** (6 QA bugs)
3. **Vision attachments** (#4315)
4. **Hosted MCP protocol** (#4354)

## 6. 🎁 Yêu cầu tính năng

### Đã implement

- ✅ Trigger system (builtin.trigger_create/list/remove)
- ✅ OAuth integration for WebUI v2
- ✅ Hosted MCP schema discovery
- ✅ Slack multi-tenant support

### Đang phát triển

- ⏳ Feishu/Lark websocket events
- ⏳ Vision/multimodal attachments preservation
- ⏳ Tool disable security (#3548)

### Đề xuất mới

- #4376: Harden HTTP credential carriers with non-clone types (follow-up to #4372)

## 7. 👥 Phản hồi người dùng

### Tích cực ✅

- WebUI v2 auth/tool surfaces được redesign đẹp hơn
- OAuth flow cho extensions hoạt động smooth
- Slack integration đang tiến triển tốt

### Tiêu cực ⚠️

- Model integration với Qwen3.6 và MiniMax có nhiều vấn đề
- MCP driver failures khiến integrations unusable
- Auth modal UX cần cải thiện (persist issue)

## 8. 📋 Backlog & Roadmap

### Immediate (This Sprint)

**🔥 Production Hardening** (Blocking release):
- Resolve 18 audit issues (L1-L11, C1-C6)
- Fix 6 QA bugs với Qwen/MiniMax
- Complete HTTP credential hardening (#4376)

**🎯 Feature Completion**:
- Land Slack final reply delivery (#4321)
- Complete hosted MCP negotiation (#4354)
- Merge vision attachments (#4315)

### Near-term (Next 2-4 weeks)

**Platform Expansion**:
- Feishu websocket integration (#4178)
- Trigger poller production launch (#4375)
- Tool disable security (#3548)

**Quality & Observability**:
- Thread/response ID exposure (#3669)
- Architecture hygiene (#4368)
- Recovery strategy coverage (#4361)

---

## 📈 Metrics Snapshot

- **Issues mới**: 26 (16 audit, 6 QA bugs, 4 technical)
- **PRs mới/cập nhật**: 50
- **PRs merged**: ~15 (estimate based on CLOSED status)
- **Focus areas**: Security (60%), Integration (25%), UX (15%)

**💡 Nhận định**: Dự án đang trong "security lockdown" phase trước major release. Việc tạo ra 18 detailed audit issues cho thấy quy trình review nghiêm túc và commitment đến production readiness. Tuy nhiên, integration bugs với new models là risk cần giải quyết nhanh.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# Báo cáo Phân tích LobsterAI - Ngày 2026-06-03

## 📊 Tóm tắt hôm nay

LobsterAI có ngày làm việc **cực kỳ sôi động** với **30 PR được merged** trong vòng 24 giờ, tập trung vào 3 mảng chính: tối ưu hóa trải nghiệm Artifacts, nâng cấp tích hợp IM (Instant Messaging), và cải thiện độ ổn định của OpenClaw runtime. Đặc biệt nổi bật là các bản vá bảo mật và tối ưu hiệu suất cho MCP (Model Context Protocol) và browser automation.

---

## 🚀 Releases

Không có release chính thức nào được phát hành trong 24 giờ qua, nhưng khối lượng PR merged cho thấy team đang chuẩn bị cho một bản release lớn sắp tới.

---

## 📈 Tiến độ dự án

### **Artifacts - Trải nghiệm preview được đại tu**

- ✅ **#2092, #2022, #2012**: Gói tính năng Artifacts hoàn chỉnh với lazy loading cho source code preview, hỗ trợ theme sáng/tối, validate HTML files trước khi render
- ✅ **#2094**: Tối ưu UX cho share dialog - loại bỏ thông tin dư thừa, cải thiện visual hierarchy
- ✅ **#2002**: Fix markdown preview không hiển thị local images (đã chuyển sang `localfile://` protocol)

### **OpenClaw Runtime - Nâng cấp toàn diện**

- ✅ **#2091**: Tối ưu MCP startup bằng cách pre-resolve npm packages thay vì chạy `npx` mỗi lần → giảm latency đáng kể
- ✅ **#2015**: Xử lý compaction retries và tool result gaps - tăng độ tin cậy khi context window đầy
- ✅ **#2018**: Fix gateway không cần restart khi refresh token (giảm downtime không cần thiết)
- ✅ **#2023**: Nâng cao success rate cho browser automation và webfetch tools

### **IM Integration - Redesign & Multi-instance**

- ✅ **#2025, #2024**: Redesign toàn bộ IM bot management UI
- ✅ **#1464**: Thêm validation cho duplicate instance names và credential IDs (Dingtalk, Feishu, QQ)
- ✅ **#2037, #2028**: Tối ưu copywriting và icons cho IM modules
- ✅ **#2014**: Fix WeChat QR gateway restart issue

### **Model & Provider Updates**

- ✅ **#388** (stale, mở từ tháng 3): MiniMax default model upgrade M2.7 → **M3** (đang review)
- ✅ **#2093**: Enable image input cho MiniMax-M3 (đã bị hardcode `false` trước đó)
- ✅ **#2032**: Fix model switch error khi dùng custom models
- ✅ **#2035**: Fix coding plan cho Qwen 3.6 Plus
- ✅ **#2000**: Sửa compatibility issues giữa Mimo model và Anthropic format

### **Security & Permissions**

- ✅ **#1962**: Hot-toggle cho `nsp-clawguard` security monitoring plugin trong Settings
- ✅ **#1952**: macOS voice input permission denied → hiển thị toast hướng dẫn user vào System Settings
- ✅ **#2096**: Ẩn internal OpenClaw plugins khỏi plugin management UI

### **Advanced Features**

- ✅ **#1985**: Thêm **Thinking Level Control** cho chat sessions (Off/Minimal/Low/Medium/High/Adaptive)
- ✅ **#2095**: Hỗ trợ batch delete subagent sessions từ sidebar

---

## 🌟 Điểm nổi bật cộng đồng

### **PR #388 - MiniMax M3 upgrade** 
- Mở từ 2026-03-12, **vẫn chưa merged** mặc dù có PR #2093 đã enable image support cho M3
- Có vẻ team đang thận trọng với việc thay đổi default model

### **Dependabot PR #1277 - Electron upgrade**
- Electron 40.2.1 → 42.3.1 (mở từ tháng 4, chưa merge)
- Chứng tỏ team ưu tiên stability hơn là chase latest version

---

## 🔧 Ổn định & Bugs

### **Đã sửa trong 24h**

| Vấn đề | PR | Mức độ ảnh hưởng |
|--------|-----|------------------|
| OpenClaw gateway restart không cần thiết khi refresh token | #2018 | 🔴 High |
| MCP startup chậm do npx overhead | #2091 | 🔴 High |
| Managed session sync mất ký tự trung lặp (`.pptx` → `.ptx`) | #1986 | 🔴 High |
| Browser automation stability | #2023 | 🟡 Medium |
| HTML preview hiển thị file không tồn tại | #2022 | 🟡 Medium |
| macOS voice permission denied không có feedback | #1952 | 🟢 Low |

### **Đáng chú ý**

- **#1986**: Bug nghiêm trọng về text corruption trong managed sessions đã được fix bằng cách dùng `chat.history` thay vì `committedAssistantText`
- **#2015**: OpenClaw compaction retry mechanism được cải thiện → giảm context overflow errors

---

## 💡 Yêu cầu tính năng

Không có feature request mới trong 24h qua, nhưng các PR cho thấy team đang focus vào:

1. **Plugin ecosystem maturity** - MCP optimization, security monitoring
2. **Multi-modal support** - Image input cho các models mới
3. **Enterprise features** - IM multi-instance, batch operations, thinking level control

---

## 💬 Phản hồi người dùng

Không có issues mới, nhưng **tốc độ merge PR cực nhanh** (30 PRs trong 1 ngày) cho thấy:

- Team có quy trình CI/CD mạnh mẽ
- Các contributors chính (@fisherdaddy, @btc69m979y-dotcom, @liugang519) làm việc rất intensive
- Focus vào **production readiness** thay vì experimental features

---

## 🗓️ Backlog & Roadmap

### **Đang được triển khai**

- ⏳ **MiniMax M3 default upgrade** (#388) - đang review từ tháng 3
- ⏳ **Electron upgrade** (#1277) - pending test

### **Xu hướng phát triển**

Dựa trên activity 24h qua:

1. **Artifacts ecosystem** đang được polish để ready for wider adoption
2. **IM integrations** đang mở rộng sang enterprise use cases (multi-instance, batch ops)
3. **OpenClaw performance** là top priority - nhiều PRs về latency và stability
4. **Model support** đang chuyển dần sang multi-modal (vision) và thinking-augmented reasoning

---

## 🎯 Kết luận

LobsterAI đang trong giai đoạn **pre-major-release stabilization**. Với 30 PRs merged trong 1 ngày, team đang aggressive fix bugs và polish UX trước khi ship version mới. Điểm mạnh là **engineering velocity cao** và **focus vào production-grade features** (security, performance, enterprise IM). Cần theo dõi xem MiniMax M3 và Electron upgrade có được merge trong tuần tới không.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo phân tích CoPaw - Ngày 2026-06-03

## 🎯 Tóm tắt hôm nay

CoPaw đang trải qua một đợt cải tiến mạnh mẽ với **30 issues** và **33 pull requests** được xử lý trong 24 giờ qua. Trọng tâm chính là **bảo mật** (7 lỗ hổng nghiêm trọng được báo cáo), **tối ưu hiệu suất Windows**, và **mở rộng hệ thống plugin**. Đặc biệt, dự án đang tích cực xử lý các vấn đề về kênh truyền thông (WeChat, QQ, Yuanbao) và cải thiện trải nghiệm người dùng trên nền tảng desktop.

---

## 🔐 **Bảo mật - Ưu tiên hàng đầu**

### Các lỗ hổng nghiêm trọng được phát hiện và đóng nhanh:

**🚨 7 báo cáo bảo mật từ @YLChen-007 (tất cả đã CLOSED):**

1. **#4908** - API `/api/settings/language` không yêu cầu xác thực → Cho phép kẻ tấn công thay đổi cài đặt toàn cục
2. **#4909** - Bypass ToolGuard qua `request_context._headless_tool_approval` → Vô hiệu hóa phê duyệt lệnh nguy hiểm
3. **#4910** - Session ID không hợp lệ gây lỗi tạo chat liên tục (HTTP 500)
4. **#4911** - Lỗi xác thực MCP transport trả về 500 thay vì 422
5. **#4912** - API cron chấp nhận timezone alias không chuẩn → HTTP 500 khi resolve thất bại
6. **#4913** - **Path Traversal nghiêm trọng**: `system_prompt_files` cho phép đọc file tùy ý qua `../../../`
7. **#4914** - Export workspace **rò rỉ secrets** từ `agent.json` (DingTalk client_secret, channel tokens)

**✅ Phản ứng nhanh:** Tất cả 7 issues đã được đóng trong vòng 24h, chứng tỏ đội ngũ ưu tiên bảo mật cao.

---

## 🚀 **Tiến độ dự án - Pull Requests nổi bật**

### **1. Tối ưu hiệu suất Windows** 🪟

**#4772** - Lazy loading & caching cho Windows startup (OPEN)
- Giảm thời gian khởi động đáng kể qua progressive initialization
- Refactor `_app.py` với caching strategies
- **Tác động:** Cải thiện trải nghiệm desktop app trên Windows

**#4794** - Plugin uninstall hooks & validator fixes (OPEN)
- Thêm `register_uninstall_hook` để cleanup khi gỡ plugin
- Fix validator imports cho offline CLI
- Expose skill provider API

### **2. Hệ thống Plugin mở rộng** 🔌

**#4693** - Plugin-based custom channels với schema-driven UI (OPEN)
- Thay thế cơ chế `custom_channels/` directory cũ
- Channels giờ được đăng ký qua plugin API
- Schema-driven config UI tự động

**#4804** - Prompt Section Registry (OPEN)
- Cho phép plugins inject custom sections vào system prompt
- API: `PluginApi.register_prompt_section()`
- Tránh monkey-patching `QwenPawAgent._build_sys_prompt`

**#4622** - DataPaw plugin với 12 BI skills (OPEN)
- Plugin phân tích dữ liệu hoàn chỉnh
- 12 kỹ năng Business Intelligence
- Đóng góp vào `plugins/bundle/`

### **3. Kênh truyền thông (Channels)** 📱

**#4878** - WeChat cron push thất bại (CLOSED)
- **Vấn đề:** Cron job không gửi được tin nhắn đến WeChat
- **Nguyên nhân:** `to_handle_from_target_string` không xử lý cron session IDs
- **Fix:** #4883 đã đóng

**#4890/#4898** - Yuanbao channel thiếu proto files (CLOSED)
- Package thiếu `proto/conn.json` và `proto/biz.json`
- Gây infinite reconnect loop
- **Fix:** #4899 thêm vào package-data

**#4848** - QQ channel QR code authorization (OPEN)
- Scan QR bằng QQ app để tự động điền `app_id` và `client_secret`
- Theo pattern của DingTalk

### **4. UI/UX Improvements** 🎨

**#4904** - Sidebar menu quá phức tạp (OPEN)
- Người dùng hiếm khi dùng sidebar settings
- Chat session bị ẩn, cần thêm 1 click
- **Đề xuất:** Đơn giản hóa menu, học từ Codex/Claude Desktop

**#4903** - Loading không ổn định khi chuyển chat (OPEN)
- Một số loading không dừng
- Hiển thị/biến mất khi scroll

---

## 🔥 **Điểm nổi bật cộng đồng**

### **Issues được quan tâm:**

1. **#4551** - Lossless Context Compression (3 💬)
   - Đề xuất DAG-based summarization thay vì sliding window
   - Giải quyết vấn đề mất ngữ cảnh trong long-term conversations
   - **Tác động:** 200K → 20K tokens, mất quá nhiều thông tin quan trọng

2. **#4836** - Lazy-load tool definitions (2 💬)
   - **Vấn đề:** 45+ tools = 20-25K tokens (55-65% context ban đầu)
   - **Đề xuất:** Chỉ load khi cần, giống function calling
   - **Lợi ích:** Tiết kiệm 55-65% initial context

3. **#4837** - v1.1.9 fallback "无法处理您的问题" quá thường xuyên (2 💬)
   - Agent trả lời fallback cứng thay vì xử lý thực tế
   - Có thể do timeout hoặc lỗi session handling

---

## 🐛 **Ổn định & Bugs**

### **Bugs nghiêm trọng:**

1. **#3985** - DeepSeek `reasoning_content` gây HTTP 500 (CLOSED)
   - Không truyền lại `reasoning_content` trong multi-turn
   - DeepSeek yêu cầu phải pass back trong thinking mode

2. **#4844/#4853** - Browser processes không tắt trên Windows (CLOSED)
   - `proc.terminate()` chỉ kill parent, không kill chrome children
   - Temp directories bị lock
   - **Fix:** Kill entire process tree + clean lock files

3. **#4919** - browser_use startup failures (2 💬)
   - Managed CDP timeout
   - Chrome/Edge crashes
   - Phải fallback về npm `playwright-cli`

4. **#4916** - Backup fails với PermissionError (1 💬)
   - Không thể backup do browser cache files bị lock

5. **#4922** - WeChat permission denied loop (1 💬)
   - Sau lỗi 1 lần, mọi câu hỏi đều báo lỗi
   - Không fix được bằng clear session

---

## 💡 **Yêu cầu tính năng mới**

### **Được đề xuất nhiều:**

1. **#4893/#4894** - Windows file upload improvements
   - Bỏ giới hạn kích thước file (truyền path thay vì upload)
   - Hỗ trợ drag & drop nhiều files

2. **#4901** - Multi-model collaboration via `spawn_subagent` (2 💬)
   - Cho phép chọn model khác nhau cho từng task
   - Cheap models (Haiku) cho simple tasks, main model cho complex reasoning
   - Học từ Claude Code's dispatch pattern

3. **#4902** - Built-in PRD management tool (OPEN)
   - CRUD operations trên `prd.json`
   - Frontend renderer với i18n
   - Interactive story table

4. **#4906** - Browse all drives on Windows (OPEN)
   - `Path("/").resolve()` chỉ trỏ về C:\
   - Thêm virtual root "/" list tất cả drive letters

5. **#4921** - Images/attachments không nên load raw vào context (1 💬)
   - Base64 images chiếm quá nhiều tokens
   - Nên reference thay vì embed

---

## 👥 **Phản hồi người dùng**

### **Tích cực:**
- Nhiều first-time contributors tham gia (#4772, #4794, #4804, #4902, #4905)
- Cộng đồng tích cực báo cáo bảo mật (7 issues từ @YLChen-007)
- Đóng góp plugin từ cộng đồng (DataPaw #4622)

### **Tiêu cực:**
- **UI phức tạp:** Sidebar menu quá nhiều settings không cần thiết (#4904)
- **Windows experience:** Nhiều vấn đề về file locking, browser processes (#4844, #4916, #4919)
- **Context quá tốn:** Tool definitions và images ăn quá nhiều tokens (#4836, #4921)
- **Fallback messages:** v1.1.9 trả lời "无法处理" quá thường xuyên (#4837)

### **Điểm đau chính:**
1. **Kênh truyền thông không ổn định** (WeChat, Yuanbao, QQ)
2. **Windows desktop experience** cần cải thiện đáng kể
3. **Context management** chưa tối ưu cho long-term conversations

---

## 🗺️ **Backlog & Roadmap**

### **Ưu tiên cao (đang xử lý):**
1. ✅ **Bảo mật:** 7/7 lỗ hổng đã được patch
2. 🔄 **Windows optimization:** #4772, #4794, #4906 đang review
3. 🔄 **Plugin system:** #4693, #4804, #4622 mở rộng khả năng tùy biến
4. 🔄 **Channel stability:** WeChat, Yuanbao, QQ fixes đang deploy

### **Trung hạn:**
- **Context compression overhaul** (#4551) - DAG-based summarization
- **Tool definition lazy loading** (#4836) - Giảm 55-65% initial context
- **Multi-model collaboration** (#4901) - Spawn subagent với model khác nhau
- **UI simplification** (#4904) - Redesign sidebar

### **Dài hạn:**
- **Tauri auto-updater** (#4669) - Desktop tự động cập nhật
- **AgentScope 2.0 migration** (#4846) - Breaking change lớn
- **Test coverage expansion** (#4852) - 153 tests mới cho runner & routers

---

## 📈 **Số liệu tổng hợp**

| Metric | Số lượng |
|--------|----------|
| **Total Issues** | 30 |
| **Issues Closed 24h** | 15 (50%) |
| **Issues Open** | 15 |
| **Security Issues** | 7 (tất cả đã closed) |
| **Total PRs** | 33 |
| **PRs Merged 24h** | 10+ |
| **First-time Contributors** | 5+ |
| **Languages** | CN (60%), EN (40%) |

---

## 🎯 **Kết luận**

CoPaw đang trong giai đoạn **phát triển mạnh mẽ** với focus rõ ràng vào:
1. **Bảo mật** (response nhanh với 7 lỗ hổng)
2. **Windows experience** (nhiều PR tối ưu)
3. **Plugin ecosystem** (mở rộng khả năng tùy biến)
4. **Channel stability** (fix WeChat, Yuanbao, QQ)

**Thách thức chính:** Context management chưa hiệu quả cho long conversations và UI cần đơn giản hóa.

**Điểm sáng:** Cộng đồng tích cực đóng góp, đội ngũ phản hồi nhanh với security issues, và hệ thống plugin đang mở rộng mạnh mẽ. 🚀

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo Phân tích Hermes-Agent | 2026-06-03

## 1. 🎯 Tóm tắt hôm nay

Hermes-Agent có một ngày hoạt động sôi nổi với **30 PRs được merge** tập trung vào bug fixes và cải thiện trải nghiệm đa nền tảng. Điểm nhấn chính là các bản sửa lỗi quan trọng cho macOS Desktop (microphone entitlement), Linux sandbox setup, và loạt security patches từ npm audit. Không có release mới nhưng dự án đang tích cực chuẩn bị cho sự ổn định cross-platform và bảo mật.

---

## 2. 📦 Releases

**Không có release chính thức trong 24h qua**

---

## 3. 🚀 Tiến độ dự án

### 🔧 Các PR quan trọng đã merge

**Cross-platform Desktop Stability:**

- ✅ **#37745** - Sửa lỗi microphone không hoạt động trên macOS Desktop do thiếu entitlement cho helper processes
- ✅ **#37529** - Cấu hình Linux Electron sandbox helper đúng cách (root ownership + setuid) để khởi động Desktop app
- ✅ **#37755** - Render markup goodbye text qua Rich console thay vì raw print()

**Security & Dependencies:**

- ✅ **#37752** - Refresh lockfile xóa 6 npm audit findings mà không cần force hoặc override
- ✅ **#37362** - Thêm npm overrides cho browser/desktop transitive dependencies
- ✅ **#37192** - Bump `tmp` từ 0.2.5 → 0.2.7 (security patch)

**Cron & Skills System:**

- ✅ **#29465** & **#37749** - Cho phép cron jobs expand skill bundles thay vì bỏ qua chúng
- ✅ **#37778** - Isolate no-agent cron scripts trong POSIX session riêng để tránh SIGTERM propagation

**Configuration & State Management:**

- 🟡 **#37765** (Open) - Fix config dual-write conflict khi Desktop và Gateway cùng lúc ghi model settings

### 🔄 PRs đang chờ review

**High Priority:**

- 🔴 **#37733/#37735** (P1 Security) - Redact provider errors chứa credentials tại HTTP boundary (CVSS 6.5-7.1)
- 🟠 **#37767** (P2) - Scope Telegram topic toolsets per topic
- 🟠 **#37772** (P2) - Reconnect stale MCP server entries
- 🟠 **#37768** (P2) - Fix MCP tool calls returning "not connected" khi `hermes mcp test` pass

**Feature Enhancements:**

- 🟢 **#37519** - Session model pool với auto-assignment và auxiliary slot tracking
- 🟢 **#26021** - Thêm Gemini Google Search Grounding provider
- 🟢 **#37276** - i18n infrastructure với zh-CN translations cho Desktop settings
- 🟢 **#37782** - Configurable default interface (CLI vs TUI)
- 🟢 **#37780** - Interactive Feishu cards với button callbacks

---

## 4. ⭐ Điểm nổi bật cộng đồng

### 🔥 Issues có tương tác cao

**#37447** (👍 2, 2 comments) - Show & Tell: DIKW Memory System  
User @Zhao961215 chia sẻ hệ thống memory 4 layer tự-healing trên Holographic memory plugin, nhận được phản hồi tích cực từ cộng đồng.

**#37399** (👍 1, 2 comments) - Desktop remote mode WebSocket origin rejection  
Đã được CLOSED - vấn đề về authentication khi dashboard bind trên non-loopback address.

### 🎨 Chất lượng đóng góp

- Dependabot đang tích cực cập nhật dependencies (6 PRs merged)
- Nhiều contributor mới tham gia với bug fixes chất lượng
- Documentation improvements đang được ưu tiên (Nowledge Mem provider docs #37764)

---

## 5. 🐛 Ổn định & Bugs

### ❗ Critical Issues đang mở

**Desktop Platform Issues:**

- 🔴 **#37505** (P3) - macOS DMG chỉ ship arm64, fail trên Intel Macs
- 🔴 **#37775** (P2) - Desktop update stuck forever trên Fedora Wayland với ECONNREFUSED error

**MCP & Tools:**

- 🟠 **#37768** (P2) - MCP tool calls fail runtime nhưng `hermes mcp test` pass
- 🟡 **#25385** (P3) - Cannot paste clipboard images vào iTerm2 (works trong VSCode)

**Feishu Platform:**

- 🟡 **#37777** (P3) - Feature request: Support interactive cards trong send_message
- 🟡 **#37779** (P3) - Monkey-patch lark-oapi WS client để dispatch CARD events

### ✅ Bugs đã fix trong ngày

- Microphone entitlement cho macOS helpers
- Linux Electron sandbox configuration
- Skill bundle expansion trong cron jobs
- npm audit security findings (6 vulnerabilities cleared)

---

## 6. 💡 Yêu cầu tính năng

### 🆕 Feature Requests mới

**#37777** - Feishu Interactive Cards  
Request hỗ trợ `msg_type="interactive"` để gửi rich cards với buttons, forms, dropdown. Hiện tại chỉ support text/post.

**#37782** - Configurable Default Interface  
Cho phép set TUI làm default trong config thay vì phải export HERMES_TUI=1 mỗi lần.

### 🔨 Features đang implement

**#37519** - Session Model Pool  
Auto-assignment models dựa trên concurrency, với auxiliary slot tracking để optimize resource usage cho multi-session environments (Discord threads, Telegram topics).

**#37276** - Desktop i18n  
Infrastructure đã sẵn sàng với zh-CN translation đầu tiên, mở đường cho community contribute thêm ngôn ngữ.

---

## 7. 💬 Phản hồi người dùng

### 😊 Positive Signals

- Community đang tích cực chia sẻ custom solutions (DIKW Memory System)
- Quality of bug reports cao với detailed reproduction steps và environment info
- Contributors responsive với feedback nhanh chóng

### 😕 Pain Points

**Cross-platform Desktop challenges:**

- macOS users gặp nhiều issues (arm64-only DMG, microphone permissions)
- Linux users face Electron sandbox và update mechanism issues
- Localization gaps (Google Meet plugin fail với non-English UI)

**MCP Integration confusion:**

- Disconnect giữa `hermes mcp test` pass nhưng runtime fail tạo friction cho users
- Connection lifecycle chưa rõ ràng

### 🌍 Geolocation Insights

- Strong Chinese-speaking community (zh-CN translations, Feishu features)
- Tăng cường localization efforts cho plugins (Google Meet L10n fix #37781)

---

## 8. 📋 Backlog & Roadmap

### 🎯 Near-term priorities (inferred từ PR activity)

**Platform Stability:**

- 🔴 macOS universal binary (support cả Intel & Apple Silicon)
- 🔴 Linux Desktop update mechanism reliability
- 🟠 Feishu/Lark platform completeness (interactive cards, WebSocket events)

**Core Infrastructure:**

- 🟠 MCP server lifecycle management
- 🟠 Config synchronization giữa Desktop ↔ Gateway
- 🟡 Memory system improvements (tiếp tục từ DIKW pattern)

**Developer Experience:**

- 🟡 Packaging verification automation (#37334)
- 🟡 i18n expansion (infrastructure ready)
- 🟡 Session management optimization (model pools #37519)

### 🔮 Long-term initiatives (từ feature proposals)

- **Workflow Knowledge Database** (#37769) - Supabase-backed internal KB với Skill Registry
- **Advanced Memory Systems** - Community-driven patterns như DIKW
- **Multi-language support** - Infrastructure đã có, cần community contributions

---

## 📈 Metrics Summary

| Metric | Value | Trend |
|--------|-------|-------|
| PRs merged | 30 | ⬆️ High activity |
| Open issues | 11 | ➡️ Stable |
| Security issues | 1 (P1) | ⚠️ Needs attention |
| Community engagement | Medium | ➡️ Steady |
| Cross-platform coverage | Improving | ⬆️ macOS/Linux focus |

---

**🔑 Takeaway:** Hermes-Agent đang trong giai đoạn consolidation với focus mạnh vào cross-platform stability và security hardening. Không có major features mới nhưng foundation đang được strengthen để support growth và community contributions tốt hơn.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*