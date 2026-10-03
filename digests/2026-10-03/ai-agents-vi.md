# Bản tin Hệ sinh thái Hermes Agent 2026-10-03

> Issues: 61 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-03 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-03

## 📊 Tóm tắt hôm nay

Không có release mới. Dự án tập trung xử lý critical bugs: message delivery loss (#131644 - P1), Windows update failures (#128827, #124807), và Desktop boot stalls (#131934). 30 PRs mở/merged, 61 issues tracked.

## 🚀 Releases

Không có release trong 24h qua.

## 🔧 Tiến độ dự án

### Critical Fixes Merged

**Message delivery loss (#131888 - merged)**
- Fix 2 cách mất message: steering dropped khi turn kết thúc + pending events không drain sau guard release
- Combine 2 contributor PRs (#131649, #131651) + corrections
- Risk: 0.35, sweeper tagged `risk-message-delivery`

**Windows update reliability (#127406 - merged)**
- Desktop backend không chạy source-completion tail → tránh self-kill
- Follow-up của #123510
- Platform: Windows-only

### High-Priority Open PRs

**Process signaling fix (#131890 - open, P2)**
- `os.killpg` chỉ chạy khi child leads group (`pgid == proc.pid`)
- Fix orphan-MCP reaper killing unrelated processes (#43044)
- Lands #119150 by @beardthelion

**Profile export security (#126214 - open, P2)**
- Private profile paths không shareable → hardening cho remote collaboration (#97681)
- Current blacklist quá yếu (chỉ `auth.json`, `.env`)
- Risk: `security-boundary`, `compatibility`

**Gateway lock retry (#131938 - open)**
- Same-home lock conflict retryable at startup → fix gateway-down window sau `restart`
- launchd/systemd race: new gateway starts before old drains

**Slack silent hooks (#131936 - open)**
- Opt-in `mention_patterns_allow_silence` cho hook-owned wake patterns
- Direct mentions/DMs vẫn reply-required

## 🐛 Ổn định & Bugs

### P0/P1 Active

**#131644 [CLOSED] - Message loss** ✅ Fixed by #131888
- Mid-turn steering dropped khi agent/background event reply first
- 3 contributors: @halpalfery report, @dskwe + @MohamadKanso PRs

**#131851 [OPEN, P1] - FTS5 corruption after unclean container stop**
- `state.db` ~1.5GB → unclean shutdown → "Rowid out of order"
- SQLite WAL checkpoint timeout trên bind mount
- Docker + large session history

**#131934 [OPEN] - Windows Desktop boot stall 35s+**
- Credential-pool "no available entries" log storm
- Event loop blocks → 15s readiness timeout
- Repro link mới, possibly related to #119149

### P2 Hotspots

**Windows update ecosystem (#128827, #124807, #131864)**
- Orphaned `source_check` worker holds DLL → WinError 5
- Poisoned lock files → silent retry hang
- Dashboard cleanup stops unit-less serve, respawn path unreachable on win32

**Docker container reuse (#79816 - merged)**
- Cross-process reuse ignores image + mounts → silent mismatch
- Labels-only matching insufficient

**Kanban data loss (#131844 - open, P3)**
- `delete_task` orphans attachments + erases all rows on default board
- Silent loss, high severity despite P3

## 💡 Yêu cầu tính năng

**Cross-gateway Bot collaboration (#97681 - P2, 33 comments, 4 👍)**
- Foundation cho Bots work together across machines
- Personal agents, own models/tools/memory/credentials
- Next: across owners without giving up control

**Desktop Projects/Sessions separation (#91030 - P3)**
- Sidebar riêng cho Projects và Sessions
- Hiện tại: OR logic, không thấy cả 2 cùng lúc
- Independent sorting menus

**Per-tool approval policy (#95247 - open, P3)**
- `allow/ask/deny` cho từng tool (MCP, plugins)
- "Run unattended, ask before send_message" → 2-line config
- Inspired by Perplexity Computer

**Browser-hosted Desktop (#93508 - open, P3)**
- `hermes webapp` → actual Desktop renderer in browser
- Not Web Dashboard, chat-first workspace
- Authenticated, `window.hermesDesktop` backed by host

## 👥 Phản hồi người dùng

### Platform-Specific Pain Points

**Windows users** (#128827: 2 comments, #124807: 7 comments)
- Update failures recurring → `WinError 5` deleting DLLs
- Desktop boot stalls → timeout errors
- Cross-profile Docker sandbox issues (#131751)

**macOS users** (#33453: 1 comment, #131875: 0 comments)
- Gateway spams filesystem (aggressive mkdir polling)
- launchd `gateway restart` leaves gateway down (Signal lock race)

**Discord/Slack users** (#104399: 1 comment, #125736: merged)
- Slash command sync deletes then 429s → missing commands
- Native interaction restart redeliveries duplicated

### Language diversity

- Issue #36763: macOS Desktop, assistant replies duplicate ×2 + reverse order (Chinese)
- Issue #131775: Desktop renders same assistant answer twice (Chinese)
- Issue #48363: Web Dashboard black screen (Ukrainian)

### Configuration Confusion

**#118969 (P2, 3 comments)** - Fallback persists impossible provider:model pair
- `provider=xai` + `model=deepseek-v4-flash`
- Swaps model not provider → persisted to session

**#76602 (5 comments, closed)** - Auxiliary vision custom provider loses api_key
- `base_url` + custom provider → downgraded to 'no-key-required' → 401

## 📋 Backlog & Roadmap

### Session Reliability Wave (#111389 - P3, 5 comments)
- `state.db` / WAL reliability
- Landing-evidence style approach
- 12 related bugs referenced

### Security Hardening
- Shell hooks `fail_closed` fix (#102405 - merged)
- Profile export security (#126214 - open)
- Process group signaling (#131890 - open)

### Platform Expansion
- Ando platform beta plugin (#131066 - open)
- AI Chipmunk mobile app pairing (#131113 - open)
- Browser-hosted Desktop (#93508 - open)

### DX Improvements
- Codex session lifecycle (#121312, #121310, #121314 - open)
- Bedrock auxiliary request parameters (#124937 - merged)
- StepFun model picker (#41147 - merged)

---

**Xu hướng**: Stability over features. 15 bugs merged/closed hôm nay, focus Windows reliability + message delivery guarantees. Cross-platform pain points (Windows update, macOS filesystem polling, Docker cross-profile isolation) getting sustained attention.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-03

## 1. 🌍 Tổng quan hệ sinh thái

8 dự án tracked, 3 im lặng (NullClaw, IronClaw, Qwen-Paw gần như ngừng). 5 active core: **Hermes, OpenClaw, NanoBot, Zeroclaw, NanoClaw**.

**Hoạt động 24h qua:**
- 773 issues/PRs đang mở
- 1 release (OpenClaw 2026.8.35 LTS)
- 60+ PRs merged/closed
- Pattern chung: stability over features. Toàn bộ focus bug fix, performance, security hardening

**Tín hiệu chính:** Hệ sinh thái đang mature. Ít feature mới, nhiều polish + production hardening. Windows support pain điểm chung.

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity | Community |
|-------|--------|-----|----------|----------|-----------|
| **Hermes Agent** | 61 | 500 | 0 | 🔥 Cao | Medium - Windows pain focus |
| **OpenClaw** | 103 | 500 | 1 LTS | 🔥🔥 Rất cao | High - 104 comments/issue |
| **NanoBot** | 6 | 37 | 0 | ⚡ Trung bình | Low - fast turnaround |
| **Zeroclaw** | 12 | 50 | 0 | 🔥 Cao | Low - enterprise quiet |
| **NanoClaw** | 27 | 30 | 0 | ⚡ Trung bình | Medium - backlog cleanup |
| **PicoClaw** | 3 | 4 | 0 | ❄️ Thấp | Low - 17 comments max |
| **NullClaw** | 0 | 0 | 0 | ⚫ Im lặng | None |
| **IronClaw** | 0 | 0 | 0 | ⚫ Im lặng | None |
| **Qwen-Paw** | 11 | 12 | 0 | ❄️ Rất thấp | Low - 1 contributor surge |

---

## 3. 🎯 Vị thế Hermes Agent

**Positioning:** Mid-tier player, Windows reliability leader fight.

**Strengths:**
- 500 PRs active = lớn nhất ecosystem về PR volume
- Critical bug response nhanh (#131888 message loss merge 1 ngày)
- Windows + macOS dual-platform serious attention
- Discord/Slack integration mature

**Weaknesses:**
- 0 releases = không có stable milestone gần đây
- Community engagement thấp (max 33 comments vs OpenClaw 104)
- SQLite WAL unbounded growth (#143524) chưa fix 2 tháng

**Competitor gap:**
- **OpenClaw** có LTS track + 2x comment engagement
- **Zeroclaw** có subprocess memory limits, cron conversation binding (advanced features Hermes thiếu)
- **NanoBot** có faster turnaround (6h fix vs Hermes days)

**Position:** Solid #2-3. Ngang OpenClaw về scale, thua về community + release discipline.

---

## 4. 🔧 Hướng kỹ thuật chung

**Trends shared toàn ecosystem:**

### A. Database reliability (5/8 dự án)
- SQLite WAL checkpoint failures
- Session state corruption
- FTS5 rowid errors
- **Pattern:** Hermes #131851, OpenClaw #143524, NanoClaw #3811 cùng vấn đề

### B. Windows platform gaps
- DLL lock (Hermes #128827)
- Credential pool stalls (Hermes #131934)
- Update failures (Hermes #124807)
- **Note:** Zeroclaw DACL protection (#11451) đi trước

### C. Message delivery guarantees
- Steering drop mid-turn (Hermes #131644)
- Telegram album ordering (OpenClaw #163926)
- Discord routing (NanoBot #6007)
- **Insight:** Multi-channel real-time sync hard problem chưa ai solve clean

### D. Memory/resource limits
- Plugin memory leaks (OpenClaw #160548)
- Subprocess OOM (Zeroclaw #6916)
- Model catalog worker leak (OpenClaw #160548)
- **Gap:** Zeroclaw có memory watchdog (#11456), others reactive

### E. Container/Docker reuse bugs
- Image mismatch (Hermes #79816)
- Profile isolation (NanoClaw #2653)
- Cross-profile sandbox (Hermes #131751)

---

## 5. ⚡ Điểm khác biệt

### Chiến lược Release

| Dự án | Strategy | Implication |
|-------|----------|-------------|
| **OpenClaw** | Dual-track (LTS + bleeding) | Enterprise trust signal |
| **Hermes** | No release 24h | Moving fast, breaking things? |
| **Zeroclaw** | Version-free | Developer-first, not user product |
| **NanoBot** | 0.3.5 stable | Small team, slow iteration |

### Community model

**OpenClaw:** Public chaos managed - 104 comments/issue, vibrant but noisy  
**Hermes:** Controlled burn - 33 max, focused contributors  
**Zeroclaw:** Enterprise stealth - low comment, high-quality PRs  
**NanoBot:** Solo maintainer - @contributor surge then silence  

### Feature ambition

**Zeroclaw leads:**
- Web Admin hub (#11414)
- Cron conversation binding (#11441)
- Subprocess memory limits (#11456)
- Password auth provider (#11264)

**Hermes/OpenClaw follow:**
- Focus existing features stability
- No major new capabilities push

**Insight:** Zeroclaw = most product vision. Hermes = maintenance mode vibes.

### Security posture

**Mature:** Zeroclaw (DACL, credential store, approval routing)  
**Growing:** Hermes (profile export hardening #126214, process signaling #131890)  
**Weak:** NanoBot (tool registry bypass #5994 just fixed), PicoClaw (no security PRs)

---

## 6. 👥 Mức độ trưởng thành cộng đồng

### Tier 1: Production-grade
**OpenClaw** - 104 comments, Chinese + English users, LTS track = product-market fit clear

### Tier 2: Developer active
**Hermes** - 500 PRs, 33 max comments = large team, low external engagement  
**Zeroclaw** - 50 PRs, enterprise silent = B2B customers không public complain

### Tier 3: Maintenance
**NanoBot** - 1 contributor surge (7 PRs), low organic growth  
**NanoClaw** - Backlog cleanup (18 issues closed stale), not feature push  
**PicoClaw** - 17 comments max, UI lag 2.5 tháng unfixed = resource-starved

### Tier 4: Abandoned/Early
**NullClaw, IronClaw** - 0 activity  
**Qwen-Paw** - 1 contributor (@AaronZ345) + 2 first-timers = không sustain

**Maturity signals:**
- Release discipline (OpenClaw yes, others no)
- Backlog hygiene (NanoClaw cleanup, Hermes accumulate)
- Security investment (Zeroclaw leads)
- Multi-language support (OpenClaw Chinese users vocal)

---

## 7. 🔮 Tín hiệu xu hướng

### A. Consolidation incoming
3 dự án 0 activity = natural selection. Expect 2-3 survivors by Q2 2027.

**Winners likely:** OpenClaw (community + LTS), Hermes (scale + Windows), Zeroclaw (enterprise features)  
**At risk:** PicoClaw (slow), NanoBot (1-person), NanoClaw (backlog > progress)

### B. Windows = competitive moat
All major players fight Windows bugs. First to stable Windows experience wins SMB market.

**Current leader:** None. Zeroclaw security ahead, Hermes volume ahead, OpenClaw user engagement ahead. Tie.

### C. Multi-agent collaboration next frontier
- Zeroclaw cron binding (#11441)
- Hermes cross-gateway bots (#97681)
- OpenClaw agent-to-agent visibility (#59149)
- Qwen-Paw cross-instance networking (#8080)

**Insight:** Current = single-agent single-machine. Next = agent mesh networks. No one shipped.

### D. Database reliability ceiling
SQLite WAL checkpointing = shared pain. First to solve unlock long-running stability.

**Candidates:** OpenClaw session reliability wave (#111389), Hermes FTS5 corruption (#131851). Both planning, none executing.

### E. Memory/cost management critical
- OpenClaw model catalog leak 1GB/5min
- Zeroclaw subprocess OOM production
- NanoBot tool argument leak

**Gap:** No one has good observability + auto-limits. Zeroclaw memory watchdog (#11456) early attempt.

---

## 🎁 Kết luận chiến lược

**Hermes Agent position:** Solid #2-3, large team, Windows focus, no release rhythm.

**Immediate threats:**
1. OpenClaw LTS pulling enterprise users
2. Zeroclaw feature velocity (admin hub, cron, memory limits)
3. Windows reliability race with no clear winner

**Opportunities:**
1. Ship Windows stability first = SMB wedge
2. Release discipline = trust signal OpenClaw has, Hermes lacks
3. Multi-agent mesh = greenfield, race open

**Recommendation:** Stop accumulating PRs. Cut release. Fix SQLite WAL. Then push multi-agent.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw ngày 2026-10-03

## 🎯 Tóm tắt hôm nay

OpenClaw release **2026.8.35** (extended-stable/LTS) với GPT-6.1 Sol support + security/reliability fixes. Main codebase đang thực hiện massive refactoring batch: state storage deslop, gateway method simplification, plugin lifecycle cleanup. Activity cao: 163xxx issue series (9.7 regression + performance degradation), 30+ PR active merge queue.

## 📦 Release v2026.8.35

**Phát hành:** 2026-10-02  
**Loại:** Extended-stable (≈ LTS), gateway-only

**Tính năng chính:**
- GPT-6.1 Sol model support (OpenAI routing + discovery)
- Backport critical security patches từ 2026.9.x
- Reliability/performance fixes từ August baseline

**Ý nghĩa:** Stable track cho production users không muốn bleeding-edge 2026.9.x. Latest bleeding là 2026.9.7.

---

## 🚀 Tiến độ dự án

### PRs nổi bật (merge queue)

**Performance/Architecture:**
- #163945 **[XL]** State/memory storage deslop — remove one-use adapters, pre-July schema importers
- #163941 **[L]** `sessions.list` serve from incremental order, không rebuild sorted pages mỗi filter change
- #163910 **[XL]** Gateway methods deslop — validation/error plumbing dedup
- #163815 **[L]** Session lifecycle mutations off main thread, named diagnostics
- #163818 **[XL]** Plugins admit at load, delete per-value boundary (streaming allocation pressure fix)

**Critical fixes:**
- #163926 **[L, P1]** Telegram back-to-back photo albums replay/out-of-order when agent busy
- #163880 **[L, P1]** Voice relays disconnect/stall between replies (talk mode)
- #163471 **[XL, P1]** Internal runtime context appearing in replies — single model-facing owner refactor
- #163900 **[P1]** Memory-core budget compaction never removes "Consolidated Memory" sections → MEMORY.md stalls when full
- #163853 **[XL, P2]** Local state mutations route through live Gateway owner (worktrees conflict fix)

**Infrastructure:**
- #149725 **[XL, P2]** macOS app use shared Rust Gateway client + node runtime (RFC #54)
- #163167 **[XL, P2]** Retire pre-July delivery queue files (doctor + updater detection)

### Issues xu hướng

**163xxx series (2026.9.7 regressions):**
- #163566 — Durable context-engine stuck 'session-rebound', 100s CPU/turn after update repair
- #163466 — Auto-compaction hangs 2.5h (past 180s timeout), fails with session_writer_claim_changed
- #163748 — Production session-write latency persists on 9.7 (queue waits + slow execution)
- #163638 — **[P0]** 9.5→9.7 update: doctor fails on own offline-maintenance lock, agent DBs unmigrated

**Performance critical:**
- #160548 — Prepared-model-catalog worker leaks ~1GB/5min, reclamation kills waiting turns
- #157989 — Plugin source capture rewrites 1.1–1.4GB/CLI command (no reuse, native binaries) — severe SSD wear
- #158390 — **[P0]** plugin-captures tmp dirs not GC'd, disk fills indefinitely

---

## 💬 Điểm nổi bật cộng đồng

**Hot issues (comment count):**

1. **#143524** [104 comments, P0] — Agent SQLite WAL grows 1.4–2.8GB despite `wal_autocheckpoint=1000`, blocks gateway startup (Windows)
2. **#144911** [31 comments, P1] — MCP server init timeout crashes Gateway (unhandled rejection in child cleanup)
3. **#97616** [17 comments, P1] — OpenClaw leaks unreaped hook/tool child processes → zombie accumulation

**Tương tác cao:**
- **#67413** [👍5, 12 comments] — Feature: Per-agent dreaming config (memory spikes when all agents dream simultaneously)
- **#103198** [👍3, 8 comments] — WebChat image attachments get "image_0" instead of real media store path

**Chinese user report:**
- **#107609** [👍2, 4 comments] — Gateway tool output renders as images after 2 weeks runtime, clearing `~/.openclaw/cache/` fixes

---

## 🐛 Ổn định & Bugs

### Critical (P0/P1)

**Database/Storage:**
- SQLite WAL unbounded growth (#143524) — checkpointing not working
- Session-write latency on 9.7 (#163748) — affects production traffic
- Context-engine CPU burn after repair (#163566)
- Plugin tmp dir leak filling disk (#158390)

**Session stability:**
- Auto-compaction 2.5h hangs (#163466)
- Telegram album replay/ordering (#163926)
- Voice relay disconnect (#163880)

**Update/Migration:**
- 9.5→9.7 update leaves DBs unmigrated (#163638)
- Managed npm plugin fails when npm root is symlink (#161833)

### Regression pattern

2026.9.5+ introduced multiple performance/stability issues:
- Session SQLite receipt identity unstable across VM reboots (#163870)
- Subagent completion-delivery drops text silently (#154299)
- Prepared-model-catalog worker memory leak (#160548)

---

## ✨ Yêu cầu tính năng

**Automation/Management:**
- #144306 [P3] — Automations deliver to paired node → scheduled results reach app as notifications
- #139586 [P2] — Extend automation management to native macOS + Talk admin turns

**Memory/Search:**
- #129884 [P3] — Opt-in path excludes / bounded path-authority weights (dreaming phase reports outrank canonical records)
- #119361 [P3] — Windows Logbook screen capture support (macOS-only hiện tại)

**UI/UX:**
- #70266 [P3] — Use assistant avatar in macOS Talk Mode overlay
- #163739 → #163943 — Settings toggle disable direct Archive shortcut (conflict với browser shortcuts)

**Access control:**
- #59149 [P2] — Per-agent `agentToAgent` + session visibility scoping (hiện tại global-only)

---

## 💭 Phản hồi người dùng

**Positive:**
- Extended-stable 2026.8.35 track cho production stability (vs bleeding 9.x)
- Windows/Chinese market users active reporting (#107609, #143524)

**Pain points:**

1. **Update reliability:**
   - 9.5→9.7 update failures (#163638)
   - Post-update performance degradation (#163566, #163748)

2. **Resource management:**
   - Memory leaks (model catalog #160548, embedding fallback #96534)
   - Disk usage (plugin captures #158390, #157989 SSD wear)
   - CPU spikes (gateway main thread #119440, session-resource-loader #163566)

3. **Long-running stability:**
   - SQLite WAL growth (#143524)
   - Zombie process accumulation (#97616)
   - UI state drift (#119075 — tool activity missing until refresh)

4. **Windows-specific:**
   - LF-only line endings break CMD scripts (#119484)
   - Concurrent MCP memory amplification with Codex native hooks (#119565)

---

## 📋 Backlog & Roadmap

### Active work (merge queue)

**Q4 2026 focus (inferred from PR activity):**

1. **Performance optimization:**
   - State storage simplification (#163945, #163910)
   - Session lifecycle off main thread (#163815)
   - Plugin admission refactor (#163818)

2. **Stability:**
   - Session write latency (#163748 investigation)
   - Memory leak fixes (model catalog, embedding fallback)
   - Update/migration reliability

3. **Platform parity:**
   - macOS shared Rust runtime (#149725)
   - Windows screen capture support (#119361)

### Blocked/需要 product decision

- Per-agent dreaming config (#67413)
- Per-agent auth scoping (#59149)
- Automation delivery to paired nodes (#144306)
- Memory search ranking tuning (#129884)

### Technical debt cleanup

- Pre-July storage format retirement (#163167)
- Gateway method consolidation (#163910)
- State/memory storage deslop (#163945)

**Release cadence:** Extended-stable (8.x) + bleeding (9.x) dual tracks, monthly cadence.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot (HKUDS/nanobot) - 2026-10-03

## 📊 Tóm tắt

24 giờ qua team merge 7 PR, đóng 2 issue. Tập trung fix lỗi quan trọng: cron mất data khi save fail, reasoning model khiến mọi provider bị drop temperature, sidebar WebUI bị xóa trắng khi fetch lỗi. Opper gateway provider đang review cuối. Không có release mới.

## 🚀 Releases

Không có release. Version hiện tại vẫn là v0.3.5.

## 📈 Tiến độ dự án

**7 PR merged hôm nay:**

- **#5933** - Cron service mất pending action khi save store fail (ENOSPC). Fix: save store trước, clear action.jsonl sau. Priority P0.
- **#5995** - Agent báo failed run dù thực tế recover thành công. Root cause: assign stop_reason/error trước khi check late follow-up message.
- **#5997** - Linear member access update có thể re-enable member bị revoke. Race condition giữa stale API response và reauthorization.
- **#5994** - Empty tool registry (`tools=ToolRegistry()`) bị override lại default tools. Security issue vì `write_file` chạy dù đã bị cấm.
- **#5918** - Tool argument coercion chuyển `"00123"` thành `123` và reject `"doc-A"` dù JSON Schema type array `["integer", "string"]` cho phép cả hai. Fix: preserve valid union.
- **#5990** - WebUI streaming Markdown split TeX formula `\[...\]` thành Setext heading khi gặp `=` hoặc blank line. Marked chạy trước remark math plugin.
- **#5957** - Exec session hard timeout không enforce nếu command exit trước poll. Polling gap khiến timeout command báo success.

**30 PR đang open, nhiều PR fix quan trọng:**

- **#6005** - `reasoningEffort` drop temperature cho **mọi** openai_compat provider, không chỉ o1/o3/o4. 38/46 provider bị ảnh hưởng. Fix: check model name trước khi drop temperature.
- **#6009** - Sidebar state bị wipe nếu initial fetch fail. User mutation sau đó gửi lên backend nhưng state local đã mất. Fix: readonly mode cho đến khi fetch thành công.
- **#6001** - `sendProgress=true` không gửi gì cả. Tool contract template không generate progress text. Fix: authorize progress text trong template.
- **#6007** - QQ quoted message không reach agent. botpy không parse `msg_elements` và `message_scene.ext`. Fix: extract quoted text từ raw payload.
- **#5845** - Add Opper gateway provider. Đang review, chưa merge.

**Bug pattern:** Nhiều edge case trong error handling, race condition, type validation. Team focus stability hơn feature mới.

## 🔥 Điểm nổi bật cộng đồng

- **#6002** (0 👍, 1 comment) - Report reasoning effort bug ảnh hưởng 38 provider. User phát hiện sớm, team fix nhanh trong #6005.
- **#6008** (0 👍, 0 comment) - Report sidebar wipe bug. Team fix trong 6 giờ (#6009). Fast turnaround.
- **#5898** (0 👍, 4 comment) - GPT-6 qua GitHub Copilot không work. Issue open 9 ngày chưa fix. Suggest v0.3.5 compatibility problem.

## 🐛 Ổn định & Bugs

**Critical fixes hôm nay:**

- Cron service data loss (P0) - **fixed**
- Empty tool registry bypass (security) - **fixed**  
- Linear member access race condition (security) - **fixed**
- Agent false failure report (regression) - **fixed**

**Open bugs:**

- GPT-6 GitHub Copilot không support (#5898)
- QQ quoted message lost (#6006) - PR #6007 đang fix
- Sidebar wipe (#6008) - PR #6009 đang fix
- Reasoning effort drop temperature cho mọi provider (#6002) - PR #6005 đang fix
- SendProgress không hoạt động (#6000) - PR #6001 đang fix

**Trend:** Nhiều regression fix. Suggest test coverage chưa đủ cho edge case.

## ✨ Yêu cầu tính năng

- **#5845** - Opper gateway provider. Gateway thứ 3 sau Eden AI và OrcaRouter. Draft ready, đang test.

Không có feature request mới hôm nay. Team priority fix bugs.

## 💬 Phản hồi người dùng

**Positive:**
- Fast response cho sidebar bug (#6008 → #6009 trong 6 giờ)
- Security-conscious fixes (tool registry bypass, Linear race condition)

**Pain points:**
- GPT-6 Copilot issue open 9 ngày chưa fix
- Many regression bugs suggest stability concern
- QQ quoted message, sendProgress không work ảnh hưởng UX

**Language usage:** Team có contributor viết tiếng Trung (PR #5926, #5965, #5927, #5928, #5931), suggest China market presence.

## 🗓️ Backlog & Roadmap

Không có roadmap update.

**Backlog pattern từ open PRs:**

- **12 bug fixes** đang review (tool validation, channel handling, webui issues)
- **1 new provider** (Opper) - last gateway addition
- **Test coverage expansion** - nhiều PR có regression test mới

Priority: stability > features. Suggest team ở maintenance mode, không push major feature mới.

**Technical debt visible:**
- Tool argument validation (3 PRs: #5918, #5965, #5927)
- Markdown/streaming handling (2 PRs: #5990, #6001)
- Channel message parsing (3 PRs: #5931, #5960, #6007)

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-03

## Tóm tắt hôm nay

50 PRs mở, không có releases. Tập trung: shell subprocess memory limits (#11456), Windows security improvements (#11451), cron conversation binding (#11441), web Admin hub (#11414). ZeroCode UX tiếp tục được polish.

## Releases

Không có releases.

## Tiến độ dự án

**Security & Resource Control (P1/High-Risk)**
- #11456: subprocess memory watchdog opt-in - đo resident memory + descendants, kill vượt threshold
- #11451: Windows key file protection - DACL chặn read ngoài process owner
- #11469: null device cross-platform (`/dev/null` vs `nul`)
- #11455: gateway dashboard reads dùng opened handles, không reopen path

**Cron Conversation Binding (RFC #6954)**
- #11441: bind cron main jobs vào conversation tạo chúng (fix #6105)
- #11438: conversation owner port + channel binding contract

**Identity & Auth (P2)**
- #11265: `zeroclaw user` CLI - tạo admin đầu, rotate password, password recovery
- #11264: roster password verification provider
- #11313: `config set/patch` publish authorization edits live vào daemon (release-gate)

**ZeroCode UX**
- #11219: local sessions start ở launch directory (#11387 regression)
- #11457: F5 refresh session không cancel
- #11460: rename provider aliases trong Config
- #11446: inspect foreground subagent tasks
- #11445: giữ ACP recovery notices trong history

**Web Admin Hub (#11414)**
- Home: agents, running work, spend, health, sessions, SOPs
- focused workspaces, operator UX improvements

**Channels & Provider**
- #11464: model fallback notices (off/redacted/detailed)
- #11468: Ollama/llama.cpp honor thinking controls
- #11467: opt-in single-tool provider rounds (stacked on #11448)

**Tools**
- #11463: `file_write` report absent/existing + old size (#10294 fix)
- #11461: `sessions_send` clarify append semantics
- #11465: tool cooperative cancellation context
- #11462: independent delegate approvals route tới target operator

**Infra**
- #11437: Alpine ARM64 Docker build 32GB memory
- #11272: embed dashboard trong Linux/Windows desktop kernels
- #11471: preserve `CONTAINER_HOST`/`DOCKER_HOST` sau sanitization
- #11431: close chat sockets khi gateway reload

## Điểm nổi bật cộng đồng

Không có PRs nào có metrics bình luận trong data (hiển thị `undefined`). Issues quan trọng:

- #11387 (5 comments): regression #10609 - zerocode ignore launch dir
- #6916 (4 comments): subprocess memory limits - production OOM
- #5836 (3 comments): cooperative tool cancellation contract
- #7743 (3 comments): approval forwarding cho delegate handoffs

Contributor nổi bật: @Audacity88 (22 PRs), @JordanTheJet (5 PRs), @IftekharUddin (3 PRs), @mov-xound-glitch (3 PRs).

## Ổn định & Bugs

**Release-Gate (P1)**
- #11387: zerocode launch directory regression
- #11313: config edits không publish live tới daemon

**High-Risk Bugs**
- #11451: Windows key files không protected khi tạo
- #11455: gateway đọc dashboard qua path thay vì file handle
- #11272: Linux/Windows desktop kernel thiếu embedded dashboard
- #6916: subprocess OOM container (production impact)

**Medium-Risk**
- #11469: null device platform mismatch
- #11471: Docker environment lost sau sanitization
- #11463: file_write không phân biệt create/overwrite
- #10700: cost tracking session_id daemon-lifetime (không tách conversation)
- #11445: ACP recovery notices mất trong history

## Yêu cầu tính năng

**Security & Control**
- #11456: subprocess memory limits (opt-in, MiB-based)
- #11264+#11265: password auth provider + CLI
- #11462: delegate approval routing

**Cron & Lifecycle**
- #11441: bind cron jobs tới conversation origin
- #5836: tool cooperative cancellation
- #11465: cancellation context exposed cho tools

**ZeroCode**
- #11457: refresh session không cancel
- #11460: rename provider aliases
- #11446: inspect subagent tasks
- #10739: extract layout cache ownership
- #10695: refresh sessions changed by other clients

**Channels & Providers**
- #11464: model fallback notices (3 modes)
- #11467: single-tool provider rounds
- #7883: intra-family fallback notices

**Architecture**
- #11466: per-target application results
- #11438: conversation binding port

## Phản hồi người dùng

Issues mở cũ (P2, in-progress):
- #7468: rename non-agent aliases (icebox)
- #7883: expose fallback notices (parking-lot)
- #10293: sessions_send lifecycle semantics unclear

User pain points:
- Launch directory regressions (10609 → 11387)
- Cost tracking không tách conversation
- file_write transcript không đủ info
- Subprocess OOM production

## Backlog & Roadmap

**Stacked PRs chờ merge**
- #11467 → #11448 (runtime placement approval)
- #11466 → #10911 (per-target results)
- #11441 → #11438 (cron binding)
- #11265 → #11264 (user CLI → password provider)
- #11465 → #11298 (cancellation → tool context)

**Architecture decisions**
- #11448: single-tool rounds Core Team approval
- #11440: cron holding-crate exception
- RFC #6954: conversation binding (slice 2a+2b active)

**Pending fixes**
- #11313 needs merge (release-gate)
- #11219 needs merge (v0.8.6 target)
- #11272 needs merge (v0.9.0 desktop embed)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-10-03

## 1. 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động chủ yếu quanh việc dọn dẹp backlog: đóng 2 PR cũ không còn liên quan, xử lý issue về CLA bot, và nhận feature request mới về reverse proxy support.

## 2. 🚀 Releases

Không có release trong 24h qua.

## 3. 📈 Tiến độ dự án

**PR đang mở:**
- **#3393** - Thêm Cheaper Inference provider (OpenAI-compatible gateway, giá rẻ hơn 15-60%). Chưa có review.
- **#3381** - Migrate OpenAI provider sang Responses API. Bị CLA bot block (#3392). Contributor đã ký CLA nhưng bot không detect được.

**PR đã đóng:**
- **#3368** - Docs về Parallel Search MCP setup. Đã đóng 2026-10-02.
- **#1544** - Merge fix cũ từ tháng 3. Đã đóng 2026-10-02.

**Xu hướng:** Dự án đang dọn backlog cũ, đóng PR không còn relevant. Tập trung vào provider mới và API migration.

## 4. 💬 Điểm nổi bật cộng đồng

**Issue #3281** (17 bình luận, 2 👍) - Web UI input laggy khi chat history dài. Open từ 21/07, vẫn chưa fix. Người dùng phàn nàn trải nghiệm xấu khi session dài.

Issue #3415 mới nhất (02/10) về reverse proxy support - nhu cầu thực tế từ deployment production.

## 5. 🐛 Ổn định & Bugs

**#3281** - Performance issue nghiêm trọng: Input lag khi history dài. Ảnh hưởng UX, chưa có fix sau 2.5 tháng.

**#3392** - CLA bot bị lỗi, không detect signature. Block PR #3381. Vấn đề tooling, không phải code.

## 6. ✨ Yêu cầu tính năng

**#3415** - Reverse proxy support với base path custom (ví dụ `/pico`). User muốn:
- Mount Web Console vào subdirectory qua Nginx
- Tất cả endpoint (API, WebSocket, static files) hoạt động đúng dưới prefix
- Thêm launch parameter `-base-path` hoặc env var

Use case hợp lý cho deployment multi-service trên cùng domain.

## 7. 👥 Phản hồi người dùng

Người dùng @xpader báo cáo chi tiết về UI lag (#3281), có video demo và reproduction steps rõ ràng. Community engaged (17 comments) nhưng chưa thấy maintainer response hoặc timeline fix.

User @altman08 đưa feature request kỹ thuật (#3415) với context deployment thực tế, yêu cầu cụ thể và đề xuất solution.

## 8. 🗺️ Backlog & Roadmap

**Backlog cần xử lý:**
- Performance regression #3281 (priority cao - UX critical)
- CLA bot fix #3392 (blocker cho contributor)
- Reverse proxy support #3415 (feature request mới)

**Provider expansion:**
- Cheaper Inference integration #3393 đợi review
- OpenAI Responses API migration #3381 blocked

**Observation:** Dự án có technical debt (old PRs merge vào hôm nay). Performance issue tồn đọng lâu chưa được ưu tiên. Không thấy public roadmap hoặc milestone planning.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-03

## 📊 Tóm tắt hôm nay

Ngày 2/10 đóng 18 issues và 4 PRs - chủ yếu cleanup backlog cũ từ tháng 3-5. Core team push 16 PRs liên quan stability: fix update system, container security, và multi-channel delivery. 4 bugs nghiêm trọng mới (update rollback xóa data, Discord message routing, compaction crash).

## 🚀 Releases

Không có release mới trong 24h qua.

## ⚙️ Tiến độ dự án

**Channels branch sắp merge** (#4000, #3995)
- Sync 463 commits từ main → channels  
- Fix load tất cả adapters (Telegram, WhatsApp, Discord, Teams, Matrix, Slack)
- Blocker cuối: #3785 (Slack extractRawText missing), #4002 (Discord reactions fail)

**Update system overhaul** (5 PRs open)
- #3986: Release channels (stable/beta tags thay vì main tip)
- #3988: Refresh gateway khi skill payload đổi
- #3980: Detect agent failure thay vì score làm "ok"  
- #3997: Auto-commit skill files để fresh install có thể update
- #4001: Mirror pnpm patches trong test

**Security hardening**
- #3985: Proxy credentials ra khỏi systemd unit files (0644 → credential store)
- #3998: Trust gateway CA trong Chromium (fix HTTPS qua TLS-inspecting proxy)
- #3881: Iron Proxy auto-approve rules cho tool skills

## 🔥 Điểm nổi bật cộng đồng

**Top reactions**
- #2437 👍7: Remove OneCLI dependency - "detracts from lightweight billing"
- Đóng 18 issues cũ → backlog cleanup, không phải user pressure

**User pain points addressed**
- #2653: Multi-user trên single host (shared Mac, riêng Telegram bot mỗi người)
- #2638: WhatsApp 1-on-1 engage_mode=mention lỗi (engage mọi message kể cả human-to-human)
- #2590: Node dependency hell trên Ubuntu

## 🐛 Ổn định & Bugs

**Critical mới report (2/10)**
- #4003: Update rollback xóa nửa `data/` folder, EACCES permission → host down
- #4004: Cutover crash khi bump tsx/esbuild → rollback triggered #4003
- #4002: Discord reject reactions/edits vì reuse namespaced message id
- #3984: PreCompact hook fail - `getAllDestinations()` không có mailbox

**Fixed hôm nay**
- #3969: Iron Proxy send Basic challenge với 407 (git fetch qua proxy work)
- #3994: Show Claude SDK failure notice thay vì generic "run failed"
- #3992: Restart timestamp colorized → "Invalid restart time" (#3860)

**In progress**
- #3811: Central DB no busy_timeout → lock contention throw như corruption
- #3951: `ncl tasks delete` trên Linux leave root-owned mount points
- #3732: Transcript rotation không chạy cho long-running scheduled tasks

## 💡 Yêu cầu tính năng

**Open proposals**
- #3538: Isolated containers làm household edge workers (dùng idle NAS/laptops thay vì cloud)
- #3881: Iron Proxy per-host auto-approval (tool skills gọi allowed host không cần card/request)
- #2388: `bin/ncl mounts init` để bootstrap mount-allowlist.json

**Merged/closing**
- Multi-user support (#2653) → closed nhưng chưa có PR
- B-01 Interrupted-run detection (#2173) → closed, likely shipped

## 💬 Phản hồi người dùng

**Setup friction**
- OneCLI dependency tranh cãi (#2437) - muốn remove
- Node 26 pass check nhưng better-sqlite3 không build (#3359)
- Telemetry không opt-in (#1819) - PostHog fire không notice

**Documentation gaps**  
- Env var sync docs sai (#1573)
- Multi-Gmail setup không documented (#2195)
- Mount security template không exposed qua CLI (#2388)

## 📋 Backlog & Roadmap

**Đang làm (inferred từ PR activity)**
1. Channels merge → main (final blockers: #3785, #4002)
2. Update system stabilization (#3986, #3988, #3997, #4001)
3. Container security hardening (#3985, #3998, #3881)
4. Fix data loss bugs (#4003, #4004)

**Blocked/stalled**
- Dependabot setup (#3978, #4007) - draft, chưa merge
- WhatsApp @mentions (#385) - blocked 7 tháng
- Node 24 base image (#3996) - open, chưa reviewed

**Technical debt visible**
- Central DB busy_timeout (#3811)
- Transcript rotation logic (#3732)  
- Session cleanup trên Linux (#3951)
- Nested toJSON redaction (#3983)

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

# Báo cáo QwenPaw ngày 2026-10-03

## 📊 Tóm tắt hôm nay

Hoạt động tập trung vào cải thiện mobile UX và khắc phục bug im lặng. 6 PR đóng (tất cả từ @AaronZ345), 5 PR mới (2 first-time contributor). 1 issue mới về tính năng cross-agent. Không có release.

## 🚀 Tiến độ dự án

### PR đóng (6 mục - tất cả size/S-M)
- **#7347**: Fix caret biến mất khi rich input dài
- **#6877**: Desktop nhớ vị trí/kích thước cửa sổ (Tauri plugin)
- **#7356**: Chat scroll lock - đọc nội dung cũ khi stream
- **#7357**: Ẩn/hiện tool call cards
- **#7359**: Per-media caps (image/video/audio) cho từng provider
- **#6874**: MCP tool timeout config (mặc định 300s)
- **#7344**: Syntax highlight C#/shader cho game dev

Tất cả PR trên từ 1 contributor (@AaronZ345), đóng cùng lúc sau 1-2 tháng chờ review.

### PR mở mới (5 mục)

**#8086** [mobile] - Settings vào drawer ở màn hình ≤768px  
Contributor: @LeafS825 (first-time)  
Lý do: Navigation chiếm 48vh, nội dung bị ép vào nửa dưới

**#8084** [L] - Xử lý prompt quá dài + model reply rỗng  
Tác giả: @LUOSENGWA  
Vấn đề: Prompt 196,602 token vs window 196,608 → provider trả `completion_tokens=0`, không lỗi, không output, room im lặng

**#8079** [M] - Hủy run khi reload timeout  
Tác giả: @LUOSENGWA  
Vấn đề: Config reload giữ instance cũ 24h, hết timeout gọi `stop(final=False)` nhưng không thông báo room

**#8083** [S] - Tool `view_audio` cho audio understanding  
Contributor: @shuziP (first-time)  
Lý do: Đã có `view_image`/`view_video`, thiếu audio. Agent phải dùng speech_to_text rồi summarize (vòng vèo)

**#7936** [first-time] - Dịch `channels.username` sang zh  
Contributor: @lihongyuan99  
Vấn đề: Duy nhất key trong namespace `channels` không có bản zh

## 🔥 Điểm nổi bật cộng đồng

**#6281** - Yêu cầu Web console responsive mobile (6 comments, mở từ 2026-07-20)  
Người dùng muốn điều khiển từ thiết bị di động. PR #8086 giải quyết phần settings.

**#7997** - Message retraction/editing + workspace rollback (8 comments)  
User muốn edit/xóa tin đã gửi, tự động cắt lịch sử sau đó, rollback file snapshot. Chưa có PR.

**#2975** - Render user input thành Markdown (4 comments, mở từ 2026-04-06)  
Hiện chỉ AI reply render Markdown, user input là plain text → khó đọc khi paste code/list.

## 🐛 Ổn định & Bugs

**#8073** - V2.2.2.beta4 không mở được conversation page  
Chỉ xảy ra khi thiết bị LAN khác truy cập localhost service. Chưa khắc phục.

**#8077** - Qoder third-party agent: custom model vô hình (3 lỗi)  
1. `harnesses.py` drop backend info
2. Custom model không vào dropdown
3. Context meter ẩn với third-party backend

**#8078** - `chat_with_agent` tạo chat riêng, 1 session bị tách thành nhiều page trong UI

**#8085** - `finish_reason="length"` bị drop khi output bị cắt  
User không phân biệt được "câu trả lời đầy đủ" hay "bị cắt giữa chừng"

## 💡 Yêu cầu tính năng

**#8087** - Hiển thị agent name + model provider/name ở reply bot Feishu  
OpenClaw đã làm, QwenPaw chưa.

**#8081** - Tool `view_audio` cho audio understanding  
Đã có PR #8083.

**#8080** - Cross-instance agent communication (ambitious)  
Tác giả: @liunux4odoo  
Yêu cầu:
- Auto-discovery agent trên nhiều máy
- Task delegation qua network
- Knowledge/memory sharing
- Decentralized multi-instance collaboration

Hiện tất cả multi-agent chỉ chạy trong 1 instance (cùng `WORKING_DIR`).

## 📝 Phản hồi người dùng

**#8082** - Doc thiếu heartbeat runtime semantics  
Tác giả: @LUOSENGWA  
Doc chỉ ghi config (enabled/every/target/timeout/activeHours), không giải thích 5 hành vi runtime:
1. Silence semantics - khi nào heartbeat im lặng
2. Concurrency - heartbeat chạy song song với run như thế nào
3. AGENTS.md heartbeat section thiếu
4. User không biết heartbeat có cancel run không
5. Không rõ activeHours áp dụng timezone nào

## 🗺️ Backlog & Roadmap

Từ issues còn mở:
- Mobile responsive (UI/UX)
- Message editing/retraction + workspace rollback
- User input Markdown render
- Cross-instance agent networking (dài hạn)

Xu hướng: UX polish (mobile, chat controls, visibility toggles) + reliability (timeout, error surfacing, empty-reply handling).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*