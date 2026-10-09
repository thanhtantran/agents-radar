# Bản tin Hệ sinh thái Hermes Agent 2026-10-09

> Issues: 93 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-09 02:00 UTC

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

# Báo cáo Hermes Agent — 2026-10-09

## 📊 Tóm tắt hôm nay

Phát hành v0.21.6 cuốn 2,100 PR từ v0.21.5. Tập trung xử lý critical: Windows MSIX plugin fail, Desktop update loop, bundled provider httpx miss. Cộng đồng report duplicate rendering, session loss qua connection switch, config snowflake ID rounding.

---

## 🚀 Releases

**v0.21.6** (2026-10-08)  
Patch release. Roll-up 2,100+ merged PR từ v0.21.5 → Docker + Hermes Cloud. Full notes đợi v0.22.0. First release từ stable pipeline mới: tested Docker image + receipt tag.

---

## 🔨 Tiến độ dự án

**PRs merge gần đây:**

- **#135389** [OPEN]: Spotify tách core → catalog plugin. Auto migrate user login. Giảm core bundle size.
- **#135333** [OPEN]: Fix Windows MSIX plugin install (fail uv exit 101 #135236). Python deps work again.
- **#134256** [OPEN]: Fix TUI ws-orphan reaper force-kill session khi turn đang chạy. Giữ session sống đủ turn end.
- **#132238** [CLOSED]: Gateway cache `channel_overrides` model (fix #131294 — cache miss sau compaction).
- **#106742** [OPEN]: **Major unification**: Một gateway control tất local session (CLI/TUI/Desktop/ACP/bot/cron) → same conversation. Trước mỗi surface run agent riêng trên cùng `state.db`.

**Xu hướng:**  
Hội tụ vào gateway-centric architecture. Desktop/CLI/TUI attach session thay run agent song song. Chuẩn hóa lifecycle cross-surface.

---

## 🔥 Điểm nổi bật cộng đồng

**#134107** (37 comment, P3, OPEN):  
Bundled `solstice` provider fail load: `No module named 'httpx'` — lỗi leak stderr, garble TUI layout. Spam 6× mỗi `hermes update`. Root: stripped PM runtime miss httpx. Duplicate #135383, #135302 (#134107 là master tracker). Fix candidate: bundle httpx hoặc lazy-load provider.

**#127647** (29 comment, P2, OPEN):  
Desktop idle burn CPU/GPU/mem. Tracker scope map #122413/#88288. Nhiều sub-issue: renderer GPU frame, backend serve CPU, memory leak. Triage ongoing, các child PR partial fix.

**#132401** (20 comment, P0, OPEN):  
Scratch prune 24h idle xóa work parked in `TMPDIR`-pointed scratch (multi-day agent work mất silent, không log, không quarantine). Agent docs nói scratch là "temporary work storage" nhưng prune không có keep-marker. High-impact data-loss risk. Cần decision: add `.keep` marker hoặc bump idle window.

---

## 🐛 Ổn định & Bugs

**Critical:**

- **#134602** (5 comment, P2): Desktop update button fail 100% macOS — exit 2 "Another Hermes update already running" → custodian từ chính hand-off đó. Root: hand-off export wrong PID (`HERMES_UPDATE_HANDOFF_PID`). Fix #134268 [OPEN].
- **#135298** (4 comment, P1): Gateway never connect khi zero messaging platform config (regression 0.21.6). Docker, 5 deploy reproduce. Break standalone API gateway.
- **#128295** (3 comment, P0): `hermes-assets.nousresearch.com` return Cloudflare 403 cho non-browser client → update + pm install hoàn toàn block. Root: WAF challenge page.

**High:**

- **#131859** (12 comment, P2): Fork PR create fail với "CreatePullRequest permission error" nhưng issue create + fork OK. Suspect API scope regression hoặc GitHub API change. Chưa resolve.
- **#127621** (6 comment, P2): Desktop assistant message đôi khi render duplicate (cùng text 2 lần). Không stable repro. Suspect streaming/compression race. Related #132836 (cùng symptom).
- **#118326** (10 comment, P2): macOS sleep/wake drift `psutil.create_time()` → kanban reaper release live worker claim (PID recycling false-positive). Worker bị duplicate launch.

**Medium:**

- **#135337** (1 comment, P2): Dashboard WhatsApp "Pair with QR" trên secondary profile check default profile session (multiplex). Onboarding bind wrong profile.
- **#97662** (2 comment, P3): Discord clarify button expire trước gateway clarify wait. Button 300s (bounded), gateway 3600s (unbounded). Timeout mismatch → interaction fail.

---

## ✨ Yêu cầu tính năng

**#90432** (5 comment, P3, needs-decision):  
Upgrade `pre_api_request` → Transform hook — plugin override model/provider/base_url per request. Hiện observer-only (return ignore). Use-case: routing policy plugin.

**#526** (5 comment, P3):  
Anthropic Context Editing API integration — server-side tool/thinking cleanup, cache-friendly. Beta API `anthropic-beta: context-management-2025-06-27`. Auto clear old tool blocks → giảm cache rewrite cost. Request evaluation + design decision.

**#70547** (3 comment, P3, needs-decision):  
Kanban configurable dispatcher spawn cho non-profile assignee (external CLI worker: Claude Code, Codex CLI, subprocess agent). Hiện chỉ support Hermes profile. Request plugin-extensible spawn seam.

**#49175** (1 comment, P3):  
Session text highlighter (Kindle-style) trong Desktop app. Select text → hotkey → persistent highlight. Use-case: mark key insight trong long session. Request UI feature.

---

## 💬 Phản hồi người dùng

**#135210** (3 comment, P1, awaiting-reporter):  
macOS Desktop installer fail "Install command and apps + Desktop" — log show "Solstice Missing httpx". User @agustinabonaldi10-collab report MacBook Air (Apple Silicon). Tương tự #134107 root cause. Installer không handle bundled provider dep.

**#76901** (8 comment, CLOSED, duplicate):  
Termux install script error. Long thread, closed duplicate. Termux platform có nhiều edge case install (Android, no systemd, pkg name khác). Không official support nhưng community workaround tồn tại.

**#102943** (4 comment, P2):  
Nous Portal login default model picker → paid flagship (`anthropic/claude-fable-5.1`, row 1) trên bare Enter. User không nhận ra, tự động switch provider + model → silent cost jump. Request: warning hoặc default free tier.

**#95933** (3 comment, P2, needs-repro, awaiting-reporter):  
Remote isolated-serve: reconnect spawn duplicate clientless default scope → Desktop stuck "Waking up default…". Split từ #89789. Backend scope lifecycle defect. Chưa stable repro, awaiting reporter confirm.

---

## 📋 Backlog & Roadmap

**In-progress major work:**

- **#106742** (churn cao, ci-reviewed): Gateway unification — CLI/TUI/Desktop attach gateway session thay run agent riêng. Large refactor, ảnh hưởng toàn stack (agent/gateway/tui/acp/cron). Risk: session-state, message-delivery, compression. Multi-month effort, gần merge.
- **#127647**: Desktop idle resource burn tracker. Child PRs partial fix renderer/backend. Ongoing optimization campaign.

**Planned:**

- **#135255** (6 comment, P3): Microsoft Store build tracking. Testing phase, gate public listing. Windows MSIX variant, architecture/PackageFamilyName validation.
- **Anthropic Context Editing API** (#526): Design decision pending. Beta API available, cần evaluate cache benefit vs. complexity.
- **Plugin spawn extensibility** (#70547): Kanban external worker support. Design decision pending, seam đã có (spawn_fn) nhưng chưa production-ready.

**Security backlog:**

- **#121645** [OPEN]: File-tool guard POSIX-rooted trên Windows — normpath không match literal. Device path leak risk (`/dev/stdin`, `/proc/*/fd/*`).
- **#121642** [OPEN]: Nous device-login inference URL không check host allowlist. Inference bearer có thể leak non-Nous host.

**i18n:**

- **#83593** (1 comment, P3): Holographic memory FTS5 unicode61 tokenizer không search được Chinese. CJK tokenization fail. Request: trigram hoặc jieba tokenizer.

---

## 🔍 Xu hướng kỹ thuật

1. **Gateway-centric consolidation** — từ multi-agent per surface → single gateway own session. Giảm state conflict, dễ multiplex profile.
2. **Desktop reliability focus** — installer, update hand-off, MSIX variant. Nhiều P1/P2 Desktop-specific bug.
3. **Bundled provider deps** — solstice httpx miss ảnh hưng nhiều flow. PM stripped runtime + plugin load timing mismatch. Cần dep bundle strategy rõ ràng.
4. **Prompt cache optimization** — nhiều issue về cache miss sau compaction, eviction rewrite prefix. Cost-sensitive user vocal.
5. **Cross-platform Windows hardening** — nhiều POSIX assumption fail trên Windows (path, termios, process lifecycle). Active sweep qua codebase.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-09

## 1. 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **ổn định hóa sau tăng trưởng**. Các dự án lớn (Hermes, OpenClaw) focus bugs + reliability thay vì features. Xu hướng chung:

- **Production hardening**: Fix bugs nghiêm trọng (persistence, memory, update mechanisms)
- **Platform expansion**: Windows, containers, low-resource devices đang được đầu tư
- **Gateway-centric architecture**: Nhiều dự án chuyển sang model tập trung state management
- **Performance optimization**: Context compression, GPU usage, SQLite bottlenecks

Nhóm dự án nhỏ (PicoClaw, NanoClaw, IronClaw) trong maintenance mode hoặc inactive.

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động | Cộng đồng | Mức độ trưởng thành |
|-------|--------|-----|----------|-----------|-----------|---------------------|
| **Hermes Agent** | 93 | 500 | 1 | 🟢 Cao | 🟢 Active | ⭐⭐⭐⭐ Production |
| **OpenClaw** | 187 | 500 | 1 | 🟢 Cao | 🟢 Active | ⭐⭐⭐⭐ Production |
| **NanoBot** | 3 | 29 | 0 | 🟡 Vừa | 🟡 Nhỏ | ⭐⭐⭐ Beta |
| **ZeroClaw** | 10 | 50 | 0 | 🟡 Vừa | 🟡 Internal | ⭐⭐⭐ Beta |
| **PicoClaw** | 0 | 2 | 0 | 🔴 Thấp | 🔴 Không | ⭐ Stale |
| **NanoClaw** | 1 | 2 | 0 | 🔴 Thấp | 🔴 Không | ⭐⭐ Alpha |
| **NullClaw** | 0 | 5 | 0 | 🟡 Vừa | 🔴 Không | ⭐⭐ Alpha |
| **IronClaw** | 2 | 2 | 0 | 🔴 Thấp | 🔴 Không | ⭐⭐ Alpha |
| **QwenPaw** | 24 | 29 | 0 | 🟡 Vừa | 🟡 Nhỏ | ⭐⭐⭐ Beta |

**Metrics:**
- **Issues active**: Hermes 93, OpenClaw 187 → high maintenance load
- **PRs active**: Hermes + OpenClaw 500 mỗi dự án → large codebases
- **Releases 24h**: chỉ Hermes + OpenClaw ship → production-ready
- **Community engagement**: chỉ Hermes + OpenClaw có nhiều comments/reactions

---

## 3. 🎯 Vị thế Hermes Agent

### Điểm mạnh:

**📦 Release velocity**: v0.21.6 roll-up 2,100+ PRs → large team, active development

**🏗️ Gateway unification** (#106742): Major architectural change → CLI/TUI/Desktop attach single gateway session. OpenClaw chưa có equivalent.

**🔧 Production-focused**: Critical fixes (Windows MSIX, update loop, bundled provider deps) → field issues được xử lý nhanh.

**🌍 Multi-surface support**: CLI, TUI, Desktop, ACP, bot, cron share same state → ít duplicate logic.

### Điểm yếu:

**🐛 Bug backlog lớn**: 93 issues active, nhiều P0/P1 chưa resolved (scratch prune data loss, GPU burn, chat history persistence).

**🎯 Community complaints**: "Solstice Missing httpx" spam nhiều users, update failures widespread.

**📚 Breaking changes undocumented**: MEMORY.md không inject nữa nhưng docs vẫn nói inject → confusion.

### So với OpenClaw:

| Aspect | Hermes | OpenClaw |
|--------|--------|----------|
| **Architecture** | Gateway-centric, đang converge | Persistence-focused, synchronous blocking issues |
| **Platform support** | Windows MSIX active, Desktop polished | LXC/containers nhiều issues |
| **Bug severity** | Medium (update, bundled deps) | High (persistence blocks all agents) |
| **Community size** | Lớn hơn | Tương đương |
| **Release cadence** | Beta → stable pipeline | Beta only |

Hermes lead về architecture unification + desktop UX. OpenClaw struggle với persistence reliability.

---

## 4. 🛠️ Hướng kỹ thuật chung

### Trends được nhiều dự án adopt:

**1. Context compression optimization** (Hermes, NanoBot, QwenPaw)
- Reduce repeated transcript reads
- Prompt cache optimization (Anthropic Context Editing API)
- Dedicated compaction models (cheaper than flagship)

**2. Responses API migration** (NanoBot, QwenPaw)
- OpenAI Responses API for streaming + tool routing
- Handle `response.reasoning_text.*` events
- Route models qua đúng endpoint

**3. Platform hardening** (Hermes, OpenClaw, ZeroClaw)
- Windows: POSIX assumptions fail → path normalization, process lifecycle
- Containers: LXC, Docker lifecycle, minimal rootfs
- Low-resource: Raspberry Pi, Android, memory optimization

**4. Gateway/state centralization** (Hermes, ZeroClaw)
- Single gateway control all sessions
- Multi-surface attach thay vì run agent riêng
- Reduce state conflicts

**5. Plugin systems** (ZeroClaw, QwenPaw)
- Tool extraction to plugins
- Marketplace/registry
- Webhook routing

### Tech stack commonalities:

- **SQLite** cho persistence (Hermes, OpenClaw, NanoClaw)
- **Streaming tools** với native support (NullClaw, NanoBot)
- **Desktop apps** với Tauri/Electron (Hermes, QwenPaw)
- **MCP integration** (NanoBot, IronClaw)

---

## 5. 🔄 Điểm khác biệt

### Chiến lược phát triển:

**Hermes**: Feature-rich → Production hardening. Gateway unification là strategic bet lớn.

**OpenClaw**: Reliability-first. Nhiều PRs cleanup + bug fixes. Slow feature growth.

**NanoBot**: Rapid iteration. Merge 12 PRs/ngày, focus stability sau growth spurt.

**ZeroClaw**: Security-first. Nhiều PR về sandboxing, egress control, path validation.

**QwenPaw**: UX-focused. Console improvements, GPU optimization, media handling.

**Nhóm nhỏ** (PicoClaw, NanoClaw, IronClaw): Không có strategic direction rõ ràng, maintenance mode.

### Tính năng khác biệt:

| Feature | Hermes | OpenClaw | NanoBot | ZeroClaw | QwenPaw |
|---------|--------|----------|---------|----------|---------|
| **Gateway unification** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Desktop app** | ✅ MSIX | ❌ | ❌ | ❌ | ✅ Electron |
| **Plugin system** | ❌ | ❌ | ❌ | ✅ | ✅ |
| **MCP native** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Reasoning models** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Multi-channel** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Context editing API** | ✅ planned | ❌ | ❌ | ❌ | ❌ |

### Cộng đồng:

**Hermes**: Multi-comment issues (37 on #134107), vocal users report bugs + blockers.

**OpenClaw**: Similar engagement (24 comments on #119720), field reports từ production.

**NanoBot**: Fast response (issue → 12 fixes trong 1 ngày) → small focused team.

**ZeroClaw**: Internal development, no external contributors visible.

**QwenPaw**: Chinese-speaking community, complaints về chat history + loading.

**Nhóm nhỏ**: Zero engagement → no community hoặc private use.

---

## 6. 📈 Mức độ trưởng thành cộng đồng

### Tier 1: Production-ready với active community

**Hermes Agent** ⭐⭐⭐⭐
- 93 issues, nhiều external contributors
- Detailed bug reports với repro steps
- Users vocal về pain points (update, bundled deps)
- Gateway unification show architectural maturity
- Weakness: breaking changes undocumented

**OpenClaw** ⭐⭐⭐⭐
- 187 issues, 92 contributors trong release
- Field reports từ production deployments
- Community file detailed repros
- Weakness: persistence bugs chưa resolved, update failures widespread

### Tier 2: Beta stage với nhỏ lẻ community

**NanoBot** ⭐⭐⭐
- Fast turnaround (issue → fix < 24h)
- Focus stability sau growth
- Small team, ít external contributors
- Weakness: compaction loop vô hạn went unnoticed until production

**QwenPaw** ⭐⭐⭐
- Chinese community active complaints
- UX issues get attention (GPU, chat history)
- Weakness: "Praise ít, complaints nhiều" → frustration signals

**ZeroClaw** ⭐⭐⭐
- Security-focused development
- Internal team driven
- Weakness: zero external engagement, no public community

### Tier 3: Alpha/stale với no community

**NullClaw** ⭐⭐
- Maintainer-driven PRs
- No external contributors
- Fixes edge cases (Discord heartbeat, HTTPS rootfs)

**NanoClaw, IronClaw** ⭐⭐
- Minimal activity
- Critical bugs open (SQLite journal recovery)
- No engagement

**PicoClaw** ⭐
- Stale PRs (1.5 tháng không review)
- Zero activity

---

## 7. 🔮 Tín hiệu xu hướng

### Đang diễn ra:

**1. Consolidation wave** → Ít dự án survive, market concentrate vào Hermes + OpenClaw. Nhóm nhỏ trong maintenance mode hoặc sẽ bị abandon.

**2. Desktop-first push** → Windows MSIX, Electron, GPU optimization show desktop app là priority. Web/CLI không đủ cho enterprise.

**3. Context cost optimization** → Prompt cache, compaction models, context editing API → cost pressure drive innovation.

**4. Security hardening** → Sandboxing, egress control, path validation → production deployments need compliance.

**5. Multi-modal expansion** → Voice (OpenClaw transcription), images (QwenPaw EXIF), computer use (NanoBot Cua Driver) → beyond text chat.

### Dự đoán ngắn hạn (3-6 tháng):

**Hermes**: Gateway unification merge → single source of truth cho session state. Desktop app ship stable MSIX. Update mechanism overhaul sau nhiều complaints.

**OpenClaw**: Persistence fixes hoặc architecture rewrite. Update mechanism reliable hoặc lose enterprise users.

**NanoBot**: Plugin system mature, marketplace launch. MCP integration become killer feature.

**ZeroClaw**: Plugin webhooks stable, security model documented. Potential enterprise adoption nếu positioning đúng.

**QwenPaw**: Chat history fix hoặc lose users. GPU optimization ship. Self-hosted marketplace cho intranet.

**Nhóm nhỏ**: PicoClaw, NanoClaw, IronClaw likely abandon hoặc merge vào dự án lớn.

### Dự đoán dài hạn (12+ tháng):

**Market structure**: 2-3 dự án dominant (Hermes, OpenClaw, maybe 1 niche player). Rest die hoặc become forks.

**Differentiation**: Plugin ecosystems become moats. Whoever build best marketplace/developer experience win.

**Enterprise adoption**: Production reliability + compliance features decide winners. Desktop stability, update reliability, security model là table stakes.

**Architecture**: Gateway-centric model become standard. Persistence-first approaches struggle với scale.

---

## 💡 Kết luận chiến lược

**Hermes Agent** leading về architecture innovation (gateway unification) nhưng bug backlog + community complaints về reliability là risks.

**OpenClaw** strong community nhưng critical persistence bugs + update failures chưa resolved → production adoption risk.

**Opportunity**: Nhóm nhỏ có thể target niches (security-first cho ZeroClaw, Chinese market cho QwenPaw) nhưng need execution velocity + community building.

**Threat**: Consolidation wave incoming. Dự án không ship stable releases + build community trong 6 tháng tới sẽ struggle.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-09

## 🎯 Tóm tắt hôm nay

Release 2026.9.9 vừa ra mắt với 185 commits, 112 PRs, 92 contributors. Tập trung xử lý bugs nghiêm trọng về persistence, update mechanism, và memory leaks. Cộng đồng report nhiều vấn đề về Windows, container, và reliability ở production.

## 📦 Releases

### v2026.9.9 (2026-10-08)

Bản sửa lỗi lớn, không có breaking changes. Release notes chi tiết chưa được paste đầy đủ nhưng từ PRs/issues liên quan:

**Fixed:**
- Update mechanism fail trên unprivileged LXC containers (FICLONE EPERM)
- Plugin staging loop trên Windows (re-materializes own package)
- Stale update receipts block valid updates
- SQLite snapshot fails trong updater context
- Codex auth import fail trên Windows
- Memory.md không inject vào bootstrap context

**Improved:**
- Giảm repeated transcript reads per chat turn
- Shared worker write envelopes

185 commits = bản release lớn nhưng chưa có feature mới breakthrough.

## 📊 Tiến độ dự án

### PRs nổi bật đang mở

**P0/P1 Critical:**

1. **#165486** - Windows desktop bundled Bun (XL, DRAFT)
   - Chuẩn bị Windows Tauri companion
   - Embed fork Bun x64/ARM64
   - CHƯA MERGE - đánh dấu compatibility risk

2. **#167238** - Reduce repeated transcript reads (XL)
   - Giảm SQLite statements per chat turn
   - Tiếp tục transcript budget optimization
   - Ready for maintainer review

3. **#163655** - Preserve active chat input during announcements (XL)
   - Fix announcement hijack input của request khác
   - Session-state risk, needs proof

**Performance & Infrastructure:**

- #167552 - Share admitted worker write envelopes (M)
- #167533 - Reduce SQLite duplication (L)
- #167563 - Remove low-value tests batch d026 (XL)

**Bug fixes đang active:**

- #167391 - Reject malformed JSON before rewriting metadata (S)
- #167244 - Stop retrying permanent Mattermost API refusals (S)
- #161773 - Supply request to before_prompt_build on embedded/CLI runs (L)
- #148676 - Claude CLI undercounts tool-using turns usage (L)

### Xu hướng phát triển

**Cleanup wave:** 3-4 PRs refactor/deduplicate code (worker errors, SQLite, test fixtures)

**Windows focus:** Bun bundling, auth import fixes - platform parity push

**Performance:** Transcript read optimization, worker memory management

**Quality:** Test removal campaign - giảm maintenance overhead

## 🔥 Điểm nổi bật cộng đồng

### Issues nhiều engagement

**#119720** (24 comments, 🦞 diamond) - **Synchronous agent persistence blocks Gateway event loop at scale**
- Đã có partial repairs (#140231, #138984)
- Vẫn chưa resolved hoàn toàn
- Impact: session-state + crash-loop

**#97616** (18 comments, 🐚 platinum) - **Zombie process accumulation từ hook/tool children**
- Regression bug
- Runtime degradation over time
- Needs live repro

**#157325** (16 comments, 🦞 diamond) - **Stuck agent-DB resource breaks ALL agents**
- P0 UX blocker
- Generic failure cho tất cả agents đến khi restart gateway
- Windows Server 2 vCPU/8GB

**#154572** (14 comments, 🦞 diamond) - **sessions_spawn to claude-cli always fails**
- SessionTranscriptWriterClaimReboundError sau ~350ms
- Related to #152659
- 2026.9.5 regression

### Vấn đề người dùng quan tâm

**Update reliability:** Nhiều reports về update failures (5-6 issues):
- LXC containers
- Windows permission errors
- SQLite snapshot trong updater context
- Stale receipts

**Memory/Performance:** Gateway startup 40-200s block event loop (#162211)

**Platform-specific:**
- Android Talk drops mid-session (#131768)
- Windows Scheduled Task không stay running (#91144)
- Raspberry Pi high memory + slow startup (#157791)

## 🐛 Ổn định & Bugs

### Critical (P0)

1. **Stuck agent-DB wedges all agents** (#157325)
   - Single point of failure
   - Requires gateway restart
   - Production impact

2. **Update mechanism failures** (multiple issues)
   - #164113 - LXC FICLONE EPERM ✅ CLOSED
   - #167376 - package-swap recovery permissions ✅ CLOSED
   - #166221 - SQLite snapshot fails
   - #166598 - package-swap failure ✅ CLOSED

3. **MEMORY.md không inject** (#158912)
   - Docs còn nói loaded at session start
   - Breaking change chưa document

4. **Codex auth import fail trên Windows** (#161341)
   - "credential reader could not stop"
   - Blocks OpenAI auth flow

### High Priority (P1)

1. **WhatsApp multimodal delays** (#96834)
   - Image wedges main lane ~3 min
   - Tool strand active_reply_work

2. **SSE stream hung 48 min** (#145203)
   - OpenAI completions stream never recovers
   - Stall watchdog starved by progress touches

3. **Telegram lane ingress wedge** (#142116)
   - 300s claim→adoption stall
   - Update re-dispatched without reply payload

4. **Feishu bot identity race** (#77717)
   - Permanent disconnection on config reload

5. **Message-tool-only runs fail silent** (#128916)
   - No failure notice for non-interactive turns
   - No recorded reason

### Patterns

**Persistence issues:** SQLite contention, worker isolation, transcript claim races

**Recovery brittleness:** Restart recovery leaves stale state, lanes wedged

**Platform gaps:** Windows, containers, low-resource devices underserved

**Silent failures:** Cron, message delivery, compaction fail without user notification

## 💡 Yêu cầu tính năng

### Được cộng đồng ủng hộ

**#71452** (7 comments, 👍1) - **Pagination cho list messages**
- Hiện hardcoded 25 limit
- Cannot return more items

**#88154** (7 comments, 👍1) - **Slack Modal support**
- Structured input through native UI
- Replace repeated message prompts

**#70266** (5 comments, 👍1) - **Assistant avatar trong macOS Talk Mode**
- Hiện luôn show default orb
- Config có `ui.assistant.avatar` nhưng không dùng

**#128090** (5 comments, 👍4) - **Markdown preview trong Review files**
- Hiện chỉ show source text
- Long prose không readable ở panel width

### Infrastructure requests

**#56781** (7 comments, 👍1) - **Fallback model chain cho compaction**
- Single model = single point of failure
- Rate limit → session grows unbounded

**#65438** (6 comments, 👍2) - **Configurable bootstrap file injection order**
- Anthropic prompt cache optimization
- Hiện hardcoded, không flexible

**#44309** (12 comments, 👍1) - **One-way dispatch mode cho A2A handoffs**
- Drop task without reply-back ping-pong
- Current semantics too chatty

**#41120** (5 comments, 👍1) - **Dedicated browser lane**
- Browser workflows starve other channels
- Need per-channel lane routing

## 💬 Phản hồi người dùng

### Pain points rõ ràng

**Update experience:** Nhiều operators frustrated với update failures, đặc biệt containers và Windows. Process phức tạp, error messages không actionable.

**Production reliability:** Field report #128067 liệt kê 6 defect classes sau 3 weeks production use:
- Persistence
- Delivery
- Restart-recovery
- Plus 3 minor issues

**Memory footprint:** Operators không biết size containers đúng cách (#160280 asks for docs)

**Platform gaps:**
- Android users report Talk drops mid-session, switch to Discord voice
- Windows users hit auth, scheduling, update issues
- Raspberry Pi/low-resource devices slow startup (138s), high memory

### Positive signals

- 92 contributors trong release này
- Active community filing detailed repros
- Quick PR turnaround cho critical fixes (3 update issues closed trong 2 days)

## 📋 Backlog & Roadmap

### Đang xử lý (từ PR activity)

**Short-term (actively worked):**
1. Windows desktop Bun bundling (#165486) - DRAFT
2. Transcript read optimization (#167238)
3. Update mechanism hardening (multiple closed/open PRs)
4. Test cleanup campaign (batch d026)

**Medium-term (queued fixes):**
1. Compaction failure recovery (#130393)
2. Context budget accuracy (#138087, #156636)
3. Plugin runtime improvements (#161773)
4. Claude CLI usage accounting (#148676)

**Deferred/low priority:**
- Feature requests ở P2/P3 (modals, pagination, avatars)
- Off-meta issues (marked 🌊 tidepool)
- Stale issues (auto-labeled, pending close)

### Technical debt visible

1. **SQLite contention** - repeated reads, blocking snapshots
2. **Worker isolation** - memory limits, error handling duplication
3. **Recovery brittleness** - restart leaves stale state
4. **Silent failures** - cron, compaction, delivery need better observability
5. **Platform parity** - Windows/containers/low-resource gaps

### Không có public roadmap

Repo không có explicit roadmap file hoặc project board được expose. Direction inferred từ:
- PR labels (P0/P1/P2 priorities)
- Issue ratings (🦞 diamond = highest impact)
- Maintainer PR reviews và merge patterns

---

**Tóm lại:** Dự án trong phase ổn định hóa sau growth. Focus: reliability > features. Windows/container support đang được đầu tư. Community active, filing good repros. Update mechanism là pain point lớn nhất hiện tại.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-09

## 1. Tóm tắt hôm nay

Ngày tập trung vào **context compaction fixes** và **provider stability**. Merged 12 PRs sửa lỗi nghiêm trọng: compaction loop vô hạn, Responses API tool routing, image batch timeout. Thêm Sendblue iMessage channel và Cua Driver computer use.

---

## 2. Releases

Không có release mới.

---

## 3. Tiến độ dự án

### Merged PRs quan trọng (12 PRs)

**Context Compaction Fixes** (issue #6106 trigger)
- #6107: Fix image batch preparation → giảm delay first response, recover Codex transport
- #6096: Share Responses backend với Codex WebSocket → tránh upload lại image trong PDF follow-up
- #6020: Serialize SDK models dùng API aliases → fix OpenAI SDK 3.8.0 `async_` field break

**Responses API Tool Routing** (regression fix)
- #6051: Route tool argument events theo item ID → fix call_id lookup break
- #5863, #5834: Handle `response.reasoning_text.*` events → fix reasoning không stream
- #6105, #5906, #5935: Route GPT-6, OpenCode Go muse-spark models qua Responses → fix 500/503 errors

**WebUI Polish**
- #6102: Fix SkillHub detail links → sửa missing `/skills/` path segment
- #6099: Render CJK bold labels → fix `**边界说明：**issue` hiển thị literal markers
- #6098: Prioritize slash command name matches → `/se` chọn `/sessions` thay vì `/model`

**Performance**
- #6101: Reduce CI test runtime → skip real WebUI build, mock backoff, clean temp dirs

**Binary Upload**
- #5980: Upload attachments qua HTTP thay vì Base64 WebSocket → fix 1009 close khi vượt frame limit

### Open PRs quan trọng (17 PRs)

**High Priority**
- #6109: Optional `compactModelPreset` → route compaction sang model rẻ hơn
- #6108: Keep slash-prefixed paths (`/tmp`, `/home/user`) trong chat → fix rejected as unknown command
- #6104: Strip hosted `web_search` tools từ Chat Completions → fix DeepSeek toggle break non-Responses models
- #6100: **[BUG]** Preserve Dream batches khi provider policy block → fix `refusal`/`content_filter` advance cursor

**Features**
- #6091: Computer use với Cua Driver → MCP-backed desktop control
- #6089: In-app directory picker → thay native workspace chooser
- #6081: Sendblue iMessage/SMS channel → text agent qua phone
- #6032: WebUI local extensions surface → trusted browser add-ons

**Infrastructure**
- #5992: Scoped proxies cho tất cả backends → fix native/OAuth providers không support proxy
- #5826: FTS5 accelerated session search → fix canonical JSONL scan chậm
- #5485: Restore LangSmith tracing → fix LiteLLM migration remove callback
- #5971: Resolve markdown images theo MCP server working dirs → fix relative paths break
- #5204: Declare request APIs per preset → editor show auto API + manual override

**Conflicts**
- #6091, #5992, #5971, #5601: Có merge conflicts cần resolve

---

## 4. Điểm nổi bật cộng đồng

### Issue #6106: Compaction loop vô hạn
**👁️ Quan tâm nhất**
- User để nanobot idle qua đêm → API hit abnormal số lượng
- Compaction fire loop mỗi 15 phút trên empty session + compact chính nó
- **Root cause**: Auto-compact không check session state
- **Fix**: 12 PRs merged ngày hôm nay address compaction stability

### Issue #5781: Dream loop 1-2h
- Dream consolidation stuck đọc lại 2 files ~200 lần
- `dream.maxIterations` config deprecated → global 200-iteration cap apply
- 25-111 phút mỗi run

### Issue #6084: Slack compaction spam
- Mỗi compaction post 2 messages: "Compressing…" + "Context compacted"
- `idleCompactAfterMinutes` trigger trên mọi idle DM
- Request: `showCompactionNotices` config hoặc edit in place

---

## 5. Ổn định & Bugs

### Critical Fixes (đã merge)
1. **Compaction infinite loop** (#6106) → 12 PRs fix image batches, Responses routing, SDK serialization
2. **Responses tool routing** (#6051, #5863, #5834) → item_id/call_id mismatch, missing reasoning events
3. **Provider 500/503 errors** (#6105, #5906, #5935) → GPT-6, OpenCode Go models route sai API
4. **WebSocket frame limit** (#5980) → Base64 attachments vượt limit → 1009 close

### Open Bugs
1. **Dream policy block** (#6100) → `refusal`/`content_filter` vẫn advance cursor
2. **DeepSeek web_search** (#6104) → toggle break non-Responses models
3. **Slash paths rejected** (#6108) → `/tmp` treated as unknown command
4. **SkillHub links** (#6102) → missing `/skills/` segment [FIXED]

### Regressions
- Responses tool routing break sau migration (#6051)
- LangSmith tracing lost sau LiteLLM removal (#5485)

---

## 6. Yêu cầu tính năng

### Đang implement
- **Dedicated compaction model** (#6109) → dùng model rẻ cho context compression
- **Computer use** (#6091) → Cua Driver MCP integration
- **Sendblue channel** (#6081) → iMessage/SMS support
- **WebUI extensions** (#6032) → local trusted add-ons

### Trong backlog
- **Scoped proxies** (#5992) → network proxy cho native/OAuth providers
- **FTS5 session search** (#5826) → accelerate canonical JSONL scan
- **Directory picker** (#6089) → in-app workspace chooser
- **MCP image resolution** (#5971) → support relative paths từ server working dirs

---

## 7. Phản hồi người dùng

### Pain points
1. **Compaction quá aggressive** → loop vô hạn, spam messages (#6106, #6084)
2. **Provider errors không rõ** → 500/503 khi model route sai API
3. **Dream stuck** → 1-2h loops re-reading files (#5781)
4. **Attachment upload flaky** → WebSocket frame limit (#5980)

### Positive feedback
- PR descriptions chi tiết, có examples và root cause analysis
- Fast turnaround: #6106 reported 2026-10-08 → 12 fixes merged 2026-10-08

---

## 8. Backlog & Roadmap

### Immediate (P2 priority)
- Merge #6100 (Dream policy block fix)
- Merge #6104 (DeepSeek web_search fix)
- Merge #6108 (slash paths fix)
- Resolve conflicts trong #6091, #5992, #5971, #5601

### Short-term
- Deploy #6109 (dedicated compaction model) → address #6106 cost concern
- Deploy #6081 (Sendblue) → mở rộng channels
- Deploy #6089 (directory picker) → improve UX

### Medium-term
- #5485 (LangSmith tracing restore)
- #5826 (FTS5 search)
- #5204 (declarative request APIs)

### Technical debt
- Resolve 4 PRs có conflicts
- Document Dream consolidation behavior (#5781)
- Add `showCompactionNotices` config (#6084)

---

**Trend**: Focus shift từ features sang stability. 12/29 PRs hôm nay là bug fixes. Compaction và Responses API là hot areas.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw 2026-10-09

## 1. Tóm tắt hôm nay

Ngày tập trung vào cải thiện ZeroCode (TUI client) và hardening bảo mật. 30/50 PRs đang active, không có release mới. Activity chính: sửa message queue bugs, thêm timestamps vào transcript, và đóng 6 PRs liên quan testing/refactoring.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

### PRs quan trọng đang active:

**ZeroCode improvements (UI/UX):**
- #11622: Thêm timestamp cho mỗi message trong transcript (format HH:MM hoặc YYYY-MM-DD HH:MM)
- #11624: Fix elicitation dropped silently - daemon timeout 600s khi user không reply `ask_user`/`poll` prompt. Giờ log vào transcript và cancel ngay
- #11505: Settings UI hiện keybinding hints, search actions theo tên/key

**Tool plugin system (chuẩn bị v0.8.6):**
- #11308: Built-in tool inventory với tier system - chuẩn bị cho plugin extraction
- #11309: `zeroclaw quickstart` install và activate plugins từ registry
- #11320: Plugin webhooks qua core RPC thay vì gateway riêng
- #11304: Log plugin egress denials (socket/WebSocket refusals)

**Security hardening:**
- #11469: Fix null device (`/dev/null`) không được exempt trên Unix - security policy check sai `cfg!(windows)`
- #11598: Command allowlist support glob patterns - dễ allow cả `scripts/` directory
- #11599: Honor `native_tools` config cho OpenAI-compatible providers (trước chỉ Groq check)

**Codebase cleanup:**
- #11165: Extract RPC wire contract sang `zeroclaw-rpc-proto` crate với OpenRPC schema drift check

### Issues quan trọng mới:

- #11594 [P1]: `firejail_args` documented nhưng không apply vào firejail invocation - security hole
- #11626: Plugin egress refusal spam WARN records - cần suppress repeated denials
- #11623: ZeroCode drop pending `ask_user` without reply → tool timeout 600s
- #11620: ZeroCode transcript không show message times
- #11618: ZeroCode drop queued message khi daemon refuse `SESSION_BUSY`
- #11615: Telegram bot ignore 429 `retry_after` → compound flood-limiting, reply lost
- #11614: `map_key_sections` leak schema paths mỗi call → daemon memory grow

## 4. Điểm nổi bật cộng đồng

Issue #8692 (maintainer decision queue) active nhất với 15 comments - tracking RFCs/design decisions cần approval.

Không có PR/issue nào có engagement cao (most 👍 = 0). Phát triển chủ yếu internal team.

## 5. Ổn định & Bugs

### Critical bugs được fix:

**Memory leak (#11614):** Config macro leak schema paths mỗi call - đã có fix

**Security holes:**
- #11594: `firejail_args` không apply
- #11469: `/dev/null` không exempt → sandbox failures

**ZeroCode stability:**
- Message queue drops input khi `SESSION_BUSY` (#11618)
- Elicitation dropped without reply (#11623)
- Telegram flood handling broken (#11615)

### Testing improvements merged today:

6 PRs đóng liên quan test stability:
- #11349: Daemon reload test giữ broadcast locks
- #11395: Skip provider retries trong 500-error dispatch tests
- #11380: Deterministic timestamps cho skill cache tests
- #11396: Hardware pipe-holder test timing fix (macOS flaky)

## 6. Yêu cầu tính năng

**UX improvements:**
- #11620: Show message timestamps trong ZeroCode transcript
- #11626: Suppress repeated plugin egress denial logs

**Developer experience:**
- #11598: Glob matching trong command allowlist - dễ allow script directories
- #11628: Bounded Tailscale tunnel exception proposal

## 7. Phản hồi người dùng

Không có feedback trực tiếp từ external users. Issues và PRs driven bởi core team/contributors.

Pattern: Team phát hiện bugs qua internal testing và production usage (e.g., Telegram flood-limit issue, ZeroCode message queue bugs).

## 8. Backlog & Roadmap

### v0.8.6 release-gated items:

5 PRs tagged `release:v0.8.6`:
- #11308: Tool tier inventory
- #11309: Quickstart plugin install
- #11305: Tool tier docs (merged)
- #11090: Runtime composition contract docs (merged)

### Blocked/stalled work:

- #11265: User roster password lifecycle - `do-not-merge`, depends on 2 other PRs
- #11413: Refuse relative paths trong filesystem channel - `do-not-merge`, security-breaking change

### Architecture evolution:

- #11165: RPC proto extraction (v0.9.0 target) - foundation cho external RPC clients
- #11090: Runtime composition API - chuẩn bị modular runtime
- Plugin system maturation: webhook routing, egress policy, tool extraction

**Trend:** Project đang hardening security (path validation, sandbox, egress control) và improving developer UX (ZeroCode polish, plugin tooling) trước khi stable release.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-09

## 1. 🔍 Tóm tắt hôm nay

Không có hoạt động mới trong 24h qua. Hai PR mở từ trước vẫn đang chờ xử lý: thêm provider OpenCode Go (#3371) và fix UI lag (#3347).

## 2. 🚀 Releases

Không có.

## 3. 📊 Tiến độ dự án

**PR #3371 - OpenCode Go provider** (mở 1 tháng, cập nhật hôm qua)
- Thêm provider riêng cho `opencode.ai/zen/go/v1`
- Auto-route model tới endpoint phù hợp
- Gửi header `x-opencode-session` với conversation session
- Chưa có review hoặc tương tác

**PR #3347 - Fix UI lag** (mở 1.5 tháng, đánh dấu stale)
- Fix lag khi chat area có nhiều text
- Đã test trên desktop và mobile (Brave)
- Tác giả không phải TS/node dev, fix bằng AI assistance
- Stale → có thể bị đóng nếu không có activity

**Xu hướng**: Maintenance mode. Không có commit mới, chỉ có cập nhật metadata. Hai PR quan trọng bị bỏ quên.

## 4. 💬 Điểm nổi bật cộng đồng

Không có tương tác. Cả hai PR đều 0 reaction, không có review comment.

## 5. 🐛 Ổn định & Bugs

**UI lag issue**: PR #3347 đã có fix nhưng chưa merge. Vấn đề ảnh hưởng UX khi chat dài.

## 6. ✨ Yêu cầu tính năng

**OpenCode Go integration**: PR #3371 mở rộng hỗ trợ provider. Model routing và session management.

## 7. 👥 Phản hồi người dùng

Không có feedback mới. PR #3347 report lag problem là phản hồi gián tiếp về performance.

## 8. 🗺️ Backlog & Roadmap

Không có thông tin. Dựa trên PR:
- Hai PR cần review và merge decision
- #3347 stale → cần quyết định giữ hay đóng
- #3371 thiếu test/validation cho provider mới

**Tín hiệu**: Dự án có thể không active maintain. PR cũ không review, không có issue activity, không có contributor discussion.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo phân tích NanoClaw - 2026-10-09

## 1. Tóm tắt hôm nay

Không có hoạt động mới trong ngày 2026-10-09. Tất cả issues và PRs được liệt kê đều từ 2026-10-08. Dự án đang xử lý bug nghiêm trọng về SQLite journal recovery và cải thiện Docker container lifecycle management.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

### PRs đang mở

**#4057 - Docker driver stop() fix** (2026-10-08)
- Fix race condition khi stop container với `--rm` flag
- Docker daemon từ chối `docker rm --force` vì auto-removal đang chạy
- Solution: poll container state, đợi auto-removal hoàn tất
- Liên quan infrastructure, cải thiện reliability

### PRs đã đóng gần đây

**#2459 - Voice transcription skill** (mở từ 2026-05-13, đóng 2026-10-08)
- Thêm voice transcription cho Discord và Chat SDK channels (Slack, Teams, Webex, Google Chat)
- Dùng whisper.cpp local, không cần cloud API hay OpenAI key
- On-device processing hoàn toàn
- PR kéo dài 5 tháng → feature phức tạp hoặc review chậm

## 4. Điểm nổi bật cộng đồng

Không có activity nổi bật về interaction (0 comments trên cả issues và PRs). Community engagement thấp hoặc team nhỏ.

## 5. Ổn định & Bugs 🔴

**#4056 - CRITICAL: SQLite journal stranded sau reboot** (2026-10-08)
- **Severity**: Critical - ảnh hưởng delivery poll, lặp vô hạn
- **Root cause**: 
  - Container ghi `outbound.db`, host crash → `outbound.db-journal` bị bỏ lại
  - Host readonly poll không recovery journal vì không mở DB với write mode
  - Chỉ có container mới mở write, nhưng container mới không spawn
- **Impact**: Delivery poll fail mỗi tick, hệ thống không tự phục hồi
- **Status**: Chưa có fix, cần mechanism để recovery journal từ host hoặc force container spawn

Bug nghiêm trọng ảnh hưởng production availability. Cần ưu tiên cao.

## 6. Yêu cầu tính năng

Không có feature request mới trong timeframe này.

Voice transcription feature (#2459) đã merge, cho thấy dự án mở rộng khả năng multimodal communication.

## 7. Phản hồi người dùng

Không có comments hoặc reactions trên issues/PRs → không có dữ liệu về user feedback trong ngày.

## 8. Backlog & Roadmap

Không có thông tin roadmap public trong dữ liệu. 

**Ưu tiên ngắn hạn dự đoán**:
- Fix #4056 (SQLite journal recovery) - critical
- Merge #4057 (Docker stop race condition) - stability
- Infrastructure hardening đang là focus area

---

**Đánh giá**: Dự án trong giai đoạn ổn định hóa infrastructure, xử lý edge cases nghiêm trọng. Community engagement thấp cần quan tâm. Critical bug #4056 là blocker lớn cho production reliability.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-10-09

## 1. Tóm tắt hôm nay

Không có issue mới, 5 PR đang mở tập trung vào cải thiện kỹ thuật core: streaming tool calls, reasoning model support, Discord stability, HTTPS trong môi trường minimal rootfs, và tích hợp MCP example. Hoạt động chủ yếu từ maintainer team, không có release.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR cơ sở hạ tầng & core:**

- **#1049** - Fix Discord heartbeat: Đếm wall-clock thay vì iterations `sleep(100ms)`. OS timer coalescing làm sleep chạy lâu hơn → heartbeat bị trễ → gateway đá. Giờ dùng `std.time.milliTimestamp()` track thời gian thực.

- **#1051** - Env var `NULLCLAW_CA_BUNDLE` cho HTTPS trên minimal rootfs (Android sandbox, distroless container). `std.http` quét system CA fail khi không có `/etc/ssl`, `/etc/pki` → mọi HTTPS call lỗi TLS. Giờ user trỏ bundle thủ công.

- **#971** - Streaming với native tool calls: Trước đây agent loop tắt native tools khi có stream callback, bắt dùng prompt injection. Giờ decouple logic → provider hỗ trợ native tools trong streaming (như OpenAI) có thể emit tool calls thực.

**PR tính năng AI model:**

- **#1050** - Config `reasoning_mode` cho reasoning models (Qwen3, GLM, R1). Models này có thể dùng hết token budget cho reasoning → trả `finish_reason=length`, `content:null`, chỉ có `reasoning_content`. Provider đã xử lý valid, nhưng agent loop không surface được → user thấy response trống. Thêm config để expose reasoning-only responses.

**PR tài liệu:**

- **#1052** - Thêm example tích hợp Parallel Search MCP qua HTTP transport native của NullClaw. Không cần API key hay local bridge, anonymous rate-limited. Docs cho `mcp_parallel_web_search` và `mcp_parallel_web_fetch`.

**Xu hướng:** Tập trung fix edge cases môi trường deployment (minimal containers, Discord gateway timing) và mở rộng khả năng streaming + reasoning models. Không có major feature, chủ yếu stability + compatibility.

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có tương tác cao (tất cả 0 👍, không có comments). Hoạt động chủ yếu từ maintainers (@vernonstinebaker, @addadi, @georgeatparallel), không thấy external contributor.

## 5. Ổn định & Bugs

- **Discord heartbeat timing bug** (#1049): Heartbeat thread đếm sai → disconnect gateway. Root cause: OS timer coalescing cho background daemon làm sleep lâu hơn → deadline calculation sai.

- **HTTPS fail trên minimal rootfs** (#1051): `std.http` CA path scan fail → mọi HTTPS request chết. Workaround: env var override.

- **Streaming tools bị disable không cần thiết** (#971): Logic cũ tắt native tools khi stream → downgrade UX, giờ fix để provider tận dụng native support.

- **Reasoning model responses bị nuốt** (#1050): Reasoning-only output không surface được → user nhầm model không trả lời.

## 6. Yêu cầu tính năng

- **Streaming native tool calls** (#971): Yêu cầu ngầm từ use case thực tế - provider hỗ trợ native tools trong stream nhưng NullClaw chặn.

- **Reasoning mode visibility** (#1050): Feature request ngầm - user cần thấy reasoning process của models như Qwen3/R1 thay vì response trống.

- **MCP integration example** (#1052): Docs/example cho tích hợp MCP server qua HTTP transport.

## 7. Phản hồi người dùng

Không có comments hay discussions trực tiếp từ user trong dữ liệu. Các PR đều từ maintainers, không thấy issue reports hay feedback threads.

## 8. Backlog & Roadmap

Không có thông tin roadmap rõ ràng trong dữ liệu. Dựa vào PR patterns:

- Ưu tiên stability (Discord, HTTPS edge cases)
- Hỗ trợ reasoning models tốt hơn
- Mở rộng streaming capabilities
- Cải thiện deployment compatibility (minimal containers, sandboxed environments)

PR #971 mở từ 2026-06-29 vẫn chưa merge → có thể feature lớn cần review kỹ hoặc breaking changes.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-09

## 📊 Tóm tắt hôm nay

Không có hoạt động mới trong ngày 2026-10-09. Dữ liệu đầu vào chứa 2 issues và 2 PRs từ ngày 2026-10-08 trở về trước. Dự án tập trung vào tối ưu tool selection và mở rộng tích hợp messaging.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**Pull Requests đang mở:**

- **#8119** - Tool selection thông minh với Jev classifier
  - Tối ưu turn-start: chọn tools trước khi gọi model, giảm round trip `tool_search`
  - Opt-in feature, phân loại tools dựa trên message người dùng
  - Size XL, risk medium, contributor mới (@CjS77)
  - Mở từ 2026-09-29, update cuối 2026-10-08

- **#8127** - Sendblue iMessage/SMS extension
  - Tích hợp iMessage/SMS trực tiếp qua Sendblue API
  - Phone pairing, webhook authentication, conversation lifecycle
  - Credentials lưu ở host side
  - Mở từ 2026-10-06, update 2026-10-08

**Xu hướng:** Dự án mở rộng 2 hướng song song - cải thiện hiệu suất agent loop và thêm kênh giao tiếp mới.

## 💬 Điểm nổi bật cộng đồng

Không có tương tác đáng kể. Cả 2 issues và 2 PRs đều có 0 comments, 0 reactions.

## 🐛 Ổn định & Bugs

**Issue #8129** - Daily failure taxonomy (2026-10-08):
- Phân tích 25 non-pass tasks từ suite `officeqa`
- Nguyên nhân chính: model quality errors (DeepSeek-V4-Flash)
- Lỗi navigation, không phải infrastructure bugs

Không có bug reports nghiêm trọng khác.

## ✨ Yêu cầu tính năng

**Issue #8130** - Đề xuất Sendblue extension (duplicate với PR #8127):
- Optional first-party iMessage/SMS integration
- User tự quản credentials
- Authenticated webhooks
- Pair allowlisted phones

Feature này đã có implementation ở PR #8127.

## 👥 Phản hồi người dùng

Không có feedback trực tiếp từ users trong dữ liệu.

## 🗓️ Backlog & Roadmap

Từ context hiện tại:
- Tool selection optimization đang trong review (PR #8119)
- Messaging expansion đang triển khai (PR #8127)
- Continuous failure analysis cho model quality

Không có roadmap công khai rõ ràng trong dữ liệu.

---

**Nhận xét:** Hoạt động yên tĩnh. 2 PRs lớn đang pending review nhưng chưa có tương tác cộng đồng. Team đang push 2 features song song mà không có discussion công khai.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-10-09

## 🎯 Tóm tắt hôm nay

Không có release mới. Ngày tập trung vào bugfix: sửa crash trên HTTP origins, xử lý EXIF orientation, optimize GPU load từ backdrop-filter. 4 PR mới merge, 10+ issue đóng - chủ yếu xử lý các vấn đề từ 2.2.2b4.

## 🚀 Releases

Không có release trong 24h qua. Beta hiện tại: **v2.2.2-beta.4** (30/09).

## 📊 Tiến độ dự án

### PRs merge ngày 09/10:
- **#8144** - Fix console crash khi dùng HTTP (không HTTPS): `crypto.randomUUID()` chỉ chạy trong secure context, fallback về `crypto.getRandomValues()`
- **#8141** - Sửa QwenPaw-Data build fail: tách type dependencies khỏi console source tree
- **#7089** - DataPaw có CI/CD pipeline riêng, publish độc lập lên CDN
- **#7870** - Fix Windows unit tests: Git phải giữ nguyên bytes, Uvicorn reload import đúng module

### PRs đang review:
- **#8137** - Thêm "reduced effects" mode: giảm backdrop-filter từ 28px xuống 4px, tắt decorations → giảm GPU load 40-60% (#8135)
- **#8136** - Giữ EXIF orientation khi resize ảnh → model nhận đúng hướng ảnh (#8129)
- **#8133** - Fix CJK bold/italic: markdown emphasis rules không nhận sentence punctuation, thêm spaces quanh CJK text
- **#8138** - Copy clipboard hoạt động trên HTTP origins (fallback `document.execCommand`)

### Xu hướng:
- **Console UX**: ổn định trên HTTP/LAN deployments (3 PRs)
- **Performance**: giảm GPU cost cho iGPU
- **Media handling**: EXIF, empty blocks, file rejections
- **Recovery logic**: provider errors, tool failures, DST timestamps

## 💬 Điểm nổi bật cộng đồng

### Issues nhiều tương tác:
- **#8120** (3💬) - "页面加载失败" trên nhiều thiết bị → ảnh hưởng trải nghiệm
- **#8134** (4💬) - Chat history mất sớm, không liên quan context window
- **#8116** (2💬) - Message queue xử lý rồi vẫn gửi lại, hoặc báo sai conversation

Người dùng phàn nàn chat history ngắn + mất không rõ lý do. Team chưa có fix cụ thể.

## 🐛 Ổn định & Bugs

### Bugs đóng ngày 08-09/10:
1. **#8022** - `send_file_to_user` tạo empty assistant message → 400 với mọi model sau đó
2. **#7883** - Tool PDF serialized sai → DeepSeek reject `file must have file_id`
3. **#8042** - Tool output file auto-feed vào model → crash khi model không hỗ trợ format
4. **#8064** - DeepSeek + PDF phá session vĩnh viễn
5. **#8109** - Stream error mất toàn bộ history conversation
6. **#8046** - Timestamp DST sai vì freeze UTC offset
7. **#8122** - Settings UI layout vỡ trong 2.2.2b4

### Đang xử lý:
- **#8135** - GPU busy do backdrop-filter 28px → PR #8137 giảm xuống 4px
- **#8143** - Console spam `<svg> attribute width: Expected length, "small"` 22 lần/session
- **#8129** - EXIF orientation mất khi resize → PR #8136
- **#8123** - Daily Paper fail khi model truncate JSON → không retry, cả job marked error
- **#8125** - llama.cpp `has_update()` vẫn rollback user runtime (lần 3, #7633 chưa fix sau 25 ngày)

## ✨ Yêu cầu tính năng

### Mới đề xuất:
- **#8139** - Thêm You.com làm web_search provider (keyless, 100 free/day)
- **#8142** - Đổi Tauri2 → Electron vì Kylin v10 desktop không support Tauri2
- **#8140** - Update README files
- **#8015** - Self-host skill marketplace cho intranet/air-gapped deployments
- **#8126** - Skill-pool download làm background job + progress bar + cancel button

### Đang dev:
- **#8083** - `view_audio` tool (image/video đã có, thiếu audio)
- **#8132** - Release evaluation workflows + QwenPaw Index (GAIA, SWE-bench, SpreadsheetBench)
- **#8128** - Move hubs sang plugin system → custom marketplace có thể install/remove

## 📢 Phản hồi người dùng

### Vấn đề nổi bật:
1. **Chat history** - Người dùng phàn nàn nhiều nhất: "聊天记录说没就没了", "讨论过的问题,回头往上翻,看不到了" (#8134, #8131, #7884)
2. **Page load failures** - Xảy ra thường xuyên trên nhiều device (#8120)
3. **Message queue duplicates** - Xử lý rồi vẫn gửi lại (#8116)

### Praise ít, complaints nhiều:
- Không có issue nào khen tính năng/cải tiến
- Majority về bugs ảnh hưởng UX: history, loading, duplicates

## 📋 Backlog & Roadmap

### Immediate (đang fix):
- Console HTTP origin crashes
- GPU performance (backdrop-filter)
- EXIF orientation
- Chat history persistence

### Short-term (PRs in review):
- Reduced effects mode
- CJK markdown emphasis
- Media handling recovery
- Tool output fallback

### Medium-term (feature requests open):
- You.com search provider
- Self-hosted skill marketplace
- Audio understanding tool
- Release benchmarking suite

### Blocked/slow:
- **#8125** - llama.cpp runtime rollback (assigned 25 days, no PR)
- **Chat history** issues - multiple reports, no concrete fix timeline
- **Message queue** reliability - "半年了" per user comment

---

**Verdict**: Maintenance mode. Cleanup 2.2.2b4 fallout. Console stability improving (HTTP fixes, GPU optimization). Core reliability issues (history, queue) acknowledged but no ETA.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*