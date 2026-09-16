# Bản tin Hệ sinh thái Hermes Agent 2026-09-16

> Issues: 157 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-16 02:00 UTC

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

# 📊 Báo cáo Hermes Agent - 2026-09-16

## 🎯 Tóm tắt hôm nay

Ngày bận rộn với **30 PR được merge**, tập trung vào **bảo mật** (secrets leaking trong logs), **độ tin cậy messaging** (Slack, Telegram, background processes), và **cron/kanban workflow fixes**. Không có release mới. Hoạt động cao điểm: 157 issues mở, 500 PRs đang xử lý.

---

## 🚀 Releases

Không có release mới hôm nay.

---

## 📈 Tiến độ dự án

### PRs quan trọng đã merge:

**🔒 Bảo mật (Critical):**
- **#112189**: Fix secrets starting với `/`, `$`, `~` bị leak trong logs - redact lại đúng cách
- **#112460, #112508**: Shutdown forensics không còn ghi full `argv` (chứa credentials) vào disk
- **#59929**: Process argv bị loại khỏi shutdown diagnostics hoàn toàn

**📨 Messaging reliability:**
- **#112287**: Background terminal processes với `notify_on_complete` giờ gửi thông báo ngay (không đợi turn kết thúc)
- **#112264**: Gateway restart notifications giờ đến home channels kể cả khi platform offline lúc boot
- **#112315**: Buzz WebSocket reconnect trong 1 idle bound khi connection chết
- **#112222**: Slack `/handoff` threads giữ session sau gateway restart

**⚙️ Cron & Kanban:**
- **#112431**: Cron jobs có thể báo failure khi delegated child fail (dùng `[CRON_FAILURE]` marker)
- **#112320**: Kanban tasks có `total_runs` cap - tránh infinite retry loops

**🐛 Compression & Context:**
- **#112422**: Skip compression retries trong cooldown period
- **#112504**: Floor stall cooldown ở idle window, prune khi no progress

**🖥️ Desktop & UX:**
- **#112283**: `/status` hiển thị đúng context window sau session `/model` switch
- **#112263**: Heartbeat/loop từ messaging chat reply đúng chỗ kể cả khi session mở Desktop
- **#112205**: QR fallback giờ install `qrcode` vào running venv qua `uv`

### Issues nổi bật:

**P1 - Critical:**
- **#103483** (15💬, 11👍): Muse-spark stream bị cut giữa chừng với `finish_reason=stop` + random word
- **#41225** (7💬): Background processes bị SIGTERM kill khi agent lifecycle `release()`
- **#111727** (3💬): Telegram gateway "deaf" (CLOSE-WAIT sockets) nhưng report "connected", spin 1 core

**P2 - High:**
- **#112482** (3💬, mới): Compression livelock - no-op entries supersede in-flight attempt, commits không bao giờ land
- **#59293** (11💬): `hermes config set` bypass system-config write protection - CLI có thể disable approval layer không cần gate

**Xu hướng:** Team đang aggressive fix **message delivery holes** (Slack threads, Telegram deaf, background notifications) và **security leaks** (secrets trong logs). Context compression vẫn có edge cases (#112482 livelock).

---

## 🔥 Điểm nổi bật cộng đồng

1. **#88584** (104💬) - Integration blocked, tồn tại lâu nhất
2. **#103483** (15💬, 11👍) - Bug Muse-spark phổ biến, user khó chịu
3. **#90687** (12💬) - Installation ERROR codes trên mọi devices - closed nhưng nhiều người gặp
4. **#59293** (11💬) - Security concern: CLI bypass approval layer

Người dùng quan tâm: **streaming stability**, **installation issues**, **security boundaries**.

---

## 🐛 Ổn định & Bugs

### Đã fix hôm nay:
- Secrets leaking trong shutdown logs (#112189, #112460, #112508)
- Background process notifications lost (#112287)
- Slack thread session persistence (#112222)
- Telegram gateway deaf state (#111727 → #112315)
- Compression livelock (#112422, #112504)

### Còn đang xử lý:
- **#112482** (mới): Compression livelock khi no-op entries supersede candidate
- **#103483**: Muse-spark finish_reason=stop với random word
- **#41225**: Background processes killed SIGTERM unexpectedly
- **#59293**: CLI security bypass (needs-decision label)

### Edge cases:
- Python 3.14 compatibility (#58596 - CLOSED)
- Desktop SSH với zsh login shell (#111949 - CLOSED)
- WhatsApp bridge vulnerable `body-parser` version (#112382)

---

## 💡 Yêu cầu tính năng

1. **#111237** (3💬): Self-tuning harness - opt-in local evolver loop giữ lại tweaks có statistical credit
2. **#52532** (3💬): Korean language support cho Desktop
3. **#111200**: Pattern exchange (liên quan #111189 evidence, #111237 self-tuning)
4. **#85693**: `computer_use` tool chưa expose trong Desktop sessions (chỉ có CLI)
5. **#76593**: Multiple API keys per provider từ Bitwarden/env vars

Feature requests focus: **observability** (self-tuning), **i18n**, **desktop parity** với CLI.

---

## 💬 Phản hồi người dùng

**Tích cực:**
- Team responsive - nhiều bugs được fix trong ngày
- Security fixes nhanh (secrets leaking)

**Tiêu cực:**
- Installation errors (#90687) - nhiều users frustrated
- Compression stability vẫn có issues
- Desktop/CLI feature parity chưa đồng đều (#85693)

**Pain points:**
- Streaming stability (Muse-spark #103483)
- Background process lifecycle (#41225)
- Gateway deaf states (#111727)
- Security boundaries unclear (#59293)

---

## 📋 Backlog & Roadmap

### Ưu tiên cao (từ issue labels):
- **P1**: Fix streaming bugs (#103483), background SIGTERM (#41225), gateway deaf states
- **P2**: Security boundaries (#59293), compression stability, auth/config edge cases

### Tech debt:
- Python 3.14 compatibility sweep (#58596 pattern)
- Electron upgrade 40→43 (#77146)
- Dependency audit (body-parser CVE #112382)

### Feature pipeline:
- Self-tuning harness (#111237)
- Computer_use desktop parity (#85693)
- Multi-key credential pools (#76593)
- Korean i18n (#52532)

### Areas cần attention:
- Message delivery reliability (đã có progress hôm nay)
- Context compression stability (#112482 mới phát hiện)
- Security boundary enforcement (#59293 needs-decision)
- Installation experience (#90687 closed nhưng users vẫn report)

---

**📊 Stats:** 157 open issues | 500 PRs | 30 merged hôm nay | 0 releases

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-16

## 1. Tổng quan hệ sinh thái

**Các dự án hoạt động:** 7/9 dự án có activity trong 24h. **NullClaw** và **IronClaw** không có hoạt động.

**Phân bổ nguồn lực:**
- **Hermes Agent** và **OpenClaw**: scale lớn (500 PRs), tập trung fix production bugs nghiêm trọng
- **QwenPaw**: pivot sang enterprise/multi-tenant, polish UX
- **ZeroClaw**: security-first, RFC-driven architecture
- **NanoBot**: rapid iteration, native client packaging
- **NanoClaw**: production hardening, gateway refactor
- **PicoClaw**: minimal activity, 2 critical bugs chưa fix

**Tone chung:** Hệ sinh thái đang **mature** – ưu tiên stability/security over feature velocity. Nhiều dự án đồng thời fix message delivery, compression, resource leaks.

---

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | PRs merged 24h | Severity bugs | Engagement |
|---|--:|--:|--:|--:|---|---|
| **Hermes Agent** | 157 | 500 | 0 | 30 | 🔴 P1 streaming (#103483), background SIGTERM (#41225) | 104💬 (#88584) |
| **OpenClaw** | 110 | 500 | 0 | ~25 | 🔴 Gateway OOM (#149538), MCP leak (#144527) | 30💬 (#97616) |
| **QwenPaw** | 13 | 50 | 0 | 8 | 🟠 Subagent timeout (#7678), PDF handling | 27💬 (#7318) |
| **ZeroClaw** | 15 | 50 | 0 | 3 | 🟡 Plugin ABI, OAuth pending | 11💬 (#9106) |
| **NanoBot** | 2 | 21 | 1 (v0.3.5) | 8 | 🟢 Dream loop (#5781) fixed same-day | 2💬 (low) |
| **NanoClaw** | 5 | 40 | 0 | 10 | 🔴 Cutover drain (#3828), Mattermost auth | 3💬 (#3338) |
| **PicoClaw** | 2 | 5 | 0 | 0 | 🔴 Race condition (#3374), data loss (#3373) | 1💬 (no action) |
| **NullClaw** | 0 | 0 | 0 | 0 | – | – |
| **IronClaw** | 0 | 0 | 0 | 0 | – | – |

**Legend:**
- 🔴 Critical: production failures, data loss, OOM
- 🟠 High: blocking workflows, security gaps
- 🟡 Medium: config/UX issues
- 🟢 Resolved quickly

---

## 3. Vị thế Hermes Agent

### Điểm mạnh
✅ **Activity lớn nhất**: 30 PR/day, 157 issues open  
✅ **Community engagement cao**: #88584 có 104 comments  
✅ **Security-aware**: 4 PR fix secrets leaking trong 1 ngày  
✅ **Message delivery priority**: Aggressive fix Slack threads, Telegram deaf, background notifications

### Điểm yếu
❌ **No release**: Không có release trong nhiều ngày dù có 30 merges  
❌ **Critical bugs tồn tại lâu**: #103483 (streaming), #41225 (SIGTERM) chưa fix  
❌ **Compression instability**: #112482 livelock mới phát hiện  
❌ **Installation pain**: #90687 closed nhưng users vẫn gặp ERROR codes

### Vai trò trong hệ sinh thái
**Hermes Agent = production workhorse**. Focus messaging reliability (Slack/Telegram/background), security leaks, context management. Dẫn đầu về **message delivery hardening** – các dự án khác chưa address gateway deaf states, thread persistence depth này.

Nhưng: **stability debt lớn**, no release strategy rõ ràng, user experience (installation, streaming) chưa smooth.

---

## 4. Hướng kỹ thuật chung

### 🔒 Security
**Shared priority:**
- **Secrets leaking**: Hermes (#112189 argv), NanoBot (#5778 email auth), NanoClaw (#3823 Mattermost callback)
- **SSRF protection**: PicoClaw (#3370 QQ attachments), ZeroClaw (#10070)
- **Auth boundaries**: Hermes (#59293 CLI bypass), QwenPaw (#4037 HTTP gateway)

**Pattern**: Secrets in logs/diagnostics, callback authentication, injection vectors.

### 🔄 Message delivery reliability
**Hermes, OpenClaw, NanoClaw đồng loạt fix:**
- Gateway deaf states (WebSocket reconnect, CLOSE-WAIT sockets)
- Thread/session persistence qua restart
- Background process notifications
- Event loop starvation (sync I/O block)

**Convergence**: Message channels là **critical infrastructure**, scale issues xuất hiện khi fleet lớn.

### 🗜️ Context/compression stability
**Hermes (#112482), OpenClaw (#148588), NanoBot (#5775):**
- No-op compression supersede candidates → livelock
- Dedup scope miss original results
- Full transcript allocations → stalls

**Xu hướng**: Context window management vượt quá naïve LRU, cần sophisticated compaction strategies.

### 🧩 Plugin/skill architectures
**ZeroClaw (#10752 plugin verify), QwenPaw (#7613 memory plugin), NanoBot (MCP runtime):**
- OCI-compliant registries
- ABI verification on load
- Optional/pluggable backends (memory, tools)

**Trend**: Từ monolithic agent sang **modular capability systems**.

### 🎙️ Voice/multimodal
**QwenPaw (#7785 realtime voice), NanoClaw (#3764 browser calls), NanoBot (Talk channels):**
- Speech input/output integrated vào existing Chat UI
- Full-duplex, interruption support
- Multimodal content handling (PDF, image, audio)

**Emerging**: Voice là next frontier, nhưng multimodal content validation vẫn có gaps (QwenPaw PDF blocks rejected).

---

## 5. Điểm khác biệt

### Chiến lược phát triển

| Dự án | Strategy | Velocity | Focus |
|---|---|---|---|
| **Hermes** | Fix-everything-fast | Cao (30 PR/day) | Stability debt paydown |
| **OpenClaw** | Performance-first | Cao (25 PR/day) | Event loop optimization |
| **QwenPaw** | Enterprise pivot | Medium (8 PR/day) | Multi-tenant, UX polish |
| **ZeroClaw** | RFC-driven, security | Thấp (3 PR/day) | Architecture, governance |
| **NanoBot** | Rapid iteration, packaging | Medium (8 PR/day, 1 release) | Distribution, bug fixes |
| **NanoClaw** | Production hardening | Cao (10 PR/day) | Gateway refactor, channels |
| **PicoClaw** | Inactive | Không (0 PR) | Maintenance mode? |

### Tính năng độc đáo

**Hermes:**
- Cron failure delegation (`[CRON_FAILURE]` marker)
- Kanban `total_runs` cap

**OpenClaw:**
- Worker-backed Telegram storage (event loop offload)
- Source-only sessions (no dependency install)

**QwenPaw:**
- **Advisor Mode** (strong + cheap model pair)
- Hub model gateway (admin-provisioned models)
- Theme customization (6 palettes)

**ZeroClaw:**
- OCI plugin registries + cosign verification
- Emergency-stop enforcement at egress
- A2A outbound client (agent-to-agent)

**NanoBot:**
- Native TUI trong PyPI wheels (5 platforms)
- Session unification (browser ↔ terminal)

**NanoClaw:**
- Iron Proxy gateway (OneCLI alternative)
- Durable handoff ledger (agent-to-agent contracts)

### Cộng đồng & governance

**High engagement:**
- Hermes: 104 comments (#88584), 15 comments (#103483)
- OpenClaw: 30 comments (#97616), 20 comments (#119720)
- QwenPaw: 27 comments (#7318 Hub multi-tenant)

**Low engagement:**
- PicoClaw: 1 comment/issue, no maintainer response
- ZeroClaw: Technical but narrow audience (11 comments max)
- NanoBot: 2 issues total, reactive fixes

**Governance style:**
- **ZeroClaw**: RFC-driven, contract-first, security review gates
- **Hermes/OpenClaw**: Move-fast-fix-fast, PRs merge without extensive discussion
- **QwenPaw**: Community-driven roadmap (ask "what to build next" in #7318)
- **NanoBot**: Maintainer-driven, quick iterations

---

## 6. Mức độ trưởng thành cộng đồng

### 🌟 Mature (Hermes, OpenClaw)
**Dấu hiệu:**
- 100+ issues, detailed repros
- Users self-diagnose và contribute fixes
- Pain points articulated (installation, streaming, fleet scale)
- Zombie process/memory leak discussions technical depth

**Gaps:**
- Release cadence không ổn định
- Documentation debt (installation errors recurring)

### 🌱 Growing (QwenPaw, NanoClaw)
**QwenPaw:**
- Community request enterprise features → team respond with Hub 2.2
- 27-comment roadmap discussion
- Contributors add skills/channels (Keenable, Proton Mail)

**NanoClaw:**
- Contributors add gateways (Iron Proxy), email adapters
- Setup issues require one-off fixes → fragile

**Gaps:**
- QwenPaw: Security issue #4037 open 5 tháng
- NanoClaw: Setup assumptions brittle trên non-interactive shells

### 🌿 Early (NanoBot, ZeroClaw)
**NanoBot:**
- 2 issues total, maintainer-reactive
- Users report bugs, maintainer fix same-day
- No visible contributor pipeline

**ZeroClaw:**
- Technical audience, narrow engagement
- RFC discussions thorough nhưng slow to land

**Gaps:**
- Thiếu onboarding paths cho new contributors
- Community không self-organize

### ⚠️ Stalled (PicoClaw)
- 2 critical bugs không có response
- 0 activity 24h, no maintainer signals
- Single user (@sting8k) report detailed repros, silence

---

## 7. Tín hiệu xu hướng

### 📈 Confirmed trends

**1. Production scale walls**
- Gateway event loop starvation ở 600+ agent fleets (OpenClaw #149538)
- Background processes/cron leak runtimes (Hermes, OpenClaw)
- Compression livelock dưới load (Hermes #112482)

**Implication**: Personal assistant → production deployment shifts performance assumptions. SQLite sync I/O, single-threaded event loops không scale.

**2. Message delivery là critical infra**
Hermes, OpenClaw, NanoClaw đồng thời fix:
- WebSocket reconnect logic
- Thread/session persistence
- Notification routing

**Implication**: Chat channels không còn là "nice-to-have UI", là **primary control plane** cho agents. Reliability = product viability.

**3. Security hardening wave**
Secrets leaking, auth bypasses, SSRF vectors across 5 dự án trong 1 ngày.

**Implication**: Early agent deployments lax về security. Production use cases force **secure-by-default** posture.

**4. Multi-tenant/enterprise pivot**
- QwenPaw Hub model gateway (#7779)
- ZeroClaw governance RFCs (#9346 unified catalog)
- NanoClaw multi-gateway credential management

**Implication**: Market demand shifting from **personal dev tools** sang **team/org deployments**. Features needed: usage tracking, admin controls, audit logs.

**5. Plugin/skill modularity**
ZeroClaw OCI registries, QwenPaw memory plugins, NanoBot MCP runtimes.

**Implication**: Monolithic agent code không sustainable. Community contributions cần **structured extension points**.

### 🔮 Emerging signals

**1. Voice integration acceleration**
QwenPaw (#7785), NanoClaw (#3764) add realtime voice trong 24h. Multimodal content (PDF, audio) processing issues surface.

**Prediction**: Voice channels sẽ mainstream trong Q4 2026. Expect: streaming audio bugs, latency optimization wars, content validation gaps.

**2. Advisor/orchestrator patterns**
- QwenPaw Advisor Mode (strong + cheap pair)
- NanoClaw durable handoff ledger
- ZeroClaw A2A outbound client

**Prediction**: Single-agent architecture hit limits. Next 6 tháng: **multi-agent orchestration patterns** proliferate. Challenges: handoff contracts, error attribution, cost management.

**3. Context management sophistication**
Compression livelocks, dedup scope bugs, transcript allocation stalls.

**Prediction**: Context window management becomes **specialized subdomain**. Expect: dedicated context compression algorithms, RAG-style retrieval over long histories, semantic deduplication.

**4. Gateway abstraction wars**
- NanoClaw Iron Proxy vs OneCLI
- QwenPaw Hub model gateway
- ZeroClaw unified credential contracts

**Prediction**: Model providers proliferate, credential management fragments. **Gateway layer standardization** battles trong 2027. Winner owns developer mindshare.

**5. Installation/distribution UX**
- Hermes installation errors (#90687)
- NanoBot native TUI packaging
- NanoClaw setup fragility on headless shells

**Prediction**: **Packaging** becomes differentiation. Python dependency hell, native binaries, container images, shell environment assumptions = friction points. Smoothest install wins adoption.

### ⚠️ Risk signals

**1. Stability debt accumulation**
Hermes, OpenClaw có 100+ open issues, critical bugs tồn tại weeks. Velocity cao nhưng **backlog không giảm**.

**Risk**: Technical debt spiral. Users churn nếu core reliability không improve.

**2. No-release anti-pattern**
Hermes 30 merges/day, 0 releases. OpenClaw tương tự.

**Risk**: Users stuck trên broken versions, cannot pin stable snapshots. CI/CD maturity gap.

**3. Security issue response time**
QwenPaw #4037 (HTTP gateway auth) open 5 tháng. PicoClaw critical bugs no response.

**Risk**: Production deployments vulnerable. Enterprise adoption blocked.

**4. Community fragmentation**
9 dự án cùng solve similar problems (message delivery, compression, security) độc lập.

**Risk**: Effort duplication, no shared learnings. Ecosystem không consolidate → confusion for users chọn tool.

---

## 🎯 Kết luận chiến lược

### Hermes Agent position
**Strengths:** Largest community, highest activity, message delivery leadership.  
**Weaknesses:** No releases, stability debt, installation UX.

**Strategic moves:**
1. **Establish release cadence** – pin stable versions, changelogs
2. **Prioritize P1 bugs** – streaming (#103483), SIGTERM (#41225) block adoption
3. **Installation overhaul** – #90687 pattern fix once, comprehensive
4. **Context compression research** – #112482 livelock cần fundamental rethink, not patches

### Ecosystem gaps (opportunities)
1. **Standardized gateway contracts** – credential management fragmented
2. **Shared context compression** – every project reinventing wheel
3. **Agent orchestration frameworks** – handoff patterns ad-hoc
4. **Security-first distributions** – no project has secure-by-default end-to-end

### Winner-take-most scenarios
- **Installation UX**: NanoBot's native packaging approach có momentum
- **Enterprise**: QwenPaw Hub multi-tenant first to market
- **Security**: ZeroClaw RFC-driven governance most rigorous
- **Scale**: OpenClaw worker-backed architecture handles large fleets

**Hermes winning path:** Fix stability, ship releases, maintain community momentum. Lose if: no releases → users cannot pin stable versions, critical bugs linger → churn to alternatives.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw ngày 2026-09-16

## 1. Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa lỗi nghiêm trọng: Gateway bị đói event loop, leaked MCP runtime gây out-of-memory, và nhiều vấn đề tương tác người dùng. 30 PR mới được tạo, chủ yếu là performance fixes và bugfixes.

## 2. Releases

Không có release mới trong 24h qua.

## 3. Tiến độ dự án

**PR nổi bật:**

- **#149588** - Fix Telegram event-loop stalls: send và poll routing chạy sync SQLite, giờ chuyển sang worker-backed storage
- **#149587** - Source-only sessions không cần cài dependencies, giảm thời gian khởi động
- **#149585** - PR worktrees tái sử dụng managed source clones, tăng tốc setup
- **#149584/#149586** - Fix lỗi test PR alias sau các merge chồng chéo
- **#149355** - Codex: giữ ordinary chats ra khỏi personal history
- **#148588** - Tránh full-transcript allocations khi reset session dài → giảm stall và memory spike
- **#149291** - Report CPU time trong session list diagnostics
- **#149308** - Gateway reads bỏ legacy database checks, giảm query recompilation

**Xu hướng:**
- Performance optimization là ưu tiên: giảm blocking I/O, tối ưu SQLite, worker offload
- Nhiều fixes cho memory leaks và resource cleanup
- Cải thiện developer experience: faster worktree setup, better diagnostics

## 4. Điểm nổi bật cộng đồng

**Issue nhiều bình luận nhất:**

1. **#97616 (30 comments)** - Zombie process accumulation: OpenClaw leak unreaped child processes, gây runtime degradation
2. **#119720 (20 comments)** - Gateway event loop bị block bởi synchronous agent persistence, không scale
3. **#139710 (13 comments)** - Plugin-generation supersede giữa turn giết system-agent turn và planner fallback
4. **#136311 (10 comments)** - Memory-core: Gateway reacquire reindex lock mỗi lần start, 19GB temp DBs tích lũy

**Vấn đề người dùng quan tâm:**
- Zombie processes và memory leaks gây degradation theo thời gian
- Gateway không responsive trong fleet lớn (632 agents mất 12 phút để ready)
- Update failures: nhiều báo cáo `database-schema-preflight` failures trên 2026.9.4

## 5. Ổn định & Bugs

**Critical bugs:**

- **#149538** - Gateway reach ready nhưng không serve: `/health` timeout, event loop starved, RSS tăng đến OOM (632-agent fleet)
- **#149270** - Code-mode turn wedged forever: tool dispatch không settle, session admission livelock
- **#144527** - Bundle-mcp: mỗi cron run leak session MCP runtime, đạt limit 256 → fail
- **#148793** - Channel ingress monitor single-use: `stop()` set `stopped=true`, không reset được

**Regressions:**
- #97616, #119720, #144527 - Resource leaks tích lũy, cần khởi động lại định kỳ
- #148529 - Gateway boot time tăng từ 2s (2026.7.1-2) lên 12 phút (2026.9.4) trên 632-agent fleet

**Stability concerns:**
- SQLite blocking on event loop gây stalls
- Synchronous persistence operations không scale
- Process lifecycle management có gaps

## 6. Yêu cầu tính năng

**Đã đề xuất:**

- **#149476** - Add Prism as official model provider (có manual workaround qua OpenAI-compatible endpoint)
- **#7406** - Human-readable Telegram topic names trong session dropdown (hiện là raw keys)
- **#143003** - Cho phép admitted WhatsApp users `/new` và `/reset` DM sessions riêng
- **#149454** - `before_tool_call` onResolution có thể refuse call sau approval

**Voice & UI enhancements:**
- #146676 - Switch voices trong Talk và Discord calls (in progress)
- Better session management và filtering

## 7. Phản hồi người dùng

**Pain points:**

1. **Performance degradation theo thời gian** - zombie processes, leaked runtimes, temp DB accumulation
2. **Fleet scalability** - 632-agent boot time không chấp nhận được
3. **Update failures** - nhiều users gặp `database-schema-preflight` error trên 2026.9.4
4. **Error messaging** - generic errors che đậy root cause (race conditions, tool policy mismatches)

**Positive signals:**
- Community đang active report issues với detailed repros
- Maintainers responsive với nhiều fix PRs trong ngày

## 8. Backlog & Roadmap

**Immediate priorities (dựa vào P0/P1 issues):**

1. Fix Gateway event loop starvation (#149538)
2. Resolve MCP runtime leaks (#144527)
3. Database schema migration issues (#149555, #149259, #148991, #148744, #148359, #148314, #148255)
4. Zombie process cleanup (#97616)
5. Gateway persistence blocking I/O (#119720)

**Technical debt being addressed:**
- Worker-backed storage migration (Telegram, persistence)
- SQLite query compilation optimization
- Resource lifecycle management
- Memory allocation patterns trong large operations

**Testing & stability:**
- Nhiều PR có proof requirements và e2e tests
- Focus on reproducible regressions
- Performance benchmarking được add vào diagnostics

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-16

## 📊 Tóm tắt hôm nay

Phát hành **v0.3.5** với TUI native đóng gói trong wheels, hợp nhất 8 PR sửa bug quan trọng (file dedup, edit_file newline, provider content preservation, email auth hardening). 2 issue mới phản ánh vấn đề Dream loop không giới hạn và QQ auto-compaction spam user.

## 🚀 Release v0.3.5

**Tính năng chính:**
- **Native TUI trong PyPI wheels** (#5787): Đóng gói client terminal cho 5 platform, không cần tải từ GitHub hay cài Bun
- **One agent, more places**: `nanobot` (terminal) và `nanobot webui` (browser) dùng chung gateway, WebSocket sessions có thể resume/fork giữa các client
- **Checklist release end-to-end** (#5785): Build 5-platform TUI, source-only fallback, không publish tag/release

**Ý nghĩa**: Giảm friction cài đặt, người dùng PyPI install và chạy TUI ngay. Session unification giúp workflow linh hoạt hơn (bắt đầu ở browser, tiếp tục ở terminal).

## 🔧 Tiến độ dự án

**Bug fixes đã merge:**

| PR | Vấn đề | Kỹ thuật |
|---|---|---|
| #5775 | `read_file` trả stub sau khi context compaction xóa output gốc | Dedup scope tới model context, verify original result còn tồn tại |
| #5778 | Email sender verification yếu | Parse authentication-results structurally, check authenticated domain |
| #5761 | `edit_file` xóa newline sau inline suffix, gộp dòng | Preserve line boundaries, unify success summary với `apply_patch` |
| #5768 | Feishu QR onboarding fail "Link expired" ngay sau scan | Dùng `/page/cli` verification URL thay vì deprecated endpoint |
| #5697 | QQ attachment URLs SSRF vulnerable | Validate URL, disable redirects, only HTTP 200, parse `Content-Type` |
| #5728 | Streaming text reparse toàn bộ accumulated content mỗi chunk | Skip tag parsing khi không có control tags, debounce classic CLI redraws |
| #5757 | `search_sessions` miss older messages trong long conversations | Fetch multiple pages từ `build_webui_thread_response` API |
| #5774 | Archive tool calls xử lý sai, fallback RAW quá nhanh | Recover archive requests emit tool calls bằng non-executing result + retry |

**PRs đang mở:**

- **#5748** (p2): Persist partial tool progress tại batch boundaries → recovery không mất completed side effects
- **#5776** (p2): Search/filter providers trong WebUI settings pickers
- **#5777** (p2): Mobile drawer autofocus search button làm mất focus nhập liệu
- **#5780** (p2): Context compaction notifications spam user, đề xuất invisible cho autocompaction
- **#5779**: File write serialization per-path → fix concurrent sessions interleave bytes (#4798)
- **#5750** (p2): Expose stable per-invocation tool context qua ContextVar → tools access `tool_call_id`
- **#5626**: Add `copy_file`/`move_file` tools → tránh read→write chain
- **#5666**: aimlapi.com OpenAI gateway provider (partnership offer 50/50 rev share, 400k users)

**Xu hướng**: Stability hardening (recovery, concurrency, auth), UX polish (search, mobile, notifications), tool primitives.

## 🔥 Điểm nổi bật cộng đồng

**Issue #5781** (p2, 2 comments): Dream consolidation loop 25–111 phút, ~200 tool calls re-read cùng 2 files. `dream.maxIterations` config bị deprecated/ignored.
- **Root cause**: Fallback về global `maxToolIterations=200`, Dream không có limit riêng
- **Fix đã merge** (#5782): Restore `agents.defaults.dream.maxIterations=15` cho manual + scheduled Dream

**Issue #5784** (1 comment): QQ auto-compaction notices gửi như chat messages riêng lẻ, không collapse → annoying.
- Liên quan #5719 (noise class), #5780 đề xuất invisible cho autocompaction

## 🐛 Ổn định & Bugs

**Critical fixes merged:**
- **File I/O**: Line boundary corruption, dedup scope, concurrent write races
- **Auth/Security**: Email sender verification, QQ SSRF protection
- **Channel onboarding**: Feishu QR expired link
- **Performance**: Streaming reparse overhead

**Open blockers:**
- **#5748**: Recovery mất partial tool results → side effects invisible
- **#5779**: Concurrent file writes corrupt data
- **#5777**: Mobile UX focus stealing

## ✨ Yêu cầu tính năng

1. **Copy/move file tools** (#5626): Native primitives thay vì read→write chain, giảm token waste
2. **Provider search** (#5776): Filter long provider lists trong settings
3. **Per-invocation tool context** (#5750): Tools cần stable identity cho logging/tracing
4. **aimlapi.com gateway** (#5666): 1000+ models, partnership proposal

## 💬 Phản hồi người dùng

- **Dream loop problem**: User @BrianMwangi21 report scheduled Dream 1–2h stuck, fixed cùng ngày → responsive
- **QQ notifications**: User @AlfredChaos self-host, auto-compaction spam annoying
- **Feishu onboarding**: @hammerhoundai v0.3.0 QR never work, v0.3.5 fix /page/cli URL

## 📋 Backlog & Roadmap

**Known priorities:**
- **p1**: Feishu QR fix (done v0.3.5)
- **p2 cluster**: Dream limits, recovery persistence, file concurrency, QQ compaction noise, mobile focus, dedup scope, email auth, edit_file newlines, session search
- **Feature queue**: copy/move tools, tool context, provider search, aimlapi integration

**Pattern**: Small incremental releases (v0.3.5 focused on TUI packaging + 8 bug fixes), stable velocity, responsive to user-reported issues.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw - 2026-09-16

## 1. Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào cải thiện CI (tối ưu thời gian build), sửa lỗi Anthropic cache với image, và tiếp tục phát triển các tính năng như session prompts, steering pipeline, và web research delegate. Một số PR lớn về OAuth, plugin loading, và emergency-stop enforcement vẫn đang review.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Đang merge/gần merge:**
- #10896 (CI): Tách 11 compile job khỏi `fmt` dependency — giảm thời gian chờ từ 70 phút xuống ~24 giây khi GitHub runner queue chậm
- #10895: Sửa native Anthropic provider bỏ mất `cache_control` breakpoint khi message cuối có image block
- #10840: Sinh `llms.txt` + `llms-full.txt` từ mdBook build — chuẩn bị cho llmstxt.org discovery

**Tiến triển chính:**
- #10525 (relay-terminated browser enrollment): Phase 1 xong, trust model đã rõ ràng, chờ security review
- #10752 (plugin verify): `zeroclaw plugin list --verify` load-check từng plugin, báo lỗi ABI mismatch
- #10407 (session prompt attachments): SQLite-backed, tối đa 4 attachments/session, có tool quản lý
- #10351 (execution-tree iteration budgets): Giới hạn tổng iteration cho cả cây delegate, tránh loop vô hạn

**Blocked/waiting:**
- #5869: MQTT client `rumqttc` giữ rustls-webpki cũ — 4 RUSTSEC advisories, chờ upstream fix
- #9318: PostgreSQL CI job vẫn thiếu, session backend opt-in chưa test live
- #9802 (emergency-stop RFC): Chờ enforce `network-kill`/`domain-block` tại egress boundary

## 4. Điểm nổi bật cộng đồng

**Issues có nhiều tương tác:**
- #9106 (A2A outbound client): 11 bình luận, RFC accepted, #9324 đã implement phase 1 nhưng bị close (lý do chưa rõ trong log)
- #9346 (unified catalog RFC): 9 bình luận, thiết kế catalog cho integrations/plugins/built-ins
- #9464 (Anthropic OAuth): 4 bình luận, contract ghi nhận cách implement OAuth profile

**PRs nhiều hoạt động:**
- #9713: Token accounting trên history-trim events — giúp debug budget exhaustion
- #10525: Browser enrollment PR, nhiều discussion về trust model và TLS termination
- #9833: `web_research` delegate — sub-agent bounded loop (8 tool calls, 180s timeout) cho search→fetch→distill

## 5. Ổn định & Bugs

**Vừa sửa/đang sửa:**
- #10889/#10895: Anthropic rolling cache breakpoint bị drop khi image ở cuối message
- #10897: Test flake `supervisor_preserves_component_error_chain` — race condition trong global log broadcast (nextest parallel)
- #10480: Recovery từ HTTP 400 image rejection — retry request với image mới bỏ đi, giữ cache
- #10172: Preserve configured provider profile semantics khi runtime switch model

**Vẫn mở:**
- #9882: Image marker bypass content validation trên `run_model_query` seam — chưa run `prepare_messages_for_provider`
- #2754: Docker heredoc chown không chạy vì syntax lỗi (đã close?)

## 6. Yêu cầu tính năng

**Mới:**
- #10893: Wire channel dispatch tới steering pipeline — message mid-generation flow vào running turn thay vì cancel/wait
- #10892: Publish canonical config generations + track per-target apply results
- #10891: Carry channel provenance qua runtime admission và steering (#6971 slice 1)

**RFC đang review:**
- #9346: Unified catalog contract cho packages/capabilities/config/runtime-state
- #7497: OCI-compliant registries cho plugin storage + discovery (dùng wasm-pkg-client, cosign)
- #8187: Capability-gated WASI hardware host functions (GPIO/SPI/I2C/USB) cho plugins

## 7. Phản hồi người dùng

**WhatsApp Markdown rendering (#10475):**
- Models output standard Markdown, nhưng WhatsApp có dialect riêng
- PR convert trước khi send (giống Telegram/WeChat/Email đã làm)

**Email CC/BCC (#9567):**
- Reply-All và multi-recipient support — stacked trên #9523

**Model picker cho Telegram (#9997):**
- Provider-grouped, paginated inline keyboard
- Build từ configured aliases + runtime routes, secure by design

## 8. Backlog & Roadmap

**Đang active:**
- A2A outbound client (#9106): Phase 1 done, tool integration tiếp theo
- Plugin ecosystem: OCI registry (#7497), verify on install (#10746, #10752), egress governance (#10750)
- Session management: Persistent prompts (#10407), steering pipeline (#10893)
- Security hardening: Emergency-stop enforcement (#9802), SSRF defense (#10070), image rejection recovery (#10480)

**Blocked dependencies:**
- `rumqttc` upgrade chờ upstream (#5869)
- PostgreSQL CI job (#9318) chờ setup
- Browser enrollment (#10525) chờ final security sign-off

**Contributor priorities:**
- @JordanTheJet: CI perf, plugin tooling, email/channel features
- @Audacity88: Runtime safety, provider reliability, architecture RFCs
- @vrurg: OAuth flows, session features

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-09-16

## 1. Tóm tắt hôm nay

Không có hoạt động mới trong ngày 2026-09-16. Tất cả issues và PRs được cập nhật vào 2026-09-15 (ngày hôm qua). Dự án đang xử lý 2 bugs nghiêm trọng về race condition và data loss, cùng 3 PRs mở cho cải tiến config và observability.

## 2. Releases

Không có releases.

## 3. Tiến độ dự án

### PRs hoạt động gần đây (cập nhật 2026-09-15)

**Đã đóng:**
- **#1780** - QQ channel stability config (đóng sau 6 tháng từ 2026-03-19). Cho phép config reconnect interval, retry count, rate limit cho QQ channel.
- **#3380** - Mesh observability với peer metrics (conns, score, bandwidth), activity feed, SSE events. Đóng ngay trong ngày (2026-09-15).

**Đang mở:**
- **#3375** - Fix race condition trong `sensitiveCache` init. Thêm mutex để guard concurrent access.
- **#3372** - Fix `reaction` tool config. Tool `reaction` không có dedicated config branch, luôn enabled.
- **#3370** - Thêm Keenable web search provider (không cần API key, dùng public endpoint).

Xu hướng: focus vào stability (fix race condition, data loss) và observability (mesh metrics).

## 4. Điểm nổi bật cộng đồng

Không có activity nào nổi bật về reaction/comments. Issues #3374 và #3373 có 1 comment mỗi issue, không có upvotes.

## 5. Ổn định & Bugs

### 🚨 Bugs nghiêm trọng (cả 2 từ @sting8k)

**#3374 - Race condition trong `Config.initSensitiveCache`:**
- `sensitiveCache` tạo lazy không đồng bộ → nhiều goroutines tạo riêng instance → `sync.Once` bị vô hiệu
- `SensitiveDataReplacer` có thể return nil replacer → panic
- PR #3375 đang fix bằng mutex

**#3373 - `SaveConfig` xóa mất api_keys:**
- Config có nhiều `api_keys` trong `model_list` → `LoadConfig` → `SaveConfig` → chỉ giữ key đầu tiên, xóa hết còn lại
- Để lại `fallbacks` reference đến model không tồn tại
- Silent data loss, chưa có PR fix

### Fix config nhỏ

**#3372 - Reaction tool config:**
- Tool `reaction` không có config branch riêng → luôn enabled dù user muốn tắt
- PR thêm field `reaction` vào `ToolsConfig`

## 6. Yêu cầu tính năng

**#3370 - Keenable web search:**
- Provider mới cho `web_search` tool
- Không cần API key (dùng public endpoint `/v1/search/public`)
- Chỉ cần set `tools.web.keenable.enabled = true`

## 7. Phản hồi người dùng

Ít tương tác. 2 bugs nghiêm trọng được báo cáo bởi cùng 1 user (@sting8k) với tóm tắt kỹ thuật chi tiết. Chưa có phản hồi từ maintainers hoặc cộng đồng rộng.

## 8. Backlog & Roadmap

Không có thông tin roadmap rõ ràng. Dựa vào PRs:

**Ưu tiên cao (bugs):**
- Fix race condition trong sensitive data cache (#3375)
- Fix data loss trong SaveConfig (#3373 - chưa có PR)

**Tính năng đang review:**
- Keenable search integration (#3370)
- Reaction tool config (#3372)

**Đã hoàn thành:**
- QQ channel stability config (#1780)
- Mesh observability (#3380)

---

**Nhận xét:** Dự án có 2 bugs nghiêm trọng cần fix gấp (race condition có thể panic, data loss trong save config). Activity thấp, ít engagement từ cộng đồng. Mesh observability được merge nhanh cho thấy track development đang active.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw – 2026-09-16

## 📊 Tóm tắt hôm nay

Team core đẩy mạnh **hardening production**: xử lý race condition trong cập nhật host, cải thiện bảo mật Mattermost callback, thêm Iron Proxy gateway thay thế OneCLI. Merge 10 PR fix bugs critical, mở 8 PR mới cho telemetry, voice channel, email adapters. Issue mới #3828 bắt lỗi cutover drain logic broken.

---

## 🚀 Releases

Không có release. Activity tập trung refactor và fix.

---

## 📈 Tiến độ dự án

### **Merged (10 PR)**

**Bảo mật & ổn định:**
- **#3823**: Mattermost callback authentication – ngăn external button integrations đọc shared secret
- **#3780**: Verify Mattermost bot/server callback trước khi setup complete
- **#3779**: Check PID/start time sau restart để tránh setup tiếp vào wrong process
- **#3778**: Atomic persist Mattermost config sau validation
- **#3689**: Fix symlinked `data/` snapshot – capture content thay vì link pointer

**Performance:**
- **#3829**: Cross-session echo fan off wake path – latency không scale với số sibling session
- **#3832**: Parallel session reconciliation – sweep time không còn `sessions × mailbox latency`

**Provider/gateway:**
- **#3826**: Provider tone contract (default + mapping)
- **#3827**: Codex adopt tone contract
- **#3788**: Restore provider picker trong fresh setup

### **Open – ưu tiên cao**

**Critical bug:**
- **#3828** ⚠️: Cutover drain broken – host stop trước khi agent container exit, polling không bao giờ complete. Cần fix ngay.

**Durable handoff & mission control:**
- **#3813**: Host-owned handoff ledger với fingerprinted contracts, structured Slack agent-to-agent delivery, bounded bot hops. Large change, chờ review.

**Gateway refactor:**
- **#3815**: Centralize credential gateway contract – unify gateway/provider/session/approval lifecycle
- **#3824**: Credential connection interface cho providers
- **#3817**: Iron Proxy gateway installable
- **#3818**: Gateway selection trong setup, keep provider login độc lập

**Delivery & channels:**
- **#3781**: Tools-only delivery enforcement – provider không emit final-text envelope reliable → force delivery qua tools only
- **#3713**: Per-agent-group delivery mode config
- **#3764**: `/add-voice` full-duplex browser calls (OpenAI GPT-Live-1)
- **#3726**: Proton Mail adapter via Bridge
- **#3743**: AgentMail channel (managed email inbox API, không cần own MX record)
- **#3799**: Signal stage attachments qua session inbox

**Observability:**
- **#3796**: `/add-telemetry` OpenTelemetry tracing – spans cho turns/model calls/tools/subagents, export OTLP/HTTP

**Contrib skills:**
- **#3697**: Keenable MCP tool (web search + page fetch)
- **#3724**: Update retired Anthropic model ID trong add-opencode example

### **Xu hướng:**

1. **Gateway abstraction maturing** – tách credential management khỏi OneCLI, chuẩn bị multi-gateway support
2. **Channel expansion** – thêm voice, email (Proton/AgentMail), Signal attachments
3. **Production hardening** – fix race conditions, bảo mật callbacks, telemetry
4. **Delivery flexibility** – tools-only mode cho providers không stable final-text envelope

---

## 💬 Điểm nổi bật cộng đồng

**Issue tương tác cao:**
- **#3338** (3 comments): Codex WebSocket idle retry ẩn sau NanoClaw 10-min timeout – user im lặng 10 phút khi Codex CLI retry internal nhưng app-server không surface lỗi
- **#1981** (2 comments): systemd misdetected trên headless Linux – `systemctl --user` works trong interactive login nhưng setup script detect absent

→ Pain point: **setup assumptions về interactive shell environment**

---

## 🐛 Ổn định & Bugs

### **Fixed hôm nay:**
- Mattermost callback auth bypass
- Symlinked mutable root snapshot
- Setup restart verification
- Cross-session echo latency
- Provider picker missing
- Webhook port flakes

### **Open critical:**
- **#3828**: Update cutover drain broken – logic stop host trước containers
- **#3338**: Codex WebSocket idle hang – 10-min silent wait

### **Open medium:**
- **#1981**, **#3354**: Setup failures trên non-login SSH sessions – git-show copy, PATH issues

---

## 💡 Yêu cầu tính năng

1. **Voice channel (#3764)** – full-duplex browser calls, GPT-Live-1 backend
2. **Email channels** – Proton Mail (#3726), AgentMail (#3743)
3. **Telemetry (#3796)** – OTLP export cho production observability
4. **Iron Proxy gateway (#3817)** – alternative credential store
5. **Tools-only delivery (#3781)** – compliance cho providers không stable final-text

---

## 👥 Phản hồi người dùng

**Pain points:**
- Setup fragile trên headless/non-login shells → nhiều one-off fixes, cần refactor setup assumptions
- Codex WebSocket timeout ẩn → user experience "agent đơ không response"
- Symlinked data/ snapshot sai → silent corruption risk trong update/rollback

**Positive:**
- Community contrib tăng: Keenable, Proton Mail, AgentMail adapters
- Core team responsive: same-day fix cho Mattermost security issue

---

## 🗺️ Backlog & Roadmap

**Inferred từ open PRs:**

**Short-term (blocking):**
- Fix #3828 cutover drain
- Merge gateway refactor stack (#3815, #3824, #3817, #3818)
- Merge durable handoff (#3813)

**Medium-term:**
- Ship telemetry skill
- Stabilize tools-only delivery
- Add voice + email channels

**Long-term (pattern shift):**
- Multi-gateway credential architecture
- Mission control for agent-to-agent handoff
- Tone config standardization across providers

**Không thấy public roadmap hoặc milestone dates.**

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

# Báo cáo QwenPaw — 2026-09-16

## 1. Tóm tắt hôm nay

QwenPaw Hub 2.2 sắp ra mắt phiên bản multi-tenant với model gateway tập trung, governance thành viên và usage dashboard. Team đang đóng nhiều bug fix về MCP, subagent model override và PDF handling trong multimodal flow. Console UX được cải thiện với theme customization và unified chat workbench.

## 2. Releases

Không có release mới trong 24h. Phiên bản hiện tại: 2.2.1 (released trước đó).

## 3. Tiến độ dự án

**Backend & infra:**

- **#7779** [OPEN]: Hub model gateway — admin publish models, members chọn Hub models không cần cầm supplier keys riêng. Usage tracking sẵn sàng cho billing/quota.
- **#7787** [CLOSED]: Fix MCP gzip double-decompress bug (Java SDK servers trả 400 bị httpx decode hai lần). Merged nhanh.
- **#7796** [OPEN]: Subagent model override bị swallow exception → disappeared silently. PR thêm log trace thay vì drop.
- **#7636** [OPEN]: Strip PDF `DataBlock` cho *tất cả* OpenAI-compatible chat-completions (không chỉ text-only models). Follow-up của #7621, chưa merge.

**Console UX:**

- **#7741** [OPEN]: Theme customization — 6 built-in palettes (QwenPaw, Code Wombat, GitHub, Dracula, Monokai, Nord), real-time preview, persistent.
- **#7790** [OPEN]: Unified chat workbench shell — resizable right panel, user-configurable tabs (Files/Changes/Terminal/Tools), lightweight until opened.
- **#7788** [OPEN]: Sidebar redesign cho màn hình nhỏ — attack bottleneck 42px row height, thu hẹp fixed chrome, tăng visible sessions từ 4–10 lên hơn.
- **#7750** [CLOSED]: `send_file_to_user` files hiện trong response artifact grid, không phải chỉ ẩn trong collapsed tool steps. Merged.

**Channels:**

- **#7765** [OPEN]: Telegram fix — `/cmd@other_bot` không trigger mention gate nữa (chỉ command addressed to bot này mới accept).
- **#7792** [OPEN]: WeChat video/audio attachment thành `file://` URL trong tool_result, gửi thô vào OpenAI-compatible API → 400 "invalid URL". Chưa fix.

**Skills & agents:**

- **#7795** [OPEN]: Expand multi-agent collaboration trigger keywords trong skill descriptions (dùng từ user thường dùng request team collaboration).
- **#7569** [OPEN]: **Advisor Mode** — loop mode pair strong advisor model + cheaper worker agent. Advisor đưa opening plan, theo dõi từng step, can thiệp khi cần.

**Memory:**

- **#7613** [OPEN]: OpenViking memory plugin — rewrote core integration thành optional plugin theo memory-plugin architecture finalized trong #7616.

**Voice:**

- **#7785** [OPEN]: **Realtime Voice chat** — speech input, playback, interruption, model selection trong existing Chat UI. Speech admitted vào current Chat execution path (shared history/tools/persistence).

**QwenPaw-Data:**

- **#7637** [OPEN]: QPD 0.3.0 workflow — select datasource, ask business question, follow clarification + execution, read generated report, continue conversation.

**Dependencies & providers:**

- **#7794** [OPEN]: Add DeepSeek V4 Flash capabilities — image input, 1M token window, reasoning effort values vào provider catalog.
- **#7791** [OPEN]: Email skill support custom IMAP/SMTP servers qua provider "custom" (hiện tại chỉ built-in personal domains + 3 Chinese enterprise providers).

## 4. Điểm nổi bật cộng đồng

- **#7318** [OPEN, 27 comments, 4 👍]: **QwenPaw Hub multi-tenant discussion** — community requested team-level features (multi-user, admin-managed skills, shared workspaces). Hub 2.2.0 là first response, hỏi ý kiến xây gì tiếp theo.
- **#7678** [OPEN, 7 comments]: User report mọi task dùng `spawn subAgent` đều timeout fail dù timeout set rất dài. Chưa root cause rõ.
- **#7689** [CLOSED, 3 comments]: PDF blocks vẫn gửi vào multimodal chat-completions sau #7621 → rejected. #7636 đang fix.

## 5. Ổn định & Bugs

**Fixed/merged:**

- ✅ MCP gzip double-decompress (#7787)
- ✅ Vi & pt-BR language selection broken (#7752)
- ✅ send_file_to_user files hidden trong collapsed steps (#7750)
- ✅ Link focus indicators mất (#7759)
- ✅ Embedding timeout validation không match backend range (#7758)

**Active bugs:**

- 🐛 **Subagent spawn timeout** (#7678) — mọi subAgent task đều fail timeout, chưa diagnose root cause.
- 🐛 **WeChat video/audio → file:// URL** (#7792) — attachment thành local file path, gửi thô vào API → 400.
- 🐛 **Subagent model override dropped silently** (#7796) — exception bị swallow, model override mất không log.
- 🐛 **PDF blocks sent to multimodal APIs** (#7636, #7689) — OpenAI-compatible servers reject `{"type":"file"}` content parts.

**Security/safety:**

- ✅ Hub audit logging bổ sung login attempts & denied runtime creation (#7683, merged).
- ⚠️ HTTP gateway unauthenticated by default (#4037) — open security issue, suggest refuse non-loopback bind unless `QWENPAW_AUTH_ENABLED=true`.

## 6. Yêu cầu tính năng

**UI/UX:**

- 🎨 Theme customization (#7406 → #7741) — user muốn custom color palettes, đang implement.
- 📱 Small screen optimization (#7739 → #7788) — 13–14" screens chỉ hiển thị 4–10 conversations, đang redesign sidebar.
- 🗂️ Unified workbench (#7790) — replace fixed capability tabs với user-configurable add menu + closable tabs.
- 🎥 Realtime voice chat (#7785) — speech input/output integrated vào existing Chat UI.

**Collaboration:**

- 👥 **Advisor Mode** (#7569) — pair strong + cheap models on one task, advisor supervise + intervene.
- 🤝 Multi-agent collaboration expansion (#7795) — recognize more natural language phrases for team requests.

**Infrastructure:**

- 🏢 Hub multi-tenant (#7318, #7779) — model gateway, member governance, usage tracking/billing foundation.
- 📊 QwenPaw-Data 0.3.0 (#7637) — business question → clarification → execution → report workflow.

**Integrations:**

- 📧 Custom IMAP/SMTP support (#7791) — allow self-hosted mail servers, không chỉ built-in providers.
- 🔌 MCP Java SDK compatibility (#7729) — recognize `jsonRpcError` envelope từ Java/Kotlin servers.

**Memory:**

- 🧠 OpenViking plugin (#7613) — optional memory backend, chờ merge sau final review.
- 🔁 Reranker UI config (#6399) — visual panel for reranker backend config trong Agent Config.

**Skills:**

- 🌐 Multi-folder workspaces (#7789) — configurable default workspaces cho agents.
- 📂 Channel-specific skill restrictions (#7746) — skill chỉ enable trong specified channels.

## 7. Phản hồi người dùng

**Pain points:**

- ⏱️ **Subagent spawn timeout epidemic** (#7678) — user báo 100% subAgent tasks fail timeout, blocking critical workflows.
- 🔍 **Hidden sent files** (#7750, fixed) — files từ `send_file_to_user` chỉ visible trong collapsed tool steps, user phải mở tay.
- 🖱️ **Focus indicators mất** (#7759, fixed) — accessibility regression after design reset.

**Feature requests from community:**

- 🏢 Team/enterprise use cases (#7318) — multi-user, shared skills, admin control, usage visibility.
- 🎨 Personalization (#7406) — custom themes, configurable UI.
- 📱 Small screen support (#7739) — conversation list quá ít visible items trên 13–14" laptops.

**Positive signals:**

- Hub 2.2.0 multi-tenant đang address top community requests (team access, centralized model management).
- Bug fixes merge nhanh (5–7 PRs closed trong 24h).
- Memory plugin architecture cho phép community contribute backends (#7613 OpenViking).

## 8. Backlog & Roadmap

**Confirmed upcoming (2.2.x):**

- 🏢 **Hub multi-tenant GA** — model gateway + usage dashboard (#7779).
- 🎨 **Theme customization** — #7741 đang review.
- 🗂️ **Unified workbench** — #7790 đang implement.
- 🎤 **Realtime voice chat** — #7785 submitted today.

**Under review:**

- 📊 QwenPaw-Data 0.3.0 workflow (#7637)
- 👥 Advisor Mode (#7569)
- 🧠 OpenViking memory plugin (#7613)
- 🔁 Reranker UI config (#6399)

**Security backlog:**

- ⚠️ HTTP gateway authentication (#4037) — open 5 tháng, chưa address.

**Community discussion:**

- #7318 — "Hub multi-tenant sắp ra, bạn muốn chúng tôi build gì tiếp?" (27 comments, nhiều ideas về shared workspaces, advanced governance, billing, audit).

**Stabilization priorities:**

- 🔥 Subagent spawn timeout (#7678) — critical, blocking users.
- 🔥 PDF handling trong multimodal flow (#7636, #7689) — affects OpenAI-compatible deployments.
- Subagent model override silent failure (#7796) — config changes dropped không log.

---

**Xu hướng tổng quan**: QwenPaw đang pivot from personal assistant sang **team/enterprise collaboration platform**. Hub multi-tenant, model gateway, usage tracking đều hướng tới org-level deployments. Console UX được polish (themes, workbench, small screens). Memory và mode architecture mở rộng cho community plugins. Security/audit cũng được tăng cường cho multi-user context.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*