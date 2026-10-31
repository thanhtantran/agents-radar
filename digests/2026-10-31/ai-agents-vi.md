# Bản tin Hệ sinh thái Hermes Agent 2026-10-31

> Issues: 147 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-31 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-31

## 📊 Tóm tắt hôm nay

Không có release. Hoạt động chính tập trung vào sửa lỗi và cải thiện tính ổn định: fix session lease bị timeout khi máy sleep, gateway hiệu năng thấp với lịch sử lớn, và các lỗ hổng bảo mật trong redaction. 30 PR mới, 50 issue đang hot, phần lớn về ổn định hệ thống.

## 🚀 Releases

Không có release mới trong 24h qua.

## 📈 Tiến độ dự án

**Security & Stability (ưu tiên cao)**

- **#147047** [OPEN]: Fix session lease đo bằng wall clock → timeout khi laptop sleep. Chuyển sang monotonic clock. Regression test với 922s sleep.
- **#146688** [OPEN]: Redaction bỏ sót secrets trong `.env`, CLI flags, URL paths. Bổ sung 4 pattern mới.
- **#146368** [OPEN]: Plugin callbacks thiếu source context validation → rủi ro bảo mật. Bắt buộc bound Gateway ContextVars.
- **#147046** [OPEN]: System interrupt không thông báo user → chat trống. Thêm notice khi lease loss/watchdog/eviction.

**Performance & Resource**

- **#146643** [P2]: Gateway re-read toàn bộ session history mỗi lần thay đổi → CPU cao, timeout với store lớn. Cần incremental read.
- **#127647** [P2]: Desktop idle burn CPU/GPU/memory. Tracker tổng hợp 34 bình luận, nhiều sub-issues.

**Platform Adapters**

- **#147040** [OPEN]: Feishu interactive model picker (đạt parity với Telegram/Slack/Discord).
- **#146702** [OPEN]: Discord `DISCORD_THREAD_IGNORE_NO_MENTION` - bot thread không cần mention.

**Developer Experience**

- **#147043** [OPEN]: Desktop ESC trong side pane fold pane thay vì stop reply. ESC thứ hai mới stop.
- **#147042** [OPEN]: `read_file` expose `ends_with_newline` để preserve line endings khi rewrite.
- **#147034** [OPEN]: Kanban worker bật `PYTHONSAFEPATH=1` để tách import khỏi task workspace.

**Bug Fixes**

- **#146990** [OPEN]: Terminal OSC 11 probe timeout lặp lại trên silent terminals.
- **#146989** [OPEN]: Computer-use window đóng → escalation thay vì yêu cầu capture mới.
- **#146988** [OPEN]: Tool call bị bridge reject không count vào loop guard.
- **#146987** [OPEN]: Out-of-retries reply không mention backup provider đã thử.

## 🔥 Điểm nổi bật cộng đồng

**Tương tác cao:**

1. **#127647** (34 bình luận): Desktop idle resource burn - quan tâm về CPU/GPU/memory khi không làm gì
2. **#143379** (32 bình luận): RFC về doc-chain substrate network - read/governance/compaction architecture
3. **#79087** (15 bình luận): Windows runtime probe timeout → cài lại không cần thiết
4. **#122935** (15 bình luận): Windows update hardened DACL → WinError 5 khi execute python/node
5. **#123985** (14 bình luận): Desktop render messages duplicate sau compression

**User pain points:**

- Windows install/update issues (DACL, probe timeout, multiple backends)
- Session state corruption/duplication sau compaction
- Gateway performance với large session stores
- BlueBubbles duplicate message processing (2 events per message)
- Kanban worker crashes với stalled gateway

## 🐛 Ổn định & Bugs

**Critical/P1:**

- **#145022**: Kanban workers crash "execution unknown" khi gateway stall during save
- **#79087**: Windows probe timeout route healthy install → reinstall offer
- **#122935**: Windows update DACL issue → WinError 5
- **#118379**: Anthropic credential pool rotation revert → billing overlap

**P2 High-Impact:**

- **#143268**: Local Kanban notify+wake không reach session FIFO
- **#138915**: Dashboard mutations 409 khi gateway owns state.db
- **#136486**: Replayed `reasoning` alias → HTTP 400, fallback loop
- **#144814**: Mobile-created sessions không resume được từ Desktop
- **#142144**: Desktop composer persist `custom` billing-class → auth error

**Platform-Specific:**

- **Windows**: DACL hardening, venv path prepend, reserved-name completion crash, kanban kill chỉ launcher
- **macOS**: launchd bootstrap retry không kickstart registered job
- **Linux**: AppImage distribution (#82859 - work in progress)

## 💡 Yêu cầu tính năng

**High-Value (P2-P3):**

- **#44075** (6👍): Semantic search cho session history (hybrid BM25 + vector)
- **#22403** (2👍): Mutual TLS (mTLS) support cho LLM APIs và HTTP tools
- **#112877**: Configurable max width cho inline preview frames (hiện hardcoded 640px)
- **#140199**: Plugin API cho slash-command session access và tạo visible session

**Infrastructure:**

- **#143379**: RFC doc-chain substrate network
- **#130387**: Vault prompt answering trên messaging surfaces
- **#82889**: Independent Electron mirror checksum verification (supply-chain guard)

## 📣 Phản hồi người dùng

**Positive:**

- Plugin ecosystem mở rộng (burnclock 0.3.0, OpenCode Free ACP 0.4.0, birkin-mnemosyne 0.8.0)
- Interactive model pickers trên nhiều platforms
- Computer-use improvements

**Frustrations:**

- Windows install/update experience phức tạp, nhiều edge cases
- Session state bugs sau compaction/compression
- Gateway performance không scale với store size
- BlueBubbles adapter duplicate processing
- Plugin `on_session_start` chỉ fire cho first subagent

**Documentation gaps:**

- Smart App Control blocking Python `_ssl` (#63796)
- npm audit fixes không persist qua `hermes update` (#116774)
- Nix builds report version 0.0.0 (#144616)

## 📋 Backlog & Roadmap

**Immediate Focus (đang làm):**

1. Session lease monotonic clock fix (#147047)
2. Gateway performance optimization cho large stores (#146643)
3. Security redaction improvements (#146688, #146368)
4. Windows install/update stability

**Near-term (nhiều discussion):**

1. Session state integrity sau compression/compaction
2. BlueBubbles adapter dedup và attachment handling
3. Kanban worker lifecycle improvements
4. Plugin API surface expansion
5. Desktop idle resource optimization (#127647 tracker)

**Blocked/Waiting:**

- **#143937**: Plugin resolution fails Python 3.14 (upstream issue)
- **#145387**: CLOSED - Database deadlock với journal_mode: delete (đã fix)

**Long-term ideas:**

- Semantic session search (#44075)
- mTLS support (#22403)
- AppImage distribution (#82859)

---

**Xu hướng:** Dự án mature hơn, focus stability over features. Nhiều edge case fixes cho Windows và session state. Plugin ecosystem growth. Performance concerns với large installs. Security hardening tiếp tục.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 31/10/2026

## 1. 🌐 Tổng quan Hệ sinh thái

Hệ sinh thái AI agent đang trải qua **giai đoạn trưởng thành không đồng đều**. Hai nhóm rõ rệt:

**Nhóm Production-Ready (Hermes, OpenClaw, NanoBot):**
- Focus stability, security hardening, performance optimization
- PostgreSQL query tuning, session state integrity, multi-agent scaling
- Bug fixes chiếm ưu thế (70-80% activity)
- Community engagement cao (15-34 comments/issue)

**Nhóm Early/Maintenance (Zeroclaw, PicoClaw, NanoClaw, IronClaw, QwenPaw):**
- Zeroclaw: security crisis (10 S1-S2 issues cùng lúc)
- PicoClaw: cleanup backlog 7 tháng
- NanoClaw: feature PRs nằm chờ tháng trời
- IronClaw: chỉ có bot dependabot hoạt động
- QwenPaw: active nhưng scattered (plugin refactor + desktop bugs)

**NullClaw**: inactive hoàn toàn.

---

## 2. 📋 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Tương tác cao nhất | Trạng thái |
|-------|--------|-----|----------|-------------------|------------|
| **Hermes Agent** | 147 | 500 | 0 | 34💬 (#127647) | 🟢 Active, stability focus |
| **OpenClaw** | 92 | 500 | 1 | 23💬 (#150635) | 🟢 Active, PostgreSQL tuning |
| **NanoBot** | 2 | 50 | 0 | 0💬 | 🟡 Low-activity maintenance |
| **Zeroclaw** | 10 | 50 | 0 | 0💬 | 🔴 Security crisis |
| **PicoClaw** | 0 | 16 | 0 | 0💬 | 🟡 Backlog cleanup |
| **NanoClaw** | 2 | 8 | 0 | 0💬 | 🟡 Feature PRs stalled |
| **NullClaw** | 0 | 0 | 0 | - | ⚫ Inactive |
| **IronClaw** | 0 | 1 | 0 | 0💬 | 🟡 Bot-only activity |
| **QwenPaw** | 7 | 31 | 0 | 3💬 (#8488) | 🟡 Active but fragmented |

**Insight:** Chỉ Hermes và OpenClaw có **community engagement thực sự** (>15 comments/issue). Còn lại: hoặc too early, hoặc enterprise-only, hoặc thiếu visibility.

---

## 3. 🎯 Vị thế Hermes Agent

### Strengths:
- **Mature stability focus**: session lease fix, gateway optimization, security redaction
- **Strongest community**: 34-comment discussion về desktop idle resource burn
- **Production-grade concerns**: Windows DACL issues, multi-agent connection pooling
- **Plugin ecosystem**: burnclock, OpenCode Free ACP, birkin-mnemosyne releases

### Weaknesses:
- **Windows pain**: DACL hardening, probe timeout, install complexity (5+ issues)
- **Gateway scaling**: performance với large session stores (#146643 P2)
- **Desktop resource usage**: idle burn tracker #127647 - 34 comments chưa resolve

### Position:
**Enterprise-ready general-purpose agent platform**. Focus automation, stability, cross-platform. Đối thủ gần nhất: OpenClaw (PostgreSQL optimization tương tự).

---

## 4. 🔧 Hướng Kỹ thuật Chung

### Shared patterns:

**1. Session State Integrity**
- Hermes: lease timeout, compression bugs
- OpenClaw: state loss during shutdown, compaction corruption
- QwenPaw: SQLite connection pooling

**2. Multi-Agent Scaling**
- OpenClaw: PostgreSQL connection exhaustion (#184027 fixed)
- Hermes: gateway re-read overhead (#146643)

**3. Security Hardening**
- Hermes: redaction gaps (#146688)
- Zeroclaw: 10 sandbox/audit/policy vulnerabilities
- NanoBot: tool call injection (#6147)

**4. Platform-Specific Pain**
- Windows: Hermes (DACL, probe timeout), QwenPaw (desktop build assets)
- macOS: OpenClaw (SecretRef auth), Hermes (launchd retry)
- Linux: Hermes AppImage (#82859 WIP)

**5. Provider Ecosystem**
- NanoBot: 4 gateway providers (Opper, Tsubasa, aimlapi, Cheaper Inference)
- OpenClaw: Gemini parallel tool call bugs
- QwenPaw: Whisper API configurable model name

---

## 5. 🎨 Điểm Khác biệt

### Architecture:

| Dự án | Session Store | Multi-Agent | Memory |
|-------|--------------|-------------|--------|
| Hermes | SQLite/large files | Gateway optimization | Plugin-based |
| OpenClaw | PostgreSQL | Connection pooling | Built-in |
| NanoBot | Unclear | Unknown | Dream files + guardrails |
| NanoClaw | File-based | Unknown | LanceDB hybrid (PR pending) |
| QwenPaw | SQLite (workspace-owned) | Unclear | Visual compression |

### Community Strategy:

**Hermes**: Open engagement, public issues, RFC discussions (#143379 doc-chain)
**OpenClaw**: Technical focus, low community noise, operator-centric
**Zeroclaw**: Enterprise/private? Zero external engagement despite serious issues
**NanoBot/NanoClaw**: Small team, slow review, feature PRs stall
**QwenPaw**: Active but scattered (plugin refactor + desktop stability)

### Feature Focus:

- **Hermes**: Automation, cross-platform, plugin ecosystem
- **OpenClaw**: Cost controls, cron, ZeroCode client (steer mid-execution)
- **NanoBot**: Provider gateways, channel adapters (Telegram albums, Proton Mail)
- **NanoClaw**: Privacy (Proton Mail), memory evolution (LanceDB)
- **QwenPaw**: Desktop workflows, Record & Replay, CJK emphasis

---

## 6. 🌱 Mức độ Trưởng thành Cộng đồng

### Tier 1 - Production Communities:
**Hermes Agent**
- 34-comment issue discussions
- Multi-platform pain points với real user reports
- Plugin releases từ third parties

**OpenClaw**
- 23-comment technical debates
- Operator-focused (PostgreSQL tuning, cost limits)
- Low noise, high signal

### Tier 2 - Emerging:
**QwenPaw**
- Desktop beta testers active (#8488)
- CJK user feedback (#8067)
- Nhưng scattered, thiếu cohesion

**NanoBot**
- DeepSeek users report issues (#6530, #6531)
- PWA performance feedback (#5773)
- Nhưng interaction thấp (0 reactions trên mọi PR mới)

### Tier 3 - Weak/None:
**Zeroclaw**: 10 security issues, 0 comments → private tool hoặc chưa public users

**NanoClaw**: WhatsApp media bug open 5 tháng, 2 comments → niche hoặc edge case

**PicoClaw**: Batch đóng 16 PR, 0 discussion → internal cleanup

**IronClaw**: Chỉ có bot → maintenance mode hoặc early stage

**NullClaw**: Inactive.

---

## 7. 🔮 Tín hiệu Xu hướng

### 1. **PostgreSQL becoming standard cho multi-agent**
OpenClaw migration, performance tuning. SQLite hit limits với concurrent agents. Expect: Hermes, NanoBot follow suit nếu scale lên.

### 2. **Security audit wave**
- Zeroclaw: 10 issues cùng lúc (có vẻ professional audit)
- Hermes: redaction gaps, plugin validation
- NanoBot: tool call injection

→ **Compliance pressure** hoặc production incidents drive hardening.

### 3. **Platform-specific pain won't go away**
- Windows: DACL, venv, install complexity
- macOS: auth (SecretRef, launchd)
- Linux: distribution (AppImage slow progress)

→ Platform adapters still second-class citizens. Desktop users = QA team.

### 4. **Memory system evolution**
- NanoClaw: file-based → LanceDB hybrid (PR #4239)
- NanoBot: Dream files + guardrails (#5630)
- Hermes: plugin-based memory

→ **Hybrid BM25 + vector** pattern emerging. Semantic search requests (#44075).

### 5. **Provider abstraction maturing**
- NanoBot: 4 gateway providers pending
- Gemini parallel tool calls bugs (#6296)
- DeepSeek rate limit/finish reason issues (#6532, #6533)

→ Provider API chaos → gateway layer standardization.

### 6. **Desktop workflows growing**
- QwenPaw: Record & Replay (#7798)
- Hermes: Desktop idle resource burn (#127647 tracker)
- OpenClaw: ZeroCode client steer mid-execution (#11621)

→ Beyond CLI/web → **IDE-like experiences**.

### 7. **Community health = project health**
Hermes, OpenClaw: high engagement → active development.
Zeroclaw, NanoClaw, IronClaw: zero engagement → stagnant hoặc private.

→ Public visibility matters. Silent projects die or pivot private.

---

## 🎯 Kết luận Chiến lược

**Hermes Agent position**: **#1 open community agent platform**. OpenClaw gần ngang về kỹ thuật nhưng community nhỏ hơn. Còn lại: too early, too niche, hoặc inactive.

**Threats:**
1. PostgreSQL scaling gap vs OpenClaw
2. Windows install complexity → friction
3. Desktop idle resource burn chưa fix (#127647)

**Opportunities:**
1. Semantic search (#44075) → differentiate
2. mTLS (#22403) → enterprise hardening
3. Plugin ecosystem → network effects

**Next 30 days prediction:**
- Hermes: gateway performance PR merge, Windows install fixes
- OpenClaw: PostgreSQL tuning continues, v2026.10.10-beta.6
- Zeroclaw: emergency security patches hoặc radio silence
- QwenPaw: plugin refactor complete hoặc stall
- NanoBot/NanoClaw: feature PRs merge hoặc abandon
- IronClaw, NullClaw: no change

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-31

## 1. Tóm tắt hôm nay

Release beta 2026.10.10-beta.5 hôm qua (30/10) fix node compatibility, streaming stalls. Hôm nay 31/10: surge activity—30+ PRs opened, focus PostgreSQL performance, UI polish, guest workspace cancellation bugs. Community hitting multi-agent PostgreSQL connection exhaustion, automation failures after channel reload.

## 2. Releases

**v2026.10.10-beta.5** (2026-10-30):
- ✅ Node compat restored: works `>=24.16.0 <25 || >=26.1.0`; Node 26 stdin-file abort fixed
- ✅ Streaming bugs: tool-like XML, partial HTML tags no longer stall Gateway
- Security: Node 24.22.1 / 26.12.1 now recommendation, not hard requirement

## 3. Tiến độ dự án

**31/10 PR burst—30 opened today:**

PostgreSQL optimization wave:
- #188952: cut one blocking round trip per read snapshot
- #188951: compute search snippets with one headline/row (was double)
- #188949: fix copied PostgreSQL home failing first start
- #188614 (merged): prevent connection exhaustion in multi-agent setups (#184027)

Core stability:
- #188920 (merged): preserve session state during slow shutdown (>5s finalizers)
- #188957: cancel guest workspace prep while waiting (was hanging after cancel)
- #188950: fix dreaming keeps running after Memory Core opt-out
- #188947: stabilize bounded context read counts in tests

UI improvements:
- #183800: open large completed chat runs faster (2K-message sessions)
- #188945: wheel scrolling in Logs now reaches newest entries
- #188944: PDF download keeps original filename, not UUID
- #188942: reduce repeated work while tailing Gateway logs

Integrations:
- #173026: Telegram keep progress/final replies after delegation
- #188910: link Discord accounts from personal profiles
- #188650: fix scheduled runs failing after unrelated channel reloads

**Trend:** heavy PostgreSQL query optimization; UI responsiveness for large state; multi-channel reliability gaps being addressed.

## 4. Điểm nổi bật cộng đồng

**Top issues by comments:**

1. **#150635** (23💬): short-term recall evicts nightly → dreaming never promotes (session-state bug, P2, open since Sep)
2. **#177656** (21💬): native exec returns shared-state integrity error on 2026.10.5, no child result (P1)
3. **#166634** (19💬): late reclamation commit checkpoint failure → agent unavailable after crash recovery (P0, message-loss)

**New critical today:**
- **#188954**: `sessions.search` PostgreSQL falls back to full transcript scan after 5th search on connection (prepared-statement generic plan regression from #184013)
- **#188956**: `chat.history` PostgreSQL holds worker blocked on ~13 sync round trips per call

**User pain:** PostgreSQL performance under multi-agent load, automation reliability with dynamic channel config.

## 5. Ổn định & Bugs

**P0/P1 open:**
- #166634: crash recovery leaves agent unavailable (SQLite checkpoint expired)
- #177656: shared-state integrity error, no child result (2026.10.5 regression)
- #169844: Windows Gateway update hangs "Activating", task disabled, package not updated
- #141413: macOS app omits token for local Gateway using SecretRef

**Fixed today:**
- #188867 (closed): Telegram isolated polling re-fetch same update in tight loop, CPU pegged
- #188858 (closed): automations editor hides rearmed one-shot's effective next run
- Connection exhaustion, shutdown state loss (merged PRs)

**Trend:** multi-agent PostgreSQL reliability improving; Windows/macOS native app auth gaps remain.

## 6. Yêu cầu tính năng

**Active:**
- #188761: preflight automation compatibility check when changing default agent model
- #169401: let owned automations keep failure alert without owner-conversation repair
- #166156: Talk owner opt-out for extra spoken confirmation (`talk.voiceConfirmation: "off"`)
- #187817: generate short multi-speaker dialogue with bundled ElevenLabs plugin
- #150250: Skill Workshop—verify learning coverage and behavioral reuse

**New today:**
- #188908: prepare automation tools before approval (plugin API gap)

**Trend:** automation UX refinement; voice workflow flexibility; multi-modal content generation.

## 7. Phản hồi người dùng

**Pain points:**
- Large state directories: update recovery captures incomplete; Doctor runs 473s (#166526)
- Scheduled jobs silently fail after channel config changes (#188650)
- PostgreSQL multi-agent setups exhaust connections (#184027, now fixed)
- PDF tool unreachable with scanned PDFs when no vision model (#143375)

**Positive:** Node compatibility fix widely appreciated; streaming stall fixes reduce support burden.

## 8. Backlog & Roadmap

**Inferred priorities (from labels/activity):**
1. PostgreSQL query performance (active: 4 PRs today)
2. Automation reliability cross-channel reload (#188650)
3. Multi-agent stability (connection pooling, guest workspace cancellation)
4. Large-state performance (UI, Doctor, recovery captures)
5. Native app auth gaps (macOS SecretRef, Windows task update)

**Stale issues rising:** #150029 (automation announce link config), #169401 (failure alert without repair), #143375 (scanned PDF with no vision model)—signal product decision needed.

No explicit roadmap published; priorities emergent from P0/P1 triage and PostgreSQL optimization wave.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 31/10/2026

## 🎯 Tóm tắt hôm nay

DeepSeek integration cleanup: hai PR fix lỗi critical về rate limit reporting sai (5 QPS thay vì 100) và interruption handling. Recovery coordinator refactor giảm duplicate channel admission logic. Không có release mới.

## 📦 Releases

Không có.

## 🚀 Tiến độ dự án

### Merged hôm nay
- **#6529** (closed): Recovery admission logic centralized, bỏ WebSocket hardcode trong active queue path
- **#6532** (closed): Fix DeepSeek Search rate limit docs, bỏ 5 QPS cũ
- **#4651** (closed): Desktop notification cho background chat hoàn thành

### Critical PRs đang mở
- **#6533** (mới): DeepSeek `insufficient_system_resource`/`aborted` finish reasons bị treat như success → partial answer saved sai. Fix report as model error
- **#6147** (P1, security): Plaintext `<tool_call>` markup execute được → bỏ text extraction từ #4662, require API structured fields only
- **#6296** (P2): Gemini parallel tool calls thiếu `index` → merge sai. Fallback dùng position in chunk

### Provider ecosystem
- **#5845**: Opper gateway provider (đợi review)
- **#5947**: Tsubasa provider metadata
- **#5666**: aimlapi.com gateway (400k users, 1000+ models)
- **#5915**: Cheaper Inference gateway (15-60% rẻ hơn list price)

### Channel features
- **#6125**: Telegram consecutive images → albums (≤10 items)
- **#5973**: Telegram per-chat/topic policy overrides (forum support)
- **#5609**: Office365 delegated OAuth (password auth deprecated)
- **#5606**: Email recipient alias filter
- **#216**: A2A Protocol agent-to-agent communication

## 🔥 Điểm nổi bật cộng đồng

Top PR theo conflict/activity:
1. **#6264** (P2): Provider retry wait events bị discard → sendProgress gate fix
2. **#5360** (P2): MCP tool name collision khi full non-ASCII → `"获取天气"` thành `"_"`
3. **#5260** (P2): Runtime files trong tracked workspace dirs pollute untracked list
4. **#3776** (enhancement): `nanobot doctor` diagnostic command - 10 health checks

## 🐛 Ổn định & Bugs

### Critical fixes
- **#6533**: DeepSeek interruption masquerading as completion
- **#6147**: Tool call injection qua plaintext markup

### Important fixes
- **#6296**: Parallel tool call merge lỗi khi thiếu index
- **#5605**: Email `\Seen` mark trước khi deliver thành công
- **#5864**: Discord delayed reaction tasks không cancel khi reset
- **#5764**: Fallback provider half-open probe race condition
- **#6004**: Finish reason bị mất khi drop malformed tool calls

### Performance
- **#5630**: Dream memory files unbounded growth → 8000 char guardrails
- **#6114**: PWA cold start network-first → cache-first app shell

## ✨ Yêu cầu tính năng

1. **Gateway providers**: 4 PR chờ merge (Opper, Tsubasa, aimlapi, Cheaper Inference)
2. **Telegram enhancements**: Albums, per-topic policies
3. **Email OAuth**: Microsoft delegated flow cho Office365
4. **A2A Protocol**: Agent-to-agent communication standard
5. **OpenRouter native image gen API**: #5718
6. **Heartbeat evaluator model preset**: #6083
7. **web_fetch continuation offsets**: #6317 character-level pagination

## 💬 Phản hồi người dùng

- **DeepSeek issues** (#6530, #6531): Rate limit và interruption handling sai → urgent fixes #6532, #6533
- **PWA performance** (#5773 → #6114): Blank screen cold start → cache-first fix
- **Discord reaction cleanup** (#5806 → #5864): Typing tasks cancel OK nhưng reactions leak
- **MCP tool collisions** (#5360): Non-ASCII names → silent conflict

## 📋 Backlog & Roadmap

### High priority (P1-P2)
- 50 PRs đang open, 30 có conflict
- P1: Tool call injection fix (#6147)
- P2 focus: Channel stability (email, Discord, Telegram), provider compatibility (DeepSeek, Gemini, fallback), memory guardrails

### Emerging patterns
- Provider gateway ecosystem expanding (4 PRs pending)
- Channel feature parity (OAuth, policies, media handling)
- DeepSeek API tightening (rate limits, finish reasons)
- Memory system guardrails (#5630 Dream files, #5260 workspace pollution)

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo Zeroclaw - 31/10/2026

## 🔴 Tóm tắt: Ngày bảo mật nghiêm trọng

Dự án đang đối mặt khủng hoảng bảo mật lớn. 10 issues mới mở cùng lúc, toàn S1-S2 severity (workflow blocked/degraded), tiết lộ lỗ hổng nghiêm trọng trong sandbox, audit logging, policy enforcement. Không có releases. Cộng đồng chưa phản ứng (0 comments trên tất cả issues mới).

---

## 🚨 Ổn định & Bugs: Khủng hoảng bảo mật

**10 lỗ hổng nghiêm trọng mới phát hiện:**

### Critical (S1 - Workflow Blocked):
- **#12143**: MCP stdio servers thừa kế toàn bộ env của daemon, kể cả `ZEROCLAW_*` API keys, audit signing key, channel tokens
  - Impact: Third-party MCP code đọc được credentials của toàn hệ thống
  
- **#12142**: Agent đọc được config/secrets của daemon (`.secret_key`, `config.toml`, `gateway-admin.token`, OTP/WebAuthn secrets)
  - Cause: `workspace_only = false` hoặc workspace root tại home → `file_read` không chặn runtime config paths
  
- **#12141**: Scripts trong workspace gọi `/admin/shutdown`, `/admin/sop/approve` qua localhost bypass auth
  - Impact: Bất kỳ script nào có network access approve được SOP gates + DOS daemon
  
- **#12138**: Native runtime chạy login shell (`zsh -c`) → sources `~/.zshenv` mỗi lần
  - Impact: Writable `~/.zshenv` = command allowlist bypass + persistence vào user shells

### High (S2 - Degraded):
- **#12147**: Audit log tạo với default perms (0644) trong 0755 config dir → local users đọc tool-call history
- **#12146**: MCP SSE client chấp nhận absolute URL từ server `endpoint` event → server redirect requests + bearer tokens đi đâu cũng được
- **#12145**: Plugin store limiter chỉ cap mỗi memory, không cap số memories → plugin commit 1000x budget
- **#12144**: `file_upload`, `file_edit` auth qua Write tier → sibling workspace có Write đọc được content qua diagnostics
- **#12139**: macOS/Linux dotfiles secrets ngoài `~/.config` không bị cấm (`.netrc`, `.git-credentials`, `.npmrc`, `~/Library/Keychains`)

**Fixes đang review:**
- #12140: Cover Windows profile secrets trong forbidden_paths
- #12136: Forbid `/mnt`, `/media`, Windows drives/UNC shares mặc định

---

## 🔧 Tiến độ dự án: Security hardening dominant

**Pattern:** 1 contributor (@IftekharUddin) mở hàng loạt security issues cùng thời điểm → có vẻ là security audit đang diễn ra.

**Active development areas:**

1. **Security fixes (9 PRs open):**
   - #11234: Session ownership by current authority (P1, release-gate v0.9.0)
   - #9839: Block destructive commands (`rm -rf`, `dd`, etc.)
   - #11983: Explain shell policy refusals với reason + remediation

2. **ZeroCode client features (12 PRs):**
   - #11457: Refresh session không cancel
   - #11621: Steer running turn mid-execution
   - #11622: Show message timestamps
   - #11730: Foreground delegate tool calls visible trong parent turn

3. **Infrastructure:**
   - #11165: Extract wire contract vào `zeroclaw-rpc-proto` với OpenRPC drift check
   - #11935: CLI `zeroclaw cron runs` đọc retained output

**Stagnation:** Nhiều PRs cần-author-action, needs-maintainer-review → bottleneck ở review capacity.

---

## 🎯 Điểm nổi bật cộng đồng

**Không có.** 

10 security issues mới có 0 comments, 0 reactions. Community chưa aware hoặc chưa digest severity. Đây là gap lớn — issues này cần visibility ngay.

---

## 💡 Yêu cầu tính năng

Từ active PRs:

- **Cron run history CLI access** (#11935): Operators cần đọc cron output qua terminal
- **Cost limit override** (#11589): Cho phép operator bypass exceeded cost limit không cần restart daemon
- **Per-pane session cap config** (#11731): Worktrees nhiều sessions vượt hard limit 8
- **Session persistence** (#11727): ZeroCode reopen sessions sau restart

Không có feature requests mới từ community issues.

---

## 📝 Phản hồi người dùng

**Silent.** Không có user-filed issues hoặc discussions trong dataset. Toàn bộ activity từ contributors/maintainers.

Possible reasons:
- Private enterprise tool (không công khai sử dụng rộng rãi)
- Early stage (chưa có user base lớn)
- Issues reporting qua channel khác (Discord, private Slack)

---

## 🗺️ Backlog & Roadmap

**Inferred từ labels:**

- **Release v0.9.0 blocker:** #11234 (session ownership fix)
- **P1 priorities:** Security patches above
- **Stale candidates:** 2 PRs (#11267, #11757) từ tháng 9-10 không merge

**Technical debt visible:**
- Sandbox model có fundamental gaps (10 issues chứng minh)
- Permission model (workspace access, file policies) chưa defense-in-depth
- Plugin resource limits incomplete (memory cap ≠ total resource cap)

**No public roadmap** trong dataset.

---

## 🎲 Assessment

**Maturity level:** Beta/early production với serious security posture issues.

**Urgency:** Critical. 5/10 S1 issues = "workflow blocked" mà 4 trong đó là credential disclosure hoặc auth bypass. Cần hotfix release ngay.

**Community health:** Weak. Zero external engagement. Heavy contributor dependence (3-4 người carry toàn bộ PRs).

**Next 7 days prediction:**
- Emergency patch releases cho top 3 S1 issues
- Security advisory publications
- Hoặc: Radio silence nếu đây là private fork chưa production users

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-31

## 📊 Tóm tắt hôm nay

16 PR đóng cùng ngày (chủ yếu PR cũ từ tháng 3). Không có release mới. Không có issue mới. Maintenance sweep lớn, dọn backlog tích luỹ.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**Batch đóng PR tháng 3:**
- Nhiều PR merge từ @xuwei-xy (#1560, #1552, #1545, #1544, #1542, #1555) - gộp fix từ các PR khác
- PR cũ nhất: #423 (2026-02-18) - multi-agent framework, WIP, đã đóng
- Mới nhất: #3428 (2026-10-15) - fix Gemini thought_signature

**Tính năng chính đóng:**
- **#1349**: QQ Channel support emoji, voice, image, video, file (parse + reply, upload trước khi gửi)
- **#423**: Multi-agent collaboration base (blackboard shared context, agent handoff, discovery tools) - WIP đóng
- **#1258**: Exec tool env sanitization (allowlist/blocklist, PICOCLAW_* vars, block override PATH/HOME/LD_PRELOAD)

**Dependency updates đóng:**
- #3436: go.mau.fi/util 0.9.8→0.10.1
- #3435: azidentity 1.14.0→1.14.1
- #3434: gronx 1.20.0→1.20.5
- #3433: golang.org/x/crypto 0.53.0→0.58.0
- #3432: anthropic-sdk-go 1.55.1→1.80.0

**Xu hướng:** Dọn backlog lớn, nhiều PR từ tháng 3 đóng cùng lúc. Có thể đang chuẩn bị release hoặc milestone mới.

## ⭐ Điểm nổi bật cộng đồng

Không có PR/issue có interaction cao (tất cả 0 👍). Batch đóng PR là internal action, không có discussion community.

## 🐛 Ổn định & Bugs

**#1569**: Fix WhatsApp Native build tag (broken build)
**#3428**: Fix Gemini 400 INVALID_ARGUMENT khi tool-calling conversation thiếu thought_signature - handle echo captured + sentinel cho unsigned tool calls

## ✨ Yêu cầu tính năng

Không có feature request mới. Tính năng trong batch đóng:
- Multi-agent collaboration (#423, WIP đóng)
- QQ Channel rich media support (#1349)
- Exec tool security hardening (#1258)

## 💬 Phản hồi người dùng

Không có discussion/feedback từ user trong 24h. Batch đóng PR là maintainer action.

## 🗺️ Backlog & Roadmap

Batch đóng 16 PR (nhiều PR từ tháng 3) → backlog đã giảm đáng kể. Không có thông tin roadmap mới. Có thể sắp có release hoặc milestone sau đợt cleanup này.

**Dấu hiệu chuẩn bị release:**
- Dependency updates đồng loạt
- Đóng PR cũ hàng loạt
- Không có feature PR mới mở

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-31

## 1. Tóm tắt hôm nay

Ngày yên tĩnh. Không có release mới. Hoạt động chính: 2 image refreshes tự động, 1 issue hardening bảo mật nhỏ, và 1 PR đóng (LanceDB memory bị reject sau 7 tháng). Phần lớn PR cũ vẫn nằm chờ review.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đang chờ merge (quan trọng):**

- **#4239** (mới 30/10): `/add-lancedb-memory` - skill hybrid vector + BM25 cho long-term memory qua MCP. Zero core edits, opt-in per-group. Thay thế cho PR #1283 vừa bị đóng.

- **#4218** (24/10): Proton Mail adapter qua Bridge (IMAP/SMTP native). Tách adapter vào `channels` registry theo yêu cầu review.

- **#4032** (04/10): Fix agent không biết message fail sau MAX_DELIVERY_ATTEMPTS. Critical cho reliability - agent nghĩ message đã gửi nhưng thực tế failed.

- **#4031** (04/10): Fix Telegram getUpdates stall 15 phút sau network change. Thêm client-side deadline cho long poll.

- **#4030** (04/10): Telegram/Discord `ask_question` wrap option lists vào multiple rows thay vì mất tail.

**Image refreshes:**
- #4242 và #4240: bot tự động update hardened images cho v2026.10.0. Infrastructure work, không có code change.

**Xu hướng:** Focus vào channels/adapters (Proton Mail), memory improvements (LanceDB), và bug fixes cho delivery reliability.

## 4. Điểm nổi bật cộng đồng

Không có interaction cao trong 24h qua. Issue/PR mới nhất đều 0 reactions.

**Lưu ý:** PR #1283 (LanceDB memory thế hệ cũ) đóng sau 7 tháng - thay bằng #4239 với approach khác (skill-based thay vì core replacement).

## 5. Ổn định & Bugs

**Critical bugs chưa fix:**

1. **#2715** (mở từ 06/08): WhatsApp media không reach được agent. Files save vào `DATA_DIR/attachments` unmounted, agent nhận path `/workspace/attachments/...` không tồn tại. Last update 30/10, vẫn open với 2 comments.

2. **#4032**: Message delivery failures không báo agent - silent failure scenario. PR đã có nhưng chưa merge.

3. **#4031**: Telegram long poll hang sau network change - user experience poor khi connection flaky.

**Security hardening:**
- **#4241** (30/10): Request tắt automatic provider model domains trong `allowed_hosts` của IronFront. Không phải vulnerability nhưng operator muốn control chặt hơn.

## 6. Yêu cầu tính năng

**Memory system:**
- #4239: Hybrid BM25 + vector search via LanceDB MCP server. Giải quyết vấn đề built-in file memory không scale với many small facts.

**Channels:**
- #4218: Proton Mail native support - privacy-focused email adapter cho encrypted workflows.

**UX improvements:**
- #4030: Better multi-option rendering trong chat platforms.

## 7. Phản hồi người dùng

Thiếu interaction metrics. Các issue/PR mới không có reactions hay community engagement trong 24h qua.

Issue #2715 về WhatsApp media có 2 comments nhưng chưa resolve sau 5 tháng - dấu hiệu pain point thực sự hoặc edge case ít người gặp.

## 8. Backlog & Roadmap

**Priorities rõ ràng từ PR queue:**

1. **Reliability layer** (3 PRs): delivery failures, Telegram stability, message handling
2. **Memory evolution**: từ file-based sang hybrid search (LanceDB approach)
3. **Channel expansion**: Proton Mail, WhatsApp fixes
4. **Security hardening**: IronFront controls

**Blocker tiềm năng:** WhatsApp media issue #2715 open 5 tháng - hoặc không phải priority hoặc thiếu resources fix infra issue này.

**Pattern:** Feature PRs (memory, Proton Mail) merge chậm. Bug fixes cũng chậm. Có thể thiếu reviewer bandwidth hoặc strict quality bar.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 2026-10-31

## 1. 📊 Tóm tắt hôm nay

Ngày yên tĩnh cho IronClaw. Chỉ 1 PR từ bot dependabot nâng cấp thư viện dev. Không có issue mới, không release, không active development đáng chú ý.

## 2. 🚀 Releases

Không có releases.

## 3. 📈 Tiến độ dự án

**Pull Requests:**
- **#8164** - Bot dependabot nâng cấp `happy-dom` từ 20.11.1 → 21.0.4
  - Scope: dev dependency cho WebUI frontend
  - Loại: maintenance tự động
  - Trạng thái: mở, chưa có review/merge
  
**Xu hướng:** 
Không thấy activity development từ team. Chỉ có automation bot chạy dependency updates. Dự án có thể trong giai đoạn stable maintenance hoặc team đang focus vào task lớn off-repo.

## 4. 💬 Điểm nổi bật cộng đồng

Không có. PR duy nhất là bot-generated, 0 comment, 0 reaction. Cộng đồng im lặng hoàn toàn trong 24h qua.

## 5. 🐛 Ổn định & Bugs

Không có issue hoặc PR liên quan bug trong timeframe.

## 6. ✨ Yêu cầu tính năng

Không có feature request trong 24h qua.

## 7. 👥 Phản hồi người dùng

Không có feedback từ users trong khoảng thời gian quan sát.

## 8. 🗺️ Backlog & Roadmap

Không có thông tin về roadmap từ dữ liệu. Cần check:
- README.md project
- ROADMAP.md nếu có
- Pinned issues
- Discussion tab

---

**Kết luận:** IronClaw trong trạng thái maintenance thụ động. Không có signal về active development, community engagement, hoặc roadmap công khai. Cần expand data sources (commit history, discussions, documentation) để có full picture về health và direction của project.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-10-31

## 1. Tóm tắt hôm nay

Ngày vá lỗi mạnh. 15 PR đóng, 16 PR mở. Tập trung 3 trục: sửa lỗi desktop build thiếu assets, tăng tốc test plugin, tách agent/provider thành plugin. Security issue #8513 về shell command bypass governance chưa có PR.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Đã merge:**

- #8482: SQLite connections giờ owned by Workspace, không tạo mới mỗi request → tăng tốc
- #8503: Tool icon không bị clip nữa (thêm padding 2px)
- #8493: Sidebar pause polling khi đổi session, không race nữa  
- #8507: Console build fix: xóa test fixture dùng file JSON ở repo root (Docker build fail)
- #6041: Read-only tools exempt khỏi doom loop detection (đọc memory 6 lần không bị terminate nữa)
- #7896: Idle channel cleanup recheck queue sau shutdown → không drop message
- #8489: Plugin unit test giảm thời gian chạy
- #8345/#8483: Plugin import cache refresh fail không crash toàn bộ plugin system (CPython 3.11.9+ trên Debian 12)

**Đang review:**

- #8514: Desktop build thiếu visual_compression assets → Visual Compact silent no-op. Fix: thêm vào `_data_dirs` trong PyInstaller spec
- #8512: Gateway lỗi dạng `status_code=502, 请联系管理员` không parse được status → classify unknown → không retry. Fix: regex text message
- #8509: Desktop plugin install/repair fail (liên quan #8483)
- #8426: Tách third-party agents thành plugins (XXXL)
- #8499: Tách local model management thành plugin (XXXL)
- #7903: Community feed + inbox (XXXL)
- #8504: Desktop approval notifications (XXXL)
- #8463: Local Piccolo với bidirectional candidate scoring (XL)
- #8496: Scroll summary fail HTTP 400 khi model card có `generate_kwargs.max_tokens` (conflict với `max_completion_tokens`)
- #8501: `qwenpaw env list` và `env set` print plaintext secrets → thêm mask default
- #8476: Per-job reasoning control: `thinking_level` trong JobRuntimeSpec

**Đặc sắc:**

- #8067 (L, Under Review): Fix CJK emphasis boundaries trong Markdown (CommonMark flanking rules làm `**中文。**` không render đúng)
- #8066 (M): Drop empty media blocks trước khi gửi provider (zero-byte image → `data:image/png;base64,` → providers reject)
- #8052 (M): Whisper API model name giờ configurable (không stuck ở `whisper-1`)
- #7798 (XXXL): Record & Replay workflows cho macOS 14+

## 4. Điểm nổi bật cộng đồng

- #8488 (3 comments): Desktop Visual Compact không chạy → FileNotFoundError atlas assets. Người dùng test beta.1
- #8505 (2 comments): Gateway error text-only không retry → classify unknown
- #8500 (2 comments): Auto-Dream drop memory khi extract fail, checkpoint anyway → không retry
- #8511 (1 comment): Feishu channel race: message mới tới khi agent xử lý message cũ → `ProviderError: No active model`

## 5. Ổn định & Bugs

**Critical:**

- #8513 (Security): Shell-wrapped outbound (SMTP/HTTP POST/file exfil) execute AUTO/SMART không detect → detector gap. **Chưa có PR**
- #8488: Visual Compact silent fail desktop → #8514 fix
- #8511: Feishu concurrent message race

**Đã fix:**

- Desktop plugin system crash với old importlib.metadata
- SQLite connection overhead
- Doom loop false positive trên read-only tools
- Idle channel drop message
- Console Docker build fail

## 6. Yêu cầu tính năng

- #8439 (→ #8476): Per-job reasoning control
- Community feed integration (#7903)
- Record & Replay workflows (#7798)
- Local Piccolo Jev decisions (#8463)

## 7. Phản hồi người dùng

- Desktop beta testers report build issues (#8488, #8509)
- Feishu channel users hit concurrency bug (#8511)
- CLI users phàn nàn `env list` leak secrets (#8501)
- CJK users Markdown emphasis không đúng (#8067)

## 8. Backlog & Roadmap

**Hot track:**

- Plugin architecture: agents/providers/models extract → độc lập install/update
- Security: shell command governance gap (#8513 open)
- Desktop stability: asset bundling, channel race conditions

**Blockers:**

- #8513 chưa PR
- #8511 chưa root cause rõ (Provider config race?)

**Tech debt cleared:**

- SQLite connections reuse
- Plugin import resilience  
- Test speed optimization

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*