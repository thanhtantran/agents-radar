# Bản tin Hệ sinh thái Hermes Agent 2026-10-02

> Issues: 88 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-02 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-02

## 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa lỗi hệ thống: session state, caching, message delivery. 13 PR mới merge/open, 7 issue mới. Vấn đề nổi: Desktop freeze, gateway restart giữ kết nối quá lâu, MCP conformance test vừa pass.

---

## 🚀 Releases

**Không có release mới trong 24h.**

---

## 📈 Tiến độ dự án

### PR quan trọng đã merge/đang xử lý:

**🔧 Sửa lỗi core:**
- **#131078** - MCP client pass official conformance suite (26 scenarios, 267 checks). Fix 3 defects được test tìm ra.
- **#131071** - Gateway restart không còn giữ cron job trong scope tách biệt. Trước đây đợi 30 phút, giờ skip ngay → giảm downtime.
- **#131031** - Session-context prompt cache vỡ 2 lần sau `/stop`, `/undo`, `/model` → gây tốn prefix cache. Đang điều tra.
- **#130895** - Turn sau compaction miss prompt cache → retry cùng model (không fallback). P0.

**🔐 Session & State:**
- **#127665** - Desktop render 1 reply thành 2 (khác root cause với #127288). Đang sửa.
- **#128988** - Profile ngoài launch profile chết: prompt đầu tiên không gửi, không báo lỗi. Chỉ gặp trên Windows Desktop.
- **#131090** - Session qua Relay giờ resume đúng qua Relay thay vì drop.

**🎨 Desktop UX:**
- **#131072** - Thêm setting hiện tên agent trong session tab (`Agent · Title`). Opt-in, mặc định tắt.
- **#127313**, **#127997** - Right-click trong composer/transcript bị zone menu chiếm. Cut/Copy/Paste không reach được. Đang sửa.
- **#131055** - Linux: second instance launch đánh dấu sandbox fallback sticky → renderer SIGILL loop vĩnh viễn.

**🌐 Platform adapters:**
- **#128722** - Slack slash-command giờ mang `channel_prompt`, `auto_skill`, `chat_name` như message thường.
- **#128797** - Discord interaction qua relay mang `chat_name`, `user_display_name`.
- **#131085** - Cron report đầu dòng "No reply:" (dạng heading) không còn bị đọc là silence marker.

**🔊 TTS:**
- **#131095** - TTS đọc magnitude trước đơn vị ("5 million dollars"), `mm`/`cm`/`m` chỉ expand trong length context. Tilde trong path không đọc "about".
- **#131092** - Stream TTS bỏ code fence, không đọc to code.

**📦 Dependencies & PM:**
- **#131086** - MCP SDK 2.0.0 → 2.2.0.
- **#131087** - TypeScript 7 native LSP opt-in (không ảnh hưởng Vue 2).
- **#129751** - `pm update` fail vì `pm/uv.lock` yêu cầu Python 3.14, app venv đang dùng 3.11.

---

## 🔥 Điểm nổi bật cộng đồng

**Nhiều tương tác:**
- **#97681** (30 comments, 👍4) - Bots collaborate cross-gateway. Chờ #106742 (unified gateway runtime).
- **#127647** (26 comments) - Desktop idle burn: CPU/GPU renderer, backend CPU, memory. Scope map #122413/#88288. Đang triage.
- **#127665** (21 comments) - Double-render bug mới, khác fold với #127288.

**User pain points:**
- **#124679** - Windows "Install locally" recovery fail ngay với "Access denied" dù đã có install. Cần repro.
- **#130962** - Windows Desktop mất Dashboard khi HTTP timeout xen kẽ recovery attempts.
- **#122529** (12 comments) - Cron external worker miss venv site-packages → `ModuleNotFoundError: ruamel`. P1.

**Slow burn:**
- **#6406** (2 comments) - Skill config chỉ đọc `config.yaml`, không fallback `.env` cho secrets. Đang chờ quyết định.
- **#69889** (9 comments) - Cron `.py` job vỡ sau `hermes update` vì user pip package mất.

---

## 🐛 Ổn định & Bugs

### P0/P1:
- **#130895** - Cache miss sau compaction → tốn tiền token. Đang fix.
- **#131031** - `/stop`/`/undo` vỡ cache A→B→A. Gây chậm.
- **#130987** - Gateway restart đợi cron scope 30 phút, block turn. #131071 sửa.
- **#122529** - Cron worker không thấy venv. Breaking change tiềm năng.

### P2:
- **#127665**, **#127313**, **#127997** - Desktop render/UX bugs. Ảnh hưởng workflow.
- **#124294** - Teams/Matrix/SMS/WhatsApp split reply: chunk đầu gửi lại hoặc drop tail khi chunk sau fail.
- **#118753** - Curator tự động archive skill → kanban verifier yêu cầu skill vỡ.

### P3:
- **#129426** - npm audit: 4 advisories mới (brace-expansion, undici, vitest, yaml).
- **#74675** - Gmail reply sai recipient khi trả lời own message; non-ASCII name → "Invalid To header".

---

## ✨ Yêu cầu tính năng

**Được thảo luận:**
- **#119120** (👍1) - Windows: decouple minimize khỏi tray-hide. Giữ taskbar button khi minimize, tray khi close.
- **#74094** - Voice mode cần inject conversational prompt. Agent không biết đang TTS → viết hostile với listener.
- **#83614** - Notify origin thread khi Kanban review được claim (1 lần, không stream heartbeat).

**Needs decision:**
- **#6406** - Skill config fallback `.env` via `env_key`.
- **#129686** - Thêm decision-making models: Jev, Tev1, nimble.
- **#130970** - Plugin hooks cho agent close cleanup & background work status.

---

## 💬 Phản hồi người dùng

**Tích cực:**
- #131078 - MCP conformance pass → tăng tin dùng integration.
- #131071 - Gateway restart nhanh hơn → giảm downtime khi update.

**Tiêu cực:**
- **Desktop stability** (#124679, #130962, #131055) - Windows/Linux first-run/recovery fail không rõ. Cần repro chặt.
- **Cache fragility** (#130895, #131031) - Compaction/command phá cache → tốn tiền. Frustration cao.
- **UX regression** (#127313, #127997) - Right-click hijack → mất Cut/Copy/Paste. Breaking daily workflow.

**Confusion:**
- **#125520** - Mnemosyne plugin installed, configured, có data → tool vẫn báo "not initialized". Không repro ổn định.
- **#124972** - macOS Desktop update timeout trên Python spawn. Chỉ 1 report, cần data thêm.

---

## 📋 Backlog & Roadmap

**Đang chặn:**
- **#97681** - Cross-gateway collaboration chờ #106742 (unified runtime). Teknium defer desktop continuity ~1 tháng.
- **#125727** - Nous integration blocked. Conflicts trong 7+ files core.

**Sắp tới (suy luận từ PR/issue):**
- **Desktop idle resource** (#127647) - Scope map đã có, đang triage fixes.
- **Gateway restart flow** - Rất nhiều fixes (#131071, #130987, #126137). Hướng stability release.
- **MCP hardening** - Conformance pass xong, tiếp tục nâng độ tin cậy.
- **TTS conversational prompts** (#74094) - Được raise nhưng chưa schedule.

**Tech debt:**
- **Legacy updater** (#125592) - Stale editable finder. Windows-specific.
- **npm audit** (#129426) - 4 new advisories. Maintenance burden.
- **PM/uv lock Python version** (#129751) - PM tool updates blocked hết. P2, cần fix sớm.

---

**Nhận xét:** Hermes đang trong phase ổn định session state, cache, restart flow. Desktop rất nhiều edge case (Windows permissions, macOS timeout, Linux sandbox). MCP conformance pass là win lớn. Cộng đồng frustrated với cache cost & UX regression. Roadmap không rõ, phụ thuộc #106742.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ Sinh thái AI Agent — 2026-10-02

## 1. Tổng quan hệ sinh thái

Hệ sinh thái split thành 3 tier rõ rệt:

**Production-grade** (OpenClaw, Hermes, Zeroclaw): stability chase, security hardening, multi-platform support. Codebase mature, release discipline, fleet deployment patterns.

**Mid-tier** (NanoBot, NanoClaw, QwenPaw): fix bugs nhanh, feature iteration active, community modest. Production-ready cho small deployments, chưa đủ trọng tải lớn.

**Experimental/stalled** (PicoClaw, NullClaw, IronClaw): activity low hoặc zero. PicoClaw TLS cert expired 20 days — homepage down. NullClaw, IronClaw inactive.

**Điểm nổi**: architecture convergence (SQLite session state, MCP conformance), security focus tăng mạnh (supply chain pinning, principal isolation), desktop stability vẫn pain point cross-platform.

---

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ tương tác | Trạng thái |
|-------|--------|-----|----------|---------------|------------------|------------|
| **Hermes Agent** | 88 | 500 | 0 | 13 PR merge/open, 7 issue mới | High (30 comments #97681) | Production — cache/state fixes |
| **OpenClaw** | 108 | 500 | 1 | v2026.8.34 LTS + 8 PR merge | Medium (18 comments #139710) | Production — LTS stable track |
| **Zeroclaw** | 12 | 50 | 0 | 30 PR active (gateway refactor) | Low | Production prep — v0.8.6 RC |
| **NanoBot** | 0 | 17 | 0 | 4 PR closed 01/10 | N/A | Mid-tier — SQLite migration |
| **NanoClaw** | 4 | 26 | 0 | 18 PR merge (security hardening) | Low | Mid-tier — supply chain pinning |
| **QwenPaw** | 7 | 9 | 0 | 5 PR mới (DeepSeek/gpt-6 fixes) | Low | Mid-tier — provider fixes |
| **PicoClaw** | 2 | 14 | 0 | 0 activity, TLS cert expired | Critical issue (3 comments #3377) | **Stalled** |
| **NullClaw** | 0 | 0 | 0 | 0 | N/A | Inactive |
| **IronClaw** | 2 | 2 | 0 | 0 | N/A | Quiet/incomplete data |

---

## 3. Vị thế Hermes Agent

**Ưu thế:**
- Volume lớn nhất: 500 PRs, 88 issues → codebase mature, team size lớn
- MCP conformance pass (26 scenarios, 267 checks) → tin dùng integration cao
- Community engagement strongest: #97681 (30 comments) về cross-gateway collab

**Pain points blocking dominance:**
- Cache fragility (#130895, #131031): compaction/command breaks prompt cache → cost spike → user frustration
- Desktop stability weak: Windows permissions (#124679), macOS timeout (#124972), Linux sandbox (#131055)
- Roadmap unclear: #106742 block cross-gateway feature, no public timeline

**So với OpenClaw:**
- OpenClaw ship LTS track (v2026.8.34) → fleet stability option. Hermes no release ngày 02/10.
- OpenClaw fix session catalog OOM (739-agent state) — Hermes chưa gặp scale test tương tự trong reports.
- OpenClaw issue tracking dày đặc hơn (108 vs 88), community report bugs sâu hơn.

**Positioning:** Hermes = innovation lead, feature rich, nhưng stability/polish trail OpenClaw trong production deployments. Zeroclaw catch up về architecture (gateway split, plugin system).

---

## 4. Hướng kỹ thuật chung

**Session state migration → SQLite:**
- **NanoBot** #5943: JSONL race conditions → SQLite refactor
- **OpenClaw** #163163: session store discovery optimization, bound key reads
- **Trend:** File-based state (JSONL, filesystem) fail scale/concurrency. SQLite = new standard cho single-node agents.

**MCP (Model Context Protocol) hardening:**
- **Hermes** #131078: conformance suite pass
- **NanoClaw** bump MCP SDK 1.8.0
- **Convergence:** MCP = standard integration layer. Conformance testing becomes quality gate.

**Supply chain security:**
- **NanoClaw** #3968: pin GitHub Actions + containers về SHA
- **Zeroclaw** #11306: binary size report per footprint profile
- **Pattern:** Pin dependencies exact versions, SHA-based lockfiles. Response to recent supply chain attacks.

**Principal/authorization scoping:**
- **Zeroclaw** 5 PRs (#11408-#11411): seal memory/cron/delegate cross-user leaks
- **NanoBot** #5536: sandbox requirement enforcement
- **Shift:** Early agents = single-user. Multi-tenant/enterprise → need strict isolation.

**Desktop cross-platform pain:**
- **Hermes:** Windows permissions, macOS spawn timeout, Linux sandbox SIGILL
- **OpenClaw:** Windows path leak, macOS sidebar bugs
- **Common problem:** Electron/native wrappers immature, platform-specific edge cases nhiều.

---

## 5. Điểm khác biệt

### Chiến lược phát triển

| Dự án | Chiến lược |
|-------|-----------|
| **Hermes** | Innovation velocity cao, feature-first, stability theo sau |
| **OpenClaw** | Dual-track (bleeding-edge + LTS), production fleet focus |
| **Zeroclaw** | Architecture-first (runtime composition, plugin system), chưa stable release |
| **NanoBot** | Simplicity, SQLite-centric, fewer features |
| **NanoClaw** | Security-first, supply chain hardening, enterprise ready |
| **QwenPaw** | Provider compatibility focus (DeepSeek, OpenAI gpt-6), CJK UX |

### Tính năng độc đáo

- **Hermes:** Cross-gateway collaboration (#97681) — chờ #106742 unified runtime. Ambition lớn nhất.
- **OpenClaw:** Extended-stable LTS track — only project offer long-term support channel.
- **Zeroclaw:** WASM plugin system (RFC #5574) — runtime embeddable, minimal binary profiles.
- **QwenPaw:** Advisor Mode (#7569) — pair 2 models (advisor + worker), review-driven execution.
- **NanoClaw:** Approval TTL (#3833) — expire unanswered approvals, reject by ID.

### Cộng đồng

**Hermes:** Largest, most engaged. 30-comment threads, technical depth high.

**OpenClaw:** Mature community, detailed bug reports (18 comments #139710). Users report production-scale issues (739-agent state).

**Zeroclaw:** Internal dev cycle, minimal public engagement. PRs stack deep (8 PRs #11002 gateway refactor).

**Mid-tier:** Community modest. QwenPaw first-time contributors xuất hiện. NanoBot/NanoClaw quiet but steady.

**PicoClaw:** Community stuck — homepage down → can't onboard new users.

---

## 6. Mức độ trưởng thành cộng đồng

### Production-grade (Hermes, OpenClaw, Zeroclaw)

**Indicators:**
- Release discipline (OpenClaw LTS)
- Fleet deployment patterns (OpenClaw 739-agent state test)
- Architecture refactors (Zeroclaw gateway split, Hermes unified runtime)
- Security posture (principal isolation, supply chain pinning)

**Gaps:**
- Hermes: roadmap transparency low, release cadence irregular
- Zeroclaw: no stable release yet, v0.8.6 prep long

### Mid-tier (NanoBot, NanoClaw, QwenPaw)

**Strengths:**
- Fast iteration (QwenPaw 5 PRs DeepSeek/gpt-6 trong 1 ngày)
- Security awareness (NanoClaw 18 PR hardening merge)
- First-time contributors (QwenPaw #8063)

**Limitations:**
- Scale testing không có data (NanoBot, QwenPaw chưa report 100+ agent states)
- Review velocity mixed (NanoClaw fast, QwenPaw slow cho Advisor Mode)

### Experimental/stalled

**PicoClaw:** TLS cert expired → homepage down 20 days. Issue #3377 no response từ maintainer. Community frozen.

**IronClaw:** Review process slow (PRs wait 1-2 months). Automation good (CI bot, nightly workflows), but human bandwidth low.

**NullClaw:** Zero activity. Abandoned or private fork?

---

## 7. Tín hiệu xu hướng

### Consolidation → SQLite session state

File-based state (JSONL, filesystem) hit ceiling. NanoBot, OpenClaw converge on SQLite. Expect: mid-tier projects follow within 6 months.

### MCP conformance = quality gate

Hermes pass official suite. Prediction: OpenClaw, Zeroclaw add conformance testing. MCP ecosystem matures → agent interop improves.

### Desktop stability = blocking issue

Cross-platform desktop bugs nhiều nhất (Hermes, OpenClaw). No project solve well. Prediction: 
- Electron wrappers mature within 1 year, hoặc
- Projects shift web-first, desktop secondary.

### LTS tracks emerge

OpenClaw ship extended-stable. Enterprise deployments need stability over features. Prediction: Hermes, Zeroclaw add LTS channels within 2 releases.

### Security hardening accelerates

NanoClaw supply chain pinning, Zeroclaw principal isolation. Response to recent attacks + enterprise requirements. Prediction: security becomes table stakes, projects without hardening lose enterprise traction.

### Provider race

QwenPaw chase DeepSeek, gpt-6. Mid-tier projects compete on provider breadth. Production-grade focus architecture/scale. Prediction: provider compatibility = mid-tier differentiator, not production-grade focus.

### Community health = leading indicator

PicoClaw stall from homepage down → community can't grow. Hermes, OpenClaw maintain high engagement → remain leaders. Zeroclaw low engagement but internal velocity high → watch for breakout after v0.8.6 stable.

### Winner trajectory

**Short-term (3-6 months):** OpenClaw extend lead via LTS track + production polish. Hermes maintain feature lead but stability debt grows.

**Mid-term (6-12 months):** Zeroclaw v1.0 release — if plugin system + gateway refactor land clean, challenge top 2. QwenPaw catch up via Advisor Mode differentiation.

**Long-term:** Consolidation likely. 2-3 projects capture 80% market. Mid-tier projects merge or specialize (vertical markets, specific clouds). Stalled projects die unless maintainers resurface.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo phân tích OpenClaw — 2026-10-02

## 1. Tóm tắt hôm nay

Release v2026.8.34 (extended-stable/LTS) rollback 113 fix cho correctness. 8 PR merge, 6 issue close, 3 issue mới. Activity spike: SQLite worker crash tracking, session catalog heap OOM resolved (739-agent state load test pass), session-ownership guard race fixed (Windows path leak). High engagement: tool-free channel config, browser automation redaction corruption.

---

## 2. Releases

### v2026.8.34 — extended-stable rollup
- **Định vị**: Gateway-only LTS build, August 2026 snapshot + critical backports. Current bleeding-edge = 2026.9.7.
- **Nội dung**: 113 audit-selected fix cho correctness. Không expand API. Security + reliability + model support.
- **Ý nghĩa**: Stability track cho production fleet không muốn weekly breaking changes.

---

## 3. Tiến độ dự án

### PR merged hôm nay
- **#163159** (i18n refresh) — locale sync automation, no manual bypass
- **#163143** (release recovery) — restore diagnostic loading khi npm harness isolated
- **#163161** (refactor UI) — deslop browser vocab, shorter contract types
- **#156386** (LINE test cleanup) — remove unverified privacy claims, simpler fixtures

### PR đang hot review
- **#163162** (macOS sidebar) — edit group defaults (folder, working-copy) trực tiếp
- **#163163** (session store perf) — bound discovery, chỉ đọc 1 session key thay vì enumerate all
- **#163145** (state architecture) — worker-owned incognito foundation, P1 inactive (prep for P7 migration)
- **#163150** (worker exit logging) — SQLite worker exit 62/64 recorded với reason="exit" nhưng không có code/cause, broker không log why slot failed

### Issue closed
- **#161953** (Windows session creation) — `\\?\` path leak vào ownership guard → create always fail với "owner no longer current". Fixed.
- **#163026** (session catalog startup) — 739-agent state hydrate ~60 app-server process cùng lúc, list timeout, host OOM trong 4 phút. Fixed sau #162912.
- **#162802** (Codex catalog heap OOM) — resolveRequestOptions clone full config per-agent, 739-agent state → 4 phút heap death. Fixed.
- **#162276** (2026.9.7 DataCloneError) — every agent turn fail với DataCloneError sau upgrade. Hotfix deployed.
- **#116573** (zsh config broken) — `openclaw install` phá zsh completion. Resolved.
- **#113983** (gateway lock loop 2026.7.1-2) — signal plugin never load sau `openclaw update`. Fixed.

### Issue mới
- **#163150** (worker exit logging) — as above, tracking gap
- **#163020** (transient retry strips tools) — same-model retry activates fallback-only delegation nhầm, requester completion turn mất `sessions_send`/`sessions_spawn`
- **#163005** (update failed darwin/arm64 Node 26.3.0) — global-install-failed, cần repro

---

## 4. Điểm nổi bật cộng đồng

### Issues với nhiều comment (tiếp diễn từ trước)
1. **#97616** (zombie leak, 16 comment) — hook/tool child không reap, zombie accumulation, stability bundle thấy 62/64 worker retired với no exit reason
2. **#139710** (plugin hot reload kills planner, 18 comment) — mid-turn MCP config reload supersede system-agent turn + fallback cùng lúc, error message sai
3. **#114211** (Matrix loop, 10 comment) — agent loop on "no reply" reasoning, restart replay stale session state
4. **#118185** (claude-cli duplicate transcript, 9 comment) — 1 turn written 2 lần bởi 2 writers, different assembly rules
5. **#155859** (startup scales với plugin count, 11 comment) — discord, codex, weixin mỗi cái 30+ giây, 2026.9.5 gateway 120s publication budget blown

### Tương tác mới quan trọng
- **#160343** (redaction masks code, 5 comment) — redaction mask non-secret env var trong code → corrupt source, không có exemption list
- **#157790** (tool-free channel impossible, 3 comment) — `tools.deny: ["*"]` → hard fail every turn; `tools.allow: []` → ignored. No way to say "converse but no tools".
- **#141415** (Zalo photo black, 3 comment) — hosted media URL deleted sau first GET, multi-fetch client (Zalo) retry → file gone → black box

---

## 5. Ổn định & Bugs

### Critical (P0)
- **#156917** (state-lifecycle lease, 5 comment) — hung client block gateway startup 31 min (crash loop), no heartbeat no forced takeover
- **#115642** (billing cooldown outlives outage, 8 comment) — subscription auth error → 5h provider disable, không tự phục hồi sau outage end
- **#162276** (DataCloneError) — closed, 2026.9.7 regression hotfixed

### High impact (P1)
- **#139710**, **#118185**, **#157790**, **#141415** — as above
- **#121232** (memory dreaming, 8 comment) — ranker nominate candidates applier always reject, "Ranked N, Promoted 0" forever
- **#114234** (usage-cost lock leak, 7 comment) — container reuse PID → lock never releasable → cache frozen
- **#140738** (Talk confirmation loop, 6 comment) — voice confirmation superseded, cross-session actions never execute

### Performance & resource
- **#163163** (session store discovery) — PR ready, bound to 1 key read
- **#162802**, **#163026** (heap/OOM) — both fixed, 739-agent state now stable

### Behavior bugs
- **#114128** (literal \n in Python, 4 comment) — agents write `\n` literal thông qua unquoted heredoc/bash -c
- **#159424** (compaction ignores thinkingLevel, 3 comment) — auto-compaction dùng session thinking level, không respect `compaction.thinkingLevel: low`

---

## 6. Yêu cầu tính năng

### Đã được xem xét / đang discuss
- **#161277** (drop requester_profile block, 3 comment, P2) — verified linked requester → mỗi turn +300 chars (+90 tokens) English instruction block, không có info. Propose: drop for verified users.
- **#129884** (memory search path excludes, 3 comment) — builtin memory nomic-embed rank derivative files (`memory/dreaming/`) cao hơn canonical (`memory/decisions/`, `memory/projects/`). Request: opt-in path excludes + bounded path-authority weights.
- **#121795** (include usage in infer JSON, 3 comment) — `openclaw infer model run --gateway --json` drop usage fields. Request: include `result.meta.agentMeta.usage`.
- **#70266** (macOS Talk avatar, 5 comment, P3) — Talk Mode overlay always default orb, ignore `ui.assistant.avatar`. Request: use configured avatar.
- **#114240** (browser auto-close, 4 comment) — agent không gọi `browser stop` sau xong, process remnant. Request: auto-close mechanism or `autoClose` option.

### Infrastructure / architectural
- **#160108** (cloud worker enterprise repo, PR open) — enterprise GitHub repo discovery + cloud worker binding
- **#161344** (lobster embedded LLM, PR open) — embedded workflow run native LLM stage không cần separate Gateway credential

---

## 7. Phản hồi người dùng

### Positive
- v2026.8.34 extended-stable track offer stability cho fleet không muốn weekly churn
- Session catalog OOM fix (#162802, #163026) → 739-agent production state now stable
- Windows session creation fix (#161953) → users back to working state

### Pain points
- **Startup time** (#155859): 2026.9.5 gateway + discord + codex + weixin → 120s blown, cần giảm plugin publication overhead
- **Tool control granularity** (#157790): không có cách config "converse but no tools" trong 1 channel mà không hard-fail
- **Redaction over-aggressive** (#160343, #130209): mask non-secret code/env references → corrupt source; mask browser act `key` param → agent không self-correct
- **Zombie accumulation** (#97616): hook/tool child leak → runtime degradation, stability bundle confirm issue
- **Billing cooldown persistence** (#115642): 5h fixed window không có probe recovery, subscription users stuck sau outage end

---

## 8. Backlog & Roadmap

### Đang triển khai (từ PR activity)
- **P1**: incognito worker foundation (#163145) — prep for P7 migration, host → worker ownership
- **P1**: transient retry tool-strip fix (#163020) — requester completion không mất delegation tools
- **P2**: session store optimization (#163163) — discovery bound to 1 key
- **P2**: cloud worker enterprise repo prep (#160108) — discovery + New Session default + worker binding

### Đang assess (từ issue priority)
- **P0 open**: state-lifecycle lease (#156917), billing cooldown recovery (#115642)
- **P1 high-engagement**: plugin hot reload guard (#139710), Matrix loop (#114211), tool-free channel config (#157790), Zalo media retention (#141415)
- **Deprecation tracking**: flat streaming config + resolveGroupIntroHint removal (#107860, timeline published)

### Chưa schedule
- Memory path excludes (#129884), Talk avatar (#70266), browser auto-close (#114240), requester_profile block optimization (#161277)

---

**Đánh giá tổng quan**: Project đang consolidate stability sau burst of production-scale issues (heap OOM, Windows ownership race, DataCloneError). Extended-stable track tạo breathing room cho fleet. Major open items = startup performance, tool/redaction config granularity, zombie leak. Community engagement tập trung bug reports + deployment blockers hơn là feature requests.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo Hoạt động NanoBot - 2026-10-02

## 📊 Tóm tắt hôm nay

Không có activity mới trong 24h qua. Ngày 2026-10-01 vừa kết thúc với 4 PR đóng và nhiều PR mở được cập nhật. Dự án tập trung fix bugs ổn định, bảo mật, và cải thiện kiến trúc session/state.

---

## 🚀 Releases

Không có.

---

## 📈 Tiến độ dự án

**PRs đóng ngày 01/10:**

- **#5999** - Dọn unused helpers sau refactor runtime và WebUI transport
- **#2095** - Add `read_image` tool cho multimodal - conflict, đóng
- **#2094** - Explicit subagent model config + runtime reload - conflict, đóng

**PRs priority cao đang mở:**

- **#5953** [P0] - Atomic writes cho file tools → ngăn torn content và data loss khi crash
- **#5943** [P1] - Session state ownership chuyển sang SQLite, thay JSONL → fix race conditions
- **#5885** [P1] - Gate transcript replacement theo token threshold → giữ resume quality cho session ngắn
- **#5536** [P1] - Fail closed khi restricted shell thiếu sandbox → security critical
- **#5698** [P2] - Preserve API type khi toggle search → UX bug

**Xu hướng:**
- Architecture shift: session state → SQLite (#5943), atomic writes (#5953)
- Security hardening: sandbox requirement (#5536), SSRF guards (#5678)
- Memory/resume quality: transcript threshold (#5885), delayed message handling (#5483)

---

## 💬 Điểm nổi bật cộng đồng

Không có comment counts trong data. Based on labels:

- **#5536** - Security P1, nhiều labels (bug/doc/test/security) → critical attention
- **#5943** - Large refactor với doc/test/perf labels → core infrastructure change
- **#5953** - P0 atomic write fix → blocking issue

---

## 🐛 Ổn định & Bugs

**Critical (P0-P1):**

1. **#5953** [P0] - File tools không atomic → torn reads, data loss window khi crash
2. **#5536** [P1] - Restricted shell thiếu sandbox vẫn execute → security hole
3. **#5943** [P1] - JSONL session state có race conditions → SQLite refactor

**Medium (P2):**

4. **#5483** - Deleted sessions bị recreate bởi delayed messages
5. **#5698** - Search toggle làm mất API type setting
6. **#5257** - Sustained goal loop khi idle → spam replies
7. **#5412** - Background process output không flush → logs bị buffer

**Low severity:**

8. **#5339** - Temporary chat messages không reject khi connection cleanup
9. **#5678** - Empty DNS results không reject → SSRF bypass risk
10. **#5166** - Inherited goal permission persist ngoài scope

---

## ✨ Yêu cầu tính năng

- **#5941** - Connect WebUI tới remote nanobot instances (NAN-157) → multi-instance support
- **#5825** - Provider-neutral structured decision client → thay JEV-specific, add OpenRouter/System One protocol
- **#2095** (closed) - `read_image` tool cho local multimodal inspection
- **#2094** (closed) - Explicit subagent model config

---

## 💭 Phản hồi người dùng

Không có comment data để phân tích sentiment. Based on issue patterns:

- Users gặp data loss (torn writes #5953)
- Security concerns với shell execution (#5536)
- Session reliability issues (#5943, #5483)
- UX frustrations với API settings (#5698)

---

## 🗓️ Backlog & Roadmap

**Immediate (P0-P1 open):**
- Atomic file writes (#5953)
- SQLite session migration (#5943)
- Sandbox requirement enforcement (#5536)
- Transcript replacement optimization (#5885)

**Upcoming features:**
- Remote instance connection (#5941)
- Structured decision client (#5825)

**Tech debt:**
- Multiple "conflict" labeled PRs → merge conflicts cần resolve
- Test coverage expansion (nhiều PR có test label)
- Documentation updates (doc label phổ biến)

**Pattern:** Dự án ưu tiên stability/security trước features. Nhiều PRs cũ (từ tháng 7-8) vẫn open → review capacity hoặc complex changes.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw 2026-10-02

## Tóm tắt hôm nay

Zeroclaw đẩy mạnh security hardening và plugin infrastructure. 30 PRs đang review, tập trung vào gateway refactor (#11002), principal-scoped authorization, và WASM plugin lifecycle. Không có release mới.

## Releases

Không có release trong 24h qua.

## Tiến độ dự án

### Gateway Restructure (Epic #11002)
Stack 8 PRs đang port dashboard routes sang `zeroclaw-gw` binary riêng:
- #11351: dashboard routes core ✓
- #11381: session messages/state/delete
- #11382: status, logs, doctor, event stream
- #11384: skills, personality
- #11417: config writes, Quickstart, reload
- #11377: `/ws/sops/runs`, `/api/version/check`

**Ý nghĩa:** Tách gateway khỏi daemon monolith → scale riêng, deploy độc lập.

### Security Lockdown (Principal Authorization)
Stack 5 PRs từ @Aarlington enforce owner isolation:
- #11408: SOP RPC admission + storage guards
- #11409: refuse owned background delegates
- #11410: guard cron writes, contain unscoped execution
- #11411: enforce private SOP run ownership audit
- #11223: authority effect ratchet tests

**Vấn đề:** Memory tools, cron, delegates đang bypass principal scope → leak data across users. Các PR này seal từng hole.

### Plugin System Maturity (RFC #5574 Phase 2)
@IftekharUddin ship plugin infrastructure cuối cùng:
- #11236: recover failed installs via `plugin remove`
- #11302: channel instance binding + grant seeding at install
- #11303: WebSocket lifecycle e2e test
- #11305: tool tier docs (93 tools → 4 tiers)
- #11306: binary size report per footprint profile
- #11308: typed built-in tool inventory
- #11309: Quickstart install/activate plugins
- #11311: release artifact smoke test
- #11347: ship WASM host trong dist artifacts
- #11348: report plugin channel health
- #11356: replace channel instance sau trap
- #11322: forward plugin webhooks qua RPC

**Scope:** Plugin system chín → operators cài tool từ artifact binary, không cần build source.

### Runtime Composition Boundary (#7432 Phase 2)
- #11174: capability-taking constructors cho turn entry
- #11187: build `DefaultCapabilities` ở app layer, CLI agent dùng nó
- #11221: gate SaaS + coding tools sau opt-in features

**Goal:** Runtime embeddable, crates độc lập. Giảm binary size cho minimal deployments.

### Config Safety
- #11370: lock data dir khi load config, resume interrupted splits

Fixes #11369: Docker image từ master exit vì config path mismatch.

## Điểm nổi bật cộng đồng

- #11418: Copy button không work (0 comments, mới mở)
- #11416: Slack "is thinking…" status mất từ v0.8.5 (#8985)
- #11387: `zerocode` ignore launch directory again (regression #10609)

Minimal engagement → community quiet hoặc internal dev cycle.

## Ổn định & Bugs

### Priority P0 (workflow blocked / data loss)
- #10066: SOP engine promote steps trước khi record output-schema rejection
- #10495: `Config::save()` replace operator config.toml bằng near-empty file (109KB → 702B)
- #11198: Delegated memory tools lose principal scope → security hole
- #11369: Docker images từ master exit at startup

### Regression
- #11387: `zerocode` force agent workspace làm cwd, ignore shell launch dir (bug #10609 quay lại)

### Plugin Issues
- #11336: `plugin info`, `plugin list --verify` report `[loads]` cho plugin runtime refuse register (config values không có `config_schema`)

## Yêu cầu tính năng

Không có feature request mới. Đang ship roadmap #7432 (runtime composition), #5574 (plugin system), #11002 (gateway split).

## Phản hồi người dùng

- @bryangruneberg: Slack thinking status mất → UX regression
- @JonathanMcCormickJr: Copy button broken → clipboard feature fail
- @singlerider: zerocode cwd bug regress

Feedback ít, tập trung vào regressions.

## Backlog & Roadmap

### Đang chạy
- **v0.8.6 release prep:** 15 PRs tagged `release:v0.8.6`
  - Plugin system features (#11302-#11356)
  - Runtime composition (#11174, #11187, #11221)
  - Gateway refactor (#11351+)
  - Config safety (#11370)
  
- **v0.9.0 features:** 4 PRs tagged `release:v0.9.0`
  - Security fixes (#11198, #11187, #11221)
  - Docker startup (#11369)

### Blocked / Follow-up
- #10162: plugin install không retry seed phase
- #10766: ZeroRelay carry authenticated principal (không collapse `shared_operator`)
- #10993: complete public runtime composition boundary
- #10998: deliver minimal core tool set + binary size evidence

### Architecture Debt
Issues tagged `domain:architecture` + `risk:high`:
- Runtime composition boundary chưa sealed
- Principal authorization holes đang patch dần
- Gateway monolith đang tách

**Pattern:** Refactor lớn đang chạy song song → merge risk cao, cần coordination.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw · 2026-10-02

## 🔍 Tóm tắt hôm nay

Không có hoạt động mới ngày 2/10. Tất cả item (2 issue, 14 PR) đều từ ngày trước, chỉ có cập nhật nhỏ vào 1/10. Dự án đang có vấn đề nghiêm trọng: TLS certificate trang chủ hết hạn từ 10/9, site down hoàn toàn.

## 📦 Releases

Không có release.

## 🚀 Tiến độ dự án

**Đóng băng phát triển tính năng mới.** 14 PR đều từ 8/9-1/10, nhiều PR đánh dấu `stale`:

**Bug fixes (5 PR đang open):**
- #3403: Async tool results gửi nhầm session → đi vào default agent thay vì agent gốc
- #3402: Context manager dùng nhầm default agent thay vì routed agent  
- #3401: Channel reload panic khi channel config sai
- #3400: Multi-key model mất `api_keys` và `enabled` flag khi save config
- #3399: ARM 32-bit update nhầm binary arm64

**Dependency updates (5 PR):**
- golang.org/x/crypto: 0.53.0 → 0.57.0
- anthropic-sdk: 1.55.1 → 1.74.0
- mautrix: 0.27.0 → 0.31.0
- line-bot-sdk: 8.20.1 → 8.22.0
- mcp go-sdk: 1.6.1 → 1.8.0

**Features:**
- #3414: Wall-clock turn time budget cho agent (ngăn loop vô hạn)
- #3371: OpenCode Go provider với session header
- #423: Multi-agent collaboration framework (WIP từ 18/2)

**Closed:**
- #3376: Fix deltachat channel validation error

## 💬 Điểm nổi bật cộng đồng

**#3377 - Critical: TLS cert hết hạn** (2 👍, 3 comments)  
picoclaw.io down từ 10/9. Certificate expire 2026-09-10 23:59:59 UTC. Mọi browser từ chối kết nối. Issue mở từ 12/9, vẫn chưa fix sau 20 ngày.

**#3391 - Bug: Multi-line input bị split**  
Client mobile TUI tự động chia message nhiều dòng (thơ, code) thành nhiều message riêng lẻ. Phá vỡ cấu trúc nội dung.

## 🐛 Ổn định & Bugs

**Nghiêm trọng:**
- Homepage không truy cập được (TLS cert hết hạn)
- Agent routing sai session (#3403, #3402) → kết quả async tool đi nhầm user
- Channel reload panic (#3401)

**Vừa phải:**
- Config persistence mất keys (#3400)
- Platform detection sai cho ARM 32-bit (#3399)
- Multi-line message handling (#3391)

## ✨ Yêu cầu tính năng

**#3414: Turn time budget**  
Giới hạn thời gian thực (wall-clock) mỗi turn. Agent phải dừng và tổng kết thay vì loop đến `max_iterations`. Default 0 (disabled).

**#423: Multi-agent collaboration**  
Framework cho nhiều agent làm việc chung: blackboard (shared context), agent handoff, discovery tools. WIP từ tháng 2.

## 📢 Phản hồi người dùng

Không có comment mới ngày 2/10. Cộng đồng im lặng, có thể do:
- Homepage down → user mới không vào được
- Nhiều bug chưa fix → user chờ đợi
- Stale PRs → developer chưa review

## 🗺️ Backlog & Roadmap

**Ưu tiên cao (chưa xử lý):**
- Fix TLS cert (#3377) - blocking mọi user mới
- Merge 5 bug fix PR (session routing, config, reload)

**Backlog:**
- Review và merge/close 5 dependency update PR
- Hoàn thiện multi-agent framework (#423)
- Fix multi-line input (#3391)

**Vấn đề quy trình:**
- PRs không được review kịp → `stale` bot đánh dấu
- Critical issue (#3377) mở 20 ngày không response từ maintainer

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-02

## 📊 Tóm tắt hôm nay

Đợt hardening và cleanup lớn: 18 PR merged (chủ yếu security + CI pinning), 4 issue mới (bugs về CLI pagination + approval expiry + proxy credential leak). Không có release. Core team @glifocat chịu trách nhiệm phần lớn công việc bảo mật.

---

## 🚀 Releases

Không có release.

---

## 📈 Tiến độ dự án

### PRs merged quan trọng (18 total)

**Security hardening (6 PRs)**
- #3968: Pin tất cả GitHub Actions + cosign về SHA cố định → ngăn supply chain attack qua moved tag
- #3982, #3981: Pin Iron Proxy lên v0.52.0, bump grpc 1.83.2 → xóa 36 CVE advisory
- #3983: Fix log redaction bị bypass khi value chứa BigInt/cycle → secret có thể leak ra log
- #3978: Bật Dependabot cho Actions, xóa Renovate config không hoạt động
- #3989 (OPEN): Pin OneCLI gateway 1.42.0 → fix credential-injection bypass

**Setup & update fixes (4 PRs)**
- #3901: Host service giờ reach internet qua HTTPS proxy (env `HTTPS_PROXY` vào systemd)
- #3985 (OPEN): Proxy credentials không còn lưu plaintext trong service file 0644
- #3956: Rollback giờ stop đúng process (nohup case) + drain agent containers trước khi swap `data/`
- #3986 (OPEN): `/update-nanoclaw` follow release tag mặc định (channel `stable/beta/dev`), không còn track `main`
- #3988 (OPEN): Update refresh gateway khi chỉ skill payload thay đổi

**Approval & agent-runner fixes (2 PRs)**
- #3833 (OPEN): Approval cards giờ có TTL, expire nếu không trả lời; cho phép reject by ID
- #3918 (OPEN): Fix agent mất/lặp reply xung quanh `send_message` (cả streaming + end-of-turn provider)

**Provider & gateway features (3 PRs)**
- #3966: Iron cho phép keyless model local qua `http://host.docker.internal:<port>/v1`
- #3965: OpenCode setup check model URL với gateway ngay lúc prompt, không fail sau
- #3964: Provider declare exact `host:port` endpoint → auto-approve, không raise card mỗi call

**CI & test (3 PRs)**
- #3977: Bump tsx 4.23 → stop Node 26 module.register deprecation warning
- #3979: OneCLI gateway test umask-independent (fix fail trên umask 077)
- #3963: Update e2e test dùng `unlinkSync` thay `rmSync` cho symlink → pass Node 24 < 24.13.1

**Misc (2 PRs)**
- #3980: Setup first-chat ping score "run failed" notice như thất bại, không phải success
- #3208: Publish agent image lên Docker Hub (workflow manual-dispatch + CVE gate)
- #3570 (OPEN): Bump chat-sdk 4.38.1 → fix Telegram drop URL có số lượng underscore lẻ (OneCLI connect link mất)

**Community skills closed (2 PRs)**
- #1343: `/add-cli-backend` skill (dùng `claude -p` thay SDK, comply TOS) → đóng
- #147, #146: Dropbox + Google Workspace skill (rclone/gogcli) → đóng

### Xu hướng

Core team tập trung vào:
1. **Supply chain security**: Pin dependencies + actions + containers → reproducible build
2. **Gateway isolation hardening**: Proxy support, local model keyless, endpoint whitelisting
3. **Stability fixes**: Approval TTL, agent-runner message loss, update/rollback edge cases
4. **Release process**: Pre-release workflow (rc.N self-approved), update channel tracking

---

## 🌟 Điểm nổi bật cộng đồng

**#3456 (6 comments, Aug 23)**: Discord approval card bị corrupt `custom_id` vì redundant `value` param → mọi click resolve sai option. Severity high, chưa có fix PR.

**#3991, #3990 (mới hôm nay)**: User @drsmk238 mở 2 issue về OneCLI:
- CLI `list` command chỉ trả 20 row nếu không có `--max`
- Feature request: `security-audit` skill read-only check isolation + patch state

Không có PR nào có nhiều reaction. Community skill PRs (#1343, #147, #146) bị close sau nhiều tháng không review.

---

## 🐛 Ổn định & Bugs

### Bugs đang open

1. **#3456 (critical)**: Discord approval button corrupted → unusable
2. **#3991**: OneCLI pagination bug (chỉ 20 row)
3. **#3984**: PreCompact hook crash vì call `getAllDestinations()` without registered mailbox

### Bugs fixed hôm nay (via merged PRs)

- Log redaction bypass (#3983)
- Proxy credential leak trong service file (#3985, #3901)
- Agent reply loss/duplication (#3918)
- Setup first-chat false positive (#3980)
- Update rollback không stop đúng process (#3956)
- Gateway không refresh khi chỉ skill payload đổi (#3988)
- OneCLI test umask-dependent (#3979)
- Node 26 warning spam (#3977)

---

## 💡 Yêu cầu tính năng

**#3990**: `security-audit` skill → read-only check toàn bộ isolation config (wirings, user_roles, cli_scope, mount allowlist, gateway rules). Mục tiêu: catch drift trước khi incident.

**#3986 (PR open)**: Update channel system → user pick `stable/beta/dev`, không còn hard-coded `main`.

**#3964 (merged)**: Provider declare exact endpoint → auto-approve model call.

---

## 💬 Phản hồi người dùng

User @drsmk238 active: mở 2 issue + 1 PR trong 1 ngày → quan tâm OneCLI hardening + audit tool.

User @worthogdotorg report PreCompact hook bug (#3984) → show họ dùng compaction feature.

Community skill contributors (@JiehoonKwak, @erikmuttersbach) không có follow-up sau khi PR bị close → có thể mất động lực contribute.

---

## 🗓️ Backlog & Roadmap

**Từ PR activity:**
- Release workflow chuẩn hóa (pre-release + stable approval)
- Dependabot rollout đang thảo luận (#3978 draft)
- Docker Hub publishing đã setup (#3208)
- Iron Proxy stabilization (pinned v0.52.0)

**Chưa resolve:**
- Discord approval card bug (#3456) → chưa có PR
- PreCompact mailbox issue (#3984) → chưa có PR
- Telegram URL underscore bug (#3570) → PR open từ Aug 27

**Trend**: Dự án đang shift từ feature velocity sang security + stability hardening. Volume PR merge cao (18 trong 1 ngày) nhưng hầu hết là fix/pin, không phải feature mới.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw — 2026-10-02

## 1. Tóm tắt hôm nay

Không có hoạt động mới trong ngày 2026-10-02. Dữ liệu đầu vào chỉ chứa 2 issues và 2 PRs từ các ngày trước (issue mới nhất: 2026-10-01, PR mới nhất: 2026-08-29). Dự án đang trong giai đoạn yên tĩnh hoặc dữ liệu chưa đầy đủ.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

### Issues đang mở

**#8121** — Daily failure taxonomy (2026-10-01)
- Bot tự động phân tích lỗi benchmark hàng ngày
- clawbench có 128 non-pass, chủ yếu từ lỗi workspace-seeding ở phía benchmark
- Cho thấy dự án có quy trình CI/monitoring chặt chẽ

**#2358** — Browser profile persistence (mở từ 2026-04-12)
- Cần lưu trạng thái browser (cookies, localStorage) giữa các lần chạy agent
- Dùng encrypted tarball để bảo vệ bearer tokens
- Issue cũ chưa giải quyết (6+ tháng) → có thể bị block hoặc độ ưu tiên thấp

### Pull Requests đang chờ

**#7499** — IdentyClaw Passport integration (mở từ 2026-08-11)
- Thêm host seam cho agent gọi IdentyClaw Passport không cần shell/extension
- Size XL, risk low → feature lớn nhưng an toàn
- PR từ contributor mới (@discernible-io)
- Chờ review 2 tháng → review process chậm hoặc thiếu bandwidth

**#7988** — Codebase knowledge graph refresh (2026-08-29)
- Bot CI tự động refresh knowledge graph
- PR routine từ automation
- Chờ 1 tháng → không critical hoặc merge thủ công theo batch

## 4. Điểm nổi bật cộng đồng

Không có tương tác đáng kể:
- Issues/PRs đều 0 reactions
- Issue #2358 chỉ có 1 comment
- Cộng đồng nhỏ hoặc giao tiếp nội bộ

## 5. Ổn định & Bugs

**#8121** daily taxonomy report:
- 128 non-pass trong clawbench
- Root cause: benchmark-side workspace defect (không phải lỗi IronClaw core)
- Monitoring system hoạt động tốt, phát hiện issue nhanh

## 6. Yêu cầu tính năng

**Browser session persistence** (#2358):
- Agent cần giữ authentication state giữa các lần chạy
- User-data-dir 50-200MB chứa cookies/tokens
- Cần encryption cho bearer tokens
- Feature quan trọng cho UX nhưng chưa implement

**IdentyClaw integration** (#7499):
- Host-mediated Passport cho practitioner workflows
- Loại bỏ dependency vào shell/installable extensions
- Mở rộng khả năng identity management

## 7. Phản hồi người dùng

Không có feedback công khai trong dữ liệu. Issues/PRs thiếu discussion threads.

## 8. Backlog & Roadmap

Từ open issues/PRs:
- **Browser persistence** — backlog lâu (6+ tháng), có thể cần architecture decision
- **Knowledge graph automation** — đã có workflow, cần merge routine updates
- **Identity integration** — feature mới đang review, có thể là major milestone nếu merge

**Nhận xét**:
- Review velocity chậm (PRs chờ 1-2 tháng)
- Automation infrastructure mature (CI bot, nightly workflows)
- Community engagement thấp trong public channels

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-10-02

## Tóm tắt hôm nay

Không có release. 9 PRs active (5 mới), 7 issues (4 mới). Trọng tâm: sửa bugs provider (DeepSeek, OpenAI gpt-6), cải thiện UX (CJK markdown, background task notify), tăng cường bảo mật (skill name sanitization).

---

## Releases

Không có.

---

## Tiến độ dự án

### PRs đang active (9)

**Sửa bugs provider/formatter:**
- **#8070** (OPEN) - DeepSeek chỉ hỗ trợ image, không nhận PDF/audio. Formatter mặc định gửi nhiều loại → 400 error. Fix: filter `input_types` chỉ còn `image/*`.
- **#8069** (CLOSED) - duplicate của #8070, đã đóng.
- **#8066** (OPEN) - Media block rỗng (0-byte image) gây 400 từ mọi provider. Fix: drop empty blocks trước khi format request.
- **#8074** (issue) - OpenAI gpt-6 models fail connection test. Whitelist `_uses_max_completion_tokens` chỉ match `gpt-5*` và `o<digit>*`. Cần thêm `gpt-6*`.

**Sửa bugs console/UX:**
- **#8067** (OPEN) - CJK emphasis markdown render sai: `**text。**` → punctuation inside bold delimiter → CommonMark flanking rule fail → không bold. Fix: preprocess, tách punctuation ra ngoài.
- **#8068** (CLOSED) - duplicate #8067, đã đóng.
- **#8063** (OPEN, first-time-contributor) - Background task finish → không notify parent session → kết quả chết. Fix: wake parent qua WebSocket event.
- **#8073** (issue) - v2.2.2.beta4 conversation page crash khi access từ LAN (không crash từ localhost). Chưa có PR.

**Bảo mật:**
- **#8065** (OPEN) - `skill_name` không sanitized → path traversal (CodeQL flag). Attacker gửi `../escape` → escape skill root. Fix: `Path.resolve()` + validate.

**Testing:**
- **#8072** (OPEN) - E2E tests flaky vì shared state. Seed isolated fixtures, assert current UI contracts.

**Feature lớn:**
- **#7569** (OPEN, XXXL) - **Advisor Mode**: pair 2 models (advisor + worker), advisor lên plan ban đầu, worker execute, advisor review từng step. Status: review từ 2026-09-05, chưa merge.

**Xu hướng:** Ưu tiên sửa bugs provider (DeepSeek, OpenAI gpt-6), cải thiện CJK UX, đóng lỗ bảo mật.

---

## Điểm nổi bật cộng đồng

**Tương tác cao:**
- **#6274** (1 👍, 3 comments) - yêu cầu `ask_user_question` tool cho Human-in-the-Loop. Agent chưa chắc → hỏi user → tiếp tục. Feature hợp lý, mở từ 2026-07-20, chưa implement.

**Vấn đề người dùng quan tâm:**
- **DeepSeek session break (#8064)**: gửi PDF → session chết vĩnh viễn, mọi request sau đều 400 `file must have file_id`. Critical bug, ảnh hưởng cả aggregator route deepseek models.
- **gpt-6 không test được (#8074)**: OpenAI mới release gpt-6, QwenPaw chưa update whitelist.
- **LAN access crash (#8073)**: v2.2.2.beta4 regression, chỉ crash khi access từ thiết bị khác (không localhost).

---

## Ổn định & Bugs

**Critical:**
- **#8064** - DeepSeek PDF session break. Chưa có PR. Workaround: tránh gửi PDF đến DeepSeek.
- **#8073** - LAN conversation page crash (v2.2.2.beta4). Chưa có PR. Blocking release ổn định.

**High:**
- **#8074** - gpt-6 models fail connection test. Fix dễ (thêm pattern `gpt-6*`), chưa có PR.
- **#8065** - skill path traversal. PR đã có, chờ merge.

**Medium:**
- **#8067** - CJK markdown emphasis render sai. PR đã có, không critical nhưng ảnh hưởng UX Trung/Nhật/Hàn.
- **#8066** - empty media block → 400. PR đã có.
- **#8063** - background task result không notify. PR đã có.

**Low:**
- **#8076** - reload timeout expire → in-flight turns bị abandon im lặng (24h budget). Đề xuất notify room + cancel tasks.
- **#8072** - E2E flaky tests. PR đã có.

---

## Yêu cầu tính năng

1. **Human-in-the-Loop (#6274)**: tool `ask_user_question` cho agent hỏi user khi gặp ambiguity. Mở 3 tháng, chưa implement. Community interest có (1 👍).

2. **Plugin theme extension (#8071)**: plugin chỉ set được `colorPrimary`, muốn customize sâu hơn (semantic tokens). Đề xuất plugin-facing theme API.

3. **Advisor Mode (#7569)**: feature XXXL, đang review 1 tháng. Pair 2 models, advisor lên plan + review, worker execute.

4. **Codex SDK update (#8075)**: bundled SDK version cũ (0.144.4), chỉ list 4 models. Update lên 0.159.3 → discover thêm nhiều gpt-5/gpt-6 models.

---

## Phản hồi người dùng

**Pain points:**
- DeepSeek PDF bug → session unusable, phải tạo session mới. User report aggregator cũng bị (model id chứa `deepseek`).
- gpt-6 connection test fail → người dùng không thể verify config mới.
- LAN access crash → deployment production không dùng localhost → blocker.

**Positive:**
- First-time contributors xuất hiện (#8063, #8069/70), community bắt đầu contribute fixes.
- CJK UX improvement (#8067) → quan tâm đến thị trường châu Á.

**Requests:**
- Nhiều người muốn Human-in-the-Loop (ask_user_question), nhưng chưa thấy priority cao.

---

## Backlog & Roadmap

**Immediate (đang xử lý):**
- Sửa DeepSeek PDF bug (#8064) - chưa có PR, cần ưu tiên.
- Merge security fix (#8065) - path traversal critical.
- Merge gpt-6 support (#8074) - chưa có PR nhưng fix đơn giản.
- Sửa v2.2.2.beta4 LAN crash (#8073) - blocking release.

**Short-term (có PR, chờ review/merge):**
- CJK markdown (#8067)
- Empty media block (#8066)
- Background task notify (#8063)
- E2E test isolation (#8072)

**Mid-term (đang review hoặc đề xuất):**
- Advisor Mode (#7569) - feature lớn, review 1 tháng.
- Codex SDK update (#8075)
- Reload timeout notify (#8076)

**Long-term (feature request chưa implement):**
- Human-in-the-Loop tool (#6274) - mở 3 tháng.
- Plugin theme API (#8071) - mới đề xuất.

**Xu hướng roadmap:** Ổn định provider integrations (DeepSeek, OpenAI gpt-6), cải thiện CJK/international UX, tăng cường bảo mật. Feature mới (Advisor Mode, Human-in-the-Loop) ở backlog thấp hơn bugfixes.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*