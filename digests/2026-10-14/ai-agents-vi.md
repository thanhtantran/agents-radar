# Bản tin Hệ sinh thái Hermes Agent 2026-10-14

> Issues: 141 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-14 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-14

## 📊 Tóm tắt hôm nay

Dự án xử lý bug về context compression, gateway lifecycle và permission handling. Không có release mới. Tập trung fix các edge case trong multiplexed gateway, quota management và platform-specific issues (Telegram threads, Discord, Android IME).

## 🚀 Releases

Không có release mới trong 24h qua.

## 📈 Tiến độ dự án

### PRs quan trọng mới (2026-10-14)

**Compression & Session State:**
- #138130: Pre-API compression timeout → turn kết thúc sai. Bây giờ check window trước khi bail.
- #103373: Plugin context engine làm compression budget không reset → long turn chết sau 10 lần compact. Fixed.

**Gateway Lifecycle:**
- #138132: Concurrent `config.yaml` writes mất data. Thêm file lock.
- #137553: Internal wakes bị nhận giữa lúc gateway drain → mất message. Bây giờ refuse luôn.
- #137995: `hermes gateway restart` kill gateway healthy nếu Telegram adapters boot > 155s (18 profiles = 210s boot). Need readiness extension.

**Platform Fixes:**
- #138144: Telegram exec approval timeout không có log → không debug được. Thêm delivery boundary logs.
- #137360: Android IME không type được trong dashboard terminal (keyCode 229 bị block). Fixed.
- #138105: Multiplex cron re-parse config cho mỗi profile mỗi 60s → starve Discord heartbeat. Need cache.

**Auth & Quota:**
- #138138: Codex quota cooldown clear toàn bộ pool thay vì scope theo credential → leak recovery.
- #138128: Fallback candidate không re-probe live quota trước khi bench → false exhaustion.

### Issues nổi bật

**P1 Critical:**
- #137838: macOS gateway exit(75) lặp đi lặp lại, root cause chưa rõ (MCP stream theory bị rút lại).
- #138130: Compression timeout làm turn chết sai → blocking production usage.

**P2 High Impact:**
- #136567: Telegram thread mới → opening message không có thread_id → lobby recovery route sai topic (19 comments, 4 👍).
- #106592: Remote Desktop update báo fail dù backend restart thành công → confusing UX (8 comments).
- #136350: `compression.threshold_tokens` = 256k thay vì `null` default → compact spam trong long session (6 comments).

**User Pain Points:**
- #110374: Slack status indicator im lặng broken với slack-sdk ≥ 3.44 (10 👍).
- #52341: Không có temporary/incognito chat mode (6 👍) → privacy concern.
- #117322: Linux users muốn Flathub package (4 👍).

## 🐛 Ổn định & Bugs

**Session State Issues:**
- Compression: budget không re-arm (#103373), timeout handling sai (#138130), threshold config sai (#136350).
- Gateway lifecycle: concurrent writes (#138132), drain timing (#137553, #137995), message loss risk.

**Platform Specific:**
- Telegram: thread routing (#136567), exec approval delivery (#138144).
- Android: IME input broken (#137360).
- Windows: ffmpeg/agent-browser install fail với WinError 5 (#131884).

**Auth & Quota:**
- Codex: quota cooldown scope leak (#138138, #138125), fallback probe missing (#138128).

**Install/Update:**
- Docker: PM dependency gen drop extras → MCP missing (#135329).
- Termux: update hard-refuse git install, unavailable remediation (#128831).
- uv: exclude-newer seed vào user locks (#138134).

## ✨ Yêu cầu tính năng

**CLI/UX:**
- #121004: `/goal queue` thay vì replace (implemented in PR).
- #52341: Temporary chat mode (6 👍).
- #50718: Session visibility cues - unread markers, needs-input, OS badges (10 comments, 3 👍).

**Tools:**
- #80222: Per-call model/reasoning_effort override cho `delegate_task` (8 comments, 3 👍).
- #114578: Pin MCP server eager với `defer: false` (implemented).

**Memory:**
- #5320: Raise memory_char_limit defaults, surface usage pressure (13 comments, 3 👍).
- #116673: MEMORY.md anchor document chain (in progress PR).

**Voice:**
- #138126: Voice-only auto replies (PR mới).
- #138127: Public speech streaming cho Responses API (PR mới).

## 👥 Phản hồi người dùng

**High Engagement:**
- Multi-profile fleets: Gateway restart timing (#137995), cron overhead (#138105) → production pain.
- Telegram DM topics: Thread routing bug (#136567) actively breaks workflow.
- Security: npm audit (#129426), dependency pins (#134394) → audit findings cần action.

**UX Gaps:**
- Desktop browser guard reject focused tile (#133421).
- Linux launcher không link window (#127856).
- Slash commands silent fail với image attachment (#81798).

**Community Contributions:**
- Plugin catalog: Korean lang pack (#138136), session-mirror plugin (#138145).

## 📋 Backlog & Roadmap

**Immediate (P1/P2):**
- Gateway lifecycle hardening: restart timing, drain safety, message delivery.
- Compression: timeout handling, budget re-arm, threshold config.
- Platform stability: Telegram threads, Android IME, Windows installs.

**Short-term:**
- Auth scope fixes: Codex quota isolation.
- Security: Dependency pins update (#134394), npm audit remediation (#129426).
- Install reliability: Docker extras, Termux git path, uv lock seed.

**Mid-term:**
- Session visibility (#50718).
- Delegation features: per-call overrides (#80222), kanban CLI in worker context (#123733).
- Memory: MEMORY.md chains (#116673), char limit defaults (#5320).

**Open Questions:**
- #125110: Model autopilot với quota/cache awareness - thiết kế chưa converge (needs-decision).
- #133212: Subagent lifecycle v1.1 - plugin orchestrator API surface (needs-decision).
- #134889: Unified gateway runtime (#106742) - testing phase, merge gate chưa rõ.

---

**Trend:** Codebase ổn định hơn, focus shift từ core features sang edge-case hardening, platform compatibility và multi-profile deployment reliability. Community engagement tăng (plugin catalog, lang packs). Security/dependency backlog cần sweep.

---

## So sánh hệ sinh thái chéo

# Báo cáo So Sánh Hệ Sinh Thái AI Agent - 2026-10-14

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent phân tầng rõ:
- **Enterprise-grade**: Hermes Agent, OpenClaw - focus production reliability, multi-adapter deployment
- **Developer tools**: Zeroclaw - plugin system + gateway architecture
- **Emerging platforms**: NanoBot, QwenPaw - feature iteration nhanh
- **Experimental**: PicoClaw, NanoClaw, IronClaw - low activity, niche use cases

**Tín hiệu chính**: Shift từ feature race sang stability hardening. Hermes + OpenClaw tập trung edge-case bugs, compression/session state. Zeroclaw mature plugin system. NanoBot fix critical Docker onboarding. QwenPaw polish Console UX.

## 2. 🔢 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Engagement | Trạng thái |
|-------|--------|-----|----------|------------|-----------|
| **Hermes Agent** | 141 | 500 | 0 | Cao - production bug reports | 🔥 Hardening phase |
| **OpenClaw** | 105 | 500 | 2 | Cao - update system crisis | ⚠️ Firefighting |
| **Zeroclaw** | 2 | 50 | 0 | Trung bình - plugin ecosystem | ✅ Feature delivery |
| **NanoBot** | 6 | 27 | 0 | Thấp - infra fixes | 🔧 Foundation work |
| **QwenPaw** | 18 | 42 | 0 | Trung bình - UI polish | 🎨 Refinement |
| **PicoClaw** | 7 | 2 | 0 | Thấp - stale bot cleanup | 💤 Maintenance |
| **NanoClaw** | 1 | 3 | 0 | Rất thấp - critical fix merged | 🐛 Bug triage |
| **IronClaw** | 1 | 1 | 0 | Không có - proposal waiting | 🤔 Planning |
| **NullClaw** | 0 | 0 | 0 | Không có | ⚰️ Inactive |

**Insights**:
- Hermes + OpenClaw dẫn đầu activity → production deployment scale
- Zeroclaw balance features + stability
- NanoBot, QwenPaw consolidate foundations
- PicoClaw, NanoClaw, IronClaw struggling với maintainer bandwidth

## 3. 🎯 Vị thế Hermes Agent

### Strengths
**Production maturity**: 141 issues, 500 PRs → active production usage. Gateway lifecycle hardening (#137995 - 18 Telegram profiles, 210s boot time), multiplexed cron overhead (#138105), compression budget bugs (#103373) = real multi-tenant deployment pain.

**Technical depth**: Context compression engine tuning, quota management scope isolation (#138138), fallback candidate probing (#128128) → sophisticated resource management beyond basic agent execution.

**Platform breadth**: Telegram threads, Discord, Android IME, Slack - broad adapter coverage. Issues như #136567 (thread routing), #137360 (IME keyCode 229) show real-world integration complexity.

### Weaknesses
**Release cadence**: 0 releases today vs OpenClaw 2. PR merge rate 500 nhưng không ship → backlog risk.

**Documentation gaps**: Community feature requests (#52341 incognito chat, #50718 session visibility) không có clear roadmap response.

**Critical bugs unresolved**: #137838 macOS exit(75) loop, #138130 compression timeout → blocking issues linger.

### Position
**Enterprise workhorse**. Focus multi-profile fleets, gateway reliability, platform compatibility. Strength = production hardening. Gap = shipping velocity.

## 4. 🛠️ Hướng kỹ thuật chung

### Plugin/Extension architectures
- **Zeroclaw**: WASM plugin system, TLS hardening (#11228), egress logging (#11304)
- **QwenPaw**: Plugin hot reload + rollback (#7565), marketplace persistence (#8231)
- **Hermes**: Plugin context engine compression fix (#103373)

**Trend**: Isolation boundaries + resource control. WASM, subprocess, security scopes.

### Gateway/Runtime separation
- **Zeroclaw**: Phase 3 gateway extraction (RFC #5574)
- **Hermes**: Multiplexed gateway cron overhead (#138105), drain safety (#137553)
- **OpenClaw**: Unified gateway runtime (#106742) testing phase

**Pattern**: Decouple message routing từ execution context. Multi-tenancy requires clean boundaries.

### Session/State management
- **Hermes**: Compression budget (#103373), threshold config (#136350)
- **OpenClaw**: SQLite contention (#171096), session maintenance (#171211)
- **QwenPaw**: Chat history truncation (#8229), persistence (#6459)
- **NanoClaw**: Message handling (#3918) - critical fix

**Common pain**: Long sessions amplify state bugs. Compression, persistence, concurrency.

### Update/Install flows
- **OpenClaw**: Beta.3 không kill gateway (#170003), migration convergence (#167557)
- **NanoBot**: Docker onboarding (#6165 → #6171) broken
- **Zeroclaw**: Quickstart plugin install (#11309)

**Focus**: Zero-downtime updates, error recovery. First-run experience critical.

### Platform-specific quirks
- **Hermes**: Telegram threads (#136567), Android IME (#137360), Windows ffmpeg (#131884)
- **OpenClaw**: Windows startup regression (#168955), Termux namespace (#171385)
- **NanoClaw**: Apple container runtime (#3503)

**Reality**: Cross-platform = many special cases. Production deployment forces handling.

## 5. 🎭 Điểm khác biệt

### Chiến lược release
**OpenClaw**: Frequent betas (2026.10.5-beta.3) → fast iteration, community testing
**Hermes**: No releases → accumulated fixes → big-bang risk
**Zeroclaw**: Feature gates (v0.8.6-ready, v0.9.0) → phased rollout

### Community engagement
**OpenClaw**: 11-12 comments/issue → high user engagement, detailed repros
**Hermes**: Feature requests (#52341, #50718) nhiều 👍 nhưng ít discussion
**PicoClaw**: Stale bot đóng issues → maintainer không respond

### Bug triage priorities
**Hermes**: Multiplexed deployment edge cases (cron, gateway, quota)
**OpenClaw**: Update system crisis (#167557, #171096)
**NanoBot**: Onboarding blockers (#6165)
**QwenPaw**: Console UX polish (#8186, #8214)

**Pattern**: Maturity level drives focus. Mature projects fix scale issues, emerging projects fix first-run.

### Architecture philosophy
**Zeroclaw**: Declarative config, capability constructors (#11174)
**Hermes**: Runtime engine tuning (compression, session state)
**QwenPaw**: UI-first (Console stability, theme extensions #8071)

### Contributor dynamics
**Hermes**: Korean lang pack (#138136), session-mirror plugin → community extensions
**OpenClaw**: 99 contributors in 2026.10.3 → broad base
**Zeroclaw**: Distinguished contributors (IftekharUddin, JordanTheJet) → core team led
**PicoClaw**: PRs ignored → contributor frustration

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Tier 1: Production communities
**Hermes, OpenClaw**
- Multi-agent fleet deployments (#137995, #166894)
- Detailed incident reports (repros, logs, stability bundles)
- Security concerns (#129426 npm audit, #134394 dependency pins)
- Paid/hosted service discussions

**Signals**: Real money at stake. Uptime critical. Professional engagement.

### Tier 2: Developer communities
**Zeroclaw**
- Technical architecture discussions (RFC #5574, #11090)
- Security reviews (RUSTSEC-2026-0344)
- Trusted contributor system

**QwenPaw**
- Plugin development (#8128 Skill Market)
- I18n contributions (#8211)
- Theme customization requests (#8071)

**Signals**: Ecosystem building. Technical depth. Tooling focus.

### Tier 3: Early users
**NanoBot, NanoClaw**
- Critical bug discovery (#6165, #30)
- Simple integration requests (#6195 Google Drive)
- Basic usability fixes

**Signals**: Finding product-market fit. Core functionality gaps.

### Tier 4: Inactive/struggling
**PicoClaw, IronClaw, NullClaw**
- Stale bot cleanup
- Zero maintainer response
- Contributor churn

**Signals**: Maintainer bandwidth exhausted. Project may abandon.

## 7. 📈 Tín hiệu xu hướng

### Immediate (1-3 tháng)
**Gateway reliability hardening**: Hermes, OpenClaw focus multi-tenant deployment stability. Drain safety, message delivery, concurrent config writes.

**Plugin system maturity**: Zeroclaw WASM security, QwenPaw hot reload → extensibility becomes production-grade.

**Update flow zero-downtime**: OpenClaw beta cycles, Zeroclaw quickstart installs → first-run + upgrade experience critical retention.

### Mid-term (3-6 tháng)
**Session state persistence convergence**: SQLite adoption (NanoBot #5943, OpenClaw contention fixes). JSONL → DB migration pattern.

**Platform-native runtimes**: NanoClaw Apple containers, NanoBot subprocess isolation. Docker overhead pushed lightweight alternatives.

**Security boundaries formalization**: WASM, sandbox backends (#163405), OAuth scope isolation (#138138). Attack surface awareness growing.

### Long-term (6-12 tháng)
**MCP protocol adoption**: Hermes compression, OpenClaw per-request headers (#154043), IronClaw Plazmi. Standardized tool interfaces.

**Voice/multimodal channels**: Hermes voice-only replies (#138126), Zeroclaw Gemini speech (#10430). Text-first → multimodal-first.

**Autonomous agent safety**: NanoClaw maxTurns (#30), Hermes iteration limits (#440), Zeroclaw delegate bounds (#10391). Runaway loops = real production pain.

**Memory/knowledge systems**: Hermes MEMORY.md chains (#116673), OpenClaw memory char limits (#5320). Long-term context = next frontier.

### Consolidation signals
**Fewer projects surviving**: NullClaw dead, PicoClaw stale-bot cleanup, IronClaw zero activity. Market concentrate around 3-4 winners.

**Feature convergence**: Plugin systems, gateway patterns, session management → similar solutions emerge. Differentiation = execution quality, not architecture novelty.

**Enterprise vs hobby bifurcation**: Hermes/OpenClaw production focus vs experimental projects. Gap widening. Hobby projects need maintainer sustainability or die.

---

## 💡 Kết luận chiến lược

Hermes Agent = **enterprise-grade foundation**. Strength multi-tenant deployment, adapter breadth, production hardening. Gap shipping velocity + roadmap visibility.

OpenClaw = **fast-moving challenger**. Aggressive beta cycles, community testing, update UX focus. Risk stability regressions (startup 2.5x slower).

Zeroclaw = **technical depth leader**. Clean architecture (gateway separation, plugin WASM), security-conscious. Slower feature velocity.

QwenPaw, NanoBot = **UI/DX innovators**. Console polish, onboarding improvements. Foundation still settling.

PicoClaw, NanoClaw, IronClaw = **niche/struggling**. Maintainer bandwidth crisis. Likely consolidate or abandon.

**Winning strategy**: Production reliability + fast iteration + community engagement. Hermes có 2/3. Cần tăng release cadence + roadmap transparency.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-14

## 1. 📋 Tóm tắt hôm nay

Phát hành **2026.10.3 chính thức** và **2026.10.5-beta.3**. Tập trung sửa lỗi update, cải thiện hiệu năng (session maintenance, SQLite contention), và xử lý regressions nghiêm trọng (startup ~1030s trên Windows, plugin reload EPERM). Cộng đồng báo cáo nhiều vấn đề edge-case về async delivery, authentication và sandbox.

---

## 2. 🚀 Releases

### v2026.10.3 (chính thức)
- **90 commits, 79 PRs, 99 contributors**
- Không có chi tiết changelog đầy đủ trong dữ liệu
- Likely tập trung vào các PR merged từ beta cycles trước

### v2026.10.5-beta.3
**Điểm chính:**
- **Updates không kill Gateway** (pnpm 12, Windows Scheduled Tasks, macOS Bun service)
- Sửa service-install failures không để Gateway stopped
- PRs: #170003, #169059, #170131, #169244, #169481, #169563, #170006, #169662, #169658, #169915
- Credit: @xilopaint, @k-sekula

**Ý nghĩa:** Update UX cải thiện đáng kể — users không mất connectivity trong quá trình nâng cấp.

---

## 3. 🔧 Tiến độ dự án

### PRs hot (theo bình luận)

**Bugs nghiêm trọng đang sửa:**

1. **#169820** [LINE]: Quote bot message sau restart không address bot
   - **Impact**: Message loss
   - **Status**: Open, needs proof

2. **#154043** [MCP]: Per-request header provider — giảm re-catalog 221→0
   - **Impact**: Performance critical
   - **Status**: Open, sufficient proof, compatibility risk

3. **#163405** [Sandbox]: Local SRT backend (no Docker)
   - **Status**: Open, needs proof, security boundary risk

**Performance:**

4. **#171211**: Session maintenance tránh writer work vô ích
   - **Status**: Open, perf fix

5. **#171540**: Bound transcript append writer residency
   - **Status**: Open, memory amplification fix

**UI/UX:**

6. **#171533**: Fix attached work, no empty expanders
7. **#163153** [iOS]: Keep reader place khi history load/stream
8. **#167743**: Config form unset preferences show muted defaults

### Issues critical (theo bình luận)

**P0/P1 crash-loop:**

1. **#168955** [OPEN, P1, 12 comments]: Startup regression 2026.10.1 — 410s→1030s Windows
   - **Root cause**: `sidecars.control-ui-assets` block 477s
   - **Status**: Needs maintainer review

2. **#166894** [OPEN, P0, 9 comments]: Gateway hang 30min–2h Windows multi-agent
   - **Version**: 2026.9.8
   - **Status**: Needs info

3. **#163029** [OPEN, P1, 11 comments]: External plugin reload mid-turn 40–70s stall (2026.9.7)
   - **Despite**: Fix #160658 merged
   - **Status**: Needs maintainer review

**Session-state & message-loss:**

4. **#154834** [CLOSED, P2, 11 comments]: Failed subagent delivery recurs every turn
   - **Status**: Closed recently

5. **#125764** [OPEN, P1, 11 comments]: Telegram network-failed sends dead-lettered (no retry)
   - **Status**: Needs product decision

6. **#155119** [OPEN, P1, 7 comments]: Subagent completion — final answer truncated, delivery stuck pending

**Update system:**

7. **#171096** [OPEN, P1, 4 comments]: npm update 2026.10.2→2026.10.3 fails on slow-disk NAS
   - **Cause**: SQLite lock contention exhausts validation budgets
   - **Status**: Needs maintainer review

8. **#170335** [OPEN, P2, 4 comments]: Update removes snapshots it said must preserve
   - **Status**: Linked PR open

**Xu hướng:**
- Focus chuyển từ tính năng mới sang ổn định hóa update flow, session reliability, performance optimization
- Nhiều PRs trong queue merge-risk `compatibility` và `security-boundary`

---

## 4. 💬 Điểm nổi bật cộng đồng

**Top theo upvotes:**

1. **#99659** [OOM killed, 1👍]: Companion app connect → memory spike → k8s kill
2. **#87763** [2👍]: SSRF guard DNS dispatcher cause model fetch timeout (autoSelectFamily)
3. **#119565** [1👍]: Concurrent MCP calls → memory amplification với Codex native hooks
4. **#48709** [0👍, 8 comments]: Gemini 2.5 Pro — textSignature bloat + think tags cause session failures

**Trending issues (nhiều activity):**
- **Telegram/Slack socket leaks** (#128809): 10-connection cap, half-open connections die silently
- **IRC reconnect loop** (#101083): Non-recoverable login error → reports healthy while dead-looping
- **Async exec completions land wrong session** (#130249): Context-free delivery → message mismatch

**Chủ đề:**
- Authentication edge cases (OAuth rotation, profile exhaustion)
- Adapter reliability (Telegram, Slack socket-mode, IRC, Feishu streaming)
- Subagent/delegation delivery mechanics

---

## 5. 🐛 Ổn định & Bugs

### Regressions nghiêm trọng

**#168955 — Startup 2.5x chậm hơn (Windows)**
- 2026.9.9: ~410s
- 2026.10.1: ~1030s
- Culprit: `sidecars.control-ui-assets` 477s
- **Status**: Chưa có PR fix

**#163029 — Plugin reload mid-turn (40–70s stall)**
- Fix #160658 merged nhưng vẫn tái hiện
- Waves clustering sau Gateway start
- **Status**: Needs maintainer review

**#171385 — GatewayLockNamespaceError Termux/Android**
- New PID namespace check không tương thích Proot
- v9.9 works, v2026.10.x fails
- **Status**: Needs info

### Update system bugs

**#167557** [P0]: Plugin migration never converges (npm Linux)
- "Package convergence must wait" infinite loop
- "Managed handoff lease database identity changed"
- **Impact**: UX release blocker

**#166221**: Update 2026.9.4→2026.9.8 fail SQLite preflight
- Standalone worker succeeds
- **Likely cause**: Resource contention updater-context

**#170331**: Beta.2 update config read exits 1, systemd unchanged

### Memory & performance

**#157712** [P1]: CLI state read leak 162MB snapshots (2 staged, 1 removed at exit)
- 23GB in 25min from scheduled scripts
- **Version**: 2026.9.6

**#171351** [CLOSED]: Main thread saturated 810-agent fleet
- Follow-up #170612
- Per-call stat/realpath in session-store admission
- Full-config hash per model-catalog read

**#119565**: Concurrent MCP → memory amplification (Codex native hooks)

### Session-state corruption

**#154834** [CLOSED]: Failed subagent delivery recurs every turn
- `finalizeResumedAnnounceGiveUp` treats `failed` as terminal
- Cleanup incomplete

**#155119**: Subagent completion — final answer truncated-by-retention

**#163139** [P2]: Windows plugins.reload fail EPERM host-package link

---

## 6. ✨ Yêu cầu tính năng

### High-value requests

**#111143** [P3, 1👍]: Pin plugin tabs in Control UI sidebar
- Plugin tabs always in **More**, cannot customize
- **Rationale**: Frequently used plugin surfaces need fast access

**#70266** [P3, 1👍]: macOS Talk Mode — use assistant avatar
- Currently always default orb
- Config `ui.assistant.avatar` exists but ignored

**#116360** [P3]: Workboard card status change events
- Hook bus has no workboard events
- Notification kinds limited: `completed|failed|stale`
- **Use case**: React to arbitrary transitions

**#167457** [P2]: Android approval notifications unlock-gated actions
- First increment: connected-app, review-only notifications
- Show preview + **Review details** action → native inbox
- **Security**: No inline approve/deny without unlock

**#168624** [P3]: Android Auto support (explicit-turn messaging)
- **Ask**: Assign Android owner to assess eligibility
- Bounded: conversation-only, no autonomous features
- Coordinate with broader Auto proposal

**#170367** [P2]: OAuth usage-limit rotation
- ChatGPT/Codex 5h & weekly limits → rotate to next profile
- Currently fails until limit resets

### Lower priority

**#134887** [P2]: No discard control interrupted/cancelled pending inputs (webchat)
- State `interrupted`/`cancelled` → permanent banner
- **Ask**: Add explicit discard UI

---

## 7. 🗣️ Phản hồi người dùng

### Pain points chính

**1. Update reliability crisis**
- Multiple npm/Linux users hit stuck migrations (#167557)
- Windows update hangs 30min–2h (#166894)
- SQLite contention on slow storage (#171096)
- Service definitions not refreshed (#170331)
- **User sentiment**: "Cảm ơn đã làm việc trên này. Tôi đánh giá cao."

**2. Adapter instability**
- **Telegram**: Network failures → silent message loss (#125764)
- **Slack socket-mode**: Connection leaks, half-open deaths (#128809)
- **IRC**: Non-recoverable login → healthy status while dead-looping (#101083)
- **Feishu streaming**: Card timeout 200850 → blind retries (#139443)
- **MS Teams**: Pasted DM images always time out (#167557)

**3. Subagent/delegation brittleness**
- Completions land wrong session (#130249)
- Final answers truncated (#155119)
- `completionTarget: "parent"` dropped on claude-cli (#165920)
- Context-free delivery (#130249)

**4. Performance regressions**
- **Windows startup**: 2.5x slower 2026.10.1 (#168955)
- **Plugin reload**: 40–70s mid-turn stalls (#163029)
- **CLI leaks**: 162MB per read, 23GB/25min (#157712)

### Positive feedback

- Update UX improvements beta.3 appreciated
- Session observer utility completions working
- OAuth ChatGPT/Codex integration solid baseline

---

## 8. 📅 Backlog & Roadmap

### Inferred priorities từ labels/activity

**P0 (release blockers):**
- #166894: Gateway hang Windows multi-agent
- #167557: Plugin migration convergence failure
- Fix startup regression #168955

**P1 (next sprint):**
- Telegram retry logic #125764
- Slack socket leak #128809
- Subagent delivery #155119
- MCP memory amplification #119565
- CLI snapshot leak #157712

**P2 (backlog):**
- Android approval notifications #167457
- OAuth profile rotation #170367
- Plugin tab pinning #111143
- Update safety improvements (snapshots #170335, progress polling #171409)

**P3 (nice-to-have):**
- Android Auto assessment #168624
- Workboard events #116360
- macOS Talk Mode avatar #70266

### Technical debt identified

**Database layer:**
- SQLite contention các loại (#171096, #166221, #171351)
- Session-store admission per-call stat/realpath (#171351)
- Transcript append writer residency unbounded (#171540)
- PostgreSQL compatibility gaps (#171545)

**Memory management:**
- MCP concurrent calls amplification (#119565)
- CLI snapshot staging leak (#157712)
- Large config snapshots >64KB (#170331)

**Security boundaries:**
- SSRF guard DNS conflicts (#87763)
- Sandbox local backend audit (#163405)
- Android temp workspace ownership (#171406)

**Process isolation:**
- Async exec context-free completions (#130249)
- Plugin runtime request scope (#157144)
- Stuck-session recovery false positives (#171366)

---

## 💡 Insights

1. **Update system đang trong crisis mode** — nhiều edge cases trên storage chậm, multi-agent, protected systemd managers. Beta cycles ngắn indicate high urgency.

2. **Adapter layer fragile** — socket leaks, silent failures, retry logic thiếu. Common pattern: network transient → permanent dead-letter. Cần strategy retry toàn diện.

3. **Subagent mechanics chưa production-ready** — context loss, delivery mismatch, completion truncation. Delegation workflow need fundamental rethink.

4. **Performance regressions Windows** — startup 2.5x slower, plugin reload 40–70s stall. Windows-specific issues suggest platform-specific code paths cần profiling.

5. **Database contention bottleneck** — SQLite lock exhaustion recurring theme across update, CLI, session writes. Consider connection pooling hoặc WAL mode tuning.

6. **Security surface mở rộng** — MCP per-request headers, sandbox backends, OAuth rotation, Android integrations. Mỗi thêm attack vector mới.

7. **Cộng đồng patient but vocal** — nhiều detailed repros, logs, stability bundles. Contributors engaged. Maintain trust = respond faster P0/P1.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-14

## 🎯 Tóm tắt hôm nay

Ngày sửa lỗi nặng. 27 PR mới/cập nhật, 6 issue mới, không có release. Tập trung vào: Docker onboarding hỏng (#6165 → #6171), session lock leak (#4883 → #6194), performance (mỗi giây scan toàn bộ session #6192), recovery checkpoint mất dữ liệu (#5748, #5946, #6082). Google Drive + Sheets tool được thêm (#6195, #6196). WebUI component gallery xuất hiện (#6179 merged → #6166 closed conflict).

## 📦 Releases

Không có.

## 🚀 Tiến độ dự án

**Sửa lỗi nghiêm trọng - ưu tiên P1:**

- **#6171** [OPEN]: Fix Docker crash-loop. `docker compose up` từ git clone hỏng hoàn toàn - `entrypoint.sh` exec vào process không tồn tại, port unreachable. Fix: sửa entrypoint, expose đúng port, document quickstart thật.

**Bugs quan trọng - P2:**

- **#6194** [OPEN]: Session locks leak vào memory mãi mãi khi API request xong (#4883). Dùng `WeakValueDictionary` để GC tự dọn.
- **#6192** [OPEN]: `AutoCompact.check_expired()` scan toàn bộ `sessions/*.jsonl` mỗi 1s idle. Performance disaster. Cần index hoặc filter sớm.
- **#6082, #5946, #5748** [OPEN, conflict nhau]: Recovery checkpoint chỉ lưu trước + sau tool execution batch. Crash giữa chừng → mất completed results. Ba PR khác nhau giải quyết cùng vấn đề, cần merge hoặc chọn một.
- **#6186** [OPEN]: Attached .eml file leak text vào parent email body. MIME walk skip attachment nhưng vẫn traverse children.
- **#6185** [OPEN]: Cron schedule dùng UTC offset cố định → sai 1 giờ khi DST change. Fix: dùng IANA ZoneInfo.
- **#6184** [OPEN]: Attachments cùng filename ghi đè nhau. Thêm counter cho duplicate names.
- **#6183** [OPEN]: XLSX cell có literal tab → grep count sai column (B1 thành C1). Record cell offset thật.
- **#6197** [OPEN]: `Content-Type: Image/PNG` (uppercase) miss image check → decode bytes as text. Normalize case.
- **#6198** [OPEN]: Upload attachment qua proxy/cloudflare tunnel fail vì `credentials: omit`. Set `same-origin`.

**Features mới:**

- **#6195, #6196** [OPEN]: Google Drive (read-only) + Google Sheets tool. Service account auth, read/search/download, export Docs/Sheets/Slides as text/CSV/PDF.
- **#6199** [OPEN]: Thêm Standard Compute provider (OpenAI-compatible gateway).
- **#6168** [OPEN]: Managed installs, exact-version updates, recovery flow vào WebUI. Tiếp #5817 + #6154.
- **#5405** [OPEN]: Skills hỗ trợ `disable-model-invocation: true` cho manual-only mode (deploy, publish v.v.).

**Refactors lớn:**

- **#6179** [CLOSED] → **#6166** [CLOSED conflict]: Component gallery (`bun run gallery`) với 120 example families, 159/202 modules covered. Search, live preview, source exports. #6166 conflict vì isolate runtime contracts + enforce import boundaries.
- **#5943** [OPEN P1]: SQLite thay JSONL làm session store chính. Bounded worker pool, transaction-based, tránh shared mutable cache.
- **#6193** [OPEN]: Xóa unused code (provider property, stale CSS, uninstantiated test helper).
- **#6191** [OPEN]: Refactor `SecretInput` + `SavedKeyHint` reusable cho providers, web search, channels, login.
- **#6190** [OPEN]: Component gallery examples trùng lặp. Tách riêng ImageGallery, ImageLightbox, ZoomableImage, AttachmentTile.
- **#6189** [OPEN]: Xóa session list preview + timestamp (defaulted off, no UI control).

**Cộng đồng/spam:**

- **#6200** [OPEN]: Free hosted NanoBot ad (agent37.to). Request README link.
- **#6182** [OPEN]: Plazmi world MCP example proposal.
- **#4145** [OPEN conflict]: Weather skill PR từ 2026-06-01, vẫn chưa merge.

## 🔥 Điểm nổi bật cộng đồng

**#6165** [OPEN, 2 comments, 👍0]: Docker onboarding hỏng nghiêm trọng. User `git clone && docker compose up` không chạy được gì. Đây là first impression disaster. #6171 đang fix.

**#6200**: Spam PR request README link cho hosted service. Typical community noise.

**#6192**: Performance issue nghiêm trọng không có comments nhưng P2. Check expired sessions mỗi giây scan toàn bộ disk. Cần attention.

## 🐛 Ổn định & Bugs

**Critical (Docker + session):**
- Docker compose hoàn toàn hỏng cho new users (#6165 → #6171)
- Session locks leak indefinitely (#6194)
- Recovery checkpoints mất tool results giữa batch (#6082, #5946, #5748 - ba PR conflict)

**Performance:**
- AutoCompact full session scan mỗi 1s (#6192)

**Data correctness:**
- Email attachment text leak (#6186)
- Cron DST shift (#6185)
- Attachment filename collision (#6184)
- XLSX tab character column shift (#6183)
- Case-insensitive image Content-Type (#6197)

**Networking:**
- Upload credentials qua proxy (#6198)

Hầu hết có PR fix trong ngày. Recovery checkpoint issue có 3 PR conflict từ 2026-09 đến nay chưa resolve.

## ✨ Yêu cầu tính năng

**Google integrations (#6187, #6188 → #6195, #6196):**
- Drive: read files từ shared folders, export Docs/Sheets/Slides
- Sheets: read/update spreadsheets (expenses, tasks, inventories)
- Motivation: working data lives in Google, agent can't see it without manual download

**Skills manual-only mode (#5405):**
- `disable-model-invocation: true` cho side-effect skills (deploy, publish)
- Prevent model tự động gọi destructive actions

**Managed updates (#6168):**
- Exact-version updates, recovery flow, WebUI integration

**Provider expansion (#6199):**
- Standard Compute gateway provider

## 💬 Phản hồi người dùng

**#6165 (Docker onboarding):**
> "git clone → docker compose up" không work. Đây là điểm chạm đầu tiên với user mới. Critical UX failure.

**#6192 (performance):**
Silent killer - không có user report nhưng technical debt lớn. Mỗi idle second scan toàn bộ sessions.

**Google tool requests (#6187, #6188):**
Clear use case: "spreadsheets are where tracking data lives", "working files live in Drive". Real-world integration need.

**Browser notifications (#6158):**
User feedback về notification failures không actionable. Cần better error messages.

## 📋 Backlog & Roadmap

**Immediate (P1):**
- Docker compose fix (#6171) - blocking new users
- Session storage refactor (#5943) - architecture debt

**Short term (P2 batch):**
- Resolve recovery checkpoint conflicts (#6082 vs #5946 vs #5748) - data loss risk
- Fix session lock leak (#6194)
- Fix performance bottleneck (#6192)
- Merge Google integrations (#6195, #6196)

**Architecture:**
- Runtime contract isolation (#6166) - conflict với #6179, cần resolve
- Component gallery (#6179) - merged nhưng có conflict downstream

**Long tail:**
- Weather skill (#4145) - open từ 2026-06, conflict chưa resolve
- Manual-only skills (#5405) - open từ 2026-08

**Pattern:** Nhiều PRs conflict lâu (3-4 tháng) chưa merge. Recovery checkpoint có 3 PRs giải quyết cùng issue từ tháng 9. Bottleneck ở review/coordination.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo hoạt động Zeroclaw - 2026-10-14

## 📊 Tóm tắt hôm nay

Zeroclaw đẩy mạnh chu kỳ phát triển v0.8.6 và v0.9.0 với 50 PR hoạt động. Trọng tâm: hardening WASM plugin system, cải thiện ZeroCode TUI, sửa bugs runtime/gateway. Cộng đồng phản hồi tích cực về tool schema và session management.

---

## 🚀 Releases

Không có release mới trong 24h. Đang chuẩn bị v0.8.6 (plugin host) và v0.9.0 (gateway separation).

---

## 🔧 Tiến độ dự án

### Runtime & Gateway (v0.8.6/v0.9.0)
**Tracker chính: #7432** - nguồn sự thật cho Phase 2 runtime + Phase 3 gateway separation
- 6 bình luận, updated hôm nay
- Priority P2, high risk, release-critical

### WASM Plugin System (v0.8.6-ready)
Chuỗi PR lớn đang hội tụ:

**#11347 - Ship plugin host trong release artifacts**
- Thêm `plugins-wasm-cranelift` vào dist features
- Build script verify plugin-capable binary qua `probe-plugin-capability`
- Stacked trên #11311, chờ merge để retarget master
- Size: L, release-gate

**#11228 - Harden TLS profile materialization** 
- `PluginState::tls_client_config` giờ check issuance scope
- Verify cert admission trước khi assemble trust roots
- Distinguished contributor (IftekharUddin), high risk, size XL

**#11304 - Log socket/WebSocket egress denials**
- WARN record `plugin_egress_denied` với host/reason/fix command
- Trước đây refused request không log gì
- Status: blocked, size XL

**#11309 - Install plugins từ `zeroclaw quickstart`**
- Stacked PRs #11581 (registry bounds) + #11555 (third-party manifest) đã merge
- Giờ là diff thuần, đợi review
- Size: XL, release-gate

### Tool & Schema Fixes

**#11720 - Fix model_routing_config schema** 🔥
- Giải quyết #11708: `upsert_scenario` thiếu required args trong tool schema
- Đưa `hint`, `model_provider`, `model` vào `required` khi action = upsert_scenario
- Size: S, risk medium
- **Root cause**: schema không expose action-specific requirements → model bỏ qua args → retry loop

**#11722 - Web search test observation fix**
- Thay finite write-error proxy = controlled chunked response (cap+1 bytes)
- Observe EOF/reset trực tiếp, không qua proxy flake
- Size: S, v0.8.6-ready

### ZeroCode TUI Improvements

**#11607 - Fix RPC timeout + scope-filter session refresh**
- `prepare_live_sessions_refresh` check scope TRƯỚC khi lock `model_provider_update`
- Tránh deadlock khi scope mismatch
- Keep TUI alive on RPC timeout thay vì crash
- Size: M, risk medium

**#11288 - Scrollbar seeking continuous across history**
- Cùng absolute pointer mapping cho click + drag
- Scrollbar cover complete loaded transcript (vẫn giữ 1000-entry render window)
- Size: M

**#11719 - Thêm Oxocarbon dark theme**
- HSLuv-blended base colors từ nyoom-engineering/oxocarbon.nvim
- Map vào Zerocode palette
- Size: XS, risk low

### Delegate & Security

**#10391 - Keep bounded delegate constraints beyond turn**
- Workspace, tool ceiling, command policy giờ persist cross-turn
- Ảnh hưởng: delegate, cron, shell, MCP tools
- Size: XL, high risk, needs author action

**#11577 - Run subagent on declared model route**
- `spawn_subagent` nhận optional `model_hint` → child chạy trên route cụ thể
- Inherit identity/workspace/policy/memory từ parent
- Size: L, high risk, needs author action

### Gateway & Session Management

**#11676 - Preserve created_at khi replace transcript**
- SQLite transcript replacement trước đây xóa + reinsert → tất cả rows cùng timestamp
- Giờ preserve original `created_at` của retained rows
- Size: XL, risk medium

**#11718 - Keep webhook turn running khi SSE client disconnect**
- Symptom: streamed webhook (`stream: true`, SSE) cancel ngay khi client drop response
- Fix: drop `SseClientStream` cancel token, giữ turn chạy
- Size: M, high risk, needs author action

### Channel Integrations

**#11651 - Honor Telegram 429 retry_after**
- Shared per-token flood gate
- Trước: 429 treated như format failure → retry ngay plain text
- Giờ: respect `retry_after`, gate all requests per bot token
- Size: XL

**#11717 - Add model option cho local Whisper**
- `[providers.transcription.local_whisper.<alias>]` giờ nhận `model` field
- Cho phép upload STT tới self-hosted endpoint với model name
- Size: S, risk medium

### Infrastructure & Dependencies

**#11634 - Bump routine toolchains tới 1.99.0**
- GitHub Actions, release, platform, audit, local CI
- Container builders → 1.99 image tags
- Size: M, risk medium, type: ci

**#11723 - Bump rust-all group (30 updates)**
- Dependabot auto-update
- Size: XS

**#11714 - Bump probe-rs 0.32** (CLOSED)
- Drop vulnerable `ruzstd` (RUSTSEC-2026-0344)
- Decompression bomb advisory published 2026-10-13
- Size: XS

**#11712 - Extract A2A protocol vào zeroclaw-a2a crate**
- Wire model, outbound client, inbound handler → một crate
- Tách khỏi `zeroclaw-api`/`zeroclaw-tools`/`zeroclaw-gateway`
- Size: XL

### Provider Support

**#11721 - Add Standard Compute provider**
- OpenAI-compatible slot `standardcompute`
- Vision optional, native tool use
- Size: S, risk medium

**#11647 - Decouple vision support từ system merge**
- `allow_user_image_parts` trước gate bởi `!merge` (system prompt merge)
- Giờ gate bởi `supports_vision` flag thật
- Size: XS, risk medium

**#11672 - Project JPEG admission without copy**
- `projected_jpeg_allocation` parse SOF frame header trên borrowed `&[u8]`
- Không clone input để check size
- Size: XS, high risk

### Configuration & Security

**#11419 - Make secret maps editable trong zerocode/dashboard**
- MCP server `env` trước không thể add từ UI
- `Configurable` derive emit `<path>.<KEY>` per existing key only
- Giờ: empty map → emit add/remove operations
- Size: L, high risk, breaking change

**#11297 - Honor keep_tool_context_turns**
- History rip-out #8196 removed `strip_old_tool_context` → key treated như boolean
- Giờ count turns đúng spec
- Size: L, risk medium

### Testing & CI

**#11671 - Stop park-timeout flake**
- Raise `approval_timeout_secs` 1 → 3600 trong `pending_park_retry` test
- Test back-date first run tới 2000, chỉ assert unpersisted gate skip
- Size: XS, risk medium

**#11435 - Settle rejected headless SOP runs** (CLOSED)
- Headless run → `Cancelled` khi validation/admission reject
- Release concurrency capacity
- Retain reload retries khi state diff
- Size: L, risk medium

---

## 🌟 Điểm nổi bật cộng đồng

### High-engagement PRs

**#11174 - Capability-taking turn constructors**
- Distinguished contributor (JordanTheJet)
- Design prereq: #11090
- Local refresh candidate: `af00b35dd` merge master `e9ba349316`
- Hosted CI pass, chờ public review
- Size: XL, high risk, v0.8.6

**#10430 - Gemini speech-to-speech broker** (parking-lot)
- PR1 của RFC #8780, tracker #10406
- Realtime voice model owns caller audio, reach tools
- Experienced contributor (metalmon)
- Size: XL, high risk, needs author action

### Contributor activity
- **Audacity88**: 4 PRs active (tool schema, RPC timeout, scrollbar, headless settle)
- **IftekharUddin**: Plugin system lead (manifest sign, release ship, TLS harden, egress log, quickstart)
- **joalvaradon**: Delegate constraints, transcript created_at
- **JordanTheJet**: Capability constructors, web-search test, toolchain bump

---

## 🐛 Ổn định & Bugs

### Critical fixes shipped/in-progress

**#11708 - model_routing_config thiếu required args** → #11720 fix
- S2 severity (degraded behavior)
- Ollama qwen3.5:9b retry loop vì tool schema incomplete
- Fix: expose action-specific requirements

**#11607 - Session refresh deadlock + RPC timeout crash**
- Scope filter TRƯỚC lock → tránh deadlock
- Keep TUI alive khi RPC timeout

**#11676 - Transcript timestamp bug**
- Replace session → tất cả rows cùng timestamp (last write)
- Impact: `/api/sessions/{id}/messages` return sai created_at

**#11718 - Webhook SSE turn cancellation**
- Client disconnect → turn cancel ngay
- Production impact: webhook không complete

**#11651 - Telegram flood gate**
- 429 không respect `retry_after` → spam retry
- New: shared per-token gate

### Security/safety fixes

**#11228 - Plugin TLS hardening**
- Check issuance scope trước khi assemble trust
- Prevent unauthorized TLS profile use

**#11714 - ruzstd vulnerability** (patched)
- RUSTSEC-2026-0344 decompression bomb
- Bump probe-rs → drop vulnerable dep

---

## 💡 Yêu cầu tính năng

### Merged/near-merge

**#11309 - Plugin install từ quickstart**
- Đơn giản hóa onboarding
- Dependencies merged, core diff đang review

**#11577 - Subagent model routing**
- Operator declare route → child run đúng provider/model
- Use case: specialized subtasks

**#11419 - Secret map editing UI**
- MCP `env` và các secret maps giờ editable từ dashboard/zerocode

**#11721 - Standard Compute provider**
- Mở rộng provider ecosystem

### In discussion

**#10430 - Gemini speech-to-speech**
- Voice-first interaction channel
- Status: parking-lot, needs architectural consensus

**#11174 - Capability-taking constructors**
- Dependency management refactor
- Chờ #11090 design approval

---

## 📋 Backlog & Roadmap

### v0.8.6 (sắp release)
**Release-gate PRs:**
- #11347: Ship plugin host in artifacts
- #11309: Quickstart plugin install
- #11722: Web search test fix
- #11228: Plugin TLS hardening
- #11174: Capability constructors
- #11297: keep_tool_context_turns
- #11717: Whisper model option

**Tracker:** #7432 - Phase 2 runtime work

### v0.9.0 (planning)
**Focus:** Phase 3 gateway separation (theo RFC #5574)
- Extract gateway concerns từ runtime
- Clean API boundaries

### Known blockers
- #11304 (plugin egress log): status blocked
- #10430 (speech-to-speech): parking-lot
- #10391 (delegate bounds): needs author action
- Multiple PRs: needs author action tag

---

## 🔍 Phân tích xu hướng

### Code quality focus
- Rust toolchain bump 1.99.0 → modern compiler features
- Dependency updates (30 rust-all packages)
- Security audit fixes (ruzstd)

### Architecture evolution
- Plugin system maturity: TLS hardening, egress logging, release readiness
- A2A protocol extraction → better modularity
- Gateway separation preparation (v0.9.0)

### Developer experience
- ZeroCode TUI polish (scrollbar, themes, RPC resilience)
- Quickstart plugin install → lower barrier
- Secret UI editing → less config file editing

### Community health
- Distinguished contributors active (Audacity88, IftekharUddin, JordanTheJet)
- Trusted contributors joining (alucryd)
- Dependabot keeping dependencies fresh
- Mix của features (10 PRs) và fixes (15 PRs) → balanced priority

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw ngày 2026-10-14

## 1. 📊 Tóm tắt hôm nay

Dọn dẹp backlog lớn: 6 issues đóng do stale bot (13/10). Chủ yếu feature request và bug report cũ không được xử lý. 1 issue mới (#3427) về Plazmi MCP integration. Không có release hoặc code merge.

## 2. 🚀 Releases

Không có.

## 3. 📈 Tiến độ dự án

**Issues đóng (stale):**

- **#440** - context-window bounding thay hard iteration limit → kẹt 8 tháng, stale đóng
- **#3407, #3406** - Web UI ghost session + UX improvements → report tháng 9, không được fix
- **#3404** - reliability bugs với reproducer → ignored 
- **#3405** - yêu cầu private vuln reporting → không được enable
- **#3397** - thêm Tsubasa provider → không được merge

**PR đang mở:**

- **#3416** - Sendblue iMessage/SMS channel → draft từ 05/10, chưa review
- **#3370** - Keenable search provider → đóng stale 13/10

**Issue mới:**

- **#3427** - Plazmi persistent agent example → đề xuất tích hợp MCP/CLI, chưa có phản hồi

**Xu hướng:** Backlog tăng, maintainer không active. Stale bot đang dọn issues/PRs thay vì human triage. Feature PR nằm lâu không review.

## 4. ⭐ Điểm nổi bật cộng đồng

#3405 có 1 👍 - người dùng quan tâm security reporting. @x1F916 báo nhiều bug (#3404) với reproducer nhưng bị ignore → frustration rõ ràng.

#3407 ghost session bug ảnh hưởng UX nghiêm trọng, có 3 comment discussion nhưng không được fix.

## 5. 🐛 Ổn định & Bugs

**Critical open:**
- Ghost session (#3407) - session disappear khi model đang think
- Reliability issues (#3404) - agent loop, channel manager, config bugs có reproducer

**Context:** Cả 2 được report với chi tiết kỹ thuật đầy đủ nhưng đóng do stale. Chất lượng production code đang tụt.

## 6. 💡 Yêu cầu tính năng

**Đã đề xuất (bị stale):**
- Context-aware iteration limit (#440)
- Web UI improvements (#3406) - working indicator, session archiving
- Tsubasa provider (#3397)
- Keenable search (#3370)

**Mới:**
- Plazmi MCP integration (#3427) - persistent agent sessions với real-time world

Pattern: nhiều integration request (messaging, search, virtual world) → cộng đồng muốn mở rộng use case.

## 7. 💬 Phản hồi người dùng

@racso2609: Web UI không usable cho real work - ghost session + unclear thinking indicator

@x1F916: Muốn report security issues nhưng không có channel, submit bug fixes nhưng bị stale bot đóng

@ilya-bogin-keenable, @lookevink: Submit provider integration nhưng không có review

**Sentiment:** Frustrated. Contributors bỏ công viết code/reproducer nhưng không được attention.

## 8. 🗺️ Backlog & Roadmap

Không có roadmap công khai. Backlog pattern:

- Agent core improvements (#440) - 8 tháng không progress
- Web UI polish (#3406, #3407) - cần nhưng không được ưu tiên
- Provider ecosystem (#3397, #3370, #3427) - PR nằm không review
- Security process (#3405) - chưa establish

**Vấn đề chính:** Maintainer bandwidth thấp. Stale bot đang close legitimate work. Cần triage process hoặc thêm maintainer.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-14

## 1. Tóm tắt hôm nay

Dự án tập trung vào ổn định agent runner với fix quan trọng về message handling được merge. Không có release mới. Hoạt động chính: đóng PR fix bug critical (#3918), tiếp tục phát triển tích hợp Apple container cho macOS (#3503), và cải thiện trải nghiệm setup với update channel selection (#4084).

## 2. Releases

Không có release trong 24h qua.

## 3. Tiến độ dự án

**PR đã đóng:**
- **#3918 - Fix agent-runner message handling** 🔴 Critical
  - Giải quyết vấn đề mất hoặc lặp reply xung quanh `send_message`
  - Ảnh hưởng cả streaming providers (realtime) và end-of-turn providers
  - Bug: runner đoán sai turn đã reply, dẫn đến drop message hoặc gửi duplicate
  - Đã merge vào main → sẽ có trong release tiếp theo

**PR đang mở:**
- **#4084 - Setup chọn update channel ngay từ đầu** (mới, 2026-10-13)
  - Giải quyết vấn đề: install mới dùng tip của `main` trên `stable` channel
  - Khi `main` vượt latest release → `/update-nanoclaw` bị block
  - Cho phép chọn channel (stable/bleeding-edge) trong setup flow
  - Core team, follows guidelines → khả năng merge cao

- **#3503 - Apple container runtime thay Docker trên macOS** (đang phát triển từ tháng 8)
  - Skill `/add-apple-container` chạy agent session trên Apple `container` runtime
  - Team đã dùng production từ tháng 6 (personal), tháng 8 (official)
  - Delivery skill + setup/installation improvement
  - PR lớn, đang review

**Xu hướng:**
- Focus vào stability: fix message handling bugs
- Cải thiện developer experience: setup flow, platform-native runtime
- macOS optimization: tận dụng Apple container thay Docker

## 4. Điểm nổi bật cộng đồng

**Issue #30 - maxTurns limit** (đã đóng 2026-10-13, có 1 👍, 3 comments)
- Bug từ production: agent gửi 21 duplicate messages trong 32 giây
- Nguyên nhân: `query()` không có `maxTurns` → unlimited loop
- Được fix trong PR #3918
- Community concern: runaway agent loops → vấn đề phổ biến với AI agents

Không có PR nào có tương tác cao (0 reactions trên các PR mới).

## 5. Ổn định & Bugs

**Đã fix:**
- ✅ Agent message loss/duplication (#3918) - critical bug
- ✅ Runaway agent loops (#30) - thêm maxTurns protection

**Bug pattern:**
- Message handling trong agent runner phức tạp với multiple provider types
- State management giữa streaming và end-of-turn modes
- Loop control trong autonomous agent execution

**Impact:**
- Bug #30 gây production incident
- Fix #3918 prevent data loss (mất reply) và spam (duplicate messages)

## 6. Yêu cầu tính năng

**Apple container support (#3503):**
- Chạy agent sessions native trên macOS
- Performance và integration tốt hơn Docker
- Đã test production 2+ tháng
- Skill-based delivery → user opt-in

**Update channel selection (#4084):**
- UX improvement cho fresh installs
- Tránh version mismatch giữa local main và stable release
- Cho phép bleeding-edge users track latest development

## 7. Phản hồi người dùng

**Từ issue #30:**
- User gặp spam messages trong production (21 msgs / 32s)
- Pain point: agent loops không có safety limit
- Incident drove fix → community-driven improvement

**Chưa có feedback trực tiếp trên PR mới** (vừa mở trong 24h).

## 8. Backlog & Roadmap

**Đang tiến hành:**
- Apple container integration (testing phase, ready for opt-in)
- Setup flow improvements (channel selection)
- Agent runner stability fixes (merged, waiting release)

**Potential next:**
- Release mới với #3918 fix
- Merge #4084 (setup improvement)
- Expand Apple container support nếu #3503 merge

**Infrastructure focus:**
- Platform-native runtimes (Apple container)
- Agent execution safety (maxTurns, message handling)
- Developer experience (setup, updates)

---

**Tín hiệu:** Dự án mature phase, focus stability over features. Critical bugs được ưu tiên và fix nhanh. Community small nhưng engaged (production usage driving bug reports).

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo IronClaw - 2026-10-14

## 1. Tóm tắt hôm nay

Hoạt động thấp. Một đề xuất tích hợp Plazmi MCP extension (#8136) dùng auth declarative thay vendor logic. Dependabot nâng brace-expansion cho docs (#8137).

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Issue #8136 - Plazmi MCP extension**
- Đề xuất hosted-MCP metadata cho Plazmi companion
- Dùng declarative extension surface có sẵn từ Reborn guidance
- Tránh thêm vendor logic vào host
- Scope: extension cài riêng, không ảnh hưởng core

**PR #8137 - Dependency update**
- Nâng brace-expansion 1.1.18 → 1.1.21
- Phạm vi: docs/internal/architecture-video
- Bot tự động, không critical

**Xu hướng**: Infrastructure work, không feature mới. Focus vào declarative patterns và modularity.

## 4. Điểm nổi bật cộng đồng

Không có. Issue #8136 zero comments, zero reactions. PR #8137 là bot.

## 5. Ổn định & Bugs

Không có bug report trong 24h. Dependency bump là maintenance thường kỳ, không fix lỗ hổng.

## 6. Yêu cầu tính năng

**Plazmi integration (#8136)**
- Optional companion extension
- Declarative auth + egress
- Separately installed
- Chờ feedback từ maintainers

## 7. Phản hồi người dùng

Không có. Issue mới tạo chưa có tương tác.

## 8. Backlog & Roadmap

Không đủ data. Issue #8136 nếu được approve sẽ thêm vào pipeline. Phụ thuộc maintainer response về architecture fit.

---

**Kết luận**: Ngày yên tĩnh. Một proposal architecture (Plazmi) chờ review. Dependency maintenance như thường lệ.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw (2026-10-14)

## 🎯 Tóm tắt hôm nay

QwenPaw tập trung xử lý bug Console (message navigation, scrolling overrides) và hệ thống plugin (hot reload rollback, marketplace persistence). 42 PRs mới, tập trung cải thiện ổn định hơn tính năng mới. Không có release mới.

## 🚀 Releases

Không có releases trong 24h.

## 📊 Tiến độ dự án

### Console frontend stability
- **#8219** chunk recovery logic - tránh exhausting reload quota khi service unreachable
- **#8214 MERGED** scroll-intent cancellation - fix navigation override manual scrolling (#8186)
- **#8221 MERGED** bound background polling - ngăn request accumulation, unblock model picker
- **#8217** UIUX foundation - route metadata, page shell, dedupe warnings

### Plugin system overhaul
- **#7565** hot reload với rollback - install/update không rebuild all workspaces
- **#8128 MERGED** Skill Market → plugin - Hub installable/removable, custom marketplace extensible
- **#8231** persist install provenance - "Update All" nhận third-party plugins (#8176)

### Agent system fixes
- **#8183 MERGED** preserve cancellation reasons - timeout return ERROR state thay vì INTERRUPTED, agent loop continue
- **#8098 MERGED** foreground chat timeout - return tool result thay vì propagate cancellation
- **#8088 MERGED** chat_with_image loop - fix Bash+PIL cropping hang

### Hub & runtime
- **#8216** restore running runtimes on startup - fix cron jobs missed after Hub restart (#8213)
- **#8222** ACP plugin loading - `qwenpaw acp` không load PluginLoader, tools missing

### Chat history
- **#8229** truncate oversized tool outputs - base64 file/screenshot bloat >10MB hit 30s timeout (#8228)
- **#8209** resolve deep links across agents - `/chat/<id>` redirect blank session

### Safety & validation
- **#8065 MERGED** sanitize skill_name - fix path traversal `../escape`
- **#8190 MERGED** resolve model capabilities trước khi filter history media - GLM-5.3 nhận ảnh dù text-only
- **#8215** LM Studio audio rejection - "At most 0 audio(s)" không recognized bởi fallback classifier (#8171)

### Minor fixes
- **#8227** "Open in browser" outside workspace - fail silently, no error message
- **#8226** keep active_model/heartbeat khi rebuild missing agent.json
- **#8210** Creator project delete on Windows - WinError 5 do creator.log open (#8206)

## 🔥 Điểm nổi bật cộng đồng

**#8232** (1💬) Agent37 hosted QwenPaw - offer 100 free cloud computers, xin link README
**#8233** (1💬) request built-in provider presets cho CommandCode & Hugging Face
**#8176 → #8231** marketplace "Update All" bỏ third-party plugins - vì author field mismatch

## 🐛 Ổn định & Bugs

### Critical
- **#8228** chat history bloat - file/screenshot base64 trong tool_result → 10MB+, timeout
- **#8213** Hub restart không restore running runtimes - cron jobs silent skip
- **#8206** Windows delete project fail - creator.log handle không close

### High
- **#8171** audio file wedges session - LM Studio 400 không recognized, audio persisted in history
- **#8222** ACP không load plugins - tools missing, callbacks không wake them
- **#8186** message navigation override scrolling - snap back ~1.6s

### Medium
- **#8225** heartbeat save trigger hot reload - cancel running cron, mark `cancelled` không notify
- **#7056** background task callback - chỉ có polling, không có notification

## 💡 Yêu cầu tính năng

**#8071** plugin theme extension - plugins chỉ set `colorPrimary`, muốn deeper customization (semantic tokens)
**#8126** skill download cancellable - POST /pool/download synchronous, large skill timeout
**#8015 CLOSED** custom Skill/Plugin marketplace - self-hosted mirror cho intranet/air-gapped
**#8223** host navigation policy - deployment-level allowlist, evaluate trước Console render
**#8211** i18n protected execution prompt - scroll context có i18n (zh/en), security prompt không có

## 👥 Phản hồi người dùng

- Console stability improving - nhiều scroll/navigation fixes merged
- Plugin system cần rollback-safe reload - hiện tại failed update bỏ users trên broken version
- Chat history persistence fragile - concurrent writes fail, SQLite lock exhausted (#6459 under review)
- Hub multi-tenancy gaps - restart không restore runtimes, ACP không load plugins

## 📋 Backlog & Roadmap

### In progress (XXL PRs)
- **#7565** plugin hot reload với rollback
- **#8224** experimental Python Code Mode
- **#8187** channels → plugins với subprocess isolation

### Planned
- #8126 skill download background job
- #8071 plugin theme extension point
- #6459 SQLite persistence hardening

### Design discussion
- #7056 background task callback mechanism
- #8223 host navigation policy

**Xu hướng:** consolidation phase - fix stability/UX bugs, plugin system refactor, giảm core coupling. Ít tính năng mới, tập trung polish existing features.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*