# Bản tin Hệ sinh thái Hermes Agent 2026-10-13

> Issues: 122 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-13 02:00 UTC

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

# Báo cáo Hermes Agent — 2026-10-13

## 📊 Tóm tắt hôm nay

Phát hành patch v0.21.7 tổng hợp 204 PR từ v0.21.6. Stack PR lớn đang triển khai: refactor onboarding flow mới cho desktop (#137420, #137429, #137522) — xóa flow cũ không migration. Nhiều issue về Langfuse plugin (placeholder key silent fail, trace collision) được đóng duplicate. Bugs nghiêm trọng: Telegram thread routing, browser daemon leak, desktop display-only toggles vô hiệu.

---

## 🚀 Releases

### v0.21.7 (2026-10-12)
- **Patch release**: gộp ~204 PR từ v0.21.6
- Ship cho: desktop (macOS ARM, Windows), Microsoft Store/MSIX, installer, Docker, Hermes Cloud
- Source installs: `hermes update` + desktop auto-updater follow tagged release
- Note đầy đủ đợi v0.22.0

**Ý nghĩa**: stabilization pass trước major release tiếp, consolidate nhiều fix nhỏ.

---

## 🏗️ Tiến độ dự án

### Stack onboarding mới (Desktop first-run flow)
**3 PR stack đang open**, merge theo thứ tự:
1. **#137410** (dependency): NVIDIA platform support — chưa trong data
2. **#137429** (backend): onboarding chat backend — model drives setup với tool `setup_beat`
3. **#137522** (frontend): desktop onboarding chat UI + `set_theme` tool
4. **#137420** (cleanup): xóa old agentic setup flow — **NO MIGRATION**, breaking cho installs đang dùng

**Rủi ro**: deletion PR không migration có thể gây user confusion nếu họ đã quen flow cũ.

### Bot delivery reliability (multi-layer series)
**4-layer stack** fix silent message loss:
- **#115003** (L1): store + liveness check cho bot delivery
- **#115009** (L2): queue delivery khi lease timeout thay vì drop
- **#115010** (L3): receipt cho busy target, durable queue, content-keyed dedup
- **#115013** (L4): drain all profile homes, never expire unattempted relay
- **#115771** (L5): drained turn chạy đúng target lane scope

**Impact**: fix core issue về message delivery trong bot workflows.

### Kanban/cron improvements
- **#118500**: count running tasks across boards (fix per-profile cap leak)
- **#118421**: refuse re-init deleted board DB (silent empty board bug)
- **#118290**: isolate per-row dispatch faults (poison row kill toàn pass)
- **#113342**: record shutdown-interrupted run as `interrupted` not `error`
- **#110753**: hold blocked card có no-failure record
- **#110305**: rotate first-served board (prevent budget starvation)

---

## 🔥 Điểm nổi bật cộng đồng

### Top issues theo engagement:

1. **#38519** [12💬, 21👍] — Desktop frontend-only install
   - User muốn install frontend riêng, connect remote agent
   - Windows frontend-only installer requested

2. **#110374** [6💬, 9👍] — Slack status indicator broken (slack-sdk ≥3.44)
   - `agents.sessions.setStatus` reject free-text/empty status
   - Silent failure, status biến mất mỗi turn

3. **#136567** [16💬, 3👍] — Telegram forum DM: opening message thread-less
   - New topic opening message không có `message_thread_id`
   - Lobby recovery misroute về previous topic

4. **#87036** [3💬, 2👍] — Desktop sticky `reasoning_effort` can lock unsupported value
   - No UI clear, no validation
   - Override config.yaml silently, có thể 400 mọi session

5. **#96384** [3💬, 2👍] — Slack forwarded messages lose text + files
   - `is_msg_unfurl`/`is_share` ambiguity
   - Break core Slack workflow

**Pattern**: platform integration bugs (Telegram, Slack) + Desktop UX issues dominant.

---

## 🐛 Ổn định & Bugs

### Critical bugs open:

**P1 severity:**
- **#71239**: Telegram dispatcher có thể stall invisible — getUpdates work nhưng Application.update_queue không drain
- **#134469**: `hermes update` rebuild venv thiếu plugin deps — provider plugins fail silent
- **#134890**: Desktop deferred agent build fail với RecursionError, traceback không log

**P2 high-impact:**
- **#136567**: Telegram thread routing (16 comments)
- **#121095**: browser_exec leak daemon processes (12 comments)
- **#122160**: external script import trigger bootstrap re-exec, drop script dir
- **#136713**: Dashboard re-attach kill running turn, end_reason=tui_shutdown
- **#136058**: Desktop `/focus` `/verbose` toggles không hoạt động

### Langfuse plugin issues
**Nhiều duplicate issues closed** (12+ issues) — tất cả về:
- Placeholder API key silent failure
- Trace ID collision (reuse same ID cho all turns)
- Session tagging không propagate
- Service name fallback `unknown_service`
- Custom endpoint credential rejection

**Fixed trong PRs**:
- **#88608**: redact secrets + emails before cloud upload
- **#125639**: scope trace ID per turn
- **#120454**, **#120878**: fix cross-thread context token error
- **#134284**: flush traces in background
- **#135213**: expose profile_name as userId

---

## 💡 Yêu cầu tính năng

### Active feature requests:

1. **#38519** [P2, needs-decision] — Frontend-only install
2. **#133212** [P3] — `subagent_lifecycle` v1.1: steer, host-isolation transport
3. **#67544** [P3] — Langfuse: traces export unredacted, no masking hook, no user_id
4. **#107960** [P3] — local_runtime probe all GPUs, use llama.cpp tensor-split
5. **#26455** [closed but valuable] — Langfuse expose profile_name for per-profile observability

**Trend**: multi-GPU support, plugin isolation improvements, observability enhancements.

---

## 💬 Phản hồi người dùng

### Pain points từ issues:

1. **Silent failures dominant theme**:
   - Langfuse placeholder key: no error, no trace
   - Plugin dependency loss sau update: work → fail không warning
   - Telegram/Slack delivery loss: không log

2. **Desktop UX gaps**:
   - Display toggles không sync với backend
   - Sticky settings có thể lock invalid values
   - Re-attach behavior destroy work in progress

3. **Platform integration brittleness**:
   - Slack SDK version breaks status
   - Telegram threading logic fragile
   - WhatsApp chưa có issues trong data này

4. **Update/install friction**:
   - Venv rebuild lose deps
   - Git blob strategy grow .git to 39GB
   - No migration path cho breaking changes

### Positive signals:
- Kanban/cron improvements được merge steady
- Bot delivery reliability stack tiến triển tốt
- Security fixes (Langfuse redaction) được address

---

## 📋 Backlog & Roadmap

### Đang active development:

**High priority (P1-P2):**
- Onboarding refactor (3-PR stack)
- Bot delivery reliability (5-layer series)
- Desktop agent build failures
- Telegram/Slack platform bugs

**Medium priority (P3):**
- Kanban improvements (multiple small PRs)
- Langfuse observability enhancements
- Plugin dependency lifecycle
- Multi-GPU local runtime

### Technical debt visible:

1. **Plugin system**: dependency lifecycle, isolation transport cần v1.1
2. **Desktop-backend sync**: RPC surface thiếu cho display toggles
3. **Platform adapters**: error visibility, retry logic cần strengthen
4. **Update process**: venv rebuild strategy, git object management

### Merge velocity:
- v0.21.6 → v0.21.7: 204 PRs (release window ~1 tháng estimate)
- Nhiều small fixes merge steady
- Large features (onboarding, bot delivery) đang stack review

---

## 🎯 Kết luận

**Strengths**: steady bugfix velocity, platform coverage rộng, observability được invest.

**Weaknesses**: silent failure modes nhiều, breaking changes thiếu migration, platform integration brittle.

**Next milestone watch**: v0.22.0 sẽ có full curated notes cho 204-PR window này + onboarding stack completion.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent — 2026-10-13

## 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang ở **giai đoạn hardening sau rapid expansion**. Pattern chung: ít feature mới, nhiều stability fix. Hermes Agent và OpenClaw dẫn đầu về volume (204 PR gộp vs 30 PR/tuần), các dự án nhỏ hơn trong maintenance mode hoặc slow burn development.

**Phân tầng rõ ràng:**
- **Tier 1** (mature products): Hermes Agent, OpenClaw — enterprise-grade stability focus
- **Tier 2** (active dev): NanoBot, QwenPaw, Zeroclaw — feature dev + community growth
- **Tier 3** (maintenance/niche): PicoClaw, NanoClaw, IronClaw — minimal activity, specific use cases

## 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | PRs merged 24h | Điểm nổi bật | Community heat |
|-------|--------|-----|----------|----------------|--------------|----------------|
| **Hermes Agent** | 122 | 500 | 1 | ~204 (v0.21.7) | Desktop onboarding refactor, bot delivery stack | 🔥🔥🔥 High engagement (12-21 comments/issue) |
| **OpenClaw** | 95 | 500 | 2 | ~30 | Update pipeline hardening (2 beta releases) | 🔥🔥 Multiple 6-18 comment threads |
| **NanoBot** | 0 | 34 | 0 | 15 | WhatsApp channel, Docker first-boot fix | 🔥 Core team driven, zero external issues |
| **Zeroclaw** | 9 | 50 | 0 | 5 | Plugin system maturation, security hardening | 🔥 Internal activity, zero community reactions |
| **QwenPaw** | 16 | 20 | 0 | 11 (new PRs) | Critical bug sprint (Desktop crash, tool approval) | 🔥🔥 4-comment issue threads, first-time contributors |
| **PicoClaw** | 4 | 7 | 0 | 0 | Stale cleanup, Telegram markdown bug | ❄️ Maintenance mode |
| **NanoClaw** | 0 | 6 | 0 | 4 | Feishu fixes, OneCLI 1.45 migration | ❄️ Core team only |
| **NullClaw** | 0 | 0 | 0 | 0 | — | ❄️ Dead |
| **IronClaw** | 1 | 0 | 0 | 0 | Model quality tracking | ❄️ Monitoring phase |

**Key insights:**
- Hermes/OpenClaw dominate merge volume (20-200x PicoClaw/IronClaw)
- Issue engagement ≠ PR volume: QwenPaw 16 issues but only 20 PRs; NanoBot 0 issues but 34 PRs
- Release discipline varies: OpenClaw ship 2 betas in 24h, others zero releases despite activity

## 🎯 Vị thế Hermes Agent

**Strengths:**
1. **Enterprise scale stability**: 204-PR consolidation patch, systematic bot delivery reliability stack (5-layer series)
2. **Platform breadth**: Desktop (macOS/Windows), Docker, Cloud, Microsoft Store, Telegram, Slack coverage
3. **Community engagement**: 12-21 comments per top issue, detailed bug reports với logs
4. **Observability investment**: Langfuse plugin fixes, multiple tracing/redaction PRs

**Weaknesses:**
1. **Silent failure epidemic**: Langfuse placeholder keys, plugin deps loss post-update, Telegram/Slack delivery loss — tất cả no error surface
2. **Breaking changes without migration**: Desktop onboarding refactor xóa old flow, no upgrade path
3. **Update fragility**: venv rebuild lose deps, git blob strategy bloat `.git` → 39GB
4. **Platform integration brittleness**: Slack SDK version breaks status, Telegram threading fragile

**Positioning:**
- **Market leader** về feature completeness + platform coverage
- **Technical debt accumulation**: rapid expansion tạo regression + silent failure modes
- **Enterprise readiness mixed**: observability đầu tư tốt, nhưng update reliability còn vấn đề

**So với competitors:**
- **vs OpenClaw**: Hermes có breadth hơn (nhiều platform), OpenClaw có update discipline tốt hơn (2 beta fix trong ngày)
- **vs QwenPaw**: Hermes mature hơn nhưng QwenPaw ship fix nhanh hơn (bug report sáng → PR chiều)
- **vs NanoBot**: Hermes feature-rich hơn, NanoBot clean architecture hơn (runtime contracts isolation)

## 🔧 Hướng kỹ thuật chung

### Shared patterns across top projects:

**1. Plugin/Extension isolation**
- **NanoBot**: Runtime contracts isolation + import boundaries (#6166)
- **Zeroclaw**: WASM plugin host, channel instance binding ceremony (#11347, #11302)
- **QwenPaw**: Channels → plugins subprocess isolation (#8187)

→ **Trend**: Shift từ monolith → sandboxed plugin model

**2. Observability + cost tracking**
- **Hermes**: Langfuse integration fixes, trace redaction
- **Zeroclaw**: UTC-aligned cost tracking, warning exceptions
- **QwenPaw**: Per-chat approval persistence, cross-device sync

→ **Trend**: Production monitoring capabilities ngày càng core requirement

**3. Platform integration hardening**
- **Hermes**: Telegram thread routing, Slack status indicator
- **OpenClaw**: Windows Scheduled Task identity handoff
- **PicoClaw**: Telegram MarkdownV2 escaping
- **NanoClaw**: Feishu card cleanup, OneCLI grants API migration

→ **Pain point chung**: Chat platform APIs thay đổi → break integration

**4. Update/installation reliability**
- **OpenClaw**: 2 beta releases fix update pipeline (7 unique failure modes)
- **Hermes**: venv rebuild, git blob strategy issues
- **NanoBot**: Docker first-boot crash-loop (#6171)
- **Zeroclaw**: Plugin install recovery mechanism

→ **Critical gap**: Update là top source of support burden

**5. Session state management**
- **OpenClaw**: Async exec context-free arrivals, cron transcript races
- **Hermes**: Bot delivery queue + liveness check
- **QwenPaw**: Tool approval race conditions

→ **Recurring bug class**: Distributed state + async execution hard

### Tech stack convergence:

| Stack component | Hermes | OpenClaw | NanoBot | Zeroclaw | QwenPaw |
|----------------|--------|----------|---------|----------|---------|
| **Language** | Python | Python | TypeScript | Rust | Python |
| **DB** | SQLite | SQLite | SQLite | SQLite | — |
| **Desktop** | Electron-like | Native | WebUI | — | Electron-like |
| **Observability** | Langfuse | — | — | — | — |
| **Plugin model** | Python imports | Python subprocess | WASM/subprocess | WASM | Python subprocess |

**Python dominance** (4/5 core runtimes) except Zeroclaw (Rust). SQLite universal choice for local state.

## 🌟 Điểm khác biệt

### Architecture philosophy:

**Hermes Agent**: Feature-first breadth
- Coverage: Desktop, Cloud, Docker, Microsoft Store, multiple chat platforms
- Tradeoff: Integration complexity → silent failures
- Philosophy: "Enterprise swiss-army-knife"

**OpenClaw**: Reliability-first
- 2 beta releases in 24h fix update bugs
- SQLite worker optimizations, update recovery mechanisms
- Philosophy: "Production-grade stability"

**NanoBot**: Clean architecture
- Runtime contracts isolation enforced at import boundaries
- Compose pattern cho tools thay vì hard-wire
- Philosophy: "DX + modularity"

**Zeroclaw**: Security + performance
- Rust core, WASM plugin isolation
- Filesystem channel path validation stack (4-PR chain)
- Philosophy: "Zero-trust secure runtime"

**QwenPaw**: User-facing velocity
- Bug report sáng → PR fix chiều
- 11 first-time contributors in 1 day
- Philosophy: "Community-driven agility"

### Community engagement models:

**High engagement (Hermes, OpenClaw, QwenPaw)**:
- Detailed bug reports với logs + reproduction steps
- Multi-turn debugging threads (6-18 comments)
- Feature requests có context về use case

**Low engagement (NanoBot, Zeroclaw)**:
- Core team dominated
- No external issues despite PR activity
- Closed ecosystem hoặc early-stage adoption

**Dead/maintenance (PicoClaw, NanoClaw, IronClaw)**:
- Stale bot đóng PRs cũ
- Zero community contributions
- Monitoring > development

### Release discipline:

**Aggressive (OpenClaw)**: 2 betas in 24h, rapid iteration
**Conservative (Hermes)**: 204-PR consolidation patch, curated notes delayed
**Opportunistic (QwenPaw)**: Ship fix khi ready, no scheduled cadence
**Absent (NanoBot, Zeroclaw, PicoClaw)**: Zero releases despite activity

## 👥 Mức độ trưởng thành cộng đồng

### Tier 1: Mature ecosystems

**Hermes Agent**
- ✅ User-submitted detailed bug reports (logs, repro steps)
- ✅ Multi-platform coverage → diverse user base
- ✅ Top issues 12-21 comments = collaborative debugging
- ⚠️ Pain: Silent failures dominant theme → trust erosion risk

**OpenClaw**
- ✅ Power users trace system-level bugs (zombie processes, SQLite workers)
- ✅ Platform diversity (Windows/Linux/macOS pain points visible)
- ⚠️ Rapid iteration tạo regression debt
- ⚠️ No explicit roadmap → community không biết long-term direction

### Tier 2: Growing communities

**QwenPaw**
- ✅ 11 first-time contributors in 1 day
- ✅ Fast feedback loop (bug → fix trong ngày)
- ✅ External providers contribute (Firecrawl team submit PR)
- ⚠️ Volume bug reports = adoption growth nhưng stability chưa proven

**NanoBot**
- ⚠️ Zero external issues despite 34 PRs
- ⚠️ Core team dominated
- ✅ Clean architecture attractiveness (runtime contracts PR)
- ❓ Community adoption unclear

**Zeroclaw**
- ⚠️ Zero community reactions (0 thumbs-up trên tất cả PRs/issues)
- ⚠️ Internal contributors only
- ✅ High technical quality (Rust, WASM, security stack)
- ❓ Adoption phase chưa bắt đầu?

### Tier 3: Maintenance/niche

**PicoClaw**
- ❌ Stale bot đóng PRs 6 tháng cũ
- ❌ Contributor frustration visible (OneBot reaction toggle rejected)
- ❌ Maintainer không accept external PRs → fork risk
- 💀 Dự án trong "gentle decline"

**NanoClaw**
- ⚠️ Core team only (4 contributors)
- ⚠️ Zero external engagement
- ✅ Production usage visible (Feishu群频繁撤回 = real users)
- ❓ Private/internal tool?

**IronClaw, NullClaw**
- 💀 Dead/monitoring mode

### Community health indicators:

| Indicator | Hermes | OpenClaw | QwenPaw | NanoBot | Zeroclaw | PicoClaw |
|-----------|--------|----------|---------|---------|----------|----------|
| External contributors | ✅ | ✅ | ✅✅ | ❌ | ❌ | ⚠️ |
| Issue engagement | ✅✅ | ✅✅ | ✅ | ❌ | ❌ | ⚠️ |
| Bug report quality | ✅✅ | ✅✅ | ✅ | N/A | N/A | ⚠️ |
| Maintainer response | ✅ | ✅ | ✅✅ | ✅ | ✅ | ❌ |
| Roadmap visibility | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ |

## 🔮 Tín hiệu xu hướng

### 1. Plugin isolation = table stakes

**Evidence:**
- NanoBot enforcing import boundaries
- Zeroclaw shipping WASM host in artifacts
- QwenPaw refactoring channels → subprocess plugins
- Hermes chưa có PR về isolation

**Prediction**: Hermes cần plugin v2 architecture hoặc sẽ thua về modularity/security so với Zeroclaw/NanoBot.

### 2. Update reliability = make-or-break

**Pain visible everywhere:**
- OpenClaw: 7 unique update failure modes
- Hermes: venv rebuild lose deps, git bloat
- NanoBot: Docker first-boot crash
- Zeroclaw: Plugin install recovery

**Prediction**: Dự án nào solve graceful updates/rollbacks first sẽ win enterprise adoption. OpenClaw đang lead (2 beta fix in 24h).

### 3. Platform integration brittleness = ongoing tax

**Every project hit:**
- Telegram threading (Hermes, PicoClaw)
- Slack SDK breaks (Hermes)
- OneCLI API change (NanoClaw)
- Windows identity handoff (OpenClaw)

**Prediction**: Projects cần versioned adapter layer + integration test suites. Hiện tại tất cả reactive fix → churn high.

### 4. Observability shift từ nice-to-have → core

**Hermes leading:**
- Langfuse integration + fixes
- Trace redaction, session tagging
- Profile-scoped observability

**Others lagging:**
- Zeroclaw có cost tracking basic
- QwenPaw approval persistence đang build
- NanoBot/OpenClaw chưa có public observability story

**Prediction**: Production agent deployments demand tracing/cost/audit logs. Hermes advantage nếu fix Langfuse silent failures.

### 5. Community-driven velocity vs polish

**QwenPaw model:**
- 11 new contributors 1 day
- Bug → fix same day
- External providers contribute (Firecrawl)

**Hermes/OpenClaw model:**
- Curated releases
- Systematic fix stacks (5-layer bot delivery series)
- Longer cycles

**Prediction**: Hai model sẽ converge. Fast-moving projects hit stability wall (QwenPaw đang stack critical bugs). Polished projects cần faster feedback loop (Hermes silent failures = slow discovery).

### 6. Rust adoption for agent runtimes

**Zeroclaw only Rust project:**
- WASM plugin isolation
- Security-first design
- Performance focus

**Prediction**: Nếu Zeroclaw prove production-ready, Python projects sẽ consider Rust rewrites cho core runtime. Hiện tại Python dominance (4/5) vì ecosystem maturity.

### 7. Desktop vs Cloud deployment split

**Desktop-first (Hermes, QwenPaw):**
- Electron-based UIs
- Local-first execution
- Sync challenges (QwenPaw cross-device lag)

**Cloud-native (OpenClaw partially):**
- Server-side state
- Multi-tenant by design
- Update pipeline simpler

**Prediction**: Hybrid model wins — local execution option + cloud sync/backup. Pure cloud = vendor lock-in resistance. Pure local = collaboration friction.

### 8. Silent failure elimination = UX priority

**Pain dominant across:**
- Langfuse placeholder keys
- Plugin dep loss
- Telegram/Slack delivery drop
- Tool approval race conditions

**Current state**: Logs buried, no user-facing error surface.

**Prediction**: Projects adding structured error reporting + user-facing diagnostics sẽ reduce support burden. QwenPaw fast-fix model có lợi nếu add proactive error detection.

---

## 🎯 Kết luận chiến lược

**Hermes Agent positioning:**
- **Leader** về feature breadth + enterprise coverage
- **Risk**: Silent failure debt + breaking changes erode trust
- **Opportunity**: Fix observability gaps + update reliability → cement leadership

**Competitive threats:**
- **OpenClaw**: Update discipline better, có thể win enterprise if maintain velocity
- **QwenPaw**: Community-driven agility attract contributors, nhưng stability chưa proven
- **Zeroclaw**: Security/performance niche, nếu adoption bắt đầu có thể disrupt Python dominance

**Industry trend**: Hệ sinh thái đang mature từ feature race → stability + operability. Projects prioritize hardening over new capabilities. Update reliability, plugin isolation, observability = new battlegrounds.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-13

## 1. Tóm tắt hôm nay

Phát hành hai bản beta (2026.10.5-beta.2, 2026.10.2) sửa các vấn đề update blocking. Core team đẩy 30 PR, tập trung vào optimizations (SQLite worker, memory batching, compile cache). Backlog 95 issues, nhiều critical về update failures, session state loss, security bypasses.

## 2. Releases

### v2026.10.5-beta.2 (12/10)
- **Update recovery:** Xử lý stale handoff, completed receipts, legacy 2026.9.8 records
- **Windows:** Sửa short-name paths, heap limit retention
- Không còn report false failures

### v2026.10.2 (12/10)
- **Update từ 2026.10.1:** Hoàn thành clean thay vì error/rollback
- **Doctor:** Bỏ qua residual legacy imports
- Windows/cloned-filesystem paths không còn stall

→ Ưu tiên ổn định update pipeline trước features

## 3. Tiến độ dự án

**Performance PRs (steipete chủ đạo):**
- #170520: SQLite broker request custody transfer
- #170404: Memory batch indexing sau idle periods  
- #170517: Giảm session row state retention
- #170452: Reuse shared SQLite workers trong tests

**Security/Auth:**
- #157806: Preserve requester identity at execution admission (P1, platinum hermit)
- #132303: claude-cli backend bypass tools.deny (không enforce)
- #165176: Telegram-started turns fail gateway tool calls với "authority no longer active"

**Update mechanism:**
- #169280: Explain runtime retention + recovery failures
- #170335: Update xóa database snapshots dù bảo phải preserve
- #170332: Continue khi live state thay đổi trong capture

**Xu hướng:** Shift từ feature dev → stability (7/10 top PR là fixes)

## 4. Điểm nổi bật cộng đồng

**Top discussions (theo bình luận):**

1. **#97616** (18 comments): Zombie process leak từ hook/tool children → runtime degradation. User @avp717 trace được bash/codex unreaped processes
2. **#146860** (12 comments): Windows Scheduled Task InteractiveToken → update stall abandoned
3. **#48709** (8 comments): Gemini 2.5 Pro textSignature bloat + think tags → session failures

**Telegram-centric issues:**
- #126950: Opaque callback `tgcb1:` silently dropped cho non-plugin callers
- #170212: Failed /update + repair → systemd service SIGKILL, offline đến manual start

→ Telegram integration còn nhiều edge cases chưa stable

## 5. Ổn định & Bugs

**Critical (P0, ux-release-blocker):**
- #146860: Windows update handoff identity loss
- #168372: Agent creation flow mất config trước gateway.restart
- #161865: pnpm self-update launch SQLite worker từ removed old generation
- #169386, #169997, #170076, #170111: Multiple update failures (validating, candidate-doctor, package-swap, gateway-recovery)

**High severity:**
- #97616: Unreaped child process zombies
- #165176: Gateway authority "no longer active" block all tools
- #164907: Cron agentTurn "attempt disposed before transcript write"
- #166001: claude-cli "history changed before preparation"
- #170001: Restart mid-turn wedge session lane

**Patterns:**
- Update pipeline brittle (7 unique failure modes)
- Session/transcript state races (cron, restart, async exec)
- Authority lifecycle bugs (tokens expire mid-turn)

## 6. Yêu cầu tính năng

**UI/UX:**
- #111143 (6👍): Pin plugin tabs trong Control UI sidebar
- #70266 (1👍): macOS Talk Mode dùng assistant avatar thay vì default orb

**Functionality:**
- #9986: Trigger model fallback khi context length exceeded (không phải chỉ API errors)
- #108599: sessions_send announce gây 2-3x turn amplification → session-limit exhaustion

**Không có traction:** Chủ yếu maintenance requests, ít wildcard features

## 7. Phản hồi người dùng

**Pain points:**

1. **Update fragility:** 
   - @tibal32 (#169386): candidate-doctor failure
   - @BottaniCals (#170111): gateway-recovery-verification timeout
   - @zrzavywa (#170076): package-swap Linux x64 fail
   
2. **Windows khó khăn:**
   - @rogerspires4452-dev: Scheduled Task LogonType InteractiveToken không lấy được identity
   - @LifeViwer (#170212): Failed update + repair → SIGKILL

3. **Session state loss:**
   - @Tom-StrategicFinance (#165176): "Gateway caller authority no longer active"
   - @Apinand (#164907): Detached cron "transcript write" failures
   - @yoyo837 (#170001): Restart wedge session lane

4. **Memory/performance:**
   - @xrow (#99659): OOM killed sau companion app connect
   - @NOVA-Openclaw (#170204): Multi-GB SQLite stores → 70 min startup

**Positive:** Không có explicit praise trong threads, nhưng volume bug reports = active usage

## 8. Backlog & Roadmap

**Immediate (beta blockers):**
- Stabilize update pipeline (7+ open P0 failures)
- Session state races (cron, restart, async exec)
- Windows service lifecycle

**Next wave (P1):**
- #137594: MCP servers unavailable → tool_search loop
- #128916: message_tool_only runs fail silent
- #111547: typingMode bypassed bởi execution-phase signals

**Architecture debt (platinum hermit 🐚):**
- #97616: Hook/tool child reaping
- #161865: Worker launch từ removed generation
- #130249: Async exec arrive context-free → wrong session
- #169777: Shutdown hang trong transcript-workers join

**No explicit public roadmap.** Priority inference: stability > features, Windows parity, SQLite/worker overhaul

---

**Tổng kết:** Dự án trong "hardening phase" sau rapid feature expansion. Core team fix 30+ issues/week, nhưng integration tests chưa catch hết races. Update mechanism đặc biệt fragile trên Windows + non-standard filesystems. Community reports chi tiết, maintainers responsive, nhưng velocity tạo regression debt.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot ngày 2026-10-13

## 1. Tóm tắt hôm nay

Không release mới. 30 PRs hoạt động, 15 PRs merged trong ngày. Tập trung vào: refactor kiến trúc core (tách runtime contracts, compose image tools), hoàn thiện kênh WhatsApp Agent Platform, sửa bugs thiết lập và streaming providers. Không có issues mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### Merged today (15 PRs)

**Kiến trúc & refactor:**
- #6172: Chuyển image generation tools sang composition pattern trong application runtime thay vì hard-wire vào AgentLoop
- #6170: Khai báo session queue policy khi đăng ký command thay vì check tên `/compact` hardcode
- #6174: Tách EOF checks khỏi stream timing tests sau khi Linux Python 3.14 coverage job timeout

**Provider fixes:**
- #6177: Codex images chuyển sang standalone `/codex/images/generations` API thay vì trick qua text model
- #6156 + #6155: Zhipu và MiMo bỏ qua `reasoningEffort: "none"` - fix request builder giữ lại disabled thinking
- #3588: Convert non-WAV audio sang 16kHz mono WAV trước khi upload cho self-hosted Whisper backends
- #6011: Codex image generation dùng `client.stream()` thay vì buffered `post()` để tránh mất image khi disconnect

**WebUI & settings:**
- #6175: Cho phép remote connections chuyển Default permissions về Full Access (bỏ restriction không đáng có)
- #6162: Settings Restart button không tạo empty topic trong chat history
- #6161: Web proxy settings chuyển về **Capabilities → Web access → Configure → Advanced**
- #6160: Image providers chọn theo connection ID đã lưu, không chỉ fixed provider names
- #6159: Model presets hỗ trợ per-preset request overrides (headers, query params, body params)

**Channels:**
- #6157: Feishu restore "Add another assistant" flow và pairing reply recovery tracking

**Docs:**
- #6180: Thêm Sol AI vào Open Source Partners
- #6176: Skill `nanobot-document` để agent giải thích usage từ bundled docs (closed, lý do không rõ)

### Open PRs quan trọng

**P1 blocker:**
- #6171: Bootstrap working Docker Compose config on first boot - hiện tại fresh clone → crash-loop không reach được WebUI

**Tính năng lớn:**
- #6152: WhatsApp Agent Platform channel (official API) - text/media/reactions/typing, polling + webhook modes
- #6179: WebUI component gallery (`bun run gallery`) index 163 components với exports/source/consumers
- #6173: WebUI bang commands (`!command`) route qua gateway ExecTool
- #6032: Configurable local WebUI extensions surface với manifest validation

**Integrations & providers:**
- #6168: Managed installs + recoverable in-app updates (tiếp #5817)
- #6154: Prepare verified prebuilt preview candidates (5 platforms, không cần frontend build env)
- #6103: CoreWeave Inference custom provider example
- #6068: FXMacroData MCP preset (macro data: central-bank rates, CPI, jobs, GDP)
- #5718: OpenRouter native image generation API support
- #4919: Telegram custom Bot API base URL + extra headers

**Refactor đang đánh dấu conflict:**
- #6166: Isolate runtime contracts + enforce import boundaries (CI/CD + tests)
- #6083: Configure heartbeat evaluator model preset

## 4. Điểm nổi bật cộng đồng

Không có PRs nào có nhiều bình luận (tất cả `undefined` comments). Không issues mới. Community hoạt động thấp trong 24h, tập trung contributor core team.

## 5. Ổn định & Bugs

**Đã fix:**
- Zhipu/MiMo `reasoningEffort: "none"` bị ignore
- Codex image streaming buffer toàn bộ response trước khi parse → mất image khi disconnect
- Self-hosted Whisper backends reject non-WAV audio
- Feishu assistant pairing recovery tracking bị mất
- WebUI remote connections không switch về Full Access được
- Settings Restart tạo empty topic
- Test timing issues với Python 3.14

**Đang xử lý:**
- #6171 (P1): Docker Compose first-boot crash-loop

**Đánh dấu conflict (3 PRs):** cần coordinate merge order với các PRs khác.

## 6. Yêu cầu tính năng

**Đã implement (merged):**
- Per-preset request overrides
- Remote Full Access permission switching
- Standalone Codex Images API

**Đang review:**
- WhatsApp official channel
- WebUI bang commands execution
- Local extensions surface
- Component gallery
- Managed update flow
- CoreWeave/FXMacroData integrations
- OpenRouter image API
- Telegram custom API base

## 7. Phản hồi người dùng

Không thấy discussions hoặc issue feedback trong 24h. Contributors chủ yếu từ core team (@chengyongru, @Re-bin, @lsd-techno).

## 8. Backlog & Roadmap

Không thông tin roadmap rõ ràng. Dựa vào PRs đang mở:

**Short-term (P1-P2):**
- Fix Docker first-boot experience
- Merge kiến trúc refactor (runtime contracts, import boundaries)
- Hoàn thiện WhatsApp channel
- Stabilize managed updates flow

**Mid-term:**
- Extensions ecosystem (local surface đã có, cần thêm discovery/marketplace?)
- Component reuse tooling (gallery)
- More provider integrations (OpenRouter images, CoreWeave, FXMacroData MCP)

**Technical debt:**
- Import boundary enforcement
- Test reliability (Python 3.14 timing)
- Provider streaming patterns standardization

---

**Nhận xét:** Ngày tập trung housekeeping - nhiều small fixes và refactor. Không có big feature shipped. Docker first-boot bug là blocker quan trọng cho new users. WhatsApp channel là tính năng lớn nhất đang pending.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-13

## 🔥 Tóm tắt hôm nay

Ngày bận rộn: đóng 5 PR quan trọng (security fix, plugin installation recovery, delegate worker recovery), merge channel instance binding ceremony vào master. Focus chính: hardening plugin system trước release v0.8.6, fix cost tracking bugs, cải thiện ZeroCode UX.

## 📦 Releases

Không có release. Đang chuẩn bị v0.8.6 - nhiều PR tagged `release:v0.8.6` đang review.

## 🚀 Tiến độ dự án

**Merged hôm nay:**
- **#11302**: Channel instance binding ceremony - core infrastructure cho plugin channels. Install plugin → auto-bind channel instances → seed grants. Breaking change cho v0.8.6.
- **#11635**: Docker test fixtures cleanup (performance)
- **#11450**: Recovery mechanism cho delegate worker crashes - fix critical data loss bug #10331
- **#11188**: Fix browser/search tool alias bug - shell không còn nuốt browser commands
- **#11114**: Move multi-agent docs đến đúng chỗ

**Hot PRs đang review:**
- **#11693** [P0]: `model_routing_config upsert_agent` đang phá config - rewrites toàn bộ thay vì patch, tạo fake risk profiles, reset limits. Critical bug block operators.
- **#11347**: Ship WASM plugin host trong release artifacts - cần cho plugin ecosystem
- **#11262** + **#11261**: Plugin update command với verified replacement - stacked PRs, depends on #11236
- **#11236**: Plugin install recovery qua `plugin remove` - cleanup failed installs
- **#11301**: Durable agent rename recovery - fix stranded state khi rename bị gián đoạn
- **#11680**: Firecrawl web search provider - contribution từ Firecrawl team

**Xu hướng:**
- Plugin system maturation: install/update/recovery flow hoàn chỉnh trước v0.8.6
- Security hardening: filesystem channel path validation stack (#11394, #11405, #11406, #11413)
- Cost tracking fixes: UTC alignment, warning surface
- ZeroCode UX polish: queue behavior, prompt handling

## 💬 Điểm nổi bật cộng đồng

Không có issue/PR nào có nhiều reactions (tất cả 👍: 0). Activity tập trung ở maintainer/core contributor commits chứ không phải community engagement.

**Distinguished contributors active:**
- @Audacity88: 8 PRs (cost tracking, ZeroCode fixes, delegate recovery)
- @IftekharUddin: 7 PRs (plugin system, config security)

## 🐛 Ổn định & Bugs

**Critical fixes merged:**
- ✅ #11450: Delegate worker settlements không bị mất khi worker die
- ✅ #11188: Browser tool calls không còn bị redirect sang shell

**High-priority open:**
- 🔴 #11606 + #11693: `upsert_agent` phá config toàn bộ - **needs immediate fix**
- 🟡 #11623 + #11624: ZeroCode drop `ask_user` prompts → 600s timeout, no transcript
- 🟡 #11696: System prompt rebuild mỗi turn → bust prompt cache → waste $$

**Medium bugs:**
- #11694: ZeroCode Cost tab mix UTC + local day without label
- #11691: ⌥P hint types π trên macOS Terminal
- #10996: Channel instance seeding incomplete (partially addressed by #11302)

## ✨ Yêu cầu tính năng

- **#11680**: Firecrawl search provider - external contribution, needs maintainer review
- **#11697**: Cost limit override + warning exceptions - holding-crate doc proposal
- **#10996**: Plugin channel instance configuration seeding - partially done, canonical alias/retry behavior còn pending

## 👥 Phản hồi người dùng

Không có discussion threads hay user feedback issues. Bug reports đến từ internal testing/contributors chứ không phải end-users ngoài.

## 🗺️ Backlog & Roadmap

**v0.8.6 release gates:**
- Plugin system ship-ready: #11347, #11262, #11261, #11236, #11302 (merged), #11309
- Security: filesystem channel path validation stack (#11394 → #11406 → #11405 → #11413)
- Must-fix: #11606/#11693 `upsert_agent` bug

**Post-0.8.6:**
- #11304: Plugin egress denial recording (blocked)
- Agent rename recovery (#11301) - large refactor
- ZeroCode polish (#11619, #11624)

**Technical debt:**
- #11696: Prompt caching optimization
- Test coverage gaps: #11595 (channel map factory)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-13

## 1. Tóm tắt hôm nay

Ngày yên tĩnh: zero release, zero PR merge mới. Hoạt động chủ yếu là bot stale đóng 5 PR/issue cũ (từ tháng 3), plus 1 bug report mới về Telegram markdown escaping.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PRs đóng (stale bot):**
- #1500, #1397, #1509: config & provider fixes từ @badgerbees (tháng 3) - logger time format, Termux CA certs, Google extra_content
- #1676, #1651: Feishu threads + Telegram HTML chunking improvements (tháng 3)
- #3396: OneBot reaction toggle - bị reject vì maintainer không thấy cần thiết

**PRs còn mở:**
- #3381: Switch OpenAI sang responses API (16 ngày, stale warning) - chưa có maintainer review

**Issue đang sống:**
- #3426 (mới hôm nay): Telegram MarkdownV2 escape bug - link labels & blockquotes gây plain-text fallback
- #3394, #3392: QQ bot API mismatch, CLA signature detection (stale warning)

**Xu hướng:** Maintainers đang dọn backlog cũ. PRs từ tháng 3 không merge được → đóng. Velocity thấp, zero merge trong 24h.

## 4. Điểm nổi bật cộng đồng

Zero tương tác mạnh (0 thumbs-up trên tất cả). Issue #3426 có potential nếu người dùng Telegram gặp vấn đề tương tự.

## 5. Ổn định & Bugs

**Telegram channel (#3426):**
- MarkdownV2 converter không escape reserved chars trong link labels `[text]` và blockquote lines
- Kết quả: Telegram reject message → fallback plain text → mất format toàn bộ
- Root cause: code coi full link/blockquote là verbatim, nhưng MarkdownV2 yêu cầu escape cả nội dung bên trong

**QQ channel (#3394):**
- API backend update nhưng chat interface không sync → potential connection issues

**CLA tooling (#3392):**
- GitHub CLAassistant không detect signature → block contributor flow

## 6. Yêu cầu tính năng

**OneBot reaction toggle (#3395/#3396):**
- User muốn tắt auto-ack emoji (hardcoded 289 emoji sau mọi group message)
- PR đã làm opt-in flag nhưng bị reject
- Maintainer stance: không thấy use case đủ mạnh để add config option

## 7. Phản hồi người dùng

**Frustration với defaults:**
- #3395: "Every message gets emoji" → unwanted behavior, no way to disable
- Maintainer response: "nghĩ rằng auto-ack là positive UX" → không chấp nhận PR

**Android/Termux users:**
- Multiple PRs fix Termux-specific issues (CA certs, paths) → niche but active user base

## 8. Backlog & Roadmap

Không có roadmap công khai. Backlog cleanup đang diễn ra:
- Bot đóng PRs 6+ tháng tuổi không merge
- OpenAI responses API migration (#3381) pending review 16 ngày
- Bug fixes reactive, không có proactive feature plan visible

**Signal:** Dự án trong maintenance mode, ưu tiên stability over new features. Contributors ngoài gặp khó merge code.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw — 2026-10-13

## 🔍 Tóm tắt hôm nay

6 PR mở/đóng tập trung vào bug fixes và cải tiến kênh Feishu. Không có issue mới, không có release. Hoạt động chủ yếu là bảo trì: sửa OneCLI agent grants, cô lập test registry, tối ưu approval cards và file delivery cho Teams.

## 📦 Releases

Không có.

## 🚧 Tiến độ dự án

**Sửa lỗi ưu tiên cao:**
- **#4082** (OneCLI): Sửa lỗi `410 Gone` trên OneCLI 1.43+ agent secrets API. Di chuyển sang agent grants API, nâng gateway lên 1.45.0
- **#4081** (Testing): Cô lập env overrides trong `update-skills.test.ts`, tránh `NANOCLAW_REGISTRY_REMOTE` từ caller phá test
- **#4080** (Approval UX): Sửa approval card không hiện trong thread của requester khi yêu cầu từ DM thread
- **#4079** (Feishu): Sửa lỗi card tiến độ bị xóa nhầm khi có tool execution + thêm đọc `VOICE_SUMMARY_MODEL` từ `.env`

**Cải tiến delivery:**
- **#3674** (Teams): Thêm MIME type cho outbound files để Teams chấp nhận (mở từ 2026-08-30, vẫn đang review)

**Cộng đồng:**
- **#4083**: Thêm Sol AI vào Community section — blog về OpenClaw agent workflows

**Xu hướng:**  
Tập trung vào stability và integrasi kênh (Feishu, Teams, OneCLI). Không có feature mới lớn, chủ yếu sửa edge cases và DX improvements.

## 💬 Điểm nổi bật cộng đồng

#4083 đáng chú ý: Sol AI là blog cá nhân về production agent workflows trên OpenClaw — tài liệu tham khảo thực tế cho builder. Phản ánh cộng đồng đang xây dựng trên NanoClaw ecosystem.

Các PR khác chủ yếu từ maintainers (@chiptoe-svg, @bmultini, @amit-shafnir, @tier2tech-tian), không có external contributor mới.

## 🐛 Ổn định & Bugs

**Sửa trong ngày:**
1. **OneCLI breakage**: API change ở 1.43+ phá secret management → chuyển sang agent grants
2. **Feishu card cleanup**: Logic xóa card sai → card có tool execution bị xóa nhầm khi turn end
3. **Approval thread context**: Card gửi sai level trong Teams/DM threads
4. **Test isolation**: Registry env leaks phá integration tests

**Đang mở:**
- #3674 (Teams MIME types) — mở 1.5 tháng, có thể đang chờ testing/review

## 🎯 Yêu cầu tính năng

Không có feature request mới. Các PR hiện tại đều là fixes và maintenance.

## 👥 Phản hồi người dùng

Không có issue hoặc discussion mới từ end users. Activity chủ yếu từ core team.

#4079 note "4 号群频繁出现「大狗撤回了一条消息」" — Feishu users thấy bot xóa message liên tục, phản ánh UX issue trong production.

## 📋 Backlog & Roadmap

Không có roadmap công khai trong data. Dựa trên pattern:
- Tiếp tục cải thiện channel integrations (Feishu, Teams)
- Sửa DX issues (testing, OneCLI compatibility)
- Community contributions tăng (Sol AI reference)

Ưu tiên ngắn hạn: đóng #3674 (Teams files), monitor OneCLI 1.45.0 stability.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw — 2026-10-13

## 1. Tóm tắt hôm nay

Ngày yên tĩnh. Chỉ 1 issue mới về phân loại lỗi hàng ngày. Không có PR hay release. Dự án đang trong giai đoạn theo dõi chất lượng model thay vì phát triển tính năng mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Issue #8135 - Daily failure taxonomy (2026-10-12)**
- Phân tích 52 test case thất bại trong suite `officeqa`
- Kết luận: 100% lỗi do chất lượng model (DeepSeek-V4-Flash), không phải lỗi hệ thống
- Đây là báo cáo theo dõi định kỳ, không phải bug fix

**Xu hướng**: Dự án tập trung benchmark và đánh giá model chất lượng. Không có PR mới cho thấy giai đoạn quan sát thay vì code.

## 4. Điểm nổi bật cộng đồng

Issue #8135 chưa có tương tác nào (0 comment, 0 reaction). Cộng đồng im lặng hoặc issue này chỉ dành nội bộ team.

## 5. Ổn định & Bugs

Không có bug mới. Issue #8135 xác nhận lỗi nằm ở model inference, không phải infrastructure hay code logic.

## 6. Yêu cầu tính năng

Không có.

## 7. Phản hồi người dùng

Không có feedback từ bên ngoài. Issue duy nhất do maintainer tạo cho mục đích tracking.

## 8. Backlog & Roadmap

Không có thông tin roadmap trong dữ liệu. Dựa vào pattern issue hàng ngày, team đang:
- Chạy benchmark suite định kỳ
- Thu thập dữ liệu lỗi model
- Có thể chuẩn bị cải thiện prompt hoặc chuyển model khác

---

**Nhận định**: Ngày maintenance/monitoring, không phải sprint phát triển. IronClaw ở giai đoạn đánh giá hiệu năng agent trước khi có động thái lớn tiếp theo.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-10-13

## 1. Tóm tắt hôm nay

Ngày đẩy nhanh sửa lỗi. 20 PR mở (11 PR mới hôm nay), 16 issue hoạt động. Tập trung fix bug nghiêm trọng: Desktop startup crash (#8194→#8196), tool approval gãy (#8105→#8188), Tavily API key không config được (#8174→#8204). Thêm tính năng: Firecrawl provider (#8200), coding-cli management (#8156).

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**PR quan trọng được merge hôm nay:**
- #8188: Fix tool approval race condition - approve trước khi tool wait → bị reject
- #4707: Fix ToolResponse crash khi access content block như attribute

**PR đang review (mới hôm nay):**
- #8204 🔥: Cho phép dùng Tavily API key riêng qua credential store, fallback keyless nếu 401/429/432
- #8203: Echo user message ngay trong SSE stream thay vì đợi run kết thúc
- #8196: Fix Desktop crash Windows khi stale PID trong `runtime-owner.json`
- #8200: Thêm Firecrawl làm web_search provider thứ 3
- #8201: Cancel auto-scroll khi user scroll thủ công (fix chat transcript snap back)

**PR lớn đang phát triển:**
- #8156: API endpoints quản lý coding-CLI worker containers (L)
- #8182: Persist approval level per-chat trên server thay vì localStorage (XL)
- #8187: Tách channels thành plugins với subprocess isolation (XXXL)
- #7565: Hot reload plugins không cần rebuild workspace (XXXL)

**Xu hướng:** Focus stability. Nhiều fix race condition, startup crash, state persistence. Thêm config surface cho paid API (Tavily). Tách isolation (channels→plugins).

## 4. Điểm nổi bật cộng đồng

**Issue nhiều tương tác:**
- #8174 (4 bình luận): Web search Tavily hardcode keyless mode, không dùng được paid quota
- #8194 (2 bình luận): Desktop không khởi động được trên Windows khi có stale PID
- #7016 (4 bình luận): Tool call 404 lỗi streaming, gọi `/offload` vô tận
- #8105 (1 bình luận): Tool approval cả Agree/Reject đều thành Reject

**Vấn đề người dùng quan tâm:**
1. **Tavily API key:** Paid user không config được key → PR #8204 đã giải quyết
2. **Desktop startup:** Windows crash khi stale PID → PR #8196 fix
3. **Tool approval UX:** Button không hoạt động đúng → PR #8188 fix race

## 5. Ổn định & Bugs

**Critical bugs đã fix:**
- Desktop Windows crash `os.kill(pid, 0)` raise SystemError thay vì OSError (#8194→#8196)
- Tool approval race: user approve trước khi tool wait → lost decision (#8105→#8188)
- ToolResponse crash khi access `.text` trực tiếp (#4707)

**Bugs đang xử lý:**
- #8202: Message không hiện cross-device cho đến khi run xong
- #8186: Console scroll snap back 1.6s sau navigation jump
- #8185: `desktop.log` không rotate trên Windows - sidecar tee handle chặn rotation
- #8184: Doom-loop gate kill polling hợp lệ, cron ghi success sau terminate
- #8173: Codex backend connection break sau restart, zombie "running" block recovery
- #8175: `ProviderManager.active_model` không load lúc startup → service cron fail
- #7016: Tool call 404 lỗi streaming (open từ 2026-08-14)
- #7311: v2.1.1b2 thiếu `_qwenpaw_remote_backend` module (closed 2026-10-12)

**Vấn đề performance:**
- #8135: Console GPU busy vô lý do `backdrop-filter` 12-28px → PR #8137 thêm "reduced effects" mode

## 6. Yêu cầu tính năng

**Đang implement:**
- #8200: Firecrawl web_search provider (PR submitted)
- #8156: Coding-CLI management API endpoints (PR in review)
- #8137: Reduced effects tier cho Console (PR in review)

**Feature requests mới:**
- #8199: Firecrawl provider (tác giả là Firecrawl team, willing to maintain)
- #8189: Tích hợp ESP32 hardware giống Meta Muse
- #8195: Model pool cần nút delete/remove, chỉ có enable/disable không đủ

**Feature đang phát triển lớn:**
- #7565: Hot reload plugins (XXXL)
- #8187: Channels isolation (XXXL)

## 7. Phản hồi người dùng

**Positive:**
- Community active: 11 PR mới trong 1 ngày, nhiều first-time contributor (#8204, #8200, #6499)
- Response nhanh: Bug report buổi sáng → PR fix chiều cùng ngày (#8194→#8196)

**Pain points:**
- Tavily keyless → paid user không dùng được quota (#8174)
- Desktop Windows startup unreliable (#8194, #7311)
- Tool approval UX confusing (button không hoạt động như expect #8105)
- Multi-device sync delay (message không realtime #8202)
- Console scroll behavior jarring (#8186)

**Requests:**
- Model pool management: cần delete action (#8195)
- Hardware integration: ESP32 như Meta Muse (#8189)
- Better web search: Firecrawl addition (#8199)

## 8. Backlog & Roadmap

**Ưu tiên hiện tại (dựa trên PR activity):**
1. **Stability:** Fix startup crashes, race conditions, state persistence
2. **Plugin isolation:** Channels→plugins (#8187), hot reload (#7565)
3. **Management surface:** Tool API config (#8204), coding-CLI endpoints (#8156), model pool deletion (#8195)
4. **Performance:** Reduced effects tier (#8137), context reclaim (#8193)
5. **Multi-tenant:** Per-chat approval persistence (#8182), cross-device sync (#8202)

**Đang chờ merge (technical debt):**
- OpenAI-compatible input limits (#8191)
- GLM text-only model metadata (#8190)
- Approval decision preserve (#8188)
- Cancellation reason preserve (#8183)

**Long-term (large PRs):**
- Plugin hot reload framework (#7565)
- Channels subprocess isolation (#8187)

**Backlog cũ chưa giải quyết:**
- #7016: Tool call 404 (open 2 tháng)
- #8073: v2.2.2.beta4 LAN access error (open 12 ngày)
- #8135: Console GPU performance (PR đang review)

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*