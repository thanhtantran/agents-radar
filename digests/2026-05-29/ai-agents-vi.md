# Bản tin Hệ sinh thái OpenClaw 2026-05-29

> Issues: 147 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-05-29 02:00 UTC

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

# Báo cáo phân tích OpenClaw - 2026-05-29

## 1. 📊 Tóm tắt hôm nay

OpenClaw đang trải qua giai đoạn ổn định hóa sau bản phát hành v2026.5.27, với trọng tâm vào việc sửa lỗi nghiêm trọng liên quan đến Codex runtime, native hook relay, và các kênh giao tiếp (Telegram, Feishu, Discord). Cộng đồng đang tích cực báo cáo các vấn đề về memory leak, session state, và message delivery - cho thấy dự án đang được sử dụng rộng rãi trong production.

## 2. 🚀 Releases

### v2026.5.27 (Phát hành: 2026-05-28)

**Điểm nổi bật về bảo mật:**
- 🔒 Tăng cường ranh giới bảo mật: group prompt text được tách khỏi system prompt
- 🛡️ Chặn command wrappers có side-effect và Node runtime env overrides không an toàn
- 🚫 Từ chối Tailscale exposure không có xác thực
- 👮 Node/device-role approvals giờ yêu cầu quyền admin

**Cải thiện Codex runtime:**
- ✅ Codex runtime models được resolve trước
- 📝 Workspace memo và thread state được xử lý đáng tin cậy hơn
- 🔄 Cải thiện khả năng phục hồi khi Codex app-server gặp sự cố

**Ý nghĩa:** Bản release này tập trung mạnh vào bảo mật và độ tin cậy của Codex integration - hai yếu tố quan trọng cho việc triển khai production.

## 3. 📈 Tiến độ dự án

### Pull Requests nổi bật:

**🔥 Đang được review tích cực:**

1. **#87785** - Fix CLI turn khi native harness owns compaction (P1, platinum hermit)
   - Giải quyết vấn đề budget-triggered compaction trên Codex sessions
   - Đã có proof từ self-hosted gateway

2. **#87489** - Enforce subagent run timeouts (P1, platinum hermit)
   - Đảm bảo subagent runs tuân thủ timeout đã cấu hình
   - Quan trọng cho reliability của long-running tasks

3. **#87794** - Refactor voice models through providers (P2, platinum hermit)
   - Catalog speech/TTS/transcription models thống nhất
   - Cải thiện voice model selection architecture

**🎯 Tính năng mới đáng chú ý:**

4. **#87849** - Codex supervisor plugin
   - Thêm tools để probe, list, read transcripts từ Codex app-server
   - Hỗ trợ MCP serve entrypoint

5. **#87568** - KaTeX math rendering support (P2, gold shrimp)
   - Render công thức toán học LaTeX trong chat UI
   - Có screenshot proof

**🔧 Cải thiện infrastructure:**

6. **#70543** - Normalized auto mode cho exec tool (P2, platinum hermit)
   - Guardian-reviewed Codex app-server execution
   - Cân bằng giữa security và usability

### Xu hướng phát triển:

- **Security-first approach**: Nhiều PR tập trung vào hardening boundaries và validation
- **Codex integration maturity**: Liên tục cải thiện reliability và error handling
- **Multi-channel stability**: Sửa lỗi cho Telegram, Discord, Feishu, WhatsApp
- **Voice/TTS refactoring**: Chuẩn bị cho voice capabilities mạnh mẽ hơn

## 4. 💬 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác nhất:

**🔴 #87395** (14 comments, 8 👍) - Native hook relay unavailable
- Vấn đề nghiêm trọng trên macOS sau update 2026.5.26
- Chặn memory/filesystem tools
- Cộng đồng đang tích cực debug và chia sẻ logs

**🔴 #48003** (10 comments, 2 👍) - Steer mode không inject messages mid-turn
- Bug từ commit March 3, 2026
- Ảnh hưởng đến session state và message flow
- Có source repro và linked PR

**🟡 #86519** (7 comments, 1 👍) - Agent lặp lại replies 2-10x trên Telegram
- Regression sau 5.20 update
- Đã giảm severity ở 5.22 nhưng chưa fix hoàn toàn
- Ảnh hưởng trực tiếp đến user experience

### Insight:
Cộng đồng đang rất active trong việc báo cáo bugs với logs chi tiết và reproduction steps. Điều này cho thấy:
- User base đang sử dụng OpenClaw trong production
- Chất lượng bug reports cao (có logs, environment details, repro steps)
- Maintainers responsive với labeling và triage

## 5. 🐛 Ổn định & Bugs

### Vấn đề nghiêm trọng (P1):

**🔥 Codex Runtime Issues:**
- **#87744** - Codex-backed Telegram turns timeout waiting for turn/completed
- **#87725** - Codex missing-terminal fallback leak vào Discord channel
- **#87511** - Inbound MCP bridge drops structuredContent

**🔥 Channel-specific Issues:**
- **#87646** - Feishu dispatch broken: "Cannot read property 'run' of undefined"
- **#87609** - WhatsApp: subsequent @mentions bị drop sau first mention
- **#87322** - Mattermost block streaming edits single post thay vì tạo separate messages

**🔥 Session State Issues:**
- **#87016** - Preflight compaction deadlock: bot bounces every message
- **#87736** - Regression: preflight compaction vẫn surface missing Codex thread failure

### Memory & Performance:

**#54155** (6 comments) - Gateway memory leak: 389MB → 14.7GB over 4 days
- Leak từ session accumulation
- Ảnh hưởng nghiêm trọng đến long-running deployments

**#85524** (3 comments) - Gateway crashes 6+ times/day do memory exhaustion
- Xuất hiện sau v2026.5.20
- macOS kills process via launchd

### Pattern nhận diện:
1. **Codex integration** vẫn là nguồn bugs chính
2. **Channel adapters** (Telegram, Feishu, WhatsApp) cần stabilization
3. **Memory management** là vấn đề cấp bách cho production deployments
4. **Session state handling** có nhiều edge cases chưa được xử lý

## 6. ✨ Yêu cầu tính năng

### Đang được implement:

**#9455** - Cron Jobs UI: filter bar
- Add filter/search cho jobs list
- Cải thiện UX khi có nhiều cron jobs

**#74100** - Skill Graph: lazy loading dependencies
- Giảm token consumption bằng cách load skills on-demand
- Quan trọng cho cost optimization

### Đề xuất mới:

**Voice & TTS:**
- #87777 - Speakeasy Telegram voice button
- #87794 - Voice model catalog refactoring
- Xu hướng: Tăng cường voice capabilities

**Developer Experience:**
- #87836 - Improve cron create delivery ergonomics
- #82596 - Exec denylist (bridge gap giữa allowlist và YOLO mode)

**Security & Policy:**
- #87074 - Reject unsupported policy keys
- #60841 - toolsAllow cannot re-expose core tools in embedded cron runs

## 7. 👥 Phản hồi người dùng

### Positive signals:

✅ **High engagement**: Issues có 10+ comments cho thấy users đang actively troubleshoot
✅ **Detailed reports**: Logs, environment details, reproduction steps đầy đủ
✅ **Multi-language community**: Issues bằng tiếng Trung (#87391, #74100) cho thấy adoption quốc tế

### Pain points:

❌ **Stability concerns**: 
- "Gateway crashes 6+ times daily" (#85524)
- "Bot bounces every message" (#87016)
- Memory leaks trong production (#54155)

❌ **Channel reliability**:
- Telegram duplicate messages (#86519)
- Feishu dispatch failures (#87646)
- WhatsApp mention handling (#87609)

❌ **Codex integration complexity**:
- Multiple timeout issues (#87744)
- Missing terminal fallback leaks (#87725)
- Thread state management (#87736)

### User sentiment:
Cộng đồng vẫn committed và patient, nhưng đang mong đợi stability improvements. Nhiều users đang run production workloads và cần reliability cao hơn.

## 8. 🗺️ Backlog & Roadmap

### Immediate priorities (dựa trên P1 issues):

1. **Codex Runtime Stabilization**
   - Fix timeout handling (#87744)
   - Improve error boundaries (#87725)
   - Better thread state management (#87736)

2. **Memory Management**
   - Address gateway memory leak (#54155)
   - Fix crash-loop issues (#85524)
   - Optimize session accumulation

3. **Channel Reliability**
   - Fix Feishu dispatch (#87646)
   - Resolve Telegram duplicates (#86519)
   - WhatsApp mention handling (#87609)

### Medium-term focus:

4. **Voice/TTS Enhancement**
   - Voice model catalog refactoring (#87794)
   - Telegram voice button (#87777)
   - Multi-provider voice support

5. **Developer Experience**
   - Exec denylist (#82596)
   - Cron ergonomics (#87836)
   - Better error messages

6. **Security Hardening**
   - Policy validation (#87074)
   - Tool permission model (#60841)
   - Boundary enforcement

### Strategic direction:

Dự án đang trong giai đoạn **maturation** - focus vào:
- 🎯 **Stability over features**: Ưu tiên fix bugs hơn là thêm tính năng mới
- 🔒 **Security hardening**: Liên tục cải thiện security boundaries
- 🌍 **Multi-channel support**: Mở rộng và ổn định hóa channel adapters
- 🤖 **Codex integration**: Đưa Codex runtime lên production-ready level

---

## 📌 Kết luận

OpenClaw đang ở giai đoạn quan trọng: có user base production đáng kể nhưng đang gặp stability challenges. Team đang response tốt với bug reports và có roadmap rõ ràng hướng tới stabilization. Bản v2026.5.27 cho thấy commitment về security và reliability - hai yếu tố cần thiết cho enterprise adoption.

**Khuyến nghị cho users:**
- ⚠️ Cân nhắc kỹ trước khi upgrade lên 2026.5.27 nếu đang dùng Codex/Telegram/Feishu
- 📊 Monitor memory usage nếu chạy long-running deployments
- 🐛 Report bugs với logs chi tiết để giúp team fix nhanh hơn

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 29/05/2026

## 1. 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trải qua giai đoạn **consolidation và maturation** với các dự án chuyển từ rapid feature development sang **stability, security, và production readiness**. Trong 24 giờ qua, 9 dự án chính đã tạo ra **214 PRs** và **88 issues**, cho thấy momentum phát triển cực kỳ mạnh mẽ.

### Đặc điểm chung:
- 🔒 **Security-first mindset**: Tất cả dự án đều ưu tiên bảo mật (CSRF, SSRF, credential management)
- 🌍 **Global expansion**: Tăng cường hỗ trợ đa ngôn ngữ và platforms châu Á (WeChat, Feishu, DingTalk)
- 🤖 **Multi-agent orchestration**: Xu hướng chuyển từ single-agent sang collaborative systems
- 🔌 **Provider ecosystem**: Mở rộng hỗ trợ nhiều LLM providers để tránh vendor lock-in
- 📱 **Multi-channel reliability**: Focus vào ổn định hóa integrations (Discord, Telegram, WhatsApp)

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ tương tác | Giai đoạn |
|-------|--------|-----|----------|---------------|------------------|-----------|
| **OpenClaw** | 147 | 500 | 2 | 🔥🔥🔥 Cao | ⭐⭐⭐⭐ Rất cao | Maturation |
| **NanoBot** | 11 | 20 | 0 | 🔥🔥🔥 Cao | ⭐⭐⭐ Cao | Rapid Growth |
| **Zeroclaw** | 17 | 42 | 0 | 🔥🔥 Trung bình | ⭐⭐⭐ Cao | Beta Prep |
| **PicoClaw** | 6 | 32 | 1 | 🔥🔥 Trung bình | ⭐⭐ Trung bình | Stabilization |
| **NanoClaw** | 5 | 7 | 0 | 🔥 Thấp | ⭐⭐ Trung bình | Consolidation |
| **IronClaw** | 18 | 50 | 0 | 🔥🔥🔥 Cao | ⭐⭐⭐ Cao | Reborn Phase |
| **LobsterAI** | 1 | 29 | 0 | 🔥🔥 Trung bình | ⭐ Thấp | Backlog Cleanup |
| **Moltis** | 8 | 5 | 0 | 🔥 Thấp | ⭐⭐ Trung bình | Maturation |
| **CoPaw** | 29 | 39 | 0 | 🔥🔥🔥 Cao | ⭐⭐⭐⭐ Rất cao | Active Polish |
| **GoClaw** | 2 | 15 | 3 | 🔥🔥🔥 Cao | ⭐⭐⭐ Cao | Beta Releases |
| **Hermes-Agent** | 7 | 50 | 2 | 🔥🔥🔥🔥 Cực cao | ⭐⭐⭐⭐⭐ Cực cao | Velocity Phase |

### Chỉ số nổi bật:

**🏆 Dự án năng động nhất**: 
- **Hermes-Agent** (50 PRs, 2 releases trong 1 ngày, 321 contributors)
- **OpenClaw** (500 PRs tổng, 14 comments/issue trung bình)

**🚀 Tốc độ phát triển cao nhất**:
- **NanoBot** (9 PRs merged trong 1 ngày)
- **GoClaw** (3 beta releases liên tiếp)

**👥 Cộng đồng tích cực nhất**:
- **CoPaw** (29 issues mới, nhiều first-time contributors)
- **OpenClaw** (60 👍 cho issue #80 về multi-provider support)

---

## 3. 🎯 Vị thế của OpenClaw

### Điểm mạnh:

✅ **Market leader về scale**:
- 500 PRs và 147 issues - lớn nhất trong hệ sinh thái
- Cộng đồng production users đông đảo (nhiều bug reports chi tiết)
- 2 releases chính thức (v2026.5.27) với changelog đầy đủ

✅ **Security leadership**:
- Bản v2026.5.27 tập trung mạnh vào security hardening
- Group prompt isolation, command wrapper blocking, Tailscale auth
- Node/device-role approvals require admin permissions

✅ **Enterprise-ready features**:
- Codex integration với reliability improvements
- Multi-channel support (Telegram, Discord, Feishu, WhatsApp)
- Voice/TTS capabilities đang được refactor

### Thách thức:

⚠️ **Stability issues**:
- Memory leaks nghiêm trọng (389MB → 14.7GB over 4 days)
- Gateway crashes 6+ times/day
- Codex runtime timeout và session management bugs

⚠️ **Vendor lock-in concerns**:
- Issue #80 (60 👍) về multi-provider support cho thấy users lo ngại Anthropic dependency
- Chưa có roadmap rõ ràng về provider diversification

⚠️ **Migration complexity**:
- v1 → v2 migration path chưa documented đầy đủ
- Breaking changes trong releases gây friction

### Vị trí chiến lược:

OpenClaw đang ở vị trí **"Mature Leader with Growing Pains"**:
- Có user base lớn nhất và feature set đầy đủ nhất
- Đang gặp typical challenges của scale (memory, stability, multi-tenancy)
- Cần balance giữa innovation và reliability để giữ vị thế

**So với competitors**:
- **vs Hermes-Agent**: OpenClaw ổn định hơn nhưng kém velocity
- **vs NanoBot**: OpenClaw có scale lớn hơn nhưng kém agility
- **vs IronClaw**: OpenClaw production-ready hơn nhưng kém về architecture modernization

---

## 4. 🔧 Hướng kỹ thuật chung

### Xu hướng được nhiều dự án áp dụng:

#### 1️⃣ **Security Hardening** (9/11 dự án)

| Dự án | Security Focus |
|-------|----------------|
| OpenClaw | Group prompt isolation, command blocking |
| NanoBot | Concurrency fixes, context boundary |
| Zeroclaw | Token invalidation, sandbox policy |
| PicoClaw | CSRF protection, path traversal validation |
| NanoClaw | Inbox confinement, symlink attack prevention |
| IronClaw | OAuth lifecycle, credential staging |
| GoClaw | SSRF prevention, vault hardening |
| CoPaw | Context overflow protection |
| Hermes-Agent | Discord role authorization |

**Insight**: Security không còn là afterthought mà là **core requirement** từ đầu.

#### 2️⃣ **Multi-Provider Strategy** (8/11 dự án)

**Drivers**:
- Anthropic account shutdowns (OpenClaw issue #80)
- Cost optimization (classifier_provider trong Zeroclaw)
- Regional availability (DeepSeek, MiniMax cho thị trường Trung Quốc)

**Implementations**:
- **Registry-driven configs** (NanoBot #3994)
- **Provider-specific quirks handling** (PicoClaw #2915)
- **Fallback chains** (Zeroclaw #6945)

#### 3️⃣ **Context Management** (7/11 dự án)

**Common challenges**:
- Context window overflow (CoPaw #4781, OpenClaw #87736)
- Token budget miscalculation (NanoBot #4041)
- Memory accumulation (OpenClaw #54155)

**Solutions**:
- Pre-truncation + emergency fallback (CoPaw #4787)
- Context snipping improvements (NanoBot #4041)
- Token usage visibility (CoPaw #4433)

#### 4️⃣ **Multi-Channel Reliability** (6/11 dự án)

**Focus platforms**:
- **Asia**: WeChat/WeCom, Feishu/Lark, DingTalk
- **Global**: Discord, Telegram, WhatsApp, Slack

**Common issues**:
- Message duplication (OpenClaw Telegram)
- Attachment handling (NanoBot, Moltis)
- Voice message support (Moltis Discord)

#### 5️⃣ **Developer Experience** (10/11 dự án)

**Trends**:
- **WebUI improvements**: Project workspaces (NanoBot), dashboard themes (Hermes)
- **CLI enhancements**: Slash commands (NanoBot Discord), cron ergonomics (OpenClaw)
- **Documentation**: Migration guides, API references
- **Testing**: Integration test expansion (IronClaw, GoClaw)

---

## 5. 🎨 Điểm khác biệt

### Chiến lược sản phẩm:

| Dự án | Positioning | Target Users | Differentiation |
|-------|-------------|--------------|-----------------|
| **OpenClaw** | Enterprise Platform | Large orgs, production | Scale, security, multi-channel |
| **NanoBot** | Developer-First | Power users, hackers | Velocity, community PRs |
| **Zeroclaw** | Configuration-Heavy | Advanced users | Granular control, policy engine |
| **IronClaw** | Architecture-First | Enterprises, TEE users | Reborn refactor, NEAR AI Cloud |
| **Hermes-Agent** | Velocity Leader | Researchers, early adopters | Massive contributor base, rapid iteration |
| **CoPaw** | Chinese Market | Domestic users | QwenPaw branding, local providers |
| **GoClaw** | Security-Focused | Compliance-heavy orgs | Vault, secure-CLI framework |

### Tính năng độc đáo:

🌟 **OpenClaw**: 
- Codex integration với app-server supervision
- Voice model catalog refactoring

🌟 **NanoBot**:
- Agent collaboration với cross-instance message bus
- GitAgent Protocol support

🌟 **Zeroclaw**:
- Granular sandbox policy (filesystem/network restrictions)
- Ephemeral daemon mode

🌟 **IronClaw**:
- Reborn architecture với staged credentials
- WeCom/Feishu websocket intake

🌟 **Hermes-Agent**:
- Kanban protocol cho task orchestration
- 16K → 3.8K lines refactoring trong run_agent.py

🌟 **CoPaw**:
- Workspace-organizing skill với knowledge graph
- Tmux control cho multi-agent orchestration

🌟 **GoClaw**:
- Secure-CLI credential adapters
- Workspace organizing với personal/team/delegate scopes

### Cộng đồng:

**Contributor diversity**:
- **Hermes-Agent**: 321 contributors (cực cao)
- **OpenClaw**: Mix core + community, high engagement
- **NanoBot**: Nhiều first-time contributors được support tốt
- **CoPaw**: Active Chinese community với detailed bug reports

**Response time**:
- **Moltis**: < 24h từ bug report → fix (xuất sắc)
- **NanoBot**: 9 PRs merged trong 1 ngày
- **GoClaw**: 3 beta releases liên tiếp để fix critical bugs

**Documentation quality**:
- **IronClaw**: Completion plans cho major features
- **GoClaw**: Comprehensive release notes
- **Hermes-Agent**: Detailed changelogs với contributor credits

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Tier 1: Mature Communities (4 dự án)

**OpenClaw** ⭐⭐⭐⭐⭐
- ✅ Large production user base
- ✅ Detailed bug reports với logs
- ✅ Multi-language community (Chinese issues)
- ⚠️ Cần improve migration documentation

**Hermes-Agent** ⭐⭐⭐⭐⭐
- ✅ 321 contributors trong 1 release
- ✅ Massive PR velocity (50/day)
- ✅ Responsive maintenance (hotfix trong cùng ngày)
- ✅ Clear roadmap và planning

**CoPaw** ⭐⭐⭐⭐
- ✅ Active Chinese community
- ✅ Many first-time contributors
- ✅ High issue engagement (29 new issues)
- ⚠️ Cần improve English documentation

**GoClaw** ⭐⭐⭐⭐
- ✅ Security-conscious community
- ✅ Fast iteration (3 betas in 1 day)
- ✅ Good contributor mix (core + community)
- ⚠️ Cần expand beyond security focus

### Tier 2: Growing Communities (4 dự án)

**NanoBot** ⭐⭐⭐⭐
- ✅ High merge velocity (9 PRs/day)
- ✅ Diverse contributors (11 active)
- ✅ Good first-time contributor support
- ⚠️ Cần improve issue triage (11 active issues)

**IronClaw** ⭐⭐⭐
- ✅ Strong technical discussions
- ✅ Clear architecture vision (Reborn)
- ⚠️ Long-standing issues (3 months)
- ⚠️ Cần improve community onboarding

**Zeroclaw** ⭐⭐⭐
- ✅ Active development (42 PRs)
- ✅ Good documentation in PRs
- ⚠️ Many stale PRs (15+ from April)
- ⚠️ Cần improve backlog management

**PicoClaw** ⭐⭐⭐
- ✅ Consistent nightly builds
- ✅ Good security practices
- ⚠️ Many stale PRs
- ⚠️ Low community engagement

### Tier 3: Emerging Communities (3 dự án)

**Moltis** ⭐⭐
- ✅ Excellent response time
- ✅ Quality over quantity
- ⚠️ Small contributor base
- ⚠️ Low issue volume

**NanoClaw** ⭐⭐
- ✅ Good technical quality
- ✅ Security-first approach
- ⚠️ Very low activity (7 PRs)
- ⚠️ Minimal community engagement

**LobsterAI** ⭐⭐
- ✅ Active backlog cleanup
- ⚠️ Low community interaction (1 issue)
- ⚠️ Many stale PRs
- ⚠️ Cần improve communication

---

## 7. 🔮 Tín hiệu xu hướng

### Xu hướng ngắn hạn (Q3 2026):

#### 1️⃣ **Consolidation Phase**
- Các dự án đang chuyển từ feature development sang stability
- Focus vào fixing technical debt và memory leaks
- Ưu tiên production readiness hơn new features

**Evidence**:
- OpenClaw: "Stability over features" trong roadmap
- NanoBot: 5 critical bugfixes trong 1 PR
- Hermes-Agent: Hotfix v0.15.1 trong cùng ngày với v0.15.0

#### 2️⃣ **Multi-Provider Ecosystem**
- Tất cả dự án đang mở rộng provider support
- Anthropic account shutdowns tạo urgency
- Cost optimization drives classifier routing

**Predictions**:
- Q3: Mọi dự án sẽ có ≥3 provider options
- Provider abstraction layers sẽ trở thành standard
- Regional providers (DeepSeek, MiniMax) sẽ gain traction

#### 3️⃣ **Asia-Pacific Expansion**
- 6/11 dự án đang tích hợp WeChat/Feishu/DingTalk
- Chinese market là growth driver chính
- Localization (i18n) trở thành priority

**Predictions**:
- Q3: WeChat/Feishu sẽ là tier-1 channels
- Chinese documentation sẽ match English quality
- Regional compliance features (data residency)

### Xu hướng trung hạn (Q4 2026 - Q1 2027):

#### 4️⃣ **Multi-Agent Orchestration**
- Chuyển từ single-agent sang collaborative systems
- Tmux control, PTY-based coordination
- Agent-to-agent communication protocols

**Evidence**:
- NanoBot: Agent collaboration với message bus
- CoPaw: Tmux control command
- Hermes-Agent: Kanban protocol

**Predictions**:
- Q4: Agent collaboration sẽ là standard feature
- Specialized agents cho specific domains
- Orchestration frameworks sẽ emerge

#### 5️⃣ **Enterprise Hardening**
- Security từ nice-to-have → must-have
- Compliance features (audit logs, access controls)
- Multi-tenancy và isolation

**Evidence**:
- GoClaw: Vault + secure-CLI framework
- IronClaw: Staged credentials + OAuth lifecycle
- OpenClaw: Admin-required approvals

**Predictions**:
- Q1 2027: SOC2/ISO27001 compliance sẽ là differentiator
- Enterprise pricing tiers sẽ xuất hiện
- Managed hosting options sẽ phổ biến

#### 6️⃣ **Developer Experience Revolution**
- WebUI trở thành first-class citizen
- CLI → GUI migration cho complex workflows
- Better debugging và observability tools

**Evidence**:
- NanoBot: Project workspaces, extension registry
- CoPaw: Dashboard improvements, token visibility
- Hermes-Agent: Log viewer integration

**Predictions**:
- Q4: Visual workflow builders sẽ xuất hiện
- Real-time debugging dashboards
- Plugin marketplaces sẽ mature

### Xu hướng dài hạn (2027+):

#### 7️⃣ **Standardization Wave**
- GitAgent Protocol adoption (NanoBot #4034)
- MCP (Model Context Protocol) sẽ trở thành standard
- Interoperability giữa các platforms

**Predictions**:
- 2027: Agent portability sẽ là reality
- Cross-platform agent migration tools
- Unified agent description format

#### 8️⃣ **Autonomous Operations**
- Self-modification capabilities (NanoClaw patch_bridge)
- Auto-healing và self-optimization
- Reduced human intervention

**Predictions**:
- 2027: Agents sẽ tự fix bugs trong infrastructure
- Auto-scaling based on workload
- Predictive maintenance

#### 9️⃣ **Vertical Specialization**
- Domain-specific agent frameworks
- Healthcare, finance, legal compliance agents
- Industry-specific skill libraries

**Predictions**:
- 2027: Vertical-specific forks sẽ xuất hiện
- Compliance-certified agent distributions
- Industry partnerships và certifications

---

## 8. 💡 Khuyến nghị chiến lược

### Cho OpenClaw:

**Ngắn hạn (Q3 2026)**:
1. ✅ **Ưu tiên stability**: Fix memory leaks và gateway crashes trước khi thêm features
2. 🔄 **Multi-provider roadmap**: Publish timeline cho OpenAI, Gemini, DeepSeek support
3. 📚 **Migration documentation**: Tạo comprehensive v1→v2 migration guide

**Trung hạn (Q4 2026)**:
4. 🤝 **Agent collaboration**: Implement cross-instance communication (học từ NanoBot)
5. 🌏 **Asia expansion**: Prioritize WeChat/Feishu stability (đang có nhiều bugs)
6. 🔒 **Enterprise features**: Multi-tenancy, audit logs, compliance certifications

**Dài hạn (2027)**:
7. 🎯 **Vertical focus**: Chọn 2-3 industries để specialize (healthcare, finance, legal)
8. 🔌 **Plugin ecosystem**: Tạo marketplace cho community extensions
9. 🏢 **Managed offering**: Launch hosted version với SLA guarantees

### Cho các dự án khác:

**NanoBot**: Leverage velocity advantage, focus on developer community growth
**Hermes-Agent**: Maintain momentum, avoid feature bloat
**IronClaw**: Complete Reborn migration, then focus on adoption
**CoPaw**: Expand beyond Chinese market với English documentation
**GoClaw**: Balance security focus với usability improvements

---

## 9. 🎯 Kết luận

Hệ sinh thái AI agent đang ở **inflection point** - chuyển từ experimental phase sang production-ready platforms. OpenClaw có vị thế leader nhưng đang đối mặt với **growing pains** về stability và scalability.

**Key takeaways**:
1. 🔒 **Security is table stakes** - không còn là competitive advantage
2. 🌍 **Global expansion is mandatory** - đặc biệt là Asia-Pacific
3. 🤖 **Multi-agent is the future** - single-agent paradigm đang lỗi thời
4. 👥 **Community velocity matters** - Hermes-Agent đang prove điều này
5. 🎨 **Developer experience wins** - WebUI và tooling là differentiators

**Biggest risk**: Vendor lock-in concerns có thể drive users sang competitors nếu OpenClaw không diversify providers nhanh.

**Biggest opportunity**: Enterprise market đang mở ra - dự án nào hardening sớm nhất sẽ win enterprise deals.

---

📅 **Ngày báo cáo**: 29/05/2026  
⏰ **Thời gian**: 02:03 UTC  
📊 **Nguồn**: GitHub API analysis của 11 dự án AI agent

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích Dự án NanoBot - Ngày 29/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 29/05 đánh dấu một đợt sửa lỗi và cải tiến mạnh mẽ với **9 PRs được merge** tập trung vào bảo mật, hiệu năng và trải nghiệm người dùng. Đặc biệt nổi bật là việc sửa 5 lỗi nghiêm trọng về concurrency và context management trong một PR duy nhất (#4041), cùng với các cải tiến về MCP reconnection, cron-based heartbeat, và Discord slash commands. Cộng đồng đang tích cực đóng góp với 11 PRs mới được mở, bao gồm các tính năng như agent collaboration, GitAgent Protocol support, và WebUI enhancements.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng các thay đổi được merge cho thấy dự án đang chuẩn bị cho một bản release ổn định với nhiều bugfix quan trọng.

---

## 📈 Tiến độ dự án

### ✅ PRs đã merge (9 PRs)

**🔒 Bảo mật & Ổn định**
- **#4041** - Sửa 5 lỗi nghiêm trọng về session, goal, streaming và context budget
  - Fix pending queue overwrite gây reroute messages (#4036)
  - Fix shared mutable context trong long_task/complete_goal (#4037)
  - Fix streaming retry duplicate deltas (#4038)
  - Fix context snipping bỏ qua tool-schema tokens (#4039)
  - Fix /stop không cancel task khi unified_session enabled (#4040)
  - **Impact**: Cải thiện đáng kể độ tin cậy trong môi trường concurrent

- **#4047** - Hardening MS Teams channel: validate service URLs trước khi reply
  - Ngăn chặn trust arbitrary serviceUrl values
  - Bảo vệ Bot Framework authentication boundary

**⚡ Hiệu năng & Kiến trúc**
- **#4023** - Migrate heartbeat service sang cron-based auto-registration
  - Loại bỏ standalone background loop
  - Giảm infrastructure overhead
  
- **#4031** - Thêm Discord `/model` slash command
  - Cho phép switch model presets trực tiếp từ Discord
  - Tích hợp native app command

**🛠️ Tính năng mới**
- **#3937** - User confirmation cho dangerous commands
  - Cơ chế xác nhận trước khi thực thi lệnh nguy hiểm
  - Tăng cường safety guardrails

### 🔄 PRs đang mở (11 PRs active)

**🌟 Tính năng nổi bật**

1. **#3992 - Agent Collaboration** (by @ysofologis)
   - Cross-instance message bus cho multi-agent communication
   - Cho phép nhiều nanobot instances giao tiếp với nhau
   - **Tiềm năng**: Mở ra khả năng distributed agent systems

2. **#4034 & #4030 - GitAgent Protocol Support** (by @computer-agent)
   - Thêm agent.yaml + SOUL.md theo chuẩn GitAgent Protocol
   - Tăng tính portable và interoperability
   - **Ý nghĩa**: Tích hợp vào hệ sinh thái agent chuẩn mở

3. **#4046 - Extension Registry** (by @Re-bin)
   - Thêm nanobot extension registry source
   - Hỗ trợ HyperFrames từ external registry
   - **Impact**: Mở rộng khả năng plugin ecosystem

**🎨 WebUI Improvements**

4. **#4007 - Project Workspaces** (by @Re-bin)
   - Codex-style project workspaces với folder binding
   - Access controls (default permission + full access)
   - **UX**: Cải thiện đáng kể workflow cho developers

5. **#4045 - Context Window Setting** (by @Re-bin)
   - UI cho chọn 64K hoặc 256K context window
   - Persist qua settings API

**🔧 Technical Improvements**

6. **#4027 - MCP Reconnection Fix** (by @bjoshuanoah)
   - Reset `_mcp_connected` khi session drop
   - Thêm reconnect callbacks
   - **Critical**: Sửa lỗi MCP không thể reconnect

7. **#3997 - Tokenizer Pre-warming** (by @outlook84)
   - Reuse shared tiktoken encoding
   - Pre-warm tokenizer at startup
   - Debug timing logs cho build-state
   - **Perf**: Giảm latency cho message processing

8. **#4017 - Parse Text-format Tool Calls** (by @bingqilinweimaotai)
   - Hỗ trợ providers emit tool calls as plain text
   - Compatibility với Xiaomi MiMo provider

9. **#3994 - Registry-driven Provider Config** (by @outlook84)
   - Provider-specific settings qua registry
   - Expose Bedrock region/profile
   - **Flexibility**: Dễ dàng thêm provider configs mới

10. **#3990 - Refactor Dream Class** (by @chengyongru)
    - Replace heavyweight Dream class với cron + process_direct
    - Single comprehensive dream.md template
    - **Simplification**: Giảm ~315 lines code

11. **#4016 - DingTalk Group User Isolation** (by @lmzopq)
    - Separate sessions per user trong group chat
    - Config `group_user_isolation`
    - **UX**: Tránh context interference giữa users

---

## 🌟 Điểm nổi bật cộng đồng

### 💬 Issues có nhiều tương tác

1. **#1922 - nanobot-webui** (👍 10, 12 comments)
   - Self-hosted web management panel
   - Full-featured dashboard với real-time chat
   - Multi-user support, MCP servers config
   - **Community interest**: Cao nhất, cho thấy nhu cầu về UI management

2. **#4044 - Short Term Memory Loss** (2 comments, mới)
   - Bot quên câu hỏi vừa hỏi
   - Root cause: Context window pressure + tool result injection
   - **User pain point**: Vấn đề UX nghiêm trọng đang được investigate

3. **#2772 - WeChat 10 messages limit** (7 comments)
   - Context token chỉ support 10 messages
   - **Platform limitation**: Cần workaround cho WeChat channel

### 🎭 Contributor Activity

- **@hamb1y**: Cực kỳ productive với 5 PRs trong 1 ngày (4 bugfixes + 1 feature)
- **@Re-bin**: Focus vào WebUI improvements (3 PRs)
- **@computer-agent**: Đề xuất GitAgent Protocol (2 PRs duplicate)
- **@chengyongru**: Refactoring work (heartbeat, dream)

---

## 🐛 Ổn định & Bugs

### ✅ Đã sửa (hôm nay)

1. **Concurrency Issues** (#4041) - **CRITICAL**
   - Session lock race conditions
   - Shared mutable state trong goal tools
   - Streaming retry duplicates
   - Context budget miscalculation
   - **Status**: ✅ Fixed và merged

2. **MCP Reconnection** (#4027)
   - Dead sessions không thể reconnect
   - **Status**: 🔄 PR đang review

3. **MS Teams Security** (#4047)
   - Untrusted service URLs
   - **Status**: ✅ Fixed và merged

### 🔍 Đang điều tra

1. **#4044 - Memory Loss**
   - Context window pressure
   - Tool result injection timing
   - **Severity**: High - ảnh hưởng UX trực tiếp
   - **Status**: 🔍 Root cause analysis ongoing

2. **#4006 - Orphaned Tool Results**
   - Tool results không có corresponding tool_calls
   - Violate OpenAI/Anthropic specs
   - **Status**: 🔄 Đang fix sau #3984

3. **#4042 - Matrix E2EE Verification**
   - Element X "unverified device" warning
   - Thiếu m.key.verification.* handling
   - **Status**: 🆕 Mới report, chưa có PR

---

## 💡 Yêu cầu tính năng

### 🎯 Đang implement

1. **Agent Collaboration** (#3992)
   - Multi-agent communication bus
   - **Use case**: Distributed agent systems, specialized agents cooperation

2. **Project Workspaces** (#4007)
   - Folder-scoped chats
   - Access controls
   - **Use case**: Developer workflow, code-focused agents

3. **Extension Registry** (#4046)
   - External plugin ecosystem
   - **Use case**: Community extensions, HyperFrames

### 📝 Đề xuất mới

1. **#4043 - Disable Document Extraction Config**
   - Tắt auto document extraction
   - **Rationale**: Conflict với docling skill, unnecessary với OCR workflow
   - **Status**: 🆕 Chưa có PR

2. **GitAgent Protocol** (#4034)
   - Standardized agent format
   - **Benefit**: Portability, ecosystem integration
   - **Status**: 🔄 PR đang review

3. **Context Window Selection** (#4045)
   - UI cho 64K/256K selection
   - **Status**: 🔄 PR đang review

---

## 👥 Phản hồi người dùng

### 😊 Positive

- **nanobot-webui** (#1922): Community rất appreciate self-hosted management panel
- **Discord slash commands** (#4031): Native integration được đón nhận tốt
- **Safety improvements** (#3937): User confirmation cho dangerous commands tăng trust

### 😟 Pain Points

1. **Memory/Context Issues** (#4044)
   - "Bot asks question, you answer, it forgets" - UX breaking
   - Context window management cần cải thiện

2. **Platform Limitations**
   - WeChat 10 messages limit (#2772)
   - Matrix E2EE verification (#4042)
   - **Challenge**: Balance platform constraints với functionality

3. **MCP Reliability** (#4027)
   - Reconnection failures frustrate users
   - **Impact**: External tool integration stability

### 🎨 UX Requests

- Project-scoped workspaces (đang implement)
- Better context window control (đang implement)
- Document extraction flexibility (#4043)

---

## 🗺️ Backlog & Roadmap

### 🔜 Near-term (dựa trên PR activity)

1. **Stability Focus**
   - ✅ Concurrency fixes (done)
   - 🔄 MCP reconnection (#4027)
   - 🔄 Memory loss investigation (#4044)
   - 🔄 Tool result pairing (#4006)

2. **WebUI Enhancements**
   - 🔄 Project workspaces (#4007)
   - 🔄 Context window settings (#4045)
   - 🔄 Extension registry (#4046)

3. **Provider Ecosystem**
   - 🔄 Registry-driven configs (#3994)
   - 🔄 Text-format tool calls (#4017)
   - 🔄 Provider-specific settings

### 🎯 Mid-term (emerging themes)

1. **Multi-Agent Systems**
   - Agent collaboration (#3992)
   - Cross-instance messaging
   - **Vision**: Distributed agent orchestration

2. **Standardization**
   - GitAgent Protocol (#4034)
   - Portable agent format
   - **Vision**: Ecosystem interoperability

3. **Platform Expansion**
   - DingTalk improvements (#4016)
   - Matrix E2EE (#4042)
   - MS Teams hardening (#4047)

4. **Architecture Simplification**
   - Cron-based services (#4023, #3990)
   - Remove heavyweight abstractions
   - **Vision**: Leaner, more maintainable codebase

### 📊 Metrics & Trends

- **Merge velocity**: 9 PRs merged trong 1 ngày - rất cao
- **Community PRs**: 11 active PRs từ diverse contributors
- **Focus shift**: Từ features → stability & UX refinement
- **Code quality**: Nhiều refactoring PRs (dream, heartbeat, tokenizer)

---

## 🎬 Kết luận

Ngày 29/05 là một ngày **cực kỳ productive** cho NanoBot với focus mạnh vào **stability và quality**. Việc merge 5 critical bugfixes trong một PR (#4041) cho thấy team đang nghiêm túc address technical debt. Đồng thời, các tính năng mới như agent collaboration, project workspaces, và extension registry cho thấy **vision dài hạn** về một platform mở rộng và có khả năng scale.

**Điểm mạnh**: Community engagement cao, diverse contributors, clear focus on both stability và innovation.

**Thách thức**: Memory/context management issues (#4044) cần được ưu tiên, platform-specific limitations cần creative solutions.

**Outlook**: Dự án đang ở giai đoạn maturity tốt, balance giữa fixing issues và building new capabilities. 🚀

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo Phân tích Zeroclaw - 29/05/2026

## 🎯 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn chuẩn bị phát hành **v0.8.0-beta-2** với hoạt động phát triển tích cực: 42 PR đang mở, 17 issue đang được theo dõi. Trọng tâm hôm nay là **cải thiện trải nghiệm người dùng** (TUI, onboarding), **tăng cường bảo mật** (token invalidation, sandbox policy), và **mở rộng tích hợp** (NEAR AI Cloud provider, file_download tool). Cộng đồng đang tập trung giải quyết các vấn đề tương thích API (DeepSeek-V4, MiniMax) và cải thiện trải nghiệm đa ngôn ngữ.

---

## 🚀 Releases

**Không có release chính thức trong 24h qua**, nhưng PR #6848 đang chuẩn bị nền tảng cho **v0.8.0-beta-2** với các thay đổi lớn:
- **Zerocode TUI**: Giao diện terminal mới cho người dùng cuối
- **RPC socket transport**: Cải thiện giao tiếp daemon
- **DenyWithEdit approval**: Cơ chế phê duyệt linh hoạt hơn
- ⚠️ **Breaking changes**: Loại bỏ `Delegates` và `fallback` behaviors cũ

---

## 📈 Tiến độ dự án

### 🔥 Các PR quan trọng đang hoạt động

#### **Bảo mật & Cơ sở hạ tầng**
- **#6988** 🔒 Fix token invalidation khi rotate/delete device - vấn đề bảo mật nghiêm trọng đã được phát hiện và sửa
- **#6996** 🛡️ RFC: Granular sandbox policy - đề xuất kiểm soát filesystem/network chi tiết hơn cho sandbox

#### **Trải nghiệm người dùng**
- **#6858** ✨ Cải thiện empty states trong TUI cho người dùng mới
- **#6952** ⌨️ Thêm Tab/Shift+Tab navigation cho bàn phím compact (giải quyết vấn đề với Logitech MX Keys Mini, Keychron)
- **#6995** 🐛 Fix backspace xóa từng byte thay vì từng ký tự UTF-8 (ảnh hưởng người dùng CJK)

#### **Tích hợp & Mở rộng**
- **#6957** 📥 Tool `file_download` mới - cho phép agent tải file từ remote vào workspace
- **#6842** 🌐 Thêm NEAR AI Cloud provider (TEE-backed inference)
- **#6665** 📤 Tool `channel_send` - cho phép agent gửi tin nhắn chủ động đến channels

#### **Tối ưu hóa**
- **#6945** 💰 Per-agent `classifier_provider` - route reply-intent checks đến model rẻ hơn (tiết kiệm chi phí)
- **#5838** 🔄 Webhook retry logic với exponential backoff

### 📊 Xu hướng phát triển
- **Modularization**: Tách `zeroclaw-tui` sang `apps/zerocode` (#6821)
- **Multi-platform**: ARM64 Docker support (#5187)
- **Localization**: Mở rộng hỗ trợ i18n (#6578, #6990)

---

## 💬 Điểm nổi bật cộng đồng

### 🔝 Issues được quan tâm nhất (theo reactions)

1. **#6059** (👍 4) - **DeepSeek-V4 API incompatibility** 
   - Vấn đề: Lỗi với thinking mode của DeepSeek-V4-Pro/Flash
   - Trạng thái: In-progress, priority P1
   - Ảnh hưởng: Người dùng Trung Quốc sử dụng DeepSeek

2. **#5674** (👍 3) - **Make `classify_channel_reply_intent` configurable**
   - Vấn đề: Gate "should I reply" không phù hợp với 1:1 chats
   - Đề xuất: Cho phép tắt trong private conversations
   - Trạng thái: In-progress, có PR #6945 đang giải quyết phần này

### 🆕 Issues mới hôm nay (28/05)

- **#6996** - RFC về granular sandbox policy (filesystem/network restrictions)
- **#6995** - Backspace bug với UTF-8 CJK characters
- **#6992** - Slack Socket Mode reject tất cả messages
- **#6991** - Tool serialization bỏ qua Risk Profile restrictions
- **#6990** - i18n: Đưa `file_download` tool strings vào Fluent
- **#6989** - Config: Redact bearer tokens trong headers maps

---

## 🐛 Ổn định & Bugs

### 🚨 Vấn đề nghiêm trọng (S1 - workflow blocked)

1. **#6361** - Context compression drops tool messages với OpenAI-compatible providers (MiniMax)
   - Gây tool loops và lỗi "invalid message role: system"
   - Ảnh hưởng: Multi-turn tool conversations không sử dụng được

2. **#6992** - Slack Socket Mode reject tất cả messages
   - Lỗi: "unauthorized user" cho mọi incoming message
   - Nguyên nhân: Có thể liên quan đến allowlist logic

3. **#6975** - `zeroclaw onboard` không ghi config
   - Hoàn thành interactive flow nhưng không tạo `[agents.*]` sections
   - Blocked: Chờ xác định root cause

### ⚠️ Vấn đề cao (S2 - degraded behavior)

- **#6059** - DeepSeek-V4 API format incompatibility
- **#6147** - Anthropic opus-4-7 temperature validation
- **#6991** - Native tool serialization bỏ qua restrictions
- **#6995** - UTF-8 backspace handling

### 🔧 Bugs đã được fix (PRs merged/closed hôm nay)

- **#6908** - Thêm Codex subscription auth cho OpenAI provider
- **#6994** - Default `strict_mention_in_thread` to true cho Slack

---

## ✨ Yêu cầu tính năng

### 🎯 Tính năng mới được implement

1. **File Download Tool** (#6957)
   - Cho phép agent tải files từ remote URLs vào workspace
   - Config-gated với `[file_download]` section
   - Hỗ trợ streaming và size limits

2. **Channel Send Tool** (#6665)
   - Agent có thể gửi messages chủ động đến channels
   - Hỗ trợ `default_target` config
   - Giải quyết vấn đề cron job results không được deliver

3. **Classifier Provider** (#6945)
   - Route reply-intent checks đến model rẻ hơn
   - Tiết kiệm chi phí khi main agent dùng expensive model

### 🔮 Đề xuất đang được thảo luận

1. **Ephemeral Daemon Mode** (#6818)
   - `--ephemeral` flag: daemon tự terminate khi không còn clients
   - Hữu ích cho CI/CD và temporary sessions

2. **Session-scoped Runtime Overrides** (#6817)
   - Thay đổi model/temperature per-session không cần reload daemon
   - Overrides chỉ ảnh hưởng session đó

3. **Granular Sandbox Policy** (#6996)
   - Kiểm soát filesystem/network chi tiết hơn
   - Config-driven restrictions cho từng tool

---

## 👥 Phản hồi người dùng

### 😊 Positive feedback

- **TUI improvements** (#6858, #6952): Cộng đồng đánh giá cao việc cải thiện first-run experience và keyboard navigation
- **Cost optimization** (#6945): Người dùng enterprise quan tâm đến tính năng tiết kiệm chi phí API

### 😓 Pain points

1. **Onboarding complexity** (#6975)
   - `zeroclaw onboard` không hoạt động đúng
   - Người dùng mới gặp khó khăn với config

2. **Multi-language support** (#6995, #6578)
   - UTF-8 handling chưa tốt cho CJK users
   - Nhiều strings chưa được localize

3. **Provider compatibility** (#6059, #6361)
   - DeepSeek-V4 và MiniMax gặp vấn đề
   - OpenAI-compatible providers chưa thực sự "compatible"

4. **Documentation gaps** (#6963, #5847)
   - `web_dist_dir` và nhiều settings khác thiếu docs
   - Người dùng phải đọc source code để hiểu config

---

## 🗺️ Backlog & Roadmap

### 📋 Ưu tiên cao (P1)

- Fix DeepSeek-V4 compatibility (#6059)
- Fix MiniMax tool message handling (#6361)
- Fix Slack Socket Mode authorization (#6992)
- Verify Anthropic opus-4-7 temperature (#6147)

### 📋 Ưu tiên trung bình (P2)

- Configurable reply intent classifier (#5674)
- Ephemeral daemon mode (#6818)
- Session-scoped overrides (#6817)
- Webhook retry logic (#5838)
- Channel reply pacing (#6389)

### 🔄 Refactoring & Tech debt

- Move zeroclaw-tui to apps/zerocode (#6821)
- Migrate Discord to AllowlistAspect (#6638)
- Memory strategy trait (#6907)
- ARM64 Docker support (#5187)

### 📚 Documentation

- Document web_dist_dir (#6963)
- Localize tool descriptions (#6990)
- Add self-test for tilde expansion (#6961)

---

## 🎓 Insights & Recommendations

### 🔍 Phân tích xu hướng

1. **Focus on production readiness**: Nhiều PRs tập trung vào bảo mật, error handling, và user experience - dấu hiệu dự án đang mature
2. **Multi-provider strategy**: Liên tục thêm providers mới (NEAR AI) và fix compatibility issues - mở rộng ecosystem
3. **Cost consciousness**: Tính năng như classifier_provider cho thấy quan tâm đến production costs
4. **Internationalization**: Tăng cường hỗ trợ non-English users (CJK, i18n)

### ⚡ Điểm mạnh

- Cộng đồng active với nhiều contributors
- Response time nhanh cho issues và PRs
- Comprehensive testing và verification
- Clear documentation trong PRs

### 🎯 Điểm cần cải thiện

- **Onboarding experience**: Cần ưu tiên fix #6975 và cải thiện first-run flow
- **Provider compatibility**: Cần test suite tốt hơn cho OpenAI-compatible providers
- **Documentation**: Nhiều features thiếu docs, gây confusion cho users
- **Breaking changes**: v0.8.0-beta-2 có nhiều breaking changes, cần migration guide rõ ràng

---

**📅 Ngày báo cáo**: 29/05/2026  
**⏰ Thời gian**: 02:00 UTC  
**📊 Nguồn dữ liệu**: GitHub API - zeroclaw-labs/zeroclaw

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 29/05/2026

## 1. 📊 Tóm tắt hôm nay

Ngày 29/05 chứng kiến hoạt động phát triển tích cực với **nightly build v0.2.9** được phát hành. Dự án tập trung vào cải thiện bảo mật (CSRF protection, path traversal validation), tối ưu hiệu năng (CPU/Memory/IO), và mở rộng hỗ trợ đa ngôn ngữ với bản dịch tiếng Czech hoàn chỉnh. Đáng chú ý là các PR về sửa lỗi workspace guard và cải thiện xử lý lỗi LLM đã được đóng sau quá trình review.

## 2. 🚀 Releases

### Nightly Build v0.2.9-nightly.20260529
- **Loại**: Automated nightly build (có thể không ổn định)
- **Mục đích**: Cung cấp phiên bản thử nghiệm mới nhất cho early adopters
- **Lưu ý**: Đây là bản build tự động, người dùng nên thận trọng khi sử dụng trong môi trường production

## 3. 🔧 Tiến độ dự án

### Pull Requests đang hoạt động (Open)

**Bảo mật & Hardening:**
- **#2900** - Thêm CSRF protection, path traversal validation và security headers cho web backend
- **#2965** - Sửa lỗi workspace guard hiểu nhầm scheme-less URLs (ví dụ: `curl wttr.in/Beijing`)

**Tối ưu hiệu năng:**
- **#2916** - Tối ưu CPU, Memory và IO (đã được đánh dấu stale nhưng vẫn open)
- **#2913** - Sửa lỗi hot-path cloning trong JSONL session index và cải thiện TTL refresh

**Tính năng mới:**
- **#2964** - Thêm image input compression với chính sách nén đa cấp có thể cấu hình
- **#2917** - Thêm NEAR AI Cloud provider với hỗ trợ TEE-capable models
- **#2915** - Thêm CommonModels cho MiMo provider (mimo-v2.5 multimodal, mimo-v2.5-pro text-only)

**Quốc tế hóa:**
- **#2932** - Thêm bản dịch tiếng Czech hoàn chỉnh (792/792 strings)

**Sửa lỗi:**
- **#2947** - Sửa model ID của claude-sonnet-4.6 (từ dấu chấm sang dấu gạch ngang)
- **#2934** - Cho phép WhatsApp native mode với flag `use_native`
- **#2907** - Sửa metadata drift trong JSONL store sau crash
- **#2905** - Sửa xử lý fallback chain cho expired contexts

### Pull Requests đã đóng (Closed)
- **#2918, #2920** - Dependency updates (larksuite, anthropic SDK)
- **#2858** - Cho phép quoted heredoc markdown bodies trong exec tool
- **#2768** - Retry transient LLM HTTP errors
- **#2693** - Block `find /` bypass workspace sandbox
- **#2950** - Thêm FUNDING.yml (đã đóng, có thể do trùng lặp với #2912)

### Xu hướng phát triển
- **Bảo mật**: Tăng cường validation và protection mechanisms
- **Hiệu năng**: Tối ưu memory footprint và I/O operations
- **Mở rộng provider**: Tích hợp thêm AI providers (NEAR AI, MiMo)
- **Quốc tế hóa**: Mở rộng hỗ trợ ngôn ngữ (Czech)
- **Stability**: Sửa các edge cases về crash consistency và context handling

## 4. 💬 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:
- **#2887** (7 comments) - Bug nghiêm trọng: .deb version trên RISC-V không hoạt động với OpenAI model
  - Ảnh hưởng đến người dùng Debian/RISC-V architecture
  - Đang được cộng đồng tích cực thảo luận

- **#2916** (3 comments) - CPU, Memory và IO optimizations
  - Đề xuất tối ưu toàn diện cho hiệu năng hệ thống
  - Có phân tích chi tiết về source code và patterns

### Issues đã giải quyết:
- **#1738** - Thêm OpenAI API format channel support (đã đóng)
- **#2855** - Extend message tool để hỗ trợ media attachments (đã đóng)
- **#2912** - Đề xuất thêm FUNDING.yml (đã đóng, có thể đã implement)
- **#2944** - Sửa X509 certificate error trên Termux (đã đóng)

## 5. 🐛 Ổn định & Bugs

### Bugs đang được xử lý:

**Nghiêm trọng:**
- **RISC-V compatibility** (#2887): .deb package không hoạt động với OpenAI model trên RISC-V
  - Ảnh hưởng: Người dùng Debian/RISC-V không thể sử dụng OpenAI models
  - Trạng thái: Đang điều tra

**Đã sửa/Đang review:**
- **Workspace sandbox bypass** (#2693, #2965): Các lỗ hổng cho phép truy cập file ngoài workspace
- **JSONL crash consistency** (#2907): Metadata drift sau khi process crash
- **Context expiration handling** (#2905): Fallback chain không dừng đúng cách khi context expired
- **LLM retry logic** (#2768): Transient HTTP 500 errors không được retry đúng cách

### Cải thiện bảo mật:
- CSRF protection cho web backend (#2900)
- Path traversal validation (#2900)
- Security headers (#2900)
- Workspace guard improvements (#2965)

## 6. ✨ Yêu cầu tính năng

### Đã implement/Đang implement:

**Providers & Models:**
- NEAR AI Cloud provider với TEE-capable models (#2917)
- MiMo provider với multimodal support (#2915)
- OpenAI API format channel support (#1738 - đã đóng)

**Media handling:**
- Image input compression với configurable multi-level policy (#2964)
- Media attachments trong message tool (#2855 - đã đóng)

**Channel improvements:**
- WhatsApp native mode support (#2934)
- Multiple instances của cùng provider type (#2551)

**Developer experience:**
- Czech locale (792/792 strings) (#2932)
- GitHub Sponsors integration (#2912, #2950)

### Đề xuất từ cộng đồng:
- Tối ưu CPU/Memory/IO (#2916) - đang được phân tích chi tiết
- Cải thiện error handling và retry logic

## 7. 👥 Phản hồi người dùng

### Trải nghiệm tích cực:
- Cộng đồng đánh giá cao việc mở rộng hỗ trợ providers (NEAR AI, MiMo)
- Đề xuất thêm FUNDING.yml cho thấy mong muốn hỗ trợ tài chính cho dự án

### Vấn đề người dùng gặp phải:

**Platform-specific:**
- RISC-V users gặp vấn đề với .deb package (#2887)
- Termux users gặp X509 certificate errors (đã fix #2944)

**Configuration:**
- WhatsApp native mode không hoạt động với cấu hình mặc định (#2934)
- Claude model ID sai format gây 404 errors (#2947)

**Security concerns:**
- Workspace sandbox có thể bị bypass qua `find /` và `ls /` (#2693)
- Scheme-less URLs bị workspace guard chặn nhầm (#2965)

### Feedback về documentation:
- Người dùng đề xuất cải thiện documentation về funding options
- Cần làm rõ hơn về native mode configuration cho các channels

## 8. 📋 Backlog & Roadmap

### Đang trong pipeline (Open PRs):

**Ưu tiên cao:**
- Bảo mật: CSRF protection, path validation (#2900)
- Stability: JSONL crash consistency (#2907), context handling (#2905)
- Performance: CPU/Memory/IO optimizations (#2916)

**Ưu tiên trung bình:**
- Provider expansion: NEAR AI (#2917), MiMo (#2915)
- Feature enhancements: Image compression (#2964), WhatsApp native (#2934)
- Refactoring: Channel identification decoupling (#2551)

**Ưu tiên thấp:**
- I18n: Czech locale (#2932)
- Bug fixes: Model ID corrections (#2947)
- Dependencies: Multiple dependency update PRs (#2919-2927, #2960-2963)

### Vấn đề cần giải quyết:
- **RISC-V compatibility** (#2887) - chưa có PR
- **Stale PRs**: Nhiều PRs đã được đánh dấu stale, cần review và quyết định merge/close

### Xu hướng phát triển tiếp theo:
1. **Stability & Security**: Ưu tiên sửa các lỗi crash consistency và security vulnerabilities
2. **Performance**: Tối ưu resource usage cho production deployments
3. **Provider ecosystem**: Mở rộng hỗ trợ thêm AI providers
4. **Multi-platform**: Giải quyết các vấn đề platform-specific (RISC-V, Termux)
5. **Developer experience**: Cải thiện configuration, documentation và i18n

---

**Tổng kết**: PicoClaw đang trong giai đoạn phát triển tích cực với focus vào stability, security và performance. Dự án có cộng đồng đóng góp đa dạng với nhiều PRs chất lượng. Tuy nhiên, cần chú ý đến việc quản lý backlog (nhiều stale PRs) và giải quyết các platform-specific issues để mở rộng user base.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - 29/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 29/05 chứng kiến hoạt động tích cực với 4 PR được merge trong vòng 24 giờ, tập trung vào **bảo mật**, **tích hợp đa nền tảng** và **nâng cấp SDK**. Dự án đang giải quyết các vấn đề cốt lõi về độ tin cậy WhatsApp, race condition SQLite, và mở rộng khả năng self-modification của agent. Cộng đồng quan tâm đến việc hỗ trợ nhiều LLM provider hơn (issue #80 với 60 👍).

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng có nhiều cập nhật quan trọng được merge vào main branch.

---

## 📈 Tiến độ dự án

### ✅ PRs đã merge (4 PRs)

**🔐 Bảo mật & Hardening**
- **#2630** - Confine target inbox roots: Ngăn chặn symlink attack vào thư mục `inbox` của session, bổ sung lớp bảo vệ cho attachment handling
  - *Ý nghĩa*: Tăng cường bảo mật cho multi-agent environment, ngăn agent độc hại ghi file ra ngoài sandbox

**🔧 Nâng cấp Core Dependencies**
- **#2637** - Bump claude-code CLI (2.1.128 → 2.1.154) và agent-runner SDK (0.2.128 → 0.3.154)
  - SDK 0.3.x chuyển Anthropic SDK sang peer dependency
  - Cập nhật MCP SDK lên 1.29.0
  - *Ý nghĩa*: Theo kịp upstream improvements, chuẩn bị cho tính năng mới

**🤖 Self-Modification Framework**
- **#2635** - `patch_bridge` action: Cho phép agent (đặc biệt là Pero) đề xuất patches cho host-side `taskosaur-mcp` bridge
  - Flow: Agent tạo diff → Host validate → Approval workflow → Apply patch
  - *Ý nghĩa*: Agent có thể tự sửa bugs trong infrastructure code, giảm can thiệp thủ công

**📱 iOS Reliability**
- **#2639** - Cải thiện độ ổn định iOS (chi tiết kỹ thuật không rõ từ tóm tắt)

### 🔄 PRs đang mở (3 PRs)

**☁️ AWS Integration**
- **#2634** - Skill `add-paws4claws`: Tích hợp AWS credential proxy daemon
  - Mount wrapper theo pattern "mount-from-outside"
  - Tạo bearer token, config `.env.paws`

**💬 WhatsApp Critical Fixes**
- **#2633** - Sửa 2 structural bugs trên Baileys 7.x:
  1. Adapter tự hủy session khi reconnect
  2. Shutdown logic xóa auth state
  - *Tác động*: WhatsApp với `WHATSAPP_PHONE_NUMBER` hiện không ổn định, cần merge gấp

**📝 Notion Integration**
- **#102** - Skill tích hợp Notion API qua MCP server (đang pending từ 06/02)
  - Cho phép agent đọc/tạo/cập nhật Notion pages và databases

---

## 🔥 Điểm nổi bật cộng đồng

### 🏆 Issue được quan tâm nhất

**#80 - Support multiple LLM providers** (60 👍, 34 comments)
- **Bối cảnh**: Anthropic đang shutdown accounts sử dụng với OpenClaw
- **Yêu cầu**: Hỗ trợ OpenCode, Codex, Gemini, các provider khác
- **Trạng thái**: CLOSED (đã được giải quyết?)
- *Insight*: Cộng đồng lo ngại vendor lock-in, muốn flexibility trong việc chọn LLM backend

### 📊 Hoạt động gần đây

- **5 issues mới** trong 24-48 giờ qua (4 bugs, 1 feature request)
- Tập trung vào **production reliability**: SQLite race conditions, WhatsApp stability, credential injection

---

## 🐛 Ổn định & Bugs

### 🚨 Critical Issues

**#2638 - WhatsApp engage_mode=mention bug**
- `mention` mode engage trên mọi message trong 1-on-1 chat, kể cả khi bot là third party
- Làm sai default behavior cho WhatsApp wirings
- *Mức độ*: High - ảnh hưởng UX trực tiếp

**#2640 - SQLite READONLY_ROLLBACK race condition**
- `delivery.ts` poll `outbound.db` readonly mỗi 1s
- Race với journal file (1-5ms lifetime) → SQLITE_READONLY_ROLLBACK errors
- *Mức độ*: Medium - log spam, có thể ảnh hưởng performance

**#2633 (PR) - WhatsApp session destruction**
- 2 structural bugs làm mất paired sessions trên Baileys 7.x
- *Mức độ*: Critical - làm mất kết nối WhatsApp

### 🔧 Đang được xử lý

- WhatsApp reliability: 2 PRs (#2633, #2639) đang address
- SQLite race: Issue mới mở, chưa có PR
- Engage mode logic: Issue mới, cần refactor

---

## 💡 Yêu cầu tính năng

**#2636 - OneCLI credential injection cho MCP servers**
- **Vấn đề**: MCP servers nhận placeholder `"onecli-managed"` thay vì credentials thực
- **Đề xuất**: Inject credentials vào env vars khi spawn container
- **Use case**: MCP servers cần gọi external APIs với credentials được quản lý tập trung
- *Ý nghĩa*: Cải thiện security posture, tránh hardcode credentials

**#2632 - Telegram multi-bot identity trong v2**
- Làm rõ status của feature `/add-telegram-swarm` từ v1
- User đang plan migration, cần guidance
- *Insight*: Migration path từ v1 → v2 chưa rõ ràng cho advanced features

---

## 💬 Phản hồi người dùng

### 😟 Pain Points

1. **Vendor lock-in lo ngại**: Anthropic shutdown accounts → cần multi-provider support
2. **WhatsApp instability**: Production users gặp session loss
3. **Migration complexity**: v1 → v2 migration path chưa documented đầy đủ
4. **Credential management**: MCP servers không nhận được credentials đúng cách

### 😊 Positive Signals

- Cộng đồng actively contribute PRs (7 PRs từ 6 contributors khác nhau)
- Self-modification framework được mở rộng (agent có thể patch infrastructure)
- Security-first mindset: Nhiều PRs focus vào hardening

---

## 🗺️ Backlog & Roadmap

### 🎯 Ưu tiên cao (suy luận từ activity)

1. **Stabilize WhatsApp integration** - 2 PRs đang active
2. **Fix SQLite race conditions** - Issue mới, cần investigation
3. **Improve credential injection** - Feature request với use case rõ ràng
4. **Document v2 migration** - User đang blocked

### 🔮 Xu hướng phát triển

- **Self-modification capabilities**: Agent ngày càng autonomous hơn (patch_bridge)
- **Multi-platform reliability**: Focus vào iOS, WhatsApp, Telegram
- **Security hardening**: Liên tục patch symlink attacks, sandbox escapes
- **Integration ecosystem**: Notion, AWS (paws4claws), MCP servers

### 📝 Technical Debt

- Baileys 7.x compatibility issues (WhatsApp)
- SQLite journal_mode race conditions
- Engage mode logic cần refactor
- v1 → v2 migration documentation gaps

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn **consolidation và hardening** sau khi release v2. Dự án ưu tiên **production reliability** (WhatsApp, SQLite) và **security** (inbox confinement, credential management) hơn là thêm features mới. Cộng đồng tích cực contribute nhưng cần guidance rõ ràng hơn về migration và advanced features. Self-modification framework là điểm sáng, cho thấy vision về truly autonomous agents.

**Khuyến nghị theo dõi**: PRs #2633 (WhatsApp fix) và issue #2640 (SQLite race) - hai vấn đề ảnh hưởng production stability.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo Phân tích IronClaw - Ngày 29/05/2026

## 🎯 Tóm tắt hôm nay

Dự án IronClaw đang trong giai đoạn tái cấu trúc lớn với nhánh **Reborn**, tập trung vào việc hoàn thiện hệ thống xác thực OAuth, tích hợp các kênh giao tiếp mới (WeCom, Feishu/Lark), và cải thiện kiến trúc runtime. Hoạt động chính xoay quanh việc đóng các khoảng trống bảo mật trong credential management, triển khai WebUI v2 với Google SSO, và mở rộng khả năng tích hợp với các nền tảng messaging châu Á.

---

## 📦 Releases

**Không có release chính thức trong 24h qua**, nhưng PR #3708 đang chuẩn bị release:
- `ironclaw_common`: 0.4.2 → 0.5.0 (⚠️ breaking changes)
- `ironclaw`: 0.24.0 → 0.29.0

Các thay đổi breaking chủ yếu liên quan đến enum discriminant values, cho thấy đang có refactoring sâu về data structures.

---

## 🚀 Tiến độ dự án

### **Xu hướng chính: Reborn Architecture Consolidation**

#### 1️⃣ **Hệ thống xác thực & bảo mật** (Ưu tiên cao)

**Đã hoàn thành:**
- ✅ **PR #4174** - Google OAuth refresh lifecycle với token rotation tự động
- ✅ **PR #4182** - WebUI v2 Google SSO với PKCE S256, CSRF protection
- ✅ **PR #3903** - Đóng các khoảng trống credential boundary trong production

**Đang triển khai:**
- 🔄 **Issue #4176** - Wire auth consumers qua staged credentials
- 🔄 **Issue #4175** - Cung cấp durable production product-auth ports
- 🔄 **PR #4224** - Manual token auth gate cho WebUI v2

**Vấn đề bảo mật đang tranh luận:**
- ⚠️ **Issue #3917** - `RuntimeCredentialTarget::PathPlaceholder` có nên giữ hay loại bỏ? (4 comments, chưa resolved)
  - Đây là primitive injection credentials vào URL path segments
  - Có nguy cơ leak qua logs, proxies, browser history
  - Đang cân nhắc giữa tiện lợi vs bảo mật

#### 2️⃣ **Tích hợp kênh messaging châu Á**

**WeCom (WeChat Work):**
- 🐛 **Issue #4191** - Validation findings cho WeCom channel (v0.29.0 staging)
  - Core messaging flow ổn định ✅
  - Pairing/reconnect/persistence hoạt động tốt ✅
  - **Vấn đề nghiêm trọng:**
    - Vision analysis resolve sai/stale images (#4197)
    - Owner không thấy unpaired user conversations (#4198)

**Feishu/Lark:**
- 🔄 **PR #4178** - Websocket event intake cho Feishu
  - Decode binary protobuf frames
  - Merge fragments, enqueue events, ACK processed frames
  - Giữ webhook fallback mode

#### 3️⃣ **Runtime & Extensions Architecture**

**Đã merge:**
- ✅ **PR #4214** - Refactor host runtime HTTP egress pipeline
  - Tách egress logic ra khỏi monolithic `lib.rs` (1828 lines)
  - Tạo pipeline rõ ràng: validation → credential injection → transport → response
- ✅ **PR #4216** - Consolidate PKCE math vào `ironclaw_common::pkce`
  - Loại bỏ duplicate code giữa 3 crates

**Đang phát triển:**
- 🔄 **PR #4219** - Web Access extension (Exa MCP search)
- 🔄 **PR #4223** - Port NEAR AI MCP sang Reborn extensions
- 🔄 **PR #4186** - Wire local-dev approval gates

#### 4️⃣ **Developer Experience**

- ✅ **PR #4212** - Project skill activations to WebUI (live feedback)
- ✅ **PR #4196** - Expose work summary projections cho driver progress
- ✅ **PR #4184** - Typed diff display previews (unified diff cho file changes)

---

## 💬 Điểm nổi bật cộng đồng

### **Top Issues theo tương tác:**

1. **Issue #3917** (4 comments) - PathPlaceholder security debate
   - @zmanian đặt câu hỏi về security tradeoffs
   - Team đang cân nhắc giữa developer convenience vs production safety

2. **Issue #4176** (3 comments) - Auth consumer wiring
   - Follow-up từ production auth review
   - Liên quan đến #4161, #4160, #4175

3. **Issue #4085** (3 comments) - RESOLVED by #3887
   - Production builders giờ require `TenantSandboxProcessPort`
   - CI tests đã pass

### **Contributor Activity:**

- **@serrrfirat** (core) - 10 PRs, chủ yếu về Reborn extensions & auth
- **@henrypark133** (core) - 6 PRs, focus vào auth lifecycle & refactoring
- **@hanakannzashi** (core) - 2 PRs, Feishu integration & auth cleanup
- **@italic-jinxin** (experienced) - WebUI v2 Google SSO
- **@danielwpz** (new) - 2 docs PRs về completion plans
- **@neo-sky** (new) - IronHub tool installation (#3737, XL size)

---

## 🐛 Ổn định & Bugs

### **Critical Issues:**

1. **Vision Analysis Bug (#4197)** - WeCom
   - Severity: High
   - Impact: Phân tích sai hình ảnh, trả về screenshots cũ thay vì ảnh hiện tại
   - Status: Open, chưa có fix

2. **Unpaired User Visibility (#4198)** - WeCom
   - Severity: Medium
   - Impact: Owner không thấy conversations của unpaired users
   - Unclear: Đây là intended privacy behavior hay bug?

### **Đã fix:**

- ✅ **PR #4211** - Truncate glob scan budget results thay vì fail với Resource error
- ✅ **PR #4210** - Classify invalid tool input as model error (không phải recovery failure)
- ✅ **PR #4208** - Tighten builtin HTTP input diagnostics
- ✅ **PR #4207** - Admit final replies deterministically (stepping stone cho turn-ending strategy)

### **CI/Infrastructure:**

- ✅ **PR #4221** - Fix `/benchmark` command (scope id-token: write)
- ✅ **PR #4220** - Grant id-token: write cho OIDC → AWS
- ✅ **PR #4217** - Track @main thay vì pin SHA cho bench workflow

---

## 💡 Yêu cầu tính năng

### **Đang triển khai:**

1. **IronHub Tool Installation (#3737)** - XL PR
   - Install tools/skills từ IronHub by name
   - CLI commands: `ironclaw ironhub install/search/list/info`
   - Agent có thể install runtime thay vì chỉ build-time
   - Gateway HTTP endpoints với HMAC verification

2. **Approval Gates (#4186)**
   - Local-dev approval-aware authorizer
   - Convert effectful capability calls thành approval gates
   - Giữ local-dev-yolo mode cho testing

3. **Extensions Ecosystem:**
   - Web Access extension (Exa search) - #4219
   - NEAR AI MCP - #4223
   - Extension search without query - #4218 (merged)

### **Planned (từ docs):**

- **Slack MVP Completion** (#4169) - Execution plan đã có
- **Product Workflow Routing** (#4164) - Completion plan đã có
- **GitHub + NEAR OAuth providers** (#4204) - Follow-up từ Google SSO

---

## 👥 Phản hồi người dùng

### **Positive:**

- WeCom core messaging flow "mostly stable" ✅
- Pairing/reconnect/persistence "working well" ✅
- Markdown/emoji/multilingual support hoạt động tốt ✅

### **Pain Points:**

1. **Vision analysis không reliable** - Đây là blocker cho use cases cần xử lý hình ảnh
2. **Owner visibility gaps** - Khó debug/monitor unpaired user interactions
3. **PathPlaceholder security concerns** - Developers lo ngại về credential leakage

### **Developer Experience:**

- Nhiều refactoring PRs cho thấy team đang chủ động improve code quality
- Docs PRs (#4169, #4164) cho thấy có planning process rõ ràng
- CI improvements (#4217, #4220, #4221) cho thấy đang stabilize automation

---

## 🗺️ Backlog & Roadmap

### **Immediate (đang active):**

1. **Auth Consolidation** - Track A (#4215)
   - Consolidate PKCE math ✅
   - Wire staged credentials (#4176)
   - Durable product-auth ports (#4175)
   - Manual token auth gate (#4224)

2. **Channel Expansion:**
   - WeCom bug fixes (#4197, #4198)
   - Feishu websocket intake (#4178)
   - Slack MVP completion (planned)

3. **Runtime Improvements:**
   - Make HTTP egress async end-to-end (#4206)
   - Zeroize injected credentials (#4222)
   - OAuth callback token cleanup (#4202)

### **Medium-term:**

1. **Product-adapter credential bridge** (#4203) - Telegram bot token via host egress
2. **Product-facing auth HTTP surfaces** (#4201) - Manual-token, recovery, refresh, cleanup
3. **Decompose ironclaw_host_runtime/src/lib.rs** (#4209) - Extract egress modules

### **Long-term (từ open issues):**

- IronHub ecosystem maturity (#3737)
- Full approval gates production deployment
- Multi-provider OAuth (GitHub, NEAR)

---

## 📈 Insights & Trends

### **Architecture Evolution:**

Dự án đang trải qua **major architectural shift** với Reborn:
- Từ monolithic → modular pipeline architecture
- Từ ad-hoc auth → staged credential management
- Từ Western-centric → global messaging platforms

### **Security-First Approach:**

- Nhiều issues/PRs về credential safety (#3917, #4222, #3903)
- PKCE, CSRF, token rotation được implement đầy đủ
- Team đang debate tradeoffs (convenience vs security)

### **Developer Velocity:**

- **30 PRs merged trong 24h** - tốc độ cao
- Nhiều "size: XL" PRs cho thấy đang tackle complex problems
- Docs PRs cho thấy có planning discipline

### **Community Health:**

- Mix tốt giữa core contributors và new contributors
- Issues được respond nhanh (trong ngày)
- CI/automation được maintain actively

---

## ⚠️ Rủi ro & Khuyến nghị

### **Rủi ro:**

1. **Breaking changes trong v0.5.0** - Cần communication plan cho users
2. **WeCom vision bug** - Có thể impact production users
3. **PathPlaceholder security** - Cần quyết định nhanh trước khi ship

### **Khuyến nghị:**

1. Prioritize WeCom vision bug fix (#4197) - đây là user-facing issue
2. Resolve PathPlaceholder debate (#3917) - đang block security review
3. Document migration path cho v0.5.0 breaking changes
4. Consider feature flags cho experimental channels (WeCom, Feishu)

---

**📊 Tổng kết:** IronClaw đang trong giai đoạn phát triển mạnh mẽ với focus rõ ràng vào security, global expansion, và developer experience. Team có velocity cao nhưng cần balance giữa new features và stability.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# Báo cáo Phân tích Dự án LobsterAI - Ngày 29/05/2026

## 📊 Tóm tắt hôm nay

Dự án LobsterAI đang trong giai đoạn tích cực xử lý backlog với 29 PRs được cập nhật, tập trung vào việc đóng các PRs cũ và merge các tính năng mới. Hoạt động chính xoay quanh việc hoàn thiện hệ thống Kit (chuyên gia套件), cải thiện trải nghiệm plugin, và xử lý các vấn đề kỹ thuật tồn đọng. Một issue mới về lỗi tạo định thời vụ được báo cáo nhưng chưa có phản hồi.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### Tính năng chính được merge hôm nay:

**🎯 Hệ thống Kit (Chuyên gia套件) - PR #2060** ✅ MERGED
- Giới thiệu khái niệm mới: đóng gói nhiều Skills thành một Kit có thể cài đặt một chạm
- Xây dựng Kit marketplace với giao diện duyệt, tìm kiếm, cài đặt/gỡ cài đặt
- Tích hợp Kit vào input dialog với Popover đa chọn và Badge hiển thị
- Hỗ trợ "Try Asking" và lưu trạng thái Kit draft xuyên suốt các phiên
- **Ý nghĩa**: Nâng cao trải nghiệm người dùng bằng cách đơn giản hóa việc quản lý và sử dụng nhiều kỹ năng cùng lúc

**🔌 Plugin Management Improvements - PRs #2068, #2069** ✅ MERGED
- **PR #2068**: Tối ưu hiệu suất bằng batch write - thay vì lưu ngay lập tức mỗi thay đổi, giờ đây tất cả thay đổi được gom lại và chỉ restart gateway một lần khi nhấn Save
- **PR #2069**: Thêm nút "Check Updates" thủ công cho plugins từ npm và ClawHub, hiển thị phiên bản mới và xác nhận trước khi cập nhật
- **Ý nghĩa**: Cải thiện đáng kể trải nghiệm quản lý plugin, giảm thiểu gián đoạn và tăng khả năng kiểm soát

**🖼️ Image Preview Enhancement - PR #2061** ✅ MERGED
- Cho phép click vào thumbnail ảnh trong input để xem ở kích thước đầy đủ
- Tái sử dụng ImagePreviewModal hiện có
- **Ý nghĩa**: Cải thiện UX khi làm việc với ảnh đính kèm

**🐛 Critical Bug Fixes:**
- **PR #2070**: Sửa lỗi artifact detection - giới hạn phân tích file paths chỉ cho image generation tools, tránh nhầm lẫn với output của các lệnh khác
- **PR #2066**: Sửa lỗi nghiêm trọng với MCP stdio processes trên Windows - các process con không được kill đúng cách, gây rò rỉ tài nguyên. Giờ sử dụng `taskkill /T` để kill toàn bộ process tree
- **PR #2067**: Sửa lỗi Kit try-asking không chuyển đổi thành skills khi nhảy sang trang chat

### Xu hướng phát triển:

📊 **Tỷ lệ PR được xử lý**: 6/29 PRs được merge/close trong ngày, 23 PRs vẫn đang open (nhiều được đánh dấu stale)

🔄 **Chiến lược dọn dẹp backlog**: Team đang tích cực review và đóng các PRs cũ, đặc biệt là những PR đã stale từ tháng 4

## 💬 Điểm nổi bật cộng đồng

**Issue #2071 - Lỗi tạo định thời vụ** 🆕
- Báo cáo mới nhất (28/05), chưa có bình luận hay phản hồi
- Người dùng @AK-blank gặp lỗi khi tạo scheduled task
- Phiên bản: 2026.5.27
- **Mức độ ưu tiên**: Cần được xem xét sớm vì liên quan đến tính năng core

**Các PRs có nhiều hoạt động:**
- Hầu hết PRs không có bình luận công khai, cho thấy review có thể diễn ra qua kênh nội bộ
- Không có PR nào có reactions (👍) đáng kể

## 🔧 Ổn định & Bugs

### Bugs được sửa hôm nay:

✅ **Vấn đề nghiêm trọng về quản lý process (PR #2066)**
- MCP stdio processes không được cleanup đúng cách trên Windows
- Gây rò rỉ tài nguyên hệ thống
- Đã được patch với giải pháp kill process tree

✅ **Artifact detection false positives (PR #2070)**
- Command output bị nhầm lẫn với file paths
- Đã được scope lại chỉ cho image generation tools

✅ **Kit integration bugs (PR #2067)**
- Kit không được chuyển đổi thành skills khi navigate
- Redux state không đồng bộ

### Bugs đang chờ xử lý:

⏳ **Issue #2071 - Scheduled task creation error**
- Mới được báo cáo, chưa có investigation
- Cần reproduce và phân tích root cause

⏳ **Nhiều PRs stale từ tháng 4** đang chờ review:
- Memory leak trong CopyButton (#1478)
- Duplicate skill installation (#1479)
- Scheduled task bugs (#1482, #1547, #1550)
- Agent ID collision (#1584, #2065)

## ✨ Yêu cầu tính năng

### Tính năng mới được implement:

🎁 **Kit System (PR #2060)** - Đã merge
- Marketplace cho expert kits
- One-click installation
- Integration với chat interface

🔄 **Plugin Update Checker (PR #2069)** - Đã merge
- Manual update check
- Support cho npm và ClawHub sources

### Tính năng đang trong pipeline (PRs open):

🗣️ **Text-to-Speech cho AI responses (PR #1682)**
- Sử dụng Web Speech API
- Zero dependencies
- Có animation cho speaking state

🔍 **Global Search Enhancement (PR #1634)**
- Sửa lỗi search bị giới hạn bởi current agent
- Cải thiện UX của search panel

🎨 **UI/UX Improvements:**
- Model selector với vendor icons (PR #1628)
- Scheduled tasks UI overhaul với card grid (PR #1488)
- Agent-specific welcome messages (PR #1660)

## 👥 Phản hồi người dùng

### Vấn đề người dùng quan tâm:

1. **Scheduled Tasks Stability**: Nhiều issues và PRs liên quan đến scheduled tasks cho thấy đây là pain point
   - Lỗi tạo task mới (#2071)
   - Notification channel bugs (#1547, #1550)
   - Task description clearing (#1482)

2. **Agent Management**: Vấn đề về Agent ID collision và data resurrection (#1584, #2065) cho thấy cần cải thiện lifecycle management

3. **Plugin Experience**: Các cải tiến về plugin management được ưu tiên cao, phản ánh nhu cầu của power users

### Trải nghiệm tích cực:

- Kit system được thiết kế tốt với documentation đầy đủ
- Batch operations cho plugin settings cải thiện performance
- Image preview enhancement là quality-of-life improvement được đánh giá cao

## 🗺️ Backlog & Roadmap

### Backlog hiện tại:

**🔴 High Priority (cần xử lý sớm):**
- Issue #2071: Scheduled task creation error (mới, chưa có response)
- PR #2065: Agent ID collision fix (duplicate của #1584)
- Memory leaks và resource cleanup issues

**🟡 Medium Priority (đang review):**
- TTS feature (PR #1682)
- Global search fix (PR #1634)
- UI/UX improvements (PRs #1628, #1488, #1660)

**🟢 Low Priority (stale, cần quyết định):**
- 15+ PRs được đánh dấu stale từ tháng 4
- Cần review để quyết định merge, close, hoặc request changes

### Xu hướng phát triển:

📍 **Focus areas:**
1. **Stability First**: Ưu tiên sửa bugs và memory leaks
2. **Plugin Ecosystem**: Tiếp tục cải thiện plugin và Kit experience
3. **UX Polish**: Nhiều PRs về UI/UX improvements
4. **Technical Debt**: Đang dọn dẹp backlog và stale PRs

🎯 **Chiến lược tiếp theo** (dự đoán):
- Tiếp tục merge các tính năng UX đã được review kỹ
- Xử lý scheduled tasks issues (nhiều reports)
- Cleanup stale PRs để giảm backlog
- Stabilize Kit system sau khi merge

---

**📌 Kết luận**: LobsterAI đang trong giai đoạn consolidation, tập trung vào stability và UX improvements. Kit system là highlight lớn nhất, trong khi scheduled tasks vẫn là area cần attention. Team đang tích cực dọn dẹp backlog nhưng cần tăng tốc độ review để tránh PRs bị stale thêm.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Báo cáo phân tích dự án Moltis - 29/05/2026

## 1. 📊 Tóm tắt hôm nay

Ngày 28-29/05 là một ngày sửa lỗi tích cực với **4 PRs được merge** giải quyết các vấn đề quan trọng về tích hợp Discord, cron jobs, và tương thích với nhà cung cấp MiniMax. Đội ngũ phản ứng nhanh với các bug reports, đóng 5 issues trong vòng 24 giờ. Một PR mới về tích hợp tmux control đang được review, mở rộng khả năng điều phối multi-agent.

## 2. 🚀 Releases

Không có release chính thức trong 24 giờ qua.

## 3. 💻 Tiến độ dự án

### PRs đã merge (4 PRs)

**🔧 Sửa lỗi quan trọng:**

- **#1081** - Khắc phục Discord voice messages bị drop im lặng
  - Thêm logging chi tiết cho gateway events
  - Phân biệt được drops từ gateway vs handler
  - Bao gồm metadata về attachments và flags

- **#1078** - Sửa lỗi MiniMax provider (error 2013)
  - Strip user `name` fields để tránh conflict trong group chat
  - Chuyển quirks handling vào provider catalog metadata
  - Cải thiện khả năng tương thích với OpenAI-compatible providers

- **#1080** - Sửa lỗi fork message (#1075)
  - Fork giờ bao gồm cả response được click, không chỉ prompt
  - Thêm Playwright regression test

- **#1079** - Sửa lỗi cron execution target (#1072)
  - Preserve explicit sandbox overrides trong cron jobs
  - Ngăn agent preset xóa cấu hình "Execution Target: Host"

### PRs đang mở (1 PR)

- **#1082** - Tính năng tmux control command mới
  - Thêm `/tmux` channel command cho allowlisted users
  - Kiểm soát tmux server từ xa với validation
  - Hỗ trợ autonomous multi-agent orchestration

**Xu hướng:** Dự án đang tập trung vào **stability và developer experience**, sửa các edge cases trong tích hợp channel (Discord) và execution environment (cron, sandbox).

## 4. 🌟 Điểm nổi bật cộng đồng

### Issue có tương tác cao:

- **#235** (👍 1, 6 comments) - PTY-based interactive Claude Code CLI control
  - Vấn đề kỹ thuật phức tạp về subprocess terminal detection
  - Quan trọng cho autonomous multi-agent orchestration
  - Đang được thảo luận tích cực từ tháng 2

### Vấn đề người dùng quan tâm:

- **Tích hợp Discord**: Voice messages và attachments (#817, #1081)
- **Cron jobs**: Execution target và sandbox behavior (#1072, #1079)
- **Multi-provider support**: Tương thích MiniMax (#1077, #1078)
- **UX improvements**: Fork behavior (#1075, #1080)

## 5. 🐛 Ổn định & Bugs

### Bugs đã giải quyết (5 issues closed):

✅ **#1077** - MiniMax error 2013 (user name consistency)
- Root cause: Group chat với multiple senders gây conflict
- Fixed trong PR #1078

✅ **#1075** - Fork tại prompt thay vì response
- UX issue: Users muốn fork từ assistant response
- Fixed trong PR #1080

✅ **#1072** - Cron jobs chạy sandbox khi đánh dấu "Host"
- Configuration override bị agent preset ghi đè
- Fixed trong PR #1079

✅ **#817** - Discord voice messages bị drop im lặng
- Thiếu logging để debug
- Fixed trong PR #1081

✅ **#385** - Webapp connection issues
- Closed (có thể đã resolve hoặc không reproduce được)

✅ **#333** - Cron agentTurn fails với empty model
- Model defaulting issue trong cron payload

**Đánh giá:** Đội ngũ có response time xuất sắc (< 24h từ report đến fix), cho thấy quy trình CI/CD và testing mature.

## 6. 💡 Yêu cầu tính năng

### Đang được implement:

- **#1082** - Tmux control command
  - Cho phép inspect và control tmux sessions từ channels
  - Gated access với allowlist
  - Use case: Remote debugging và multi-agent coordination

### Đang được thảo luận:

- **#906** - Sub-agents configurable trong WebUI
  - Hiện tại sub-agents chỉ config được qua code/config files
  - Users muốn GUI để quản lý

- **#235** - PTY-based Claude Code control
  - Cho phép agent frameworks spawn Claude Code với interactive mode
  - Critical cho autonomous orchestration workflows

**Insight:** Dự án đang mở rộng theo hướng **multi-agent orchestration** và **remote control capabilities**, phù hợp với trend AI agent frameworks.

## 7. 👥 Phản hồi người dùng

### Positive signals:

- Users actively reporting bugs với detailed context (preflight checklist được follow)
- Quick turnaround từ bug report → fix → merge tạo trust
- Community đang test edge cases (Discord voice, MiniMax provider, cron jobs)

### Pain points:

- **Configuration complexity**: Sandbox vs host execution, model defaults trong cron
- **Channel integrations**: Discord attachments/voice handling chưa robust
- **Multi-provider quirks**: Mỗi provider có behaviors khác nhau (MiniMax user names)

### User expectations:

- Muốn **GUI configuration** cho advanced features (sub-agents)
- Cần **better diagnostics** khi có lỗi (logging improvements được appreciate)
- Quan tâm đến **autonomous agent capabilities** (PTY control, tmux integration)

## 8. 📋 Backlog & Roadmap

### Short-term (đang active):

- ✅ Stability fixes cho Discord, cron, providers
- 🔄 Tmux control integration (#1082)
- 🔄 PTY-based Claude Code control (#235)

### Medium-term (từ community requests):

- Sub-agents WebUI configuration (#906)
- Improved multi-provider compatibility
- Better diagnostic logging across channels

### Long-term direction (inferred):

Dự án đang hướng tới **enterprise-grade multi-agent orchestration platform** với:
- Remote control capabilities (tmux, PTY)
- Robust channel integrations (Discord, etc.)
- Flexible execution environments (sandbox vs host)
- Multi-provider AI model support

---

## 🎯 Kết luận

Moltis đang trong giai đoạn **maturation** với focus vào stability và developer experience. Tốc độ phản hồi bugs xuất sắc (4 fixes trong 1 ngày) cho thấy đội ngũ committed và quy trình development hiệu quả. Roadmap ngầm định hướng tới autonomous multi-agent orchestration, một lĩnh vực đang hot trong AI ecosystem 2026.

**Điểm mạnh:** Fast iteration, responsive team, clear focus on real user problems

**Cơ hội cải thiện:** Documentation cho complex features, GUI cho advanced configs, standardized provider compatibility layer

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo phân tích dự án CoPaw (QwenPaw) - 29/05/2026

## 1. 📊 Tóm tắt hôm nay

Dự án đang trong giai đoạn tích cực cải thiện trải nghiệm người dùng với **29 issues mới** và **39 PRs** được tạo/cập nhật. Trọng tâm chính là **tối ưu hóa UI/UX cho phiên bản desktop**, **cải thiện quản lý context và token**, và **sửa lỗi ổn định hệ thống**. Đáng chú ý là nhiều đóng góp từ first-time contributors, cho thấy cộng đồng đang phát triển tích cực.

## 2. 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng có PR #4752 bump version lên **v1.1.10-beta.1**, báo hiệu chu kỳ pre-release mới sắp bắt đầu.

## 3. 🔧 Tiến độ dự án

### PRs quan trọng đã merge/đang review:

**✅ Đã merge:**
- **#4755**: Sửa lỗi input draft bị refill sau khi gửi tin nhắn
- **#4751**: Tối ưu chat input cho mobile với safe area và virtual keyboard
- **#4654, #4657**: Cải thiện UI cho Header, Environments và Security pages
- **#4588**: Tự động reload trang sau khi cài/gỡ plugin

**🔄 Đang review:**
- **#4762**: Thêm tab "Open Directory" cho Coding Mode - cho phép mở project local mà không cần copy
- **#4787**: Sửa lỗi shell output quá lớn làm tràn context window (#4781)
- **#4779**: Bundle CLI `qwenpaw` vào desktop package để sửa lỗi cron job
- **#4772**: Tối ưu startup trên Windows với lazy loading (giảm thời gian khởi động xuống ~40ms)
- **#4745**: Sprint 1.3 integration tests - mở rộng coverage với 39 test cases mới
- **#4433**: Hiển thị thông tin token usage trong mỗi conversation

### Xu hướng phát triển:

📈 **3 trục chính:**
1. **Desktop experience** - Sửa lỗi Tauri, cải thiện cron jobs, bundle CLI
2. **Context management** - Giải quyết vấn đề context blowup, hiển thị token usage
3. **UI/UX polish** - Mobile adaptation, input draft persistence, timezone handling

## 4. 🌟 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

**🔥 #4739 (6 comments)**: Tool call timeout → agent chờ user input thay vì tiếp tục
- Vấn đề nghiêm trọng ảnh hưởng workflow automation
- Cần fix logic state machine của agent

**💬 #4754 (7 comments)**: Hỏi về phương án đóng gói exe
- Người dùng muốn hiểu sự khác biệt giữa 2 phiên bản desktop (standard vs Tauri)
- Phản ánh nhu cầu documentation rõ ràng hơn

**📋 #4652 (4 comments)**: Đề xuất cải thiện hệ thống memory
- Yêu cầu "tổng kết - liên kết - nhắc nhở" thay vì chỉ ghi log
- Cộng đồng muốn agent "học" từ lịch sử, không chỉ lưu trữ

### First-time contributors:

🎉 **3 contributors mới** đóng góp PRs chất lượng:
- @SnowTQ: Fix scrollbar flicker (#4766) và SVG attribute error (#4765)
- @wangfei010313: Tối ưu Windows startup (#4772)

## 5. 🐛 Ổn định & Bugs

### Bugs nghiêm trọng:

**🚨 Ưu tiên cao:**
- **#4781 + #4787**: Shell output quá lớn (263KB) làm tràn context window
  - Fix: 2-layer defense với pre-truncation và emergency fallback
  
- **#4739**: Agent hang sau tool call timeout
  - Ảnh hưởng: Workflow automation bị gián đoạn
  
- **#4788**: OneBot channel thường xuyên disconnect
  - NapCat không thể kết nối, phải restart thủ công

**⚠️ Ưu tiên trung bình:**
- **#4773**: Desktop version không tìm thấy `qwenpaw cron` command
- **#4774**: Input box giữ nội dung cũ khi switch giữa các tab
- **#4764**: Desktop không thể quay lại sau khi mở external link
- **#4777**: Shell command popup CMD window làm phiền user

### Bugs đã fix:
✅ #4774, #4775, #4784, #4786 đã được close (có thể đã fix trong beta)

## 6. 💡 Yêu cầu tính năng

### Tính năng được đề xuất nhiều:

**🎯 Configuration & Management:**
- **#4758**: Refactor config system - tách global/agent scope, versioning, comparison playground
- **#4757**: Auto provider fallback khi hit rate limit (giống cc-switch)
- **#4761**: Agent sharing - đóng gói plugin và deploy remote với triggers

**📊 UX Improvements:**
- **#4782**: Hiển thị context usage (current/total) trong chat UI
- **#4780**: Click vào session list item để mở chat (thay vì phải click nút "View")
- **#4770**: Đổi thứ tự cột trong session list (đưa timestamp ra trước)
- **#4746**: Sắp xếp history theo thời gian conversation gần nhất

**🛠️ Developer Experience:**
- **#4759**: Coding mode với VSCode-compatible editor và import folder trực tiếp
- **#4769**: Minimize to background thay vì đóng app
- **#4767**: Hiển thị token info cho mỗi session

**⏰ Cron Jobs:**
- **#4778**: Cải thiện UX tạo cron job (hiển thị tên session, đơn giản hóa input)
- **#4776**: Tắt popup notification khi cron chạy (hoặc làm optional)

## 7. 💬 Phản hồi người dùng

### Sentiment tích cực:
✨ Cộng đồng đánh giá cao tốc độ phát triển và responsive của team
✨ First-time contributors được hỗ trợ tốt, PRs được review nhanh

### Pain points chính:

**🎨 UI/UX:**
- Desktop experience chưa mượt (popup windows, navigation issues)
- Mobile support còn hạn chế (safe area, keyboard handling)
- Thiếu visual feedback cho long-running operations

**⚙️ Configuration:**
- Config system phức tạp, khó so sánh giữa các versions
- Thiếu auto-fallback khi provider fail
- Timezone handling gây confusion

**🧠 Memory & Context:**
- Memory system chỉ log, không tổng hợp kiến thức
- Context window dễ bị overflow với tool outputs lớn
- Thiếu visibility về token usage

**📱 Desktop App:**
- Cron jobs không hoạt động ổn định
- External links và downloads có bugs
- Startup chậm trên Windows

## 8. 📅 Backlog & Roadmap

### Đang trong pipeline (dựa trên PRs under review):

**v1.1.10-beta.1 (sắp release):**
- ✅ Token usage visibility (#4433)
- ✅ Windows startup optimization (#4772)
- ✅ Context overflow protection (#4787)
- ✅ Desktop CLI bundling (#4779)
- ✅ Coding mode directory import (#4762)

**Sprint tiếp theo (dự đoán):**
- 🔄 Configuration refactoring (#4758)
- 🔄 Provider auto-fallback (#4757)
- 🔄 Agent sharing & deployment (#4761)
- 🔄 Memory system enhancement (#4652)
- 🔄 Integration test expansion (#4745)

### Technical debt cần giải quyết:
- 🔧 State machine logic cho agent tool calls
- 🔧 OneBot channel stability
- 🔧 LaTeX rendering quality (#4756)
- 🔧 Mobile responsive design
- 🔧 Timezone consistency across UI

---

## 📈 Kết luận

Dự án đang trong giai đoạn **maturity** với focus vào **polish và stability**. Team đang chủ động giải quyết technical debt và cải thiện developer/user experience dựa trên feedback thực tế. Sự tham gia của first-time contributors và số lượng feature requests cao cho thấy **cộng đồng đang phát triển mạnh mẽ**. 

**Điểm mạnh:** Responsive team, active development, good community engagement  
**Cần cải thiện:** Desktop stability, context management, configuration complexity

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo Phân tích GoClaw - Ngày 29/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 28-29/05 đánh dấu một đợt phát hành beta mạnh mẽ với **3 releases liên tiếp** (v3.12.0-beta.1 → v3.13.0-beta.2), tập trung vào **bảo mật, ổn định và trải nghiệm người dùng**. Đội ngũ đã đóng 4 PRs quan trọng và giải quyết 2 issues lâu năm, đặc biệt là vấn đề Azure OpenAI và workflow quản lý packages. Điểm nhấn là tính năng **workspace-organizing skill** mới và framework **secure-cli credential adapters** cho Git.

---

## 🚀 Releases

### 📦 v3.13.0-beta.2 (Mới nhất)
**Tính năng chính:**
- ✅ **Fix critical vault bug** (#1174): Khắc phục lỗi nghiêm trọng khi POST/PUT `/vault/documents` không lưu `content`, chỉ tạo metadata rỗng
- 🔒 **Bảo mật tăng cường**: Thêm `O_NOFOLLOW` để chống symlink attack, kiểm tra containment path
- 🏢 **Multi-tenant support**: Sửa lỗi 500 error cho non-master tenants
- 📝 **Logging cải thiện**: Structured logging với slog, error handling rõ ràng hơn

**Ý nghĩa**: Đây là bản vá quan trọng cho production - vault là nơi lưu trữ documents/knowledge, bug này khiến dữ liệu bị mất im lặng.

### 📦 v3.13.0-beta.1
**Tính năng nổi bật:**
- 🗂️ **Workspace-organizing skill** (#1178): Built-in skill dạy agents tổ chức workspace theo chuẩn (personal/team/delegate scopes), tích hợp Vault/knowledge graph
- 🔐 **Secure-CLI framework** (#82, #89): Credential adapters cho Git - cho phép agents xác thực an toàn với external services
- 🔧 **MCP improvements**: Loại bỏ spurious "grant-revoked" errors, cải thiện tool filtering
- 📎 **Multi-attachment coalescing** (#63, #90): Xử lý đúng nhiều attachments trong một message (WhatsApp, Telegram)

### 📦 v3.12.0-beta.1
Tương tự v3.13.0-beta.1 nhưng thiếu vault fixes - có vẻ là release trung gian.

---

## 📈 Tiến độ dự án

### 🔥 PRs nổi bật (15 PRs, 4 merged)

#### ✅ Đã merge (28/05)
1. **#1178 - Workspace organizing skill** 🆕
   - Giải quyết #71 (issue cũ về workspace management)
   - Chuẩn hóa cách agents tổ chức files: `/workspace/{personal,team,delegate}/{agent-id}/...`
   - Tích hợp discovery layer để agents tự tìm artifacts của nhau

2. **#1174 - Vault content persistence** 🐛
   - Bug nghiêm trọng: API trả 201 nhưng không lưu content
   - Ảnh hưởng: Mọi document upload qua API đều bị mất dữ liệu
   - Fix: Thêm `content` field vào request struct, hardening security

3. **#871 - Korean (ko) locale** 🌏
   - 50 translation files (35 web + 15 desktop)
   - Mở rộng thị trường châu Á

4. **#1152 - MCP flag validation false positives** 🐛
   - Package names như `clickup-cli` bị reject nhầm vì chứa `-c`
   - Fix: Standalone flag matching thay vì substring

#### 🔄 Đang review (11 PRs open)
**Nhóm bảo mật & ổn định:**
- #974 - **SSRF prevention** (DNS bypass vulnerability) - CRITICAL
- #1063 - DeepSeek reasoning passback HTTP 400
- #1115 - MCP dangerous flags exact-match
- #1082 - Bot token masking + episodic timeout

**Nhóm UX & configuration:**
- #1173 - Timezone validator + system-configs 404
- #1175 - TTS voice resolution unification
- #1176 - TTS timeout_ms wiring
- #1111 - Tool rate limiter after system_configs overlay

**Nhóm tích hợp:**
- #1101 - Thinking field in post-summary messages
- #1145 - {baseDir} placeholder resolution
- #1031 - WhatsApp LID @ sanitization

### 📊 Xu hướng phát triển
- **Bảo mật đang được ưu tiên**: 3 PRs về security (SSRF, token masking, MCP validation)
- **Provider compatibility**: Nhiều fixes cho DeepSeek, Azure OpenAI, thinking-mode models
- **Configuration management**: Hệ thống system_configs đang được hoàn thiện
- **Multi-channel support**: WhatsApp, Telegram attachment handling

---

## 🌟 Điểm nổi bật cộng đồng

### 🔥 Issues được đóng (2)
1. **#82 - Azure OpenAI model deployment** (đóng 28/05)
   - Mở từ 07/03 (gần 3 tháng)
   - Vấn đề: Không thể add existing deployed models (gpt-5.1, gpt-5.2-codex)
   - 4 comments - cho thấy nhiều users gặp vấn đề tương tự
   - Được fix qua secure-cli framework trong v3.13.0-beta.1

2. **#900 - Runtime & Packages update flow** (đóng 28/05)
   - Feature request từ @mrgoonie (core team)
   - Vấn đề: Không có UI để update packages, phải uninstall → reinstall
   - Ảnh hưởng: apk, pip, npm, GitHub binaries
   - Closed nhưng **không thấy PR tương ứng** - có thể được xử lý trong release khác

### 👥 Contributors
- **11 contributors** tham gia 15 PRs
- Mix giữa core team (@mrgoonie, @kamushadenes) và community (@primadonna-gpters, @algojogacor)
- Đa dạng về kỹ năng: security, i18n, provider integration, UX

---

## 🐛 Ổn định & Bugs

### 🚨 Critical (cần ưu tiên)
1. **SSRF vulnerability** (#974) - OPEN
   - Đã có live exploit trên deployment `10.10.27.30:18790`
   - DNS bypass qua nip.io/sslip.io → truy cập private IPs
   - Cần merge gấp

2. **Vault content loss** (#1174) - ✅ FIXED
   - Đã fix trong v3.13.0-beta.2

### ⚠️ High priority
3. **DeepSeek HTTP 400** (#1063)
   - Thinking mode + tool calls → invalid_request_error
   - Ảnh hưởng: deepseek-v4-pro, deepseek-reasoner

4. **TTS voice mismatch** (#1175)
   - Dashboard config không ảnh hưởng tool execution
   - 2 storage locations khác nhau

5. **Tool rate limiter reset** (#1111)
   - DB overrides bị mất sau system_configs overlay

### 🔧 Medium priority
- MCP validation false positives (#1115, #1152)
- WhatsApp container naming (#1031)
- Timezone validation (#1173)
- {baseDir} placeholder (#1145)

---

## 💡 Yêu cầu tính năng

### ✅ Đã implement
1. **Workspace organizing** (#1178) - Merged
   - Auto-organize files theo scopes
   - Knowledge graph integration

2. **Korean locale** (#871) - Merged
   - Full i18n support

### 🔄 Đang xử lý
1. **Runtime & Packages update flow** (#900) - Closed nhưng chưa rõ implementation
   - UI để upgrade pip/npm/apk packages
   - GitHub binary version management

### 📋 Backlog (từ PRs open)
1. **Secure credential management** - Đang triển khai qua secure-cli framework
2. **Provider compatibility layer** - Nhiều fixes cho thinking-mode models
3. **Multi-channel robustness** - Attachment handling, container naming

---

## 💬 Phản hồi người dùng

### 😤 Pain points
1. **Azure OpenAI integration** (#82)
   - Users không thể sử dụng existing deployments
   - Phải tạo mới → tốn chi phí

2. **Package management** (#900)
   - Workflow update packages quá thủ công
   - Không có version tracking

3. **Provider errors** (#1063)
   - DeepSeek users gặp lỗi khi dùng tool calls
   - Error messages không rõ ràng

### 😊 Positive signals
- **Active community**: 11 contributors trong 1 sprint
- **Responsive team**: Issues 3 tháng tuổi được đóng
- **Quality focus**: 3 beta releases trong 1 ngày để đảm bảo stability
- **Security-first**: SSRF được báo cáo và xử lý nhanh

---

## 🗺️ Backlog & Roadmap

### 🎯 Ưu tiên ngắn hạn (dựa trên PRs open)
1. **Security hardening**
   - Merge #974 (SSRF fix)
   - Review #1082 (token masking)
   - Audit MCP validation (#1115)

2. **Provider stability**
   - Fix DeepSeek issues (#1063, #1101)
   - Unify TTS configuration (#1175, #1176)

3. **Configuration management**
   - System_configs overlay fixes (#1111, #1173)
   - Runtime & packages update UI (#900)

### 🔮 Xu hướng dài hạn
1. **Multi-provider ecosystem**
   - Thinking-mode model support
   - Azure OpenAI compatibility
   - Credential adapters framework

2. **Enterprise features**
   - Multi-tenant improvements
   - Workspace organization standards
   - Knowledge graph integration

3. **Developer experience**
   - Better error messages
   - Configuration validation
   - Testing infrastructure (integration tests được mention)

---

## 📌 Kết luận

GoClaw đang trong giai đoạn **maturation** với focus vào:
- ✅ **Stability**: 3 beta releases để fix critical bugs
- 🔒 **Security**: SSRF, token masking, MCP validation
- 🌍 **Expansion**: Korean locale, multi-provider support
- 🏗️ **Architecture**: Workspace organizing, secure-cli framework

**Rủi ro cần theo dõi**: SSRF vulnerability (#974) vẫn open mặc dù đã có exploit. Cần merge trong 24-48h tới.

**Cơ hội**: Framework secure-cli và workspace-organizing mở đường cho enterprise adoption và agent collaboration features.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Báo cáo phân tích Hermes-Agent ngày 2026-05-29

## 📊 Tóm tắt hôm nay

Ngày 29/05/2026 là một ngày cực kỳ bận rộn với **50 pull requests** được tạo/cập nhật và **7 issues** đang hoạt động. Đặc biệt, dự án vừa phát hành **v0.15.1** - một hotfix khẩn cấp trong cùng ngày sau v0.15.0 để sửa lỗi nghiêm trọng về dashboard infinite-reload loop. Hoạt động chủ yếu tập trung vào việc ổn định hệ thống sau bản release lớn v0.15.0 với hàng loạt bugfix và cải tiến nhỏ.

## 🚀 Releases

### v0.15.1 (2026.5.29) - The Patch Release ⚡

**Hotfix khẩn cấp** được phát hành cùng ngày với v0.15.0:

- **Vấn đề chính được sửa**: Dashboard infinite-reload loop ảnh hưởng đến người dùng chạy ở chế độ loopback (Docker, hosted Hermes, fresh installs)
- **Các sửa lỗi đi kèm**:
  - Kanban worker SIGTERM handling
  - `/model` picker unification
  - `/yolo` session bypass
- **Quy mô**: 28 commits, 21 merged PRs, 9 contributors

### v0.15.0 (2026.5.28) - The Velocity Release 🎯

**Bản release lớn** vừa được phát hành trước đó 1 ngày:

- **Cải thiện hiệu suất đáng kể**: Hermes nhanh hơn về mọi mặt - khởi động, chạy, ship work
- **Tái cấu trúc code lớn**: File `run_agent.py` giảm từ 16,083 dòng xuống 3,821 dòng (-76%) thông qua modularization thành 14 modules cohesive trong `agent/*`
- **Kanban improvements**: Kanban groups giờ có thể chạy song song
- **Quy mô khổng lồ**: 1,302 commits, 747 merged PRs, 282,712 insertions, 560+ issues closed, 321 contributors

## 📈 Tiến độ dự án

### Xu hướng phát triển chính

**1. Ổn định sau release lớn** 🔧
- Hầu hết PRs (30/50) tập trung vào bugfix và polish sau v0.15.0
- Nhiều vấn đề về Docker, gateway, và platform integrations được phát hiện và sửa nhanh

**2. Cải thiện trải nghiệm người dùng** ✨
- Dashboard theme flash prevention (#34248)
- CLI reasoning display improvements (#34224)
- Profile-scoped dashboard detection (#34234)

**3. Mở rộng tích hợp** 🔌
- Bocha web search provider (#34247)
- Gemini image edit backend (#34231)
- Hermes Browser Bridge MCP catalog entry (#34226)
- LiteParse PDF extraction (#34228)

**4. Bảo mật và authorization** 🔒
- Discord role authorization propagation (#33958)
- Dashboard WebSocket peer-IP check fixes (#34242)
- Reverse proxy compatibility (#34227)

### PRs quan trọng đã merge

✅ **#33645** - Docker container reuse + cleanup (đóng #20561)
- Sửa vấn đề containers tích tụ không được dọn dẹp
- Implement container reuse và bounded-sync cleanup

✅ **#21590** - OpenRouter headers merge fix
- Sửa lỗi `default_headers` bị replace thay vì merge

✅ **#34236** - Docker documentation refresh
- Cập nhật docs cho s6-overlay reality

## 🔥 Điểm nổi bật cộng đồng

### Issues được quan tâm

**#27178** - Kanban protocol violation (3 comments)
- Worker exits với `protocol_violation` khi agent kết thúc bằng text response thay vì gọi `kanban_complete`/`kanban_block`
- Không có fallback mechanism, gây confusion cho users

**#13849** - 9router model configuration (4 comments)
- User gặp khó khăn khi config model từ 9router
- Lỗi: "Could not reach the custom:9router API to validate"
- Vấn đề về API validation và config setup

### PRs đang được review

**#34238** - Hook registry extensions cho plugins
- Cho phép plugins observe agent activity
- Thay thế approach trước đó (#34195) bằng cách extend `HookRegistry` thay vì tạo module mới

**#34244** - Kanban default assignee + concurrency cap
- Đóng 2 issues lâu năm: #27145, #21582
- Thêm fallback routing cho unassigned tasks
- Per-profile concurrency limits

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đã sửa

**🔴 P1 - Dashboard infinite reload** (v0.15.1)
- Ảnh hưởng: Tất cả users chạy loopback mode
- Root cause: WebSocket connection issues
- Status: ✅ Fixed trong v0.15.1

**🟡 P2 - Docker container accumulation** (#20561 → #33645)
- Containers không được cleanup sau `/stop`
- Multiple containers per session
- Status: ✅ Closed

**🟡 P2 - Discord role authorization** (#33958)
- `DISCORD_ALLOWED_ROLES` không hoạt động end-to-end
- Gateway layer reject users đã pass adapter gate
- Status: 🔄 Open PR

### Bugs đang được xử lý

**#34246** - Custom endpoint empty response (NEW)
- Server trả về content nhưng Hermes treat as empty
- Ảnh hưởng: Custom OpenAI-compatible endpoints
- Version: v0.14.0

**#34227** - Dashboard breaks behind reverse proxies (NEW)
- 2 regressions trong v0.14.0
- Ảnh hưởng: Users chạy qua reverse proxy với `--insecure`
- Chain: browser → SSO → Traefik → tunnel → dashboard

**#34220** - MCP commands raise NameError (NEW)
- `hermes mcp add/test` fail khi `mcp` package chưa install
- Error: `NameError: name 'StdioServerParameters' is not defined`
- Fix: #34245 đã submit

## 💡 Yêu cầu tính năng

### Tính năng mới được implement

**1. Bocha Web Search Integration** (#34247)
- Thêm Bocha làm first-class `web_search` backend
- Tương tự Tavily provider

**2. Gemini Image Edit Backend** (#34231)
- Provider plugin cho Gemini image generation/edit
- Wire through image generation dispatch path

**3. Hermes Browser Bridge MCP** (#34226)
- Kết nối với authenticated Chrome browser session
- Enable browser automation với real login state

**4. Kanban Log Viewer Integration** (#34221)
- Integrate log viewer vào Kanban board TUI
- Keyboard shortcuts: `l` để xem logs, `Esc`/`b` để quay lại

### Cải tiến được đề xuất

**Hook Registry Extensions** (#34238)
- Programmatic register
- Sync emit
- TUI mirror events
- Mục đích: Hỗ trợ plugins observe agent activity

**Queue Busy Messages by Default** (#34229 - Draft)
- Thay đổi behavior từ interrupt sang queue
- Preserve explicit control paths

## 👥 Phản hồi người dùng

### Vấn đề cấu hình

**Pain point chính**: Configuration complexity
- Users gặp khó khăn với custom model endpoints (#13849, #34246)
- Config validation không đủ rõ ràng (#34067 → #34250)
- Missing dependencies không có error message hữu ích (#34220)

### Trải nghiệm Docker

**Cải thiện đáng kể**:
- Container cleanup issues được resolve (#33645)
- Documentation được refresh (#34236)
- Reverse proxy support được fix (#34227, #34242)

### Platform integrations

**Discord**: Authorization issues được address (#33958)
**LINE**: Media handling improvements (#34233)
**Web**: Multiple search provider options (Bocha, Tavily)

## 🗺️ Backlog & Roadmap

### Đang trong pipeline

**Stability focus** (ngắn hạn):
- Tiếp tục polish v0.15.x
- Fix remaining reverse proxy issues
- Improve error messages và validation

**Feature expansion** (trung hạn):
- More MCP integrations
- Enhanced plugin system (hook registry)
- Better kanban workflow (default assignee, concurrency)

**Architecture improvements** (dài hạn):
- Continue modularization từ v0.15.0
- Performance optimizations
- Better testing coverage

### Issues cần attention

**P1 Priority**:
- #33958 - Discord role authorization (PR ready)
- Dashboard reverse proxy compatibility (#34227)

**P2 Priority**:
- #34246 - Custom endpoint response handling
- #27178 - Kanban protocol violation
- Multiple packaging/distribution issues (#27728)

---

## 📌 Kết luận

Ngày 29/05 đánh dấu một giai đoạn **intense stabilization** sau major release v0.15.0. Team đã phản ứng cực kỳ nhanh với hotfix v0.15.1 trong cùng ngày để sửa critical bug. Với 50 PRs trong một ngày, momentum phát triển rất cao, tập trung vào:

1. ✅ Sửa bugs từ v0.15.0
2. 🔌 Mở rộng integrations (Bocha, Gemini, Browser Bridge)
3. 🔒 Cải thiện security và authorization
4. 📚 Polish documentation và UX

Dự án đang trong giai đoạn **growth velocity cao** với cộng đồng contributor lớn (321 contributors trong v0.15.0) và responsive maintenance.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*