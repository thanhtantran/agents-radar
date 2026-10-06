# Bản tin Hệ sinh thái Hermes Agent 2026-10-06

> Issues: 138 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-06 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-06

## 📊 Tóm tắt hôm nay

Dự án tập trung xử lý bug updater và cải thiện độ tin cậy hệ thống. 30 PR mới (nhiều về updater crash-safety), 50 issue active. Không có release.

## 🚀 Releases

Không có release.

## 📈 Tiến độ dự án

### Updater campaign (ưu tiên cao)
- **#132361**: Git/ZIP swap crash-safe - commit point duy nhất, durable state
- **#132365**: Update marker v2 - owner liveness check, checkout lock toàn cây
- **#132338**: Windows updater bị kill không strand gateway nữa
- **#132346**: CI E2E real-update gate mọi PR touch updater

**Ý nghĩa**: Đang hardening updater - hiện tại nhiều edge case (kill, crash, concurrent) để checkout hỏng/gateway strand. Campaign này làm update idempotent + crash-safe.

### Stability fixes
- **#133617** (#132817): `hermes auth list` show model cooldown - fix pain point: 1 transient 429 bench credential nhiều ngày, user không biết
- **#133611**: Pilk 0.2.4 exempt khỏi exclude-newer quarantine (exact pin)
- **#133615**: Context pin lost khi flatten custom provider
- **#121909**: OpenRouter `models:` config ignored - picker không merge user list

### Platform fixes
- **#117223** (#120051): WhatsApp group silence không trigger warning nữa
- **#128710**, **#125732**: Matrix reaction threading, room state/pins
- **#133614** (stack #108636): iMessage poll vote bind đúng clarify, show question + totals

### Feature requests
- **#98933** (#40239): Desktop Portuguese UI locale - CLI đã có, desktop thiếu
- **#130901**: Proton Pass vault backend (pass-cli)
- **#31106**: Telegram todo tool → editable checklist
- **#31091**: Skill auto-discover custom subdirs

## 🔥 Điểm nổi bật cộng đồng

### Pain cluster: Auth cooldown (#132817) - 2👍, 13 reports tuần này
- 1 lần 429/entitlement → credential bench hours/days
- Không có reset-time probe, không visibility, không pointer đến `hermes auth reset`
- PR #133617 fix visibility (show cooldown trong `auth list`)

### MCP trust gate bug (#88858, dupes: #108972, #109817, #121042, #132042) - tổng 2👍
- `readOnlyHint` never detected trên MCP 2.x (camelCase vs snake_case)
- Mọi read-only tool trên `trust: untrusted` server bị gate
- Fixed trong #88858

### Update reliability (#127731, #123971, #105659)
- Auto backup skip khi có frequent cron (receipt churn)
- Windows: update exit 1 khi Desktop start gateway (pm check mismatch)
- package-lock dirty → endless autostash

## 🐛 Ổn định & Bugs

### Critical (P1)
- **#122529**: Cron external worker missing venv site-packages → ModuleNotFoundError
- **#120051**: WhatsApp silence → warning message (fixed #117223)
- **#71643**: Telegram streaming finalize mang stale preview text

### High (P2)
- **#23811**: ContextCompressor inflate small session → rapid re-compress
- **#75724**: Backup abort trên non-SQLite .db file
- **#56634**: Terminal bash -l snapshot lose venv PATH (Debian /etc/profile)
- **#107998**: 1Password unlock fail với desktop integration enabled

### Test suite
- **#124359**: Windows native test: cwd litter, leaked kanban state, OAuth console-dependent

## 💡 Yêu cầu tính năng

### High interest
- **#40239** (4👍): Portuguese desktop UI
- **#31106**: Telegram todo checklist rendering
- **#31091**: Skill linked_files auto-discovery

### Plugin ecosystem
- **#125521**: hermes-tenuo catalog entry (warrant-based tool auth)
- **#109457**: ClixRx MCP (US prescription pricing)
- **#132991**: Agora re-pin v2.0.8 (fix dashboard 500)

### Developer experience
- **#131337**: Skills-presentation accessor (names-only rendering)
- **#89844**: skills.compact config cho BM25/progressive routing

## 👥 Phản hồi người dùng

### Pain points
1. **Auth/credential management**: Cooldown không visibility (#132817)
2. **Update reliability**: Windows edge cases nhiều (#123971, #127830, #105659)
3. **MCP trust gate**: False positive block read-only tools (#88858 series)
4. **Context compression**: Inflate small session → death spiral (#23811)

### Platform gaps
- Desktop Portuguese UI thiếu (#40239) - CLI có rồi
- WhatsApp group silence UX confusing (#120051)
- Matrix reaction threading (#128710)

## 📋 Backlog & Roadmap

### Active campaigns
1. **Updater hardening** (5 PR stack):
   - Crash-safe commit point ✅
   - Owner liveness + lock ✅
   - Kill recovery (Windows) ✅
   - E2E gate ✅
   - Post-commit never-fail → pending #132386

2. **Matrix feature parity** (2 PR stack):
   - Room state/pins #125732
   - Reaction threading #128710

3. **iMessage/Photon polls** (#133614, #108636)

### High-value fixes queued
- Auth cooldown visibility (#133617)
- Cron venv PYTHONPATH (#122529)
- Context compressor inflation (#21470)

### Needs decision
- Skills compact config (#89844)
- Native poll vote UX (#133614)
- Pre-key session route hook (#133590 closed - minimal scope)

---

**Xu hướng**: Tăng focus stability (updater, auth, compression). Ecosystem mở rộng (plugins, MCP). Desktop feature parity với CLI. Windows platform nhiều edge case.

---

## So sánh hệ sinh thái chéo

# Báo cáo so sánh hệ sinh thái AI Agent - 2026-10-06

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent vào 2026 có 9 dự án quan sát, chia 3 tầng:

**Tier 1 - Production-grade, active teams:**
- **Hermes Agent** (NousResearch): 138 issues, 500 PRs, 0 release. Focus updater hardening, auth visibility, stability.
- **OpenClaw**: 188 issues, 500 PRs, 1 release (beta). Intense performance work, memory leak hunting (4-5GB/h confirmed), session lifecycle.
- **QwenPaw**: 32 issues, 25 PRs, 0 release. Bug-fix mode - context corruption, provider compatibility crisis.

**Tier 2 - Small teams, specific focus:**
- **NanoBot**: 5 issues, 24 PRs, 0 release. Memory safety day - serialized Dream runs, MCP timeout, security (DNS pinning).
- **Zeroclaw**: 6 issues, 50 PRs, 0 release. Foundation work parked (security recheck), SOP redesign planning (6 icebox issues).
- **NanoClaw**: 4 issues, 21 PRs, 1 release (RC2). macOS update fix, WhatsApp stability, OneCLI pin.

**Tier 3 - Low activity hoặc maintainer gap:**
- **PicoClaw**: 5 issues, 4 PRs, 0 release. Stale bot closed 8/9 items. Community fork (afjcjsbx) active hơn upstream.
- **NullClaw**: 15 issues, 29 PRs, 0 release. One-person cleanup blitz (@vernonstinebaker) - Docker ship broken 5 tháng, arrow key CLI 6 tháng.
- **IronClaw**: 2 issues, 2 PRs, 0 release. Messaging integration (Sendblue), benchmark taxonomy daily.

---

## 2. 📋 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | PR merged 24h | Issue tạo 24h | Top pain point | Mức độ hoạt động |
|-------|--------|-----|----------|---------------|----------------|-----------------|------------------|
| **Hermes Agent** | 138 | 500 | 0 | 30 | 50 | Auth cooldown visibility (13 reports) | 🔥🔥🔥 High |
| **OpenClaw** | 188 | 500 | 1 | 11 | - | Memory leak 4-5GB/h (#159662) | 🔥🔥🔥 High |
| **QwenPaw** | 32 | 25 | 0 | 7 | - | Context corruption (#8022, #8009) | 🔥🔥 Medium |
| **NanoBot** | 5 | 24 | 0 | 11 | 8 | Token consumption blind spot (#5266) | 🔥🔥 Medium |
| **Zeroclaw** | 6 | 50 | 0 | 3 | 6 | Security recheck parked (#11205) | 🔥 Low |
| **NanoClaw** | 4 | 21 | 1 | 11 | 0 | macOS update race (#4021) | 🔥🔥 Medium |
| **PicoClaw** | 5 | 4 | 0 | 0 | 0 | Maintainer absent, stale bot active | ❄️ Dormant |
| **NullClaw** | 15 | 29 | 0 | 6 | 17 | Docker broken 5 months (#1017) | 🔥 Low (1 dev blitz) |
| **IronClaw** | 2 | 2 | 0 | 0 | 2 | Background tab state (#8124) | 🔥 Low |

**Metrics 24h:**
- Total PRs opened/merged: ~80
- Total issues active: ~400
- Release count: 2 (OpenClaw beta, NanoClaw RC2)

---

## 3. 🎯 Vị thế Hermes Agent

### Đặc điểm
- **Volume leader**: 138 issues, 500 PRs - cao nhất sau OpenClaw.
- **Campaign-driven**: updater hardening (5 PR stack), auth visibility, stability focus.
- **Mature reliability work**: crash-safe commit points, owner liveness checks, E2E gates.
- **Ecosystem breadth**: Pilk quarantine, MCP trust gate, multi-platform channels (WhatsApp, Matrix, iMessage, Telegram).

### So với đối thủ
| Khía cạnh | Hermes Agent | OpenClaw | QwenPaw |
|-----------|--------------|----------|---------|
| **Scale** | Mid-large (138 issues) | Large (188 issues) | Small (32 issues) |
| **Focus** | Updater + auth + multi-channel | Performance + memory | Bug-fix crisis mode |
| **Stability** | Hardening campaigns | Memory leak hunting | Context corruption |
| **Community** | Active pain clusters (auth cooldown 13 reports) | High comment issues (50 comments #149361) | Medium (4 comments max) |
| **Releases** | 0 (tích lũy code chưa ship) | 1 beta (regular cadence) | 0 (feature freeze) |

**Vị trí**: Tier 1 mid-scale, quality-first. Lower velocity than OpenClaw nhưng structured campaigns > ad-hoc fixes. Higher community feedback volume than QwenPaw.

**Risk**: 0 release trong 24h → user đợi stability improvements lâu. OpenClaw và NanoClaw ship beta/RC nhanh hơn.

---

## 4. 🛠 Hướng kỹ thuật chung

### Patterns lặp lại ở nhiều dự án

**Memory safety (5/9 dự án):**
- OpenClaw: prepared-model-catalog leak 4-5GB/h (#159662), worker exceed limit (#160522)
- NanoBot: Dream run race (#6064), compaction after delete (#6063), WeakValueDict GC (#4819)
- QwenPaw: oversized image kill session (#8009), embedding batch drop (#8040)
- Hermes Agent: context compressor inflate small session (#23811)

→ **Insight**: Long-running agents accumulate memory bugs. Common: compaction race, resource limits không enforce, lifecycle không cleanup.

**Provider compatibility layer (4/9):**
- QwenPaw: GPT-6 params (#8090), DeepSeek file format (#8064), Moonshot schemas (#7962), custom endpoints (#8058)
- Hermes Agent: OpenRouter config ignored (#121909), model cooldown không visibility (#132817)
- OpenClaw: Model discovery bundled SDK cũ (#8075)
- Zeroclaw: Native tool calling default disabled custom endpoints (#10687)

→ **Insight**: OpenAI API variants diverge (params, schemas, error codes). Cần abstraction layer detect quirks per-provider.

**Update/lifecycle reliability (3/9):**
- Hermes Agent: updater campaign (5 PRs) - crash-safe, kill recovery, checkout lock
- OpenClaw: gateway recovery (#165854), session compaction fail (#165310)
- NanoClaw: macOS update wait race (#4037), OneCLI breaking change pin (#4036)
- NullClaw: Docker broken 5 tháng (#1017)

→ **Insight**: Self-update là critical path. Edge cases: crash mid-update, concurrent updates, OS process manager (systemd/launchctl).

**MCP trust/timeout (3/9):**
- Hermes Agent: trust gate false positive (#88858 - readOnlyHint camelCase)
- NanoBot: MCP timeout hardcode 30s (#6066), proxy inheritance (#6072)
- QwenPaw: HTTP 422 không trigger fallback (#8051)

→ **Insight**: MCP ecosystem immature. Compatibility: timeout config, HTTP status codes, proxy routing, trust heuristics.

**Session lifecycle (4/9):**
- OpenClaw: compaction cron race (#165310), admission livelock (#149270)
- Hermes Agent: context pin lost flatten (#133615)
- Zeroclaw: SessionBackend atomic claim (#10412)
- QwenPaw: context pollution empty messages (#8022)

→ **Insight**: Stateful sessions complex: compaction timing, admission gates, ownership claim, context cleanup.

---

## 5. 🎨 Điểm khác biệt

### Chiến lược phát triển

| Dự án | Approach | Strengths | Weaknesses |
|-------|----------|-----------|------------|
| **Hermes Agent** | Campaign-driven (updater, auth, compression) | Structured, thorough | Slow release velocity |
| **OpenClaw** | Performance-first (worker threads, transaction reduction) | Systematic optimization | Memory leak plague |
| **QwenPaw** | Provider-agnostic breadth | Broad compatibility | Context fragility |
| **NanoBot** | Security-paranoid (DNS pinning, credential isolation) | Defense-in-depth | Token transparency gap |
| **Zeroclaw** | Foundation-then-features (SessionBackend, authority recheck) | Correct architecture | Parked work blocks progress |
| **NanoClaw** | Stable release cadence (RC series) | Predictable ship | Smaller feature scope |
| **NullClaw** | One-dev debt paydown | Fast cleanup | Bus factor = 1 |
| **IronClaw** | Multi-channel expansion (messaging, web) | Wide reach | Shallow per-channel |
| **PicoClaw** | ??? (maintainer absent) | ??? | Dead upstream, fork active |

### Tính năng độc quyền

- **Hermes Agent**: Pilk quarantine, model cooldown tracking, multi-channel matrix (WhatsApp + Matrix + iMessage + Telegram)
- **OpenClaw**: Worker thread migration (49 transaction statements → 0 on Gateway), WebUI performance umbrella
- **QwenPaw**: DingTalk channel, Office COM automation, Langfuse observability
- **NanoBot**: Dream scheduling, Star invitation, Sendblue iMessage
- **Zeroclaw**: SOP (Standard Operating Procedure) authoring (6-issue roadmap)
- **NanoClaw**: Lean task mode (minimal context, cheap model)
- **IronClaw**: Benchmark taxonomy daily (model quality tracking)

### Community structure

**Maintainer-driven (low external contribution):**
- Hermes Agent, OpenClaw, QwenPaw, IronClaw

**Solo-maintainer:**
- NullClaw (@vernonstinebaker one-person show)

**Team-driven internal:**
- NanoClaw, Zeroclaw (@ mentions same team)

**Community-driven (contributions high):**
- NanoBot (external PRs merge), NullClaw (docs/channel contributions)

**Fork ecosystem:**
- PicoClaw (afjcjsbx fork active, upstream stale)

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Hermes Agent
- **Issue engagement**: Auth cooldown 13 reports, MCP trust gate 5 dupes
- **Pain visibility**: High (50-comment issues, 4-upvote features)
- **Contributor diversity**: Moderate (internal team + some external)
- **Onboarding**: Established (CLI Portuguese UI gap noted)
- **Maturity**: **Mid-high** - active user base reporting pain, organized triage

### OpenClaw
- **Issue engagement**: 50-comment umbrella issue (#149361), 18-comment zombie process
- **Pain visibility**: Very high (user-reported production memory leak)
- **Contributor diversity**: Low (mostly internal)
- **Onboarding**: Gaps (multi-instance, Windows path issues)
- **Maturity**: **Mid** - production users visible, but maintainer-heavy

### QwenPaw
- **Issue engagement**: Max 4 comments per issue
- **Pain visibility**: Medium (critical bugs reported but low discussion)
- **Contributor diversity**: Very low (0 external PRs visible)
- **Onboarding**: Weak (many provider quirks, little guidance)
- **Maturity**: **Low-mid** - users hit bugs, report, wait for fix. No community workarounds.

### NanoBot
- **Issue engagement**: Token consumption 15 comments (2 months old)
- **Pain visibility**: Medium (specific pain points, partial solve)
- **Contributor diversity**: High (external PRs merged same-day)
- **Onboarding**: Good (MCP usability PRs, proxy opt-out)
- **Maturity**: **Mid** - responsive to external contributions, growing ecosystem

### Zeroclaw
- **Issue engagement**: 0 (all issues 0 comment)
- **Pain visibility**: Low (no public feedback 24h)
- **Contributor diversity**: Moderate (channel PRs external)
- **Onboarding**: Weak (foundation work blocks features)
- **Maturity**: **Low** - internal planning phase, community quiet

### NanoClaw
- **Issue engagement**: 0 (internal team-only)
- **Pain visibility**: Low (no public discussion)
- **Contributor diversity**: Low (team members only)
- **Onboarding**: N/A (no public onboarding visible)
- **Maturity**: **Low** - private/commercial project, minimal community

### PicoClaw
- **Issue engagement**: 1 reaction (#3405 security reporting), 0 comments
- **Pain visibility**: High (fork public due to upstream neglect)
- **Contributor diversity**: Blocked (stale bot closes PRs)
- **Onboarding**: Absent (maintainer không phản hồi)
- **Maturity**: **Dead upstream, fork revival** - community moved to afjcjsbx/picoclaw

### NullClaw
- **Issue engagement**: 0 fresh discussion
- **Pain visibility**: Retroactive (5-6 month old bugs fixed in 24h blitz)
- **Contributor diversity**: Very low (1 active developer)
- **Onboarding**: Improving (docs refresh today)
- **Maturity**: **Very low** - bus factor 1, no community contributors

### IronClaw
- **Issue engagement**: 0 (2 issues, 0 comments)
- **Pain visibility**: Low (self-hosted user self-fixed bug)
- **Contributor diversity**: Low (messaging extension 1 contributor)
- **Onboarding**: N/A
- **Maturity**: **Very low** - early stage, team-driven

**Ranking (community maturity):**
1. Hermes Agent - active pain clusters, organized triage
2. OpenClaw - production users vocal, high-comment issues
3. NanoBot - external contributions merge fast
4. QwenPaw - users report bugs, low engagement
5. Zeroclaw - channel contributions, internal planning
6. NanoClaw - team-only, RC cadence
7. PicoClaw - upstream dead, fork active
8. NullClaw - solo maintainer blitz
9. IronClaw - minimal public activity

---

## 7. 🔮 Tín hiệu xu hướng

### Memory safety crisis (Q4 2026)
**Evidence:**
- OpenClaw: 4-5GB/h leak confirmed (#159662), multiple worker limit issues
- NanoBot: 3 memory PRs same day (Dream race, compaction after delete, WeakValueDict)
- QwenPaw: Oversized content kill sessions permanently (#8009, #8040)

**Implication:** Long-running agent processes expose memory management bugs. Stateful sessions, async workers, resource pools = new attack surfaces.

**Prediction:** Q1 2027 sẽ thấy:
- Memory profiling tools tích hợp (heap snapshots, leak detection)
- Resource limits enforce (max memory per session/worker)
- Compaction/cleanup campaigns (như Hermes updater campaign)

### Provider fragmentation (2026-2027)
**Evidence:**
- QwenPaw: 4 provider bugs (GPT-6, DeepSeek, Moonshot, custom endpoints)
- Hermes: OpenRouter config ignored, cooldown không visibility
- Zeroclaw: Custom endpoints default disable native tools

**Implication:** OpenAI API "standard" không tồn tại. Mỗi provider quirks về params, schemas, error codes, rate limits.

**Prediction:**
- Provider abstraction layer mature hơn (detect quirks runtime, feature probing)
- Test suites per-provider (OpenClaw model compat table #1031)
- Community-maintained compatibility matrices

### MCP ecosystem growing pains
**Evidence:**
- Hermes: Trust gate false positive (camelCase bug), nhiều dupes
- NanoBot: Timeout hardcode, proxy inheritance issues, credential leak logs
- QwenPaw: HTTP 422 không trigger fallback

**Implication:** MCP spec đang evolve, implementations chưa converge.

**Prediction:**
- MCP 3.x spec tighten (timeouts mandatory, trust heuristics standard, error code semantics)
- Test suites cho MCP servers (conformance tests)
- Fallback chains robust hơn (legacy → modern, cloud → local)

### SOP/workflow authoring (nascent)
**Evidence:**
- Zeroclaw: 6 issues icebox về SOP redesign (composable workflows, library, gates, permissions)
- Hermes: Skill auto-discover, linked_files
- NanoClaw: Lean task mode

**Implication:** Users muốn define workflows (không chỉ single-shot tasks). Agent-as-process, không phải agent-as-chatbot.

**Prediction:**
- Workflow DSLs emerge (visual editors, YAML configs)
- Approval gates standard (human-in-loop checkpoints)
- Reusable sub-workflows (child SOPs, skill libraries)

### Multi-channel convergence
**Evidence:**
- Hermes: WhatsApp, Matrix, Telegram, iMessage support
- NanoBot: Sendblue iMessage
- QwenPaw: DingTalk plugin
- IronClaw: Sendblue integration
- Zeroclaw: Teams, WhatsApp improvements

**Implication:** Agent không chỉ web chat. Users muốn agent ở messaging platforms họ đã dùng.

**Prediction:**
- Channel-as-plugin architecture (QwenPaw DingTalk pilot #8113)
- Unified notification routing (operator ở Telegram, user ở WhatsApp)
- Voice channels next (Talk Mode, phone calls)

### Update/lifecycle hardening (ongoing)
**Evidence:**
- Hermes: 5-PR updater campaign (crash-safe, kill recovery, E2E gate)
- NanoClaw: macOS wait race, OneCLI pin
- NullClaw: Docker broken 5 months

**Implication:** Self-updating agents = critical reliability. Users không muốn manual update, nhưng cũng không chấp nhận update brick system.

**Prediction:**
- Update strategies standardize (blue-green, rollback, health checks)
- E2E update gates universal (Hermes #132346 pattern)
- Observability baked in (Langfuse, OpenTelemetry spans)

### Context window management crisis (next wave)
**Evidence:**
- Hermes: Compressor inflate small session (#23811)
- QwenPaw: Context pollution empty messages (#8022), oversized image (#8009)
- OpenClaw: Session lifecycle race conditions

**Implication:** Larger context windows (1M+ tokens) → new bugs. Compression, cleanup, pollution amplified.

**Prediction:** Q1 2027:
- Compaction algorithms mature (incremental, priority-based)
- Context budgets per-user/session
- Automatic summarization chains (keep semantic, drop verbatim)

---

## 8. 💡 Strategic takeaways cho Hermes Agent

### Strengths to leverage
1. **Structured campaigns**: Updater hardening model works. Apply to memory, context, provider compatibility.
2. **Multi-channel breadth**: WhatsApp + Matrix + iMessage + Telegram = wide reach. Maintain lead.
3. **Community pain visibility**: Auth cooldown 13 reports → high signal. Use for prioritization.

### Gaps to close
1. **Release velocity**: 0 release 24h vs OpenClaw 1 beta. Ship RC cadence (học NanoClaw).
2. **Memory profiling**: OpenClaw hunting 4-5GB/h leak. Hermes chưa thấy tương tự → proactive profiling ngay.
3. **Provider layer**: OpenRouter config ignored, cooldown blind → abstraction layer yếu. QwenPaw có 4 provider bugs cùng lúc.

### Opportunities
1. **SOP authoring**: Zeroclaw planning 6 issues. Hermes có skill auto-discover foundation → extend to workflows early.
2. **MCP maturity**: Trust gate bug có 5 dupes → standardize heuristics, contribute back MCP spec.
3. **Context management**: Compressor inflate bug (#23811) + QwenPaw context corruption → invest compaction algorithms trước khi 1M-token windows phổ biến.

### Threats
1. **OpenClaw velocity**: 11 PRs merged 24h, performance focus aggressive. Nếu họ solve memory leak, sẽ dominate performance narrative.
2. **Provider fragmentation**: QwenPaw có breadth (DingTalk, Office COM, nhiều providers). Hermes cần provider layer mature nếu không sẽ mất users sang QwenPaw.
3. **PicoClaw fork**: Community fork khi maintainer absent. Hermes cần maintain responsive (auth cooldown 13 reports → fix PR #133617 shipped fast).

### Action items (suy từ trends)
1. **Ship RC next week**: Tích lũy updater campaign, auth visibility → package thành RC. Learn from NanoClaw cadence.
2. **Memory profiling sprint**: Trước khi hit OpenClaw-style 4-5GB/h leak. Heap snapshots, worker limits, compaction audit.
3. **Provider abstraction layer**: Quirk detection, feature probing, fallback chains. Target GPT-6, DeepSeek, Moonshot compatibility (học từ QwenPaw bugs).
4. **MCP conformance tests**: Trust gate bug có 5 dupes → write tests, propose fixes to MCP spec.
5. **Workflow DSL design doc**: SOP trend nascent. Early mover advantage nếu ship composable workflows Q1 2027.

---

**Conclusion**: Hermes Agent mid-tier, quality-first, structured campaigns. Ecosystem trends: memory crisis, provider fragmentation, MCP immaturity, workflow authoring, multi-channel. Gaps: release velocity, memory profiling, provider layer. Opportunities: SOP early, MCP standardization, context algorithms. Ship RC, invest memory/provider, design workflows.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-10-06

## 📊 Tóm tắt hôm nay

Release beta mới 2026.10.1-beta.1 vừa ra. Đội phát triển tập trung sửa memory leak prepared-model-catalog worker (~4-5GB/h), stability cho Windows session creation, và compaction cho cron-job sessions. Nhiều PR merge về performance - chuyển cold/child patches sang worker thread, DB transaction giảm.

## 🚀 Releases

**v2026.10.1-beta.1** (2026-10-05)

Highlights:
- **Sessions & memory**: preserved usage qua registry changes, remote workspace worker attachments work, fixed queued cancellations stalling turns
- **Embedding cache migration**: bounded batches + oversized-row reporting
- **Transcript aliases** không còn block active turns
- Performance: chuyển skill prep + tool authority reads sang session readers

## 🔧 Tiến độ dự án

**PRs nổi bật hôm nay:**

- #165904 (mới): Fix session worker receipts isolation - receipt cũ leak sang commit mới
- #165902: Bump source-map-js 1.2.1→1.2.2 (fix GHSA-68fv-2mgg-jv7q denial-of-service)
- #165819: Chuyển cold + child patches sang worker thread - **giảm 49 transaction-envelope statements** trên Gateway thread
- #165854: Doctor/update recovery không còn bỏ gateway stopped
- #165856: ClawHub publication recovery sau parent failure
- #165733: Session persistence chỉ lưu run outcomes; liveness từ registry

**Xu hướng:**
- Heavy focus vào **performance optimization** - move work off main thread
- Session lifecycle stability - nhiều fix về compaction, admission, recovery
- Memory leak hunting - #159662, #160522, #121572

## 💬 Điểm nổi bật cộng đồng

**Top issues theo comments:**

1. **#149361 (50 comments)**: Umbrella WebUI performance - index tổng hợp về desktop + mobile stability
2. **#97616 (18 comments)**: Zombie process leak - hook/tool children không được reap, runtime degradation
3. **#159662 (16 comments)**: prepared-model-catalog.worker leak **4-5GB/h** provider-agnostic - confirmed cold reboot + provider bisect
4. **#159596 (14 comments)**: Gateway memory sawtooth - ~200 critical memory-pressure/day

**User pain points:**
- Windows: #161953 "Session creation publication owner no longer current" - \\?\ SQLite path issue
- Plugin trust: #151795 path-managed plugins (--link) refused start "Channel ingress unavailable"
- Update failures: nhiều reports (#164459, #148681) stuck verifying/finalize

## 🐛 Ổn định & Bugs

**Critical (P0):**
- #165617: fs-safe EINVAL trên QNAP ZFS - renameat2 works nhưng fs-safe wrapper fails
- #161953 (CLOSED): Windows session.create fail - fixed path normalization
- #158239 (CLOSED): Gateway fail start JS fs-safe fallback kernel <5.6

**Memory issues:**
- #159662: prepared-model-catalog **confirmed 4-5GB/h leak** - provider-agnostic, cold boot proof
- #160522: Worker hits 1.15GB despite maxOldGenerationSizeMb:512
- #121572: Browser plugin Playwright CDP registry leak 90MB/h

**Session stability:**
- #165310 (PR): Compaction fail khi cron job target same session - lifecycleRevision advance race
- #149270: Code-mode turn wedge - tool dispatch never settles, admission livelock
- #148557: OAuth profile không resolve khi shared auth store ownership state-db

## ✨ Yêu cầu tính năng

- **#51441 (9 comments)**: Expose resolved backend model trong session_status - LiteLLM users blind về actual model used
- **#70266 (5 comments)**: macOS Talk Mode use assistant avatar thay vì orb
- **#42631 (4 comments)**: Job-level model override cho cron sessionTarget=main
- **#126727 (4 comments)**: Provider-aware concurrency/backpressure cho native subagents
- **#160873 (PR)**: Discord thread auto-naming via AI

## 💭 Phản hồi người dùng

**Positive:**
- Release cadence ổn định - beta releases regular
- Fix response nhanh - nhiều issues closed trong ngày

**Friction:**
- Memory issues impact production - 4-5GB/h leak force restarts
- Update failures khó debug - nhiều stuck verifying reports
- Plugin ecosystem trust model confusing - path-managed plugins rejected
- Windows-specific issues - path handling, session creation

**Developer experience:**
- PR preflight matrix cap (120 jobs) blocking legitimate PRs (#149631)
- ClawSweeper automation sometimes aggressive - closed PRs without merge context

## 📋 Backlog & Roadmap

**Near-term (inferred từ PRs + issues):**

1. **Memory stability** (highest priority):
   - prepared-model-catalog leak root cause
   - Worker resource limits enforcement
   - Playwright CDP registry cleanup

2. **Session lifecycle**:
   - Compaction robustness
   - Cron job lifecycle interaction
   - OAuth + state-db ownership model

3. **Performance**:
   - Continue moving work off Gateway thread
   - Transaction envelope reduction
   - Skill prep + tool authority async

4. **Cross-platform**:
   - Windows path normalization
   - QNAP/ZFS fs-safe compatibility
   - Kernel <5.6 fallback stability

**Feature development:**
- Voice/Talk Mode improvements (#164749 - confirmation loops)
- Discord thread management (#160873)
- Memory promotion UX (#165493)

---

**Metrics snapshot:**
- 188 open issues (50 displayed)
- 500 open PRs (30 displayed)
- Issue ratings: 🦞 diamond lobster (highest severity) nhiều P0/P1
- Recent release: 2026.10.1-beta.1 (2026-10-05)

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-06

## 📊 Tóm tắt hôm nay

Ngày bản vá lỗi. 11 PR merged, 8 mới mở, tập trung vào sửa race condition, bảo mật và cải thiện WebUI. Không có release mới. Hoạt động nhất ở memory safety và MCP timeout fixes.

## 🚀 Releases

Không có release.

## 📈 Tiến độ dự án

### Merged (11 PRs)

**Memory & State Management**
- #6064 🔴 P2: Serialize manual/scheduled Dream runs. Ngăn 2 luồng Dream ghi đè cursor, race condition nghiêm trọng
- #6063 🔴 P0: Discard stale compaction sau session reset. Session bị xóa nhưng compaction thread vẫn ghi lại → session "sống lại"
- #6033: Preserve runtime sidecar khi update metadata. Sửa invalidation không đáng có khi thay đổi handle

**MCP Improvements**  
- #6066 🔴 P2 (regression): Fix MCP HTTP timeout. Hardcoded 30s, bỏ qua `tool_timeout`. FastMCP tools >30s bị cắt
- #5299: Expose token usage records API. Trả lời #5266 - 50 records gần nhất, endpoint `/api/settings/usage/records`

**WebUI Polish**
- #6074: Unify icons, distinct glyph cho từng action. Xóa hover shadow/scaling
- #6075: Fit wide equations, không overflow. Tăng zoom không bị clip
- #6073: Restore CJK line-height 1.8, English 1.625. CSS specificity bug

**Documents & Cron**
- #6060: Read XLSX cells ngoài declared range. `openpyxl` read-only mode tin `dimensions` metadata, bỏ data
- #6076: Isolate Star invitation test state. Race condition test flake Windows Py3.14

**Security**
- #6069 🔴 P1: Pin validated DNS cho bytes hostname. `str(b"host")` thành `"b'host'"`, bypass DNS pin, SSRF risk

### Open PRs mới (8 PRs)

**Features**
- #6081: Sendblue iMessage/SMS transport. Native iMessage channel
- #6080: Show gateway commit hash ở About. 7-char commit + link GitHub
- #6072 🔴 P2: Per-server `useEnvProxy` opt-out. HTTP/SSE MCP inherit proxy → không reach local/Tailscale
- #6057: Choose chat cho scheduled tasks. UI select chat binding
- #6032: Local trusted WebUI extensions. Folder-based, `extension.json` manifest
- #6068: FXMacroData MCP preset. Read-only macro data tools

**Fixes**
- #6071 🔴 P2: Preserve schedules edited during cron execution. One-shot bị delete sớm, recurring recalc sai
- #6067 🔴 P2: Prevent credential leak trong MCP discovery logs. HTTPX error log URL có userinfo/tokens

### Open PRs cũ có update

- #4819 🔴 P2: Replace `WeakValueDictionary` cho consolidation locks. Lock bị GC → identity thay đổi
- #4820 🔴 P2: Reject non-string web fetch URLs. `str(123)` → cache signature `"web_fetch:123"`, collision
- #5846 🔴 P2: Trace BUILD substage latency (#5843). Structured debug timing
- #4551 🔴 P2: `isolated_session=false` cho shared heartbeat context
- #4549 🔴 P2: `model_override` cho cheaper heartbeat model

## 🔥 Điểm nổi bật cộng đồng

**#5266 - Token consumption logs** (15 comments, open 2 tháng)
User burn triệu token trong 2h không rõ tại sao. #5299 merged hôm nay partial solve - API lưu 50 records gần nhất. Chưa có structured logging real-time.

**MCP timeout regression** (#6065 → #6066)
FastMCP JSON response >30s fail. Breaking change từ #4230. Fixed ngay trong ngày.

## 🐛 Ổn định & Bugs

### Critical (P0-P1)
- ✅ **P0 - Memory corruption**: #6063 merged. Compaction thread write sau delete/reset
- ✅ **P1 - SSRF bypass**: #6069 open. Bytes hostname skip DNS pin
- 🔄 **P1 - Cron race**: #6071 open. Schedule edit during run bị consumed

### High Priority (P2)
- ✅ Memory: #6064 Dream race, #4819 WeakValueDict
- ✅ MCP: #6066 timeout regression  
- 🔄 Documents: #6060 XLSX dimensions
- 🔄 Caching: #4820 non-string URL

Pattern: Race condition giữa async operations và state updates. 3 PRs memory-related cùng ngày.

## ✨ Yêu cầu tính năng

### Đang implement
- **Agent observability**: #6079 - agent observe group message không cần reply. #6078 - separate model cho heartbeat notification evaluator
- **WebUI extensions**: #6032 - local trusted extension surface
- **Channel expansion**: #6081 - Sendblue iMessage/SMS

### Config flexibility
- #6072: Per-server MCP proxy opt-out
- #4549: Heartbeat model override (cost saving)
- #4551: Heartbeat shared session (context awareness)

## 💬 Phản hồi người dùng

**Token consumption transparency** (#5266): User muốn visibility chi tiết. Partial solve với records API nhưng không real-time.

**MCP usability**: Timeout hardcode, proxy inheritance gây friction với local/Tailscale servers. Đang fix.

**Group chat UX**: Agent reply mọi message gây spam. #6079 propose observe-only mode.

## 📋 Backlog & Roadmap

### Urgent
- P1 SSRF fix (#6069) cần merge nhanh
- P1 cron race (#6071)

### Near-term
- Agent control: observe-without-reply (#6079), separate notification model (#6078)
- MCP polish: proxy opt-out (#6072), credential scrubbing (#6067)
- Extensions surface (#6032)

### Pattern
Focus chuyển từ feature → stability. Memory/state bugs cluster ở Dream + session lifecycle. MCP maturing với real-world edge cases.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-06

## 1. Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào merge 3 PR security/runtime (1 an toàn, 2 vừa rủi ro) và 6 issues mới về tính năng SOP (Standard Operating Procedure) authoring - tất cả đều enhancement, status icebox, chờ ưu tiên.

## 2. Releases

Không có release trong 24h qua.

## 3. Tiến độ dự án

### Merged PRs (3 closed ngày 2026-10-06)

**Security foundation (2 PR - rủi ro cao, XL size):**
- #11205: Authority recheck foundation - **PARKED**, chưa áp dụng production. Review phát hiện recheck không hold tại point of effect (generation đọc trước khi sink chạy, không block concurrent policy publication).
- #11223: Test suite cho authority recheck - **BLOCKED** do #11205 parked.

**Runtime stability (1 PR - rủi ro thấp, merged):**
- #11533: Cô lập bootstrap WARN trong parallel tests. Fix race condition khi capture log warning.

### Open PRs quan trọng (27/50 total)

**Rủi ro cao - cần review:**

1. **#10412** (XL, breaking, do-not-merge): SessionBackend contract mới cho atomic session ownership claim. SQLite + RPC Chat + WebSocket admission đều dùng contract này. **P1 priority**, nhưng marked do-not-merge - cần maintainer sign-off.

2. **#10446** (XL): Fix tool-call envelope leak vào prose. Provider `gpt-5.6` qua codex đôi khi glue tool calls vào text thay vì trả riêng. Hiện tại runtime render nó, PR này reject thay vì render.

3. **#10938** (XL): Declare tool attachments explicitly thay vì scan text tìm image marker. Provider layer đang search tool result text - tool quote image sẽ gửi nhầm image thật lên provider.

4. **#11414** (XL): Web UI rebuild - focused workspaces + Admin hub. Home thành compact overview (agents, work, spend, health, sessions, SOP). Feature descriptions ngắn, không global sidebar.

**Rủi ro vừa - đang xử lý:**

- #11532: Cap structured Agent system prompt (không áp `max_system_prompt_chars`).
- #11535: Restore cost attribution trong AgentEnd (dropping turn cost khi zero tokens).
- #10480: Recover từ rejected image requests (retry without novel images).
- #10687: Custom OpenAI-compatible endpoints default native tool calling (hiện disabled nếu không explicit `native_tools=true`).

**Channel contributions:**

- #11194: Microsoft Teams channel (Bot Framework API).
- #10843: Telegram `add_reaction`/`remove_reaction`.
- #10979, #10986, #10988: WhatsApp Web improvements (create_room, invite_user, poll votes).

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có reaction hoặc comment trong 24h qua. 6 issues mới (#11546-#11551) đều 0 comment, 0 reaction.

Community activity thấp - có thể do timezone hoặc team nhỏ đang focus internal work.

## 5. Ổn định & Bugs

**Critical bugs được fix:**

- #10446: Tool-call envelope leak (intermittent trên production).
- #10938: Tool attachment confusion (any tool quote image → send actual image).
- #10935: StreamTextGuard suppress prose khi quote tool-result object.
- #11543: Shell children chiếm controlling terminal (need `setsid()`).

**Infrastructure/config bugs:**

- #10499: Config validation - persistent writes không validate before apply.
- #11209: Unknown memory backend fallback to markdown thay vì reject.
- #11214: Heartbeat alerts duplicate + không honor notification policy.

**Test stability:**

- #11080: Hailo provider test platform-independent.
- #11533: Bootstrap test log capture isolation.

## 6. Yêu cầu tính năng

### SOP (Standard Operating Procedure) authoring - 6 issues mới

Tất cả tagged `enhancement, gateway, runtime, web, topic:sop, status:icebox, topic:operator-ux`. Author: @IftekharUddin.

**#11551**: Composable child-SOP nodes - reusable child SOP với explicit inputs/outputs/lifecycle. Hiện `sop_execute` start run và return info, không phải contract cho child await.

**#11550**: Persist named SOP library groups - operators organize SOPs vào named groups trong library sidebar. Hiện không có canonical group membership, browser-only grouping mất khi restart.

**#11549**: Expose reviewable SOP gate payloads - preview/revise/approve exact output tại SOP gate. Case PR-review SOP cần inspect proposed post trước publish.

**#11548**: SOP helper authority + opt-in adaptation - separate permission suggest edits vs adapt running run. Hiện execution modes describe run approach, không phân quyền helper.

**#11547**: Bind runs to immutable workflow revisions - run giữ definition bắt đầu, editor save không reshape active run. Hiện `SopRun` record name/progress, không có immutable definition snapshot.

**#11546**: Bind SOP to managing-agent conversation - mỗi SOP có runtime-owned managing-agent binding nhận/organize run outputs. Hiện `agent` field chọn execution agent, không define persistent SOP-managing agent.

**Pattern**: Tất cả issues này cùng người tạo, cùng ngày, cùng labels → likely roadmap planning cho SOP redesign lớn.

### Providers

- #11104: Cheaper Inference provider (OpenAI-compatible gateway).
- #10407: Persistent session prompt attachments (SQLite collection, 4 bounded attachments per Chat session).

### Channels

- #9420: Anthropic OAuth profiles (stale-candidate - từ 2026-07-26).

## 7. Phản hồi người dùng

Không có feedback rõ ràng trong 24h data. Issues/PRs mới đều 0 comment.

Từ PR descriptions:

- Tool-call envelope leak (#10446): "about three occurrences in one evening on a production instance" - intermittent production bug.
- Heartbeat alerts (#11214): "sends every minute during one missed-heartbeat incident" - spam alerts.
- Unknown memory backend (#11209): WARN log nhưng vẫn chạy, gây confusion.

## 8. Backlog & Roadmap

**Security track** (stalled):
- Authority recheck foundation parked do review findings. Test suite blocked. Cần redesign recheck timing.

**SOP redesign** (icebox):
- 6 issues mới outline composable workflows, library organization, gate approval, helper permissions, immutable revisions, managing-agent binding.
- Linked to #11414 (web workspace rebuild) - UI foundation cho SOP features.

**Session ownership** (P1, blocked):
- #10412 (SessionBackend contract) marked do-not-merge despite P1. Cần maintainer decision.

**Provider stability**:
- Image recovery (#10480), tool attachment declaration (#10938), stream guard fixes (#10935) - all open, distinguished contributor work.

**Channel expansion**:
- Teams, Telegram reactions, WhatsApp improvements - community contributions đang review.

**Technical debt**:
- Config validation (#10499), memory backend strictness (#11209), heartbeat deduplication (#11214) - infrastructure cleanup.

---

**Nhận xét tổng quan**: Project có foundation issues lớn (security recheck, session ownership) chưa resolve, block dependent work. SOP roadmap mới nổi lên như major feature track. Community contributions nhiều nhưng review chậm (nhiều PR từ tháng 8-9 vẫn open). Core team focus internal stability work hơn là merge external PRs.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-06

## 1. Tóm tắt hôm nay

Không có hoạt động mới trong ngày 6/10. Tất cả issues và PRs được cập nhật ngày 5/10 bởi stale bot, đánh dấu đóng hoặc cảnh báo đóng sắp tới. Dự án đang trong trạng thái không được maintain tích cực.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Trạng thái: Dự án đang bị stale**

- Stale bot đã đánh dấu 8/9 items (5 issues, 3 PRs) trong 24h qua
- #3354 (IRC multiline) và #3366 (OpenAI compatible providers) bị đóng bởi bot
- Community member @afjcjsbx lập fork chủ động maintain (#3398)

**PRs đang mở:**
- #3416: Sendblue iMessage/SMS channel - vừa tạo 5/10
- #3370: Keenable web search provider - không cần API key
- #3347: Fix UI lag với large text - đã test Brave desktop/mobile

**Xu hướng:** Không có merge activity. Maintainer không review.

## 4. Điểm nổi bật cộng đồng

🔥 #3405 (1👍): Request private vulnerability reporting - @x1F916 muốn báo cáo security issues nhưng repo không enable chức năng này

🚨 #3404: Reliability bugs với reproducers - tác giả tìm được nhiều bugs trong agent loop, channels manager, config, updater trên main branch

📢 #3398: @afjcjsbx công khai fork `afjcjsbx/picoclaw` để maintain tiếp, phản ánh nhu cầu community vẫn cao

## 5. Ổn định & Bugs

**Critical issues được report:**
- #3404: Multiple reproducible bugs trong core components (agent loop, channels, config, updater) trên v0.3.1 và main
- #3347: UI lag nghiêm trọng khi chat area có nhiều text - đã có fix PR

**Trạng thái:** Issues có reproducer rõ ràng nhưng không được xử lý.

## 6. Yêu cầu tính năng

- #3366 [CLOSED]: OpenAI compatible providers - cho phép thêm self-hosted routers (ví dụ: 9Router)
- #3397: Thêm Tsubasa vào provider catalog - hiện đã dùng được qua custom API base
- #3416: Sendblue integration - nhắn tin với agent qua iMessage/SMS
- #3370: Keenable web search - không cần API key, dùng public endpoint

## 7. Phản hồi người dùng

**Negative sentiment:**
- Security researcher không thể báo cáo vulnerabilities một cách riêng tư
- PRs và issues có chất lượng bị stale bot đóng tự động
- Maintainer không phản hồi community contributions

**Positive:**
- #3347 đã test thành công, giải quyết performance issue thực tế
- #3416 có docs chi tiết về setup Sendblue từ free account
- Community vẫn đóng góp code chất lượng dù không có review

## 8. Backlog & Roadmap

**Không có roadmap chính thức.**

Dựa vào PRs/issues:
- Provider ecosystem mở rộng (OpenAI-compatible, Tsubasa, Keenable)
- Channel integrations mới (iMessage/SMS qua Sendblue, IRC multiline)
- UI performance fixes
- Security và reliability improvements đang chờ xử lý

**Risk:** Fork @afjcjsbx/picoclaw có thể trở thành unofficial main nếu repo gốc tiếp tục không active.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw — 2026-10-06

## 1. Tóm tắt hôm nay

Phát hành RC2 (v2026.10.0-rc.2) với sửa lỗi update macOS và WhatsApp linking. Team đóng 11 PR, mở 3 PR mới (Sendblue iMessage, FXMacroData MCP, Telegram link fix). OneCLI gateway giữ pin ở 1.42.0 tránh breaking change.

## 2. Releases

**v2026.10.0-rc.2** (2026-10-05)
- RC thứ hai cho bản 2026.10.0
- Đổi sang calendar versioning
- `/update-nanoclaw` giờ theo published releases thay vì `main` tip
- Sửa macOS update race condition (#4037) — `launchctl bootout` giờ đợi host thoát trước khi snapshot
- Sửa WhatsApp linking khi rate-limited (#4017)
- Pin OneCLI gateway ở 1.42.0 (#4036) — 1.43+ break secret API
- Beta channel nhận RC này; stable giữ 2.4.0 đến khi final ship

## 3. Tiến độ dự án

**Đóng (11 PR):**
- #4038: Release notes RC2
- #4037: macOS update wait logic — sửa #4021
- #4036: OneCLI gateway hold 1.42.0, block `/add-dial-tool` trên 1.42+
- #4035: Restart readiness test timeout fix
- #4017: WhatsApp Web version fetch trước link
- #4009: Agent image pin merge giờ manual
- #4015: Gateway skip approval card cho read không có credential
- #4041: OneCLI migration warning fix
- #4042: Resend adapter bump 0.3.0 (sửa `uuid` advisories)
- #4000: Merge main → channels branch (463 commits)
- #3995: Load mọi adapter, channels branch green

**Mở (10 PR):**
- #4043: **Sendblue iMessage/SMS skill** — webhook, operator DM, numbered approval
- #4040: **FXMacroData MCP tool** — macro data, FX rates, keyless
- #4029: Telegram link render fix — `_` trong URL bị drop
- #3918: Agent reply loss/repeat fix quanh `send_message`
- #3932: `/add-lean-tasks` — scheduled task chạy minimal context (cheap model)
- #3930: OpenCode config/env unification
- #3925: Provider wrapper seam cho retry/fallback
- #4034: OneCLI payload test isolation

**Xu hướng:**
- Channel integrations mở rộng (Sendblue, Telegram fixes)
- Stability fixes (reply loss, link rendering, update race)
- Cost optimization (lean tasks, skip approval cards)
- Dependency hardening (Resend, WhatsApp version)

## 4. Điểm nổi bật cộng đồng

Không có issue/PR nào vượt 0 reaction — repo internal team-driven. Top activity:
- **#4043** (Sendblue skill) — fresh PR, chờ review
- **#4040** (FXMacroData) — MCP tool mới
- **#3918** (reply loss fix) — addressing core reliability

## 5. Ổn định & Bugs

**Đã sửa:**
- #4021 (macOS update race) → #4037: `bootout` giờ đợi host exit
- #4017: WhatsApp linking dùng stale version khi 429 — giờ fetch trước
- #4041: OneCLI migration chỉ empty pin → rollback wrong version
- #4042: Resend adapter 4 moderate advisories

**Đang sửa:**
- #3918: Reply loss/repeat quanh `send_message` (streaming vs end-of-turn)
- #4029: Telegram drop link có `_` trong URL
- #3223 (open 56 ngày): Scheduled task error unroutable, operator không biết fail
- #3301 (open 50 ngày): Task firing trong chat session drop logs, unlisted
- #3643 (open 39 ngày, **high priority**): 30-min `ABSOLUTE_CEILING_MS` kill long local-model turn, không có config

## 6. Yêu cầu tính năng

- #3932: Lean task mode — minimal context cho cheap/local model
- #3925: Provider wrapper hook — retry/fallback không cần edit provider code
- #4043: Sendblue iMessage/SMS channel
- #4040: FXMacroData MCP tool
- #4015 (shipped): Skip approval cho credential-free reads

## 7. Phản hồi người dùng

Không có public user feedback — activity chủ yếu core team (@glifocat, @barnuri, @lookevink). Issues cũ (#3223, #3301, #3643) mở lâu không resolve, chưa có comment từ reporter.

## 8. Backlog & Roadmap

**RC → stable path:**
- RC2 trên beta channel
- Stable giữ 2.4.0 đến 2026.10.0 final
- Calendar versioning chuẩn hóa release cycle

**Pending merges:**
- #4043, #4040, #4029: Channel/tool expansion
- #3918: Reply reliability
- #3932, #3925: Cost/flexibility improvements

**Open bugs cần attention:**
- #3643: Hard 30-min ceiling — breaking cho local model
- #3223, #3301: Task error routing/visibility

**Channels branch:** Sync xong, adapter load green. Sẵn sàng merge tiếp.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw 2026-10-06

## 1. Tóm tắt hôm nay

Dự án focus vào hardening, security, và developer experience. @vernonstinebaker đẩy 17 PRs trong 24h, close 10 issues cũ, fix Docker image ship broken từ 5 tháng trước. Không có release mới, nhưng cleanup debt lớn.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### Merged PRs (6 items)

**Security & Stability**
- #959: Cron scheduler credential riêng, encrypted persist vào `paired_token`, không share bearer chính gateway
- #1023: Docker image fix ownership `/nullclaw-data` - image ship từ 05/29 với root-owned HOME, UID 65534 không write được
- #1011: Memory leak - tool call parse fail không free `name`/`arguments`
- #954: Outbound ownership fix - allocation fail giữ ownership đúng

**UX & Correctness**  
- #970: CLI arrow key support - raw mode terminal, history nav, word movement
- #1010: Discord bot ignore own messages - bot reply kích lại agent, loop vô hạn nếu `allow_bots=true`
- #953: WebSocket recovery - shutdown socket trước join heartbeat, bounded HELLO timeout
- #962: Anthropic native API doc - API key vs setup token, endpoint routing, capability limits
- #963: Weixin iLink QR auth doc - flow detail, harden implementation
- #1002: HTTPS typing worker stack 2MB - Zig TLS init overflow 512KB
- #1007: Diagnostics logging flags doc - content logging should off production

### Open PRs (13 items quan trọng)

**CI & Testing**
- #1042: Docker build gate cho PR - image ship broken vì không có pre-merge build check
- #1038: Test suite không cần real user config - 11 test fail khi `$HOME` sandbox/redirect
- #1029: Make cron/session test hermetic

**Docs**
- #1039: Refresh stale stats - 7,499 test không phải 6,300+, binary 2.8MB không phải 2.7MB
- #1040: CLAUDE.md thành pointer - duplicate 70% content với AGENTS.md
- #1035: Docker volume ownership repair guide - named volume keep old root ownership
- #1032: Document `scheduler.agent_timeout_secs` - default 0 = vô hạn, cron job serial nên 1 job hang block hết
- #1008: Repair docs index - beginner guide có 2-letter prefix, index không render

**Features & Refactoring**
- #1041: CLI terminal width refresh per keystroke - shrink terminal mid-edit vẫ viewport đúng
- #1031: Claude model capability table - không hardcode string, extend dễ hơn
- #1030: Archive key no-follow symlink - check-then-open race
- #1025: WebSocket TCP/DNS bounded - stop không interrupt DNS resolve, TCP SYN retry chờ mãi
- #982: Telegram curl proxy transport - hiện native HTTP không đi proxy

## 4. Điểm nổi bật cộng đồng

**Issue hot nhất**: #1033 (fresh open) - cron agent job default timeout 0 block scheduler mãi mãi. 3 bug combine: serial dispatch + no timeout + blocking wait.

**PR đóng nhiều issue**: #962, #963 close #767, #817 - user hỏi Anthropic native API, Weixin QR 4 tháng trước, giờ mới được doc + hardening.

## 5. Ổn định & Bugs

### Fixed
- Docker image không chạy được từ 05/29 (#1017 → #1023)
- Cron agent subprocess không spawn (#941 → likely fixed in scheduler work)
- Discord bot self-loop (#1010)
- CLI arrow key control chars (#865 → #970)
- Memory leak tool call parse (#1011)

### In progress
- #1033: Cron timeout mặc định 0 - chưa có PR fix
- #982: Telegram proxy - PR open, chưa merge
- Test hermetic (#1038, #1029) - chưa merge

## 6. Yêu cầu tính năng

- #1037: Native Windows console editing - stub raw-mode hiện tại, cần proper implementation
- Telegram proxy transport (#982) - trong progress
- WebSocket bounded connect (#1025) - trong progress

## 7. Phản hồi người dùng

**Pain points past 6 months:**
- Docker image broken 5 tháng (#1017)
- CLI không dùng được arrow key 6 tháng (#865)  
- Cron agent không chạy 5 tháng (#941)
- Anthropic/Weixin setup unclear 6 tháng (#767, #817)

Tất cả được address trong 24h này.

## 8. Backlog & Roadmap

**Immediate (tracked issues)**
- #1033: Cron timeout default
- #1036: CI gate Docker build
- #1034: Docker volume repair guide
- #1029: Hermetic test suite
- #1028: CLI width refresh (PR #1041 open)
- #1027: Model capability table (PR #1031 open)
- #1026: Archive key no-follow (PR #1030 open)
- #1024: WebSocket bounded connect (PR #1025 open)

**Next (mentioned in PR notes)**
- Native Windows console (#1037)
- Full WCAG manual validation

---

**Nhận xét**: Dự án ship broken image 5 tháng mà không phát hiện vì không có CI gate. @vernonstinebaker một mình close ~70% debt trong 24h. Quality bar cao nhưng velocity phụ thuộc 1 người. Cần distribute workload hoặc automate gate tốt hơn.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo IronClaw — 2026-10-06

## 1. Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào hai mảng: **chất lượng model** (phân loại lỗi benchmark officeqa hàng ngày) và **UI/UX** (fix state đọng khi user chuyển tab + thêm tích hợp iMessage/SMS qua Sendblue).

---

## 2. Releases

Không có.

---

## 3. 🔧 Tiến độ dự án

### PR #8127: Sendblue extension (iMessage/SMS)
- **Tác giả**: @lookevink
- **Nội dung**: tích hợp Sendblue API vào IronClaw, cho phép:
  - Ghép nối điện thoại (pairing)
  - Nhận tin webhook có xác thực
  - Trả lời SMS/iMessage từ terminal
  - Lưu danh bạ (stored DM targets)
- **Ý nghĩa**: mở rộng kênh tương tác agent ra ngoài web, vào messaging thực.
- **Xu hướng**: IronClaw từ framework agent thuần sang platform tích hợp nhiều kênh giao tiếp (messaging, web, terminal).

### PR #8125: fix state đọng trong background tab
- **Tác giả**: @heraisys-sas
- **Vấn đề**: tab nền không refetch state → status công cụ (tool-activity) cũ, không thông báo hoàn thành.
- **Sửa**: bật `refetchOnWindowFocus: true` trong `query-client.ts` (2 chỗ).
- **Ý nghĩa**: UX cải thiện cho user dùng nhiều tab, đặc biệt self-hosted không HTTPS (không có Web Push).

### Issue #8126: taxonomy lỗi benchmark hàng ngày (2026-10-05)
- **Nội dung**: phân loại lỗi officeqa benchmark (37 case không pass).
- **Kết luận**: phần lớn là **lỗi chất lượng model** (DeepSeek-V4-Flash không điều hướng đúng sheet/page), không phải lỗi framework.
- **Ý nghĩa**: team theo dõi sát benchmark, phân biệt lỗi infrastructure vs model → ưu tiên sửa đúng tầng.

---

## 4. 🔥 Điểm nổi bật cộng đồng

- **PR #8127**: tính năng messaging (iMessage/SMS) khá đột phá, nhưng chưa có comment → chưa rõ phản hồi cộng đồng.
- **Issue #8124**: vấn đề UI thực tế (non-HTTPS deployment không nhận notification) → #8125 sửa nhanh cùng ngày. Phản ánh workflow responsive với user feedback.
- **Issue #8126**: báo cáo taxonomy lỗi hàng ngày → team có quy trình monitoring benchmark định kỳ, chuyên nghiệp.

---

## 5. 🐛 Ổn định & Bugs

### Bug đã sửa
- **Stale state trong background tab** (#8124 → #8125): tab nền không cập nhật status công cụ, không thông báo hoàn thành.
  - Root cause: `refetchOnWindowFocus: false`.
  - Fix: đổi `true` → auto-refetch khi focus lại tab.
  - Note: deployment non-HTTPS không có Web Push → refetch là giải pháp duy nhất.

### Bug còn mở
- Không có issue bug mới nào trong ngày.

---

## 6. 💡 Yêu cầu tính năng

### Sendblue integration (#8127)
- **Yêu cầu ngầm**: user muốn agent hoạt động qua nhiều kênh (không chỉ web).
- **Deliverable**: PR thêm Sendblue extension, hỗ trợ pairing phone, webhook, reply SMS/iMessage.
- **Trạng thái**: PR mở, chưa merge.

### Notification trong background tab (#8124)
- **Yêu cầu**: user muốn biết agent hoàn thành task khi đang ở tab khác.
- **Deliverable**: PR #8125 fix refetch.
- **Trạng thái**: PR mở, chưa merge (nhưng fix nhẹ, có thể merge nhanh).

---

## 7. 💬 Phản hồi người dùng

- **@heraisys-sas** (issue #8124): user self-hosted gặp vấn đề UI thực tế (non-HTTPS, background tab) → tự mở issue và PR fix. Phản ánh:
  - User base có người triển khai self-hosted.
  - Community đủ kỹ thuật để contribute code.
- **@pranavraja99** (issue #8126): maintainer theo dõi benchmark sát, phân tích lỗi từng ngày. Chất lượng model là ưu tiên.
- **@lookevink** (PR #8127): contributor thêm tính năng messaging → cộng đồng mở rộng use case.

---

## 8. 📅 Backlog & Roadmap

Không có roadmap công khai trong ngày. Infer từ activity:

### Đang làm (infer từ PR/issue)
1. **Tích hợp messaging channels** (Sendblue iMessage/SMS) — PR #8127.
2. **Cải thiện UX WebChat** (background tab state, notification) — PR #8125.
3. **Monitoring benchmark chất lượng model** (taxonomy lỗi hàng ngày) — issue #8126.

### Xu hướng
- **Multi-channel agent**: từ web → messaging → có thể voice/desktop sau.
- **Self-hosted UX**: focus vào edge case (non-HTTPS, single-tenant) → sản phẩm phục vụ cả doanh nghiệp tự deploy.
- **Model quality tracking**: benchmark hàng ngày → team đo đạc chặt chẽ, không chỉ ship feature.

---

## 🔍 Insight

- **Velocity**: 2 PR + 2 issue trong ngày, responsive (bug report sáng → fix PR chiều).
- **Community health**: có contributor ngoài (messaging extension) + user tự fix bug (background tab).
- **Focus**: chất lượng model + UX edge case, không chỉ thêm feature bừa bãi.
- **Gap**: chưa có release → code tích lũy chưa ship stable. User muốn tính năng mới cần build từ main branch.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-10-06

## 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào fix bugs quan trọng - 25 PRs (7 merged/closed trong 24h), 32 issues (phần lớn bugs nghiêm trọng ảnh hưởng production). Nổi bật: lỗi OpenCode session header (#7599, #8104), context pollution (#8022), permission bugs desktop app (#8002), và nhiều lỗi provider compatibility.

## 🚀 Releases

Không có release trong 24h qua.

## 🔧 Tiến độ dự án

### PRs hoàn thành (merged/closed)
- **#8113** - DingTalk channel plugin hóa - bước đầu tách kênh giao tiếp thành plugin độc lập
- **#8110** - Settings mobile navigation dropdown sizing fix

### PRs đang review/in-progress (high-impact)
- **#8051** 🔥 - HTTP 422 từ legacy MCP servers không trigger fallback → streamable_http driver fail (#8047)
- **#8096** - Surface `finish_reason="length"` khi output bị cắt - user không biết response incomplete
- **#8090** - GPT-6 models dùng `max_completion_tokens` thay `max_tokens` - connection test fail 400
- **#8062** 🔥 - Embedding batch fail nếu 1 chunk over limit → toàn bộ batch drop (#8040)
- **#8052** - Transcription model name không configurable - stuck ở `whisper-1` default
- **#8055** - Skill pool download blocking event loop 30s+ với large skills (#8013)
- **#8012** - Telegram markdown formatter break với `c++`, `objective-c`, nested fences
- **#8010** 🔥 - Oversized image trong context → session chết vĩnh viễn (#8009)
- **#8048** - Inline Office COM automation bypass security sandbox (#8002)
- **#8033** - Desktop app multi-instance kill nhau backend
- **#7996** - Files panel refresh không reload expanded folders
- **#7988** - `grep_search` đọc binary files (history.db-wal) → corrupt context
- **#7962** - Moonshot provider reject enum schemas thiếu top-level `type`
- **#7964** - Langfuse tool observations không record output
- **#8111** - Add toggle show hidden files (`.gitignore`, `.env` etc)

### Xu hướng phát triển
1. **Provider compatibility layer** - nhiều fix cho OpenAI-variants (GPT-6, DeepSeek, Moonshot, custom endpoints)
2. **Security hardening** - Office COM guards, binary file exclusions
3. **UX polish** - transcript timestamps DST-aware, context usage meters, deep links
4. **Plugin architecture** - DingTalk pilot (#8113), extensibility framework
5. **Observability** - Langfuse integration fixes

## 🔥 Điểm nổi bật cộng đồng

### Issues nhiều tương tác
- **#8022** (4 comments) 🚨 - `send_file_to_user` tạo empty assistant message → pollute context → 400 cho tất cả requests sau
- **#7599** (4 comments) - OpenCode Go models thiếu `x-opencode-session` header → "MissingSessionID"
- **#8104** (resolved) - OpenCode API cần session header riêng cho mỗi chat - đã fix #7869

### User pain points
1. **Context corruption** - file/image blocks hoặc oversized media giết session vĩnh viễn (#8022, #8009, #8042)
2. **Silent failures** - embedding reindex claim success nhưng drop chunks (#8040), fallback không notify (#8103)
3. **Desktop stability** - multi-instance conflicts (#8033), WebView2 cache stale block boot (#8094)
4. **Provider incompatibilities** - GPT-6 params, DeepSeek file format, Moonshot schema validation

## 🐛 Ổn định & Bugs

### Critical bugs (data loss / permanent session death)
- **#8009 / #8010** 🚨 - Oversized image → provider reject → image block stay in context → every later request fail 400
- **#8022** 🚨 - `send_file_to_user` empty assistant msg pollution → 400 loop
- **#8040 / #8062** 🚨 - 1 CJK chunk over embedding limit → silent batch drop (20/126 chunks lost)

### High-severity bugs (feature broken)
- **#8047 / #8051** - DBX MCP HTTP 422 không trigger legacy fallback → driver never activate
- **#8074 / #8090** - GPT-6 connection test fail - param mismatch
- **#8077** - Qoder custom models invisible + context meter hidden
- **#8094** - Desktop boot splash no retry on WebView2 cache corruption
- **#8104** - OpenCode session header issue (resolved #7869)

### Medium bugs
- **#8046 / #8050** - DST timezone shifts transcript timestamps
- **#8064** - DeepSeek + PDF → session break vĩnh viễn
- **#8073** - v2.2.2.beta4 conversation page unreachable LAN devices
- **#7984 / #8029** - Playwright `--disable-extensions` → profile extensions không load
- **#8013 / #8055** - Large skill download timeout 30s (blocking event loop)
- **#8035 / #8052** - Transcription model không configurable
- **#8057** - Anthropic cache tokens không count vào context meter
- **#8058** - Custom OpenAI endpoints reject `prompt_cache_key`
- **#7979** - llama.cpp local server match cloud catalog → wrong context window (32k treated as 1M)
- **#8011 / #8012** - Telegram HTML formatter break với language names có symbols

## 💡 Yêu cầu tính năng

### Observability & UX
- **#8103** - Notify user khi daemon fallback sang model khác (currently silent)
- **#8085 / #8096** - Surface `finish_reason="length"` khi output truncated
- **#8082** - Document heartbeat semantics (silence/concurrency/activeHours)
- **#8075** - Update bundled Codex SDK 0.144.4→0.159.3 cho model discovery
- **#8111** - Show hidden files toggle (`.gitignore`, `.env` visibility)

### Developer experience
- **#7307** - Chain provider config → model management (reduce 5 steps → 2)
- **#7066** - Persist rotated OAuth2 refresh tokens (XMind etc)
- **#8076** - Notify + cancel in-flight turns khi reload drain timeout (24h silent wait)

## 📣 Phản hồi người dùng

### Positive
- #8104 resolved nhanh - OpenCode session header issue fixed
- Multi-agent background tasks functionality (#8059) - feature works nhưng có bugs

### Pain points
- **Debuggability thấp** - silent failures (#8040 embedding, #8103 fallback), no error surface (#8094 boot)
- **Context fragility** - oversized/binary content kill sessions permanently
- **Desktop app stability** - multi-instance conflicts, cache issues
- **Provider compatibility matrix** - mỗi provider quirks riêng (DeepSeek file format, Moonshot schemas, GPT-6 params)

### Feature requests from issues
- Better file handling - binary detection (#7988), hidden files visibility (#8111)
- Transcription configurability (#8035)
- Security improvements - Office COM guards (#8002), shell command validation

## 📋 Backlog & Roadmap

### Đang ưu tiên
1. **Context stability** - fix pollution/corruption bugs (#8022, #8009, #8040)
2. **Provider compatibility** - GPT-6 params (#8090), DeepSeek recovery (#8010), Moonshot schemas (#7962)
3. **Desktop stability** - multi-instance (#8033), WebView2 resilience (#8094)
4. **Plugin architecture** - DingTalk pilot (#8113) → more channels pluginizable

### Technical debt
- Event loop blocking operations - skill downloads (#8055), embedding batches
- Static catalog vs runtime probing - local models get wrong windows (#7979)
- Timezone handling - DST-aware timestamps (#8050)
- Binary/internal file ingestion - grep/file tools (#7988)

### Observability gaps
- Langfuse tool output missing (#7964)
- Silent fallbacks (#8103)
- Truncation not surfaced (#8096)
- Context meter incomplete for cached tokens (#8057)

---

**Tổng quan**: Heavy bug fixing cycle - nhiều critical issues về context corruption và provider compatibility. Không có breaking changes hay features lớn. Focus: stability + compatibility.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*