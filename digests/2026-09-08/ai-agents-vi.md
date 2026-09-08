# Bản tin Hệ sinh thái Hermes Agent 2026-09-08

> Issues: 105 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-08 02:00 UTC

- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [Qwen-Paw](https://github.com/agentscope-ai/QwenPaw)

---

## Phân tích sâu Hermes Agent

# Báo cáo phân tích dự án Hermes Agent - 2026-09-08

## 📊 Tóm tắt hôm nay

Dự án Hermes Agent tiếp tục hoạt động với cường độ cao, tập trung vào việc ổn định hóa hệ thống sau bản phát hành v0.21.1. Các vấn đề chính xoay quanh quản lý session, tích hợp platform (đặc biệt Telegram và QQ Bot), và cải thiện trải nghiệm người dùng trên Desktop. Đáng chú ý là các nỗ lực mạnh mẽ trong việc sửa lỗi liên quan đến Bot Mode, Group Chat, và khả năng tương tác đa nền tảng.

## 🚀 Releases

### v2026.9.7 (Hermes Agent v0.21.1)
**Phát hành:** 2026-09-07

Đây là bản **patch release** tổng hợp các cải tiến từ v0.21.0, với khối lượng công việc đáng kể:
- **5,139 commits** không merge
- **4,364 files** thay đổi (+601K / -768K dòng code)
- **632 PRs** được merge

Bản release này tập trung vào:
- Ổn định hóa các tính năng hiện có
- Sửa lỗi quan trọng về session management
- Cải thiện tích hợp platform messaging
- Tối ưu hiệu suất và độ tin cậy

## 📈 Tiến độ dự án

### Các PR quan trọng đang hoạt động:

**🤖 Bot Mode & Group Chat (Ưu tiên cao)**
- **#98307**: Hoàn thiện tính năng Group Chat continuity - cho phép các Bot hoạt động liên tục ngay cả khi Desktop đóng, hỗ trợ pick up conversation từ thiết bị khác
- **#98073**: Điều khiển Group Chat từ messaging apps - tích hợp `/group` commands để quản lý Bot Chat từ Telegram/Slack
- **#97681**: Session persistence cho Bot Group Chats sau khi đóng Desktop

**🔧 Session & State Management (Critical)**
- **#103565, #103721**: Sửa lỗi nghiêm trọng về persist user context - đảm bảo context được lưu chính xác theo row identity
- **#104710**: Fix session lease vouching cho dead-lane records
- **#104061**: Preserve gateway sessions sau interactive handoff
- **#102589**: Sửa WAL split-brain khi cron/lifecycle_guard opens state.db

**💬 Platform Integration**
- **#105467**: Fix Telegram addressed command arguments
- **#105487**: Preserve literal hash references trong Telegram rich messages
- **#75312**: Phát hiện `<@UID>` mentions trong Slack mrkdwn blocks
- **#102602**: Re-dial logic cho 4401 WebSocket closes trước khi coi là revocation

**🖥️ Desktop & UI**
- **#105493**: Fix TUI redo chord (Cmd+Shift+Z) cho extended-key terminals
- **#90674**: Restore Shift+letter case trong Ink TUI composer
- **#98680**: Sửa keep-alive transcript ticks stealing focus

### Xu hướng phát triển:

1. **Multi-platform messaging** đang được đầu tư mạnh với focus vào Telegram, Slack, QQ Bot
2. **Session management** đang được refactor để reliable hơn, đặc biệt với gateway và bot modes
3. **Desktop experience** được polish liên tục với các edge cases về keyboard input và UI responsiveness
4. **Security & authorization** được tăng cường với approval flows và credential management

## 🔥 Điểm nổi bật cộng đồng

### Issues được quan tâm nhất:

**#66616** (175 bình luận) - **Skills index watchdog**: Index liên tục bị stale (29.8h old vs 26h limit)
- Vấn đề tự động hóa ảnh hưởng đến Skills Hub documentation
- Cần workflow rebuild skills-index.json

**#88584** (75 bình luận) - **Nous integration blocked**: Scheduled merge conflicts trong `cron/jobs.py`
- Blocking automated Nous-to-Enterkey merge
- Dashboard updater stuck on last tested release

**#90663** (12 bình luận, 1 👍) - **TUI uppercase input bug** trên Ghostty (macOS)
- Shift+letter bị lowercase hóa trong prompt composer
- Đã được fix bởi #90674

**#97681** (27 bình luận) - **Bot Group Chats continuity**: Feature request được yêu cầu mạnh
- Cho phép Bots tiếp tục làm việc sau khi Desktop đóng
- Multi-device pickup support

### Engagement patterns:
- Cộng đồng đang tích cực test các tính năng Bot Mode mới
- Nhiều báo cáo về platform-specific issues (Windows, macOS)
- Quan tâm cao đến reliability và session management

## 🐛 Ổn định & Bugs

### Critical Bugs (P0-P1):

**Session & State**
- **#104653** (CLOSED): Duplicate user turns - gateway + agent đều persist message → model nhìn thấy mỗi user message 2 lần
- **#101147** (CLOSED): Sealed venvs (Docker/Nix) thiếu hermes_state_registry → state.db unusable
- **#52261**: Provider memory 400s misclassified as context_overflow → destructive compress loop
- **#90663** (CLOSED): TUI uppercase input destroyed trên Ghostty

**Gateway & Messaging**
- **#32528** (CLOSED): QQ Bot C2C button approvals always rejected (dm vs c2c mismatch)
- **#101060** (CLOSED): message_agent fails to deliver into desktop-owned Bot Chat sessions
- **#104308** (CLOSED): approvals.deny bypass với single path rewrite

**Platform-specific**
- **#103786**: Windows Desktop freezes - gateway-retry loop blocks Electron main thread
- **#105145**: Windows `hermes update` always reports FAILED after successful update
- **#80625** (3 👍): Desktop SSH remote backend fails với Fish shell

### Medium Priority (P2):

- **#94613**: Install & Update E2E red từ 2026-08-13 (sandbox MITM proxy drops npm TLS)
- **#99286**: Desktop shows half context window (131K vs 262K configured) cho custom provider
- **#97110**: TTS tool denial messages misleading
- **#84672**: Content scanners flag security documentation as attacks

## 💡 Yêu cầu tính năng

### Features được đề xuất tích cực:

**Configuration & Control**
- **#67347**: Guided picker cho Subagent Model + Provider trong Settings UI
- **#80222** (1 👍): Per-call model và reasoning_effort overrides trên delegate_task
- **#96532** (2 👍): Cho phép hide 'This device' gateway khỏi profile rail
- **#41220**: Telegram `/resume` surface cross-source sessions (Desktop/CLI)

**Streaming & Performance**
- **#105235**: Streaming TTS tune first sentence independently
- **#86421**: Compaction re-inject skill content hoặc block on stale markers

**Developer Experience**
- **#66163**: Configurable slash-command namespace prefix cho Slack
- **#81582**: Proactive feature router - suggest right capability at right time
- **#105359**: Bot Mode docs improvements cho headless installs

### Patterns:
- Người dùng muốn **more control** over delegation và model selection
- Yêu cầu **better discoverability** của features có sẵn
- Focus vào **cross-platform consistency** và multi-device workflows

## 👥 Phản hồi người dùng

### Trải nghiệm tích cực:
- Bot Mode và Group Chat được đánh giá cao về concept
- Desktop app đang được polish tốt với responsive fixes
- Multi-platform support (Telegram, Slack, QQ) được appreciate

### Pain points chính:

**1. Session Management Complexity**
- Users gặp confusion khi sessions không persist đúng cách
- Bot Chat delivery failures frustrating (#101060, #99956)
- Gateway session ownership conflicts (#104710)

**2. Platform-specific Issues**
- Windows users gặp nhiều edge cases (update failures, freezes)
- QQ Bot có nhiều authorization mismatches
- Telegram command parsing issues

**3. Configuration Complexity**
- Custom providers configuration không intuitive (#99286)
- OAuth re-authentication flow confusing (#98759, #99833)
- Timeout settings không rõ ràng cho self-hosted models (#104402)

**4. Documentation Gaps**
- Bot Mode requirements chưa được document đầy đủ (#105359)
- MCP OAuth flow cần better guidance
- Skills security scanning false positives gây confusion (#84672, #92478)

### Feedback patterns:
- Users đánh giá cao **responsive maintenance** (nhiều issues được close nhanh)
- Muốn **better error messages** và diagnostics
- Cần **more examples** cho advanced features

## 🗺️ Backlog & Roadmap

### Đang được ưu tiên:

**Q3 2026 Focus (dựa trên activity patterns):**

1. **Bot Mode Stabilization** (Highest priority)
   - Complete Group Chat continuity (#98307)
   - Gateway control from messaging (#98073)
   - Cross-device session handoff
   - File sharing in Group Chats

2. **Session Management Overhaul**
   - Resolve duplicate persistence issues
   - Improve gateway session lifecycle
   - Better state.db reliability
   - Enhanced compression logic

3. **Platform Integration Hardening**
   - Telegram command parsing improvements
   - Slack mention detection fixes
   - QQ Bot authorization flow
   - WhatsApp bridge security updates

4. **Desktop Experience**
   - Windows-specific stability fixes
   - TUI input handling polish
   - Remote backend (SSH) improvements
   - Update mechanism reliability

### Medium-term (inferred):

- **Proactive feature routing** (#81582) - AI-suggested capability usage
- **Advanced delegation controls** - per-call model overrides
- **Improved observability** - better diagnostics and error messages
- **Documentation expansion** - especially for advanced Bot Mode usage

### Technical debt được address:

- Session database architecture refactoring (hermes_state split)
- Provider timeout logic consolidation
- Platform adapter authorization consistency
- Container detection logic improvements

---

## 📌 Kết luận

Hermes Agent đang trong giai đoạn **consolidation sau growth nhanh**, với focus mạnh vào:
- ✅ Stability: Nhiều critical bugs được fix
- ✅ Polish: UI/UX improvements liên tục
- ✅ Platform reach: Mở rộng messaging platform support
- ⚠️ Complexity: Configuration và setup còn phức tạp cho người dùng mới

Dự án có **momentum tốt** với 632 PRs merged trong release window, nhưng cần **cân bằng giữa new features và stability** để tránh regression debt tích lũy.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 08/09/2026

## 1. 🌍 Tổng quan Hệ sinh thái

Hệ sinh thái AI agent đang trải qua giai đoạn **chuyển mình từ growth sang consolidation**. Trong ngày 08/09/2026, chúng ta chứng kiến một bức tranh phân hóa rõ rệt:

### Các dự án lớn (Tier 1):
- **Hermes Agent**, **OpenClaw**, **Zeroclaw** đang trong giai đoạn **stabilization** sau các bản release lớn
- Tập trung vào sửa lỗi nghiêm trọng (session management, context leaks, gateway stability)
- Có base code lớn, infrastructure phức tạp, technical debt tích lũy

### Các dự án tầm trung (Tier 2):
- **NanoBot**, **QwenPaw**, **NanoClaw** duy trì velocity cao với cả features mới lẫn bugfixes
- Cân bằng tốt giữa innovation và stability
- Cộng đồng contributor đang mở rộng

### Các dự án nhỏ/thử nghiệm (Tier 3):
- **PicoClaw**, **IronClaw**, **NullClaw** có hoạt động hạn chế
- Focus vào niche features hoặc đang trong giai đoạn incubation

---

## 2. 📈 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Contributors | Momentum | Giai đoạn |
|-------|--------|-----|----------|--------------|----------|-----------|
| **Hermes Agent** | 105 | 500 | 1 (v0.21.1) | 🔥🔥🔥 Cao | ⚡ Stabilization | Maturity |
| **OpenClaw** | 115 | 500 | 0 | 🔥🔥🔥 Cao | 🐛 Crisis mode | Maturity |
| **Zeroclaw** | 10 | 50 | 0 | 🔥🔥 Trung bình | 🔒 Security focus | Growth |
| **NanoBot** | 2 | 22 | 0 | 🔥 Thấp | 🛠️ Refinement | Growth |
| **QwenPaw** | 23 | 47 | 0 | 🔥🔥 Cao | 🏗️ Architecture | Growth |
| **NanoClaw** | 2 | 28 | 0 | 🔥 Thấp | 📧 Integration | Growth |
| **PicoClaw** | 1 | 5 | 0 | 🌱 Rất thấp | 🔌 Expansion | Early |
| **IronClaw** | 1 | 5 | 0 | 🌱 Rất thấp | 🎨 UX polish | Early |
| **NullClaw** | 0 | 1 | 0 | 🪫 Không hoạt động | ⏸️ Stalled | Unknown |

### 📊 Chỉ số Tương tác Cộng đồng

| Dự án | Issue Comments | PR Reactions | Response Time | Community Health |
|-------|----------------|--------------|---------------|------------------|
| Hermes Agent | 175 (max) | Cao | < 24h | 🟢 Tốt |
| OpenClaw | 26 (max) | Trung bình | < 48h | 🟡 Khả quan |
| QwenPaw | 5 (max) | Cao | < 24h | 🟢 Tốt |
| Zeroclaw | Thấp | Thấp | < 24h | 🟢 Tốt (trusted contributors) |
| NanoBot | 5 (max) | Trung bình | Chậm | 🟡 Cần cải thiện |
| Các dự án khác | 0-1 | Rất thấp | N/A | 🔴 Yếu |

---

## 3. 🎯 Vị thế của Hermes Agent

### Điểm mạnh nổi bật

**🏆 Leader về Scale & Complexity**
- **632 PRs merged** trong release window v0.21.1 - con số áp đảo so với các đối thủ
- Infrastructure phức tạp nhất: multi-platform messaging (Telegram, Slack, QQ, WhatsApp), bot mode, desktop app
- Code base lớn nhất với 4,364 files thay đổi trong release

**👥 Cộng đồng Engaged**
- Issue #66616 có **175 comments** - level tương tác cao nhất trong hệ sinh thái
- Người dùng tích cực test features mới và báo bugs với chất lượng cao
- Multi-region user base (evidence từ QQ Bot, Telegram usage)

**🚀 Velocity & Responsiveness**
- Nhiều critical bugs được fix trong cùng ngày (duplicate persistence, gateway issues)
- Release cadence đều đặn với patch releases

### Thách thức đặc thù

**⚠️ Complexity Tax**
- Session management bugs tái diễn qua nhiều releases (#103565, #104710, #97681)
- Gateway/Desktop sync issues phức tạp hơn các đối thủ đơn giản hơn
- Windows-specific bugs nhiều hơn (update failures, freezes)

**📉 Technical Debt Accumulation**
- 105 issues mở - cao thứ 2 sau OpenClaw
- Regression rate đáng kể (WAL split-brain, session lease bugs)
- Cần balance giữa new features và stability

### So sánh trực tiếp với OpenClaw

| Tiêu chí | Hermes Agent | OpenClaw |
|----------|--------------|----------|
| **Architecture** | Multi-platform, distributed | Tương tự phức tạp |
| **Stability** | Ổn định sau v0.21.1 | **Crisis mode** (update nightmares) |
| **Community** | Engaged, vocal | Engaged nhưng frustrated |
| **Focus** | Bot Mode + Multi-platform | Update mechanism + Context leaks |
| **Momentum** | Consolidation phase | **Damage control** |

**Đánh giá**: Hermes Agent đang ở vị thế **tốt hơn đáng kể** so với OpenClaw trong ngắn hạn. OpenClaw đang đối mặt với crisis nghiêm trọng về upgrade path và context security.

---

## 4. 🔧 Hướng Kỹ thuật Chung

### Trends chung trong hệ sinh thái

#### 🤖 **AI Provider Diversification**
Tất cả dự án đang mở rộng hỗ trợ providers:

| Provider | Hermes | OpenClaw | Zeroclaw | NanoBot | QwenPaw |
|----------|--------|----------|----------|---------|---------|
| OpenAI | ✅ | ✅ | ✅ | ✅ | ✅ |
| Anthropic Claude | ✅ | ✅ | ✅ (adaptive thinking) | ✅ | ✅ |
| OpenCode Go | 🔄 | 🔄 | 🔄 | ✅ | 🔄 |
| DeepSeek | ✅ | ✅ | ✅ | ✅ | ✅ (bugs) |
| Local/Custom | ✅ | ✅ | ✅ | ✅ | ✅ |

**Insight**: OpenCode Go đang nổi lên như một provider được nhiều dự án tích hợp trong cùng kỳ (Hermes #, PicoClaw #3371, QwenPaw #7602).

#### 🔒 **Security & Governance Hardening**
```
Zeroclaw:  #9977 (filesystem sandbox), #10241 (shell approval)
QwenPaw:   #7526 (protected execution), #7497 (sensitive paths)
NanoBot:   #5628 (macOS Seatbelt sandbox)
```
**Pattern**: Các dự án mature đang tăng cường security cho workspace/filesystem access - chuẩn bị cho enterprise adoption.

#### 💾 **Session/State Management Evolution**
Tất cả dự án lớn đều đang refactor session architecture:

- **Hermes Agent**: Gateway session persistence (#97681, #104710)
- **OpenClaw**: Session identity & context persistence (#103565, #140859)
- **NanoClaw**: Durable host - survive restarts (#3653)
- **QwenPaw**: Memory backend plugin migration (#7616)

**Root cause chung**: Initial designs không handle long-lived, multi-device sessions tốt.

#### 📱 **Multi-Platform Messaging Maturity**

| Platform | Adoption | Stability |
|----------|----------|-----------|
| Telegram | 🟢 Universal | 🟡 Command parsing issues |
| Slack | 🟢 High | 🟢 Stable |
| QQ/Feishu | 🟡 China-focused | 🔴 Auth/streaming issues |
| WhatsApp | 🟡 Growing | 🟡 Transcription gaps |
| IRC | 🟢 Niche (PicoClaw, Zeroclaw) | 🟢 Stable |
| Email | 🆕 Emerging (NanoClaw #3743) | 🔵 New |

**Trend**: Dự án nào có user base Trung Quốc đều ưu tiên QQ/Feishu nhưng gặp nhiều vấn đề technical.

#### 🧠 **Advanced AI Capabilities**

**Reasoning/Thinking modes** đang được nhiều dự án support:
- Zeroclaw: Claude Adaptive Thinking (#10611)
- Zeroclaw: OpenAI Responses + GPT-6 Astra reasoning (#10704-#10708)
- QwenPaw: Advisor Mode (dual-model collaboration #7569)

**Observability & Cost tracking**:
- Zeroclaw: Cost records per-session (#10700)
- NanoBot: Rate limiting per model (#129366)
- QwenPaw: Traffic light status indicator (#7600)

---

## 5. 🎨 Điểm Khác biệt

### **Chiến lược Sản phẩm**

#### Hermes Agent - "Enterprise-Ready Multi-Platform"
- **Target**: Organizations cần automation across messaging platforms
- **Differentiation**: Bot Mode + Group Chat + Desktop/Mobile sync
- **Trade-off**: Complexity cao, learning curve dốc

#### OpenClaw - "Developer-First Customization"
- **Target**: Technical users muốn fine-grained control
- **Differentiation**: Extensive configuration, plugin ecosystem
- **Trade-off**: Đang struggle với reliability (update mechanism broken)

#### QwenPaw - "AI-Native Workspace"
- **Target**: Chinese market, knowledge workers
- **Differentiation**: Memory backends (ADBPG, PowerContext), dual-model advisor
- **Trade-off**: Phụ thuộc nặng vào Chinese providers (Zhipu, Volcengine)

#### NanoClaw - "Communication Hub"
- **Target**: Teams using diverse messaging platforms
- **Differentiation**: Durable host (restart-resilient), AgentMail
- **Trade-off**: Còn early-stage, ít features advanced

#### Zeroclaw - "Security-First Enterprise"
- **Target**: Enterprise với strict security requirements
- **Differentiation**: Filesystem sandboxing, bounded delegation
- **Trade-off**: Moves slower due to security review overhead

### **Kiến trúc Kỹ thuật**

| Aspect | Hermes | OpenClaw | QwenPaw | Zeroclaw | NanoBot |
|--------|--------|----------|---------|----------|---------|
| **Database** | state.db (SQLite) | state.db | history.db (SQLite FTS) | Unspecified | Unspecified |
| **Desktop App** | Electron | Electron | Desktop UI (framework unclear) | N/A | WebUI primary |
| **Plugin System** | ✅ Native | ✅ Native | 🔄 Migrating | ✅ Native | Limited |
| **Container Support** | ✅ Docker/Nix | ✅ Docker | ✅ Docker | ✅ | ✅ |
| **Multi-tenancy** | ✅ (via gateways) | ✅ | ⚠️ Single-user focus | ✅ | ⚠️ |

### **Cộng đồng & Governance**

#### Hermes Agent
- **Model**: Open core (maintained by Nous Research)
- **Contributor profile**: Mix của core team và external contributors
- **Decision making**: Centralized với maintainer team

#### OpenClaw
- **Model**: Community-driven với professional reviewers
- **Unique**: PR rating system (🦞 diamond lobster, 🐚 platinum hermit)
- **Issue tracking**: Detailed taxonomy (P0-P3, regression tracking)

#### QwenPaw
- **Model**: Heavy Chinese community participation
- **Language**: Bilingual (60% Chinese issues/comments)
- **Contributor mix**: Many first-time contributors

#### Zeroclaw
- **Model**: Trusted contributor network
- **Contributors**: Distinguished/Principal tiers (@IftekharUddin, @Audacity88)
- **Velocity**: Slower but higher code quality (security reviews)

---

## 6. 🌱 Mức độ Trưởng thành Cộng đồng

### **Tier S: Mature & Thriving**

**Hermes Agent** 🏆
- ✅ Sustained engagement (175 comment thread)
- ✅ Quality bug reports với environment details
- ✅ Multi-region user base
- ✅ Active testing của new features
- ⚠️ Maintainer bandwidth may be stretched (105 open issues)

**QwenPaw** 🇨🇳
- ✅ Bilingual community (Chinese majority)
- ✅ First-time contributors active
- ✅ Fast response to UX friction
- ⚠️ Provider integration testing cần improve
- ⚠️ Context management bugs chưa được prioritize đủ

### **Tier A: Growing Steadily**

**Zeroclaw**
- ✅ Experienced contributor base (Distinguished/Principal)
- ✅ High code quality standards
- ✅ Security-conscious culture
- ⚠️ Fewer contributors overall (nhưng quality cao)
- ⚠️ Stale PRs cần attention (#9997, #10241)

**OpenClaw**
- ✅ Professional review process
- ✅ Engaged users report issues với detail
- 🔴 **Crisis**: User frustration cao (update nightmares)
- 🔴 Trust erosion risk nếu không fix nhanh

### **Tier B: Early Stage**

**NanoBot**
- ⚠️ Low interaction volume
- ✅ Issues quality tốt khi có
- ⚠️ Response time chậm
- 🔵 Potential: IoT/retail vertical (#5693)

**NanoClaw**
- ⚠️ Very few issues (2 total)
- ✅ Active PR merging (7 PRs merged hôm nay)
- 🔵 Focus rõ ràng (communication hub)
- ⚠️ External contributor engagement thấp

### **Tier C: Uncertain/Inactive**

**PicoClaw, IronClaw**
- 🔴 Minimal activity (1-5 PRs/issues)
- ⚠️ Stale PRs không được review
- ⚠️ Single maintainer risk

**NullClaw**
- 🪫 Effectively stalled (0 issues, 1 stale dependency PR)
- 🔴 May be abandoned

### 📊 Community Health Scorecard

| Dự án | Engagement | Quality | Diversity | Sustainability | Overall |
|-------|------------|---------|-----------|----------------|---------|
| Hermes Agent | A+ | A | A | A | **A** |
| QwenPaw | A | A- | A+ | B+ | **A-** |
| Zeroclaw | B+ | A+ | B | A- | **A-** |
| OpenClaw | B+ | A | A | B- | **B** (crisis risk) |
| NanoBot | C+ | B+ | C | C+ | **C+** |
| NanoClaw | C | A- | C | C | **C+** |
| PicoClaw | D | B | D | D | **D+** |
| IronClaw | D | B | D | D | **D+** |
| NullClaw | F | N/A | F | F | **F** |

---

## 7. 🔮 Tín hiệu Xu hướng

### **Ngắn hạn (Q4 2026)**

#### 1. **Consolidation Wave Continues**
**Evidence**:
- 70% PRs của Hermes/OpenClaw là bugfixes
- Multiple dự án refactor session architecture
- Security hardening được prioritize

**Prediction**: Các dự án Tier 1 sẽ **chậm tốc độ ship features mới** để focus stability. Dự án nào không làm tốt việc này (như OpenClaw hiện tại) sẽ mất user trust.

#### 2. **Provider War Heats Up**
**Evidence**:
- Cùng lúc 4-5 dự án tích hợp OpenCode Go
- Claude adaptive thinking được adopt nhanh
- GPT-6 Astra reasoning đang được prepare

**Prediction**: Dự án nào có **fastest time-to-support** cho new models sẽ có lợi thế. Expect một cuộc đua tích hợp **o1/o3 reasoning models** khi chúng ra public API.

#### 3. **Chinese Market Bifurcation**
**Evidence**:
- QwenPaw, PicoClaw focus heavy vào QQ/Feishu
- Hermes Agent support QQ Bot nhưng gặp nhiều bugs
- Chinese users chiếm majority trong QwenPaw community

**Prediction**: Sẽ xuất hiện **China-specific forks** hoặc dự án tối ưu cho Chinese ecosystem (Baidu, Alibaba Qwen, Volcengine). Western projects sẽ struggle với compliance (Great Firewall, data residency).

#### 4. **Desktop vs Web-First Architecture**
**Trend**: Hermes và OpenClaw đều heavy invest vào Desktop apps (Electron). Trong khi đó, NanoBot, IronClaw focus vào WebUI.

**Prediction**: **Web-first sẽ thắng** cho mass market. Desktop apps chỉ giữ được niche cho:
- Enterprise users cần offline
- Developers cần local control
- Power users có infrastructure complexity

### **Trung hạn (2027)**

#### 5. **Agent-to-Agent Coordination Becomes Core**
**Early signals**:
- NanoClaw: A2A communication failures (#3719), verified sender identity (#3718)
- QwenPaw: Advisor Mode (dual-model) (#7569)
- Zeroclaw: Bounded delegate filesystem tools (#10391)

**Prediction**: Năm 2027 sẽ thấy:
- **Agent orchestration protocols** standardized (tương tự như REST/GraphQL cho microservices)
- **Agent discovery & reputation systems** (trust scores, capability advertisements)
- **Multi-agent workflows** trở thành killer feature, không chỉ là demo

#### 6. **Memory & Context Management Paradigm Shift**
**Pain points common across all projects**:
- Session state loss qua restarts
- Context window limits với long conversations
- Memory recall không efficient

**Prediction**:
- **External memory systems** (vector DBs, knowledge graphs) sẽ trở thành first-class citizens
- **Retrieval-augmented generation** built-in, không còn là afterthought
- **Context compression** algorithms trở thành core differentiator

#### 7. **Security & Governance Standardization**
**Current state**: Mỗi project tự implement security (Zeroclaw sandbox, QwenPaw protected execution, v.v.)

**Prediction**:
- **Common security framework** emerge (tương tự OWASP cho web apps)
- **Enterprise compliance certifications** (SOC 2, ISO 27001) trở thành yêu cầu
- **Audit trails & observability** built-in từ đầu

#### 8. **Vertical Specialization**
**Signals**:
- NanoBot: IoT/retail interest (#5693)
- NanoClaw: Email/communication hub focus
- Hermes: Enterprise messaging automation

**Prediction**: Market sẽ phân hóa thành verticals:
- **Enterprise productivity** (Hermes, OpenClaw)
- **Developer tools** (Zeroclaw)
- **Localized markets** (QwenPaw cho China)
- **Edge/IoT** (NanoBot derivatives)
- **Niche protocols** (PicoClaw IRC/retro platforms)

### **Dài hạn (2028+)**

#### 9. **Open Source AI Agent OS**
**Vision**: Một trong các dự án này (likely Hermes hoặc OpenClaw) sẽ trở thành **de facto standard** - "Linux of AI agents".

**Requirements to win**:
- ✅ Plugin ecosystem maturity
- ✅ Security & governance frameworks
- ✅ Enterprise adoption traction
- ✅ Multi-platform stability
- ✅ Vibrant community

**Current leader**: **Hermes Agent** có vị thế tốt nhất (scale, momentum, community) nhưng cần address technical debt.

#### 10. **Regulatory Compliance Moats**
**Inevitability**: AI agents sẽ phải tuân thủ regulations (GDPR, AI Act của EU, v.v.)

**Prediction**: Dự án nào built-in compliance features sớm nhất (audit trails, data residency, explainability) sẽ có **regulatory moat** khó vượt qua.

---

## 🎯 Kết luận Chiến lược

### **Winners & Losers (Dự đoán)**

#### 🏆 **Clear Winners**
1. **Hermes Agent** - Nếu giải quyết được technical debt, vị thế leader rất vững
2. **QwenPaw** - Dominance tiềm năng ở Chinese market

#### 📈 **Dark Horses**
3. **Zeroclaw** - Security focus + quality code có thể capture enterprise segment
4. **NanoClaw** - Durable host + communication focus là niche rõ ràng

#### ⚠️ **At Risk**
5. **OpenClaw** - Crisis mode, cần turnaround ngay hoặc sẽ mất users
6. **NanoBot** - Lacks clear differentiation, low community activity

#### 🪦 **Likely to Fade**
7. **PicoClaw, IronClaw** - Insufficient momentum
8. **NullClaw** - Already effectively dead

### **Khuyến nghị cho Hermes Agent**

#### 🎯 **Immediate (Q4 2026)**
1. **Debt paydown sprint**: Dedicate 1-2 sprints thuần túy fix technical debt
   - Session management refactor (#103565, #104710)
   - Gateway stability (#103786, #105145)
   - Windows platform issues

2. **Provider parity**: Đảm bảo support đầy đủ cho OpenCode Go, Claude, GPT-6 Astra trước đối thủ

3. **Documentation overhaul**: Bot Mode setup docs (#105359) và advanced features guides

#### 📊 **Medium-term (2027)**
4. **Agent orchestration**: Build first-class A2A coordination (học từ NanoClaw issues #3718, #3719)

5. **Security certification**: Pursue SOC 2 / ISO 27001 để compete với Zeroclaw trong enterprise

6. **China strategy**: Hoặc invest heavy vào QQ/Feishu stability, hoặc acknowledge QwenPaw dominance và partner

#### 🚀 **Long-term (2028+)**
7. **Platform play**: Position như "AI Agent OS" với:
   - Stable plugin API
   - Marketplace ecosystem
   - Enterprise governance tier
   - Cloud-managed option

8. **Vertical expansion**: Thay vì general-purpose, consider specialized editions:
   - Hermes Enterprise (compliance + security)
   - Hermes Developer (tools + integrations)
   - Hermes SMB (simplified onboarding)

---

## 📌 Tóm lại

Hệ sinh thái AI agent đang ở **inflection point**. Phase "move fast and break things" đã qua, giờ là lúc **consolidation and professionalization**. 

**Hermes Agent có vị thế tốt nhất** để trở thành leader lâu dài, nhưng cần:
- ✅ Solve technical debt trước khi nó compound
- ✅ Maintain community trust qua transparency
- ✅ Pick strategic battles (không thể win mọi vertical)

**OpenClaw đang ở crossroads** - có thể recover hoặc mất vị thế #2.

**QwenPaw sẽ dominate Chinese market** bất kể Western players làm gì.

**Zeroclaw** là "enterprise challenger" đáng chú ý với security-first approach.

Các dự án còn lại sẽ either **pivot hard, specialize niche, hoặc fade away** trong 12-18 tháng tới.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo Phân tích Dự án OpenClaw - Ngày 08/09/2026

## 🎯 Tóm tắt hôm nay

OpenClaw đang trải qua giai đoạn ổn định hóa sau bản cập nhật 2026.9.2 với **51 PR đang hoạt động** tập trung vào sửa lỗi nghiêm trọng. Vấn đề **rò rỉ runtime context** vào tin nhắn người dùng xuất hiện trên nhiều kênh (Telegram, Feishu, Teams, Signal) đang được ưu tiên xử lý. Hệ thống cập nhật (update) gặp nhiều vấn đề khiến gateway không khởi động được sau nâng cấp.

## 📦 Releases

**Không có release mới trong 24 giờ qua**. Tuy nhiên, nhiều issue và PR liên quan đến **bản 2026.9.2** cho thấy đây là bản phát hành gần nhất đang gặp vấn đề ổn định cần khắc phục khẩn cấp.

## 🚀 Tiến độ dự án

### **Các PR quan trọng đang hoạt động (Top 10)**

#### 🔴 **Ưu tiên cao - Sửa lỗi nghiêm trọng**

1. **#141562** - Khôi phục update runs bị treo mà không cần dừng gateway
   - **Vấn đề**: Update bị treo khiến UI và config writes bị suspend vĩnh viễn
   - **Trạng thái**: ⏳ Chờ tác giả, đã CLOSED và MERGED

2. **#140859** - Phân biệt inbound messages và runtime context
   - **Vấn đề**: Tin nhắn đầu vào bị nhầm với OpenClaw runtime context
   - **Tác động**: Lỗi bảo mật và trải nghiệm người dùng
   - **Trạng thái**: CLOSED

3. **#140579** - Bảo toàn cài đặt người dùng qua các lần update
   - **Vấn đề**: Mất cấu hình hoặc bị ghi đè bởi giá trị mặc định
   - **Trạng thái**: CLOSED

#### 🟡 **Ưu tiên trung bình - Cải thiện chức năng**

4. **#140798** - Cho phép Discord administrators được tin cậy rõ ràng
   - **Size**: XL, merge-risk cao (compatibility + security-boundary)

5. **#136833** - Từ chối thay đổi model không tương thích trước khi persist
   - **Vấn đề**: Session bị stuck khi chuyển sang model không hỗ trợ placement

6. **#141628** - Giữ lại TOOLS.md như workspace file tùy chọn
   - **Size**: XL, cho phép tách biệt policy (AGENTS.md) và environment facts (TOOLS.md)

#### 🟢 **Tối ưu hiệu năng**

7. **#135481** - Defer completion delivery khi requester lane đang busy
   - **Vấn đề**: Child agent mất 286-310s để announce thay vì 0.68s
   - **Trạng thái**: Chờ proof từ telegram-e2e

8. **#135648** - Chuẩn bị profile defaults trong một map duy nhất (Browser)
   - **Tối ưu**: Giảm allocation bằng cách không copy map 3 lần

### **Xu hướng phát triển**

- **Tập trung vào ổn định hóa**: 70% PR là bugfix, đặc biệt các lỗi P0/P1
- **Vấn đề bảo mật nghiêm trọng**: Runtime context leaks xuất hiện trên 5+ channels
- **Update mechanism cần cải tạo**: Nhiều lỗi liên quan đến upgrade path 2026.7.x → 2026.8.x → 2026.9.x

## ⭐ Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác nhất**

1. **#44925** (26 bình luận, 2 👍) - **[P1] Subagent completion bị mất hoàn toàn**
   - Không có retry, notification, hay auto-restart khi timeout
   - **Impact**: Data loss + Message loss + Session state

2. **#126360** (16 bình luận) - **AgentSelectionRequiredError flood logs**
   - Logbook plugin, Control UI global RPCs thiếu agentId target
   - Xuất hiện khi dùng explicit multi-agent ownership

3. **#97616** (15 bình luận, 1 👍) - **Zombie process leak**
   - Hook/tool child processes không được reap
   - Gây zombie accumulation và runtime degradation

### **Phản ứng cộng đồng**

- Người dùng **rất quan tâm** đến vấn đề multi-agent orchestration (#44925, #43367, #126360)
- **Context leaking** (#137927, #115978, #136471) gây lo ngại về bảo mật
- **Update experience tồi tệ**: #133984, #134896, #135038 đều mô tả upgrade path phức tạp với 5-12 bước manual repair

## 🐛 Ổn định & Bugs

### **Lỗi nghiêm trọng đang được xử lý**

#### 🔥 **P0 - Release Blocker**

1. **#141617** - Update 2026.9.2 bị stuck ở "running" mãi mãi
   - Package cài đặt thành công nhưng update run không finalize được
   - **Rating**: 🦞 diamond lobster

2. **#139284** - Track update-run terminalization và late progress recovery
   - UI hiển thị "Configuration writes suspended" vĩnh viễn
   - **Đã CLOSED**

3. **#111578** - Gateway auth token bị drop sau update
   - Lỗi tái diễn dù đã fix ở 2026.7.1
   - CLI không thể auth locally

#### 🔴 **P1 - Critical**

4. **#137927, #137493, #136471, #134240, #115978, #127784** - **Runtime context leak epidemic**
   - Xuất hiện trên: Telegram, Feishu, Teams, Signal, Webchat
   - Nội dung internal như `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` lộ ra ngoài
   - **Impact**: Security + UX friction
   - **Status**: Multiple PRs đang fix (#140859 CLOSED, #139604 CLOSED, #137530 OPEN)

5. **#141252** - Reply fails với "no active tool authority snapshot" (2026.9.2 regression)
   - Xảy ra với busy-session/queued replies
   - User nhận generic error, fallback chain misfires

6. **#119583** - CLI read commands gây SQLite contention với gateway
   - Mọi CLI command (kể cả `health`, `status`) đều mở DB read-write và auto-migrate
   - **Đã CLOSED**

### **Bugs ảnh hưởng trải nghiệm**

- **#141564** - Browser panel stays stale sau khi screencast socket disconnect
- **#141556** - NO_REPLY retry thành empty answer và post "Agent couldn't generate response"
- **#138779** - WhatsApp prepends raw responsePrefix template vào inbound messages
- **#141694** - Silent-fallback reply hardcodes sai lý do failure

## 💡 Yêu cầu tính năng

### **Feature requests được đề xuất**

1. **#45503** (4 bình luận, 2 👍) - **Manual context clearing cho tool results**
   - Hiện tại chỉ có auto TTL (1h)
   - Use case: Gmail search results chỉ cần giữ tạm thời
   - **Priority**: P3

2. **#129366** (3 bình luận) - **Model Request Rate Limiting**
   - Cho phép giới hạn requests per model/global
   - Config: `requests: 15, period: "24h", onLimit: "wait"`
   - **Priority**: P3

3. **#82011** (3 bình luận, 1 👍) - **输入文本错别字检测** (Kiểm tra lỗi chính tả tiếng Trung)
   - Tự động phát hiện typos và lỗi ngữ pháp
   - Cải thiện độ chính xác và hiệu suất đối thoại

4. **#98242** (3 bình luận, 1 👍) - **One-step mobile QR pairing**
   - Đơn giản hóa onboarding: không cần approve riêng mobile device, node, operator handoff
   - **Priority**: P2, maintainer đang xem xét

## 💬 Phản hồi người dùng

### **Trải nghiệm tiêu cực**

**Upgrade nightmare** 🔴
- @Lendersmark (#133984): "2026.7.1-2 → 2026.8.1 leaves Gateway unstartable" - cần **12 bước manual repair**
- @WoodyKim554 (#134896): "5-blocker gateway restart cascade" - cần inspect dist-source để fix
- @fulgerulnegru (#135038): "gateway unstartable + 4 distinct problems + 3 closed issues still reproduce (regressions)"

**Multi-agent orchestration issues** 🟡
- @waliddafif (#43367): "concurrent agents add overwrites config", "session-lock failures", "detached child work"
- @IIIyban (#44925): "Subagent completion silently lost" - pattern xảy ra ở E31, E42, E45

**Context leaks gây lo ngại** 🔴
- @DeltaEcho3 (#137927): "Internal context block leaks into visible Telegram text"
- @seonagi (#136471): "per-turn session IDs instead of persistent session" - mỗi lượt tạo session ID mới

### **Trải nghiệm tích cực**

- PR reviews chuyên nghiệp với ratings (🦞 diamond lobster, 🐚 platinum hermit, etc.)
- Maintainer response time nhanh
- Documentation được cập nhật kèm theo fixes

## 📋 Backlog & Roadmap

### **Công việc đang ưu tiên**

#### **Ngắn hạn (Sprint hiện tại)**

1. ✅ **Ổn định update mechanism** (#141562 CLOSED, #140579 CLOSED)
   - Khắc phục update runs bị stuck
   - Bảo toàn user config qua updates

2. 🔄 **Khắc phục runtime context leaks** 
   - #140859 CLOSED, #139604 CLOSED
   - #137530 OPEN - cần proof từ telegram-e2e
   - #132607 OPEN - bypass relocation cho local providers

3. 🔄 **Cải thiện multi-agent orchestration**
   - #135481 - defer completion delivery
   - #43367 - concurrent config writes safety

#### **Trung hạn**

- **SQLite contention resolution** (#117262) - 3 concurrent write handles gây stall 33s
- **Session transcript projection** (#119754) - wait thay vì reject during rebuild
- **Model fallback chain** (#141604) - không abort sớm khi còn candidates

#### **Dài hạn**

- **Policy/Tools separation** (#141628) - retain TOOLS.md
- **Rate limiting** (#129366) - model-specific or global
- **Mobile QR pairing** (#98242) - one-step onboarding

### **Technical Debt đang xử lý**

- Zombie process cleanup (#97616)
- AgentSelectionRequiredError log flood (#126360)
- CLI commands SQLite contention (#119583 - CLOSED)
- macOS Dashboard auth token injection (#98486)

---

## 🎯 Đánh giá chung

**OpenClaw đang ở giai đoạn ổn định hóa sau release lớn 2026.9.2**. Dự án có:

✅ **Điểm mạnh:**
- Maintainer team responsive và chuyên nghiệp
- Process review code chặt chẽ với rating system
- Documentation được maintain tốt

⚠️ **Điểm yếu hiện tại:**
- **Update experience tồi tệ** - nhiều users gặp gateway crash sau upgrade
- **Context leak epidemic** - vấn đề bảo mật nghiêm trọng trên nhiều channels
- **Multi-agent orchestration chưa ổn định** - race conditions, silent failures

🔮 **Dự báo:**
Dự án sẽ cần **1-2 tuần** để ổn định hoàn toàn sau 2026.9.2. Ưu tiên tiếp theo có thể là **cải thiện update mechanism** và **multi-agent reliability**.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích Dự án NanoBot - Ngày 08/09/2026

## 1. 🎯 Tóm tắt hôm nay

Hôm nay NanoBot có hoạt động phát triển đáng kể với **22 Pull Requests** (trong đó 7 PR được đóng) và **2 Issues mới/cập nhật**. Trọng tâm là các bản vá lỗi quan trọng về hiệu năng, bảo mật và trải nghiệm người dùng, đặc biệt tập trung vào tối ưu hóa bộ nhớ, cải thiện WebUI và sửa lỗi hồi quy. Không có release chính thức mới trong 24h qua.

## 2. 📦 Releases

❌ **Không có releases mới trong ngày hôm nay**

## 3. 🚀 Tiến độ dự án

### Pull Requests Quan trọng (theo mức độ ưu tiên)

#### 🔴 Priority P1 - Cực kỳ quan trọng

**#5580 - Session Persistence Off Event Loop** 
- ⚡ **Vấn đề**: Lưu trữ session chậm đang block event loop, gây treo toàn bộ hệ thống
- ✅ **Giải pháp**: Chuyển tất cả I/O session sang dispatcher không đồng bộ
- 📈 **Impact**: Cải thiện đáng kể hiệu năng cho các cuộc hội thoại song song

**#5662 - OpenCode Session Header**
- 🔑 **Bối cảnh**: OpenCode yêu cầu header `x-opencode-session` từ ngày 06/09/2026
- ⚠️ **Rủi ro**: Requests thiếu header sẽ mất tối ưu prompt-cache và có thể bị lỗi
- ✅ **Hành động**: Thêm header tự động cho OpenCode Zen/Go

#### 🟡 Priority P2 - Quan trọng

**Nhóm Bug Fixes quan trọng:**
- **#5675**: Sửa lỗi model failover không hoạt động khi primary model timeout
- **#5686**: Sửa lỗi cron job bị cancel khi đang thực thi
- **#5691**: Sửa lỗi hiển thị LaTeX multiline trong WebUI
- **#5630**: Thêm giới hạn kích thước cho Dream memory files (tránh OOM)

**Cải tiến WebUI:**
- **#5602, #5547**: Thêm âm thanh thông báo khi agent hoàn thành (opt-in)
- **#5685**: Khôi phục model setup trong browser thay vì chuyển sang terminal

### 🔍 Xu hướng Phát triển

1. **Tập trung vào ổn định hệ thống**: 70% PRs là bug fixes và regression fixes
2. **Tối ưu hiệu năng**: Nhiều PRs về memory management, async I/O, và caching
3. **Cải thiện trải nghiệm WebUI**: Notifications, UX consistency, math rendering
4. **Bảo mật sandbox**: PR #5628 thêm macOS Seatbelt sandbox backend

## 4. 💬 Điểm nổi bật cộng đồng

### Issue #5567 - Tích hợp Feishu/飞书 (5 bình luận) 
- 🎯 **Vấn đề**: Agent trả lời nhiều tin nhắn riêng lẻ, trải nghiệm kém
- 💡 **Đề xuất**: Tích hợp thành **một tin nhắn streaming card duy nhất**
- 🔥 **Ý nghĩa**: Quan trọng cho thị trường Trung Quốc (Feishu là nền tảng phổ biến)

### Issue #5693 - Hỗ trợ IoT/Vô nhân bán lẻ (mới hôm nay)
- 🤖 **Bối cảnh**: Người dùng muốn triển khai NanoBot cho cửa hàng vô nhân
- 📋 **Yêu cầu**: 
  - Deployment nhẹ hơn cho edge devices
  - Tài liệu tiếng Trung
  - Hỗ trợ IoT scenarios
- 💭 **Đánh giá**: Cơ hội mở rộng vào vertical mới (retail automation)

## 5. 🐛 Ổn định & Bugs

### Bugs Nghiêm trọng Đã được Xử lý

| Bug | Mức độ | Trạng thái | Impact |
|-----|--------|-----------|--------|
| Session blocking event loop | P1 | Open | ⚠️ Stall toàn hệ thống |
| Model failover không hoạt động | P2 | Open | 🔴 Mất khả năng dự phòng |
| Dream memory files không giới hạn | P2 | Open | 💥 OOM risk |
| Cron jobs bị cancel | P2 | Open | ⏰ Scheduled tasks fail |
| OpenCode header thiếu | P1 | Open | ⚡ API errors từ 06/09 |

### Hồi quy (Regressions)

- **#5675**: Sau một thay đổi trước đó, failover provider không còn hoạt động đúng
- **#5630**: PR #5622 vô tình xóa size cap cho Dream memory files
- **#5689**: Server/browser clock skew gây hiển thị timer không nhất quán

### Bản vá đã được Merge (7 PRs closed hôm nay)

✅ **#5683**: Sửa WeChat Work media upload bằng SDK chính thức  
✅ **#5677**: Ổn định tests flaky trên Windows  
✅ **#5688**: Sửa provider state sau idle compaction  
✅ **#5690, #5684**: Cập nhật documentation  

## 6. 💡 Yêu cầu tính năng

### Tính năng mới đang phát triển

1. **Desktop Target Selection** (#5676)
   - Cho phép chọn Python hoặc Desktop runtime per-invocation
   - Cải thiện flexibility cho developers

2. **Completion Notification Sound** (#5602, #5547)
   - Âm thanh thông báo khi agent hoàn thành
   - Opt-in, chỉ khi page đang visible
   - Bổ sung cho browser notifications hiện tại

3. **macOS Sandbox Backend** (#5628)
   - Sử dụng Seatbelt native của macOS
   - Không cần dependency mới
   - Tăng cường bảo mật shell execution

4. **AnySearch Provider** (#5607)
   - Thêm provider tìm kiếm web mới
   - Key optional, có anonymous quota
   - Mở rộng lựa chọn web search

### Đề xuất từ cộng đồng

- **Feishu streaming integration** (#5567): High impact cho thị trường châu Á
- **IoT/Edge deployment** (#5693): Vertical mới, cần research thêm

## 7. 👥 Phản hồi người dùng

### Tích cực
- Cộng đồng đang đóng góp nhiều PR chất lượng (22 PRs active)
- Quan tâm đến localization (tiếng Trung) và enterprise integrations (Feishu, WeChat Work)

### Vấn đề đang gặp
- **Hiệu năng**: Session I/O blocking, memory leaks từ Dream files
- **Reliability**: Model failover không hoạt động, cron jobs unstable
- **UX consistency**: Timer display, LaTeX rendering issues
- **Deployment**: Cần options nhẹ hơn cho edge devices

### Kỳ vọng
- Hỗ trợ tốt hơn cho messaging platforms phổ biến ở châu Á
- Deployment options linh hoạt hơn (cloud vs edge)
- Ổn định hơn cho production use cases

## 8. 📋 Backlog & Roadmap

### Công việc đang tiến hành (Open PRs)

**Blockers cần giải quyết ngay:**
- 🔴 Session I/O performance (P1)
- 🔴 OpenCode header compatibility (P1)  
- 🟡 Model failover fix (P2)
- 🟡 Memory management (Dream files) (P2)
- 🟡 Cron stability (P2)

**Feature development:**
- Desktop/Python target selection
- Notification improvements
- macOS sandbox backend
- AnySearch integration

### Dự đoán xu hướng tiếp theo

1. **Ổn định Core**: Dựa trên số lượng bug fixes, team đang ưu tiên stabilization cho production
2. **Enterprise Integration**: Focus vào Feishu, WeChat Work → hướng đến enterprise adoption ở châu Á
3. **Edge/IoT**: Nhu cầu deployment nhẹ → có thể có lightweight edition
4. **Performance**: Nhiều PRs về async, memory → chuẩn bị scale

---

## 📌 Tổng kết

**Điểm mạnh hôm nay:**
- ✅ Tốc độ fix bugs cao (7 PRs merged)
- ✅ Cộng đồng active với nhiều contributions
- ✅ Phát hiện và xử lý regressions nhanh

**Cần chú ý:**
- ⚠️ Nhiều P1/P2 bugs vẫn open → cần prioritize
- ⚠️ Regression rate cao → cần test coverage tốt hơn
- ⚠️ OpenCode deadline (06/09) đã qua → urgent merge required

**Đánh giá tổng thể:** Dự án đang trong giai đoạn **stabilization** với focus vào reliability và performance trước khi push thêm features mới. 📈

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo phân tích dự án Zeroclaw - Ngày 2026-09-08

## 1. 🎯 Tóm tắt hoạt động hôm nay

Zeroclaw có một ngày làm việc sôi động với **50 PRs đang mở** và nhiều hoạt động sửa lỗi quan trọng. Dự án đang tập trung vào việc củng cố tính bảo mật, sửa các lỗi kênh truyền (channels), và mở rộng khả năng tích hợp với các nhà cung cấp AI mới. Đáng chú ý, các thành viên tin cậy và có kinh nghiệm đang đóng góp tích cực với nhiều PR chất lượng cao, đặc biệt là trong việc cải thiện hệ thống delegate và filesystem security.

## 2. 📦 Releases

**Không có release mới** trong 24 giờ qua. Dự án đang trong giai đoạn phát triển và ổn định tính năng.

## 3. 🚀 Tiến độ dự án

### Các vấn đề đã được giải quyết ✅

**Issues đã đóng:**
- 🐛 **#10670**: Lỗi heartbeat.target từ chối composite key của channel instances
- 🐛 **#10688**: WhatsApp Web voice notes không được transcribe do thiếu cấu hình transcription provider
- 🐛 **#10326**: Reliable streaming errors hiển thị sai model information

**Pull Requests đã merge:**
- ✅ **#10671**: Fix heartbeat.target để chấp nhận composite key `<type>.<alias>` - giải quyết vấn đề routing cho multiple channel instances
- ✅ **#10692**: Liên kết transcription với agent's provider thay vì sử dụng cấu hình legacy - khắc phục hoàn toàn #10688
- ✅ **#10415**: Sửa lỗi attribution của Reliable stream errors để hiển thị đúng served model
- ✅ **#10638**: Sửa gateway boot default seeding khi entry đầu tiên không có model

### Xu hướng phát triển 📈

**1. Tăng cường bảo mật (Security Hardening)** 🔒
- **#9977** [risk:high]: Confine filesystem mutations to workspace - PR lớn (XL) đang cần review, tập trung vào việc sandbox file operations
- **#10241** [risk:high]: Restore supervised shell approval routing - khôi phục cơ chế phê duyệt lệnh shell quan trọng
- **#10391** [risk:high]: Bounded delegate filesystem tools respect target's workspace - đảm bảo các công cụ delegate không vượt qua boundary

**2. Hỗ trợ OpenAI Responses & Reasoning Models** 🧠
Chuỗi 5 feature requests mới (#10704-#10708) đề xuất mở rộng khả năng làm việc với OpenAI Responses API:
- #10704: Async function tools
- #10705: Max reasoning effort cho GPT-6 Astra
- #10706: Preserve opaque reasoning state
- #10707: Bounded programmatic tool calling
- #10708: Active-response steering qua WebSockets

**3. Claude Adaptive Thinking** 🤖
- **#10611** [risk:high, size:XL]: Adapt Anthropic và Bedrock cho Claude models mới (Fable 5.1, Opus 4.7, 4.8, Opus 5, Sonnet 5) với adaptive thinking

**4. Cải thiện Channels** 📡
- **#10637**: Consolidate WS memory trên agent's provider thay vì gateway default
- **#9313**: WeChat persistence fix để tránh mất messages khi restart
- **#10620**: Telegram voice message error reporting

## 4. 🌟 Điểm nổi bật cộng đồng

### Contributors xuất sắc
- **@IftekharUddin** (Distinguished Contributor): 5 PRs quan trọng bao gồm cost tracking (#9939) và Claude adaptation (#10611)
- **@Audacity88** (Distinguished Contributor): Leading security initiatives với #9977, #10241
- **@NiuBlibing** (Distinguished/Principal): Gateway fixes (#10637, #10638) và context compaction (#9535)

### Issues được quan tâm
- **#10700** [priority:p2]: Cost records carry daemon-lifetime session id - vấn đề tracking chi phí per-conversation đang được báo cáo
- **#10709**: Documentation request cho Astra setup - người dùng cần hướng dẫn rõ ràng hơn

## 5. 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đang xử lý

**Priority P2 (High):**
- 🔴 **#10700**: Session ID không phân biệt conversations → không tách được spend per-chat
- 🔴 Các channel bugs (#10670, #10688) đã được fix nhanh trong cùng ngày

**Vấn đề bảo mật:**
- Multiple high-risk PRs đang trong review (#9977, #10241, #10391) - team đang thận trọng với filesystem và delegation security
- **#10712**: WebSocket TLS trust issue - corporate proxy với TLS inspection gây lỗi Slack connection

### Bugs phức tạp cần theo dõi
- **#9447** [status:in-progress]: Anthropic incomplete terminal responses classification - đã ở review round 3
- **#9378**: ACP transcript persistence cho failed/cancelled turns
- **#9724**: `always_ask` policy bị override bởi Full autonomy

## 6. 💡 Yêu cầu tính năng

### Tính năng mới được đề xuất

**OpenAI Responses ecosystem** (đề xuất hôm nay):
- Async tool execution để model có thể làm việc khác trong khi chờ tool results
- GPT-6 Astra "max" reasoning effort support
- WebSocket steering để user có thể correct response đang chạy
- Programmatic tool calling với bounded execution

**Infrastructure & Observability:**
- **#9713** [status:blocked]: Token accounting trên history-trim events
- **#10711**: SEO improvements cho published docs (canonical URLs, sitemap, robots.txt)
- **#10679**: Keenable web search provider integration

**UX Enhancements:**
- **#9997**: Telegram secure model picker với inline keyboard
- **#10450**: Webhook SSE streaming cho real-time responses
- **#10567**: Memory timestamps để recalled entries có context thời gian

## 7. 💬 Phản hồi người dùng

### Pain points được báo cáo:
1. **Documentation gaps**: #10709 yêu cầu hướng dẫn setup Astra - API key và Codex subscription providers cần docs tốt hơn
2. **Cost tracking**: #10700 - users không thể track spend theo conversation, chỉ có daemon-lifetime aggregate
3. **WhatsApp transcription**: #10688 - feature hoàn toàn không hoạt động cho voice notes, đã được fix nhanh

### Positive signals:
- Nhiều trusted và experienced contributors đang tham gia tích cực
- Issues được respond và fix trong cùng ngày (turnaround time tốt)
- Community đang đề xuất feature requests có tính system thinking cao (#10704-#10708 series)

## 8. 📋 Backlog & Roadmap

### Blocked/Stale items cần attention:
- **#9713** [status:blocked]: Token accounting - blocked nhưng quan trọng cho observability
- **#9997** [status:blocked]: Telegram model picker - blocked vì security concerns
- **#10241** [status:blocked]: Shell approval routing - blocked, cần unblock vì security critical
- **#10425** [needs-author-action]: Internal principal envelope (RFC #6954 part 1/3)

### High-priority work in progress:
1. **Security hardening** (#9977, #10241, #10391) - multiple XL PRs cần complete
2. **Claude adaptive thinking** (#10611) - XL PR đang review
3. **OpenAI Responses support** - series mới, cần triage và prioritize
4. **ACP persistence** (#10197, #9378) - quan trọng cho reliability

### Technical debt:
- **#9283** [stale-candidate]: Web fetch decompression - cần author action
- **#9317**: ZeroCode viewport rendering - memory optimization đang pending
- **#9713** [do-not-merge]: Token accounting - needs unblock decision

---

## 📊 Metrics tổng quan

- **Issues mới hôm nay**: 6 (5 enhancements + 1 bug)
- **Issues đóng hôm nay**: 3
- **PRs mới hôm nay**: 4
- **PRs merged hôm nay**: 4
- **Contributors hoạt động**: 15+
- **Tỷ lệ PRs risk:high**: ~40% (cho thấy project đang tackle các vấn đề phức tạp)

### 🎯 Đánh giá tổng thể

Zeroclaw đang trong giai đoạn **consolidation & expansion**. Team đang vừa củng cố security và stability (filesystem, channels, approval flow) vừa mở rộng khả năng tích hợp với các AI models mới nhất (Claude adaptive thinking, OpenAI Responses). Tốc độ response với bugs nhanh, nhưng các PRs lớn về security đang cần thời gian review kỹ càng. Community health tốt với nhiều experienced contributors tham gia.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích Dự án PicoClaw - Ngày 08/09/2026

## 🎯 Tóm tắt hôm nay

Hôm nay PicoClaw tập trung mở rộng hệ sinh thái tích hợp với **3 PR mới** xoay quanh providers và tools. Điểm nổi bật là việc thêm provider OpenCode Go mới và tích hợp công cụ tìm kiếm web Keenable không cần API key. Dự án vẫn đang xử lý issue về xác thực QQ channel từ tuần trước, phản ánh sự chú trọng vào ổn định các kênh giao tiếp hiện có.

---

## 📦 Releases

**Không có release mới trong 24h qua.**

---

## 🚀 Tiến độ dự án

### Pull Requests hoạt động

#### ✨ Tính năng mới nổi bật

**#3371 - OpenCode Go Provider** (Mới nhất - 08/09)
- 🎯 **Mục đích**: Tạo provider riêng cho OpenCode Go (`https://opencode.ai/zen/go/v1`)
- 🔧 **Kỹ thuật**: 
  - Tự động routing cho 3 họ endpoint khác nhau
  - Hỗ trợ header `x-opencode-session` ổn định
  - Xử lý response OpenAI-compatible
- 💡 **Ý nghĩa**: Củng cố hỗ trợ cho một provider AI quan trọng, giải quyết #3369

**#3370 - Keenable Web Search** (07/09)
- 🔍 **Đột phá**: Provider tìm kiếm web **không cần API key**
- ⚙️ **Cấu hình đơn giản**: Chỉ cần set `tools.web.keenable.enabled = true`
- 🌐 **Endpoint**: `POST /v1/search/public` với header `X-Keenable-Title`
- 📈 **Tác động**: Giảm barrier-to-entry cho người dùng mới muốn dùng web search

#### 🔄 PRs đang chờ xử lý (Stale)

**#3344 - Build Remote Agent pairing** (23/08, stale)
- 📱 Tính năng: Ghép nối thiết bị phone để spectate desktop agent
- 🔌 Protocol: `gbr/1`, yêu cầu `gbr-agent` v0.6.0+
- ⚠️ **Trạng thái**: Stale sau 2 tuần, có thể cần maintainer review

**#3354 - IRCv3 multiline support** (31/08, stale)
- 💬 Hỗ trợ nhận tin nhắn multiline theo `draft/multiline` IRCv3
- 🎭 Tự động request capabilities: `batch`, `message-tags`, `draft/multiline`
- ⚠️ **Trạng thái**: Stale 1 tuần

**#3353 - Tool feedback animation bounds** (31/08, stale)
- 🎬 Giới hạn animation feedback tool (timeout 5 phút)
- 🛡️ Ngăn animation chạy vô thời hạn khi cleanup fail
- ⚠️ **Trạng thái**: Stale 1 tuần

### 📊 Xu hướng phát triển

1. **Mở rộng provider ecosystem**: 2/3 PR mới liên quan đến providers
2. **Lowering barriers**: Ưu tiên tính năng không cần API key (Keenable)
3. **Nợ kỹ thuật**: 3 PRs đã stale cần attention từ maintainers

---

## 💬 Điểm nổi bật cộng đồng

**#3365 - QQ Channel 401 Error** (4 ngày trước, 👍 1, 1 comment)
- 🔥 **Mức độ quan tâm**: Có upvote và discussion
- 👥 **Tác động**: Ảnh hưởng người dùng Orange Pi 3B (RK3566, aarch64)
- 🎯 **Đối tượng**: Người dùng Trung Quốc sử dụng QQ channel

**Insight**: Issue về QQ channel cho thấy PicoClaw có user base đáng kể ở thị trường Trung Quốc. Việc này chưa được resolve trong 4 ngày có thể ảnh hưởng trải nghiệm một phân khúc người dùng quan trọng.

---

## 🐛 Ổn định & Bugs

### Issue đang mở

**#3365 - QQ Channel 401 "Authorization参数格式错误"**

📋 **Chi tiết kỹ thuật**:
- **Root cause**: Xung đột giữa `botgo v0.2.1` và `resty >= v2.17`
- **Môi trường**: Orange Pi 3B, aarch64, PicoClaw nightly build 0.3.1
- **Triệu chứng**: Lỗi xác thực khi kết nối QQ channel
- **Phụ thuộc**: 
  - `github.com/tencent-connect/botgo v0.2.1`
  - `github.com/go-resty/resty/v2 v2.17.1` (indirect)

⚠️ **Mức độ nghiêm trọng**: Trung bình - blocking tính năng QQ channel hoàn toàn

🔧 **Trạng thái**: Đã được report với đủ thông tin reproduce, đang chờ fix

**Đánh giá**: Đây là regression issue liên quan đến dependency compatibility. Cần ưu tiên vì ảnh hưởng tới một platform integration quan trọng.

---

## ✨ Yêu cầu tính năng

### Tính năng đang implement

1. **OpenCode Go provider** (#3371)
   - 🎯 Mục tiêu: Hỗ trợ chính thức OpenCode AI
   - 📊 Tiến độ: PR đã submit, đang review
   - 💼 Use case: Doanh nghiệp/cá nhân dùng OpenCode Go

2. **Keenable web search** (#3370)
   - 🎯 Mục tiêu: Web search không cần API key
   - 📊 Tiến độ: PR đã submit
   - 💼 Use case: Onboarding người dùng mới dễ dàng hơn

3. **Build Remote Agent pairing** (#3344 - stale)
   - 🎯 Mục tiêu: Remote monitoring/debugging
   - 📊 Tiến độ: Stale, cần maintainer attention
   - 💼 Use case: DevOps, remote collaboration

4. **IRCv3 multiline** (#3354 - stale)
   - 🎯 Mục tiêu: UX tốt hơn cho IRC users
   - 📊 Tiến độ: Stale
   - 💼 Use case: IRC power users

---

## 👥 Phản hồi người dùng

### Sentiment tích cực
- ✅ Có contributor từ community (@EMTumariscal, @ilya-bogin-keenable) chủ động submit provider mới
- ✅ Issue được report với chất lượng cao (environment details, reproduction steps)

### Concerns
- ⚠️ **Response time**: 3 PRs đã stale trong 1-2 tuần, cho thấy có thể thiếu reviewer bandwidth
- ⚠️ **QQ channel blocking**: User bị block 4 ngày mà chưa có workaround/fix
- ⚠️ **Documentation**: Không rõ có hướng dẫn integration cho providers mới hay không

### Đánh giá tổng quan
📊 **Mức độ hoạt động community**: **Trung bình đến Tốt**
- Có external contributors
- Issue quality cao
- Nhưng maintainer response có thể cải thiện

---

## 🗓️ Backlog & Roadmap

### Ưu tiên ngắn hạn (inferred)
1. 🔴 **Critical**: Fix QQ channel 401 error (#3365)
2. 🟡 **High**: Review & merge OpenCode Go provider (#3371)
3. 🟡 **High**: Review & merge Keenable search (#3370)
4. 🟢 **Medium**: Review stale PRs (#3344, #3354, #3353)

### Xu hướng chiến lược
📈 **Provider ecosystem expansion**: Dự án đang mở rộng tích hợp với nhiều AI providers và tools
- ✅ Đã có: Multiple providers (OpenAI-compatible)
- 🚀 Đang thêm: OpenCode Go, Keenable
- 🎯 Chiến lược: Lowering barrier-to-entry (no API key options)

🔌 **Platform diversification**: 
- IRC, QQ channel, Build Remote Agent
- Focus vào markets khác nhau (China với QQ, IRC cho technical users)

⚠️ **Technical debt**:
- Dependency compatibility issues
- Stale PR backlog cần clearing

---

## 🎬 Kết luận

**PicoClaw** đang trong giai đoạn **mở rộng hệ sinh thái** với focus vào accessibility và multi-platform support. Điểm mạnh là có community engagement tốt với external contributors, nhưng cần cải thiện maintainer response time để tránh PRs bị stale. 

**Priority hôm nay**: Fix QQ channel regression để không mất user base Trung Quốc, và review 2 provider PRs mới để maintain momentum của contributors.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo phân tích NanoClaw - 2026-09-08

## 📊 Tóm tắt hôm nay

NanoClaw đang trong giai đoạn tích cực sửa lỗi và hoàn thiện hạ tầng, với 28 PR hoạt động và 2 issue mới về quản lý vòng đời session. Dự án vừa merge một chuỗi PR quan trọng về **durable host** - cho phép hệ thống tồn tại qua các lần restart. Đồng thời, team đang mở rộng khả năng tích hợp với kênh email (AgentMail) và cải thiện trải nghiệm agent-to-agent communication.

## 🚀 Tiến độ dự án

### ✅ Các PR đã merge (7 PRs)

**Nhóm tính năng Durable Host - hạ tầng cốt lõi:**
- **#3653**: Rollup PR merge toàn bộ chuỗi durable-host (#3508→#3528) - cho phép NanoClaw khôi phục trạng thái sau restart
- **#3517**: Shadow-write coordination state - ghi song song vào DB bên cạnh in-memory maps
- **#3518**: Approvals survive restarts - approval requests không bị mất khi process chết

**Cải thiện trải nghiệm:**
- **#3400**: Fix typing indicator trên Slack - không còn bị "đơ" sau khi gửi tin
- **#3666**: Khôi phục bảng paste từ Slack (tables bị mất format)
- **#3665**: Chat-SDK channels giữ lại raw content để không mất dữ liệu

**DevOps & Maintenance:**
- **#3661**: Retry Bun install thay vì fail ngay - tăng độ tin cậy build
- **#3659**: Thống nhất cách đọc quoted values trong `.env`
- **#3662**: Message rõ ràng hơn khi pre-task script timeout
- **#3663**: Dùng placeholder name trung tính trong examples
- **#3664**: Config install-wide default model và fast serving tier
- **#3736**: CI gate job để prevent auto-merge khi có test fail
- **#3737**: Fix race condition trong DB conformance test

### 🔄 PR đang hoạt động (14 PRs quan trọng)

**Bugs & Fixes cao độ ưu tiên:**

🔴 **#3738** - Thread replies bị sai vị trí (core issue)
- File attachments đang rơi vào main channel thay vì thread
- Fix: `resolveRouting` giờ lấy thread từ message đang được reply
- Impact: Core communication flow

🔴 **#3740** - Channel adapters mất retry eligibility
- Inbound routing completion không được return về adapter
- Có thể mark message là handled trước khi mailbox write thất bại
- Fix: Return routing promise để adapter giữ khả năng retry

🟡 **#3741** - Scheduled tasks grow cost mỗi ngày
- Job chạy hàng đêm phải re-read toàn bộ conversation history
- Một user báo cost tăng 15% trong 1 tuần
- Solution: `--fresh-session` flag để chạy stateless

🟡 **#3742** - CLI không tạo được read-write mount
- `--ro` flag hiện là no-op, và không có cách nào express `--rw`
- Security concern: default behavior không rõ ràng

**Agent-to-Agent Communication:**

🔵 **#3718** - Preserve verified sender identity
- Messages từ agent khác đang hiển thị sender tự viết, không có verification
- Receivers từ chối legitimate messages vì không tin sender
- Fix: Verified sender identity + maintain command boundaries

🔵 **#3719** - Report communication failures to source
- Khi A2A message fails (blocked, rejected, no route), sender không biết
- Add: System notes về delivery status cho sending agent

**Infrastructure & Integrations:**

🆕 **#3743** - AgentMail email channel adapter
- Fully-managed agent email inbox via API (agentmail.to)
- Giải quyết vấn đề MX record ownership
- Cho phép agent nhận email mà không conflict với mail provider hiện tại

🆕 **#3733** - OpenCode provider skill (self-contained)
- Deliver OpenCode as selectable provider trong setup
- Dùng cho installation recovery, debugging, update skills
- Bao gồm runtime + native host capability + container CLI/SDK pins

🔵 **#3729** - Browser portal cho community cell
- Move Echo và Slack setup vào browser với WorkOS sign-in
- Quản lý perks trong portal thay vì CLI-only
- Improve activation flow UX

**DevOps:**

🔧 **#3734** - Fix PR label workflows đang conflict
- Area labeling đang overwrite kind/delivery labels
- Tích lũy duplicate labels
- Reconcile toàn bộ classification logic

🔧 **#3739** - Registry gate check + Docker Hub resilience
- 3 jobs failed nhưng #3737 vẫn auto-merge
- Add: `registry gate` as required check
- Build survive Docker Hub 5xx errors

**Experimental:**

🧪 **#3494** - Build Remote Agent phone pairing
- Cho phép phone spectate desktop agent
- Protocol: `gbr/1` với MIT `gbr-agent`
- QR code + 8-char pairing code

## 🐛 Ổn định & Bugs

### 🔴 Critical Issues (mới report)

**#3735 - Conversation archives grow without bound**
- `archiveTranscriptFile()` ghi markdown archive mỗi lần compaction
- Không có retention, rotation, hoặc cap
- Directory phình ra suốt lifetime của agent group
- User report: Fleet của họ đã reach critical size
- **Impact**: Storage bloat, performance degradation theo thời gian

**#3732 - Transcript rotation never runs cho long-running tasks**
- `maybeRotateContinuation()` chỉ chạy khi container start
- Tasks với recurrence < 30 phút giữ container alive mãi mãi
- Session continuation không bao giờ được rotate
- **Impact**: Memory leak, session state grows indefinitely

### 🟡 Medium Priority Bugs

- **Thread routing**: Files/messages rơi sai thread (#3738)
- **Mount config**: Không tạo được RW mounts (#3742, #3690)
- **A2A failures**: Silent failures trong agent communication (#3719)
- **Approval loss**: Đã fix với durable-host merge

## 💡 Yêu cầu tính năng

### Đang implement:

✅ **Email channel** (#3743) - AgentMail integration cho managed inbox

✅ **Stateless scheduled tasks** (#3741) - `--fresh-session` để control cost growth

✅ **OpenCode provider** (#3733) - Self-contained skill delivery

✅ **Browser-based setup** (#3729) - Portal cho perks management

### Từ issues:

🔍 **Transcript lifecycle management** (#3735, #3732)
- Cần: Automated retention policies
- Cần: Rotation independent của container lifecycle  
- Cần: Configurable caps cho archive storage

## 👥 Phản hồi người dùng

### Pain Points được highlight:

1. **Cost escalation** - Scheduled tasks growing 15%/week do conversation history (#3741)
2. **Storage bloat** - Archive directories uncapped growth (#3735)  
3. **Silent failures** - A2A communication fails không thông báo (#3719)
4. **Lost content** - Tables paste từ Slack bị mất format (đã fix #3666)
5. **Setup friction** - Email channel cần MX ownership (đang fix #3743)

### Positive signals:

- Durable host merge là milestone lớn - restart-resilient approvals
- Community cell browser portal cải thiện onboarding
- Slack integration improvements đang được actively maintained

## 🗺️ Backlog & Roadmap

### Immediate priorities (đang active):

1. ✅ **Stability**: Fix core routing bugs (#3738, #3740)
2. ⚡ **Performance**: Address session/archive growth (#3732, #3735, #3741)
3. 🔌 **Integrations**: Email channel, OpenCode provider
4. 🔐 **Security**: Mount permissions, verified A2A identity

### Infrastructure trends:

- **Durability**: Completed với durable-host merge
- **Observability**: Improving error reporting (A2A failures, timeouts)
- **Developer Experience**: Browser portal, better setup flows
- **Cost efficiency**: Stateless tasks, storage management

### Technical debt being addressed:

- CI gate enforcement (#3736, #3739)
- Label workflow conflicts (#3734)
- Environment variable parsing inconsistencies (#3659)
- Container build resilience (#3661)

## 🎯 Đánh giá tổng quan

**Velocity**: Cao - 7 PRs merged trong ngày, 14 active PRs với clear scope

**Quality focus**: Rất tốt - Team đang fix root causes thay vì patch symptoms (xem #3741 stateless solution vs incremental fixes)

**Community health**: Tích cực - Issues được response nhanh (< 24h), pain points được prioritize

**Risk areas**: 
- Session lifecycle management cần attention ngay (#3732, #3735)
- Core routing bugs có impact cao (#3738, #3740)
- A2A communication reliability cần strengthen

**Momentum**: Dự án đang trong giai đoạn "hardening" sau khi ship durable-host feature. Focus đúng hướng vào stability, cost efficiency, và developer experience.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo Phân tích Dự án NullClaw - Ngày 08/09/2026

## 📊 Tóm tắt hôm nay

Hoạt động của dự án **NullClaw** trong ngày hôm nay khá yên tĩnh với không có issue hoặc release mới. Duy nhất một pull request về cập nhật dependency Docker đang trong trạng thái chờ xử lý từ tháng 6, cho thấy tốc độ review và merge có thể đang bị chậm lại trong giai đoạn này.

## 🚀 Releases

**Không có releases mới** trong 24 giờ qua.

## 📈 Tiến độ dự án

### Pull Requests đang chờ xử lý

**🐳 #956 - Cập nhật Alpine Docker Image (3.23 → 3.24)**
- **Trạng thái**: Mở từ 15/06/2026 (gần 3 tháng)
- **Loại**: Maintenance/Dependencies
- **Tác giả**: Dependabot (automated)

**Phân tích**:
- PR này là một bản cập nhật tự động từ Dependabot cho base image Alpine Linux trong Docker
- Việc PR này tồn tại 3 tháng mà chưa được merge cho thấy một trong hai tình huống:
  - Team đang thận trọng với việc cập nhật infrastructure dependencies
  - Có thể có vấn đề về CI/CD hoặc compatibility testing cần được giải quyết
- Alpine 3.24 là phiên bản stable và đã được release từ tháng 5/2026, việc cập nhật là hợp lý về mặt bảo mật

**⚠️ Xu hướng**: Không có PR hoặc issue mới trong ngày hôm nay cho thấy dự án có thể đang trong giai đoạn:
- Ổn định sau một đợt release lớn
- Giảm tốc độ phát triển
- Hoặc team đang tập trung vào công việc offline/internal

## 💬 Điểm nổi bật cộng đồng

**Không có hoạt động cộng đồng đáng chú ý** trong 24 giờ qua:
- Không có issue mới từ người dùng
- Không có discussion hoặc comment mới trên PR hiện tại
- Mức độ tương tác: **Rất thấp** (0 reactions trên PR duy nhất)

Điều này có thể phản ánh:
- 📉 Thời điểm yên tĩnh trong chu kỳ phát triển
- 🌍 Múi giờ: Có thể team/cộng đồng chính đang trong giờ nghỉ
- 🎯 Dự án có thể đang ở giai đoạn mature với ít breaking changes

## 🐛 Ổn định & Bugs

**Không có bug report hoặc issue kỹ thuật mới** được tạo trong ngày hôm nay.

**Đánh giá**:
- ✅ Dấu hiệu tích cực: Không có vấn đề urgent được báo cáo
- ⚠️ Lưu ý: Dependency update đang pending có thể liên quan đến security patches trong Alpine 3.24

**Khuyến nghị**: Team nên xem xét prioritize việc merge #956 để đảm bảo image được cập nhật các bản vá bảo mật mới nhất.

## 💡 Yêu cầu tính năng

**Không có feature request mới** trong 24 giờ qua.

## 📣 Phản hồi người dùng

**Không có feedback từ người dùng** trong khoảng thời gian này.

Điều này cho thấy:
- Sản phẩm đang hoạt động ổn định với user base hiện tại
- Hoặc cần có thêm kênh engagement để thu thập feedback

## 🗺️ Backlog & Roadmap

**Không có thông tin về roadmap** được công bố trong ngày hôm nay.

**Dựa trên dữ liệu hiện có**:
- Priority ngắn hạn: Xử lý dependency updates đang pending
- Cần theo dõi: Tần suất hoạt động của dự án trong tuần tới để đánh giá xu hướng

---

## 🔍 Kết luận & Đề xuất

**Tình trạng dự án**: 🟡 **Yên tĩnh/Ổn định**

**Điểm cần lưu ý**:
1. ⏰ PR #956 đang tồn tại quá lâu - cần action từ maintainers
2. 📊 Thiếu hoạt động cộng đồng có thể cần monitoring trong vài ngày tới
3. 🔐 Security updates trong Alpine 3.24 nên được ưu tiên

**Khuyến nghị hành động**:
- [ ] Review và merge dependency updates để đảm bảo security
- [ ] Kiểm tra CI/CD pipeline nếu có blockers cho việc merge
- [ ] Cân nhắc thông báo status update nếu dự án đang trong maintenance mode

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo phân tích dự án IronClaw - 2026-09-08

## 🎯 Tóm tắt hôm nay

Dự án IronClaw đang trong giai đoạn cải thiện trải nghiệm người dùng với 5 PR tập trung vào WebUI và khả năng tương tác Slack. Hoạt động chính xoay quanh việc sửa lỗi giao diện slash-command, cải thiện hiển thị kết quả lệnh, và xử lý vấn đề kết nối kênh Slack. Issue #8081 phân tích lỗi benchmark hàng ngày cho thấy team đang theo dõi chặt chẽ chất lượng model.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### Pull Requests đang mở (5 PRs)

**🎨 Nhóm WebUI - Cải thiện trải nghiệm slash-command (4 PRs)**

- **#8071** - Sửa chiều cao card kết quả lệnh
  - Ngăn card kết quả bị co lại trong transcript
  - Cải thiện khả năng cuộn và hiển thị thông tin tích lũy
  - Risk: low | Size: XS

- **#8070** - Căn chỉnh metadata slash-command  
  - Thay thế flex rows bằng responsive grid nhất quán
  - Căn chỉnh tiêu đề và mô tả lệnh trên desktop
  - Xử lý truncation an toàn cho tên lệnh dài
  - Risk: low | Size: XS | Scope: docs

- **#8069** - Thêm nút dismiss cho card kết quả lệnh
  - Cho phép người dùng đóng kết quả tạm thời
  - Giữ nguyên messages chat chính
  - Callback được thread qua Chat → MessageList → MessageBubble
  - Risk: low | Size: M

- **#8068** - Giữ slash-command đang active trong viewport
  - Tự động scroll option được chọn vào tầm nhìn
  - Hỗ trợ cả điều hướng bàn phím và chuột
  - Có coverage test với Chromium standalone
  - Risk: low | Size: S | Scope: docs

**🔗 Tích hợp Slack (1 PR)**

- **#8076** - Phân biệt shared channels bị ngắt kết nối
  - Phân biệt kênh bị ngắt kết nối vs tài khoản chưa pair
  - Hiển thị hướng dẫn cụ thể cho từng kênh
  - Đồng nhất rejection classification trên các surfaces
  - Cập nhật capability checks cho Slack

### 📊 Xu hướng phát triển

- **Focus mạnh vào polish UX**: 4/5 PR đều về cải thiện giao diện người dùng
- **Chú trọng chi tiết**: Các PR size XS-M cho thấy team đang tinh chỉnh từng interaction nhỏ
- **Testing coverage**: Tất cả PRs đều có regression tests
- **Risk management tốt**: Tất cả PRs được đánh giá low risk

---

## 🌟 Điểm nổi bật cộng đồng

**Tương tác thấp**: Chưa có bình luận hoặc reactions trên các PRs và issue trong ngày, cho thấy:
- Team đang trong chu kỳ phát triển tập trung
- Có thể là internal development phase
- Contributors chủ yếu là core team (@italic-jinxin, @be-student)

---

## 🐛 Ổn định & Bugs

### Issue #8081 - Daily failure taxonomy (2026-09-07)

**Phân tích lỗi benchmark officeqa:**
- **42 test cases không pass** trong suite officeqa
- **Root cause chính**: Lỗi numeric quality của model DeepSeek-V4-Flash
- Đây là genuine model-quality errors, không phải infrastructure issues

**Ý nghĩa:**
- Team có quy trình monitoring chất lượng hàng ngày
- Vấn đề nằm ở upstream model, không phải code IronClaw
- Cho thấy commitment với reliability và transparency

### Bugs được fix qua PRs

1. **Layout collapsing** - Card kết quả lệnh bị co lại (#8071)
2. **Navigation UX** - Slash-command options bị mất khỏi viewport (#8068)
3. **Alignment issues** - Metadata không căn chỉnh đồng nhất (#8070)
4. **Missing dismissal** - Không thể đóng kết quả tạm thời (#8069)
5. **Slack connection handling** - Nhầm lẫn giữa disconnected vs unpaired (#8076)

---

## 💡 Yêu cầu tính năng

**Không có feature request mới** trong ngày 2026-09-08. Các PRs hiện tại tập trung vào:
- Cải thiện tính năng slash-command hiện có
- Polish interaction patterns
- Better error handling cho Slack integration

---

## 💬 Phản hồi người dùng

**Không có feedback trực tiếp** từ external users trong dataset. Tuy nhiên, pattern của các fixes cho thấy team đang:
- Phản hồi implicit UX friction (scroll, alignment, dismissal)
- Anticipate user needs (keyboard navigation, responsive design)
- Iterate dựa trên internal testing và usage patterns

---

## 🗺️ Backlog & Roadmap

### Từ PRs đang mở, có thể suy ra:

**Short-term priorities:**
- ✅ Hoàn thiện slash-command UX (4 PRs đang review)
- ✅ Cải thiện Slack integration reliability (1 PR)
- 🔄 Tiếp tục monitor model quality issues

**Potential next steps:**
- Merge các WebUI improvements (đã có test coverage)
- Scale out slash-command functionality
- Address DeepSeek-V4-Flash quality issues (có thể cần upstream collaboration)

**Infrastructure health:**
- Có regression testing cho UI changes
- Có daily benchmark monitoring
- Low-risk deployment strategy

---

## 📌 Kết luận

IronClaw đang trong giai đoạn **refinement và stabilization**. Team core đang methodically polish user experience với các improvements nhỏ nhưng có impact. Việc tracking daily failures cho thấy operational maturity. Cần monitor:
- Timeline merge các WebUI PRs
- Response với model quality issues
- Community engagement khi product mature hơn

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo phân tích QwenPaw - Ngày 08/09/2026

## 📋 Tóm tắt hôm nay

Dự án QwenPaw tiếp tục duy trì tốc độ phát triển cao với **23 issues** và **47 PRs** đang hoạt động. Ngày hôm nay tập trung vào ba hướng chính: **tái cấu trúc hệ thống memory** (chuyển ADBPG và PowerContext thành plugins), **cải thiện UX Console** (redesign sidebar, BiDi text rendering), và **xử lý các vấn đề tích hợp provider** (OpenCode Go, Volcengine, tool calling bugs). Đáng chú ý là nhiều first-time contributors tham gia, cho thấy cộng đồng đang mở rộng.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua. Tuy nhiên, từ các PR đã merge, có thể thấy đội ngũ đang chuẩn bị cho bản **v2.2.1** với các cải tiến:
- Sửa lỗi context compression với DeepSeek (#6541 đã đóng)
- Cải thiện icon consistency (#7499 đã merge)
- Mở rộng test coverage (+245 test cases, +5.02% coverage qua #7530)

---

## 🔧 Tiến độ dự án

### **PRs quan trọng đang review:**

#### 🏗️ **Kiến trúc & Refactoring**
- **#7616** - **[Critical] Migrate ADBPG & PowerContext to plugins**: Tách memory backends ra khỏi core, chuyển thành plugin độc lập. Đây là bước quan trọng giúp QwenPaw modular hơn.
- **#7561** - **Unify automatic memory lifecycle**: Đã merge, chuẩn hóa cách memory manager xử lý capture/recall/actions.
- **#7606** - **Prepare Auto-Dream for ReMe 0.4.1.12**: Cập nhật tích hợp với ReMe library, loại bỏ topic extraction deprecated.

#### 🎨 **UX & Console Improvements**
- **#7502** - **Redesign sidebar and settings**: Redesign toàn diện sidebar Console, giữ plugin slots, cải thiện navigation.
- **#7611** - **Fix BiDi text rendering** (#2120): Sửa lỗi hiển thị văn bản Ả Rập/tiếng Do Thái khi trộn với tiếng Anh - vấn đề tồn đọng từ tháng 3.
- **#7593** - **Restore direct path input**: Đã merge, khôi phục tính năng paste trực tiếp đường dẫn working directory (người dùng phàn nàn ở #7588).

#### 🔐 **Security & Execution**
- **#7526** - **Protected execution contract**: Thêm contract bảo mật trước khi thực thi workspace prompt files, tách guidance ra khỏi dynamic context.
- **#7497** - **Deny sensitive paths in OFF mode**: Sửa lỗi bypass governance khi ở chế độ OFF - tool vẫn có thể truy cập đường dẫn nhạy cảm.

#### 🤖 **Agent Modes**
- **#7569** - **Advisor Mode**: Tính năng mới - một "advisor model" mạnh hơn hướng dẫn "worker agent" (model rẻ hơn), có opening plan và reflection.

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues được quan tâm nhất:**

1. **#7576** [5 comments] - **Bug critical về context_size hardcoded**: `RetryChatModel` hardcode fallback 32768 tokens, gây lỗi `CONTEXT_UNFIT` cho mọi model khác. Ảnh hưởng v2.1.0→v2.2.0.

2. **#7579** [5 comments] - **模型回复从上下文丢失**: Assistant reply bị lưu vào DB nhưng mất khỏi context trong request tiếp theo - model "không nhớ vừa nói gì".

3. **#7597** [4 comments] - **Tool binary image gây 400 error**: Khi tool trả về image/PDF binary dạng base64, API Zhipu GLM trả lỗi `file must have a file_id`.

4. **#7589** [3 comments] - **Heartbeat feedback loop**: Heartbeat cron tạo duplicate messages, agent unresponsive ~2h. Đã verify trên cả v2.0.1 và main branch.

### **Người dùng Trung Quốc chiếm đa số**
Hơn 60% issues/comments bằng tiếng Trung, phản ánh user base chính ở Trung Quốc. Các vấn đề UX (working directory picker #7588, #7601) nhận phản hồi nhanh.

---

## 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng đang xử lý:**

| Issue | Mức độ | Trạng thái | Ảnh hưởng |
|-------|--------|-----------|-----------|
| #7576 | 🔴 Critical | Open | Context size hardcoded → tất cả models fail |
| #7579 | 🔴 Critical | Open | Assistant replies mất khỏi context → conversation broken |
| #7597 | 🟡 High | Open | Tool binary images gây 400 error với Zhipu GLM |
| #7589 | 🟡 High | Open | Heartbeat loop → agent unresponsive 2h |
| #7604 | 🟢 Medium | Closed (merged) | LLM stream timeout không config được qua Desktop UI |

### **Bugs đã giải quyết trong 24h:**
- ✅ #6541 - Scroll context compression với DeepSeek (role=user thay vì system)
- ✅ #6839 - MCP tool args type coercion (string→number)
- ✅ #7604 - Stream timeout hardcoded (thêm env config)

### **Pattern nhận thấy:**
- **Provider integration issues** đang tăng: OpenCode Go (#7599, #7602), Zhipu GLM (#7617), DeepSeek (#6541)
- **Context management bugs** (scroll, memory, persistence) chiếm ~30% issues mới

---

## 💡 Yêu cầu tính năng

### **Tính năng mới đang được phát triển:**

1. **Advisor Mode** (#7569): Dual-model collaboration - advisor model hướng dẫn worker agent. Status: PR đang review.

2. **Per-session model overrides** (#5992): Cho phép override model theo từng conversation, không ảnh hưởng default. First-time contributor.

3. **Reranker UI** (#6399): Panel config reranker trong Agent Config → ReMeLightMemoryCard. Đang Under Review.

4. **Traffic Light indicator** (#7600): Visual indicator cho status agent (đang xử lý/chờ user response). Community feedback tích cực.

### **Yêu cầu từ người dùng:**

- **OpenCode Go first-class provider** (#7602): Hiện phải dùng custom OpenAI-compatible provider, gây lỗi MissingSessionID. Đã close (likely merged).

- **DingTalk interactive card callbacks** (#7608): Stream mode không subscribe card callback topic → user interactions không hoạt động.

- **Plugin update detection** (#7605): Phát hiện updates từ official/community marketplace, "Update All" button.

---

## 💬 Phản hồi người dùng

### **Phản hồi tích cực:**
- ✅ Direct path input được khôi phục nhanh (#7593 merged trong <24h sau khi user report #7588)
- ✅ Icon consistency fix được đánh giá cao (#7499)
- ✅ BiDi text rendering fix sau 6 tháng (#2120 → #7611)

### **Phàn nàn chính:**
- ❌ **Working directory picker UX tệ** (#7588, #7601): v2.2.0 xóa tính năng paste path, chỉ giữ graphical picker → khó dùng với deep directories
- ❌ **OpenCode Go integration phức tạp** (#7599, #7602): Cần manual workaround, thiếu x-opencode-session header
- ❌ **Desktop không config được stream timeout** (#7604): Hardcoded 30s, không expose qua WebUI/envs.json

### **Pain points kỹ thuật:**
- **Windows ACP agent hangs** (#7401): Bootstrap plugins chạy sync → freeze event loop minutes
- **Computer Use helper TCC cache** (#7614): macOS không detect permission changes khi helper đã chạy
- **SQLite FTS corruption** (#7596): Scroll history.db FTS index corrupt, integrity check không phát hiện

---

## 📅 Backlog & Roadmap

### **Đang trong pipeline (từ PRs):**

#### **Q3 2026 - Stabilization & Plugin Ecosystem**
- ✅ Memory backend plugin migration (#7616) - **In Progress**
- ✅ Console redesign (#7502) - **In Progress**  
- ✅ Protected execution contract (#7526) - **Under Review**
- 🔜 OpenViking long-term memory backend (#7613)
- 🔜 Skill versioning & dependency validation (#7609)

#### **Q4 2026 - Advanced Features (dự kiến)**
- Advisor Mode rollout (#7569)
- Per-session model overrides (#5992)
- Creator 1.1.2 features (#7486): T2V/I2V/S2V scheduling, async delegation
- Volcengine Agent Plan & MiMo V2.5 providers (#6515)

### **Technical debt priorities:**
1. **Context management** - Scroll compression, memory persistence bugs
2. **Provider compatibility** - OpenAI-compatible API edge cases
3. **Windows platform** - ACP hangs, shell stdin inheritance
4. **E2E test coverage** - Re-anchor after UI component rebuilds

---

## 🎯 Kết luận

QwenPaw đang trong giai đoạn **maturation** với focus vào:
- **Architecture refactoring** (plugin system)
- **UX polish** (Console redesign, BiDi support)
- **Stability** (context/memory bugs, provider compatibility)

Cộng đồng đang phát triển với nhiều first-time contributors, nhưng vẫn cần cải thiện:
- Tốc độ fix critical bugs (context size, memory persistence)
- Provider integration testing (OpenCode Go, Zhipu GLM)
- Windows platform stability

**Recommendation**: Team nên ưu tiên hotfix cho #7576 (context hardcoded) và #7579 (memory loss) trước khi release v2.2.1.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*