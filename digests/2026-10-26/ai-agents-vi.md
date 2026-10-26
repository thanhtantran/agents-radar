# Bản tin Hệ sinh thái Hermes Agent 2026-10-26

> Issues: 112 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-26 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-26

## 📊 Tóm tắt hôm nay

Không có release mới. Dự án tập trung vào sửa lỗi sau unified gateway merge (#106742) - 220 bình luận trên issue tracking. PRs chính: sửa lỗi multiplexed gateway, cải thiện Webapp/Desktop, tăng cường bảo mật config backend.

## 🚀 Releases

Không có.

## 🔨 Tiến độ dự án

### PRs quan trọng đang mở:

**Sửa lỗi multiplexed gateway (#106742 post-merge):**
- #144708: Chat sau /handoff giữ được kết nối từ Desktop/Webapp
- #144662: Gateway chờ profile khởi động thay vì trả internal error
- #142846: Persist @image refs cho unified runtime inbound turns

**Bảo mật & Config:**
- #134369: Remote config backend (HERMES_CONFIG_BACKEND=remote) - salvage từ #122509
- #134362: ConfigBackend seam - route mọi config.yaml read/write qua module trung tâm
- #144752: Plugin-host profile extraction không import code từ launch dir
- #144684: Opt-in prepared compaction (compression.prepare_ahead: true)

**Desktop/Webapp cải thiện:**
- #144680: Không route profile mà gateway không serve
- #144678: Giữ folder prefs theo đúng profile owner
- #144659: Download ticket có thể retry
- #144664: Báo browser-blocked pop-out ngay lập tức

**Cron & Automation:**
- #82857: `hermes recipe` - xuất/chia sẻ setup bundle (cron + MCP + skills)
- #93415: `/mute` - im lặng chat ở harness level đến khi `/unmute`

**CLI/UX:**
- #117752: Desktop composer mode - Enter-to-send vs multiline-first
- #144767: `hermes sessions` fail exit 1 thay vì 0

### Xu hướng:
Ổn định sau unified gateway (Oct 14). Focus: multiplexed gateway reliability, bảo mật config, cải thiện Webapp UX.

## 💬 Điểm nổi bật cộng đồng

**Issue hot nhất:**

1. **#134889 (220 comments, P0)**: Tracking unified gateway post-merge fixes - gateway owns every local session
2. **#77111 (28 comments)**: RFC cho RealtimeVoiceProvider ABC - 4 duplex-voice PRs cần interface chung
3. **#143547 (23 comments)**: Unified gateway open problems trên main
4. **#38519 (19 comments, 31 👍)**: Feature request - Hermes Desktop frontend-only install (agent ở máy khác)

**Vấn đề người dùng quan tâm:**
- Gateway multiplexing stability
- Desktop frontend-only deployment
- Real-time voice provider interface
- Session management sau unified runtime

## 🐛 Ổn định & Bugs

**P0/P1 Critical:**
- #134889: Post-merge unified gateway tracking (đang được fix liên tục)

**P2 Priority:**
- #143547: Multiplexed gateway auth/cron/Windows issues
- #143426: Linux Desktop opacity 6% mặc định - setOpacity + Settings ẩn control
- #68128: WhatsApp bridge WinError 5 trong no-breakaway job objects
- #130889: Windows gateway wedge - ProcessRegistry._lock block stream.close()
- #125695: Một model_entitlement cooldown disable hết auxiliary Codex tasks 1 năm
- #127105: Background process notifications deliver như user messages
- #139303: Bot Mode DM - authority_delivery() gọi asyncio.run() từ sync handler
- #138644: Một timeout pre_tool_call skip ALL tool calls nhiều giờ

**Bugs sửa hôm nay:**
- #144756: Hook matcher là list chỉ fire cho listed tools
- #144757: Scratch prune không disown gateway sau clock change
- #144755: skill_manage delete recoverable - relocate đến curator archive

## ✨ Yêu cầu tính năng

**Đã có PR:**
- #82857: `hermes recipe` - shareable setup bundles
- #117752: Desktop Enter-to-send vs multiline-first mode
- #134369: Remote config backend
- #144684: Prepared compaction opt-in

**Open issues:**
- #77111: RealtimeVoiceProvider ABC
- #38519 (31 👍): Desktop frontend-only install
- #80300: API server X-Hermes-User header cho multi-user identity
- #63715: Freeze environment hints cho DeepSeek prefix caching cross-session

## 👥 Phản hồi người dùng

**Tích cực:**
- Gateway restart handling improvements được merge liên tục
- Config backend seam tốt cho enterprise deployment

**Vấn đề:**
- Linux Desktop opacity 6% mặc định (#143426, 11 👍) - ảnh hưởng UX nghiêm trọng
- Windows gateway stability (#130889, #68128) - nhiều edge cases
- Desktop frontend-only deployment (#38519) - cần cho distributed setup
- Update process (#136159, #138903) - corrupted dashboard respawn argv

## 📋 Backlog & Roadmap

**Đang xử lý:**
- Unified gateway stability (tracking #134889) - highest priority
- Desktop/Webapp UX improvements (multiple PRs merged daily)
- Remote config backend (#134369) - đang review
- Security hardening (config backend, plugin isolation)

**Next steps (từ PRs/issues):**
- RealtimeVoiceProvider ABC (#77111) - cần design decision
- Desktop frontend-only install (#38519) - needs-decision label
- API server multi-user identity (#80300)
- Prepared compaction (#144684) - ready to merge

**Technical debt:**
- Phone redaction corrupts managed runtime paths (#123316)
- Session list rescans mọi lineage receipt (#143833) - perf issue
- Tool Search bridge stale after MCP changes (#72560)

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-26

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **ổn định sau growth spurt**. 8 dự án active cho thấy 3 tier rõ:

**Tier 1 - Production-grade**: Hermes Agent, OpenClaw
- Focus: stability post major-feature merges
- Volume: 500 PRs, 100+ issues
- Pattern: unified gateway, multi-channel reliability, security hardening

**Tier 2 - Active development**: NanoBot, Zeroclaw, PicoClaw, NanoClaw, QwenPaw
- Focus: feature expansion + bug fixes
- Volume: 5-50 PRs, 2-92 issues
- Pattern: provider diversity, UX polish, extension hooks

**Tier 3 - Dormant**: IronClaw, NullClaw
- Không activity hoặc chỉ automated PRs

**Xu hướng chung**:
- Unified runtime/gateway architecture đang thắng (Hermes #106742, OpenClaw gateway refactor)
- SQLite WAL checkpoint bug plague nhiều dự án (OpenClaw #143524, #164294)
- Provider ecosystem wars: mọi dự án đều add providers mới (Runcrate, Kimi, DeepSeek, Databricks)
- Security tightening: scoped access, session isolation (Zeroclaw #9746, NanoClaw #4222)

## 2. 🔢 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | PRs merged 24h | Mức độ tương tác | Trạng thái |
|-------|--------|-----|----------|----------------|------------------|------------|
| **Hermes Agent** | 112 | 500 | 0 | ~8 | 220 comments trên #134889 | 🟢 Active - post-merge stability |
| **OpenClaw** | 92 | 500 | 0 | ~19 (8 perf, 11 UI) | 137 comments trên #143524 | 🟡 Active - WAL crisis mode |
| **NanoBot** | 8 | 43 | 0 | 19 | 11 comments highest | 🟢 Active - WebUI polish wave |
| **Zeroclaw** | 2 | 50 | 0 | ~20 | 0 comments visible | 🟢 Active - security sprint |
| **PicoClaw** | 2 | 5 | 0 | 2 | 0 comments | 🔴 Maintenance - backlog cleanup |
| **NanoClaw** | 1 | 24 | 0 | 24 | 0 comments | 🟢 Active - extension boom |
| **QwenPaw** | 8 | 8 | 0 | ~5 | 3 comments | 🟢 Active - isolation push |
| **IronClaw** | 0 | 7 | 0 | 0 | 0 comments | 🔴 Dormant - dependabot only |
| **NullClaw** | 0 | 0 | 0 | 0 | - | 🔴 Dormant |

**Observations**:
- Hermes + OpenClaw dẫn đầu về scale (500 PRs cả hai)
- NanoBot + NanoClaw + Zeroclaw high velocity (~20 PRs/day)
- Community engagement tập trung Hermes (#134889 P0 tracking) + OpenClaw (#143524 WAL)
- 2/9 dự án dormant → consolidation trend

## 3. 🎯 Vị thế Hermes Agent

### Vai trò: **Reference implementation + stability anchor**

**Thế mạnh**:
1. **Architecture leadership**: Unified gateway (Oct 14 merge) đang được others học hỏi
2. **Community size**: 220 comments tracking issue → largest engaged base
3. **Systematic approach**: 
   - Config backend seam (#134362) → enterprise-ready
   - Remote config (#134369) → distributed deployment
   - Recipe export (#82857) → onboarding/sharing standard
4. **Multi-platform mature**: Desktop/Webapp/CLI với multiplexed gateway

**Áp lực**:
1. **Post-merge instability**: 220-comment tracking issue (#134889) về gateway bugs
2. **Windows reliability**: nhiều wedge issues (#130889, #68128, #125695)
3. **Desktop UX**: opacity 6% default (#143426, 11 👍) gây pain nghiêm trọng
4. **Competing standards**: OpenClaw có scale tương đương, có thể fragment ecosystem

**So với others**:
- **vs OpenClaw**: cùng tier, Hermes lead về multiplexing design, OpenClaw lead về WAL pain exposure (frontrunner curse)
- **vs NanoBot**: Hermes enterprise-focused (config backend, remote), NanoBot user-focused (WebUI polish, theme transitions)
- **vs Zeroclaw**: Hermes broad platform, Zeroclaw security-first (scoped principals, RPC consolidation)
- **vs NanoClaw**: Hermes monolith → platform, NanoClaw born pluggable (21 PR từ 2 contributors về hooks)

**Strategic position**: Hermes = Apache của AI agents. Stable, feature-complete, nhưng cần speed up bug fixes để giữ leadership. Desktop UX pain (#143426) đang threat adoption.

## 4. 🛠️ Hướng kỹ thuật chung

### Converging patterns (4+ dự án implement):

**1. Unified gateway/runtime architecture**
- Hermes: unified gateway owns mọi local session (#106742)
- OpenClaw: gateway state DB, worker isolates
- QwenPaw: channel subprocess isolation (#8187)
- **Why**: single point of control cho auth, session lifecycle, resource limits

**2. SQLite WAL checkpoint plague**
- OpenClaw: 3 P0/P1 issues (#143524, #164294, #172091), WAL phình GB
- Hermes: không explicit mention nhưng có gateway restart handling improvements
- Pattern: `wal_autocheckpoint=1000` fail, checkpoint never complete, Windows worst
- **Solution**: manual offline `PRAGMA wal_checkpoint(TRUNCATE)`, shared-state DB redesign

**3. Provider ecosystem expansion**
- PicoClaw: Runcrate (GPU giá rẻ)
- NanoBot: Kimi K3.1 Pro, Agnes AI fixes
- QwenPaw: DeepSeek Search với authority tier
- OpenClaw: Databricks Unity Gateway (#155634)
- **Trend**: multi-provider resilience, price competition, specialized capabilities (reasoning, search)

**4. Context management evolution**
- Hermes: prepared compaction opt-in (#144684)
- Zeroclaw: context compression thay trimming (#12038) - summarize old turns
- OpenClaw: context budget oversized tool results (#6404)
- **From**: drop old → **To**: compress/summarize → retain history trong limited window

**5. Security hardening - scoped access**
- Zeroclaw: per-agent tool ownership (#9746), scoped principals gate logs (#11326)
- NanoClaw: fresh session per agent-to-agent (#4222)
- Hermes: plugin-host profile extraction (#144752), config backend seam
- **Driver**: multi-tenant deployments, enterprise compliance

**6. Session isolation + recovery**
- Hermes: chat sau `/handoff` giữ connection (#144708), gateway waits profile startup (#144662)
- OpenClaw: subagent completion lost after gateway crash (#182043), requester stuck (#143334)
- QwenPaw: approval dialog retry cancel (#8416), draft scope per-conversation (#8362)
- **Pain point**: session state consistency across restarts/handoffs

### Diverging approaches:

**Architecture philosophy**:
- Hermes/OpenClaw: monolith → modular in-process
- QwenPaw: subprocess isolation per channel (#8187)
- NanoClaw: plugin hooks from day 1 (21 extension PRs)

**UX priority**:
- NanoBot: WebUI obsession (11/19 PRs về theme, appearance, gallery)
- Hermes: Desktop composer mode (#117752), enter-to-send vs multiline
- Others: CLI/API first

**Deployment target**:
- Hermes: distributed (remote config backend)
- Zeroclaw: CLI-only build CI (#11976)
- NanoBot: self-hosted focus

## 5. 🎨 Điểm khác biệt

### Chiến lược product:

| Aspect | Hermes | OpenClaw | NanoBot | Zeroclaw | NanoClaw |
|--------|--------|----------|---------|----------|----------|
| **Target user** | Enterprise dev | Power user | End user (self-host) | Security-conscious | Platform builders |
| **Core strength** | Multi-platform mature | Feature breadth | WebUI polish | RPC consolidation | Extensibility hooks |
| **Differentiation** | Remote config, recipes | Swarm/population | Theme customization | Scoped principals | Registry pattern cho mọi thứ |
| **Deployment** | Distributed | Worker isolates | Single-instance | CLI-first, gateway optional | Container-native |

### Tính năng độc nhất:

**Hermes**:
- Recipe export/import (#82857) - shareable setup bundles (cron + MCP + skills)
- `/mute` command (#93415) - im lặng chat ở harness level
- Desktop frontend-only install request (#38519, 31 👍) - agent ở máy khác

**OpenClaw**:
- Adaptive test-time compute (#158068) - Swarm populations
- Skill Workshop (#150250) - learning coverage validation
- Conversation stall watcher (#180497) - heartbeat wake stalled conversations riêng

**NanoBot**:
- Theme transition với crossfade 200ms + animated sun/moon (#6450, #6459)
- Appearance settings với reading size custom (#6456)
- Edit+resend message in-place (#6323) - keep prefix, replace suffix

**Zeroclaw**:
- Context compression (#12038) - summarize thay drop
- Configurable ack reactions (#11754) - 👀 receipt, ✅/❌ done custom
- Stream reasoning vào drafts (#11744) - real-time model thinking

**NanoClaw**:
- Registry cho custom task fields (#3921) - extend task metadata không fork
- Pluggable scheduler admission (#3903) - container cap policy
- Provider wrapper seam (#3925) - retry/fallback hooks

**QwenPaw**:
- `/steer` command (#8318) - inject guidance mid-execution không stop
- Shell self-kill guard (#8419) - prevent `sudo pkill python` accidents
- DeepSeek Search provider với publication date + authority (#8314)

### Community dynamics:

**Hermes**: Largest engaged base (220-comment issue), nhiều feature requests có 👍 votes (Desktop frontend-only 31 👍). Mix enterprise users + power users.

**OpenClaw**: High pain visibility (137 comments WAL issue), technical community report detailed repro. Windows user base large (nhiều platform-specific bugs).

**NanoBot**: Small, focused. Contributors responsive (19 PRs merged same day). Ít public discussion → review offline hoặc private channels.

**Zeroclaw**: Zero public comments trong data. Maintainer-driven. Security-conscious changes (scoped principals, RPC) không có community pushback → trusted leadership hoặc small user base.

**NanoClaw**: 21/24 PR từ 2 non-core contributors (@barnuri, @drsmk238) về extension hooks → codebase modular đủ cho contribute. Community build platform, không chỉ dùng.

**PicoClaw**: Dormant community. 2 bugs P0/P1 đóng stale chưa fix (#3422 Telegram hang, #3423 cron silent fail) → không có users complain loud enough để keep open.

**QwenPaw**: Technical contributors với detailed repro (stack trace Chinese). Bugs edge-case (encoding, shell guards) → user base sophisticated.

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Thang đo (5 tier):

**🟢 Mature** - self-sustaining, contributors external, roadmap public, governance clear

**🟡 Growing** - active, maintainer-led nhưng có external contributions, ad-hoc governance

**🟠 Emerging** - active nhưng small team, few external contributors, roadmap implicit

**🔴 Early** - bootstrap phase, single maintainer, no external contributions yet

**⚫ Dormant** - no activity hoặc maintenance-only

### Đánh giá:

**Hermes Agent** 🟡 **Growing → Mature transition**
- ✅ 500 PRs, 112 issues, high engagement (220-comment tracking)
- ✅ Feature requests có votes (Desktop frontend-only 31 👍)
- ✅ Multi-stakeholder (enterprise, power users, Desktop users)
- ⚠️ Chưa thấy external major contributions trong data
- ⚠️ Roadmap implicit (infer từ PRs/issues)
- **Next milestone**: Public roadmap, contributor guidelines, external maintainers

**OpenClaw** 🟡 **Growing**
- ✅ 500 PRs, 92 issues, pain visible (137-comment WAL)
- ✅ Community-driven provider (#155634 Databricks)
- ✅ Detailed bug reports với repro
- ⚠️ Maintainer-driven fixes (8 perf PRs cùng author @steipete)
- ⚠️ Stale issue cleanup aggressive (đóng bugs chưa fix)
- **Bottleneck**: WAL crisis consuming bandwidth, feature development chậm

**NanoBot** 🟠 **Emerging**
- ✅ 43 PRs, fast merge cycle (19 PRs/day)
- ✅ External contributions responsive
- ⚠️ Small issue count (8) → few users hoặc low reporting
- ⚠️ No public discussion (0 comments most PRs)
- ⚠️ Linear board private (NAN-* references)
- **Strength**: tight feedback loop, **Weakness**: small base

**Zeroclaw** 🟠 **Emerging → Growing**
- ✅ 50 PRs, security-first maturity
- ✅ Systematic approach (RPC consolidation, scoped access)
- ⚠️ Zero public comments → closed development hoặc very small
- ⚠️ No feature requests from users (maintainer-driven)
- **Signal**: technical excellence, **Question**: user base size?

**NanoClaw** 🟡 **Growing (extensibility-focused)**
- ✅ 21/24 PR external (2 contributors) về hooks/extensibility
- ✅ Codebase modular → contribute không cần deep context
- ⚠️ No public discussion (0 comments)
- ⚠️ Small issue base (1 issue)
- **Unique**: platform-first mindset attract builders, không chỉ users

**QwenPaw** 🟠 **Emerging**
- ✅ 8 PRs, technical contributors với detailed reports
- ✅ Bugs edge-case (encoding, guards) → sophisticated users
- ⚠️ Small scale (8 issues, 8 PRs)
- ⚠️ Ít public engagement
- **Niche**: Chinese-speaking technical audience (Volcano AgentPlan report)

**PicoClaw** 🔴 **Early → Dormant risk**
- ⚠️ 2 issues, 5 PRs, backlog cleanup mode
- ⚠️ P0/P1 bugs đóng stale chưa fix
- ⚠️ No community pushback khi đóng bugs
- **Risk**: no active users hoặc migration elsewhere

**IronClaw** ⚫ **Dormant**
- ❌ 0 issues, 7 PRs (tất cả dependabot)
- ❌ No human commits trong data
- ❌ Dependency PRs tồn 2 tháng chưa merge
- **Status**: abandoned hoặc develop private

**NullClaw** ⚫ **Dormant**
- ❌ No activity

### Insight tổng hợp:

**Healthy signals**:
- Hermes, OpenClaw: large scale + engaged community
- NanoClaw: extensibility attract builders (21 external PRs)
- NanoBot: fast iteration, responsive maintainers

**Warning signals**:
- OpenClaw: WAL crisis consuming bandwidth → feature development stall
- PicoClaw: đóng bugs stale chưa fix → no users complain
- IronClaw: dependabot-only → abandoned?
- Zeroclaw, NanoBot, QwenPaw: zero public comments → closed development hoặc very small

**Maturity gap**: No project ở tier Mature (self-sustaining). Tất cả maintainer-dependent. Hermes closest với 220-comment tracking + 31 👍 feature request.

## 7. 🔮 Tín hiệu xu hướng

### Converging future (6-12 tháng):

**1. Unified runtime/gateway wins**
- Hermes đã ship (Oct 14), OpenClaw đang refactor, QwenPaw isolate channels
- **Prediction**: 2027 Q1, mọi production agent dùng gateway pattern
- **Why**: single control plane cho auth, lifecycle, limits → enterprise requirement

**2. SQLite WAL → alternative storage**
- OpenClaw WAL crisis (#143524) expose fundamental limit
- Checkpoint fail pattern → không fix được với tuning
- **Prediction**: migration sang managed DB (Postgres/DynamoDB) hoặc embedded alternative (DuckDB, RocksDB)
- **Timeline**: 2027 Q2 sau khi WAL pain reach critical mass

**3. Context management = summarization, không phải trimming**
- Zeroclaw ship compression (#12038), Hermes opt-in compaction
- **Prediction**: 2027, LLM-based summarization standard cho old turns
- **Driver**: longer conversations, cheaper inference (summarize 1x vs reprocess every turn)

**4. Provider ecosystem consolidation**
- Mọi dự án add providers (Runcrate, Kimi, DeepSeek, Databricks)
- Pattern: OpenAI-compatible endpoint + model prefix
- **Prediction**: standard provider plugin protocol emerge (giống MCP nhưng cho inference)
- **Winner**: dự án nào ship provider SDK first (Hermes recipes? NanoClaw registry?)

**5. Security = scoped execution default**
- Zeroclaw lead (#9746 per-agent tools, #11326 scoped logs)
- Hermes follow (config backend seam, plugin isolation)
- **Prediction**: 2027, multi-tenant/scoped-by-default thắng single-user full-access
- **Driver**: enterprise adoption, compliance (SOC2, ISO27001)

### Diverging futures:

**Architecture**:
- **Monolith in-process** (Hermes, OpenClaw) vs **subprocess isolation** (QwenPaw #8187)
- **Prediction**: subprocess wins long-term (security, fault isolation) nhưng perf overhead delay adoption → 2028+

**Deployment**:
- **Distributed/remote config** (Hermes) vs **CLI-only** (Zeroclaw) vs **container-native** (NanoClaw)
- **Prediction**: no single winner. Enterprise = distributed, power users = CLI, platform builders = containers. Market segment.

**UX philosophy**:
- **WebUI-first** (NanoBot) vs **CLI/API-first** (others)
- **Prediction**: CLI remain developer preference, WebUI grow cho non-technical users. Two parallel tracks.

### Wild cards:

**1. Hermes Desktop frontend-only (#38519, 31 👍)**
- Nếu ship → game changer cho distributed deployment
- Frontend chạy local, agent ở datacenter/GPU cluster
- **Impact**: explode adoption ở enterprises với compliance requirements (data không leave DC)

**2. OpenClaw WAL crisis resolution**
- Nếu fix elegant (không migrate DB) → pattern cho others
- Nếu painful migration → accelerate alternative storage adoption across ecosystem
- **Timeline**: resolve before 2027 Q1 hoặc risk user churn

**3. NanoClaw extensibility model**
- 21 external PRs về hooks trong single snapshot → community want pluggable
- Nếu registry pattern mature → standard cho AI agent extensibility
- **Competition**: Hermes recipes vs NanoClaw registries. Recipes = bundle sharing, Registries = runtime plugins. Different use cases, có thể coexist.

**4. Real-time voice**
- Hermes RFC #77111 (RealtimeVoiceProvider ABC), 4 duplex-voice PRs pending
- OpenClaw no mention, NanoClaw voice replies (#3938)
- **Prediction**: real-time voice = next major UX unlock sau chat. Hermes lead nhưng chưa ship. 2027 Q2-Q3 battleground.

**5. MCP 2.0 adoption**
- Zeroclaw tracking (#119294), spec released 2026-07-28, SDK chưa migrate
- **Prediction**: 2027 Q1 SDK catch up, agents migrate. Standard tool protocol emerge.
- **Risk**: fragmentation nếu providers ship incompatible extensions

### Consolidation pressure:

**Số dự án active giảm từ 9 → 6-7**:
- IronClaw, NullClaw đã dormant
- PicoClaw risk (bugs stale, no community)
- **Prediction**: 2027, 3-4 leaders (Hermes, OpenClaw, và 1-2 niche winners), rest merge hoặc archived

**Market structure**:
- **Tier 1**: Hermes (enterprise), OpenClaw (power users)
- **Tier 2 niche**: NanoClaw (platform builders), Zeroclaw (security-first), NanoBot (WebUI-focused)
- **Long tail**: specialized forks

### Timing predictions:

**2027 Q1**:
- Unified gateway standard across top 3 projects
- SQLite WAL migration start (OpenClaw lead)
- MCP 2.0 SDK mature, agents migrate
- Hermes Desktop frontend-only ship (if prioritized)

**2027 Q2**:
- Context summarization default (không phải opt-in)
- Real-time voice production-ready (Hermes lead)
- Provider plugin protocol draft (community-driven)

**2027 Q3-Q4**:
- Subprocess isolation production-ready (QwenPaw pattern proven)
- Managed DB replace SQLite ở enterprise deployments
- Multi-tenant scoped execution default

**2028+**:
- AI agent platform consolidation (3-4 survivors)
- Standard protocols: provider plugins, tool registry, context management
- Enterprise AI agent = commodity infrastructure

---

## 🎓 Kết luận chiến lược

### Cho Hermes Agent:

**Defend leadership**:
1. **Fix Desktop UX pain** (#143426 opacity 6%) ASAP → bleeding adoption
2. **Ship Desktop frontend-only** (#38519, 31 👍) → unlock enterprise distributed
3. **Stabilize gateway** (#134889 tracking) → trust erosion nếu kéo dài
4. **Real-time voice** (#77111) → next UX unlock, ship trước competitors

**Extend lead**:
1. **Recipe ecosystem** (#82857) → network effects (sharing/discovery)
2. **Remote config backend** (#134369) → enterprise moat
3. **MCP 2.0 early adoption** → standard-setter position

**Watch threats**:
1. OpenClaw scale parity → could fragment community
2. NanoClaw extensibility model → attract platform builders
3. Zeroclaw security-first → compliance-driven enterprises

### Cho ecosystem:

**Opportunities**:
- Standard protocols (providers, tools, context) → interoperability
- SQLite → managed DB migration → performance unlock
- Subprocess isolation → security/reliability improvement

**Risks**:
- Fragmentation (9 projects, no coordination)
- WAL crisis spread (OpenClaw pain → others hit same wall)
- MCP 2.0 adoption slow → tool ecosystem fragmented

**Wildcards**:
- Real-time voice adoption speed
- Enterprise compliance requirements accelerate scoped execution
- LLM cost collapse enable aggressive summarization strategies

Hệ sinh thái đang chuyển từ **feature explosion** (2025-2026) sang **consolidation + productization** (2027). Winners = stability + enterprise features + community trust. Hermes positioned well nhưng execution critical trong 6 tháng tới.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-10-26

## 1. Tóm tắt hôm nay

Không có release mới. Dự án tập trung xử lý nghẽn WAL SQLite (3 issue P0/P1 về checkpoint bị chặn), tối ưu performance (7 PR giảm allocation/copy redundant), và sửa bug giao tiếp subagent. Cộng đồng report nhiều vấn đề session stuck và memory leak trên Windows.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Tối ưu performance** (8 PR từ @steipete):
- #184040: Xóa catalog provider copies dư
- #184050: Giảm allocation decode model-context  
- #184081: Bỏ regex normalization lặp
- #184054: Xóa cron/config object copies
- #184082: Cache transcript path resolution
- #184071: Reuse actor admission entries
- #184045: Xóa session result copies dư
- #184074: Xóa Slack/Telegram object copies

→ Chiến dịch tối ưu allocation/CPU, không đổi hành vi bên ngoài. Tất cả size S-M, đánh giá gold shrimp/diamond lobster.

**Bug fixes critical**:
- #183987: Cron trên CLI backend không đọc được automations tool của chính nó
- #184069: Terminal subagent kết quả không gửi được sau Gateway restart + session reuse
- #184062: Codex terminal tool release làm mất steering input đã acknowledge

**UI/UX**:
- #183769: Standing grants biến mất khi approval history lỗi
- #183165: Tool Search mode `tools` leak XML thô khi call deferred tool

**Infrastructure**:
- #155634: Thêm Databricks Unity Gateway provider (size XL, nhiều comment)
- #176548: Gateway startup đợi offline maintenance xong thay vì restart loop

## 4. Điểm nổi bật cộng đồng

**Issue hot nhất** (theo comment count):

1. **#143524** (137 bình luận, P0): Agent SQLite WAL phình 1.4-2.8 GB trong vài ngày dù `wal_autocheckpoint=1000`, chặn Gateway startup trên Windows 2026.9.2/9.3. 
   - Root cause: checkpoint không bao giờ hoàn thành
   - Workaround: manual offline `wal_checkpoint(TRUNCATE)`
   - Tương tự: #164294 (34 comments), #172091 (15 comments), #171793 (3 comments, closed)

2. **#162585** (12 bình luận, P2): Plugin source-capture trên Windows re-materialize vô hạn node_modules của chính nó, npm tree lớn phình 290MB → 612MB+/24 phút, Gateway không bao giờ healthy.

3. **#134993** (11 comments, P1): Gateway peg 1 CPU core (busy loop filesystem discovery) sau upgrade 2026.8.1 với skill/agent fleet lớn.

4. **#153426** (11 comments, P0, 👍2): `MEMORY.md`/`USER.md` bị loại khỏi bootstrap injection vĩnh viễn khi provenance thành "untrusted" (kể cả sau web-search turn thông thường). Không cảnh báo, không CLI phục hồi.

## 5. Ổn định & Bugs

**SQLite WAL checkpoint nghẽn** - vấn đề nghiêm trọng nhất:
- Agent DB: #143524 (P0, Windows)
- Gateway state DB: #164294 (P2), #172091 (P2, worker transaction mở mãi do cross-thread admission wait)
- Shared-state DB: #171793 (P2, closed), #169196 (P2, closed, read mark pin ở frame 2)
- Impact: WAL phình GB, Gateway không start được, session stuck

**Session/subagent delivery**:
- #143334: Lost subagent completion, requester stuck settle-yield, restart fail "gateway timeout" (P0, closed)
- #164533: `sessions_send` đến active subagent fail "writer claim changed" (P2)
- #154252: Requester settle-wake exhaustion unreachable cho batch stuck dispatching (P0)
- #182043: Pending subagent mất requester source sau Gateway crash (P2, new)
- #164334: Completed child không wake requester khi sibling paused bởi `sessions_yield` (P1, closed)

**Platform-specific**:
- Windows: WAL issue (#143524, #171793), plugin staging loop (#162585), onboarding timeout (#183682)
- macOS: CPU busy loop (#134993), GPT-Live relay owner failure (#134798, closed)
- WebKit/Safari: MCP App sandbox timeout (#164447, closed)

**Runtime**:
- #177656: Native host exec fail integrity-admission, 28 failures 2026.10.5
- #164427: Cron maintenance hold state-DB writer 9.35s, exhaust 5s timeout, Gateway sidecar không start
- #159858: Worker isolates giữ ~650 MB heap ở idle (P2)

## 6. Yêu cầu tính năng

1. **#180497** (P2, new): Conversation stall watcher - heartbeat mode wake từng stalled conversation trong session riêng, thay vì 1 ambient turn ở main session

2. **#158068** (P2, 5 comments): Adaptive test-time compute cho Swarm populations (tách khỏi #155442)

3. **#150250** (P3): Skill Workshop - verify learning coverage và behavioral reuse

4. **#119294** (P3, 👍2, 5 comments): Track migration MCP 2.0 (2026-07-28 stateless spec), chuyển từ `@modelcontextprotocol/sdk` sang split client/server v2 packages

5. **#157614** (P2): Independent command text limit cho progress streaming (hiện command và commentary dùng chung budget)

6. **#182315** (P1, new): Support Google Gemini Omni Flash cho `video_generate` (Veo 3.1 Preview retired)

## 7. Phản hồi người dùng

**Frustration lớn**:
- WAL không checkpoint → Gateway không start được, phải manual fix
- Session stuck vĩnh viễn, không timeout, không recovery → phải restart Gateway
- Memory leak: worker heap 650 MB không release, HEIC view_image leak 250-400 MB/attempt (#163107)
- Plugin Windows: staging loop làm phình disk, Gateway không bao giờ healthy

**UX friction**:
- #155953 (P2, regression): Sidebar "Home" labeling confusing, "Groups" backed bởi 3 mechanism khác nhau
- #158168: Control UI sidebar hiện delivery-origin avatar thay vì agent avatar
- #173479: Composer textarea không scroll khi prefill text dài
- #155600: Selection comments render raw attachment text sau Gateway rename file

**Positive signals**:
- #155634 (Databricks Unity Gateway): Community-driven provider plugin, đang review
- Performance campaign: 8 PR cleanup allocation, community chấp nhận

## 8. Backlog & Roadmap

**Immediate priorities** (theo issue labels):
- P0: SQLite WAL checkpoint (#143524, #153426, #154252) - blocking nhiều user
- P1: Session delivery (#164334, #182635, #183599), native host exec (#177656), approval stalls (#150769)
- P2: Memory optimization (#159858, #163107), UI polish (#155953, #158168, #173479)

**Long-term**:
- MCP 2.0 migration (#119294) - spec đã release, SDK chưa migrate
- Skill Workshop (#150250) - learning coverage validation
- Test-time compute (#158068) - Swarm population controller

**Security review queue**:
- #153426: Memory root provenance ratchet
- #182043: Subagent completion loses requester source
- #178677: Cron blocked on missing creator channel
- #183987: Cron automations tool scoping

**Stale watch** (>30 days no activity, risk abandon):
- #155633, #119294, #158068, #155953, #166496

---

**Xu hướng**: Dự án tập trung stability (WAL checkpoint crisis) + performance (allocation cleanup campaign). Community report nhiều Windows/macOS platform issue. Feature development chậm lại, ưu tiên bug fix.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-26

## 🔥 Tóm tắt hôm nay

NanoBot merge liên tục 19 PRs về UI polish (theme transition, attachment gallery, appearance settings) và bug fix (session lock leak, context budget, provider compatibility). Không có release mới. Focus chính: trải nghiệm WebUI mượt hơn + fix memory leak nghiêm trọng trong API.

## 📦 Releases

Không có release.

## 🚀 Tiến độ dự án

### Merged PRs quan trọng (19 total)

**Memory/Performance Critical:**
- #6463: **Session lock leak** - API giữ lock mãi mãi cho mỗi `session_id` dù request xong → OOM. Đổi sang WeakValueDictionary
- #6433: Tránh redundant math layout setup khi stream LaTeX
- #6430: Đọc header thay vì reload full history khi đóng turn
- #6434: Reuse provider client cho cùng model override
- #6432: Giảm size standalone build (bytecode cache + native binding)

**WebUI Polish (11 PRs):**
- #6450, #6459: Smooth theme transition với crossfade 200ms + animated sun/moon icon
- #6456: Redesign Appearance settings - theme cards, reading size custom, responsive layout
- #6457: Attachment gallery compact - không force crop, file card nhỏ hơn
- #6444: Composer style refine - softer shadow, không đổi màu khi focus
- #6454: Unify skill/session link color `#F4A949`
- #6453: Ctrl+K search message text đã load
- #6451: Enter gửi waiting message sau clear/switch topic
- #6458: Permission hint đặt dưới control
- #6455: TUI dùng canonical session handle thay local alias

**Provider/Tool Fixes:**
- #6418: Kimi K3.1 Pro parameter support (temp fixed 1.0, max reasoning)
- #6442: Require ddgs 9.16.1 - upstream search fix
- #6464: Accept data URL với `BASE64`/`Base64` (case-insensitive RFC 2397)
- #6462: File preview giữ `#` và `?` trong path (`C#/Program.cs`, `notes#1.md`)
- #6461: Reject one-time cron trong DST gap (e.g. 2:30 AM khi clock nhảy 2→3)

**Agent Core:**
- #6420: Goal continuation lifecycle - không reset transcript sequence giữa internal iteration
- #6401: Refresh pairing prompt khi gateway change thay đợi 15s poll

### Open PRs quan trọng

- **#6323**: Edit+resend message in-place (keep prefix, replace suffix, same session) - conflicts
- **#6443**: Delegated work drawer trên composer - active work riêng chỗ
- #6439, #6452: Variant fixes cho session lock leak + Ollama/vLLM retry logic
- #6424, #6404: Context compaction fixes (idle check sau lock wait + budget oversized tool result)

### Xu hướng

WebUI maturity push: polish interaction details, theme/appearance customization, attachment UX. Memory management focus: fix leak patterns phát hiện qua production usage.

## ⭐ Điểm nổi bật cộng đồng

- **#5924** (8 comments): Sudo loop bug - agent stuck vì sudo timeout sau 1 turn, continue sau max iterations vẫn obsess command. P1 priority, chưa đóng
- **#5798** (2 comments): Conversation crossover - reply xuất hiện sai session khi có session khác đang chạy. 0.3.0 OK, 0.3.5 broken

Không có PR nào có nhiều comment - merge nhanh, review internal.

## 🐛 Ổn định & Bugs

**Critical resolved:**
- Session lock leak (#6463) - unbounded memory growth khi nhiều session_id khác nhau
- Large read_file abort turn (#6404 open) - tool result vượt budget sau compaction

**P1/P2 active:**
- #5924: Sudo loop - agent unusable sau auth timeout
- #5798: Session reply crossover
- #5311: Agnes AI double-encode nested JSON tool args
- Context budget issues (#5879, #6404, #6410, #6424)

**Provider compat:**
- Kimi K3.1 Pro params fixed
- Ollama/vLLM retry logic (#6452 open)
- Agnes AI nested object encoding (#5311 closed)

## 💡 Yêu cầu tính năng

**Merged:**
- #6318: Expose cron run history (last 20 executions) qua tool
- #6312: Pause/resume cron jobs
- #6344: Update cron tasks in-place (không mất job ID và history)

**In progress:**
- #6323: Edit+resend message (approved design, code review)
- #6443: Delegated work drawer

## 💬 Phản hồi người dùng

- Sudo workflow broken cho agent autonomy (#5924)
- Session isolation issue gây confusion (#5798)
- Provider compatibility quan trọng (Agnes AI, Kimi, local backends)
- WebUI polish được chú trọng nhưng không có feedback trực tiếp trong issues

## 📋 Backlog & Roadmap

Không có roadmap công khai. Infer từ activity:

**Near-term:**
- Resolve context compaction edge cases (#6404, #6410, #6424)
- Complete edit/resend feature (#6323)
- Delegated work UI (#6443)
- Fix sudo loop (#5924)
- Session isolation (#5798)

**Ongoing:**
- Provider compatibility testing và fixes
- WebUI interaction polish
- Memory/performance optimization

Linear issues referenced (NAN-339, NAN-359, NAN-360, NAN-92) nhưng board không public.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-26

## 📊 Tóm tắt hôm nay

Không có release mới. Dự án tập trung vào bảo mật và cải thiện stability: scoping công cụ per-agent (#9746), cấm scoped principals đọc log (#11326), chặn shell diagnostics rò rỉ (#11644). Context compression (#12038) thay thế trimming cũ. Gateway chat qua core RPC (#11986) đang review.

## 🚀 Releases

Không có release trong 24 giờ qua.

## 🔧 Tiến độ dự án

**Ưu tiên cao - Security & Stability:**

- **#11326** [P1, release-gate]: Chặn scoped principals đọc persisted logs. `logs/query` và `logs/get` chưa gate như `logs/subscribe` → scoped users đọc được global logs. Fix: `require_global_stream_access` check trước khi xử lý.

- **#9746** [P1, release-gate, size:XL]: Per-agent ownership scoping cho session tools & discord_search. Agent chỉ đọc/ghi conversation của mình. Trust boundary dựa vào runtime facts + config, không phải user input.

- **#11644**: Shell command trong cron leak raw stdout/stderr vào channel → có thể lộ secrets. Fix: sanitize output trước khi forward.

- **#11672**: JPEG decode copy toàn bộ input vào memory → DoS với large file. Fix: project allocation từ SOF header, không decode.

**Tính năng mới quan trọng:**

- **#12038** [size:XL]: Context compression thay trimming. Old turns được summarize thay vì drop hẳn. Config surface `runtime_profiles.<p>.context_compression` hoạt động lại.

- **#11986** [size:XL, release:v0.9.0]: Dashboard chat qua core RPC. Stack trên #11965 (sign-in) + #11186 (in-process RPC) + #11964 (retire orphaned sessions).

- **#11320** [release-gate, size:XL]: Plugin webhooks dispatch qua core RPC. Phụ thuộc #11319 (core ingress) + #11165 (rpc-proto).

- **#11174** [size:XL, release:v0.9.0]: Capability-taking constructors cho turn entry points. Tool source registry complete by default, bound capabilities qua child paths.

**CLI-only build improvements:**

- **#11976** [size:L, release:v0.9.0]: CI job build & test CLI-only feature set với artifact ratchet. Stack trên #11975, merge #11269 + #11973.

- **#11973**: Fix agent owned state cascade khi không có gateway feature. `zeroclaw agents delete/rename` dùng `zeroclaw::gateway::agent_owned_state` → fail khi gateway disabled.

- **#11974**: Gateway-dependent tests chỉ chạy khi gateway built.

- **#11975**: Build không có gateway point về standard build. `zeroclaw gateway` commands print deprecation notice.

**Channel improvements:**

- **#11754** [size:XL]: Configurable ack reactions (👀 receipt, ✅/❌ done). Hiện hard-coded, PR thêm config cho core, Slack, Matrix, Lark.

- **#11744** [size:XL]: Stream model reasoning vào Telegram/Slack drafts như Matrix (`stream_reasoning = off/status/full`).

- **#11746**: Email inbound attachments save vào workspace. Docs nói có nhưng code không làm → attachment chỉ tồn tại 1 turn.

- **#11750**: Email không trả lời auto-mail (OOO, bounce, newsletter). Tránh autoresponder loop.

- **#11763**: IMAP IDLE search lại trước mỗi IDLE. Mail landed giữa search không được pick.

- **#11762**: Mark email seen ở active mode. Dùng `BODY.PEEK[]` cả 2 mode → mail không đánh dấu đọc.

- **#11741**: Dist-broad container image với full channel set. Standard dist chỉ có subset → Slack config không start.

- **#11739**: Telegram withdraw ack reaction khi reply xong. Hiện chỉ add, không remove.

- **#12003**: Email inbound-only không cần SMTP. `smtp_host` + `from_address` bắt buộc → không config được IMAP read-only.

- **#11267**: Parse image elements trong Feishu post messages. Image bị drop, bot không trả lời.

**Bug fixes:**

- **#11209** [size:L]: `MemoryBackendKind::Unknown` fallback Markdown → unknown backend ghi vào workspace files. Fix: reject thay vì silent fallback.

- **#11283**: SOP step scope groups sai tên tool. Expand `fs` → `read_file` nhưng registry dùng `file_read`. Fix: match registered names.

- **#11774**: Locale fallback từ regional về language. OS report `fr_FR` nhưng catalog chỉ có `fr` → mismatch.

- **#11855** [release:v0.9.0]: Clear abandoned install stages. Install dừng giữa chừng để lại `.<name>.installing-*/`. Không có command nào dọn.

- **#12035** [OPEN issue]: `knowledge_bundles` validated nhưng không dùng ở runtime, không có warning.

**Infra & CI:**

- **#11988**: Semgrep drop nosemgrep-suppressed findings trước SARIF upload. In-source suppressions vẫn show trong code scanning alerts.

**Docs & tests:**

- **#11056**: Document WhatsApp voice note round trip.

- **#11770**: Locale-independent tests cho voice-drop & model-fallback. Expect English text → fail under other locales.

- **#11980** [size:XS, release:v0.9.0]: Propose runtime composition extension row cho #11174.

## 💬 Điểm nổi bật cộng đồng

Không có issue/PR nào có số bình luận đáng kể trong data. Tất cả đều 0 comments hoặc undefined. Activity tập trung ở maintainer review/push code.

## 🐛 Ổn định & Bugs

**Critical security fixes đang merge:**

- Scoped principals bypass log access controls (#11326)
- Session tool cross-agent access (#9746)
- Shell cron output leaks secrets (#11644)
- JPEG DoS qua memory exhaustion (#11672)

**Stability issues:**

- Unknown memory backend silent fallback (#11209)
- Email autoresponder loops (#11750)
- IMAP IDLE miss messages (#11763)
- Abandoned plugin install stages (#11855)
- CLI commands fail khi gateway disabled (#11973)

**Silent failures:**

- `knowledge_bundles` config ignored (#12035)
- Email attachments không persist (#11746)
- Feishu images dropped (#11267)
- SOP scope groups mismatch (#11283)

## ✨ Yêu cầu tính năng

- **Context compression** (#12038): Summarize old turns thay vì drop → retain history trong limited window.
- **Configurable ack reactions** (#11754): Custom emoji cho receipt/done notifications.
- **Stream reasoning** (#11744): Real-time model thinking trong Telegram/Slack.
- **Inbound-only email** (#12003): IMAP monitoring không cần SMTP send.
- **Dashboard chat over RPC** (#11986): Scoped chat qua core thay vì HTTP.
- **Plugin webhooks over RPC** (#11320): Unified dispatch mechanism.

## 👥 Phản hồi người dùng

Không có user feedback trong issues. #12034 (RFC: Personal Agent MVP) đóng ngay, không có discussion. #12035 mới mở 1 ngày, chưa có response.

## 📅 Backlog & Roadmap

**Release v0.9.0 targets:**

- #11986: Dashboard chat qua core
- #11174: Capability-taking constructors
- #12038: Context compression
- #11976: CLI-only build CI
- #11855: Clear abandoned installs
- #11973: CLI agent cascade fix
- #11975: Gateway-less build notices
- #11980: Runtime composition docs

**Release-gate items (must merge before release):**

- #11326: Scoped principal log access
- #9746: Per-agent tool scoping
- #11320: Plugin webhooks over RPC

Xu hướng: dự án hướng tới production-ready với focus vào security boundaries, scoped access, RPC consolidation. CLI-only build cho lightweight deployments. Context management improvement sau khi trim-only approach reach limits.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw ngày 2026-10-26

## 1. Tóm tắt hôm nay

Dự án đóng 4 items cũ (2 bugs, 2 PRs tồn động từ tháng 3), mở 2 PRs mới: sửa lỗi Claude Haiku 5.5 với token auth và thêm provider Runcrate. Không có release. Hoạt động chủ yếu dọn backlog và mở rộng provider.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR mở:**
- **#3447**: Fix bug Anthropic token auth với model thinking-always (claude-haiku-5-5). Request gửi deprecated param `temperature` → API trả 400. [@sebbY82 phát hiện + fix]
- **#3448**: Thêm provider Runcrate (OpenAI-compatible, prefix `runcrate/`, endpoint `api.runcrate.ai/v1`). Provider GPU giá rẻ cho open models. Pattern giống Novita/NEAR AI Cloud.

**PRs đóng (stale cleanup):**
- **#1584** (3/15 tạo): Sub-turn POC cho multi-agent hierarchy - đóng sau 7+ tháng không merge
- **#1556** (3/14 tạo): Merge 3 PRs fix khác (#1378, #1376, #1356) - đóng không merge
- **#1182** (3/6 tạo): Cập nhật `AGENTS.md` thành principle-based guide - đóng stale

**Xu hướng:** Đang mở rộng provider landscape (thêm Runcrate) và fix bugs edge-case (Anthropic thinking models). Dọn backlog Q1 không ship.

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có nhiều reactions (tất cả 👍: 0). Community engagement thấp trong 24h. 

PR #3447 và #3448 chưa có review/comment → chưa đánh giá được phản hồi.

## 5. Ổn định & Bugs

**Bugs đóng (đánh dấu stale, 2 tuần không activity):**

- **#3423** (Cron jobs luôn báo `lastStatus=ok` dù fail): Gateway discard error từ `CronTool.ExecuteJob` → không record failure vào `cron/jobs.json`. Đóng stale, chưa fix.

- **#3422** (Telegram channel treo vĩnh viễn): `getUpdates` long-poll không có timeout, connection nửa mở (proxy/tunnel frozen) → thread chờ mãi. Đóng stale, chưa fix.

**Bug đang fix:**

- **#3447**: Claude Haiku 5.5 (thinking-always) + token auth fail với `"temperature" is deprecated`. Fix đang open PR.

**Đánh giá:** 2 bugs quan trọng (cron silent fail + telegram hang) đóng stale chưa giải quyết. Nếu user còn gặp, sẽ reopen. Bug Anthropic đang được xử lý nhanh (PR trong 24h).

## 6. Yêu cầu tính năng

**#3448**: Thêm provider Runcrate cho GPU giá rẻ. Không phải feature request từ issue, là PR trực tiếp từ contributor (likely maintainer hoặc Runcrate rep).

Không có feature request mới từ community.

## 7. Phản hồi người dùng

Không có comment/discussion mới trong 24h. 

Issues #3422, #3423 có 2 comments mỗi cái nhưng từ trước 25/10, không phải hôm nay.

## 8. Backlog & Roadmap

**Đóng stale:**
- Sub-turn/multi-agent hierarchy (#1584) không merge → feature này shelved hoặc cần redesign
- Agent documentation improvements (#1182) đóng → có thể merged version khác hoặc không cần

**Ưu tiên hiện tại (suy từ PR):**
- Provider expansion (thêm Runcrate, theo pattern Novita/NEAR)
- Bug fixes cho edge cases (thinking models, deprecated params)

**Thiếu visibility:** Không có roadmap public hoặc milestone. Backlog Q1 bị dọn không context → khó đánh giá chiến lược dài hạn.

---

**Insight:** Dự án ở phase dọn nợ kỹ thuật (đóng stale items) + mở rộng provider options. Bugs nghiêm trọng (cron, telegram) chưa fix nhưng đánh stale → cần theo dõi nếu reopen. Community engagement thấp, contributor chủ yếu core team.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo phân tích NanoClaw - 2026-10-26

## 🎯 Tóm tắt hôm nay

Ngày tích cực cho cải tiến nội bộ và UX. Core team push 3 fix setup quan trọng (hiển thị account, device code, switch account). Cộng đồng đóng góp 21 PR extension/hardening từ @barnuri, @drsmk238 - focus vào pluggability, error handling, scheduling. 1 issue hardening mới về session isolation cho agent-to-agent messages.

## 📦 Releases

Không có release.

## 🚀 Tiến độ dự án

**Setup & UX (Core team - CLOSED today)**
- #4225, #4224: Fix onboarding flow - print device code, show account name, cho switch account
- Impact: First-time setup rõ ràng hơn, tránh nhầm account

**Security & Hardening**
- #4222 (NEW): Đề xuất fresh session per agent-to-agent message để tăng isolation
- #3717: Escape XML trong composed prompt blocks - chặn prompt injection
- #3922: Session logs persistence sau khi container exit
- #4221, #4220: Better crash reporting - print stack/cause chain

**Extensibility Architecture (21 PR từ @barnuri)**
Pattern rõ: biến NanoClaw thành platform có hooks thay vì monolith
- #3921: Registry cho custom task fields
- #3903: Pluggable scheduler admission (container cap)
- #3925: Provider wrapper seam cho retry/fallback
- #3926: postCard hook cho custom channel rendering
- #3924: Delivery fallback với adapter/approver hooks

**New Skills**
- #4218, #3726: Proton Mail adapter qua Bridge - native IMAP/SMTP
- #3929: Scheduled updates cho unattended maintenance
- #3935: Error reports skill - auto-report failures về chat
- #3933: Flow-based pre-task scripts thay bash
- #3938: Voice replies skill (offline TTS)
- #3898: Park channels với NANOCLAW_DISABLED_CHANNELS

**Developer Experience**
- #3897: Extend agent instructions không cần edit CLAUDE.md
- #3931: minimalContext option cho small models
- #3930, #4034: Fix env isolation trong tests
- #3927: Collapsible sections trong cards

## 💬 Điểm nổi bật cộng đồng

21/24 PR từ 2 contributors (@barnuri, @drsmk238) - không phải core team. Đây là signal mạnh về:
- Codebase đủ modular để extend
- Nhu cầu thực về pluggability, scheduling, multi-channel reliability

Không có comment/reaction - có thể team review offline hoặc PRs mới chưa attract attention.

## 🐛 Ổn định & Bugs

**Fixed hôm nay:**
- Setup flow UX (3 PR merged)

**In progress:**
- Prompt injection via XML escape (#3717)
- Env isolation trong tests (#4034, #3930)
- Crash reporting (#4221, #4220)

## ✨ Yêu cầu tính năng

**Hardening:**
- Session isolation cho agent-to-agent (#4222)

**Delivery reliability:**
- Multi-channel fallback (#3924)
- Voice replies (#3938)
- Proton Mail native support (#4218)

**Operations:**
- Unattended updates (#3929)
- Error reports tự động (#3935)
- Flow-based task gates (#3933)
- Session log persistence (#3922)

## 👥 Phản hồi người dùng

Không có discussion công khai trong data. PR descriptions reveal pain points:
- Setup confusion với multiple accounts
- Container logs lost khi exit
- Bash scripts cho scheduling không maintainable
- Single-channel dependency = downtime risk
- Forked installs conflict trên CLAUDE.md

## 🗺️ Backlog & Roadmap

**Pattern emerging:** Transform NanoClaw từ standalone app → pluggable platform
- Hook points: scheduler admission, provider wrapper, delivery fallback, log sinks, task fields
- Goal: Extend không cần fork core

**Open work clusters:**
1. Voice (inbound #2003, #2317, #2459; outbound #3938)
2. Channel reliability (fallback #3924, Proton #4218)
3. Security (XML escape #3717, session isolation #4222)
4. Operations (updates #3929, error reports #3935, logs #3922)

Image refresh bot active (#4223) - hardened images vẫn đang ship.

---

**Verdict:** Project mature đủ để attract extension work. Core team focus UX polish, community push reliability/ops features. Good health signal.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-26

## 1. Tóm tắt hôm nay

Không có hoạt động phát triển mới. Dự án im lặng hoàn toàn trong 24h qua - không có issues, không có releases, không có commits mới. Chỉ có các PR cũ từ dependabot đang nằm chờ review.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Dependency updates đang tồn đọng:**

- **7 PRs từ dependabot** - tất cả về cập nhật dependencies, không có code mới
- PR mới nhất: #8160 và #8159 (25/10) - cập nhật 43 rust packages và 11 GitHub actions
- PR cũ nhất chưa merge: #7834 (từ 23/8) - wasm group updates, đã 2 tháng không động

**Vấn đề:**
- Zero velocity. Không có PR từ developer thật trong data này
- Dependabot PRs không được review/merge kịp thời → backlog tích tụ
- PR #7834 (wasm updates) mở 2 tháng → hoặc có breaking changes hoặc thiếu maintainer capacity

## 4. Điểm nổi bật cộng đồng

Không có. Tất cả PRs đều 0 reactions, không có comments, không có discussion. Cộng đồng không tương tác với repo này.

## 5. Ổn định & Bugs

Data không cho thấy bug reports hay fixes. Chỉ thấy maintenance work (dependency bumps).

## 6. Yêu cầu tính năng

Không có trong data.

## 7. Phản hồi người dùng

Không có user feedback trong data. Zero engagement trên tất cả PRs.

## 8. Backlog & Roadmap

**Backlog rõ ràng:**
- 6 dependency PRs chưa merge (1 đóng nhưng thay bằng PR mới hơn)
- Wasm toolchain update (#7834) đang stuck

**Roadmap:** Không rõ từ data. Dự án có vẻ trong giai đoạn maintenance mode hoặc đang phát triển ở nơi khác (private branches/forks).

---

**Đánh giá tổng thể:** Dự án trong trạng thái dormant. Chỉ có automated dependency PRs, không có human activity. Cần check xem team có còn active develop hay đã chuyển focus.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw — 2026-10-26

## 1. Tóm tắt hôm nay

Ngày đóng 3 bug console/storage, mở 5 bug mới tập trung vào shell safety guard, audit persistence, file encoding. 8 PR đang review/merge — lớn nhất là channel isolation (subprocess) và `/steer` command cho mid-execution guidance.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Đã merge:**
- #8334: fix console UI overlap group header với conversation đầu tiên (1 CSS fix)
- #8362: draft composer scope đúng per-conversation thay vì per-agent (localStorage key thêm sessionId)

**PR đang mở (quan trọng):**
- #8187 (XXXL): tách channels thành plugins, chạy subprocess riêng → giảm SDK imports, isolate failures
- #8318 (M): `/steer <text>` command — inject guidance vào turn đang chạy không cần stop/restart
- #8419 (S): fix shell self-kill guard block nhầm `kill $PID` (user variable, không phải process của QwenPaw)
- #8268 (M): bound completion callback trong TaskTracker, cleanup run khi callback hang/cancel
- #8314 (M): thêm DeepSeek Search provider vào `web_search` (publication date + authority tier)
- #8418 (XS): docs note eligibility review cho AgentScope Platform deployment

**Xu hướng:** isolation/safety (subprocess, guard fixes), mid-execution control (`/steer`), UX polish (draft scope, group UI).

## 4. Điểm nổi bật cộng đồng

- #8413: self-kill guard từ chối legitimate `kill $PID` → PR #8419 đã gửi fix
- #8416: approval dialog retry cancel request không dismiss được (CLOSED nhanh)
- #8417: context compaction fail 400 với Volcano AgentPlan `glm-5.3-flash` — compat layer gửi cả hai param thinking (1 tương tác, đang mở)

Ít emoji reaction, chủ yếu maintainer + first-time contributors fix. Community vẫn nhỏ hoặc tương tác qua channel khác.

## 5. Ổn định & Bugs

**Shell/safety:**
- #8413/#8419: guard false-positive block `kill $PID`
- #8414: `edit_file` CRLF → LF khi edit targeted (newline normalization bug)
- #8415: `edit_file` decode errors='ignore' mất accented chars (ISO-8859-1 → UTF-8 lossy)

**Data persistence:**
- #8412: `audit.db` stop recording tool calls per-agent dù `audit_level: all` (không phục hồi)
- #8416: Desktop approval dialog retry cancelled request (đã close)

**LLM compat:**
- #8417: Volcano AgentPlan `glm-5.3-flash` không support `thinking.type=disabled`, compat layer gửi cả hai param → 400

**Console:**
- #8351/#8362: draft leak across conversations (fixed)
- #8333/#8334: group header overlap (fixed)

## 6. Yêu cầu tính năng

- #8318: `/steer` — mid-execution guidance cho agent đang chạy (PR đang review)
- #8314: DeepSeek Search provider với publication date + authority tier (PR mở)

Không có feature request issue mới trong 24h — tất cả đã có PR implementation.

## 7. Phản hồi người dùng

- #8413: user report guard block workflow hợp lệ `PID=$(pgrep ...) && kill $PID`
- #8417: user report compaction fail 100% với Volcano endpoint (Chinese, chi tiết stack trace)
- #8418: user test deployment bị block eligibility review — suggest update docs

Phản hồi technical, rõ repro steps. Ít complaint về stability, nhiều edge-case fixes.

## 8. Backlog & Roadmap

**Đang active:**
- Channel subprocess isolation (#8187) — XXXL, major arch change
- Task cleanup robustness (#8268) — bound callback, prevent leak
- Mid-execution control (#8318) — `/steer` UX improvement

**Backlog ngầm định (từ open bugs):**
- File encoding safety (ISO-8859-1, CRLF preservation)
- Audit persistence reliability per-agent
- LLM compat layer edge cases (thinking param variants)

Không có public roadmap/milestone trong data. Development reactive theo bug reports + community PRs.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*