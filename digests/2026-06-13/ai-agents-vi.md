# Bản tin Hệ sinh thái OpenClaw 2026-06-13

> Issues: 274 | PRs: 486 | Dự án: 11 | Thời gian tạo: 2026-06-13 02:00 UTC

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

# Báo cáo phân tích OpenClaw - 2026-06-13

## 📊 Tóm tắt hôm nay

OpenClaw đang trải qua một đợt tăng cường bảo mật lớn với việc phát hành v2026.6.6, đồng thời giải quyết các vấn đề nghiêm trọng về memory leak và session management. Cộng đồng tập trung vào việc ổn định hệ thống plugin, cải thiện trải nghiệm đa kênh (Telegram, Discord, Slack), và xử lý các edge case trong multi-agent workflows. Có 486 PR đang hoạt động với nhiều cải tiến về ClawHub plugin validation, QA automation, và provider compatibility.

---

## 🚀 Releases

### **v2026.6.6** & **v2026.6.6-beta.2** (2026-06-12)

**Điểm nhấn chính: Đợt tăng cường bảo mật toàn diện**

#### Các cải tiến bảo mật:
- 🔒 **Transcript isolation**: Tăng cường phân tách quyền truy cập transcript giữa các session
- 🐳 **Sandbox boundaries**: Cải thiện cách Docker sandbox bind và kế thừa host environment variables
- 🔌 **MCP stdio security**: Tăng cường kiểm soát Model Context Protocol stdio access
- 🌐 **Codex HTTP access**: Hạn chế quyền truy cập HTTP từ Codex execution server
- 🔍 **Native search policy**: Chính sách nghiêm ngặt hơn cho native search tools
- 👤 **Elevated sender checks**: Xác thực chặt chẽ hơn cho các sender có quyền cao
- ⚠️ **Exec approval timeout**: Thay đổi từ "allow on timeout" sang "fail closed on timeout"
- 🚫 **Deleted-agent ACP bypass fixes**: Đóng lỗ hổng access control khi agent bị xóa
- 🛡️ **Discord moderation & Teams group actions**: Tăng cường kiểm soát quyền hạn

**Ý nghĩa**: Đây là một bản cập nhật bảo mật quan trọng, cho thấy OpenClaw đang chuyển sang mô hình "security by default" với nhiều ranh giới bảo mật được thắt chặt. Đặc biệt quan trọng cho các môi trường production và enterprise.

---

## 📈 Tiến độ dự án

### **Xu hướng phát triển chính**

#### 1️⃣ **Plugin Ecosystem Maturation**
- **#92557** 🔧 Validate ClawHub plugin metadata in PRs
  - Thêm CI validation cho ClawHub plugin packages
  - Đảm bảo metadata quality trước khi publish
  - Sử dụng pinned `clawhub@0.21.0` package

- **#92311** 📦 Split plugin ClawHub publishing paths
  - Tách riêng OIDC release path và protected token bootstrap
  - Tăng cường bảo mật cho first-publish packages
  - Cải thiện trusted publisher workflow

**Insight**: OpenClaw đang xây dựng hệ sinh thái plugin chuyên nghiệp với CI/CD pipeline chặt chẽ, chuẩn bị cho việc mở rộng marketplace.

#### 2️⃣ **Multi-Agent & Session Management Improvements**
- **#92433** 🐛 Subagent completion silently dropped (P1)
  - Vấn đề nghiêm trọng: completion announce bị drop khi requester run kết thúc sớm
  - Liên quan đến `maybeSteerSubagentAnnounce` race condition
  
- **#90840** 🐛 Subagent output delivered to wrong target (P1)
  - Raw worker output leak ra chat user thay vì chỉ gửi về parent agent
  - Ảnh hưởng đến QQBot và các messaging platforms

- **#90231** 🔄 Fix subagent RPC callback routing to WeChat
  - Callback không route đúng về original session key
  - Falls back incorrectly to `agent:main:main`

**Insight**: Multi-agent orchestration vẫn còn nhiều edge cases, đặc biệt trong messaging workflows phức tạp.

#### 3️⃣ **Provider Compatibility & LLM Integration**
- **#92396** 🌙 Fix Moonshot/Kimi reasoning_content 400 error (CLOSED)
  - Backfill `reasoning_content` cho assistant tool-call replay messages
  - Xử lý long sessions sau LCM compaction
  
- **#92565** 💎 Enable DeepSeek prompt cache key
  - DeepSeek models thiếu `supportsPromptCacheKey: true`
  - Prompt caching silently fails

- **#38327** 🤖 Google Vertex Gemini "Cannot convert undefined to object"
  - Regression trong 2026.3.2 với google-vertex/gemini-3.1-pro-preview

**Insight**: OpenClaw đang mở rộng hỗ trợ nhiều providers (Moonshot, DeepSeek, Google Vertex) nhưng gặp phải compatibility challenges với các LLM providers mới.

#### 4️⃣ **Memory Management & Performance**
- **#91588** 🔥 **Critical: Gateway Memory Leak** (P0 - highest priority)
  - RSS grows từ 350MB → 15.5GB trong 2-3 ngày
  - Gây OOM crashes và restart cycles
  - **Tác động nghiêm trọng**: Production environments không thể duy trì uptime dài

- **#92043** ⏱️ 180s compaction timeout causes identical failures
  - Timeout quá ngắn cho long history summarization
  - Không có partial-progress reuse

**Insight**: Memory leak là vấn đề P0 nghiêm trọng nhất hiện tại, cần được ưu tiên giải quyết ngay lập tức.

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác nhất**

#### 🔥 **Top Security & Core Issues**

1. **#25592** (32 comments, 🦞 diamond lobster)
   - **Text between tool calls leaks to channels**
   - Internal processing output xuất hiện trong Slack/iMessage
   - Gây confusion và UX problem nghiêm trọng
   - Related PR: đang open

2. **#18160** (13 comments, 11 👍)
   - **Direct Exec Mode for Cron Jobs**
   - Hiện tại cron jobs phải qua `agentTurn` → chậm, timeout thường xuyên
   - Community muốn direct command execution mode
   - **High demand feature**: 11 upvotes

3. **#6615** (7 comments, 7 👍)
   - **Denylist support for exec-approvals**
   - Hiện chỉ có allowlist, cần "allow all except X" policies
   - Use case: block dangerous commands (gmail send, rm -rf)

#### 📱 **Multi-Channel Integration Challenges**

4. **#32473** (17 comments, 5 👍) - Control UI requires HTTPS/localhost for device identity
5. **#27445** (10 comments, 5 👍) - `announceTarget` option for sub-agent routing
6. **#20786** (8 comments, 6 👍) - Telegram Business Bot support
7. **#34528** (6 comments) - Feishu reaction message_id causes 400 errors

**Insight**: Người dùng gặp nhiều vấn đề với security context (HTTPS requirements) và cross-channel message routing, đặc biệt trong enterprise environments (Feishu, Telegram Business).

---

## 🐛 Ổn định & Bugs

### **Critical Issues (P0-P1)**

#### 🔴 **P0: Production-Breaking**
- **#91588** - Gateway memory leak 350MB→15.5GB (9 comments)
  - Highest severity, affects all long-running deployments
  - No PR yet assigned

#### 🟠 **P1: High Priority**

**Session & Multi-Agent**:
- **#92433** - Subagent completion dropped in race condition (5 comments)
- **#90840** - Subagent output leaks to wrong chat target (5 comments)
- **#22676** - Signal daemon SIGUSR1 restart race (17 comments)
- **#92043** - 180s compaction timeout too aggressive (7 comments)

**Authentication & Providers**:
- **#38327** - Google Vertex Gemini conversion error (7 comments)
- **#71491** - Kimi K2.6 reasoning_content 400 after compaction (9 comments, CLOSED)
- **#31583** - Exec tool doesn't inherit skill env vars (12 comments)

**Channel Integration**:
- **#74484** - Gateway pairing scope deadlock (12 comments)
- **#38091** - OpenClaw UI WebSocket reconnect terminates sessions (5 comments)

### **Security-Critical**

- **#25592** (P1) - Tool call text leaks to messaging channels
- **#29736** (P1) - Exec approvals ignores state root, writes to ~/.openclaw
- **#37634** (P1) - Sandbox with `workspaceAccess: none` mounts read-only

**Insight**: Security boundaries vẫn có nhiều gaps (text leaks, path confusion, mount permissions). Memory leak là bottleneck lớn nhất cho production adoption.

---

## 💡 Yêu cầu tính năng

### **High-Demand Features**

#### 🎯 **Workflow & Automation** (nhiều upvotes nhất)

1. **#18160** (11 👍) - Direct Exec Mode for Cron Jobs
   - Bypass LLM interpretation cho simple commands
   - Giảm latency và tăng reliability

2. **#6615** (7 👍) - Denylist support for exec-approvals
   - "Allow everything except dangerous commands"
   - Essential cho security policies

3. **#37634** (6 👍) - Keep workspace writable in sandbox isolation mode
   - Hiện tại `workspaceAccess: none` → read-only workspace
   - Tools cần write access vẫn bị block

#### 🔧 **Developer Experience**

4. **#22438** (17 comments) - Tiered bootstrap file loading
   - Control context budget: load files by priority tiers
   - Giảm token waste trong sub-agents và cron jobs

5. **#14785** (7 comments) - Reduce tool schema overhead (~3,500 tokens/session)
   - Mỗi session load full JSON schemas → fixed 3,500 token tax
   - Cần lazy loading hoặc compression

6. **#13583** (11 comments) - Pre-response enforcement hooks (hard gates)
   - Soft prompt rules → hard mechanical gates
   - Critical cho finance/security workflows

#### 🤖 **AI & Model Features**

7. **#17925** (5 comments, 5 👍) - Native web_search for ZAI/Google providers
   - Giống xAI Grok passthrough
   - Request cho GLM và Gemini

8. **#23353** (5 comments) - Anthropic native server-side tools
   - web_search, web_fetch, code_execution
   - Chạy trên Anthropic infrastructure

9. **#33962** (5 comments, 3 👍) - Use lightweight model for slug generation
   - Hiện dùng primary model cho trivial 2-word task
   - Gây lane congestion

#### 📊 **Observability & Control**

10. **#38626** (6 comments) - Subagent lifecycle observability
    - Async supervision controls
    - Timeline, errors, artifacts tracking

11. **#22358** (12 comments) - Post-subagent completion hook
    - Auto-generate trajectory files
    - Task → decisions → retrospective

**Insight**: Community priorities: (1) Security policies, (2) Token efficiency, (3) Workflow reliability, (4) Multi-model support.

---

## 💬 Phản hồi người dùng

### **Pain Points chính**

#### 🔴 **Production Stability**
- Memory leak (#91588) khiến người dùng phải restart gateway mỗi 2-3 ngày
- WebSocket reconnect issues (#38091) làm gián đoạn sessions
- Subagent race conditions (#92433, #90840) gây message loss

#### 🟡 **Configuration Complexity**
- **#16670** - Onboarding wizard không mention memory/embedding setup
  - Memory là killer feature nhưng không có trong guided setup
  - Người dùng mới không biết configure `memorySearch`

- **#32473** - HTTPS/localhost requirements gây confusion
  - VPS setups trên Hostinger gặp "requires secure context" errors
  - Thiếu docs về certificate setup

#### 🟢 **Feature Gaps**
- **#20786** - Telegram Business Bot chưa support
  - `business_message` updates không được receive
  - Blocking cho business use cases

- **#33102** - TUI `--deliver` flag defaults confusing
  - Mặc định không print replies → người dùng nghĩ agent đang broken
  - Cần config để set default

### **Positive Signals**

- **#61187** - Model picker improvements được merge
  - Kimi và Moonshot models giờ show correctly
  - Works even without API key

- **#88446** - Codex plan controls coming soon
  - `/codex plan`, `/codex think plan|execute`
  - Channel-specific controls

**Insight**: Người dùng đánh giá cao tính năng core (memory, multi-agent) nhưng bị block bởi stability issues và configuration UX. Documentation gaps rất rõ ràng.

---

## 📋 Backlog & Roadmap

### **Active Development Tracks**

#### 🚧 **Infrastructure & Platform**

**QA & Testing** (high activity):
- **#92550** - Fold Telegram RTT sampling into live QA
- **#92558** - Simplify QA scorecard mapping shape
- **#92557** - Validate ClawHub plugin metadata in PRs

**Build & CI**:
- **#92311** - Split plugin ClawHub publishing paths (OIDC vs bootstrap)
- **#81957** - Harden GitHub Actions supply-chain boundaries

#### 🔧 **Core Engine**

**Memory & Performance**:
- **#77158** - QMD persistent export-state cache (4,052 session files / 158MB optimization)
- **#91588** - Fix critical memory leak (P0, unassigned)

**Session Management**:
- **#89039** - Prevent message loss from EmbeddedAttemptSessionTakeoverError
- **#92422** - Fix isolated cron runs yielded status

**Providers**:
- **#92565** - DeepSeek prompt cache enablement
- **#92564** - Isolate invalid plugin model catalogs

#### 🎨 **UX & Features**

**Codex Integration**:
- **#88446** - Bound chat plan controls (`/codex plan`, mode switching)
- **#90610** - Surface final answer candidates in activity

**Multi-Channel**:
- **#90231** - Fix WeChat subagent callback routing
- **#92394** - Fix webchat empty senderLabel fallback

### **Upcoming (inferred from issues)**

#### Q3 2026 Priorities (predicted):
1. ✅ Memory leak resolution (P0)
2. 🔒 Complete security boundary audit
3. 🤖 Expand provider support (DeepSeek, ZAI, Google stable)
4. 📊 Enhanced observability for multi-agent workflows
5. 📚 Documentation overhaul (onboarding, security policies)

#### Feature Requests Likely for Roadmap:
- Direct exec mode for cron (#18160 - 11 👍)
- Denylist exec approvals (#6615 - 7 👍)
- Tiered bootstrap loading (#22438)
- Pre-response enforcement hooks (#13583)
- Telegram Business support (#20786)

**Insight**: OpenClaw đang trong giai đoạn "stabilization before expansion" - tập trung fix critical bugs và tăng cường bảo mật trước khi thêm tính năng mới. Plugin ecosystem đang được chuẩn hóa để scale.

---

## 🎯 Kết luận

**Trạng thái hiện tại**: OpenClaw đang ở điểm chuyển giao quan trọng - từ MVP sang production-ready platform. Release v2026.6.6 đánh dấu sự chú trọng vào bảo mật và reliability.

**Cơ hội**: 
- Plugin ecosystem đang mature
- Multi-agent capabilities leading trong ngành
- Strong community engagement (274 open issues, 486 PRs)

**Rủi ro**:
- Memory leak (P0) có thể ảnh hưởng adoption
- Configuration complexity tạo rào cản entry
- Multi-channel integration stability cần cải thiện

**Recommend watch**: Issues #91588 (memory leak), #92433 (subagent race), và PR #92311 (plugin publishing) để theo dõi critical fixes.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 13/06/2026

## 1. 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trải qua giai đoạn **consolidation và maturation** sau một năm phát triển bùng nổ. Các dự án chuyển từ "feature race" sang tập trung vào **stability, security, và production-readiness**. Có 3 xu hướng rõ rệt:

### 📈 Giai đoạn phát triển
- **Mature platforms** (OpenClaw, Hermes-Agent): Tập trung bảo mật, memory leak fixes, multi-agent orchestration
- **Emerging projects** (PicoClaw, NanoClaw): Hoàn thiện protocol, cải thiện developer experience
- **Niche players** (Moltis, GoClaw): Tìm kiếm differentiation với tính năng đặc thù

### 🔥 Hoạt động trong 24h
- **Total PRs**: 261 (avg 29 PRs/project)
- **Total Issues**: 346 (avg 38 issues/project)
- **Releases**: 3 projects phát hành (OpenClaw, PicoClaw, LobsterAI)
- **Security focus**: 15+ security-related PRs/issues across projects

---

## 2. 📊 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Mức độ tương tác | Giai đoạn | Điểm nổi bật |
|-------|--------|-----|----------|------------------|-----------|--------------|
| **OpenClaw** | 274 | 486 | 2 | ⭐⭐⭐⭐⭐ | Mature | v2026.6.6 security surge, memory leak crisis |
| **Hermes-Agent** | 9 | 50 | 0 | ⭐⭐⭐⭐ | Mature | Desktop perf 2x, platform adapter fixes |
| **IronClaw** | 12 | 50 | 0 | ⭐⭐⭐⭐ | Growth | Messaging pivot, attachment foundation |
| **Zeroclaw** | 14 | 33 | 0 | ⭐⭐⭐ | Growth | Engine consolidation, v0.8.0 closed |
| **NanoBot** | 6 | 30 | 0 | ⭐⭐⭐ | Growth | Memory loss fixes, multi-PR attack |
| **CoPaw** | 23 | 27 | 0 | ⭐⭐⭐ | Growth | AgentScope 2.0 prep, Win stability |
| **LobsterAI** | 1 | 17 | 0 | ⭐⭐ | Stable | Computer Use MVP, stale PR cleanup |
| **PicoClaw** | 6 | 14 | 1 | ⭐⭐ | Emerging | Media routing fixes, lifecycle signals |
| **NanoClaw** | 5 | 9 | 0 | ⭐⭐ | Emerging | Container hardening, journal recovery |
| **GoClaw** | 8 | 2 | 0 | ⭐ | Early | Security audit (7 vulns), UX polish |
| **Moltis** | 3 | 0 | 0 | ⭐ | Early | K8s sandbox proposal, voice STT |

**Chú thích**:
- ⭐⭐⭐⭐⭐ = Extremely active (>200 items)
- ⭐⭐⭐⭐ = Very active (40-100 items)
- ⭐⭐⭐ = Active (20-40 items)
- ⭐⭐ = Moderate (10-20 items)
- ⭐ = Low (<10 items)

---

## 3. 🎯 Vị thế của OpenClaw

### 🏆 Vai trò: **Industry Leader & Reference Implementation**

OpenClaw đang giữ vị trí **dominant** trong hệ sinh thái với các chỉ số vượt trội:

#### Điểm mạnh chiến lược:

**1. Scale & Momentum** 📊
- 486 PRs + 274 issues = **760 hoạt động** (gấp 2-3 lần đối thủ gần nhất)
- Community velocity cao nhất: 11 upvotes cho feature requests
- Plugin ecosystem maturation với ClawHub validation

**2. Security-First Posture** 🔒
- v2026.6.6 release với 9+ security hardening features
- Đầu tiên chuyển sang "fail closed" model cho timeouts
- Transcript isolation, sandbox boundaries, elevated sender checks

**3. Production Battle-Tested** ⚙️
- Xử lý critical P0 bugs (memory leak 15.5GB)
- Sophisticated multi-agent orchestration
- Enterprise-grade session management

**4. Developer Ecosystem** 🛠️
- ClawHub plugin registry với CI/CD pipeline
- Comprehensive tooling (QA automation, scorecard mapping)
- Provider compatibility breadth (Moonshot, DeepSeek, Google Vertex)

#### Thách thức:

**1. Technical Debt** ⚠️
- Memory leak (#91588) là bottleneck adoption nghiêm trọng
- Multi-agent race conditions chưa giải quyết triệt để
- Configuration complexity tạo rào cản entry

**2. Stability vs Innovation Balance** ⚖️
- Silent failure patterns (#25592, #92506)
- Authorization gaps trong channels
- Documentation lag behind features

### 🎪 So sánh với đối thủ chính:

| Tiêu chí | OpenClaw | Hermes-Agent | IronClaw | Zeroclaw |
|----------|----------|--------------|----------|----------|
| **Community size** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Enterprise readiness** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Developer experience** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Innovation speed** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Security posture** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

**Verdict**: OpenClaw dẫn đầu về **scale và security**, nhưng Hermes-Agent vượt trội về **developer experience** và IronClaw sáng tạo hơn về **architecture patterns**.

---

## 4. 🔬 Hướng Kỹ thuật Chung

### 🎯 Convergence Patterns

Các dự án đang hội tụ về một số giải pháp kỹ thuật chung:

#### A. **Multi-Agent Orchestration** 🤖🤖

**Tất cả các dự án lớn đang xây dựng subagent capabilities:**

- **OpenClaw**: Steering state, subagent completion routing (#92433, #90840)
- **Hermes-Agent**: Delegation models, model override cho subagents (#45301, #44906)
- **IronClaw**: Thread messaging với defer-drain → rejection pivot (#4838)
- **CoPaw/QwenPaw**: Agent Team/Swarm collaboration requests (#5139)
- **NanoBot**: Subagent context management improvements

**Insight**: Multi-agent là **table stakes** cho AI agent frameworks. Pattern phổ biến:
- Parent-child delegation với isolated contexts
- Model selection flexibility per agent
- Completion routing và error propagation

#### B. **Memory Architecture** 🧠

**Phân tán giữa 2 trường phái:**

**1. Context Window Optimization**
- **OpenClaw**: LCM compaction, 180s timeout (#92043)
- **NanoBot**: Consolidation cursor fixes, Dream memory (#4321, #4280)
- **PicoClaw**: Memory search tool improvements (#5154)

**2. Long-term Persistent Memory**
- **Hermes-Agent**: Human-like memory layers (#44897)
- **NanoClaw**: Persistent memory scaffold (#2745)
- **IronClaw**: Trajectory observer + recording (#4773, #4588)

**Insight**: Ngành đang chuyển từ "compress everything" sang **hierarchical memory** (working memory + semantic store + episode tracking).

#### C. **Security Hardening** 🔐

**Security đã trở thành P0 concern:**

**Sandbox Isolation:**
- **OpenClaw**: Container cap-drop, no-new-privileges, Docker boundaries
- **NanoClaw**: Cap-drop ALL, pids-limit, no-new-privileges (#2748)
- **GoClaw**: 7 exec approval bypass vulns được phát hiện (#1213-1218)
- **Hermes-Agent**: SSRF guard cho save_url_image (#44743)

**Authorization Models:**
- **OpenClaw**: Elevated sender checks, deleted-agent ACP bypass fixes
- **IronClaw**: Cross-agent authorization audit (#4217)
- **PicoClaw**: Channel-level permission scoping (#3114)

**Insight**: Ngành đang học từ các incident thực tế. Defense-in-depth đang thay thế trust-by-default.

#### D. **Platform Integration Complexity** 📱

**Messaging platforms là battlefield mới:**

Tất cả dự án đang mở rộng sang:
- Telegram (forums, business bots)
- WhatsApp (media forwarding, reactions)
- Discord (slash commands, dynamic skills)
- Slack (workspace states, OAuth flows)
- Feishu/Lark (card streaming, group messages)
- WeChat, QQ, DingTalk (Chinese market)

**Challenges chung:**
- Reply routing trong threads/topics
- Media attachment handling
- Reaction/emoji support
- Bot presence và typing indicators
- Approval flows trong group contexts

**Insight**: Multi-channel support là **competitive moat**, nhưng mỗi platform có quirks riêng. Abstraction layer đang trở nên cần thiết.

#### E. **Observability & Debugging** 🔍

**Production deployments đòi hỏi better tooling:**

- **OpenClaw**: QA automation, Langfuse integration
- **IronClaw**: HQ harness, trajectory recording
- **Hermes-Agent**: Evidence dashboard (#45305)
- **NanoClaw**: Audit system cho tool invocations (#4320)
- **CoPaw**: Token usage tracking per-turn (#5130)

**Patterns xuất hiện:**
- Structured logging với trace IDs
- Session replay capabilities
- Cost tracking và budgeting
- Performance profiling (FPS, TTFT)

---

## 5. 🎭 Điểm Khác biệt

### 🏅 Chiến lược Differentiation

#### **OpenClaw: Enterprise-Grade Orchestrator**
```
Focus: Security, Scale, Plugin Ecosystem
Moat: ClawHub marketplace, comprehensive provider support
Trade-off: Complexity in exchange for power
```

**Unique strengths:**
- Most mature plugin architecture
- Broadest LLM provider support
- Enterprise security features first
- Largest community

**Target audience**: Enterprises, power users, integration-heavy workflows

---

#### **Hermes-Agent: Developer Experience Champion**
```
Focus: DX, Performance, Cross-platform
Moat: Desktop app UX, memory architecture innovations
Trade-off: Feature breadth for polish
```

**Unique strengths:**
- 2x desktop performance improvements (56 FPS)
- Sophisticated memory layers (working/semantic/episode)
- Best Windows compatibility
- Nostr protocol support (decentralization)

**Target audience**: Desktop power users, privacy advocates, solo developers

---

#### **IronClaw: Architecture Innovator**
```
Focus: Modularity, Clean Design, Observability
Moat: Reborn architecture, trajectory observability
Trade-off: Breaking changes for better foundations
```

**Unique strengths:**
- Willingness to pivot (defer-drain → rejection)
- Systematic layering (attachments track)
- HQ harness for quality assurance
- Disciplined refactoring culture

**Target audience**: Engineering teams valuing clean architecture

---

#### **Zeroclaw: Production Simplicity**
```
Focus: Stability, Unified Engine, Cross-platform
Moat: Single turn engine, Kubernetes-ready
Trade-off: Innovation speed for reliability
```

**Unique strengths:**
- 3-engine consolidation → 1 engine (#7540)
- Strong Rust foundations
- Multi-platform polish (Windows ZIP, Docker g++)
- Dynamic Discord skills (#7490)

**Target audience**: DevOps teams, Kubernetes users

---

#### **NanoBot/PicoClaw: Lightweight Contenders**
```
Focus: Simplicity, Quick Deployment, Resource Efficiency
Moat: Lower barrier to entry
Trade-off: Feature set for accessibility
```

**Unique strengths:**
- Faster onboarding
- Lighter resource footprint
- Fewer dependencies
- Good for learning/prototyping

**Target audience**: Hobbyists, learners, resource-constrained environments

---

#### **CoPaw (QwenPaw): Chinese Market Leader**
```
Focus: Localization, Chinese LLMs, Mobile-first
Moat: Kimi/Qwen/GLM native support, Yuanbao/Feishu
Trade-off: Global features for local depth
```

**Unique strengths:**
- Best Kimi/Moonshot/DeepSeek integration
- Native Feishu/DingTalk/WeChat support
- Chinese language UX
- AgentScope 2.0 migration planned

**Target audience**: Chinese market, Alibaba/ByteDance ecosystems

---

### 🆚 Competitive Positioning Matrix

```
                 Innovation
                     ↑
        IronClaw    |    Hermes-Agent
                    |
    Complexity ←----+----→ Simplicity
                    |
        OpenClaw    |    NanoBot/PicoClaw
                    ↓
                 Stability
```

**Quadrant Analysis:**

1. **Innovation + Complexity**: IronClaw - Breaking changes for better architecture
2. **Innovation + Simplicity**: Hermes-Agent - Performance without bloat
3. **Stability + Complexity**: OpenClaw - Enterprise-grade, battle-tested
4. **Stability + Simplicity**: NanoBot/PicoClaw - Just works™

---

## 6. 🌱 Mức độ Trưởng thành Cộng đồng

### 📊 Maturity Assessment

| Dự án | Cộng đồng | Governance | Contribution | Documentation | Ecosystem |
|-------|-----------|------------|--------------|---------------|-----------|
| **OpenClaw** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Hermes-Agent** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **IronClaw** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Zeroclaw** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **CoPaw** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **NanoBot** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **LobsterAI** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **PicoClaw** | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ |
| **NanoClaw** | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |
| **GoClaw** | ⭐ | ⭐ | ⭐⭐ | ⭐ | ⭐ |
| **Moltis** | ⭐ | ⭐ | ⭐ | ⭐ | ⭐ |

### 🔍 Deep Dive Analysis

#### **Tier 1: Established Communities** 🏆

**OpenClaw**
- **Strengths**: Largest contributor base, plugin ecosystem, systematic QA
- **Weaknesses**: Documentation lag, high complexity barrier
- **Health**: Excellent - 11 upvotes on features, 32 comments on critical bugs
- **Trajectory**: Consolidating market lead

**Hermes-Agent**
- **Strengths**: Active bug reporting with detailed reproduction, cross-platform focus
- **Weaknesses**: Configuration complexity, docs discovery via code reading
- **Health**: Very good - responsive to UX feedback
- **Trajectory**: Rapid improvement phase

**IronClaw**
- **Strengths**: Disciplined architecture, coordinated disclosure practices
- **Weaknesses**: Smaller contributor pool, fewer integrations
- **Health**: Good - quality over quantity
- **Trajectory**: Building strong foundations

---

#### **Tier 2: Growing Communities** 🌱

**Zeroclaw**
- **Strengths**: Repeat contributors tackling systematic issues
- **Weaknesses**: Windows/macOS onboarding friction
- **Health**: Good - healthy contribution patterns
- **Trajectory**: Platform stability focus

**CoPaw (QwenPaw)**
- **Strengths**: Fast bug response (11 PRs closed/day), active QA tester
- **Weaknesses**: Regression concerns, breaking changes ahead
- **Health**: Mixed - high velocity but stability issues
- **Trajectory**: Preparing for major migration (AS 2.0)

**NanoBot**
- **Strengths**: Multi-PR coordinated attack on memory issues
- **Weaknesses**: Limited external contributions
- **Health**: Fair - focused but small team
- **Trajectory**: Intensive stabilization

---

#### **Tier 3: Emerging Communities** 🌾

**LobsterAI, PicoClaw, NanoClaw**
- **Strengths**: Feature innovation, niche focuses
- **Weaknesses**: Low external engagement, stale PRs (LobsterAI)
- **Health**: Fair to poor - need community building
- **Trajectory**: Searching for product-market fit

**GoClaw**
- **Strengths**: Security researcher engagement (coordinated disclosure)
- **Weaknesses**: Very low activity outside security audit
- **Health**: Concerning - 7 critical vulns, minimal team response
- **Trajectory**: Crisis mode → must address security

**Moltis**
- **Strengths**: High-quality technical proposals
- **Weaknesses**: Zero PRs, minimal interaction
- **Health**: Poor - appears dormant
- **Trajectory**: At risk of abandonment

---

### 📈 Community Health Indicators

#### **Positive Signals:**

✅ **Active maintainer responsiveness**
- OpenClaw: Issues addressed within 24h
- Hermes-Agent: Desktop crash fix same day
- NanoBot: 6 PRs merged in 24h

✅ **Quality contributions**
- IronClaw: @YLChen-007's comprehensive security audit
- GoClaw: Detailed PoCs for vulns
- Zeroclaw: @Nillth's 6 Discord PRs

✅ **First-time contributors**
- Multiple projects seeing new contributors
- Good onboarding documentation effect

#### **Warning Signals:**

⚠️ **Stale PR accumulation**
- LobsterAI: 6 quality PRs auto-closed (from April)
- OpenClaw: Old PRs from Q1 still open
- Pattern: Review bandwidth < contribution rate

⚠️ **Documentation gaps**
- Hermes-Agent: Users discover features via code
- CoPaw: Migration path unclear
- OpenClaw: Onboarding wizard missing memory setup

⚠️ **Platform-specific pain**
- Windows issues across multiple projects
- macOS permission detection problems
- Docker/container configuration complexity

---

## 7. 🔮 Tín hiệu Xu hướng

### 🎯 Mega-Trends (6-12 tháng)

#### **1. Security Becomes Non-Negotiable** 🔐

**Evidence:**
- OpenClaw v2026.6.6: 9 security features
- NanoClaw: Container cap-drop, no-new-privileges
- GoClaw: 7 exec approval vulns discovered
- Hermes-Agent: SSRF guard implementations

**Prediction:**
> Trong 6 tháng tới, các dự án không có **comprehensive security audit** sẽ mất trust của enterprise users. Expect:
- Security-focused releases becoming standard
- Bug bounty programs formalization
- Compliance certifications (SOC2, ISO27001)
- Zero-trust architectures becoming default

**Winners**: OpenClaw (head start), projects willing to do painful refactors
**Losers**: Projects with exec approval bypass vulns, weak sandboxing

---

#### **2. Multi-Agent Orchestration Standardization** 🤖🤖

**Evidence:**
- All major projects building subagent capabilities
- Swarm/team collaboration feature requests
- Model override flexibility needs
- Completion routing challenges

**Prediction:**
> Một **standard protocol** cho agent-to-agent communication sẽ xuất hiện. Có thể là:
- Extension của MCP (Model Context Protocol)
- Agent Communication Protocol (ACP) maturation
- Inter-agent messaging bus

**Impact:**
- Agents từ different frameworks có thể collaborate
- Marketplace cho specialized agents
- Composition thay vì monolithic agents

**Winners**: Projects với clean agent abstraction (IronClaw's Agent OS Driver)
**Losers**: Tightly-coupled monolithic architectures

---

#### **3. Memory Architecture Revolution** 🧠

**Evidence:**
- Hermes-Agent: Human-like memory layers
- OpenClaw: LCM compaction challenges
- NanoBot: Memory loss #1 pain point
- NanoClaw: Persistent memory scaffold

**Prediction:**
> **Hierarchical memory** sẽ thay thế simple context window compression:
```
┌─────────────────────────────┐
│   Working Memory (hot)      │ ← Prompt cache, immediate context
├─────────────────────────────┤
│   Semantic Store (warm)     │ ← Embeddings, knowledge graph
├─────────────────────────────┤
│   Episode Archive (cold)    │ ← Long-term, Git-backed
└─────────────────────────────┘
```

**Tech stack:**
- Vector DBs (Qdrant, Milvus) integration
- Git-backed persistence (like IronClaw's plur)
- Prompt caching becomes standard

**Winners**: Projects investing in memory infrastructure now
**Losers**: Projects stuck with naive consolidation

---

#### **4. Desktop/Mobile Native Experience** 📱💻

**Evidence:**
- Hermes-Agent: 2x desktop performance improvements
- CoPaw: Desktop packaging issues
- OpenClaw: Control UI HTTPS requirements
- Multiple projects: pywebview, Tauri adoption

**Prediction:**
> **Native apps** sẽ thay thế web-first approach cho power users:
- Electron/Tauri desktop apps become primary
- Mobile apps (React Native, Flutter) emerging
- System tray, keyboard shortcuts, local-first
- Offline capabilities với local models

**Drivers:**
- Privacy concerns (local inference)
- Performance (no network latency)
- Richer OS integration (notifications, file system)

**Winners**: Hermes-Agent (leading), projects with desktop roadmap
**Losers**: Web-only frameworks

---

#### **5. Platform Integration Arms Race** 🏁

**Evidence:**
- All projects expanding messaging platforms
- Discord dynamic skills, Telegram business bots
- Slack OAuth complexity, Feishu card streaming
- Nostr decentralized messaging

**Prediction:**
> **Abstraction layers** cho messaging platforms sẽ emerge:
- Unified channel interface (like libpurple for IM)
- Plugin-based platform adapters
- Multi-protocol gateway services

**Pattern:**
```
┌────────────────────────────────┐
│   Agent Core                   │
├────────────────────────────────┤
│   Platform Abstraction Layer   │ ← Standard interface
├────────────────────────────────┤
│ Telegram│Discord│Slack│WhatsApp│ ← Adapters
└────────────────────────────────┘
```

**Winners**: Projects với clean separation (Zeroclaw's channel refactor)
**Losers**: Hardcoded platform logic

---

#### **6. Cost Optimization & Budgeting** 💰

**Evidence:**
- OpenClaw: Provider compatibility expansion
- CoPaw: Token usage tracking requests
- Hermes-Agent: Delegation cost control issues
- Multiple: Model fallback strategies

**Prediction:**
> **Intelligent model routing** sẽ trở thành killer feature:
- Cheap models cho simple tasks
- Expensive models cho complex reasoning
- Prompt caching aggressive usage
- Budget enforcement at runtime

**Features coming:**
- Per-task cost estimation
- Real-time budget dashboards
- Model cascade strategies
- Cost anomaly detection

**Winners**: Platforms với flexible provider switching
**Losers**: Single-model-only frameworks

---

### 🌊 Emerging Patterns

#### **A. Kubernetes-Native Deployment** ☸️

**Early adopters:**
- Zeroclaw: K8s-ready architecture
- Moltis: K8s sandbox backend proposal
- NanoClaw: Container security hardening

**Why it matters:**
- Enterprise already on K8s
- Resource isolation built-in
- Scalability and high availability
- GitOps-friendly deployments

**Timeline**: 12-18 months to mainstream

---

#### **B. Voice & Multimodal First** 🎤📷

**Signals:**
- Moltis: FunASR/SenseVoice STT requests
- OpenClaw: Realtime ASR voice input
- PicoClaw: Media routing improvements
- Multiple: Image compression pipelines

**Why it matters:**
- Voice is natural interface
- Multimodal models (GPT-4V, Gemini) improving
- Mobile/IoT use cases demand voice
- Accessibility requirements

**Timeline**: 6-12 months to feature-complete

---

#### **C. Decentralization Experiments** 🌐

**Early signals:**
- Hermes-Agent: Nostr protocol support
- Moltis: Privacy-first local STT
- Multiple: Local model inference

**Why it matters:**
- Privacy regulations (GDPR, CCPA)
- Censorship resistance
- Cost reduction (no API fees)
- Edge computing growth

**Timeline**: 12-24 months to niche adoption

---

### 📊 Consolidation Predictions

**12 months from now:**

**Tier 1 (Survivors)**: 3-4 projects
- OpenClaw (market leader)
- Hermes-Agent (DX champion)
- 1-2 others (IronClaw or Zeroclaw)

**Tier 2 (Niche players)**: 2-3 projects
- CoPaw (Chinese market)
- PicoClaw or NanoBot (lightweight)

**Acquired/Merged**: 2-3 projects
- Smaller projects merge into larger ones
- Features absorbed, codebases archived

**Abandoned**: 1-2 projects
- Moltis (unless activity picks up)
- GoClaw (if security issues not addressed)

---

### 🎲 Wild Cards

**Potential game-changers:**

1. **OpenAI releases official agent framework**
   - Could disrupt entire ecosystem
   - Or validate current approaches

2. **Regulatory intervention**
   - EU AI Act enforcement
   - Liability for agent actions
   - Could favor established, secure platforms

3. **Breakthrough in long-context models**
   - 1M+ token windows become cheap
   - Eliminates memory management complexity
   - Changes architecture assumptions

4. **Enterprise adoption wave**
   - If one project lands Fortune 500 deal
   - Sets de facto standard
   - Network effects accelerate

---

## 🎓 Kết luận Chiến lược

### 🏆 Verdict: Ai thắng?

**Không có "winner-takes-all"** - thị trường đang phân mảnh theo use cases:

**Enterprise**: OpenClaw
**Developers**: Hermes-Agent
**Kubernetes shops**: Zeroclaw
**Chinese market**: CoPaw
**Hobbyists**: NanoBot/PicoClaw

### 📍 Vị trí của OpenClaw

**Today**: Market leader với moat về ecosystem và security
**6 months**: Must fix memory leak và improve DX
**12 months**: Either dominant platform hoặc tied with Hermes-Agent

**Critical moves:**
1. ✅ Resolve P0 memory leak
2. ✅ Improve documentation và onboarding
3. ✅ Maintain security leadership
4. ⚠️ Watch Hermes-Agent desktop experience
5. ⚠️ Don't lose developer love to simpler alternatives

### 🎯 Khuyến nghị cho OpenClaw

**Ngắn hạn (1-3 tháng):**
- 🔴 **P0**: Fix memory leak (#91588)
- 🟡 **P1**: Improve onboarding wizard (mention memory setup)
- 🟡 **P1**: Document security policies và best practices
- 🟢 **P2**: Expand QA automation coverage

**Trung hạn (3-6 tháng):**
- 🔴 **Strategic**: Complete ClawHub marketplace
- 🟡 **Competitive**: Match Hermes-Agent desktop UX
- 🟡 **Innovation**: Multi-agent swarm primitives
- 🟢 **Ecosystem**: More provider integrations

**Dài hạn (6-12 tháng):**
- 

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích NanoBot - 13/06/2026

## 🎯 Tóm tắt hôm nay

Ngày hôm nay NanoBot ghi nhận hoạt động phát triển cực kỳ sôi động với **30 pull requests** và nhiều cải tiến quan trọng về độ ổn định hệ thống. Các nhà phát triển tập trung mạnh vào việc sửa lỗi memory management, cải thiện tính toàn vẹn dữ liệu trong session history, và mở rộng khả năng tùy chỉnh thông qua audit logging, TTS configuration, và multi-provider support. Đặc biệt, nhiều PR đang được merge để giải quyết các vấn đề nghiêm trọng về mất ngữ cảnh và orphaned tool results.

---

## 🚀 Releases

**Không có release chính thức nào được phát hành trong 24 giờ qua**, tuy nhiên dựa trên volume của các PR đang được tích hợp, có dấu hiệu dự án đang chuẩn bị cho một release lớn tập trung vào stability và developer experience.

---

## 📈 Tiến độ dự án

### 🔥 Xu hướng phát triển chính

#### 1. **Sửa lỗi Memory & Context Management** (Ưu tiên cao)
- **#4280** (OPEN): Giải quyết vấn đề mất ngữ cảnh khi `consolidate` pointer bị lệch
- **#4256** (OPEN): Đảm bảo cursor lịch sử luôn tăng đơn điệu, tránh cursor rollback
- **#4321** (OPEN): Sửa lỗi Dream cursor không được cập nhật khi feature tắt, gây prompt bloat
- **#4193** (OPEN): Thêm test harness cho memory lifecycle từ consolidation đến Git versioning

**Insight**: Đây là vấn đề cốt lõi được cộng đồng phản ánh mạnh qua #4044 (short term memory loss). Team đang tiếp cận đa chiều: sửa cursor logic, cải thiện consolidation, và tăng cường test coverage.

#### 2. **Data Integrity & Validation** (Critical fixes)
- **#4306** (CLOSED): Ngăn chặn orphaned tool results trong history (fixes #4006)
- **#4315** (OPEN): Bỏ qua các entry history bị malformed
- **#4312** (OPEN): Validate media attachments để tránh parsing lỗi
- **#4311** (OPEN): Reject các pagination limit không hợp lệ trong file tools

**Insight**: Các lỗi này phá vỡ tương thích với OpenAI/Anthropic strict APIs. Việc sửa chúng cho thấy NanoBot đang hướng tới production-ready quality.

#### 3. **Developer Experience & Extensibility**
- **#4320** (OPEN): Thêm audit system cho tool invocations với multi-transport (webhook, JSONL, callback)
- **#4316** (OPEN): Hệ thống TTS configuration hỗ trợ OpenAI, Groq, ElevenLabs
- **#4313** (OPEN): WebUI/config.json parity - đồng bộ settings giữa UI và file config
- **#4296** (OPEN): Mở rộng Python SDK với session controls, memory access, runtime hooks
- **#3239** (CLOSED): Multiple custom OpenAI-compatible providers (giải quyết #4305)

**Insight**: NanoBot đang chuyển từ monolithic configuration sang pluggable architecture với observability tốt hơn.

#### 4. **Channel Integrations**
- **#2592** (CLOSED): Mattermost channel support với WebSocket + REST API
- **#4226** (CLOSED): WhatsApp improvements: forwarded message detection, startup guard
- **#4317** (OPEN): WhatsApp mentions support

**Insight**: Mở rộng khả năng tích hợp messaging platforms, cạnh tranh với các bot frameworks khác.

#### 5. **Architecture Refactoring**
- **#4314** (OPEN): Tách config schema khỏi tool runtimes để giảm circular dependencies
- **#4294** (CLOSED): Tách desktop app ra repo riêng, giữ core repo open-source focused
- **#4299** (CLOSED): Bind cron jobs vào sessions thay vì delivery targets

---

## 🌟 Điểm nổi bật cộng đồng

### Issues được quan tâm nhất:

1. **#4044** - Short term memory loss (5 comments, 👍 0)
   - Vấn đề nghiêm trọng: Agent quên câu hỏi vừa hỏi
   - Root cause: Context window pressure + consolidation timing
   - Đang có 3 PR (#4280, #4256, #4321) attack vấn đề này

2. **#4006** - Orphaned tool results (2 comments) → **ĐÃ FIX** qua #4306
   - Tool results không có tool_call tương ứng
   - Phá vỡ OpenAI/Anthropic API compliance

3. **#4307** (OPEN) - Consolidation wipes agent's delivery message
   - Context consolidation xóa mất message của agent
   - User follow-up references bị lost

### PRs có impact lớn:

- **#4313**: WebUI parity - quan trọng cho end-user experience
- **#4320**: Audit system - critical cho enterprise adoption
- **#4310**: Fix /v1/chat/completions usage reporting - cần thiết cho billing integration

---

## 🐛 Ổn định & Bugs

### ✅ Đã giải quyết:
- ✅ Orphaned tool results (#4306 closed)
- ✅ Multiple custom providers (#3239 closed)
- ✅ Cron subagent completion timing (#4304 closed)
- ✅ MCP server generator GC crash (#4303)

### 🔧 Đang xử lý:
- 🔄 Short-term memory loss - đa PR đang tiếp cận
- 🔄 Malformed history entries (#4315)
- 🔄 Media attachment validation (#4312)
- 🔄 Dream cursor advance khi disabled (#4321)
- 🔄 /v1/chat/completions zero usage (#4309 + #4310)
- 🔄 Post-turn consolidation message loss (#4307)

### 🔐 Security concerns:
- **#4119** (OPEN): Block symlink workspace escapes - quan trọng cho sandboxing

---

## 💡 Yêu cầu tính năng

### Đã implement/đang implement:

1. **Audit & Observability** (#4320)
   - Tool invocation tracking
   - Multi-transport: webhook, JSONL, callback
   - Scope filtering (exec_only, filesystem_writes, all)

2. **Text-to-Speech** (#4316)
   - Multi-provider: OpenAI, Groq Orpheus, ElevenLabs
   - WebUI configuration
   - Agent-facing discoverability

3. **Subagent Model Presets** (#4291)
   - Subagents có thể dùng model khác parent
   - Configurable via `spawnPresets`

4. **Skills Caching** (#4301)
   - Cache skill discovery và metadata parsing
   - Giảm overhead trên mỗi context build

### Đã được merge:
- ✅ Mattermost channel support
- ✅ WhatsApp advanced features
- ✅ Multiple custom providers

---

## 💬 Phản hồi người dùng

### 😤 Pain points chính:

1. **Memory loss** (#4044) - vấn đề UX nghiêm trọng nhất
   - Agent không nhớ context trong conversation dài
   - Gây frustration cao cho user

2. **API compatibility** (#4006, #4309)
   - Orphaned tool results phá vỡ strict APIs
   - Zero usage tokens gây vấn đề cho billing integrations

3. **Configuration complexity** (#4305, #4313)
   - Gap giữa WebUI và config.json
   - Thiếu flexibility trong multi-provider setup

### 😊 Positive signals:

- Cộng đồng đang active contribute fixes
- Maintainers responsive với bug reports
- Architecture đang được refactor theo hướng modular hơn

---

## 🗺️ Backlog & Roadmap

### Priorities đang thấy rõ:

1. **Stability & Memory** (P0)
   - Fix memory loss issue hoàn toàn
   - Improve consolidation logic
   - Better cursor management

2. **Developer Experience** (P1)
   - Enhanced Python SDK (#4296)
   - Audit system rollout (#4320)
   - WebUI/config parity (#4313)

3. **Enterprise Features** (P1)
   - TTS configuration (#4316)
   - Usage tracking fixes (#4310)
   - Security hardening (#4119)

4. **Channel Expansion** (P2)
   - Mattermost support merged
   - WhatsApp improvements ongoing

### Technical debt được address:

- Config schema refactoring (#4314)
- Dependency cleanup (desktop separation #4294)
- Test coverage expansion (#4193, #3983, #3982)

---

## 📊 Thống kê hoạt động

- **PRs mở**: 20+ (activity cực cao)
- **PRs merged trong ngày**: 6
- **Issues mới**: 2 (#4307, #4309)
- **Issues closed**: 3 (#4203, #4006, #4305)
- **Critical bugs fixed**: 2 (orphaned tools, MCP crash)
- **Contributors active**: 15+ unique authors

---

## 🎓 Kết luận

NanoBot đang trong giai đoạn **intensive stabilization** trước một potential release lớn. Team tập trung vào:
- Sửa các critical bugs về memory và data integrity
- Mở rộng observability và developer tools
- Cải thiện enterprise readiness

Vấn đề **short-term memory loss** là priority #1 hiện tại với multiple PRs đang attack từ nhiều góc độ. Nếu giải quyết được, sẽ là bước tiến lớn cho UX.

Dự án cho thấy signs của một codebase đang mature: nhiều refactoring, test coverage tăng, architecture cleanup. Volume PR cao cho thấy momentum phát triển mạnh.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Phân tích Hệ sinh thái Zeroclaw - 13/06/2026

## 🎯 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn **consolidation và bug-fixing** mạnh mẽ với 33 PRs hoạt động. Nhóm phát triển tập trung vào việc **thống nhất 3 agent turn engines** (#7415, #7540) - một refactor kiến trúc quan trọng, đồng thời xử lý hàng loạt **platform-specific issues** (Docker, Windows, macOS) và **channel improvements** (Discord, WhatsApp, Lark). Đặc biệt, issue #7112 về v0.8.0 đã được **CLOSED**, cho thấy milestone quan trọng đã hoàn thành.

---

## 📦 Releases

**Không có releases mới trong 24h qua**, nhưng có tín hiệu quan trọng:

- ✅ **Issue #7112 (v0.8.0 release tracker) đã CLOSED** → v0.8.0 có thể sắp được release
- 🔄 **Issue #6970 (v0.8.1 tracker)** vẫn OPEN → đang lên kế hoạch cho version tiếp theo
- 🏗️ Focus hiện tại: ổn định v0.8.0 sau khi close tracker

---

## 🚀 Tiến độ dự án

### 🔥 Refactor kiến trúc lớn: Consolidate Agent Engines

**PR #7540** (implements RFC #7415) - đây là **PR quan trọng nhất** trong ngày:

- **Vấn đề**: Zeroclaw có 3 turn engines riêng biệt:
  - `run_tool_call_loop` (channels/CLI/cron)
  - `Agent::turn_streamed_with_steering_state` (gateway WS, RPC, ACP)
  - `Agent::turn` (embedded)
- **Giải pháp**: Consolidate thành **1 engine duy nhất** dựa trên `run_tool_call_loop`
- **Blast radius**: HIGH - ảnh hưởng đến agent, channel, gateway, runtime
- **Ý nghĩa**: Giảm technical debt, dễ maintain, consistent behavior across channels

### 🔧 Platform Support & Bug Fixes

**Cụm PRs về Docker và cross-platform**:

1. **#7534**: Fix Docker build - thiếu g++ cho cc-rs C++ compilation
2. **#7528, #7530**: Windows update mechanism - accept `.zip` assets thay vì chỉ `.tar.gz`
3. **#7516**: Fix `zeroclaw quickstart` infinite redraw loop khi không có TTY
4. **#7529**: Dashboard URL chỉ hiển thị khi web_dist_dir thực sự tồn tại

→ **Insight**: Team đang **polish production readiness** trên nhiều nền tảng

### 🔌 Plugin & Integration Infrastructure

**PR #7549**: Fix critical plugin discovery bug:
- **Vấn đề**: CLI `zeroclaw plugin install` ghi vào `data_dir/plugins`, nhưng runtime scan `plugins.plugins_dir` → installed plugins "invisible"
- **Giải pháp**: Align paths + legacy migration
- **Ý nghĩa**: Unblock plugin ecosystem growth

**PR #7547**: Auto-include MCP tools in risk_profile:
- MCP tools được discover nhưng không xuất hiện trong agent's tool list
- Giải pháp: Auto-allowlist discovered MCP tools

---

## 💬 Điểm nổi bật cộng đồng

### 🚨 User-facing issues (S1 severity)

1. **#7542** (NEW): `ask_user` tool **fails instantly** trong gateway web dashboard
   - "Channel closed before receiving a response"
   - **Impact**: Workflow blocked cho interactive agents

2. **#7523** (NEW): Dashboard not available trên macOS Homebrew install
   - Hướng dẫn: `cargo web build` (không friendly cho end users)

3. **#7537** (NEW): `zeroclaw quickstart` fails trên Windows 10
   - Error: "no map-keyed/list section at peer-groups"
   - **Pattern**: Config parsing issues cho Windows users

4. **#7527** (NEW): macOS app không detect granted permissions, window disappears
   - OS compatibility issue trên macOS 15.7.7

→ **Insight**: **Windows và macOS onboarding experience cần cải thiện** - 4/6 new bugs là platform-specific

### 🌟 Channel Enhancements - Discord focus

**Cụm PRs Discord** (author: @Nillth) - 5 PRs liên quan:

1. **#7524**: Derive gateway intents from config (thay vì hardcode)
2. **#7526**: Reaction notifications with scope config (`off`|`own`|`all`)
3. **#7525**: Sync archive on message edit/delete/bulk delete
4. **#7490**: **Dynamic slash commands from installed skills** 🎯
5. **#7489** (dependency): Basic slash command infrastructure

→ **Discord channel đang được nâng cấp đáng kể** với dynamic skill commands - cho phép extend bot functionality qua skills

### 📱 WhatsApp Web improvements

- **#7536**: Forward quoted media attachments (images, videos, documents, stickers)
- **#7535**: Implement `add_reaction`/`remove_reaction` cho ack_reactions

---

## 🐛 Ổn định & Bugs

### Critical Fixes (Risk: High)

1. **#7263 CLOSED**: Subagents không inherit "cwd" trong ACP sessions
   - Fixed: Workspace context now properly inherited

2. **#7424**: `allowed_private_hosts = ["*"]` không cover DNS-resolved private hosts
   - Wildcard behavior inconsistent với named entries

3. **#7207**: Gateway paircode recovery hint sai khi bind non-loopback address
   - Security implication: admin routes localhost-only nhưng hint advertise wrong URL

### Config & Data Integrity

**PR #7532**: Align serde defaults với struct Default:
- **9 fields** có serde default khác struct Default
- **Impact**: `Config::save()` prune keys → silent value flips hoặc section-drops
- **Pattern**: Data loss risk trong config round-trips

**PR #7541**: Legacy V3 paths issue:
- Gateway WS chat và one-shot channels vẫn dùng shared `data_dir` làm workspace
- Since V3: `workspace_dir` → `data_dir` rename, nhưng legacy code paths chưa update

---

## ✨ Yêu cầu tính năng

### 🎮 User Experience

1. **#7543** (NEW): Multi-session support trong gateway web chat UI
   - Session sidebar: new/switch/rename/delete
   - Hiện tại: single-session per agent
   - **Demand**: Users cần multiple independent conversations

2. **#7531** (NEW): Streaming card messages cho QQ/DingTalk/WeChat/Feishu
   - **Vấn đề**: Rich card messages không streaming → long wait time
   - **Goal**: Reduce user anxiety với progressive updates

3. **#7539** (NEW): llama.cpp model router
   - Quick switching giữa các models
   - **Pain point**: Default model không dễ switch

### 🏗️ Infrastructure

1. **#6842** (OPEN): NEAR AI Cloud provider integration
   - TEE-backed inference provider
   - OpenAI-compatible slot

---

## 👥 Phản hồi người dùng

### 😤 Pain Points từ new issues

1. **Onboarding friction** (Windows/macOS):
   - Config parsing errors (#7537)
   - Permission detection issues (#7527)
   - Dashboard availability confusion (#7523)

2. **Core workflow blockers**:
   - `ask_user` tool broken (#7542) - critical cho interactive agents
   - Subagent workspace inheritance (#7263) - đã fix

3. **Documentation gaps**:
   - Dashboard build instructions không clear cho non-developers
   - Platform-specific setup requirements

### 💡 Community contributions

**Active contributors** trong 24h:
- @Nillth: 6 PRs (Discord enhancements, engine consolidation)
- @chengzhichao-xydt: 4 PRs (platform fixes, config alignment)
- @Alix-007: 3 PRs (cron, gateway, docs)
- @NiuBlibing: 2 PRs + 2 issues (web fetch, ask_user bug reports)

→ **Healthy contribution pattern** với repeat contributors tackling systematic issues

---

## 📋 Backlog & Roadmap

### Upcoming Milestones

**v0.8.1 Queue** (Issue #6970):
- Tracker cho integrations/channels/providers/tools
- Complement to long-term Plugins architecture (#6489)

**Accepted & Prioritized**:

1. **P1 (High priority)**:
   - ✅ #7112 v0.8.0 blockers - CLOSED
   - 🔄 Engine consolidation (#7415 → #7540) - In Progress

2. **P2 (Medium priority)**:
   - #7415: Turn engines unification (executing)
   - #6443: Twitch chat channel (IRC adapter)
   - #6970: v0.8.1 integration queue
   - Discord enhancements suite

### Technical Debt Focus

**Patterns từ PRs**:
- Config serde/Default alignment (9 fields fixed)
- Legacy V3 path cleanup
- Platform-specific polishing (Windows .zip, Docker g++, macOS Cmd-C)
- Channel capability parity (WhatsApp reactions, Discord slash commands)

---

## 🎯 Kết luận

**Zeroclaw đang trong "stabilization sprint"** sau khi close v0.8.0 tracker. Focus chính:

1. ✅ **Architecture consolidation** - unify 3 engines thành 1
2. 🔧 **Platform polish** - Docker, Windows, macOS fixes
3. 🔌 **Plugin ecosystem** - fix discovery bugs
4. 💬 **Channel enhancements** - Discord dynamic commands, WhatsApp media
5. 🐛 **User-reported bugs** - onboarding và core workflow blockers

**Tín hiệu tích cực**: High PR velocity (33 active), responsive bug fixes, systematic improvements. **Concern**: Onboarding experience trên Windows/macOS cần attention trước khi v0.8.0 official release.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích PicoClaw - Ngày 13/06/2026

## 1. 🎯 Tóm tắt hôm nay

Ngày 13/06 chứng kiến nỗ lực mạnh mẽ nhằm ổn định và hoàn thiện hệ thống PicoClaw với **6 PR được mở** tập trung vào sửa lỗi và cải thiện giao thức. Điểm nổi bật là việc hoàn thiện tín hiệu lifecycle `turn.done` cho Pico WebSocket và sửa lỗi quan trọng về routing media turns sang image models. Cộng đồng đang quan tâm đến vấn đề bảo mật trong môi trường nhóm/channel và khả năng tương tác với các mô hình mới như Gemini 3.5 Flash.

---

## 2. 🚀 Releases

### **v0.2.9-nightly.20260613** (Nightly Build)
- Build tự động từ nhánh main, có thể chưa ổn định
- Khuyến cáo thận trọng khi sử dụng trong production
- Tích hợp các commits mới nhất từ các PR đang được merge

⚠️ Đây là bản nightly, người dùng nên đợi bản stable nếu cần độ tin cậy cao.

---

## 3. 📈 Tiến độ dự án

### **Pull Requests Quan trọng**

#### 🔧 Sửa lỗi core (Mức độ: Cao)
- **#3117** - Fix routing media turns sang image models
  - Giải quyết issue #3108: media bị retry trên text-only model
  - Tự động route các lượt có media và `load_image` follow-ups sang image model đã cấu hình
  - Embed onboarding workspace từ thư mục gốc

- **#3116** - Hoàn thiện lifecycle `turn.done` cho Pico WebSocket
  - Bổ sung cho issue #2984
  - Fix 3 gaps: preserve `request_id` cho queued messages, emit `turn.done` sau tool execution, xử lý edge cases
  - **Ý nghĩa**: Clients giờ có thể biết chính xác khi nào agent hoàn tất xử lý

- **#3115** - Fix corruption khi extract inline data URL từ tool output
  - Bug nghiêm trọng: `data:image/...` trong plain text bị nhận nhầm là media attachment
  - Ảnh hưởng các tools như `read_file`, `exec` khi output chứa base64 strings

#### 🆕 Tính năng mới
- **#3118** - Remote Pico WebSocket mode
  - Cho phép `picoclaw agent` kết nối tới remote Pico server
  - Mở rộng khả năng distributed deployment

- **#3063** - DeltaChat gateway integration
  - Thêm kênh giao tiếp mới cho hệ sinh thái

- **#2917** - NEAR AI Cloud provider
  - Tích hợp TEE-capable models từ NEAR AI

#### 🔍 Cải thiện chất lượng code
- **#3112**, **#3113** - Xử lý JSON marshal errors (merged)
- **#3091**, **#3053**, **#3045** - Type assertion safety checks

### **Xu hướng phát triển**
- **Ổn định giao thức**: Hoàn thiện Pico WebSocket protocol với lifecycle signals
- **Media handling**: Tập trung fix routing và compression cho vision pipeline
- **Code quality**: Series của @chengzhichao-xydt cải thiện error handling
- **Multi-channel support**: Mở rộng sang DeltaChat, chuẩn bị cho #2551 (decouple channel names)

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues có tương tác cao**
- **#2984** (👍 2) - Explicit turn completion signal
  - Nhu cầu thực từ WebSocket clients cần biết khi nào turn kết thúc
  - Đã được implement qua PR #3116

- **#3109** (CLOSED) - Channel-level permission scoping
  - Đề xuất hạn chế operations nguy hiểm trong group/channel chats
  - Closed nhanh → Có thể đã được xử lý hoặc chuyển sang issue khác (#3114)

### **Vấn đề người dùng quan tâm**
1. **Bảo mật trong group chats**: Nhu cầu phân quyền theo context (private vs group)
2. **Tương thích model mới**: Gemini 3.5 Flash yêu cầu schema khác (#3111)
3. **Telegram Forum support**: Bug reply sai topic (#3110)

---

## 5. 🐛 Ổn định & Bugs

### **Critical Bugs (được xử lý hôm nay)**
- ✅ **Media routing corruption** (#3117) - Fixed
- ✅ **Inline data URL extraction** (#3115) - Fixed  
- ✅ **Turn lifecycle incomplete** (#3116) - Fixed

### **Open Bugs**
- 🔴 **#3012** - Token consumption khi evolution enabled (stale)
  - Vấn đề: Token bị tiêu thụ liên tục mỗi phút
  - Environment: FreeBSD + MiniMax
  - **Status**: Stale → Cần attention từ maintainers

- 🟡 **#3111** - Gemini 3.5 Flash tool execution fails
  - Root cause: Schema thiếu `thought_signature` cho Agentic reasoning
  - Ảnh hưởng: Không dùng được Gemini 3.5 Flash với tools

- 🟡 **#3110** - Telegram Forum thread reply sai topic
  - Bot reply về #General thay vì topic được mention
  - Ảnh hưởng trải nghiệm trong Telegram Supergroups

### **Technical Debt được giải quyết**
- JSON marshal error handling (series PRs #3112, #3113)
- Type assertion safety (#3091, #3053, #3045)
- Matrix user ID parsing với colon (#3045)

---

## 6. ✨ Yêu cầu tính năng

### **Đã được đề xuất hôm nay**

#### 🔐 **#3114** - Telegram permission scoping theo context
- **Yêu cầu**: Phân quyền khác nhau cho private/group/channel
  - Private chat: Full permissions
  - Group chat: Hạn chế `exec`, `write_file`, `delete_file`
  - Channel: Read-only mode
  
- **Đề xuất implementation**:
  ```yaml
  telegram:
    allow_from: ["user:123", "chat:-456"]
    permission_scope:
      private: "full"
      group: "safe"
      channel: "readonly"
  ```

- **Ý nghĩa**: Critical cho use cases deploy bot trong groups công cộng

### **Tính năng đang phát triển**
- **Image compression pipeline** (#2964) - Configurable multi-level compression
- **Remote Pico mode** (#3118) - Distributed agent deployment
- **Channel decoupling** (#2551) - Multiple instances của cùng provider

---

## 7. 👥 Phản hồi người dùng

### **Positive**
- Đánh giá cao việc implement `turn.done` signal (#2984 → #3116)
- Remote WebSocket mode được chào đón (#3118)

### **Pain Points**
1. **Evolution mode token leak** (#3012)
   - Quote user: "Continuous consumption of tokens every minutes"
   - Ảnh hưởng chi phí API cho users dùng MiniMax/similar providers

2. **Gemini 3.5 Flash incompatibility** (#3111)
   - Frustration: Local script chạy OK, nhưng qua PicoClaw bị 400
   - Expectation: Hỗ trợ latest models từ Google

3. **Telegram Forum chaos** (#3110)
   - Quote: "replies default to #General"
   - UX issue trong organized communities

### **Feature Requests từ community**
- Compression controls cho inbound images (#2964)
- NEAR AI Cloud integration (#2917)
- DeltaChat support (#3063)

---

## 8. 🗺️ Backlog & Roadmap

### **Đang trong pipeline (từ Open PRs)**
1. **Protocol completion** 
   - ✅ Turn.done lifecycle (merged today)
   - ⏳ Image compression policy (#2964)
   - ⏳ Channel identification refactor (#2551)

2. **Provider ecosystem**
   - ⏳ NEAR AI Cloud (#2917)
   - ⏳ DeltaChat gateway (#3063)

3. **Security & Permissions**
   - 🆕 Channel-level scoping (#3114)
   - Cần: Policy framework cho group contexts

### **Blockers cần xử lý**
- 🚨 **Gemini 3.5 Flash schema** (#3111) - Blocking adoption của latest Google models
- ⚠️ **Evolution token leak** (#3012) - Cost issue cho production users
- ⚠️ **Telegram Forum threading** (#3110) - UX regression trong supergroups

### **Roadmap insights**
- **Near-term**: Stabilization trước tính năng mới
- **Focus**: Protocol correctness (lifecycle, media handling, error handling)
- **Strategic**: Multi-provider, multi-channel architecture (#2551, #2917, #3063)
- **Security**: Permission framework sẽ là priority tiếp theo sau feedback từ #3114

---

## 📊 Metrics Snapshot
- **Issues mới**: 2 (#3110, #3111, #3114)
- **Issues closed**: 1 (#3109)
- **PRs mới**: 6
- **PRs merged**: 2 (#3112, #3113)
- **Contributors active**: ~8 người
- **Hot topics**: Permissions, Gemini compatibility, Telegram UX

---

**Kết luận**: PicoClaw đang trong giai đoạn consolidation sau v0.2.9, tập trung vào quality over quantity. Các fixes về protocol và media handling cho thấy team đang ưu tiên stabilization. Community feedback về security trong group contexts (#3114) có thể định hình kiến trúc permission cho các versions tiếp theo.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích dự án NanoClaw - 13/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 12-13/06 là một ngày **cực kỳ năng suất** của NanoClaw với **9 PRs mới** được mở, tập trung mạnh vào **bảo mật container** và **sửa lỗi nghiêm trọng về data integrity**. Dự án đang trong giai đoạn củng cố v2 với nhiều vá lỗi quan trọng liên quan đến session management, SQLite journal recovery, và hardening bảo mật agent containers. Đặc biệt nổi bật là các PR về security (cap-drop, package age gating) và fixes cho database corruption issues.

---

## 🚀 Releases

**Không có release chính thức trong 24h qua**, nhưng các PR cho thấy dự án đang chuẩn bị cho một **stable release** với nhiều security patches và critical fixes.

---

## 📈 Tiến độ dự án

### 🔐 Security Hardening (Trọng tâm chính)

**#2748 - Container Security** 🛡️
- Drop tất cả Linux capabilities (`--cap-drop=ALL`)
- Ngăn privilege escalation (`no-new-privileges`)
- Giới hạn fork-bomb với `--pids-limit 2048`
- **Ý nghĩa**: Defense-in-depth cho agent containers - giảm blast radius nếu agent bị compromise

**#2749 - NPM Package Age Gating** 📦
- Enforce 3-day minimum release age cho npm packages
- Chống supply-chain attacks qua newly-published malicious packages
- **Ý nghĩa**: Phòng ngừa typosquatting và trojan packages - rất quan trọng cho AI agent tự động install dependencies

### 🐛 Critical Fixes

**#2750 - SQLite Journal Recovery** 💾
- Fix stale `outbound.db-journal` sau container SIGKILL
- Giải quyết READONLY handle race conditions
- **Tác động**: Fixes #2516, #2640 - hai bugs nghiêm trọng khiến host không đọc được database sau crashes

**#2752 - Discord Attachment Handling** 📎
- Fix attachments từ Discord không tải xuống đúng
- Agent nhận được file content thay vì chỉ filename
- **Tác động**: Khôi phục khả năng xử lý images/files từ Discord

**#2670 - Self-healing Crash Loop** 🔄
- Tự động recover từ corrupted resumed transcripts
- Xử lý SDK 400 errors về `thinking` blocks
- **Tác động**: Ngăn session crash-loop vô hạn

### ⚙️ Infrastructure & SDK

**#2747 - OneCLI SDK 2.2.1** 🔧
- Credential stub mounts
- Machine-checkable pins
- Bump từ 0.5.0 → 2.2.1 (major version jump)

**#2746 - Provider Capability Seam** 🎨
- Registry cho provider capabilities
- Architecture cho pluggable agent surfaces
- **Ý nghĩa**: Nền tảng cho extensibility - providers có thể declare capabilities

**#2745 - Persistent Memory Scaffold** 🧠
- Opt-in persistent memory cho providers
- Container-side capability
- **Ý nghĩa**: Hạ tầng cho long-term agent memory

### 🔨 Dev Experience

**#2753 - Pre-commit Hook Fix** ✅
- Fix pre-commit hook fail khi pnpm không trong PATH
- Graceful fallback

---

## 🔥 Điểm nổi bật cộng đồng

### Issue với nhiều tương tác

**#2506 - Message Deduplication Bug** (3 comments)
- Agent responses bị drop khi turns hoàn thành < 60s apart
- Client timeout không có response
- **Tình trạng**: OPEN, chưa có PR fix

**#2711 - Ungated create_agent MCP Tool** (1 comment)
- `create_agent` được mark "admin-only" nhưng **không có gating thực tế**
- Bất kỳ container nào cũng có thể tạo agent groups
- **Mức độ nghiêm trọng**: HIGH - privilege escalation vector
- **Tình trạng**: OPEN, chưa có fix

**#2668 - No Per-tool Timeout** (1 comment)
- Một MCP tool hung có thể block session tới **30 phút**
- Không có granular timeout per tool call
- **Tình trạng**: OPEN, chưa có PR

---

## 🐞 Ổn định & Bugs

### ✅ Đã fix (PRs mở)

1. **SQLite corruption** - #2750 giải quyết journal recovery
2. **Discord attachments** - #2752 fix download flow
3. **Crash loop recovery** - #2670 self-heal corrupted sessions
4. **Pre-commit hook** - #2753 PATH handling

### ⚠️ Chưa giải quyết

1. **#2506** - Response deduplication silently drops messages (critical UX issue)
2. **#2711** - create_agent không có authorization check (security hole)
3. **#2668** - Hung tools block session quá lâu (no timeout)
4. **#2751** - Budget exhausted turns silently dropped (CLOSED nhưng không thấy PR fix)

### 🎯 Pattern nhận biết

- **SQLite journal issues** (#2516, #2640, #2750) - pattern về database integrity khi container bị kill
- **Silent failures** (#2506, #2751) - nhiều edge cases mà user không nhận được feedback
- **Authorization gaps** (#2711) - security model chưa hoàn chỉnh

---

## 💡 Yêu cầu tính năng

**Persistent Memory** (#2745)
- Scaffold cho long-term agent memory
- Opt-in per provider
- **Trạng thái**: PR đã mở, chưa merge

**Provider Capability System** (#2746)
- Pluggable architecture
- Declarative capabilities
- **Trạng thái**: PR đã mở, foundation work

**Multi-bot Telegram Support** (#2632)
- Làm rõ status của telegram swarm trong v2
- Migration path từ v1
- **Trạng thái**: Issue mở, chưa có roadmap rõ ràng

---

## 💬 Phản hồi người dùng

### 😤 Pain points

1. **Silent failures**: Users frustrated với responses bị drop không thông báo (#2506, #2751)
2. **Long waits**: 30-minute timeout khi tool hung là không chấp nhận được (#2668)
3. **Migration confusion**: Unclear v1→v2 migration path cho Telegram swarm (#2632)
4. **Security concerns**: Community phát hiện authorization holes (#2711)

### 😊 Positive signals

- Community actively reporting bugs với detailed reproduction steps
- Fast PR turnaround - 9 PRs trong 1 ngày
- Security-focused development (multiple hardening PRs)

---

## 🗓️ Backlog & Roadmap

### 🚨 High Priority (cần giải quyết sớm)

1. **Authorization model** - Fix #2711 và audit toàn bộ MCP tool permissions
2. **Silent failure handling** - Giải quyết #2506 và improve error visibility
3. **Timeout strategy** - Implement per-tool timeouts (#2668)

### 🔮 Foundational work in progress

- **Memory system** (#2745) - Long-term agent persistence
- **Provider capabilities** (#2746) - Extensibility architecture
- **OneCLI integration** (#2747) - SDK modernization

### 📍 Migration support needed

- **Telegram v1→v2** (#2632) - Documentation/tooling cho migration path

---

## 📊 Metrics & Health

- **PR velocity**: 9 PRs trong 1 ngày - **rất cao** 🚀
- **Issue closure**: 1 closed (không thấy PR tương ứng) - 🤔 cần theo dõi
- **Security focus**: 22% PRs về security (2/9) - **tích cực** ✅
- **Bug fix ratio**: 44% PRs là fixes (4/9) - dự án đang trong **stabilization phase**
- **Technical debt**: SQLite journal pattern cho thấy **architectural issues** cần refactor

---

## 🎯 Kết luận

NanoClaw đang trong **consolidation phase** sau v2 launch, với focus mạnh vào:
- 🛡️ **Security hardening** - container isolation, supply-chain protection
- 🔧 **Data integrity** - SQLite recovery, session reliability
- 🏗️ **Foundation work** - memory system, provider capabilities

**Điểm mạnh**: Fast response to security issues, active development
**Điểm yếu**: Silent failure patterns, authorization model gaps, migration documentation

**Outlook**: Dự án khỏe mạnh với development velocity cao, nhưng cần prioritize user-facing reliability issues (silent drops, timeouts) để improve production readiness.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo phân tích IronClaw - 13/06/2026

## 1. 🎯 Tóm tắt hôm nay

Ngày 13/06 tập trung vào **tái thiết kế cơ chế xử lý tin nhắn bị chặn** trong Reborn. Đội ngũ đã chuyển từ mô hình defer-and-drain phức tạp (#4812 - đã merge rồi revert) sang giải pháp đơn giản hơn: **từ chối rõ ràng với thông báo** thay vì park tin nhắn ở background. Đồng thời, có nhiều cải tiến UX cho WebChat v2 và cải thiện khả năng quan sát runtime.

## 2. 📦 Releases

Không có release chính thức trong 24h qua. PR #3708 (chore: release) vẫn đang mở với nhiều breaking changes pending cho các crate core.

## 3. 🚀 Tiến độ dự án

### Kiến trúc Messaging (Ưu tiên cao - Pivot lớn)

**🔄 Thay đổi chiến lược xử lý tin nhắn bị chặn:**

- **PR #4838** (OPEN): Thay thế toàn bộ cơ chế defer-and-drain bằng explicit rejection
  - Khi thread đang bận → reject ngay với thông báo rõ ràng
  - User là retry actor, không phải background process
  - Đơn giản hóa đáng kể so với mô hình trước

- **PR #4812** (CLOSED): DeferredBusy drain - đã merge nhưng được thay thế
  - Lý do revert: quá phức tạp, nhiều edge cases
  - Issues #4817, #4831, #4832, #4833 tracking các follow-ups đã không còn cần thiết

**💡 Insight**: Đây là pivot kỹ thuật quan trọng - đội ngũ đã nhận ra over-engineering và quay về giải pháp đơn giản hơn, đúng nguyên tắc "simple is better".

### Reborn Agent Improvements

**PR #4837** (OPEN): Gated final-answer nudge
- Khi agent kết thúc turn mà không có câu trả lời thực sự → thêm 1 model call cuối để tổng hợp
- Xử lý các trường hợp: empty reply, budget exhausted, NoProgressDetected
- Cải thiện trải nghiệm khi agent "bí"

**PR #4836** (OPEN): Runtime context về channels & delivery
- Model giờ biết channels nào đang connected, delivery target ở đâu, run nguồn gốc từ đâu
- Giải quyết vấn đề user testing: Slack connect xong nhưng model không biết để sử dụng
- Thêm `msg:runtime.*` context slice

### Attachments (Track lớn - đang dần hoàn thiện)

Chuỗi PRs liên quan #4644 vẫn đang progress:

- **PR #4738** (OPEN): WebChat v2 upload UX - UI layer
- **PR #4670** (OPEN): Bridge inbound bytes → AttachmentRefs
- **PR #4668** (OPEN): MountView-based storage landing
- **PR #4655** (OPEN): Transcript contract changes
- **PR #4654** (OPEN): Format registry - foundation

Track này đang được xây từ dưới lên (registry → contract → storage → extraction → UI), cho thấy kỷ luật kiến trúc tốt.

### Approval UX

**PR #4835** (OPEN): Persist "always allow" across threads
- Fixes #4825 - vấn đề UX lớn: approval không persist qua threads
- Bỏ `thread_id` khỏi scope key → approval apply cho tất cả threads của user
- Scope mới: `(tenant_id, user_id, agent_id?, project_id?)`

## 4. ⭐ Điểm nổi bật cộng đồng

### Issues có nhiều tương tác

**#4817** (3 comments): DeferredBusy follow-ups
- Tracking các design decisions bị defer
- Thảo luận về trusted-resubmit seam, stale-intent policy
- Hiện đã không còn liên quan do pivot #4838

**#4825** (3 comments): Always-allow approval persistence
- Vấn đề UX thực tế từ testers
- PR #4835 đã fix nhanh

### UX Issues từ WebChat v2

Một loạt issues từ @sunglow666 về WebChat v2 experience:

- **#4733** (CLOSED): Links mở trong tab hiện tại → gián đoạn chat
- **#4722** (CLOSED): Không hiển thị avatar/tên user & assistant
- **#4721** (CLOSED): PINNED section sai nghĩa (là active thay vì pinned)
- **#4723** (OPEN): Hover state chỉ highlight top border
- **#4823** (OPEN): Không có feedback khi delete running conversation fails

**💡 Insight**: Có một QA/tester tích cực đang file nhiều polish issues - dấu hiệu tốt cho chất lượng product.

## 5. 🐛 Ổn định & Bugs

### Security & Dependencies

**#4824** (OPEN) + **PR #4826** (CLOSED): RUSTSEC advisories
- 3 advisories mới cho postgres crates (CPU DoS, panic issues)
- Đã fix nhanh với patch-level updates
- CI đang fail trên mọi PRs → blocking merge queue

### Testing Infrastructure

**PR #4829** (OPEN): CI workflow cleanup
- Retire dormant `reborn-integration.yml`
- Thêm Reborn suites vào nightly deep CI
- Consolidate duplicate jobs

**PR #4830** (OPEN): Reborn E2E in merge queue
- Hiện tại merge queue chạy zero Reborn E2E → risk cao
- Thêm internal scope gating để run trong merge queue

**PR #4769** (CLOSED): QA use-case E2E suites
- Port manual QA workflow thành automated tests
- 22 tests mới, fully mocked, no external deps
- Foundation tốt cho regression prevention

### Slack Integration Issues

**PR #4777** (OPEN): Persist Slack connected state
- Fix reconnect loop - WebUI không reflect delivery connection state

**PR #4778** (OPEN): Slack as product-adapter extension
- Refactor Slack từ hardcoded built-in → extension manifest
- Consistent với kiến trúc extension

## 6. 🎨 Yêu cầu tính năng

### Observability

**#4828** + **PR #4836**: Runtime context exposure
- Model cần biết connected channels để đưa ra quyết định đúng
- Real-world feedback từ testers

**PR #4588** (OPEN): Trajectory observer + LLM injection
- Observability seams cho external hosts (nearai-bench)
- Support cho parity testing legacy vs reborn

### Recording/Replay

**PR #4773** (CLOSED): QA phrase trace recording
- Record real-model traces cho manual QA phrases
- Replay deterministically trong CI
- Pin tool choices & arguments
- Machinery đã merge, v1 harness coming next

## 7. 💬 Phản hồi người dùng

### Positive signals
- Tester @sunglow666 đang active file polish issues → product được dùng thật
- QA workflow đang được automated → tăng confidence
- Security-first mindset: RUSTSEC fix trong vài giờ

### Pain points được prioritize
1. **Approval persistence** (#4825) - UX friction lớn
2. **Blocked thread feedback** (#4811, #4838) - dead air experience
3. **Channel awareness** (#4828) - model không biết tools có sẵn
4. **WebChat v2 polish** - nhiều small UX issues

## 8. 📋 Backlog & Roadmap

### Near-term (Đang active)

**Attachments track** - gần hoàn thiện:
- Registry ✅
- Contract changes → ready for review
- Storage landing → in progress  
- Extraction & context folding → next
- UI integration → stacked

**Messaging architecture** - pivot hoàn tất:
- Simple rejection model (#4838) thay thế defer-drain
- Needs review & validation

### Deferred (từ PRs review comments)

**Từ #4817** (nếu quay lại defer-drain model):
- Trusted-resubmit seam design
- Stale-intent policy
- Startup sweep mechanism

**Filesystem optimization** (#4833):
- Per-thread DeferredBusy index
- Hiện tại không cần do pivot

**Batching** (#4832):
- Batch drained messages into single run
- Không apply cho rejection model

### Medium-term

**Hooks & Security** (từ @zmanian's PRs):
- PR #4561: MCP lease denials in audit sink
- PR #2341: File history memory bounds (từ April, vẫn open)
- Predicate state enforcement improvements

**Gateway improvements**:
- PR #2700: Descriptive chat titles (từ April)
- PR #2699: MCP normalization fixes (từ April)

---

## 🎯 Đánh giá tổng quan

**Velocity**: Cao - 50 PRs, 12 issues trong dataset

**Focus areas**: 
1. Messaging architecture refinement (pivot lớn)
2. Attachments foundation (systematic build-up)
3. UX polish cho WebChat v2
4. Testing & CI improvements

**Health signals**:
- ✅ Nhanh nhận ra over-engineering và pivot
- ✅ Systematic layering (attachments track)
- ✅ Active QA/testing feedback loop
- ✅ Security-first response (RUSTSEC)
- ⚠️ Nhiều old PRs từ April chưa merge (technical debt?)
- ⚠️ CI gaps (Reborn E2E không chạy trong merge queue)

**Trajectory**: Dự án đang mature - từ feature building chuyển sang polish, testing, và architecture refinement. Đội ngũ thể hiện kỷ luật kỹ thuật tốt khi sẵn sàng revert và simplify.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo phân tích LobsterAI - Ngày 2026-06-13

## 🎯 Tóm tắt hôm nay

LobsterAI đã hoàn tất việc merge release branch 2026.6.11 vào main, đánh dấu một bản phát hành quan trọng với tính năng **Computer Use MVP** và nhiều cải tiến về khả năng chia sẻ artifacts. Đội ngũ tập trung xử lý các vấn đề về text-to-image, voice input, và model selection trong ngày hôm nay. Đồng thời, hệ thống tự động đóng 6 PR stale liên quan đến các bản sửa lỗi từ đầu tháng 4.

---

## 🚀 Releases

**Không có release chính thức mới trong 24h qua**, nhưng PR #2158 cho thấy chuẩn bị phát hành **phiên bản 2026.6.12** với các điểm nhấn:

### ✨ Tính năng chính
- **🖥️ Computer Use MVP**: Tính năng cho phép AI điều khiển máy tính (tương tự Anthropic Claude Computer Use)
- **🎙️ Realtime ASR voice input**: Nhập liệu bằng giọng nói cho cowork prompts
- **🔗 HTML artifact sharing**: Hỗ trợ chế độ chia sẻ công khai có thể lựa chọn
- **🖼️ Image/SVG artifact sharing**: Mở rộng khả năng chia sẻ nội dung đa phương tiện

### 🔧 Cập nhật kỹ thuật
- Nâng cấp Computer Use runtime lên v1.0.7 (PR #2156) với UIA breadcrumbs để chẩn đoán helper exits

---

## 📈 Tiến độ dự án

### 🎯 Các PR được merge hôm nay (6 PRs)

#### 🐛 Sửa lỗi chất lượng cao
1. **PR #2157** - Sửa lỗi extension file khi lưu ảnh text-to-image
   - Vấn đề: PNG được lưu nhầm thành .jpg/.jpeg/.webp
   - Giải pháp: Detect định dạng thực tế từ file bytes và override extension sai từ server
   
2. **PR #2155** - Ngăn chặn duplicate realtime ASR starts
   - Xử lý race condition khi khởi động voice input nhiều lần

3. **PR #2154** - Hiển thị model metadata sau khi dừng streams
   - Đảm bảo thông tin model vẫn được giữ lại khi user dừng streaming manually

4. **PR #2153** - Bảo toàn model selection cho package trùng tên
   - Phân biệt package models và custom models có cùng ID
   - Thêm logs để tracking model selection flow

### 📦 Stale PRs (6 PRs bị đóng tự động)

Hệ thống đã đóng 6 PRs từ đầu tháng 4/2026 do không có hoạt động:

**🔴 PRs chất lượng cao bị bỏ lỡ:**
- **#1446** - Fix OpenClaw gateway infinite restart loop (critical bug)
- **#1453** - Fix disabled skills vẫn được inject vào prompts
- **#1449** - Scheduled tasks grouping/folding UI

**🟡 PRs về UX improvements:**
- **#1473-1477** - Series 5 PRs về unsaved changes confirmation cho các dialogs
- **#1448** - i18n fixes cho Agent settings
- **#1454** - Scheduled tasks date validation
- **#1456** - Shortcuts duplicate detection

### 📊 Xu hướng phát triển

```
Computer Use Integration ████████░░ 80% (runtime bumps, infrastructure sẵn sàng)
Voice/Multimodal Input   ███████░░░ 70% (ASR hoạt động, cần polish)
Artifact Sharing         █████████░ 90% (HTML/Image/SVG đều supported)
Bug Fixes & Polish       ██████░░░░ 60% (vẫn còn nhiều stale PRs chưa review)
```

---

## ⭐ Điểm nổi bật cộng đồng

### 🔥 Issue nổi bật
**Issue #1** - OpenAI API Type Error (CLOSED hôm qua)
- Tác giả: @simson2010
- Vấn đề: MiniMax API key test pass nhưng khi chuyển sang OpenAI message type bị lỗi 400
- Comments: 7 (tương tác khá tốt)
- **Trạng thái**: Đã đóng ngày 2026-06-12 → Có vẻ đã được giải quyết

### 📉 Tương tác cộng đồng
- **Không có PR/Issue nào có reactions** trong batch này
- **Không có comments nào** trên các PR mới (undefined comments)
- ⚠️ **Dấu hiệu**: Cộng đồng chưa tham gia review hoặc dữ liệu chưa đầy đủ

---

## 🐛 Ổn định & Bugs

### ✅ Bugs đã fix hôm nay
1. **Text-to-image file extension mismatch** (#2157)
   - Impact: User nhận file sai format
   - Priority: Medium
   
2. **Duplicate ASR start race condition** (#2155)
   - Impact: Voice input có thể bị duplicate
   - Priority: Medium

3. **Model metadata missing sau khi stop stream** (#2154)
   - Impact: Mất thông tin model usage
   - Priority: Low-Medium

4. **Package model selection bị ghi đè** (#2153)
   - Impact: User chọn model bị thay đổi không mong muốn
   - Priority: Medium

### ⚠️ Bugs bị bỏ lỡ (từ stale PRs)

**CRITICAL:**
- **OpenClaw gateway infinite restart loop** (#1446)
  - 3 race conditions gây crash liên tục
  - Ảnh hưởng: Toàn bộ app không hoạt động được

**HIGH:**
- **Disabled skills vẫn active** (#1453)
  - User tắt skill nhưng vẫn bị inject vào prompts
  - Ảnh hưởng: Unexpected behavior, waste tokens

**MEDIUM:**
- Input draft loss (#1476, #1471, #1472)
- Duplicate shortcuts (#1456)
- Date validation bugs (#1454)

---

## 💡 Yêu cầu tính năng

### ✨ Features đã implement (release 2026.6.12)
- ✅ Computer Use MVP
- ✅ Realtime ASR voice input
- ✅ Artifact public sharing modes
- ✅ Image/SVG artifact sharing

### 🔮 Features bị pending (từ stale PRs)
- **Scheduled tasks UI grouping** (#1449)
  - Fold multiple executions của cùng 1 job
  - Giảm clutter trong session list
  
- **Unsaved changes confirmations** (#1473-1477)
  - Ngăn data loss khi đóng dialogs
  - Standard UX pattern nhưng chưa được implement

---

## 💬 Phản hồi người dùng

### 🗣️ Từ Issue #1 (OpenAI API Error)
**Platform**: macOS 13.7.8, Intel Mac 2017

**User flow**:
1. Config MiniMax API → Test passed ✅
2. Switch to OpenAI message type → Save
3. Nhập task trong Chat → API Error 400 ❌

**Kết quả**: Issue đã đóng sau 7 comments → Giải pháp đã tìm được

### 📊 Sentiment Analysis
- **Positive**: Features mới (Computer Use, Voice) được đẩy nhanh
- **Negative**: Nhiều bug fixes quality cao bị stale do không có reviewer
- **Neutral**: Release cadence ổn định (2026.6.11 → 2026.6.12)

---

## 🗓️ Backlog & Roadmap

### 📋 Technical Debt hiện tại

**🔴 Priority 1 - Cần xử lý ngay**
```
- OpenClaw gateway stability (#1446) - ẢNH HƯỞNG NGHIÊM TRỌNG
- Skills lifecycle bugs (#1453) - Token waste, wrong behavior
```

**🟡 Priority 2 - Cần review lại**
```
- 6 stale PRs về UX improvements (unsaved changes, i18n, validation)
- Input draft persistence issues
- Shortcuts management bugs
```

**🟢 Priority 3 - Nice to have**
```
- Scheduled tasks UI optimization
- Better logging/observability (đã bắt đầu với #2153, #2154)
```

### 🛣️ Roadmap suy đoán

**Q2 2026 (hiện tại)**
- ✅ Computer Use MVP launch
- ✅ Voice input integration
- 🔄 Bug fixes & stability improvements

**Q3 2026 (dự kiến)**
- 🔮 Computer Use feature expansion
- 🔮 Advanced multimodal capabilities
- 🔮 Technical debt cleanup

---

## 🎯 Khuyến nghị

### Cho đội ngũ phát triển:
1. **⚡ Urgent**: Review và reopen PR #1446 (gateway restart loop) - đây là critical bug
2. **🔍 Review process**: 6 PRs quality cao bị stale → cần cải thiện review bandwidth
3. **📝 Documentation**: Thêm release notes chi tiết cho Computer Use feature
4. **🧪 Testing**: Tăng cường regression tests (nhiều PRs có test coverage tốt)

### Cho contributor:
1. **💪 Opportunity**: Nhiều stale PRs có thể được revive hoặc reimplemented
2. **🎯 Focus areas**: Stability, UX polish, i18n
3. **📢 Communication**: Engage với maintainers khi PR bị stale

---

**📌 Kết luận**: LobsterAI đang trong giai đoạn phát triển tích cực với features lớn (Computer Use) nhưng cần chú ý hơn đến code review process và technical debt management để tránh mất đi những contributions quality cao từ cộng đồng.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo phân tích dự án Moltis - 13/06/2026

## 🎯 Tóm tắt hôm nay

Hoạt động tương đối yên ắng với 3 issues đang mở, không có PR hay release mới. Cộng đồng đang tập trung vào việc mở rộng khả năng hạ tầng (Kubernetes sandbox) và cải thiện tính năng voice assistant (STT engine). Xuất hiện một bug liên quan đến tích hợp Fastmail MCP cần được xử lý.

---

## 🚀 Releases

**Không có release mới trong ngày hôm nay**

---

## 📈 Tiến độ dự án

### Pull Requests
- **Không có PR mới hoặc cập nhật** - dự án đang trong giai đoạn tập hợp feedback và lên kế hoạch tính năng

### Issues quan trọng
**3 issues đang mở**, phản ánh 2 hướng phát triển chính:

1. **Mở rộng hạ tầng backend** (#1118)
2. **Cải thiện voice capabilities** (#1102)  
3. **Sửa lỗi tích hợp** (#1115)

### Xu hướng
- Dự án đang hướng tới **production-ready infrastructure** với khả năng chạy trên Kubernetes
- Tập trung vào **multimodal AI** thông qua voice assistant features
- Mở rộng hệ sinh thái tích hợp (MCP servers)

---

## ⭐ Điểm nổi bật cộng đồng

### Đề xuất nổi bật: Kubernetes Sandbox Backend (#1118)
**Tác giả:** @AzgadAGZ | **Tương tác:** 1 comment

Đây là đề xuất có tính kỹ thuật cao nhất trong batch này:

**Điểm mạnh của đề xuất:**
- 🔐 **Isolation mạnh mẽ** - Support VM-level isolation qua Kata Containers/gVisor
- 🏢 **Enterprise-ready** - Phù hợp với môi trường production đã dùng K8s
- 🔧 **Linh hoạt** - Cho phép custom runtime thông qua `runtimeClassName`
- 📦 **Resource control** - Tận dụng resource limits/quotas của K8s

**Kiến trúc đề xuất:**
```yaml
sandbox:
  backend: kubernetes
  kubernetes:
    namespace: moltis-sandbox
    runtimeClassName: kata  # Kata/gVisor/etc
    resourceLimits: {...}
```

**Ý nghĩa:** Nếu được implement, Moltis sẽ có khả năng chạy an toàn trong môi trường doanh nghiệp với isolation cấp VM, mở đường cho use cases nhạy cảm hơn.

---

## 🐛 Ổn định & Bugs

### Bug #1115: Fastmail MCP Authorization
**Trạng thái:** 🔴 Đang chờ xử lý | **Độ ưu tiên:** Trung bình

**Vấn đề:**
- Người dùng gặp lỗi khi authorize Fastmail MCP server
- Có 2 comments trao đổi nhưng chưa có solution

**Tác động:**
- Ảnh hưởng đến khả năng tích hợp email workflow
- Chặn người dùng muốn sử dụng Fastmail integration

**Đánh giá:** Bug này cần được ưu tiên vì ảnh hưởng đến user experience với MCP ecosystem - một trong những điểm mạnh của Moltis.

---

## 💡 Yêu cầu tính năng

### Feature #1102: FunASR/SenseVoice STT Engine
**Tác giả:** @LauraGPT | **Trạng thái:** Đang thảo luận

**Đề xuất:**
Thêm FunASR hoặc SenseVoice làm local STT engine với các ưu điểm:

✨ **Lợi ích chính:**
- ⚡ **Ultra-fast:** SenseVoice xử lý 10s audio chỉ trong ~70ms
- 🌊 **Native streaming:** Paraformer-streaming cho real-time transcription
- 🌍 **Multilingual:** Support 50+ ngôn ngữ (quan trọng cho thị trường châu Á)
- 🔒 **Privacy-first:** Chạy hoàn toàn local, không gửi data ra ngoài
- 💰 **Cost-effective:** Không phụ thuộc vào API trả phí

**So sánh với giải pháp hiện tại:**
- Nhanh hơn nhiều so với Whisper
- Nhẹ hơn, phù hợp với deployment edge
- Được tối ưu cho tiếng Trung và các ngôn ngữ châu Á

**Đánh giá:** Đề xuất rất có giá trị, đặc biệt cho users ở châu Á và những ai quan tâm đến privacy. Nếu implement, sẽ tăng đáng kể khả năng cạnh tranh của Moltis trong phân khúc voice AI.

---

## 💬 Phản hồi người dùng

### Mức độ tương tác
- **Tương tác thấp:** Các issues chỉ có 0-1 👍, 1-2 comments
- **Chất lượng đề xuất cao:** Mặc dù ít tương tác nhưng các issues đều có technical depth tốt

### Insights
1. **User base đa dạng:**
   - Enterprise users quan tâm K8s deployment (#1118)
   - Privacy-conscious users muốn local-first solutions (#1102)
   - Integration users gặp friction với MCP (#1115)

2. **Pain points:**
   - Thiếu production-grade sandbox options
   - Voice capabilities còn hạn chế
   - Integration stability cần cải thiện

---

## 🗺️ Backlog & Roadmap

### Backlog hiện tại (từ issues)

**🔴 Ưu tiên cao:**
- Fix Fastmail MCP authorization (#1115)

**🟡 Ưu tiên trung bình:**
- Kubernetes sandbox backend (#1118)
- FunASR/SenseVoice STT integration (#1102)

### Roadmap suy luận

**Q2-Q3 2026 (dự kiến):**

**Phase 1: Stability & Integration** 🔧
- Sửa các bugs tích hợp MCP
- Cải thiện documentation cho MCP servers
- Tăng test coverage cho integrations

**Phase 2: Enterprise Features** 🏢
- Implement Kubernetes sandbox backend
- Enhanced security & isolation options
- Multi-tenant capabilities

**Phase 3: Multimodal Enhancement** 🎤
- Local STT engine integration (FunASR/SenseVoice)
- Improved voice assistant capabilities
- Multilingual support expansion

---

## 📊 Đánh giá tổng quan

### Điểm mạnh
✅ Cộng đồng đóng góp ideas có technical depth cao  
✅ Đa dạng hóa use cases (enterprise, edge, privacy-focused)  
✅ Focus vào production-readiness

### Thách thức
⚠️ Tốc độ phát triển chậm (không có PR mới)  
⚠️ Tương tác cộng đồng thấp  
⚠️ Bugs chưa được xử lý nhanh

### Khuyến nghị
1. **Tăng tốc độ review & merge** để maintain momentum
2. **Ưu tiên fix bugs** trước khi thêm features mới
3. **Engage nhiều hơn với community** để tăng contributor base
4. **Rõ ràng roadmap** để community biết hướng phát triển

---

**Kết luận:** Moltis đang trong giai đoạn chuyển mình từ prototype sang production-grade platform. Các đề xuất feature chất lượng cao nhưng cần team có strategy rõ ràng và resources để execute.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo Phân tích CoPaw (QwenPaw) - Ngày 2026-06-13

## 📊 Tóm tắt hôm nay

Hôm nay CoPaw tập trung vào việc ổn định phiên bản 1.1.11 với nhiều bugfix được merge, đồng thời chuẩn bị cho phiên bản beta 1.1.12. Dự án đang trong giai đoạn chuyển đổi lớn với kế hoạch nâng cấp lên AgentScope 2.0 và triển khai kiến trúc Runtime 2.0. Có 23 issues mới/được cập nhật và 27 PR đang hoạt động, phản ánh một cộng đồng phát triển tích cực.

## 🚀 Releases

Không có release chính thức trong 24h qua, nhưng đội ngũ đang chuẩn bị:
- **v1.1.12.beta1**: PR #5159 đã được tạo để bump version, đang chờ merge
- Tập trung vào việc ổn định các tính năng mới trước khi release

## 📈 Tiến độ dự án

### Các PR quan trọng đã merge/closed:

**Bugfixes quan trọng:**
- ✅ **#5144**: Sửa lỗi mất cấu hình memory khi lưu mà không mở rộng panel (closed - đã merge)
- ✅ **#5147**: Sửa lỗi session bị redirect sai khi chuyển sang Coding mode (closed)
- ✅ **#5154**: Cải thiện hiển thị kết quả memory search tool (closed)
- ✅ **#5141**: Sửa loading spinner thiếu cho shell commands và tool chưa đăng ký (open - đang review)

**Cải tiến UX:**
- ✅ **#5150**: Thêm hỗ trợ `accept_bot_messages` và config từ env cho Yuanbao channel
- ✅ **#5160**: Hỗ trợ quoted messages và thống nhất pipeline download media cho Yuanbao
- 🔄 **#5130**: Thêm popover hiển thị token usage và context usage cho mỗi lượt chat (open - đang review)

**Kiến trúc & Infrastructure:**
- 🔄 **#5078**: Runtime 2.0 - Kiến trúc module hóa với enhanced tool-call coordination (open - breaking change)
- 🔄 **#5067**: Agent OS Driver - Lớp trừu tượng thống nhất cho MCP/A2A/ACP (open - đang review)
- 🔄 **#4900**: Tách rời plugin loader khỏi agent startup để hỗ trợ PyInstaller/Tauri (open)
- ✅ **#5121**: Thêm release verification gate cho CI/CD pipeline (closed - đã merge)

**Desktop Client:**
- 🔄 **#5153**: Tối ưu instant-window startup cho pywebview client như Tauri
- ✅ **#5028**: Isolate keychain master key per install để tránh xung đột (closed)
- ✅ **#5036**: Sửa session filename duplication và inter-agent call failures trên Windows (open)

### Xu hướng phát triển:

1. **Modularization**: Đang chuyển từ kiến trúc monolithic sang modular (Runtime 2.0, Agent OS Driver)
2. **Multi-platform stability**: Tập trung cải thiện trải nghiệm trên Windows desktop client
3. **Channel expansion**: Tiếp tục hoàn thiện các channel như Yuanbao, đề xuất thêm Slack
4. **Observability**: Cải thiện Langfuse integration (#5127, #5128)

## 🔥 Điểm nổi bật cộng đồng

**Issues hot nhất:**

1. **#4727** (👍 2) - Yêu cầu nâng cấp lên AgentScope 2.0 - Đây là breaking change lớn đang được cộng đồng theo dõi chặt chẽ

2. **#5139** (3 comments) - Yêu cầu tính năng Agent Team/Swarm collaboration (như WorkBuddy, JiuwenSwarm) - Đây là hướng phát triển quan trọng cho collaborative AI

3. **#5167** (mới nhất) - Phản hồi về hiệu năng kém của Feishu CardKit streaming trong trường hợp reply dài - Vấn đề UX thực tế ảnh hưởng đến khả năng sử dụng

4. **#5156** - Đề xuất hỗ trợ `kimi-for-coding` trong whitelist - Nhu cầu tích hợp với các LLM model mới

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đã được fix:

- ✅ Mất config memory khi save (#5137, #5144) - **Đã fix**
- ✅ Session redirect sai trong Coding mode (#5142, #5147) - **Đã fix**
- ✅ Hiển thị memory search results (#5098, #5154) - **Đã fix**
- ✅ Attachment download lỗi cho docx/pdf (#5140) - **Đã fix** trong v1.1.11.post2

### Bugs đang được xử lý:

- 🔴 **#5064** - Agent-generated định kỳ tasks không trigger được (invalid tag - có thể lỗi config)
- 🔴 **#5138** - Windows client process tăng liên tục, RAM đến 90%+ - **Nghiêm trọng**
- 🔴 **#5161** - QwenPaw không response sau long conversation - Có thể liên quan đến context window
- 🔴 **#5162** - Agent rơi vào infinite loop trong reasoning
- 🔴 **#5163** - Gemini tool calling regression từ v1.1.10 → v1.1.11 - **Breaking regression**
- 🔴 **#5148** - Hiển thị math formula (√) sai trong web UI (#5143 duplicate) - **Đã fix** (closed)

### Vấn đề môi trường:

- 🟡 **#5166** - Python 3.13 không cài đặt được TeamChat plugin (thiếu module `imghdr`)
- 🟡 **#5165** - White screen sau khi pack bằng PyInstaller (thiếu modules)

## 💡 Yêu cầu tính năng

### Tính năng được đề xuất nhiều:

1. **Agent Collaboration** (#5139)
   - Team/Swarm workflow như WorkBuddy Expert Team
   - Multiple agents phối hợp giải quyết complex tasks
   - Có tính khả thi cao, phù hợp với hướng phát triển agent ecosystem

2. **Channel mới:**
   - **Slack support** (#5152) - Nhu cầu từ enterprise users
   - **Kimi-for-coding whitelist** (#5156) - Tận dụng subscription hiện có

3. **Desktop improvements** (#5164)
   - System tray
   - Startup on boot
   - Background service management
   - Run as service
   → Đưa QwenPaw lên ngang tầm production desktop app

4. **Visual model fallback** (#5069 - PR đang open)
   - Cho phép text-only models sử dụng visual model phụ để transcribe images
   - Mở rộng khả năng multimodal

5. **Token usage tracking** (#5130 - PR đang open)
   - Per-turn token và context usage
   - Popover với visualization
   - Giúp users theo dõi chi phí và optimize prompts

## 👥 Phản hồi người dùng

### Trải nghiệm tích cực:

- Cộng đồng đánh giá cao tốc độ fix bugs (nhiều issues được close trong ngày)
- Plugin system được quan tâm (DataPaw plugin #4622 đang review)
- Langfuse integration được cải thiện (#5128)

### Pain points chính:

1. **Performance issues**:
   - Long conversation → timeout (#5161)
   - Windows client memory leak (#5138)
   - Feishu CardKit streaming chậm với long replies (#5167)

2. **Packaging & deployment**:
   - PyInstaller/Tauri issues (#5165, #4900)
   - Python 3.13 compatibility (#5166)
   - Desktop client stability trên Windows

3. **Regression concerns**:
   - Gemini tool calling broken trong v1.1.11 (#5163)
   - User lo ngại về stability khi upgrade

### Đề xuất từ users:

- @wjt0321: "Feishu streaming khi reply dài rất chậm, có thể optimize bằng cách batch updates"
- @tecgic: "Long conversation bị stuck, có thể cần implement context compression"
- Multiple users: "Cần system tray và background service cho desktop app"

## 📋 Backlog & Roadmap

### Near-term (Sprint hiện tại):

**Đang triển khai:**
- ✅ Stabilize v1.1.11.post2
- 🔄 Release v1.1.12.beta1
- 🔄 Release verification CI gate (#5121)
- 🔄 Plugin loader decoupling (#4900)

**Ưu tiên cao:**
- Fix Windows memory leak (#5138)
- Fix long conversation timeout (#5161)
- Fix Gemini regression (#5163)
- Improve Feishu streaming performance (#5167)

### Mid-term (1-2 tháng):

**Breaking changes:**
- 🎯 **AgentScope 2.0 migration** (#4727) - Đây là migration lớn nhất
- 🎯 **Runtime 2.0** (#5078) - Kiến trúc modular mới
- 🎯 **Agent OS Driver** (#5067) - Unified abstraction cho MCP/A2A/ACP

**Major features:**
- Agent Team/Swarm collaboration (#5139)
- DataPaw plugin integration (#4622)
- Visual model fallback (#5069)
- Slack channel (#5152)

### Long-term:

**Infrastructure:**
- Governance & sandbox interface (#5088)
- Enhanced security isolation
- Production-ready desktop client với system tray, auto-start

**Ecosystem:**
- More channel integrations
- More plugin bundles
- Agent marketplace/registry (implied by team collaboration needs)

---

## 🎯 Đánh giá tổng quan

**Điểm mạnh:**
- Tốc độ phát triển và fix bugs nhanh (11 PRs closed trong 24h)
- Cộng đồng tích cực với nhiều first-time contributors
- Roadmap rõ ràng hướng đến AgentScope 2.0

**Thách thức:**
- Performance và stability issues trên Windows desktop
- Breaking changes lớn đang đến (AS 2.0, Runtime 2.0)
- Cần balance giữa new features và stability

**Khuyến nghị:**
- Ưu tiên fix critical bugs (#5138, #5161, #5163) trước khi release v1.1.12
- Cân nhắc release cycle rõ ràng hơn để giảm regression
- Tăng cường testing cho Windows desktop client

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo phân tích GoClaw - 13/06/2026

## 🎯 Tóm tắt hôm nay

Một ngày tập trung vào **bảo mật và UX**: Nhóm phát triển nhận được 6 báo cáo lỗ hổng bảo mật nghiêm trọng từ @YLChen-007 liên quan đến cơ chế `exec` approval và SSRF protection. Đồng thời, có 2 PR cải thiện trải nghiệm người dùng (mobile setup scrolling và webhook management UI). Đây là tín hiệu quan trọng về việc dự án đang được kiểm tra bảo mật kỹ lưỡng trước khi mở rộng.

## 📦 Releases

Không có releases mới trong ngày hôm nay.

## 🚀 Tiến độ dự án

### Pull Requests đang mở

**#1220 - Mobile Setup Page Scrolling Fix** ✅
- **Tác giả**: @bclermont
- **Vấn đề**: Trang setup không scroll được trên mobile, buộc user phải zoom out
- **Giải pháp**: Sửa SetupLayout component, loại bỏ `items-center justify-center` gây conflict với scrolling
- **Đánh giá**: Bug UX quan trọng ảnh hưởng onboarding experience, fix nhanh trong 1 ngày

**#1211 - Webhook Management UI** 🎨
- **Tác giả**: @thotam
- **Nội dung**: Giao diện quản lý webhooks hoàn chỉnh với delivery history và test function
- **Phạm vi**: Frontend + backend endpoints mới, không thay đổi schema
- **Ý nghĩa**: Nâng cấp đáng kể khả năng integration và monitoring cho admin

### Xu hướng phát triển

- **UX Polish**: Tập trung cải thiện chi tiết trải nghiệm (mobile responsiveness, admin tools)
- **Integration Features**: Mở rộng khả năng tích hợp với hệ thống bên ngoài qua webhooks
- **Security Hardening**: Phản ứng tích cực với báo cáo bảo mật (xem phần tiếp theo)

## 🔐 Ổn định & Bugs - CẢNH BÁO BẢO MẬT

### ⚠️ 6 lỗ hổng bảo mật nghiêm trọng được báo cáo (tất cả từ @YLChen-007)

**Nhóm 1: Exec Approval Bypass (4 issues)**

1. **#1216 - Path-scoped Executable Bypass**
   - Tấn công: Reuse basename đã được `allow-always` với executable khác
   - Impact: Chạy binary độc hại mà không cần approval lại

2. **#1215 - PowerShell EncodedCommand Bypass**
   - Tấn công: Dùng `-EncodedCommand` để bypass grant enforcement
   - Impact: Thực thi lệnh PowerShell tùy ý qua secure-CLI gate

3. **#1214 - Sort Command File Write**
   - Tấn công: Lợi dụng `sort -o` (safe-bin trusted) để ghi file
   - Impact: Ghi đè file system mà không cần approval

4. **#1213 - Workspace Binary Collision**
   - Tấn công: Basename collision giữa host command và workspace binary
   - Impact: Operator trigger host command execution qua workspace

**Nhóm 2: Approval Cache Issues**

5. **#1212 - BusyBox Trust Reuse**
   - Tấn công: `allow-always` cho BusyBox được reuse cho các shell payload khác nhau
   - Impact: Bypass re-approval requirement

**Nhóm 3: Network Security**

6. **#1218 - SSRF Protection Bypass**
   - Tấn công: Dùng special-use IPv4 range `198.18.0.0/15` bypass IP classification
   - Impact: Truy cập internal services qua `web_fetch` tool

**Nhóm 4: Authorization Issues**

7. **#1217 - Cross-Agent Authorization Bypass**
   - Tấn công: Operator với `operator.write` privilege gọi `/v1/tools/invoke` để bind cron vào agent khác
   - Impact: Unauthorized cron binding to foreign agents

### 🎯 Phân tích chuyên sâu

**Điểm chung**: Tất cả lỗ hổng tập trung vào **exec approval mechanism** và **tool invocation security**. Đây là hệ thống core cho phép AI agent thực thi lệnh trên host.

**Mức độ nghiêm trọng**: 
- **Critical**: #1213, #1216, #1217 (RCE và authorization bypass)
- **High**: #1212, #1214, #1215, #1218 (privilege escalation và SSRF)

**Root cause pattern**:
1. Trust model quá đơn giản (basename-only matching)
2. Safe-bin allowlist thiếu context-aware
3. Approval cache không đủ granular
4. Network boundary validation incomplete

**Khuyến nghị**:
- Cần refactor toàn bộ exec approval system với full-path + args hashing
- Implement proper SSRF protection với whitelist approach
- Add per-agent authorization scope checking
- Security audit toàn diện trước release tiếp theo

## 🔧 Vấn đề UX đang được xử lý

**#1219 - Setup Page Mobile Scrolling**
- **Impact**: First-time user experience bị ảnh hưởng nghiêm trọng trên mobile
- **Status**: Đã có PR #1220 fix trong vòng 24h
- **Response time**: Xuất sắc, cho thấy team responsive với UX issues

## 💡 Yêu cầu tính năng

**Webhook Management (#1211)**
- **Nhu cầu**: Admin cần monitor và debug webhook deliveries
- **Features**:
  - Delivery history tracking
  - Server-side test invocation
  - UI dashboard hoàn chỉnh
- **Architecture**: Reuse existing migrations, không gây breaking changes

## 👥 Phản hồi người dùng

### Positive signals:
- @bclermont tự phát hiện và fix UX issue ngay, cho thấy team actively sử dụng product
- @thotam contribute feature lớn (webhook UI), ecosystem đang phát triển

### Security researcher engagement:
- @YLChen-007 đang thực hiện security audit toàn diện
- 7 issues trong 1 ngày cho thấy đây là coordinated disclosure
- Chất lượng báo cáo rất cao (PoC, root cause, impact analysis)

## 📋 Backlog & Roadmap

### Ưu tiên cao (dựa trên activity):

1. **Security hardening** 🔴
   - Fix 7 lỗ hổng exec/tool invocation
   - Redesign approval mechanism
   - Complete security audit
   - **ETA**: Critical, cần hotfix trong tuần

2. **UX polish** 🟡
   - Mobile responsiveness (in progress)
   - Onboarding flow optimization
   - **ETA**: Sẽ merge trong vài ngày

3. **Admin tooling** 🟢
   - Webhook management UI (in review)
   - Monitoring và debugging capabilities
   - **ETA**: Feature complete, chờ review

### Insight chiến lược:

GoClaw đang ở giai đoạn **pre-production hardening**. Việc nhận được comprehensive security audit là dấu hiệu tích cực - team đang làm đúng việc kiểm tra kỹ trước khi scale. Tuy nhiên, số lượng lỗ hổng cho thấy **exec approval system cần được thiết kế lại từ đầu** thay vì patch từng case.

Khuyến nghị cho maintainers:
- Pause feature development, focus 100% vào security fixes
- Consider security bounty program formalization
- Add automated security testing trong CI/CD
- Document threat model và security boundaries rõ ràng

---

**📈 Tổng kết**: Một ngày quan trọng cho dự án - phát hiện được các vấn đề bảo mật nghiêm trọng đồng thời vẫn tiếp tục cải thiện UX. Quyết định xử lý security issues như thế nào sẽ quyết định độ tin cậy của GoClaw trong cộng đồng.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Báo cáo Phân tích Hermes-Agent - Ngày 13/06/2026

## 📊 Tóm tắt hôm nay

Hermes-Agent đang trải qua một đợt sửa lỗi và tối ưu hóa mạnh mẽ với **50 PRs** và **9 issues mới** trong 24 giờ qua. Các nhà phát triển tập trung vào việc ổn định hóa các platform adapters (Telegram, WhatsApp, Slack, BlueBubbles), sửa các lỗi nghiêm trọng trong hệ thống delegation và cron job, đồng thời cải thiện đáng kể hiệu năng GUI desktop. Không có release chính thức nhưng tốc độ phát triển cho thấy một phiên bản ổn định sắp được phát hành.

## 🚀 Releases

**Không có release mới trong 24 giờ qua** - tuy nhiên với số lượng bug fixes và performance improvements hiện tại, có khả năng một patch release sẽ sớm được phát hành để đóng gói các cải tiến quan trọng.

## 🔧 Tiến độ dự án

### Các PR quan trọng đang được xử lý:

**🎯 Performance & UX**
- **#45343** - Cải thiện hiệu năng GUI desktop: Giảm độ trễ streaming/interaction từ 28-38 FPS lên **56 FPS**, thời gian blocked giảm từ 2-5.2s xuống dưới 0.5s. Đây là bước đột phá về trải nghiệm người dùng desktop.
- **#44896** - Giảm thời gian phản hồi WhatsApp: Thay đổi debounce delay từ 5-10s xuống **0.3-2.0s** để khớp với Telegram, cải thiện đáng kể TTFT (Time To First Token).

**🔐 Security & Stability**
- **#44743** - SSRF guard cho `save_url_image`: Bảo vệ khỏi các URL độc hại từ image generation providers, ngăn chặn truy cập vào mạng nội bộ.
- **#44898** - Xử lý zombie PIDs trong gateway: Sửa crash loop khi chạy dưới systemd với `Restart=always`.

**🤖 AI Agent Core**
- **#45301** - Sửa lỗi delegation model bị bỏ qua: Subagents không tôn trọng configured delegation model trong long-running sessions, dẫn đến chi phí API không kiểm soát.
- **#44897** - Kiến trúc bộ nhớ giống con người: Thêm working memory layers với prompt-cache safety.
- **#44906** - Model override cho delegate_task: Cho phép chạy subagents trên model khác với parent agent.

**🔌 Platform Integrations**
- **#16769** - Nostr NIP-17 adapter: Tích hợp giao thức phi tập trung Nostr, cho phép tương tác qua encrypted DMs.
- **#44903** - Cải thiện Telegram topic routing và busy-session queue UX.
- **#44886** - Sửa Feishu group messages bị drop trong WebSocket mode.

**⚙️ Cron & Task Management**
- **#44893** - Kanban: Children của cancelled tasks được promoted thay vì blocked vĩnh viễn.
- **#44895** - Kanban: Tasks với result recorded không bị respawn lại.
- **#44899** - Dispatcher stuck detection loại trừ respawn-guarded tasks.

## 💬 Điểm nổi bật cộng đồng

### Issues được quan tâm:

1. **#45226** - Desktop crashes trên Windows: Bug nghiêm trọng với GPU process crash (`exit_code=-2147483645`) trên Intel integrated graphics. Đã có PR fix #45341 với `--no-angle` flag.

2. **#45342** - Language switcher mất tích: Component không render trong Desktop Electron app. Vấn đề UX ảnh hưởng trải nghiệm đa ngôn ngữ.

3. **#45336** - TUI routing bug: Follow-up prompts bị route vào delegated child session thay vì parent session, gây confusion nghiêm trọng.

4. **#45335** - Cron edit --profile bug: Command trả về "Job not found" cho tất cả jobs khi dùng với `--profile` flag.

### Xu hướng đóng góp:

- Cộng đồng đang tích cực report và fix bugs trên các platform adapters khác nhau
- Nhiều PRs tập trung vào developer experience (DX) và debugging tools
- Quan tâm đến memory management và cost optimization cho AI operations

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng (P1/P2):

**Desktop/GUI:**
- GPU crash trên Windows với older Intel graphics drivers → **Fixed** (#45341)
- Thread re-render gây unmount components → **Fixed** (#44884)
- Session list không refresh sau delete/archive → **Fixed** (#44901)

**Gateway/Platform:**
- BlueBubbles webhook không hoạt động với IPv4 loopback → **Patched**
- Telegram topic routing và busy-session handling → **Improved** (#44903)
- WhatsApp phản hồi chậm 5s → **Fixed** (#44896)
- Feishu group messages dropped → **Fixed** (#44886)

**Core Agent:**
- Delegation model config bị ignore → **Critical fix** (#45301)
- Copilot provider identity bị mất khi có base URL → **Fixed** (#45330)
- Auxiliary client async close warnings → **Fixed** (#45337)

**Cron/Kanban:**
- Cancelled parent tasks block children → **Fixed** (#44893)
- Respawn guard không check result existence → **Fixed** (#44895)
- Profile flag trong cron edit không hoạt động → Đang chờ fix

### Pattern nhận diện:

Phần lớn bugs tập trung vào **integration points** (platform adapters, delegation system) và **state management** (session persistence, task lifecycle), cho thấy hệ thống đang mở rộng nhanh và cần consolidation phase.

## ✨ Yêu cầu tính năng

### Tính năng mới đang phát triển:

1. **Human-like memory architecture** (#44897) - Multi-layer memory system với working memory, semantic records, và episode tracking. Thiết kế conservative với prompt-cache safety.

2. **Nostr integration** (#16769) - Hỗ trợ giao thức phi tập trung, cho phép Hermes hoạt động trên infrastructure censorship-resistant.

3. **Kanban blackboard structured keys** (#44891) - Naming helpers cho swarm coordination, cải thiện collaboration giữa multiple agents.

4. **HQ harness evidence dashboard** (#45305) - Validation và reporting infrastructure cho quality assurance.

5. **plur memory provider** (#45331) - YAML+git-backed persistent memory cho cross-device context sync.

### Feature requests từ users:

- Cải thiện language switching UX (#45342)
- Model override flexibility cho delegation (#44906)
- Better OAuth fallback mechanisms (#45339)

## 📣 Phản hồi người dùng

### Trải nghiệm tích cực:

- Desktop performance improvements được đánh giá cao (FPS tăng gấp đôi)
- Cộng đồng active trong việc report bugs với detailed reproduction steps
- Nhiều contributors độc lập đóng góp fixes cho platform-specific issues

### Điểm đau chính:

1. **Windows compatibility**: GPU crashes và driver issues gây friction lớn cho Windows users
2. **Configuration complexity**: Nhiều env vars và config options không được document đầy đủ
3. **Delegation cost control**: Users báo cáo chi phí API không mong đợi khi delegation model config bị ignore
4. **Platform-specific quirks**: Mỗi messaging platform có behaviors riêng (Telegram topics, Slack home channels, WhatsApp debounce, etc.)

### Feedback về documentation:

- #45344 highlight việc thiếu documentation cho Slack env vars
- Users đang tự discover features thông qua code reading thay vì docs

## 🗺️ Backlog & Roadmap

### Dựa trên pattern của PRs và issues:

**Immediate priorities (đang active):**
- ✅ Stabilize desktop experience across platforms (Windows, macOS, Linux)
- ✅ Improve platform adapter reliability (Telegram, WhatsApp, Slack, Feishu, BlueBubbles)
- ✅ Fix delegation and cron system critical bugs
- ⏳ Complete memory architecture implementation
- ⏳ Improve configuration documentation

**Medium-term (có PRs draft/WIP):**
- HQ harness integration cho quality metrics
- Nostr protocol support cho decentralized deployments
- Enhanced kanban/swarm coordination primitives
- Cost optimization tools cho multi-model delegation

**Long-term indicators:**
- Focus tăng dần vào **multi-agent coordination** (swarm, kanban, blackboard patterns)
- **Memory persistence** và cross-device sync becoming first-class concerns
- **Platform diversity** - mở rộng sang nhiều messaging platforms và protocols
- **Enterprise features** - OAuth, SSO, audit logging, cost controls

### Technical debt đang được address:

- Zombie process handling trong systemd environments
- Async/await patterns trong cache management
- Type safety cho UI elements (computer use)
- Secret redaction edge cases (shell substitutions)

---

## 🎯 Kết luận

Hermes-Agent đang trong **consolidation phase** sau một giai đoạn feature growth nhanh. Team đang methodically address stability issues, improve platform integrations, và build out infrastructure cho advanced multi-agent capabilities. Với 50 PRs trong một ngày, velocity rất cao nhưng focus rõ ràng vào quality và user experience. Kỳ vọng một stable release sắp tới sẽ consolidate những improvements này.

**Risk factors:** Configuration complexity đang tăng, cần có better documentation và defaults. Multi-platform support tạo ra maintenance overhead đáng kể.

**Opportunities:** Memory architecture và multi-agent coordination features có potential lớn để differentiate Hermes trong competitive AI agent landscape.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*