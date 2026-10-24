# Bản tin Hệ sinh thái Hermes Agent 2026-10-24

> Issues: 31 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-24 02:00 UTC

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

# Báo cáo hoạt động Hermes Agent — 2026-10-24

## 📊 Tóm tắt hôm nay

Ngày 24/10 dự án phát hành patch **v0.22.5** (231 commits, +35K/-18K LOC). Tập trung xử lý session authority bugs sau unified gateway merge, performance critical với lineage scan chặn CPU, desktop không load được session dài. Nhiều fix authentication, MCP connector, Docker sandbox path resolution.

---

## 🚀 Releases

### **v0.22.5** (2026-10-23)
- Patch rollup 81 PRs sau v0.22.4
- Stabilize cho CLI installer, Microsoft Store, Docker, Hermes Cloud
- Curated notes đầy đủ gộp vào v0.23.0 (chưa release)
- Commit: `bf0203a794a`

---

## 🏗️ Tiến độ dự án

### **Critical fixes đang triển khai**

**Session authority overhaul aftermath (P2):**
- #143818: API sessions viết không được sau cutover v0.22.4 (missing API binding, legacy adoption bỏ custom source label) → đang fix
- #143825: admission_conflict block resume/branch vĩnh viễn trên Windows desktop
- #143829: Desktop sessions dài stuck "Loading session" forever v0.22.5, v0.22.2 OK → rollback hotfix đang điều tra
- #143831: legacy adoption reject custom source → sessions cũ thành not_found vĩnh viễn

**Performance regressions (P2):**
- #143833: Session list rescan toàn bộ lineage receipt mỗi request (~130ms/call), 4,583 sessions = 3 CPU cores bị bão hoà → local_lineage_index cache cần rewrite
- #143806: File-logging queue unbounded + exception traceback giữ object graphs → memory leak khi log nhanh quá ghi

**Docker + Desktop remote (P2):**
- #137381: Remote Desktop không download được MEDIA: file từ Docker sandbox (404, /api/files/download không translate container path) → #137384 PR sẵn sàng merge

### **Auth & credentials (P2)**
- #139818: Remote backend desktop sessions unresumable from local viewer (session.resume not_found) → #143545 PR adopted served-login rows
- #81818: Same-URL custom providers merged sai credential → PR đang review
- #87641: key_cmd callable bị coerce thành string → refresh stale bearer bị bể
- #142022: Following session /model crash on config_secret_ref → PR merged

### **Kanban workflow (P2-P3)**
- #29458: active_pr respawn guard không clear khi PR closed → card stuck
- #143826: gave_up → blocked transition không notify assignee
- #121391: Không thay đổi completion_contract sau creation → cần add `kanban edit --completion-contract`
- #143824/#140025: Required check conclusion=skipped coi là infra fail → merged PR không complete card

### **MCP ecosystem**
- #138329: httpx2==2.12.0 có SSE 1 MiB cap → large tools/list bị silent break, upstream issue → CLOSED (workaround applied)
- #141136: MCP servers tools/list > 1 MiB không connect được → duplicate #138329, CLOSED
- #97010: Google Workspace MCPs (gmail/drive/docs/calendar) không authenticate được → PR đang xử lý 3 issues riêng biệt
- #53873: OAuth flow không trigger khi server 200 initialize without auth → CLOSED merged

### **Desktop stability**
- #143823: NVIDIA false SwiftShader recovery loop (shutdown tagged wrong artifact) → PR ready
- #131199: Windows first-run install fails dependency stage → repro chưa ổn định
- #143814: umbrelOS Dashboard setup wizard loop despite config OK (Gemini provider) → investigating
- #143821: ENOTEMPTY on plugin install boot (race condition writer desktop-plugins root) → PR ready
- #128528: Desktop không biết turn còn alive khi quiet (backend needs turn.alive signal) → PR gần xong

---

## 🔥 Điểm nổi bật cộng đồng

**Tương tác cao:**
- #143547 (10 💬, 1 👍): Unified gateway post-merge problems tracking issue — hub cho session/Desktop/gateway issues sau merge lớn #106742
- #90677 (💬 nhiều): Telegram show live subagent status — UX cải thiện cho delegated work visibility
- #142324 (3 💬, 1 👍): Pillow pinned 12.3.0, CVE heap overflow trong OpenJPEG chỉ fix ở 13.0.0 → security concern

**Plugin ecosystem mở rộng:**
- #143835: Operations plugin catalog 0.3.3 → 0.4.0
- #143834: Model Router v0.4.6 → v0.4.7
- #143827: Adaptive Inference routing plugin (opt-in)
- #143809: session-find 1.0.0 (Cmd+Option+F search history window)
- #143070: hermes-plexus (Obsidian-style vault graph + editor in Desktop)
- #142416: precleared plugin (check cold email legality before send)

---

## 🐛 Ổn định & Bugs

### **P1-P2 blockers active**
1. **Session không load** (#143829): v0.22.5 Desktop stuck loading long-history sessions, v0.22.2 OK
2. **Dead connection sweep broken** (#143802): TLS socket probe raise exception → sweep never fire, Windows toàn bộ endpoint bị ảnh hưởng
3. **Logging memory leak** (#143806): Unbounded queue + traceback graphs → amplified growth
4. **Session lineage CPU spike** (#143833): 130ms per list call, 4.5k sessions = 3 cores sat

### **Fixes merged/pending**
- #123680 CLOSED: Discord voice TTS upload MP3 as .ogg → OPUS transcode missing
- #96703 CLOSED: MCP trust-gate card không show args, Session/Always button act as Once
- #132120 CLOSED: Cron drops `[[audio_as_voice]]` → Telegram TTS không đến dạng voice bubble
- #143830 PR: HEIC/HEIF inbound convert JPEG (iPhone photos rejected "non-image data")
- #143819 PR: Discord skip empty chunks → avoid 400 code 50006
- #108585 PR: Bedrock toolUse replay dropped call → ValidationException fix

---

## ✨ Yêu cầu tính năng

**UX improvements:**
- #118181 (3 💬): Desktop paste files từ OS file manager (Ctrl+C → Ctrl+V) như drag-and-drop
- #141551 → #143832: Desktop Settings › Storage page + free space from inactive sessions (Cowork-inspired)

**Workflow features:**
- #143053: Plugin catalog admission guidance cho complete workflow/source bundles (Solaris Dev Shop case)
- #131117: Telegram private topics show draft stream activity (native "Thinking…" preview)

**Safety & compliance:**
- #143379 (11 💬): RFC doc-chain substrate network (read, governance, compaction) — crypto/security design discussion

---

## 💬 Phản hồi người dùng

**Pain points quan trọng:**
1. **Session reliability regression** sau unified gateway merge — nhiều users không resume được conversations (custom source labels, API bindings, remote backends)
2. **Windows Desktop install failures** — dependency stage chưa reliable (#131199)
3. **Performance degradation** với large history (4-5k sessions → CPU spike, slow list)
4. **Docker + remote Desktop** file download 404 → workflow bị block
5. **MCP auth workflows** phức tạp (Google Workspace servers, OAuth không trigger khi 200 initialize)

**Tích cực:**
- Plugin ecosystem sôi động (5 new/updated plugins hôm nay)
- Community workflows (Kanban, cron, skills) mature → production usage
- Desktop features (storage management, session search) responsive đến feedback

---

## 📋 Backlog & Roadmap

### **Immediate priorities (inferred từ P1/P2 issues)**
1. Session authority stabilization (v0.22.x patch window)
2. Performance fixes (lineage cache, logging queue bounds)
3. Desktop remote + Docker sandbox reliability
4. MCP OAuth flow hardening

### **Mid-term (v0.23.0 window)**
- Curated release notes gộp v0.22.4 → v0.22.5 changes
- Plugin catalog maturity (admission process, version management)
- Kanban completion contract flexibility
- Compression + session rotation goal migration

### **Known tech debt**
- #143802: Dead connection sweep rewrite (socket probe broken)
- #29458: Kanban PR guard operator override path
- #54088: Skill resolution failures crash dispatcher
- #142324: Pillow 13.0.0 bump (security advisory)

---

## So sánh hệ sinh thái chéo

# Báo cáo So Sánh Hệ Sinh Thái AI Agent — 2026-10-24

## 1. 📊 Tổng Quan Hệ Sinh Thái

Hệ sinh thái đang qua phase **post-launch stabilization**. Hermes Agent vừa merge architectural change lớn (unified gateway), trigger wave bug fixes. OpenClaw gặp critical SQLite + memory issues. Smaller projects (NanoBot, Zeroclaw) focus hardening before next major release. Tiny projects (PicoClaw, NullClaw, IronClaw) low activity hoặc dependency-only maintenance.

**Unified theme**: Stability over features. Security (auth scope, shell injection) high priority. Desktop clients mature (session management, remote backends). Channel/provider expansion continues.

---

## 2. 📈 Bảng So Sánh Hoạt động

| Dự án | Issues | PRs | Releases | PR Merged | Issue Closed | Engagement | Giai đoạn |
|-------|--------|-----|----------|-----------|--------------|------------|-----------|
| **Hermes Agent** | 31 | 500 | 1 (v0.22.5) | 81 PRs | ~15 | 🔥🔥🔥 High (10+ comments/issue) | Post-merge stabilization |
| **OpenClaw** | 152 | 500 | 0 | ~5 backports | 1 (Doctor OOM) | 🔥🔥 Medium-High (7-10 comments) | Critical bug triage |
| **NanoBot** | 6 | 30 | 0 | 19 | 5 | 🔥 Medium (3-5 comments DuckDuckGo) | Pre-v0.4.0 polish |
| **Zeroclaw** | 5 | 50 | 0 | 0 (CI blocked) | 0 | 🔥 Medium (security PRs review) | Security hardening |
| **NanoClaw** | 1 | 39 | 0 | ~10 | 0 | 🟡 Low (1 comment) | CI optimization + image refresh |
| **PicoClaw** | 2 | 4 | 0 | 0 | 0 | ❄️ Minimal (0-2 comments) | Stale maintenance |
| **NullClaw** | 1 | 0 | 0 | 0 | 0 | ❄️ Minimal | Single enhancement request |
| **IronClaw** | 0 | 5 | 0 | 5 (dependabot) | 0 | ❄️ None | Automated deps only |
| **QwenPaw** | 13 | 50 | 0 | 5 | 7 | 🔥🔥 Medium-High (8-19 comments) | Refactoring + channel reliability |

---

## 3. 🎯 Vị Thế Hermes Agent

**Leader vị trí**:
- Volume cao nhất: 81 PRs merged, patch release v0.22.5 ngay sau unified gateway merge
- Ecosystem maturity: plugin catalog active (5 new/updated plugins hôm nay), Kanban workflow production-ready, MCP connector ecosystem
- Community scale: 10+ comments/issue, nhiều external contributors, Discord/Telegram active

**Challenges đang đối mặt**:
- **Regression aftermath**: Unified gateway (#106742) introduce wave bugs (session authority, API bindings, remote desktop, lineage CPU spike)
- **Windows stability**: cold start failures (#131199), umbrelOS false recovery loop (#143823)
- **Performance bottlenecks**: lineage scan 130ms/call with 4.5k sessions = 3 cores saturated (#143833)

**Competitive advantages**:
- **Plugin ecosystem**: Native catalog, webhooks, theme extension proposals
- **Multi-channel maturity**: Telegram TTS, Discord voice, cron workflows
- **Desktop client**: Storage management UI, session search, unified experience
- **Cloud offering**: Microsoft Store, Hermes Cloud managed service

**Risk factors**:
- Session reliability regression impact user trust
- Large codebase = harder stabilization
- Windows install failures block adoption
- MCP OAuth complexity (Google Workspace) friction for enterprise

---

## 4. 🔧 Hướng Kỹ Thuật Chung

### Shared patterns

**1. Session architecture evolution**
- **Hermes**: Unified gateway, session authority overhaul
- **OpenClaw**: SQLite admission/worker separation, WAL checkpoint issues
- **NanoBot**: Idle compaction race fixes
- All: Multi-step conversations = core challenge, context management critical

**2. Desktop client maturity**
- **Hermes**: Microsoft Store, remote backend support, storage management
- **NanoClaw**: Daemon architecture proposal (#8373) for multi-window independence
- **QwenPaw**: Desktop cold start optimization, daemon refactor in progress
- Trend: Desktop becoming first-class citizen, not just web wrapper

**3. Security hardening wave**
- **Zeroclaw**: Shell injection (#11822), auth scope (#9746, #11230), agent ownership isolation
- **NanoClaw**: Container symlink TOCTOU (#4207), mount --rw enforcement (#3742)
- **Hermes**: MCP trust-gate improvements
- Industry-wide: RBAC, sandbox isolation, principle of least privilege

**4. SQLite pain points**
- **OpenClaw**: Reader pin WAL (#164294), admission deadlock (#181660), transaction timeouts (#181432)
- **Hermes**: Lineage scan CPU spike (#143833)
- **NanoClaw**: Not visible in data, but hardened image implies container constraints
- Pattern: SQLite works until scale hits, then WAL/locking becomes bottleneck

**5. Provider/channel expansion**
- **Hermes**: MCP ecosystem, Google Workspace MCPs
- **NanoBot**: Kimi K3.1 Pro, MiniMax-M3.1-Flash
- **PicoClaw**: Standard Compute, NEAR AI Cloud
- **QwenPaw**: XiaoYi, DingTalk, QQ channels
- Race: Cover most LLM providers + communication channels

### Tech choices diverging

| Area | Hermes | OpenClaw | NanoBot | Zeroclaw | QwenPaw |
|------|--------|----------|---------|----------|---------|
| **Gateway** | Unified gateway (v0.22.4+) | Gateway + Doctor separate | Not visible | OneCLI bind 127.0.0.1 | Hub + local |
| **Session storage** | SQLite lineage | SQLite + snapshot hard link | Not visible | RPC queued | Not visible |
| **Desktop** | Electron-like (Microsoft Store) | Native (ARM64 support) | Not visible | WSL + systemd | Daemon proposal |
| **Plugins** | Native catalog + webhooks | External plugins OOM (#180690) | Not visible | Plugin SDK redesign (#7874) | Theme extension RFC (#8071) |
| **Auth** | MCP OAuth flow | API key rotation | Not visible | OIDC dashboard (#11965) | Not visible |

---

## 5. 🔍 Điểm Khác Biệt

### Hermes Agent: **Ecosystem breadth leader**
- **Strategy**: Cover all use cases — channels, plugins, workflows, cloud
- **Unique**: Kanban workflow, cron skills, Microsoft Store distribution
- **Trade-off**: Complexity → regression risk (unified gateway aftermath)
- **Community**: Large, external contributors, sôi động

### OpenClaw: **Production stability focus**
- **Strategy**: Enterprise-ready, ARM64 support, long-term maintenance (backport batches)
- **Unique**: Doctor tool for migrations, Platform-specific fixes (Pi OS, Termux)
- **Trade-off**: Conservative → slower feature velocity
- **Community**: Technical users, detailed bug reports, production deployments

### NanoBot: **Lean + fast iteration**
- **Strategy**: WebUI polish, provider day-0 support, CI speed (7.5 → 2.5 min)
- **Unique**: Context compaction reasons UI, idle scan guards
- **Trade-off**: Small team → fewer channels/providers than Hermes
- **Community**: Focused, DuckDuckGo issue 3 competing PRs = engaged

### Zeroclaw: **Security-first**
- **Strategy**: Harden before scale — shell allowlist, auth scope, OIDC
- **Unique**: RUSTSEC advisories block CI, XMPP + OMEMO channel
- **Trade-off**: CI blocked by security = velocity hit
- **Community**: Security-conscious, contributor from Firecrawl team

### QwenPaw: **Asia market + channels**
- **Strategy**: DingTalk, XiaoYi, QQ — Chinese ecosystem
- **Unique**: ReMe integration (decision compaction), Creator 2.0 (skills, narration)
- **Trade-off**: Channel reliability issues (DingTalk drop reply, XiaoYi blank)
- **Community**: Asian users, Office file preview requests

### NanoClaw: **CI/image hardening**
- **Strategy**: Automated image refresh (4x/day), sharded tests
- **Unique**: llmman local-model, AgentMail hosted inbox
- **Trade-off**: Hardened image break ML workflows (libgomp1 missing #4211)
- **Community**: Quiet, bot-driven

### Smaller projects (PicoClaw, NullClaw, IronClaw): **Niche/inactive**
- PicoClaw: OpenWrt/Android focus, low engagement, critical bugs unresolved
- NullClaw: Single enhancement (temperature=null), no momentum
- IronClaw: Dependabot only, no human activity

---

## 6. 🌱 Mức Độ Trưởng Thành Cộng Đồng

### Tier 1: **Mature communities** (Hermes, QwenPaw)
- External contributors, plugin ecosystem, multi-channel discussions
- 10-19 comments/issue, proposals with long threads
- Production users report real-world pain points
- Governance emerging (Hermes plugin catalog admission #143053)

### Tier 2: **Growing communities** (OpenClaw, NanoBot, Zeroclaw)
- Technical users, detailed bug reports, competing PRs (DuckDuckGo 3 fixes)
- Security-conscious contributors (Zeroclaw Firecrawl team)
- 5-10 comments/issue, backport processes (OpenClaw batch 5)
- Platform diversity (Pi OS, Termux, ARM64)

### Tier 3: **Early/niche** (NanoClaw, PicoClaw)
- Bot-driven maintenance, low human engagement (0-2 comments)
- Technical depth (NanoClaw CI optimization) but small active base
- PicoClaw: critical bugs linger (DNS #3420, launcher #3439)

### Tier 4: **Inactive/new** (NullClaw, IronClaw)
- Single-issue activity or dependabot only
- No community signals

**Indicator correlation**:
- Comments/issue ↔️ external contributors ↔️ production adoption
- Backport processes = long-term maintenance commitment (OpenClaw)
- Plugin/theme extension requests = ecosystem maturity (Hermes, QwenPaw)

---

## 7. 🔮 Tín Hiệu Xu Hướng

### Short-term (Q4 2026)

**Stability consolidation**:
- Hermes v0.23.0 = curated notes gộp v0.22.4-v0.22.5, session authority fixed
- OpenClaw: Memory leak + SQLite admission PR waves
- NanoBot v0.4.0: WebUI polish complete
- Zeroclaw v0.9.0: OIDC dashboard + scoped chat

**Desktop daemon architecture**:
- QwenPaw #8373 (multi-window independence)
- NanoClaw AgentMail (hosted inbox)
- Hermes remote backend stable
→ Desktop = independent process, not web wrapper

**Security baseline raise**:
- Shell injection, auth scope, sandbox isolation now table stakes
- RUSTSEC advisories block merge (Zeroclaw pattern may spread)
- OIDC over pairing codes (Zeroclaw lead)

### Mid-term (2027 H1)

**Session architecture rethink**:
- Current: SQLite + lineage/WAL bottlenecks at scale
- Future: Append-only event history (Zeroclaw #11921), streaming checkpoints
- Pressure: 4-5k sessions = CPU spike, OOM on resume
→ Next gen: event sourcing + CQRS patterns

**Plugin ecosystems mature**:
- Hermes catalog admission process formalize
- QwenPaw theme extension SDK (#8071 discussion signals demand)
- Zeroclaw plugin webhooks via RPC (#11322)
→ Third-party marketplace emerge

**Provider consolidation**:
- Race covering all LLMs slows down
- Focus shift: Multi-modal (video), reasoning effort tuning, cost optimization
- Local models via gateways (NanoClaw llmman, Standard Compute pattern)

**Channel reliability over expansion**:
- QwenPaw DingTalk/XiaoYi bugs = production blocker
- Telegram TTS, Discord voice mature (Hermes)
→ Depth over breadth: Fewer channels, better UX

### Long-term (2027 H2+)

**Workflow orchestration**:
- Hermes Kanban = early signal
- Expect: DAG-based multi-agent coordination, approval gates, SLA tracking
- Pattern: Agent = task executor, workflow = orchestration layer

**Compliance + audit**:
- Decision compaction (QwenPaw ReMe), append-only history (Zeroclaw)
- Enterprise demand: Why did agent do X? Roll back decision Y.
→ Explainability + governance built-in

**Edge deployment**:
- Pi OS, Termux, ARM64 support signals on-prem/edge trend
- Local model gateways = privacy/latency advantage
- Expect: Kubernetes operators, fleet management

**Community fork risk**:
- OpenClaw + Hermes overlapping features
- Smaller projects (PicoClaw, NullClaw) may merge or die
- Zeroclaw security-first niche defensible
→ Consolidation around 3-4 major projects

---

## 🎯 Strategic Insights

### For Hermes Agent

**Strengths to leverage**:
- Ecosystem breadth = moat (plugins, channels, workflows)
- Community momentum = recruitment advantage
- Microsoft Store = enterprise distribution

**Risks to mitigate**:
- Session reliability regression = trust damage
- Windows stability blocks SMB adoption
- Complexity debt from unified gateway
→ **Action**: v0.23.0 = stability release, no new features. Performance sprint (lineage cache rewrite).

### Cross-project patterns

**What works**:
- Boring tech (SQLite, Electron, stdlib-first) until scale forces change
- Security-first cohort (Zeroclaw) pull industry up
- Provider day-0 support (NanoBot) = competitive advantage
- Desktop daemon separation = architecture unlock

**What struggles**:
- Large refactors (unified gateway, daemon, PawApp SDK) = regression waves
- Multi-channel reliability > breadth (QwenPaw pain)
- Small projects without community momentum stagnate
- SQLite hits wall at 4-5k sessions without tuning

**Gaps nobody filling**:
- **Workflow orchestration** beyond basic cron/Kanban
- **Compliance tooling** (audit logs, decision rollback)
- **Fleet management** for edge deployments
- **Cost optimization** across providers (routing, caching)

→ Opportunity: First mover in enterprise workflow layer wins.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-24

## 1. Tóm tắt hôm nay

Không có release mới. Tập trung fix bugs quan trọng: memory leak, session recovery, SQLite deadlock. Nhiều backport batch cho các phiên bản stable. Cộng đồng report nhiều vấn đề performance và crash trên production.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PRs đang hoạt động:**

- **#182091** (steipete): Fix session recovery OOM khi transcript lớn. Load từng phần thay vì load toàn bộ history. Critical cho production stability.
- **#180247** (RomneyDa): Preserve tool timeout recovery checkpoints. Tool execution có thể timeout nhưng side effects chưa rõ → cần durable checkpoint.
- **#182021** (steipete): Giảm memory footprint của transcript worker. Worker đang retain toàn bộ Gateway setup + plugins không cần thiết.
- **#181927, #181924, #181920** (RomneyDa): Backport batch 5 cho các release line 2026.10.x và 2026.9.33. Bao gồm fixes cho release automation, plugin SDK, và QA tooling.

**Issues nóng:**

- **#181660** (P0): Gateway crash với "Session read batch cannot reenter SQLite writer admission" trên Pi OS sau message thứ 2. Regression từ 2026.10.6.
- **#181432** (P1): Memory tăng từ 300MB → 1.9GB sau update 2026.9.4 → 2026.10.5 trên ARM64. SQLite transaction timeout và crash.
- **#180690** (P1, CLOSED): Doctor OOM tại 6GB khi migrate ~800 agents từ v28 → v31. Cần 3 passes, 110 phút. Fixed.
- **#164294** (P2): WAL checkpoint không bao giờ complete vì bị pin bởi in-process reader. 17K frames chưa được checkpoint.
- **#160959** (P0): Gateway block vài phút khi capture large external plugins. Regression từ 2026.9.6.

## 4. Điểm nổi bật cộng đồng

- **#158592** (10 comments, P0): Sau sleep/wake trên macOS, một agent's model runtime publication timeout và không recover. Mọi message fail với "runtime owner was not published" cho đến khi restart gateway. Impact lớn cho laptop users.
- **#167791** (7 comments, P1): Android/Termux không chạy được vì SQLite snapshot dùng hard link → EACCES. Platform-specific blocker.
- **#150822** (9 comments, P1): Native Codex children advertise OpenClaw tools nhưng không có execution handler. Security concern + message loss.

## 5. Ổn định & Bugs

**Critical (P0-P1):**

- SQLite admission/worker deadlock gây session failures (#181660, #181432)
- Memory leak từ 2026.10.5: baseline 300MB → 1.9GB (#181432)
- Gateway block minutes khi load large plugins (#160959)
- Android/Termux hard link permission issue (#167791)
- Session auto-recovery load full bloated context → expensive (#110338, 8 comments)

**Performance:**

- #152846: Windows event loop stall 60-68s, main thread block trong sync FS syscall
- #112758: SQLite thiếu `mmap_size` và `cache_size` pragmas → event loop stalls với 88MB database
- #113328: Whisper STT trên CPU-only host: 65s clip mất ~6 phút transcribe

**Data integrity:**

- #114128: Agents write literal `\n` vào Python files qua unquoted heredocs
- #113219: Windows GBK output bị mangle thành UTF-8 → corrupt transcript → empty-response loop
- #158417: Plugin re-materialization fill `/tmp`, không bao giờ cleanup

## 6. Yêu cầu tính năng

- **#176273** (5 comments): Native progress-card SDK cho community workflow plugins. Hiện tại không có cách để plugins contribute progress cards một cách an toàn.
- **#111943** (6 comments): Configurable model + reasoning effort cho background "learning" subsystems (dreaming, commitments, self-learning).
- **#115368**: Add `openclaw tools` subcommand để enumerate tools across built-in/plugin/MCP. Hiện tại 3 nguồn khác nhau, không có unified view.
- **#113582**: Fail-closed Workboard completion gates. Cards có thể marked done mà không có structured proof.
- **#107433** (6 comments): `openclaw backup` support manifest-backed omissions cho protected/reconstructable runtime paths.

## 7. Phản hồi người dùng

**Pain points chính:**

1. **Memory**: Baseline memory tăng đột biến trong 2026.10.5, không acceptable cho VPS/Pi users
2. **Session recovery**: Load toàn bộ transcript khi resume → OOM hoặc expensive API calls. #110338: "paid 8 API calls for 5 actual calls" sau restart
3. **Platform compatibility**: Termux/Android blocked hoàn toàn (#167791), Windows GBK encoding issues (#113219)
4. **Gateway stability**: Sleep/wake trên macOS break agent runtime, cần manual restart (#158592)
5. **Update failures**: `openclaw update` thất bại thường xuyên trong khi manual `npm install -g` works (#156112, 18 comments)

**Positive signals:**

- Các backport releases đang active → maintainers commit to stability
- Security-sensitive PRs được review kỹ (#179899, #180230)
- Performance work đang được prioritize (#182021, #182000)

## 8. Backlog & Roadmap

**Đang làm:**

- Memory optimization cho workers (#182021, #182000)
- Session recovery improvements (#182091)
- Release automation hardening (batch 5 backports)
- SQLite admission logic fixes (#181660)

**Cần làm (theo issue priority):**

- P0: Plugin capture blocking (#160959), session admission deadlock (#181660)
- P1: Memory regression (#181432), Android support (#167791), update failures (#156112)
- P2: WAL checkpoint issue (#164294), context poisoning via transcript reinjection (#113346)

**Không có explicit roadmap** trong data. Backlog driven by bug severity và production impact.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot 2026-10-24

## 📊 Tóm tắt hôm nay

Không có release mới. Dự án xử lý 24 PR (19 đã merged), 5 issue đóng. Tập trung sửa bug stability và polish WebUI trước release v0.4.0. Core fixes: idle compaction race conditions, DeepSeek reasoning format, DuckDuckGo rate limit handling.

---

## 🚀 Releases

Không có releases trong 24h qua.

---

## 📈 Tiến độ dự án

### Merged PRs quan trọng

**🔧 Stability Fixes (P2)**
- **#6405**: Idle compaction scan bỏ qua direct turns đang chạy → fix race condition khi long-running API call bị archive giữa chừng
- **#6414**: DeepSeek Responses replay dùng `reasoning_text` thay vì `output_text` → match documented schema
- **#6409**: DuckDuckGo search report ambiguous failures as unavailable thay vì "No results" → fix #6285
- **#6360**: Add MiniMax-M3.1-Flash, tránh `reasoning_split=false` → day-0 support model mới

**✨ WebUI Polish (P2)**
- **#6337**: Fix Composer/sidebar run state desync → Composer showing "responding..." khi sidebar đã idle
- **#6389**: Distinguish context compaction reasons → idle vs pressure vs manual `/compact`
- **#6256**: Compact workspace toolbar → permission controls không chiếm thêm row
- **#6413**: Show renamed topic titles in @ mentions → sidebar title sync với message input
- **#6416**: Keep Apps search within active filter → tìm "figma" trong tab Ready không show unconnected apps
- **#6398**: Preserve dollar prefix in skill references → `$github` hiển thị đúng, không mất `$`

**🔨 Provider Fixes**
- **#6418**: Support Kimi K3.1 Pro params → fix temperature fixed at 1.0, add reasoning levels
- **#6422**: Require explicit "none" effort cho Azure GPT-6 temperature → GPT-6 reject temperature unless reasoning_effort="none"

**🧪 Test & CI**
- **#6394**: Remove unreachable test cases, strengthen weak assertions
- **#6395**: Reuse isolated pip seeds, parallelize native acceptance → CI speed up

**🎨 UX Refinements**
- **#6419**: Refine composer action feedback → smooth voice/Send/Stop icon transitions
- **#6417**: Remove goal halo and redundant header → active goal visible without pulsing
- **#6415**: Simplify workspace picker icon → 14px folder outline, drop interior strokes
- **#6408**: Keep missing pasted paths silent → không show error khi user đang paste

### Open PRs đang review

**🔧 Critical Fixes (P2)**
- **#6423**: Report session worker task failures → log unhandled exceptions from dispatch worker
- **#6422**: Azure GPT-6 temperature requires explicit "none" effort
- **#6421**: Recheck idle expiry after acquiring session lock → fix #6410
- **#6420**: Preserve goal continuation lifecycle → fix `/goal` reported finished tại iteration boundary

**✨ Features**
- **#6412**: Unify code and diff highlighting → replace separate Prism paths, restore single-column preview
- **#6323**: Edit and resend messages in same session → in-place edit without new topic
- **#6289**: Matrix "listen" group policy → observe room, reply on mention only
- **#6401**: Replace idle polling with gateway invalidations → WebUI tabs không poll unchanged data

---

## 🌟 Điểm nổi bật cộng đồng

**#6285** (bug, closed): DuckDuckGo consecutive searches fail with "No results" → thực ra là rate limit/anti-bot rejection. Có **3 PR cạnh tranh**:
- #6331 (merged): Full backoff retry logic
- #6300, #6290 (closed): Simpler retry approaches

**#6079** (enhancement, open, P2): Allow agents observe group messages without always replying → Matrix channel đã implement "listen" policy (#6289), nhưng issue propose generic cross-channel solution

**#6410** (open): Idle compaction run immediately after long direct turn → #6405 đang fix, #6421 thêm recheck after lock acquire

---

## 🐛 Ổn định & Bugs

### Đã fix
- ✅ Idle compaction race: archive session giữa turn (#6405, #6421)
- ✅ DeepSeek reasoning format mismatch (#6414, #6411)
- ✅ DuckDuckGo rate limit reported as empty results (#6409, #6285)
- ✅ WebUI Composer/sidebar state desync (#6337)
- ✅ Goal lifecycle reset at iteration boundary (#6420)
- ✅ Kimi K3.1 Pro unsupported params (#6418)
- ✅ Azure GPT-6 temperature rejection (#6422)

### Đang xử lý
- 🔄 Session worker task failures không được log (#6423)
- 🔄 Context compaction trong idle scan timing (#6410, #6421 đang review)

### Closed without merge
- 🚫 #6214: Idle compaction archive running direct turn → fixed by #6221 (đã merged trước đó)
- 🚫 #6407: DeepSeek web_search tool config → closed (DeepSeek API search là built-in, không cần extra config)

---

## 💡 Yêu cầu tính năng

**#6079** (P2, open): Generic group message observation without auto-reply
- Matrix đã có "listen" policy (#6289)
- Issue propose architecture cho all channels: observe → relevance check → process → decide reply

**WebUI improvements (merged)**
- Workspace permission controls trong compact toolbar (#6256)
- In-place message edit (#6323, đang review)
- Context compaction reason labels (#6389)
- Unified code/diff highlighting (#6412, đang review)

**Provider support**
- MiniMax-M3.1-Flash (#6360, merged)
- Kimi K3.1 Pro full params (#6418, merged)

---

## 💬 Phản hồi người dùng

**DuckDuckGo reliability** (#6285): Multiple users report consecutive search failures. Fix merged với backoff retry + clear error message.

**WebUI polish before v0.4.0**: 
- Apps search không respect tab filter (#6416)
- Renamed topics không sync trong @ mentions (#6413)
- Goal halo distracting (#6417)
- Missing pasted paths show unnecessary errors (#6408)

**DeepSeek integration**: 
- Reasoning format mismatch fixed (#6414)
- Web search tool config request closed (no extra config needed)

---

## 📋 Backlog & Roadmap

**v0.4.0 Release blockers** (NAN-344):
- NAN-345: Apps search filter → **fixed** (#6416)
- NAN-263: Composer/sidebar state desync → **fixed** (#6337)
- NAN-275: Restored waiting messages auto-execute → **fixed** (#6393)
- NAN-342: Renamed topic @ mention sync → **fixed** (#6413)

**Post-v0.4.0**:
- Generic group observation policy (#6079)
- In-place message edit (#6323, đang review)
- Gateway invalidations thay idle polling (#6401, đang review)

**Infrastructure**:
- CI parallelization (#6395, merged)
- Test coverage cleanup (#6394, merged)

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw 2026-10-24

## 🔥 Tóm tắt hôm nay

Dự án chặn toàn bộ CI do 2 lỗ hổng bảo mật RustSec (ctutils + tokio). Nhiều PR bảo mật lớn đang review (shell injection, auth scope, agent ownership). Dashboard sign-in OIDC + scoped chat đang triển khai.

---

## 📦 Releases

Không có release mới.

---

## 🚀 Tiến độ dự án

### Critical - CI bị chặn
- **#12009**: RUSTSEC-2026-0385 (ctutils) + RUSTSEC-2026-0386 (tokio) fail security job
- **#11998** + **#12010**: 2 PR fix song song (bump ctutils 0.4.2→0.4.5, tokio 1.53.1→1.41.1)
- Chặn merge gate cho toàn bộ PRs

### Security fixes - mức độ high
- **#11822** (XL): Shell command parser thiếu xử lý `$(...)`, `<(...)`, subshell → bypass allowlist
  - Thêm split tại substitution/subshell boundaries
  - Cần maintainer review
  
- **#11061** (S): `rm -rf` vẫn chạy nếu trong allowlist, bỏ qua `block_high_risk_commands`
  - Đã fix: hard block luôn check trước allowlist

- **#11301** (XL): Agent rename lỗi → workspace/memory/cron state bị stranded
  - Durable recovery cho CLI + gateway + RPC
  - Release gate, p1

- **#9746** (XL): Session tools + discord_search thiếu per-agent ownership scope
  - Agent chỉ list/read/write conversations của mình
  - Telegram/Discord isolation
  - Release gate, p1

- **#11230** (XL): Non-admin principals vẫn truy cập session-data tools
  - Withhold tools dựa vào principal scope
  - Stacked trên #11225
  - Release gate, p1

- **#11234** (XL): RPC queued session ownership judge sai authority
  - Fix judge theo current authority, không phải snapshot cũ
  - Release gate, p1

### Features mới
- **#11986** (XL): Dashboard chat qua core RPC
  - Scoped, stacked trên dashboard sign-in (#11965)
  - v0.9.0
  
- **#11965** (XL): OIDC dashboard sign-in
  - Thay pairing code bằng OIDC provider config
  - Per-user auth thay vì shared operator
  - v0.9.0

- **#11680** (XL): Firecrawl web search provider
  - Contributor từ Firecrawl team
  - Gọi `/v2/search` API

- **#11847** (XL): XMPP/Prosody channel với OMEMO
  - Direct TLS + STARTTLS
  - Optional OMEMO encryption

- **#11921** (XL): Append-only session event history
  - Versioned events, replay không lặp side effects
  - Architecture refactor lớn

### Infrastructure
- **#11976** (L): CI build CLI-only feature set với artifact ratchet
  - Isolate CLI dependencies khỏi gateway/web
  - v0.9.0

- **#11322** + **#11320**: Plugin webhooks qua RPC
  - Gateway forward webhooks đến core
  - Needs author action

---

## 💬 Điểm nổi bật cộng đồng

### Issues người dùng báo
- **#12008**: Cron + one-off sends bỏ qua disabled channel (chỉ QQ arm check enabled)
  - S2 severity
  
- **#12006**: `tool_search` serve stale schema cho deferred tools sau reload
  - Schema snapshot lúc build, không follow live config
  - S3 severity

- **#12005**: PowerShell dialect reject `@` trong arguments
  - Email CLI không dùng được (allowlisted nhưng chặn)
  - Regression

### PRs có nhiều activity
- Security fixes (#11822, #11301, #9746) đang được review kỹ
- Dashboard features (#11986, #11965) chuẩn bị merge
- Dependency bumps (#12010, #11936 vite 8.0.16→8.3.5)

---

## 🐛 Ổn định & Bugs

### Blockers
- **CI gate**: RustSec advisories chặn toàn bộ merges
  - Fix đang chờ merge (#11998 hoặc #12010)

### Đang xử lý
- **#12008**: Channel delivery bypass enabled check
- **#12007**: Deferred tool schema stale sau reload
  - PR fix: serve từ live tools thay vì assembly copy
  
- **#12005**: PowerShell `@` parsing lỗi
  - Block allowlisted email commands

### Auth/ownership bugs (release-gate)
- Nhiều PRs p1 đang fix agent isolation (#9746, #11230, #11234)
- Agent rename recovery (#11301)
- CLI config edits không publish vào daemon (#11313)

---

## ✨ Yêu cầu tính năng

### Đang implement
- **#11013**: Unified file intake/resolver/delivery (tracker cho RFC #9488)
- **#10499**: Validate persistent config writes
- **#11410**: Cron write guards + scoped execution
- **#11846** + **#11845**: OpenRouter balance reporting trong dashboard settings

### Proposals
- **#11980**: Runtime composition extension row cho #11174
- **#11701**: Bounded recovery exception cho agent-rename

---

## 🗣️ Phản hồi người dùng

### Pain points
- CI bị chặn vì security advisories → ảnh hưởng contributor workflow
- PowerShell dialect regression block production use cases
- Channel enable check không consistent (cron/one-off bypass)

### Tích cực
- Firecrawl team tự contribute integration (#11680)
- Security fixes được ưu tiên cao (nhiều PRs XL size, p1, release-gate)
- Dashboard auth modernization (OIDC) đang vào giai đoạn cuối

---

## 📋 Backlog & Roadmap

### v0.9.0 targets
- Dashboard OIDC sign-in (#11965)
- Scoped dashboard chat (#11986)
- CLI-only feature set CI (#11976)
- Append-only session events (#11921)
- Security fixes release-gated

### v0.8.7
- RustSec advisories fix (#12010)
- Regression fixes (#12005, #12008, #12006)

### Longer-term
- #11013 file intake/resolver tracker (RFC #9488 implementation)
- Plugin webhook RPC (#11322, #11320)
- Config validation (#10499)
- XMPP channel (#11847)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo hoạt động PicoClaw — 2026-10-24

## 1. Tóm tắt hôm nay

Không có hoạt động mới ngày 24/10. Dữ liệu cho thấy 4 item được đánh dấu `[stale]` vào 23/10 (2 issues, 2 PRs đóng/mở). Bot stale đánh dấu các item không có hoạt động trong X ngày. Dự án đang trong giai đoạn lắng xuống sau các contribution tuần trước.

## 2. Releases

Không có release trong 24h qua.

## 3. Tiến độ dự án

### PRs đang chờ (3 open)

**🔧 Bug fixes**
- **#3443** — MarkdownV2 escape cho Telegram. Link label có dấu chấm (ví dụ `[picoclaw.io]`) và blockquote text làm Telegram reject message → fallback plain text. PR escape reserved chars trong 2 context đó.
- **#3442** — Cron job luôn ghi `"lastStatus": "ok"` kể cả khi fail. Nguyên nhân: `CronTool.ExecuteJob` return string `"ok"` trên cả success/fail path + controller không propagate error. PR fix return actual status.

**✨ Provider mới**
- **#3431** — Thêm Standard Compute provider (OpenAI-compatible gateway, 1 key truy cập nhiều model từ nhiều labs). Pattern giống NEAR AI Cloud (#2917).

### PRs đã đóng
- **#3371** — `opencode-go` provider với `x-opencode-session` header. Đóng nhưng không rõ merge hay abandon.

### Issues đang mở
- **#3439** — picoclaw-launcher conflict `-public` + `-host`: crash loop. `-public` alone chỉ bind IPv6 → IPv4 client không kết nối được. OpenWrt aarch64 dual-stack. Chưa có fix.

### Issues đã đóng
- **#3420** — Android build CGO_ENABLED=0 → DNS fail `dial udp 127.0.0.1:53: connection refused`. Gateway không reach API endpoint. Đóng nhưng không rõ đã fix hay workround.

## 4. Điểm nổi bật cộng đồng

Tất cả items có 0-2 comment, 0 reactions → engagement thấp. Không có discussion hoặc issue nào viral. Contributor chủ yếu individual, không có cluster discussion.

## 5. Ổn định & Bugs

**🚨 Vấn đề nghiêm trọng**
- DNS resolution fail trên Android pure-Go build (#3420) → gateway offline. Đã đóng nhưng không clear solution.
- Launcher crash khi dùng `-public` + `-host` (#3439) → không thể expose public dual-stack.

**⚠️ User experience**
- Telegram formatting bị break với MarkdownV2 (#3443) → UX degraded nhưng có fix pending.
- Cron status report sai (#3442) → monitoring blind spot.

## 6. Yêu cầu tính năng

**Provider expansion:**
- Standard Compute integration (#3431) — trend: thêm nhiều provider để user có nhiều lựa chọn model.

Không có feature request mới trong data.

## 7. Phản hồi người dùng

Engagement thấp → ít phản hồi. Issues report bug cụ thể với environment detail (OpenWrt, Android build flags) → user base technical, biết isolate vấn đề.

Không có testimonial hoặc complaint về performance/usability ngoài bug report.

## 8. Backlog & Roadmap

Data không chứa roadmap explicit. Infer từ pattern:

**Immediate (đang PR):**
- Telegram MarkdownV2 escape
- Cron status reporting
- Standard Compute provider

**Blocked/unresolved:**
- Android DNS resolution (#3420 closed nhưng solution chưa clear)
- Launcher dual-stack binding (#3439 open, chưa có PR)

**Trend:** Provider expansion tiếp tục (NEAR, Standard Compute trong tháng 9-10). Focus vào stability (DNS, cron, formatting) hơn là feature lớn.

---

**Kết luận:** Ngày 24/10 quiet. Stale bot đánh dấu backlog tuần trước. Dự án có 2 critical bug (DNS, launcher) chưa resolve clear, 3 PR bug/feature đang review. Engagement cộng đồng thấp nhưng contributor quality cao (detailed report, focused PR). Next: merge pending PRs, address #3439 launcher crash.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-24

## 📊 Tóm tắt hôm nay

Dự án tập trung hardening và cleanup: 30 PRs hoạt động (chủ yếu fix + refactor), CI tối ưu từ 7.5 xuống 2.5 phút, image refresh bot đẩy 4 PRs. Issue #4211 báo agent image hardened fail cài Pillow/numpy do thiếu libgomp1/libgfortran5.

## 🚀 Releases

Không có release.

## 📈 Tiến độ dự án

**Tối ưu CI/CD (merged)**
- #4191: sharded test + cached image → CI giảm 5 phút
- #4208, #4217, #4214, #4212: bot tự động refresh hardened image 4 lần/ngày
- #4193 (ngày trước): pin Bun 1.4.4 khắp repo

**Security hardening (open/merged)**
- #4207: ghi container.json không theo symlink (tránh TOCTOU attack trước mount)
- #4171: card approval chờ host xác nhận trước khi resolve
- #4199: OneCLI gateway bind 127.0.0.1 thay vì Docker bridge
- #3742: mount --rw flag (hiện --ro no-op, bug security)

**Bug fixes quan trọng (open/merged)**
- #4216 (closed): bỏ hard limit 30 phút worker session
- #4213: auto-restart host sau provider-auth install
- #4196 (closed): xóa Dial key khi upgrade chỉ khi cần thiết
- #1559 (closed): forward ANTHROPIC_API_KEY vào container

**Tính năng mới**
- #4210: llmman local-model provider (OpenAI + Anthropic API trên 127.0.0.1:17434)
- #3743: AgentMail email channel (agent có email riêng không cần MX setup)
- #3976: GitHub Copilot SDK provider với device-login token trong gateway

**Cleanup lớn**
- #4209 (closed): sync 27 commits từ main vào branch `channels`
- #4206: sửa restart hint + service names trong docs

## 🔥 Điểm nổi bật cộng đồng

**Issue #4211** (mới, open): hardened image không cài được Pillow, numpy vì thiếu libgomp1/libgfortran5. Chặn workflow ML/data science. Chưa có fix.

**PR #3741** (35 bình luận?): scheduled task --fresh-session để job stateless, tránh session phình 15%/tuần. Stale từ 7/9, cần tác giả update.

## 🐛 Ổn định & Bugs

**Đang fix**
- #4211: agent image thiếu dependencies cho numpy/Pillow
- #3542: container_status drift khi startup adoption
- #3894: JSON.parse crash trong delivery + task-update
- #3287: inbound message ID bị thêm suffix agent-group
- #3273: install-node.sh hard-code apt-get, fail trên Fedora/RHEL/Arch

**Đã fix (merged/closed hôm nay)**
- #4216: worker không còn bị kill ở 30 phút
- #4196: upgrade không xóa nhầm Dial key
- #1559: Anthropic env vars forward vào container

## ✨ Yêu cầu tính năng

- #4210: llmman local-model (tích hợp OpenAI + Anthropic local)
- #3743: AgentMail email channel (hosted inbox không cần MX)
- #3976: GitHub Copilot provider với credential gateway
- #3286: skip image rebuild khi không có packages
- #3318: force baseline Bun binary (không phải AVX2)

## 💬 Phản hồi người dùng

- **Scheduled jobs**: #3741 chỉ ra session phình 15%/tuần do không reset context
- **Hardened image**: #4211 báo ML workflow fail → cần add libgomp1/libgfortran5
- **Setup UX**: #4206 chỉ thiếu hint restart cho WSL non-systemd
- **Local OneCLI**: #4199 đề xuất bind 127.0.0.1 thay vì expose Docker bridge

## 🗺️ Backlog & Roadmap

**In-flight (open PRs có label core-team)**
- Security: #4207, #4199, #4171
- UX: #4213, #4206
- Infrastructure: #3996 (Node 24 Debian trixie), #3851 (Codex transport config)
- Channels: #4156 (approval card full text), #3871 (transcript rotation)

**Stale cần attention**
- #3741: fresh-session (7/9, needs-author)
- #3742: mount --rw fix (7/9, needs-author)
- #3273, #3286, #3287, #3318: setup/container fixes từ 8/16-8/18

**Pattern**: team đang ưu tiên security hardening và CI velocity trước feature mới.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 24/10/2026

## 1. Tóm tắt hôm nay

Hoạt động thấp. Một issue enhancement về null temperature. Không có PR hay release.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Issue #1078** - enhancement cho phép set `temperature` = null

- Vấn đề: Một số LLM provider không hỗ trợ parameter `temperature`, gây lỗi request
- Lỗi cụ thể: `"Unsupported parameter: 'temperature' is not supported with this model"`
- Đề xuất: Cho phép `temperature` = null để không truyền parameter này vào API call
- Tình trạng: Open, 2 comments, chưa có PR

Xu hướng: Mở rộng tương thích provider.

## 4. Điểm nổi bật cộng đồng

Issue #1078 có 2 comments nhanh sau khi tạo (cùng ngày 23/10). Người dùng gặp vấn đề thực tế với provider không hỗ trợ temperature.

Không có reaction vote, nhưng có discussion ngay.

## 5. Ổn định & Bugs

Không phải bug - là compatibility issue với một số LLM provider cụ thể. NullClaw hiện hardcode hoặc luôn truyền temperature, gây fail với provider có constraint model.

## 6. Yêu cầu tính năng

**Temperature = null**

- Cho phép optional parameter control
- Tăng flexibility khi tích hợp nhiều provider
- Pattern: nullable config để skip parameter không cần thiết

## 7. Phản hồi người dùng

User @l2dy gặp block khi dùng model cụ thể. Error message rõ ràng từ provider. Cần fix để unblock use case này.

## 8. Backlog & Roadmap

Dựa trên issue:
- Priority: Medium (compatibility fix)
- Scope: Parameter handling logic
- Impact: Mở rộng provider support

Chưa có roadmap công khai trong dữ liệu.

---

**Kết luận**: Ngày yên tĩnh. Focus vào API compatibility. Issue đơn lẻ nhưng quan trọng cho multi-provider support.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-24

## 1. Tóm tắt hôm nay

Ngày bảo trì dependencies. 5 PR từ dependabot cập nhật thư viện (certifi, DOMPurify, Storybook). Không có issue mới, không có release, không có PR từ contributor thật. Dự án ở trạng thái yên ắng.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Dependencies chính được cập nhật:**

- **certifi** (Python): 2026.7.22 → 2026.10.19 (#8157)
  - Test e2e infrastructure
  - Root certificate store update
  
- **DOMPurify** (JS): 3.4.12 → 3.4.17 (#8155)
  - Frontend security sanitizer
  - PR cũ hơn (#8149, 3.4.16) đã đóng, thay bằng bản mới hơn
  
- **Storybook ecosystem** (JS):
  - Core: 10.5.7 → 10.6.2 (#8158)
  - addon-vitest: 10.5.7 → 10.6.2 (#8156)
  - Dev tooling cho component development

**Xu hướng:** Dự án duy trì hygiene tốt, bot chạy đều. Không có feature work hoặc bugfix. Frontend sử dụng Storybook + Vitest cho UI development. Backend Python có e2e testing setup.

## 4. Điểm nổi bật cộng đồng

Không có. Tất cả PR đều 0 upvote, 0 comment. Không có human interaction.

## 5. Ổn định & Bugs

Không có bug report. Certifi update thường liên quan đến certificate trust store (có thể do expired roots hoặc security incidents). DOMPurify update thường là XSS prevention patches.

## 6. Yêu cầu tính năng

Không có.

## 7. Phản hồi người dùng

Không có tương tác từ user. Repo có vẻ là internal hoặc early stage với ít external contributor.

## 8. Backlog & Roadmap

Không có thông tin. PR đều là maintenance, không thấy discussion về direction.

---

**Đánh giá:** Ngày rất yên. Dự án healthy về dependency management nhưng thiếu signal về tính năng mới hoặc adoption. Cần xem commit history để biết actual development activity (có thể merge trực tiếp vào main, không qua PR).

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw ngày 2026-10-24

## 📊 Tóm tắt hôm nay

Không có release mới. Đóng 7 issues, đóng 5 PRs. Tập trung vào **ổn định** (fix UI bugs, platform test failures, dependency licensing) và **infrastructure refactor** (daemon desktop, channel plugins, ReMe 0.4.2 integration).

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

### PRs đã merge (đóng)

**Ổn định và bug fixes:**

- **#8393** – E2E test re-anchor: 13 test cases bị fail vì stale anchors, missing waits, tautological assertions. Zero product bugs. Đã fix.
- **#8390** – Desktop log rotation: 2 file handles cùng mở `desktop.log` → race condition khi rotate. Merge thành 1 handle shared. 
- **#8387** – Hub gateway timeout: tăng từ 120s → 600s, thêm UI setting "Gateway timeout (seconds)". Fix #8372.
- **#8366** – Loại bỏ `html2text` (GPL-3.0 incompatible với Apache-2.0). Thay bằng stdlib `html.parser`.
- **#8299** – Retry without video: khi provider reject video input → wedge session. Giờ fallback bỏ video, retry.
- **#8191** – OpenAI-compatible input limits: đọc `max_input_tokens` từ metadata, cap Qwen catalogs đúng.

**Bug fixes đóng issues:**

- **#8399** → fix #8392 – Hub model policy draft bị overwrite khi refresh. Giờ preserve draft.
- **#8383**, **#8381**, **#8382** – Platform-neutral test fixes (windows/macos leg failures). Test-side defects, không phải product bugs.

### PRs đang review (open)

**Lớn, nhiều bình luận (community attention):**

- **#7874** (XXXL) – Redesign PawApp SDK & control plane: shared Host contract, scoped task identity, permissions, retries. **19 bình luận** từ tháng 9. Chưa merge.
- **#8373** (XXXL) – **Desktop daemon**: move backend ownership sang detached daemon → multiple windows độc lập, coordinated updates. **Đề xuất kiến trúc lớn**, mới 1 ngày nhưng phức tạp.
- **#8347** (XXL) – Integrate ReMe 0.4.2: decision compaction, images, tags. Auto-Dream flow. **Từ 2026-10-20**, chưa có maintainer review.
- **#8187** (XXXL) – Extract channels into plugins với subprocess isolation. **Từ 2026-10-12**. Refactor lớn.
- **#8357** (XXXL) – Creator 2.0.3 release: skills, narration, scratch, script import. **Từ 2026-10-21**. Chờ merge.

**Nổi bật khác:**

- **#8318** (M) – `/steer` command: cho user correct agent mid-execution. Fix #1775.
- **#8287** (L) – Console thinking slider fill fix + save stability.
- **#7880** (XL) – Escalation-only tool policy hooks: plugin pre-call policy.
- **#7973** (M) – Recover từ rejected media URLs (400 "URL not valid").
- **#7211** (L) – Injected context không persist: `HookContext.inject_context()` chỉ cho current call. Fix #6360, #6358. **Từ tháng 8**, chưa merge.

**Small fixes:**

- **#8397**, **#8395** – Plugin download error handling, request body overflow recovery.
- **#8398** – Desktop cold start speedup + frozen WebView recovery.
- **#8403**, **#8402**, **#8401**, **#8400** – Docs anchor fixes, skill validator false positive.
- **#8345** – Plugin install không abort khi `invalidate_caches()` fails.
- **#8124** – Route content inspection errors to fallback.

## ⭐ Điểm nổi bật cộng đồng

**Issues nhiều attention:**

- **#8071** (open, 8 bình luận) – Plugin theme extension: plugin muốn deep theme control (semantic tokens), không chỉ `colorPrimary`. **Từ tháng 10**, chưa có response.
- **#8343** (open, 2 bình luận) – DingTalk final reply bị drop khi `sessionWebhook` expires. Không có Open API fallback. **Critical UX bug**.
- **#8394** (open) – XiaoYi channel: không emit status frame khi long turn → client blank nhiều phút. WS drop silently.
- **#8406** (open) – QQ channel enabled flag silently reset to false, no warning.

**Issues đã đóng:**

- **#8396** → đã fix #8399 – Delete current conversation hiện error "Chat not found". UX polish.
- **#8368** – Delete selected conversation → 404 error. Đã fix.
- **#8284** – Wheel scrolling stuck: transcript height re-estimation snap view back. Đã fix.
- **#8298** → đã fix #8299 – Video `send_file_to_user` wedge session: 422 unknown variant `video_url`. Đã fix.
- **#8372** → đã fix #8387 – Hub gateway timeout quá ngắn (120s), file processing timeout.
- **#8392** → đã fix #8399 – Hub local model config hiển thị sai.

## 🐛 Ổn định & Bugs

**Đã fix:**

- Desktop log rotation race condition (#8390)
- Hub gateway timeout & draft preservation (#8387, #8399)
- Video input wedge (#8299)
- GPL dependency licensing (#8366)
- E2E test stability (#8393)
- Platform test failures windows/macos (#8383, #8381, #8382)
- Media URL rejection recovery (#7973, partial)
- Request body overflow (#8395, open PR)

**Còn mở (critical):**

- **DingTalk final reply drop** (#8343) – không có Open API fallback khi webhook expire
- **XiaoYi blank client** (#8394) – long turn không emit status frame, WS drop
- **QQ channel flag reset** (#8406) – silent reset to false
- **Wheel scroll stuck** (#8284, closed nhưng có thể chưa verify đầy đủ)

**Test coverage:**

13 test cases re-anchored (#8393). 0 product bugs từ test failures → test suite drift, giờ đã sync.

## 🎯 Yêu cầu tính năng

**Mở:**

- **#8071** – Plugin theme extension (semantic tokens)
- **#8404** – Office file preview (docx/xlsx/pptx) trong file drawer. Hiện chỉ có image/PDF/MD/HTML/CSV.
- **#1775** → PR #8318 – `/steer` command: mid-execution guidance

**Merged/trong PR:**

- `/steer` (#8318, open)
- Escalation-only tool hooks (#7880, open)
- Desktop daemon (#8373, open)
- PawApp redesign (#7874, open)
- ReMe 0.4.2 integration (#8347, open)
- Channel plugins (#8187, open)
- Offline Docker image with Office/PDF toolchain (#8328, open)

## 💬 Phản hồi người dùng

**Pain points:**

- **Long task timeout**: file processing thường vượt 120s (#8372) → đã tăng lên 600s, thêm UI setting
- **Channel UX**: DingTalk drop reply (#8343), XiaoYi blank screen (#8394) → critical cho production use
- **Desktop cold start**: slow (#8398 open PR) → blocking
- **Delete conversation UX**: error message hiển thị (#8396, #8368) → polish
- **Plugin theme control**: limited (#8071) → extensibility request

**Positive:**

Không có explicit positive feedback trong issues/PRs hôm nay. Tập trung vào bug reports.

## 🗺️ Backlog & Roadmap

**Infrastructure refactor (in-flight, XXXL size):**

- Desktop daemon (#8373)
- PawApp SDK redesign (#7874)
- Channel plugins extraction (#8187)
- ReMe 0.4.2 integration (#8347)

**Creator 2.0.3 release** (#8357) – skills, narration, scratch. Chờ merge.

**Stability track:**

- Channel reliability (DingTalk, XiaoYi, QQ) – 3 open issues
- Desktop cold start (#8398)
- Test coverage gaps đã fill (#8393)

**Feature requests chờ triage:**

- Plugin theme extension (#8071, 8 bình luận, 3 tuần)
- Office preview (#8404, mới)

**Licensing cleanup:**

GPL dependency removed (#8366). Project Apache-2.0 clean.

---

**Xu hướng**: Dự án shift từ feature velocity sang **stability + refactoring**. Desktop daemon, channel plugins, PawApp redesign đều là architectural work. Bug fix volume cao (7 closed issues, 5 merged PRs). Community attention tập trung vào **channel reliability** (DingTalk, XiaoYi, QQ) và **plugin extensibility** (theme, tool hooks).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*