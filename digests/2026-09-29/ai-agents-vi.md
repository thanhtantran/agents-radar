# Bản tin Hệ sinh thái Hermes Agent 2026-09-29

> Issues: 117 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-29 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-29

## 📊 Tóm tắt hôm nay

Dự án đẩy 30 PR mới trong 24h, tập trung sửa lỗi Desktop update, session management và tool reliability. Không có release mới. Cộng đồng phản ánh mạnh về Desktop stability trên Windows và macOS signing issues.

## 🚀 Releases

Không có release mới.

## 🔨 Tiến độ dự án

**PRs quan trọng (mới nhất):**

- **#127240**: Fix gateway restart handoff qua job-surviving owner (Windows update loop)
- **#127239**: Unify cross-window relay cho Browser pop-out control
- **#127238**: Self-heal stale update markers (zombie process detection)
- **#127237**: Fix desktop build freshness pipeline - OS metadata noise breaks incremental builds
- **#127229**: Harden at-rest secrets - browser profiles, media cache, journal đều world-readable
- **#127225**: macOS re-signing với framework entitlements, fix Gatekeeper reject
- **#127209**: Hide console windows trên Windows (7-8 cửa sổ nhấp nháy khi boot)
- **#127208**: Preserve prompt pins qua synthetic turns (goal/heartbeat/resume)
- **#127207**: **[P1 Security]** Redact credentials trong `hermes dump` và `/debug`

**Xu hướng:**

- Desktop update mechanism đang được refactor toàn diện (macOS signing, Windows job lifecycle, freshness tracking)
- Session identity/state management được standardize (#126265 - stable message_uid)
- Security hardening: secrets leakage, permission modes, credential redaction

## 🔥 Điểm nổi bật cộng đồng

**Top issues theo engagement:**

1. **#88858** (10 comments, 👍1): MCP trust gate bị lỗi - `readOnlyHint` snake_case vs camelCase, tools chỉ đọc bị gate như write
2. **#94778** (10 comments): Auto-continue false positive - backend chia sẻ interrupted marker, duplicate turns
3. **#77277** (9 comments): Desktop update loop vô hạn trên Windows - respawning backend block chính nó

**Pain points lặp lại:**

- Windows update reliability (markers, job lifecycle, console windows)
- macOS signing post-update (Gatekeeper, entitlements)
- Session/message identity không stable qua compression/restore
- Desktop boot timeout với remote gateway (transient failures là fatal)

## 🐛 Ổn định & Bugs

**Critical (P0-P1):**

- **#123824**: `Delete File` trên symlink xóa mất file gốc (V4A patch tool)
- **#127182**: Cron jobs im lặng stop khi `croniter` import fail - chỉ có WARNING log
- **#127207**: Credentials leak trong debug outputs

**High-impact (P2, nhiều reports):**

- Desktop update paths: #127198 (timeout 124 là terminal), #124807 (WinError 5 DLL), #98384 (shared-venv abort)
- Session control: #126524 (double-render assistant reply), #107502 (zombie runtime IDs sau profile restart)
- Tool reliability: #124860 (`file_path` vs `path` param mismatch), #126656 (todo_list silent no-op)

**Platform-specific:**

- Windows: console windows, job breakaway, DLL locks, process lifecycle
- macOS: signing entitlements, launchd restart, `__PYVENV_LAUNCHER__` trong update hand-off

## 💡 Yêu cầu tính năng

- **#78207** (meta): "Vox Lockin" campaign - loại bỏ toàn bộ STT/TTS/voice bug class (10 lanes, 38 issues)
- **#110124**: Fast session-only model hop dùng existing state (TUI optimization)
- **#99773**: TUI attention budget + first-paint cleanup (minimize attention cost)
- **#126247**: Password-blind Vault credential injection với CamoFox

## 👥 Phản hồi người dùng

**Trải nghiệm thực tế:**

- Update flow là nguồn friction lớn nhất - nhiều user báo "successful" update nhưng app không thực sự update
- Remote gateway + Desktop combo có nhiều edge cases chưa handle (timeout, token refresh, session routing)
- Multi-profile workflows expose lifecycle bugs (zombie processes, shared markers)
- Cron scheduler "silent failure" mode khiến jobs ngừng hoạt động mà không có alert

**Positive signals:**

- Plugin catalog adoption tăng (issues về remote backend plugin install)
- MCP integration đang được dùng production (vault, tools)
- Desktop stability improvements được notice sau mỗi batch fix

## 📋 Backlog & Roadmap

**Short-term (đang active):**

- Desktop update reliability overhaul (signing, lifecycle, freshness)
- Session/message identity stabilization (#126265)
- Tool parameter validation và error surfaces (#124860, #126656)
- Security audit completion (credentials, permissions, secrets)

**Medium-term (tracking issues open):**

- Vox Lockin campaign (#78207) - systematic voice quality improvements
- TUI interaction cost reduction (#110124, #99773)
- Turn isolation actual implementation (#107924 - hiện chưa engage)

**Technical debt visible:**

- Freshness tracking logic phức tạp, dễ false-positive (#127237, #123308)
- Cross-window state sync (Desktop multi-window)
- Marker-based coordination primitive (update, interrupted turns) cần refactor
- Windows process lifecycle (console subsystem, jobs, breakaway) cần unified model

---

**Insight:** Dự án đang phase "stabilization after growth" - nhiều PRs fix edge cases từ real production usage (multi-profile, remote backends, Windows enterprise environments). Security đang được take seriously (credentials redaction, permission hardening). Update mechanism là critical path hiện tại - nếu users không update được reliably, momentum sẽ drop.

---

## So sánh hệ sinh thái chéo

# Báo cáo So Sánh Hệ Sinh Thái AI Agent - 2026-09-29

## 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent hiện tại đang trong giai đoạn **stability over growth**. Tất cả dự án tập trung vào:
- Fix bugs từ production usage (desktop update, session management, memory leak)
- Hardening security (credentials redaction, permission audit, secret storage)
- Cải thiện UX (font scaling, error messages, documentation)

**Không có** dự án nào ship major feature hôm nay. Tín hiệu: market đang mature, users yêu cầu reliability hơn là innovation.

---

## 📋 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity 24h | Tương tác | Trạng thái |
|-------|--------|-----|----------|-------------|-----------|------------|
| **Hermes Agent** | 117 | 500 | 0 | 30 PR (fix Desktop update loop, security) | Trung bình | Stabilization |
| **OpenClaw** | 135 | 500 | 0 | 30 PR (memory leak critical, update flow) | Cao | Critical fixes |
| **NanoBot** | 8 | 24 | 0 | 10 merged (atomic writes, web_fetch, UTF-8) | Thấp | Quality focus |
| **Zeroclaw** | 2 | 50 | 0 | 30 closed (OIDC milestone done, gateway split) | Rất thấp | Architecture refactor |
| **PicoClaw** | 7 | 10 | 0 | 6 PR reliability fixes | Thấp | **Abandoned** (fork declared) |
| **NanoClaw** | 4 | 33 | 0 | 17 merged (update controller, service detect) | Rất thấp | Internal testing |
| **NullClaw** | 17 | 7 | 1 (v20260929) | 15 issues closed, web search fix | Trung bình | Maintenance release |
| **IronClaw** | 2 | 3 | 0 | CI bot refresh docs, registry UX fix | Rất thấp | Automation |
| **QwenPaw** | 9 | 18 | 0 | 18 PR (context overflow, UX, stability) | Cao | Active polish |

---

## 🎯 Vị thế của Hermes Agent

### Ưu điểm
- **Scale lớn nhất**: 500 PRs, 117 issues active → mature codebase
- **Community engagement tốt**: Issues có 8-10 comments, user reports chi tiết
- **Security-first mindset**: P0/P1 cho credentials leak, permission hardening
- **Cross-platform coverage**: Windows + macOS + remote gateway được test kỹ

### Yếu điểm
- **Desktop update flow fragile**: Windows job lifecycle, macOS signing, freshness tracking đang refactor toàn bộ
- **Session identity instability**: message_uid, compression/restore không stable qua turns
- **Friction cao ở update**: Nhiều users report "successful update" nhưng không thật sự update

### So với các dự án khác
- **OpenClaw**: Issue count tương đương, cùng focus memory leak + update flow, nhưng OpenClaw có SQLite contention fix sớm hơn
- **QwenPaw**: Ít issues hơn nhiều nhưng contributor mới đông (7 first-time trong ngày) → onboarding tốt hơn Hermes
- **Zeroclaw**: Ít drama hơn, OIDC milestone hoàn tất ngay lập tức, architecture refactor có kế hoạch (F-series tasks)

**Kết luận vị thế**: Hermes Agent là **leading project by scale**, nhưng đang struggle với **technical debt từ growth quá nhanh**. Stability improvements nếu ship đúng sẽ strengthen lead, nếu drag on sẽ mất momentum sang QwenPaw (UX tốt hơn) hoặc OpenClaw (fix nhanh hơn).

---

## 🔧 Hướng kỹ thuật chung

### 1. **Update Mechanism Overhaul**
- **Hermes, OpenClaw, NanoClaw**: Đều refactor update flow (signing, lifecycle, freshness)
- Pattern: Git update → Docker orchestration → service restart detection → rollback
- **Pain point chung**: Atomic cutover khó (Windows job breakaway, macOS launchd, systemd bus timeout)

### 2. **Context Management**
- **OpenClaw**: SQLite contention yielding, durable transcript
- **QwenPaw**: Media payload rejection recovery, scroll reclaim base64
- **NanoBot**: Token encoding UTF-8, truncation fix
- Xu hướng: Move from **in-memory** → **durable storage** (SQLite, atomic writes)

### 3. **Security Hardening**
- **Hermes**: Credentials redaction, secret permissions, world-readable journal fix
- **Zeroclaw**: Authority recheck, RPC SOP `tools:execute` gate
- **NanoBot**: Atomic file writes (prevent data loss khi concurrent)
- Pattern: **Audit → fix permission leak → redact logs → test suite**

### 4. **Session/Tool Reliability**
- **Hermes, OpenClaw**: Session identity, message_uid, zombie runtime IDs
- **NanoBot**: Sudo loop fix, tool parameter validation
- **QwenPaw**: TaskTracker zombie runs, QQ event replay
- Root cause: **Marker-based coordination primitive** (interrupts, turns, checkpoints) cần refactor

### 5. **Multi-Provider Integration**
- **NullClaw**: Tsubasa, Eden AI
- **IronClaw**: Tsubasa registry entry request
- **NanoBot**: Claude on Vertex, Unbrowse backend
- Trend: **OpenAI-compatible gateway** as standard interface, không viết custom code cho mỗi provider

---

## 🎭 Điểm khác biệt

### Chiến lược
| Dự án | Approach | Ưu điểm | Nhược điểm |
|-------|----------|---------|------------|
| **Hermes** | Stabilize after growth | Mature features | Technical debt cao |
| **OpenClaw** | Fast fix cycle | Responsive | Memory leak tái phát |
| **QwenPaw** | UX-first | First-time contributor nhiều | Chưa scale lớn |
| **Zeroclaw** | Architecture refactor | Clean codebase | Slow feature ship |
| **NullClaw** | Maintenance mode | Stable releases | Không innovate |
| **PicoClaw** | **Abandoned** | N/A | Maintainer MIA |

### Tính năng độc đáo
- **Hermes**: Desktop native app, remote gateway integration
- **OpenClaw**: Worker runtime install qua Cloudflare tunnel (4-13 phút transfer)
- **NanoBot**: Ripgrep native integration, Feishu compaction notifications
- **Zeroclaw**: OIDC stack, per-agent tool ownership
- **QwenPaw**: Multi-tab terminal, durable transcript SQLite

### Cộng đồng
- **Hermes**: Enterprise users (Windows multi-profile, remote backends)
- **OpenClaw**: Power users (large session stores, SQLite I/O pressure)
- **QwenPaw**: Accessibility focus (font scaling, HiDPI), first-time contributor friendly
- **Zeroclaw**: Security-conscious (private vulnerability reporting)
- **PicoClaw**: Fork migration happening (unmaintained → @afjcjsbx/picoclaw)

---

## 👥 Mức độ trưởng thành cộng đồng

### Tier 1: Mature & Active
**QwenPaw** ⭐⭐⭐⭐⭐
- 7 first-time contributors trong 1 ngày
- Issue → PR → merge cycle 2 ngày (font scaling #7999 → #8005)
- Comprehensive tests, security considerations trong PRs

**Hermes Agent** ⭐⭐⭐⭐
- User reports chi tiết với reproduction steps
- 8-10 comments per critical issue
- Multi-platform testing community

### Tier 2: Functional but Limited
**OpenClaw** ⭐⭐⭐
- Active issue reports (16 comments on zombie process)
- Nhiều pain points nhưng chưa đủ external contributors

**NullClaw** ⭐⭐⭐
- Config.json docs demand (4 👍)
- Contributors vá security holes
- Stale bot ảnh hưởng momentum

### Tier 3: Internal-Only
**Zeroclaw, NanoClaw, IronClaw** ⭐⭐
- Issues + PRs toàn core team
- Không có external feedback qua comments
- CI automation thay thế community interaction

### Tier 4: Dead/Abandoned
**PicoClaw** ⭐
- Maintainer MIA
- Stale bot đóng PRs trước khi review
- Fork declared: @afjcjsbx/picoclaw

---

## 🔮 Tín hiệu xu hướng

### 1. **Desktop Update Flow = Critical Path**
4/9 dự án đang fix update mechanism (Hermes, OpenClaw, NanoClaw, NullClaw). Nếu users không update reliably, momentum drop.

**Dự đoán**: Project nào ship stable update flow trước (atomic, rollback, cross-platform) sẽ gain trust → momentum.

### 2. **Context Budget Crisis**
Base64 media, long transcripts, SQLite growth → OOM/performance issues.

**Solutions đang test**:
- Scroll reclaim media (QwenPaw #7965)
- Durable transcript SQLite (QwenPaw #7931)
- SQLite yielding (OpenClaw #160801)

**Winner**: Ai ship **media reclaim + SQLite durable** sớm sẽ dominate long-session workflows.

### 3. **Security Audit Becoming Standard**
Hermes, Zeroclaw, NanoBot đều có security PRs (credentials, permissions, atomic writes).

**Trend**: Enterprise adoption demand → security becomes **table stakes**, không phải differentiator.

### 4. **First-Time Contributor = UX Signal**
QwenPaw: 7 first-time trong ngày  
Hermes: Không thấy first-time trong data  
PicoClaw: Contributors chuyển sang fork

**Insight**: Documentation quality + issue accessibility = community growth predictor. QwenPaw đang win onboarding game.

### 5. **Multi-Provider Gateway Consolidation**
Tsubasa, Eden AI, Unbrowse, Vertex AI → tất cả dùng OpenAI-compatible interface.

**Future**: Provider integration sẽ không còn là moat. Ai có **best credential management + fallback logic** sẽ win.

### 6. **Session/Tool Identity Crisis**
Hermes, OpenClaw, QwenPaw đều struggle với:
- Message UID stability
- Tool result routing
- Zombie process/runtime IDs
- Event replay after resume

**Root cause**: Marker-based coordination (checkpoints, interrupts) cần **fundamental rethink**.

**Prediction**: Project nào refactor session lifecycle đúng (immutable events, stable IDs, idempotent replay) sẽ eliminate bug class này. Hiện chưa ai ship solution hoàn chỉnh.

---

## 🏆 Kết luận chiến lược

### Hermes Agent cần làm gì để giữ vị trí dẫn đầu?

**Ngắn hạn (1-2 tuần)**:
1. **Fix Desktop update flow** (Windows job lifecycle + macOS signing) - đây là blocker #1
2. **Ship session identity stabilization** (#126265) - message_uid phải stable qua compression/restore
3. **Close P0 security issues** (#127207 credentials redaction) - trust không bù được bằng features

**Trung hạn (1-2 tháng)**:
1. **Onboarding overhaul** - học QwenPaw: font scaling, error messages rõ ràng, first-time contributor docs
2. **Context budget solution** - media reclaim + durable transcript như QwenPaw/OpenClaw
3. **Update flow documentation** - nhiều users fail nhưng không hiểu tại sao

**Dài hạn (3-6 tháng)**:
1. **Session lifecycle refactor** - immutable events, stable IDs, idempotent replay
2. **Multi-provider fallback** - học từ OpenClaw/NullClaw, OpenAI-compatible gateway pattern
3. **Community growth** - first-time contributor program, issue templates rõ ràng

### Risks nếu không act

- **QwenPaw** steal onboarding + UX users (font scaling shipped trong 2 ngày)
- **OpenClaw** steal power users (SQLite yielding + context fixes nhanh hơn)
- **PicoClaw fate**: Nếu update flow broken quá lâu → fork declaration, community migrate

### Opportunities

- **Desktop native app** vẫn là moat (OpenClaw chưa có, QwenPaw chưa có)
- **Enterprise features** (remote gateway, multi-profile) là differentiator
- **Scale lớn nhất** (500 PRs) → nếu stabilize xong sẽ hard to catch up

**Verdict**: Hermes đang lead nhưng **window đóng lại nhanh**. 1-2 tháng tới sẽ quyết định maintain lead hay bị QwenPaw/OpenClaw vượt mặt.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-09-29

## 1. Tóm tắt hôm nay

Ngày bận rộn với 30 PRs mở (chủ yếu fix/refactor), 50 issues active. Không có release mới. Trọng tâm: xử lý memory leak nghiêm trọng trong `prepared-model-catalog.worker.js` (#159514, #159662, #160548) và cải thiện update flow trên các platform.

---

## 2. Releases

Không có release mới.

---

## 3. Tiến độ dự án

### PRs nổi bật

**Stability/Performance:**
- #160847: Support Claude Sonnet 5.5 (mới ra 28/09)
- #160801: SQLite contention yielding - gateway yield khi wait session write thay vì block
- #160110: Worker runtime install progress trên paired session hosts (transfer 4-13 phút qua Cloudflare tunnel)
- #160465: Fix worker stall khi OS deny group signals

**Update/Onboarding:**
- #160671: Restore gateway khi activation Doctor fail (macOS Git update issue)
- #156421: Bind private stores trước update/Doctor access
- #150992: Fix onboard rerun ghi đè trusted-proxy về token auth

**Memory/Context:**
- #160878: Restore embeddings với Codex OAuth
- #157392: Recency decay chạy trước minScore → dated records >6 tuần không reach được

**Refactoring sweep:**
- #160823: CLI deslop pass 5
- #159752: Gateway server methods & worker env cleanup
- #160843: Restore config/node adapter lint budgets

### Issues nghiêm trọng

**P0 - Blockers:**

1. **#159514 [CLOSED], #159662, #160548**: Catalog worker memory leak 8MB/request, 1GB/5min, tái tạo stable. Root cause: plugin discovery re-import per request, Node giữ ES modules. Worker crash-restart kill active turns. **Status**: Đã đóng #159514 (có thể fix main).

2. **#154114**: `openclaw update` fail ở rehearsal step với "No usable inference route" dù gateway live có auth OK.

3. **#156986**: Update hang ở `update-candidate-state`, worker output 233MB+, respawn loop. Windows/WSL specific.

4. **#156917**: State-lifecycle lease block gateway startup 31 phút. Lease holder chết nhưng không heartbeat/force takeover.

5. **#160386**: 2026.9.6 SQLite I/O pressure trên large session stores → WebUI RPC timeout, `STATE_DATABASE_READ_ADMISSION_INVALIDATED`.

6. **#159839**: macOS update qua Telegram bỏ gateway offline khi activation Doctor refuse config promotion.

**P1 - Critical:**

- #97616: Zombie process leak từ hook/tool child
- #98435: MCP loopback không auto-reconnect sau gateway restart
- #121187: Yielded requester retry NO_REPLY thay vì settle quietly
- #159499: Windows ready ~220s, plugin registry 175s block

---

## 4. Điểm nổi bật cộng đồng

**Issues nhiều comment:**
- #97616 (16 bình luận): Zombie process leak - runtime degradation
- #98435 (15): MCP reconnect - session state loss
- #154114 (10): Update rehearsal fail

**Nhiều 👍:**
- #84037 (1👍): Codex CPU overhead cần giảm
- #159662 (1👍): Catalog worker leak

---

## 5. Ổn định & Bugs

### Memory leaks
Catalog worker leak là vấn đề nóng nhất. 3 issues track cùng root cause, #159514 đã đóng.

### Update flow
Nhiều failure mode:
- Rehearsal fail dù có auth (#154114)
- Hang ở candidate-state (#156986)
- Gateway offline sau activation fail (#159839)

### Session/State
- SQLite I/O pressure (#160386)
- Lease deadlock (#156917)
- Audit index corruption (#156424)

### Platform-specific
- **Windows**: Plugin load 57s (#160485, #159499), task status throw (#151008)
- **macOS**: Dashboard WebKit timeout (#160886), launchd shutdown budget wrong (#156968)
- **Docker/OverlayFS**: Package update nhiều phút (#160845)

---

## 6. Yêu cầu tính năng

- #155633: Databricks Unity Gateway như official provider
- #151914: Memory extra paths opt-out mtime decay cho stable refs
- #148298: E2E regression coverage cho subagent continuation
- #160832 [CLOSED]: Remove control cho pasted text trong composer (đã có PR)

---

## 7. Phản hồi người dùng

### Pain points chính

1. **Update unreliable**: Nhiều báo cáo fail ở các stage khác nhau, đặc biệt Docker/Git installs
2. **Memory search kém**: FTS5 AND query (#160839) → natural language questions không match
3. **Progress card UX**: Không dismiss được khi unfinished (#144769, fixed #160867)
4. **Fallback không work**: Session dính fallback model (#149922), system-agent không dùng fallback (#151648)
5. **Context poisoning**: Agent đọc looping transcript của agent khác và bị lây (#113346)

### Positive signals
- Claude Sonnet 5.5 support ngay trong ngày ra mắt (#160847)
- Active refactoring/cleanup cho maintainability

---

## 8. Backlog & Roadmap

### Đang xử lý
- Memory leak fixes (catalog worker priority cao)
- Update flow stability (multiple PRs in flight)
- Windows performance (plugin load, ready time)

### Technical debt sweep
Team đang làm multi-pass refactor:
- CLI deslop (pass 5)
- Gateway server methods
- Config/lint budget restoration

### Gaps
- **Testing**: #148298 request subagent e2e tests
- **Cron**: Job store O(D·N) reload (#127257)
- **Auth**: CLI/gateway separate stores (#113326)

---

**Kết luận**: Dự án trong giai đoạn stabilization mạnh. Memory leak và update issues là ưu tiên #1. Refactoring sweep cho thấy focus vào code quality dài hạn. Community feedback chủ yếu về reliability, ít feature requests.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-29

## 📊 Tóm tắt hôm nay

Ngày sửa lỗi và tối ưu hóa mạnh mẽ. Đội merge 10 PR, chủ yếu fix bugs quan trọng: atomic file writes (tránh corrupt data), web_fetch error handling, token encoding UTF-8, và Codex GPT-6 model discovery. 8 issue mới/cập nhật, nhiều vấn đề về sudo loop và Feishu compaction notification spam.

---

## 🚀 Releases

Không có release mới.

---

## 📈 Tiến độ dự án

### ✅ PR đã merge (10)

**Sửa lỗi nghiêm trọng:**

- **#5953** (p0): Atomic writes cho file tools. Trước đây `write_text` truncate in-place → crash giữa chừng = mất data, hoặc 2 agent ghi cùng lúc = corrupt. Giờ write → temp file → rename atomic.
- **#5949**: `web_fetch` failures trả về JSON success với `error` field → agent không biết lỗi. Giờ raise proper tool error, trigger retry logic.
- **#5952**: WebUI title generation dùng `reasoning.effort="none"` → GPT-6 Astra reject 400. Fix: dùng default reasoning.
- **#5940**: Codex model catalog thiếu GPT-6 Sol/Luna vì pin `client_version=0.153.4`. Bump lên `0.158.0` → expose đầy đủ.
- **#5861** (p1): Tokenizer warmup block startup 1-2s. Giờ load background thread, dùng UTF-8 byte estimate trước khi ready.
- **#5920**: Token truncation cắt giữa chữ Hán/emoji → decode ra `�`. Giờ ignore trailing incomplete UTF-8 bytes, giữ nguyên ký tự.
- **#5950**: TUI load saved session trống vì đọc `messages` field cũ đã xóa. Giờ parse canonical events từ #5823.

**Tối ưu và tính năng:**

- **#5948**: Dùng ripgrep native (nếu installed) thay grep/find → nhanh hơn nhiều.
- **#5951**: Refresh README contributors từ 365 → 392 account, giữ lại credits cũ.

**Closed cũ:**

- #1355, #1443, #1502 (conflict, merge sau cleanup).

### 🔄 PR đang mở (14)

**Ưu tiên cao:**

- **#5957** (p2): Exec hard timeout không enforce nếu command không poll thường xuyên. Fix: check timeout độc lập polling.
- **#5946** (p2): Tool results chỉ checkpoint 2 lần (trước/sau batch) → crash giữa chừng = mất kết quả hoàn thành. Giờ checkpoint sau mỗi tool.
- **#5953** → merged rồi, nhưng list 2 lần (lỗi data?).

**Tính năng mới:**

- **#5945** (p2): Thêm Unbrowse backend cho `web_fetch`. Fallback chain: Unbrowse → Jina → local readability.
- **#5955** (p2): Claude trên Vertex AI. Dùng `AsyncAnthropicVertex`, support ADC auth.
- **#5954** (p2): Aggregate concurrent subagent results → 1 notification thay vì nhiều (tránh main agent bị interrupt sớm).
- **#5947**: Metadata cho Tsubasa provider (tsubasa-fast/pro).
- **#5902** (p2): Telegram forum topics rename theo session title.
- **#5948** → merged rồi (duplicate entry?).

**Refactor/fix:**

- **#5811** (p2): Persist subagent sessions qua shared `SessionExecutor`, giữ transcript + lifecycle.
- **#5920** → merged rồi (duplicate).
- **#5539** (p2): `ToolLoader` logs dùng printf `%s` với Loguru `{}` → interpolate fail. Fix: chuyển hết sang `{}`.
- **#5302** (p2): Dream consolidation dùng restricted tool registry nhưng prompt vẫn mention full tools → model gọi unavailable tools.
- **#4549** (p2): `gateway.heartbeat.modelOverride` cho cheap model thay vì dùng main agent model.
- **#5212** (p2): MiniMax music generation guidance + tool contract discovery.

---

## 🔥 Điểm nổi bật cộng đồng

**Issue hot (5+ comments, recent update):**

- **#5924** (p1, 5 comments): Agent stuck sudo loop. Sudo chỉ tồn tại 1 turn → authorization close trước khi run command → agent retry liên tục. Khi max iterations, agent obsessed với command failed → unusable.
- **#5903** (4 comments): Feishu channel gửi internal checkpoint marker `"Continue the active task..."` tới user sau idle compaction. Message marked `_hidden: true` nhưng vẫn deliver.
- **#5908** (p2, 4 comments): WebUI request live tokens/sec indicator khi streaming reply.
- **#5898** (3 comments): GPT-6 models qua Github Copilot không support v0.3.5. Error: "Mode provider request failed."

**Issue ít tương tác nhưng quan trọng:**

- **#5956** (2 comments): Feishu không có in-place edit → compaction notice spam 2 messages (`phase='started'` + `'succeeded'`). Request config tắt notification.
- **#4798** (2 comments): Concurrent file writes không serialize → corruption. Đã fix #5953.

---

## 🐛 Ổn định & Bugs

**Đã fix hôm nay:**

- File corruption từ concurrent writes (p0).
- `web_fetch` failures silent pass.
- Token truncation mangle Unicode.
- Codex GPT-6 model missing.
- Title generation fail GPT-6.
- Tokenizer block startup.
- TUI empty saved sessions.

**Đang xử lý:**

- **#5924** (p1): Sudo loop → unusable agent.
- **#5903**: Feishu checkpoint marker leak.
- **#5898**: GPT-6 qua Copilot không work.
- **#5957**: Exec timeout không enforce đúng.
- **#4798**: Concurrent writes (đã fix nhưng issue chưa close).

**Backlog:**

- #5956: Feishu compaction notification spam.
- #5302: Dream tool mismatch prompt.
- #5539: ToolLoader log interpolation.

---

## 💡 Yêu cầu tính năng

- **#5908**: Live tokens/sec indicator WebUI.
- **#5945**: Unbrowse reader backend.
- **#5955**: Claude on Vertex AI.
- **#5954**: Aggregate subagent results.
- **#5947**: Tsubasa provider.
- **#5902**: Telegram topic auto-rename.
- **#4549**: Heartbeat model override (cheaper model).
- **#5212**: MiniMax music guidance.

---

## 💬 Phản hồi người dùng

**Vấn đề thực tế:**

- Sudo workflow broken → agent unusable (@kkayam).
- Feishu internal messages leak → annoying spam (@lan5635, @shenchaovip-afk).
- GPT-6 via Copiloh không work (@gqcao).
- WebUI không hiện speed streaming → không biết model stall hay chạy bình thường (@coinwh).

**Ý kiến tích cực:**

Không có explicit praise, nhưng nhiều feature PR (Unbrowse, Vertex, Tsubasa, subagent aggregation) → community mở rộng integrations.

---

## 🗓️ Backlog & Roadmap

**Ngắn hạn (tuần tới):**

- Merge các PR p2 đang mở: #5957 (exec timeout), #5946 (tool checkpoint), #5945 (Unbrowse), #5955 (Vertex).
- Fix sudo loop (#5924, p1).
- Fix Feishu notification spam (#5903, #5956).

**Trung hạn:**

- Refactor subagent persistence (#5811).
- Dream tool mismatch (#5302).
- Heartbeat model override (#4549).
- WebUI tokens/sec (#5908).

**Dài hạn:**

Không có roadmap rõ ràng từ data. Nhiều provider integrations (Tsubasa, Vertex, Unbrowse) → hướng mở rộng ecosystem, không phải tập trung core features mới.

---

## 📌 Kết luận

Ngày tập trung fix bugs nghiêm trọng. 3 lỗi lớn đã patch: atomic writes (data safety), web_fetch error handling, UTF-8 token truncation. Codex GPT-6 model discovery và title generation cũng fix. Community report sudo loop (p1, chưa fix) và Feishu spam (annoying, chưa fix). Feature requests nhiều integrations mới (Unbrowse, Vertex, Tsubasa) → project mở rộng compatibility thay vì push core features lớn. Backlog dài, nhưng prioritization rõ ràng (p0/p1/p2).

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-09-29

## 📊 Tóm tắt hôm nay

Zeroclaw đang tổng kết milestone OIDC với 30 PR được đóng/merge, tập trung vào security hardening, RPC parity với HTTP routes, và config migration V4. Hoạt động chính: đóng tracker OIDC (#8289 update lần cuối), fix config schema detection bug, và chuẩn bị gateway split v0.9.0.

## 🚀 Releases

Không có release mới.

## 📈 Tiến độ dự án

### Security & Architecture (Ưu tiên cao)
- **#11223** [OPEN]: Test suite cho authority recheck - đảm bảo permission checks không bị bypass
- **#11220** [OPEN]: Fix RPC SOP execution thiếu `tools:execute` check - trước đây admin và non-admin đều chạy SOP mà không verify tool permissions
- **#9746** [OPEN]: Per-agent ownership cho session tools - fix race condition trong Discord search và session management

### Gateway Split v0.9.0 (Đang triển khai)
Loạt PR đã đóng trong 24h:
- **#11164** [CLOSED]: Daemon sở hữu pricing refresher thay vì gateway
- **#11162** [CLOSED]: Xóa hardware_context.rs chết (398 dòng không dùng)
- **#11161** [CLOSED]: Golden frame tests cho WS/SSE/webhook/ACP
- **#11131** [CLOSED]: Daemon owns observer firehose - fix RPC logs/subscribe khi gateway tắt

Đang mở:
- **#11176** [OPEN]: RPC parity cho cron/memory/skills/personality - đóng cron pre-approval bypass
- **#11172** [OPEN]: RPC parity cho config routes còn lại
- **#11167** [OPEN]: Subscription hub bounded + replayable

### Config Migration V4
- **#11218** [OPEN]: Schema V4 migrate retired keys + warn khi thiếu `schema_version`
- **#11217** [OPEN]: Fix bug critical - config không có `schema_version` bị detect nhầm là V1 và chạy migration sai

### Tools & Features
- **#11224** [OPEN]: Fix backup tool - `encrypt=true` trước đây vẫn ghi plaintext, giờ dùng ChaCha20-Poly1305
- **#11221** [OPEN]: Gate 12 SaaS tools (Jira/Notion/LinkedIn/Google Workspace...) sau feature flags - giảm build size
- **#11076** [OPEN]: Antigravity CLI tool cho Gemini (Google đã retire Gemini CLI 6/2026)

### ZeroCode IDE
- **#11219** [OPEN]: Fresh Code sessions root tại launch directory
- **#11175** [OPEN]: Composer undo/redo, keyboard selection, cut/copy
- **#10553** [OPEN]: Copy selected text to chat với Markdown quote

### Session Management
- **#10407** [OPEN]: Persistent session attachments trong SQLite (tối đa 4/session)
- **#11222** [OPEN]: Fix environment immutability - session env giờ là `Arc` immutable thay vì mutable

## 💬 Điểm nổi bật cộng đồng

**Issue #8289** (OIDC tracker) đóng sau 3 tháng - milestone hoàn tất với consolidated enrollment/gateway/memory migration landed (#11082). Core OIDC stack merged, còn lại là close-out tasks.

**Issue #10280** [CLOSED] - Web search tool normalize transport errors trước khi forward vào model (DNS/connection failures trước đây leak query vào error message).

## 🐛 Ổn định & Bugs

### Critical
- **#11217**: Config migration bug - hand-written V3 configs bị nhầm là V1 nếu thiếu `schema_version`
- **#11220**: RPC SOP bypass `tools:execute` check

### High
- **#11224**: Backup encryption không hoạt động (chỉ copy plaintext)
- **#10935**: StreamTextGuard throw away replies khi prose quote tool-result object

### Medium
- **#11222**: Session environment mutability race
- **#11173**: CLI report commands abort thay vì exit gracefully trên SIGPIPE

### Platform-specific
- **#11137** [CLOSED]: Windows panic khi bundle export (thiếu volume/file identifiers)
- **#11080** [OPEN]: Hailo test fail trên macOS (timeout vs connection failure message)

## ✨ Yêu cầu tính năng

Không có feature request mới trong 24h. Các features đang implement:
- Persistent session attachments (#10407)
- Antigravity CLI integration (#11076)
- Conditional SOP steps (#11134 merged)
- ZeroCode composer editing (#11175)

## 📣 Phản hồi người dùng

@singlerider update #8289 - OIDC milestone closed, stack production-ready.

@IftekharUddin restore docs cho private memory plane bị mất trong #11082 merge (#11190 closed).

@JordanTheJet chiếm phần lớn activity (20/30 PRs) - đang lead gateway split và security hardening.

## 🗺️ Backlog & Roadmap

### v0.9.0 Gateway Split
Theo #11001 (F-series tasks):
- ✅ F0: Gateway cleanups (#11162)
- ✅ F1: Daemon owns observer (#11131)
- 🔄 F2: Daemon owns pricing refresher (#11164 merged, F2 pending)
- 🔄 F3a: Subscription hub (#11167)
- 🔄 F4: RPC parity - cron/memory/skills (#11176)
- 🔄 F5: RPC config routes (#11172)
- ✅ G7: Golden frame tests (#11161)

### Security
- OIDC close-out tracker (#8289) - mostly done
- Relay self-serve enrollment (#10592) - P2 accepted
- Per-agent tool ownership (#9746) - needs author action

### Config V4
- #11218 đang review - retire inert keys, warn missing schema_version
- #11217 fix detection bug - blocker cho V4

### Dependencies
- Web deps bump (#11193) - 22 packages minor/patch
- Feature-gate SaaS tools (#11221) - reduce build size

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 29/09/2026

## 📊 Tóm tắt hôm nay

Ngày sôi động với 6 PR sửa lỗi quan trọng từ @x1F916 (reliability wave 1), issue công bố fork chính thức do repo gốc không maintain, và yêu cầu bật private vulnerability reporting. Dự án đang trong tình trạng **bán bỏ rơi** - stale bot đóng issues/PRs trước khi review, maintainer không phản hồi.

---

## 🚀 Releases

Không có.

---

## 🔧 Tiến độ dự án

### Pull Requests nổi bật (29/09)

**@x1F916 - Reliability fixes (6 PRs cùng ngày)**
- **#3403** - async tool results đang gửi về default agent thay vì session gốc → cross-chat pollution
- **#3402** - context manager dùng default agent thay vì routed agent → memory leak
- **#3401** - `Manager.Reload` panic khi channel fail readiness check (nil pointer)
- **#3400** - multi-key models mất `api_keys` và `enabled` flag mỗi lần save config
- **#3399** - ARM32 updater tải nhầm ARM64 binary (substring match lỗi)
- **#3370** - thêm Keenable search provider (work without API key)

**Các PR cũ bị stale (cập nhật 28/09 do stale bot)**
- #3378 - OAuth refresh dùng hardcoded scope thay vì config
- #3354 - IRC multiline (IRCv3 draft/multiline) 
- #3347 - fix Web UI lag (#3281) bằng virtualization
- #3222 - DeltaChat refactor (-200 LOC)

### Xu hướng

❌ **Dự án đang chết dần**:
- Stale bot đóng issues/PRs có giá trị (14 ngày không activity)
- Maintainer không review code quan trọng (security, reliability)
- Không có release từ 0.3.1 (tháng 7?)
- Fork chính thức xuất hiện: @afjcjsbx/picoclaw (#3398)

✅ **Cộng đồng vẫn active**:
- @x1F916 tìm và fix hàng loạt bug core với reproducers
- Contributors vá security holes (#258)
- Người dùng tự fix UI lag (#3347)

---

## 💬 Điểm nổi bật cộng đồng

### #3398 - Active Fork Declaration
@afjcjsbx công bố maintain fork do repo gốc unmaintained. **Signal quan trọng**: dự án có thể đã chết, cộng đồng đang di cư.

### #3405 - Private Vulnerability Reporting
@x1F916 tìm thấy **nhiều lỗ hổng bảo mật** nhưng không báo được vì:
- GitHub private reporting tắt
- Không có SECURITY.md
- Không có security contact

**Nguy hiểm**: lỗ hổng phải báo công khai hoặc... im lặng.

### #3281 - Web UI Lag (15 bình luận, 2 👍)
Chat history dài → input box lag khủng khiếp. #3347 đã fix bằng virtual scroll nhưng **không được merge**.

---

## 🐛 Ổn định & Bugs

### Critical bugs (có PR fix, chưa merge)

1. **Cross-session contamination** (#3403)
   - Tool async results gửi về sai agent
   - User A gọi tool → kết quả vào chat User B
   
2. **Memory leak** (#3402)
   - Routed agent bị context manager dùng nhầm default agent
   - Long-running sessions ngốn RAM

3. **Panic on reload** (#3401)
   - Channel config lỗi → nil pointer → gateway crash
   
4. **Config corruption** (#3400)
   - Mỗi lần save mất API keys của fallback models

5. **Wrong architecture binary** (#3399)
   - ARM32 users tải ARM64 build → không chạy

### Security (từ #258, đã đóng 28/09)

Issue audit từ tháng 2 đã đóng nhưng **không rõ fix hay bỏ qua**:
- Tool execution không sandbox
- Command injection vectors
- Privilege escalation risks

---

## ✨ Yêu cầu tính năng

### #3366 - OpenAI-compatible providers
Cho phép thêm self-hosted OpenAI routers (như 9Router). Use case: privacy, cost control.

### #3397 - Tsubasa provider catalog
Thêm Tsubasa vào dropdown thay vì manual config `openai` với custom base URL.

### #3370 (PR) - Keenable search
Search provider không cần API key, work out-of-the-box.

---

## 💭 Phản hồi người dùng

**Frustration cao**:
- Features/fixes không được review → stale bot đóng
- Critical bugs tồn tại nhiều tháng
- Không biết maintainer còn active không

**Tín hiệu tích cực**:
- @x1F916 đầu tư effort lớn (6 PRs + reproducers + issue report)
- @iMilnb tự fix UI lag
- Community fork active

**Pain points**:
- Web UI không usable với long chat (#3281)
- OAuth refresh breaks với custom providers (#3378)
- Security reporting bị block (#3405)

---

## 🗺️ Backlog & Roadmap

**Không có roadmap công khai.**

**Backlog ngầm** (từ open PRs/issues):
- 7 issues open (2 stale)
- 10 PRs open (5 stale)
- Reliability fixes chờ merge
- Security issues chờ xử lý

**Forecast**:
- Nếu maintainer không quay lại trong 1-2 tuần → fork @afjcjsbx trở thành canonical
- Contributors có thể chuyển sang fork
- Repo gốc biến thành archived/legacy

---

## ⚠️ Đánh giá tổng thể

**Dự án trong tình trạng khẩn cấp**:
- Maintainer MIA (missing in action)
- Code quality tốt (contributors giỏi) nhưng không được merge
- Security holes không được address
- Stale bot phá hoại contribution workflow

**Khuyến nghị cho users**:
- Theo dõi fork @afjcjsbx/picoclaw
- Không dùng production cho đến khi security issues (#405, #258) được clarify
- Contributions mới nên target fork thay vì repo gốc

**Tín hiệu tích cực duy nhất**: cộng đồng vẫn engaged và willing to maintain.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-09-29

## 📋 Tóm tắt hôm nay

Đóng 17 PRs, merge 0. Tập trung sửa lỗi `/update-nanoclaw` flow (controller load fail, service restart detection fail), agent-runner bugs (failure notice loop), và setup issues (gateway detection, proxy support). Core team (@glifocat, @tchopoorian) đang hardening update + setup paths.

---

## 🚀 Releases

Không có release mới.

---

## 📊 Tiến độ dự án

### PRs đóng (17 merged/closed)

**Update flow fixes:**
- #3913: Update controller load lại. Từ #3816 gateway extraction, `git archive` thiếu `setup/`. Fix: bundle dependencies vào archive.
- #3962: Service liveness probe detect chính xác hơn. Trước đó `detectService` đọc tất cả non-zero exit là `inactive`, skip lỗi probe itself → report `complete` sai khi service vẫn chạy.
- #3948: Giữ gateway containers (Iron Proxy) qua cutover. Trước đó `drainContainers` kill hết, agent spawn fail sau update.
- #3956: Rollback dọn host + containers đúng. Nohup installs có race: cutover save pid trước khi stop → rollback kill sai pid.

**Agent runner fixes:**
- #3908: Dừng failure notice loop. Agent A gửi message → B fail → B trả failure notice → A answer failure notice with another failure → infinite.
- #3957: Pre-task script timeout kill cả process group. Bash fork last command thay vì exec → child process sống sau timeout.
- #3959: Tests dùng async spawn thay vì `spawnSync`. Bun 1.4.0 bug: `spawnSync` mất exit event → hang forever (oven-sh/bun#34069).

**Setup & gateway fixes:**
- #3910: Gateway detection không parse pnpm stdout nữa. Nested pnpm in workspace print warning → detection fail. Fix: check `detect.ts` exit code + stderr.
- #3950: Iron trust custom CA cho private model hosts (`https://models.home.arpa`).
- #3949: Mattermost `CALLBACK_SECRET` derive khi unset.
- #3883: Uninstall xóa Iron Control database.

**Other:**
- #3946: Skill step fail show lỗi thật thay vì "step did not complete".
- #3958: Log never throw khi value không JSON-serializable (circular object, BigInt).
- #3887: Setup readiness probe không clip vào deadline → report lỗi thật thay vì timeout.

### PRs đang mở (16 open)

**High priority:**
- #3961: `/update-nanoclaw` report `complete` khi `systemctl --user` không reach bus. Service không restart.
- #3963: Update e2e test fix cho Node 24 <24.13.1 (fail `rmSync` symlink).
- #3962: Service liveness probe refuse cutover khi probe itself fail.
- #3956: Rollback stop live host + drain containers.

**Feature:**
- #3950: Iron trust local CA.
- #3654: Container `NO_PROXY` cho MCP servers qua `host.docker.internal` (khi gateway set `HTTP_PROXY`).

**Docs:**
- #3955: Gateway notes move vào gateway skills, OpenCode skill không name gateway.
- #3954: Document OneCLI + Iron adapters không detect concurrent credential rotation.

**Waiting:**
- #3918: Result-door turn không nudge khi reply qua `send_message`. Held đến khi `send_message` ack flag land.

---

## 🔥 Điểm nổi bật cộng đồng

- #3906 (closed): User @glifocat hit 2 blockers trong `/update-nanoclaw` flow v2.4.0. Controller archive thiếu `setup/` + commands chạy trước deps exist.
- #3961 (open): Update flow report false positive `complete` khi systemd không available.

Không có external contributors hoạt động. Issues + PRs toàn core team (@glifocat, @tchopoorian, @barnuri).

---

## 🐛 Ổn định & Bugs

### Critical bugs fixed:
- **Update flow**: Controller load, service detection, gateway container persistence, rollback cleanup.
- **Agent runner**: Failure notice loop, process group timeout kill.
- **Setup**: Gateway detection false negative (pnpm workspace warning), Mattermost callback secret derive.

### Open bugs:
- #3961: Update không restart service khi systemctl fail.
- #3963: Node 24 compatibility (rmSync symlink).
- #3654: MCP servers unreachable qua proxy.

### CI stability:
- #3959: Bun `spawnSync` hang → switch async spawn. Tests pass.
- #3945: Delivery-poll drain test timeout → giảm sessions 20→9.
- #3841: `bun test --isolate` wedge 6h → async spawn fix.

---

## ✨ Yêu cầu tính năng

- #3654: `NO_PROXY` cho local MCP servers.
- #3950: Iron trust custom CA (merged).
- #3901: Host service qua HTTPS proxy (`NODE_USE_ENV_PROXY`).

Không có feature requests từ external users.

---

## 💬 Phản hồi người dùng

Không có external feedback. Issues + PRs từ internal testing.

---

## 📅 Backlog & Roadmap

### Immediate priorities (từ open PRs):
1. Fix #3961: Update service restart detection
2. Fix #3963: Node 24 compatibility
3. Review #3962: Service liveness probe improvements
4. Review #3956: Rollback improvements

### Held/waiting:
- #3918: Result-door nudge logic (đợi `send_message` ack flag)
- #3919: OpenCode model URL check at prompt

### Cleanup:
- #3960: OneCLI adapter error messages
- #3955: Gateway docs refactor

Không có public roadmap info trong dataset.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-09-29

## 📊 Tóm tắt hôm nay

Release v20260929 đánh dấu đợt đóng issue lớn: 15 issues closed, web search provider pinned, QQ channel fix Markdown parsing. Community cleanup sprint — giải quyết backlog tích lũy từ tháng 3.

## 🚀 Releases

**v20260929** (#1014)
- Web search provider lock — stop Exa duplicate Content-Type reject
- QQ channel strip Markdown before reply
- Version bump

Maintenance release, không có tính năng lớn. Focus: stability + bug fixes.

## 📈 Tiến độ dự án

### PRs đáng chú ý

**#1013 - Tsubasa provider** (OPEN)
- OpenAI-compatible gateway mới
- 32K context, 8K output budget
- Credential: `TSUBASA_API_KEY`

**#990 - Eden AI gateway** (CLOSED → merged vào v20260929)
- EU-based multi-vendor router
- Dùng OpenAiCompatibleProvider

**#527 - Adaptive Intelligence Pipeline** (CLOSED)
- Turn Scorer: [-1.0, +1.0] quality signal per turn
- Skill Router: deterministic k-NN matching
- Self-learning loop không cần extra API calls
- Bị reject/đóng — chưa rõ lý do

**#667 - IMAP bidirectional polling** (CLOSED)
- Email channel từ send-only → full bidirectional
- IMAP IDLE push notifications
- Auto fallback curl polling
- Network resilience

### Xu hướng

Sprint đóng technical debt tháng 3-4. Nhiều PRs lớn (adaptive pipeline, email IMAP, tool customization #411) bị close — có thể do scope quá rộng hoặc conflict design.

## 🔥 Điểm nổi bật cộng đồng

**#613 - Config.json documentation** (4 👍)
- User demand: better config option descriptions
- Default values + practical examples missing
- Critical cho onboarding

**#619 - Error message clarity** (1 👍)
- `error.ApiError` quá chung chung
- Tester frustration: không debug được

**#473 - README outdated** (1 👍)
- Binary size, memory usage không còn 1MB
- Benchmark table cần update

## 🐛 Ổn định & Bugs

### Đã fix (closed hôm nay)

**#408 - Tool call parsing**
- Colon ":" extracted as tool name thay vì "memory_recall"
- Valid JSON {"name": "memory_recall", "arguments": {...}} bị parse sai

**#665 - NoResponseContent error**
- LM Studio assembly gặp lỗi không có response content

**#354 - Homebrew upgrade breaks service**
- LaunchAgent plist hardcode versioned path
- `brew upgrade` → daemon silent stop

**#376 - DingTalk receive messages**
- Chỉ send, không receive
- #319 (DingTalk PR) fix với official Bot API + OAuth2

**#477 - Lark/Feishu WebSocket disconnect**
- WS connection unstable

### Patterns

Tool calling parser fragile. Channel stability issues (DingTalk, Lark). Error messages không actionable.

## ✨ Yêu cầu tính năng

**#764 - Agent Skills logo** (OPEN)
- Add NullClaw vào agentskills.io/clients list
- Brand visibility request

**#624 - Vision pipeline** (CLOSED)
- Send images/files → agent
- Auto base64 encoding cho multimodal LLMs
- User đang dùng custom skill, muốn native support

**#623 - ddgs metasearch** (CLOSED)
- Add github.com/deedy5/ddgs cho web_search tool
- Aggregate multiple search engines

**#631 - GET /status endpoint** (CLOSED)
- Expose agent state as JSON
- External monitoring/dashboards không có API
- Shell out `nullclaw status` không đủ

**#190 - Subagent spawn** (CLOSED)
- Different provider per subagent
- Intercommunication architecture

## 💬 Phản hồi người dùng

**Pain points**

#861 - Web UI setup documentation confusing
- "70% không hiểu", "non-jargon human terms" demand
- Tunneled browser setup unclear

#427 - Custom skills không work
- Skill exists trong list, info command shows details
- Agent không thấy tool → "tool not found"
- Install from local path fail

#495 - Local web channel + CloudFlare/nginx tunnels
- User muốn expose qua public IP/tunnel
- Web UI access từ remote

**Positive signals**

Community active report bugs với reproduction steps chi tiết (#408 có LM Studio logs). Users contribute large PRs (#527 adaptive pipeline, #667 IMAP, #411 tool customization).

## 📋 Backlog & Roadmap

Không có explicit roadmap trong data. Infer từ closed PRs:

**Đã thử nhưng reject:**
- Adaptive intelligence pipeline (#527) — ambition cao nhưng chưa merge
- Tool customization system (#411) — trigger-based prioritization
- WhatsApp Web channel (trong #527)

**Priority areas** (từ issue volume):
1. Documentation clarity (config, setup, errors)
2. Channel stability (DingTalk, Lark, Email đã fix)
3. Tool system reliability (parsing, custom skills)
4. Monitoring/observability (status endpoint demand)

**Upcoming** (từ open items):
- Tsubasa provider (#1013) sắp merge
- Agent Skills listing (#764) pending maintainer action

---

**Kết luận**: Maintenance day, không có feature bomb. Team dọn backlog Q1 2026, focus stability over velocity. Community muốn better docs + error messages hơn là fancy features.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw — 2026-09-29

## 1. Tóm tắt hôm nay

Ngày bảo trì định kỳ. CI bot refresh docs và knowledge graph. Đóng PR cũ về webui routing. Issue mới phân tích lỗi benchmark và đề xuất registry entry cho Tsubasa.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đang mở:**
- **#6698** (docs bot, mở từ 2026-07-27): OpenWiki narrative docs cập nhật tự động. Chờ review thủ công theo policy.
- **#7988** (CI bot, mở từ 2026-08-29): Refresh codebase knowledge graph. Nightly workflow output, chờ merge.

**PR đã đóng:**
- **#5132** (contributor mới, closed 2026-09-28): Fix routing `/chat/:threadId` không hợp lệ. Redirect về `/chat`, xử lý race condition khi load thread list. Size L, risk low.

**Issues mới:**
- **#8116** (2026-09-28): Daily taxonomy lỗi benchmark officeqa — 31 non-pass tasks, hầu hết là model quality error (DeepSeek-V4-Flash). Navigation issue trong office tooling.
- **#8115** (2026-09-28): Thêm registry entry cho Tsubasa với config 32K context budget rõ ràng. Hiện phải nhập endpoint/model thủ công.

**Xu hướng:** Tự động hóa mạnh (docs, graph refresh qua CI bot). Contributor mới đóng góp webui fix. Focus vào benchmark quality và registry UX.

## 4. Điểm nổi bật cộng đồng

Không có interaction (0 comments, 0 reactions trên tất cả item). Hoạt động vẫn ở team nội bộ.

## 5. Ổn định & Bugs

**#8116:** Lỗi benchmark officeqa — model navigation error, không phải infra issue. Tracking để cải thiện model quality.

**#5132 (closed):** Đã fix invalid chat route handling. Bug khi deep-link thread không tồn tại hoặc thread list chưa load xong.

## 6. Yêu cầu tính năng

**#8115:** Thêm Tsubasa registry entry. IronClaw có OpenAI-compatible backend nhưng thiếu named provider config. Cải thiện UX credential setup và model selection.

## 7. Phản hồi người dùng

Không có feedback trực tiếp qua comments. Issue #8115 nêu pain point config thủ công.

## 8. Backlog & Roadmap

**Pending merge:**
- Docs refresh (#6698) và knowledge graph (#7988) — backlog CI automation output.

**Đề xuất:**
- Tsubasa registry entry (#8115) — cải thiện onboarding.
- Monitor benchmark quality (#8116) — officeqa model errors cần track.

**Pattern:** Tự động hóa docs/graph maintenance. Nâng UX registry config. Benchmark taxonomy định kỳ để track model regression.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-09-29

## 📊 Tóm tắt hôm nay

18 PR mở/đóng, 9 issue active. Tập trung fix context overflow (media trong tool result), cải thiện UX (font scaling, table rendering), và stability (task tracking, event replay). Contributor mới đông (7 PR đầu tiên), tín hiệu tốt cho cộng đồng.

---

## 🚀 Releases

Không có release chính thức. Version đề cập: `2.2.2b3`, `2.2.2b4` - đang beta testing.

---

## 🔧 Tiến độ dự án

### Merged/Closed PRs quan trọng

**#8005** - Font scaling toàn UI  
- Add 12-20px range, semantic tokens
- Giải quyết #7999 (accessibility, HiDPI, presentation mode)
- **Impact**: Accessibility++, phản hồi nhanh cho user pain

**#7965** - Fix context overflow từ media  
- Scroll reclaim historical media, align thinking budget với token count
- Giải quyết #7853 (base64 trong tool result không bị prune)
- **Impact**: Long image session không còn OOM

**#7956** - Settings UX overhaul  
- Unified design language, workspace-picker fix
- **Impact**: Consistency, onboarding mượt hơn

**#7861** - Multi-tab terminal trong Console  
- xterm với auth, conversation-scoped working dir
- **Impact**: Power user workflow++

### Open PRs đáng chú ý

**#7931** - Durable paginated transcript (SQLite)  
- Per-session storage, stable cursor, cleanup on delete
- **Chưa merge**: Đang refine, kiến trúc lớn

**#8014** - Provider discovery warnings với detail  
- Include provider ID + sanitized error
- **Quan trọng**: Diagnosability cho concurrent provider failures

**#8010** - Recover từ media payload rejection  
- Context rewind khi provider choke on oversized image
- **Critical fix**: Session không chết sau 1 lần rejected media

**#8012** - Telegram fenced code block fix  
- Support c++/objective-c info strings, ~~~ fences
- **First-time contributor** - quality contribution

**#8007** - TaskTracker zombie runs fix  
- Register run chỉ khi producer task exists
- Giải quyết #7991 (dashboard count != API count)

---

## ⭐ Điểm nổi bật cộng đồng

**First-time contributors**: 5/18 PR từ contributor đầu tiên (#8012, #8010, #8007, #8006, #7987, #7988, #7989, #8004)  
→ Onboarding tốt, issue documentation rõ ràng

**Issue #7853** (context overflow) - 8 comments, đóng sau #7965 merge  
→ Pain point thực tế (image-heavy workflow), giải quyết nhanh

**Issue #8013** (skill download timeout) - Mới mở, chưa fix  
→ 30s frontend timeout vs backend vẫn copy, UX broken

---

## 🐛 Ổn định & Bugs

### Đang fix (Open PRs)

1. **TaskTracker zombie runs** (#8007) - dashboard count sai
2. **Media payload rejection kills session** (#8010) - critical UX bug
3. **Telegram code block rendering** (#8012) - c++/~~~ broken
4. **QQ event replay** (#8006) - duplicate processing sau resume
5. **Browser ignore_default_args** (#7987) - Playwright config missing
6. **grep_search đọc binary** (#7988) - WAL/session files leak vào context
7. **Model discovery warnings** (#8014) - không đủ info để debug

### Đã fix (Closed)

- **#7853**: base64 media không bị prune → fixed #7965
- **#6252**: Linux Ctrl+/- zoom → likely fixed #8005 (font scaling)

### Chưa fix (Open Issues)

- **#8013**: Skill download timeout (30s frontend, backend chạy tiếp)
- **#8002**: Windows auto mode - inline Office COM quit() đóng user's PowerPoint
- **#8011**: Telegram HTML formatter edge cases (duplicate #8012)
- **#8009**: Oversized image permanently breaks session (being fixed #8010)

---

## 💡 Yêu cầu tính năng

**#7999** - Desktop font size adjustable  
→ **Merged #8005** - giải quyết nhanh

**#7990** - Aliyun Token Plan thiếu `thinking_param_style`  
→ Console ẩn thinking controls, model catalog cần update

---

## 💬 Phản hồi người dùng

**Positive signals**:
- Font scaling được yêu cầu & ship nhanh (#7999 → #8005, 2 ngày)
- Multi-tab terminal (#7861) - power user feature được chờ đợi

**Pain points**:
- Context overflow từ media (#7853) - ảnh hưởng real-world workflow
- Skill download timeout (#8013) - large skill (80MB) không thể install
- Session death từ rejected media (#8009) - no recovery, user phải tạo session mới

**Contributor experience**:
- 5 first-time PR trong 1 ngày → documentation tốt, issue accessible
- PR quality cao (comprehensive tests, security considerations)

---

## 📋 Backlog & Roadmap

### High priority (judging từ activity)

1. **Stability**: Task tracking, event replay, context management
2. **UX polish**: Settings unification, table rendering, font scaling
3. **Channel robustness**: Telegram/QQ edge cases
4. **Context efficiency**: Durable transcript (#7931), media reclaim (#7965)

### Technical debt visible

- Frontend timeout hardcoded 30s (#8013)
- Model catalog maintenance (#7990)
- Windows sandboxing gaps (#8002)
- Binary file filtering trong tools (#7988)

### Architecture shifts

- **SQLite transcript storage** (#7931) - moving away from in-memory only
- **Multi-tab terminal** (#7861) - Console becoming full IDE

---

## 🎯 Nhận xét tổng quan

**Momentum tốt**: 18 PR, 7 first-time contributors, fast issue → fix cycle  
**Focus đúng**: Giải quyết real pain (context, UX, stability) thay vì feature creep  
**Chất lượng code**: Security considerations, comprehensive tests, cross-platform awareness  
**Cần cải thiện**: Timeout handling (#8013), model catalog maintenance (#7990), Windows COM sandboxing (#8002)

Version 2.2.2 beta đang convergence, likely release sớm.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*