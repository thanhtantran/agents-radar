# Bản tin Hệ sinh thái Hermes Agent 2026-10-25

> Issues: 171 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-25 02:00 UTC

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

# Báo cáo Hermes Agent — 2026-10-25

## 📊 Tóm tắt hôm nay

Ngày bận rộn với 9 PR merged (chủ yếu bugfix), 30+ issue được cập nhật. Focus: sửa lỗi plugins bị tắt sau update, khôi phục Kanban desktop delivery, cải thiện update process trên Windows. Không có release mới.

---

## 🚀 Releases

Không có release trong 24h qua.

---

## 📈 Tiến độ dự án

### PRs merged quan trọng (9 PRs)

**Plugin ecosystem stability** (#144220)
- **Vấn đề**: Plugins có dependency không hỗ trợ Android (mnemosyne/onnxruntime, torch) bị tắt mỗi lần update trên Linux/macOS
- **Sửa**: Skip compatibility check nếu platform không chạy Android
- **Impact**: mnemosyne và torch-backed plugins không còn bị disable sai

**Web search toolset visibility** (#144215, #134617, #140643)
- **Vấn đề**: Sau Blank Slate setup, bật "web" toolset không load `web_search` (chỉ có `web_extract`)
- **Root cause**: Internal `search` toolset không register vào `CONFIGURABLE_TOOLSETS`, config disabled nó khi enable `web`
- **Sửa**: Surface `search` trong CLI picker, fix subset removal logic
- **Result**: `hermes tools` bật web → `web_search` hoạt động; `hermes tools list` cảnh báo disabled toolset ẩn tools

**Model download reliability** (#144211)
- Interrupted downloads resume từ bytes đã lưu (cả khi process bị kill)
- Connection drop nhiều lần vẫn thành công nếu còn tiến triển
- Salvage từ #143453 (@ocasta181)

**Gateway & Desktop fixes**
- #144231: Khôi phục Kanban delivery tới local Desktop sessions (wake events vào FIFO, toast notifications)
- #144180: `tool_search` catalog giữ descriptions cho small servers khi có huge MCP server; `hermes plugins install` interactive answer "y" load plugin vào gateway đang chạy
- #140594: Verify-on-stop không nudge 2 lần cho 1 edit; bash wrapper record exit status cho từng pipeline segment

**Prompt optimization** (#144173, #144216)
- `browser_exec` không còn nói với vision models "Your model cannot view images"
- 4 tool schemas drop 319 tokens/call (tools: 14,487 → 14,168)
- One-shot sessions giữ synchronous delegation; compression tail cap cover big windows

**Test stability** (#144224, #144229, #144230)
- Model picker không đợi 16s khi offline (chỉ lần đầu, sau đó skip 5 phút)
- Usage test và ACP editor-MCP fork test không còn flake under CI load
- #129837: NixOS `extraPythonPackages` không drop dependency groups

**Shell & config fixes**
- #144232: `_wrap_command_script` restore shell options sau wrapped command (leak `set -e` vào epilogue)
- #142528: Windows PM runtime lease files được prune (trước tích lũy 1,546 files)

### PRs đang review (11 PRs open)

**Feature: Tool execution safeguards**
- #141018: Bot Desktop screen tự stop sau idle window (discussion: abandoned screen lifecycle)
- #114586: Kanban completion safeguards (live-verification gate, liveness surfacing, stale-work watchdog)

**Bug fixes in review**
- #144201: Abandon streaming worker khi stale kill không unwind (2.6h stall Windows desktop)
- #122566: Multi-hunk V4A patch apply theo file order
- #126158: `terminal.worker_memory_max_mb` raise worker scope MemoryMax (systemd)
- #134422: TUI gateway treat mid-reply client close là disconnect, không phải error
- #122409: Không swap `--model`/`--provider` pinned route sang fallback khi startup AuthError
- #129090: Background review fork survive deleted cwd/TERMINAL_CWD
- #122230: Skip Copilot credential seeding khi provider disabled
- #122233: Accept `--board` sau create action (`hermes kanban create "x" --board ops`)
- #122249: Derive `/v1/<signal>` cho bare OTLP endpoints

**Test improvements**
- #125179: HOME_IO_GUARD treat stat của PATH entry là command lookup

### Plugin ecosystem
- #144192: Thêm Conxt memory provider vào catalog (conxtdevelopmentteam/hermes-conxt)

---

## 🔥 Điểm nổi bật cộng đồng

**Top discussions (theo comments)**

1. **#134889** (217 comments): Unified gateway (#106742) post-merge fixes tracking
   - Gateway owns mọi local session từ Oct 14
   - CLI, TUI, Desktop, API server, editors, bots, cron jobs → 1 gateway process

2. **#131055** (23 comments): Linux Desktop second-instance poison sandbox fallback
   - Launch duplicate → `windows-sandbox-fallback.json` stuck at fallback
   - Mọi launch sau → `--no-sandbox` → renderer SIGILL loop

3. **#139818** (14 comments): Remote-backend desktop sessions không resume từ local desktop
   - `session.resume` fail với `not_found`
   - Conversations từ `hermes serve --host 0.0.0.0` không reload sau restart

4. **#143379** (14 comments): RFC về doc-chain substrate network
   - Read governance, compaction strategy
   - Durable record survive compression với provenance intact

5. **#143547** (14 comments): Unified gateway open problems continuation
   - CLI, TUI, Desktop app, API server, editors, messaging bots, cron jobs hand turns tới 1 process

**User pain points**

- **Session state loss**: #139818, #139796 (resume fails `not_found`), #136189 (shutdown flush key mismatch)
- **Windows stability**: #131055 (sandbox fallback), #133253 (update timeout ~1GB state.db), #139132 (update loop)
- **Gateway lifecycle**: #143775 (stale PID block start), #142488 (model switch crash tuple moved)
- **Tool configuration**: #31246 (MCP misconfiguration invisible), #101007 (lazy never engages), #42585 (web_search exposed via browser khi web disabled)

---

## 🐛 Ổn định & Bugs

### P0/P1 open issues

**#134889** (P0, 217 comments): Unified gateway post-merge tracking
- Multiple surface integration issues
- Risk: session-state, message-delivery, compatibility, Windows

**#136015** (P1): Docker lazy platform install drop `mcp`
- First gateway lazy install build PM env với chỉ requested extra
- Image venv có `mcp`, new env không → configured MCP servers disappear

**#79087** (P1): Windows desktop runtime probe timeout → reinstall offer
- Probe timeout route healthy install tới first-run onboarding

### P2 bugs được fix hôm nay

- ✅ Plugins disabled sai (#144220)
- ✅ Web search missing (#144215)
- ✅ Download resume (#144211)
- ✅ Kanban delivery (#144231)
- ✅ Tool schema bloat (#144173)
- ✅ Windows lease files (#142528)

### P2 bugs chưa fix

**Session management**
- #139796: Desktop resume `not_found` cho sessions không trong memory registry
- #142488: Model switch crash tuple moved cho profile-following sessions
- #143767: Desktop resume pre-compression session → model switch refused `session_superseded`
- #143715: Bot Chat delivery refused `not_found` khi title held by unbound tui session

**Gateway & tools**
- #143775: Stale post-boot host rendezvous (dead PID) block gateway start
- #142839: `model.default` với provider prefix forwarded verbatim → 503 model_not_found
- #141390: macOS cloud browser socket path exceed 103-byte AF_UNIX limit
- #143817: Background review archive active skill không absorb (guard chỉ check name)
- #143918: Image attachments không evict → multi-MB relay body mỗi LLM call

**Platform-specific**
- #135183: Desktop update abort exit 3 under comma-decimal locale (LC_NUMERIC=it_IT)
- #99889: Windows desktop style recalc freeze (48% renderer time, 1.4s recalc 6k nodes)
- #139091: Stable update 10s merge-base timeout (partial clone, commit-graph disabled)
- #143426: Linux desktop launch 6% opacity (translucency default via setOpacity)

**Config & tools**
- #99943: Compressor context window clamp tới `ollama_num_ctx` trên cloud providers (1M → 65,536)
- #101007: `mcp_servers.<name>.lazy` never engage (cache `ttl_ms: 0` treated expired)
- #78007: A2A long tasks không complete (client timeout 120s < server window 300s)

---

## 💡 Yêu cầu tính năng

**Desktop & sessions**
- #50718 (P3, 12 comments): Session visibility & notifications
  - Unread markers, needs-input cues, OS badges
  - 3 issues: no unread cue, unclear working state, no OS badge

- #48997 (P2, 6 comments): Desktop close abandoned runtime sessions & owned backends
  - Explicit lifecycle cho sessions

- #12130 (P3, 5 comments): TUI v2 feature-parity vs v1 CLI
  - Missing: ~23/48 slash commands, `@file:/@diff:` refs, Skills Hub, Tools Config, Cron...

**Kanban & automation**
- #138836 (P2, 5 comments): Desktop Kanban delivery policy gaps
  - Notify/wake, compaction, attention events

- #29458 (P2, 11 comments): Kanban `active_pr` respawn guard
  - No operator clear path, ignore closed PRs

- #109375 (P2, 6 comments): Skill background review lost trong Kanban/Group Bot short-lived runtimes

**Tools & integrations**
- #18964 (P3, 4 comments): Add Reticulum/LXMF message gateway
  - Link-agnostic communication không centralized server

- #98004 (P3, 3 comments): Per-group auto-continue budget cho Bot Mode rooms

**Memory & compression**
- #143379 (P3, 14 comments): RFC doc-chain substrate network
  - Read, governance, compaction

---

## 🗣️ Phản hồi người dùng

**Positive signals**
- Plugin ecosystem fixes được appreciate (#144220 merge)
- Web search toolset fix giải quyết confusion (Blank Slate → web on nhưng search missing)
- Download resume feature cải thiện UX cho interrupted transfers

**Pain points recurring**

1. **Windows platform stability**: 6+ open issues (sandbox fallback, update timeout, locale issues, style recalc)

2. **Session state fragility**: 
   - Resume failures multiple causes (cold sessions, gateway restart, profile-following, remote-backend)
   - Users mất conversations sau restart/update

3. **Configuration invisibility**:
   - MCP servers misconfigured silent (#31246)
   - Toolset disabled cutting tools từ enabled ones (#134593)
   - Reasoning effort "none" saves null (#133026)

4. **Gateway lifecycle complexity**:
   - Stale PID blocks (#143775)
   - Key mismatch (#136189)
   - Model switch crashes (#142488)

**User requests patterns**
- Session lifecycle transparency & control
- Desktop notifications & status visibility
- Better error messages cho config issues
- Windows stability improvements
- Tool configuration clarity

---

## 📋 Backlog & Roadmap

### Immediate priorities (inferred từ P0/P1)

1. **Unified gateway stabilization** (#134889)
   - Session state reliability
   - Message delivery guarantees
   - Platform compatibility (đặc biệt Windows)

2. **Session resume robustness**
   - Fix multiple `not_found` scenarios (#139796, #139818, #143715)
   - Gateway restart recovery (#136189)

3. **Windows platform fixes**
   - Sandbox fallback recovery (#131055)
   - Update process reliability (#133253, #139132)

### Medium-term (inferred từ P2/P3 volume)

1. **Desktop UX improvements**
   - Session visibility (#50718)
   - Kanban delivery policy (#138836)
   - TUI v2 feature parity (#12130)

2. **Tool ecosystem health**
   - MCP configuration visibility (#31246)
   - Browser tools (#134167 click coords, #141390 macOS socket)
   - Memory tool reliability (#101695, #139436)

3. **Configuration ergonomics**
   - Better error messages
   - Config validation at set time
   - Clear disable semantics

### Long-term features

1. **Alternative gateways** (#18964 Reticulum)
2. **Advanced delegation** (#37935 approval context)
3. **Per-group policies** (#98004 auto-continue budgets)

### Technical debt visible

- Session state persistence layer needs redesign (nhiều resume failure modes)
- Gateway lifecycle cần formal state machine (stale PID, key mismatch, restart recovery)
- Windows platform integration fragile (sandbox, update, locale)
- Tool configuration schema lacks validation hooks (silent failures)

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-25

## 📊 Tổng quan

Hermes Agent dẫn đầu về quy mô (171 issues, 500 PRs), unified gateway architecture mature. OpenClaw follow với LTS strategy, performance optimization phase. Các dự án nhỏ (NanoBot, ZeroClaw, NanoClaw) focus vertical: privacy channels, security sandbox, agent-to-agent messaging. PicoClaw/NullClaw/IronClaw dormant.

**Trend chung:** Stability over features. Security hardening, memory management, session recovery được prioritize cross-ecosystem.

---

## 📈 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Activity | Cộng đồng |
|-------|--------|-----|----------|----------|-----------|
| **Hermes Agent** | 171 | 500 | 0 | 🔥🔥🔥 9 merged/ngày | 217 comments (#134889) |
| **OpenClaw** | 117 | 500 | 2 | 🔥🔥 30+ PRs/ngày | 51 comments (#160959) |
| **NanoBot** | 4 | 43 | 0 | 🔥 8 merged/ngày | 5 comments (#6285) |
| **ZeroClaw** | 11 | 50 | 1 (v0.8.7) | 🔥 Active infra work | 12 comments (#8891) |
| **NanoClaw** | 0 | 12 | 0 | 🟡 12 PRs pending | 0 tương tác |
| **QwenPaw** | 4 | 10 | 0 | 🟡 10 PRs pending | 0 reaction |
| **PicoClaw** | 0 | 7 | 0 | ❄️ Backlog cleanup | 0 tương tác |
| **NullClaw** | 0 | 0 | 0 | ❄️ Dormant | - |
| **IronClaw** | 0 | 0 | 0 | ❄️ Dormant | - |

**Chú thích:**
- 🔥🔥🔥 = High velocity (daily merges, active community)
- 🔥🔥 = Medium-high (daily activity, feature work)
- 🔥 = Active (regular merges, focused scope)
- 🟡 = Low activity (pending PRs, small team)
- ❄️ = Dormant/Abandoned

---

## 🎯 Vị thế Hermes Agent

### Leadership position

**Scale:** Lớn nhất về codebase, contributor base, issue tracking. 500 PRs signal mature CI/CD và review process.

**Architecture maturity:** Unified gateway (#134889, 217 comments) consolidate CLI/TUI/Desktop/API/bots/cron → single process. Complex nhất ecosystem, giải quyết scale problems các dự án nhỏ chưa gặp.

**Pain scale:** Windows platform issues (sandbox, update, locale), session state fragility, plugin ecosystem stability → nhiều edge cases từ broad adoption.

### Community strength

- 217-comment threads signal engaged users willing debug/report
- Multiple P0/P1 regressions suggest production usage
- Plugin catalog growth (conxt memory provider #144192)

### Technical debt visible

- Session resume có 5+ failure modes (#139796, #139818, #143715, #136189)
- Gateway lifecycle needs state machine (stale PID, key mismatch)
- Windows platform lagging (6+ open P1/P2 issues)

**Tương quan:** Hermes solve problems others will hit at scale. Leading indicator for ecosystem challenges.

---

## 🔧 Hướng Kỹ thuật Chung

### 1. Security hardening wave

**Hermes:** Plugin compatibility checks (#144220), verify-on-stop guards (#140594)  
**ZeroClaw:** Shell policy validation (#11983, #12005), tool-call envelope leak fix (#10446)  
**NanoClaw:** Log redaction (#4184), A2A identity verification (#3718), prompt injection (#3717)  
**QwenPaw:** Audit trail broken (#8412), governance gaps (#8252)

→ **Pattern:** Trust boundaries, credential leaks, command injection đang được patch ecosystem-wide.

### 2. Memory management focus

**Hermes:** Download resume (#144211), compression optimization (#144173)  
**OpenClaw:** Worker memory release (#159858), RSS spikes (#161531)  
**NanoBot:** API session lock leak (#6438 → #6439)  
**ZeroClaw:** Markdown backend race condition (#10797, S0 data loss)

→ **Pattern:** Long-running processes expose memory bugs. Idle workers/sessions cần lifecycle management.

### 3. Session state persistence

**Hermes:** 5+ resume failure modes, cold sessions, gateway restart, remote-backend  
**OpenClaw:** #139796 `not_found`, #142488 model switch crash  
**ZeroClaw:** #11921 append-only event history (XL, high-risk)

→ **Pattern:** Stateful AI agents hard. Resume semantics unclear (replay vs. restore). Needs storage architecture rethink.

### 4. Tool configuration UX

**Hermes:** MCP servers misconfigured silent (#31246), toolset disabled cuts tools (#134593)  
**NanoBot:** Cron job management UI (#6313, #6319, #6345)  
**ZeroClaw:** Deferred tool schema stale (#12006)

→ **Pattern:** Complex tool ecosystems need better visibility, validation at config time, live reload.

### 5. Cross-platform pain

**Hermes:** Windows sandbox fallback (#131055), update timeout (#133253), locale issues (#135183)  
**OpenClaw:** Windows startup lag 2.5× (#168955), plugin source-capture 2× memory (#162585)  
**NanoBot:** Bun binary size limit (#6428, 157MB)

→ **Pattern:** Windows lagging. macOS/Linux mature faster. Desktop apps expose platform quirks (sandbox, locales).

---

## ⚡ Điểm Khác biệt

### Architecture philosophy

| Dự án | Chiến lược | Trade-off |
|-------|------------|-----------|
| **Hermes** | Unified gateway (1 process cho mọi surface) | Complexity cao, restart ảnh hưởng mọi client |
| **OpenClaw** | Modular runtimes + gateway-only LTS | Cleaner boundaries, phức tạp deploy |
| **NanoBot** | Lightweight API + WebUI | Simple, thiếu desktop/native |
| **ZeroClaw** | Channel-first (email, XMPP, IMAP) | Privacy focus, niche use case |
| **QwenPaw** | Multi-agent orchestration (Orchestrator/Reasoner/Executor) | Fleet complexity, audit gaps |

### Feature focus

**Hermes:** Desktop app, unified gateway, plugin ecosystem  
**OpenClaw:** Performance, test cleanup, LTS releases  
**NanoBot:** Web-first, minimal dependencies, lazy loading  
**ZeroClaw:** Private channels (XMPP/Proton), RPC webhooks  
**NanoClaw:** Agent-to-agent messaging, identity verification  
**QwenPaw:** Multi-agent fleet, governance/audit

**Divergence signal:** Hermes/OpenClaw solve scale (100s users), ZeroClaw/NanoClaw solve privacy (1-10 users với sensitive data), QwenPaw solve orchestration (agent teams).

### Community maturity

**Tier 1 (engaged):** Hermes (217-comment threads), OpenClaw (51 comments)  
**Tier 2 (functional):** NanoBot (5 comments), ZeroClaw (12 comments)  
**Tier 3 (internal/small):** NanoClaw, QwenPaw (0 reactions)  
**Tier 4 (dormant):** PicoClaw, NullClaw, IronClaw

**Leadership indicator:** Comment volume correlate với production usage và user diversity. Hermes/OpenClaw có external contributors active debug.

---

## 🌱 Mức độ Trưởng thành

### Hermes Agent: **Mature** (⭐⭐⭐⭐)
- ✅ 500 PRs merged, daily velocity
- ✅ Unified gateway architecture shipped
- ✅ Plugin ecosystem active
- ✅ P0/P1 tracking, public roadmap signals
- ❌ Windows platform lag
- ❌ Session state fragility
- ❌ Gateway lifecycle needs redesign

**Stage:** Post-feature-rush cleanup. Focus stability, pay tech debt.

### OpenClaw: **Maturing** (⭐⭐⭐⭐)
- ✅ LTS releases (2026.9.34)
- ✅ Test cleanup campaign active
- ✅ Performance optimization phase
- ✅ Modular architecture
- ❌ Startup regression 2.5× (#168955)
- ❌ Memory spikes (#161531)

**Stage:** Refining architecture, enterprise-ready signals.

### NanoBot: **Growth** (⭐⭐⭐)
- ✅ 8 merges/day, quick bug turnaround
- ✅ Security focus (sandbox #2569, PII #6440)
- ✅ Active feature work (cron, subtasks, web fetch pagination)
- ❌ Low community interaction
- ❌ Memory leaks still open (#6438)

**Stage:** Fast iteration, building features, community chưa scale.

### ZeroClaw: **Active Development** (⭐⭐⭐)
- ✅ v0.8.7 released
- ✅ Infrastructure work (RPC plugins, session events)
- ✅ Security fixes (shell policy, memory race)
- ❌ S0 data loss bug open (#10797)
- ❌ XMPP channel high-risk XL PR

**Stage:** Building infra, stability risks từ architecture changes.

### NanoClaw/QwenPaw: **Early/Internal** (⭐⭐)
- ✅ Active PRs (12, 10)
- ❌ 0 community engagement
- ❌ Triage backlog (needs-author labels)
- ❌ Governance broken (QwenPaw #8412)

**Stage:** Internal tools hoặc pre-community-launch. Cần stability trước outreach.

### PicoClaw: **Maintenance** (⭐)
- ❌ Backlog cleanup, 6 PRs đóng cùng lúc
- ❌ 1 bugfix (#3447), không roadmap
- ❌ 0 community

**Stage:** Minimal maintenance, không active development.

### NullClaw/IronClaw: **Dormant** (❌)
- ❌ 0 activity 24h
- Stage: Archived hoặc private development.

---

## 🔮 Tín hiệu Xu hướng

### 1. **Gateway architecture convergence**

Hermes unified gateway (#134889) giải quyết fragmentation (CLI/TUI/Desktop/API riêng process). OpenClaw follow với gateway-only LTS. ZeroClaw build RPC plugin webhooks.

→ **Trend:** Single-process agent runtime becomes standard. Simplify deployment, state management, resource pooling. Trade-off: restart blast radius lớn.

### 2. **Security hardening mandatory**

Cross-ecosystem: credential redaction, shell policy, command injection, tool-call envelope leaks.

→ **Trend:** AI agents shift từ toys → production tools. Trust boundaries, audit trails, sandbox execution trở thành table stakes. Projects thiếu security signals (QwenPaw audit broken #8412) risk adoption.

### 3. **Session state still unsolved**

Hermes 5+ resume failure modes. OpenClaw `not_found` scenarios. ZeroClaw rewrite storage (#11921 append-only events, XL risk).

→ **Trend:** AI conversations stateful, long-lived, compressible. Current persistence layers (file-based, DB snapshots) inadequate. Needs event-sourcing or CQRS-like patterns. Winner: first to ship reliable resume.

### 4. **Memory management critical**

Hermes download resume. OpenClaw worker memory. NanoBot session locks. ZeroClaw Markdown backend race (S0).

→ **Trend:** Agents run 24/7, handle large contexts (images, docs, code). Memory leaks kill uptime. Idle resource release, incremental compaction, bounded caches become hygiene factors.

### 5. **Private channels emerging**

ZeroClaw XMPP/Proton Mail. NanoClaw agent-to-agent identity verification. Hermes Bot Mode.

→ **Trend:** Enterprise/privacy-conscious users want on-prem, E2E encrypted channels. Slack/Discord insufficient. XMPP, Matrix, email adapters signal decentralized agent networks.

### 6. **Windows platform gap widening**

Hermes 6+ Windows P1/P2. OpenClaw startup 2.5×, memory 2×.

→ **Trend:** Development macOS/Linux-first. Windows testing insufficient. Desktop adoption blocked by platform bugs. Risk: lose enterprise Windows users.

### 7. **Tool configuration UX debt**

Hermes MCP silent failures. NanoBot cron UI. ZeroClaw deferred schema stale.

→ **Trend:** Tool ecosystems phức tạp (100s tools/plugins). Config surfaces lag. Needs: validation at set time, live reload, dependency graphs, impact preview. Poor UX blocks adoption.

### 8. **LTS releases for enterprise**

OpenClaw 2026.9.34 LTS. Hermes không có LTS signal.

→ **Trend:** Production users need stability guarantees. LTS branches với security backports become competitive advantage. Projects không LTS risk losing enterprise accounts.

---

## 💡 Strategic Insights

### For Hermes:
1. **Windows stability P0.** 6 issues blocking desktop adoption.
2. **Session state redesign.** 5+ failure modes = architecture problem, not bugs.
3. **Gateway lifecycle formal FSM.** Stale PID, key mismatch, restart scenarios need explicit handling.
4. **LTS branch consideration.** OpenClaw ships LTS, signal enterprise readiness.

### For ecosystem:
1. **Security baseline raising.** Projects thiếu audit/sandbox/redaction risk irrelevance.
2. **Memory discipline mandatory.** 24/7 uptime requires leak-free code + bounded growth.
3. **Private channel niche exists.** XMPP/Proton/E2E signals underserved privacy-first segment.
4. **Cross-platform testing investment.** Windows lag risks losing 30-40% potential users.

### Competitive positioning:
- **Hermes:** Feature breadth leader, scale problems first.
- **OpenClaw:** Performance + LTS = enterprise play.
- **NanoBot:** Lightweight, fast iteration, web-first.
- **ZeroClaw:** Privacy channels, niche but defensible.
- **Others:** Too early or dormant, watching space.

**Winner characteristics:** Reliable session resume + memory discipline + security baseline + Windows parity + LTS option. None achieved yet. Race open.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-25

## 1. Tóm tắt hôm nay

Ngày 25/10 tập trung vào tối ưu hiệu năng và fix bugs. Release 2026.10.7 và 2026.9.34 (LTS) vừa ra. 30+ PRs mới, chủ yếu refactor và perf improvements. Issues nóng: startup lag, context bugs, memory leaks.

## 2. Releases

### v2026.10.7 (24/10)
- **Replay-safe session recovery**: session bị gián đoạn giữ recovery provenance, tool outcomes không mất
- Rejected Claude CLI drafts không vào final replies
- Large child-completion batches không vượt context
- Codex previews không block replies sau context refresh

### v2026.9.34 LTS (24/10)
- Gateway-only extended-stable release
- Backport security patches từ 2026.10.6
- **Safer file edits**: `apply_patch` validate ordered envelope
- Equivalent LTS cho September 2026

## 3. Tiến độ dự án

### PRs nổi bật (25/10):

**Hiệu năng** (11 PRs):
- #182846: Xóa transcript readiness round trip (control-ui load nhanh hơn)
- #182988: Share row observers, avatar subscriptions (giảm native observers)
- #183087: Release decoded workspace inputs trước worker settlement
- #183110: Giảm archive worker retained imports
- #183128: Share pending workspace manifest reads

**Refactor** (8 PRs):
- #183122: Xóa redundant timer/catalog guards
- #183117: Xóa pairing/plugin serialization thừa
- #183115: Xóa low-value tests (batch d506)

**Fixes** (6 PRs):
- #183113: Background exec completion announced lại sau process log
- #183118: Recognize static-analysis consumers
- #183119: PowerShell install NodeVersion validation lỗi
- #182730: Session avatars 404 với data URL identities
- #183059: Resumed CLI sessions aware of conversation updates

**Thử nghiệm** (2 PRs rejected):
- #183109: Cached chat pane [CLOSED - không merge]
- #183121: Omit sidebar narration bodies [không merge]

## 4. Điểm nổi bật cộng đồng

### Top Issues (theo comments):

**P0 Critical** (51 comments):
- #160959: Gateway blocks minutes khi capture large external plugins (2026.9.6 regression) 🦞

**P1 High** (19 comments):
- #168955: Startup chậm 410s→1030s sau upgrade 2026.9.9→2026.10.1 (Windows) 🦪

**Session stability** (13 comments):
- #159789: One failed native close locks agent execution permanently 🦪

**Windows issues** (12 comments):
- #162585: Plugin source-capture explodes 290MB→612MB+ trên Windows 🦐

## 5. Ổn định & Bugs

### Đang fix:

**Critical regressions**:
- Gateway blocking minutes với large plugins (#160959) - P0
- Startup lag 2.5× trên Windows (#168955) - P1
- Close wedge lock agent execution (#159789) - P2

**Memory/Performance**:
- Plugin source-capture memory explode trên Windows (#162585)
- Control UI transcript jitter (#164394)
- macOS RSS jumped 1.1GB→0.9-6.6GB sau upgrade (#161531)

**Session/Runtime**:
- Background experience review 0% completion (#164279)
- Config hot reload failed never retried (#164383)
- Context precheck overestimate 2.3-2.6× (#161861)

**Recently closed** (24/10):
- #181619: Codex app-server timeout regression (FIXED)
- #135858: opencode-go catalog snapshot không project provider override (FIXED)
- #72504: Feishu bot strips mention causing NO_REPLY (FIXED)

## 6. Yêu cầu tính năng

### Đang discuss:

**Monitoring/Ops** (#161049 - 5 comments):
- Cron supervision: overdue, skipped, dead-man alerts
- Failure alerts chỉ cover jobs chạy fail, thiếu scheduler stall/clock jumps

**Memory management** (#159858 - 5 comments):
- Idle worker isolates release memory trên small hosts (~650MB resident)
- Opt-in let idle workers go

**UX improvements**:
- #162991: Configurable dashboard session title naming
- #162596: Native ChatGPT compaction cho embedded runtime
- #164324: Talk delegation line hardcoded Italian
- #162993: Remember Workboard search/filters across reloads

**Channel support**:
- #162972: Signal outbound native mentions

## 7. Phản hồi người dùng

### Pain points:

**Performance** (nhiều reports):
- Startup regression sau mỗi minor version
- Memory không release trên long-running instances
- Windows performance tệ hơn macOS/Linux

**Stability** (nhiều P1/P0):
- Session recovery không reliable
- Agent execution lock cần restart gateway
- Config reload failed no retry

**UX friction**:
- Background tasks appear stall (#159722)
- Talk confirmation không work với spoken "yes" (#181329)
- Memory index "Dirty: yes" never clears (#164076)

### Positive signals:

- LTS release (2026.9.34) đáp ứng enterprise needs
- Replay-safe recovery cải thiện session stability
- Security boundaries được tăng cường

## 8. Backlog & Roadmap

### Technical debt đang clear:

**Test cleanup campaign** (ongoing):
- Batch d503, d506: remove low-value tests
- Focus tests vào authority/privacy/persistence
- Reduce fixture scaffolding

**Memory optimization** (active):
- Share observers, subscriptions
- Release workers after use
- Native allocation attribution probe (#183116)

**Static analysis improvements**:
- Fix dead-code checks false positives
- Recognize maintained inputs
- Stable cron fixture settlement

### Next milestones (inferred):

- **Stability**: Fix P0/P1 regressions trước feature work
- **Performance**: Startup time optimization cho Windows
- **Memory**: Worker lifecycle management
- **Developer experience**: Better diagnostics, clearer error messages

---

**Nhận định**: Project đang trong cleanup phase sau feature rush. Focus vào stability, performance, và developer experience. LTS release signal enterprise adoption tăng. Windows platform cần attention đặc biệt.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-25

## 📊 Tóm tắt hôm nay

24h qua merge 8 PR và đóng 1 issue. Tập trung vào: fix WebUI performance (defer lazy loading, reduce TUI bundle size), sửa memory leak (API session locks), cải thiện UX (composer thumbnails, subtask panel), và đóng bug DuckDuckGo search.

---

## 🚀 Releases

Không có release.

---

## 📈 Tiến độ dự án

### PR đã merge (8)

**Performance & Bundle Size**
- #6435: defer non-chat UI → giảm cold startup trên mobile
- #6432: shrink TUI bundle, target native bindings → giảm download size
- #6428: chấp nhận Windows Bun 1.3.13 binary (157MB, vượt limit 150MB cũ)

**WebUI UX**
- #6436: image attachments hiển thị thumbnail thay vì file card
- #6437: nâng Pele 1.6.0→1.9.0 → Chinese text wrap correct trong Mermaid diagram
- #6425: tách file cards khỏi media previews → layout không stretch
- #6431: fix MCP connection row height → status không đẩy xuống dòng 2
- #6443: giữ delegated subtasks trong panel cố định trên composer

**Bug fix**
- #6442: require ddgs ≥9.16.1 → sửa DuckDuckGo aggregation và engine issue
- #6346: sau max_iterations, không resume abandoned work nếu user gửi request mới

**API**
- #5838: route session_id đúng vào chat riêng (không dùng chung chat_id="default")

**SDK**
- #6434: reuse consecutive model override → giảm provider construction overhead

### PR đang mở (15 nổi bật)

**Memory leak & resource management**
- #6439 + #6194: release completed API session locks → sửa unbounded growth (#6438)
- #6421: recheck idle expiry sau khi acquire lock → tránh summarize ngay sau turn mới

**Security sandbox**
- #2569: thêm OS-level sandboxing cho tool execution (sandlock) → thay regex command blocking

**Privacy**
- #6440: reversible PII de-identification tại provider boundary (khác với secret redaction)

**Feature**
- #6317: web_fetch thêm continuation offsets → đọc dài page
- #6313 + #6319 + #6345: cron job enable/disable, history, update in-place
- #6441: session-scoped reasoning effort trong WebUI (không cần mở settings)
- #6446: thêm Runcrate provider (OpenAI-compatible gateway)

**Bug fix**
- #6448 + #6447: edit/grep files có byte-order mark (UTF-16/UTF-32)
- #6445: refresh MiniMax M3 catalog, thinking compatibility
- #6062: notify chat channels khi fallback model serve turn
- #5880: recover oversized pending reads sau compaction
- #5314: decode nested JSON tool args theo schema

**Refactor**
- #6412: unify code/diff highlighting, restore single-column preview layout
- #6401: show channel pairing prompts ngay (không đợi 15s polling interval)

---

## 🔥 Điểm nổi bật cộng đồng

**#6285** (closed, 5 comments, 👍0): consecutive `web_search` trong cùng turn fail với "No results found" → root cause: DuckDuckGo aggregation bug → upstream ddgs 9.16.1 đã fix

**#2569** (open, 2 comments, 👍1): đề xuất OS-level sandboxing vì regex command blocking dễ bypass → sandlock integration PR đang mở

---

## 🐛 Ổn định & Bugs

### Đã sửa
- DuckDuckGo search consecutive fail (#6285 → #6442)
- Memory leak: API session locks không release (#6438 → #6439)
- TUI Windows binary reject 157MB builds (#6428)
- UTF-16/32 files không edit/search được (#6448, #6447)
- MCP connection row stretch (#6431)
- Composer image cards stretch (#6425, #6436)
- Max_iterations abandoned work resume (#6346)

### Đang fix
- Idle archive summarize ngay sau turn (#6410 → #6421)
- Nested JSON tool args từ compatible providers (#5311 → #5314)
- Oversized pending reads sau compaction (#5879 → #5880)
- Fallback model không notify chat channels (#6031 → #6062)

---

## 💡 Yêu cầu tính năng

**Đang implement:**
- OS-level tool sandboxing (#2569)
- PII de-identification reversible (#6440)
- Web fetch pagination (#6317)
- Cron job management (enable/disable/history/update) (#6313, #6319, #6345)
- Session reasoning effort UI (#6441)
- Runcrate provider (#6446)

**Pattern:** Nhiều PR tập trung vào agent autonomy (cron, subtasks), privacy (PII), và security (sandbox, session isolation).

---

## 💬 Phản hồi người dùng

- DuckDuckGo search bug ảnh hưởng production → fix nhanh trong 7 ngày
- Windows TUI users chặn bởi 150MB limit → raise limit tạm, sau giảm bundle size
- MCP connection UI feedback tốt → merge ngay
- Image attachment UX cải thiện → thumbnail layout nhận được approval

---

## 📋 Backlog & Roadmap

**Ưu tiên cao (P1-P2):**
- Memory leaks (session locks, pending reads)
- Security (sandboxing, PII)
- Performance (lazy loading, bundle size)
- UX polish (composer, subtasks, pairing)

**Conflict PRs:** #6412 (highlighting unify), #6441 (reasoning effort), #6194 (session locks), #6062 (fallback notify), #5838 (session routing) → cần resolve trước khi merge

**Technical debt:** 4 open secret redaction PRs (#1249, #1305, #1513, #1812) → consolidate với PII de-identification feature

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw - 25/10/2026

## 1. Tóm tắt hôm nay

Release v0.8.7 đã merge. Hoạt động tập trung vào infrastructure: RPC plugin webhooks (#11320, #11322), session event history (#11921), XMPP channel (#11847). Security fixes cho shell policy và memory backend race condition được push.

## 2. Releases

**v0.8.7** - merged qua #12011
- Version bump workspace 0.8.6 → 0.8.7
- Cargo.toml, Cargo.lock, Tauri config, scripts đã đồng bộ
- Không có changelog chi tiết từ dữ liệu

## 3. Tiến độ dự án

**Infrastructure (đang active)**
- #11320, #11322: Plugin webhooks qua RPC - 2 PR lớn (XL), depends on #11319, #11339, #11165
- #11921: Append-only session event history - replay state không lặp side effects, thay đổi storage architecture (XL, risk:high)
- #9420: Anthropic OAuth support - tích hợp OAuth flow cho provider (XL, risk:high)

**Channels expansion**
- #11847: XMPP/Prosody channel với OMEMO encryption (XL, risk:high) - channel mới hoàn chỉnh
- #12003: IMAP-only email channels (không cần SMTP)
- #11939: Email reply quoting - flag `quote_original` mới
- #11993: Email HTML build từ Markdown structure, filter raw HTML

**Runtime improvements**
- #12017: Context window là model metadata, không phải config - fix #12014 (32K fallback bug)
- #10446: Reject leaked tool-call envelopes thay vì render (security fix)
- #11441: Bind cron jobs tới conversation origin (RFC #6954)
- #11990: Honour channel instance `excluded_tools`

**Tools**
- #11997: `send_via` attachments dưới read policy - file gửi qua tool, không phải marker text
- #12007: Deferred tool schemas từ live tools, không phải assembly copy

## 4. Điểm nổi bật cộng đồng

**Issue có nhiều bình luận**
- #8891: Persistent memory tracker - 12 comments, theo dõi rollout memory subsystem tới parity
- #10797: Markdown memory backend mất data khi `store()` overlap - data loss, S0 severity
- #12014: OpenAI-compatible provider giả định 32K context window sai - workflow blocked

**Tương tác cao**
- Các dependency bump PRs (#12018, #11937, #11999, #12012, #11936, #11842) - automated Dependabot
- Security policy PRs (#11983, #12005) - shell command validation

## 5. Ổn định & Bugs

**Critical (đang fix)**
- #10797: Memory backend race condition - concurrent writes mất data (S0 - data loss)
- #12005: PowerShell dialect chặn `@` trong argument - CLI không dùng được (regression)

**High priority fixes**
- #12014 → #12017: Context window fallback 32K sai cho custom provider (S1 - workflow blocked)
- #12006 → #12007: Deferred tool schema stale sau reload
- #10446: Tool-call envelope leak vào prose (security, risk:high)

**Medium**
- #11663: Vector memory auto-supersession dùng recall scores sai - BM25 normalization tạo false positive
- #11946: Stale SOP checkpoint copy ghi đè state file
- #11945: SOP stale-copy branches thiếu test coverage

## 6. Yêu cầu tính năng

**Channels**
- #11992: Email templates từ operator + sanitized HTML body cho `send_via`
- #11879: Goal Mode V1 (2/12) - dormant config và command grammar

**Developer experience**
- #11799: Shell policy refusals nên nói lý do + operator hint
- #12016 → merged: Embedding binary hooks cho chat/cron turns

**Runtime**
- #11996: `send_via` explicit attachments dưới read policy (implemented #11997)

## 7. Phản hồi người dùng

**Pain points**
- Context window 32K fallback gây reject valid turns - người dùng không biết sửa config nào (#12014)
- PowerShell mail CLI `@` bị chặn - allowlist không đủ (#12005)
- Memory backend mất data khi concurrent writes - production risk (#10797)
- Deferred tool schema không update sau reload - stale behavior (#12006)

**Positive signals**
- Email channel được mở rộng: IMAP-only (#12003), reply quoting (#11939), HTML safety (#11993), attachments (#11997)
- Shell policy giờ giải thích lý do + hint (#11983)
- XMPP channel với OMEMO (#11847) - private messaging use case

## 8. Backlog & Roadmap

**In progress (theo tracker #8891)**
- Persistent memory: 7 open items (4 issues, 3 PRs)
- Memory subsystem tới parity với mature peer runtimes

**Upcoming (theo PR stacks)**
- RPC plugin webhooks: #11320 → #11322 (depends chain dài)
- Goal Mode V1: #11879 (2/12) - proposal series
- Cron conversation binding: #11441 (stacked on #11438)
- Session event history: #11921 - architecture change lớn

**Security hardening**
- Shell policy validation (#11983, #12005)
- Tool-call envelope leakage (#10446)
- Memory backend atomicity (#10797)

---

**Xu hướng**: Infrastructure maturity phase. Focus: RPC architecture, session replay, channel expansion, security hardening. Release cadence ổn định (v0.8.7). Community báo data-loss bugs nhanh (S0 severity).

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-10-25

## 1. Tóm tắt hôm nay

Dọn dẹp backlog lớn. 6 PR cũ từ tháng 2-3 đóng cùng lúc, có thể merge hoặc từ chối. 1 PR mới (#3447) fix bug cho Claude Haiku 5.5 với token auth.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR mới (đang mở):**
- **#3447** - Fix Claude Haiku 5.5 với token auth. Bug: API từ chối `temperature` parameter cho thinking-always models. Cần patch provider code.

**PR đóng (dọn backlog):**
- **#3424, #3425** - Fixes từ @sstpnk (Telegram timeout, cron error reporting). Đóng vì stale, không merge.
- **#996** - `.env` loading cho config. 7 tháng không động. Đóng.
- **#1026** - Coolify deployment setup. Đóng.
- **#594** - Retry logic với backoff cho LLM calls. Đóng sau 8 tháng.
- **#1575** - Support Kimi For Coding model. Đóng.

**Xu hướng:** Team đang đóng PR cũ không maintain. Focus vào bugs hiện tại.

## 4. Điểm nổi bật cộng đồng

Không có. Các PR đều 0 reaction, không có discussion. Cộng đồng ít tương tác hoặc team nhỏ.

## 5. Ổn định & Bugs

**#3447** - Claude Haiku 5.5 broken với token credentials. Anthropic deprecate `temperature` parameter cho thinking models. Cần remove parameter khỏi request payload khi detect model type `thinking-always`.

Các bug khác (#3424 Telegram hang, #3425 cron errors) không được fix - đóng PR thay vì merge.

## 6. Yêu cầu tính năng

Không có feature request mới. Các PR đóng có features:
- `.env` file support (#996)
- Retry logic (#594)
- Coolify deployment (#1026)
- Kimi For Coding support (#1575)

Tất cả bị reject hoặc abandon.

## 7. Phản hồi người dùng

Không có comments, reactions, hoặc user feedback trong data. Repo có vẻ internal hoặc low-activity community.

## 8. Backlog & Roadmap

Không có thông tin roadmap. #3447 là task duy nhất active - fix Anthropic provider cho model mới.

---

**Kết luận:** Ngày maintenance. Dọn backlog cũ, 1 bugfix mới cho Claude. Không có tín hiệu về roadmap hay feature development active.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-25

## 1. Tóm tắt hôm nay

12 PRs đang active, không có release mới. Hoạt động tập trung vào bảo mật (redact secrets trong logs), tích hợp provider mới (Copilot, Proton Mail), và sửa bugs agent-to-agent messaging. 1 PR merged (#3724 - update retired Anthropic model).

## 2. Releases

Không có releases trong 24h qua.

## 3. Tiến độ dự án

**Bảo mật & Hardening (ưu tiên cao):**
- #4184: Redact credentials trong logs trước khi ghi file - ngăn leak keys qua error messages, tool output
- #3717: Escape XML trong prompt blocks - ngăn prompt injection khi payload có `<`, `>`
- #3718: Fix agent-to-agent identity verification - sender identity bị forge trước đây
- #3719: Report A2A communication failures về source - giờ sender biết khi message fail

**Providers & Integrations:**
- #3976: GitHub Copilot provider via device-login token trong credential gateway thay vì env vars
- #4219: Update MiniMax model selector - prioritize M3.1-Flash, M3 trong OpenCode
- #3724 (MERGED): Đổi retired Anthropic model `claude-sonnet-4-20250514` → `claude-sonnet-5`
- #3726 + #4218: Proton Mail adapter qua local Proton Mail Bridge (Docker arm64/x86)

**Features:**
- #4180: `/add-model-use-cases` - map role names (`usecase:coding`) sang real models trong `.env`, giảm duplicate config
- #2752: Fix Discord attachments - download từ CDN URL thay vì chỉ dùng `fetchData()`
- #3740: Return routing promise cho channel adapters - giữ retry eligibility khi inbound fail

**Xu hướng:** Đẩy mạnh security (log redaction, identity verification), mở rộng provider ecosystem, cải thiện A2A messaging reliability.

## 4. Điểm nổi bật cộng đồng

Không có tương tác đặc biệt nổi bật (thumbs up = 0 trên tất cả PRs). Contributors chủ yếu từ team (`@glifocat`, `@Koshkoshinsk`, `@petrolette`) và external contributors (`@drsmk238`, `@barnuri`, `@kasparovabi`).

PR #3726 (Proton Mail) và #4184 (log redaction) có nhiều label và review activity nhất → quan tâm về privacy-focused channels và security.

## 5. Ổn định & Bugs

**Critical fixes:**
- #3717: Prompt injection qua unescaped XML - payload forge blocks
- #3718: A2A sender identity không verified - bất kỳ agent nào có thể giả mạo
- #3719: A2A failures im lặng - sender không biết message fail
- #3740: Channel adapters mất retry eligibility - ACK message trước khi routing thành công
- #2752: Discord attachments không load được

**Status:** Tất cả đang OPEN, 5/12 PRs có label `triage/needs-author` → cần feedback/revision.

## 6. Yêu cầu tính năng

- #4180: Role-based model mapping (`usecase:coding` → real model) - giảm duplicate config cho nhóm agents dùng chung workflow
- #3976: GitHub Copilot provider - mở rộng AI provider choices
- #3726: Proton Mail native adapter - privacy-focused email channel
- #4180: Model use-case grouping - manage nhiều agents dễ hơn

## 7. Phản hồi người dùng

Không có issues/comments mới từ users trong 24h. Activity chủ yếu từ maintainers.

PR descriptions show pain points:
- Config duplication khi scale nhiều agents (→ #4180)
- Credentials leak trong logs (→ #4184)
- Thiếu trustworthy A2A messaging (→ #3718, #3719)

## 8. Backlog & Roadmap

Từ PR labels:
- **Security hardening** đang được prioritize: log redaction, prompt injection fixes, A2A identity
- **Provider expansion** đang diễn ra: Copilot, MiniMax updates, Proton Mail
- **Channel reliability** improvements: Discord, Proton Mail, routing fixes
- **DX improvements**: role-based model mapping, skill system refinements

`channels` registry branch (#4218) cho thấy refactor cấu trúc adapters đang tiến hành.

---

**Tổng kết:** Dự án focus vào security và reliability. Nhiều PRs liên quan bảo mật đang pending review. External contributions tăng cho integrations. Cần push qua các `triage/needs-author` PRs để unblock.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo hoạt động QwenPaw ngày 2026-10-25

## 1. Tóm tắt hôm nay

Không có release mới. Dự án tập trung sửa bug kênh Matrix/QQ và cải thiện trải nghiệm Console. 10 PR đang mở, 4 issue - chủ yếu liên kết governance, audit và cấu hình đồng bộ.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### PR đáng chú ý

**Kênh tích hợp**
- #8409 (L) - QQ C2C streaming: thêm hooks `on_streaming_*` dùng API `/v2/users/{user_openid}/stream_messages`, gắn flag `streaming_enabled`
- #8411 (L, đóng-xem-lại-sau) - Matrix session recovery: phục hồi cached session + device keys để tránh re-login mỗi lần restart (#8365)
- #8406 bug - QQ channel `enabled` flag reset về false âm thầm, không cảnh báo

**Console/UX**
- #8408 (M) - server-side default cho assistant message display mode: thêm `config.json.chat_display.assistant_message_display_mode`, sync qua `/config/theme`, tránh mất config khi clear localStorage (#8407)
- #8410 (M) - model pool: cho phép remove model deprecated, không chỉ enable/disable (#8195)

**Memory**
- #8347 (XXXL) - nâng ReMe từ 0.4.1.11 lên 0.4.2.0: decision compaction (opt-in), image memory, entity tags; Auto-Dream workflow mới, proactive interaction giữ cũ

**Docs**
- #8403, #8402, #8401 (XS) - sửa anchor case trong docs: `#Mail-Access-Control` → `#mail-access-control`, GitHub-slugger lowercase

**Test**
- #7390 (XS) - regression guard cho Aliyun Coding Plan catalog drift (#6551): test `test_aliyun_plan_catalog_alignment.py` đảm bảo model list trùng DashScope official

**Leak fix (đợi review)**
- #7835 - auto-memory-recall synthetic trace (`ToolCallBlock` + `ToolResultBlock`) leak ra ngoài channel (Feishu/Slack/Mail); frontend Console ẩn qua `MemorySearchCard` nhưng channel khác vẫn thấy

### Xu hướng

- **Governance/audit mất ổn định**: #8412 - `audit.db` ngừng ghi tool calls dù `policy.yaml` set `audit_level: all`; #8252 - agent call bị `CancelledError` thầm lặng, không log nguyên nhân
- **Channel streaming maturity**: QQ streaming đang được bổ sung (C2C), Matrix đang sửa session persistence
- **Console config centralization**: đẩy preferences từ browser localStorage lên server config

## 4. Điểm nổi bật cộng đồng

Không có issue/PR nào có reaction > 1. Cộng đồng nhỏ, tương tác thấp. Issues được đóng nhanh (#8252 đóng sau 10 ngày, 4 comments).

## 5. Ổn định & Bugs

**Critical**
- #8412 - audit.db ngừng ghi per-agent tool calls
- #8252 - agent inter-call `CancelledError` không trace được

**High**
- #8406 - QQ channel config reset âm thầm
- #8365 (linked từ #8411) - Matrix re-login mỗi restart, device keys mất

**Medium**
- #7835 - memory recall trace leak ra channel
- #8195 (linked từ #8410) - không xóa được model deprecated

## 6. Yêu cầu tính năng

- #8407 - server-side default cho assistant message display mode (đã có PR #8408)
- #8307 (linked từ #8409) - QQ C2C streaming (đang implement)

## 7. Phản hồi người dùng

**Pain points từ issues:**
- @NORFMS (#8252): multi-agent fleet (Orchestrator/Reasoner/Executor/Reviewer/Defender) + Feishu channel: agent call cancel thầm lặng, không log ai gọi ai
- @gcy529 (#8406): QQ channel flag reset, phát hiện khi debug
- @0959linger (#8412): governance audit stop ghi, agent vẫn chạy bình thường nhưng compliance tracking bị thủng
- @Wiziechen (#8407): multi-device/multi-browser/clear-cache làm mất assistant message preference; team deployment không set được default chung

**Developer experience issues:**
- #6551: Aliyun model list drift
- Docs anchor case-sensitivity trips navigation

## 8. Backlog & Roadmap

Không có roadmap công khai trong dữ liệu. Dựa vào PR/issue:

**Near-term (đang làm)**
- QQ streaming (#8409)
- Matrix session fix (#8411 đóng tạm, cần review lại)
- Console server-side config (#8408)
- ReMe 0.4.2.0 integration (#8347 XXXL, đang review)

**Needs attention**
- Governance/audit infra (#8412, #8252): tracing và audit đang không đáng tin cậy trong multi-agent setup
- Memory leak cleanup (#7835): synthetic traces vào production channels

**Tech debt**
- Docs anchor consistency (#8403, #8402, #8401)
- Model management UX (#8410)

---

**Nhận xét:** Dự án thiếu stability monitoring cho governance layer. Multi-agent orchestration đang expose race conditions và audit gaps. Cần prioritize #8412 và #8252 trước khi thêm features.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*