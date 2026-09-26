# Bản tin Hệ sinh thái Hermes Agent 2026-09-26

> Issues: 142 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-26 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-09-26

## 📋 Tóm tắt hôm nay

Ngày fix bugs cao điểm - 30 PRs và 50 issues mới, tập trung vào ổn định hóa PM runtime, gateway message delivery, và context compression. Nhiều vấn đề platform-specific (Windows, macOS) được xử lý. Không có release mới.

## 🚀 Releases

Không có release.

## 📈 Tiến độ dự án

### PRs quan trọng đã merge/đang review

**Stability & Core Infrastructure:**
- #123321 - Bind session_id vào plugin command env, fix session tracking trong multiplex mode
- #123320 - Isolate shutdown-notice failures per session, gateway teardown không bị block
- #123317 - Kanban boards declare default workspace kind, fix project-scoped board task creation
- #122638 - Context compaction giữ nguyên unanswered tool round, không bị demote
- #123267 - Preserve archived turns across session adoption/transfer

**Security & Auth:**
- #123319 - Mask URL userinfo trong approval suggestions
- #122424 - Upgrade js-yaml 4.3.1→4.3.2, yaml <2.9→latest (CVE fixes)
- #103694 - Profile OAuth cho single-use providers (anthropic/openai) persist đúng

**Platform fixes:**
- #122183 (P1, Windows) - Gateway trên PM runtime crash vì prepend pre-PM venv
- #122495 - Windows update abort khi profile gateway chạy venv redirector shim
- #120504 - Windows cron `.sh` scripts fail vì resolve WSL stub bash
- #123203 - NVIDIA driver >=580 SwiftShader fallback quá rộng

**Memory & Performance:**
- #123313 - Holographic memory mirror replace/remove, count retrievals
- #90949 - read_file dedup survive context compaction nhưng content đã evict
- #120545 - macOS Fast User Switching blocked 20-30s khi launchd gateway chạy

### Xu hướng phát triển

1. **PM (Package Manager) runtime stabilization** - nhiều edge cases Windows/macOS
2. **Multi-profile hardening** - session scope, auth boundaries, profile isolation
3. **Context compression reliability** - tool round preservation, archived turn persistence
4. **Desktop/Gateway sync issues** - model switch out-of-sync, readiness probe saturation

## 🔥 Điểm nổi bật cộng đồng

**Nhiều tương tác nhất:**

1. **#122183** (16 comments, Windows P1) - PM runtime venv conflict crash gateway
2. **#122656** (7 comments) - Desktop endless update loop kill active chats
3. **#37589** (7 comments, 3👍) - Desktop miss MCP tools, uvx PATH issues macOS
4. **#122299** (6 comments, 3👍) - Kanban worker spawn argv soundness issue

**Pain points người dùng:**
- Windows PM migration breaking existing setups
- Desktop update cycle interrupt active sessions
- MCP server discovery unreliable cross-platform
- Context compression timing issues với tool calls

## 🐛 Ổn định & Bugs

### P1 Critical
- #122183 - Windows gateway crash sau PM migration
- #123229 - Gateway busy-demoted event hot-loop (250/s), DOS discord.com
- #83185 - Gateway crash khi `gateway.platforms` là list (config format standard)

### P2 High Impact
- #122656 - Desktop no-op updater endless loop
- #122299 - Kanban worker spawn unsound cho bare interpreter
- #122490 - Bot-to-bot DM delivery runner thiếu deps
- #107156 - Stale session cwd brick gateway terminal

### Platform-specific clusters
**Windows**: venv handling, cron bash resolution, update identity checks  
**macOS**: Fast User Switching latency, keychain CA trust, uvx PATH  
**Linux**: NVIDIA driver detection quá rộng

## ✨ Yêu cầu tính năng

1. **#88891** (3👍) - delegate_task per-task model/reasoning_effort override
2. **#68680** - pt-BR locale cho Docusaurus docs
3. **#75781** - TUI improve code block visual separation
4. **#118381** - MCP initialize_result.instructions surface to model
5. **#123274** - Desktop audio preview player thay vì refuse binary

## 💬 Phản hồi người dùng

**Deployment experiences:**
- #112646 - Multi-profile managed deployment contributions tracking
- Người dùng chạy "one gateway + agent per profile under separate OS users"
- Fork shrinking strategy: push generic fixes upstream

**UX friction:**
- Desktop markdown parser quirks (lone `~`, bare `$....$` as math)
- Personality selection mask system_prompt overlay
- Profile clone lose bundled-skill manifests
- Custom CSS lost sau mỗi update

**Integration pain:**
- OpenAI-compatible endpoints không expose `/v1/models` hard-fail onboarding
- xAI streaming TTS 4 independent failures stacked
- Bedrock Claude 5 context length underreport 8x

## 📅 Backlog & Roadmap

**Đang được prioritize:**
1. PM runtime stability - Windows venv conflicts, re-exec logic
2. Multi-profile isolation - auth boundaries, session adoption, secret scoping
3. Context compression correctness - tool round preservation, archive persistence
4. Desktop update experience - no-op detection, interrupt recovery

**Technical debt visible:**
- Gateway platform-event handlers hydrate secrets synchronously on event loop
- Binary overwrite checks decide trên controller host thay vì execution target
- Profile OAuth registration transient state không persist
- MCP client registration device-flow `response_types: []` reject by some servers

**Pattern emerging:**
- More durable delegation ledger replay logic
- Heartbeat mechanisms cho sandbox backends carry output
- Redaction improvements (version strings false-positive as phone)
- Skills/plugins symlink-aware resolution

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-26

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 26/09/2026 cho thấy **giai đoạn ổn định hóa sau deployment wave**. Các dự án đều tập trung fix bugs hơn là ship features mới (0 release trong 24h qua từ 9 dự án).

**Phân khúc rõ ràng:**
- **Enterprise-grade**: Hermes Agent, OpenClaw (100+ issues, 500 PRs) - mature codebase, nhiều platform-specific bugs
- **Mid-tier**: NanoBot, NanoClaw, QwenPaw (12-150 issues) - active development, stability issues
- **Niche/Experimental**: Zeroclaw, PicoClaw, NullClaw, IronClaw (<10 issues) - low activity hoặc focused scope

**Pain points chung:** context compression reliability, multi-platform support (Windows/macOS edge cases), update pipeline robustness, message delivery race conditions.

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Tương tác cao nhất | Focus chính | Maturity |
|-------|--------|-----|----------|-------------------|-------------|----------|
| **Hermes Agent** | 142 | 500 | 0 | 16 comments (#122183) | PM runtime stability, security | 🟢 Mature |
| **OpenClaw** | 150 | 500 | 0 | 35 comments (#153257) | Worker isolation, memory leaks | 🟡 Stabilizing |
| **NanoBot** | 4 | 13 | 0 | 2 comments (#5903) | Bug fixes, provider expansion | 🟢 Stable |
| **Zeroclaw** | 9 | 50 | 0 | 1 comment (#11096) | OIDC auth, security audit | 🔴 Critical bugs |
| **PicoClaw** | 2 | 4 | 0 | 0 reactions | Provider expansion | 🟡 Low activity |
| **NanoClaw** | 5 | 50 | 0 | 0 reactions (issues mới) | Post-release patches | 🟡 Stabilizing |
| **NullClaw** | 0 | 1 | 0 | 0 reactions | Safety mechanism fix | 🔴 Very quiet |
| **IronClaw** | 0 | 2 | 0 | 0 reactions | Stagnant | 🔴 Inactive |
| **QwenPaw** | 12 | 13 | 0 | 7 comments (#7628) | Context bugs, binary poisoning | 🟡 Active fixes |

## 3. 🎯 Vị thế Hermes Agent

**Ưu thế:**
- **Scale lớn nhất**: 500 PRs cho thấy contributor base rộng, code coverage đầy tư
- **Enterprise focus**: nhiều P0/P1 issues về multi-profile, PM runtime, deployment - phục vụ organizations lớn
- **Platform maturity**: xử lý edge cases Windows/macOS sâu (Fast User Switching, venv conflicts, keychain trust)
- **Security-first**: CVE fixes nhanh (js-yaml, yaml upgrades #122424), OAuth persistence hardening

**Thách thức:**
- **Complexity debt**: 16-comment thread cho 1 Windows bug (#122183) - platform abstraction chưa đủ
- **Update reliability**: người dùng fear upgrades (giống OpenClaw #153257 8h recovery)
- **Context compression**: vẫn có bugs (#122638, #90949) dù đã nhiều iterations

**Positioning**: **Enterprise-grade general-purpose agent platform**. So với:
- OpenClaw: cùng tier nhưng Hermes ổn định hơn (không có 8h incident như #153257)
- Zeroclaw: Hermes đã shipped OIDC, Zeroclaw mới audit
- QwenPaw: Hermes không gặp binary poisoning issues (#7988)

## 4. 🛠️ Hướng kỹ thuật chung

### Patterns được adopt rộng:

**1. Worker thread isolation** (Hermes #123321, OpenClaw #158235, #158450)
- Tách expensive ops (inference, artifact reads, retention) khỏi main event loop
- Giải quyết UI freeze, gateway timeout issues
- **Risk**: inter-thread message passing overhead, state sync complexity

**2. Context compression improvements** (tất cả projects trừ NullClaw, IronClaw)
- Hermes: preserve unanswered tool rounds (#122638)
- OpenClaw: throttle typing previews (#158552)
- QwenPaw: budget calculation bugs (#7628, #7979)
- **Pain point chung**: balance history retention vs token limits

**3. Multi-provider expansion** (NanoBot #5915, PicoClaw #3393)
- Cost optimization (Cheaper Inference gateway)
- Platform diversity (custom endpoints, self-hosted)
- **Trend**: users demand vendor choice, cost control

**4. Platform-specific hardening**
- Windows: venv handling (Hermes #122183, OpenClaw #154390)
- macOS: Fast User Switching, keychain (Hermes #120545, OpenClaw #158099)
- Linux: NVIDIA driver detection (Hermes #123203)

### Stack technology visible:

- **Gateway architectures**: PM runtime (Hermes), systemd (NanoClaw), LaunchAgent (OpenClaw macOS)
- **Auth**: OIDC migration (Zeroclaw #8289), OAuth persistence (Hermes #103694)
- **Messaging**: Discord, Slack, WhatsApp, Telegram, QQ - multi-channel universal
- **LLM APIs**: OpenAI, Anthropic, xAI, Bedrock, custom endpoints - vendor-agnostic

## 5. 🔍 Điểm khác biệt

### Chiến lược phát triển:

**Hermes Agent**: 
- Ship nhiều, fix nhiều → high velocity với stability focus
- Multi-profile enterprise deployment (#112646)
- Phản ứng nhanh security (CVE trong ngày)

**OpenClaw**:
- Post-incident stabilization mode (sau #153257)
- Worker isolation refactor lớn
- Người dùng sợ update → trust issue

**QwenPaw**:
- Community-driven (nhiều first-time contributors)
- Binary poisoning bug (#7988) nghiêm trọng nhưng analyze chi tiết
- Frustrated users về UX (#7884) → chưa prioritize DX

**Zeroclaw**:
- Security-first (5 S0 bugs phát hiện ngay sau merge #11123-#11127)
- OIDC migration comprehensive
- Low community engagement (maintainer-driven)

**NanoBot/PicoClaw**:
- Lightweight, focused scope
- Slow development (backlog P1 kéo 2 tháng #5204)
- Small community, ít tương tác

**NanoClaw**:
- Fork-friendly architecture (#3902-#3904 hooks)
- Rapid post-release patches
- Routing bugs (#3911, #3908) core logic chưa solid

**NullClaw/IronClaw**:
- Minimal activity (1-2 PRs)
- Niche hoặc experimental
- No community signals

### Tính năng đặc trưng:

| Feature | Hermes | OpenClaw | QwenPaw | Others |
|---------|--------|----------|---------|--------|
| Kanban boards | ✅ (#123317) | ❌ | ❌ | ❌ |
| Holographic memory | ✅ (#123313) | ❌ | ❌ | ❌ |
| Deslop messaging | ❌ | ✅ (#158272) | ❌ | ❌ |
| Binary poisoning fix | ✅ (không thấy bug) | ❌ | ⚠️ (#7988) | N/A |
| OIDC auth | ⚠️ (có OAuth) | ❌ | ❌ | Zeroclaw ✅ |
| MCP tool pagination | ✅ (không thấy bug) | ❌ | ❌ | NanoBot fix (#5916) |

## 6. 👥 Mức độ trưởng thành cộng đồng

### 🟢 Mature Communities (Hermes, OpenClaw):
- **Dấu hiệu**: 100+ issues, 500 PRs, 15-35 comments/thread, nhiều P0/P1 labeled
- **Pain point reporting**: chi tiết repro steps, logs, platform info
- **Engagement**: users track regressions, contribute fixes
- **Trust**: nhưng có fear updates (OpenClaw #153257 → 8h recovery)

### 🟡 Growing Communities (NanoBot, QwenPaw, NanoClaw):
- **Dấu hiệu**: 5-150 issues, first-time contributors, frustration visible
- **QwenPaw**: nhiều Chinese users, emotional feedback (#7884 "知道这个体验多差么？？？")
- **NanoClaw**: fork ecosystem, extension hooks cho customization
- **NanoBot**: P1 backlog kéo dài (2 tháng) → bandwidth thiếu

### 🔴 Emerging/Inactive (Zeroclaw, PicoClaw, NullClaw, IronClaw):
- **Dấu hiệu**: <10 issues, 0 reactions, maintainer-driven
- **Zeroclaw**: security audit phát hiện 5 S0 bugs → code review quality issue
- **PicoClaw**: CLA bot broken block contributions (#3392)
- **IronClaw**: PR tồn đọng 4 tuần (#7988)

### Community health indicators:

| Metric | Hermes | OpenClaw | QwenPaw | Others |
|--------|--------|----------|---------|--------|
| Issue detail quality | 🟢 High | 🟢 High | 🟡 Medium | 🔴 Low |
| PR review speed | 🟢 Fast | 🟡 Slow | 🟡 Variable | 🔴 Stagnant |
| User trust | 🟡 Cautious | 🔴 Broken (#153257) | 🟡 Frustrated | N/A |
| Contributor diversity | 🟢 Wide | 🟢 Wide | 🟢 Growing | 🔴 Maintainer-only |

## 7. 🔮 Tín hiệu xu hướng

### Trends đang nổi:

**1. Worker isolation architecture** 
- Hermes, OpenClaw đều migrate → pattern proven
- Giải quyết performance bottlenecks mà không cần rewrite
- **Dự đoán**: sẽ là standard practice trong 6 tháng

**2. Cost optimization via provider diversity**
- NanoBot, PicoClaw thêm Cheaper Inference (#5915, #3393)
- Custom endpoint support (QwenPaw #7986)
- **Dự đoán**: multi-vendor routing strategies, LiteLLM-style gateways

**3. Context compression arms race**
- Mọi project đều có bugs (#122638, #7628, #158552)
- Balance history retention vs token cost
- **Dự đoán**: compression strategies diverge - Hermes tool-round preservation, QwenPaw pagination (#7542)

**4. Platform-specific bugs never end**
- Windows venv conflicts (Hermes #122183, OpenClaw #154390)
- macOS keychain, Fast User Switching (Hermes #120545)
- **Dự đoán**: abstraction layers sẽ dày hơn, hoặc platform-specific builds

**5. Security-first development** (Zeroclaw audit, Hermes CVE fixes)
- OIDC migration (Zeroclaw, planned others?)
- Permission boundaries (Zeroclaw S0 bugs)
- **Dự đoán**: security audits mandatory trước major releases

### Risks quan sát:

**Update reliability crisis**: OpenClaw #153257 (8h recovery), Hermes update fears, NanoClaw controller broken (#3913)
- Users skip updates → security holes linger
- **Mitigation needed**: staged rollouts, rollback automation, update testing suites

**Memory/performance debt**: OpenClaw worker leaks (#157842), QwenPaw tool_result retention (#7923)
- Scale issues surface khi production loads hit
- **Pattern**: reactive fixes sau incidents, không proactive profiling

**Community trust fragile**: OpenClaw post-incident, QwenPaw UX frustration (#7884)
- One bad release → user churn
- **Recovery path**: transparent postmortems, user-facing status pages

### Opportunities:

**1. Cross-pollination giữa projects**
- Hermes holographic memory → others chưa có
- OpenClaw Deslop messaging → Hermes chưa có
- QwenPaw fork hooks (#3902-#3904) → pattern tốt cho customization

**2. Standardization gaps**
- MCP tool pagination (NanoBot #5916, QwenPaw implied)
- Context compression strategies
- Gateway architectures (PM, systemd, LaunchAgent)
- **Opportunity**: shared protocols, interop specs

**3. Underserved niches**
- Mobile-first agents (không project nào focus)
- Embedded/edge deployment (PicoClaw tên gợi ý nhưng không thấy activity)
- Multi-agent coordination (Hermes delegation, NanoClaw handoffs - chưa mature)

---

## 🎓 Kết luận chiến lược

**Hermes Agent vị trí solid**: enterprise-grade leader với scale lớn nhất, security focus, platform coverage rộng. Thách thức là maintain velocity mà không sacrifice stability (như OpenClaw #153257).

**Ngành đang ở giai đoạn stabilization**: không release mới, focus sửa bugs, worker isolation migrations. Tiếp theo sẽ là differentiation wave - ai solve context compression tốt nhất, ai có multi-vendor routing slick nhất, ai handle updates reliable nhất.

**Cơ hội cho Hermes**:
1. Publish postmortems cho P0 incidents → build trust (học OpenClaw #153257)
2. Extract platform abstraction layer thành library → giảm Windows/macOS bugs
3. Open-source holographic memory → community adoption, mindshare
4. Staged update rollouts với rollback automation → kill update fear

**Watch competitors**:
- OpenClaw worker isolation patterns
- QwenPaw community engagement (first-time contributors)
- Zeroclaw OIDC implementation (security depth)
- NanoClaw fork-friendly hooks (extensibility model)

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-09-26

## 1. Tóm tắt hôm nay

Ngày bận rộn khắc phục lỗi hiệu suất và bộ nhớ sau loạt release 2026.9.5-9.6. 30 PR mới tập trung vào tối ưu worker threads, giảm memory leaks, sửa update pipeline. Không có release mới. Nhiều issue crash-loop và memory pressure được đóng hoặc đang trong quá trạng PR.

## 2. Releases

Không có release trong 24h qua. Version hiện tại: 2026.9.6 (eb377ac)

## 3. Tiến độ dự án

### PRs quan trọng

**Hiệu suất & Memory (P0-P1)**

- #158235: Task retention tách khỏi main thread → không block Gateway event loop nữa
- #158450: Artifact reads chạy trên worker threads riêng → giảm pause khi stream chat
- #158552: Typing previews throttle với prepared facts → Control UI mượt hơn
- #154390: Native inference chạy trên dedicated workers (Windows deferred) → tách credentials khỏi Gateway

**Crash fixes**

- #154868: Compaction probe lỗi không còn wedge steering/restart
- #137359: Memory flush không bị watchdog abort trước khi claim-to-adoption
- #155832: Grok 401/refusal không còn trigger re-auth cho toàn bộ xAI models

**Message delivery**

- #158272: Deslop round 2 cho WhatsApp/Teams/iMessage/Signal/Mattermost/Google Chat → ít duplicate code hơn
- #155652: Cron completion push không còn route đến deleted run aliases

**Platform**

- #158553: Linux Quick Chat giữ keyboard focus khi mở
- #158099: Gateway không còn gọi `git`/`npm root -g` khi `update.checkOnStart: false` (fix macOS Command Line Tools popup)

### Trends

Sau vụ 2026.9.5 gây 8-hour recovery session (#153257), team pivot sang:

1. Worker isolation (inference/retention/artifacts tách khỏi main thread)
2. Compaction/restart reliability
3. Update pipeline robustness (nhiều "update-failed" issues)

## 4. Điểm nổi bật cộng đồng

### Top discussions (theo comments)

**#153257 (35 comments, 🐚 platinum hermit)**: 2026.9.5 phá stable env, user mất 8h recovery. CPU 50%, disk writes 52MB/min khi idle. Nguyên nhân: prepared-model-catalog worker loop (#155753, #157842).

**#155753 (31 comments)**: Model-catalog worker pin 1 CPU core 100% vì `readFullModelCatalog()` gọi `refreshExpiredCatalog()` mỗi lần read. TTL 60s → rebuild liên tục.

**#157842 (15 comments, 🦞 diamond lobster)**: Prepared-model-catalog worker leak ~77MB/agent-turn, vượt 512MB limit → crash.

**#50093 (14 comments)**: WhatsApp backfill missed messages sau reconnect. Yêu cầu từ tháng 3, vẫn P1 stale.

### Tương tác cao

- #156038 (4 comments): `before_model_resolve` hook không chạy cho CLI models (claude-cli)
- #51184 (5 comments): Hiển thị cron job name trong `/status` thay vì UUID
- #50677 (6 comments): Skills bị truncate im lặng, user không biết custom skills mất

## 5. Ổn định & Bugs

### P0 crash-loop (7 issues)

1. **#155753**: Model-catalog CPU burn → PR chưa có
2. **#157842**: Prepared-model-catalog memory leak 77MB/turn → P0, no PR yet
3. **#157107 [CLOSED]**: 9.6 rebuild plugin generation mỗi 6s, không agent nào chạy
4. **#155720**: macOS gateway exit trong restart drain, LaunchAgent không load lại → silent 24h
5. **#38721**: Shutdown timeout, active child process handle → dirty shutdown

### Memory leaks

- #155191: Native memory leak 1GB/30s, V8 heap ổn định → cần info
- #154104: 4 Matrix E2EE accounts → 50% CPU + 52MB/min writes khi idle (9.5); Matrix disabled thì không

### Update pipeline

Nhiều "update-failed" reports (5+ issues):

- #156112: `openclaw update` fail ở global-install-swap, nhưng `npm install -g` trực tiếp OK
- #156986: Update hang ở update-candidate-state, worker output 233MB+ với respawn loop
- #157812 [Windows]: auto-update fail 3 modes: managed-service-preflight trong gateway tree, path với `$OPENCLAW_STATE_DIR` không expand, reconcile:abandoned sau restart

## 6. Yêu cầu tính năng

### High-demand (nhiều comments/upvotes)

**Session & messaging**

- #50093 (P1, 14 comments): WhatsApp backfill missed messages
- #55792 (P1, 8 comments): Catch up missed inbound sau gateway restart (Discord/Telegram/etc)
- #42986 (P2, 6 comments): Telegram thread binding cho subagent sessions
- #51441 (P2, 9 comments): Expose resolved backend model trong session_status (LiteLLM routing)

**Automation**

- #49740 (P2, 6 comments): Cron auto-retry khi fail (--retry-count/delay)
- #51184 (P2, 5 comments): Surface cron job name trong `/status` và statusline

**Plugins & hooks**

- #38714 (P2, 6 comments): Discord reaction events vào Hooks system
- #51041 (P3, 5 comments): Discord slash interaction controls cho plugin commands

**Multi-agent**

- #33478 (P2, 5 comments): Structured callback actions & thread context inheritance cho agent handoffs
- #112372 (P2, 5 comments): Deferred completion opt-in cho `sessions_send` (wakeOnReply)

### Infrastructure

- #42648 (P3, 7 comments): Memory MVP write pipeline với classification/dedupe/merge
- #39127 (P2, 6 comments): Per-session activity state qua gateway API + WS (busy/idle/awaiting)

## 7. Phản hồi người dùng

### Tiêu cực

1. **#153257**: "I genuinely regret upgrading to 2026.9.5" → 8h downtime recovery
2. **#155191**: "RSS grows ~1 GiB per 30 s" → native memory leak chưa tìm ra root cause
3. **#50677**: "Skills silently truncated" → user-created skills mất không warning

### Issues trải nghiệm

- #155720: Gateway down 24h không thông báo (macOS LaunchAgent)
- #155937: GPT-6 Sol rejected dù OAuth OK → confusing error
- #50287/#50274: Production fallback expansion cần optimize cost/quality (Thai)

### Positive signals

- #155666: PR add AnySearch provider → community plugin contribution
- #148276: Fix inline code duplication khi split replies → UX improvement

## 8. Backlog & Roadmap

### Short-term (từ PRs/issues)

**Performance stabilization (ongoing)**

- Worker thread migration (#154390, #158235, #158450)
- Prepared-model-catalog fixes (#155753, #157842)
- Update pipeline reliability (#156112, #156986, #157812)

**Memory & resource**

- Native leak investigation (#155191)
- Matrix E2EE idle CPU/disk (#154104)
- Task retention off main thread (merged #158235)

### Mid-term (P1-P2 features)

- Message backfill after reconnect (#50093, #55792)
- CLI model hook support (#156038)
- Telegram thread binding (#42986)
- Cron retry mechanism (#49740)

### Deferred

- TaskFlow retirement (#158225 in review)
- Plugin hot-reload (#14438, P3)
- Multi-role chat UI (#22774, P2)

### Maintenance

- Channel deslop round 2 merged (#158272)
- Dependency refresh with 7-day cutoff (#158298)
- Test cleanup (redundant Inworld tests #158560)

---

**Tình hình**: Sau lỗi nghiêm trọng 9.5, team đang aggressive fix performance/memory. 2026.9.7 tracker (#157531) active, nhiều PR đang chờ merge. Update pipeline vẫn problematic trên nhiều platform.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot 2026-09-26

## 1. Tóm tắt hôm nay

Ngày tập trung sửa bug hạ tầng và UX. 5 PR mới mở: fix MCP pagination bug, tích hợp Cheaper Inference gateway, cải thiện xử lý Napcat + env vars, lưu draft composer. 1 PR merge (draft persistence). Không release mới.

## 2. Releases

Không release hôm nay. Bản 0.3.5 đã ship 2026-09-16 (#5788 đóng hôm qua - thông báo chậm).

## 3. Tiến độ dự án

**PRs merge hôm nay:**
- #5912 (CLOSED): Draft composer giờ persist qua localStorage, khôi phục sau reload/chuyển conversation → cải thiện UX đáng kể

**PRs mở mới (5 cái):**
- #5916: Fix MCP tools chỉ load page đầu, page sau bị bỏ sót
- #5915: Thêm Cheaper Inference provider (OpenAI-compatible gateway, giảm 15-60% chi phí)
- #5914: Napcat xử lý `file_size` không phải số (đang crash nếu gặp)
- #5913: `NANOBOT_MAX_CONCURRENT_REQUESTS` parse lỗi giờ fallback thay vì crash
- #5780: Vẫn mở - tắt notification context compaction (P2)

**PRs cũ còn open (8 cái):**
- #5204 (P1): Refactor Responses capabilities - kéo từ 2026-08-01
- #5005 (P1): Security - cho phép cleanup tmp có scope
- #5609, #5606, #5605: Email channel improvements (OAuth, filter alias, mark seen)
- #5386: MCP Apps metadata preservation

**Xu hướng:**
- Bug fixes nhỏ lẻ phủ rộng: MCP, channels (Napcat, Feishu), config parsing
- Tích hợp provider mới (Cheaper Inference)
- UX polish (draft persistence, tokens/sec indicator)
- Backlog P1 kéo dài (Responses refactor, security fixes)

## 4. Điểm nổi bật cộng đồng

**Issues có tương tác:**
- #5903 (2 comments): Bug Feishu - marker nội bộ "Continue the active task..." lộ ra user sau idle compaction → privacy/UX issue
- #5908 (2 comments): Feature request WebUI - hiện tokens/sec realtime khi streaming → monitoring need

**Không issue/PR nào có reaction nhiều** - activity thấp về engagement metrics.

## 5. Ổn định & Bugs

**Bugs đang fix:**
1. **Feishu hidden marker leak (#5903)** - OPEN, P2 - message nội bộ gửi nhầm cho user
2. **MCP pagination (#5916)** - PR mới - tools page 2+ bị bỏ qua, gây tool không khả dụng
3. **Napcat non-numeric file_size (#5914)** - PR mới - crash khi image metadata lỗi
4. **Env var parse crash (#5913)** - PR mới - `NANOBOT_MAX_CONCURRENT_REQUESTS` giá trị lỗi làm agent die

**Issues tồn đọng:**
- Context compaction notifications (#5780) - vẫn tranh luận có tắt không
- Security: recursive rm guard (#5005) - P1 từ 2026-07-20, chưa merge do conflict

## 6. Yêu cầu tính năng

**Mới:**
- #5908: Hiện tokens/sec realtime khi AI reply stream (monitoring/perf visibility)
- #5915: Tích hợp Cheaper Inference gateway (giảm chi phí 15-60%)

**Đã ship:**
- #5910 → #5912: Draft persistence - DONE hôm nay

**Backlog:**
- Email OAuth (MS delegated flow) #5609
- Email alias filter #5606
- MCP Apps metadata #5386

## 7. Phản hồi người dùng

**Pain points từ issues:**
- Feishu channel: Internal messages leak ra user (#5903) → cần sửa gấp
- WebUI: Mất draft khi switch conversation hoặc refresh → đã fix #5912
- MCP: Tools không load hết nếu server paginate → đã fix #5916

**Feedback style:**
- User báo bug chi tiết (repro steps, logs)
- Feature requests rõ ràng động lực + giải pháp đề xuất

## 8. Backlog & Roadmap

**Priority P1 chưa merge (>1 tháng):**
- Responses capabilities refactor (#5204) - 2 tháng
- Recursive rm security guard (#5005) - 2 tháng

**Priority P2 active:**
- Channel bugs (Feishu, Napcat)
- MCP fixes
- UX polish (draft, streaming metrics)

**Roadmap hints:**
- Tích hợp thêm providers (Cheaper Inference vừa thêm)
- Email channel maturity (OAuth, filtering)
- Test consolidation (#5907 merged) → cleanup chất lượng code

**Bottleneck:** Backlog P1 kéo dài, nhiều conflict. Team có thể thiếu bandwidth review/merge PRs lớn.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw 2026-09-26

## 1. Tóm tắt hôm nay

Security audit phát hiện 5 lỗi nghiêm trọng S0 (data loss/security risk) trong hệ thống OIDC principals mới merge. Phát triển chính tập trung vào hoàn thiện authentication stack và fix tool-call parsing bugs. Không có release.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### Authentication Stack (#8289 OIDC Series)
**Trạng thái**: Stage 3,4 merged master. Stage 5,6 đang review.

- #10259 ✅ MERGED: RPC authentication với native+peercred
- #10263 ✅ MERGED: Principal tool-selector composition  
- #10265 ✅ MERGED: Principal-owned sessions
- #10321 OPEN: Browser PKCE + enrollment API (stage 5)
- #10275 OPEN: Retire Nevis/iam_policy, config shim (stage 6)
- #11082 OPEN: Full OIDC stack squash vào một PR

**Vấn đề**: Source review phát hiện 5 security holes trong code vừa merge:

- #11123 S0: SOP execution chấp nhận wildcard tool selectors không cần `tools:execute`
- #11124 S0: SOP decision gate bỏ qua strict fallback
- #11125 S0: SOP execution thiếu permission check `tools:execute`
- #11126 S0: Queued session ops giữ admin bypass sau khi demote
- #11127 S0: Session-data tools bypass principal ownership check

**Fix**: #11133 đang sửa environment revalidation trên session reuse.

### Runtime Improvements

- #10621 OPEN: Agent lifecycle coordination - refactor config authority
- #11132 OPEN: Turn parity over RPC - steering, totals, session ops
- #11131 OPEN: Observer event firehose move vào daemon
- #10596 OPEN: Paginate ACP transcripts
- #10197 OPEN: Persist interrupted turn progress

### Tool & Provider Fixes

- #10397 ✅ MERGED: MCP tool results - send text blocks thay vì whole envelope
- #11046 ✅ MERGED: Screenshot stop inline base64
- #10938 OPEN: Declare tool attachments explicitly thay vì scan text
- #10480 OPEN: Recover từ rejected image requests

## 4. Điểm nổi bật cộng đồng

**#11096** (1 comment) - RFC risk-based merge freshness check sau incidents #10525, #10815, #11066. CI pass trên PR head với `master` cũ, sau đó shared dependency thay đổi làm combined result fail.

**#11130** (mới mở) - DeepSeek DSML tool-call markup không parse, raw markup leak ra channel, turn end silently. Bug nghiêm trọng S1 block workflow.

## 5. Ổn định & Bugs

### Critical (S0 - Security/Data Loss)
5 issues từ security audit (#11123-#11127) - tất cả liên quan principal permission bypass trong SOP/session system.

### High (S1 - Workflow Blocked)
- #11130: DeepSeek DSML parser fail
- #11129: Memory content scan false positive - block text có URL + từ khóa `api_key/secret/token/password` trên cùng dòng

### Medium
- #10394 ✅ CLOSED: MCP tool results duplicate payload
- #10600 OPEN: Channels report success cho messages không gửi
- #10417 OPEN: Terminal fallbacks không deliver live

## 6. Yêu cầu tính năng

- #10596: Pagination cho persisted ACP transcripts - bounded cursor, newest first
- #11132: RPC steering mid-turn, session ops parity
- #10583: Gateway `/api/upload` chấp nhận mọi file, không chỉ images
- #10622: Slack optionally accept bot/workflow messages

## 7. Phản hồi người dùng

Không có discussion hoặc user feedback rõ ràng trong dataset. Tất cả activity từ maintainers/contributors.

## 8. Backlog & Roadmap

### Authentication (Đang hoàn thiện)
- Merge #11082 (full OIDC stack) sau khi fix 5 security holes
- Landing #10321 (browser PKCE), #10275 (retire Nevis)

### Runtime Refactor (In progress)
- #10621 config authority coordination - tiền đề cho nhiều features khác
- #10197 interrupted turn recovery - critical cho reliability

### Security Hardening
- Fix 5 S0 issues (#11123-#11127)
- #10308 gate shared workspace read access
- #10583 file upload với document markers

### Parking Lot
- #10622 Slack bot messages - needs author action
- #10915 CODEOWNERS update - needs author action

**Risk**: 5 S0 security issues vừa phát hiện cần urgent fix trước khi OIDC stack hoàn toàn stable.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 26/09/2026

## 🎯 Tóm tắt hôm nay

Hoạt động vừa phải. Đóng 1 bug cũ về Feishu config, thêm 2 PR provider mới (Cheaper Inference + OpenAI Responses API). Issue mới về CLA bot lỗi.

## 📦 Releases

Không có.

## 🚀 Tiến độ dự án

### Pull Requests hoạt động:

**#3393 - Thêm Cheaper Inference provider** (mới nhất)
- OpenAI-compatible gateway, rẻ hơn 15-60% so với OpenAI trực tiếp
- Tích hợp đơn giản, dùng API key duy nhất cho nhiều model
- Xu hướng: mở rộng provider ecosystem, giảm cost cho user

**#3381 - Migrate OpenAI sang Responses API** 
- Modernize OpenAI integration
- Cập nhật theo breaking change từ OpenAI upstream
- Stall vì CLA bot lỗi (#3392)

**#3368 - Parallel Search MCP docs**
- Setup guide cho web search tool
- Không cần account/API key
- Privacy-clear: document rõ data flow

**#3222 - DeltaChat cleanup**
- Refactor lớn: -200 LOC
- Drop legacy features + password config
- Modernize documentation

### Xu hướng phát triển:
- Provider expansion: thêm nhiều AI vendor mới
- Cost optimization: focus cheaper alternatives
- Documentation: MCP integration guides
- Code health: cleanup technical debt

## 💬 Điểm nổi bật cộng đồng

#3392 - CLA bot lỗi chặn PR
- Impact: contributor @XenonR đã sign CLA nhưng bot không nhận
- Block #3381 merge
- Cần maintainer can thiệp thủ công

#3355 - Bug Feishu config đã fix
- Community-contributed solution trong issue
- Closed sau 24 ngày
- Problem: config schema không khớp docs

## 🐛 Ổn định & Bugs

**Đã giải quyết:**
- #3355 (Feishu): `channel_list.feishu.app_id` unknown field → resolved via config restructure

**Đang active:**
- #3392: CLA assistant integration broken
  - Bot workflow issue, không phải code bug
  - Block contributor workflow

**Chất lượng code:**
- #3222 DeltaChat PR: aggressive cleanup -200 LOC
- Trend tích cực: reduce complexity

## ✨ Yêu cầu tính năng

**Provider mới:**
- Cheaper Inference (#3393): cost-saving focus
- OpenAI Responses API (#3381): API modernization

**Tooling:**
- Parallel Search MCP (#3368): web search capability không cần auth

Không có feature request issue mới trong ngày.

## 👥 Phản hồi người dùng

**Pain points:**
- CLA signing process friction (#3392)
- Channel config schema confusion (#3355 - resolved)

**Positive:**
- Community contribute fix cho bugs (#3355)
- Active contributor base: 4 different users trong recent PRs

**Engagement:**
- Thấp: không có PR/issue nào >0 reactions
- Community size có vẻ nhỏ hoặc lurker nhiều

## 📋 Backlog & Roadmap

**From PR titles:**
- Provider diversity expansion (2 providers trong pipeline)
- DeltaChat modernization in progress
- MCP tooling documentation focus

**Technical debt:**
- DeltaChat refactor đang giải quyết legacy code
- OpenAI API migration cần complete

**Process issues:**
- CLA workflow cần fix urgent (block contributions)

**Observed priorities:**
1. Multi-provider support (cost + choice)
2. Code modernization (API updates, cleanup)
3. Documentation (MCP guides)
4. Process tooling (CLA, automation)

Không có public roadmap trong data provided.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw 2026-09-26

## 🔄 Tóm tắt hôm nay

Ngày sửa lỗi cận kề release v2.4.0. 5 issue mới report bugs, 30 PR merge/open tập trung fix stability gaps: controller extract broken, systemd detection fail, Claude stream timeout, agent restart logic sai ID. Không có release mới.

## 📦 Releases

Không có release mới trong 24h. v2.4.0 vừa ship, đang patch fallout.

## 🚀 Tiến độ dự án

**Sửa lỗi controller & update flow (#3913)**
- `/update-nanoclaw` broken từ #3816: controller archive thiếu `setup/`, commands chạy trước deps có
- Fix: adjust git archive path, run `pnpm install` trước khi load controller
- Blockers quan trọng: update skill không chạy được = người dùng stuck ở phiên bản cũ

**Claude provider fixes (#3917, #3893)**
- #3917: seed default output style thay vì `Concise` → restore prompt caching (Concise defeat cache)
- #3893: heartbeat die khi Claude stream một block > idle ceiling → container bị kill giữa chừng
- Touch heartbeat mỗi chunk thay vì mỗi message → fix timeout trên long-running generation

**Agent routing bugs (#3911, #3908)**
- #3911: `ncl groups restart --id <other>` restart chính nhóm gọi, không phải target → wrong ID resolved
- #3908: failed agent-to-agent wake gửi "run failed" về chính nó → infinite loop
- Core routing logic cần rewrite, nhiều edge case chưa cover

**Setup & detection improvements**
- #3910: gateway detection fail khi pnpm print workspace warning → parse stdout sai
- #3878: ping agent container không stop trước khi xóa folder
- #2494 (closed): systemd user session mis-detect khi chạy trong `su -` / container

**Infrastructure extensions**
- #3902, #3903, #3904: thêm hook registry cho container env, session wake admission, turn lifecycle → cho phép fork extend mà không edit core
- #3900: per-group `system_prompt_mode` → non-Claude model qua Anthropic-compatible endpoint dùng prompt tùy chỉnh
- #3898: park channel với `<NAME>_ENABLED=false` thay vì xóa credentials

## ⭐ Điểm nổi bật cộng đồng

**#3916**: Host logs không rotate, không có timestamp, nhiều tuần log gộp chung → khi filter by time of day match cả lịch sử 4 tháng. 10MB nanoclaw.log + 29MB error.log từ tháng 5.
- Cần structured logging + rotation policy
- User reports: debug impossible với logs merge nhiều tháng

**#3185**: Discord approval buttons reject mọi request dù user click Approve
- Root cause: webhook interaction `custom_id` split on `:` nhưng chứa `\n` delimiter
- Bug nghiêm trọng: approval flow broken hoàn toàn trên Discord

**#3446**: Automated senders (bots, webhooks) trigger unknown-sender gate như human → approval card gửi cho bot không click được
- Fix: auto-drop bot senders ở gate

## 🐛 Ổn định & Bugs

**Critical blockers**
1. Update controller không load (#3913) → users stuck at old version
2. Discord approvals broken (#3185) → workflow halt
3. Container cleanup race (#3909) → orphan containers khi group delete mid-spawn

**Stability issues**
- Claude containers killed mid-generation khi block stream > 30min (#3893)
- Agent restart wrong target (#3911) → operational risk
- Gateway detection false negative (#3910) → setup fail on healthy install

**CI/template compliance**
- #3886: require release note or "no change" checkbox → 59/91 PRs v2.4.0 không có note
- #3914: fail template-compliance status khi PR skip v2 template
- #3912: area labeler xóa kind labels vì run parallel với label-pr

## 🆕 Yêu cầu tính năng

**Extension points cho forks (#3902, #3903, #3904)**
- Hook registries: container env contributors, session wake admission, turn lifecycle
- Mục đích: fork extend behavior mà không edit core files → merge conflict giảm

**System prompt customization (#3900)**
- Per-group `system_prompt_mode` để override Claude Code preset
- Use case: non-Claude models qua Anthropic-compatible endpoint cần prompt riêng

**Fork-local code convention (#3899, #3897)**
- Document folder structure cho fork-specific code trước khi thành skill
- Extend agent instructions không edit `CLAUDE.md` → conflict-free upgrade

## 💬 Phản hồi người dùng

- **Log rotation (#3916)**: nhiều tuần logs merge = debug nightmare
- **Setup reliability**: systemd detection, gateway probe dễ false-negative
- **Discord integration**: approval flow broken hoàn toàn, UX blockers
- **Update mechanism**: controller extract fail = stuck version

## 📋 Backlog & Roadmap

**Immediate (post-v2.4.0 patches)**
- Fix update controller extract (#3913)
- Restore Discord approvals (#3185)
- Container lifecycle race conditions (#3909, #3878)

**Infrastructure maturity**
- Log rotation + structured logging (#3916)
- Hook-based extension API (#3902-3904) → stable fork pattern
- Gateway detection hardening (#3910, #3907)

**Agent reliability**
- Routing correctness (#3911, #3908)
- Heartbeat survival on long streams (#3893)
- Provider config isolation (#3896)

Không có roadmap công khai. Activity pattern: rapid post-release stabilization, focus on fork-friendly architecture.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo phân tích NullClaw - 2026-09-26

## 1. Tóm tắt hôm nay

Hoạt động yên tĩnh. Một PR duy nhất sửa cơ chế supervised autonomy: thay vì fail ngay, hệ thống giờ pause và đợi `/approve` cho lệnh medium/high-risk.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR #1009** - Fix supervised autonomy flow
- **Vấn đề**: Lệnh shell risk cao luôn fail thay vì pause để người dùng approve
- **Root cause**: State `approval_request` không bao giờ reach được, dù lệnh từ `/bash`, `/exec` hay tool call
- **Impact**: Supervised mode không hoạt động đúng thiết kế - mất tính năng core về autonomous agent safety
- Status: OPEN, chưa merge
- Liên kết #900

Xu hướng: Tập trung vào autonomous operation safety - cân bằng giữa tự động hoá và kiểm soát.

## 4. Điểm nổi bật cộng đồng

Không có interaction data (comments: undefined, reactions: 0). PR vừa tạo, chưa có phản hồi.

## 5. Ổn định & Bugs

Bug nghiêm trọng trong supervised autonomy pipeline:
- **Symptom**: Safety mechanism không trigger
- **Severity**: High - liên quan trực tiếp đến risk management của agent
- **Scope**: Toàn bộ flow execute commands (bash/exec/tool)

## 6. Yêu cầu tính năng

Không có feature request mới.

## 7. Phản hồi người dùng

Chưa có feedback trong khoảng thời gian này.

## 8. Backlog & Roadmap

Issue #900 đang được address bởi PR #1009. Không có thông tin roadmap khác từ data 24h qua.

---

**Nhận xét**: Ngày rất quiet, chỉ một bugfix về safety mechanism. Đây là vấn đề thiết kế quan trọng cho autonomous agent - supervised mode phải hoạt động đúng để user tin tưởng delegate high-risk operations.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 26/09/2026

## 1. Tóm tắt hôm nay

Không có hoạt động mới đáng kể. Hai PR cũ vẫn mở, không có issue hay release. Dự án trong trạng thái yên tĩnh.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR đang mở:**

- **#8108** (XL, mở từ 22/09): Thêm `builtin.time` operation "shift" - tính toán thời gian tương đối (giây, phút, giờ, ngày, tuần) từ timestamp. Contributor mới, chưa có review. Scope: docs, risk thấp.

- **#7988** (XS, mở từ 29/08): Bot CI tự động refresh knowledge graph của codebase. PR infrastructure định kỳ, chưa merge.

**Xu hướng:** Hoạt động rất chậm. PR infrastructure tồn đọng gần 1 tháng. Feature PR #8108 không có tương tác sau 4 ngày.

## 4. Điểm nổi bật cộng đồng

Không có. Cả hai PR đều 0 reaction, không có bình luận công khai.

## 5. Ổn định & Bugs

#8108 fix "typed input issues" trong host-runtime nhưng không rõ bug gốc là gì. Không có issue liên kết, không có thông tin về severity hay user impact.

## 6. Yêu cầu tính năng

#8108 là feature mới (time shift operations) nhưng không rõ ai request hay use case.

## 7. Phản hồi người dùng

Không có dữ liệu. Không có issue, không comment, không reaction.

## 8. Backlog & Roadmap

Không có thông tin. Hai PR treo không rõ priority.

---

**Kết luận:** Dự án trong giai đoạn trầm lắng. Cần maintainer review PR tồn đọng, đặc biệt #7988 đã 4 tuần không động. Thiếu minh bạch về roadmap và tương tác cộng đồng.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-09-26

## 1. Tóm tắt hôm nay

13 PR mới submit, tập trung fix bugs nghiêm trọng ảnh hưởng agent execution loop và session state. Không có release. Cộng đồng report nhiều vấn đề về context compaction vượt budget, binary file poisoning, và UX issues trong Console.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**PRs Critical (merge sớm):**

- **#7988**: `grep_search` đọc file binary (`history.db-wal`) → binary bytes vào conversation state → agent bị nhiễm độc. Fix: skip binary files như `grep -I`
- **#7983**: QQ gateway replay events sau reconnect → duplicate messages. Fix: dedup bằng message ID tracking
- **#7986**: llama.cpp/vLLM custom endpoint bị apply context window từ cloud catalog (32k server nhận 1M limit → compaction không bao giờ trigger). Fix: skip pattern table cho custom base URLs
- **#7982**: Gemini thinking models + tools fail turn 2 với "missing thought_signature". Fix: relay `thoughtSignature` trong function calls

**PRs Enhancement:**

- **#7989**: Markdown tables vượt chat bubble, scrollbar chìm đáy. Fix: wrap cells, cap scroll area 60vh
- **#7987**: Browser SDK không load extensions (Playwright inject `--disable-extensions`, QwenPaw không expose cách remove). Fix: add `browser.ignore_default_args`
- **#7357**: Toggle ẩn tool call cards để giảm noise khi đọc chat
- **#7542**: Load older messages khi scroll lên (hiện tại compacted messages biến mất sau refresh)
- **#7923**: `tool_result` blocks chiếm 75% DB size, không có retention policy. Add `blocks_retention_days`

**Issues Hot:**

- **#7628** (7 comments): Context compaction tính budget sai → vẫn exceed request limit → fail active turns
- **#7884** (5 comments): User phàn nàn history quá ngắn, không scroll được đủ tin cũ
- **#7980**: Binary file poisoning analysis chi tiết (doom loop khi grep match WAL file)

## 4. Điểm nổi bật cộng đồng

- **#7884**: User rất frustrated về history length ("看不到了？？？咱聊天记录多存点，做不到么？知道这个体验多差么？？？")
- **#7924**: UX complaint về Markdown table scrolling, khớp với PR #7989
- **#7948**: Web console design breaks user input (chưa có PR fix)
- Multiple first-time contributors (5/13 PRs tagged `[first-time-contributor]`)

## 5. Ổn định & Bugs

**Critical:**

1. **Binary poisoning** (#7980, #7988): `grep_search` → WAL file → agent state corrupted → unrecoverable
2. **QQ duplicate messages** (#7946, #7983): Gateway replay → double replies
3. **Context budget miscalculation** (#7628, #7979): Local deployments nhận cloud limits, compaction fail
4. **Gemini tool calling** (#7982): Thinking models break sau turn 1

**Medium:**

- Browser extensions không load (#7984, #7987)
- Markdown tables overflow (#7924, #7989)
- `chat_with_agent` timeout report sai "interrupted by user" (#7981)

## 6. Yêu cầu tính năng

- **#7978**: Cross-agent "Recent Sessions" sidebar panel với live status indicators
- **#7990**: Aliyun Token Plan models thiếu `thinking_param_style` declaration → thinking controls bị ẩn
- **#7957**: Cho phép disable pre-made models/channels (OCD users muốn cleanup unused items)
- **#7359**: Expose per-media inline caps (image/video/audio) trong provider settings
- **#7357**: Tool call visibility toggle (reduce chat noise)

## 7. Phản hồi người dùng

**Negative:**

- History retention quá ngắn, UX tệ khi không scroll được tin cũ (#7884)
- Markdown tables unusable khi nhiều cột/rows (#7924)
- Console design issues break input (#7948)

**Positive:**

- Nhiều first-time contributors tham gia
- PRs có quality cao (detailed issue analysis, proper fixes)

## 8. Backlog & Roadmap

**Immediate (blocking issues):**

1. Merge #7988 (binary poisoning fix) 
2. Merge #7983 (QQ replay dedup)
3. Merge #7986 (custom endpoint context window)

**Short-term:**

- Context compaction refactor (#7628): tính budget từ complete request
- History pagination (#7542): load older messages
- Tool result retention (#7923): giải phóng DB space

**Long-term:**

- Recent sessions panel (#7978)
- Enhanced provider caps exposure (#7359)
- UI/UX improvements (table overflow, tool call toggle)

---

**Đánh giá tổng thể**: Ngày nhiều activity, tập trung fix bugs nghiêm trọng ảnh hưởng production stability. Binary poisoning và QQ replay issues cần merge gấp. Cộng đồng active nhưng có frustration về UX (history, tables). Quality PRs từ new contributors là tín hiệu tốt.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*