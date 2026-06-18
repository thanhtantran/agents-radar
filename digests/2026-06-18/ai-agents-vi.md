# Bản tin Hệ sinh thái OpenClaw 2026-06-18

> Issues: 272 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-06-18 02:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [GoClaw](https://github.com/nextlevelbuilder/goclaw)
- [Hermes-Agent](https://github.com/nousresearch/hermes-agent)

---

## Phân tích sâu OpenClaw

# Báo cáo phân tích hoạt động OpenClaw - 18/06/2026

## 📊 Tóm tắt hôm nay

Dự án OpenClaw tiếp tục duy trì nhịp độ phát triển cao với 30 PR được cập nhật trong 24h qua, tập trung chính vào việc fix các vấn đề delivery message, cải thiện tính ổn định của plugin system, và mở rộng khả năng tích hợp với các provider bên ngoài. Đáng chú ý là nỗ lực externalize các provider thành plugin độc lập (GMI provider) và bổ sung hệ thống QA Lab evidence gallery để tăng tính minh bạch trong kiểm thử.

---

## 🚀 Releases

Không có release chính thức nào trong 24h qua. Phiên bản mới nhất vẫn là **v2026.6.x** đang trong giai đoạn beta testing.

---

## 🔧 Tiến độ dự án

### Pull Requests nổi bật

**🔴 Critical Fixes:**

- **#94106** - Fix secrets scoping bug: Việc migrate API key của một provider sang SecretRef có thể xóa credential của provider khác nếu chúng dùng cùng giá trị. Fix này scope env scrub chỉ cho provider đang migrate.

- **#93823** - WhatsApp multi-chunk reply: Khi gửi reply dài hơn 4000 ký tự kèm media lỗi, chunk đầu tiên bị mất. PR fix giữ lại text chunk ngay cả khi media fail.

- **#94328** - Context compaction bug: User prompt bị nhầm là duplicate và bị xóa sau khi compaction xoay transcript. Fix này preserve các prompt hợp lệ trong tail window.

**🎯 Feature Development:**

- **#94350** - Externalize GMI provider: Chuyển GMI thành plugin bên ngoài có thể cài qua ClawHub/npm, với metadata, README và shrinkwrap riêng. Đây là bước quan trọng trong việc modularize kiến trúc.

- **#94283** - QA Lab evidence gallery: Thêm UI gallery để xem artifacts và evidence từ `qa-evidence.json`, giúp maintainer và contributor dễ verify test coverage hơn.

- **#94352** - Provider plugin scaffolding: Mở rộng `openclaw plugins init` để generate provider plugin scaffold với TypeScript, tests, ClawHub validation.

**🔧 Infrastructure & Stability:**

- **#92014** - Doctor hardening: Survive throwing plugin hooks và cảnh báo build-version skew giữa installed plugins và core OpenClaw version.

- **#87449** - Mattermost text-block boundaries: Fix draft preview để giữ boundary giữa các text blocks, tránh mất message khi tool-heavy turn.

- **#94042** - Feishu drive pagination: Fix `feishu_drive` để hỗ trợ paginate qua các file vượt quá trang 1 (>50 items).

### Xu hướng phát triển

1. **Plugin Externalization**: Nỗ lực tách các provider/channel thành external plugins (GMI, policy-doctor metadata split) - hướng đến ecosystem mở rộng
2. **Message Delivery Robustness**: Nhiều PR fix các edge case trong multi-chunk, streaming, và cross-channel message delivery
3. **Developer Experience**: QA Lab tooling, better scaffolding, improved doctor diagnostics
4. **Provider Flexibility**: Dynamic model discovery, custom header templating, non-native base URL support

---

## 💬 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác nhất

**🔥 #25592 (32 comments, 🦞 diamond lobster)** - Text between tool calls leaks to messaging channels
- **Vấn đề**: Text giữa các tool call (error handling, acknowledgments) bị route thành visible message trong Slack/iMessage
- **Impact**: Security + UX - internal processing output lộ ra ngoài
- **Status**: Đã có linked PR, đang chờ maintainer review

**🔥 #88838 (30 comments, 🦞 diamond lobster)** - Track core session/transcript SQLite migration
- **Vấn đề**: Migrate session/transcript sang SQLite cần phải nhỏ, reviewable PRs thay vì một rewrite lớn
- **Approach**: Branch-by-abstraction seam để giảm risk
- **Status**: Maintainer-owned, P0 priority

**🔥 #9443 (25 comments, 🌊 off-meta tidepool)** - Request prebuilt Android APK releases
- **Yêu cầu**: GitHub releases nên có APK builds sẵn, không bắt user phải tự compile
- **Impact**: Security concern - unverified builds, manual compilation barrier
- **Community demand**: 2 👍, nhiều comment follow-up

**🔥 #22438 (17 comments, 🦞 diamond lobster)** - Tiered bootstrap file loading
- **Proposal**: Load bootstrap files theo tiers (base → optional → rarely-used) để tiết kiệm context tokens
- **Use case**: Large workspace users tốn context cho files không dùng tới
- **Status**: Có linked PR, đang review

---

## 🐛 Ổn định & Bugs

### Vấn đề nghiêm trọng đang xử lý

**P0/P1 Priority:**

1. **#86215** - Codex OAuth refresh failures wedge agent for hours
   - Khi Codex OAuth timeout hoặc 401, gateway retry mãi không rotate profile
   - Thiếu alerting rõ ràng cho operator
   - Cần aggressive profile rotation

2. **#31583** - `exec` tool không inherit skill env variables
   - Regression: `skills.entries.*.env` không pass vào subprocess
   - Không thể inject secrets vào skills
   - Có linked PR đang review

3. **#39847** - Echo contamination: metadata leaks in Discord
   - stripInboundMetadata không được gọi trong outbound pipeline
   - Internal metadata (thread context, sender info) lộ trong bot messages
   - Security concern, có PR fix

**Regression Issues:**

- **#92451** - v2026.6.x system prompt bloat: 20+ tools/instructions mới làm giảm instruction-following quality trên small models
- **#76935** - QQ Bot sends verbose/repetitive replies sau upgrade 2026.5.2

### Pattern nhận biết

- **Message delivery fragility**: Nhiều edge cases trong multi-channel, multi-chunk scenarios
- **Provider compatibility**: Custom/non-native providers gặp config resolution issues
- **Context management**: Compaction, truncation, duplication detection còn có bugs
- **Auth/credential handling**: OAuth refresh, secret scoping, trusted-proxy fallbacks cần hardening

---

## ✨ Yêu cầu tính năng

### Feature requests được quan tâm

**🔒 Security & Access Control:**

- **#10659** (13 comments, 4 👍) - **Masked Secrets**: Agent dùng được API keys nhưng không xem được raw value, chống prompt injection
- **#7707** (12 comments) - **Memory Trust Tagging**: Tag memory entries theo trust level (user commands vs web scrapes) để chống poisoning
- **#6731** (12 comments) - **Safe/Unsafe ClawdBot**: Safe mode chạy trong sandbox, unsafe cho root access (Rust-inspired)

**🎯 Session & Context Management:**

- **#68596** (15 comments, 8 👍) - **Configurable streaming watchdog timeout**: Extended reasoning models (kimi-k2.5, DeepSeek-R1) cần timeout > 30s
- **#22438** (17 comments) - **Tiered bootstrap file loading**: Progressive context control để tiết kiệm tokens
- **#13700** (6 comments) - **Session snapshots**: Save/load context checkpoints để A/B test hoặc rollback

**🤖 Agent Orchestration:**

- **#27445** (11 comments, 5 👍) - **`announceTarget` cho sub-agent**: Route completion announces về parent session thay vì trực tiếp channel
- **#22358** (12 comments) - **Post-subagent completion hook**: Extension hook để generate structured trajectory sau khi subagent finish

**⚙️ Provider & Model Flexibility:**

- **#10687** (9 comments, 3 👍) - **Fully dynamic model discovery**: OpenRouter + providers khác fetch models realtime thay vì static catalog
- **#16387** (4 comments) - **Dynamic header templating**: Support custom headers cho Fireworks.ai prompt caching và providers tương tự
- **#23353** (5 comments) - **Anthropic native server-side tools**: web_search, web_fetch, code_execution chạy hoàn toàn trên Anthropic infra

### Feature patterns

- **Security-first**: Community yêu cầu secret masking, trust boundaries, sandbox modes
- **Token optimization**: Tiered loading, tool schema reduction (#14785 - 3.5k tokens/session)
- **Observability**: Usage logging, cost tracking, model attribution
- **Multi-agent workflows**: Better subagent coordination, completion routing

---

## 💭 Phản hồi người dùng

### Trải nghiệm tích cực

- QA Lab evidence gallery (#94283) được đánh giá cao - tăng transparency trong testing
- Plugin externalization (GMI #94350) nhận feedback tốt - giúp ecosystem mở rộng
- Doctor hardening (#92014) giải quyết pain point về plugin version skew

### Pain points chính

**1. Message Delivery Reliability** 
- WhatsApp multi-chunk (#93823), Mattermost text boundaries (#87449), QQ Bot repetition (#76935)
- User frustration: "Messages vanish," "duplicate replies," "text blocks disappear"

**2. Provider Configuration Complexity**
- Ollama remote/cloud (#93956), OpenAI baseURL alias (#93505), Bedrock anthropic_beta (#39734)
- Quote: "Had to manually patch amazon-bedrock.js after every upgrade" (#39734)

**3. Context Management Surprises**
- Compaction rotation (#94328), bootstrap file overhead (#22438), streaming watchdog timeout (#68596)
- Quote: "Agent can skip AGENTS.md startup sequence — not enforced by runtime" (#87857)

**4. Security & Credential Handling**
- Secret scrubbing bug (#94106), exec env inheritance (#31583), OAuth wedging (#86215)
- Quote: "Migrating one provider's key silently deletes another provider's credential" (#94106)

### UX feedback patterns

- **Accessibility**: #9637 yêu cầu disable emojis/unicode cho screenreader users
- **Multi-platform parity**: WhatsApp stickers (#7476), Telegram quote-reply (#94309), Android APKs (#9443)
- **Developer ergonomics**: TUI Shift+Enter for newline (#10118), plain text copy option (#7909)

---

## 📋 Backlog & Roadmap

### Short-term focus (dựa trên PR activity)

1. **Message delivery hardening** - Nhiều PR đang fix multi-chunk, streaming, cross-channel issues
2. **Provider plugin ecosystem** - Externalization efforts (GMI, policy-doctor split)
3. **Session state reliability** - SQLite migration (#88838), compaction fixes
4. **Security boundaries** - Secret scoping, metadata stripping, auth robustness

### Medium-term initiatives (dựa trên issue labels)

**P0/P1 tracked:**
- Core session/transcript SQLite migration (#88838) - 30 comments, maintainer-owned
- Text leakage between tool calls (#25592) - 32 comments, security impact
- OAuth refresh wedging (#86215) - 9 comments, availability impact

**High-demand features:**
- Masked secrets system (#10659) - 13 comments, 4 👍
- Dynamic model discovery (#10687) - 9 comments, 3 👍, maintainer-tagged
- Configurable streaming watchdog (#68596) - 15 comments, 8 👍

### Architectural direction

**Plugin-first architecture**: 
- Externalize bundled providers (GMI done, others planned)
- Scaffold tooling for community plugins (#94352)
- ClawHub integration for discovery

**Observability & Safety**:
- QA Lab evidence system (#94283)
- Pre-response enforcement hooks (#13583)
- Path-scoped RWX permissions (#39979)

**Multi-agent orchestration**:
- Sub-agent completion routing (#27445)
- Post-completion hooks (#22358)
- Session snapshot/branching (#13700)

---

## 🎯 Kết luận

OpenClaw đang trong giai đoạn **maturation** với focus chính:
- **Stability**: Fix message delivery, auth, context management bugs
- **Modularity**: Plugin externalization, provider flexibility
- **Developer Experience**: Better tooling, diagnostics, scaffolding
- **Security**: Credential handling, trust boundaries, secret masking

Community engagement cao (272 open issues, 500 PRs) với nhiều feature requests quality cao. Pain points chính là message delivery reliability và provider configuration complexity - đều đang được address tích cực.

Roadmap ngắn hạn rõ ràng với SQLite migration, message delivery hardening và plugin ecosystem expansion. Dự án đang balance giữa innovation (new features) và stabilization (bug fixes) một cách hiệu quả.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 18/06/2026

## 🌍 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 18/06/2026 đang trong giai đoạn **maturation với sự phân hóa rõ rệt**. Từ dữ liệu 11 dự án, chúng ta quan sát được:

### Đặc điểm chung:
- **Velocity cao**: Trung bình 25 PRs/dự án trong 24h, cho thấy development cycle cực kỳ nhanh
- **Cross-platform pain**: 7/11 dự án gặp vấn đề Windows compatibility nghiêm trọng
- **Security awakening**: Tăng đột biến các CVE patches và auth hardening
- **Plugin ecosystem emergence**: Shift từ monolithic sang modular architecture
- **Multi-channel wars**: Cạnh tranh gay gắt về hỗ trợ messaging platforms (WhatsApp, Feishu, Slack...)

### Phân tầng thị trường:
- **Enterprise tier**: OpenClaw, Zeroclaw, IronClaw - focus collaboration, security, scale
- **Developer tier**: NanoBot, GoClaw, Hermes-Agent - focus DX, automation, productivity
- **Specialized tier**: PicoClaw (edge), LobsterAI (coding), Moltis (voice)
- **Academic tier**: CoPaw/QwenPaw (research-backed), NanoClaw (NEAR ecosystem)

---

## 📊 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Velocity | Community | Maturity |
|-------|--------|-----|----------|----------|-----------|----------|
| **OpenClaw** | 272 | 500 | 0 | 🔥🔥🔥🔥 | 🌟🌟🌟🌟🌟 | ⭐⭐⭐⭐ |
| **NanoBot** | 9 | 30 | 0 | 🔥🔥🔥 | 🌟🌟🌟 | ⭐⭐⭐ |
| **Zeroclaw** | 16 | 50 | 0 | 🔥🔥🔥🔥 | 🌟🌟🌟 | ⭐⭐⭐ |
| **PicoClaw** | 4 | 10 | 0 | 🔥🔥 | 🌟🌟 | ⭐⭐ |
| **NanoClaw** | 5 | 19 | 2 | 🔥🔥🔥 | 🌟🌟 | ⭐⭐⭐ |
| **IronClaw** | 9 | 50 | 0 | 🔥🔥🔥🔥 | 🌟🌟🌟🌟 | ⭐⭐⭐⭐ |
| **LobsterAI** | 0 | 13 | 1 | 🔥🔥 | 🌟🌟 | ⭐⭐⭐ |
| **Moltis** | 3 | 1 | 0 | 🔥 | 🌟 | ⭐⭐ |
| **CoPaw** | 29 | 50 | 2 | 🔥🔥🔥🔥 | 🌟🌟🌟🌟 | ⭐⭐⭐⭐ |
| **GoClaw** | 1 | 5 | 0 | 🔥 | 🌟 | ⭐⭐ |
| **Hermes-Agent** | 18 | 50 | 0 | 🔥🔥🔥🔥🔥 | 🌟🌟🌟🌟 | ⭐⭐⭐ |

### Chỉ số nổi bật:

**🏆 Velocity Champion**: Hermes-Agent (30 PRs merge trong 24h)

**🏆 Community Engagement**: OpenClaw (272 issues, 32 comments/issue peak)

**🏆 Stability Leader**: LobsterAI, NanoClaw (có official releases)

**🏆 Enterprise Ready**: IronClaw (Projects system), Zeroclaw (skills platform)

---

## 🎯 3. Vị thế của OpenClaw

### Định vị chiến lược

**OpenClaw là "Linux kernel" của AI agent ecosystem** - không phải về market share mà về **architectural influence và community governance**.

#### Điểm mạnh:

**A. Community Leadership (Diamond 💎)**
- **272 open issues** với high-quality discussions (32 comments peak)
- **500 PRs** - khối lượng contribution lớn nhất ecosystem
- **Feature request culture**: Masked secrets (#10659), tiered bootstrap (#22438) là industry-leading ideas
- **Transparent roadmap**: SQLite migration (#88838) được track công khai với 30 comments

**B. Technical Depth**
- **Plugin externalization** (GMI provider #94350) - pioneering modular architecture
- **QA Lab evidence system** (#94283) - unique trong ecosystem về testing transparency
- **Message delivery hardening** - addressing edge cases không dự án nào khác prioritize (multi-chunk WhatsApp #93823)

**C. Production Battle-Tested**
- Issues như Codex OAuth wedging (#86215), context compaction bugs (#94328) cho thấy **real production usage at scale**
- Complexity của bugs (credential scoping #94106) phản ánh **mature deployment scenarios**

#### Điểm yếu:

**A. Release Velocity** ❌
- **0 releases** trong 24h vs NanoClaw (2), LobsterAI (1), CoPaw (2)
- Stuck ở **v2026.6.x beta** - chưa confidence ship stable
- **Contrast**: Competitors ship fast, iterate in production

**B. Windows Support Gap** ⚠️
- Không có explicit Windows fixes trong 24h
- **Contrast**: Hermes-Agent có 7 Windows PRs, NanoBot có proxy fixes cho local servers
- Risk mất enterprise Windows users

**C. Developer Onboarding** 📚
- Setup complexity barriers (nhiều P0 issues về OAuth, credential handling)
- **Contrast**: Moltis có user-friendly wizard requests (#4376), LobsterAI có computer use với low friction

### So sánh trực tiếp:

| Aspect | OpenClaw | IronClaw | Hermes-Agent | CoPaw |
|--------|----------|----------|--------------|-------|
| **Architecture** | Plugin-first, modular | Collaborative, Projects | Gateway-centric | Dual-mode (simple/advanced) |
| **Target User** | Power users, developers | Teams, enterprises | CLI-first devs | Chinese market + researchers |
| **Innovation** | QA Lab, plugin ecosystem | Multi-user workflows | 30 PRs/day velocity | ChromaDB integration, agentic reasoning |
| **Stability** | Beta stuck | Production features | Bugfix storm | v2.0 transition |
| **Community** | Public governance | Growing contributors | International, diverse | Academic + enterprise hybrid |

---

## 🔧 4. Hướng kỹ thuật chung

### Mega-trends xuyên suốt ecosystem:

#### A. **Plugin Architecture Revolution** 🔌

**Adopters**: OpenClaw (GMI #94350), Zeroclaw (WASM #7822), IronClaw (skill externalization)

**Pattern**:
```
Monolithic Agent → Provider Plugins → Skill Plugins → Tool Plugins
```

**Drivers**:
- Reduce core complexity
- Enable community marketplace (ClawHub, npm packages)
- Versioning independence
- Security isolation

**OpenClaw leadership**: Pioneering với GMI externalization, ClawHub validation, shrinkwrap patterns

---

#### B. **Context Window Crisis Management** 📏

**Universal pain point**: Mọi dự án đều có context-related bugs

**Solutions emerging**:

| Dự án | Approach | Status |
|-------|----------|--------|
| OpenClaw | Tiered bootstrap loading (#22438) | RFC stage |
| NanoBot | Context window per fallback model (#4389) | Requested |
| LobsterAI | Post-compaction continuity (#2145) | Shipped v2026.6.15 |
| IronClaw | Byte budget for read_file (#5029) | Merged |
| Hermes-Agent | Context length lookup fixes (#47881) | PR open |

**Insight**: Không còn là "ship model với bigger context" - cần **architectural solutions** (compression, tiering, budgets)

---

#### C. **Multi-Channel Delivery Complexity** 📱

**The hard problem**: Reliable message delivery across WhatsApp, Slack, Feishu, WeChat, QQ...

**Common issues**:
- Multi-chunk splitting (OpenClaw #93823, NanoBot #4381)
- Markdown stripping (Hermes-Agent #48165, OpenClaw #87449)
- Media handling (GoClaw Bitrix24 #1236, PicoClaw OneBot #3140)
- OAuth refresh cycles (IronClaw #5051, OpenClaw #86215)

**No silver bullet yet** - mỗi dự án đang learn the hard way

**OpenClaw advantage**: Extensive channel portfolio với deep fixes, nhưng **maintenance burden tăng nhanh**

---

#### D. **Security Hardening Wave** 🔐

**2026 is "The Year of CVEs"**:

| Dự án | Security Issue | Severity |
|-------|----------------|----------|
| PicoClaw | SSRF trong OneBot (#3140) | Critical |
| NanoClaw | Path traversal CVE-2026-29611 (#2799, #2800) | Critical |
| Zeroclaw | SSRF in http_request (#7902) | High |
| OpenClaw | Secret scoping bug (#94106) | High |
| IronClaw | Relay auth needed (#5051) | Medium |

**Pattern**: Moving từ "trust everything" sang **zero-trust internal architecture**

**Best practices emerging**:
- Input validation at all boundaries
- Path canonicalization
- Secret masking (#10659 OpenClaw request)
- SSRF guards (DNS pinning, localhost blocks)

---

#### E. **The MCP Standardization** 🤝

**MCP (Model Context Protocol)** đang trở thành **de facto standard** cho tool integration:

- **Hermes-Agent**: Per-user MCP tools fix (#1235)
- **Moltis**: MCP dashboard planned (v0.8.3)
- **NanoBot**: MCP streamableHttp crashes (#4303)
- **IronClaw**: MCP preset for Globalping (#4383)

**Impact**:
- Reduced reinvention
- Interoperability (OpenClaw config migration #5276)
- Ecosystem effects (shared tooling, docs)

**Risk**: MCP governance still unclear - who controls spec evolution?

---

## 🎨 5. Điểm khác biệt

### A. **Chiến lược sản phẩm**

#### **OpenClaw**: "The Linux Distro"
- **Philosophy**: Community-driven, transparent governance, plugin marketplace
- **Differentiation**: QA Lab transparency, public roadmap (SQLite migration)
- **Trade-off**: Slow releases, consensus overhead
- **Target**: Developers who want to **inspect and modify everything**

#### **IronClaw**: "The GitHub"
- **Philosophy**: Collaboration-first, multi-user workflows
- **Differentiation**: Projects system (#5015-5019 stack), permission model
- **Trade-off**: Complexity for single users
- **Target**: Teams needing **shared agent workspaces**

#### **Hermes-Agent**: "The Arch Linux"
- **Philosophy**: Bleeding edge, maximum flexibility, CLI-first
- **Differentiation**: 30 PRs/day velocity, supports everything (50 channels?)
- **Trade-off**: Stability issues, Windows broken, bugs everywhere
- **Target**: Power users who **live in terminal** và willing to fix bugs

#### **CoPaw/QwenPaw**: "The Red Hat"
- **Philosophy**: Research-backed, enterprise features, Chinese market
- **Differentiation**: Agentic reasoning, ChromaDB integration, Qwen models
- **Trade-off**: Complexity, crashes (macOS #5243)
- **Target**: Chinese enterprises, researchers

#### **LobsterAI**: "The Cursor"
- **Philosophy**: Coding-specific, IDE integration, productivity
- **Differentiation**: Computer Use, realtime voice, Cowork mode
- **Trade-off**: Narrow focus (coding only)
- **Target**: Developers coding **with AI, not managing AI**

---

### B. **Tính năng đặc trưng**

#### **Unique to OpenClaw**:
- ✅ **QA Lab Evidence Gallery** (#94283) - testing transparency chưa từng có
- ✅ **Tiered Bootstrap Loading** (#22438) - giải quyết context bloat elegantly
- ✅ **Masked Secrets** request (#10659) - security-first credential handling
- ✅ **Provider plugin scaffolding** (#94352) - complete developer toolkit

#### **Unique to IronClaw**:
- ✅ **Projects System** (5-part stack) - multi-tenant collaboration done right
- ✅ **Filesystem Viewer** (#5057) - transparency về agent file operations
- ✅ **Self-hosted assets** (#5024) - eliminating CDN dependencies

#### **Unique to LobsterAI**:
- ✅ **Computer Use** (#2143) - Anthropic Claude-like desktop automation
- ✅ **Realtime ASR Voice Input** (#2148) - hands-free coding
- ✅ **Post-compaction Context Continuity** (#2145) - graceful context degradation

#### **Unique to CoPaw**:
- ✅ **Simple Mode** - flattened navigation for casual users
- ✅ **Per-Turn Token Counter** - granular usage tracking
- ✅ **Wide Mode Toggle** - adaptive layout

#### **Unique to Hermes-Agent**:
- ✅ **Relay Authentication** (#48147) - connector-gateway security
- ✅ **System Tray Support** (#48163) - desktop integration
- ✅ **Auto-Queue Mode** request (#13072) - CLI UX innovation

---

### C. **Phong cách cộng đồng**

#### **OpenClaw: Democratic & Verbose**
- 32 comments trên single issue (#25592)
- RFC culture (masked secrets, compression, tiered loading)
- Public tracking issues (SQLite migration #88838)
- **Vibe**: "Let's discuss every detail"

#### **IronClaw: Structured & Professional**
- Clean PR structure (5-part Projects stack)
- Labeled priorities (P0/P1/P2)
- Test coverage mentions
- **Vibe**: "Enterprise-grade process"

#### **Hermes-Agent: Chaotic & Fast**
- 30 PRs/day, 3 duplicate ComfyUI fixes
- International contributors (Chinese, Thai names)
- Bugs everywhere, fix fast, ask questions later
- **Vibe**: "Move fast, fix faster"

#### **CoPaw/QwenPaw: Academic & Polished**
- Detailed release notes
- Integration test suites (64 cases #5270)
- Chinese-language primary, English secondary
- **Vibe**: "Research rigor meets product"

#### **LobsterAI: Internal & Closed**
- No external contributors visible
- Same-day PR merge (no discussion)
- Feature drops without RFCs
- **Vibe**: "Stealth startup mode"

---

## 👥 6. Mức độ trưởng thành cộng đồng

### Phân tầng maturity:

#### **Tier 1: Mature Ecosystems** ⭐⭐⭐⭐⭐

**OpenClaw**
- ✅ 500 PRs, 272 issues - massive contribution pipeline
- ✅ Public governance (RFCs, tracking issues)
- ✅ Multiple maintainers visible
- ✅ External plugin ecosystem forming (GMI externalization)
- ❌ Slow decision-making (SQLite migration 30 comments, no progress)

**IronClaw**
- ✅ First-time contributor labels (9 PRs)
- ✅ Clear architecture docs (inferred từ 5-part stack)
- ✅ Growing international community
- ❌ Review bottleneck (7% merge rate)

**CoPaw/QwenPaw**
- ✅ 50 PRs active, academic backing (Qwen team)
- ✅ Integration test culture (64 cases)
- ✅ Dual-language support (Chinese + English)
- ❌ Platform issues hurt adoption (macOS crash #5243)

---

#### **Tier 2: Growing Communities** ⭐⭐⭐

**Hermes-Agent**
- ✅ 30 PRs/day velocity - extremely active
- ✅ International contributors (diverse geography)
- ✅ Quick issue response
- ❌ Duplicate work (3 ComfyUI PRs)
- ❌ Lack of coordination (needs PR signaling)

**NanoBot**
- ✅ 17 PRs merged trong 24h - responsive maintainers
- ✅ Fast bug turnaround (vài giờ)
- ❌ Small community (9 issues total)
- ❌ Mostly single-maintainer activity

**Zeroclaw**
- ✅ RFC culture (WASM hooks #7822, compression #7673)
- ✅ Security-conscious (CI hardening #7675)
- ❌ Windows support lagging (74 test failures #7462)
- ❌ v0.9 breaking changes risk churn

**NanoClaw**
- ✅ 2 releases trong 24h - good cadence
- ✅ Breaking changes well-documented
- ❌ Small issue count (5) - limited feedback loop
- ❌ Security response transparency unclear (#5234 closed without details)

---

#### **Tier 3: Early Stage** ⭐⭐

**PicoClaw**
- ✅ Security responsiveness (SSRF fix 8 days)
- ❌ Very small community (4 issues, 10 PRs)
- ❌ Nhiều PRs stale (#3092, #3093)
- ❌ Limited contribution diversity

**LobsterAI**
- ✅ Polished releases (v2026.6.15 feature-rich)
- ❌ Zero external contributions visible
- ❌ No public discussions
- ❌ Likely closed beta or internal product

**GoClaw**
- ✅ Enterprise focus (Bitrix24 investment)
- ❌ Minimal community engagement (1 issue, 5 PRs)
- ❌ No reactions/comments on issues
- ❌ Possible enterprise/internal development

**Moltis**
- ✅ Users filing quality bug reports (preflight checklist)
- ❌ Very small activity (3 issues, 1 PR)
- ❌ Early stage features (echo cancellation needed)
- ❌ Limited contributor base

---

### Indicators of community health:

| Metric | OpenClaw | IronClaw | Hermes-Agent | CoPaw | Others |
|--------|----------|----------|--------------|-------|--------|
| **External Contributors** | ✅✅✅ | ✅✅ | ✅✅✅ | ✅✅ | ❌ |
| **Discussion Depth** | ✅✅✅✅ (32 comments) | ✅✅ | ✅ | ✅✅ | ❌ |
| **Documentation** | ⚠️ (out of sync) | ✅✅ | ⚠️ (gaps) | ✅✅✅ | ❌ |
| **Governance Transparency** | ✅✅✅✅ | ✅✅ | ✅ | ✅✅ | ❌ |
| **Contributor Diversity** | ✅✅✅ | ✅✅ | ✅✅✅✅ | ✅✅ | ❌ |
| **Response Time** | ⚠️ (slow decisions) | ✅✅ | ✅✅✅ (same-day) | ✅✅ | ✅ |

---

## 🔮 7. Tín hiệu xu hướng

### A. **Near-term (3-6 months)**

#### **1. Plugin Marketplace Explosion** 🔌💥

**Signals**:
- OpenClaw GMI externalization (#94350)
- Zeroclaw WASM hooks RFC (#7822)
- IronClaw skill plugins emerging
- MCP standardization across projects

**Prediction**: 
- **Q3 2026**: ClawHub/npm-equivalent cho AI agent plugins
- **Competition**: OpenClaw vs Zeroclaw cho plugin standard
- **Winners**: Projects với best DX (scaffolding, docs, discovery)

**Investment thesis**: Plugin authors trở thành kingmakers - whoever captures mindshare wins

---

#### **2. Context Window Arms Race Pivot** 📏🔄

**Signals**:
- Tiered bootstrap (OpenClaw #22438)
- Byte budgets (IronClaw #5029)
- Post-compaction continuity (LobsterAI #2145)
- Context per model (NanoBot #4389)

**Prediction**:
- **Shift**: Từ "bigger context" sang "smarter context management"
- **Techniques**: Compression, tiering, selective loading, RAG integration
- **Standard emerges**: Whoever solves this elegantly sets pattern

**Risk**: LLM vendors (OpenAI, Anthropic) may release "infinite context" và make này obsolete

---

#### **3. Windows Reckoning** 🪟⚠️

**Signals**:
- Hermes-Agent: 7 Windows PRs trong 24h
- OpenClaw: Thiếu Windows fixes
- CoPaw: macOS crashes, Windows issues ignored
- Zeroclaw: 74 Windows test failures (#7462)

**Prediction**:
- **Q3 2026**: Enterprise adoption blocked by Windows issues
- **Winner take all**: First project với stable Windows support captures corporate market
- **Strategy**: Hermes-Agent đang lead nhưng quality questionable; OpenClaw có opportunity nếu act fast

**Enterprise POV**: "Linux-only = non-starter" for 80% IT departments

---

#### **4. Security Becomes Differentiator** 🔐

**Signals**:
- CVE wave: PicoClaw, NanoClaw, Zeroclaw
- Secret masking requests (OpenClaw #10659)
- Relay auth (Hermes-Agent #48147)
- Sandbox policies (Zeroclaw #7821)

**Prediction**:
- **By Q4 2026**: Security audit becomes mandatory for enterprise adoption
- **Certification**: SOC2, ISO27001 for hosted agent services
- **Feature**: Built-in security scanning, SBOM generation (Zeroclaw #7675)

**OpenClaw advantage**: Transparent QA Lab could extend to security transparency

---

### B. **Medium-term (6-12 months)**

#### **5. Multi-Agent Orchestration Standards** 🤖🤝

**Signals**:
- IronClaw Projects system (multi-user)
- OpenClaw sub-agent features (#27445 announceTarget)
- NanoClaw agent approval policies (#2793)
- A2A discovery (Zeroclaw #7763)

**Prediction**:
- **Late 2026**: Multi-agent workflows go mainstream
- **Protocol**: Agent-to-Agent communication standard emerges (beyond MCP)
- **Use cases**: Specialized agents (coding, research, design) collaborate on complex tasks

**Critical question**: Will này be **proprietary** (vendor lock-in) or **open standard**?

---

#### **6. Voice-First Interaction Breakthrough** 🎤

**Signals**:
- LobsterAI realtime ASR (#2148)
- Moltis voice focus (TTS format config #1126)
- Echo cancellation needs (Moltis #1129)
- Voice input bugs (NanoBot #4362)

**Prediction**:
- **2027**: Voice becomes **primary input** for AI agents (not secondary)
- **Driver**: Hands-free coding, mobile usage, accessibility
- **Technical barrier**: Echo cancellation, low latency, multilingual ASR

**Risk**: Proprietary voice models (OpenAI Whisper, ElevenLabs) may create walled gardens

---

#### **7. Collaborative AI Workspaces** 👥💼

**Signals**:
- IronClaw Projects (#5015-5019)
- CoPaw session filter, wide mode
- OpenClaw multi-user considerations
- LobsterAI Cowork mode

**Prediction**:
- **2027**: "Google Docs for AI agents" - real-time collaborative agent sessions
- **Features**: Shared context, permission models, activity streams
- **Market**: Teams > individuals (higher ARPU)

**IronClaw leadership**: Already shipping this vision

---

### C. **Long-term (12+ months)**

#### **8. Autonomous Agent Reliability Crisis** ⚠️🤖

**Signals**:
- Execution loop bugs (CoPaw #4967)
- Context compaction freezes (OpenClaw #5218, CoPaw #5218)
- No-progress detection redesigns (IronClaw #4993)
- Agent rename race conditions (Zeroclaw #7907)

**Prediction**:
- **2027+**: "Autonomous agent reliability" trở thành hard problem như distributed systems
- **Tooling**: Agent debuggers, replay systems, formal verification
- **Research**: Academic focus shifts từ "can agents X?" sang "can we **trust** agents to X?"

**Insight**: Hiện tại agent failures = "restart và try again". Trong production = unacceptable.

---

#### **9. Regulation & Compliance Wave** 📜⚖️

**Signals**:
- Security CVEs increasing
- Enterprise adoption questions
- Data privacy concerns (voice, file access)
- Prompt injection attacks (NanoClaw #5234)

**Prediction**:
- **2027**: AI Agent-specific regulation (EU AI Act enforcement)
- **Requirements**: Audit logs, explainability, kill switches, human-in-loop
- **Compliance**: GDPR for agent data, transparency requirements

**Strategic**: Projects building compliance features now will dominate enterprise by 2028

---

#### **10. The "iPhone Moment" for AI Agents** 📱✨

**Signals**:
- LobsterAI Computer Use
- Voice-first interaction improving
- Mobile gaps (iOS Safari zoom #4388, Android APK requests #9443)
- Cross-platform pain

**Prediction**:
- **2027-2028**: AI agent trở thành **consumer product** (không chỉ developer tool)
- **Catalyst**: Apple/Google integrate agent OS-level hoặc killer standalone app
- **Disruption**: Current projects become "Android pre-iPhone" - established but vulnerable

**OpenClaw risk**: Too developer-focused, miss consumer wave

---

## 🎯 Kết luận chiến lược

### **OpenClaw: Path Forward**

#### **Immediate actions (Q3 2026)**:

1. **Ship stable release** ❗
   - Exit beta prison (v2026.6.x → v2026.7.0 stable)
   - SQLite migration (#88838) cần decisive action, không phải endless discussion
   - **Cost of delay**: Users adopt competitors với stable releases

2. **Windows first-class support** 🪟
   - Dedicate sprint cho Windows compatibility
   - Match Hermes-Agent velocity (7 fixes/day)
   - **Market opportunity**: Enterprise waiting cho stable Windows support

3. **Plugin marketplace MVP** 🔌
   - Ship GMI externalization (#94350)
   - ClawHub discovery + installation flow
   - **First-mover advantage**: Define plugin standards trước Zeroclaw

4. **Security transparency** 🔐
   - Extend QA Lab sang security evidence
   - Public CVE process
   - **Differentiation**: Trust through transparency

#### **Strategic bets (12 months)**:

1. **Multi-agent orchestration** 🤝
   - Build on sub-agent foundations (#27445)
   - Agent-to-Agent protocol proposal
   - **Vision**: "Kubernetes for AI agents"

2. **Context management leadership** 📏
   - Ship tiered bootstrap (#22438)
   - Research: Native compression (#7673)
   - **Goal**: Set industry pattern cho context handling

3. **Enterprise readiness** 💼
   - Audit logs, compliance features
   - Multi-tenant architecture
   - **Target**: Fortune 500 by 2027

4. **Community governance** 🗳️
   - Formalize RFC process
   - Public roadmap votes
   - **Culture**: Maintain "Linux kernel" positioning

---

### **Competitive positioning**:

**OpenClaw should be:**
- ✅ **The standard**: Like Linux, not the most popular but most influential
- ✅ **The platform**: Enable ecosystem, không compete với plugins
- ✅ **The transparent option**: QA Lab, security evidence, public governance
- ✅ **The mature choice**: Stability over bleeding edge

**OpenClaw should NOT try to be:**
- ❌ **Fastest (Hermes-Agent)**: Sacrifice quality cho velocity
- ❌ **Simplest (LobsterAI)**: Over-simplify và limit power users
- ❌ **Enterprise-only (IronClaw)**: Lose developer community
- ❌ **Research project (CoPaw)**: Slow, academic, niche

---

### **Final insight**:

Hệ sinh thái AI agent năm 2026 giống **Linux distro wars 2000s**: 
- Nhiều projects
- Fragmentation cao
- Chưa rõ ai thắng
- Standards chưa settle

**OpenClaw opportunity**: Trở thành **Debian/Ubuntu** của AI agents - stable, community-driven, influential.

**OpenClaw risk**: Trở thành **Gentoo** - powerful nhưng chỉ hardcore users care.

**Deciding factor**: Ship velocity trong 6 tháng tới. Discussion culture is strength AND weakness - cần balance giữa democracy và decisiveness.

🎯 **Success = Plugin ecosystem thriving + Enterprise adoption + Developer love.**

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích hoạt động NanoBot - 18/06/2026

## 📋 Tóm tắt hôm nay

Ngày 18/06 ghi nhận hoạt động đóng góp cực kỳ mạnh mẽ với **17 PRs được merge** trong vòng 24 giờ, tập trung vào sửa lỗi và cải thiện trải nghiệm người dùng. Các vấn đề quan trọng được giải quyết bao gồm workspace filesystem safety, Feishu streaming recovery, và proxy configuration cho local model servers. Cộng đồng tiếp tục đề xuất các tính năng mới như multi-tenant gateway và script-based automation.

## 🚀 Releases

Không có release chính thức trong 24 giờ qua.

## 📊 Tiến độ dự án

### PRs đã merge (17 PRs)

**🔒 Security & Workspace Safety**
- **#4380**: Cho phép git commands trong workspace subdirectories - khắc phục lỗi shell safety guard chặn commands hợp lệ trong workspace con
- **#4053**: Giữ read-only roots ngoài write paths - tách biệt quyền đọc/ghi cho filesystem tools
- **#4202**: Làm rõ workspace write policy - alignment giữa `apply_patch` và existing access policy

**🌐 Channel & Integration Fixes**
- **#4381**: Recovery cho failed Feishu streaming updates - retry logic và fallback cho blank cards
- **#4354**: Gửi read receipts (blue ticks) cho WhatsApp messages
- **#4364**: Fix WebUI stuck trên LAN devices với Vite dev server
- **#4367**: Disable proxy cho local endpoints, respect env proxy cho cloud - giải quyết vấn đề Ollama/vLLM không hoạt động với HTTP_PROXY

**🤖 Model Provider Improvements**
- **#4351**: Better Mistral support - xử lý đúng `reasoning_effort` và max_tokens validation
- **#4356**: Sanitize Anthropic tool IDs theo API pattern `^[a-zA-Z0-9_-]+$`
- **#4385**: Log primary model error trước khi fallback
- **#4350**: Thêm Keenable search provider

**🎨 WebUI & UX**
- **#4283**: Sửa activity duration display trong WebUI
- **#4347**: Fix my tool model preset switching
- **#4346**: Đánh dấu stripped images là "unviewable" thay vì leak path

**🧹 Internal Improvements**
- **#4386**: Silence unroutable CLI progress noise
- **#4349**: Preserve user turns trong replay-window history
- **#4384**: Ignore `.nanobot/` runtime artifacts trong git

### PRs đang active (13 PRs)

**🔥 High-impact PRs**
- **#4313**: WebUI/config.json settings parity - đồng bộ WebUI settings với config file
- **#4387**: Fallback to default memory bootstrap cho project workspaces
- **#4303**: Fix MCP streamableHttp GC crash
- **#4373**: Preserve delivery context during consolidation

**✨ New Features**
- **#4391**: Feishu QR scan-to-create bot login - device-code flow cho mobile registration
- **#4383**: Thêm Globalping MCP preset cho network measurement
- **#4393**: Test coverage cho git commands trong subdirectories
- **#4392**: Làm tool microcompaction configurable

**🐛 Bug Fixes**
- **#4021**: Dedup reasoning items trước khi send tới OpenAI Codex
- **#4321**: Advance dream cursor khi Dream disabled để tránh prompt bloat

## ⭐ Điểm nổi bật cộng đồng

**Issues có nhiều tương tác:**

1. **#4376** (1 👍): User-friendly wizard - đề xuất cải thiện `nanobot onboard --wizard` cho non-technical users
2. **#4360** (CLOSED): "end of file unexpected" lỗi installer trên Debian Docker container - đã được giải quyết

**Vấn đề người dùng quan tâm:**
- Configuration và setup experience cho người dùng mới
- Multi-instance management (normies-friendly approach)
- Mobile experience (iOS Safari input zoom issue #4388)
- Model switching và preset configuration

## 🔧 Ổn định & Bugs

### Đã khắc phục:
- ✅ Git commands bị chặn trong workspace subdirectories
- ✅ Feishu streaming cards thất bại và để lại blank cards
- ✅ Local model servers (Ollama, llama.cpp) bị proxy block
- ✅ Mistral API strict validation errors
- ✅ WebUI stuck trên LAN access với Vite dev
- ✅ Anthropic tool ID format rejection

### Đang xử lý:
- 🔄 MCP streamableHttp crash khi server reconnect (#4303)
- 🔄 Dream cursor không advance khi disabled (#4321)
- 🔄 iOS Safari input zoom issue (#4388)
- 🔄 Context window không trim cho fallback models (#4389)

## 💡 Yêu cầu tính năng

**Infrastructure & Operations:**
- **Multi-tenant gateway** (#936): Single gateway instance quản lý multiple agents từ một config file
- **Script-based automation** (#4382 - merged): Triggers ngoài cron để integrate với external systems

**Developer Experience:**
- **User-friendly wizard** (#4376): Simplified onboarding cho non-technical users
- **Multi-instances for normies** (#4390): Folder-based multi-instance với separate configs
- **Cron-level model/preset** (#4378): Model switching per cron job

**Debugging & Monitoring:**
- **On-demand heartbeat trigger** (#3437): Manual trigger cho heartbeat debugging
- **Per-model contextWindowTokens** (#4389): Fine-grained context window cho từng fallback model

## 👥 Phản hồi người dùng

**Positive signals:**
- Community đang active đóng góp fixes (17 PRs merged trong ngày)
- Các vấn đề được phản hồi và resolve nhanh (vài giờ đến 1 ngày)
- Đa dạng contributors từ các múi giờ khác nhau

**Pain points:**
- Setup complexity cho người dùng mới (technical barrier cao)
- Multi-instance management chưa smooth
- Mobile experience cần improvement
- Proxy configuration gây confusion với local models

**Emerging needs:**
- Simplified configuration management
- Better multi-instance orchestration
- Enterprise features (multi-tenancy)
- Automation flexibility ngoài cron

## 🗓️ Backlog & Roadmap

**Short-term focus (từ PR activity):**
- Hoàn thiện WebUI/config.json parity (#4313)
- Stability fixes cho MCP và memory systems
- Mobile experience improvements
- Test coverage expansion

**Medium-term opportunities:**
- Multi-tenant architecture (#936)
- Enhanced automation framework (đã merge script triggers)
- Simplified onboarding flow (#4376)
- Better model configuration flexibility

**Community-driven evolution:**
Dự án đang trong giai đoạn maturity với focus chuyển từ core features sang polish, UX, và enterprise readiness. Tốc độ merge PRs cao (17/ngày) cho thấy maintainers active và responsive, tạo môi trường tốt cho community contributions.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo phân tích dự án Zeroclaw - 2026-06-18

## 📊 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn chuẩn bị phát hành v0.8.2 với trọng tâm vào **skills platform** và **WASM plugins**. Ngày hôm nay ghi nhận hoạt động tích cực với **7 PR được merge** (chủ yếu từ stack delete-cascade và config refactor), cùng nhiều bản sửa lỗi quan trọng về cron jobs, canvas store, và Windows compatibility. Dự án đang tập trung xử lý các vấn đề ổn định trước khi tung các tính năng lớn.

## 🚀 Releases

**Không có release chính thức trong 24 giờ qua**, nhưng dự án đang chuẩn bị cho:
- **v0.8.2**: Skills platform + WASM plugin infrastructure (#7852, #7314)
- **v0.8.3**: MCP dashboard và web management surfaces (#7320)
- **v0.9.0**: Authentication, security hardening, breaking changes (#7432)

## 🎯 Tiến độ dự án

### PRs đã merge hôm nay (7 PRs)

**✅ Stack config refactor hoàn thành** - Chuỗi 8 PR về delete-cascade và rename functionality:
- #7839: Channel delete cascade
- #7840: Aliased entry rename với cascade
- #7841: Agent owned-state rename cascade + cron/memory handling
- #7842: CLI CRUD commands cho agents/providers/channels

**✅ Bản sửa lỗi quan trọng:**
- #7678: Sửa canvas store regression trong WebSocket chat (#7563)
- #7684: Hiển thị history-pruner và turn-cancel như system events
- #7754: Tối ưu docs publishing (giảm kích thước clone)
- #7793: Sửa doctor validation cho custom providers

### PRs đang hoạt động (23 PRs mở)

**🔥 Ưu tiên cao:**
- #7893: Persist manual cron trigger results - đang review
- #7901: Bound repeated shell approval loops - ngăn infinite loops
- #7902: Pin http_request to vetted DNS - bảo mật SSRF
- #7903: Replay ACP session history - sửa session replay bug
- #7909: Fix Groq native tool calling (missing `name` field)

**🛠️ Tính năng mới:**
- #7844: Discord typed slash commands + chunked responses
- #7763: A2A agent discovery surface (cho v0.8.2)
- #7833: Discord rich embeds từ `[EMBED:{...}]` markers
- #7098: Mattermost WebSocket listener mode (thay thế polling)

**🧪 Infrastructure:**
- #7853: Sửa Windows self-update (broken do file locking)
- #7821: Sandbox policy config schema
- #7492: Cached input token pricing từ OpenAI-compatible APIs

## 💬 Điểm nổi bật cộng đồng

### Issues được chú ý:

**🔴 P1 - Blocking:**
- #7907 (NEW): **Agent rename có thể move state trước khi persist config** - race condition nghiêm trọng
- #7462: **74 test failures trên Windows** - Unix-only commands, path issues
- #7563 (CLOSED): Canvas store regression đã được sửa

**📋 RFCs quan trọng:**
- #7673: **Native context compression** như provider pipeline decorator (3 comments)
- #7675: **Hardened CI pipeline** với supply-chain scanning và SBOM
- #7822: **WASM plugin lifecycle hooks** - cho phép plugins subscribe vào agent events

**📊 Trackers hoạt động:**
- #6970: v0.8.1 integration queue (channels/providers/tools)
- #7852: v0.8.2 skills platform (mới tạo)
- #7432: v0.9.0 auth & security queue

## 🐛 Ổn định & Bugs

### Bugs đang sửa hôm nay:

**Đã sửa:**
- ✅ Canvas store không hoạt động trong WebSocket sessions (#7678)
- ✅ Custom provider validation trong doctor (#7793)
- ✅ History pruner không hiển thị rõ trong UI (#7684)

**Đang xử lý:**
- 🔧 Windows self-update broken (file locking) - PR #7853
- 🔧 Groq tool calling rejection do thiếu `name` field - PR #7909
- 🔧 Browser tool snapshot returns null under WebDriver - PR #7908
- 🔧 Agent rename race condition (#7907) - chưa có PR
- 🔧 74 Windows test failures (#7462) - chưa fix

### Vấn đề bảo mật:

- 🔒 SSRF vulnerability trong http_request tool - đang fix (#7902)
- 🔒 Shell approval loops có thể spam operator - đang fix (#7901)
- 🔒 RFC cho supply-chain scanning pipeline (#7675)

## ✨ Yêu cầu tính năng

### Tính năng được đề xuất:

**Config & Runtime:**
- #7887: **Date-range conditional schedules** cho cron jobs
- #7897: **Zero-downtime config reload** cho security policy
- #7883: **Fallback notices** cho intra-family provider switching

**Developer Experience:**
- #7822: WASM plugin lifecycle hooks (RFC accepted)
- #7673: Native context compression (RFC đang thảo luận)
- #6653: Host-architecture policy cho emulated installs

**Channel improvements:**
- #7098: Mattermost WebSocket mode (thay polling) - PR đang review
- #7844: Discord slash commands với typed options - PR đang review
- #7833: Discord rich embeds - PR đang review

## 📣 Phản hồi người dùng

### Feedback tích cực:
- Stack delete-cascade PRs cho thấy team đang xử lý technical debt nghiêm túc
- Config refactor giúp CRUD operations nhất quán hơn

### Pain points:
- **Windows support vẫn yếu**: 74 test failures, self-update broken
- **Canvas tool regression** gây frustration (đã sửa)
- **Git operations error messages** thiếu context (#7835)
- **CLI secret prompts** không có visual feedback (#7856)

### Developer concerns:
- Context compression cần native support (RFC #7673)
- WASM plugin ecosystem cần lifecycle hooks (#7822)
- CI security scanning chưa đủ mạnh (#7675)

## 🗺️ Backlog & Roadmap

### v0.8.2 (Skills Platform) - Target: Sắp tới
**Scope:**
- ✅ Config refactor stack (merged hôm nay)
- 🚧 A2A agent discovery (#7763)
- 🚧 Discord slash commands (#7844)
- 📋 WASM plugin infrastructure (#7314)
- 📋 Skills + plugins cohesive surface (#7852)

### v0.8.3 (MCP Dashboard)
- 📋 MCP dashboard (#7320)
- 📋 Web/ZeroCode plugin management
- 📋 Plugin-management surfaces

### v0.9.0 (Auth & Security) - Breaking changes
- 📋 Authentication system (#7432)
- 📋 Per-principal authorization
- 📋 Security hardening
- 📋 Gateway/RPC boundaries

### Technical debt:
- 🔴 **P1**: Windows test failures (#7462)
- 🔴 **P1**: Agent rename race condition (#7907)
- 🟡 **P2**: 74 Windows-specific test failures cần systematic fix
- 🟡 **P2**: CI security hardening (#7675)

---

## 📈 Xu hướng quan sát

1. **Chất lượng code đang được ưu tiên**: 7 PRs merge từ stack refactor cho thấy team đầu tư vào architecture
2. **Windows support đang được cải thiện**: Multiple PRs addressing Windows-specific issues
3. **Security mindset tăng**: SSRF fixes, sandbox policies, CI hardening RFCs
4. **Skills ecosystem đang hình thành**: WASM hooks, A2A discovery, typed commands
5. **Performance optimization**: Context compression RFC, docs size reduction

**Rủi ro cần theo dõi:**
- Agent rename race condition (#7907) là P1 blocker mới
- Windows stability vẫn là điểm yếu lớn
- Context window management chưa có giải pháp production-ready

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích Hệ Sinh Thái AI Agent - PicoClaw
## Ngày 18/06/2026

---

## 🎯 Tóm tắt hôm nay

Ngày 18/06 đánh dấu một đợt sóng sửa lỗi và cải thiện bảo mật mạnh mẽ cho PicoClaw. Dự án đã đóng 5 PR trong ngày, tập trung chủ yếu vào việc xử lý lỗ hổng bảo mật SSRF nghiêm trọng trong OneBot gateway, khắc phục vấn đề tương thích với Gemini 3.5 Flash, và cải thiện độ tin cậy của các công cụ tìm kiếm web. Ngoài ra, một PR về tích hợp DeltaChat đang được xem xét, cho thấy nỗ lực mở rộng khả năng kết nối của nền tảng.

---

## 🚀 Releases

Không có release chính thức nào được phát hành trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### 🔧 Pull Requests hoàn thành (5 PR đã đóng)

**Bảo mật - Ưu tiên cao:**
- **#3140**: Chặn lỗ hổng SSRF trong OneBot gateway
  - ✅ Khắc phục lỗ hổng CVE quan trọng (#3070) cho phép attacker sử dụng media URL để fetch địa chỉ localhost/private network
  - Tái sử dụng logic bảo vệ HTTP đã có sẵn từ `web_fetch` tool
  - **Impact**: Ngăn chặn khả năng khai thác hệ thống nội bộ qua tin nhắn độc hại

**Sửa lỗi tích hợp LLM:**
- **#3136**: Hỗ trợ Gemini 3.5 Flash với Agentic reasoning
  - Đồng thời gửi cả `thoughtSignature` (camelCase) và `thought_signature` (snake_case)
  - Giải quyết vấn đề 400 Bad Request với Gemini 3.5 Flash (#3111)
  - **Insight**: API của Google có sự không nhất quán trong naming convention giữa các phiên bản model

**Cải thiện reliability:**
- **#3139**: Cập nhật regex parser cho Sogou search
  - Thích ứng với thay đổi HTML structure của Sogou (thêm quotes trong class names)
  - Minh chứng cho thách thức khi scrape dữ liệu từ các search engine thương mại

- **#2990**: Đọc đầy đủ session history cho Web UI
  - Fix bug chỉ hiển thị tin nhắn cuối cùng thay vì toàn bộ lịch sử
  - Sửa logic trong `readJSONLSession()` để không skip messages

**Tích hợp mới:**
- **#2917**: Thêm NEAR AI Cloud provider
  - Tích hợp OpenAI-compatible provider với hỗ trợ TEE (Trusted Execution Environment)
  - Mở rộng khả năng sử dụng các model từ NEAR AI Cloud catalog

### 🔄 Pull Requests đang mở (3 PR)

**Sửa lỗi quan trọng:**
- **#3142**: Ngăn duplicate messages khi spawn sub-agent hoàn thành
  - Clear `ForUser` field trong sub-turn `ToolResult`
  - Đang chờ review, có tiềm năng cải thiện UX đáng kể

- **#3141**: Thêm diagnostic logging cho Brave Search empty results
  - Giúp debug các trường hợp API trả về 200 OK nhưng không có kết quả
  - Cải thiện observability

**Code quality:**
- **#3092**: Thêm type assertion checks trong skills_install
  - Ngăn silent failures khi args không đúng type
  - Đánh dấu stale - có thể cần attention

### 🆕 Tích hợp mới đang phát triển

- **#3063**: DeltaChat gateway integration
  - Mở rộng khả năng messaging của PicoClaw
  - Đang được review, cho thấy hướng đi multi-protocol

---

## 🌟 Điểm nổi bật cộng đồng

### 📢 Issue được quan tâm nhất

**#3088 - Migrate từ libolm sang vodozemac** (2 👍, priority: high)
- **Bối cảnh**: libolm không còn được maintain và có vấn đề bảo mật
- **Đề xuất**: Chuyển sang vodozemac - thư viện thay thế chính thức
- **Tác động**: Cải thiện bảo mật và khả năng maintain lâu dài
- **Trạng thái**: Đang discussion, chưa có implementation timeline

### 🔍 Vấn đề bảo mật được phát hiện và xử lý nhanh

Issue #3070 về SSRF vulnerability được báo cáo ngày 09/06 và đã được fix + merge trong vòng 8 ngày - cho thấy team có quy trình security response tốt.

---

## 🐛 Ổn định & Bugs

### ✅ Đã khắc phục

1. **SSRF vulnerability trong OneBot** (#3140 ✓)
   - Mức độ: High severity
   - Cho phép fetch arbitrary URLs từ host network
   - Đã được patch với HTTP guard logic

2. **Gemini 3.5 Flash tool execution failure** (#3136 ✓)
   - API schema incompatibility với Agentic reasoning
   - Đã fix bằng cách hỗ trợ cả hai naming conventions

3. **Web search parser failures** (#3139 ✓)
   - Sogou HTML structure changes
   - Regex đã được cập nhật

4. **Session history display bug** (#2990 ✓)
   - Chỉ hiển thị message cuối cùng
   - Đã sửa logic đọc JSONL

### ⏳ Đang xử lý

1. **Duplicate messages từ spawn sub-agents** (#3142)
   - Fix đang chờ review
   - Ảnh hưởng UX khi sử dụng async sub-agents

2. **Brave Search silent failures** (#3141)
   - Thêm logging để debug
   - Cải thiện monitoring

---

## 💡 Yêu cầu tính năng

### 🔥 Đề xuất mới

**#3093 - SimpleX/Wire/Tox gateway integration**
- Người dùng yêu cầu hỗ trợ các privacy-focused messaging protocols
- Đánh dấu stale - chưa có phản hồi từ maintainers
- **Insight**: Cộng đồng quan tâm đến privacy và decentralization

### 🎯 Đề xuất quan trọng

**#3088 - Migration sang vodozemac**
- Priority: high
- Help wanted tag - mở cho community contributions
- Liên quan đến security foundation của project

---

## 💬 Phản hồi người dùng

### 🎭 Sentiment tổng quan

- **Tích cực**: Team responsive với security issues (8 ngày từ report đến fix)
- **Trung lập**: Một số PRs bị đánh dấu stale (#3092, #3093), có thể cần process review
- **Quan tâm**: Cộng đồng muốn mở rộng gateway support (DeltaChat, SimpleX, Tox)

### 🔑 Insights từ cộng đồng

1. **Mong muốn privacy**: Nhiều request về privacy-focused protocols (SimpleX, Tox, DeltaChat)
2. **Chất lượng code**: Contributors chú ý đến type safety và error handling
3. **Security awareness**: Community actively reporting vulnerabilities

---

## 🗓️ Backlog & Roadmap

### 🚧 Đang trong pipeline

1. **Gateway expansion**:
   - DeltaChat (#3063) - in review
   - SimpleX/Tox (#3093) - requested

2. **Security hardening**:
   - vodozemac migration (#3088) - high priority
   - Ongoing SSRF protection improvements

3. **LLM provider expansion**:
   - NEAR AI Cloud integration đã hoàn thành (#2917)

### 🎯 Xu hướng phát triển

- **Multi-protocol messaging**: Mở rộng từ các platform phổ biến sang privacy-focused protocols
- **Security-first approach**: Proactive patching và migration sang maintained libraries
- **LLM provider diversity**: Tích hợp nhiều providers, đặc biệt các giải pháp TEE-capable
- **Observability**: Tăng cường logging và diagnostic tools

### ⚠️ Technical debt

- Một số PRs bị stale cần review (#3092, #3093)
- Web scraping parsers cần monitoring thường xuyên do external changes
- Type safety improvements across codebase

---

## 📊 Số liệu hoạt động

- **PRs merged hôm nay**: 5
- **PRs đang mở**: 3 (active), 2 (stale)
- **Issues đang mở**: 2 active, 2 stale/closed
- **Security fixes**: 1 critical (SSRF)
- **Community engagement**: Moderate (2 reactions trên top issue)

---

**🎬 Kết luận**: Ngày 18/06 là một ngày productive với focus mạnh vào security và stability. Team PicoClaw thể hiện khả năng response tốt với vulnerabilities và đang mở rộng ecosystem theo hướng privacy-focused và multi-provider.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - 18/06/2026

## 1. 🎯 Tóm tắt hôm nay

NanoClaw đã có một ngày hoạt động cực kỳ sôi nổi với **19 PRs và 5 issues mới**, tập trung chủ yếu vào **bảo mật và ổn định hệ thống**. Hai phiên bản mới (v2.1.0 và v2.1.17) được phát hành với thay đổi breaking về yêu cầu upgrade marker. Đáng chú ý là phát hiện và vá ngay **lỗ hổng bảo mật nghiêm trọng CVE-2026-29611** cho phép đọc file tùy ý, cùng các sửa lỗi critical về message delivery và authentication.

## 2. 🚀 Releases

### v2.1.17 (Phát hành: 2026-06-17)
**Thay đổi BREAKING quan trọng:**
- 🔄 **Nâng cấp `@onecli-sh/sdk` từ 0.5.0 → 2.2.1**: Yêu cầu OneCLI server có API `/v1`. Các phiên bản cũ sẽ 404 mọi SDK call
- ⚠️ **Lưu ý**: Gateway là component riêng biệt, cần update thủ công - NanoClaw không tự động nâng cấp
- 📌 Versions được pin trong `versions.json` để đảm bảo tương thích

### v2.1.0 (Phát hành: 2026-06-17)
**Thay đổi BREAKING:**
- 🔐 **Startup tripwire bắt buộc**: Host từ chối boot nếu không có `data/upgrade-state.json` ghi nhận quá trình upgrade hợp lệ
- ✅ Chỉ chấp nhận upgrade qua các path chính thức: `/setup`, `/update-nanoclaw`, `/migrate-nanoclaw`
- 🛠️ Yêu cầu chạy `pnpm exec tsx scripts/upgrade-state.ts` sau update và trước restart service

**Ý nghĩa:** Đây là bước quan trọng đảm bảo tính toàn vẹn của hệ thống, ngăn chặn các upgrade không kiểm soát có thể gây lỗi hoặc bảo mật.

## 3. 📈 Tiến độ dự án

### 🔒 Bảo mật - Ưu tiên cao nhất

**Lỗ hổng critical được vá:**

- **#2799** [CVE-2026-29611] - **Path traversal trong `send_file`**: 
  - 🚨 Nghiêm trọng: Agent bị compromise có thể đọc **bất kỳ file nào** trong container (credentials, workspace mounts)
  - ✅ Fix: Giới hạn đọc file trong `/workspace`, thêm canonicalization và chặn `..`

- **#2800** [CWE-22] - **Path traversal trong group creation**:
  - 🚨 `ncl groups create --folder ../../etc` có thể escape `GROUPS_DIR`
  - ✅ Fix: Enforce folder validator trong CLI path

### 🐛 Sửa lỗi nghiêm trọng về delivery

- **#2797** (CLOSED) - **Fix delivery stall** (#2796):
  - ❌ Vấn đề: Một session lỗi **làm đình trệ toàn bộ message delivery** cho mọi agent
  - ✅ Giải pháp: Isolate per-session failures với try/catch riêng, log và tiếp tục

- **#2750** - **Stale journal recovery**:
  - 🔧 Xử lý journals bị bỏ lại sau container kill
  - 📊 Phân loại hot-journal poll races

### 🔑 Authentication & Providers

- **#2794** (CLOSED) - **Restore env-var gateway auth**:
  - ❌ v2.1.17 phá vỡ managed-fleet auth → lỗi 401 "No credentials config"
  - ✅ Khôi phục khả năng auth qua biến môi trường cho VM deployments

### 🛠️ Infrastructure & CLI

- **#2802** - **Socket timeout + response cap**: Thêm timeout và giới hạn buffer cho `SocketTransport`
- **#2801** - **Guard JSON parsing**: Xử lý primitive JSON payloads an toàn
- **#2804** - **Fix messaging-groups create**: Sửa lỗi `NOT NULL instance` khi tạo group
- **#2803** - **Remove dead code**: Dọn dẹp `resolveGroupIpcPath` không còn dùng

### ✨ Tính năng mới

- **#2793** - **Agent-to-agent approval policies**:
  - 🎯 Thêm per-message approval gate cho connected agents
  - 🔄 Backward compatible - không có policy = free flow như cũ
  - 📋 Message được hold và hiện approval card khi có policy

- **#2805** - **Fix OAuth token parsing**: Xử lý token từ PTY-wrapped output
- **#2795** - **CLI dashboard skill**: Read-only dashboard từ CLI commands

### 📚 Documentation

- **#2792, #2790, #2788, #2786** - Cải thiện SKILL.md documentation:
  - Sửa lỗi thiếu `mkdir` trong add-imessage
  - Mở rộng setup guide từ 10 dòng thành hướng dẫn đầy đủ
  - Thêm thông tin OneCLI port
  - Đổi tên H1 trong migrate-nanoclaw

- **#2717** - **Atlas Cloud integration docs**: Thêm 59 models từ Atlas Cloud

## 4. 💬 Điểm nổi bật cộng đồng

### Issues được quan tâm:

1. **#2796** - **Message delivery stall** (CLOSED nhanh):
   - 🎯 Vấn đề critical ảnh hưởng toàn bộ hệ thống
   - ⚡ Response nhanh: phát hiện và fix trong cùng ngày

2. **#2791-#2789-#2787-#2785** - **Documentation issues**:
   - 👥 User @specterslient95-lgtm báo cáo hàng loạt vấn đề về SKILL.md
   - 📝 Cho thấy documentation đang được community xem xét kỹ

### Xu hướng PR:

- **Security-first mindset**: 5/19 PRs liên quan trực tiếp đến bảo mật
- **Quick turnaround**: Nhiều PR được open và close trong cùng ngày
- **Documentation cleanup wave**: 4 PRs cùng pattern fix SKILL.md issues

## 5. 🔧 Ổn định & Bugs

### ✅ Đã giải quyết:

| Vấn đề | Mức độ | Trạng thái |
|--------|---------|-----------|
| Message delivery stall | 🔴 Critical | CLOSED |
| CVE-2026-29611 path traversal | 🔴 Critical | PR #2799 |
| Managed fleet auth broken | 🔴 Critical | CLOSED |
| Group creation crash | 🟡 High | PR #2804 |
| Token parsing PTY issue | 🟡 High | PR #2805 |

### 🔄 Đang xử lý:

- **#2750** - Journal recovery mechanism (complex, still open)
- **#2793** - Agent approval policies (feature PR, testing phase)

### 📊 Phân tích:

- **Phản ứng nhanh**: Critical bugs được fix trong < 24h
- **Breaking changes được quản lý**: Có migration path rõ ràng
- **Test coverage**: Các fix đều đi kèm tests

## 6. 🌟 Yêu cầu tính năng

### Đã implement:

1. **Agent-to-agent approval workflow** (#2793):
   - Giải quyết nhu cầu kiểm soát message flow giữa agents
   - Optional và backward compatible

2. **Managed fleet support** (#2780, #2794):
   - Opt-out upgrade tripwire cho immutable deployments
   - Env-var authentication restoration

### Emerging patterns:

- 🔐 **Security hardening**: Community và maintainers đều focus vào bảo mật
- 📦 **Managed deployment scenarios**: Nhiều tính năng cho enterprise/fleet use cases
- 🔌 **LLM provider diversity**: Thêm Atlas Cloud, mở rộng options

## 7. 💭 Phản hồi người dùng

### Tích cực:

- ✅ **Quick fixes**: Users đánh giá cao response time cho critical bugs
- 📖 **Documentation attention**: Community actively reviewing và improving docs

### Thách thức:

- ⚠️ **Breaking changes impact**: v2.1.x có nhiều breaking changes, cần communication tốt
- 🔧 **Migration complexity**: Upgrade tripwire tốt cho security nhưng tăng friction
- 📚 **Documentation debt**: 5 issues về SKILL.md cho thấy docs cần update thường xuyên hơn

### User pain points:

1. **Setup complexity**: Issues về missing mkdir, port documentation, vague guides
2. **Upgrade path**: Breaking changes trong SDK và startup tripwire
3. **Managed deployments**: Auth và upgrade mechanisms chưa mature cho fleet scenarios

## 8. 🗺️ Backlog & Roadmap

### Short-term (đang active):

- 🔒 **Security hardening sprint**: Multiple CVEs được vá trong tuần này
- 📖 **Documentation improvement wave**: 4+ PRs đang cleanup SKILL.md
- 🏗️ **Stability fixes**: Journal recovery, socket timeouts, error handling

### Medium-term (từ PRs open):

- 🤝 **Agent collaboration features**: Approval policies là bước đầu
- 🚀 **Provider ecosystem**: Atlas Cloud integration, thêm nhiều LLM options
- 🎛️ **CLI/dashboard tooling**: Read-only dashboard, better observability

### Emerging priorities:

1. **Enterprise readiness**:
   - Managed fleet support
   - Auth flexibility (env vars, vaults)
   - Deployment automation

2. **Security posture**:
   - Input validation across all entry points
   - Path traversal prevention
   - Credential isolation

3. **Developer experience**:
   - Better setup flow
   - Clearer upgrade paths
   - Comprehensive documentation

---

## 📌 Kết luận

NanoClaw đang trong giai đoạn **maturity và hardening**, focus vào:
- ✅ Bảo mật (CVEs được vá nhanh)
- ✅ Ổn định (delivery issues, auth fixes)
- ✅ Enterprise readiness (managed fleets, approval workflows)

⚠️ **Lưu ý cho users**: Breaking changes trong v2.1.x yêu cầu cẩn thận khi upgrade, đặc biệt về OneCLI SDK và upgrade marker requirements.

🎯 **Outlook**: Project đang phát triển healthy với balance tốt giữa features mới và stability/security fixes.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích hoạt động IronClaw - 18/06/2026

## 📊 Tóm tắt hôm nay

IronClaw đang trong giai đoạn phát triển tích cực với 50 PR được tạo/cập nhật, tập trung chủ yếu vào **hệ thống Projects** (5-part feature stack) và cải thiện trải nghiệm **Reborn WebUI v2**. Đội ngũ đã giải quyết nhiều vấn đề quan trọng về OAuth, hiệu năng và ổn định, đặc biệt là các lỗi liên quan đến Google/Slack authentication và context budget optimization.

## 🚀 Tiến độ dự án

### Tính năng lớn đang phát triển

**🎯 Projects System - Feature Stack lớn nhất**
- **5 PR liên tiếp** (#5015 → #5016 → #5017 → #5018 → #5019) đang xây dựng hệ thống Projects hoàn chỉnh
- Kiến trúc phân tầng: Database crate → Service port → Composition wiring → HTTP endpoints → Frontend UI
- Hỗ trợ phân quyền đầy đủ: Owner/Editor/Viewer roles
- Cho phép quản lý thành viên, chia sẻ agents và conversations giữa users
- Đây là bước tiến quan trọng biến IronClaw từ single-user tool sang collaborative platform

**📂 Filesystem Viewer** (#5057)
- Read-only agent filesystem viewer trong WebChat v2
- Truy cập được memory store và project directory
- Tăng tính transparency về cách agent xử lý files

### Cải thiện hiệu năng

**⚡ Frontend Performance** (#5024 - MERGED)
- Self-host tất cả assets thay vì CDN dependencies
- Giảm load time từ 15s+ xuống đáng kể
- Loại bỏ 50+ requests đến third-party CDNs (esm.sh)
- Cải thiện trải nghiệm trên mạng chậm

**📏 Context Budget Management** (#5029 - MERGED)
- Thêm byte budget cho `read_file` tool
- Ngăn context window bị blow-up bởi large files
- Giải quyết timeout issues trong pinchbench (11 tasks failed trước đó)

## 🔧 Ổn định & Bugs đã xử lý

### Authentication & OAuth fixes (Ưu tiên cao)

**🔐 Gmail Auth Resume** (#5051 - MERGED)
- Fix lỗi "execution driver temporarily unavailable" khi connect Gmail
- Khôi phục persistent-approval grant mechanism
- Giảm friction trong OAuth flow

**🔐 Slack OAuth Hardening** (#5052 - MERGED, #5009)
- Structural DM-parity cho live (non-triggered) Slack OAuth path
- Đảm bảo authorization_url chỉ được gửi trong personal DM context
- Security improvement quan trọng

**🔐 Google OAuth Refresh** (#5054, #5053)
- Hướng dẫn user setup refresh token đúng cách
- Loại bỏ per-process cache, refresh credentials mỗi lần staging
- Tránh reuse expired tokens

### Agent Loop Improvements

**🔄 No-progress Detection Redesign** (#4993, #5000, #5022 - MERGED)
- 3-part stack cải thiện cách phát hiện agent bị stuck
- Output-aware progress tracking thay vì repetition counting
- Honest failure thay vì fake completion message
- Quan trọng cho reliability trong production

**🤖 Model Resolution** (#5043, #5045, #5044)
- Fix `NEARAI_MODEL=auto` bị reject bởi cloud-api.near.ai (HTTP 400)
- Auto-resolve về model thực tế (z-ai/glm-5.2)
- Fail-fast trên invalid model thay vì retry loop

### Bedrock Support (#5058, #5059)
- Fix 2 defects ngăn Bedrock hoạt động với ironclaw-reborn binary
- Wire `bedrock` feature qua CLI crates
- Fix Converse API tool schema (reject top-level combinators)

## 🎨 Trải nghiệm người dùng

### WebUI Improvements

**👁️ Visual Feedback** (#4974 - CLOSED)
- Fix duplicate "..." buttons trong Activity tool rows
- Cleaner UI presentation

**✅ Form Validation** (#5007)
- Skills validation error vẫn hiện sau khi fill required fields
- UX issue đang chờ fix

**⚠️ Error Presentation** (#5055)
- Soften automation run errors: yellow "Needs attention" thay vì red terminal errors
- Friendly hơn với users

### Triggers & Automation (#5041)
- Fix headless routine creation persistence
- Exempt trigger capabilities từ destructive gates
- Support literal cron seconds và optional timezone

## 🐛 Issues đáng chú ý

**#4823** - Delete running conversation không có feedback (CLOSED)
- UI không hiển thị error khi delete fail

**#5056** - "test" issue từ @ilblackdragon
- Likely testing automation/CI

**#4793** - Onboarding blocking Extensions/Automations (CLOSED)
- Discussion về first-run experience

## 📦 Dependencies

**#4876** - Massive dependency bump (43 packages)
- Everything-else group update
- Đang pending review
- Risk: medium

**#4032** - WASM group update
- wit-component + wit-parser bumps

## 🔍 Insights & Xu hướng

### Phát triển chiến lược
1. **Collaboration focus**: Projects system cho thấy IronClaw đang chuyển sang multi-user platform
2. **Production readiness**: Nhiều fixes về OAuth, error handling, performance
3. **Developer experience**: Filesystem viewer, better error messages, form validation
4. **Security hardening**: Slack DM-parity, OAuth flow improvements

### Technical debt đang giải quyết
- Context budget explosion
- No-progress detection brittleness  
- OAuth refresh token handling
- CDN dependencies

### Contributor activity
- **Core team** rất active: @ilblackdragon, @henrypark133, @serrrfirat
- **New contributors**: @abbyshekit, @loopstring, @rajulbhatnagar đóng góp fixes quan trọng
- **Bot activity**: dependabot, ironclaw-ci[bot] duy trì dependencies

## 🎯 Đánh giá tổng quan

IronClaw đang trong **giai đoạn feature development tích cực** với focus rõ ràng vào:
- ✅ Collaboration capabilities (Projects)
- ✅ Production stability (OAuth, error handling)  
- ✅ Performance optimization (context budget, CDN elimination)
- ✅ Developer transparency (filesystem viewer, better logging)

Velocity cao (50 PRs) với quality control tốt. Team đang balance giữa new features và bug fixes/stability một cách hợp lý.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo phân tích dự án LobsterAI - Ngày 18/06/2026

## 🎯 Tóm tắt hôm nay

LobsterAI vừa phát hành phiên bản **2026.6.15** với hai tính năng đột phá: **Computer Use** và **nhập liệu giọng nói thời gian thực**. Trong 24 giờ qua, đội ngũ đã merge 13 PRs tập trung vào hoàn thiện tính năng Cowork, sửa lỗi trải nghiệm người dùng và tối ưu hiệu năng. Không có issue mới nhưng hoạt động phát triển rất dày đặc, cho thấy giai đoạn sprint cuối trước release.

---

## 🚀 Releases

### **LobsterAI 2026.6.15** (phát hành 17/06/2026)

#### Tính năng chính:

**1. 🖥️ Computer Use** (#2143)
- Cho phép AI agent tương tác trực tiếp với máy tính (thao tác UI, điều khiển hệ thống)
- Đây là bước tiến lớn hướng tới autonomous agent có khả năng thực thi task phức tạp
- Tương tự tính năng của Anthropic Claude, mở rộng khả năng automation

**2. 🎤 Realtime ASR Voice Input** (#2148)
- Nhập liệu bằng giọng nói với nhận dạng thời gian thực (ASR)
- Cải thiện trải nghiệm hands-free, phù hợp với workflow coding
- Tích hợp sâu vào chế độ Cowork

**3. 🧠 Post-compaction Context Continuity** (#2145)
- Cải thiện khả năng duy trì ngữ cảnh sau khi OpenClaw nén lịch sử chat
- Agent có thể tiếp tục task tin cậy hơn dù context window bị giới hạn
- Bổ sung task state theo session và workspace tracking

#### Ý nghĩa:
Release này đánh dấu việc LobsterAI tiến gần hơn tới vision về **fully autonomous coding agent**. Computer Use mở ra khả năng agent không chỉ viết code mà còn test, debug, và tương tác với tools bên ngoài IDE.

---

## 📈 Tiến độ dự án

### Xu hướng phát triển:

**Cowork Mode Stabilization** (chủ đạo)
- 9/13 PRs liên quan đến cải thiện Cowork (chế độ cộng tác AI)
- Tập trung vào edge cases: stopped streams, context switching, scroll behavior
- Hoàn thiện trải nghiệm real-time collaboration

### PRs quan trọng đã merge:

**🔧 Stability & Performance**

- **#2149** - Tăng heap limit cho OpenClaw gateway
  - Giảm OOM crashes trong workload multi-channel kéo dài
  - Tôn trọng cấu hình người dùng, có test coverage

- **#2147** - Ngăn startup turns bị dừng gửi chat
  - Xử lý race condition khi user stop trước khi gateway active
  - Cải thiện idle status handling

**🎨 UX Improvements**

- **#2173** - Render user messages dạng plain text
  - Giữ nguyên line breaks do người dùng nhập
  - Fix vấn đề formatting không như mong muốn

- **#2171** - Giảm jank khi navigate trong long sessions
  - Tắt smooth scrolling cho jumps xa
  - Memoize rail items để tránh re-scan messages

- **#2174** - Fix scroll-to-bottom position
  - Align với chiều cao message mới nhất
  - Clean up timers đúng cách

**🔐 Infrastructure**

- **#2144** - Update portal fallback URLs
  - Chuyển sang domains mới của LobsterAI portal
  - Tách test mode và production URLs

**🐛 Bug Fixes**

- **#2154** - Hiển thị model metadata sau stopped streams
- **#2153** - Preserve model selection với tên package trùng nhau
- **#2162** - Giữ voice input cancel guard sau merge
- **#1463** - Truncate long modal titles (stale PR được close)

**🌐 HTML Share**

- **#2172** - Hỗ trợ khôi phục shares bị đóng do limit
  - Phân biệt lý do đóng, điều chỉnh UI prompts
  - Tích hợp với backend để kiểm tra khả năng khôi phục

---

## ⚡ Điểm nổi bật cộng đồng

- **Không có issues/PRs có tương tác cao** trong 24h qua
- Tất cả PRs được merge nhanh (same-day), cho thấy team nhỏ hoặc internal development
- Không có external contributors trong batch này - chủ yếu từ @liuzhq1986 (8 PRs) và @liugang519

**Quan sát**: Dự án có vẻ đang trong giai đoạn **closed development** hoặc **pre-public-launch stabilization**. Việc merge nhanh và không có discussions cho thấy quy trình review nội bộ chặt chẽ.

---

## 🐞 Ổn định & Bugs

### Vấn đề đã giải quyết:

**Memory Management**
- OpenClaw gateway OOM trong long-running sessions → fix bằng explicit heap limit

**Concurrency Issues**
- Race conditions giữa user stops và gateway startup
- Voice input cancellation không đúng khi merge code

**UI/UX Bugs**
- Scroll jank trong long sessions
- User message formatting bị mất line breaks
- Model metadata mất khi stop streams

**Context Handling**
- Agent mất맥 ngữ cảnh sau context compaction
- Session state không được preserve đúng cách

### Pattern nhận diện:
Các bugs chủ yếu xuất hiện ở **boundary conditions** (stop events, context limits, long sessions) - điển hình của sản phẩm đang scale usage patterns.

---

## 💡 Yêu cầu tính năng

Không có feature requests mới từ cộng đồng trong 24h. Tính năng được phát triển dựa trên **roadmap nội bộ**:

**Đã implement:**
- ✅ Computer Use
- ✅ Realtime Voice Input
- ✅ Context Continuity

**Đang refine:**
- HTML Share management (quota handling)
- Model selection UX với multiple providers

---

## 💬 Phản hồi người dùng

Do không có public discussions hoặc issues mới, không có phản hồi trực tiếp từ users. Tuy nhiên, từ bug fixes có thể suy luận pain points:

**Suy luận từ fixes:**
- Users gặp vấn đề với **long coding sessions** (OOM, scroll jank)
- **Voice input workflow** có adoption đủ để prioritize fixes
- **Model switching** gây confusion khi có providers trùng tên
- **Share feature** đang được sử dụng nhiều (cần quota management)

---

## 🗺️ Backlog & Roadmap

### Dựa trên commit history và code hints:

**Short-term** (đang hoàn thiện):
- Stabilize Computer Use feature (mới ra, cần hardening)
- Polish Cowork mode (nhiều edge cases còn lại)
- Improve diagnostics và logging (nhiều PRs thêm debug logs)

**Medium-term** (có signs trong code):
- Multi-provider model management (fixes về model selection)
- Enterprise features (portal URLs, quota management)
- Performance optimization cho large workspaces

**Long-term vision** (từ feature set):
- Fully autonomous agent với Computer Use
- Multi-modal interaction (voice + text + actions)
- Collaborative AI workspaces

### Dự đoán focus tiếp theo:
- **Testing và monitoring** cho Computer Use (high-risk feature)
- **Scalability** cho OpenClaw gateway (đã có OOM issues)
- **Onboarding UX** cho voice input (new interaction paradigm)

---

## 🎯 Kết luận

LobsterAI đang trong giai đoạn **feature-rich stabilization** sau release quan trọng. Đội ngũ focus vào quality over quantity, xử lý systematic các edge cases của tính năng mới. Việc không có external contributions cho thấy dự án có thể đang **controlled beta** hoặc **enterprise product** với community chưa rộng.

**Momentum**: 🟢 Cao - Release major, development velocity tốt, bug fixes proactive

**Risk areas** cần watch: Computer Use security, voice input privacy, context window scaling

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Báo cáo phân tích dự án Moltis - 18/06/2026

## 📊 Tóm tắt hôm nay

Dự án Moltis đang trong giai đoạn cải thiện trải nghiệm người dùng với focus vào tính năng live mode và khả năng tùy biến. Có 3 issues mới được mở và 1 PR đang chờ review, tập trung vào việc giải quyết vấn đề kỹ thuật về timeout và audio feedback loop. Hoạt động cho thấy sự tương tác tích cực từ cộng đồng với nhiều đề xuất cải tiến UX.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### Pull Requests đang active:

**PR #1130 - Configurable WebUI RPC timeout** 
- Tác giả @khimaros đang giải quyết issue #1127 về timeout configuration
- Tăng tính linh hoạt cho người dùng trong việc điều chỉnh timeout dựa trên môi trường và use case của họ
- PR còn đang mở, chờ review và merge

### Xu hướng phát triển:
- **Customization**: Dự án đang hướng tới việc cho phép người dùng tùy chỉnh nhiều tham số hơn (timeout, audio format)
- **User Experience**: Cải thiện các tính năng xuất/sao chép nội dung để tăng khả năng sử dụng
- **Stability**: Xử lý các vấn đề về audio processing trong live mode

## 🌟 Điểm nổi bật cộng đồng

**Issue #1126** (3 comments) - Đề xuất cấu hình format TTS output
- Có tương tác cao nhất với 3 bình luận
- Người dùng yêu cầu khả năng chọn format audio output (có thể giữa các codec như MP3, WAV, OGG)
- Phản ánh nhu cầu thực tế về tối ưu bandwidth hoặc chất lượng audio tùy theo use case

**Issue #1131** - Export as Markdown
- Tính năng copy và export nội dung dưới dạng Markdown
- Cải thiện workflow cho người dùng cần chia sẻ hoặc lưu trữ conversation history
- Tính năng mong đợi để tích hợp với các công cụ note-taking và documentation

## 🐛 Ổn định & Bugs

**Issue #1129 - Echo cancellation problem**
- **Vấn đề nghiêm trọng**: Agent tự trigger chính nó trong live mode do thiếu echo cancellation
- Tạo feedback loop không mong muốn, ảnh hưởng trực tiếp đến trải nghiệm live conversation
- Cần xử lý ưu tiên vì ảnh hưởng đến core functionality của live mode
- Giải pháp có thể bao gồm: audio processing pipeline với echo cancellation, hoặc cơ chế phát hiện và ngăn chặn self-triggering

**Issue liên quan #1127** (được fix bởi PR #1130)
- Vấn đề về RPC timeout đang được xử lý
- Cho thấy team responsive với bug reports

## ✨ Yêu cầu tính năng

1. **TTS Output Format Configuration** (#1126)
   - Priority: Medium-High
   - Impact: Tăng flexibility cho người dùng với bandwidth hoặc quality requirements khác nhau
   - Use cases: Low bandwidth environments, high fidelity audio requirements

2. **Markdown Export** (#1131)
   - Priority: Medium
   - Impact: Cải thiện interoperability và user workflow
   - Use cases: Documentation, sharing, integration với các tools khác

## 💬 Phản hồi người dùng

- Người dùng đang actively sử dụng live mode và phát hiện các edge cases về audio processing
- Có nhu cầu về customization và flexibility trong configuration
- Mong muốn tích hợp tốt hơn với workflow hiện có (export, copy)
- Community engagement tốt với việc báo cáo chi tiết và follow process (preflight checklist)

## 🗺️ Backlog & Roadmap

### Immediate priorities (dựa trên issues hiện tại):
1. ⚠️ **Fix echo cancellation** - Critical cho live mode stability
2. 🔧 **Merge RPC timeout configuration** - Đang có PR sẵn sàng
3. 🎵 **Implement TTS format configuration** - Có discussion đang diễn ra
4. 📝 **Add Markdown export** - Requested feature

### Technical debt & improvements:
- Audio pipeline cần được cải thiện với echo cancellation và noise suppression
- Configuration system cần mở rộng để support thêm customization options
- Export/import functionality cần được phát triển

**Nhận xét chung**: Dự án đang trong giai đoạn maturity, focus vào polish và user experience improvements sau khi core features đã stable. Community active và có quality bug reports.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo Phân tích Dự án CoPaw/QwenPaw - Ngày 2026-06-18

## 1. 🎯 Tóm tắt hôm nay

Dự án đang trong giai đoạn **chuyển đổi lớn** với việc phát hành **v1.1.12 Stable** và bắt đầu chu kỳ phát triển **v2.0.0-alpha.1**. Ngày hôm nay tập trung vào **sửa lỗi nghiêm trọng trong script cài đặt** (issue #5286) và **ổn định hệ thống trước khi chuyển sang v2.0**. Hoạt động issue/PR vẫn duy trì cao với 29 issues và 50 PRs đang được theo dõi.

---

## 2. 🚀 Releases

### **v1.1.12 (Stable) - 2026-06-17** ⭐

**Tính năng chính:**

#### 🎨 **Console UI Overhaul**
- **Models Page Redesign**: Giao diện quản lý model mới với aggregation theo provider, card UI thống nhất
- **Simple Mode**: Chế độ đơn giản hóa với navigation phẳng và danh sách session sắp xếp theo thời gian cập nhật
- **Wide Mode Toggle**: Cho phép mở rộng layout chat
- **Per-Turn Token Counter**: Hiển thị token sử dụng cho từng lượt hội thoại
- **Session Filter by Title**: Tìm kiếm session theo tiêu đề (#4999)

#### ⚙️ **Backend & Stability**
- **Config Deep Copy Removal**: Loại bỏ deep copy không cần thiết, cải thiện performance (#5240)
- **User Input Queue**: Xử lý input người dùng theo hàng đợi, tránh race condition (#5158)
- **Bug fixes**: Sửa lỗi MCP/ACP config persistence, ChromaDB runtime probe

#### 🔧 **Developer Experience**
- Cải thiện MCP access policy layout
- Tối ưu responsive design cho modal và rule rows

**Ý nghĩa:**
- Đây là **bản phát hành ổn định cuối cùng** trước khi chuyển sang v2.0 architecture
- Tập trung vào **UX polish** và **stability fixes** thay vì tính năng mới
- Tín hiệu rõ ràng về việc dự án đang **mature hóa** và chuẩn bị cho breaking changes trong v2.0

### **v1.1.12-beta.2** (2026-06-17)
Pre-release version với các tính năng tương tự, phục vụ testing trước khi release stable.

---

## 3. 📈 Tiến độ dự án

### **Xu hướng phát triển chính**

#### 🔄 **Transition to v2.0.0**
- **PR #5281**: Bump version từ `1.1.10b1` → `2.0.0a1` (CLOSED)
- **Issue #5273**: Tracking issue riêng cho v2.0.0 pre-release bugs
- **Insight**: Team đang **tách biệt rõ ràng** giữa v1.x maintenance và v2.0 development

#### 🏗️ **Infrastructure & Testing**
- **PR #5270**: Integration test suite mới cho Sprint 3 (64 test cases) - bao phủm:
  - ACP Runner interop (14 cases)
  - Plugin system (24 cases)
  - Security & RBAC (12 cases)
  - Cross-cutting concerns (14 cases)
- **Ý nghĩa**: Dự án đang **tăng cường testing maturity** trước major version

#### 🔌 **Plugin Ecosystem**
- **PR #4622**: DataPaw plugin (12 BI skills) - OPEN, under review
- **PR #5276**: OpenClaw config migration tool - cho phép import config từ OpenClaw/Hermes Agent
- **Insight**: Mở rộng khả năng tương tác với các AI agent framework khác

#### 🛠️ **Critical Bug Fixes**
- **PR #5288** (CLOSED): Sửa lỗi script cài đặt v1.1.12 - `PRERELEASE_ARGS[@]: unbound variable`
- **PR #5287**: Fix context compaction crash khi summary vượt quá `maxLength` schema
- **PR #5265**: Windows vector index không persist - force rebuild mỗi lần khởi động

---

## 4. 🌟 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác**

#### 🔥 **#5218** (16 comments): **Quy trình đông cứng khi sub-agent trigger context compaction**
- **Mức độ nghiêm trọng**: Critical - toàn bộ QwenPaw process freeze
- **Tác động**: User phải manually restart application
- **Insight**: Vấn đề này ảnh hưởng đến **reliability** của agent architecture trong production use

#### 🔥 **#1911** (22 comments): **XiaoYi channel integration issues**
- **Vấn đề**: Huawei XiaoYi trả về lỗi "开小差", "网络拥堵" mặc dù test trên platform bình thường
- **Root cause suspect**: Protocol mismatch hoặc whitelist configuration
- **PR liên quan**: #3839, #5274 - đã refactor sang dual WebSocket architecture
- **Insight**: Channel integration với third-party platform là **pain point lớn** - cần documentation/debugging tools tốt hơn

#### 📊 **#4967** (6 comments, updated 2026-06-18): **Agent execution loop vô hạn**
- Vẫn OPEN sau nhiều updates - chưa có root cause fix
- Tác động trực tiếp đến **agent autonomy reliability**

---

## 5. ⚠️ Ổn định & Bugs

### **Critical Issues**

#### 🚨 **macOS Stability Crisis**

**Issue #5243** (48 crashes trong 2 ngày):
- **Root cause**: ChromaDB Rust bindings crash với SIGSEGV tại địa chỉ `0x44` (null pointer)
- **Platform**: macOS ARM64 (Apple Silicon)
- **Impact**: QwenPaw Desktop (Tauri) vào crash loop mỗi ~1 phút

**Solutions deployed:**
- **PR #5271**: Thêm async runtime probe cho ChromaDB bindings
- **PR #5246**: Config overrides để disable ChromaDB trên macOS nếu detect crash
- **Status**: Đã merge vào v1.1.12, đang monitor effectiveness

**Insight**: Đây là **platform-specific native dependency issue** - loại bug khó debug nhất. Team đã response nhanh với workaround.

#### 🐛 **Windows Vector Index Persistence**

**Issue #5259**:
- Vector index không persist sang disk trên Windows
- User phải enable "Rebuild memory index on startup" permanently
- **PR #5265**: Force rebuild làm temporary fix

**Root cause**: SQLite version mismatch với ChromaDB requirements trên Windows

#### 🔄 **Context Compaction Failures**

**Pattern emerging:**
- **Issue #5171**: Context compaction xóa toàn bộ context khi persona file > token threshold
- **Issue #5218**: Sub-agent compaction freeze process
- **PR #5287**: Schema validation crash khi summary > maxLength

**Insight**: Context management là **architectural weak point** - cần refactor trong v2.0

### **Security & Safety**

#### 🔓 **Issue #5234**: **Cloud deployment RCE vulnerability**
- User báo cáo có thể prompt inject để cài komari-agent (monitoring probe với RCE channel)
- **Severity**: Critical - full container shell access
- **Status**: Issue đã đóng nhưng chưa rõ resolution

**Concern**: Cần transparency hơn về security fixes và patch timeline.

---

## 6. 💡 Yêu cầu tính năng

### **Top Feature Requests**

#### 📁 **#5283**: **Project-based session management**
- User request: Quản lý sessions theo project (giống Cursor)
- Hoặc cho phép manually specify working directory
- **Rationale**: Cải thiện context locality cho development workflows

#### 🎨 **#4077**: **UI Font Scaling & File Link Support**
- Font size adjustment (global/per-component)
- Clickable file paths trong chat output
- **Motivation**: Accessibility và productivity improvement

#### 🔧 **#3090**: **Persistent skill enable/disable state**
- Disabled built-in skills revert to enabled sau mỗi lần upgrade
- User yêu cầu preserve configuration qua versions
- **Related**: #5262, #4807

#### 🖼️ **PR #5263**: **Agent avatar upload & display**
- Đã implement: upload avatar, display trong AgentTable/Selector
- Cải thiện visual identity của agents

### **Migration & Interop**

#### 🔄 **PR #5276**: **OpenClaw config migration CLI**
- Tool để import config từ OpenClaw installations
- Addresses demand từ Hermes Agent ecosystem users
- **Strategic**: Tăng adoption bằng cách lower switching cost

---

## 7. 👥 Phản hồi người dùng

### **Pain Points**

#### 😤 **Channel Reliability**
- **XiaoYi** (Huawei): Persistent connection issues (#1911, #3840)
- **Feishu**: Group message routing bug (#5264) - reply đi nhầm sang private chat
- **Pattern**: Third-party channel integrations thiếu end-to-end testing

#### 🪟 **Windows Experience**
- Vector index không persist (#5259)
- Plugin dependency installation popup spam (#5181)
- **Insight**: Windows support cần investment - platform có user base lớn nhưng testing coverage thấp

#### 🍎 **macOS Stability**
- ChromaDB crash loop (#5243, #5209)
- Native dependency conflicts
- **User sentiment**: Frustration cao - app "unusable" trên Apple Silicon

### **Positive Signals**

#### 👍 **First-time Contributors**
- **9 PRs** với label `first-time-contributor` trong dataset
- Community đang **scale contribution** - documentation và onboarding hiệu quả

#### 🤝 **AI-assisted Development**
- **Issue #2677**: User hỏi về policy cho AI-generated PRs (Codex/Claude)
- Maintainer response: **Welcome** - miễn là code quality tốt
- **Culture**: Open to modern workflows, pragmatic về tooling

---

## 8. 🗺️ Backlog & Roadmap

### **v2.0.0 Milestones**

#### 📋 **Issue #5273**: Pre-release Tracking
- Centralized issue để track v2.0.0-alpha bugs
- Tránh clutter trong main issue tracker
- **Timeline**: Alpha phase đang bắt đầu (version bumped to 2.0.0a1)

#### 🏗️ **Architecture Changes** (inferred từ PRs)
- **Agent Communication**: Refactor dual WebSocket cho channels (#5274)
- **Memory System**: ChromaDB integration overhaul để fix persistence issues
- **Context Management**: Redesign để handle compaction edge cases

### **Near-term Priorities**

#### 🔥 **Stability Focus**
1. Resolve macOS crash loop (ChromaDB)
2. Fix Windows vector persistence
3. Patch context compaction freeze

#### 🧪 **Testing Infrastructure**
- Sprint 3 integration tests (#5270) - 64 cases
- Expand platform-specific testing (Windows/macOS)

#### 📚 **Documentation Gaps**
- Channel integration debugging guide
- Plugin development best practices
- Migration guides cho v2.0 breaking changes

### **Long-term Vision** (inferred)

#### 🌐 **Ecosystem Expansion**
- OpenClaw/Hermes interop (#5276)
- DataPaw BI plugin (#4622)
- **Goal**: Trở thành "platform" hơn là "tool"

#### 🔐 **Enterprise Readiness**
- Security hardening (response to #5234 RCE)
- RBAC improvements (Sprint 3.3 tests)
- Audit logging và compliance features

---

## 📊 Metrics Summary

| Metric | Value | Trend |
|--------|-------|-------|
| Open Issues | 29 | ↔️ Stable |
| Open PRs | 50 | ↑️ High activity |
| First-time Contributors | 9 PRs | ✅ Healthy |
| Critical Bugs | 3 (macOS crash, Windows persist, compaction freeze) | ⚠️ Needs attention |
| Releases (24h) | 2 (v1.1.12 + beta) | 🚀 Active |
| Community Engagement | High (22 comments on #1911) | ✅ Strong |

---

## 🎯 Kết luận

**CoPaw/QwenPaw đang ở giai đoạn chuyển giao quan trọng:**
- ✅ v1.1.12 stable đã release với polish UI và bug fixes
- 🚧 v2.0.0-alpha đang khởi động với architectural improvements
- ⚠️ Stability issues trên macOS/Windows cần urgent attention
- 🌱 Community contribution đang tăng trưởng tốt
- 🔐 Security concerns cần transparency và faster response

**Khuyến nghị cho maintainers:**
1. **Ưu tiên:** Fix macOS crash loop - đây là showstopper cho Apple Silicon users
2. **Communication:** Public security advisory cho issue #5234
3. **Documentation:** Channel integration troubleshooting guide
4. **v2.0 Planning:** Clear migration path và breaking changes documentation

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo phân tích dự án GoClaw - 18/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 18/06 tập trung vào **cải thiện tích hợp kênh giao tiếp** và **sửa lỗi LLM agent**. Đáng chú ý nhất là nâng cấp toàn diện Bitrix24 lên API v2 với hỗ trợ media 2 chiều, fix critical bug về MCP tools không được expose cho LLM, và sự cố ChatGPT OAuth với native image generation. Dự án cho thấy xu hướng mở rộng hệ sinh thái kênh enterprise (Bitrix24, Feishu) song song với việc tinh chỉnh khả năng agent orchestration.

---

## 🚀 Releases

**Không có release mới** trong 24 giờ qua. Các cải tiến đang được tích lũy qua PRs để chuẩn bị cho phiên bản tới.

---

## 📈 Tiến độ dự án

### 🔥 Pull Requests quan trọng

**#1236 - Bitrix24 imbot.v2 Migration** ⚡ *Độ ưu tiên cao*
- **Scope**: Nâng cấp lớn cho kênh Bitrix24
- **Tính năng chính**:
  - Migration sang API `imbot.v2` (bot messaging, listing, properties)
  - **2-way media transfer**: Gửi/nhận files qua lại
  - **OpenLine sender-tag echo**: Hiển thị nguồn gốc tin nhắn
  - **Whisper routing**: Định tuyến tin nhắn nội bộ
  - **Security hardening**: Kiểm tra placement_options, HTTPS validation
- **Ý nghĩa**: Bitrix24 đang được đầu tư mạnh, cho thấy GoClaw hướng đến thị trường enterprise CIS/Eastern Europe

**#1235 - Fix MCP per-user tools visibility** 🐛 *Critical bug*
- **Vấn đề**: MCP servers với `require_user_credentials` load thành công nhưng tools **không bao giờ được gửi cho LLM**
- **Impact**: Agent không thể sử dụng per-user tools dù đã kết nối
- **Root cause**: Logic `buildFinalToolList` bỏ qua user-specific tool definitions
- **Status**: Đang chờ review, có thể block nhiều use cases per-user OAuth

**#1234 - Cron job LLM provider override** 💡
- **Cải tiến**: Cho phép cron jobs chỉ định provider/model riêng (giống heartbeats)
- **Business value**: Tiết kiệm chi phí bằng cách route high-frequency jobs (triage, digest) sang cheaper models
- **Implementation**: Thêm optional `provider`/`model` fields vào `AgentCronJob`

**#1189 - Feishu mention detection fix** 🔧
- **Bug**: Bot reply cho mentions của **user khác** thay vì bot
- **Cause**: Legacy API `/bot/v3/info` trả bot object ở top-level, code parse sai structure
- **Fix**: Đọc `bot` field thay vì toàn bộ response body

**#1061 - Bitrix24 channel core (3/3)** 📦 *Long-running*
- PR cuối trong series 3-part split từ #1057
- Implement full Bitrix24 channel với per-user MCP OAuth (Path B)
- **Status**: Open từ 28/04, đang chờ merge các PR dependency trước

### 📊 Xu hướng phát triển

1. **Enterprise messaging dominance**: 4/5 PRs liên quan đến channels (Bitrix24 x2, Feishu)
2. **MCP ecosystem maturity**: Fix per-user tools cho thấy adoption thực tế và edge cases
3. **Cost optimization**: Cron provider override phản ánh pressure về LLM costs ở production scale
4. **Technical debt cleanup**: Migration API versions (imbot.v2), fix legacy parsing bugs

---

## 🌟 Điểm nổi bật cộng đồng

**Tương tác thấp** trong 24h qua - không có issues/PRs nào với reactions hay comments đáng kể. Có thể do:
- Chủ nhật/đầu tuần (activity thấp tự nhiên)
- Nội bộ team đang focus ship features thay vì community engagement
- PRs technical cao, ít appeal với casual contributors

---

## 🐛 Ổn định & Bugs

### Critical issues

**#1237 - ChatGPT OAuth + native image_generation failure** 🚨
- **Severity**: High - **text turns fail** khi có `image_generation` tool
- **Environment**: v3.14.0, `chatgpt_oauth` provider, `gpt-5.5` model
- **Symptoms**: Simple text messages bị reject
- **Hypothesis**: Tool registration conflict hoặc OAuth scope mismatch
- **Status**: Mới report (0 comments), chưa có assignee

**#1235 - MCP per-user tools invisible** 🔴
- **Impact**: Breaking feature cho per-user credential workflows
- **Evidence**: Logs show `mcp.user_tools_loaded tools=N` nhưng model không nhận được definitions
- **Workaround**: None - fundamental agent runtime bug

### Stability patterns

- **API migration risks**: Bitrix24 v2 migration (#1236) có nhiều security checks mới → team học từ production incidents
- **Legacy debt**: Feishu bug (#1189) tồn tại từ legacy code, được phát hiện qua real-world usage

---

## 💡 Yêu cầu tính năng

**#1234 - Cron job model override** ✅ Đã implement
- **Motivation**: Cost reduction cho scheduled jobs
- **Design**: Mirror heartbeat's existing `provider`/`model` pattern
- **Value**: Significant ở production scale với nhiều high-frequency jobs

**Implicit requests từ PRs:**
- **Bitrix24 whisper routing** (#1236): Internal messaging cho multi-agent coordination
- **OpenLine sender tags** (#1236): Channel attribution trong aggregated conversations
- **2-way media** (#1236): Rich content support trong enterprise chat

---

## 💬 Phản hồi người dùng

**Thiếu dữ liệu trực tiếp** - không có user comments/reactions trong dataset.

**Suy luận từ PRs:**
- **Enterprise adoption**: Bitrix24 investment cho thấy đang có paying customers demand
- **MCP per-user bug**: Có user hit use case này trong production (#1235)
- **ChatGPT OAuth issue**: Real deployment hit bug với v3.14.0 (#1237)

**Quality signals:**
- Code reviews chi tiết (security checks, HTTPS validation)
- Test coverage concerns (no test evidence trong PR descriptions)
- Documentation gaps (PRs thiếu migration guides)

---

## 🗺️ Backlog & Roadmap

### Immediate priorities (inferred)

1. **Fix #1237** (ChatGPT OAuth) - blocking native tool usage
2. **Merge #1235** (MCP tools) - blocking per-user workflows  
3. **Complete Bitrix24 stack** (#1061 → #1236) - revenue-critical

### Strategic directions

**Channel expansion**: 
- Bitrix24 nearing feature parity với mainstream channels
- Feishu bug fixes → improving stability cho Asian markets
- Pattern: per-user OAuth → multi-tenant enterprise readiness

**Cost optimization**:
- Granular provider control (cron, heartbeat) → preparing for scale
- Suggests production deployments hitting budget constraints

**MCP ecosystem**:
- Moving from basic integration → advanced patterns (per-user, credentials)
- Bug fixes indicate real-world adoption → need maturity improvements

### Gaps & risks

⚠️ **Testing coverage**: Không thấy automated tests trong PRs  
⚠️ **Breaking changes**: API migrations (imbot.v2) thiếu migration guides  
⚠️ **Community engagement**: Low contributor activity, mostly core team  

---

## 🎓 Kết luận

**GoClaw đang ở giai đoạn scale-up từ MVP sang production-ready platform**. Priorities rõ ràng: enterprise channels, cost efficiency, và MCP ecosystem maturity. Technical debt được cleanup song song với feature development. Cần cải thiện: test automation, documentation, và community engagement để sustainable growth.

**Risk cao nhất**: #1237 có thể block nhiều deployments nếu là regression trong ChatGPT OAuth flow.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo Phân tích Hermes-Agent - Ngày 2026-06-18

## 1. 🎯 Tóm tắt hôm nay

Hermes-Agent có một ngày hoạt động cực kỳ sôi nổi với **30 Pull Requests mới** được tạo trong 24 giờ qua, tập trung vào việc **sửa lỗi nền tảng Windows**, **tăng cường bảo mật gateway**, và **cải thiện trải nghiệm đa ngôn ngữ**. Không có release chính thức, nhưng cộng đồng đang tích cực giải quyết các vấn đề tương thích cross-platform và lỗi integration quan trọng. Đáng chú ý là các vấn đề về Docker trên Windows, IME input, và ComfyUI workflow đã được xử lý khẩn cấp.

## 2. 📦 Releases

**Không có releases mới trong 24 giờ qua.** Tuy nhiên, khối lượng PR cho thấy team đang chuẩn bị cho một bản release lớn với nhiều bugfix quan trọng, đặc biệt là cho Windows users.

## 3. 🚀 Tiến độ dự án

### 🔥 Xu hướng phát triển chính

**A. Cross-platform Compatibility (Ưu tiên cao)**

- **Windows Support Overhaul**: 
  - 🐛 **#48162**: Sửa lỗi Chinese IME input không hiển thị trên Windows - vấn đề nghiêm trọng với `patch_stdout()` và VT mode
  - 🐛 **#48157, #48168**: Hai PR giải quyết Docker backend crash trên Windows native do drive-letter paths (`C:\Users\...`) không tương thích với `docker run -w`
  - 🐛 **#48155**: Sửa lỗi installer không thêm Node.js vào PATH cho npm lifecycle scripts
  - 🐛 **#48154**: Thêm khả năng đọc DIB/BMP images từ Windows clipboard (fallback khi PNG không khả dụng)
  - 🐛 **#47880, #47882**: Thêm `msvcrt` fallback cho file locking và process reconciliation trên Windows

**B. Gateway Infrastructure & Security**

- 🔐 **#48147**: Triển khai **relay channel authentication** giữa connector và gateway với signed-HTTP inbound receiver - một bước tiến lớn về bảo mật
- 🐛 **#48166**: Sửa lỗi nghiêm trọng: slash commands (`/model`, `/reason`) không hoạt động sau auto-reset do `was_auto_reset` flag không được consume đúng thứ tự
- 🐛 **#48165, #48151**: Sửa lỗi `strip_markdown` loại bỏ markdown bullet lists và literal asterisks trong SMS/iMessage/Feishu/QQ adapters
- 🐛 **#48153**: Sửa regex timestamp parser để hỗ trợ multi-word timezone names trên Windows
- 🐛 **#35283**: Fix quan trọng cho WeChat iLink - giải quyết vấn đề tin nhắn "chết" do stale session và zombie polling

**C. AI Integration & Model Support**

- 🐛 **#48170**: Strip Hermes `timestamp` metadata khỏi Chat Completions API payloads để tuân thủ strict schema
- 🐛 **#48123**: Serialize MiniMax tool results để tránh lỗi "tool call result does not follow tool call"
- 🐛 **#47881**: Sửa lỗi context length lookup khi model ID có slash-separated provider prefix
- 🐛 **#43277**: Sửa lỗi codex pool fallback không respect rate-limit cooldowns

**D. Desktop & UX Improvements**

- ✨ **#48163**: Thêm system tray support - close to tray thay vì quit
- 🐛 **#48160**: Sửa lỗi macOS updater bỏ qua Intel/x64 rebuild artifacts
- 🐛 **#48146**: Clear compaction flag để tránh status "Summarizing thread" bị stale
- 🐛 **#48148**: Scope messaging APIs theo active profile

**E. Skills & Tools Ecosystem**

- 🐛 **#48145, #48144, #48143**: **Ba PR song song** giải quyết vấn đề ComfyUI workflows bị crash do `_comment` metadata keys - vấn đề nghiêm trọng khiến creative skills không hoạt động out-of-the-box

### 📊 Metrics đáng chú ý

- **50 PRs tổng cộng**, 30 PR được highlight theo comments
- **18 issues mới/cập nhật** trong ngày
- **Tỷ lệ đóng PR**: 2/30 PRs đã merge/close trong ngày (~7% - cho thấy review process nghiêm ngặt)
- **Priority distribution**: P1 (1), P2 (11), P3 (16) - tập trung vào medium-priority bugfixes

## 4. 💬 Điểm nổi bật cộng đồng

### 🔝 Issues có nhiều tương tác

1. **#13072** (5 comments, 1 👍): **CLI Auto-Queue Mode with Smart Interrupt** - Feature request về khả năng queue messages thay vì cancel turn hiện tại. Đây là vấn đề UX quan trọng được cộng đồng ủng hộ.

2. **#27555** (7 comments): **Vision fallback_chain silently broken** - Bug nghiêm trọng về vision tool, kwargs mismatch (`base_url` vs `explicit_base_url`) gây TypeError bị nuốt im.

3. **#47006** (4 comments): **Custom-endpoint onboarding hard-fails** khi endpoint không expose `/v1/models` - ảnh hưởng đến Cohere, auth-gated gateways. Đã có PR fix (#48140).

### 👥 Contributor activity

- **@yubingz**: 4 PRs trong ngày - chủ yếu về Windows compatibility
- **@vanthinh6886**, **@kuangmi-bit**, **@tt-a1i**: Mỗi người 2-3 PRs - tập trung gateway và desktop fixes
- Đội ngũ phân tán địa lý (Chinese, Thai usernames) cho thấy cộng đồng quốc tế mạnh

## 5. 🐛 Ổn định & Bugs

### ⚠️ Critical Bugs được xử lý

1. **Docker on Windows Complete Failure** (#48137 → #48157, #48168)
   - **Severity**: P1/Critical
   - **Impact**: Docker backend hoàn toàn không hoạt động trên Windows native
   - **Root cause**: Drive-letter paths (`C:\`) không được normalize trước khi pass vào `docker run -w`
   - **Status**: 2 PRs đang review

2. **Vision Tool Silent Failure** (#27555)
   - **Severity**: P1
   - **Impact**: Vision fallback chain bị vô hiệu hóa hoàn toàn do TypeError
   - **Root cause**: Kwargs mismatch trong `_resolve_single_provider()`
   - **Status**: Issue open, chưa có PR fix

3. **ComfyUI Skills Broken Out-of-Box** (#48145, #48144, #48143)
   - **Severity**: P3 nhưng impact cao
   - **Impact**: Tất cả creative workflows trả về HTTP 500
   - **Root cause**: Bundled JSONs có `_comment` metadata keys
   - **Status**: 3 PRs song song đang review (overfix?)

### 🔧 Infrastructure Issues

- **Gateway message delivery reliability**: WeChat iLink adapter (#35283) có vấn đề stale session và zombie polling - đã fix lần thứ 3
- **Auth system**: Nhiều edge cases với credential pools, cooldowns, và plaintext storage (#48156)
- **File locking**: Cross-platform file locking không nhất quán (fcntl vs msvcrt)

## 6. ✨ Yêu cầu tính năng

### 🎯 Feature Requests nổi bật

1. **#13072 - CLI Auto-Queue Mode** (1 👍, 5 comments)
   - Cho phép queue messages thay vì cancel turn đang chạy
   - Bao gồm smart interrupt, crash recovery, và priority handling
   - **Rationale**: Hiện tại Hermes CLI cancel turn khi user gửi message mới, gây lãng phí context

2. **#48159 - Kanban Board in Desktop App** 
   - CLI và web dashboard đã có Kanban, Desktop thiếu
   - **Duplicate** của request trước đó
   - Độ ưu tiên: P3

3. **#21814 - `hermes usage` CLI command**
   - Expose token/quota info qua CLI và agent-accessible tool
   - Hiện chỉ có qua gateway `/usage` slash command

4. **#47885 - Inject Frequent File Paths** 
   - Auto-inject frequently-used file paths vào system prompt
   - **Problem**: LLM lãng phí iterations dùng `search_files` để tìm các file đã biết

### 🛡️ Security & Auth Features

- **#48156**: Request ngăn plaintext API key storage trong `auth.json` + fix credential pool merging
- **#48147**: Relay authentication infrastructure (đã có PR)

## 7. 📢 Phản hồi người dùng

### 😤 Pain Points chính

1. **Windows Experience**: 
   - Chinese IME broken (#48161)
   - Docker backend completely broken (#48137)
   - Clipboard images không đọc được (#48054 → #48154)
   - Node.js PATH issues trong installer (#48155)
   - **→ Cho thấy Windows testing coverage còn yếu**

2. **Gateway Reliability**:
   - WeChat messages "die" intermittently (#35283)
   - Slash commands reset unexpectedly (#48166)
   - Markdown formatting bị strip incorrectly (#48150)

3. **Model Compatibility**:
   - MiniMax Anthropic API reject valid payloads (#48123)
   - Custom endpoints hard-fail onboarding (#47006)
   - Metadata pollution in Chat API (#48170)

### 🎉 Positive Signals

- Cộng đồng đóng góp PRs rất nhanh (30 PRs/ngày)
- Issues được triage và label cẩn thận
- Multi-language support improving (Thai translation #15041, Chinese IME fixes)
- Gateway ecosystem mở rộng (WeChat, Telegram, Photon...)

## 8. 📋 Backlog & Roadmap

### 🔜 Immediate Priorities (dựa trên PR activity)

**Phase 1: Windows Stabilization** 
- ✅ Merge các Windows compatibility fixes (#48157, #48162, #48154, #48155, #47880, #47882)
- ⏳ Test Docker backend thoroughly trên Windows native
- ⏳ Add Windows-specific CI pipeline?

**Phase 2: Gateway Hardening**
- ✅ Deploy relay authentication (#48147)
- ⏳ Fix WeChat iLink reliability (#35283)
- ⏳ Review and standardize Markdown stripping logic across adapters

**Phase 3: Skills & Tools**
- ✅ Fix ComfyUI workflows (merge 1 trong 3 PRs duplicate)
- ⏳ Audit other bundled skills cho metadata issues
- ⏳ Add skill validation in CI

### 🔮 Medium-term Features

- **CLI Auto-Queue Mode** (#13072) - có community demand
- **Desktop Kanban View** (#48159) - parity với web dashboard
- **Auth Security Improvements** (#48156) - prevent plaintext storage
- **`hermes usage` CLI** (#21814) - developer QoL

### 📚 Documentation Debt

- **#8359**: Docs out of sync với ACP, pricing, Honcho, container CLI
- **#15041**: Thai translation guides part B in progress
- Multiple issues mention missing/incorrect documentation

---

## 🎓 Insights & Recommendations

### 🚨 Critical Actions

1. **Prioritize Windows support**: Khối lượng Windows bugs cho thấy platform này bị neglect trong testing. Cần:
   - Dedicated Windows CI pipeline
   - Windows-specific test matrix
   - Cross-platform smoke tests trước release

2. **Consolidate duplicate PRs**: 3 PRs fix cùng ComfyUI issue (#48143, #48144, #48145) - waste review bandwidth. Team cần:
   - Better PR coordination
   - Use draft PRs để signal work-in-progress

3. **Gateway architecture review**: WeChat issue được fix lần thứ 3 (#35283) cho thấy vấn đề design sâu hơn. Cần architectural refactor thay vì band-aid fixes.

### 💡 Opportunities

1. **Model compatibility layer**: Nhiều issues về model-specific quirks (MiniMax, Xiaomi, Nvidia). Consider abstraction layer để handle provider differences.

2. **Desktop feature parity**: Web dashboard có features (Kanban, usage stats) mà Desktop thiếu. Potential để improve Desktop UX.

3. **Community momentum**: 30 PRs/ngày là impressive. Có thể leverage này bằng:
   - Good first issue labels
   - Contributor guidelines
   - Architecture docs để reduce duplicate work

### 📈 Health Indicators

- ✅ **Velocity**: Rất cao (30 PRs/ngày)
- ⚠️ **Quality gate**: Merge rate thấp (7%) - có thể do review bottleneck hoặc PR quality issues
- ✅ **Community health**: Diverse contributors, international participation
- ⚠️ **Technical debt**: Accumulating (docs out of sync, platform-specific bugs, architectural issues)

---

**Tổng kết**: Hermes-Agent đang trong giai đoạn **rapid iteration** với focus mạnh vào **stability và cross-platform support**. Windows users đang có trải nghiệm kém, nhưng team phản ứng nhanh với nhiều fixes. Cần balance giữa velocity và quality, đặc biệt là testing coverage cho non-Linux platforms.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*