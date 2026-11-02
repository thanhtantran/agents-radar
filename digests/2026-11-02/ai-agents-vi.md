# Bản tin Hệ sinh thái Hermes Agent 2026-11-02

> Issues: 194 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-11-02 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-11-02

## 📋 Tóm tắt hôm nay

Ngày bùng nổ bug-fix: 30 PR gửi trong 24h, tập trung vào Gateway/Desktop/async delegation. Không có release mới. Cộng đồng đang chịu đựng cascade bug từ unified gateway merge (#106742) - async delegation completions bị mất, session routing sai profile, background task không deliver.

## 🚀 Releases

Không có.

## 📊 Tiến độ dự án

### PR hot (hôm nay):

**Gateway/async delegation fix wave** (9 PR liên quan):
- #147753: delegate_task qua bot route khác profile → pending mãi
- #147746: routing record mất `origin` → watcher crash 2s/lần
- #147748: ledger bỏ qua row owner còn sống → kết quả mất
- #147745: `/bg` task không join subagent → answer mất
- #147751: TUI đóng session → notification bay màu

**Desktop stability** (4 PR):
- #147763: connection + profile publish race → 404 on SSH gateway
- #147734: fallback launch không switch gateway, window shows sai gateway
- #147741: SSH gateway tạo N backend cho N profile → chậm 3.7s/profile, list không đầy
- #147711: boot vào profile gateway không có → "profile does not exist"

**Platform fixes**:
- #147750: Signal mất message khi reconnect (port từ openclaw)
- #147749: WhatsApp group wake trên số chứa bot digits (không phải mention thật)

### Issue nổi bật:

**P1/P2 open lâu**:
- #143547 (34 comment): post-merge checklist cho unified gateway - vẫn còn 20+ fallout bug
- #128468 (18 comment): Desktop transcript duplicate + scroll nhảy khi streaming
- #79087 (17 comment): Windows runtime probe timeout → onboarding loop

**Mới nổi**:
- #147600: WebUI session không resume từ Desktop/TUI (source mismatch)
- #147377: Bot Chat row bị login-stamp → không adopt được → not_found mãi
- #147071: `hermes chat -r` trên messaging session + clean exit → channel detach vĩnh viễn

## 🔥 Điểm nổi bật cộng đồng

**Issue có engagement**:
- #145183 (10 comment): Linux Desktop translucent nhưng settings ẩn toggle → không tắt được
- #20372 (8 comment, 2👍): auto fresh-session handoff khi compression risky

**Pain point lặp lại**:
- Async delegation delivery: 6 issue + 9 PR trong 48h - system chưa đủ reliable
- Desktop multi-gateway: routing/profile/session matching vẫn dễ vỡ
- Platform adapter (Telegram/Discord/Feishu): message loss/format breaks

## 🐛 Ổn định & Bugs

**Critical (đã fix trong 24h)**:
- Async delegation delivery: 5 root cause đã patch (#147753, #147746, #147748, #147745, #147751)
- Desktop gateway/profile mismatch: 4 fix (#147763, #147734, #147741, #147711)

**Still broken**:
- #112961: Windows Hermes.exe crash với FAST_FAIL_FATAL_APP_EXIT (offset cố định 0x5281f15)
- #131743: Codex long-task 300s stall before first progress
- #128468: Desktop streaming scroll jump + duplicate render

**Systemic issues**:
- Gateway notification delivery: no durable retry, no delivery receipt
- Session ownership/routing: 4 overlapping concepts (profile, gateway, source, login_id) không consistent
- Platform adapter error handling: silent drop common (SimpleX images, Telegram albums)

## ✨ Yêu cầu tính năng

**Được discuss**:
- #49190: event substrate cho Kanban notifications → any-surface subscribers
- #20372: auto fresh-session handoff (compression escape hatch)
- #11701 (3👍): persistent usage/cost footer trên messaging platform

**Security/Privacy**:
- #57364: `pre_llm_message` plugin hook cho redaction middleware
- #132347: holographic memory trả toàn bộ store với empty query (no relevance floor)

## 💬 Phản hồi người dùng

**Windows users**:
- Path có space vỡ update (#140831)
- Reserved-name (nul/con) crash completion (#141599)
- Desktop crashes không pattern rõ (#112961)

**Multi-gateway users**:
- Session list/resume inconsistent
- Profile switching slow (SSH: 3.7s/profile)
- Routing errors khi dùng bot relay

**Long-running session users**:
- Context compression degradation (#20372)
- Image attachment không evict → multi-MB relay (#143918)
- Reasoning token double-stored (#125273)

## 📅 Backlog & Roadmap

**Inferred priorities** (theo PR volume):
1. **Gateway reliability** (30% PR): async delivery, session routing, profile scoping
2. **Desktop stability** (20% PR): multi-gateway, boot sequence, connection races
3. **Platform adapters** (15% PR): Telegram/Discord/WhatsApp/Signal message handling
4. **Performance** (10% PR): memory bloat, token accounting, FTS5

**Technical debt visible**:
- Session identity model cần refactor (4 overlapping concepts)
- Notification/wake delivery cần durable queue + retry + receipt
- Platform adapter error handling cần standardize (hiện tại silent drop)
- Windows support: nhiều edge case chưa handle (path quoting, reserved names, crash offset)

**No explicit roadmap** - development reactive theo bug report + community PRs.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-11-02

## 1. 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **consolidation và hardening**. Sau giai đoạn bùng nổ features, các dự án giờ focus:

- **Stability**: Bug-fix wave chiếm ưu thế (Hermes 30 PR/ngày, OpenClaw 30 PR, QwenPaw 18 PR active)
- **Security hardening**: Auth/permission/sandbox fixes (Zeroclaw 9 security PR)
- **Platform adapter reliability**: Message delivery/format/rate-limit fixes phổ biến
- **Performance optimization**: Memory leaks, prompt cache, context management

**Tín hiệu thị trường**:
- Production readiness priority > feature velocity
- Multi-gateway/multi-channel pain real, hard
- Desktop apps stability matter (Hermes/OpenClaw/QwenPaw cùng sửa desktop bugs)
- Community-driven development (fork conversations, platform integrations)

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động chính | Cộng đồng |
|-------|--------|-----|----------|-----------------|-----------|
| **Hermes Agent** | 194 | 500 | 0 | 🔥 30 PR/ngày bug-fix wave, gateway/desktop fixes | ⚡ High engagement, production issues |
| **OpenClaw** | 166 | 500 | 0 | 🔥 30 PR/ngày, fork threads feature ship | ⚡ Active, pain points vocal |
| **Zeroclaw** | 10 | 43 | 0 | 🔐 Security hardening (9 PR), prompt cache fixes | 🤝 RFC-driven, mature process |
| **QwenPaw** | 8 | 20 | 0 | 🐛 18 PR bug backlog, lazy-load perf fix | 💬 Hub discussion active |
| **NanoBot** | 1 | 2 | 0 | 🧪 Pagination + sandbox tests, Iris proposal | 😴 Low activity, quality focus |
| **NanoClaw** | 0 | 7 | 0 | 📊 Storage leak fix, dashboard merged | 🔧 Contributor diverse, low noise |
| **PicoClaw** | 0 | 2 | 0 | ⏸️ Stale provider PR (8 days), Termux fix | 💤 Review bottleneck |
| **NullClaw** | 0 | 1 | 0 | 📝 zh-TW docs PR | 🌏 i18n expansion signal |
| **IronClaw** | 0 | 5 | 0 | ⚠️ Dependency updates 2+ months stale | 💀 Maintenance abandoned? |

## 3. 🎯 Vị thế Hermes Agent trong hệ sinh thái

**Định vị**: **Production-grade enterprise agent platform**

**Điểm mạnh**:
- Volume lớn nhất: 500 PR, 194 issues → mature codebase
- Multi-gateway architecture pioneer (gateway/desktop/session routing)
- Active bug resolution: 30 PR/ngày → committed maintenance
- Enterprise features: async delegation, multi-profile, background tasks

**Challenges unique**:
- **Complexity tax**: Gateway/profile/session identity model vỡ ở edge cases (4 overlapping concepts)
- **Windows support**: Nhiều platform-specific issues (#112961 FAST_FAIL, path quoting, reserved names)
- **Async delegation reliability**: 6 issues + 9 PR trong 48h → subsystem immature
- **Notification delivery**: No durable retry/receipt → message loss common

**So với competitors**:
- **vs OpenClaw**: Tương đồng scale/activity, nhưng OpenClaw có fork threads (user request shipped nhanh), Hermes focus multi-gateway complexity
- **vs Zeroclaw**: Zeroclaw security-first (OIDC/SRI/XFF), Hermes feature-first rồi harden sau
- **vs QwenPaw**: QwenPaw China-market focus (Lark/QQ/WeChat/Feishu), Hermes Western platforms (Discord/Telegram/Slack)

## 4. 🛠️ Hướng kỹ thuật chung

**Patterns xuất hiện nhiều dự án**:

### 4.1 Message delivery reliability
- **Problem**: Platform adapter loss messages (Hermes Signal reconnect, OpenClaw Slack duplicates, QwenPaw QQ gateway drop)
- **Solutions**: Retry mechanisms, flood gates (Zeroclaw Telegram 429 handling), dedupe (NanoClaw approval expiry)

### 4.2 Prompt cache optimization
- **Problem**: Config changes bust cache → cost waste
- **Solutions**: 
  - Zeroclaw: Stable tool order (#12177), personality per-session (#11698)
  - QwenPaw: Lazy-load channels (#7546)
  - Hermes: Context compression fallback (#20372)

### 4.3 Multi-gateway/profile architecture
- **Adopters**: Hermes (pioneer), OpenClaw (multi-gateway modes), Zeroclaw (gateway pairing)
- **Pain**: Session routing, identity mapping, profile scoping vỡ phổ biến
- **No consensus solution yet** → mỗi dự án tự resolve

### 4.4 Security hardening wave
- **Zeroclaw leading**: OIDC binding (#12157), rate-limit XFF (#12114), SRI (#12115), file permission (#12151)
- **Others catching up**: Hermes gateway auth issues, OpenClaw auth profile migration

### 4.5 Desktop app stability
- **Common issues**: 
  - Multi-instance conflicts (Hermes #147763, QwenPaw #8033)
  - Boot sequences (Hermes Windows hang, OpenClaw scheduled task, QwenPaw fnOS sandbox)
  - Connection races (Hermes SSH gateway 404, OpenClaw profile publish)

### 4.6 Platform-specific adapters
- **Trend**: Fork conversations (OpenClaw shipped, Telegram/Discord/Slack)
- **China market**: QwenPaw dẫn đầu Feishu/QQ/WeChat/Lark integration
- **Messaging protocols**: Matrix E2E (QwenPaw #8411), Signal (NanoBot proposal), WhatsApp (NanoClaw media handling)

## 5. 🔀 Điểm khác biệt

### 5.1 Chiến lược phát triển

| Dự án | Chiến lược | Risk/Return |
|-------|-----------|-------------|
| **Hermes** | Feature-first, scale complexity | High capability, high debt |
| **Zeroclaw** | Security/RFC-first, measured | Slower velocity, production-ready |
| **OpenClaw** | Community-responsive | Fast iteration, reactive |
| **QwenPaw** | Market-specific (China) | Vertical depth, geographic lock-in |
| **NanoBot** | Research/quality | Low volume, high precision |

### 5.2 Architecture philosophy

**Hermes/OpenClaw**: Monolith với plugin system, unified gateway
**Zeroclaw**: Modular daemon + channels, permission-centric
**QwenPaw**: Multi-tenant Hub + agents, team-focus
**Nano projects**: Single-binary simplicity

### 5.3 Community structure

**Hermes**: Enterprise users, production pain vocal
**OpenClaw**: Contributor-driven, PR volume high
**Zeroclaw**: RFC process, design discussions
**QwenPaw**: Chinese forum active (36-comment threads)
**Small projects**: Single-maintainer or abandoned (IronClaw)

## 6. 📈 Mức độ trưởng thành cộng đồng

### Tier 1: Production-ready ecosystems
- **Hermes Agent**: 194 issues tracked, systematic bug resolution, 24h response
- **OpenClaw**: 166 issues, feature requests → implementation loop established
- **Zeroclaw**: RFC process, security standards, design debate culture

### Tier 2: Active development
- **QwenPaw**: 8 issues, 18 PR backlog, Hub multi-tenant shipped
- **NanoClaw**: 0 issues (curated?), diverse contributors, clean PR flow

### Tier 3: Low-volume quality
- **NanoBot**: 1 issue, careful changes (pagination/sandbox), proposal review
- **NullClaw**: Docs expansion, minimal activity

### Tier 4: At-risk
- **PicoClaw**: 8-day stale PR, no maintainer interaction
- **IronClaw**: 2+ months dependency updates pending, possible abandonment

**Maturity indicators**:
✅ Bug triage process (Hermes/OpenClaw/Zeroclaw)
✅ Feature request → implementation pipeline (OpenClaw fork threads)
✅ RFC/design docs (Zeroclaw #12131)
✅ Security disclosure process (Zeroclaw SRI/OIDC)
⚠️ Roadmap transparency (most projects lack public roadmap)
⚠️ Breaking change communication (no visible process)

## 7. 🔮 Tín hiệu xu hướng

### 7.1 Immediate (Q4 2026)

**Reliability over features**: Bug-fix waves dominate. Users demand:
- Message delivery guarantees
- Session persistence
- Multi-device consistency
- Desktop app stability

**Security baseline rising**: Zeroclaw OIDC/SRI work will pressure competitors. Expect:
- Auth/authz hardening
- Sandbox enforcement
- Credential rotation
- Supply chain verification

**Platform coverage war**: Fork conversations (OpenClaw), China platforms (QwenPaw), messaging protocols (Signal/Matrix/WhatsApp) → every project picks niche

### 7.2 Medium-term (2027)

**Multi-agent coordination**: 
- Hermes async delegation problems indicate demand
- OpenClaw durable peer-agent turns tracker (#9597)
- Expect: orchestration layers, agent-to-agent protocols

**Cost optimization pressure**:
- Prompt cache optimization everywhere
- Context compression escape hatches
- Token accounting fixes (Hermes reasoning token double-stored)
- Inference providers race to bottom → multi-provider routing crucial

**Desktop as first-class citizen**:
- Hermes/OpenClaw/QwenPaw all fixing desktop bugs concurrently
- Expect: Electron alternatives (Tauri?), native performance focus
- Connection/profile/gateway complexity needs architectural simplification

### 7.3 Structural shifts

**Convergence risks**:
- Gateway/session/profile architecture patterns stabilizing
- Platform adapter lessons learned (Telegram rate-limits, Matrix E2E)
- Security standards emerging (Zeroclaw leading)
- **Outcome**: Smaller projects struggle to differentiate, consolidation likely

**Divergence opportunities**:
- **Geographic**: QwenPaw China vertical successful → India/EU/SEA markets open
- **Vertical**: QwenPaw Hub multi-tenant → enterprise/team use cases separate from personal
- **Tech substrate**: Voice (Gemini speech-to-speech parking-lot #10430), multimodal, agent-native protocols

**Open questions**:
- Will unified gateway model survive complexity tax? (Hermes struggling)
- Can small projects (PicoClaw/NanoBot) sustain or get acquired/abandoned?
- Who ships multi-agent orchestration first?
- Security audit/certification → market differentiator?

---

## 🎓 Strategic takeaways

**For Hermes Agent**:
1. **Simplify identity model**: 4 concepts (gateway/profile/session/login) → pick 2, deprecate rest
2. **Async delegation reliability**: Current wave → systemic fix or deprecate feature
3. **Windows first-class**: Reserved names/path quoting/crash offset → dedicated focus or drop support
4. **Security catch-up**: Zeroclaw OIDC/SRI work setting bar

**For ecosystem watchers**:
- Production-readiness wave = market maturation signal
- China platforms (QwenPaw) vs Western platforms (Hermes/OpenClaw) diverging
- Security/RFC process (Zeroclaw) emerging as differentiator
- Small projects (Pico/Nano/Null/Iron) at consolidation risk

**For new entrants**:
- Geographic/vertical niches still open
- Multi-agent coordination unsolved
- Voice/multimodal early
- Security-first positioning available

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-11-02

## 🔥 Tóm tắt hôm nay

Ngày sửa bug tích cực với **30 PRs mới và 50+ issues theo dõi**. Focus cleanup khắp stack: message rendering double, shutdown grace budget, plugin lifecycle. Discord/Telegram fork threads feature land multi-PR. Doctor hang issues vẫn chưa close.

## 🚀 Releases

Không có release ngày hôm nay.

## 📊 Tiến độ dự án

### PRs nổi bật

**Fork threads cross-channel** (#190783, #190785, #190786, #190787)
- Telegram/Discord/Slack giờ có `/fork [title]` tạo sibling conversation với context cloned
- Độc lập routing, giữ parent relation
- UI thêm composer shortcut thay vì channel-only

**Doctor responsiveness fix** (#190788) 
- SQLite inspection block signal handler trên large DB
- Dead-owner lease missing boot provenance macOS/Windows
- Related #178359, #187900 - doctor hang 15min+ chưa fix

**Shutdown grace budget** (#190791)
- Test có thể exhaust real grace budget
- Freeze clock đang dùng Date thay vì actual measurement

**Plugin lifecycle issues**
- #190781: plugin subagent completions bypass prepared registry
- #125913: Codex binding namespace hit 50k row cap, reject new binds

### Issues nghiêm trọng

**P0 crash-loop blockers**
- #140161: Windows scheduled task boot hang 5-7min hoặc silent exit code 0
- #167078: concurrent turns same session → 15s drain timeout → turn fails
- #140085: ask_user never deliver Telegram, session hang forever
- #141791: empty auth_profile_store block mọi request; drop table → gateway won't start

**P1 impacts**
- #187900: doctor hang mọi mode trên Linux
- #178359: doctor --fix idle 15min, never reach DB repair (macOS)
- #186684: claude-cli tool-list change invalidate session, reseed refused

## 🐛 Ổn định & Bugs

**Message delivery**
- #142897: Slack text lost trên duplicate events
- #142313: no-caption image qua offload threshold bị drop ("no text")
- #143441: WebChat render raw DSML thay vì tool cards + content duplicate

**Session state**
- #143632: iMessage re-deliver 2-3x ghost copies, dedupe không apply
- #154474: completion batch republish ~15 lần, operator stop dropped mid-loop
- #141172: run dies trước first commit → leak run.started forever

**Auth & runtime**
- #141604: model fallback abort non-final hop, skip remaining
- #156895: automation job fail "account unavailable" nhưng configured
- #90074: OpenAI image gen dùng API key thay OAuth dù có Codex profile

**Performance**
- #166641: web_fetch fallback sync capture plugins trên main thread → liveness stall
- #142139: Codex 18-26s inter-tool gap + 300s stall; switch model → instant fix

## 💡 Yêu cầu tính năng

- #150250: Skill Workshop verify learning coverage + behavioral reuse
- #142723: supervised TaskFlow với durable continuation, explicit endpoints
- #142521: empty ephemeral + multi-repo cloud workspaces
- #142966: two-column model picker cho large multi-provider setups
- #165685: machine-readable reason trên settled yielded collector

## 👥 Phản hồi người dùng

Community report timing issues khắp platforms:
- Codex extremely slow qua native path vs OpenRouter
- Doctor tools unusable trên production
- Message loss patterns repeat cross-channel
- Fork conversation là top ask resolved hôm nay

Positive: fork threads ship nhanh sau user feedback

## 📋 Backlog & Roadmap

**Immediate priorities** (inferred từ P0/P1 labels):
- Doctor hang trilogy: Linux/macOS responsiveness
- Windows boot reliability scheduled task mode
- Session concurrency drain timeout
- Auth profile migration limbo

**Feature work in-flight**:
- Fork conversation rollout (4 PRs landing)
- Skill Workshop coverage verification
- Plugin lifecycle cleanup multiple vectors

**Technical debt visible**:
- Shutdown grace budget test fragility
- Plugin registry reuse gaps
- Codex binding namespace scale limit
- Message dedupe failures cross-channel

---

Ngày cleanup nhưng nhiều core issues (doctor, boot, auth) vẫn open lâu. Fork threads feature solid. Performance regression Codex chưa root-cause.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-11-02

## 1. Tóm tắt hôm nay

Ngày yên tĩnh. Một đề xuất tích hợp Iris Chat (Nostr messaging không cần số điện thoại). Hai PR hiện có được cập nhật: web_fetch thêm pagination cho text extraction, exec sandbox tests kiểm tra lệnh bị chặn thất bại đúng.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR #6317** - Web fetch continuation
- Thêm offset vào `web_fetch` để đọc nội dung dài theo từng đoạn
- Trả về `nextOffset` và `totalLength` 
- Agent đọc được trang thứ ba mà không chạm rate limit
- Giữ untrusted-content banner mỗi trang
- Priority P2, đang test

**PR #6351** - Sandbox test hardening
- Assert rằng lệnh bị Seatbelt chặn exit nonzero (không chỉ throw error)
- 81 native + portable tests pass trên macOS
- Priority P2, validation done

Xu hướng: Tăng cường khả năng xử lý content dài (web scraping) và hardening sandbox security tests.

## 4. Điểm nổi bật cộng đồng

**Issue #6535** - Iris Chat integration proposal
- Contributor @mmalmi đề xuất channel mới
- Iris = Signal-like Double Ratchet messaging trên Nostr, không cần signup
- External package đã test xong, chờ maintainer review trước khi PR vào core
- Zero comments/reactions → chưa có phản hồi cộng đồng

## 5. Ổn định & Bugs

Không có bug report mới. Hai PR test-focused → focus vào quality assurance.

## 6. Yêu cầu tính năng

Iris Chat native channel - messaging không cần phone number. Còn đợi maintainer decision.

## 7. Phản hồi người dùng

Không có discussion/feedback trong 24h qua. Hoạt động chủ yếu từ contributors.

## 8. Backlog & Roadmap

Dựa vào PR labels:
- **Documentation**: Web fetch cần docs cho continuation API
- **Priority P2**: Hai PR hiện tại không urgent nhưng quan trọng cho stability
- Iris Chat proposal có thể mở hướng messaging ecosystem nếu được chấp nhận

---

**Nhận xét**: Ngày phát triển ổn định, không có drama. Focus vào infrastructure (pagination, security testing) thay vì features lớn. Iris proposal có tiềm năng nếu align với roadmap nhưng cần maintainer signal.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw 2026-11-02

## 1. Tóm tắt hôm nay

Ngày tập trung vào security hardening và stability: 9 PR merge/update về bảo mật (OIDC callback binding, checksum verify, XFF rate-limiting, SRI pinning), fix bugs làm mất prompt cache và SOPs không load. Không có release mới. Cộng đồng đẩy tracker #11013 (unified file intake) và #9597 (durable peer-agent turns).

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Security & Auth**
- **#12157** (OPEN): OIDC enrollment callback giờ bind với browser khởi tạo, chặn token leak qua copied URL. Dùng 32-byte nonce + secure cookie.
- **#11965** (OPEN): OIDC dashboard sign-in opt-in, thay vì chỉ pairing code. Users khác nhau được permission riêng.
- **#11286** (OPEN): Gateway pairing token bind với `[users.<name>]` roster → authn as `user:<id>`, không còn shared operator.
- **#12166** (OPEN): Windows installer verify SHA256 checksums trước khi extract.
- **#12114** (OPEN): Rate limit dùng rightmost X-Forwarded-For hop (proxy-appended), không tin client header.
- **#12115** (OPEN): Scalar API docs bundle dùng SRI (Subresource Integrity), chặn CDN tampering.

**Runtime & Tools**
- **#12180** (OPEN): WebP→PNG decode bounded bởi per-image cap, chặn memory bomb.
- **#12151** (OPEN): `file_upload*` tools require read access trước khi upload; write-only grant không đủ.
- **#12150** (OPEN): macOS Seatbelt regex cho home dotfiles fix (literal `allow` thay vì broken `regex`).
- **#12179** (MERGED): `deliver_file` description không còn bảo model ghi URI vào prose.
- **#12177** (OPEN): MCP tool names return sorted → stable prompt cache.
- **#11698** (OPEN): Personality files stable per session → không bust prompt cache mỗi edit.
- **#11456** (OPEN): Subprocess memory watchdog opt-in (`shell_max_memory_mb`).
- **#11589** (OPEN): Operator override exceeded cost limit qua RPC (`cost.allow_override`).

**Channels**
- **#11651** (OPEN): Telegram honor 429 `retry_after` qua shared flood gate per-token.
- **#11862** (OPEN): Telegram rich messages opt-in (headings, lists, tables qua `sendRichMessage`).
- **#10843** (OPEN): Telegram `add_reaction`/`remove_reaction` via `setMessageReaction`; channels chưa support fail loud.

**Infrastructure**
- **#12117** (OPEN): CLI admin commands honor `[gateway.tls]` (fix http:// URLs khi TLS-only).
- **#12017** (MERGED): Context window là model metadata, không phải config → xóa 32K fallback.
- **#12159** (MERGED): Installer show version từ `zeroclaw --version` field 2, không phải build commit.

**In Progress**
- **#11727** (OPEN): Zerocode reopen sessions sau restart (sidebar list từ persistent store).
- **#11624** (OPEN): Zerocode record dropped `ask_user`/`poll` elicitations vào transcript.
- **#10430** (OPEN, parking-lot): Gemini speech-to-speech broker channel PR1 (daemon core).

## 4. Điểm nổi bật cộng đồng

**Tracker được đẩy**
- **#11013** (4 comments): Unified file intake/resolver/delivery implementation (RFC #9488). Coordination hub cho file model work.
- **#9597** (3 comments): Make peer-agent turns durable + attributable runtime tasks. Follow-up tracker.

**Proposals & RFCs**
- **#12131** (OPEN): RFC shared execution permissions + same-identity credential renewal cho multi-contributor tasks.
- **#12130** (OPEN): Configurable daemon session quotas + local operator reserve.
- **#12181** (OPEN): Web managed document upload (first #9488 Phase 2 Web slice).

**Bugs có impact**
- **#12176** (OPEN): Deferred MCP tool list in HashMap order → system prompt changes → bust prompt cache.
- **#12175** (OPEN): Personality editor copy sai ("no daemon reload needed") cho channels; cần reload.
- **#12178** (OPEN): `deliver_file` description bảo model ghi URI vào prose (fixed #12179).

## 5. Ổn định & Bugs

**Critical/High Priority**
- **#9779** (P1, 6 comments): `sops_dir` documented default không honored → SOPs không load, không error. Gates entire SOP subsystem.

**Resolved**
- **#12154** (CLOSED): `install.sh` show build commit thay vì version → fixed #12159.
- **#12017** (MERGED): Context window as metadata giải quyết 32K fallback confusion.

**Active Fixes**
- **#12150**: macOS sandbox home dotfiles regex broken.
- **#12117**: CLI admin commands fail khi TLS-only gateway.
- **#11651**: Telegram 429 retry_after bị ignore → flood gate per-token.

## 6. Yêu cầu tính năng

**Accepted/In Progress**
- **#12181**: Web document upload as managed files (#9488 Phase 2).
- **#12130**: Configurable session quotas + operator reserve.
- **#11456**: Subprocess memory watchdog.
- **#11589**: Cost limit override mechanism.
- **#11965**: OIDC dashboard sign-in.

**Proposed**
- **#12131**: RFC shared execution permissions + credential renewal.
- **#11862**: Telegram rich messages (headings/lists/tables).
- **#10430**: Gemini speech-to-speech broker (parking-lot).

## 7. Phản hồi người dùng

**Pain Points**
- SOPs không load khi rely on documented default (#9779) → silent failure, no logs.
- Personality edits bust prompt cache (#11698) → cost waste.
- MCP tool order random (#12176) → cache bust every session.
- Telegram rate limits không honored (#11651) → API blocks.

**Requested UX Improvements**
- Web file uploads (#12181).
- Session quota config (#12130).
- Zerocode persistent sidebar (#11727).
- OIDC dashboard auth (#11965).

## 8. Backlog & Roadmap

**Security Hardening Wave** (active)
- OIDC enrollment/dashboard binding
- Gateway rate-limiting improvements
- File tool permission enforcement
- Installer checksum verification

**Stability Focus** (active)
- Prompt cache preservation (#11698, #12176, #12177)
- Telegram 429 handling (#11651)
- Zerocode session persistence (#11727)

**Next Phase** (tracked)
- #11013: Unified file intake (RFC #9488 implementation)
- #9597: Durable peer-agent turns
- #10430: Gemini speech-to-speech (parking-lot)

**Proposals Under Review**
- #12131: Shared execution permissions RFC
- #12130: Session quota config

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo Phân tích PicoClaw - 2026-11-02

## 1. 🎯 Tóm tắt hôm nay

Ngày yên tĩnh. Không có issue mới, không release. Chỉ có 2 PR đang chờ: #3455 fix bug Termux (mới 1 ngày) và #3448 thêm provider Runcrate (đã stale, 8 ngày không động).

## 2. 📦 Releases

Không có.

## 3. 🚧 Tiến độ dự án

**PR đang mở:**

- **#3455** - Fix Nvidia model ID trong Termux shell
  - Tạo: 2026-11-01 (hôm qua)
  - Loại: Bug fix
  - Chưa có reactions, chưa có comments
  - Template PR đã điền nhưng thiếu nội dung chi tiết

- **#3448** - Thêm Runcrate provider (OpenAI-compatible)
  - Tạo: 2026-10-25 (8 ngày trước)
  - Đã đánh dấu [stale]
  - Runcrate = GPU cloud provider phục vụ open models
  - Pattern giống Novita/NEAR AI Cloud (prefix `runcrate/`, base URL `https://api.runcrate.ai/v1`)
  - Không có tương tác từ maintainers

**Xu hướng:** Dự án đang chậm lại. PR provider mới bị bỏ quên 1 tuần. Maintainers chưa review.

## 4. 💬 Điểm nổi bật cộng đồng

Không có. Cả 2 PR đều 0 reactions, 0 comments. Cộng đồng không active ngày hôm nay.

## 5. 🐛 Ổn định & Bugs

**#3455** - Bug Nvidia model ID trên Termux:
- Platform-specific issue (Android/Termux)
- Liên quan đến shell compatibility
- Chi tiết kỹ thuật chưa rõ (PR description thiếu)

Chưa có bug reports khác trong 24h qua.

## 6. ✨ Yêu cầu tính năng

**#3448** - Integration Runcrate provider:
- Mở rộng danh sách GPU providers
- Tăng lựa chọn cho users chạy open models
- Marketing angle: Runcrate có UTM tracking (`utm_source=picoclaw`)

Không có feature requests mới.

## 7. 👥 Phản hồi người dùng

Không có feedback mới. Issues = 0, PR comments = 0.

## 8. 🗺️ Backlog & Roadmap

Không có thông tin roadmap trong dữ liệu. 

**Backlog hiện tại:**
- PR #3448 cần review (đã stale 8 ngày)
- PR #3455 cần review (mới 1 ngày)

**Quan sát:** Tốc độ review chậm. Provider integration PR không được ưu tiên cao.

---

**Kết luận:** Ngày maintenance thấp. Dự án đang trong giai đoạn trầm, không có hoạt động phát triển hoặc cộng đồng đáng kể. Cần theo dõi xem maintainers có quay lại review 2 PR này trong vài ngày tới.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-11-02

## 1. Tóm tắt hôm nay

Ngày yên ắng cho NanoClaw. Một PR đóng (#3845 dashboard), không có release mới. Hoạt động chính: 6 PR cũ nhận cập nhật nhỏ, tập trung vào bug fixes (recurring tasks, telegram threads, WhatsApp media, approval expiry).

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đóng:**
- #3845: Dashboard giám sát local đã merge, thêm `@nanoco/nanoclaw-dashboard` vào core

**Bug fixes đang chờ:**
- #4245: Recurring tasks tạo bản copy payload mỗi lần chạy, làm phình `inbound.db` 
- #3971: Telegram topics không route đúng thành threads
- #3712: WhatsApp download media không cần thiết, bỏ qua caption của documents
- #3833: Approval cards không expire, agent không nhận thông báo khi timeout

**Cải tiến kiến trúc:**
- #3711: Defer content resolution cho inbound messages (tránh download/fetch lúc không cần)
- #3448: Cảnh báo khi group scope ghi đè args auto-fill

**Xu hướng:** Tập trung vào performance (giảm storage bloat, lazy loading) và UX cho channel adapters (Telegram, WhatsApp).

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có interaction cao. Các PR đều từ contributors khác nhau (@OowhitecatoO, @mmv, @antonio-antuan, @drsmk238, @wakqasahmed), cho thấy cộng đồng contributor đa dạng nhưng chưa có thảo luận sôi nổi.

## 5. Ổn định & Bugs

**Critical:**
- #4245: Storage leak từ recurring tasks - mỗi lần chạy duplicate full payload
- #3833: Approval workflow không complete - cards pending mãi mãi

**Adapter issues:**
- Telegram: Topics không thành threads, breaking `per-thread` wiring
- WhatsApp: Download media thừa, bỏ qua document captions

**Root causes đang fix:**
- Mailbox không cleanup finished recurring occurrences
- InboundMessage content resolution quá eager
- Approval TTL không enforce

## 6. Yêu cầu tính năng

Không có feature request mới. Các PR hiện tại đều sửa bugs hoặc tối ưu existing features.

## 7. Phản hồi người dùng

Không có comment/discussion mới từ end users trong 24h. PR activity chủ yếu từ maintainers và contributors.

## 8. Backlog & Roadmap

Dựa trên PR pipeline:

**Ưu tiên cao (đang review):**
- Fix storage leak (#4245)
- Fix approval expiry (#3833)
- Lazy content resolution (#3711)

**Ưu tiên vừa:**
- Telegram threads (#3971)
- WhatsApp media handling (#3712)
- CLI warnings (#3448)

**Đã hoàn thành:**
- ✅ Local monitoring dashboard

Không có roadmap công khai trong dữ liệu.

---

**Nhận định:** Dự án trong giai đoạn ổn định hóa core features. Focus vào bugs ảnh hưởng storage/performance hơn là thêm tính năng mới. Cần đẩy nhanh merge các fixes quan trọng (#4245, #3833).

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo hoạt động NullClaw - 02/11/2026

## 📋 Tóm tắt hôm nay

Ngày yên tĩnh. Một PR mở mới thêm tài liệu Trung Quốc phồn thể (zh-TW) đầy đủ với 15 file. Không có issue, release, hay thay đổi code nào.

## 🚀 Releases

Không có.

## 📊 Tiến độ dự án

**Pull Request duy nhất:**

- **#1087** - @supersonictw thêm bộ tài liệu zh-TW hoàn chỉnh
  - Dịch từ docs/en/, bao gồm: README, hướng dẫn cài đặt, cấu hình, deployment, API, architecture, database, security, testing, CI/CD, troubleshooting, changelogs
  - 15 file core docs
  - PR mới mở (01/11), chưa có review hay tương tác

**Xu hướng:** Dự án mở rộng ra thị trường Đài Loan/Hồng Kông/cộng đồng Hoa ngữ dùng chữ phồn thể. Contributor có ý thức đóng góp tài liệu đầy đủ thay vì từng phần.

## 💬 Điểm nổi bật cộng đồng

Không có tương tác nào. PR #1087 chưa nhận reaction hay comment.

## 🐛 Ổn định & Bugs

Không có bug report hay fix trong 24h.

## ✨ Yêu cầu tính năng

Không có.

## 👥 Phản hồi người dùng

Không có feedback mới.

## 🗺️ Backlog & Roadmap

Không có thông tin roadmap công khai trong dữ liệu. PR tài liệu zh-TW chờ review và merge.

---

**Kết luận:** Ngày cuối tuần ít hoạt động. Dự án có contributor mới (@supersonictw) đầu tư thời gian dịch toàn bộ tài liệu sang zh-TW, tín hiệu tích cực cho việc mở rộng thị trường. Maintainer chưa có phản hồi.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-11-02

## 📊 Tóm tắt hôm nay

Không có hoạt động mới. Năm PR dependency update từ dependabot vẫn đang mở, cũ nhất từ tháng 8. Không có issue, không có release, không có commit mới trong 24h qua.

## 🚀 Releases

Không có release.

## 📈 Tiến độ dự án

**Trạng thái застой - đình trệ hoàn toàn:**

- **5 PR dependency đang mở**, không được review hay merge:
  - #8160: 43 dependency updates (Rust) - mở từ 25/10
  - #8159: 11 GitHub Actions updates - mở từ 25/10  
  - #8141: 5 tokio ecosystem updates - mở từ 18/10
  - #8140: serde_json update - mở từ 18/10
  - #7834: 4 WASM updates - **mở từ 23/8** (2+ tháng)

**Xu hướng:**
- Không có maintainer activity
- Backlog dependency updates chồng chất
- Rủi ro security tăng (outdated deps)
- Không có development activity thực sự

## 💬 Điểm nổi bật cộng đồng

Không có tương tác. Tất cả PR từ bot, 0 reactions, không có comments.

## 🐛 Ổn định & Bugs

Không có bug report hay fix trong 24h. Không thể đánh giá stability vì không có activity.

## ✨ Yêu cầu tính năng

Không có feature request.

## 📣 Phản hồi người dùng

Không có user feedback, discussions, hay comments.

## 🗓️ Backlog & Roadmap

**Backlog hiển nhiên**: 5 dependency PRs cần review/merge.

**Roadmap**: Không rõ. Dự án có vẻ bị abandon hay maintainer vắng mặt kéo dài.

---

**⚠️ Cảnh báo**: Dự án có dấu hiệu không được maintain. Dependency updates tích tụ 2+ tháng cho thấy không có người quản lý active. Cân nhắc kỹ trước khi sử dụng trong production.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-11-02

## Tóm tắt hôm nay
Ngày yên. Không release mới. Hoạt động chính: đóng bug lazy-load channel (#7546 closed), đóng 2nd-desktop-kill (#8033 closed). 18 PR active đang sửa bugs cũ, chờ merge.

## Releases
Không có.

## Tiến độ dự án

**Merged hôm nay:**
- #7546: lazy-load channel modules — sửa #7367 console-only boot mất 30-45s vì import toàn bộ 18 channel builtin. Giờ chỉ load khi dùng.
- #8033: fix desktop reconcile — instance thứ 2 kill backend instance thứ nhất, người dùng mở 2 cửa sổ thì cái đầu chết backend.

**PR quan trọng đang active:**
- #8445: MCP fallback — server trả 404 + `-32601` cứng fail, không thử legacy handshake. Legacy server chết.
- #8504: desktop approval notifications — thông báo approval qua system khi app background.
- #8367: keyword + agentic search — tìm nội dung chat, không chỉ title. Title auto-gen thiếu từ người dùng nhớ.
- #8178: nested skill dirs — skill hiện chỉ `<root>/<skill>/`, giờ hỗ trợ `<root>/<category>/<skill>/`.
- #8170: console chunk-error retry + DOM mutation tolerance — rebase #7889 lên main.
- #8527: report unusable dependency state root at startup — fnOS sandbox, passwd home không ghi được, crash import.
- #8526: honor `QWENPAW_LANGUAGE` — fresh install hardcode `zh`, Docker unattended boot toàn tiếng Trung.
- #8525: trust `HOME` over passwd home — fnOS app user passwd home không tồn tại, crash dependency lock.
- #8524: decode HTML path — desktop bridge open workspace HTML, path tiếng Trung percent-encode vỡ Windows `startfile`.
- #8480: control command routing — Feishu/QQ/WeChat reply với `/stop` không nhận, vì channel prepend quoted text.
- #8231: persist market install provenance — "Update All" không cover third-party plugin, mất URL sau install.
- #8027: offload skill download — blocking fs work trong async handler, download lớn treo.
- #8411: Matrix recover cached session — password auth login lại mỗi restart, homeserver mất encryption key, decrypt fail.
- #8309: discover Ollama models — `qwenpaw init` không list model, người dùng gõ mù.
- #8319: handle `GROUP_MESSAGE_CREATE` — QQ gateway event bị drop, plugin chỉ nhận mention variant.
- #8305: preserve structured custom channel config — array/object bị flatten thành string khi edit.
- #8304: normalize Matrix credentials — paste token/user-id có whitespace, fail auth/owner check.
- #8302: retain consumers until shutdown — task destroyed pending khi queue manager replace.

**Xu hướng:**
Sửa bugs cơ bản: startup perf, desktop crashes, channel protocols, Matrix E2E, Ollama UX. Không có feature lớn.

## Điểm nổi bật cộng đồng

**#7318** (discussion, 36 comments, 4 👍): QwenPaw Hub multi-tenant đã ship 2.2.0, team hỏi build gì tiếp. Personal assistant → team usage.

**#8521** (2 comments): phàn nàn UI mới:
1. Agent không trả lời, chỉ "thinking…"
2. Ctrl+C copy phải nhấn nhiều lần
3. UI mới chậm hơn cũ, model switching rườm rà. Muốn toggle về UI cũ.

## Ổn định & Bugs

**Critical fixed:**
- #7367 → #7546 merged: console-only boot 30-45s — `lark_oapi` import 18.5s. Fixed lazy-load.
- #8033 merged: 2nd desktop kill 1st backend.

**Active fixes:**
- #8424 → #8445: MCP server không fallback legacy.
- #8515 → #8525 + #8527: fnOS sandbox crash — passwd home không ghi, dependency lock fail.
- #8528: Markdown preview subdirectory link 404 — rewrite relative path thành `/api/files/preview/...` không biết base dir.
- #8500: Auto-Dream drop memory — extract fail, checkpoint anyway, không retry.

## Yêu cầu tính năng

**#8523** (1 comment): task scheduling — muốn hẹn giờ agent chạy job hàng ngày, kết thúc push IM, user confirm rồi chạy job tiếp. Không dùng cron ngoài, muốn built-in scheduling.

## Phản hồi người dùng

**#8521**: UI 2.x chậm hơn 1.x, model switching kém. Copy fail nhiều lần. Agent không trả lời random. Muốn switch UI cũ.

## Backlog & Roadmap

#7318 discussion chưa kết luận build gì sau Hub multi-tenant. 18 PR đang chờ review, tập trung bugs cũ. Không có roadmap public rõ ràng.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*