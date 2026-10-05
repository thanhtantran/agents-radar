# Bản tin Hệ sinh thái Hermes Agent 2026-10-05

> Issues: 103 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-05 02:00 UTC

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

# Báo cáo Hermes Agent 2026-10-05

## 🔥 Tóm tắt hôm nay

Không có release. Ngày tập trung xử lý bugs và cải thiện code health: 30 PRs được tạo, nhiều PR fix lỗi critical về context compression, gateway restart, và cài đặt. Issue #132934 (P1) nổi bật: compaction handoff bị republish làm assistant reply, phá vỡ summary classification.

## 📦 Releases

Không có release trong 24h qua.

## 🚀 Tiến độ dự án

### PRs quan trọng (30 PRs mới)

**Critical fixes:**
- #133032: Fix compression với plugin loads - serialize để tránh race condition khi checkpoint
- #133030: Gateway restart command bị bind vào install root cũ → fail sau update
- #128545: `/stop` không honor qua approval recovery → tool vẫn chạy sau khi user stop
- #133029: Memory entry written trước limit mới → không remove được

**Security & deps:**
- #133033: Bump PyJWT, httpx2, urllib3, tornado qua các CVE mới publish
- #82889, #82891: Supply-chain tamper gates cho Electron và kittentts wheels

**Code health:**
- #132646: Per-unit cyclomatic complexity ratchet + `scripts/check` - "code health can only improve"

**Platform compat:**
- #133016: Git installs stop re-downloading history - chuyển sang blobless clone
- #129705: Gate matrix extra khỏi Python 3.14 (python-olm không build được)
- #133019: PM update một package fail không block các package khác

### Issues nổi bật

**P1 Critical:**
- #132934 (2💬): Compaction handoff bị republish as assistant reply - opener bị paraphrase → summary classifier fail

**P2 High priority:**
- #125727 (23💬): Automated Nous integration blocked - merge conflicts
- #128468 (13💬): Desktop transcript duplicate + scroll jump khi streaming
- #125649 (6💬): Kanban worker crash với ModuleNotFoundError - PM-managed runtime issue

## 👥 Điểm nổi bật cộng đồng

- #38519 (16👍, 10💬): Yêu cầu Desktop frontend-only install để connect remote agent
- #4256 (7👍, 4💬): Request configurable keybindings - conflict với tmux/screen

**Engagement cao:**
- Issues về Desktop app (duplicate messages, scroll jumping) có nhiều repro từ users
- Windows non-ASCII username issues (#124526) - common pain point

## 🐛 Ổn định & Bugs

### Critical issues đang xử lý:

**Session & streaming:**
- Duplicate message render trong Desktop (#128468, #128870)
- Context compaction republish bug (#132934)
- WebSocket reconnect loop pegs CPU 100% (#132999)

**Installation & compatibility:**
- Bionic Python bundle layout mismatch (#125503)
- uv lock fails với Python 3.14 (#126194) - pilk/playwright mines
- Windows non-ASCII path breaks uv resolution (#124526)

**Gateway & plugins:**
- pre_gateway_dispatch hook skipped cho follow-up messages (#125923)
- Plugin concurrent loads race on tracked.json (#132943)
- Bot Mode fails với "No module named 'ruamel'" (#125091, #125654)

### Pattern nhận diện:

- Nhiều bugs liên quan Python 3.14 compatibility
- Installation flow có nhiều edge cases chưa handle
- Desktop renderer có state sync issues

## 💡 Yêu cầu tính năng

**Top requests:**

1. **Desktop-only install** (#38519, 16👍): User muốn frontend riêng, connect đến agent trên máy khác
2. **Configurable keybindings** (#4256, 7👍): Hardcoded shortcuts conflict với terminal multiplexers
3. **Run browser_exec trong Docker sandbox** (#133010): Browser Use cần container isolation
4. **Windows system proxy support** (#41957): Chỉ đọc env vars, không đọc system settings

**Developer experience:**
- #133013: Sessions CLI show values bạn filter - improve discoverability
- #102811: Skills prompt quá eager - force load mọi thứ partially relevant
- #100944: Kanban deny worker create per profile - retain lifecycle tools

## 📢 Phản hồi người dùng

**Pain points:**

1. **Installation complexity**: Nhiều env-specific failures (Termux, Windows non-ASCII, Python 3.14)
2. **Desktop UX**: Duplicate messages, scroll jumping frustrate users
3. **Config ergonomics**: Config set không work với nested list entries (#132963)
4. **Documentation gaps**: Termux APT docs stale (#122445)

**Positive signals:**
- Community đóng góp fixes: #125903 (inspired by Poke), plugin catalog updates
- Active triage: nhiều bugs được reproduce và fix trong ngày

## 📋 Backlog & Roadmap

**Inferred priorities từ P1/P2 labels:**

1. **Stability first**: Context compression, gateway restart, session state
2. **Platform compat**: Python 3.14, Windows edge cases, ARM64 support
3. **Desktop polish**: Streaming UX, file handling, SSH profiles
4. **Developer experience**: CLI ownership refactor (#125028 - Phase 2)

**Long-term bets:**
- Supply-chain security hardening (checksum pins, mirror verification)
- Code health automation (complexity ratchets, `scripts/check`)
- Plugin ecosystem maturity (lifecycle hooks, catalog growth)

**Blocked/needs-decision:**
- #102811: Skills loading strategy
- #100944: Kanban capability model
- #115097: Plugin inline-keyboard callbacks registration

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-05

## 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 2026-10-05 đang trong giai đoạn **ổn định hóa sau tăng trưởng nhanh**. Không dự án nào release mới. Tất cả focus vào:
- Fix bugs production nghiêm trọng (memory leak, session routing, update rollback)
- Harden platform compatibility (container, mobile, Windows edge cases)  
- Polish UX existing features thay vì thêm tính năng

**Điểm đáng chú ý:** Hermes Agent và OpenClaw gặp hậu quả update lỗi nghiêm trọng (context compaction, update rollback). Community pressure về operational pain (token burn, notification spam) lớn hơn feature requests.

---

## 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity Level | Community Heat |
|-------|--------|-----|----------|----------------|----------------|
| **Hermes Agent** | 103 | 500 | 0 | 🔥🔥🔥 Rất cao (30 PRs/ngày) | ⭐⭐⭐ Top request 16👍 |
| **OpenClaw** | 157 | 500 | 0 | 🔥🔥🔥 Cao (19 PRs/ngày) | ⭐⭐⭐ Multi-platform pain |
| **NanoBot** | 7 | 50 | 0 | 🔥🔥 Trung bình (8 PRs) | ⭐⭐ Token burn frustration |
| **Zeroclaw** | 6 | 50 | 0 | 🔥🔥 Trung bình (19 PRs) | ⭐⭐ Data loss P0 |
| **PicoClaw** | 4 | 9 | 0 | 🔥 Thấp (5 PRs) | ⭐ QQ API stale 10 ngày |
| **NanoClaw** | 8 | 32 | 1 | 🔥🔥 RC release | ⭐⭐⭐ Local model 30min timeout |
| **NullClaw** | 3 | 7 | 0 | 🔥 Thấp | ⭐ Zero external reports |
| **IronClaw** | 0 | 5 | 0 | ❄️ Dormant (bot only) | ❄️ Zero engagement |
| **Qwen-Paw** | 12 | 8 | 0 | 🔥 Stability sprint | ⭐⭐ Memory leak 23 ngày |

**Pattern:** Dự án lớn (Hermes, OpenClaw) có PR velocity cao nhưng stability issues tăng. Dự án nhỏ (NullClaw, PicoClaw) ít drama nhưng cũng ít traction. IronClaw abandoned.

---

## 🎯 Vị thế của Hermes Agent

### Điểm mạnh
- **Velocity cao nhất:** 30 PRs/ngày, community đông (16👍 top request)
- **Code health culture:** Cyclomatic complexity ratchet (#132646), supply-chain tamper gates (#82889)
- **Desktop focus:** Nhiều issues về Desktop app UX, không dự án khác có

### Điểm yếu
- **Critical bugs tồn đọng:** Context compaction republish (#132934), WebSocket CPU 100% (#132999)
- **Python 3.14 compatibility:** Nhiều edge cases chưa handle (#126194, #129705)
- **Installation complexity:** Termux, Windows non-ASCII, Bionic bundle mismatch

### So với competitors
- **vs OpenClaw:** OpenClaw focus multi-agent + WhatsApp channel, Hermes focus desktop UX
- **vs NanoClaw:** NanoClaw có calendar versioning + release discipline, Hermes vẫn semantic ver
- **vs NanoBot/Zeroclaw:** Hermes có ecosystem lớn hơn (500 PRs vs 50 PRs)

**Vị trí:** Leader về scale nhưng chưa vượt qua các rivals về stability. OpenClaw và NanoClaw có production discipline tốt hơn.

---

## 🔧 Hướng kỹ thuật chung

### 1. **Context window management** (tất cả dự án)
- Hermes: Compaction handoff bug (#132934)
- OpenClaw: Transcript read performance (#165221)
- NanoBot: Token burn 1M/2h không rõ nguồn gốc (#5266)

### 2. **Multi-agent coordination**
- OpenClaw: Native Codex subagent visibility (#87666)
- NanoClaw: Agent lifecycle control (#4027)
- Zeroclaw: Typed stop taxonomy (#10504)

### 3. **Platform hermetic**
- Hermes: Python 3.14, Windows non-ASCII
- OpenClaw: Unprivileged LXC, FICLONE ioctl (#164113)
- NullClaw: Android/Termux transport corruption (#1018)
- PicoClaw: ARM32 updater chọn nhầm binary (#3399)

### 4. **Channel stability**
- OpenClaw: WhatsApp DM handoff (#161976), TTS 48kHz không play mobile
- PicoClaw: QQ API outdated, OneBot emoji spam (#3395)
- NanoClaw: Telegram long poll timeout, delivery failures

### 5. **Security hardening**
- Hermes: Supply-chain checksum pins (#82889, #82891)
- Zeroclaw: CLI approval audit (#11518), SQLite hygiene (#11458)
- PicoClaw: Baileys message spoofing (GHSA-qvv5-jq5g-4cgg)

**Trend:** Tất cả đang move từ "make it work" sang "make it work everywhere + make it auditable".

---

## ⚡ Điểm khác biệt

### Chiến lược phát triển

| Dự án | Strategy | Độ ưu tiên |
|-------|----------|------------|
| **Hermes Agent** | Desktop-first, consumer UX | Feature breadth |
| **OpenClaw** | Multi-agent workflows, channel diversity | Enterprise stability |
| **NanoBot** | WebUI mobile polish | UX refinement |
| **Zeroclaw** | Runtime security, permission model | Security-first |
| **NanoClaw** | Release discipline, calendar versioning | Production readiness |
| **PicoClaw** | Chinese market, QQ/WeChat channels | Platform localization |
| **Qwen-Paw** | Chinese user base, DeepSeek/OpenCode integration | China AI ecosystem |

### Tính năng độc quyền

- **Hermes:** Desktop app, SSH profiles, Kanban worker
- **OpenClaw:** WhatsApp channel, managed service handoff, cost budgets (requested chưa có)
- **NanoBot:** Scheduled tasks với chat selector, MCP schema budget
- **Zeroclaw:** Shell V1 permission policy (RFC #7155), Tailscale tunnel publish
- **NanoClaw:** Update channels (stable/beta/dev), Iron Proxy keyless local models
- **PicoClaw:** OneBot configurable reactions, multi-key model persistence

### Cộng đồng

- **Hermes:** Lớn, diverse. Top request về Desktop-only install (#38519)
- **OpenClaw:** Production users vocal. WhatsApp pain point nhiều comments
- **NanoBot:** Operational complaints (token burn, compaction spam) > features
- **PicoClaw:** Chinese community. QQ API lag awareness cao
- **Qwen-Paw:** 33% issues tiếng Trung. DeepSeek model integration demand
- **NullClaw/IronClaw:** Zero external engagement

---

## 👥 Mức độ trưởng thành cộng đồng

### Tier 1: Mature ecosystems
- **Hermes Agent:** 16👍 top request, nhiều repro từ users, community đóng góp fixes
- **OpenClaw:** 25💬 cost budget thread, detailed edge case reports (LXC, seccomp)

### Tier 2: Growing
- **NanoBot:** Token logging issue 2 tháng chưa resolve, nhưng có community vocal
- **NanoClaw:** Local model users frustrated với 30min timeout (#3643)
- **Zeroclaw:** Sendblue/Discord channel requests

### Tier 3: Early/Internal
- **PicoClaw:** Maintainer @vernonstinebaker tự report bugs, first-time contributors
- **Qwen-Paw:** First-time contributors tăng (3/8 PRs), nhưng Chinese-only

### Tier 4: Abandoned
- **IronClaw:** 100% Dependabot, PR tồn 43 ngày không merge, zero human activity
- **NullClaw:** Maintainer-only issues, không external reports

**Insight:** Community maturity không tỉ lệ với PR count. OpenClaw 500 PRs nhưng production complaints lớn. NanoBot 50 PRs nhưng users đòi observability.

---

## 🔮 Tín hiệu xu hướng

### 1. **Calendar versioning adoption**
NanoClaw chuyển sang `YYYY.M.PATCH` với release channels. Hermes/OpenClaw vẫn semantic ver nhưng có upgrade pain → likely follow.

### 2. **Cost control demand**
OpenClaw #42475 (25💬), NanoBot #5266 (13💬) → Per-agent budget, token logging sẽ là standard feature.

### 3. **Multi-agent observability**
OpenClaw subagent visibility (#87666), NanoClaw agent lifecycle control (#4027) → Team coordination là next frontier.

### 4. **Platform hermetic hardening**
Tất cả dự án đang fix container/mobile/unprivileged env issues. Supply-chain security (Hermes tamper gates, Zeroclaw SQLite hygiene) sẽ là baseline.

### 5. **Channel stability focus**
WhatsApp (OpenClaw), Telegram (NanoClaw), QQ (PicoClaw) đều có multi-issue. Native channel integrations đang replace third-party wrappers.

### 6. **Silent failure elimination**
NanoBot silent compaction, OpenClaw silent fallback, Zeroclaw silent approval fail → Observability là pain point #1.

### 7. **Chinese market differentiation**
PicoClaw (QQ/WeChat), Qwen-Paw (DeepSeek/OpenCode) focus localization. Riêng một track phát triển độc lập với Western ecosystem.

---

## 💡 Khuyến nghị chiến lược cho Hermes Agent

### Immediate (fix để giữ momentum)
1. **Resolve context compaction bug** (#132934) - đang phá summary classification
2. **Python 3.14 compatibility pass** - nhiều mines, block early adopters
3. **Installation flow hardening** - Windows non-ASCII, Termux, Bionic edge cases

### Short-term (3-6 tháng)
1. **Per-agent cost budgets** - community demand cao (#42475-equivalent cho Hermes)
2. **Token usage logging** - learn từ NanoBot #5266 pain
3. **Desktop app polish** - duplicate messages, scroll jumping → competitive advantage

### Long-term (strategic bets)
1. **Calendar versioning + release channels** - learn từ NanoClaw
2. **Multi-agent coordination primitives** - OpenClaw đang lead, Hermes cần catch up
3. **Supply-chain security** - đã bắt đầu (#82889), làm thành differentiator

### Risks to watch
- **Stability debt accumulation:** Velocity 30 PRs/ngày có thể vượt review capacity
- **Feature breadth vs depth:** Desktop + plugins + multi-platform → surface area lớn, bugs nhiều
- **Community expectation mismatch:** Users muốn production reliability, project vẫn ở growth mode

---

**Kết luận:** Hermes Agent lead về scale nhưng competitors đang close gap về stability. OpenClaw có production discipline, NanoClaw có release rigor, Zeroclaw có security-first culture. Để maintain leadership, Hermes cần shift từ velocity sang quality - fix critical bugs backlog, establish release discipline, và invest vào observability.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo phân tích OpenClaw - 2026-10-05

## 1. Tóm tắt hôm nay

Ngày 2026-10-05 tập trung xử lý hậu quả update 2026.9.8: nhiều issues P0 về update rollback, activation Doctor treo, và managed handoff thất bại. Team đóng một loạt bugs nghiêm trọng qua PR (transcript reads perf, Windows service reinstall, lifecycle cleanup). Không có release mới.

## 2. Releases

Không có release trong 24h qua. Version ổn định hiện tại: **2026.9.8**.

## 3. Tiến độ dự án

**PRs quan trọng merged/gần merge:**

- **#165221** (CLOSED): Bound transcript source reads - fix heap spike 100+ MB khi read large sessions, move sang worker
- **#165207** (OPEN): Fix startup backlog serialization - agents nhỏ phải đợi agents lớn rebuild transcript xong, giờ reconcile parallel
- **#165261** (OPEN): Windows service reinstall safe - stop old process trước khi start replacement, tránh treo
- **#165257** (OPEN): Fallback byte copy khi FICLONE ioctl bị seccomp deny (fix unprivileged LXC #164113)

**Xu hướng:**
- Performance: loạt PR move session reads sang workers (#165028, #165193, #165254) để tránh block event loop
- Reliability: xử lý edge case ở container/unprivileged environments
- Update hardening: versioned upgrade recipes (#164501), safer handoff

## 4. Điểm nổi bật cộng đồng

**Issues nhiều comments (≥6):**

1. **#42475** (25 💬): Per-agent cost budget tại gateway - feature request từ tháng 3, chưa implement
2. **#97616** (17 💬): Child process leak → zombie accumulation, runtime degradation - regression P1 ảnh hưởng stability
3. **#161976** (14 💬): WhatsApp DM reply fail sau restart do durable registry handoff - intermittent, khó repro
4. **#144502** (12 💬): WhatsApp mobile không play TTS voice notes (48 kHz + Lavf vendor tag) - UX friction P1

Trend: WhatsApp channel stability là pain point lớn (nhiều issues liên quan DM delivery, TTS format). Cost management chưa đáp ứng nhu cầu production.

## 5. Ổn định & Bugs

**P0 blockers (update path):**

- **#164066** (CLOSED): 2026.9.8 update vẫn rollback vì activation Doctor "offline maintenance" (#160671, #163803 không ship trong 9.8)
- **#164074** (6 💬): Native update recovery treo ở publication-complete khi package fingerprint thay đổi
- **#164113** (5 💬): Update fail FICLONE EPERM trong unprivileged LXC - fixed by #165257
- **#164986** (3 💬): 2026.9.8 update repair fail tại finalize:plugins sau Doctor maintenance

**P0 runtime:**

- **#144094** (3 💬): Gateway crash-loop trên macOS launchd - boot "ready" rồi tự terminate trong 1s
- **#144447** (6 💬): Git/dev update dừng ở managed-service-preflight sau candidate startup deadline

**Diagnosis:** Update path 2026.9.8 có nhiều regression. Team đã fix một số (activation Doctor, FICLONE ioctl) nhưng vẫn còn edge cases với managed handoff và plugin finalization.

## 6. Yêu cầu tính năng

**Top requests:**

1. **#42475** (P2, 25 💬): Per-agent cost budget enforcement tại gateway - ngăn runaway spend
2. **#95724** (P2, 6 💬): Memory index theo source directory thay vì per-agent - tránh duplicate vector stores
3. **#70266** (P3, 5 💬): macOS Talk Mode dùng assistant avatar thay vì default orb

**Nổi bật:** 
- **#129884**: Opt-in path excludes cho memory search ranking - file derivative dưới `memory/dreaming/` outrank canonical records
- **#87666**: Native Codex subagent mirror tasks không hiển thị với operator - mất visibility multi-agent activity

Người dùng muốn better cost control, memory deduplication, và observability cho multi-agent flows.

## 7. Phản hồi người dùng

**Pain points chính:**

1. **WhatsApp channel stability** (#161976, #144502, #150918): DM replies fail, TTS không play trên mobile, messages delay ~15 min khi agent đang chạy
2. **Update experience** (#164066, #164074, #164986): Rollback không rõ lý do, recovery treo, managed handoff không hoàn tất
3. **Multi-agent visibility** (#164972, #87666): Team coordination không hoạt động đúng với claude-cli runtime, subagent activity bị ẩn
4. **Memory ranking** (#129884): Derivative files outrank canonical - cần tuning hoặc opt-in excludes

**Positive signals:**
- PRs addressing perf issues (transcript reads, worker offload) nhận được attention tốt
- Community reports chi tiết edge cases (unprivileged LXC, seccomp deny) giúp team fix hermetic

## 8. Backlog & Roadmap

**Đang xử lý (từ PRs/issues):**

- **Update reliability:** Versioned upgrade recipes (#164501), safer Windows service handling (#165261)
- **Performance:** Move session authority reads sang workers (#165028, #165193, #165254)
- **Multi-agent support:** Native Codex subagent visibility (#87666), Buzz thread session isolation (#144331)
- **Channel stability:** WhatsApp TTS format (#144507), Telegram DM queuing (#150918)

**Chưa schedule:**
- Per-agent cost budgets (#42475) - P2 nhưng không có linked PR
- Memory index optimization (#95724, #129884)
- Native Talk Mode avatar config (#70266)

**Next milestones:** Không có roadmap công khai trong dataset. Team đang ở firefighting mode sau 2026.9.8 release.

---

**Kết luận:** OpenClaw đang patch intensive sau update 2026.9.8 có nhiều regressions. Focus chính: stability (update path, WhatsApp channel, multi-agent), performance (offload session reads), và hermetic edge cases (unprivileged containers). Feature requests tồn đọng lâu (cost budgets từ tháng 3) chưa được ưu tiên.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot ngày 2026-10-05

## 1. Tóm tắt hôm nay

Dự án tập trung vào hoàn thiện WebUI mobile, sửa lỗi provider và tối ưu trải nghiệm người dùng. Không có release mới. 8 PR merged, tất cả về UX refinement và bugfix. Cộng đồng quan tâm về context compaction gây nhiễu và token consumption quá cao.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Mobile WebUI improvements (6 PR merged):**
- #6052, #6053, #6055, #6056: Fix iOS keyboard viewport issues, touch targets discoverable, search fit above keyboard, no auto-zoom on form focus
- #6058, #6059, #6061: Keyboard navigation restored after Escape, sidebar dismiss on current topic tap
- Toàn bộ mobile experience được polish, không thêm feature mới

**Provider fixes (2 PR merged):**
- #6005: Fix temperature drop khi enable `reasoningEffort` cho non-o1 models (#6002) — lỗi ảnh hưởng 38 providers
- #6049: Restore file diff visibility in completed answers
- #6050, #6051 still open: SSE UTF-8 BOM drop first event, Responses API routing by item_id

**Still open nhưng có conflict:**
- #5388 (MCP schema budget)
- #5152 (subagent partial completion)
- #6057 (scheduled task chat selector)
- #6032 (local WebUI extensions)
- #5846 (BUILD substage latency trace)
- #5803 (Telegram improvements)
- #5777, #5545, #5537, #5483 (session/sidebar fixes từ tháng 8-9)

**Xu hướng:**
- Team shift từ feature về polish. Mobile-first UX refinement heavy trong 2 ngày.
- Provider compatibility được chú ý sau regression #6002.
- Conflicts tăng, nhiều PR pending merge cần rebase.

## 4. Điểm nổi bật cộng đồng

**#5266** (13 comments, opened Aug 6): Token consumption quá cao (1M tokens trong 2 giờ không hoạt động rõ ràng). User yêu cầu log chi tiết per-call token usage. Issue vẫn open, chưa có commitment fix.

**#6031** (1 comment, opened Oct 4): Failover hoạt động nhưng chat channels không thông báo khi fallback model serve turn. WebUI có thông báo, channels khác không. #6062 đã mở PR fix.

**#6029** (1 comment, opened Oct 4): Context compaction và idle/dream cycles gửi broadcast status về channel, gây nhiễu. User muốn silent mode cho background operations. Related #5900 (closed).

## 5. Ổn định & Bugs

**Fixed:**
- ✅ `reasoningEffort` drop temperature cho mọi provider (#6002 → #6005)
- ✅ iOS keyboard che UI elements (#6052, #6053)
- ✅ File diff hidden in completed answers (#6049)
- ✅ Sidebar menu focus loss (#6058, #6059)

**In progress:**
- 🔧 SSE BOM loses first event (#6050)
- 🔧 Responses API argument delta routing (#6051)
- 🔧 Sidebar state wiped after failed fetch (#6008 → #6009)
- 🔧 XLSX cells beyond declared dimensions not read (#6060)

**Open không assigned:**
- ⚠️ Token consumption logging (#5266) — user pain cao, chưa có action
- ⚠️ Obsidian CLI không tìm thấy app khi chạy qua nanobot (#6024, closed nhưng unclear resolution)

## 6. Yêu cầu tính năng

**Scheduled task chat selector (#6057):** PR open, cho phép user chọn chat riêng cho từng scheduled task thay vì binding fixed. Production-ready, waiting merge.

**Local WebUI extensions (#6032):** Trusted local extension surface với manifest validation. Security-sensitive, có test, conflict cần resolve.

**Session focus persistence (#5537):** `my` tool lưu focus value qua turns và restart. Design approved, chờ merge từ Aug 25.

**Telegram sticker reuse (#5387):** Expose sticker file_id, cho phép bot reply bằng sticker. Feature hoàn chỉnh, conflict block.

**MCP schema budget (#5388):** Opt-in byte budget cho MCP tool schemas. Design đã ổn định, conflict với base.

## 7. Phản hồi người dùng

**Tích cực:**
- Mobile UX improvements được execute nhanh, systematic.
- Provider regression được catch và fix trong 2 ngày.

**Tiêu cực:**
- Token consumption transparency vẫn là vấn đề lớn (13 comments, 2 tháng không resolved).
- Context compaction gây nhiễu channels, user muốn silent mode (#6029, #5900).
- Nhiều PR conflict, merge velocity chậm lại.

**Observation:**
Community vocal về operational annoyances (token burn, notification spam) hơn là feature requests. Nhu cầu về observability và control cao.

## 8. Backlog & Roadmap

**Immediate (có PR ready):**
- Merge mobile polish stack (#6052-6061)
- Merge provider fixes (#6050, #6051)
- Resolve conflicts cho #5388, #5152, #6057, #6032, #5803, #5777, #5545, #5537, #5483

**Medium priority:**
- Token logging infrastructure (#5266) — 2 tháng overdue
- Silent compaction option (#6029)
- Subagent partial completion marking (#5152)

**Low priority:**
- Telegram stickers (#5387)
- MCP Apps metadata preservation (#5386)

**Technical debt:**
- 10+ PRs có conflict cần rebase
- Session/sidebar state consistency issues từ Aug-Sep vẫn open

Team đang trong phase "finish what was started" thay vì open new tracks. Conflict resolution là bottleneck.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-05

## 🔍 Tóm tắt hôm nay

Ngày tập trung vào bảo mật và ổn định hệ thống. 19 PR mới được mở, xử lý các vấn đề từ data loss (#10495) đến runtime security (#11335). Không có release nhưng nhiều PR target v0.8.6.

## 📦 Releases

Không có release mới.

## 🚀 Tiến độ dự án

**Runtime & Security (ưu tiên cao):**

- #11527 - Block full config save nếu không load từ target → ngăn data loss (#10495)
- #11518 - CLI approval prompt giờ phân biệt EOF vs user denial → audit log chính xác hơn
- #11458 - SQLite audit hygiene hardening với owner/mode checks
- #10610 - Shell V1 permission policy (RFC #7155) - 6 bình luận, cần maintainer review

**Infrastructure:**

- #11530 - Tailscale tunnel publish WSS + enrollment với tailnet certs
- #11531 - Tailscale serve report đúng port 443 thay vì local port
- #11526 - Honor supplied capability boundaries → fix native tool registry leak

**UX:**

- #11529 - Zerocode Linux clipboard với local writers + outcome reporting
- #11528 - Zerocode exit on terminal loss + handle SIGTERM
- #11418 - Copy button không hoạt động (S1 - workflow blocked)

## 🔥 Điểm nổi bật cộng đồng

**Bug P0 - Data Loss:**
- #10495 (5 bình luận) - `Config::save()` replace 109KB config với 702 bytes → mất 25 agents
- #11527 là fix: refuse save nếu không phải loaded value

**Platform Support:**
- #11525 - Quickstart fail trên Android/Termux (3 bình luận) - secret persistence error

**Provider Issues:**
- #9190 - Reliable provider rotate key nhưng không apply được → degraded behavior

## 🐛 Ổn định & Bugs

**Critical (P0-P1):**
- Data loss bug có fix (#11527)
- Android quickstart broken (#11525)
- CLI approval fail-closed log sai (#11335) - đã close với #11518

**Medium (P2-P3):**
- Copy button không hoạt động (#11418)
- Reliable provider key rotation (#9190)

**Test Stability:**
- #11534 - RPC fixture deterministic
- #11533 - Bootstrap WARN isolation
- #11080 - Hailo test platform-independent

## 💡 Yêu cầu tính năng

**Channels:**
- #10768 - Sendblue iMessage/SMS channel (không cần macOS)
- #11122 - Discord native replies + inbound context
- #11076 - `agy_cli` tool cho Antigravity CLI (thay Gemini CLI)

**Runtime:**
- #10504 - Typed stop taxonomy cho turn aborts
- #10597 - Log context usage + budget trims
- #10563 - Re-sample replies claiming unreceipted actions

**UI:**
- #10698 - Guided cron schedule editor (thay raw textbox)

## 📢 Phản hồi người dùng

**Pain Points:**
- Config loss (#10495) - sản xuất data loss thực tế
- Android support (#11525) - platform gap
- Copy feature (#11418) - UX regression
- Tailscale tunnel (#11530/#11531) - deployment blockers

**Architecture Feedback:**
- #11111 - SOP RPC placement exception proposal
- #11436 - Batch 11 holding-crate exceptions → cần Core Team review
- #10611 - Anthropic adaptive-thinking support (Fable 5, Opus 5)

## 🗺️ Backlog & Roadmap

**v0.8.6 (sắp release):**
- Runtime security fixes (#11518, #11527)
- Test stability (#11533, #11534)
- Tunnel fixes (#11530, #11531)

**v0.9.0 (Phase 3):**
- #7432 tracker - gateway separation
- 6 bình luận, status:accepted

**Parking Lot (stale-candidate):**
- Sendblue channel (#10768)
- Discord replies (#11122)
- Cron editor (#10698)
- Shell permission policy (#10610)
- Gateway WebSocket lifecycle (#9002)

**Long-term:**
- Eval live mode (#9214)
- Cron timeout (#9320)
- Provider adaptive thinking (#10611)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-10-05

## 1. Tóm tắt hôm nay

Ngày bình lặng về release nhưng sôi động về bug fixes. **5 PR quan trọng được merge** xử lý critical bugs: agent routing sai session, channel reload panic, multi-key model config loss, ARM updater chọn nhầm binary, async tool results gửi lộn chat. Cộng đồng đang chờ QQ bot API fix và OneBot reaction spam.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Merged PRs (5/9):**

- **#3402** - Fix agent context manager dùng nhầm default agent thay vì routed agent → session answers lộn
- **#3400** - Fix config save mất `api_keys` còn lại và `enabled` flag của multi-key models  
- **#3399** - Fix updater ARM 32-bit download nhầm arm64 binary (substring match bug: `"arm"` match `"arm64"`)
- **#3401** - Fix `Manager.Reload()` panic khi channel nil + race condition async reload
- **#3403** - Fix async tool results (`spawn`) gửi về default agent session thay vì originating session

**Open PRs (4/9):**

- **#3396** - Thêm `reaction_enabled` toggle cho OneBot (mặc định `false`) để tắt auto emoji spam
- **#3381** - Migrate OpenAI provider sang Responses API
- #3353, #3233 - Stale, chờ review

**Pattern:** Tuần này tập trung **stability fixes**, không có feature lớn. Các bug đều liên quan **session routing, config persistence, platform compatibility**.

## 4. Điểm nổi bật cộng đồng

### 🔥 Issue hot nhất

**#3395** - OneBot channel gửi emoji reaction cho **mỗi** tin nhắn group (hardcoded 289 emoji), spam notification. User yêu cầu config bật/tắt.

→ **#3396** submit ngay PR thêm `reaction_enabled: false` mặc định. Phản hồi nhanh từ maintainer.

### 🐛 Bugs người dùng báo

- **#3394** (2 comments) - QQ bot API đã update nhưng PicoClaw QQ channel chưa sync, channel bị lỗi
- **#3392** (2 comments) - CLAassistant không detect signature, block PR #3381
- **#3382** (CLOSED) - DingTalk stream reconnect vẫn panic `send on closed channel` ở v0.3.1

## 5. Ổn định & Bugs

### Critical bugs fixed hôm nay

1. **Agent routing sai** (#3402) - Routed agents chạy default agent logic, câu trả lời sai user
2. **Config corruption** (#3400) - Multi-key model setup mất keys sau save/migrate
3. **Cross-platform** (#3399) - ARM32 devices cài sai binary, app crash
4. **Channel panic** (#3401) - Reload với nil channel crash gateway
5. **Tool result delivery** (#3403) - Async tool results từ chat A gửi sang session B

### Bugs chưa fix

- **#3394** - QQ channel API outdated
- **#3382** - DingTalk panic vẫn tái hiện (mặc dù closed, user report v0.3.1 vẫn lỗi)

**Impact:** 5 fixes này giải quyết **data corruption + routing bugs + crashes** → chuẩn bị cho stable release.

## 6. Yêu cầu tính năng

**#3395 + #3396** - Configurable OneBot reactions:
- **Need:** Tắt auto-ack emoji để giảm spam notification trong group chat
- **Solution:** `reaction_enabled` flag, default `false`, opt-in
- **Status:** PR đang open, logic đơn giản, likely merge sớm

**#3381** - OpenAI Responses API:
- Migrate từ legacy completion API sang responses API
- Blocked bởi CLA signature issue (#3392)

## 7. Phản hồi người dùng

### Sentiment

- **Tích cực:** Maintainer phản hồi nhanh, 5 critical fixes merged cùng ngày
- **Frustration:** QQ API lỗi 10 ngày chưa fix (#3394), DingTalk panic issue đóng nhưng chưa giải quyết (#3382)

### Pain points

1. **Channel stability** - DingTalk, QQ channels có recurring issues
2. **Config migration** - Multi-key setup dễ mất data khi upgrade
3. **Platform support** - ARM users bị broken updates

## 8. Backlog & Roadmap

### Ưu tiên cao (suy từ activity)

1. **Channel stability hardening** - 3/5 bugs là channel/session routing
2. **QQ bot integration update** - Issue báo 10 ngày, chưa có PR
3. **Config migration testing** - Multi-key model corruption cho thấy regression testing thiếu

### Pattern phát triển

- **v0.3.x focus:** Bugfix cycle, không có breaking changes
- **Next release guess:** Chờ QQ fix + OneBot reaction PR → v0.3.2 stability release
- **OpenAI Responses API** sẽ vào sau khi CLA issue resolve

---

**Kết luận:** Ngày maintenance nặng, 5 critical fixes cùng lúc. Project đang ở stability phase, consolidate trước khi thêm features. Community responsive, maintainer active.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw 2026-10-05

## 📌 Tóm tắt hôm nay

Release candidate đầu tiên với phiên bản calendar (v2026.10.0-rc.1) ra mắt, đánh dấu chuyển từ semantic versioning sang YYYY.M.PATCH. Update giờ theo release tags thay vì tip của `main`. Nhiều bug nghiêm trọng được fix: Telegram message spoofing (Baileys), container startup race conditions, agent reply loss.

## 🚀 Releases

### v2026.10.0-rc.1 (2026-10-04)

**Breaking changes:**
- Calendar versioning: `2.4.0` → `2026.10.0-rc.1`
- `/update-nanoclaw` theo release tags (stable/beta channels)
- Stable channel vẫn ở 2.4.0, beta nhận RC này

**Core improvements:**
- Update channels: `stable` (vX.Y.Z tags), `beta` (rc.N tags), `dev` (main tip)
- Iron Proxy hỗ trợ keyless local models qua HTTP
- Outbound proxy routing cho toàn bộ service
- Gateway refresh khi skill payload thay đổi

**Ý nghĩa:** Chuyển sang release model có cấu trúc hơn. Người dùng production có stable track rõ ràng, early adopters có beta track.

## 📊 Tiến độ dự án

**Merged/Closed PRs quan trọng:**

#4016 - Fix cutover crash khi update tsx/esbuild. Controller load helpers trước khi swap node_modules → hotfix cho blocker #4004

#4024 - Pin Baileys 7.0.0-rc14, fix GHSA-qvv5-jq5g-4cgg (message spoofing critical). WhatsApp channel bịt lỗ hổng nghiêm trọng.

#3986 - Update channels implementation. Core feature cho release workflow mới.

#3988 - Gateway refresh khi skill payload change. Trước đây chỉ refresh khi src/ change.

**Open PRs hot:**

#3918 - Fix agent reply loss/duplication quanh `send_message`. Ảnh hưởng cả streaming (Claude) và end-of-turn providers (OpenCode). Complex fix, core-team đang review.

#4032 - Tell agent khi message permanently fail delivery. Hiện tại agent tưởng message đã gửi.

#4031 - Telegram long poll client timeout. Fix 15-min stall sau network change.

#4030 - Wrap `ask_question` option lists. Telegram/Discord truncate long button rows.

**Trend:** Focus vào reliability và edge cases. Nhiều fix cho production pain points (network issues, race conditions, delivery failures).

## 💬 Điểm nổi bật cộng đồng

**Top issues:**

#3643 (3 comments) - Hardcoded 30-min container timeout giết local-model turns dài. No config override. High priority, containers area.

#3301 (2 comments) - Tasks trong chat sessions drop logs, eat replies. Regression từ #2988 (one-door task delivery).

#3569 (1 comment) - Telegram URLs với odd `_` count fail vĩnh viễn. Chat-adapter pin version cũ 3 releases so với upstream fix.

**Community pain:** Local model users bị 30-min ceiling, không config được. Telegram reliability issues (underscore URLs, delivery failures, long poll hangs).

## 🐛 Ổn định & Bugs

**Critical fixes merged:**

- WhatsApp message spoofing (Baileys rc14 pin)
- Update cutover crash (tsx/esbuild bump)
- Docker startup race (systemd unit wait for docker.service)
- Signal adapter boot clock step fail (monotonic clock)

**Active bugs:**

#4033 - Poll-loop turn queue off-by-one. Follow-ups stamp với earlier message's `in_reply_to`. Claude provider issue.

#4020 - Agent-runner `escapeXml` không reverse. Replies show `&amp;` thay vì `&`.

#4021 - macOS update: `stopService` return trước khi host exit. Snapshot race shutdown, bootstrap fail I/O error 5.

**Status:** High-value fixes shipping. Còn nhiều edge cases (macOS update, XML escaping, turn routing).

## ✨ Yêu cầu tính năng

#4027 - Let coordinator agent restart/clear created agents. `cli_scope: group` block `--id <child>` từ creator.

#4026 (PR open) - Fix `ncl groups restart --id` từ agent. Hiện tại ignore `--id`, restart caller.

**Pattern:** Agent orchestration pain. Multi-agent setups cần lifecycle control tốt hơn.

## 🗣️ Phản hồi người dùng

**Setup/Installation:**
- WhatsApp link rate limit fallback to stale version (#4017 fix merged)
- First-chat ping count failure notice as success (#3980)
- OneCLI upgrade guide Linux gateway URL mismatch (#4028)

**Channel reliability:**
- Telegram: delivery failures, long poll hangs, markdown escaping
- Discord: attachments không download (#2752 open từ June)
- Signal: boot clock step breaks startup

**Developer experience:**
- Update process fragile (cutover crashes, rollback pain)
- Container timeout không config (#3643)
- Task/chat mode confusion (#3301)

**Takeaway:** Production users hit network/gateway/channel edge cases. Setup flow có nhiều corner cases chưa handle.

## 📋 Backlog & Roadmap

**Infrastructure:**
- Calendar versioning hoàn tất
- Release channels (stable/beta/dev) đang roll out
- Agent image pipeline automation (Dependabot visibility, auto-repin)

**Channel work:**
- Branch `channels` có 463 main commits merge pending (#4000)
- Telegram: odd underscore URLs (#3569), delivery retry flow
- Discord: attachment staging (#2752)
- WhatsApp: Baileys security updates

**Core agent:**
- Reply loss fix (#3918) - large complex change
- Turn routing correction (#4033)
- Container lifecycle (timeout config #3643, kill logic)

**Focus tiếp theo:** Stabilize release process, merge channels branch, fix reply/delivery reliability issues.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw — 2026-10-05

## 1. Tóm tắt hôm nay

Ngày hành động nặng. 7 PR đang mở, 3 issue — tất cả về stability trên nền tảng edge (Android/Termux, Docker, worktree). Zero release. Team đang fix transport corruption, permission fail, test infrastructure break. Core focus: làm agent chạy được ở mọi nơi.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR chính:**

- **#1023** (Arthur031221) — fix Docker image. Gateway fail vì `/nullclaw-data` thuộc root, process chạy uid 65534. Patch: `chown` lại sau `COPY`. Đơn giản, đúng hướng.

- **#1019** (vernonstinebaker) — test coverage cho HTTP transport. Pin byte-exact round-trip qua curl, catch truncation/reordering ở Android. Đây là foundation cho #1018 fix.

- **#1021** (vernonstinebaker) — worktree fix. Git push từ worktree export `GIT_DIR`, test suite inherit, chạy nhầm repo. Clear env trước test. Maintainer workflow bị block, PR này unblock.

- **#1022** (googio) — thêm Serply search provider. Clone pattern từ `brave.zig`. Functional addition, không urgent.

- **#1006** (MERGED) — fix stdout corruption khi stream. `File.stdout()` write offset 0, newline ghi đè byte đầu. Chuyển sang append. macOS issue, đã fix.

- **#966** (MERGED) — Android fallback sang curl khi DNS fail. Stdlib HTTP path fail `NameServerFailure` trên Termux, curl work. Patch hoàn thiện buffered fallback.

- **#1004** — log provider error body khi non-2xx. Trước đây free body ngay, không thấy lý do fail. Giờ log scrubbed body, debug dễ hơn.

**Xu hướng:** Team đang harden platform support. Android/Docker là pain point. HTTP transport và git workflow cũng đang được seal.

## 4. Điểm nổi bật cộng đồng

Không có PR nào có nhiều reaction. Issues có 0-2 comment. Community scale nhỏ hoặc team internal đang tự fix. Engagement thấp không phải bad sign — có thể là early stage hoặc focused maintainer team.

## 5. Ổn định & Bugs

**Critical:**

- **#1018** — Android agent output bị scramble/truncate. Exit 0, không error, silent corruption. Nguy hiểm vì không phát hiện được. #1019 và #966 là foundation cho fix này. Chưa resolve.

- **#1017** — Docker gateway fail ngay. Permission issue, đơn giản nhưng block usage. #1023 đang fix.

**Medium:**

- **#1020** — pre-push hook fail từ worktree. Workflow doc recommend worktree, nhưng CI path broken. #1021 fix.

**Resolved:**

- #1006 — stdout corruption macOS. Fixed.
- #966 — Android DNS fail. Fallback curl stable.

## 6. Yêu cầu tính năng

#1022 — Serply search provider. Không phải request từ user, contributor tự add. Expand provider options.

Không có feature request issue nào.

## 7. Phản hồi người dùng

Các issue đều từ @vernonstinebaker (maintainer). Zero external bug report. Hoặc user base nhỏ, hoặc quality cao, hoặc adoption sớm.

## 8. Backlog & Roadmap

Data không đủ. Dựa vào PR pattern:

**Immediate queue:**
- Fix #1018 (Android corruption) — blocker cho production Android use
- Merge #1023 (Docker fix) — blocker cho containerized deploy
- Merge #1021 (worktree fix) — unblock maintainer workflow

**Next likely:**
- Stabilize HTTP transport edge cases
- Expand provider coverage (Serply đã vào)
- Test coverage cho multi-platform

Không có public roadmap. Development reactive theo platform issue.

---

**Nhận xét tổng:** Dự án đang trong pha "make it work everywhere". Không có feature race, focus 100% vào stability và platform compatibility. Maintainer quality cao (comprehensive test, detailed issue write-up). Community participation thấp — cần quan sát tiếp để biết đây là internal project hay early public stage.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-05

## 1. Tóm tắt hôm nay

Không có hoạt động development mới. Dự án đang trong giai đoạn bảo trì với 1 PR dependencies đóng và 4 PR dependencies cũ vẫn mở. Không có issue, release, hay commit từ maintainer.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đóng hôm nay:**
- #8078: Đóng sau gần 1 tháng mở (6/9 → 4/10). Update tokio-ecosystem (tower-http 0.7.0→0.7.1, tokio-tungstenite minor bump)

**PR mở còn tồn:**
- #8123 (mới 1 ngày): tokio-ecosystem updates - tokio-test, tower-http, tokio-tungstenite
- #8114 (8 ngày): 31 dependencies update - thiserror, uuid, base64, v.v.
- #8103 (15 ngày): 8 GitHub Actions updates - claude-code-action, setup-node, v.v.
- #7834 (43 ngày): WASM dependencies - wasmtime, wasmtime-wasi, wit-component, wit-parser

**Xu hướng:**
- 100% hoạt động từ Dependabot
- Review/merge chậm (PR cũ nhất 43 ngày)
- Không có feature work hay bugfix
- Dự án có vẻ inactive về development, chỉ automated maintenance

## 4. Điểm nổi bật cộng đồng

Không có tương tác từ cộng đồng. Không có comment, reaction, hay discussion trên các PR. Zero engagement.

## 5. Ổn định & Bugs

Không có bug report hay fix trong 24h qua. Không có issue nào được mở/đóng.

## 6. Yêu cầu tính năng

Không có.

## 7. Phản hồi người dùng

Không có feedback từ user. Repository im lặng hoàn toàn ngoài bot activity.

## 8. Backlog & Roadmap

Không có thông tin về roadmap hay kế hoạch. Backlog duy nhất là 4 PR dependencies chờ merge.

---

**Kết luận**: IronClaw đang trong trạng thái dormant. Dependabot vẫn chạy nhưng không có human activity. PR dependencies tồn đọng lâu cho thấy maintainer không active. Không có dấu hiệu phát triển tính năng mới hay xử lý vấn đề từ community.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw — 2026-10-05

## Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào sửa bugs khẩn cấp: memory leak trong container, plugin install fail, UI boot hang, approval button sai logic. 5 PR merge/close trong 24h, 1 issue close. Các vấn đề nghiêm trọng (memory exhaustion, event loop blocking) vẫn mở, chưa có fix.

---

## Releases

Không có.

---

## Tiến độ dự án

### PRs đáng chú ý

**Merged/closed trong ngày:**

- **#7299** — Console reject conflicting chat payload (closed): Ngăn client gửi 2 message đồng thời cho cùng chat. Backend trả 200 nhưng không thực thi payload thứ hai, dẫn đến message "phantom" (UI hiển thị nhưng agent không xử lý).

**Đang chờ review:**

- **#8107** (size/S, first-time-contributor): Fix plugin install crash trong container. Vấn đề: `PIP_TARGET` env leak vào pip build subprocess → conflict `--home` + `--prefix` → abort. PR dọn env trước spawn và bỏ qua `importlib.invalidate_caches()` fail (stdlib shadowing bug). Tác giả @Tlrenhb.

- **#8108** (size/S): Console lazy-route chunk fail → permanent hang. PR thêm retry mechanism cho dynamic import. Liên quan #7815 (không trong dữ liệu nhưng được ref).

- **#8102** (size/M): Console boot watchdog. Boot splash treo vĩnh viễn khi entry chunk 404 (cache stale sau update). PR thêm error surface + reload button + 1 auto-retry. Tác giả @wxhking.

- **#8096** (size/S): Provider không trả `finish_reason="length"` khi output truncated → client không phân biệt được trả lời đầy đủ vs bị cắt. PR đưa finish_reason vào response metadata. Tác giả @wxhking.

- **#7738** (first-time-contributor): OpenAI provider forward unknown kwargs (ví dụ `streamIdleTimeoutMs` từ middleware) → `TypeError`. PR filter kwargs trước khi gọi SDK. Tác giả @lumenfield.

- **#7542** (size/XXXL): Message pagination khi scroll lên đầu chat. Context compaction xóa message cũ khỏi session JSON (vẫn nằm trong `history.db`), console chỉ hiển thị đoạn giữa chừng → người dùng mất맥络. PR load older messages on-demand. Tác giả @auwc.

- **#7774** (Under Review): Hub startup provisioner allow-list hard-code `{"local", "docker"}` trong khi runtime service build dynamic list → mismatch. PR derive từ runtime thay vì hard-code. Tác giả @wangjian124.

### Xu hướng

PRs ngày hôm nay đều size S–M, tập trung **surface errors** (console boot, provider finish_reason) và **fix env/subprocess bugs** (plugin install). Không có feature lớn, chỉ stability work. 3/8 PR open từ first-time contributor.

---

## Điểm nổi bật cộng đồng

### Issues nhiều tương tác (comment ≥ 5)

- **#7722** (6 comments, @Nobodyanonymou-s): Memory leak 3 paths compound (unbounded stream buffer + keep-alive instance stack + doom-loop gate evasion). ~1MB/s memory growth → OOM. Có controlled repro. Tạo 2026-09-12, update gần nhất 2026-10-04. **Chưa có fix commit.**

- **#7840** (5 comments, @chcsyf): Plugin synchronous I/O block toàn bộ event loop → freeze instance 40s. Không có contract/isolation/monitoring. Tạo 2026-09-17, update 2026-10-04. **Chưa có fix.**

### Issue được tạo hôm nay (2026-10-05)

- **#8109** (closed): Stream error → session mất toàn bộ lịch sử chat. Agent A gọi agent B, B's session 100% wipe sau stream fail. Tác giả @MCQSJ. **Closed nhanh, có thể duplicate hoặc hotfix ngầm.**

---

## Ổn định & Bugs

### Critical (chưa fix)

1. **Memory exhaustion (#7722)**: 3 paths compound. Slow leak đã report từ #7222 (không trong data), path mới là stream buffer unbounded + keep-alive stack. Vẫn open sau 23 ngày.

2. **Event loop blocking (#7840)**: Plugin sync call freeze toàn instance. Không có thread pool / worker isolation. Open 18 ngày.

3. **DeepSeek v4-pro auto-inject param (#7026)**: `chat_template_kwargs` không wrap trong `extra_body` → openai SDK `TypeError`. Tạo 2026-08-14, 52 ngày chưa fix. Ảnh hưởng mọi call với model đó.

### High priority (đang fix)

- **Console boot hang (#8094, PR #8102)**: WebView2 cache stale → entry chunk 404 → vĩnh viễn treo. PR thêm watchdog.

- **Plugin install fail trong container (#8106, PR #8107)**: `PIP_TARGET` leak + PYTHONPATH stdlib shadow. PR sanitize env.

- **Approval button broken (#8105)**: Cả "đồng ý" và "từ chối" đều reject. Icon envelope không click được. **Chưa có PR.**

### Medium

- **Stream finish_reason mất (#8096)**: Provider stream parser drop `finish_reason="length"`, client không biết output bị cắt. PR đưa vào metadata.

- **Content-inspection false positive (#8092)**: Gateway `data_inspection_failed` (Ali-style) được classify `bad_request` → không retry → turn killed. Benign DevOps chat bị block.

- **OpenCode session header (#8104, #7599)**: `x-opencode-session` (mới) / `x-openscode-session` (cũ?) missing → `MissingSessionID`. Issue cũ (#7599) tạo 2026-09-07, issue mới (#8104) tạo 2026-10-04. **Chưa rõ platform requirement change hay config bug.**

- **Chat deep link fail (#8101)**: `/chat/<UUID>` cross-agent không switch agent, same-agent không activate session. Console routing bug.

---

## Yêu cầu tính năng

- **#7542**: Message pagination (scroll lên load older messages). PR đang review, size XXXL → nhiều surface area.

- **#8103**: Notify user khi daemon fallback sang model khác. Hiện tại silent fallback → user không biết đang chat với model nào. Tác giả @veveyluo.

---

## Phản hồi người dùng

### Pain points rõ ràng

1. **Lack of observability**: Silent fallback (#8103), finish_reason mất (#8096), không biết plugin block event loop (#7840).

2. **Fragile env**: Container install plugin fail (#8106), boot hang vĩnh viễn (#8094), stream error wipe session (#8109).

3. **No retry/recovery**: Content-inspection false positive (#8092), console boot splash (#8094), lazy-route chunk fail (#8108).

### Chinese-language user base

4/12 issues (33%) viết tiếng Trung. DeepSeek model issue (#7026), OpenCode session (#7599, #8104), approval button (#8105), stream session loss (#8109).

---

## Backlog & Roadmap

Không có roadmap công khai trong data. Từ PR pattern:

- **Stability sprint**: 8 PRs đang open đều fix bugs/hardening, không có feature. Focus console boot reliability, provider error surface, subprocess env isolation.

- **Multi-contributor activity**: 4/8 PR open từ first-time-contributor → community contribution tăng hoặc maintainer onboard contributors cho stability work.

- **Technical debt visible**: Hard-coded provisioner list (#7774), lack of retry (#8094, #8108), no plugin isolation (#7840), env leak (#8106, #7738) → infrastructure chưa production-ready.

---

**Kết luận ngắn gọn**: Ngày 2026-10-05 không có release. Hoạt động tập trung sửa stability issues (console boot, plugin install, error surface). Critical bugs (memory leak #7722, event loop blocking #7840) vẫn mở lâu (18–23 ngày). Community contributions tăng (first-time PRs), nhưng technical debt nặng. Cần production hardening pass trước khi scale.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*