# Bản tin Hệ sinh thái Hermes Agent 2026-09-22

> Issues: 123 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-22 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-22

## 📊 Tóm tắt hôm nay

Dự án tập trung vào **profile multiplexing**, **bugfix sâu** với ~30 PR đóng/mở trong 24h. Nổi bật: vòng lặp compression retry không giới hạn (#107516), duplicate assistant replies (#70108), và chuỗi lỗi MCP tool validation (#107141).

## 🚀 Releases

### v0.21.4 (v2026.9.21)
- **Patch release** cuộn 1,800 PR từ v0.21.3
- 5,071 non-merge commits, +312k dòng code
- Ghi chú chi tiết trì hoãn đến v0.22.0

## 🔧 Tiến độ dự án

### Profile Multiplexing (Phase Complete)
- #109417 [CLOSED]: multiplex gateway stable, migration gate đã mở
- #118310 [CLOSED]: fix dashboard auth cross-profile leak
- #118432 [CLOSED]: Settings UI đọc/ghi đúng profile được chọn
- #118538 [CLOSED]: OMH hooks giờ có profile scope trên multiplex gateway

### PRs hôm nay (22 Sep)
**Stability fixes:**
- #118688: ProfileRow contract violation (`previous_names` không được khai báo)
- #118687: skills_hub degrade gracefully với corrupt state files
- #118677: terminal cache cleanup nhận `max_age_hours` lại (regression từ #118575)
- #118681: Windows fleet test align identity contract

**Data integrity:**
- #118690: curator trim skill audit ledger (tránh tích lũy unbounded)
- #118692: skill batch rollback park ngoài skills root
- #118564: compression sampling preserve whole records

**Desktop UX:**
- #118610: preserve transcript occurrences qua resume/completion
- #118628: closing session tile không force-interrupt background turns nữa
- #118683: macOS recover pre-ready backend exits

## ⚡ Điểm nổi bật cộng đồng

### Issues nhiều comments nhất
1. **#88584** (127 💬): Automated Nous integration bị block - conflict trong `cron/jobs.py`
2. **#77111** (27 💬): RFC RealtimeVoiceProvider ABC - 4 duplex-voice PR cần interface chung
3. **#109417** (14 💬): Profile multiplexing tracking - CLOSED, gate mở cho forced migration

### Pain points người dùng
- **Empty assistant messages** (#66429): request builder append `{"role": "assistant", "content": ""}` vòng lặp runaway
- **Desktop duplicate replies** (#70108): 1 response render thành 2 bubbles riêng
- **Compression retry hell** (#107516): slow aux model → indefinite retry, no backoff/cap
- **Tool vanishing** (#109798): MCP tool biến mất mid-run sau `session is None` observation

## 🐛 Ổn định & Bugs

### P0/P1 Critical
- #118487: Discord watchdog chết sau 1 `socket_closed` strike → zombie adapter
- #118505: `kanban gc` với retention days âm/0 xóa toàn bộ history
- #71733: Desktop chỉ hiện assistant replies, user prompts invisible

### P2 High Impact
- #117869: OpenCode Go 403 `server_error` không retry (xử lý như credential refusal)
- #110126: Output truncation systemic failure - 35+ issues rải rác
- #107516: Context compression retry vô hạn với slow aux model
- #118493: file search list stderr diagnostics như files

### Platform-specific
- **Windows:** #118026 [CLOSED] - `fcntl.F_RDLCK` missing crash backend
- **Telegram:** #60848 - empty-message guard miss invisible characters
- **Discord:** #115011 - auth gates disagree trên channel-only grants

## 💡 Yêu cầu tính năng

### Đang thiết kế
- #77111: RealtimeVoiceProvider ABC thống nhất 4 competing voice PRs
- #118029: SSH rollout control plane cho managed desktop installations
- #35060: Configurable `deliver` target cho Home Assistant watch events

### Plugin ecosystem
- #118299: hermes-lossless-context-manager - SQLite DAG context engine, 15 retrieval tools

### UX improvements
- #28223 [CLOSED]: `hermes doctor` one-command diagnostics
- #118629: Sprites runtime supervisor cho managed Hermes agents

## 📣 Phản hồi người dùng

### Positive signals
- Profile multiplexing phase complete (#109417) - user testing clean
- Desktop settings profile scope fix (#118432) ship cùng ngày report

### Frustrations
- **Silent failures**: significant portion "doesn't work" issues từ exceptions swallowed ở debug log
- **Data policy re-ask** (#102048): contributor tier warning lặp mỗi interactive session
- **Tool reliability**: delegate_task schema validation false-complete (#96355), MCP tool vanish (#109798)

## 🗺️ Backlog & Roadmap

### Immediate (đang merge)
- Profile isolation hardening: credential leak prevention (#111724 CLOSED)
- Platform adapter stability: Discord watchdog (#118487), Telegram IPv6 (#96261)
- Compression robustness: timeout/retry caps (#107516), whole-record sampling (#118564)

### Deferred to v0.22.0
- Curated release notes cho 1,800 PR window
- RealtimeVoiceProvider ABC design finalization (#77111)

### Technical debt
- 35+ scattered truncation issues unify → systemic solution (#110126)
- MCP schema sanitization redesign (#107141) - `oneOf`/`not`/`if` branches prune `required`

---

**Verdict:** Profile multiplexing phase đóng sạch. Focus shift sang stability/bugfix - compression retry loops, tool vanishing, platform adapter zombies. Desktop UX tốt hơn với transcript preservation + interrupt logic. Community vocal về silent failures cần better diagnostics.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-22

## 1. 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang ở giai đoạn **mature consolidation** - tập trung stability/security thay vì tính năng mới. 9 dự án phân tầng rõ:

**Enterprise-grade** (Hermes, OpenClaw): LTS path thiết lập, focus security boundaries + multi-profile + production reliability  
**Dev-focused** (NanoBot, ZeroClaw): Velocity cao (28-50 PRs/ngày), iterate nhanh UI/observability  
**Niche/Regional** (QwenPaw, PicoClaw, NanoClaw): Serve thị trường cụ thể (China, embedded)  
**Early/Private** (IronClaw, NullClaw): Activity thấp, internal hoặc R&D phase

Toàn ecosystem gặp 3 pain point chung:
1. **Context window management** - compression loops, truncation, budget overflow
2. **Session state reliability** - restart recovery, transcript sync, duplicate messages  
3. **Tool/hook child process leaks** - zombies tích tụ, memory unbounded

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Tương tác cao nhất | Velocity | Focus chính |
|-------|--------|-----|----------|-------------------|----------|-------------|
| **Hermes Agent** | 123 | 500 | 1 (v0.21.4) | #88584 (127💬) | Ổn định | Profile multiplex, stability |
| **OpenClaw** | 216 | 500 | 1 (v2026.7.35 LTS) | #143524 (50💬) | Cao | Security, reliability |
| **NanoBot** | 3 | 28 | 0 | #5849 critical | Rất cao | WebUI UX, deadlock fixes |
| **ZeroClaw** | 8 | 50 | 0 | #10970 (4💬) | Cao | Security hardening, governance |
| **QwenPaw** | 17 | 33 | 0 | #7859 (5💬) | Trung bình | Model provider redesign |
| **PicoClaw** | 3 | 3 | 0 | #3281 (13💬) | Thấp | Provider integration |
| **NanoClaw** | 1 | 7 | 0 | 0 | Rất thấp | Chat adapter polish |
| **IronClaw** | 1 | 1 | 0 | 0 | Maintenance | Benchmark monitoring |
| **NullClaw** | 0 | 0 | 0 | - | Không hoạt động | - |

**Insights:**
- **Issue/PR ratio** cao (OpenClaw, Hermes) = technical debt lớn, review bandwidth stretched
- **Zero-release projects** (6/9) = hoặc rapid iteration hoặc stagnant
- **Comment density** thấp (NanoBot 3 issues nhưng critical impact) = quality over quantity

## 3. 🎯 Vị thế của Hermes Agent

### Định vị chiến lược

**Market position:** Enterprise-ready platform với LTS path rõ ràng (v0.21.4 cuộn 1,800 PR). Competitor trực tiếp: OpenClaw (cũng có v2026.7.35 extended-stable).

**Điểm mạnh:**
- ✅ **Profile multiplexing hoàn thành** - gate mở forced migration, lead market về multi-tenancy
- ✅ **Community scale** - #88584 có 127 comments (cao nhất ecosystem), prove engagement strength
- ✅ **Mature governance** - 500 PRs quản lý được, release process ổn định

**Điểm yếu so với competitors:**
- ⚠️ **Stability debt** - compression retry loops (#107516), duplicate replies (#70108) vẫn P0
- ⚠️ **Tool reliability** lag ZeroClaw - MCP tool vanish (#109798) vs ZeroClaw's permission boundaries (#10263)
- ⚠️ **WebUI innovation** thua NanoBot - NanoBot ship 10+ UX features (command panel, subtask tracking, Mermaid) trong 1 ngày

### Competitive threats

**NanoBot** - velocity đáng sợ (28 PR/day), WebUI features xa hơn (command inspection, usage analytics, file preview). Nếu stabilize sớm → grab dev-tool market share.

**ZeroClaw** - security-first approach (tool selectors #10263, credential redaction #11026) + governance maturity (risk classifier #10861) → appeal enterprise compliance teams.

**OpenClaw** - extended-stable + 216 issues open show scale gần bằng → direct fight cho production deployments.

### Opportunity gaps

1. **Voice/realtime** - QwenPaw (#7785) và NanoBot lead, Hermes chưa thấy realtime voice PR
2. **Observability** - ZeroClaw fingerprint system prompts (#10990), NanoBot BUILD tracing (#5846), Hermes thiếu structured observability
3. **Developer UX** - NanoBot command panel + subtask tracking >> Hermes desktop UX

## 4. 🔧 Hướng kỹ thuật chung

### Patterns được nhiều dự án adopt

**1. Context budget crisis management**
- Hermes: compression retry caps (#107516)  
- OpenClaw: compaction với absolute thresholds (#87136)  
- QwenPaw: budget tính toán incomplete (#7628)  
- NanoBot: deadlock khi auto-compact (#5857)

→ **Convergence**: Tất cả move sang whole-record sampling + overhead estimation

**2. Child process lifecycle hell**
- OpenClaw: zombie accumulation (#97616), orphaned workers (#86119)  
- Hermes: skills_hub corrupt state (#118687)  
- ZeroClaw: tool permission boundaries (#10263)

→ **Divergence**: OpenClaw/Hermes treat symptoms (cleanup), ZeroClaw redesign permissions (root cause)

**3. Multi-profile/multi-tenancy**
- Hermes: profile multiplexing phase complete (#109417)  
- OpenClaw: session ownership model unclear (nhiều claim/rebound errors)  
- ZeroClaw: principal tool selectors (#10263)

→ **Leader**: Hermes với forced migration gate mở

**4. LTS/Stable release paths**
- Hermes: v0.21.4 (1,800 PR window)  
- OpenClaw: v2026.7.35 extended-stable  
- Others: rapid iteration, no LTS

→ **Market split**: Enterprise (LTS) vs dev-tool (latest-only)

### Tech stack trends

**Rust adoption:** ZeroClaw (security-critical paths), NanoClaw (cross-platform core)  
**Go backends:** OpenClaw, PicoClaw (operational simplicity)  
**TypeScript/React frontends:** Universal (WebUI standardization)  
**SQLite WAL:** OpenClaw (#143524 1.4GB crisis) - pattern showing limits

## 5. 🎭 Điểm khác biệt

### Chiến lược phát triển

**Hermes** - **Feature complete + harden:** Profile multiplex done → shift stability  
**NanoBot** - **Move fast:** 28 PR/day, iterate WebUI aggressively  
**ZeroClaw** - **Security-first:** Permission boundaries, credential redaction, risk classification  
**OpenClaw** - **Scale pain:** 216 issues, fighting stability at enterprise scale  
**QwenPaw** - **China market:** Model provider redesign (#7899) optimize local models

### Tính năng đặc trưng

| Tính năng | Leader | Followers | Gap |
|-----------|--------|-----------|-----|
| Profile multiplexing | Hermes ✅ | ZeroClaw (partial) | 6-12 tháng |
| Realtime voice | QwenPaw (#7785) | NanoBot planning | POC vs production |
| WebUI observability | NanoBot (command panel) | Others basic | Generational |
| Tool permissions | ZeroClaw (#10263) | Others ad-hoc | Security model depth |
| LTS releases | Hermes, OpenClaw | - | Enterprise moat |

### Cộng đồng

**Engagement patterns:**
- Hermes: High comment density (#88584 127💬) - vocal, demanding
- NanoBot: Low comments, high contributor count (15 first-time PRs) - welcoming
- ZeroClaw: RFC-driven (4 RFCs active) - design-conscious
- OpenClaw: 50-comment issues (#143524) - crisis-driven feedback

**Contributor concentration:**
- ZeroClaw: @Audacity88 15/50 top PRs - **bus factor risk**
- NanoBot: Distributed (Re-bin, iuiu-py, Krislu1221) - healthier
- Hermes: Opaque (không thấy contributor names trong data)

## 6. 📈 Mức độ trưởng thành cộng đồng

### Tier 1: Production-ready
**Hermes, OpenClaw**
- ✅ LTS releases thiết lập  
- ✅ 500-PR backlog quản lý được  
- ✅ Security advisories process (OpenClaw #9899)  
- ⚠️ Review bandwidth stretched (Hermes deferred v0.22.0 notes)

### Tier 2: Developer adoption phase
**NanoBot, ZeroClaw**
- ✅ High velocity (28-50 PR/day)  
- ✅ Active RFC process (ZeroClaw)  
- ✅ Test coverage tracking (NanoBot 73.79%)  
- ⚠️ No formal release cycle yet

### Tier 3: Specialized/Regional
**QwenPaw, PicoClaw**
- ✅ Niche strength (China models, embedded)  
- ⚠️ Limited English docs  
- ⚠️ Small contributor base

### Tier 4: Early/Private
**NanoClaw, IronClaw, NullClaw**
- ⚠️ Minimal public activity  
- ⚠️ No community signals  
- ⚠️ Unclear roadmap

### Maturity indicators

| Indicator | Hermes | OpenClaw | NanoBot | ZeroClaw | Others |
|-----------|--------|----------|---------|----------|--------|
| Release cadence | ✅ Regular | ✅ LTS | ❌ None | ❌ None | ❌ |
| Security process | 🟡 Implicit | ✅ Advisory tracker | ❌ | ✅ Hardening focus | ❌ |
| Governance docs | 🟡 Minimal | 🟡 Minimal | ❌ | ✅ RFC + risk classifier | ❌ |
| Test coverage | 🟡 Unknown | 🟡 Unknown | ✅ 73.79% | 🟡 Unknown | ❌ |
| Contributor diversity | 🟡 Opaque | 🟡 Unknown | ✅ Healthy | ⚠️ Concentrated | ❌ Low |

## 7. 🔮 Tín hiệu xu hướng

### Ngắn hạn (3-6 tháng)

**1. Context window arms race kết thúc**
- Hermes, NanoBot, QwenPaw đồng loạt fix compression/budget issues
- Shift từ "làm sao fit context" → "làm sao quản lý context hiệu quả"
- Expect: Standardized context management libraries emerge

**2. Tool execution reliability trở thành hygiene baseline**
- ZeroClaw permission boundaries, Hermes MCP fixes
- Từ "tools sometimes work" → "tools always work or fail explicitly"
- Expect: Tool reliability testing frameworks mature

**3. WebUI innovation plateau sau NanoBot sprint**
- NanoBot ship 10+ features trong 1 tuần (#5847-5856)
- Others sẽ copy: command inspection, subtask tracking, file preview
- Expect: WebUI feature parity trong 6 tháng

**4. LTS/rapid split cố định**
- Hermes + OpenClaw own enterprise (LTS)
- NanoBot + ZeroClaw own dev tools (rapid)
- Middle ground (QwenPaw) áp lực chọn phe

### Trung hạn (6-12 tháng)

**1. Voice/multimodal bùng nổ**
- QwenPaw realtime voice (#7785) lead
- OpenAI Realtime API adoption rộng
- Expect: Voice trở thành expected feature không phải premium

**2. Security compliance trở thành differentiation**
- ZeroClaw risk classifier + permission model
- Enterprise buyers cần audit trail + compliance
- Expect: SOC2/ISO27001 compliance docs xuất hiện

**3. Agent-to-agent communication standardization**
- ZeroClaw RFC #11027 (A2A messaging)
- OpenClaw A2A sessions_send issues (#39476)
- Expect: Interoperability protocol draft (như Matrix cho agents)

**4. Consolidation sóng 1**
- 3-4 dự án tier 4 chết/merge
- Tier 2 (NanoBot, ZeroClaw) một trong hai leap lên tier 1 hoặc absorbed
- Hermes + OpenClaw ăn market share từ failures

### Dài hạn (12-24 tháng)

**1. Platform play xuất hiện**
- Winner tier 1 launch agent marketplace/plugin ecosystem
- Giống VS Code extensions model
- Hermes profile multiplexing = foundation cho multi-tenant platform

**2. Specialized forks thành công**
- QwenPaw-style regional optimization thắng niche
- Embedded (PicoClaw) nếu survive → IoT agent category mới
- Healthcare/legal/finance compliance forks từ Hermes/OpenClaw

**3. AI agent infrastructure layer tách biệt**
- Context management, tool execution, session state → shared libraries
- Giống như React ecosystem (Next.js on top of React)
- Expect: "Rails for AI agents" framework win big

### Rủi ro đen tuyền (Black swan risks)

**Model provider consolidation** - Nếu OpenAI/Anthropic merge hoặc exclusive deals → dependency hell cho tất cả dự án

**Regulatory hammer** - EU AI Act hoặc US regulation yêu cầu audit trail/transparency → compliance cost kill small projects

**Breakthrough architecture** - Nếu ai đó solve context window fundamentally khác (ví dụ: infinite context với O(1) cost) → toàn ecosystem obsolete

---

## Kết luận chiến lược

**Vị thế Hermes:** Strong nhưng không dominant. Profile multiplexing lead nhưng stability debt + WebUI lag create openings.

**Chiến lược phòng thủ:**
1. Close P0 bugs trong 30 ngày (compression loops, tool vanish)
2. Copy NanoBot WebUI innovations (command panel, subtask tracking)
3. Ship realtime voice trong 6 tháng (don't cede to QwenPaw)

**Chiến lược tấn công:**
1. Double down LTS/enterprise - launch compliance docs, SOC2 audit
2. Platform play - open plugin marketplace trên profile multiplex foundation
3. Absorb struggling tier 3/4 projects - acquihire talent, consolidate users

**Biggest threat:** NanoBot nếu stabilize. Velocity + WebUI lead + welcoming community = dev-tool winner → eventually scale up enterprise.

**Biggest opportunity:** ZeroClaw security model chưa production-ready. Hermes steal governance/permission ideas, ship với LTS stability = win compliance-sensitive enterprise.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-09-22

## 🔥 Tóm tắt hôm nay

Extended-stable release 2026.7.35 xuất hiện (LTS tương đương), tập trung sửa critical bugs bảo mật + độ tin cậy. Dự án đang gặp vấn đề nghiêm trọng về SQLite WAL tràn bộ nhớ, child process zombie tích tụ, session state bị mất sau restart. 216 issues mở, 500 PRs đang xử lý — backlog cao.

## 📦 Releases

### v2026.7.35 (Extended-Stable/LTS)
- **Phạm vi**: gateway-only, dựa trên code end-of-July 2026
- **Nội dung**: security updates + reliability fixes + model support mới
- **Ý nghĩa**: đường LTS ổn định cho production; latest là 2026.9.5

## 🚧 Tiến độ dự án

### Issues nghiêm trọng (P0)

**#143524** 🔴 SQLite WAL tràn 1.4-2.8GB trong vài ngày
- `wal_autocheckpoint=1000` không hoạt động
- Block gateway startup trên Windows
- 50 comments — vấn đề đốt infra resources

**#89278** 🔴 Codex OAuth refresh vượt 10s timeout
- Refresh thành công nhưng cron/heartbeat fail
- Ảnh hưởng auth provider stability
- 13 comments

**#91009** 🔴 Codex PreToolUse hook relay spawn CPU-bound processes
- Nhiều `openclaw-hooks` ngốn 100%+ CPU
- Gateway RPC stall
- 26 comments

**#143334** 🔴 Lost subagent completion → requester stuck
- Session park ở settle-yield state
- Queued user messages bị starve
- Restart recovery fail với gateway timeout

### Issues tần suất cao (P1)

**#48003** Steer mode không inject messages mid-turn (20 comments)
**#87744** Codex+Telegram turn timeout chờ `turn/completed` (18 comments)  
**#97616** Hook/tool child processes leak → zombie accumulation (16 comments)

### PRs đang tiến triển

**#152205** [XL] Fix background-exec không surface completion vào busy sessions
- Merge-risk: message-delivery + security-boundary
- Needs proof

**#100960** [XL] Commands inventory: `openclaw tools commands list/inspect`
- Ready for maintainer review
- Foundation cho operator/developer observability

**#155277** [XL] CI pricing cho measured worker capacity
- **BLOCKED**: cần 131/130 Node rows (+1 over cap)
- Hybrid broad PR hit cap gate

**#98544** Bridge tool stream state → composer run status indicator
- Fix: composer không show "In progress" + Stop button khi tools exec
- Needs proof

**#154893** [XL] Enforce operator role model policies
- Team admin giới hạn models theo role
- Security-sensitive change
- Needs proof

## 🌟 Điểm nổi bật cộng đồng

**#95601** (6 comments, 2 👍) Request VoiceOver-friendly chat history
- User khiếm thị music creator cảm ơn cải thiện usage display
- Yêu cầu history navigation tốt hơn cho screen readers

**#39476** A2A sessions_send duplicate messages (12 comments)
- Agent B gọi lại Agent A bằng sessions_send → duplicate
- Vấn đề thiết kế agent-to-agent communication

**#88757** Proactive messages invisible trong session context (7 comments, 3 👍)
- Heartbeat/scheduled reports không hiện trong history
- Gây desync conversation

## 🐛 Ổn định & Bugs

### Memory/Resource leaks
- **#143524**: SQLite WAL không checkpoint → tràn GB
- **#97616**: Child processes không reap → zombies tích tụ
- **#86119**: `node server.js` workers orphaned sau subagent/cron runs

### Session state corruption
- **#48003**: Steer mode queue thay vì inject
- **#143334**: Lost completion → stuck requester
- **#137332**: Mixed terminal batches retry forever

### Model provider issues
- **#84516**: Codex long replies truncated ~1100 chars
- **#84110**: Codex OAuth rewrite prompt → bust cache (93%→47%)
- **#89278**: OAuth refresh thành công nhưng fail 10s timeout

### Data loss
- **#94939**: 6.x migration leave channel SQLite 0 bytes
- **#89257**: `openclaw backup create --verify` exit 13, corrupt .tmp

## ✨ Yêu cầu tính năng

**#88154** Slack Modal Support cho interactive workflows (8 comments)
- Thay message prompts bằng native modal UI
- Form validation, multi-step input

**#87362** Emit task flow lifecycle hook events (7 comments)
- Plugin observability: TaskFlowRegistryObserverEvent expose qua hooks
- Cho phép plugin theo dõi task transitions

**#92105** Configurable page groups cho memory-wiki (5 comments)
- Custom directories, recursive scanning
- Replace hardcoded directory assumptions

**#38714** Discord reaction event support qua Hooks (6 comments, 2 👍)
- Automation dựa trên reactions (ví dụ: ✅ save to memory)

**#83442** Shell command block rendering cho operators (6 comments)
- Copy-friendly bash commands trong chat
- Tail, jq filters etc.

## 💬 Phản hồi người dùng

### Tích cực
- **#95601**: Accessibility improvements được đánh giá cao
- **v2026.7.35**: Extended-stable release path rõ ràng cho production

### Tiêu cực/Pain points
- **Prompt cache bị phá**: Dynamic injections + tool hints defeat OpenAI auto-caching (#95610)
- **Bootstrap confusion**: Pre-seeded files make OpenClaw delete user BOOTSTRAP.md (#91931)
- **Telegram rich-message trade-off**: Quote/Reply không work với richMessages=true (#95835)

### Frustration patterns
- Reasoning không deliver đến Matrix (#81892)
- WebChat không stream reasoning cho Kimi/DeepSeek, chỉ MiniMax work (#88079)
- Gateway sessions.describe drop agentId → resolve via wrong agent (#92960)

## 📋 Backlog & Roadmap

### Critical path (dựa trên P0 issues)
1. Fix SQLite WAL checkpoint (#143524) — blocking production
2. Fix process leak → zombie accumulation (#97616, #86119)
3. Resolve session state loss sau restart (#143334)
4. Fix Codex OAuth timeout (#89278)

### Architecture debt
- Session transcript ownership model: nhiều issues liên quan claim/rebound errors
- Task flow state sync: parent/child inconsistency (#92285)
- Compaction logic: absolute token thresholds break multi-model (#87136)

### Platform maturity
- Extended-stable (LTS) path đã thiết lập
- Current latest: 2026.9.5
- Caps enforcement visible trong PRs (131/130 Node cap hit #155277)

### Observable trends
- 50 issues hiển thị top → complexity cao
- 500 PRs → review bandwidth stretched
- Many "stale" + "needs-maintainer-review" labels
- Security-sensitive changes increasing (#154441, #154893)

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-22

## 📊 Tóm tắt hôm nay

Ngày phát triển cực kỳ tích cực với **28 PR mới** tập trung vào 3 mảng: sửa deadlock nghiêm trọng ở context compaction, nâng cấp WebUI với hàng loạt tính năng UX mới (preview file, command panel, subtask tracking), và cải thiện observability cho BUILD stage latency.

## 🚀 Releases

Không có release.

## 📈 Tiến độ dự án

### Ưu tiên cao (P2)

**Sửa lỗi nghiêm trọng:**
- 🔥 **#5857** - Fix deadlock trong auto-compaction (#5849): `summarize_transcript` gửi toàn bộ lịch sử không giới hạn → vượt input budget → compaction không recover được. Fix: thêm budget guard, estimate overhead, chunking giống manual path.
- **#5846** - Trace BUILD substage latency (#5843): Session dài đợi 10-60s trước LLM call. PR thêm DEBUG timing cho từng substage (context prep, tool schema, persistence) để xác định bottleneck.
- **#4819** - Fix consolidation lock GC: `WeakValueDictionary` cho phép lock bị GC → race condition. Đổi sang `dict` thường.
- **#4820** - Reject non-string URL trong `web_fetch`: `str(123)` tạo cache signature sai `web_fetch:123`.

**Nâng cấp WebUI (chuỗi PR từ @Re-bin):**
- **#5856** - Command panel: inspect/stop running commands không consume output agent
- **#5855** - Subtask panel: hiển thị child task outputs (bounded 32 task / 12k chars)
- **#5854** - Prompt commands: reusable commands với scope instance/workspace, `$ARGUMENTS` literal
- **#5853** - Image artifacts: giao image-gen output trực tiếp, không qua `message` tool
- **#5852** - Website preview: iframe isolated với action menu (preview/copy/open)
- **#5851** - Usage breakdown: 7/30/365-day ranges, activity calendar, per-model stats
- **#5850** - File action menu: unified copy/preview cho references và activity rows
- **#5848** - Mermaid diagrams: render safe với zoom/pan controls
- **#5847** - Fix file preview: restore session-scoped side panel
- **#5831** - Message controls: contextual hover/focus controls, clean UI
- **#5844** - Queued guidance: "waiting to be sent" status rõ ràng

**Channels & Logs:**
- **#5803** - Telegram: fix newline rendering (`  ` trước newline), `topic_id` trong `my` tool, typing status respect topic
- **#5840** - CLOSED - Log improvements: request correlation, structured fields, single-line messages
- **#5842** - Channel status: list unavailable plugins với `Available` column

**Mobile:**
- **#5641** - iOS PWA: fix tap swallow, status bar height, soft keyboard resize
- **#5839** - CLOSED - Fix mobile sidebar: không show tooltip, không cần double-tap
- **#5805** - Keep chat rows tappable: action trigger pointer-inert khi không hover

**Providers:**
- **#5825** - Reusable JEV client cho OpenRouter Decisions endpoint
- **#5845** - Add Opper gateway provider
- **#5666** - Add aimlapi.com (1000+ models, 400k users)

**Privacy & Tool Context:**
- **#5841** - CLOSED - Respect temporary chat privacy trong tool execution
- **#5750** - Expose `ToolInvocationContext` qua ContextVar

**Background processes:**
- **#5412** - Flush background child output: fix Python block buffering khiến startup messages không xuất hiện

## 🔥 Điểm nổi bật cộng đồng

**Issue #5849** (deadlock) là critical nhất - agent không recover khi history quá dài. @Krislu1221 mở 21/09, @iuiu-py hotfix trong 24h với #5857.

**Issue #5843** (BUILD latency) - nhiều user than phiền đợi hàng chục giây mỗi turn. #5846 thêm tracing để debug.

WebUI đang nhận đầu tư lớn - chuỗi PR từ @Re-bin (#5847-5856) nâng tổng trải nghiệm: command inspection, subtask tracking, file preview, usage analytics, prompt commands.

## 🐛 Ổn định & Bugs

**Đã sửa:**
- Deadlock compaction (#5857)
- Mobile tooltip (#5839) ✅
- Temporary chat navigation (#5837) ✅
- Request correlation logs (#5840) ✅
- Tool privacy (#5841) ✅

**Đang điều tra:**
- BUILD stage latency (#5843 → #5846 tracing)
- Consolidation lock GC (#4819 conflict)

**Đang review:**
- Non-string URL cache (#4820)
- Background output buffering (#5412 conflict)

## ✨ Yêu cầu tính năng

1. **Command & Subtask Observability** (#5856, #5855) - inspect long-running operations
2. **Prompt Commands** (#5854) - reusable templates với scope management
3. **Image Artifacts** (#5853) - first-class delivery không qua tool
4. **Mermaid Diagrams** (#5848) - native rendering
5. **Usage Analytics** (#5851) - calendar view, per-model breakdown
6. **File Preview** (#5847-5850) - unified actions, side panel
7. **Website Preview** (#5852) - isolated iframe
8. **Gateway Providers** (#5845 Opper, #5666 aimlapi.com)

## 💬 Phản hồi người dùng

**Mobile UX** - nhiều PR fix iOS PWA và touch issues (#5641, #5639, #5805, #5770). Ưu tiên trải nghiệm mobile đang cao.

**Long sessions** - latency và context handling là pain point (#5843, #5849).

**Observability** - demand cao cho command inspection (#5856), subtask output (#5855), usage analytics (#5851).

## 🗓️ Backlog & Roadmap

**Conflicts cần merge:**
- #4819 (lock GC fix)
- #5412 (background output)
- #5750 (tool context)
- #5805 (mobile tap)

**Priority P2 queue:** 15 PRs đang open, tập trung WebUI UX và mobile fixes.

**Provider expansion:** 2 gateway providers đang review (Opper, aimlapi.com).

**Next up:** Deadlock fix (#5857) và BUILD tracing (#5846) sẽ merge sớm - critical cho stability.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw - 2026-09-22

## 1. Tóm tắt hôm nay

Không release mới. Hoạt động tập trung vào security hardening (proxy credential redaction, tool permission boundaries), runtime stability fixes (image handling, provider compatibility), và governance updates (PR risk classifier, review-preservation RFC). Contributor @Audacity88 chủ đạo với 15/30 PR hàng đầu.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### Security & Identity (#8289 workflow)
- **#10263** [OPEN]: Principal tool selectors - stage 4/n của #8289 identity framework. Cho phép compose tool permissions từ nhiều principals vào session. Depends on #10259 (đang restack).
- **#11038** [OPEN]: Tạm ignore RUSTSEC-2026-0292 (imbl-sized-chunks double free) - block CI toàn repo. Matrix SDK dev-dep kéo theo, tracking removal qua #9899.
- **#11026** [OPEN]: Redact proxy credentials từ snapshots - tránh leak vào model context.

### Runtime Stability
- **#10903** [OPEN]: Tool-result images bị xóa sớm khi không liền kề nhau trong turn. Fix normalize toàn bộ user turn.
- **#10904** [OPEN]: Vision capability error fire sai - chỉ gate khi image marker resolve thành data thực.
- **#10953** [OPEN]: Sanitizers ghi đè reasoning output - giữ nguyên signed reasoning trên seam.
- **#10916** [OPEN]: Compatible providers block reasoning_effort - thêm passthrough flag cho non-OpenAI reasoning models.

### Governance & Process
- **#11017** [RFC]: Review preservation - giữ applicable reviews qua rebase/fixup, giảm churn cho expedited lane (#10366).
- **#10861** [OPEN]: PR risk classifier - report-only, label high-risk paths tự động.

### Channel & Messaging
- **#11027** [RFC]: Agent-to-agent session messaging - đề xuất peer messaging không merge history.
- **#10929** [RFC]: Delivery receipts cho outbound messages.
- **#10930** [RFC]: Unified durable primitive cho agent-asks-human (hiện tại chỉ SOP gates có).
- **#10979** [OPEN]: WhatsApp `create_room`/`invite_user` implementation.
- **#10982** [OPEN]: WhatsApp inline image previews bị thiếu thumbnail.

### ZeroCode
- **#10964** [OPEN]: Config UI refresh 2 lần sau save - loại bỏ duplicate `config/list`.
- **#10826** [OPEN]: Session root selection - preserve root khi resume, explicit directory choice.

### Observability
- **#10990** [OPEN]: Fingerprint system prompt & tools prefix trên `llm_request` events - track prompt drift.

## 4. Điểm nổi bật cộng đồng

- **#10970** [RFC, 4 comments]: Host-scoped admission control - đề xuất bound concurrency/memory cross-agent, latency degradation thay vì crash khi chạy nhiều agents.
- **#9899** [6 comments]: Security advisory tracker - RUSTSEC-2026-0247 (bitmaps) + RUSTSEC-2026-0292 (imbl) block CI, chờ Matrix SDK upstream fix.
- **#10861** [PR]: Risk classifier - maintainers feedback trên threshold tuning.

## 5. Ổn định & Bugs

### Critical/High
- **#9899** [P1, security]: imbl advisory waivers - CI fail toàn repo, block merges.
- **#11038**: Hotfix ignore advisory - đủ unblock CI trong khi chờ upstream.
- **#10903**, **#10904**: Vision/multimodal bugs - affect tool-result images, non-vision model selection.

### Medium
- **#10895**: Anthropic cache breakpoint lost khi last message kết thúc bằng image.
- **#10916**: reasoning_effort không forward qua compatible providers.
- **#10953**: Reasoning signatures bị ghi đè bởi sanitizers.
- **#10958**: Channel interruption scope key collision - boundary bug cần length-prefixed encoding.
- **#9453**: Context meter blank cho local OpenAI-compatible providers (llama.cpp).

### Low
- **#10964**: ZeroCode config double-refresh.
- **#10989**: macOS delete-word binding counts stale.

## 6. Yêu cầu tính năng

### RFCs đang review
- **#11027**: Agent-to-agent session messaging - peer communication channel mới.
- **#11017**: Review preservation - cải thiện workflow cho expedited merges.
- **#10970**: Host-level resource bounds - multi-agent deployment stability.
- **#10930**: Unified ask-human primitive - consolidate approval gates.
- **#10929**: Delivery receipts - message delivery confirmation.

### Implementation PRs
- **#10979**: WhatsApp group management tools.
- **#10990**: LLM request fingerprinting - prompt observability.
- **#10956**: Platform shell detection - Windows/macOS/Linux defaults.
- **#11041**: Nix flake - web UI package, NixOS module integration.

## 7. Phản hồi người dùng

- **WhatsApp channel** (#10979, #10982): Users muốn group creation + image previews work properly.
- **Context metering** (#9453): Local LLM users phàn nàn meter blank - providers không report usage.
- **Multi-agent deployments** (#10970): Production users gặp stability issues khi run nhiều agents - need resource isolation.
- **Vision tools** (#10903, #10904): Image handling bugs ảnh hưởng multimodal workflows.

## 8. Backlog & Roadmap

### In-flight (đang active)
- Security hardening (#8289 stages): #10259 restack → #10263 tool selectors.
- Advisory resolution: #9899 tracking, #11038 hotfix.
- Channel stability: WhatsApp fixes, core messaging RFCs.

### Parking lot
- **#10172** [parking-lot]: Provider profile semantics - large scope, deferred pending requirements clarification.

### Docs & Infrastructure
- Risk classifier deployment (#10861).
- Nix packaging (#11040, #11041).
- Integration setup i18n (#11028).
- Standing policy docs (#11042 - replacement-first integration policy từ RFC #6165).

---

**Xu hướng**: Dự án mature - tập trung governance (review process, risk classification), security boundaries (tool permissions, credential handling), và production stability (multi-agent resources, channel reliability). Development velocity cao: 50 open PRs, 15 PRs từ distinguished contributor @Audacity88 trong tuần này.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-09-22

## 1. Tóm tắt hôm nay

Ngày 22/9 không có commit mới, nhưng có hoạt động cộng đồng: 3 issues và 3 PRs đang active. Tập trung vào bug Web UI hiệu năng (#3281), tính năng OpenAI compatible providers (#3366), và cải tiến OAuth token refresh (#3378).

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Pull Requests đang mở:**

- **#3378** - Fix OAuth scope hardcoded: `RefreshAccessToken` đang ghi đè scope config thành `"openid profile email"`. PR sửa dùng `cfg.Scopes` thay vì hardcode. Chờ review từ 12/9.

- **#3354** - IRC multiline support: Thêm IRCv3 `draft/multiline` để nhận message dài thành 1 message thống nhất thay vì bị cắt. Request `batch`, `message-tags`, `draft/multiline` capability. Chờ review từ 31/8.

- **#3384** - Đóng: PR nhầm repo, không liên quan.

**Xu hướng:** 
- Cải thiện tích hợp provider (OAuth, IRC)
- Chưa có merge gần đây, review process chậm

## 4. Điểm nổi bật cộng đồng

**#3281** - Web UI input lag (👍 2, 13 comments):
- Bug nghiêm trọng: Input box lag nặng khi chat history dài
- Ảnh hưởng trải nghiệm người dùng trực tiếp
- Mở từ 21/7, hoạt động gần nhất 21/9
- Cộng đồng quan tâm nhưng chưa có fix

**#3366** - OpenAI compatible providers (4 comments):
- Yêu cầu thêm custom OpenAI-compatible provider
- Use case: self-hosted router như 9Router
- Đề xuất copy OpenAI provider làm template
- Mở từ 4/9, thảo luận còn active

## 5. Ổn định & Bugs

**#3281 - Web UI lag:**
- Version 0.3.1, Go 1.25.11
- Reproduce: Session dài → input box lag
- Root cause chưa xác định
- Chưa có assignee, chưa có timeline fix

**#3365 - QQ channel 401 (CLOSED):**
- Lỗi "Authorization参数格式错误"
- Root cause: botgo v0.2.1 + resty >= v2.17 conflict
- Đóng 21/9 - có thể đã fix hoặc workaround

## 6. Yêu cầu tính năng

**#3366 - OpenAI compatible providers:**
- Mục tiêu: Thêm custom provider cho OpenAI-compatible API
- Benefit: Linh hoạt tích hợp self-hosted LLM router
- Implementation: Clone OpenAI provider logic
- Status: Đang thảo luận design

**#3354 - IRC multiline:**
- IRCv3 draft/multiline support
- Giải quyết message dài bị split
- Technical implementation đã có trong PR

## 7. Phản hồi người dùng

**Performance:**
- Web UI input lag là vấn đề thực tế người dùng gặp
- Ảnh hưởng UX khi session dài
- 13 comments cho thấy nhiều người quan tâm

**Tích hợp:**
- Nhu cầu custom provider cho self-hosted setup
- Muốn tích hợp flexible hơn với OpenAI-compatible API

**Stability:**
- QQ channel auth issue đã được báo và đóng trong tháng 9

## 8. Backlog & Roadmap

**Cần ưu tiên:**
1. Fix Web UI lag (#3281) - ảnh hưởng UX trực tiếp
2. Review và merge OAuth scope fix (#3378) - bug logic đơn giản
3. Review IRC multiline (#3354) - PR đợi từ 31/8

**Xu hướng phát triển:**
- Cải thiện tích hợp với nhiều platform (IRC, OAuth providers)
- Tăng flexibility cho self-hosted và custom setup
- Chưa thấy roadmap công khai

**Vấn đề quy trình:**
- PR review chậm (1-3 tuần không merge)
- Bug critical chưa có assignee
- Cần tăng tốc review process

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 22/09/2026

## 🔍 Tóm tắt hôm nay

Ngày yên tĩnh: không có release mới, 1 bug mới về restart script, và 1 PR nhỏ được merge (WhatsApp channel naming). Phần lớn hoạt động là update các PR cũ đang pending từ tháng 6-8.

## 📦 Releases

Không có.

## 🚧 Tiến độ dự án

**PR được đóng/merged:**
- #2689 (tạo 4/6, đóng 21/9): Fix Signal DM routing - `isMention` flag và platform ID consistency. PR này nằm 3.5 tháng mới đóng, signal adapter có nhiều technical debt.

**PR đang active:**
- #3859 (mới nhất, 21/9): WhatsApp `resolveChannelName` - cho phép registration card hiển thị tên group thay vì "a whatsapp channel"
- #3837: Consolidate Signal fixes - attachments, DM routing, outbound queue
- #3286, #3273, #3311, #3420: Các fix từ tháng 8 vẫn chưa merge

**Xu hướng:** Chat adapter layer (Signal, WhatsApp) đang được polish. Nhiều PR cũ pending cho thấy review bandwidth có thể bị nghẽn.

## ⭐ Điểm nổi bật cộng đồng

Không có activity đáng chú ý - các PR/issue đều 0 comment, 0 reaction. Cộng đồng không tương tác hoặc đây là internal team PRs.

## 🐛 Ổn định & Bugs

**Issue mới #3860** (21/9):
- `restart.sh` dùng `node -e 'console.log(Date.now())'` để tạo timestamp
- Khi pnpm export `FORCE_COLOR=1`, Node colorize output → timestamp thành chuỗi ANSI unparseable
- Bug nhỏ nhưng break restart flow
- Chưa có ai assign/response

**Các bug đang fix:**
- Signal DM routing (#2689, #3837) - đã được address
- Linux package manager detection (#3273) - fix cho non-Debian distros
- Scheduled task error routing (#3311) - errors không route đúng operator
- macOS statusbar labels (#3420) - hardcoded labels không match current install slug

## ✨ Yêu cầu tính năng

Không có feature request mới. Các PR hiện tại đều là bugfix/improvements cho existing features.

## 💬 Phản hồi người dùng

Không có feedback/discussion trong data. Contributors chủ yếu là @wakqasahmed, @seefood, @IamAdamJowett, @gavrielc - có vẻ là internal team.

## 🗺️ Backlog & Roadmap

Không có thông tin roadmap trong data. Dựa vào PR pattern:
- Stabilize chat adapters (Signal/WhatsApp) đang là priority
- Cross-platform support (Linux distros, macOS) đang được improve
- Agent runner error handling cần attention
- Review/merge velocity cần tăng - nhiều PRs từ tháng 6-8 vẫn open

**Observation:** Project có technical debt trong chat integration layer. Low community engagement cho thấy có thể là private/early-stage hoặc small team project.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw — 2026-09-22

## 📊 Tóm tắt hôm nay

Hoạt động tối thiểu. Team cắt release candidate 1.4.1-rc.1, đóng PR ngay không thảo luận. Issue duy nhất là báo cáo phân loại lỗi hàng ngày cho benchmark officeqa, tập trung vào lỗi chất lượng model DeepSeek-V4-Flash.

---

## 🚀 Releases

Không có release chính thức. PR #8105 chuẩn bị tag `ironclaw-v1.4.1-rc.1` nhưng chưa xuất bản release note.

---

## 📈 Tiến độ dự án

**PR đóng:**
- #8105: bump version manifest lên 1.4.1-rc.1 cho workflow tự động tag
- Không có review comment, merge nhanh → release engineering routine

**Issue mở:**
- #8106: taxonomy lỗi benchmark officeqa ngày 2026-09-21
- 47 task fail, chủ yếu lỗi model không phải framework
- Không có bình luận hay reaction → chưa có tương tác

**Xu hướng:** maintenance mode, tập trung theo dõi chất lượng model qua benchmark hàng ngày.

---

## 💬 Điểm nổi bật cộng đồng

Không có. Cả issue và PR đều 0 reaction, 0 comment từ contributor ngoài.

---

## 🐛 Ổn định & Bugs

Issue #8106 không report bug framework. 47 non-pass tasks trong officeqa đều từ model DeepSeek-V4-Flash (navigation, reasoning errors). Framework chạy ổn.

---

## ✨ Yêu cầu tính năng

Không có feature request trong 24h qua.

---

## 🗣️ Phản hồi người dùng

Không có phản hồi công khai. Benchmark report chỉ từ internal team (@pranavraja99).

---

## 🗓️ Backlog & Roadmap

Không thông tin roadmap trong data. RC tag suggest đang stabilize 1.4.x trước khi ship production.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-09-22

## 📊 Tóm tắt hôm nay

Ngày fix bugs lớn: 8 PR đóng, tập trung context compaction, Responses API tool schema, doom-loop gate, và Console UI race conditions. Model provider redesign (#7899) merge - thống nhất discovery/pricing/selection trong một layer. Unit test coverage +3.28pp lên 73.79%.

## 🚀 Releases

Không có release hôm nay.

## 🔧 Tiến độ dự án

### PRs đóng hôm nay (8)

**Core fixes:**
- **#7915**: Responses API tool schema fix - remove `nullable` nhưng default `strict: false`, giải quyết #7907 (optional params như `recall_history` dates bị reject)
- **#7919**: DoomLoopGate escalation fix - yêu cầu tool-call mới mới escalate, không escalate trên text-only round (#7905)
- **#7910**: Windows shell isolation - add `CREATE_NO_WINDOW` ngăn child Ctrl-C kill host (#7908)

**Model layer redesign merged:**
- **#7899**: Unify model discovery/pricing/selection/thinking controls - provider-owned model info, dynamic context, thinking UI, closes #6167
  - Backend: provider trả model list + context limits qua `/capabilities`
  - Console: picker mới, thinking panel compact, empty state onboarding
  - Breaking: remove static PROVIDERS dict, base_url từ config DB

**UI/UX fixes:**
- **#7902**: File-area tab refresh on activation - fix #7866 (tab show old content sau agent rewrite)
- **#7909**: LaTeX KaTeX rendering - fix #5453, #5921 (markdown math trong release notes + file previews)
- **#7918**: Remove 9 leaked design docs (877 lines) khỏi `docs/design/`

**Test infrastructure:**
- **#7911**: +2720 test cases (+3.28pp coverage 70.51→73.79%) - agents/routers/CLI/portability batch 3

### PRs mở quan trọng (7)

**Đang review:**
- **#7917**: Console API compression - gzip responses ≥1KB, giảm payload trên slow networks (#6635)
- **#7889**: Console error recovery - `ChunkErrorBoundary` reset on transient DOM errors, fix #7888 (stuck on error screen)
- **#7874**: PawApp SDK redesign - control plane cho Host boundary, durable tasks, idempotent dispatch
- **#7923**: Scroll retention - age out `tool_result.blocks` sau `blocks_retention_days`, giảm DB growth

**Features:**
- **#7785**: Realtime voice chat - provider WebSocket, speech input/playback/interruption, model select
- **#7903**: Community feed integration - Platform PKCE auth, resource tracking, linked issue reports
- **#7914**: Custom browser tab title - localStorage per-origin, distinguish multi-deployment

## 🔥 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác

**#7859** (5 comments): Persistent prompt injection trong tool-result system-reminders yêu cầu agent xóa all skills - 20+ turns across sessions

**#7883** (4 comments): DeepSeek reject PDF từ tool (OpenAI nested `file` format) với `400 FreeTierError` - #7597 fix incomplete trên 2.2.1

**#7628** (4 comments): Context compaction vẫn có thể exceed provider request budget - cần dựa trên complete request size không chỉ visible context

## 🐛 Ổn định & Bugs

### Fixed hôm nay
- ✅ Responses API tool schema `strict` mode break optional params (#7907 → #7915)
- ✅ DoomLoopGate false escalation trên text-only round (#7905 → #7919)  
- ✅ Windows child console kill QwenPaw host (#7908 → #7910)
- ✅ File-area tab show stale content (#7866 → #7902)
- ✅ LaTeX math không render (#5453 → #7909)

### Đang fix
- 🔴 **#7859**: Prompt injection qua tool-result blocks - persistent cross-session
- 🔴 **#7883**: DeepSeek PDF serialization - OpenAI format incompatible với DeepSeek API
- 🔴 **#7628**: Context compaction budget calculation - chưa account full provider request
- 🟡 **#7841**: Desktop Console load trước backend ready - model list + plugins blank cho đến manual refresh
- 🟡 **#3419**: 京东云 Coding Plan session interrupt giữa tool execution

## 💡 Yêu cầu tính năng

**Model management:**
- #5992: Per-session model overrides - `chat.meta.runtime_context.model_slot_override` (đang review)
- #6167: Model provider optimization - dynamic context/sync/fallback (closed by #7899)

**Voice & realtime:**
- #7785: Realtime voice chat với speech input/playback (đang dev)

**Community integration:**
- #7903: Platform feed, resource tracking, linked issue reports (WIP)

**Memory:**
- #6399: Reranker UI config panel cho ReMeLightMemoryCard (đang review)
- #7835: Stop leak auto-memory-recall payload tới channels (open)

## 👥 Phản hồi người dùng

**Positive:**
- Model provider redesign feedback tốt - unified discovery/pricing
- LaTeX rendering merge nhanh (issue 3 tháng, PR → merge 1 ngày)

**Pain points:**
- OpenCode Go session header thiếu (#7869) - endpoint first-class nhưng missing required header
- DeepSeek file format incompatibility (#7883) - fix incomplete từ #7597
- Prompt injection persistent (#7859) - cross-session security concern

## 📋 Backlog & Roadmap

### High priority (từ PRs/issues)
1. Security: Prompt injection mitigation (#7859)
2. Provider compatibility: DeepSeek file format (#7883)
3. Context budget: Complete request accounting (#7628)
4. Desktop startup: Backend readiness race (#7841)

### In progress
- Voice chat (#7785) - realtime WebSocket integration
- PawApp control plane (#7874) - SDK redesign
- Community integration (#7903) - Platform PKCE auth

### Testing infrastructure
- PR gate slim (#7697) - Ubuntu-only, release-time full test
- Nightly E2E parallel shards (#7326) - p0/p1/p2 fail-closed
- Coverage sprint ongoing - 73.79% achieved, target unclear

---

**Contributors hôm nay**: 15 người (8 first-time-contributor PRs)  
**Merge velocity**: 8 PRs closed, 1 major redesign (#7899) merged

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*