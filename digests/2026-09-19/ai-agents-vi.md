# Bản tin Hệ sinh thái Hermes Agent 2026-09-19

> Issues: 114 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-19 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-19

## 📊 Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào sửa lỗi hệ thống: 30 PR mới (chủ yếu bug fixes), 50 issue nổi bật từ backlog 114 issue. Các vấn đề nóng: gateway restart race condition, memory provider cross-profile leak, Desktop preview timeout regression. Cộng đồng đóng góp plugin catalog và i18n Indonesia.

---

## 🚀 Releases

Không có release trong 24h qua.

---

## 📈 Tiến độ dự án

### PRs quan trọng (30 PRs)

**Ổn định hệ thống core:**
- **#115513** - Fix MCP stdio child death → zero-timeout spin → gateway starvation. Thread saturated by `asyncio.wait(timeout=0)` loop. Break to reconnect path.
- **#115567** - Fix kanban reaper failure-limit. Dispatcher limit=1 allowed retry twice; large limit caused premature `gave_up`. Port #97991 logic.
- **#115557** - Fix gateway startup watchdog firing mid-check. PRAGMA quick_check on big state.db ran without lease renewal. Add sqlite progress handler.
- **#115564** - Fix delegation abandoned/error state never persisted terminal status. Liveness showed live forever. Map to completed/failed/cancelled at write time.

**Desktop & UI:**
- **#112834** - Stop Desktop forced wake reconnects churning live sockets. Multi-profile sessions remounted every 2-5s. Root: aggressive wake ping + socket replace on peer change + setState during render.
- **#115552** - Render GFM tables in dashboard (was literal pipe chars). Port TUI table contract.
- **#115462** - Desktop prompt clip double-expands on click, collapses on mouse move. Expand/collapse fired together.

**Auth & security:**
- **#87258** - Matrix auto-join skipped inviter allowlist on restart reconciliation. Apply gate to `_schedule_pending_invite_joins`.
- **#115561** - Add `hermes auth rename` command. No way to rename credential label without remove+re-add cycle.

**Platform adapters:**
- **#84210** - Telegram media retry. First send failed "could not be downloaded (TimedOut)", resend succeeded. No retry wrapper on getFile.
- **#115555** - Discord `/update` prompt duplicated body in embed description + content. Drop description, keep content only.

**Cộng đồng:**
- **#115566** - Add Pixel Worlds desktop plugin to catalog (pixel art scenes, data-only realm packs).
- **#93632** - Seed Bahasa Indonesia Docusaurus locale (landing + 2 guides).
- **#113739** - Add search1api plugin (5 web tools: unified search, news, images, video, shopping).

**Xu hướng:** Sửa lỗi runtime stability (gateway/MCP/desktop) > thêm tính năng. Cộng đồng đóng góp plugin + i18n tăng.

---

## 🔥 Điểm nổi bật cộng đồng

### Issues nhiều tương tác

**#110054** (P1, 3💬) - Pain cluster: deleted-WAL guard fires, no in-product recovery. 4 Discord threads, 13 issues tuần này. User restart/ask-agent/doctor --fix làm tệ hơn. Cần recovery flow trong app.

**#109417** (P2, 11💬) - Profile multiplexing tracking issue. Goal: một `hermes gateway run` serve mọi profile dưới `profiles/`. End state: multiplexing-only mode, bắt buộc migration.

**#83617** (P1, 7💬, 4👍) - Space key swallowed in session rename dialog. Sidebar drag left dnd-kit KeyboardSensor armed. P1 vì rename broken, không có workaround.

**#115061** (P2, 6💬) - Truncated tool-call JSON not repaired. Deepseek-v4-flash stream cắt arguments mid-JSON. No repair logic. Plugin buttons lack native callback.

**#115306** (P2, 2💬) - Gemini keys từ Google AI Studio không work sau update `1e4952ddba`. Revert về `98f758ae7e` fixed. Keys bắt đầu `AQ.`.

**Vấn đề user quan tâm:**
- Gateway restart stability (race condition, stale sys.modules)
- Desktop session switching/preview/streaming bugs
- Cross-profile env/auth leaks
- Kanban worker lifecycle isolation

---

## 🐛 Ổn định & Bugs

### Critical (P1)

**Gateway/core:**
- **#115165** - Windows update complete, gateway restart died on ImportError từ stale sys.modules. No gateway running sau update.
- **#113270** - Profile-scoped auth gates leak cross-profile. Spawned children inherit parent's `DISCORD_*/TELEGRAM_*/GATEWAY_ALLOW*`.
- **#91547** - `hermes gateway restart` race port, runs indefinitely no API server. New gateway lost bind race, logged WARNING, continued.

**Desktop:**
- **#113245** - Desktop preview regression. Embedded preview opens OK, `drive_preview` timeout no GUI answered.

**Session state:**
- **#105574** - Context compressor Pass 4 clips tool-call args pre-send. Long strings trong delegate_task args cắt. 5 subagent nhận corrupted instructions.

### Medium (P2)

**Install/update:**
- **#109573** - Leftover `fleet_restart_pending` marker báo restart incomplete dù successors verified.
- **#115363** - Non-interactive `hermes update` stash local mods, never restore. No notice at update time.
- **#101789** - Windows desktop update fails final swap. Third-party process CWD inside `release\win-unpacked` block rename (SogouCloud.exe).

**Platform:**
- **#105560** - Windows computer_use infer unusable bounds_scale từ raw UIA frames. Contradictory model guidance.

**Patterns:** Runtime stability > install/update flow > platform-specific edge cases.

---

## 💡 Yêu cầu tính năng

**P2-P3 features:**

**#78307** - Memory lifecycle management. Inspection, health, dedup, consolidation, conflict detection, cleanup. User cần bounded memory store maintenance UX.

**#50044** - WeChat web-based QR onboarding. Bring parity với Telegram. Hiện tại cần terminal/CLI.

**#50745** - iOS app cho remote session access. Continue sessions từ computer.

**Plugins:**
- **#115562** - Declarative TUI cards + command actions. Plugins return `PluginCard`, host render + attribution.
- **#27601** - Webhook bearer token auth. Support `Authorization: Bearer <secret>`. Hiện có HMAC/GitLab-token.

---

## 👥 Phản hồi người dùng

**Pain points (từ #110054 cluster):**
- Session state corruption recovery không có in-product flow
- Desktop users lost khi WAL guard fires
- `hermes doctor --fix` làm tệ hơn trong case này

**Platform-specific:**
- Windows update reliability concerns (sys.modules, directory locking)
- Telegram/WhatsApp media download transient failures
- Matrix invite security gap in reconciliation path

**Positive:**
- Cộng đồng contribute plugins (search1api, pixel-worlds)
- i18n expansion (Bahasa Indonesia)
- Desktop stability improvements acknowledged

---

## 📋 Backlog & Roadmap

**Immediate (từ PR activity):**
1. Gateway restart stability (#115165, #91547)
2. Profile isolation (#113270 - security)
3. Desktop preview regression (#113245)
4. Session recovery UX (#110054 cluster)

**Short-term (P1-P2 open issues):**
- WeChat QR onboarding (#50044)
- Memory lifecycle tools (#78307)
- Windows update robustness (#101789, #115165)

**Long-term (tracking issues):**
- Profile multiplexing forced migration (#109417)
- Mobile app (#50745 - duplicate, community interest)

**Tech debt visible:**
- Cross-profile env/auth isolation (nhiều issues: #73085, #78497, #113270)
- Kanban worker lifecycle (#74583, #68173, #73117)
- Desktop streaming/session-switch stability (#84997, #112834)

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-19

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang bước vào giai đoạn **stabilization và hardening**. Không còn race tính năng mới - focus chuyển sang:

- **Reliability**: Gateway stability, memory leak, subprocess lifecycle
- **Security**: Auth isolation, prompt injection, provenance tracking  
- **Scale**: Large fleet performance (>600 agents), context management
- **DevEx**: Live plugin reload, better error messages, multi-tenancy

**Hai trận chiến chính:**
1. **Runtime stability** (Hermes, OpenClaw, QwenPaw) - memory leak, gateway restart, subprocess zombie
2. **Security boundaries** (Zeroclaw dẫn đầu) - channel provenance, plugin isolation, approval enforcement

Projects mature khác nhau: Zeroclaw architecture-focused, Hermes/OpenClaw firefighting production bugs, nhóm nhỏ (NanoBot, PicoClaw) maintenance mode.

---

## 2. 📋 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity Level | Focus Area |
|-------|--------|-----|----------|----------------|------------|
| **Hermes Agent** | 114 | 500 | 0 | 🔥🔥🔥 High | Gateway stability, Desktop bugs, cross-profile isolation |
| **OpenClaw** | 94 | 500 | 1 | 🔥🔥🔥 High | Large fleet scale (632-agent), SQLite WAL, auth reliability |
| **QwenPaw** | 15 | 50 | 1 | 🔥🔥 Medium-High | Security (prompt injection), performance cache, multi-tenant roadmap |
| **Zeroclaw** | 9 | 50 | 0 | 🔥🔥 Medium-High | Security architecture (provenance, sealed registry), runtime hardening |
| **NanoBot** | 5 | 14 | 0 | 🔥 Medium | WebUI/Discord bugs, lifecycle cleanup |
| **IronClaw** | 1 | 2 | 0 | 🔥 Low-Medium | OAuth config race, Reborn storage refactor |
| **NanoClaw** | 7 | 5 | 0 | 🔥 Low-Medium | Memory leak (critical unfixed), Slack token rotation |
| **PicoClaw** | 1 | 4 | 0 | ⚪ Low | QQ Channel attachments, maintenance |
| **NullClaw** | 0 | 0 | 0 | ⚪ Inactive | - |

**Community engagement (reactions + comments):**
- **QwenPaw**: 30 comments trên Hub multi-tenant discussion (#7318)
- **OpenClaw**: 30 comments trên process leak (#97616)
- **Hermes**: 11 comments trên profile multiplexing (#109417)
- **Zeroclaw**: Low external engagement, maintainer-driven
- **Nhóm nhỏ**: 0-2 comments/issue, minimal community

---

## 3. 🎯 Vị thế của Hermes Agent

### Strengths
- **Activity volume highest**: 114 issues, 500 PRs - ecosystem lớn nhất
- **User-facing focus**: Desktop app, multi-channel (Matrix, Telegram, Discord), end-user pain points
- **Rapid iteration**: 30 PRs trong ngày, bug fixes nhanh

### Weaknesses  
- **No release hôm nay** - OpenClaw và QwenPaw ship beta
- **Reactive mode**: Sửa bug > architecture work. Gateway restart race, memory leak, cross-profile leak chưa fix hết
- **Backlog debt**: 114 issues, pain cluster #110054 (WAL corruption) không có recovery UX
- **Architecture concerns**: Cross-profile isolation broken (#113270), kanban worker lifecycle messy

### Position trong ecosystem
Hermes = **mainstream workhorse**. Volume lớn, user base rộng, nhiều channels/platforms. Nhưng đang pay technical debt - stability chưa bằng Zeroclaw, scale chưa bằng OpenClaw testing (632-agent fleet).

**Risk**: Nếu không resolve gateway/memory issues, users migrate sang OpenClaw (có doctor improvements, live plugin management).

---

## 4. 🔧 Hướng kỹ thuật chung

### Trends xuất hiện đồng loạt:

**1. Runtime stability cấp bách**
- **Gateway lifecycle**: Hermes (#115165 stale sys.modules), OpenClaw (#149538 event loop starvation), NanoClaw (#3455 watchdog false positive)
- **Memory management**: OpenClaw (#143524 WAL growth 2.8GB), NanoClaw (#3716 OOM crash loop), Hermes (memory provider leak #113270)
- **Subprocess cleanup**: OpenClaw (#97616 zombie accumulation), NanoClaw (watchdog kill busy agent)

**2. Security boundaries**
- **Zeroclaw leading**: Sealed tool registry (#10910), channel provenance (#10907), approval enforcement (#10937)
- **QwenPaw catching up**: Prompt injection guardian (#7864), context persistence isolation (#7211)
- **Others lagging**: Hermes cross-profile auth leak (#113270), OpenClaw SecretRef subprocess fail (#148650)

**3. Large-scale challenges**
- **OpenClaw pioneer**: 632-agent fleet, 12-min boot regression (#148529), /health timeout (#149538)
- **Hermes exploring**: Profile multiplexing (#109417) cho multi-profile single gateway
- **QwenPaw**: Hub multi-tenant roadmap (#7318, 30 comments)

**4. Developer experience**
- **OpenClaw v2026.9.5**: Live plugin reload không cần restart
- **Hermes**: Desktop preview timeout (#113245), session rename broken (#83617)
- **QwenPaw**: Hot reload rollback-safe (#7565), slash command UX fix

**5. Context management**
- **Universal pain**: Overflow handling unclear (OpenClaw #9409), compaction drop user turn (QwenPaw #7836), codex replay old images (OpenClaw #144556)
- **No standard solution** - mỗi project tự fix

---

## 5. 🔍 Điểm khác biệt

### Chiến lược sản phẩm

**Hermes**: End-user consumer app
- Desktop client, multi-channel onboarding (QR codes), GUI-first
- Pain: Cross-platform bugs (Windows update fail, macOS specific issues)

**OpenClaw**: Self-hosted production platform  
- Doctor CLI cho ops, 632-agent fleet testing, enterprise reliability focus
- Pain: Large fleet scale, SQLite performance, auth rotation

**Zeroclaw**: Security-first framework
- ADR-driven architecture, provenance contracts, risk-labeled PRs
- Low community engagement - maintainer-driven design

**QwenPaw**: Developer toolkit + Hub SaaS
- Multi-tenant roadmap, plugin ecosystem, Creator control plane
- Balance community (30 comments) + security (prompt injection fix)

### Tính năng đặc trưng

| Project | Unique Feature | Stage |
|---------|----------------|-------|
| **Hermes** | Desktop app + Matrix auto-join | Production, buggy |
| **OpenClaw** | Live plugin reload | Shipped v2026.9.5 |
| **Zeroclaw** | Sealed tool registry, provenance | Architecture phase |
| **QwenPaw** | Creator video control plane | In development #7874 |
| **IronClaw** | Reborn multi-profile storage | Refactor #7456 |
| **NanoBot** | Jev shell guard (opt-in) | Experimental #5815 |

### Community maturity

**Tier 1 (active, engaged)**
- **QwenPaw**: 30-comment discussions, 4 👍 trên Hub multi-tenant
- **OpenClaw**: 30 comments trên critical bugs, reproducible reports

**Tier 2 (maintainer-driven)**
- **Zeroclaw**: 0 external contributors visible, all PRs từ @henrypark133
- **Hermes**: High volume, low deep engagement (max 11 comments)

**Tier 3 (minimal)**
- **NanoBot, PicoClaw, NanoClaw, IronClaw**: 0-2 comments, stale issues

---

## 6. 📈 Mức độ trưởng thành cộng đồng

### Indicators

**QwenPaw**: Mature
- Multi-stakeholder discussion (Hub multi-tenant)
- Security disclosure + fast fix (#7859 → #7864 trong ngày)
- Test coverage sprint (+2475 cases)
- Beta → GA process rõ ràng

**OpenClaw**: Mature operations
- Detailed bug reports với logs (632-agent fleet data)
- Doctor CLI cho self-service recovery
- Release notes comprehensive (v2026.9.5)

**Hermes**: Large but fragmented  
- High volume, nhưng pain cluster #110054 (13 issues tuần này) chưa có organized response
- Community contribute plugins (pixel-worlds, search1api) + i18n (Bahasa Indonesia)
- Lack coordinated architecture direction

**Zeroclaw**: Expert-driven, closed
- ADR process, RFC discussions (#10930, #10929)
- No external contributors
- Risk: single-maintainer bottleneck

**Nhóm nhỏ (NanoBot, NanoClaw, PicoClaw, IronClaw)**: Early/stagnant
- Issues không được triage, PRs nằm 6 tháng
- No roadmap public
- Minimal user feedback loop

### Health signals

✅ **Healthy:**
- QwenPaw: Beta process, test coverage, security response time
- OpenClaw: Large fleet testing, doctor improvements, live reload

⚠️ **At risk:**
- Hermes: Technical debt mounting, no release, gateway stability critical
- NanoClaw: Production OOM unfixed (#3716), no PR assigned

❌ **Concern:**
- PicoClaw: 6-month PR merge cycle, stale bot active
- NullClaw: Inactive

---

## 7. 🔮 Tín hiệu xu hướng

### Short-term (1-3 tháng)

**1. Reliability crisis resolution**
- Hermes phải ship gateway restart fix, memory leak fix, cross-profile isolation - hoặc lose users
- OpenClaw large fleet performance sẽ set bar cho industry (632-agent benchmark)
- NanoClaw fix OOM hoặc die

**2. Security baseline tăng**
- Zeroclaw provenance model sẽ lan rộng (QwenPaw đang adopt guardian pattern)
- Prompt injection defense standard (QwenPaw #7864 pattern)
- Auth isolation critical (Hermes #113270, OpenClaw #148650)

**3. Multi-tenancy wave**
- QwenPaw Hub (#7318 roadmap)
- Hermes profile multiplexing (#109417)
- IronClaw Reborn storage refactor (#7456)

### Mid-term (3-6 tháng)

**1. Plugin ecosystem consolidation**
- OpenClaw live reload standard → Hermes phải match
- Zeroclaw sealed registry security model filter thành best practice
- Plugin catalog curation (Hermes community contributes, cần quality gate)

**2. Context management standards**
- Shared pain points sẽ converge solution:
  - Agent-controlled compaction (QwenPaw #7733)
  - Fallback trigger (OpenClaw #9986)
  - Better overflow UX (OpenClaw #9409)

**3. Scale differentiation**
- OpenClaw focus enterprise (>500 agents)
- Hermes focus individual/small team
- QwenPaw focus SaaS multi-tenant

### Long-term (6-12 tháng)

**1. Consolidation winners**
- **Tier 1**: OpenClaw (reliability + scale), QwenPaw (security + multi-tenant)
- **Tier 2**: Hermes (nếu fix debt), Zeroclaw (nếu open up)
- **Sunset risk**: NanoBot, PicoClaw, NanoClaw (low velocity, unfixed critical bugs)

**2. Architecture patterns emerge**
- Zeroclaw provenance + sealed tools → industry standard
- OpenClaw doctor CLI + live reload → ops best practice
- QwenPaw multi-tenant Hub → SaaS template

**3. Community-driven innovation**
- Plugin ecosystems mature (catalog, security review, versioning)
- Cross-project tool interchange (standardized tool schema?)
- Shared test suites cho reliability benchmarks

---

## 🎯 Kết luận chiến lược

### Hermes Agent - Critical decisions needed:

**Immediate (tuần này):**
1. Ship gateway restart fix (#115165, #91547) - P0 blocker
2. Fix memory leak (#113270 cross-profile, memory provider)
3. Desktop preview regression (#113245)

**Short-term (tháng này):**
1. Session recovery UX (#110054 cluster) - 13 issues, no recovery flow
2. Release cycle resume - đang thua OpenClaw (v2026.9.5) và QwenPaw (v2.2.2-beta.1)
3. Profile multiplexing ship (#109417) - differentiate vs others

**Strategic choice:**
- **Option A - Consumer focus**: Double down Desktop, multi-channel, end-user UX. Risk: OpenClaw eat self-hosted market
- **Option B - Reliability pivot**: Match OpenClaw stability, target SMB production. Risk: abandon consumer differentiation
- **Option C - Hybrid**: Fix critical bugs, slow feature adds, wait market shake out

**Recommendation**: **Option C** - stabilize core, ship multiplexing, watch OpenClaw/QwenPaw traction. Decision point Q1 2027 khi winners clear.

### Ecosystem outlook

**Winners:** Projects ship reliability + security + scale together  
**Losers:** Projects stuck firefighting OR stuck in architecture paralysis  
**Dark horse:** Zeroclaw nếu open community, security model compelling

Hệ sinh thái mature - playground phase over, production readiness deciding factor.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-09-19

## 1. Tóm tắt hôm nay

Release 2026.9.5 vừa phát hành với focus vào upgrade an toàn hơn và plugin management. Maintainer team xử lý hàng loạt bug critical về Gateway stability, memory, và auth. Cộng đồng report nhiều vấn đề về context overflow, rate limiting, và subprocess leaks.

## 2. Releases

**v2026.9.5** (2026-09-19)

Highlights:
- **Doctor improvements**: Giữ session history qua upgrade, fix repeated-repair state, tránh stall Gateway khi starting (#149741, #149956, #148901)
- **Live plugin management**: Install/reload plugin không cần restart Gateway, update tools trong active agent
- SQLite WAL checkpoint fixes
- Auth profile rotation cho plugin LLM calls
- Codex sandbox process settlement

## 3. Tiến độ dự án

### PRs quan trọng đang review:

**Merged/Active:**
- #152366: Optimize usage reports với nhiều session (size: M)
- #152365: Fix hooks CLI lifecycle fixtures
- #152349: Restore fs-safe native support sau update fallback (P2, 🦐)
- #152343: Semantic context loss checks với typed judgments (P3, 🦪)
- #152341: Keep healthy DB open 30 phút thay vì 1 phút (P2, 🐚)

**Compatibility risks:**
- #149596: Accept cgroup-v1 trong update triage (merge-risk: 🚨 compatibility)
- #147544: Preserve replaced clone directories (merge-risk: 🚨 compatibility)
- #151764: Settle Codex sandbox processes (merge-risk: 🚨 compatibility)

**Xu hướng**: Focus vào stability (memory leaks, subprocess management, DB performance), auth reliability, và developer experience (live plugin reload).

## 4. Điểm nổi bật cộng đồng

### Issues hot nhất (theo comments):

1. **#97616** (30 comments, 👍1): **[P1]** OpenClaw leak unreaped child processes → zombie accumulation
   - Regression, đang là P1 blocker
   - Impact: message-loss, crash-loop

2. **#149361** (22 comments): WebUI performance umbrella issue
   - Track nhiều perf problems desktop + mobile
   - Maintainer-owned

3. **#149538** (19 comments): **[P0]** Gateway ready nhưng never serve, /health timeout (632-agent fleet)
   - Main branch 1611ca6d
   - Event loop starved, RSS climb → OOM

4. **#148529** (12 comments): **[P1]** Gateway boot ~12 phút trên 632-agent fleet (2026.9.4)
   - Regression từ 2026.7.1-2 (~2s)
   - Đã CLOSED

5. **#143524** (12 comments): **[P0]** SQLite WAL grow 1.4–2.8 GB trong vài ngày
   - Windows, 2026.9.2/9.3
   - `wal_autocheckpoint=1000` không chạy

## 5. Ổn định & Bugs

### Critical (P0):

- **Gateway stability**:
  - #149538: Gateway event loop starved với 632-agent fleet
  - #143524: SQLite WAL không checkpoint, grow unbounded
  - #143334: Subagent completion delivery lost → requester park trong settle-yield
  - #152296: OpenAI profile=- sau Gateway recovery (401 Missing bearer)
  - #149804: macOS app loop `token_missing` forever sau v2 token migration

- **Update failures**:
  - #152252: Config write stamp migration marker → older Gateway exit 78
  - #141273: `openclaw update` leave stale run stuck → block repair
  - #151546: 2026.9.3→9.4 fail nhiều stage khác nhau trên 38-agent install

### High priority (P1):

- **Process management**:
  - #97616: Hook/tool child process leaks
  - #148650: Memory indexer subprocess cannot resolve SecretRef (401)

- **Performance**:
  - #150231: e2e fixtures transpile 340s/case via Jiti
  - #152358: Memory path search full-scan 36 phút → block event loop

- **Auth**:
  - #148559: gpt-5.4-nano resolve to indeterminate route → reject every credential
  - #145719: Subscription 429 với multi-hour Retry-After block turn thay vì rotate profile

### Regressions:

- #152121: Telegram post-reply error banner sau successful reply (2026.9.4 / Node 24.21.0)
- #144556: Codex Telegram photo follow-up replay older images

## 6. Yêu cầu tính năng

### Top requests:

**Models & Auth (P2-P3):**
- #10687 (9 comments, 👍3): Fully dynamic model discovery (OpenRouter + beyond)
- #9986 (5 comments): Trigger model fallback khi context length exceeded
- #9865: Batch API support cho background tasks (50% cost saving)

**UX/Integration:**
- #7406 (4 comments, 👍1): Human-readable Telegram topic names trong session dropdown
- #9637 (6 comments): Accessibility config disable emojis/unicode trong TUI (screenreader users)
- #9409 (4 comments, 👍3): Better context overflow error với specifics (used tokens vs limit)

**Control & Monitoring:**
- #9912 (6 comments, 👍1): `maxTurns`/`maxToolCalls` config limit agent iterations
- #9797 (3 comments): `queue_status` tool cho intelligent task dispatch
- #116547 (3 comments): Wire `adoptionStallTimeoutMs` to Slack config (5-min default dead-letter follow-ups)

**Advanced:**
- #9607 (4 comments): Himalaya skill email formatting philosophy
- #9656 (2 comments, 👍1): Handle Signal message edits (editMessage envelope)
- #9835 (2 comments, 👍3): Telegram reactions two-way support với prompt guidance
- #9544 (2 comments, 👍1): Move away từ `useMultiFileAuthState` trong Baileys (security + perf)

## 7. Phản hồi người dùng

### Pain points chính:

1. **Large fleet scaling**: Gateway performance degrade nghiêm trọng với >600 agents
   - Boot time 12 phút (#148529)
   - /health timeout (#149538)
   - SQLite WAL growth (#143524)

2. **Update reliability**: Nhiều failure modes khác nhau
   - Rehearsal budget caps (#151546)
   - Migration marker compatibility (#152252)
   - Stale run state (#141273)

3. **Auth complexity**:
   - Rate limit không rotate profiles properly (#145719)
   - SecretRef không work trong subprocesses (#148650)
   - Profile resolution unclear (#148559)

4. **Context management**:
   - Overflow errors unclear (#9409)
   - No fallback trigger (#9986)
   - Codex replay old images (#144556)

### Positive signals:

- Live plugin management được đón nhận tốt (2026.9.5)
- Community đóng góp nhiều reproducible bugs với detailed logs
- Maintainer response time nhanh, nhiều fixes trong ngày

## 8. Backlog & Roadmap

### Immediate priorities (based on P0/P1):

**This week:**
- Fix Gateway event loop starvation (#149538)
- Resolve SQLite WAL checkpoint (#143524)
- Process leak cleanup (#97616)
- Update rehearsal budget flexibility (#151546)

**Next sprint:**
- Dynamic model discovery (#10687)
- Auth profile rotation trong plugins (#152360)
- Memory indexing performance (#152358)
- WebUI performance umbrella (#149361)

**On radar:**
- Batch API support (#9865)
- Better context overflow UX (#9409, #9986)
- Telegram/Signal message edits (#9656)
- Accessibility improvements (#9637)

### Technical debt:

- Baileys auth state migration (#9544)
- Cgroup-v1 compatibility (#149596)
- Plugin loading staleness (#152340)
- Empty task pages (#152180)

---

**Metrics snapshot:**
- 94 open issues (50 displayed)
- 500 PRs (30 displayed)
- 1 release today
- Top concern: stability với large fleets + auth reliability

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-19

## 1. Tóm tắt hôm nay

Ngày tập trung sửa bug WebUI và Discord. 8 PR merged, chủ yếu fix vấn đề UI/UX (mobile tap, restart prompt) và runtime cleanup. Issue #1663 (Discord reply parity) đóng sau 6 tháng.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PRs merged (8):**

- **#5810** - Fix WebUI catalog: channel filter bị ẩn khi chỉ bật WebUI
- **#5812** - Fix recovery continuation không chạy vì flag sai
- **#5800** - Discord reply parity: thêm `replyToMessage` giống Telegram
- **#5794** - Fix cross-session bug: response A hiện trong session B
- **#5495** - Đóng Linear channel PR sau 1 tháng, xung đột

**PRs đang review (6):**

- **#5815** - Thêm Jev shell guard qua OpenRouter Decisions API (opt-in)
- **#5811** - Refactor: subagent chạy qua private session thay vì runner riêng
- **#5809** - Fix WebUI /stop không xóa follow-up journal, khiến restart requeue lại
- **#5807** - Discord: cleanup reaction task khi stop
- **#5805** - Mobile: fix chat row không tap được lần 1
- **#5814** - WebUI: xóa gap footer trong intermediate answer
- **#5813** - WebUI: xóa restart prompt cũ sau reconnect
- **#5803** - Telegram: fix newline render, thêm topic_id vào `my` tool
- **#5780** - Tắt context compaction notification tự động

**Xu hướng:** Sprint sửa lỗi WebUI và channel runtime. Nhiều fix lifecycle (stop/restart/reconnect). Refactor subagent architecture lớn đang review.

## 4. Điểm nổi bật cộng đồng

Không có issue/PR nào breakout tương tác. Issue #5798 (1 comment), #5771 (1 comment), còn lại 0 comment/reaction.

## 5. Ổn định & Bugs

**Đã fix:**
- Cross-session response leak (#5794)
- Mobile chat row tap không hoạt động (#5805)
- Discord reaction task rò rỉ sau stop (#5807)
- WebUI restart prompt dính sau reconnect (#5813)

**Đang fix:**
- **#5798** - Response bị lẫn giữa session (có thể trùng #5794?)
- **#5808** - /stop trong WebUI không hủy follow-up, restart requeue lại
- **#5771** - iOS mobile tap session cần 2 lần
- **#5806** - Discord reaction task không cleanup

## 6. Yêu cầu tính năng

- **#5815** - Shell safeguard qua Jev/OpenRouter (opt-in)
- **#1663 → #5800** - Discord reply parity (đã merge)
- **#5495** - Linear channel integration (đóng do conflict)

## 7. Phản hồi người dùng

- **@wowowowowowowowonojieba** (#5798): Session mixing bug, downgrade từ 0.3.5 về 0.3.0
- **@morandot** (#5771): iOS mobile UX kém, tap không responsive
- Ít engagement: các issue/PR không có discussion

## 8. Backlog & Roadmap

Không có thông tin roadmap rõ ràng. Dựa PR:

- **Đang làm:** Stabilize runtime lifecycle (stop/restart/cleanup)
- **Refactor lớn:** Subagent architecture (#5811) - chuyển sang private session model
- **Security:** Jev shell guard đang thử nghiệm
- **Channel:** Discord/Telegram parity tiếp tục

**Nợ kỹ thuật:** Nhiều edge case runtime (reaction cleanup, follow-up recovery, session isolation) cho thấy architecture chưa chắc chắn ở boundary.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-09-19

## 1. Tóm tắt hôm nay

Zeroclaw đóng 3 PR quan trọng về runtime security (sealed tool registry #10910, channel provenance #10907, image token estimation #10890). Nhiều hoạt động tập trung vào bảo mật channel, cost tracking, và Mattermost channel purpose injection (PR #10946 merged).

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Merged hôm nay:**
- #10910: sealed tool-registry parity contract recorded ✅
- #10907: channel provenance stamping ✅  
- #10890: fix image token cost estimate ✅
- #10946: Mattermost channel purpose injection ✅

**PR đang active - security/architecture:**
- #10931 (risk:high): bounded Windows service logs - prevent unbounded stdout/stderr accumulation
- #10937 (risk:high): bounded child agent approval enforcement - delegate tools need fresh approval manager
- #10823 (risk:high): atomic batch config writes via `config/set-many`
- #9584 (risk:high): plugin egress grant ceremony

**PR đang active - provider/runtime fixes:**
- #10904: gate no-vision error only when image markers resolve
- #10903: keep tool-result images live for current turn
- #10953: preserve signed reasoning through sanitizers
- #10864: close OpenCode session header gaps

**PR đang active - UX/performance:**
- #10879 (size:XL): combine Sessions/Queue/Plan in one dock (ZeroCode)
- #10648: reduce repeated label rendering work
- #10672: avoid duplicate streamed responses
- #10964: fix double config refresh after save

## 4. Điểm nổi bật cộng đồng

**RFC discussions (needs-maintainer-review):**
- #10930: durable primitive for agent-to-human questions - consolidate around SOP gate pattern
- #10929: delivery receipts for outbound messages - no current id/confirmation mechanism

**Stacked work:**
- #10724: configurable Anthropic prompt-cache TTL (stacked on #10623)
- Multi-model support (#9809) waiting author action - size:XL architectural change

## 5. Ổn định & Bugs

**Critical fixes (S0/S2):**
- #10966 (NEW, S0): Git `--attr-source` can hide mutating subcommand from approval - security risk
- #10951 (S2): ZeroCode config double-refresh (fix in #10964)
- #10950 (S2): `cost.warn_at_percent` warnings ignored by runtime
- #10948 (S2): interruption-scope key collision across components

**In-progress fixes:**
- #10502: relocate tool-result images for OpenAI-compatible 400 errors
- #10775: preserve sessions when mode replacement fails
- #10811: preserve Windows PowerShell analysis cache

## 6. Yêu cầu tính năng

**Accepted/in-progress:**
- #10891 (risk:high): carry channel provenance through runtime admission - slice 1 of #6971
- #10640: passive Telegram group context (needs-author-action)
- Token accounting on history-trim events (#9713)

**Architecture tracking:**
- #8691: ADR inventory and accepted RFC decision records

## 7. Phản hồi người dùng

Không có issue mới từ end-users. Activity tập trung ở maintainer-driven security hardening và architecture work.

## 8. Backlog & Roadmap

**High-priority pipeline:**
- Complete #6971 provenance contract (slice 1 in #10891)
- Complete #6954 internal-principal envelope (#10425 waiting author)
- Resolve delegate workspace filesystem tools (#10391)
- Expedited merge lane governance (#10677)

**Technical debt:**
- ACP interrupted turn persistence (#10197) - risk:manual, size:XL
- Always_ask survival under Full autonomy (#9724)
- Pre-tool narration delivery (#10722)

**Documentation:**
- #10834: ADR-018 for runtime security provenance boundaries

---

**Trend:** Zeroclaw đang trong giai đoạn hardening bảo mật và architecture - nhiều PR risk:high về provenance, approval boundaries, và plugin isolation. Codebase ổn định, ít bug user-facing mới.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-09-19

## 📊 Tóm tắt hôm nay

Hoạt động nhẹ, tập trung dọn dẹp và đóng PR cũ. PR #1349 về QQ Channel attachment support merged sau 6 tháng. Không có release. Một bug cũ về Feishu config vẫn mở.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**PR đóng:**
- **#1349** (QQ Channel attachments) - merged sau 6 tháng mở
  - Parse emoji structures QQ Channel
  - Xử lý voice/image/video/file từ QQ Channel  
  - Reply với local attachments (upload trước khi gửi)
  - Ưu tiên Markdown reply, fallback plain text

**PR mở chờ review:**
- **#3347** (UI lag fix) - fix lag khi nhiều text trong chat area, test ok trên desktop và mobile
- **#3371** (OpenCode Go provider) - thêm provider riêng cho `opencode.ai/zen/go/v1`, tự động route model dựa theo ID
- **#3222** (DeltaChat refactor) - giảm 200 LOC, drop legacy code, cleanup documentation

**Xu hướng:** Maintenance phase - dọn technical debt, improve stability. Không thấy feature lớn mới.

## 💬 Điểm nổi bật cộng đồng

Không có. Issues và PR không có nhiều interaction (0 👍, 2 comments max).

## 🐛 Ổn định & Bugs

**#3355** (Feishu connection error) - mở từ 2026-09-01, đánh stale
- Lỗi: `config.json contains unknown field(s): channel_list.feishu.app_id`
- User tự giải quyết, đề xuất fix trong issue
- Chưa được maintainer xử lý

**#3347** - UI lag khi chat area nhiều text, đã có fix

## 🎯 Yêu cầu tính năng

Không có feature request mới. PR hiện tại đều là improvements và bugfixes.

## 📣 Phản hồi người dùng

Ít feedback. User @ttghub báo bug Feishu với solution, không thấy follow-up từ team. PR authors test own changes, không có community testing visible.

## 🗺️ Backlog & Roadmap

Không có thông tin roadmap public. Dựa vào PR queue:
- DeltaChat refactor (#3222) - chờ 2.5 tháng
- OpenCode provider (#3371) - chờ review
- UI performance (#3347) - ready to merge

**Nhận xét:** Project velocity chậm. PR cũ nằm lâu, community engagement thấp. Focus vào stability, không push feature mới mạnh.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw ngày 2026-09-19

## 1. Tóm tắt hôm nay

Ngày trầm lắng - không có release. 3 issue mới, tất cả bug báo cáo: CLI nhận model name bất kỳ không validate (#3855), edit file CLAUDE.md bị nuốt im (#3854), docs thiếu 3 lệnh (#3853). Activity tập trung vào issue cũ: memory leak conversation archives (#3735, #3716) vẫn chưa fix.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR active (5):**

- **#3852** (Slack token rotation): fix token expire 12h, không có refresh logic → provisioning fail
- **#3851, #3850** (Codex transport): cho phép config SSE thay WebSocket - proxy issue
- **#3741** (stateless scheduled tasks): thêm flag `--fresh-session` - ngăn cost tăng mỗi đêm vì conversation dài
- **#3420** (macOS statusbar): fix hardcode label `com.nanoclaw` → dùng install slug

**Xu hướng**: focus vào reliability (token, proxy, resource leak). Ít feature mới.

## 4. Điểm nổi bật cộng đồng

Issue **#3735, #3716** (conversation archive unbounded growth) đạt nhiều bình luận nhất (3 mỗi cái). Vấn đề nghiêm trọng: mỗi PreCompact viết full history vào file mới, không rotation, không cap → OOM production crash loop.

Community quan tâm nhất: memory leak khiến agent crash.

## 5. Ổn định & Bugs

**Critical:**
- **#3716**: conversation archive gây OOM - confirmed sản xuất crash loop
- **#3735**: `conversations/` directory grow vô hạn - không retention
- **#3455**: watchdog kill agent đang busy (false positive stuck detection)

**High:**
- **#3714**: env override (auto-compact window, rotation) không forward vào container
- **#3855**: CLI `--model` nhận bất kỳ string, không validate
- **#3854**: edit CLAUDE.md silently discarded

Chưa thấy PR fix cho critical issues.

## 6. Yêu cầu tính năng

**#3741**: `--fresh-session` cho scheduled task - đã có PR, cho phép job chạy stateless thay vì conversation tích lũy.

Không có feature request mới ngày hôm nay.

## 7. Phản hồi người dùng

User report:
- Production crash từ memory leak (#3716) - team DawoudIO
- Proxy WebSocket fail (#3851, #3338) - team ionescu77  
- Scheduled task cost tăng 15%/tuần (#3741) - slambert
- macOS statusbar sai service name (#3420)
- CLI nhận model bất kỳ, không biết list valid (#3855)

Pain point lớn nhất: stability issues production.

## 8. Backlog & Roadmap

Không có roadmap công khai trong data.

**Backlog priorities** (inferred từ issue severity):
1. Fix conversation archive OOM (#3716, #3735) - critical
2. Fix watchdog false positive (#3455) - high
3. Forward env override (#3714) - high  
4. Validate CLI input (#3855)
5. Document missing commands (#3853)

Timeline chưa rõ. Critical bug chưa thấy PR hoặc assign.

---

**Đánh giá**: Project ổn định thấp tuần này. Critical production bug chưa được ưu tiên fix. Community activity thấp (3 issue mới, không merge PR nào). Cần attention leadership.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-09-19

## 🎯 Tóm tắt hôm nay

Hoạt động tập trung vào cải thiện kỹ thuật nội bộ: fix lỗi cấu hình OAuth cho extensions và đại tu kiến trúc storage của Reborn. Không có release mới. PR #8102 vừa mở giải quyết bug activation khi admin dùng Web UI thay vì env vars. PR #7456 (mở từ 08-10) được cập nhật, refactor toàn bộ cách Reborn quản lý durable storage.

## 🚀 Releases

Không có.

## 📊 Tiến độ dự án

**PR #8102** - Fix extensions provider readiness (mới, mở 09-18)
- **Vấn đề**: Gmail/Google Calendar extensions không activate được khi admin cấu hình OAuth client qua Web UI. OAuth flow hoàn tất (consent → code → token) nhưng activation fail với lỗi `Provider not configured`.
- **Root cause**: Extension check provider readiness lúc khởi tạo, không check lại live. Admin config qua UI có race condition với extension init.
- **Fix**: Resolve provider-instance readiness theo thời gian thực, ưu tiên administrator config trước env vars.
- **Ý nghĩa**: Giảm friction cho operators tự triển khai, Web UI trở thành first-class config path thay vì workaround.

**PR #7456** - Reborn durable storage refactor (XL, medium risk, cập nhật 09-18)
- **Scope**: Sandbox, CI, docs, dependencies.
- **Thay đổi cốt lõi**: 
  - Root tất cả Reborn profiles trực tiếp tại `IRONCLAW_REBORN_HOME` với namespaces profile-agnostic: `state/`, `system/`, `workspaces/`, `runtime/`, `logs/`, `cache/`, `tmp/`.
  - Persist security envelope có kiểu dữ liệu để ngăn restart-only profile transitions làm yếu tenancy/workspace isolation.
- **Ý nghĩa**: Chuẩn bị cho multi-tenancy nghiêm ngặt hơn, security-first storage model. PR XL với medium risk → đang test kỹ trước merge.

**Issue #7537** - Generic thinking/effort control (mở 08-12, cập nhật 09-18)
- **Yêu cầu**: Add per-request thinking level control cho LLM, map xuống native params của từng provider.
- **Trigger case**: DeepSeek V4 Flash (0731 checkpoint) trở nên verbose, cần dial down thinking intensity.
- **Design yêu cầu**: 
  - Provider-agnostic API ở request level + model defaults.
  - DeepSeek mapping cần `chat_template_kwargs` để control tokenizer behavior.
- **Trạng thái**: 2 comments, đang discussion, chưa có PR.

## 🔥 Điểm nổi bật cộng đồng

Không có hoạt động nổi bật từ external contributors. Cả 2 PR đều từ @henrypark133 (contributor: core). Issue #7537 có 2 comments nhưng không có reactions/upvotes (👍: 0).

Tính năng thinking control (#7537) có tiềm năng thu hút attention khi có POC - giúp users fine-tune cost/quality tradeoff per-request.

## 🐛 Ổn định & Bugs

**Bug đã xác định đang fix**: 
- OAuth admin config race condition (#8102) - ảnh hưởng operators không dùng env vars. Severity: medium (workaround tồn tại), fix đang review.

**Risk medium PR**: #7456 đang refactor storage foundation → cần QA kỹ để tránh data loss/isolation breach trong production.

## ✨ Yêu cầu tính năng

**#7537 - LLM thinking/effort control**
- **Motivation**: DeepSeek V4 Flash verbose uncontrollably, cần knob để adjust.
- **Scope mở rộng**: Generic solution cho tất cả providers (OpenAI, Anthropic, etc.) thay vì DeepSeek-only hack.
- **Complexity**: Cần map abstraction xuống heterogeneous native params - không phải mọi provider đều có `temperature` hoặc `top_p` equivalent cho "thinking effort".

## 💬 Phản hồi người dùng

Không có feedback trực tiếp từ end-users trong dữ liệu. Issues/PRs chủ yếu internal engineering work. 

Admin config friction (#8102) gián tiếp phản ánh user pain: operators muốn dùng Web UI thay vì phải biết cấu trúc env vars.

## 🗺️ Backlog & Roadmap

**Đang triển khai**:
- Reborn multi-profile storage isolation (#7456) - foundation cho enterprise multi-tenancy.
- Extensions reliability (#8102) - giảm deployment complexity.

**Đang discussion**:
- LLM thinking control (#7537) - chờ consensus về API design trước khi code. Nếu accept, sẽ ảnh hưởng đến tất cả LLM provider adapters.

**Xu hướng**: IronClaw đang đầu tư vào infrastructure stability (storage, config management, provider abstraction) thay vì user-facing features. Giai đoạn consolidation sau growth spurt.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw 2026-09-19

## 1. Tóm tắt hôm nay

Release beta **v2.2.2-beta.1** ra đời. Team tập trung fix bug nghiêm trọng: prompt injection xóa skill (#7859), context scroll eviction mất user turn (#7836), tool output truncation bypass. Batch PR lớn cải thiện performance (cache capability, channel lazy-load) + ổn định (plugin rollback-safe reload, Windows CI fix).

---

## 2. 🎉 Releases

**v2.2.2-beta.1** (2026-09-18)

Tính năng:
- **Grouped chat history** UI cải thiện
- **ReMe slash commands** thống nhất
- **+2475 test cases** (+5.02% coverage) qua channels/visual/routers/runtime/CLI

Beta 1 tập trung **ổn định hóa** 2.2 trước khi GA. Feature mới ít, test coverage và bug fix nhiều.

---

## 3. 📊 Tiến độ dự án

### Xu hướng chính

**Bảo mật & an toàn**
- #7864: chặn prompt injection xóa skill directory (thêm guardian rule)
- #7211: ngăn injected context persist vào history
- #7854: fix driver reload ghi đè concurrent policy update

**Performance**
- #7868: cache immutable artifacts (policy.yaml parse tốn 29ms/request → giờ cache)
- #7807: lazy-load channel modules (Feishu SDK 5.8s → chỉ load khi enable)
- #7762: emit tool result 1 lần thay vì per chunk

**Context management**
- #7872: preserve interrupted requests khi compaction (#7836)
- #7871: fix tool output truncation bypass literal marker

**Plugin ecosystem**
- #7565: plugin hot reload rollback-safe, unload sạch
- #7842: isolate sync hooks + event loop lag watchdog

**Infra**
- #7863: Windows test stabilize (reload + snapshot)
- #7862: CI gate artifact publishing on test pass

**Hub multi-tenant**
- #7833: local runtime CLI, PawApp auth, model defaults fix
- Discussion #7318 tiếp tục (30 comments, 4 👍)

---

## 4. 🔥 Điểm nổi bật cộng đồng

**#7318** (QwenPaw Hub multi-tenant) – 30 comments, active discussion roadmap sau 2.2.0

**#7836** (scroll eviction drops user turn) – 1 👍, critical UX bug khi tool-heavy span gây mất instruction

**#7859** (prompt injection xóa skill) – 0 👍 nhưng **high severity**, đã có fix #7864 → bảo mật là ưu tiên

---

## 5. 🐛 Ổn định & Bugs

### Critical

1. **#7859**: prompt injection in tool-result system-reminder → delete all skills
   - **Fix**: #7864 guardian rule chặn delete/write vào skill/knowledge dirs

2. **#7853**: `ToolResultPruner` skip `type="data"` → base64 image cumulative → context overflow
   - Đang open, chưa fix

3. **#7836**: scroll eviction drop user turn inside tool-heavy span
   - **Fix**: #7872 preserve interrupted requests

4. **#7876**: DeepSeek reject OpenAI `input_audio` content part → 422 → conversation die
   - Đang open, audio-fallback classifier never fires

### Medium

- **#7866**: file-area tab show pre-edit content, session card đúng → **Fix** #7867 revalidate on activation
- **#7838**: `recall_history_python` silent skip khi kernel < 5.13 → **Fix** #7873 add notice
- **#7812**: slash command after startup act on fallback session → đã close
- **#7856**: qwenpaw-pet 0.1.1 drop `actor` arg → tool approval break
- **#7599**: OpenCode Go套餐 MissingSessionID → **Fix** #7869 send session header

### Low

- **#7857**: ACP shutdown fallback skip session cleanup, leak event loop
- **#7858**: unawaited coroutine warnings obscure real defects

---

## 6. 💡 Yêu cầu tính năng

**#7733**: agent-autonomous context management
- Agent không biết khi nào compaction trigger → không warn → fail
- Đề xuất: agent control compaction timing, pre-eviction hook

**#7874 + #7875**: Creator create-video control plane (PR)
- Main Chat tạo Creator project nhưng không complete "make a video" request
- Thêm high-level control plane che dấu project/element IDs

**#7861**: authenticated multi-tab chat terminal (PR)
- Xterm terminal below workspace, independent tabs, conversation-scoped cwd

---

## 7. 💬 Phản hồi người dùng

**Positive**
- #7318: community hào hứng với Hub multi-tenant roadmap
- #7570: Feishu CardKit stream output tốt, đề xuất auto-collapse reasoning

**Pain points**
- Tool output truncation fail khi image base64 cumulative (#7853)
- Slash command UX confusing sau startup (#7812 → fixed)
- OpenCode Go endpoint không hoạt động do missing header (#7599 → fixed #7869)
- Windows test flaky, affecting release confidence (#7863 → fixed)

**Security concerns**
- #7859 (prompt injection) → immediate fix
- #7211 discussion về injected context persistence

---

## 8. 📅 Backlog & Roadmap

### Near-term (2.2.x)

**ổn định hóa cho GA**
- Fix remaining beta bugs (#7853 image pruning, #7876 DeepSeek audio)
- Windows CI stabilize (#7863 done)
- Test coverage sprint tiếp tục

### Mid-term (2.3+)

**Hub multi-tenant** (#7318)
- Team-managed skills, admin console
- Local runtime sandbox per user (#7833 partial)

**Creator control plane** (#7874)
- High-level video creation API

**Agent-autonomous context** (#7733)
- Pre-eviction hooks, agent-controlled compaction

### Long-term

**Plugin ecosystem maturity**
- #7565 hot reload foundation done
- #7842 sync hook isolation + watchdog

---

## 📌 Kết luận

QwenPaw đang phase **stabilization sprint** trước 2.2 GA. Ưu tiên:
1. Security (prompt injection, context persistence)
2. Performance (cache, lazy-load)
3. Reliability (Windows CI, plugin rollback, eviction bugs)

Hub multi-tenant discussion sôi nổi → feature lớn tiếp theo. Community feedback về UX bugs được fix nhanh (slash command, OpenCode header). Test coverage tăng mạnh (+2475 cases).

Risk: #7853 (image base64 overflow) và #7876 (DeepSeek audio) chưa fix → block GA nếu không resolve.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*