# Bản tin Hệ sinh thái Hermes Agent 2026-10-10

> Issues: 100 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-10 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-10

## 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa bug nghiêm trọng: update mechanism trên macOS/Windows bị lỗi, context compaction gây duplicate messages, và caching bị reset không đúng. Desktop app cần nhiều fix về performance + UX.

## 🚀 Releases

Không có release mới trong 24h qua.

## ⚙️ Tiến độ dự án

### PRs hot nhất:

**#135847** - Switch update channel sang `stable` releases thay vì theo `main` commit
- macOS Desktop update button fail exit code 2 vì lock mechanism sai (#133992, #134185)
- Bot giờ follow tagged releases chứ không fetch HEAD liên tục
- Breaking: desktop users phải opt-in `--set-channel main` để giữ bleeding-edge

**#135918** - Preview editor giữ unsaved edits khi agent write file / switch chat
- Lấy pattern từ Claude Cowork (v2.31226)
- Edits persist cross-session, ask before close tab
- Fix UX friction: users mất draft mỗi khi agent update file

**#128757** - Model switch trên large session (309K token) cost transparency
- Prefill 220s cold vs 8-25s warm (#126068)
- PR chưa fix latency, chỉ show upfront cost warning
- Cache identity block vẫn chưa move out

**#130053** - Codex auxiliary calls bị wrong credential pool
- OAuth model entitlement 400 → per-model cooldown recorded wrong credential
- Auxiliary không pass resolved model → pool.select chọn sai account

**#135697** - `hermes mcp serve` spawn hết configured MCP servers lúc startup
- Perf regression: CLI gate check sai → every server init trước khi cần
- Giờ lazy-load per request

### Issues nhiều comment:

**#133992** (24💬) - macOS Desktop update refuses own lock, exit 2
- Regression #78119/#87514
- Bash-quantized delegate timestamp hiểu nhầm own PID là custodian
- Update mechanism cần refactor

**#131859** (17💬) - API create PR fail permission error, fork PRs OK
- Specific account only, CreatePullRequest scope đúng nhưng API reject
- Không repro được với other accounts → auth edge case

**#124794** (11💬) - tree:0 partial clone + git <2.44 spawn recursive fetch processes
- No process group isolation → unbounded fork bomb
- 8GB ARM box swap exhausted, load=49, killed gateway
- Updater network git calls cần proper subprocess containment

## 🔥 Điểm nổi bật cộng đồng

**#127621** (7💬, 7👍) - Desktop response render duplicate text
- Không phải model repeat, là frontend/streaming bug
- Xuất hiện thường xuyên sau context compaction

**#128293** (6💬) - Duplicate message rows post-compaction
- Byte-identical microsecond timestamps
- Giống #126021 nhưng không có delegation fan-out
- Core session state integrity issue

**#122413** (3💬, 1👍) - Desktop idle CPU 0.8 core trên M5
- Residual sau fix #88275/b9fea361ec
- Renderer burn CPU khi không làm gì

## 🐛 Ổn định & Bugs

### Critical (P0-P1):

**#122555** - PM activates wrong Python environment
- No ABI check → dependency env built for different interpreter
- Drops running interpreter's site-packages
- Data corruption risk

**#128293** / **#126021** - Session compaction duplicate messages
- Transcript integrity compromised
- Desktop shows wrong conversation history

**#135827** - `context_engine.py` crash Python 3.11-3.13
- Missing `from __future__ import annotations`
- Self-referential type hint break import

### High impact:

**#135594** - Multiplexed gateway: profile MCP allowlist ignored
- Security: read-only profile gets write tools từ default profile
- Same-name server configs collide

**#129097** - Terminal tool resolve to Hermes store Python
- `pip install` write into hash-verified store entry
- PATH pollution từ pm.activate()

**#99943** - Compressor window clamped to ollama_num_ctx cho cloud providers
- 1M window silently drop to 65K
- Config key semantics broken

## 💡 Yêu cầu tính năng

**#55287** (7💬, 3👍) - Desktop configurable chat width
- Fixed 48.75rem (~780px) regardless window size
- Users want adjustable max-width

**#87574** (3💬) - Animated desktop avatar plugin
- WIP companion plugin with SDK
- Looking for feedback + contributors

**#135867** (2💬) - Phone→Tailscale→gateway patterns
- Field report: Android phone → Windows 11 PC gateway production
- 5 proven patterns documented
- Boot race, firewall, wrapper migration, Termux work node

**#103965** - Per-task profile routing (delegate)
- Model/host/memory routing per child task
- Enable multi-persona delegation (specialized agents)

## 📢 Phản hồi người dùng

**Positive:**
- Desktop updates following stable releases instead of HEAD (#135847) - cleaner upgrade path

**Pain points:**
- Update mechanism broken trên macOS (#133992) + Windows (#134960, #122956)
- Context compaction reliability issues causing duplicate messages
- Desktop performance: idle CPU burn, session list scan expensive (#119403)
- Termux Android: playwright dependency blocking installs (#128831, #126194)

**Platform-specific:**
- **Windows**: UTF-8 .ps1 no BOM breaks PowerShell 5.1 Chinese locale
- **Android/Termux**: google-meet/playwright không có distribution
- **macOS**: Desktop update hand-off refuses own process lock

## 📋 Backlog & Roadmap

### Gần term (đang active PRs):

1. **Update mechanism overhaul** - macOS/Windows fixes + stable channel
2. **Desktop preview editor persistence** - unsaved edits survive agent writes
3. **Session compaction reliability** - fix duplicate message bugs
4. **MCP tooling** - lazy server init, profile allowlist isolation
5. **Cron UX** - time pickers, job copy, recipe customization (#135894, #135917)

### Medium term (planned/discussed):

- **Token cost transparency** - pre-switch cache cost warnings
- **Profile-aware delegation** - per-task model/host routing
- **Platform gates** - proper android/windows conditional dependencies
- **Gateway reconnect** - SSH backend leak fix, auto-cleanup detached processes

### Dependencies blocking:

- Python 3.14 compat: pilk + playwright resolution (#126194)
- npm audit: brace-expansion, undici, vitest, yaml upgrades (#129426)
- git <2.44: tree:0 partial clone subprocess containment (#124794)

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-10

## 1. 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **stabilization phase** sau đợt growth 2026.9. Các dự án chính focus vào:

**Infrastructure maturity** - Hermes, OpenClaw, ZeroClaw xử lý critical bugs về memory leak, process lifecycle, auth timing. Production deployment issues lên top priority.

**Platform reliability** - Windows-specific bugs chiếm 40% P0/P1 issues (SQLite WAL growth, update mechanism, process isolation). Mobile/embedded platforms (Android, Termux, embedded devices) gặp friction về dependencies + resource constraints.

**Developer experience** - Refactor codebase architecture (session state ownership, config systems, tool execution boundaries). Cleanup technical debt accumulated từ rapid feature development trước đó.

**Community-driven projects stall** - NullClaw, IronClaw không hoạt động. PicoClaw maintenance mode với stale bot closing old PRs. Consolidation đang diễn ra: big projects survive, small forks die.

**Security issues emerge** - QwenPaw MCP Driver RCE (root compromise), ZeroClaw secret leaks, Hermes auth edge cases. Maturity brings scrutiny.

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Mức độ active | Cộng đồng |
|-------|--------|-----|----------|---------------|-----------|
| **Hermes Agent** | 100 | 500 | 0 | 🟢 Rất cao | Enterprise focus |
| **OpenClaw** | 105 | 500 | 0 | 🟢 Rất cao | Production users |
| **ZeroClaw** | 13 | 50 | 0 | 🟡 Cao | Behavioral testing |
| **NanoBot** | 12 | 33 | 0 | 🟡 Trung bình | Platform integration |
| **QwenPaw** | 19 | 35 | 0 | 🟡 Trung bình | CJK users |
| **PicoClaw** | 4 | 6 | 0 | 🔴 Thấp | Maintenance |
| **NanoClaw** | 2 | 13 | 1 | 🟡 Moderate | CalVer release |
| **NullClaw** | 0 | 0 | 0 | 💀 Dead | - |
| **IronClaw** | 0 | 0 | 0 | 💀 Dead | - |

**Metrics insight:**

- **Hermes/OpenClaw tier 1** - 500 PRs, 100+ issues, core team + external contributors active daily
- **Mid-tier projects** (NanoBot, ZeroClaw, QwenPaw) - focused scope, 30-50 PRs, community engagement moderate
- **Struggling** (PicoClaw, NanoClaw) - low community engagement, dependency bots dominant activity
- **Dead** (NullClaw, IronClaw) - no commits, issues, PRs 24h+

## 3. 🎯 Vị thế Hermes Agent

**Dominant player position:**

Hermes Agent = largest codebase, highest PR volume, most diverse feature set. Desktop app, CLI, gateway, multi-platform support, extensive model provider matrix.

**Market position:**

- **Target audience**: Enterprise developers + power users. Sophisticated workflows (delegation, cron, multi-agent orchestration).
- **Moat**: Desktop UX polish + stability investment. Native apps (macOS/Windows/Linux) difficult barrier cho competitors.
- **Pain point**: Complexity tax. Update mechanism bugs, platform-specific issues, resource usage high. Hard to deploy + maintain.

**Strategic challenges:**

1. **Windows stability debt** - Nhiều P0 bugs Windows-specific. macOS update mechanism broken. Platform fragmentation cost cao.
2. **Context management** - Compaction bugs cause duplicate messages, transcript integrity issues. Core reliability concern.
3. **Resource footprint** - Desktop idle CPU 0.8 core. Not suitable cho resource-constrained environments.
4. **Release discipline** - Không có stable release 24h. Fast-moving `main` branch gây instability cho production users.

**Competitive threats:**

- **OpenClaw** - Production-hardened alternative with similar feature set, better operational stability signals (SQLite maintenance, zombie process tracking).
- **Lightweight alternatives** (NanoBot, ZeroClaw) - Lower resource footprint, faster iteration, focused scope. Better fit cho specific use cases.

**Strengths:**

- **Feature completeness** - Broadest tool ecosystem, platform support, model provider integrations.
- **Investment depth** - 500 PRs signal sustained engineering resources.
- **Community momentum** - High issue engagement, external contributors.

## 4. 🔧 Hướng kỹ thuật chung

**Infrastructure patterns adopted across ecosystem:**

### Context management evolution

**Every major project** xử lý context window limits:

- **Hermes**: #128757 large session (309K token) cost transparency, cache identity block
- **OpenClaw**: #143524 SQLite WAL không checkpoint, #99943 compressor window clamped
- **ZeroClaw**: #11613 hidden reasoning tokens, #11166 batch image eviction

**Trend**: Window management shift từ naive truncation → intelligent compaction + cache optimization. Cost transparency requirements grow (upfront warnings, per-model accounting).

### Multi-agent orchestration

**Hermes** (#103965 per-task profile routing), **OpenClaw** (#43367 concurrent agents add), **ZeroClaw** (#11450 delegate worker recovery) = same problem space.

**Challenge**: Session state consistency khi multiple agents modify shared context. Approval routing, task handle preservation, artifact validation.

### MCP (Model Context Protocol) integration

**Hermes** (#135697 lazy server init), **NanoBot** (#6014 Keenable preset), **ZeroClaw** (#11473 deferred built-in tools) = MCP adoption wave.

**Pattern**: Gateway/server architecture với tool discovery via schema. Security concerns về allowlist enforcement, profile isolation.

### Platform-specific pain

**Windows**: SQLite WAL growth (OpenClaw #143524), update mechanism (Hermes #133992), UTF-8 encoding (Hermes PowerShell 5.1).

**Android/Mobile**: Playwright dependencies block installs (Hermes #128831), DNS resolution fail CGO builds (PicoClaw #3420).

**Embedded**: Resource constraints, no GUI dependencies available.

**Commonality**: Desktop/server focus trong development → mobile/edge afterthought. Dependency trees bloated.

## 5. 🎨 Điểm khác biệt

### Chiến lược phát hành

**Hermes/OpenClaw**: Fast-moving `main`, no stable releases. High velocity, high instability.

**NanoClaw**: v2026.10.0 = first CalVer release. Shift từ `main` tracking → stable channel. Maturity signal.

**Pattern**: Projects converge toward release discipline sau initial rapid development phase. User demand cho stability.

### Scope & focus

**Broad ecosystem play** (Hermes, OpenClaw):
- Multi-platform desktop apps
- Extensive model provider support
- Rich tool ecosystem
- Delegation, cron, orchestration
- **Tradeoff**: Complexity, resource usage, maintenance burden

**Focused alternatives**:

**NanoBot** - Chat platform integration specialist (WhatsApp, Slack, Telegram, QQ). WebUI + PWA. Conversation experience over power-user features.

**ZeroClaw** - Runtime + gateway architecture với behavioral safety focus. DefuzeX partnership signals security-first positioning.

**QwenPaw** - CJK language optimization, embedding/vector search, rich media handling (EXIF, audio understanding).

**PicoClaw** - Golang, embedded deployment, subpath mounting. Infrastructure focus.

### Cộng đồng dynamics

**Enterprise-driven** (Hermes, OpenClaw):
- High PR volume từ core team
- External contributors submit bug reports + small fixes
- Feature requests từ production deployment pain
- Low reaction counts on issues (internal roadmap driven)

**Community-driven attempts fail** (NullClaw, IronClaw):
- Không có sustained maintainer commitment
- Projects die quickly

**Regional focus** (QwenPaw):
- CJK-specific features (embedding chunking, GB18030 encoding)
- User reports in Chinese
- Localization priority

### Technical architecture

**Monolithic** (Hermes Desktop):
- Electron-based thick client
- Embedded gateway
- Local-first với cloud sync
- **Tradeoff**: Resource heavy, platform-specific bugs, update complexity

**Service-oriented** (ZeroClaw):
- Runtime + gateway separation (RFC #6954, tracker #7432)
- Conversation binding architecture
- Stateless design
- **Tradeoff**: Deployment complexity, network dependency

**Hybrid** (NanoBot):
- Chat adapter framework
- WebUI option alongside platform bots
- Config-driven provider routing
- **Tradeoff**: Less polish than native apps, more flexible deployment

## 6. 📈 Mức độ trưởng thành cộng đồng

### Tier 1: Enterprise-grade operations

**Hermes Agent, OpenClaw**

**Signals:**
- ✅ Issue triage với priority labels (P0-P3)
- ✅ Regression tracking, linked PRs
- ✅ Detailed reproduction steps in bug reports
- ✅ Performance profiling data (CPU %, memory growth, load averages)
- ✅ Platform-specific test matrices
- ✅ External contributor PRs reviewed + merged regularly

**Community health:** Core team responsive, external contributors feel heard. But: Internal roadmap dominant, feature requests từ production users chủ yếu.

**Bottleneck:** Review bandwidth. Many PRs đợi merge (dependency chains block, approval queues).

### Tier 2: Active development, growing pains

**NanoBot, ZeroClaw, QwenPaw**

**Signals:**
- ✅ Bug reports với reproduction steps
- ✅ Feature requests từ real use cases
- ⚠️ Lower reaction counts (1-7 👍 typical)
- ⚠️ Dependency bot PRs dominate activity
- ⚠️ Longer time-to-merge cho external contributions

**Community health:** Maintainers engaged nhưng bandwidth limited. Users persistent (follow-up comments), chờ fixes.

**Risk:** Burnout. Single maintainer bottleneck (NanoBot, QwenPaw patterns).

### Tier 3: Maintenance mode

**PicoClaw, NanoClaw**

**Signals:**
- 🔴 Stale bot closing old PRs/issues
- 🔴 Low engagement (0-2 reactions typical)
- 🔴 Critical bugs không fix nhanh (#3377 TLS expired 1 month)
- 🔴 External PRs open months không review

**Community health:** Users frustrated. Maintainer availability inconsistent. Projects risk abandonment.

### Dead

**NullClaw, IronClaw**

No commits, issues, PRs. Fork graveyard.

## 7. 🔮 Tín hiệu xu hướng

### 1. Consolidation phase active

**Evidence:**
- 2/9 projects dead (22% mortality)
- 2/9 maintenance mode (22% declining)
- 5/9 active development (55% surviving)

**Implication:** Market converge toward few dominant players. Hermes/OpenClaw tier 1 position strengthens. Mid-tier projects cạnh tranh bằng specialization (platform focus, language optimization, security).

### 2. Platform parity = competitive requirement

**Windows stability issues** chiếm 40% P0/P1 bugs. Projects lose Windows users nếu không fix.

**Mobile/embedded demand** growing (Android reports, Termux usage, reverse proxy patterns). Desktop-first architecture không scale đến edge deployment.

**Trend:** Platform matrix testing + conditional dependencies cần investment. Projects không có resources sẽ choose platform subset, cede market share.

### 3. Operational maturity separates winners

**Update mechanisms** (Hermes #133992, #134185) = production blocker. Users không deploy nếu updates break.

**Resource management** (OpenClaw SQLite WAL, Hermes idle CPU) = deployment cost. Enterprise users sensitive.

**Session state integrity** (context compaction bugs) = trust issue. Lost work → churn.

**Signal:** Features không competitive advantage nữa. Reliability, operational simplicity = moat.

### 4. Security scrutiny increases

**QwenPaw #8153** MCP Driver RCE với root compromise = wake-up call. Production deployment → attack surface.

**ZeroClaw** secret leaks, Hermes auth edge cases = immature security posture exposed.

**Trend:** Security audit, threat modeling, principle of least privilege enforcement = table stakes. Projects slow to adapt lose enterprise trust.

### 5. MCP ecosystem buildout

**Every active project** integrating MCP tooling. Gateway/server architecture, tool discovery schema, profile-based routing = common patterns.

**Opportunity:** MCP marketplace, tool certification, security sandboxing.

**Risk:** Fragmentation. Each project implements MCP slightly differently. Interoperability issues emerge.

### 6. Cost transparency demand

**Hermes #128757** large session cost warnings, **ZeroClaw #11613** hidden reasoning tokens = users demand upfront cost visibility.

**Context:** Token costs non-trivial cho production workloads. Surprise bills → user backlash.

**Trend:** Pre-call cost estimation, budget limits, rate limiting = required features. Projects không implement lose enterprise adoption.

### 7. Release discipline convergence

**NanoClaw** switch từ `main` tracking → CalVer stable releases. **Hermes #135847** switch update channel sang tagged releases.

**Pattern:** Fast-moving HEAD = early adopter phase. Mature projects need stable upgrade path.

**Implication:** Projects still tracking `main` (Hermes, OpenClaw) sẽ face user pressure to stabilize. Bleeding-edge channel + stable channel architecture = future norm.

---

## 🎬 Kết luận chiến lược

**Hermes Agent vị thế:** Market leader nhưng vulnerable. Feature breadth = competitive advantage, nhưng complexity + stability debt = attack surface cho focused competitors.

**Defensive moves cần thiết:**
1. **Stabilize Windows** - P0 bugs drive enterprise churn
2. **Release discipline** - Stable channel required cho production adoption
3. **Resource optimization** - Idle CPU, memory growth = deployment blocker
4. **Security audit** - Enterprise customers demand before rollout

**Offensive opportunities:**
1. **MCP ecosystem leadership** - Largest tool catalog, interop standards
2. **Multi-agent orchestration** - Complexity moat if reliability achieved
3. **Desktop UX polish** - Native app advantage over web competitors

**Existential risk:** OpenClaw convergence toward feature parity với better operational stability. Nếu Hermes không fix infrastructure debt, enterprise users migrate.

**Timeline:** 6-12 months critical. Projects consolidate, standards emerge, enterprise adoption accelerates. Hermes cần ship stability improvements before market lock-in opportunity closes.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw ngày 2026-10-10

## 1. Tóm tắt hôm nay

Dự án xử lý ổn định và hạ tầng: 30 PR mới chủ yếu fix bug (zombie process, context vượt ngưỡng, timing lỗi wall-clock). Không có release. Hoạt động chính tập trung cleanup kỹ thuật sau 2026.9.x rollout.

## 2. Releases

Không có release trong 24h qua. Stable channel đang ở 2026.9.9.

## 3. Tiến độ dự án

**PR nổi bật:**

- **#168056**: Fix thinking levels bị ignore ở custom reasoning model (Baseten). Root cause: endpoint logic chỉ cho phép explicit opt-in → suppress `reasoning_effort`.
- **#168076**: Nested conversation organization - cho phép kéo child session ra top-level, archive parent không làm mất child còn active.
- **#168083**: Docs PR khuyến cáo viết integration proof có nghĩa thay vì unit test mirror implementation.
- **#155801**: Codex attempt deadline dùng `Date.now()` → clock rewind làm timeout sớm. Đổi sang monotonic clock.
- **#168080**: Operator Stop trả về `aborted: true` nhưng OpenAI-compatible HTTP run vẫn chạy tiếp.

**Xu hướng:** Ổn định core timing, multiprocess lifecycle, auth timing. Cleanup linter debt (5 owners vượt 700 dòng).

## 4. Điểm nổi bật cộng đồng

**Issue nhiều tương tác:**

- **#97616** (18 bình luận): OpenClaw leak zombie child process từ hook/tool execution → runtime degradation. Chưa có fix PR.
- **#43367** (15 bình luận): Multi-agent orchestration không ổn định: concurrent `agents add` ghi đè config, session-lock fail, detached child work.
- **#143524** (115 bình luận, P0): Agent SQLite WAL không checkpoint, lên 2.8GB sau vài ngày dù `wal_autocheckpoint=1000`. Block gateway startup trên Windows.

Người dùng quan tâm: reliability (zombie process, session state loss), Windows đặc thù (WAL growth, slow Doctor runs).

## 5. Ổn định & Bugs

**Bug đang fix:**

- **#143524** (P0, 115 comments): SQLite WAL không checkpoint, gateway startup block. Nhiều case report Windows + agent DB lên GB. Chưa có fix PR.
- **#97616** (P1, 18 comments): Zombie accumulation từ hook/tool execution. Chưa có fix PR.
- **#142336** (P1, 11 comments): Core `/dashboard` shadow Telegram Mini App command. Có linked PR.
- **#162047** (CLOSED): Windows 2026.9.7 upgrade Doctor mất 35 phút do repeated hardlink validation. Đã đóng.
- **#156986** (CLOSED): `openclaw update` hang ở `update-candidate-state`, runaway worker output 233MB+. Đã đóng.

**Pattern:** Windows timing/lifecycle issues nhiều. SQLite maintenance bugs chưa resolve. Update flow đã ổn hơn (2 P0 closed).

## 6. Yêu cầu tính năng

**Feature request quan trọng:**

- **#14376** (P2, 5 comments): Cron guardrails nhận biết quota/auth/rate-limit failure → backoff khác nhau thay vì exponential đều. Chưa có PR.
- **#70266** (P3, 5 comments): macOS Talk Mode overlay dùng configured assistant avatar thay vì default orb. Identity đã support config nhưng Talk Mode bỏ qua.
- **#50530** (P3, 5 comments): Telegram collapse mid-paragraph newline trước khi gửi. LLM output có soft line break 80-100 char → Telegram hiển thị xấu.
- **#51184** (P3, 4 comments): Surface cron job name/session label trong `/status` và statusline. Hiện chỉ thấy UUID.

**Xu hướng:** UX polish (avatar, formatting, readability) và cron reliability.

## 7. Phản hồi người dùng

**Trải nghiệm tích cực:**

- Issue #155476 (document attachments disappear) có fix PR #155476 với proof sufficient → community appreciate fast response.

**Khó chịu:**

- **#143524**: Windows WAL growth issue tồn tại lâu, 115 comments, chưa fix → frustration cao.
- **#97616**: Zombie process regression khiến long-running instance degradation → yêu cầu manual restart.
- **#158626**: Claude CLI agent runtime không deliver final answer đến Telegram khi native background agent chạy → silent failure.

**Pattern:** Windows-specific pain high (WAL, Doctor slow). Multi-agent orchestration (issue #43367) gây lost work → trust erosion.

## 8. Backlog & Roadmap

**Backlog priorities (từ issue labels):**

- **P0 bugs**: #143524 (SQLite WAL), #158277 (Talk on Watch), #157985 (Windows gateway stop no-op), #167406 (Windows MSIX Codex startup starve main thread).
- **P1 bugs**: #97616 (zombie leak), #142336 (/dashboard collision), #72015 (active-memory overload QMD boot), #166665 (failed compaction suppress → unbounded transcript).

**Roadmap hints:**

- Memory system refinement: #168058 fix EmbeddingGemma retrieval, #167004 preserve keyword relevance khi date decay.
- Auth resilience: #167619 OAuth refresh monotonic timeout, #134446 exec SecretRef root-owned command reject.
- Windows stability: nhiều P0/P1 Windows-specific. Team likely prioritize.

**Không thấy public roadmap document.**

---

**Tổng kết:** Ngày 10/10 tập trung cleanup hạ tầng, timing bugs, và Windows pain points. Community feedback tập trung vào reliability regressions (zombie, WAL growth) chưa resolve. Không có major feature push, chỉ polish và fix. Team đang debt cleanup sau 2026.9.x rollout.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-10

## 1. Tóm tắt hôm nay

Sửa 7 bug quan trọng về chat platforms (WhatsApp replay filter, Slack compaction spam, Telegram media grouping), provider compatibility (DeepSeek web search, Zhipu/Z.AI split), và WebUI (CJK markdown parsing, PWA cold start). Merge copywriting cleanup cho 10 locales. Mở 4 PR cho computer use, reasoning effort UI, và workspace picker improvements.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**Merged hôm nay:**
- #6119 - Format Chinese locale JSON 2-space indent
- #6117 - Thêm copywriting guidelines vào `.agent/`
- #6116 - Rewrite WebUI copy ngắn gọn hơn cho 10 locales
- #6115 - Fix CJK punctuation break GFM autolink bold markers
- #6104 - Strip `web_search` tool khỏi Chat Completions requests
- #5204 - Declare request APIs (Chat/Responses/Messages) cho providers/presets
- #1541 - Pass `sender_id` vào context cho group chat identification

**PR quan trọng đang open:**
- #6127 - Fix WhatsApp replay filter (neonize timestamps milliseconds vs seconds)
- #6126 - Honor `NANOBOT_HOME` cho config/workspace defaults trên Windows
- #6125 - Telegram albums cho consecutive images (sendMediaGroup)
- #6124 - Classify remote media URLs bằng path extension, ignore query strings
- #6118 - Opt-in completion review cho goals/child tasks
- #6114 - PWA shell paint immediately (cache-first thay vì network-first)
- #6113 - Report workspace access trước tool use
- #6110 - Slack chat.update thay 2 messages cho compaction notices
- #6091 - Managed computer use với Cua Driver
- #5983 - Reasoning effort dropdown catalog-backed
- #5955 - Claude on Vertex AI provider
- #5943 - Session state ownership vào SQLite thay JSONL
- #3207 - Split Zhipu thành Z.AI CN/Global/Coding Plan providers

## 4. Điểm nổi bật cộng đồng

**Issues nhiều bình luận:**
- #6084 (3 comments) - Slack compaction 2 messages spam idle DMs
- #6029 (3 comments) - Silent context compaction cho background cycles
- #5898 (4 comments) - GPT-6 models qua Github Copilot không support

**Telegram UX cải thiện:**
- #6121, #6123 - Request media albums và URL classification fix
- Đã có PR #6125, #6124 implement

## 5. Ổn định & Bugs

**Fixed:**
- #6085 - DeepSeek web search crash Chat Completions endpoint (hosted tool chỉ cho Responses API)
- #6120 - WhatsApp replay filter không bao giờ fire (timestamp scale mismatch)
- #6006 - QQ quoted messages không reach agent
- #5898 - GPT-6 model series không support

**Đang sửa:**
- #1739 - Multiple Windows instances qua `NANOBOT_HOME` bị ignore → PR #6126
- #6111 - Workspace picker thiếu drive list, folder creation, common shortcuts Windows

## 6. Yêu cầu tính năng

**Mới:**
- #6121 - Telegram send multiple images as albums
- #6111 - Windows workspace picker improvements (drive list, shortcuts)

**Đang implement:**
- #6091 - Computer use integration với Cua Driver
- #5983 - Reasoning effort UI catalog-backed
- #6014 - Keenable MCP preset
- #5955 - Claude on Vertex AI
- #4919 - Telegram custom Bot API base URL + headers
- #5946 - Persist tool results giữa execution batch (crash recovery)

## 7. Phản hồi người dùng

**Platform-specific issues:**
- Slack users phàn nàn compaction notices spam DMs (#6084, #6029)
- Telegram users muốn media albums thay vì separate messages (#6121)
- WhatsApp messages bị delay vì replay filter broken (#6120)
- Windows users không chạy được multiple instances (#1739)

**Provider feedback:**
- DeepSeek web search toggle crash non-Responses models (#6085) - đã fix
- Parallel Search muốn identify nanobot requests (#5797)
- CoreWeave Inference cần custom endpoint docs (#6103)

## 8. Backlog & Roadmap

**Gần merge:**
- Session SQLite refactor (#5943) - p1 priority, nhiều conflict
- Reasoning effort UI (#5983) - chờ catalog integration
- WhatsApp replay fix (#6127) - bug fix nhanh
- Telegram albums (#6125) - cải thiện UX
- PWA cold start (#6114) - performance fix

**Tiếp theo:**
- Computer use managed integration (#6091)
- Claude Vertex AI (#5955)
- Multi-provider failover timeout detection (#5769)
- Telegram custom Bot API (#4919)
- Tool result checkpoint recovery (#5946)

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw - 2026-10-10

## 🎯 Tóm tắt hôm nay

Zeroclaw đang xử lý 13 issue mở (4 P1, 6 P2) với focus vào runtime stability, Telegram channel bugs, và memory leak trong config system. 50 PR active, nhiều PR lớn blocked chờ dependency chain merge. Không có release mới.

## 📦 Releases

Không có release trong 24h. Tracker #7432 đang theo dõi v0.8.6 (Phase 2 runtime) và v0.9.0 (Phase 3 gateway separation).

## 🔧 Tiến độ dự án

**Critical fixes merged:**
- #11454 → session key correlation với turn traces
- #11582 → batch image eviction (4→2, 8→4) thay vì drop từng cái, giảm Anthropic prompt cache thrashing
- #11600 → xóa `StreamErrorWithUsage` wrapper đã obsolete
- #10700 → cost tracker giờ dùng per-conversation session_id thay vì daemon-lifetime UUID

**Hot track (high comment/priority):**
- #11450 delegate worker recovery - giữ task handle, await trong supervisor riêng, tái validate artifact
- #11467 single-tool provider rounds - opt-in `single_tool_rounds`, OpenAI/Anthropic native support
- #11617 steering channel leak - đóng channel trước khi turn kết thúc, fix `try_send` false-OK
- #11462 delegate approval routing - route child approval qua target operator channel

**Architecture evolution:**
- #11466 per-target config application results - RPC ack cho model-provider refresh
- #11473 deferred built-in tools - `deferred_builtin_tools` flag, schema qua `tool_search`
- #11438 conversation binding port (RFC #6954 slice 2/3) - cron job binding conversation owner

## 🔥 Điểm nổi bật cộng đồng

**P1 issues cần urgent fix:**
- #11612 (DefuzeX report) - re-run approved shell command abort loop với "repeated prompt-required tool call", end ACP session
- #11608 Telegram blackhole - no request timeout → wedge forever, `listener_health` detect nhưng không recover
- #11615 Telegram 429 - ignore `retry_after`, retry ngay lập tức → compound flood-limit → mất reply
- #11614 memory leak - `map_key_sections` leak schema paths mỗi call qua `Box::leak`

**User pain points:**
- #11618 ZeroCode drop queued message khi daemon `SESSION_BUSY` → PR #11619 requeue message thay vì drop
- #11623 ZeroCode drop pending `ask_user` prompt → tool timeout sau 600s, không log
- #11620 ZeroCode không show message time → khó debug overlapping events

## 🐛 Ổn định & Bugs

**Memory & resource:**
- #11614 config leak - `Configurable` macro emit `Box::leak` 3 chỗ (L726, 993, 1302)
- #11632 desktop GPU spin - WebKitWebProcess repaint loop idle ~100% render engine (Linux/Wauri/Wayland)

**Channel reliability:**
- #11608 Telegram wedge - no request timeout, HTTP client blackhole → permanent wedge
- #11615 Telegram 429 - immediate retry compound flood-limit
- #11617 steering channel - `try_send` OK window giữa turn finish và channel drop

**Cost tracking:**
- #11613 OpenAI-compatible hidden reasoning tokens - ledger drop provider `total_tokens`, recompute từ prompt+completion → undercount Gemini thinking tokens
- #10700 fixed - session_id giờ per-conversation

**Agent loop:**
- #11612 re-approved shell abort - duplicate tool call before approval → abort
- #11541 Anthropic `extra_headers` - schema có nhưng never forward, drop trong `create_provider`

## 🎨 Yêu cầu tính năng

**Accepted enhancements:**
- #11166 → #11582 merged - batch image eviction
- #10222 → #11467 in-progress - single-tool rounds opt-in
- #11620 message timestamps trong ZeroCode transcript
- #11419 secret map editing - zerocode/dashboard add MCP server `env` keys

**RFC track:**
- #6954 conversation binding - PR #11438 slice 2/3
- #5574 runtime+gateway phases - tracker #7432

## 📢 Phản hồi người dùng

DefuzeX (behavioral safety testing) report #11612 với KUMA SDK reproduction → high-quality external contributor input.

Nhiều P1 bugs từ real deployment scenarios (Telegram production, ZeroCode daily use, memory growth over daemon lifetime).

## 🗺️ Backlog & Roadmap

**Dependency chains blocking merge:**
- #11408 → #11410 → #11411 (SOP/session auth guard stack)
- #11220 → #11234 → #11408 (authority prerequisite)
- #11266 → #11411 (private SOP access)
- #11576 → #11422 (TUI signing key)

**v0.8.6 Phase 2 gaps** (từ #7432):
- Runtime stability (delegate recovery #11450)
- Cost tracking accuracy (#11613)
- Channel reliability (#11608, #11615)

**v0.9.0 Phase 3** gateway separation - chưa chi tiết trong data.

**Toolchain:** #11634 bump Rust 1.99.0 ready merge.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw · 2026-10-10

## 🎯 Tóm tắt hôm nay

Ngày dọn dẹp backlog. Bot dependabot đóng 5 PR cập nhật dependencies cũ (tất cả đánh dấu `stale`). Đóng 2 issue cũ: TLS certificate expired (#3377 - critical nhưng đã fix trước đó) và bug multi-line input (#3391). Còn 2 issue mới đang mở: reverse proxy support (#3415) và Android DNS resolution bug (#3420). Một PR feature về turn time budget (#3414) vẫn đang review.

## 📦 Releases

Không có release.

## 🚀 Tiến độ dự án

**Dependencies cleanup (5 PRs đóng):**
- #3389: golang.org/x/crypto 0.53.0 → 0.57.0
- #3388: MCP Go SDK 1.6.1 → 1.8.0  
- #3387: Anthropic SDK 1.55.1 → 1.74.0
- #3386: mautrix 0.27.0 → 0.31.0
- #3385: LINE Bot SDK 8.20.1 → 8.22.0

Tất cả đánh `stale`, nghĩa là bot tự động đóng theo policy timeout. Không có merge activity thực sự.

**PR đang active:**
- #3414: Feature turn time budget. Thêm config `turn_time_budget_seconds` cho agent. Khi vượt thời gian, agent phải dừng schedule tool mới và tóm tắt. Default = 0 (disabled). Đang đợi review, chưa merge.

**Xu hướng:** Maintenance mode. Không có feature merge mới, chỉ dọn backlog cũ.

## 💬 Điểm nổi bật cộng đồng

**#3377 (TLS certificate expired) - 2 👍:**  
Issue critical nhưng đã fix trước khi đóng. Certificate picoclaw.io hết hạn 2026-09-10, site down hoàn toàn. Đóng ngày 10/10 nghĩa là đã xử lý xong (hoặc stale bot đóng tự động - cần verify).

**#3415 (reverse proxy support) - mới nhất còn mở:**  
User yêu cầu chạy PicoClaw web console dưới subpath (`/pico/`) thay vì root. Hiện tại frontend/backend hardcode root paths (`/api/`, `/launcher-login`), không hoạt động với Nginx reverse proxy. Đề xuất thêm flag `-base-path=/pico/` cho launcher.

**#3420 (Android DNS bug) - mới nhất, technical:**  
Android build với `CGO_ENABLED=0` fail DNS resolution (`dial udp 127.0.0.1:53: connection refused`). Root cause: pure-Go resolver không hoạt động trên Android. Cần build với CGO để dùng native resolver hoặc tìm workaround khác.

Cộng đồng tập trung vào deployment và platform-specific bugs.

## 🐛 Ổn định & Bugs

**Đang xử lý:**
- #3420: Android DNS resolution failure. Critical cho mobile users. Pure-Go binary không hoạt động, cần CGO build.

**Đã đóng:**
- #3391: Multi-line input split thành nhiều message riêng lẻ trên pico TUI mobile. Bug UX nghiêm trọng khi paste code/poetry. Đóng ngày 10/09 (đã fix hoặc stale).
- #3377: TLS certificate expired. Site down 1 tháng (9/10 - 10/10) trước khi đóng.

Android build và TLS ops là hai weak points.

## ✨ Yêu cầu tính năng

**#3415: Reverse proxy / subpath mounting**  
User muốn chạy PicoClaw web console dưới `/pico/` thay vì chiếm root domain. Yêu cầu:
- Flag `-base-path=` cho launcher
- Tất cả routes (API, login, WebSocket, static assets) respect prefix
- Nginx reverse proxy hoạt động không cần custom rewrite rules

Use case: chạy nhiều service trên cùng domain.

**#3414: Turn time budget (PR đang review)**  
Config `turn_time_budget_seconds` để giới hạn wall-clock time mỗi turn. Agent tự stop và summarize khi vượt thời gian. Tránh infinite loops.

Hai tính năng tập trung vào operational control và deployment flexibility.

## 💭 Phản hồi người dùng

User @altman08 (#3415) frustrated với hardcoded root paths - muốn integration dễ hơn trong existing infrastructure.

User @sstreichan (#3420) gặp blocking issue trên Android - không thể reach API endpoints vì DNS fail.

User @dimonb (#3377) báo TLS expired với tag `[CRITICAL]` - downtime 1 tháng impact lớn đến adoption.

User @chentianxiong123 (#3391) frustrated với multi-line input split - UX broken cho use cases phổ biến (code paste).

Sentiment: deployment pain points và platform compatibility issues đang friction chính.

## 📋 Backlog & Roadmap

**Backlog đã dọn:**  
5 dependency updates từ 24/09 đã đóng (stale). Cleanup backlog maintenance debt.

**Active backlog:**
- #3415: Reverse proxy support (open)
- #3420: Android DNS fix (open, critical)
- #3414: Turn time budget feature (PR pending review)

**Roadmap hints:**  
Không có thông tin roadmap public. Dựa vào issues/PRs:
1. Platform stability (Android, deployment scenarios)
2. Operational controls (time budgets, resource limits)
3. Integration flexibility (reverse proxy, subpath mounting)

Focus ngắn hạn: fix Android build, unblock deployment scenarios.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-10

## 1. Tóm tắt hôm nay

Release chính thức **v2026.10.0** - version CalVer đầu tiên, chuyển từ tracking `main` sang stable releases. Core team merge 9 PRs sửa bugs hệ thống (file descriptors, slash command parsing, CLI args, OneCLI policy API). Dependabot bump dependencies nhỏ.

## 2. Releases

### v2026.10.0 (2026-10-09) 🎯

**Milestone lớn - đổi chiến lược phát hành:**

- **CalVer**: Bỏ semantic versioning, dùng calendar versioning
- **Stable channel**: `/update-nanoclaw` giờ cài published releases thay vì `main` tip
- **Testing path**: Qua beta channel (rc.1, rc.2) trước khi stable
- **Updates đáng tin hơn**: Rollback mechanism cải thiện

**Tính năng kỹ thuật:**

- Iron Proxy hỗ trợ local model qua plain HTTP (không cần key)
- Outbound proxy routing cho service
- Show Claude failure reason khi run fails

**Ý nghĩa**: Dự án mature hơn, ổn định production deployment. User không còn chịu bleeding-edge bugs từ main.

## 3. Tiến độ dự án

### Merged PRs (9 core-team fixes)

**Infra & stability:**

- **#4063**: File descriptor refactor - session/skill/run-log directories giờ open once, reuse handle. Tránh fd leaks, faster I/O
- **#4062**: Slash command parser unified giữa gate và runner. Bỏ duplicate logic, support `/name@botname` 
- **#4061**: CLI args normalization centralized. Dash-to-underscore ở entry point, không scatter
- **#4064**: Driver test fs stub fix - add `fs.constants` để gateway skills không fail import

**Skills & integrations:**

- **#4052**: Dial tool scope qua OneCLI policy API (1.42), bỏ legacy rules API đã 410
- **#4060**: Mattermost setup validate owner ID lookup trước khi proceed
- **#4059**: OneCLI installer dùng full URL + explicit curl options

**CI/CD:**

- **#4058**: All GitHub Actions jobs chuyển sang `namespace-profile-paradixe`. Bỏ GitHub-hosted runners hoàn toàn

**Dependencies:**

- **#4066**: source-map-js 1.2.1→1.2.2 (merged)
- **#4067**: vitest 4.1.4→4.1.11 (open)

### Xu hướng

Team focus vào **stability** và **technical debt cleanup** trước major release. Refactor internal APIs, fix edge cases, standardize patterns. Không có feature mới lớn - consolidation phase.

## 4. Điểm nổi bật cộng đồng

**Không có tương tác cao** - cả 2 issues open đều 0 reactions, ít comments:

- **#3569**: Telegram bug (URLs với underscores lẻ fail) - đã biết fix upstream (chat-adapter 4.32.0), chỉ cần bump dependency
- **#4068**: Request OneCLI 2.x gateway để enable Google Docs edit scope

**PR cộng đồng:**

- **#3751, #3752** (@horsehcj): WhatsApp fixes - ignore newsletter JIDs, keep pending questions answerable. Open từ tháng 9, chưa merge

## 5. Ổn định & Bugs

### Critical (chưa fix)

**#3569 - Telegram MarkdownV2 bug** 🔴
- **Impact**: Mọi message có số lẻ MarkdownV2 markers (`_`, `*`, `~`, `` ` ``) không deliver được
- **Root cause**: Pin `@chat-adapter/telegram@4.29.0`, upstream fix ở 4.32.0
- **Workaround**: User phải escape thủ công
- **Next step**: Bump dependency, test compatibility

### Fixed hôm nay

- File descriptor leaks trong session/skill directories
- Slash command double-parse giữa gate/runner
- CLI args normalization scattered
- Mattermost setup không validate owner ID
- OneCLI Dial tool 410 error với gateway 1.42

## 6. Yêu cầu tính năng

**#4068 - OneCLI 2.x support** 📝
- **Requester**: @Philabuster
- **Need**: Google Docs edit scope (`https://www.googleapis.com/auth/documents`)
- **Current**: Pin OneCLI gateway 1.42.0, chỉ có `drive.file` + `drive.readonly`
- **Impact**: Không edit được Docs, chỉ read
- **Complexity**: Upgrade gateway version, test OAuth scopes

**Không có feature request khác trong ngày.**

## 7. Phản hồi người dùng

**Rất ít engagement từ community** - indicators:
- 0 reactions trên cả 2 issues mới
- 1 comment trên #4068 (chỉ từ author)
- Không có user reports mới ngoài 2 issues đã note

**WhatsApp PRs**: 2 PRs từ @horsehcj open 1 tháng chưa review - có thể maintainer bandwidth thấp hoặc waiting for context.

## 8. Backlog & Roadmap

**Immediate backlog (inferred):**

1. **#3569 priority** - Telegram bug affect toàn bộ Telegram users, có fix rõ ràng
2. OneCLI 2.x upgrade (#4068) - blocking Google Docs edit
3. WhatsApp fixes review (#3751, #3752)
4. Vitest bump (#4067) - dependency hygiene

**Post-2026.10.0 direction:**

- Consolidation phase xong, likely pivot sang features
- Stable release cadence established - có thể see monthly/quarterly releases
- OneCLI integration maturity focus (issues với policy API, gateway versions)

**Không có public roadmap** trong data provided.

---

**Tín hiệu tổng thể**: Dự án mature, engineering discipline tốt (test coverage, fd management, API unification), nhưng community engagement thấp. Core team drive development, user contributions minimal.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-10-10

## 1. Tóm tắt hôm nay

Ngày bận rộn với 3 PR merged, tập trung vào **bug fixes chất lượng cao**: EXIF orientation bị mất khi resize ảnh (#8136), session chết vĩnh viễn sau lỗi ảnh quá to (#8010), và UUID crash trên HTTP (#8146). Security issue nghiêm trọng #8153 về MCP Driver RCE → root compromise được báo cáo với evidence chain đầy đủ.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Merged PRs (3):**

- **#8136** - Fix EXIF orientation loss: ảnh có EXIF (portrait/landscape) bị xoay sai sau khi resize để fit model limit. Apply orientation transform trước khi resize.
- **#8010** - Recover from rejected media: ảnh bị provider reject (quá to) làm session chết vĩnh viễn. Mọi request sau đều fail vì block lỗi nằm trong stored context. Giờ detect error, loại bỏ media, retry với text-only.
- **#8146** - UUID crash trên HTTP: `crypto.randomUUID()` không có trên HTTP origins (chỉ HTTPS/localhost). Fallback về `crypto.getRandomValues()` sinh UUID v4.

**Open PRs quan trọng:**

- **#8154** (XXL) - Console chunk error recovery: xử lý lazy module load fail, cho phép retry sau navigation fail
- **#7931** (XXL) - Durable paginated transcript: SQLite storage cho chat history, pagination, dedup với SSE output
- **#8121** (XXL) - Creator 2.0.1 release với controlled media production
- **#7565** (XXL) - Plugin hot reload không cần rebuild workspace

## 4. Điểm nổi bật cộng đồng

**Issue nóng:**

- **#8153** (2 comments) - **Security critical**: MCP Driver config endpoint cho phép RCE với root privilege. Attacker plant SSH key, systemd miner. Report có full evidence chain (log, IOC, timeline). Chờ response từ team.
- **#8162** (1 comment) - OpenAI Responses API stream event: empty response làm session ngưng sau 1-3 bước, không có error message
- **#8160** (2 comments) - Feature request: thêm Spanish (es) interface language
- **#8120** (4 comments) - "页面加载失败" xuất hiện liên tục, ảnh hưởng trải nghiệm

## 5. Ổn định & Bugs

**Đã fix:**

- ✅ EXIF orientation loss (#8129 → #8136)
- ✅ Oversized image kill session (#8009 → #8010)
- ✅ Console crash on HTTP origins (#8147 → #8146)
- ✅ MissingSessionID lỗi OpenCode Go (#7599 closed)
- ✅ spawn subAgent timeout (#7678 closed)

**Đang xử lý:**

- 🔧 #8040 - Embedding reindex: CJK chunk quá to làm silent drop cả batch (recurrence #5950)
- 🔧 #8134 - Chat history mất đột ngột, không liên quan context window
- 🔧 #8158 - Assistant final answer hiển thị empty bubble khi model emit Scroll headline riêng
- 🔧 #8150 - Feishu rich-text message: text được parse, embedded images bị drop silent

## 6. Yêu cầu tính năng

- **#8160** - Spanish interface language (có PR #8161 đang review)
- **#8081** (closed → PR #8083 merged) - `view_audio` built-in tool cho audio understanding (giống `view_image`/`view_video`)
- **#8152** - Hub management: thêm note/label cho account (phân biệt owner/người dùng)
- **#7809** - Tool approval cards & notifications: i18n support (hiện hardcode English)

## 7. Phản hồi người dùng

**Positive:**

- #8010 fix được đánh giá cao: bug này khiến session không thể recover, phải xóa conversation

**Pain points:**

- **#8153**: Production server bị compromise qua MCP Driver → critical security concern
- **#8134**: Chat history mất không warning → mất context làm việc
- **#8120**: Page load failure thường xuyên trên nhiều thiết bị
- **#7994**: Context display không update real-time, compress threshold không hoạt động dù set 0.5

## 8. Backlog & Roadmap

**High priority (từ open PRs):**

1. Security patch cho #8153 MCP Driver RCE
2. Console stability (#8154 chunk error recovery)
3. Durable transcript storage (#7931) - large refactor, nền tảng cho multi-device sync
4. Plugin hot reload (#7565) - improve DX, không break workspace

**Testing infrastructure:**

- #8072 - E2E test isolation với fixtures
- #7380 - Test suite speedup 41% (merged)

**I18n expansion:**

- PR #8161 complete parity cho id/ja/pt-BR/ru/vi
- #8160 add Spanish

---

**⚠️ Action items:**

1. **Urgent**: Respond to #8153 security report, patch MCP Driver endpoint
2. Review #8154 (console recovery) - nhiều người hit #8120 issue
3. Triage #8134 chat history loss - data integrity concern

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*