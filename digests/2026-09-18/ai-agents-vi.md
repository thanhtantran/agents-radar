# Bản tin Hệ sinh thái Hermes Agent 2026-09-18

> Issues: 108 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-18 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-18

## 📊 Tóm tắt hôm nay

Hermes Agent tập trung xử lý stability bugs: session state corruption, credential leaks giữa providers, plugin lifecycle crashes. Team đang đẩy mạnh community plugin catalog với auto-install cho memory providers đã rời core. Hai pull requests chính fix desktop timeline navigation và async delegation stalls.

## 🚀 Releases

Không có release trong 24h qua.

## 🔧 Tiến độ dự án

### PRs quan trọng (merge-ready)

**#114570** - Desktop timeline jump giờ giữ backward reach  
Timeline rail click vào prompt cũ load page nhưng scroll lùi dừng ở đó. Fix: keep `pageBackwardReach` per open window. Closes #52816, #113714.

**#114569** - Memory provider auto-install từ catalog  
Memory provider rời core → auto-install từ catalog khi user config dùng provider đó. Config/data/tools giữ nguyên. Groundwork cho Hindsight/Mnemosyne về maintainer repos.

**#114568** - Kanban attachment blobs bảo toàn  
Xóa attachment không unlink blob nếu row khác vẫn reference `stored_path` đó. Trước đây xóa 1 mất cả 2.

**#93508** - `hermes webapp` serve Desktop trong browser  
Authenticated browser mode chạy Desktop renderer thật (không phải Web Dashboard). Backend bridge cho `window.hermesDesktop`. Profile-scoped startup.

### Session state fixes

**#114456** (P0) - Async delegation notice chờ 24 phút  
Delegation result ready 20:00:36, session process 20:24:43. Hai bugs:  
1. `/stop` không drain pending queue  
2. Mid-history insertion bust prompt cache  

**#104303** - Turn lease stuck khi stream fail với `ReadError`  
Provider stream die trước `stream_opened=true` → lease never released → session lockout. Cần release-on-exception.

**#109824** - WAL inode conflict + MCP restart crash  
Cron writer tạo competing WAL generation mỗi 30 phút. `_refresh_tools` crash on `None` session trong MCP restart.

### Auth & credential bugs

**#109440** - CLI gửi alias API key sang default provider host  
`hermes chat -q -m <alias>` resolve model + key OK nhưng drop `base_url` → key leak sang OpenRouter. Reproduced v0.21.2.

**#108039** - Callable credentials bị string-convert khi switch provider  
Claude → Azure/OpenAI convert Entra token provider thành string → Azure 401. Need preserve callable across switches.

**#88670** - `last_auth_error` không clear sau successful re-auth  
6 writes, 0 deletes → `relogin_required: true` stay forever. Clear on success + refresh.

### Platform adapter fixes

**#114396** - Telegram split replies truncated/duplicated  
3 bugs cùng root: assume `send()` atomic + unordered OK:  
1. Split logic không track partial sends  
2. Concurrent sends 1 chat race  
3. Error hide partial delivery  

**#113524** - Slack native stream sealed server-side ~5min  
Next `chat.appendStream` fail `message_not_in_streaming_state`. Adapter return error → session halt. Fix: reopen card on seal.

**#114561** - Discord clarify body text + thread auto-archive  
Clarify options hết vào button label → truncate. Fix: body text + button numbers. Thread auto-archive default 24h.

## 🐛 Ổn định & Bugs

### P0/P1 đang active

1. **#114456** - Delegation notice stall 24min (async queue + cache bust)
2. **#104303** - Turn lease stuck on stream `ReadError`
3. **#109824** - WAL inode conflict từ cron writer
4. **#109440** - Cross-origin credential leak `-m alias`

### Plugin crashes

**#107288** - Desktop runtime plugins fail "Cannot convert undefined to object"  
Module cycle từ #107212 refactor. Bundled plugins OK, disk plugins break.

**#107312** - Plugin SDK `Object.keys(undefined)` v0.21.1  
Runtime plugins + right-sidebar toggle stuck. SDK init crashes all user plugins.

### Tool/streaming issues

**#114484** - `tool_call` batch từ model bị reject với "non-empty array"  
Model emit `calls` as JSON string thay vì array → validator reject → retry loop. GLM-family observed.

**#114395** - ACP tool calls stuck `in_progress`  
Turn's last tools + blocked calls never reach terminal status. `build_tool_complete` never called.

**#89896** - Desktop auto-speak race sau 63565fa26  
Commit đổi failure mode, không fix: double/truncate/skip. Windows specific.

## ✨ Yêu cầu tính năng

**#111237** - Self-tuning harness: opt-in evolver loop  
Overnight replay failure traces against scaffold tweaks, keep statistical winners. Demand side cho supply-side bets (#111189, #111200).

**#91713** - Per-session token budget (abort/warn)  
18.7M tokens/5h từ stuck loop. Request: session-level budget cap + breach policy.

**#106429** - `/archive` từ chat + CLI `unarchive`  
Archive current session từ any surface. Restore từ CLI. Factory Droid v0.209 inspired.

**#109455** - Voice context trusted per-turn  
Agent không biết turn từ voice mode. Cần different delivery cho voice (brevity, no markdown).

**#113850** - Jev cho System-One computer use  
Use Jev (TypeSafe System One) làm cheap backend cho bounded computer-use decisions. Optional, không replace planner.

## 👥 Phản hồi người dùng

### Pain points

**#113683** - Windows GUI break sau Linux backend update mỗi ngày  
Update backend → Windows Web stop. Cần `hermes doctor` + `hermes update` + restart GUI. Inconsistent fixes.

**#106665** - Desktop rendering issues 125% scaling + extended use  
Groups/pins top, lag, unresponsive clicks. Windows 11, 125% scaling + after hours.

**#110912** (CLOSED) - Nous Portal charge full price khi subscription credits còn  
Bill jump 3x sau credits hit 0, token usage không đổi. Routes: glm/glm-flash/kimi. Likely discount-route bug.

**#114526** - `hermes plugins install` fail clone public repo  
Git ask auth cho public catalog repo: "terminal prompts disabled". Clone fail.

### Desktop UX

**#52816** - Timeline rail show all dashes, earlier unreachable  
Click older prompt no-op sau session có enough messages. `scrollToPrompt` silent fail.

**#113646** - Cannot compress context dù client under cap  
Compression button fail despite token count OK. Diagnostic uploaded.

**#114543** - Empty-text resume matching graft later tool activity  
Timeline 03:45–03:49, then 03:40 segment, then 03:49 again. Visible ordering corruption.

## 🗺️ Backlog & Roadmap

### Infrastructure refactors

**#113887** - PR triage superseded/stale (265 rows)  
Full title-scope sweep "refactor". Triage table for maintainer review, not auto-close.

**#61443** - Nix desktop build break mỗi electron bump  
Hardcoded node-headers SHA → break khi nixpkgs bump `electron`. Need templated hash.

**#83047** - Kanban `blocker_auth` park task forever  
Auth-shaped branch finite cooldown, không có drain. Task ready stay blocked.

### Memory/plugin evolution

**#34271** - Add Mnemosyne to official memory docs  
Most feature-rich local-first, plugin since v2.6.0. Excluded from 8 bundled providers table.

**#33638** - Project-scoped memory filter  
`MEMORY.md` inject all entries every session. Request: filter by cwd/project context.

**#114530** - Standalone Microsoft 365 plugin catalog entry  
Pin `edd47e3f4c2`, registration: `microsoft365_preflight` + `pre_tool_call`.

### MCP/OAuth

**#103633** - MCP OAuth fail servers với `/mcp` path  
Code→token exchange never complete cho `https://mcp.traveler.md/mcp`. Retry crash "port in use".

**#113771** - MCP OAuth discovery fail reported as "Registration 404"  
Real 403 on auth-server metadata hidden. Error point at fallback registration guess.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-18

## 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 18/9 chia thành 3 nhóm rõ rệt:

**Nhóm mature/enterprise** (Hermes, OpenClaw, ZeroClaw): Tập trung ổn định production, fix race conditions, credential leaks, plugin lifecycle. Volume lớn (108-142 issues, 500 PRs). Team có resources sâu.

**Nhóm mid-tier** (QwenPaw, NanoClaw): Development tích cực, balance feature/stability. QwenPaw đẩy voice chat + hub governance, NanoClaw refactor gateway architecture. Issues trung bình (16-17), PRs 40-50.

**Nhóm minimal** (NanoBot, PicoClaw, IronClaw, NullClaw): Hoặc maintenance mode (PicoClaw stale cleanup), hoặc niche focus (IronClaw benchmark), hoặc dead (NullClaw).

## 📋 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động chính 18/9 | Mức độ tương tác | Xu hướng |
|-------|--------|-----|----------|---------------------|------------------|----------|
| **Hermes Agent** | 108 | 500 | 0 | Fix async delegation stalls, memory provider auto-install, session state corruption | Cao (maintainer responsive) | 🔧 Stability hardening |
| **OpenClaw** | 142 | 500 | 0 | Process leak P1, fleet upgrade timeout, WebUI perf umbrella | Trung bình | 🐛 Bug debt paydown |
| **ZeroClaw** | 6 | 50 | 0 | Security patch (image marker bypass), provider seam fixes | Cao (quality contributors) | 🔐 Security + architecture |
| **QwenPaw** | 16 | 40 | 0 | Plugin isolation watchdog, lazy locale, voice chat review | Cao (feature velocity) | 🚀 Feature expansion |
| **NanoClaw** | 1 | 17 | 0 | Gateway refactor (OneCLI → pluggable), Linux setup fixes | Trung bình | 🏗️ Architecture evolution |
| **NanoBot** | 4 | 16 | 0 | 7 PRs closed (race condition, cron validation, QQ spam) | Thấp (little community) | 🔨 Field bug fixes |
| **PicoClaw** | 1 | 14 | 0 | Stale bot closed 7 PRs, 1 issue | Rất thấp | 💤 Maintenance mode |
| **IronClaw** | 1 | 0 | 0 | 1 taxonomy issue (benchmark analysis) | Không có | 📊 Niche QA/benchmark |
| **NullClaw** | 0 | 0 | 0 | Không có hoạt động | Không có | ⚰️ Dead |

## 🎯 Vị thế Hermes Agent

**Điểm mạnh:**
- Volume lớn nhất (108 issues, 500 PRs) → mature product scale
- Community plugin catalog với auto-install groundwork cho ecosystem mở
- Desktop timeline + native webapp mode → đa platform
- MCP/OAuth integration depth → enterprise-ready

**Pain points:**
- Async delegation 24min stall (#114456) → orchestration bottleneck
- Credential leak cross-provider (#109440) → trust issue
- Plugin SDK crashes (#107288, #107312) → extension ecosystem fragile
- Session state bugs nhiều (#104303, #109824) → core stability chưa solid

**Vị trí:** Top-tier enterprise agent. Scale lớn nhưng đang trả technical debt. Focus 2026 Q4 rõ: ổn định orchestration + plugin lifecycle trước khi mở rộng.

## 🔧 Hướng kỹ thuật chung

**Shared trends toàn hệ sinh thái:**

1. **Plugin isolation & safety** (Hermes, QwenPaw, ZeroClaw):
   - QwenPaw: watchdog + thread pool cho sync plugins
   - Hermes: plugin SDK crashes → cần sandbox
   - ZeroClaw: script approval carry-forward
   → Consensus: Untrusted extension code cần hard boundaries.

2. **Session state & coordination** (Hermes, OpenClaw, NanoBot):
   - Async queue bugs (delegation stalls, turn lease stuck)
   - Race conditions ghi file concurrent sessions
   - WAL inode conflicts
   → Distributed state management chưa solved elegantly.

3. **Auth credential complexity** (Hermes, OpenClaw, NanoClaw):
   - Leak giữa providers (Hermes #109440)
   - Callable credentials → string convert (OpenClaw #108039)
   - Gateway credential refactor (NanoClaw #3815)
   → Credential lifecycle là minefield, mỗi dự án tự solve.

4. **Provider seam normalization** (ZeroClaw, Hermes):
   - Image marker estimation sai
   - Reasoning content sanitization
   - Token cost tracking
   → Provider API heterogeneity force abstraction layer lớn.

5. **Context/memory management** (QwenPaw, Hermes, OpenClaw):
   - Context eviction không predictable (QwenPaw #7733)
   - Memory provider rời core (Hermes #114569)
   - Memory watcher freeze (OpenClaw #119411)
   → Memory architecture chưa standardized.

## 🎨 Điểm khác biệt

### Chiến lược

**Hermes**: Enterprise-first. Desktop native + cloud backend + plugin marketplace. Tích hợp sâu (MCP, OAuth, kanban, WAL). Scale trước, stable sau.

**OpenClaw**: Deployment flexibility. Docker fleet, lightweight. Community đa nền tảng (FreeBSD request). Stability-first approach (30 PRs fix bug hôm nay).

**ZeroClaw**: Security/architecture quality. RFC-driven (event sourcing, agent lifecycle). Distinguished contributors, high review bar. Technical depth > feature velocity.

**QwenPaw**: Feature velocity. Voice chat, creator tools, hub governance cùng lúc. China market focus. UX polish (lazy load, dashboard).

**NanoClaw**: Gateway abstraction. OneCLI → Iron Proxy pluggable. Auth flexibility. Small but focused team.

**NanoBot**: Practical field fixes. Cron automation, channel adapters. No grand vision, just works.

### Tính năng độc đáo

- **Hermes**: Desktop timeline navigation, kanban workflow, webapp mode
- **OpenClaw**: Fleet upgrade tooling, doctor candidate, workboard
- **ZeroClaw**: Cost tracking scoping, checkpoint ACP recovery, tool-elicitation hints
- **QwenPaw**: Voice chat realtime, Hub model vault, Creator multi-episode
- **NanoClaw**: Iron Proxy gateway, TypeSafe Jev decision tool
- **IronClaw**: Benchmark taxonomy tracking (unique QA niche)

### Tech stack signals

- **Electron**: Hermes, OpenClaw → desktop-first
- **Web-first**: QwenPaw console, ZeroClaw likely
- **Container**: OpenClaw fleet, NanoClaw Podman request
- **Provider diversity**: Hermes + OpenClaw support nhiều nhất, NanoBot + PicoClaw focus OpenAI-compatible

## 👥 Mức độ trưởng thành cộng đồng

### Tier 1: Mature community
**Hermes, OpenClaw**
- User report chi tiết với repro steps
- Pain point tracking (Windows scaling #106665, fleet upgrade #151295)
- Maintainer triage + priority labels
- Docs/guides complete
- **Gap**: Community contribution thấp, mainly maintainer-driven

### Tier 2: Growing community
**QwenPaw, ZeroClaw**
- Distinguished/principal contributors ngoài core team
- RFC discussions (QwenPaw #7678 subAgent, ZeroClaw #10526 event sourcing)
- Feature requests thoughtful (#7733 agent context control)
- **Gap**: Contribution guidelines unclear, PR review slow

### Tier 3: Minimal community
**NanoClaw, NanoBot**
- User báo bug nhưng ít follow-up
- PRs mainly internal team
- Issue discussions 0-2 comments
- **Gap**: No contributor onboarding, no community engagement

### Tier 4: No community
**PicoClaw, IronClaw, NullClaw**
- Stale bot cleanup (PicoClaw)
- Internal tracking only (IronClaw)
- Dead (NullClaw)

## 🔮 Tín hiệu xu hướng

### Ngắn hạn (Q4 2026)

**1. Plugin ecosystem wars**
- Hermes: catalog với auto-install
- QwenPaw: safety isolation watchdog
- ZeroClaw: script approval governance
→ Thắng = balance giữa extensibility + safety. Ai solve sandbox tốt nhất sẽ lead.

**2. Multi-gateway auth**
- NanoClaw refactor OneCLI thành pluggable
- Hermes MCP OAuth depth
- OpenClaw provider credential bugs
→ Trend: Tách auth gateway khỏi agent core. Federation model emerging.

**3. Voice/multimodal**
- QwenPaw realtime voice (#7785)
- Hermes auto-speak bugs (#89896)
→ Voice = next UX frontier. Ai ship stable first wins desktop market.

**4. Fleet/ops tooling**
- OpenClaw fleet upgrade issues → need dedicated tooling
- Hermes desktop + cloud hybrid
→ Enterprise demand: Zero-downtime updates, centralized config, audit trail.

### Trung hạn (2027)

**5. Memory architecture standard**
- Hermes memory provider rời core
- QwenPaw reranker UI (#6399)
- OpenClaw memory watcher bugs
→ Memory = unsolved. Cần standard protocol (như MCP cho tools). Ai propose + adopt sẽ unify ecosystem.

**6. Context management predictability**
- QwenPaw #7733: agent self-control eviction
- Hermes compaction bugs
→ Current: Black box eviction. Future: Agent-aware context budgets + negotiation.

**7. Cost/resource governance**
- ZeroClaw cost tracking (#10804)
- OpenClaw token budget requests (#91713)
→ Production demand: Hard caps, per-user quotas, budget alerts. Compliance-driven.

**8. Orchestration complexity**
- Hermes async delegation stalls
- QwenPaw subAgent timeout (#7678)
- OpenClaw session state races
→ Distributed agent coordination = hard problem chưa solved. Cần breakthrough như Temporal cho workflows.

### Dài hạn (2027+)

**9. Consolidation wave**
- 9 dự án, 4 active thật sự
- PicoClaw/NullClaw dead, IronClaw niche
→ Predict: Merge hoặc die. Top 3 (Hermes, OpenClaw, QwenPaw) absorb features từ smaller projects.

**10. Enterprise vs indie split**
- Enterprise: Hermes, OpenClaw (fleet, auth, audit)
- Indie/dev: QwenPaw (feature velocity, voice, UX)
- Niche: ZeroClaw (architecture quality)
→ Market bifurcation. Enterprise = stability + governance. Indie = innovation + UX.

## 🏆 Kết luận

**Hermes vị trí #1 về scale nhưng #2 về stability** (sau OpenClaw focus bug paydown). Plugin ecosystem groundwork tốt nhưng SDK crashes gây cản trở adoption.

**ZeroClaw = dark horse** - contributor quality cao, architecture decisions thoughtful, nhưng volume thấp → niche influence.

**QwenPaw = innovation leader** - voice, hub, creator tools. China market advantage. Nếu solve plugin safety (watchdog shipped), sẽ đe dọa Hermes về feature breadth.

**OpenClaw = reliability king** - 30 PRs fix bug hôm nay, fleet tooling mature. Enterprise pick nếu cần uptime > features.

**Ecosystem gap lớn nhất**: Session coordination + memory architecture. Ai solve elegantly sẽ set standard cho tất cả.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo phân tích OpenClaw - 2026-09-18

## 1. Tóm tắt hôm nay

OpenClaw tập trung sửa lỗi ổn định và UX. Không có release mới. Hoạt động chính: 30 PR mới (chủ yếu fix bug), xử lý leak process (#97616), crash update cho fleet lớn (#151295), và cải thiện WebUI performance (#149361).

## 2. Releases

Không có release trong 24h qua. Phiên bản stable hiện tại: `2026.9.4`.

## 3. Tiến độ dự án

### PR quan trọng đang mở:

**Core stability:**
- #149158: Prevent node orphan work sau cancellation/crash (P2, XL, waiting author)
- #150315: Preserve errors từ repeated persistent-session runs (P2, XL, ready)
- #151309: Retain delayed flow repairs qua cleanup (P2, XL, maintainer)

**Performance:**
- #150628: Offload image metadata reads sang workers (P2, XL, ready)
- #151290: Avoid rebuild session lists khi catalog không đổi (P2, M, closed today)

**Auth/Security:**
- #151001: Preserve Codex native config qua supervised turns (P2, XL, ready)
- #151265: Fix remote admin management breaking automation creation (P1, M, bug)

**UX fixes:**
- #151246: Integrate reply/mention strips above attachments (P3, L, ready)
- #151022: Show model search results không chờ unrelated waits (P2, XL, ready)
- #150923: Use shared confirm dialog cho Skills editor (P3, M, needs proof)

### Xu hướng:
- Tập trung sửa race conditions và cleanup issues
- Nhiều offload work sang background workers
- Cải thiện WebUI stability (umbrella #149361)

## 4. Điểm nổi bật cộng đồng

### Issue hot (nhiều comment):

**#97616 - Process leak (30 comments, P1):**
- OpenClaw leak hook/tool child processes → zombie accumulation
- Regression, ảnh hưởng runtime degradation
- Chưa có fix PR

**#149361 - WebUI umbrella (21 comments, P3):**
- Index nhiều issue về performance/stability WebUI
- Desktop và mobile
- Grouped cho batch fixes

**#119411 - Memory watcher never reindexes (11 comments, P1):**
- File watcher cho memory không trigger reindex
- Report `Dirty: no` nhưng indexed count thấp hơn on-disk
- Memory index freeze silently

### PR nhiều quan tâm:
Các PR trên đều có 0 upvote nhưng maintainer activity cao → internal team focus hơn community-driven.

## 5. Ổn định & Bugs

### Critical issues:

**#151295 - Fleet upgrade failure (P1, mới hôm nay):**
- Fleet 480 agents không thể upgrade từ 2026.9.4
- Doctor candidate timeout (300s), migration marker bị rejected
- Blocking upgrades cho large deployments

**#97616 - Zombie process leak (P1):**
- Leak unreaped child processes từ hook/tool execution
- Accumulate zombies dưới main process
- Runtime degradation lâu dài

**#144922 - Duplicate sessions (P1):**
- Single cron trigger → 4 agent sessions
- Aborted sau 82s bởi watchdog
- Re-dispatched → duplicate side effects

**#150810 - Lost reply (P1):**
- Isolated finalization produced reply nhưng dispatch báo "no queued reply"
- User nhận placeholder message
- Telegram, 2026.9.4

### Stability fixes đang làm:
- #149158: Node orphan work prevention
- #150315: Error preservation trong repeated runs
- #151309: Delayed flow repair retention

### Regression issues:
- #151081: 2026.9.4 regression của #138620 (external service policy dropped again)
- #133987: GitHub Copilot models unavailable từ 2026.8.1

## 6. Yêu cầu tính năng

### Đang review:

**#82015 - Edit tool diff output (P2, 2 comments):**
- Request: show diff sau file changes
- Như Claude Code
- Hiện tại: verbose JSON hoặc chỉ summary

**#7406 - Human-readable Telegram topic names (P2, 4 comments):**
- Session dropdown hiển thị raw keys thay vì topic names
- Request: `Telegram : GroupName : TopicName`

**#45233 - FreeBSD support (P3, 4 upvotes):**
- Request add FreeBSD vào OS supported
- Build pkg cho FreeBSD ports system

### Feature enhancements closed:
- #115330, #115303, #115331: Persisted memory Gateway read capability (closed, needs decision)
- #116494: Scoped agents.files support cho persisted memory (closed)

## 7. Phản hồi người dùng

### Pain points từ community:

**Update/migration:**
- #150452: 2026.7.1-2 → 2026.9.4 cần ~1 ngày manual repair (P0, closed)
  - Config migration invalid
  - Telegram crash-loop
  - iOS node re-approval
  - Empty Usage screen

**Auth/Integration:**
- #133987: GitHub Copilot models không work từ 2026.8.1
- #123354: Matrix E2EE dừng decrypt sau Megolm rotation
- #140978: Discord message tool bị blocked bởi trust guards

**UX friction:**
- #147512: Control UI theme flash config default rồi restore (P3)
- Multiple WebUI scroll/focus issues (#149619, #149618, #150390)

### Positive signals:
- Active maintainer responses trên most issues
- Clear prioritization (P0-P3 labels)
- Detailed reproduction steps và follow-ups

## 8. Backlog & Roadmap

### In progress (từ PR activity):

**Q4 2026 priorities (inferred):**

1. **Stability** (nhiều P1/P2 fixes):
   - Process lifecycle cleanup
   - Session state consistency
   - Background job reliability

2. **Performance** (umbrella #149361):
   - WebUI rendering optimization
   - Worker offloading
   - Query efficiency

3. **Integration hardening**:
   - Provider auth fixes (GitHub, xAI, BytePlus)
   - Channel stability (Mattermost, Discord, Teams)
   - Codex session improvements

### Blocked/needs decision:
- Persisted memory Gateway API shape (3 related issues closed, needs product decision)
- FreeBSD support (waiting maintainer review)
- Workboard query optimization (#151059, P2)

### Technical debt visible:
- #65983: Background PTY exec orphan processes (linked PR open)
- #120415: No repetition guard trong embedded turn loop
- #136714: Codex sub-agents policy-restricted incorrectly

---

**Nhận xét tổng quan:**  
OpenClaw đang trong phase ổn định sau releases 2026.8-9. Focus vào sửa regressions, memory leaks, và cải thiện UX. Không có feature lớn mới. Team responsive nhưng nhiều issue P1/P2 chưa có fix PR → workload cao hoặc cần deeper investigation.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-18

## 1. Tóm tắt hôm nay

Ngày sửa lỗi căng đét. Team đóng 7 PR fix bug nghiêm trọng - từ race condition ghi file đến compaction spam trên QQ channel. Không có release mới. 1 issue về session routing mới nổi (#5798), chưa có response.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Đóng trong ngày:**

- **#5379** - fix lỗi consolidation truncate input nhưng advance pointer qua full batch → mất data. Merged sau 35 ngày.
- **#5792** - fix race condition: messages không serialize theo session → conflict. Priority P1, merged trong 1 ngày.
- **#5799** - drop compaction notice trên channel không support edit (QQ, Discord) → spam 2 message permanent. Merged nhanh.
- **#5802** - hide model details khi chưa setup xong AI config. UI polish.
- **#5762, #5765, #5766** - ba fix liên quan cron tool: reject past schedule, enforce boolean `stream`, reject conflicting cron fields.

**Mở/tiếp tục:**

- **#5803** - cải thiện Telegram: newline rendering, topic_id trong `my` tool, typing status theo topic. Vừa mở.
- **#5779** - serialize session file writes → fix #4798 (race khi concurrent sessions ghi cùng file). Đang review.
- **#5801** - preserve checkpoint qua metadata update → tránh mất tool result khi restart.
- **#5800** - thêm `replyToMessage` cho Discord (parity với Telegram).
- **#5611** - bound reasoning replay tới latest turn → giảm prefill cost. Conflict label.
- **#5718** - support OpenRouter native image API.
- **#5352** - UI controls xóa model provider.

**Pattern:** Team đang dọn backlog bugs nghiêm trọng (race, data loss, validation) trước khi thêm feature.

## 4. Điểm nổi bật cộng đồng

- **#5798** (mới) - user report session routing sai: câu trả lời từ session A xuất hiện trong session B. Nghiêm trọng nếu đúng, nhưng chưa có repro chi tiết.
- **#5784** (đóng) - QQ channel spam 2 message compaction không xóa được → #5799 fix bằng cách drop notice hẳn.
- Các PR fix cron tool (#5762, #5766) cho thấy user đang dùng automation nhiều hơn.

## 5. Ổn định & Bugs

**Đã fix:**

- Race condition ghi file (#5779) - nguy cơ mất data cao
- Session message serialization (#5792) - P1, gây conflict khi nhiều input đồng thời
- Consolidation data loss (#5379) - truncate input sai
- Cron validation holes (3 PRs) - accept invalid config âm thầm

**Đang fix:**

- Session routing cross-contamination (#5798) - cần investigation
- Checkpoint loss sau metadata update (#5801)

**Xu hướng:** Team hunt bugs từ field usage. Nhiều fix về edge case validation (cron, API params) → production đang expose gaps.

## 6. Yêu cầu tính năng

- **#5459** - Google Vertex AI provider cho Claude. Mở 28 ngày, chưa schedule.
- **#5562** - stream tool progress events qua API (cho client observe tool execution). Conflict label, chưa merge.
- **#5718** - OpenRouter image generation native API.
- **#5800** - Discord reply parity với Telegram.

Không có feature request mới trong ngày. Focus vẫn là stability.

## 7. Phản hồi người dùng

- QQ users phàn nàn compaction notice spam (#5784) → fixed nhanh
- Telegram users cần better formatting + topic support (#5803)
- Session routing bug (#5798) chưa có follow-up từ user → có thể là misconfig hoặc timing issue
- Cron tool issues cho thấy automation use case tăng

## 8. Backlog & Roadmap

**Short-term (đang active):**

- Dọn race conditions và data loss bugs (3-4 PRs còn open)
- Channel parity (Discord, Telegram improvements)
- API streaming enhancements (#5562)

**Mid-term (stalled >2 weeks):**

- Vertex AI provider (#5459)
- Subagent completion tracking (#5152 - 52 ngày)
- Provider removal UI (#5352 - 36 ngày)

**Pattern:** Team đang stabilize core trước khi mở rộng provider/channel. Backlog feature requests lâu không động → resource thiếu hoặc chưa priority.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw - 2026-09-18

## 1. Tóm tắt hôm nay

Ngày focus vào bảo mật và xử lý lỗi runtime. 3 issue mới report (2 bug, 1 perf degradation), 1 PR merged fix lỗ hổng bảo mật, nhiều PR hotfix đang review cho các edge case provider/channel.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Đóng hôm nay:**
- ✅ #9882 - Image marker bypass validation → đã patch
- ✅ #10894 - Image marker normalization trên seam sanitizer
- ✅ #10618 - Script maintainer carry-forward approval

**Hoạt động nổi:**
- #10197 (30 comments) - ACP checkpoint restore logic đang tích cực thảo luận
- #8966 - Provider identity tracking và context window resolution (lớn, impact nhiều component)
- #9535 - Context compaction theo model window ratio (chờ author action)
- #10621 - Agent lifecycle coordination (refactor lớn, 4 ngày tuổi, nhiều subsystem)

**Pattern:**
- Architecture cleanup đang diễn ra song song (lifecycle, cost tracking, event replay)
- Provider seam getting lots of attention (image normalization, reasoning leak, token estimation)

## 4. Điểm nổi bật cộng đồng

#10526 (11 comments) - RFC về append-only event history và deterministic replay. Discussion chất lượng về state management và audit trail. Risk high, chưa có maintainer review.

#10197 - Distinguished contributor (@Audacity88) push ACP interrupted turn recovery. Size XL, cần maintainer approval nhưng active development.

## 5. Ổn định & Bugs

**Mới mở:**
- #10952 - Sanitizer rewrite reasoning content trong assistant tool-call envelope → Anthropic reject
- #10951 - ZeroCode Config double-refresh sau save (perf degradation S2)
- #10950 - `cost.warn_at_percent` bị ignore bởi runtime (concrete gap identified)

**Đang fix:**
- #10953 (PR) - Keep signed reasoning intact khi sanitize
- #10928 (PR) - Windows task owner exit detection
- #10860 (PR) - Non-image data-URI trong tool results bị treat sai
- #10890 (PR) - Image marker cost estimate sai (9 tokens vs 1.5-2k actual)

**Security-critical đã đóng:**
- #9882 - Image marker validation bypass (closed hôm nay)

## 6. Yêu cầu tính năng

- #10907 - Stamp external ingress provenance cho channels
- #10946 - Inject Mattermost channel purpose vào system prompt
- #9829 - Spill large web_fetch responses sang file thay vì truncate (needs author action)
- #10325 - Pre-turn tool-elicitation hints (behind feature flag, 2/2 của #7431)

## 7. Phản hồi người dùng

#8692 (tracker, 15 comments) - Maintainer decision queue cho RFCs. Active coordination point.

#10266 - WhatsApp Web `is_direct_message` implementation. Community contributor (@grrowl) với maintainer polish.

#9453 - Context usage estimate cho local providers (llama.cpp). Principal contributor fix user-visible gap (ZeroCode meter trống).

## 8. Backlog & Roadmap

**Architecture track (từ #8692 tracker):**
- Event sourcing / deterministic replay (#10526) - needs decision
- Agent lifecycle coordination (#10621) - in progress
- Cost tracking scoping (#10804) - in progress

**Security hardening:**
- Webhook audit destination pinning (#10678) - review
- Tool approval survive autonomy mode (#9724) - review
- Provider seam normalization - multiple PRs active

**DX improvements:**
- Context compaction by model ratio (#9535)
- Execution tree iteration budgets (#10351)
- Better error recovery (ACP checkpoints #10197)

**Chờ maintainer bandwidth:** 7 PRs tagged `needs-maintainer-review`, nhiều PR distinguished/principal contributor quality cao chờ final approval.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-09-18

## 1. Tóm tắt hôm nay

Bot đánh dấu stale hàng loạt - đóng 7 PR dependencies cũ, 1 issue QQ gateway. Hoạt động chính: dọn backlog, không có release mới. Cộng đồng ít tương tác.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đóng (stale):**
- #3360-3364: Dependabot updates (larksuite SDK, protobuf, AWS SDK, golang/x/term, irc-go) - bot đóng vì không merge lâu
- #3358: Fix thread responses - đóng do stale
- #1158: Anthropic-messages protocol - đóng sau 6 tháng

**PR còn mở quan trọng:**
- #3381: Switch OpenAI sang responses API (mới nhất, 17/9)
- #3376: Fix deltachat config validation error
- #3354: IRCv3 multiline message assembly
- #3353: Bound tool feedback animations (5 phút timeout)
- #3368: Parallel Search MCP setup docs
- #3344: Build Remote Agent phone pairing
- #3222: Deltachat refactor -200 LOC (từ tháng 7, stale)

**Xu hướng:** 
- Tích hợp protocol mới (OpenAI responses API, IRCv3, Build Remote Agent)
- Fix channel adapters (deltachat, IRC, tool feedback)
- Maintenance: dọn stale PRs, không chạy dependabot nữa

## 4. Điểm nổi bật cộng đồng

Không có. PRs gần đây 0 reactions, 0-vài comments. Cộng đồng yên.

## 5. Ổn định & Bugs

**#3349 (đóng):** QQ频道 gateway 401 error - "Authorization header format wrong"
- Docker và Linux x86 đều lỗi
- Đóng do stale, không thấy fix

**#3376:** Deltachat verification error - channel type unknown
- Fix: register như custom channel
- Chờ merge

**#3353:** Tool feedback animation không dừng nếu cleanup miss
- Fix: timeout 5 phút + stop on first edit error

## 6. Yêu cầu tính năng

**#3381:** OpenAI responses API
- Chuyển từ chat completions sang responses endpoint
- Mới, chưa review

**#3354:** IRCv3 multiline support
- Draft/multiline batch messages
- Auto-request caps nếu cần

**#3344:** Build Remote Agent pairing
- Protocol `gbr/1`, phone spectate desktop
- QR + 8-char code

**#3368:** Parallel Search MCP
- Web search + page extraction không cần API key
- Docs cho CLI setup

## 7. Phản hồi người dùng

#3349: QQ gateway broken - không ai giúp, bot đóng. User bỏ.

Không có feedback tích cực. PRs không được discuss.

## 8. Backlog & Roadmap

**Backlog lớn:**
- 7 stale PRs đóng hôm nay
- #3222 deltachat refactor từ tháng 7 vẫn mở
- Dependabot PRs bị bỏ mặc → không auto-update dependencies nữa

**Roadmap:** Không rõ. Activity thấp, maintainer ít review. Dự án có vẻ maintenance mode.

---

**Kết luận:** Ngày dọn dẹp stale. Không có development tích cực, PRs mới ít được chú ý. QQ gateway bug không fix. Dự án chậm.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-09-18

## 1. Tóm tắt hôm nay

NanoClaw đang refactor cấu trúc gateway credential lớn: tách OneCLI thành installable skill, chuẩn bị thêm Iron Proxy gateway thay thế. Song song fix nhiều bug setup/install (quyền npm, corepack, webhook port). Không có release.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Gateway Refactor** (priority cao, 6 PRs liên kết):
- #3815: Tách contract credential gateway thành seam trung tâm
- #3816: OneCLI thành installable skill, không còn hard-coded
- #3817: Thêm Iron Proxy gateway skill (optional)
- #3818: Setup chọn gateway riêng, không ảnh hưởng provider login
- #3825: OpenCode auth qua Iron Proxy với API key/OAuth
- #3551, #3552: Fix policy MCP per-group và routing OneCLI

Cấu trúc mới: gateway là skill cài được, nhiều gateway song song, credential lifecycle tách biệt provider. OneCLI vẫn default nhưng không còn bắt buộc.

**Bug fixes**:
- #3847 (merged): Fix corepack pnpm khi global bin read-only (Linux system packages)
- #3844 (closed, superseded by #3847): Broken sudo retry trong setup.sh
- #3148 (merged): WEBHOOK_PORT từ .env bị ignore, giờ đã honor đúng precedence
- #3803: Webhook recovery test dùng random port gây EADDRINUSE spurious
- #3849: Gemini từ chối serialize history khi functionCall ở đầu turn

**Tính năng mới**:
- #3848: Skill `/add-typesafe-tool` - TypeSafe Jev decision model làm container tool cho classification/ranking
- #3845: Local monitoring dashboard (API + UI, config DASHBOARD_SECRET/PORT)
- #3156: Channel attachments thành structured parts cho providers

## 4. Điểm nổi bật cộng đồng

**Issue #957** (closed, 👍8): Đề xuất support Podman thay Docker trên macOS/Linux. Có 11 comments, nhu cầu rõ ràng từ user không muốn Docker Desktop. Đã close nhưng chưa thấy PR tương ứng.

PR nhiều area nhất: #3816 (11 areas), #3815 (10 areas) - refactor gateway ảnh hưởng toàn hệ thống.

## 5. Ổn định & Bugs

**Setup/install vỡ trên Linux distro packages**:
- Fedora/Debian cài Node từ `dnf`/`apt` → `/usr/bin` read-only → `corepack enable` fail EACCES
- #3847 fix bằng fallback `~/.local/bin` khi global fail
- #3844 thử retry sudo nhưng bị reject, merged #3847 thay thế

**Provider compatibility**:
- #3849: Gemini strict turn order, history với leading functionCall gây serialize failure
- #3156: Attachments chưa structured → providers không parse đúng

**Test flakiness**:
- #3803: Webhook recovery test random port collision → ECONNREFUSED false negative

## 6. Yêu cầu tính năng

- **Podman support** (#957): Closed nhưng chưa implement, cộng đồng muốn alternative container runtime
- **Iron Proxy gateway** (#3817, #3825): Đang implement, cho phép auth qua Iron Control thay OneCLI
- **TypeSafe decision tool** (#3848): Agent gọi external model cho judgment, tách reasoning khỏi writing
- **Local dashboard** (#3845): Monitoring UI cho developer self-host

## 7. Phản hồi người dùng

Issue #957 (Podman): 8 thumbs up, multiple comments → nhu cầu thực từ macOS/Linux users không muốn Docker monopoly.

Setup bugs (#3844, #3847): Phát hiện từ real deployment trên Fedora 43 → Linux distro package users gặp friction ngay bước đầu.

## 8. Backlog & Roadmap

**Đang làm**:
- Gateway refactor (6 PRs open) → multi-gateway architecture
- Setup robustness (Linux distro compatibility)
- Provider compatibility (Gemini, attachments)

**Chưa address**:
- Podman support (issue closed, no PR)
- MCP policy enforcement (#3551, #3552 mở 1 tháng)
- Test stability (#3803 mới mở)

Xu hướng: Từ monolithic OneCLI sang pluggable gateway ecosystem. Chuẩn bị nhiều authentication backend (Iron Proxy, potential Podman). Ưu tiên UX setup trên Linux variants.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw — 2026-09-18

## 1. Tóm tắt hôm nay

Ngày yên. Chỉ có 1 issue về phân loại lỗi hằng ngày (taxonomy) cho suite `officeqa`. Không có PR, không có release, không có tranh luận. Dự án đang ở giai đoạn phân tích lỗi model chứ không phát triển tính năng mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Issue #8101** — taxonomy lỗi ngày 2026-09-17:
- Phân tích 35 task thất bại trong suite `officeqa`
- Phần lớn lỗi từ DeepSeek-V4-Flash: lỗi chất lượng model, không phải bug hệ thống
- Đây là báo cáo định kỳ, theo dõi pattern lỗi để cải thiện benchmark

Không có PR → không có code mới đang merge. Dự án tập trung vào QA/phân tích thay vì code.

## 4. Điểm nổi bật cộng đồng

Không có. Issue taxonomy có 0 bình luận, 0 reaction. Cộng đồng chưa tham gia hoặc đây là internal tracking issue.

## 5. Ổn định & Bugs

Không có bug report mới. Issue #8101 ghi nhận lỗi model (genuine model-quality errors), không phải bug infrastructure. Hệ thống benchmark chạy ổn, vấn đề nằm ở LLM backend.

## 6. Yêu cầu tính năng

Không có.

## 7. Phản hồi người dùng

Không có tương tác. Dữ liệu chỉ có 1 issue nội bộ, chưa thấy feedback từ user thực.

## 8. Backlog & Roadmap

Không rõ từ dữ liệu hiện tại. Dự án đang chạy benchmark daily và log lỗi. Roadmap cần xem milestone/project board hoặc issue khác.

---

**Nhận xét**: IronClaw ngày này gần như không có hoạt động công khai. Taxonomy issue cho thấy họ đang đo lường chất lượng agent qua benchmark suite, nhưng không có cải tiến code hoặc tính năng mới được đẩy lên. Cần theo dõi thêm ngày để thấy xu hướng rõ hơn.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-09-18

## 🔍 Tóm tắt hôm nay

Ngày 18/9 tập trung vào **cách ly plugin đồng bộ** (#7842) - vá lỗi nghiêm trọng khiến plugin chặn event loop. PR #7829 tối ưu tải trang Console qua lazy-load locale. Nhiều fix nhỏ về stream SSE, slash commands, và MCP OAuth. Không có release mới.

---

## 📦 Releases

Không có.

---

## 🚀 Tiến độ dự án

### PRs quan trọng mới (18/9)

**#7842 - Cách ly plugin đồng bộ + event loop watchdog** ⚠️  
*Vấn đề:* Plugin dùng `time.sleep()` hoặc sync I/O trong async hook chặn toàn bộ event loop → đóng băng 40s (#7840).  
*Giải pháp:*
- Chạy plugin hook trong ThreadPoolExecutor
- Thêm watchdog 2s, cảnh báo nếu lag > 250ms
- Chỉ áp dụng cho local plugin (PawApp an toàn)

**#7829 - Tách chat-vendor bundle + lazy locale**  
Split `@agentscope-ai/chat` ra bundle riêng, lazy-load locale không phải tiếng Anh → giảm bundle size ban đầu.

### PRs đang chờ merge (17/9 trước)

**#7831 - Stream tool output chỉ khi cần**  
Background tool trước đây stream output ngay. Giờ chỉ mở SSE khi mở rộng task row, collapse thì abort.

**#7833 - Fix Hub local runtime + PawApp auth**  
Sau #7779:
- Local runtime cài dependency vào env chia sẻ toàn user
- PawApp thiếu auth token
- Model config mất default
→ Fix bằng per-user venv riêng biệt.

**#7835 - Chặn auto-memory-recall rò payload**  
Auto-recall tạo synthetic tool trace (`ToolCallBlock`/`ToolResultBlock`). Console ẩn qua `MemorySearchCard` nhưng **channel khác vẫn nhận** → fix bằng `hidden=True`.

**#7785 - Realtime voice chat**  
Thêm voice chat (speech input, playback, interrupt) tích hợp chat UI hiện tại. Giữ nguyên history/tools/queue/persistence.

### PRs merged quan trọng (17/9)

**#7779 - Hub model gateway + member governance**  
Admin publish model, giữ key trong Hub vault. Member dùng Hub model không cần biết credential → quản lý tập trung.

**#7802 - Telemetry: báo cáo hoạt động Runtime hàng ngày**  
Gửi 1 signal/ngày khi Agent chạy. Chỉ so sánh UTC date trong memory, không ảnh hưởng performance.

**#7823 - Creator 1.3.0**  
- Thêm OpenCode Zen/Go endpoint
- Song song asset upload + recovery khi fail
- Style-anchor versioning
- Fix timeline overlay/subtitle
- Multi-episode hardening

---

## 🔥 Điểm nổi bật cộng đồng

### Issue hot nhất

**#7678 - subAgent timeout 100%** (10 comments)  
User Trung Quốc: Mọi task spawn subAgent đều timeout, dù timeout dài. Chưa có giải pháp rõ ràng.

**#7840 - Plugin đồng bộ đóng băng instance** (4 comments)  
Plugin local chạy `time.sleep()` → event loop chặn 40s. Đã có PR #7842 fix.

**#7815 - Console không recover sau lazy chunk fail** (4 comments)  
Lazy page load fail → mọi navigation tiếp theo vẫn ở error screen, phải reload toàn bộ. Retry mechanism không work.

---

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng

1. **Plugin đồng bộ chặn event loop** (#7840)  
   → Fix: #7842 (thread pool + watchdog)

2. **Console lazy page không recover** (#7815)  
   → Chưa có PR fix

3. **Scroll eviction mất user turn** (#7836)  
   Tool-heavy span bị evict → user request trong đoạn đó biến mất trong live window (nhưng vẫn trong DB).

4. **SSE `null` payload đóng băng stream** (#7813, #7814)  
   `_strip_event_headlines` có thể emit bare `null` → client exception. Chưa fix.

### Bugs trung bình

5. **Slash command sau startup chạy sai session** (#7812)  
   `/compact` ngay sau khởi động → act trên fallback session, không phải session hiện tại.

6. **MCP `server/discover` HTTP 500 không được coi là legacy** (#7827)  
   DashScope MCP trả 500 empty body → driver không coi là legacy protocol → kẹt ở `connect()` mãi.

7. **MCP OAuth token refresh bị bỏ qua** (#7821)  
   Driver refresh token nhưng live client vẫn dùng `Authorization` header cũ.

8. **Desktop model list/plugin panel trống sau startup** (#7841)  
   UI load trước backend ready → blank panel cho đến refresh thủ công.

### Đã fix hoặc đang review

- #7808: DoomLoopGate config cleanup (merged)
- #7810: Context limit không work (closed - đã hướng dẫn)
- #7685: Feishu reasoning panel auto-collapse (đang review)

---

## 💡 Yêu cầu tính năng

**#7733 - Agent tự quản context eviction** (2 comments)  
Hiện tại eviction chỉ dựa token threshold. Agent không biết khi nào evict → wake up trong context mỏng. Đề xuất: cho agent check context budget trước khi spawn task, hoặc callback trước eviction.

**#7830 - Đăng ký app trong /os desktop mode**  
Cho phép đăng ký custom app vào OS desktop mode qua interface chuẩn.

**#6399 - Reranker UI config panel** (đang review)  
Thêm reranker settings UI vào Agent Config memory card.

---

## 💬 Phản hồi người dùng

### Tích cực

- Voice chat (#7785) và Creator 1.3 (#7823) là tính năng lớn, nhưng chưa có phản hồi mass adoption.
- Hub model gateway (#7779) giúp org quản lý credential tốt hơn.

### Tiêu cực / Khó khăn

- **subAgent timeout** (#7678): Vấn đề nghiêm trọng chưa giải quyết, ảnh hưởng workflow production.
- **Plugin đóng băng** (#7840): Lỗi critical đã fix nhưng chỉ mới vào PR, chưa release.
- **Console lazy chunk fail** (#7815): UX tệ, chưa fix.
- **Context management** (#7810): User confused về input limit, mặc dù đã set 131k nhưng vẫn gửi 271k → cần rõ ràng hơn.

---

## 📋 Backlog & Roadmap

### Đang làm (có PR)

- Plugin safety: #7842 (cách ly sync), #7565 (hot reload)
- Performance: #7639 (skip repeated integrity scan), #7829 (lazy locale)
- Voice: #7785 (realtime voice chat)
- Hub: #7779 merged, #7833 fix aftermath
- MCP: #7821 (OAuth), #7827 (legacy detection)
- Console UX: #7831 (background tool), #7788 (sidebar redesign)

### Backlog chưa có PR

- #7733: Agent-controlled context eviction
- #7815: Console lazy chunk recovery
- #7836: Scroll eviction user turn loss
- #7813/#7814: SSE null payload handling
- #7678: subAgent timeout investigation

### Trend

- **Plugin safety & isolation** đang được ưu tiên (watchdog, hot reload, sandbox)
- **Console performance** (lazy load, stream on demand)
- **Hub governance** (model gateway, member access)
- **Context management** vẫn là pain point lớn (eviction, user confusion)

---

## 🎯 Kết luận

18/9 là ngày sửa lỗi kỹ thuật chặt chẽ:
- **Critical fix**: Plugin đồng bộ chặn event loop (#7842)
- **Performance**: Lazy load locale (#7829)
- **Bug fixes**: MCP OAuth, slash command routing, SSE stream

Các tính năng lớn (voice, creator 1.3, hub gateway) đã merge hôm trước, giờ team focus vào ổn định. subAgent timeout (#7678) và console lazy chunk (#7815) là 2 vấn đề chưa giải quyết, cần theo dõi.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*