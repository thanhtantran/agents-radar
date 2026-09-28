# Bản tin Hệ sinh thái Hermes Agent 2026-09-28

> Issues: 80 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-28 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-28

## 1. Tóm tắt hôm nay

Dự án tập trung fix bug critical về session state, message delivery và compatibility trên Windows/macOS. Không có release mới. 13 PRs merge trong ngày, chủ yếu sửa lỗi cài đặt, cron worker crashes, và Desktop UI issues.

## 2. Releases

Không có release trong 24h qua.

## 3. Tiến độ dự án

**Critical fixes đang xử lý:**

- **Session state corruption** (#124731, #125888, #125763): Persist override drop user message khi merge; compaction ghi duplicate; leftover steer flip system prompt
- **Cron worker crashes** (#122222, #125689, #124279): Worker spawn thiếu dependencies, ModuleNotFoundError on self-managed installs
- **Windows install broken** (#125350): Pinned Git tar.bz2 cần bzip2 absent, ffmpeg 404, mirror 403
- **Desktop message duplication** (#123801, #123985): Duplicate assistant reply, first messages render twice sau compaction

**PRs quan trọng:**

- #125908: Fix rotation compaction duplicate user prompt (P1)
- #125308: Fix bot DM delivery wrapper dùng đúng venv python (P2) 
- #125074: Shared metrics v3 với Desktop consent - telemetry overhaul (P3)
- #125903: `/handoff desktop` continue CLI session trong Desktop app
- #122486: Fix desktop launcher Exec resolution (P2)

**Xu hướng:**
- Heavy focus stability: 8/10 top issues là bugs, chủ yếu install/compatibility
- Cross-surface handoff: CLI ↔ Desktop deep linking (#125903, #84683, #79186)
- Plugin ecosystem growth: 3 PRs thêm catalog entries (feishu, tsubasa, rich-ui)

## 4. Điểm nổi bật cộng đồng

**Most-discussed issues:**

- #122222 (21 comments): Cron external worker cannot import deps - every job fails. Critical for automation users
- #125657 (16 comments): Windows install error "install python dependencies" - recurring blocker
- #107356 (11 comments): 12/18 high-severity npm vulnerabilities stacking up - security debt

**Recurring pain points:**
- Windows compatibility: 4 issues in top 15 (install, subprocess hang, desktop launcher, launchd)
- macOS privacy/hardened runtime: #71206 (launchd Gateway blocked by nehelper), #63784 (node-pty spawn-helper 0644)
- Desktop session management: duplicate messages, history navigation bugs

## 5. Ổn định & Bugs

**P0/P1 critical:**

- #125763: System prompt flip on leftover steer/interrupt → agent rebuild, cache miss
- #124731: Persist override drop unanswered user message
- #122222: Cron worker ModuleNotFoundError blocks all scheduled jobs

**P2 high-priority:**

- #125350: Windows fresh install impossible (Git/ffmpeg pin issues)
- #122555: PM activates wrong interpreter dependency env, no ABI check
- #100532: Smart-approval ESCALATE returns unanswerable pending_approval

**Patterns:**
- Install/dependency isolation issues dominant (cron, bot DM, PM activation)
- Session state integrity under stress (compaction, merge, persist override)
- Platform-specific quirks (Windows subprocess, macOS privacy gates)

## 6. Yêu cầu tính năng

**Active feature requests:**

- #118029 (10 comments): Pinned rollout control plane cho managed SSH installs
- #107700 (5 comments): Source-apply secrets với broker-neutral authority contract
- #51694: Command Center (⌘K) FTS search - hiện chỉ search loaded sidebar sessions
- #41766 (trong #125904): Theme typography knobs + Chat Text Size control

**Emerging asks:**
- Cross-profile session deep links (#84683, #66647)
- Per-provider kanban concurrency budget (#124918)
- Korean language support (#52532 - closed but sentiment tracked)

## 7. Phản hồi người dùng

**Pain points rõ ràng:**

- **Install fragility**: Windows users stuck at dependency install, no clear workaround
- **Cron reliability**: Production automation breaks silent sau update
- **Desktop UX gaps**: No Ctrl+F search, duplicate messages confusing, no cross-profile session access

**Positive signals:**
- Plugin ecosystem engagement: 3 community plugins submitted today
- Deep investment: #123165 user runs multi-month persistent agent workflows
- Cross-surface demand: CLI→Desktop handoff request shows power-user retention

**Security anxiety:**
- #107356, #125576: Npm vulnerability count rising, no visible progress on deps

## 8. Backlog & Roadmap

**Inferred priorities từ PR labels:**

1. **Stability sprint**: Fix session state corruption, cron crashes, install breakage (P0/P1 cluster)
2. **Windows parity**: Subprocess hang, launcher issues, installer reliability
3. **Plugin maturity**: Catalog growth, better dependency isolation
4. **Cross-surface UX**: Deep linking, profile switching, session handoff

**Architectural shifts visible:**

- CLI ownership refactor (#125027): Move profile logic ra khỏi CLI edge
- Telemetry v3 (#125074): Product instrumentation cho retention/cost analysis
- Vault abstraction (#107700, #107704): Broker-neutral secrets authority

**Technical debt:**
- Npm security vulnerabilities stack (15 high/moderate)
- Install method detection fragility (#33494)
- Desktop SSE decoupling (#96507) - long-running cleanup

---

**Nhận xét tổng thể**: Dự án trong stability cleanup phase. Bug density cao ở install/compatibility layer signal growth pain - nhiều edge case environments (Windows, macOS hardened, self-managed) chưa được test coverage tốt. Plugin ecosystem healthy. Session state bugs critical nhưng có attention. Security debt (npm vulns) unaddressed - potential blocker for enterprise adoption.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-28

## 1. 🌐 Tổng quan hệ sinh thái

**Thị trường đang consolidation.** 9 dự án tracked, pattern rõ: 2-3 players lớn (Hermes Agent, OpenClaw, NanoBot) lead với backlog 80+ issues, còn lại niche/experimental với <10 issues.

**Giai đoạn:** Post-growth stability phase. Tất cả zero releases trong ngày. Heavy bugfix activity - 90% PRs là fixes/polish vs features mới. Context management, cross-platform install, session persistence là pain points chung.

**Ecosystem maturity signal:** Plugin architectures xuất hiện ở 4/9 dự án (Hermes, OpenClaw, Zeroclaw, NullClaw). Ai cũng đang tách hard-coded features thành runtime modules.

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Top Activity | Cộng đồng |
|-------|--------|-----|----------|--------------|-----------|
| **Hermes Agent** | 80 | 500 | 0 | Session state corruption, Windows install breakage | 🔥 High (21 comments/issue) |
| **OpenClaw** | 181 | 500 | 0 | Memory leak 8MB/req, SQLite corruption | 🔥 High (12 comments/issue) |
| **NanoBot** | 4 | 18 | 0 | GPT-6 routing, Responses API stream | ⚡ Medium (5 PR merges/day) |
| **Zeroclaw** | 7 | 50 | 0 | Release pipeline repair, plugin catalog | 🛠️ Internal-driven |
| **NullClaw** | 18 | 10 | 0 | A2A auth vuln, Matrix persistence | ⚡ Medium (security focus) |
| **PicoClaw** | 3 | 2 | 0 | DingTalk panic, OneBot spam | 🐌 Low (0 reactions) |
| **NanoClaw** | 1 | 36 | 0 | Linux Docker mount issues, Iron Proxy | 🤖 Bot-heavy |
| **IronClaw** | 1 | 6 | 0 | Dependencies update, tool selection proposal | 💤 Silent (no community) |
| **QwenPaw** | 8 | 4 | 0 | Desktop double-launch, context compression UX | ⚡ Medium (quick fixes) |

**Key metrics:**

- **Velocity leaders:** Hermes (13 PRs/day), OpenClaw (30 PRs/day), NanoClaw (30 closed PRs)
- **Community engagement:** Hermes (21 comments), OpenClaw (12 comments) >> others (<5)
- **Bug density:** OpenClaw (181 issues), Hermes (80) >> Zeroclaw (7), PicoClaw (3)
- **Security consciousness:** NullClaw (A2A vuln fix), NanoClaw (auth hardening), Zeroclaw (egress escape)

---

## 3. 🎯 Vị thế Hermes Agent

### Định vị

**"Enterprise stability player"** - không phải largest (OpenClaw 181 issues) nhưng most organized.

**Competitive advantages:**

1. **Cross-surface strategy:** CLI ↔ Desktop deep linking (#125903, #84683) - unique trong ecosystem. Competitors chỉ focus một surface.

2. **Telemetry maturity:** Shared metrics v3 với consent (#125074) - product instrumentation cho retention analysis. Signals enterprise readiness.

3. **Install method diversity:** Multi-surface (CLI, Desktop, managed SSH) nhưng đang pay technical debt - 4/10 top issues là install/compatibility bugs.

4. **Plugin ecosystem health:** 3 community plugins submit trong ngày. OpenClaw có catalog nhưng fewer organic submissions.

**Weaknesses relative to ecosystem:**

1. **Security debt visible:** 12/18 npm high-severity vulns (#107356) stacking. NullClaw fixed A2A auth same day. Hermes no action.

2. **Windows parity lag:** 4 issues in top 15. PicoClaw, QwenPaw, NanoClaw tất cả có Windows fixes merged. Hermes Windows install still broken (#125350).

3. **Session state brittleness:** 3 P0 issues (#124731, #125888, #125763). OpenClaw có SQLite corruption nhưng đang active fix (#159834). Hermes fixes đang stall.

### Market position

**Tier 1 (mass-market):** Hermes, OpenClaw, NanoBot
- 80+ issues, 500 PRs, multi-channel support
- High community engagement (>10 comments/issue)

**Tier 2 (specialists):** Zeroclaw (release tooling), NullClaw (security-first), QwenPaw (desktop UX)
- 7-18 issues, focused scope
- Internal-driven hoặc quick tactical fixes

**Tier 3 (niche/experimental):** PicoClaw, NanoClaw, IronClaw
- <5 issues, bot-heavy activity hoặc silent
- Single-platform focus

**Hermes position:** Top 3, but OpenClaw pulling ahead on velocity (30 vs 13 PRs/day). NanoBot faster on GPT-6 support - Hermes still patching routing issues.

---

## 4. 🔧 Hướng kỹ thuật chung

### Convergent patterns (4+ projects)

**1. Plugin/module architecture migration**

- **Hermes:** Plugin catalog growth, dependency isolation fixes
- **OpenClaw:** Catalog worker + capability discovery API (#8909)
- **Zeroclaw:** Runtime WASM plugins replace compile-time features (#8850)
- **NullClaw:** Eden AI, Tsubasa provider additions

**Rationale:** Binary bloat, install complexity, slow iteration → runtime-loadable modules.

**2. Session persistence rewrite**

- **Hermes:** Persist override drop messages (#124731), compaction duplicate (#125908)
- **OpenClaw:** SQLite corruption chase (#126821), block writes post-migration (#159834)
- **NanoBot:** Session refactor to SQLite (#5943), event loop blocking (#5580)
- **NullClaw:** Matrix next_batch disk persist (#968)

**Rationale:** JSONL + in-memory state → race conditions, data loss. SQLite migration wave.

**3. Context management complexity**

- **Hermes:** System prompt flip on leftover steer (#125763), compaction logic unclear
- **OpenClaw:** Deepseek-v4 fallback 200k not 1M (#127239), subagent delivery stale (#154834)
- **QwenPaw:** Compression trigger confusion (#7994, #7998), agent self-managed lifecycle (#4525)
- **IronClaw:** Tool selection BM25F+embeddings cho context pollution (#8113)

**Rationale:** Large contexts (>100K tokens) reveal edge cases. Compaction, tool advertising, lifecycle policies immature.

**4. Cross-platform install hell**

- **Hermes:** Windows Git/ffmpeg pinning (#125350), cron worker deps (#122222)
- **OpenClaw:** Bun Gateway spawn 8,462 config readers (#158339), update validation reject (#157227)
- **NanoClaw:** Linux Docker root-owned mounts (#3951), Iron arm64 support (#3891)
- **QwenPaw:** Desktop double-launch (#8000), single-instance guard missing

**Rationale:** Multi-OS (Win/Mac/Linux), multi-runtime (Node/Bun/Docker), multi-install-method (global/local/managed) → combinatorial test explosion.

### Divergent approaches

**Memory management:**

- **OpenClaw:** Catalog worker leak 8MB/req (#159514) - architectural fix in-flight
- **Hermes:** Cron external worker ModuleNotFoundError (#122222) - isolation fix
- **NanoBot:** Fallback model context budget separate (#5865) - accounting fix

**Auth/security:**

- **NullClaw:** Bearer principal scoping (#1012) - immediate P0 response
- **Hermes:** Npm vulns stack (#107356) - no visible action
- **Zeroclaw:** Shared auth state gateway+RPC (#11202) - proactive hardening

**Provider integration:**

- **NanoBot:** GPT-6 reactive patches (#5935, #5939) - fast tactical
- **Hermes:** Smart-approval ESCALATE unanswerable (#100532) - slow strategic
- **NullClaw:** Multi-gateway additions (Eden, Tsubasa) - breadth over depth

---

## 5. 🔀 Điểm khác biệt

### Chiến lược

**Hermes - "Enterprise platform":**
- Multi-surface (CLI/Desktop/SSH managed)
- Telemetry v3 for product analytics
- Cross-profile session handoff
- Trade-off: install complexity, Windows gaps

**OpenClaw - "Developer power tool":**
- Heavy automation (30 PR fix/day)
- Memory/performance focus (catalog leak, SQLite optimization)
- Bot-driven subsystem refactors (4-5 passes)
- Trade-off: high churn, stability regressions

**NanoBot - "Fast follower":**
- Quick GPT-6 support (5 merges/day)
- Provider breadth (Copilot, Codex, Responses API)
- Reactive bugfixes over architectural depth
- Trade-off: regression rate (5 tagged in 24h)

**Zeroclaw - "Release engineering":**
- Focus on CI/CD pipeline (crates.io, GitHub Release, docs promotion)
- Security-sensitive PR discipline (11/30 marked high-risk)
- WASM plugin migration strategic
- Trade-off: fewer end-user features

**NullClaw - "Security-first":**
- A2A auth vuln same-day fix
- Supervised mode approval flow polish
- Multi-channel stability (Matrix, Teams, WhatsApp)
- Trade-off: smaller user base, slower velocity

### Tính năng đặc trưng

| Dự án | Killer feature | Unique to |
|-------|----------------|-----------|
| Hermes | CLI→Desktop handoff `/handoff desktop` | ✅ Chỉ Hermes |
| OpenClaw | Catalog capability API + plugin hot-reload | ✅ Chỉ OpenClaw |
| NanoBot | Multi-backend web_fetch (Jina/Unbrowse fallback) | ✅ Chỉ NanoBot |
| Zeroclaw | Crates.io recovery + lean scheduled tasks | ✅ Chỉ Zeroclaw |
| NullClaw | Supervised autonomy pause on risk | ✅ Chỉ NullClaw |
| IronClaw | BM25F+embedding hybrid tool selection | ✅ Chỉ IronClaw |
| QwenPaw | Agent self-managed context checkpoint | 🔄 Proposal stage |

**Common features** (5+ projects): Multi-provider support, MCP integration, session persistence, context compression, scheduled tasks/cron.

### Cộng đồng

**High engagement (>10 comments/issue):**

- **Hermes:** 21 comments on cron worker crash (#122222) - pain-driven
- **OpenClaw:** 12 comments on `.trim()` crash pattern (#137729) - debate-driven

**Self-fixing community:**

- **PicoClaw:** User @reported OneBot spam (#3395) → same user PR fix (#3396) within hours
- **NullClaw:** Bearer vuln detailed repro (#974) → maintainer PR (#1012) next day

**Silent/bot-heavy:**

- **IronClaw:** 0 comments on tool selection proposal (#8113) - no community validation
- **NanoClaw:** 30 closed PRs, all internal team (@glifocat, @barnuri) - no external contributors

**Onboarding signals:**

- **QwenPaw:** Font size marked `good first issue` (#7999) - contributor funnel
- **Hermes:** Plugin submissions (feishu, tsubasa, rich-ui) - ecosystem participation

---

## 6. 📈 Mức độ trưởng thành cộng đồng

### Tier S - Self-sustaining

**OpenClaw:** 181 issues, 12-comment debates, subsystem ownership visible. Contributors fix own subsystems (channel plugins pass 4, infra deslop pass 5). Community debug patterns emergent (`.trim()` unguarded crashes).

**Hermes:** 80 issues, 21-comment pain threads, plugin submissions organic. Cross-surface use cases drive features (CLI↔Desktop handoff). Security debt visible but unaddressed → community patience tested.

### Tier A - Active core

**NanoBot:** 4 issues but 5 merges/day. Fast tactical response (GPT-6 routing, Responses stream). Regression tracking culture (tags on #5938, #5933). Test coverage gaps (high regression rate) but velocity high.

**NullClaw:** 18 issues, security-conscious PRs. A2A vuln → fix pipeline <24h. Supervised mode polish shows iterative UX refinement. Smaller but disciplined.

### Tier B - Emerging

**QwenPaw:** 8 issues, quick fixes (file panel same-day PR). Desktop focus but Windows bugs stack. Community asks accessibility (font size), context clarity. Good first issue tags → onboarding intent.

**Zeroclaw:** 7 issues, internal-driven. Release pipeline repair methodical (stacked PRs #11091→#11095→#11105). High-risk labels show maturity but no external contributors visible.

### Tier C - Nascent/silent

**PicoClaw:** 3 issues, 0 reactions. User self-fix (OneBot spam) but no maintainer engagement. DingTalk panic (#3382) unaddressed 1 comment.

**NanoClaw:** 1 issue, 36 PRs all internal. Bot-heavy (30 closed). Linux/Docker edge cases active fix but no community validation.

**IronClaw:** 1 issue, 0 comments. Tool selection proposal (#8113) no feedback. Dependabot dominates (5/6 PRs). Community absent.

### Maturity indicators

**Stage 1 - Critical mass:** Issue volume >20, comment threads >5, external PRs
- ✅ Hermes, OpenClaw, NullClaw
- ❌ Others

**Stage 2 - Specialization:** Subsystem ownership, contributor retention, pattern libraries
- ✅ OpenClaw (subsystem refactors), Hermes (plugin ecosystem)
- 🔄 NanoBot (fast but churn), Zeroclaw (internal-only)

**Stage 3 - Self-governance:** Community debate, RFC process, security disclosure
- ✅ OpenClaw (`.trim()` debate)
- 🔄 Hermes (no npm vuln response → governance gap)
- ❌ Others

---

## 7. 🔮 Tín hiệu xu hướng

### T+3 months (Q4 2026)

**1. Plugin ecosystem consolidation**

4 dự án đang migration sang runtime modules. Winner: platform với fastest plugin discovery + easiest authoring.

**Hermes advantage:** Đã có submissions organic. Risk: dependency isolation bugs (#122222) slow adoption.

**OpenClaw threat:** Catalog API + hot-reload technical edge. Risk: complexity barrier.

**Prediction:** Hermes giữ breadth, OpenClaw giữ depth. Market split power-users vs ease-of-use.

---

**2. Context window arms race plateau**

GPT-6 200K-1M windows expose compaction/lifecycle bugs across all projects. No one solved agent-managed context yet (#4525 QwenPaw, #125763 Hermes leftover steer).

**Next bottleneck:** Not window size, but *quality preservation under compression*. Deepseek fallback 200K (#127239 OpenClaw) shows providers don't trust own limits.

**Prediction:** Q4 focus shift từ "bigger context" sang "smarter compaction". Whoever ships checkpointing + quality metrics first wins long-running agent use cases.

---

**3. Windows parity becomes table stakes**

4/9 dự án có Windows bugs in top issues. Enterprise adoption blocked.

**Current leaders:** NanoClaw (Iron arm64 + Linux mounts fix), QwenPaw (desktop double-launch addressed).

**Hermes risk:** Windows install broken (#125350), subprocess hang, launcher issues stacking. OpenClaw cũng vậy (WSL2 SQLite corruption #126821).

**Prediction:** Whoever ships Windows installer + automated E2E tests trước Q4 end captures SMB market. Currently no one has it.

---

**4. Security as differentiator**

**NullClaw:** A2A vuln fixed <24h.  
**Hermes:** Npm vulns stacking 107356, no action.  
**Zeroclaw:** 11/30 PRs high-risk labeled.

Enterprise won't adopt agents with stale CVEs. First security audit + public disclosure policy wins enterprise trust.

**Prediction:** NullClaw hoặc Zeroclaw (nếu scale ra mass-market) capture security-conscious verticals (finance, healthcare). Hermes loses nếu không address npm debt by Q4.

---

**5. Multi-modal agent infrastructure**

Không project nào có rich media handling mature. Voice notes mention (Zeroclaw WhatsApp #11056), image uploads broken (NanoClaw #159985), iOS keyboard fail (OpenClaw #122648).

**Gap:** Audio/video/screen-share trong agent workflows. Siri/Alexa integration zero.

**Prediction:** 2027 H1 killer app = voice-first agent. Project nào ship iOS/Android native SDK + voice pipeline trước thắng consumer market. Currently all web/CLI focused.

---

**6. Release velocity wall**

**OpenClaw:** Update pathway broken, 8.2→9.6 stack overflow (#159765).  
**Zeroclaw:** Release took 3.5h, crates.io failures (#10814).  
**All:** Zero releases trong ngày dù 90+ PRs merged.

**Bottleneck:** Migration complexity, backward compat testing, rollback safety.

**Prediction:** Q4 ai ship "preview channel" + "stable channel" split + auto-rollback trước giữ enterprise trust. OpenClaw Gateway memory leak (#159514) shows big players cũng ship broken releases.

---

### T+12 months (2027 Q3)

**Consolidation cascade:**

- **2-3 survivors** trong mass-market tier. Hermes vs OpenClaw vs NanoBot.
- **Niche players** (Zeroclaw tooling, NullClaw security) bị acquire hoặc pivot.
- **Silent projects** (IronClaw, PicoClaw) abandoned hoặc merge vào survivors.

**Acquisition targets:**

- **Zeroclaw** (release tooling) → OpenClaw hoặc Hermes mua cho CI/CD muscle
- **NullClaw** (security-first) → Enterprise player mua cho compliance story
- **QwenPaw** (desktop UX) → Hermes mua cho native app gap

**Technical convergence:**

- SQLite session store becomes default (all đang migrate)
- WASM plugins standard (Zeroclaw leads, others follow)
- Multi-surface orchestration (Hermes CLI↔Desktop pattern copied)

**Market segmentation:**

- **Developer tools:** OpenClaw (power, complexity)
- **Enterprise platform:** Hermes (multi-surface, telemetry)
- **Consumer app:** TBD - hiện không ai focus. Gap cho new entrant.

---

### Wild cards

**1. OpenAI Agents API productization**

Nếu OpenAI ships official agent runtime Q4 2026, toàn bộ ecosystem này becomes thin wrappers. Hermes/OpenClaw pivot thành OpenAI tooling platforms hoặc die.

**Hedge:** Plugin ecosystems (runtime modules independent of OpenAI API).

---

**2. Regulation hits agent autonomy**

EU AI Act, California SB-1047 equivalents force audit trails, human-in-loop. Projects không có supervised mode (Hermes weak, NullClaw strong #1009) cannot sell vào regulated markets.

**Prediction:** NullClaw approval flow architecture becomes compliance requirement. Hermes phải retrofit hoặc lose healthcare/finance verticals.

---

**3. Context window collapse**

Nếu GPT-6 quality degradation at >100K confirmed, entire "long context agent" thesis fails. Market resets về RAG + retrieval.

**Winners:** Projects với good RAG infra already (none standout currently).  
**Losers:** QwenPaw context lifecycle focus, IronClaw tool selection optimization become irrelevant.

---

## 🎯 Kết luận chiến lược

### Hermes Agent - Recommended moves

**Q4 2026 priorities:**

1. **Fix Windows parity** (#125350, subprocess hang, launcher) - table stakes cho SMB adoption
2. **Address npm security debt** (#107356) - enterprise blocker
3. **Session state stabilization** (3 P0 bugs) - trust issue
4. **Double down CLI↔Desktop** - unique moat, expand với mobile handoff

**Strategic positioning:**

- **Don't compete** với OpenClaw trên raw velocity (30 vs 13 PRs/day unsustainable)
- **Do compete** trên enterprise readiness: security, Windows, telemetry, multi-surface
- **Acquire or partner** Zeroclaw (release tooling) hoặc NullClaw (security) to fill gaps

**Risk mitigation:**

- OpenAI Agents API threat → invest plugin ecosystem depth
- Regulation threat → retrofit supervised mode from NullClaw pattern
- Context window quality → pivot messaging từ "long context" sang "smart compression"

### Ecosystem outlook

**Healthy:** High velocity, convergent architecture patterns, security consciousness emerging.

**Fragile:** Zero releases = deployment risk for all. Windows gaps = enterprise blocked. Security debt visible (Hermes npm, OpenClaw memory leak shipped).

**Opportunity:** Voice-first, mobile-native, regulated-industry compliance gaps. Whoever ships first captures new segments.

**2027 prediction:** 2-3 mass-market survivors, rest acquire/pivot/die. Winner = best Windows support + fastest plugin authoring + first security audit.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo hệ sinh thái OpenClaw — 2026-09-28

## 1. Tóm tắt hôm nay

Gateway 2026.9.6 gặp memory leak nghiêm trọng: catalog worker rebuild registry mỗi request → 8 MB unreleasable modules/req → 1.5–2.5 GB/h (#159514). Team đang triển khai 30 PR fix trong 24h, tập trung vào stability: update failures, context compaction abort, SQLite corruption tái phát.

---

## 2. Releases

Không có release mới. Đợt 2026.9.6 phát hành 25/09 hiện gặp blocker:
- Memory leak catalog worker (#159514) 
- Update migrates config xong bị reject validation → Gateway stopped (#157227)
- Stack overflow trong session-sqlite migration upgrade từ 8.2 (#159765)

---

## 3. Tiến độ dự án

### 🔴 Critical fixes đang merge
**Memory & Stability:**
- #159834 block writes tới retired SQLite paths sau Doctor migration
- #159503 fix queued message removal không hide transcript
- #159792 cho Cron reservation chờ SQLite writer mà không freeze Gateway

**Plugin lifecycle:**
- #159013 release model/auth readers khi xoá agent (đóng #159007)
- #159396 fix stale caller authority sau config restart channel account

**Update framework:**
- #158447 fix Bun Gateway spawn 8,462 config-read children trong update (#158339)
- #160000 upgrade fixture honor loaded stop policy thay vì hardcode 30s

### 📊 Subsystem refactor (đợt 4-5)
- #159759 infra deslop pass 5
- #159798 browser + memory plugins cleanup
- #159998 channel plugins (iMessage/WhatsApp/Teams/Signal/LINE) pass 4

---

## 4. Điểm nổi bật cộng đồng

### 🔥 Highest engagement (12 comments)
**#137729** — `.trim()` unguarded crash đã có fix pattern sẵn trong codebase, gây TypeError ở transcript replay + error classification. Team đang debate approach.

### ⚠️ Multi-agent routing pain (10 comments)
**#157986** — `agentTurn` automation 100% fail với DataCloneError từ 24/09, trong khi command/script payload OK. Feishu channel + gateway scheduled task.

**#144291** — Config hot-reload abort mọi in-flight agent turn: "prepared model runtime plugin generation was superseded". Gây message loss khi operator change heartbeat config.

---

## 5. Ổn định & Bugs

### 🚨 P0 Blockers (7 issues)
1. **Gateway unresponsive** (#156392): Mac Mini M5 Pro 100% CPU, heartbeat disabled
2. **SQLite corruption recurrence** (#126821): Pristine rebuild bị corrupt trong 15–24h WSL2
3. **iOS keyboard input** (#122648): Composer ignore keyboard, credential save fail sau force-quit
4. **Update pathway** (#157205, #159765): 8.2→9.6 migration stack overflow; 9.5→9.6 Doctor timeout

### 🐛 Memory & Resource
- **Gateway RSS leak** (#154812): Outside V8 heap → 9.32 GB RSS, chỉ 1.2 GB heap
- **tmp disk fill** (#158390): plugin-captures không GC sau build/catalog ops
- **Catalog churn** (#154124): model-catalog refresh invalidate mọi session row → Control UI fallback 30s poll

### 🔁 Context & Recovery
- **Deepseek-v4-flash** (#127239): Context window fallback 200k thay vì catalog 1M
- **Subagent delivery** (#154834): Failed delivery entry recur mỗi turn runtime context
- **Plugin stale handles** (#156883): Config hot-reload/plugin lifecycle để lại stale tool handles → "was reloaded" mỗi heartbeat

---

## 6. Yêu cầu tính năng

### ✅ Merged/In-flight
- **#160022** (PR): UI show Open/Running session counts bên cạnh Online people
- **#159815** (PR): 4 Lobsterdex characters mới (Clawnstantine, Clawie Stardust, Taylor Pinch, Clawtoo Deetoo)

### 📋 Requested
- **#159674** → PR #159956: WhatsApp list group members trong directory
- **MiniMax M3 thinking modes** (#89114): /think menu thiếu xhigh/adaptive/max (provider profile limitation)

---

## 7. Phản hồi người dùng

### 😤 Update frustration
13 "update failure" reports trong 48h:
- `runtime-verification-failed` (5 reports)
- `global-install-failed` (3 reports) 
- `state-migrated-no-rollback` (1 report)

Shared pattern: Doctor rewrite config → revalidation reject → Gateway stopped.

### 🤔 Auth confusion
**GPT-6 embedded support** (#155937): Sol rejected dù có OAuth discovery. Docs conflate SIWC vs Codex OAuth vs native Codex login → PR #160023 clarify.

**Codex compact 404** (#123706, #84110): Production stuck 2026.5.12, Codex rewrites prompt giữa tool-call continuation → cache bust 93%→47%.

---

## 8. Backlog & Roadmap

### 🔧 Engineering debt in-flight
- Memory containment cho semantic checks (#160014)
- iOS release qualification tách setup vs messaging checks (#160025)
- Browser upload fail trên Chrome extension profiles (#159985)

### 🛡️ Security-sensitive
- #159013, #159834: SQLite lifecycle + resource cleanup
- #158070: Preflight compaction fail khi run queue với deliver authority

### 📐 Observability gaps
- Session list stall khi catalog refresh (#154124)
- OpenRouter model fetch timeout 10s trong gateway, ~360ms ngoài (#154529)
- Kubernetes /tmp sticky protection missing → session observer disabled (#156985)

**Next 72h forecast:** Memory leak fix + update pathway stabilization. Team đang fast-track 6 PR security-sensitive + 14 PR automation-risk.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo hoạt động NanoBot - 2026-09-28

## 1. Tóm tắt hôm nay

Ngày tập trung vào sửa lỗi và cải thiện provider. 5 PR được merge, xử lý vấn đề GPT-6 với Copilot/Codex, lỗi Responses API stream, và mất dữ liệu cron. 18 PR đang mở, nhiều fix quan trọng chờ review.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Đã merge (5 PR):**

- **#5935** - Fix GPT-6 routing qua Responses API cho GitHub Copilot. Model GPT-6 trước đó rơi vào Chat Completions, gây lỗi.
- **#5937** - Stop Responses stream đúng event terminal. Trước đó chờ EOF, gây lag.
- **#5938** - Giữ `strict` parameter trong Responses tool conversion. Bug này bắt MCP filter optional thành required.
- **#5865** - Fallback model nhỏ không ăn vào context budget model chính nữa.
- **#5933** - Cron không mất action khi save store fail. Critical fix cho data loss.

**PR quan trọng đang chờ (P0-P1):**

- **#5943** (P1) - Refactor session sang SQLite làm source of truth. JSONL shared state gây race condition.
- **#5580** (P1) - Move session persist ra khỏi event loop. Storage chậm block toàn bộ runtime.
- **#5934** (P2) - Fix pagination history load không trigger khi viewport chưa đầy.

**Tính năng mới:**

- **#5945** - Thêm Unbrowse backend cho web_fetch, fallback chain thêm 1 option.
- **#5941** - Connect WebUI local vào nanobot remote đang chạy trên server.
- **#5942** - iOS PWA top-edge color surface fix cho theme switching.
- **#5944** (closed) - Polish GitHub star invitation với UI mới.

## 4. Điểm nổi bật cộng đồng

**Issue được quan tâm:**

- **#5924** - Agent stuck trong sudo loop. Sudo timeout 1 turn, agent retry đến max iteration rồi obsess với command đó. Usability killer.
- **#5898** - GPT-6 qua GitHub Copilot lỗi provider config (đã fix trong #5935).
- **#5939** - Codex model discovery thiếu GPT-6 Sol & Luna vì pin `client_version=0.153.4` (đã fix trong #5940).

Không có PR nào có reaction đặc biệt, nhưng P0/P1 bugs nhận được attention nhanh.

## 5. Ổn định & Bugs

**Critical fixes merged:**

- Data loss trong cron service (#5933)
- GPT-6 model routing sai (#5935)
- Responses stream không stop (#5937)
- Tool parameter bị strip (#5938)

**Bugs đang xử lý:**

- **#5924** - Sudo loop block agent
- **#5864** - Discord delayed reaction tasks không cancel khi runtime reset
- **#5780** - Context compaction spam notification (có conflict, cần rebase)
- **#5931** - Telegram command với newline/tab bị mất parameter
- **#5257** - Sustained-goal agent loop khi idle

**Regression tracking:**

Nhiều PR tag `regression` - team đang chase side effects từ refactor trước. #5938, #5933, #5931 đều là regression.

## 6. Yêu cầu tính năng

- **#5941** - Remote connection từ local WebUI. Use case: dev machine connect vào server nanobot không cần manual URL hunting.
- **#5945** - Unbrowse integration cho web fetch. Thêm commercial reader option trước khi fallback Jina.
- **#5944** (rejected) - GitHub star invitation polish. Closed nhanh, có thể không đủ value hoặc đụng branding guideline.

## 7. Phản hồi người dùng

**Pain points từ issues:**

- **Sudo workflow** (#5924) - Multi-turn sudo không work, critical cho system admin use case
- **Model discovery lag** (#5939, #5898) - GPT-6 models missing/breaking. Provider integration chưa theo kịp OpenAI release cadence
- **WeChat polling spam log** (#5936, fixed) - Minor QoL issue nhưng được fix nhanh

**Developer experience:**

PR #5580, #5943 focus vào architecture debt - session management đang block performance. Community chưa complain public nhưng team prioritize P1.

## 8. Backlog & Roadmap

**Infrastructure debt:**

Session refactor (#5943, #5580) là priority. JSONL + in-memory cache architecture không scale, SQLite migration đang progress.

**Provider stability:**

GPT-6 support đang được patch reactive. Codex integration cần version bump strategy thay vì hardcode client version.

**Channel reliability:**

Discord (#5864), Telegram (#5931), WeChat (#5936) đều có bug fixes. Multi-channel support rộng nhưng quality chưa đều.

**Pending high-value work:**

- Remote instance connection (#5941) - multi-instance orchestration foundation
- Sustained-goal loop fix (#5257) - agent behavior core issue, open 2 tháng
- Context compaction UX (#5780) - notification spam conflict chưa resolve

---

**Nhận xét tổng quan:**

Maintenance phase. Nhiều bug từ recent refactor được catch và fix nhanh (5 merge trong ngày). Architecture debt (session, event loop blocking) đang được address. Provider layer chưa stable với model mới - reactive patching thay vì proactive compatibility. Channel integrations có quality gap.

Team velocity cao nhưng regression rate cũng cao - test coverage có thể chưa đủ cho safe refactor.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-09-28

## 1. Tóm tắt hôm nay

Ngày tập trung vào ổn định release pipeline và security hardening. Đóng 5 PRs liên quan release tooling (dashboard publish, docs promotion, egress escape bug). Team push vào plugin architecture với gateway capability catalog và channel mirroring. Không có release mới.

## 2. Releases

Không có release. Nhưng #10814 track release efficiency sau v0.8.5 - đợt release trước có vấn đề crates.io publish và dài 3.5 giờ.

## 3. Tiến độ dự án

**Plugin Architecture (Epic #8850 - P2, high-risk)**
- #8909: Gateway capability catalog - merged. Show installed vs cached plugins qua `/api/plugins`
- #11178: Channel plugins can declare `provides` field để thay thế built-in channels - merged
- Mục tiêu: Loại compile-time features, shrink binary, runtime-installable WASM plugins

**Release Pipeline Repair (Tracker #10814)**
- #11086: Fix dashboard bundle publish (2 lần build khác nhau) - merged
- #11091: Move crate verification trước GitHub Release (v0.8.5 fail sau khi public) - open
- #11095: Block version bump nếu crates không publish được - stacked trên #11091
- #11105: Recovery script cho crates.io publish fail - stacked trên #11095
- #11109: Fix docs promotion - llms.txt không sync - merged

**Security & Infrastructure**
- #11202: Gateway và RPC share 1 auth state (trước mỗi thằng tự build, policy change không sync)
- #11171: Bound local RPC transport + chunked uploads (fix silent disconnect khi frame >8MB)
- #11107: Escape apostrophes trong egress remedy commands - merged
- #11164: Daemon own pricing refresher (trước chỉ gateway/channel start nó)

**Session & Memory**
- #10407: Persistent session attachments (4 file max, survive daemon restart) - needs author action
- #9746: Per-agent ownership scoping cho session tools - needs author action
- #10652: CLI memory commands qua storage-aware resolver (fix PostgreSQL/Qdrant alias) - stale candidate

**Channels**
- #11054: WhatsApp render thematic breaks & setext headings
- #11056: WhatsApp docs về voice notes
- #11060: WhatsApp queue forced reply outside voice chat
- #9155: WhatsApp Ctrl+C bug (listener stop nhưng supervisor restart) - closed

## 4. Điểm nổi bật cộng đồng

- #11204 (mới nhất): OpenRouter cost tracking hoàn toàn hỏng - $0.00 cho 2.1M tokens, tất cả classified "free tok". `usage.cost` không ingest. User @alperyilmaz report. Chưa có response.

- #10407 (nhiều context): Session attachments PR - feature lớn, 400+ lines changed, touch 15 files. Community contributor @vrurg. Needs author action.

- #11196: Build commit stamping - contributor @ConYel add git hash vào `--version` (trước chỉ có version number giữa 2 release là không phân biệt được 333 commits)

## 5. Ổn định & Bugs

**Đóng hôm nay:**
- #11097: Plugin egress remedies không escape apostrophes → fixed #11107
- #11093: Stable docs promotion bỏ sót llms.txt → fixed #11109
- #9155: WhatsApp Ctrl+C infinite restart → đóng (không rõ fix hay duplicate)

**Mở/In-progress:**
- #11204: OpenRouter cost $0.00 - S2 severity, runtime/daemon
- #10480: Image request rejection recovery - distinguished contributor, needs maintainer review
- #10197: ACP persist interrupted turn progress - high-risk manual testing

**Release-gate issues:**
- #11086, #11091, #11095, #11105: Chuỗi PRs fix release pipeline. #11086 merged, còn lại open/stacked.

## 6. Yêu cầu tính năng

**Active development:**
- #8850: Runtime plugin system thay compile-time features (in-progress)
- #11171: Chunked RPC uploads + oversized frame handling
- #11164: Daemon-owned pricing refresh
- #11196: Build commit in `--version`

**Stalled/needs-author:**
- #10407: Session persistent attachments
- #9746: Per-agent tool ownership
- #7821: Canonical sandbox_policy schema (open từ 6/17)

## 7. Phản hồi người dùng

- @alperyilmaz: OpenRouter billing hoàn toàn hỏng (#11204). Critical cho production use.
- Không có feedback tích cực rõ ràng trong 24h.
- Community PRs: @ConYel (build stamping), @RustLangLatam (WhatsApp improvements), @mouse-value-add (You.com MCP docs).

## 8. Backlog & Roadmap

**Short-term (từ trackers):**
- #10814: Release efficiency - reduce build duplication, shorten prep/recovery
- #9381: crates.io publishing polish (Windows symlinks, cargo-install UX)
- #8850: Plugin migration - channels & tools off feature flags

**Architecture shifts:**
- WASM plugins thay Cargo features (giảm binary size, runtime install)
- Unified auth state giữa gateway và RPC
- Session persistence layer (attachments, interrupted turns)

**Parking lot:**
- #9381 có `status:parking-lot` - follow-ups sau v0.8.4 nhưng không block release

---

**Risk assessment:** 11/30 open PRs marked `risk:high`. Release pipeline repair critical - v0.8.5 took 3.5 hours với crates.io failures. OpenRouter cost bug potentially affects billing for all users on that provider.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-09-28

## 1. Tóm tắt hôm nay

Không có release mới. Hoạt động chính: đóng issue #3287 về IRC long message (stale sau 2 tháng), issue mới #3395 yêu cầu tắt auto-reaction OneBot, PR #3396 fix ngay vấn đề đó. Bot vẫn panic khi DingTalk reconnect (#3382).

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đang mở:**

- **#3396** (mới hôm nay): thêm `reaction_enabled: false` cho OneBot channel. Ngăn spam emoji 289 vào mọi tin nhắn group QQ. Liên quan issue #3395.
- **#3353** (stale từ 31/8): giới hạn tool feedback animation 5 phút, dừng ngay khi edit error. Chống animation chạy mãi khi cleanup lỡ.

**Xu hướng:** tập trung fix UX khó chịu (spam reaction, animation leak). Không có feature lớn đang dev.

## 4. Điểm nổi bật cộng đồng

- **#3395 + #3396**: người dùng QQ/NapCat phản ánh mọi tin nhắn đều bị bot react emoji. Tác giả issue tự tạo PR fix trong vài giờ. Response nhanh, PR clean (opt-in config).
- **#3287**: đóng do stale. 14 comment nhưng không merge, vấn đề IRC split message 512 bytes chưa giải quyết.

Tương tác thấp (0 👍 trên tất cả issue), nhưng người dùng tự fix issue nhanh.

## 5. Ổn định & Bugs

**#3382 (nghiêm trọng)**: DingTalk stream SDK vẫn panic `send on closed channel` khi reconnect. Đã fix #973 trước đó nhưng v0.3.1 vẫn tái phát. Upstream SDK v0.9.1 không đủ. 1 comment, chưa có action.

**#3353**: animation leak - edge case khi lifecycle cleanup lỡ, channel message bị edit liên tục. Timeout 5 phút + stop on error là giải pháp tạm. PR stale 1 tháng, chưa merge.

## 6. Yêu cầu tính năng

- **#3395**: tắt được auto-reaction OneBot (đã có PR #3396)
- **#3287** (đóng): xử lý IRC message dài hơn 512 bytes như một message liền - chưa implement

Không có feature request lớn. User chủ yếu muốn tắt behavior khó chịu.

## 7. Phản hồi người dùng

- OneBot user khó chịu với auto-emoji mọi tin nhắn, muốn config tắt
- DingTalk user gặp panic lặp lại, mất ổn định
- IRC user cần xử lý long message tốt hơn (stale, không ưu tiên)

Không có feedback tích cực. User report bug/annoyance.

## 8. Backlog & Roadmap

Không có roadmap công khai trong data. Backlog:

- **Ưu tiên cao**: fix DingTalk panic #3382 (stability)
- **Đang xử lý**: merge #3396 (OneBot reaction toggle), #3353 (animation bound)
- **Bỏ qua**: IRC long message #3287 (đóng do stale)

Dự án thiên về bugfix/UX polish hơn feature mới. Không có signal về tính năng lớn sắp ra.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-09-28

## 📊 Tóm tắt hôm nay

Project đang giai đoạn bug-fixing và hardening mạnh. 36 PR (30 đóng), tập trung fix lỗi Linux/Docker, Iron Proxy, và setup flow. Core team (@glifocat, @barnuri) push nhiều fix về container lifecycle, auth security, và provider stability.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

### Các vấn đề chính được fix:

**Linux/Docker issues:**
- #3951 (OPEN): `ncl tasks delete` fail trên Linux - Docker tạo mount point root-owned, block rmSync
- #3947: Host giờ stop container khi session/agent group bị xóa
- #3878: Setup stop ping agent container trước khi xóa folder

**Iron Proxy improvements:**
- #3950: Trust operator CA cho private model hosts (`https://models.home.arpa`)
- #3891: Chạy được trên arm64 hosts (trước bị `exec format error`)
- #3915: Skip invalid `allowed-hosts.json` entries thay vì abort setup
- #3883: Recover orphaned Iron Control database khi reinstall

**Provider/agent-runner stability:**
- #3918: Fix result-door không nudge turn đã reply qua tool
- #3908: Không answer failure notice với failure notice (tránh loop)
- #3893: Keep heartbeat alive khi Claude stream long block
- #3919: OpenCode setup reject local model URL Iron Proxy không route được

**Setup/verification robustness:**
- #3949: Mattermost verify-runtime derive callback secret khi unset
- #3905: Log OpenCode endpoint verification và ping duration
- #3910: Detect gateway không parse nested pnpm output
- #3887: Readiness probe không clip vào deadline, report reason khi fail

**New features:**
- #3932: `/add-lean-tasks` - scheduled task chạy minimal context, tiết kiệm cho small/local model
- #3931: Provider option `minimalContext` cho Claude

**Architecture:**
- #3925: Provider-wrapper seam cho per-query model và retryable failures

### Test hardening:
- #3945: Delivery drain test seed 9 session thay vì 20 (fix CI timeout)
- #3892: Community portal test wait journal clear thay vì sleep

## 🔥 Điểm nổi bật cộng đồng

Không có discussion nhiều. PRs chủ yếu internal (core-team). Issue #3951 mới mở hôm nay, chưa có comment.

## 🐛 Ổn định & Bugs

**Critical:**
- #3951: Linux rootful Docker - task delete để lại orphaned session, log spam `SqliteError: unable to open database file` mỗi phút

**Fixed:**
- Container lifecycle: orphaned containers sau delete/uninstall
- Iron Proxy: arm64 support, CA trust, invalid config handling
- Mattermost: callback auth security (#3823 - merged)
- Agent runner: failure notice loops, heartbeat timeout
- Setup: nhiều edge case trong verification và cleanup

## ✨ Yêu cầu tính năng

- #3932: Lean tasks cho scheduled runs - approved, đang review
- #3950: Private CA support cho Iron - đang review

## 💬 Phản hồi người dùng

Không có direct user feedback. Issues/PRs driven bởi internal testing và CI findings.

## 🗓️ Backlog & Roadmap

Không có explicit roadmap. Pattern cho thấy focus:
1. Stabilize Linux/Docker deployment
2. Harden Iron Proxy cho production
3. Setup flow resilience
4. Cost optimization (lean tasks)

Backlog còn 1 open issue (#3951), 6 open PRs chính cần review.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-09-28

## 🎯 Tóm tắt hôm nay

Ngày bận rộn. 3 PR mới merge xử lý bugs bảo mật và tính năng provider. 1 PR mới mở thêm Tsubasa provider. Đóng loạt 10 issue cũ từ tháng 3-6 liên quan email, WhatsApp Web, supervised mode, Matrix persistence.

## 📦 Releases

Không có.

## 🚀 Tiến độ dự án

**PRs merged hôm nay:**

- **#1012** (bảo mật): Fix lỗ hổng A2A authentication. Trước đây bearer token chỉ check ở gateway, sau đó task/context lookup dùng bare ID → caller khác cùng bearer token đọc được task và context của nhau. Fix: scope task và session theo principal identity từ bearer.

- **#968** (Matrix): Matrix channel quên next_batch token khi restart → mỗi lần khởi động lại fetch initial sync, xử lý lại tin cũ. Fix: persist token vào disk. Bonus: tách test env để tránh collision giữa test suite.

- **#958** (Teams): Bot Framework JWT validation fail vì đọc claim `serviceUrl` nhưng Teams gửi `serviceurl` (lowercase). Fix: thêm fallback lowercase. Tăng JWKS fetch timeout 5→30s.

- **#990** (Eden AI): Thêm Eden AI gateway provider, đi qua OpenAI-compatible path, base URL `api.edenai.run/v2/openai`. EU-based, multi-vendor routing.

**PRs đóng khác:**

- #527: Big adaptive pipeline feature (turn scoring, skill routing, email IMAP, WhatsApp Baileys) - merged hoặc đóng do conflict/redesign
- #667: Email IMAP IDLE polling với network resilience
- #969: Approval flow cho supervised mode
- #1009: Fix supervised autonomy để pause thay vì fail medium/high-risk command

**PR mới mở:**

- **#1013**: Thêm Tsubasa chat provider (OpenAI-compatible), 32k context, 8k output default.

## 💬 Điểm nổi bật cộng đồng

- **#974** (bug A2A): Báo cáo chi tiết về bearer reuse vulnerability với repro step. → PR #1012 fix.
- **#764** (feature request): Thêm NullClaw logo vào trang agentskills.io/clients. 4 comment, đang open, maintainer chưa phản hồi.
- **#613**: Yêu cầu cải thiện description cho config.json options, 4 👍. Đóng hôm nay.

## 🐛 Ổn định & Bugs

**Fixed:**

- A2A bearer principal isolation (#1012)
- Matrix next_batch persistence (#968)  
- Teams lowercase serviceurl claim (#958)
- Supervised approval flow (#969, #1009) - tool approval không hoạt động, giờ pause đúng cách

**Đóng loạt bugs cũ:**

- #183: WhatsApp Web Baileys support
- #477: Lark/Feishu WS disconnect
- #665: NoResponseContent error
- #408: Tool call parsing breaks JSON (colon extracted as tool name)
- #427: Custom skill not available as tool
- #900: `approval_request` defined nhưng không emit

## 🆕 Yêu cầu tính năng

- **#764** (open): Thêm vào Agent Skills client list
- **#914** (closed): JIRA access tool - đóng hôm nay
- **#623** (closed): Thêm ddgs metasearch cho web_search
- **#449** (closed): Official Docker Hub image với compose file

## 👥 Phản hồi người dùng

- **#861**: Người dùng bối rối với Web UI setup trên VPS headless, yêu cầu hướng dẫn rõ hơn. Đóng với giải thích.
- **#619**: Tester phàn nàn error message `error.ApiError` không đủ chi tiết để debug. Đóng sau cải thiện logging.
- **#613**: Newcomer khó hiểu config.json options, cần documentation tốt hơn.
- **#354**: Homebrew upgrade break service do hardcoded Cellar path trong LaunchAgent plist.

## 📋 Backlog & Roadmap

Không có roadmap public. Dựa activity:

- Tiếp tục mở rộng provider gateway (Eden AI, Tsubasa vừa thêm)
- Tăng cường bảo mật auth/authorization (A2A fix là signal)
- Supervised mode approval flow đang được polish (#969, #1009)
- Channel stability (Matrix persistence, Teams JWT, email IMAP đã fix)

Backlog có WhatsApp Web/Baileys (#183), JIRA tool (#914), Docker Hub official image (#449) đã đóng - có thể merged hoặc rejected.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 2026-09-28

## 📊 Tóm tắt hôm nay

Không có hoạt động mới trong ngày 28/09. Tất cả issues và PRs đều từ ngày trước (27/09 trở về). Dự án đang trong giai đoạn cập nhật dependencies định kỳ và có 1 proposal mới về tool selection optimization.

## 🚀 Releases

Không có releases.

## 📈 Tiến độ dự án

### PR đáng chú ý:

**#8114** - Cập nhật 31 dependencies Rust
- Scope: XL, risk low
- Các thay đổi lớn: thiserror 2.0.20→2.0.21, uuid 1.24.0→1.26.1, base64 0.22.1→0.23.1
- Dependabot merge tự động, chưa được review

**#8104** - CLOSED - Cập nhật 29 dependencies
- Merged sau 7 ngày
- Pattern: maintenance releases thường mất ~1 tuần review

**#8078, #8103, #7834** - Dependencies backlog
- Tokio ecosystem, GitHub Actions, WASM toolchain
- Tồn đọng 1-5 tuần, chưa merge

**#7988** - Codebase knowledge graph refresh
- Bot CI tự động update
- Tồn đọng 30 ngày - possible stale automation

### Xu hướng:
- Heavy dependency management activity
- Bot-driven updates chiếm 5/6 PRs
- Chỉ 1 proposal feature từ human contributor

## 💡 Điểm nổi bật cộng đồng

**Issue #8113** - Turn-0 tool selection với BM25F + embeddings
- Tác giả: @CjS77 (core contributor)
- 0 comments, 0 reactions → **chưa có discussion**
- Proposal kỹ thuật về optimize tool discovery:
  - Hybrid scoring: BM25F (text) + embedding (semantic)
  - Predict tools từ first message
  - Giảm context pollution bằng selective tool advertising
  - Opt-in via config flag

**Không có engagement nào** - cộng đồng im lặng trong 24h qua.

## 🐛 Ổn định & Bugs

Không có bug reports mới.

Các PRs dependency đều labeled `risk: low` - routine maintenance, không fix critical bugs.

## ✨ Yêu cầu tính năng

**#8113** - Tool selection optimization:
- **Problem**: Context pollution khi advertise tất cả tools
- **Solution**: Predictive ranking chỉ show relevant tools
- **Benefits**: 
  - Giảm token overhead
  - Faster tool discovery
  - Better UX cho large tool catalogs
- **Implementation**: BM25F + embedding hybrid, fallback bridges để user tự discover nếu prediction sai

Đây là feature về infrastructure/performance, không phải user-facing.

## 💬 Phản hồi người dùng

Không có user feedback trong 24h.

Issue #8113 chưa có bất kỳ phản hồi nào từ maintainers hay community.

## 🗺️ Backlog & Roadmap

**Backlog tồn đọng:**
- 4 dependency PRs chưa merge (1-5 tuần tuổi)
- 1 codebase refresh PR (30 ngày, possibly stale)

**Roadmap inference:**
- Focus on tooling infrastructure (tool selection optimization)
- Maintenance mode: heavy dependency updates
- Automation-first: dependabot + CI bots handle majority work

**Risk:** Long-pending dependency PRs có thể gây security vulnerabilities nếu chứa patches.

---

**Nhận xét:** Dự án ở maintenance mode. Activity thấp, bot-driven. Proposal #8113 cần community feedback để validate direction.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-09-28

## 🔍 Tóm tắt hôm nay

Dự án tập trung fix bugs UX desktop và WebUI. Không có release. Hoạt động chính: 4 PRs mới (timeout recovery, settings UX, file panel refresh, MCP timeout config), 8 issues (6 mới, 2 đóng). Nhiều báo cáo bugs desktop Windows và yêu cầu UX improvements.

---

## 📦 Releases

Không có releases.

---

## 🚀 Tiến độ dự án

### PRs đang mở (4)

**#8001** - `fix(runtime): keep timeout tool results recoverable` (@axelray-dev)
- Tool timeout giờ trả kết quả thay vì interrupt, model tiếp tục → final answer
- Liên quan #7981
- User cancel vẫn interrupt bình thường

**#7996** - `fix(console): refresh expanded folders in Files panel` (@iluv7)
- Fix #7995: refresh button giờ reload cả folders đã expand
- Giữ expand state, discard stale responses

**#7956** - `feat(console): unify settings UX` (@rayrayraykk)
- Thống nhất UX settings theo `design.md`
- Fix workspace-picker overflow + welcome-screen flash khi switch conversations
- Reusable controls, i18n labels, fluid feedback

**#6874** - `feat(mcp): add configurable tool call timeout` (@AaronZ345, under review từ 2026-08-10)
- Thêm `tool_call_timeout` per-client (default 300s)
- HTTP/SSE read budget nâng theo config
- Legacy `timeout` key vẫn nhận cho stdio

**Xu hướng**: Desktop + WebUI stability fixes. Settings UX polish. MCP timeout config chờ review lâu (80 ngày).

---

## ⭐ Điểm nổi bật cộng đồng

**#4525** - Agent self-managed context lifecycle (3 bình luận, update 28/09)
- Cron tasks/long pipelines → context grows → quality degrades ở 50-60% usage
- Đề xuất: auto checkpoint + reset cho agent-managed contexts
- Quan tâm cao về context management cho automation workflows

**#7957** - Manual disable premade models/channels (3 bình luận)
- User muốn disable premade content không dùng (OCD-friendly)
- Enhancement request

**#8000** - Desktop double-launch bug (Windows)
- Mở lần 2 → cửa sổ 2 xuất hiện, backend cửa sổ 1 bị terminate
- Thiếu single-instance guard

**Tương tác**: Không có PR/issue nào có reactions nhiều. Issue context lifecycle #4525 có engagement nhất (update liên tục, 2 comments).

---

## 🐛 Ổn định & Bugs

### Bugs mới báo cáo

**#8000** - Desktop double-launch (Windows)
- FileVersion 2.2.1
- Không có single-instance lock → 2 cửa sổ, backend conflict

**#7995** - Files panel refresh stale folders
- Expanded folder không update khi có file mới → cần full page reload
- → **Đã có PR #7996 fix**

**#7994** - Context status không update + không compress (đã đóng)
- Context display circle không update khi switch conversation
- Compression không trigger dù 91.7K/131.1K (> 0.5 threshold)
- Đóng với label `Close-and-review-later`

**#7998** - Context compression timing (đã đóng)
- Desktop 2.2.3b, 131K window, 0.5 threshold
- 200+ requests/conversation, chỉ 10 request đầu context nhỏ, sau đó toàn 131K
- Hỏi: compression chỉ trigger khi user submit? Không tự trigger khi agent submit?
- Đóng với label `Close-and-review-later`

### Pattern

Desktop Windows bugs nhiều (#8000, #7994, #7998). Context compression logic unclear cho users. Files panel stale state đã được fix nhanh (PR same day).

---

## 💡 Yêu cầu tính năng

**#7999** - Desktop UI font size adjustable
- Thiếu settings điều chỉnh font (small/default/large/XL hoặc continuous)
- Use cases: low vision, high DPI, screen mirroring
- Label `good first issue` (simple UI)

**#7997** - Message retraction/editing + workspace rollback (WebUI)
- Edit/retract sent messages → auto truncate subsequent history
- Optional file change rollback (snapshots)
- Clean context state

**#7957** - Disable premade models/channels
- Manual deactivation cho premade content
- OCD-friendly cleanup

**#4525** - Agent self-managed context lifecycle
- Auto checkpoint + reset cho long-running agent tasks
- Prevent quality degradation ở 50-60% context usage

**Priorities**: Context management (#4525, #7997) và accessibility (#7999) được mention nhiều.

---

## 👥 Phản hồi người dùng

### Pain points

1. **Context management unclear**: Users không hiểu khi nào compression trigger (agent submit vs user submit). Display state không sync (#7994, #7998).
2. **Desktop stability**: Double-launch bug, context status stale → trust issues với desktop build.
3. **Accessibility**: Font size fixed → unusable cho low vision/high DPI users (#7999).
4. **File panel UX**: Refresh không update expanded folders → confusion (#7995).

### Positive signals

- Quick PR response cho reported bugs (#7995 → #7996 same day)
- Community actively testing beta builds (2.2.2b4, 2.2.3b)

---

## 📋 Backlog & Roadmap

### Backlog inference

**Short-term** (PRs đang active):
- Settings UX polish (#7956)
- File panel refresh fix (#7996)
- Timeout recovery (#8001)
- MCP timeout config (#6874 - review bottleneck)

**Medium-term** (issues chưa assign):
- Desktop single-instance guard (#8000)
- Font size settings (#7999, good first issue)
- Message editing/workspace rollback (#7997)
- Context compression UI clarity (#7994, #7998 patterns)

**Long-term** (strategic):
- Agent-managed context lifecycle (#4525)
- Premade content disable (#7957)

### Blockers

- #6874 MCP timeout PR under review 80 ngày → merge process slow?
- Context issues (#7994, #7998) đóng với `Close-and-review-later` → không ưu tiên hoặc duplicate?

---

## 🎯 Insights

1. **Desktop build quality gap**: Windows users báo nhiều bugs (double-launch, context stale) → test coverage yếu cho desktop platform.
2. **Context compression documentation gap**: Users không hiểu trigger logic → cần docs rõ hoặc UI transparency.
3. **Quick tactical fixes**: File panel bug → PR same day. Timeout recovery addressed. Team responsive cho small fixes.
4. **Strategic features slow**: MCP timeout 80 ngày review, context lifecycle automation chưa roadmap rõ.
5. **Accessibility starting to surface**: Font size request (#7999) marked good first issue → potential contributor entry point.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*