# Bản tin Hệ sinh thái Hermes Agent 2026-10-29

> Issues: 135 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-29 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-29

## 🎯 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung xử lý bugs post-merge unified gateway (#106742), Desktop webapp stability, và session management. 30 PRs merged trong 24h qua - chủ yếu sửa edge cases authentication, streaming, và profile multiplexing.

## 📦 Releases

Không có.

## 🚧 Tiến độ dự án

### Merged PRs quan trọng (24h qua)

**Desktop/Webapp streaming & sessions:**
- #146110: sửa reply stuck ở first words khi reconnect mid-stream
- #146097: webapp billing/usage reads giữ đúng profile secret scope trên multiplexed gateway
- #146117: refuse unbound profile tickets trên webapp socket
- #146195: docker exec timeout không fail cả poll (flaky arm64 CI)

**Auth & vault:**
- #146240: browser_vault fill passwords trên Camofox pages
- #146290: catalog pin Camofox plugin 1138f25
- #146285: vault không hang forever khi OS keychain stall (timeout 30s)

**CLI/Gateway bugs:**
- #146214: checkout lock probe không false-positive là running update
- #146079: search_files keep results khi sub-directory unreadable
- #146126: text+Enter trong 1 write submit được (tmux, process_manage)
- #145077: confirm checkout lock contention trước khi fence

**Tool fixes:**
- #24536: parse Kimi K2 inline tool-call tokens từ content (không chỉ tool_calls field)
- #21000: Feishu dùng interactive card thay post messages (full markdown)

### Open PRs đang review

- #143545 (P2): host gateway adopt remote-backend Desktop sessions qua provider attestation (#139818)
- #146094 (P2): settle lost unattended (-z) turns thay vì pause session forever
- #146084: Discord approval timeout qua edit_message + shared embed
- #146289: group chat surface directly-addressed members với `(pass)` result

### Critical issues đang hot

**P0/P1:**
- #134889 [CLOSED, 224 comments]: unified gateway post-merge tracking - merged Oct 14, đang close out follow-ups
- #145022 (P1, 5 comments): Kanban workers crash "execution unknown" khi gateway stall during saves

**P2 volume cao:**
- #139818 (29 comments): remote-backend desktop sessions unresumable từ local desktop
- #143547 (27 comments): unified gateway open problems trên main, tiếp #134889
- #119070 (20 comments): kanban card rate-limited rồi succeed nhưng parked blocker_auth forever
- #122402 (15 comments): Ubuntu historical takeover fail build python-olm thiếu clang++

## 🔥 Điểm nổi bật cộng đồng

**Issues nhiều tương tác:**
- #134889 (224 comments): unified gateway consolidation - lớn nhất, tracking post-merge fixes
- #139818 (29 comments): session resume vỡ cross-backend Desktop/serve
- #143547 (27 comments): tiếp tục tracking unified gateway problems

**Xu hướng:**
- Desktop/webapp stability là focus lớn - nhiều streaming, reconnect, session adoption bugs
- Multiplexed gateway (1 process phục vụ nhiều profiles/bots) có nhiều edge cases auth/routing
- Kanban execution reliability đang được chú ý (worker crashes, delivery gaps)

## 🐛 Ổn định & Bugs

### Critical bugs đã fix

**Session & streaming:**
- Reply stuck trên Desktop reconnect (#146110) - reply finish khi disconnected không update UI
- Webapp profile scope leak (#146097) - billing reads chạy sai profile
- Unattended turns pause session forever (#146094) - gateway restart fence unknown turns

**Auth & tools:**
- Browser vault refuse Camofox pages (#146240) - không detect origin
- Vault hang forever trên keychain stall (#146285) - thêm 30s timeout
- Search_files fail toàn bộ khi 1 directory unreadable (#146079)

**CLI/Gateway:**
- Checkout lock false-positive (#146214) - concurrent probes nhìn như held lock
- Text+Enter 1 write không submit (#146126) - tmux send-keys vỡ

### Bugs đang xử lý

**P1:**
- #145022: Kanban workers crash mass khi gateway stall during saves

**P2 nhiều report:**
- #139818: Remote Desktop sessions không resume được
- #143268: Local Kanban notify+wake không reach session FIFO
- #141973: Mid-turn sends unreliable - queued thay vì delivered
- #142144: Desktop persist `custom` billing class vào composer → auth fail

## 💡 Yêu cầu tính năng

**Config/customization:**
- #125807: làm session import limits configurable (đang hardcode)
- #100944: Kanban deny worker create/link per profile, giữ lifecycle tools
- #75607: tách declarative cron config khỏi volatile execution state

**MCP & extensibility:**
- #64890 (7 comments): propagate per-run metadata từ POST /v1/runs đến MCP tools/call

**Skill learning:**
- #136931 (6 comments): distinguish durable lessons vs temporary fixes trong skill self-improvement

**Monitoring:**
- #143364: secondary profile progress leak vào primary bot
- #138836: Desktop Kanban delivery policy gaps (notify/wake, compaction)

## 👥 Phản hồi người dùng

**Pain points lớn:**

1. **Unified gateway instability** - #134889 tracking có 224 comments, nhiều follow-up issues (#143547, #139818). Users gặp session resume vỡ, auth leaks, delivery gaps sau merge Oct 14.

2. **Desktop streaming flakiness** - replies stuck mid-reconnect, duplicate clarify cards, mid-turn sends không reliable. Nhiều issues P2 (#141973, #145098, #146110).

3. **Kanban reliability** - workers crash (#145022), cards stuck forever (#119070), delivery không reach sessions (#143268). Cron/background execution không stable.

4. **Cross-platform gaps:**
   - Windows: WhatsApp spawn fail WinError 5 (#68128), Edge snapshot cookies không decrypt (#133659)
   - Ubuntu: historical takeover fail thiếu clang++ (#122402)

**Tích cực:**
- Maintainers responsive - many P2 bugs fixed trong <48h
- Community contributions tăng (plugin catalog PRs: #145768, #145775, #146292)
- Documentation improvements (#146100, #109732)

## 📋 Backlog & Roadmap

**Post-merge consolidation** (still active):
- Unified gateway stable hóa (#134889, #143547) - nhiều edge cases còn open
- Desktop/webapp parity - streaming, reconnect, session lifecycle

**Near-term priorities** (từ issue labels & comments):
- Session adoption cross-backend (#143545) - remote Desktop sessions không resume
- Kanban execution reliability (#145022, #119070, #143268) - worker crashes & delivery gaps
- Profile multiplexing bugs (#143364, #144883, #145237) - auth scope leaks, cold-profile bursts

**Plugin ecosystem:**
- Catalog growing (crew 0.10.4 #145768, you-should-know #145775, iOS-sim #146292)
- MCP metadata propagation requested (#64890)

**Technical debt:**
- Skill learning quality (#136931) - distinguish durable vs temporary lessons
- Cron state separation (#75607) - declarative config vs runtime state
- Import limits configurable (#125807)

**Platform-specific:**
- Windows compatibility sweep (WhatsApp #68128, Edge cookies #133659, lifecycle guard false-positives #105758)
- Signal adapter health-check endpoint (#69310)

---

## So sánh hệ sinh thái chéo

# Báo cáo so sánh hệ sinh thái AI Agent - 2026-10-29

## 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Độ trưởng thành |
|-------|--------|-----|----------|---------------|-----------------|
| **Hermes Agent** | 135 | 500 | 0 | 30 PRs merged | Mature |
| **OpenClaw** | 221 | 500 | 0 | 30 PRs mới | Mature |
| **NanoBot** | 5 | 30 | 1 (v0.4.0) | 14 PRs merged | Growing |
| **Zeroclaw** | 20 | 30 | 0 | 7 PRs merged | Stable |
| **PicoClaw** | 3 | 9 | 0 | 2 bugs fix | Maintenance |
| **NanoClaw** | 1 | 3 | 0 | 2 PRs open | Minimal |
| **NullClaw** | 0 | 1 | 0 | 1 PR | Dormant |
| **IronClaw** | 1 | 0 | 0 | 1 issue | Inactive |
| **QwenPaw** | 17 | 46 | 0 | 8 PRs merged | Active |

## 🎯 Tổng quan hệ sinh thái

**Hai dự án dominant:** Hermes Agent và OpenClaw dẫn đầu về quy mô (500 PRs, 135-221 issues). Cùng focus post-merge consolidation - Hermes với unified gateway, OpenClaw với performance optimization.

**Tier hai - đang rise:** NanoBot có release lớn (v0.4.0 SQLite history), QwenPaw active fix session stability. Cả hai velocity cao (8-14 PR/ngày).

**Tier ba - specialized:** Zeroclaw (bảo mật), PicoClaw/NanoClaw (niche use-case) có hoạt động nhưng limited scope.

**Dormant tier:** NullClaw, IronClaw gần như không activity - maintainer chuyển focus hoặc project sunset.

## 🏆 Vị thế Hermes Agent

**Strengths:**
- **Scale lớn nhất cùng OpenClaw** - 500 PRs cho thấy codebase mature + active development
- **Focus stability** - 30 PRs merged/ngày chủ yếu bugfix post-merge gateway (#134889 có 224 comments)
- **Desktop/webapp priority** - nhiều fixes streaming, reconnect, session management
- **Community engaged** - issue tracking chi tiết (P0/P1/P2), response <48h

**Weaknesses:**
- **Không có release** - stuck ở consolidation phase, không ship user-facing value
- **Technical debt cao** - unified gateway vẫn có nhiều follow-up issues (#143547, #139818)
- **Kanban reliability issues** - worker crashes (#145022), delivery gaps
- **Platform gaps** - Windows, Ubuntu compatibility chưa ổn

**Position:** Market leader về maturity nhưng đang trả nợ technical debt. OpenClaw sát nút với similar scale + tương tự problems (gateway blocking, memory leaks). Hermes có lợi thế Desktop/webapp integration mạnh.

## 🔧 Hướng kỹ thuật chung

**1. Gateway consolidation** (Hermes, OpenClaw)
- Unified architecture: 1 process phục vụ nhiều profiles/bots
- Pain point chung: session resume vỡ, auth scope leak, delivery gaps
- Indicates: nền tảng đủ mature để optimize infrastructure

**2. Session persistence** (NanoBot, QwenPaw, Hermes)
- SQLite history storage (NanoBot v0.4.0)
- Session adoption cross-backend (Hermes #143545)
- Context compression bugs (QwenPaw #8474)
- Trend: từ stateless sang stateful, chuẩn bị multi-device

**3. Memory + context management**
- Hermes: recall eviction, deep phase promotion (#150635)
- OpenClaw: terminal content leak (#186592), schema reuse (#187161)
- QwenPaw: media revival blocks (#8474), auto-memory loop (#8361)
- Challenge: balance context window vs recall accuracy

**4. MCP standardization**
- Zeroclaw: connection poisoning (#10807), HTTP stale session (#11872)
- Hermes: metadata propagation (#64890)
- Indicates: protocol adoption growing nhưng reliability chưa ổn

**5. Channel reliability**
- Discord deadlock (PicoClaw #3452)
- Telegram rate-limit (Zeroclaw #11651, Hermes)
- Signal file access (NanoClaw #2528)
- WhatsApp PII protection (Zeroclaw #12086)
- Pattern: legacy messaging platforms có nhiều edge case

## 🎨 Điểm khác biệt

**Hermes vs OpenClaw** (direct competitors):
- **Hermes**: Desktop-first, webapp streaming priority, Kanban workflow tools
- **OpenClaw**: Gateway performance focus, database optimization (WAL checkpoint), broader channel support
- **Similarity**: cùng scale, cùng pain points (gateway, session, memory)

**NanoBot** - niche clear:
- Small team, laser focus (5 issues, 30 PRs)
- Release velocity - v0.4.0 ship sau consolidation phase
- Less ambition = faster execution

**QwenPaw** - CJK market:
- Feishu/QQ/WeChat priority
- Qwen/GLM/Kimi catalog update (#8447)
- Windows compat heavy (path length, log handles) - indicates CN enterprise usage

**Zeroclaw** - security-first:
- Shell policy refusals với reason (#11983)
- System prompt budget enforcement (#11910)
- Anthropic cache optimization (#140129)
- Target: enterprise với compliance requirements

**Dormant projects** (NullClaw, IronClaw):
- Provider registry focus (Obscurify.ai #1083, #8161)
- Minimal core development
- Likely: maintainer pivot hoặc acquired

## 👥 Mức độ trưởng thành cộng đồng

**Tier 1 - Mature community:**
- **Hermes**: 224 comments trên #134889, nhiều contributor labels, P0/P1/P2 triage system
- **OpenClaw**: 63 comments #160959, user reports với logs + repro, Persian/Arabic/Chinese localization concerns

**Tier 2 - Growing:**
- **QwenPaw**: first-time-contributor labels (6/30 PRs), fast response (bug→PR <24h)
- **NanoBot**: quality bug reports (#6506), same-day fix turnaround

**Tier 3 - Limited:**
- **Zeroclaw**: technical reports nhưng ít discussion
- **PicoClaw**: maintainer-driven, community im lặng

**Tier 4 - Inactive:**
- **NullClaw/IronClaw**: 0 interaction trên PRs/issues

**Pattern:** Community health = response time + contributor diversity + discussion depth. Hermes/OpenClaw có cả ba. NanoBot/QwenPaw có response + discussion nhưng contributor pool nhỏ hơn.

## 🔮 Tín hiệu xu hướng

**Near-term (Q4 2026):**

1. **Gateway architecture stabilization** - Hermes và OpenClaw sẽ finish consolidation, release stable version. Smaller projects (NanoBot) đã ahead với v0.4.0.

2. **Multi-device sync** - NanoBot #6481, Hermes cross-backend sessions. Prep cho mobile clients.

3. **MCP ecosystem maturity** - nhiều projects gặp connection/session issues. Expect standardization efforts hoặc reference implementation.

4. **Provider proliferation** - Obscurify.ai xuất hiện ở 3 projects (Zeroclaw, NullClaw, IronClaw). Privacy-focused providers gain traction.

5. **Channel reliability sweep** - Discord/Telegram/WhatsApp bugs widespread. Platform APIs không stable, cần defensive code.

**Medium-term (2027):**

1. **Consolidation wave** - dormant projects (NullClaw, IronClaw) sẽ archive hoặc merge vào larger projects. Market không support 9 separate codebases.

2. **Enterprise features** - Zeroclaw security focus, QwenPaw Windows compat indicate enterprise adoption. Expect compliance, audit, SSO features.

3. **Agent specialization** - broad "do everything" agents (Hermes, OpenClaw) vs specialized (skill learning, cron, specific channels). Market chưa rõ winner.

4. **Context window arms race** - compression, recall, memory management pain points = models chưa đủ lớn. 1M+ token windows sẽ shift architecture.

**Risk factors:**

- **Technical debt payoff time** - Hermes/OpenClaw mắc kẹt ở bugfix phase. Nếu kéo dài →  slower projects (NanoBot) catch up.
- **MCP adoption plateau** - nếu reliability không improve, ecosystem sẽ fork hoặc create competing standard.
- **Channel platform changes** - Telegram/Discord API breaking changes có thể kill small projects không có resource maintain.

**Winner prediction:**

- **Safe bet:** Hermes hoặc OpenClaw (whoever ship stable gateway first)
- **Dark horse:** NanoBot (small team, fast execution, clear roadmap)
- **Wildcard:** QwenPaw nếu CJK market đủ lớn sustain separate ecosystem

Ecosystem hiện tại: **mid-consolidation**. Early innovation done, giờ là stability + scale race.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-10-29

## 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa lỗi và tối ưu hiệu suất: 30 PR mới (chủ yếu fix bugs), 50 issue nổi bật (221 total). Nhiều vấn đề nghiêm trọng liên quan Gateway blocking, memory leaks, và session management.

## 🔧 Tiến độ dự án

### PR quan trọng đang mở:
- **#186592**: Fix gateway-client terminal content memory leak - hash content thay vì giữ full copy
- **#187159**: Fix Amazon Bedrock image tool fails trên GPT-6/Kimi K3
- **#187160**: Fix PostgreSQL update Doctor role - delegated doctor thiếu quyền
- **#187161**: Reuse Code Mode schemas - giảm CPU overhead mỗi turn
- **#186446**: Fix CLI stall detection - thinking time không đếm là stalled
- **#185548**: Fix Discord CLI load toàn bộ plugins (0.5GB, 20s+) khi read message

### Xu hướng:
- **Performance focus**: Memory optimization, schema reuse, reduced CPU
- **Database issues**: PostgreSQL roles, SQLite WAL checkpoint blocking
- **Channel stability**: Slack, Discord, Telegram, LINE fixes

## 🔥 Điểm nổi bật cộng đồng

### Issues nhiều bình luận nhất:

1. **#160959 (63 comments)** - Gateway blocks minutes khi capture large external plugins (2026.9.6 regression)
2. **#164294 (36 comments)** - Gateway state DB WAL auto-checkpoint never completes 
3. **#150635 (21 comments)** - Short-term recall evicts entries nightly, deep phase never promotes
4. **#120385 (20 comments)** - Code Mode tool catalog incomplete cho scheduled/cron - MCP tools missing

### Vấn đề người dùng quan tâm:
- Gateway performance degradation với large plugins
- Memory leaks (RSS grows 0.1 GiB/h)
- Session management bugs (deletion blocked, stale state)
- Codex integration issues (cold reload, background completion)

## 🐛 Ổn định & Bugs

### P0 Critical:
- **#162211**: Startup blocks event loop 40-200s → health monitor restart loop
- **#85695**: Invalid openclaw.json brick managed gateway despite last-known-good
- **#185819**: Windows Codex onboarding fails activation sau device auth

### P1 High Priority:
- **#181459**: 3.5GB agent DB makes startup gamble - 4-6 min, agent UNAVAILABLE
- **#182369**: Gateway RSS grows ~0.1 GiB/h off-heap, rss_threshold monitor never fires
- **#126950**: Telegram callback payloads silently dropped for non-plugin callers

### Performance issues:
- WAL checkpoint pinned by in-process reader (#164294)
- Large DB slow startup with "commit checkpoint expired" (#181459)
- Memory leak: terminal content identities unbounded (#186592)
- Code Mode rebuild schemas every turn (#187161)

## 💡 Yêu cầu tính năng

### Đang review:
- **#150250**: Skill Workshop - verify learning coverage and behavioral reuse
- **#163267**: Same-channel thread recall without agent-wide visibility
- **#127770**: Explicit OpenAI native PDF opt-in
- **#75225**: Expose agent descriptions in agents_list

### Enhancement requests:
- **#141295**: TTL or manual clear for interrupted pending inputs
- **#141973**: `tools.exec.notifyOnExit` failure-only mode
- **#143784**: file_fetch mediaId → file_write copy path for images
- **#148480**: Reuse Codex completion context, avoid cold history bootstrap

## 👥 Phản hồi người dùng

### Pain points chính:
1. **Startup reliability**: Gateway blocking, restart loops, DB open times
2. **Memory management**: Off-heap leaks, unbounded caches
3. **Session lifecycle**: Deletion blocked, stale bindings, race conditions
4. **Channel integrations**: Telegram, Slack, Discord quirks và edge cases

### Positive signals:
- Active contributor community (@LiuwqGit, @shannon0430, @yousan - nhiều PRs clawtributors)
- Detailed issue reports với logs và repro steps
- Multi-language support concerns (Persian/Arabic RTL, Chinese community)

## 📋 Backlog & Roadmap

### Near-term priorities (inferred từ P0/P1):
1. Gateway stability: startup blocking, event loop issues
2. Memory optimization: RSS leaks, content identity bounds
3. Database performance: WAL checkpoint, large DB handling
4. Session management: deletion veto, binding lifecycle

### Medium-term (P2 với nhiều discussion):
- Skill Workshop learning coverage verification
- Context engine improvements (recall, compaction)
- Channel-specific features (Slack mentions, Telegram callbacks, Codex sandbox)
- Test infrastructure (flaky test cleanup, budget management)

### Long-term concerns:
- QQ channel sustainability sau Tencent handoff (#150743)
- Anthropic cache optimization cho long sessions (#140129)
- CLI JSONL output handling (#187125, #186967)

---

**Metrics**: 221 open issues | 500 open PRs | ~30 PRs pushed hôm nay | P0: 3 | P1: 7 | P2: majority

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo NanoBot ngày 2026-10-29

## 1. Tóm tắt hôm nay

Release **v0.4.0** phát hành với SQLite history storage, nhập conversation cũ được, update flow mới. Team đóng 14 PRs trong ngày (bug fixes, refactor, docs), còn 10 PRs open chủ yếu feature/test. 5 issues mới, 3 đóng trong ngày.

---

## 2. 🎉 Releases

### **v0.4.0** (2026-10-28)

**Tính năng chính:**
- **Persistent history**: SQLite backend thay in-memory → model history + browser transcript lưu database
- **Import existing conversations**: migrate conversation cũ sang schema mới
- **Unified update flow**: stable + preview release share path, confirm before install/restart
- **Gateway coordination**: multi-device sync state around saved data

**Ý nghĩa:** Bước lớn về reliability. User không mất context qua restart, chuẩn bị cho multi-device sync. Update flow giảm breakage risk.

---

## 3. 📈 Tiến độ dự án

### PRs merged ngày 2026-10-28 (14 PRs)

**Refactoring & cleanup:**
- #6482 centralize WebUI outbound delivery → dễ add event/history behavior
- #6498 move tool hint rendering ra khỏi core → channel tự present
- #6460 xóa unused internal code → giảm noise
- #6503 clarify contribution policy → issue-first, collaborator-only PRs

**Bug fixes trước release:**
- #6507 **Windows memory leak fix** (P2): ctypes pointer cache leak trong identity polling → idle WebUI leak 5GB RAM (#6506). Reuse native structure.
- #6348 abort stale WebSocket handshake → fix `assert not self.eof_sent` crash
- #6509 bind saved topic vào project → không cho đổi directory sau khi có context
- #6502 Dock tap không work sau touch drag → cancel native movement sau threshold
- #6500 history touch gesture mất khi React replace node → retain listener
- #6491 simplify retry status copy → bỏ punctuation, attempt count
- #6484 align chat link color với edit filename
- #6473 slash command highlighting match `$skill` style
- #6478 keep subtask detail control visible trong long result

**Release prep:**
- #6504 prepare 0.4.0 từ main `32ee281`
- #6510 fetch WebUI packages từ npm thay Tencent mirror → build integrity pass
- #6511 update README: WebUI gallery mới, news đến Oct, v0.4.0 link
- #6508 xóa obsolete `update-setup` skill → conflict với CLI/WebUI update path

**Closed features:**
- #6289 Matrix "listen" policy → observe room, reply on mention (#6288)
- #6443 WebUI delegated work drawer → inset trên composer, active vs saved result khác home

### PRs open quan trọng

**P1:**
- #6497 **isolate inline command failure**: `/status` exception escape → kill consumer. Wrap inline command, keep loop alive.

**P2 features:**
- #6323 edit+resend message same session (WebUI)
- #6315 session search return `@handle` → agent identify + message target
- #5902 Telegram rename topic to generated title
- #6287 Matrix per-room `groupPolicyOverrides`

**Conflicts:**
- #6481 sync unread cross-device → conflict cần resolve
- #6452 local-backend retry/fallback fixes (Ollama/vLLM congestion) → conflict
- #5437 Serply web search provider → conflict

**Xu hướng:** Release stability sweep done. Focus shift sang multi-device sync (#6481), session discovery (#6315), editing (#6323).

---

## 4. 💬 Điểm nổi bật cộng đồng

**Top issues:**
- #6513 (OPEN): Matrix v0.4.0 attach `m.in_reply_to` every reply → quote noise Element. No config toggle. User muốn off.
- #6512 (OPEN): heartbeat autocompact leak "context compacted" message vào last updated channel. User thấy spam.
- #6506 (CLOSED): Windows memory leak báo cáo → team fix same day (#6507). Fast turnaround.

**Feedback pattern:** User report bug clear (reproduction steps, environment), team respond/fix trong 1 ngày. Good velocity.

---

## 5. 🐛 Ổn định & Bugs

### Fixed trong ngày:
- **Windows idle memory leak** (#6507): root cause là ctypes pointer cache. Critical cho Windows user.
- WebSocket handshake stale response crash (#6348)
- Touch interaction bugs (Dock tap #6502, history pull #6500)
- Topic project binding leak (#6509)

### Open critical:
- **#6497 (P1)**: inline command crash kill consumer → blocking cho production stability
- #6513: Matrix reply quote noise → UX issue, cần config
- #6512: heartbeat message leak → minor spam

**Tình trạng:** Major stability sweep done cho v0.4.0. Còn 1 P1 open. Platform-specific issues (Windows, Matrix) được ưu tiên.

---

## 6. ✨ Yêu cầu tính năng

**WebUI:**
- #6505: change project directory existing chat → picker disappear sau first message. **Closed** với #6509 direction: saved topic stay bound.
- #6323 (open): edit+resend message → keep prefix, replace suffix, generate reply same session

**Matrix:**
- #6288/#6289: "listen" group policy → observe, reply on mention. **Merged** v0.4.0.
- #6287 (open): per-room policy override
- #6513: toggle `m.in_reply_to` attachment

**Infrastructure:**
- #6481: cross-device unread sync
- #6315: session search return handle
- #5902: auto-rename Telegram topic

**Pattern:** Feature request tập trung UX polish (editing, navigation) và multi-channel consistency (Matrix parity với other channels).

---

## 7. 🗣️ Phản hồi người dùng

**Positive signals:**
- v0.4.0 persistent history được chờ đợi (core feature request)
- Bug report quality cao → team fix nhanh

**Pain points:**
- Windows memory leak (#6506): "left idle, next day out of memory, Python 5GB RAM" → fixed #6507
- Matrix quote noise (#6513): "m.in_reply_to every message, no toggle"
- Project directory picker UX (#6505): "unreachable after first message"

**User behavior:** Production usage visible (Windows leak from real deploy, Matrix bot in active rooms). Community engaged, report clear reproduction.

---

## 8. 📋 Backlog & Roadmap

### Near-term (based on open PRs):
- P1 fix: #6497 inline command isolation
- Multi-device: #6481 unread sync
- Session discovery: #6315 handle in search results
- Editing: #6323 resend trong session
- Channel parity: #6287 Matrix overrides, #5902 Telegram titles

### Technical debt addressed:
- Tool presentation separation (#6498)
- Outbound delivery centralization (#6482)
- Unused code removal (#6460)

### Blocked/conflict PRs cần triage:
- #5437 Serply provider (conflict)
- #6452 local-backend retry (conflict)
- #6351 Seatbelt test parsing (conflict)
- #6194 idle session lock release (conflict)

**Direction:** Post-0.4.0 stability → multi-device sync + session management features. Channel-specific UX polish (Matrix, Telegram). Technical foundation refactors done.

---

## 📊 Metrics ngày 2026-10-29

- **PRs merged:** 14
- **PRs open:** 10 (2 conflict, 1 P1, 6 P2)
- **Issues closed:** 3
- **Issues open:** 2
- **Release:** v0.4.0 major milestone
- **Response time:** bug report → fix < 24h

**Health:** Strong release execution. Fast bug turnaround. Clear roadmap emerging from open PRs.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw – 2026-10-29

## 🔥 Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào: 3 PR lớn được merge (system prompt budget, shell policy refusals, cron CLI), 4 PR mới về bảo mật/UX (WhatsApp PII, web form refresh, file attachments, Obscurify provider). 30 issue/PR đang mở, nhiều bug severity S1–S2 chưa đóng.

---

## 📦 Releases

Không có.

---

## 🚀 Tiến độ dự án

### PR đã merge (7)
- **#11910** – Enforce system prompt size budget. Hard limit thay warning. Fail closed khi vượt context.
- **#11983** – Shell policy refusals giờ có reason + remediation hint. Agent biết tại sao bị từ chối.
- **#11935** – `zeroclaw cron runs` CLI đọc retained output từ terminal.
- **#11934** – Restore `agent_alias` attribution cho cron/gateway runs.
- **#11921** – Session event history append-only. Replay không lặp side effects.
- **#11651** – Telegram 429 rate-limit honored qua shared flood gate.
- **#11601** – Telegram transcription failures phân loại đúng, không retry vô hạn.

### PR đang chờ merge (23)
**Quan trọng:**
- **#11881** – Goal execution lifecycle (Goal V1 4/12). Staged foundation, đợi runtime placement approval.
- **#9809** – Multiple models per provider profile. Breaking config change, risk high.
- **#12017** – Context window = model metadata, not config. Bỏ 32k fallback.
- **#11997** – `send_via` gửi files qua `attachments`, đọc từ file theo read policy. Email channel giờ gửi được file.
- **#12039** – Web config form refresh sau Save all, giữ mounted rows.

**Bảo mật/Policy:**
- **#12084** – Claude Code import `AGENTS.md`.
- **#12085** – Obscurify.ai provider.
- **#12083** – Memory consolidation validate output trước khi store. Schema Draft 2020-12.

**Bugfix:**
- **#12082** – `get-paircode` exit non-zero khi fetch fails.
- **#12080** – Android shell fallback khi `canonicalize` hit EPERM.
- **#12073** – OpenAI Codex retry stream as stream, không `stream: false`.
- **#12061** – MCP session poisoning recovery.
- **#11872** – MCP HTTP stale session replay.
- **#12040** – Plugin component admission chặn manifest/component mismatch.

**CI/Chores:**
- **#11634** – Rust 1.99.1 toolchain bump.
- **#12018** – Rust deps bump (35 crates).
- **#11999** – Actions bump (9 updates).
- **#12030** – UTF-8 byte-offset pagination test.

---

## ⭐ Điểm nổi bật cộng đồng

### Issues nhiều tương tác
- **#10346** (4 bình luận, 1 👍) – Gateway/channels không share heartbeat MCP-registry-caching. Mỗi `stdio` MCP server spawn 3 lần mỗi boot.
- **#12014** (4 bình luận) – Custom OpenAI provider không có `context_window` → assume 32k silent, reject valid turns.
- **#10807** (4 bình luận) – MCP connection poisoned sau 1 failed recovery. HTTP/SSE unreachable → 1 retry → vĩnh viễn fail.

### Quan tâm người dùng
- **System prompt budget** (#11908, #11910, #12070) – Default unlimited, warning-only. Bootstrap không cap. 3 PR đóng vấn đề.
- **MCP reliability** (#10807, #11872, #12055, #12061) – HTTP pool/keep-alive, stale session, recovery poisoning.
- **Shell tool Android** (#12075) – `/system/bin/sh` không canonicalize được (EPERM) từ #10381.

---

## 🐛 Ổn định & Bugs

### Severity S1 (workflow blocked)
- **#12014** – Custom provider 32k fallback.
- **#10807** – MCP connection poisoned.
- **#12075** – Android shell always fails.
- **#12081** – `memory_store` tool call failure (Qwen3.6 35B, ik_llama.cpp).

### Severity S2 (degraded)
- **#11233** – Validation results không chạy check hoặc unmeasured.
- **#12055** – MCP HTTP stale pooled socket → outcome-unknown.
- **#12072** – OpenAI Codex stream retry without streaming → 400.
- **#12064** – Discord plaintext approvals từ bot.

### Severity S3 (minor)
- **#11917** – Web chat không nhận cron results/pushed messages đến khi reply đầu tiên.
- **#11972** – `gateway get-paircode` exit 0 khi fail.
- **#12067** – `untrusted_guard_sensitivity` di chuyển prompt guard và leak detector ngược chiều.
- **#12066** – Prompt guard flag semicolon/pipe là command injection, clean SOP payloads → Suspicious.

### Architecture/Risk High
- **#10346** (RFC) – MCP spawn 3x mỗi boot.
- **#11612** – Re-run approved shell command trong turn → abort agent loop, end session.

---

## 🎯 Yêu cầu tính năng

- **#12069** – `/load-session <name|uuid>` command cho Code/ACP. Resume session từ picker ngoài `Ctrl+S`.
- **#12086** – Protect WhatsApp phone number trong prompts (obscure sender JID).
- **#12054** – Honor runtime-profile thinking levels cho OpenAI (native reasoning effort).
- **#11839** – Shorten macOS universal build (gates publishing, timeout 180 min).

---

## 💬 Phản hồi người dùng

- **MCP spawn triplicate** (#10346) – Mỗi daemon boot spawn mỗi stdio server 3 lần, không có cơ chế cache chung.
- **Shell policy messages vague** (#11983) – Trước: "Command not allowed", không biết tại sao. Sau: reason + hint.
- **Android broken** (#12075) – Shell tool EPERM từ #10381, `/system/bin/sh` không canonicalize được.
- **Web chat silent** (#11917) – Cron/pushed messages không hiện đến khi user reply.
- **Exit codes inconsistent** (#11972) – `get-paircode` fail exit 0, scripts không detect được.

---

## 📋 Backlog & Roadmap

### Đang phát triển
- **Goal Mode V1** – PR #11881 (4/12), đợi runtime approval.
- **Multi-model provider** – PR #9809, breaking change, risk high.
- **Context window metadata** – PR #12017, bỏ 32k fallback.
- **Session event history** – PR #11921, append-only, replay không side effects.

### Chưa bắt đầu
- MCP registry caching consolidation (#10346).
- Android shell canonicalize workaround (#12075).
- Memory validation schema (#12083) – PR mở.
- File attachments via `send_via` (#11997) – PR mở.

### Tech debt
- Rust 1.99.1 toolchain bump (#11634) – PR mở 20 ngày.
- macOS build timeout (#11839) – gates release.
- SSL_CERT_FILE WebSocket (#11443) – PR đóng chưa merge.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-29

## 1. Tóm tắt hôm nay

Dọn dẹp backlog: đóng 7 PR/issue cũ (stale), sửa 2 bug Discord và Anthropic, 2 issue mới về UI/validation. Không có release, chủ yếu bảo trì.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đóng (stale cleanup)**
- #699 - Refactor `AgentLoop`: tách `ContextCompressor` + `ToolExecutor`, thay magic number
- #1158 - Thêm protocol `anthropic-messages` cho Anthropic native format
- #757 - Fix cron: agent reply không đến channel vì bypass `PublishOutbound`
- #1569, #1544 - Fix build tag WhatsApp
- #3429, #3430 - Feature ẩn tool feedback args (backend + UI)

**PR đang mở**
- #3447 - Fix Anthropic thinking models (claude-haiku-5-5) lỗi `temperature deprecated` khi dùng token auth
- #3452 - Fix Discord deadlock: bump `discordgo` fork qua commit vá handshake bug

**Xu hướng**: Dọn nợ kỹ thuật tích lũy từ Q1 2026 (Feb-Mar). 7/9 PR đóng có tuổi 7-8 tháng.

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào tương tác cao (tất cả 0-2 comment). Cộng đồng im lặng hoặc nhỏ.

#3427 (Plazmi MCP example) đề xuất tích hợp persistent-world agent, nhưng đóng vì stale → không nhận được quan tâm.

## 5. Ổn định & Bugs

**Discord (#3452)** - Critical: bot "sống nhưng câm", không heartbeat, không log. Root cause: deadlock trong fork `discordgo`. Fix: bump commit.

**Anthropic (#3447)** - Token auth gọi thinking model fail 400. API mới không cho `temperature` parameter. Fix: đang review.

**Gateway hot-reload (#3453)** - False positive: config đã apply nhưng UI vẫn báo "restart required". Confusing UX.

**Model ID validation (#3454)** - Lỗi UX: suggest lowercase prefix phá case-sensitive upstream ID (ví dụ `ACME/gpt-4o-mini` → `acme/...`).

## 6. Yêu cầu tính năng

#3427 - Persistent agent session với Plazmi MCP (đóng, không tiến triển).

Feature ẩn tool args (#3429/#3430) đã merge trước đó, dọn backlog hôm nay.

## 7. Phản hồi người dùng

Issue #3453, #3454 từ @SecInsight báo UX bugs nhỏ (gateway status, validation). Chưa có phản hồi maintainer.

PR #3452 từ @axehomeyg báo deadlock Discord nghiêm trọng, đang chờ review.

## 8. Backlog & Roadmap

Không có roadmap công khai trong data.

Backlog đang giảm (7 item đóng), nhưng 2 bug mới (#3453, #3454) + 2 PR đang mở (#3447, #3452) chưa giải quyết.

Priority: Discord deadlock (#3452) và Anthropic auth (#3447) cần fix nhanh → ảnh hưởng channels chính.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-29

## 1. Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa bug hệ thống core: xử lý rate-limit channel và scheduling chính xác. Image refresh bot tạo PR routine.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR #4235** - Sửa scheduled tasks
- **Vấn đề**: Task chạy muộn tới 60s vì chờ sweep tick tiếp theo
- **Fix**: Chạy ngay khi đến thời điểm đúng thay vì đợi cycle
- **Impact**: Timing chính xác cho scheduled runs
- **Status**: Open, cần review

**PR #4227** - Sửa delivery rate-limit
- **Vấn đề**: Reply bị drop khi channel rate-limit hoặc network lỗi
- **Chi tiết**: 
  - Mỗi failed send đếm vào cap 3 attempts
  - Teams 429 không có Retry-After → fail tất cả 3 lần nhanh
  - Transient error cũng bị drop
- **Fix**: Backoff thay vì drop message
- **Status**: Open, tác giả core team

**PR #4236** - Image refresh routine
- Bot tự động cập nhật hardened image
- v2026.10.0 → v2026.10.0-20261028T1528
- Workflow maintenance thường xuyên

**Xu hướng**: Focus vào reliability và timing accuracy trong core systems.

## 4. Điểm nổi bật cộng đồng

Không có tương tác đáng kể (tất cả 0 👍, ít comment).

## 5. Ổn định & Bugs

**Issue #2528** - Signal attachments không accessible
- **Mô tả**: Image/PDF gửi qua Signal đến host nhưng agent trong container không mở được
- **Scope**: v2 install với Signal integration
- **Status**: Open từ 2026-05-18, cập nhật 2026-10-28
- **Severity**: Chặn use case multimedia qua Signal
- **Tình trạng**: Chưa có solution, cần fix container file access

**PR #4227** - Delivery reliability
- Bug nghiêm trọng: message loss khi network issue
- Rate-limit handling không đúng
- Ảnh hưởng nhiều channel (Teams confirmed)

**PR #4235** - Timing precision
- Scheduling drift tới 60s
- Ảnh hưởng user experience với time-sensitive tasks

## 6. Yêu cầu tính năng

Không có feature request mới trong ngày.

## 7. Phản hồi người dùng

**Issue #2528** cho thấy:
- User expect multimedia work seamlessly qua Signal
- Container isolation gây friction với file access
- Problem tồn tại 5+ tháng chưa resolve

Interaction thấp suggest:
- Community nhỏ hoặc ít active
- Hoặc users dùng channel private/enterprise

## 8. Backlog & Roadmap

Không có thông tin roadmap công khai.

**Priority suy luận từ activity**:
1. Reliability fixes (delivery, scheduling)
2. Container/file access issues
3. Channel integration stability

**Technical debt visible**:
- Sweep-based scheduling design (60s tick)
- Retry mechanism thiếu exponential backoff
- Container file sharing architecture

Dự án đang ở giai đoạn stability hardening, không rush features mới.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo hoạt động NullClaw - 29/10/2026

## 📊 Tóm tắt hôm nay

Hoạt động thấp. Một PR duy nhất từ @tonydavis629 thêm Obscurify.ai provider. Không có issue, release, hay tương tác cộng đồng.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**PR #1083** - Thêm Obscurify.ai provider (OpenAI-compatible)
- Pattern giống PR #990 (Eden AI) - mở rộng danh sách provider
- Tác giả công khai: chính người vận hành Obscurify.ai
- Chưa có review hay merge - vừa tạo 28/10
- Xu hướng: Dự án mở rộng tích hợp provider thứ ba, theo pattern standardized

## 💬 Điểm nổi bật cộng đồng

Không có tương tác. PR không có bình luận, không có reaction.

## 🐛 Ổn định & Bugs

Không có báo cáo bug trong 24h qua.

## ✨ Yêu cầu tính năng

**Obscurify.ai integration** (qua PR #1083):
- Privacy gateway - không lưu prompt/response
- Tài khoản dùng số 16 chữ số thay vì email
- OpenAI-compatible API

## 👥 Phản hồi người dùng

Không có feedback trong khoảng thời gian này.

## 🗓️ Backlog & Roadmap

Không có thông tin roadmap công khai. Pattern từ PR cho thấy:
- Tiếp tục thêm provider tương thích OpenAI
- Framework hỗ trợ multi-provider đã ổn định (dễ thêm provider mới theo template)

---

**Đánh giá**: Ngày yên tĩnh. Activity thấp thường thấy vào cuối tuần. PR duy nhất follow pattern đã có, risk thấp. Dự án trong giai đoạn mở rộng ecosystem hơn là thay đổi core.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-29

## 📊 Tóm tắt hôm nay

Hoạt động rất yên. Issue duy nhất: yêu cầu thêm provider Obscurify.ai vào registry. Không có PR, không có release, không có tương tác cộng đồng.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

Không có PR mới. Dự án đang trong giai đoạn yên lặng.

## 💬 Điểm nổi bật cộng đồng

**Issue #8161** - yêu cầu thêm Obscurify.ai vào `providers.json`
- Tác giả @tonydavis629 (chủ provider) hỏi trước khi mở PR
- Nhắc tới PR Novita (#1115) bị đóng vì "danh sách không nên phình to"
- Lý do đưa ra: focus privacy, phù hợp với các provider tương tự đã có
- **Chưa có phản hồi** từ maintainer (0 bình luận, 0 reaction)

Xu hướng: maintainer có vẻ selective với provider list. Cộng đồng nhỏ hoặc ít tương tác.

## 🐛 Ổn định & Bugs

Không có bug report.

## ✨ Yêu cầu tính năng

Issue #8161 - thêm provider mới (nếu coi đây là feature request).

## 👥 Phản hồi người dùng

Không có. Issue mới chưa có phản hồi.

## 🗺️ Backlog & Roadmap

Không có thông tin. Dựa vào lịch sử PR Novita bị reject, có thể maintainer đang:
- Giữ provider list gọn
- Ưu tiên quality over quantity
- Cần tiêu chí rõ ràng hơn cho provider mới

---

**Kết luận**: Ngày rất trầm. Dự án có thể đang giữa hai milestone hoặc maintainer bận việc khác. Issue duy nhất cần theo dõi thêm vài ngày xem có được chấp nhận không.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-10-28

## 1. Tóm tắt hôm nay

Ngày 28/10 tập trung fix bugs nghiêm trọng (session wedge do media, context compression revive media) và nâng cấp provider catalog. 8 PR merged, 13 PR mới, tập trung xử lý issues về session stability, plugin isolation, và Windows compatibility.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Merged (8 PRs):**
- #8468: Fix silent LLM hang khi stream startup chậm
- #8447: Update catalog Claude 5.5, Gemini 4 Argon, Kimi K3.1, GLM 5.3
- #8395: Recovery từ HTTP 413 khi media cũ làm quá tải request body
- #8397: Return 400 (không phải 500) cho plugin download network errors
- #8455: Handle Windows installer prepare failures
- #8210: Close project log trước khi delete (fix WinError 5)
- #8198: Preserve binary files trong GitHub skill imports
- #8344: Use native CLI cho make-skill validation (fix Desktop bundle import)

**PRs quan trọng đang mở:**
- #8466: Fix `/compact` use session model thay vì agent default (response cho #8464)
- #8482: Reuse SQLite connections workspace-owned (giảm FTS scan lặp)
- #8480: Fix control commands trong quoted replies (Feishu/QQ/WeChat)
- #8479: Sync Office skills với Anthropic July 2026 update
- #8476: Add `thinking_level` per-job cho cron tasks
- #8470: Browse memory files theo tags (ReMe Light)
- #8187: Extract channels thành plugins với subprocess isolation (XXL)

**Xu hướng:**
- Performance: reuse connections, reduce FTS scans
- Stability: fix media-induced session wedges, compression errors
- Windows compat: log handles, path length, installer prep
- Provider updates: keep catalog current với cloud releases

## 4. Điểm nổi bật cộng đồng

**Issues nhiều interaction:**
- #8464 (3 comments): Manual `/compact` ignore session model switch → #8466 fix ngay
- #8361 (3 comments): Auto-memory-search loop lặp 4 lần rồi fail không reply
- #8040 (7 comments): Embedding reindex silent fail khi CJK chunk vượt token limit

**Pattern:** Bugs về session state (model override, media revival) được phản hồi nhanh nhất.

## 5. Ổn định & Bugs

**Critical fixes (merged):**
- Media trong history gây HTTP 413 → session chết vĩnh viễn → #8395 recovery bằng omit historical media
- Context compression revive media blocks đã xóa → 400 error vòng lặp → #8474 (open, đang chờ fix)
- Silent LLM hang khi provider slow start → #8468 extend timeout

**Đang xử lý:**
- #8474: Compression revive media → persistent 400 (chưa có PR)
- #8361: Auto-memory loop 4 lần rồi fail (có #8457 inject as reference context)
- #8473: 2.3.0-beta.1 all plugins fail load (unguarded `invalidate_caches()` call site mới)

**Platform-specific:**
- Windows: log file locks (#8206, #8210 merged), path length (#8163), installer prep (#8455 merged)
- Plugin isolation: #8265, #8473 (importlib.invalidate_caches() raise trên distro-patched Python)

## 6. Yêu cầu tính năng

**Được PR ngay:**
- #8439 → #8476: `thinking_level` per-job cho cron (off/inherit/enabled)
- #8478 → #8479: Sync Office skills Anthropic July 2026
- #8481: Env var `QWENPAW_LANGUAGE` cho Docker init language

**Đề xuất khác:**
- #7712: Add Serply web_search provider (ngoài Tavily/AnySearch)
- #8470: Browse memory theo tags (UI + pagination)
- #8472: Reranker model center với multi-query precision test
- #8463: Local Blink với bidirectional candidate scoring

## 7. Phản hồi người dùng

**Pain points:**
- Session chết vĩnh viễn sau compression hoặc media overflow → không recover được (fix đang landed/in-review)
- Daily Paper plugin fail silent khi arxiv unreachable → message che giấu root cause
- QQ channel `enabled` reset về `false` sau restart → không log warning
- Plugin install fail trên Windows khi path dài hoặc log đang open

**Positive:**
- PRs từ first-time contributors tăng (6/30 PRs có label `first-time-contributor`)
- Response time: bug report → PR trong ~24h cho critical issues

## 8. Backlog & Roadmap

**In-progress (large scope):**
- #8187 (XXL): Extract channels thành plugins subprocess-isolated
- #8285: Skill-pool downloads thành cancellable jobs (đang review)
- #8231: Persist market install provenance cho "Update All"

**Near-term priorities (dựa vào activity):**
- Session stability: fix media revival (#8474), auto-memory loop (#8361)
- Windows compat: path length, log handles, installer errors
- Performance: workspace-owned stores, connection reuse
- Plugin safety: guard all `invalidate_caches()` sites (#8473)

**Pattern:** Bug fixes > performance > new features. Release blockers (session wedges, plugin load failures) được priority cao nhất.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*