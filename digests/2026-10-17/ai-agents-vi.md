# Bản tin Hệ sinh thái Hermes Agent 2026-10-17

> Issues: 137 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-17 02:00 UTC

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

# 📊 Báo cáo Hermes Agent - 2026-10-17

## 1. Tóm tắt hôm nay

Dự án đang trong giai đoạn **ổn định post-merge** sau khi tích hợp unified gateway (#106742). Hoạt động tập trung vào sửa lỗi hệ thống: session routing, storage corruption, và cross-profile operations. 4 PRs mới merge trong ngày (package 8 fixes), 137 issues mở, 500 PRs đang hoạt động.

## 2. 🚀 Releases

Không có release mới. Version hiện tại: **v0.22.1** (commit `297552a9d6`).

## 3. 📈 Tiến độ dự án

### PRs quan trọng (mới nhất)

**Package 8 - Gateway Storage & Sessions** (#140208):
- 🔧 #140232 (P0): Fix gateway crash 7 ngày sau xóa Bot Chat - tombstone expiry wedge
- 🔧 #140234: Restore older local receipts - canonical routing fix  
- 🔧 #140233: API idempotency + image cleanup across session delete
- 🔧 #140230: Log silent owner/storage/control failures

**Features mới**:
- ⚙️ #140235: Per-surface compression trigger (`compression.platform_overrides`)
- 🧠 #140236: Seed `agent.reasoning_effort` - fix config validation

### Xu hướng phát triển

- **Post-merge stabilization**: 70%+ công sức đang fix fallout từ unified gateway
- **Multi-profile architecture**: Desktop routing, cross-profile DMs, profile isolation
- **Storage resilience**: Tombstone handling, receipt restoration, session lifecycle

## 4. 🔥 Điểm nổi bật cộng đồng

**Vấn đề người dùng quan tâm nhất**:

1. **#134889** (132 bình luận) - Gateway owns local sessions - tracking post-merge fixes
2. **#136567** (27 💬, 7 👍) - Telegram DM topics misrouting 
3. **#107402** (23 💬) - Update leaves permanent "did not restart" warning
4. **#132401** (23 💬, P0) - Scratch prune xóa work 24h không cảnh báo

**Tương tác cao**:
- Issues > 10 comments: 13 issues
- P0/P1 issues: 18 issues
- Closed trong 24h: 9 issues

## 5. 🐛 Ổn định & Bugs

### P0 Critical (3 issues)

- **#138343**: Gateway restart loop strands cron + async delegation burns quota
- **#132401**: 24h scratch prune destroys multi-day work (no log/quarantine)
- **#140018** (mới): Gateway crashes 7 days post-delete (fixed #140232)

### P1 High Priority (15 issues)

**Session/Storage**:
- #134889: Session ownership coordination
- #138826: Delete non-root profile session → 409 error
- #139699: Cross-profile Bot Chat delivery fails

**Messaging**:
- #136567: Telegram thread misrouting
- #127187: Cron retryable rejections lost

**Desktop**:
- #127621: Duplicate assistant responses (8 👍)
- #139236: Sessions route via generic local platform

### Security Issues (4 CVE-related)

- #122424: js-yaml 4.3.1 + yaml < 2.9 (2 SSRF CVEs)
- #127791: ip-address 10.3.1 + undici 6.28.0 (3 CVEs)
- #123343: httpx2 2.7.0 (6 PYSEC CVEs) - đã đóng duplicate
- #62336: Terminal snapshots capture credentials

## 6. 💡 Yêu cầu tính năng

**Top feature requests**:

1. **#50148** (15 👍): Nextcloud Talk adapter - working implementation ready
2. **#44075** (1 👍): Semantic search session history (BM25 + vector)
3. **#110229** (1 👍): Explicit "Clear chat" for Bot Chat
4. **#31782**: Private DuckDB workflow analyzer

**Đang develop**:
- #107105: Task-scoped Kanban worker isolation
- #82891: KittenTTS wheel SHA256 pin (supply-chain protection)
- #85994: MCP ImageContent → vision bridge

## 7. 👥 Phản hồi người dùng

### Frustrations

**Desktop experience**:
- Duplicate responses (#127621) - 8 upvotes
- Language pack can't translate function-valued entries (#140111)
- Download fails in SSH mode (#129008)

**CLI/Workflow**:
- `hermes update` workflow broken (#107402, #136281, #139428)
- Session deletion conflicts (#138826)
- Background process notifications infinite loop (#138940)

### Positive signals

- Community contributing adapters (Nextcloud Talk #50148)
- Plugin ecosystem active (GovInbox MCP #138635)
- Security-conscious users reporting CVEs

## 8. 📋 Backlog & Roadmap

### Tracker #134889 status

**Package 8 (active)**: Storage/session lifecycle fixes
- 6 PRs trong 24h
- Lane 1-3: Gateway/API fixes
- Lane 6: Desktop display

**Package 3 (#139161)**: TUI/Desktop sessions - 14/19 rows open

**Package 2 (#139160)**: Session creation/credentials - done (Oct 16)

### Systemic issues cần resolve

- Output truncation failures - 35+ scattered issues (#110126)
- Context compression stability (#117462, #126021)
- Multi-profile routing reliability
- Platform-specific quirks (Windows, macOS, Telegram)

### Dependency health

- 4 CVE families cần fix
- Nix flake deprecations (#109325)
- PM workspace conflicts (#123864)

---

**Tổng kết**: Dự án ưu tiên stability > features. Gateway refactor lớn đang được stabilize qua 8 packages fixes. Community active nhưng nhiều friction points ở Desktop + update workflow.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-17

## 1. 🌐 Tổng quan hệ sinh thái

8 dự án active, 2 tier rõ rệt:

**Tier 1 - Production systems (3)**
- Hermes Agent: 137 issues, 500 PRs - post-merge stabilization, unified gateway
- OpenClaw: 66 issues, 500 PRs - mature codebase, performance obsession
- QwenPaw: 15 issues, 30 PRs - plugin infrastructure refactor, inline UI

**Tier 2 - Active dev (4)**
- NanoBot: 4 issues, 50 PRs - bug-fix sprint, checkpoint durability
- Zeroclaw: 5 issues, 50 PRs - config corruption fix, cooperative cancellation
- NanoClaw: 15 issues, 50 PRs - provider migration, DB lock fixes
- NullClaw: 1 issue, 17 PRs - production hardening, 15 PRs batch review

**Inactive (2)**
- PicoClaw: 2 issues, 4 PRs - QQ channel work, Android DNS block
- IronClaw: 0 hoạt động

Chung: stabilization mode. Post-major-feature cleanup. Session/storage/gateway reliability được ưu tiên cao. Community interaction thấp trừ Hermes/OpenClaw.

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Merged 24h | Community | Focus |
|-------|--------|-----|----------|------------|-----------|-------|
| **Hermes Agent** | 137 | 500 | 0 | 4 (package 8) | High (132 cmt #134889) | Gateway post-merge fixes |
| **OpenClaw** | 66 | 500 | 0 | 30 | Med (28 cmt #159356) | Performance + startup regression |
| **QwenPaw** | 15 | 30 | 0 | 8 | Low (7 cmt #8126) | Plugin hot reload + inline UI |
| **NanoBot** | 4 | 50 | 0 | 6 | Very low (3 cmt #5402) | Consolidation logic + checkpoint |
| **Zeroclaw** | 5 | 50 | 0 | 9 | Low (P1/P2 focus) | Config corruption + cancellation |
| **NanoClaw** | 15 | 50 | 0 | 15 | Very low | Provider payload migration |
| **PicoClaw** | 2 | 4 | 0 | 2 | None | QQ C2C channel |
| **NullClaw** | 1 | 17 | 0 | 0 | None | 15 PRs batch pending |
| **IronClaw** | 0 | 0 | 0 | 0 | None | - |

**Key metrics**:
- Release activity: 0 across board - stability phase, không rush ship
- Merge velocity: OpenClaw (30) > NanoClaw (15) > Zeroclaw (9) > QwenPaw (8)
- P0/P1 count: Hermes (21) > OpenClaw (3) > Zeroclaw (2)
- Stale PR ratio: NullClaw (15 pending, 0 merged) highest risk

---

## 3. 🎯 Vị thế Hermes Agent

### Điểm mạnh
- **Scale lớn nhất**: 137 issues, 500 PRs - mature codebase
- **Community engagement cao nhất**: #134889 (132 comments), #136567 (27 comments)
- **Structured workflow**: Package tracking system (#134889), clear lane separation
- **Multi-profile architecture lead**: Desktop routing, cross-profile DMs đang được giải quyết systematic

### Điểm yếu
- **Post-merge fallout lớn**: 70%+ effort fix unified gateway bugs
- **Critical P0 nhiều**: 3 P0 (gateway crash, scratch prune, restart loop) vs OpenClaw (3), Zeroclaw (0)
- **Desktop experience friction**: duplicate responses (8 upvotes), language pack issues
- **Update workflow broken**: #107402, #136281, #139428 - user pain point lớn

### So với OpenClaw
- Hermes: architecture-first, big refactor → stabilize sau
- OpenClaw: incremental polish, performance từng KB
- Hermes có community lớn hơn nhưng friction nhiều hơn
- OpenClaw codebase ổn định hơn, ít regression nghiêm trọng

### So với QwenPaw
- QwenPaw: plugin ecosystem + inline UI innovation
- Hermes: multi-profile + gateway centralization
- QwenPaw move faster on features (hot reload, OpenUI), Hermes focus infrastructure

---

## 4. 🔧 Hướng kỹ thuật chung

### Storage & Session Management (6/8 dự án)
```
Hermes:  Gateway owns sessions, tombstone handling
OpenClaw: SQLite helper windows, Voice Call DB block
NanoBot:  Token consolidation, checkpoint durability
Zeroclaw: Config corruption, session lifecycle
NanoClaw: DB lock timeout, cascade delete
NullClaw: Draft ownership race, stream abort
```
→ **Xu hướng**: Centralized session state = complex concurrency. Tombstone/cleanup bugs universal.

### Cross-Platform Quirks (5/8 dự án)
```
Hermes:  Windows/macOS/Telegram platform-specific
OpenClaw: Windows update hang, iOS false banner
NanoBot:  -
Zeroclaw: -
NanoClaw: Apple Container networking, WhatsApp conflicts
PicoClaw: Android DNS fail (CGO_ENABLED=0)
NullClaw: Telegram HTML vs Slack Socket Mode
```
→ **Xu hướng**: Platform abstraction leak ở edges (update flow, container networking, channel APIs).

### Provider Ecosystem Maturity
```
Hermes:  -
OpenClaw: DeepSeek qua OpenRouter recovery issue
QwenPaw:  Tavily/Serply/Firecrawl web_search providers
NanoBot:  -
Zeroclaw: Provider routing via explicit prefix
NanoClaw: Codex/Cursor payload model migration
NullClaw: OpenAI-compatible reasoning_content quirks
```
→ **Xu hướng**: Provider-specific quirks được abstract thành config. QwenPaw lead provider ecosystem.

### Memory & Context Compression
```
Hermes:  Output truncation failures (35+ issues), context compression instability
OpenClaw: Transcript snapshot bounds, memory index rebuild
QwenPaw:  ReMe watcher thread exhaustion, chat history base64 bloat
NanoBot:  Consolidation trigger sai (API token vs estimate)
NanoClaw: -
```
→ **Xu hướng**: Long-lived sessions = memory management critical. Truncation bugs common.

### Testing & Verification Philosophy
```
OpenClaw: Performance obsessed (6KB JS, 70B CSS), warm reload optimization
NanoBot:  Checkpoint tool results per batch
QwenPaw:  Hot reload với rollback
NullClaw: Non-blocking logging, bounded channel I/O
```
→ **Xu hướng**: Production-first. Tests không được nhắc đến, focus vào observability + rollback.

---

## 5. 🔀 Điểm khác biệt

### Chiến lược phát triển

**Big Bang vs Incremental**
- Hermes: Unified gateway refactor (big), stabilize sau (70% effort)
- OpenClaw: Incremental polish, every KB optimized
- QwenPaw: Plugin extraction (big), channels thành subprocess

**Community-driven vs Internal**
- Hermes + OpenClaw: Public issues, community report CVEs (#122424, #127791)
- NanoBot/NanoClaw/NullClaw: Minimal interaction, internal-driven
- QwenPaw: Moderate, hub-level sharing proposal từ user

### Tính năng độc quyền

| Dự án | Unique Feature | Status |
|-------|----------------|--------|
| **Hermes** | Multi-profile architecture | Active dev |
| **OpenClaw** | Agent pinning, Blobster avatars | Polished |
| **QwenPaw** | Inline UI plugins, OpenUI integration | Review phase |
| **NanoClaw** | Google Gemini CLI wrapper | Proposed |
| **NullClaw** | Slack reactions lifecycle | PR pending |
| **PicoClaw** | QQ C2C Bot API v2 rewrite | Merged |

### Độ phức tạp codebase

**High complexity (infrastructure-heavy)**
- Hermes: Gateway + multi-profile + cross-profile routing
- OpenClaw: SQLite diagnostics, sidecars, managed update
- QwenPaw: Plugin hot reload, subprocess isolation

**Medium complexity (provider-focused)**
- Zeroclaw: Config tracking, subagent routing
- NanoClaw: Provider payload migration, Chat SDK integration

**Low complexity (single-purpose)**
- NanoBot: Consolidation + checkpoint
- NullClaw: Streaming + channel stability
- PicoClaw: QQ channel adapter

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Tier 1 - Mature (2)
**Hermes Agent**
- Community size: Large (132 comments single issue)
- Issue quality: Detailed reproduction, multi-day discussions
- Contributor diversity: Multiple feature requests (Nextcloud Talk #50148)
- Pain points surfaced: Desktop friction, update workflow

**OpenClaw**
- Community size: Medium (28 comments #159356)
- Issue quality: Performance metrics, diagnostic data
- Contributor behavior: Security-conscious (CVE reports)
- Pain points: Startup regression, memory pressure

### Tier 2 - Growing (2)
**QwenPaw**
- Community size: Small (7 comments #8126)
- Issue quality: Clear use-case descriptions
- Feature proposals: Hub-level sharing (#8275)
- Pain points: Skill download blocking, DingTalk markdown loss

**Zeroclaw**
- Community size: Minimal interaction
- Issue quality: P1/P2 tagged, risk:high labels
- Contributor: Single distinguished contributor (@Audacity88)
- Pain points: Config corruption (#11606)

### Tier 3 - Internal/Early (4)
**NanoBot, NanoClaw, PicoClaw, NullClaw**
- Community size: 0-3 comments typical
- Issue lifecycle: Open → fix → close trong 1-2 ngày
- Contributor pattern: Internal team hoặc solo developer
- Pain points: Không surface publicly

**IronClaw**: Inactive, không đánh giá được.

### Chỉ số so sánh

| Metric | Hermes | OpenClaw | QwenPaw | Others |
|--------|--------|----------|---------|--------|
| Avg comments/issue | 8.2 | 4.5 | 3.1 | 0.8 |
| Issues > 10 comments | 13 | 3 | 1 | 0 |
| Feature requests from users | Yes | Yes | Yes | No |
| External contributors | Multiple | Multiple | Few | Solo |
| Issue resolution time | Days-weeks | Days | Days | Hours-days |

---

## 7. 🔮 Tín hiệu xu hướng

### 1. Centralized Gateway Architecture
**Dẫn đầu**: Hermes (unified gateway), OpenClaw (Gateway shared-state)
**Follow**: NanoBot (consolidation governor), Zeroclaw (config tracking)
→ **Xu hướng**: Session ownership centralization = reliability priority > scalability. Trade-off accepted.

### 2. Plugin/Extension Systems
**Dẫn đầu**: QwenPaw (hot reload, subprocess isolation, inline UI)
**Follow**: NanoClaw (provider payload model), OpenClaw (memory search move to plugin)
→ **Xu hướng**: Monolith → plugin modularity. Security boundary = process boundary.

### 3. Provider Abstraction Maturity
**Patterns hiện tại**:
- Explicit prefix routing (Zeroclaw #1060)
- Reasoning content quirks (NullClaw IFM K2)
- Tool call recovery (OpenClaw DeepSeek)
- Web search provider ecosystem (QwenPaw Tavily/Serply/Firecrawl)
→ **Xu hướng**: Provider = commodity layer. Focus shift sang orchestration + memory.

### 4. Cross-Platform Desktop Experience
**Pain points chung**:
- Update workflows broken (Hermes, OpenClaw)
- Platform-specific quirks (Windows SQLite, macOS container, Android DNS)
- Duplicate responses (Hermes #127621)
→ **Xu hướng**: Desktop = second-class citizen. Web/channel-first design dominant.

### 5. Memory & Context Management
**Current approaches**:
- Truncation/compression (Hermes, OpenClaw, QwenPaw)
- Checkpoint durability (NanoBot, NullClaw)
- Long-term memory plugins (OpenClaw Hindsight, QwenPaw ReMe)
→ **Xu hướng**: Move từ "fit in context" → "external memory + retrieval". RAG-style pattern.

### 6. Multi-Channel Robustness
**Focus areas**:
- Telegram (NullClaw rich messages, PicoClaw C2C, NanoClaw rate limits)
- Slack (NullClaw streaming, Zeroclaw Socket Mode)
- WhatsApp (NanoClaw conflicts, Zeroclaw Web API)
- Discord (NanoClaw attachment drop)
→ **Xu hướng**: Channel = first-class platform. Chat API quirks = product differentiator.

### 7. Observability Over Testing
**Evidence**:
- Doctor improvements (OpenClaw #174912)
- Lifecycle reactions (NullClaw #1061)
- Config application tracking (Zeroclaw #11466)
- Explicit error surfaces (NanoBot #6009)
→ **Xu hướng**: Production-first mindset. Rollback > prevention. Live debugging > test coverage.

### 8. Security as Config, Not Code
**Patterns**:
- Autonomy policy per-agent (NullClaw #1063)
- Workspace bounds delegation (Zeroclaw #10391)
- Sandbox policy schema (Zeroclaw #7821, 6 tháng stale)
- `workspaceOnly` bypass (OpenClaw #173058)
→ **Xu hướng**: Security model underdeveloped. Config-based controls không enforce được. Gap lớn giữa intent và implementation.

---

## 📍 Kết luận chiến lược

**Hermes Agent position**: Top 2 về community + scale, nhưng stability debt cao sau big refactor. Multi-profile architecture = competitive moat nhưng chưa stable. Desktop experience weak point vs OpenClaw.

**Opportunity gaps**:
1. Desktop-first experience: Không ai solve tốt. Hermes/OpenClaw regression nhiều.
2. Provider reliability: Tool call recovery, reasoning quirks chưa có canonical solution.
3. Security model: Tất cả dự án đều config-based, không enforce runtime.
4. Multi-channel robustness: PicoClaw lead QQ, NullClaw lead Telegram/Slack, nhưng pareto 80/20 channel chưa có winner.

**Next 3-6 tháng predict**:
- Consolidation wave: 2-3 dự án sẽ merge hoặc inactive (IronClaw đã inactive, PicoClaw risk cao)
- Plugin ecosystem maturity: QwenPaw model sẽ được adopt (NanoClaw đã follow)
- Gateway stabilization complete: Hermes package 8 xong → release đầu tiên từ tháng 10
- Security focus tăng: #173058, #7821 type issues sẽ force architecture change

**Risk lớn nhất ecosystem**: Tất cả double down vào centralized gateway. Single point of failure. Distributed session model không ai explore.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-10-17

## 📊 Tóm tắt hôm nay

Dự án tiếp tục cleanup code base với 30 PRs được mở/đóng trong ngày. Không có release mới. Hoạt động tập trung vào refactoring performance và sửa bugs nghiêm trọng liên quan startup time, database handling, và agent management.

## 🚀 Releases

Không có release trong 24h qua. Version mới nhất vẫn là **2026.10.4** (đã release trước đó).

## 📈 Tiến độ dự án

### PRs nổi bật hôm nay:

**Performance improvements:**
- #174933: Defer Active Memory loading khi startup - giảm thời gian khởi động
- #174866: Load expanded tool details theo nhu cầu → tiết kiệm **6.5KB gzip JS + 70B CSS** 
- #174593: Bound cached transcript snapshots - tránh load 3.2MB data khi warm reload

**Bug fixes nghiêm trọng:**
- #174969: Hide SQLite helper windows khi update Windows - fix #174906 (update hang)
- #174953: Fix ACP client không nhận được agent replies giữa các prompts (#174849)
- #174915: Reuse retained source objects - giảm 183MB transfer cho git operations

**Feature additions:**
- #173773 + #173774: Avatar system mới - chọn preset/generate/upload Blobster avatars
- #174945: Edit session PR details không cần publish source
- #174793: Pin agents vào sidebar

### Xu hướng development:

1. **Tập trung cleanup architecture** - nhiều "refactor" PRs gỡ bỏ wrapper không cần thiết
2. **Performance obsession** - từng kilobyte được tối ưu (6KB JS, 70B CSS)
3. **Polish UI** - avatar system, pinning, better progress indicators

## 🔥 Điểm nổi bật cộng đồng

### Issues hot nhất (theo comment count):

**#159356 (28 comments)** - llama.cpp embedding crash:
- RAM 4GB → 8GB fix được vấn đề
- Memory pressure = root cause nhưng chưa rõ trigger ban đầu

**#168955 (16 comments)** - Startup regression 2026.10.1:
- Ready time tăng ~410s → ~1030s trên Windows
- `sidecars.control-ui-assets` block 477s
- Performance degradation nghiêm trọng

**#164799 (9 comments)** - Version change issues:
- Agents admit từng cái một sau `ready`
- System-agent DB bị refuse → readyz 503 cho đến khi restart

## 🐛 Ổn định & Bugs

### Critical bugs đang active:

**P0 - Release blockers:**
- #174955: iOS Settings hiển thị raw error text + false "update Gateway" banner
- #174906: Windows update 10.3→10.4 passes canary nhưng abandon activation
- #113309: Workboard xóa historical proof khi mutate card

**P1 - High priority:**
- #174913: Voice Call database block managed update activation
- #174842: `doctor --fix` hang 26+ min khi Gateway running (SQLite loop)
- #168955: Startup regression ~620s slower trên 2026.10.1

**Performance issues:**
- #161439: Gateway shared-state responsiveness - SQLite diagnostics stall
- #174909: DSML tool-call recovery không chạy cho DeepSeek qua OpenRouter

### Security concerns:

**#173058** - `tools.fs.workspaceOnly` không restrict file tools vì agent runtime nhận cả OpenClaw state root làm allowed directory - config setting bị bypass hoàn toàn

## 💡 Yêu cầu tính năng

**Memory & Session Management:**
- #154482: Lifecycle cho permanent MAIN session history - deployments dài hạn cần cách trim/export transcript
- #153702: Link Provider và Model configuration - separate nhưng dependent

**UX Improvements:**
- #101857: Telegram ForceReply prompt khi tap command không có args
- #79469: Reasoning text tự động ẩn sau khi complete - cần option giữ lại để review
- #113328: Faster STT path cho CPU-only hosts - 65s clip mất ~6 phút với whisper turbo

**Developer Experience:**
- #158356: Host-bound nonpublishing preparation cho Automation creation
- #1754: Add `computer` tool cho agentic UI automation (Cua integration)

## 💬 Phản hồi người dùng

### Pain points lớn:

**Startup performance** - regression trong 2026.10.1 gây khó chịu:
- Windows users báo cáo ready time x2.5
- `sidecars.control-ui-assets` chiếm gần 8 phút

**Update reliability** - multiple issues:
- #174687, #174835: Update failures với git-update và package-swap
- #174906: Windows update abandon sau khi pass checks
- #173313: `config get` mask sensitive values → mislead operators hàng giờ

**Memory pressure** - CPU-only deployments struggle:
- Voice transcription: 65s clip → 6 phút (Whisper turbo)
- Embedding operations OOM trên RAM thấp
- Memory index rebuild failures

### Positive signals:

- Avatar generation system được chờ đợi (#173762, #173773, #173774)
- Doctor improvements (#174912) cung cấp better diagnostics
- Performance work nhỏ nhưng systematic - từng KB được optimize

## 📅 Backlog & Roadmap

### Ưu tiên gần:

**Must fix trước release tiếp:**
1. iOS Settings error display (#174955)
2. Windows update activation (#174906)  
3. Startup regression (#168955)
4. Doctor hang với Gateway running (#174842)

**Architecture cleanup tiếp tục:**
- Test suite reduction campaign (d190 batch)
- Helper centralization (#174859)
- Memory search move to plugin (#174925)
- Plugin ownership clarity

**Performance targets:**
- Reduce Gateway CPU cho large WebSocket responses (#174966)
- Transcript snapshot bounds (#174593)
- Deferred plugin loading (#174933)

### Security work queue:

- #54508: Strengthen external content handling - persistent tainting, exec risk classes
- #173058: Fix `workspaceOnly` bypass
- #113346: Context poisoning via transcript reinjection

---

**Đánh giá tổng thể:** Dự án mature với focus cao vào stability, performance, và developer experience. Code quality campaigns đang chạy parallel với bug fixes. Community active report issues chi tiết. Startup regression là concern lớn nhất hiện tại.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-17

## 📊 Tóm tắt hôm nay

Đợt đóng bug lớn: 4 issue đóng, 6 PR merge. Tập trung sửa consolidation logic, sidebar state corruption, và model list outdated. Team push hard on context management và reliability fixes.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**Đã merge (6 PR):**

- **#6260** - Fix consolidation trigger từ API token thay vì chỉ dựa tiktoken estimate. Root cause: governor chỉ check estimate, bỏ qua reported usage → threshold không bao giờ đạt. (#5402 closed)
- **#5979** - Hide model đã shutdown từ OpenAI picker. Check `shutdown_date`, filter trước khi render dropdown. (#5977 closed)
- **#6009 + #6237** - Fix sidebar state loss sau update. Backend return explicit error thay vì silent fallback, client handle gracefully. (#6008 closed)
- **#6255** - Hide recovery notice khi resumed task đang chạy (UX polish)

**Đang review (24 PR active):**

Priority cao:
- **#6262** - Checkpoint tool results sau mỗi execution batch, không đợi hết. Crash giữa chừng không mất completed work.
- **#6263** - Expose `tool_call_id` vào RequestContext, tool biết identity của chính nó
- **#6264** - Deliver retry-wait notice ra channel qua `sendProgress` event
- **#6265** - Chỉ replay reasoning cho current turn, không duplicate vào history

Performance:
- **#6203** - `check_expired` scan idle session không cần parse full transcript, chỉ lấy metadata (#6192 closed)
- **#5826** - Add SQLite FTS5 cache cho session search, tránh scan toàn bộ JSONL

Conflicts (9 PR cùng touch session/runtime code):
- #5659, #5627 - Ephemeral runtime context (2 implementation khác nhau)
- #5801, #6033 - Preserve checkpoint across metadata update
- #5846 - Trace BUILD substage latency
- #5880 - Recover oversized pending file reads
- #6063 - Discard stale compaction after reset/delete
- #6109 - Dedicated model preset cho compaction
- #6215, #6230 - Fix idle compaction race với direct turn

## 💬 Điểm nổi bật cộng đồng

Ít interaction (most PR 0 comment, fresh today). Issues có impact:

- **#5402** (3 comments) - Consolidation không trigger, nhiều user hit vào
- **#6192** - Performance complaint: idle tick quét full session list mỗi 1s
- **#6008** - Data loss scenario: sidebar state bị wipe sau update

## 🐛 Ổn định & Bugs

**Fixed:**
- Token consolidation logic sai (#5402 → #6260)
- Sidebar corruption (#6008 → #6009, #6237)
- Outdated model list (#5977 → #5979)
- Idle scan performance (#6192 → #6203)

**Đang fix:**
- Tool checkpoint durability (#6262)
- Compaction race conditions (#6215, #6230, #6063)
- File name byte limit với Unicode (#6253)
- Integer parameter type validation (#6254)

## ✨ Yêu cầu tính năng

- **#6261** - Unify instance storage under home (config/workspace/identity resolution)
- **#6168** - Managed install + in-app update với Sigstore approval
- **#6158** - Actionable browser notification failures
- **#6256** - Compact composer toolbar cho mobile
- **#5902** - Auto-rename Telegram topic từ generated title

## 👥 Phản hồi người dùng

Quiet day về interaction. Focus vào tech debt và stability. Consolidation issue (#5402) có user confirm reproduction. Không có feature request hoặc complaint mới nổi bật.

## 🗓️ Backlog & Roadmap

Conflict cluster (9 PR) suggest big refactor coming cho session/runtime layer. Team đang:
1. Harden checkpoint durability
2. Optimize session scan/search
3. Clean up context replay logic
4. Add ephemeral runtime context

Managed update flow (#6168) chưa merge, chờ policy approval. FTS5 search (#5826) đợi conflict clear.

---

**Trend:** Bug-fix sprint. Consolidation + checkpoint + compaction issues get priority. Little new feature work, mostly reliability + performance.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-17

## 📊 Tóm tắt hôm nay

Zeroclaw đóng 9 PR lớn vào ngày 17/10, tập trung xử lý vấn đề config corruption (#11606), cooperative cancellation (#5836), và cải thiện UX cho ZeroCode TUI. Không có release mới, nhưng nhiều PR quan trọng được merge.

## 🚀 Releases

Không có release mới trong 24h qua.

## 📈 Tiến độ dự án

### ✅ Đã merge (9 PRs đóng)

**Config & Runtime Stability**
- **#11466** - Config application tracking: report per-target results, không còn đoán xem config đã apply hay chưa
- **#11506** - ZeroCode hiện saved vs applied status, biết rõ config nào đang chạy
- **#11504** - Fix Config filter scope trong ZeroCode, không còn mất section khi cancel

**Agent Runtime**
- **#11725** - Mid-turn steering giờ deliver ở next step, không chờ final answer
- **#11465** - Expose cooperative cancellation context cho tools via `ToolExecutionContext`
- **#10567** - Memory recall giờ stamp `[from YYYY-MM-DD]`, model biết tuổi của memory

**UX Improvements**
- **#11700** - ZeroCode composer keys không leak vào transcript
- **#11288** - Scrollbar seeking smooth qua loaded history
- **#11791** - Document ADR-016 exception cho `file_read_allowed_patterns`

**Critical Bug Fix**
- **#11606 CLOSED** - Fix config corruption: `upsert_agent` không còn rewrite toàn bộ config, fabricate risk profiles, drop fields

### 🔥 PRs nổi bật đang mở

**High Priority**
- **#11651** - Telegram 429 rate limit: shared flood gate per token, honor `retry_after`
- **#11589** - Operator override cho exceeded cost limit, không cần restart daemon
- **#10391** - Delegate workspace bounds vượt qua turn boundary (XL, high risk, needs author)

**Architecture & Security**
- **#11577** - Subagent chạy trên operator-declared model route
- **#7821** - Canonical `sandbox_policy` schema với application-layer enforcement (6 tháng tuổi, XL)
- **#11672** - JPEG admission projection không copy input, optimize memory

**Channels**
- **#11728** - Telegram unauthorized notices configurable + authorization-aware
- **#10430** - Gemini speech-to-speech broker channel (parking lot, 2 tháng tuổi)
- **#10979** - WhatsApp Web `create_room` và `invite_user`

**Config & Validation**
- **#10499** - Validate persistent config writes, catch corruption trước khi commit
- **#11301** - Durable agent rename recovery qua CLI/gateway/RPC

## 💬 Điểm nổi bật cộng đồng

**Issues đóng hôm nay:**
- **#11606** (P1, high risk) - Config corruption là pain point lớn: `upsert_agent` rewrite toàn bộ config, xóa fields, fabricate defaults
- **#11491** (P2) - Operators cần biết config đã apply hay chưa → fixed qua #11506
- **#11488** (P2) - ZeroCode filter bug làm mất section → fixed qua #11504
- **#10577** (P2) - Single-tool provider rounds opt-in (accepted, no active PR)
- **#5836** (P2, 6 tháng tuổi) - Cooperative cancellation cho tool execution → fixed qua #11465

**Tương tác:**
Không có data về reaction counts, nhưng issues P1/P2 với label `status:accepted` và `risk:high` thường là priority cao.

## 🐛 Ổn định & Bugs

**Đã fix:**
- Config corruption (#11606) - critical, đã merge fix
- Mid-turn steering timing (#11725)
- ZeroCode filter scope (#11504)
- Memory recall missing timestamps (#10567)

**Đang xử lý:**
- **#11651** - Telegram rate limit không được honor, sendMessage retry ngay
- **#11647** - Vision support coupled với system merge ở compatible providers
- **#10502** - OpenAI-compatible 400 khi tool result có image trong role:tool message

**Needs author action (stalled):**
- #10391 (delegate bounds, 2 tháng)
- #7821 (sandbox policy, 6 tháng)
- #10499 (config validation, 2 tháng)
- #11301 (agent rename recovery, 2 tuần)

## ✨ Yêu cầu tính năng

**Đang implement:**
- Cost limit override (#11589) - operator có thể continue sau khi vượt limit
- Subagent trên specific model route (#11577)
- Session reopening trong ZeroCode (#11727)
- Telegram unauthorized notice configurable (#11728)

**Accepted, chưa có PR:**
- #10577 - Single-tool provider rounds opt-in
- #10222 (referenced) - Related policy

**Đề xuất mới:**
- #11720 - Expose scenario routing requirements trong tool schema

## 👥 Phản hồi người dùng

**Pain points từ issues:**
- Config corruption risk cao (#11606) - operators lo mất config khi dùng `model_routing_config`
- Không rõ config đã apply (#11491) - reload flag không đủ
- ZeroCode UX issues (#11488, #11700, #11288) - filter scope, composer leaks, scrollbar jumps

**Community contributors:**
- @Audacity88 - distinguished contributor, ship nhiều PR (11 trong list)
- @jxxralf, @rarean, @wromansky, @linhongyu510 - active contributors
- @RustLangLatam - WhatsApp channel features

## 📋 Backlog & Roadmap

**Priority stack (theo label):**
- **P1:** #11606 (merged), #11301 (needs author)
- **P2:** #5836 (merged), #11491 (merged), #11488 (merged), #10577 (accepted, no PR), #11466 (merged)

**Architecture initiatives:**
- Speech-to-speech broker (#10430) - parking lot
- Sandbox policy canonical schema (#7821) - 6 tháng, XL, needs author
- Config validation (#10499) - 2 tháng, needs author
- Agent rename recovery (#11301) - 2 tuần, needs author

**High-risk PRs cần review:**
- #11589 (cost override), #11577 (subagent routing), #11651 (Telegram flood gate), #10391 (delegate bounds)

**Xu hướng:**
- Focus vào config stability và validation
- ZeroCode UX polish
- Channel robustness (Telegram, WhatsApp)
- Security/sandbox enforcement

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-17

## 1. Tóm tắt hôm nay

Không có hoạt động mới ngày 17/10. Dữ liệu chỉ chứa issues/PRs cũ đã đóng/cập nhật ngày 16/10. Dự án đang ở trạng thái ổn định, vừa merge 2 PR quan trọng về QQ C2C channel và cron timezone fix.

## 2. Releases

Không có releases.

## 3. Tiến độ dự án

### PRs đã merge (16/10):

**#3440** - QQ C2C Channel mới (không dùng botgo)
- Viết lại hoàn toàn từ QQ Bot API v2
- Tách riêng channel `qq_c2c` cho chat đơn
- Hỗ trợ: Access Token auth, WebSocket gateway, streaming, button interaction, Markdown panel
- **Ý nghĩa**: Giảm phụ thuộc external lib, kiểm soát tốt hơn QQ integration

**#3441** - Fix cron timezone bug
- `CronSchedule.TZ` bị bỏ qua trong `computeNextRun`
- Gây lỗi hiển thị sai giờ trên UI (UTC thay vì local)
- **Ảnh hưởng**: Tasks schedule chính xác hơn cho multi-timezone deployment

**#1349** - QQ Channel attachment parsing (đã merge lúc nào đó)
- Parse emoji, voice, image, video, file
- Upload local attachments trước khi reply
- Fallback từ Markdown sang plaintext

### PRs mở:

**#3371** - OpenCode Go provider (stale từ 08/09)
- Thêm provider `opencode-go` cho https://opencode.ai/zen/go/v1
- Auto-route model theo endpoint family
- Header `x-opencode-session` cho conversation tracking
- **Status**: Không merge được vì upstream đổi API hoặc không còn maintain

## 4. Điểm nổi bật cộng đồng

Không có tương tác mới. Issues/PRs đều 0-1 comment, không có upvote.

## 5. Ổn định & Bugs

**#3420** - Android DNS resolution fail (mở từ 09/10, stale)
- Pure-Go build (CGO_ENABLED=0) không resolve DNS trên Android
- Gateway không reach API endpoint: `dial udp 127.0.0.1:53: connection refused`
- **Root cause**: Go net resolver fallback khi không có CGO
- **Blocking**: Android deployment không dùng được external API

**#166** - QQBot không gửi tin nhắn (đóng 16/10)
- QQ Open Platform tắt chức năng chủ động gửi
- Error code 40034102: "主动消息失败, 无权限"
- **Giải pháp**: Chuyển sang passive reply model (đã fix bằng PR #3440)

## 6. Yêu cầu tính năng

Không có feature request mới. PR #3371 (OpenCode Go provider) là duy nhất nhưng đang stale.

## 7. Phản hồi người dùng

Rất ít tương tác. Issues nhanh chóng đóng sau khi fix (1-2 ngày). Cộng đồng nhỏ hoặc internal team chiếm chủ đạo.

## 8. Backlog & Roadmap

**Cần xử lý**:
- Issue #3420 Android DNS - critical cho mobile deployment
- PR #3371 stale 40 ngày - quyết định merge hoặc close

**Xu hướng**:
- Tăng cường QQ integration (C2C, attachments, Markdown)
- Cải thiện cross-platform stability (Android, timezone)
- Giảm external dependencies (viết lại botgo)

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-17

## 📊 Tóm tắt hôm nay

Ngày làm việc tập trung vào cleanup cơ sở dữ liệu và di chuyển provider code khỏi `providers` branch. 15 PR merged (chủ yếu fix bugs), 15 issue đóng. Không có release mới.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

### Migration lớn: Provider code → skill payloads

**#4104** - Di chuyển Codex provider từ `providers` branch vào skill payload:
- Ship 19 file trong `.claude/skills/add-codex/payload/` thay vì fetch từ `providers` branch
- Fork không cần `providers` branch để cài Codex
- Fix nhanh hơn (không cần target 2 branch)
- Pattern này sẽ áp dụng cho các provider khác

**#4107** - `/add-cursor` cũng chuyển sang payload model
**#4105** - Thêm shared exchange archive cho provider contracts

→ **Xu hướng**: Tất cả provider code đang centralize vào `main`, `providers` branch sẽ bị lock

### Database stability fixes

**#4101** - Fix `outbound.db` lock error:
- Đặt `busy_timeout` TRƯỚC `journal_mode`
- `journal_mode` cần exclusive lock, mà `busy_timeout` mặc định = 0
- Container đầu tiên trong process bị crash

**#3811** - Central DB cũng thiếu `busy_timeout`:
- Lock contention throw ngay thay vì retry
- Đọc như database corruption

**#4103, #4110** - Cascade delete fixes:
- `ncl messaging-groups delete` fail với FOREIGN KEY error
- Thiếu cleanup `session_claims`, `delivery_attempts`, `wake_signals`

### Container & sweep improvements

**#3646** [MERGED] - Env overrides cho sweep timers:
- `ABSOLUTE_CEILING_MS` (default 30 phút) 
- `CLAIM_STUCK_MS` (default 60s)
- Fix local model bị kill mid-turn

**#4108** - Setup đợi lâu hơn cho first reply:
- Từ 30s → đủ cho local model load lần đầu
- Show stages trong quá trình chờ

## 🔥 Điểm nổi bật cộng đồng

### Chat SDK 4.41.1 upgrade đang review

**#3570, #3993** - Bump từ 4.29.0 → 4.42.0:
- Fix Telegram drop URLs có underscore lẻ
- Discord forward double-append fix
- Đợi 4.42.0 stable 3 ngày (2026-10-17) rồi merge

### Channel fixes

**#2752** - Discord attachments không đến agent:
- `att.fetchData()` chỉ work với bytes
- Discord expose CDN URL thay vì bytes
- Bridge drop file

**#3752** - WhatsApp multiple questions cùng chat conflict
**#3859** - WhatsApp registration card không name được group

## 🐛 Ổn định & Bugs

### Credential & auth

**#4099, #4100** [MERGED] - Google Chat không start:
- Thiếu `GOOGLE_CHAT_PROJECT_NUMBER` từ `.env`
- `/add-gchat` skill không hỏi project number

**#1105** [CLOSED] - GH_TOKEN inject cho container macOS:
- Keychain không accessible trong container
- Đọc từ `.env` thay vì `~/.config/gh`

### Apple Container networking

**#1103** [CLOSED] - Credential proxy bind `127.0.0.1`:
- Apple Container dùng `bridge100` (`192.168.64.1`)
- Container không reach `127.0.0.1` hoặc `host.docker.internal`

**#1107** [CLOSED] - `.env` shadow mount broken trên Apple Container:
- `/dev/null` bị reject làm bind-mount source
- File-on-file overlay fail

## ✨ Yêu cầu tính năng

### Provider mới

**#2136** - Google Gemini provider:
- Pattern giống OpenAI Codex
- Dùng Gemini CLI `app-server` (JSON-RPC over stdio)

**#3857** - Pi agent provider (`/add-pi` skill)

**#3849** - OpenCode recover từ invalid history:
- Gemini enforce strict turn ordering
- `functionCall` không được lead
- Cần fallback mechanism

### Tools & integrations

**#2420** - `/add-hindsight` skill:
- Wrap Hindsight long-term memory engine
- MCP wrapper bundled trong PR
- Operator không cần install riêng

**#1547** [CLOSED] - YouTube history search tool:
- YouTube API không có watch history endpoint (removed 2016)
- Playwright drive `youtube.com/feed/history`
- On-demand search, không periodic scrape

## 💬 Phản hồi người dùng

**#2139** [CLOSED] - Bot stop sau image upload thứ 2:
- API 400 error processing image
- Có thể rate limit hoặc format issue

**#1700** [CLOSED] - Multiple containers spin up mỗi message:
- "hello" → nhiều bot reply
- Có thể duplicate wiring hoặc session race

**#1831** [CLOSED] - Telegram videos >20MB fail:
- Bot API limit 20MB
- MTProto fallback cho 200-500MB videos từ calls/meetings

## 📋 Backlog & Roadmap

### Đang làm

- Provider consolidation vào `main` branch
- Chat SDK bump 4.42.0
- Database lock handling improvements
- Apple Container compatibility

### Đã merge nhưng chưa release

- Sweep timer overrides (#3646)
- Codex payload model (#4104)
- Google Chat fixes (#4099)
- Multiple DB cascade fixes

### Technical debt

**#1244** - Missing test coverage:
- `morning-brief.ts`
- `skinnybean-engine.ts`
- `approval-gates.ts`
- `health-monitor.ts`
- `van-monitor.ts`
- `backup-service.ts`

→ **Next**: Release chứa DB fixes + provider migration, Chat SDK 4.42.0 bump sau khi stable

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-10-17

## Tóm tắt hôm nay

Developer @wray-lee mở 15 PR trong 3 ngày (14-16/10), tập trung fix streaming, channel stability, provider compatibility. Không có merge hoặc release. Tất cả PR đang chờ review, track tập trung tại issue #1066.

## Releases

Không có release.

## Tiến độ dự án

**Tính năng mới (3 PR):**

- **#1058**: Slack streaming - hiển thị reply real-time khi model generate
- **#1061**: Slack reactions lifecycle - emoji thể hiện trạng thái task (running/done/error)
- **#1072**: Telegram rich messages - support GFM markdown (tables, headings, spoilers, math)

**Cải thiện provider (4 PR):**

- **#1060**: Route provider bằng explicit prefix (`provider/model`) thay vì hardcode
- **#1065**: Gửi reasoning levels đến OpenAI-compatible models
- **#1064**: Resend reasoning_content trong assistant history khi endpoint yêu cầu (IFM K2)
- **#1070**: Discard tool calls từ truncated responses (khi hit max tokens)

**Stability fixes (6 PR):**

- **#1068**: `/stop` giờ abort được provider stream đang chạy, work trên mọi channel
- **#1067**: Telegram draft ownership - tránh race condition giữa các turn
- **#1069**: Non-blocking logging - stderr wedged không park turn nữa
- **#1071**: Hide text tool calls trong reasoning/CLI streams
- **#1073**: Guard structural turn-completion stalls - model nói "Let me check" nhưng không call tool
- **#1074**: Bound channel network I/O, non-blocking poller supervision

**Config/Security (2 PR):**

- **#1059**: Config default reasoning mode
- **#1063**: Per-agent autonomy policy thay vì global

**Telegram-specific (2 PR):**

- **#1075**: Handle Slack slash commands qua Socket Mode
- **#1062**: Render Telegram drafts bằng HTML parse mode

**Pattern:** Đây là đợt "production hardening" từ real-world usage với DeepSeek, IFM K2 qua Slack/Telegram. Developer hit nhiều edge cases: stalls, wedged threads, provider quirks, draft race conditions.

## Điểm nổi bật cộng đồng

Zero interaction (0 comments, 0 reactions) trên tất cả issues/PRs. Developer làm việc độc lập, chưa có maintainer review. Issue #1066 là tracking issue tổng, giúp batch review thay vì triage từng cái.

## Ổn định & Bugs

**Critical stability fixes:**

1. **Turn stalls** (#1073): Model kết thúc turn với prose announcement nhưng không tool call → silent hang
2. **Poller hang** (#1074): Network timeout wedge Telegram poller thread, supervisor không kill được
3. **Stderr deadlock** (#1069): Logging block stderr lock → session mutex deadlock
4. **Truncated tools** (#1070): Model hit max tokens, truncated tool call vẫn execute → bad state

**Channel-specific:**

- **Telegram**: Draft buffer race, HTML formatting mất trong streaming
- **Slack**: Stop command không work, slash commands drop trong Socket Mode

**Provider issues:**

- IFM K2 yêu cầu reasoning_content trong every assistant message, không chỉ message cuối
- Reasoning effort không gửi đến non-OpenAI providers

## Yêu cầu tính năng

Không có feature request từ users. Tất cả features từ developer experience:

- Streaming UX cải thiện (live drafts, reactions)
- Rich message support cho Telegram Bot API 10.1
- Flexible provider routing
- Per-agent autonomy control

## Phản hồi người dùng

Không có user feedback công khai. Developer run nullclaw như Slack/Telegram assistant với OpenAI-compatible gateways, issues phát sinh từ đó.

## Backlog & Roadmap

Issue #1066 collect 15 PRs để maintainer batch review. Developer note: "can be reviewed, deferred or closed without triaging each one separately. Two of them overlap".

Không có roadmap công khai. PR stack suggest:
- Phase 1: Stability (stalls, deadlocks, race conditions)
- Phase 2: Provider parity (reasoning, routing, history format)
- Phase 3: Channel UX (streaming, rich messages, lifecycle visibility)

**Risk**: 15 PRs chưa merge, potential conflict nếu base thay đổi. Developer tự stack PRs (một số depend PR khác), rebase cost cao nếu batch reject.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-10-17

## 1. Tóm tắt hôm nay

Ngày 17/10 tập trung fix UI bugs Console (slider thinking strength #8286→#8287, navigation long chat #8284, config editor #8263), đẩy PR lớn cho plugin infrastructure (#8285 cancellable skill downloads, #8283 model-backed tool approval, #7565 hot reload với rollback). Issue #8278 phản ánh DingTalk channel tự động downgrade markdown khi message >3.5k chars.

---

## 2. Releases

Không có release mới. Release gần nhất v2.2.2 stable đã verify xong ngày 16/10 (#8262 closed).

---

## 3. Tiến độ dự án

### Merged/Closed hôm nay
- **#8273**: Chat package bump → 1.2.0-beta fix navigation positioning (fixes #8251)
- **#8263**: Console config editors — close workflow chuẩn hóa, discard khi validation fail
- **#8239**: Inline UI plugins cho message submission (nền tảng cho OpenUI Lang)
- **#8271, #8272**: Polish web search config, clear chat input ngay khi submit
- **#8261**: Align hub plugin catalog với installed state
- **#8204**: Tavily API key qua credential store (fixes #8174)
- **#7875, #4719, #3117**: Đóng PRs cũ (docs, GitLab skill source, semantic routing) — chưa merge hoặc stale

### PRs đang review
- **#8287** [XS]: Fix thinking slider — fill chỉ đến selected value, không fill full bar
- **#8285** [XL]: Skill pool download thành background job + cancel (fixes #8126)
- **#8283** [XL]: Decision-model-backed tool approval mode
- **#8282** [S]: Repetition threshold controls visible/editable
- **#8277** [M]: AI Optimize decode SSE streams, preserve agent context
- **#8229** [M]: Truncate oversized tool outputs khi serve history (fixes #8228)
- **#7712, #8200**: Thêm Serply, Firecrawl provider cho web_search
- **#8266** [XXXL]: QwenPaw Data v1.0.3 — shared model config, datasource-aware datasets
- **#8209** [XXL]: Deep link resolve across agents
- **#8178** [L]: Nested skill directories (categorised layout)
- **#7565** [XXXL]: Plugin hot reload với rollback
- **#8187** [XXXL]: Channels thành subprocess-isolated plugins
- **#8248** [XXXL]: OpenUI inline support cho Intelligent UI
- **#8274** [S]: Preserve pending user input khi switch chat
- **#8268** [M]: Bound TaskTracker completion callback (fixes #8173 run-cleanup)
- **#8267** [M]: Restore cron job editing reliable (fixes #8249)
- **#8102** [M]: Boot watchdog cho console — reload button khi entry chunk fail

### Xu hướng
Plugin infrastructure đang được refactor lớn (hot reload, subprocess isolation, inline UI). Console UX được polish nhiều (navigation, input clear, config editors). Tool ecosystem mở rộng (Serply, Firecrawl, Tavily key support).

---

## 4. Điểm nổi bật cộng đồng

### Issues nhiều comment/reactions
- **#8174** [👍0, 4 comments]: Tavily keyless → không dùng được paid quota → resolved qua #8204
- **#8126** [👍0, 7 comments]: Skill download blocking request → timeout trên large pool → #8285 làm cancellable job
- **#8275** [👍1]: Đề xuất global Skill/MCP management ở Hub level (team sharing, admin update once)

### PRs attention cao
- #8266 (Data 1.0.3), #8239 (inline UI), #8187 (channels extraction) — đều XXXL scope
- #8204 (Tavily key) merged nhanh sau feedback #8174

---

## 5. Ổn định & Bugs

### Critical
- **#8228**: Chat history >10 MB vì tool outputs stored base64 → 30s timeout fail → #8229 truncate outputs
- **#8279**: ReMe watchers exhaust AnyIO thread limiter → stall HTTP endpoints (long-lived deployment)
- **#8281**: `reload_agent()` không fire `workspace_created` hooks → runtime hooks dropped

### High
- **#8284**: Wheel scroll stuck trong long chat — height re-estimation snap view back 1.1–2.2k px
- **#8278**: DingTalk downgrade toàn bộ message thành text khi >3.5k chars → mất markdown/table
- **#8280**: File content parts thiếu `file_id` → 400 rejection OpenAI-compatible providers
- **#8276**: ReMe reranker accept empty api_key → fail surface như "unexpected error"

### Medium
- **#8286**: Thinking slider fill full bar ngay cả khi chọn Low → #8287 fix
- **#8251**: Navigation directory position sai → #8273 fixed

### Low
- **#8270, #8269**: Windows ZIP file name garbled (encoding not passed to `ZipFile`)

---

## 6. Yêu cầu tính năng

### Đã implement/đang review
- ✅ Tavily API key config (#8204)
- 🔄 Cancellable skill downloads (#8285)
- 🔄 Decision-model tool approval (#8283)
- 🔄 Inline UI plugins (#8239, #8248 OpenUI)
- 🔄 Nested skill directories (#8178)

### Đề xuất mới
- **#8275**: Global Skill/MCP sharing ở Hub level (admin install once, all users inherit)
- **#7712, #8200**: Thêm Serply, Firecrawl web_search providers (đang review)
- **#3117**: Semantic skill routing với embedding-based retrieval (đã close, cần discussion)

---

## 7. Phản hồi người dùng

### Negative friction
- **Tavily keyless (#8174)**: Không surface được paid quota → fixed
- **Skill download blocking (#8126)**: 30s timeout trên large pool, không cancel được → fixing
- **DingTalk markdown loss (#8278)**: Table/formatting mất hoàn toàn khi >3.5k chars
- **Chat history bloat (#8228)**: Base64 tool outputs làm history >10 MB → timeout

### Workflow pain
- **Windows ZIP garbled (#8270)**: Encoding không đúng khi extract
- **Config editor trap (#8263)**: Validation fail → không đóng được drawer → fixed
- **Scroll stuck (#8284)**: Long chat auto-snap làm gián đoạn manual wheel scroll

### Feature requests
- **Global resource sharing (#8275)**: Team workflows cần centralized Skill/MCP management
- **More search providers (#7712, #8200)**: Firecrawl, Serply complement Tavily

---

## 8. Backlog & Roadmap

### Short-term (đang làm/review)
- Plugin hot reload với rollback (#7565)
- Channels extraction thành plugins (#8187)
- OpenUI inline support (#8248)
- Deep link resolution (#8209)
- QwenPaw Data 1.0.3 (#8266)

### Mid-term (open issues)
- ReMe watcher thread exhaustion (#8279)
- Reload agent hook lifecycle (#8281)
- DingTalk message splitting strategy (#8278)
- File reference lifecycle (#8280)
- Boot recovery (#8102)

### Long-term (proposals)
- Hub-level global resources (#8275)
- Semantic skill routing (#3117 closed, needs design)
- GitLab skill source (#4719 closed)

### Infrastructure maturity
Plugin system đang được hardened (hot reload, isolation, lifecycle). Console UX iteration nhiều (navigation, input, config). Tool ecosystem open cho third-party providers (Serply, Firecrawl). Memory layer optimization (ReMe reranker, chat history truncation).

---

**Bottom line**: Ngày 17/10 polish UI bugs nhanh, đẩy infrastructure PRs lớn (plugins, inline UI, Data 1.0.3). Critical issues chat history bloat + ReMe threads đang được address. Community đề xuất Hub-level resource sharing cho team workflows.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*