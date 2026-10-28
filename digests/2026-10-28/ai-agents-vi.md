# Bản tin Hệ sinh thái Hermes Agent 2026-10-28

> Issues: 201 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-28 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-28

## 🎯 Tóm tắt hôm nay

Dự án tập trung fix bugs sau merge unified gateway (#106742) và webapp (#141864). Nhiều vấn đề session management, platform adapters, và desktop update. Không có release mới.

## 📦 Releases

Không có release trong 24h qua.

## 🚀 Tiến độ dự án

### PRs quan trọng merge/đang review:

**Session & Gateway fixes:**
- #145806: Manual `/compress` dùng đúng context engine của session thay vì force built-in compressor
- #145215: Owner forward drop prompts khi resume snapshot >1MB (websocket max_size)
- #144814: Dashboard-login sessions không resume được từ Desktop native client (not_found)
- #143547: Unified gateway post-merge issues tracker (25 comments)

**Webapp improvements:**
- #145730: Right-click Group Chat để delete
- #145728: Failed restart báo lỗi rõ, page icons load không cần sign-in
- #145574: Memory pages hiện active provider + built-in layer
- #145569: iPhone tap composer focus một lần, có casing/autocorrect
- #145573: CSP header cho webapp page
- #145357: Update không làm blank tab, reload vào build mới

**Desktop & Mobile:**
- #145803: Forward insertText tới PTY khi screenReaderMode on (fix Android keyboard)
- #145788: Phone tab picker reach được archive/delete/rename menu
- #145296: Android soft-keyboard input dropped (xterm screenReaderMode ignore insertText)

**Infrastructure:**
- #145804: Locale catalogs vào managed workspace snapshot
- #145799: Configured auth/user-agent headers replace thay vì gửi 2 lần
- #80135: Preserve non-prefixed systemd gateway process trong update

## 🔥 Điểm nổi bật cộng đồng

**Top issues theo comments:**

1. **#131859 (53 comments)**: API CreatePullRequest permission error - blocked, upstream issue
2. **#143379 (28 comments)**: RFC về doc-chain substrate network - compression & governance
3. **#143547 (25 comments)**: Unified gateway post-merge problems tracker
4. **#139818 (24 comments)**: Remote-backend Desktop sessions không resume được - session state risk

**Vấn đề người dùng quan tâm:**
- Session resumability cross-surface (Desktop ↔ mobile dashboard ↔ serve)
- Desktop update failures trên installs lớn (state.db >1GB timeout)
- Platform adapter stability (Matrix rate-limit, QQ WebSocket zombie, Slack free-text status)
- Webapp usability trên mobile (keyboard, touch, UI scaling)

## 🐛 Ổn định & Bugs

### Critical bugs đang fix:

**Session management:**
- #145215 (P1): Owner forward drop prompts >1MB websocket limit
- #144814: Dashboard sessions not_found từ Desktop
- #139818: Remote Desktop sessions unresumable locally
- #143715: Bot Chat delivery refused khi canonical title held by unbound tui session

**Desktop update:**
- #133253, #128605: state.db pre-flight timeout trên large DBs (>1GB)
- #143331: Windows update fail mỗi lần - stale gateway.pid + lock conflict
- #135183: Update abort exit 3 under comma-decimal locale (LC_NUMERIC=it_IT)

**Platform adapters:**
- #126493: Matrix no backoff cho M_LIMIT_EXCEEDED, drop approval prompts
- #19821: QQ Bot WebSocket zombie - no error, no reconnect
- #143364: Multiplexed profile progress deliver via wrong bot

**Mobile/Webapp:**
- #145296: Android keyboard input dropped (screenReaderMode)
- #145593: Long user messages fill 90% viewport, squeeze agent reply
- #145183: Desktop translucent trên Linux, không tắt được via UI

### Platform-specific:

**Windows:**
- #69033: Terminal tool orphan bash children (missing process-group detach)
- #88945: Python backend flash console windows (missing CREATE_NO_WINDOW)
- #101789: Update fail - third-party process CWD block rename

**Linux:**
- #121954: Desktop crash SIGTRAP/SIGSEGV on launch (4 crashes trong 2 ngày)
- #143569: Desktop window never appear - /dev/shm ENOSTAT 3

## 💡 Yêu cầu tính năng

**Session & Collaboration:**
- #112028: Multi-surface access same session (Desktop + mobile)
- #136319: Mobile read-only mirror live Desktop session + input routing
- #51694: Command Center (⌘K) search FTS, archived, cross-profile

**Memory & Context:**
- #12323: Personal message ingestion pipeline - unified People DB từ iMessage/Signal/WhatsApp/X/Gmail

**Desktop UX:**
- #117715: Custom link handlers + inline local-file navigation
- #145798: Floating in-app Browser + address bar trong web build

**Infrastructure:**
- #64890: Propagate per-run metadata tới MCP tools/call requests

## 👥 Phản hồi người dùng

**Positive:**
- Webapp (#141864) merge cho browser-hosted Desktop - shared gateway cross surfaces
- Desktop settings improvements - memory provider visibility, translucency controls

**Pain points:**
- Desktop update unreliable trên large installs - pre-flight timeouts, lock conflicts
- Session resume failures cross-surface - not_found errors frequent
- Mobile webapp usability gaps - keyboard input, viewport scaling, menu access
- Platform adapter stability - rate-limit handling, connection management

**Requests:**
- Better cross-profile session search
- Mobile co-working với Desktop sessions
- Stable platform adapters (Matrix, QQ, Slack)

## 📋 Backlog & Roadmap

**Near-term focus (dựa trên P1/P2 issues):**

1. **Session stability** - fix resume not_found, owner forward limits, cross-surface ownership
2. **Desktop update reliability** - handle large state.db, Windows lock conflicts, locale issues  
3. **Mobile/webapp polish** - keyboard input, touch UX, viewport scaling
4. **Platform adapter hardening** - backoff/retry, connection monitoring, rate-limit respect

**Architectural work in progress:**
- Unified gateway consolidation (#143547 tracker)
- Webapp post-merge follow-ups (#144648 tracker)
- Session ownership & admission model refinements

**No explicit roadmap milestones** - team fixing post-merge issues, stability work.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-28

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent năm 2026 phân tầng rõ nét: **production-grade platforms** (Hermes, OpenClaw, ZeroClaw, QwenPaw) vs **research/niche tools** (NanoBot, NanoClaw, PicoClaw). Không có "winner-takes-all" - mỗi dự án phục vụ segment khác nhau.

**Xu hướng chung ngày 28/10:**
- Security hardening (Wasmtime patches, RPC ownership, prompt guard tuning)
- Session management stability (cross-device resume, ownership transfers)
- Mobile/webapp UX improvements
- Update reliability crisis (nhiều dự án gặp failed-update-leaves-system-broken)

**Mức độ hoạt động:** OpenClaw > QwenPaw > Hermes > ZeroClaw > NanoBot >> others. PicoClaw/NullClaw/IronClaw unmaintained hoặc zombie repos.

---

## 2. Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases 24h | Comments/PR trung bình | Severity bugs | Community pulse |
|-------|--------|-----|--------------|------------------------|---------------|-----------------|
| **Hermes Agent** | 201 | 500 | 0 | ~5 | P1: 3 (session resume, owner forward, Desktop update) | 🟡 Moderate - post-merge stabilization |
| **OpenClaw** | 142 | 500 | 3 | ~3 | P0: 3 (Windows restart loop, stuck agent-DB, sync persistence block) | 🔴 High - Skill Workshop anger (#184600) |
| **QwenPaw** | 19 | 50 | 1 beta | ~2 | Critical: 2 (context overflow no recovery, plugin install abort) | 🟢 Healthy - velocity + first-time contributors |
| **ZeroClaw** | 15 | 42 | 1 | ~2 | S1: 3 (Android shell fail, MCP poisoned, prompt guard false positives) | 🟢 Strong - 19 contributors in release |
| **NanoBot** | 2 | 28 | 0 (0.4.0 pending) | ~1 | Medium - Windows CRLF, touch gestures | 🟡 Moderate - polish sprint |
| **NanoClaw** | 0 | 5 | 0 | 0 | Low - credential exposure risk | 🔴 Low - WhatsApp bug 6 months unfixed |
| **PicoClaw** | 2 | 0 | 0 | 0 | None reported | 💀 Unmaintained - community forking |
| **NullClaw** | 0 | 0 | 0 | 0 | N/A | 💀 Dead |
| **IronClaw** | 0 | 0 | 0 | 0 | N/A | 💀 Dead |

**Metrics ngày 28/10:**
- **Velocity cao nhất:** OpenClaw (16 PRs merged), QwenPaw (8 PRs merged + beta)
- **Security focus:** ZeroClaw (4 P1 PRs security-related), OpenClaw (Wasmtime/Rustls patches)
- **Community anger:** OpenClaw Skill Workshop (#184600) - contaminated agent behavior
- **Abandonment:** PicoClaw fork announced, NullClaw/IronClaw no activity

---

## 3. Vị thế Hermes Agent

### Định vị

**Tier:** Production unified-gateway platform, cạnh tranh trực tiếp với OpenClaw/ZeroClaw.

**Strengths:**
- Webapp (#141864) + unified gateway (#106742) merged → cross-surface session sharing
- Desktop + mobile + serve + browser-hosted = broadest surface coverage
- Session substrate flexible (canonical title, owner forward, compression)

**Weaknesses:**
- **Post-merge stability crisis:** 25 comments tracker (#143547), session resume failures frequent (#144814, #139818, #145215)
- **Update reliability behind competitors:** OpenClaw shipped 3 releases fixing update issues; Hermes chưa có release mới
- **Mobile UX lagging:** Android keyboard input dropped (#145296), viewport scaling issues (#145593)
- **Desktop update timeout trên large DBs:** Cùng vấn đề với OpenClaw (#133253, #128605) nhưng chưa có fix

### So sánh trực tiếp

| Tiêu chí | Hermes Agent | OpenClaw | ZeroClaw | QwenPaw |
|----------|--------------|----------|----------|---------|
| **Architecture** | Unified gateway + multi-surface | Gateway-centric + worker isolates | RPC session + native channels | PawApp SDK + durable tasks |
| **Session model** | Canonical title + ownership transfer | Agent-DB admission | RPC authority + event history | Chat history + workspace snapshot |
| **Update strategy** | Manual via Desktop UI | npm/gateway restart (unreliable) | Docker rebuild + LTS track | Tauri auto-update |
| **Mobile support** | Webapp in-progress (keyboard bugs) | Not primary focus | Android S1 bugs (#12075) | Mature (realtime voice #7785) |
| **Platform adapters** | Matrix/QQ/Slack (rate-limit issues) | Not emphasized | Telegram/Discord (auth bugs) | DingTalk/Open API (#8453) |
| **Security posture** | CSP headers (#145573), auth headers (#145799) | Wasmtime/Rustls CVEs patched | RPC ownership fix P1, knowledge graph isolation P1 | Tool credential store (#8204), CSP rejected (#8458) |
| **Community maturity** | Medium - 53 comments on API issue (#131859) | Medium-high - organized anger (Skill Workshop) | High - 19 contributors/release | High - first-time contributors active |

**Verdict:** Hermes trong giai đoạn **consolidation chaos** sau 2 major merges. OpenClaw/ZeroClaw đã qua phase này, đang hardening. QwenPaw architecture mới nhất (PawApp SDK v2 #7874) nhưng chưa ship.

---

## 4. Hướng Kỹ thuật Chung

### Shared pain points

**Update reliability crisis:**
- OpenClaw: npm update để Gateway stopped 19 min (#181662), orphaned workers block CLI (#180668)
- Hermes: Desktop update timeout trên state.db >1GB (#133253), Windows lock conflicts (#143331)
- Pattern: Stateful systems + large DBs + process locks = brittle updates

**Session management across surfaces:**
- Hermes: Dashboard sessions not_found từ Desktop (#144814)
- OpenClaw: Remote Desktop sessions unresumable locally (#139818)
- ZeroClaw: RPC session ownership check dùng queued time thay vì current authority (#11234)
- Insight: Cross-surface session ownership model chưa converge. Mỗi dự án thử approach khác nhau.

**Mobile/webapp keyboard input:**
- Hermes: Android soft-keyboard insertText dropped, screenReaderMode ignore input (#145296)
- ZeroClaw: Android shell `/system/bin/sh` canonicalize EPERM (#12075)
- NanoBot: Touch gestures fail sau drag (#6502)
- Insight: Mobile web input phức tạp hơn native. Screen reader mode vs normal input có conflict.

**Context/memory management:**
- Hermes: Manual `/compress` force built-in compressor, ignore session context engine (#145806)
- QwenPaw: MODEL CONTEXT LENGTH EXCEEDED không graceful recovery (#8312), memory_search lặp 4 lần (#8361)
- OpenClaw: Synchronous agent persistence block Gateway event loop (#119720)
- Pattern: Context overflow + compression + memory search = tight coupling, no consensus on architecture.

### Converging solutions

**Security hardening:**
- ZeroClaw: RPC session ownership fix (#11234), per-agent knowledge graph (#9745)
- OpenClaw: Wasmtime CVE-2024-47079, Rustls CVE-2024-32650 patched (v0.8.7)
- Hermes: CSP headers (#145573), configured auth/user-agent replace (#145799)
- Trend: Post-2026 security baseline nâng cao. Wasmtime/Rustls advisories ảnh hưởng toàn ecosystem.

**Subprocess isolation:**
- QwenPaw: Channels → plugins subprocess (#8187)
- OpenClaw: Worker heap caps under service managers (v2026.9.35)
- Hermes: Platform adapters stability (Matrix backoff, QQ WebSocket monitoring)
- Insight: Plugin/channel isolation di chuyển từ threads → subprocesses. Failure containment over performance.

**LTS tracks:**
- OpenClaw: v2026.9.35 extended-stable
- ZeroClaw: v0.8.7 maintenance release
- Hermes/QwenPaw: Chưa có explicit LTS
- Trend: Production users cần stability > features. Dual-track release model xuất hiện.

---

## 5. Điểm Khác biệt

### Chiến lược sản phẩm

**OpenClaw:** 
- Focus: Enterprise reliability, systematic bug cleanup (monotonic clock campaign #185574, #185384, #185288)
- Trade-off: Update downtime chấp nhận được nếu stability sau đó tốt
- Risk: Skill Workshop (#184600) trust crisis - auto-mutation không consent

**ZeroClaw:**
- Focus: Security-first (4/10 PR quan trọng nhất là security P1)
- Innovation: Append-only event history (#11921), Goal policy contracts (#11880)
- Trade-off: Complexity cao (size:XL PRs nhiều), adoption friction

**QwenPaw:**
- Focus: Developer experience (PawApp SDK v2 #7874, Quick Add Model #8434)
- Innovation: Realtime voice (#7785), Community feed integration (#7903)
- Trade-off: Velocity cao nhưng beta releases thường xuyên, stability chưa proven

**Hermes:**
- Focus: Cross-surface unification (webapp + Desktop + mobile + serve)
- Innovation: Unified gateway, session substrate flexibility
- Trade-off: Post-merge instability, nhiều surfaces = nhiều edge cases

**NanoBot:**
- Focus: Simplicity, single-maintainer velocity
- Niche: Developers muốn lightweight alternative, không cần enterprise features
- Limitation: 0 issues in tracker = hoặc ít users hoặc maintainer close aggressive

### Cộng đồng & governance

**Community maturity:**

🟢 **Mature** (ZeroClaw, QwenPaw):
- 19 contributors/release (ZeroClaw v0.8.7)
- First-time contributors nhiều (QwenPaw #8436, #8178, #8376)
- Security researchers contribute tools (Trustabl #4234 ở NanoClaw)

🟡 **Developing** (Hermes, OpenClaw):
- Organized issue trackers (#143547 Hermes post-merge, #7432 ZeroClaw v0.9.0)
- Community anger signals (OpenClaw Skill Workshop #184600 "deadly plague")
- Top issues 20-50 comments, active debate

🔴 **Struggling** (NanoBot, NanoClaw):
- NanoBot: 2 issues, maintainer control tight
- NanoClaw: WhatsApp bug 6 months unfixed, 3 duplicate PRs ignored
- Pattern: Single maintainer bottleneck hoặc burnt-out maintainer

💀 **Dead/Forking** (PicoClaw, NullClaw, IronClaw):
- PicoClaw fork announced (#3417) vì "unmaintained"
- NullClaw/IronClaw no activity

**Governance models:**

- **OpenClaw/ZeroClaw:** RFC-driven (ZeroClaw #5574 runtime/gateway roadmap)
- **Hermes:** Post-merge tracker-driven (#143547)
- **QwenPaw:** Fast-moving, beta-driven, proposal PRs (#7874 PawApp SDK)
- **NanoBot:** Benevolent dictator (single maintainer)

---

## 6. Mức độ Trưởng thành Cộng đồng

### Đánh giá từng dự án

**🥇 ZeroClaw** - Most mature
- 19 contributors in single release
- Security researchers engaged (Trustabl would contribute if project accepted)
- Clear v0.9.0 roadmap with release gates (#7432)
- P1 security PRs in review pipeline (#11234, #9745)
- **Weakness:** High complexity (size:XL PRs), steep learning curve

**🥈 QwenPaw** - High velocity
- First-time contributors nhiều, PRs merge nhanh
- Beta releases frequent (v2.3.0-beta.1)
- Ambitious features (realtime voice #7785, PawApp SDK v2 #7874)
- **Weakness:** Stability chưa proven, beta churn risk

**🥉 OpenClaw** - Stabilizing after growth
- Systematic cleanup campaigns (timing bugs)
- Extended-stable/LTS track cho enterprise
- Community vocal (Skill Workshop anger = engagement)
- **Weakness:** Update reliability still brittle, Windows experience poor

**🏅 Hermes Agent** - Post-merge consolidation
- Cross-surface innovation đi trước thị trường
- Session substrate flexible hơn competitors
- **Weakness:** Stability crisis sau merges, mobile UX lag, no release cadence

**⚠️ NanoBot** - Single-maintainer ceiling
- Fast iteration (16 PRs merged ngày 28/10)
- Good pre-release polish (0.4.0 pending)
- **Weakness:** Bottleneck rõ ràng, no community scale path

**❌ NanoClaw** - Maintainer burnt-out
- WhatsApp bug 6 months, 3 duplicate PRs ignored
- Proton Mail (#4218) + Trustabl (#4234) PRs no review
- **Signal:** Maintainer overwhelmed hoặc abandoned

**💀 PicoClaw/NullClaw/IronClaw** - Dead
- Community forking PicoClaw
- No activity NullClaw/IronClaw

---

## 7. Tín hiệu Xu hướng

### Ngắn hạn (Q4 2026)

**1. Update reliability sẽ quyết định adoption**
- OpenClaw shipped 3 releases fix update issues
- Hermes/ZeroClaw chưa giải quyết được timeout trên large state DBs
- Prediction: Dự án nào fix được update-in-place với downtime <1 min sẽ thắng enterprise segment

**2. Mobile-first sẽ tách biệt leaders vs laggards**
- QwenPaw realtime voice (#7785) đi đầu
- Hermes webapp có potential nhưng keyboard bugs block adoption
- ZeroClaw Android S1 bugs (#12075) chứng tỏ mobile chưa priority
- Prediction: 2027 mobile usage > desktop cho personal AI agents

**3. Security baseline nâng cao bắt buộc**
- Wasmtime/Rustls CVEs ảnh hưởng toàn ecosystem
- ZeroClaw security-first approach sẽ trở thành standard
- Prediction: Dự án không patch CVEs trong 48h sẽ bị pressure từ enterprise users

**4. Session model chưa converge - fragmentation risk**
- Hermes: canonical title + ownership transfer
- OpenClaw: agent-DB admission
- ZeroClaw: RPC authority + event history
- QwenPaw: chat history + workspace snapshot
- Prediction: Tiêu chuẩn interop sẽ xuất hiện (hoặc winner-takes-all)

### Trung hạn (2027)

**1. Plugin/channel isolation architecture sẽ win**
- QwenPaw subprocess isolation (#8187)
- OpenClaw worker heap caps
- Hermes platform adapters stability focus
- Insight: Monolithic agents = brittle. Isolated plugins = resilient.

**2. Voice/multimodal sẽ là table stakes**
- QwenPaw realtime voice (#7785) đầu tiên
- OpenClaw/ZeroClaw chưa có roadmap voice
- Hermes chưa mention voice
- Prediction: Q2 2027 voice input/output sẽ standard feature

**3. LTS tracks sẽ bắt buộc cho enterprise**
- OpenClaw extended-stable track thành công
- ZeroClaw v0.8.7 maintenance model tốt
- Hermes/QwenPaw chưa có LTS
- Prediction: Dual-track (fast + stable) sẽ phổ biến như Kubernetes

**4. Community-driven vs maintainer-controlled sẽ fork**
- ZeroClaw/QwenPaw: nhiều contributors, open governance
- Hermes: medium community, post-merge focus
- NanoBot: single maintainer, tight control
- PicoClaw: community fork announced
- Insight: Projects không scale community sẽ bị fork hoặc die

### Rủi ro hệ sinh thái

**1. Skill/behavior contamination crisis**
- OpenClaw Skill Workshop (#184600): auto-mutation không consent
- Hermes: chưa có skill learning rõ ràng
- ZeroClaw: per-agent knowledge graph isolation (#9745) proactive
- Risk: Nếu không giải quyết trust issue, users sẽ disable learning → agents không improve

**2. Complexity ceiling**
- ZeroClaw size:XL PRs nhiều (#11921, #7874, #8187)
- QwenPaw PawApp SDK v2 architecture redesign (#7874)
- OpenClaw systematic refactors (Requesty plugin-ization #184064)
- Risk: Architectural complexity vượt contributor capacity → velocity drop

**3. Windows native experience gap**
- OpenClaw: slow startup, unclean shutdown, schtasks permission (#170956)
- Hermes: update lock conflicts (#143331), bash children orphaned (#69033)
- ZeroClaw: (chưa rõ Windows issues)
- Risk: Windows users frustrated → Linux/macOS only adoption

**4. Mobile web vs native fragmentation**
- Hermes: webapp approach
- QwenPaw: native approach (Tauri)
- OpenClaw: không focus mobile
- Risk: Ecosystem split webapp vs native, interop fail

---

## Kết luận Chiến lược

### Hermes Agent roadmap nên làm gì?

**Immediate (next 2 weeks):**
1. **Ship stability release** - fix session resume not_found (#144814, #139818), owner forward >1MB (#145215)
2. **Desktop update reliability** - handle large state.db timeout (#133253), Windows lock conflicts (#143331)
3. **Mobile keyboard input** - fix Android screenReaderMode (#145296)

**Short-term (Q4 2026):**
1. **LTS track** - split fast vs stable releases như OpenClaw
2. **Security audit** - patch Wasmtime/Rustls nếu dùng, CSP hardening
3. **Platform adapter hardening** - Matrix backoff (#126493), QQ reconnect (#19821)

**Medium-term (Q1 2027):**
1. **Voice input/output** - đuổi kịp QwenPaw realtime voice (#7785)
2. **Plugin isolation model** - học QwenPaw subprocess approach (#8187)
3. **Cross-surface session UX** - polish mobile ↔ Desktop handoff (#112028, #136319)

**Competitive positioning:**
- **vs OpenClaw:** Hermes có cross-surface advantage, nhưng cần fix update reliability để không mất enterprise trust
- **vs ZeroClaw:** Hermes đơn giản hơn (good), nhưng cần security baseline ngang bằng (RPC ownership, knowledge graph isolation)
- **vs QwenPaw:** Hermes stability tốt hơn beta churn, nhưng cần voice/multimodal để không bị bỏ lại

**Don't:**
- ❌ Thêm features mới trước khi fix session stability
- ❌ Ignore Windows users (OpenClaw làm vậy, đang mất segment)
- ❌ Auto-mutate agent behavior không consent (OpenClaw Skill Workshop disaster)

**Do:**
- ✅ Ship release addressing top 3 P1 bugs trong 2 weeks
- ✅ Announce LTS track + security policy rõ ràng
- ✅ Mobile-first UX investment (keyboard, touch, voice)

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-10-28

## 1. Tóm tắt hôm nay

Ngày phát hành 3 versions (2 beta + 1 extended-stable). Tập trung sửa update reliability (failed updates để Gateway stopped, orphaned workers block CLI). Nhiều PR xử lý timing bugs (wall clock vs monotonic clock). Community pressure on Skill Workshop auto-mutation issue (#184600).

## 2. Releases

### v2026.10.10-beta.4 (gateway-only)
- Automations preserve operator authority for scheduled follow-ups (#176422)
- Gateway security: block `hooks.token` từ child environments

### v2026.10.8 (stable)
**Critical fixes:**
- Update process stability: post-update Doctor failure restart Gateway thay vì để stopped
- Orphaned maintenance worker không còn block CLI/startup (#180668, #181695)
- Update không abort trên ACL filesystems, Windows pnpm links, pnpm 10 global (#181141, #181596, #181456)

### v2026.9.35 (extended-stable/LTS)
Gateway-only LTS từ Sept 2026 + security + reliability patches. Worker heap caps apply dưới service managers.

## 3. Tiến độ dự án

### PRs hot:
- **#184712** [telegram]: compact consecutive progress tool calls → giải quyết preview bị lấp bởi repeated Bash/Exec rows
- **#186149** [web-ui]: release old transcript memory sau khi switch chats → fix memory leak
- **#185476**: background command completions lose owner-only tools → security boundary issue
- **#186278** [sandbox]: prevent missing workspace baselines after cleanup

### Pattern: Timing bugs cleanup campaign
Series PRs từ @SunnyShu0925 fix wall-clock vs monotonic-clock mismatches:
- #185574: sandbox CDP probe deadline
- #185384: update-repair deadline budget  
- #185288: exec approval followup observation
- #185146: model summary completion timeout
- #184716: node host-stats checkpoint

Tất cả cùng root cause: `Date.now()` deadline + monotonic timer consumption → NTP sync làm lệch timeout.

### Refactoring:
- #184064: move Requesty provider runtime out of core → plugin-ization
- #186432: avoid repeated release fixture compiler starts → test optimization

## 4. Điểm nổi bật cộng đồng

### 🔥 Top concern: Skill Workshop (#184600, 7💬, P2)
**Vấn đề nghiêm trọng:** Skill Workshop auto-mutate learned skills (= agent behavior instructions) không user review/consent. User báo 203 unreviewed mutations làm agent behavior contamination.

> "Skill Workshop has become a deadly plague" — @itanyplus

Needs product decision + security review. Đây là friction point lớn với users không muốn AI agent tự modify behavior nền.

### Memory & Session Issues:
- **#170956** (22💬): Windows slow startup + unclean plugin shutdown + schtasks permission → restarts unreliable
- **#157325** (19💬): stuck agent-DB resource → every agent fails với generic failure copy until restart
- **#119720** (25💬): synchronous agent persistence block Gateway event loop at scale

### Performance complaints:
- **#169797**: 2026.9.9/10.1 dùng 2.5x memory của 2026.9.4 trên single-CPU host (10-17 worker isolates)
- **#181662**: npm update giữ Gateway stopped ~19 min trong `activating` phase (downtime grows mỗi release)

## 5. Ổn định & Bugs

### Critical (P0):
- **#170956**: Windows unclean shutdown → restart loop
- **#157325**: stuck resource fails all agents
- **#161921**: after state migration, doctor/plugins update block each other
- **#167406**: Windows MSIX Codex startup starves main thread
- **#185819**: Windows quick-start Codex onboarding fails activation
- **#185817**: Model setup wizard hangs at 'Testing...' sau config write

### High-priority (P1):
- **#119720**: sync persistence blocks event loop
- **#121953**: Cron turns stall on DeepSeek (API edge deprioritize `[cron:` prefix)
- **#181078**: 2026.10.5-10.8 intermittent "session reader continuation no longer current"
- **#176813** [CLOSED]: 2026.10.4→10.5 update stalls với >1TB SQLite writes

### Regression patterns:
- Update reliability still fragile (nhiều issues về stuck/failed updates)
- Session admission/continuation errors across versions
- Native Windows issues (MSIX, schtasks, plugin shutdown)

## 6. Yêu cầu tính năng

### User requests:
- **#150250**: Skill Workshop learning coverage verification → measure behavioral reuse trước khi ship
- **#166970**: Opt-in foreground inference workers on iOS/iPad → bounded text embeddings, no background
- **#9637** (7💬): Accessibility option disable emojis/unicode symbols trong TUI → screenreader users cần

### Product decisions needed:
- **#122019**: `openclaw update status` không show plugin compatibility warnings trước khi update
- **#172547**: Exclude dreaming ranges từ memory-search indexing
- **#121232**: Memory-core dreaming ranker/applier disagree → "Ranked N, Promoted 0" forever

## 7. Phản hồi người dùng

### Pain points:
1. **Update process**: users sợ updates vì history của failed/stuck updates leaving Gateway stopped
2. **Skill Workshop**: anger về auto-mutation không consent → trust issue
3. **Windows experience**: poor (slow startup, permission errors, unclean shutdown)
4. **Memory usage**: regression on low-resource hosts
5. **Cron reliability**: DeepSeek stalling, admission rejections on session rotation

### Positive signals:
- Timing bug fixes được welcome (monotonic clock campaign)
- Extended-stable/LTS track appreciated
- Community active file bugs với detailed reproduction steps

## 8. Backlog & Roadmap

### Clear priorities (inferred from labels):
1. Update reliability → nhiều PRs landed trong v2026.10.8
2. Windows native experience → focus area
3. Timing bugs cleanup → ongoing campaign
4. Memory management → regression fixes
5. Skill Workshop redesign → needs product/security decision

### Technical debt:
- Plugin-ization (Requesty move to external)
- Test infrastructure (flatten fixtures, reduce compiler restarts)
- SQLite worker isolation issues
- CDP connection memory leaks

### Stalled/needs decision:
- Memory dreaming promotion main-thread blocking (#121823) → architecture change needed
- Prompt cache prefix rewrites (#143017) → 5 patterns measured, 21.3M cache-write tokens waste
- Transport precheck vs compaction order (#173839) → CJK payloads rejected before graceful compaction

---

**Xu hướng:** Project đang trong phase stabilization sau growth spurt. Focus shift từ features → reliability/performance. Community patience với bugs thấp (Skill Workshop reaction severe). Windows remain problem child. Good: systematic timing bug cleanup, LTS track established.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 28/10/2026

## 1. Tóm tắt hôm nay

Ngày sản xuất cao - 16 PR merged, tập trung polish WebUI (tooltips, touch gestures, retry UI) và fix core bugs (SSL trust, tool validation, atomic writes trên Windows). Chuẩn bị release 0.4.0 đang pending review.

## 2. Releases

Không có release chính thức. PR #6504 chuẩn bị 0.4.0 từ commit `b07b3eac` - đợi approval cuối để publish.

## 3. Tiến độ dự án

**Merged hôm nay:**
- **WebUI polish** (8 PRs): fix touch gesture bugs (#6502, #6500), preserve text khi model fail (#6494), stabilize interaction tests (#6495), UI tweaks (retry status #6491, mention display #6489, preset info #6490, chat link colors #6484)
- **Core fixes** (4 PRs): SSL system cert inject (#6488 - open), tool schema validation $ref/anyOf (#6486 - open), atomic write CRLF issue trên Windows (#6475), websocket handshake abort (#6348)
- **Features**: bang commands + literal output (#6173), session pagination (#6315 - open)
- **Refactors**: outbound delivery centralization (#6482 - open), unify code/diff highlighting (#6412 - open, conflict), tool hint rendering (#6498 - open)

**Xu hướng:** Sprint cuối trước 0.4.0 - focus stability, polish UX, close edge cases. Heavy WebUI browser test coverage trim (#6492) cho CI nhanh.

## 4. Điểm nổi bật cộng đồng

- **#6505** (open, 1 comment): user request change project directory mid-chat - picker biến sau message đầu tiên. Workaround hiện tại: edit settings JSON thủ công.
- **#6493** (open, Discord): suppress notification pings cho step updates - mỗi turn 3-6 pings, chôn vùi answer thật. Chuyển sang silent flags.
- **#6503** (merged): clarify contribution policy - PRs chỉ collaborators, community contribute qua issues.

## 5. Ổn định & Bugs

**Fixed:**
- Windows CRLF doubled (#6474 → #6475)
- Touch gestures fail sau drag (#6502)
- Inline command `/status` crash consumer (#6497)
- Model stream reply bị mất khi fail sau deliver (#6494)
- Hash trong file path (`C#/Program.cs`) bị trim (#6462 - open)
- Subtask content không clickable (#6487)
- Tool validation skip $ref/anyOf schemas (#6486 - open)

**Ongoing:**
- SSL cert verification cần system trust injection (#6488 - open)
- WebSocket handshake stale response (#6348 - merged)

## 6. Yêu cầu tính năng

- **Session pagination** (#6315): API list sessions với offset/limit - cho agents lớn
- **Discord silent updates** (#6493): streaming không spam notifications
- **Mid-chat project switch** (#6505): UI cho change working directory
- **Google browser scraper** (#6499): thêm provider mới qua local proxy
- **Bang commands** (#6173): `!command` chạy shell direct, output literal không qua Markdown

## 7. Phản hồi người dùng

- **UX friction:** Project picker disappear sau message đầu (#6505), tooltip block interactions (#6495)
- **Windows compatibility:** CRLF issues persist trên native setup (#6474)
- **Discord noise:** Too many pings khi streaming enabled (#6493)
- **Positive:** Heavy test coverage trim (#6492) cho CI response tốt hơn, không mất oracle chính

## 8. Backlog & Roadmap

**Short-term (pre-0.4.0):**
- Finalize release approval (#6504)
- Close remaining open PRs: #6412 (highlighting refactor), #6482 (outbound centralization), #6498 (tool hints)
- Address #6505 (project picker UX)

**Post-0.4.0 candidates:**
- Window reuse (#6377 - mentioned, separate branch)
- Retry redesign (#6367 - separate branch)
- MCP integration expansion (tool validation improvements suggest ongoing work)

---

**Metrics:** 2 issues opened (1 closed), 28 PRs (16 merged, 12 open). Velocity cao cho polish phase.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw ngày 2026-10-28

## 1. Tóm tắt hôm nay

ZeroClaw release v0.8.7 ngày 27/10, fix 5 known issues + lỗ hổng bảo mật Wasmtime/Rustls. Hôm nay tập trung fix bugs còn sót (Android shell fail, MCP recovery poisoned, prompt guard false positive) + merge translations. 15 issue mới/cập nhật, 42 PR (12 mới).

## 2. Releases

### v0.8.7 (27/10/2026)

**Điểm chính:**
- 🔒 **Bảo mật**: Patch Wasmtime, Rustls cert verification, tokio, ctutils advisories
- 🏗️ **Container**: Rebuild images với CA bundles mới, distrust emSign chains
- 🐛 **Bug fixes**: 5 plugin known issues từ v0.8.6 + daemon reject group-writable data dir
- 📦 **Quy mô**: 81 commits, 19 contributors

**Ý nghĩa**: Maintenance release tập trung bảo mật + stability. Không có tính năng mới lớn, nhưng fix các lỗ hổng quan trọng.

## 3. Tiến độ dự án

### PRs nổi bật đang mở

**Bảo mật & Quyền hạn** (ưu tiên cao, targeting v0.9.0):
- #11234: Fix RPC session ownership check bằng current authority thay vì queued time - P1, security gate cho v0.9.0
- #9745: Per-agent attribution cho knowledge graph - fix cross-tenant isolation (#9647) - P1, release-gate
- #11289: Stable RPC denial reasons + localized selector denials - P2, security focus
- #11264: Password auth provider core (slice 1 của #8076) - P2, identity-access

**Onboarding & UX** (v0.9.0 roadmap):
- #11596: Native Claude Code accounts với supervised plugin apply - giảm friction setup
- #11414: Opt-in focused workspaces - cải thiện UX cho power users (size:XL, risk:high)

**Infrastructure lớn**:
- #11921: Append-only session event history - nền tảng cho replay không side effects (size:XL, risk:high)
- #9809: Multi-model per provider profile - linh hoạt hơn trong config models (principal contributor)

**Tooling & Providers**:
- #11680: Firecrawl web search provider - thêm search option mới
- #12059: OpenAI profile thinking honors runtime config - độc lập với token budgets

### Xu hướng phát triển

1. **Security-first**: 4/10 PR quan trọng nhất là security, đều targeting v0.9.0
2. **Phân quyền chi tiết**: Knowledge graph per-agent, RPC denial reasons, password auth providers
3. **Developer experience**: Native Claude onboarding, focused workspaces, multi-model configs
4. **Infrastructure modernization**: Event-sourced sessions, Goal policy contracts (#11880)

## 4. Điểm nổi bật cộng đồng

### Issues nhiều tương tác

**#7432 (16 comments)** - Runtime/dashboard/gateway tracker cho v0.9.0:
- Tổng hợp roadmap còn lại từ RFC #5574
- Theo dõi gaps, sequencing, acceptance evidence

**#9101 (11 comments, CLOSED hôm nay)** - Consolidate release attestation:
- v0.8.3 ship với 3 parallel signing mechanisms (cosign, GitHub attestations, slsa-github-generator)
- Redundancy tốn CI time, phình manifest
- Fixed bằng cách chọn 1 story, giảm từ 53 → 20 assets

**#11517 (3 comments)** - Web chat reload drops prompt:
- Severity S2: Reload page giữa turn → prompt biến mất khỏi screen + localStorage
- Hydration replace local state với snapshot cũ hơn running turn

## 5. Ổn định & Bugs

### Bugs mới (ngày 27-28/10)

**Platform-specific**:
- #12075: **Android shell fail** - `/system/bin/sh` không canonicalize được (EPERM), mọi shell tool call fail - S1 workflow blocked
  - Fix PR #12080: Fallback khi canonicalize hit EPERM

**MCP tool issues**:
- #10807: **MCP connection poisoned** sau 1 failed recovery - S1 blocked
  - Fix PR #12061: Recover từ poisoned session
- #12055: **MCP HTTP pool leak** - stale pooled socket → outcome-unknown - S2 degraded

**Security false positives**:
- #12066: **Prompt guard quá nhạy** - mọi semicolon/pipe = command injection → clean payloads bị flag Suspicious
  - Fix PR #12068: Drop bare `;`/`|` khỏi injection patterns
- #12067: `untrusted_guard_sensitivity` move prompt guard + leak detector ngược chiều - S3 minor

**Channel bugs**:
- #11913: **Telegram commands exposed** - `setMyCommands` no scope → tất cả users thấy, kể cả ngoài `allowed_users`
- #12064: **Discord bots answer approvals** - allowlisted peer bots reply plaintext approvals (`<token> yes`)
  - Fix PR #12065: Reject approval từ bots dù allowlisted

**Provider issues**:
- #12072: **OpenAI Codex retry fail** - fallback retry `stream: false` bị ChatGPT endpoint reject (chỉ chấp nhận streaming)
  - Fix PR #12073: Retry vẫn stream

**ZeroCode UX**:
- Context budget display không refresh sau trim (PR #12074)
- System prompt cap không re-apply sau skill refresh (PR #12070)

### Pattern nhận dạng

- **Android support**: Canonicalize EPERM - nền tảng đặc biệt cần fallback
- **MCP resilience**: Connection recovery cần improve, connection pooling thiếu control
- **Security tuning**: Prompt guard rules quá broad, cần tinh chỉnh false positives
- **Channel auth**: Bot/external peer handling chưa đủ chặt chẽ

## 6. Yêu cầu tính năng

### Mới (ngày 27-28/10)

**#12069** - `/load-session` command:
- Resume Code session bằng name/UUID
- Hiện chỉ có `Ctrl+S` picker, khó với nested projects
- PR #12071 implement

**#12054** (implicit từ PR #12057/12059) - OpenAI profile thinking:
- Honor runtime-profile thinking level, độc lập token budgets
- 2 profiles share OpenAI alias nhưng khác reasoning effort

### Đang phát triển

**Focused workspaces** (#11414):
- Opt-in alternative layout: Home, Agent, Code, Settings only
- Classic default giữ nguyên (dashboard, nav rail, tabs, SOP routes)
- Quickstart offer choice, toggle trong Appearance

**Goal V1** (#11880):
- Extract transport-neutral policy contracts
- Proposal 3/12 trong series

## 7. Phản hồi người dùng

### Pain points từ bugs

1. **Android users**: Shell tool hoàn toàn không dùng được (S1) - critical cho mobile deployment
2. **MCP users**: Connection reliability thấp, 1 lần fail → vĩnh viễn poisoned
3. **Non-English/casual users**: Prompt guard false positives làm gián đoạn workflow (semicolon trong câu bình thường)
4. **Telegram operators**: Command menu lộ ra ngoài trusted users - security concern
5. **Web users reloading mid-turn**: Mất prompt đang chạy - data loss S2

### Positive signals

- v0.8.7 maintenance release được release nhanh (1 ngày sau v0.8.6 issues được report)
- Community contributors active: 19 contributors trong 81 commits v0.8.7
- Security fixes được prioritize cao (4 P1 PRs đang review)

## 8. Backlog & Roadmap

### v0.9.0 confirmed (từ labels + trackers)

**Release gates**:
- #7432: Runtime/gateway/dashboard delivery tracker
- #11234: RPC session ownership fix (P1, security)
- #9745: Per-agent knowledge graph (P1, security)

**Planned features**:
- Native Claude Code onboarding (#11596)
- Focused workspaces (#11414)
- Password auth provider (#11264, slice 1)

### Near-term (đang active review)

**Docs & translations**:
- #12076/#12078: v0.8.7 translation fixes + remaining English fragments
- #12077: Give fill-translations page context + second-reader review

**Bug fixes queued**:
- Android shell, MCP recovery, prompt guard tuning, channel auth tightening
- Đều có PRs, chờ review/merge

### Infrastructure bets (long-term, XL size)

- Append-only event history (#11921) - replay foundation
- Multi-model configs (#9809) - flexibility
- Goal policy system (#11880, proposal series) - transport-neutral contracts

---

**Nhìn chung**: ZeroClaw đang trong giai đoạn hardening cho v0.9.0. Security + stability là top priority. Community active với bug reports chi tiết + PRs nhanh. Android/MCP/prompt-guard issues sẽ được fix trong vài ngày tới.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-28

## 🎯 Tóm tắt hôm nay

Không có hoạt động phát triển mới trong 24h qua. Issue #3451 được tạo hôm qua đề xuất hỗ trợ Android API 19 cho kiến trúc x86. Issue #3417 về fork chủ động tiếp tục nhận bình luận, phản ánh tình trạng repo chính thiếu bảo trì.

## 📦 Releases

Không có release.

## 🔧 Tiến độ dự án

**Không có PR nào được cập nhật.**

Dự án đang trong trạng thái trì trệ:
- Không có commit mới từ maintainer chính
- Community bắt đầu tự tổ chức qua fork (issue #3417)
- Xu hướng: Cộng đồng tự duy trì thay vì đợi repo chính

## 💬 Điểm nổi bật cộng đồng

**Issue #3417 - Fork chủ động từ @afjcjsbx**
- 3 bình luận, được cập nhật 2026-10-27
- Người dùng tuyên bố fork và duy trì repo vì thiếu bảo trì
- Fork: `afjcjsbx/picoclaw`
- Phản ánh nhu cầu cộng đồng vẫn cao nhưng maintainer không phản hồi

Tương tác thấp (0 👍) có thể do:
- Community chưa tập trung vào fork mới
- Người dùng đợi xem fork có bền vững không

## 🐛 Ổn định & Bugs

Không có bug report mới trong 24h. Issue hiện tại là feature request.

## ✨ Yêu cầu tính năng

**Issue #3451 - Android API 19 cho x86_32/x86_64**
- Tác giả: @teicoti (2026-10-27)
- Target: TV box, tablet, SBC cũ chạy Android 4.4
- Kiến trúc: x86 32-bit và 64-bit
- Use case: Thiết bị legacy và emulator
- Chưa có phản hồi từ maintainer

Mức độ quan trọng: Trung bình - niche nhưng có base người dùng cụ thể (thiết bị cũ).

## 📣 Phản hồi người dùng

Community thất vọng với tốc độ bảo trì:
- @afjcjsbx quyết định fork vì "appears to be unmaintained"
- Nhu cầu vẫn cao ("significant interest and demand")
- Người dùng tự giải quyết thay vì đợi

## 🗺️ Backlog & Roadmap

**Repo chính**: Không có roadmap rõ ràng. Trạng thái unmaintained.

**Fork @afjcjsbx/picoclaw**: Cam kết "actively maintain", chưa có roadmap cụ thể.

**Nhu cầu chưa giải quyết**:
- Android API 19 x86 support (#3451)
- Community cần signal từ maintainer hoặc migrate sang fork

---

**Đánh giá tổng quan**: Dự án đang chuyển giao không chính thức từ repo chính sang fork community. Nếu maintainer không phản hồi, fork sẽ trở thành điểm tập trung mới.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo phân tích NanoClaw - 2026-10-28

## 1. Tóm tắt hôm nay

Không có issue hoặc release mới. Hoạt động tập trung vào review và cập nhật 5 PR đã mở trước đó. Có 2 PR mới đáng chú ý: tích hợp Proton Mail (#4218) và công cụ kiểm tra độ tin cậy agent từ Trustabl (#4234).

## 2. Releases

Không có release trong 24 giờ qua.

## 3. Tiến độ dự án

**PR mới (đáng chú ý):**

- **#4218 - Proton Mail adapter** (tạo 24/10, cập nhật 27/10)
  - Tích hợp native IMAP/SMTP qua Proton Mail Bridge
  - Thuộc nhánh `channels` registry
  - Skill `/add-proton-mail` riêng ở main branch
  - Chưa merge, đang review

- **#4234 - Trustabl CI check** (tạo + cập nhật 27/10)
  - Thêm công cụ scan độ tin cậy agent vào CI
  - Phát hiện vấn đề: bundled skill đọc credentials từ biến môi trường
  - Đề xuất giải pháp bảo mật cho agent framework

**PR cũ (vẫn mở, cùng vấn đề):**

- **#2778, #2429, #1998** - Fix WhatsApp inbound media routing
  - Ba PR khác nhau giải quyết cùng bug: media WhatsApp không đến agent
  - Vấn đề: file lưu ở `data/attachments/` host, nhưng container chỉ mount per-session directory
  - PR cũ nhất từ 25/4, mới nhất 16/6
  - **Xu hướng**: bug tồn tại lâu, nhiều contributor thử fix độc lập → cần review/merge hoặc đóng duplicate

## 4. Điểm nổi bật cộng đồng

- **#4234** - Trustabl đóng góp công cụ kiểm tra độ tin cậy open-source
  - Phát hiện security issue trong skill đọc credentials
  - Đề xuất giải pháp CI tự động
  
- **WhatsApp media bug** có 3 PR từ 3 contributors khác nhau trong 6 tháng
  - Chứng tỏ vấn đề phổ biến, ảnh hưởng người dùng
  - Chưa được giải quyết → bottleneck trong review hoặc priority

## 5. Ổn định & Bugs

**Vấn đề đang mở:**

- **WhatsApp inbound media routing** (3 PR): file attachment không mount đúng vào agent container
- **Credential exposure risk** (#4234): skill đọc sensitive data từ ENV vars, cần pattern bảo mật hơn

**Trạng thái**: Bug WhatsApp tồn tại 6 tháng chưa fix cho thấy process review/merge chậm hoặc thiếu maintainer bandwidth.

## 6. Yêu cầu tính năng

- **Proton Mail integration** (#4218): native IMAP/SMTP adapter qua Bridge
- **Agent reliability scanning** (#4234): tích hợp Trustabl vào CI để phát hiện lỗi bảo mật

## 7. Phản hồi người dùng

Không có comment mới trong 24h qua. PR #4218 và #4234 chưa có reaction hoặc review feedback.

## 8. Backlog & Roadmap

**Quan sát từ PR backlog:**

- Nhiều PR duplicate/overlap (3 PR WhatsApp cùng fix một bug)
- PR cũ nhất (#1998) mở từ 25/4 chưa resolve
- Label `triage/needs-author` (#2778) cho thấy process triage tồn tại nhưng chậm

**Đề xuất prioritize:**

1. Merge hoặc đóng PR duplicate WhatsApp (chọn solution tốt nhất)
2. Review #4234 security scanner (high value, low risk)
3. Review #4218 Proton Mail (feature mới, cần test kỹ)

**Tín hiệu:** Backlog tích tụ, cần tăng review capacity hoặc automation.

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

# Báo cáo QwenPaw — 2026-10-28

## 🎯 Tóm tắt hôm nay

Phát hành beta v2.3.0-beta.1. Đóng 11 bug (media preview, skill selection, CSP font, test, release build). Đang review 9 feature/fix (realtime voice, PawApp SDK redesign, plugin isolation, memory PowerContext). PR đông nhất: 30 PR có thảo luận, 8 PR merge.

---

## 📦 Releases

### v2.3.0-beta.1 (2026-10-27)
- **Restore interactive HTML previews** (#8245): chat UI render lại HTML embed
- **Tavily API key via credential store** (#8204, #8174): tool Tavily search lưu key vào secret store thay vì hardcode
- **Plugin catalog sync** (#8261): Hub catalog khớp installed state
- **Clear chat input on submission** (#(số issue)): fix input box không clear sau gửi

Beta → verify cài đặt trên các nền tảng, deadline 4h sau release (#8456).

---

## 🚀 Tiến độ dự án

### ✅ Merged/Closed
1. **Media preview lỗi hiển thị compact** (#8451): error card show tên file + tooltip, keyboard nav, reduce motion setting
2. **Skill selection giới hạn lúc tạo agent** (#8448): skill section ẩn khi edit, regression test thêm
3. **CSP cho data: font** (#8458 → closed): reject, embedded `data:` font KaTeX vi phạm CSP desktop, cần cách khác
4. **E2E test fix** (#8449): fix test broken
5. **Release build fix** (#8450): cross-platform test fail, NSIS prep harden

### 🔥 Review/WIP
1. **Realtime voice chat** (#7785, XXXL): OpenAI Realtime API, speech input/playback/interrupt, hand speech to chat execution path (history/tool/queue/persist share). Console UI thêm voice mode
2. **PawApp SDK redesign** (#7874, XXXL): Host contract cho durable work, task identity/retry/permission/approval shared. Small App `app.action` handler, external runtime adapter protocol
3. **Channels → plugins subprocess isolation** (#8187, XXXL): channel extract ra plugin, static descriptor, subprocess exec. Giảm SDK import host process, isolate failure
4. **Memory PowerContext v1.4.1** (#8376, XXXL): prepared context, Artifact API (profile/topic memory/atomic memory/experience reuse), console UI memory panel
5. **Nested skill directories** (#8178, XL): `<root>/<category>/<skill>/SKILL.md`, flat layout vẫn work
6. **Inline media request bound** (#8034, L): cap 2MB/file + cap tổng body size, token eviction không fire media

### 📝 Open Feature/Fix
- **Quick Add Model button** (#8434, S): Models page add button cho provider, 5 click → 1 dialog
- **Linux deb + AppImage** (#8444, L): Tauri build thêm Linux target (hiện chỉ Win/macOS)
- **Automatic recall → reference context** (#8457, S): memory_search auto recall đổi từ assistant tool-call sequence sang transient system msg → fix #8361 repeat call
- **Tool_result blocks age out** (#8443, M): `blocks_retention_days` xóa JSON duplicate trong tool_result, giữ text cho recall. Scroll `history.db` giảm 75% size
- **Edit_file preserve line endings** (#8433, M): fix #8414, #8415 CRLF → LF mỗi edit. Detect encoding + newline, atomic write preserve
- **Community feed + inbox** (#7903, XXXL, WIP): embedded feed sort/category/comment, Platform PKCE auth, sync message category, linked issue report với model-assisted edit
- **DingTalk fallback Open API** (#8453, M): fix #8343 `sessionWebhook` expire 300001, final reply fail. Fallback sang Open API robot send
- **Atomic temp filename bound** (#8446, XS): fix #8306 long filename, temp `.{name}.{16hex}.tmp` add 22 bytes → OSError. Truncate basename keep room

---

## 💬 Điểm nổi bật cộng đồng

### Issues hot (>3 comment)
- **#8312** (4💬): context control fail, MODEL CONTEXT LENGTH EXCEEDED CONTEXT UNFIT 252565>251904 token, task drop. Chưa close
- **#8361** (2💬): Automatic Memory Search bật → `memory_search` lặp same query 4 lần/turn, block sau 4 lần nhưng không reply. PR #8457 fix inject recall as reference context
- **#8265** (3💬): plugin hot-install abort, `importlib.invalidate_caches()` raise trên distro-patched Python 3.11. Loader call 3 site, stdlib bug → abort
- **#7727** (3💬): out-of-workspace write không block kimi-code Write tool, `_paths` extraction không nhận kimi toolCall path field. Test probe write `/tmp/` succeed

### PR hot (nhiều discussion)
- **#7785** Realtime voice: architecture choice voice input → chat execution path
- **#7874** PawApp SDK: Host contract scope, durable task model
- **#8187** Channel isolation: subprocess stability vs performance

---

## 🐛 Ổn định & Bugs

### Closed
1. **#2839**: agent error `APIError: Failed to parse input at pos 204`, llama.cpp qwen3.5-35b tool call fail
2. **#7935**: LLM timeout `Request timed out` không auto recover, phải restart process. Cannot reproduce
3. **#5856**: tool_call structure mất khi context compaction, 400 error message count mismatch
4. **#2758**: reasoning + tool usage hiện sau final reply (đảo ngược)
5. **#3281**: Desktop UI agent response disappear, console channel print fail Windows
6. **#7397**: Browser SDK mỗi `present()`/`open()` spawn tab-group mới, không share group
7. **#8199**: Firecrawl as web_search provider (Juampi Firecrawl team propose)
8. **#8290**: media block wedge session, "At most 0 video(s)" + "[unsupported_request] text content only" không match classifier
9. **#7079**: PowerContext pluggable long-term memory backend
10. **#7963**: Langfuse tool observation không record output, coordinator short-circuit skip update
11. **#8185**: desktop.log không rotate Windows, sidecar tee handle defeat `_SafeRotatingFileHandler`

### Open
- **#8306**: atomic file write reject valid long filename, `.{name}.{16hex}.tmp` add 22 bytes → 243 byte name fail (PR #8446)
- **#8047**: `server/discover` HTTP 422 plain-text (DBX MCP) không treat as legacy protocol, streamable_http driver inactive, Console 503

---

## ✨ Yêu cầu tính năng

1. **#8459** (new): easier access unread push messages, web UI thiếu entry point
2. **#4036** → PR #8434: Quick Add Model button (5 click → 1 dialog)
3. **#8199** → closed: Firecrawl web_search provider
4. **Community feed** (#7903): Platform link, issue report, model-assisted edit

---

## 💭 Phản hồi người dùng

### Pain points
- Context control fail dừng task (#8312): token overflow không handle graceful
- LLM timeout không recover (#7935): process wedge, manual restart required
- Plugin install abort distro Python (#8265): stdlib variant incompatible
- Long filename reject (#8306): filesystem allow nhưng atomic write fail
- Memory search repeat (#8361): auto recall loop, block sau 4 lần không reply
- Desktop log no rotate Windows (#8185): disk full risk

### Positive
- Beta release chu kỳ nhanh: v2.3.0-beta.1 ship media preview + skill edit + Tavily key store
- Quick fix PR: #8451, #8448 merge nhanh
- First-time contributor nhiều: #8436, #8178, #8376, #8446, #8454

---

## 📋 Backlog & Roadmap

### In progress (XXXL PR)
- **Realtime voice** (#7785): speech input/output/interrupt, OpenAI Realtime API
- **PawApp SDK v2** (#7874): Host contract, task model, durable work
- **Channel plugin isolation** (#8187): subprocess sandbox
- **Memory PowerContext v1.4.1** (#8376): prepared context, Artifact API
- **Community integration** (#7903): feed + inbox + Platform link

### Near term
- Linux desktop package (#8444): deb + AppImage
- Tool_result block age (#8443): reduce 75% history.db size
- Edit_file CRLF preserve (#8433): #8414, #8415
- Nested skill directories (#8178): category layout

### Under review
- Provider routing (#8124, #8034): fallback content inspection, inline media bound
- Thinking disable wire (#8436): strict endpoint compatible
- Console basename config (#8197): reverse proxy path prefix
- Docs anchor fix (#8401, #8402, #8403): slug case mismatch

### Blocked/waiting
- CSP data: font (#8458): closed, cần cách khác KaTeX embed

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*