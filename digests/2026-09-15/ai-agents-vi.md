# Bản tin Hệ sinh thái Hermes Agent 2026-09-15

> Issues: 90 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-15 02:00 UTC

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

# Báo cáo Hermes Agent — 2026-09-15

## 📊 Tóm tắt hôm nay

Dự án gặp wave đóng duplicate issues lớn (18 issues), đồng thời ship nhiều fix quan trọng cho state.db WAL corruption, Desktop bot-mode group chat, và provider compatibility (OpenCode-Zen, NVIDIA NIM, DeepSeek). Cộng đồng report nhiều vấn đề Windows platform và remote gateway auth.

---

## 🚀 Releases

### v0.21.3 (v2026.9.14)
- **Patch release** gộp ~338 PRs từ v0.21.2
- Mục tiêu: ship remote-gateway sign-in fixes cho Cloud users
- Fix chính: **Remote dashboard sessions ko expire khi refresh burst** (#11006)
- Tag ổn định cho Docker images, Hermes Cloud, hosted deployments

---

## 🔨 Tiến độ dự án

### PRs nổi bật (merged/landing hôm nay):

**State.db reliability wave** (#111389):
- 7 PRs landed xử lý WAL corruption trên multi-writer scenarios
- #103339: lazy flock single-writer gate (field-verified)
- #109966: WAL hand-off chain fix, ko reproduce sau e16f6867
- #111433: warn khi state.db trên virtiofs/9p mount (fail-closed)

**Bot Mode improvements**:
- #111283: group follow-ups và late replies giờ stay visible (#92003, #105247)
- #111432: live-DM intent files cleanup sau delivery
- #111431: Desktop show "Summarizing thread" thay vì bare spinner khi compress
- #111428: xóa machine khỏi Connections giờ clear relay roster

**Provider fixes**:
- #111437: OpenCode-Zen encrypted-reasoning và NVIDIA NIM tool-content 400s recover thay vì poison session (#111309, #111231)
- #111434: Z.AI vision fallback dùng `glm-5.3-flash` thay `glm-5v-turbo` (404)
- #107389 closed: DeepSeek `deepseek-flash` rewrite issue

**Desktop stability**:
- #111427: hung remote SSH probes kill trên remote thay vì pile orphans (#110478)
- #111424: switch gateway restore last-used profile (#110819)
- #105836 (P1): runtime discovery off main event loop (Windows responsiveness)

**MCP/tool fixes**:
- #111354: isolate dashboard-served profile connections (P1, #111151)
- #111425: cron toolset resolution fail-closed (#111380)
- #111430: one-shot notify follow-up ko lost khi child finish mid-publish (CI flake)

---

## 💬 Điểm nổi bật cộng đồng

**Top issues theo bình luận**:

1. **#97681 (28 comments)**: Bot Group Chats phải keep working sau khi Desktop đóng — cần gateway-level persistence
2. **#77111 (25 comments)**: RFC RealtimeVoiceProvider ABC — 4 duplex-voice PRs cần interface chung, ko phải merge queue
3. **#109966 (14 comments)**: state.db WAL generation hand-off crash — fixed sau 2 PRs
4. **#100896 (13 comments)**: state.db corruption x4 trong 5 tuần (gateway+dashboard multi-writer WAL)

**Vấn đề user quan tâm**:
- **Windows platform pain**: wake word crash (#109982), service enum abort (#97004), sandbox issues
- **Remote gateway auth**: desktop WebSocket upgrade ko forward cookie (#101758)
- **Platform adapters**: Matrix token expiry 3-4h (#93929), Feishu group message withhold (#111426), SimpleX DM delivery fail (#63109)

---

## 🐛 Ổn định & Bugs

### P1 issues đang active:

**state.db / session corruption class**:
- #100896: 4 incidents trong 5 weeks, multi-writer WAL
- #109966: WAL hand-off fixed, awaiting-reporter verify
- #103339: second writer via `doctor --fix` corrupts live-WAL → flock gate landed

**Desktop**:
- #94811: session-scoped RPCs collapse onto primary connection (4001 session not found)
- #103786: runtime discovery blocking main loop (Windows hang)
- #110478: remote SSH probe orphans (#111427 fixing)

**Gateway/Platform**:
- #111151: MCP connections ko isolate profiles trong dashboard (#111354 fixing)
- #69310: Signal adapter health check hit nonexistent endpoint
- #93929: Matrix access token expires ~3.5h (matrix.org MAS), no refresh support

### Wave đóng duplicates:
#111084 đề xuất batch-close 18 open duplicates có canonical đã landed → giảm triage noise

---

## ✨ Yêu cầu tính năng

**Active feature requests**:

1. **#77111 (innovation)**: RealtimeVoiceProvider ABC — 3+ duplex-voice PRs cần interface, ko merge one-by-one
2. **#9154**: Feishu/Lark auto-thread với topic-level session isolation (giống Discord)
3. **#88028**: `decline` unauthorized-DM behavior — one-time polite decline thay pairing code
4. **#98616**: Bot Mode room limits config-driven (hardcoded `GROUP_CHAT_MAX_ROUNDS=3` hiện tại)
5. **#90411**: CI-ready JSONL event output cho one-shot runs (`hermes chat -q --format stream-json`)

**Desktop UX requests**:
- #110819: switch gateway restore last-used profile → #111424 landed
- #111262: remove machine khỏi Connections clear relay roster → #111428 landed

---

## 📣 Phản hồi người dùng

**Pain points báo cáo nhiều**:

**Windows platform**:
- Wake word kill gateway (sentencepiece 0.2.2 access violation) → #109982
- Service enum fail khi ANY third-party service PAUSED → #97004
- Sandbox fixup cần run mỗi pack → #51334

**Remote/Cloud setup**:
- Dashboard sessions expire on refresh → fixed v0.21.3
- WebSocket upgrade miss gateway cookie → #101758 fixing
- SSH probe hang leave orphans → #111427 fixing

**Platform adapters**:
- Matrix token rotation (MAS) ko support → #93929
- Feishu group messages withhold with `channel` UA tag → #111426 fixing
- Discord voice latency (~15s) vs accuracy tradeoff → #94462

**File tools security**:
- Windows NT/device-namespace paths NTLM leak → #91928 hardening
- Symlinked skills false security warning → #35674
- Stale write_file overwrites → #91238 fixing

---

## 📋 Backlog & Roadmap

**Đang consolidate**:
- **State.db reliability wave** (#111389): gộp evidence từ 7+ corruption reports, WAL hand-off fixes landed
- **Skills-guard v4 refinements**: #37040 cap documented-example findings thay demote all markdown

**Sắp landing**:
- Desktop runtime discovery off main loop (#105836) — P1 Windows responsiveness
- MCP profile isolation (#111354) — P1 dashboard multi-profile
- Feishu group message fix (#111426) — remove `channel` UA tag

**Long-term (RFCs/innovation)**:
- RealtimeVoiceProvider ABC (#77111) — 4 competing duplex-voice PRs cần interface
- Bot Group Chats gateway persistence (#97681) — Desktop close ko kill chat

**Deprecation/cleanup**:
- Wave close 18 stale duplicates (#111084)
- contributors/emails case-collision fix (macOS APFS) → #89200 closed

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-15

## 📊 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 2026-09-15 trong giai đoạn **consolidation + security hardening**. 9 dự án active với profile khác biệt rõ:

- **3 mature projects** (Hermes, OpenClaw, Zeroclaw): focus stability, enterprise readiness, community scale
- **3 mid-tier** (NanoBot, NanoClaw, QwenPaw): feature velocity cao, reactive bug fixing
- **3 niche/experimental** (PicoClaw, NullClaw, IronClaw): low activity, specialized use cases

**Xu hướng chung**: Gateway architecture, MCP protocol adoption, multi-provider support, desktop-first deployment. Security incidents drive wave fixes (WAL corruption, auth bypass, credential leaks).

## 📈 2. Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | PRs Merged/Day | Community Signals | Stage |
|-------|--------|-----|----------|----------------|-------------------|-------|
| **Hermes Agent** | 90 | 500 | 1 (v0.21.3) | ~10-15 | 🔥 High (28 comments top issue) | Mature |
| **OpenClaw** | 72 | 500 | 0 | ~10 | 🔥 High (30 comments #97616) | Mature |
| **QwenPaw** | 17 | 50 | 0 | 30 (spike) | 🔥 Medium (6 comments top) | Growing |
| **NanoClaw** | 4 | 50 | 0 | 7 | 💬 Low (single power user) | Stabilizing |
| **NanoBot** | 6 | 24 | 0 | 11 | 💬 Low (WebUI focus) | Polish phase |
| **Zeroclaw** | 3 | 50 | 0 | 7 | 💬 Medium (security driven) | Hardening |
| **NullClaw** | 4 | 0 | 0 | 0 | 💭 Minimal (feature requests only) | Planning |
| **PicoClaw** | 1 | 2 | 0 | 0 | 💭 Silent (sprint planning) | Pre-release |
| **IronClaw** | 1 | 1 | 0 | 0 | 💭 None (internal) | Research |

**Legend**: 🔥 Active community | 💬 Small but engaged | 💭 Low/internal

## 🎯 3. Vị thế Hermes Agent

### Strengths
- **Ecosystem leader**: Highest issue count (90), active community (28 comments top thread), production user base rộng
- **Platform coverage**: Windows + macOS + Linux + Cloud deployment mature
- **Reliability focus**: Dedicated wave fixes (state.db corruption 7 PRs, Desktop stability improvements)
- **Provider ecosystem**: Handles most providers (OpenCode-Zen, NVIDIA NIM, DeepSeek, Z.AI)
- **Bot Mode innovation**: Group chat persistence, gateway-level state management

### Weaknesses vs Competitors
- **Windows pain points**: Wake word crashes, service enum bugs, sandbox issues - worse than OpenClaw/NanoBot
- **Gateway complexity**: Remote auth issues, session expiry problems - simpler in NanoBot
- **State.db multi-writer**: 4 corruption incidents in 5 weeks - architectural debt
- **Platform adapter lag**: Matrix token rotation missing, Feishu withhold bugs

### Positioning
Hermes = **enterprise-grade general purpose agent**. Trade complexity for breadth. Target: teams needing multi-platform + multi-provider + bot persistence. Competition:
- OpenClaw: lighter, better CLI, fewer Windows issues
- QwenPaw: Chinese market dominance, data analysis focus
- NanoBot: simpler WebUI, mobile-first

## 🔧 4. Hướng Kỹ thuật Chung

### Adopted by ≥5 projects:
1. **Gateway architecture** (8/9): Centralized state/routing, desktop connects via WebSocket. Only IronClaw unclear.
2. **MCP protocol** (7/9): Tool/skill abstraction layer. Hermes, OpenClaw, NanoClaw, Zeroclaw, NullClaw, QwenPaw, IronClaw.
3. **Multi-provider SDK** (8/9): Unified interface cho OpenAI/Anthropic/local. PicoClaw unknown.
4. **CLI-first auth** (6/9): `*-cli` providers bypass API keys. Hermes, OpenClaw, NullClaw, Zeroclaw, NanoBot, QwenPaw.
5. **Desktop client** (7/9): Electron/Tauri app. Hermes, OpenClaw, NanoBot, NanoClaw, Zeroclaw, QwenPaw, NullClaw.

### Emerging patterns (2-4 projects):
- **State.db SQLite** (Hermes, OpenClaw): Multi-writer WAL corruption shared problem
- **Docker sandbox** (Zeroclaw, OpenClaw): Configurable image, security isolation
- **Realtime voice** (Hermes #77111): Duplex voice provider ABC, no consensus yet
- **Agent-to-agent** (NanoClaw #3813, QwenPaw): Structured handoff ledgers

### Tech debt clusters:
- **Platform-specific bugs**: Windows service/wake-word (Hermes, OpenClaw), macOS Cookie sync crash (Zeroclaw)
- **Auth complexity**: Gateway session management, remote WebSocket upgrade (Hermes, OpenClaw)
- **Provider error classification**: Raw error text leaks (NanoClaw, QwenPaw), HTML interstitial misreported (QwenPaw)

## ⚡ 5. Điểm Khác biệt

### Feature Strategy

| Dimension | Hermes | OpenClaw | QwenPaw | Others |
|-----------|--------|----------|---------|--------|
| **Scope** | Kitchen sink | Modular core | Data analysis focus | Single-purpose |
| **Target** | Enterprise teams | Power users + teams | Chinese researchers | Niche |
| **Voice** | Bot Mode + realtime | Planning | Not priority | N/A |
| **Platform** | Multi-OS parity goal | CLI-first, desktop secondary | Desktop-first | Desktop only |
| **Provider** | Max coverage | Quality over quantity | Chinese models first | Minimal |

**Hermes = breadth**, OpenClaw = **depth + stability**, QwenPaw = **vertical specialization**.

### Community Model

**Hermes**: Large distributed, many reporters, high noise. 18 duplicate issues need batch close (#111084).

**OpenClaw**: Medium engaged, P0/P1 triage clear, proof-driven PRs (#148656 platinum tier).

**QwenPaw**: Security audit driven, 30 PRs in 1 day spike, first-time contributors active (7 PRs).

**NanoClaw**: Single power user (@DawoudIO) dominates bug reports + fixes. Small team, high signal.

**NanoBot**: Desktop UX polish, but mobile broken (4 issues same day @morandot). Desktop-centric development.

**Zeroclaw**: Security-first, long review cycles (8 days #10077 unmerged). High barrier to merge.

### Release Cadence

- **Hermes**: Patch releases frequent (v0.21.3 for hotfix)
- **OpenClaw, QwenPaw, NanoClaw, NanoBot, Zeroclaw**: No releases, continuous deployment or pre-1.0
- **PicoClaw, NullClaw, IronClaw**: Planning phase, no stable artifacts

## 👥 6. Mức độ Trưởng thành Cộng đồng

### Tier 1: Mature (Hermes, OpenClaw)
- **Signals**: 
  - High issue volume (72-90)
  - Multi-commenter threads (25-30 comments)
  - Duplicate management needed
  - Production incident reports (state.db corruption, gateway crashes)
  - Platform diversity pain (Windows, macOS, Linux)
- **Health**: Strong but noisy. Needs triage automation.

### Tier 2: Growing (QwenPaw, Zeroclaw)
- **Signals**:
  - Security audit findings (30 PR spike QwenPaw, OIDC work Zeroclaw)
  - First-time contributors active
  - Medium engagement (4-6 comments)
- **Health**: Feature velocity high, community forming. Risk: technical debt from speed (QwenPaw).

### Tier 3: Stabilizing (NanoClaw, NanoBot)
- **Signals**:
  - Low issue count (4-6)
  - Single active contributor or small team
  - Reactive bug fixing
- **Health**: Functional but fragile. Depends on 1-2 people. NanoBot mobile regression shows desktop bias.

### Tier 4: Planning/Internal (PicoClaw, NullClaw, IronClaw)
- **Signals**:
  - Feature requests only, no bug reports
  - Zero PR activity or internal-only
  - No releases
- **Health**: Early or private. IronClaw likely research tool, not open source product.

## 🔮 7. Tín hiệu Xu hướng

### Short-term (1-3 months)

1. **State management consolidation**: Hermes + OpenClaw state.db corruption wave → SQLite WAL alternatives or lock management libraries emerge.

2. **MCP tooling maturity**: 7 projects using MCP, pero error handling immature (Java/Kotlin envelope bugs #7729 QwenPaw, timeout crashes #144911 OpenClaw). Expect:
   - Standard MCP error taxonomy
   - Timeout/retry patterns
   - MCP server health checks

3. **Windows platform parity**: Hermes + OpenClaw Windows issues worse than macOS/Linux. Either:
   - Dedicated Windows sprint, or
   - Drop Windows support claims

4. **Mobile experience**: NanoBot 4 mobile bugs same day → desktop-first projects add mobile testing or drop PWA claims.

### Mid-term (3-6 months)

1. **Agent-to-agent protocols**: NanoClaw #3813 durable handoff ledger, QwenPaw subAgent patterns → standardized A2A communication layer. Likely MCP extension.

2. **Voice interface maturity**: Hermes #77111 RealtimeVoiceProvider ABC → industry standard emerges. Discord latency tradeoff (#94462) suggests quality bar still low.

3. **Provider SDK consolidation**: 8 projects maintain parallel provider abstractions. OpenAI releases agent SDK → some projects drop custom layers, others stay independent.

4. **Enterprise hardening**: Zeroclaw OIDC (#10255), Hermes gateway auth, OpenClaw credential leaks → security-first branches for SOC2/ISO27001 compliance.

### Long-term (6-12 months)

1. **Market segmentation clarity**:
   - **Enterprise**: Hermes (breadth) vs OpenClaw (stability)
   - **Research/Chinese**: QwenPaw dominance
   - **Indie/self-host**: NanoBot simplicity
   - **Specialized**: Niche tools die or find vertical (IronClaw benchmark focus)

2. **Gateway architecture limits**: Multi-writer state.db issues, event loop blocks (#119720 OpenClaw 632-agent fleet) → distributed state or service mesh. Single-gateway design breaks at scale.

3. **Consolidation wave**: 9 projects unsustainable. Expect:
   - 2-3 projects absorb others (Hermes acquires smaller, or OpenClaw forks as "OpenHermes")
   - 3-4 die quietly (PicoClaw, NullClaw, IronClaw candidates)
   - 2-3 survive as specialized forks

4. **Standards emergence**: MCP becomes to agents what LSP is to editors. Non-MCP projects forced to adopt or integrate.

---

## 🎖️ Kết luận Chiến lược

**Hermes Agent**: Leader nhưng technical debt cao (state.db, Windows, gateway complexity). Cần:
- State management refactor (P0)
- Windows platform sprint or deprecation decision
- Gateway scaling limits address (before hit OpenClaw's 632-agent wall)
- Duplicate issue cleanup automation

**Threat**: OpenClaw lighter + stabler → enterprise adoption risk. QwenPaw Chinese market lock-in.

**Opportunity**: Bot Mode + realtime voice differentiation. Agent-to-agent standard leadership. Maintain breadth advantage while improving stability.

**Watch**: State.db alternatives (if Hermes + OpenClaw both move, industry shift). MCP error taxonomy proposals. Windows user churn rate.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo Hoạt động OpenClaw - 2026-09-15

## 📊 Tóm tắt hôm nay

Ngày cập nhật tích cực với 30 PR và 72 issue đang hoạt động. Không có release mới nhưng tập trung xử lý bugs nghiêm trọng về stability, crash-loop và memory leaks. Nhiều PR đang đợi review với proof đầy đủ.

## 🚀 Releases

Không có release mới hôm nay.

## 🔧 Tiến độ dự án

**PRs nổi bật (30 PRs):**

- **#148656** (P1 🐚 platinum): Fix plugin CLI backend bị skip khi reuse core model API - đã có proof đầy đủ, ready for review
- **#148310** (P2 🦐 gold): Fix command secret gate skip SecretRefs trên quoted config keys - cần proof  
- **#139344** (P1 🐚 platinum): Fix Windows scheduled gateway offline sau restart - PR quan trọng cho Windows users
- **#147949** (P2 🦐 gold): UI fix giữ queued input trên composer - waiting on author
- **#145534** (P2 🐚 platinum): Reject blank integer channel options - proof đầy đủ

**Xu hướng phát triển:**
- Focus mạnh vào stability và crash prevention
- Nhiều validation fixes cho CLI inputs
- Gateway reliability improvements
- Plugin ecosystem enhancements

## ⭐ Điểm nổi bật cộng đồng

**Issues nhiều tương tác:**

1. **#97616** (30 comments, P1 🦪): **OpenClaw leak zombie processes** từ hook/tool execution - regression nghiêm trọng, degradation theo thời gian

2. **#119720** (20 comments, P1 🦞): **Gateway event loop blocked** bởi synchronous persistence - ảnh hưởng performance ở scale lớn (632-agent fleet)

3. **#144911** (16 comments, P1 🦞): **MCP server timeout crash Gateway** - unhandled rejection trong cleanup path

4. **#145252** (9 comments, P0 🌊): **Tracking issue cho 2026.9.3/9.4 reliability** - coordination scope cho update/upgrade issues

5. **#104992** (5 comments, P1 🦞): **Transcript redaction replayed vào model context** - bảo mật: masked values reused trong tool calls

## 🐛 Ổn định & Bugs

**Critical bugs (P0/P1):**

- **Crash-loop issues:**
  - #134430: macOS crash với Cookie sync enabled (MainActor isolation)
  - #144911: MCP timeout crash toàn bộ Gateway
  - #97616: Zombie process leak gây degradation

- **Update failures (P0):**
  - #148614, #146783, #148545: runtime-verification-failed
  - #148601: doctor --fix broken trên Windows (PowerShell 5.1 exit 2)
  - #148681: finalize:doctor failure

- **Memory & performance:**
  - #141122: AsyncLocalStorage leak - storageList grows unbounded
  - #145184: Gateway block 70-82s hydrating 632 agents, 13-17s mỗi 5 phút

- **Security & auth:**
  - #148387: Fresh install auto-enable codex plugin, widen allow từ machine config
  - #148650: Memory indexer fail resolve SecretRef (401)
  - #144476: Exec auto-reviewer hard-cap 360 tokens

## 💡 Yêu cầu tính năng

**Feature requests:**

- **#7406** (P2 🐚): Human-readable Telegram topic names trong session dropdown - thay vì raw keys như `agent:main:telegram:group:-123456789:topic:42`

- **#45233** (P3 🌊): **FreeBSD support** - yêu cầu build pkg và push vào FreeBSD ports

- **#140646** (P2 🌊): Gateway hook register ledger row khi sub-agent starts - tracking cho native Task/Agent CLI sidechains

- **#147343** (P3 🌊): Status dot trên browser tab favicon (working/done/disconnected)

## 💬 Phản hồi người dùng

**Pain points chính:**

1. **Update/upgrade reliability** rất kém - nhiều báo cáo fail với các mã lỗi khác nhau (runtime-verification, plugin-target-unavailable, finalize:doctor)

2. **Windows experience** yếu - scheduled task offline sau restart, PowerShell issues, doctor broken

3. **Gateway stability** vấn đề ở scale - event loop blocks, zombie leaks, memory leaks

4. **Plugin ecosystem** còn rough edges - CLI backend skip, baseUrl ignored, SecretRef không work trong subprocess

5. **Security concerns** - auto-enable plugins, credential leaks trong errors, redaction bypassed

## 📋 Backlog & Roadmap

**Performance campaign (#145679, #146197):**
- 42 verified landings đã complete
- Focus: reduce repeated work, SQLite optimization, startup efficiency

**Security & safety improvements:**
- Exec approval fixes
- Credential handling trong errors
- Plugin permission defaults

**Platform parity:**
- Windows reliability (scheduled task, PowerShell compatibility)
- FreeBSD support (requested)

**Next probable priorities:**
- Crash-loop và zombie leak fixes (P0/P1)
- Update mechanism reliability
- Gateway scaling issues (event loop blocks)
- Memory leak patches

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-15

## 1. Tóm tắt hôm nay

Ngày polish WebUI và fix regression. Merge 11 PR bug fix + cải thiện UX, 4 issues WebUI mới về mobile/PWA. Zero release.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### Merged (11 PR)

**WebUI polish sprint:**
- #5760: Chat toolbar responsive - float khi rộng, fixed khi hẹp
- #5759: Fix Markdown table render - `display:table` từ Tailwind phá source preview
- #5758: Connection screen gọn hơn - centered, inline validation, collapsible help
- #5743: Settings simplified - Calendar default view, composer tạo automation

**Cron regression fixes:**
- #5686: Timer cancel bug - edit job kill đang-chạy callback
- #5751: Edit automation reset `next_run_at_ms` - skip pending run
- #5762: Accept past `at` value - job never fire

**Provider/API hardening:**
- #5730: Internal model call timeout - force stream với idle timeout 120s
- #5734: Dream prompt conflict - memory skill cấm edit Dream file

**Other:**
- #5684: README refresh - current WebUI screenshots
- #5756: Test hermetic trên host có system proxy (Windows registry/macOS)
- #5673: Remote project path support - honor gateway folder-picker capability

### Open PR (13)

**High-impact:**
- #5769 (P2): NIM timeout string detect - classify `"timed out after 300s"` text, trigger fallback
- #5768 (P1): Feishu QR onboarding broken - `/page/cli` URL thay vì `/page`, fix "Link expired"
- #5767 (P2): Polish localization - 1536 common + 497 channel messages
- #5761 (P2): `edit_file` delete newline sau suffix - join adjacent lines

**API validation:**
- #5765: `stream` field require boolean - `"false"` string truthy bug
- #5763: Multimodal invalid type 400 - phân biệt client error vs 413 file size

**Scheduler:**
- #5766: Reject conflicting cron fields - `every_seconds` + `cron_expr` + `at` mutually exclusive
- #5762: Reject past one-time `at` - skip validation bug

**Provider resilience:**
- #5764: Serialize half-open fallback probes - concurrent request race trong cooldown

**Tool context:**
- #5750: Expose stable `ToolInvocationContext` - ContextVar `tool_call_id` cho tool impl

**Channel:**
- #4919: Telegram custom Bot API base URL + headers - self-hosted/enterprise gateway support

**Conflicts:**
- #5601: Rollback rejected message side effects - cleanup attachments/subscriptions
- #5666: aimlapi.com provider - 1000+ models gateway, partnership offer 50/50 rev share

## 4. Điểm nổi bật cộng đồng

**Mobile UX issues block (4 issues, cùng author @morandot, cùng ngày):**
- #5773: PWA cold start blank screen lâu
- #5772: iOS PWA standalone mode - top viewport washed out/blurred
- #5771: Session list require 2 taps trên mobile
- #5770: Open sidebar auto-focus search button - show `⌘K` tooltip không hover

Mobile experience regression mới discover, chưa có response.

**Blocker cũ:**
- #2804 (4 months): DuckDuckGo `asyncio.to_thread` hang - block toàn bộ session messages
- #5674: Nvidia NIM timeout string stop agent - #5769 fix

## 5. Ổn định & Bugs

**Fixed today:**
- Cron scheduler 3 regression (timer cancel, skip pending, accept past)
- WebUI render bugs (table, toolbar, connection screen)
- Internal timeout on long model calls

**Open critical:**
- Feishu QR onboarding broken (P1) - #5768 fix ready
- NIM timeout detection (P2) - #5769 fix ready
- Mobile UX degradation - 4 issues, no PR yet
- DuckDuckGo hang - 4 months old, no fix

**Pattern:** Merge velocity cao (11 PR/day) nhưng introduce mobile regression. Desktop-first development.

## 6. Yêu cầu tính năng

- #4919: Telegram self-hosted API support - enterprise use case
- #5750: Tool invocation context - stability cho stateful tools
- #5767: Polish i18n - complete localization stack

## 7. Phản hồi người dùng

**Pain points:**
- Mobile web broken - @morandot file 4 issues cùng lúc, frustration cao
- Provider timeout handling immature - string matching band-aid (#5769)
- Feishu onboarding broken từ v0.3.0 - @hammerhoundai cannot complete setup

**Positive:** Không có praise/thanks comments. Functional PR activity only.

## 8. Backlog & Roadmap

**Immediate (based on open PRs):**
- Mobile UX fixes - 4 reported issues
- Provider error classification maturity
- Channel onboarding stability

**Partnership pending:** aimlapi.com integration (#5666) - 50/50 rev share deal, no review/comment yet.

**Technical debt visible:**
- Test hermetic issues on proxy hosts
- Cron scheduler edge cases
- WebUI responsive design gaps

---

**Health:** High velocity (11 merge/day), reactive (fix regressions fast), but mobile web neglected. Desktop quality good, mobile quality poor. Community small (single-author issue batches).

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-09-15

## 1. Tóm tắt hôm nay

Ngày bận rộn với 7 PR merged (security + config + docs), focus vào hardening: pairing code tăng từ 6 số lên 32 ký tự mặc định, max_image_size_mb lên 20 MiB, docker sandbox image giờ configurable. Nhiều security follow-up đang review.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**PRs merged (7)**:
- **#10307**: Pairing code mạnh hơn - thay 6 số (10^6 keyspace) = 32 char alphanumeric mặc định, config `[gateway.pairing_dashboard].code_length` giờ work → đóng #6613 (P1 security issue)
- **#10589**: `multimodal.max_image_size_mb` default lên 20 (trước: 5) - match ceiling, phone photos không bị drop
- **#10745**: Docker sandbox image configurable qua `[security.sandbox].image`
- **#10747**: Refactor transcription manager - 8 channels copy-paste code, gộp lại 1 implementation
- **#10748**: Proxy routing cho outbound HTTP clients - 9 channels bypass proxy, giờ fix
- **#10582**: Attachment image marker qua provider contract, không trust client MIME
- **#10727**: Release announcement compose từ release notes thay vì commit subjects

**PRs active (top priority)**:
- **#10621** (XL): Agent lifecycle coordination - daemon RPC/gateway/channels dùng shared config authority thay vì cloned snapshots, fix race conditions
- **#10813** (M, high-risk): Headless SOP step không được run với full tool registry (bao gồm `sop_execute`), nguy cơ recursion
- **#10381** (XL): Security - resolve host launchers trước khi apply workspace cwd, prevent path traversal
- **#10255** (XL): OIDC token verification provider, JWKS validation
- **#9753** (XL): Config - phân biệt absent vs empty `allowed_tools` trong risk profile

## 4. Điểm nổi bật cộng đồng

- **#6613** (P1, 3 comments): User @sken130 yêu cầu pairing code mạnh hơn → merged #10307
- **#10588**: Request raise `max_image_size_mb` default → merged #10589
- Browser automation opt-in (#9830) và image validation (#9819) đang pending review sau nhiều rounds

## 5. Ổn định & Bugs

**Closed**:
- **#10794**: Windows nextest fail `published_crates_never_include_files_outside_their_own_directory` (S3 minor)

**Active fixes**:
- **#10813**: SOP headless step recursion risk
- **#9753**: Config parsing bug - empty `allowed_tools` array treated as "all tools allowed"
- **#10197**: ACP interrupted turn progress loss
- **#10381**: Sandbox path resolution vulnerability

## 6. Yêu cầu tính năng

- **#10358** (XL): Mattermost approval prompts - channel không có approval flow
- **#10351** (L): Execution-tree iteration budgets - prevent runaway delegation
- **#9971**: Discord role-based authorization thay vì user ID hardcode
- **#10840** (L): Generate llms.txt/llms-full.txt từ mdBook cho AI context
- **#10578**: Web `/upload` slash command cho image picker (merged)
- **#9272**: Anthropic refusal handling với fallback notices

## 7. Phản hồi người dùng

- Pairing code 6 số quá yếu → fix merged
- Image size 5 MiB quá thấp cho phone photos → fix merged
- Discord team management bằng user ID list khó maintain → PR pending
- Config docs sai (claim configurable nhưng hardcoded) → nhiều fix merged

## 8. Backlog & Roadmap

**Security hardening track** (nhiều PR stage 4-5):
- OIDC provider (#10255)
- Risk profile config (#9753)
- Sandbox isolation (#10381)
- Browser automation opt-in (#9830)

**Runtime stability**:
- Agent lifecycle coordination (#10621)
- Execution budgets (#10351)
- ACP persistence (#10197)

**Channel expansion**:
- Mattermost approvals (#10358)
- Discord roles (#9971)

Distinguished contributors (@JordanTheJet, @Audacity88) lead security + runtime work. Many XL PRs pending maintainer final review.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo hoạt động PicoClaw - 2026-09-15

## 🎯 Tóm tắt hôm nay

Dự án tập trung vào lập kế hoạch sprint v0.10.0 với 7 tracks (60-66). Bug QQ channel vẫn đang stale. PR thêm Keenable web search provider đang chờ review.

## 📦 Releases

Không có release mới.

## 🚀 Tiến độ dự án

**PR #3379 - Sprint plan v0.10.0** [CLOSED]
- Design doc chi tiết cho 7 tracks: 60 → 65 → 61 → 62 → 63 → 64 → 66
- Mỗi track sẽ có 1 PR riêng
- Thứ tự triển khai đã định rõ
- Status: merged, sprint bắt đầu

**PR #3370 - Keenable web search** [OPEN]
- Thêm Keenable làm provider cho `web_search` tool
- Không cần API key, chạy ngay trên fresh install
- Chỉ cần set `tools.web.keenable.enabled = true`
- Endpoint: `POST /v1/search/public` với header `X-Keenable-Title`
- Status: stale, chưa được review

**Xu hướng**: Dự án đang trong giai đoạn planning cho major release v0.10.0. Focus vào architecture và multi-track development.

## 💬 Điểm nổi bật cộng đồng

Không có hoạt động nổi bật. Issues và PRs đều có interaction thấp (<5 reactions tổng cộng).

## 🐛 Ổn định & Bugs

**Issue #3365 - QQ channel 401 error** [OPEN, STALE]
- **Root cause xác định**: botgo v0.2.1 + resty >= v2.17 conflict
- Environment: Orange Pi 3B (RK3566, aarch64), picoclaw nightly (0.3.1)
- Error: "Authorization参数格式错误" khi connect QQ channel
- Status: 
  - Opened: 2026-09-04
  - Last update: 2026-09-14 
  - 2 comments, 1 👍
  - Đã diagnose xong nhưng chưa có fix

**Impact**: Block QQ integration cho users dùng aarch64 + latest dependencies.

## ✨ Yêu cầu tính năng

**Keenable web search provider** (PR #3370)
- Public endpoint, zero-config
- Alternative cho các search providers cần API key
- Community contributor: @ilya-bogin-keenable

## 📣 Phản hồi người dùng

Ít feedback. Issue QQ có 1 upvote, cho thấy có users bị impact nhưng không nhiều. Community contribution (Keenable) cho thấy có interest từ third-party providers.

## 🗺️ Backlog & Roadmap

**v0.10.0 Sprint** (từ design doc PR #3379):
- 7 tracks đã plan chi tiết
- Thứ tự: Track 60 → 65 → 61 → 62 → 63 → 64 → 66
- 1 PR/track strategy
- Nội dung cụ thể tracks không có trong data, nhưng design doc đã verify against code

**Next immediate action**: Track 60 PR sẽ mở đầu sprint.

---

**Tổng quan**: Ngày yên ả, tập trung planning. Bug QQ cần attention. Keenable PR cần review để avoid stale lâu hơn.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw ngày 2026-09-15

## 1. Tóm tắt hôm nay

Ngày yên, tập trung dọn lỗi cũ. 2 issue mới mở về lỗi bảo mật (lộ error text ra public channel) và DB lock contention. 7 PR đóng - chủ yếu fix lỗi nhỏ từ tháng 8. Không có release mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đóng hôm nay** (7 cái):
- #3090: Fix template context Markdown prepend
- #3093: Chat typing indicator stay active qua processing turns
- #3094: Telegram bot identity lookup retry khi transient fail
- #3396: Tạo agent từ template trong chat (trước chỉ CLI làm được)
- #3428: Slack agent flow giữ template ref khi tạo sub-agent
- #3465: Chat SDK bump 4.29.0→4.32.0, fix Telegram bỏ message có URL chứa `_` lẻ (OneCLI link bị)
- #3468, #3470-#3471, #3482-#3492: Chuỗi fix nhỏ - typing lifetime declare, pnpm `minimumReleaseAge` hoist, health endpoint, uninstall hardening, auth secret không qua argv, timezone preseed, Codex provider auth

**PR mở quan trọng**:
- #3733, #3746, #3747: Cụm 3 PR add OpenCode skill - provider contract, host auth, cancellation preserve, skill file handling. Lớn, core team.
- #3813: Durable handoff ledger + mission control - structured Slack agent-to-agent delivery, fingerprinted contracts, bounded bot hops. Quan trọng cho A2A safety.
- #3719: Report A2A communication failure về source agent - approval block, rejection, missing reply path notify lại sending agent.

**Xu hướng**: Đang xây structured provider/skill layer (OpenCode integration), cải thiện agent-to-agent communication safety, dọn kỹ thuật nợ Chat SDK và pnpm config.

## 4. Điểm nổi bật cộng đồng

Issue #3814 mới mở - quan trọng **bảo mật**: 
- `deliverErrorResult` post raw SDK error text về channel trigger turn, không check public/private
- Container `claude` subprocess die mid-turn → raw error lộ ra Discord/Slack public channel
- User @DawoudIO báo, chưa có comment thảo luận

Issue #3811 (DB lock contention):
- Central DB không set `busy_timeout` → lock contention throw ngay thay vì retry
- Lỗi nhìn như DB corruption cho caller
- @DawoudIO mở, có PR fix #3812 kèm ngay

Issue #3706 đóng (mount path bug):
- `ncl groups config add-mount --container` accept absolute path nhưng tạo broken double-nested path
- @DawoudIO báo 2026-09-03, đóng 2026-09-14 (11 ngày), 2 comment
- Không thấy PR link rõ ràng

## 5. Ổn định & Bugs

**Lỗi đóng/fix**:
- #3660: Session DB readonly error block message delivery - đóng 2026-09-14
- #3706: Mount path double-nest - đóng 2026-09-14
- Telegram link với `_` lẻ drop message (#3465 fix)
- Discord approval button corrupted `custom_id` (#3458 PR mở)
- Heartbeat stall khi rate-limit (#3251, #3454 PR mở)
- Session DB duplicate message ID (#3459 PR mở - `INSERT OR IGNORE`)

**Lỗi mới phát hiện**:
- #3814: Raw error text leak ra public channel - **bảo mật cao**
- #3811: DB lock contention nhìn như corruption - đã có PR fix #3812

**Chất lượng**: Nhiều lỗi edge case (DB contention, heartbeat timing, Discord button format) - hệ thống phức tạp, đang ổn định dần.

## 6. Yêu cầu tính năng

Không có feature request mới hôm nay. 

Feature đang build:
- OpenCode skill integration (#3733, #3746, #3747)
- Durable A2A handoff ledger (#3813)
- Structured setup driver authentication (#3489)
- In-chat agent template creation (#3396 - đã merge)

## 7. Phản hồi người dùng

User @DawoudIO rất active - mở 2/4 issue và nhiều PR fix. Phát hiện nhiều lỗi production:
- Session DB readonly (#3660)
- Mount path bug (#3706)
- Raw error leak (#3814)
- DB lock contention (#3811)

Chất lượng báo lỗi cao - có error log, reproduction, root cause analysis. Likely heavy production user hoặc core contributor.

Các issue khác ít interaction - 0-2 comment mỗi cái. Community nhỏ hoặc fix nhanh không cần thảo luận.

## 8. Backlog & Roadmap

Không có thông tin roadmap public rõ ràng từ data.

**Infer từ PR patterns**:
- **Hiện tại**: Ổn định Chat SDK integration, fix A2A communication bugs, security hardening
- **Ngắn hạn**: Hoàn thành OpenCode skill (#3733 series), durable handoff (#3813), DB reliability fixes
- **Trung hạn**: Mở rộng provider ecosystem (Codex đã có #3489), structured setup automation

**Kỹ thuật nợ đang dọn**:
- Chat SDK version lag (4.29→4.38)
- pnpm config không hoạt động (`minimumReleaseAge`)
- Heartbeat mechanism timing issues
- DB concurrency handling

Dự án có vẻ ở giai đoạn **post-MVP stabilization** - core features hoạt động, đang dọn edge case và xây layer abstraction cho scale.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# 📊 Báo cáo NullClaw - 2026-09-15

## 🎯 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào đề xuất tính năng: tích hợp Grok CLI, cấu hình endpoint Firecrawl tự host, và giải pháp prepaid search qua apifare.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**PRs**: Không có PR mới.

**Issues quan trọng**:
- **#993** (enhancement): Firecrawl endpoint hardcoded `https://api.firecrawl.dev/v1/search` → chặn self-hosted instance. Cần thêm config option.
- **#975** (feature): Thêm `grok-cli` provider giống pattern `claude-cli`, `codex-cli`, `gemini-cli` - chạy qua session login unmetered.
- **#998 & #997**: Prepaid search qua apifare MCP meter thay vì Brave/Firecrawl API keys trong config.

**Xu hướng**: Tăng tính linh hoạt deployment (self-hosted), giảm phụ thuộc API key bằng CLI providers và prepaid proxy.

## 💬 Điểm nổi bật cộng đồng

**#993** (2 comments, updated 2026-09-14): Vấn đề self-hosted Firecrawl - người dùng cần override endpoint.

**#975** (2 comments, updated 2026-09-14): Grok CLI request - tận dụng subscription có sẵn, tránh thêm API key.

**#998 & #997** (0 comments): Mới tạo hôm nay bởi @iamalanlui - pitch apifare cho prepaid search, chưa có phản hồi.

## 🐛 Ổn định & Bugs

Không có bug report mới. #871 (DuckDuckGo vs Brave/SearXNG trên thiết bị yếu) được reference trong #998 nhưng không có update trực tiếp.

## ✨ Yêu cầu tính năng

1. **Firecrawl self-hosted support (#993)**:
   - Cho phép override `endpoint` trong config
   - Hiện tại bị khóa vào `api.firecrawl.dev`

2. **Grok CLI provider (#975)**:
   - Pattern giống `claude-cli`, `codex-cli`, `gemini-cli`
   - Tận dụng session đăng nhập grok.com
   - Không tính vào API usage

3. **Prepaid search gateway (#997, #998)**:
   - Dùng apifare làm proxy cho Brave/Firecrawl
   - Một bearer token thay vì nhiều API keys
   - Governed meter cho cost control

## 👥 Phản hồi người dùng

**@Crymfox**: Cần Firecrawl self-hosted cho enterprise/privacy use case.

**@yanggf8**: Có Grok subscription, muốn dùng qua CLI như các provider khác.

**@iamalanlui**: Push apifare solution - MCP-based prepaid meter thay vì API keys phân tán. Chưa có phản hồi từ maintainers.

## 🗺️ Backlog & Roadmap

Không có roadmap công khai. Dựa vào issues:

**Ưu tiên cao** (đã có discussion):
- Firecrawl configurable endpoint
- Grok CLI integration

**Thăm dò** (mới đề xuất):
- apifare prepaid search gateway
- Giải quyết DuckDuckGo performance trên thiết bị yếu (#871)

**Pattern rõ ràng**: Mở rộng CLI providers (đã có 3, thêm Grok làm thứ 4) và tăng flexibility cho self-hosted/enterprise scenarios.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw — 2026-09-15

## 1. Tóm tắt hôm nay

Dự án tập trung vào quality control và security hardening. Issue #8100 công bố phân loại lỗi hàng ngày từ benchmark runs, phát hiện 43 lỗi model-quality. PR #8077 fix response leak diagnostics trong MCP layer, tăng cường khả năng phát hiện data exfiltration.

## 2. Releases

Không có release trong 24h qua.

## 3. Tiến độ dự án

**PR #8077** — MCP egress diagnostics fix (mở từ 2026-09-06, cập nhật 2026-09-14)
- Giải quyết #8009: centralize `response_leak_blocked` sentinel
- MCP layer giờ classify response leak riêng biệt, không lộ internal host errors
- Mục tiêu: prevent data exfiltration qua MCP tool responses
- Chưa merged sau 8 ngày — review cycle dài, likely security-sensitive change

**Issue #8100** — Daily failure taxonomy (mở 2026-09-14)
- Benchmark suite: officeqa với 43 non-pass tasks
- Kết luận: "almost entirely genuine model-quality errors" với DeepSeek-V4-Flash
- Taxonomy là automated monitoring — track agent performance regressions
- Không có bình luận = routine reporting, không phải blocking issue

**Xu hướng:** Maturity stage. Focus shift từ feature development sang operational monitoring + security hardening.

## 4. Điểm nổi bật cộng đồng

Không có engagement (0 reactions, 0 comments trên cả hai items). Low signal — hoặc là team internal workflow, hoặc là project ít public contributors.

## 5. Ổn định & Bugs

**MCP response leak blocking (#8077):**
- Root cause: MCP tool responses có thể leak sensitive host data
- Fix: diagnostic classification layer ngăn host internals escape qua MCP
- Impact: security-critical, affects all MCP integrations
- Status: under review, chưa merged

**Model quality regressions (#8100):**
- 43/X tasks fail trên officeqa benchmark
- DeepSeek-V4-Flash navigation errors
- Không phải infrastructure bug — model capability limitation
- Action: taxonomy để track, không có fix ngay

## 6. Yêu cầu tính năng

Không có feature requests trong dataset. PR #8077 là bugfix, #8100 là monitoring report.

## 7. Phản hồi người dùng

Không có user feedback visible. Issues/PRs không có external voices — internal team workflow hoặc private beta.

## 8. Backlog & Roadmap

**Có thể suy luận:**
- Security hardening tiếp tục — MCP leak fix là part của larger security audit
- Benchmark automation đã setup — daily taxonomy reports = established process
- Model evaluation ongoing — DeepSeek-V4-Flash testing suggests model swap hoặc multi-model support

**Thiếu thông tin:** Không có public roadmap trong data. Project likely enterprise/research tool với closed planning.

---

**Đánh giá tổng thể:** Dự án ở mature operational phase. Ưu tiên security và quality monitoring over new features. Low public engagement nhưng high technical rigor (security-first PRs, automated benchmarking). Team nhỏ hoặc private development model.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw ngày 2026-09-15

## 1. Tóm tắt hôm nay

Ngày bùng nổ 30 PRs sửa lỗi từ QA và security audit. Zero releases. Focus: fix memory leak 3-paths (#7722), ACP trusted-mode fallback (#7726, #7732), console UX bugs, và loạt lỗi provider error reporting (#7684). Community report 10+ bugs (daily-paper crash, subAgent timeout, newapi proxy fail).

---

## 2. Releases

**Không có release mới.**

---

## 3. Tiến độ dự án

### 3.1 Security & Critical Fixes (ưu tiên cao)

- **#7722** memory exhaustion 3 paths: unbounded stream buffers, keep-alive stacking, doom-loop gate bypass. Controlled repro included.
- **#7769** Desktop API auth bypass khi disable account login → MCP config exposed. Fix: require process-scoped session.
- **#7766** Hub file preview URLs carry token in query string nhưng proxy chỉ check Authorization header → 401.
- **#7726 + #7732** ACP `trusted:true` không work vì `_pick_allow_option` chỉ match `allow_*` optionIds, miss các ID như `approve_once` → safe tool calls fall back interactive prompts. Fix: match `kind` field first (protocol stable).

### 3.2 Tooling & Infra

- **#7774** Hub startup provisioner allow-list hard-coded `{"local","docker"}`, không sync với runtime-assembled list → inconsistency.
- **#7725** Watchfiles SSE watcher block toàn bộ server khi scan large workspace (RustNotify `__init__` chạy sync recursive baseline). Fix: threaded polling.
- **#7751** Docker app venv dùng Debian Python (OpenSSL 3.0), khác với desktop pinned Python 3.11 standalone → align.

### 3.3 Console & UX

- **#7704** Chat files drawer chuyển từ trái sang phải, mirror resize motion.
- **#7750** Files từ `send_file_to_user` ẩn trong collapsed "Completed N steps" → surface lên response artifact grid.
- **#7681** Sidebar collapsed state không persist → fix localStorage.
- **#7752** Vi và pt-BR language selection broken end-to-end: `vi` bị backend reject (không có trong `_VALID_LANGUAGES`), và một failure mode khác hide cả 2 lỗi.
- **#7682** SettingsCenter dùng stale `var(--color*, fallback)` sau khi #7487 xóa aliases → fix semantic tokens.
- **#7759** Link focus indicators mất sau design reset → restore `:focus-visible`.

### 3.4 Agent & MCP

- **#7729** Java/Kotlin MCP servers trả `{"jsonRpcError":{}}` (non-standard envelope) với HTTP 500 khi unknown `server/discover` → fix `_unwrap_jsonrpc_result`.
- **#7735** MCP HTTP error responses bị HTTPX decompress lần 2 vì stale Content-Encoding header → filter khi rebuild.
- **#7773** Telegram `/start` platform handshake forward thành user message → fix: consume silently.
- **#7765** Telegram mention gate honor mọi `bot_command` entity, ignore `@BotName` target → multi-bot groups broken.
- **#7723** Console `stream_one` generic exception branch log silent, client không phân biệt failed turn vs completed turn → emit error event.

### 3.5 Providers & Errors

- **#7684** OpenAI provider behind Cloudflare 403 HTML interstitial mis-reported qua toàn bộ reporting chain. Fix classify text responses.

### 3.6 Context & Memory

- **#7703** Visual compaction span history + system content + tool schemas + individual tool results → simplify, stable image batches, readable presets.
- **#7748** Doom-loop strategy warnings bị suppress hoặc discard. Budget overflow recovery broken. Fix: deliver warnings sau tool results, read recording context.
- **#7211** (từ 2026-08-21, still open) `HookContext.inject_context()` persist thành visible user chat history vì role changed từ `system` → `user`.

### 3.7 Skills & Data

- **#7637** QwenPaw-Data 0.3.0 integration: managed/external analysis engine + embed reviewed QPD Data Console.
- **#7753** make-skill v2.1: require stored plan trước draft creation (prevent inline skip), update import detection, semantic merge.
- **#7761** `glob_search` không match brace patterns (`**/*.{csv,xlsx}`) → fix dùng `wcmatch`.

### 3.8 CLI & Misc

- **#7760** Memory jobs bị force-kill trong graceful shutdown → allow 10s drain.
- **#7758** Embedding timeout validation mismatch frontend vs backend (0 < t <= 300s) → align.
- **#7756** ReMe job empty error response dùng success fallback message → add failure-specific inbox fallback.

---

## 4. Điểm nổi bật cộng đồng

### 4.1 Issues nhiều bình luận

- **#7749** (4 comments) Model failover config trong model config interface không tìm thấy → user ask screenshot.
- **#7678** (6 comments) spawn subAgent 100% timeout dù set timeout rất lớn → AI audit log 8月24 record, không phải 15:11:48 session.
- **#7709** (6 comments) Cron task không output, kết quả fold vào steps/thinking. Có khi normal chat cũng vậy.
- **#7660** (4 comments) Installation failed screenshot.
- **#7722** (4 comments) Memory exhaustion controlled repro.
- **#7715** (4 comments) Daily Paper silent fail khi arxiv.org unreachable, error message hide real cause (`httpx.ConnectTimeout`). No proxy/endpoint config.

### 4.2 First-time contributors

7 PRs từ first-time contributors (#7774, #7773, #7735, #7723, #7765, #7211, #7729) → cộng đồng active.

---

## 5. Ổn định & Bugs

### 5.1 Tier 1 (production-blocking)

- Memory leak 3-paths (#7722)
- Desktop API auth bypass (#7769)
- ACP trusted-mode fallback (#7726, #7732)
- Watchfiles block server (#7725)

### 5.2 Tier 2 (UX degradation)

- Daily Paper silent fail (#7715)
- subAgent timeout loop (#7678)
- Cron task no output (#7709)
- Newapi proxy fail (#7772)
- Console artifact list không show `send_file_to_user` files (#7750)
- Sidebar collapsed không persist (#7681)
- Vi/pt-BR broken (#7752)

### 5.3 Tier 3 (minor polish)

- Telegram `/start` forward (#7773)
- Link focus indicators missing (#7759)
- Empty error notification indistinct (#7756)
- Embedding timeout validation mismatch (#7758)

---

## 6. Yêu cầu tính năng

- **#7746** Skills filter theo custom channels (allow-list per channel).
- **#7754** Custom channel support `followUpQuestions` (avoid second LLM call).
- **#7755** Session cache isolation (deepseek `user_id` parameter report error).
- **#7768** Cloud deployment model config unclear, GitHub account activity requirements.

---

## 7. Phản hồi người dùng

### Negative

- subAgent timeout 100% fail (#7678) → frustration.
- Daily Paper cron silent fail, kết quả fold vào thinking (#7709, #7715) → confusion.
- Newapi proxy fail (#7772) → block self-hosted models.
- Model failover config invisible (#7749) → doc gap.
- Telegram multi-bot mention broken (#7765) → unusable in shared groups.

### Positive

- First-time contributors 7 PRs → welcoming project.
- Security audit findings addressed quickly (30 PRs in 1 day).

---

## 8. Backlog & Roadmap

### Short-term (đang PR review)

- QwenPaw-Data 0.3.0 integration (#7637)
- Visual compaction v2 (#7703)
- Make-skill v2.1 (#7753)
- Context injection persistence fix (#7211)

### Mid-term (từ feature requests)

- Custom channel skill filter (#7746)
- `followUpQuestions` direct generation (#7754)
- Session cache isolation config (#7755)
- Cloud deployment docs (#7768)

### Long-term (implicit from bugs)

- Provider error classification overhaul (#7684)
- MCP server discovery resilience (#7729, #7735)
- Agent loop doom detection refactor (#7748)

---

**Kết luận**: Ngày 2026-09-15 là đợt security/QA sweep lớn (30 PRs), không có release. Focus sửa memory leak, auth bypass, ACP fallback, và loạt console UX bugs. Community report nhiều production issues (subAgent timeout, daily-paper fail, newapi proxy) cần priority. First-time contributor activity cao (7 PRs) → project health tốt.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*