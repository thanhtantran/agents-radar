# Bản tin Hệ sinh thái Hermes Agent 2026-09-30

> Issues: 89 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-30 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-30

## 📊 Tóm tắt hôm nay

Ngày 30/9 ghi nhận hoạt động merge/fix cao: 15+ PR đóng trong ngày, tập trung vào **sửa lỗi Desktop cập nhật**, **SSH backend stability**, và **session state recovery**. Không có release mới. Cộng đồng báo cáo lỗi tập trung vào Desktop Windows memory leak (~3.6GB renderer process) và Gateway disconnects (mỗi ~17 phút).

---

## 🚀 Releases

Không có release mới. Version hiện tại: **v0.21.5+4743** (từ commit d23cc6b0).

---

## 🔧 Tiến độ dự án

### PRs merged hôm nay (15 PRs)

**Update/install stability** (ưu tiên cao):
- #128511: Fix `_is_ancestor_pid()` fail trên sandbox (firejail/SELinux) — đọc từng PID link thay vì cả chain, tránh die tại `/proc/1` unreadable
- #128563: Restore cron agent-job prompts bị degrated sau update (job `prompt` bị ghi đè = job `name`)
- #128470: Fix settings-only provider blocks (e.g. `providers.openai-codex: {timeout}`) vẫn route validation đúng, không qua custom-endpoint branch
- #128446: Desktop không còn park ở failed update receipt — bound completion retries, accept non-strict-receipt on graceful completion
- #127238: Zombie-aware marker self-heal — Rust/Python/Electron readers giờ đều verify PID thật, clear stale marker tự động

**Desktop/SSH backend**:
- #128417: Drop dead pooled SSH backends (liveness window 60s → 4 phút revalidate tick) + tolerate slow cold boot (READY_CHECK_TIMEOUT 45s → 210s, connect timeout 30s → 90s)
- #128499: Detect attached-backend token drift — revalidate token mỗi lần liveness probe, không dùng stale token khi backend rotate
- #128281: Retire desktop-owned backends on code skew — watchdog giờ retire cả local `hermes serve`, không chỉ SSH isolated
- #101076: Clear dead remote update markers on SSH startup

**Agent/runtime**:
- #128569: Survive `context_files` kwarg skew — agent không crash khi caller dùng kwarg mới, warn + coerce về format cũ
- #128443: Skills guard detect bare `~` destructive rm + inline-shell auto-exec DSL

**Other**:
- #128785: Cap document artifacts per completion notification (kanban worker flood prevention)
- #124839: Report real POSIX drain refusal (Darwin SSH update denial surface properly)
- #128779: Auto-lint fix

### PRs open chờ review (9 PRs quan trọng)

- #128784: Guard autostash against huge untracked files (≥1GB báo lỗi thay vì hang)
- #128781: Fall back to `~/.hermes/.env` in runtime provider key resolution (SSH headless backend miss env vars)
- #128780: Telegram gate text release on TTS in `/voice all` mode
- #128778: `load_config_readonly()` không còn materialize HERMES_HOME on cache miss
- #128279: Classify deterministic git failures non-retryable (tránh retry vô ích với conflict/bricked venv)
- #119055: Surface app-owned backend code skew proactively
- #127943: Preserve large GitHub compare responses (remove 2MiB cap)
- #128569: Survive context-files kwarg skew
- #75861: Add `LLMExecutionBlocked` signal for middleware (#64662)

### Xu hướng

**Stability wins dominate**: 15/15 PRs merged là bugfix, 0 feature. Focus:
1. Update pipeline reliability (marker, git, completion)
2. Desktop ↔ backend lifecycle (skew detection, token drift, liveness)
3. SSH mode hardening (dead backend cleanup, cold boot tolerance)

---

## 🌟 Điểm nổi bật cộng đồng

### Issues hot nhất (theo bình luận)

1. **#52010** (22 💬): macOS FDA permission revoked sau mỗi update — Electron bundle ID change trigger macOS reset. Chưa fix, tracked.

2. **#84361** (12 💬): Desktop `MEDIA:` file links dead — regex bug ăn markdown + path concat sai. Đã close (fixed).

3. **#67368** (10 💬): Projects sidebar disappears sau re-render. Fix merged: split Projects + Sessions thành 2 collapsible sections độc lập.

4. **#95189** (9 💬): Gateway exits mỗi ~2 phút trên WSL2, renderer OOM do reconnect churn. **Cần repro** — awaiting-reporter.

5. **#69940** (7 💬): WebSocket disconnect mỗi ~17 phút (code 1012), sessions orphaned. **Cần repro** — awaiting-reporter.

### User pain points

- **Desktop Windows**: memory leak (renderer ~3.6GB, #121735), crash với FAST_FAIL_FATAL_APP_EXIT (#112961) — cần triage sâu
- **macOS**: FDA revoked, SSH probe fail despite terminal SSH works (#80836)
- **Gateway disconnect churn**: WSL2 + remote deployments gặp frequent reconnect, mất session state

---

## 🐛 Ổn định & Bugs

### Critical đang fix

**P1 (blocking)**:
- #127831: Cron external workers die trên managed 3.14 runtime — missing deps + self-resetting site-packages (duplicate issue, fix đã có PR)

**P2 (high-impact)**:
- #128759: `hermes doctor --live` falsely fail Browser khi agent-browser works nhưng Python Playwright extra absent
- #122416: Long quiet tool call settled as "connection dropped" when window unfocused/battery (45s silence watchdog quá aggressive)
- #84997: Desktop switching vào streaming session → scroll jitter, stuck on old history
- #70445: Session load slow/cancel on navigate away (remote/VPS)
- #122133: `hermes update` fail với "Two workspace members both named 'hermes-plugin-hindsight'" sau partial git timeout
- #120020: Settings-only provider block route validation sai → "Connected, but Hermes still cannot resolve a usable provider" (**fixed today** #128470)

### Stability improvements landed

- Update marker self-heal (zombie-aware)
- Cron prompt restore
- SSH backend liveness + cold boot tolerance
- Desktop code-skew retirement

---

## 💡 Yêu cầu tính năng

### Feature requests mới

- **#110759** (P3): Support Proton Pass/Custom Password Manager CLI — hiện chỉ hardcode Bitwarden + 1Password
- **#119678** (P3): Support OpenRouter Decisions-API models cho aux tasks (mcp_approval)
- **#126707** (P3): Error-toast "Switch model" nên mở in-chat picker, prompt bubbles cần Resend-with-attachments action
- **#123118** (P3): macOS gateway LaunchAgent show as opaque 'osascript' in Privacy & Security, không identifiable là Hermes

### Ongoing feature work

- **#103748** (P3): Official way to deliver message into existing live session (multi-agent coordination)
- **#126412**: Plugin catalog bump hermes-discord-rpc v1.2.3 → v1.2.4 (multi-terminal presence fix)

---

## 💬 Phản hồi người dùng

### Positive

- Desktop Projects/Sessions split (#67368) fix được appreciate — UI không còn flash/disappear
- Update stability improvements đang giải quyết pain points lớn (marker, prompt restore)

### Negative/Frustrated

- **macOS FDA revoke loop (#52010)** chưa có solution — user phải re-grant manual mỗi update
- **Windows Desktop instability** (#112961 crash, #121735 memory leak) chưa được prioritize đủ — "awaiting-reporter" tag nhưng user đã report detail
- **Gateway disconnect churn (#69940, #95189)** block production use cases — cần root-cause analysis, không chỉ repro request
- **SSH probe fail (#80836)** confusing — terminal SSH works, Desktop SSH probe die sau 1s

### Usability gaps

- `hermes doctor` false negatives (#128759)
- Error toast actions không contextual (#126707)
- LaunchAgent identity opaque (#123118)

---

## 📋 Backlog & Roadmap

### Immediate priorities (suy từ PR activity)

1. **Desktop stability on Windows** — P2 memory leak + crash investigations cần escalate
2. **Gateway reconnect resilience** — WSL2 + remote scenarios
3. **Update pipeline completeness** — git failure classification, large file guard
4. **SSH mode hardening** — probe robustness, Darwin drain UX

### Medium-term (từ open P3 features)

- Plugin ecosystem extensibility (password managers, custom backends)
- Multi-agent coordination primitives (#103748)
- Catalog maintenance automation

### Không có public roadmap — development reactive theo user reports + contributor PRs.

---

## 🔍 Insights

**Development model**: Fast-moving bugfix cycle (15 PRs/ngày), contributor-driven fixes được rebase/merge nhanh. Maintainer (@OutThisLife dominant committer) prioritize stability > features.

**User base**: Mix of local (Desktop app) + remote/VPS (SSH gateway) deployments. Windows users underserved (awaiting-reporter tags).

**Technical debt**: Code skew detection, update marker logic, SSH lifecycle → đang được clean up systematically.

**Community health**: Active issue reporting (50 issues triage hôm nay), nhưng some critical bugs (Windows crash, gateway disconnect) stuck ở needs-repro despite user detail.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-30

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang giai đoạn **hardening sau growth phase**. 7/9 dự án focus stability sweep — fix memory leak, session persistence, cross-platform bugs. Release velocity thấp (1-2 release/ngày cho toàn hệ thống), phát triển chủ yếu qua PR incremental.

**Điểm chung:**
- **Stability over features** — 80% PR là bugfix, 20% feature
- **Desktop/SSH mode convergence** — Hermes, OpenClaw, NanoBot đều fix backend lifecycle issues  
- **Tool policy tightening** — OpenClaw, Zeroclaw thêm security boundary cho tool execution
- **Session state pain** — 6/9 dự án có issues về session loss/crash-loop

**Phân hoá:**
- **Production-ready tier** (Hermes, OpenClaw, Zeroclaw) — enterprise features, security hardening, multi-platform
- **Growth tier** (NanoBot, PicoClaw, NanoClaw) — UX polish, integration expansion
- **Niche tier** (IronClaw, NullClaw, QwenPaw) — specialized use cases, smaller community

---

## 2. Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Merged hôm nay | Open critical | Community traction | Maturity signal |
|-------|--------|-----|----------|----------------|---------------|-------------------|-----------------|
| **Hermes Agent** | 89 | 500 | 0 | 15 | 1 (P1 cron workers) | 📈 High (22 comments trên top issue) | Desktop stability sweep, SSH hardening |
| **OpenClaw** | 118 | 500 | 1 (LTS) | ~10 (estimated) | 3 (P0 session hang, runtime freeze, crash-loop) | 📈 High (21 comments trên persistence) | Tool policy security, memory leak hunt |
| **NanoBot** | 5 | 36 | 0 | 8 | 0 | 📊 Medium (2 comments avg) | Session SQLite refactor, TUI polish |
| **Zeroclaw** | 2 | 50 | 0 | ~10 (30 total queue) | 0 (2 blocked) | 📉 Low (1 RFC active) | Config schema V4, eval infra build |
| **PicoClaw** | 6 | 2 | 0 | 2 (1 merged, 1 open) | 2 (queue invisible, session ghost) | 📊 Medium (16 comments input lag) | Web UI production-readiness push |
| **NanoClaw** | 2 | 15 | 0 | 7 | 0 | 📉 Low (no external) | Container lifecycle, gateway support |
| **NullClaw** | 1 | 1 | 0 | 1 | 0 | 📉 Low (vendor proposal) | Maintenance mode, external integrations |
| **IronClaw** | 2 | 5 | 1 (1.4.1) | 1 | 0 | 📉 Low (0 reactions on RFC) | Opt-in feature experiments, mature codebase |
| **QwenPaw** | 8 | 35 | 0 | 35 | 1 (context pollution) | 📊 Medium (4 comments counter bug) | Cross-platform CI pass, UX polish wave |

---

## 3. Vị thế Hermes Agent

**🥇 Leader về velocity và community engagement**

**Điểm mạnh:**
- **Highest merge rate** — 15 PR/ngày, fast bugfix cycle
- **Strongest community** — 22 comments top issue, user detail reports
- **Comprehensive platform coverage** — macOS FDA, Windows Desktop, WSL2, SSH/VPS
- **Systematic technical debt cleanup** — update marker, code skew detection, SSH lifecycle

**Pain points rõ nhất:**
- **Windows desktop underserved** — memory leak (3.6GB), crash (FAST_FAIL), stuck "awaiting-reporter" dù user báo detail
- **Gateway disconnect churn** — WSL2 + remote (~17 phút code 1012), block production use
- **macOS FDA revoke loop** — bundle ID change trigger permission reset mỗi update

**Chiến lược:**
- **Reactive development** — user reports drive priorities, không có public roadmap
- **Contributor-driven** — community PR được merge nhanh (rebase trong ngày)
- **Stability-first** — 15/15 merged PR là bugfix, 0 feature add

**So với competitors:**
- OpenClaw có structured roadmap (P0/P1/P2), Hermes reactive
- Zeroclaw có RFC process cho breaking changes, Hermes iterate nhanh không RFC overhead
- NanoBot có cleaner session refactor (SQLite done), Hermes vẫn đang fix marker logic

---

## 4. Hướng Kỹ thuật Chung

### 🏗️ Architecture Convergence

**Session persistence → SQLite**
- NanoBot: JSONL → SQLite transactions done (#5943)
- OpenClaw: session writer queue, sync operations block event loop (#119720)
- Hermes: update marker self-heal, zombie-aware (#127238)
- Pattern: migrate JSONL/flat-file sang transactional DB, offload I/O sang workers

**Backend lifecycle management**
- Hermes: detect code skew, retire stale backends, token drift revalidation (#128281, #128499)
- OpenClaw: runtime isolation, model catalog blocking mutations (#158901)
- NanoClaw: container sweep, reconcile cleanup (#3947)
- Pattern: process supervision → capability verification → graceful retirement

**Tool execution boundaries**
- OpenClaw: tool policy sync node/Gateway (#160444 P0)
- Zeroclaw: gate SaaS tools behind opt-in features (#11221), cron pre-approval bypass fix (#11149)
- Hermes: skills guard bare `~` rm, inline-shell DSL (#128443)
- Pattern: shift từ permissive defaults sang explicit allow/deny policies

### 🔧 Cross-platform Hardening

**Windows stability push**
- QwenPaw: path handling (drive letter + UNC), PTY descriptor limit, AppContainer cleanup (#8003, #8023)
- Hermes: renderer memory leak 3.6GB (#121735), FAST_FAIL crash (#112961)
- PicoClaw: input lag với long history (#3281)

**SSH/remote mode**
- Hermes: cold boot tolerance (30s → 90s), dead backend cleanup (60s → 4 phút) (#128417)
- OpenClaw: transport host scoping per runtime (#158901)
- NanoClaw: gateway exact host:port validation (#3964, #3966)

### ⚡ Performance Patterns

**Model catalog optimization**
- OpenClaw: cold start coalesce reads (#161496), prepared runtime rebuild freeze (#160777)
- Hermes: fallback chain cooldown (#8020)
- IronClaw: turn-0 tool selection với embeddings (opt-in RFC #8113)

**Memory leak hunting**
- OpenClaw: prepared-model-catalog worker 1GB/5min (#160548), plugin rematerialization (#97616)
- Hermes: Windows renderer leak 3.6GB (#121735)
- NanoBot: skill pool download block handler (#8027)

---

## 5. Điểm Khác biệt

### 📐 Chiến lược Phát triển

| Aspect | Hermes | OpenClaw | Zeroclaw | NanoBot |
|--------|---------|----------|----------|---------|
| **Roadmap** | Reactive, user-driven | Structured (P0-P3), clear backlog | RFC-gated breaking changes | Incremental polish |
| **Release** | No releases, rolling dev | LTS + latest dual-track | No releases, version bumps | No releases |
| **Feature add** | 0 features hôm nay | Extended-stable model catalog | 30 stacked PRs (eval infra) | 0 features, 8 bugfix |
| **Community** | High engagement, fast merge | High engagement, slow merge | Low external, internal-driven | Medium, detail reports |

### 🎯 Product Focus

**Hermes** — generalist agent platform, desktop + SSH parity
- Pain: desktop stability Windows, gateway disconnect
- Strength: fast bugfix cycle, community responsive

**OpenClaw** — enterprise-ready, security-first
- Pain: session persistence scale, memory leaks, tool policy bypass
- Strength: structured priority, LTS track, deep technical work

**Zeroclaw** — config flexibility, eval culture
- Pain: config schema complexity (V4 breaking)
- Strength: comprehensive eval stack, multi-model per provider

**NanoBot** — clean architecture, TUI focus
- Pain: Telegram/WeChat noise, context compaction UX
- Strength: session refactor done, fallback fast-fix (1h)

**PicoClaw** — Web UI-first pivot
- Pain: production-readiness gaps (queue invisible, session ghost, input lag)
- Strength: responsive to UX issues

**IronClaw** — opt-in experimentation, stability mature
- Pain: low community interaction
- Strength: secure defaults (mTLS, capability auth), thoughtful RFCs

**QwenPaw** — cross-platform sweep
- Pain: Windows desktop (Tauri reconcile), Telegram rendering
- Strength: CI pass all platforms, UX polish velocity

**NanoClaw** — container infrastructure
- Pain: arm64 support, nohup lifecycle
- Strength: systematic container cleanup

**NullClaw** — integration-focused, maintenance mode
- Pain: ít hoạt động phát triển
- Strength: swappable memory engines

---

## 6. Mức độ Trưởng thành Cộng đồng

### 🥇 Tier 1 (Production Community)

**Hermes Agent**
- Top issue: 22 comments (macOS FDA)
- User pain detail: memory numbers (3.6GB), exact error codes (FAST_FAIL_FATAL_APP_EXIT)
- Contributor diversity: community PR merged nhanh
- Support quality: awaiting-reporter tags nhưng chậm escalate

**OpenClaw**
- Top issue: 21 comments (agent persistence)
- Technical depth: users hiểu event loop blocking, SQLite sync
- RFC process: structured discussion (task-scoped models)
- Enterprise use: LTS track, security focus

### 🥈 Tier 2 (Growth Community)

**QwenPaw**
- 35 PR/ngày — highest code velocity
- AI-submitted issues với full repro logs
- First-time contributor merged (Telegram targeting)
- Cross-platform real-world reports

**NanoBot**
- Fast response (fallback bug fix 1h)
- Detail reports (context compaction noise, WeChat polling)
- Clean PRs (session refactor, subagent routing)

**PicoClaw**
- Long-tail issues (input lag từ tháng 7, 16 comments)
- Power users phát hiện edge cases (steering queue, session ghost)
- Feature requests thoughtful (Web UI UX proposal)

### 🥉 Tier 3 (Internal/Niche)

**Zeroclaw**
- RFC mở, 0 reactions — internal discussion trước public
- 30 PR queue, hầu hết từ 1 contributor (@IftekharUddin eval infra)
- Config V4 breaking cut — user impact chưa thấy feedback

**IronClaw**
- RFC 0 comment, team self-implement
- Google OAuth bug fix no public issue — internal report
- Opt-in features → ít urgent community demand

**NanoClaw**
- No external contributors
- Issues hầu hết từ @glifocat (core team)
- Container bugs từ internal NVIDIA DGX testing

**NullClaw**
- 1 issue từ vendor CEO (MemCode proposal)
- Maintenance release, ít tính năng mới
- No community feedback visible

---

## 7. Tín hiệu Xu hướng

### 🔮 Short-term (1-3 tháng)

**Desktop stability consolidation**
- Windows pain points sẽ được prioritize (Hermes, QwenPaw)
- Electron/Tauri memory leak, crash issues là critical path
- Gateway reconnect resilience cần root-cause analysis

**Tool policy maturity**
- Security boundary tightening (OpenClaw, Zeroclaw)
- Shift từ permissive defaults sang explicit allow/deny
- Enterprise deployment requirements drive this

**Session persistence finalization**
- SQLite migrations done (NanoBot) hoặc in-progress (OpenClaw, Hermes)
- Worker isolation patterns spread cross-projects
- Transactional guarantees become baseline expectation

### 🌊 Mid-term (3-6 tháng)

**Multi-model orchestration**
- Zeroclaw multi-model per provider (#9809) nếu merge → pattern spread
- IronClaw tool selection embeddings (RFC #8113) → performance optimization trend
- Model catalog management complexity tăng → dedicated UI needed

**Remote/distributed execution**
- IronClaw remote edge workers (RFC #7889)
- NanoClaw container isolation maturity
- SSH/gateway mode become first-class citizens, không phải bolt-on

**Eval infrastructure standardization**
- Zeroclaw comprehensive eval stack (11 stacked PRs) → best practice emerge
- Baseline files, regression gating, LLM judge → industry standard
- Agent quality measurement shift từ vibes sang metrics

### 🚀 Long-term (6-12 tháng)

**Platform fragmentation risk**
- Hermes reactive, OpenClaw structured, Zeroclaw RFC-driven → no convergence signal
- Config schema divergence (Zeroclaw V4 breaking) → migration pain
- Community split theo use case (desktop vs server, local vs remote)

**Memory/context management evolution**
- NullClaw hosted memory engine proposal → sync cross-device trend
- OpenClaw memory search path-authority weights → semantic search maturity
- Context compaction UX improvement → user expectation baseline

**Security boundary shift**
- Tool execution sandboxing (WASM, Docker, capability-based auth)
- Credential management (secure forms, secret handling patterns)
- Audit trails, compliance requirements → enterprise feature table stakes

---

## 💡 Strategic Insights

### Hermes Agent Positioning

**Opportunity:**
- Community momentum mạnh nhất — leverage để ship features nhanh
- Windows pain points nếu fix → competitive advantage lớn
- Gateway resilience nếu solve → production deployment unlock

**Risk:**
- Reactive model không scale — technical debt accumulation
- Windows "awaiting-reporter" trap → user frustration mount
- No LTS track → enterprise hesitation

**Recommended focus:**
1. **Escalate Windows critical bugs** — memory leak, crash investigations cần triage depth, không chỉ repro request
2. **Gateway root-cause analysis** — WSL2 + remote disconnect patterns, không accept "needs-repro" forever
3. **Introduce stability tiers** — consider LTS branch như OpenClaw, cho production users
4. **Public roadmap experiment** — test structured backlog visibility, reduce "what's next" uncertainty

### Ecosystem Health

**Healthy signals:**
- Multiple projects tackle same problems (session persistence, tool policy) → pattern maturity
- Cross-platform hardening wave → real-world deployment feedback
- Security tightening (pre-approval gates, feature flags) → enterprise adoption

**Concern signals:**
- Low release velocity — stability focus tốt, nhưng feature stagnation risk
- Community fragmentation — tier 3 projects ít external engagement
- Config complexity creep — Zeroclaw V4 breaking, migration pain points

**Prediction:** Hệ sinh thái sẽ consolidate quanh 3-4 production-ready platforms. Tier 3 projects risk abandonment unless tìm niche defense. Desktop mode sẽ become primary interface trong 6 tháng, gateway/remote mode mature sau 12 tháng. Tool policy và eval infrastructure sẽ standardize, drive quality baseline lên.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw — 2026-09-30

## 1. Tóm tắt hôm nay

Dự án focus fix session persistence, memory leak, và tool policy issues. Main PR chuẩn bị node session tool catalog sync với Gateway (#160444). Control UI update lifecycle test giờ opt-in capture (#161498). Model catalog cold start coalesce reads (#161496).

## 2. Releases

**v2026.8.33** — extended-stable (LTS equivalent)
- Gateway-only release, base từ August 2026 + security fixes
- Add flagship models: Meta Muse Spark 1.3, Anthropic Fable 5.1, OpenAI GPT-6 Astra, OpenRouter models
- Khuyến nghị: dùng 2026.9.6 cho latest features

## 3. Tiến độ dự án

**Hot PRs:**
- #161465: Fix Crabbox dispatch fail when native snapshots unavailable ⚠️
- #160444 🔒: Node session tool policy sync với Gateway (P0, security-boundary)
- #161422: Fix new session hang minutes khi model catalog load (P0)
- #161438: Stop serving failed Control UI build on next Gateway start
- #158901: Scope transport hosts per runtime (model runtime isolation)

**Xu hướng:**
- Heavy on session state reliability fixes
- Node/Gateway tool policy consistency push
- Memory leak hunting (prepared-model-catalog worker, plugin rematerialization)
- Control UI lifecycle improvements

## 4. Điểm nổi bật cộng đồng

**Top issues bình luận:**
1. #119720 (21 bình luận) — Agent persistence block Gateway event loop at scale
2. #97616 (16 bình luận) — Hook/tool child process zombies leak
3. #121661 (14 bình luận) — CLI subagent announce-wake runs tool-free, model fabricates calls
4. #157160 (12 bình luận) — Gateway crash-loop on plugin-doctor-post-session-state
5. #157630 (11 bình luận) — Explicit `--max-old-space-size` silently defeats worker resourceLimits

**Quan tâm:**
- Session state loss, crash loops
- Memory leaks (prepared-model-catalog, plugin materialization filling /tmp)
- Tool policy bypass (claude-cli backend ignores tools.deny)

## 5. Ổn định & Bugs

**Critical (P0):**
- #161409: `sessions.create` waits no deadline on model catalog, Control UI New Session hangs 7-17 min
- #160777: Control UI OpenClaw assistant rebuilds prepared model runtime every turn (~105s freeze)
- #157160: Gateway crash-loop on plugin-doctor-post-session-state
- #154950: Update 2026.7.1-2 → 2026.9.x permanently blocks Gateway via "legacy-workspace" error

**High (P1):**
- #119720: Synchronous agent persistence blocks Gateway event loop
- #97616: Hook/tool child processes leak as zombies
- #160548: prepared-model-catalog worker leaks ~1 GiB / 5 min
- #150132: claude-cli long tool-heavy turns lose final reply (8 MiB stdout cap)
- #143274: Rate-limit Retry-After disables auth-profile rotation failover
- #132303: tools.deny not enforced for claude-cli backend

**Patterns:**
- SQLite sync operations blocking event loop
- Memory leaks in worker threads (catalog, plugins)
- Tool policy bypass via CLI backends
- Session writer queue contention
- Model catalog publication blocking mutations

## 6. Yêu cầu tính năng

**Top requests:**
- #156341 (P3): Task-scoped decision models + inspectable evaluation (RFC)
- #70266 (P3): macOS Talk Mode overlay use assistant avatar
- #129884 (P3): Opt-in path excludes / bounded path-authority weights for memory search
- #83030 (P3): ReCraft V4.1 model family support (Standard, Utility, Vector)
- #64624 (P3): Suppress/throttle transient channel connection status events
- #158388 (P3): Logbook support multiple display capture

**Emerging:**
- #161487 (P2): CI popup controls for PR repair, merge, archive
- #120099 (P2): Preserve channel conversation as visible session after /new

## 7. Phản hồi người dùng

**Pain points:**
- Control UI New Session hangs minutes (no progress indicator) → #161409 P0
- Doctor `--fix` takes too long no progress → #154636
- iOS relay-backed push keeps replaying cached registration after 410 Unregistered → #120241
- Signal group subagent announce produces no reply → #152954
- Gmail watcher stays down after transient EADDRINUSE → #161467

**Positive sentiment:**
- Extended-stable release cho LTS use cases
- Active maintainer engagement trên complex issues

## 8. Backlog & Roadmap

**Immediate (chuẩn bị merge):**
- Node session tool policy sync (#160444)
- Control UI broken build fix (#161438)
- Session create catalog wait timeout (#161422)
- Catalog cold start coalesce (#161496)

**Queue:**
- Memory leak fixes (prepared-model-catalog, plugin rematerialization)
- Event loop blocking fixes (sync SQLite ops)
- Tool policy enforcement cho CLI backends
- Subagent lifecycle reliability
- Cron queue persistence across restarts (#82572)

**Technical debt:**
- Consolidate cross-directory duplicate code (#161352, size XL)
- Persistent follow-up queues (#82572)
- TUI startup after update chunks rewrite (#123906)

**Security focus:**
- Tool surface containment
- Provider auth rotation failover
- Input validation at trust boundaries

---

**Tóm lại:** Dự án đang ở phase ổn định core infrastructure — focus crash loop, memory leak, tool policy, session persistence. Release cadence clear (stable vs latest). Community engagement cao, nhiều deep technical issues. Maintainer response fast on critical paths.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-30

## 1. Tóm tắt hôm nay

Ngày merge lớn: 8 PR đóng (6 bugfix, 2 refactor), 2 issue đóng. Focus vào session persistence refactor (#5943 merged), subagent result routing (#4616 merged), TUI fixes. Cộng đồng báo fallback bypass bug (#5967) - đã fix trong 1 giờ.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**Merged hôm nay:**

- **#5943** - Session SQLite refactor: JSONL → SQLite transactions, worker pool cho I/O. Lớn (priority: p1). Xóa race conditions, tập trung state ownership.
- **#4616** - Subagent kết quả direct-mode vào pending queue thay vì global bus. Fix timing issue.
- **#5811** - Persist subagent sessions qua `SessionExecutor`. Mỗi task = `subagent:<task_id>` session riêng.
- **#5580** - Move session persistence off event loop → dispatcher. Fix blocking.
- **#5577** - Herdr panes dùng full TUI layout. Xóa metadata reporting riêng.
- **#5948** - Dùng ripgrep native cho search thay `grep`/`find_files`.
- **#5966** - TUI picker keyboard scroll fix - giữ overflow choices reachable.
- **#5964** - TUI UI alignment (controls/header với transcript).

**Open PRs quan trọng:**

- **#5974 + #5973** - Telegram per-chat/per-topic group policy + `/group` command. Stacked PR (5974 depends 5973).
- **#5983** - WebUI reasoning effort selector từ catalog thay freetext.
- **#5902** - Telegram topic auto-rename từ generated session title.
- **#5826** - FTS5 index cho session search (fix #5509 scan JSONL chậm).
- **#5970** - WebUI secure credential form mid-turn - tránh nhập password vào chat.
- **#5971** - Resolve markdown images từ MCP server `cwd`.
- **#5981** - TUI `/goal <task>` nhận request trong active turn.
- **#5537** - `my` tool persist session focus cross-turn.
- **#1759** - MCP tool lazy loading (conflict tag, lâu rồi).

**Xu hướng:** Tập trung session persistence architecture cleanup (SQLite, worker isolation), TUI polish, Telegram flexibility, WebUI UX (secure forms, catalog-driven UI).

## 4. Điểm nổi bật cộng đồng

- **#5967** (closed cùng ngày) - User @CarmeloCampos phát hiện fallback bị skip khi provider trả "insufficient credits" (HTTP 400). PR #5968 fix ngay, merge trong 1 giờ. Fast response.
- **#5900** (2 bình luận) - @coder-iu đề xuất tắt context compaction notification + giảm WeChat polling log. Open, chưa PR.
- **#5298** (2 bình luận) - @kuaijiemei đề xuất budget model-visible MCP schemas cho large tool sets. Open lâu (8/8 tạo).

## 5. Ổn định & Bugs

**Fixed:**
- #5967/#5968 - Fallback bypass khi "insufficient credits"
- #5966 - TUI picker overflow scroll
- #5964 - TUI alignment
- #5965 - Null parameter validation (type/enum checks)
- #5580 - Session persistence blocking event loop

**Open regression:**
- #5965 tag `regression` - null validation fix. PR open chưa merge.

**Conflicts:**
- #5954, #5537, #1759 tag `conflict` - cần rebase.

## 6. Yêu cầu tính năng

- **#5972** - Telegram per-chat/per-topic policy (PR #5973 + #5974 implementing)
- **#5900** - Silent context compaction, giảm WeChat log noise
- **#5298** - Budget MCP schemas cho large tool sets
- **#5981** - TUI `/goal` command mid-turn
- **#5970** - Secure credential input WebUI
- **#5826** - FTS5 session search
- **#5902** - Telegram topic auto-rename

## 7. Phản hồi người dùng

- **Fallback behavior** - User mong fallback work khi credits hết, bug #5967 gây frustration ("agent appears to stop").
- **TUI usability** - Picker scroll, alignment issues báo nhiều → đang fix systematic.
- **Context compaction noise** - User muốn tắt notification (#5900).
- **Model picker outdated** - #5977 gpt-5 models đã shutdown vẫn show. PR #5979 fix.
- **Secure credential flow** - User không muốn type password vào chat (#5970).

Sentiment: Constructive. Bugs được report chi tiết, response nhanh.

## 8. Backlog & Roadmap

**Short-term (PRs open):**
- Telegram group policy flexibility (#5973, #5974)
- WebUI catalog-driven UI (#5983, #5979)
- Session search FTS5 (#5826)
- TUI goal command (#5981)
- Secure credential collection (#5970)

**Long-term:**
- MCP tool lazy loading (#1759 - conflict, stale)
- Budget MCP schemas (#5298 - discussion phase)

**Architecture:** Session persistence refactor done (#5943 merged). Next: performance (FTS5), security (credential forms), UX polish (TUI/Telegram).

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-09-30

## 1. Tóm tắt hôm nay

Zeroclaw đóng bug P2 về giới hạn context 32k (#10068), mở RFC về RAG (#11235), và tiếp tục đẩy 30 PR lớn. Focus: config schema V4, feature gates cho SaaS tools, multi-model support, eval infrastructure, security fixes trong cron/RPC.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Config & Schema Evolution:**
- #11218 (XL): Migrate retired keys tại schema V4, cảnh báo missing `schema_version`
- #8754 (XL, distinguished): Schema V4 breaking cut - loại bỏ skills, inert tunables, summary_model cruft
- #11260 (CLOSED): Fix context budget bị clamp về 32k fallback

**Multi-model & Provider Support:**
- #9809 (XL, principal): Hỗ trợ nhiều models trên một provider profile - `[providers.models.<family>.<alias>.models.<model_alias>]`
- #10611 (XL): Adapt Anthropic/Bedrock cho Claude adaptive-thinking models (Opus 4.7+, Sonnet 5)
- #10687 (L): Fix custom OpenAI-compatible endpoints default về native tool calling

**Security & Safety:**
- #11149 (XL): Fix cron pre-approval bypass - RPC `cron/add` và `cron/patch` đã skip supervised-autonomy gate
- #11068 (XL): Narrow channel turns by sender role - thêm `risk_profile` vào peer groups
- #9320 (XL): Bound cron agent jobs với wall-clock timeout

**Tool & Feature Gating:**
- #11221 (XL): Gate 12 SaaS/coding-CLI tools (Jira, Notion, LinkedIn, Composio, Google Workspace, Microsoft 365...) behind opt-in features
- #10049 (S): Scope channel prompt guidance chỉ cho messaging-channel turns

**Eval Infrastructure (stacked PRs by @IftekharUddin):**
- #9248: Append-only run-history receipts
- #9245: Judge calibration tooling
- #9223: JUnit XML report format
- #9224: Repeated live runs với pass@k
- #9222: Per-dimension LLM-judge grader
- #9221: Baseline files với regression gating
- #9244: Seed và grade isolated case memory
- #9220: Comparable run receipts
- #9219: Workspace, budget, json-field graders
- #9217: Async Grader trait

**Lifecycle & Coordination:**
- #10621 (XL): Coordinate agent lifecycle mutations - shared live-config authority cho daemon RPC, gateway, channels, ACP
- #11176 (XL): Cron, memory, skills, personality, quickstart parity với HTTP routes

**Plugin Management:**
- #11261 (XL): Replace installed package qua staged admission
- #11262 (XL): CLI `zeroclaw plugin update` với verified replacement

**Infrastructure:**
- #9254 (CLOSED, DEFERRED): IBM Db2 session-persistence backend - chờ native driver

**Other Fixes:**
- #11238 (S): Accept tagged declarative cron schedules
- #9229 (XL, BLOCKED): State-aware interactive Ctrl+C
- #9326 (XL, BLOCKED): Process Signal Note to Self sync messages

## 4. Điểm nổi bật cộng đồng

**#11235 (RFC - Knowledge Corpus):** @ConYel đề xuất RAG cho agent - truy xuất documents operator giữ, language/tool docs, OS references, security standards. Mới mở 2026-09-29, chưa có tương tác nhiều.

**#10068 (CLOSED):** Bug context cap 32k bất chấp config 131k - fixed bởi #11260. Community issue với priority P2, đã parking-lot.

## 5. Ổn định & Bugs

**Fixed:**
- Context budget clamp bug (#11260 closed #10068)
- Cron pre-approval security bypass (#11149)

**In Progress:**
- Interactive Ctrl+C state-awareness (#9229 - blocked)
- Signal Note to Self sync (#9326 - blocked)
- Custom provider tool calling defaults (#10687 - needs author action)

**Risk Areas:**
- 9 PRs tagged `risk:high` (schema V4, eval infra, cron timeout, lifecycle coordination, agent mutations)
- 8 PRs tagged `risk:medium`

## 6. Yêu cầu tính năng

**#11235 - Knowledge Corpus (RAG):** Document retrieval cho agent - operator documents, language docs, security standards. RFC stage.

**Multi-model per provider (#9809):** Cho phép nhiều models share credential/endpoint - giảm provider profile proliferation.

**Feature-gated tools (#11221):** Opt-in cho SaaS integrations - tránh bloat cho users không cần.

**Channel sender roles (#11068):** Narrow channels by risk profile - fine-grained security control.

## 7. Phản hồi người dùng

**Config complexity:** Multiple PRs touch schema V4 migration - indicates config evolution pain. #11218 adds warnings cho missing schema_version.

**Context limits confusion:** #10068 shows users hit 32k cap despite configuring 131k - UX gap.

**Security concerns:** #11149 discovered pre-approval bypass in cron RPC - community-visible security work.

**Eval infrastructure demand:** 11 stacked eval PRs by distinguished contributor - strong internal eval culture, likely response to reliability needs.

## 8. Backlog & Roadmap

**v0.9.0 Core Parity Lane (#11001):** #11176 là P4 - cron/memory/skills/personality/quickstart RPC parity với HTTP routes.

**Blocked/Deferred:**
- IBM Db2 backend (#9254) - chờ native driver
- Interactive Ctrl+C (#9229) - status:blocked
- Signal Note to Self (#9326) - status:blocked

**Stale Candidates:**
- #10611 (Anthropic adaptive thinking)
- #9320 (cron timeout)

**Parking Lot:**
- #10068 (context cap bug - fixed nhưng vẫn parking-lot)
- #8754 (schema V4 cut)
- #9326 (Signal sync)

**Eval Roadmap:** Comprehensive eval stack đang build - receipts → baselines → judge → calibration → JUnit → pass@k → memory grading. Indicates serious testing/reliability investment.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo Phân tích PicoClaw - 2026-09-30

## 1. 📊 Tóm tắt hôm nay

Dự án tập trung fix UX critical của Web UI: steering queue invisible (#3408, PR #3410), session ghost (#3407), và đề xuất cải thiện working indicator (#3406). Một PR cũ về OAuth scope (#3378) được update. Không có release mới.

## 2. 🚀 Releases

Không có.

## 3. 📈 Tiến độ dự án

### Pull Requests đang active

**PR #3410** - Fix steering queue visibility (mới nhất, update hôm nay)
- **Vấn đề**: Message gửi khi agent busy → queue âm thầm → full thì drop không báo
- **Giải pháp**: Thêm `ack` event với queue state, `steering_dropped` event khi full
- **Impact**: User biết message đang queue, biết khi bị drop
- **Status**: OPEN, cần review

**PR #3378** - OAuth scope hardcoded bug (từ 2026-09-12, update hôm qua)
- Fix `RefreshAccessToken` dùng hardcoded `"openid profile email"` thay vì `cfg.Scopes`
- **Impact**: Provider custom scope (như Azure AD `User.Read`) bị ignore → refresh fail
- **Status**: OPEN lâu, cần merge

### Issues nổi bật

**#3408** - Steering queue UX bug (→ đã có PR #3410)
- Message queue khi agent busy nhưng UI không show
- Queue limit 10, full thì drop silent
- User nghĩ message mất

**#3407** - Session ghost bug
- Session mới tạo biến mất khỏi list khi model đang think
- Chat vẫn active nhưng không tìm lại được
- Race condition giữa UI state và backend session lifecycle

**#3406** - Web UI improvement request (feature)
- Working indicator rõ hơn (đang thinking vs done)
- Tách manual/channel sessions
- Session list với archive/search

**#440** - Max iteration limit quá thấp (từ tháng 2, update hôm qua)
- Hardcoded 20 iterations → fail trên complex tasks
- Đề xuất: thay bằng context-window bound + loop detection
- Long-standing pain point, 7 comments

**#3281** - Input lag khi history dài (từ tháng 7, update hôm qua)
- Web UI input box laggy với long chat history
- 16 comments, 2 👍
- Performance issue chưa fix

**#3409** - Scheduling primitive trigger autonomous loop (mới)
- Subagent dùng `ScheduleWakeup` để poll completion
- Side effect: trigger unwanted autonomous tick
- Architectural issue với scheduling system

## 4. 🔥 Điểm nổi bật cộng đồng

**#3281** (input lag) - 16 comments, 2 👍
- Lâu nhất trong batch issues hôm nay (từ tháng 7)
- User frustration về performance degradation
- Chưa có fix proposal

**#440** (iteration limit) - 7 comments
- Feature limitation block real workflows
- User report "completed but no response" error
- Đề xuất technical: context-window bounding thay vì hard limit

Issues #3407, #3408, #3409, #3406 đều từ 1-2 user active (@racso2609, @rogeriomarino2014-ship-it) → likely internal team hoặc power users phát hiện bugs sau khi dùng thực tế.

## 5. 🐛 Ổn định & Bugs

### Critical (blocking UX)

1. **Steering queue invisible** (#3408)
   - Messages drop silent khi queue full
   - PR #3410 đang fix
   - Impact: data loss perception, user confusion

2. **Session ghost** (#3407)
   - Session biến mất khỏi UI khi agent thinking
   - Chưa có PR
   - Impact: lost work, navigation broken

3. **Input lag với history dài** (#3281)
   - Performance degradation
   - Chưa có solution
   - Impact: UX trong long conversations

### Medium

4. **Scheduling trigger autonomous loop** (#3409)
   - Architectural: scheduling primitive abuse
   - Subagent workflow workaround trigger side effects

5. **OAuth scope hardcoded** (#3378)
   - PR ready, chờ merge
   - Impact: Azure AD và custom OAuth providers fail refresh

## 6. 💡 Yêu cầu tính năng

**#3406** - Web UI UX enhancements (mới nhất)
- **Working indicator**: Show "thinking" vs "done" rõ ràng
- **Session separation**: Manual vs channel sessions riêng list
- **Session management**: Archive, search, metadata display
- **Rationale**: Web UI là primary interface, cần pro UX features

**#440** - Smarter iteration control (từ tháng 2)
- Thay hard limit bằng context-aware bounding
- Loop detection thay vì blind cutoff
- **Rationale**: Complex tasks fail prematurely

## 7. 💬 Phản hồi người dùng

### Pain points chính

1. **Web UI chưa production-ready**
   - Queue behavior opaque
   - Session state inconsistent  
   - Input lag khi scale
   - Working state unclear

2. **Agent limitations frustrating**
   - 20-iteration hard stop kill legitimate workflows
   - "Completed but no response" error confusing

3. **OAuth integration brittle**
   - Custom scopes không work
   - Refresh token flow buggy

### Tín hiệu tích cực

- Users dùng đủ nhiều để phát hiện edge cases → adoption có thực
- Bug reports chi tiết với repro steps → engaged community
- PRs nhanh chóng từ bugs (1 ngày) → responsive maintainers

## 8. 📋 Backlog & Roadmap

### Immediate (trong vài ngày tới)

- Merge PR #3410 (steering queue visibility)
- Merge PR #3378 (OAuth scope fix) - đã pending 18 ngày
- Fix #3407 (session ghost)

### Short-term (tuần/tháng tới)

- Fix #3281 (input lag) - cần performance audit
- Implement #3406 (Web UI improvements)
- Redesign #440 (iteration limit) - architecture change lớn

### Pattern quan sát

Dự án shift focus sang **production-readiness của Web UI**. Batch issues hôm nay (4/6) về Web UI UX/reliability. Trước đây likely CLI-first hoặc API-first, giờ Web UI trở thành primary → phát hiện UX gaps.

Agent core (scheduling, iteration control) có technical debt (#409, #440) nhưng chưa prioritize fix - likely waiting for broader refactor.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-09-30

## 🔍 Tóm tắt hôm nay

Không có hoạt động trong ngày 30/09. Tất cả 15 PR và 2 issue được tạo/cập nhật trong khoảng 23-29/09. Đợt sóng bug-fix lớn từ @glifocat (core team) xử lý vấn đề container lifecycle, gateway support, và update rollback. Tập trung vào hardening infrastructure và multi-platform support.

## 📦 Releases

Không có.

## 📊 Tiến độ dự án

**Đóng trong ngày:**
- #3958: Fix log crash khi JSON.stringify gặp circular object/BigInt
- #3955, #3954: Cleanup gateway docs, tách notes vào từng skill riêng
- #3953: Iron Proxy dừng sớm trên arm64 thay vì exec format error (#3888 ✅)
- #3947: Host sweep dọn container khi session/agent group bị xóa (#3909 ✅)
- #3878: Setup dừng ping agent container trước khi xóa folder
- #3919: Merged vào #3965

**Mở/đang review:**
- #3968: Pin workflow actions + cosign + Dependabot (supply chain hardening)
- #3966, #3964: Iron gateway cho phép keyless local model qua plain HTTP với exact host:port
- #3965: Validate model URL với gateway đã chọn lúc setup prompt
- #3962: Update refuse cutover nếu service probe fail
- #3956: Rollback dừng nohup host + drain containers trước khi swap data/
- #3918: Result-door ko nudge lại reply đã gửi qua send_message (chờ ack flag)
- #3901: HTTPS_PROXY support cho host service (NODE_USE_ENV_PROXY)

**Xu hướng:**
- Container lifecycle bugs → host sweep + reconcile fixes
- Gateway abstraction → provider declare endpoints, gateway validate
- Update mechanism hardening → rollback safety, service detection
- Multi-platform → arm64 checks, platform-specific paths

## ⭐ Điểm nổi bật cộng đồng

Issue #3888 (arm64 Iron Proxy fail) có thực user report (@glifocat trên NVIDIA DGX Spark). Các PR khác đều internal work, không có external contributor hay discussion.

## 🐛 Ổn định & Bugs

**Đã fix:**
- Container orphan sau delete session/agent (#3947)
- Log crash với non-serializable value (#3958)
- Iron Proxy silent fail trên arm64 (#3953)
- Ping agent container leak sau setup (#3878)

**Đang fix:**
- Update cutover report complete khi service probe fail (#3962)
- Rollback không dừng nohup host (#3956)
- Setup không validate model URL với gateway sớm (#3965)

**Root cause:**
- Container reconcile chỉ visit row còn tồn tại, không dọn orphan
- Update script dựa vào stale state, không verify liveness
- JSON.stringify gọi trực tiếp không try-catch

## 🚀 Yêu cầu tính năng

- #3964: Provider declare exact host:port endpoints (không chỉ domain)
- #3966: Keyless local model qua plain HTTP trong Iron gateway
- #3901: HTTPS proxy support cho enterprise network

## 💬 Phản hồi người dùng

Một user report duy nhất (#3888). Phần lớn issue/PR từ core team (@glifocat dominant, @barnuri một PR). Không có community feedback hay discussion thread.

## 📋 Backlog & Roadmap

**Inferred priorities:**
1. Container lifecycle stability (sweep, reconcile, cleanup)
2. Gateway abstraction maturity (provider flexibility, validation)
3. Update/rollback safety (nohup support, service detection)
4. Multi-platform support (arm64, proxy environments)

**Technical debt:**
- Result-door nudge logic cần ack flag trước khi fix #3918
- OpenCode setup flow refactor liên quan #3919 → #3965
- CI supply chain hardening (#3968) chưa merge

Không có public roadmap hay milestone info.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# 📊 Báo cáo NullClaw - 2026-09-30

## 🎯 Tóm tắt hôm nay

Ngày 29/09 đóng PR v20260929 với sửa lỗi web search và QQ reply. Ngày 30/09 nhận đề xuất tích hợp MemCode engine cho memory interface từ CEO MemCode - tính năng cho phép đồng bộ memory qua nhiều thiết bị mà không tốn storage local.

## 📦 Releases

Không có release chính thức. PR #1014 bump version lên v20260929 nhưng chưa tag release.

## 🚀 Tiến độ dự án

**PR đã đóng:**
- #1014 (v20260929): 3 thay đổi
  - Pin web search vào provider đã config, chặn Exa reject duplicate Content-Type headers
  - Strip Markdown markers trước khi reply QQ official
  - Bump version v20260929

**Xu hướng**: Maintenance release - sửa integration bugs (Exa, QQ), không thêm tính năng mới.

## 💡 Điểm nổi bật cộng đồng

#1015 từ @vivekgupta-memcode đề xuất hosted MemCode engine:
- Tác giả là CEO MemCode, chủ động reach out
- NullClaw đã support nhiều swappable memory engines
- MemCode đề xuất remote option - sync memory cross-device, không tăng local storage
- Issue mới (0 comment, 0 reaction) - chờ phản hồi team

## 🐛 Ổn định & Bugs

PR #1014 sửa:
- Exa reject duplicate Content-Type headers → fix config web search provider
- QQ official reply render lỗi markdown → strip markers trước khi gửi

Không có bug report mới.

## ✨ Yêu cầu tính năng

#1015: Tích hợp hosted MemCode engine
- **Use case**: Sync memory qua devices
- **Benefit**: Giữ memory nhỏ gọn local, access từ xa
- **Technical**: NullClaw đã có swappable memory architecture, thêm remote backend
- **Blocker tiềm năng**: Privacy concern với hosted memory, latency, cost

## 👥 Phản hồi người dùng

Không có feedback người dùng trong issues/PR. #1015 là đề xuất từ vendor, chưa có community input.

## 🗺️ Backlog & Roadmap

Dựa trên hoạt động:
- **Ngắn hạn**: Team review đề xuất MemCode (#1015), quyết định có tích hợp không
- **Memory system**: Đang mature (đã có swappable engines), MemCode là option thứ N
- **Integration focus**: Sửa bugs với external services (Exa, QQ) → nhiều integration point đang active

Không có roadmap công khai trong data.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw – 2026-09-30

## 1. Tóm tắt hôm nay

Release stable 1.4.1 đã phát hành, sửa lỗi Google OAuth activation. Hai RFC lớn đang được thảo luận: hệ thống remote edge workers phân tán và tool selection tự động dùng embeddings. Cả hai đều opt-in, không ảnh hưởng setup hiện tại.

## 2. Releases

**ironclaw-v1.4.1** (2026-09-29)

Promote từ RC2. Sửa bug nghiêm trọng:

- **Google OAuth activation fix**: trước đây, activate Google extensions (Gmail, Calendar) qua Web UI → authorization thành công nhưng activation fail → credential bị revoke ngay → mỗi lần retry phải consent lại và fail lại
- **Wasmtime security update**: nâng cấp bảo mật cho WASM sandbox

Ý nghĩa: deployment dùng Web UI để cấu hình Google OAuth giờ hoạt động đúng. Quan trọng với operator không dùng environment variables.

## 3. Tiến độ dự án

**Merged/Closed:**
- **PR #8120** (chore): promote 1.4.1 stable → done

**Đang review:**
- **PR #8119** [XL, medium risk]: implement RFC #8113 – tool selection với embeddings. Trước model call đầu tiên, host rank tools theo user message, advertise top tools luôn → model gọi trực tiếp, không cần `tool_search` round trip. Opt-in, default off (`RESEARCH_RERANKER_PROFILE`). Size XL → thay đổi lớn ở loop-host.
  
- **PR #8118** [M, low risk]: CLI report đúng effective config profile từ `config.toml` khi `IRONCLAW_REBORN_PROFILE` unset. Reuse `runtime::effective_profile` thay vì duplicate logic.

- **PR #8117** [M, low risk]: Web UI restore focus sau khi đóng command palette (Cmd+K). Trước đây dismiss palette → focus rơi vào `body` → typing không quay lại input.

- **PR #7988** [XS, low risk]: nightly refresh codebase knowledge graph (automated bot PR).

**Xu hướng:**
- Focus vào developer experience: CLI accuracy, Web UI ergonomics
- Chuẩn bị tính năng performance optimization (tool selection) nhưng giữ opt-in
- Automated maintenance (knowledge graph refresh) → mature codebase

## 4. Điểm nổi bật cộng đồng

**Issue #8113** (RFC: tool selection): 0 reaction, 0 comment → RFC mới, chưa có feedback. Tác giả @CjS77 tự mở PR #8119 implement ngay → internal team thảo luận trước.

**Issue #7889** (RFC: remote edge workers): 1 comment, cập nhật 2026-09-29 → có discussion. RFC đề xuất extend scheduler/orchestrator với opt-in remote workers. IronClaw đã support parallel jobs, local workers, Docker sandbox, WASM tools, per-job credentials, resource limits, audit model. Bottleneck: worker pool thuộc một host. Nhiều operator có nhiều máy idle (P100s, TPUs) → muốn pool workers từ nhiều host.

Không có PR implement → RFC stage, thu thập feedback.

## 5. Ổn định & Bugs

**Đã fix:**
- Google OAuth activation bug (1.4.1) → critical UX issue, block extension usage
- Wasmtime security update → proactive security maintenance

**Đang fix:**
- PR #8118: CLI report sai profile → minor, confusing nhưng không break
- PR #8117: Web UI focus loss → minor UX annoyance

Không có critical bug mở. Bug fixes đều low/medium risk → codebase ổn định.

## 6. Yêu cầu tính năng

**RFC #8113 – Turn-0 tool selection** (opt-in):
- **Problem**: model phải call `tool_search` trước → thêm round trip, tốn token
- **Solution**: rank tools bằng BM25F + embeddings trước model call, advertise top tools luôn
- **Trade-off**: tăng latency turn đầu (embedding inference), tăng token (advertise nhiều tools)
- **Mitigation**: opt-in, default off; cache embeddings; config top-K threshold
- **Status**: đã có PR #8119 implement

**RFC #7889 – Remote edge workers** (opt-in):
- **Problem**: worker pool giới hạn một host → không tận dụng idle hardware khác
- **Solution**: opt-in remote workers qua secure protocol (mTLS, capability-based auth)
- **Scope**: scheduler/orchestrator extension, không thay đổi job model
- **Status**: RFC stage, chưa có PR

Cả hai RFC đều opt-in → không break existing setup → safe experimentation.

## 7. Phản hồi người dùng

Ít interaction trên issues/PRs → có thể:
- Core team đang self-drive features
- Community nhỏ hoặc dùng channels khác (Discord, Slack)
- Features opt-in → ít impact immediate users

Google OAuth bug fix trong 1.4.1 → có user gặp issue này (không thấy issue ticket public, có thể internal report).

## 8. Backlog & Roadmap

**Short-term** (đã có PR hoặc RFC gần done):
- Tool selection optimization → performance improvement cho power users
- CLI/UI polish → developer experience

**Mid-term** (RFC stage):
- Remote edge workers → scalability, distributed execution
- Codebase knowledge graph maintenance → agent quality

**Pattern nhận thấy:**
- Opt-in philosophy → không force changes, cho users experiment
- Security-first: mTLS, capability auth, Wasmtime updates, audit model
- Performance optimization sau stability → mature product mindset

Không có public roadmap cụ thể trong data. Development reactive theo community needs và internal priorities.

---

**Kết luận**: IronClaw đang giai đoạn stable maturity. Release 1.4.1 fix critical bugs. Hai RFC lớn về performance (tool selection) và scalability (remote workers) đang experiment. Core team active, community feedback ít → có thể early adopter hoặc enterprise-focused product.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo hoạt động QwenPaw ngày 2026-09-30

## 🎯 Tóm tắt hôm nay

Không có release mới. Dự án tập trung fix lỗi cross-platform (Windows path, PTY descriptor limit, AppContainer cleanup) và polish UX (icon sizing, navigation, copy controls). 35 PR được merge/đóng, 8 issue hoạt động — focus lớn vào stability sweep.

---

## 📦 Releases

Không có release trong 24h.

---

## 🚀 Tiến độ dự án

### Merged PRs quan trọng

**Cross-platform fixes** — CI giờ pass trên Windows:
- #8003: Fix Windows media path (drive letter + UNC), AppContainer cleanup log spam, test isolation
- #8023 → #8032: Terminal PTY dùng `poll()` thay `select()` — fix descriptor >1024 crash trên Linux (FD_SETSIZE limit)
- #8024: Reject invalid Qoder timezone (whitespace-only string crash Windows ZoneInfo)
- #8026: Duplicate của #8003, đã đóng

**Runtime & reliability**:
- #8001: Tool timeout giờ return result recoverable thay vì interrupt — model có thể continue
- #8007: Fix TaskTracker register run sau khi producer task tồn tại thực sự — cleanup zombie bookkeeping
- #8020: Model fallback chain giờ có cooldown — skip failing candidate thay vì retry cứng mỗi request
- #8034: Bound inline media per **request** (không chỉ per-file) — fix multi-MB body accumulation, gateway reject

**UX polish**:
- #8017: Model settings card + navigation tooltip + header collapse — align với tools/MCP visual language
- #8021: Restore compact copy icon (14px Lucide) trong chat bubble action
- #8019: Chat icon sizing 20px baseline, truncate project label dài
- #7936: Translate `channels.username` label sang tiếng Trung (duy nhất key thiếu trong namespace)

**Channel fixes**:
- #7983 → #7946: QQ WebSocket replay event sau session resume — dedup bằng seen message ID, tránh duplicate reply
- #7773: Telegram `/start` platform handshake giờ được consume — không forward lên agent
- #7765: Telegram command addressing (e.g. `/cmd@other_bot`) giờ được honor — không trigger sai bot trong group
- #7718: Telegram approval card dùng HTML parse_mode — render markdown đúng (trước hiện raw `**`)

**Performance**:
- #8027: Skill pool download offload lên worker thread — không block async handler với `shutil.copytree`
- #8004: CLI lazy-import `init_cmd` — cắt ~5s startup time cho `qwenpaw run` path

**Security**:
- #8028: Flag inline Office COM automation (`PowerPoint.Application`, etc.) trong shell command — prevent silent attach single-instance server với approval `auto`

**Infra**:
- #8029: Browser config giờ có `ignore_default_args` — drop Playwright default launch arg (e.g. `--disable-extensions`) cho persistent profile identity
- #8031: Fix 6 unit test leak unawaited coroutine — clean up scheduling mock noise

### Open PRs đang review

- #7931: Durable paginated transcript history (SQLite per-session, stable cursor, catalog routing) — lớn, đang polish
- #7903: Community feed + inbox integration — WIP, chưa merge
- #8012: Telegram render mọi fenced code block (fix regex miss info string với symbol như `c++`)
- #8033: Tauri stop reconcile away live backend — fix Windows desktop relaunch kill first instance backend

---

## 🔥 Điểm nổi bật cộng đồng

**#7991** (4 comment): TaskTracker zombie `_runs` entries inflate `running_task_count` — dashboard counter != `/api/chats` status. Scope mismatch global vs per-chat. Partial fix #8007 (register run sau producer exists), nhưng cleanup scope vẫn mở.

**#8036** (2 comment): Creator OpenAI integration fail nhiều case:
- Connection test pass nhưng generation fail
- UI thay provider error bằng generic `本次执行未完成，可重试继续`
- Resume fail với Kimi K3 on DashScope
Issue mới, chưa có PR.

**#8022** (1 comment): `send_file_to_user` tạo `file/image` content block + empty assistant message → pollute context → subsequent request 400 cho tất cả model (không downgrade content theo model capability). AI-submitted issue với log detail đầy đủ.

---

## 🐛 Ổn định & Bugs

**Đã fix**:
- Terminal crash với high FD (#8032)
- Windows path/timezone/cleanup (#8003, #8024)
- QQ duplicate message (#7983)
- Telegram command/approval rendering (#7765, #7718, #7773)
- Tool timeout interrupt flow (#8001)
- Model fallback infinite retry loop (#8020)
- Skill download block handler (#8027)
- TaskTracker zombie entries partial fix (#8007)

**Chưa fix** (open issue):
- #7991: TaskTracker counter scope mismatch — dashboard count không match API
- #8036: Creator OpenAI/DashScope fail + generic error message
- #8035: Transcription settings page không expose `transcription_model` config — switch provider silent break
- #8022: `send_file_to_user` pollute context → 400 for all models

---

## 💡 Yêu cầu tính năng

**#8015** (1 comment): Config custom Skill/Plugin marketplace source (self-hosted / offline deployment) — need cho intranet/air-gapped. Hiện hardcode public source, không thể override không patch code.

**#2359** (3 comment, từ 2026-03-26): `HEARTBEAT_OK` / `CRON_OK` message control model send behavior trong heartbeat/cron — giống OpenClaw pattern. Long-standing enhancement request.

---

## 💬 Phản hồi người dùng

- Telegram bot group targeting improvement (#7765) → first-time contributor fix được merge
- Windows desktop stability (#8033) và cross-platform CI (#8003) → community report real-world pain point
- AI-submitted issue #8022 với full reproduction log — workflow mới test thực tế

---

## 📋 Backlog & Roadmap

**Đang làm**:
- Durable transcript history (#7931) — large refactor
- Community feed integration (#7903) — WIP
- Cross-platform stabilization — wave lớn vừa merge

**Chờ triage**:
- Creator provider error UX (#8036)
- Context pollution từ file send (#8022)
- Transcription model config exposure (#8035)
- Custom marketplace source (#8015)

**Pattern**: Focus rõ ràng vào stability + polish UX sau feature wave. Không có breaking change signal.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*