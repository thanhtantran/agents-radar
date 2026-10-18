# Bản tin Hệ sinh thái Hermes Agent 2026-10-18

> Issues: 128 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-18 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-18

## 🎯 Tóm tắt hôm nay

Gateway ownership migration (#106742) đã merge ngày 14/10, nay vào giai đoạn dọn dẹp sau merge với 2 package fix lớn (#140337, #140719) chứa 58 vấn đề. Nhiều PR nhỏ fix lỗi chi tiết: credential routing, session state, desktop UX. Không có release mới.

## 📦 Releases

Không có release nào trong 24h qua.

## 🚀 Tiến độ dự án

**Gateway ownership unification - dọn dẹp sau merge:**
- #134889: tracking issue chính, 175 comments, theo dõi fixes sau khi #106742 merge
- #140337: package 9 - 17 findings (detach, lost connections, Windows, Ink/Desktop leftovers) - đã đóng
- #140719: package 10 - 41 findings (gateway process, client lag, credentials, Desktop session lists, messaging order)

**PRs quan trọng hôm nay:**
- #140837: CLI/TUI báo trạng thái qua OSC 7501 (idle/working/blocked/done/error) - terminal tracking
- #140836: Failed API calls hiện provider request ID - dễ debug với OpenAI/Anthropic
- #140829: Preserve API mode khi startup/refresh - fix fallback routing
- #140778: Hold stable-channel install khi release cũ hơn gateway runtime - fix update loop
- #140790: `terminal.max_foreground_timeout` vào config.yaml - trước đây chỉ có env var
- #140789: Fix merged user turn timestamp - giữ timestamp của turn hiện tại, không phải cũ

**Xu hướng:**
- Gateway unification tạo nhiều edge case cần fix (58 open findings trong 2 packages)
- Focus vào desktop/TUI UX polish và session state correctness
- Provider credential routing đang được chăm chút (fallback, Azure Foundry, external process)

## 💬 Điểm nổi bật cộng đồng

**Issues hot nhất (theo comment count):**
- #134889 (175 comments): Gateway ownership tracking - vấn đề trung tâm
- #131859 (43 comments): API PR creation bị permission error - chặn automation workflow
- #121095 (17 comments): `browser_exec` để lại zombie `browser_harness.daemon` processes

**Pain points người dùng:**
- #132817 (6 comments, 2 👍): Một lần 429 rate limit đóng băng credential hàng ngày, không probe reset time, không hint về `hermes auth reset`
- #137944 (6 comments, 1 👍): edge-tts==7.2.7 pin cứng 403 sau Microsoft token rotation - 7.3.0 fix
- #140934 (4 comments): Desktop composer queue duplicates, không xóa được, reappear sau khi clear

## 🐛 Ổn định & Bugs

**Critical/P0:**
- #134889: Gateway ownership post-merge fixes
- #137255: TLS clients die sau khi install-env rotate - certifi CA bundle path còn trong dir đã xóa

**P1:**
- #122395: `activate_dependencies` chọn nhầm dependency gen cho interpreter khác - HTTP MCP servers đứng yên

**P2 đang hot:**
- #140758: Cache collapse trên Nous - foreground 98% → background review 4% → next turn 4%, mất ~400k warm tokens
- #122365: Web Chat tab self-host backend thứ 2 cho single-profile dashboard - Desktop ↔ console continuation bị SESSION_NOT_OWNED
- #140720: Discord native slash commands (/goal, /loop, /heartbeat) không auto-thread
- #140403: Project skill bị quarantine, fix content rồi vẫn quarantine đến khi restart process
- #138260: Desktop model switch trong draft session không persist - FOREIGN KEY constraint fail

**Windows-specific:**
- #92303: `hermes update` hang forever trên Scheduled Task (unattended stdin)
- #133272: macOS LaunchAgent plist parse fail thì skip thầm, dashboard book là `manual-serve` rồi respawn vào port của chính job (exit 1)

## ✨ Yêu cầu tính năng

**Desktop/UX:**
- #134024 (3 comments): Optional max-width cap cho chat column - 150+ char lines khó đọc trên ultrawide
- #135363 (2 comments): Windows updater dialog hiện progress bar/stage/files + "shut down PC after update"
- #58414 (6 comments, 2 👍): Desktop controls cho MCP/skill reloads - hiện phải dùng hidden slash commands

**Infrastructure:**
- #70547 (4 comments, 2 👍): Configurable kanban dispatcher spawn cho external CLI workers (Claude Code, Codex CLI) - production path cho existing `spawn_fn` seam
- #137662: Cap concurrent workers per board với `kanban.max_spawn_by_board` - 1 board bận ăn hết budget, starve các board khác

**Security:**
- #132541 (2 comments): `browser_vault_fill` không reach được card number/CVV trong cross-origin payment iframes (Stripe/Adyen/Amadeus) - PCI hosted-fields là OOPIF

## 📢 Phản hồi người dùng

**Pain clusters:**
- Credential management: 429 cooldown benching, Azure Foundry routing, external process streaming
- Desktop session state: composer queue bugs, model switch không persist, draft session FK constraint
- Update/install: unattended hangs, LaunchAgent plist parse, environment rotation breaking TLS
- Kanban: respawn guards parking tasks forever, board starvation, block-cycle hints đúng verb

**Positive signals:**
- OSC 7501 terminal status reporting được port từ goose
- Gateway unification đang được dọn dẹp methodically với tracking packages
- Provider request ID surfacing giúp debug

## 🗓️ Backlog & Roadmap

**Đang active:**
- Gateway ownership post-merge cleanup: 58 findings trong 2 open packages
- Desktop UX polish: composer, session lists, model switching
- Provider credential routing correctness
- Kanban worker spawn fairness

**Chờ quyết định (needs-decision):**
- #83047: kanban `blocker_auth` respawn guard - không có drain
- #67249: `active_pr` respawn guard - không có operator override
- #134024: Chat column max-width
- #137554: Guard `.hermes.md` as protected instruction file

**Backlog lớn:**
- Skills mid-session install (#140559) - chỉ active sau /reset
- Context compression prefix-cache reuse (#89515) - resend full transcript
- Matrix E2EE identity conflicts (#102181) - standalone delivery tạo identity thứ 2
- Local llama.cpp silent CPU offload (#106895) - không có user-facing control

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-18

## 1. 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI agent phân hóa rõ theo 3 nhóm:

**Tier 1 - Enterprise Production (3 dự án):**
- Hermes Agent, OpenClaw, QwenPaw
- Issues 100+, PRs 400-500
- Focus: stability, post-merge cleanup, enterprise features
- Community mature, nhiều contributor

**Tier 2 - Growing Projects (2 dự án):**
- NanoBot, Zeroclaw
- Issues 5-17, PRs 44-50
- Active development, feature-complete đang polish
- Medium community engagement

**Tier 3 - Early/Niche (3 dự án):**
- PicoClaw, NanoClaw, NullClaw
- Issues 0-1, PRs 1-13
- Ít hoặc không hoạt động, niche use cases
- Minimal community

**Tier 0 - Inactive:**
- IronClaw, Qwen-Paw: không hoạt động

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Tương tác cộng đồng | Mức độ trưởng thành |
|-------|--------|-----|----------|---------------|---------------------|---------------------|
| **Hermes Agent** | 128 | 500 | 0 | 🟢 Cao - 10+ PRs fix post-merge | 175 comments (tracking issue) | ⭐⭐⭐⭐⭐ Enterprise |
| **OpenClaw** | 161 | 500 | 0 | 🟢 Cao - 30 PRs refactor | 19 comments (disk wear issue) | ⭐⭐⭐⭐⭐ Enterprise |
| **QwenPaw** | 9 | 15 | 0 | 🟡 Trung bình - 15 PRs fix bugs | 5 comments (audio wedge) | ⭐⭐⭐⭐ Production |
| **NanoBot** | 5 | 44 | 0 | 🟢 Cao - 8 PRs merged | 19 comments (Matrix listen) | ⭐⭐⭐⭐ Stable |
| **Zeroclaw** | 17 | 50 | 0 | 🟡 Trung bình - release prep | 10 comments (runtime tracker) | ⭐⭐⭐ Growing |
| **NanoClaw** | 0 | 13 | 0 | 🟡 Trung bình - 7 PRs | 0 | ⭐⭐ Early |
| **PicoClaw** | 1 | 1 | 0 | 🔴 Không - 2 mục stale đóng | 0 | ⭐ Inactive |
| **NullClaw** | 0 | 1 | 0 | 🔴 Không - 1 PR chờ 20 ngày | 0 | ⭐ Minimal |

---

## 3. 🎯 Vị thế Hermes Agent

### Vai trò trong hệ sinh thái

**Leader về scale và complexity:**
- Issues/PRs nhiều nhất (128/500)
- Architectural refactor lớn nhất: Gateway ownership unification (#106742)
- 58 findings trong 2 cleanup packages - chứng tỏ codebase rộng

**Enterprise-ready maturity:**
- Focus stability: credential routing, session state, TUI/Desktop UX
- Methodical post-merge cleanup với tracking issues
- Provider ecosystem rộng (OpenAI, Anthropic, Azure Foundry)

**Community engagement cao nhất:**
- 175 comments trong 1 tracking issue
- Distinguished contributors program
- User pain được prioritize (429 cooldown, update hangs)

### So với competitors

**vs OpenClaw:**
- Hermes: 128 issues, cleanup oriented
- OpenClaw: 161 issues, refactoring oriented (wave-6)
- Cả 2 enterprise-scale, OpenClaw có nhiều P0 bugs hơn (SQLite corruption, disk wear)

**vs QwenPaw:**
- Hermes ổn định hơn (không có v2.2.2-style regression waves)
- QwenPaw có 4 critical wedge bugs cùng lúc
- Hermes có Gateway architecture advantage

**vs Zeroclaw:**
- Hermes production-stable, Zeroclaw v0.8.6 pre-release
- Hermes cleanup phase, Zeroclaw security hardening phase
- Zeroclaw có Windows daemon/Android issues Hermes đã giải quyết

---

## 4. 🔧 Hướng kỹ thuật chung

### Infrastructure patterns chung

**Gateway/Channel abstraction:**
- Hermes: Gateway ownership unification merged
- OpenClaw: mcp-events plugin migration
- NanoBot: Matrix channel group policy evolution
- NanoClaw: Telegram bot-to-bot admission control

**Provider ecosystem expansion:**
- Hermes: Azure Foundry, external process streaming
- NullClaw: Tsubasa provider (OpenAI-compatible)
- QwenPaw: LM Studio, DashScope rejections
- NanoBot: IO Intelligence partnership

**Config/Security hardening:**
- Zeroclaw: 3 shell command injection bugs fixed trong 1 ngày
- NanoBot: config reads tách khỏi network policy
- OpenClaw: SQLite reliability issues trên FUSE/network storage
- NanoClaw: Path-scoped credentials (Cursor case)

### Common pain points

**SQLite operational issues:**
- OpenClaw: WAL checkpoint corruption (#123327 P0)
- NanoClaw: `busy_timeout` 0 causing locks
- Hermes: không report SQLite issues → architecture advantage?

**Credential/auth complexity:**
- Hermes: 429 cooldown không hint reset, external process routing
- Zeroclaw: Anthropic OAuth thay API key
- NanoClaw: Gateway credential path-scoped

**Media handling bugs:**
- QwenPaw: 4 wedge bugs audio/video
- OpenClaw: không report media issues
- Hermes: không report media issues → scope khác?

---

## 5. 🎨 Điểm khác biệt

### Chiến lược phát triển

**Hermes: Post-unification polish**
- Merge lớn xong, methodical cleanup
- 58 findings trong 2 packages
- Focus correctness: session state, credential routing
- Desktop/TUI UX refinement

**OpenClaw: Aggressive refactoring**
- Wave-6 cleanup: 30 PRs/ngày
- Remove low-value tests, consolidate helpers
- Codebase maintainability priority
- Nhiều P0/P1 bugs chưa fix (disk wear, corruption)

**QwenPaw: Feature velocity vs stability trade-off**
- v2.2.2 regression wave (UI freeze, crashes)
- 4 critical wedge bugs cùng lúc
- v2.3.0 plugin refactor preview đã công bố
- Community feedback-driven

**Zeroclaw: Security-first pre-release**
- v0.8.6 blockers: macOS CI, Docker arm64
- 3 shell injection bugs caught + fixed 1 ngày
- Plugin system signature verification
- Windows stability focus

**NanoBot: Matrix-centric evolution**
- 2 issues + 2 PRs Matrix listen/policy trong ngày
- Telegram B2B problem space unique
- Small team, focused scope

### Tính năng độc đáo

| Dự án | Tính năng unique |
|-------|------------------|
| Hermes | Gateway architecture, OSC 7501 terminal status, `browser_vault_fill` PCI iframes |
| OpenClaw | Bifrost provider anonymous self-hosted, Cua `computer` tool integration |
| QwenPaw | HarmonyOS native client (ArkUI), DingTalk 3500-char downgrade handling |
| Zeroclaw | Plugin WASM host, rollback support, Windows job object daemon isolation |
| NanoBot | Matrix inline topic rename, template library picker, IO Intelligence provider |
| NanoClaw | Telegram bot-to-bot doorman, forum-anchor check, turn state typing indicator |

### Community culture

**Hermes:**
- Pain clusters documented (credential, Desktop state, update/install)
- Positive signals: OSC 7501 port từ goose, provider request ID surfacing
- User quotes không có → enterprise B2B?

**OpenClaw:**
- Platinum/diamond rating system cho issues
- Distinguished contributors visible
- User pain documented với quotes (Talk drops, plugin wear)

**QwenPaw:**
- User quotes trong Chinese preserved ("恰恰是最需要表格渲染的长回复")
- Community engage 10 PRs từ 10 contributors khác nhau
- Feature preview request feedback trước implement

**Zeroclaw:**
- Security audit community-driven (tidux 3 bugs 1 ngày)
- Windows pain points acknowledged
- Risk-aware labels (risk:high)

---

## 6. 📈 Mức độ trưởng thành cộng đồng

### Enterprise tier (Hermes, OpenClaw)

**Indicators:**
- 100+ open issues sustained
- 500 PRs history
- Multi-month tracking issues với 100+ comments
- Distinguished contributor programs
- Methodical post-merge cleanup workflows
- Pain cluster documentation

**Engagement patterns:**
- Issues có 10-19 comments common
- Reaction counts 1-2 👍 (conservative community)
- User pain reports detailed với repro steps
- No "me too" spam → signal-to-noise cao

### Stable tier (QwenPaw, NanoBot)

**Indicators:**
- 5-15 open issues typical
- 15-50 PRs active
- Same-day issue → PR turnaround
- First-time contributors welcome
- Feature preview feedback cycles

**Engagement patterns:**
- Issues có 4-6 comments average
- Reaction counts 0-1 (smaller base)
- User feedback actionable, specific
- Community feedback đưa vào roadmap

### Growing tier (Zeroclaw)

**Indicators:**
- 17 open issues
- v0.8.x pre-1.0 numbering
- Security hardening phase
- Platform-specific bugs (Windows, Android) chưa resolve

**Engagement patterns:**
- Contributor-driven (tidux, VladimirLewisII)
- Community audit effective
- Blockers tracked openly

### Early/Niche tier (NanoClaw, PicoClaw, NullClaw)

**Indicators:**
- 0-1 open issues
- PRs stale 15-20 ngày
- Maintainer không phản hồi
- No community traction

**Engagement patterns:**
- 0 comments, 0 reactions
- Contributors chờ signal
- Unclear roadmap

---

## 7. 🔮 Tín hiệu xu hướng

### Consolidation phase (Hermes, OpenClaw)

Enterprise projects post-major-refactor. Signals:
- Large architectural merges hoàn thành
- Cleanup waves (58 findings, wave-6 refactor)
- Focus shift: features → correctness
- Community reporting edge cases, not RFEs

**Dự đoán:**
- Hermes: 2-4 tuần cleanup, sau đó feature freeze cho release
- OpenClaw: Wave-6 kéo dài 1-2 tháng, nhiều breaking changes possible

### Stability crisis (QwenPaw)

v2.2.2 regression + 4 critical wedges cùng lúc. Signals:
- User complaints về quality drop
- Hotfix v2.2.3 imminent
- v2.3.0 plugin refactor risk delay

**Dự đoán:**
- Hotfix trong 0-7 ngày
- v2.3.0 roadmap slide 2-4 tuần
- Community trust test: nếu v2.2.3 vẫn regress → fork risk

### Pre-release crunch (Zeroclaw)

v0.8.6 blockers (macOS CI, Docker arm64) với deadline 19/10. Signals:
- Security hardening tốt (3 bugs caught)
- Platform issues chưa resolve (Windows, Android)
- Plugin system ship first time

**Dự đoán:**
- v0.8.6 slip hoặc ship incomplete (no arm64 images)
- v0.9.0 Gateway Phase 3 delay
- Windows stability backlog tích lũy

### Maturation trajectory (NanoBot)

Small team, focused scope, same-day turnaround. Signals:
- Matrix/Telegram features user-requested
- Security refactor methodical (#6269)
- No breaking changes, stability maintained

**Dự đoán:**
- Stable 1.0 candidate trong 1-2 tháng
- Niche positioning (Matrix-first) solidify
- Community nhỏ nhưng engaged

### Stagnation/pivot (PicoClaw, NullClaw)

Stale PRs, no maintainer response. Signals:
- Contributors ghost sau 15-20 ngày
- No roadmap communication
- Feature requests ignored

**Dự đoán:**
- Maintainer burnout hoặc internal pivot
- Community fork possible nếu có value
- Likely absorption vào larger projects

### Cross-project patterns

**Gateway/Channel abstraction converging:**
- 4/8 projects có Gateway/channel work trong ngày
- Standard pattern emerging: credential scope, policy isolation, multi-protocol

**SQLite operational brittleness:**
- 2 projects P0/P1 corruption/lock issues
- Không có project nào migrate khỏi SQLite
- Trend: `busy_timeout`, WAL tuning, FUSE/network avoidance

**Provider ecosystem fragmentation:**
- Mỗi project provider list khác nhau
- OpenAI-compatible factory pattern common
- No cross-project provider sharing layer

**Security maturation:**
- Shell injection, path traversal focus tăng
- Plugin systems đều có signature/verification work
- Credential management complexity tăng (OAuth, external process)

### Emerging niches

**Telegram bot-to-bot (NanoClaw unique):**
- Doorman gate, peer admission
- No competitor có feature này
- Niche nhưng production-critical cho automation use cases

**HarmonyOS (QwenPaw unique):**
- Pure native ArkUI client
- No WebView dependency
- China market positioning

**Bifrost anonymous mode (OpenClaw):**
- Self-hosted gateway without account
- Privacy/compliance use case
- Enterprise demand signal

---

**Tổng kết:** Hệ sinh thái 2-tier rõ ràng. Enterprise tier (Hermes, OpenClaw) consolidating sau big changes. Mid-tier (QwenPaw, NanoBot, Zeroclaw) velocity cao nhưng stability varies. Early-tier stagnant. Hermes vị trí leader về maturity và community, OpenClaw aggressive về refactor, QwenPaw risk về quality. Xu hướng: Gateway abstraction, SQLite pain, provider fragmentation, security hardening.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw ngày 2026-10-18

## 🎯 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào refactoring hạ tầng (30 PRs mới) và xử lý bugs nghiêm trọng về SQLite corruption, plugin capture disk wear, và realtime Talk session issues. Cộng đồng report nhiều vấn đề Android app và authentication.

---

## 📦 Releases

Không có releases trong 24h qua.

---

## 🚀 Tiến độ dự án

### PRs mới (30 PRs, chủ yếu refactoring)

**Cleanup & Tech Debt:**
- #175980 - Consolidate private helpers về owners (XL)
- #175975 - Xóa low-value tests (XL)  
- #175993 - Retire legacy session-group downgrades
- #175988 - Xóa unused fixture helpers
- #175960 - Trim redundant comments

**Bug Fixes:**
- #175984 - Update crashes khi git checkout gặp sqlite-maintenance lock (P2)
- #175714 - CLI attach crashes với invalid grant expiry timestamp (P2)
- #175642 - Heartbeat bỏ sót targeted system events (P1)
- #175946 - Telegram reactions không route đúng topic sessions (P2)
- #175976 - Guests không review được changes trong coding chats

**Infrastructure:**
- #175970 - Simplify native resource close ownership
- #175967 - Remove mirrored ingress owner (mcp-events plugin)
- #175948 - Keep UI panels/terminals qua reconnects (fix tear-down on disconnect)

**New Features:**
- #175509 - Bifrost provider + allow anonymous self-hosted gateways (P2)

### Xu hướng

Đợt refactoring lớn (wave-6): tách private helpers, xóa redundant abstractions, consolidate ownership. Codebase cleanup với focus vào maintainability. Không có breaking changes cho users.

---

## 🔥 Điểm nổi bật cộng đồng

### Top Issues (theo comments)

1. **#157989** (19 comments, 🐚 platinum) - **Plugin capture ghi 1.1-6.5GB mỗi lần start Gateway** - no reuse, bundled native binaries → severe SSD wear. Regression từ 2026.9.5.

2. **#121953** (14 comments, 🦪 silver) - **Cron agent stall với DeepSeek** - user message prefix `[cron:<jobId>]` bị deprioritize bởi API edge → tens of seconds delay.

3. **#158390** (13 comments, 🦞 diamond, +1👍) - **plugin-captures tmp dirs không GC** - disk fills indefinitely, multi-GB accumulation.

4. **#164799** (13 comments, 🦪 silver) - **Version change → agents admit 1-by-1 hàng phút** past ready, unconfigured system-agent DB refused → readyz 503 until restart.

5. **#131768** (12 comments, 🦪 silver, +1👍, stable maturity) - **Android Talk drops session khi agent dùng tools** - playback silent, listening stops. Discord voice dùng làm fallback.

### Community Pain Points

- **Android app quality**: Talk drops (#131768), realtime reuses archived sessions (#175027)
- **Plugin disk usage**: capture rewrites (#157989), tmp dir accumulation (#158390)  
- **DeepSeek-specific issues**: cron stalls (#121953)
- **Matrix E2EE**: stops decrypting sau session rotation (#123354)
- **Windows EPERM**: skills install still fails (#120377)

---

## 🐛 Ổn định & Bugs

### Critical (P0-P1)

**Data Corruption:**
- #123327 (P0) - **SQLite WAL checkpoint copies index pages qua page 1** trên local ext4 (Raspberry Pi 5 NVMe) - database header destroyed

**Disk/Resource:**
- #157989 (P1) - Plugin capture rewrites 1.1-6.5GB mỗi command/gateway start
- #158390 (P1) - plugin-captures tmp dirs không cleanup
- #159638 (P1, +1👍) - Gateway boots 7 SQLite workers/min (512MB each), 80% CPU idle

**Session/State:**
- #175027 (P1) - Android Talk reuses archived session, rejects GPT-Live consults
- #121823 (P1) - Memory-core dreaming parks event loop minutes→90min, healthz dark
- #123596 (P1) - Slow agent consult reply sau OpenAI Realtime turn error → voice hears "no reply"

**Cron/Automation:**
- #121953 (P1) - Cron stalls với DeepSeek prefix deprioritization
- #120385 (P1) - Code Mode tool catalog incomplete cho scheduled/cron turns

### Medium (P2)

- #162448 - Linux desktop app buttons overlap sidebar controls (regression)
- #143017 - Prompt-cache rewrites: 254 rewrites cost 21.31M tokens
- #122625 - Matrix room targets cannot resolve session route
- #137188 - Stale session progress card renders với live spinner

### Patterns

- **SQLite reliability issues** trên FUSE/network storage và local ext4
- **Disk space exhaustion** từ plugin infrastructure
- **Android realtime instability** 
- **Provider-specific quirks** (DeepSeek cron, VLLM context)

---

## 💡 Yêu cầu tính năng

### Accepted/In Progress

- #175509 (PR merged) - Bifrost provider + anonymous self-hosted mode
- #173518 (P2) - Select web-search provider per isolated automation
- #120179 (P2) - Local mic mute control cho live calls
- #101857 (P3, +1👍) - Telegram ForceReply prompt khi command cần args

### Design Discussions

- #120244 (P3) - Cron maintenance window với role isolation (follow-up #79192)
- #119992 (P2) - Per-turn send budget cho message tool (duplicate-answer storms)
- #1754 (closed, 4 comments) - Add `computer` tool cho agentic UI automation (Cua integration)

---

## 🗣️ Phản hồi người dùng

### Pain Points

**Android App (stable maturity nhưng nhiều bugs):**
- Talk drops mid-session (#131768) → users fallback sang Discord voice
- Realtime reuses archived sessions (#175027)
- Double rendering với CLI backends (#123792)

**Developer Experience:**
- Windows skills install EPERM (#120377) - vẫn chưa fix sau #88143
- Guests không review được own coding chats (#175976 - fixed today)
- Linux desktop UI regression (#162448) - buttons overlap

**Infrastructure:**
- Plugin system gây severe SSD wear (#157989)
- SQLite corruption trên Pi 5 (#123327)
- Memory-core dreaming parks event loop (#121823)

### Positive Signals

- Bifrost provider PR (#175509) - community-requested feature
- Active bug triage: nhiều issues được categorize và prioritize
- Test cleanup campaign - improving maintainability

---

## 📋 Backlog & Roadmap

### Immediate (từ PR activity)

**Wave-6 Refactoring (đang diễn ra):**
- Consolidate private helpers về owners
- Remove redundant abstractions
- Test suite cleanup (batch d248, d249)
- Simplify ownership patterns

**Blockers:**
- #157989 (P1) - Plugin capture disk wear - cần fix trước khi scale
- #123327 (P0) - SQLite corruption - data safety critical
- #158390 (P1) - Plugin tmp cleanup - disk exhaustion risk

### Near-term (từ issue labels)

**clawsweeper:queueable-fix** (8 issues):
- #175027, #158390, #123557 - shape rõ, có thể queue

**clawsweeper:linked-pr-open** (9 issues):
- Đã có PR draft, đang review

**Rating Distribution:**
- 🦞 diamond lobster: 16 issues (high impact, clear repro)
- 🦪 silver shellfish: 16 issues
- 🦐 gold shrimp: 5 issues
- 🐚 platinum hermit: 3 issues (rare/hard to repro)

### Long-term Concerns

- **Disk I/O optimization** - plugin infrastructure cần rework
- **SQLite reliability** - cần kiểm tra lại WAL implementation
- **Android stability** - Talk/realtime subsystem cần attention
- **Provider compatibility** - DeepSeek, VLLM edge cases

---

**Ghi chú:** 161 open issues, 500 PRs (30 mới hôm nay). Activity cao, focus vào stability và tech debt. Không có release pressure → good time cho cleanup.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-18

## 📊 Tóm tắt hôm nay

Ngày bận rộn với **8 PR merged** và **3 PR mới**. Trọng tâm: cải thiện Matrix channel (group policy mới), sửa bugs công cụ (web_search retry, file tools), refactor config/security. Không có release mới.

## 🚀 Releases

Không có releases.

## 📈 Tiến độ dự án

### PRs merged hôm nay (8)

**Matrix channel enhancements:**
- #6279: Rename topics inline trong sidebar (không dùng modal nữa)
- Đang pending: #6289 thêm "listen" policy (bot đọc nhưng chỉ reply khi mention), #6287 per-room policy override

**Bug fixes quan trọng:**
- #6281: Fix search activity summaries không bị wrap nhiều dòng
- #6276: Fix Markdown list bị flatten khi có link
- #6277: Fix mention overlay spacing với caret
- #5875: **Thêm IO Intelligence provider** (io.net) - contribution chính thức từ đối tác

**Infrastructure/refactor:**
- #6278: Dedupe model request preparation code
- #6275: Move CLI Apps PATH scan ra khỏi event loop (fix blocking)
- #6274: Preview Markdown files với source toggle

### PRs đang active (quan trọng)

**Security & config refactor (P1/P2):**
- #6269 ⚠️: Tách config reads khỏi network policy activation (security critical)
- #6268: Bind media read roots lúc construction (không dùng global config)
- #6267: Bind plugin approval/activation to instance owner

**Tool improvements:**
- #6290: Retry DuckDuckGo rejections với exponential backoff (#6285)
- #6284: `apply_patch` nhận top-level path (không lặp mỗi edit)
- #6254: Accept integral JSON numbers (3.0) cho integer params
- #6253: Truncate Unicode upload names theo filesystem byte limit
- #6270: Preserve paragraph separators trong streamed reasoning
- #6197: Case-insensitive image media types
- #6097: Skip chart-only XLSX sheets
- #6140: `read_file` number lines by `\n` như `edit_file`

**Update system:**
- #6168: Managed installs + recoverable updates (chưa merge, đợi review)
- #6280: Close revalidation gaps (follow-up #6168)

**Config & settings:**
- #6271: Settings store owns read-modify-write transactions
- #6261: Unify instance storage under home

**Providers:**
- #6283: Fix DeepSeek model capabilities alignment

## 🔥 Điểm nổi bật cộng đồng

**Issue #6288** (mới hôm nay): Request "listen" group policy cho Matrix
- User muốn bot observe room nhưng chỉ reply khi mention
- Hiện tại `mention` policy drop messages → bot mất context
- PR #6289 implement ngay trong ngày

**Issue #6286**: Request per-room group policy override cho Matrix
- Hiện tại groupPolicy áp dụng toàn channel
- Napcat đã có feature này
- PR #6287 implement parity

**Issue #6079** (từ 10/05): Enhancement request - agents observe group messages
- Broader problem: distinguish receiving vs processing vs replying
- Liên quan #6288

## 🐛 Ổn định & Bugs

**Fixed hôm nay:**
- Web search DuckDuckGo fail liên tục (no retry) → #6290 thêm retry logic
- Link previews phá list semantics → #6276
- CLI Apps scan block HTTP requests → #6275
- Mention overlay spacing lệch với native caret → #6277

**Đang fix:**
- Matrix HTML formatting lost trong edits (#6138)
- SSE Responses drop reasoning_text events (#5833, closed hôm nay)
- Case-sensitive image Content-Type (#6197)
- XLSX chartsheet crashes (#6097)
- Line numbering mismatch read_file vs edit_file (#6140)

**Security fixes đang review:**
- CLI Apps install provenance + registry drift protection (#5866)
- Config/network policy separation (#6269)
- Media root binding (#6268)

## 💡 Yêu cầu tính năng

**Matrix enhancements (high demand):**
- ✅ Inline topic rename (merged #6279)
- 🔄 "Listen" group policy (#6288 → PR #6289)
- 🔄 Per-room policy overrides (#6286 → PR #6287)

**Tool improvements:**
- Top-level path trong apply_patch (#6284)
- Markdown file preview (#6274, merged)

**Update system:**
- Managed installs (#6168, đang review)

## 👥 Phản hồi người dùng

- Matrix users cần flexible group policies (2 issues + 2 PRs trong ngày)
- Web search reliability concerns (#6285 → fix nhanh #6290)
- UX improvements appreciated (inline rename, no modal interrupts)

## 🗓️ Backlog & Roadmap

**Priority P1:**
- Config/security refactor (#6269)

**Priority P2 (active):**
- Matrix group policy improvements (2 PRs pending)
- Tool fixes (6+ PRs active)
- Update system finalization (#6168, #6280)
- Test coverage improvements (#6282 merged)

**Conflicts noted:**
- Multiple PRs có conflict tags → cần rebase sau config refactor

**Architecture evolution:**
- Move từ global config → instance-bound resources
- Separation of concerns (config vs policy, read vs activation)
- Better security boundaries

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-18

## 📊 Tóm tắt hôm nay

Zeroclaw chuẩn bị phát hành **v0.8.6** với bump version PR đã lên (#11835). Tập trung vào ổn định plugin system, sửa 5 bug security/sandbox (shell command parsing lỗ hổng), fix macOS CI trước deadline 19/10. Hoạt động cao: 17 issues, 50+ PRs, nhiều fix critical từ cộng đồng.

---

## 🚀 Releases

**v0.8.6 đang chuẩn bị** (#11835 - version bump PR):
- Plugin system chính thức ship trong release artifacts (#11347 merged)
- Plugin update command với signature verification (#11262 merged)
- Runtime Phase 2 hoàn tất theo tracker #7432
- macOS notarization + JIT entitlement cho plugins cần verify (#11829)
- Docker arm64 build OOM fix (#11833)

**Chưa ship**: Gateway Phase 3 (v0.9.0), plugin support trong macOS desktop app chưa confirm hoạt động.

---

## 📈 Tiến độ dự án

### PRs quan trọng merged gần đây:
- **#11347**: WASM plugin host vào release binaries (XL, risk:high) ✅
- **#11262**: `zeroclaw plugin update` command với rollback (#10995 requirement) ✅
- **#11221**: Built-in tool opt-in setting `[tools].optional` (đang review, 30+ comments)

### PRs đang active:
- **#11822** (tidux): Fix shell command scanner bỏ sót substitution/subshell boundaries → 3 bug reports (#11823, #11824, #11825) từ security audit
- **#11805** (VladimirLewisII): Windows named-pipe server verification trước authorization edits
- **#11301** (IftekharUddin): Agent rename recovery share across CLI/gateway/RPC (stale state bug)
- **#10446** (mov-xound-glitch): Reject tool-call envelopes leaked vào prose thay vì render (provider transport security)

**Xu hướng**: Security hardening (5 PRs về policy/sandbox), Windows stability, plugin infrastructure finishing touches.

---

## 🔥 Điểm nổi bật cộng đồng

### Issues nhiều tương tác:
- **#7432** (tracker): Runtime Phase 2 + Gateway Phase 3 delivery - 10 comments, P2 priority
- **#11706** (shadowncs): Multimodal bug - vision route never releases sau khi image strip theo `max_image_turns`. PR fix #11716 đã lên.

### PRs từ contributors:
- **@tidux**: 3 security bugs về shell parsing phát hiện + fix trong 1 ngày (#11822, #11823, #11824)
- **@VladimirLewisII**: Windows daemon isolation (#11827 - job object với kill-on-close)
- **@RustLangLatam**: Android SELinux fix (#11826), email channel auto-reply loop prevention (#11750)

---

## 🐛 Ổn định & Bugs

### Critical/High severity:
1. **Shell command injection surfaces** (#11823, #11824): Scanner miss heredoc substitution + cmd.exe parenthesized blocks. PR #11822 fix.
2. **Windows daemon orphan processes** (#11827): Không có process tree containment, daemon spawn leaked. Fix bằng job object.
3. **Android secret key creation fails** (#11826): SELinux deny `link(2)`, key publish dùng hard link. Migrate sang `renameat2`.

### Medium/Low:
- Plugin config changes không reach running daemon (#11820 - P2)
- Quickstart list models trước khi có URI (#11819 - P3, UX)
- Rust 1.99 clippy warnings - 18 new findings (#11834 - CI chưa fail vì pin 1.98)

---

## ✨ Yêu cầu tính năng

Không có feature request mới trong 24h. Features đang implement:
- **Tool elicitation hints** (#10325): Pre-turn hints cho model, default off
- **Delegate workspace isolation** (#10391): Bounded delegate keep tool ceiling/policy beyond turn
- **Anthropic OAuth** (#9420): Stored OAuth profiles thay vì API key

---

## 💬 Phản hồi người dùng

### Trải nghiệm tích cực:
- Distinguished contributors active: @Audacity88, @IftekharUddin, @mov-xound-glitch (nhiều XL PRs merged)
- Community security audit hiệu quả (tidux phát hiện 3 bugs 1 ngày)

### Pain points:
- **Plugin UX rough edges**: Signature mode strict report unsigned package "not installed" (#11817)
- **Config mutation lag**: `config set` plugin settings không apply realtime (#11820)
- **Windows stability**: Nhiều Windows-specific bugs (named pipe, daemon isolation, path length)

---

## 🗺️ Backlog & Roadmap

### v0.8.6 blockers (trước 19/10):
- [ ] macOS CI migration macos-14 → macos-15 (#11831, #11832) - GitHub brownout 19/10
- [ ] Docker arm64 OOM fix (#11828, #11833)
- [ ] macOS desktop plugin verification (#11829)

### v0.8.7 (next):
- Config set realtime apply (#11820)
- Plugin discovery UX improvements (#11817, #11819, #11821)
- Test cleanup (#11806, #11830)
- ZeroCode cost warnings (#11692)

### v0.9.0 (Phase 3):
- Gateway separation hoàn chỉnh (tracker #7432)
- Plugin webhook ingress migration (#11319)

**Risk**: v0.8.6 có thể ship không có dist image nếu arm64 không fix kịp (#11828).

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo Hệ sinh thái PicoClaw - 2026-10-18

## 1. 📊 Tóm tắt hôm nay

Ngày im lặng cho PicoClaw. Không có hoạt động mới - chỉ có bot tự động đóng 2 mục cũ (issue #3415 và PR #3414) do stale sau 15+ ngày không phản hồi.

## 2. 🚀 Releases

Không có.

## 3. 📈 Tiến độ dự án

**PR #3414 [CLOSED]** - Turn time budget  
- Tác giả: @racso2609
- Thêm giới hạn thời gian wall-clock cho mỗi turn của agent
- Config: `agents.defaults.turn_time_budget_seconds` (mặc định = 0, tức tắt)
- Khi vượt giới hạn → agent dừng schedule tool mới, tóm tắt công việc đã làm
- Đóng do stale, không merge → tính năng chưa được chấp nhận

**Issue #3415 [CLOSED]** - Nginx reverse proxy support  
- Tác giả: @altman08
- Yêu cầu: hỗ trợ mount Web Console vào subpath (ví dụ `/pico/`) thay vì root
- Vấn đề: frontend/backend hardcode path gốc (`/api/`, `/launcher-login`, `/pico/ws`)
- Đề xuất: thêm tham số startup để config base path
- Đóng do stale, chưa có maintainer phản hồi

**Xu hướng**: Maintainer không tương tác với cả 2 đóng góp. Có thể đang tập trung vào nhánh phát triển nội bộ hoặc tạm ngưng merge PR từ cộng đồng.

## 4. 💬 Điểm nổi bật cộng đồng

Không có tương tác nào. Cả 2 mục đều có 0 reactions, ít comment (issue có 2 comment, PR không rõ số lượng nhưng không có activity).

## 5. 🐛 Ổn định & Bugs

Không có bug report mới trong ngày. Issue #3415 đề cập vấn đề kỹ thuật (hardcoded path) nhưng không phải bug mà thiếu tính năng.

## 6. ✨ Yêu cầu tính năng

**Reverse proxy support** (#3415):
- Use case thực tế: deploy nhiều service trên cùng domain
- Cần thiết cho enterprise deployment
- Chưa được maintainer xem xét

**Agent timeout control** (#3414):
- Kiểm soát thời gian thực thi mỗi turn
- Tránh agent loop vô hạn
- Chưa được merge, có thể maintainer thấy không cần thiết hoặc có cách giải quyết khác

## 7. 👥 Phản hồi người dùng

Không có feedback mới. Cộng đồng im lặng - có thể dự án đang trong giai đoạn ổn định hoặc base người dùng nhỏ.

## 8. 🗓️ Backlog & Roadmap

Không có thông tin. Cả 2 đóng góp bị đóng do stale cho thấy:
- Team có thể không theo dõi GitHub sát sao
- Hoặc đang ưu tiên internal roadmap
- Cần maintainer công bố kế hoạch rõ ràng hơn để contributor biết hướng đi

---

**Kết luận**: Ngày không hoạt động. Dự án có vẻ thiếu engagement với cộng đồng. Contributor nên chờ maintainer signal trước khi đầu tư thời gian vào PR mới.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-18

## 1. Tóm tắt hôm nay

Không có release mới. Team tập trung vào 3 mảng: **Telegram bot-to-bot** (ngăn reply loop khi bật B2B mode), **template library** (tạo agent từ template trực tiếp trong chat), **channels hardening** (Discord approval bug, SQLite lock, proxy support).

---

## 2. Releases

Không có.

---

## 3. Tiến độ dự án

### Template & Agent Creation
**#4112** - Tạo agent từ template trong chat  
Trước: `create_agent` chỉ tạo blank agent, template chỉ dùng từ terminal.  
Sau: Agent có thể gọi skill tạo agent khác từ public library hoặc local template. Skill tự list template, clone, merge persona.

**#4113** - Template library picker đọc `index.json`  
Trước: shallow-clone repo rồi scan `plugin.json` → chậm, dư thừa.  
Sau: Đọc `index.json` trước, chỉ fetch manifest khi cần.

### Telegram Bot-to-Bot
**#4111** - Doorman gate chặn bot-to-bot loop  
Problem: Bật BotFather B2B → bot khác ping agent → agent trả lời → bot ping lại → loop vô hạn.  
Fix: `TELEGRAM_BOT_INBOUND` allowlist peer bot username, chặn non-member. Kèm reply-to-me + forum-anchor check.

**#4115** - Đăng ký policy adapter phần Telegram  
Trunk doorman cần data từ adapter: bot username, reply context, forum info. PR này wire vào channel adapter.

**#4116** - Skill `/add-b2b-peer` setup peer bot  
Walkthrough toàn bộ: BotFather config, allowlist, peer-id discovery, `ncl members add`.

**#3601** - Detect reply to current bot  
Resolve bot username qua `getMe`, check reply target match exactly.

### Channels & Infrastructure
**#4117** - Fix Discord approval ghi sai reject  
Cause: `custom_id` encode `<actionId>\n<value>`, approval handler không strip suffix → value mismatch → ghi reject.

**#4101** - SQLite `busy_timeout` trước `journal_mode`  
Fix `database is locked` khi mở `outbound.db` lần đầu. bun:sqlite mặc định `busy_timeout` 0, set nó trước khi đọc schema.

**#3923** - Discord Gateway qua HTTPS proxy  
Problem: `NODE_USE_ENV_PROXY` work cho REST, nhưng Gateway dùng `undici` không respect env proxy.  
Fix: Inject `ProxyAgent` vào `@discordjs/rest`, forward vào `@discordjs/ws`.

**#4042** - Bump Resend adapter 0.3.0  
`0.1.1` kéo `uuid@10.0.0` có 4 moderate advisory. Pin `0.3.0` clean.

**#1938** - macOS launchd PATH thiếu `/opt/homebrew/bin`  
Apple Silicon Homebrew install vào `/opt/homebrew/bin`, launchd plist hardcode PATH thiếu path này → `node`, `container` không tìm thấy.

### Core
**#3786** - Typing indicator theo runner turn state  
Trước: Đoán từ heartbeat file.  
Sau: `ContainerRecord` có `turn: 'working'|'idle'|null`, `container_state` event emit, typing indicator sync trực tiếp.

**#4106** - Gateway credential target 1 path  
Cursor swap key mid-flight trên cùng host. Cần scope credential theo path, không chỉ host.

---

## 4. Điểm nổi bật cộng đồng

Không có comment/vote nổi bật. Core team tự drive.

---

## 5. Ổn định & Bugs

- **Discord approval bug** (#4117): Approve click ghi thành reject → fixed
- **SQLite lock** (#4101): First `outbound.db` open fail → fixed
- **Telegram reply detection** (#3601): Không nhận reply to bot → fixed
- **macOS Homebrew PATH** (#1938): launchd không tìm thấy binary → pending
- **Discord Gateway proxy** (#3923): Gateway không qua proxy → pending

---

## 6. Yêu cầu tính năng

- **Bot-to-bot admission** (#4111, #4115, #4116): Infrastructure để control Telegram bot peer, tránh loop.
- **Template in chat** (#4112, #4113): Tạo agent từ template không cần terminal.
- **Path-scoped credential** (#4106): Cursor case cần scope credential tới path, không chỉ host.
- **Turn state visibility** (#3786): Typing indicator + status text real-time.

---

## 7. Phản hồi người dùng

Không có issue/comment từ end-user. Tất cả PR từ core team.

---

## 8. Backlog & Roadmap

Không có roadmap rõ ràng. Trend hiện tại:
- **Telegram production-ready**: B2B gate, reply detection, peer management.
- **UX improvement**: Template picker, turn visibility.
- **Infrastructure hardening**: SQLite lock, proxy support, credential scope.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo phân tích NullClaw - 2026-10-18

## 1. Tóm tắt hôm nay

Hoạt động im ắng. Không có issue, release hay merge mới. Duy nhất PR #1013 đang chờ review, thêm provider Tsubasa vào danh sách OpenAI-compatible.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR #1013** - Thêm Tsubasa provider (đang mở từ 2026-09-28):
- Tích hợp vào OpenAI-compatible factory
- 2 model public, context 32K token, output budget mặc định 8K
- Chọn provider qua biến môi trường `TSUBASA_API_KEY`
- PR mở 20 ngày chưa merge - có thể đang chờ test hoặc review cuối

**Xu hướng**: Mở rộng danh sách provider LLM. NullClaw định hướng multi-provider, giảm phụ thuộc nhà cung cấp đơn lẻ.

## 4. Điểm nổi bật cộng đồng

Không có tương tác mới. PR #1013 có 0 reaction, không có bình luận - khả năng team nhỏ hoặc đợi batch review.

## 5. Ổn định & Bugs

Không có báo cáo bug mới trong 24h qua.

## 6. Yêu cầu tính năng

Không có feature request mới. PR #1013 là thêm provider, không phải yêu cầu từ issue.

## 7. Phản hồi người dùng

Không có feedback trực tiếp từ cộng đồng trong khung thời gian này.

## 8. Backlog & Roadmap

Không có thông tin roadmap từ dữ liệu cung cấp. PR #1013 chờ merge là công việc tồn đọng duy nhất nhìn thấy được.

---

**Nhận xét**: Ngày yên tĩnh. Dự án có thể đang trong giai đoạn ổn định, tập trung phát triển nội bộ thay vì hoạt động công khai. PR provider mở lâu chưa merge cho thấy chu kỳ review chậm hoặc chờ tích lũy thay đổi trước khi release.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-10-18

## 📊 Tóm tắt hôm nay

Không có release. Team tập trung fix lỗi nghiêm trọng: media blocks (audio/video) wedge sessions vĩnh viễn, v2.2.2 regressions gây UI freeze và crash backend. 15 PRs mở (10 fixes, 1 HarmonyOS client), 9 issues mới (8 bugs, 1 feature preview).

---

## 🚀 Releases

Không có.

---

## 📈 Tiến độ dự án

### PRs quan trọng đang review:

**Critical fixes (cần merge gấp):**

- **#8299** - Stop emit video parts khi provider không support → fix #8298 (422 schema error wedge session)
- **#8215** - Recognize LM Studio "At most 0 audio" rejection → fix #8171 (audio wedge)
- **#8291** - Require non-empty API key cho ReMe reranker → prevent silent failures
- **#8295** - Hide injected context blocks (`<system-notification>`) ở channel output → không leak internal markers cho users

**v2.2.2 regressions:**

- **#8294** - Fire `workspace_created` hooks on agent reload (#8281) → fix runtime hooks không chạy khi hot-reload
- **#8287** - Fix thinking slider fill + save flicker (#8286) → UX polish
- **#8292** - Sanitize malformed file content parts thiếu `file_id` (#8280) → prevent 400 errors

**Infrastructure improvements:**

- **#8297** - Upgrade ReMe + isolate memory watchers → tách thread pool khỏi HTTP handlers, giảm contention
- **#8034** - Bound inline media **per request** (not per file) → prevent multi-MB request bodies crash gateways
- **#8231** - Persist market install provenance → "Update All" cover third-party plugins (#8176)

**Backlog:**

- **#7211** - Prevent injected context persist (Under Review, 8 tháng) → cần design decision
- **#7654** - Recognize llama-server/DashScope URL audio rejections (PR 5 tuần, chưa merge)

### Platform expansion:

- **#8164** (XXXL) - HarmonyOS native client (ArkUI/ArkTS) → không dùng WebView, pure native

---

## 🔥 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

1. **#8278** (4 comments) - DingTalk channel >3500 chars tự động downgrade thành plain text → tables/markdown fail. User complaint: "恰恰是最需要表格渲染的长回复，恰好会掉进纯文本区"
2. **#8171** (5 comments) - Audio wedge bug, documented family (related #7015, #7654)

### Pain points chính:

- **Media handling bugs**: 4 issues về audio/video wedge sessions (#8171, #8298, #8290, #8293)
- **v2.2.2 regressions**: 3 issues (#8300 input không clear, #8288 UI freeze + SIGBUS crash, #8286 slider UX)
- **Channel limitations**: #8278 DingTalk 3500-char hard limit break tables

---

## 🐛 Ổn định & Bugs

### Critical (wedge sessions):

1. **#8298** - `send_file_to_user` video → 422 `unknown variant video_url` → session death
2. **#8171** - Audio file → LM Studio "At most 0 audio(s)" → không match classifier → wedge
3. **#8290** - Media blocks → "At most 0 video" + "text content only" → miss cả 2 classifiers
4. **#8293** - `<system-notification>` blocks leak vào channel output như assistant text

**Root cause pattern**: Media-capability + media-payload classifiers thiếu rejection shapes → fallback không trigger → request loop fail vĩnh viễn.

### High severity (v2.2.2):

- **#8288** - Switch vào large stream conversation → UI freeze lâu + backend SIGBUS crash (v2.2.1 OK)
- **#8300** - Send button OK nhưng input box không clear → confuse users

### Medium:

- **#8286** - Thinking slider fill misleading (full rail colored ở Low)
- **#8278** - DingTalk >3500 chars silent downgrade → markdown/tables fail
- **#8280** - Missing `file_id`/`file_data` → OpenAI 400 error
- **#8281** - Runtime hooks không fire on agent reload
- **#8276** - ReMe reranker enabled với empty API key → silent fail
- **#8194** - Windows stale PID probe raise `SystemError` → crash startup

---

## 💡 Yêu cầu tính năng

**#8289** - Feature preview: v2.3.0 plugin refactor

**Mục tiêu:**
- Lighter core (tách heavy deps thành plugins)
- Extensible architecture
- Giảm installation size + startup time

**Kế hoạch:**
- Core slim: basic agent + chat models + essential tools
- Optional plugins: advanced tools, specialized providers, UI components
- Plugin API stable + versioned

Team mời community feedback trước khi implement.

---

## 💬 Phản hồi người dùng

### Positive:

- Community engage tích cực: 10 PRs từ 10 contributors khác nhau trong 24h
- First-time contributors active (#8291, #7211)

### Negative:

- **v2.2.2 quality regression** - Multiple users report crashes, UI bugs so với v2.2.1
- **Media handling frustration** - 4 wedge bugs cùng lúc → agent workflows break
- **DingTalk users** (#8278) - "数据报表场景影响最大" → business use case blocked

### User quotes:

> "用户体感是'点了发送但消息停留'" (#8300)  
> "恰恰是最需要表格渲染的长回复，恰好会掉进纯文本区" (#8278)

---

## 🗺️ Backlog & Roadmap

### Immediate (0-7 days):

- Merge critical wedge fixes (#8299, #8215, #8291, #8295)
- Merge v2.2.2 regression fixes (#8294, #8287, #8292)
- Release v2.2.3 hotfix

### Short-term (2-4 weeks):

- v2.3.0 plugin refactor (#8289) - architecture design + community feedback
- HarmonyOS client (#8164) review + merge
- Close media-handling bug family (#8290, #7654)

### Medium-term:

- DingTalk channel improvement (#8278) - split_text reuse or chunking strategy
- Injected context architecture (#7211) - 8-month-old PR cần decision

### Long-term backlog:

- Memory system optimization (#8297 làm nền tảng)
- Per-request media bounds (#8034)
- Plugin marketplace provenance tracking (#8231)

---

**Status**: Team ưu tiên stability trước features. v2.2.2 regressions + media wedges là P0.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*