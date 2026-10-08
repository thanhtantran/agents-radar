# Bản tin Hệ sinh thái Hermes Agent 2026-10-08

> Issues: 127 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-08 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-08

## 📊 Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa lỗi nghiêm trọng về session state và gateway stability. Team xử lý 30+ PR, nhiều issue P0/P1 về data loss và desktop UX.

## 🚀 Releases

Không có release trong 24h qua.

## 📈 Tiến độ dự án

### PR quan trọng đã merge/đóng

**#134847** - Fix desktop model switch ghost error card
- Desktop hiện failed card khi đổi model, nhưng reply vẫn chạy
- Root cause: confirm dialog không xuất hiện, card đỏ xuất hiện nhầm
- Đã sửa logic confirm flow

**#126947** - Fix Desktop Review commit failure  
- `GIT_CONFIG_GLOBAL=/dev/null` xóa identity, commit từ Review pane fail
- Thêm forward `user.name`/`user.email` vào noninteractive git env

**#134128** - Fix Dashboard OAuth gzip decode
- Token response gzip-encoded, header check sai → login fail HTTP 503
- Sửa header validation

### PR đang mở quan trọng

**#106742** (P1) - One gateway owns all local sessions
- Merge CLI/TUI/Desktop/ACP/bots/cron vào 1 gateway-owned session
- Loại bỏ race condition trên cùng `state.db`
- Breaking change lớn, cần review kỹ

**#134853** - Fix /yolo reset sau backend restart
- Desktop/TUI mất YOLO toggle khi backend restart
- Session resume không preserve YOLO state
- Salvage #96267, #132948

**#72200** - Skills catalog compact mode
- Thêm `agent.skills_catalog_mode` để nén `<available_skills>` block
- Giảm cache prefix size trên chat surfaces
- Names-only mode đã có, PR này expose config toggle

## 🔥 Điểm nổi bật cộng đồng

**#132401** (P0, 19 comments) - Scratch prune data loss
- 24h idle delete xóa multi-day agent work trong TMPDIR
- Không có log, không quarantine, không keep-marker
- User mất nguyên cả workspace, ảnh hưởng nghiêm trọng

**#133716** (P0, 5 comments) - Desktop regenerate truncated 107 messages
- Regenerate tail message replay turn 4h cũ, xóa 107 message live
- Valid row-id anchor bypass mọi truncation guard
- Không có server-side depth gate

**#133375** (P1, 4 comments) - FTS corruption → 14h silent data loss
- `messages_fts` (FTS5) corruption → mọi transcript write fail 14.5h
- Gateway chạy bình thường Telegram, user thấy agent mất trí nhớ
- ~50 conversations bị ảnh hưởng, cần one-shot rebuild + repair-on-open

## 🐛 Ổn định & Bugs

### P0 (Critical)

**#132401** - Scratch prune silent delete  
Hermes point `TMPDIR` → `~/.hermes/cache/scratch`, 24h idle prune xóa sạch agent work. Không warning, không recovery.

**#133716** - Regenerate truncated 107 live messages  
Desktop regenerate on tail message replay old turn, xóa 107 message. Anchor bypass guards, no depth gate.

### P1 (High priority)

**#123985** - Desktop duplicate messages sau compaction  
Earliest messages render 2x sau in-place compaction. `messages` rows chứa duplicate display index.

**#128293** - Duplicate rows sau compaction (no delegation)  
Giống #126021 symptom, nhưng xảy ra trên sync conversation không có delegation fan-out.

**#126667** - Lease refresher kill healthy turn  
SQLite lock transient → lease refresher treat as lease loss → hard interrupt healthy turn.

### P2 (Medium priority)

**#127665** - Desktop render reply 2x  
Row đã commit nhưng vẫn render 2x. Fold khác với #127288.

**#133992** - macOS Desktop update hand-off loop  
`hermes update` refuse lock held by custodian process → update fail exit 2.

**#59293** - `hermes config set` bypass approval layer  
CLI mutate config ungate, agent với terminal access tắt được approval layer.

## 💡 Yêu cầu tính năng

**#38519** (18 👍) - Frontend-only Desktop install  
User muốn install Desktop frontend only, connect remote agent. Windows installer không support.

**#48375** (10 👍) - Desktop composer spellcheck  
Prompt input không có spellcheck. User gõ long prompt hay non-native English gặp khó.

**#53347** (6 👍) - Allow context_length < 64K  
Hard minimum 64K block resource-constrained hardware. Nhiều model chạy tốt ở 32K cho simple use case.

**#49422** (4 👍) - Customizable send/newline shortcuts  
Enter send dễ accidental trigger. User muốn customize như WeChat/QQ/Feishu.

**#17923** (2 👍) - OpenRouter free tier filter  
`/models` thiếu nhiều free OpenRouter models. Cần filter `free_only` và include full free catalog.

## 💬 Phản hồi người dùng

**Positive:**
- #134860 `/copy code [n]` được suggest, salvage từ #71849 parsers
- #111259 Desktop composer ↑/↓ recall toggle shipped default-on

**Negative:**
- #134008 (1 👍) - Repo bot review pipeline stuck, PR outdated trước khi merge
- #89548 - Desktop custom layout không persist sau restart
- #118901 - Composer timer tick mãi sau task complete
- #121910 - Bottom dock strobe với transparent surfaces

**Security concerns:**
- #59293 - CLI bypass approval layer ungate
- #98078 - Self-repo mutation guard bypass via `write_file` + interpreter
- #59735 - `hermes backup` default `$HOME` no chmod, leak 0644

## 📋 Backlog & Roadmap

### Ưu tiên cao (P0/P1)

1. **Session state integrity** - 4+ duplicate/truncation issues active
2. **Gateway stability** - FTS corruption, lease refresher false positive
3. **Desktop UX regressions** - Update loop, YOLO reset, duplicate render

### Ưu tiên trung bình (P2)

1. **Windows compatibility** - Git Bash ASLR, SSH backend validation
2. **Config safety** - Approval bypass, backup permissions
3. **Model support** - Claude Haiku 5.5 thinking, OpenRouter free tier

### Long-term (P3)

1. **Feature requests** - Frontend-only install, spellcheck, layout persist
2. **Plugin ecosystem** - API remount, catalog maintenance
3. **Platform polish** - TUI copy blocks, translucency slider

### Breaking changes pipeline

**#106742** - One gateway architecture  
Merge all local sessions. Cần migration path, extensive testing trước khi merge.

---

## So sánh hệ sinh thái chéo

# Báo cáo So Sánh Hệ Sinh Thái AI Agent - 2026-10-08

## 1. 📊 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang ở giai đoạn **ổn định sau tăng trưởng nhanh**. 10 dự án focus vào 3 ưu tiên: stability (session/memory bugs), security (sandbox/auth), UX polish (Desktop/Web UI).

**Snapshot ngày 08/10:**
- 0 release mới (trừ OpenClaw beta)
- 500+ PR đang xử lý (Hermes, OpenClaw mỗi bên 500)
- Bug P0/P1 về data loss, session state, memory leak chiếm dominant
- Hoạt động cộng đồng thấp: ít reactions, contributors nội bộ chủ đạo

## 2. 🔢 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Mức độ hoạt động | Community Engagement | Maturity |
|-------|--------|-----|----------|------------------|---------------------|----------|
| **Hermes Agent** | 127 | 500 | 0 | 🔥🔥🔥 Cao (30+ PR/ngày) | Thấp (ít reactions) | Production-grade |
| **OpenClaw** | 171 | 500 | 1 (beta) | 🔥🔥🔥 Cao | Trung bình (12-19 comments) | Late beta |
| **NanoBot** | 3 | 14 | 0 | 🔥 Trung bình | Rất thấp (0 reactions) | Alpha polish |
| **ZeroClaw** | 21 | 50 | 0 | 🔥🔥 Trung bình-cao | Rất thấp | Early-mid alpha |
| **PicoClaw** | 2 | 7 | 0 | 🟡 Thấp (stale) | Không có | Pre-alpha |
| **NanoClaw** | 2 | 3 | 0 | 🟡 Thấp | Không có | Early alpha |
| **NullClaw** | 0 | 1 | 0 | 🟡 Rất thấp | Không có | Proof-of-concept |
| **IronClaw** | 1 | 2 | 0 | 🟡 Thấp | Rất thấp | Maintenance mode? |
| **Qwen-Paw** | 6 | 4 | 0 | 🔥 Trung bình | Thấp | Early beta |

**Patterns:**
- **Leaders**: Hermes + OpenClaw chiếm 90%+ hoạt động, 1000 PRs/tháng combined
- **Mid-tier**: NanoBot, ZeroClaw, Qwen-Paw có velocity ổn định
- **Long tail**: 5 dự án còn lại velocity < 5 PRs/tuần, community im lặng

## 3. 🎯 Vị thế Hermes Agent

### Vai trò: **Flagship enterprise-grade agent**

**Strengths:**
- Velocity cao nhất (500 PRs open, 30+/ngày merge)
- Architecture mature: gateway stability, session compaction, lease management
- Desktop UX polish: model switch, OAuth, review pane
- Database-backed (SQLite FTS5) cho transcript scale

**Pain points đặc trưng:**
- **Data loss bugs critical**: scratch prune (#132401), regenerate truncation (#133716), FTS corruption (#133375) → 50+ conversations ảnh hưởng
- **Desktop regressions**: YOLO reset, duplicate render, update loop
- **Breaking changes pipeline**: gateway consolidation (#106742) chờ merge → chặn v1.0

**So với competitors:**
- OpenClaw có similar scale nhưng focus memory system hơn (recall eviction #150635)
- ZeroClaw focus security (plugin isolation, sandbox) hơn
- Hermes balance giữa production stability và enterprise features (Skills catalog, approval layer)

### Position: **Production-first với tech debt từ rapid scale**

Hermes ở stage "harden existing" thay vì "add new". P0/P1 backlog lớn nhưng có clear ownership và priority.

## 4. 🔧 Hướng kỹ thuật chung

### Convergence patterns:

**1. Session/Memory Architecture**
- **Hermes**: Gateway-owned sessions (#106742), in-place compaction
- **OpenClaw**: Remote worker attachments, registry migration
- **Qwen-Paw**: Scroll compaction, stream recovery
- **NanoClaw**: Mounted-inbox mechanism

→ **Trend**: Centralized session management + compaction để handle long-running conversations

**2. Multi-channel Support**
- Telegram/Discord/Signal/WhatsApp đều có issues routing/attachment
- PicoClaw #3413: Global multi-channel sidebar
- OpenClaw #166869: Telegram reply visibility
- NanoClaw #3837: Signal adapter consolidation

→ **Trend**: Channel abstraction layers, unified inbox UX

**3. Context Window Management**
- Hermes: Skills catalog compact mode (#72200)
- Qwen-Paw: Context overflow recovery (#8118)
- NanoBot: Spec chưa rõ nhưng có #5298 MCP schema budget

→ **Trend**: Intelligent truncation/summarization thay vì hard limits

**4. Security/Sandboxing**
- ZeroClaw heavy focus: plugin payload admission (#11232), sandbox policy (#7821)
- NanoBot: MCP presets với checksum verify (#6091)
- Hermes: Approval layer bypass bugs (#59293)

→ **Trend**: MCP-based tool isolation, verification chains

**5. Desktop/Web UI Polish**
- Hermes, OpenClaw, PicoClaw, NanoBot đều có UI regression bugs
- Skeleton loading, contrast fixes, multi-tab state
- Desktop startup hang (Qwen-Paw #8115: 11s cold start)

→ **Trend**: Production UX becoming gate thay vì afterthought

## 5. 🎨 Điểm khác biệt

### Architecture Philosophy

| | Hermes | OpenClaw | ZeroClaw | NanoBot |
|---|--------|----------|----------|---------|
| **Core** | Gateway + SQLite | Remote workers + registry | Config-driven daemon | MCP-first |
| **State** | Database-backed | Distributed sessions | TOML config | WebSocket session |
| **Security** | Approval layer | Memory system | Plugin isolation | Checksum verify |
| **Focus** | Enterprise scale | Recall/memory | Developer control | Extensibility |

**OpenClaw** = memory-first (deep recall, eviction bugs dominant)  
**ZeroClaw** = security-first (plugin admission, sandbox, password auth)  
**Hermes** = production-first (Desktop UX, gateway stability, skills catalog)  
**NanoBot** = MCP ecosystem expansion (computer use, extensions)

### Cộng đồng & Contributors

**Hermes/OpenClaw**: Team-driven, ít external contributors nhưng velocity cao  
**ZeroClaw**: 4-5 active external (@vrurg, @JordanTheJet)  
**NanoBot**: 1-2 contributors chính (@racso2609 carry PicoClaw với 4 PRs)  
**Long tail (Nano/Null/Iron)**: Single maintainer hoặc dormant

### Maturity Signals

**Production-ready:**
- Hermes: 500 PRs, Desktop app, enterprise features
- OpenClaw: Beta releases, remote worker arch

**Late alpha:**
- ZeroClaw: Config fragility bugs (#11606, #11579), no releases
- Qwen-Paw: Memory leaks (#7722), message queue bugs (#8116)

**Early/proof-of-concept:**
- NanoBot, PicoClaw, NanoClaw: Stale PRs, 0 releases
- NullClaw, IronClaw: <5 PRs/month

## 6. 📈 Mức độ trưởng thành cộng đồng

### Tier 1: **Enterprise Momentum**
**Hermes, OpenClaw** (500+ PRs mỗi bên)
- Velocity: 20-30 PR merges/ngày
- Bug triage: P0/P1 labels, tracking issues
- Docs: Release notes chi tiết, RFC process
- **Weakness**: Ít external contributors, reactions thấp → risk bus factor

### Tier 2: **Active Development**
**NanoBot, ZeroClaw, Qwen-Paw** (10-50 PRs)
- Velocity: 3-7 PRs/tuần
- First-time contributors có (Qwen-Paw #7865, #8118)
- Triage inconsistent, nhiều bugs >6 tháng chưa fix
- **Weakness**: Backlog overload, roadmap unclear

### Tier 3: **Maintenance/Dormant**
**PicoClaw, NanoClaw, NullClaw, IronClaw** (<5 PRs/tuần)
- Velocity: 0-2 PRs/tuần hoặc stale
- 0 reactions, 0-1 comments/issue
- Maintainers vắng cuối tuần
- **Risk**: Abandoned nếu không có sponsor/revival

### Community Health Metrics

| Metric | Hermes | OpenClaw | ZeroClaw | Others |
|--------|--------|----------|----------|--------|
| **Reactions/PR** | 0-1 | 0-2 | 0 | 0 |
| **Comments/issue** | 3-19 | 5-19 | 2-4 | 0-2 |
| **External PRs** | Rare | Rare | 4-5 active | 0-1 |
| **Release cadence** | Blocked | Beta/month | None | None |

**Signal**: Ecosystem team-driven, chưa có viral community adoption. Cần better onboarding/docs để scale externally.

## 7. 🔮 Tín hiệu xu hướng

### Short-term (Q4 2026)

**1. Consolidation Wave**
- 5/10 dự án có thể dormant hoặc merge
- Long tail (Pico/Nano/Null) thiếu momentum → candidates cho archive
- Hermes/OpenClaw sẽ absorb use cases

**2. Memory System Arms Race**
- OpenClaw recall bugs (#150635) → deep memory becomes table stakes
- Qwen-Paw message queue issues → conversation state becomes blocker
- **Winner**: Ai fix eviction/promotion trước

**3. MCP Ecosystem Maturity**
- NanoBot computer use (#6091), Mnemosyne memory
- ZeroClaw A2A protocol (#11254)
- **Prediction**: MCP becomes standard tool interface, replaces bespoke plugins

**4. Desktop/Web UI Parity**
- Hermes/OpenClaw/Qwen-Paw tất cả có Desktop startup/UX bugs
- PicoClaw multi-channel sidebar, global state
- **Trend**: Converge to unified WebView2/Electron shells

### Mid-term (2027)

**1. Agent-to-Agent Protocols**
- ZeroClaw A2A crate (#11254)
- NanoClaw routing bugs (#3136)
- Hermes bounded delegation (#11138)
- **Prediction**: Standardized A2A protocol (like ActivityPub for agents)

**2. Security/Sandboxing Commodity**
- ZeroClaw plugin isolation mature
- Hermes approval layer bugs fixed
- **Trend**: Security becomes baseline expectation, not differentiator

**3. Cloud-Native Architectures**
- OpenClaw remote workers
- ZeroClaw effort-aware routing (#11516 local vs cloud)
- **Prediction**: Hybrid local/cloud becomes default, pure-local niche

**4. Memory as Service**
- OpenClaw recall system
- NanoBot Mnemosyne MCP
- **Prediction**: External memory providers (vector DBs, graph stores) integrate via MCP

### Risks

**1. Fragmentation**
- 10 dự án, 6+ architectures khác nhau
- No shared standards (session format, memory API, A2A protocol)
- **Risk**: Community splits, interop impossible

**2. Data Loss Bugs Erode Trust**
- Hermes scratch prune (#132401), regenerate truncation (#133716)
- Qwen-Paw message queue (#8116)
- **Risk**: Production adoption stalls nếu không fix P0s

**3. Bus Factor**
- Hermes/OpenClaw team-driven, ít external contributors
- Long tail single-maintainer
- **Risk**: Key maintainers leave → projects die

### Opportunities

**1. Enterprise Adoption**
- Hermes skills catalog, approval layers → enterprise-ready
- OpenClaw remote workers → multi-tenant SaaS
- **Opportunity**: B2B market lớn nếu fix stability

**2. Platform Effects**
- MCP ecosystem → agent app store
- Channel adapters → omnichannel agents
- **Opportunity**: Winner takes most nếu platform mở và extensible

**3. Open Standards**
- A2A protocol
- Memory API
- Session format
- **Opportunity**: Consortium standardization → accelerate adoption

---

## Kết luận chiến lược

**Hermes position**: Leader về scale và production readiness, nhưng tech debt (P0 bugs) block v1.0. Focus sửa data loss + gateway consolidation → unlock enterprise.

**OpenClaw**: Strong #2, memory system differentiator. Fix recall bugs → pull ahead trên use cases cần long-term context.

**ZeroClaw**: Security-first niche, nhưng config fragility risk adoption. Stabilize → capture security-conscious devs.

**Rest**: NanoBot có MCP momentum, others dormant. Consolidation inevitable.

**Ecosystem trend**: Moving từ rapid feature adds sang stability + standards. Winners = ai ship production-grade memory + security + interop first.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw — 2026-10-08

## 1. Tóm tắt hôm nay

Release beta 2026.10.1-beta.2 vừa ship với fix lớn về memory + session stability. Activity tập trung vào bug P1/P0: zombie process leaks (#97616), context compaction blind spots (#138871), và Telegram reply text bị nuốt khi có automation context (#166869). 30 PR mới, ~50 issue nóng nhất có 3-19 comment.

---

## 2. Releases

### v2026.10.1-beta.2 (2026-10-08)

**Core fixes:**
- **Sessions/memory:** usage preserved across registry changes, remote worker attachments delivered, queued cancellations + transcript aliases không còn stall active turns
- **Continuation signatures:** aligned để prevent phantom tool calls
- **Embedding cache migration:** bounded batch + oversized-row reporting

Contributors nhắc: @vincentkoc

---

## 3. Tiến độ dự án

### PR nổi bật

**Ready to merge:**
- #166869: fix Telegram reply text bị che bởi automation context — đảm bảo reply user visible
- #166876: fix Astra (GPT-6) async tools — answer bị mất khi model tự gọi `sessions_yield`
- #166587: perf(gateway) — giảm SQLite load cho restart-safe chat (first + warmed turn nhanh hơn)

**In review:**
- #166753 + #166764 + #166775: stop command continuations khi user gọi Stop hoặc channel `/stop` — fix leak background command sau khi model reply xong
- #166772: Azure realtime transcription support — chuyển từ preview endpoint sang GA API

### Issue quan trọng

**P0/P1 bugs:**
- #97616 🦪 (18💬): zombie process leak từ hook/tool execution → crash-loop, runtime degradation
- #137729 🦞 (12💬): unguarded `.trim()` crash trong transcript replay + error classification
- #121661 🦞 (16💬): CLI-backed subagent announce-wake tắt tools → model tự fabricate tool output
- #165686 🦪 (9💬): 2026.9.8 Windows high CPU — Codex catalog rebuild + slow prep chiếm 1.5 core

**Session/memory issues:**
- #150635 🦞 (19💬): short-term recall evicts entries nightly → dreaming deep phase never promotes
- #157392 🦞 (5💬): recency decay runs before minScore → nested records >6 weeks unreachable
- #138871 🦞 (3💬, closed today): compaction gate blind khi usage stale — status display + gate disagree

---

## 4. Điểm nổi bật cộng đồng

**Most discussed (19-16 comments):**
- #150635: recall retention bug — nhiều user report deep memory không hoạt động sau vài tuần
- #97616: zombie leak — confirmed từ 2026.6 → 2026.10, nhiều deploy bị ảnh hưởng
- #121661: CLI subagent tool fabrication — claude-cli backend, model hallucinate tool results

**High engagement issues:**
- #59149 (8💬, 2👍): per-agent visibility scoping — 10-agent deployment không thể scope `agentToAgent` + `sessions.visibility` riêng
- #23451 (5💬): tool confirmation gate trước execution — user lo LLM gọi destructive tool trước khi confirm

---

## 5. Ổn định & Bugs

### Crash/performance critical

**Zombie leaks:**
- #97616: hook/tool child processes không reap → zombies tích lũy
- #165663: Codex app-server + MCP service groups không cleanup → high CPU/RSS, SQLite contention

**Gateway slowdowns:**
- #159499: Windows ready ~220s — plugin-registry phases chiếm 175s
- #160485: plugin load CPU-bound — 3 channel plugins chiếm 57.4s/60s do SDK graph recompiled mỗi instance

### Context/memory bugs

- #150635: recall eviction nightly → deep promotion broken
- #137729: `.trim()` calls on undefined → TypeError mask upstream error
- #138871: compaction gate blind khi provider outage → sessions balloon unchecked

### Platform-specific

- #137085 🦞 (5💬): macOS app 8.2 upgrade → device identity stuck "native-importing", gateway connection timeout
- #138560 🦪 (5💬): Windows control UI update abort với `managed-service-handoff-failed`

---

## 6. Yêu cầu tính năng

**Visibility/security:**
- #59149: per-agent agentToAgent + session visibility scoping (P2, needs decision)
- #23451: tool-level confirmation gate (P1, needs security review)

**UX improvements:**
- #70266: macOS Talk Mode sử dụng assistant avatar thay vì default orb
- #39343: image batching / media group buffering — tránh spam N replies cho album
- #138614: iOS hardware keyboard Return/Cmd+Return để send message

**Telegram/Discord:**
- #153678: Telegram Guest Mode support (Bot API 10.0 `guest_message`)
- #153677: native message drafts (`sendMessageDraft`) cho streaming replies

---

## 7. Phản hồi người dùng

### Pain points

**Memory system:**
- Deep memory không hoạt động lâu dài (recall eviction + promotion broken)
- Recency decay làm nested records >6 weeks unreachable

**Stability:**
- Zombie process accumulation sau vài ngày → restart required
- Windows slow startup (220s) khiến onboarding experience kém

**Channel quirks:**
- Telegram reply text bị che bởi automation notices
- WhatsApp pairing approved không notify người dùng
- Discord/Telegram progress mặc định quá im lặng

### Positive signals

- Azure realtime + Astra async tools được community request và đang fix nhanh
- Release notes rõ ràng, nhiều bug P1/P0 có PR trong ngày

---

## 8. Backlog & Roadmap

### Immediate (đang fix)

- Zombie process cleanup (#97616, #165663)
- Telegram reply text visibility (#166869 merged soon)
- Stop command retirement (#166753, #166764, #166775)

### Short-term (queued/needs review)

- Plugin load perf (SDK graph recompilation)
- Compaction gate blind spots
- Windows startup speed

### Needs decision

- Per-agent visibility scoping (#59149)
- Tool confirmation gates (#23451)
- Image batching strategy (#39343)

### Deferred/off-meta 🌊

- Guest Mode, native drafts (Telegram)
- Gateway restart rollback (#56227)

---

## Kết luận

Beta 2026.10.1-beta.2 stabilize memory + session. Focus hiện tại: zombie leak + command retirement + Telegram UX. P0/P1 bugs có momentum, nhưng backlog per-agent scoping + tool safety gates cần product decision.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-08

## 1. Tóm tắt hôm nay

Ngày tập trung polish UI/UX. 8 PR merge hoặc close, xử lý contrast dark mode, skeleton loading, separator cleanup. 2 PR lớn: directory picker in-app và computer use với Cua Driver. Không có release mới.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Đã merge/close hôm nay:**

- **#6095** (closed) - Fix contrast dark mode: destructive button từ 1.17:1 lên WCAG compliance
- **#6092** (closed) - Skeleton loading cho Apps/Channels/Skills catalog
- **#6087** (closed) - Bỏ middle-dot separator, hierarchy rõ hơn

**PR quan trọng đang review:**

- **#6089** (open, P2) - Directory picker in-app, thay thế native chooser. Finder-style columns, Tab cycle, breadcrumb. Giảm friction workspace selection
- **#6091** (open) - Computer use preset với Cua Driver 0.33.4 qua MCP. Nanobot giữ model/agent/policy, driver chỉ cung cấp desktop I/O. Checksum verify, sandboxed
- **#6096** (open, P2) - Codex WebSocket session: xài `previous_response_id`, không replay image/reasoning mỗi request. Giảm bandwidth cho PDF follow-up
- **#6097** (open, P2) - XLSX với chart-only sheet gây `AttributeError`. Skip chartsheet, chỉ read data worksheet
- **#6093** (open, P2) - PDF `read_file` cắt giữa page mất data. Preserve complete page
- **#6033** (open) - Runtime sidecar mất sau metadata update. Preserve checkpoint/provider state
- **#6032** (open, P2) - Local WebUI extensions surface, scoped routes, manifest validation

**PR lâu chưa merge:**

- **#5388** (Aug 13, conflict) - MCP schema budget opt-in. Deterministic lexical selection. Liên quan #5298
- **#4878** (Jul 10, closed) - Hook auto-discovery qua pkgutil + entry_points

**Xu hướng:**

WebUI polish chủ đạo. UX improvement (picker, skeleton, contrast, separator) và capability expansion (extensions, computer use). Performance fix (WebSocket session, PDF/XLSX). Core agent (#5388 MCP budget) bị conflict chưa xử lý.

## 4. Điểm nổi bật cộng đồng

Issues/PRs không có reaction. #6088 (dark mode contrast) open 07/10, fix #6095 merge ngay 08/10 — phản hồi nhanh.

## 5. Ổn định & Bugs

**Fixed:**

- Dark mode destructive contrast 1.17:1 (#6088 → #6095)
- Catalog empty state race (#6092)

**Đang fix:**

- XLSX chartsheet crash (#6097)
- PDF page cut-off mất data (#6093)
- Sidecar invalidate sau metadata update (#6033)

**Chưa xử lý:**

- WebSocket 1009 frame limit với Base64 attachment (#5980, open 29/09)

Bugs ở document handling (XLSX/PDF) và session persistence. Ưu tiên P2.

## 6. Yêu cầu tính năng

**Mới (07-08/10):**

- #6089 - In-app directory picker
- #6091 - Computer use MCP preset
- #6094 - Mnemosyne MCP memory preset (`uvx birkin-mnemosyne`)
- #6032 - Local WebUI extensions

**Cũ chưa xử lý:**

- #4419 (Jun 20) - Auto reasoning effort escalation. 2 level: default + escalated. Fail → tự tăng
- #5298 (Aug 08) - MCP schema budget cho large tool sets

Direction: thêm MCP presets (memory, computer use), cải thiện WebUI extension/plugin, smart agent behavior (reasoning escalation).

## 7. Phản hồi người dùng

Không có comment hoặc reaction nào trong dataset. Velocity merge cao (3 PR close trong ngày) chứng tỏ team active, nhưng thiếu cộng đồng tương tác. 

## 8. Backlog & Roadmap

**P2 PRs (ưu tiên cao):**

- Directory picker (#6089)
- Codex WebSocket session (#6096)
- XLSX/PDF fixes (#6097, #6093)
- Extensions surface (#6032)

**Chưa giải quyết:**

- MCP schema budget (#5388, conflict từ Aug)
- Reasoning effort escalation (#4419, Jun)
- Binary upload HTTP (#5980, Sep)

**Roadmap implicit:**

1. Polish WebUI UX → production-ready
2. MCP ecosystem expansion (memory, computer use, tool budgeting)
3. Agent intelligence (auto escalation, large tool set)
4. Performance (WebSocket, binary upload)

Computer use (#6091) nếu merge = bước lớn cho agent autonomy.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo ZeroClaw - 2026-10-08

## 🎯 Tóm tắt hôm nay

ZeroClaw đang ở giai đoạn ổn định release v0.8.6 với 3 PR quan trọng merge (#11232, #10769, #11192) fix race condition và bảo mật plugin. Đồng thời team đẩy mạnh onboarding với native Claude Code và ChatGPT (#11596, #11604). Bug nghiêm trọng phát hiện: config migration lỗi (#11579), model routing config ghi đè toàn bộ file (#11606), cost limit không thể reset nếu không restart daemon (#11585).

## 📦 Releases

Không có release mới. v0.8.6 đang được chuẩn bị, chặn bởi:
- Binary size sắp chạm limit 64MB (chỉ còn 0.7MB buffer) #11580
- Plugin documentation chưa hoàn thiện #11329
- Một số PR bảo mật chưa merge (#11236, #11261, #11262)

## 🚧 Tiến độ dự án

**Merged hôm nay:**
- #11232: Fix plugin payload admission race - đọc từ retained package root thay vì pathname (bảo mật cao)
- #10769: Harden plugin concurrent ancestor replacement 
- #11192: Isolate payload capture tests by trace ID (fix flaky test)

**PR nóng đang review:**

**Bảo mật plugin (release-gate cho v0.8.6):**
- #11236: Recover incomplete plugin installs qua `plugin remove` - thêm lock file coordination
- #11261: Staged plugin replacement với admission workflow
- #11262: `zeroclaw plugin update` command với verified replacement
- #11302: Channel instance binding ceremony + grant seeding lúc install
- #11309: Quickstart auto-install tool plugins

**Onboarding mới (tham vọng):**
- #11596: Native Claude Code provider - dùng installed client + account, supervised plugin apply
- #11602: Isolated native agent instances với verification
- #11604: Self-contained `zeroclaw-chatgpt` skills package

**Bảo mật & authorization:**
- #11264: Password auth provider cho roster verification (#8076 slice 1)
- #11265: `zeroclaw user` commands cho password lifecycle (blocked by #11264, #11313)
- #11324/#11325: Daemon identity verification cho CLI mutations
- #7821: Canonical sandbox_policy schema (lớn, XL, needs-author-action)

**Architecture:**
- #11516: Effort-aware routing (local vs cloud base on complexity) - needs-author-action
- #11254: RFC A2A protocol crate (zeroclaw-a2a) - needs-author-action

## 🔥 Điểm nổi bật cộng đồng

**Issues được update nhiều:**
- #9549 (4 comments): Guide local model selection với llmfit - người dùng loay hoay chọn model cho hardware
- #8692 (15 comments): Maintainer decision tracker - RFC queue đang tắc nghẽn
- #11554: Telegram/Discord/Signal re-send ảnh cũ mỗi turn → model describe phantom "new" images (P1, degraded)

**Không có reaction nhiều** - dự án còn nhỏ, team-driven hơn community-driven

## 🐛 Ổn định & Bugs

**Nghiêm trọng (P1/S0-S1):**
- #11606 ⚠️: `model_routing_config upsert_agent` GHI ĐÈ TOÀN BỘ config.toml, fabricate risk profiles, drop fields, reset limits. User chỉ muốn đổi `model_provider` → mất cấu hình production.
- #11579: `Config::save_dirty` stamp `schema_version=3` lên V1/V2 config chưa migrate → agent biến mất lần load sau
- #11585: Cost limit trip không thể clear nếu không restart daemon (kill toàn bộ session). `cost.allow_override` không được đọc.
- #11540: Bubblewrap sandbox detection fail trên Linux → fallback application-layer
- #11608: Telegram listener wedge forever trên blackholed request (no timeout) - listener_health detect nhưng không recover

**Quan trọng (P2):**
- #11554: Channel markers `[IMAGE:<path>]` nằm trong history → re-send ảnh cũ mỗi turn
- #11553: Split inbound messages (Signal forward + comment) không merge reliable
- #11360: `.zeroclaw-package-lock-v1` đọc được bởi local accounts khác → hold lock → install/remove fail
- #11562: Plugin discovery pair manifest generation cũ với component mới khi update (race)

**Rủi ro (needs investigation):**
- #11180: Flaky test `llm_request_payload_off_still_carries_prefix_fingerprints` đọc record của test khác
- #11586: ZeroCode sidebar hiện session failed thành green sau daemon restart

**Bảo mật đã fix:**
- #11594: `firejail_args` được advertise nhưng không apply vào invocation (P1)
- #11541: Anthropic `extra_headers` config bị drop, không forward

## ✨ Yêu cầu tính năng

**Được accept:**
- #11553: Per-channel debounce + attachment-preserving batches cho split messages
- #11583: Add Opper (EU AI gateway) làm OpenAI-compatible provider - in-progress
- #11138: Define caller tool approval trong bounded delegation (follow-up từ #10937)
- #9549: llmfit guide cho local model selection (P2)

**RFC stage:**
- #11254: A2A protocol crate (agent-to-agent wire model)

**Blocked:**
- #11324/#11325: CLI daemon identity verification (cần Windows named-pipe server verify)

## 💬 Phản hồi người dùng

**Pain points từ issues:**
- **Onboarding khó**: Local model selection rối (#9549), phải nối scattered info về hardware/quantization/context
- **Config fragility**: Nhiều bug nghiêm trọng liên quan config manipulation (#11606, #11579, #11585)
- **Channel UX**: Split messages không merge (#11553), image markers spam (#11554)
- **Sandbox**: Detection fail (#11540), policy schema phức tạp (#7821 lâu năm)

**Không thấy nhiều user voice** - issues chủ yếu team report, ít external contributor (chỉ @vrurg, @JordanTheJet, @tidux, @metalmon active)

## 📋 Backlog & Roadmap

**v0.8.6 release blockers:**
- Binary size limit (#11580)
- Plugin docs (#11329)  
- Plugin install/update stack (#11236, #11261, #11262, #11302)

**Post-v0.8.6 priorities (từ tracker #8692):**
- Password auth provider complete (#11264 → #11265)
- Daemon identity verification (#11324, #11325)
- Sandbox policy canonical schema (#7821)
- A2A protocol crate (#11254)
- Speech-to-speech Gemini channel (#10430 parking-lot)

**Architecture debt:**
- Effort-aware routing (#11516)
- Bounded delegation tool approval (#11138)
- Config manipulation safety (nhiều bug mới phát hiện)

---

**Nhận xét:** Dự án focus heavy vào bảo mật (plugin isolation, sandbox, authorization) và stability trước khi scale. Onboarding initiatives (#11596, #11602, #11604) cho thấy tham vọng mở rộng user base với native client integration. Config bugs nghiêm trọng (#11606, #11579) cần fix urgent trước release.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-10-08

## 📊 Tóm tắt hôm nay

Không có hoạt động mới ngày 08/10. Tất cả issues và PRs đều từ tuần trước (29/09 - 30/09) và đánh dấu `[stale]` sau 7 ngày. Một PR về CI được merge trong ngày nhưng từ contributor @hawkli-1994, không phải maintainer core.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

**Xu hướng**: Tập trung cải thiện Web UI và trải nghiệm người dùng.

### PRs quan trọng (tất cả OPEN, stale):

**Web UI overhaul** (cụm 4 PRs từ @racso2609):
- **#3411**: Thay indicator "đang suy nghĩ" giả bằng trạng thái thật từ backend
  - Hiện tại: 4 câu xoay vòng cứng (`thinking.step1-4`), không phản ánh thực tế
  - Mới: state-driven progress từ session executor
  
- **#3410**: Fix message biến mất khi queue đầy
  - Bug: Message gửi lúc agent bận → queue ngầm → đầy thì drop không báo
  - Fix: Surface queue state, acknowledge success, signal khi đầy
  
- **#3413**: Global multi-channel session sidebar
  - Hiện tại: Chỉ thấy sessions từ `pico` channel
  - Mới: Backend trả tất cả channels, classify theo type (pico/slack/discord...)
  
- **#3412**: Show lỗi khi turn fail
  - Bug: Turn chết → không reply → user nhìn màn hình trống
  - Root cause: Error bị suppress ở 3 chỗ (message tool, stream logic, client handler)

**Khác**:
- **#3378** (@sarff): Fix OAuth refresh dùng scope config thay vì hardcode `"openid profile email"`
- **#3222** (@trufae): Cleanup DeltaChat channel -200 LOC, drop legacy features
- **#3418** (CLOSED - merged): CI gate thống nhất cho 10 repos, shared devops rules

## 🔥 Điểm nổi bật cộng đồng

**Tương tác thấp**: Tất cả issues/PRs đều 0 👍, chỉ 2 comment trên 2 issues.

**#3409** và **#3408** (từ @rogeriomarino2014-ship-it, @racso2609): Hai issue gốc trigger cụm 4 PRs web UI fix. Show người dùng thực sự gặp pain points:
- Agent tự trigger loop vì dùng scheduling primitive như wait mechanism
- Message gửi lúc bận biến mất không dấu vết

## 🐛 Ổn định & Bugs

**Critical UX bugs** (đã có PR fix):
1. **Message queue invisible** (#3408 → PR #3410): Queue đầy drop message không thông báo
2. **Failed turn silent** (→ PR #3412): Turn chết không hiện lỗi cho user
3. **Fake progress indicator** (→ PR #3411): "Thinking" animation giả, không phản ánh thực tế

**Architecture issue** (#3409): 
- Subagent workflow dùng `ScheduleWakeup` với delay 300s để poll completion
- Side effect: Trigger autonomous-loop tick không mong muốn
- Chưa có PR fix

**Auth bug** (#3378): OAuth refresh ignore config scopes, dùng hardcode

## ✨ Yêu cầu tính năng

Từ PRs, infer được roadmap ngầm cho Web UI:
1. ✅ Multi-channel session view (PR #3413)
2. ✅ State-driven progress tracking (PR #3411)
3. ✅ Queue visibility (PR #3410)
4. ✅ Error surfacing (PR #3412)

Cụm này là **Part 1 và 2-A của issue #3406** (không trong data nhưng được reference nhiều lần).

## 💬 Phản hồi người dùng

**Âm thầm**: Chỉ 2 contributors (@racso2609, @rogeriomarino2014-ship-it) report bugs chi tiết và tự fix.

**Pain points lặp lại**:
- Thiếu feedback khi agent bận/lỗi
- UI hiện thông tin giả (fake progress, invisible queue)
- Nhiều repos cần devops rules thống nhất

## 🗺️ Backlog & Roadmap

**Stale PRs cần review**: 6 PRs open > 7 ngày, chưa merge. Maintainers không active cuối tuần.

**#3406 (không trong data)**: Meta-issue về Web UI improvements, ít nhất 2 parts:
- Part 1: Honest working indicator (PR #3411)
- Part 2-A: Multi-channel sidebar (PR #3413)

**CI/devops unification**: PR #3418 merged, áp dụng cho 10 repos trong org.

**Chưa giải quyết**: Issue #3409 về scheduling primitive abuse trong subagent workflow - architectural debt.

---

**Kết luận**: Dự án trong pha polish UX sau khi core features ổn. Contributor @racso2609 carry team với 4 PRs fix user-facing bugs. Maintainers vắng cuối tuần, PRs đọng. Không có breaking changes hay releases lớn.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-10-08

## 1. Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào sửa bugs kênh Signal và xử lý vấn đề routing tin nhắn agent-to-agent. Cộng đồng ít tương tác, chủ yếu contributor nội bộ đẩy fix.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Pull Requests đang mở:**

- **#4055** - Fix channel adapter không retry khi setup fail do network lỗi. Hiện tại chỉ retry trong ~17s rồi bỏ channel cả lifetime process. PR thêm health check và re-arm logic.
  
- **#3838** - Docs cho Signal skill (`/add-signal`): sửa format `platform_id` cho DM và group, thêm troubleshooting attachment/routing.

- **#3837** - Consolidate fix Signal adapter: attachment staging, DM routing, outbound queue. Refactor để dùng mounted-inbox mechanism giống adapter khác.

**Xu hướng**: Ổn định kênh chat (Signal chủ yếu), cải thiện reliability network và message routing giữa agents.

## 4. Điểm nổi bật cộng đồng

Không có hoạt động nổi bật. Issues và PRs có 0-1 bình luận, 0 reactions. Community engagement thấp.

## 5. Ổn định & Bugs

**#3136** (mở từ 26/7, update 7/10): `sendToDestination()` gán nhầm `in_reply_to` từ batch khác khi destination không có history, làm mất message trong a2a routing. Load-bearing field bị sai. Chưa có PR fix.

**#3791** (mở từ 13/9, update 7/10): Fresh Codex setup cần host CLI cài global, không chạy được standalone. Label `triage/unresolved`. Chưa có PR fix.

**#4055**: Channel adapter bỏ channel nếu network lỗi quá 17s. Đang có PR fix với retry + health check.

**#3837**: Signal adapter có nhiều bug attachment và routing. Đang có PR consolidate fix.

## 6. Yêu cầu tính năng

Không có feature request mới. PRs hiện tại đều là bugfix/reliability improvement.

## 7. Phản hồi người dùng

Không có feedback rõ ràng. Issues báo bug đều từ contributors, không có discussion hay vote từ end-users.

## 8. Backlog & Roadmap

Không có thông tin roadmap trong data. Backlog ưu tiên:

- Fix message routing (#3136) - critical vì mất tin nhắn
- Fix Codex setup (#3791) - blocker cho new users
- Merge Signal fixes (#3837, #3838)
- Merge channel reliability (#4055)

**Đánh giá**: Dự án ở giai đoạn ổn định infrastructure, sửa bugs cũ. Cộng đồng yên tĩnh, chưa thấy momentum tăng trưởng.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo phân tích NullClaw - 2026-10-08

## 1. Tóm tắt hôm nay

Hoạt động nhẹ. Chỉ có 1 PR kỹ thuật về xử lý concurrency trong gateway. Không có issue mới, không release, không tương tác cộng đồng.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR #1047** - Fix gateway accept loop blocking

- **Vấn đề core**: Accept loop dùng `Bus.publishInbound` unbounded, block mãi khi inbound queue đầy (capacity 100). Agent worker xử lý message đồng bộ → queue bị bão hòa → gateway bị nghẽn, không nhận webhook mới.

- **Giải pháp**: Đổi sang bounded publish với timeout. Nếu queue đầy, drop message thay vì block accept loop. Gateway tetrahttps protocol, single-threaded → không được block.

- **Tác động**: 
  - Cải thiện throughput gateway khi load cao
  - Trade-off: có thể mất message khi worker quá tải, nhưng gateway vẫn sống
  - Đúng pattern cho event-driven system: bounded buffer + backpressure

Xu hướng: Focus vào stability và handling edge case production (queue saturation, blocking I/O).

## 4. Điểm nổi bật cộng đồng

Không có tương tác. PR chỉ có tác giả, chưa có review hay comment.

## 5. Ổn định & Bugs

**Concurrency bug trong gateway** đang được fix:

- Root cause: Unbounded blocking call trong single-threaded event loop
- Symptom: Gateway đơ khi worker quá tải
- Severity: Critical cho production deployment
- Status: PR đã mở, chưa merge

Đây là bug architecture-level, không phải typo hay edge case đơn giản.

## 6. Yêu cầu tính năng

Không có.

## 7. Phản hồi người dùng

Không có.

## 8. Backlog & Roadmap

Không có thông tin. Dựa vào PR pattern: đang trong phase ổn định runtime và xử lý production load, không phải thêm feature mới.

---

**Nhận định**: Ngày im lặng. Chỉ có 1 technical fix quan trọng cho concurrency. Dự án có vẻ đang giai đoạn hardening thay vì rapid feature development. Cần theo dõi xem PR này được merge không và có spawn thêm related fix không.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-08

## 1. 📊 Tóm tắt hôm nay

Hoạt động nhẹ. Hai PR được cập nhật: tính năng tool selection với embeddings (opt-in) và dependency bump urllib3. Một bug cũ về agent báo hoàn thành sai có thêm bình luận.

## 2. 🚀 Releases

Không có release mới.

## 3. 📈 Tiến độ dự án

### PR đáng chú ý:

**#8119 - Tool selection với embeddings** (size: XL, risk: medium)
- Tác giả @CjS77 (contributor mới)
- Opt-in classifier chọn deferred tools trước model call đầu tiên
- Giảm round-trip `tool_search`, tăng tốc conversation
- Cập nhật ngày 7/10, chờ review

**#8128 - Dependency bump urllib3 2.7.0→2.8.0**
- Dependabot auto-update cho test suite
- Routine maintenance

### Xu hướng:
- Tối ưu performance (tool selection thông minh)
- Maintenance ổn định (dependency updates)

## 4. 💬 Điểm nổi bật cộng đồng

Không có tương tác cao trong 24h qua. PR #8119 từ contributor mới cho thấy external contribution đang có.

## 5. 🐛 Ổn định & Bugs

**#1993 - Agent báo hoàn thành sai sau 502 errors**
- Priority: P2, scope: agent
- Agent claim task done sau reopen chat dù không execute
- False positive nguy hiểm cho user trust
- Bug từ tháng 4/2026, vẫn open sau 6 tháng
- Cập nhật 7/10 với 1 comment mới

Vấn đề nghiêm trọng về reliability. Agent không track state đúng sau reconnection.

## 6. ✨ Yêu cầu tính năng

Không có feature request mới trong 24h.

PR #8119 implement opt-in tool selection - tối ưu đã được plan trước.

## 7. 👥 Phản hồi người dùng

Issue #1993 report trải nghiệm thực tế:
- User Emil gặp 502 errors liên tiếp
- Sau reopen, agent hallucinate completion
- Telegram message không được gửi nhưng agent claim success

False positive này phá trust relationship giữa user và agent.

## 8. 🗺️ Backlog & Roadmap

Từ dữ liệu hiện có:

**Đang xử lý:**
- Tool selection optimization (PR #8119)
- Agent state management bug (issue #1993)

**Cần ưu tiên:**
- Fix agent state persistence sau reconnection
- Improve error recovery từ 502/network failures

**Quan sát:**
- Bug P2 về agent completion đã 6 tháng chưa fix
- Backlog có thể đang overloaded hoặc thiếu priority

---

**Nhận xét tổng quan:** Dự án trong giai đoạn optimization và maintenance. Bug nghiêm trọng về agent state cần attention cao hơn - đã 6 tháng chưa resolve. Contributor mới contribute feature lớn (XL) là tín hiệu tốt cho community health.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw – 2026-10-08

## 1. Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào đóng góp từ first-time contributors fix memory leak, UI hang, context overflow. Cộng đồng phản ánh vấn đề message queue cũ chưa giải quyết. 1 feature request đóng (user muốn giới hạn reasoning intensity).

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PRs đang mở (3/4):**

- **#8020** (feat): thêm cooldown cho fallback model bị lỗi – tránh retry liên tục primary model down → lãng phí 1+2+4s backoff mỗi request
- **#7865** (fix): console tự recover khi chat stream chết giữa chừng – hiện tại reconnect chỉ trigger lúc mount session, không có self-healing
- **#8118** (fix): catch provider HTTP 400 "max_tokens does not fit" → trigger Scroll compaction → retry – hiện miss existing overflow recovery

**PR đã merge:**
- **#7867** (fix): revalidate file tab content khi switch tab – cũ cache stale content

**Issues nổi bật:**

- **#7722** (bug, open): memory leak 3 paths – unbounded stream buffer, keep-alive stack, doom-loop gate bypass. Controlled repro + minimal fix đề xuất. 7 comments, cập nhật hôm nay.
- **#8115** (bug, open): Desktop cold start hang 11s (chờ backend port 14711), degraded view 16-25s. WebView2 process chết im lặng backend vẫn sống.
- **#8117** (bug, open): context overflow recovery bị miss (liên kết #8118).

## 4. Điểm nổi bật cộng đồng

Không có issue/PR nào có reaction nhiều (tất cả 0 👍). Tương tác comments thấp (1-7). First-time contributors đóng góp 3 PRs fix bug infrastructure (console reconnect, context recovery, file tab cache).

**Người dùng quan tâm:**
- Performance: memory leak #7722, desktop startup hang #8115
- Reliability: stream death recovery #7865, message queue duplicate #8116

## 5. Ổn định & Bugs

**Đang xử lý:**
- Memory leak 3-path (#7722): unbounded buffers, stacking keep-alive, gate evasion – có controlled repro, đề xuất minimal fix
- Desktop startup delay (#8115): 11s splash screen, 16-25s full ready – WebView2 silent death
- Console stream recovery (#7865): PR sẵn sàng – thêm self-healing khi stream chết mid-run
- Context overflow miss (#8117, #8118): PR catch thêm 2 provider signature → trigger existing Scroll recovery

**Chưa giải quyết:**
- **#8116**: message queue duplicate – user nói "đã nửa năm", xử lý rồi vẫn send lại, báo sai conversation ID
- **#1775** (enhancement, 7 tháng tuổi): request steer mode như Codex – inject message giữa execution để correct behavior

## 6. Yêu cầu tính năng

- **#8114** (CLOSED): user muốn limit reasoning intensity cho Qwen 3.8 ("quá thích suy nghĩ") – team đóng, không có explanation trong data
- **#1775** (open 7 tháng): steer mode – attach message mid-execution correct agent behavior

## 7. Phản hồi người dùng

**Tiêu cực:**
- @happieme (#8116): message queue "严重问题" – duplicate send, sai conversation ID – "都半年了"
- @hjgsv85jxm-svg (#8114): Qwen 3.8 "太爱思考" – muốn giới hạn reasoning (đã đóng)

**Trải nghiệm kỹ thuật:**
- Memory leak có controlled repro (#7722) – good signal cho maintainer
- Desktop startup UX kém (#8115) – 11s splash, 16-25s fully ready
- Context overflow recovery miss (#8117) – existing path có nhưng classifier chưa đủ pattern

## 8. Backlog & Roadmap

Không có thông tin roadmap explicit. Dựa issues/PRs:

**Infrastructure fixes ưu tiên:**
- Memory stability (leak 3-path #7722)
- Console reliability (stream recovery #7865, queue duplicate #8116)
- Context handling (overflow recovery #8118)
- Desktop startup performance (#8115)

**Feature backlog:**
- Steer mode (#1775) – 7 tháng, chưa pickup
- Model fallback cooldown (#8020) – PR đang review

---

**Nhận xét:** Dự án focus fix stability + first-time contributor onboarding (3/4 PRs label first-time-contributor). Cộng đồng ít tương tác (no reactions). Message queue bug cũ (#8116) chưa resolve → user frustration. Desktop UX (#8115) và memory leak (#7722) critical cho production readiness.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*