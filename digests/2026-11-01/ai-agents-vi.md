# Bản tin Hệ sinh thái Hermes Agent 2026-11-01

> Issues: 113 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-11-01 02:00 UTC

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

# Báo cáo Hermes Agent – 2026-11-01

## 🔥 Tóm tắt hôm nay

Không có release. Hoạt động chính: sửa lỗi gateway stability (session blocking, duplicate Slack events), bổ sung oMLX managed provider cho Mac, và 30+ PR đóng/mở xử lý redaction leaks, tool whitelist trên worker threads, config edge cases.

---

## 📦 Releases

Không có release mới.

---

## 🚀 Tiến độ dự án

### PR đóng (có impact)

- **#147172** (desktop-plugins): Windows junctions giờ nhận diện đúng. Host reconcile check bỏ sót junctions → symlink check pass → plugin install thay thế folder system. Fixed.
- **#147164** (update-lock): Đóng 2 test fail trên Windows (update lock không release khi parent die) + cleanup ctypes per-call build.
- **#146417** (desktop security): Plugin install từ desktop từ chối package name `..` → chặn path traversal ra ngoài `desktop-plugins/`.

### PR mới/nổi bật

- **#147390** (plugins): Tool whitelist (review/side-question) giờ enforce trên worker threads. Trước đây dùng `threading.local`, tool chạy trên `ThreadPoolExecutor` không thấy → bypass whitelist. Fix: copy whitelist vào ContextVar, propagate sang worker.
- **#147389** (cli): Modern layout `soft_wrap=True` cắt mất list item dài + URLs. Fixed: force Panel text không wrap.
- **#147052** (desktop): Thêm managed **oMLX** backend cho Mac (cạnh llama.cpp). User chọn engine, install, start/stop server, tải MLX models từ HF. macOS only, M-series check.
- **#147077** (session_search): `session_search(query=..., session_id=...)` bỏ qua query, trả toàn bộ session. Compaction footer gọi shape đó để lấy detail → model nhận dump thay vì matches. Fixed.
- **#140324** (kanban): Deep links `/kanban?task=<id>` mở drawer, `?board=<slug>` chọn board.
- **#147388** (memory): Memory provider schemas import sibling helpers fail `ModuleNotFoundError`. Fixed: load schema trong package shell keyed by provider dir.
- **#147382** (gateway): Delivery `pending` row không chuyển `attempting` nếu write fail → restart resend reply. Fixed: record attempt trong initial transaction.
- **#147075** (redact): 3 secret leak shapes: per-line URL gate, recursive searches, argv dumps. Stack trên #146688 + #146701.
- **#147073** (model-switch tests): Fail khi Ollama local chạy. Fixed: patch `hermes_cli.providers.ollama` để autouse fixture fence đủ.
- **#147054** (ssh): Profile TMPDIR dài → ControlMaster socket path > 108 byte → fail. Fixed: fallback sang `HERMES_HOME/tmp/ssh-<hash>`.
- **#147381** (config): Desktop preference write biến blank `config.yaml` thành stub. Fixed: raw read dùng `require_real_mapping`, write guard reject blank/null docs.

### Xu hướng

- **Stability fixes**: Gateway blocking (session meta read #145999), duplicate events (Slack #147342), delivery obligation race (#147382).
- **Secret redaction tightening**: 3 new leak paths patched (#147075).
- **Mac local LLM**: oMLX managed provider (#147052) + docs update (#147355).
- **Config edge cases**: translucency stuck on Linux (#145370, #146678), HERMES_HOME move invalidates sessions (#146480).
- **Test hermeticity**: fix leaks (ContextVar #147198, Ollama discovery #147073).

---

## 💬 Điểm nổi bật cộng đồng

### Issues có tương tác

- **#143547** (gateway post-merge, 30💬): Tracking issue sau unified gateway merge (#106742). Multi-profile, session lifecycle, compression. Main thread cho post-merge problems.
- **#11911** (mobile voice, 21💬, 15👍): Request iOS/Android app với voice calling. High demand.
- **#138836** (Kanban delivery, 16💬): Desktop Kanban notify/wake, compaction, attention events không đầy đủ.
- **#90713** (memory thresholds, 8💬): Dashboard banner + kanban memory guard dùng hardcoded thresholds, không config được. Vấn đề trên ZFS hosts.
- **#145183** (Linux translucency, 7💬): Desktop translucent trên Linux, không tắt được từ UI (setting hidden). Duplicate: #145370, #146678.

### Vấn đề người dùng quan tâm

- **Android beta full** (#147269, 6💬): Firebase tester limit đầy, user không join được.
- **Slack/Telegram event delivery**: Native button approval resolve sai request (#124974), Telegram album với document refused (#143605).
- **Session resume breaks**: Handoff re-keys session, desktop resume fail (#144454). HERMES_HOME move invalidates mọi local session (#146480).
- **Desktop link prefetch SSRF** (#126885): No private-address guard, follows redirects → LAN GETs, consumed one-time links.

---

## 🐛 Ổn định & Bugs

### Critical

- **#145999** (gateway event loop block): `get_meta()` block 30s → watchdog kill process, in-flight turns fenced `unknown`. State.db lock contention.
- **#147342** (Slack duplicate event): Duplicate Slack event → double admission → phantom ack + duplicate turn. Single gateway, Socket Mode. Root: admission idempotency gap.
- **#147346** (Telegram fallback): DoH return single IP → `SEED_FALLBACK_IPS` dropped → blackholed IP, no alternate route. 30-min outage.

### High

- **#147373** (smart approval auto-approved destruction): PowerShell command redirection masked real targets. Approval gate evaluated command text, executor evaluated as expression. User approved "remove temp files", ran `rm -rf` pattern. 188k files, 21.4 GiB lost. **Major safety gap**.
- **#147339** (compaction replay): Compaction replayed completed request after internal notification. Task selection bug.
- **#143653** (kanban chat -q fail): `chat -q` từ kanban worker fail session.create. Canonical contract Literal reject inherited `HERMES_SESSION_SOURCE=kanban`.
- **#136623** (tool whitelist bypass): Background-review whitelist dùng thread-local, tool worker threads không thấy. Fixed #147390.

### Medium

- **#147197, #147196** (session key parsing): `_parse_session_key` drops per-user slot, misparses Slack scope. Wake rebuild re-keys to shared route.
- **#147198** (test isolation): 8 tui_gateway tests fail trong single pytest process. Secret-scope ContextVar leak + `HERMES_PROFILE` not blanked.
- **#147087** (context engine leak): Soft cache eviction never release per-agent context engines → SQLite connection leak.
- **#146645** (delegate model_map): Refuse task khi primary fail credential resolution, không thử fallback_providers.
- **#144547** (lifecycle guard gap): `hermes update` không có lifecycle guard, drain + SIGKILL + re-code gateway mà không check cron.

---

## ✨ Yêu cầu tính năng

### Mới đề xuất

- **#147217** (Kanban auto-estimation + todo decomposition): Expand task sizes (S/M/L → XS/S/M/L/XL), auto-estimate mới tạo, decompose todo into smaller units. PR draft closed, issue opened.
- **#147355** (vllm-metal docs): Add vllm-metal setup guide cho Mac, Homebrew, Qwen3.5-9B, MLX weights. Native MPS cho Apple Silicon.

### Được yêu cầu nhiều

- **#11911** (mobile voice, 15👍): iOS/Android app với voice calling.
- **#130480** (Anthropic OAuth status, 2👍): Accounts tab show "Not connected" khi OAuth trong credential pool (không phải singleton file).
- **#145370** (Linux translucency, 2👍): Tắt translucency từ UI.

### Backlog

- **#68482** (cron metadata): Tags/category, description, workflow fields cho cron jobs. Flat list khó quản lý 10-15+ jobs.
- **#41659** (mlx-whisper STT): Apple Silicon GPU underutilized. Add mlx-whisper first-class provider, native MPS.
- **#30999** (skill subdirs): `ALLOWED_SUBDIRS` hardcoded 4 dirs. Custom subdirs invisible to `skill_view`.
- **#131666** (delegate SOUL): Subagents không nhận SOUL.md. PR #131211 adds opt-in `delegation.inherit_soul`.
- **#42182** (emoji quick-insert): Desktop chat composer, button/shortcut cho emoji.
- **#64248** (rich-text composer): WYSIWYG thay markdown-only authoring.

---

## 📣 Phản hồi người dùng

### Positive

- oMLX managed provider (#147052): Mac users có alternative nhanh hơn llama.cpp cho M-series.
- Kanban deep links (#140324): `?task=` và `?board=` giúp navigation từ external tools.

### Pain points

- **Android beta full** (#147269): Cannot join, high demand.
- **Session invalidation khi move HERMES_HOME** (#146480): No migration path, mọi local session mất.
- **Smart approval destruction** (#147373): User trust approval gate, lost 21 GiB. Safety issue.
- **Desktop translucency stuck on Linux** (#145183, #145370, #146678): Không tắt được, setting hidden. Transparency mode ignore platform support.
- **Long list items truncated** (fixed #147389): Modern layout mất URLs, list text.
- **Email auth too strict** (#146956): `EMAIL_AUTHSERV_ID` chỉ nhận một ID, host có nhiều MX servers.
- **Model picker truncates on mobile** (#35115): Two-column grid, quantization names identical.

---

## 📋 Backlog & Roadmap

Không có roadmap công khai. Inferred từ PR/issue pattern:

### Đang xử lý

- **Gateway stability**: Session blocking (#145999), duplicate events (#147342), delivery race (#147382).
- **Secret redaction**: 3 leak paths (#147075), argv dumps, recursive searches.
- **Mobile beta**: iOS filter options missing (#147371), Android completion notification missing (#147345), scroll stutter (#147321).
- **Config edge cases**: Translucency Linux (#145370), HERMES_HOME move (#146480), blank config writeback (#147381).
- **Test isolation**: ContextVar leak (#147198), Ollama discovery (#147073).

### Planned (từ open PRs/issues)

- **oMLX managed provider** (#147052): Mac local LLM alternative.
- **Delegate SOUL inheritance** (#131211): Opt-in `delegation.inherit_soul`.
- **Kanban auto-estimation** (#147217): XS/S/M/L/XL, todo decomposition.
- **CaMeL security guard** (#3987): Opt-in capability guard plugin.
- **Native button approval fix** (#124974): Resolve correct request, not FIFO-oldest.
- **Session key parsing** (#147197, #147196): Per-user slot, Slack scope.

### High-demand features (chưa có PR)

- iOS/Android mobile app (#11911): Voice calling.
- Emoji quick-insert (#42182): Desktop composer.
- Rich-text composer (#64248): WYSIWYG.
- Cron metadata (#68482): Tags, category, description.

---

**Kết luận**: Stability focus. Gateway blocking, duplicate events, redaction leaks đang fix. oMLX cho Mac merged. Mobile beta full, session invalidation, smart approval destruction là pain points lớn. Không có release, nhưng 30+ PR đóng/mở xử lý edge cases và security. Roadmap không công khai, inferred từ open work.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-11-01

## 📊 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang ở giai đoạn **ổn định hóa sau growth**. Các dự án mature (Hermes, OpenClaw) focus stability – memory leaks, gateway crashes, security boundaries. Dự án nhỏ (NanoClaw, NullClaw, PicoClaw) maintenance mode hoặc slow velocity. QwenPaw production hardening – deployment bugs, proxy configs, streaming fixes.

**Tín hiệu chính:** Không có release nào. Tất cả 9 dự án đang fix bugs thay vì ship features.

---

## 📈 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity Level | Community Engagement |
|-------|--------|-----|----------|----------------|---------------------|
| **Hermes Agent** | 113 | 500 | 0 | 🔥 Cao nhất | 30💬 (gateway), 21💬 (mobile), 16💬 (kanban) |
| **OpenClaw** | 115 | 500 | 0 | 🔥 Cao | 8💬 (memory), 7💬 (update fails), 6💬 (search) |
| **QwenPaw** | 9 | 14 | 0 | ⚡ Trung bình | 4💬 (MCP protocol), 0 reactions |
| **NanoBot** | 2 | 8 | 0 | 💤 Thấp | 0 reactions, 3💬 (checkpoint) |
| **ZeroClaw** | 6 | 50 | 0 | ⚡ Trung bình | 8💬 (RAG RFC), security PRs tagged `high-risk` |
| **PicoClaw** | 1 | 6 | 0 | 💀 Stale | 1💬, auto-close bugs, 8-month backlog |
| **NanoClaw** | 1 | 3 | 0 | 💤 Thấp | 0 reactions, 4💬 (WebSocket timeout) |
| **NullClaw** | 1 | 2 | 0 | 💤 Thấp | 0 reactions/comments |
| **IronClaw** | 0 | 0 | 0 | 💀 Không hoạt động | N/A |

**Phân loại:**
- **Tier 1 (enterprise-ready):** Hermes, OpenClaw – high volume, active triage, production hardening
- **Tier 2 (active development):** QwenPaw, ZeroClaw – moderate velocity, specific domains
- **Tier 3 (maintenance/stale):** NanoBot, NanoClaw, NullClaw, PicoClaw – low engagement
- **Tier 4 (dormant):** IronClaw

---

## 🎯 3. Vị thế Hermes Agent

### Thống trị chỉ số
- **Volume:** 113 issues + 500 PRs (nhiều nhất, ngang OpenClaw)
- **Engagement:** 30 comments/issue top (vs 8 ở OpenClaw, 0 ở NanoBot/NullClaw)
- **Scope:** Multi-channel (desktop, mobile, Slack, Telegram), multi-backend (oMLX, llama.cpp, gateway)

### Vai trò trong hệ sinh thái
**"Enterprise-grade all-in-one platform"** – so với:
- OpenClaw: self-hosted focus, operational tooling (cron, memory thresholds)
- ZeroClaw: security-first, authorization boundaries
- QwenPaw: developer platform, channel integrations

Hermes đầu tư **stability + UX breadth**. OpenClaw đầu tư **operational observability**. ZeroClaw đầu tư **security model**.

### Điểm mạnh
1. **Cộng đồng active nhất** – feedback loops nhanh (desktop translucency 3 issues, Kanban 16💬)
2. **Multi-platform** – macOS oMLX, mobile beta, gateway unification
3. **Production signals** – memory leaks (#145999 30s block), OOM kills (#147342 duplicate events)

### Điểm yếu
1. **Complexity bloat** – 30+ PRs/day xử lý edge cases (config blank write, SSH ControlMaster path, translucency stuck)
2. **Mobile beta friction** – Android tester limit full (#147269), iOS scroll stutter (#147321)
3. **Breaking changes** – HERMES_HOME move invalidates sessions (#146480), no migration path

---

## 🔧 4. Hướng kỹ thuật chung

### A. Gateway/Backend Stability (Hermes, OpenClaw, QwenPaw)
- **Memory leaks:** OpenClaw RSS +0.1 GiB/h (#182369), Hermes gateway block 30s (#145999), V8 heap 650MB idle (#159858)
- **OOM handling:** OpenClaw 22.9GB peak OOM-killed (#184843), Hermes delivery race (#147382)
- **Event deduplication:** Hermes Slack duplicate turn (#147342), QwenPaw Feishu race (#8511)

### B. Security Hardening (ZeroClaw, Hermes)
- **Authorization boundaries:** ZeroClaw admin-only SOP (#11220), session isolation (#11230), Hermes smart approval bypass (#147373)
- **Secret redaction:** Hermes 3 leak paths (#147075), argv dumps, recursive searches
- **Sandbox escapes:** QwenPaw Office COM RCE (#8028), ZeroClaw Wasmtime patches (#12129)

### C. Protocol Compatibility (QwenPaw, NanoClaw)
- **MCP legacy fallback:** QwenPaw `server/discover` 404 → no `initialize` handshake (#8424)
- **Streaming SSE:** QwenPaw Nginx buffer (#8522), NanoClaw Codex WebSocket timeout (#3338)

### D. Local LLM Support (Hermes, QwenPaw)
- **Mac optimization:** Hermes oMLX managed provider (#147052), QwenPaw vllm-metal docs (#8355)
- **Quantization:** Model picker truncates (#35115), MLX weights from HF

### E. Test Hermeticity (Hermes, OpenClaw, ZeroClaw)
- **Isolation failures:** Hermes ContextVar leak (#147198), OpenClaw Ollama discovery (#147073), ZeroClaw PowerShell cache corruption (#12164)

---

## 🌟 5. Điểm khác biệt

### Chiến lược sản phẩm

| Aspect | Hermes | OpenClaw | ZeroClaw | QwenPaw |
|--------|--------|----------|----------|---------|
| **Target user** | Enterprise + prosumer | Self-hosted operators | Security-conscious orgs | Developers (channels) |
| **Deployment** | Managed + desktop | Self-host required | CLI + optional daemon | Hub + containers |
| **UX priority** | Multi-platform polish | Operational observability | Authorization clarity | Integration breadth |
| **Risk tolerance** | Move fast, fix stability | Conservative, uptime focus | Security-first, slow features | Fast iteration, hardening |

### Tính năng độc quyền

**Hermes:**
- Desktop app (translucency, oMLX, Windows junctions)
- Mobile beta (iOS/Android voice calling demand #11911)
- Kanban deep links (#140324)

**OpenClaw:**
- Memory Search embedding (#137265)
- Cron metadata (#68482 backlog)
- Skill Workshop verification (#150250)

**ZeroClaw:**
- OIDC dashboard sign-in (#11965)
- SOP (Standard Operating Procedure) execution
- Knowledge corpus RAG RFC (#11235)

**QwenPaw:**
- Multi-channel native (QQ, Feishu, Telegram)
- Office COM automation (risky, being locked down)
- Browser extension support

### Cộng đồng

**Hermes:** High engagement but **pain point saturation** (translucency 3 dupes, session invalidation no fix, Android beta full)

**OpenClaw:** Moderate engagement, **operational focus** (memory thresholds, cron filters, IMAP durable)

**ZeroClaw:** Low comment count but **high-quality contributions** (distinguished contributors, RFC process)

**QwenPaw:** Active bug reports but **no reactions** → users report, don't discuss

**NanoBot/NanoClaw/NullClaw/PicoClaw:** Minimal engagement → **maintainer-driven**, not community-driven

---

## 👥 6. Mức độ trưởng thành cộng đồng

### Hermes Agent: **Production Maturity ⭐⭐⭐⭐**
- **Feedback velocity:** 30💬/issue, bugs get PRs trong 24h
- **User sophistication:** Report với environment details, netstat output (#147373 destruction report 188k files)
- **Gaps:** Mobile beta scaling (tester limit), breaking changes (HERMES_HOME move)
- **Roadmap visibility:** Inferred only, no public roadmap

### OpenClaw: **Operational Maturity ⭐⭐⭐⭐**
- **Triage system:** ClawSweeper labels (`needs-maintainer-review`, `source-repro`, `linked-pr-open`)
- **User type:** Self-hosted operators với memory/stability concerns
- **Gaps:** Memory leaks block adoption, update failures recurring
- **Roadmap:** Inferred, stability-first

### ZeroClaw: **Security Maturity ⭐⭐⭐⭐**
- **Review rigor:** 7/13 open PRs tagged `domain:security` hoặc `risk:high`
- **RFC process:** Knowledge corpus RFC #11235 (8💬, design discussion)
- **Gaps:** Low engagement (comments), high churn (release blockers)
- **Roadmap:** v0.9.0 gate clear (admin boundaries)

### QwenPaw: **Integration Maturity ⭐⭐⭐**
- **Bug quality:** MCP protocol failure #8424 (detailed steps), Feishu 426 (#8315 proxy config)
- **Channel breadth:** QQ, Feishu, Telegram native adapters
- **Gaps:** No reactions → passive users, UX regression complaints (v2 slow)
- **Roadmap:** Deployment hardening focus

### NanoBot/NanoClaw/NullClaw: **Early Stage ⭐⭐**
- **Pattern:** Maintainer fixes bugs, community silent
- **NanoBot:** Tool call injection fixed, no engagement
- **NanoClaw:** Telegram fixes, WebSocket timeout open 2 months
- **NullClaw:** Exa search broken, fix PR same day but no review
- **Gaps:** No community momentum

### PicoClaw: **Stale/Abandoned ⭐**
- **Signals:** 8-month backlog cleanup, critical bug (#3439) auto-closed, PR contributors ignored
- **Assessment:** Understaffed or deprioritized

### IronClaw: **Dormant 💀**
- Zero activity. Archived or pre-launch.

---

## 🔮 7. Tín hiệu xu hướng

### A. Stability Plateau (2026-11-01 snapshot)
**Tín hiệu:** 9/9 dự án không có release. Tất cả đang fix bugs.

**Nguyên nhân:**
1. **Post-growth consolidation** – Hermes/OpenClaw có 500 PRs, đang dọn backlog
2. **Production hardening** – Memory leaks, OOMs, gateway crashes đang blocking
3. **Security tightening** – ZeroClaw 7 security PRs, Hermes redaction leaks, QwenPaw COM bypass

**Dự đoán:** Q4 2026 release cycle restart sau khi stability debt trả xong.

### B. Local LLM Acceleration
**Tín hiệu:** Hermes oMLX (#147052), QwenPaw vllm-metal (#8355), both target Apple Silicon.

**Driver:** 
- Privacy (on-device inference)
- Cost (no API fees)
- Latency (local < cloud)

**Bottleneck:** Quantization UX (model picker truncates #35115), MLX weights distribution.

**Dự đoán:** 2027 sẽ có first-class MLX/MPS providers, HuggingFace integration native.

### C. Authorization Model Divergence
**ZeroClaw approach:** Explicit admin boundaries, SOP gates, session isolation (#11220, #11230, #11234)

**Hermes approach:** Smart approval gates (#147373 bypassed with PowerShell redirection)

**Tín hiệu:** ZeroClaw delay features cho security correctness. Hermes ship fast, patch exploits reactive.

**Dự đoán:** Compliance-heavy orgs chọn ZeroClaw. Velocity-focused teams chọn Hermes. OpenClaw middle ground (self-hosted = implicit trust boundary).

### D. Multi-Channel Commoditization
**QwenPaw:** QQ, Feishu, Telegram native. Office COM integration (risky).

**Hermes:** Slack, Telegram, mobile app demand (#11911).

**Tín hiệu:** Channel adapters không còn differentiator. Bảng cược chuyển sang:
1. **Voice calling** (mobile app #11911 high demand)
2. **Rich media** (QwenPaw media accumulation #8034, NanoClaw Telegram rich text #4243)
3. **Real-time streaming** (SSE buffer issues #8522, WebSocket timeouts #3338)

**Dự đoán:** 2027 sẽ có voice-first agents, video context windows.

### E. Operational Observability Arms Race
**OpenClaw pain points:** Memory thresholds hardcoded (#90713), cron metadata flat (#68482), session search không index (#137265)

**Hermes pain points:** Session invalidation (#146480), model switch cumbersome (#8521), no per-reply latency (#8518)

**Tín hiệu:** Users self-hosting cần dashboards, metrics, alerting. Managed platforms (Hermes Hub) hide complexity nhưng kém config.

**Dự đoán:** Self-hosted sẽ demand Prometheus metrics, OpenTelemetry traces. Managed platforms sẽ thêm cost/latency breakdowns.

### F. Community Bifurcation
**Tier 1 (Hermes, OpenClaw):** High engagement, production users, stability focus.

**Tier 2 (ZeroClaw, QwenPaw):** Moderate engagement, niche strengths (security, channels).

**Tier 3 (NanoBot, NanoClaw, NullClaw):** Maintainer-driven, no community.

**Tier 4 (PicoClaw, IronClaw):** Stale/dormant.

**Tín hiệu:** Winner-take-most. Hermes/OpenClaw pull away. Smaller projects consolidate hoặc chết.

**Dự đoán:** 2027 hệ sinh thái thu hẹp. 2-3 platforms dominant (Hermes enterprise, OpenClaw self-host, ZeroClaw security). Còn lại merge hoặc archive.

---

## 🎯 Kết luận chiến lược

### Cho Hermes Agent:
1. **Leverage lead** – Volume + engagement cao nhất. Double down stability (memory, gateway) để convert users từ Tier 2/3.
2. **Fix mobile beta scaling** – Android tester limit (#147269) block viral growth.
3. **Migration paths** – HERMES_HOME invalidation (#146480) phá user trust. Add export/import sessions.
4. **Roadmap public** – Inferred roadmap không đủ. Publish quarters để align contributors.

### Cho competitors:
- **OpenClaw:** Operational dashboards differentiator. Add Prometheus metrics, beat Hermes self-host.
- **ZeroClaw:** Security certification path (SOC 2, FedRAMP). Compliance = enterprise moat.
- **QwenPaw:** Channel breadth commodity hóa. Pivot voice/video hoặc vertical (customer support, sales).

### Cho ecosystem:
Consolidation inevitable. Smaller projects (NanoBot, NanoClaw, NullClaw) cần:
1. **Niche defensibility** – Find 1 thing better than Tier 1
2. **Merge upstream** – Contribute features vào Hermes/OpenClaw
3. **Pivot hoặc archive** – Maintenance mode không sustainable

**Bottom line:** Hermes winning breadth. OpenClaw winning depth. ZeroClaw winning security. Rest racing obsolescence.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw ngày 2026-11-01

## 1. Tóm tắt hôm nay

Ngày hôm nay chủ yếu là fix bugs và merge PRs tích lũy. Nhiều PRs đóng (9 PRs merged trong danh sách), tập trung vào memory leaks, test fixes, và UI improvements. Không có release mới.

## 2. Releases

Không có releases trong 24h qua.

## 3. Tiến độ dự án

**PRs nổi bật:**

- **#189951** (merged): Fix test drain failures do steer fixture bỏ session claim - cleanup regression
- **#189948** (open): Sửa fixture cleanup custody - test infrastructure stability  
- **#189944** (merged): Unicode NFC normalization cho search UI - người dùng gõ "münchen" giờ tìm được "München"
- **#185180** (open): Fix Codex turns fail "settlement closed" sau 6 phút - critical availability bug
- **#188294** (open): Workspace exclude generated files khỏi memory search - người dùng yêu cầu từ #101422

**Xu hướng:**
- Nhiều test infrastructure fixes - ổn định CI/CD
- UI search improvements - chuẩn Unicode canonical forms
- Memory system tweaks - exclude patterns, auto-capture refinements

## 4. Điểm nổi bật cộng đồng

**Issues nhiều comments (>=6):**

- **#159858** (8 bình luận): Worker isolates giữ 650MB V8 heap ở idle - yêu cầu memory release config
- **#181958** (7 bình luận): Update failure trên darwin/arm64 - package-doctor blocking
- **#137265** (6 bình luận): Memory Search không index sessions source - embedding chỉ hoạt động với memory source
- **#180941** (6 bình luận): Agents lặp `sessions_yield` sau `nothing_pending` thay vì tìm task tools

Chủ đề nóng: memory management, update blockers, agent loop behaviors.

## 5. Ổn định & Bugs

**Critical/P1:**

- **#182369**: Gateway RSS tăng ~0.1 GiB/h off-heap, `rss_threshold` monitor không fire - memory leak serious
- **#184843**: Gateway OOM-killed sau 2-4 ngày, 22.9GB cgroup peak, startup 56-125s
- **#137263**: Heartbeat cron timeout 600s sau mỗi assistant text - toàn bộ agents/providers
- **#188424**: Gateway 2026.10.8 reject own PID "different namespace" trên systemd Ubuntu VM

**P2 regression:**

- **#167415** (closed): Sidebar expand/archive buttons đổi chỗ nhau khi hover - overclick archives session
- **#182246**: Queue cap drops replay durable ingress đến retries exhaust

Nhiều memory/stability issues nghiêm trọng. Team focus vào leaks và restart recovery.

## 6. Yêu cầu tính năng

**Top feature requests:**

- **#150250** (P3): Skill Workshop - verify learning coverage, behavioral reuse
- **#179685**: IMAP durable processing handoff, per-message outcomes inspection
- **#177342**: `cron list` filtering (schedule kind, run status, trigger) + sorting
- **#180550**: Video codec compatibility - iPhone/iPad recordings không ingest được

**Infrastructure:**

- **#181791**: Durable owner-native execution provenance - safe interruption recovery cho long-running work
- **#177287**: Expose `OPENCLAW_SQLITE_JOURNAL_MODE` env override

Cộng đồng muốn operational visibility (cron filters, approval history details) và reliability (IMAP durable, video formats).

## 7. Phản hồi người dùng

**Positive implicit:**

- UI/UX fixes được merge nhanh (#189944 Unicode search)
- Test infrastructure được ưu tiên - CI stability matter

**Pain points:**

- Memory leaks trên production (#182369, #184843) - blocking self-hosted setups
- Update failures recurring (#181958, #189778, #189643) - deployment friction
- Codex timeout behaviors (#185180) - long-running turns fail unexpectedly

Users chạy self-hosted gateway gặp nhiều stability issues. Team responsive với bug reports nhưng root causes phức tạp (off-heap leaks, systemd namespace detection).

## 8. Backlog & Roadmap

**Inferred priorities từ labels:**

1. **Stability first**: 4 P1 memory/crash issues open
2. **UX polish**: Many P2/P3 UI improvements in review pipeline
3. **Enterprise features**: Durable execution provenance, IMAP reliability - longer-term plays

**ClawSweeper triage active:**

- `clawsweeper:needs-maintainer-review`: 15+ issues chờ maintainer look
- `clawsweeper:source-repro`: Many bugs có repro steps nhưng chưa có fix PR
- `clawsweeper:linked-pr-open`: 10+ issues có PR draft hoặc stalled

Backlog lớn nhưng có hệ thống triage rõ ràng. Memory leak issues block nhiều self-hosted users.

---

**Kết luận**: Ngày tập trung fix technical debt (tests, memory, Unicode). Không có big feature releases nhưng nhiều quality-of-life improvements merged. Production stability (memory leaks, OOMs) là concern lớn nhất cho self-hosted operators.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích NanoBot - 2026-11-01

## 1. Tóm tắt hôm nay

Ngày yên ắng. Không có release. Hoạt động tập trung vào đóng PR#6147 (bug bảo mật tool calls) và cập nhật 7 PR đang mở. 1 issue mới về transcribe audio Signal, 1 issue cũ về recovery checkpoint.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đóng (P1 - priority cao)**
- **#6147** - Fix tool call injection: assistant text chứa `<tool_call>` markup bị execute thành tool thực. Xóa plaintext extraction, chỉ dùng structured tool-call fields từ API. **Merged 31/10** - bug bảo mật quan trọng.

**PR đang mở - các hướng phát triển:**

*Provider ecosystem (3 PRs)*
- **#6446** (P2) - Thêm Runcrate provider (OpenAI-compatible gateway)
- **#5718** (P2) - OpenRouter native image generation API
- **#5825** (P2) - Provider-neutral structured decision client, thay JEV-specific client

*Channel/API improvements (3 PRs)*  
- **#6163**, **#6264** (P2) - Deliver provider retry-wait notices đến channels qua `sendProgress` hook (2 PR giải quyết cùng issue #5585)
- **#6194** (P2) - Fix session lock leak: dùng `WeakValueDictionary` để release idle locks

*Skills system (1 PR)*
- **#5405** (P2) - Manual-only skill invocation: `disable-model-invocation: true` cho skills có side effects (deploy, publish)

**Xu hướng**: Mở rộng provider support, fix resource leaks, tăng control cho skills nguy hiểm.

## 4. Điểm nổi bật cộng đồng

**#6534** (mới 31/10) - Transcribe audio Signal: voice notes Signal chưa được transcribe tự động, channels khác đã có. 0 comments, issue mới toanh.

**#5747** (3 comments) - Recovery checkpoint crash-consistency: nếu tool A xong, tool B chạy, gateway crash trước tool C → checkpoint vẫn ghi pending cho tất cả. Recovery không phân biệt được. Cần persist completed tool results tại execution-batch boundaries.

Không có PR/issue nào trending (0 reactions trên tất cả).

## 5. Ổn định & Bugs

**Fixed:**
- Tool call injection (#6147) - **security critical**, đã merge

**Open bugs:**
- Session lock leak (#6194) - API requests để lại locks mãi mãi
- Retry-wait events bị drop (#6163, #6264) - duplicate effort, 2 PR cùng fix 1 issue
- Recovery checkpoint window (#5747) - partial tool completion không được track

**Assessment**: Có duplicate work trên retry-wait issue. Lock leak ảnh hưởng memory long-running instances.

## 6. Yêu cầu tính năng

- **Signal audio transcription** (#6534) - parity với channels khác
- **Manual-only skills** (#5405) - safety cho destructive operations
- **Runcrate provider** (#6446) - thêm gateway option
- **OpenRouter images** (#5718) - native image gen API
- **Structured decision client** (#5825) - provider-agnostic reasoning

Focus: safety controls (manual skills), provider expansion, channel parity.

## 7. Phản hồi người dùng

Ít tương tác. Issues mới không có discussion. PR reviews không public trong data.

Signal transcription (#6534) là pain point thực tế: inconsistent behavior giữa channels.

## 8. Backlog & Roadmap

**P1 work done**: Security fix merged.

**P2 backlog** (8 open PRs): Provider expansion, resource management, channel parity, skills safety.

**Recovery/reliability** (#5747): Chưa có PR, vấn đề architectural - cần design crash-consistent checkpoint protocol.

**Next likely merges**: Session lock fix (#6194) - clear win. Retry-wait PRs cần consolidate (2 PRs overlap).

---

**Tín hiệu**: Dự án ổn định, velocity thấp (1 merge/day), focus vào quality và safety. Community engagement yếu.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw 2026-11-01

## 🎯 Tóm tắt hôm nay

Closed 4 PRs/issues bao gồm bản vá bảo mật Wasmtime (RUSTSEC-2026-0420 đến 0424), `/load-session` cho ZeroCode, CLI-only build, và shell command parser fix. Tiếp tục xử lý security boundary issues trong agent authorization, session isolation, và tool access control.

## 📦 Releases

Không có releases mới.

## 🚀 Tiến độ dự án

**Security & Authorization (Release blocker v0.9.0):**
- #11220: SOP execution cần admin authority - chặn non-admin chạy SOP steps, ngay cả với wildcard selector
- #11230: Session-data tools chỉ cho admin - sửa `spawn_subagent` leak memory của owner, `cron/list` expose sessions cross-user
- #11234: RPC session ownership check current authority thay vì saved principal - fix authorization bypass
- #11313: `config set/patch` publish auth changes vào running daemon - trước đây edit saved nhưng daemon không reload
- #11266: Subagent và pipeline memory phải private - `spawn_subagent` đã leak owner memory cho child

**Agent-to-agent tools:**
- #12169 [BUG]: `send_message_to_peer` từ headless SOP step start recipient turn ngoài tool scope
- #12167 [BUG]: `send_message_to_peer` ignore sender autonomy level và action budget
- ✅ #12170 [FIX]: Inherit SOP step scope khi peer-send
- ✅ #12168 [FIX]: Enforce Act policy trên `send_message_to_peer`

**CLI & Distribution:**
- ✅ #12111: CLI-only install script - install CLI build trước, switch sang standard build khi cần dashboard
- ✅ #11971: CLI-only source build không gateway/dashboard - cho servers và minimal installs
- #12172: Lifecycle remedy paths bắt đầu với `-` cần prefix `./`

**Security patches:**
- ✅ #12129: Bump Wasmtime 48.0.7 → 48.0.8 fix 5 RustSec advisories
- ✅ #11822: Split POSIX commands tại substitution/subshell boundaries - scanner trước đây miss `)`, backtick, brace expansion
- #12149: MCP SSE endpoints confined to server origin - chặn server send headers/JSON-RPC to other origins
- #12150: macOS Seatbelt home-dotfile regex emit single backslash - fix không match `~/.cargo`, `~/.nvm`

**ZeroCode UX:**
- ✅ #12071: `/load-session <name|id>` resume saved sessions - trước đây chỉ có Ctrl+S picker
- #11727: Reopen sessions khi ZeroCode restart - sidebar list hiện chỉ in-memory
- #11730: Show foreground delegate tool calls trong parent turn - hiện im lặng cho đến khi child answer
- #11457: F5 refresh session không cancel - keep drafts, attachments, selection

**Other:**
- #12159: `zeroclaw --version` giờ có build id `(99bd353)` - installer summary extract field 2 thay vì last field
- #12166: Windows prebuilt release checksum verification
- #12164: Isolate PowerShell cache per nextest - parallel workers corrupt shared `~/.cache/powershell/StartupProfileData-NonInteractive`
- #12116: `send_message_to_peer` to Discord external peers reject với actionable error
- #11965: Opt-in OIDC dashboard sign-in - trước đây chỉ pairing code
- #11169: SOP parity cho cancel, dispatch-event, decision-models, graph-legend RPCs
- #11456: Opt-in subprocess memory watchdog `shell_max_memory_mb`
- #11589: Operator override exceeded cost limit với `cost.allow_override`

## 💬 Điểm nổi bật cộng đồng

**#11235 (RFC: RAG for agent, 8 comments, created 2026-09-29):**
Đề xuất knowledge corpus - document retrieval cho agent trả lời từ operator docs, language/tool docs, OS refs, security standards. Major capability boundary.

Các PR có activity cao nhất: security & authorization PRs (#11220, #11230, #11234) đều distinguished contributor, release-gate, high-risk. Cộng đồng quan tâm session isolation và admin boundaries.

## 🐛 Ổn định & Bugs

**Critical (blocking v0.9.0):**
- Admin authority boundary cho SOP và session-data tools (#11220, #11230, #11234, #11313, #11266)
- Agent-to-agent tool security (#12169, #12167) - `send_message_to_peer` bypass scope và autonomy checks

**Closed bugs:**
- ✅ Wasmtime RustSec advisories block CI
- ✅ Shell command parser miss substitution/subshell boundaries
- ✅ CLI-only build không supported install path

**Open bugs:**
- macOS Seatbelt regex không match home dotfiles (#12150)
- PowerShell cache corruption in parallel tests (#12164, #12152)
- MCP SSE endpoint không confined to origin (#12149)

## 🎨 Yêu cầu tính năng

**In progress:**
- OIDC dashboard sign-in (#11965) - single sign-on thay vì pairing code mỗi browser
- `/load-session` cho ZeroCode (#12071) - merged
- Session persistence across ZeroCode restarts (#11727)
- Foreground delegate visibility (#11730)
- Cost limit operator override (#11589)
- Subprocess memory watchdog (#11456)

**Proposed (RFC):**
- #11235: Knowledge corpus (RAG) cho agent - answer từ operator's documents và reference materials

## 👥 Phản hồi người dùng

User pain points từ issues/PRs:
- Security boundary confusion: non-admin có thể access cross-user sessions, run SOPs, bypass autonomy checks
- CLI-only users không muốn gateway/dashboard overhead
- ZeroCode sessions không persist qua restarts
- Foreground delegates "silent" - không thấy tool progress
- Cost limits hard-stop, không có override path
- Windows installer không verify checksums

Distinguished contributors active: @IftekharUddin (security boundaries), @JordanTheJet (SOP parity, CLI builds, OIDC), @Audacity88 (ZeroCode UX, cost overrides, memory watchdog).

## 🗺️ Backlog & Roadmap

**v0.9.0 blockers (release-gate PRs):**
- Admin authority cho SOP execution (#11220)
- Session-data tool admin-only (#11230)
- RPC session ownership current-authority (#11234)
- Config auth publish to daemon (#11313)
- Subagent/pipeline memory privacy (#11266)
- Wasmtime security bump (#12129)
- CLI-only install (#12111)

**Post-v0.9.0:**
- Gateway split (SOP parity #11169 đang chuẩn bị)
- Knowledge corpus (RFC #11235)
- Agent identity & access refinement tiếp tục

Security tightening là priority - 7/13 open PRs tagged `domain:security` hoặc `risk:high`. Codebase đang close authorization gaps trước khi gateway move out-of-process.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-11-01

## 1. Tóm tắt hôm nay

Dọn dẹp backlog. 6 PR cũ (từ tháng 3) đóng đồng loạt, issue stale về IPv6 binding đóng sau 16 ngày. Không có phát triển tính năng mới ngày hôm nay. Hoạt động chủ yếu: maintainer chốt các PR tồn đọng để giữ repo sạch.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**PR đóng (stale cleanup):**

- **#3443, #3442**: Bug fixes cho Telegram MarkdownV2 escaping và cron job status reporting. Đã mở 16 ngày, đóng không merge → có thể bị reject hoặc author không theo dõi
- **#3431**: Thêm Standard Compute provider (OpenAI-compatible gateway). Vẫn OPEN sau 17 ngày → đang review hoặc đợi maintainer decision
- **#1558, #1545, #1182**: PR merge/cleanup từ tháng 3 (8 tháng trước), đóng hôm nay → backlog lớn đang được dọn

**Xu hướng**: Maintenance mode. Không thấy PR mới merge trong dataset. Có thể team đang focus vào internal work hoặc slow period.

## 4. Điểm nổi bật cộng đồng

**Issue #3439** (đóng sau 16 ngày, 1 comment):
- User @Seng-Jik báo bug nghiêm trọng: `picoclaw-launcher` crash khi dùng `-public` + `-host` cùng lúc
- IPv6-only binding khi chỉ dùng `-public` → IPv4 clients không connect được
- Environment: OpenWrt aarch64, dual-stack kernel
- Đóng với label `[stale]` → không có fix trong 2 tuần, auto-close hoặc bị bỏ qua

Không có discussion, PR review comment nào trong dataset → cộng đồng ít tương tác hoặc activity diễn ra ngoài GitHub.

## 5. Ổn định & Bugs

**Bug chưa fix:**
- #3439: Network binding issue trên dual-stack systems. Critical cho production deployments trên OpenWrt/router environments
- #3426 (referenced trong #3443): Telegram MarkdownV2 formatting fails. PR có fix nhưng đóng không merge

**Bug có PR (không merge):**
- #3423: Cron job status luôn báo `"ok"` dù job fail. PR #3442 fix nhưng stale

Risk: Users trên OpenWrt/IPv6 networks gặp connectivity issues. Monitoring cron jobs không đáng tin cậy.

## 6. Yêu cầu tính năng

**PR #3431** (OPEN): Thêm Standard Compute provider
- Standard Compute = multi-model gateway với single API key
- OpenAI-compatible interface
- Author @henrikdukefoss (người làm cho Standard Compute) tự submit
- Vẫn open sau 17 ngày → maintainer chưa review hoặc chờ verification

Không có feature request issue mới trong dataset.

## 7. Phản hồi người dùng

**Negative signal:**
- Issue #3439: User report bug nghiêm trọng, không có maintainer response trong 16 ngày, auto-close
- Multiple PR contributors (@intrepid37, @henrikdukefoss) không nhận được feedback

**Chất lượng bug report tốt**: #3439 có environment details, netstat output, reproduction steps → nhưng không được xử lý.

## 8. Backlog & Roadmap

Không có roadmap info trong dataset.

**Suy luận từ activity:**
- 6 PR từ tháng 3 đóng cùng ngày → backlog cleanup sprint
- Stale bot active → tự động đóng items không activity
- PR #3431 còn open → có thể đang evaluate thêm providers

**Next steps có thể:**
- Review #3431 (Standard Compute integration)
- Fix #3439 nếu users tiếp tục report (critical cho OpenWrt users)
- Tiếp tục dọn stale issues/PRs

---

**Tín hiệu lo ngại**: Contributor PRs bị ignore, critical bug report đóng không fix, backlog 8 tháng mới dọn. Project có thể understaffed hoặc maintainer bandwidth thấp.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-11-01

## 1. Tóm tắt hôm nay

Ngày tập trung vào stability và security fixes. Hai PR mới đóng holes trong Telegram adapter (rich text formatting bug) và host-side error handling (đang nhầm operational errors với security violations). Issue cũ về Codex WebSocket timeout vẫn open, chưa có fix.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**PR đóng (#4111)**: Bot-to-bot admission gate cho Telegram
- Ngăn unbounded reply loops khi BotFather B2B mode bật
- Gated behind `TELEGRAM_BOT_INBOUND` flag
- Merged 2026-10-31

**PR mới (#4244)**: `AnchoredDir` error propagation fix
- **Vấn đề**: Ba call sites đang treat operational errors (ENOSPC, EACCES, EMFILE) như unsafe-path refusals
- **Impact**: Disk/permission failures xuất hiện như security rejections thay vì actual errors
- **Scope**: Sessions, skills, security layer
- Tagged `follows-guidelines`, đang review

**PR mới (#4243)**: Telegram rich text escaping
- **Bug**: Adapter 4.41.1 gửi rich messages, dollar signs trigger math formula rendering, newlines collapse
- **Fix**: `fixTelegramRichText` transformer escape `$` và preserve line breaks
- Fresh PR, chưa có feedback

**Xu hướng**: Hardening channels (Telegram) và core infrastructure (error handling, path security).

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có engagement cao (tất cả 0 reactions). Activity tập trung ở maintainer contributions.

## 5. Ổn định & Bugs

**Active bugs**:

1. **#3338**: Codex WebSocket idle retry không surface lên NanoClaw
   - Codex CLI tự retry sau 5 phút timeout
   - `codex app-server` không báo failure → NanoClaw đợi 10 phút mới timeout
   - User experience: silent stall trên simple Telegram requests
   - 4 comments, open từ 2026-08-18, updated 2026-10-31 nhưng chưa có fix

2. **#4243**: Telegram rich text rendering issue
   - `$100 to $200` → renders như LaTeX math
   - Bullet lists collapse
   - Fix đang review

3. **#4244**: Error handling confusion
   - Disk/permission errors mislabeled như security violations
   - Khó debug, unclear error messages
   - Fix đang review

## 6. Yêu cầu tính năng

Không có feature requests mới. PR #4111 (bot admission gate) là feature đã merged.

## 7. Phản hồi người dùng

Issue #3338 report từ user về silent timeout experience. Không có public feedback khác trong window này.

## 8. Backlog & Roadmap

**Immediate backlog**:
- #3338 (WebSocket timeout visibility) - chưa có owner
- #4244 review/merge (error propagation fix)
- #4243 review/merge (Telegram escaping)

**Implied roadmap**: Telegram channel đang được polish (đã có admission gate, rich text fix đang đến). Core stability layer (error handling, path security) đang được tighten.

Không có public roadmap artifacts trong dataset.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-11-01

## 🔍 Tóm tắt hôm nay

Dự án gặp bug nghiêm trọng: tìm kiếm web với Exa bị lỗi hoàn toàn do gửi `Content-Type` hai lần. @Krakazybik phát hiện, mở issue và PR fix trong cùng ngày. Thêm PR dịch tài liệu tiếng Nhật.

## 📦 Releases

Không có.

## 🚀 Tiến độ dự án

**Bug fix nhanh:**
- #1086: Sửa lỗi HTTP header duplicate trong `curlRequestWithProxy`
- Root cause: hàm set `Content-Type` mặc định rồi append thêm headers từ caller → Exa nhận 2 `Content-Type` → trả về 400
- Fix: bỏ qua `Content-Type` từ caller nếu đã có `content_type` param
- Tác động: `web_search` với Exa lại hoạt động

**Mở rộng i18n:**
- #1084: Thêm docs tiếng Nhật
- Xu hướng: dự án quan tâm thị trường châu Á

## 💡 Điểm nổi bật cộng đồng

Không có tương tác nổi bật (0 comment, 0 reaction trên cả 3 mục).

## 🐛 Ổn định & Bugs

**#1085 - Web search Exa bị vô hiệu hóa hoàn toàn:**
- Severity: Cao (chức năng core không dùng được)
- Status: Có PR fix #1086 đang chờ review/merge
- Technical: Lỗi thiết kế HTTP client - không check header trùng lặp trước khi gửi
- Impact: Mọi request `web_search` với `search_provider: "exa"` fail với `error.InvalidResponse`

## ✨ Yêu cầu tính năng

Không có.

## 💬 Phản hồi người dùng

Không có feedback mới. Issue được báo cáo từ kinh nghiệm sử dụng thực tế (Exa trả về HTTP 400 với message rõ ràng về duplicate header).

## 🗺️ Backlog & Roadmap

Không có thông tin roadmap trong data. Ưu tiên hiện tại: merge #1086 để khôi phục Exa search.

---

**Nhận xét:** Velocity phản ứng tốt (issue → PR trong 24h) nhưng thiếu tương tác reviewer. Bug nghiêm trọng chưa được merge sau 1 ngày.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-11-01

## 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa lỗi: 9 issues mới (8 bugs + 1 feature request), 14 PRs (2 merged/closed, 12 đang mở). Chủ đề chính: deployment issues, streaming responses, security hardening.

---

## 🚀 Releases

Không có.

---

## 🔧 Tiến độ dự án

### PRs quan trọng đang mở:

**Infrastructure & Deployment:**
- **#8519** - Fix Docker runtime permission: container chạy root → ghi `config.json` → Hub non-root không đọc được → fail restart. Thêm `chown` sau atomic save.
- **#8515** - Crash trong fnOS sandbox: dependency lock path dùng `pwd.getpwuid().pw_dir` thay vì `$HOME` → write vào read-only dir. Cần respect `QWENPAW_DEPENDENCY_STATE_DIR`.

**Streaming & Real-time:**
- **#8522** - Nginx proxy buffer SSE: `/api/console/chat` thiếu `X-Accel-Buffering: no` → first event bị buffer. PR thêm header.
- **#8409** - QQ channel thêm streaming reply API (giống Feishu).

**Token & Cost:**
- **#8060** - Anthropic cache token không đếm vào context meter: `usage.input_tokens` chỉ count uncached, `cache_read_input_tokens` bị bỏ qua → meter sai.
- **#8034** - Media accumulation: per-file cap 2MB OK, nhưng request body không bị bound → nhiều ảnh nhỏ → multi-MB body mỗi turn → gateway reject.

**Security:**
- **#8028** - Office COM automation: `PowerShell.Application` với `approval: auto` + sandbox off → bypass approval → RCE risk. PR thêm detection.

**Channels:**
- **#8338** (CLOSED) - Telegram quote reply: `reply_to_message` bị drop → agent không có context. PR fixed.
- **#8520** - `/approval` command hard-coded Chinese → agent English reply Vietnamese. PR i18n approval messages.

**Testing:**
- **#8031** - Unit test leak coroutine: mock scheduler không consume → `RuntimeWarning` noise.
- **#8510** - Plugin unittest speedup.

**Config:**
- **#8029** - Browser extension không load: `args` chỉ append, không remove Playwright default `--disable-extensions`. PR thêm `drop_default_args`.
- **#8061** - Custom gateway không declare OpenAI prompt cache params → `cache_request()` reject.

**Context Management:**
- **#7211** - Injected context persist: `HookContext.inject_context()` lưu vào history → search pollution.

---

## 💬 Điểm nổi bật cộng đồng

**Top interaction (4 comments):**
- **#8424** - MCP server legacy protocol fail: `server/discover` trả 404 + JSON-RPC -32601 → client treat as modern server → không fallback `initialize` handshake → legacy server chết.
- **#8315** - Feishu 426 Upgrade Required: `HTTPS_PROXY` inject nhưng `NO_PROXY` không có `feishu.cn` → WebSocket fail, token fetch fail.

**User pain points:**
- **#8521** - Response rỗng ngẫu nhiên, Ctrl+C copy cần nhấn nhiều lần, UI v2 slow hơn v1 (muốn toggle về old UI).
- **#8184** - Doom-loop gate kill legitimate long-running task polling → cron record false success.

---

## 🐛 Ổn định & Bugs

**Critical (deployment-breaking):**
1. **Docker permission** (#8517, #8519) - Non-root Hub crash.
2. **fnOS sandbox crash** (#8515) - Path resolution bypass `$HOME`.
3. **Feishu proxy** (#8315) - 426 error khi có proxy không exempt feishu.cn.

**High (functional impact):**
1. **MCP legacy protocol** (#8424) - Fallback handshake bị block.
2. **Streaming buffer** (#8516, #8522) - Nginx proxy delay first event.
3. **Feishu race condition** (#8511) - `ProviderError: No active model` khi message overlap.
4. **Media accumulation** (#8034) - Request body unbounded → gateway reject.

**Medium:**
1. **Doom-loop false positive** (#8184) - Kill valid polling.
2. **Token counting** (#8060) - Anthropic cache tokens missing.
3. **Office COM bypass** (#8028) - Auto-approval risk.
4. **Copy UX** (#8521) - Ctrl+C cần multi-press.

---

## ✨ Yêu cầu tính năng

**#8518** - Display per-reply latency: Console UI không show thời gian response. Token usage có, timing không.

---

## 💭 Phản hồi người dùng

**UX regression (v2 vs v1):**
- UI v2 chậm hơn, model switch cumbersome, nhiều whitespace lãng phí.
- Request: toggle về old UI.

**Stability concerns:**
- Response rỗng ngẫu nhiên (chưa rõ model hay client bug).
- Copy interaction flaky.

---

## 📋 Backlog & Roadmap

**Deployment hardening:**
- Permission model (Docker, sandbox environments).
- Proxy config documentation + auto-detect.

**Protocol compatibility:**
- MCP legacy fallback logic.
- Gateway capability negotiation.

**Observability:**
- Per-reply latency tracking.
- Token accounting cho cache layers.

**UX polish:**
- UI performance parity với v1.
- Clipboard interaction fix.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*