# Bản tin Hệ sinh thái Hermes Agent 2026-10-15

> Issues: 104 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-15 02:00 UTC

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

# Báo cáo Hermes Agent — 2026-10-15

## 🎯 Tóm tắt hôm nay

Ra mắt **v0.22.1** (patch cho Windows Store, plugin updates). Hoạt động chính: stabilize unified gateway (#106742 đã merge, tracking bug fixes qua #134889), xử lý session/auth/platform bugs, catalog mở rộng (Render skills + MCP, tabella document tool).

---

## 🚀 Releases

### v0.22.1 (Oct 14)
Patch release sau v0.22.0:
- **Nemotron Super 3.5** default parameters
- Model picker UI: curated list đầu top
- Windows Store, plugin stability fixes

### v0.22.0 — "The Threshold Release" (Oct 13)
Kể từ v0.21.0: **~24,200 commits, ~6,080 PRs merged, ~7,180 issues closed, ~2,520 contributors**.

**Tính năng chính:**
- **Guided setup chat** với free trial model — onboarding mượt cho người mới
- **Unified gateway runtime** (#106742) — một gateway quản lý tất cả local sessions (CLI, TUI, Desktop)
- Multi-platform agent orchestration, group chat stability

Ý nghĩa: v0.21.0 xây nền, v0.22.0 mở cửa cho mass adoption qua UX/onboarding.

---

## 📊 Tiến độ dự án

### Unified Gateway (#106742) — post-merge fixes (#134889, P1)
**Merged Oct 14** (`eb75627f`). Tracking 14 comments, core architecture shift: một gateway owns mọi local session.

**Bugs đang fix:**
- #138717: classic CLI launch flags chưa reach gateway session
- #138720: session-end lifecycle chưa chạy trên owner khi viewer cuối đóng
- #138718: worktree note, CLI flags lost
- #138719: editor MCP servers + `hermes acp` flags treated as client-side

**Impact:** P1 vì ảnh hưởng all local surfaces (CLI/TUI/Desktop). Nhóm đang push fix cascade.

### Platform/Windows fixes — high activity
- #122935 (10💬): `hermes update` để lại hardened DACL trên `%HERMES%\tools\*` → WinError 5 cho non-elevated users
- #123965 (2💬): stale pre-PM venv trong `sys.path` → `ModuleNotFoundError: pydantic_core`
- #128770 (3💬): Desktop app spawn `wsl.exe` install prompt trên Windows thuần (không có WSL)

Pattern: Windows install/update path phức tạp hơn Unix, nhiều edge cases về permissions + environment.

### Session state bugs
- #136567 (23💬, P2): Telegram DM topics deliver opening message without `message_thread_id` → lobby recovery misroute
- #72280 (5💬): shared-session restart treat sender attribution prefix (`[User] `) là new message → "what next?"
- #136193 (2💬): Desktop branch-from-message copy truncated transcript (selectBranchMessages dùng local renderer list)

Session logic brittle sau unified gateway merge, nhiều recovery paths chưa update.

---

## 🔥 Điểm nổi bật cộng đồng

### Top interactions
1. **#131859** (41💬, P2, blocked): Cannot open PR via API — `CreatePullRequest` permission error. Fork PRs + issue creation work. Auth mystery.
2. **#136567** (23💬, 5👍): Telegram topic routing bug — high user impact (message delivery + session confusion)
3. **#134889** (14💬, P1): Unified gateway tracking — cộng đồng monitor architecture shift

### User pain points
- **Update reliability**: #138404 (git <2.44 timeout trên partial clones), #124022 (updater không dùng proxy → SSL fail)
- **Desktop session switching**: #121096 (stale parts, duplicated blocks), #138546 (whole window black, React #520)
- **Windows platform stability**: install/update paths mong manh, nhiều WinError variants

---

## 🐛 Ổn định & Bugs

### Critical (P0-P1)
- #138343 (6💬, P0): gateway restart loop sau unclean death + recycled PID → cron stranded, stale async-delegation burn provider quota
- #134889 (14💬, P1): unified gateway post-merge fixes
- #138649 (2💬, P1): Telegram init hang pre-socket inside gateway (variant #63309 family)

### High priority (P2)
- #131859 (41💬): API PR creation blocked
- #136567 (23💬): Telegram topic misrouting
- #121095 (13💬): `browser_exec` leave stale `browser_harness.daemon` processes
- #138644 (3💬): `pre_tool_call` hook timeout wedge all later tool calls (abandoned-worker cap không drain)

Pattern: gateway lifecycle, platform integration (Telegram/browser), session recovery.

---

## ✨ Yêu cầu tính năng

### Community catalog expansion
- #138673: list 21 Render skills từ upstream
- #138705: add Render to plugin catalog (20 skills + hosted MCP server)
- #138305: add **tabella** — document lifecycle tool (create/convert docx/xlsx/pptx/pdf/odt, pandoc/LaTeX)

Community drive plugin ecosystem growth, focus on document workflow + SaaS integrations.

### Desktop UX
- #52554 (8💬, 3👍): floating "Quote" button trên selected text (hiện chỉ keyboard-driven)
- #134024 (2💬): optional max-width cap cho chat column (readable line length trên ultrawide)

Desktop polish requests — UX friction removal.

---

## 💬 Phản hồi người dùng

### Positive
- v0.22.0 guided setup chat được nhắc như onboarding win
- Plugin catalog expansion (Render, tabella) good community contribution velocity

### Frustrations
- **Windows experience**: update/install brittle, nhiều cryptic errors (DACL, WinError 5, venv stale)
- **Desktop session switching**: UI glitches persist post-#106742 merge
- **Telegram reliability**: topic routing, init hangs — recurring #63309-family bugs

### Trust signals
- 2,520 contributors cho v0.22.0, ~7,180 issues closed — active, responsive team
- Catalog model (community-maintained plugins) scaling well

---

## 📋 Backlog & Roadmap

### Immediate (next days)
- **Stabilize unified gateway** (#134889 tracking): session lifecycle, launch flags, editor MCP ownership
- **Platform polish**: Windows update/install reliability, Telegram topic routing

### Near-term (next weeks)
- **Desktop session state**: fix truncation, stale rendering, recovery paths
- **Hook system hardening**: abandoned-worker cap drain (#138644), timeout handling
- **Security**: simple-git 3.36.0 critical advisories (#133711), vault Unicode TAG sanitization (#110278)

### Medium-term
- **WCAG compliance audit** (mentioned in rules, không có active issue)
- **Catalog growth**: more community plugins, MCP server integrations

### Pattern
Post-v0.22.0 = stabilization sprint. Unified gateway là big bet, nhiều integration seams đang phơi bugs. Không thấy major feature announcements — team focus on reliability.

---

**Xu hướng tổng thể:** Hermes đang trong consolidation phase sau architecture shift lớn. Community catalog healthy, nhưng core platform (Windows, session management, Telegram) cần attention. v0.22.0 onboarding success có thể amplify user volume → pressure trên stability.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent — 2026-10-15

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong **giai đoạn consolidation**. Sau các architecture shift lớn, project đồng loạt focus stabilization thay vì feature race.

**Phân khúc rõ:**
- **Enterprise-ready**: Hermes Agent, OpenClaw — đa platform, plugin ecosystem, onboarding polish
- **Specialized**: Zeroclaw (email/cron), NanoBot (WebUI/MCP), NullClaw (Slack streaming)
- **Niche/Regional**: QwenPaw (Chinese market, Code Mode), NanoClaw (Teams integration)
- **Dormant**: PicoClaw (abandoned), IronClaw (no activity)

**Áp lực chung**: gateway architecture, session management, platform integration (Windows, Telegram, email).

---

## 2. Bảng so sánh hoạt động

| Project | Issues | PRs | Releases | 24h Merges | Top Engagement | Community Signal |
|---------|--------|-----|----------|------------|----------------|------------------|
| **Hermes Agent** | 104 | 500 | 2 | ~15 | 41💬 (#131859) | 2,520 contributors v0.22.0 |
| **OpenClaw** | 68 | 500 | 0 | 8 | 16💬 (#127229) | Update-failure storm (10+ issues) |
| **NanoBot** | 3 | 35 | 0 | 30 | Minimal | Internal QA-driven |
| **Zeroclaw** | 7 | 50 | 0 | 7 | 4 PRs same-day (email) | @RustLangLatam sprint |
| **QwenPaw** | 12 | 34 | 2 | 16 | 7💬 (#8120) | 3 first-time contributors |
| **NanoClaw** | 1 | 10 | 0 | 2 | 1💬 (#2433) | Low engagement |
| **NullClaw** | 0 | 5 | 0 | 0 | 0 reactions | Zero community input |
| **PicoClaw** | 1 | 0 | 0 | 0 | Fork announcement | Abandoned |
| **IronClaw** | 0 | 0 | 0 | 0 | N/A | Dead |

**Insight**: Hermes Agent và OpenClaw dẫn đầu về scale + community. NanoBot velocity cao nhất (30 merges/ngày) nhưng ít engagement bên ngoài. NullClaw development nhanh mà không validate với users.

---

## 3. Vị thế Hermes Agent

### **Dẫn đầu về adoption readiness**

**Thế mạnh:**
- **Onboarding UX**: guided setup chat + free trial model (v0.22.0) — không project nào có
- **Plugin ecosystem**: community catalog (Render skills, tabella, MCP servers) + đang scale
- **Multi-platform orchestration**: unified gateway (#106742) quản lý CLI/TUI/Desktop — architecture shift lớn nhất
- **Contributor base**: 2,520 contributors v0.22.0, 41💬 top issue — community depth vượt trội

**Điểm yếu hiện tại:**
- **Windows stability**: 3+ WinError variants, DACL issues, update paths brittle
- **Post-gateway bugs**: 14 tracking issues (#134889), session lifecycle chưa ổn
- **Telegram reliability**: recurring #63309-family hangs, topic routing bugs

**Vị trí**: **Market leader** về adoption + UX polish. Đang trả giá cho ambition (unified gateway) nhưng có resources fix nhanh.

### So với đối thủ

- **vs OpenClaw**: OpenClaw tương đương scale, stability tốt hơn (SQLite state refactor #5943), nhưng không có onboarding story. Hermes win về first-run experience.
- **vs QwenPaw**: QwenPaw dẫn về Chinese market (GBK/CRLF fixes), Code Mode orchestration đột phá, nhưng scope hẹp (địa lý + vertical). Hermes general-purpose hơn.
- **vs NanoBot**: NanoBot velocity cao, nội công tốt (concurrency hardening), nhưng zero marketing/adoption signals. Hermes có distribution advantage.

---

## 4. Hướng kỹ thuật chung

### **Gateway/Session Architecture**
- **Hermes**: unified gateway owns all local sessions (#106742)
- **OpenClaw**: Lit → Solid UI refactor, gateway blocking issues
- **NanoBot**: SQLite state migration (#5943) tách khỏi JSONL
- **Pattern**: centralize session state, tách khỏi file-based (JSONL, temp dirs)

### **Platform Integration Pain**
Tất cả project gặp:
- **Windows**: permissions (DACL, WinError 5), environment (stale venv, WSL prompts)
- **Telegram**: init hangs, topic routing, rate limiting
- **Email**: auto-reply loops, TLS/STARTTLS, attachment handling

### **Performance Strategy**
- **NanoBot**: move blocking work off event loop (#6220, #6224) — worker threads
- **NanoBot**: stream large diffs (#6208) thay vì materialize
- **QwenPaw**: skip disabled channels (#8244) — 15s Windows startup cut
- **OpenClaw**: `sessions.list` CPU death spiral (#172526) — query optimization needed

### **Plugin/MCP Ecosystem**
- **Hermes**: community catalog (Render, tabella)
- **Zeroclaw**: 134 MCP presets (#6216) — Google Workspace, Slack...
- **QwenPaw**: inline UI plugin API (#8239) — OpenUI components in chat
- **Trend**: plugin architecture là differentiator, không phải core capabilities

### **Security Hardening**
- **Zeroclaw**: rustls CVE same-day patch (#11736)
- **NanoBot**: validate imports (#6219), reject shell path bypass (#6222)
- **Hermes**: vault Unicode TAG sanitization (#110278)
- **Pattern**: reactive patching tốt, proactive design (containment, validation) chưa consistent

---

## 5. Điểm khác biệt

### **Chiến lược phát triển**

| Project | Approach | Risk Profile |
|---------|----------|--------------|
| **Hermes** | Big-bet architecture (unified gateway), UX-first | High risk, high reward — trả giá ngắn hạn |
| **OpenClaw** | Steady refactor (Solid UI), reliability focus | Conservative, incremental |
| **NanoBot** | Internal QA-driven, zero marketing | Low user risk, low adoption |
| **QwenPaw** | Rapid iteration (2 betas/ngày), Chinese vertical | Niche dominance, high velocity |
| **Zeroclaw** | Sprint-based (email 4 PRs 1 ngày) | Feature-complete cycles |

### **Tính năng đặc trưng**

- **Hermes**: guided onboarding, free trial model — adoption moat
- **QwenPaw**: Python Code Mode orchestration (#8224), human-in-the-loop tool (#8259) — agent capabilities frontier
- **Zeroclaw**: email production-ready push (private CA, STARTTLS, anti-loop) — enterprise gap fill
- **NanoBot**: Google Drive service account tool (#6195), IO Intelligence provider (#5875) — ecosystem breadth
- **NullClaw**: Slack streaming replies + reactions — platform-native UX

### **Cộng đồng**

- **Hermes**: 2,520 contributors, 41💬 peak — broad base
- **QwenPaw**: 3 first-time contributors 1 ngày, Chinese community active
- **OpenClaw**: update-failure storm (10 issues) — visible pain, engaged users
- **NanoBot/NanoClaw/NullClaw**: low/zero engagement — internal projects hoặc early stage
- **Zeroclaw**: individual sprints (@RustLangLatam 4 PRs) — contributor-driven

---

## 6. Mức độ trưởng thành cộng đồng

### **Tier 1: Mature**
**Hermes Agent, OpenClaw**
- Contributor base rộng (100+)
- Issue triage organized (P0-P2 labels, tracking issues)
- Community catalog contributions
- User pain visible (update failures, Windows issues)
- Trust signal: release notes chi tiết, roadmap transparent

### **Tier 2: Emerging**
**QwenPaw, Zeroclaw**
- Active development (15+ merges/ngày)
- First-time contributors xuất hiện
- Niche community (Chinese, email power users)
- Feedback loop hoạt động (issues → PRs trong 24h)
- Trust signal: responsive maintainers

### **Tier 3: Internal/Stealth**
**NanoBot, NanoClaw, NullClaw**
- Low external engagement
- Feature-driven, không validate với users trước
- Velocity cao (NanoBot 30 merges) nhưng zero discussion
- Risk: ship features không biết ai dùng

### **Tier 4: Dormant/Dead**
**PicoClaw, IronClaw**
- Zero activity hoặc fork announcement
- Community chuyển sang alternatives

---

## 7. Tín hiệu xu hướng

### **Ngắn hạn (Q4 2026)**

**Consolidation tiếp diễn**:
- Post-architecture-shift stabilization (Hermes gateway, OpenClaw Solid UI, NanoBot SQLite)
- Windows platform investment tăng — pain points rõ nhất
- Telegram/email integration hardening — enterprise demand

**Plugin ecosystem race**:
- MCP server catalog expansion (Zeroclaw 134 presets)
- Inline UI (QwenPaw OpenUI components)
- Community-maintained skills (Hermes Render + tabella)

**Onboarding focus**:
- Hermes guided setup = competitive moat
- Các project khác chưa có answer — adoption gap sẽ mở rộng

### **Trung hạn (2027 H1)**

**Agent capabilities frontier**:
- QwenPaw Code Mode orchestration + human-in-the-loop → sẽ được copy
- Decision model separation (QwenPaw #8205) → tiêu chuẩn mới
- Streaming reasoning cross-platform (Zeroclaw, NullClaw) → baseline UX

**Platform integration depth**:
- Email production-ready (Zeroclaw sprint = proof of demand)
- Slack/Teams native UX (reactions, threading, status) — chat platform là gateway
- Mobile pairing (multiple projects report issues) — next frontier

**Security/Compliance**:
- WCAG audit demand tăng (Hermes rules mention)
- Private CA support (Zeroclaw #11751) — enterprise blocker
- Cron/exec containment (Zeroclaw #11410) — zero-trust architecture

### **Rủi ro cần watch**

**Hermes**:
- Unified gateway complexity → nhiều seams, nhiều bugs
- Windows experience không cải thiện → enterprise adoption chậm
- Contributor burn từ rapid pace → quality slip

**OpenClaw**:
- Conservative approach → bị outpaced về features
- Update mechanism brittle → user trust giảm

**QwenPaw**:
- Rapid iteration (2 betas/ngày) → stability concern
- Hot-reload side effects (#8225) → workflow breakage

**NanoBot/NullClaw**:
- Zero community validation → features nobody needs
- High velocity không bền → maintainer burn

---

## Kết luận chiến lược

**Hermes Agent** lead về **adoption readiness** + **community scale**. Unified gateway = big bet đang payoff nhưng short-term pain cao.

**OpenClaw** = stable alternative, conservative approach. Good cho risk-averse users.

**QwenPaw** = Chinese market leader, agent capabilities frontier. Code Mode + human-in-the-loop sẽ ảnh hưởng ecosystem.

**Specialized projects** (Zeroclaw email, NullClaw Slack) fill gaps — enterprise demand proven.

**Consolidation phase** = opportunity window. Project stabilize nhanh + ship onboarding story sẽ lock users. Hermes có advantage, nhưng Windows stability là Achilles' heel.

**Plugin ecosystem** = moat dài hạn. Community catalog scale (Hermes, Zeroclaw) > internal development.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw - 2026-10-15

## 1. Tóm tắt hôm nay

Hoạt động code/PR tập trung xử lý regression từ 2026.10.3: Gateway blocking, cron exec leak memory, Solid UI migration. Không có release. Issues user quan tâm: update failure (10+ reports), Claude CLI context loss, memory disk fill.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**UI migration Lit→Solid** (tiếp diễn):
- 8 PR refactor UI rendering (#171646 chat transcript, #171827 metadata, #171784 widgets)
- Loại bỏ Lit dependency, giữ nguyên behavior/layout
- Scope: còn composer fixtures, picker icons

**Regression fixes 2026.10.3**:
- #172605: Gateway unresponsive khi agent chạy → P1
- #172526: `sessions.list` RPC block 6-8s, CPU 85-90% death spiral
- #172628: fresh start để main-agent admission superseded

**Cron/exec isolation**:
- #172651: cron exec completion vẫn wake main session sau #167113
- #172690: fix đã merge, completions giữ ở cron run

**Claude CLI context**:
- #164960: resume subagent mất history, task bị drop
- #172026: fix cache-prefix churn sau child completion

## 4. Điểm nổi bật cộng đồng

**Update failure storm** (9+ issues trong 24h):
- Pattern: `package-swap`, `retired-state-format`, `gateway-recovery-verification`
- User frustration: auto-update break, manual rollback cần
- Team response: triage P2, label `clawsweeper:needs-info`

**Top engagement**:
- #127229 (16 comments): telegram durable update tombstoned false → message loss
- #164294 (15 comments): SQLite WAL checkpoint never complete, reader pin
- #158390 (12 comments): plugin-captures tmp dirs fill disk indefinitely → crash loop

**User pain points**:
- Disk fills: #158390 tmp dirs, #164294 WAL
- Session loss: #155119 subagent answer lost, #154474 completion republish loop
- Auth break: #154891 hot-reload brick plugins permanent

## 5. Ổn định & Bugs

**P0/crash-loop**:
- #158390: plugin tmp dirs không GC → disk fill → OOM
- #162211: startup block 40-200s → health monitor restart loop
- #172605: Gateway unresponsive on 2026.10.3 (regression)

**P1/critical**:
- #127229: telegram message falsely tombstoned → loss
- #172526: `sessions.list` 6-8s block → CPU death spiral
- #172628: fresh start agent admission superseded

**Memory/resource**:
- #99659: OOM killed sau companion app connect
- #164294: SQLite WAL pinned, checkpoint fail
- #172651: cron exec leak vào main session

**Context/session**:
- #155119: subagent final answer truncated-by-retention
- #153354: private parent completion rotate Codex threads
- #148295: parent sessions_send không adopt paused task

## 6. Yêu cầu tính năng

**Multi-agent/CLI** (#166071, 2 comments):
- Keep Claude Code memory (CLAUDE.md) out of agent turns default
- Opt-in setting + Doctor import path

**OAuth rotation** (#170367, 2 comments):
- ChatGPT/Codex 5h limit → auto rotate next OAuth account
- Avoid manual switch khi hit limit

**Korean i18n** (#53345, 1👍):
- Full ko locale cho Control UI
- AI agent response Korean consistent

**UI polish**:
- #111143: pin plugin tabs trong sidebar (1👍)
- #70266: macOS Talk Mode dùng assistant avatar (1👍)
- #158800: browse/fork prior channel segments sau /new

## 7. Phản hồi người dùng

**Update breakage** (recurring theme):
- 10+ auto-filed update-failure issues
- User confirm explicit trong OpenClaw UI
- Manual rollback pattern xuất hiện

**CLI performance** (#172712):
- `openclaw memory --help` mất 35-60s trên 2026.10.3
- Capture plugin sources mỗi lần invoke

**Discord voice** (#172648):
- Bot self-muted, join abort sau connectTimeout
- Other members' VOICE_STATE_UPDATE break adapter

**Mobile pairing** (#172699, #172713):
- Manual setup lock browser control
- `/pair qr` generate unreachable bridge subnet URL
- QR code không render trong web UI

## 8. Backlog & Roadmap

**Solid UI migration** (in progress):
- Còn: composer fixtures, picker icons, metadata
- Target: remove toàn bộ Lit dependency
- No user-visible change, layout/behavior preserve

**Memory system**:
- #172688: atomic prune recall khi source files move/archive
- #172603: memory_search reject `limit` param (alias miss)

**Cron/automation**:
- #128924: delivery-failure alert no cooldown/threshold
- #172651: exec completion isolation (fixed #172690)

**Bundle MCP**:
- #172614: failed server answer from failed catalog → tools missing 1 turn
- #159976: expired Streamable HTTP reconnect không retry tool call

**Backport queue**:
- #172693: blocked-turn logging, MCP test isolation cho 2026.9.33

**Documentation gaps**:
- #172675: TTS google/microsoft fail trên 2026.10.3
- User config unclear, direct Gemini API works

---

**Tín hiệu dự án**: regression 2026.10.3 gây pressure, team triage nhanh nhưng fix chưa merge hết. UI migration ổn định, scope rõ. Update mechanism cần review, failure rate cao bất thường.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-15

## 1. Tóm tắt hôm nay

Ngày tập trung vào stability và performance. 30 PRs được merge, chủ yếu fix bugs trong WebUI, agent execution và provider handling. Không có release mới. Phát hiện bug nghiêm trọng với idle compaction có thể xóa session đang chạy.

## 2. Releases

Không có releases trong 24h qua.

## 3. Tiến độ dự án

### Merged PRs quan trọng (30 PRs)

**Security & Critical Bugs (P0-P2):**
- #6221: Fix race condition - session compaction có thể xóa turn đang active, gây mất reply. Thêm shared lock để serialize.
- #6222: Reject shell paths có `~unknown/` khi workspace restriction enabled, tránh RuntimeError bypass containment check.
- #6225: Bind plugin snapshots to approved content - fix regression từ #6217, ngăn replacement instructions load sau khi plugin disabled.
- #6219: Validate imported messages trước khi modify session, tránh persist rejected imports.

**Performance Improvements:**
- #6220: Estimate missing token usage ở worker threads thay vì event loop, giảm latency gateway.
- #6224: Move prompt preparation (file reads, transcript shaping, token estimation) ra khỏi event loop vào bounded worker.
- #6218: Skip transcript snapshots khi không có run hooks - tối ưu Dream turns.
- #6217: Reuse skill discovery trong mỗi prompt build thay vì repeat reads.
- #6208: Stream bounded file diff previews, không materialize toàn bộ diff trước 500-line limit.

**WebUI Fixes:**
- #6211: Reconcile turns after reconnect - fix partial answers khi connection drop.
- #6212: Remove subtask polling fallback và duplicate load error UI.
- #6209: Restore activity sheen animation bị mất do Tailwind utility.
- #6207: Require double tildes (`~~`) cho strikethrough, fix single `~` breaking equations `(1)~(6)`.
- #6205: Prevent KaTeX equation tags overlap formulas - reserve tag width.
- #6198: Send same-origin cookies with uploads cho proxy/Cloudflare tunnel deployments.
- #6189: Remove unused session list previews và timestamps.

**Providers:**
- #5875: Add IO Intelligence (io.net) provider - official contribution.
- #6210: Preserve Kimi K3 reasoning efforts (`low`, `high`, `max`) theo docs.

**Infrastructure:**
- #6216: Expand MCP service presets từ 16 lên 134 (Google Workspace, Slack, GitHub...).
- #6206: Centralize JSON request retries cho transcription và AssemblyAI.
- #6204: Deduplicate durable writes và file-edit path resolution.
- #6202: Hide default tools (`rg`, `write_file`, `list_dir`) khi `exec` covers capabilities.

**Features:**
- #6195: Add read-only Google Drive tool với service account auth.

### Open PRs đang review

- #6168: Integrate managed installs và recoverable in-app updates - tiếp tục #5817.
- #5943 (P1): Refactor session state ownership sang SQLite transactions, tách khỏi JSONL - **architectural change lớn**.
- #6215: Skip idle compaction during direct turns - fix cho #6214.

### Issues

- #6214/#6213 (duplicate): Idle compaction có thể archive session có turn đang chạy qua `process_direct` - **critical bug**. `_pending_queues` không track direct turns.
- #6200: Spam promotion hosted nanobot - đã closed.

## 4. Điểm nổi bật cộng đồng

**Highest engagement:** Không có PR/issue nào có interaction đặc biệt cao. Phần lớn activity là internal maintainer work.

**Community contributions:**
- #6195 (gianfrancodemarco): Google Drive tool - first-time contributor.
- #5875 (smiraldr/io.net): Official provider integration.
- #6198 (DKlaper): Fix upload credentials cho edge deployments.

**Spam/Low quality:**
- #6200: Promotional issue cho hosted service - rejected nhanh.

## 5. Ổn định & Bugs

### Critical (P0)
- #6221: Race condition giữa compaction và active turns → mất reply data. **Đã fix.**

### High Priority (P1)
- #5943: Session state concurrency issues với JSONL - đang refactor sang SQLite.

### Medium Priority (P2)
- #6214: Idle compaction không check direct turns - **đang fix #6215**.
- #6222: Shell path bypass workspace restriction - **đã fix**.
- #6225: Plugin snapshot regression - **đã fix**.
- #6219: Import validation race - **đã fix**.
- Multiple WebUI rendering bugs - **đã fix hết**.

### Pattern
Nhiều bugs liên quan concurrency và state management. Xu hướng refactor sang centralized state (SQLite) và move blocking operations off event loop.

## 6. Yêu cầu tính năng

**Merged:**
- #6216: 118 MCP presets mới (Google Workspace, Slack, GitHub, Notion...).
- #6195: Google Drive read-only tool.
- #5875: IO Intelligence provider.

**In progress:**
- #6168: Managed updates và recovery flow.

**Backlog visible:**
- #5727: Documentation cho headless login secret.
- #4812: Test coverage cho missing-role archive formatting.

Không có user-requested features mới trong 24h. Toàn bộ work là maintenance và polish.

## 7. Phản hồi người dùng

Minimal direct user feedback. Majority activity là internal QA:
- Bug reports từ maintainers qua testing.
- Community contributions chủ yếu providers và tools.
- #6198: User report upload breaks behind proxy - addressed quickly.

Không có complaints hay feature requests từ end users.

## 8. Backlog & Roadmap

**Immediate priorities (từ open PRs):**
1. **Session stability** (#5943): SQLite migration cho concurrent access.
2. **Compaction safety** (#6215): Fix direct turn exclusion.
3. **Update experience** (#6168): Managed installs và recovery.

**Technical debt cleanup:**
- Consolidating retry logic (#6206 merged).
- Removing dead code (#6189 merged).
- Performance: move blocking work off event loop (#6220, #6224 merged).

**Roadmap signals:**
- MCP ecosystem expansion tiếp tục (#6216).
- Provider diversity tăng (IO Intelligence #5875).
- Focus shift từ features sang stability và performance.

---

**Nhận xét tổng quan:** 
Maintenance sprint thành công. 30 merges trong 24h, chủ yếu polish và bug fixes. Critical race condition được phát hiện và fix nhanh. Không có breaking changes hay controversial decisions. Team đang tích cực refactor concurrency handling và move towards SQLite state management - preparation cho scale.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-15

## 📊 Tóm tắt hôm nay

Ngày 15/10 ghi nhận 7 issue mới và 1 PR mới, tập trung vào email channel và streaming features. Không có release. Cộng đồng đang push mạnh về tích hợp email với private CA và cải thiện UX cho Telegram/Slack streaming.

## 🚀 Releases

Không có release trong 24h qua.

## 📈 Tiến độ dự án

### PRs nổi bật:

**Email Channel - Cải tiến lớn:**
- **#11752** (mới hôm nay): Thêm `tls_ca_cert_path` cho IMAP/SMTP với private CA
- **#11750**: Fix mail loop - không reply auto-reply/bounce/OOO nữa  
- **#11748**: Hỗ trợ STARTTLS trên port 587 (Office 365)
- **#11746**: Fix lưu attachment vào workspace (trước giờ chỉ bytes tồn tại 1 turn)

**Streaming & UX:**
- **#11744**: Stream model reasoning vào Telegram/Slack draft (giống Matrix)
- **#11739**: Fix Telegram không rút ack reaction khi reply xong
- **#11661**: Web UI focus lại message box sau khi turn kết thúc

**Security & Infrastructure:**
- **#11410**: Guard cron writes + contain unscoped execution (stack lớn, risk:high)
- **#11736**: Bump rustls 0.23.46 fix 4 CVE Brotli (RUSTSEC-2026-0346→0349)
- **#11737**: Restore principal-owned Chat sessions sau restart

**ZeroCode IDE:**
- **#11573**: Drag session rows + switch by number
- **#11506**: Show saved/applied config status
- **#11466**: Report per-target application results

### Xu hướng:
Email channel đang được overhaul toàn diện - 4 PR cùng ngày fix attachment, TLS, auto-reply, private CA. Production-ready hơn rõ rệt.

## 🔥 Điểm nổi bật cộng đồng

**Issues được quan tâm:**
- **#11751**: Private CA cho email - enterprise use case
- **#11749**: Mail loop risk - severity S2, critical cho production
- **#11747**: STARTTLS Office 365 - blocker cho nhiều org

**Contributor active:**
- @RustLangLatam: 4 email PRs + 3 issues (đang drive email channel improvement)
- @wray-lee: 3 PRs (streaming, docs, config)
- @Audacity88: ZeroCode features (drag sessions, config status)

## 🐛 Ổn định & Bugs

**Critical:**
- **#11749**: Email channel reply auto-reply → mail loop
- **#11745**: Inbound attachment không save (chỉ bytes 1 turn)

**Security:**
- **#11736**: 4 rustls CVE fixed (Brotli cert decompression)
- **#11410**: Unscoped cron execution contained

**Platform:**
- **#11364**: Arduino-cli Windows test failing từ 2026-09
- **#11651**: Telegram 429 flood không honor `retry_after`

**Provider:**
- **#11742**: Custom provider mặc định text-fallback, không parse DSML markup
- **#9447**: Anthropic incomplete terminal responses misclassified

## ✨ Yêu cầu tính năng

**Đã implement/in-progress:**
- Email với private CA (#11752) ✅
- STARTTLS SMTP (#11748) ✅  
- Stream reasoning trong Telegram/Slack (#11744) ✅
- Drag session rows ZeroCode (#11573) ✅

**Đang đề xuất:**
- **#11735 [RFC]**: Bounded tool results tại turn boundary (control context growth)
- **#11743**: Show reasoning trong streaming draft (merged vào #11744)
- **#11577**: Subagent trên operator-declared model route

**Long-term stack:**
- **#10407**: Persistent session prompt attachments (SQLite, bounded prompts)

## 💬 Phản hồi người dùng

**Pain points:**
- Email channel chưa production-ready (4 bugs/gaps cùng lúc)
- Office 365 SMTP không dùng được → blocker adoption
- Private CA trust thiếu → enterprise không deploy được
- Telegram ack reaction stuck → UX janky

**Positive:**
- Streaming reasoning đang được mở rộng cross-channel
- ZeroCode IDE features tiếp tục được polish
- Security issues được patch nhanh (rustls same day)

## 🗺️ Backlog & Roadmap

**Immediate (đang merge):**
- Email channel production hardening (4 PRs)
- Streaming parity across channels
- Security patches (rustls CVE)

**Short-term (PRs open):**
- Session persistence (#10407, #11737)
- Auth & cron security (#11410)
- Provider reliability (Anthropic #9447)
- Config application feedback (#11466, #11506)

**Architecture proposals:**
- Bounded tool results RFC (#11735)
- Subagent model routing (#11577)

**Blockers:**
- #11364 Windows CI red từ tháng 9
- #11651 Telegram rate limiting không tuân Telegram spec
- #9447 Anthropic terminal classification (trusted contributor stuck)

---

**Nhận xét:** Email channel đang có sprint lớn hướng enterprise. Nhiều PR cùng ngày từ cùng contributor cho thấy focused effort. Security patching reactive tốt (rustls same-day). ZeroCode features steady nhưng stack depth cao (#11506 depends #11466 depends #10911).

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-15

## 1. Tóm tắt hôm nay

Không có hoạt động mới trong 24h qua. Issue #3417 vẫn mở từ 6 ngày trước, thông báo fork community-maintained do repo chính không còn được maintain.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Dự án đã ngừng maintain chính thức.**

Issue #3417 cho thấy:
- Repo gốc không còn hoạt động
- User @afjcjsbx tạo fork tại https://github.com/afjcjsbx/picoclaw
- Fork này cam kết maintain tiếp
- Không có phản hồi từ maintainer gốc

Không có PR nào được cập nhật → xác nhận dự án đóng băng.

## 4. Điểm nổi bật cộng đồng

Issue #3417:
- 👍 0 reactions → community response thấp
- 1 comment duy nhất
- Đăng từ 6 ngày trước, cập nhật lần cuối ngày hôm qua
- Cộng đồng chưa tập trung về fork mới

**Dấu hiệu:** Community nhỏ hoặc chưa biết về fork.

## 5. Ổn định & Bugs

Không có bug report mới trong 24h. Không thể đánh giá stability do không có hoạt động.

## 6. Yêu cầu tính năng

Không có feature request mới.

## 7. Phản hồi người dùng

**Thất vọng về việc unmaintained:**
- User @afjcjsbx chủ động fork do "significant interest and demand from the community"
- Không thấy user khác lên tiếng trong 24h qua
- Community im lặng → có thể đã chuyển sang alternatives hoặc chờ xem

## 8. Backlog & Roadmap

**Repo chính:** Không có roadmap. Đã abandoned.

**Fork mới (afjcjsbx/picoclaw):** 
- Cam kết "actively maintain"
- Chưa có roadmap cụ thể được công bố
- Cần thời gian để community verify fork có thực sự active không

---

**Kết luận:** PicoClaw đang trong giai đoạn chuyển giao không chính thức sang community fork. Hoạt động gần như đóng băng. User muốn dùng nên theo dõi fork mới, nhưng cần cẩn thận vì chưa có track record.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-15

## 1. Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào bảo trì: pin Ubuntu runner, fix dashboard memory crash, bump dependencies. 10 PRs active, 1 issue open. Core team làm việc trên hardening và stability.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Merged:**
- #4069: Bump Claude Code → 2.1.296, Agent SDK → 0.3.296, Codex → 0.162.1. Haiku 5.5 giờ là default.
- #4067: Vitest 4.1.4 → 4.1.11 (dependency bump)

**Active PRs:**

**Infrastructure (2)**
- #4085 [NEW]: Pin tất cả workflows từ `ubuntu-latest` → `ubuntu-26.04`. Tránh surprise khi GitHub rollover (2026-10-19 đến 11-19)
- #2433 [OPEN]: OneCLI installer bind admin API (:10254) và Postgres (:5432) lên docker0 bridge. Containers trên bridge đó reach được → security hole. PR chưa có.

**Bugs (4)**
- #4086 [NEW]: Dashboard pusher dùng `fs.readFileSync()` cho transcript. >512MB crash (Node string limit). Cần stream.
- #3674: Teams reject files vì thiếu MIME type. PR add MIME metadata.
- #3596: Teams user ID có dấu `:` break card clicks và sender resolution. Namespace logic chưa consistent.
- #3597: MCP servers trên `host.docker.internal` unreachable khi gateway proxy active. Cần bypass proxy cho host-local.

**Other (4)**
- #3451: Barrel imports attribute wrong khi update skills
- #3673: Mailbox spawn checks dùng timeout không realistic
- #2899: Discord button tap đều route về **reject** vì parse `custom_id` sai (`\n` delimiter không strip)

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có engagement đặc biệt. #2433 có 1 comment, priority/high tag. Phần lớn PR từ core team (@glifocat, @gavrielc, @NechuBM) và external contributors (@orgads, @witek, @rudgalvis).

## 5. Ổn định & Bugs

**Critical:**
- #2433: Security hole - admin API exposed trên docker bridge
- #4086: Memory crash khi transcript >512MB

**Medium:**
- #3674, #3596, #3597: Teams và MCP server connectivity issues
- #2899: Discord interaction routing broken

Xu hướng: nhiều edge-case bugs từ integration thực tế (Teams, Discord, HTTP MCP). Dashboard scale issue cho thấy product đang gặp transcript files lớn trong production.

## 6. Yêu cầu tính năng

Không có feature request mới. Activity 100% bug fixes và maintenance.

## 7. Phản hồi người dùng

Không có discussion hay comment chains. PRs mostly từ contributors, ít feedback từ broader community.

## 8. Backlog & Roadmap

Không có thông tin roadmap. Active backlog có 6 PRs chưa merge (4 fixes, 2 infrastructure). Priority cao nhất:
1. #2433 - security (admin API exposure)
2. #4086 - stability (memory crash)
3. #4085 - infrastructure (runner pin trước rollover 19/10)

---

**Nhận xét:** Giai đoạn consolidation. Không có feature development, toàn hardening và edge-case fixing. Claude Code 2.1.296 với Haiku 5.5 default là infrastructure change lớn nhất. Security issue #2433 cần attention gấp.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-10-15

## 1. Tóm tắt hôm nay

Ngày tập trung cải thiện trải nghiệm Slack: streaming replies real-time, status reactions theo vòng đời task, và routing model theo prefix rõ ràng hơn. Không có issue mới, 5 PR đều mở trong 14/10, chưa merge.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Chủ đề chính: Slack integration + Provider infrastructure**

- **#1058** - Stream replies khi agent đang generate (chưa đợi hoàn thành). 2 commits, 2044+ insertions đầu tiên. Cải thiện feedback loop.
- **#1061** - Reactions trên Slack message theo lifecycle task (👀 starting → ⚡ working → ✅ done hoặc ❌ fail). UX polish.
- **#1057** - Native tool calls trong streaming mode. 6 files, 790+ insertions. High risk (theo `AGENTS.md` §5). Unlocks tool use không cần đợi full response.
- **#1060** - Fix routing providers khi dùng `provider/model` syntax. Trước đây chỉ hoạt động với primary provider + fallback list, giờ mở rộng.
- **#1059** - Config `agent.reasoning_mode` default. Additive change, low risk thực tế nhưng mark high vì schema change.

**Xu hướng**: Platform maturity - polish integrations (Slack), stabilize provider layer. High activity từ @wray-lee.

## 4. Điểm nổi bật cộng đồng

Không có tương tác (0 👍, 0 comments). PRs mới mở, chưa review. Dự án có vẻ team nhỏ hoặc review chậm.

## 5. Ổn định & Bugs

- **#1060** - Fix routing bug. Providers ngoài primary + fallback bị bỏ qua khi explicit prefix.
- **#1057** - Risk tier high. Tool calls + streaming = edge cases nhiều (partial chunks, error mid-stream).

Không có bug reports từ users.

## 6. Yêu cầu tính năng

Tất cả 5 PRs là features, không phải requests từ users:

- Streaming UX (Slack replies, tool calls)
- Status visibility (reactions)
- Config flexibility (reasoning mode default)
- Provider routing improvements

Driven by maintainer, không thấy community input.

## 7. Phản hồi người dùng

Không có. Zero engagement trên PRs.

## 8. Backlog & Roadmap

Không có thông tin roadmap rõ ràng. Inferred từ PRs:

- **Near-term**: Merge các streaming features (dependent: #1057 → #1058)
- **Focus area**: Real-time interactions, multi-provider support
- **Technical debt**: Đang refactor provider layer (2 PRs liên quan)

Thiếu discussion/planning issues. Development reactive, không có visible roadmap public.

---

**Đánh giá tổng thể**: Development velocity cao (5 PRs/ngày) nhưng community engagement thấp. Dự án đang polish infrastructure, chưa có feedback loop với users. Risk: features ship mà không validate với use cases thực.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw — 2026-10-14

## 🎯 Tóm tắt hôm nay

Phát hành **2 beta liên tiếp** (v2.2.2-beta.5 và beta.6), sửa lỗi E2E test selector và thêm hỗ trợ database path bên ngoài workspace. Mở **16 PR mới**, tập trung vào console UX, plugin architecture, và công cụ Python code orchestration. Cộng đồng báo 3 bug vận hành (CRLF trên Windows, cron job bị hủy sau config reload, context window sai với Ollama).

---

## 🚀 Releases

### **v2.2.2-beta.6** (2026-10-14)
- **Fix E2E test selector** (#8247): test cũ dùng selector lỗi thời sau khi UI đổi structure → CI release pass
- **External database paths** (#8246): cho phép đường dẫn tuyệt đối, `~`, symlink cho history DB → hỗ trợ backup portable và network storage

### **v2.2.2-beta.5** (2026-10-14)  
- Fix DST timezone cho transcript timestamps
- GPT token limit parameter mới
- Console UI refinements

**Release duty bot** tự động mở issue validation (#8242, #8258) → CI kiểm tra 4 platform, deadline 4 giờ.

---

## 📊 Tiến độ dự án

### **Console & UX cải tiến**
- **#8240**: tách model management thành 3 scope (global defaults, provider config, per-agent runtime) → rõ context, bỏ full-modal cho frequent actions
- **#8203**: echo user message ngay khi gửi trên mobile/tab khác → trước chỉ hiện sau khi turn xong
- **#8251**: message-navigation directory sai vị trí vì dùng item count thay vì measure → navigation không chính xác
- **#8245**: HTML preview cần JS hiện blank → thêm note + "Open in browser" button

### **Plugin architecture mở rộng**
- **#7565** (size XXXL): clean plugin unload + rollback-safe hot reload → install/update không rebuild mọi workspace, failed update không để bản nửa chừng
- **#8239 + #8248**: thêm inline UI plugin API → render OpenUI components trong assistant messages, submit scoped actions
- **#8187**: extract channels sang plugins với subprocess isolation

### **Tool & Agent capabilities**
- **#8224** (XXL): rebuild Code Mode → Python tool orchestration, 1 `run_code` tool gọi native tools qua `await tools.<name>()`
- **#8259**: structured human-in-the-loop questions → agent dừng giữa chừng, hỏi user câu có cấu trúc, đợi trả lời rồi chạy tiếp
- **#7761**: brace expansion cho `glob_search` (`**/*.{csv,xlsx}`) → trước không match
- **#8174 → #8204**: Tavily API key config → paid user dùng được quota riêng, fallback keyless nếu lỗi

### **Runtime & infrastructure**
- **#8001**: timeout tool trả result thành công (không interrupt) → parent model tiếp tục produce final answer
- **#8229**: truncate base64 tool outputs khi serve chat history → tránh 10 MB response timeout trên mạng chậm
- **#8205**: TypeSafe/JEV decision-model provider → tách chat vs decision model type
- **#8253**: JSON-driven evaluation website → maintainer submit result JSON, build validate + gen leaderboard

### **Fixes vận hành quan trọng**
- **#8235**: CRLF preservation trong `edit_file` → trước normalize LF → mất line-ending Windows
- **#8234**: decode GBK/CP936 trong `read_file`/`grep_search` → trước drop non-UTF8 bytes → Chinese Windows text mất data
- **#8236**: Ollama context window từ `num_ctx`, không dùng 128k default → đúng với local model config
- **#8244**: skip disabled channel SDK khi startup → giảm 15s import overhead trên Windows default profile
- **#8243**: rotate desktop logs trên Windows → tee handle ngăn `RotatingFileHandler` rename
- **#8241**: desktop đợi core readiness thay vì chỉ `/api/version` → không navigate console khi agent đang init

---

## 🔥 Điểm nổi bật cộng đồng

### **Top issues**
1. **#8120** (7 bình luận): "页面加载失败" frequent trên nhiều thiết bị → major UX blocker
2. **#8174** (4 bình luận): Tavily keyless-only → paid user không xài được quota → PR #8204 đang review
3. **#8252 + #8225** (mỗi cái 2 bình luận): cron job + agent call bị cancel sau config save → hot-reload issue quan trọng
4. **#7396** (3 bình luận): Claude Code third-party harness status → marked "Coming soon", user hỏi roadmap

### **First-time contributors xuất hiện**
- @YpXstyle (#8259): human-in-the-loop tool
- @neal1iu (#4577): `qwenpaw models list --json --configured-only`
- @Li-john1021 (#8204): Tavily API key support

---

## 🐛 Ổn định & Bugs

### **Bug vận hành đang fix**
- **CRLF/GBK trên Windows** (#8235, #8234): `edit_file` normalize LF, `read_file` drop GBK → PR merged
- **Cron task cancel sau config save** (#8225, #8252): hot-reload cancel running cron, không log → cần investigate
- **Ollama context window** (#8236): sai 128k default → fix dùng `num_ctx`
- **Message-navigation positioning** (#8251): dùng item count thay vì measure → fix đang review

### **Desktop platform issues**
- **#8243**: Windows log không rotate → sidecar tee handle block rename
- **#8241**: startup navigate console khi core chưa sẵn sàng → race resource
- **#8244**: 15s channel SDK import overhead → skip disabled channels

### **Known limitations**
- **#8229**: console 30s request timeout với large history → mitigate bằng truncate base64 tool outputs

---

## 💡 Yêu cầu tính năng

### **Đã có PR**
1. **Python Code Mode** (#8224): tool orchestration trong CPython worker → experimental rebuild
2. **Inline UI plugins** (#8239, #8248): OpenUI components trong chat → no host deps
3. **Human-in-the-loop tool** (#8259): structured questions mid-run
4. **Decision model separation** (#8205): TypeSafe/JEV config riêng cho decision vs chat
5. **External DB paths** (#8246 merged): absolute/symlink/network paths cho history

### **Đang yêu cầu**
- **#8256, #8255**: Docker Hub mode instructions thiếu
- **#8254 → #8257**: Settings Center không honor menu visibility override
- **#8249**: Cron job modification UX → time reset 0:00, Request Content hiện `[object Object]`

---

## 💬 Phản hồi người dùng

### **Pain points rõ nhất**
1. **Page loading failures** (#8120): nhiều user báo, frequent occurrence → stability concern
2. **Hot-reload side effects** (#8225, #8252): config save cancel cron/agent calls, zero feedback → breaking workflow
3. **CRLF/GBK on Windows** (#8235, #8234): data loss silent → critical cho Chinese users
4. **Large history timeout** (#8229): 10 MB response vs 30s timeout trên slow link

### **UX friction**
- Model management scope unclear (#8240 addressing)
- HTML preview blank (#8245 fixed)
- Message navigation inaccurate (#8251 fixing)
- Cron edit form UX issues (#8249)

### **Feature gaps**
- Claude Code harness timeline unclear (#7396)
- Tavily paid quota unusable → fixed #8204
- Brace expansion glob → fixed #7761

---

## 📋 Backlog & Roadmap

### **Active workstreams (XXXL PRs)**
1. **Plugin architecture** (#7565): clean unload/reload foundation
2. **Code Mode rebuild** (#8224): Python orchestration + tool interop
3. **Inline UI system** (#8239, #8248): generic plugin rendering
4. **Channel extraction** (#8187): subprocess isolation
5. **Evaluation index** (#8253): JSON-driven leaderboard

### **Release cadence**
- 2 betas 1 ngày (beta.5 và beta.6) → rapid iteration trên bugfixes
- Release duty bot automation → 4-hour validation window
- E2E test alignment critical cho release pass

### **Upcoming (inferred)**
- Claude Code harness implementation
- Hot-reload safety improvements (cron/agent call preservation)
- Console performance tuning (startup, large history)
- Hub mode Docker documentation

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*