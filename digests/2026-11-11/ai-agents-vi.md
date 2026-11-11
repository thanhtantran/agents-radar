# Bản tin Hệ sinh thái Hermes Agent 2026-11-11

> Issues: 58 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-11-11 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-11-11

## 🎯 Tóm tắt hôm nay

Dự án chạy nhanh với **30 PR mới** (hầu hết là plugin catalog) và **11 issue mới**. Trọng tâm: **Plugin Hackathon đang diễn ra** (8+ entry submissions hôm nay), sửa lỗi gateway/sessions nghiêm trọng (voice message stuck, context compaction loop), và merge redesigned workspace UI.

---

## 📦 Releases

Không có release chính thức hôm nay.

---

## 🚀 Tiến độ dự án

### Plugin Ecosystem bùng nổ
- **Plugin Hackathon submissions**: 8+ plugins mới hôm nay
  - `housemate`: old devices thành AI voice endpoints
  - `show-your-work`: verify user hiểu code agent viết
  - `ultimate-dashboard`, `stoa`, `shorguard` (post-quantum crypto), `spacewise`
  - `sieve`: notification boundary do user kiểm soát
- **Production updates**: sugar (0.3.3), web-search-plus (5.1.9), ninsei (0.2.0), habit (0.1.6)

### Core fixes merged/pending
✅ **#152168** - Redesigned workspace UI (với classic recovery toggle)  
✅ **#153053** - Steer/queue với photo caption không bị drop  
✅ **#153054** - Voice note giữ audio path sau transcription  
🔄 **#152659** - Feishu approval card identity mismatch  
🔄 **#116401** - BlueBubbles dedupe không mất attachment  

### Critical bugs addressed
- **#152937** - Context compaction reinject completed turn as [IN PROGRESS] → infinite loop
- **#152365** - WeChat voice message stuck `session_admissions` ở `started` mãi mãi
- **#152557** - `write_file` blocked 458s, idle-reaper giết mid-call
- **#151727** - Bots roster timeout: `profiles.list` re-sort toàn bộ sessions table mỗi 5s

---

## 💬 Điểm nổi bật cộng đồng

### Issues hot nhất (by comments)
1. **#143547** (60💬) - Unified gateway post-merge problems tracking
2. **#141346** (39💬) - **NGUY HIỂM**: Smart approval auto-approved osascript → đóng PowerPoint unsaved, mất data
3. **#137838** (11💬) - macOS gateway exit 75 loop sau missed liveness probes

### Pain points tập trung
- **Session state leaks**: turns không finalize, sessions stuck `running` (#131740, #152365)
- **Windows platform**: UTF-8/GBK crash (#127633), cron permission errors (#153042, #153043)
- **Desktop UX**: queued prompts mất Edit/Steer (#148846), tab focus không theo ý (#148318)

---

## 🐛 Ổn định & Bugs

### P1 Critical
- **#142281** - Gateway auth refusal exit 1 thay vì 78 → systemd restart loop
- **#131740** - Turn finalization bookend lost → Stop/queue không hoạt động
- **#132820** - Matrix E2EE build abort toàn bộ `hermes update` trên Linux

### P2 High-impact
- **#152529** - Desktop `/discard` không route được sau power loss
- **#152515** - `tool.progress` events không reach messaging adapters
- **#153044** - WeCom group messages bị từ chối: `group_allow_from` check sai user vs chat id
- **#150729** - Webapp tooltips/sidebar desync khi UI scale ≠ 100%

### Platform-specific
- **Windows**: GBK decode crash (#127633), cron venv mất site-packages (#153043)
- **macOS**: remote primary vẫn start local gateway (#151519)

---

## ✨ Yêu cầu tính năng

### Merged/Active
- **#152168** - Redesigned workspace UI (merged)
- **#149706** - Opt-in fallback providers cho Nous 402 errors trong cron

### Requested
- **#92424** (2👍) - Path-scoped file access cho profiles (restrict agent to folders)
- Canonical group chats cần avatars/thinking indicators (#143324)

---

## 👥 Phản hồi người dùng

### Positive signals
- Plugin ecosystem đang phát triển nhanh (hackathon momentum)
- Community đóng góp fixes cho upstream plugins (web-search-plus, sugar)

### Frustrations
- **Data loss scare**: #141346 (smart approval xóa presentation) → trust erosion
- **Session management**: users không biết session stuck hay đang chạy
- **Gateway stability**: exit loops, liveness probe failures
- **Windows experience**: encoding/permission issues lặp lại

### Documentation gaps
- `/discard` recovery path không rõ sau power loss (#152529)
- Desktop skill approvals "invisible" — phải biết command (#152817)

---

## 📋 Backlog & Roadmap

### Immediate priorities (inferred)
1. **Session state consistency**: finalization bookends, stuck-running detection
2. **Windows platform parity**: encoding, cron robustness
3. **Gateway resilience**: liveness probes, auth refusal handling
4. **Desktop UX**: queued prompt controls, tab navigation

### Technical debt
- **#135111** - MCP lazy servers không work (SDK default `ttl_ms=0`)
- **#132192** - Skills guard bypasses (invalid UTF-8, docstring miscount)
- **#152713** - `python -m gateway.run` loads module twice

### Plugin ecosystem
- Hackathon submissions đang review → catalog expansion
- MCP integration improvements (#141208, #135111)

---

## 📊 Metrics snapshot

- **Issues**: 58 open, 11 mới hôm nay
- **PRs**: 30 mới (chủ yếu plugins), 5 merged
- **Top labels**: `P2` (33), `comp/gateway` (14), `comp/plugins` (13), `type/bug` (24)
- **Platform focus**: Windows/macOS specific fixes tăng
- **Community**: hackathon kéo contributors mới vào

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 2026-11-11

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang ở **giai đoạn consolidation sau growth nhanh**. 8/9 dự án active, tập trung 3 mảng:

**Security hardening** - Hermes/NanoClaw/Zeroclaw cùng fix injection vectors, session state leaks  
**Plugin ecosystems** - Hermes hackathon bùng nổ (30+ submissions), QwenPaw refactor agents→plugins  
**Channel stability** - OpenClaw/NanoClaw/QwenPaw fix Matrix/WeChat/Feishu race conditions

IronClaw chết (0 activity). PicoClaw hầu chết (1 PR i18n). Còn lại chiến đấu cùng bugs: session corruption, context compaction loops, gateway hangs.

---

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động chính | Mức độ cộng đồng |
|-------|--------|-----|----------|-----------------|------------------|
| **Hermes Agent** | 58 | 500 | 0 | Plugin Hackathon (30+ PRs), gateway/session fixes | 🔥🔥🔥 Cao (hackathon momentum) |
| **OpenClaw** | 107 | 500 | 2 | v2026.11.3 (private tasks), session corruption fixes | 🔥🔥 Trung bình-Cao |
| **NanoBot** | 3 | 27 | 0 | 16 PRs merged 1 ngày (WebUI fixes, memory optimization) | 🔥 Thấp (internal team) |
| **Zeroclaw** | 6 | 50 | 0 | v0.9.0 OIDC login automation | 🔥 Thấp (0 comments) |
| **PicoClaw** | 0 | 1 | 0 | 1 PR tiếng Pháp i18n | ❄️ Rất thấp |
| **NanoClaw** | 0 | 19 | 0 | Security hardening (4 PRs injection), channel fixes | 🔥 Thấp (core-team only) |
| **NullClaw** | 0 | 3 | 0 | Provider integrations (UberLLM, Keenable search) | ❄️ Rất thấp |
| **QwenPaw** | 13 | 39 | 1 | v2.3.0-beta.4, channel plugin stability | 🔥🔥 Trung bình |
| **IronClaw** | 0 | 0 | 0 | Chết | ☠️ Không |

---

## 3. Vị thế Hermes Agent

### Điểm mạnh
✅ **Plugin ecosystem sống nhất** - Hackathon kéo contributors mới, 8+ plugins hôm nay  
✅ **Velocity cao** - 30 PRs/ngày, cộng đồng đóng góp upstream fixes (web-search-plus, sugar)  
✅ **Community engagement** - Issue #143547 có 60 comments, #141346 có 39 comments

### Điểm yếu
❌ **Session state nightmare** - Turns không finalize (#131740), context compaction loops (#152937), WeChat voice stuck mãi mãi (#152365)  
❌ **Windows platform pain** - UTF-8 crash, cron venv mất dependencies  
❌ **Trust erosion** - Smart approval xóa PowerPoint unsaved (#141346) → data loss scare

### Vị trí trong hệ sinh thái
**Leader về plugin/extension model**. Hackathon submissions (housemate, show-your-work, shorguard) show community hiểu architecture. Nhưng core stability đuối hơn OpenClaw (sessions) và Zeroclaw (auth).

**Chiến lược plugin-first rủi ro**: ecosystem phát triển nhanh hơn core foundation. Windows/gateway issues lặp đi lặp lại → trust issues kéo adoption.

---

## 4. Hướng kỹ thuật chung

### 🔐 Security hardening đồng loạt
**Hermes**: Skills guard bypasses, smart approval risks  
**NanoClaw**: Shell injection (4 PRs), credential leak  
**Zeroclaw**: OIDC PKCE, certificate lifecycle  

→ **Pattern**: Cả hệ sinh thái học từ production incidents. Timing cho thấy shared knowledge/vulnerabilities.

### 🔄 Session state cleanup
**Hermes**: Context compaction reinject, turn finalization lost  
**OpenClaw**: SQLite locks, transcript writer claims  
**NanoBot**: Cross-session input ownership  
**QwenPaw**: Channel plugin race conditions  

→ **Root cause**: Distributed state (gateway + worker + DB) khó synchronize. Chưa có dự án nào giải quyết clean.

### 🌐 Channel expansion
**Hermes**: Feishu, BlueBubbles, WeChat  
**Zeroclaw**: SimpleX (E2EE), XMPP native  
**OpenClaw**: Matrix E2EE crypto store  
**QwenPaw**: QQ, Feishu stability  

→ **Trend**: Privacy-focused channels (SimpleX, XMPP) và enterprise (Feishu, WeCom) cùng tăng. Multi-protocol đang standard requirement.

### ⚡ Performance optimization
**NanoBot**: Memory copy reduction, incremental search  
**QwenPaw**: Compositor idle cuts, markdown memoization  
**OpenClaw**: Stream bounded pages (OOM fix)  

→ **Bottleneck chung**: Large transcripts/sessions → memory pressure. Stream/pagination đang được adopt.

---

## 5. Điểm khác biệt

### Chiến lược phát triển

| Dự án | Approach | Trade-off |
|-------|----------|-----------|
| **Hermes** | Plugin ecosystem velocity | Core stability sacrifice |
| **OpenClaw** | Enterprise auth/reliability | Complexity cao (107 issues) |
| **Zeroclaw** | Privacy-first channels | Lower adoption (niche) |
| **QwenPaw** | Chinese market focus | GBK/CP936 encoding debt |
| **NanoBot** | Monorepo fast iteration | Low community (internal team) |

### Kiến trúc

**Gateway-centric** (Hermes, OpenClaw, NanoBot): Gateway làm bridge channels→core. Problem: Gateway crashes = total loss.

**Federated** (Zeroclaw): Multiple transports (XMPP, SimpleX) independent. Problem: State sync phức tạp.

**Hybrid** (QwenPaw): Desktop app + optional gateway. Problem: Packaged desktop channel plugins fail (#8644).

### Model support

**Aggregators winning**: NullClaw UberLLM (260 models), Hermes Nous 402 fallback  
**Native engines**: QwenPaw MLX (macOS), llama.cpp controls  
**OIDC+Device certs**: Zeroclaw v0.9.0 automation beats manual pairing

---

## 6. Mức độ trưởng thành cộng đồng

### 🔥 Tier 1: Active community
**Hermes Agent**  
- Contributors: plugin hackathon submissions từ external devs  
- Feedback loop: Issue→Fix→PR trong vài ngày (#143547 60 comments)  
- Pain points voiced: Smart approval data loss (#141346) → trust discussion

**OpenClaw**  
- Long-term contributors: PRs mở 8 tháng vẫn active (#129388)  
- Enterprise focus: OCE delegated profiles, GitHub per-agent accounts  
- Quality bar: 107 issues tracked, priority system rõ ràng

### 🔥 Tier 2: Maintainer-driven
**QwenPaw**  
- Chinese community: GBK fixes, Aliyun models, QQ/Feishu issues  
- Fast turnaround: Safari bug open→merge < 24h (#8663)  
- Beta cycle long: beta.1→beta.4 trong 10 ngày (channel stability focus)

**NanoBot**  
- Core team velocity: 16 PRs merged 1 ngày  
- Zero external engagement: 0 reactions, 0 comments  
- Internal dogfooding: Bugs từ production usage

### ❄️ Tier 3: Stalled/Dead
**PicoClaw**: 1 PR i18n, không có discussion  
**NanoClaw**: 19 PRs @glifocat author 15/19, không có community PRs  
**NullClaw**: 3 PRs integrations, 0 reactions  
**IronClaw**: Chết

---

## 7. Tín hiệu xu hướng

### 📈 Đang tăng

**1. Plugin/Extension ecosystems**  
Hermes hackathon success → other projects sẽ follow. QwenPaw agents→plugins refactor (#8426) confirm trend.

**2. Privacy-focused channels**  
SimpleX (Zeroclaw), XMPP native, Matrix E2EE → response to surveillance concerns. Enterprise channels (Feishu, WeCom) song song growth.

**3. Local/hybrid inference**  
QwenPaw MLX engine, llama.cpp controls. NullClaw Keenable free search. → Reduce cloud dependency.

**4. Security-first defaults**  
Shell injection fixes, PKCE enforcement, certificate lifecycle → learned from production incidents. Trust erosion (Hermes #141346) push này.

### 📉 Đang giảm

**1. Standalone API servers**  
NanoBot xóa `nanobot serve` → gateway-only. Trend: consolidate entry points.

**2. Global shared state**  
NanoBot retire global session mode. OpenClaw session corruption → per-chat isolation trend.

**3. Manual setup flows**  
Zeroclaw OIDC auto-login beats pairing. NanoClaw auto-resolve lockfile conflicts. → Reduce friction.

### ⚠️ Rủi ro

**Session state synchronization chưa giải quyết** - Cả hệ sinh thái đều struggle (Hermes, OpenClaw, NanoBot). Distributed state (gateway+worker+DB) need architectural rethink.

**Windows platform second-class** - Hermes UTF-8 crash, NanoClaw WSL issues, encoding debt everywhere. Market share không match engineering investment.

**Plugin security model chưa mature** - Hermes smart approval auto-approved osascript → data loss. Permissions/sandboxing chưa có standard.

### 🔮 Dự đoán 6 tháng

**Consolidation wave** - 2-3 dự án sẽ chết (NullClaw, PicoClaw candidates). Survivors merge hoặc fork stalled projects.

**MCP protocol adoption** - Hermes #135111 lazy servers bug, OpenClaw plugin hooks. MCP sẽ thành standard plugin interface.

**Agent-to-agent coordination** - OpenClaw child-task handoffs (#196856), Hermes inter-agent messages. Next frontier sau single-agent stability.

**Regulatory pressure** - Privacy channels growth signal compliance concerns. GDPR/data residency sẽ force architectural changes.

---

## 🎯 Kết luận chiến lược

**Hermes Agent đang win về ecosystem velocity** nhưng lose về foundation stability. Choice: slow down plugins, fix sessions/gateway; hoặc bet community sẽ fix (risky).

**OpenClaw mature nhất** - 107 issues tracked, enterprise focus, reliability over features. Nhưng complexity cao → adoption chậm.

**Zeroclaw niche nhưng defensible** - Privacy-first positioning, OIDC automation. Sẽ survive nếu compliance concerns tăng.

**QwenPaw Chinese market leader** - GBK support, local engines, Aliyun/QQ integration. Isolated từ global ecosystem.

**NanoBot/NanoClaw internal tools** - Fast iteration nhưng không có community moat. Vulnerable to abandonment.

**PicoClaw/NullClaw/IronClaw** - Chết hoặc đang chết. Không có differentiation rõ ràng.

Hệ sinh thái đang shake out. Winners sẽ có: plugin ecosystem + session reliability + channel breadth. Hiện tại không có dự án nào 3/3.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# 📊 Báo cáo OpenClaw - 2026-11-11

## 1. Tóm tắt hôm nay

Dự án tập trung xử lý vấn đề session state và authentication, đặc biệt Matrix E2EE crypto store corruption. Release 2026.11.3 và 2026.9.37 ra mắt với fixes quan trọng về private task results và child-task handoffs. Nhiều bugs nghiêm trọng về session recovery, git updates, và UI lockup đang được ưu tiên.

## 2. Releases

### v2026.11.3 (2026-11-10)
- **Private task results**: Subagent completions không leak vào chat stream
- **Reliable child-task handoffs**: Parent cancel child không block handoff nữa
- **Visible tool failures**: Tool fail hiện rõ thay vì silent end

### v2026.9.37 (2026-11-10) 
Extended-stable từ maintenance line, gateway-only. Security patches + model support mới cho version cuối tháng 9.

## 3. Tiến độ dự án

### PRs quan trọng đang hoạt động:

**Security & Core:**
- #196856: Preserve delegated OCE profiles - Enterprise auth overhaul
- #196388: OpenClaw ID rebind với recovery kit - key migration
- #196760: Refine delegated config approvals - Full Access permission model

**Agent & Execution:**
- #129388: Context-pressure continuation (continue_work tools) - major architectural change, 8 tháng development
- #194376: Admit sessions_send wake starts - rate limiting for fan-out work
- #194566: Prompt presence checks - frozen injection verification

**Fixes:**
- #196215: Close removed agent DBs without aborting turns
- #196481: Include root + Unicode docs in formatting
- #196480: Stream memory exports in bounded pages - OOM fix

**UI:**
- #196200: Manage agent GitHub accounts in Profile
- #196942: Restore chat behavior pre-#196602
- #154962: Enable heading navigation for screen readers

## 4. Điểm nổi bật cộng đồng

### Issues nhiều bình luận nhất:

**#193962 (26 comments, CLOSED)**: SQLite header-probe timeout fix unreachable from 2026.10.10 - update path broken

**#123792 (18 comments)**: CLI backend render twice - live view + aggregate record

**#154572 (16 comments, CLOSED)**: claude-cli sessions_spawn fail với SessionTranscriptWriterClaimReboundError

**#151962 (15 comments)**: Phantom user messages - heartbeat/async strings submitted as prompts

**#170928 (10 comments)**: Windows 2026.10.2 gateway 7-9 phút mới ready

### Patterns:
- Session state corruption, đặc biệt SQLite locks và transcript writers
- CLI backend rendering issues
- Update/migration failures
- Platform-specific problems (Windows timing, Linux memory)

## 5. Ổn định & Bugs

### P0 Release blockers:
- #190563: Cannot resume paused Codex chat - provider/thread mismatch
- #147728: xAI OAuth 426s - wrong version headers
- #196811: Managed update validation fail - SQLite classification error

### P1 Critical:
- #194403: Helper-completion invalidate authority, block conversations
- #195279: Background exec wake fail after sessions_send turn
- #181120: macOS Gateway hang closing worker MessagePort
- #196219: transcript_events UNIQUE constraint fail - concurrent writers

### Recurring themes:
- **Session corruption**: Multiple paths to stuck/blocked sessions
- **Update failures**: Migration + validation issues across versions
- **Memory pressure**: Workers OOM on large transcripts/sessions
- **Race conditions**: Concurrent DB writes, authority validation

## 6. Yêu cầu tính năng

**Auth & Security:**
- #196845: Optional explicit Git co-author name/email
- #192009: Cross-provider cron fallback account authorization

**UX:**
- #154524: Headings for screen reader navigation (PR in review)
- #179529: Telegram per-group transcript echo override
- #187243: Silent audio transcript echo (no notification)

**Tooling:**
- #196279: Add sessionKey/agentId to talk.event diagnostic
- #183332: Plugin hooks for one-shot completions (pdf, TTS, image)

## 7. Phản hồi người dùng

### Pain points chính:

**Update experience broken**:
- #193157: Update refused với retired config keys
- #194096: npm update timeout on 56k-path SQLite probe
- #196798: Git update fail - schema edits retire catalog hashes

**Session reliability**:
- Users mất work khi sessions block hoặc corrupt
- #144594: Interrupted inter-agent messages stuck, no replay
- #195279: Background exec results lost

**Platform issues**:
- Windows: Gateway slow start, EBUSY cleanup failures
- Linux: Memory pressure on ARM64, AppImage browser compat
- macOS: Worker MessagePort deadlocks

**UI confusion**:
- #195192: Safari 27.3 missing chat composer
- #196820: Control UI CPU loop in getAnimations()

## 8. Backlog & Roadmap

### Đang tích cực phát triển:

**Identity & Auth (Q4 2026)**:
- OpenClaw ID rebind (#196388, #196456) - key migration infrastructure
- OCE delegated profiles (#196856) - Enterprise multi-user
- GitHub per-agent accounts (#196200)

**Agent Execution**:
- Context-aware continuation (#129388) - 8 tháng, near merge
- Sessions_send admission (#194376) - rate limiting
- Prompt injection checks (#194566) - security layer

**Stability priorities**:
- Session state recovery paths
- Update/migration reliability
- Memory-bounded operations
- Concurrent DB write safety

### Technical debt:
- Plugin hooks incomplete (one-shot calls)
- CLI backend double-render
- Telegram echo flexibility
- Windows-specific timing/cleanup

---

**Đánh giá chung**: Dự án mature, focus chuyển từ features sang reliability. Session corruption + update failures là top priority. Enterprise auth overhaul (OCE, ID rebind) đang tiến triển tốt. Community active report bugs, maintainers responsive nhưng backlog lớn.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích NanoBot - 2026-11-11

## 1. Tóm tắt hôm nay

Merge 16 PRs trong 1 ngày - chuẩn bị release 0.4.1 hoàn tất. Tập trung fix bugs WebUI (cross-session input, theme, scroll) và cải thiện performance (giảm memory copy, tối ưu layout). Đóng API server độc lập, chuyển sang gateway-only architecture.

## 2. Releases

Không có release công bố hôm nay. PR #6570 (prepare 0.4.1) đã merge nhưng chưa tag chính thức.

## 3. Tiến độ dự án

**Architecture changes (breaking):**
- #6614: Xóa `nanobot serve` standalone API server → chỉ dùng gateway
- #6621: Xóa global shared session mode → per-chat hoặc explicit topic only

**WebUI fixes:**
- #6613: Cross-session input ownership - messages giữa sessions giờ coi như user input đúng
- #6590: Context sidebar auto-đóng khi tạo conversation mới (trước đó sidebar trống chiếm chỗ)
- #6612: Middle-click autoscroll hoạt động lại (browser-native gesture)
- #6591: First visit follow browser language, không auto-save English nữa
- #6608: Context graph giữ system prompt sources sau compaction
- #6610: Paste path giữ nguyên text khi attachment detection fail

**Performance:**
- #6581: Giảm memory copy - stream file reads, incremental session search, chunked model requests
- #6587: File activity layout responsive hơn - dùng ResizeObserver thay vì sync size reads

**Core fixes:**
- #6603: `/new` command không tự cancel worker đang chạy nó nữa
- #6606: Delivery failures persist qua channel boundaries (email, Mattermost)
- #6611: Render deployment fix - invoke container entrypoint đúng
- #6625: Gateway systemd service stop persistent (`Restart=on-failure` thay `always`)

**Refactoring:**
- #6623: Centralize process-tree lifecycle
- #6616: Centralize scoped file operations

**Testing:**
- #6622: Isolate flaky CI tests, retain diagnostics
- #6588: Raise long-task budget 100→150ms cho 500-node graph test

## 4. Điểm nổi bật cộng đồng

**Issue #5798** (3 comments) - Bug cross-session reply corruption:
- Version 0.3.0 không có, 0.3.5 xuất hiện
- Conversation A đang chạy, reply trong B lại hiện ở A
- Fixed bởi #6613

**Issue #6624** - Gateway systemd `Restart=always` problem:
- `nanobot gateway stop` kill process nhưng systemd restart lại
- Fixed bởi #6625 same day

Zero reactions (👍) trên cả 3 issues - low community engagement hoặc internal testing phase.

## 5. Ổn định & Bugs

**Fixed hôm nay:**
- Cross-session input routing (#6613)
- Self-cancellation khi reset idle session (#6603)
- Systemd service restart loop (#6625)
- WebUI language auto-save wrong default (#6591)
- Middle-click scroll conflict (#6612)
- Context graph loss sau compaction (#6608)

**Open bugs có conflict tag:**
- #6405: Idle scans conflict với direct turns
- #6194: API session locks không release
- #2078: Zalo integration refactor (8 tháng chưa merge)

## 6. Yêu cầu tính năng

**Issue #5749** - Expose stable tool invocation context:
- Request: Tool implementation cần thấy tool-call ID để tránh duplicate side effects
- AgentRunner đã có ID nhưng không pass xuống tool
- Status: Open, 1 comment, chưa có PR assign

**PR #5825** - Structured decision client:
- Replace JEV-specific client → provider-neutral abstraction
- OpenRouter + System One protocol làm backend đầu tiên
- Status: Open, có conflict tag

## 7. Phản hồi người dùng

**Negative:**
- #5798: Cross-session reply corruption gây confusion
- #6624: Systemd service không stop được

**Quality concerns:**
- CI flaky tests (#6622) - cần isolate
- Performance issues với large file/session data (#6581, #6587)

**No positive feedback** trong dataset - issues focus on problems, PRs mostly internal.

## 8. Backlog & Roadmap

**Near-term (open PRs):**
- #6621: Retire global shared session (refactor)
- #6623: Centralize process lifecycle (refactor)
- #6616: Centralize file operations (refactor)

**Blocked/stalled:**
- #6405, #6194: Lock/idle session conflicts
- #5825: Structured decision client (2 tháng open)
- #2078: Zalo integration (8 tháng open)

**Architecture direction:**
- Gateway-only (no standalone API server)
- Per-chat sessions (no global shared)
- Centralized subsystems (exec, files, process)

**Quality focus:**
- Memory efficiency
- WebUI responsiveness
- CI stability

**Release cadence:** 0.4.1 sắp drop sau 16 PRs merged. Velocity cao - 1 ngày merge số lượng PRs = typical project merge trong 1 sprint.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-11-11

## 1. Tóm tắt hôm nay

**Release v0.9.0 đã ra mắt** với hệ thống đăng nhập OIDC không cần pairing thủ công, tự động gia hạn certificate 30 ngày, và sửa lỗi hardcode temperature gây reject với một số model. 6 issue đóng, 30 PR merge trong ngày - tập trung vào bảo mật OIDC, tài liệu, và fix lỗi docs deployment.

## 2. Releases

**v0.9.0** - Release lớn về authentication:

**Tính năng chính:**
- 🔐 **`zerocode login` không cần pairing** (#12317) - user chạy `zerocode login <oidc-alias> <target>`, verify OIDC, nhận device certificate 30 ngày, tự động lưu credentials. Bỏ bước thủ công copy token.
- 🔄 **PKCE cho mọi device grant** (#12364) - S256 code_challenge/code_verifier đồng bộ với interactive client. Legacy connection vẫn hoạt động.
- 📜 **Device certificate lifecycle rõ ràng** (#12370) - 30 ngày expiry, `cert/renew` xác thực bằng client cert (không cần OIDC principal nữa).
- 🌡️ **Fix temperature hardcode** (#12367) - heartbeat và model-routing probe gửi `None` thay vì `temperature: 0.0`, tránh reject từ model không chấp nhận temperature=0.

**Breaking change:** Không có - legacy auth path vẫn hoạt động.

## 3. Tiến độ dự án

**Đã merge (release v0.9.0):**
- #12317 - OIDC login tự động (XL, risk:high)
- #12367 - Fix temperature probe
- #12370, #12364 - Docs cho OIDC flow mới

**Docs infrastructure fixes** (6 issues đóng):
- #12328, #12329 - Stable docs giờ dùng `/stable/en/...` thay vì `/v0.8.7/...` → URL không đổi khi release mới
- #12326 - Pruned versions redirect đến stable thay vì 404
- #12325, #12324 - Canonical URL, sitemap, robots.txt sửa

**Hoạt động tiếp tục:**
- #11847 (XL) - Native Rust XMPP + OMEMO (88% đường về master)
- #12316 (XL) - SimpleX channel với voice notes + encrypted calls
- #10407 (XL) - Persistent session prompt attachments (8 tháng, 27 reviews)
- #11911 (XL) - Tool result retention + bounded recovery

**Xu hướng:** Mở rộng channels (SimpleX, XMPP), cải thiện session persistence, tài liệu infrastructure ổn định sau release churn.

## 4. Điểm nổi bật cộng đồng

**Không có interaction đáng kể** - tất cả issues đóng trong ngày có 0 comment, 0 reactions. PRs cũng không có số bình luận trong data.

Dấu hiệu: 
- Core team làm việc nội bộ
- User ít tham gia vào dev discussions
- Hoặc data crawl thiếu interaction metrics

## 5. Ổn định & Bugs

**Đã fix (v0.9.0):**
- ✅ #12366 - Temperature=0.0 gây model reject
- ✅ #12326 - Pruned docs 404
- ✅ #12325 - Canonical URL di chuyển mỗi release

**Đang fix:**
- 🔧 #12323 - HTTP client cache bind sai Tokio runtime → reuse client từ runtime đã chết
- 🔧 #12376 - Dashboard chat reload giữa turn → answer không load lại
- 🔧 #12150 - macOS Seatbelt regex `\\\.` không match `~/.cargo`

**Chất lượng:** Bugs đều severity S2-S3 (degraded behavior, minor issue) - không có crash/data loss.

## 6. Yêu cầu tính năng

**Channels mới:**
- #12316 - **SimpleX messaging** với voice notes, encrypted calls
- #11847 - **XMPP native** với legacy OMEMO support

**Session management:**
- #10407 - **Persistent prompt attachments** (4 bounded prompts per session, survive restart, cleanup transactional)

**Developer experience:**
- #11869 - Task-owned SSH transport reuse (idle connection recovery)
- #11911 - Tool result retention cho closeout without tools

Trend: Privacy-focused channels (SimpleX E2EE), session durability, dev workflow optimization.

## 7. Phản hồi người dùng

**Không có explicit feedback** trong data. Issues đều từ @JordanTheJet, @IftekharUddin (core team), không có external reports.

Observation: 
- User pain points đến từ internal testing/dogfooding
- Hoặc cộng đồng feedback qua channels khác (Discord, Slack)

## 8. Backlog & Roadmap

**Đang review (high priority):**
- #11868 - Stop repeated tool calls pre-dispatch (risk:high, needs-maintainer-review)
- #11847 - XMPP channel (needs-maintainer-review)

**Active dev tracks:**
- **Channels:** SimpleX (#12316), XMPP (#11847) → multi-protocol coverage
- **Session:** Persistent attachments (#10407) → state survival
- **Recovery:** Bounded channel recovery (#11911), tool result retention (#11868)
- **Security:** ChaCha20Poly1305 unification (#12015), paired device voice controls (#12269)

**Infrastructure debt:**
- Docs canonical URL strategy hoàn tất (#12328, #12329 merged)
- SQLite advisory waive removed (#12322) → 3.54.1 upgrade clean

**Next milestone:** Likely v0.9.1 với channel additions (SimpleX/XMPP nếu review pass) + session persistence.

---

**Zeroclaw đang:** Consolidate authentication (v0.9.0 OIDC done), expand channel support (SimpleX/XMPP in flight), improve session durability (prompts persistence). Docs infrastructure stable sau release churn. Cộng đồng participation thấp trong dev discussions - phản ánh mature project hoặc feedback channel khác.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo hoạt động PicoClaw - 2026-11-11

## 1. Tóm tắt hôm nay

Hoạt động yên ắng. Chỉ có 1 PR về quốc tế hóa (i18n) - thêm bản dịch tiếng Pháp cho giao diện web. Không có issue mới, không có release, không có bug report hay feature request.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**Pull Request duy nhất:**

- **#3467 - feat(web): add French UI locale** 
  - Tác giả: @slashr512
  - Trạng thái: OPEN (mới tạo hôm qua)
  - Nội dung: Thêm file `fr.json` với bản dịch đầy đủ cho web launcher, tích hợp vào i18next và dayjs, cập nhật menu chọn ngngữ ở màn hình login/setup/dashboard

**Phân tích:**
- Đây là công việc mở rộng hỗ trợ ngôn ngữ, không phải tính năng core
- PR chưa có review hay comment → có thể đang chờ maintainer kiểm tra
- Zero interaction (0 👍, undefined comments) → cộng đồng chưa quan tâm hoặc PR quá mới

**Xu hướng:** Dự án đang ở giai đoạn bình ổn, không có động thái phát triển tích cực trong 24h qua.

## 4. Điểm nổi bật cộng đồng

Không có. 

PR duy nhất không có tương tác nào. Không có issue để đo mức độ quan tâm của người dùng.

## 5. Ổn định & Bugs

Không có bug report trong 24h qua.

Điều này có thể nghĩa:
- Bản hiện tại ổn định
- Hoặc cộng đồng không active (ít người dùng report)

## 6. Yêu cầu tính năng

Không có feature request mới.

## 7. Phản hồi người dùng

Không có discussion, comment hay feedback nào ghi nhận được.

## 8. Backlog & Roadmap

Không có thông tin về roadmap trong dữ liệu cung cấp.

Từ PR #3467, có thể suy luận dự án đang:
- Mở rộng phạm vi người dùng quốc tế (sau tiếng Anh, giờ thêm tiếng Pháp)
- Tập trung vào web frontend

---

## Kết luận

Ngày 2026-11-11 là ngày **rất yên tĩnh** cho PicoClaw. Chỉ có 1 PR i18n chưa được merge, không có hoạt động đáng kể khác. Cần theo dõi thêm vài ngày để đánh giá xem đây là:
- Giai đoạn chững lại sau một milestone lớn
- Dự án đang mất động lực
- Hay chỉ đơn giản là ngày cuối tuần không có activity

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw - 2026-11-11

## 1. Tóm tắt hôm nay

19 PR hoạt động, không có issue hay release mới. Tập trung vào bảo mật (injection hardening), sửa lỗi channel (Mattermost, Slack), cập nhật dependencies. Core team chủ đạo, @glifocat author 15/19 PR.

## 2. Releases

Không có.

## 3. Tiến độ dự án

### Bảo mật (Security Hardening) - xu hướng chính

**4 PR shell injection prevention:**
- #4317: Docker build command không qua shell, block path injection
- #4316: Sign-in link chỉ mở HTTPS, không qua `cmd.exe`  
- #4315: Dial skill ghi auth file mode 0600
- #4318: CI dùng read-only token, release check SHA trên main branch

**Tác động:** Mitigate command injection qua install path, credential leak, supply chain attack.

### Channel fixes - ổn định tích hợp chat

- #4321: Mattermost group message không đếm mọi post là mention
- #3797 [CLOSED]: Mattermost thread engagement giờ match Slack behavior
- #3802 [CLOSED]: `mention-sticky` chỉ follow thread sau khi bot được tag
- #4204: Slack setup hiện lỗi chi tiết, verify pass sau re-run

### Setup/Installation

- #4202 [CLOSED]: Cài jq cho channel setup trên WSL/minimal Ubuntu
- #4203 [CLOSED]: OneCLI gateway warn khi point về wrong host
- #4213 [CLOSED]: Restart host sau khi provider-auth cài provider mới
- #4312 [CLOSED]: Auto-resolve `pnpm-lock.yaml` conflict trong `/update-nanoclaw`

### Dependencies

- #4332 [CLOSED]: Claude Code 2.1.321 + Agent SDK 0.3.321 → support Claude Fable 5.2
- #4293: Prettier 3.9.10 reformat (11 file thay đổi)
- #4275: Anthropic SDK 0.108.0 → 1.3.0 (pending)
- #4276 [CLOSED]: Claude Agent SDK 0.3.296 → 0.3.316

### Khác

- #4333: Agent image refresh v2026.10.0-20261110T0904
- #4319: Drop no-op test trong OneCLI upgrade guide
- #4156: Escape approval card text, refuse card channel không render được

## 4. Điểm nổi bật cộng đồng

Không có PR nào có 👍 (tất cả 0 reactions). Không có comment data. Dự án chủ yếu core-team driven, không thấy external contributor.

## 5. Ổn định & Bugs

### Đã fix (9 PR merged)

**Critical:**
- Shell injection vectors trong build, setup, skill execution
- Mattermost false-positive mentions gây bot spam
- Setup fail trên WSL thiếu jq

**Medium:**
- Thread routing logic (mention-sticky wake sai context)
- Provider install không restart → agent dùng old image
- Slack setup fail im lặng

### Đang xử lý (10 PR open)

- #4321: Mattermost group mention (final review)
- #4317, #4316, #4318: Security hardening PRs
- #4275: Anthropic SDK major bump (0.x → 1.x, cần test kỹ)
- #4293: Prettier reformat (CI đang fail)
- #4156: Card text escaping + validation

## 6. Yêu cầu tính năng

Không thấy feature request trong 24h. #4332 là duy nhất feature PR (Claude Fable 5.2 support) đã merge.

## 7. Phản hồi người dùng

Không có dữ liệu từ issue comments. PR descriptions cho thấy pain points:
- WSL/minimal Linux setup bị block thiếu dependencies
- Bot spam Mattermost group chat
- Setup error messages không rõ ràng
- Update conflict với lockfile

## 8. Backlog & Roadmap

Từ open PRs suy ra ưu tiên:

**Ngắn hạn:**
- Hoàn tất security hardening wave (4 PR)
- Ổn định Anthropic SDK 1.x migration
- Fix Prettier CI failure

**Trung hạn:**
- Channel escaping/validation (#4156 - approval cards)
- Dependency updates cleanup (Dependabot PRs)

**Không có roadmap công khai** trong data. Dự án reactive với bugs/security hơn là feature-driven.

---

**Nhận xét tổng quan:** 
Sprint tập trung bảo mật sau khi phát hiện shell injection patterns. Mức độ hoạt động cao (19 PR) nhưng cộng đồng engagement thấp. Chất lượng engineering tốt - catch injection bugs, improve error visibility, smooth upgrade conflicts.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo hoạt động NullClaw - 2026-11-11

## 📊 Tóm tắt hôm nay

3 PR mới mở rộng khả năng tích hợp providers. Không có issues hay releases. Dự án tập trung vào kết nối thêm LLM gateways và công cụ tìm kiếm miễn phí.

## 🚀 Releases

Không có releases trong 24h qua.

## 🔨 Tiến độ dự án

### Pull Requests đang mở

**#1093 - OpenCode Go support**
- Thêm provider tương thích OpenAI trỏ đến `opencode.ai/inference/go`
- Gửi header `x-opencode-session` bắt buộc (API từ chối request thiếu header này với lỗi 400)
- Tác giả: @ibhagwan
- Trạng thái: Chờ review

**#1092 - UberLLM gateway**
- Thêm UberLLM như OpenAI-compatible gateway
- Dùng `OpenAiCompatibleProvider` có sẵn, không cần implementation mới
- Một API key truy cập ~260 models từ nhiều nhà cung cấp (Anthropic, OpenAI, DeepSeek, Qwen, GLM, Kimi, Gemini)
- Định dạng model ID: `vendor/model`
- Tác giả: @PSA-Team-source
- Trạng thái: Chờ review

**#1091 - Keenable web search (không cần API key)**
- Thêm provider tìm kiếm web Keenable vào `src/tools/web_search_providers/`
- **Miễn phí**: Không có key → gọi `POST https://api.keenable.ai/v1/search/public`
- Có `KEENABLE_API_KEY` → gọi `POST /v1/search` với giới hạn cao hơn
- Tác giả: @KGKallasmaa
- Mở từ 2026-11-03, cập nhật 2026-11-10
- Trạng thái: Chờ review

### Xu hướng

Dự án mở rộng hệ sinh thái theo 2 hướng:
1. **LLM providers**: Tích hợp gateways cho phép truy cập nhiều models qua một endpoint
2. **Web search**: Thêm options miễn phí (Keenable) giảm phụ thuộc API key có phí

Kiến trúc tái sử dụng `OpenAiCompatibleProvider` cho gateways mới → không tăng complexity code.

## 💬 Điểm nổi bật cộng đồng

Không có tương tác nổi bật (0 reactions trên cả 3 PRs). Activity thấp có thể do:
- PRs mới (< 24h)
- Tính năng niche (integrations cụ thể)
- Cộng đồng nhỏ hoặc timezone khác

## 🐛 Ổn định & Bugs

Không có bug reports trong 24h qua. PRs là feature additions, không phải fixes.

## ✨ Yêu cầu tính năng

Cả 3 PRs đều thêm tính năng mới:
- **OpenCode Go**: Hỗ trợ gateway AI Trung Quốc
- **UberLLM**: Aggregator truy cập 260+ models
- **Keenable**: Web search miễn phí

Không có feature requests từ users trong issues.

## 📣 Phản hồi người dùng

Không có comments hay feedback trong 24h qua.

## 🗺️ Backlog & Roadmap

Không có thông tin roadmap công khai từ data. Infer từ PRs:
- Tiếp tục mở rộng provider integrations
- Ưu tiên options miễn phí/tiết kiệm chi phí (Keenable, UberLLM aggregator)
- Hỗ trợ đa nhà cung cấp AI (US, China, global gateways)

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo hoạt động QwenPaw ngày 2026-11-11

## 1. Tóm tắt hôm nay

Release beta.4 ra sớng fix runtime channel trên desktop build. Console Safari patch merged sáng nay. Core activity: stabilize channel plugins + polish UI + sync third-party models.

## 2. Releases

### v2.3.0-beta.4 (2026-11-10)
- Fix channel plugin dependencies bị lost qua update (#8653)
- Recovery mechanism cho interrupted plugin installs (#8659)
- PR #8667: bắt đầu verification checklist (4h window)

## 3. Tiến độ dự án

### Merged/Closed
- **#8670** [Safari icon fix]: Lucide icons nhận `size="small"` → invalid SVG width. Fixed → merged ngay
- **#8653**: Desktop channel workers fail `WORKER_START_FAILED` vì missing `supported_tags` attribute. Preserve dependency evidence across updates
- **#8664**: Remote password login cho Docker deployments (no local callback)

### Active high-impact
- **#8668** [perf]: Cut idle compositor work:
  - AmbientLight opacity breathing → compositor blends full-screen mỗi frame
  - ThinkingIndicator liquid wave + auto-scrolling → CPU burn khi hidden
  - Markdown render: memoize + skip unchanged blocks
  
- **#8426** [XXXL]: Extract third-party agents → plugins (architectural refactor)

- **#8648/#8647/#8649** [stacked stack]: 
  - Managed MLX engine cho macOS 
  - llama.cpp GPU controls
  - Runtime auto-update
  - Console UI cho cả 3 layers

### Infrastructure
- **#8234**: GBK/CP936 decode cho Chinese Windows files (read/edit/grep)
- **#8236**: Ollama context window từ `num_ctx` thay vì hardcode 128k
- **#8662**: Fix `/workspace/` absolute links → download thay vì navigate SPA

## 4. Điểm nổi bật cộng đồng

### Top interaction
- **#8663** [Safari bug]: Message queue action buttons (edit/interrupt/delete) not rendered. Quick turnaround: issue opened 2026-11-10 → PR merged 2026-11-11
- **#8661**: Hub 2.2.2 `/workspace/` links return HTML thay vì file. Chinese user report → Chinese contributor PR same day
- **#7990** [4 comments]: Aliyun Token Plan models missing `thinking_param_style` → Console hide thinking controls

### User pain points
1. **Channel stability**: #8669 race condition → `CHANNEL_NOT_CONNECTED` every start (feishu deterministic)
2. **QQ images**: #8651 image-only C2C messages dropped silently
3. **Attachment paths**: #8655 truncated to drive root (`C:\`) since beta.1 → images fail to load

## 5. Ổn định & Bugs

### Critical (beta blockers)
- **#8644**: Channel plugins NEVER activate trên packaged desktop (fixed in beta.3/beta.4)
- **#8655**: Attachment path regression beta.1+ → file saves OK, model receives drive root only
- **#8669**: `_wait_connected` race: initial `platform_state="disconnected"` treated as fatal

### Medium
- **#8406**: QQ channel `enabled` flag silent reset → false, no warning
- **#8650**: Thinking block vs tool card visual mismatch → left edge jumps

## 6. Yêu cầu tính năng

### New requests
- **#8512**: Gateway-reported status from error text (mid-stream failures)
- **#8638**: Intent titles for shell command cards (hide raw command)
- **#8660**: Gate terminal status checks on auth (skip khi auth disabled)

### Long-running
- **#8178** [XXL]: Nested skill directories (`<root>/<category>/<skill>/SKILL.md`)
- **#8100**: Use resolved media capabilities at runtime (catalog mismatch bug)
- **#8479** [XXXL]: Sync Office skills với Anthropic July 2026 update

## 7. Phản hồi người dùng

### Positive signals
- Chinese Windows users: GBK decode PR (#8234) addresses core pain
- Safari users: quick icon fix appreciated
- Remote Docker users: password login fills major gap

### Friction areas
- Channel plugin validation: too many edge cases hitting prod
- Desktop builds: lighter dependency evidence needed
- File paths: Windows absolute path handling fragile across versions

## 8. Backlog & Roadmap

### Pre-2.3.0 final
- Stabilize channel plugin runtime (3 beta releases cho này)
- Polish Console perf (compositor, render memoization)
- Complete local engine controls (MLX + llama.cpp stack)

### Post-2.3.0
- Plugin ecosystem expansion (agents → plugins architectural shift)
- Nested skill organization
- Office skills sync với upstream

### Technical debt
- Model capability resolution unification (#8100)
- GBK/legacy encoding support (#8234)
- Ollama dynamic context sizing (#8236)

---

**Trend**: Beta cycle dài (beta.1 → beta.4 trong 10 ngày) focusing channel stability. Desktop packaging edge cases nhiều hơn expected. Community contributors active trên localization + edge case bugs (Safari, GBK, Chinese workspace links).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*