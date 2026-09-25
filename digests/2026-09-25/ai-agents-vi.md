# Bản tin Hệ sinh thái Hermes Agent 2026-09-25

> Issues: 138 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-25 02:00 UTC

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

# Báo cáo Hermes Agent – 2026-09-25

## 📊 Tóm tắt hôm nay

Dự án tập trung sửa lỗi P3 qua 11 PR cluster từ fix sweep, chủ yếu desktop UI polish và lifecycle bugs. Release v0.21.5 ra ngày hôm qua đóng gói 460 PR từ v0.21.4. Không có tính năng mới lớn – maintenance window.

---

## 🚀 Releases

### v0.21.5 (2026-09-24)
- **Patch release**: gộp ~460 PR từ v0.21.4
- 1,610 commits, 4,828 files thay đổi (+164k lines)
- Không có breaking changes – ổn định downstream (Docker, Cloud)
- Curated notes hoãn đến v0.22.0

---

## 🔧 Tiến độ dự án

### PRs chính (11 PR cluster từ fix sweep):

**Desktop UI fixes** (#122004, #122000):
- Preview iframe color-scheme sync với app theme
- CJK math rendering (escape bare `$` in East Asian text)
- Search title, skill pill overflow, sidebar unarchive verb
- ARM64 gate, keybind crash guard

**Session lifecycle** (#122077, #122083, #122084):
- ACP sessions end on shutdown (was orphaned)
- Archive menu double-resume fix
- Tab title sync across ownership changes
- Exhausted session remember fix

**Gateway/auth** (#121478, #121603):
- Profile launch không còn own host gateway
- Update retry screen name live PID instead of re-lock

**Code execution** (#122110):
- Tear down duplicate remote kernel on race
- `_acquire_remote_kernel` lock properly

**Windows** (#122101, #121469):
- Release builds record exe version again
- Update ENOTEMPTY: clear `node_modules`, retry npm once

**Plugin/catalog** (#122103, #122081):
- Update disables plugins không fit instead of fail
- Catalog cache drops on update

### Trend:
- Polish phase: desktop renderer, session state, Windows edge cases
- Cluster fixes (11 PR same-day batch) = fix sweep backlog clearance
- No new features – stabilization

---

## 🔥 Điểm nổi bật cộng đồng

### Issues nhiều comments:

1. **#88584** (139 comments) – Nous integration blocked, cron conflicts
2. **#90477** (11 comments) – Desktop profile switch on SSH spawns wrong backend
3. **#18357** (9 comments) – Setup hijacks npm global to `~/.hermes/node`, breaks other software
4. **#121970** (9 comments) – Signal Note to Self treated as prompt when linked device
5. **#53617** (8 comments) – Desktop reasoning panel auto-collapses, người dùng muốn keep expanded

### Vấn đề người dùng quan tâm:
- **Desktop connection reliability**: SSH backend spawn, profile switch bugs (#90477, #89697, #103234)
- **Windows update failures**: npm ENOTEMPTY, exe version missing (#82383, #63577, #87875)
- **Signal adapter**: Note to Self noise (#121970)
- **npm global hijack**: `~/.hermes/node` phá software khác (#18357)

---

## 🐛 Ổn định & Bugs

### Critical fixes merged today:

**Desktop:**
- Preview zone read wrong tab (#121476)
- Reasoning spinner stuck after interrupt (#98146 → closed)
- Approval fails on multi-profile (#105469, #103755 → closed)
- Windows AppHangB1 after minimize-to-tray (#119252 → closed)

**Backend:**
- `/heartbeat`, `/loop` die after first tick (#103044 → closed)
- Update marker lock race (#121603)
- Remote kernel duplicate spawn (#122110)

**Gateway:**
- `/update` SIGKILL'd on systemd restart (#107427)
- Desktop file download 401 when `auth_required=true` (#89713 → closed)

### Open P0/P1:
- **#121840** (P0): Mid-session route commits null system prompt, rebuild from scratch next turn
- **#121524** (P1): `show_reasoning: false` still emits reasoning + tool chrome

### Platform-specific:
- **Windows**: update loops, GBK auth.json parse (#99003), Defender slow powershell spawn (#87828)
- **macOS**: Desktop boot loop on `hermes serve` (#85029, #85605 → closed)

---

## 💡 Yêu cầu tính năng

1. **#53617** – Keep reasoning panel expanded (DeepSeek thinking UX)
2. **#121970** – Signal: disable Note to Self handling for linked devices
3. **#121035** – Native TUI mode (terminal-owned scrollback, no mouse tracking)
4. **#115104** – Memory provider redact secrets before sync

**Pattern**: UX polish (không collapse, native scrolling) + privacy (redaction, Note to Self)

---

## 👥 Phản hồi người dùng

### Negative:
- **Setup sabotages computer** (#18357): npm hijack phá tools khác, "borders criminal behavior"
- **Windows updates destructive** (#63577): tree-kills active chat, refuses run when desktop open
- **Desktop unresponsive** (#119252): minimize-to-tray freeze, no logs

### Positive implied:
- Fast response to fix sweep (11 PR same day)
- v0.21.5 stable tag for downstream

### Pain points:
- Multi-profile SSH setup fragile (#90477, #89697)
- Windows update experience poor (#87875, #82383, #63577)
- Plugin compatibility breaks on update (#122103)

---

## 📋 Backlog & Roadmap

### Immediate (ongoing):
- P3 fix sweep completion (11 PR wave-7/8 today, more expected)
- Desktop UI polish (CJK, preview, sidebar)
- Windows reliability (update retry, path handling)

### Next milestone hints:
- v0.22.0 curated notes (v0.21.5 deferred notes)
- Native TUI mode (#121035)
- Plugin compatibility matrix (#122103 base)

### Deferred/blocked:
- #88584 Nous integration (cron conflicts)
- Full WCAG validation (manual testing required)

---

## 🎯 Nhận định tổng thể

**Maintenance phase**: polish, edge cases, platform parity. Không có tính năng mới lớn từ v0.21.4 → v0.21.5. Community quan tâm desktop stability (SSH, Windows) + privacy (Signal Note to Self, secret redaction). Fix sweep productive (11 PR/day cluster). Windows update experience vẫn pain point. SSH multi-profile topology fragile. Next wave likely v0.22.0 feature work after stabilization done.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ Sinh thái AI Agent – 2026-09-25

## 1. Tổng quan hệ sinh thái

**Hiện trạng thị trường:**
- 9 dự án tracked, 0 release trong ngày (chỉ IronClaw v1.4.1-rc.2 ngày hôm trước)
- 1,403 PRs tổng, 361 issues – maintenance mode thống trị
- Hermes Agent v0.21.5 lớn nhất (460 PR gộp), phần còn lại patch/polish
- Beta testing wave: QwenPaw 2.2.x và NanoBot 0.3.5 đang thu thập feedback regression

**Phân khúc market:**
- **Enterprise**: Hermes Agent (desktop focus), Zeroclaw (security-first), QwenPaw (multi-tenant Hub)
- **Developer tools**: OpenClaw (infrastructure primitives), NanoBot (web-first UX)
- **Niche/embedded**: PicoClaw (mobile TUI), NanoClaw (ARM64/edge), IronClaw (benchmark automation)
- **Experimental**: NullClaw (memory research)

**Baseline activity:**
- Median PR throughput: 13–23 PRs/project (stable)
- Median issues: 2–24 (OpenClaw 156 outlier)
- Community engagement thấp: 0–17 comments/top issue

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Top Issue Comments | PR Velocity | Focus chính |
|-------|--------|-----|----------|-------------------|-------------|-------------|
| **Hermes Agent** | 138 | 500 | 1 (v0.21.5) | 139 (#88584) | 11 cluster same-day | Desktop polish, Windows fix |
| **OpenClaw** | 156 | 500 | 0 | 17 (#97616, #142585) | 30 mở (XL infra PRs) | Worker isolation, update stability |
| **NanoBot** | 14 | 39 | 0 | 0 | 19 merged/24h | WebUI UX, localization |
| **Zeroclaw** | 2 | 50 | 0 | 5 (#8559) | Lớn, chờ review lâu | Security, SOP expansion |
| **PicoClaw** | 2 | 8 | 0 | 0 (duplicate #3391) | 5 dependency bumps | Maintenance |
| **NanoClaw** | 2 | 13 | 0 | 0 | 3 merged, 10 mở | ARM64, test stability |
| **NullClaw** | 12 | 25 | 0 | 3 (#1000, #867) | 13 merged/24h | Crash fixes, docs |
| **IronClaw** | 1 | 1 | 1 (rc.2) | 0 | 1 bot PR | Model quality tracking |
| **QwenPaw** | 24 | 23 | 0 | 32 (#7318) | 23 mở (stabilization) | Beta bug fixes, context |

**Insights từ bảng:**
- Hermes/OpenClaw scale lớn (500 PR) nhưng velocity khác: Hermes batch-merge, OpenClaw bottleneck review
- NanoBot/NullClaw velocity cao (0.8 PR/h, 13 PR/day) – small team, tight loop
- Zeroclaw/QwenPaw backlog lớn – security/stabilization cần deep review
- IronClaw/PicoClaw minimal activity – mature hoặc niche

## 3. Vị thế Hermes Agent

**Strengths:**
- **Scale leadership**: 500 PR, 138 issues – largest tracked ecosystem
- **Release cadence**: v0.21.5 đóng gói 460 PR (curated notes defer → v0.22.0 signal planning)
- **Desktop dominance**: CJK rendering, preview zone sync, SSH multi-profile – no competitor match breadth
- **Fix sweep efficiency**: 11 PR same-day cluster clear P3 backlog fast

**Weaknesses:**
- **Windows reliability**: #63577, #82383, #87875 complaints về destructive updates persist
- **Multi-profile SSH fragile**: #90477, #89697 topology bugs scare enterprise users
- **npm hijack PR disaster**: #18357 "borders criminal behavior" – severe trust damage
- **Community pain visible**: #88584 (139 comments) Nous integration blocked, #121970 Signal Note to Self noise unresolved

**Vị trí trong hệ sinh thái:**
- **Market leader cho desktop deployments** – polish + features vượt xa
- **Enterprise adoption risk**: Windows/SSH bugs và npm global hijack controversy chặn growth
- **Maintenance phase hiện tại**: không có feature mới v0.21.4→v0.21.5 – stabilization before v0.22.0 push

**So với competitors:**
- vs OpenClaw: Hermes polish hơn, OpenClaw infra primitives mạnh hơn
- vs QwenPaw: Hermes mature release, QwenPaw beta cycle aggressive
- vs NanoBot: Hermes desktop-first, NanoBot web-first (19 PR WebUI)

## 4. Hướng kỹ thuật chung

**Shared technical themes:**

### 4.1 Context management crisis
- **Universal pain point**: 7/9 projects có context bugs
  - Hermes: #121840 null system prompt mid-session
  - OpenClaw: #148963 scan archived metadata outside page, #112349 dreaming ignores minRecallCount
  - QwenPaw: #7628 compaction exceed budget, #7836 eviction drop user turns, #7733 no agent control
  - NanoBot: #5849 auto-compaction deadlock (no token guard)
  - NullClaw: #1005 archived shards occupy live session slots
- **Root cause**: context windows grow, eviction logic lag behind multi-turn/multi-modal complexity
- **Solutions emerging**:
  - Worker isolation (OpenClaw #157422 move persistence off event loop)
  - Token budget guards (NanoBot #5849 fix, QwenPaw PRs)
  - Agent-autonomous lifecycle (QwenPaw #7733 proposal)

### 4.2 Update system reliability
- **Cluster failures**:
  - OpenClaw: #142580, #157605, #151050 – 2026.9.x upgrade green but continuity lost
  - Hermes: #63577, #87875 Windows update tree-kills active chat
  - NanoBot: #5881 v0.3.5 `_nanobot` placement confusion
- **Shared anti-patterns**: database validation race, marker lock conflicts, session state reload timing
- **Fixes converging**: retention on OverlayFS (OpenClaw #157770), retry with clear (Hermes #122101), lock compaction writes (NanoBot #5884)

### 4.3 Worker/async isolation
- **Projects adopting**:
  - OpenClaw: #157422 (inference persistence), #154069 (transcript projection)
  - NanoBot: background task exception logging (#5724)
  - Zeroclaw: SOP run logs (#10155)
- **Motivation**: blocking operations (DB writes, tool execution, webhook calls) starve event loop → CPU spikes, UI freeze
- **Pattern**: move to dedicated threads/processes, communicate via channels

### 4.4 Multi-modal handling
- **Provider fragmentation**: Hermes ARM64 gate, QwenPaw file:// URL reject (#7966), NanoBot image previews (#5848)
- **Common bugs**: base64 encoding race, media token counting wrong, screenshot tool coordination
- **Standardization attempts**: QwenPaw #7973 recover từ rejected URLs, NanoBot unified preview pane (#5847)

### 4.5 Security hardening waves
- **Active work**:
  - Zeroclaw: #10259 RPC auth stage 3, #11029 git command injection
  - NullClaw: #1003 symlink skill validation (archive install still reject)
  - QwenPaw: #2978, #4361 file guard bypass via shell
- **Trend**: shift từ "feature-first" sang "secure by default" – production deployments force rigor

### 4.6 Provider compatibility matrix
- **Expansion tracked**:
  - NanoBot: #5894 deepseek-flash reasoning_content backfill, #5834 xAI Grok SSE
  - QwenPaw: #7576 CONTEXT_UNFIT hardcoded 32768 fix
  - Zeroclaw: #11104 Cheaper Inference provider
  - NullClaw: #1000 ollama tool support error
- **Challenge**: providers không standardize tool schema, reasoning format, media URLs
- **Solution attempts**: adapter layers log error body (#1004), fallback chain (#148789)

## 5. Điểm khác biệt

### 5.1 Chiến lược release

| Dự án | Cadence | Style | Community impact |
|-------|---------|-------|------------------|
| **Hermes** | Patch mỗi 2–3 tuần | Batch 460 PR → v0.21.5 | Curated notes defer → frustration |
| **OpenClaw** | Không có (stuck) | Infra refactor chặn release | Update failures pile up |
| **NanoBot** | Rolling (no tags) | 19 PR/day merge → production | Fast fix, no changelog |
| **Zeroclaw** | Milestone 0.9.0 (ZeroRelay blocked) | Feature-gated | Transparent tracker #8358 |
| **QwenPaw** | Beta cycle (2.2.x) | Aggressive testing → stabilize | Regression reports welcomed |
| **NullClaw** | Ad-hoc | Fix → merge → deploy | Docs update same-day |

**Insight**: Hermes batch model tạo polish nhưng feedback loop chậm. NanoBot/NullClaw continuous merge nhanh nhưng thiếu regression testing formal. QwenPaw beta cycle balance tốt – community test, team fix, promote stable.

### 5.2 Tính năng độc quyền

**Hermes Agent:**
- Desktop preview iframe color-scheme sync (#122004)
- ARM64 gate, keybind crash guard
- CJK math rendering (escape `$` in East Asian text)
- → **Desktop-native polish** không competitor nào match

**OpenClaw:**
- Transcript projection workers (#154069) – scale long sessions
- Session listings bounded scan (#148963) – perf under load
- → **Infrastructure primitives** cho high-throughput

**NanoBot:**
- 10-language activity localization (#5367), real-time switch
- Completion chime (#5602), custom context window input (#5901)
- GitHub Star invitation sau 10 replies × 3 ngày (#5895)
- → **User engagement hooks** và growth hacking

**Zeroclaw:**
- SOP decision models (#11085) – operator select model per trigger
- Agent-facing config authoring (#10551) – agent draft, human approve
- → **Policy-driven automation** cho regulated environments

**QwenPaw:**
- Multi-tenant Hub (v2.2.0) – isolated deployments
- Realtime voice chat (#7785) – provider-configurable speech I/O
- Agent-autonomous context lifecycle proposal (#7733)
- → **Multi-modal + multi-tenant** combo

**NullClaw:**
- Symlink skills support (#1003) – reduce duplicates
- Memory auto-recall configurable (#1001) – turn off FTS5 query
- → **Memory system research** platform

### 5.3 Cộng đồng & governance

**Hermes**: Reactive – 139 comments #88584 Nous integration blocked, maintainer không rõ timeline. npm hijack controversy (#18357) trust damage. Community frustrated nhưng vẫn dùng vì desktop features.

**OpenClaw**: Transparent triage – clawsweeper labels well-adopted. Nhưng update failures (#142580, #157605) chồng chất, bottleneck review (30 PR mở). Community patient, file detailed repros.

**NanoBot**: Aggressive merge – 19 PR/24h, localization/UX investment cao. Nhưng #5881 v0.3.5 placement rule backlash show communication gap. Velocity > stability risk.

**Zeroclaw**: Experienced contributors (JordanTheJet, vrurg) drive nhiều PR lớn nhưng chờ review lâu. Tracker #8358 transparent milestone progress. Low community noise – niche/enterprise user base.

**QwenPaw**: Active roadmap discussion (#7318, 32 comments). Beta testing feedback loop healthy. First-time contributors tăng (7 trong data). Context bugs (#7628, #7733, #7836) public, team responsive.

**NullClaw**: Docs investment spike (8 PRs hôm nay). Config.json example request (#867) show onboarding pain. Fast crash fixes (3 critical bugs 1–2 tháng). Feature requests đóng không giải thích (#411, #624) – opaque prioritization.

## 6. Mức độ trưởng thành cộng đồng

### Tier 1: Mature (Hermes, OpenClaw, QwenPaw)
- **Characteristics**: detailed bug reports, triage labels, roadmap discussions, first-time-contributor pipelines
- **Evidence**:
  - Hermes: 139-comment thread #88584, P0/P1 labels clear
  - OpenClaw: clawsweeper automation, 17-comment issues (#97616, #142585)
  - QwenPaw: #7318 roadmap (32 comments), 7 first-time PRs, beta testing formal
- **Gaps**: Hermes npm hijack trust damage, OpenClaw update failures pile, QwenPaw context bugs cluster

### Tier 2: Growing (NanoBot, NullClaw)
- **Characteristics**: fast merge velocity, docs investment, responsive fixes
- **Evidence**:
  - NanoBot: 19 PR/24h, 10-language localization, GitHub Star prompt
  - NullClaw: 8 docs PRs hôm nay, 3 critical bugs fixed <2 tháng
- **Gaps**: NanoBot communication missteps (#5881), NullClaw feature closure opacity (#411, #624)

### Tier 3: Niche (Zeroclaw, NanoClaw, IronClaw)
- **Characteristics**: low noise, experienced contributors, specialized use cases
- **Evidence**:
  - Zeroclaw: 0 public comments, #8358 tracker transparent
  - NanoClaw: ARM64 focus, 0 community interaction
  - IronClaw: daily benchmark automation, 0 engagement
- **Assessment**: mature teams, small user bases, không scale cộng đồng vì không cần

### Tier 4: Stalled (PicoClaw)
- **Evidence**: 5 dependency bumps, 2 stale feature PRs (#3381, #3376), duplicate bug #3391 no response
- **Diagnosis**: maintainer bandwidth thấp, community contributions không được review

## 7. Tín hiệu xu hướng

### Xu hướng hiện tại (Q4 2026)

**1. Context management rearchitecture wave**
- 7/9 projects có active work
- Solutions: worker isolation, token guards, agent lifecycle hooks
- Timeline: QwenPaw #7733 proposal ambitious, OpenClaw #157422 pragmatic
- **Prediction**: standard pattern emerge Q1 2027 – context as first-class managed resource

**2. Security hardening mandatory**
- Zeroclaw RPC auth stage 3, git injection fix
- QwenPaw file guard bypass 2-year-old finally addressed
- NullClaw symlink validation
- **Drivers**: production deployments, compliance requirements
- **Prediction**: "secure by default" frameworks emerge, insecure patterns deprecated

**3. Multi-modal coordination maturity**
- Hermes CJK rendering, QwenPaw voice chat, NanoBot image previews
- Provider fragmentation still pain (file:// URLs, base64 races)
- **Prediction**: standardization push Q1 2027 – industry consortium or de-facto leader emerge

**4. Update system reliability crisis**
- OpenClaw 2026.9.x disasters, Hermes Windows complaints, NanoBot placement confusion
- No project solved elegantly yet
- **Prediction**: blue-green deployments, canary releases, rollback automation become table stakes

**5. Desktop vs Web battleground**
- Hermes desktop polish vs NanoBot web UX investment
- QwenPaw multi-tenant Hub bridge both
- **Trend**: desktop for power users, web for onboarding, mobile for accessibility
- **Prediction**: convergence via Electron-style wrappers hoặc PWA maturity

### Weak signals (2027+)

**Agent-to-agent coordination**:
- Zeroclaw SOP decision models (#11085), NullClaw subagent spawning closed (#190)
- Current: single-agent systems với external tools
- Future: multi-agent swarms, hierarchical delegation, consensus protocols

**Memory systems divergence**:
- NullClaw recall tunables (#1001), OpenClaw dreaming bugs (#112349), QwenPaw agent-controlled eviction (#7733)
- Current: reactive context management
- Future: proactive memory curation, semantic compression, long-term knowledge graphs

**Voice-first interfaces**:
- QwenPaw realtime voice (#7785), NanoClaw speech-to-speech broker (#10430)
- Current: text primary, voice addon
- Future: voice-native workflows, ambient computing integration

**Edge deployment push**:
- NanoClaw ARM64 focus, PicoClaw mobile TUI
- Current: cloud-first, edge experimental
- Future: on-device inference, privacy-preserving local-first architectures

### Market consolidation risks

**Acquisition targets**:
- NanoBot (fast velocity, web UX) attractive cho incumbents
- IronClaw (benchmark automation) niche play hoặc acqui-hire
- PicoClaw (stalled) shutdown hoặc fork

**Hermes dominance scenarios**:
- **Bull case**: fix Windows/SSH bugs → enterprise adoption surge → ecosystem lock-in
- **Bear case**: npm hijack trust damage lingers → users migrate to QwenPaw multi-tenant Hub

**OpenClaw infrastructure bet**:
- Worker isolation primitives valuable nếu industry standardizes
- Risk: homegrown solutions fragment, OpenClaw becomes abandoned framework

---

**Kết luận chiến lược:**

Hệ sinh thái đang chuyển từ **feature velocity** sang **production reliability**. Context management và update systems là bottlenecks lớn nhất. Security hardening không optional nữa. Desktop vs web battleground chưa resolved – Hermes lead desktop, NanoBot/QwenPaw push web.

Hermes Agent maintain market leadership nhờ desktop polish nhưng Windows reliability và npm hijack controversy là existential threats. OpenClaw infrastructure primitives valuable nhưng review bottleneck chặn momentum. QwenPaw beta cycle aggressive, context bugs serious nhưng community healthy. NanoBot velocity impressive, communication gaps fixable.

2027 forecast: consolidation wave, agent-to-agent coordination prototypes, voice-first interfaces mature, edge deployments viable. Projects không solve context + update reliability sẽ bị displace.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-09-25

## 1. Tóm tắt hôm nay

Project tập trung fix critical bugs infrastructure + memory. 30 PR mở, nhiều về perf optimization (transcript workers, CI parallelization). Không có release mới. Community report nhiều regression 2026.9.x + update failures.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Critical infrastructure PRs:**
- #157422: Move inference persistence off event loop → worker threads (P1, platinum)
- #154069: Transcript projection rebuild moved to workers (XL, gold)
- #156541: Refactor sessions/state, reduce duplication (XL, gold)

**Update system fixes:**
- #157770: Fix update retention on OverlayFS + already-current edge case
- #151608: Accurate Windows service inspection (Task Scheduler)
- #157719: Retain Task Scheduler failure details

**Channel/integration:**
- #157555: Consolidate webhook ingress to single Gateway port (XL, gold)
- #154208: AgentsAPI tool support (XL, gold)

**Perf improvements:**
- #156129: CI critical path optimization (avoid hosted runner queues)
- #156061: Reduce compact Node test times (563-642s → under 600s target)

Pattern: team pushing infrastructure stability before feature work. Heavy refactor + worker isolation theme.

## 4. Điểm nổi bật cộng đồng

**Top issues by comments:**

1. **#97616** (17 comments, P1): Zombie process leak from hook/tool execution. Long-term degradation bug affecting production users.

2. **#142585** (17 comments, P0): Doctor refuses valid legacy workspace migration in 2026.9.3. Upgrade blocker with session-state impact.

3. **#137332** (16 comments, P1): Requester-settle batches retry forever after ownership check. Message loss + crash loop risk.

4. **#148963** (13 comments): Session listings scan archived metadata outside requested page. Bounded but persistent perf issue.

5. **#153067** (10 comments, P2, CLOSED): Gateway re-copies entire 170MB state DB every ~5s (5.9TB/day writes). Fixed.

Community frustrated with 2026.9.x upgrade stability: multiple P0 update-failure reports (#151050, #151307, #148744, #145138).

## 5. Ổn định & Bugs

**Critical (P0/P1) open:**
- #142580: 2026.9.3 upgrade green but main agent loses continuity
- #157605: High CPU (240-276%) after 2026.9.6 upgrade, stuck sessions.list
- #157067: Windows isolated cron passes uncloneable Proxy to worker → crash
- #148789: Model fallback exhausts all candidates on session failure, blames last model

**Regression patterns:**
- Update system: multiple platforms hit database/validation/readyz failures
- Memory system: #112349 dreaming ignores minRecallCount, promotes unused snippets
- Context handling: #129314 internal runtime context dispatched as user message

**Infrastructure debt:**
- #97616: Hook/tool child process leaks (zombies accumulate)
- #150138 + #153067: State DB repeated snapshot spawns (startup + steady-state)
- #143640: Memory index publish exhausts 5s busy timeout

## 6. Yêu cầu tính năng

**User-facing:**
- #9637 (6 comments): TUI accessibility – disable emojis/unicode for screenreaders
- #81232 (5 comments): Discord fetch single message by ID/URL
- #144881: Configurable 256KB workspace preview cap (or raise default)
- #151914: Memory extraPaths opt-out of mtime decay for stable references

**Developer experience:**
- #9409 (4 comments, 3👍): Better context overflow errors (show actual vs limit tokens)
- #107334 (3 comments, 1👍): Simplify multi-provider LLM config in dashboard
- #9797: queue_status tool for intelligent agent task dispatch

Pattern: accessibility + debuggability improvements requested. Memory system getting feature refinement requests.

## 7. Phản hồi người dùng

**Pain points:**
- Update reliability: "green migration but lost continuity" (#142580), multiple validation/schema failures
- Memory behavior: "snippets with 0 recalls promoted" (#112349)
- UI quirks: phone composer narrows to 5-6 chars/line (#139909), reasoning visibility toggle doesn't persist (#151953)
- Performance: CPU spike after upgrade (#157605), startup spawning overhead (#150138)

**Positive signals:**
- Community filing detailed repros with logs (e.g. #157389 feishu multi-lane analysis)
- Users engaging with maintainer labels/triage (clawsweeper tags well-adopted)

## 8. Backlog & Roadmap

No explicit roadmap in data. Infer from PR priorities:

**Near-term (P1/P0 work in flight):**
- Stabilize 2026.9.x update path (multiple active PRs)
- Worker isolation for blocking operations (transcript, inference persistence)
- Memory system correctness (dreaming params, search degradation)

**Medium-term (P2 gold/diamond PRs):**
- CI/release automation reliability
- Channel webhook consolidation
- Provider/model fallback logic improvements

**Technical debt:**
- Filesystem code consolidation (#157524 reusing fs-safe)
- Session/state API cleanup (#156541 refactor)
- Duplicate SQL worker patterns

Project stage: post-9.x regression firefighting. Infrastructure refactor underway but still reactive to user-reported upgrade failures.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-25

## 1. Tóm tắt hôm nay

Ngày làm việc cực kỳ bận rộn: **19 PR merged** trong 24h, tập trung vào UX, ổn định và hiệu năng WebUI. Không có release mới nhưng có động thái quan trọng về localization, compaction safety, và provider expansion.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

### Merged (19 PR)

**WebUI & UX:**
- #5367: Localize agent activity sang 10 ngôn ngữ, real-time language switch
- #5602: Chime âm thanh khi agent hoàn thành (opt-in, off mặc định)
- #5901: Custom context window input (thay 5 giá trị cố định bằng free-text + K/M shorthand)
- #5904: Cache thread state, lazy-load catalogs → faster refresh
- #5905: Defer chat mount, cleanup URLs (settings không serialized chat vào URL)
- #5848: Hiển thị image results (screenshot, generated images) trong reply
- #5847: Unified preview pane cho files + websites, resizable, tab-based
- #5895: GitHub Star invitation sau 10 replies × 3 ngày

**Core stability:**
- #5724: Log background task exceptions (consolidation, archival, title gen)
- #5884: Lock compaction writes → prevent concurrent-append race condition
- #5807: Cancel Discord reaction tasks on stop (fix #5806)
- #5292: Matrix reply-to-user-event thay vì top-level messages

**Providers:**
- #5894: Backfill `reasoning_content` cho deepseek-flash tool-call history
- #5834: Handle `response.reasoning_text.*` trong SSE Responses consumer (xAI Grok, OpenAI Codex)

**Tools:**
- #5824: `read_file` tiếp tục với oversized lines (trước đây infinite loop)

**Housekeeping:**
- #5897: Xóa 4 helpers không dùng, cleanup exports
- #1387: Closed (Anthropic extended thinking → conflict)

### Open PRs quan trọng

- #5838: Route OpenAI-compatible API `/chat/completions` theo đúng `session_id` (hiện tại mọi request → `chat_id=default`)
- #5906: Support OpenAI Responses API cho `muse-spark-1.2/1.3-contributor` (OpenCode Go)
- #5257: Bound sustained-goal continuation (chặn loop khi idle, max 2 consecutive auto-continue)
- #5260: Ignore runtime files trong workspace untracked list
- #5780: Stop sending context compaction notifications (only show for `/compact`)
- #5864: Discord cancel delayed reactions on reset
- #5865: Preserve primary context window khi có smaller fallback
- #5907: Consolidate redundant tests (-703 lines, 46 parameterized groups)
- #5902: Generate WebUI/Telegram session titles, rename Telegram forum topics
- #5899: DingTalk true @-mentions qua sessionWebhook

## 4. Điểm nổi bật cộng đồng

**#5881 (closed)**: Phản ứng mạnh từ user về v0.3.5 yêu cầu `_nanobot` phải nằm ngoài workspace. Lý do: `runtime_data_dir` = config dir, sessions subdir không được trong workspace. User không hiểu tại sao cùng instance lại phải tách folder.

**#5849 (open)**: Deadlock bug nghiêm trọng - `summarize_transcript` gửi toàn bộ history không giới hạn token → auto-compaction fail khi history > input budget. Manual archival dùng `get_history(max_tokens=budget)` nhưng auto path không có guard.

**#5896 (open)**: Request support OpenAI Responses API cho OpenCode Go `muse-spark-*-contributor` (hiện tại 500 error).

## 5. Ổn định & Bugs

### Fixed
- **Race condition trong compaction** (#5884): Concurrent appends bị overwrite bởi compaction writes. Lock added.
- **Background task silent failure** (#5724): Consolidation, archival, title-gen fail không log. Now log với traceback.
- **Discord reaction leak** (#5807): Delayed emoji tasks không cancel trên stop → resource leak.
- **DeepSeek flash 400 errors** (#5894): Tool history thiếu `reasoning_content`.
- **`read_file` hang** (#5824): Oversized line → empty result loop. Now truncate + advance.

### Open critical
- **#5849**: Auto-compaction deadlock khi history > model input budget (no token guard)
- **#5838**: API routing broken - mọi `session_id` → `chat_id=default`
- **#5903**: Feishu channel leak checkpoint marker "Continue the active task..." ra user sau idle compaction

## 6. Yêu cầu tính năng

**Implemented:**
- Localized agent activity (#5367)
- Completion sound (#5602)
- Custom context window (#5901)
- Image previews (#5848)
- Unified file/website previews (#5847)

**Requested (open issues):**
- #5910: Persist composer draft per conversation (hiện tại in-memory, switch conversation → mất draft)
- #5909: Server-side message queue khi agent busy (hiện tại không thể queue follow-up)
- #5908: Live tokens/sec indicator khi streaming
- #5900: Silent context compaction + reduce WeChat polling log verbosity

## 7. Phản hồi người dùng

**Positive:**
- Localization, completion chime được chào đón
- Image preview & unified preview pane cải thiện UX đáng kể

**Complaints:**
- #5881: v0.3.5 `_nanobot` placement rule gây confusion
- #5849: Auto-compaction unreliable với large sessions
- #5903: Internal markers leak ra Feishu users
- #5900: Compaction notifications annoying, log spam từ WeChat channel

**Gaps identified:**
- Không queue được messages khi agent busy
- Composer draft loss khi switch chat
- Không có live generation speed indicator

## 8. Backlog & Roadmap

**High-pri fixes:**
- #5849: Add token budget guard cho `summarize_transcript`
- #5838: Fix API session routing
- #5903: Stop leaking checkpoint markers ra channels

**In-flight features:**
- #5906: OpenCode Go Responses API support
- #5902: Auto-generated session titles
- #5899: DingTalk true mentions

**Next likely:**
- Message queueing (#5909)
- Draft persistence (#5910)
- Streaming stats (#5908)
- Test consolidation (#5907) → reduce CI time

**Provider expansion:**
- #5845: Opper gateway integration (pending review)
- Anthropic extended thinking withdrawn (#1387 closed)

---

**Tốc độ merge**: 19 PR/24h = ~0.8 PR/giờ trong giờ làm việc. Chủ yếu WebUI polish + safety fixes. Không có breaking changes nhưng #5881 warning về deployment impact của config structure.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-09-25

## 1. Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào review PR tích lũy. 30 PR đang mở, nhiều PR lớn đang chờ merge (security, SOP, session persistence). Issue #8559 (agent dừng khi thoát chat) đã đóng sau 3 tháng.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR chính đang chờ:**

- **#10259** (JordanTheJet): Enforce authenticated principals on RPC - Stage 3 của security overhaul, yêu cầu auth trên tất cả RPC call
- **#10155** (JordanTheJet): SOP run logs có deduplication - Unified logging xuyên gateway/runtime/CLI/web
- **#11085** (JordanTheJet): Selectable decision models cho SOP triggers - Thay vì hard-code, operator chọn decision model riêng
- **#10551** (JordanTheJet): Agent-facing config authoring - Agent viết config draft, operator approve qua policy preview
- **#10407** (vrurg): Persistent session prompt attachments - SQLite-backed attachments sống qua restart

**Provider/integrations:**

- **#11104**: Thêm Cheaper Inference provider (OpenAI-compatible gateway)
- **#11076**: Antigravity CLI tool thay thế Gemini CLI đã deprecated
- **#10430**: Gemini speech-to-speech broker channel (PR1 daemon-core)

**Fixes:**

- **#11029**: Git command injection vulnerability - global options (`-c`, `--attr-source`) bị parse sai
- **#10979**, **#10986**, **#10988**: WhatsApp Web channel - Thêm create_room/invite_user, fix tool channel instances, đọc poll votes
- **#10843**: Telegram add_reaction/remove_reaction - Trước đó fake success
- **#10712**: Platform root trust cho outbound WebSocket TLS
- **#10652**: CLI memory commands bỏ qua PostgreSQL/Qdrant storage aliases

**Xu hướng:**

Security hardening chiếm nhiều PR lớn. SOP (standard operating procedures) đang được mở rộng với decision models, unified logging. Session persistence là focus thứ hai.

## 4. Điểm nổi bật cộng đồng

Issue #8559 đóng sau 5 bình luận - agent dừng việc khi user thoát chat window. Đây là S1 blocker từ tháng 6, giờ resolved.

Tracker #8358 (ZeroRelay native transport + v0.9.0) cập nhật ngày 24/9 - Milestone 0.9.0 đang close.

Nhiều PR từ experienced/distinguished contributors - JordanTheJet, vrurg, metalmon - lượng PR review lớn nhưng chưa merge.

## 5. Ổn định & Bugs

**Security:**

- #11029: Git command injection qua `-c`/`--attr-source` parsing
- #10712: WebSocket TLS không trust OS root store - proxy TLS inspection fail

**Functional bugs:**

- #10986: Channel tools nhận fresh instance thay vì stateful instance - WhatsApp Web session-bound channel bị broken
- #10843: Telegram reaction fake success
- #10652: CLI memory commands reject PostgreSQL/Qdrant
- #10485: ZeroCode clipboard temps không clean khi disconnect

**Runtime:**

- #10967: Test race - `try_recv` Empty không có nghĩa stream hết
- #10522: Manually started SOP runs không được drive

## 6. Yêu cầu tính năng

- **#11099**: Print relay frontdoor link + QR với pairing code khi enroll
- **#10960**: `ZEROCLAW_CACHE_TTL` để raise/disable Anthropic prompt cache TTL (hardcoded 5 phút)
- **#11044**: Session roots explicit, preserve resumed roots trong ZeroCode
- **#10407**: Persistent session prompt attachments (SQLite)
- **#11085**: Decision models thay thế hard-code SOP trigger logic

## 7. Phản hồi người dùng

Issue #8559 priority P1 từ tháng 6 - agent stop work on chat exit. Flow blocking, giờ resolved.

Tracker #8358 mention ZeroRelay readiness cho v0.9.0 - Community chờ native transport.

PR #11056 document WhatsApp voice-note round trip - Feature đã có vài release nhưng không documented.

## 8. Backlog & Roadmap

Milestone **v0.9.0** đang close (#8358 tracker). ZeroRelay native transport là blocking item.

Nhiều PR lớn cần review:
- Security: #10259 (RPC auth enforcement)
- SOP: #10155 (unified logs), #11085 (decision models)
- Config: #10551 (agent-facing config authoring)
- Session: #10407 (persistent attachments), #10412 (session ownership)

Speech-to-speech (#10430) và memory backends (#10652) trong pipeline.

Dependencies: Dependabot bump hmac 0.13.0 (#10872), similar 3.2.0 (#10873), rust group updates (#11062).

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo hoạt động PicoClaw - 2026-09-25

## 1. Tóm tắt hôm nay

Ngày bảo trì dependencies với 5 PR update tự động từ dependabot. Bug nghiêm trọng về multi-line input trên Pico channel được báo cáo lặp (issue duplicate). Không có release mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PRs đang chờ merge:**

- **#3381** (stale): Chuyển OpenAI sang Responses API - feature PR ngừng hoạt động từ 2026-09-17
- **#3376** (stale): Fix DeltaChat channel validation error - giải quyết #3265, nhưng stale từ 2026-09-10  
- **#3371**: Provider mới `opencode-go` với session header support - routing tự động theo model ID

**Dependency updates (2026-09-24):**
- #3389: golang.org/x/crypto 0.53.0 → 0.57.0
- #3388: MCP Go SDK 1.6.1 → 1.8.0  
- #3387: Anthropic SDK 1.55.1 → 1.74.0 (jump lớn 19 versions)
- #3386: mautrix 0.27.0 → 0.31.0
- #3385: LINE bot SDK 8.20.1 → 8.22.0

**Phân tích xu hướng:**
- Nhiều dependency bumps major → project đang cập nhật để theo kịp ecosystem
- 2 PR tính năng quan trọng (#3381, #3376) bị stale → thiếu review/merge capacity
- #3371 (opencode-go) vừa được đóng góp → cộng đồng vẫn mở rộng provider support

## 4. Điểm nổi bật cộng đồng

**#3391 + #3390**: Issue duplicate về Pico channel splitting multi-line input
- User @chentianxiong123 tạo 2 issues giống hệt nhau trong cùng ngày
- #3390 đã đóng (likely duplicate), #3391 vẫn mở
- Không có bình luận hay reaction → chưa có sự chú ý từ maintainers

Tương tác cộng đồng yếu: 0 thumbs-up trên tất cả issues/PRs mới.

## 5. Ổn định & Bugs

**Bug nghiêm trọng (#3391):**
- **Vấn đề**: Pico mobile TUI tự động tách nội dung multi-line (thơ, code blocks) thành nhiều messages riêng lẻ
- **Nguyên nhân**: picoclaw split input theo newline characters
- **Tác động**: Phá vỡ cấu trúc message, trải nghiệm người dùng kém với content có format
- **Trạng thái**: Mới báo cáo, chưa có response từ team

**Bug đã fix trước đó:**
- #3265 (DeltaChat validation error) có PR fix #3376 nhưng stale

## 6. Yêu cầu tính năng

Không có feature request mới trong 24h.

**Feature PRs pending:**
- OpenAI Responses API (#3381) - modern API pattern
- OpenCode Go provider (#3371) - session management cho conversation context

## 7. Phản hồi người dùng

Phản hồi tiêu cực từ @chentianxiong123 về Pico channel UX. User frustrated đủ để report duplicate issue. Cho thấy:
- Mobile client experience cần cải thiện
- Basic input handling chưa đáp ứng use case thực tế (paste code/poetry)

Không có feedback tích cực visible trong 24h qua.

## 8. Backlog & Roadmap

**Roadmap không rõ ràng**, nhưng infer từ activity:

**Technical debt cần xử lý:**
- Review và merge 2 stale PRs (#3381, #3376)
- Fix multi-line input bug (#3391) - high priority vì ảnh hưởng UX
- Dependency updates cần merge để tránh security/compatibility risks

**Bottleneck:**
- Maintainer bandwidth thấp → PRs bị stale
- Community contributions không được review kịp thời
- Bug reports thiếu triage và response

**Recommended actions:**
1. Triage và fix #3391 ngay (UX regression)
2. Review stale PRs, quyết định merge hoặc request changes
3. Merge dependency updates để giữ project healthy

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-09-24

## 1. Tóm tắt hôm nay

Ngày tập trung sửa lỗi và hardening. Team @glifocat xử lý nhiều bug liên quan setup, compatibility arm64, và timing issues trên CI. Không có release, chủ yếu PR fix và test stability.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**Merged PRs (3):**
- #3882: Fix CLI help text - list đầy đủ approval status và drop reasons
- #3885: Fix Claude CLI offer logic cho runs chưa chọn runtime  
- #3890: Thêm giải thích inbound message blocks trong chat system prompt

**Open PRs quan trọng (10):**

**Bugs & Fixes:**
- #3891 ⭐: Sửa Iron Proxy fail trên arm64 - Iron Control image chỉ có amd64, cần multi-arch build
- #3883: Recover orphaned Iron Control database khi re-install sau khi xóa checkout
- #3884: Fix Claude CLI offer logic - chỉ show cho Claude installs
- #3889: Xóa `unknown_sender_public` khỏi dropped-messages help (host không bao giờ ghi reason này)
- #3893: Fix heartbeat timeout khi Claude stream block dài - container bị kill giữa chừng vì chỉ touch `.heartbeat` mỗi provider event

**Hardening & Test stability:**
- #3892: Fix timing flake trong portal runtime test - wait journal clear thay vì sleep
- #3887: Fix readiness probe timing bugs - không clip timeout, budget delivery-poll drain test
- #3886 ⭐: CI yêu cầu release note hoặc tick "no user-visible change" - 59/91 PRs trong 2.4.0 thiếu release note

**Features (older, still open):**
- #3510 + #3509: WhatsApp shared mode - thêm sender label để phân biệt agent nào reply (nhiều agent groups dùng chung 1 WhatsApp number)

**Xu hướng:** Team đang cleanup technical debt trước release tiếp theo - focus vào test stability, documentation, và edge cases.

## 4. Điểm nổi bật cộng đồng

Không có interaction đáng kể (0 comments, 0 reactions trên tất cả items).

Issues #3888 và #3881 mới mở nhưng chưa có engagement - likely từ internal testing hoặc private reports.

## 5. Ổn định & Bugs

**Critical:**
- #3888 / #3891: Iron Proxy không chạy trên arm64 hosts (NVIDIA DGX Spark) - `exec format error` vì image amd64-only. Fix đang review.

**Medium:**
- #3893: Container bị kill mid-generation khi Claude stream block dài (>idle ceiling) - heartbeat chỉ update mỗi assistant message event, không phải mỗi block
- #3883: Orphaned Iron Control database khi install fail/abandoned và checkout deleted - re-install không recover được
- #3887: Readiness probe bị clip timeout, gây false negative trên slow CI runners

**Low:**
- #3882: CLI help text thiếu một số enum values
- #3884/#3885: Claude CLI offer logic sai - show cho wrong runtime types
- #3892: Portal test flaky vì race condition giữa log event và journal state

**Pattern:** Hầu hết bugs từ edge cases (arm64, timing, cleanup state) không phải core logic. Cho thấy codebase ổn định nhưng cần test coverage tốt hơn cho deployment environments khác nhau.

## 6. Yêu cầu tính năng

**Active:**
- #3881: Iron Proxy auto-approval per-host rules - tool skills gọi allowed hosts mà không cần approval card mỗi request. Hiện chỉ auto-approve model provider domains và GET/HEAD requests.

**In progress:**
- #3510/#3509: WhatsApp sender labels trong shared mode - để phân biệt agent nào reply khi nhiều agents dùng chung number.

Không có feature request mới trong 24h.

## 7. Phản hồi người dùng

Không có public feedback. Issues mới (#3888, #3881) có vẻ từ internal testing hoặc enterprise deployments (NVIDIA DGX reference).

Lack of community interaction có thể do:
- Project còn early stage / private beta
- User base chủ yếu enterprise không engage công khai
- Hoặc core team đang tự drive development

## 8. Backlog & Roadmap

Không có roadmap công khai trong data.

**Inferred priorities từ PR activity:**
1. **Release quality:** #3886 enforce release notes - chuẩn bị changelog cho version tiếp
2. **Platform compatibility:** Arm64 support (#3891) - mở rộng deployment targets
3. **DX improvements:** CLI help accuracy, setup robustness
4. **Test stability:** Fix flakes trước khi scale CI

**Backlog (older PRs):**
- WhatsApp multi-agent features (#3509/#3510) - từ tháng 8, chưa merge
- Có thể đang đợi user testing hoặc architectural review

---

**TL;DR:** Maintenance day. Team hardening infrastructure cho arm64 deployments, fixing timing issues, và tightening release process. No flashy features, all reliability work. Iron Proxy arm64 bug (#3888) most user-impacting issue tracked.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw — 2026-09-24

## 📊 Tóm tắt hôm nay

Ngày làm việc cực kỳ bận rộn với **13 PR mới/cập nhật** và **12 issue đóng**. Tập trung vào 3 mảng: sửa lỗi nghiêm trọng (stack overflow, memory recall), cải thiện docs (hướng dẫn MCP/subagents/skills), và tối ưu infrastructure (symlink skills, cấu hình SQLite path). Không có release mới.

---

## 🚀 Releases

Không có.

---

## 🔧 Tiến độ dự án

### PRs quan trọng (đang mở)

**#1006** — CLI stdout bị ghi đè byte đầu tiên
- **Vấn đề**: streaming output dùng `pwrite(fd, 0)`, macOS thay byte đầu bằng `\n` → output như `pong` thành `\nong`
- **Fix**: chuyển sang append mode
- **Trạng thái**: tests pass, đợi merge

**#1005** — Memory recall đưa archived data vào context hiện tại
- **Vấn đề**: `LIMIT` áp dụng trước session filter → archived shards chiếm slot của turn đang xử lý
- **Fix**: ưu tiên session hiện tại, `is_archived = 0` filter
- **Trạng thái**: merged logic, waiting final review

**#1003** — Support symlink trong skills directory
- **Request**: #995 — giảm duplicate khi quản lý skills
- **Giải pháp**: `nullclaw skills list` follow symlink nếu trỏ đến skill dir hợp lệ, bỏ qua broken/non-dir
- **Limit**: archive install vẫn reject symlink (security)

**#1001** — Memory auto-recall configurable
- **Thêm config**: `memory.auto_recall` (bool), `memory.recall_limit` (u32), `memory.max_context_bytes` (usize)
- **Default**: `true`, `5`, `65536`
- **Use case**: tắt FTS5 query khi không cần context injection

**#1004** — Log provider error body khi non-2xx
- **Vấn đề**: model không support tools → adapter fail nhưng không log response body
- **Fix**: scrub secrets, cap length, log body trước khi free
- **Liên kết**: #1000 — user cần biết tại sao ollama model fail

### PRs đóng hôm nay

**#996** — MCP stdio hang do không timeout (#991)
- **Root cause**: `nullclaw agent` CLI call block vô thời hạn khi gateway đã chiếm MCP server
- **Fix**: bound response wait với `timeout_ms`, kill process group khi timeout
- **Validation**: 7,373 tests pass

**#985** — SIGSEGV trên Telegram (#976)
- **Root cause**: session turn thread dùng 512 KB stack nhưng TLS/crypto inline copy cần nhiều hơn
- **Fix**: raise `SESSION_TURN_STACK_SIZE` lên 16 MiB
- **Platform**: aarch64 Linux, nullclaw v2026.5.29

**#979** — Memory config bị close do author xóa fork
- **Reopen**: #1001 restore lại content

**#411** — Tool customization system (trigger-based prioritization)
- **Feature**: custom trigger keywords, priorities, pre-configured params
- **Đóng**: unclear — có thể merged hoặc rejected, không có comment

**#319** — DingTalk message sending + recall
- **Feature**: OAuth2, official API thay webhook
- **Đóng**: tương tự #411

### Docs cleanup wave

**#1008** — Fix index rendering
- Two-letter prefix gây docs index fail → stripped
- Thêm pages: MCP, subagents, voice, hardware (EN + CN)

**#1007** — Explain diagnostics flags
- `log_all_content`, `verbose_logging` defaults + production safe values

**#777** — Archive stale planning docs
- `integration-analysis.md`, `integration-roadmap.md` → `docs/archive/`
- Slim `CONTRIBUTING.md`, cross-ref `SECURITY.md`

**#774–776** — Update stats, dedupe CLAUDE.md, add subsystem guides

### Xu hướng

1. **Ổn định runtime**: 3 critical crashes fixed (stack overflow Telegram #976, MCP hang #991, CLI stdout corruption #1006)
2. **Docs maturity**: 8 PRs docs — subsystem guides xuất hiện (MCP, subagents, skills, voice, hardware)
3. **Config flexibility**: memory, SQLite path, recall limits đều configurable
4. **Community requests**: symlink skills (#995), ollama error visibility (#1000)

---

## 💬 Điểm nổi bật cộng đồng

**#1000** — ollama incompatibility notification (👍 0, 3 comments)
- User dùng Wireshark để debug tại sao ollama model fail
- Không có error message rõ ràng → "adapter error without description"
- **Đã fix**: #1004 log provider error body

**#867** — Request example config.json (👍 3, 1 comment, CLOSED)
- "default config crippled, impossible to get working"
- Yêu cầu heavily commented example
- **Trạng thái**: đóng nhưng không thấy PR fix → có thể addressed ở branch khác

**#631** — GET /status endpoint cho agent monitoring (👍 1, 3 comments, CLOSED)
- Request: JSON endpoint expose agent state thay vì shell out `nullclaw status`
- **Trạng thái**: đóng, không rõ merged hay rejected

---

## 🐛 Ổn định & Bugs

### Fixed hôm nay

1. **#976** — SIGSEGV mỗi Telegram message (aarch64 Linux)
   - Stack 512 KB không đủ cho TLS crypto
   - → 16 MiB stack (#985)

2. **#991** — MCP stdio hang indefinitely
   - CLI block khi gateway chiếm server
   - → timeout + kill process group (#996)

3. **#870** — Gateway 100% CPU trên WSL2 (accept4 busy loop)
   - **Đóng** nhưng không thấy PR fix
   - Có thể fixed ở #978 hoặc branch khác

4. **#1006** — CLI stdout byte đầu bị corrupt
   - `pwrite(0)` gây overwrite
   - → append mode

5. **#1005** — Memory recall inject archived data
   - Session filter sau LIMIT
   - → filter trước, priority live session

### Đang mở

**#1000** — Ollama model tool support error unclear
- Đã có fix #1004, chờ test + merge

---

## ✨ Yêu cầu tính năng

### Merged/in progress

1. **Symlink skills support** (#995 → #1003)
   - Follow symlink trong `~/.nullclaw/skills/`
   - Giảm duplicate, dễ quản lý obsolete skills

2. **Memory config tunables** (#979 → #1001)
   - `auto_recall`, `recall_limit`, `max_context_bytes`
   - Use case: tắt FTS5 khi không cần context injection

3. **SQLite path configurable** (#986)
   - `memory.database_path`
   - Support read-only workspace deployments

### Đã đóng (unclear status)

1. **Tool customization system** (#411)
   - Trigger keywords, priorities, pre-configured params
   - **Không rõ** merged hay rejected

2. **GET /status endpoint** (#631)
   - JSON agent monitoring
   - Đóng không có PR follow-up

3. **Vision pipeline** (#624)
   - Gửi image/file trực tiếp, auto base64 encode
   - Đóng không rõ lý do

---

## 🗣️ Phản hồi người dùng

### Khó khăn onboarding

**#867** — config.json example quá tối thiểu
- User: "crippled, almost impossible to get working"
- Request: fully working example với heavy comments
- **Chưa thấy resolution**

### Developer experience

**#1000** — Error visibility kém
- Phải dùng Wireshark để debug ollama tool support
- **Đã fix**: #1004 log provider error body

**#495** — Tunneling qua CloudFlare/nginx
- Request: expose local web channel qua public proxy
- **Đóng** không rõ lý do

### Low-resource devices

**#871** — web_search không practical trên thiết bị yếu
- Brave Search cần API key, curl DuckDuckGo bị block
- **Đóng** nhưng không thấy workaround

---

## 📋 Backlog & Roadmap

### Infrastructure đang củng cố

1. **Docs maturity** — 8 PRs docs hôm nay
   - Subsystem guides: MCP, subagents, skills, voice, hardware
   - Stats update, deduplication

2. **Runtime stability** — 5 critical fixes trong 2 tháng
   - Stack sizing (#976, #985)
   - MCP timeout (#991, #996)
   - Memory isolation (#1005)
   - CLI output (#1006)

3. **Config flexibility** — 3 tunable additions
   - Memory auto-recall (#1001)
   - SQLite path (#986)
   - Provider error logging (#1004)

### Feature requests chưa resolved

1. **Subagent spawning** (#190)
   - Different provider per agent
   - Intercommunication
   - **Đóng** không có timeline

2. **Vision pipeline** (#624)
   - Image/file direct send, auto base64
   - User dùng như skill riêng
   - **Đóng** không có follow-up

3. **Tool customization** (#411)
   - Trigger-based prioritization
   - **Đóng** unclear status

### Không có roadmap công khai

Issues/PRs không reference milestone hay project board. Development reactive theo bug reports + community PRs.

---

## 🎯 Kết luận

Ngày 2026-09-24 là **high-velocity stability sprint**. Team đóng 12 issues (chủ yếu critical bugs), mở 6 PRs mới, và push 8 docs PRs. Focus rõ ràng: **fix crashes → improve config → document subsystems**. 

**Mạnh**: response speed tốt (3 critical bugs fixed trong 1–2 tháng), docs investment tăng.  
**Yếu**: onboarding vẫn khó (#867), feature requests bị đóng không giải thích (#190, #624, #411).

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw — 2026-09-24

## 1. Tóm tắt hôm nay

Phát hành RC2 cho v1.4.1 sửa lỗi Google OAuth. Issue phân loại lỗi benchmark hàng ngày (officeqa) cho thấy 38 task fail do chất lượng model deepseek-v4-flash. PR làm mới knowledge graph tự động.

## 2. Releases

**v1.4.1-rc.2** (2026-09-24)

- **Fixed**: Google extensions (Gmail, Calendar) giờ kích hoạt được khi operator cung cấp OAuth client qua Web UI thay vì biến môi trường
- **Root cause**: Authorization thành công → activation fail → credential bị revoke ngay lập tức → mỗi lần retry phải consent lại
- **Impact**: Chặn workflow OAuth cho deployments không dùng env vars

Patch candidate thứ hai, cùng fix như RC1.

## 3. Tiến độ dự án

**PR #7988** (bot-generated, từ 2026-08-29)
- Chore PR từ workflow `Codebase Graph Refresh` chạy hàng đêm
- Làm mới codebase-memory bootstrap snapshot từ default branch
- Size XS, risk low, contributor core
- Đang mở, chưa merge

**Issue #8111** (2026-09-24)
- Daily failure taxonomy cho benchmark officeqa
- 38 task non-pass, tất cả do model-quality failures của deepseek-v4-flash
- Chạy trên OCR-digitized Treasury documents
- Không phải bug infrastructure hay agent code, thuần model capability

**Xu hướng**: Automation tốt (daily taxonomy report, nightly graph refresh). Đang theo dõi model quality thay vì chỉ infrastructure stability.

## 4. Điểm nổi bật cộng đồng

Không có tương tác nào trên issue hay PR được liệt kê (0 comments, 0 reactions).

Dự án có vẻ nội bộ hoặc cộng đồng nhỏ. Không có discussion hay feedback công khai.

## 5. Ổn định & Bugs

**Fixed trong v1.4.1-rc.2**:
- Google OAuth activation loop (credential revoke → retry → fail again)

**Model quality tracking**:
- Issue #8111 ghi nhận 38 failures do deepseek-v4-flash không đủ chất lượng cho OCR documents
- Không phải bug code, nhưng ảnh hưởng reliability của agent

Không có bugs mới được báo cáo trong ngày.

## 6. Yêu cầu tính năng

Không có feature requests trong dữ liệu hôm nay.

## 7. Phản hồi người dùng

Không có feedback hoặc user experience reports công khai.

## 8. Backlog & Roadmap

**Suy luận từ hoạt động**:
- v1.4.1 đang trong RC phase, chờ stable release
- Codebase graph refresh (PR #7988) cần merge để đồng bộ knowledge base
- Daily benchmark taxonomy (#8111) cho thấy có quy trình đánh giá quality thường xuyên

Không có roadmap công khai trong dữ liệu.

---

**Nhận xét**: Dự án có automation tốt (nightly jobs, daily reports) nhưng thiếu engagement cộng đồng. Focus vào model evaluation và infrastructure stability. Release cycle ngắn (RC2 trong vòng vài tuần).

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-09-25

## 📊 Tóm tắt hôm nay

Không có release mới. Team tập trung vào stabilization phase: 23 PRs đang mở (nhiều fix lỗi context & tool), 24 issues (phần lớn bug reports từ beta testing). Hot threads: console redesign regression (#7968), file guard bypass (#2967), và context eviction issues.

---

## 🚀 Releases

Không có release trong 24h qua.

---

## 💻 Tiến độ dự án

### PRs quan trọng đang review:

**Core fixes:**
- #7973: Recover từ rejected media URLs - fix lỗi session chết khi provider từ chối file:// URLs
- #7965: Context reclaim cho historical media - scroll eviction bỏ qua images vì chỉ đếm text
- #7964: Langfuse tool observation không record output - drain() return sớm trước khi tool finish
- #7961: Thay html2text (GPL) = markdownify (MIT) - license compliance

**Security:**
- #2978 + #4361: Fix file guard bypass qua shell commands - agent dùng `execute_shell_command` để đọc sensitive files khi file tools bị block

**UX improvements:**
- #7931: Durable paginated transcript history - SQLite storage cho full history
- #7861: Multi-tab terminal trong console - xterm.js with per-conversation working dir
- #7914: Custom browser tab title - distinguish multiple deployments

**Infrastructure:**
- #7785: Realtime voice chat - provider-configurable speech I/O
- #7719: Separate model cho memory writing - không phải dùng main expensive model

### Xu hướng:
- **Stabilization focus**: 17/23 PRs là bug fixes
- **Beta testing feedback loop**: nhiều first-time-contributor PRs từ v2.2.2b3 testing
- **Context management**: 3 PRs về context eviction (#7965, #7628, #7733)

---

## 🔥 Điểm nổi bật cộng đồng

**Top engagement:**

1. **#7318 - QwenPaw Hub roadmap** (32 comments, 4 👍)  
   Community discussion: multi-tenant edition đã release, đang hỏi next priorities

2. **#7968 - Console sidebar redesign broke groups** (2 comments)  
   v2.2.2b3 regression: chat group/folder feature mất hoàn toàn  
   → Fixed by #7972 (default grouping về source)

3. **#7836 - Scroll eviction drops user turns** (2 comments, 1 👍)  
   Tool-heavy spans bị evict nguyên khối, kéo theo user messages ở giữa

**Pain points users quan tâm:**
- Context management instability ở long sessions
- Multi-channel/multi-agent setup confusion
- Mobile app requests (#7976)

---

## 🐛 Ổn định & Bugs

### Critical bugs đang xử lý:

**Data loss risks:**
- #7836: Scroll eviction drops live user turns - history.db giữ nhưng live window mất
- #7850: Driver card policy lost update - background reload ghi đè concurrent writes
- #7628: Context compaction vẫn exceed provider budget - đếm sai complete request size

**Session-breaking bugs:**
- #7966: Provider switch làm vỡ session - historical file:// URLs bị reject
- #7576: CONTEXT_UNFIT hardcoded 32768 fallback - tất cả models bị limit sai
- #7534: Feishu queue consumer stuck - high-priority message block toàn bộ session

**Tool execution:**
- #2967: File guard bypass via shell - tools bị block nhưng shell command pass
- #7856: qwenpaw-pet 0.1.1 breaks approvals - missing `actor` argument
- #7963: Langfuse observations không có output

### Patterns nhận thấy:
- Context manager bugs cluster ở v2.2.x beta releases
- Tool coordination race conditions khi có queue/async
- Provider compatibility issues với media URLs

---

## ✨ Yêu cầu tính năng

**User-requested features:**

1. **#7976 - Official mobile app** (1 comment)  
   User tự build Android app nhưng muốn official maintained version

2. **#7733 - Agent-autonomous context management** (3 comments)  
   Agent không control được context eviction - đề xuất pre-eviction hooks để cleanup

3. **#7957 - Disable premade models/channels** (2 comments)  
   OCD users muốn hide unused presets

4. **#5558 - Send attachments without text (WeChat)** (2 comments)  
   Enterprise WeChat: upload file → send button vẫn disabled nếu không có text  
   → Fixed by #5659

**Infrastructure requests:**
- #7500: Forward OpenAI extra_headers during connection testing
- #7715: Daily Paper proxy config - arxiv.org không reach được ở một số regions

---

## 💬 Phản hồi người dùng

### Positive signals:
- First-time contributors tăng (7 first-time-contributor PRs trong data)
- Active beta testing feedback loop
- Community engaged trong roadmap discussions (#7318)

### Friction points:
- **Multi-instance confusion**: #2013 hỏi có setup được 2 agents cùng 2 WeChat bots không
- **Approval UX**: #4450 - short commands đã có từ v1.1.7 nhưng không document
- **Context transparency**: Users không hiểu tại sao messages biến mất (#7836, #7628)

### Enterprise concerns:
- File guard bypasses là security risk cho production
- Multi-tenant edition mới, chưa có case studies

---

## 📋 Backlog & Roadmap

### Đang trong pipeline (từ open PRs):

**Q4 2026 priorities (inferred):**
1. **Stabilize v2.2.x** - fix critical context/tool bugs trước khi promote stable
2. **Security hardening** - close file guard bypasses (#2978, #4361)
3. **Multi-modal improvements** - voice chat (#7785), better media handling (#7973)
4. **Developer experience** - terminal integration (#7861), better observability (#7964)

**Post-stabilization (từ discussions):**
- Mobile apps (official iOS/Android)
- Better multi-agent/multi-tenant primitives
- Agent-controlled context lifecycle (#7733)

### Technical debt được tackle:
- GPL dependency removal (#7961)
- Test coverage gaps (many PRs add missing tests)
- Provider compatibility matrix (Moonshot, custom endpoints)

---

## 🎯 Insight tổng hợp

**Project maturity:** QwenPaw đang transition từ feature velocity sang stability focus. v2.2.x beta cycle expose nhiều edge cases ở context management và tool coordination - areas less tested ở early versions.

**Community health:** Healthy mix của power users (contribute fixes) và newcomers (ask clarifying questions). First-time contributor pipeline hoạt động tốt.

**Risk areas:** Context eviction logic cần rethink fundamental - hiện tại có 3+ related bugs (#7628, #7733, #7836, #7853). File guard bypasses là known issue từ v1.0 (#2967 từ April) nhưng vẫn chưa merge fix.

**Competitive position:** Multi-tenant Hub (v2.2.0) là differentiator nhưng docs/examples thiếu. Voice chat feature (#7785) đuổi kịp competitors như OpenAI Realtime API.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*