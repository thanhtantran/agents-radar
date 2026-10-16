# Bản tin Hệ sinh thái Hermes Agent 2026-10-16

> Issues: 118 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-16 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-16

## 📊 Tóm tắt hôm nay

Release v0.22.2 sửa lỗi nghiêm trọng từ v0.22.1 (shipped wrong commit, gateway không start sau reboot). Tập trung xử lý bugs từ unified gateway merge (#106742) - 70+ tracking issues. Cộng đồng báo session state mất đồng bộ, credential routing sai, platform-specific crashes.

---

## 🚀 Releases

### v0.22.2 (2026-10-15)
- **Hotfix cho v0.22.1**: shipped sai commit, gateway chết sau reboot
- **Gateway reboot fix**: Linux PID reuse sau reboot wedge supervised gateway - fixed với `START_TIME_DRIFT_LIMIT_SECONDS`
- **Known issue**: Sessions từ 0.22.1 gateway không xóa được ở 0.22.2
- **Microsoft Store**: fix app "Connecting..." loop

---

## 🔧 Tiến độ dự án

### Unified Gateway (#106742) - Post-merge cleanup
**70 comments tracking issue** (#134889) - gateway runtime merge xong Oct 14, giờ đang dọn packages:

#### Package 1: Classic CLI (#139158)
- CLI session switching, resume, credential inheritance
- 16 findings

#### Package 2: Session creation (#139160) 
- Model picks, provider override, credential routing
- 17 findings
- **Bug nghiêm trọng**: `session.create` với `provider` override giữ stale `base_url` → 401 (#138843)

#### Package 3: TUI/Desktop (#139161)
- Live events, commands, viewer sessions
- 19 findings
- **TUI session close fail**: canonical gateway báo "already closed", không close được (#139536)

#### Package 4: Bot platforms + Cron (#139162)
- Messaging admission, cron workers, Kanban
- 10 findings
- **Discord async delegate**: child hoàn thành nhưng parent không nhận kết quả (#139135)

### PRs hot

**#139545**: TUI `/model` picker với `--reasoning` bị reject - không carry effort qua canonical switch

**#139488**: Discord thread metadata drift → background delegate completion không admit

**#139489**: Azure Foundry gpt-6 forced sang Responses API (chat/completions 400 với function tools)

**#139535**: Clear npm audit - 0 vulnerabilities across root, web, ui-tui, desktop, bootstrap-installer

---

## 🔥 Điểm nổi bật cộng đồng

### Issue nhiều bình luận nhất

**#134889** (70 comments): Unified gateway tracking - every local session owned bởi one gateway, cleanup ongoing

**#136567** (25 comments): Telegram forum DM - message đầu topic mới deliver không có thread_id → lobby recovery misroute

**#62336** (12 comments): **Security** - Terminal snapshots capture credentials (`export -p` ghi secret env vars ra disk)

### User pain points

1. **Session state sync**: Desktop model menu, composer pill, session binding ra khỏi sync (#68876)
2. **Windows issues**: Gateway spawn invisible khi update (#123490), plugin install crash khi dir chưa tồn tại (#139533)
3. **Credential routing**: Pool refresh tất cả thay vì credential được select (#136964)

---

## 🐛 Ổn định & Bugs

### P0-P1 Critical

**#139434** (P0): Cron prompt-cache scope key off legacy `cron_<job>_<timestamp>` session ID thay vì stable job scope

**#135487** (P1): Cron worker die trên `database is locked`, occurrence bị mất

### Platform-specific

**Windows**:
- Update relaunch gateway invisible (#123490)
- Bundle prep crash trên readonly .pyc (#137722 - fixed)
- Decimal locale breaks update hand-off (#135183)

**macOS**: 
- Gateway LaunchAgent hiện như `osascript` thay vì "Hermes" trong Privacy & Security (#123118)
- Cron owner fingerprint drift (#138221 - fixed)

**Linux**:
- Browser socket path vượt 103-byte cap trên long home paths (#122786)

### Auth & Security

- Terminal env snapshots leak credentials (#62336)
- OpenRouter response_cache enabled mặc định → stale tool call replay (#70387)
- PyJWT 2.13.0, httpx2 2.7.0, urllib3 2.7.0, oauthlib 3.3.1 có open advisories (#134394)

### Messaging platforms

**Telegram**: Forum topic đầu tiên không có `message_thread_id` (#136567)

**QQBot**: C2C drop response sau long silent CoT, retry permanent quota errors (#99144)

**Discord**: 
- Background process notifications fail delivery, infinite retry loop (#138940 - fixed)
- Multiplexed secondary bot không nhận voice-channel note (#139345)

**WeCom**: iLink media send rate-limit swallowed (#79851)

---

## 💡 Yêu cầu tính năng

### Đang thảo luận

**#28024** (7 comments): Whitelist `config_set` tool - agent tự config benign settings (stt.enabled, tts.provider, display.skin)

**#58975** (4 comments): `discover_skills` tool - three-layer skill search cho explicit queries (catalog → `skills/` → `.archive/`)

**#107937** (3 comments): Per-task provider/model pinning trên `delegate_task` - spread workers across providers cho rate limits

**#90435** (3 comments): Unify Desktop Preview và Browser thành Workspace Viewer

### PR features

**#139537**: `/reasoning` switch mid-session preserve prompt cache (OpenAI Responses, Codex, Claude) - salvage #129233

**#91974**: Context-window budget hint injection - advisory line khi gần full

**#139024**: Plugin catalog: `devkit` - per-session Scratchpad cho agent drafts

**#139267**: Plugin catalog: `bot-cabinet` - Hermes Desktop Cabinet edition

---

## 📢 Phản hồi người dùng

### Confusion points

**#135217** (5 comments): v0.22.6 vẫn show release date của v0.21.5 (2026.9.24) trong `--version` → users nghĩ outdated

**#139514** (duplicate): `__release_date__` frozen "2026.9.24"

**#89199**: `hermes config` log spurious warning cho `${env:VAR}` present trong `.env`

### Installation/Update pain

**#137646** (8 comments): `hermes update` refuse stable channel khi release commit không local - 10s ancestry probe timeout

**#139091**: Stable update timeout ngay cả khi commits local (partial clone, commit-graph writes disabled)

### Usability gaps

**#113094**: `browser_vault_enter_code` miss split OTP widgets không có maxlength/autocomplete

**#68876**: Desktop provider/model switch ra khỏi sync giữa menu, pill, session binding

**#138261**: Model named trong `model.default` bị reject bởi validator - `_config_declares_model()` không consult `model.default`

---

## 📋 Backlog & Roadmap

### Immediate (tracking #134889)

1. **Package 1-4 cleanup**: 62 open findings từ gateway merge
2. **Session state consistency**: model routing, admission lifecycle
3. **Credential routing**: pool select, OAuth refresh timing
4. **Platform stability**: Windows, macOS, Linux edge cases

### Security backlog

- Terminal env snapshot credential leak (#62336)
- Dependency advisories: PyJWT, httpx2, urllib3, oauthlib (#134394)
- Dashboard mutations 409 với live gateway (#138915)

### Feature pipeline

- Whitelisted config_set tool (#28024)
- Cross-provider delegate_task pinning (#107937)
- skill discovery tool (#58975)
- Workspace Viewer unification (#90435)

### Quality of life

- Release date display fix (#135217, #139514)
- Config ref spurious warnings (#89199)
- Update channel resolution robustness (#137646, #139091)

---

## So sánh hệ sinh thái chéo

# Báo cáo so sánh hệ sinh thái AI Agent - 2026-10-16

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang chuyển từ proof-of-concept sang production-hardening. 8 dự án active, 2 pattern chính:

**Infrastructure-first** (Hermes, OpenClaw, Zeroclaw): xây platform chạy agents, tập trung runtime, multi-channel, plugin system.

**Model-first** (IronClaw, QwenPaw): benchmark + hosted runtime, model quality quyết định product.

**Niche** (NanoBot, PicoClaw, NanoClaw, NullClaw): specialized use cases, fork infrastructure chính.

Gateway/runtime consolidation đang diễn ra ở 3 dự án lớn. SQLite operational DB là consensus choice, PostgreSQL support xuất hiện cho multi-instance. Web UI migration: Lit → Solid (OpenClaw), tập trung reactive frameworks.

---

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Top pain point |
|-------|--------|-----|----------|---------------|----------------|
| **Hermes Agent** | 118 | 500 | 1 | v0.22.2 hotfix, 70-issue gateway cleanup | Session state sync, credential routing |
| **OpenClaw** | 215 | 500 | 5 | 30 PR opened, PostgreSQL + Solid wave | SQLite WAL bloat (128 comments) |
| **Zeroclaw** | 6 | 50 | 0 | Security patches, plugin v0.8.6 prep | Plugin reliability, locale support |
| **NanoBot** | 2 | 44 | 0 | 13 PR closed, perf + security fixes | Stale chưa được merge |
| **PicoClaw** | 4 | 22 | 0 | 9 stale closed, cron/auth fixes | Maintenance slowdown, fork xuất hiện |
| **NanoClaw** | 2 | 50 | 0 | OneCLI 1.45 migration, observability | OneCLI deprecation |
| **NullClaw** | 1 | 9 | 0 | 9 PRs từ 1 contributor, no feedback | Contributor momentum, no review |
| **IronClaw** | 1 | 0 | 0 | Daily taxonomy report only | Model quality (DeepSeek-V4) |
| **QwenPaw** | 27 | 24 | 1 | v2.2.2 stable, 6 themes + terminal | ACP plugin load, cron cancel silent |

---

## 3. Vị thế Hermes Agent

**Position**: Tier-1 infrastructure player, cùng OpenClaw.

**Strengths**:
- Unified gateway architecture shipped (Oct 14), đang cleanup 70 findings
- Multi-platform stable (Windows/macOS/Linux), fix critical reboot + credential issues
- Desktop + CLI + TUI + bot platforms coverage đầy đủ
- Security-conscious: tracking 62k issue terminal credential leak, dependency advisories

**Weaknesses**:
- Session state consistency chưa resolve: model menu/composer pill/binding out of sync
- Provider routing bugs: stale base_url khi override provider
- Platform-specific edge cases vẫn nhiều (Windows gateway spawn, macOS Privacy label, Linux socket path cap)

**Community health**: 70-comment tracking issue show engaged maintainers, active triage. Taxonomy releases + gateway merge signal production maturity.

**Versus OpenClaw**: Hermes có cleaner post-merge state (70 findings vs OpenClaw's 215 open issues). OpenClaw aggressive feature pace (30 PRs/day), Hermes focus stability.

**Versus others**: Hermes + OpenClaw là only projects shipping monthly stable releases. Zeroclaw chưa có release (development phase), rest đều slower cadence.

---

## 4. Hướng kỹ thuật chung

### Runtime architecture
- **Gateway consolidation**: Hermes (#106742), OpenClaw session ownership, Zeroclaw phase-3 separation → pattern = canonical gateway owns local sessions
- **SQLite operational storage**: 7/8 dự án dùng SQLite cho agent DB, config, state. PostgreSQL support experimental (OpenClaw #173625, NanoClaw OneCLI grants)

### Messaging platforms
- **Discord/Telegram/Slack**: universal coverage
- **Đặc thù platform**: Telegram forum threads, Discord async delegate, QQ C2C channels, Feishu identity recovery — integration depth tăng

### Plugin systems
- **WASM isolation**: Zeroclaw plugin host (#11347), OpenClaw subprocess isolation (#8187)
- **Hot reload**: QwenPaw rollback-safe reload (#7565)
- **Artifact distribution**: Zeroclaw ship WASM in release, NanoBot capture 1.4GB rewrites

### Security baseline
- **RustSec/Dependabot**: Zeroclaw patch Wasmtime 14 advisories, NanoClaw clear 11 dev-only alerts
- **Credential handling**: Hermes terminal snapshot leak (#62336), NanoClaw OneCLI grants model
- **Shell safety**: NanoBot escape filtering, PicoClaw workspace restriction

### Web UI evolution
- **Framework migration**: OpenClaw Lit → Solid (wave 6), QwenPaw stable Solid usage
- **Streaming UX**: NullClaw Slack/Telegram drafts, QwenPaw terminal multi-tab, OpenClaw recall/worktree

---

## 5. Điểm khác biệt

### Chiến lược

**Hermes**: Production-first. Gateway merge xong, giờ dọn debt. Release v0.22.2 ship wrong commit → hotfix trong 24h. Conservative, stability over features.

**OpenClaw**: Velocity-first. 30 PRs/day, 215 open issues, aggressive PostgreSQL + Solid migration. Accept tech debt for speed.

**Zeroclaw**: Security-first. 14 Wasmtime advisories patched trước v0.8.6 release gate. WASM plugin isolation, Rustls updates. Development stage, no releases yet.

**QwenPaw**: UX-first. v2.2.2 ship 6 themes, terminal in Chat, voice realtime. Desktop competing với WorkBuddy startup time.

### Tính năng đặc trưng

**Hermes**: 
- Multiplatform Desktop (Windows Store fix, macOS LaunchAgent)
- Classic CLI session switching
- Reasoning mode với prompt cache salvage

**OpenClaw**:
- PostgreSQL native search (tsvector, pg_trgm, pgvector)
- Compiled macOS runtime (Bun → native)
- LTS extended-stable branch (v2026.9.33)

**Zeroclaw**:
- WASM plugin host
- 11 built-in tools với full settings
- Shell execution limits tách riêng (wait/idle/runtime)

**QwenPaw**:
- Intelligent UI framework (OpenUI inline render)
- JSON-driven evaluation index
- Agent-to-agent structured questions (#8259)

### Cộng đồng

**Hermes**: Maintainer-driven, 70-comment tracking issue. Contributors báo bugs chi tiết (logs, repros). Response time: hours to days.

**OpenClaw**: High community contribution, 128-comment WAL issue. Pain points được voice nhưng chưa có fix PR. Dependabot spam nhiều (plugin capture 1.4GB writes).

**Zeroclaw**: Distinguished contributors (IftekharUddin, JordanTheJet). PRs stacked, blockers documented. Locale issues từ non-English users.

**NullClaw**: Single-contributor burst (9 PRs, 2 days), zero feedback. Risk: contributor frustration.

**PicoClaw**: Fork xuất hiện (#3417 `afjcjsbx/picoclaw`) vì "unmaintained". Stale PRs tích lũy, maintenance slowdown.

---

## 6. Mức độ trưởng thành cộng đồng

### Tier 1: Production-ready
**Hermes, OpenClaw, QwenPaw**
- Monthly stable releases
- Multi-platform support
- Issue triage + label system (P0/P1, source-repro, fix-shape-clear)
- Security review process visible
- LTS branches (OpenClaw v2026.9.33)

### Tier 2: Active development
**Zeroclaw, NanoClaw**
- No releases yet but structured roadmap
- Security patches active
- Migration gates (Zeroclaw v0.8.6, NanoClaw OneCLI 1.45)
- Observability investment (NanoClaw session logs, turn traces)

### Tier 3: Specialized/niche
**NanoBot, PicoClaw, NullClaw**
- Small contributor base (1-3 người)
- Fork hoặc specialized use case
- Maintenance risk: NullClaw no review, PicoClaw fork signal

### Tier 4: Benchmarking infrastructure
**IronClaw**
- Internal tool, no public community
- Daily taxonomy reports, model evaluation focus

---

## 7. Tín hiệu xu hướng

### Q4 2026 → Q1 2027

**1. Multi-gateway coordination**
OpenClaw PostgreSQL GA + Hermes credential routing fixes → shared state backends. Expect distributed agent fleets.

**2. WASM plugin standard**
Zeroclaw ship WASM host, OpenClaw subprocess isolation → convergence on sandboxed plugin execution. Security + hot-reload baseline.

**3. Observability consolidation**
NanoClaw observability stack (session logs, error reports, turn traces) không cần external backend → pattern = local-first telemetry, SQLite traces.

**4. Reasoning mode maturity**
Hermes reasoning cache salvage, QwenPaw `/think` levels, NullClaw IFM K2 compatibility → reasoning-capable models mainstream, cần config flexibility.

**5. SQLite WAL crisis resolution**
OpenClaw 128-comment issue chưa có fix PR. Nếu không resolve Q4, expect migration pressure sang PostgreSQL hoặc alternative (libSQL, DuckDB).

**6. Platform-specific polish**
Hermes Windows/macOS/Linux edge cases, Zeroclaw locale support → maturity = handle regional settings, timezone, filesystem quirks.

**7. Community fork dynamics**
PicoClaw fork xuất hiện, NullClaw contributor no-feedback → maintenance transparency quan trọng. Projects không respond risk ecosystem fragmentation.

**8. Voice/realtime shift**
QwenPaw voice chat, Gemini realtime voice broker → speech-to-speech agents xuất hiện. Text-first architectures cần adapt.

**9. Provider-agnostic tooling**
NullClaw explicit provider routing, OpenCode multiple providers onboarding → lock-in giảm, multi-provider fleets tăng.

**10. Desktop experience competition**
QwenPaw Desktop vs WorkBuddy startup time, Hermes Desktop Microsoft Store → consumer-facing AI agent products xuất hiện, UX stakes cao.

---

## Kết luận

Hệ sinh thái đang consolidate: Hermes + OpenClaw dẫn đầu production maturity, Zeroclaw focus security, QwenPaw push UX boundaries. Gateway architecture, SQLite operational DB, WASM plugins là technical consensus.

Biggest risks: SQLite WAL bloat (affect 2 projects), maintenance bandwidth (PicoClaw fork, NullClaw no-review), platform-specific bugs còn nhiều.

Opportunities: PostgreSQL multi-instance, WASM plugin ecosystem, local-first observability, reasoning config standards, voice/realtime.

Hermes position: Tier-1 infrastructure, stability-focused, post-gateway-merge cleanup mode. Roadmap clear (70 findings tracked), community engaged, security-conscious. Main challenge: session state consistency + credential routing bugs affect daily usage.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-10-16

## 🎯 Tóm tắt hôm nay

OpenClaw đang chạy sprint lớn nhất Q4 với 30 PR được mở trong ngày, tập trung vào **PostgreSQL integration**, **Solid UI migration phase 6**, và **performance overhaul**. Release 2026.10.4 stable mới ship với fix critical về clock-jump crash. Cộng đồng đang hot nhất về SQLite WAL bloat (215 comments tích lũy) và plugin capture overhead.

---

## 🚀 Releases

### v2026.10.4 (stable) - 16/10
**Ý nghĩa:** Đây là stable đầu tiên sau beta spree tháng 10, ship với các fix quan trọng:

- **Clock-jump recovery** (#170790): Gateway không còn tự restart sau khi máy sleep/wake hoặc system clock thay đổi. Bug này ảnh hưởng lớn đến laptop users và timezone-jumping deployments.
- **Clean shutdown** (#170493, #170555): Gateway không còn hang trên stalled transcript worker hay lifecycle events khi restart.
- **Tlon DM owner fix**: Group DMs không còn nhầm participants là owner (security issue).

**Impact:** Triệt tiêu hai failure modes phổ biến nhất trên production (shutdown hangs và spurious restarts). Critical cho stability.

### v2026.10.10-beta.1 - 15/10
**Theme:** "Faster, steadier Gateway"

Highlights:
- **SQLite work reduction**: Session lists, chat turns, startup, idle state dọn bớt SQLite work. Nhiều DB ops chuyển sang worker threads.
- **Update reliability**: macOS update không còn timeout trên aliased dirs, systemd reclaims abandoned runtimes.
- Chuỗi PRs #167965, #168002, #168093, #169164 — tất cả là perf và threading fixes.

**Ý nghĩa:** Đang chuẩn bị 2026.10 stable line mạnh hơn 2026.9 về concurrency và resource usage.

### v2026.9.33 (extended-stable LTS)
Đây là **September LTS branch** — nhánh bảo trì dài hạn với security + critical fixes only. Người dùng enterprise/conservative có thể lock vào nhánh này thay vì theo latest monthly.

---

## 📈 Tiến độ dự án

### 🔥 Hot track: PostgreSQL migration (#173625)
**What:** Experimental PostgreSQL store gains native search: tsvector full-text, pg_trgm trigram, exact pgvector cosine.

**Why:** Hiện SQLite là hard requirement. PostgreSQL support mở lối cho:
- Multi-gateway shared state
- Cloud-managed Postgres (RDS, Supabase, Neon)
- Massive agent fleet deployments

**Status:** Still experimental. Search layer đang đồng bộ với SQLite semantics. 

### 🎨 UI overhaul: Solid replacing Lit (#173531, #173629, #173638, #173640)
**Track:** Wave 6 của migration Lit → Solid. Hôm nay:
- Chat composer content (#173629)
- Chat headers (#173640)
- Tool icons (#173639)
- Shared content adapters removal (#173638)

**Pattern:** Mỗi PR retain exact behavior/markup, chỉ thay rendering layer. No visual changes.

**Why:** Lit dependency là legacy. Solid nhẹ hơn, reactive model match better với realtime chat. Wave 6 cover 38 test fixtures + major UI surfaces.

### ⚡ Performance wave (#173617, #173642, #173643, #173628)
- **SQLite scratch DB removal** (#173617): Schema admission không còn tạo temp DBs để rediscover schema → giảm DDL overhead startup.
- **Worker memory release** (#173643): SQLite worker clients giải phóng opening caller memory ngay sau khi open.
- **Test parallelism** (#173628): Local full-suite runs tận dụng worker budget thay vì serial cohorts → hours → faster.
- **Recall/worktree fixes** (#173642): Memory-core repair lỗi recall dates và worktree config.

**Theme:** Chặn memory leaks, giảm SQLite churn, optimize test suite.

### 🛡️ Security & secrets (#173635, #166464)
- **Secrets refresh retry** (#173635): Tránh repeated provider calls khi auth-store refresh retry. SecretRef cache được share across retries.
- **Service credentials retention** (#166464): systemd Gateway giữ managed credentials referenced qua auth profiles thay vì drop during startup.

**Status:** Under security review, marked `security-sensitive-changed`.

### 🔧 Agent runtime fixes
- **PostgreSQL agent DB support** (#173462): Agent databases giờ mở qua selected engine (PostgreSQL hoặc SQLite) thay vì hardcoded SQLite. Breaking change, merge-risk compatibility warning.
- **Daemon runtime pins** (#172703): Pins chuyển từ `config_machine_state` sang daemon-owned `services.sqlite` → giảm dependency vào shared DB cho macOS recovery.
- **macOS compiled runtime** (#172569): macOS app chạy compiled executable thay vì loose Bun install. Draft, blocked on native hooks migration.

---

## 🗣️ Điểm nổi bật cộng đồng

### 🔥 Top interaction: SQLite WAL bloat (#143524)
**128 comments** — vấn đề lớn nhất Q3/Q4.

**Problem:** Agent DB WAL grows đến 1.4–2.8 GB trong vài ngày dù có `wal_autocheckpoint=1000`. WAL không bao giờ checkpoint, block gateway startup trên Windows.

**Root cause (từ investigation):** 
- WAL checkpoint bị block bởi in-process reader giữ snapshot.
- Similar issue ở gateway state DB (#164294): checkpoint report "blocked by reader" liên tục, chưa complete lần nào.

**Status:** P0, needs-maintainer-review, no fix PR yet. Nhiều users report giống nhau (Windows, 2026.9.2/9.3).

**Community pulse:** Đây là top stability blocker. Users phải manual `wal_checkpoint(TRUNCATE)` offline.

### 🐛 Plugin capture overhead (#160959, #157989)
**#160959 (25 comments):** Gateway blocks minutes khi capture large external plugins. Xảy ra startup và khi runtime republishes. Regression từ #144252 (2026.9.6).

**#157989 (18 comments):** Plugin source capture rewrites 1.1–1.4 GB per CLI command, 6.5 GB per gateway start. No reuse, bundled native binaries copy mỗi lần. Severe SSD wear.

**Pattern:** Cả hai đều về plugin generation capture. Một là blocking event loop, một là excessive disk write.

**Status:** P0/P1, source-repro confirmed. No fix PR yet.

---

## 🐞 Ổn định & Bugs

### Critical (P0/P1)
1. **SQLite WAL unbounded growth** (#143524, #164294) — top stability issue.
2. **Gateway event loop saturation** (#84983): Native cron agent-turn fire block gateway minutes. Chat transports unresponsive.
3. **Reply loss regression** (#148707): "Reply operation has no active tool authority snapshot" when second run displaces in-flight turn. 2026.9.4 regression.
4. **Codex timeout hangs** (#85251): App-server emits `turn/started` rồi silent. Embedded run wedges full 360s recovery window.

### Medium (P1)
- **Feishu bot disconnect** (#77717): Identity recovery race → permanent disconnect.
- **Orphaned node workers** (#86119): `node server.js` workers accumulate sau subagent/cron runs. Memory leak.
- **Overflow recovery waits too long** (#81182): Chờ full 900s compaction timeout trước khi truncate tool results (truncate chỉ mất vài giây).
- **Matrix read cursor confusion** (#173252): `--before`/`--after` cần pagination cursor, nhưng docs/error không nói rõ → users pass message IDs, fail.

### Patterns
- **Codex app-server issues:** Multiple bugs về timeout (#85251), truncation (#84516), prompt cache bust (#84110), context growth (#84662).
- **Telegram delivery:** Quote/reply handling vẫn split across two surfaces (#88032), cần first-class contract.

---

## 💡 Yêu cầu tính năng

### High interest
1. **Multiple providers onboarding** (#81960): `openclaw onboard` chỉ config được 1 provider. Users muốn add nhiều providers/models ngay lúc setup.
2. **Dream Diary i18n** (#79223): `DREAMS.md` hardcoded English. Users muốn configurable language/prompt cho non-English workspaces.
3. **Slack modal support** (#88154): Workflows collect structured input qua Slack modals thay vì repeated message prompts.
4. **Plugin tab pinning** (#111143): Plugin tabs luôn ở "More", không thể pin vào sidebar như built-in routes.
5. **Shell command rendering** (#83442): Reliable, channel-aware way present bash/shell blocks → copy-paste friendly.

### Platform requests
- **Multiple Teams bots** (#71058): Support nhiều Azure App Registrations trên một Gateway (hiện chỉ được 1).
- **MCP observability** (#81595): Emit per-MCP-server sub-spans trong `bundle-tools` → cold-start cost attributable.
- **Session transcript consistency** (#87544): Channel-scoped sessions đôi khi miss delivery (transcript có, Discord message không).

---

## 👥 Phản hồi người dùng

### 😤 Pain points
- **SQLite WAL issue universal complaint.** Ảnh hưởng production, cần manual intervention.
- **Plugin capture overhead** (#157989): Users report severe SSD wear, "6.5 GB per start is ridiculous".
- **Codex reliability:** Multiple timeout/hang issues → users frustrated với black-box wait states.
- **Update failures** (#85027): macOS upgrade 2026.5.6 → 2026.5.19 bricked gateway, cần Time Machine restore. Extreme case nhưng scary.

### 😊 Positive signals
- Community active report detailed repros (logs, traces, steps).
- Quick triage: Many issues có `source-repro`, `fix-shape-clear` labels → team biết cách fix.
- Security review process visible: PRs marked `security-review-required`, users tin tưởng.

### 📊 Engagement
Top issues theo comments:
1. #143524 (WAL bloat): 128 comments
2. #160959 (plugin blocking): 25 comments
3. #148707 (reply loss): 20 comments
4. #87744 (Codex timeout): 18 comments
5. #164294 (state DB checkpoint): 18 comments

Pattern: **Infrastructure reliability > features.** Community prioritize stability.

---

## 🗺️ Backlog & Roadmap

### Q4 2026 tracks (inferred từ PR activity)
1. **PostgreSQL GA:** Search layer xong (#173625), tiếp theo: migration tooling, multi-gateway coordination.
2. **Solid UI cutover:** Wave 6 đang chạy, còn lại: tests (#173630), app context (#173627). Target: complete Lit removal trước EOY.
3. **macOS compiled runtime:** #172569 blocked on native hooks migration. Khi xong, macOS app độc lập khỏi Bun install.
4. **Performance baseline:** SQLite work reduction (#173617, #173643) + worker threading (#171685, #168649) → establish new perf floor cho 2026.11+.

### Unscheduled but high-demand
- SQLite WAL fix (P0, no timeline)
- Plugin capture optimization (#160959, #157989)
- Codex stability wave (#85251, #84516, #84662)

### Extended-stable commitment
v2026.9.33 LTS signal: OpenClaw commit tới long-term support branches cho enterprise users. Expect more LTS branches future releases.

---

## 📊 Metrics snapshot

- **Active issues:** 215 open (top 50 shown)
- **Active PRs:** 500 total (30 shown — 30 opened today!)
- **Hottest label:** `P0` (4 issues), `P1` (14 issues), `clawsweeper:no-new-fix-pr` (pervasive)
- **Top issue rating:** 🦞 diamond lobster (nhiều source-repro issues)
- **Security-sensitive PRs:** 3 active (#173635, #166464, #170534)

---

**Kết luận:** OpenClaw đang intensive development phase. Team focus đúng hướng: stability (SQLite WAL, plugin perf) và modernization (PostgreSQL, Solid UI). Cộng đồng engaged, báo cáo chất lượng cao. Roadmap rõ ràng cho Q4. Biggest risk: SQLite WAL bug chưa có fix, affect production. Nếu solve được issue này, sentiment sẽ improve mạnh.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot ngày 2026-10-16

## 1. Tóm tắt hôm nay

Đóng 13 PR trong 24h, tập trung vào tối ưu hiệu năng (reuse skill discovery, skip transcript snapshots), sửa lỗi CLI/WebUI (Unicode crash macOS, sidebar state corruption), và cải thiện bảo mật (shell path validation, terminal escape filtering). Không có release mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Đóng gộp hôm nay (13 PR):**

- **Hiệu năng**: #6218 bỏ deep-copy transcript khi không có hook, #6217 cache skill discovery trong mỗi prompt build, #6220 estimate token usage off event loop
- **Bảo mật/Shell**: #6222 reject `~unknown/file` trong workspace restriction, #6235 lọc escape sequences từ shell output, #6228 tách wait/idle/runtime limits riêng
- **CLI**: #6232 sửa UnicodeDecodeError macOS bằng cách chỉ set `SPT_NOENV=1` trên Linux
- **WebUI**: #6150 WSL browser launch qua Windows PowerShell, #6190 tách gallery examples, #6189 bỏ session preview/timestamp defaults, #6209 khôi phục live activity sheen
- **Agent**: #6233 trim system prompt (bỏ unavailable skills, duplicate platform), #6236 rút ngắn built-in skill descriptions 995→485 chars, #6170 khai báo session queue policy khi đăng ký command
- **Tracing**: #5520 thêm Langfuse trace cho Codex qua native SDK
- **Subagent**: #4616, #4205 đóng vì conflict, chuyển subagent results vào turn queue thay vì global bus

**Đang mở quan trọng:**

- **#6147 (P1)**: sửa tool calls từ plaintext `<tool_call>` markup, yêu cầu structured API fields để tránh execute quoted examples
- **#5943 (P1)**: centralize session state trong SQLite thay vì JSONL, bounded worker pool
- **#6228 (P1)**: tách shell wait/idle/runtime limits
- **#6168**: in-app update flow tích hợp managed installs + recovery
- **#6230**: idle compaction archiving turn đang chạy (direct mode không vào `_pending_queues`)
- **#6234**: decode JSON-string nested object/array tool args cho Agnes AI #5311
- **#6237**: sidebar state update không xóa data thật khi GET fails
- **#6238**: sidebar state không persist cho đến khi load thành công

Xu hướng: dọn tech debt (shell, session, subagent), tối ưu prompt/token, bảo mật shell I/O.

## 4. Điểm nổi bật cộng đồng

- **#6231**: macOS user gặp crash CLI khi command line kết thúc bằng ký tự CJK. Đóng trong 9h qua #6232
- **#5311**: Agnes AI double-encode nested tool args, đợi #6234
- **#6068, #6014**: community PR thêm MCP presets (FXMacroData, Keenable), chờ review
- **#6043**: preserve WebUI settings edits khi save pending

Không có PR/issue nào vượt 1 comment.

## 5. Ổn định & Bugs

**Đã sửa:**
- macOS Unicode crash (#6232)
- WebUI sidebar corruption (#6237, #6238 đang review)
- Shell `~unknown` bypass workspace restriction (#6222)
- Terminal escape sequences trong tool output (#6235)
- Live activity sheen mất (#6209)

**Đang sửa:**
- Agnes AI tool args (#6234)
- Idle compaction race (#6230)
- Tool call từ plaintext (#6147, regression từ #4662)

## 6. Yêu cầu tính năng

- **#6168**: managed in-app updates với recovery
- **#6068**: FXMacroData MCP (macro data, FX rates)
- **#6014**: Keenable MCP (web search/fetch)
- **#4586**: WebUI session timestamps mặc định

Không có feature request mới hôm nay.

## 7. Phản hồi người dùng

- macOS user báo crash ngay (#6231), maintainer đóng trong ngày
- Agnes AI user chờ fix 2 tháng (#5311), giờ có PR
- Không có complaint hoặc praise mới

## 8. Backlog & Roadmap

**Ưu tiên:**
- #6147 (P1): tool call security
- #5943 (P1): SQLite session migration
- #6228 (P1): shell execution limits

**Tiếp theo:**
- In-app updates (#6168)
- MCP presets (#6068, #6014)
- Sidebar state reliability (#6237, #6238)

Không có roadmap công khai. Maintainer đóng nhiều PR nhanh, focus dọn debt trước khi thêm tính năng lớn.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-16

## 🔥 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào bảo mật (Wasmtime, Rustls advisory) và plugin system refinement cho v0.8.6. 50 PRs đang mở, nhiều PR lớn đang blocked chờ review/author.

## 📦 Releases

Không có release trong 24h qua.

## 🚀 Tiến độ dự án

**v0.8.6 Release-gate PRs (ưu tiên cao):**

- **#11755** [MERGED implied]: Patch Wasmtime 48.0.5→48.0.6 và Rustls 0.23.45→0.23.46 - 14 RustSec findings
- **#11736**: Rustls 0.23.46 cho RUSTSEC-2026-0346→0349 (Brotli cert decompression bugs)
- **#11347**: Ship WASM plugin host trong release artifacts - chờ #11311 merge
- **#11311**: Plugin artifact smoke harness - blocked, đợi hardware CI
- **#11309**: `zeroclaw quickstart` tự install/activate tool plugins
- **#11262**: `zeroclaw plugin update` với verified replacement
- **#11236**: Recovery cho incomplete plugin installs qua `plugin remove`
- **#11221**: Default 11 built-in tools với full setting

**v0.9.0 Gateway separation (Phase 3):**

- **#7432** tracker: Runtime và gateway delivery, 7 comments, đang active

**Stacked/Blocked PRs (rủi ro về merge conflicts):**

- **#11347** ← #11311 ← hardware CI pass
- **#11262** ← #11261 ← #11236
- **#11304**: Plugin egress denial logging - blocked, waiting on dependency

**Channel fixes:**

- **#11651**: Telegram 429 `retry_after` qua shared flood gate - XL, needs-author-action
- **#11669**: Parse flat Lark inbound post content - merged path
- **#11644**: Cron shell diagnostic leak prevention - high-risk, needs-author-action

**Provider/Model:**

- **#11659**: Recognize snake_case context overflow codes (`context_length_exceeded`)
- **#10502**: MCP tool-result images → user message (OpenAI-compatible 400) - needs-author

**Config validation:**

- **#10499**: Validate persistent config writes - high-risk, XL, needs-author-action
- **#11520**: Legacy plugin recovery discoverable - needs-maintainer-review

**Testing/CI:**

- **#11722**: Web-search capped response test - observe closure directly
- **#11364**: Arduino-cli flags qua Windows fake - Windows CI luôn red

## 🐛 Ổn định & Bugs

**Bugs mới (2026-10-15):**

1. **#11773**: Regional locales (fr_FR, es_ES, ja_JP) fallback về English
   - `sys-locale` reports `fr_FR.UTF-8` → normalize thành `fr-FR` → không match translations
   - S2 severity

2. **#11771**: Bootstrap file cap khác nhau:
   - Gateway turns: 20,000
   - Channel/agent-loop + compact_context: 6,000
   - Doctor chỉ report 1 giá trị

3. **#11769**: Voice-drop và model-fallback channel tests depend on operator locale
   - Hard-code English notice text
   - Giống #10303 (Telegram locale fix)

4. **#11764**: WhatsApp Web drops untranscribed voice note không báo sender
   - `try_transcribe_voice_note` fail → silent drop
   - S2 severity

**Security fixes landed/in-progress:**

- Wasmtime 14 advisories patched
- Rustls 4 advisories (Brotli decompression) patched
- Cron shell diagnostic leak (#11644) đang review

## 💡 Yêu cầu tính năng

**Plugin ecosystem (release-gate v0.8.6):**

- WASM plugin host distribution
- Quickstart tự động install plugins
- Plugin update với verification
- Incomplete install recovery
- Egress denial logging

**Speech-to-speech:**

- **#10430**: Gemini realtime voice broker channel - PR1 daemon core, parking-lot

**Tool improvements:**

- **#11221**: 11 default built-ins thay vì subset nhỏ
- **#11297**: Honor `keep_tool_context_turns` count (hiện treat as boolean)

**Config UX:**

- **#11460**: Rename provider aliases trong ZeroCode Config

## 👥 Phản hồi người dùng

**Pain points:**

- Plugin install reliability - nhiều PRs địa chỉ incomplete installs, recovery
- Telegram rate limiting - #11651 addressing 429 retry_after
- Locale support - 2 bugs (#11773, #11769) về non-English locales
- WhatsApp voice notes - silent failures (#11764)

**Contributor activity:**

- @IftekharUddin: Distinguished contributor, nhiều plugin PRs (stacked work)
- @JordanTheJet: Distinguished contributor, tooling defaults
- @Audacity88: Tracker ownership, security patches

## 📋 Backlog & Roadmap

**v0.8.6 remaining (từ #7432 tracker):**

- Phase 2 runtime work
- Plugin system stabilization
- Security patches (Wasmtime, Rustls)

**v0.9.0 (từ #7432 tracker):**

- Phase 3 gateway separation
- Architecture refactor

**Parking lot:**

- #10430: Gemini speech-to-speech (experienced contributor, large scope)
- #10391: Delegate workspace/tool ceiling bounds (needs-author-action)

**Review bottleneck:**

- Nhiều PRs XL size đang needs-author-action hoặc needs-maintainer-review
- Stacked PRs tạo dependency chains dài (#11347 ← #11311 ← hardware CI)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw ngày 2026-10-16

## 🎯 Tóm tắt hôm nay

Đóng 9 PR/issue stale (tồn đọng lâu). Đợt cleanup code lớn: sửa 5 bug core (cron timezone, telegram markdown, QQ auth, job status, tool feedback), thêm 2 tính năng (QQ C2C channel mới, Standard Compute provider). Đạt đỉnh 22 PR trong ngày, phần lớn là dependabot updates.

## 🚀 Releases

Không có release.

## 📊 Tiến độ dự án

**PR quan trọng đã merge/đóng:**
- Đóng batch stale issues/PR (#3409, #3408, #3413, #3412, #3411, #3410, #3378, #3347, #3222) - cleanup backlog tồn đọng từ tháng 7-9
- Stale chủ yếu về Web UI fixes (typing indicator, error visibility, session sidebar) và auth scope

**PR đang mở (urgent fixes):**
- #3441: Fix cron không tôn trọng timezone trong schedule - hiện tại dùng UTC thay vì TZ đã set
- #3442: Cron job failures không report đúng status, luôn show "ok"
- #3443: Telegram MarkdownV2 fail khi link label có dấu chấm
- #3437 → #3438: QQ channel không gửi được tin - auth scheme sai + chat type detection sai
- #3428: Gemini 3 trả 400 INVALID_ARGUMENT vì thiếu thought_signature cho tool calls

**Feature PRs:**
- #3440: QQ C2C Channel tự viết, không phụ thuộc botgo - WebSocket gateway + markdown + buttons
- #3431: Thêm Standard Compute provider (OpenAI-compatible)
- #3429 + #3430: Cho phép hide tool feedback arguments trong config

**Dependabot updates:** 7 PR (#3432-3436) bump dependencies (anthropic SDK 1.55→1.80, Azure identity, crypto, gronx, go.mau.fi/util)

**Xu hướng:** Focus vào stability - sửa bugs nền tảng (cron, auth, messaging) trước khi thêm feature.

## 🌟 Điểm nổi bật cộng đồng

- #3417: Fork chính thức `afjcjsbx/picoclaw` vì repo gốc "unmaintained" - 2 comments, không rõ maintainer phản hồi
- #3439: Bug report chi tiết về launcher IPv6/IPv4 binding conflict - người dùng Trung Quốc chạy OpenWrt

## 🐛 Ổn định & Bugs

**Critical bugs đang fix:**
1. **Cron timezone broken** (#3441) - computeNextRun bỏ qua schedule.TZ, dùng UTC
2. **Cron status always "ok"** (#3442) - failures không báo, hardcode "ok" 
3. **QQ channel auth broken** (#3437, #3438) - resty auth scheme sai vị trí + chat type detection luôn guess "group"
4. **Telegram markdown escape** (#3443) - link labels và blockquotes fail khi có ký tự đặc biệt
5. **Gemini tool calls 400** (#3428) - thiếu thought_signature

**Stale bugs đã đóng:**
- Subagent scheduling trigger autonomous loop (#3409)
- Web UI queue messages invisibly (#3408)

## 💡 Yêu cầu tính năng

- #3440: QQ C2C Channel riêng (không dùng botgo) - streaming, markdown, buttons
- #3431: Standard Compute provider integration
- #3429: Hide tool feedback args option
- #3439: Launcher cần fix IPv4/IPv6 dual-stack binding

## 💬 Phản hồi người dùng

- Frustration về maintenance status → fork ra (#3417)
- Người dùng Trung Quốc report launcher networking issues chi tiết (#3439)
- Stale PRs cho thấy nhiều contributions không được merge kịp thời

## 📋 Backlog & Roadmap

Không có roadmap công khai. Dựa vào PR pattern:
- **Ưu tiên hiện tại:** Stability (fix cron, messaging, auth bugs)
- **Tiếp theo:** Multi-channel support (QQ C2C, Telegram improvements)
- **Dependency updates:** Đang catch up (anthropic SDK +25 versions, crypto libs)

⚠️ **Vấn đề:** Repo có dấu hiệu maintenance slowdown - nhiều stale PR, community fork xuất hiện.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-16

## 📊 Tóm tắt hôm nay

Ngày làm việc đồng đội chủ yếu: glifocat và barnuri đóng 4 PR, mở 2 PR mới về signal-cli pinning (#4096) và OneCLI 1.45 migration (#4094, #4095). Hoạt động tập trung vào bảo trì (deps, security alerts) và hoàn thiện hệ thống observability (session logs, error reporting, turn traces).

---

## 🚀 Releases

Không có release mới.

---

## 🔧 Tiến độ dự án

### Merged/Closed hôm nay

**#3834** - fix(scheduling): honor task-script shebangs instead of forcing bash  
Task scripts có shebang `#!/usr/bin/python` giờ chạy đúng interpreter thay vì forced bash. Trước đây bash treat `#!` như comment → syntax error.

**#3856** - `ncl health` command  
Health check chạy offline, đọc DB read-only, không cần host process sống. Phục vụ debugging khi main process crash.

**#3900** - per-group system_prompt_mode  
Cho phép group drop Claude Code preset khi dùng non-Claude model qua Anthropic-compatible endpoint. Đảm bảo prompt phù hợp với model.

**#4082** - OneCLI 1.45 migration (closed, superseded by #4094)

### PRs đang chờ merge (highlights)

**#4094, #4095** - OneCLI 1.45 + agent grants  
Migration bắt buộc từ 1.42 deprecated APIs. 1.44+ bắt đầu agents without grants, cần explicit grant model credentials. #4095 port Dial tool sang grants model.

**#4089** - Clear 11 dev-only Dependabot alerts  
js-yaml, vitest-related deps. Không ảnh hưởng runtime.

**#4042** - Bump Resend adapter to 0.3.0  
Clear 4 moderate npm audit findings từ uuid@10.0.0.

**#4096** - CI check signal-cli hash  
Auto-detect signal-cli releases, open issue khi có version mới. Tránh pin stale (upstream warn versions >3 months old EOL).

**#4098** - docs(scheduled-tasks): note shebang ignored  
Clarify rằng `#!` line bị ignore, bash forced. Document behavior sau khi #3834 fix.

### Observability stack (barnuri)

Chuỗi PRs xây hệ thống observability không cần external backend:

- **#3922** - `/add-session-logs`: giữ container stderr sau exit
- **#3935** - `/add-error-reports`: gửi host failures tới chat
- **#3939** - `/add-turn-traces`: log tools, inputs, outputs vào DB
- **#3932** - `/add-lean-tasks`: scheduled tasks chạy small model, minimal context, tiết kiệm chi phí

### Extensibility seams (barnuri)

Nhiều refactor PRs thêm hooks cho installs customize không edit core:

- **#3904** - turn-lifecycle hooks
- **#3925** - provider-wrapper seam (retry backup model/credentials)
- **#3934** - operational error sink seam
- **#3926** - postCard hook cho channels render custom cards
- **#3921** - task content field registry
- **#3902** - env contributor seam + `/add-env-passthrough`
- **#3903** - scheduler admission hook + container cap skill

Patterns: install register hooks, core điều phối, không hardcode logic vào core modules.

### Channels & features

- **#2752** - Discord attachments (images, message.txt) giờ downloadable
- **#3940** - Slack render collapsible sections as Block Kit
- **#3927** - `send_card` accept collapsible children
- **#3898** - `NANOCLAW_DISABLED_CHANNELS` env var park channels
- **#3924** - `/add-delivery-fallback`: retry failed sends on second channel

---

## 🌟 Điểm nổi bật cộng đồng

**#2680** - Service doesn't start at boot with encrypted home + linger  
Closed sau 4 tháng. Per-user encryption (ecryptfs, fscrypt) decrypt sau PAM login, nhưng linger start service before user login → home chưa decrypt → silent fail. No upstream fix mentioned.

**#3671** - signal-cli 0.14.3 hangs forever with new contacts  
Closed. Install script pin 0.14.3 có bug session establishment hang vô hạn. Fixed upstream 0.14.7. Likely fixed by #4096 CI watching releases.

---

## 🐛 Ổn định & Bugs

**#4092** - fix(cross-session-context): agent's own replies read as "you"  
DM/channel with per-thread sessions, agent reply từ thread A copy sang thread B nhưng sender signed as agent group name → agent nghĩ đó là message từ second agent. Fix: cross-session context sign replies correctly.

**Security advisories cleared**:
- #4089: 11 dev-only Dependabot alerts (js-yaml, vitest deps)
- #4042: Resend adapter uuid advisories

**Stale policy** (#3656): dry-run workflow triage items chờ author reply >21 days.

---

## 💡 Yêu cầu tính năng

Không có feature requests mới hôm nay. Các features đang implement:

- Lean tasks (small model, minimal context) - #3932
- Delivery fallback (multi-channel redundancy) - #3924
- Turn traces & error reporting - #3935, #3939
- Scheduler container cap - #3903

---

## 💬 Phản hồi người dùng

Hai issues closed (#2680, #3671) từ Jun/Aug → users gặp edge cases:
- Encrypted home + systemd linger incompatibility
- signal-cli version pin stale

#4096 giải quyết phần nào stale pin problem bằng CI automation.

---

## 🗺️ Backlog & Roadmap

**Immediate**: OneCLI 1.45 migration (#4094, #4095) required, 1.42 APIs deprecated.

**Observability push**: barnuri ship 8+ PRs về logging, tracing, error reporting. Pattern: data stay local (DB, container logs), không phụ thuộc external SaaS.

**Extensibility theme**: 6+ seam PRs cho skills customize behavior không fork core. Goal: "every change is a skill".

**Maintenance debt**: 
- Dependabot alerts cleared
- signal-cli pinning automation
- Stale policy setup (dry-run)

Không có public roadmap document trong context.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-10-16

## 📊 Tóm tắt hôm nay

Contributor @wray-lee mở tracking issue #1066 tổng hợp 9 PRs liên quan OpenClaw parity - tập trung vào streaming, UX cho Slack/Telegram, và routing provider cho OpenAI-compatible gateways (DeepSeek, IFM K2). Không có release. Hoạt động chủ yếu từ 1 người, cần review từ maintainers.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**Tracking issue #1066** gom 9 PRs từ @wray-lee:

**Streaming & Provider Core:**
- **#1057** [CLOSED]: Native tool calls khi streaming - đã đóng vì trùng maintainer PR #971
- **#1065**: Fix `/think` levels cho OpenAI-compatible models, thêm max reasoning effort
- **#1064**: Resend assistant history với `reasoning_content` khi required - fix lỗi 400 từ IFM K2 gateway
- **#1060**: Route providers theo explicit prefix `provider/model` - trước chỉ work với primary provider và reliability.fallback_providers

**Channel UX:**
- **#1058**: Slack streaming replies - 2044 insertions, 14 deletions - lớn nhất
- **#1062**: Telegram live drafts dùng HTML parse mode - fix mất format khi streaming
- **#1061**: Slack status reactions theo task lifecycle (thinking, tool, done)

**Config & Security:**
- **#1059**: Configurable `agent.reasoning_mode` default - overlap với maintainer PR #1050
- **#1063**: Per-agent autonomy policy - hiện tất cả agents dùng chung global `config.autonomy`

**Xu hướng:** Contributor chạy nullclaw làm Slack/Telegram assistant qua OpenAI-compatible gateways, gặp nhiều rough edges. PRs giải quyết streaming UX, provider compatibility, config flexibility. Nhiều PR chờ review, một số overlap maintainer work.

## 💬 Điểm nổi bật cộng đồng

Không có tương tác cộng đồng. Issue #1066 có 0 comments, 0 reactions. Tất cả 9 PRs không có comments hay reactions.

Đây là red flag - contributor mở 9 PRs trong 2 ngày không có feedback. Hoặc maintainers bận, hoặc PRs cần context thêm.

## 🐛 Ổn định & Bugs

**#1064 - Critical for IFM K2 compatibility:**
```
400 Add a supported thinking field to each assistant message in the multi-turn request
```
IFM K2 gateway yêu cầu `thinking` field trên mọi assistant message multi-turn. Fix: resend history với `reasoning_content`.

**#1065 - Reasoning config không reach OpenAI-compatible:**
`appendGenerationFields` drop reasoning effort field cho compatible providers. `/think` command và `reasoning_effort` config chỉ work với OpenAI reasoning models.

**#1062 - Telegram format mất khi streaming:**
Live drafts gửi plain text, final reply dùng HTML parse mode. Bold, code, lists mất trong draft.

## ✨ Yêu cầu tính năng

**#1063 - Per-agent autonomy:**
Tất cả named agents share global autonomy policy. Guest agent bind một chat peer vẫn có full tools như system agent. Cần isolate autonomy per-agent.

**#1061 - Slack lifecycle reactions:**
Show task progress qua reactions: thinking → tool use → done. UX cải thiện cho async operations.

**#1058 - Slack streaming:**
Hiện Slack chờ full response. Streaming tăng perceived speed.

**#1059 - Configurable reasoning default:**
`/reasoning` dropdown hardcode defaults. Cần config `agent.reasoning_mode` để customize.

## 👥 Phản hồi người dùng

Không có comments hay discussions public. Contributor note trong #1066:

> "I have opened several PRs in a short time while running nullclaw as a Slack and Telegram assistant"

Suggests active production use qua gateways. Pain points: streaming UX, provider routing, reasoning config cho non-OpenAI models.

## 🗺️ Backlog & Roadmap

Tracking issue #1066 cho phép maintainers "review, defer or close without triaging each one separately". Implicit: contributor không expect tất cả PRs merge.

**Overlaps với maintainer work:**
- #1057 overlap #971 (streaming tool calls) - contributor sẽ close khi #971 merge
- #1059 overlap #1050 (reasoning config) - có comment về merge strategy

**Next:**
- Maintainers cần triage 9 PRs: accept, request changes, hay close
- Nếu accept #1064, #1065 cần rebase (#1065 stack trên #1064)
- Streaming PRs (#1058, #1062) lớn - cần review kỹ

**Risk:** Contributor có thể frustrated nếu không có feedback nhanh. 9 PRs trong 2 ngày show momentum cao.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw — 2026-10-16

## 1. Tóm tắt hôm nay

Hoạt động tối thiểu. Một issue duy nhất (#8138) phân loại lỗi hàng ngày, không có PR hay release mới. Dự án đang trong pha phân tích chất lượng model thay vì phát triển tính năng.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Issue #8138 — Daily failure taxonomy (2026-10-15)**
- Phân tích 50 task thất bại từ suite `officeqa`
- Lỗi chủ yếu: model DeepSeek-V4-Flash không đủ chất lượng, không phải lỗi hệ thống
- Pattern: dự án có quy trình tự động phân loại lỗi hàng ngày → đo lường chất lượng agent liên tục

**Không có PR:** dự án ở trạng thái đánh giá, chưa có code mới.

**Xu hướng:** tập trung vào benchmarking và taxonomy lỗi. IronClaw nhiều khả năng là testing framework cho AI agents, không phải agent trực tiếp.

## 4. Điểm nổi bật cộng đồng

Issue #8138: 0 comment, 0 reaction → không có tương tác cộng đồng. Có thể:
- Đây là internal tooling, không dành cho end-users
- Report tự động, không cần phản hồi
- Cộng đồng nhỏ hoặc tracking ở nơi khác

## 5. Ổn định & Bugs

**Từ taxonomy report:**
- 50/50 lỗi do model capability, không phải infrastructure
- DeepSeek-V4-Flash chưa đủ mạnh cho OfficeQA suite
- Không có crash hay system failure được mention

**Hàm ý:** platform ổn định, bottleneck nằm ở model được test chứ không phải framework.

## 6. Yêu cầu tính năng

Không có feature request.

## 7. Phản hồi người dùng

Không có phản hồi trực tiếp. Issue là output của automation, không phải input từ users.

## 8. Backlog & Roadmap

Không có thông tin rõ ràng. Suy luận từ pattern:
- **Hiện tại:** chạy daily benchmarks trên nhiều suites (OfficeQA, có thể nhiều hơn)
- **Mục tiêu ngắm:** xây dựng taxonomy lỗi toàn diện để hiểu failure modes của AI agents
- **Roadmap khả thi:**
  - Mở rộng coverage sang models khác
  - Tự động gắn nhãn lỗi (genuine model error vs system bug)
  - Dashboard tổng hợp để track xu hướng theo thời gian

---

**Kết luận:** IronClaw hoạt động như internal benchmarking infrastructure. Ngày 2026-10-16 không có phát triển tính năng, chỉ có report định kỳ. Dự án trưởng thành, ổn định, tập trung vào đo lường chất lượng.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# 📊 Báo cáo QwenPaw — 2026-10-16

## 1. Tóm tắt hôm nay

Release **v2.2.2 stable** vừa ra mắt với 6 theme palette, terminal đa tab trong Chat, và cải thiện quản lý model. Cộng đồng tập trung vào 3 vấn đề: plugin không load trong ACP, cron job bị cancel khi save config agent, và doom-loop gate kill nhầm polling hợp lệ.

---

## 2. 🎉 Releases

### **v2.2.2** (2026-10-15)
Core features:
- **Console customization**: 6 theme, custom color/corner radius, font 12-20px (#7741)
- **Terminal in Chat**: multi-tab, working directory per conversation (#7861)  
- **Model management**: phân tầng theo scope (global/agent/chat), validation tự động (#8240)
- **Voice chat**: realtime speech với provider config, tool + history integration (#7785)
- **Plugin infrastructure**: clean unload, rollback-safe hot reload (#7565)

Ý nghĩa: UI flexibility tăng, developer tooling mạnh hơn (terminal), plugin architecture ổn định hơn.

---

## 3. 🔨 Tiến độ dự án

### PRs nổi bật
- **#8266 (XXXL)**: Ship data-app 1.0.3 độc lập Host vNext — cho phép deploy data app mà không chờ nền tảng upgrade
- **#8248**: Plugin OpenUI inline render interactive UI trong Chat reply — Intelligent UI framework
- **#8253**: JSON-driven evaluation index — benchmark leaderboard, cost/performance chart
- **#8187**: Channels thành plugin với subprocess isolation — giảm coupling

### Xu hướng
- **Microservices**: tách channels, data-app ra khỏi core
- **Structured AI tooling**: human-in-the-loop questions (#8259), TypeSafe decision model (#8205)
- **Community feed**: #7903 đang integrate marketplace + inbox vào Console

---

## 4. 🔥 Điểm nổi bật cộng đồng

### Top issues (theo tương tác)
1. **#8252 (3💬)**: Agent-to-agent calls bị silent cancel, CancelledError không log gì
2. **#8213 (2💬)**: Hub restart để lại Local runtime stopped, cron job miss schedule
3. **#8225 (2💬)**: Save agent config trigger hot reload → cancel running cron, task đánh `cancelled` không notify

**Pattern**: Cron + runtime lifecycle là pain point lớn. User không biết job bị kill, orchestrator call chain fail im lặng.

---

## 5. 🐛 Ổn định & Bugs

### Critical
- **#8222**: `qwenpaw acp` không load plugin → tool missing trong ACP session, task callback không wake
- **#8184**: Doom-loop gate kill legitimate polling khi agent đợi background task

### Medium  
- **#8120**: Page load failure thường xuyên, ảnh hưởng UX
- **#8206**: Windows không xóa được project vì `creator.log` mở → WinError 5
- **#8265**: `importlib.invalidate_caches()` raise trên distro-patched Python 3.11 → plugin install fail

### Fixes shipped
- **#8260**: Windows listen backlog 1→2048, chunk recovery state
- **#8245**: Restore interactive HTML preview (JS content blank)
- **#8210**: Close project log before delete (#8206 fix)

---

## 6. 💡 Yêu cầu tính năng

### Accepted/In Progress
- **#8199 → #8200**: Firecrawl web_search provider — PR đang review
- **#8233**: CommandCode + Hugging Face preset trong provider catalog
- **#8223**: Host navigation policy shared by sidebar + settings
- **#8211**: i18n cho protected execution prompt (như scroll prompt)

### Đề xuất mới
- **#8126**: Skill-pool download thành background job với progress bar + cancel button
- **#8264**: Desktop startup nhanh hơn (hiện >10s trên Windows, thua Workbuddy)

---

## 7. 👥 Phản hồi người dùng

### Positive
- Theme + terminal trong Console được đón nhận tốt
- Plugin hot reload giảm friction khi dev

### Pain points
- **OpenCode Go**: #7599, #7531 — session header issue, model deprecated
- **Cross-device sync**: #8202 — message send device A invisible trên B đến khi turn kết thúc
- **Cron reliability**: Multiple reports về job bị cancel im lặng

### UX gaps
- **#8251**: Message navigation directory không position chính xác
- **#8249**: Cron modification UI reset về 00:00, Request Content show `[object Object]`

---

## 8. 📋 Backlog & Roadmap

### In Flight (PRs mở)
- **Community integration** (#7903): Feed + inbox + Platform link
- **PawApp redesign** (#7874): Durable work contract, task identity, retry
- **Telegram code render** (#8012): Fix fenced block escaping

### Upcoming (từ issues)
- Structured human questions (#8259 merged)
- Firecrawl provider (#8200 review)
- Evaluation website (#8253 merged)

### Technical debt
- ACP plugin loading (#8222)
- Cron cancellation visibility (#8225, #8252)
- Hub runtime recovery (#8213)

---

**Kết luận**: Release 2.2.2 mang nhiều UX improvement, nhưng runtime orchestration (cron, agent call, ACP) đang có vấn đề ổn định cần ưu tiên fix. Plugin ecosystem đang mở rộng (Firecrawl, OpenUI, channels isolation).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*