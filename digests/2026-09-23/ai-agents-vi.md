# Bản tin Hệ sinh thái Hermes Agent 2026-09-23

> Issues: 134 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-23 02:00 UTC

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

# Báo cáo Hermes Agent — 2026-09-23

## 1. Tóm tắt hôm nay

Dự án tập trung vào ổn định Desktop: 8 PR sửa duplicate message, session state racing, và streaming glitches. Không có release mới. Cộng đồng đẩy 30 PR trong 24h, chủ yếu bugfix cho Desktop renderer và session reconciliation.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### Desktop stability blitz (8 PR merged/in-review)
- **#119726** — duplicate messages sau backend rewrite: fix incremental repo không drop settled stream row
- **#119511** — folded turn render duplicate: xóa live stream row đã có trong folded turn
- **#119186** — replay race: reconcile snapshot sau replay & settlement, tránh show work cũ như đang active
- **#119184** — image frame shift: fix delayed image load không thay đổi markdown/MEDIA height
- **#119667** — session rename chặn streaming: offload complete rename writer khỏi event loop
- **#118826** — message_agent lock deadlock: child turn pin profile lock vô thời hạn
- **#119014** — WebSocket reconnect render old reply: replay session event sau WS code=1012

### Compression & reasoning
- **#119344** — durable reasoning-replay disable cho `opencode-go` + bounded proxy replay
- **#119380** — idle-unload local aux compression model sau TTL (unified-memory box)
- **#119720** — bare `reasoning_effort: none` bị bỏ qua, vẫn bill thinking token

### Tooling & infra
- **#102765** — bundles & unified package manager: `pm/` + `pm/lock.json` thay thế skill/plugin installers riêng
- **#119572** — `kicad-pcb` skill: headless KiCad automation trên Linux/Win/macOS
- **#119728** — cron `.sh` script trên Windows không resolve đúng bash (WSL stub thay vì Git bash)
- **#119711** — lazy Telegram install fail: uv `exclude-newer=14 days` chặn Tornado vì index không có upload timestamp

### Security & approval
- **#116489** — `detect_dangerous_command()` false negative: command approval bypass cho data/security/service destruction
- **#77162** — tool result → provider egress thiếu exact-value secret redaction

## 4. Điểm nổi bật cộng đồng

### Issues nhiều tương tác
- **#26689** (15💬, 1👍) — VoiceOver accessibility: CLI/TUI/Dashboard không dùng được với screen reader
- **#97681** (30💬, 2👍) — Bot cross-gateway collaboration độc lập Desktop: Group Chat cho Bot trên nhiều gateway, không cần giữ Desktop mở
- **#11941** (14💬, 4👍) — HTML email support: email gateway vẫn gửi plain text, Markdown không render rich

### Regression reports
- **#100573** (13💬) — Desktop SIGTRAP trên Arch/Wayland: `std::string_view::substr()` out-of-range (Electron 40.10.2)
- **#70108** (13💬) — Desktop render duplicate assistant reply (state.db clean): tool turn race

## 5. Ổn định & Bugs

### Desktop renderer bugs (priority cao)
- **Duplicate messages**: 4 riêng biệt root cause — hydration race (#38319), LCM compaction (#118671), streaming settle (#119511), backend rewrite (#119726)
- **Session state**: replay race (#119186), reconnect render old (#119014), turn vanish khi warm-resume (#117867)
- **Streaming**: transcript scroll up (#118482), long turn render twice live (#118670)

### Gateway & cron
- **#119466** (P0) — `hermes update` để venv editable-finder stale → gateway crash-loop `ModuleNotFoundError: hermes_platform`
- **#119070** — kanban card rate-limited rồi succeed vẫn park `blocker_auth` vĩnh viễn
- **#117734** — kanban dispatcher đọc `kanban.*` caps một lần lúc boot, config change sau không thấy

### Provider & billing
- **#58226** — Anthropic OAuth usage hiển thị 100% used khi thật ra 0–1% (scale `×100` sai)
- **#118871** — DeepSeek/Kimi: `reasoning_effort: none` bị ignore, vẫn bill thinking token

### Tool execution
- **#84207** — interrupted turn (exit 130) không deliver feedback → user phải re-ping
- **#118825** — `delegate_task` per-task `model`/`provider` pin bị ignore im lặng

## 6. Yêu cầu tính năng

### User experience
- **#119314** — đổi kanban `goal_mode` trước khi task start (hiện tại creation-time only)
- **#118285** — provider scopes: nhiều credential cho cùng provider (personal/work key switching)
- **#92885** — Desktop preview browser color scheme riêng (hiện kế thừa dark mode từ Desktop)
- **#33512** — Korean UI support cho Desktop (1👍)

### Deployment & integrations
- **#35060** — Home Assistant `watch_entities` deliver target configurable (hiện fix vào persistent notification)
- **#105267** — per-job external memory provider policy (off/tools/full) cho cron
- **#36929** — PowerShell terminal support trên Windows (5👍, hiện force bash)

### Accessibility
- **#26689** (15💬) — VoiceOver improvements: CLI/TUI/Dashboard không accessible cho blind user

## 7. Phản hồi người dùng

### Positive
- **#119029** — Linear-style kanban modal (2-column, tabbed feed, dependency titles): UX improvement cho desktop kanban board
- **#119724** — setup agent có thể search catalog và install plugin qua approval card: onboarding flow tốt hơn

### Pain points
- **Desktop stability**: 8+ duplicate/race/streaming issues active → tin cậy renderer giảm
- **Update reliability**: #119466 (P0) crash-loop sau update, #118154 TypeError trong post-update cleanup
- **Kanban autonomy**: #119070 stuck `blocker_auth`, #75444 infinite block bounce, #117734 stale config
- **Secret leakage risk**: #62336 terminal snapshot capture env vars, #77162 tool result → provider không redact

## 8. Backlog & Roadmap

### In progress
- **Desktop stability sprint**: 8 PR đang review/merge, focus vào session reconciliation & streaming renderer
- **Unified package manager** (#102765): `pm/` + `pm/lock.json` thay thế installers cũ (ci-reviewed)
- **Bundles**: self-contained distribution (linked với #102765)

### Near-term (inferred từ P0/P1 issues)
- **Update reliability**: fix venv stale (#119466), post-update cleanup crash (#118154)
- **Gateway stability**: kanban dispatcher config reload (#117734), stuck auth (#119070)
- **Security**: tool result redaction (#77162), command approval false negative (#116489)

### Community requests (P2-P3, nhiều 👍)
- Bot cross-gateway (#97681, 2👍, 30💬)
- HTML email (#11941, 4👍)
- PowerShell terminal Windows (#36929, 5👍)
- VoiceOver accessibility (#26689, 15💬)

### Not roadmapped
- Provider scopes (#118285), per-job memory policy (#105267), kanban goal_mode runtime change (#119314): marked `needs-decision`

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-23

## 1. 📊 Tổng quan hệ sinh thái

**8 dự án active, landscape phân mảnh:**

- **Production-ready tier** (3): Hermes Agent, OpenClaw, QwenPaw - volume cao (134–194 issues, 500 PRs), stability sprint
- **Emerging tier** (2): NanoBot, Zeroclaw - velocity tốt (15–50 PRs), focus quality
- **Experimental tier** (2): NanoClaw, IronClaw - niche use-case, PR count thấp (3–19)
- **Zombie** (1): NullClaw - hoạt động zero, PicoClaw - bot dọn backlog only

**Xu hướng chính 23/09:**
- Desktop client stability wars (Hermes duplicate messages, OpenClaw memory leak 15GB)
- Security audit wave (Zeroclaw 3 S0 bugs, command approval bypass)
- Self-serve deployment push (NanoClaw CDSS, multi-instance channels)
- Context/memory architecture rethink (compaction deadlock, consolidation GC, transcript storage)

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Merged 24h | Critical bugs | Engagement |
|-------|--------|-----|----------|------------|---------------|------------|
| **Hermes Agent** | 134 | 500 | 0 | 8 | 8 (duplicate msg, race, deadlock) | 🔥🔥🔥 (15💬 VoiceOver, 30💬 Bot collab) |
| **OpenClaw** | 194 | 500 | 0 | — | P0 memory leak (15GB, 3 mo), billing lockout | 🔥🔥 (36💬 leak, 29💬 subagent loss) |
| **QwenPaw** | 21 | 48 | 0 | 10+ | Windows ACL disaster, LLM timeout permanent | 🔥 (8💬 model per-convo) |
| **NanoBot** | 3 | 30 | 0 | 15 | Deadlock (fixed same-day), consolidation GC | 🔥 (3💬 Telegram spam) |
| **Zeroclaw** | 13 | 50 | 0 | 7 | 3× S0 (LINE bypass, command allowlist, memory race) | ⚡ Security-focused |
| **NanoClaw** | 2 | 19 | 0 | 5 | Fresh install crash, MCP race, update broken | ⚡ Internal team |
| **IronClaw** | 0 | 3 | 0 | 0 | Safari IME bug | — |
| **PicoClaw** | 2 | 4 | 0 | 0 (bot only) | Race condition (fixed 2w ago) | — |
| **NullClaw** | 0 | 0 | 0 | 0 | — | 💀 |

**Scoring:**
- 🔥🔥🔥 = 15+ comments/issue, community-driven priorities
- 🔥🔥 = 10+ comments, high-value bug reports
- 🔥 = meaningful engagement
- ⚡ = active dev, low public discussion
- — = minimal activity
- 💀 = inactive

## 3. 🎯 Vị thế Hermes Agent

### Thế mạnh
✅ **Volume leader** - 500 PRs, 134 issues: codebase mature, active maintenance  
✅ **Desktop focus** - 8 PR renderer stability sprint: differentiation từ CLI-first rivals  
✅ **Community breadth** - VoiceOver accessibility (15💬), Bot collaboration (30💬), HTML email (4👍): diverse use-cases  
✅ **Gateway ecosystem** - email, Telegram, cron, kanban: multi-channel orchestration  

### Điểm yếu
❌ **Duplicate message hell** - 4 root causes riêng biệt: hydration race, LCM compaction, streaming settle, backend rewrite → architecture debt  
❌ **Update brittleness** - #119466 P0 crash-loop: `hermes update` để venv stale → người dùng sợ upgrade  
❌ **Kanban autonomy gaps** - stuck `blocker_auth` (#119070), stale config (#117734): promised automation chưa deliver  
❌ **No releases** - 0 trong data: stability fixes không ship, user phải pull main  

### So với rivals

**vs OpenClaw:**
- **Hermes tốt hơn**: Desktop UX focus, không có memory leak 15GB catastrophic
- **OpenClaw tốt hơn**: worker isolation architecture (#154390) - structural separation Hermes thiếu

**vs QwenPaw:**
- **Hermes tốt hơn**: ít breaking bugs (OpenClaw Windows ACL wipe disk, QwenPaw LLM timeout permanent)
- **QwenPaw tốt hơn**: test coverage sprint (73.79%), durable transcript storage - observability investment

**vs NanoBot:**
- **Ngang ngửa velocity** (Hermes 8 PR/day, NanoBot 15), nhưng NanoBot ship same-day deadlock fix - response time nhanh hơn
- **Hermes broader scope** - multi-gateway vs NanoBot messaging-focused

**vs Zeroclaw:**
- **Zeroclaw security culture mạnh hơn** - community audit → 3 S0 bugs filed với line numbers, Hermes thiếu public security disclosure
- **Hermes production-ready hơn** - Zeroclaw vẫn XL refactor PRs open nhiều tháng

### Recommendation
Hermes cần **stability release cadence** (không có release = technical debt vô hình) + **duplicate message root cause audit** (4 riêng biệt = systemic issue). Desktop differentiation đúng hướng, nhưng renderer race conditions làm mất competitive edge.

## 4. 🛠️ Hướng kỹ thuật chung

### Patterns áp dụng nhiều dự án

**Context management crisis (6/8 projects):**
- **Hermes** - replay race, session reconciliation, streaming settle
- **OpenClaw** - context compaction "already compacted" guard sai
- **NanoBot** - deadlock: summarize gửi full history không budget → vòng lặp
- **QwenPaw** - empty text blocks spam: model hết token reasoning → `TextBlock(text="")`
- **Zeroclaw** - seam sanitizer phá reasoning signature
- **NanoClaw** - Claude Code 2.1.267+ resend system prompt → stale tools

**→ Xu hướng:** LLM context window lớn (100k–200k tokens) nhưng cost cao → agent phải compact/summarize. Implementation naïve → race/deadlock/corruption. Cần canonical state machine + idempotent compaction.

**Memory architecture rethink (4 projects):**
- **QwenPaw** #7931 - SQLite transcript per-session, paginated load
- **NanoBot** #5872 - atomic JSONL write với temp-replace pattern
- **Zeroclaw** #10797 S0 - markdown memory race, mất data khi concurrent write
- **OpenClaw** #154390 - worker isolation, credential separation

**→ Xu hướng:** File-based memory (JSON/markdown) không scale, race-prone. Migration sang structured storage (SQLite, dedicated memory layer).

**Tool execution safety (5 projects):**
- **Zeroclaw** #11058 S0 - command allowlist bypass `block_high_risk_commands`
- **Hermes** #116489 - `detect_dangerous_command()` false negative
- **OpenClaw** #97616 P1 - zombie process accumulation
- **NanoBot** #5824 - `read_file` skip data khi dòng quá lớn
- **QwenPaw** #4020 request - force readonly MEMORY/SOUL files

**→ Xu hướng:** LLM autonomy tăng → destructive command risk tăng. Approval flow + allowlist không đủ, cần sandbox + ACL + audit trail.

**Channel stability wars (4 projects):**
- **Hermes** - Telegram gateway, kanban dispatcher
- **Zeroclaw** - WhatsApp 6 PRs (thumbnail, poll, room, voice)
- **NanoBot** - Telegram compaction spam, Discord reaction tasks
- **NanoClaw** - Signal DM routing, attachment staging

**→ Xu hướng:** Multi-channel orchestration = competitive moat, nhưng mỗi platform có quirks riêng. Maintenance cost cao, regression nhiều.

### Tech stack convergence

**Runtimes:**
- Python dominant (6/8): Hermes, OpenClaw, NanoBot, Zeroclaw, QwenPaw, NanoClaw
- TypeScript (1): IronClaw
- Go (1): PicoClaw (inactive)

**LLM providers:**
- OpenAI/Anthropic universal
- Specialized: Hermes (DeepSeek, Kimi), QwenPaw (Volcengine Ark), NanoClaw (Iron Proxy gateway)

**Storage:**
- File-based → SQLite migration trend (QwenPaw, NanoBot atomic writes)
- No project dùng vector DB public (memory = plaintext + embedding hidden)

## 5. 🎭 Điểm khác biệt

### Chiến lược positioning

| Dự án | Target user | Differentiator | Market approach |
|-------|-------------|----------------|-----------------|
| **Hermes** | Power users, teams | Desktop + multi-gateway orchestration | Broad platform, feature-rich |
| **OpenClaw** | Developers | Worker isolation, customizable | Infrastructure-focused |
| **QwenPaw** | Enterprise, Chinese market | Qwen models, Volcengine integration | Regional dominance |
| **NanoBot** | Messaging-first users | Telegram/Discord native | Chat-centric simplicity |
| **Zeroclaw** | Security-conscious orgs | WhatsApp + audit culture | Privacy-first |
| **NanoClaw** | Self-hosters | CDSS, multi-instance channels | Deployment flexibility |

### Feature matrix

| Feature | Hermes | OpenClaw | QwenPaw | NanoBot | Zeroclaw | NanoClaw |
|---------|--------|----------|---------|---------|----------|----------|
| **Desktop client** | ✅ (stability issues) | ✅ Control UI | ✅ | ❌ | ❌ | ❌ |
| **Multi-gateway** | ✅ email/Telegram/cron | ✅ | — | ✅ Telegram/Discord | ✅ WhatsApp | ✅ Slack/Teams/Signal |
| **Kanban/task mgmt** | ✅ (autonomy gaps) | — | — | — | — | — |
| **Self-serve deploy** | ❌ | — | — | — | — | ✅ CDSS |
| **Worker isolation** | ❌ | ✅ (#154390) | — | — | — | ✅ MCP servers |
| **Security audit** | Low visibility | — | — | ✅ same-day | ✅ community-driven | ❌ |
| **Test coverage** | — | — | 73.79% | — | — | — |

### Cộng đồng culture

**Hermes - feature-driven:**
- Requests đa dạng: VoiceOver, Bot collab, HTML email, PowerShell
- Pain points: stability over features ("duplicate messages", "update hell")
- Engagement high, nhưng ít security-focused discourse

**OpenClaw - infrastructure-focused:**
- Technical depth: worker architecture, memory profiling
- Frustrated users: 3-month memory leak no fix, update blockers
- "Production readiness label" request (#73537) - operators need confidence signal

**QwenPaw - enterprise pragmatic:**
- Model flexibility obsession: per-convo model, failover, thinking-level UI
- Chinese market focus: Volcengine, regional providers
- Test coverage sprint visible - quality investment

**NanoBot - velocity culture:**
- 15 PR/day merged, same-day deadlock fix
- Telegram-centric: compaction spam, context handling
- Feature requests low engagement - team-driven roadmap

**Zeroclaw - security-first:**
- Community audit: 3 S0 bugs với line numbers từ external contributors
- WhatsApp production-ready push: 6 PRs covering edge cases
- Replacement-first policy documented (#11042) - backward compat priority

**NanoClaw - self-serve vision:**
- CDSS (Customer Deployment Self Serve) - multi-instance, runtime credentials
- Google Workspace integration - enterprise use-case
- Internal team, zero public engagement

## 6. 📊 Mức độ trưởng thành cộng đồng

### Tier 1: Production-grade community (Hermes, OpenClaw)
✅ **Volume:** 134–194 issues, 500 PRs  
✅ **Engagement:** 15–36 comments/issue, feature requests có upvotes  
✅ **Pain visibility:** Users report blockers publicly, demand fixes  
❌ **Velocity gaps:** Critical bugs open months (OpenClaw memory leak 3 mo), no release cadence (Hermes 0 releases)  

**Maturity signals:**
- Diverse use-cases (Hermes VoiceOver, Bot collab; OpenClaw production stability labels)
- Community roadmap influence (requests shape priorities)
- Frustration = engagement (users care enough to complain publicly)

**Growth blockers:**
- Stability debt accumulation faster than fixes (Hermes 8 duplicate msg bugs, OpenClaw update hell)
- Release process missing - users stuck ở main branch, scared to upgrade

### Tier 2: Quality-focused builders (QwenPaw, NanoBot, Zeroclaw)
✅ **Velocity:** 7–15 PR/day, responsive (NanoBot same-day fix)  
✅ **Quality investment:** QwenPaw test coverage 73.79%, Zeroclaw security audit  
✅ **Specialized differentiation:** NanoBot messaging-native, Zeroclaw WhatsApp polish, QwenPaw Chinese market  
❌ **Engagement low:** 0–8 comments/issue, community-driven priorities ít  

**Maturity signals:**
- Technical discipline (test coverage, security culture, atomic writes)
- Production edge-case handling (Zeroclaw 6 WhatsApp PRs covering attachments/polls/rooms)
- Fast iteration (NanoBot 15 merged/day, Zeroclaw 7)

**Growth potential:**
- Build community around specialization (Zeroclaw security, QwenPaw enterprise CN)
- Public security disclosure → trust (Zeroclaw 3 S0 bugs transparent)
- Release cadence → adoption confidence

### Tier 3: Niche/Internal (NanoClaw, IronClaw)
✅ **Clear vision:** NanoClaw CDSS self-serve, IronClaw runtime builtins  
❌ **Engagement zero:** 0 public comments/reactions  
❌ **Community absent:** Internal team only, no external contributors visible  

**Signals:**
- Purpose-built for specific deployment model (NanoClaw multi-instance)
- Tech choices polished (NanoClaw gateway refactor, IronClaw IME handling)
- Early-stage or internal product

**Path forward:**
- Open community building (docs, examples, public roadmap)
- External contributor onboarding
- Use-case evangelism

### Tier 4: Inactive (PicoClaw, NullClaw)
❌ **No development:** Bot stale cleanup only (PicoClaw), zero activity (NullClaw)  
💀 **Abandoned or pivoted**  

## 7. 🔮 Tín hiệu xu hướng

### 1. Context window economics → memory architecture crisis

**Evidence:**
- 6/8 projects có context/compaction bugs active
- NanoBot deadlock (full history no budget), Hermes replay race, OpenClaw "already compacted" guard
- QwenPaw durable transcript (#7931), NanoBot atomic JSONL (#5872) - structured storage migration

**Prediction:**
- **2026 Q4:** File-based memory (JSON/markdown) deprecated, SQLite/dedicated stores standard
- **2027:** Vector DB integration public (embedding + retrieval visible in open-source)
- **Opportunity:** First project với production-grade memory layer (ACID, versioned, queryable) wins enterprise market

### 2. Tool execution safety = table stakes

**Evidence:**
- Zeroclaw 3 S0 security bugs (LINE bypass, command allowlist, memory race)
- Hermes command approval false negative (#116489)
- QwenPaw Windows ACL disaster (wipe disk), OpenClaw zombie processes
- Multiple projects add `block_high_risk_commands`, approval flows

**Prediction:**
- **2026 Q4:** Sandbox environments mandatory (Docker, gVisor, Firecracker)
- **2027:** Audit trail + rollback standard (every destructive command logged, reversible)
- **Regulation risk:** EU AI Act compliance → tool safety documentation required

### 3. Desktop client differentiation war

**Evidence:**
- Hermes 8 PR stability sprint (duplicate messages, session state, streaming)
- OpenClaw Control UI browser tests
- QwenPaw sidebar refactor, transcript history
- IronClaw IME composition fixes

**Prediction:**
- **Desktop = premium tier:** CLI/web free, desktop paid (Cursor model)
- **UX競爭:** Accessibility (Hermes VoiceOver #26689), multi-language (IronClaw Italian), real-time collaboration
- **Consolidation:** 2-3 desktop clients survive, rest CLI-only

### 4. Self-serve deployment → SaaS pivot

**Evidence:**
- NanoClaw CDSS (multi-instance, runtime credentials, gateway-agnostic)
- Zeroclaw replacement-first policy (#11042) - backward compat obsession
- Hermes update brittleness, OpenClaw update blockers - self-host pain visible

**Prediction:**
- **2027:** Major projects launch managed offerings (avoid self-host support hell)
- **Open-core model:** Self-host free, managed/enterprise paid
- **Winner:** First with seamless migration path (self-host → managed no data loss)

### 5. Regional LLM provider fragmentation

**Evidence:**
- QwenPaw Volcengine Ark, Hermes DeepSeek/Kimi, NanoClaw Iron Proxy
- China market separate stack (Qwen models, local providers)
- Provider abstraction layers (OpenClaw gateway contracts, Hermes unified provider)

**Prediction:**
- **Regionalization permanent:** CN/US/EU separate LLM ecosystems (compliance, latency, cost)
- **Multi-provider mandatory:** Failover across regions, cost optimization
- **Opportunity:** Provider-agnostic platform wins (avoid vendor lock-in)

### 6. Security audit culture emerging

**Evidence:**
- Zeroclaw: community finds 3 S0 bugs với line numbers, team responds same-day
- Low visibility elsewhere (Hermes/OpenClaw no public security disclosure visible)
- QwenPaw Windows ACL disaster - security afterthought

**Prediction:**
- **2027:** Public security.md + CVE process standard
- **Compliance drivers:** SOC2, ISO27001 demand from enterprise users
- **Differentiation:** "Security-first" becomes marketing moat (Zeroclaw model)

### 7. Velocity over stability → correction coming

**Evidence:**
- OpenClaw memory leak 3 months no fix, users afraid to upgrade
- Hermes 0 releases, fixes stuck in main
- NanoBot/Zeroclaw ship fast but low engagement - community building lag

**Prediction:**
- **Correction Q4 2026:** Projects hit stability wall, slow down feature work
- **LTS releases:** Stable branch + bleeding-edge split (OpenClaw #73537 production label request)
- **Lesson:** Velocity without release cadence = invisible progress

---

## 🎯 Strategic Takeaways

### For Hermes Agent:
1. **Urgent:** Fix duplicate message root causes (4 riêng biệt = architecture smell), ship stability release
2. **Differentiation:** Desktop focus đúng, nhưng cần deliver stability → competitive edge
3. **Community:** High engagement good, convert frustration → contributions (triage help, security audit)
4. **Release cadence:** 0 releases = invisible progress, users scared to upgrade

### For ecosystem:
1. **Memory layer** = next battleground (SQLite, vector DB, versioning)
2. **Tool safety** = compliance necessity, not optional
3. **Regional divergence** permanent - multi-provider abstraction wins
4. **Desktop client** = premium tier opportunity
5. **Self-serve → SaaS** inevitable, plan migration path early

**Winner profile 2027:** Production-stable (test coverage, LTS releases), security-first (audit culture, sandbox), multi-provider (regional flexibility), desktop + API (premium + developer), open-core business model (self-host → managed upsell).

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-09-23

## 1. Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa lỗi stability: worker isolation (#154390), crash loops (#91588, #97616), memory leaks, và update blockers. PR cleanup tích cực - giảm test redundant, tối ưu CI cost.

## 2. Releases

Không có releases trong 24h qua.

## 3. Tiến độ dự án

**PRs đáng chú ý:**

- **#154390** (worker isolation): Chạy native inference trên dedicated workers, tách credentials khỏi Gateway. Trạng thái: waiting on author, proof needed.
- **#156065** (CI optimization): Giảm Control UI browser test cost, defer native lifecycle tests sang release verification.
- **#156064** (Gateway freeze): Fix Gateway đơ khi start agent turn - task ownership persist yield event loop.
- **#155433** (macOS restart): Preserve restart intent trước khi LaunchAgent shutdown, fix update flow.
- **#155858** (cron delivery): Persist command delivery evidence chain: `cron run → task run → delivery result`.

**Xu hướng:**
- Worker architecture: tách execution environment, isolation tốt hơn (#154390)
- Stability focus: fix crash loops, memory leaks, restart recovery
- Developer experience: cleanup redundant tests, optimize CI
- Update reliability: nhiều fix cho update blockers (#155764, #154381, #155094)

## 4. Điểm nổi bật cộng đồng

**Issues nhiều bình luận:**

- **#91588** (36 comments, P0): Gateway memory leak nghiêm trọng - RSS 350MB → 15.5GB, OOM crash loop. Vẫn open, chưa có fix PR.
- **#44925** (29 comments, P1): Subagent completion mất im lặng - không retry, không notification, không auto-restart. Critical cho reliability.
- **#97616** (16 comments, P1): Zombie process accumulation từ hook/tool execution, runtime degradation theo thời gian.

**Vấn đề người dùng quan tâm:**
- Memory management (#91588, #99659, #119565)
- Restart/update reliability (#155764, #154381, #115256)
- Tool execution stability (#97616, tool calls fail loop #55694)
- Channel-specific bugs: Feishu (#50490), Slack (#115642), iMessage (#135704)

## 5. Ổn định & Bugs

**Critical (P0):**
- **Memory leak** (#91588): 15GB leak, crash loop - open 3 tháng, chưa có fix PR
- **Billing cooldown** (#115642): 5h lockout outlives actual outage, cần probe-based recovery
- **Update blockers** (#155764, #154381, #155094): nhiều user không upgrade được

**High-priority (P1):**
- **Worker faults** (#156081): Test fails với long macOS temp paths
- **Context compaction** (#121617): "Already compacted" guard misclassifies real overflow
- **MCP tools missing** (#114154): Tools pass policy nhưng agent sessions không bundle
- **Memory reindex** (#136311): Lock không release, 19GB orphaned temp DBs

**Patterns:**
- Process management: zombie accumulation, worker cleanup fails
- Memory: leaks, unbounded growth, temp file accumulation
- Restart/update: nhiều edge cases, recovery stuck
- Cross-component: plugin hooks missing callbacks, MCP tool catalog incomplete

## 6. Yêu cầu tính năng

**Đang review:**
- **#79902** (P3, 14 comments): SQLite transcript seams cho advanced consumers - build trên canonical runtime state
- **#53763** (P3, 12 comments): Built-in headless browser - không depend external Chrome
- **#113706** (P3, 5 comments): Memory Wiki batch operations cho automation

**Isolated execution:**
- **#96975** (P2, 12 comments): Isolate subagent completion khỏi parent context - chỉ return status + session link

**Developer experience:**
- **#73537** (P3, 8 comments): Production-readiness stability label cho releases - operators cần biết version nào stable

## 7. Phản hồi người dùng

**Frustrations:**

1. **Memory leak nghiêm trọng** (#91588): 3 tháng chưa fix, users mất service repeatedly
2. **Update hell**: nhiều blockers khác nhau (#155764, #154381), users stuck ở old versions
3. **Silent failures**: subagent results mất (#44925), tool calls fail im lặng (#55694)
4. **Tool confusion**: MCP tools configured nhưng không xuất hiện (#114154)

**Positive signals:**
- User @Reneb-cafe (#73537): "genuinely become part of our daily workflow" - family & business use
- Active bug reports với detailed reproduction steps - cộng đồng engaged

**Pain points:**
- Stability cho production use: memory, crashes, restart loops
- Upgrade path: nhiều users afraid to update, hoặc stuck
- Observability: silent failures, missing diagnostics
- Multi-agent complexity: subagent orchestration unreliable

## 8. Backlog & Roadmap

**Immediate (đang làm):**
- Worker isolation architecture (#154390) - big refactor
- Critical stability fixes: memory leak, crash loops, update blockers
- CI optimization - giảm recurring cost

**Near-term (PRs open, proof needed):**
- Cron delivery evidence (#155858)
- Gateway freeze fixes (#156064)
- macOS restart preservation (#155433)
- Custom model tool surface (#156017)

**Strategic (stale/needs decision):**
- SQLite transcript seams (#79902) - canonical state access
- Built-in browser (#53763) - reduce external deps
- Subagent isolation (#96975) - context pollution
- Production stability labels (#73537) - operator confidence

**Blockers:**
- Memory leak (#91588): 3 tháng, no fix PR - bottleneck lớn
- Many "needs-maintainer-review" + "needs-product-decision" - decision velocity issue?

---

**Insight:** OpenClaw đang trong critical stability phase. Memory leak 3 tháng chưa fix là red flag lớn. Update reliability issues chồng chất - users sợ upgrade. Worker isolation (#154390) là architectural bet đúng hướng nhưng slow-moving. Cần:
1. Emergency fix cho #91588 (memory leak)
2. Fast-track update blocker fixes
3. Speed up maintainer review cycle
4. Consider production stability track vs bleeding edge

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-23

## 📋 Tóm tắt hôm nay

23/09 là ngày merge lớn với **15 PR merged**, tập trung sửa lỗi context compaction, encoding, và UI. Không có release mới. 3 issue mới mở, trong đó có 1 bug nghiêm trọng về deadlock (#5849) và 1 feature request về video support.

## 🚀 Releases

Không có.

## 📊 Tiến độ dự án

### PRs merged quan trọng (15/30 total)

**Context & Memory (ưu tiên cao)**
- #5857: Fix auto-compaction deadlock - `summarize_transcript` giờ budget history trước khi gửi tới model, tránh vòng lặp vô hạn khi session vượt input limit
- #5872: Refactor atomic JSONL write - gộp 3 nơi dùng temp-write-replace thành helper `atomic_write_lines`, tăng reliability
- #4819: Fix consolidation lock GC - đổi từ `WeakValueDictionary` sang plain dict, tránh lock bị thu gom khi idle

**Tool safety & reliability**
- #5824: `read_file` xử lý dòng quá dài - thêm continuation `column`, không skip data nữa
- #5795, #5796: Preserve indentation/whitespace trong `edit_file` fallback
- #5867: Decode UTF BOM đúng (UTF-16/32), không fallback latin-1 nữa
- #5859: Handle boolean JSON subschema (schema `true`/`false` hợp lệ)

**Provider & streaming**
- #5783: Preserve assistant content khi có tool_calls - không strip nữa, theo đúng OpenAI spec
- #5863: SSE consumer giờ handle `reasoning_text` events (fix #5833)
- #4959: Retry delay thêm 1s buffer vì rate-limit header không chính xác
- #5314: Decode nested JSON tool args theo schema

**Channels**
- #5803: Telegram fix (2 spaces cho newline, `topic_id` trong `my` tool, typing status respect topic)
- #5864: Discord cancel delayed reaction tasks khi reset runtime
- #5842: `channels status` show unavailable plugins với cột `Available`

**WebUI**
- #5831: Streamline message controls - contextual hover/focus, ẩn timestamp/copy cho đến hover
- #5862: Markdown table wrap content thay vì force max-content
- #5865: Preserve selected preset ở first turn
- #5844: Queued guidance rõ ràng hơn ("waiting to be sent")
- #5829: TUI Markdown links clickable (upgrade opentui 0.5.11)
- #5860: Remove queued send hint

**Security & provenance**
- #5866: CLI Apps record install provenance, fail-closed nếu registry drift
- #5821: Merged rồi close (malicious skill?)

**Misc**
- #5868: Fix quoted Windows executable invoke khi không có args
- #5861: Warm fallback tokenizer trong background thread, tránh block startup
- #4915, #4896: Heartbeat cron regression fixes

### PRs open chưa merge (15)

- #5871: Linear native agent UX (OAuth, delegation, button mapping)
- #5858: Adam Network MCP integration example
- #5314: Nested JSON decode (conflict flag)

## 🔥 Điểm nổi bật cộng đồng

**Issue #5870** (Telegram context compaction notice spam) - 3 comments, trigger thảo luận về UX. Gateway logs confirm repeated compaction.

**Issue #5849** (deadlock) - 2 comments, prioritize cao, merged fix trong ngày (#5857).

**Issue #5869** (video support) - user request omni model input (qwen3.8, mino-v2.6). Hiện tại video chỉ save disk + send path text.

## 🐛 Ổn định & Bugs

### Critical fixed
- **Context compaction deadlock** (#5849 → #5857): `summarize_transcript` gửi toàn bộ history không budget, vòng lặp khi history > input limit. Giờ budget trước, chunking như manual path.
- **Consolidation lock GC** (#4819): Lock bị weak-ref thu gom khi idle, race condition. Đổi sang strong ref.

### Medium fixed
- UTF BOM decode sai → garbled text
- `edit_file` mất indentation/whitespace
- Boolean JSON subschema crash
- Telegram compaction notice spam (chưa fix, đang investigate)
- Discord reaction tasks không cancel khi reset
- `read_file` skip data khi dòng quá lớn
- Provider strip assistant content khi có tool_calls

### Open bugs
- #5870: Telegram spam "Context compacted" (3 comments, investigating)

## ✨ Yêu cầu tính năng

**#5869: Video support** - user muốn gửi video trực tiếp tới omni model (qwen3.8, mino-v2.6) thay vì path text. Priority P2, chưa có comment.

**#5871: Linear integration UX** - PR open, cải thiện OAuth flow, workspace health, tool setup.

**#5858: Adam Network MCP** - decentralized messaging cho AI agents, PR example.

## 💬 Phản hồi người dùng

- Telegram users report context compaction UX issue (spam notices)
- Video input demand tăng với omni models phổ biến hơn
- Stability concerns về deadlock/GC bugs được ưu tiên fix nhanh

## 🗺️ Backlog & Roadmap

**Merged today → stability baseline**
- Context/memory reliability
- Tool safety (encoding, editing, reading large files)
- Provider spec compliance
- Channel stability (Discord, Telegram)

**Open high-value work**
- Video native input (#5869)
- Linear native UX (#5871)
- Nested JSON tool args (#5314, conflict)
- Telegram compaction UX (#5870)

**Pattern**: Team ưu tiên P1/P2 bugs cao, merge nhanh (15 PRs/ngày). Feature requests thường P2, open lâu hơn. Security/data-loss bugs merge trong ngày.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo hoạt động Zeroclaw - 2026-09-23

## 📊 Tóm tắt hôm nay

Zeroclaw đóng 7 PR trong 24h qua, tập trung vào bảo mật WhatsApp, sửa cache Anthropic, và tối ưu provider. Nhóm phát hiện lỗ hổng nghiêm trọng: LINE group bypass allowlist (#9392 CLOSED), command allowlist cho high-risk commands chạy không prompt (#11058 OPEN S0), và markdown memory mất data khi concurrent write (#10797 OPEN S0).

## 🚀 Releases

Không có release.

## 🔨 Tiến độ dự án

### PRs đã merge (24h)
- **#10982** - WhatsApp ảnh có thumbnail, không còn card trống
- **#10895** - Anthropic giữ cache breakpoint khi message cuối là ảnh
- **#10916** - Compatible providers forward `reasoning_effort` qua opt-in flag
- **#10958** - Interruption scope key dùng length-prefix, không còn collision
- **#10953** - Seam sanitizer giữ signed reasoning nguyên vẹn
- **#11042** - Docs: ghi chính thức replacement-first integration policy
- **#11040** - Nix build ZeroCode với feature set riêng

### PRs đang active
- **#10938** (XL) - Tool không còn scan image marker trong text, declare attachment tường minh → sửa căn bản vision provider gate
- **#10904** (XL) - Vision error chỉ kích khi marker thật resolve, không còn false positive
- **#10391** (XL) - Delegate filesystem tool tôn trọng workspace của target
- **#10172** (XL) - Preserve provider profile semantics qua runtime, gateway, RPC

### Issues nghiêm trọng mở
- **#11058** (S0) - `allowed_commands` bypass `block_high_risk_commands`, chạy không log
- **#10797** (S0) - Markdown memory mất entry khi concurrent `store()`
- **#9392** (S0) - LINE group message bypass allowlist và pairing handshake

## 🔥 Điểm nổi bật cộng đồng

**Security audit wave** - @belumume phát hiện LINE bypass (#9392), @qo-roj tìm command allowlist hole (#11058), @kouhe3 report memory race (#10797). Ba issue S0 trong tuần.

**WhatsApp polish sprint** - @RustLangLatam đẩy 6 PRs: image preview (#10982 merged), PDF thumbnail (#10980), poll read-back (#10988), create_room/invite (#10979), voice routing (#11057, #11060), thematic break render (#11054).

**Provider reliability track** - @Audacity88 series: cache breakpoint (#10895 merged), reasoning sanitizer (#10953 merged), reasoning_effort passthrough (#10916 merged), vision gate refactor (#10904 open).

## 🐛 Ổn định & Bugs

### Merged fixes
- WhatsApp ảnh không preview → thumbnail inline
- Anthropic cache loss khi message cuối là image → giữ breakpoint
- Interruption key collision → length-prefix encoding
- Compatible providers drop reasoning_effort → opt-in passthrough
- Seam sanitizer phá reasoning signature → extract trước sanitize

### Active fixes
- #10931 (XL) - Windows task log unbounded → bounded service log writer
- #10860 (XL) - Non-image data-URI marker → giữ text, không reject
- #10446 (XL) - Tool-call envelope leak vào prose → reject thay vì render
- #9819 (XL) - Corrupt image qua header check → pixel-level validation

### Open critical bugs
- #11055 - Daemon không register channel-map factory → webhook/cron/SOP không có channels
- #10922 (P2) - WhatsApp `suppress_voice` bị ignore khi queue TTS
- #11059 - WhatsApp `force_voice` bị ignore, `send_via` không route voice

## ✨ Yêu cầu tính năng

- **#11053** (RFC) - Knowledge graph làm memory layer thay vì tool → agent không cần invoke, auto capture/surface
- **#11052** - WhatsApp render thematic break và setext heading
- **#10980** - WhatsApp PDF có first-page preview
- **#10988** - WhatsApp poll vote read-back
- **#10979** - WhatsApp `create_room`/`invite_user`
- **#11044** (XL) - ZeroCode session root tường minh, preserve khi resume

## 💬 Phản hồi người dùng

**Security-first culture** - Cộng đồng audit code, file issue S0 với line number + quote. Team respond nhanh: #9392 filed 2 tháng trước giờ merge fix.

**WhatsApp production ready push** - Sequence PRs từ @RustLangLatam cho thấy deploy thực tế: image card trống → thumbnail; poll không answer → vote read-back; không group → create_room.

**Multimodal edge case cleanup** - Provider team (@Audacity88, @NiuBlibing) xử lý vision/reasoning corner case từ production log: cache loss, sanitizer phá signature, corrupt image qua validation.

## 📋 Backlog & Roadmap

### Parking lot (needs maintainer review)
- #10172 - Provider profile semantic preservation (XL, 2 tháng)
- #9809 - Multiple models per provider profile (XL, principal contributor)
- #9368 - History retention count whole turns (XL, 2 tháng)
- #10381 - Host launcher resolve trước workspace cwd (XL, security)

### Needs author action
- #10391 - Delegate workspace respect (XL, stale risk)
- #10980 - PDF thumbnail (review iteration)
- #10988 - Poll read-back (review iteration)
- #10979 - WhatsApp create_room (review iteration)
- #10986 - Channel-addressed tool channel instance (review iteration)

### Integration policy documented
#11042 merged → replacement-first policy official: remove working integration chỉ khi replacement sẵn sàng, không phá backward compat.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-09-23

## 1. 📊 Tóm tắt hôm nay

Dự án đóng 4 vấn đề cũ qua bot stale. Không có hoạt động phát triển mới. Các issue/PR được đóng đều từ 2 tuần trước (tạo 2026-09-08), không có cập nhật code thực tế trong 24h qua.

## 2. 🚀 Releases

Không có release.

## 3. 🔨 Tiến độ dự án

**Issues đóng (2):**

- **#3374** - Race condition trong `Config.initSensitiveCache`: có thể trả về nil replacer, gây panic `FilterSensitiveData`. Vấn đề từ việc tạo cache lazy không đồng bộ.
- **#3373** - Mất dữ liệu im lặng: `SaveConfig` xóa tất cả `api_keys` sau key đầu tiên, để lại `fallbacks` trỏ model không tồn tại.

**PRs đóng (3):**

- **#3375** - Fix race condition #3374: thêm `sync.Once` bảo vệ khởi tạo `sensitiveCache`
- **#3372** - Thêm config cho reaction tool: trước đây tool này register có điều kiện nhưng `IsToolEnabled` luôn trả true
- **#1349** - Hỗ trợ QQ Channel nhiều loại attachment hơn (emoji, voice, image, video, file). PR từ tháng 3/2026, mới đóng.

**PR mở (1):**

- **#3370** - Thêm Keenable web search provider. Hoạt động không cần API key, gọi public endpoint. Từ contributor bên ngoài (@ilya-bogin-keenable).

**Xu hướng:** Bot stale dọn backlog cũ. Không thấy hoạt động maintainer hay merge code mới.

## 4. 💬 Điểm nổi bật cộng đồng

Issues có 2 bình luận mỗi issue (#3374, #3373), không có upvote. PRs không có engagement (0 comment public, 0 upvote). PR #3370 từ external contributor vẫn mở, chưa có review công khai.

Mức tương tác thấp. Không có discussions sôi nổi.

## 5. 🐛 Ổn định & Bugs

**Đã fix (trong PRs đóng):**

- Race condition có thể crash (`sensitiveCache` nil panic)
- Silent data loss config (mất api_keys)
- Tool reaction không thể config tắt

**Chất lượng fix:**

PR #3375 dùng `sync.Once` đúng pattern. PR #3372 thêm config field thiếu. PR #1349 mở rộng QQ Channel đầy đủ media types.

Không có bug report mới ngày hôm nay.

## 6. ✨ Yêu cầu tính năng

**Mới:** PR #3370 thêm Keenable search provider - công cụ tìm kiếm web không cần key.

**Cũ đóng:** PR #1349 hỗ trợ QQ multimedia đầy đủ.

Không có feature request issue mới trong 24h.

## 7. 🗣️ Phản hồi người dùng

Contributor @sting8k tìm ra 2 bug nghiêm trọng (race, data loss) và gửi fix. Contributor @ilya-bogin-keenable đề xuất tích hợp search provider của họ.

Không thấy phản hồi end-user khác (complaint, praise, use-case report).

## 8. 🗓️ Backlog & Roadmap

PR #3370 còn mở - chờ review/merge Keenable provider.

Không có roadmap công khai trong dữ liệu. Issues/PRs cũ được dọn bởi automation (stale bot), cho thấy maintainer ít hoạt động gần đây hoặc dự án đang slow-down maintenance.

---

**Kết luận:** Ngày yên tĩnh. Chỉ có hoạt động bot stale. Các fix từ 2 tuần trước mới đóng. Không có commit mới, release mới, hay tương tác maintainer trong 24h qua. Dự án có thể đang giai đoạn maintenance thấp.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-09-23

## 1. Tóm tắt hôm nay

NanoClaw push mạnh tính năng Customer Deployment Self Serve (CDSS) với 3 PR merged về credential gateway centralization và channel instance specs. Core team fix bug quan trọng về Codex device pairing và container image bump. Gateway ecosystem mở rộng với Iron Proxy addition.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Merged hôm nay (5 PRs):**

- **#3863** - Fix provider contract registration bug trong setup wizard. Vấn đề: gateway store đọc model endpoints trước khi contract được register, gây crash fresh install với Iron Proxy.
- **#3864** - Core CDSS seams (WP-6a): `ChannelCredentialProvider` interface cho runtime credential loading, `ChannelInstanceSpec` cho multi-instance adapters, per-instance webhook paths.
- **#3865** - CDSS Slack/Teams adapters (WP-6b): mỗi instance build từ spec, hỗ trợ webhook mode, env mode với pins, pending challenge handling.
- **#3861** - Fix Echo hardened image perk offered twice trong setup wizard. Key cache đổi từ `image-source` sang `container-images`.
- **#1491** - Google Workspace CLI integration skill: MCP server wrap `gws` command, write-operation guardrails với nonce confirmation, audit logging.

**PRs mới quan trọng:**

- **#3868** - Bump Claude Code 2.1.280 + Agent SDK 0.3.280. Critical: stop breaking resumed agents (Code 2.1.267+ record system prompt first request, resend mỗi resume → stale tools/capabilities).
- **#3866** - Fix Codex MCP server startup race. Hiện tại 1 second timeout, servers chậm không ready → turn chạy thiếu tools.
- **#3867** - Pin Codex CLI 0.155.1 (từ 0.146.0, 2 tháng outdated).
- **#3869** (issue) - `/update-nanoclaw` broken: `git archive` list thiếu 3 transitive imports, controller crash `MODULE_NOT_FOUND`.

**Gateway & Provider expansion:**

- **#3817** - Iron Proxy gateway skill (installable).
- **#3818** - Setup wizard tách gateway selection khỏi provider login, OneCLI vẫn default.
- **#3815** - Refactor gateway contract centralization: shared contract cho contributions, domains, leases, approvals.
- **#3356** + **#3355** - Cursor Agent SDK provider payload + install skill.

**Channel improvements:**

- **#3837** - Signal adapter: attachment staging (images/voice/files qua mounted-inbox), DM routing fix, outbound queue.
- **#3838** - Signal skill docs update: attachment/DM routing, troubleshooting.
- **#2924** (mở từ Jul) - Strip agent-group namespace khỏi reaction/edit messageId trước platform delivery.

**Update mechanism fixes:**

- **#3750** - Extract toàn bộ `scripts/` tree cho update controller (thiếu `provider-contract-verifier.ts`).
- **#3565** - Forks giữ local adapters qua skill refresh.
- **#3451** - Attribute barrel import đúng skill.

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào đạt engagement cao (0 comments, 0 reactions cả 21 items). Core team làm việc internal.

## 5. Ổn định & Bugs

**Critical bugs fixed:**

- **Provider contract registration timing** (#3863) - Fresh install Iron Proxy crash. Root cause: imports stale barrel trước register.
- **Codex device pairing crash** (#3862 closed via #3863) - Same root: stale provider-contracts barrel.
- **Claude Code resume breakage** (#3868) - 2.1.267+ ghi system prompt lần đầu, resend mỗi turn → stale context. Fix: pass `resend_system_on_resume: false`.
- **Setup wizard Echo perk double-offer** (#3861) - Cache key collision.

**Open bugs:**

- **#3869** - `/update-nanoclaw` broken hoàn toàn. Git archive thiếu files → prepare step crash ngay. High priority.
- **MCP server startup race** (#3866) - 1s timeout quá ngắn, Codex chạy thiếu tools nếu server chậm start.

## 6. Yêu cầu tính năng

**Customer Deployment Self Serve (CDSS) - shipping:**

- Multi-instance chat adapters (Slack/Teams) không cần restart.
- Runtime credential loading, mỗi instance riêng webhook path.
- Gateway-agnostic channel setup.

**Gateway ecosystem expansion:**

- Iron Proxy gateway alternative (vs OneCLI default).
- Setup wizard decouple gateway từ provider login.
- Cursor Agent SDK provider.

**Google Workspace integration** (#1491 merged):

- MCP server wrap gws CLI.
- Write-op confirmation guardrails.
- Audit logging.

## 7. Phản hồi người dùng

Zero public interaction (0 comments, 0 reactions toàn bộ items). Team làm việc closed-loop.

Issue #3862 user report: fresh install Iron Proxy fail vault login. Chỉ internal report, không thấy external user feedback.

## 8. Backlog & Roadmap

**Immediate priorities:**

- Fix #3869 (`/update-nanoclaw` broken) - blocks upgrades.
- Merge #3868 (Claude Code 2.1.280) - blocks agent resume correctness.
- Merge #3866 (MCP startup wait) - affects Codex reliability.

**In-flight major work:**

- **CDSS gateway stack** (#3815 + #3817 + #3818) - 3-PR dependency chain, gateway seam refactor + Iron Proxy + setup decoupling. Foundation cho self-serve deployments.
- **Channel improvements** - Signal fixes (#3837), long-running DM/attachment issues.
- **Provider expansion** - Cursor SDK (#3355 + #3356).

**Update mechanism debt:**

- 3 PRs (#3750, #3565, #3451) address `/update-nanoclaw` fragility. File list maintenance manual, error-prone.

**Technical debt signals:**

- Barrel import timing bugs (#3862, #3863) - module load order fragile.
- Git archive file lists (#3869, #3750) - brittle, no transitive dep tracking.
- Codex version lag (#3867) - 2 tháng behind, 18 releases missed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 2026-09-23

## 1. Tóm tắt hôm nay

Không có hoạt động mới ngày 23/09. Ba PR từ ngày trước vẫn mở: sửa builtin.time trong host-runtime, fix IME composition cho WebUI, thêm locale tiếng Ý.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Ba PR đang mở:**

- **#8108** (builtin.time): Thêm operation `shift` cho time builtin, cho phép cộng/trừ time delta (seconds/minutes/hours/days/weeks). Fix typed input issues. Tác giả: @Bortlesboat.

- **#8092** (IME composition): Sửa chat composer giữ lại IME composition events, không bị command-menu hoặc Enter-to-send chặn. Xử lý Safari bug (keyCode 229 khi isComposing=false). Tác giả: @huiq777.

- **#8107** (Italian locale): Thêm locale `it` (thứ 12) cho WebUI, full English key union không fallback. Request từ #7855. Tác giả: @huiq777.

**Xu hướng:** Cải thiện UX (i18n, input handling) và mở rộng built-in functions.

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có nhiều reaction. #8107 đáp ứng request từ #7855 (user yêu cầu tiếng Ý).

## 5. Ổn định & Bugs

- **IME bug (#8092):** Safari không report isComposing đúng, input bị nuốt. Fix bằng keyCode 229 detection.
- **Time builtin (#8108):** Typed input có issues, đang sửa.

## 6. Yêu cầu tính năng

#8108 thêm time shift operation (cộng/trừ thời gian). #7855 request Italian locale (đã implement trong #8107).

## 7. Phản hồi người dùng

Một user request tiếng Ý, team respond nhanh. Không có comment/discussion công khai khác.

## 8. Backlog & Roadmap

Không có thông tin. Ba PR đang chờ review/merge. Dự án tập trung refine WebUI và runtime builtins.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-09-23

## 📊 Tóm tắt hôm nay

Ngày bận rộn với 10+ PR được merge, tập trung vào **stability fixes** và **tooling refinement**. Không có release mới, nhưng v2.2.2 đang chuẩn bị (PR #7928 cho release notes). Hoạt động chính: sửa bugs nghiêm trọng (Windows sandbox ACL, pet approval crash), cải thiện UX (sidebar redesign, transcript history), và batch-3 unit test coverage (+3.28pp lên 73.79%).

## 🔧 Tiến độ dự án

### Merged/Đóng hôm nay:
- **#7933** - Fix pet approval crash: `TypeError` khi approve/deny tool request, `actor` param bị thiếu
- **#7932** - Desktop build validator: sau #7899 sharded catalog, script vẫn tìm `model_catalog.json` cũ → fail post-PyInstaller
- **#7938** - Unit test batch-3 Windows compatibility (đóng, mở lại #7941)
- **#6668** - GPT-5.6+ prompt caching support (merged)
- **#3819** - Batch model insertion UI thay "Auto Discover" (merged)
- **#4938**, **#4955**, **#1512**, **#1961**, **#1538**, **#1086**, **#842**, **#1246**, **#2353** - Backlog cleanup: subagent lifecycle, tool call parsing, cron channel injection, Feishu reactions

### Open quan trọng:
- **#7944** - Background tool results leak context: offloaded tool gửi `role="assistant"` → model nhầm thành assistant turn, cần wrap hint block
- **#7941** - Unit test batch-3: +47 files, +2720 cases, coverage 70.51%→73.79%
- **#7940** - Sidebar UX refactor: compact movable nav, direct toggle (no extra menu)
- **#7931** - Durable chat history: SQLite transcript per-session, paginated load, stable cursors
- **#7869** - Session header leak: connection check không mang `x-opencode-session`, OpenCode backend nghĩ là request mới
- **#7409** - Empty text blocks: model hết token cho reasoning → `TextBlock(text="")` → spam mọi request sau

## 🐛 Ổn định & Bugs

### Nghiêm trọng (mở):
- **#7943** - Windows sandbox ACL disaster: workspace root = drive root (`C:\`) → ACL lan toàn ổ đĩa, lock volume
- **#7935** - LLM timeout không tự phục hồi: `openai.APITimeoutError` lần đầu → tất cả request sau timeout vĩnh viễn, phải restart process
- **#7850** - Driver card policy lost update: `reload_driver` race condition, concurrent policy write bị clobber

### Đã fix:
- **#7934** - Cloudflare interstitial báo sai: HTML 403 bot-challenge page → "credential problem", giờ hiện "blocked"
- **#7832** - Context window override mù: UI render `max_input_length` raw (131k default) nhưng runtime dùng 5-level precedence, số thực khác xa
- **#6874** - MCP tool timeout: thêm `tool_call_timeout` (default 300s), legacy `timeout` chỉ còn cho stdio

### User experience bugs (đóng):
- **#7771** - Context compaction tạo tab trống "Compact Chat Session Title" 
- **#4923** - Subagent task không show progress, lịch sử trống đến khi xong
- **#7549** - Volcengine Ark từ chối request kết thúc bằng assistant turn: 400 "MissingParameter: partial"

## 💡 Yêu cầu tính năng

### High-interest (nhiều upvote/discussion):
- **#6318** (8 comments) - Model per-conversation: giờ bind agent-level, muốn default + override từng convo
- **#6229** - Reasoning depth selector (Light/Medium/Deep/Auto): user control tốc độ vs chi tiết
- **#4036** (7 comments) - Add model quá nhiều bước: Settings→API Key→Save→Models→Add→fill, cần streamline
- **#5182**, **#5572**, **#4882**, **#5351** - Model failover/auto-downgrade: quota hết/timeout → tự chuyển backup model

### Mới nhất:
- **#7945** - Filter `@all`/`@ALL`: IM notification spam, agent phản hồi không cần thiết
- **#7939** - Event-trigger layer plugin: điều kiện external event kích agent (đã implement & open source), bổ sung cho cron

### UX improvement:
- **#5283** - Project-based session management: kiểu Codex, nhóm convo theo project hoặc manual chọn directory
- **#4020** - Force readonly MEMORY/AGENTS/SOUL files: tool layer chặn `write_file`, chỉ cho `edit_file` để tránh wipe data

## 👥 Phản hồi người dùng

- **#3424** - Hỏi: làm sao cancel background subagent task? `multi_agent_collaboration` không có `cancel` command
- **#3251** - Desktop 1.0.2 không sửa được base URL provider trên UI
- Nhiều issue về **model flexibility**: bind quá cứng (agent-level), không fallback, configuration phức tạp
- Concern về **data loss**: model tự ghi đè config file (MEMORY.md, SOUL.md), ACL bug Windows

## 🗺️ Backlog & Roadmap

### Sprint hiện tại (suy luận từ PR activity):
- **Stability hardening** cho v2.2.2: bug fixes, test coverage, desktop builds
- **Chat history refactor**: durable transcript storage (#7931), pagination
- **Tooling polish**: sidebar UX (#7940), model management UX (#3819 merged)

### Tech debt đang xử lý:
- Unit test coverage sprint: batch-3 merged, mục tiêu 75%+
- Legacy backlog cleanup: 10+ PR từ 3/2026 merged hôm nay (cron, formatter, tool parsing)
- Provider error reporting: bot-challenge detection, real HTTP status

### Nợ lớn (chưa commit):
- Model configuration overhaul: failover, per-convo model, thinking-level UI
- Subagent visibility: real-time progress, structured logging
- Windows sandbox security: ACL scope validation, drive-root reject

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*