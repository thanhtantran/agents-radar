# Bản tin Hệ sinh thái Hermes Agent 2026-10-27

> Issues: 191 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-27 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-27

## 📊 Tóm tắt hôm nay

27/10 Hermes Agent tập trung fix compaction bugs, auth gaps, và workflow stability. 30 PRs merge/open trong 24h, chủ yếu fix session-state corruption sau compaction, auth bypass ở A2A/webapp, và Kanban orchestration gaps. Không có release mới.

## 🚀 Releases

Không có releases.

## 📈 Tiến độ dự án

### PRs quan trọng (30 PRs active)

**Compaction fixes - chuỗi 4 PRs (#145323-326):**
- #145323: Native compaction giữ user asks thực trước synthetic rows (task-list snapshot, nudges)
- #145324: Codex routes không disable được reasoning → floor request nếu model không support
- #145325: Subdirectory hints (AGENTS.md/CLAUDE.md) tái xuất sau compaction boundary
- #145326: **CRITICAL** - Hygiene compaction vào rewind loop, duplicate transcripts → ~300k rows/day vào state.db

**Auth & security:**
- #145310: A2A refuse browser-origin requests khi không có bearer token (CSRF gap)
- #145107+#145106: Webapp plain-HTTP sends, browser-blocked pop-out detection, rebuild-safe chunks

**Kanban orchestration gaps - 3 PRs (#145317-321):**
- #145317: `kanban_reclaim` cho orchestrator agents (giờ chỉ có CLI operator reclaim được)
- #145319: `kanban_request_changes` cho lead review cards (giờ chỉ reviewer worker làm được)
- #145321: Delegation routes carry instructions + tool restriction + iteration cap (parity với Claude Code `.claude/agents/*.md`)

**Platform fixes:**
- #145328: Browser janitor start lúc gateway boot, không đợi first request
- #145312: Mattermost thread free-response sau @mention đầu tiên

### Issues nổi bật (191 open)

**P1 severity:**
- #135487: Cron worker dies on `database is locked`, execution lost (no retry trong `adopt_claimed_execution()`)

**High-impact bugs (P2):**
- #144896: Streaming tự tắt khi error message chứa `"stream"` + `"not supported"` (false-positive từ upstream error text)
- #145286: `session.create` refusals gửi `data.fields`, CLI đọc `data.field` → policy refusal render thành "model connection error"
- #144984: `session.resume` reject `moa://local` base_url → mọi MoA chat mở thành `not_found`
- #143720: Discord thread completion wake refused `admission_conflict` mãi (494 occurrences trong 6h log)

**Desktop stability:**
- #143426: Linux desktop launch với 6% opacity (translucency default apply qua `setOpacity`, Settings ẩn control)
- #131055: Second-instance launch poison sandbox fallback marker → sticky `--no-sandbox` → renderer SIGILL loop

## 🔥 Điểm nổi bật cộng đồng

**Most commented (52 comments):**
- #131859: Cannot open PR via API - `CreatePullRequest` permission error. Issues + fork PRs work, direct PRs fail.

**High engagement:**
- #143426: Linux opacity bug - 12 👍
- #134659: MiniMax-M3.1 live trên API nhưng missing từ `/v1/models` + docs - 2 👍

**Recurring pain points:**
- Session state corruption sau compaction (6 related issues)
- Desktop connection "gateway not connected" cần manual refresh (#143417)
- Kanban notify subscriptions never cleared cho 'done' tasks (#108913)

## 🐛 Ổn định & Bugs

### Critical stability issues

**State corruption:**
- Hygiene compaction rewind loop → database bloat 300k rows/day (#145326)
- Gateway compresses sessions không thực sự full khi token counts missing (#99540)
- Concurrent sessions cross-contaminate (shared memory + git worktree) (#46303)

**Auth gaps:**
- A2A no-token mode trust browser POSTs → CSRF vector (#145310 fixes)
- Desktop new sessions fail `"provider 'custom' resolved without credentials"` intermittently (#144523)
- Cross-process plugin activation returns 401 trên login-gated dashboards (#141878)

**Platform delivery:**
- QQBot group sends route sai endpoint sau gateway restart (#119805)
- Discord auto-thread wakes refused `admission_conflict` forever (#142461)
- Telegram `allowed_chats` JSON string mis-parsed → group messages dropped (#109423 - closed)

### Performance

- Desktop Windows style recalc: 48% renderer time, single recalcs 1.4s over ~6k nodes (#99889)
- Codex long-task first-progress stalls 300s (#131743)

## 💡 Yêu cầu tính năng

**Kanban workflow (3 PRs hôm nay):**
- Orchestrator reclaim running cards (#145317)
- Orchestrator request changes on review cards (#145319)
- Delegation routes carry instructions + toolset limits (#145321)

**Subagent lifecycle v1.1 (#133212):**
- Steer, host-isolation transport cho plugin orchestrators
- Effort/route/follow-up trên facade

**Local models:**
- Multi-GPU VRAM detection (2x RTX3090 chỉ thấy 24GB) (#118418)
- Model download resume sau sustained outages (#144313 - PR open)

**Federation:**
- P2P heartbeat cho `hermes peer` cross-devices (#76661 - PR open)

## 📣 Phản hồi người dùng

**Pain points:**

1. **Desktop UX gaps:** Connection state stale, opacity defaults không configurable, first-run installs fail trên Windows native (#131199)

2. **Compaction breaks continuity:** Terminal session_id lost, subdirectory hints vanish, user asks pruned before synthetic rows

3. **Auth confusion:** Error messages không map tới root cause (policy refusal → "model connection error"), intermittent custom provider failures

4. **Kanban workflow incomplete:** Lead agents không có tools cho review cycle, parked cards vẫn auto-decompose (#144887)

**Positive signals:**
- 7335 closed (1000+ open issues milestone discussion)
- Multiple salvage PRs từ stale branches (community contributions being recovered)

## 📋 Backlog & Roadmap

### Immediate priorities (inferred từ P1/P2 PRs)

1. **Compaction stability:** Fix rewind loop (#145326), preserve session_id (#136549), re-arm hints (#145325)
2. **Auth hardening:** A2A CSRF (#145310), webapp plain-HTTP (#145106), custom provider intermittent failures (#144523)
3. **Kanban completion:** Orchestrator tools (#145317, #145319, #145321)

### Medium-term (P3 + needs-decision)

- Subagent lifecycle v1.1 plugin facades (#133212)
- Desktop Kanban notify lifecycle gaps (#138836)
- Async delegation completions wake personal gateway sessions (#130226)
- Context engine checkpoint authority (#94983)

### Infra debt

- 1000+ open issues (automation/triage discussion #7335)
- Desktop performance (style recalc dominance #99889)
- Multi-GPU detection (#118418)

**Trend:** Shift từ feature velocity → stability + workflow completion. Compaction + auth fixes dominate hôm nay's PRs.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-27

## 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 2026-10-27 cho thấy **sự phân hoá rõ về giai đoạn trưởng thành**. Hermes Agent dẫn về quy mô (191 issues, 500 PRs) nhưng gặp crisis về stability - compaction bugs, auth gaps tràn lan. OpenClaw (85 issues, 500 PRs) đang optimization sprint - giải quyết memory leak và UI performance. NanoBot, Zeroclaw, QwenPaw thuộc nhóm mid-tier với tốc độ phát triển ổn. Nhóm còn lại (PicoClaw, NanoClaw, NullClaw, IronClaw) hoạt động yếu hoặc ngưng trệ.

**Điểm chung**: Tất cả dự án active đều fix security gaps, optimize context management, cải thiện UI/UX. Không ai có release mới ngày hôm nay.

---

## 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ tương tác | Trọng tâm |
|-------|--------|-----|----------|---------------|------------------|-----------|
| **Hermes Agent** | 191 | 500 | 0 | 30 PRs active | Cao (52 comments #131859) | Compaction crisis, auth gaps |
| **OpenClaw** | 85 | 500 | 0 | 58 issues/PRs | Medium | Memory leak, UI streaming |
| **NanoBot** | 3 | 29 | 0 | 8 PR merge, 21 open | Low | WebUI polish, tool validation |
| **Zeroclaw** | 22 | 29 | 0 | 8 security issues | Medium | Security hardening |
| **PicoClaw** | 4 | 5 | 0 | 1 feature request | Very low | Backlog cleanup |
| **NanoClaw** | 4 | 8 | 0 | 4 security + 1 core fix | Low | Security + delivery |
| **NullClaw** | 0 | 4 | 0 | 4 PR provider/LINE | Very low | Provider compat |
| **QwenPaw** | 15 | 47 | 0 | 6 merge, 4 new PR | Medium | Memory upgrade, Linux parity |
| **IronClaw** | 0 | 0 | 0 | Không hoạt động | None | N/A |

---

## 🎯 Vị thế của Hermes Agent

### Ưu điểm
- **Quy mô lớn nhất**: 191 issues, 500 PRs - dẫn về developer activity
- **Tốc độ cao**: 30 PRs active trong 24h - vận tốc phát triển nhanh
- **Community engagement mạnh**: Issue #131859 có 52 comments, #143426 có 12 👍
- **Workflow advancement**: Kanban orchestration (3 PRs), delegation routes - tính năng cao cấp

### Vấn đề nghiêm trọng
- **State corruption**: Hygiene compaction rewind loop → 300k rows/day bloat (#145326)
- **Auth security gaps**: A2A CSRF vector (#145310), intermittent auth failures
- **Platform stability**: Gateway database lock, Discord thread conflicts, Desktop connection failures
- **Không có release**: Version tổ chức yếu, bug fixes không đi kèm release cycle

### So với đối thủ
- **OpenClaw**: Ít issues hơn (85 vs 191) nhưng có optimization plan rõ ràng, focus memory leak targeted fix
- **Zeroclaw**: 8 security issues mới nhưng đã có 4 PRs fix đi kèm - response nhanh hơn
- **QwenPaw**: Memory backend upgrade có kế hoạch (ReMe 0.4.2.0 merged, PowerContext v1.4.0 review) - architecture cleaner

**Đánh giá**: Hermes Agent ở giai đoạn **growth crisis** - quy mô lớn nhưng technical debt tích luỹ nặng, velocity cao nhưng thiếu release discipline. Risk: community fatigue nếu không stabilize nhanh.

---

## 🔧 Hướng kỹ thuật chung

### 1. **Context management - xu hướng trung tâm**

**Compaction & summarization**:
- Hermes: Native compaction giữ user asks (#145323) - reactive fix
- OpenClaw: Context summarization thay trimming (#12038) - proactive redesign  
- QwenPaw: PowerContext v1.4.0 integration (#8376) - external backend
- Zeroclaw: Append-only session events (#11921) - fundamental rearchitecture

**Insight**: Mọi dự án đều hit context window limits. Hermes patch nhanh, OpenClaw/Zeroclaw rethink architecture, QwenPaw delegate cho external service.

### 2. **Security hardening wave**

**Auth & access control**:
- Hermes: A2A CSRF, webapp plain-HTTP (#145310, #145106)
- Zeroclaw: 8 issues từ security review (OIDC CSRF, SOP workshop privilege escalation #12046-12053)
- NanoClaw: 4 issues về lockdown network, read-only paths, approval flow (#4228-4231)

**Pattern**: Security audit → burst of issues. Hermes và Zeroclaw có external security review. NanoClaw có internal hardening sprint.

### 3. **Memory optimization**

**Heap & DB bloat**:
- Hermes: Database bloat 300k rows/day (#145326)
- OpenClaw: Gateway heap leak 60% sau 1 ngày (#180898), 3.5GB DB → 6min startup (#181459)
- QwenPaw: `blocks` chiếm 75% history.db → age out retention (#8443)

**Approach**:
- OpenClaw: Profile AsyncLocalStorage leak, targeted fix
- QwenPaw: Selective retention (keep text, drop blocks after 90 days)
- Hermes: Firefight rewind loop (reactive)

### 4. **UI streaming performance**

- OpenClaw: Media reply re-parse 12.4s (#185298), HTML/JSX boundary re-project 15.1s (#185289)
- Hermes: Desktop style recalc 48% renderer time (#99889)
- QwenPaw: Replay buffer delta optimization (#8348)

**Common issue**: Full re-render mỗi delta → O(n²) complexity. QwenPaw fix xong, OpenClaw đang fix, Hermes chưa address.

### 5. **Platform expansion**

**Desktop parity**:
- Hermes: Linux opacity bug (#143426), connection state stale
- QwenPaw: Linux deb/AppImage packaging (#8444), Wayland portal cho Computer Use
- OpenClaw: Windows restart/update unreliable (#170956)

**Mobile/Chat platforms**:
- NullClaw: LINE integration (typing status, mention trigger)
- Zeroclaw: Native XMPP (#11847)
- NanoBot: Telegram auto-title (#5803)

---

## 🎨 Điểm khác biệt

### Chiến lược phát triển

| Dự án | Chiến lược | Evidence |
|-------|-----------|----------|
| **Hermes** | Velocity-first, fix reactive | 30 PRs/day, bugs tồn đọng lâu |
| **OpenClaw** | Stability-first, optimization sprints | P0 list targeted, test cleanup campaign |
| **Zeroclaw** | Security-first, architecture redesign | 8 security issues → 4 PRs cùng lúc, append-only events |
| **QwenPaw** | Modular backend, external integration | ReMe/PowerContext external, SDK plugin extraction |

### Tính năng độc đáo

**Hermes**:
- Kanban orchestration cho multi-agent workflow (#145317-321)
- Subdirectory hints (AGENTS.md/CLAUDE.md) cho project structure

**OpenClaw**:
- Plugin reload handover - zero-downtime updates (#185315)
- Webchat authors persistence qua restart (#185225)

**Zeroclaw**:
- Append-only session events - immutable audit trail (#11921)
- Native XMPP với OMEMO encryption (#11847)

**QwenPaw**:
- Experimental Code Mode - Python scripts với `await tools.*()` (#8224)
- ReMe memory backend với auto-Dream (#8347)

**NanoBot**:
- Bang commands (`!command`) cho Shell integration (#6173)
- Unified code/diff highlighting (#6412)

### Cộng đồng & governance

**Hermes**: High engagement (52 comments/issue) nhưng không có clear roadmap. 1000+ open issues discussion (#7335) - organization issue.

**OpenClaw**: Medium engagement, có optimization plan rõ ràng (P0 list), test cleanup systematic (batches d646-d650).

**Zeroclaw**: External security review (Hlido 79/100 #12042), responsive (8 issues filed 26/10 → 4 PRs same day).

**QwenPaw**: Detailed PRs (size/XXXL with spec), contributor-friendly (first-time contributor PRs under review #7613).

**PicoClaw/NanoClaw/NullClaw**: Bot-driven cleanup, low human engagement - maintenance mode.

---

## 🌱 Mức độ trưởng thành cộng đồng

### Tier 1: Mature (Hermes, OpenClaw)
- **Characteristics**: 85-191 issues, 500 PRs, sustained activity, external contributors
- **Hermes**: Velocity cao nhưng organization chaos (1000+ open issues), cần triage automation
- **OpenClaw**: Systematic cleanup (test campaigns), clear priority (P0 list), responsive maintenance

### Tier 2: Growing (QwenPaw, Zeroclaw, NanoBot)
- **Characteristics**: 3-22 issues, 29-47 PRs, active development, architectural improvements
- **QwenPaw**: High-quality PRs, modular design, external integrations
- **Zeroclaw**: Security-conscious, fundamental redesigns (append-only events)
- **NanoBot**: Steady incremental improvements, tool ecosystem expansion

### Tier 3: Early/Maintenance (PicoClaw, NanoClaw, NullClaw)
- **Characteristics**: 0-4 issues, 4-8 PRs, low engagement, bot cleanup
- **PicoClaw**: Stale bot cleaning backlog, 1 feature request/day
- **NanoClaw**: Security hardening sprint but low community
- **NullClaw**: Provider compatibility fixes, LINE integration progress

### Tier 4: Dormant (IronClaw)
- No activity 24h

### Indicators of maturity
- **Release discipline**: None có release hôm nay - tất cả dự án đều weak ở version management
- **Issue triage**: OpenClaw có P0/P1, Hermes chaos (1000+ open)
- **Security process**: Zeroclaw có external review, NanoClaw có internal audit
- **Documentation**: QwenPaw PRs có detailed spec, OpenClaw có optimization plan visible

---

## 🔮 Tín hiệu xu hướng

### 1. **Context management là bottleneck chính**
- **Hiện tại**: Mọi dự án đều hit context limits, solutions khác nhau (compaction, summarization, external backends)
- **Xu hướng**: Architectural rethinking (Zeroclaw append-only, QwenPaw external PowerContext) thắng reactive patching (Hermes)
- **Dự đoán**: 2027 Q1 sẽ có standardized context protocol, external context services (như vector DBs hiện tại)

### 2. **Security từ afterthought → first-class**
- **Hiện tại**: Security audits trigger burst fixes (Zeroclaw 8 issues, NanoClaw 4 issues cùng ngày)
- **Xu hướng**: Auth hardening (OIDC, CSRF, bearer verification), access control (scoped principals, tool restrictions)
- **Dự đoán**: 2027 sẽ có AI agent security frameworks, compliance certifications (SOC 2 cho agents)

### 3. **Memory efficiency trở thành competitive advantage**
- **Hiện tại**: Heap leaks (OpenClaw 60%/day), DB bloat (Hermes 300k rows/day, QwenPaw 75% blocks)
- **Xu hướng**: Selective retention (QwenPaw age out blocks), streaming optimization (delta not full snapshot)
- **Dự đoán**: Long-running agents (days/weeks) sẽ phổ biến, memory management critical như garbage collection

### 4. **Multi-agent orchestration next frontier**
- **Hiện tại**: Hermes leading với Kanban orchestration (#145317-321), delegation routes
- **Xu hướng**: Lead/review cycles, effort routing, follow-up delegation - workflow primitives
- **Dự đoán**: 2027 sẽ có agent workflow DSLs (như Kubernetes YAML cho containers)

### 5. **Desktop parity catching up to web**
- **Hiện tại**: QwenPaw Linux packaging (#8444), OpenClaw Windows stability (#170956), Hermes opacity bugs
- **Xu hướng**: Native desktop features (Computer Use, Native Messaging), platform-specific optimization
- **Dự đoán**: 2027 desktop agents sẽ dominant cho power users (developers, analysts)

### 6. **External service integration > monolith**
- **Hiện tại**: QwenPaw ReMe/PowerContext external, Zeroclaw A2A extraction (#11712)
- **Xu hướng**: Memory backends pluggable, protocol separation (MCP 2.0 #119294)
- **Dự đoán**: Agent platforms sẽ là orchestrators, core capabilities từ specialized services

### 7. **Release discipline still immature**
- **Hiện tại**: 0/9 dự án có release hôm nay, Hermes 500 PRs no release, OpenClaw version 2026.10.7 cũ 20 ngày
- **Risk**: User frustration, adoption barrier (unstable APIs), enterprise hesitation
- **Cần**: CI/CD automation, semantic versioning, changelog discipline

### 8. **Community governance models diverging**
- **Hermes**: Open chaos (1000+ issues) - scaling pain
- **Zeroclaw**: Curated (external audit, responsive fixes) - quality focus
- **QwenPaw**: Structured (size labels, detailed specs) - contributor-friendly
- **Dự đoán**: Successful projects sẽ adopt triage automation + clear roadmap (OpenClaw model)

---

## 💡 Khuyến nghị chiến lược

### Cho Hermes Agent
1. **Urgent**: Fix compaction rewind loop (#145326) - database bloat unsustainable
2. **Critical**: Establish release cadence - 500 PRs no release destroys trust
3. **High**: Issue triage automation - 1000+ open issues unmanageable
4. **Medium**: Security audit external - Zeroclaw model (found 8 issues 1 day)

### Cho các dự án khác
- **OpenClaw**: Continue optimization sprint, consider external context backend (QwenPaw model)
- **Zeroclaw**: Release v0.9.0 with security fixes - establish trust
- **QwenPaw**: Linux desktop delivery (#8444) opens new market
- **NanoBot/PicoClaw/NanoClaw**: Consolidate hoặc pivot - maintenance mode không sustainable

### Cho hệ sinh thái
- **Standards needed**: Context protocol, security framework, workflow DSL
- **Collaboration opportunity**: External context services (shared backend cho tất cả dự án)
- **Market signal**: Desktop parity = enterprise readiness indicator

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-27

## 🎯 Tóm tắt hôm nay

OpenClaw đang trong giai đoạn ổn định hoá phiên bản 2026.10.x với **nhiều fix quan trọng về hiệu năng và reliability**. Hôm nay có **58 issues/PRs mới**, tập trung vào memory leak gateway, UI streaming performance, và Windows update bugs. Không có release mới.

## 📦 Releases

Không có releases trong 24h qua. Phiên bản mới nhất: 2026.10.7

## ⚡ Tiến độ dự án

### PRs quan trọng đang active

**Hiệu năng UI/Gateway:**
- #185130: Giảm reactive graph work không cần thiết - Control UI đang waste compute cho sidebar/transcript không đổi
- #180898: Gateway heap leak 60% sau 1 ngày - AsyncLocalStorage giữ full session-store copies per turn
- #185298: Media reply re-parse toàn bộ reply mỗi delta (12.4s ở 128KB)
- #185289: HTML/JSX tag ở delta boundary re-project toàn bộ reply (15.1s ở 256KB)

**Reliability fixes:**
- #185309: Windows installer không start sau npm shim install
- #184889: Failed npm update rollback có thể xoá hoàn toàn package root
- #185225: Webchat authors mất khỏi participants khi restart recovery

**Architecture:**
- #185315: Plugin reload handover - cho phép plugin pass running turns sang version mới (draft)
- #184930: Fix Access choices bị mất và role grants không enforce đúng

### Xu hướng phát triển

**Optimization sprint** đang diễn ra:
- 8 PRs về performance (UI streaming, heap usage, reactive graph)
- Test cleanup campaign (batches d646-d650) - consolidate fixtures, remove duplicates
- Deslop gateway surfaces (#185157) - refactor indirection không cần thiết

**Windows reliability** đang được ưu tiên:
- #170956 (P0): Slow startup + unclean shutdown + schtasks errors
- #184658: Update cleanup failures
- #142987: Gateway bị kill khi spawn llama.cpp

## 🔥 Điểm nổi bật cộng đồng

### Issues nhiều tương tác

**#166634 (13 comments, P0)**: Late checkpoint failure khiến agent unavailable sau crash - đang khảo sát SQLite session reclamation timeout

**#140010 (16 comments, P1)**: Windows sleep/resume khiến UI/WebSocket fail 30-60s+ - gateway thaw recovery defers sau busy event-loop

**#162164 (11 comments)**: Feature request iOS/macOS personal identity while giữ Shared owner - đang design security review

### User pain points

1. **Memory/Performance**: #180898 (heap leak), #181459 (3.5GB DB → 6 min startup)
2. **Windows instability**: #170956 (restart unreliable), #169953 (update always fails)
3. **Session state**: #129314 (hidden context message dispatch standalone), #67419 (bootstrap files waste 20-30% tokens)

## 🐛 Ổn định & Bugs

### P0 Blockers

- **#170956**: Windows restart/update unreliable (slow startup + plugin shutdown + schtasks permission)
- **#184889**: Npm update rollback có thể brick install hoàn toàn
- **#142987**: Gateway crash khi spawn llama.cpp trên Windows

### Critical fixes landed

- #152145 (closed): Control UI interleave typed/realtime Talk messages sai order
- #89430 (closed): Google Chat app auth không deliver images/files (403)
- #128416 (closed): Tool calls batch với sessions_yield bị kill

### Regressions

- #185297: Read client credentials ném exception thay vì return null trên fresh bootstrap
- #182467: Project-parent sessions_spawn fail model validation dù models.list report available
- #116601: MiniMax-M3 image capability route qua Anthropic → lose vision

## 🎁 Yêu cầu tính năng

### Đang discuss

**#182315 (P1)**: Support Google Gemini Omni Flash cho video_generate - Veo 3.1 Preview retired

**#181215**: Control UI Side chat private per user thay vì shared per session - security concern trong multiplayer

**#185191**: Let shared agent workspace opt out của 0600 for new files - để users khác đọc được

**#164620**: Setting disable hosted plugin catalog feed - hardcoded `clawhub.ai/v1/feeds/plugins`

### Feature roadmap items

- #162164: iOS/macOS personal identity (opt-in)
- #119294: MCP 2.0 migration tracking (stateless spec)
- #168624: Android Auto support exploration (safety-first)
- #175826: Android match browser in-chat questions + native approval

## 💬 Phản hồi người dùng

### Pain points chính

1. **Large DB operations block startup**: #181459 - 3.5GB agent DB → 4-6 min startup, agent left UNAVAILABLE
2. **Windows update experience**: #169953 - update 2026.9.4→2026.10.2 always fails, repair discards config
3. **Memory leak**: #180898 - gateway heap grows 0.1 GiB/h off-heap, internal monitor không fire

### Positive feedback

- Plugin reload handover (#185315) được cộng đồng anticipate - giảm downtime khi update
- Test cleanup campaign được appreciate - easier maintenance

### Community requests

- #182395: Add DemonRoute as custom provider (OpenAI-compatible, anonymous keys, uncensored models)
- More offline/local support (llama.cpp stability, local MCP)

## 📋 Backlog & Roadmap

### Immediate priorities (sprint hiện tại)

**Performance:**
- Gateway heap leak (#180898) 
- UI streaming re-parse (#185298, #185289)
- Reactive graph optimization (#185130)

**Windows stability:**
- Startup/restart reliability (#170956)
- Update experience (#169953, #184889)

**Session state:**
- Checkpoint failure recovery (#166634)
- Large DB startup (#181459)

### Medium-term (Q4 2026)

- MCP 2.0 migration (#119294)
- Plugin reload handover (#185315)
- iOS/macOS personal identity (#162164)
- Access control fixes (#184930)

### Infrastructure debt

- Test consolidation campaigns (batches d646-d650 active)
- Gateway surface deslop (#185157)
- Deprecated model cleanup (MiniMax routing, Veo 3.1)

### Không có public roadmap document - infer từ P0/P1 issues và active PRs

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-27

## 1. Tóm tắt hôm nay

Ngày tập trung vào WebUI với 8 PR merge (giao diện, navigation, trải nghiệm người dùng). Đóng bug validation schema (#6485) và atomic write trên Windows (#6474). Không có release.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đã merge (8 PRs):**

- **WebUI navigation & UX:**
  - #6173: Bang commands (`!command`) và literal Shell output - hoàn thiện Shell integration
  - #6443: Drawer riêng cho delegated work - tách active tasks khỏi kết quả đã lưu
  - #6467: Di chuyển appearance help sang hints, smooth theme preview
  - #6469: Xóa subtask message status - focus vào task conversation
  - #6470: Fix permission hints không đè lên draft
  - #6472: Đơn giản hóa selected theme indicator
  - #6473: Slash command highlighting khớp với skills

- **Core fixes:**
  - #6464: Chấp nhận data URL với `BASE64`/`Base64` (case-insensitive theo RFC 2397)

**PR đang mở quan trọng (21 PRs):**

- **Tool & validation:** #6486 - Fix `$ref`/`anyOf`/`oneOf` validation cho MCP servers
- **Core:** #6468 - Drain parallel tools trước khi finalize cancelled runs
- **WebUI refactor:** #6412 - Unified code/diff highlighting, #6482 - Centralize outbound delivery
- **Features:** #6317 - Pagination cho `web_fetch`, #6315 - Pagination cho `list_sessions`
- **Bug fixes:** #6475 - Preserve newlines trong atomic writes (Windows), #6477 - Sanitize tool arguments trong history replay
- **Telegram:** #5902 - Auto-rename topic theo session title, #5803 - Small fixes (newlines, topic_id, typing status)
- **Provider:** #5666 - Thêm aimlapi.com provider (400k users)

**Xu hướng:** 
- Cải thiện WebUI liên tục (navigation, UX, performance)
- Tăng cường tool validation cho MCP
- Hỗ trợ pagination cho large datasets
- Ổn định Telegram channel

## 4. Điểm nổi bật cộng đồng

**#5924 (9 comments)** - Bug sudo loop: Agent bị stuck vì sudo chỉ tồn tại 1 turn. Khi reach max iterations, agent obsessed với command không thực hiện được. **Priority P1** - vấn đề blocking nghiêm trọng.

## 5. Ổn định & Bugs

**Issues mới (26/10):**
- #6485: Tool validation skip `$ref`/`anyOf`/`oneOf` schemas → crash với tuple items. **Fixed bởi #6486**.
- #6474: `atomic_write_text` double CR trên Windows (CRLF → CRCRLF). **Fixed bởi #6475**.

**Issues mở:**
- #5924 (P1): Sudo loop - chưa giải quyết sau 1 tháng, cần attention.

**Fixes đang review:**
- #6468: Race condition khi cancel parallel tools
- #6477: Surrogate sanitization cho tool arguments
- #6475: Newline preservation trên Windows

## 6. Yêu cầu tính năng

- #6315: Pagination cho `list_sessions` - bounded pages thay vì full list
- #6317: Continuation offsets cho `web_fetch` - đọc large documents theo chunks
- #5666: aimlapi.com provider - access 1000+ models qua 1 API

## 7. Phản hồi người dùng

**Positive:**
- WebUI improvements liên tục - navigation, theming, editing flow
- Shell integration hoàn thiện với bang commands

**Pain points:**
- #5924: Sudo loop là blocker nghiêm trọng (P1)
- Windows-specific issues (newline handling, atomic writes)
- Tool validation không xử lý được MCP server schemas

## 8. Backlog & Roadmap

**Near-term (PRs đang review):**
- Core stability: parallel tool cancellation, Windows file handling
- Tool system: full JSON Schema support cho MCP
- WebUI: unified highlighting, centralized delivery
- Pagination: sessions list, web content

**Medium-term:**
- Telegram enhancements: auto title, typing status
- New provider: aimlapi.com
- Performance: refactoring outbound delivery

**Priority:** Fix P1 sudo loop (#5924) - mở 1 tháng, 9 comments, blocking workflows.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw 2026-10-27

## 🔍 Tóm tắt hôm nay

Zeroclaw tập trung xử lý **nghiêm trọng loạt lỗ hổng bảo mật identity & access control** được phát hiện ngày 26/10. Thêm phản hồi độc lập từ Hlido (79/100 điểm) và feature requests cho XMPP, deferred bootstrap sections. PR lớn về append-only session history và context summarization tiến triển.

## 📦 Releases

Không có release trong 24h. v0.8.7 đang ở giai đoạn RC (#12019 pin translation catalogs).

## 🚀 Tiến độ dự án

**Bảo mật (priority cao):**
- **#12046-#12053**: 8 security issues mới từ @IftekharUddin (ngày 26/10):
  - #12051: SOP workshop cho scoped principal ghi shared procedures → chạy với quyền operator
  - #12050: OIDC callback thiếu browser binding → login CSRF
  - #12049: 4 địa chỉ remote fill 32 browser-login slots → DoS cả loopback
  - #12048: redirect_uri xây từ Host header thay vì validated origin
  - #12047: OIDC bearer verification không giới hạn attempt/outbound cap
  - #12046: Non-admin principals với wildcard tool selector giữ cron/schedule/peer-messaging
  - #12053: `/api/docs` load unpinned third-party script không integrity check
  - #12052: Gateway limiters key theo first X-Forwarded-For entry → client claim loopback exemption
- **PRs đi kèm**: #11326 (refuse log reads to scoped principals), #11230 (withhold session-data tools), #11234 (judge queued session by current authority), #11289 (stable denial reasons)

**Core runtime:**
- **#11921**: Append-only session event history (replace state-based history with replay-capable events) - PR lớn, 35 files changed
- **#12038**: Context summarization khi window đầy (thay trimming bằng summarize) - @BaptisteFaisy
- **#12044**: Deferred bootstrap sections (knowledge addressable thay vì resident mỗi turn) - @RO-mix
- **#12017**: Context window là model metadata, không phải config (fix 32k fallback gây vấn đề)

**Channels:**
- **#11847**: Native Rust XMPP với optional OMEMO - PR lớn, stacked trên nhiều thay đổi
- **#11986**: Scoped dashboard chat qua core (stacked trên #11965 OIDC sign-in)
- **#11965**: OIDC dashboard sign-in (thay pairing-only)
- **#11651**: Telegram 429 retry_after via shared flood gate
- **#11601**: Telegram transcription failure classification

**Tools & Features:**
- **#11680**: Firecrawl web search provider - @JuampiHernandez từ Firecrawl team
- **#12003**: Inbound-only email channels không cần SMTP - @nickludlam
- **#12022**: Memory recall external rerank stage (opt-in)
- **#11712**: Extract A2A protocol core → zeroclaw-a2a crate

## 🔥 Điểm nổi bật cộng đồng

- **#12042**: Review độc lập từ Hlido - 79/100 điểm, right of reply mở. Nhận diện security issues trước khi maintainers file.
- **#12021**: UI bug config save - banner Save All nhưng bottom button vẫn highlight (#12039 đã fix)
- **#10780**: Context compression mất (#10781 các config keys inert) - P1, status:in-progress, nhiều follow-up discussion

## 🐛 Ổn định & Bugs

**Critical/High:**
- 8 security issues mới (#12046-#12053) - chưa có fixes merge
- #11562: Plugin update pairing manifest với component khác generation - P2, risk:high
- #10673: ACP turns persistence failed trên daemon RPC path - P1, slice còn lại của #9333

**Medium:**
- #10921: Qdrant time-bounded recall bỏ sót eligible results
- #11825: codex_cli test xóa PATH → break parallel cargo test
- #12045: Response bodies từ user/LLM URLs buffer whole trước size cap

## 💡 Yêu cầu tính năng

- **#12054**: Honor runtime-profile thinking levels cho OpenAI (different reasoning efforts)
- **#12041**: Gitea/Forgejo parity với GitHub (events coverage)
- **#12022**: External rerank stage cho memory recall
- **#11847**: Native XMPP support
- **#12044**: Deferred bootstrap sections

## 👥 Phản hồi người dùng

- **Hlido review (#12042)**: 79/100 - nhận xét về security gaps trước khi official team file issues
- **Config UX (#10781)**: Users đặt `context_compression.*` expect giảm token usage nhưng keys inert
- **Telegram rate limiting (#11651)**: 429 retry_after không honor → flood API
- **Email inbound-only (#12003)**: Operators muốn IMAP access không cần SMTP

## 📋 Backlog & Roadmap

**v0.9.0 scope (theo PRs tagged):**
- OIDC dashboard sign-in (#11965)
- Scoped dashboard chat (#11986)
- Session-data tools access control (#11230, #11234)
- Plugin manifest-component binding fix (#11562)

**v0.8.7 (RC):**
- Translation catalogs pin (#12019)
- Zerocode launch directory fix (#11219 merged)

**Architecture shifts:**
- Append-only session events (#11921) - fundamental change
- Context summarization thay trimming (#12038)
- A2A protocol extraction (#11712)

**Security backlog:**
- 8 new issues chưa assign (26/10)
- Identity & access PRs chờ review (#11326, #11230, #11234, #11289)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo hoạt động PicoClaw ngày 2026-10-27

## 1. 📊 Tóm tắt hôm nay

Ngày yên ắng. Không có release mới. Một issue feature mới (#3450) về chat folders. Bot stale đánh dấu 3 issue/PR cũ. Dọn dẹp backlog.

## 2. 🚀 Releases

Không có.

## 3. 📈 Tiến độ dự án

**Pull Requests đóng (5 PR):**
- #898, #1550, #2363, #976: PR cũ từ tháng 2-3, giờ mới đóng. Bot dọn dẹp backlog.
- Nội dung: fix Anthropic provider, merge nhiều fix nhỏ, fix WebSocket auth, thêm agent team.

**Xu hướng:** Không có PR mới merge. Đang dọn nợ kỹ thuật cũ.

**PR mở:**
- #3416 (stale): Thêm Sendblue iMessage/SMS transport. Không có hoạt động mới.

## 4. 🌟 Điểm nổi bật cộng đồng

**Issue #3450** (mới hôm nay):
- Feature request: Chat folders cho Web UI
- Vấn đề: Session history hiện là danh sách phẳng, khó quản lý khi nhiều
- Đề xuất: Thêm folder/tag organization như ChatGPT
- Bao gồm spec chi tiết: API changes, storage, UI wireframe
- **Chưa có phản hồi** từ maintainer

Không có issue/PR nào viral (0 reactions tất cả).

## 5. 🐛 Ổn định & Bugs

**Issue #3426** (đóng hôm qua):
- Bug: Telegram MarkdownV2 không escape đúng link labels và blockquote
- Hậu quả: Telegram reject message → fallback plain text, mất format
- Status: Đóng bởi bot stale (3 bình luận, không có fix)

**Issue #3445** (stale):
- Bug nghiêm trọng: Smart routing gây vòng lặp vô hạn
- Hậu quả: Lightweight model làm 222 LLM calls trong 9 phút, burn 13M tokens
- Nguyên nhân: Không có circuit breaker trong turn, không kiểm tra lặp
- Status: Stale, chưa fix

**Issue #3449**:
- Bug report trống, không có thông tin
- Template chưa điền

## 6. 💡 Yêu cầu tính năng

**#3450 - Chat Folders:**
- Use case: Organize launcher session history theo project/topic
- Tech spec chi tiết:
  - Backend: Thêm `folder` field vào session storage
  - API: CRUD endpoints cho folders
  - UI: Dropdown với folder tree, drag-drop
- Tương tự ChatGPT workspace organization
- Đánh giá: Well-written spec, có wireframe, ready to implement

## 7. 💬 Phản hồi người dùng

Thấp. Chỉ 2 issue người dùng thật:
- @cnbillsomeday: Gặp production incident với routing loop (#3445) - vấn đề lớn chưa được quan tâm
- @Yevheni55: Đề xuất UX improvement (#3450) - constructive feedback

Issue #3449 không có nội dung.

Không có thảo luận trong PRs.

## 8. 🗓️ Backlog & Roadmap

**Backlog đang dọn:**
- 3 items đánh dấu stale hôm nay
- Bot đang close PR/issue cũ không hoạt động

**Vấn đề cần ưu tiên:**
1. **Critical:** Fix routing loop bug (#3445) - có thể burn cost
2. **High:** Telegram markdown escaping (#3426) - ảnh hưởng UX
3. **Medium:** Chat folders (#3450) - quality of life

**Roadmap:** Không có thông tin công khai về kế hoạch phát triển.

---

**Nhận xét tổng quan:** Dự án trong giai đoạn maintain/cleanup. Có bug nghiêm trọng (#3445) chưa được xử lý. Community engagement thấp. Cần tăng tốc độ phản hồi issue.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-27

## 1. Tóm tắt hôm nay

Không có release. Tập trung security hardening với 4 issue mới về lockdown network, read-only paths, script validation và approval flow. PR #4227 fix backoff logic cho rate-limited sends đang review. Bot refresh agent image 2 lần.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Đóng:**
- PR #4098: docs scheduled tasks note shebang ignored
- PR #4226: agent image refresh từ bot

**Đang xử lý:**

Security hardening (4 issues mới từ @just-jeb):
- #4231: lockdown network chỉ grow, không cleanup. Default name shared across installs → collision risk
- #4230: group folder mount rw, agent có thể rewrite host files. Cần read-only option
- #4229: `ncl tasks` accepts invalid bash script, không validate trước khi pass qua
- #4228: refusal không có reason, agent nhận deny không context

PR core:
- #4227 (gabi-simons): fix delivery backoff cho rate-limited/transient sends. Hiện tại retry 3 lần rồi drop → mất message. Sửa thành exponential backoff
- #4232 (lcavalie): fix macOS statusbar target đúng slug-scoped launchd label

PR feature:
- #4210 (ericcurtin): add llmman local-model support (provider + tool)
- #4218 (drsmk238): Proton Mail adapter qua Bridge, split từ #3726 theo review request
- #3726 (drsmk238): skill `/add-proton-mail` + Bridge container

Bot:
- #4233: refresh agent image lần 2 trong ngày

**Xu hướng:** Tăng focus security hardening. Core delivery logic đang fix. Feature work tiếp tục (local models, email channels).

## 4. Điểm nổi bật cộng đồng

Không có issue/PR nào có engagement cao (0 comments, 0 reactions trên tất cả). Cộng đồng ít active hoặc dữ liệu chưa sync đầy đủ.

## 5. Ổn định & Bugs

**Critical bugs:**
- #4228: refusal flow broken, agent nhận deny không lý do
- #4227: delivery drop messages khi rate-limited → mất data
- #4229: script validation thiếu, bash parse fail ở runtime

**Security issues:**
- #4231: lockdown network leak
- #4230: agent có thể overwrite host files

Cả 5 issues/PR đều mới (2026-10-26), chưa có resolution.

## 6. Yêu cầu tính năng

**Đang review:**
- llmman local-model support (#4210)
- Proton Mail native adapter (#4218, #3726)

Không có feature request mới trong 24h.

## 7. Phản hồi người dùng

Không có comment/reaction nào. Data không thể hiện user feedback.

## 8. Backlog & Roadmap

Không có thông tin roadmap trong data. Backlog suy ra từ open PRs:

**Next up:**
- Merge #4227 (delivery fix) - high priority, mất data
- Resolve 4 security issues - hardening đợt này
- Land llmman support (#4210)
- Finalize Proton Mail (#4218 + #3726)

**Pattern:** Core stability → security → feature expansion (local models, channels).

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo hoạt động NullClaw - 2026-10-27

## 1. Tóm tắt hôm nay

Ngày bảo trì kỹ thuật với 4 PR tập trung vào tích hợp chat platform LINE và sửa provider configs. Không có release hay issue mới. Hoạt động chủ yếu từ 2 contributors chính: @supersonictw (3 PR) và @torrresagus (1 PR).

## 2. Releases

Không có releases.

## 3. Tiến độ dự án

**Provider fixes (2 PR):**
- #1082: Groq API retired models → cập nhật onboarding flow
- #1080: xAI/Grok base URL thiếu `/v1` → sửa thành `https://api.x.ai/v1`

**LINE channel improvements (2 PR):**
- #1081: thêm `startTyping()` → hiển thị loading indicator khi bot xử lý
- #1079: thêm config `require_mention` → bot chỉ phản hồi khi được @ trong group chat

**Xu hướng:** Tăng cường tích hợp LINE Messaging API, sửa provider compatibility issues.

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào nhận reactions hay comments. Hoạt động im lặng, tập trung vào dev work.

## 5. Ổn định & Bugs

**Đã fix:**
- Groq models deprecated → update onboarding
- xAI provider URL sai format → thêm `/v1` endpoint

**Chất lượng:** PRs có changes nhỏ, targeted, dễ review.

## 6. Yêu cầu tính năng

**LINE channel:**
- Loading indicators (typing status)
- Mention-based triggering trong group chats

**Backward compatibility:** `require_mention` default `false` → không break existing configs.

## 7. Phản hồi người dùng

Không có feedback trực tiếp trong dataset. Contributors tự đề xuất improvements.

## 8. Backlog & Roadmap

Không có thông tin roadmap trong dữ liệu. Based on PRs:
- Tiếp tục mở rộng LINE platform features
- Duy trì compatibility với provider API changes
- Tập trung vào chat platform integrations

**Next likely:** Review và merge 4 open PRs, monitor provider API deprecations.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw ngày 2026-10-27

## 🔍 Tóm tắt hôm nay

Ngày chủ yếu merge và đóng issue. 6 PR merged (test coverage +4.97pp, memory upgrade ReMe 0.4.2.0, runtime memory fix, bug fixes context/mail/startup). 4 PR mới (Linux desktop packaging, temp file basename cap, MCP fallback, task cancellation fix). 2 issue mới về cancel leak và thinking_level config.

---

## 🚀 Releases

Không có.

---

## 📊 Tiến độ dự án

### PRs merged hôm nay

**#8380** - Frontend unit tests (+106 files, +1,811 statements, coverage 40.34% → 45.31%)  
Console web coverage tăng 5pp. Test-only PR, không đụng product code.

**#8347** - ReMe 0.4.2.0 integration  
Nâng cấp memory backend. Thêm opt-in decision compaction, image memory, entity tags. Auto-Dream dùng background index. Active interaction giữ nguyên `/proactive`.

**#8348** - Replay buffer memory optimization  
Tool-result delta gửi full snapshot mỗi event → SSE buffer phình lên. Giờ chỉ gửi delta, superseded snapshots drop.

**#8165** - Responses API stream fix  
Provider không emit `delta`, chỉ gửi full `output` ở `response.completed` → parser trả về empty. Giờ fallback đọc terminal event. (fix #8162)

**#8072** - E2E isolation  
Tests trước kia skip khi thiếu data, hoặc selector cũ. Giờ seed fixture, assert current UI contract.

**#8430** - Desktop backend version reconciliation  
Manual update DMG có thể reconnect backend cũ. Giờ check version, terminate mismatched backend.

### PRs mới hôm nay

**#8446** - Atomic temp file basename cap (fix #8306)  
`_open_atomic_temp` dùng full basename → `OSError: File name too long` khi destination >255 char. Giờ hash suffix nếu vượt 200.

**#8445** - MCP legacy fallback (fix #8424)  
`server/discover` trả HTTP 404 + JSON-RPC -32601 → client fail hard, không fallback legacy `initialize`. Giờ treat -32601 như unknown method, thử streamable-HTTP.

**#8444** - Linux desktop packaging  
Thêm `deb` + `AppImage` vào Tauri build. Desktop trước chỉ Windows/macOS. Bao gồm PyInstaller + bundled Python runtime (không dùng Docker).

**#8441** - Cancel owned task on outer cancellation (fix #8440)  
`cancellable_wait` tạo internal task nhưng không cancel khi outer cancelled → task rò rỉ. Giờ `task.cancel()` + `await task` khi `CancelledError`.

### PRs còn open đáng chú ý

**#8034** - Bound inline media per request (under review, size/L)  
Per-file cap 2MB nhưng request body không bị bound. Nhiều ảnh in-spec → multi-MB body mỗi turn. Gateway có thể refuse. Đề xuất request-level cap.

**#8178** - Nested skill directories (under review, size/XL)  
Hiện skill phải flat `<root>/<skill>/SKILL.md`. PR cho phép `<root>/<category>/<skill>/SKILL.md`. Identity vẫn là leaf dir name.

**#7874** - PawApp SDK redesign (size/XXXL)  
Redesign control plane. Apps expose durable work qua shared Host contract. Host owns task identity, retries, permissions.

**#8443** - Age out tool_result blocks  
`blocks` JSON chiếm ~75% history.db. `history_retention_days` xóa cả row → mất searchable text. PR này chỉ xóa `blocks` sau `blocks_retention_days` (default 90), giữ text.

**#8376** - PowerContext v1.4.0 integration (size/XXXL)  
Update PowerContext backend. Expose prepared-context và Artifact APIs. QwenPaw reuse profiles, topic/atomic memories, experiences.

---

## 🔥 Điểm nổi bật cộng đồng

**#8442** - Linux desktop parity  
User yêu cầu Linux deb/AppImage, Computer Use (Wayland portal), Chrome Native Messaging. 1👍, discussion active.

**#8435** - LLM stream hang (watchdog không fire)  
Multi-turn conversation, LLM stream hang vô thời hạn, zero log. Rate-limiter semaphore không release. Watchdog không fire. User đề xuất force-release sau timeout.

**#8424** - MCP legacy server fail (3 comments)  
Legacy MCP server trả 404 + -32601 → client fail hard. Không fallback legacy handshake. PR #8445 fix.

**#8417** - Context compact fail 400 (2 comments)  
Volcano Engine AgentPlan `glm-5.3-flash` không support `thinking.type=disabled`. Compat layer gửi cả hai param → 400. `/compact` fail mỗi lần.

---

## 🐛 Ổn định & Bugs

### Fixed hôm nay

- **#8162** [CLOSED] - OpenAI Responses stream empty (fixed by #8165)
- **#7476** [CLOSED] - Cron misfire grace window trigger 2x
- **#4946** [CLOSED] - Plugin import failure block startup 6min

### Open issues

**#8040** - Embedding reindex incomplete (6 comments)  
1 CJK chunk over token limit → silent drop whole batch. Recurrence của #5950.

**#8312** - Context control fail, task interrupt (3 comments)  
`MODEL CONTEXT LENGTH EXCEEDED` 252565 > 251904 tokens. Compaction không fit. User phải reduce request.

**#8276** - ReMe reranker empty api_key  
Enablement accept empty `api_key`. Failure surface as "unexpected error". No validation.

**#8279** - ReMe watchers exhaust AnyIO thread limiter  
Long-lived watchers leak threads → stall sync HTTP endpoints.

**#8123** - Daily Paper truncated JSON fail  
Model output truncated → `ToolJSONDecodeError`. No per-paper retry, whole job marked error.

**#8415** - edit_file convert CRLF to LF  
`read_file_safe` decode `errors='ignore'` → ISO-8859-1 file lose é/ü. `edit_file` write lossy snapshot back as UTF-8.

---

## ✨ Yêu cầu tính năng

**#8439** - Support thinking_level in JobRuntimeSpec  
Cron task muốn control thinking level (`off`/`inherit`/`enabled`) mà không tạo agent mới. Tiết kiệm token.

**#8442** - Linux desktop parity  
Ship `deb` + `AppImage` từ Tauri chain. Computer Use (Wayland portal) + Chrome Native Messaging. PR #8444 implement packaging part.

**#8437** - Local ChatGPT subscription sign-in  
Thêm ChatGPT Subscription variant. User dùng account-discovered models không cần Platform API key. OAuth PKCE, encrypted persistence.

**#8224** [CLOSED] - Python Code Mode  
Experimental Code Mode. Model gọi `run_code`, script dùng `await tools.<name>(...)` trong CPython worker. Governance + audit + approval settings đầy đủ.

**#8431** - Local Whisper SDK plugin  
Convert local Whisper thành SDK plugin với framework-managed lifecycle.

**#8187** - Extract channels into plugins  
Move official channels (trừ Console) vào plugins, subprocess isolation. Reduce SDK imports, isolate failures.

**#7719** - Separate model for ReMeLight writing  
`ReMeLightMemoryManager` dùng agent main model cho memory writing → expensive. PR cho phép separate model.

---

## 💬 Phản hồi người dùng

**#8162** (@xiaohushi512)  
"Win10 desktop 2.2.2.b4 chạy tốt trước, giờ 1-3 step tự dừng không thông báo." → Fixed by #8165.

**#8040** (@ianfunghk)  
"Embedding reindex `20 chunks failed`, batch logs nói `126/126` success. 1 CJK chunk over limit → drop cả batch." → PR #8062 [closed] attempted fix, issue vẫn open.

**#7476** (@feng183043996)  
"Cron 06:30 chạy 2 lần, backup file duplicate, chênh 17-48s." → Closed hôm nay.

**#8312** (@MCQSJ)  
"Context length exceeded 252565 > 251904. Compaction không fit. Phải reduce request." → Issue open.

**#8424** (@ahxoeh)  
"Legacy MCP server 404 + -32601 → hard fail. Không fallback legacy handshake." → PR #8445 fix.

---

## 📋 Backlog & Roadmap

### In progress

- **Memory upgrades**: ReMe 0.4.2.0 merged. PowerContext v1.4.0 integration (#8376) under review.
- **Desktop Linux parity**: Packaging (#8444) submitted. Computer Use + Chrome Native Messaging chưa có PR.
- **PawApp SDK redesign** (#7874): Size XXXL, đang review.
- **Channel plugin extraction** (#8187): Size XXXL, đang review.
- **Nested skills** (#8178): Under review.

### Pending

- **Inline media request cap** (#8034): Under review.
- **Memory recall payload leak** (#7835): Under review, fix channel disclosure.
- **Skill pool install provenance** (#8231): Under review, fix "Update All" không cover third-party.
- **Separate model for memory writing** (#7719): Under review.
- **OpenViking memory plugin** (#7613): First-time contributor, under review.

### Closed today

- Test coverage boost
- ReMe upgrade
- Replay buffer optimization
- Stream parsing fix
- E2E isolation
- Desktop version reconciliation

Không có roadmap document public. Direction inferred từ PR activity: memory backend diversity, desktop platform parity, plugin isolation, test coverage.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*