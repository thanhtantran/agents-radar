# Bản tin Hệ sinh thái Hermes Agent 2026-09-27

> Issues: 140 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-27 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-27

## 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa lỗi hệ thống cập nhật (updater) trên Windows, xử lý vấn đề PM (package manager) trên các bản cài đặt managed, và cải thiện lifecycle của MCP servers. Có 30 PR được merge trong ngày, phần lớn thuộc P2-P3.

---

## 🚀 Releases

Không có release mới trong 24h qua.

---

## 📈 Tiến độ dự án

### Các PR quan trọng đã merge:

**Windows updater cluster (P2):**
- #123005: Fix Desktop updater kill external venv holders trước khi hand-off → tránh "venv shim locked" abort
- #123003: Fix MCP stdio orphan processes trên Windows bằng Job Object + tree reaping
- #122995: Tăng backend readiness timeout từ 45s → 180s cho hardware chậm

**PM & dependency management (P1-P2):**
- #122943: Desktop cron ticker đứng lại khi gateway đã có cron trên cùng HERMES_HOME
- #122919: API server publish `gateway.status` heartbeat theo interval, tránh dashboard đọc nhầm frozen/dead

**Session & gateway (P2):**
- #122964: Thêm cột `created_source` bất biến để giữ platform provenance gốc (fix /resume ghi đè)
- #122946: Discard stale process notifications trước queued turns (fix Telegram spam old heartbeats)
- #122958: Mark synthetic process notifications `internal`, stop stale reply anchors

**Desktop UI (P3):**
- #122926: Escape lone tildes `~` trong markdown preprocessing (fix `1~10,11~20` render nhầm strikethrough)
- #122929: Cho manual model entry khi endpoint discovery fails

### Các PR đang open (quan trọng):

**P0-P1:**
- #123682: PM cài Python/uv dành cho glibc trên musl Linux (Void/Alpine) → segfault, unusable sau update
- #124674: Preflight untracked stash collisions (fix `git stash apply` lỗi khi update bắt đầu track file cũ)

**P2:**
- #124622: Windows install legs stop hanging; install/update PRs chạy 4-leg real-OS subset
- #124676: Scope Windows gateway lifecycle to current install (fix machine-wide scan treat other installs' gateways as unmapped)
- #124678: Map `SSL_CERT_FILE` vào `GIT_SSL_CAINFO` cho git children (fix TLS proxy)
- #124578: Bind shared custom endpoints to runtime owners (credential pool security boundary)

**Feature requests (P3):**
- #110835: Preserve exhausted conversations với durable pause (compression.exhaustion_action: pause)
- #117088: Microphone/speaker pickers trong Settings → Voice
- #114029: Filter reasoning-effort picker theo model supports

---

## 🔥 Điểm nổi bật cộng đồng

**Issues được quan tâm nhất (theo comments):**

1. **#122593** (11 bình luận, P1): `pm` workspace materializer strip `pm/uv.lock` → mọi `hermes pm` command đều fail trên materialized installs
2. **#118029** (10 bình luận, P3): Desktop one pinned verified rollout control plane cho managed SSH installations
3. **#122609** (9 bình luận, P3): Skills index stale/degraded watchdog alert

**Vấn đề người dùng quan tâm:**
- Windows updater reliability (nhiều duplicate issues: #124318, #123463, #62311)
- Desktop session management (mix-up sau compression #51058, branch nesting #99648)
- Remote gateway authentication persistence (#61457, #123008)
- PM/dependency drift trên managed installs (#122425, #122395)

---

## 🐛 Ổn định & Bugs

**Vấn đề đang xử lý (P0-P1):**
- musl Linux segfault sau PM install (#123682)
- Untracked file collision trong update stash (#124674, #124641)

**Vấn đề Windows (nhiều nhất):**
- Gateway lifecycle scoping (#124676, #124318, #123463)
- Update venv lock race (#123005, #62311)
- MCP stdio orphans (#123003)
- Desktop timeout (#60772 đã close)

**Vấn đề nền tảng khác:**
- macOS launchd label leftover sau uninstall (#123012)
- PYTHONPATH leak vào subprocess (#74817)
- Git-root CLAUDE.md scope (#124513)

**Vấn đề đã fix gần đây:**
- Desktop paste/file attachments resolve sai filesystem trên SSH backend (#110174)
- Kanban workers crash sau `hermes update` (#122500)
- TUI WebSocket frame stalls >10s (#60654)

---

## 💡 Yêu cầu tính năng

**Đã được đề xuất:**
- #52442 (P3): Show raw model ID trong composer dropdown & Edit Models dialog (phân biệt models cùng display name)
- #105397 (P3): Bind native reviews to immutable candidates + enforce inspection-only tools
- #26549 (P3): Per-job timezone cho cron schedules
- #124513 (P3, needs-decision): Opt-in Git-root scope cho CLAUDE.md writes (worktree PR review use case)

**Feature PR đang open:**
- #110835: Durable pause cho exhausted conversations
- #117088: Audio device pickers
- #114029: Model-aware reasoning-effort filter

---

## 💬 Phản hồi người dùng

**Pain points lặp lại:**
- Windows update reliability (nhiều variations của cùng root cause)
- Managed install PM drift (workspace không sync, metadata thiếu)
- Desktop session mixing/branch nesting confusion
- Gateway identity mismatch sau update/restart

**Positive signals:**
- Community plugin submissions (#122225 - hermes-lcm-x lossless context engine)
- Active bug reporting với reproduction steps rõ ràng
- Multi-platform testing feedback (Windows, macOS, Linux including musl)

---

## 📋 Backlog & Roadmap

**Priorities (suy từ label distribution):**

1. **Install/update stability** (nhiều sweeper:risk-compatibility, area/install-update)
   - PM materialized install fixes
   - Windows lifecycle cleanup
   - Cross-platform Git/SSL trust chain

2. **Session management** (sweeper:risk-session-state)
   - Provenance tracking
   - Compression recovery
   - Desktop/TUI sync

3. **Platform parity** (sweeper:risk-platform-windows)
   - Windows updater hardening
   - MCP lifecycle trên Windows
   - Path resolution consistency

4. **Security boundaries** (sweeper:risk-security-boundary)
   - Credential pool scoping
   - ACP session lifecycle
   - Protected instruction files

**Planned (từ open PRs):**
- E2E test matrix với real OS legs (#124622)
- Multiplex gateway migration tooling (#124120)
- Fake-IP range policy refinement (#110869 superseded, upstream giờ support `security.fake_ip_ranges`)

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 27/09/2026

## 1. 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong **pha ổn định và chuyên môn hóa**. Hermes Agent và OpenClaw dẫn đầu về quy mô (500 PR), NanoClaw/NullClaw/Zeroclaw nhóm mid-tier (28-50 PR), còn lại nhỏ hơn (≤13 PR).

**Xu hướng chung:**
- **Stability crisis**: Hermes và OpenClaw gặp regression lớn từ update gần nhất
- **Architecture shift**: Zeroclaw refactor gateway split, NanoClaw thêm extensibility seams
- **Platform parity**: Windows compatibility chiếm nhiều effort (Hermes, OpenClaw, NanoBot)
- **Security tightening**: OIDC landing (Zeroclaw), credential scoping (Hermes), session key leaks (NanoClaw)

Không có release nào trong ngày → ecosystem-wide code freeze hoặc sync delay.

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | PR Activity | Community | Stability |
|-------|--------|-----|----------|-------------|-----------|-----------|
| **Hermes Agent** | 140 | 500 | 0 | 30 merged/ngày | 🔥 High (11 comments/issue) | ⚠️ Update crisis |
| **OpenClaw** | 256 | 500 | 0 | ~15 merged/ngày | 🔥 High (41 comments top issue) | 🔴 Native leak + disk overload |
| **Zeroclaw** | 4 | 50 | 0 | ~8 merged/ngày | 🟡 Medium (15 commits 1 PR) | 🟢 OIDC landing, security focus |
| **NanoClaw** | 4 | 28 | 0 | Burst 18 PR/ngày | 🟡 Low engagement | 🟡 Update broken, seams WIP |
| **NanoBot** | 4 | 13 | 0 | 11 fix PR/ngày | 🔴 Silent (0 comments) | 🟢 Edge case hardening |
| **PicoClaw** | 1 | 3 | 0 | 1 merged | 🔴 Silent | 🟡 QQ API mismatch |
| **NullClaw** | 0 | 5 | 0 | 0 merged | 🔴 Zero interaction | 🟡 5 bugs pending |
| **IronClaw** | 1 | 1 | 0 | 0 merged | 🔴 Zero interaction | ⚪ No data |
| **QwenPaw** | 4 | 3 | 0 | 1 UX PR merging | 🟡 Low | 🟡 State bugs, i18n holes |

**Chỉ số hoạt động:**
- **Tier 1** (industrial): Hermes, OpenClaw – 500 PR, dozens merged/day, enterprise pain points
- **Tier 2** (active dev): Zeroclaw, NanoClaw – focused sprints, architectural work
- **Tier 3** (maintenance): NanoBot, QwenPaw, PicoClaw – sporadic fixes, small teams
- **Tier 4** (dormant): NullClaw, IronClaw – PR backlog, zero engagement

---

## 3. 🎯 Vị thế Hermes Agent

**Dẫn đầu về scale & adoption:**
- Largest codebase (500 PR, 140 issue)
- Most active community (11 comments/issue avg, detailed bug reports with repro)
- Enterprise focus: managed installs, PM workspace materialization, SSH backends
- Multi-platform (Windows/macOS/Linux including musl)

**Challenges hiện tại:**
- **Update reliability crisis**: 2026.9.5→9.6 gây nhiều regression (venv lock, MCP orphans, PM drift)
- User trust bị ảnh hưởng: "I genuinely regret upgrading" (#122593)
- Technical debt: Windows lifecycle, session provenance tracking, compression correctness

**So với OpenClaw:**
- Hermes có vấn đề tương tự (update reliability) nhưng **ít critical hơn** (không có native leak 1GB/30s)
- Hermes focus **developer experience** (Desktop UI, TUI, SSH), OpenClaw focus **channel integrations** (Slack/WhatsApp/Feishu)
- Cả hai đều cần **stability freeze** trước feature work

**Competitive moat:**
- Mature PM/dependency system (dù có bugs)
- SSH backend support (rare)
- Desktop app polish (escape tildes, model discovery fallback)

---

## 4. 🔧 Hướng kỹ thuật chung

### 4.1 Update/Migration Infrastructure
**Problem:** Hermes (#123005 venv lock), OpenClaw (#157167 glibc mismatch), NanoClaw (#3943 extraction fail)

**Pattern:** Update systems chưa handle:
- Environment lock conflicts (venv, PM materialization)
- Dependency binary compatibility (glibc, native addons)
- Rollback atomicity (Hermes preflight stash, OpenClaw blocked rollback)

**Direction:** E2E testing trên real OS (Hermes #124622), version compatibility matrix

### 4.2 Session/Context Management
**Hermes:** provenance tracking (#122964), compression recovery  
**OpenClaw:** context compaction bug (#158587 streaming delta)  
**NullClaw:** archived shard contamination (#1005)

**Trend:** Move from **in-memory state** sang **durable, replayable logs**. OpenClaw ship streaming delta (quadratic wire traffic fix), Hermes thêm `created_source` column.

### 4.3 Security Boundaries
**Zeroclaw:** OIDC stack 6 tháng landing (#11082), session revalidation (#11133)  
**Hermes:** credential pool scoping (#124578), ACP session lifecycle  
**NanoClaw:** Signal key leak (#2520), baileys vuln re-pin (#3941)

**Gap:** Most projects chưa có **unified identity model**. Zeroclaw dẫn đầu với OIDC principals, còn lại dùng ad-hoc session tokens.

### 4.4 Platform Parity (Windows Focus)
**Hermes:** Job Object tree reaping (#123003), gateway lifecycle scoping (#124676)  
**OpenClaw:** Bun child spawn issue (#158447)  
**NanoBot:** `RotatingTextOutput` line endings (#5925), cron timezone (#5922)

**Pattern:** Unix-first design đụng Windows edge cases (process lifecycle, path resolution, line endings). Cần **platform abstraction layer** thay vì ad-hoc fixes.

### 4.5 MCP/Tool Ecosystem
**NanoBot:** tool discovery pagination (#5916)  
**Zeroclaw:** browser/search alias semantic loss (#11189)  
**NanoClaw:** scheduled lean tasks (#3932), provider wrapper seam (#3925)

**Trend:** MCP server proliferation → cần **lifecycle management** (discovery, restart, resource limits). NanoClaw's seam approach (wrapper hooks) giảm core edits.

---

## 5. 🔍 Điểm khác biệt

### 5.1 Chiến lược phát triển

| Dự án | Focus | Trade-off |
|-------|-------|-----------|
| **Hermes** | Enterprise DX (PM, SSH, Desktop) | Complexity → update fragility |
| **OpenClaw** | Channel breadth (Slack/WhatsApp/Feishu) | Integration surface → delivery bugs |
| **Zeroclaw** | Security foundation (OIDC, RPC split) | Long refactor cycles (6mo stack) |
| **NanoClaw** | Extensibility (seams, self-edit) | Experimental → unstable |
| **NanoBot** | Edge case coverage (11 fixes in 1 day) | Low-level polish, no big features |

### 5.2 Cộng đồng

**Hermes & OpenClaw:** Active bug reporting với repro steps, multi-platform testing feedback  
**Zeroclaw:** Contributor calls steering decisions (OIDC merge consolidation)  
**NanoClaw:** Core team batch-submit, operator feedback (update process, security)  
**NanoBot/PicoClaw/NullClaw/IronClaw:** Silent – zero comments/reactions

**Insight:** Community health tỉ lệ thuận với adoption scale. Tier 3/4 projects thiếu feedback loops.

### 5.3 Tính năng đặc trưng

**Hermes unique:**
- SSH backend support
- PM workspace materialization cho managed installs
- Desktop/TUI dual UI

**OpenClaw unique:**
- Channel adapter breadth (Telegram, Slack Socket Mode, WhatsApp, Feishu)
- Memory retention policies (#114612 chunks + embeddings)

**Zeroclaw unique:**
- OIDC principals (PKCE, retirement)
- RPC gateway split architecture
- Antigravity CLI tool (#11076 Google over Gemini)

**NanoClaw unique:**
- Self-edit workflow (#3937 agent propose, admin approve, auto-revert)
- Scheduled flows (#3933 graph pre-task scripts)
- Collapsible cards (#3927 logs/traces không flood)

---

## 6. 📈 Mức độ trưởng thành cộng đồng

### Tier 1: Industrial (Hermes, OpenClaw)
✅ Active reporting với repro  
✅ Multi-platform testing volunteers  
✅ Detailed pain point documentation  
❌ Trust erosion từ update regressions  
❌ User frustration visible ("regret upgrading")

**Maturity score:** 7/10 – Large user base nhưng stability crisis test community patience

### Tier 2: Developer-focused (Zeroclaw, NanoClaw)
✅ Technical contributors (security reviews, architecture PRs)  
✅ Decision-making processes (contributor calls, RFC tracking)  
⚠️ Narrow audience (operators, not end-users)  
❌ Limited external engagement

**Maturity score:** 6/10 – Sophisticated dev community, chưa có broad adoption

### Tier 3: Maintenance (NanoBot, QwenPaw, PicoClaw)
⚠️ Sporadic contributions  
⚠️ Self-service fixes (users fix own bugs)  
❌ Zero community discussion  
❌ No visible roadmap

**Maturity score:** 3/10 – Functional nhưng thiếu momentum

### Tier 4: Dormant (NullClaw, IronClaw)
❌ No user interaction  
❌ PR backlog (3+ months)  
❌ No activity signals

**Maturity score:** 1/10 – Zombie projects hoặc internal-only

---

## 7. 🔮 Tín hiệu xu hướng

### 7.1 Consolidation Wave (3-6 tháng)
**Signal:** Hermes và OpenClaw stability crisis, multiple small projects dormant

**Prediction:** Ecosystem sẽ consolidate quanh 2-3 winners. Tier 3/4 projects merge hoặc archive. Users migrate về platforms có:
- Reliable update process
- Multi-platform parity
- Active support

**Winners:** Projects với **enterprise backing** (managed installs, SSH, security reviews)

### 7.2 Standardization Pressure
**Signal:** MCP ecosystem fragmentation, session state incompatibility, auth model divergence

**Prediction:** Industry sẽ yêu cầu:
- **MCP 2.0 spec** với lifecycle/discovery standards
- **Session portability** (export/import across platforms)
- **Identity federation** (OIDC adoption rộng rãi)

**Early mover advantage:** Zeroclaw với OIDC foundation

### 7.3 Platform Lock-in
**Signal:** Desktop apps (Hermes), channel adapters (OpenClaw), self-hosting (NanoClaw)

**Trend:** AI agents moving từ **generic chatbots** sang **platform-specific integrations**. Winner sẽ own:
- **Desktop:** native app UX (Hermes lead)
- **Enterprise:** SSO + managed deploys (Hermes/Zeroclaw)
- **Messaging:** WhatsApp/Slack/Teams (OpenClaw lead)
- **Developer:** self-hosted + extensible (NanoClaw approach)

### 7.4 Operational Maturity Focus
**Signal:** Update failures, resource leaks, state bugs dominate issue trackers

**Shift:** Feature velocity giảm, **stability becomes selling point**. Users sẽ chọn platform dựa vào:
- Zero-downtime updates
- Rollback guarantees
- Resource bounds (memory/disk)
- Observability (traces, metrics)

**Gap:** Không project nào có **production-grade ops** yet. First mover wins enterprise.

### 7.5 Extensibility vs Batteries-included
**Divergence:**
- **NanoClaw direction:** Seams + self-edit → fork-friendly, plugin ecosystem
- **Hermes/OpenClaw direction:** Integrated PM + channels → monolithic, curated

**Prediction:** Market sẽ split:
- **Enterprise:** chọn batteries-included (ít maintenance, vendor support)
- **Developers:** chọn extensible (customize workflows, self-host)

Không có "one size fits all" winner.

---

## 🎬 Kết luận

**Hermes Agent vị thế mạnh** về scale và enterprise adoption, nhưng **update crisis là existential risk**. Community trust dễ mất khó lấy lại.

**OpenClaw** đối thủ chính, có cùng vấn đề (9.5/9.6 regression) + critical leak. Cả hai cần **stability freeze ngay**.

**Zeroclaw** long-term threat với security foundation + architecture refactor, nhưng slow velocity.

**Survival strategy cho Hermes:**
1. **Immediate:** Fix update process (rollback, preflight checks, E2E tests)
2. **3 months:** Platform parity (Windows lifecycle, cross-platform testing)
3. **6 months:** Operations hardening (observability, resource bounds, zero-downtime)
4. **12 months:** Extensibility story (compete với NanoClaw's seam approach)

**Ecosystem trend:** Consolidation sắp tới. Chỉ projects với **reliable ops + clear niche** survive. Feature velocity không còn competitive advantage.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-09-27

## 1. Tóm tắt

Update 2026.9.6 gây lỗi rollback và overload write. Team đang xử lý crisis: native leak, context compaction bug, concurrent lane duplicate. Community báo nhiều crash vs update failure.

## 2. Releases

Không có release mới hôm nay.

## 3. Tiến độ dự án

**Critical work:**

- #158587: stream append delta thay vì full snapshot mỗi turn - giảm quadratic wire traffic
- #156634: fix queued reply config identity divergence  
- #155763: stable scoped reads khi concurrent activity
- #158632: memory_search snake_case param từ tool_call bị reject

**Update infrastructure fixes:**

- #158447: update spawns 8,462 config-read children trên Bun - identify child bằng env không phải import query
- #157167: update snapshot fails Ubuntu 20.04 - addon cần GLIBC_2.33 nhưng error ẩn
- #157319: 9.5→9.6 failed verify - state migrated, rollback blocked + codex stale app-server

**Channel delivery:**

- #155840: Slack Socket Mode không connect với HTTPS_PROXY - undici 8 dispatcher pass vào undici 7 WebSocket
- #153453: WhatsApp replies đợi recovery khi registry switch adapter
- #147886: Feishu reject documented markdown.tables option

## 4. Điểm nổi bật cộng đồng

**Top engagement (40+ comments):**

#153257 [P0]: 2026.9.5 biến stable env thành 8h recovery session
- 41 comments, opened 2026-09-19
- User gặp crash-loop, session state loss
- Multiple users confirm similar experience

**Lane/concurrency issues:**

#111897 [20 comments]: concurrent runs cùng session lane deliver duplicate replies under load
#153859 [6 comments]: single ACP sessions_spawn trigger 2 wake events

**Data growth:**

#114612 [16 comments]: memory_index_chunks + memory_embedding_cache không có retention - fill disk
#112638 [5 comments]: session.maintenance enforce mode không bound store - thread/channel entries exempt

## 5. Ổn định & Bugs

**P0 crashes/leaks:**

- #155191: native leak 1GB/30s trong 2026.9.5 - RSS jump nhưng V8 heap stable
- #157344: 2026.9.6 sustain 100-160 MB/s disk write - survive restart + reboot
- #153899: gateway drain đợi full TimeoutStopSec - health refresh + workboard timer fire vào closed resources

**P0 update failures:**

- #153333, #155243, #153769: database-schema-preflight, global-install-failed, doctor-failed
- #157167: snapshot fails helper-unavailable - glibc requirement ẩn

**P1 session state:**

- #114234: usage-cost refresh lock không release sau restart với reused PID
- #155018: overload same-model retry enter continuation mode không có usable persisted transcript
- #153417: subagent completion announce retry vô tận khi requester yield no visible reply

**P1 message loss:**

- #112799: subagent tool-call arguments không transmit tới model
- #109634: Telegram long-polling im lặng stop recover sau health-monitor restart
- #107244: WhatsApp group messages không reach inbound handling (LID groups?)

## 6. Yêu cầu tính năng

**#111943 [5 comments]**: configurable model + reasoning effort cho dreaming/commitments/self-learning/active-memory
**#139188 [5 comments]**: expose provider subscription usage windows qua prometheus metrics
**#112473**: thêm built-in `productivity` tool profile - workspace files + web research + memory + goals
**#76827**: per-label retention cho session cleanup - keep last N per cron job type
**#119135**: smart model tiering - route simple requests tới cheaper model

## 7. Phản hồi người dùng

**Pain points:**

- Update reliability sụt - nhiều users báo failed migrations, rollback không hoạt động
- Native resource consumption spike ở 9.5/9.6 - leak + disk write vô cớ
- WhatsApp groups không hoạt động ổn định - messages never reach handler
- Plugin ecosystem breaking changes không có shim - #153604 config.loadConfig removal
- Error messages không actionable - #112978 auth fail show generic "try again"

**Stability requests:**

Multiple users yêu cầu freeze feature, focus stability. #153257 author viết "I genuinely regret upgrading".

## 8. Backlog & Roadmap

**Infra priorities (inferred từ PR activity):**

1. Update stability - rollback guarantees, migration safety, resource monitoring
2. Channel delivery reliability - WhatsApp group support, Slack proxy compatibility
3. Memory subsystem bounds - retention policies, size limits
4. Context compaction correctness - #158587 streaming delta landed
5. Session lifecycle correctness - concurrent lane safety, cleanup accuracy

**Decision-model umbrella:** #155131 track SDK + agent tools + provider integrations

**Security review queue:** #126224 model catalog mismatch recovery marked security-review-required

---

**Nhận xét:** Dự án trong update crisis. 9.5/9.6 introduce native leak + write overload. Team đang ship critical fixes nhưng update infrastructure cần overhaul - nhiều users stuck failed migrations. Community trust bị ảnh hưởng.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo hoạt động NanoBot - 27/09/2026

## 🎯 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa lỗi hệ thống nội bộ với 11 PR fix đồng loạt từ contributor @2gg-bit, bao gồm xử lý encoding, timezone, và validation. Thêm 2 PR tính năng cho Feishu bot-to-bot messaging và Linear workspace management.

## 📦 Releases

Không có.

## 🚀 Tiến độ dự án

### PR đã đóng
- **#5916** (MCP): Fix phân trang tool discovery. Server MCP trả nhiều page nhưng nanobot chỉ đăng ký page đầu, làm mất tool.
- **#5919** (Linear): Quản lý quyền truy cập workspace từ WebUI thay vì pairing code thủ công cho từng user.

### PR đang mở (11 fix từ @2gg-bit)

**Xử lý encoding & data integrity:**
- **#5928**: Email body charset không rõ → crash polling loop. Fix: fallback UTF-8 + replacement chars.
- **#5923**: Base64 image có non-ASCII char → ValueError bypass error handler → MCP drop toàn bộ response. Fix: catch `ValueError` thay vì chỉ `binascii.Error`.
- **#5920**: Truncate token cắt giữa Unicode char → xuất hiện `�`. Fix: bỏ incomplete UTF-8 bytes ở tail trước decode.
- **#5926**: URL scraping phân biệt case wrong → `/API` vs `/api` bị block nhầm. Fix: giữ nguyên case, so sánh exact.
- **#5925**: Windows `write_file` convert `\r\n` thành `\r\r\n`. Fix: dùng `newline=""`.

**Type safety & validation:**
- **#5927**: Notification evaluator nhận `should_notify="false"` (string) → `bool("false")` = True → gửi thông báo sai. Fix: validate boolean strict.
- **#5918**: JSON Schema `type: ["integer", "string"]` bị coerce nhầm `"00123"` thành `123` hoặc reject `"doc-A"`. Fix: preserve union type valid values.

**System & scheduling:**
- **#5922**: Cron dùng offset thay vì timezone rule → sai giờ khi qua DST boundary. Fix: dùng `ZoneInfo` với IANA timezone.
- **#5921**: `RotatingTextOutput.close()` sau đó `write()` vẫn mở lại file. Fix: check closed state trước `_ensure_open()`.

**Channel:**
- **#5930** (Feishu): Cho phép bot-to-bot message trong group với allowlist + hop limit. Feishu đẩy event nhưng channel drop mặc định.
- **#5914** (Napcat): Image `file_size` non-numeric → skip message. Fix: chỉ check size khi parse được int.

## 🔥 Điểm nổi bật cộng đồng

- **#5908** (4 bình luận): Yêu cầu hiển thị live tokens/sec khi streaming reply trong WebUI. User muốn biết model có stall không.
- **#5903** (3 bình luận): Feishu gửi internal checkpoint marker "Continue the active task..." cho user sau idle compaction. Message có `_hidden: true` nhưng vẫn leak.

## 🐛 Ổn định & Bugs

**Bug quan trọng:**
- **#5924**: Agent loop vô hạn với sudo. Sudo hết hạn sau 1 turn, agent retry liên tục. Reach max iteration xong vẫn obsessed với command đó, không recover được.
- **#5903**: Hidden message leak ra user ở Feishu channel.

**Fix hàng loạt:**
Batch 11 PR từ @2gg-bit cover edge case trong encoding, validation, scheduling. Pattern: catch exception sai hoặc thiếu type check → data loss/wrong behavior.

## ✨ Yêu cầu tính năng

- **#5908**: Live tokens/sec indicator khi streaming.
- **#5929 + #5930**: Feishu bot-to-bot messaging với allowlist + hop limit, tránh loop.
- **#5919**: Linear workspace member management từ WebUI thay vì manual pairing.

## 💬 Phản hồi người dùng

- Sudo workflow broken (#5924): Agent không recover được sau lỗi auth, trở nên unusable.
- Feishu UX issue (#5903): Internal message hiện ra gây confuse.
- Monitoring demand (#5908): User cần visibility vào streaming performance.

## 📋 Backlog & Roadmap

Không có thông tin roadmap rõ ràng. Dựa vào hoạt động hiện tại:
- Ổn định channel integrations (Feishu, Napcat)
- Tăng cường type safety và edge case handling
- Cải thiện WebUI monitoring capability
- Fix sudo workflow (#5924 chưa có PR)

---

**Xu hướng:** Dự án đang trong giai đoạn hardening với focus vào edge case và data integrity. Contributor @2gg-bit đóng góp hàng loạt fix chi tiết. Tính năng mới ít, ưu tiên stability.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-09-27

## 1. Tóm tắt hôm nay

Ngày tập trung vào security & gateway refactor lớn: OIDC authentication landing (#11082 merged), session revalidation (#11133 merged), nhiều PR về RPC parity chuẩn bị tách gateway khỏi core. Bug fixes cho browser tool aliases (#11189 merged) và git attr-source security hole (#10966). ZeroCode root selection từ #10826 follow-up hoàn tất.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**Security & Identity (8289 stack landing)**
- ✅ #11082 merged: OIDC principals, PKCE enrollment, retirement của Nevis/IAM policy system. Stack 6 tháng landing làm 1 PR sau contributor call. Breaking change lớn.
- ✅ #11133 merged: session reuse revalidation - đóng hole admin privilege escalation qua forwarded environment.
- 🟡 #11191 open: dọn `[security.nevis]` table khỏi incremental saves (follow-up #11082).
- 🟡 #10321 stack: browser PKCE & enrollment API (stage 5) chờ merge.
- 🟡 #10275 stack: refactor retirement (stage 6) chờ merge.

**Gateway/RPC split (#11001 roadmap)**
- 🟡 #11186: `zeroclaw-rpc-client` crate & in-process gateway seam.
- 🟡 #11182: P6 core parity - workspace/catalog/canvas/pairing/channels/system methods.
- 🟡 #11176: P4 parity - cron/memory/skills/personality/quickstart. Đóng cron pre-approval bypass.
- 🟡 #11172: HTTP config routes lên RPC.
- 🟡 #11171: local transport bounded + chunked upload (8 MiB frame limit).
- 🟡 #11167: subscription hub bounded & replayable.
- 🟡 #11174 & #11187: `RuntimeCapabilities` constructors, DefaultCapabilities application layer.
- 🟡 #11185: session-owned turn với viewer attachment.

Pattern: tách gateway thành RPC client, core serve methods, chuẩn bị v0.9.0.

**Tools & Agent Loop**
- ✅ #11189 merged: browser/search tool alias fix - `browser_open`, `web_search` không bị đẩy vào shell.
- 🟡 #11106: AnySearch response validation (follow-up #10356).
- 🟡 #11076: `agy_cli` tool cho Antigravity CLI (Google thay Gemini CLI).
- 🟡 #10480: image request rejection recovery với bounded replay cache.
- 🟡 #10391: delegate filesystem tools respect target workspace.
- 🟡 #9746: per-agent scoping cho sessions_*/discord_search tools.

**ZeroCode**
- ✅ #11044 merged: explicit session roots, preserve resumed roots (#10826 follow-up).
- 🟡 #10553: add selected text to chat.
- 🟡 #9453: estimate context usage khi provider omit token counts.

**Infra**
- 🟡 #11113: sync RPC/SOP/plugin CLI fixtures.
- 🟡 #11080: Hailo connect failure test platform-independent.

## 4. Điểm nổi bật cộng đồng

- #11082 (15 commits, 6k+ lines): OIDC stack 6 tháng landing 1 PR, breaking change lớn. Community call quyết định merge consolidate thay vì 8 PRs riêng.
- #8692: Maintainer decision queue tracker - central triage cho RFCs/design issues (15 comments).
- #10966 closed: git `--attr-source` security hole - global option scanner thiếu value consumption, cho phép hide mutating subcommand (S0 severity).

## 5. Ổn định & Bugs

**Đã fix**
- ✅ #11189: browser/search tool semantic loss - alias resolver không preserve tool identity, arguments chảy vào shell.
- ✅ #11133: session reuse privilege escalation - forwarded environment không revalidate ownership/admin status.
- ✅ #10966: git attr-source command injection hole.

**Đang fix**
- 🟡 #11106: AnySearch malformed response rendering thành success output.
- 🟡 #10480: image request HTTP 400 crash agent loop - retry with novel images omitted.
- 🟡 #10843: Telegram reactions report fake success, không call API.

## 6. Yêu cầu tính năng

- #11076: `agy_cli` tool - Gemini CLI deprecated, migrate sang Antigravity CLI.
- #10553: ZeroCode selected text copy/add to chat.
- #11039: You.com MCP search server example docs.
- #10812 parking-lot: WhatsApp PDF thumbnails - populate `jpegThumbnail`/`pageCount`.

## 7. Phản hồi người dùng

- OIDC stack merge decision positive - consolidate 8 PRs tránh rebase hell.
- ZeroCode root selection fix (#11044) address user confusion về launch directory vs workspace.
- Git security hole (#10966) discovered internally, patched trước khi exploit.

## 8. Backlog & Roadmap

**v0.9.0 Gateway Split (#11001)**
- Phase đang active: RPC parity (P4/P6), client crate (#11186), subscription hub.
- Tiếp theo: migrate dashboard sang RPC client, deprecate HTTP routes.

**Security hardening**
- OIDC foundation landed, next: per-agent tool scoping (#9746), delegate workspace bounds (#10391).

**Agent loop stability**
- Image recovery (#10480), context estimation (#9453), tool semantic preservation.

**Documentation debt**
- #11190: restore private memory plane docs lost in #11082 merge.
- #11114: move multi-agent setup guide vào Agents section.

---

**Trend**: infra refactor tập trung (gateway split RPC, OIDC landing). Bug fixes security-focused. Community call steering consolidation strategy.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-09-27

## 📊 Tóm tắt hôm nay

Hoạt động nhẹ với 1 issue bug mới về QQ bot API, 2 PR đóng (tự động PR và hỗ trợ attachment QQ), 1 PR về performance UI vẫn mở.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**PR đóng:**
- **#1349**: Merged sau 6+ tháng - QQ channel giờ parse/reply được emoji, voice, image, video, file. Upload local attachment trước khi gửi. Fallback từ Markdown sang plain text.
- **#3310**: Auto PR từ picoclanker bot - không rõ nội dung nhưng đã merge.

**PR mở:**
- **#3347**: Fix lag UI khi chat dài. Tác giả test trên Brave desktop + mobile, không lag nữa. Vẫn chờ review.

## 💬 Điểm nổi bật cộng đồng

Issue #3394 mới nhất - user @qinglt báo QQ bot API đã update nhưng chat channel interface chưa theo kịp. Không có comment hay reaction nào → chưa có sự chú ý.

## 🐛 Ổn định & Bugs

- **UI lag** (#3347): Fix sẵn sàng nhưng chưa merge. User tự analyze và fix bằng AI dù không phải TS dev.
- **QQ API mismatch** (#3394): Bot API mới rồi nhưng chat channel vẫn dùng version cũ. Cần sync.

## ✨ Yêu cầu tính năng

Không có feature request mới. Issue #3394 là bug fix request, không phải tính năng.

## 👥 Phản hồi người dùng

Minimal engagement - 0 comment, 0 reaction trên tất cả item. Cộng đồng im lặng hoặc nhỏ. PR #3347 cho thấy user tự fix vấn đề của mình thay vì chờ maintainer.

## 🗺️ Backlog & Roadmap

Không có thông tin roadmap trong data. Dựa vào PR:
- QQ channel integration đang được cải thiện dần (attachment support vừa merge)
- Performance/UX fixes đang pending
- Bot automation (picoclanker) đang được thử nghiệm

---

**Nhận xét:** Dự án ở giai đoạn maintenance. Merge feature lớn (QQ attachments) sau thời gian dài. Community không sôi nổi. Cần attention cho UI performance fix và QQ API sync.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw 2026-09-27

## 🎯 Tóm tắt hôm nay

Dự án đóng loạt PR cũ (merge hoặc cleanup), đồng thời mở burst 18 PR mới từ @barnuri trong 1 ngày, tập trung vào 3 hướng: **scheduled task enhancements** (lean contexts, flows, error reporting), **skill seams** (provider wrapper, delivery hooks, task fields), và **operational tooling** (self-edit, upstream contribution, voice replies). 4 issue mới từ @bmultini và @participo báo lỗi update process và security leak.

## 📦 Releases

Không có release trong 24h qua.

## 🚧 Tiến độ dự án

### Batch PR từ @barnuri (18 PR mới, 2026-09-26)

**Scheduled tasks:**
- **#3932** `/add-lean-tasks`: chạy task với minimal context (không Claude Code preset, không MCP servers) → local/small model
- **#3933** `/add-flows`: graph-shaped pre-task scripts thay Bash
- **#3935** `/add-error-reports`: báo host crash/task failure vào chat
- **#3929** `/add-scheduled-update`: chạy `/update-nanoclaw` unattended từ host

**Seams cho extension không cần edit core:**
- **#3925** provider wrapper seam: retry failed query trên backup model/credentials
- **#3924** delivery adapter wrapper: reroute outbound khi channel down
- **#3921** custom task fields: thêm fields vào scheduled task không edit `tasks.ts`
- **#3931** `minimalContext` provider option (refactor tiền đề cho lean-tasks)
- **#3926** `postCard` hook: channel render collapsible `send_card` (tiền đề cho #3940)

**Agent tools:**
- **#3927** `send_card` nhận collapsible sections → logs/traces không flood chat
- **#3940** Slack render collapsible sections như Block Kit containers (phụ thuộc #3926, #3927)
- **#3939** `/add-turn-traces`: per-turn agent trace vào DB, không gửi external backend

**Operational:**
- **#3937** `/add-repo-self-edit`: agent đề xuất edit NanoClaw source, admin approve, auto-revert nếu build fail
- **#3928** `/contribute-upstream`: fork đẩy feature về upstream như seams/skills thay edit files
- **#3938** `/add-voice-replies`: agent reply bằng audio (offline TTS mặc định)

**Infrastructure fixes:**
- **#3923** Discord Gateway qua HTTPS proxy (env `HTTP_PROXY`)
- **#3922** agent container stderr → per-session log file (không mất khi `--rm`)
- **#3930** OpenCode resolve config/key/env từ 1 environment (không inconsistent)
- **#3936** Telegram "Working on it…" progress message cho long turns

Merged PRs:
- **#3895** (merged): `send_card` url pattern không dùng `\s` `\S` → llama.cpp grammar không reject
- **#3920** (merged): setup failure-assist agent bị restrict trên live install (không bash/edit free)

Closed PRs:
- **#3025**, **#2949**, **#226**, **#3896** đóng (lý do chưa rõ trong data)

### Issues mới (4, tất cả từ @bmultini và @participo)

- **#3943** (2026-09-26): `/update-nanoclaw` crash với `MODULE_NOT_FOUND`, thiếu `setup/gateways/` và npm deps (regression sau #3750)
- **#3942** (2026-09-26): skill refresh trong `/update-nanoclaw validate` ghi đè `pnpm-lock.yaml`, xóa `integrity` hash của git-hosted deps
- **#3941** (2026-09-26): `channels` branch pin `@whiskeysockets/baileys@7.0.0-rc.9` (có GHSA-qvv5-jq5g-4cgg message spoofing vuln), mỗi lần `/update-nanoclaw` lại re-pin
- **#2520** (2026-05-17, updated 2026-09-26): `logs/nanoclaw.log` dump Signal session keys (`privKey`, `rootKey`, `chainKey` từ `SessionEntry`)

## ⭐ Điểm nổi bật cộng đồng

Không có PR/issue nào có reactions hoặc nhiều comments trong data → hoạt động chủ yếu từ core team (@barnuri batch-submit). Issue update process (#3943, #3942) và security (#3941, #2520) là concerns từ operators.

## 🐛 Ổn định & Bugs

**Update process broken:**
- #3943: extraction không cung cấp files cần cho `prepare` script
- #3942: `pnpm install` trong validate rewrites lockfile → loss of integrity hashes

**Security:**
- #3941: baileys vuln tái xuất mỗi lần update
- #2520: Signal keys leak vào log (1 comment, chưa fix)

**Fixed:**
- #3895: llama.cpp grammar break do `\s` regex
- #3920: setup agent có full bash/edit trên live install

## 🎁 Yêu cầu tính năng

Batch PR từ @barnuri = feature requests implemented → scheduled task improvements (lean contexts, flows, error reporting), extensibility seams (provider/delivery/task wrappers), và operational tools (self-edit, voice replies, turn traces).

## 💬 Phản hồi người dùng

@bmultini báo chi tiết về update process bugs → regression testing không cover extraction + prepare flow.

@participo flagged Signal key leak từ tháng 5 (1 comment, chưa addressed).

## 🗺️ Backlog & Roadmap

**Stacked PRs chờ merge:**
- #3940 (Slack collapsible) phụ thuộc #3926, #3927
- #3944 (typesafe-tool + OpenRouter Jev) stacked trên #3848

**Priorities suy ra:**
1. Fix update process (#3943, #3942) → blocker cho deployments
2. Upgrade baileys hoặc patch vuln (#3941)
3. Seal Signal key leak (#2520)
4. Merge seam PRs → unlock extension pattern
5. Lean tasks + flows → cheaper scheduled operations

**Pattern shift:** dự án chuyển từ feature additions → extensibility seams + operational tooling → chuẩn bị cho fork-friendly architecture và self-service ops.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw – 2026-09-27

## 1. Tóm tắt hôm nay

Không có hoạt động mới ngày 27/9. Dữ liệu cho thấy 5 PR được cập nhật vào 26/9, tập trung vào bug fixes: memory leak, provider error logging, Discord bot loop, CLI input handling. Không có issue, release, hay commit mới.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**5 PR đang mở**, cả 5 từ @vernonstinebaker:

**Bug fixes chính:**
- **#1005** (memory): Archived conversation shards xuất hiện trong live turns, làm model coi user message hiện tại như history cũ. Session search apply `LIMIT` trước filter → archive rows ẩn session hiện tại.
- **#1004** (providers): Non-2xx response từ provider bị free body trước khi log → không thấy lý do lỗi (VD: model không support tools). Thêm log scrubbed body.
- **#1011** (agent): Parsed tool call bị leak khi allocation sau đó fail. `parseXmlToolCalls` không guard append, bỏ qua cleanup `name`, `arguments`, `tool_call_id`.
- **#1010** (discord): Bot reply chính mình với `allow_bots = true` → infinite loop khi reply có @mention.
- **#970** (cli): Arrow keys in agent REPL in ra control chars thay vì move cursor. Thêm allocation-free line editor, POSIX raw-mode.

**Xu hướng:** Sprint cleanup bugs memory, integration, DX. PR cũ nhất (#970) từ 6/2026 vẫn chưa merge → tốc độ review chậm hoặc backlog.

## 4. Điểm nổi bật cộng đồng

Không có tương tác (0 👍, undefined comments trên tất cả PR). Không có issue user report.

## 5. Ổn định & Bugs

**Critical:**
- Memory leak (#1011): Tool call parsing fail → resource không được free.
- Discord infinite loop (#1010): Bot tự trigger trong config `allow_bots = true`.
- Memory contamination (#1005): Archived data bleeding vào live context → model confusion.

**Medium:**
- Provider error opacity (#1004): Không log body lỗi → khó debug.
- CLI UX (#970): Arrow keys không hoạt động.

Cả 5 bugs đều có fix code trong PR, chờ merge.

## 6. Yêu cầu tính năng

Không có feature request. Tất cả PR là bug fix.

## 7. Phản hồi người dùng

Không có comment, reaction, hay issue từ user. Repository có vẻ internal hoặc early-stage.

## 8. Backlog & Roadmap

Không có thông tin roadmap public. PR #970 mở 3 tháng chưa merge → có thể tồn đọng review capacity. Priority hiện tại: stability (memory, integration bugs) trước features.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-09-27

## 1. 🎯 Tóm tắt hôm nay

Hoạt động tối thiểu. Một feature request mới về tích hợp NEARA launchpad cho agent giao dịch token. Một PR tự động cập nhật knowledge graph từ bot CI, đang chờ review từ 29/08.

## 2. 📦 Releases

Không có.

## 3. 🔨 Tiến độ dự án

**PR đang mở:**
- #7988: Bot CI refresh codebase knowledge graph định kỳ. Size XS, risk thấp. Mở 29 ngày, chưa merge - có thể bị bỏ quên hoặc chờ review chu kỳ tiếp.

**Issue mới:**
- #8112: Đề xuất extension MCP cho NEARA launchpad. Agent hiện không thể tương tác với token launchpad trên NEAR (list coin, quote, launch, trade). NEARA dùng mô hình 1B supply cố định với liquidity pool khóa trên Rhea DCL.

**Xu hướng:** 
Mở rộng khả năng agent tương tác DeFi. Tập trung vào NEAR ecosystem tooling.

## 4. 💬 Điểm nổi bật cộng đồng

Không có tương tác nào. Issue #8112 có 0 comment, 0 reaction. PR #7988 cũng không có engagement.

Dự án thiếu momentum cộng đồng hoặc team nhỏ, closed communication.

## 5. 🐛 Ổn định & Bugs

Không có bug report trong 24h qua.

## 6. ✨ Yêu cầu tính năng

**#8112 - NEARA MCP extension:**
- Mục tiêu: agent giao dịch token trên NEARA launchpad
- Scope: hosted-MCP keyless (không cần user quản lý key)
- Use case: list coin mới, check quote, launch token, trade
- Context: NEARA = launchpad trên NEAR mainnet, fixed 1B supply, concentrated liquidity trên Rhea DCL

Đề xuất hợp lý nếu IronClaw hướng tới agent tự động hóa DeFi workflows.

## 7. 📣 Phản hồi người dùng

Không có feedback trong khoảng thời gian quan sát.

## 8. 🗺️ Backlog & Roadmap

Từ data hiện tại:
- Backlog: PR #7988 cần review/merge
- Near-term: Xem xét implement #8112 nếu align với roadmap agent capabilities
- Direction: Mở rộng agent tools cho NEAR DeFi ecosystem

Không có thông tin public roadmap rõ ràng từ data này.

---

**Nhận xét:** Dự án hoạt động rất trầm. Một ngày chỉ có một feature request, không có code change mới. PR từ bot CI nằm không 29 ngày. Community engagement gần như zero. Hoặc team đang focus internal, hoặc project ở giai đoạn maintenance thấp.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo Hệ sinh thái AI Agent - QwenPaw
**Ngày 2026-09-27**

## 1. Tóm tắt hôm nay

Hoạt động nhẹ. 1 issue mới về bug UI (#7994), 2 PR fix nhỏ đang review (i18n + markdown parsing), 1 PR lớn về UX settings đang merge. Không có release mới.

## 2. Releases

Không có release trong 24h qua.

## 3. Tiến độ dự án

### PRs đáng chú ý:

**#7956** - UX overhaul console settings (đang mở, update 26/9):
- Thống nhất design language theo `design.md`
- Fix workspace picker overflow
- Loại bỏ flash screen khi chuyển conversation
- Refactor controls thành reusable components
- Tác giả: @rayrayraykk

**#7993** - Fix i18n keys thiếu (mở 26/9):
- 2 error messages không có trong locale files
- `common.operationFailed`: 6 chỗ trong `MailAccessControlDrawer.tsx`, 1 trong `Inbox/index.tsx`
- `voiceTranscription.loadFaile`: render key thay vì message
- Tác giả: @Bruce-Yii

**#7992** - Fix markdown table parser (mở 26/9):
- WeChat channel nhận nhầm prose có `|` là markdown table
- `format_markdown_tables()` inject delimiter row không cần thiết
- VD: "Use a || b" → bị format thành table
- Tác giả: @Bruce-Yii

### Xu hướng:
Console UI polish phase. Team tập trung vào quality-of-life fixes: i18n coverage, markdown rendering edge cases, settings UX. Không có feature lớn mới.

## 4. Điểm nổi bật cộng đồng

**#7804** - Management issue (đóng 26/9):
- Generic issue không rõ yêu cầu
- Check tất cả components affected
- Đóng nhanh sau 2 comment → noise issue

**#4963** - Cron direct execution (mở từ 06/06, update 26/9):
- 4 comments, đang active
- User cần chạy shell/script trực tiếp không qua AI agent
- Current types: `text` (fixed message), `agent` (AI prompt)
- Use case: pure automation tasks không cần AI processing

## 5. Ổn định & Bugs

### #7994 - Context display bugs (đóng trong ngày):
User @xiaohushi512 report 2 bugs Windows desktop v2.2.3b:
1. Context indicator không update khi switch conversation → phải restart app
2. Compression không hoạt động dù threshold = 0.5 và context 91k/131k
Label: `bug`, `Close-and-review-later` → backlog

### #7991 - TaskTracker zombie entries (mở 26/9):
Dashboard show "2 running tasks", API `/api/chats` chỉ return 1 chat `status="running"`. 
- `task_tracker.get_global_status()` vs per-chat counter không đồng bộ
- `_runs` dict giữ zombie entries làm inflate counter
- Tác giả: @yylxdzz (1 comment)

## 6. Yêu cầu tính năng

**#4963** - Cron script execution:
- Từ 04/06, vẫn mở
- Community muốn task type thứ 3: chạy shell command scheduled không qua AI
- Use case: backup, cleanup, monitoring tasks
- 4 comments → có traction nhưng chưa implement

## 7. Phản hồi người dùng

**Windows desktop v2.2.3b** (#7994):
- Context UI state management không reliable
- Compression logic không trigger đúng threshold
- User experience bị impact bởi state bugs

**WeChat channel** (#7992):
- Markdown parser quá aggressive, nhận nhầm prose
- Edge case handling cần improve

**i18n coverage** (#7993):
- 7 call sites không có translation keys
- Render raw key thay vì user-facing message

## 8. Backlog & Roadmap

**Đang trong pipeline:**
- Console settings UX unification (#7956)
- i18n completeness pass (#7993)
- Markdown rendering robustness (#7992)

**Backlog:**
- Context state management rewrite (từ #7994)
- TaskTracker counter sync fix (#7991)
- Cron script execution type (từ #4963 - 3+ tháng)

**Xu hướng:**
Quality phase. Team đang fix accumulated tech debt: UI state bugs, parser edge cases, i18n holes. Feature velocity thấp, focus on stability. Cron enhancement (#4963) đợi 3 tháng chưa prioritize → không phải near-term roadmap.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*