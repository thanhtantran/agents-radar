# Bản tin Hệ sinh thái Hermes Agent 2026-09-20

> Issues: 67 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-20 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-20

## 📊 Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào: xử lý bug Python 3.14 compatibility (DaemonThreadPoolExecutor), sửa lỗi gateway/session state, mở rộng plugin system. 50 issues/67 còn open, 30 PRs/500 total → nhiều bug tồn đọng, cộng đồng đang chờ fixes.

---

## 🚀 Releases

Không có.

---

## 📈 Tiến độ dự án

### Xu hướng chính

**1. Python 3.14 Compatibility Crisis**
- **6+ issues** (#59896, #69359, #76621, #80857, #100982) báo cáo `DaemonThreadPoolExecutor` crash với `AttributeError: '_initializer'`
- **6+ PRs** đang fix (#69209, #69311, #76817, #81118, #85961, #109037, #113338)
- Root cause: CPython 3.14 đổi `ThreadPoolExecutor` internals (`_initializer/_initargs` → `WorkerContext`)
- Impact: **P3, sweeper:risk-compatibility** → parallel tool calls fail, phổ biến trên Fedora 44

**2. Gateway & Session State Issues**
- #114456: async delegation notice stall ~24 phút, /stop không drain queue → **P0**
- #116516 (PR): startup-restore replay crash wedge inbound gate
- #116450: symlink path làm WAL guard miss held sidecars
- #30708: BlueBubbles adapter thiếu dedup → duplicate processing + 2 parallel sessions

**3. Plugin System Expansion**
- #116555, #116556, #116553: provider plugins giờ control setup catalog, image routing, OAuth flow
- #114263: Tempo MPP catalog entry (HTTPX payment)
- #116521: Adspirer plugin (paid-media campaigns)
- #116528: discrete-decision-gate skill (routing với 3 backends)

**4. Windows-specific Problems**
- #116173: `hermes update` abort khi SCM service refuse QueryServiceConfigW (WinError 15100)
- #116550: gateway setup ask install prompts twice + re-offer UAC
- #91021: desktop app không reconnect WSL backend sau update

**5. Config & Auth Drift**
- #116404: `tools.tool_search.defer` missing từ DEFAULT_CONFIG
- #115306: Gemini keys `AQ.*` không work sau update `1e4952ddba`
- #107918: Dashboard TUI show "Setup Required" dù có valid provider

---

## 🌟 Điểm nổi bật cộng đồng

### Issues nhiều comment/👍

1. **#97681** (28 comments, 2👍): Bot Group Chats ngưng work sau khi Desktop close
   - User request: group chat persist across devices mà không giữ Desktop open
   - Labels: P2, sweeper:risk-session-state

2. **#53004** (16 comments): Projects paradigm break folder → session → sidebar flow
   - PR #49037 replace sidebar/file-tree → workflow gãy
   - Right sidebar show "no project open", không start session ở chosen folder

3. **#26277** (13 comments, 2👍): Email session isolation by normalized subject
   - Current: all messages từ same sender = 1 session
   - Request: opt-in mode group by subject (như email threads)

4. **#107918** (7 comments, CLOSED): Dashboard TUI false "Setup Required"
   - Docker container, custom provider configured nhưng TUI báo chưa setup
   - Đã close → có thể đã fix

---

## 🐛 Ổn định & Bugs

### Critical/High Priority

**P0:**
- #114456: async delegation stall behind busy session (24 min delay)

**P1:**
- #107918: dashboard auth detection false negative (CLOSED)
- #116516 (PR): gateway startup-restore wedge

**P2 cluster:**
- Gateway status false-negative (#116416, CLOSED)
- Update cleanup traceback (#115466, #116497)
- Desktop UI freeze 15-20min khi context compression stall (#116472)
- Config drift: reasoning effort shadow (#107949), context ceiling lost (#116467)
- LSP: 5s budget cho cold server cần 55s, timeout poison workspace (#116446)

### Platform-Specific

**Windows:**
- Update abort (SCM service enum), setup prompts duplicate, UAC re-offer
- Desktop crash SIGSEGV khi print Google Doc (#101880)

**macOS:**
- Ctrl+D không exit TUI, Cmd+D conflict với Ghostty (#116443)
- Symlink path break deleted-WAL guard (#116450)

### Compatibility

**Python 3.14:**
- 6+ issues, 6+ PRs → chưa merge → blocker cho systems chạy 3.14

**OpenAI:**
- Reasoning models starve trên gateways có internal output cap (#108558, CLOSED)
- GPT-5.6 reasoning support incomplete (#61634, CLOSED)

---

## 💡 Yêu cầu tính năng

### Active Requests

1. **Project-scoped memory** (#33638, P3)
   - Filter MEMORY.md by cwd/project context
   - Current: all entries inject mọi session

2. **Email session isolation** (#26277, P3)
   - Opt-in mode: group by normalized subject thay vì sender

3. **Bot Group Chats persistence** (#97681, P2)
   - Keep working sau khi Desktop close
   - Pick up from other device

4. **Kanban pre-dispatch hooks** (#116452, #116455)
   - Pre-dispatch + pre-create plugin hooks
   - Gateway status text hook, CLI parity cho `kanban create`

5. **User-defined model list** (#50715)
   - Supplement picker với models chưa có trong manifest
   - OpenRouter models mới chưa được curate

### Merged/In-Progress Features

- **Smart Skill Lifecycle** (#20644, CLOSED): auto-tiering + auto-matching
- **Semantic Firewall** (#25512): defense against prompt injection
- **Provider plugins OAuth** (#116553 PR): register, login, refresh through profile
- **Image generation custom endpoints** (#83080, CLOSED): named endpoints cho image/video gen

---

## 💬 Phản hồi người dùng

### Frustrations

1. **Setup/Config friction:**
   - Dashboard TUI false negatives (#107918)
   - Gemini keys đột ngột không work (#115306)
   - Config drift: keys missing, defaults inconsistent (#116404)

2. **Gateway reliability:**
   - Message delivery issues: stalls, duplicates, flood control
   - Telegram: streaming edits unpaced → 83% flood penalties (#116312)
   - BlueBubbles: duplicate processing (#30708)

3. **Windows experience:**
   - Update flow brittle: SCM errors, UAC re-prompts
   - WSL backend reconnect fail sau update (#91021)

4. **Python 3.14 blockers:**
   - Không thể chạy trên Fedora 44, systems với Python 3.14
   - 6+ issues chưa merge fix

### Positive Signals

- Plugin catalog expansion: provider plugins, Tempo MPP, Adspirer
- Community contributions: nhiều PRs từ users (tobenwarrior, hurie, JoaoMarcos44...)
- Feature requests có design discussion (project-scoped memory, email isolation)

---

## 📋 Backlog & Roadmap

### Immediate (từ labels P0-P2)

**Must fix:**
- Python 3.14 compatibility (merge 1 trong 6+ PRs)
- Gateway startup-restore wedge (#116516)
- Async delegation stall (#114456)
- Windows update flow (#116173, #116550)

**Should fix:**
- Desktop UI freeze khi compression stall (#116472)
- Config drift: reasoning effort, context ceiling (#107949, #116467)
- LSP timeout tuning (#116446)

### Medium-term (P3, feature requests)

- Project-scoped memory (#33638)
- Email session isolation (#26277)
- Bot Group Chats persistence (#97681)
- Kanban plugin hooks (#116452, #116455)
- User-defined model list (#50715)

### Technical Debt

- Config schema drift: `tools.tool_search.defer` missing (#116404)
- Provider catalog: tách hardcoded logic ra plugins (#116556, #116557)
- Security: pipe-to-shell patterns miss zsh/ksh/dash (#116456)
- Subprocess env var gate: expand blocked names (#116518)

### Blocked/Waiting

- GPT-5.6 reasoning integration (#61634, needs-decision)
- Smart Skill Lifecycle (#20644, CLOSED but marked type/feature)
- Clinical protected response repair (#108836, needs-decision)

---

## 🔍 Insights

**Stability concerns:**
- 6+ duplicate issues cho same bug (Python 3.14) → triage/merge bottleneck
- P0/P1/P2 bugs còn open nhiều → quality bar slide?
- Gateway/session state issues tái phát → architecture debt?

**Community health:**
- Many PRs từ first-time contributors → docs tốt
- Plugin catalog growing → ecosystem alive
- But: frustration với config drift, auth false negatives → onboarding pain

**Next focus areas (inferred):**
1. Merge Python 3.14 fix (unblock Fedora 44 users)
2. Gateway reliability sprint (stalls, duplicates, flood control)
3. Windows experience polish (update flow, WSL reconnect)
4. Config schema audit (find all drift, add validation)

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-20

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang ở giai đoạn **sửa lỗi ổn định** sau đợt phát triển tính năng mạnh. 8 dự án, 3 nhóm rõ rệt:

**🔴 Production-grade chaos (OpenClaw, Hermes Agent):**
- Release tạo thảm họa → hotfix liên tục
- Gateway/session state breakdown
- Update path hỏng nhiều platform

**🟡 Mature but quiet (NanoBot, ZeroClaw):**
- Chất lượng cao, velocity thấp
- Fix edge cases, polish UX
- Cộng đồng nhỏ technical-focused

**🟢 Early/abandoned (PicoClaw, NullClaw, IronClaw, NanoClaw, QwenPaw):**
- Cert hết hạn không fix (PicoClaw)
- Activity gần 0 (NullClaw)
- PR pending >30 ngày (IronClaw, NanoClaw)
- UI/UX bug storm (QwenPaw)

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động chính | Tình trạng |
|-------|--------|-----|----------|-----------------|------------|
| **Hermes Agent** | 67 | 500 | 0 | Python 3.14 compat crisis, gateway bugs | 🔴 Regression cleanup |
| **OpenClaw** | 108 | 500 | 1 | v2026.9.5 update failures, auth/Codex regressions | 🔴 Hotfix storm |
| **NanoBot** | 1 | 28 | 0 | Security closes, test stability, provider expansion | 🟡 Polish mode |
| **ZeroClaw** | 8 | 50 | 0 | Tool approval bypass fix, WhatsApp expansion | 🟡 Quality fixes |
| **QwenPaw** | 9 | 6 | 0 | Console crash recovery, provider format bugs | 🟢 UI firefight |
| **NanoClaw** | 0 | 4 | 0 | Timeout fix, health check CLI | 🟢 Slow burn |
| **IronClaw** | 0 | 1 | 0 | Identity integration PR (39 ngày pending) | 🟢 Stalled |
| **PicoClaw** | 1 | 0 | 0 | TLS cert expired 10 ngày, không fix | 🔴 Abandoned |
| **NullClaw** | 0 | 0 | 0 | Zero activity | 🔴 Dead |

## 3. Vị thế Hermes Agent

**📍 Trong top 2 active nhưng chất lượng tụt:**

✅ **Ưu điểm:**
- Cộng đồng lớn: 50 issues open, nhiều contributors
- Plugin ecosystem growing (Tempo MPP, Adspirer)
- Feature velocity cao (semantic firewall, smart skill lifecycle)

❌ **Vấn đề nghiêm trọng:**
- **6+ duplicate issues** same bug (Python 3.14 `DaemonThreadPoolExecutor`) → triage failure
- **P0 gateway stalls** 24 phút async delegation không drain
- **Windows experience hỏng**: update abort, UAC loops, WSL reconnect fail
- **Config drift epidemic**: keys missing, defaults inconsistent (#116404, #115306, #107949)

**So với OpenClaw:**
- OpenClaw cũng update disaster nhưng **close P0 nhanh hơn** (3 P0 closed trong 24h)
- Hermes có **nhiều duplicate reports hơn** → community management weak
- OpenClaw có **architecture refactor** (SQLite off-thread) → foundation better

**So với mature projects (NanoBot, ZeroClaw):**
- Hermes ship features nhanh nhưng **stability debt cao hơn**
- NanoBot velocity thấp nhưng **zero P0 open**
- ZeroClaw phát hiện **3 high-severity logic holes** (approval, cost, multimodal) same week và **fix ngay** → process tốt hơn

**Vị trí thực:** Top-tier activity nhưng **quality bar đang slide**. Risk: user frustration cao (Windows, config, gateway) + technical debt visible.

## 4. Hướng kỹ thuật chung

### 🔧 Production Hardening Sweep

**Tất cả mature projects đang fix:**
- **Gateway/session reliability:** Hermes (#114456 stall), OpenClaw (#152744 catalog, #153313 livelock)
- **Update path robustness:** Hermes (Windows SCM), OpenClaw (8 failure reports), NanoClaw (#3646 timeout)
- **SQLite off main thread:** OpenClaw (#152736, #152571), ZeroClaw (#10621 lifecycle coord)
- **Resource leaks:** OpenClaw (#97616 zombies, #153246 tmpdir 7.5GB/day), NanoBot (#4819 WeakValueDictionary)

### 🔐 Security Tightening

- **Tool execution guards:** Hermes (semantic firewall #25512), ZeroClaw (#10937 approval bypass, #10804 cost bypass)
- **Credential protection:** NanoBot (#4667, #4668 closed), NanoClaw (#3680 mount bypass)
- **Subprocess sandboxing:** ZeroClaw (#10610 shell policy RFC #7155)

### 🌐 Channel Expansion Priority

**WhatsApp Web leader:** ZeroClaw (#10984 polls, #10979 groups, #10982 previews, #10980 PDF)

**Email/Telegram polish:** NanoBot (#5606 alias filter), OpenClaw (#146361 Telegram loss), Hermes (#116312 flood control)

**MCP/OAuth integration:** QwenPaw (#7879), Hermes (#116553 provider plugins)

### 🧠 Multi-modal Stabilization

- ZeroClaw: tool-result images lost (#10903), reasoning chains sanitized (#10953)
- QwenPaw: nested file reject (#7883), audio input 403 (#7885)
- Hermes: reasoning effort shadow (#107949), context ceiling lost (#116467)

### 🏗️ Architecture Pivots

**Control plane redesign:** QwenPaw (#7874 PawApp breaking change)

**Lifecycle coordination:** ZeroClaw (#10621 XL), OpenClaw (outbound delivery off-thread #152736)

**Processless agents:** IronClaw (#7499 host-mediated Passport)

## 5. Điểm khác biệt

### 📦 Release Strategy

| Dự án | Approach | Risk |
|-------|----------|------|
| OpenClaw | Stable channel + rapid hotfix | 2026.9.5 broke many, but P0 fixes same day |
| Hermes | Continuous, no version tagging | Issues pile up, no clear "stable" point |
| NanoBot/ZeroClaw | No releases, rolling main | Low churn, polish in place |
| QwenPaw | Rolling with breaking changes | #7874 PawApp redesign no migration guide |

### 🤝 Community Management

**OpenClaw (best):**
- 50 comments on #149361 (WebUI perf umbrella) → engagement
- 19 comments on P0 #152744 → rapid debug
- Maintainer close 14 PRs/24h → responsive

**Hermes (needs work):**
- 6+ duplicate Python 3.14 issues → no triage consolidation
- Dashboard false-negative #107918 closed but user confusion persist
- Config drift complaints no pattern fix

**ZeroClaw (surgical):**
- Low comment volume but high signal
- RFCs (#10930, #10929) untuk architectural decisions
- 3 high-severity bugs discovered + fixed same week → internal audit

**Dead/dying:**
- PicoClaw: cert expired 10 days, 1 upvote, zero maintainer response
- IronClaw: PR #7499 (39 days, XL, 0 comments) → contributor abandoned?

### 🎯 Feature Philosophy

**Feature-first (Hermes):**
- Plugin catalog (Tempo MPP, Adspirer)
- Semantic firewall, smart skill lifecycle
- Risk: stability debt accumulate

**Stability-first (NanoBot, ZeroClaw):**
- Fix edge cases before new features
- Security closes priority
- Risk: slower innovation perception

**Bet-the-farm (QwenPaw):**
- PawApp control plane rewrite (#7874) breaking change
- Console error boundary redesign (#7889)
- Risk: migration pain if docs weak

### 🔌 Provider Ecosystem

**Open catalog (Hermes, NanoBot):**
- Gemini, OpenAI, custom endpoints
- Risk: compatibility drift (#115306 Gemini keys break)

**Self-host focus (NanoClaw):**
- Pi agent in-process (#3857)
- Local-model timeout tuning (#3646)

**Gateway-mediated (OpenClaw):**
- Runtime auto-selection
- Catalog state in SQLite
- Risk: livelock (#153313), migration deadlock (#152744)

## 6. Mức độ trưởng thành cộng đồng

### 🏆 Tier 1: Production Community

**OpenClaw:**
- 50-comment threads (WebUI perf)
- User testimonials (#153257 "8-hour recovery regret")
- Multi-day debug sessions with maintainer participation
- **Weakness:** update path fragile nhiều edge cases

**Hermes:**
- Diverse contributors (first-time PRs merged)
- Plugin development active
- **Weakness:** duplicate issues, config frustration, Windows pain

### 🥈 Tier 2: Technical Elite

**NanoBot:**
- Low volume, high quality PRs
- Security-conscious (3 security closes same day)
- **Weakness:** small community, slow feature adoption signal

**ZeroClaw:**
- RFC-driven architecture decisions
- Internal audit discovers critical bugs
- **Weakness:** zero public user voice in issues/PRs

### 🥉 Tier 3: Early/Experimental

**QwenPaw:**
- Active bug reports (Console, DeepSeek, OpenCode)
- First-time contributors (TerebiSAMA #7889)
- **Weakness:** regression velocity high, UX complaints

**NanoClaw:**
- Core team only, zero external engagement
- **Weakness:** PR pending >20 days → review bottleneck?

### ⚰️ Tier 4: Dead

**PicoClaw:** cert expired, [stale] tag, zero maintainer activity

**NullClaw:** zero everything

**IronClaw:** PR #7499 (XL, 39 days, 0 comments) → contributor ghosted?

## 7. Tín hiệu xu hướng

### 📈 Emerging Patterns

**1. Python 3.14 Compatibility Crisis Spreading**
- Hermes: 6+ issues `DaemonThreadPoolExecutor` crash
- Pattern: CPython internals change → agent frameworks break
- **Prediction:** other Python-based agents hit this Q4 2026

**2. Gateway Architecture Under Stress**
- OpenClaw: catalog deadlock, livelock, off-thread migration wave
- Hermes: async delegation stall, session state issues
- **Root cause:** single-threaded event loop + blocking SQLite + high concurrency
- **Trend:** move to thread-per-concern (OpenClaw approach) or async-native DB

**3. WhatsApp Web = New Battleground**
- ZeroClaw shipping polls, groups, PDF previews
- Other projects lag (Signal/Telegram mature, WhatsApp neglected)
- **Opportunity:** WhatsApp 2B users, business use cases

**4. Multi-modal Fragility**
- Tool-result images, audio inputs, reasoning chains → edge cases everywhere
- Provider format incompatibility (DeepSeek nested files, OpenCode audio reject)
- **Prediction:** consolidation around standard envelope (OpenAI-compatible?)

**5. Security Second Wave**
- First wave: credential leaks, prompt injection
- Second wave: **tool execution boundaries** (ZeroClaw approval bypass, NanoBot mount bypass)
- **Next:** supply chain (dependency typosquatting, plugin malicious behavior)

### 🔮 3-Month Forecast (Q4 2026)

**Winners:**
- **OpenClaw** if stabilize update path → production trust restored
- **ZeroClaw** if ship RFC #10621 lifecycle + #10610 shell policy → foundation solid
- **Hermes** if consolidate Python 3.14 fix + gateway sprint → feature velocity payoff

**Losers:**
- **QwenPaw** if PawApp breaking change (#7874) no migration support → user churn
- **NanoClaw** if review bottleneck persist → contributors abandon
- **PicoClaw/IronClaw** already dead/dying

**Dark Horse:**
- **NanoBot** low-key quality → sleeper hit for risk-averse enterprises

### 🚨 Systemic Risks

**1. Update Path Fragility Everywhere**
- No project has bulletproof update → user fear regression
- **Need:** standardized preflight checks, rollback mechanisms, better error actionability

**2. Configuration Drift Epidemic**
- Hermes, OpenClaw both have "config worked yesterday, broken today"
- **Root cause:** live config reload + schema evolution + no migration scripts
- **Solution:** versioned config with explicit migration steps

**3. Community Management Gap**
- High-activity projects (Hermes, OpenClaw) struggle with duplicate issues, stale PRs
- **Need:** triage automation, issue templates, PR review rotations

**4. Windows Second-Class Citizen**
- Hermes: SCM errors, UAC loops, WSL reconnect fail
- OpenClaw: 2026.9.5 update failures
- **Cause:** Unix-first development, Windows edge cases undertested
- **Risk:** lose Windows users to GUI-first competitors

### 🎯 Strategic Opportunities

**For Hermes:**
1. **Emergency:** consolidate 6 Python 3.14 PRs → merge one
2. **Hygiene:** deduplicate issues, fix config drift pattern
3. **Differentiation:** plugin ecosystem already ahead → lean into it

**For OpenClaw:**
1. **Trust repair:** release 2026.9.6 with update path hardening
2. **Architecture:** finish SQLite off-thread migration
3. **Docs:** user-facing update troubleshooting guide

**For underdogs:**
- **ZeroClaw:** publish RFCs early → attract design-minded contributors
- **NanoBot:** case studies for security-conscious users
- **NanoClaw:** merge pending PRs (health check #3856 valuable)

### 🌊 Macro Trends

**Consolidation Phase:** 9 projects → expect 5-6 survivors by mid-2027

**Production readiness bar rising:** users demand stability over features

**Ecosystem competition:** not just agent vs agent, but **plugin ecosystems** (Hermes) vs **channel coverage** (ZeroClaw WhatsApp) vs **enterprise polish** (NanoBot security)

**The real competition:** not each other, but **Cursor/Windsurf/closed-source alternatives**. Open-source agents need **way better stability + way better UX** to justify self-hosting complexity.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo hoạt động OpenClaw 2026-09-20

## 1. Tóm tắt hôm nay

Release 2026.9.5 rollout gặp vấn đề nghiêm trọng: ~15 update failures với lỗi doctor-failed, runtime-verification-failed, auth profile không nhận diện. Team đang hotfix auth profile lookup regression (#152968 closed), Codex catalog retry loop (#152689 closed), state lock migration (#152744 closed). Core dev đang clean backlog với 14 PRs merged/closed trong 24h.

## 2. Releases

**v2026.9.5 Linux stable** (2026-09-19)
- AppImage và Debian package published
- Major regression: nhiều báo cáo upgrade failure từ 2026.9.4
- Critical bugs phát sinh: auth profile lookup fail, Codex catalog không settle, openat2 ENOSYS trên Docker

## 3. Tiến độ dự án

**Landed today:**
- #153083: Fix ackDelivery race condition khi claimless caller delete queue row của live claim
- #153038: Bound Codex catalog retries, cleanup plugin capture để fix #152689 tmpdir leak (7.5GB/day)
- #152571: Refactor SQLite prepared bindings loại bỏ query copy overhead
- #153336: Fix transcript worker startup race trong producer tests

**Active work (30 PRs):**
- #146361 (XL, P2): Fix code/attachment loss trong streamed Telegram replies — proof: telegram-e2e
- #153268 (L, P3): Graph resource usage trong Systems UI với interactive history
- #152736 (L, P2): Move outbound delivery lease SQLite off Gateway thread
- #153277 (XL, P2): Stabilize task reads, chat interactions, async tests — multi-component fix
- #153076 (XL, P2): Keep Gateway responsive khi admit outbound messages

**Architecture trends:**
- Heavy SQLite off-thread migration: auth scopes, delivery leases, state reads
- Test stability sweep: lifecycle cleanup, worker startup races, scheduler timing dependencies
- Performance optimization: memoize rollups (#153348), reuse model references (#152897)

## 4. Điểm nổi bật cộng đồng

**High engagement (>10 comments):**

#149361 (50 💬): WebUI performance umbrella — index nhỏ fixes, private draft PRs giữ validation gaps

#97616 (30 💬, P1): Zombie process leak từ hook/tool children — regression causing runtime degradation

#152744 (19 💬, P0 → CLOSED): Codex retained-state migration never settles trên 2026.9.5, session catalog stuck cold

#152759 (13 💬, P0): Update 2026.9.4→2026.9.5 fail với doctor-failed, silent rollback không actionable

#104719 (11 💬, P1): memory-wiki supplement ignore tool deadline khi underfill candidates

**User pain points:**
- Update path fragile: nhiều failure modes (doctor-failed, runtime-verification-failed, managed-service-preflight)
- Codex plugin state handling brittle: catalog retry loops, auth profile disappear post-upgrade
- Zombie process accumulation over time

## 5. Ổn định & Bugs

**P0 closed today:**
- #152744: Codex state migration deadlock
- #152689: Catalog retry fill tmpdir với 342MB captures
- #145929: Auth profile lock-may-be-busy sau interrupted self-update
- #152968: Codex cannot find existing openai:default profile trên 2026.9.5

**P0 open (release blockers):**
- #152759, #152891, #153049, #153177, #153230, #153270, #153303, #153316: 8 update failure reports với different reason codes
- #153257 (8 💬): User report "8-hour failure recovery session" sau upgrade 2026.9.5
- #153313 (2 💬): Gateway main thread livelock trong acquirePreparedModelRuntimeLeaseFromOwners khi runtime="auto"
- #152839 (3 💬): openat2 ENOSYS trên Docker → gateway cannot start, cần compatibility fallback

**P1 critical issues:**
- #97616: Unreaped child process leak
- #148292: Session auto-compaction hang 23 minutes, no timeout, coupled to primary model
- #138139: providerConfigMatchesRuntimeSnapshot recursive stringify starve event-loop với large catalogs
- #121232: memory-core dreaming ranker/applier disagree → "Ranked N, Promoted 0 forever"

**Stability patterns:**
- Update path có nhiều edge cases: Node version changes (#107930), interrupted flows, Docker environment
- SQLite locking dưới load: state lock, auth store, transcript projection
- Resource leaks: zombie processes, plugin build temps (7.5GB/day #153246), WorkerThread CPU (#152961)

## 6. Yêu cầu tính năng

**New:**
- #153340 (M): Dynamic two-stage LLM tool filtering để optimize context window
- #153339 (M): TEKIZAI provider plugin + API-key onboarding
- #153268 → landed: Systems page resource usage graphs

**Long-standing:**
- #7406 (4 💬, P2): Human-readable Telegram topic names thay vì `agent:main:telegram:group:-123456789:topic:42`
- #116547 (3 💬, P1): Wire adoptionStallTimeoutMs config cho Slack — 5min default dead-letters queued follow-ups
- #138403 (3 💬, P2): Dream Diary narrative timeout configurable — 60s hardcoded timeout kill slow local models

## 7. Phản hồi người dùng

**Frustration với 2026.9.5:**

@abuegab1-spec (#153257): "Genuinely regret upgrading... Before: stable. After: 8-hour recovery. 9.5 turned stable environment into failure session."

@droidyouwerelookingfor (#152744): Codex migration never settles, session catalog permanently cold, "thread not loaded" errors

@mrzeepek (#152689): Catalog retry loop fill tmpdir với repeated 342MB captures

**Docker users:**
@dabase (#152839): openat2 ENOSYS block gateway start, cần compatibility path hoặc clear preflight error

**Positive:**
- Community actively repro, provide logs, confirm fixes
- Maintainer response rapid: 3 P0s closed trong 24h
- Test coverage improving: #153277 stabilize suite, #153210 fix flakes

## 8. Backlog & Roadmap

**Immediate priorities (inferred từ P0/P1 labels):**

1. **Update path stabilization** — 8 open failure reports cần root-cause
2. **2026.9.5 regressions** — auth profile, Codex catalog, openat2 compatibility
3. **Resource leak fixes** — zombie processes (#97616), plugin temps (#153246)
4. **Performance** — SQLite off-thread migration continues, event-loop starvation fixes

**Architectural work in progress:**
- Gateway responsiveness: outbound admits (#153076), task artifacts (#149852)
- Subagent reliability: termination vs timeout (#136554), deferred completion (#135481)
- Memory system: dreaming ranker/applier alignment (#121232), wiki supplement deadline (#104719)

**Test infrastructure:**
- Cleanup ownership tests (#153346, #153345)
- Async test stability (#153277)
- CI flake reduction (#153210, #153336)

**Chưa rõ timeline:**
- WebUI performance umbrella (#149361) — 50 comments nhưng chưa có consolidated fix plan
- Talk/voice features (#150204, #150530) — transcript timing issues với live models

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo hoạt động NanoBot - 2026-09-20

## 1. Tóm tắt hôm nay

Dự án tập trung cleanup và tổ chức lại: xóa file tài liệu cũ (CLAUDE.md), đóng 6 PR về bảo mật/performance đã complete, tiếp tục phát triển WebUI và tích hợp provider mới. Không có release mới. Hoạt động chủ yếu merge và review các PR tồn đọng.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### PRs đóng hôm nay (6):
- **#5818**: Xóa `CLAUDE.md` - cleanup tài liệu
- **#5816**: Polish provider setup UI - cải thiện UX cài đặt provider
- **#4668**: Enforce message outbound policy - bảo mật (#4076)
- **#4667**: Protect user skills from Dream writes - ngăn ghi đè skills (#4075)
- **#4664**: Protect dream history during compaction - bảo vệ lịch sử (#4055)
- **#4661**: Separate file edit progress IDs - fix WebUI progress tracking
- **#4588, #4581**: Token optimization - giảm context tokens từ tool outputs

### PRs đang mở quan trọng:

**WebUI & UX** (7 PRs):
- #5817: Thêm `nanobot update` command - tự update stable/dev
- #5776: Search filter cho ProviderPicker
- #5641: Fix iOS PWA tap và status-bar
- #5777: Fix mobile drawer autofocus
- #5367: Localize agent activity (10 ngôn ngữ)
- #5352: UI xóa provider với validation

**Providers** (2 PRs):
- #5666: Thêm aimlapi.com (1000+ models)
- #5453: Thêm SenseNova (商汤日日新)

**Core fixes** (7 PRs):
- #5809: Discard stopped follow-up recovery journal
- #5807: Clean Discord reaction state on stop
- #5748: Persist partial tool progress (#5747)
- #5403: Fix memory consolidation trigger bằng API tokens (#5402)
- #5257: Bound sustained-goal continuation
- #5292: Fix Matrix reply threading
- #5260: Ignore runtime files trong workspace

**Channels** (2 PRs):
- #5606: Email filter theo recipient alias
- #4919: Telegram custom Bot API URL

**Bugs** (2 PRs):
- #5431: Report background task failures
- #4820: Reject non-string web fetch URLs
- #4819: Replace WeakValueDictionary cho consolidation locks

### Xu hướng:
- **Mature codebase**: nhiều PR fix edge cases, race conditions, lifecycle cleanup
- **Production hardening**: memory management, error reporting, state cleanup
- **i18n expansion**: localization ra 10 ngôn ngữ
- **Provider ecosystem**: mở rộng tích hợp (aimlapi, SenseNova)
- **Security tightening**: đóng 3 PRs bảo mật quan trọng

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có engagement cao. Các contributor làm việc độc lập trên các module riêng. Cộng đồng nhỏ, tập trung developer.

## 5. Ổn định & Bugs

### Issue mở quan trọng:
- **#4072**: Security - ExecTool bypass workspace qua symlink (0 bình luận, chưa assign)

### PRs fix bugs đang review:
- **#5403** (P1): Memory consolidation không trigger vì tiktoken undercount 30-50% (#5402)
- **#5748** (P2): Tool progress mất khi process crash giữa batch (#5747)
- **#4819** (P2): WeakValueDictionary locks bị GC, gây race condition
- **#4820** (P2): Non-string URLs cache sai
- **#5777** (P2): Mobile drawer steal focus
- **#5807** (P2): Discord reactions không cleanup
- **#5809** (P2): Follow-up recovery journal không discard khi stop

### Pattern:
- Nhiều bug về **lifecycle management**: cleanup state khi stop/reset
- **Race conditions**: locks, background tasks, async coordination
- **Edge cases**: non-happy-path inputs, timing windows

## 6. Yêu cầu tính năng

### Đang implement:
- **#5817**: Self-update command (`nanobot update`, `--dev`)
- **#5776**: Search/filter trong ProviderPicker
- **#5606**: Email filter theo alias
- **#4919**: Telegram custom API endpoint
- **#5367**: Agent activity localization
- **#5352**: Provider removal UI với validation

### Providers mới:
- aimlapi.com (#5666): 1000+ models, 400k users
- SenseNova (#5453): Sensenova-6.8, DeepSeek-v4, GLM-5.2

## 7. Phản hồi người dùng

Không có feedback trực tiếp. Issues/PRs technical, không có user stories hay complaints. Dự án thiên về infrastructure improvements.

## 8. Backlog & Roadmap

### Active tracks (từ PR labels):
1. **Security hardening**: #4072 chưa fix, cần priority
2. **Memory system**: consolidation triggers, workspace ignores
3. **WebUI polish**: iOS fixes, localization, provider UX
4. **Channel stability**: Discord/Telegram/Matrix/Email edge cases
5. **Provider expansion**: ecosystem growth (aimlapi, SenseNova)
6. **Self-update flow**: stable/dev update commands

### Conflicts cần resolve:
- 6 PRs có conflict tag: #4819, #4820, #4919, #5666, #5352, #5453
- Merge conflicts block tiến độ provider và fixes

### Priority:
- **P1** (3 PRs): #5403 memory, #4668/#4667 security (đã đóng)
- **P2** (19 PRs): phần lớn features và fixes
- Security issue #4072 không có priority tag nhưng cần attention

---

**Đánh giá tổng thể**: Dự án mature, tập trung polish và production hardening. Velocity thấp (6 merged PRs), nhưng chất lượng cao. Cộng đồng nhỏ, technical-focused. Cần xử lý security issue #4072 và resolve conflicts để unblock 6 PRs.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw - 2026-09-20

## 🎯 Tóm tắt hôm nay

Không có release. Dự án tập trung vào 3 trục chính: sửa lỗi ngầm nghiêm trọng (tool approval bypass, context compaction token tracking), mở rộng WhatsApp Web (native polls, group creation, inline previews), cải thiện multi-modal stability (tool-result images, reasoning chains, stream guards).

## 📦 Releases

Không có.

## 🚧 Tiến độ dự án

**Critical fixes (P0):**

- **#10937** - delegated child loop approval bypass. Sub-agent inherit parent approval manager → tool ask human, parent not see, sub-agent continue. Fix: child loop get fresh bounded manager from target agent risk profile. High-risk.
- **#10935** - stream guard suppress entire response when prose quote tool-result-shaped object in code span. Guard check `tool_call_id` key, hit false positive. Fix: only check trailing message array, not streamed text. High-risk.
- **#10804** - delegated sub-loop not track cost, per-agent ceiling bypass. `TOOL_LOOP_COST_TRACKING_CONTEXT` never installed in delegate tool. Fix: scope cost into sub-loop, enforce ceiling. High-risk.

**Multi-modal stability:**

- **#10903** - tool-result images only live for trailing contiguous batch. Later tool call in same turn → earlier images gone before model see. Fix: keep all images live for full user turn.
- **#10953** - seam sanitizers (image/audio marker) rewrite assistant entry as string → signed reasoning object (`thinking.display`) lost. Fix: skip rewrite for tool-use entries.
- **#10938** - tool text scanning for image markers brittle, slow, false positive. Fix: tools declare attachments explicit, no scan.

**WhatsApp Web expansion:**

- **#10984** + **#10983** - native polls. Tool had only text fallback. Add `Channel::create_poll` trait method, implement on WhatsApp Web using `whatsapp-rust` poll API.
- **#10979** + **#10977** - group creation. Implement `Channel::create_room` + `invite_user` for WhatsApp Web so `channel_room` tool can create groups.
- **#10982** - outgoing images arrive empty card on phones. No `jpegThumbnail`/dimensions. Fix: inline preview from `image` crate thumbnail.
- **#10980** + **#10812** - PDF previews. Add `document_thumbnails` config flag, render first page as JPEG thumbnail using `pdfium-render`.

**Infrastructure:**

- **#10986** + **#10985** - dashboard-started turns get fresh channel instances → session-bound channel (WhatsApp Web) unreachable by tools. Fix: pass running channel instances to tool registry.
- **#10621** - lifecycle coordination. Daemon RPC, gateway, channels, ACP admission, CLI share one live-config authority instead of cloned snapshots. Coordinate agent admission, active sessions, config reload. XL, high-risk.
- **#10931** - Windows task stdout/stderr unbounded → disk fill. Replace `.cmd` append with hidden service runner, bounded log writer (10MB ring buffer).

**Provider transport:**

- **#10605** - Anthropic extended thinking through OpenAI-compatible gateways. Add `thinking_passthrough` flag for LiteLLM/OpenRouter.
- **#10916** - `reasoning_effort` only forwarded for OpenAI reasoning families. Non-OpenAI reasoning models (GLM-5.3, Kimi, DeepSeek) behind compatible gateways dropped it. Add `reasoning_effort_passthrough` flag.
- **#10895** - Anthropic rolling cache breakpoint lost when last message ends with image. `apply_cache_to_last_message` only place breakpoint on `text`/`tool_result` blocks. Fix: support all block types.

**Shell & encoding:**

- **#10955** - shell output encoding detection. Prefer UTF-8, fallback to Windows code-page hint, then `chardetng` + `encoding_rs` for non-UTF-8.
- **#10956** - platform default shell detection. Windows: probe `pwsh` → `powershell` → `cmd.exe`. macOS: `getpwuid_r` passwd shell → `zsh` → `bash` → `/bin/sh`. Linux: passwd shell → `/bin/sh`.
- **#10954** - PowerShell output UTF-8 init. Inject `[Console]::OutputEncoding=[System.Text.Encoding]::UTF8` after leading declarations, wrap in `try/catch` for safety.

**Process & docs:**

- **#10915** - add @JordanTheJet to maintainer CODEOWNERS for `docs/book/src/maintainers/**`.
- **#10978** - annotate bespoke CI gates with motivating incidents (Repository Structure, Zerocode RPC Boundary, Nix Hash Drift, Installer Drift).

## 🔥 Điểm nổi bật cộng đồng

**Most commented (Issues):**

- **#10930** (2 comments) - RFC: one durable primitive for human-agent questions. SOP approval gate already survives across restarts (`sop_runs`, `sop_events` in SQLite). Nothing else use it. Proposal: generalize for all human asks.
- **#10929** (2 comments) - RFC: delivery receipts for outbound messages. Outbound message carry no ID. Agent cannot tell if message arrived. Proposal: message ID + delivery/read receipt.

**Most commented (PRs):** No PR có >0 comments trong log. Activity focus on review/merge, not discussion.

## 🐛 Ổn định & Bugs

**Severity S2 (degraded):**

- **#10985** - dashboard turns cannot reach session-bound channel. Affects WhatsApp Web paired mode. Fix in #10986.
- **#10981** - WhatsApp images arrive empty card on phones. Fix in #10982.

**High-risk fixes merged/in-review:**

- Approval bypass in delegated sub-loops (#10937)
- Stream guard false positive (#10935)
- Cost tracking bypass (#10804)
- Tool-result images lost mid-turn (#10903)
- Reasoning chains lost on sanitizers (#10953)

**Stability trend:** Core agent loop have 3 high-severity logic holes discovered this week (approval, cost, multimodal). Fixes thorough, well-documented, suggest internal audit ongoing.

## 💡 Yêu cầu tính năng

**RFCs (open):**

- **#10930** - durable human-ask primitive. Generalize SOP gate for all tools that need human input.
- **#10929** - message delivery receipts. Track outbound message ID, surface delivery/read status.

**Shipped features (PRs merged/in-review):**

- WhatsApp Web native polls (#10984)
- WhatsApp Web group creation (#10979)
- WhatsApp Web PDF previews (#10980)
- Shell encoding detection (#10955)
- Platform shell detection (#10956)
- Anthropic thinking passthrough via compatible providers (#10605)

**Parking lot:**

- **#10812** - PDF thumbnail generation. High complexity (pdfium-render dependency), low priority. Feature shipped in #10980 but marked parking-lot in original issue.

## 🗣️ Phản hồi người dùng

Không có user testimonial hay complaint thread trong issue/PR comments. Activity chủ yếu internal contributor fix discovered bugs. WhatsApp Web feature batch (#10977, #10979, #10980, #10982, #10984) suggest user request or dogfooding feedback, but no explicit user voice in threads.

## 🗺️ Backlog & Roadmap

**In-progress (XL PRs stacked/in-review):**

- **#10621** - agent lifecycle coordination (XL, high-risk, foundational)
- **#10911** - atomic live config revisions (XL, stacked on #10621)
- **#10610** - shell V1 permission policy (RFC #7155 Phase 0+1, XL, security-critical)
- **#9535** - context compaction ratio anchored to model window (XL, follow-up needed)

**Accepted RFCs pending impl:**

- #7155 (shell permission policy) → #10610 implementing
- No other RFC explicitly marked accepted in this batch

**Near-term priorities (inferred):**

1. Land #10621 (lifecycle coordination) - foundation for other changes
2. Complete #10610 (shell security policy) - security-critical
3. Stabilize WhatsApp Web channel - feature parity with Signal/Telegram
4. Multimodal robustness - tool attachments, reasoning chains

**Long-term (parking lot / future work):**

- **#10930** + **#10929** RFCs need design decisions before implementation
- **#8561** - Telegram multi-message streaming (XL, needs-author-action)
- **#10525** - zerorelay browser enrollment frontdoor (XL, phase 1 only)

---

**Tín hiệu sức khỏe dự án:**

✅ High code velocity (50 PRs, 30 active)  
✅ Maintainer responsiveness (@Audacity88, @JordanTheJet active)  
✅ Security-conscious (3 high-risk logic bugs found + fixed same week)  
⚠️ Technical debt visible (approval/cost/multimodal issues suggest rapid early growth)  
⚠️ XL PRs in-flight create merge risk  

**Contributor activity:**

- **@Audacity88** (distinguished) - 12 PRs, multimodal + runtime core
- **@RustLangLatam** - 5 PRs, WhatsApp Web expansion
- **@NiuBlibing** (distinguished) - 4 PRs, shell + encoding
- **@JordanTheJet** (maintainer) - 2 RFCs, 1 test fix, CODEOWNERS

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-09-20

## 🔴 Tóm tắt hôm nay

Không có hoạt động phát triển mới. Vấn đề nghiêm trọng: cert TLS của picoclaw.io hết hạn 2026-09-10, site chết hoàn toàn. Issue được đánh dấu `[stale]` nghĩa là đã 7+ ngày không response từ maintainer.

## 📦 Releases

Không có.

## 🚧 Tiến độ dự án

**Không có PR hay commit mới.**

Xu hướng: dự án đang bị bỏ rơi. Cert hết hạn 10 ngày, issue được tag `[stale]` sau 1 tuần không ai đụng. Repo có vẻ không active.

## 💬 Điểm nổi bật cộng đồng

**Issue #3377** - cert TLS hết hạn:
- 1 comment, 1 👍
- Tag: `[CRITICAL]` `[stale]`
- Tác động: toàn bộ traffic HTTPS bị chặn, site không truy cập được
- Response từ maintainer: **KHÔNG CÓ**

Community reaction thấp (1 upvote) nhưng severity cao. Có thể project đã chết hoặc user base nhỏ.

## 🐛 Ổn định & Bugs

**Critical infrastructure failure:**
- Domain: picoclaw.io
- Cert hết hạn: 2026-09-10 23:59:59 UTC
- Thời gian downtime: **10 ngày**
- Root cause: không renew cert (Let's Encrypt thường 90 ngày, auto-renew fail hoặc không setup)
- Fix: renew cert qua DNS/HTTP challenge, deploy mới

Không có maintainer response = không có timeline fix.

## ✨ Yêu cầu tính năng

Không có.

## 👥 Phản hồi người dùng

User @dimonb báo bug infrastructure, không có feedback từ team. Không thấy discussion khác về tính năng hay experience.

Vắng bóng user khác = community nhỏ hoặc đã rời bỏ.

## 🗺️ Backlog & Roadmap

Không có thông tin. Issue tracker chỉ có 1 critical bug chưa fix.

---

**Kết luận:** Dự án trong trạng thái abandoned. Cert hết hạn 10 ngày không ai fix = không có ops hay maintainer active. Không có development activity. Nếu đây là infra quan trọng, user nên tìm alternative hoặc fork.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-09-20

## 1. Tóm tắt hôm nay

Không có release. 4 PR mở, tập trung vào stability (fix timeout bug), observability (health check CLI), security (mount bypass), và tích hợp provider mới (pi agent). Không có issue mới hay đóng.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### PR đang mở

**🔧 Stability & Core**

- **#3646** (mở từ 2026-08-29, update 2026-09-19): Fix sweep killing slow local-model turns
  - Bug: hardcoded 30-min timeout, heartbeat chỉ tick khi provider stream event → backend chậm hơn hosted inference bị kill nhầm
  - Fix: idle timeout configurable, áp dụng cho cả 2 kill path
  - Labels: `kind/bug`, `core-team`, `area/agent-runner`, `area/configuration`, `area/security`

**🔐 Security**

- **#3680** (mở từ 2026-08-30, update 2026-09-19): Close allowlisted-extra mount bypass
  - Fix security hole trong `validateSpec` 
  - Labels: `PR: Fix`, `area/containers`, `area/credentials`, `area/security`

**📊 Observability**

- **#3856** (mở 2026-09-19): CLI `ncl health` command
  - Zero-dependency health check
  - Đọc local state trực tiếp (central DB read-only, error log)
  - Hoạt động ngay cả khi main host process down
  - Giải quyết #2504
  - Label: `area/ncl-cli`

**🤖 Provider Extension**

- **#3857** (mở 2026-09-19): Add Pi agent provider
  - Tích hợp [pi](https://github.com/badlogic/pi-mono) - Pi Coding Agent
  - Chạy in-process SDK, không cần manage serve process lifecycle (khác opencode provider)
  - Liên quan #80, #1163
  - Labels: `area/agent-runner`, `area/providers`, `area/skills`

### Xu hướng

- **Security hardening**: 2/4 PR có security label
- **Operational reliability**: health check + timeout fix → tăng observability và stability
- **Ecosystem growth**: thêm provider mới (pi) → mở rộng khả năng agent

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có nhiều reaction (tất cả 👍: 0). Activity chủ yếu từ core team (@glifocat, @Z-Mackintosh, @prathish-ks).

## 5. Ổn định & Bugs

**Đang fix:**

- **Sweep timeout killing working turns** (#3646): critical cho local-model users, đang pending từ 2026-08-29
- **Mount security bypass** (#3680): security vulnerability, đang pending từ 2026-08-30

**Đặc điểm:**

- Cả 2 bug đều pending >20 ngày → có thể review bottleneck
- Bug #3646 ảnh hưởng UX cho local-model users (false positive kills)

## 6. Yêu cầu tính năng

**Mới:**

- **Health check CLI** (#3856): đáp ứng #2504 - monitoring và debugging needs
  - Cho phép check health khi main process fail
  - Quan trọng cho production deployments

**Mở rộng:**

- **Pi provider** (#3857): alternative agent backend, cho phép chọn tool phù hợp workload

## 7. Phản hồi người dùng

Không có comment mới trên các PR. Activity chủ yếu từ contributors, chưa thấy feedback từ end users trong dataset này.

## 8. Backlog & Roadmap

**Inferred priorities từ PR labels:**

1. **Security**: 2 PR security-related → high priority
2. **Observability**: health check → improving ops experience
3. **Agent ecosystem**: pi provider → expanding options

**Blocked/Pending:**

- 2 PR security/stability đã mở >20 ngày chưa merge → có thể cần attention
- Không có thông tin roadmap công khai trong dataset

**Recommendation:**

- Prioritize merge #3680 (security) và #3646 (UX bug) trước
- Health check (#3856) support production adoption
- Pi provider (#3857) mở rộng use cases

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-09-20

## 1. 📊 Tóm tắt hôm nay

Hoạt động nhẹ. Chỉ có 1 PR đang mở từ tháng 8, cập nhật ngày 19/9. Không có issue mới, không có release. Dự án vào giai đoạn yên tĩnh hoặc tập trung vào công việc nội bộ.

## 2. 🚀 Releases

Không có release trong 24 giờ qua.

## 3. 📈 Tiến độ dự án

**PR #7499 - feat(identyclaw): host-mediated Passport**
- Trạng thái: OPEN từ 2026-08-11 (39 ngày)
- Tác giả: @discernible-io (contributor mới)
- Quy mô: XL, rủi ro thấp
- Phạm vi: docs + dependencies

**Nội dung kỹ thuật:**
- Thêm seam layer `builtin.idcp` cho agents không có process
- Cho phép IronClaw agents gọi IdentyClaw Passport mà không cần shell hay extension
- Ship practitioner host kit dưới `deploy/identyclaw/` (Node CLI + loopback helper port 3921)

**Xu hướng:**
- Tích hợp với IdentyClaw - hệ thống quản lý danh tính
- Giảm dependency runtime (không cần shell/extension)
- Hướng tới kiến trúc agent nhẹ hơn

**Vấn đề đáng chú ý:**
- PR mở 39 ngày chưa merge - có thể đang review kỹ hoặc thiếu maintainer bandwidth
- Không có comment nào - thiếu feedback từ core team
- Contributor mới nhưng PR phức tạp (XL size)

## 4. 💬 Điểm nổi bật cộng đồng

Không có tương tác cộng đồng đáng kể. PR #7499 có 0 reactions, 0 comments.

**Dấu hiệu:**
- Cộng đồng nhỏ hoặc inactive
- Core team bận với công việc khác
- Hoặc dự án ở giai đoạn internal development

## 5. 🐛 Ổn định & Bugs

Không có bug report hoặc fix trong 24 giờ qua.

## 6. ✨ Yêu cầu tính năng

Không có feature request mới. PR #7499 là tính năng host-mediated identity authentication cho agents.

## 7. 👥 Phản hồi người dùng

Không có phản hồi từ người dùng trong khoảng thời gian này.

## 8. 🗺️ Backlog & Roadmap

**Inferred từ PR #7499:**
- Đang xây dựng tích hợp IdentyClaw cho agent authentication
- Hướng tới kiến trúc processless agents
- Quan tâm đến security (Passport, policy grants)

**Vấn đề cần theo dõi:**
- PR #7499 cần review và decision - đã pending quá lâu
- Thiếu communication giữa contributors và maintainers
- Không có activity indicators về roadmap công khai

---

**Kết luận**: Ngày yên tĩnh. Dự án có thể đang trong sprint nội bộ hoặc chờ quyết định về architecture direction (đặc biệt PR identity integration). Cần theo dõi xem PR #7499 được merge hay close trong tuần tới để hiểu hướng đi của dự án.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-09-20

## 1. Tóm tắt hôm nay

Ngày sửa lỗi UI/UX và khả năng chịu lỗi backend. 6 PR sửa render crash trong Console, retry logic cho file/audio bị reject, thiết kế lại PawApp control plane. 9 issue mới: 3 lỗi browser-side rendering, 2 lỗi DeepSeek/OpenCode API format, 2 yêu cầu tính năng (governance hook, MCP auth), 1 khiếu nại lịch sử chat ngắn, 1 bug UI working directory panel.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**PR chính (6):**

- **#7889** – Console recover khỏi DOM mutation error (fix #7888). `ChunkErrorBoundary` giờ reset khi throw là transient, không đợi navigation.
- **#7885 + #7887** – Backend retry khi provider reject `input_audio` hoặc nested file payload với 400/403. Thêm classifier nhận unknown error variant, skip global capability cache.
- **#7886** – Duplicate của #7887, cùng fix audio rejection.
- **#7874** – Redesign PawApp SDK: control plane mới cho boundary, idempotent dispatch, durable task, config validation. Breaking change.
- **#7880** – (first-time contributor) Thêm plugin hook cho tool policy check trước governance pipeline. Địa chỉ #7878.

**Xu hướng:** Focus vào khả năng phục hồi (retry, fallback, error boundary reset). PawApp redesign là thay đổi kiến trúc lớn.

## 4. Điểm nổi bật cộng đồng

- **#7884** (2 bình luận, +0 👍) – Người dùng phàn nàn lịch sử chat quá ngắn, trải nghiệm kém. Câu hỏi đơn giản nhưng chưa được trả lời thỏa đáng.
- **#7877** (+1 👍) – Bug working directory panel: chỉ hiện 3 dòng, "Gần đây" trống, nút "Áp dụng" luôn disabled sau khi chọn folder. UX regression.
- **#7815** (5 bình luận) – Console không recover sau lazy chunk load fail, phải reload toàn trang. Đã có PR #7889 fix.

Không có issue nào viral (max 1 👍), nhưng #7815, #7877, #7884 phản ánh pain point UX rõ ràng.

## 5. Ổn định & Bugs

**Console (3 issue):**

- **#7815** → #7889: lazy page chunk fail → permanent error screen. Fix: reset boundary khi transient throw.
- **#7888**: React `commitPlacement` crash do browser UI inject `<font>` wrapper vào text node React quản lý. Edge on Win10. Cùng root cause #7815.
- **#7877**: Working dir panel UI hỏng (scroll area 3 dòng, recent list trống, Apply button không enable).

**Backend (2 issue):**

- **#7883**: DeepSeek từ chối nested file part (400 "must have file_id or file_data"). #7597 đóng sớm, fix không đầy đủ. → #7885 fix.
- **#7882**: OpenCode "free" model trả 403 FreeTierError khi call API (chỉ cho client), nhưng UI vẫn hiện badge "miễn phí". Data inconsistency.

**Kimi toolCall (#7881):** ACP runner bypass boundary check không đều – Edit bị chặn, Write (file mới) & Bash blind. Chưa có PR.

## 6. Yêu cầu tính năng

- **#7878** → #7880: Expose plugin pre-tool-call hook cho governance pipeline. Cho phép plugin doanh nghiệp can thiệp decision oracle trước khi tool chạy.
- **#7879**: MCP config UI trigger OAuth flow thất bại khi server dùng static Bearer key (như QCC). UI không có input field cho API key trực tiếp, chỉ có nút "Authorize" → OAuth.

## 7. Phản hồi người dùng

- **#7884**: "聊天记录历史太短，体验太差" – Không thấy tin nhắn cũ khi scroll lên. Khiếu nại về giới hạn context hoặc UI pagination.
- **#7888**: Người dùng TerebiSAMA gặp crash khi mở Chat route trên Edge/Win10. Tự tạo PR #7889 fix.
- **#7877**: Contributor chcsyf báo working dir panel UX regression chi tiết (chiều cao, state, label). +1 👍 từ người khác confirm.

Tone chung: frustration với lỗi UI ngăn workflow (không recover, không scroll, không config), và format incompatibility với provider bên thứ 3.

## 8. Backlog & Roadmap

Không có roadmap công khai trong data. Suy từ PR:

- **Ưu tiên gần:** Merge #7889, #7885, #7887 (regression fix). Review #7874 (PawApp redesign) – breaking change, cần migration plan.
- **Chưa handle:** #7881 (kimi boundary bypass), #7882 (OpenCode free tier mismatch), #7879 (MCP static auth), #7877 (working dir UI), #7884 (chat history limit).

Nếu #7874 merge, PawApp users sẽ cần rewrite integration code. Cần changelog và migration guide.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*