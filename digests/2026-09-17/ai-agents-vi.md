# Bản tin Hệ sinh thái Hermes Agent 2026-09-17

> Issues: 158 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-17 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-17

## 📊 Tóm tắt hôm nay

Ngày 17/9 tập trung vào stability: 21 issues đóng (nhiều nhất trong tuần), 30 PRs mới merge xử lý critical bugs trên Windows, gateway recovery, và compression livelock. Desktop sync và Telegram polling có breaking fixes.

## 🚀 Releases

Không có release mới. Latest vẫn là v0.21.3 (2026-09-14).

## 🔧 Tiến độ dự án

### PRs quan trọng đã merge (30 PRs, nhiều critical)

**Platform stability (Windows, macOS)**
- #112750: Gateway stop trên Windows giờ drains properly thay vì kill ngay (TerminateProcess) → fix data loss
- #58836: Desktop rebuild khi uv venv base interpreter mất → fix repair loop
- #112344: Desktop backend respawn guard trên Windows → fix "stale exit" loop

**Gateway recovery & messaging**
- #113643: Telegram polling stall recovery giờ escalate nhanh qua dedicated verifier (7 phút → <2 phút)
- #113618: Telegram deaf mode sau network flip được fix
- #113639: HTTP gateway approved runs giờ recover sau process loss (durable ledger)
- #113663: Gateway `/status` giờ hiện configured default khi không có session override
- #113236: Busy follow-up chỉ claim khi enqueue thành công

**Context compression (critical fix)**
- #112482: Compression livelock fix → candidate không còn bị discard bởi no-op entries
- #113654: Slow local summaries giờ được finish streaming đầy đủ

**Desktop UX**
- #113656: Session density change giờ refresh ngay (không cần toggle)
- #112478: Mermaid diagram có toggle về source code
- #113666: `useMessageStream` refactor → 943 lines xuống 151 lines (extract transcript logic)

**Security & config**
- #113652: `secret_capture` tool mới → credentials không còn leak vào chat/argv
- #112350: `hermes config get` giờ flag phantom keys
- #113660: `platform_toolsets.<platform>` giờ accepted như known config path

### Issues nổi bật (158 open, 21 closed hôm nay)

**P0/P1 đã xử lý**
- #110912 ✅: Nous Portal billing bug (full price thay vì subscription credits) → billing-route fix
- #112344 ✅: Desktop backend không respawn trên Windows → stale-exit guard
- #112750 ✅: Gateway stop không drain → immediate kill fix
- #113618 🟡: Telegram stall watchdog rebuild nhưng không recover → PR #113643 đang review

**P1 đang xử lý**
- #86565: Desktop session dot không chuyển amber khi blocked approval
- #94196: Gateway switch cần "Save and reconnect" để restore local backend
- #113619 PR: Vision images eviction để preserve prompt-cache → billing spike prevention

**P2 cron/kanban issues (3 issues mới)**
- #113598: Review-lane budget reservation không respawn-guard-aware
- #113603: Cron job `last_status=error` skip next occurrence silently
- #113610: Kanban run stays 'running' sau clean exit without transition
- #113611: Respawn guard không cover repeated clean-exit-without-transition (16 respawns quan sát)

## 🌟 Điểm nổi bật cộng đồng

**Most discussed (21+ comments)**
- #110912: Billing bug trên Nous Portal → nhiều users confirm discounted routes bị charge full price
- #94196: Gateway switch issue → recurring trong multi-profile setups

**User pain points**
- Windows stability: 5 issues liên quan Desktop/gateway trên Windows (3 đã fix hôm nay)
- Telegram/messaging: 4 issues về connectivity & recovery
- Compression: livelock và slow summaries → 2 critical fixes merged

## 🐛 Ổn định & Bugs

**Critical fixes merged**
- Compression livelock (P1)
- Windows gateway drain (P1)  
- Desktop sync badge hang (P2)
- Telegram deaf mode (P1)

**Known issues còn lại**
- #100723: Desktop WebSocket reconnect loop → auth.json file-lock conflict (Windows, needs-repro)
- #113238: Windows CUDA fallback → RTX 4090 chạy CPU thay vì GPU
- #64712: Feishu WS reconnect exhaustion (P3)

**New bugs reported hôm nay**
- #113662: Feishu WS mid-life loss undetectable
- #113640: Weixin audio attachments silent fail
- #113646: Desktop cannot compress context dù under cap

## 💡 Yêu cầu tính năng

**Merged features**
- Secret capture tool (#113652)
- Per-chat display overrides (#113664)
- Mermaid source toggle (#112478)
- Boss-zhipin-scraper optional skill (#113027)

**Requested features**
- #6566: STT/TTS base_url validation
- #112359: MoA UX → hiển thị rõ aggregator slot billed
- #92241: Feishu clarify với interactive buttons

## 📣 Phản hồi người dùng

**Positive**
- Windows stability cải thiện rõ rệt (3 critical fixes)
- Gateway recovery giờ reliable hơn
- Desktop UX polish (Mermaid toggle, density refresh)

**Pain points**
- Cron/kanban reliability issues mới nổi (4 issues mới trong 2 ngày)
- Multi-platform messaging still fragile (Telegram, Feishu, Weixin)
- Windows CUDA detection cần attention

## 📋 Backlog & Roadmap

**High priority**
- Windows CUDA fallback (#113238)
- Cron stability suite (4 issues tracking)
- Remaining P1 gateway issues (#86565, #94196)

**Refactor in progress**
- Desktop code cleanup (#113140 → #113666 merged)
- Gateway event handling

**Long-term**
- Bot mode improvements
- MCP provider expansion
- Multi-account support

---

**Tổng kết**: Ngày stability mạnh, 21 closes cao nhất tuần. Windows + gateway infrastructure ổn định rõ rệt. Cron/kanban mới lộ reliability issues cần tracking.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-17

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang phân hoá rõ rệt: **Hermes Agent** và **OpenClaw** dẫn đầu về quy mô (158-126 issues, 500 PRs), NanoBot và QwenPaw theo sau với 18-20 issues. Các dự án nhỏ hơn (PicoClaw, NanoClaw, Zeroclaw, NullClaw, IronClaw) có < 34 issues. Không dự án nào release ngày 17/9 → giai đoạn hardening trước major release.

Xu hướng chung: **stability over features**. 6/9 dự án active đang fix critical bugs (memory leak, data loss, platform crashes). Chỉ QwenPaw và NanoClaw đẩy features mới (Hub multi-tenant, gateway system).

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động ngày 17/9 | Độ ưu tiên |
|-------|--------|-----|----------|---------------------|------------|
| **Hermes Agent** | 158 | 500 | 0 | 21 issues đóng, 30 PRs merge - nhiều nhất tuần. Stability blitz: Windows/gateway/compression fixes | P0/P1 critical |
| **OpenClaw** | 126 | 500 | 0 | 27 issue mới trong 3 ngày, block release 2026.9.4. Focus: update failures, memory leak, large fleet boot | P0 blockers |
| **QwenPaw** | 18 | 37 | 0 | Hub 2.2 multi-tenant shipping. Voice chat + mobile WIP. Memory leak 3-path fix | Features + stability |
| **NanoBot** | 5 | 20 | 0 | 20 PR active (17 open). Message ordering race, tool correctness, provider timeout fixes | P1/P2 steady |
| **Zeroclaw** | 34 | 50 | 0 | Data loss bugs highest priority. Session UX weak. Rendering glitches | S0/S1 critical |
| **NanoClaw** | 2 | 34 | 0 | Gateway credential refactor stack (5 PRs). Bun CI wedge fix. Signal consolidation | Architecture shift |
| **PicoClaw** | 1 | 3 | 0 | Không hoạt động 17/9. Telegram fixes merged 16/9. Remote pairing WIP | Low activity |
| **NullClaw** | 1 | 0 | 0 | Issue duy nhất đóng nhanh (mobile client exploration) | Stealth mode |
| **IronClaw** | 0 | 0 | 0 | Không hoạt động 24h qua | Inactive |

**Insight**: Hermes + OpenClaw chiếm 90% activity. Các dự án nhỏ hoặc niche (gateway, TUI) hoặc inactive.

## 3. 🎯 Vị thế của Hermes Agent

**Dẫn đầu về ổn định**: 21 issues đóng trong ngày (cao nhất), 30 PRs merge xử lý critical infrastructure. OpenClaw có nhiều issues hơn nhưng đang blocking, Hermes đang shipping fixes.

**Thế mạnh**:
- **Platform coverage**: Windows stability được ưu tiên (5 fixes trong 3 ngày vs OpenClaw vẫn đang struggle với Windows update)
- **Gateway architecture**: Recovery mechanisms mature hơn (Telegram polling recovery < 2 phút, HTTP gateway durable ledger)
- **Desktop sync**: Proactive fixes cho stale-exit loop, respawn guard

**Điểm yếu so với đối thủ**:
- Compression livelock mới fix → QwenPaw và NanoBot không có issue tương tự
- Cron/kanban reliability mới xuất hiện (4 issues trong 2 ngày) → OpenClaw đã có bounded command projection
- Không có multi-tenant/org features như QwenPaw Hub 2.2

**Vị trí**: **Production-ready leader** trong segment desktop + gateway. OpenClaw tranh enterprise/large-fleet, QwenPaw chơi collaboration/org features.

## 4. 🔧 Hướng kỹ thuật chung

**1. Gateway/Provider abstraction**:
- Hermes: Gateway recovery + durable ledger
- NanoClaw: Pluggable credential gateways (OneCLI/Iron Proxy)
- OpenClaw: MCP server init handling
- QwenPaw: Model gateway trong Hub 2.2

**2. Message streaming reliability**:
- Hermes: Compression livelock, context summaries
- NanoBot: Message ordering race, TUI input lag
- Zeroclaw: Duplicate rendering, pre-tool text loss

**3. Platform stability priorities**:
- Windows: Hermes (3 fixes), OpenClaw (update failures, CUDA detection)
- macOS: OpenClaw (Cookie sync crash-loop fixed)
- Linux: NanoClaw (sudo/npm prefix fallback)

**4. Multi-platform messaging**:
- Hermes: Telegram polling recovery
- NanoBot: Provider timeout detection
- PicoClaw: Telegram reply/document fixes
- NanoClaw: Signal attachment consolidation
- QwenPaw: Feishu/IMAP custom

**5. Testing infrastructure**:
- NanoBot: Proxy-clearing fixtures fail với OS-level config
- NanoClaw: Bun `spawnSync` wedge workaround
- QwenPaw: E2E timeout enable (60min shards)

## 5. 🎨 Điểm khác biệt

### Chiến lược sản phẩm

| Aspect | Hermes | OpenClaw | QwenPaw | Others |
|--------|--------|----------|---------|--------|
| **Target segment** | Individual desktop + gateway | Enterprise large-fleet | Collaboration/org | Niche (TUI, mobile, gateway-only) |
| **Feature velocity** | Stability first | Blocked by P0s | Shipping features + fixing bugs | Maintenance mode |
| **Community** | 21 closes, high throughput | 27 new issues, pain visible | Active voting (#7318), first-time contributors | Silent (NanoClaw internal, Zeroclaw low engagement) |
| **Architecture bet** | Gateway recovery + desktop sync | Plugin system + MCP | Hub multi-tenant + voice | Credential gateways (NanoClaw), TUI (Zeroclaw) |

### Tính năng đặc trưng

**Hermes**: 
- Secret capture tool (#113652) - credentials không leak
- Mermaid diagram toggle
- Per-chat display overrides
- Boss-zhipin-scraper optional skill

**OpenClaw**:
- GitHub reader tab (#148464) - xem issue/PR bên cạnh chat
- Plugin install grouped settings (#150234)

**QwenPaw**:
- Hub 2.2 multi-tenant: model gateway + usage dashboard + member governance
- Realtime voice chat (#7785): speech input/output, interruption
- Recording workflow (#7798): semantic events → Skill draft

**NanoClaw**:
- Iron Proxy gateway: API key + ChatGPT sign-in + OAuth refresh
- `/add-voice` skill: full-duplex browser call với GPT-Live-1

### Độ trưởng thành code

**Hermes**: Mature infrastructure. Windows platform fixes systematic. Gateway recovery có escalation path. Desktop respawn guard.

**OpenClaw**: Architecture debt visible - 265 settings → 130 sections refactor, GitHub reader dependency closure missing. Memory leak (child process không reap) unresolved.

**QwenPaw**: Polished UX (theme/skin module, unified chat workbench) nhưng có memory leak 3-path và console crash khi lazy chunk fail.

**NanoBot**: Tool error handling inconsistent (whitespace, scope, validation). Provider timeout detection brittle (text parsing).

**Zeroclaw**: Data loss risks high (failed turns mất data, clipboard temps không cleanup). Single maintainer @Audacity88.

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Hermes Agent: **Mature, high throughput**
- 21 closes/ngày cao nhất tuần
- User pain points được address nhanh (Windows stability, gateway recovery)
- Nous Portal billing bug nhiều users confirm → fix merged
- Community feedback loop: issue → PR → merge trong 1-2 ngày

### OpenClaw: **Large but struggling**
- 126 issues, 27 mới trong 3 ngày → backlog tăng
- User frustration visible (#150452: update mất 1 ngày fix manual)
- #97616 leak child process: 30 comments, P1, cần maintainer review → chưa fix
- Community report bugs nhiều, fixes chậm

### QwenPaw: **Engaged, voting-driven**
- #7318: 29 comments, 4👍, community vote features tiếp Hub 2.2
- 7 PR có label first-time contributor
- Cộng đồng chờ đợi features (voice chat, mobile) và vote priorities

### NanoBot: **Silent, maintainer-driven**
- Issues 0-1 comment majority
- Dream consolidation issue (#5781) có frustration nhưng không nhiều users join
- Integration requests từ partners (Parallel Search, AnySearch) hơn end-users

### Zeroclaw: **Low engagement**
- Issues 0-6 comments
- Focus maintainer-driven fixes, không có community requests
- User pain #10141 (sessions không usable) có 4 comments nhưng không action

### NanoClaw: **Internal team only**
- 0 comments trên tất cả PRs/issues trong data
- Core team 7 người (@glifocat, @zvi-fried, ...)
- External contributors 2 người (1 GitHub skill, 1 mount readonly fix)

### PicoClaw, NullClaw, IronClaw: **Inactive/stealth**
- PicoClaw: không hoạt động 17/9, 0 reactions
- NullClaw: issue duy nhất đóng nhanh, không thảo luận
- IronClaw: không hoạt động 24h

## 7. 🔮 Tín hiệu xu hướng

### 1. **Stability crisis before major releases**
Hermes, OpenClaw, Zeroclaw đều block releases vì P0/P1 bugs. Pattern: rapid feature growth → technical debt → stabilization sprint. QwenPaw exception: ship features + fix bugs parallel.

**Dự đoán**: Q4 2026 sẽ thấy wave of stability releases. Dự án nào survive crisis này sẽ dẫn đầu 2027.

### 2. **Platform wars: Windows prioritization**
Hermes fix 3 Windows issues trong 3 ngày. OpenClaw struggle với Windows update + CUDA detection. Trend: **Windows first-class citizen** thay vì afterthought.

**Dự đoán**: Windows stability sẽ là differentiator cho enterprise adoption.

### 3. **Multi-tenant/org features separating tiers**
QwenPaw Hub 2.2 có model gateway + member governance + usage dashboard. Hermes và OpenClaw chưa có org-level features.

**Dự đoán**: 2027 sẽ phân hoá rõ **individual tools** (Hermes, Zeroclaw) vs **team platforms** (QwenPaw, potential OpenClaw pivot).

### 4. **Voice/multimodal integration starting**
QwenPaw realtime voice chat (#7785), NanoClaw `/add-voice` với GPT-Live-1. Hermes chưa có voice.

**Dự đoán**: Voice sẽ là standard feature trong 6 tháng. Dự án không có voice integration sẽ bị xem là outdated.

### 5. **Gateway/provider abstraction consolidating**
Hermes, NanoClaw, QwenPaw đều có gateway abstraction. Pattern: credential management tách khỏi provider logic.

**Dự đoán**: Pluggable gateway sẽ là architecture standard. Single-provider tools sẽ niche.

### 6. **Memory leak epidemic**
Hermes compression livelock, OpenClaw child process leak, QwenPaw 3-path leak, NanoBot hook/tool zombie. **Không dự án nào escape memory issues.**

**Dự đoán**: Memory management sẽ là focus area Q4 2026 - Q1 2027. Dự án nào fix clean nhất sẽ win production deployments.

### 7. **Small projects consolidating or dying**
PicoClaw (1 issue), NullClaw (1 issue đóng nhanh), IronClaw (inactive) không sustainable. NanoClaw (2 issues) có team nhưng community silent.

**Dự đoán**: 2027 sẽ còn 3-4 dự án chính (Hermes, OpenClaw, QwenPaw, có thể 1 niche survivor). Rest sẽ archived hoặc absorbed.

### 8. **Testing infrastructure catching up**
NanoBot proxy fixtures fail, NanoClaw Bun CI wedge, QwenPaw E2E timeout. Testing debt được address.

**Dự đoán**: Q1 2027 CI/testing sẽ mature. Dự án không có reliable CI sẽ accumulate regressions và die.

---

## Kết luận chiến lược

**Hermes Agent đang thắng cuộc đua ổn định**. OpenClaw có scale lớn hơn nhưng đang struggle với blocking issues. QwenPaw chơi khác segment (collaboration) nên không cạnh tranh trực tiếp.

**Khuyến nghị cho Hermes**:
1. Maintain stability lead - đây là moat chính
2. Add org/multi-tenant features để compete với QwenPaw trong 6 tháng
3. Voice integration để không bị outdated
4. Fix cron/kanban reliability trước khi thành PR nightmare như OpenClaw memory leak

**Rủi ro**: Single point of failure nếu core team burn out. OpenClaw có community lớn hơn để absorb shock. Hermes cần grow contributor base.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo hoạt động OpenClaw - 2026-09-17

## 📊 Tóm tắt hôm nay

OpenClaw tiếp tục sprint sửa lỗi nghiêm trọng trước release: 27 issue mới trong 3 ngày (16-17/9), tập trung vào crash Gateway, update thất bại trên Windows, và memory leak ở child process. Team merge 30+ PR trong 24h, chủ yếu fix critical P0/P1 blocking 2026.9.4 release.

## 🔄 Releases

Không có release mới. Team đang block 2026.9.4 vì nhiều P0 blocker:
- #150201: Windows update fail, SQLite timeout
- #146719: Candidate snapshot fail với path chứa `$OPENCLAW_STATE_DIR` không expand
- #134430: macOS crash-loop khi bật Cookie sync

## 🚀 Tiến độ dự án

### PR quan trọng đã merge
**#150234** - Đơn giản hoá plugin install + grouped settings (maintainer @Patrick-Erichsen)
- Bỏ wizard cũ, dùng install flow có sẵn
- Group 265 settings thành 130 section qua 54 manifest
- Cải thiện UX, giảm code duplicate

**#148464** - GitHub reader: đọc issue/PR/commit bên cạnh chat 
- Tab reader để xem GitHub content không rời khỏi conversation
- Render description, comment, diff, image
- Dùng dependency closure mới (#150491 fix thiếu import)

**#150493** - Fix inbound task stall khi Gateway restart
- Task dùng raw inbound runner thiếu reply dispatcher → stall
- Giờ retain owning Gateway, tham gia restart cadence

### Issue cần quan tâm
**#97616** [P1, 30 comments] - OpenClaw leak child process
- Hook/tool child không reap → zombie tích luỹ
- Gây runtime degradation
- Cần maintainer review

**#144911** [P1, 24 comments] - MCP server init timeout crash Gateway
- Stdio MCP không complete `initialize` trong 30s → crash
- Unhandled rejection "service child cleanup identity lost"
- Fix shape clear, queueable

**#149538** [P0, 12 comments] - 632-agent fleet: Gateway ready nhưng không serve
- `/health` probe timeout, event loop starved
- RSS tăng cho tới OOM
- Riêng với #148529 (boot 12 phút thay vì 2s)

## ⭐ Điểm nổi bật cộng đồng

**#150452** [P0, 2 comments] - Update 2026.7.1-2 → 2026.9.4 mất 1 ngày sửa manual
- Config migration invalid
- Telegram crash-loop
- iOS node cần re-approval
- Usage screen trống
- User @arrobapontocom-ui báo trên production 2-agent gateway

**#126360** [P1, 17 comments] - `AgentSelectionRequiredError` flood log
- `agents.ownership: explicit`, 6 agent, không có default
- Logbook plugin, Control UI global RPC, system-agent turn đều thiếu `agentId`
- Cần product decision

**#7406** [P2, 4 comments] - Telegram topic name không đọc được
- Hiện `agent:main:telegram:group:-123456789:topic:42`
- Muốn `Telegram : GroupName : TopicName`
- Enhancement request từ 2026-02-02

## 🐛 Ổn định & Bugs

### Critical (P0)
- **#150201**: Windows update fail, SQLite check timeout (2026.9.3)
- **#146719**: Updater 2026.9.3→2026.9.4 fail, mkdir với unexpanded `$OPENCLAW_STATE_DIR` [CLOSED via #147091]
- **#134430**: macOS crash-loop với Cookie sync, MainActor isolation trap [CLOSED via #136394]
- **#150126**: Browser target crash → unhandled Playwright rejection → Gateway exit [CLOSED via #150163]

### P1 regressions
- **#148707**: Reply lost với "no active tool authority snapshot" khi run thứ 2 displace turn đang bay (2026.9.4)
- **#121187**: Yielded requester retry `NO_REPLY` thay vì settle quietly
- **#148898**: 2026.9.4 claude-cli watchdog count host-suspend time → kill turn sau laptop sleep [CLOSED via #149034]
- **#144797**: Claude-cli session giữ deleted `--mcp-config` → tool die với HTTP 401

### Memory & process leak
- **#97616**: Hook/tool child không reap → zombie
- **#142965**: Per-session MCP child không reap khi session end → process count unbounded

### Context & token
- **#101929**: Context-overflow estimator over-count 2.3-2.6x vs billed (tool-result char tính 2 char/token)
- **#146859**: Chat Completions usage parser bỏ `contextUsage` → heuristic fallback → premature overflow

## 💡 Yêu cầu tính năng

**#150441** [P3] - HDS worker cho development-review hold
- Cần component chính thức convert broker-owned human-decision hold thành plugin approval card
- Bundled hoặc catalog-provenance trust
- Không dùng local plugin vì không đủ trust

**#149361** [P3, maintainer] - WebUI continuous perf study
- Startup, navigation, mount/remount, scroll, layout shift
- Evidence-led work với real Gateway data
- Desktop + mobile

## 📣 Phản hồi người dùng

**Positive**
- #148464 GitHub reader: user muốn đọc GitHub content không rời chat → implemented
- #150234 Plugin settings grouped: 265 setting thành 130 section dễ navigate hơn

**Pain points**
- **Update UX**: #150452 user mất 1 ngày fix manual sau update, nhiều P0 update failure (#150201, #150386, #150378, #150369, #150366, #150332)
- **Session state loss**: #148707 "Reply operation has no active tool authority snapshot" tái diễn, block reply
- **Zombie process**: #97616 accumulation gây degradation, #142965 MCP child không reap
- **Large fleet boot time**: #148529 632-agent fleet boot 12 phút (2026.9.4) vs 2s (2026.7.1-2)

## 📋 Backlog & Roadmap

### Đang active fix
- P0 update blockers (Windows, SQLite, config migration)
- Memory leak (#97616, #142965)
- Large fleet performance (#148529, #149538)
- Session state stability (#148707, #144908)

### Improvement đang review
- Plugin UX: install progress (#150235), grouped settings (#149331), contextual help (#149330)
- GitHub integration (#148464)
- WebUI performance (#149361, #149727)

### Deferred/needs decision
- #126360: AgentSelectionRequiredError với explicit ownership
- #126446: sessions_yield handoff rewrite as Aborted
- #7406: Telegram topic readable name

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot ngày 2026-09-17

## 1. Tóm tắt hôm nay

Team tập trung fix lỗi critical về message delivery và concurrency. 20 PR active (17 open, 3 closed), 5 issue (4 open, 1 closed tiếng Trung). Không có release mới. Ưu tiên p1/p2 toàn bộ.

## 2. Releases

Không có release mới hôm nay. Issue #5788 nhắc v0.3.5 đã release trước đó.

## 3. Tiến độ dự án

**Critical fixes (P1/P2):**

- **#5792 [P1]**: Fix message ordering bug - messages cross-session khi user switch nhanh. Root cause: concurrent dispatch tasks race nhau, không FIFO. Solution: single worker per session + inbox serialization
- **#5791**: TUI input lag khi agent output nhiều - fix bằng bounded FIFO batches
- **#5793**: `list_dir` recursive trống khi parent dir tên `build`/`dist` - ignore pattern scope sai
- **#5796**: `edit_file` xóa whitespace separator → join tokens sai nghĩa
- **#5795**: `edit_file` mất indentation + thêm blank line ở fallback match

**Provider & integration:**
- #5797: Add user-agent `nanobot/<version>` cho Parallel Search tracking
- #5769: NIM timeout wrapped trong `RuntimeError` không trigger fallback - phải parse message text
- #5764: Fallback probe half-open state race condition - concurrent requests vào primary cùng lúc
- #5718: OpenRouter native Images API support cho `generate_image`
- #5520: Langfuse tracing cho Codex (Codex dùng raw httpx + OAuth, không dùng OpenAI SDK swap trick)

**Tools & memory:**
- #5379: Consolidation mất data - `last_consolidated` advance trước khi preserve full input
- #5152: Subagent completion status thiếu - parent turn đóng sớm khi sibling tasks chưa xong

**Config & API:**
- #5765: API `/chat/completions` nhận `"stream": "false"` (string) → truthy → SSE mode nhầm
- #5766: Cron tool accept conflicting schedule fields (`every_seconds` + `cron_expr` + `at`) → silent discard
- #5762: Cron tool accept past `at` timestamp → job never fires (stuck `next_run_at_ms=None`)

**Testing & security:**
- #5756: Proxy-clearing test fixtures không clear system-level proxy (Windows registry, macOS SystemConfiguration) → fail trên host có OS proxy

## 4. Điểm nổi bật cộng đồng

**Issue #5781** (3 comments): Dream consolidation chạy 1–2h, loop 200 iterations đọc lại 2 files liên tục. `dream.maxIterations` deprecated/ignored → dùng global 200 cap. User frustrated.

**Issue #4419** (5 comments, từ Jun): Request auto-escalate reasoning effort (default → escalated) khi task phức tạp. Multiple providers support reasoning param, đề xuất adaptive strategy.

**Issue #5731** (1 comment, từ Sep 11): AnySearch team propose thêm extract API backend (anonymous quota, key-optional) cho `web_fetch`.

**Issue #5790** (closed nhanh): User Trung request repo invite link.

## 5. Ổn định & Bugs

**Critical race conditions:**
- Message cross-session (#5792) - P1, đã có fix
- TUI input blocking (#5791) - đã closed
- Fallback probe concurrency (#5764)

**Data loss risks:**
- Consolidation input truncation (#5379)
- Subagent completion loss (#5152)

**Tool correctness:**
- Whitespace handling trong edit_file (#5796, #5795)
- Directory listing scope (#5793)
- Cron validation (#5762, #5766)

**Provider reliability:**
- Timeout detection (#5769) - NIM + providers khác wrap error text khác nhau
- Stream parameter type safety (#5765)

## 6. Yêu cầu tính năng

**#4419**: Auto reasoning effort escalation - adaptive `reasoningEffort` dựa theo task complexity

**#5731**: AnySearch extract integration - thêm backend cho web_fetch, anonymous quota

**#5652**: Signed webhook delivery - bypass agent loop cho trusted notifications (CI/monitoring/billing)

**#5718**: OpenRouter native image gen - dùng Images API thay vì workaround

**#5520**: Langfuse tracing cho Codex - observability parity với OpenAI provider

## 7. Phản hồi người dùng

**Pain points:**
- Dream consolidation quá lâu, loop vô ích (#5781)
- Message ordering bị lỗi khi switch session nhanh (implicit trong #5792)
- TUI lag khi agent active (implicit trong #5791)

**Integration requests:**
- Parallel Search team cần usage tracking (#5797)
- AnySearch team propose partnership (#5731)
- Users cần Langfuse cho non-OpenAI providers (#5520)

## 8. Backlog & Roadmap

**Immediate (P1/P2 open PRs):**
- 17 PR open, majority P2
- Focus: message ordering, tool correctness, provider reliability
- Test coverage gaps: proxy fixtures, concurrency scenarios

**Deprecated/needs migration:**
- `dream.maxIterations` ignored → cần document hoặc restore
- Multiple config validation gaps (cron, API params)

**Technical debt visible:**
- Tool error handling inconsistent (whitespace, scope, validation)
- Provider timeout detection brittle (text parsing)
- Test hermetic issues (OS-level config leak)

**No explicit roadmap** trong data. Team reactive mode - firefighting bugs + integration requests.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-09-17

## 🎯 Tóm tắt hôm nay

ZeroCode (TUI client) trong giai đoạn hardening lớn - 34 issues đang mở, focus vào stability, session management và rendering bugs. Không có release mới. Hoạt động chính: fix data loss bugs, cải thiện UX transcript, stream lifecycle fixes. Contributor chính @Audacity88 đang lead effort.

## 🚀 Releases

Không có.

## 📊 Tiến độ dự án

**Critical bugs đang fix:**

- **#10788** (P1): Failed ACP turn mất luôn prompt + completed tool exchanges → đang fix trong #10808
- **#10121** (P1, S0): Process exit giữa chừng → partial turn mất hẳn (data loss)
- **#10659** (P1): Budget-exceeded turn mất progress sau restore
- **#10785** (P1): Notification lag → cancel tất cả running turns
- **#10697** (P1): Pre-tool text bị drop, chỉ hiện post-tool text

**Major features in-flight:**

- **#10596** (XL): Paginated ACP transcript restore - không load full session nữa
- **#10801** (XL): Fix notification-lag reload không cancel turns nữa
- **#10879** (XL): Combine Sessions/Queue/Plan vào 1 dock
- **#10386** (XL): Clickable URLs trong transcript
- **#10553** (XL): Add selected text to chat

**Provider/model work:**

- **#10611** (XL): Adaptive-thinking Claude models (Opus 5, Sonnet 5, Fable 5.1) - reject fixed thinking budget
- **#10623** (XL): Anthropic prompt-cache passthrough cho OpenAI-compatible providers
- **#10605** (XL): Extended thinking qua compatible gateways
- **#8966** (XL): Live provider identity trên usage events

**Architecture:**

- **#10269** (XL): Bounded command projection - lifecycle contract
- **#10267**: Fan-out process broadcast hooks - nhiều observers không shadow nhau

## 💬 Điểm nổi bật cộng đồng

**User pain points:**

- **#10141** (4 comments): Sessions không usable - copy khó, navigation khó (SSH terminals), không rename được
- **#9697** (3 comments): Windows Task Scheduler launch → daemon không connect được
- **#10720** (@icemann521): Agent responses render twice (display bug, tool chỉ fire 1 lần)

**Theo dõi nhiều:**

Hầu hết issues 0-6 comments. Engagement thấp, focus vào maintainer-driven fixes hơn là community requests.

## 🐛 Ổn định & Bugs

**Data loss risks (S0/S1):**

- Interrupted/failed turns mất data (#10121, #10788, #10659)
- Clipboard temps không cleanup khi disconnect (#10483)

**Rendering bugs:**

- Duplicate responses (#10667, #10720)
- Pre-tool text disappears (#10697)
- Processing state stuck khi browse history (#10302)

**Lifecycle/concurrency:**

- Notification lag cancel all turns (#10785)
- Socket ownership error không actionable (#10178)
- Daemon startup overflow (#10230)

## ✨ Yêu cầu tính năng

**Session management:**

- **#9020**: Rewind + fork workflows
- **#10285**: Rename sessions
- **#10299**: Copy/export transcripts
- **#10695**: Refresh sessions changed by other clients

**UX improvements:**

- **#10298**: Clickable URLs → being fixed in #10386
- **#10051**: Add selected text to chat → being fixed in #10553
- **#10301**: Better SSH terminal navigation

**Config/observability:**

- **#10167**: Vendor-neutral lifecycle export
- **#10244**: Agent deletion + bulk cleanup

## 🗣️ Phản hồi người dùng

**Pain pattern:** Session recovery workflows weak. Quoted từ #10141:

> "It's quite frustrating to get into previous session"
> "I find it hard managing session: copy session or last messages - you can just copy referenced snippets"

**Windows users:** Task Scheduler daemon issues chưa resolve (#9697)

**Positive:** Không thấy praise public, focus là bug reports.

## 🗺️ Backlog & Roadmap

**Milestone #9010 "ZeroCode Consolidation & Hardening" active:**

- Data-loss bugs → highest priority
- Session UX → medium priority  
- Rendering consistency → medium
- Provider adaptations (Claude adaptive-thinking) → in-progress

**Blocked/deferred:**

- **#9677**: Retire command-catalogue fallback (blocked)
- **#8486**: OpenAI gateway endpoint (blocked)

**Follow-up pattern:** Nhiều issues tagged `follow-up` - incremental fixes sau core features.

---

**Nhận xét:** Project trong cleanup phase. Nhiều race conditions, lifecycle bugs từ streaming architecture. @Audacity88 là single point of knowledge - authored/reviewed hầu hết critical fixes. Cần stability milestone xong mới có major features.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-09-17

## 1. Tóm tắt hôm nay 📊

Không có hoạt động mới ngày 2026-09-17. Tất cả issues/PRs được đóng hoặc cập nhật lần cuối vào 2026-09-16. Hoạt động tập trung vào bugfix Telegram adapter và thêm tính năng pairing device.

## 2. Releases 🚀

Không có release mới.

## 3. Tiến độ dự án 🔨

### PRs đóng (2026-09-16)
- **#3357** - Fix Telegram reply detection: bot bỏ qua reply trong group chat `mention_only: true` khi user không @mention. Giờ reply vào message của bot = implicit mention. Cải thiện UX conversation flow.
- **#3356** - Fix Telegram document handling: quoted document chỉ hiện `[file]` placeholder, agent không nhận được file thật. Giờ re-attach document như voice/audio.

### PR đang mở
- **#3344** - Build Remote Agent pairing: cho phép phone spectate desktop agent qua protocol `gbr/1`. Dùng `gbr-agent` v0.6.0+ với QR/8-char code pairing.

**Xu hướng**: Focus vào Telegram adapter stability và remote monitoring capability.

## 4. Điểm nổi bật cộng đồng 💬

Issue #3343 có 4 comments nhưng 0 👍 - technical bug không có user engagement cao. PRs #3357/#3356 cải thiện UX nhưng không có reaction data.

PR #3344 (remote pairing) có potential cao cho monitoring/debugging workflow nhưng chưa merge.

## 5. Ổn định & Bugs 🐛

### Bug nghiêm trọng đã đóng (#3343)
**Vấn đề**: Tool feedback animation tiếp tục edit Telegram message 3s/lần trong nhiều ngày sau khi agent turn fail → 228,000+ edit attempts → Telegram rate limit.

**Root cause**: Animation không dừng khi turn stopped.

**Impact**: Resource waste, API rate limit, infrastructure cost.

### Bugs Telegram đã fix
- Reply detection trong group chat với `mention_only: true`
- Document attachment trong quoted messages

## 6. Yêu cầu tính năng ✨

**Remote agent pairing** (#3344): Phone spectate desktop agent. Use case: mobile monitoring, debugging on-the-go. Protocol `gbr/1` với MIT `gbr-agent` package.

## 7. Phản hồi người dùng 💭

Không có feedback trực tiếp trong data. Issues/PRs cho thấy pain points:
- Telegram integration cần polish (reply handling, media attachment)
- Monitoring/debugging workflow cần improvement (remote pairing feature)

## 8. Backlog & Roadmap 🗺️

**Trong pipeline**:
- Remote pairing feature (#3344) - chờ review/merge

**Technical debt**:
- Animation lifecycle management (trigger từ #3343)
- Telegram adapter edge cases (document/voice/audio handling patterns)

**Priorities suy đoán**:
1. Merge remote pairing → improve observability
2. Telegram stability → prevent rate limit issues
3. Tool execution resilience → avoid runaway processes

---

**Kết luận**: Dự án đang cleanup Telegram bugs và thêm monitoring tools. Không có momentum mạnh ngày 2026-09-17 nhưng commits gần đây (2026-09-16) cho thấy active maintenance.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-09-17

## 1. Tóm tắt hôm nay

Ngày tập trung vào refactor hệ thống gateway credential và chuẩn bị tích hợp Iron Proxy. Core team đẩy stack 5 PR lớn (#3815→#3816→#3817→#3818→#3825) xây gateway contract mới cho provider auth, tách OneCLI thành skill, thêm Iron Proxy gateway. Đồng thời fix bug Bun spawnSync wedge 6h CI (#3839, #3841, #3842) và consolidate Signal adapter fixes.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**Stack gateway (đang review, 5 PR linked):**
- #3815: Tập trung credential gateway contract - approval lifecycle, session lease, provider domain dùng chung 1 host-owned contract
- #3816: Tách OneCLI thành skill - setup/auth/upgrade qua gateway seam, giữ existing config
- #3817: Thêm Iron Proxy gateway - hỗ trợ API key + native ChatGPT sign-in, OAuth refresh qua Iron Control
- #3818: Chọn gateway riêng khỏi provider login - simple setup giữ OneCLI default, advanced setup expose gateway selection
- #3825: OpenCode auth qua Iron Proxy - dùng shared credential connection thay OneCLI manual call

Stack này tách credential management thành pluggable gateway system. Mục tiêu: operators pick gateway (OneCLI/Iron Proxy) độc lập provider (OpenCode/OpenRouter/local). Big architectural shift.

**Bug fixes Bun CI wedge:**
- #3839: Trace 6h CI hang - `bun test` với `spawnSync` mất exit event, spin 100% CPU (Bun 1.4.0 bug oven-sh/bun#34069)
- #3841: Fix OpenCode memory hook - switch từ `spawnSync` sang async spawn, thoát khỏi Bun bug
- #3842: Hardening upload-trace - vẫn dùng `spawnSync`, cần tương tự async fix
- #3836: Bound registry-skills test jobs 20 phút thay 6h GitHub default

**Signal consolidation:**
- #3837: Merge attachment/DM-routing/outbound-queue fixes - tất cả attachment type qua mounted inbox, queue send khi disconnected
- #3838: Update `/add-signal` docs - DM platform_id format, group prefix, troubleshooting

**Khác:**
- #3781: Enforce tools-only delivery - provider không hold final-text envelope vẫn deliver qua outbound tools
- #3713: Record per-agent-group delivery mode - `container_configs.delivery_mode` migration 26
- #3764: `/add-voice` skill - full-duplex browser call với GPT-Live-1, agent xử lý memory+tools
- #3835: Sweep ghost destinations - xóa `agent_destinations` rows khi chat/agent group deleted
- #3646: Configurable idle timeout - thay hardcoded 30min, tránh kill slow local model turns
- #3803: Webhook test recovery trên fixture-owned port - fix `EADDRINUSE` random port collision

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào nhiều comment (tất cả 0 comment trong data). Toàn bộ activity từ core team (@glifocat, @zvi-fried, @ira-at-work, @seefood, @horsehcj, @DorZvulun, @shrwnsan). External contributor @Alakazam03 có #101 GitHub skill đóng hôm nay, @teran13 có #3196 mount readonly fix.

## 5. Ổn định & Bugs

**Critical CI bug:**
- Bun 1.4.0 `spawnSync` wedge 6h runner (#3839) - upstream bug, workaround async spawn (#3841), còn lại upload-trace (#3842)

**Data integrity:**
- Ghost destinations accumulate khi delete group (#3835) - `deleteAllDestinationsTouching()` zero caller, projection skip unresolvable channel

**WhatsApp (#3752, #3751):**
- Pending questions không answerable trong chat
- Newsletter JIDs (@newsletter) cần ignore ở inbound boundary

**Signal attachment path:**
- Cũ splice `/workspace/extra/signal-attachments/<id>` không mounted (#3142)
- Fix đã merge (#3693, #3837) - tất cả attachment qua mounted inbox

**Setup Linux sudo fail (#3844):**
- Distro package nodejs (Fedora dnf, Ubuntu apt) gây EACCES pnpm install
- Cần fallback user-owned npm prefix

## 6. Yêu cầu tính năng

**Voice channel (#3764):**
Full-duplex browser conversation với GPT-Live-1. Agent xử lý memory+tools, OpenAI xử lý listening+speaking. Named voice user, TLS WebSocket, audio-only delivery.

**Tools-only delivery (#3781, #3713):**
Provider không reliable final-text envelope vẫn deliver qua outbound tools. Config per-agent-group `delivery_mode`.

**Gateway system (#3815-#3825):**
Pluggable credential gateways (OneCLI/Iron Proxy) độc lập providers. Operator chọn gateway, provider xài shared credential connection.

## 7. Phản hồi người dùng

Không có public user feedback trong data. Community silent.

## 8. Backlog & Roadmap

**Đang WIP stack gateway:**
5 PR linked đợi review/merge. Sau khi merge, OneCLI + Iron Proxy đều available, backward compatible existing installs.

**Pending fixes:**
- #3842 upload-trace async spawn
- #3752 WhatsApp pending questions
- #3751 WhatsApp newsletter JID ignore
- #3844 setup Linux npm prefix fallback
- #2681 linger skip per-home-encrypted systems (stale Jun 3)

**Long-running features:**
- #3156 channel attachments qua structured parts (Jul 30)
- #3196 mount readonly hardening (Aug 7)
- #2301 GitHub polling mode, git access question (May 6)
- #2634 paws4claws AWS credential proxy skill (May 28)

**Test coverage:**
Registry-skills CI bounded 20min (#3836). Add-opencode test pass sau async spawn fix (#3841).

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-09-17

## 🔍 Tóm tắt hôm nay

Issue duy nhất trong ngày: khảo sát việc fork litter (client mobile agentic-coding) làm client cho NullClaw. Issue đóng nhanh (cùng ngày tạo), 1 bình luận, không có reaction → likely đã quyết định hoặc bác bỏ.

## 📦 Releases

Không có.

## 🚧 Tiến độ dự án

**Issue #999 - Fork litter làm NullClaw mobile client**
- **Bối cảnh**: litter (0xSero/litter) dùng kiến trúc Swift/Kotlin UI + Rust core (UniFFI), connect tới Codex/Local Studio servers. Muốn áp dụng pattern này cho human-guard-rail (hiện tại chỉ là Android/Gradle app thuần).
- **Xu hướng**: NullClaw xem xét tách client layer, tận dụng Rust core để multi-platform (iOS + Android).
- **Trạng thái**: CLOSED trong cùng ngày → hoặc đã thử và không khả thi, hoặc quyết định không đi hướng này. 1 bình luận duy nhất, không có thảo luận thêm.

**Nhận định**:
- Dự án đang trong giai đoạn khảo sát kiến trúc, chưa có active development công khai.
- human-guard-rail mention → NullClaw có component liên quan mobile, có thể là guardrail layer cho AI agents.

## 💬 Điểm nổi bật cộng đồng

Issue không có reaction (0 👍), chỉ 1 bình luận → community engagement thấp hoặc đây là internal discussion.

## 🐛 Ổn định & Bugs

Không có bug reports.

## ✨ Yêu cầu tính năng

Issue #999 về mobile client architecture, nhưng không phải feature request từ users mà là technical exploration từ maintainers.

## 📣 Phản hồi người dùng

Không có feedback từ external users.

## 📋 Backlog & Roadmap

Không có thông tin roadmap công khai. Issue đóng nhanh cho thấy decision đã được đưa ra nhanh, nhưng không rõ outcome là gì (adopted hay rejected).

---

**Kết luận**: Ngày 2026-09-17 activity rất thấp. Dự án có vẻ ở giai đoạn early/stealth development với internal architecture discussions. Không có signal về traction hoặc active user base.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-09-17

## 📋 Tóm tắt hôm nay

Ngày 2026-09-17: Không có release. 37 PR hoạt động (nhiều đóng), 18 issue. Tập trung sửa lỗi memory/UI, bổ sung tính năng Hub multi-tenant, voice chat, mobile. Console crash vì lazy chunk fail (#7815), memory leak 3 đường (#7722). PR #7779 đưa Hub 2.2 với model gateway + usage dashboard.

## 🚀 Releases

Không có release ngày 17/9.

## 📊 Tiến độ dự án

### Hub Multi-tenant (v2.2.0)
- **PR #7779** (mới hôm nay): Model gateway + member governance + usage dashboard
  - Admin giữ API key tổ chức, member dùng model không thấy credential
  - Theo dõi token usage, quota, chi phí
  - Related #7318 (29 comments, 4👍): Hub multi-tenant ra 2.2.0, cộng đồng vote tính năng tiếp

### Voice + Mobile
- **PR #7785**: Realtime voice chat - speech input/output, ngắt lời, tích hợp vào Chat UI hiện tại
- **PR #7378** [DO NOT MERGE]: QwenPaw Mobile (Expo/React Native) cho iOS/Android - WIP draft

### Core fixes merged hoặc gần merge
- **PR #7816**: Console channel thiếu trong PyInstaller bundle → Desktop không khởi động
- **PR #7811**: Token ring hiển thị sai context size (chỉ đếm `state.context`, thiếu system prompt + tools)
- **PR #7807**: Channel import cả khi disabled → tốn 5.8s chỉ Feishu SDK
- **PR #7808**: DoomLoopGate nhận dict stages nhưng đọc như object → crash
- **PR #7783**: ACP external agent trả reply trùng + fragment
- **PR #7725**: Workspace watch treo cả server (watchfiles.awatch scan đồng bộ trong `__init__`)

## 🔥 Điểm nổi bật cộng đồng

### Issue hot
1. **#7318** (29 comments, 4👍): "Hub multi-tenant 2.2.0 ra rồi, làm gì tiếp?" - cộng đồng vote tính năng
2. **#7722** (5 comments): Memory leak 3 đường - stream buffer unbounded + keep-alive stack + doom-loop bypass
3. **#7815** (4 comments): Console lazy chunk fail → UI không recover, phải reload toàn trang

### PR có tương tác
- **#7788**: Redesign sidebar session list cho màn hình nhỏ (13-14") - giải phóng không gian dọc
- **#7790**: Unified chat workbench shell - tabs có thể đóng, menu add, restore trạng thái
- **#7752**: Fix language selector - `vi` và `pt-BR` bị reject, backend chỉ list 6/7 ngôn ngữ

## 🐛 Ổn định & Bugs

### Critical bugs mới phát hiện
1. **#7815**: Console crash khi lazy chunk fail - retry không work, error boundary không recover
2. **#7722**: Memory leak 3 paths:
   - Stream buffer unbounded
   - Keep-alive instances stack
   - Doom-loop gate evasion
3. **#7814, #7813**: SSE stream freeze khi payload = bare `null` literal

### Bugs đã fix (PR merged/closing)
- **#7799** [CLOSED]: v2.2.1 không hiển thị ảnh từ `send_file_to_user` (chỉ thấy trong stream, sau đó mất)
- **#7804, #7805** [CLOSED]: UI polish (font weight match)
- **#7120**: Shell evasion checks mặc định OFF → bật ON + regression test
- **#6569**: Console print crash sau detached TTY (EIO/EPIPE)

## ✨ Yêu cầu tính năng

### Đang implement (PR open)
1. **Voice chat** (#7785): Realtime speech + interruption
2. **Recording workflow** (#7798): Record semantic events → generate Skill draft + docs
3. **Custom IMAP/SMTP** (#7791): Tự host mail server thay vì chỉ built-in providers
4. **Chat mode selector** (#7801): Discuss vs Execute mode - tách "hỏi ý kiến" khỏi "thực thi"

### Requested (issue open)
- **#7809**: i18n cho tool approval cards (đang hardcode English)
- **#7817**: Feishu p2p 230101 fix + framework-level channel improvement
- **#7812**: Slash commands sau startup desktop action sai session
- **#7650**: Transparent channel params (phone, workID) tới MCP tool

## 💬 Phản hồi người dùng

### Positive
- Hub multi-tenant (#7318): Cộng đồng chờ đợi, vote tính năng tiếp theo
- QwenPaw-Data 0.3 (#7637): Business question → clarification → execution → report

### Pain points
- **Memory leak** (#7722): Production server crash, workaround thủ công
- **Console fragile** (#7815, #7813): Lazy chunk fail, SSE null freeze
- **i18n incomplete** (#7809): Tool approval English-only
- **Context management** (#7810): LLM max context 131k nhưng input luôn 271k
- **First-time UX**: GitHub account active yêu cầu không rõ (#7768)

## 📅 Backlog & Roadmap

### Hub 2.2.0 (shipping)
- ✅ Model gateway + member governance (#7779)
- ✅ Usage dashboard
- 🔄 Next features: cộng đồng vote tại #7318

### Platform expansion
- 📱 Mobile (iOS/Android) - PR #7378 draft
- 🎤 Voice chat - PR #7785 active
- 📊 QwenPaw-Data 0.3 - PR #7637 review

### Core stability
- Memory leak 3-path fix (#7722) - repro + minimal fixes
- Console recovery (lazy chunk #7815, SSE null #7813/#7814)
- Shell PATH user bins (#7057) - systemd/Docker thiếu `gh`, `cmake`
- Browser self-heal (#6776) - Playwright die → permanently broken

### Quality/DX
- Theme/skin module (#6312) - task 1 draft
- E2E timeout enable (#7803) - pytest-timeout + 60min shard
- Memory plugins: OpenViking (#7613), distill (#4171)

---

**Xu hướng**: Hub enterprise features ổn định, đẩy mobile/voice. Nhiều first-time contributor (7 PR có label). Core stability issues được ưu tiên (memory, console crash). Cộng đồng tích cực vote features.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*