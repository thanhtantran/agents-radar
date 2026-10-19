# Bản tin Hệ sinh thái Hermes Agent 2026-10-19

> Issues: 42 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-19 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-19

## 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào xử lý bugs post-merge sau unified gateway runtime (#106742 merged 2026-10-14). Package 12 (#141321) gom 19 fixes còn lại: Ink, Desktop commands, ACP, estimates, custom providers, Telegram topics. Cộng đồng report lỗi multiplexed profiles và context compression.

---

## 🚀 Releases

**Không có release nào trong 24h qua.**

---

## 📈 Tiến độ dự án

### PRs mới (2026-10-19)

**Package 12 - Unified Gateway Cleanup (#141321):**
- #141334: worker persist off Relay event loop (KB-2) - managed workers không còn gọi sync RPC trên Relay loop
- #141335: giữ marker `~` estimate sau Ctrl+C; price cold `/compress` giống main 
- #141336: đặt tên restart/backend refusal messages; confirm TUI-14/T22
- #141331: replay waiting prompts sau legacy reconnect (salvage #140456) - Desktop URL/Cloud mode recover clarify/approval
- #141332: auto-fix lint (bot PR)

**Fixes khác:**
- #140579: exit 130 on SIGINT trong one-shot (không còn leak KeyboardInterrupt traceback)
- #132143: decode Ogg/Opus cho afplay (macOS 15+ chỉ play 2s đầu)

**Features:**
- #93508: serve Desktop renderer trong browser (`hermes webapp`) - authenticated, real Desktop workspace
- #140850: restore Termux/Android support + APK build pipeline

### Issues quan trọng

**P0/P1:**
- #134889: tracking post-merge fixes cho #106742 (186 comments) - one gateway owns all local sessions

**P2 hot:**
- #141320 ⭐: voice (Linux) interrupt TTS → loud static; barge-in threshold không config được
- #141313 ⭐: CLI voice mode không speak replies từ external-process providers (claude-subscription-directsdk)
- #141236: `list_sessions` walk mọi row trên gateway loop thread → stall → Telegram adapter fatal drop (1000s sessions)
- #141223: multiplexed profiles mất shared MCP server tools sau park/revive
- #140998: Anthropic env `ANTHROPIC_API_KEY` override pool OAuth credential mỗi retry → 400 loop
- #140958: custom provider API keys collide trên một host (env slot chỉ dùng host:port, bỏ URL path)

**Xu hướng:**
- Gateway multiplexing stability: profiles, MCP shared connections, session state
- Context compression & estimates accuracy
- Voice mode fixes (TTS/STT)
- Windows platform parity (scheduled tasks, DACL, gateway restart)

---

## 🌟 Điểm nổi bật cộng đồng

**Nhiều bình luận nhất:**
1. #134889 (186💬): post-merge unified gateway fixes - tracking hub
2. #131859 (45💬): API CreatePullRequest permission error (blocked upstream)
3. #67347 (15💬): feature request - guided picker cho Subagent Model + Provider trong Settings
4. #52341 (6💬): feature request - temporary/incognito chat mode

**User pain points:**
- Voice mode Linux: interrupt TTS phát static lớn (#141320)
- Desktop profiles mất tools sau MCP park (#141223)
- Session list slow query stall gateway (#141236)
- Credential pool overrides bị env vars (#140998)

---

## 🐛 Ổn định & Bugs

### Critical fixes landed today:
- Worker persistence off Relay loop (#141334) - KB-2
- Context estimate marker persist (#141335)
- Replay approval prompts sau reconnect (#141331)

### Open P2:
- **Voice (Linux)**: static khi interrupt TTS, threshold không config (#141320)
- **CLI voice**: external providers không speak (#141313)
- **Gateway**: `list_sessions` walk 1000s rows block loop → platform drops (#141236)
- **MCP**: shared server tools biến mất sau park/revive trong multiplex (#141223)
- **Auth**: Anthropic env key override OAuth pool → retry loop (#140998)
- **Custom providers**: API key collision trên cùng host (#140958)

### Patterns:
- Gateway event loop blocking (email adapter #122643, list_sessions #141236)
- Multiplexed profile edge cases (MCP tools, session delete, model switch)
- Windows platform gaps (scheduled tasks, DACLs, gateway recovery)

---

## 💡 Yêu cầu tính năng

**Mới:**
- #141315: delegation child có `compression_threshold_ratio` riêng (override ratio trigger)

**Hot requests:**
- #67347 (1👍): guided picker cho Subagent Model + Provider trong Settings (Desktop + Dashboard)
- #52341 (6👍): temporary/incognito chat mode (như Claude, GPT, Gemini)

**In progress:**
- #93508: serve Desktop renderer trong browser (`hermes webapp`)
- #140850: Termux/Android support + APK build

---

## 💬 Phản hồi người dùng

**Positive:**
- Post-merge cleanup có system: package 12 gom 19 rows qua 11 lanes (#141321)
- Gateway multiplexing architecture được đầu tư nhiều

**Pain:**
- Voice mode Linux chưa stable (static, external provider không speak)
- Multiplexed profiles có nhiều edge case (MCP, sessions, auth)
- Gateway query performance vấn đề với 1000s sessions
- Windows platform chưa first-class (scheduled tasks, permissions)

**Requests:**
- Config cho voice barge-in threshold (#141320)
- Temporary chat mode (#52341)
- Guided settings pickers (#67347)

---

## 🗺️ Backlog & Roadmap

**Package 12 lanes (#141321):**
- Lane 2: context estimates ✅
- Lane 11: restart/refusal naming ✅
- KB-2: worker persist off Relay loop ✅
- DB-7: replay prompts sau reconnect ✅
- Còn: Ink, custom providers, Telegram topics, ACP edit modes

**Priorities:**
1. **Gateway stability**: multiplexed profiles, session state, event loop blocking
2. **Voice mode**: Linux static fix, external provider TTS, config thresholds
3. **Platform parity**: Windows scheduled tasks, Android/Termux restore
4. **UX polish**: guided settings pickers, temporary chat mode

**Tech debt:**
- Session query performance (#141236)
- MCP shared connection lifecycle (#141223)
- Credential pool env override semantics (#140998, #140958)
- Gateway event loop discipline (sync calls, long queries)

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-19

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 2026-10-19 có 9 dự án active với mức độ khác biệt lớn. Hermes Agent, OpenClaw, NanoBot dẫn đầu về hoạt động (500 PRs). ZeroClaw post-release v0.8.6 focus security. PicoClaw, NullClaw, IronClaw gần như chết. QwenPaw fix bug interface sau v2.2.2. NanoClaw phát triển template system.

**Snapshot:**
- **Mega-projects**: Hermes, OpenClaw, NanoBot - 500 PR queue, post-merge cleanup waves
- **Mid-tier**: ZeroClaw (50 PR, v0.8.6 ship), QwenPaw (10 PR, console bugs), NanoClaw (11 PR, templates)
- **Dying**: PicoClaw (maintainer ghost, critical bugs unmerged 8 days), IronClaw (dependabot only), NullClaw (zero activity)

Trend: **Consolidation** - 3 mega-projects hút majority effort. Smaller projects struggle maintainer bandwidth.

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity Level | Community Engagement |
|-------|--------|-----|----------|----------------|---------------------|
| **Hermes Agent** | 42 | 500 | 0 | 🔥 Very High | 186 comments (#134889) |
| **OpenClaw** | 58 | 500 | 1 (v2026.10.5) | 🔥 Very High | 26 comments (#160959) |
| **NanoBot** | 4 | 33 | 0 | 🟢 High | 3 comments (#6288) |
| **ZeroClaw** | 4 | 50 | 1 (v0.8.6) | 🟢 High | 7 comments (#11418) |
| **PicoClaw** | 3 | 5 | 0 | 🟡 Low | 0 (stale bot only) |
| **NanoClaw** | 5 | 11 | 0 | 🟢 Moderate | 0 (core team only) |
| **NullClaw** | 0 | 0 | 0 | ⚫ Dead | - |
| **IronClaw** | 1 | 9 | 0 | 🟡 Very Low | 0 (dependabot only) |
| **QwenPaw** | 15 | 10 | 0 | 🟢 Moderate | 6 comments (#8278) |

**Metrics:**
- **Hermes Agent**: unified gateway post-merge cleanup, Package 12 gom 19 fixes
- **OpenClaw**: v2026.10.5 rollout fallout, 6 P0 bugs trong 24h
- **NanoBot**: 19 PR merged, Unicode/MCP/channel fixes
- **ZeroClaw**: plugin v0.8.6 hardening, POSIX command injection fix
- **PicoClaw**: 2 critical PR (cron, telegram) chờ 8 ngày, no review
- **QwenPaw**: Console input clear, DingTalk Markdown giảm cấp >3500 chars

---

## 3. 🎯 Vị thế Hermes Agent

**Position:** Top-tier mature project, post-consolidation phase

**Strengths:**
- **Gateway architecture leadership**: #106742 unified local sessions → major milestone
- **Systematic cleanup**: Package 12 (#141321) gom 19 fixes qua 11 lanes, có structure
- **Multiplexing investment**: profiles, MCP shared servers, session state - phức tạp nhưng advanced
- **Active community**: 186-comment tracking thread (#134889)

**Weaknesses:**
- **Voice mode instability**: Linux static on interrupt (#141320), CLI external providers không speak (#141313)
- **Multiplexed profiles edge cases**: MCP tools mất sau park (#141223), session list query block gateway (#141236)
- **Windows platform gaps**: scheduled tasks, DACLs, gateway restart không first-class
- **Context compression**: estimates accuracy issues (#141335)

**Position vs others:**
- **vs OpenClaw**: cả hai mega-projects, OpenClaw có release tempo (2026.10.5) nhưng rollout gặp corruption bugs. Hermes ổn định hơn về releases nhưng chậm hơn.
- **vs ZeroClaw**: ZeroClaw ship plugin WebAssembly host + OIDC (v0.8.6), kiến trúc mới hơn. Hermes focus gateway multiplexing, mature hơn về session management.
- **vs NanoBot**: NanoBot nhỏ gọn, fix bug nhanh (19 PR/day). Hermes phức tạp hơn nhiều, cleanup chậm hơn.

**Strategic role:** **Reference implementation** cho large-scale agent orchestration. Gateway multiplexing pattern likely influence others. Voice mode và Windows parity là gaps cần bù.

---

## 4. 🔧 Hướng kỹ thuật chung

### A. **Gateway/Runtime Consolidation**
- **Hermes**: unified gateway (#106742) owns all local sessions
- **OpenClaw**: Gateway crash-loop (#176669), restart resilience focus
- **NanoClaw**: agent-runner retry SQLite lock races (#4118)

**Insight:** Single-gateway pattern giảm complexity nhưng tạo SPOF. Restart resilience và event loop discipline là common pain.

### B. **MCP (Model Context Protocol) Integration**
- **Hermes**: shared MCP server tools mất sau park/revive (#141223)
- **NanoBot**: pagination bug (#6018), credential leak log (#6067), server without tool capability (#6019)
- **ZeroClaw**: Plugin registry có tool/channel packages

**Insight:** MCP adoption rộng nhưng lifecycle management (connection pool, resource cleanup) chưa stable. Spec compliance gaps nhiều.

### C. **Plugin/Extension Architectures**
- **ZeroClaw**: WebAssembly host (#11814 egress stagger), plugin settings encryption (#11812)
- **NanoClaw**: Template-based agent creation (#4112)
- **OpenClaw**: plugin capture IO storm (#160959, #157989)

**Insight:** Plugin isolation đang evolve. WebAssembly = security + performance. File-based plugins (OpenClaw) gặp I/O waste.

### D. **Context Management & Compression**
- **Hermes**: context estimate marker persist (#141335), compression threshold ratio per delegation (#141315)
- **NanoClaw**: transcript >512MB crash (#4127), streaming read fix (#4086)
- **OpenClaw**: context loss sau restart (#176586)

**Insight:** Context budget management critical. Streaming > full load. Estimates accuracy affects UX (surprise cuts).

### E. **Multi-Channel Support**
- **NanoBot**: Telegram query string (#6124), email attachment collision (#6184), NapCat size handling (#5914)
- **QwenPaw**: DingTalk Markdown >3500 chars giảm cấp (#8278), QQ group event mismatch (#8313), Feishu 426 với HTTP_PROXY (#8315)
- **PicoClaw**: Telegram long-poll no timeout → channel treo (#3422)
- **NanoClaw**, **IronClaw**, **PicoClaw**: Sendblue iMessage/SMS integration (multiple PRs)

**Insight:** Channel quirks = maintenance burden. Telegram, Matrix, email, SMS edge cases nhiều. Trend: iMessage/SMS via Sendblue API.

### F. **Voice Mode**
- **Hermes**: Linux TTS interrupt → static (#141320), external provider không speak (#141313)
- **ZeroClaw**: barge-in threshold không config

**Insight:** Voice mode chưa production-ready. Linux audio stack, STT/TTS provider integration fragile.

### G. **Security Hardening**
- **ZeroClaw**: POSIX command parser subshell boundaries (#11822), shell memory watchdog (#11456), lifecycle lock 0o700 (#11803)
- **NanoClaw**: approval card sanitization (#4090)
- **NanoBot**: MCP credential leak log (#6067)

**Insight:** Command injection, credential exposure, approval prompt injection là active threats. Shell execution = high-risk surface.

### H. **Platform Parity**
- **Hermes**: Windows scheduled tasks, DACLs gaps
- **OpenClaw**: Docker `mv --exchange` missing → SQLite NOCOW repair skip (#171930)
- **NanoBot**: Termux/Android restore (#140850)

**Insight:** Linux-first development. Windows, Android là afterthoughts. Docker environment constraints (missing system calls) gây surprises.

---

## 5. 🎭 Điểm khác biệt

### A. **Chiến lược phát triển**

| Aspect | Hermes | OpenClaw | NanoBot | ZeroClaw | Others |
|--------|--------|----------|---------|----------|--------|
| **Release cadence** | Slow, no release today | Monthly (2026.10.5) | Continuous merge | v0.8.6 milestone | Irregular/none |
| **Architecture focus** | Gateway multiplexing | Update recovery | Spec compliance | Plugin WebAssembly | Varied |
| **Community model** | Tracking threads | Issue-driven | Core team fast-merge | Contributor review | Ghost/dependabot |
| **Cleanup pattern** | Packaged lanes | Post-release fallout | Per-PR | Bulk refactor (steipete) | Ad-hoc |

**Hermes**: Systematic, slow. Package 12 structure = discipline nhưng velocity thấp.

**OpenClaw**: Fast release → fast fallout. v2026.10.5 ship 10/18, 6 P0 bugs 10/19. Aggressive tempo.

**NanoBot**: Incremental, stable. 19 PR merged/day, no drama. Small team effective.

**ZeroClaw**: Milestone-driven. v0.8.6 = architectural shift (WebAssembly, OIDC, daemon). Post-release hardening phase.

**PicoClaw/IronClaw**: Maintainer abandon. Critical bugs rot.

### B. **Tính năng độc đáo**

**Hermes:**
- Multiplexed profiles (#141223) - advanced session isolation
- Voice mode (dù chưa stable) - Linux TTS/STT stack
- Desktop renderer serve in browser (#93508)

**OpenClaw:**
- Cross-device update recovery (#164769) - elevation, strand prevention
- SQLite health auto-detect btrfs/xfs (#171930)
- Tailscale Serve integration (#148308)

**NanoBot:**
- Full MCP pagination (#6018)
- Deepgram array param fix (#176781)
- Unicode separator handling (U+2028 #6292)

**ZeroClaw:**
- WebAssembly plugin host (v0.8.6)
- OIDC principals for RPC
- Session attachments SQLite-backed (#10407)

**QwenPaw:**
- DeepSeek Search with publication date (#8314)
- HarmonyOS plugin host contract (#8311)
- Model favorites UI proposal (#8310)

**NanoClaw:**
- Template-based agent creation (#4112)
- Cross-session context "you" vs agent name (#4092)

### C. **Cộng đồng**

**High engagement:**
- **Hermes**: 186 comments (#134889), multi-lane tracking
- **OpenClaw**: 26 comments (#160959), user report production stalls
- **QwenPaw**: 6 comments (#8278), business-critical DingTalk issue

**Core team only:**
- **NanoBot**, **NanoClaw** - zero external comments, fast internal merge

**Ghost:**
- **PicoClaw** - critical PR 8 days no review
- **IronClaw** - dependabot only, Sendblue PR 0 comments
- **NullClaw** - dead

**Insight:** Community size != velocity. NanoBot small team ship fast. Hermes large community = coordination overhead. PicoClaw/IronClaw show maintainer dropout risk.

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### **Tier 1: Mature Ecosystems**
**Hermes Agent**, **OpenClaw**
- **Indicators:** 500 PR queue, 40+ issues, multi-contributor, tracking threads (100+ comments)
- **Governance:** Lane-based cleanup (Hermes Package 12), priority triage (OpenClaw P0/P1/P2)
- **Pain:** Coordination overhead, slow consensus, long review cycles
- **Strength:** Deep testing, production battle scars, systematic debt pay-down

### **Tier 2: Healthy Small Teams**
**NanoBot**, **ZeroClaw**
- **Indicators:** 10–50 PRs, responsive merge (<24h), clear milestones
- **Governance:** Core team fast-track, contributor review for external
- **Pain:** Bandwidth limits, feature scope constrained
- **Strength:** Velocity, focus, low bureaucracy

### **Tier 3: Solo/Struggling**
**QwenPaw**, **NanoClaw**
- **Indicators:** <15 PRs, 0 external comments, core-team-only activity
- **Governance:** Benevolent dictator, ad-hoc priorities
- **Pain:** Bus factor, slow external contribution onboarding
- **Strength:** Coherent vision, no bikeshedding

### **Tier 4: Dying/Dead**
**PicoClaw**, **IronClaw**, **NullClaw**
- **Indicators:** Critical PRs rot, dependabot-only, or zero activity
- **Governance:** None (abandoned)
- **Pain:** Users stuck, no path forward
- **Strength:** None

**Maturity spectrum:**
```
Dead ← Struggling ← Healthy ← Mature → Bureaucratic
  │        │          │         │          │
NullClaw  NanoClaw   NanoBot  Hermes   (none yet)
IronClaw  QwenPaw    ZeroClaw OpenClaw
PicoClaw
```

**Observation:** No project bureaucratic yet. Hermes, OpenClaw approaching threshold (500 PR = review bottleneck). Smaller projects faster but fragile (maintainer loss = instant death).

---

## 7. 🔮 Tín hiệu xu hướng

### A. **Architecture Trends**

**1. Gateway Consolidation → Distributed Redux**
- Current: Hermes, OpenClaw unified gateway = SPOF. Restart bugs, event loop blocking common.
- Signal: OpenClaw #176777 shutdown hang, Hermes #141236 session list stall gateway
- **Prediction:** Next wave = distributed gateway federation. Single coordinator, multiple workers. Trade: complexity ↑, resilience ↑.

**2. Plugin Isolation Maturation**
- Current: ZeroClaw WebAssembly, NanoClaw templates, OpenClaw file-based plugins
- Signal: OpenClaw #160959 plugin capture IO storm, ZeroClaw #11822 command injection
- **Prediction:** WebAssembly becomes standard. File-based plugins deprecated. Security > convenience.

**3. MCP Ubiquity with Edge Case Hell**
- Current: All projects integrate MCP. Bugs: pagination, lifecycle, spec gaps nhiều.
- Signal: NanoBot #6018 pagination, Hermes #141223 shared server tools loss, NanoBot #6067 credential leak
- **Prediction:** MCP spec v2.0 với explicit lifecycle hooks, connection pool standard library. Current implementations retrofit painful.

### B. **Feature Trends**

**1. Multi-Modal Fragility**
- Current: Voice mode (Hermes, ZeroClaw) unstable. Linux audio stack, external provider integration broken.
- Signal: Hermes #141320 TTS interrupt static, #141313 external provider no speak
- **Prediction:** Voice mode stays niche until platform abstraction layer mature (2027+). Text-first remains dominant.

**2. Context Management Arms Race**
- Current: Context budget management critical. Compression, estimates, streaming read patterns emerge.
- Signal: Hermes #141335 estimate marker, NanoClaw #4127 transcript 512MB crash
- **Prediction:** Standard context compression protocol. LLM providers expose compression-aware APIs. Client-side streaming becomes mandatory (full load = antipattern).

**3. iMessage/SMS Channel Demand**
- Current: 4 projects (NanoClaw, IronClaw, PicoClaw, NanoBot) have Sendblue integration PRs
- Signal: Multiple independent implementations, same API (Sendblue)
- **Prediction:** SMS/iMessage becomes table stakes. Sendblue likely commoditized or replaced by open protocol. Agent-to-phone UX standard emerges.

**4. Template/Persona Systems**
- Current: NanoClaw #4112 template-based agent creation
- Signal: UX friction = blank agent setup. Templates reduce onboarding.
- **Prediction:** Agent marketplaces với pre-built personas. Think "WordPress themes for agents". Discovery, versioning, compatibility challenges ahead.

### C. **Community Trends**

**1. Maintainer Burnout Acceleration**
- Current: PicoClaw critical bugs 8 days no review, IronClaw dependabot-only
- Signal: Mega-projects (Hermes 500 PR, OpenClaw 500 PR) absorb talent. Smaller projects starve.
- **Prediction:** Consolidation continues. 2027 = 3–5 dominant projects, long tail dies. Fork vs contribute decision becomes strategic.

**2. Post-Release Fallout Normalization**
- Current: OpenClaw v2026.10.5 → 6 P0 bugs/24h. Hermes Package 12 cleanup = 19 fixes post-merge.
- Signal: Aggressive release tempo + architectural changes = regression waves inevitable.
- **Prediction:** "Ship and fix" becomes culture. Canary/beta channels standard. Users tolerate instability for velocity. Alternative: slow-stable niche (NanoBot model).

**3. Platform Parity Pressure**
- Current: Windows (Hermes, OpenClaw), Android (NanoBot, OpenClaw) gaps. Linux-first bias clear.
- Signal: Accessibility concerns (#136429 Node 27 VoiceOver), Docker constraints (#171930 mv --exchange)
- **Prediction:** Cross-platform CI mandatory. Windows, Android first-class or abandon explicitly. Half-working support = worse than none (user frustration).

### D. **Security Trends**

**1. Command Injection → Sandbox Everything**
- Current: ZeroClaw #11822 POSIX parser subshell boundaries, shell memory watchdog
- Signal: Shell execution = persistent attack surface. Fixes incremental, never complete.
- **Prediction:** Shell tools deprecated. Sandboxed WebAssembly functions replace bash/python scripts. Trade: ecosystem rebuild pain, security gain.

**2. Credential Management Chaos**
- Current: Hermes #140998 Anthropic env override, OpenClaw #165583 CLI fallback blocked, NanoBot #6067 MCP leak
- Signal: No standard credential store. Env vars, config files, OAuth pools = collision, leaks, overrides.
- **Prediction:** Standard credential vault protocol emerges (think 1Password/Bitwarden integration). Projects converge or die (users won't manage 5 auth systems).

---

## 🎯 Kết luận chiến lược

**Hermes Agent position:** Top-tier mature, gateway multiplexing leader, but velocity slow. Voice mode instability và Windows gaps = competitive risks. NanoBot model (small team, fast merge) attractive alternative for users valuing stability over features.

**Ecosystem health:** Consolidating. 3 mega-projects, 2 healthy mid-tier, 4 struggling/dead. Maintainer bandwidth = bottleneck. Plugin WebAssembly, MCP, context management = common investment areas.

**2027 outlook:** Dominant projects cement via network effects (contributors, plugins, channels). Smaller projects either find niche (privacy-first? air-gapped?) or die. Security, platform parity, post-release stability separate winners from losers.

**Action signals for Hermes:**
1. Voice mode stabilization or deprecation - current state = reputational risk
2. Windows first-class support - enterprise adoption blocker
3. Gateway event loop discipline - #141236 type bugs = scalability ceiling
4. Velocity boost - 500 PR queue unsustainable, Package 12 cleanup pattern good but need faster cycle

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo phân tích OpenClaw - 2026-10-19

## 1. Tóm tắt hôm nay

Ngày đầu sau release 2026.10.5: đội dev xử lý 30+ PR và 50+ issue còn lại từ rollout. Tập trung vào 3 việc: sửa Gateway hang/crash sau update, fix context loss sau restart, giảm tải CPU/IO khi idle. Community report nhiều corruption và restart-loop case.

## 2. Releases

**v2026.10.5** ship 2026-10-18, highlight:

- **Update recovery system**: `openclaw update` tự hoàn thiện cross-device, qua elevation, không còn strand install (#164769+)
- **SQLite health & NOCOW**: Auto-detect btrfs, xfs; apply copy-on-write flags (#171930 note: Docker skip vì thiếu `mv --exchange`)
- CLI và Web UI polish, backup retention

**Post-release fallout**: 6 P0 bug report trong 24h — system-agent schema stuck, Gateway crash-loop (#176669), context loss (#176586), hung shutdown (#176777).

## 3. Tiến độ dự án

### Active work (top PRs today):

**Stability & Restart Recovery** (mấy stack này đang stack nhau):
- #176770: preserve session delivery order qua restart
- #176769: child subagent survive parent finish after crash
- #176587: chat input không mất khi restart (P1, merge-risk security-boundary)

**Performance**:
- #176738: UI process view refresh chỉ khi registry change, không poll 5s nữa
- #174341 (issue): Gateway idle vẫn ăn ~1 core — fs-safe dir observer chạy liên tục
- #176781: Deepgram array param bị join thành 1 query thay vì repeat (fix `keyterm`)

**Refactor campaign** (steipete bulk PRs):
- #176703, #176775: xóa low-value test, giữ auth/lifecycle contracts
- #176756: type-check discovery giảm memory
- #176760: retire migration guard đã hoàn thành

### Priority breakdown:

**P0** (5 open): #176764 update fail verification, #176669 schema-24 crash-loop, #160959 plugin capture block minutes (2026.9.6 regression), #133987 Copilot model bị filter hết, #147728 xAI OAuth 426

**P1** (14): restart-loss bugs, MCP instruction missing, telegram message loss

**P2+**: perf, refactor, ergonomic polish

## 4. Điểm nổi bật cộng đồng

**Top engagement** (comment count):

1. **#160959** (26 cmt, 🦞 diamond): plugin capture block Gateway minutes — user report real-world stall. Root cause: sync copy+SHA-256 mỗi non-bundled plugin mỗi start.

2. **#148707** (22 cmt, 🦪 silver): reply lost "no active tool authority snapshot" khi concurrent run displace turn. Affects message integrity.

3. **#157989** (20 cmt, 🐚 platinum): plugin capture write 1.1–6.5 GB mỗi lần, no reuse, bundled native binary bị copy lại → SSD wear.

**User pain points**:
- **Restart fragility**: context, pending input, child session bị clear (#176586, #176587, #176770)
- **Update failures**: nhiều report stuck, crash, schema mismatch (#176764, #176669)
- **I/O waste**: plugin capture, config hot-reload, idle CPU (#159698, #160959, #174341)

**Feature request nổi bật**:
- #66705 (7 cmt): expose `OPENCLAW_SESSION_KEY` env var cho exec children (session-aware scripts)
- #175826: Android match browser UX cho approval request

## 5. Ổn định & Bugs

### Critical regressions:

**Post-update corruption**:
- #176669: 2026.10.4→10.5 để system-agent DB schema-24, Gateway crash-loop — doctor skip DB under deletion-hold
- #176764: update report "gateway-recovery-verification" fail — unclear user environment

**Gateway hangs & crashes**:
- #176777: shutdown hang khi worker provisioning chưa xong (systemd SIGKILL 90s)
- #174681: #172750 (async plugin prep) thực ra block main thread vài phút — rollback khỏi release
- #175862: provider 429 + fallback `next=none` → event loop stall mãi, không deliver error final

**Session state loss**:
- #175670: claude-cli session qua restart mất exec tool, child session inherit loss (stale MCP catalog)
- #148707: concurrent turn displace → reply lost
- #134498: delivered reply lost nếu session key rebound trước mirror append

**Channel-specific**:
- #158147: Telegram reply-to-bot message → body empty agent-side (gateway log đầy đủ)
- #176731: Telegram polling infinite loop khi persisted offset > real update_id (local Bot API / apiRoot switch)

### Systemic issues:

**Resource waste**:
- #160959, #157989, #159698: plugin capture IO storm — sync copy+hash, no reuse, bundled native
- #174341: idle Gateway 1 core — fs-safe dir observer
- #164390: 223 llama-server OOM kill trong 1 ngày Linux

**MCP & tool gaps**:
- #174342: MCP server `instructions` không vào agent prompt
- #134487: tool Search schema permit request nhưng runtime reject (query XOR queries)
- #151191: Talk confirmation gate English-only, non-English refusal never clear action

**Infrastructure**:
- #148308: Tailscale Serve claim lost khi tailscaled restart, không re-claim
- #168356: model discovery dùng fixed ~5s timeout, ignore `timeoutSeconds` config

## 6. Yêu cầu tính năng

**Process & SDK**:
- #66705: expose session env vars `OPENCLAW_SESSION_KEY`, `OPENCLAW_AGENT_ID` cho exec child
- #176671: thêm resolved `completionMode` vào `subagent_spawned` hook (plugin cần biết child spawn mode)

**Platform parity**:
- #175826: Android UX match browser cho in-chat question và native approval
- #136429: support Node 27 HEAD (compatibility + accessibility concern từ VoiceOver user)

**Provider & auth**:
- #171120 (closed as feature-complete): SubQ Snap decision model — ship rồi
- #165583 (open, P1, needs-proof): CLI fallback blocked bởi configured primary account (auth resolve bug)

## 7. Phản hồi người dùng

**Stability frustration**:
> "I've tried this approach twice and it's not working." — #160959  
> "The displaced turn's reply is lost entirely (no retry, no partial)." — #148707  
> "223 OOM kills in one calendar day" — #164390

**Accessibility concern**:
> "I am a blind musician... reporting a compatibility problem that is also an accessibility concern." — #136429 (Node 27, VoiceOver)

**Infrastructure operators**:
- Docker `mv --exchange` missing → SQLite NOCOW repair skip (#171930)
- Systemd SIGKILL 90s shutdown timeout (#176777)
- btrfs/xfs người dùng thấy SSD wear từ plugin capture (#157989)

**Developer ergonomics**:
- Session-aware exec script muốn `OPENCLAW_SESSION_KEY` (#66705)
- Codex `/bind --cwd` với path có space bị silent fail (#174871)

## 8. Backlog & Roadmap

### Immediate (P0/P1 burn-down):

**Phase 1 — Restart resilience** (đang active):
- #176770, #176769: delivery order + child authority qua restart
- #176586, #176587: chat input + steering persist
- Fix #176669 schema-stuck, #176764 update verification

**Phase 2 — Resource waste**:
- #160959 plugin capture async (revert #174681 regression, làm lại đúng)
- #174341 idle CPU từ fs-safe observer
- #159698 config hot-reload block 20–33s

**Phase 3 — Message integrity**:
- #148707 concurrent-turn reply loss
- #158147 Telegram reply-to-bot body empty
- #134498 late-reply persistence race

### Longer-term themes (từ issue labels):

**Developer experience**:
- Session env vars, MCP instruction carry-through
- Codex whitespace handling, workspace path resolution

**Auth & provider**:
- CLI fallback unblock (#165583)
- Model discovery timeout config honor (#168356)
- xAI OAuth version header fix (#147728)

**Channel & platform parity**:
- Telegram apiRoot local server dispatch (#54529)
- Android approval UX match browser (#175826)
- Windows-specific (LINE Doctor EEXIST #169586, backup EPERM #176743)

**Performance & observability**:
- Reduce idle resource, smarter refresh
- Better update recovery logging

### Cleanup pipeline:

steipete đang bulk-retire:
- Low-value test suites (batch d260, d262)
- Completed migration guards (#176760)
- Redundant DOM query / effect chains (UI refactor PRs)

---

**Kết luận**: Dự án trong sprint ổn định post-release. Focus: restart không mất state, giảm IO/CPU waste, fix auth/channel regressions. Community report valuable crash data. Team responsive — 30 PR trong ngày, nhiều fix đã merge hoặc review-ready.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot ngày 2026-10-19

## 1. Tóm tắt hôm nay

Ngày tập trung vào bug fix và cải tiến chất lượng. 19 PR đóng (hầu hết fix bug), 1 PR mới mở (DeepSeek Search integration), 2 issue mới về Matrix group policy và Agnes AI tool encoding.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**PR đã merge:**

- **Ổn định core**:
  - #6292: Fix Unicode separator trong JSONL migration (U+0085, U+2028, U+2029 break splitlines)
  - #6270: Preserve paragraph separator trong inline reasoning stream
  - #6254: Accept `3.0` cho integer parameter (JSON Schema spec compliance)
  - #6013: Fix enum validation dùng JSON equality thay vì Python membership

- **MCP server integration**:
  - #6018: Discover tất cả resource/prompt pages (pagination bug)
  - #6019: Connect server không có tool capability
  - #6067: Prevent credential leak trong discovery error log

- **Channel fixes**:
  - #6184: Preserve attachment trùng filename (email)
  - #6186: Exclude attached .eml từ body extraction
  - #6124: Detect media type với query string (Telegram)
  - #5911: Render tilde fence và long fence đúng (Telegram)
  - #5914: Keep message khi image có non-numeric file_size (NapCat)

- **Document handling**:
  - #6093: Preserve complete PDF page cross reads
  - #6097: Skip chart-only sheet trong XLSX
  - #6183: Preserve XLSX grep locator với literal tab
  - #6253: Unicode upload name trong filesystem byte limit

- **Provider/Tool**:
  - #6050: Preserve first SSE event với UTF-8 BOM
  - #6283: Align DeepSeek capability với official API
  - #6197: Handle case-insensitive image media type
  - #6290: Retry DuckDuckGo search rejection

- **Cron**:
  - #6071: Preserve schedule edit during execution
  - #6167: Keep pending interval run cross restart

**PR đang mở:**

- #6296 (mới): Fix parallel tool call khi stream omit index (Gemini OpenAI-compatible API issue)
- #6294 (mới): Add DeepSeek Search provider cho `web_search`
- #6289: Add Matrix "listen" group policy (observe room, reply on mention only)
- #6295: Keep unbranded app initial readable (contrast fix)
- #6173: Run bang command qua gateway (WebUI parity với TUI)
- #6171: Make first-run Compose service usable (crash-loop fix)
- #6081: Add Sendblue iMessage/SMS channel

## 4. Điểm nổi bật cộng đồng

**Issue mới quan tâm:**

- #6288 (3 comment): Matrix "listen" policy request - user muốn bot observe conversation nhưng chỉ reply khi mention. Current `mention` policy drop message outright nên bot mất context.

- #5311 (2 comment, update hôm nay): Agnes AI double-encode nested object tool argument thành JSON string, break MCP tool call.

**Issue đóng:**

- #6123: Telegram classify image URL với query string sai
- #6070: Cron completion consume schedule changed during execution

## 5. Ổn định & Bugs

**Đã fix:**

- Unicode handling: JSONL migration, XLSX grep, upload filename
- JSON Schema compliance: enum validation, integral number cho integer type
- Stream parsing: SSE BOM, inline reasoning separator, parallel tool call index
- MCP: pagination, server without tool, credential leak
- Channel quirk: Telegram query string, email attachment collision, NapCat non-numeric size
- Document: PDF page boundary, XLSX chartsheet, tab trong cell
- Cron: schedule preservation, restart interval loss

**Đang fix:**

- #6296: Gemini OpenAI API stream parallel tool call without index → merge vào wrong call
- #5311: Agnes AI nested object double-encode

## 6. Yêu cầu tính năng

**Mới:**

- #6288 → #6289: Matrix "listen" policy (PR đang review)
- #6294: DeepSeek Search integration (PR mới mở)

**Đang develop:**

- #6173: WebUI bang command execution (conflict tag)
- #6171: Docker Compose first-run fix (conflict tag)
- #6081: Sendblue iMessage/SMS channel

## 7. Phản hồi người dùng

Không có comment nhiều hay discussion thread nổi bật. Activity tập trung vào bug report và fix review.

## 8. Backlog & Roadmap

Không có roadmap public trong data. Trend từ PR:

- Tăng channel coverage (Sendblue)
- Improve tool stability (retry, validation, encoding)
- MCP spec compliance (pagination, optional capability)
- Docker experience (first-run usability)

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw - 2026-10-19

## 🎯 Tóm tắt hôm nay

Release v0.8.6 ra mắt với plugin host WebAssembly, OIDC auth và daemon lifecycle. 50 PR đang active, focus vào security hardening (POSIX command splitting, shell memory watchdog) và ZeroCode UX cải thiện (session refresh không cancel, file path link, delegate tool visibility).

## 🚀 Releases

### v0.8.6 (2026-10-18)
**573 commits, 74 contributors**

**Core thay đổi:**
- **Plugin system**: WebAssembly host trong CLI, registry có channel/tool packages
- **Auth**: OIDC principals cho RPC + gateway
- **Architecture**: Config, events, agent lifecycle chuyển về daemon quản lý
- **Minimal toolset**: Opt-in built-in tool set

**Ý nghĩa**: Plugin architecture trưởng thành, bảo mật auth nâng cấp, daemon trở thành control center thay vì distributed state.

## 📊 Tiến độ dự án

### Security hardening (ưu tiên cao)
- **#11822** [XL, high-risk]: POSIX command parser bỏ sót `$()`, `<()`, `)` subshell boundaries → split logic fix
- **#11456** [XL, P2]: Memory watchdog cho shell subprocess (opt-in `shell_max_memory_mb`)
- **#11803** [L]: Lifecycle lock chuyển vào `.lifecycle/` với owner-only mode 0o700

### ZeroCode UX improvements
- **#11513** [XL, ✅ merged]: Dashboard hiện runtime context (agent, model, profile, sessions by state)
- **#11692** [M, ✅ merged]: `warn_at_percent` warnings hiện trong ZeroCode (trước bị ignore)
- **#11508** [L, ✅ merged]: Empty config sections giải thích rõ optional vs required, alias setup guide
- **#11457** [XL]: F5 refresh session không cancel, giữ draft/attachment/selection
- **#11633** [L]: Click file path trong transcript mở local file (terminal wrap làm vỡ link)
- **#11624** [L]: Dropped elicitation answer đúng, record vào transcript (trước wait timeout 600s)
- **#11463** [XL]: File write diff hiện red/green lines (trước chỉ full content)

### Plugin system fixes (release v0.8.6 scope)
- **#11814** [XL]: Egress dials stagger → không bị 1 silent address stall cả connect
- **#11812** [M]: `config set` nhận non-secret plugin settings đúng (trước encrypt hết)
- **#11811** [L]: Runtime config refusal report trong `plugin info` + `list --verify`
- **#11809**: `plugin remove` xóa đúng loaded directory (không phải fixed `<name>`)
- **#11808**: WebSocket/socket transport count vào egress declaration
- **#11807** [S]: Package lock + lease owner-only (0o600)

### Runtime & agent
- **#9447** [XL, trusted]: Anthropic incomplete response classify đúng (typed failure, không phải blank success)
- **#10407** [XL]: Persistent session prompt attachments (SQLite, 4 bounded prompts, TTL cleanup)
- **#11730** [XL]: Foreground delegate tool calls hiện parent turn (trước inert observer)
- **#11698** [M]: Personality files stable per session → edit không bust prompt cache
- **#11720** [M]: Scenario routing `hint`/`model_provider`/`model` expose required

### Infrastructure
- **#11726** [L]: Tailscale gateway serve process supervise + verify (trước spawn và bỏ)
- **#11731** [M]: ZeroCode per-pane session cap configurable (trước fixed 8)

### OpenRouter credit balance (3 attempts)
- **#11845** [M, mới]: Web dashboard hiện balance
- **#11846** [L, mới]: Config control balance reporting (opt-in, default disabled)
- **#11231** [M, ✅ closed]: Cùng feature, replaced bởi 11845/11846

## 🔥 Điểm nổi bật cộng đồng

**Issue hot:**
- **#11418** [P3, 7 comments]: Copy button không work → clipboard issue, in-progress

**Contributor nổi bật:**
- **@Audacity88** (distinguished): 8 PR (ZeroCode UX + runtime features)
- **@JordanTheJet**: 7 PR (plugin v0.8.6 fixes)
- **@tidux**: 3 PR (security + tunnel)
- **@vrurg** (trusted/experienced): 2 PR (Anthropic fix + session attachments)

## 🐛 Ổn định & Bugs

**Fixed:**
- **#10950** [✅ closed]: `warn_at_percent` ignored → #11692 fix
- **#11688** [✅ merged]: Concurrent trace writer test tolerate races
- **#11407** [✅ merged]: Live session update render chậm dưới load (event loop block 200ms)

**In-progress:**
- **#11418** [P3, S1]: Copy button không hoạt động (ZeroCode TUI)

**High-risk open:**
- **#11822**: Command injection via subshell boundaries (security policy)
- **#11803**: Lifecycle lock permissions

## ✨ Yêu cầu tính năng

**Merged:**
- **#8383** [✅]: Runtime context hiển thị dashboard
- **#11490** [✅]: Empty config guide

**Open:**
- **#11456**: Memory watchdog cho shell subprocess
- **#10407**: Persistent session attachments (SQLite-backed)
- **#11633**: File path links clickable
- **#11457**: Session refresh không cancel
- **#11463**: File write diffs
- **#11845/11846**: OpenRouter balance tracking (opt-in)

## 💬 Phản hồi người dùng

**Pain points:**
- Copy button broken → block workflow (S1)
- Budget warnings không hiện → tracking khó
- File paths trong transcript không click được
- Session refresh phải cancel → mất context

**Đã giải quyết:**
- Runtime context mờ ám → dashboard rõ ràng
- Empty config sections không giải thích → có guide

## 🗺️ Backlog & Roadmap

**Plugin ecosystem** (v0.8.6 focus):
- 7 fixes cho permission, egress, config handling
- WebAssembly host stable

**Security hardening:**
- Command parser complete (subshells, substitutions)
- Memory limits cho subprocess
- File permissions audit

**ZeroCode maturity:**
- UX gaps fill (refresh, links, diffs, elicitation)
- Performance (render lag fix)
- Observability (delegate tools, cost warnings)

**Architecture evolution:**
- Daemon centralization (config, lifecycle)
- Persistent state (session attachments SQLite)
- Auth modernization (OIDC)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 19/10/2026

## 🎯 Tóm tắt hôm nay

Bot tự động đánh stale hàng loạt issue/PR cũ. Không có hoạt động phát triển mới. Hai PR fix lỗi nghiêm trọng (cron report sai, Telegram channel đứng) vẫn chờ review từ 8 ngày trước.

## 📦 Releases

Không có release.

## 🚀 Tiến độ dự án

**PR chờ merge:**
- **#3424, #3425** (11/10, @sstpnk): Fix 2 lỗi production nghiêm trọng
  - Cron job luôn báo `ok` dù thất bại → gateway nuốt error
  - Telegram long-poll không có timeout → channel treo vĩnh viễn khi proxy/tunnel chết
  - Đã có code fix nhưng không ai review 8 ngày
- **#3416** (05/10, @lookevink): Thêm Sendblue channel cho iMessage/SMS
  - Draft PR, chưa hoàn thiện
- **#1556, #1040**: PR cũ merge nhiều fix nhỏ → đóng hôm nay

**Xu hướng:** Maintainer không active. PR quan trọng bị bỏ quên.

## 💬 Điểm nổi bật cộng đồng

Không có. Tất cả issue/PR đánh stale đều zero tương tác trong 14 ngày qua.

## 🐛 Ổn định & Bugs

**Lỗi production chưa fix:**
1. **Cron job (#3423, #3425)**: Tất cả job fail đều ghi `lastStatus=ok` → monitoring vô dụng
2. **Telegram channel (#3422, #3424)**: Long-poll không có timeout → khi proxy/connection chết, channel treo vĩnh viễn mà process vẫn sống
3. **Web UI lag (#3281)**: Input box lag nặng khi chat history dài → đóng vì stale, chưa fix

**Mức độ nghiêm trọng:** Lỗi 1, 2 phá vỡ reliability trong production. Người dùng không biết job fail, bot telegram có thể ngừng hoạt động mà không có cảnh báo.

## ✨ Yêu cầu tính năng

**#3416 - Sendblue integration**: Cho phép user nhắn tin iMessage/SMS với agent. Draft PR có guide setup account, webhook. Cần review và hoàn thiện.

## 📢 Phản hồi người dùng

Không có phản hồi mới. Issue/PR cũ không được trả lời trong 2 tuần → bot đánh stale tự động.

## 🗺️ Backlog & Roadmap

Không có thông tin roadmap. Dựa vào PR đang mở:
- Fix reliability bugs (cron, telegram) → ưu tiên cao
- Thêm channel mới (iMessage/SMS) → đang phát triển
- Web UI performance → bị bỏ quên

**Tình trạng:** Dự án thiếu maintainer active. Bug nghiêm trọng không được xử lý, PR fix code nằm chờ.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 19/10/2026

## 🔍 Tóm tắt hôm nay

Ngày merge lớn: 4 PR đóng (templates từ chat, bug cơ sở dữ liệu, cross-session context). Còn 5 issue bug mới mở (transcript ~512MB, test flaky, network retry, AWS auth). Công việc tập trung vào ổn định core và khả năng tạo agent động.

## 📦 Releases

Không có release.

## 🚀 Tiến độ dự án

**Merged:**

- **#4112** - Tạo agent từ template trong chat. Trước: chỉ tạo blank agent qua `create_agent()`. Sau: chọn template từ thư viện hoặc local, agent tự spawn agent khác với persona định sẵn
- **#4113** - Template picker đọc `index.json` thay vì scan `plugin.json`. Setup nhanh hơn, không cần shallow-clone toàn repo
- **#4119** - Command-gate denial không ghi `outbound.db` nữa. Trước đó gây conflict với container agent-runner
- **#4118** - Agent-runner retry khi đọc `inbound.db` bị race condition (Docker Desktop không sync SQLite lock)
- **#4120** - Template create bỏ qua folder của group chưa spawn. Fix lỗi khi group tồn tại trong DB nhưng chưa có folder
- **#4092** - Cross-session context: reply của agent từ thread khác hiện dạng "you" thay vì tên agent, tránh agent nhầm mình là ai khác

**Đang review:**

- **#4086** - `/add-dashboard` đọc transcript streaming thay vì load toàn file. Giải quyết crash khi >512MB (Node max string length)
- **#4090** - Approval card escape untrusted text thành plain text. Security: tránh agent inject markup vào approval prompt
- **#4121** - Folded follow-up stamp đúng routing ID vào answer
- **#4043** - Sendblue iMessage/SMS skill (10/06, vẫn open). Webhook ingress, operator DM, numbered approval reply

**Closed nhỏ:**

- **#4122** - Fix lint `no-unsafe-finally` trong `add-onecli`

## 💬 Điểm nổi bật cộng đồng

Không có PR/issue nào có nhiều reaction. Cộng đồng nhỏ, activity từ core team và contributors thường xuyên.

## 🐛 Ổn định & Bugs

**Critical:**

- **#4127** - `/add-dashboard` pusher stop update khi transcript >512MB. Root cause: `fs.readFileSync` tạo string vượt giới hạn Node. #4086 đang fix bằng streaming read
- **#4124** - AWS trả "no basic auth credentials" khi setup pull Docker image. Blocker cho first-run experience

**Medium:**

- **#4126** - Test `slack-auto.test.ts` fail khi host có `NANOCLAW_CHANNELS_REMOTE` env. Test không isolate env
- **#4125** - Signal managed-daemon setup fail không tag `NetworkError`, retry logic không chạy
- **#4123** - Flaky test `setup/gateways/selection.test.ts` "detects installed gateway from nested pnpm"

**Resolved hôm nay:**

- Docker Desktop SQLite lock race (#4118)
- `outbound.db` conflict từ command-gate (#4119)
- Template create folder collision (#4120)
- Cross-session agent identity confusion (#4092)

## ✨ Yêu cầu tính năng

- **#4043** (10/06) - Sendblue iMessage/SMS channel. Cho phép agent DM qua SMS/iMessage, bao gồm approval flow
- **#4112** (merged) - Template-based agent creation trong chat. Giảm effort tạo agent mới, tái sử dụng persona patterns

## 👥 Phản hồi người dùng

Không có comment hoặc discussion công khai. Issues đều 0 comment, core team tự mở và tự fix.

## 📋 Backlog & Roadmap

**Inferred từ activity:**

1. **Channels expansion** - iMessage/SMS (#4043) đang pending merge. Có thể mở rộng thêm messaging platforms
2. **Scalability** - Transcript size (#4127), database lock (#4118) cho thấy focus vào production edge cases
3. **Security hardening** - Approval card sanitization (#4090), command-gate isolation (#4119)
4. **DX improvements** - Template library (#4112, #4113) làm onboarding dễ hơn, test stability (#4123, #4126)

**Next likely moves:**

- Merge #4086 (dashboard streaming) để close #4127
- Fix AWS auth (#4124) - blocker cho new users
- Stabilize test suite (#4123, #4126)
- Merge hoặc close #4043 (Sendblue) - PR cũ nhất đang open

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo hoạt động IronClaw - 2026-10-19

## 🔍 Tóm tắt hôm nay

Ngày bảo trì dependencies chủ yếu. Dependabot mở 6 PR nâng cấp thư viện Rust và GitHub Actions. Bug về special characters (#8025) đóng sau 6 tuần. PR tích hợp Sendblue iMessage/SMS vẫn đang review.

## 📦 Releases

Không có.

## 🚀 Tiến độ dự án

**PR đang mở:**
- #8127 (lookevink): Extension Sendblue cho iMessage/SMS - tích hợp messaging vào agent workflow, credentials trong host, webhooks xác thực
- #8142: Bump 41 dependencies Rust (thiserror 2.0.21, uuid 1.28.0, base64...)
- #8141: Bump tokio ecosystem (tokio 1.53.3, tokio-test 0.4.6, tokio-util...)
- #8140: Bump serde_json 1.0.151→1.0.154
- #8133: Bump 10 GitHub Actions (claude-code-action 1.0.247, setup-node 7.1.0...)
- #8139: Bump source-map-js 1.2.1→1.2.2
- #7834 (mở từ 23/8): Bump wasm group - wasmtime, wit-component - chưa merge 2 tháng

**PR đã đóng:**
- #8134: Duplicate của #8142, đóng vì superseded
- #8132: Duplicate của #8141, đóng vì superseded

**Xu hướng:** Dự án focus bảo trì, cập nhật dependencies định kỳ qua Dependabot. Không có feature PR mới từ core team.

## 💬 Điểm nổi bật cộng đồng

Cộng đồng im lặng - không có PR hoặc issue nào có interaction (0 thumbs up trên tất cả items). PR Sendblue (#8127) từ contributor nhưng chưa có comment review nào.

## 🐛 Ổn định & Bugs

**Bug đã fix:**
- #8025: Special characters bị strip/gây lỗi - đóng 18/10, liên quan encoding changes ở release trước. Resolution không rõ do không có comments.

**Dependencies đang update:**
- Tokio 1.53.1→1.53.3: likely stability fixes
- serde_json 1.0.151→1.0.154: 3 patch versions
- 41 packages trong "everything-else" group

Không có bug report mới.

## ✨ Yêu cầu tính năng

#8127 đề xuất tích hợp Sendblue API:
- Phone pairing cho iMessage/SMS
- Authenticated webhooks receive messages
- Terminal replies trực tiếp từ agent
- Stored DM targets trong conversation path

Agent có thể gửi/nhận tin nhắn điện thoại như extension.

## 📣 Phản hồi người dùng

Không có discussion, comments hoặc feedback trong 24h qua. Issue #8025 có 1 comment nhưng không hiển thị nội dung.

## 📋 Backlog & Roadmap

**Backlog:**
- PR #7834 (WASM dependencies) pending 2 tháng - có thể có conflict hoặc breaking changes cần resolve
- PR #8127 (Sendblue) chờ review

**Roadmap:** Không có thông tin công khai. Dựa vào activity pattern - focus maintenance, dependency hygiene. Không thấy major feature development.

---

**Kết luận:** Ngày bình thường với maintenance work. Dự án ổn định, không có urgent issues. Community engagement thấp - có thể team nhỏ hoặc communication diễn ra ngoài GitHub.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw – 2026-10-19

## 📋 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào **sửa lỗi giao diện Console và tích hợp kênh**: 10 PR được tạo giải quyết bugs từ v2.2.2 (input không xóa sau khi gửi, custom channel config bị stringify thành `[object Object]`, Matrix paste bị space thừa). Cộng đồng báo cáo **DingTalk giảm cấp Markdown khi message >3500 chars** và **QQ group bot im lặng bỏ qua message** do gateway event không khớp.

## 🚀 Tiến độ dự án

### PR quan trọng (10 PR, 7 merged/1 closed sáng nay)

**Bugs Console & Channel đã fix:**
- **#8282** [CLOSED]: giữ repetition thresholds hiển thị/editable
- **#8301**: giải mã tên file ZIP tiếng Trung từ Windows (CP437→UTF-8)
- **#8302**: giữ consumer task cho đến khi cleanup xong (tránh `Task was destroyed but pending`)
- **#8303**: gửi approval prompts về đúng chat channel (trước đó chỉ hiện console, WeChat/Feishu không nhận được)
- **#8304**: normalize Matrix user ID/token paste (trim whitespace)
- **#8305**: giữ cấu trúc JSON cho custom channel config (không stringify thành `[object Object]`)
- **#8309**: discover Ollama models trước khi activate (tránh reject model có sẵn)

**Web search:**
- **#8314**: thêm DeepSeek Search provider (có publication date + authority tier)

**Chất lượng:**
- **#8308**: fix 3 integration test assertions (405 thành 404, align với routes hiện tại)
- **#8170**: tolerate DOM mutation errors + chunk retry (#7889 rebase)

### Xu hướng phát triển

- **Bug fixes for v2.2.2 aftermath**: Console input không clear (#8300), QQ group message drop (#8313), Feishu 426 error khi có HTTP_PROXY (#8315)
- **Channel reliability**: consumer lifecycle, approval delivery, credential normalization
- **I18n edge cases**: Chinese Windows ZIP encoding, Matrix paste whitespace

## 🔥 Điểm nổi bật cộng đồng

**#8278** (6 comments) – **DingTalk message >3500 chars bị giảm xuống plain text**, mất hết Markdown/table. User yêu cầu tái sử dụng `split_text` để split message giữ formatting.

**#8313** – **QQ group bot im lặng bỏ qua message** vì gateway gửi `GROUP_MESSAGE_CREATE` nhưng `_MESSAGE_EVENT_SPECS` chỉ biết `GROUP_AT_MESSAGE_CREATE`.

**#8315** – **Feishu channel fail với 426 Upgrade Required** khi `HTTP_PROXY` được inject nhưng `NO_PROXY` không có `feishu.cn`.

## 🐛 Ổn định & Bugs

### Bugs đang fix (merged today):
1. **Console input không clear sau khi send** (#8300) – clear phụ thuộc session active status, đã fix
2. **Custom channel config hiển thị `[object Object]`** (#8305) – render JSON formatted trong multiline editor
3. **Matrix paste credentials có space** (#8304) – normalize strip whitespace
4. **Approval prompts không gửi về chat channel** (#8303) – chỉ hiện console, WeChat/Feishu timeout sau 5 phút
5. **Chinese Windows ZIP filenames mojibake** (#8301) – decode CP437→UTF-8
6. **Consumer task destroyed nhưng pending** (#8302) – giữ reference đến cleanup xong

### Bugs chưa fix (open issues):
- **DingTalk >3500 chars mất Markdown** (#8278) – cần split message giữ formatting
- **QQ group message drop** (#8313) – event name không khớp
- **Feishu 426 với HTTP_PROXY** (#8315) – thiếu `NO_PROXY=feishu.cn`
- **Ollama model reject sau khi discover** (#8309) – PR đã gửi
- **Long filename atomic write reject** (#8306) – `.tmp` suffix làm vượt 255 byte limit

## ✨ Yêu cầu tính năng

1. **#8307** – QQ Bot hỗ trợ stream message send (như Feishu)
2. **#8310** – Console model switch UI phức tạp, đề xuất **model favorites** để toggle nhanh; **thinking control** hiện bị lock
3. **#8311** – HarmonyOS plugin host: chuẩn hóa `window.QwenPaw` contract + data bridge + signature verification

## 💬 Phản hồi người dùng

- **Trải nghiệm tốt:** v2.2.2 có model switch per session
- **Pain points:**
  - Model switch popup quá nhiều click (cần favorites)
  - DingTalk long message mất formatting (business critical cho reports/tables)
  - QQ group bot không nhận message (silent drop, không log)
  - Feishu corporate proxy environment không hoạt động

## 📅 Backlog & Roadmap

Không có roadmap công khai trong dữ liệu. Từ activity patterns:

**Ngắn hạn:**
- Fix QQ group event dispatch (#8313)
- DingTalk message splitting giữ Markdown (#8278)
- Feishu proxy bypass (#8315)
- Long filename atomic write (#8306)

**Trung hạn:**
- QQ stream message support (#8307)
- Console model favorites UI (#8310)
- HarmonyOS plugin host contract (#8311)

**Dài hạn (inferred từ old issues):**
- CoPaw offline Qwen 3/3.5 connection (#1453, 4 comments, từ 2026-03-13)

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*