# Bản tin Hệ sinh thái Hermes Agent 2026-09-21

> Issues: 121 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-21 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-21

## 📊 Tóm tắt hôm nay

Ngày hoạt động gần như toàn bugs: 30 PR đang mở, 15 đóng, 0 release mới. Maintainer @teknium1 đóng 8 vấn đề cùng ngày (Desktop renderer lifecycle, Bot voice TTS routing, pastes attach từ nơi sai, connection caching). Nhiều fix chồng chéo - compaction, session state, platform reliability.

## 🚀 Releases

Không có release trong 24h. Version hiện tại: **v0.21.3** (2026-09-14).

## 🔨 Tiến độ dự án

### PR nổi bật đã merge

**Desktop & Session State**
- #117668: Composer không còn unmount khi session reload ngắn - fixed `addRange(): range isn't in document` error
- #117665: Summary model fallback khi `provider: auto` fail, warning giờ show tên model fail
- #117663: Update không còn kill gateway đang chạy code mới (Windows user thấy `✗ No gateway running` ngay sau cold start)
- #117661: Link title resolver không còn trigger OS passkey dialog khi render private link (curl-tier wall detection)

**Backend & Remote connections**
- #117651: Xóa/repoint connection giờ flush roster cache - reconnect learn lại từ target mới
- #117652: SSH learn backend `install_id` → duplicate addresses collapse như remote/local đã làm

**Kanban & Tooling**
- #117649: `kanban complete` từ chối empty completion (no result, no summary) với audit event `completion_blocked_empty_result`

### PR đang review

**Critical bugs**
- #117746 [P2]: 3 state.db residuals - `serve` stand down dưới live gateway, recovery survive first resume, import từ chối deleted DB còn file handle
- #117669 [P2]: Large paste attach từ `HERMES_HOME/composer-pastes` thay vì chat cwd (security boundary fix)
- #117748 [P2]: Fleet-restart warning không stick forever trên serve backend; macOS chỉ report restart khi PID change

**Session & Compression**
- #117750 [P2]: Tool payload prune duplicate display rows - fixed: dedupe key follow call ID, không fold mutable content
- #117728 [P2]: Unarchive resumed compression lineages - visibility update trong transaction với handoff

**Gateway & API**
- #117773 [P2]: `/api/sessions/{id}/chat` restore custom provider - hiện giờ fail turn 2+ với `No LLM provider configured`
- #117769 [P2]: Delayed process notification preserve current instructions (port #75719 lên extracted registry architecture)

**Platform & Config**
- #117704 [P2]: `--ignore-existing` giờ hoạt động - Desktop skip local backend discovery (thin client mode)
- #117680 [P2]: LSP một stall không silence workspace mãi mãi - retry window, cold warmup budget, per-root exclusion

## 🔥 Điểm nổi bật cộng đồng

**Issues hot nhất (10+ comments)**
- #84361 [10💬]: Desktop MEDIA links dead - tag regex absorb trailing markdown, `file://` URLs built bằng string concat
- #100573 [9💬]: Desktop recurring SIGTRAP từ out-of-range `string_view::substr` trong Electron 40.10.2/Linux
- #117520 [6💬]: Bot Mode rooms cần "real chat feel" - hiện đọc như status reports (headings, bullets), không có social affordances

**Engagement cao**
- #64488 [6💬]: Dashboard TUI sessions leak processes, memory, DB rows qua nhiều failure modes (Linux native)
- #48723 [6💬, closed]: Python 3.14 support - pinned `<3.14,>=3.11` giờ block Homebrew default

## 🐛 Ổn định & Bugs

### Session State cluster
- #117750: Compression tool prune duplicate display history
- #117137: Compaction re-insert steer text as new user rows - một message → 3-7 OOB blocks
- #117487 [HOLD]: Hindsight auto-recall/retain chạy trên synthetic runtime turns, không chỉ user input (maintainer direction changed - move toward leaner core)

### Platform-specific
**Windows**
- #117181: Hub skills report `update_available` mãi mãi (CRLF vs LF newline trong quarantine_bundle)
- #116818: Bare `bash` resolve tới WSL stub, không phải Git Bash - skill inline-shell/node bootstrap fail silent
- #91097: Scheduled Task không restart gateway watchdog exits

**Desktop**
- #117285: Chat flicker/remount - `addRange(): range isn't in document`
- #117375: Composer disappear during transient loading
- #91611: Keybind normalization crash khi `KeyboardEvent.code` missing

### Provider & Auth
- #117482: Provider quota 429 báo là auth failure
- #117111: CommandCode upstream 429 misclassified làm credential rate limit, exhaust healthy API key
- #63408: Custom provider `{"data": {...}}` wrapper không unwrap - vision fail với empty ChatCompletion

### Message Delivery
- #103575: Telegram final response dropped sau `_send_with_retry max_retries=2` exhausted - không requeue on recovery
- #102221: Matrix voice delivery broken v0.21.0 - `send_voice()` got unexpected kwarg `is_voice`
- #116944: A2A reply text lost khi gateway stream session - `message/send` và `message/stream` return empty reply

## 💡 Yêu cầu tính năng

- #117520: Bot Mode "friend-group vibe" - rooms cần lightweight social affordances, không chỉ status reports
- #97149: Bot-initiated room messages - members post ngoài driven turn
- #47256: `/v1/images/generations` endpoint
- #47210: CLI auto-detect light terminal backgrounds (Ghostty) - dark-themed skins break

## 📢 Phản hồi người dùng

**Pain points**
- Session state leaks (processes, memory, DB rows) qua failure modes
- Platform reliability trên Windows (WSL stub confusion, restart policies, CRLF handling)
- Desktop composer stability (unmount during load, flicker, renderer crashes)
- Custom provider persistence (work turn 1, fail turn 2+)

**UX requests**
- Bot conversations cần feel more conversational, ít structured report hơn
- LSP timeout không nên poison cả workspace
- Update flow không nên restart gateways đã on new code

## 📋 Backlog & Roadmap

**Maintainer focus** (evident from PR velocity)
- Desktop stability: renderer lifecycle, connection management, paste security
- Session state correctness: compression, display deduplication, archive visibility
- Platform parity: Windows subprocess resolution, keybind normalization
- Gateway reliability: custom provider persistence, message delivery guarantees

**Technical debt visible**
- Session state architecture (compaction/pruning creating display artifacts)
- Multi-platform subprocess/shell handling (WSL stub vs Git Bash)
- Provider model persistence (custom providers drop on resume)
- LSP per-root exclusion needed for mixed-size workspaces

**Direction shift noted**: maintainer announced move "toward leaner core (more like Pi, less like OpenClaw)" - #117487 on HOLD cho memory-provider ownership change.

---

## So sánh hệ sinh thái chéo

# Báo cáo so sánh hệ sinh thái AI Agent - 2026-09-21

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 2026-09-21 tập trung vào **ổn định hóa** thay vì tính năng mới. Pattern chung: fix bugs chồng chéo từ phát hành trước, dọn dẹp technical debt, cải thiện developer experience.

**Dấu hiệu trưởng thành:**
- Nhiều dự án shift từ "ship features" sang "fix what broke"
- Security issues được ưu tiên (Zeroclaw S0, IronClaw OAuth)
- Platform compatibility trở thành pain point chính (Windows, multi-tenant)

**Vấn đề chung:**
- Session state corruption (Hermes, OpenClaw, QwenPaw)
- Update mechanism failures (OpenClaw deadlock, NullClaw rollback)
- Multi-platform subprocess handling (Hermes WSL, OpenClaw Windows paths)
- OAuth/provider persistence (Hermes, IronClaw, NanoBot)

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity | Momentum | Maturity |
|-------|--------|-----|----------|----------|----------|----------|
| **Hermes Agent** | 121 | 500 | 0 | 🔥 High | Fix bugs chồng chéo, stability focus | Beta - production issues |
| **OpenClaw** | 94 | 500 | 0 | 🔴 Critical | 2026.9.5 regression wave | Unstable - major bugs |
| **QwenPaw** | 21 | 37 | 1 | 🟢 Healthy | Beta 2.2.2b3, feature + fixes | Active development |
| **Zeroclaw** | 12 | 50 | 0 | 🟡 Moderate | WhatsApp polish, security fixes | Refinement phase |
| **NanoBot** | 2 | 50 | 0 | 🟢 Stable | Event protocol migration | Cleanup + polish |
| **PicoClaw** | 6 | 5 | 0 | 🔵 Low | Stale backlog cleanup | Maintenance mode |
| **NanoClaw** | 1 | 40 | 0 | 🔵 Low | Backlog purge (29 PRs closed) | Stabilization |
| **NullClaw** | 1 | 0 | 0 | 🔵 Minimal | Error message UX only | Early/quiet |
| **IronClaw** | 0 | 8 | 0 | 🟡 Moderate | RC prep, OAuth fix | Pre-release polish |

**Insights:**
- Hermes + OpenClaw = 1000 PRs combined → cả hai hit scaling problems
- QwenPaw duy nhất ship release trong 24h
- 5/9 dự án không có release → industry-wide stabilization phase
- Activity clusters: High (Hermes/OpenClaw), Moderate (Zeroclaw/NanoBot/IronClaw), Low (còn lại)

## 3. Vị thế Hermes Agent

### Trong pack leaders

Hermes ở tier 1 về scale (121 issues, 500 PRs) nhưng gặp **quality crisis**:
- 30 PR mở, 15 đóng/ngày = high churn
- Bugs cluster quanh core mechanics (session state, compaction, desktop renderer)
- Maintainer @teknium1 đóng 8 issues/ngày = reactive firefighting

**So với OpenClaw:**
- Cùng tier scale, cùng struggle với update mechanism
- OpenClaw worse: 2026.9.5 gây "8-hour failure recovery session" (user quote)
- Hermes better: không có deadlock wave, bugs isolated hơn

**So với QwenPaw:**
- QwenPaw nhỏ hơn nhưng ship releases, test coverage tăng (+1027 statements)
- Hermes larger codebase, slower iteration
- QwenPaw pattern: beta releases → test → stable. Hermes pattern: continuous fix.

### Strengths

1. **Velocity**: 15 PR merged/ngày, maintainer responsive
2. **Scope**: Desktop + gateway + multi-platform = wide moat
3. **Community size**: 121 issues = adoption signal

### Weaknesses

1. **Stability debt**: Session state, compaction, desktop renderer = core instability
2. **Platform parity**: Windows users hit 4+ blockers
3. **Direction drift**: maintainer announce "move toward leaner core" mid-sprint (#117487 on HOLD) = strategy wobble

## 4. Hướng kỹ thuật chung

### Patterns được áp dụng rộng

**Session state architecture:**
- Hermes: compaction re-insert as new rows
- OpenClaw: SQLite WAL checkpoint failures
- QwenPaw: memory backend rollback
→ **Consensus problem**: transactional state hard, compression/pruning introduce bugs

**OAuth/provider management:**
- Hermes: custom providers drop on resume
- IronClaw: admin vs user config precedence
- NanoBot: OAuth catalog refresh
→ **Common need**: live credential resolution, not cached state

**Multi-platform subprocess:**
- Hermes: WSL stub vs Git Bash
- OpenClaw: Windows path normalization
→ **Pain point**: cross-platform shell/process handling = minefield

**Event/message protocols:**
- NanoBot: full event protocol migration
- Zeroclaw: ACP transcript persistence
- QwenPaw: tool approval refactor
→ **Trend**: structured events over free-form messages

### Technology choices

| Tech | Adopters | Use case |
|------|----------|----------|
| SQLite | Hermes, OpenClaw, QwenPaw, Zeroclaw | Session persistence |
| Electron | Hermes (Desktop), OpenClaw (implied) | Desktop clients |
| WhatsApp/Telegram/Slack | Zeroclaw, NanoBot, NanoClaw, OpenClaw | Chat integrations |
| OAuth 2.0 | IronClaw, NanoBot, PicoClaw | Auth flows |
| WASM plugins | Zeroclaw, IronClaw | Extensibility |

## 5. Điểm khác biệt

### Chiến lược

**Hermes**: "Leaner core" shift → rút lui từ feature expansion, focus stability
**OpenClaw**: "Everything included" → hit scaling wall với 2026.9.5
**QwenPaw**: "Beta cadence" → iterative releases, test-driven
**Zeroclaw**: "Security-first" → S0 tags, approval policies, sandbox
**NanoBot**: "Protocol purity" → event migration, no legacy paths

### Tính năng độc đáo

**Hermes**: Desktop renderer lifecycle (addRange errors), paste security boundaries
**OpenClaw**: Plugin hot-reload (broken), Agents API (in progress)
**QwenPaw**: Multi-tenant Hub, Community feed integration
**Zeroclaw**: Host-scoped admission control (RFC), execution-tree iteration budgets
**NanoBot**: Subagent private sessions, Jev shell safeguard
**IronClaw**: Admin vs user OAuth config precedence

### Community model

**Hermes**: Maintainer-driven, single core dev (@teknium1)
**OpenClaw**: Team-driven, many contributors, high PR churn
**QwenPaw**: Balanced, Chinese community, Platform integration
**Zeroclaw**: Contributor-heavy (@RustLangLatam, @Audacity88), RFC process
**NanoBot**: Small team, clean architecture focus
**PicoClaw/NanoClaw/NullClaw**: Minimal activity, maintenance mode

## 6. Mức độ trưởng thành cộng đồng

### Tier 1: Production-grade communities

**QwenPaw** 🏆
- Engagement: 31 comments on roadmap discussion
- Process: Beta releases, E2E tests, localization (10 languages)
- Pain visibility: Session loss tracked, reproduced, prioritized
- Maturity: Community votes on roadmap

**Zeroclaw** 🥈
- Engagement: Distinguished contributors (13-4 PRs from individuals)
- Process: RFC queue (#8692), maintainer decision tracker
- Security: S0 tags, approval policies
- Maturity: Multi-agent resource management RFCs

### Tier 2: Growing communities

**Hermes Agent**
- Engagement: 10+ comments on hot issues
- Pain points: Well-documented (Desktop crashes, WSL confusion)
- Weakness: Single maintainer bottleneck, reactive mode

**OpenClaw**
- Engagement: 35 comments on SQLite WAL issue
- Pain points: User quote: "8-hour failure recovery session"
- Weakness: Release quality control breakdown

### Tier 3: Maintenance mode

**NanoBot, IronClaw**: Small, focused, low external engagement
**PicoClaw, NanoClaw, NullClaw**: Minimal community, internal teams

## 7. Tín hiệu xu hướng

### Immediate (Q4 2026)

**Consolidation phase**: 5/9 dự án không ship release = ngành rethink fast-iteration
**Windows parity**: Hermes, OpenClaw gặp platform bugs → cross-platform = competitive moat
**Security hardening**: Zeroclaw S0 tags, unattended turn approvals → enterprise requirements surface

### Medium-term (2027)

**Multi-agent orchestration**: 
- Zeroclaw: host-scoped admission control RFC
- NanoBot: subagent private sessions
- QwenPaw: Platform account sync
→ **Prediction**: single-agent → swarm architectures

**Developer experience shift**:
- NullClaw: Error message UX
- Hermes: LSP timeout handling
- QwenPaw: Model discovery unification
→ **Prediction**: Onboarding friction becomes differentiation

**Community-driven roadmaps**:
- QwenPaw: Community votes on Hub features
- Zeroclaw: RFC-based decisions
→ **Prediction**: Open development models win vs closed

### Long-term wildcards

**Voice/audio realtime**:
- QwenPaw: Realtime voice (#7785)
- Hermes: Bot voice TTS routing
→ If one solves latency + interruption, others follow fast

**Compliance & safety**:
- Zeroclaw: Sandbox policies, sender authorization
- Pattern: Enterprise adoption forces compliance features
→ Projects without safety rails get forked or replaced

**Platform lock-in risk**:
- QwenPaw: AgentScope Platform integration deep
- Trade-off: ecosystem benefits vs vendor dependency
→ Watch for community forks if Platform closes/pivots

---

## Kết luận chiến lược

**Hermes Agent position**: Tier 1 scale, Tier 2 stability. Cần quyết định rõ ràng:
1. Double down on desktop (unique moat) + fix renderer bugs
2. OR simplify to server-only (compete với OpenClaw/Zeroclaw)

**Industry inflection point**: 2026-09-21 = stabilization day, không phải innovation day. Projects survive bằng reliability, không phải features.

**Winner characteristics** (dự đoán):
- QwenPaw pattern: Test coverage + beta cadence + community roadmap
- Zeroclaw pattern: Security-first + RFC process + contributor-friendly
- Hermes risk: Single maintainer + reactive mode + direction wobble

**Watch metrics**: 
- Release frequency (QwenPaw leads)
- Windows bug density (Hermes/OpenClaw pain)
- Community contributor count (Zeroclaw growth)
- Session state bugs (industry-wide problem)

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo phân tích OpenClaw - 2026-09-21

## 1. Tóm tắt hôm nay

Phiên bản 2026.9.5 gây nhiều sự cố nghiêm trọng: update deadlock, session database corruption, plugin hot-reload crash. Team tập trung fix critical bugs với 30 PR được merge/review. Nhiều vấn đề Windows-specific và plugin lifecycle race conditions.

## 2. Releases

Không có release mới trong 24h. Phiên bản 2026.9.5 đang gặp nhiều vấn đề nghiêm trọng cần hotfix.

## 3. Tiến độ dự án

### PRs quan trọng đang active:

**Critical fixes (P0):**
- #153839: Fix update deadlock khi SQLite WAL checkpoint đang chạy
- #154227: Fix Gateway startup fail trên Windows do path normalization không nhất quán
- #153426: Fix curated memory roots (`MEMORY.md`/`USER.md`) bị drop khỏi bootstrap prompt sau provenance check

**Performance improvements:**
- #154181: Chạy Gateway server tests song song - giảm thời gian CI
- #154270: Model refresh test không còn sleep 5s thật

**Architecture changes:**
- #154208: Agents API hỗ trợ OpenClaw native tools
- #154229: Agents API transfer attachments vào hosted workspace

### Xu hướng:

- Focus mạnh vào Windows compatibility issues
- Plugin lifecycle bugs là nỗi đau lớn (hot-reload, state migration)
- Update mechanism cần refactor toàn diện

## 4. Điểm nổi bật cộng đồng

### Top issues theo engagement:

**#143524** (35 comments, 🦐 gold shrimp): 
SQLite WAL file phình to 1.4-2.8GB trong vài ngày dù `wal_autocheckpoint=1000`. Block Gateway startup trên Windows. Nhiều user hit vấn đề này.

**#97616** (31 comments):
Hook/tool child processes leak thành zombie, ăn tài nguyên. Regression nghiêm trọng.

**#153257** (15 comments):
User phàn nàn mạnh: "2026.9.5 turned stable environment into 8-hour failure recovery session". Environment ổn định trước update, sau đó toàn crash.

**#152981** (11 comments):
Gateway startup hang 17 phút ở `sidecars.model-runtime` rồi timeout. Workspace plugins issue.

## 5. Ổn định & Bugs

### Critical bugs (P0):

**Update failures:**
- Deadlock khi plugin state migration chờ parent's install-records lease (#153882)
- SQLite inspection abort updates (#145995, being fixed by #153839)
- Config path normalization inconsistency trên Windows (#154227)

**Runtime crashes:**
- Plugin hot-reload dispose tất cả channel plugins, ngắt active streams (#152965)
- Telegram polling worker không tìm thấy module trong source-checkout mode (#154180)
- `plugins.allow` bị regen mỗi lần start, drop bundled plugins như `browser` (#154066)

**Data integrity:**
- Mixed terminal requester-settle batches retry forever (#137332)
- Agent SQLite WAL không bao giờ checkpoint (#143524)
- Session list fail khi Matrix/Telegram/Slack account bị remove (#153845, fixed by #153846)

### Medium-high bugs (P1):

- Zombie process accumulation (#97616)
- Memory roots (`MEMORY.md`) bị exclude vĩnh viễn sau provenance ratchet (#153426)
- WhatsApp replies fail với "No active listener" dù connection OK (#153453)

## 6. Yêu cầu tính năng

**#145021** (P2): Cho phép plugin cancel host-bound delivery đang chạy. Use case: plugin có approval workflow riêng.

**#116547**: Wire `adoptionStallTimeoutMs` vào Slack channel config. Default 5 phút quá ngắn, dead-letter messages khi turn dài.

**#7406**: Telegram topic names dạng human-readable trong session dropdown thay vì raw key `agent:main:telegram:group:-123456789:topic:42`.

**#103659**: Per-agent/per-provider override cho `tools.toolSearch` thay vì global switch.

## 7. Phản hồi người dùng

### Negative sentiment cao:

**#153257**: "I genuinely regret upgrading to OpenClaw 2026.9.5"
- Environment stable trước update
- Sau update: 8 giờ troubleshooting
- Multiple crash-loop scenarios

**#151467**: Self-upgrade deadlock & rollback cron failure
- Auto-update từ v6.33 → v9.4 fail
- Auto-reverted về v6.33

**#152884**: "Updating Openclaw - Deadlock"
- User nghĩ lỗi do không restart sau Ubuntu/Brave updates
- SQLite migration recursion deadlock

### Positive feedback:

Không có positive feedback đáng kể trong 24h qua. Cộng đồng đang tập trung report bugs.

## 8. Backlog & Roadmap

### Đang được xử lý:

**Update mechanism overhaul:**
- Simplify execution flow (#154160)
- Prevent SQLite inspection abort (#153839)
- Fix Windows path normalization (#154227)
- Preserve running worker code during replacement (#153764)

**Plugin system improvements:**
- Stabilize hot-reload (#152965)
- Fix state migration deferral loop (#153566)
- Clean up temp build dirs (#153246, #154149)

**Performance & reliability:**
- Parallel test execution (#154181)
- Reduce session-list filtering overhead (#153983)
- Fix audio stuttering on busy Gateway (#154119)

### Tech debt được ưu tiên:

- Windows-specific issues (5+ critical bugs)
- Plugin lifecycle races
- SQLite WAL management
- Update/migration robustness

### Chưa rõ timeline:

- Agents API feature completion (tools, attachments)
- Voice/audio quality improvements
- Webchat input lag fix (#145777)

---

**Tóm lại:** Release 2026.9.5 có nhiều regression nghiêm trọng. Team đang sprint fix critical bugs với focus vào update mechanism và plugin lifecycle. Windows users gặp nhiều vấn đề nhất. Cộng đồng frustrated với stability issues.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-21

## 📊 Tóm tắt hôm nay

Ngày fix lỗi và cleanup: 8 PR merged, tập trung vào WebUI refinement (session state, OAuth retry, UI noise reduction) và legacy code removal. Stack chuyển hoàn toàn sang event protocol. Không có release mới.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

### Merged PRs (8)

**WebUI polish wave:**
- **#5486**: Unified turn observability - collapse completed activity, preserve expand state, per-turn metrics
- **#5420**: Turn recovery - checkpoint interrupted turns, explicit Continue/Dismiss, no auto-resume
- **#5519**: Compact single-pane header, chronological file edits
- **#5596**: OAuth model discovery - live catalog từ OpenAI/xAI/GitHub, Grok 4.6 default
- **#5636**: Align native sidebar controls với WebUI
- **#5599**: Stream gateway logs trong launcher
- **#5676**: Desktop target selection - Python/Desktop độc lập, per-invocation choice
- **#5709**: Codex model catalog refresh cho Astra

**Cleanup:**
- **#5823**: Xóa legacy message projection, WebUI dùng events thuần

### Active PRs quan trọng

**High-priority fixes:**
- **#5838**: Fix API routing - mỗi `session_id` ra chat riêng thay vì tất cả vào `api:default`
- **#5403** (P1): Dùng API-reported tokens cho consolidation thay vì tiktoken (undercounts 30-50%)
- **#4608** (P1): Emergency tool result truncation - prevent context overflow khi multiple large tool outputs

**Infrastructure:**
- **#5817**: Self-update flows (`nanobot update` cho stable, `--dev` cho source)
- **#5811**: Execute subagents qua private sessions, shared `AgentLoop` context
- **#5815**: Optional Jev shell safeguard (OpenRouter Decisions API preflight)

**Features:**
- **#5826**: FTS5 index cho session search (thay vì scan mọi JSONL)
- **#5807**: Clean up Discord reaction state on stop
- **#5769**: Fail over trên NIM-style timeout (classify từ message text)

**Provider/Integration:**
- **#5832**: Add Unifically provider (OpenAI-compatible)
- **#5609**: Microsoft OAuth cho Office365/Outlook email channel
- **#5834**: Handle `response.reasoning_text.*` events trong SSE consumer

## 🌟 Điểm nổi bật cộng đồng

Issue **#5524** (good first issue): Request notification sound khi agent turn xong trong WebUI - default off, toggle trong Settings. Use case: user chờ long task không biết khi nào xong.

## 🐛 Ổn định & Bugs

**Critical routing bug (#5838):** OpenAI-compatible API luôn dùng `chat_id="default"` bất kể `session_id`, làm mess up session context, turn routes, cron bindings. Fix: route từng `session_id` ra chat riêng.

**Context overflow (#4608, #5403):** 
- Tiktoken undercount tokens → consolidation không trigger
- Large tool results exceed context → emergency truncation needed

**OAuth/Provider issues:**
- #5834: SSE consumer bỏ qua `reasoning_text.*` events
- #5769: NIM timeout wrapped trong `RuntimeError` không trigger failover
- #5836: OAuth reauth không actionable khi credentials rejected

## ✨ Yêu cầu tính năng

- **#5524**: WebUI notification sound cho completed turns
- **#5826**: FTS5 search index (đang implement)
- **#5815**: Jev shell guard (đang implement)
- **#5367**: Localize agent activity cho 10 ngôn ngữ

## 💬 Phản hồi người dùng

Không có thread discussion nổi bật. Majority feedback qua PR reviews - tập trung vào UX polish (UI noise, turn recovery, search performance).

## 🗺️ Backlog & Roadmap

**In progress (conflicts):**
- Self-update system (#5817)
- Subagent private sessions (#5811) 
- Jev shell guard (#5815)
- Context consolidation fix (#5403)
- Activity localization (#5367)

**Pattern:** Shift từ feature additions sang refinement - fix routing bugs, optimize performance, clean up legacy paths. OAuth provider expansion tiếp tục (Microsoft, Unifically).

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo phân tích Zeroclaw - 21/09/2026

## 1. Tóm tắt hôm nay

Zeroclaw tập trung fix lỗi trên WhatsApp Web channel (ảnh, mention, poll) và đóng issues quan trọng về ACP transcript persistence, token accounting. Không có release mới.

## 2. Releases

Không có release trong 24h qua.

## 3. Tiến độ dự án

**PR merge gần đây:**
- #9134 ✅ CLOSED: fix plugins - dùng exact component payload bytes thay vì reopen wasm_path
- #9830 ✅ CLOSED: tách browser automation ra khỏi browser_open, opt-in thay vì force-merge vào auto-approve
- #10697 ✅ CLOSED: fix ZeroCode ACP transcript drop text trước tool call
- #9713 ✅ CLOSED: expose token accounting trên history-trim events

**PR đang review (high activity):**
- #10197: persist interrupted ACP turn progress - checkpoint prompt/tool results trước khi forward
- #10979: WhatsApp Web implement create_room/invite_user cho group creation
- #10860: keep non-image data-URI markers in tool results as text
- #10986: fix channel-addressed tools nhận đúng channel instances
- #10982: attach inline preview cho outgoing WhatsApp images
- #10980: attach first-page preview cho PDF documents trên WhatsApp
- #10817: fail closed during version preparation trong release script

**Xu hướng:**
- WhatsApp Web channel được polish mạnh (mentions, images, polls, documents)
- ACP/ZeroCode reliability fixes stack up
- Security/sandbox policy work tiếp tục (#7821, #10337, #9428)
- Resource management: cost tracking, iteration budgets (#10804, #10351)

## 4. Điểm nổi bật cộng đồng

**Issues nhiều tương tác:**
- #8692 (15 comments): Maintainer decision queue cho RFCs - tracker tập trung quyết định
- #10977 (4 comments): WhatsApp Web group creation feature request
- #10983 (2 comments): Native polls cho WhatsApp
- #10970 (2 comments): RFC host-scoped admission control - resource bounds cho multi-agent machines
- #10968 (2 comments): 🔴 **S0 - security risk** - unattended turns (cron, heartbeat, headless SOP) run without ApprovalManager

**Vấn đề người dùng quan tâm:**
- WhatsApp integration quality (images, mentions, groups)
- Multi-agent resource management
- ACP/ZeroCode stability

## 5. Ổn định & Bugs

**Critical bugs (P1):**
- #10975: WhatsApp inbound images không download - agent nhận text "[Image]", vision không dùng được
- #10968: 🔴 **S0 security** - tool approvals im lặng bị vô hiệu hóa trong unattended turns

**Major bugs (P2):**
- #10981: WhatsApp outgoing images show empty card - thiếu jpegThumbnail/dimensions → **FIXING** #10982
- #10976: WhatsApp mentions broken hai chiều - inbound as bare JID, outbound as plain text
- #10977: WhatsApp group creation chưa implement → **FIXING** #10979

**Bugs đã fix:**
- ✅ ACP transcript drop pre-tool text
- ✅ Token counts missing từ history-trim notices
- ✅ Browser automation force-merged vào auto-approve
- ✅ Plugins reopen wasm_path thay vì dùng admitted bytes

## 6. Yêu cầu tính năng

**Mới:**
- #10983: Native polls cho WhatsApp Web - Channel trait hook
- #10977: WhatsApp group creation via channel_room tool
- #10969: Jitter window cho cron/heartbeat dispatch - tránh thundering herd
- #11008: llmfit workflow trong getting-started docs

**Đang implement:**
- #10596: Paginate persisted ACP transcripts
- #10621: Coordinate agent lifecycle mutations
- #10351: Execution-tree iteration budgets

**RFC đang discuss:**
- #10970: Host-scoped admission control cho multi-agent machines
- #8289: OIDC milestone - canonical principals & inbound auth

## 7. Phản hồi người dùng

**Positive signals:**
- Nhiều PR từ community contributors (@RustLangLatam, @MannXo, @vrurg, @ump45nose, @sebkraemer, @pederbe)
- WhatsApp channel được invest mạnh - dấu hiệu có adoption thực tế

**Pain points từ issues:**
- WhatsApp images/mentions/groups broken → blocking real usage
- Security: unattended agent turns bypass approval policy
- Multi-agent resource management chưa có → machines unstable khi run nhiều agents
- ACP/ZeroCode stability issues gây mất dữ liệu

**Contributor activity:**
- @Audacity88 (distinguished): 13 PRs active
- @JordanTheJet (distinguished): 4 PRs active  
- @RustLangLatam: 4 PRs về WhatsApp trong 2 ngày

## 8. Backlog & Roadmap

**Theo tracker #8692 (maintainer decision queue):**
- Chờ maintainer review: OIDC auth, multi-channel auth, sandbox policies
- Release-gate PRs: version bump script fixes, dev dependency ordering

**Milestone inferred từ labels:**
- Identity & Access (OIDC): #8289 tracker
- ACP/ZeroCode stability: #10197, #10596, #10722, #10801
- Multi-agent resource management: #10970 RFC, #10804, #10351
- Channel security: #9428 sender authorization

**Technical debt:**
- Sandbox policy canonical schema (#7821) - stalled 3 months, needs author action
- Git operations allowed roots (#10337) - 27 ngày, needs review
- Windows service stdout/stderr bounds (#10931)

**Risk areas:**
- 🔴 Security: unattended turns bypass approvals (#10968)
- 🟡 Stability: image recovery, cost tracking, context overflow
- 🟡 WhatsApp channel: nhiều bugs block adoption

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-09-21

## 1. Tóm tắt hôm nay

Ngày chủ yếu xử lý backlog cũ: bot đánh dấu 4 issue/PR stale, đóng 1 bug DingTalk cũ và 2 PR (docs sprint plan + Pilot MCP). Không có release, không có code activity mới. Cộng đồng yên tĩnh.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đang mở:**
- **#3378** (OAuth scope bug): Fix token refresh dùng hardcoded `"openid profile email"` thay vì `cfg.Scopes` được config. Breaking khi provider cần scope khác.
- **#3354** (IRC multiline): Support IRCv3 `draft/multiline` để ghép message >512 byte thành 1 message nguyên vẹn. Giải quyết #3287.
- **#3353** (tool feedback animation): Bound animation 5 phút, dừng ngay khi edit fail. Tránh infinite loop edit channel message.

**PR đóng hôm nay:**
- **#3367** (Pilot MCP docs): Merged hoặc reject, không rõ commit.
- **#3383** (v0.11.0 sprint plan): Design doc cho tracks 67–75 (agentic web3, module trust, ACP/mesh). Đóng ngay sau mở → có thể chuyển sang internal tracker hoặc rework.

**Xu hướng:** Tập trung fix edge case (auth, IRC protocol) và bound resource leak. Không có feature lớn mới.

## 4. Điểm nổi bật cộng đồng

- **#3281** (Web UI lag): 2 👍, 12 comment. Input box lag khi history dài. Stale nhưng chưa fix → pain point rõ ràng.
- **#3366** (OpenAI compatible providers): User muốn thêm self-hosted router như 9Router. Demand cho custom provider endpoint.
- **#3369** (OpenCode Go session header): 2 👍, đóng → có thể đã fix hoặc reject.

## 5. Ổn định & Bugs

**Bug nghiêm trọng:**
- **#3382** (DingTalk panic): v0.3.1 vẫn panic `send on closed channel` (client.go:161) khi stream SDK reconnect. Cùng root cause với #973 (đã đóng). Bug regression → upstream SDK hoặc gateway reconnect logic chưa ổn.

**Bug UX:**
- **#3281**: Web UI input lag khi history dài. Có thể render/diff issue.

**Bug auth:**
- **#3378**: OAuth refresh dùng wrong scope → token invalid với provider yêu cầu scope khác.

## 6. Yêu cầu tính năng

- **#3366**: OpenAI-compatible custom provider endpoint. User case: self-hosted router, không muốn hardcode vào code.
- **#3287**: IRC long message reassembly. Đang fix qua #3354.
- **#3369**: OpenCode Go `x-opencode-session` header mapping. Đã đóng → unclear status.

## 7. Phản hồi người dùng

- **DingTalk stability**: 2 issue (#973, #3382) về panic reconnect. Production concern.
- **Web UI performance**: Input lag khi history nhiều → degraded UX, không scale.
- **Provider flexibility**: Request cho custom OpenAI endpoint → hiện tại provider list cứng, không đủ linh hoạt cho self-hosted setup.

## 8. Backlog & Roadmap

**v0.11.0 sprint plan** (#3383 closed):
- Tracks 67–75: agentic web3, module trust, ACP/mesh depth
- Design doc tồn tại nhưng PR đóng ngay → execution status unclear. Có thể moved to internal planning hoặc deferred.

**Stale backlog:**
- 4 issue/PR marked stale hôm nay (#3287, #3281, #3366, #3378)
- Team chưa prioritize fix → resource constraint hoặc waiting contributor

**Critical path:**
- Fix DingTalk panic regression (#3382)
- Merge IRC multiline (#3354) để close #3287
- Decide on OAuth scope fix (#3378) → breaking change risk

---

**Assessment:** Maintenance day. Bot cleanup stale items, no new development momentum. DingTalk panic regression cần urgent fix. Web UI performance và provider flexibility là recurring user pain.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-09-21

## 1. Tóm tắt hôm nay

Đóng hàng loạt 29 PR cũ (từ tháng 3-8), chủ yếu fix và setup. Bug mới #3858: WhatsApp không hiển thị tên người gửi, agent chỉ nhận JID. Dọn dẹp backlog, không có tính năng mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Đóng 29 PR trong ngày:**

- **Fix core**: OpenCode timing race (#3463), session idle recovery (#3346), card support Chat SDK (#2265)
- **Fix WhatsApp**: auth retry loop (#746), group mentions (#2565), restart hammering
- **Fix CLI**: group delete cascade (#2526), scope enforcement (#2392), companion rows (#2416)
- **Fix skills**: SQLite wrapper thay CLI (#2309), OAuth auto-refresh (#1076), iCloud tools (#706)
- **Setup/infra**: migrate-v2 health check (#2287), Baileys pin 7.0.0-rc.9 (#2284), CI guards sau rename repo (#2402)

**Pattern**: Sửa bug tích lũy, tăng độ ổn định. Nhiều fix liên quan timing/race condition và cleanup orphan state. CLI scope security được tăng cường.

## 4. Điểm nổi bật cộng đồng

Issue #3858 mới mở hôm qua: **WhatsApp group participants không có display name**. Agent chỉ nhận phone JID, không phân biệt được ai nói. Tác giả @glifocat (core team). Chưa có bình luận hoặc reaction nào.

Đáng chú ý: Toàn bộ 29 PR đóng đều do @glifocat tạo và đóng cùng ngày. Không có PR nào từ contributor ngoài.

## 5. Ổn định & Bugs

**Bug đang mở:**

- **#3858 WhatsApp sender names**: Native adapter không truyền display name. Agent thấy mỗi JID → không usable cho group chat

**Bug đã fix hôm nay:**

- OpenCode timing: snapshot không kịp trước `session.idle` (#3463)
- Session idle loop: resume mà không có work → crash (#3346)
- WhatsApp restart loop khi auth fail (#746)
- CLI groups delete fail với foreign key constraint (#2526)
- Orphan `processing_ack` rows gây respawn loop (#2151)

## 6. Yêu cầu tính năng

Không có feature request mới. PRs đóng hôm nay chỉ fix bug và bổ sung tool (iCloud CalDAV/CardDAV #706).

## 7. Phản hồi người dùng

Issue #3858 chỉ có 1 tác giả report, 0 bình luận. Không có feedback hoặc discussion nào khác trong ngày.

## 8. Backlog & Roadmap

**Đã xử lý backlog**: 29 PR từ Q2-Q3 2026 được đóng, phần lớn là fix kỹ thuật nội bộ.

**Còn lại**:

- #3858: cần fix WhatsApp display name
- #3463: vẫn OPEN (OpenCode delta fallback) — có thể chưa merge hoặc đợi test thêm

**Xu hướng**: Dự án focus cleanup và stabilization, không có roadmap công khai. Không có milestone hoặc tính năng lớn được announce.

---

**Kết luận**: Ngày dọn dẹp backlog. Team core đóng 29 PR tích lũy, tăng độ ổn định. Bug WhatsApp mới cần ưu tiên vì block use case group chat. Thiếu hoạt động cộng đồng (contributor ngoài).

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo hoạt động NullClaw - 2026-09-21

## 1. Tóm tắt hôm nay

Hoạt động yên tĩnh. Một issue enhancement về thông báo lỗi khi Ollama model không hỗ trợ tools. Không có PR hay release mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Issue #1000 - Ollama incompatibility notification**
- Tác giả phải dùng Wireshark mới phát hiện model Ollama không support tools
- Hiện tại chỉ hiện "adapter error" không rõ ràng
- Đề xuất: thêm thông báo cụ thể khi phát hiện model thiếu tool support
- Trạng thái: OPEN, 1 comment, chưa có assignee

Developer experience problem. Error message không đủ thông tin → user tốn thời gian debug.

## 4. Điểm nổi bật cộng đồng

Issue #1000 mới 1 ngày, chưa có tương tác nhiều. Vấn đề thuộc developer experience - quan trọng cho adoption nhưng chưa thu hút attention.

## 5. Ổn định & Bugs

**Error handling gap**
- Ollama adapter không validate tool support trước khi gọi
- Error message generic, thiếu context
- User cần reverse-engineer bằng network debugging tool

Bug thuộc category: silent failure với unhelpful error.

## 6. Yêu cầu tính năng

Enhancement #1000 yêu cầu:
- Pre-flight check: validate model capabilities trước khi execute
- Error message rõ ràng: "Model X không support function calling, cần dùng model Y"
- Có thể mở rộng: suggest compatible models

## 7. Phản hồi người dùng

Một user gặp friction khi integrate Ollama. Phải dùng Wireshark → cho thấy documentation hoặc error handling thiếu. Tone constructive, đề xuất cải thiện thay vì complain.

## 8. Backlog & Roadmap

Dựa vào issue #1000:
- Short-term: cải thiện error message cho Ollama adapter
- Pattern này có thể áp dụng cho adapters khác (validation + clear errors)
- Milestone chưa set, priority chưa rõ

**Quan sát thêm:**
- Issue số 1000 → project đã có lịch sử development đáng kể
- Hoạt động ngày 21/9 thấp → có thể weekend hoặc team nhỏ
- Focus vào developer experience là tín hiệu tốt cho maintainability

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 2026-09-21

## 1. Tóm tắt hôm nay

Chuẩn bị phát hành **1.4.1-rc.1** với PR #8105. Merge bugfix quan trọng về OAuth provider (#8102) - fix lỗi không activate được Gmail/Calendar khi config qua Web UI. Dependabot đẩy 3 PR dependencies đang chờ review.

## 2. Releases

Không có release trong 24h. PR #8105 bump version lên **1.4.1-rc.1**, sẵn sàng tag sau khi merge.

## 3. Tiến độ dự án

**Hoạt động chính:**

- **#8105** (OPEN): Version bump cho RC 1.4.1 - cần merge để workflow tự động tag
- **#8102** (CLOSED): Fix critical bug provider OAuth - resolve readiness live thay vì cache cũ, ưu tiên admin config. User config qua Web UI giờ work đúng.
- **#8104, #8099** (deps): Bump 29 dependencies Rust (uuid, base64, rust_decimal, tokio, axum...) - #8104 mới nhất thay #8099
- **#8103, #8079** (deps): Bump 8 GitHub Actions dependencies - #8103 mới nhất thay #8079
- **#7834** (OPEN từ 23/8): Bump WASM dependencies (wasmtime, wit-component) - đánh dấu medium risk, L size - chưa merge 1 tháng
- **#8078** (OPEN): Bump tokio-ecosystem (tower-http 0.7.0→0.7.1, tokio-tungstenite)

**Xu hướng:** Release engineering + dependency maintenance. Fix bugs production quan trọng (OAuth). Không có feature PR mới.

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có reaction hoặc bình luận nhiều. Activity thấp về engagement - chủ yếu automation (dependabot) và maintainer work.

## 5. Ổn định & Bugs

**#8102 (MERGED):** Gmail/Google Calendar activation fail khi operator dùng Web UI config OAuth client thay vì env vars. Root cause: code check provider readiness từ stale cache thay vì live query DB, và không ưu tiên admin config. 

Fix: query live, admin config precedence rõ ràng.

Severity: HIGH - block production feature hoàn toàn nếu dùng Web UI config (common deployment pattern).

## 6. Yêu cầu tính năng

Không có feature request mới trong 24h.

## 7. Phản hồi người dùng

Không có issues/discussions từ user trong dataset.

## 8. Backlog & Roadmap

**Immediate:** Merge #8105 → cut 1.4.1-rc.1 release với OAuth fix.

**Pending merge:**
- #7834: WASM deps upgrade đang pending 1 tháng - medium risk, cần test kỹ
- #8104, #8103, #8078: Dependencies Rust và Actions - routine maintenance

Không có roadmap công khai trong data. RC pattern suggest iterative stability work trước major release.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-09-21

## 🎯 Tóm tắt hôm nay

Beta 2.2.2b3 vừa ra mắt, tập trung vào fixes console UI và CI. Nhiều PRs xử lý bugs nghiêm trọng về tool approval, audio handling, context window, và memory leaks. Cộng đồng quan tâm đến Hub multi-tenant sắp ra mắt và các vấn đề UX như session loss.

---

## 📦 Releases

### v2.2.2-beta.3 (2026-09-20)
- **Fixes**: Console assistant response actions (sau redesign #7502)
- **CI/E2E**: Harden selectors + session-list assertions
- **Impact**: Ổn định UI sau major redesign, chuẩn bị cho 2.2.2 stable

---

## 🚀 Tiến độ dự án

### PRs quan trọng đang mở

**🔴 Critical fixes:**
- #7906: DoomLoopGate sai escalate → TERMINATE khi không có tool-call mới
- #7896: Idle cleanup drop messages khi consumer đang stop
- #7893: Memory backend rollback không restore runtime
- #7869: OpenCode header thiếu → 403 errors

**🟡 Feature PRs:**
- #7899: **Lớn nhất** — Unify model discovery/pricing/selection (rayrayraykk)
- #7903: Community feed + Platform account sync (Osier-Yi)
- #7861: Multi-tab chat terminal with auth (zhijianma)
- #7719: Separate model cho ReMeLight memory writing

**🟢 UX improvements:**
- #7846: Session list grouping + details
- #7829: Console lazy-load locales (-bundle size)
- #7902: File tab refresh on activation

### Xu hướng

1. **Model management** đang được refactor toàn bộ (#7899)
2. **Community integration** — kết nối Platform, feed, issue reports (#7903)
3. **Security hardening** — skill directory protection (#7864), audio injection (#7887)
4. **Performance** — bundle splitting, lazy loading (#7829, #7894 +1027 test statements)

---

## 💬 Điểm nổi bật cộng đồng

### Issue hot nhất

**#7318 (31 comments, 4 👍)**: Discussion về Hub multi-tenant sắp ra 2.2.0 — community hỏi "build gì tiếp theo?"

**#7724 (5 comments)**: **Session loss** — user mất conversation 9h sáng, model config cũng mất. Lặp lại nhiều lần (#7708).

**#7884 (4 comments)**: History không load đủ sau compression → UX rất tệ.

---

## 🐛 Ổn định & Bugs

### Nghiêm trọng

1. **Tool approval broken** (#7856 → #7904 fixed): qwenpaw-pet 0.1.1 drop `actor` arg → 500 errors
2. **Audio injection** (#7876 → #7887): DeepSeek reject `input_audio` part, fallback không trigger → conversation chết vĩnh viễn
3. **Image base64 leak** (#7853): `view_image` base64 không bao giờ bị prune → context explode
4. **DoomLoop false positive** (#7905 → #7906): Text-only response trigger TERMINATE sai

### Đang fix

- #7888: Console error boundary stuck "Something went wrong" — DOM mutation race condition
- #7881: kimi-code ACP runner bỏ qua boundary checks (Edit blocked, Write/Bash blind)
- #7648: Web title không custom được → nhiều tabs QwenPaw khó phân biệt

---

## ✨ Yêu cầu tính năng

1. **Per-agent avatar** (#4974 → merged): Upload avatar cho agent, hiện ở list/chat/switcher
2. **Network title** (#7648): Custom web title cho multi-project setup
3. **Reranker UI** (#6399): Visual config cho reranker backend trong ReMeLight
4. **Vision fallback** (#5726): Text-only model tự động gọi vision model khi có image
5. **Desktop path links** (#5836 → merged): Click local path trong chat → mở File Explorer

---

## 📢 Phản hồi người dùng

### Tích cực
- Avatar support đã merge (#4974 closed 2026-09-21)
- Desktop path links hoạt động (#5836 closed)
- E2E test coverage tăng mạnh (#7894: +1027 statements)

### Tiêu cực / Pain points
- **Session loss** (#7724): Vấn đề lặp lại, mất data không recover được
- **Model config reset** (#7724, #7708): Đột nhiên mất config đã set
- **History truncation** (#7884): Không đủ context, không scroll lên được
- **Free-tier misleading** (#7882): OpenCode models hiển thị "free" nhưng 403 qua API
- **Hub ?token= auth** (#7900): File preview broken vì Hub không hỗ trợ query-string token

---

## 🗓️ Backlog & Roadmap

### Sắp tới (2.2.x)
- **Hub multi-tenant** (#7318): Feature chính của 2.2.0, community đang vote roadmap tiếp theo
- **Model unification** (#7899): PR lớn đang review, refactor toàn bộ model management
- **Community integration** (#7903): Feed + Platform sync
- **Realtime voice** (#7785): Speech input/output, interruption support

### Under review / blocked
- #7869: OpenCode session header (cần confirm endpoint requirements)
- #7843: AgentScope Platform provider (waiting merge after #7899)
- #7719: Separate memory model (needs agentscope core support)

---

**Tổng kết**: Dự án đang push hard về stability (nhiều critical fixes) và community features (Hub, Platform integration). Session loss là pain point lớn nhất hiện tại. Model management đang được rebuild fundamentally.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*