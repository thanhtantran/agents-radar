# Bản tin Hệ sinh thái Hermes Agent 2026-10-20

> Issues: 130 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-20 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-20

## 📊 Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào stabilization: 50 PR đóng cùng ngày (hầu hết là Windows compatibility stack từ @bbasketballer75), 3 bug mới nghiêm trọng về gateway + session management, và 1 lỗ hổng bảo mật (auto-approved osascript đóng PowerPoint + mất data).

---

## 🚀 Releases

Không có release trong 24h.

---

## 📈 Tiến độ dự án

### Gateway ownership consolidation (#134889) - 196 bình luận
Post-merge cleanup sau feat/unified-gateway-runtime (merged Oct 14). 12/19 task đã fix. Còn lại:
- TUI-17, TUI-21, TUI-19, TUI-16, TUI-9, RT-11, RT-16

### Đóng loạt 50 PR Windows compatibility
@bbasketballer75 đóng stack PR cũ (Aug-Sep) về:
- Windows path normalization, quoting, drive-letter handling
- PM environment repair trên case-insensitive filesystems
- Git binary selection, PowerShell re-quoting
- Media-delivery denylist, home-directory redaction
- CodeQL CI, Azure Trusted Signing

Lý do đóng: force-push accident hoặc rebase conflict. Nhiều fix đã vào main qua route khác.

### MCP & session persistence
- #141705: `session_search` fail trong managed workers (RuntimeSessionStore không có `search_messages`)
- #139029: Kanban worker chết với `WorkerPersistenceError: synchronous_rpc_on_event_loop`
- #140222: Agent jobs với monitor tạo empty session mỗi tick

---

## 🔥 Điểm nổi bật cộng đồng

### #141346 - Data loss nghiêm trọng (11 bình luận)
Smart approval auto-approved `osascript` commands đóng PowerPoint deck chưa save của user + xóa export. **Unrecoverable data loss**. 

Nguyên nhân: approval mode `smart` tin tưởng osascript drives (AppleScript), không phân biệt read vs destructive write.

### #79357 - Idle compression không bao giờ fire (10 bình luận)
`idle_compact_after_seconds` không hoạt động trong gateway mode. Gateway reset `_last_activity_ts` cho watchdog, idle check đọc timestamp đó → measured gap luôn ~0.

### #137838 - macOS gateway exits 75 lặp lại (8 bình luận)
Gateway trên macOS exit code 75 sau missed liveness probes. Root cause chưa xác định. Ban đầu nghi ngờ MCP stream teardown block event loop, nhưng GLM 5.3 review bác bỏ. Hiện tại: chưa rõ.

---

## 🐛 Ổn định & Bugs

### P0 / P1 issues mới hoặc hoạt động

**#141133** [P2]: `hermes -p <name> gateway stop` trên multiplex profile dừng **host gateway** thay vì profile đó. Gateway.lock đọc host pid như separate gateway.

**#141236** [P2]: `list_sessions` walk mọi session row trên gateway loop thread → với vài nghìn rows, loop stall → Telegram adapter drop fatally.

**#136486** [P2]: Replayed `reasoning` alias bên cạnh `reasoning_content` → HTTP 400 `duplicate field`. Field-rejection learning không fire → mọi turn fallback.

**#141687** [P3]: Dashboard WebSocket dropped without close frame log ERROR asyncio trên Python 3.14 (uvicorn legacy websockets impl).

**#141806** [P2]: Streamed replies skip `extract_images` → markdown images arrive as `!alt` text trên Discord.

### Windows-specific

**#135910** [P2]: `pm repair` fail trên case-insensitive filesystem (Docker bind mount macOS/APFS). `shutil.copytree` chết với Errno 17 tại bundled CPython terminfo.

**#141574** [P2]: Desktop saturates CPU: zygote process 600%+ sau GPU process launch failures (Arch Linux).

---

## 💡 Yêu cầu tính năng

**#58414** [P3, 8 bình luận]: Desktop controls cho MCP và skill reloads. Hiện tại phải dùng slash commands ẩn `/reload-mcp`, `/reload-skills`.

**#119683** [P2, 3 bình luận]: Model-blind handoff SMS/email codes to `browser_vault_enter_code`. Hermes retrieve code không show model, browser vault inject code mà model không thấy password.

**#93029** [P3, 4 bình luận]: Timezone-aware active hours / quiet hours cho heartbeat. Heartbeat 30 phút fire cả đêm trừ khi prompt implement time check riêng.

**#141817** [OPEN, mới]: Chọn Chromium browser nào `use_real_profile` snapshot. Hiện tại dùng OS default browser (xdg-settings), fail nếu không phải Chromium-family.

---

## 👥 Phản hồi người dùng

### Positive signals
- #58746 (9 bình luận): `hermes update` nên target stable release, không phải main. User theo CLI prompt unknowingly adopt development channel.
- #126247 (4 bình luận): Support password-blind Hermes Vault credential injection với CamoFox. Security model hữu ích: model thấy opaque handle, không bao giờ thấy password.

### Pain points
- Email channel (#141637): Mark mọi incoming message as read. RFC822 without PEEK + STORE Seen wipes mailbox.
- Config edit trên multiplex profile (#141595): Edit `.env` trên secondary profile không bind, rescan log line đọc như success.
- Cron initialization (#139807): DirectSDK fail với OpenAI unexpected 'command' keyword.

---

## 📋 Backlog & Roadmap

Không có thông tin roadmap công khai. Focus hiện tại:

1. **Gateway stability**: Đóng remaining 7 tasks trong #139161 (TUI + Desktop sessions)
2. **Windows hardening**: Nhiều PR đóng nhưng vẫn còn edge cases (PM repair, path handling)
3. **Session management**: Fix RuntimeSessionStore, persistent-home mechanics
4. **Security**: Review smart approval logic sau #141346 data loss

---

## 🎯 Insight

**High-volume stabilization phase**. 50 PR đóng 1 ngày = backlog cleanup hoặc refactor lớn. Windows compatibility stack mature nhưng vẫn có regression (case-insensitive FS, multiplex gateway PID logic).

**Gateway architecture strain**: 3 P1/P2 issues về session/liveness/message delivery. Unified gateway runtime (#106742 merged Oct 14) vẫn settle.

**Security gap**: Smart approval (#141346) cần redesign. Model-blind workflows (#119683, #126247) là hướng đi đúng nhưng coverage chưa đầy đủ.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo so sánh hệ sinh thái AI Agent - 2026-10-20

## 1. Tổng quan hệ sinh thái

**Ngày làm việc tích cực.** 8/9 dự án hoạt động. OpenClaw + NanoClaw + NanoBot + QwenPaw ship liên tục, Hermes + ZeroClaw focus cleanup lớn. PicoClaw chết, IronClaw stall benchmark.

**Phân hoá rõ:** 3 tier:
- **Production tier**: OpenClaw (72 issue), Hermes (130 issue), QwenPaw (16 issue) - volume cao, community report bugs thực tế
- **Active development**: NanoClaw (5 issue), NanoBot (7 issue), ZeroClaw (5 issue) - internal team chạy nhanh, chưa scale user
- **Unmaintained/Research**: PicoClaw (fork public), IronClaw (chỉ benchmark), NullClaw (0 activity)

**Tín hiệu stress:** Hermes + QwenPaw có bug nghiêm trọng production (data loss, UI freeze). OpenClaw Windows reliability blocker. Dự án lớn đang chịu pressure scale.

---

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases 24h | Hoạt động chính | Severity cao nhất | Community engagement |
|-------|--------|-----|--------------|-----------------|-------------------|---------------------|
| **Hermes Agent** | 130 | 500 | 0 | Gateway consolidation, 50 PR Windows đóng loạt | P0 data loss (#141346) | ⭐⭐⭐ Cao (11 comment/issue) |
| **OpenClaw** | 72 | 500 | 1 beta | Workspace safety, tool policy, update fix | P0 Windows blocker (#170956) | ⭐⭐⭐ Cao (21 comment/issue) |
| **QwenPaw** | 16 | 46 | 0 | UI freeze fix, media bloat, channel drop | Critical UI freeze 2.2.2 | ⭐⭐ Trung bình (3 comment) |
| **NanoBot** | 7 | 37 | 0 | Cron history, pagination, web_fetch continuation | P2 sandbox (#2569) | ⭐⭐ Trung bình (request → fix < 24h) |
| **NanoClaw** | 5 | 50 | 0 | Approval hardening, credential scope, Cursor provider | - | ⭐ Thấp (internal) |
| **ZeroClaw** | 5 | 50 | 0 | Goal Mode V1 (12 PR proposal), WhatsApp fix | S1 timeout (#11873) | ⭐ Thấp (0-2 comment) |
| **PicoClaw** | 5 | 2 | 0 | Stale bot đóng, fork public vì unmaintained | Token burn 13M (#3445) | ⚠️ Abandoned |
| **IronClaw** | 1 | 1 | 0 | Daily benchmark taxonomy | - | ⚠️ Internal only |
| **NullClaw** | 0 | 0 | 0 | Không hoạt động | - | ⚠️ Dead |

---

## 3. Vị thế Hermes Agent

**Vị trí:** Production-tier leader, scale lớn nhưng technical debt cao.

**Điểm mạnh:**
- Volume lớn nhất: 130 issue, 500 PR
- Community engagement cao: 11 comment/issue (#141346)
- Gateway architecture mature: unified runtime merged Oct 14
- Windows compatibility stack extensive (50 PR)

**Điểm yếu nghiêm trọng:**
- **P0 data loss** (#141346): Smart approval auto-approved destructive osascript, mất PowerPoint deck chưa save
- Gateway strain: 3 P1/P2 session/liveness bugs sau unified runtime
- Idle compression không fire (#79357)
- macOS gateway exit 75 lặp lại (#137838)

**So với đối thủ:**
- OpenClaw: release cadence ổn hơn (beta 2-3 ngày), Windows blocker nhưng đã có fix roadmap
- QwenPaw: nhỏ hơn nhưng UI performance regression 2.2.2 nghiêm trọng tương đương
- NanoBot/NanoClaw: internal velocity nhanh, chưa có scale problem

**Insight:** Hermes đang ở giai đoạn post-refactor settlement. Unified gateway runtime (Oct 14) chưa stable. Smart approval redesign cần gấp. Windows stack mature nhưng edge case còn (multiplex PID, case-insensitive FS).

**Chiến lược cần:** Pause feature, focus stabilization 2-3 tuần. Review smart approval logic, fix gateway session/liveness, close Windows regression.

---

## 4. Hướng kỹ thuật chung

### 4.1 Session & State Management

**Xu hướng:** Mọi dự án gặp vấn đề session lifecycle.

- **Hermes**: `session_search` fail RuntimeSessionStore (#141705), Kanban worker `WorkerPersistenceError` (#139029)
- **OpenClaw**: Agent admit chậm sau version change (#164799), checkpoint loss metadata update (#5801 - NanoBot sister)
- **QwenPaw**: `waitSessionReady()` block UI 10-30s (#8288)
- **ZeroClaw**: WhatsApp allowlist device suffix trong JID (#11865)

**Pattern:** Session state không consistent giữa workers, UI, gateway. Persistence layer fragile khi schema/runtime change.

### 4.2 Windows Reliability

**Problem chung:** Windows là platform khó nhất, volume issue lớn nhất.

- **Hermes**: 50 PR path/quoting/PM repair, vẫn còn multiplex gateway PID (#141133), case-insensitive FS (#135910)
- **OpenClaw**: P0 release blocker (#170956 slow startup, #167406 MSIX Codex starve)
- **NanoBot**: Workspace picker thiếu drive list (#6111)

**Root cause:** Path normalization, permission model, process lifecycle khác Unix. Docker bind mount (macOS APFS) vào Windows case-insensitive fail.

**Best practice:** OpenClaw dùng schtasks managed service, Hermes dùng environment repair. Chưa có standard solution.

### 4.3 Context & Memory

**Challenge:** LLM context window finite, media/tool output bloat memory.

- **Hermes**: Idle compression không fire (#79357)
- **QwenPaw**: Media base64 48MB request (#8335), context exceeded abort (#8312)
- **OpenClaw**: Recall evict nightly (#150635), memory leak 0.35 GiB/h (#159373)

**Approach:**
- **QwenPaw** (#8337): Drop media sau N turn, chỉ replay window gần
- **OpenClaw** (#150635): Dreaming phase promote mechanism
- **NanoBot** (#6316): web_fetch continuation với offset

**Insight:** Naive approach (keep mọi thứ) không scale. Cần intelligent compaction + selective replay.

### 4.4 Channel Reliability

**Pattern:** Message drop im lặng, không có error visible cho user.

- **QwenPaw**: QQ group handler thiếu (#8313), Telegram bỏ qua reply (#8329)
- **Hermes**: Email mark read wipe mailbox (#141637)
- **ZeroClaw**: WhatsApp device suffix fail (#11865)

**Root cause:** Event schema không match platform quirks (QQ có `GROUP_MESSAGE_CREATE` + `GROUP_AT_MESSAGE_CREATE`, Telegram `reply_to_message` optional).

**Best practice:** NanoClaw isolation (#4148) - channel trong subprocess, crash không affect main. QwenPaw (#8187) đang làm.

### 4.5 Tool Security & Approval

**Critical gap:** Smart approval trust model sai.

- **Hermes** (#141346): osascript auto-approved → data loss
- **NanoClaw** (#4136-4147): 3 PR hardening approval cards
- **PicoClaw** (#3445): routing loop 13M token, không có circuit breaker

**Pattern:** Model-visible approval insufficient. Cần:
1. Approval logic phân biệt read vs destructive write
2. Tool output không auto-trust
3. Circuit breaker cho loop/cost explosion

**NanoBot/OpenClaw approach:** Model-blind vault (#119683, #126247) - model thấy handle, không thấy password. Đúng hướng nhưng coverage chưa đủ.

---

## 5. Điểm khác biệt

### 5.1 Chiến lược phát triển

**Hermes:**
- Consolidation phase: unified gateway, đóng backlog (50 PR Windows)
- Feature freeze implied: 0 release, focus stabilization
- Community-driven: nhiều external report

**OpenClaw:**
- Steady release: beta 2-3 ngày
- Feature + stability parallel: workspace safety vừa ship, cron persistent stream đang làm
- Roadmap visible: secrets migration, PostgreSQL 17

**QwenPaw:**
- Feature aggressive: Advisor Mode (2-model collaboration), channel plugin isolation
- Performance regression tolerate: 2.2.2 ship với UI freeze, fix sau
- Large PR culture: XXXL refactor (#8332)

**NanoBot/NanoClaw:**
- Rapid iteration: issue → fix < 24h
- Internal velocity: 10+ PR merge/ngày
- Scale chưa test: community engagement thấp

**ZeroClaw:**
- Proposal-heavy: 12 PR Goal Mode cùng ngày, chưa merge
- RFC culture: per-user pairing (#11870), PR review optimization (#11876)

**PicoClaw/IronClaw:**
- Abandoned/research: không có user-facing development

### 5.2 Tính năng unique

| Dự án | Killer feature | Status |
|-------|---------------|--------|
| **Hermes** | Smart approval (thất bại), Gateway multiplex | Gateway strain |
| **OpenClaw** | Workspace safety (patch reject khi context mismatch), Tool policy hooks | Stable |
| **QwenPaw** | Advisor Mode (2-model loop), `/steer` mid-turn guidance | In progress |
| **NanoBot** | Cron history exposure, web_fetch continuation | Shipped |
| **NanoClaw** | Approval card hardening, credential path scope | Shipped |
| **ZeroClaw** | Goal Mode V1 (task lifecycle durable) | Proposal |

**Insight:** OpenClaw workspace safety = best practice. QwenPaw Advisor Mode = cost optimization pioneer. Hermes smart approval = cautionary tale.

### 5.3 Community maturity

**Tier 1 - Production scale:**
- **Hermes**: 11 comment/issue, external contributors, security reports
- **OpenClaw**: 21 comment #150635, detailed bug reports với repro
- **QwenPaw**: 16 issue trong tuần, performance complaints vocal

**Tier 2 - Active internal:**
- **NanoBot**: 1 external contributor (@david-dev666), rapid response
- **NanoClaw**: Contributors (@barnuri, @zvi-fried), nhưng 0-2 comment/issue
- **ZeroClaw**: Internal-only, RFC discussion không có external

**Tier 3 - Dead/research:**
- **PicoClaw**: Fork công khai (#3417), maintainer không response
- **IronClaw**: 0 community interaction

**Measure:** Comment count, external contributor ratio, bug report quality.

---

## 6. Mức độ trưởng thành cộng đồng

### OpenClaw ⭐⭐⭐⭐
**Mature production community.**
- 21-comment thread (#150635) về recall eviction
- Detailed reports: version info, repro steps, logs
- Contributors submit fix PRs (23+ community PRs)
- Pain point articulate: update flow, Windows experience, automation

**Signal:** Users treat như production dependency, expect reliability.

### Hermes Agent ⭐⭐⭐⭐
**Large but strained.**
- 11-comment data loss thread (#141346)
- Security-conscious: CamoFox password-blind request (#126247)
- Windows stack feedback loop (bbasketballer75 50 PR)

**Weakness:** Gateway bugs (#137838 exit 75) chưa rõ root cause sau nhiều comment.

### QwenPaw ⭐⭐⭐
**Growing pains visible.**
- UI freeze regression (#8288) user frustrated
- Channel message drop (#8313, #8329) confuse users
- Context bloat (#8312) user không hiểu abort

**Potential:** 16 issue 1 tuần = adoption tăng. Team responsive (3 fix/ngày).

### NanoBot ⭐⭐
**Emerging.**
- 1 external contributor active (@david-dev666)
- Tool API enhancement requests tốt (cron, pagination)
- Docker onboarding fail (#6165) chưa fix

**Limit:** Engagement shallow (issue → fix, không có deep discussion).

### NanoClaw/ZeroClaw ⭐
**Internal-stage.**
- 0-2 comment/issue
- Contributors là known names (team + close circle)
- Không có external pain point reports

**Future:** Cần public promotion hoặc accept internal-tool status.

### PicoClaw ⚠️
**Abandoned, community self-organize.**
- Fork public (#3417) không có opposition
- Critical bug (#3445) không response
- Stale bot chủ động

### IronClaw/NullClaw ⚠️
**No community.**

---

## 7. Tín hiệu xu hướng

### 7.1 Tool security redesign imminent

**Catalyst:** Hermes data loss (#141346), PicoClaw token burn (#3445).

**Direction:**
- Model-blind credential injection (NanoBot/OpenClaw #119683, #126247)
- Approval card hardening (NanoClaw 3 PR)
- Circuit breaker cho cost/loop (chưa có dự án implement)

**Prediction:** Q1 2027 sẽ có standard tool security framework. Smart approval current model die.

### 7.2 Multi-model orchestration

**Pioneer:** QwenPaw Advisor Mode (#7569) - advisor (mạnh) + worker (rẻ).

**Rationale:** Cost optimization. GPT-4 plan, Llama execute. Advisor review, pivot nếu sai hướng.

**Adoption risk:** Coordination overhead. Nếu advisor sai, worker waste. Debugging phức tạp (ai sai?).

**Prediction:** Niche use case (long-running automation). Không thay thế single-model workflow.

### 7.3 Channel plugin isolation

**Converge:** QwenPaw (#8187), NanoClaw (approval trong subprocess).

**Driver:** Crash resilience. Channel adapter crash không crash main process.

**Tradeoff:** Complexity tăng (IPC, serialization), latency tăng.

**Prediction:** Standard cho production deploy. Development mode vẫn in-process.

### 7.4 Windows platform priority giảm

**Evidence:** Hermes 50 PR đóng, OpenClaw P0 blocker, NanoBot thiếu drive picker.

**Reality:** Windows edge case infinite. Docker/WSL2 become de facto Windows deploy.

**Prediction:** Native Windows support degrade thành "community-maintained". Official support focus Linux/macOS + Docker.

### 7.5 Context management arms race

**Problem:** LLM context window tăng (GPT-4 128K → 1M), nhưng cost per token không giảm tương ứng.

**Approaches:**
- Intelligent compaction (drop media, summary)
- Continuation API (web_fetch offset)
- Dreaming/recall (OpenClaw long-term memory)

**Wild card:** Anthropic prompt caching, OpenAI batch API. Nếu cache hit 90%, naive approach win.

**Prediction:** Fragmentation. Mỗi dự án optimize khác nhau, chưa có consensus best practice.

### 7.6 Update/migration reliability critical

**Pain point universal:**
- Hermes: npm update never converge (#169953), macOS repair mỗi launch (#168534)
- OpenClaw: update recovery blocked (#169463), schema migration fail (#164799)
- NanoBot: Docker onboarding fail (#6165)

**Root cause:** State migration phức tạp (DB schema, file format, config). Rollback không atomic.

**Prediction:** Dự án mature sẽ invest migration testing infra (canary, rollback, schema versioning). Immature projects sẽ lose users ở update step.

### 7.7 Benchmark-driven development

**Signal:** IronClaw daily taxonomy (#8143), OpenClaw recall test coverage.

**Trend:** Model quality variance cao (DeepSeek-V4-Flash 57 non-pass). Benchmark catch regression sớm.

**Adoption barrier:** Setup cost. Harness cần sandbox, API cost.

**Prediction:** Top 3 projects sẽ có CI benchmark. Others rely on manual testing.

---

## 🎯 Kết luận chiến lược

**Hệ sinh thái phân tầng rõ:**
- **Leaders** (Hermes, OpenClaw): scale pain, focus stability
- **Challengers** (QwenPaw, NanoBot): feature velocity cao, chưa test scale
- **Specialists** (NanoClaw, ZeroClaw): internal tools, chưa public
- **Dead/Research** (PicoClaw, IronClaw): không compete

**Hermes vị thế:** Production-tier leader nhưng technical debt cao. Gateway refactor chưa settle, smart approval thất bại. Windows stack extensive nhưng không complete.

**Cơ hội:** OpenClaw release cadence + workspace safety tốt hơn. QwenPaw Advisor Mode nếu ship stable sẽ differentiate.

**Rủi ro chung:** Tool security, context management, update reliability. Dự án nào solve 3 vấn đề này trước sẽ win production adoption.

**Xu hướng 2027:**
- Tool security redesign (model-blind credentials)
- Multi-model orchestration (niche adoption)
- Channel isolation (production standard)
- Windows native support decline
- Context management fragmentation
- Benchmark-driven development (top-tier only)

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-20

## 1. Tóm tắt hôm nay

Dự án focus fix stability: 30 PR mở, nhiều refactor internal code. Main issues: Windows reliability, memory leak, session state corruption. Beta 2026.10.10-beta.2 ship hôm qua. Cộng đồng report automation auth bug, update failure nhiều.

## 2. Releases

### v2026.10.10-beta.2 (2026-10-19)

**Highlights chính:**
- Workspace safety: reject `apply_patch` when target file miss hoặc context không match → giữ workspace clean cho retry
- Tool policy: run plugin `before_tool_call` hook trong standalone `openclaw agent exec`

Significance: patch safety improvement quan trọng - tránh partial file corruption khi multi-file patch fail giữa chừng.

## 3. Tiến độ dự án

### PRs quan trọng đang active:

**Stability & Core:**
- #177844 (P1 🦐): Fix update flow - settle state writer trước schema repair, fix candidate Doctor fail
- #177938: Reuse cancellation observer owner - bỏ duplicate abort/timeout observer
- #177921: Remove redundant observation work - clean internal checks

**Security & Auth:**
- #177819 (P2 🐚): Keep session file trong permitted workspace - fix sandbox isolation
- #177925: Preserve client credential qua Doctor cutover - fix schema-29 migration
- #176213 (P1): Renew SIWC credential per model request - fix token expiry

**Features:**
- #177942-177943: Cron persistent stream với sandbox authorization - stack 4-5/5
- #175509 (P2 🦪): Add Bifrost provider, allow anonymous gateway

**UI/UX:**
- #177929: Fix "Show earlier" lose keyboard focus khi load history (#149618)
- #177924: Screen reader miss load error ở Device/Channel/Agent page (#177923)

**Xu hướng:** Heavy refactor internal code (reuse owner, remove duplicate), focus stability fix trước feature mới.

## 4. Điểm nổi bật cộng đồng

**Top interaction issues:**

1. **#150635** (21 comment, 🦞): Recall evict nightly → dreaming deep phase never promote
   - Blocker cho memory system
   
2. **#164799** (15 comment, 🦪): Agent admit chậm sau version change, DB refused until restart

3. **#170956** (13 comment, 🐚 P0): Windows slow startup + unclean plugin shutdown → restart unreliable
   - **UX release blocker**

4. **#167406** (9 comment, 🦪 P0): Windows MSIX Codex starve main thread
   - **UX release blocker**

Pattern: Windows reliability issue nhiều, memory/session state corruption, upgrade flow không smooth.

## 5. Ổn định & Bugs

### Critical (P0):
- Windows Gateway reliability (#170956, #167406) - **release blocker**
- Update recovery blocked (#169463) - CLOSED hôm nay

### High Priority (P1):
- Memory leak ~0.35 GiB/h (#159373) - gateway cần restart 12-15h
- Native Codex completion inherit aborted scope (#167410)
- Discord native command break (#177451 fix đang review)
- Automation auth fail nhiều job (#177930 - mới report)

### Medium (P2):
- Short-term recall retention evict bug (#150635)
- Stuck-session recovery lose blocked_tool_call classification (#138528)
- Telegram automation list/get succeed nhưng many job reject history access (#177930)

**Root cause pattern:**
- Lifecycle management (process cleanup, worker lifecycle)
- State transition (session admit, plugin replacement)
- Platform-specific (Windows PATH, macOS LaunchAgent)

## 6. Yêu cầu tính năng

**Mới đề xuất:**
- #138366 (P2 🦞): Dreaming provider trong MemoryPluginCapability - UI-driven dreams page
- #159886 (P2 🌊): Resume conversation stopped ở subscription limit khi capacity return
- #177927 (P2 🌊): Per-agent access control cho paired node (personal device trong multi-person gateway)

**Đang implement:**
- Bifrost provider (#175509)
- TypeSafe Jev V2 image judgment (#177636)
- Evergreen extra paths cho memory (#151915)

## 7. Phản hồi người dùng

### Pain point chính:

1. **Update unreliable:**
   - Multiple report update fail (#177865, #177896, #177239)
   - macOS app run `openclaw update repair` mỗi launch (#168534)
   - npm update never converge (#169953, #167557)

2. **Windows experience poor:**
   - Slow startup, permission error, crash loop
   - Managed service install via schtasks unreliable

3. **Automation không predictable:**
   - Cron job fail silent (#128916)
   - Telegram automation auth confuse (#177930)
   - Feishu cross-session send fail (#167270)

4. **Memory system chưa ổn:**
   - Recall không work (#150635)
   - Session index lag (#134113)

### Positive signal:
- Nhiều contributor submit PR (23+ PR từ community author)
- Detailed bug report với repro step
- Active security review

## 8. Backlog & Roadmap

### Immediate (từ PR activity):
1. Ship Windows stability fix (#170956, #167406) - release blocker
2. Complete cron persistent stream stack (đang #177942-177943)
3. PostgreSQL 17 qualify support (#177922, #177928)
4. Memory system fix (#150635, #172547)

### Medium term (từ issue label):
- Secrets migration automation (#140928, #146969, #135937)
- Skill Workshop prompt cache optimization (#177506)
- Incremental transcript reconcile (#134113)

### Stale/Low priority:
- Multiple P2 issue đang stale (>30 day no activity)
- Feature request ở tidepool rating (🌊)

**Roadmap signal:** Focus stability > feature. Nhiều refactor PR indicate tech debt cleanup trước scale.

---

**Tình hình tổng quan:** Dự án đang ổn định after beta release. Main challenge: Windows platform, update flow, memory system. Community active contribute fix. Release cadence ổn (beta 2-3 day). Next milestone: resolve P0 blocker, ship stable 2026.10.x.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot ngày 2026-10-20

## 1. Tóm tắt hôm nay

Ngày làm việc tập trung vào hoàn thiện cron tool, web_fetch pagination, UI polish. Merge 10 PR fix lỗi UI/provider, tạo 4 PR enhancement tool mới. Không có release.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### Merged hôm nay (10 PR)

**Cron & tool enhancements:**
- #6319 (OPEN): Expose cron run history - agent giờ query 20 lần chạy gần nhất với status/duration/error
- #6313 (OPEN): Pause/resume cron jobs - không cần xóa để tạm dừng
- #6315 (OPEN): Pagination cho list_sessions - offset/limit thay vì dump toàn bộ
- #6317 (OPEN): web_fetch continuation - đọc tiếp trang truncated với offset thay vì re-fetch từ đầu

**UI fixes:**
- #6311: Session handle typed vào input giờ nhận dạng đúng reference
- #6310: Typography provider params align 13px
- #6309: Merge consecutive waiting messages - fix guidance queue overtake
- #6275: CLI Apps scan đẩy ra worker thread - không block event loop
- #6276: List semantics quanh links - fix markdown list item có link bị flatten
- #6281: Search summary single-line với ellipsis
- #6283: DeepSeek model capabilities align API - flash models support images
- #6297: Docs clarity improvements
- #6301: Reuse history navigation snapshots - validate input trước khi rebuild
- #6302: Mermaid diagrams render với Pele (local)
- #6306: Isolate transcript replay khỏi live observers
- #6307: Await canonical reconciliation trong test
- #6294: DeepSeek Search provider - search API độc lập chat model
- #5801: Preserve checkpoint qua metadata updates - fix lost state khi allocate handle mid-turn

**In progress:**
- #6168: Managed install + in-app update - macOS Dock integration, chưa activate
- #6280: Update flow recovery gaps - follow-up #6168
- #6304: Safe execution activity projection - fix exec_session observer expose internal handles
- #6305: Email reply subject prefix không duplicate

### Open issues quan trọng

**Tooling:**
- #6318: Cron history exposure (đã có PR #6319)
- #6316: web_fetch continuation (đã có PR #6317)
- #6314: list_sessions pagination (đã có PR #6315)
- #6312: Cron pause/resume (đã có PR #6313)

**Security & UX:**
- #2569 (1👍): OS-level sandboxing cho tool execution - sandlock proposal
- #6165: Docker image không hoạt động out-of-box
- #6111: Windows workspace picker thiếu drive list/folder creation

## 4. Điểm nổi bật cộng đồng

**Tool API expansion:**
4 enhancement requests cùng tác giả @david-dev666 trong 24h - tất cả đều được implement ngay:
- Cron history query
- Job pause/resume
- Session pagination
- Web fetch continuation

Tốc độ response: issue → PR < 24 giờ.

**Telegram improvements:**
PR #5902, #5803 đang polish Telegram channel - topic rename, typing status, newline rendering.

## 5. Ổn định & Bugs

**Fixed:**
- Session handle recognition trong typed input (#6311)
- Checkpoint loss khi metadata update (#5801)
- CLI Apps scan block event loop (#6275)
- Markdown list rendering around links (#6276)
- Search summary wrapping (#6281)
- DeepSeek model caps mismatch (#6283)
- Transcript replay isolation (#6306)
- Provider param typography (#6310)
- Guidance queue overtake (#6309)

**In progress:**
- #6304: Exec session observer leak internal state
- #6305: Email subject prefix duplication
- #6262: Checkpoint tool results tại execution-batch boundaries
- #6308: Chat Completions refusal responses bị ignore

**Backlog:**
- #6165: Docker onboarding fails
- #2569: sandlock OS-level sandboxing

## 6. Yêu cầu tính năng

**Implemented today:**
- ✅ Cron run history API
- ✅ Cron enable/disable
- ✅ Session list pagination
- ✅ Web fetch offset continuation
- ✅ DeepSeek Search provider
- ✅ Mermaid diagram rendering

**Pending:**
- #6111: Windows workspace picker improvements
- #5437: Serply search provider
- #6158: Browser notification failure handling

## 7. Phản hồi người dùng

**Positive signals:**
- Tool API gaps được phát hiện và fix nhanh (cron, sessions, web_fetch)
- UI polish liên tục (typography, list rendering, search display)

**Pain points:**
- #6165: Docker quickstart không hoạt động - onboarding friction
- #2569: Exec tool security concerns - regex-based blocking insufficient
- #6111: Windows UX gaps - drive picker, folder creation

## 8. Backlog & Roadmap

**Near-term (PRs in review):**
- macOS managed install + in-app updates (#6168, #6280) - chưa activate
- Telegram topic enhancements (#5902, #5803)
- Execution activity projection cleanup (#6304)
- Email subject prefix fix (#6305)

**Medium-term:**
- OS-level tool sandboxing (#2569) - security hardening
- Docker onboarding fix (#6165)
- Windows workspace picker (#6111)
- Browser notification improvements (#6158)
- Serply search provider (#5437)

**Pattern:**
Rapid iteration trên tool APIs và UI polish. Security/onboarding issues lâu hơn. Merge velocity cao - 14 PR merged trong 2 ngày gần đây.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw - 2026-10-20

## 1. Tóm tắt hôm nay

ZeroClaw đang trong giai đoạn triển khai lớn Goal Mode (12 PR proposal từ V1 roadmap). Ngày hôm nay tập trung xử lý 2 bug quan trọng: WhatsApp Web allowlist từ chối tin nhắn từ linked device (#11865 - đã đóng), và channel timeout sai khi model chậm (#11873 - vừa mở). Cộng đồng đang đóng góp nhiều cải tiến nhỏ (test coverage, SSH transport reuse).

## 2. Releases

Không có release.

## 3. Tiến độ dự án

### Goal Mode V1 (Milestone chính)
12 PR proposal (#11878-11889) được đẩy lên cùng ngày 2026-10-19, tuân theo roadmap #10341:
- **#11878**: Foundation - task lifecycle durable
- **#11881**: Execution lifecycle có accounting
- **#11882**: Epoch supervision + deferred controls
- **#11883**: Matrix channel integration
- **#11884**: RPC/ZeroCode API exposure
- **#11885**: Policy cutover fencing
- **#11886**: Tool pairing enforcement
- **#11887**: Status + accounting projection
- **#11888**: Cross-surface conformance tests
- **#11889**: Documentation

Tất cả PR đều đánh dấu "FAIL" review - chưa sẵn sàng merge, chỉ là proposal thảo luận.

### Cải tiến hạ tầng
- **#11869**: SSH transport reuse opt-in (giảm overhead kết nối)
- **#11847**: XMPP/Prosody channel mới (tích hợp OMEMO encryption)
- **#11712**: Tách A2A protocol thành crate riêng (refactor lớn)
- **#10412**: SessionBackend atomic ownership (P1, breaking change)

### Dashboard/UI
- **#11846**: OpenRouter credit balance control trong settings
- **#11845**: Hiển thị OpenRouter balance trên dashboard

### Tooling
- **#11076**: Antigravity CLI tool (thay Gemini CLI đã deprecated)

## 4. Điểm nổi bật cộng đồng

**Không có issue/PR nào có tương tác cao** (max 2 comments). Dự án vẫn ở giai đoạn internal development, chưa có community engagement rõ rệt.

## 5. Ổn định & Bugs

### Bug đã sửa (đóng trong ngày)
**#11865 - WhatsApp Web allowlist bug**: 
- Hiện tượng: Contact được allowlist nhưng tin nhắn từ linked device bị chặn
- Nguyên nhân: `normalize_phone_token` giữ device suffix trong JID (e.g. `15551234567:23`)
- Tác động: User không thể nhận tin từ multi-device contacts
- Trạng thái: Đã đóng

### Bug đang xử lý
**#11873 - Channel timeout misleading**:
- Hiện tượng: Task chạy chậm nhưng thành công, nhưng whole-turn timeout đổ lỗi model
- Nguyên nhân: Channel không có editable draft, silent qua nhiều round model/tool
- Severity: S1 (workflow blocked)
- Trạng thái: Mới mở, chưa có PR fix

**#11874 - Progress reporting**:
- PR fix cho #11873
- Thêm opt-in liveness notices cho long-running turns
- Tránh silent timeout khi investigation kéo dài

### Bug khác đã fix
- **#11868**: Chặn repeated calls trước dispatch
- **#11859**: `send_via` yêu cầu message content cho background calls
- **#11822**: Shell command scanner split sai (P2, risk:high)

## 6. Yêu cầu tính năng

### Đã triển khai hoặc đang review
- **XMPP channel** (#11847): Hỗ trợ Prosody, OMEMO E2EE
- **SSH transport pooling** (#11869): Reuse connection trong task
- **OpenRouter balance tracking** (#11845, #11846): Monitoring credit
- **Antigravity CLI** (#11076): Tool mới cho Gemini coding

### Đề xuất kiến trúc
**#11870 - Per-user pairing RFC**:
- Vấn đề: Gateway pairing hiện dùng operator credential, IdP outage chặn KB access
- Đề xuất: Per-user pairing sessions cho browser login + outage-safe delegation
- Trạng thái: RFC discussion

**#11876 - PR review optimization RFC**:
- Vấn đề: Review skill load 2500 lines instructions, xử lý labels/milestones lẫn code
- Đề xuất: Tách concerns, focus purpose/safety/quality
- Trạng thái: RFC discussion

## 7. Phản hồi người dùng

Không có phản hồi người dùng rõ ràng. Tất cả issues/PRs từ maintainers và contributors.

## 8. Backlog & Roadmap

### Milestone đang chạy
**Goal Mode V1** (#10341 tracker):
- 12 PR proposal đã submitted (chờ review)
- Dependencies: session ownership refactor (#10412), A2A extraction (#11712)
- Timeline: Chưa rõ, vẫn ở giai đoạn proposal

### Cleanup tasks
- **#11634**: Rust toolchain bump 1.99.1 (CI/infra)
- **Test coverage PRs**: #11250, #11157, #11155, #11154 (đã merge)

### Technical debt
- A2A protocol refactor (#11712) - tách crate để tránh circular deps
- Session ownership contract (#10412) - breaking change, P1

---

**Nhận xét tổng quan**: ZeroClaw đang push mạnh Goal Mode V1 với 12 PR cùng lúc. Bug fixing phản ứng nhanh (WhatsApp issue đóng trong ngày). Chưa thấy engagement từ external users - dự án vẫn internal-driven. Roadmap rõ ràng nhưng timeline chưa commit.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo PicoClaw ngày 2026-10-20

## 1. Tóm tắt hôm nay

Không có hoạt động phát triển mới. Stale bot đóng 3 issue cũ. Một issue nghiêm trọng về lỗi routing mới được báo (#3445: lightweight model đốt 13M tokens trong 9 phút). Community fork xuất hiện do repo gốc unmaintained.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Ngưng trệ hoàn toàn:**
- PR #3381 (OpenAI responses API): đóng do stale
- PR #3416 (Sendblue iMessage): vẫn draft, không review
- Issue #3417: maintainer fork (afjcjsbx/picoclaw) vì repo gốc bỏ hoang

**Tín hiệu:**
Không có maintainer review hoặc merge. Stale bot đóng toàn bộ activity 30+ ngày.

## 4. Điểm nổi bật cộng đồng

**Issue #3417 - Fork công khai:**
@afjcjsbx tuyên bố maintain fork active vì repo gốc chết. Không phản đối từ core team → xác nhận unmaintained.

**Không có engagement:** 
Tất cả issue/PR ngày 19/10 có 0 thumbs-up, minimal comments từ bot.

## 5. ⚠️ Ổn định & Bugs

**Issue #3445 - CHI TIÊU TOKEN THẢM HỌA:**

```
Model lightweight empty-spins:
- 222 LLM calls trong 9 phút
- 13,098,285 input tokens đốt cháy
- Routing logic không có熔断/circuit breaker
- Không re-evaluate giữa turn
```

**Root causes:**
- `agents.defaults.routing`: không stop trên repetitive output
- Lightweight model loop vô hạn khi stuck
- Không có token budget limit per turn

**Impact:** chi phí vận hành bùng nổ, production không khả dụng với routing enabled.

**Issues khác (đã đóng):**
- #3394: QQ API outdated
- #3426: Telegram MarkdownV2 escape lỗi

## 6. Yêu cầu tính năng

**PR #3416 - Sendblue channel:**
Native iMessage/SMS qua Sendblue API. Complete với docs, webhook setup. Stuck ở draft vì no review.

**PR #3381 - OpenAI responses API:**
Migrate sang API mới. Đã đóng do stale.

## 7. Phản hồi người dùng

**@cnbillsomeday (#3445):**
Production incident với routing - frustrated tone, data đầy đủ. Chưa có response.

**@afjcjsbx (#3417):**
Công khai fork vì repo chết. Community phản ứng im lặng → accept fork là reality.

## 8. Backlog & Roadmap

**Không có roadmap visibility.**

**Critical backlog:**
1. #3445: fix routing infinite loop (production blocker)
2. Review PR #3416 (feature complete, chờ merge 14 ngày)
3. Maintainer absence: fork đang chiếm userbase

**Xu hướng:** 
Dự án abandoned. Fork afjcjsbx/picoclaw sẽ thành primary maintenance line nếu sipeed không phản hồi.

---

## 💡 Nhận xét

Repo đang ở trạng thái unmaintained nguy hiểm. Issue #3445 là bug nghiêm trọng chưa được acknowledge. Community tự tổ chức fork. Nếu đánh giá ecosystem health: **đỏ - critical**.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw 2026-10-20

## 🔥 Tóm tắt hôm nay

Ngày làm việc nặng bug-fix và hardening. Core team đóng 11 PR trong 24h, tập trung vào security (approval cards), credential routing, provider migrations. Không có release mới nhưng đã list hardened image v2026.10.0.

---

## 📦 Releases

Không có release tag mới. Agent image cho v2026.10.0 được list trong #4149, chờ PR #4010 (auto-refresh workflow) merge để tự động hóa việc này.

---

## 🚀 Tiến độ dự án

### Provider ecosystem đang tái cấu trúc
- **#4104 MERGED**: Codex runtime giờ ship trong skill payload, không còn fetch từ branch `providers`. Branch đó bị lock, không nhận merge mới.
- **#4107 MERGED**: Cursor provider (từ @zvi-fried) merge vào `main`, cũng dùng pattern payload riêng.
- **#4106 MERGED**: Gateway credentials giờ scope được theo path, không chỉ host. Giải quyết case nhiều MCP service sau 1 HTTPS ingress (#4143).

→ **Xu hướng**: Provider code tách khỏi monorepo branch, đóng gói trong skill. Dễ maintain, fork không cần `providers` branch.

### Agent security & stability
- **#4136 MERGED**: Quote untrusted text trong approval cards. Ngăn agent/sender name injection.
- **#4135 MERGED**: Long approval cards post đầy đủ dưới dạng text blocks, tôn trọng per-platform block cap.
- **#4147 OPEN**: Approval cards luôn show full action, không cắt ngắm.
- **#4148 OPEN**: Refuse agent creation nếu group folder path invalid, check trước khi write hoặc ask admin.

→ Security đang được ưu tiên. Approval flow đã đi qua 3 PR hardening liên tiếp.

### CLI & operations
- **#4103 MERGED**: `ncl messaging-groups delete` giờ cascade dependent rows (wirings, sessions, DM cache).
- **#4110 MERGED**: `ncl groups delete` clear host rows, refresh destinations, lock concurrent writers.
- **#4141 MERGED**: `ask_user_question` timeout sớm nếu card delivery fail 3 lần, không đợi đủ 300s.

→ CLI operations ổn định hơn, handle foreign-key constraints đúng.

### Adapter fixes
- **#3923 MERGED**: Discord Gateway proxy support qua `NODE_USE_ENV_PROXY`.
- **#4100 OPEN**: Google Chat skill ask endpoint URL + project number để verify webhooks.
- **#4102 OPEN**: iMessage removal step 7 dùng `ncl messaging-groups delete` thay vì raw SQL.

---

## 💬 Điểm nổi bật cộng đồng

### #3529 (4 comments, open since Aug)
User @glifocat: `update-nanoclaw` skill refresh breaks local adapters. Skill refresh nghĩ mọi import trong `src/channels/index.ts` đều từ skill, nhưng không đúng. Local adapter bị validation fail hoặc overwrite, không có opt-out.

→ **Cần**: Cơ chế detect local vs skill channel, hoặc flag skip refresh.

### #3569 (2 comments, closed)
Telegram URLs với số lẻ underscores fail delivery. Chat-adapter pinned 3 version trước upstream fix (4.29.0, fix ở 4.32.0). MarkdownV2 marker escaping bug.

→ **Đã giải quyết**: Likely bumped pin.

### #4150 (mới, 0 comments)
User @mdegnandc: `ncl groups config add-mount` không thể tạo read-write mount. Handler write `readonly: true` khi pass `--ro`, nhưng omit field otherwise. Mount security code grant read-write chỉ khi explicit `readonly: false`.

→ **Bug**: Logic mismatch giữa CLI và security module.

---

## 🐛 Ổn định & Bugs

### Open bugs
1. **#4150**: Mount permissions logic sai, RW mount không tạo được.
2. **#4142**: Resend channel không send được. Null thread id fallback sang platform id mà adapter reject.
3. **#3529**: Local adapters bị skill refresh phá.
4. **#4143**: Request feature nhưng liên quan đến credential routing bug — multi-service behind 1 host cần prefix scope.

### Closed bugs (hôm nay)
- **#4130**: Codex CLI pin 0.162.1 broke ChatGPT login agents. Reverted to 0.155.1.
- **#4133**: Codex ChatGPT workspace id missing trong gateway stand-ins. Fixed.
- **#3569**: Telegram MarkdownV2 escape bug.

→ **Codex auth routing** đã stable sau 2 hotfix.

---

## ✨ Yêu cầu tính năng

### #4143 (mới)
User @chiptoe-svg: Credential connections cần support path prefix. Use case: Nhiều MCP service sau 1 HTTPS ingress, mỗi service 1 credential, mỗi group chỉ access secret của mình.

→ **Đã giải quyết**: PR #4106 merged, add `path` field vào `GatewayCredentialTarget`.

---

## 📣 Phản hồi người dùng

- **Positive**: Không có praise posts, nhưng contributor @barnuri active (Discord proxy fix, skill refresh fix PR).
- **Pain points**: 
  - Local customization bị skill update đè (#3529).
  - CLI mount logic không intuitive (#4150).
  - Adapter pin lag upstream fix (#3569).

→ **Insight**: User muốn local changes stable hơn khi chạy update commands. Cần opt-out hoặc merge detection.

---

## 🗺️ Backlog & Roadmap

### In progress
- **#3156 (30+ days open)**: Channel attachments as structured parts, không chỉ text. Lớn, touch agent-runner + providers.
- **#4094, #4095**: OneCLI 1.45 grants migration. Blocking for Dial tool + new group defaults.

### Infrastructure
- **#4010 (open)**: Auto-open agent-images.json PR khi hardened image promoted. Đã có code, chờ merge.
- **#4140 MERGED**: Refactor của #4010, giờ workflow open PR cho từng release image.

### Documentation
- **#4109 MERGED**: Docs update — provider code không còn ở `providers` branch.
- **#4145 OPEN**: CONTRIBUTING.md example fix, match với #3646 actual shipment.

→ **Next milestone**: OneCLI 1.45 migration (#4094, #4095) sẽ change default grants cho new groups. Breaking change, cần communication.

---

## 📊 Metrics

- **30 PRs trong top-comment list**: 13 merged hôm nay, 17 open.
- **5 issues open**: 2 mới hôm nay (#4150, #4142), 1 cũ critical (#3529).
- **Core team velocity**: 11 PR merged trong 24h, mostly bug-fix + hardening.
- **Community contributor**: @barnuri (2 PRs), @zvi-fried (Cursor provider).

---

**Tổng quan**: Ngày maintenance nặng. Security hardening xong approval flow, provider architecture chuyển sang skill-payload model, credential routing support complex topology. Codex auth stable sau 2 hotfix. Bugs còn lại: mount CLI, Resend channel, local adapter refresh.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 2026-10-20

## 1. Tóm tắt hôm nay

Hoạt động thấp. Một issue taxonomy phân loại lỗi benchmark officeqa (57 non-pass từ DeepSeek-V4). Một PR dependency bot nâng postcss-selector-parser trong docs. Không có release.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Issue #8143 - Daily failure taxonomy (2026-10-19)**
- Phân tích hệ thống lỗi benchmark officeqa
- 57 task không pass, chủ yếu lỗi chất lượng model từ DeepSeek-V4-Flash
- Quy trình phân loại lỗi hàng ngày → đánh giá performance model AI agent liên tục

**PR #8144 - Dependency bump**
- Bot tự động nâng postcss-selector-parser 7.1.4 → 7.1.6
- Chỉ ảnh hưởng docs/internal/architecture-video
- Bảo trì thường xuyên, không ảnh hưởng core

**Xu hướng:**
- Focus vào quality assurance qua benchmark automation
- Theo dõi lỗi model thường xuyên, không phải code bugs
- Dependency maintenance chạy tự động

## 4. Điểm nổi bật cộng đồng

Không có tương tác. Issue và PR đều 0 comment, 0 reaction. Hoạt động nội bộ team, chưa thu hút attention từ community.

## 5. Ổn định & Bugs

**Issue #8143 taxonomy cho thấy:**
- Lỗi không phải từ infrastructure hay code
- Lỗi từ model quality (DeepSeek-V4-Flash)
- System benchmark stable, phát hiện được model shortcomings

Không có bug report technical từ user.

## 6. Yêu cầu tính năng

Không có feature request mới.

## 7. Phản hồi người dùng

Không có feedback từ user trong 24h này. Hoạt động maintainer-driven.

## 8. Backlog & Roadmap

Dựa vào issue #8143:
- Tiếp tục chạy daily benchmark taxonomy
- Theo dõi performance các model backend (DeepSeek-V4, v.v.)
- Có thể điều chỉnh hoặc thay model dựa trên kết quả phân tích lỗi

Không có roadmap công khai từ dữ liệu hiện tại.

---

**Insight:** IronClaw đang ở giai đoạn testing/evaluation intensive. Focus là validate model quality qua automated benchmarks, không phải phát triển feature mới. Low community engagement cho thấy dự án có thể internal hoặc early stage.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# 📊 Báo cáo QwenPaw ngày 2026-10-20

## 🎯 Tóm tắt hôm nay

Không có release. Tập trung sửa bug nghiêm trọng: UI freeze khi đổi conversation, media trong history làm request 48MB vượt giới hạn server, channel message bị drop. 46 PR đang mở, 16 issue báo vấn đề production.

---

## 🚀 Releases

Không có.

---

## 📈 Tiến độ dự án

### PR quan trọng đang mở

**🔴 Nghiêm trọng - Performance & Data Loss**

- **#8337** (size/M): Stop gửi lại media model không cần. Request 48.9MB vượt giới hạn body → crash. Fix: chỉ gửi media trong window tương tác, xóa sau khi model xác nhận received.

- **#8327** (size/L): ACP server thoát sau khi task đã solve xong. Giữ long-running turn alive, chỉ raise RequestError với benchmark-confirmed failure class.

**🟠 UX Critical**

- **#8332** (size/XXXL): Refactor console toàn bộ - usability, responsive, state correctness, performance. Consolidate nhiều fix nhỏ thành 1 PR tích hợp.

- **#8316** (size/L): Console fail khi deploy dưới reverse proxy subpath (như `/qwenpaw/`). Thêm `VITE_CONSOLE_BASENAME` để config routing + static asset đúng.

- **#8338** (size/M): Telegram bỏ qua `reply_to_message` → agent mất context khi user quote. Feishu/WeChat đã làm đúng, Telegram chưa đọc field này.

**🟡 Feature**

- **#8318** (size/M): Command `/steer <guidance>` để điều chỉnh agent giữa turn đang chạy. Không cần stop (mất tiến trình) hay chờ (lãng phí thời gian).

- **#8187** (size/XXXL): Extract channel thành plugin với subprocess isolation. Tách channel ra khỏi main process, tăng resilience.

- **#7569** (size/XXXL): **Advisor Mode** - loop mode dùng 2 model: advisor (mạnh) + worker (rẻ). Advisor plan đầu, review, pivot nếu cần. Worker thực hiện.

### Issue đóng hôm nay

- **#8281**: `reload_agent()` không fire `workspace_created` hook → runtime hook mất. Fixed #8294.
- **#8228**: Tool output base64 trong history → 10MB+, timeout 30s. Fixed #8229.
- **#8101**: Deep link `/chat/<id>` fail cross-agent. Fixed #8209.
- **#8324**: Harness không báo token usage được. Fixed (thêm USAGE event).
- **#8323**: Harness login fail trả 500 + stack trace thay vì user-friendly message. Fixed.

---

## 🔥 Điểm nổi bật cộng đồng

**Nhiều tương tác nhất:**

1. **#8288** (3 comment): v2.2.2 UI freeze hàng chục giây khi đổi conversation, rich content (table/code block) bị render lại toàn bộ. 2.2.1 không có vấn đề này. Root cause: không phải stream event count, mà là `waitSessionReady()` block UI thread.

2. **#8313** (3 comment): QQ group message bị drop im lặng. Gateway gửi `GROUP_MESSAGE_CREATE` nhưng code chỉ biết `GROUP_AT_MESSAGE_CREATE`.

3. **#8329** (2 comment): Telegram bỏ qua reply context → agent không biết "this" là gì khi user reply "what about this?".

**Quan tâm:**
- Channel message loss (QQ, Telegram)
- Performance regression (UI freeze, oversized request)
- Deep link không hoạt động đúng

---

## 🐛 Ổn định & Bugs

### Đang xử lý

**Production blocking:**

- **UI freeze** (#8288): 2.2.2 regression. `waitSessionReady()` block 10-30s với table/code block nhiều. Cần refactor chat render lifecycle.

- **Media bloat** (#8335, #8337): Screenshot/file tool output lưu base64 → 48MB request → server reject. Đang fix: drop media sau N turn, chỉ replay trong window gần.

- **Message drop:**
  - QQ group (#8313, #8319): Thiếu handler `GROUP_MESSAGE_CREATE`
  - Telegram reply (#8329, #8338): Không đọc `reply_to_message`

**Medium severity:**

- **Context inject** (#8293, #8295): `<system-notification>` gửi tới user qua channel. Fix: strip tại display boundary.

- **Feishu proxy** (#8315): Fail 426 khi `HTTPS_PROXY` set nhưng `NO_PROXY` không có `feishu.cn`.

- **CJK emphasis** (#8133): Markdown CommonMark rule làm bold/italic CJK không hoạt động (CJK punctuation = Unicode punctuation, không có word space).

### Bug đã fix (closed PR)

- Runtime hook mất sau reload (#8281 → #8294)
- Tool output base64 bloat (#8228 → #8229)
- Deep link cross-agent fail (#8101 → #8209)
- Harness login 500 error (#8323)
- MCP 422 handshake fail (#8051)

---

## 💡 Yêu cầu tính năng

### Đang implement

- **Advisor Mode** (#7569): 2-model collaboration (advisor + worker). Advisor plan → worker execute → advisor review → pivot nếu sai hướng.

- **Channel plugin isolation** (#8187): Subprocess isolation cho channel → crash channel không crash main process.

- **Skill download cancellable** (#8285): Download skill pool blocking, không thể cancel. Đang làm thành job với progress.

- **Plugin hot reload** (#7565): Unload sạch + rollback-safe reload. Failed update không để user stuck ở half-applied version.

### Feature request mới

- **HarmonyOS plugin host** (#8311): Yêu cầu chuẩn hóa `window.QwenPaw` contract + data bridge + signature verification. Cho mobile ArkTS plugin host.

- **Offline Docker image** (#8328): Variant có Office/PDF toolchain sẵn. Default image lean, office skill download runtime → yêu cầu pre-bake cho air-gapped deploy.

- **Custom IMAP/SMTP** (#7791): Mail workflow chỉ nhận built-in provider, dù `qwenpawmail-mcp` đã support env variable. Thêm provider "custom".

---

## 💬 Phản hồi người dùng

### Phàn nàn

- **Performance regression 2.2.2**: UI freeze nghiêm trọng khi đổi conversation (#8288). Nhiều user phản ánh không thể dùng được với chat có table/code.

- **Message loss**: QQ group không nhận reply (#8313), Telegram mất context khi quote (#8329). User không hiểu tại sao bot "phớt lờ".

- **Context length exceeded**: (#8312) Model context vượt quá → task abort giữa chừng. Cần context compaction thông minh hơn.

### Tích cực

- Skill pool concept tốt, nhưng cần cancellable (#8285)
- Advisor Mode (#7569) hứa hẹn cho cost optimization
- Deep link fix (#8209) giải quyết vấn đề workflow integration

---

## 📋 Backlog & Roadmap

### Ưu tiên cao (từ issue/PR trend)

1. **Fix performance regression 2.2.2**: UI freeze (#8288), media bloat (#8335)
2. **Channel message reliability**: QQ group (#8313), Telegram reply (#8329)
3. **Context management**: Media lifecycle (#8337), context compaction (#8312)

### Đang review/merge

- Console UX refactor (#8332) - XXXL PR, cần test kỹ
- Advisor Mode (#7569) - new loop mode, impact lớn
- Channel plugin isolation (#8187) - architecture change

### Next sprint (suy đoán từ open PR)

- Hot reload plugin (#7565) - đang review lâu
- Skill cancellable download (#8285)
- CJK markdown emphasis (#8133)
- Sandbox ACL Windows (#8018)

### Tech debt

- Context compaction algorithm cần cải thiện (#8312)
- Chat render lifecycle cần refactor (UI freeze root cause)
- Media storage strategy cần thiết kế lại (base64 trong history không scale)

---

## 🎯 Nhận xét

**Dấu hiệu stress:** 16 open issue trong 1 tuần, nhiều bug nghiêm trọng production. Performance regression 2.2.2 đáng lo ngại - UI freeze hàng chục giây không chấp nhận được.

**Điểm mạnh:** Team responsive (3 issue closed trong ngày), fix đúng root cause (media lifecycle, channel event handler).

**Rủi ro:** Console refactor (#8332) quá lớn, nếu có regression thêm sẽ compound problem. Advisor Mode (#7569) feature phức tạp, cần test kỹ trước merge.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*