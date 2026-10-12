# Bản tin Hệ sinh thái Hermes Agent 2026-10-12

> Issues: 131 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-12 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-12

## 📊 Tóm tắt hôm nay

Ngày làm việc cao điểm với **30 PR mới** và **50 issue được cập nhật**. Tập trung chính: sửa lỗi security boundary (redaction, approval bypass), cải thiện cron/auth stability, và plugin catalog expansion. Không có release.

## 🚀 Releases

Không có release trong 24h qua.

## 📈 Tiến độ dự án

### PR nổi bật (mở hôm nay)

**Security Critical:**
- #136884: Path-prefixed commands bypass hardline floor (`/sbin/reboot` qua được unconditional block)
- #136875: Private key redaction vẫn leak khi `head`/`tail` partial print
- #129166 + #129169: Secret-source values không được register cho redaction

**Stability Fixes:**
- #136862: `hermes cron` crash khi `jobs.json` corrupt
- #136859: `auth add` crash/hang với exhausted stdin
- #127214: Update chỉ refresh dashboard của invoking profile, bỏ sót các profile khác

**Performance:**
- #136887: Bot capability rebuild xóa session context của turn đang chạy
- #136879: Response completion tokens không được ghi vào `messages.token_count`

**Feature:**
- #136857: Plugin catalog thêm **Operations** (fleet monitoring dashboard)
- #136855: Plugin catalog thêm **Waypoint** (session status bar cho Desktop)
- #136874: Plugin catalog thêm **HeartBeat 2.0**

### Xu hướng

- **Security hardening wave**: 4 PR về redaction/approval trong 2 ngày
- **Plugin ecosystem growth**: 3 catalog entry mới
- **Cron/auth reliability**: Nhiều fix cho corrupted state/exhausted input
- **Desktop UX polish**: RTL layout, noise suppression, missing features

## 🔥 Điểm nổi bật cộng đồng

### Issues nhiều tương tác

**#11911** (11💬, 12👍): Request native mobile app với voice calling  
→ Top feature request, nhưng P3/needs-decision

**#4431** (2💬, 10👍): Per-topic/chat config overrides cho gateway  
→ Use case: Telegram groups khác nhau cần personality/prompt riêng

**#9645** (4💬, 8👍): Optional proactive check-ins  
→ Grok-style bot tự follow-up, off by default

### Pain cluster (#132817 - 13 reports tuần này)

Một 429/entitlement cooldown bench credential **hàng ngày**, không có:
- Reset-time probe
- Visibility trong UI
- Pointer đến `hermes auth reset`

→ P2, sweeper:risk-security-boundary, nhiều user bị impact

## 🐛 Ổn định & Bugs

### Critical (P0-P1)

**#134173** (P0): Scratch prune xóa file đang được ghi  
→ Race condition: prune snapshot trước khi write land, file mới bị xóa  
→ PR đang mở: candidate list + re-validate trước delete

**#133856** (P1): Anthropic keys `sk-ant-usr-*` misclassified as OAuth  
→ Pay-per-token key bị treat như Claude Code identity  
→ 6👍, user bối rối về billing

### High-frequency bugs

**#107402** (21💬): `hermes update` để lại permanent warning khi gateway restart bị defer  
→ Verify fleet immediately, ghi `state: stale`, kết thúc `partial`

**#131055** (13💬): Linux Desktop second-instance launch poison sandbox fallback → sticky `--no-sandbox` → renderer SIGILL loop

**#121095** (11💬): `browser_exec` để lại stale `browser_harness.daemon` processes  
→ Không có inactivity timeout, tồn tại vô thời hạn

## 💡 Yêu cầu tính năng

### Được community ủng hộ

1. **Native mobile app** (#11911, 12👍): iOS/Android với voice calling
2. **Per-chat config** (#4431, 10👍): Topic-level personality/system prompt overrides
3. **Proactive check-ins** (#9645, 8👍): Optional bot follow-up, budget-aware
4. **Session branching from message** (#32105, 4👍): Fork từ specific turn, không chỉ current state

### Từ pain points

- **Memory consolidation opt-in** (#106919): Autonomous consolidation khi memory gần đầy, keep approval gate default
- **Desktop MCP/skill reload UI** (#58414): Hiện phải dùng hidden slash commands
- **Projects in Desktop** (#105511): First-class UI parity với CLI `hermes project`

## 👥 Phản hồi người dùng

### Positive signals

- Plugin catalog đang grow (3 new entries hôm nay)
- Desktop feature parity được request nhiều (Projects, reload controls)
- A2A/delegation được quan tâm (scoped trust policy discussion #56434)

### Pain points

**Auth/credentials:**
- Transient 429 bench credential hàng ngày (#132817 - 13 reports)
- Anthropic key prefix confusion (#133856)
- `auth add` crash với exhausted stdin (#136736)

**Session/state:**
- Model switch drop memory context (#121836)
- Desktop session load chậm, cancel on navigate (#70445)
- Search hit return hidden/rewound messages (#120600)

**Gateway:**
- Telegram topic opening message misroute (#136567)
- Discord typing indicator stuck bugs (#85427)
- Slack peer bot ID confusion (#85614)

## 📋 Backlog & Roadmap

### In progress (từ PR activity)

- **Security boundary tightening**: Approval bypass fixes, redaction completeness
- **Cron reliability**: Corrupted state handling, respawn guard improvements
- **Desktop polish**: RTL support, noise suppression, missing platform features
- **Plugin ecosystem**: Catalog expansion, MCP server stability

### Needs decision (tagged issues)

- Memory consolidation opt-in strategy (#106919)
- Per-chat config contract (#4431)
- Proactive follow-up safety (#125448)
- A2A trusted-peer policy (#56434)
- ChatGPT OAuth provider merge (#128926 - PR open)

### Long tail (P3 với community interest)

- Mobile app (#11911)
- Desktop Projects UI (#105511)
- Session branching from message (#32105)
- SPA clicking robustness (#37244)

---

**Tình trạng tổng thể**: Healthy development velocity, security-focused sprint. Desktop và gateway đang được polish. Plugin ecosystem growing. Credential/auth pain cluster cần priority attention (13 reports tuần này).

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-12

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent năm 2026 phân hóa rõ 3 tầng:

**Tier 1 - Production-grade platforms** (Hermes Agent, OpenClaw): Heavy activity (500+ PRs), security-first, enterprise features (auth, gateway, cron), active hardening sprints.

**Tier 2 - Specialized forks** (NanoBot, Zeroclaw, QwenPaw): 18-50 PRs, focused domains (WebUI, plugins, multi-agent), community-driven features.

**Tier 3 - Early/niche** (PicoClaw, NanoClaw, NullClaw, IronClaw): <12 PRs, foundational bugs being fixed, minimal community traction.

Overall velocity: **1,089 PRs** across 9 projects trong 24h. Chủ đề chiến lược: **security boundaries, memory management, plugin ecosystems, multi-platform**.

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Tương tác cộng đồng | Mức độ polish |
|-------|--------|-----|----------|---------------------|---------------|
| **Hermes Agent** | 131 | 500 | 0 | 🔥🔥🔥 (11💬/12👍 top issue) | Production |
| **OpenClaw** | 77 | 500 | 1 beta | 🔥🔥 (38💬 P0 leak) | Production |
| **QwenPaw** | 10 | 21 | 0 | 🔥 (3💬/issue) | Stabilizing |
| **Zeroclaw** | 10 | 50 | 0 | 🔥 (30+ comments PR) | Maturing |
| **NanoBot** | 1 | 18 | 0 | ❄️ (zero engagement) | Polish phase |
| **NanoClaw** | 2 | 12 | 0 | ❄️ (zero) | Cleanup |
| **NullClaw** | 2 | 1 | 0 | ❄️ (zero) | Early |
| **PicoClaw** | 2 | 2 | 0 | ❄️ (zero) | Early |
| **IronClaw** | 0 | 7 | 0 | ❄️ (zero) | Maintenance mode |

**Key metrics:**
- **Activity**: Hermes + OpenClaw dominance (1000/1089 PRs = 92%)
- **Community**: Hermes >> OpenClaw > QwenPaw > others (zero)
- **Releases**: Chỉ OpenClaw ship beta (Hermes prep release)

---

## 3. 🎯 Vị thế Hermes Agent

### Strengths

**Market leader:**
- Highest community engagement (11💬 top request, 13👍 multiple issues)
- Enterprise features: auth profiles, gateway integrations (Telegram/Discord/Slack), cron, approval flows
- Security-first: 4 PRs security boundary trong 2 ngày
- Plugin ecosystem growing (3 new catalog entries hôm nay)

**Technical maturity:**
- Desktop + CLI parity efforts (#105511 Projects UI)
- Multi-platform (Windows RTL, Linux Desktop)
- Agent-to-agent delegation discussions (#56434)

**Pain cluster visibility:**
- 429/credential cooldown bench (#132817) - 13 reports, P2
- Memory leak vs OpenClaw (#91588 OpenClaw - 38💬, 4 months)

### Weaknesses vs competitors

**Release cadence:** Zero releases hôm nay (OpenClaw ship beta)

**Memory management:** Không có PR memory fix (vs OpenClaw's RSS leak focus, NullClaw's history compaction)

**Mobile:** Request native app (#11911, 12👍) chưa address (QwenPaw ship HarmonyOS native #8164)

**Per-chat config:** #4431 (10👍) needs decision (NanoBot đã merge per-preset overrides #6159)

### Strategic position

Hermes = **enterprise platform play**. Focus: reliability, security, gateway integrations, desktop parity. Trade-off: slower feature velocity vs specialized forks.

OpenClaw = **direct competitor** (production-grade, similar scope). Edge: faster release cycle.

QwenPaw/NanoBot = **feature innovators** (HarmonyOS native, AgentMail tool). Hermes adopts proven patterns later.

---

## 4. 🔧 Hướng kỹ thuật chung

### Security hardening (universal)

**Hermes:**
- Path-prefixed command bypass (#136884)
- Secret redaction leaks (#136875, #129166)
- Approval bypass fixes

**OpenClaw:**
- Node pairing changed fail (#169486)
- Subagent tool restrictions (#6112 NanoBot)

**Pattern:** Attack surface từ command injection, secret leakage, delegate privilege escalation.

### Memory/context management (critical path)

**OpenClaw:** Native memory leak RSS +1GB/30s (#155191 P0)

**NullClaw:** Session history unbounded growth → auto-compaction không persist (#1053-1055)

**Hermes:** Bot capability rebuild drop session context (#136887)

**Pattern:** Long-lived sessions expose design flaws. Compaction strategies incomplete (RAM fix, store không sync).

### Plugin/skill ecosystems (growth vector)

**Hermes:** Plugin catalog expansion (Operations, Waypoint, HeartBeat 2.0)

**Zeroclaw:** Plugin update CLI (#11262), WASM host (#11347), channel binding (#11302)

**QwenPaw:** Plugin market version filtering (#5661), nested skill directories (#8178)

**NanoClaw:** AgentMail tool/channel (#4075, #3743)

**Pattern:** Move từ monolithic → extensible. Version isolation, discovery, lifecycle management.

### Gateway/channel maturity (multi-platform play)

**Hermes:** Telegram, Discord, Slack fixes (typing indicator #85427, topic routing #136567)

**PicoClaw:** Telegram long-poll timeout (#3424 critical)

**NanoBot:** Slack DM routing (#4072), permission decline (#4070)

**QwenPaw:** Console basename config (#8177), session change notification (#8181)

**Pattern:** Gateway = deployment blocker. Edge cases (timeouts, routing, state sync) cần hardening.

### Desktop/mobile parity (user demand)

**Hermes:** Projects UI (#105511), MCP reload hidden (#58414), RTL layout

**OpenClaw:** UI port sang Solid 2 (5+ PRs), native overlays/tabs (#169128)

**QwenPaw:** HarmonyOS native client (#8164 ArkUI, không WebView)

**NanoBot:** Mobile dropdown UX (#6153)

**Pattern:** Desktop = second-class citizen. Catch-up wave 2026. Mobile = greenfield (QwenPaw lead).

---

## 5. 🎭 Điểm khác biệt

### Chiến lược phát triển

| Aspect | Hermes Agent | OpenClaw | QwenPaw | Specialized forks |
|--------|-------------|----------|---------|-------------------|
| **Scope** | Enterprise platform | Enterprise platform | Feature velocity | Niche domains |
| **Release** | Cautious (0 hôm nay) | Aggressive (beta.1+2) | Experimental | Ad-hoc |
| **Community** | Cultivated (top requests) | Technical (P0 leak 38💬) | Growing (3💬/issue) | Ghost town |
| **Priorities** | Security > features | Stability > perf | Features > polish | Survival |

### Tính năng đặc trưng

**Hermes uniqueness:**
- Agent-to-agent delegation policy (#56434 discussion)
- Gateway topic-level config (#4431 - chưa ship)
- Proactive check-ins (#9645 - needs decision)

**OpenClaw edges:**
- Faster update recovery (stale leases, Windows elevation)
- UI Solid 2 migration (future-proof)

**QwenPaw innovations:**
- HarmonyOS native (no hybrid framework)
- Thinking controls (Aliyun Token Plan #7990)
- Reduced effects tier (low-end GPU #8137)

**NanoBot differentiators:**
- AgentMail channel (email identity cho agents)
- Per-preset request overrides (#6159 shipped)

### Cộng đồng & ecosystem

**Hermes:** Feature requests community-driven (#11911 mobile 12👍, #4431 per-chat 10👍). Maintainers responsive (needs-decision tags).

**OpenClaw:** Technical user base (detailed reproduction #97616 zombie processes 18💬). Pain-focused (memory leak 4 months P0).

**QwenPaw:** Hybrid (user reports + maintainer discovery). Quick triage (issues mở/đóng same day).

**Others:** Zero community engagement → team-only development or dead projects.

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Tier 1: Thriving (Hermes)

**Signals:**
- Top issue 11💬/12👍
- Multiple pain clusters với 10+ reports (#132817 credential bench)
- Feature discussions (proactive follow-up safety #125448)
- Plugin contributions (3 catalog entries hôm nay)

**Health:** Self-sustaining. Users report, debate, contribute plugins.

### Tier 2: Growing (OpenClaw, QwenPaw)

**OpenClaw:**
- P0 leak 38 comments nhưng no fix PR → user frustration visible
- Technical discussions (startup regression #168955)
- Release feedback loop (beta cycle)

**QwenPaw:**
- 3💬 trung bình per issue
- Detailed bug reports (#8172 silent completion)
- Feature PRs từ maintainers, not users

**Health:** Core users active. Chưa critical mass cho organic contributions.

### Tier 3: Early/Dead (NanoBot, NanoClaw, NullClaw, PicoClaw, IronClaw)

**Signals:**
- Zero comments, zero reactions
- Issues/PRs từ single maintainer (@sstpnk PicoClaw, @vernonstinebaker NullClaw)
- No discussion, no feature requests

**NanoBot exception:** 18 PRs nhưng zero engagement → private team development hoặc abandoned.

**Health:** Pre-community. No users hoặc users không vocal.

---

## 7. 🔮 Tín hiệu xu hướng

### 1. Security boundary crisis (universal)

**Evidence:**
- Hermes: 4 PRs trong 2 ngày (redaction, approval bypass, command injection)
- OpenClaw: Pairing validation (#169486)
- NanoBot: Subagent tool bypass (#6112)

**Implication:** Attack surface từ delegation, tool calls, credential leakage. AI agents = new privilege escalation vector. Expect dedicated security sprints Q1 2027.

### 2. Memory management reckoning

**Evidence:**
- OpenClaw P0 leak 4 months (#91588)
- NullClaw unbounded history (#1053)
- Hermes context drop (#136887)

**Implication:** Long-lived agent sessions expose design flaws. Current architectures = short-session assumptions. Compaction, streaming, bounded storage cần re-architecture.

**Winner:** Project fix memory first → production credibility.

### 3. Plugin ecosystem land grab

**Evidence:**
- Hermes catalog growing (Operations, Waypoint, HeartBeat)
- Zeroclaw plugin CLI + WASM host (#11262, #11347)
- QwenPaw version filtering (#5661)
- NanoClaw AgentMail (#4075)

**Implication:** Extensibility = moat. Platform với rich plugin ecosystem → lock-in. Expect marketplace, revenue share models 2027.

**Winner:** Hermes lead (catalog size), Zeroclaw innovation (WASM isolation).

### 4. Mobile-first vs desktop-parity split

**Evidence:**
- QwenPaw HarmonyOS native (#8164) - no hybrid wrapper
- Hermes mobile request (#11911, 12👍) - not prioritized
- Desktop parity PRs (Projects UI, reload controls)

**Implication:** Hermes bet desktop parity before mobile. QwenPaw leap to native mobile. Chinese market (HarmonyOS) driving mobile-first.

**Winner:** Geography-dependent. China → QwenPaw. West → Hermes desktop.

### 5. Gateway reliability table stakes

**Evidence:**
- Telegram timeout (#3424 PicoClaw critical)
- Slack routing (#4072 NanoClaw)
- Discord typing stuck (#85427 Hermes)

**Implication:** Gateway bugs = production blockers. Multi-channel support không còn differentiator, là baseline. Reliability > feature count.

**Winner:** Boring → wins. Hermes/OpenClaw focus stability.

### 6. Agent-to-agent coordination next frontier

**Evidence:**
- Hermes delegation policy (#56434 discussion)
- Zeroclaw Level 5 Dark Factory (#11664 - agent teams)
- OpenClaw subagent handoff issues (#164241, #159512)

**Implication:** Single-agent ceiling reached. Multi-agent orchestration, trust models, credential delegation = 2027 focus.

**Winner:** Whoever ship working multi-agent first. Hermes discussing, Zeroclaw building, OpenClaw fixing bugs.

### 7. Performance regression pain (especially OpenClaw)

**Evidence:**
- Startup 2026.10.1: 1030s vs 410s (#168955)
- Inference overhead ~10s/call (#88201)
- SQLite long jobs block (#169448)

**Implication:** Feature velocity → performance debt. Users notice 2.5x slower. Regression testing inadequate.

**Lesson:** Ship fast → pay later. OpenClaw aggressive release → stability tax.

---

## 🎯 Kết luận chiến lược

### Hermes Agent positioning

**Current state:** Market leader, enterprise focus, security-first, plugin ecosystem growing.

**Threats:**
1. OpenClaw release velocity (beta cycle faster)
2. Memory leak cluster → reputation risk nếu không fix
3. Mobile gap (QwenPaw HarmonyOS native)
4. Performance regression risk (learn từ OpenClaw)

**Opportunities:**
1. Plugin marketplace (monetization)
2. Agent-to-agent coordination (ship trước Zeroclaw)
3. Mobile native (iOS/Android after HarmonyOS validates market)
4. Enterprise security hardening (current strength → moat)

**Recommendations:**
1. **Ship release** (zero releases hôm nay vs OpenClaw beta)
2. **Fix credential bench cluster** (#132817 - 13 reports, P2 → P1)
3. **Memory audit** (prevent OpenClaw-style leak)
4. **Mobile decision** (#11911 - 12👍, needs roadmap)
5. **Per-chat config** (#4431 - 10👍, proven demand)

### Ecosystem trajectory

2026 Q4: **Stabilization phase**. Security hardening, memory fixes, gateway polish.

2027 Q1: **Differentiation phase**. Plugin ecosystems mature, multi-agent coordination ships, mobile-first vs desktop-parity splits finalize.

**Consolidation risk:** Tier 3 projects (PicoClaw, NullClaw, IronClaw) → abandoned or absorbed. Tier 2 (NanoBot, NanoClaw) → merge upstream or niche survival.

**Winner-take-most:** Hermes vs OpenClaw → enterprise market. QwenPaw → China mobile. Zeroclaw → multi-agent specialists.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw ngày 2026-10-12

## 1. Tóm tắt hôm nay

Hôm nay có 2 closed issues, 30+ PRs mới. Focus: fix update failures, SQLite performance, UI port sang Solid 2. Beta 2026.10.5-beta.2 sắp ra với fix doctor rehearsal. Memory leak #91588 vẫn P0, 38 comments chưa giải quyết.

## 2. Releases

### v2026.10.5-beta.1 (2026-10-11)

**Highlights:**
- **Updates an toàn hơn**: Recovery từ stale leases, thay đổi evidence, Windows elevation, interrupted activations (#164636, #165257, #166548, #166695)
- **Conversations bền restart**: Turn bị ngắt + first-message redo giờ restore đúng
- Stability: update recovery blocked by hard-linked activation DB vẫn chưa fix trong beta này

## 3. Tiến độ dự án

### PRs nổi bật:

**🔥 Shipped/sắp ship:**
- #169516 [XS, P1] Fix doctor update rehearsal fail khi không có agents configured - block beta.2 release
- #169265 [merged] Fix Codex Ultrafast drop về Fast sau turn đầu với ChatGPT auth
- #169293 Close out 2026.10.1 stable trên main branch

**🚧 In progress (high priority):**
- #168563 [M, P2] Fix terminal "no explicit owner" error trong multi-agent fleets
- #169486 [M, P1] Fix node requests fail "pairing changed" sau unrelated pairing activity - security-sensitive
- #169491 [P2] Control UI reject /workspace/... file links từ sandboxed agents

**♻️ Refactors lớn (UI → Solid 2):**
- #169442 [XL, P2] Port chat rails + header views sang Solid
- #169128 [XL, P2] Native Solid overlays và tabs (thay Web Awesome)
- #169046 [XL, P2] Config pages + forms sang Solid 2
- #168612 [XL, P2] App shell + retained routes sang Solid

**⚡ Performance:**
- #169523 [L] Reuse transcript admission/projection facts
- #169524 [S] Stop polling expired plugin state khi idle
- #169519 [M] Yield giữa plugin registrations để HTTP không block
- #169365 [L] Cache direct-entry module compilation

## 4. Điểm nổi bật cộng đồng

### Top engaged issues:

**#91588 [38 comments, P0] 🔴 Gateway Memory Leak**
- RSS tăng 350MB → 15.5GB trong 2-3 ngày → OOM kill
- Impact: crash-loop, production stability
- Status: clawsweeper:no-new-fix-pr, needs maintainer review
- **CRITICAL** - 4+ months không giải quyết

**#97616 [18 comments, P1] Zombie child processes**
- Hook/tool children không reap → zombie accumulation
- Runtime degradation theo thời gian
- Cần live reproduction

**#145309 [12 comments, P1] claude-cli ignore CLAUDE_CONFIG_DIR**
- Backend hardcode ~/.claude thay vì respect config
- Missing transcript → session reset
- PR #145310 đã mở nhưng chưa merge

## 5. Ổn định & Bugs

### P0 Issues cần attention ngay:

**Update failures:**
- #164113 [closed] FICLONE EPERM trong LXC container - fixed
- #168691 [closed] Update failure 2026.9.3 - resolved
- #167343 [closed] Gateway recovery verification fail - resolved
- #169463 [NEW, P0] **Update recovery blocked**: activation DB hard-linked vào retained updater runtime

**Performance regressions:**
- #168955 [P1] Startup 2026.10.1: ~1030s vs ~410s trên 2026.9.9 (Windows) - sidecars.control-ui-assets block 477s
- #155191 [P0] Native memory leak: RSS +1GB/30s, V8 heap stable
- #166020 [P2] 60s re-validating plugin generation source trees mỗi boot

**Session/delivery issues:**
- #126950 [P1] Telegram opaque callbacks (tgcb1:) dropped cho non-plugin callers
- #159512 [P1] claude-cli: subagent completion invalidate requester CLI session 2 lần (reason=mcp)
- #130249 [P2] Async exec completions land sai session

### Stability improvements đang test:

- #169414 Promote shared-state JSON query fields (avoid JSON-in-SQL)
- #167259 Fix emoji split tại UTF-16 display caps
- #168460 Reject malformed UTF-8 trước khi rewrite shell profiles

## 6. Yêu cầu tính năng

**UI/UX:**
- #111143 [6 comments] Pin plugin tabs trong Control UI sidebar
- #70266 [5 comments] Use assistant avatar trong macOS Talk Mode overlay
- #153702 [3 comments] Link Provider và Model configuration

**Developer experience:**
- #112077 [2 comments] Delegate setup tới secure human surface (no credentials return to model)
- #169428 [2 comments] Expose auth profile (model.auth_label) trong usage footer template
- #137299 [1 comment] exec children carry agent identity (không encode trong path)

**i18n:**
- #53345 [1 comment] Korean (ko) language support cho Control UI + AI agent

## 7. Phản hồi người dùng

### Pain points thường xuyên:

**Memory/Performance:**
- Memory leak #91588 là số 1 complaint - production stability risk
- Startup regression 2026.10.1 gây frustration (2.5x slower)
- SQLite long jobs block unrelated databases (#169448)

**Session reliability:**
- Transcript admission failures sau plugin reload (#156353)
- Subagent completions không wake requester (#164241)
- Telegram agent repeat completed tasks (#166482)

**Update experience:**
- Update failures nhiều (LXC, Windows elevation, recovery blocking)
- Nhưng đang được address aggressive trong 2026.10.5 cycle

### Positive signals:

- Release 2026.10.1 shipped với safer updates - cộng đồng acknowledge improvement
- Community actively reports với detailed reproduction steps
- Fast triage: nhiều P0 được close trong 1-2 ngày

## 8. Backlog & Roadmap

### Đang thực hiện (inferred từ PRs):

**Q4 2026 priorities:**
1. **UI modernization**: Port toàn bộ Control UI sang Solid 2 (5+ major PRs in flight)
2. **Update reliability**: Fix recovery paths, Windows support, stale lease handling
3. **Performance**: SQLite optimization, startup time, memory usage
4. **Multi-agent**: Fix ownership issues, session routing, subagent handoff

### Technical debt được address:

- Native browser APIs thay dependencies (overlays, tabs)
- Module compilation caching
- Shared-state schema normalization (JSON → columns)
- UTF-8 validation before file writes

### Chưa address (từ issues):

- **#91588 Memory leak** - P0 4+ months, critical
- **#88201** Inference overhead ~10s/call (regression)
- **#48709** Gemini 2.5 Pro session bloat
- Plugin security scanner false positives (#137907)

---

**Tổng quan sức khỏe dự án:** 🟡 CAUTION

✅ Release cadence đều, update safety improving
✅ Active community engagement, detailed bug reports  
✅ Major refactors (UI → Solid 2) đang progress steady
⚠️ P0 memory leak 4+ months chưa fix - production risk
⚠️ Performance regressions chưa resolve (startup, inference)
⚠️ Session reliability issues nhiều (subagent, transcript, delivery)

**Ưu tiên tuần tới:** Resolve #91588 memory leak, ship 2026.10.5-beta.2 với doctor fix, close performance regression investigations.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích NanoBot - 2026-10-12

## 1. Tóm tắt hôm nay

Ngày tập trung vào sửa lỗi và cải thiện UX. 18 PR mới (chủ yếu fix bugs), 1 issue mới phàn nàn Docker onboarding. Không có release. Tập trung vào: sửa lỗi kênh (Telegram, Feishu), WebUI improvements, và bảo mật subagent tools.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR quan trọng:**

- **#6154** - Chuẩn bị prebuilt preview packages cho 5 platforms → Cải thiện DX, user không cần build frontend
- **#6112** - Fix bảo mật: subagent bypass tool restrictions của parent session → Critical security hole
- **#6150** - WSL browser launch support + authenticated startup URL → Better Windows/WSL integration
- **#6159, #6160** - Per-preset request overrides + reuse named connections → Flexibility cho multi-gateway setups

**Xu hướng:**
- Polish phase: Bug fixes áp đảo (14/18 PR có label `fix` hoặc `bug`)
- Tập trung WebUI stability (#6158, #6161, #6162, #6153)
- Channel integrations maturing (Telegram #6149, Feishu #6157)
- Distribution improvements (#6154 prebuilt packages)

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có interaction cao (tất cả 0 comments, 0 reactions). Cộng đồng chưa tham gia feedback.

**Issue mới #6165** - User phàn nàn `docker compose up` không hoạt động out-of-box. Đúng pain point cho onboarding.

## 5. Ổn định & Bugs

**Critical:**
- #6112 - Subagent bypass tool restrictions → P1 security issue
- #6165 - Docker default image broken → Bad first impression

**Medium/Low:**
- #6164 - Git revert không restore absent files đúng cách
- #6163 - Provider retry events không reach channels
- #6149 - Telegram misclassify media có query string (đã merge)
- #6155, #6156 - Reasoning effort `"none"` bị ignore với GLM/MiMo models
- #6143 - `edit_file` không handle over-indented `old_text` đúng
- #6153 - Mobile dropdown đóng ngay sau khi mở
- #6158 - Browser notification failures không actionable
- #6162 - Settings restart tạo empty chat history

## 6. Yêu cầu tính năng

**Merged vào codebase (qua PR):**
- #6159 - Per-preset request overrides cho models
- #6160 - Named connections cho image generation
- #6161 - Web proxy settings đưa vào Web access section
- #4919 - Telegram custom Bot API base URL (đã merge sau 3 tháng)

Không có feature request issues mới.

## 7. Phản hồi người dùng

Chỉ có 1 feedback mới (#6165):
- User expectation: `docker compose up` phải work out-of-box
- Onboarding doc chưa đủ rõ
- First-run experience cần polish

Không có discussion hay comment nào khác. Tương tác cộng đồng rất thấp.

## 8. Backlog & Roadmap

Từ PR pipeline:
- #6154 suggest rollout strategy cho prebuilt releases → Tiến đến stable distribution
- #5817 đề cập update executor (chưa merge)
- #6146 referenced trong #6154 về distribution rollout plan

**Inferred priorities:**
1. Fix Docker onboarding (#6165)
2. Merge security fix #6112
3. Stabilize WebUI mobile experience
4. Complete prebuilt package rollout (#6154)
5. Channel integration refinements

**Technical debt visible:**
- Git operations edge cases (#6164)
- Provider adapter inconsistencies (#6155, #6156)
- Tool restriction inheritance (#6112)

---

**Đánh giá:** Project đang trong stabilization phase. Nhiều bug fixes nhỏ, chưa có tính năng lớn mới. Cộng đồng engagement thấp (no comments/reactions). Docker issue #6165 là wake-up call cho onboarding quality. Security issue #6112 cần priority merge.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw 2026-10-12

## 1. Tóm tắt hôm nay

Ngày yên tĩnh về releases. Hoạt động tập trung vào sửa lỗi UI web, cải thiện plugin system, và tiếp tục stack PR lớn cho persistent memory + runtime architecture. 4 PR merged không có trong diff (đã vào master), 4 issue mới mở.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**Plugin system (v0.8.6 target)**
- #11262: CLI `plugin update` với verify thay thế an toàn - stacked trên 3 PR khác
- #11311: Smoke test cho release artifact, gần merge
- #11347: Ship WASM plugin host trong binary chính thức - stacked trên #11311
- #11302: Channel plugin binding ceremony tại install - gần merge

**Persistent memory (multi-PR rollout)**
- Tracker #8891: 7 item đang mở (4 issue, 3 PR)
- #10407: Session prompt attachments - PR lớn đang review

**Runtime/gateway (v0.8.6–v0.9.0)**
- Tracker #7432: Phase 2 v0.8.6, Phase 3 v0.9.0 gateway separation
- #11221: Default 11 built-in tools với setting đơn giản - gần merge
- #11174: Capability-taking constructors cho turn entry points

**Security hardening**
- #11228: Harden plugin TLS profile materialization
- #10446: Reject tool-call leak vào prose thay vì render

**Cron + conversation binding (RFC #6954)**
- #11438: Conversation binding port (2a/3) - PR nền tảng
- #11441: Bind cron main jobs vào conversation (#6105 fix) - stacked trên #11438

## 4. Điểm nổi bật cộng đồng

**Issue mới đáng chú ý:**
- #11667: Thiết kế policy kế thừa khi delegate sang agent khác
- #11655 (S2): Core conflict supersede ẩn memory không liên quan khi không dùng vector score (default config)
- #11668: Gateway body size limit không config được, cần cho multi-agent relay context lớn
- #11658: Web chat input mất focus sau reply

**PR hot:**
- #10391 (30+ comment implied): Bounded delegate workspace/policy binding fix - lớn, risk high
- #11520: Legacy plugin recovery discoverable sau resume
- #11174: Turn constructor refactor - design PR #11090 đang chờ

## 5. Ổn định & Bugs

**Fixed ngày hôm nay:**
- #11660, #11661: Chat input focus issue - 2 dev cùng fix cách khác nhau
- #11659: Provider nhận snake_case `context_length_exceeded` code
- #11656: Firejail args từ config không apply
- #11650: Telegram retry_after handling, tránh 429 loop

**Đang xử lý:**
- #10755 (risk:high): Preference provenance mất khi consolidation merge
- #11655 (S2): Memory hiding bug với embedding disabled
- #11523: Session turns marked running sau khi process bị kill

**Regression watch:**
- #10499: Config validation PR lớn, đang needs-author-action

## 6. Yêu cầu tính năng

**Infrastructure:**
- #11664: Level 5 Dark Factory - agent teams với orchestration/lifecycle
- #11662: Tách channels ra khỏi core binary

**Windows:**
- #11665: Windows installer thay vì manual setup dài

**Gateway:**
- #11668: Config MAX_BODY_SIZE + error code rõ ràng

**Delegate policy:**
- #11667: Design quyết định policy inheritance cho send_message_to_peer

## 7. Phản hồi người dùng

**Pain points:**
- Windows setup quá phức tạp (issue #11665)
- Multi-agent relay bị chặn bởi body limit cứng (issue #11668)
- Chat UX: mất focus sau reply làm gián đoạn flow (#11658)

**Positive:**
- Plugin system mature, nhiều PR hướng v0.8.6 release
- Security hardening liên tục (TLS, Firejail, delegate policy)

## 8. Backlog & Roadmap

**v0.8.6 (gần):**
- Plugin host trong official binary (#11347)
- Plugin update CLI (#11262)
- Default tool simplification (#11221)
- Turn constructor refactor (#11174)

**v0.9.0:**
- Gateway separation (tracker #7432 Phase 3)

**Persistent memory (ongoing):**
- Tracker #8891: 7 open items
- Session attachments #10407 trong review

**RFC #6954 (cron conversation binding):**
- 2/3 PR stack: #11438 base, #11441 cron fix

**Blocked/needs-author:**
- #11520, #11228, #11174, #10391, #10499, #11302, #11309 - nhiều PR lớn chờ author action

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-12

## 🔍 Tóm tắt hôm nay

Dự án phát hiện 2 bug nghiêm trọng về reliability: Telegram channel bị đơ vĩnh viễn do không có timeout, cron job luôn báo thành công dù thực tế fail. Tác giả @sstpnk mở 2 issue và 2 PR fix trong cùng ngày.

## 📦 Releases

Không có.

## 📊 Tiến độ dự án

**Pull Requests:**

- **#3425** - Fix cron status reporting
  - Gateway nuốt error từ `ExecuteJob`, luôn return `nil`
  - `jobs.json` ghi `lastStatus: ok` dù job fail
  - PR sửa: trả về error thực tế từ handler
  
- **#3424** - Fix Telegram long-poll timeout
  - HTTP client không có timeout, connection treo → channel chết vĩnh viễn
  - PR thêm `ReadTimeout` (71s), `WriteTimeout` (30s), connection timeout (10s)
  - Timeout dài hơn poll duration (60s) để không cắt request hợp lệ

**Xu hướng:** Tập trung sửa infrastructure bugs, cải thiện reliability của gateway.

## ⚡ Điểm nổi bật cộng đồng

Không có tương tác (0 comment, 0 reaction trên cả 4 item). Cả issue và PR đều mới mở trong 24h qua, chưa có review.

## 🐛 Ổn định & Bugs

**#3422 - Telegram channel freeze:**
- **Nguyên nhân:** Long-poll `getUpdates` dùng HTTP client zero-timeout
- **Hậu quả:** Connection treo → channel không nhận message mãi mãi, gateway trông vẫn healthy
- **Kịch bản trigger:** SOCKS proxy/tunnel freeze, network hiccup
- **Mức độ:** Critical - service outage không tự phục hồi

**#3423 - Cron false positive:**
- **Nguyên nhân:** Gateway handler `return result, nil` → error bị nuốt
- **Hậu quả:** Job fail nhưng `lastStatus` vẫn `ok`, không có alert
- **Mức độ:** High - silent failure, metrics sai

Cả 2 bug đều là lỗi thiết kế từ đầu (không phải regression), ảnh hưởng production monitoring.

## 💡 Yêu cầu tính năng

Không có.

## 💬 Phản hồi người dùng

Không có feedback từ user khác. Tác giả @sstpnk tự phát hiện, tự report, tự fix.

## 🗺️ Backlog & Roadmap

Không có thông tin về roadmap. Hoạt động hiện tại thuần reactive bug fix.

---

**Đánh giá:** Dự án đang trong phase ổn định hóa sau deployment. 2 bug critical cho thấy gateway production chưa qua stress test kỹ. Thiếu engagement cộng đồng (zero interaction) - có thể dự án còn nhỏ hoặc team nhỏ tự maintain.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-12

## 📊 Tóm tắt hôm nay

NanoClaw hôm nay tập trung cleanup và bugfix cho kênh Slack. Merge 5 PR liên quan permission, bot DM routing, và tích hợp app-message. Không có release mới.

## 🚀 Releases

Không có release.

## 📈 Tiến độ dự án

**PR merged (5 PR):**

- **#4072**: Fix Slack DM qua app - message từ người dùng (có user token) giờ không bị filter ra bởi `bot_id` guard
- **#4070**: Thêm option `fyiText: null` để decline permission mà không spam owner DM
- **#4071**: Bot Slack channel-only giờ trả DM với link tới channel (nếu cùng workspace), từ chối silent nếu ngoài workspace
- #4073: Merge main vào branch `channels`
- #2255, #2237, #3062: PR cũ (tháng 5-7) cuối cùng được merge - fix đường dẫn `/workspace/group` → `/workspace/agent`, interval scheduling `@every:<ms>`, Signal read receipts

**PR mới (3 PR):**

- **#4075**: Thêm skill `/add-agentmail-tool` - CLI `mail` cho agent làm việc với email inbox (search, read, send, reply) + thread ledger
- #4077: [Closed ngay] Rewrite Python examples trong skills thành Node
- #4078: Carry workspace metadata (sender + bot) từ Slack events vào message object

**Xu hướng:**
Channel layer đang được refactor mạnh - Slack adapter nâng cấp routing logic, permission system linh hoạt hơn, chuẩn bị tích hợp email channel.

## ⭐ Điểm nổi bật cộng đồng

Không có PR/issue nào nhận tương tác đáng kể (reaction/comment). Hoạt động chủ yếu từ core team (@amit-shafnir, @billyshipp, @foxey).

## 🐛 Ổn định & Bugs

**Issues mới (2 bug):**

- **#4076**: `/update-nanoclaw` không rebuild image cho group có `packages_apt` - group dùng image cũ sau update
- **#4074**: Test `group-skills.test.ts` hardcode file mode 644, fail với umask 002 - block validate trong `/update-nanoclaw`

Cả hai từ @billyshipp, chưa có fix.

## 💡 Yêu cầu tính năng

- **#4075**: AgentMail tool - cho phép agent làm việc với email từ code, không cần operator config MX
- **#3743** (mở từ 8/9): AgentMail channel adapter - cho agent địa chỉ email riêng

Email integration đang được push mạnh - tool (#4075) + channel adapter (#3743).

## 💬 Phản hồi người dùng

Không có discussion hoặc comment từ người dùng ngoài. Issue #4076, #4074 từ contributor report workflow problem.

## 🗺️ Backlog & Roadmap

Roadmap ngầm từ PR activity:

1. **Email channel** - tool + adapter gần complete
2. **Slack routing** - fix edge cases (app messages, DM từ ngoài workspace)
3. **Container rebuild** - issue #4076 cần fix để `/update-nanoclaw` hoạt động đúng với custom packages

Branch `channels` (#4073) hint rằng channel layer có thể được tách riêng trước khi merge vào main.

---

**Phân tích:**

NanoClaw đang trong giai đoạn hardening channels - Slack adapter được polish, AgentMail channel sắp ra mắt. Core team làm việc tập trung, ít tương tác community. Hai bug blocker (#4076, #4074) cần sửa gấp vì ảnh hưởng update workflow.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-10-12

## 🎯 Tóm tắt hôm nay

Dự án tập trung xử lý vấn đề nghiêm trọng về quản lý bộ nhớ session. Lịch sử hội thoại phình to không kiểm soát, auto-compaction chạy nhưng không ghi lại store, khiến context mỗi request tăng vô hạn. Đã có PR #1054 sửa phần restore, còn thiếu cơ chế write-back.

## 📦 Releases

Không có release.

## 🚧 Tiến độ dự án

**Vấn đề core đang giải:**

- **#1053**: Phát hiện lỗ hổng kiến trúc - session history load toàn bộ từ store mỗi lần restore, `max_history_messages` config bị vô dụng. Auto-compaction giảm `agent.history` trong RAM nhưng không sync về store.

- **PR #1054**: Sửa nửa vời - chặn restore ở tầng đọc (chỉ load `max_history_messages` gần nhất). Test pass 7491/7500. Nhưng `persistTurn` vẫn append vô hạn, compacted result bị bỏ.

- **#1055**: Issue tiếp theo - cần persist compacted transcript + sequence guard tránh race condition khi concurrent writes.

**Xu hướng:** Đang vá lỗi memory leak nghiêm trọng theo hướng phòng thủ nhiều lớp (giới hạn restore + giới hạn persist). Kiến trúc session store chưa được thiết kế cho long-lived sessions.

## 💬 Điểm nổi bật cộng đồng

Không có tương tác cộng đồng đáng kể (0 reactions, 3 comments từ maintainer). Issues do @vernonstinebaker tự phát hiện và fix, credit @O96a. Dấu hiệu: team nhỏ, chưa có user base lớn báo bug này.

## 🐛 Ổn định & Bugs

**Bug nghiêm trọng:**
- Context leak trong long-lived sessions → tăng latency, tốn token, có thể OOM
- Root cause: session persistence thiết kế append-only, thiếu compaction write-back
- Impact: Mỗi session càng sống lâu càng chậm dần

**Trạng thái fix:**
- ✅ Tầng restore: bounded (PR #1054)
- ⏳ Tầng persist: chưa fix, cần sequence guard (#1055)

## 💡 Yêu cầu tính năng

Không có feature request user-driven. Issue #1055 là technical enhancement từ maintainer.

## 👥 Phản hồi người dùng

Không có phản hồi từ end-users. Toàn bộ discussion nội bộ dev team.

## 🗺️ Backlog & Roadmap

**Ưu tiên cao:**
- Implement bounded persist với sequence guard (#1055)
- Verify không race condition khi multi-turn concurrent

**Technical debt:**
- Session store thiết kế lại cho streaming/compaction-aware persistence
- Monitor memory usage trong production long-lived sessions

**Test coverage:** 7491/7500 pass, 9 skipped, 0 failures/leaks - tốt nhưng không cover unbounded growth scenario.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-12

## 1. Tóm tắt hôm nay

Không có hoạt động mới. PRs mở đều do dependabot tạo ngày 11/10. Toàn bộ là dependency updates cho Rust và GitHub Actions. Đóng 3 PRs dependabot cũ (từ 20/09, 27/09, 04/10).

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PRs mới mở (11/10):**
- #8134: Bump 34 dependencies nhóm everything-else (thiserror 2.0.20→2.0.21, uuid 1.24.0→1.27.0, base64...)
- #8132: Bump 4 dependencies tokio ecosystem (tokio, tokio-test, tower-http, tokio-tungstenite)
- #8133: Bump 10 GitHub Actions (claude-code-action 1.0.183→1.0.247, actions/setup-node 4.0.2→7.1.0...)

**PRs đóng:**
- #8114 (27/09): 31 dependencies everything-else group
- #8103 (20/09): 8 GitHub Actions  
- #8123 (04/10): 3 tokio dependencies

**PR còn mở lâu:**
- #7834 (23/08): Bump 4 wasm dependencies (wasmtime, wasmtime-wasi, wit-component, wit-parser) - đánh dấu risk: medium

**Xu hướng:** 
Dự án maintenance mode. Chỉ dependency updates tự động. Không có feature, bugfix, hoặc code change thật sự. PR wasm (#7834) mở 7 tuần chưa merge - có thể có breaking change hoặc test fail.

## 4. Điểm nổi bật cộng đồng

Không có. Zero engagement (0 comments, 0 reactions trên tất cả PRs). Không có issue mới.

## 5. Ổn định & Bugs

Không có bug report. Không có issue được cập nhật.

## 6. Yêu cầu tính năng

Không có.

## 7. Phản hồi người dùng

Không có tương tác từ community.

## 8. Backlog & Roadmap

Không có thông tin. Dựa trên dữ liệu:
- PR #7834 cần review (pending 7 tuần)
- Backlog dependabot PRs đang được dọn dẹp (đóng cũ, mở mới với version mới hơn)

**Kết luận:** Dự án đang trong trạng thái bảo trì tối thiểu. Chỉ dependabot hoạt động. Không có development hoặc community activity.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw ngày 2026-10-12

## 1. Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào 21 PR (20 đóng, 1 mới mở), 10 issue mới. Chủ đề chính: hardening (MCP, cron, tool cancellation), HarmonyOS native client, plugin/skill infrastructure, UX polish (splash screen, reduced effects, per-chat approval persistence).

## 2. Releases

Không có release trong 24h qua.

## 3. Tiến độ dự án

**PR đóng (20):**

- **#5732, #1977, #2783, #2520, #2052**: hardening runtime, MCP, context overflow auto-recovery, model preflight, error degration
- **#5661, #5612**: plugin market version filtering (CDN + AgentScope Platform), isolated v1.x/v2.x routes
- **#5569**: desktop splash screen (tkinter preloader), loại bỏ white screen 5-30s khi khởi động Windows installer
- **#1480**: Ollama default 127.0.0.1 thay vì localhost (tránh IPv6 timeout)
- **#1883, #1978, #1848**: Agents Square browsing/import, MCP import templates + validation/preview, runtime status

**PR mở (1):**

- **#8183** (size/L, mới nhất): preserve cancellation reasons, continue parent loop khi child agent timeout (ToolResultState.ERROR recoverable vs INTERRUPTED)

**PR đang review:**

- **#8164** (size/XXXL): HarmonyOS native client (ArkUI/ArkTS, Stage model, API 26, không dùng WebView)
- **#8182** (size/XL): persist per-chat approval level server-side (trước đây chỉ localStorage)
- **#8178** (size/L): nested skill directories `<root>/<category>/<skill>/SKILL.md`
- **#8156** (size/L): coding-cli management endpoints cho worker containers (qwen-code, opencode)
- **#8137** (size/M): "reduced effects" tier trong Console (tắt 12-28px backdrop-filter, decorative animations cho low-end GPU)
- **#7973** (size/M): recover từ rejected media URLs (400 "URL invalid")
- **#7654, #7127** (size/S): audio fallback classifier nhận llama-server/DashScope rejections, CLI `--agent-id` docs

**Xu hướng:**

1. Hardening hoàn tất (MCP, cron, context overflow, model preflight)
2. Mở rộng nền tảng: HarmonyOS native (không dùng cross-platform wrapper)
3. Plugin/skill infrastructure: version filtering, nested layout
4. UX refinement: splash screen, reduced effects, per-chat settings persistence

## 4. Điểm nổi bật cộng đồng

**Issues có tương tác:**

- **#8172** (3 comments): Console chat "silent empty completion" — turn kết thúc ~1s, output rỗng, model không được gọi, frontend không có reply. User: `qwenpaw-data` agent, `octopus/keyong` model (OpenAI gateway)
- **#7990** (3 comments): Aliyun Token Plan models thiếu `thinking_param_style` trong `model_catalog.json` → Console ẩn thinking controls (思考模式/推理强度, Thinking level dropdown). Upstream endpoint hỗ trợ `reasoning_effort`/`thinking_budget`/`enable_thinking`

**Issues mới (8):**

- **#8181**: session-level change notification (long-polling/SSE event channel) để chat area reload bubbles khi backend session thay đổi (hiện phải hard refresh toàn bộ page)
- **#8180**: per-session approval level khác nhau mỗi chat, nhưng server không có session-scoped approval field → client localStorage + request_context
- **#8179**: install skill từ GitHub corrupt binary files (PNG/JPEG/font) — tất cả non-UTF-8 bytes thay bằng U+FFFD
- **#8177**: console hardcoded basename `/console` → không deploy được dưới arbitrary subpath (`/qwenpaw/`) sau reverse proxy
- **#8176**: Plugin Store "Update All" chỉ update official plugins, bỏ qua third-party
- **#8174**: `web_search` built-in tavily provider không có config surface cho user API key → paid quota không dùng được
- **#8173**: Codex backend restart → harness↔codex connection break, zombie "running" entry block mọi recovery (chỉ chat/stop cứu được)
- **#8175**: `ProviderManager.active_model` không load lúc startup + silent `except Exception: pass` trong `_load_agent_model_settings` → service cron (dream) fail mỗi đêm

## 5. Ổn định & Bugs

**Bugs đang xử lý:**

1. **#8172**: silent empty completion (high priority, reproducing)
2. **#8179**: GitHub skill install corrupt binaries (text mode read binary files → UTF-8 decode replace non-UTF-8)
3. **#8173**: Codex restart zombie running entry (connection break + state corruption)
4. **#8175**: startup `active_model` không load + silent exception → cron fail
5. **#8176**: "Update All" skip third-party plugins
6. **#7990**: Aliyun Token Plan missing `thinking_param_style`

**Fixes landed (via closed PRs):**

- MCP teardown noise, cron exception handling (#1977)
- Context overflow auto-compaction retry (#2783)
- Model preflight check, surface compute errors (#2520)
- MCP connection errors degrade to tool-level failure (#2052)
- Rejected media URL recovery (#7973)
- Audio fallback classifier recognize llama-server/DashScope rejections (#7654)

## 6. Yêu cầu tính năng

1. **#8181**: session-level change notification (SSE/long-polling) thay hard refresh
2. **#8182** (PR): persist per-chat approval level server-side
3. **#8178** (PR): nested skill directories (categorised layout)
4. **#8156** (PR): coding-cli management endpoints (qwen-code/opencode)
5. **#8137** (PR): reduced effects tier (tắt backdrop-filter cho low-end GPU)
6. **#8177**: configurable console basename (reverse-proxy subpath)
7. **#8174**: tavily provider API key config surface
8. **#7990**: Aliyun Token Plan `thinking_param_style` trong catalog

## 7. Phản hồi người dùng

**Pain points:**

- Silent failures: #8172 (empty completion), #8175 (cron fail no signal), #8179 (binary corruption không warning)
- Missing config surfaces: #8174 (tavily key), #8177 (console basename), #7990 (thinking controls)
- Inconsistent behaviors: #8180 (approval level client-only), #8176 (update all skip third-party)
- Hard recovery paths: #8173 (codex zombie), #8181 (phải hard refresh toàn page)

**Positive:**

- Hardening PRs đóng liên tục (MCP, context overflow, model preflight)
- Desktop splash screen fix (#5569) loại bỏ 5-30s white screen
- Plugin version filtering (#5661, #5612) tránh incompatible v1.x/v2.x

## 8. Backlog & Roadmap

**In-flight (PRs open):**

- HarmonyOS native client (#8164, size/XXXL)
- Per-chat approval persistence (#8182, size/XL)
- Nested skills (#8178, size/L)
- Coding-cli management (#8156, size/L)
- Reduced effects tier (#8137, size/M)

**Upcoming (từ issues):**

- Session change notification (#8181)
- Configurable console basename (#8177)
- Tavily API key config (#8174)
- Binary-safe GitHub skill install (#8179)
- Third-party plugin update (#8176)
- Aliyun Token Plan thinking controls (#7990)

**Tech debt:**

- #8175: startup model loading + silent exception swallow
- #8173: Codex restart connection recovery
- #8172: silent completion investigation

**Platform expansion:**

- HarmonyOS native (ArkUI, không WebView) — PR in review
- Desktop splash screen landed (#5569)
- Plugin/skill infrastructure matured (version filtering, nested layout)

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*