# Bản tin Hệ sinh thái Hermes Agent 2026-10-01

> Issues: 87 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-01 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-01

## 📊 Tóm tắt hôm nay

Dự án ghi nhận hoạt động cao với 30 PRs và 50 issues quan trọng. Trọng tâm: sửa lỗi stability (cron worker crash, desktop double-render), bảo mật (terminal env leak, code-exec artifact isolation), và cải thiện UX (voice barge-in, plugin settings, approval gates). Không có release mới.

---

## 🚀 Tiến độ dự án

### PRs quan trọng đang mở

**Stability & Performance**
- #129281 ⚡ CLOSED - Fix catastrophic regex backtracking đóng băng gateway (lifecycle_guard pattern)
- #129254 🔴 CLOSED - Cron agent-mode worker chết im lặng trước khi agent start
- #129666 🔴 CLOSED - Dashboard chat sidebar: reconnect loop 250ms (sidecar/events flapping)
- #126524 🐛 Desktop reply render 2 lần (session state bug, DB chỉ có 1 row)
- #127665 🐛 Desktop render duplicate reply khi row đã commit
- #129731 🐛 Desktop: final answer render 2 lần trên narration→tool→answer turns

**Security & Isolation**
- #62336 🔒 Terminal env snapshots capture credentials to disk (BWS tokens exposed)
- #129854 🔒 Code-exec: scope overflow artifacts to owners (private profile directories)
- #129860 🔒 Skills: bind publication bytes + clear stale state (hardlink check, injection scan)

**Desktop & Voice**
- #129859 🎤 Fix desktop barge-in: chờ speech confirmed trước khi stop playback
- #129846 🎤 Defer barge interruption cho đến khi VAD confirm real speech
- #129819 🎤 Wake word luôn start voice ở leftmost chat, ignore selected tab
- #127313 🖱️ Desktop pane-body zone menu hijack transcript right-click (Copy blocked)

**Plugins & Tools**
- #129865 🔧 Show saved dotted setting values (nested config reads)
- #129732 📦 Plugin catalog: hermes-browser (Pyodide runtime in browser tab)
- #129857 📦 Plugin catalog: hermes-telemetry-dashboard (read-only metrics viz)
- #129853 📦 Plugin catalog: cloudflare-sandbox (Cloudflare Containers terminal env)

**Approvals & Kanban**
- #129847 🔐 Fix approvals: fail closed cho kanban dispatcher workers
- #116452 💡 Feature request: pre-dispatch + pre-create plugin hooks (Kanban guards)

**File & Search**
- #127861 ⚡ File-name search re-walk tree mỗi lần (19s với --sortr=modified, cần indexed locate)
- #129746 🔍 Fix search: scope protected-directory pruning (macOS ~/Downloads skip)

**Install & Update**
- #129585 🐛 Gateway start fail cho system-level profile units (uid ownership check)
- #129751 🐛 PM runtime prep sync app venv Python 3.11 với pm/uv.lock ==3.14.* (blocked updates)
- #129855 🔧 Fix updater: tránh staging suffix collisions (Windows ZIP fallback)
- #122133 🐛 hermes update fail: "Two workspace members named 'hermes-plugin-hindsight'" (stale plugin-sources)

**MCP & Memory**
- #127233 🔴 CLOSED (duplicate) - Render get_prompt content blocks (MCP prompt messages)
- #112106 🔒 Honcho: fresh client get stale bearer từ token memo → 401 (82/128 auth failures trong 5s)
- #81120 🐛 Successful memory mutations bypass loop guard, delete unrelated facts

---

## 🔥 Điểm nổi bật cộng đồng

**Top interactions (theo comments)**
1. #109552 (18💬) Label audit: unverified duplicate/invalid tags
2. #46260 (17💬) Windows installer fail "desktop" stage - npm exit code 1
3. #126524 (13💬) Desktop reply renders twice on fresh client
4. #125727 (10💬) Automated Nous integration blocked by merge conflicts

**User pain points**
- Desktop double-render bug tái diễn qua nhiều folds (#126524, #127665, #129731) - chỉ 1 row trong DB nhưng UI show 2
- Voice barge-in false positive từ echo (#129843, #129859) - playback bleed trip VAD, phá hủy reply
- Windows setup failures (#46260, #55004) - Application Control policy, venv setup errors
- Protected directory leaks trên macOS (#129746) - search vẫn mở ~/Downloads dù đã prune

**Feature requests có impact**
- #126292 (2💬👍) Native Android/iOS apps - location consent, real-time voice, camera
- #512 (4💬👍1) Doom loop detection - pause sau 3 identical tool calls (inspired by Kilocode)
- #129813 (3💬) User-configurable URL scheme allowlist (obsidian://, vscode://, things:///)

---

## 🐛 Ổn định & Bugs

**P0/P1 Critical**
- #129281 ✅ FIXED - Regex catastrophic backtracking đóng băng gateway (lifecycle_guard)
- #129254 ✅ FIXED - Cron worker chết im lặng, không error, không delivery
- #128757 🔴 OPEN - Model switch tốn 220s cold prefill trên 309K-token session (cache regression)

**P2 High priority**
- #126524, #127665, #129731 - Desktop double-render bug (session state, streaming, narration→tool→answer)
- #127105 - Background process notifications delivered as user messages (Discord, platform wire leak)
- #122016 - Desktop + launchd gateway restore stale model over explicit config
- #46131 - Ollama reasoning models return empty content (cần reasoning_effort param)

**Platform-specific**
- Windows: installer fails, systemd units misidentified, ZIP staging collisions, tree kill survivors
- macOS: protected directory leak, launchd gateway stale model restore, wake word ignore tab selection
- Linux: iGPU 50-69% sustained từ ambient animations (AMD integrated GPU)

---

## 💡 Yêu cầu tính năng

**Plugins & Extensibility**
- #116452 - Pre-dispatch + pre-create plugin hooks (Kanban deterministic guards)
- #125137 - agent:message:filter hook cho inbound message transform (PII obfuscation)
- #91687 - A2A long jobs return task ID (thay vì wait 300s timeout)

**Desktop & UX**
- #129813 - User-configurable URL scheme allowlist (obsidian://, linear://, vscode://)
- #77952 - Restore last selected session khi switch profiles
- #68702 - Dark mode icon cho macOS app
- #129754 - Hermes Lens browser research popup (built-in Desktop feature)

**TUI & CLI**
- #99773 - TUI attention budget + first-paint cleanup (OMP reference)
- #110124 - TUI fast model hop dùng existing model state
- #4848 - display.compact: true trong config.yaml không có effect

**Agent & Tools**
- #512 - Doom loop detection: pause sau 3 identical tool calls
- #112956 - Edit-tool shape audit: benchmark vs str_replace semantics (evals/edittool/)
- #116085 - Vault: registrable-domain (eTLD+1) matching cho credential origins

**Infrastructure**
- #126292 - Native Android/iOS apps (location, real-time voice, camera, always-with-you assistant)
- #124113 - system.metrics live host telemetry với Apple Silicon SoC sensors

---

## 💬 Phản hồi người dùng

**Positive signals**
- Plugin catalog expansion: 3 new entries trong 1 ngày (browser runtime, telemetry dashboard, Cloudflare sandbox)
- Community contributions: Italian i18n ready (#70732), dark icons request (#68702)
- Security-conscious users: credential leaks reported (#62336), skill hardlink checks requested

**Pain points**
- Double-render regression lan rộng, survive session restart, nhiều reproduction paths
- Voice barge-in false positives từ echo phá hủy user experience
- Windows install experience fragile: npm failures, Application Control blocks, venv setup errors
- Approvals bypass ở unattended contexts (kanban workers) tạo security gap

**Confusion areas**
- Plugin settings UI show defaults thay vì saved nested values
- MCP prompt content blocks không render (text/image/audio)
- File-name search performance: 19s re-walk dù filesystem có indexed locate
- Cron execution stuck im lặng, không error message, không diagnostic path

---

## 🗺️ Backlog & Roadmap

**Immediate focus (đang active PRs)**
1. Desktop stability: fix 3 double-render folds (#126524, #127665, #129731)
2. Voice UX: defer barge-in until speech confirmed (#129859, #129846)
3. Security: isolate code-exec artifacts, bind skill publication bytes (#129854, #129860)
4. Approvals: fail closed cho kanban workers (#129847)
5. Install/update: fix Windows staging collisions, system-level profile units (#129855, #129585)

**Medium-term (open feature requests)**
- Plugin hooks: pre-dispatch, pre-create, agent:message:filter
- Desktop: URL scheme allowlist, session restore per profile, Hermes Lens
- TUI: fast model hop, attention budget, compact mode fix
- Agent: doom loop detection, edit-tool audit, vault domain matching

**Long-term (innovation tier)**
- Native mobile apps (Android/iOS) cho location, voice, camera (#126292)
- A2A task IDs cho long-running jobs (#91687)
- System metrics telemetry với SoC sensors (#124113)

**Debt & maintenance**
- File-name search performance: indexed locate/plocate (#127861)
- Memory mutations loop guard bypass (#81120)
- Context-file scanner: U+200C false positive blocking Persian/Arabic (#92441)
- Terminal lifecycle regex: catastrophic backtracking fixed, need review (#129281)

---

## So sánh hệ sinh thái chéo

# Báo cáo So Sánh Hệ Sinh Thái AI Agent - 2026-10-01

## 1. 📊 Tổng quan hệ sinh thái

**Bức tranh chung**: 9 dự án AI agent hoạt động. 3 tier rõ ràng theo velocity và maturity.

**Tier 1 (Enterprise scale)**:
- Hermes Agent: 87 issues, 500 PRs - stability crisis mode
- OpenClaw: 122 issues, 500 PRs - post-release cleanup 
- Zeroclaw: 11 issues, 50 PRs - architecture refactor lớn

**Tier 2 (Production ready)**:
- NanoBot: 11 issues, 30 PRs - core consolidation
- QwenPaw: 19 issues, 41 PRs - beta testing, bug surge
- NanoClaw: 1 issue, 15 PRs - update system hardening

**Tier 3 (Niche/Early)**:
- PicoClaw: 0 issues, 6 PRs - Web UI polish
- NullClaw: 0 issues, 1 PR - yên tĩnh
- IronClaw: 0 issues, 1 PR - pending lâu

**Xu hướng ngày**: Không có release. Fix bugs, refactor infrastructure, security tightening. Community report nhiều hơn feature request.

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity Level | Engagement |
|-------|--------|-----|----------|----------------|------------|
| **Hermes Agent** | 87 | 500 | 0 | 🔥🔥🔥 Critical | 18💬 top issue |
| **OpenClaw** | 122 | 500 | 1 | 🔥🔥🔥 Cleanup | 98💬 SQLite crisis |
| **Zeroclaw** | 11 | 50 | 0 | 🔥🔥 Refactor | 5💬 tracker |
| **NanoBot** | 11 | 30 | 0 | 🔥🔥 Consolidation | Low comment |
| **QwenPaw** | 19 | 41 | 1 | 🔥🔥 Beta testing | 4💬 avg |
| **NanoClaw** | 1 | 15 | 0 | 🔥 Hardening | 0💬 (internal) |
| **PicoClaw** | 0 | 6 | 0 | ⚡ Polish | 0💬 |
| **NullClaw** | 0 | 1 | 0 | 💤 Quiet | 0💬 |
| **IronClaw** | 0 | 1 | 0 | 💤 Stalled | 0💬 |

**Chỉ số chính**:
- **Velocity leader**: Hermes + OpenClaw (500 PRs)
- **Community engagement leader**: OpenClaw (98 comments top issue)
- **Stability leader**: Hermes Agent - 30 critical PRs 1 ngày
- **Silent projects**: NullClaw, IronClaw - 1 PR duy nhất

---

## 3. 🎯 Vị thế Hermes Agent

### Strengths
**Velocity cao nhất**: 500 PRs active, 30 PRs critical merged/opened trong 1 ngày. Production scale rõ ràng.

**Technical breadth**: Coverage rộng nhất - Desktop (voice, UI), TUI, plugins, MCP, memory, cron, approvals, file search, terminal. 

**Security conscious**: 3 security PRs (terminal env leak, code-exec isolation, skill publication). Community report credential leaks.

**Plugin ecosystem**: Catalog expansion (browser runtime, telemetry dashboard, Cloudflare sandbox). Hooks design cho extensibility.

### Weaknesses
**Stability crisis**: 
- 4 P0/P1 bugs (regex hang gateway, cron chết, model switch 220s, double-render lan rộng)
- Regression survive 3 folds (#126524, #127665, #129731)
- Windows platform fragile

**User pain evident**: 
- Voice barge-in false positive
- Install failures
- Protected directory leaks
- Configuration visibility issues

**Reactive mode**: Fix bugs > add features. 30 critical PRs nhưng 0 feature merge.

### Position
**Tier 1 enterprise project** với OpenClaw. Production deployment scale (cron workers, kanban dispatchers, long sessions). Facing typical enterprise pain: stability vs velocity, platform coverage, security hardening.

**Differentiation**: Voice-first (barge-in, wake word), Desktop native app, plugin hooks architecture. Unique trong ecosystem.

**Risk**: User trust eroding - top issue 18 comments về label audit, Windows installer failures. Community muốn stability > features.

---

## 4. 🔧 Hướng kỹ thuật chung

### Gateway separation trend
**3/9 projects** refactor gateway:
- **Zeroclaw** (#7432): Gateway binary tách khỏi runtime core qua RPC. Phase 3 active. Credential-bound connections, endpoint verification.
- **Hermes Agent**: Gateway lifecycle issues (regex hang, start fail). Chưa có sign refactor.
- **OpenClaw**: Gateway RAM leak, startup time 220s Windows. Cleanup post-release.

➡️ **Pattern**: Tách gateway thành process riêng với RPC boundary. Security (credential isolation) + performance (offload I/O).

### Session state management
**5/9 projects** fix session lifecycle:
- **NanoBot**: JSONL → SQLite migration (#5943). Worker riêng I/O, tách event loop.
- **Hermes Agent**: Double-render bug 3 folds. Session state corruption.
- **OpenClaw**: WAL 2.8GB không checkpoint. Agent deletion không đóng DB.
- **NanoClaw**: Cutover liveness check, rollback service stop.
- **QwenPaw**: Session break vĩnh viễn DeepSeek+PDF. Background task 404.

➡️ **Pain point chung**: Session long-lived → accumulation bugs. SQLite WAL, state leak, race conditions. Migrate JSONL→SQLite là trend. Checkpointing + bounded growth cần solve.

### Security hardening wave
**4/9 projects** active security fixes ngày này:
- **Hermes**: Terminal env leak credentials, code-exec scope overflow, skill hardlink injection
- **Zeroclaw**: RPC identity verify, named-pipe server, authorization edit save
- **NanoBot**: Path traversal fix (#5633)
- **NanoClaw**: Credential gateway cho Copilot (không pass env)

➡️ **Focus**: Credential leaks, path traversal, RPC authentication, artifact isolation. Production deployment drive security.

### Performance optimization
**Multi-project** target boot time + RAM:
- **OpenClaw**: Gateway 220s ready Windows, RSS 9.3GB với heap 570MB
- **Hermes**: File search 19s re-walk, skill download 30s timeout
- **NanoBot**: Load only what worker needs (#10442)
- **Zeroclaw**: Catalog binding offload, project discovery coalesce

➡️ **Bottlenecks**: Gateway startup, plugin load, catalog polling, file tree walk. Offload work khỏi main thread. Lazy-load, index cache, coalesce requests.

### Platform-specific pain
**Windows** dominate bugs:
- Hermes: installer npm fail, systemd misidentify, tree kill survivors
- OpenClaw: session creation fail 100%, Doctor hang 35min, SQLite WAL >2GB
- QwenPaw: COM kill PowerPoint, venv sync block
- Zeroclaw: named-pipe verify, test port 1 fix

➡️ **Windows second-class citizen**. Path handling (`\\?\`), process lifecycle, SQLite WAL, Application Control policy. macOS/Linux ít bug hơn.

---

## 5. 🎨 Điểm khác biệt

### Architecture philosophy

**Hermes Agent** - Plugin-centric:
- Hook system (pre-dispatch, pre-create, message:filter)
- Catalog expansion (3 plugins 1 ngày)
- Approval gates cho unattended workers
- Voice-first, Desktop native

**OpenClaw** - Pragmatic stability:
- Post-release cleanup mode (v2026.9.7 fallout)
- Doctor operational reliability
- SQLite issues top priority
- Focus Windows deployment

**Zeroclaw** - Clean architecture:
- Gateway/runtime RPC boundary
- Security-first (RPC auth, credential binding)
- CI requires real acceptance tests
- High velocity (50 PRs), low engagement

**NanoBot** - Lean core:
- Consolidation (-703 LOC tests)
- JSONL→SQLite migration
- Channel integration focus (Telegram watchdog, Feishu, QQ)

**QwenPaw** - Beta testing:
- Community report bugs actively
- Config visibility issues
- Large operation timeout
- File handling edge cases

**NanoClaw** - Fork ecosystem:
- Update system hardening (rollback, cutover)
- Provider credentials gateway
- Fork contribution workflow
- Silent deployment (0 comment PRs)

### Feature differentiation

| Feature | Hermes | OpenClaw | Zeroclaw | NanoBot | QwenPaw | NanoClaw |
|---------|--------|----------|----------|---------|---------|----------|
| Voice | ✅ Barge-in, wake | ❌ | ❌ | ❌ | ❌ | ❌ |
| Desktop native | ✅ macOS app | ✅ Desktop | ✅ Desktop | ❌ | ✅ Desktop | ❌ |
| TUI | ✅ | ❌ | ✅ | ✅ Picker overflow | ❌ | ❌ |
| Plugin hooks | ✅ Pre-dispatch | ❌ | ✅ OpenRPC | ❌ | ❌ | ✅ 5 callbacks |
| Memory system | ✅ Honcho, MCP | ✅ Unbounded growth | ❌ | ❌ | ✅ ReMe rerank | ❌ |
| Approvals | ✅ Kanban guards | ❌ | ✅ RPC verify | ❌ | ❌ | ❌ |
| Cron/scheduled | ✅ Worker mode | ✅ Isolated env | ❌ | ❌ | ❌ | ❌ |

**Unique positions**:
- **Hermes**: Voice + Desktop + Plugin ecosystem + Approvals = enterprise assistant
- **OpenClaw**: Production scale, stability focus, large community (98 comments)
- **Zeroclaw**: Architecture purity, security-first, high dev velocity
- **NanoBot**: Channel integrations (Telegram/Feishu/QQ), lean core
- **QwenPaw**: Reranker memory, beta community engagement
- **NanoClaw**: Fork workflow, credential gateway, silent ops

### Community model

**Engagement tiers**:

**High (>10 comments top issue)**:
- OpenClaw: 98💬 SQLite WAL crisis, 40💬 upgrade regret
- Hermes: 18💬 label audit, 17💬 Windows installer

**Medium (2-10 comments)**:
- QwenPaw: 4💬 avg, first-time contributors
- Zeroclaw: 5💬 tracker, experienced contributors
- NanoBot: Low comments, quality bug reports

**Silent (0 comments)**:
- NanoClaw: Internal dogfooding, implement-first
- PicoClaw: Maintainer-driven
- NullClaw/IronClaw: Abandoned hoặc internal?

**Contributor patterns**:
- **OpenClaw**: Vocal users, upgrade pain reports, production deployment
- **Hermes**: Security-conscious, detailed repro, Windows focus
- **Zeroclaw**: PR-driven, experienced devs, low discussion
- **NanoBot**: Channel users (Telegram forum), quality reports
- **QwenPaw**: Beta testers, edge case discovery
- **NanoClaw**: Fork operators, production silent fixes

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Mature (production deployment visible)
**OpenClaw** - Cộng đồng lớn nhất:
- 98 comments SQLite issue = nhiều production instance hit problem
- Upgrade pain vocal (v9.5→9.6→9.7 break stable env)
- Quality bug reports (line numbers, logs, regression tests)
- PR contributions từ community
- **Stage**: Production scale-out, operational excellence needed

**Hermes Agent** - Enterprise users:
- Security reports (credential leaks)
- Windows deployment dominant
- Voice + Desktop feature requests
- Kanban/cron worker context = business automation
- **Stage**: Production, stability vs velocity tension

### Growing (active beta/early production)
**Zeroclaw** - Developer-focused:
- High velocity (50 PRs), low engagement = core team + few power users
- Security-conscious design (RPC auth, credential binding)
- Architecture refactor tolerance
- **Stage**: Pre-production, architecture solidification

**QwenPaw** - Beta community:
- 19 issues 2 days = active testing
- First-time contributors appearing
- Feature requests từ use cases (message edit, rollback)
- **Stage**: Beta, bug discovery phase

**NanoBot** - Channel operators:
- Telegram/Feishu/QQ integration focus
- Quality detailed bug reports
- Consolidation phase (-703 LOC)
- **Stage**: Early production channels, core stabilization

### Early/Internal (limited external signal)
**NanoClaw** - Fork ecosystem:
- 0 comment PRs = internal workflow hoặc small tight team
- High quality PRs (template compliance, problem statements)
- Production patterns (update system, proxy support)
- **Stage**: Fork deployments, internal dogfooding

**PicoClaw** - Small maintainer team:
- Web UI focus
- 0 reactions/comments
- Steady small improvements
- **Stage**: Development, looking for users

**NullClaw/IronClaw** - Unclear:
- 1 PR each, 0 engagement
- NullClaw: provider expansion pattern
- IronClaw: automation PR pending 1 month
- **Stage**: Dormant hoặc stealth internal?

### Maturity indicators

| Metric | Mature | Growing | Early |
|--------|--------|---------|-------|
| Top issue comments | 40+ | 5-20 | 0-2 |
| Production pain reports | ✅ Upgrade, scale | ⚠️ Beta bugs | ❌ |
| Community contributors | ✅ PRs merged | 🔄 First-timers | ❌ |
| Platform coverage | ✅ Win/Mac/Linux | ⚠️ 1-2 platforms | ❌ |
| Operational issues | ✅ SQLite, RAM, boot | ⚠️ Edge cases | ❌ |
| **Projects** | OpenClaw, Hermes | Zeroclaw, QwenPaw, NanoBot | NanoClaw, Pico, Null, Iron |

---

## 7. 🔮 Tín hiệu xu hướng

### 1. Gateway/Runtime split là future
**Evidence**:
- Zeroclaw active refactor v0.9.0
- OpenClaw gateway issues dominant (RAM, startup time)
- Hermes gateway lifecycle bugs

**Why**: Security (credential isolation), performance (offload I/O), scale (horizontal gateway instances).

**Prediction**: 2027 Q1-Q2, thêm 2-3 projects follow pattern. Gateway-as-a-service offerings appear.

---

### 2. SQLite operational pain là universal
**Evidence**:
- OpenClaw: WAL 2.8GB, không checkpoint, block startup
- NanoBot: JSONL→SQLite migration active
- QwenPaw: session persistence issues
- NanoClaw: session storage trong update rollback

**Why**: Long-lived sessions, high write frequency, WAL không tune đúng, checkpoint policies naïve.

**Prediction**: 
- Dedicated session-store libraries emerge (bounded WAL, automatic vacuum, corruption recovery)
- Alternative: move hot session state ra khỏi SQLite (Redis/in-memory + periodic checkpoint)
- 2027 H1: at least 1 project ship "session store refactor" như gateway split

---

### 3. Windows deployment là pain point chung
**Evidence**: Dominates bugs across Hermes, OpenClaw, QwenPaw, Zeroclaw.

**Why**: Path handling, process lifecycle, Application Control, SQLite filesystem behavior khác Linux.

**Prediction**:
- Pressure build cho first-class Windows support hoặc explicit Linux-only
- WSL2 workaround patterns standardize
- 2027: Windows-specific test suites + CI appear, hoặc projects drop Windows

---

### 4. Voice interface đang diverge
**Evidence**: 
- Hermes alone invest voice (barge-in, wake word, echo cancellation)
- Other projects: 0 voice PRs

**Why**: Voice UX complexity cao (VAD, echo, latency). Niche use case so far.

**Prediction**:
- Hermes voice features mature thành reference
- Voice capabilities commoditize via libraries/SDKs (2027 H2)
- Hoặc voice stay niche, enterprise-only (compliance, meeting assistant)

---

### 5. Security hardening accelerating
**Evidence**: 4/9 projects security fixes ngày này. Themes: credential leaks, RPC auth, artifact isolation, path traversal.

**Why**: Production deployment → attack surface real. Community report leaks → awareness grow.

**Prediction**:
- 2027 Q1: Security audits become standard (penetration testing, CVE bounties)
- Isolation architectures standardize (sandboxes, capability-based, least privilege)
- Compliance requirements drive (SOC2, HIPAA for agent platforms)

---

### 6. Plugin ecosystems split winners/losers
**Evidence**:
- Hermes: catalog expansion, hook design
- NanoClaw: provider callbacks (5 hooks)
- Others: 0 plugin activity

**Why**: Extensibility trade-off complexity. Hermes bet on plugins, others monolithic.

**Prediction**:
- Plugin models diverge: 
  - **Hermes style**: app-store catalog, approval gates, rich hooks
  - **Monolithic style**: built-in tools, less config
- 2027: marketplace emerge for agent plugins (commercial, verification, ratings)
- Winning model unclear — watch adoption metrics

---

### 7. Memory systems underbaked
**Evidence**:
- Hermes: Honcho stale tokens, loop guard bypass
- OpenClaw: unbounded growth, retention policy missing
- QwenPaw: ReMe rerank UI, embedding batch failures

**Why**: Long-context models reduce memory urgency. Ranking/retrieval quality not proven. Operational issues (growth, corruption) overshadow features.

**Prediction**:
- 2027 H1: Memory systems rewrite hoặc drop
- Trend: rely on native long-context (Gemini 1M+, Claude 200K) + simple cache
- RAG complexity not worth it for most agents
- Memory stays niche (personal assistant, multi-year history)

---

### 8. Community engagement predicts survival
**Pattern clear**:
- High engagement (OpenClaw 98💬, Hermes 18💬): survival likely, funding signals
- Silent (NullClaw, IronClaw 0💬): risk abandonment

**Why**: Community = free QA, feature ideas, contributor pipeline, adoption proof.

**Prediction**:
- 2027 end: 2-3 tier-3 projects archived
- Consolidation around 4-5 active projects
- OpenClaw + Hermes lead if stability improve
- Zeroclaw darkhorse nếu keep velocity

---

### 9. Fork ecosystems emerging (NanoClaw signal)
**Evidence**: `/contribute-upstream` skill, fork-specific update system, silent ops.

**Why**: Enterprise fork agents cho compliance/customization. Internal deployment không public engagement.

**Prediction**:
- 2027: "fork-friendly" architecture become selling point
- Features: clean upstream merge, isolated customization points, fork telemetry
- Business model: open-core + enterprise fork support

---

### 10. AI agent consolidation imminent
**Current state**: 9 projects, 3 tiers, overlap cao.

**Drivers**:
- Gateway/session patterns converge
- Windows pain universal
- Security requirements similar
- Plugin vs monolithic chưa resolved

**Prediction 2027**:
- Mergers/partnerships: complementary strengths combine (voice + stability, plugins + channels)
- Standards emerge: Agent Communication Protocol, session format, plugin API
- Top 3 survive: likely OpenClaw (community), Hermes (features), Zeroclaw (architecture)
- Rest niche hoặc archived

---

## 🎯 Kết luận chiến lược

**Hệ sinh thái đang mature**: Từ features → stability. Production deployment pain dominate. Security, performance, Windows support top priorities.

**Hermes Agent position**: Tier 1, feature leader (voice, plugins), stability crisis. User trust risk. Cần: 
1. Fix Windows platform
2. Resolve double-render regression  
3. Harden security (leaks addressed)
4. Gateway refactor consider (follow Zeroclaw pattern)

**Winning conditions 2027**:
- Stability > features
- Windows parity với Linux/macOS
- Security audit pass
- Community engagement sustain
- Plugin ecosystem adoption proof

**Risk factors**:
- Velocity drop nếu focus stability → competitor catch up features
- Windows issues unresolved → lose enterprise
- Voice niche không scale → wasted investment
- Plugin complexity barrier → adoption slow

**Opportunity**:
- Voice lead 12+ months → defensible moat
- Plugin catalog network effects
- Enterprise features (approvals, cron) unique
- Security-conscious community asset

**Next 90 days critical**: Resolve P0 bugs, ship stable release, prove Windows platform, measure plugin adoption. Data decide double-down vs pivot.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo phân tích OpenClaw - 2026-10-01

## 1. Tóm tắt hôm nay

Ra v2026.9.7 hôm 30/9. Hôm nay chủ yếu handle fallout: ~30 PRs fix bugs critical từ 9.7 (Windows session creation fail 100%, Doctor hang, gateway crash-loop). Cộng đồng report vấn đề nặng: gateway RAM leak, SQLite WAL phình >2GB, plugin load chậm 3-5 phút trên Windows.

## 2. Releases

### v2026.9.7 (30/9)
Vừa ra: 518 commits, 2,818 PRs. Docs không có chi tiết changelog trong data. Community phản ứng: nhiều regression nghiêm trọng.

## 3. Tiến độ dự án

### PRs hot nhất:
- **#162245** [P0]: Fix Windows rollback do rounded lease identity - Doctor fail ngay sau update (blocker)
- **#160675** [P1]: Prevent duplicate Telegram replies (message-delivery risk)
- **#162248** [P2]: Fix agent deletion không đóng database Workers khi dùng symlink
- **#160442** [P2, perf]: Load only what worker needs - giảm boot time và RAM
- **#162016** [P2]: Coalesce project discovery - nhiều `projects.list` concurrent gây CPU spike

### Xu hướng:
Performance optimization wave: nhiều PRs targeting gateway startup time (Windows hiện ~220s ready) và RAM leak. Focus lớn trên offload work khỏi main thread (catalog binding #162037, observed projects #162016).

## 4. Điểm nổi bật cộng đồng

### Top issues theo comments:
1. **#143524** (98 cmt) 🔥: SQLite WAL grow >2.8GB, không checkpoint. `wal_autocheckpoint=1000` không work. Gateway block startup. Windows specific.
2. **#153257** (40 cmt): v2026.9.5 "turned stable env into 8-hour recovery". User regret upgrading.
3. **#157067** (20 cmt): Windows isolated cron pass uncloneable env Proxy → session worker crash.

### Critical patterns:
- Windows stability issues dominates top 10 (WAL, cron, Doctor, plugin load)
- Memory/SQLite unbounded growth (#114612, #143524): production instance fill disk sau weeks
- Gateway startup time regression (Windows: 220s vs reasonable baseline)

## 5. Ổn định & Bugs

### P0 blockers (8 issues):
1. **#161953** [NEW]: Windows `sessions.create` fail 100% trên 9.7 do `\\?\` path leak
2. **#157325**: Stuck agent-DB resource → every reply fail với generic error
3. **#154252**: Requester settle-wake exhaustion unreachable cho batch stuck
4. **#115642**: Billing cooldown outlive outage (subscription auth 5h window)
5. **#162047**: Windows 9.7 upgrade spend 35+ min in Doctor (hardlink validation loop)
6. **#161746**: Gateway stuck "database generation changed" retry loop sau 9.7 upgrade
7. **#141791**: Empty legacy auth_profile_store block requests, dropping table prevent startup

### Crash/hang patterns:
- Gateway OOM: RSS 9.3GB với V8 heap chỉ 570MB (#154812) → leak outside V8
- Plugin lifecycle pass không release stale tool handles (#156883)
- Doctor `--fix` hang indefinitely at "schema migration pending" (#161888)

## 6. Yêu cầu tính năng

### Feature requests chất lượng:
- **#70266** (5 cmt): Use assistant avatar trong macOS Talk Mode overlay
- **#129884**: Opt-in path excludes/weighted ranking cho builtin memory search (derivative files outrank canonical)
- **#115662**: `claws add` adopt existing workspace (migration path cho pre-Claw agents)

### Recurring themes:
Memory/embedding system needs tuning (ranking issues, unbounded growth). Android support undocumented but works (#112876).

## 7. Phản hồi người dùng

### Pain points:
**Upgrade risk**: nhiều user báo stable env break sau minor upgrade (9.5 → 9.6 → 9.7). Pattern: SQLite issues, plugin lifecycle, Windows-specific regressions.

**Doctor problems**:
- Spend minutes re-verifying unchanged transcripts (#161770: 13.6 min cho 256 archives)
- Hang indefinitely (#161888)
- False positives keep warning sau work published (#162257)

**Performance complaints**:
- Gateway ready time 220s (Windows) vs baseline unknown (#158134, #159499)
- Plugin load CPU-bound: 3 channel plugins = 57s (#160485)
- Codex initialization dramatically slower than external CLI (#158134)

### Positive signals:
Active contributors submit detailed repro cases với code citations. Quality bug reports cao (many có exact line numbers, logs, regression tests).

## 8. Backlog & Roadmap

### Inferred priorities (từ issue labels):
1. **Stability** (P0/P1): 40+ high-priority bugs, focus Windows + SQLite
2. **Performance**: Gateway startup, plugin load, catalog polling đang được address
3. **Memory system**: Retention policy, ranking quality (#114612, #129884)
4. **Developer experience**: Doctor reliability, clearer error messages (#112978)

### Notable cleanup work:
- Refactor spawn broker (#162135)
- Test stability: MCP fixture tests flake under load (#162274)
- CI improvements: fix intermittent failures (#161803)

---

**Summary**: Post-9.7 stabilization mode. Team chạy nhanh ship fixes cho Windows regressions. Cộng đồng vocal về upgrade pain, SQLite operational issues. Performance work song song với stability fixes. Quality engagement từ users (detailed repro, PR contributions).

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot 2026-10-01

## 1. Tóm tắt hôm nay

Ngày sản xuất cao: merge 21 PR, đóng 11 issue. Tập trung vào session stability, WebUI streaming bugs, TUI improvements. Core consolidation – reduce redundant tests (-703 dòng), centralize session state sang SQLite.

---

## 2. Releases

Không có release.

---

## 3. Tiến độ dự án

### Merge quan trọng (21 PR đóng)

**Session & State Management:**
- #5943: Migrate session storage từ JSONL sang SQLite transactions. Worker riêng cho I/O, tách khỏi event loop. State ownership tập trung.
- #5633: Fix path traversal vulnerability – validate session keys, block `../../etc/passwd` injection.
- #5421: Preserve provider state khi idle compaction chạy đồng thời với turn.

**WebUI & Streaming:**
- #5989: Fix synthetic trailing `_` sau assistant reply (Remend repair logic lỗi).
- #5990: Fix TeX formula boundaries – Streamdown split `\[...\]` thành Setext heading.
- #5991: Prevent late events (admission ACK) reopen completed turn clock.
- #5988: Remove duplicate "Using config:" message khi khởi động webui.

**TUI:**
- #5950: Restore saved session history từ canonical events thay vì `messages` field.
- #5958: Fix unreadable text trên light terminals – fallback terminal-default foreground/background.
- #5966: PickerMenu overflow – keyboard scroll, bounded visible window.
- #5981: Accept `/goal <task>` during active turn, pass hidden input không có prompt wrapper.

**Agent & Runtime:**
- #5993: Scope tool resources to session cancellation – broadcast cancel xuống tools, subagents, shell processes.
- #5995: Clear stale failure state khi runner resume (fix successful recovery báo failed).
- #5994: Honor empty tool registries – `tools=ToolRegistry()` không re-enable default tools.
- #5985: Add session-owned subagent messaging, targeted cancellation không ảnh hưởng parent/siblings.
- #5986: Preserve PATH cho argument-vector commands trong ExecTool.

**Providers:**
- #5938: Fix Responses tool conversion – preserve `strict` settings, tránh force incompatible args.
- #5992: Support scoped proxies across all backends (OAuth, custom, transcription).
- #5984: Codex model catalog – change client version sang `99.99.99` để hiện newly available models.

**Channel & Notifications:**
- #5780: Stop sending context compaction notifications (autocompaction invisible, giữ cho `/compact`).
- #5997 (OPEN): Reject stale Linear member access updates sau reauthorization.

**Testing:**
- #5907: Consolidate 46 test groups, remove 703 dòng duplicate coverage, keep 171 inputs/assertions.

### PR mở quan trọng

- #5941: Connect to existing remote nanobot từ local WebUI (NAN-157).
- #5997: Fix race condition Linear member access – stale response reactivate denied member.
- #5985: Subagent messaging/cancellation.
- #5995: Clear stale failure state.
- #5994: Preserve empty tool registries.

---

## 4. Điểm nổi bật cộng đồng

**Issue đóng (11 total):**
- #5903: Feishu hidden session-checkpoint marker leak ra user.
- #5987: TUI debug mode không recognize numbers-only input.
- #3626: Telegram long polling silent hang – không receive updates.
- #5956: Feishu compaction notice spam (không in-place edit).
- #5564: Path traversal vulnerability trong session file handling.
- #3718: Cron reminder stream missing `stream_id`.
- #2084: Duplicate instance risk – launch second gateway cùng config.

Hai issue quan trọng:
1. **#5564** (security): Path traversal fix merged (#5633).
2. **#3626** (Telegram hang): Watchdog fix merged (#3627) – ping/getMe recovery.

---

## 5. Ổn định & Bugs

### Fixed
- Path traversal (session keys).
- Telegram polling watchdog.
- TUI saved session không load history.
- WebUI synthetic underscore, TeX formula split.
- Late event reopen completed turn.
- Responses tool parameter loss.
- Empty tool registry ignored.
- Codex model catalog filter.
- Linear member access race.

### Ongoing
- #5997 (OPEN): Linear reauth race – review requested.
- #5943 (OPEN): SQLite migration – awaiting review.

---

## 6. Yêu cầu tính năng

- #5941 (OPEN): Connect to remote nanobot từ local WebUI.
- #5985 (OPEN): Subagent messaging/cancellation API.
- #5981 (merged): `/goal` command during active turn.
- #3647: Local tokenizer thay vì network-dependent tiktoken (merged #3662).

---

## 7. Phản hồi người dùng

**Positive:**
- Test consolidation (-703 dòng) giữ coverage.
- TUI overflow picker, light theme readable.
- SQLite migration tốt hơn JSONL.

**Pain points:**
- Feishu compaction notification spam (#5956).
- TUI debug mode number input (#5987).
- Duplicate gateway instances (#2084).

---

## 8. Backlog & Roadmap

**Short-term (next merge):**
- #5997: Linear member access fix.
- #5943: SQLite session migration.
- #5985: Subagent messaging.

**Mid-term:**
- Remote nanobot connection (#5941).
- Provider proxy unification (#5992).

**Long-term:**
- Session stability improvements (compaction race conditions resolved).
- Tool resource scoping (#5993) đã merge – backlog cho advanced cancellation logic.

**Trend:**
Core consolidation phase – reduce technical debt (redundant tests, JSONL→SQLite), tighten runtime safety (cancellation scoping, empty tool registry), polish UX (TUI, WebUI streaming bugs).

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-01

## 📊 Tóm tắt hôm nay

Ngày làm việc cực mạnh: 50 PRs hoạt động, 11 issues mới/cập nhật. Tập trung vào **tách gateway khỏi runtime** (v0.9.0), **bảo mật RPC**, và **ổn định CI/testing**. Không có release.

---

## 🚀 Tiến độ dự án

### 🎯 Gateway separation (v0.9.0) - giai đoạn then chốt

**PR chính:**
- **#11315** - Gateway binary preview (`zeroclaw-gw`) đằng sau feature flag `gw-bin`
- **#11280** - Chuyển health/TUI/history endpoints qua core RPC
- **#11277** - Bind core connection theo credential của caller
- **#11331** - Sessions REST API qua core
- **#11339** - Plugin webhook reservations chuyển sang daemon
- **#11334** - Table phân loại toàn bộ gateway routes (rpc/delegate/shadow)

➡️ **Tracker**: #7432 - Phase 3 gateway split đang rất sôi động

### 🔒 Security & Authorization

**PRs quan trọng:**
- **#11289** - Denial reasons có identifier ổn định + localized messages
- **#11286** - Bind gateway pairing tokens vào roster users (`user:<id>` thay vì shared operator)
- **#11324** - Verify daemon identity trong `call_local` 
- **#11325** - Verify named-pipe server trên Windows
- **#11323** - Quyết định có save authorization edit khi daemon từ chối không

### 🧪 Testing & CI

**Cải thiện độ tin cậy:**
- **#11343** - CI yêu cầu real application acceptance (build cả ZeroClaw + ZeroCode binaries)
- **#11293** (merged) - Fix PR risk report check stale metadata
- **#11294** - Flaky test: `configure_refuses_an_incarnation_replaced_under_the_lock` race 150ms sleep
- **#11312** - Fix Serply test trên macOS (dùng port 1 thay vì ephemeral)
- **#11321** - Fix Hailo connect-failure test dùng port 1

### 📐 Architecture & API

- **#11341** - Describe tất cả method results trong OpenRPC contract
- **#11275** - Check `protocolVersion` spelling trong initialize
- **#10911** - Atomic live config revisions (stacked PR lớn)

---

## 🐛 Ổn định & Bugs

### Bugs quan trọng được fix

**Plugin & Tool issues:**
- **#11336** 🆕 - CLI báo `[loads]` cho plugin mà runtime từ chối (missing `config_schema`)
- **#11335** 🆕 - Approval prompt không terminal báo sai `Denied by user` thay vì runtime fail-closed
- **#11327** 🆕 - Plugin tool có thể pre-empt `tool_search`, MCP, peripheral (S0 nếu untrusted plugin)
- **#11333** 🆕 - Skill review tools không thấy skills từ `skill_bundles`
- **#11332** 🆕 - Skill review/creation không chạy cho webhook/gateway/channel turns

**PRs đang fix:**
- **#10480** - Recover từ rejected image requests (retrying without novel images)
- **#10938** - Tool attachments explicit declaration (không scan text tìm image markers)
- **#10935** - StreamTextGuard bỏ reply khi prose quote tool-result object
- **#11330** - Fence `session/configure` trên authorized incarnation

### Infrastructure

- **#11214** - Heartbeat deduplicate alerts, honor live notification policy
- **#11340**, **#11314** - Gate mpsc imports đúng targets (Windows/Linux test)

---

## 🎁 Tính năng mới

### ZeroCode UI
- **#11342** - Toggle plugin channel instances trong plugins sub-tab

### Context estimation
- **#9453** - Estimate context usage khi provider không trả token counts (llama.cpp, Ollama local)

### Desktop
- **#11281** - Quit chỉ stop processes do app instance này launch (không kill shared daemon)

---

## 📚 Documentation

- **#11284** (merged) - Sửa stale plugin name-conflict guidance
- **#11329** - Document Discord plugin + acceptance run

---

## 👥 Điểm nổi bật cộng đồng

### Contributors
- **@IftekharUddin** - 11 PRs (nhiều nhất), focus security + testing
- **@JordanTheJet** - 8 PRs, lead gateway separation
- **@Audacity88** - 6 PRs, runtime core + CI
- **@bellorr** - 2 bug reports về skill system
- **@atorenherrinton** - 1 PR heartbeat fix

### Hot threads
- #7432 - Tracker v0.9.0 có 5 comments, nhiều linked PRs
- Plugin security issues (#11327, #11336) severity S0/S2 - cộng đồng sẽ quan tâm

---

## 🗺️ Backlog & Roadmap

### v0.9.0 commitments
**Đang track trong #7432:**
- ✅ Gateway health/TUI/history qua core (#11280)
- ✅ Credential-bound connections (#11277)
- 🔄 Sessions REST qua core (#11331)
- 🔄 Plugin webhooks to daemon (#11339)
- 🔄 Route coverage classification (#11334)
- 📋 Endpoint verification (#11274 merged vào #11315)

### Pending decisions
- J2, J9, J10, J15 cho gateway binary (#11315)
- J6a cho desktop quit behavior (#11281)

### Follow-ups flagged
- #11323, #11324, #11325 - CLI authorization security
- #11003 - Plugin webhook IPC (blocked, chờ #8850 vendor migrations)

---

## 💡 Insights

**Architecture shift rõ ràng**: Gateway đang được tách hoàn toàn khỏi runtime core qua RPC boundary. Đây là refactor lớn nhất của Q4 2026.

**Security tightening**: Nhiều PRs fix authorization checks, credential binding. Plugin isolation vẫn có gaps (#11327 severity S0).

**Testing maturity**: CI/CD đang được harden với real acceptance tests, platform-specific fixes. Flaky tests đang được săn đuổi tích cực.

**Community health**: Velocity cao (50 PRs/ngày), contributors phân bổ tốt. Bug reports từ users (@bellorr) về skill system cho thấy feature này đang được dùng thực tế.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-10-01

## 1. 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào cải thiện Web UI với 3 PR mới (session sidebar đa kênh, error visibility, working indicator) và 1 bugfix về shell command execution được merge. Tổng 6 PRs active, 2 PRs đóng.

## 2. 🚀 Releases

Không có.

## 3. 📈 Tiến độ dự án

**PRs được merge (2026-09-30):**
- **#3313** - Fix `customAllowPatterns` không hoạt động. Default deny patterns luôn chiếm ưu tiên khiến command như `git push` bị chặn dù đã thêm vào allowlist.

**PRs đang active:**

**Web UI modernization** (3 PRs từ @racso2609):
- **#3413** - Global multi-channel session sidebar. Backend phát hiện sessions từ mọi channel (không chỉ `pico`), phân loại theo channel type. Phần 2-A của roadmap #3406.
- **#3411** - State-driven working indicator thay thế 4 canned phrases quay vòng. Hook vào pipeline state thực tế thay vì giả lập "thinking". Phần 1 của #3406.
- **#3412** - Hiển thị lỗi khi turn thất bại. Hiện tại error bị nuốt ở 3 chỗ: `message` tool suppress, Web poll không forward, Go channel không gửi lên. Fix cả 3.

**Infrastructure cleanup:**
- **#3222** - DeltaChat refactor -200 LOC. Xóa legacy features, tài liệu relay list official thay vì hardcoded, secrets vào jsonrpc.
- **#1349** - QQ Channel hỗ trợ emoji, voice, image, video, file (parse + reply). Ưu tiên Markdown, fallback plain text.

**Xu hướng:** Focus vào polish Web UI (visibility, session management, UX). Infrastructure cleanup song song.

## 4. 💬 Điểm nổi bật cộng đồng

Không có PR/issue nào có tương tác cao (👍: 0 cho tất cả). Hoạt động vẫn ở maintainer-driven.

## 5. 🐛 Ổn định & Bugs

**Fixed:**
- #3313 - Shell command execution bị chặn sai do precedence bug.

**In-progress:**
- #3412 - Failed turns không hiển thị error cho user (silent failure).

## 6. ✨ Yêu cầu tính năng

**#3413** - Multi-channel session management (backend + UI).
**#1349** - QQ Channel rich media support (voice, video, file).

## 7. 👥 Phản hồi người dùng

Không có issue mới 24h qua. Feedback gián tiếp qua bug report #3313 (user không thể dùng `git push` như expected).

## 8. 🗺️ Backlog & Roadmap

**Roadmap visible qua #3406** (referenced bởi #3413, #3411):
- ✅ Part 1: State-driven working indicator (#3411)
- 🔄 Part 2-A: Global session sidebar (#3413)
- ⏳ Part 2-B: Session management features (chưa có PR)

Infrastructure cleanup tiếp tục (DeltaChat #3222, QQ #1349 chưa merge).

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw – 2026-10-01

## 🔍 Tóm tắt hôm nay

NanoClaw tập trung vào **hardening update flow** và **mở rộng provider ecosystem**. Core team fix 3 bug nghiêm trọng trong `/update-nanoclaw` (rollback service stop, cutover liveness check). Parallel track đang đưa **GitHub Copilot** vào skill ecosystem thông qua credential gateway và build **Iron gateway** cho local keyless model trên HTTP. Cộng đồng đóng góp fix Telegram routing (forum topics thành threads) và proxy authentication.

---

## 📦 Releases

Không có release mới. Version hiện tại: **v2.4.0** (143db6c9).

---

## 🚀 Tiến độ dự án

### Core infrastructure (6 PRs)

**Update system fixes** (3 PRs merged/open):
- #3962 [MERGED]: cutover từ chối khi service liveness probe fail → ngăn `complete` false positive
- #3956 [OPEN]: rollback stop đúng nohup host process + drain agent containers trước khi replace `data/`
- #3974 [MERGED]: refresh agent-runner lockfile → clear transitive advisories (hono, @hono/node-server cũ trong MCP SDK)

**Provider extensibility**:
- #3975 [OPEN]: 5 extension callbacks (pre-poll, post-ack, pre-archive, container-init, host-mount) → provider attach vào điểm skill không tới được
- #3964 [OPEN]: provider declare `host:port` model endpoints → auto-approve thay vì approval card mỗi lần gọi local model
- #3966 [OPEN]: Iron gateway cho phép keyless model trên `http://host.docker.internal:<port>/v1` → chỉ exposed port provider config, chỉ OpenAI inference routes

### Skills ecosystem (4 PRs)

- #3976 [OPEN]: `/add-copilot` provider skill → GitHub Copilot SDK runtime, device-login token trong credential gateway (không pass qua env/container state)
- #3928 [OPEN]: `/contribute-upstream` operational skill → fork contribute features về upstream qua seams/skills thay vì edit trực tiếp
- #3965 [OPEN]: OpenCode/Iron setup check model URL với selected gateway at prompt → catch fail sớm thay vì save URL chết mỗi turn
- #3969 [OPEN]: Iron Proxy send Basic challenge với 407 → git (libcurl) gửi proxy credentials

### Platform adapters (4 PRs)

Telegram fixes (contributor @antonio-antuan):
- #3971 [OPEN]: forum topics route thành threads → mỗi topic riêng session, replies về đúng topic
- #3972 [OPEN]: drop service messages (hide/unhide topic, pins, member joins) thay vì forward rỗng
- #3973 [OPEN]: parse fail MarkdownV2 → resend plain text thay vì drop
- #3970 [OPEN]: strip agent-group suffix từ reaction/edit target ids → dùng platform message id thay vì session row id

### Infrastructure hardening

- #3901 [OPEN]: host service reach internet qua HTTPS proxy → corporate network support

---

## ⭐ Điểm nổi bật cộng đồng

**Zero engagement issue #3961** (0 comments, 0 reactions): `/update-nanoclaw` report `complete` khi systemctl --user không reach được bus → service không restart. Core team fix trong #3962 (liveness probe check) và #3956 (rollback stop logic). User @glifocat self-report + self-fix → internal dogfooding process.

**Telegram adapter batch** (4 PRs từ @antonio-antuan): production pain points từ forum/group deployment. Clean focused fixes, không có discussion → experienced contributor biết workflow.

**GitHub Copilot PR #3976** (@barnuri): zero comments/reactions nhưng design pattern quan trọng → credential gateway thay vì environment passing. Template cho future auth-heavy providers.

---

## 🐛 Ổn định & Bugs

### Critical fixes (merged)

1. **Update cutover false positive** (#3961 → #3962): `detectService` đọc non-zero exit code = active → stop khi probe chính nó fail
2. **Transitive CVE in agent-runner** (#3974): hono 4.12.14, @hono/node-server 1.13.7 trong MCP SDK lockfile → refresh trong existing ranges

### In-flight fixes

1. **Rollback không stop service** (#3956): `savedService` lưu old PID trước cutover stop old host → rollback kill wrong process
2. **Telegram entity parse fails** (#3973): MarkdownV2 link tới private IP → Telegram reject cả message, retry 3 lần cùng payload
3. **Proxy git authentication** (#3969): 407 không có `Proxy-Authenticate` challenge → libcurl không gửi credentials

### Risk areas

- Update system có 2 critical bugs trong 1 tuần (cutover, rollback) → integration test coverage gap
- Agent-runner transitive dependencies → vendor lockfile hoặc strict pinning policy

---

## ✨ Yêu cầu tính năng

### Provider ecosystem expansion

1. **GitHub Copilot provider** (#3976): device-login auth flow, credential gateway integration → pattern cho auth-heavy providers
2. **Extension callbacks** (#3975): 5 hooks (poll, ack, archive, container-init, host-mount) → provider lifecycle control không qua skill layer
3. **Host:port model endpoints** (#3964): local model auto-approval → self-hosted LLM deployment không bị approval spam
4. **Iron HTTP gateway** (#3966): keyless model trên `http://host.docker.internal` → dev/staging workflow không cần cert

### Operational workflows

1. **Fork contribution skill** (#3928): `/contribute-upstream` guide features về upstream qua seams → fork maintenance strategy
2. **HTTPS proxy support** (#3901): corporate network deployment blocker

### Platform maturity

1. **Telegram threads** (#3971): forum topics isolation
2. **Telegram error resilience** (#3972, #3973): service message filtering, parse fallback

---

## 💬 Phản hồi người dùng

**Silent deployment pain**: majority PRs có 0 comments/reactions. Either internal dogfooding (core team self-fix #3961) hoặc experienced contributors biết workflow (Telegram batch từ @antonio-antuan).

**No feature requests trong issues**: mọi features từ PRs. Community contribution flow: implement first, discuss in code review.

**Quality bar**: mọi PRs follow template, có `<!-- nanoclaw-pr-template:v2 -->`. Convention-commit titles, problem statement, solution approach. Core team label nhanh (follows-guidelines trong 24h).

---

## 📋 Backlog & Roadmap

### Near-term (từ PR patterns)

1. **Update system stability**: 2 critical bugs fixed this week → likely thêm integration tests
2. **Provider credential handling**: Copilot PR (#3976) set pattern → apply cho other auth providers
3. **Telegram adapter maturity**: 4 PRs in-flight → chuẩn bị production-ready forum/group support

### Medium-term (từ extension APIs)

1. **Provider lifecycle hooks** (#3975): 5 callbacks exposed → next-gen providers tích hợp sâu hơn (custom polling, container orchestration)
2. **Local model support** (#3964, #3966): Iron gateway + endpoint declarations → self-hosted LLM first-class citizens

### Long-term hints

1. **Fork ecosystem** (#3928): `/contribute-upstream` skill → recognize fork deployment scale, build two-way sync tooling
2. **Enterprise deployment** (#3901): proxy support → corporate network requirements lên roadmap

### Silent gaps

- No public issues về feature requests → roadmap driven internally hoặc qua direct channels
- No milestone references trong PRs → release cadence unclear
- High PR velocity (15 open) nhưng low engagement → small core team, few external reviewers

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo phân tích NullClaw - 2026-10-01

## 📊 Tóm tắt hôm nay

Hoạt động thấp. Một PR duy nhất thêm Cheaper Inference provider. Không có issue, release, hay tương tác cộng đồng. Dự án trong trạng thái yên tĩnh.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**PR #1016** - Thêm Cheaper Inference gateway
- Tác giả: @aiapienthusiast
- Pattern giống #990 (Eden AI)
- Cheaper Inference = OpenAI-compatible LLM gateway, một API key truy cập nhiều model lab
- Chưa có review, merge, hay bình luận
- 0 reaction

**Xu hướng**: Mở rộng hệ sinh thái provider, tập trung gateway đa-model với OpenAI compatibility.

## 💬 Điểm nổi bật cộng đồng

Không có. PR chưa nhận phản hồi nào.

## 🐛 Ổn định & Bugs

Không phát hiện bug report trong 24h qua.

## ✨ Yêu cầu tính năng

Không có feature request mới. PR #1016 là tính năng mở rộng provider nhưng không phải từ đề xuất công khai.

## 💭 Phản hồi người dùng

Không có phản hồi trong khoảng thời gian này.

## 🗺️ Backlog & Roadmap

Không có thông tin roadmap mới. Dựa vào pattern PR gần đây (#990, #1016), chiến lược rõ ràng: **tích hợp thêm gateway/provider OpenAI-compatible**.

---

**Tình trạng dự án**: Ngày yên tĩnh. Chờ review/merge PR provider mới.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-01

## 1. Tóm tắt hôm nay

Ngày yên tĩnh. Không có issues, releases hoặc PR mới. Chỉ có PR #7988 (mở từ 2026-08-29) vẫn đang chờ review - PR tự động refresh knowledge graph từ CI bot.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR #7988** - Codebase knowledge graph refresh:
- Bot tự động tạo từ nightly workflow
- Loại: CI/Infrastructure, size XS, risk thấp
- Mục đích: refresh snapshot bootstrap từ default branch
- Không có activity trong 24h qua (cập nhật cuối 2026-09-30)
- Chờ review và merge thủ công

Xu hướng: Dự án có quy trình tự động maintain knowledge graph, nhưng PR đang pending kéo dài (hơn 1 tháng).

## 4. Điểm nổi bật cộng đồng

Không có tương tác trong 24h qua. PR #7988 có 0 reactions, không có comment.

## 5. Ổn định & Bugs

Không có bug report hoặc fix trong ngày.

## 6. Yêu cầu tính năng

Không có feature request mới.

## 7. Phản hồi người dùng

Không có feedback trong 24h qua.

## 8. Backlog & Roadmap

Từ PR đang pending:
- Dự án maintain automated codebase knowledge graph
- Có CI workflow chạy nightly để refresh graph
- Chưa rõ roadmap dài hạn

**Insight**: Hoạt động repo rất thấp trong ngày phân tích. PR automation cho knowledge graph menunjukkan dự án có infrastructure cho AI agent analysis, nhưng việc PR pending lâu cho thấy có thể thiếu maintainer bandwidth hoặc chờ timing merge phù hợp.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw — 2026-10-01

## 🎯 Tóm tắt hôm nay

Ra beta.4 (v2.2.2-beta.4). Cộng đồng submit 8 bug + 2 feature request. Đội core đóng 3 bug, merge 0, mở 6 PR fix. Tập trung: session stability, transcription config, cache accounting.

---

## 🚀 Releases

**v2.2.2-beta.4** (2026-09-30)
- Reranker UI config panel cho ReMe memory
- Split chat dependencies + lazy-load locales → boot nhanh hơn
- Session project directory picker cải thiện
- Checkpoint: đợi community verify 4h (deadline 12:36 UTC hôm nay)

---

## 📊 Tiến độ dự án

### PR merged vào beta.4
- Perf: console lazy-load (#7829) — giảm bundle size
- Fix: session directory picker (#7xxx) — UX cải thiện

### PR chờ review (6 active today)
1. **#8063** — wake parent session khi background task xong (first-time contributor)
2. **#8062** — embedding: per-item fallback khi 1 chunk vượt limit (partial fix #8040)
3. **#8061** — custom gateway declare OpenAI cache params (fix #8058)
4. **#8060** — count Anthropic cache tokens đúng (fix #8057)
5. **#8055** — offload skill pool download → tránh block event loop 30s+ với skill lớn
6. **#8052** — transcription model configurable (fix #8035)

### PR đóng hôm nay
- #8049 → superseded by #8050 (DST timezone fix)
- #8056 → merged? (config write error message)
- #8041 → merged? (E2E session cleanup)

### Xu hướng
- **Session lifecycle**: 3 PR fix race conditions + state loss (#8063, #8007, #7011)
- **Token accounting**: 2 PR sửa under-report cache usage (#8060, #8057)
- **Config surface**: 2 PR expose hidden settings (transcription model, cache params)
- **Robustness**: embedding batch fallback, skill download offload, E2E hardening

---

## 🔥 Điểm nổi bật cộng đồng

### Bug nhiều impact
1. **#8022** (4 💬) — `send_file_to_user` với file content → pollution context → 400 liên tục (chưa fix)
2. **#8042** (2 💬) — tool output PDF auto-feed vào model không hỗ trợ → Internal error (chưa fix)
3. **#8064** (1 💬) — DeepSeek + PDF → session break vĩnh viễn (mới mở hôm nay)
4. **#8040** (2 💬) — embedding reindex: 1 CJK chunk quá limit → drop cả batch (#8062 fix một nửa)

### Feature request
- **#7997** — message edit/retract + workspace rollback (2 💬, community muốn)
- **#7945** — filter @all/@ALL trong IM bot (2 💬, spam prevention)

### Security
- **#7672** — Windows sandbox escape research (cộng đồng audit)
- **#7443** — dangerous instruction evasion dễ (6 💬, closed nhưng chưa rõ fix)

---

## 🐛 Ổn định & Bugs

### Critical (block workflow)
- **#8064** DeepSeek + PDF → session chết vĩnh viễn (400 `file must have file_id`)
- **#8022** `send_file_to_user` pollution → cascade 400 (chưa có PR)
- **#8042** tool PDF output auto-fed → crash khi model không hỗ trợ

### High (data loss / wrong results)
- **#8040** embedding batch drop toàn bộ khi 1 item over-limit → "20 chunks failed" (#8062 giảm thiểu)
- **#8059** background task: record 404 sau khi complete + response rỗng
- **#8046** DST: timestamp shift theo UTC offset freeze (#8050 đang fix)

### Medium (config / UX)
- **#8058** custom gateway reject `prompt_cache_key` → không dùng cache (#8061 fix)
- **#8057** Anthropic cache tokens không đếm → context meter sai (#8060 fix)
- **#8035** transcription model không config được (#8052 fix)
- **#8013** skill pool download 80MB → 30s timeout (UI abort, backend chạy tiếp) (#8055 fix)

### Backlog (< 10 bình luận, chưa assign)
- #8002 Windows auto + sandbox off → inline COM kill user PowerPoint
- #7604 LLM stream timeout 30s hardcode
- #7011 Console stop cancel Feishu session khác

---

## 💡 Yêu cầu tính năng

1. **#7997** (2 💬) — message edit + workspace rollback
   - Use case: sửa prompt sai, rollback file thay vì tạo session mới
   - Cần: snapshot management + truncate history API

2. **#7945** (2 💬) — IM bot filter @all
   - Use case: group notification spam → agent trả lời không cần thiết
   - Đơn giản: skip message có @all/@ALL mention

3. **#7569** (PR mở, chưa merge) — Advisor Mode
   - 2-model collab: strong advisor + cheap worker
   - Opening plan + review checkpoints
   - Size XXXL → chưa ready production

4. **#4580** — `extraSystemPrompt` per-request injection (giống OpenClaw)
   - Use case: API key, business context per turn
   - PR đang Under Review

---

## 💬 Phản hồi người dùng

### Pain points
- **Session stability**: 4 issue về session loss/pollution/cancel (#8022, #8064, #8059, #7011)
- **Config visibility**: nhiều setting ẩn (transcription model, cache params, timeout)
- **Large operation timeout**: skill download 80MB → UI 30s timeout nhưng backend chạy tiếp
- **Error clarity**: nhiều 400/500 không rõ root cause (cần better error message)

### Positive signals
- First-time contributor (#8063) — community bắt đầu contribute fix
- Security audit (#7672) — community chủ động test sandbox

### Support load
- 19 issue open/update hôm nay
- 41 PR active (30 hiển thị theo comment count)
- 8 bug report mới trong 2 ngày

---

## 📋 Backlog & Roadmap

### Cần merge nhanh (ready)
- #8060, #8061, #8062 — cache/embedding fixes (đã có PR, chờ review)
- #8052 — transcription config (fix user blocker)
- #8055 — skill download offload (fix timeout)

### Cần research/design
- #8022, #8042, #8064 — file content handling strategy (3 related bugs)
- #8040 — embedding per-item token limit (cần upstream coordination)
- #8059 — background task lifecycle (task tracker rewrite?)

### Long-term (> 1 sprint)
- #7569 Advisor Mode (XXXL, architecture change)
- #7997 message edit + rollback (cần snapshot system)
- #5861 macOS PATH resolution (Under Review 3 tháng)

### Phụ thuộc upstream
- #4224 ReMe index refresh (chờ reme-ai 0.3.1.9)

### Bỏ qua / won't fix?
- #7443 instruction evasion (closed, chưa rõ resolution)
- #8002 Windows COM issue (governance choice: sandbox on by default)

---

**Trend**: Nhiều edge case surface khi user scale up (large skills, long sessions, multi-agent). Team đang fix reactive. Cần: batch testing large corpus, chaos testing session lifecycle.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*