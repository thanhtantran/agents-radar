# Bản tin Hệ sinh thái Hermes Agent 2026-10-21

> Issues: 127 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-21 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-21

## 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa bug quan trọng (desktop, CLI, gateway) và bổ sung plugin catalog. Nhiều PR merge giải quyết vấn đề session state, credential handling, và Windows compatibility.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

### PRs đã merge hôm nay

**Bug fixes chính:**
- #142125 ✅ Fix terminal drain với selectors thay vì select.select() — giải quyết silent output loss khi fd >= 1024 (#94928)
- #92336 ✅ Thêm locale Indonesia (id) cho CLI, gateway, Desktop
- #130372 ✅ Fix state recording cho provider calls không report usage — sessions hiện tracking đúng tokens/billing (#71578)
- #130240 ✅ Fix MCP OAuth pre-flight — giờ honour RFC 9728 WWW-Authenticate challenge (#95552)
- #120783 ✅ Fix `hermes -z` với external_process providers — forward acp_command/args vào AIAgent
- #142310 ✅ Xóa retry promises không support khỏi kanban notifications
- #142076 ✅ Plugin catalog: hermetic — cost tracking popover cho Desktop
- #141825 ✅ Plugin catalog: greyridge-token-safety — Base token pre-trade check skill

### PRs đang review (P2/P1)

**Ưu tiên cao:**
- #140980 Oneshot honour turn limits — fix iteration budget class (#99957, #105243)
- #140109 Local-models resume interrupted setup + discard partial downloads
- #142318 Images attached với /goal, /plan, skill command giờ reach turn (#126379)
- #142306 Desktop smoke test accept canonical gateway Desktop attaches to
- #127282 Desktop fold interim bubble row đã có
- #141877 Unified Scope value cho home, secrets, terminal policy
- #130235 Desktop không seed stream bubble khi turn đã settled
- #132598 Clear custom endpoint credential aliases khi xóa config
- #142319 Gateway run queued completion backlog as one turn (watched local session)
- #142300 Mid-turn message không còn wait phía sau tool trong batch — interrupt responsive

**Windows & compatibility:**
- #124313 Close uv-isolation gaps sau PM migration (#101269) — shadow, bootstrap, installer paths
- #142303 Windows UMA: stop charging headroom on top WDDM commit limit (Strix Halo 128GB)

**Config & profiles:**
- #139409 config.d drop-ins override config.yaml — Linux-style override scheme

**Desktop experience:**
- #102897 Composer suggestion visibility setting — persist renderer-local

**Plugins:**
- #142312 Plugin catalog: greyridge-llm-inference — keyless OpenAI-compatible x402 LLM lane
- #142309 Plugin catalog: greyridge-market-data — Base/EVM crypto market data
- #128724 Bounded completion policies — before_turn_end hook cho plugin review (#76862, #24859)

**Gateway & SSE:**
- #32431 SSE event replay via Last-Event-ID — thick clients không mất tool/reasoning mid-stream

## ⚡ Điểm nổi bật cộng đồng

**Issues nhiều comments nhất:**
- #134889 (202💬) Tracking: one gateway owns every local session — post-merge fixes sau #106742
- #141346 (18💬) **CRITICAL** Smart approval auto-approved osascript commands đóng PowerPoint deck chưa save → data loss
- #127284 (12💬) source-completion-pending không có TTL/self-heal — killed tail strands every later launch
- #131739 (10💬) Desktop linkifies bare filenames trong tool error → README.md replaced by third-party page title

**Security concerns:**
- #141346 osascript auto-approval → unrecoverable data loss. Smart approval mode nguy hiểm với macOS automation.
- #141832 `hermes config set auxiliary.<task>.provider` không drop stale route — previous base_url overrides new provider
- #141468 Cron enabled_toolsets với "mcp-<name>" widens job to every enabled MCP server

## 🐛 Ổn định & Bugs

**P0/P1 đang open:**
- #134889 Gateway session ownership — post-merge fixes, nhiều sub-tasks
- #127284 source-completion-pending strands install state
- #135037 Windows user-PATH registration writes sandbox bin dirs vào shared HKCU\Environment\Path
- #131740 Desktop: turn-finalization bookend lost — sessions stuck busy

**Bugs fixed hôm nay:**
- Terminal fd >= 1024 silent loss (selectors migration)
- MCP OAuth pre-flight 403
- State recording với providers không report usage
- Oneshot iteration budget
- Images dropped với slash commands
- Kanban retry notification copy

**Patterns:**
- Windows compatibility issues (PATH, UMA, terminal) nhiều
- Desktop transcript/session state edge cases
- Gateway message delivery timing
- Config/credential lifecycle gaps

## 💡 Yêu cầu tính năng

**Đang review:**
- #80222 (8💬, 4👍) delegate_task per-call model + reasoning_effort overrides
- #112028 (7💬) Multi-surface access same session (desktop + mobile)
- #119448 (4💬, 2👍) User folders trong desktop Sessions list
- #118717 gateway_session_key không propagate vào plugin hooks
- #125815 Desktop: large pasted text không dùng được cho /goal input

**Community plugins:**
- Greyridge suite: token-safety, market-data, llm-inference (x402 API integration)
- Hermetic cost tracking

## 📣 Phản hồi người dùng

**Positive:**
- Local models setup improvements được chờ đợi (#140109)
- Plugin catalog mở rộng (crypto, cost tracking)
- Config override scheme (#139409) useful cho advanced users

**Pain points:**
- #141346 Data loss từ smart approval — user mất PowerPoint deck
- #126379 Image attachment dropped silently với slash commands — confusing UX
- #131740 Desktop sessions stuck busy — liveness watchdog aborts finished turns
- #127284 Install state stranded sau killed tail — manual cleanup needed
- Windows compatibility issues persistent

**Accessibility & i18n:**
- Indonesian locale merged
- WCAG compliance mentioned trong rules nhưng chưa có tooling

## 📋 Backlog & Roadmap

**Priorities (theo labels):**

**P0:** Session ownership consolidation (#134889)

**P1:**
- Install/update stability (source-completion-pending, Windows PATH)
- Desktop turn finalization
- Oneshot iteration budget

**P2 clusters:**
- Desktop transcript/streaming bugs
- Credential lifecycle (aliases, aux provider switches)
- Windows compatibility (terminal, local-models, gateway)
- Gateway message delivery timing
- Cron/kanban notification accuracy

**P3 improvements:**
- Plugin ecosystem expansion
- Config flexibility (drop-ins, per-call overrides)
- Desktop UX polish (suggestions, folders, screen tabs)

**Blocked:**
- #128295 hermes-assets.nousresearch.com Cloudflare WAF blocks non-browser clients — upstream issue

**Architecture evolution:**
- Unified Scope value (#141877) — simplify profile state management
- Bounded completion policies (#128724) — plugin review hooks
- SSE replay (#32431) — thick client resilience

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-21

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent năm 2026 đang trong giai đoạn **mature infrastructure, community-driven refinement**. 9/10 dự án active, tập trung vào 4 vấn đề chính:

- **Session stability**: memory leak, state sync, race condition (OpenClaw, Zeroclaw, Hermes)
- **Plugin ecosystem maturity**: isolation, SDK standardization, hot reload (QwenPaw, NanoBot)
- **Channel resilience**: DingTalk/Telegram/Discord crash, message loss (QwenPaw, NanoClaw, Zeroclaw)
- **Security tightening**: auth leak, memory cross-agent access, approval bypass (Zeroclaw, IronClaw)

Pattern chung: **no major architectural shift**. Incremental hardening với focus vào edge cases từ production usage.

---

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Tương tác cao nhất | Mức độ hoạt động |
|-------|--------|-----|----------|-------------------|------------------|
| **Hermes Agent** | 127 | 500 | 0 | 202💬 (#134889) | 🔥 Rất cao |
| **OpenClaw** | 86 | 500 | 0 | 41💬 (#91588) | 🔥 Cao |
| **NanoBot** | 6 | 45 | 0 | 6💬 (#5924) | 🟡 Trung bình |
| **Zeroclaw** | 19 | 45 | 0 | 30💬 (#11754) | 🟡 Trung bình |
| **PicoClaw** | 1 | 1 | 0 | 0💬 | 🔴 Thấp |
| **NanoClaw** | 5 | 20 | 1 | 0💬 | 🟢 Ổn định |
| **NullClaw** | 0 | 0 | 0 | - | ⚫ Không hoạt động |
| **IronClaw** | 3 | 9 | 0 | 2💬 (#2077) | 🟡 Maintenance |
| **QwenPaw** | 14 | 34 | 0 | 6💬 (#8284) | 🟢 Ổn định |

**Insight**: Hermes Agent + OpenClaw chiếm **85% total PRs**, lead về velocity. NanoClaw có release duy nhất (RC), QwenPaw + NanoBot focus polish quality hơn quantity.

---

## 3. Vị thế của Hermes Agent

### Điểm mạnh

✅ **Velocity cao nhất**: 500 PRs, merge daily, backlog active  
✅ **Community engagement lớn**: issue 202 comments (gateway session ownership)  
✅ **Plugin ecosystem**: hermetic cost tracking, greyridge suite (token-safety, market-data, llm-inference)  
✅ **Gateway-first architecture**: SSE event replay, multi-surface session access  
✅ **Windows compatibility focus**: UMA, terminal selectors fix, local-models isolation  

### Pain points

❌ **Stability debt**: Windows PATH pollution (#135037), state recording bugs, terminal fd ≥1024 silent loss  
❌ **Security gaps**: osascript auto-approval data loss (#141346 CRITICAL), config stale credential aliases  
❌ **Desktop UX rough edges**: turn finalization lost (#131740), scroll giật, modal stuck  

### Vị trí trong hệ sinh thái

**Leader về infrastructure complexity**. Gateway-owns-local-session model độc nhất, không dự án nào khác đi xa đến vậy. Trade-off: phức tạp cao → bugs nhiều, nhưng unlock thick client resilience (SSE replay #32431) và multi-device sync (#112028).

So với OpenClaw (memory leak nghiêm trọng #91588) và Zeroclaw (race condition nhiều), Hermes ít blocker P0 hơn nhưng backlog lớn hơn (134889 tracking issue 202 comments).

---

## 4. Hướng kỹ thuật chung

### Trend được nhiều dự án áp dụng

1. **SQLite consolidation** (NanoBot #6336, Zeroclaw #11900)
   - Di chuyển từ JSONL/multi-file sang unified DB
   - Mục đích: enable edit/resend, atomic transactions, WAL recovery

2. **Plugin subprocess isolation** (QwenPaw #8187, Zeroclaw #11914 RFC)
   - Channel/plugin chạy riêng process/sandbox
   - Giảm blast radius crash, chuẩn bị hot reload

3. **Cron maturity** (NanoBot #6313/#6319/#6345, Hermes #8348)
   - Enable/disable/update in-place thay vì delete-recreate
   - Run history tracking, wake-only payload

4. **Memory recall optimization** (OpenClaw #178914, Zeroclaw #11897)
   - Fallback BM25 khi embedder fail
   - Ranking config (decay curve, exclude paths)

5. **OAuth/OIDC hardening** (Zeroclaw #11903, IronClaw #8147)
   - JWKS fetch race fix
   - Loopback endpoint whitelist cho local connectors

### Công nghệ stack phổ biến

- **SQLite WAL mode**: session/state storage (NanoBot, Zeroclaw)
- **SSE/WebSocket**: streaming turns (Hermes #32431, QwenPaw #8348)
- **Wasmtime**: plugin runtime (Zeroclaw #11906 patch)
- **MCP (Model Context Protocol)**: server discovery, auth (IronClaw #8147, Zeroclaw)

---

## 5. Điểm khác biệt

### Chiến lược phát triển

| Dự án | Chiến lược | Evidence |
|-------|-----------|----------|
| **Hermes** | Infrastructure-first, multi-surface | Gateway owns local sessions, SSE replay, Desktop fold interim bubbles |
| **OpenClaw** | Production stability | Memory leak P0 (#91588), session recovery, performance regression Windows |
| **QwenPaw** | Plugin ecosystem + UX | PawApp SDK redesign (#7874), UI refactor XXL (#8332), realtime voice |
| **NanoBot** | Session model purity | SQLite unification (#6336), edit/resend foundation (NAN-92) |
| **Zeroclaw** | Security-first refactor | Principal-based trust RFC (#11914), memory cross-leak fixes |
| **NanoClaw** | Stable beta cycle | RC releases, hardened images, approval card polish |
| **IronClaw** | Hosted MCP infrastructure | Local connector credential bridge (#8147), dependency security |

### Tính năng độc quyền

- **Hermes**: Gateway session ownership, SSE event replay, Desktop screen tabs
- **QwenPaw**: Realtime voice chat (#7785), HarmonyOS plugin host (#8311), JSON-driven eval index (#8253)
- **NanoBot**: Subagent idle compaction (#6339), Mermaid terminal rendering (#6320)
- **Zeroclaw**: Telegram rich message (#11862), Codex auto-compact threshold (#4163)
- **IronClaw**: NEAR on-chain contract publishing request (#2077), Plazmi MCP extension proposal (#8136)

### Community dynamics

**Hermes**: Largest, most vocal. Issue #134889 202 comments với sub-tasks tracked. High engagement = high expectations → critical data loss bug #141346 gây loud reaction.

**OpenClaw**: Production pain visible. Memory leak #91588 report chi tiết (RSS 350MB → 15.5GB), urgent tone. Less structured tracking, more firefighting.

**QwenPaw**: Chinese-heavy community (#8311 HarmonyOS request, #8340 DingTalk bugs). International adoption nhưng localized pain points. Technical discussion quality cao (scroll giật #8284 evidence screenshot, height re-estimate analysis).

**NanoBot/NanoClaw/Zeroclaw**: Smaller, contributor-driven. Zeroclaw có RFC process (#11914 principal-based trust). NanoClaw RC discipline tốt, gated release cycle.

---

## 6. Mức độ trưởng thành cộng đồng

### Mature (established process)

🟢 **Hermes Agent**: 
- Structured tracking (134889 meta-issue), P0/P1/P2 labels
- Plugin catalog (greyridge suite, hermetic)
- Roadmap transparency (P3 clusters, blocked issues #128295)

🟢 **NanoClaw**: 
- RC → stable release cycle
- Hardened image promotion (agent-images.json CI)
- Approval UX standardization cross-channel

🟢 **QwenPaw**: 
- Roadmap tagged (#8289 v2.3.0)
- XXL draft PR methodology (design-heavy changes)
- Community feature request tracking (#8071 theme extension)

### Growing (process forming)

🟡 **OpenClaw**: 
- P0/P1 labels used but no meta-tracking
- Tech debt cleanup (batch dXXX test removal)
- Long-term proposals archived (#147935, #135679)

🟡 **Zeroclaw**: 
- RFC culture starting (#11914, #11891)
- Version milestones (v0.8.7, v0.9.0)
- Community contribution plugin PRs (#11680 Firecrawl, #11584 Opper)

🟡 **NanoBot**: 
- Task-ID system (NAN-XXX)
- SQLite architecture shift documented
- Conflict resolution explicit (#6337, #6323 marked)

### Early (ad-hoc)

🔴 **IronClaw**: 
- No structured milestones
- Issue aging (#2077 6+ months no action)
- Dependency batch PRs (5 cùng lúc) nhưng không có theme

🔴 **PicoClaw**: 
- Stale proposals (#3427)
- 8-month PR merge (#875)
- Bot-driven issues (cairn-agent) không organic

⚫ **NullClaw**: Không hoạt động

---

## 7. Tín hiệu xu hướng

### 🔮 Predictions

1. **Plugin isolation becomes standard**  
   QwenPaw (#8187), Zeroclaw RFC (#11914), Hermes bounded completion policies (#128724) → subprocess/WASM sandbox universal trong 6 tháng.

2. **SQLite replaces multi-file state**  
   NanoBot unification (#6336), Zeroclaw session store WAL (#11900) → edit/resend, atomic recovery baseline architecture.

3. **MCP ecosystem consolidation**  
   IronClaw local connector (#8147), Zeroclaw hosted MCP auth, Hermes MCP OAuth pre-flight fix (#130240) → credential flow standardized, third-party server marketplace.

4. **Memory recall sophistication**  
   OpenClaw ranking config (#178914), Zeroclaw hybrid fallback (#11897) → BM25 + embedding blend, user-tunable decay, privacy scoping.

5. **Cross-agent orchestration**  
   PicoClaw XiaoYi A2A (#875), OpenClaw multi-agent matrix clarification (#164972), Zeroclaw inbound A2A RFC (#11891) → agent-to-agent protocol specs emerge.

### 🚨 Risk signals

**Security debt accumulating fast**: 
- Zeroclaw 4 security issues same day (#11912 memory leak, #11913 Telegram command exposure, #11908 system prompt unlimited, #11914 RFC)
- Hermes osascript auto-approval data loss (#141346)
- OpenClaw auth fallback timeout (#165135)

**Pattern**: features ship faster than security review → tighten pre-merge gates hoặc accept post-release firefighting.

**Windows compatibility persistent pain**:
- Hermes terminal fd limit, UMA headroom, PATH pollution
- OpenClaw startup regression (320s vs 55s)
- NanoBot provider timeout race CI

**Windows-first testing chưa universal** → Linux/macOS development bias.

**Memory leak pattern repeating**:
- OpenClaw 350MB → 15.5GB (#91588)
- Hermes terminal drain selectors fix (#142125)
- QwenPaw replay buffer accumulation (#8348)

**Observation**: long-running daemon + streaming turn → allocator discipline chưa tight.

### 🌟 Opportunity spaces

1. **Unified trust/scope abstraction**  
   Zeroclaw RFC #11914 hit: memory/workspace/bot-command/context-budget không có shared access control model → cơ hội standards body hoặc reference impl.

2. **Cross-platform desktop runtime**  
   Hermes Desktop, QwenPaw Console, NanoBot WebUI/TUI → electron-like but agent-native, declarative UI over protocol.

3. **Agent marketplace với trust scoring**  
   IronClaw contract source request (#2077), community plugins (Firecrawl, Opper) → cần provenance, sandboxing, review.

4. **Persistent world integration**  
   PicoClaw Plazmi proposal (#3427), IronClaw proposal (#8136) → game-like environments for agent testing, multi-agent coordination research.

---

## Kết luận chiến lược

**Hermes Agent đang lead về infrastructure ambition** (gateway-owns-local, SSE replay, multi-surface) nhưng **trade-off complexity → stability debt cao**. Windows compatibility và Desktop UX rough edges làm chậm adoption so với potential.

**OpenClaw có production footprint lớn nhất** (memory leak critical) nhưng **thiếu structured process** → reactive firefighting thay vì proactive hardening.

**QwenPaw + NanoBot focus quality hơn velocity**, **plugin ecosystem mature nhất** (SDK redesign, subprocess isolation). Community localized (Chinese) nhưng technical depth cao.

**Zeroclaw emerging security leader** với RFC culture, principal-based trust proposal. **NanoClaw stable beta cycle** là best practice cho release discipline.

**IronClaw/PicoClaw niche play** (NEAR on-chain, XiaoYi A2A) nhưng **adoption signal yếu** (aging issues, stale proposals).

**Hệ sinh thái healthy overall**: no architectural dead-ends, shared problems (session, memory, plugins) được approach khác nhau → convergence sẽ xảy ra khi patterns thành công lan rộng.

**Next 6 tháng**: plugin isolation universal, SQLite session model baseline, MCP credential flow standardized, security pre-merge gates tightened. **Risk**: Windows compatibility và memory leak nếu không system-level investment sẽ gây fragmentation.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-21

## 1. Tóm tắt hôm nay

Dự án tập trung xử lý bug nghiêm trọng liên quan session, memory leak và auth. 30 PR mới, 50 issue nổi bật. Không có release mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR nổi bật:**

- **#178876** [OPEN]: ClawRouter thêm native image generation - khắc phục lỗ hổng quan trọng trong pipeline xử lý ảnh
- **#178905** [OPEN]: Loại bỏ test thừa (batch d349) - giảm maintanence cost
- **#178933** [OPEN]: Thêm scheduled-run execution context - chuẩn bị cho automation runner
- **#175291** [OPEN]: Tạo agent chat nhanh, đơn giản hóa agent selection - cải thiện UX đáng kể
- **#178931** [OPEN]: Fix Discord thread binding crash khi channel restart chồng chéo

**Xu hướng:**
- Refactor và cleanup code lớn (nhiều PR batch dXXX)
- Cải thiện UX agent creation workflow
- Tăng cường ổn định session và auth

## 4. Điểm nổi bật cộng đồng

**Issue nhiều tương tác:**

- **#91588** [41 comments]: Memory leak gateway nghiêm trọng (350MB → 15.5GB), gây OOM crash lặp lại - vấn đề production lớn
- **#120385** [18 comments]: MCP tools missing trong scheduled/cron turns - ảnh hưởng automation
- **#172091** [13 comments]: SQLite transaction lock vĩnh viễn block WAL checkpoint
- **#164972** [10 comments]: Multi-agent teams matrix failures - clarification và parent context break

## 5. Ổn định & Bugs

**Bugs P0/P1 đang xử lý:**

- **Gateway memory leak** (#91588): RSS tăng không kiểm soát, OOM crash
- **Session state issues**:
  - #166634: Late reclamation checkpoint failure sau crash recovery
  - #178923: Provider review acknowledgment tạo thread mới, fail validation
  - #178913: Session cleanup fail vì harness deletion hook scope check
- **Auth provider issues**:
  - #165135: Fallback OAuth timeout che primary failure
  - #178909: Transcript idempotency conflict được xử lý như model failure, đi qua toàn bộ fallback chain
- **Performance regression Windows** (#171831): 2026.10.2 chậm hơn 2026.9.4 nhiều (startup 320s vs 55s)

**Bugs đã fix:**

- #178921: Worker exit trước command admission - đã có PR fix
- #178932: Codex-bound session cleanup dưới borrowed plugin scope - đã có PR fix

## 6. Yêu cầu tính năng

**Tính năng mới đề xuất:**

- **#178914**: Memory search ranking config - hiện fixed 30-day decay, không tune được, recall regressed
- **#177342**: `cron list` filtering - filter by schedule kind, run status, trigger
- **#152412**: toolPolicy cho phone Talk sessions - hiện locked safe-read-only
- **#139477**: Honor `tools.toolSearch` cho bundle-MCP CLI - hiện hardcode `alwaysLoad: true`
- **#178844**: Post-Quantum P2P channel via Montana Protocol - đề xuất táo bạo từ community
- **#171273**: Webhook binary/multipart upload - iOS Shortcuts photos vào agent session

**Tính năng đang implement:**

- #175291: Instant agent chat creation trong Control UI
- #177868: Memory search exclude paths cho generated files
- #177855: Restrict Gateway-local terminals và automation host execution
- #178824: A2A source-authorized outbound task reads

## 7. Phản hồi người dùng

**Pain points chính:**

1. **Memory leak** (#91588): User @petercheng report RSS 350MB → 15.5GB, production critical
2. **MCP tools missing** (#120385): Scheduled job fail silent, khó debug
3. **Update failures**: #177239, #177865 - global install issues
4. **iOS APNs không hoạt động** (#146791, #178927): App Store version không publish APNs registration
5. **Doctor scan lỗi** (#178589): Scan ~/.openclaw/extensions như workspace plugin root

**Trải nghiệm tích cực:**

- Codex integration đang được cải thiện (#177879)
- Native plugin UI không cần Labs opt-in (#177869)
- Voice call polish (#155271, #178824)

## 8. Backlog & Roadmap

**Ưu tiên cao (P0/P1):**

- Gateway memory leak fix (#91588)
- Session recovery stability (#166634, #156983)
- Windows performance regression (#171831)
- iOS APNs registration (#146791, #178927)

**Đang trong pipeline:**

- Session state refactor (nhiều PR linked)
- Automation execution context standardization (#178933)
- Agent creation UX overhaul (#175291)
- Native plugin UI (#177869)
- Crabbox private Proxmox workers (#177863)

**Tech debt cleanup:**

- Low-value test removal (batch dXXX) - giảm CI cost
- Private setup consolidation (refactor PRs)
- Plugin bookkeeping cleanup (#178926)

**Long-term proposals:**

- Multi-agent lifecycle contracts (#147935)
- Batched bounded queries (#135679)
- Wake-only cron payload (#119035)
- Post-quantum P2P (#178844)

---

**Tổng quan:** Dự án focus stability và UX improvements. Memory leak và session bugs là blocker lớn. Community engagement cao (41 comments trên #91588). Cleanup code tích cực. Roadmap rõ ràng nhưng nhiều P0 bugs cần xử lý trước khi ship features mới.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo hoạt động NanoBot - 2026-10-21

## 📋 Tóm tắt hôm nay

Ngày làm việc cường độ cao: 9 PR mới merge/close, 2 issue mới mở. Team tập trung ổn định core (session management, WebUI state sync) và mở rộng công cụ (cron update/disable/history). Không có release mới.

## 🚀 Releases

Không có.

## 📊 Tiến độ dự án

### PRs merge/đóng hôm nay (9 mục)

**Core stability:**
- #6339 ✅ Close: bỏ qua subagent session trong idle compaction → giảm summary không cần thiết
- #6336 🔄 Open: hợp nhất model history + display history vào SQLite → xóa JSONL độc lập, chuẩn bị cho edit/resend (NAN-299, NAN-92)
- #6352 🔄 Open: đóng băng elapsed time cho finished exec sessions → fix thời gian chạy tăng vô hạn

**WebUI fixes:**
- #6329 ✅ Close: phục hồi model failure state, neo action button vào message bubble
- #6338 ✅ Close: hiện skeleton khi load conversation thay vì màn trắng
- #6335 ✅ Close: đồng bộ typography snapshot (fix CI)
- #6337 🔄 Open: task state backend-authoritative → fix sidebar/composer mâu thuẫn sau reconnect (NAN-263)
- #6349 🔄 Open: ổn định earlier-history loading, giữ scroll position, dọn empty band

**Cron enhancements:**
- #6313 🔄 Open: enable/disable cron jobs (#6312)
- #6319 🔄 Open: expose run history (5 bản ghi gần nhất, giới hạn 1-20) (#6318)
- #6345 🔄 Open: update cron in-place (tên/instruction/schedule) thay vì xóa-tạo (#6344)

**Channel & search:**
- #6333 ✅ Close → reopen #6340: QQ QR scan login (match WeChat/Feishu UX)
- #6341 🔄 Open: WeCom xử lý video + quoted replies
- #6331 🔄 Open: DuckDuckGo retry + backoff, phân biệt rate-limit vs empty result (#6285)
- #6348 🔄 Open: cho phép websockets 17 (fix race assert not self.eof_sent), giữ Feishu compat

**Testing:**
- #6351 🔄 Open: fix Seatbelt test parse result format mới
- #6347 🔄 Open: keep Feishu identity refresh test offline (tránh pip install trong test)
- #6343 🔄 Open: chờ provider start trước khi timeout → fix Windows CI race
- #6342 🔄 Open: publish exec finish file atomically (rename thay vì write_text) → fix empty copy race

**Features:**
- #6321 🔄 Open: local file + video attachments cho WebUI/TUI (NAN-284)
- #6320 ✅ Close: render Mermaid trong TUI bằng terminal images (Pele 1.6.0, NAN-288)
- #6323 🔄 Open: edit/resend message in-place (không tạo topic mới, NAN-92)
- #6256 🔄 Open: compact composer toolbar cho workspace controls
- #6168 🔄 Open: managed in-app updates với recovery

**Refactor:**
- #6191 🔄 Open: reuse SecretInput component (provider, web search, channel creds, Linear, login)

**Conflicts noted:**
- #6033 ✅ Close: superseded bởi SQLite session arch (main 28f6c29)
- #6337, #6323, #6256, #6191: đánh dấu conflict

### Xu hướng

1. **Session/state unification**: di chuyển từ JSONL sang SQLite (foundation cho edit/resend)
2. **Cron maturity**: từ add/remove lên full lifecycle (enable/disable/update/history)
3. **WebUI polish**: state sync, skeleton loading, compact layout
4. **Cross-platform stability**: Windows CI races, Feishu offline tests, websockets 17
5. **Attachment expansion**: video, local file paths (không upload)

## 🔥 Điểm nổi bật cộng đồng

**#5924** (6 bình luận, bug p1): sudo loop làm agent unusable
- Sudo hết hạn sau 1 turn → agent lặp vô hạn
- Max iterations không dừng được → cross-turn obsession
- **#6346** fix phần cross-turn: đừng resume abandoned work sau max_iterations

**#6285** (1 bình luận): DuckDuckGo search liên tiếp fail "No results found"
- Rate limit → "No results found" → nhầm với empty result
- **#6331** thêm backoff retry + phân loại lỗi

**#6344** (0 bình luận): yêu cầu update cron in-place
- Hiện tại remove + recreate → mất identity/history
- **#6345** reuse CronService.update_job()

## 🐛 Ổn định & Bugs

**Đã fix:**
- Subagent idle compaction không cần thiết (#6339)
- Model failure state mất sau fallback (#6329)
- Exec elapsed time tăng vô hạn (#6352)
- Conversation load blank screen (#6338)
- Feishu backslash trong mention (#6036)

**Đang fix:**
- Task state desync sau reconnect (#6337)
- Earlier history scroll jump (#6349)
- Seatbelt test format (#6351)
- Provider timeout race trên Windows CI (#6343)
- Exec finish file empty copy race (#6342)
- DuckDuckGo rate limit (#6331)

**CI/testing stability:**
- 3 PR fix test races (Windows exec, Feishu offline, provider timeout)
- Typography snapshot đồng bộ (#6335)

## ✨ Yêu cầu tính năng

**Mới hôm nay:**
- #6344: cron update in-place → #6345 implement

**Từ trước, đang active:**
- #6298: budget MCP schemas cho large tool sets (4 bình luận)
- #4431: heartbeat-specific model override (3 bình luận, tiết kiệm cost)
- #6182: Plazmi world catch-up MCP example (0 bình luận)

**WebUI features:**
- Edit/resend message (#6323)
- Local file + video attachments (#6321)
- Compact workspace toolbar (#6256)

**Managed updates:**
- #6168: installation-owner-aware in-app updates với recovery

## 💬 Phản hồi người dùng

**Pain points:**
1. Sudo loop (#5924): ảnh hưởng trải nghiệm nghiêm trọng, p1 priority
2. Search reliability (#6285): consecutive queries fail
3. Cron lifecycle: thiếu update/disable → phải delete-recreate

**UX improvements:**
- QQ QR scan (#6333/#6340): match WeChat/Feishu pattern
- Conversation loading skeleton (#6338): giảm blank screen
- Message edit (#6323): không tạo topic mới

## 📅 Backlog & Roadmap

**Near-term (đang implement):**
- Session unification (SQLite) → enable edit/resend (NAN-92, NAN-299)
- Cron maturity: update/disable/history complete
- WebUI state sync: backend-authoritative task state (NAN-263)
- Attachment expansion: video + local files (NAN-284)

**Medium-term (approved/in-discussion):**
- Managed updates (#6168)
- MCP schema budgeting (#6298)
- Heartbeat model override (#4431)

**Testing debt:**
- Windows CI stability (3 race fixes)
- Offline test isolation (Feishu)

---

**Velocity**: 9 PR merge/close trong ngày, 2 issue mới. Core team tập trung bug fixes + cron enhancements. Session architecture shift (JSONL→SQLite) là foundation cho edit/resend feature.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw 2026-10-21 🔧

## 1. Tóm tắt hôm nay

Zeroclaw tập trung giải quyết lỗi bảo mật và stability: race condition trong session store, OIDC token bị từ chối sai, gateway phục vụ config cũ sau reload. Nhiều PR sửa edge case (cron WAL lock, memory recall fallback, Codex quota retry). Không có release.

---

## 2. Releases

Không có release mới.

---

## 3. Tiến độ dự án

### 🔥 PRs quan trọng

**Bảo mật & Infrastructure:**
- **#11903** [risk:high]: Fix OIDC JWKS race - token bị từ chối `Misconfigured` khi nhiều request cùng fetch JWKS → dùng shared fetch
- **#11901** [risk:high]: Gateway không ngắt connection cũ sau reload → config/auth cũ vẫn chạy → drain connection khi stop
- **#11900** [risk:high]: Session store race khi daemon mới start → gateway/RPC/channel cùng mở `sessions.db` → WAL init conflict
- **#11906**: Patch Wasmtime 48.0.6→48.0.7 (5 RustSec advisory: RUSTSEC-2026-0375..0379)

**Runtime & Channels:**
- **#11918**: Cron `NO_REPLY` vẫn hiện trong web chat → filter `cron_result` event trước khi publish
- **#11911**: Tool result bị mất khi channel timeout → checkpoint tool transcript ở mọi terminal path
- **#11910**: System prompt size không enforce (default=0=unlimited) → hard gate, fail closed

**Memory & Providers:**
- **#11897**: Memory recall trả về rỗng khi embedder lỗi → fallback BM25-only (hybrid mode)
- **#11895**: Codex 429 retry liên tục → đọc `resets_in_seconds` từ response, circuit-break đến khi hết quota window
- **#11893**: Thêm `embedding_query_prefix` cho instruction-tuned model (Qwen3, E5, BGE)

**Goal Mode V1 (draft):**
- **#11880** [3/12]: Extract transport-neutral policy contracts → bị block vì inherited TLS deps fail security gate

### 🐛 Issues nóng

**Bảo mật (cần fix ngay):**
- **#11914**: RFC principal-based trust boundary → context budget/memory scoping/bot command/workspace bootstrap không có unified access control
- **#11912**: Memory recall bypass agent scoping → cross-agent leak
- **#11913**: Telegram bot command hiển thị cho tất cả user (không scope `allowed_users`)
- **#11908**: System prompt size không giới hạn (default 0)

**Stability:**
- **#11909**: Channel interrupt mất tool result, session không resumable
- **#11904**: Cron WAL init race → 2 connection cùng mở new DB, 1 bị fail
- **#11902**: OIDC token check race → Misconfigured
- **#11899**: Gateway không drain connection sau reload
- **#11898**: Daemon fresh start race → session store missing

**UX:**
- **#11332** [S2]: Skill review/creation không chạy cho channel/webhook/gateway (chỉ CLI/cron)
- **#11916**: Cron `NO_REPLY` vẫn hiện web chat
- **#11917**: Web chat không nhận cron/pushed message cho đến khi user reply lần đầu

---

## 4. Điểm nổi bật cộng đồng

**Nhiều tương tác nhất:**
- **#11754** [30+ comments]: Config acknowledgement reactions (👀, ✅) → đang review
- **#11061** [security]: Block high-risk shell command ngay cả khi allowlist → cần author action
- **#9809** [principal contributor]: Multiple model per provider → merge conflict cần resolve

**Community contribution:**
- **@cairn-agent** (#11705): Đề xuất Plazmi example cho MCP per-agent grant + bounded catch-up
- **@rs545837** (#11915): Doc Sem MCP local repo lookup
- **@JuampiHernandez/Firecrawl** (#11680): Add Firecrawl web search provider
- **@Felixkw12/Opper** (#11584): Add Opper EU-hosted provider

---

## 5. Ổn định & Bugs

### 🚨 Critical (đã có fix)

1. **Gateway config leak** (#11899 → #11901): Reload không dừng old connection → serve stale config/auth
2. **OIDC auth race** (#11902 → #11903): Concurrent token check fail với `Misconfigured`
3. **Session store race** (#11898 → #11900): Fresh start → gateway/RPC/channel race → missing store

### ⚠️ High priority (chưa fix)

1. **Cross-agent memory leak** (#11912): Memory recall không filter agent_id
2. **Telegram command exposure** (#11913): Bot menu hiện với mọi user (không check `allowed_users`)
3. **System prompt unlimited** (#11908 → #11910 fixing): Default 0 = no limit
4. **Tool result loss** (#11909 → #11911 fixing): Channel timeout → completed tool result không persist

### 🔧 Medium

- Skill learning loop không chạy cho channel/webhook (#11332)
- Memory hang khi embedder stall (#11896)
- Codex quota retry spam (#11894)
- Telegram 429 không honor `retry_after` (#11651)
- Cron `NO_REPLY` leak vào web chat (#11916, #11918 fixing)

---

## 6. Yêu cầu tính năng

### Config & UX
- **#11919**: Web chat toggle collapse "Thinking" box (không tự mở)
- **#11754**: Config acknowledgement reaction (👀/✅/custom)
- **#11731**: ZeroCode per-pane session cap (hiện hardcode 8)
- **#11862**: Telegram rich message (heading/list/quote/table qua `sendRichMessage`)

### Memory & Providers
- **#11892** → **#11893**: Embedding query prefix cho instruction-tuned model
- **#11680**: Firecrawl web search provider
- **#11584**: Opper EU-hosted provider

### Infrastructure
- **#11914** [RFC]: Principal-based trust boundary → unified access control layer
- **#11891** [RFC]: Inbound A2A streaming + task lifecycle
- **#10997**: Install plugin trong onboarding (blocked)
- **#9809**: Multiple model per provider profile (long-running PR)

---

## 7. Phản hồi người dùng

### 😤 Pain point

1. **Bảo mật lỏng lẻo**: Memory cross-leak, Telegram command public, system prompt không limit → nhiều issue cùng lúc → cần unified abstraction (#11914 RFC)
2. **Race condition nhiều**: OIDC/session store/cron WAL/gateway reload → stability issue khi concurrency tăng
3. **Channel tool result mất**: Timeout → work loss → user phải retry
4. **Skill learning bị disable thực tế**: Chỉ CLI/cron, không channel/web → degraded agent improvement

### 👍 Tích cực

- Community contribute provider (Firecrawl, Opper) + example (Plazmi MCP)
- Team responsive: nhiều critical bug có PR trong 24h (#11899→#11901, #11902→#11903)
- Maintainer transparency: RFC cho architecture change (#11914, #11891)

---

## 8. Backlog & Roadmap

### Release v0.8.7 gate
- **#11329** [CLOSED]: Discord plugin doc → merged
- Nhiều PR target v0.8.7 đang review: #11903 (OIDC), #11901 (gateway), #11900 (session)

### Release v0.9.0 scope
- **#11274**: RPC client verify OS account before send credential
- **#11186**: `zeroclaw-rpc-client` + in-process gateway transport

### Goal Mode V1 [draft, 12 slices]
- **#11880** [3/12]: Policy contract extraction → blocked by TLS deps security fail
- Nhiều phụ thuộc, chưa roadmap rõ

### Blocked
- **#10997**: Plugin onboarding (blocked, no reason stated)
- **#11061**: Block high-risk shell → needs-author-action (2+ tuần không update)

---

## Kết luận

**Hôm nay tập trung firefight**: 3 critical race condition (OIDC/session/gateway), 4 security boundary issue (memory/command/prompt/workspace). Team fix nhanh nhưng pattern lặp lại → RFC #11914 đề xuất unified trust layer.

Stability trend: nhiều edge case concurrency → cần investment vào init/shutdown/reload path. Community engagement tốt (PR provider, RFC discussion) nhưng backlog lớn → bandwidth stretched.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-21

## 📊 Tóm tắt hôm nay

Hoạt động giảm. PR #875 thêm hỗ trợ XiaoYi channel đóng sau 8 tháng. Issue #3427 về tích hợp Plazmi MCP vẫn mở, đánh dấu stale.

## 🚀 Releases

Không có release.

## 📈 Tiến độ dự án

### Pull Requests

**#875 - XiaoYi Channel Support** ✅ CLOSED
- **Mục đích**: Thêm kênh giao tiếp A2A (Agent-to-Agent) qua XiaoYi protocol
- **Kiến trúc**: 
  - Package `pkg/channels/xiaoyi/`
  - Dùng `xiaoyi-agent-sdk` 
  - Follow pattern BaseChannel + factory registration
  - Thêm `XiaoYiConfig` vào config
- **Ý nghĩa**: Mở rộng khả năng tương tác multi-agent, PicoClaw connect được với agents dùng XiaoYi protocol
- **Thời gian**: 8 tháng từ tạo đến merge → backlog dài hoặc ưu tiên thấp

### Issues

**#3427 - Plazmi MCP/CLI Integration** 🟡 OPEN (stale)
- **Đề xuất**: Tích hợp Plazmi (persistent world game) làm example cho MCP CLI
- **Lý do phù hợp PicoClaw**:
  - PicoClaw có MCP CLI + heartbeat capabilities
  - Plazmi cần persistent sessions theo UTC time
  - Có `pulse`/`digest` mechanism cho returning agents
  - Client là 1 file Python → lightweight, dễ demo
- **Trạng thái**: Stale (1 tuần không activity) → khả năng bị bỏ qua cao

## 💬 Điểm nổi bật cộng đồng

Không có tương tác cao. 
- PR #875: 0 reactions
- Issue #3427: 0 reactions, 1 comment

Community engagement thấp trong ngày.

## 🐛 Ổn định & Bugs

Không có bug report mới. PR #875 đóng không có bug mention → giả định stable.

## ✨ Yêu cầu tính năng

**Plazmi Integration (#3427)**
- Example use-case cho persistent agent sessions
- Low-dependency approach
- Real-time world interactions với agents
- **Giá trị**: Demo thực tế cho MCP capabilities, attract devs muốn build persistent agent apps

## 📣 Phản hồi người dùng

Thiếu feedback rõ ràng. Issue #3427 từ bot account (@cairn-agent) → có thể automated proposal, không phải organic user demand.

## 🗺️ Backlog & Roadmap

**Xu hướng**:
- **Channel expansion**: XiaoYi merge → PicoClaw đang build multi-protocol agent communication layer
- **MCP use-cases**: Plazmi proposal → cần concrete examples, documentation qua code
- **Stale issues**: #3427 → backlog grooming cần attention

**Roadmap signals**:
- Agent-to-agent protocols là priority (A2A qua XiaoYi)
- MCP/CLI persistent sessions cần validation use-cases
- Community contribution slow → maintainer capacity hoặc adoption chưa rộng

---

**Tình hình**: Maintenance mode. Merge backlog PR, proposals không tiến triển. Cần clarity về MCP direction và community outreach.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-21

## 🔍 Tóm tắt hôm nay

Phát hành RC đầu tiên cho 2026.10.1 với tính năng agent tạo agent từ template và provider Cursor. Team tập trung fix bugs: approval card hiển thị không đủ thông tin, Codex session tràn context window, egress lockdown không áp dụng cho container đang chạy. PR mới thêm pi provider đang review.

## 🚀 Releases

**v2026.10.1-rc.1** (2026-10-20)
- Agent tạo agent khác từ template
- Thêm Cursor provider
- Base image lên Claude Code 2.1.296 + Haiku 5.5
- Setup đợi first reply chậm, báo lỗi rõ ràng hơn
- Approval card hiện trong thread user đang xem
- Ít agent run fail hơn

→ Beta channel nhận RC này, stable giữ 2026.10.0 đến khi 2026.10.1 chính thức

## 📊 Tiến độ dự án

**Merged (20/10):**
- #4103: CLI `messaging-groups delete` cascade xóa dependent rows (fix FOREIGN KEY fail)
- #4157: CI refresh image chỉ chạy ở repo chính, không chạy fork
- #4158: Release v2026.10.1-rc.1
- #4149: List hardened image cho v2026.10.0
- #4010: CI tự mở PR agent-images.json khi promote image (6h/lần)
- #4109: Docs update: provider code trong skill payload, không còn ở providers branch
- #4123: Fix flaky test `setup/gateways/selection.test.ts`

**Open - đang review:**

*High priority:*
- #4161: Accept Anthropic key mới (`sk-ant-usr`, `sk-ant-svc`) thay vì chỉ `sk-ant-api`
- #4163: Thêm `CODEX_AUTO_COMPACT_TOKEN_LIMIT` env var cho operator set threshold compact Codex thread
- #4160: Apply egress lockdown cho agent đang chạy khi bật lockdown
- #4159: Fix `/clear` bug: reply lệch một thread sau clear

*Feature lớn:*
- #4129: **pi provider** (`/add-pi`) - provider mới, 4 follow-up issue mở (#4152, #4153, #4154, #4162)
- #4094 + #4095: OneCLI 1.45 grants system - group mới chỉ nhận credential của model họ dùng
- #3156: Carry channel attachment dạng structured part đến provider (vision model thấy file thật, không chỉ text)

*Refinements:*
- #4156: Approval card dài hiện đầy đủ trên Telegram/Discord/WhatsApp (split thành text message + card với button)
- #4147: Approval card luôn show full action
- #4148: Refuse agent mới nếu group folder name invalid (trước khi write gì)
- #4102: `add-imessage` removal clear messaging-group dependents đúng
- #4155: Sync main vào channels branch (Chat SDK 4.41.1, approval cards, Codex payload)

**Trend:** Team đang hardening - nhiều fix edge case, safety check, UX polish. Provider ecosystem mở rộng (pi).

## 💬 Điểm nổi bật cộng đồng

#4162 bug report về Codex session không compact → timeout ở chat thread dài
- Issue mới (20/10), chưa có comment
- Tác giả @stopwatch2208 đưa ra fix PR #4163 cùng ngày → responsive

#4154 follow-up từ #4129: pi provider nên pick group's own provider, không lấy toàn bộ gateway list
- Z-Mackintosh mở issue + tự phân tích kỹ
- 1 comment, đang discussion

→ Cộng đồng nhỏ nhưng active, tự report + tự fix

## 🐛 Ổn định & Bugs

**Fixed:**
- Foreign key constraint fail khi xóa messaging group
- Flaky test ở gateway selection
- Approval card bị cắt nội dung dài
- Egress lockdown không cover agent đang chạy trước restart
- Setup reject Anthropic key type mới

**Open - critical:**
- #4162: Codex session tràn context → timeout (fix đang review)
- #4159: Reply lệch thread sau `/clear`

**Open - improvement needed:**
- #4152: pi continuation quá lớn cần rotate
- #4153: pi mid-turn text delivery decision
- #4154: pi gateway provider selection

→ Nhiều edge case phát hiện sau khi ship feature, team fix nhanh

## ✨ Yêu cầu tính năng

#4129: **pi provider** - tính năng lớn đang review
- Payload skill cho `/add-pi`
- 4 follow-up issue đã mở cho polish

#3156: Structured attachment support (photo/PDF qua channel → provider thấy file gốc)
- Mở từ tháng 7, chưa merge
- Quan trọng cho vision model

#4094: OneCLI 1.45 - scoped credential grants
- Group chỉ nhận credential cần dùng, không phải tất cả

→ Roadmap: mở rộng provider ecosystem, security tighten, UX refine

## 👥 Phản hồi người dùng

Không có issue complaint từ user. Bug report đến từ contributor internal hoặc dogfooding.

Approval card improvements (#4147, #4156) → phản hồi từ thực tế dùng: card bị cắt action text, gây khó đọc

## 🗺️ Backlog & Roadmap

**In progress:**
- pi provider integration (4 open issues)
- OneCLI 1.45 migration
- Structured attachment support

**Pattern:** Release cycle ổn định (RC → stable), feature flag approach cho big changes, comprehensive follow-up issues cho new feature

**Next likely:** 
- 2026.10.1 stable release sau khi RC test xong
- pi provider land sau polish
- OneCLI 1.45 merge block nhiều skill (Dial tool phụ thuộc #4095)

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-21

## 📋 Tóm tắt hôm nay

Hoạt động tập trung vào bảo mật dependencies (5 PRs update thư viện) và cải tiến hosted MCP. PR #8147 mở khả năng kết nối MCP server local qua loopback endpoint, giải quyết issue #8146. Không có release mới.

## 🚀 Releases

Không có releases.

## 📊 Tiến độ dự án

**PRs quan trọng:**

- **#8147 (OPEN)** - Cho phép đăng ký MCP endpoint 127.0.0.1 
  - Giải quyết vấn đề: hosted MCP hiện chặn tất cả HTTP/IP literal → local server không thể dùng credential-account bearer auth
  - Thêm whitelist cho exact loopback endpoint với `trusted: true` flag
  - Mở đường cho local connector kết nối an toàn qua native credential system

**Dependencies batch (5 PRs):**
- rustls 0.23.43 → 0.23.45 (2 PRs: #8151, #8152) - bảo mật TLS
- dompurify 3.4.12 → 3.4.16 (#8149) - fix DOM sanitization
- multidict 6.7.1 → 6.9.1 (#8150) - Python HTTP library
- fast-uri 3.1.5 → 3.1.9 (#8148) - bảo mật URI parsing
- aiohttp 3.14.3 → 3.14.4 (#8145) - Python async HTTP

**PRs đóng:**
- #7386, #8048 - merged vào updates mới hơn

**Xu hướng:** Maintenance cycle mạnh (dependencies) + tính năng mở rộng MCP infrastructure.

## 💬 Điểm nổi bật cộng đồng

**Issue #2077** (cập nhật 2026-10-21, 2 comments):
- @HavenCTO yêu cầu publish contract source cho market.near.ai
- Mục đích: xây dựng sovereign agents giữ private keys riêng, hoạt động trực tiếp on-chain
- Vấn đề hiện tại: chỉ có HTTP API → phụ thuộc infrastructure của NEAR
- **Ý nghĩa:** Nhu cầu decentralization thật sự - agents độc lập hoàn toàn, không qua middleman

**Issue #8136** (2026-10-13):
- @cairn-agent đề xuất optional Plazmi extension dùng hosted-MCP auth + egress đã có
- Muốn tích hợp qua declarative surface thay vì vendor logic trong host
- Không có comments → chưa rõ response từ maintainers

## 🐛 Ổn định & Bugs

**Issue #8146 → PR #8147:**
- **Vấn đề:** Hosted MCP registry reject HTTP/IP literals → local connector không thể register với credential-account bearer
- **Nguyên nhân:** Security policy quá chặt, không có whitelist cho trusted local endpoints
- **Giải pháp:** Thêm explicit enrollment cho exact loopback address với trust flag
- **Tác động:** Mở cửa cho private credential setup bridge

**Dependencies security patches:**
- rustls, dompurify, fast-uri, multidict, aiohttp: tất cả là security releases
- Đặc biệt rustls (TLS layer) và fast-uri (URI parsing) - critical attack surfaces

## ✨ Yêu cầu tính năng

**#2077 - Contract source publication:**
- Phạm vi: Infrastructure/tooling để agents tương tác trực tiếp với NEAR blockchain
- Động lực: Giảm phụ thuộc vào centralized APIs
- Trạng thái: Open 6+ tháng, 2 comments → có thể không ưu tiên cao

**#8136 - Plazmi MCP extension:**
- Phạm vi: Third-party extension framework cho hosted-MCP
- Thiết kế: Dùng seams đã có thay vì core changes
- Trạng thái: 0 comments → chưa được review

## 👥 Phản hồi người dùng

- **@HavenCTO:** Trường hợp sử dụng rõ ràng (sovereign agents), nhưng response chậm từ maintainers
- **@cairn-agent & @tom9000:** Hai actors khác nhau push MCP improvements - có thể là nhu cầu thật từ users
- Không có discussions hoặc votes nhiều → cộng đồng tương tác thấp hoặc user base nhỏ

## 🗺️ Backlog & Roadmap

Không có thông tin roadmap công khai trong dữ liệu.

**Suy luận từ patterns:**
- MCP infrastructure đang được mở rộng (local connectors, declarative auth)
- Security maintenance ổn định (5 dependency updates cùng lúc)
- On-chain integration chưa ưu tiên (#2077 aging)
- Focus ngắn hạn: Stabilize MCP → enable more connection patterns

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-10-21

## 1. Tóm tắt hôm nay

Ngày bận rộn. 4 PR merge, 3 issue close, thêm 34 PR mới/update. Tập trung chính: tối ưu memory runtime, sửa scroll UI, cải thiện channel isolation, plugin SDK redesign.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### Tiến triển chính

**Memory & Performance** 🚀
- #8348 (mới): Cắt replay buffer SSE tích lũy. Tool result stream hiện emit snapshot đầy mỗi delta → buffer phình. Fix: chỉ giữ final snapshot, drop superseded message.
- #8327: ACP server thoát sớm sau tool call dài. Chuẩn hóa error class, giữ long-running turn sống qua timeout thật.

**UI/UX Console** 🎨
- #8339 (merge): Scroll chat dài giật. Lỗi: `content-visibility: auto` + height estimate không ổn định. Fix: override placeholder CSS.
- #8332 (draft XXL): Refactor lớn UI/UX → responsive, state correct, bounded performance.
- #8287: Slider thinking-strength sai fill gradient, flicker khi save. Fix: đúng rail CSS + debounce save.
- #8340 + #8349: Edit cron job không close modal, time-picker reset 0:00, [object Object] in request. Fix: sync form state, format JSON.

**Channel & Integration** 📡
- #8187 (draft XXL): Extract channel thành plugin + subprocess isolation. Giảm blast radius crash.
- #8341: DingTalk reply >3500 char xuống plain text, mất markdown. Fix: split thành markdown chunk.
- #8343 + #8215: DingTalk sessionWebhook expire → final reply dropped. LM Studio audio rejection. Fix: routing fallback + classify error.
- #8305: Custom channel config array/object render `[object Object]`. Fix: JSON editor + validate.
- #8304: Paste Matrix credential có whitespace → reject. Fix: strip.
- #8302: Channel reload → consumer cancelled khi cleanup chưa xong → asyncio warning. Fix: retain consumer 5s.
- #8315: Feishu channel qua HTTP(S)_PROXY không có NO_PROXY fail 426. Doc lỗi proxy config.
- #8342: Quoted reply mất routing control command (/stop). Fix: detect quoted prefix.

**Plugin & Skills** 🔌
- #7874 (draft XXL): PawApp SDK redesign → durable work, scoped Host contract, task identity, retry, permissions.
- #8285: Skill pool download blocking. Fix: cancellable job.
- #8320 + #8344: Desktop make-skill fail import qwenpaw. Fix: native CLI --json.
- #8345: Plugin install abort khi `invalidate_caches()` raise. Fix: wrap try/except.
- #7565: Plugin unload + hot reload rollback-safe. Ledger teardown.

**Security & Content** 🔒
- #8283: Tool approval mode dùng decision model.
- #8092: Ali gateway data_inspection_failed classify bad_request → không retry. Fix: #8124 route sang fallback.
- #7864 (merge): Skill directory chống prompt-injection delete.

**Feature** ✨
- #7785: Realtime voice chat with speech input, playback, interruption.
- #8200: Add Firecrawl web_search provider.
- #8253: JSON-driven evaluation index với leaderboard SVG chart.
- #8347: ReMe 0.4.2 JEV context compaction.

### Xu hướng

Plugin ecosystem trưởng thành (isolation, SDK, hot reload). Memory optimization, channel resilience scale up. UI polish theo mouse-first, responsive. Security layer thêm model-backed approval.

## 4. Điểm nổi bật cộng đồng

- #8284 (close): Scroll giật chat dài → nhiều user hit, 6 comment, fix #8339 merge nhanh.
- #8289: Roadmap v2.3.0 → plugin refactor lighter (1👍, 2 comment).
- #8311: HarmonyOS plugin host request chuẩn hóa bridge + 分发验签 (2 comment, Chinese dev).
- #8071: Plugin theme extension point request (5 comment).

## 5. Ổn định & Bugs

**Closed** ✅
- #8171: send_file_to_user audio wedge session → #8215 fix LM Studio classifier.
- #8177: Console hardcode /console basename → không serve subpath.
- #8284: Scroll giật → #8339 override placeholder.
- #8343: DingTalk sessionWebhook expire drop final reply.
- #7654: llama-server, DashScope audio rejection không nhận diện.
- #7854: Driver reload mất concurrent policy update.
- #7864: Skill dir chống injection delete.

**Open high-impact**
- #8092: Ali gateway content filter kill turn (PR #8124 under review).
- #8249: Cron edit reset time, [object Object] (PR #8349).
- #8320: make-skill import fail Desktop (PR #8344).

## 6. Yêu cầu tính năng

- #8071: Plugin theme semantic token override → plugin control color deep hơn primary.
- #8311: HarmonyOS plugin host chuẩn hóa window.QwenPaw contract, data bridge.
- Implicitly: hot reload, subprocess isolation, real-time voice đã implement.

## 7. Phản hồi người dùng

- **Scroll giật** (#8284): User mô tả chi tiết height re-estimate snap view, evidence dev test confirm fix.
- **Cron edit modal** (#8340, #8249): Chinese user báo UX broken, không close, time reset.
- **DingTalk plain text** (#8341): Long markdown reply xuống text, mất format → user frustrated.
- **Audio wedge** (#8171): LM Studio 400 không classify → turn killed, không retry → user stuck.

Chủ yếu: UX friction (modal/scroll), channel stability, classifier edge case.

## 8. Backlog & Roadmap

**v2.3.0** (theo #8289):
- Plugin refactor lighter + modular
- Preliminary test result có
- Request input use case, suggestion

**In-progress big branch**:
- #7874: PawApp SDK plane mới
- #8187: Channel plugin isolation
- #8332: Console refactor XXL
- #7565: Plugin unload/reload safe
- #7785: Realtime voice

Focus: ecosystem mature (plugin SDK, channel plugin), performance (memory, replay buffer), UX polish (scroll, modal, responsive).

---

**Số liệu**: 14 issue (3 close), 34 PR (30 hiển thị, 4 merge), 0 release.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*