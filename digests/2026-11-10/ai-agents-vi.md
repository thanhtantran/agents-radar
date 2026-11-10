# Bản tin Hệ sinh thái Hermes Agent 2026-11-10

> Issues: 19 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-11-10 10:06 UTC

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

# Báo cáo Hermes Agent - 2026-11-10

## 🎯 Tóm tắt hôm nay

Patch release **v0.23.1** dropped, roll up ~618 PR since v0.23.0. Main activity: bug triage (Windows hang, Desktop connection kill, session switch block), plugin catalog expansion (12+ community plugin PR), storage refactor series merge prep.

---

## 📦 Releases

### v0.23.1 (2026-11-10)
- **Purpose**: Stability patch, fix plugin catalog size blow-past 2 MiB limit
- **Impact**: Every install since Nov 9 catalog publish hit size cap → install fail. Patch shrink catalog below limit
- **Scope**: CLI, installers, Microsoft Store, Docker, Hermes Cloud
- **Note**: Full curated notes deferred to v0.24.0

---

## 🔧 Tiến độ dự án

### Storage Refactor (Big multi-PR series)
6 PR chain migrate `SessionDB` → new storage interface:
1. ✅ #149565 - Interface + in-memory backend + contract tests
2. ✅ #149566 - SQLite backend (main schema, no caller yet)
3. 🟡 #151825 - Wire `SessionDB` through SQLite backend holder
4. 🟡 #149567 - All callers → storage interface
5. 🟡 #151855 - Remove `SessionDB` + old hermes_state modules
6. 🟡 #149571 - Clean up migration-only checks

**Status**: Step 1-2 merged, step 3-5 open, step 6 waiting. Desktop, gateway, ACP touch.

### Plugin Ecosystem Growth
12 catalog PR today (mix open/merged):
- **Tool plugins**: `undo-send` (#152063), `precog` (#152041 - watch terminal fail → success, keep fix), `tallyhand` (#152205 - Twitch chat untrusted input + role enforce)
- **Media backends**: `belive-aihub-media` (#150440 - image/video/speech/transcription, closed)
- **Desktop UX**: `pixel-hq` (#151442 - gamified fleet view), `quote-to-chat` (#150201 - Codex-style excerpt cards, closed), `multibot` (#152555 - multiple Telegram bot one profile)
- **Security/Monitoring**: `customs` (#151984 - fake credential trap), `patch-sentinel` (#151436 - OS patch status evidence)
- **Life balance**: `sabbath` (#152560 - weekly rest mode), `psychopomp` (#152559 - weekly life journal from agent knowledge)
- **Web**: `crawl4ai` (#150355 - bounded crawl + extraction, closed)

Hackathon submissions visible (`sabbath`, `psychopomp`, `pixel-hq` mention).

### Desktop i18n
Italian locale PR #134565 (10th bundled language, full coverage 5596 keys) + bump #152556 follow-up.

---

## 🔥 Điểm nổi bật cộng đồng

### High comment/interaction:
1. **#151351 (8 comment)** - Desktop Windows: TicketBridge kill python helper on 10s/30s timer → full boot re-run. Four self-termination path, any reject in-flight ticket with "bootstrap failed".
2. **#151348 (6 comment)** - Session switch block Electron main 2s per git call (Windows). `coding-status.repoStatus()` route through python host shim → block.
3. **#152330 (5 comment, 👍2)** - Telegram private topic: reply API success but invisible in Android. Existing topic work, new fail.

### User pain point visible:
- Windows Desktop performance (git shim block, TicketBridge premature kill)
- Telegram platform quirk (private topic, rich message format loss #151813)
- Gateway shutdown hang on orphaned tool child (#140162)

---

## 🐛 Ổn định & Bugs

### Critical/P1:
- **#142281** - Gateway dashboard auth refusal exit 1 (not 78) → systemd restart loop after update

### High Priority (P2):
- **#151351** - TicketBridge 4× self-termination path kill python helper prematurely
- **#151348** - Session switch block Electron main ~2s × 2 git call (Windows python shim)
- **#140162** - Gateway SIGTERM hang on orphaned tool children, no bounded subprocess sweep
- **#150617** - `run_notifications.py` ignore `completion_output_chars`, Bot Mode DM arrive empty

### Recent fixes (merged/closed):
- **#151813** - Telegram rich message keep #refs, late-start list, email text intact
- **#150469** - Git lock guard scope to pathspec + staged file (avoid false positive)
- **#151194** - Skill view dedup entry release if model only saw preview
- **#152531** - Skip post-turn recall warm-up on one-turn cron (no consumer)

### Platform-specific:
- **Windows**: #152551 (kanban worker hang, git child inherit stdin pipe), #152519 (Docker v0.23.1 `hermes pm install --extra mcp` refuse "pnpm outdated")
- **Telegram**: #152330 (private topic Android invisible), #151813 (rich format loss)

---

## ✨ Yêu cầu tính năng

### P2-P3 Feature Request:
- **#114029** - Filter reasoning-effort picker to model-supported level (not full Hermes ladder)
- **#152139** - Plugin API for context engine: token estimate, model threshold, pricing, built-in compressor
- **#110796** - Show full shell command in chat (Telegram, Matrix), not truncate

### Community Plugin Ideas (via PR):
- **sabbath** (#152560) - Weekly rest mode (default Sat 18:00 24h)
- **psychopomp** (#152559) - Weekly life journal card from agent knowledge
- **precog** (#152041) - Learn from terminal fail → success pattern, prevent repeat
- **customs** (#151984) - Fake credential trap, block hijacked agent
- **patch-sentinel** (#151436) - OS patch status evidence (apt/dnf/pacman adapter)

### Desktop UX:
- **#152528** - Plugin SDK expose read-only session status by durable ID
- **#152524** - Device-provisioning bundle (carry skill/memory/tool stack to sub-agent device)

---

## 💬 Phản hồi người dùng

### Pain point:
1. **Performance**: Windows session switch block main process, git shim overhead
2. **Reliability**: TicketBridge premature kill, gateway shutdown hang, credential pool 429 misattribute (#152549)
3. **Platform quirk**: Telegram private topic Android invisible, profile rename leave stale `local_policy` (#152554)

### Positive signal:
- Plugin ecosystem explode (12 PR today, hackathon drive)
- Community contribute fix (storage refactor, i18n, bug triage)
- Desktop plugin SDK request (#152528) show adoption

### Friction:
- Docker v0.23.1 broken `pm install --extra` (#152519)
- Plugin catalog size breach 2 MiB → install fail (patched v0.23.1)
- Desktop `/discard` only route through ACP, gateway reject (#152529) → no self-service recovery after power loss

---

## 📋 Backlog & Roadmap

### Active multi-PR track:
1. **Storage refactor** (6 PR chain, step 3-6 in-flight) - decouple storage backend from caller
2. **Plugin catalog growth** - community tier explode, hackathon submission peak
3. **Desktop i18n** - Italian full, more language incoming
4. **Windows performance** - git shim block (#151348), TicketBridge kill (#151351) under triage

### Deferred (blocked/waiting):
- Context engine plugin API (#152139) - no interface yet
- Reasoning-effort picker filter (#114029) - needs model capability registry
- Device provisioning bundle (#152524) - feature request only

### Cleanup after storage refactor:
- Remove `SessionDB` (#151855)
- Remove migration-only check (#149571)

### Known regression watch:
- fitness-nutrition USDA calorie bug (#152535 - kJ show as kcal, nutrient key by name not stable)
- Desktop preview via tool_call never register chip (#152534 - bridged row skip `recordPreviewArtifact`)
- write_file idle-reaped mid-call (#152557 - file tool outside GW-60 in-flight guard)

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-11-10

## 1. 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang phân hóa rõ: 3 nhánh chính xuất hiện.

**Nhánh enterprise/gateway** (Hermes Agent, OpenClaw, ZeroClaw): Focus stability, multi-tenancy, plugin ecosystem. High PR count (500), active community. Release cadence: patch-driven.

**Nhánh specialized** (NanoBot, NanoClaw, Qwen-Paw): Domain-specific (local-first, messaging, multimodal). Medium activity (30-43 PRs). Breaking changes frequent.

**Nhánh experimental** (PicoClaw, NullClaw, IronClaw): Low activity, provider expansion. Minimal community signal.

Pivot point hôm nay: storage refactor (Hermes), knowledge scoping (ZeroClaw), MLX inference (Qwen-Paw) → infrastructure consolidation phase.

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động chính | Cộng đồng |
|---|---|---|---|---|---|
| **Hermes Agent** | 19 | 500 | 1 (v0.23.1) | Plugin catalog (12 PR), storage refactor (6-PR chain), Windows perf fixes | 👥 Cao - hackathon submissions, first-time contributors |
| **OpenClaw** | 87 | 500 | 0 | Gateway blocking fixes (plugin reload, conversation list), session preservation | 👥 Cao - 13 cmt issue, multiple P0/P1 active |
| **ZeroClaw** | 7 | 50 | 0 (v0.9.0 đang chuẩn bị) | OIDC login, dashboard chat, agent knowledge scoping, multi-model schema v4 | 👥 Trung bình - contributors stable, security focus |
| **NanoBot** | 5 | 30 | 0 (v0.4.1 mới ship) | WebUI UX (scroll, theme), memory optimization, API server deprecation | 👥 Thấp - core team, minimal reactions |
| **NanoClaw** | 0 | 41 | 1 (v2026.11.0-beta.1) | Approval system 2-stage verification, Proton Mail, Mattermost fixes | 👥 Trung bình - community adapters, security incidents |
| **Qwen-Paw** | 12 | 43 | 1 (v2.3.0-beta.3) | MLX engine + GPU controls, QQ channel stability, Desktop plugin recovery | 👥 Cao - 2 first-time contributors merged today |
| **PicoClaw** | 0 | 5 | 0 | French locale, Perplexity integration, skill deduplication fix | 👥 Thấp - stale PRs, zero reactions |
| **NullClaw** | 0 | 1 | 0 | Keenable web search provider | 👥 Rất thấp - 1 PR chờ 7 ngày |
| **IronClaw** | 0 | 0 | 0 | Không hoạt động | 👥 Không có |

**Chỉ số nổi bật:**
- **PR velocity**: Hermes Agent + OpenClaw (500) >>> Qwen-Paw (43) > others
- **Issue engagement**: OpenClaw (87, nhiều cmt) > Qwen-Paw (12) > Hermes (19)
- **Release rhythm**: Qwen-Paw + NanoClaw (beta frequent) vs Hermes (stable patch)

---

## 3. 🎯 Vị thế Hermes Agent

### Strengths
**Plugin ecosystem explosion**: 12 catalog PR hôm nay (tool, media, security, life-balance). Hackathon drive visible (`sabbath`, `psychopomp`, `pixel-hq`). Community tier expanding fast.

**Multi-language coverage**: Italian locale (10th language) + 5596 keys full coverage. Desktop i18n maturity.

**Stability-first release**: v0.23.1 patch catalog size breach → every install Nov 9 failed. Fix ship same day.

### Weaknesses
**Windows performance debt**: 
- Session switch block main 2s × 2 git calls (#151348 - python shim overhead)
- TicketBridge 4× self-termination paths kill python helper (#151351)
- Kanban worker hang (#152551)

**Gateway shutdown hang**: Orphaned tool children (#140162) no bounded subprocess sweep.

**Storage refactor incomplete**: 6-PR chain step 3-6 in-flight. Risk: multiple merges touch Desktop, gateway, ACP.

### Position
**Hub trong hệ sinh thái**: Catalog size breach shows scale. Plugin API requests (#152139 context engine) signal adoption. Device provisioning bundle (#152524) → multi-agent fleet use case emerging.

So với OpenClaw: Hermes lighter (19 issues vs 87), faster release (v0.23.1 shipped). OpenClaw deeper infra problems (memory index OOM, MCP lifecycle leak).

So với Qwen-Paw: Hermes broader ecosystem (12 plugin types), Qwen-Paw deeper platform support (MLX, QQ, DingTalk).

---

## 4. 🔧 Hướng kỹ thuật chung

### Convergence patterns

**1. Storage abstraction** (3/9 projects active)
- Hermes Agent: SessionDB → storage interface (6-PR chain, SQLite backend)
- OpenClaw: Agent-scoped DB (#196255 - idle executor cap), conversation list worker (#196089)
- NanoBot: FTS5 search optimization (#5826), session lock leaks (#6194)

**Động lực**: Scale issues với nhiều agent (OpenClaw 20 agents CPU spike, Hermes plugin catalog 2 MiB).

**2. Session lifecycle hardening** (4/9 projects)
- OpenClaw: Queued send permissions persist (#196540), Codex session preservation (#196092)
- ZeroClaw: Multi-room message routing, idle session release
- NanoClaw: Approval 2-stage verification (#4168), unknown-sender holds (#3088)
- NanoBot: Cross-session input ownership (#6613)

**Động lực**: Production incidents (approval race, message leak, permission loss after restart).

**3. Local inference push** (2/9 projects)
- Qwen-Paw: MLX engine (#8647) + GPU controls (#8649) cho Apple Silicon
- ZeroClaw: Multi-model per provider (#9809), fallback schema v4

**Động lực**: Privacy, cost, latency. Qwen-Paw issue #8646: "llama.cpp says CPU by default despite Metal enabled."

**4. Channel adapter maturity** (3/9 projects)
- NanoClaw: Proton Mail (local Bridge), Mattermost mention logic (#4321)
- Qwen-Paw: QQ C2C image-only drop (#8651), DingTalk table render (#8601)
- Hermes Agent: Telegram private topic Android invisible (#152330)

**Động lực**: Platform quirks visible ở scale. Community contributors ship fixes (DingTalk table, workspace download).

---

## 5. ⚡ Điểm khác biệt

### Chiến lược sản phẩm

| Dự án | Focus | Trade-off |
|---|---|---|
| **Hermes Agent** | Plugin breadth, hackathon-driven | Storage refactor incomplete, Windows perf debt |
| **OpenClaw** | Enterprise stability, memory/MCP lifecycle | High issue count (87), slow release |
| **ZeroClaw** | Security + multi-tenancy | 3-month PRs (#9745 KG scoping, #11322 plugin RPC), no stable release |
| **Qwen-Paw** | Platform coverage (MLX, QQ, DingTalk) | Beta churn (beta.3 đóng 5 critical bugs), QQ instability |
| **NanoClaw** | Approval correctness, channel diversity | Breaking changes (v0.4.2 xóa API server, apiType, shared session) |
| **NanoBot** | Minimalism, memory optimization | Zalo refactor 8 tháng (#2078), low community signal |

**Pattern**: 
- **Breadth-first** (Hermes, Qwen-Paw): nhiều plugin/platform, bugs ở tail
- **Depth-first** (ZeroClaw, OpenClaw): infra refactor lớn, release chậm
- **Consolidation** (NanoBot, NanoClaw): cleanup phase, breaking changes

### Tính năng đặc trưng

**Hermes Agent unique**:
- Life-balance plugins (`sabbath` weekly rest, `psychopomp` journal)
- `precog` terminal fail-to-success learning
- `customs` fake credential trap

**OpenClaw unique**:
- Dead-lettered delivery queue (no cleanup tool #112313)
- view_image base64 waste (1.3% events, 80% bytes #143973)

**ZeroClaw unique**:
- OIDC login cho zerocode (#12317)
- Agent-scoped knowledge graph (#9745 - SQL injection prevention)

**Qwen-Paw unique**:
- Aliyun Token Plan `reasoning_effort` support (#7990)
- Mistral provider plugin collection (#8656)

**NanoClaw unique**:
- Proton Mail local Bridge integration (#3726)
- Approval card injection escape (#4156)

---

## 6. 👥 Mức độ trưởng thành cộng đồng

### Tier 1: Established (Hermes Agent, OpenClaw, Qwen-Paw)

**Signals**:
- First-time contributors merge same day (Qwen-Paw #8601 DingTalk, #8662 workspace download)
- Hackathon submissions visible (Hermes `sabbath`, `pixel-hq`)
- Issue engagement high (OpenClaw #138561 - 13 cmt, #144797 - 12 cmt)

**Community health**:
- Review velocity: Qwen-Paw merge contributors day 1, Hermes plugin catalog rapid approval
- Pain point feedback loop: OpenClaw user reports → P0/P1 triage visible, Hermes Windows perf issues documented
- Documentation: Qwen-Paw memory docs merged, NanoClaw README 49/183 claims stale → active refresh

### Tier 2: Growing (ZeroClaw, NanoClaw)

**Signals**:
- Stable contributor set (ZeroClaw @JordanTheJet 5 issues today, NanoClaw community adapters)
- Security incidents drive fixes (NanoClaw approval race #4168, ZeroClaw TLS flush #12355)
- Long review cycles (ZeroClaw plugin RPC 3 months, NanoClaw Proton Mail 2 months)

**Friction**:
- ZeroClaw dependabot backlog (36 Rust deps, 9 GH Actions)
- NanoClaw breaking changes accumulate (3 major deprecations v0.4.2)

### Tier 3: Nascent (NanoBot, PicoClaw, NullClaw, IronClaw)

**Signals**:
- Low/zero reactions (PicoClaw all PRs 0 👍)
- Core team only (NanoBot @Re-bin, @chengyongru)
- Stale PRs (NullClaw #1091 - 7 days zero interaction, PicoClaw #3455 - 9 days)

**Blocker**: Release cadence slow hoặc không có → community không biết stable point để contribute.

---

## 7. 🔮 Tín hiệu xu hướng

### 1. **Local-first inference maturity** 🚀

**Evidence**:
- Qwen-Paw MLX stack (3 PRs, GPU controls)
- ZeroClaw multi-model schema v4 (breaking)
- OpenClaw idle runtime cleanup (#196559)

**Implication**: 2027 Q1 sẽ có wave provider plugins cho local backends (MLX, llama.cpp variants). Hermes Agent cần local inference story hoặc bị bỏ lại.

**Action**: Watch Qwen-Paw #8646-8649 merge outcome. Nếu stable, pattern replicate nhanh.

### 2. **Agent knowledge scoping → multi-tenancy chuẩn** 🔒

**Evidence**:
- ZeroClaw agent KG scoping (#9745 - 3 tháng review)
- OpenClaw session correctness focus (queued send, Codex preservation)
- NanoClaw approval 2-stage verification

**Implication**: 2026 Q4 production incidents (approval race, knowledge leak, permission loss) push security từ nice-to-have → requirement.

**Gap**: Hermes Agent plugin catalog không có scoping mechanism visible. 12 plugins hôm nay - collision risk nếu không có agent-level isolation.

### 3. **Platform quirk → adapter abstraction layer** 🌐

**Evidence**:
- 4 projects fix channel bugs hôm nay (Telegram, QQ, Mattermost, DingTalk)
- NanoClaw tách adapters sang channels branch
- Qwen-Paw community fix DingTalk table render

**Implication**: Mỗi platform 3-5 edge cases. Raw API integration không scale. Adapter pattern with community contributions win.

**Hermes position**: Telegram private topic bug (#152330) → nếu không có adapter layer, mỗi plugin tự handle quirks → fragmentation.

### 4. **Storage layer chuyển từ SQLite monolith → pluggable backends** 💾

**Evidence**:
- Hermes storage refactor (SessionDB → interface)
- OpenClaw agent DB idle executor cap (#196255)
- NanoBot FTS5 optimization (#5826)

**Implication**: Fleet deployments cần distributed storage (Redis, Postgres). SQLite file-per-agent không scale qua 100 agents.

**Timeline**: Hermes 6-PR chain nếu merge Q4, OpenClaw + NanoBot follow 2027 Q1.

### 5. **Plugin ecosystem → marketplace pressure** 🏪

**Evidence**:
- Hermes 12 plugins hôm nay, catalog size breach
- Qwen-Paw community request Mistral collection (#8656)
- ZeroClaw plugin webhook RPC refactor (#11322 - 3 tháng stuck)

**Implication**: Plugin discovery, versioning, dependency management trở thành bottleneck. Hacky catalog.json không đủ. Cần package registry (npm-like).

**Winner prediction**: Project nào ship registry + semantic versioning first sẽ attract plugin developers. Hermes có lợi thế (ecosystem largest), nhưng NanoClaw có infra (channels branch separation).

---

## 🎯 Kết luận chiến lược

**Hermes Agent**: Breadth advantage (plugin ecosystem) nhưng tech debt visible (Windows perf, storage refactor incomplete). Cần ship storage refactor + local inference story trước khi gap mở rộng.

**Competitor watch**:
- **Qwen-Paw**: Platform coverage + MLX inference → threat nếu Desktop performance improve
- **ZeroClaw**: Security-first → enterprise choice nếu multi-tenancy ship
- **OpenClaw**: Stability depth → production workhorse nếu memory/MCP issues resolve

**Market gap**: Không project nào có cả 3: (1) plugin breadth, (2) local inference, (3) production-grade multi-tenancy. First to combine wins enterprise + developer market.

**2027 prediction**: Consolidation wave. 2-3 projects merge hoặc adopt shared backend (storage, inference, adapter layer). Ecosystem fragment không sustainable với overlap này.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-11-10

## 1. Tóm tắt hôm nay

Dự án xử lý ổn định kỹ thuật: 30 PR mới, tập trung vào vấn đề cấu hình plugin (stop 60s), quyền queued send, và bug cô lập session Codex. Không có release. Nhiều fix P1/P0 về memory index, MCP runtime leak, và helper continuation authority.

## 2. Releases

Không có release trong 24h qua.

## 3. Tiến độ dự án

**PR quan trọng đang mở:**

- **#196570** [P1, XL]: Plugin config edit stall gateway 60s → giờ reload async, không block readiness
- **#196540** [P1, M]: Queued send mất permission sau restart → giờ persist app/scope/model gốc
- **#196092** [P1, XL]: claude-cli session reset xóa reply → giữ lại transcript đầy đủ
- **#196089** [P0, M]: Conversation list với hàng nghìn Slack thread block main thread → chuyển sang worker
- **#195420** [P1, L]: Subagent paused task mất khi requester notice → preserve state
- **#196082** [P1, S]: MCP server bị pause 60s sau 3 lần local auth refuse → chỉ pause khi server lỗi

**Xu hướng:**

- Gateway stability: fix blocking operations (plugin reload, conversation list, memory index)
- Session correctness: preserve state qua restart/rotation (queued send, claude-cli, paused tasks)
- MCP lifecycle: idle runtime cleanup (#196559), local auth không pause healthy server

## 4. Điểm nổi bật cộng đồng

**Issues hot (theo bình luận):**

- **#138561** [13 cmt]: active-memory plugin ngừng recall sau upgrade 2026.8.2 → stale
- **#144797** [12 cmt]: claude-cli reused session giữ deleted --mcp-config, tools chết HTTP 401 → closed
- **#112313** [12 cmt]: Dead-lettered delivery queue entries permanent, không CLI/RPC nào clear được
- **#194664** [6 cmt]: Codex continuation block follow-up, session Stop báo "no active run"

**Vấn đề người dùng quan tâm:**

- Memory index stuck với large corpus (357MB transcript OOM #191784, reindex hang forever với batch API #191783)
- Cron fail với MCP_AUTHORIZATION_RETIRED sau secrets migration (#196381)
- Helper continuation invalidate authority (#194403)
- Update failure trên Windows: verify phase fail dù activate+restart thành công (#196520, #196479)

## 5. Ổn định & Bugs

**Bugs nghiêm trọng được fix:**

- **#196589**: one-shot `openclaw agent exec` không cleanup browser bridge → leak process
- **#196592**: Chat retain stale default model snapshot sau config change
- **#196255** [P2]: Agent DB idle executor cap (4) force reopen database trên multi-agent gateway
- **#196500**: Prompt cache block split thiếu separator text
- **#196120** [P2]: Config env.vars regenerate qua restart → break tools cần stable password (gogcli)

**Bugs đang xử lý:**

- #194334 [P2]: MCP stdio runtime không evict được khi backing run context không clear
- #192496 [P2]: Idle skills refresh vẫn chiếm 100-170% CPU với 20 agents (sau PR #170341)
- #186981 [P1]: memory-core-index stop vượt quá 5s deadline khi sync đang chạy

## 6. Yêu cầu tính năng

**Features mới được đề xuất:**

- **#138990** [10 cmt]: Enforceable checkpoints cho WebChat long runs → bounded yield
- **#192009** [8 cmt]: Explicitly authorize cross-provider cron fallback accounts
- **#155039** [7 cmt]: Manual agent sidebar order via synced preferences
- **#170261** [5 cmt]: Matrix option deliver final reply as new message khi streaming mode progress/partial/quiet

**Features landed (qua PR):**

- #191029: Reorder agents trong personal sidebar (drag-and-drop)
- #194014: CLI command list session group catalog

## 7. Phản hồi người dùng

**Trải nghiệm tích cực:**

- PR review nhanh, nhiều fix P1/P0 được prioritize
- Documentation cải thiện (nhiều PR có changelog detail)

**Pain points:**

- Memory index không handle large corpus (>256MB OOM)
- Update process fragile trên Windows (verify phase fail #196520)
- MCP lifecycle leak (#196559, #194334)
- Gateway CPU spike với nhiều agent (#192496, #138918 macOS WindowServer)

**Phản hồi về security:**

- #159230 [P1]: message_tool_only re-prompt model với private text → security review needed
- #196576: Plugin tools reject caller cần prepared source facts
- #196120: env.vars regenerate → data loss risk

## 8. Backlog & Roadmap

**High priority (P0/P1):**

- Gateway stability: conversation list blocking (#196089), plugin reload stall (#196570)
- Session correctness: queued send permissions (#196540), claude-cli reply preservation (#196092)
- Memory: large corpus handling (#191784, #191783), index worker capacity (#196505)
- MCP: runtime cleanup (#196559), healthy server availability (#196082)

**Medium priority (P2):**

- Performance: agent DB idle executor cap (#196255), idle skills refresh CPU (#192496)
- UX: helper continuation authority (#194403), cron auth after secrets migration (#196381)
- Config: env.vars stability (#196120), model maxTokens default (#196544)

**Low priority (P3):**

- Features: session group CLI (#194014), ElevenLabs keyterm prompting (#184709)
- Telemetry: per-run retention measurement (#196573)

**Tech debt:**

- Dead-lettered queue cleanup (#112313) → needs product decision
- view_image base64 storage waste (#143973) → 1.3% events, 80% bytes

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-11-10

## 1. Tóm tắt hôm nay

Ngày cleanup lớn: merge 14 PR sửa bug và tối ưu, đóng 1 issue UX. Tập trung vào stability WebUI (scroll, theme, language), memory optimization, và chuẩn bị xóa API server cũ trong v0.4.2.

## 2. Releases

Không có release mới. v0.4.1 vừa ship (#6570 merged).

## 3. Tiến độ dự án

### Merged hôm nay (14 PR):

**WebUI fixes:**
- #6612: sửa middle-click autoscroll bị snap về tail
- #6591: follow browser language lần đầu thay vì force English
- #6590: đóng context sidebar khi tạo conversation mới
- #6587: giảm layout thrashing với nhiều file activities
- #6610: giữ pasted path khi attachment detection fail
- #6594: refine day/night theme + sleeping cat cho dark mode

**Core stability:**
- #6603: `/new` command không tự cancel worker thực thi nó
- #6606: preserve delivery failures across channels (email, Mattermost)
- #6608: giữ system context graph sau compaction
- #6613: preserve cross-session input ownership + history

**Performance:**
- #6581: giảm memory copies ở file reads, session searches, model requests (stream thay vì copy toàn bộ)

**Infrastructure:**
- #6611: Render deployment chạy qua container entrypoint
- #6412: unify code/diff highlighting, restore preview layout
- #6600: stabilize theme crossfade test

### Open PR quan trọng:

**Refactoring lớn (đang review):**
- #6621: xóa global shared session mode
- #6623: centralize process-tree lifecycle
- #6616: centralize scoped file operations
- #6615: retire `apiType` selector (breaking, sau 2-release conversion window)
- #6614: **xóa standalone API server** (breaking)

**Performance:**
- #5826: FTS5 cho session search (warm search nhanh hơn)
- #6586: record pagination cho oversized turns

**Features:**
- #5825: provider-neutral structured decision client (OpenRouter + System One)

**Long-standing conflicts:**
- #6405: fix idle scan collide với direct turns
- #6194: release idle session locks (WeakValueDict)
- #2078: Zalo integration refactor (từ tháng 3)

## 4. Điểm nổi bật cộng đồng

- #6592 (WebUI scroll fight) được fix nhanh trong 3 ngày
- Không có issue/PR nào có engagement cao (hầu hết 0 reactions)
- Activity tập trung ở core team (@Re-bin, @chengyongru, @kkkhoo)

## 5. Ổn định & Bugs

### Fixed hôm nay:
- Cross-session message routing (busy vs idle paths khác workspace scope)
- Scroll ownership conflicts
- Browser language detection
- Session cancellation self-termination
- Channel delivery failures bị nuốt
- Memory peaks ở large files

### Still open:
- #5798: reply leak sang conversation khác (từ Sep, 3 comments)
- #6620: suppressed message-tool trả success thay vì error
- #6619: heartbeat output đến wrong room (multi-room deployments)

## 6. Yêu cầu tính năng

- #5749: expose stable tool invocation context cho idempotent side effects (tool-call ID visibility)
- Không có feature request mới hôm nay

## 7. Phản hồi người dùng

- #5798 phàn nàn reply串会话 (từ v0.3.5, v0.3.0 không có vấn đề này)
- User feedback ít, chủ yếu bug reports từ internal testing

## 8. Backlog & Roadmap

### Đang chuẩn bị (v0.4.2):
- Xóa standalone API server (#6614) - breaking change
- Retire `apiType` config (#6615) - breaking change
- Retire global shared session (#6621) - breaking change
- Centralize file operations (#6616)
- Centralize process lifecycle (#6623)

### Long-term:
- FTS5 search optimization (#5826)
- Structured decision client (#5825)
- Zalo integration (#2078 - 8 tháng chưa merge)

### Technical debt:
- Flaky test scenarios (#6622 - đã đóng nhưng vấn đề CI còn)
- Idle session lock leaks (#6194)
- Idle scan timing (#6405)

**Xu hướng:** Cleanup phase sau v0.4.1, chuẩn bị breaking changes cho v0.4.2. Focus vào stability, memory, và remove deprecated APIs.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw – 2026-11-10

## 🎯 Tóm tắt hôm nay

Release v0.9.0 ship nhiều fix quan trọng: dashboard chat cho non-admin (#12244 merged), TLS flush bug đẩm gateway (#12355), OIDC login không cần pairing (#12317). 7 issue đóng trong ngày, 50 PR active với nhiều refactor bảo mật + infrastructure.

---

## 🚀 Releases

**Không có tag release chính thức**, nhưng các PR đánh nhãn `release:v0.9.0` đã merge:

- **#12244** – Dashboard chat chạy qua core RPC, non-admin có thể chat với agent được cấp quyền
- **#12355** – Fix zerorelay không flush TLS write → response bị treo đến idle timeout (300s)
- **#12317** – OIDC login cho zerocode, không cần export/copy token thủ công
- **#12359** – ZeroCode TUI mở được cho user bị từ chối config/log quyền

Toàn fixes critical UX và security. v0.9.0 tập trung vào remote access + multi-tenancy.

---

## 📊 Tiến độ dự án

### Infrastructure & Security (ưu tiên cao)

- **#9745** (XL, `release-gate`) – Agent-scoped knowledge graph, ngăn agent đọc cross-contamination. Chặn SQLite schema leak.
- **#9809** (XL, `risk:high`) – Multi-model per provider profile. Schema v4 lớn: tách `connections`, `models`, `presets`, `fallback`. Breaking change.
- **#11322/#11320** (XL, stacked) – Plugin webhook qua core RPC thay vì gateway direct. Giảm attack surface.
- **#7821** (XL, `security:policy`) – Canonical sandbox policy schema cho filesystem. Application-layer enforcement, thay OS-level guesswork.

### Runtime & Agent Quality

- **#12363** (merged hôm nay) – Skill review fork kế thừa parent temperature, fix HTTP 400 với model reject fixed `temperature: 0.3`
- **#12044** (merged hôm nay) – Deferred bootstrap sections: lớn markdown như AGENTS.md không phải nằm resident context, load on-demand. Tiết kiệm token.
- **#11868/#11869** (stacked) – Task-owned SSH transport reuse + tool result retention qua recovery. Fix tool call lặp và mất kết quả.

### Channels & Providers

- **#12188** – Không merge tool-result envelope vào user turn, fix invalid JSON cho OpenAI-compatible adapter.
- **#12352** – Anthropic adaptive-only models (`claude-opus-5-5`, `mythos-5`) bị nhận dạng sai, gửi sai thinking budget.

### Developer UX

- **#12360** (mới hôm nay) – Running cost estimate trong ZeroCode/web chat, refresh mỗi 2s. Dùng token count + provider price.
- **#12318** – FieldForm local draft bị mất sau `Discard all`, cần restore từ localStorage.
- **#12336** – ZeroCode fail closed khi config parse lỗi thay vì dùng defaults ngầm.
- **#11661** – Focus quay lại message box khi turn kết thúc.

### Dependencies

- **#12215** (36 Rust deps), **#11999** (9 GitHub Actions) – Dependabot tích lũy, chưa merge.
- **#11857** – `sha2 0.10.9 → 0.11.0`, đợi review.

---

## 🔥 Điểm nổi bật cộng đồng

### Nhiều tương tác

- **#11984** (👍 0, closed hôm nay) – Dashboard chat cho non-admin, merged qua #12244. User @JordanTheJet lead.
- **#12362** (mới, 👍 0) – Skill review hardcode `temperature: 0.3`, Anthropic reject → 400. Fix #12363 merge luôn.
- **#12361** (mới, 👍 0) – Multi-turn fail với Reflection AI vì thiếu `reasoning_content` field trong `ChatMessage`. Cần schema change.

### Contributors

- **@JordanTheJet** – 5 issues, 4 PRs hôm nay. Chủ yếu fix ZeroCode UX + relay bugs.
- **@IftekharUddin** – Nhiều PR lớn (plugin RPC, agent scoping, cost tracking).
- **@CastelloBrancoTecnologia** – SSH reuse, tool retention, voice settings.
- **@tidux** – OIDC login, Anthropic model detection.

---

## 🐛 Ổn định & Bugs

### Fixed hôm nay

1. **#12354** → #12355 – zerorelay không flush TLS → dashboard response treo 300s. `write_all` return trước khi rustls buffer empty. Fix: flush sau mỗi write.
2. **#12357** → #12359 – ZeroCode exit startup vì config/log pane refuse fatal. Fix: nonfatal banner thay vì crash.
3. **#12347** → #12349 – Config writers race: load → modify → replace toml. Concurrent update mất. Fix: serialize qua advisory lock.
4. **#12153** (closed) – `install.sh` nhầm musl build trên glibc host có musl package. Fix: check libc runtime thay vì package presence.

### Open critical

- **#12362** (mới) – Skill review hardcode temperature, providers strict reject.
- **#12361** (mới) – `reasoning_content` thiếu trong multi-turn history → Reflection AI fail. Cần schema extend `ChatMessage`.

---

## 💡 Yêu cầu tính năng

- **#11984** (đã ship) – Non-admin dashboard chat qua OIDC scope.
- **#12360** (mới hôm nay) – Running cost estimate trong chat UI.
- **#12269** (open) – Paired-device voice settings: dictation + narration trong browser chat. Opt-in, save preferences.
- **Deferred bootstrap** (#12044, merged) – On-demand load cho lớn agent docs.

---

## 💬 Phản hồi người dùng

### Pain points được fix

- TLS flush bug (#12354) → user report dashboard "stops short", wait 5 phút mới load.
- ZeroCode crash cho limited principal (#12357) → "can't even open TUI".
- Config race (#12347) → concurrent zerocode sessions đè nhau.

### Ongoing friction

- Multi-model config (#9809) đang rewrite lớn, chưa land. User đợi fallback + preset reuse.
- Plugin webhook RPC (#11322) chặn 2 tháng, docs approval chậm.
- Agent knowledge scoping (#9745) cũng 3 tháng, test coverage chưa đủ.

---

## 📋 Backlog & Roadmap

### Release gate (chặn v0.9.0+)

- **#9745** – Agent-scoped KG (security)
- **#9809** – Multi-model schema v4 (breaking)
- **#11322** – Plugin webhook over RPC (architecture)

### High-risk refactors (stacked, đợi merge)

- **#11320** (plugin RPC core) → **#11322** (gateway forward)
- **#9745** (KG scoping) → **#12020** (env-defined agent admission)
- **#11868** (tool dedup) → **#11869** (SSH reuse) → **#11911** (channel recovery)

### Dependency debt

- 36 Rust deps, 9 GitHub Actions update pending (#12215, #11999).
- `sha2 0.11` blocked (#11857).

### Docs proposals

- **#11317** – Plugin webhook RPC placement exception, đợi maintainer decision.

---

## 🔮 Nhận xét

**V0.9.0 gần ship**, focus vào **remote + multi-tenant UX**. OIDC login (#12317) + dashboard chat (#12244) giảm setup friction cho team deploy.

**Security refactors lớn** (#9745 KG scoping, #7821 sandbox policy) still in review. Risk high, merge chậm.

**Provider compatibility** nhiều edge case: Anthropic adaptive models (#12352), `reasoning_content` thiếu (#12361), temperature strict (#12362). Cần bắt kịp vendor changes.

**Tool reliability** (#11868 dedup, #11869 SSH reuse, #11911 recovery) cải thiện delegate workflows, nhưng PRs dài, chồng chéo.

**Dependabot backlog** tích lũy. Cần batch review hoặc auto-merge policy.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-11-10

## 📊 Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào 5 PRs: thêm locale tiếng Pháp, fix skill deduplication bug, thêm integration header cho Perplexity, và 2 PRs stale. Không có issue mới hoặc discussions nổi bật.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**PRs mới (hôm nay):**

- **#3467 - French UI locale**: @slashr512 thêm file `fr.json` đầy đủ cho web launcher. Đăng ký vào i18next và dayjs. Thêm "Français" vào menu ngôn ngữ ở login/setup/dashboard. **Ý nghĩa**: Mở rộng thị trường Pháp ngữ.

**PRs đang active:**

- **#3466 - Perplexity integration header**: @qirh thêm `X-Pplx-Integration: picoclaw` vào Perplexity web search request. Chỉ ảnh hưởng hardcoded endpoint `api.perplexity.ai`, không đụng proxy hay caller khác. **Ý nghĩa**: Partnership/tracking signal cho Perplexity.

- **#3463 - Fix skill deduplication**: @nelsonrochaa-creator sửa bug #3462. Hiện tại `picoclaw skills install` fail khi skill khác có cùng frontmatter `name`, dù khác directory/author/content. Fix: deduplicate theo root path thay vì frontmatter name. **Ý nghĩa**: Critical bug - block skill installation use case phổ biến.

**PRs stale:**

- **#3455 - Fix Nvidia model ID Termux shell**: Mở từ 2026-11-01, update lần cuối 2026-11-09. Chưa có mô tả chi tiết.

- **#3448 - CLOSED - Add Runcrate provider**: Mở 2026-10-25, đóng 2026-11-09. Thêm Runcrate OpenAI-compatible provider (`runcrate/` prefix, base `api.runcrate.ai/v1`). Follow pattern Novita/NEAR AI Cloud. Serve open models. **Kết quả**: Đã đóng - có thể merged hoặc rejected, cần check commit history.

**Xu hướng:**

- I18n expansion (French)
- Provider integrations (Perplexity header, Runcrate closed)
- Bug fixes cho skill system (critical path)

## 🌟 Điểm nổi bật cộng đồng

Không có PR/issue nào có reaction hoặc comment count nổi bật. Tất cả PRs có 0 👍, `undefined` comments (có thể API không trả về hoặc = 0).

Community engagement thấp trong 24h qua - hoặc base code đang ổn định, hoặc đợi release cycle.

## 🐛 Ổn định & Bugs

**Critical:**

- **#3463 / #3462 - Skill deduplication bug**: Block `picoclaw skills install` khi frontmatter name trùng. Fix đã submit - chờ review/merge. Impact cao vì skill installation là core workflow.

**Moderate:**

- **#3455 - Nvidia model ID Termux**: Stale 9 ngày, chưa rõ severity. Termux environment specific - niche use case nhưng có thể block mobile/embedded users.

## ✨ Yêu cầu tính năng

- **French locale (#3467)**: Đã implement, chờ merge.
- **Perplexity integration tracking (#3466)**: Infrastructure cho partnership/analytics.
- **Runcrate provider (#3448)**: Closed - nếu merged thì đã available, nếu rejected thì community có thể cần workaround via generic OpenAI provider.

Không có feature request issues mới trong 24h.

## 💬 Phản hồi người dùng

Không có discussion hoặc issue feedback trong 24h. PRs chưa có review comments visible từ data.

Low signal day - có thể:
- Team focus vào internal work
- Weekend/low activity period
- Chờ maintainer review cycle

## 🗺️ Backlog & Roadmap

Không có roadmap updates trong 24h. 

**Inferred priorities từ PRs:**

1. **I18n expansion** - French là signal cho multi-language push
2. **Provider ecosystem** - Perplexity/Runcrate PRs cho thấy mở rộng LLM backend options
3. **Skill system stability** - Deduplication bug fix là foundational

**Stale PRs cần action:**

- #3455 (9 days)
- #3448 (closed, cần verify outcome)

---

**Kết luận**: Quiet day. French locale và Perplexity header là incremental additions. Skill deduplication fix là most important - block core functionality. Không có major release signal. Community engagement low - có thể pre-release lull hoặc consolidation period.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw 2026-11-10

## 1. Tóm tắt hôm nay

Phát hành **v2026.11.0-beta.1** - beta đầu tiên thay thế 2026.10.1. 41 PR hoạt động (15 merged/closed trong ngày), tập trung vào hardening bảo mật, sửa lỗi approval cards và channel adapters. Core team push mạnh vào ổn định trước release chính thức.

## 2. Releases

### v2026.11.0-beta.1 (2026-11-09)

**Thay đổi chiến lược**: bỏ qua 2026.10.1 stable, nhảy thẳng sang 2026.11.0 beta. RC của 2026.10.1 vẫn publish nhưng không thành stable.

**Điểm chính**:
- Beta kênh: nhận build này ngay
- Stable kênh: giữ ở 2026.10.0 đến khi 2026.11.0 chính thức
- Từ 2026.10.1-rc.2: 29 PR từ main + 3 PR từ channels branch
- Fix: stuck channel send không còn im lặng conversation
- New: agents đặt KPI fields vào table

**Ý nghĩa**: team chuyển sang chu kỳ beta dài hơn, tránh rush ra stable sớm.

## 3. Tiến độ dự án

### Xu hướng chính

**Security & Hardening** (4 PRs):
- #4318: CI token read-only, release check target SHA trước khi run
- #4330 (merged): từ chối pre-release sort dưới tag hiện tại 
- #4300: không block/follow symlink ở Claude settings.json
- #4314: unreadable .env không mở trực tiếp internet egress

**Approval System Overhaul** (5 PRs):
- #4168, #4171: resolve card chỉ sau khi host accept click (2-stage verification)
- #4156: escape approval card text, từ chối card mà channel không show được
- #4147: approval cards luôn hiện full action
- #4328: giữ question text sau khi answered (fix mất question body)

**Channel Adapters**:
- #4218, #3726: Proton Mail qua local Bridge (adapter tách sang channels branch)
- #4321, #4320 (Mattermost): fix @mention logic trong group, split long replies
- #3797, #3802: Mattermost và mention-sticky thread engagement

**Container & Agent Runtime**:
- #4332: bump Claude Code → 2.1.321, Agent SDK → 0.3.321 (Fable 5.2 support)
- #4331: agent image v2026.10.0-20261109T1401
- #4301: giữ MCP server mailbox mở đến khi tool calls xong
- #4057: đợi --rm auto-removal hoàn tất trước báo cáo stop

**Setup & CLI**:
- #4312: `/update-nanoclaw` tự regenerate lockfile conflict
- #4303: CLI scripts chạy với path có space/symlink
- #4049: corepack cũ không break pnpm install

### Code Quality
- #4327: viết lại README - 49/183 claims cũ sai hoặc stale
- #4053: fail outbound row không có destination, thông báo agent
- #3040, #3088, #3382 (merged): consolidate approval lifecycle, surface unknown-sender holds

## 4. Điểm nổi bật cộng đồng

**Không có dữ liệu interaction rõ ràng** (PR comments undefined), nhưng pattern thấy:

- **Proton Mail PR** (#3726, #4218): community-contributed, review kéo dài từ 2026-09-01 → nay, team tách adapter sang channels branch
- **Mattermost fixes** (#3797, #4321, #4320): chuỗi fixes cho một adapter → nhiều edge cases từ production use
- **Approval security** (#4168, #4171): 2-stage verification → phản hồi incident thực tế (card edit trước host check)

## 5. Ổn định & Bugs

### Critical Fixes (merged hôm nay)

**#4330**: pre-release sort sai → beta channel không offer được tag  
**#4329**: agents reply sai ngôn ngữ (drift sang ngôn ngữ từ history/timezone)  
**#3382, #3088, #3040**: approval system inconsistency (2 tables riêng, lifecycle không thống nhất)

### High-Impact Open

**#4168/#4171**: race condition - card edit trước host authorization  
→ clicker unauthorized vẫn thấy card approved  
→ host refuse nhưng question đã closed

**#4156**: card text injection - Slack/Discord/Google Chat parse text thành link/mention  
→ XSS-like vector qua adaptive cards

**#4314**: egress lockdown bypass - `.env` unreadable → fallback open internet  
→ security policy fail silent

**#4053**: silent delivery failure - null destination → marked delivered nhưng không send  
→ agent không biết message không đi

### Medium Priority

- #4328: question text mất sau answer (UX regression)
- #4301: MCP mailbox đóng sớm → tool calls race
- #4057: Docker --rm timing → false teardown failure report
- #4312: update-nanoclaw dừng ở lockfile conflict (DX friction)

## 6. Yêu cầu tính năng

### Đang implement

**Proton Mail** (#3726/#4218):  
- Native IMAP/SMTP qua local Bridge
- Build từ source (arm64 + x86)
- Skill `/add-proton-mail` + adapter riêng

**Keenable MCP tool** (#3697):  
- Web search + page fetch qua remote MCP
- Guards copied vào src/, bridge pinned trong cli-tools.json

### Infrastructure improvements

**CLI token rotation** (#4318): read-only cho CI, proof of target SHA  
**Context compaction** (system prompt): context window auto-compact, tiếp tục work qua limits

## 7. Phản hồi người dùng

### Pain points từ PRs

**Setup experience**:
- First update conflict ở lockfile (#4312)
- Corepack stale trên PATH break install (#4049)
- Space/symlink trong path → CLI không chạy (#4303)

**Channel reliability**:
- Mattermost: @mention false positive (#4321), long reply không gửi (#4320)
- Approval cards: question body mất (#4328), race condition (#4168)
- Telegram/Discord/WhatsApp: card bị cắt thay vì từ chối (#4156)

**Documentation debt**:
- README: 49/183 claims sai (#4327)
- Trigger word nói `@Andy` nhưng thực tế khác
- Claim agents join chats nhưng không có feature

## 8. Backlog & Roadmap

### Immediate (beta cycle)

1. **Approval system hardening** → 2-stage verification (#4168/#4171)
2. **Card safety** → escape injection, refuse unshowable (#4156/#4147)
3. **Security audit** → egress lockdown, CI tokens, settings.json (#4314/#4318/#4300)
4. **Mattermost stability** → mention logic, message splitting (#4321/#4320)

### Beta → RC transition markers

- Approval race conditions resolved
- Channel adapter edge cases cleared
- Setup/update friction points fixed (lockfile, corepack, paths)
- README accuracy restored

### Post-2026.11.0

- Proton Mail graduation (channels → main)
- MCP remote tools expansion (Keenable baseline)
- Context compaction refinements

---

**Đánh giá tổng thể**: Team ưu tiên security + stability over features. Beta 1 phơi bày technical debt (approval system, documentation, setup scripts). Cycle dài hơn là đúng - 2026.10.1 RC skip đến stable là quyết định khôn ngoan. Community contributions (Proton Mail) đang active nhưng review chậm.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo Hoạt động NullClaw - 2026-11-10

## 1. 📊 Tóm tắt hôm nay

Hoạt động yên ắng, chỉ có 1 PR đang chờ merge. PR #1091 thêm Keenable provider cho web search, điểm nhấn là không cần API key cho chế độ free.

## 2. 🚀 Releases

Không có release mới.

## 3. 📈 Tiến độ dự án

**PR #1091** - Tính năng web search với Keenable:
- Tác giả: @KGKallasmaa
- Mở từ 2026-11-03, cập nhật hôm nay (7 ngày)
- Viết bằng Zig: `src/tools/web_search_providers/keenable.zig`
- Hai chế độ:
  - Free: `POST https://api.keenable.ai/v1/search/public` (không cần key)
  - Premium: `POST /v1/search` (cần `KEENABLE_API_KEY`)
- Chưa có interaction (0 👍, không có comment)

**Xu hướng phát triển:**
- Mở rộng providers cho web search
- Ưu tiên options không yêu cầu API key (barrier thấp cho users)
- Implementation bằng Zig (low-level, performance-focused)

## 4. ⭐ Điểm nổi bật cộng đồng

Không có. PR duy nhất chưa nhận được phản hồi từ maintainers hay community.

## 5. 🐛 Ổn định & Bugs

Không có issues hay bug reports trong 24h qua. Hoạt động ổn định hoặc users không report vấn đề.

## 6. 💡 Yêu cầu tính năng

PR #1091 đóng vai trò vừa feature request vừa implementation - thêm provider mới cho web search. Không có feature request riêng nào khác.

## 7. 💬 Phản hồi người dùng

Không có feedback công khai trong timeframe này.

## 8. 🗓️ Backlog & Roadmap

Thiếu context về roadmap tổng thể. Từ PR #1091 có thể suy luận:
- Dự án đang xây dựng hệ thống web search đa provider
- Hướng đến giải pháp plug-and-play (free tier quan trọng)
- Có thể sẽ thêm providers khác tương tự

**Trạng thái PR:**
- #1091 chờ review và merge
- Cần maintainer attention - PR đã 7 ngày không có interaction

---

**Nhận xét:** Ngày yên ắng. Dự án có vẻ ở giai đoạn phát triển ổn định, không có urgency cao. PR đang pending cần được ưu tiên review.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo Qwen-Paw 2026-11-10

## 1. Tóm tắt hôm nay

Phát hành **v2.3.0-beta.3**. Team đóng 6 bug quan trọng (channel plugin crash trên Desktop, QQ message drop, file download lỗi HTML, TTS token-plan không hoạt động). Đang xây dựng MLX engine cho Apple Silicon + GPU controls (#8648, #8647, #8649). Community tăng cường: 2 contributor mới merge fix table render (DingTalk) và file download (workspace link).

## 2. Releases

### v2.3.0-beta.3 (2026-11-09)
**Ý nghĩa:** Beta release với 5 critical bugfix từ beta.2.

**Sửa lỗi chính:**
- Desktop channel plugin crash (`AttributeError` khi đọc `supported_tags`) → #8644 ✅
- QQ image-only C2C message bị drop → #8651 ✅  
- Attachment path bị cắt về `C:\` khiến ảnh không load → #8655
- TTS không dùng được Aliyun Token Plan key → #8534 ✅
- Safari không render action button trong message queue → #8663

**Đã merge:** multimodal memory docs, empty media block cleanup, creator 2.0.4 release.

## 3. Tiến độ dự án

### Hoàn thành trong ngày
| PR | Trạng thái | Nội dung |
|---|---|---|
| #8659 | ✅ Merged | Plugin dependency recovery sau failed install |
| #8653 | ✅ Merged | Preserve plugin deps qua update, fix channel startup |
| #8662 | ✅ Merged | Download workspace file link thay vì mở HTML |
| #8601 | Review | Separate Markdown table khỏi paragraph (DingTalk) |

### Đang triển khai (High-priority)
**Local inference stack (#8646):**
- #8649: llama.cpp GPU controls + auto-update (base, merge first)
- #8647: MLX engine cho Apple Silicon (stack trên #8649)  
- #8648: Console UI cho engine/GPU settings (stack trên #8647)

**Scope:** Expose Metal GPU on/off, add MLX backend, model auto-update flow.

**Ollama context window (#8236):** Đọc `num_ctx` thay vì dùng 128k static default. Under review.

**Provider robustness:**
- #8512: Parse gateway-reported status từ error text (streaming 503)
- #8234: Decode GBK/CP936 trong file tools (hiện bỏ qua byte → data loss)

### Đang extract ra plugin
#8426: Tách third-party agent thành plugin riêng (size XXXL, chưa merge).

## 4. Điểm nổi bật cộng đồng

**First-time contributor:**
- @vincy-ch (#8601): DingTalk table render fix → lần đầu contribute, PR sạch
- @zxcvbnmzsedr (#8662): Workspace file download → fix nhanh issue #8661 cùng ngày

**Tương tác cao:**
- #7990 (4 comments): Request Aliyun Token Plan `thinking_param_style` trong catalog → Console ẩn thinking control. Model endpoint thực tế support `reasoning_effort`.
- #8650 (1 comment, đáng chú ý): UI inconsistency giữa thinking block và tool card → "bên trái nhảy liên tục."

**QQ channel bugs:** 2 issue + 2 PR về QQ message handling:
- #8651 (C2C image-only drop) → fixed
- #8658: Full group message + mention filtering (open PR)
- #8319: `GROUP_MESSAGE_CREATE` event (closed, superseded by #8658)

## 5. Ổn định & Bugs

### Fixed ✅
1. **Desktop channel plugin crash (#8644)** → `validate_runtime_identity` đọc `supported_tags` từ `DependencyReadEvidence` (AttributeError) → merge #8653
2. **QQ image-only C2C drop (#8651)** → media-only message không có text bị channel filter → fixed beta.3
3. **Attachment path `C:\` (#8655)** → path bị truncate trước khi gửi model → blocked beta.1-3
4. **TTS không support Token Plan (#8534)** → protocol option thiếu trong UI, endpoint khác
5. **Safari action button không render (#8663)** → Chrome OK, Safari blank (CSS/JS issue)

### Ongoing
- **Mission task model switch không sync (#8652):** Đổi model rồi dispatch script vẫn dùng model cũ → task fail
- **Workspace file link mở HTML (#8661):** `/workspace/...` absolute link navigate vào SPA, nhận HTML thay vì file binary → fixed #8662
- **Thinking block vs tool card UI jump (#8650):** Tool left-aligned, thinking có 12px padding → bên trái nhảy. Enhancement request.

## 6. Yêu cầu tính năng

| Issue | Request | Justification |
|---|---|---|
| #8646 | MLX engine + GPU controls cho Local | llama.cpp bảo "CPU by default" dù Metal đã enable. Không thấy GPU offload status. |
| #7990 | Catalog khai báo `thinking_param_style` cho Aliyun Token Plan | Endpoint support `reasoning_effort` nhưng Console ẩn control → không dùng được. |
| #8656 | Collect Mistral provider plugin | Support reasoning + prompt cache qua protocol translation, request vào official catalog. |
| #8638 | Shell card hiện intent title (#8638 PR) | `execute_shell_command` thêm `title` param thay vì raw command. |

**Đang xây dựng:** #8664 - remote password login với saved credentials (Docker remote scenario không dùng được browser OAuth callback).

## 7. Phản hồi người dùng

**Negative:**
- QQ channel stability kém: 2 bug về message drop + mention handling trong 2 tuần
- Desktop plugin installation fragile: dependency install fail → repair marker block toàn bộ plugin system
- TTS Token Plan không hoạt động → documented workaround: dùng OpenAI-compatible endpoint bypass

**Positive:**
- Community contributor merge trong ngày (workspace download fix)
- Beta release cadence nhanh: beta.3 đóng 5 critical bug trong 1 tuần

**Pain point lặp lại:**
- Custom OpenAI provider model discovery unreliable (#7320 merged nhưng vẫn báo issue mới)
- Local model context window handling: Ollama (#8236), custom provider metadata

## 8. Backlog & Roadmap

### Beta.4 probable scope
- #8665: Bump version 2.3.0b4 (PR mở, merge gần)
- QQ group message fix (#8658) nếu pass review
- MLX stack (#8646-8649) nếu 3 PR pass review theo thứ tự

### Technical debt
- #8426 (agent plugin extraction): Size XXXL, chưa có timeline merge
- #8479 (Office skills sync Anthropic July 2026): Size XXXL, first-time contributor
- GBK decode (#8234): Under review, impact Windows Chinese user lớn

### Plugin ecosystem
- #8656 (Mistral plugin): Community request collection
- Channel plugin recovery (#8659 merged): Nền tảng để plugin system ổn định hơn

---

**Tóm lại:** Beta.3 đóng 5 critical bug, team focus vào local inference (MLX + GPU) cho 2.3 stable. Community contributor quality tăng. QQ channel cần attention thêm. Desktop plugin installation giờ robust hơn sau #8659.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*