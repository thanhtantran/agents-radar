# Bản tin Hệ sinh thái OpenClaw 2026-05-24

> Issues: 343 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-05-24 02:00 UTC

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

# Báo cáo phân tích OpenClaw - 2026-05-24

## 📊 Tóm tắt hôm nay

OpenClaw đang trong giai đoạn tái cấu trúc lớn với việc nội bộ hóa agent runtime và tăng cường bảo mật control plane. Hai releases mới (v2026.5.22 và beta) tập trung vào tối ưu hiệu năng gateway và lazy-loading plugin. Cộng đồng đang tích cực báo cáo bugs liên quan đến Telegram routing, media handling, và sandbox permissions.

---

## 🚀 Releases

### **v2026.5.22** (2026-05-24)

**Tối ưu hiệu năng Gateway:**
- **Caching thông minh**: Tái sử dụng channel catalog, plugin metadata, và bundled-channel checks để giảm I/O lặp lại
- **Lazy-loading plugins**: Trì hoãn tải plugin metadata đến khi thực sự cần thiết
- **CPU profiling**: Tự động rotate profile artifacts để tránh tích tụ dữ liệu benchmark

**Ý nghĩa**: Release này giải quyết vấn đề hiệu năng khởi động và hot-path latency - hai điểm yếu thường gặp ở các hệ thống agent phức tạp. Việc lazy-load plugin đặc biệt quan trọng khi số lượng extension tăng lên.

---

## 🔧 Tiến độ dự án

### **Xu hướng chính: Tái cấu trúc kiến trúc**

#### 1️⃣ **Nội bộ hóa Agent Runtime** (#85341) 🔥
- **Mục tiêu**: Chuyển Pi agent runtime thành OpenClaw-owned runtime
- **Tác động**: 
  - Loại bỏ phụ thuộc bên ngoài
  - Chuẩn hóa plugin/runtime contracts
  - Dọn dẹp session-export HTML assets
- **Rủi ro**: `merge-risk: 🚨 compatibility, auth-provider, security-boundary`
- **Trạng thái**: Cần proof bổ sung

#### 2️⃣ **Control-plane Hardening** (#85583) 🛡️
- **Nguồn gốc**: Phát hiện từ Optimus ops
- **Nội dung**:
  - ADP-237: A2A handoff IDs và return-route tracing
  - ADP-238: Session/status diagnostics
  - ADP-239: Channel/runtime boundary checks
  - ADP-240: Plugin safety improvements
- **Trạng thái**: Đang chờ tác giả

#### 3️⃣ **Codex Integration Refinements**
- **#85891**: Tắt Codex personality cho native threads (tránh xung đột với OpenClaw instructions)
- **#84652**: Mirror accepted prompts sớm để cải thiện transcript consistency
- **#85811**: Đảm bảo Codex subagents chỉ inject AGENTS.md và TOOLS.md (parity với Pi subagents)

---

## 🔥 Điểm nổi bật cộng đồng

### **Top Issues theo tương tác:**

#### 🥇 **#25592 - Text leakage giữa tool calls** (26 bình luận)
- **Vấn đề**: Text giữa các tool calls bị rò rỉ ra messaging channels
- **Tác động**: `impact:security, impact:message-loss`
- **Đánh giá**: 🦞 diamond lobster (mức độ nghiêm trọng cao)
- **Trạng thái**: Có PR liên kết nhưng chưa merge

#### 🥈 **#22676 - Signal daemon race condition** (17 bình luận)
- **Vấn đề**: SIGUSR1 restart gây orphaned processes và send failures
- **Root cause**: `stop()` không đợi process exit trước khi spawn mới
- **Tác động**: `impact:crash-loop`

#### 🥉 **#22438 - Tiered bootstrap loading** (16 bình luận)
- **Đề xuất**: Progressive context control cho large workspaces
- **Lý do**: Bootstrap files tiêu tốn tokens ngay cả khi không dùng
- **Trạng thái**: Cần product decision

### **PR đáng chú ý:**

#### ⚡ **#85767 - Memory flush off reply path**
- **Vấn đề**: `runMemoryFlushIfNeeded` chặn user-visible reply
- **Giải pháp**: Dispatch housekeeping run sau khi reply hoàn tất
- **Tác động hiệu năng**: Giảm latency reply cho end-user

#### 🔒 **#70864 - Scoped mention pattern policy**
- **Tính năng**: Regex-based mention gating cho global/agent/channel
- **Use case**: Kiểm soát khi nào agent được trigger trong group chats
- **Rủi ro**: `merge-risk: 🚨 security-boundary`

---

## 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng đang xử lý:**

#### 🔴 **Telegram Routing Issues**
- **#41165**: DMs vẫn leak vào `agent:main:main` sau fix #40519
- **#40611**: Heartbeat drift fix gây aggressive retry, block Telegram messages
- **Root cause**: Session routing logic và retry backoff chưa ổn định

#### 🔴 **Media Handling**
- **#41744**: Feishu read image tool mất media trước khi gửi
- **#40440**: Telegram group chat history chỉ lưu placeholder text, không lưu MediaPath
- **Pattern**: Media attachment lifecycle chưa consistent across channels

#### 🔴 **Sandbox Permissions**
- **#31331**: Docker + Sandbox không thể workspaceAccess
- **#37634**: `workspaceAccess: none` tạo isolated workspace nhưng mount read-only
- **Tác động**: Tools cần write (như `write`, `exec`) fail trong sandbox

#### 🟡 **Control UI Issues**
- **#32473**: Device identity required (HTTPS/localhost secure context)
- **#38439, #41201**: Avatar endpoint trả 404 ngay cả với valid IDENTITY.md
- **#41545**: Edit WebSocket URL xóa Gateway Token

### **Fixes đã merge/sắp merge:**

✅ **#75702**: Browser snapshot timeout trên macOS (thread timeoutMs properly)  
✅ **#78852**: Reuse media tool availability during prep (tránh duplicate checks)  
✅ **#83987**: Defer Codex native-hook-relay unregister (tránh cleanup race)

---

## 💡 Yêu cầu tính năng

### **Tính năng được yêu cầu nhiều:**

#### 🌟 **Memory & Context Management**
- **#22438**: Tiered bootstrap loading (16 bình luận, 0 👍)
- **#34400**: Recursive subdirectory search cho `memory_search` (10 bình luận)
- **#40418**: Automated session memory preservation khi `/new` (5 bình luận)

#### 🌟 **Security & Permissions**
- **#39979**: Path-scoped RWX permissions (thay vì binary-level allowlist) (7 bình luận)
- **#39604**: `allowPrivateNetwork` config cho web_fetch (12 bình luận, 8 👍)
- **#31583**: `exec` tool không inherit `skills.entries.*.env` (11 bình luận)

#### 🌟 **Multi-Agent Collaboration**
- **#35203**: Capability profiling + shared blackboard + layered memory (7 bình luận)
- **#22358**: Post-subagent completion hook (11 bình luận)
- **#27445**: `announceTarget` option cho sub-agent routing (9 bình luận, 4 👍)

#### 🌟 **Cost & Observability**
- **#42475**: Per-agent cost budget enforcement (13 bình luận)
- **#33975**: Fallback approval mode + model attribution (6 bình luận)
- **#33413**: Slack tool-level progress in thread status (7 bình luận, 2 👍)

#### 🌟 **Developer Experience**
- **#18160**: Direct Exec Mode cho cron jobs (11 bình luận, 9 👍)
- **#40786**: `.gitignore`-like exclude patterns cho backup CLI (6 bình luận)
- **#76298**: `openclaw experimental` command cho toggle flags (đang PR)

---

## 💬 Phản hồi người dùng

### **Pain points chính:**

#### 😤 **Telegram Integration Frustrations**
- Users báo cáo DM routing không ổn định (#41165)
- Heartbeat blocking active conversations (#40611)
- Media attachments bị mất trong history (#40440)
- **Sentiment**: Telegram là channel phổ biến nhưng reliability chưa đạt production-grade

#### 😤 **Sandbox Usability**
- Docker + Sandbox setup phức tạp (#31331)
- `workspaceAccess: none` không hoạt động như mong đợi (#37634)
- **Sentiment**: Sandbox concept tốt nhưng implementation còn nhiều edge cases

#### 😤 **Control UI Polish**
- Avatar không hiển thị (#38439, #41201)
- WebSocket URL edit xóa token (#41545)
- Device identity requirements gây confusion (#32473)
- **Sentiment**: UI cần polish cho production readiness

### **Positive feedback:**

#### 👍 **Performance Improvements**
- Community đánh giá cao các PR tối ưu (memory flush, tool prep caching)
- Release notes về gateway perf được đón nhận tích cực

#### 👍 **Feature Richness**
- Nhiều feature requests chi tiết cho thấy users đang sử dụng sâu
- Multi-agent collaboration proposals (#35203) rất comprehensive

---

## 🗺️ Backlog & Roadmap

### **Ưu tiên cao (P1):**

#### 🎯 **Stability & Correctness**
1. **Telegram routing fixes** (#41165, #40611) - Blocking production usage
2. **Media handling consistency** (#41744, #40440) - Data loss risk
3. **Sandbox permissions** (#31331, #37634) - Core feature broken
4. **Text leakage** (#25592) - Security concern

#### 🎯 **Architecture Evolution**
1. **Agent runtime internalization** (#85341) - Foundation cho future work
2. **Control-plane hardening** (#85583) - Security & reliability
3. **Distributed agent runtime** (#42026) - Scalability (P2 nhưng strategic)

### **Ưu tiên trung bình (P2):**

#### 📋 **Developer Experience**
- Direct exec mode cho cron (#18160) - 9 👍
- Tiered bootstrap loading (#22438) - Token efficiency
- Path-scoped permissions (#39979) - Security model improvement

#### 📋 **Observability**
- Per-agent cost budgets (#42475)
- Tool-level progress indicators (#33413)
- Model attribution in messages (#33975)

#### 📋 **Channel Improvements**
- Telegram Business Bot support (#20786) - 6 👍
- Reaction-triggered turns (#17840)
- Feishu reaction fixes (#34528)

### **Ưu tiên thấp (P3):**

- Theme customization (#28300) - 5 👍
- Tool schema token reduction (#14785) - Optimization
- Doctor bundled plugin pruning (#85038)

---

## 🎯 Kết luận & Khuyến nghị

### **Điểm mạnh:**
✅ Tốc độ phát triển cao (500 PRs, 343 issues)  
✅ Cộng đồng tích cực báo cáo bugs chi tiết  
✅ Architecture evolution có tầm nhìn rõ ràng  
✅ Performance optimization được ưu tiên  

### **Điểm cần cải thiện:**
⚠️ **Telegram stability** cần attention khẩn cấp (nhiều P1 issues)  
⚠️ **Sandbox implementation** chưa production-ready  
⚠️ **Control UI polish** cần đầu tư thêm  
⚠️ **Documentation** cho advanced features (sandbox, multi-agent) cần bổ sung  

### **Khuyến nghị ưu tiên:**
1. **Tuần này**: Fix Telegram routing + media handling (P1 blockers)
2. **Sprint tới**: Complete control-plane hardening + agent runtime internalization
3. **Q3 2026**: Distributed runtime architecture + advanced multi-agent features

---

**Tổng quan**: OpenClaw đang trong giai đoạn chuyển mình từ MVP sang production-grade platform. Architecture refactoring đúng hướng nhưng cần balance với stability fixes để giữ chân users hiện tại. 🚀

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 24/05/2026

## 1. 🌐 Tổng quan Hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **chuyển mình từ MVP sang production-grade**, với các dự án lớn tập trung vào 3 trụ cột chính:

### 🎯 Ba làn sóng phát triển song song:

**🔐 Làn sóng Bảo mật & Tin cậy** (Security-First Wave)
- **IronClaw** dẫn đầu với attested-signing substrate (10 PR stack)
- **Zeroclaw** chuẩn hóa allowlist trên 16 kênh (25 PR refactoring)
- **OpenClaw** hardening control-plane với 4 ADPs mới

**⚡ Làn sóng Hiệu năng & Ổn định** (Performance Wave)
- **OpenClaw** tối ưu gateway caching và lazy-loading plugins
- **NanoBot** giảm 60% system prompt qua BM25 skill routing
- **Hermes-Agent** xử lý 27 bug fixes trong 1 ngày

**🔌 Làn sóng Tích hợp & Mở rộng** (Integration Wave)
- **CoPaw** xây dựng MCP marketplace và plugin ecosystem
- **GoClaw** tích hợp Bitrix24 với per-user OAuth
- **LobsterAI** phân tích memory architecture bottlenecks

---

## 2. 📊 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ Mature | Focus chính |
|-------|--------|-----|----------|---------------|---------------|-------------|
| **OpenClaw** | 343 | 500 | 2 | 🔥🔥🔥 Cao | ⭐⭐⭐⭐ Production | Architecture refactoring |
| **Zeroclaw** | 11 | 50 | 0 | 🔥🔥🔥 Cao | ⭐⭐⭐⭐ Research | Allowlist standardization |
| **IronClaw** | 14 | 50 | 0 | 🔥🔥🔥 Rất cao | ⭐⭐⭐⭐ Enterprise | Security substrate |
| **Hermes-Agent** | 10 | 50 | 0 | 🔥🔥🔥 Cực cao | ⭐⭐⭐ Stabilizing | Bug fixes sprint |
| **NanoBot** | 7 | 10 | 0 | 🔥🔥 Trung bình | ⭐⭐⭐ Mature | Memory optimization |
| **CoPaw** | 12 | 2 | 0 | 🔥 Thấp | ⭐⭐⭐ Growing | Plugin ecosystem |
| **PicoClaw** | 6 | 9 | 1 | 🔥🔥 Trung bình | ⭐⭐ Early | Context management |
| **NanoClaw** | 4 | 15 | 0 | 🔥🔥🔥 Cao | ⭐⭐ Early | WhatsApp stability |
| **GoClaw** | 0 | 3 | 0 | 🔥 Thấp | ⭐⭐ Niche | Enterprise white-label |
| **LobsterAI** | 3 | 2 | 0 | 🔥 Thấp | ⭐⭐ Analysis | Memory research |
| **Moltis** | 9 | 4 | 0 | 🔥🔥 Trung bình | ⭐⭐ Early | Agent capabilities |

### 📈 Chỉ số Engagement (Reactions + Comments)

| Dự án | Top Issue Engagement | Community Activity | Contributor Diversity |
|-------|---------------------|-------------------|---------------------|
| **OpenClaw** | 26 comments (#25592) | ⭐⭐⭐⭐⭐ Rất cao | 9+ contributors |
| **Hermes-Agent** | 20 comments (#29125) | ⭐⭐⭐⭐⭐ Rất cao | 27 PRs/ngày |
| **NanoBot** | 5 comments (#3973) | ⭐⭐⭐ Trung bình | External contributors |
| **Zeroclaw** | 5 comments (#6856) | ⭐⭐⭐ Trung bình | Research-focused |
| **IronClaw** | 5 comments (#1739) | ⭐⭐⭐ Trung bình | Strategic features |
| **CoPaw** | 5 comments (#4265) | ⭐⭐⭐ Trung bình | Plugin contributors |
| **Moltis** | 0 comments (mới) | ⭐⭐ Thấp | Early stage |
| **PicoClaw** | 0 comments | ⭐⭐ Thấp | Internal team |
| **NanoClaw** | 0 comments | ⭐⭐ Thấp | Stealth mode |
| **GoClaw** | 0 comments | ⭐ Rất thấp | Private/Enterprise |
| **LobsterAI** | 0 comments | ⭐ Rất thấp | Analysis phase |

---

## 3. 🏆 Vị thế của OpenClaw

### 🎯 Vai trò: **Platform Leader & Reference Implementation**

OpenClaw đang đóng vai trò **trung tâm** trong hệ sinh thái với 3 lợi thế cạnh tranh:

#### ✅ Điểm mạnh vượt trội:

**1. Quy mô & Velocity**
- 343 issues + 500 PRs = **hoạt động lớn nhất** trong ecosystem
- 2 releases trong ngày (v2026.5.22 + beta) = **shipping cadence nhanh**
- 9+ contributors active = **team size lớn nhất**

**2. Architecture Maturity**
- Agent runtime internalization (#85341) = **ownership đầy đủ stack**
- Control-plane hardening (4 ADPs) = **enterprise-ready security**
- Gateway performance optimization = **production-scale ready**

**3. Community Engagement**
- 26 comments trên single issue = **highest engagement**
- Chi tiết bug reports với reproduction steps
- Feature requests comprehensive (multi-agent collaboration #35203)

#### ⚠️ Thách thức cần giải quyết:

**1. Stability Issues** (Blocking production adoption)
- 🔴 Telegram routing không ổn định (#41165, #40611)
- 🔴 Media handling inconsistent (#41744, #40440)
- 🔴 Sandbox permissions broken (#31331, #37634)

**2. Polish Gaps** (UX friction)
- Control UI bugs (avatar 404, WebSocket token loss)
- Documentation thiếu cho advanced features
- Setup complexity cao

**3. Technical Debt**
- Text leakage giữa tool calls (#25592) - security concern
- Bootstrap loading không efficient (#22438)
- Memory management chưa tối ưu

### 📊 So sánh với Competitors:

| Tiêu chí | OpenClaw | Zeroclaw | IronClaw | Hermes-Agent |
|----------|----------|----------|----------|--------------|
| **Quy mô cộng đồng** | 🥇 Lớn nhất | 🥈 Trung bình | 🥉 Trung bình | 🥇 Rất lớn |
| **Shipping velocity** | 🥇 Nhanh nhất | 🥈 Ổn định | 🥉 Chiến lược | 🥇 Cực nhanh |
| **Architecture maturity** | 🥇 Production-ready | 🥇 Research-grade | 🥇 Enterprise | 🥈 Stabilizing |
| **Security focus** | 🥈 Hardening | 🥇 Allowlist research | 🥇 Attested-signing | 🥉 Reactive |
| **Multi-channel support** | 🥇 Nhiều nhất | 🥇 16+ channels | 🥉 Ít | 🥈 Trung bình |
| **Documentation** | 🥉 Gaps | 🥈 Technical | 🥉 Minimal | 🥈 Improving |

### 🎯 Positioning Strategy:

OpenClaw đang theo đuổi **"Platform Play"** - trở thành reference implementation mà các dự án khác fork/học hỏi:

✅ **Evidence**:
- LobsterAI phân tích OpenClaw weaknesses để improve (#2040)
- NanoClaw fix bugs tương tự OpenClaw (#2039)
- Zeroclaw research allowlist patterns có thể apply cho OpenClaw

⚠️ **Risk**: Nếu không fix stability issues nhanh, có thể mất vị thế leader cho IronClaw (enterprise) hoặc Hermes-Agent (velocity).

---

## 4. 🔧 Hướng Kỹ thuật Chung

### 🎯 5 Xu hướng Công nghệ Dominance:

#### 1️⃣ **MCP (Model Context Protocol) Integration** 🔥🔥🔥

**Adoption rate: 7/11 dự án**

| Dự án | MCP Implementation | Maturity |
|-------|-------------------|----------|
| **CoPaw** | Marketplace + health check | ⭐⭐⭐⭐ |
| **IronClaw** | OAuth + per-user credentials | ⭐⭐⭐⭐ |
| **Moltis** | OAuth gaps, schema sanitizer | ⭐⭐⭐ |
| **GoClaw** | Per-user OAuth (Bitrix24) | ⭐⭐⭐ |
| **OpenClaw** | Codex integration refinements | ⭐⭐⭐ |
| **Zeroclaw** | `allowed_tools` không cover MCP | ⭐⭐ |
| **Hermes-Agent** | MCP SDK missing log warnings | ⭐⭐ |

**Insight**: MCP đang trở thành **standard interface** cho external tool integration, nhưng security model (OAuth, allowlist) vẫn đang được định hình.

---

#### 2️⃣ **Memory Architecture Evolution** 🧠

**3 trường phái đang cạnh tranh:**

**A. Tiered Memory (LobsterAI analysis)**
- Trajectory memory (short-term)
- Declarative memory (facts)
- Structured memory (knowledge graph)
- **Challenge**: Implementation complexity cao

**B. Dream/Consolidation (NanoBot)**
- Real-time learning trong session
- 2-hour consolidation window
- **Challenge**: "Hunger problem" - không đọc MEMORY.md

**C. Context Budget Optimization (OpenClaw, PicoClaw)**
- Lazy-loading bootstrap files
- FreshTail budget enforcement
- **Challenge**: Token efficiency vs completeness tradeoff

**Consensus emerging**: Cần **hybrid approach** - real-time + periodic consolidation + tiered storage.

---

#### 3️⃣ **Security Hardening Patterns** 🔐

**3 layers đang được standardize:**

| Layer | Pattern | Leaders |
|-------|---------|---------|
| **Authentication** | Hardware-backed attestation (WebAuthn, FIDO2) | IronClaw |
| **Authorization** | Allowlist standardization (16 archetypes) | Zeroclaw |
| **Execution** | Sandbox + TOCTOU hardening | IronClaw, OpenClaw |

**Key innovations:**
- **IronClaw**: Sealed grant store + signing ledger (fail-closed)
- **Zeroclaw**: `AllowlistAspect` chuẩn hóa 147 dòng code thủ công
- **OpenClaw**: Control-plane ADPs (A2A handoff, boundary checks)

**Trend**: Chuyển từ **"trust by default"** sang **"verify everything"**.

---

#### 4️⃣ **Multi-Agent Orchestration** 🤝

**Demand signal mạnh từ 5 dự án:**

| Dự án | Use Case | Status |
|-------|----------|--------|
| **Hermes-Agent** | AI Anime Studio (Writer, Designer, Artist) | Feature request |
| **OpenClaw** | Subagent completion hooks, routing | Proposals |
| **CoPaw** | Plugin extension hooks | RFC stage |
| **Moltis** | Agents as capability boundaries | PR review |
| **IronClaw** | Multi-agent communication channel | Backlog |

**Common requirements:**
- Agent-to-agent messaging
- Shared blackboard/memory
- Capability profiling
- Layered memory architecture

**Bottleneck**: Chưa có **standard protocol** cho inter-agent communication.

---

#### 5️⃣ **Platform-Specific Optimizations** 📱

**Telegram/WhatsApp dominance:**

| Platform | Issues Reported | Pain Points |
|----------|----------------|-------------|
| **Telegram** | OpenClaw (3), PicoClaw (1) | Routing, heartbeat, media |
| **WhatsApp** | NanoClaw (2), Zeroclaw (1) | LID mapping, persistence |
| **Discord** | Hermes-Agent (1), IronClaw (1) | Rate limiting, auto-enable |
| **Matrix** | Zeroclaw (1), Hermes-Agent (1) | Memory leak, E2EE setup |

**Insight**: Messaging platforms có **quirks phức tạp** (rate limits, media handling, E2EE) - cần dedicated channel adapters thay vì generic wrappers.

---

### 🔮 Emerging Technologies:

**1. Alternative Browser Backends**
- Hermes-Agent: CloakBrowser integration (#31238)
- Trend: Thoát khỏi Playwright/Puppeteer monopoly

**2. Distributed Runtime**
- OpenClaw: Distributed agent runtime (#42026)
- Trend: Scale beyond single-machine

**3. Cost Optimization**
- NanoBot: BM25 skill routing (giảm 60% tokens)
- Hermes-Agent: Subscription-based providers
- Trend: Giảm dependency vào expensive models

---

## 5. 🎭 Điểm Khác biệt

### 🎯 Phân tích 4 Chiến lược Khác biệt:

#### 1️⃣ **OpenClaw: Platform Breadth Strategy** 🌐

**Thesis**: "Hỗ trợ mọi channel, mọi use case"

**Strengths:**
- ✅ 16+ channels (nhiều nhất ecosystem)
- ✅ Rich feature set (multi-agent, hooks, skills)
- ✅ Active community (343 issues, 500 PRs)

**Weaknesses:**
- ⚠️ Stability issues trên nhiều channels
- ⚠️ Complexity cao → setup friction
- ⚠️ Technical debt tích lũy

**Positioning**: **"Swiss Army Knife"** - đa năng nhưng cần polish.

---

#### 2️⃣ **IronClaw: Enterprise Security Strategy** 🔐

**Thesis**: "Security-first cho financial/enterprise use cases"

**Strengths:**
- ✅ Attested-signing substrate (10 PR stack)
- ✅ Hardware-backed attestation (WebAuthn)
- ✅ Fail-closed patterns everywhere
- ✅ Comprehensive audit trails

**Weaknesses:**
- ⚠️ Installer broken 1 tháng (#3945)
- ⚠️ Documentation gaps
- ⚠️ Onboarding complexity

**Positioning**: **"Enterprise Fortress"** - bảo mật tối đa, trả giá bằng UX.

**Competitive moat**: Attested-signing là **unique differentiator** - không dự án nào khác có.

---

#### 3️⃣ **Zeroclaw: Research Excellence Strategy** 🔬

**Thesis**: "Publish research, standardize patterns"

**Strengths:**
- ✅ ICSE 2027 research (25 PR allowlist refactoring)
- ✅ Systematic architecture (4 archetypes)
- ✅ Code quality focus (giảm duplication)

**Weaknesses:**
- ⚠️ Slow feature velocity (research > shipping)
- ⚠️ Community engagement thấp (0 comments)
- ⚠️ Production readiness unclear

**Positioning**: **"Academic Leader"** - influence qua research, không qua market share.

**Impact**: Các dự án khác sẽ adopt patterns từ Zeroclaw papers.

---

#### 4️⃣ **Hermes-Agent: Velocity & Iteration Strategy** ⚡

**Thesis**: "Ship fast, fix fast, iterate"

**Strengths:**
- ✅ 27 PRs trong 1 ngày (velocity cao nhất)
- ✅ Responsive team (fix bugs trong 24h)
- ✅ High community engagement (20 comments/issue)

**Weaknesses:**
- ⚠️ Stability issues (TUI deadlock, vision routing)
- ⚠️ Breaking changes thường xuyên
- ⚠️ Technical debt từ rapid iteration

**Positioning**: **"Move Fast & Fix Things"** - startup mentality.

**Risk**: Có thể alienate enterprise users cần stability.

---

### 📊 Differentiation Matrix:

| Dimension | OpenClaw | IronClaw | Zeroclaw | Hermes-Agent |
|-----------|----------|----------|----------|--------------|
| **Target User** | Developers | Enterprises | Researchers | Power Users |
| **Core Value** | Breadth | Security | Standards | Velocity |
| **Moat** | Channel coverage | Attested-signing | Research IP | Community |
| **Weakness** | Stability | Onboarding | Shipping speed | Breaking changes |
| **Pricing** | Open-source | Enterprise license? | Open-source | Open-source |
| **Go-to-market** | Community-led | Sales-led | Academic-led | Community-led |

---

### 🎯 Niche Players:

**NanoBot** (Memory Specialist)
- Focus: Tối ưu memory architecture
- Differentiator: BM25 skill routing (60% token reduction)
- Market: Cost-conscious developers

**CoPaw** (Plugin Ecosystem)
- Focus: Extensibility qua plugins
- Differentiator: MCP marketplace
- Market: Developers muốn customize

**GoClaw** (White-label)
- Focus: Enterprise customization
- Differentiator: Rebrand-able (TS SRE case)
- Market: Enterprises cần branded solution

---

## 6. 🌱 Mức độ Trưởng thành Cộng đồng

### 📊 Community Maturity Model:

#### **Tier 1: Mature Communities** ⭐⭐⭐⭐⭐

**OpenClaw**
- **Indicators**:
  - 343 issues với detailed reproduction steps
  - 26 comments trên single issue
  - Feature requests comprehensive (multi-agent #35203)
  - External contributors active
- **Maturity stage**: **Scaling** - cần governance structures
- **Health**: 🟢 Healthy nhưng cần moderation

**Hermes-Agent**
- **Indicators**:
  - 27 PRs trong 1 ngày
  - 20 comments trên Claude integration issue
  - First-time contributors welcome
  - Responsive maintainers (fix trong 24h)
- **Maturity stage**: **Rapid Growth** - velocity > stability
- **Health**: 🟡 Healthy nhưng risk of burnout

---

#### **Tier 2: Growing Communities** ⭐⭐⭐

**NanoBot**
- **Indicators**:
  - External contributors (Azure Speech, Zhipu)
  - Multilingual support (Chinese market focus)
  - 5 comments trên memory issue
- **Maturity stage**: **Expansion** - geographic diversification
- **Health**: 🟢 Healthy growth trajectory

**Zeroclaw**
- **Indicators**:
  - 25 PR refactoring (internal team)
  - 0 comments (research-focused)
  - ICSE 2027 publication target
- **Maturity stage**: **Academic** - influence > engagement
- **Health**: 🟢 Healthy nhưng niche

**CoPaw**
- **Indicators**:
  - First-time contributors (MCP marketplace, DataPaw)
  - 5 comments trên memory issue
  - RFC discussions active
- **Maturity stage**: **Ecosystem Building** - plugin contributors
- **Health**: 🟢 Healthy, cần marketplace traction

---

#### **Tier 3: Early Stage** ⭐⭐

**IronClaw**
- **Indicators**:
  - 5 comments trên wallet integration
  - External contributors (IronHub #3737)
  - Installer broken 1 tháng chưa fix
- **Maturity stage**: **Foundation** - building core features
- **Health**: 🟡 Promising nhưng onboarding issues

**Moltis**
- **Indicators**:
  - 0 comments trên recent issues
  - Active bug fixing (3 PRs merged/ngày)
  - Small team (6 contributors)
- **Maturity stage**: **Bootstrapping** - internal development
- **Health**: 🟢 Healthy velocity, cần community outreach

**PicoClaw**
- **Indicators**:
  - 0 comments, 0 reactions
  - 5 PRs merged trong ngày
  - Nightly builds
- **Maturity stage**: **Stealth** - internal testing
- **Health**: 🟡 Unclear - no public engagement

---

#### **Tier 4: Niche/Private** ⭐

**NanoClaw**
- **Indicators**: 0 comments, fast PR merges
- **Maturity stage**: **Stealth Mode** - private beta?
- **Health**: 🟡 Unknown - no public signals

**GoClaw**
- **Indicators**: 0 comments, enterprise rebrand
- **Maturity stage**: **Private/Enterprise** - B2B focus
- **Health**: 🟡 Unknown - closed development

**LobsterAI**
- **Indicators**: 0 comments, analysis-heavy issues
- **Maturity stage**: **Research Phase** - pre-community
- **Health**: 🟡 Too early to assess

---

### 📈 Community Health Metrics:

| Dự án | Contributor Diversity | Response Time | Documentation | Governance |
|-------|---------------------|---------------|---------------|------------|
| **OpenClaw** | 🟢 High (9+) | 🟢 3-5 ngày | 🟡 Gaps | 🔴 Needed |
| **Hermes-Agent** | 🟢 Very High | 🟢 <24h | 🟡 Improving | 🔴 Needed |
| **NanoBot** | 🟢 Medium | 🟢 Fast | 🟢 Good | 🟢 Clear |
| **Zeroclaw** | 🟡 Low (research) | 🟡 Slow | 🟢 Technical | 🟢 Academic |
| **IronClaw** | 🟡 Medium | 🟡 Variable | 🔴 Minimal | 🔴 Unclear |
| **CoPaw** | 🟢 Growing | 🟢 Fast | 🟡 Adequate | 🟡 Forming |
| **Moltis** | 🟡 Small | 🟢 Fast | 🟡 Basic | 🟡 Informal |
| **PicoClaw** | 🔴 Internal | 🟢 Fast | 🔴 Minimal | 🔴 None |
| **NanoClaw** | 🔴 Internal | 🟢 Fast | 🔴 None | 🔴 None |
| **GoClaw** | 🔴 Private | 🟡 Unknown | 🔴 None | 🔴 Private |
| **LobsterAI** | 🔴 Minimal | 🔴 None | 🔴 None | 🔴 None |

---

### 🎯 Community Development Recommendations:

**For OpenClaw** (Scaling challenges):
- ✅ Implement issue triage process
- ✅ Create contributor guidelines
- ✅ Establish release cadence
- ⚠️ Risk: Community fragmentation nếu không có governance

**For Hermes-Agent** (Velocity management):
- ✅ Slow down để stabilize
- ✅ Implement breaking change policy
- ✅ Better documentation
- ⚠️ Risk: Maintainer burnout

**For IronClaw** (Onboarding):
- ✅ Fix installer ASAP
- ✅ Improve documentation
- ✅ Create getting-started guides
- ⚠️ Risk: Lose early adopters

**For Early Stage Projects**:
- ✅ Public roadmap
- ✅ Community calls/office hours
- ✅ Contributor recognition
- ⚠️ Risk: Remain niche forever

---

## 7. 🔮 Tín hiệu Xu hướng

### 🎯 5 Xu hướng Chiến lược:

#### 1️⃣ **Consolidation Around Standards** 📐

**Signal strength: 🔥🔥🔥🔥🔥 (Very Strong)**

**Evidence:**
- MCP adoption: 7/11 dự án
- Zeroclaw allowlist research: 25 PR standardization
- IronClaw attested-signing: Có thể trở thành standard

**Prediction**: Trong 6-12 tháng, sẽ xuất hiện **"AI Agent Standard Consortium"** với:
- MCP v2.0 spec (OAuth, security model)
- Inter-agent communication protocol
- Memory architecture patterns
- Security best practices

**Winners**: Dự án nào contribute vào standards sẽ có **influence disproportionate** với market share.

**Losers**: Proprietary approaches sẽ bị marginalized.

---

#### 2️⃣ **Enterprise vs Consumer Split** 🏢 vs 👤

**Signal strength: 🔥🔥🔥🔥 (Strong)**

**Evidence:**
- IronClaw: Enterprise security focus
- GoClaw: White-label cho TS SRE
- OpenClaw: Breadth cho developers
- Hermes-Agent: Power users

**Prediction**: Ecosystem sẽ **bifurcate** thành 2 tracks:

**Enterprise Track** (IronClaw, GoClaw):
- Attested-signing, audit trails
- Compliance (SOC2, GDPR)
- SLA guarantees
- Paid support

**Consumer/Developer Track** (OpenClaw, Hermes-Agent):
- Velocity, features
- Community support
- Open-source
- Self-hosted

**Implication**: OpenClaw cần **decide** - chase enterprise hoặc double down on community.

---

#### 3️⃣ **Memory Architecture Arms Race** 🧠

**Signal strength: 🔥🔥🔥🔥 (Strong)**

**Evidence:**
- LobsterAI: Phân tích memory là bottleneck lớn nhất
- NanoBot: Dream system improvements
- OpenClaw: Bootstrap loading optimization
- CoPaw: Memory Wiki dashboard

**Prediction**: Trong 3-6 tháng, sẽ có **breakthrough** trong memory architecture:

**Candidates:**
- **Tiered memory** (LobsterAI thesis) - trajectory/declarative/structured
- **Real-time consolidation** (NanoBot fix) - không đợi 2h
- **Semantic compression** (NanoBot BM25) - giảm tokens mà giữ meaning

**Winner-take-all**: Dự án nào solve memory problem trước sẽ có **massive competitive advantage**.

---

#### 4️⃣ **Multi-Agent Orchestration Demand** 🤝

**Signal strength: 🔥🔥🔥 (Medium-Strong)**

**Evidence:**
- Hermes-Agent: AI Anime Studio use case
- OpenClaw: Multi-agent proposals (#35203)
- CoPaw: Plugin hooks RFC
- Moltis: Agents as capability boundaries

**Prediction**: Q3-Q4 2026 sẽ thấy **first production multi-agent systems**:

**Use cases:**
- Creative production (Writer + Designer + Artist)
- Software development (Architect + Coder + Tester)
- Research (Researcher + Analyst + Writer)

**Bottleneck**: Chưa có **standard protocol** - whoever ships first sets de facto standard.

**Dark horse**: Một startup mới có thể leapfrog với **multi-agent-native architecture**.

---

#### 5️⃣ **Cost Optimization Pressure** 💰

**Signal strength: 🔥🔥🔥 (Medium-Strong)**

**Evidence:**
- NanoBot: BM25 routing giảm 60% tokens
- Hermes-Agent: Subscription provider requests
- OpenClaw: Cost budget enforcement (#42475)
- LobsterAI: Token cost analysis (#2040)

**Prediction**: Trong 6 tháng, sẽ có **major shift** về cost structure:

**Trends:**
- **Smaller models** cho routine tasks (Llama 3.3, Qwen 2.5)
- **Caching strategies** (prompt caching, KV cache)
- **Skill routing** (chỉ load relevant skills)
- **Subscription models** (thay vì pay-per-token)

**Implication**: Dự án nào **không optimize cost** sẽ mất users khi bills tăng.

---

### 🌊 Emerging Weak Signals:

#### 🔬 **Alternative Browser Backends**

**Signal**: Hermes-Agent CloakBrowser integration (#31238)

**Hypothesis**: Playwright/Puppeteer có **fundamental limitations** (resource usage, detection). Sẽ có wave của lightweight alternatives.

**Watch**: Nếu 2-3 dự án khác adopt CloakBrowser trong Q3, đây là **confirmed trend**.

---

#### 🌐 **Distributed Runtime**

**Signal**: OpenClaw distributed agent runtime (#42026)

**Hypothesis**: Single-machine agents hit **scaling ceiling**. Cần distributed execution cho:
- Long-running tasks
- Parallel exploration
- Resource-intensive operations

**Watch**: Nếu IronClaw hoặc Hermes-Agent cũng ship distributed runtime, đây là **paradig

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo phân tích NanoBot - Ngày 24/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 24/05 đánh dấu một đợt hoạt động tích cực với **10 PRs** và **7 issues** được cập nhật. Dự án tập trung vào cải thiện hệ thống memory (Dream/Consolidator), mở rộng hỗ trợ providers (Azure Speech, Zhipu), và tối ưu hóa hiệu suất thông qua skill routing. Đáng chú ý là việc giải quyết các vấn đề cấu hình và giới hạn timeout đã gây khó khăn cho người dùng.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua. Tuy nhiên, nhiều PR đã được merge sẵn sàng cho release tiếp theo.

---

## 📈 Tiến độ dự án

### 🔥 PRs quan trọng đã merge

**#3967** - Gỡ bỏ giới hạn timeout và chuẩn hóa transcription
- ✅ **Đã đóng**: Giải quyết 2 issues lâu năm (#3595, #3637)
- Cho phép `tools.exec.timeout` vượt 600s hoặc set `0` = không giới hạn
- Tự động chuẩn hóa `apiBase` cho transcription (loại bỏ `/v1` suffix)
- **Impact**: Người dùng có thể chạy long-running tasks (downloads, time-lapse scripts)

**#3972** - Cập nhật docs cho Xiaomi MiMo provider
- ✅ **Đã đóng**: Thay thế config `custom` bằng built-in `xiaomi_mimo` provider
- Đơn giản hóa setup cho người dùng Trung Quốc

**#3971** - Thêm Zhipu (智谱) image generation
- ✅ **Đã đóng**: Mở rộng hỗ trợ providers Trung Quốc
- Tích hợp API tạo ảnh từ Zhipu AI

**#3952** - Cải thiện prompts cho Dream + Consolidator
- ✅ **Đã đóng**: Áp dụng nguyên tắc MECE (Mutually Exclusive, Collectively Exhaustive)
- Giảm duplicate memory entries (ví dụ: "user speaks Chinese" xuất hiện 10+ lần)
- Tối ưu cấu trúc `MEMORY.md` và `history.jsonl`

### 🔄 PRs đang review

**#3975** - Cho phép config temperature riêng cho subagent
- Giải quyết #3969: Mỗi subagent có thể dùng temperature khác nhau
- Backward compatible (default = `None`)

**#3974** - Thêm OpenAI API type và extraBody config
- Hỗ trợ 3 modes: `auto`, `chat_completions`, `responses`
- Cho phép custom `extraBody` fields

**#3970** - Azure Speech Service voice-to-text
- Tích hợp Azure AI Speech cho Telegram/WhatsApp
- Free tier: 5 giờ/tháng

**#3968** - Thêm `/skill` slash command
- Giải quyết #3959: Người dùng không biết skills nào đang enabled
- List tất cả skills với name + description

**#3865** - BM25-lite skill router (giảm 60% system prompt)
- **Tối ưu lớn**: Chỉ inject top-5 relevant skills thay vì tất cả
- Giảm từ ~3,000+ tokens xuống còn ~1,200 tokens
- Dùng BM25 algorithm để rank skills theo user message

**#1443** - Tách heartbeat reasoning khỏi notification
- Heartbeat agent reasoning im lặng by default
- Chỉ gửi message khi agent chủ động dùng `message` tool
- Opt-in qua `sendReasoning: true` config

### 📊 Xu hướng phát triển

1. **Memory optimization**: Focus lớn vào giảm duplication và cải thiện long-term memory
2. **Provider expansion**: Tăng cường hỗ trợ providers Trung Quốc (Xiaomi, Zhipu, Azure CN)
3. **Performance tuning**: Skill routing, prompt compression
4. **Developer experience**: Better config transparency, slash commands

---

## 💬 Điểm nổi bật cộng đồng

### 🔝 Issues có nhiều tương tác

**#2182** - Implement hooks feature (👍 2)
- Yêu cầu hooks giống Claude Code/GitHub Copilot CLI
- Cho phép execute shell commands/HTTP endpoints tại lifecycle events
- **Use case**: SessionStart, PreToolUse, PostToolUse automation

**#3973** - Dream System: Hunger Problem (mới tạo 23/05)
- Vấn đề nghiêm trọng: Dream chỉ đọc `history.jsonl`, bỏ qua `MEMORY.md`
- Thiếu real-time learning: Phải đợi 2 giờ mới consolidate
- **Impact**: Agent không học từ past experiences trong session hiện tại

**#2837** - WhatsApp: Pause bot khi human reply
- Feature request: Bot tự động pause 12h khi có người thật trả lời
- **Use case**: Tránh bot spam khi user đang handle manually

---

## 🐛 Ổn định & Bugs

### ✅ Đã giải quyết

**#3637** - Transcription provider config không rõ ràng
- **Root cause**: `apiBase` với `/v1` suffix gây lỗi với Groq transcription
- **Fix**: Auto-normalize apiBase trong #3967

**#3595** - Exec timeout bị cap ở 600s
- **Root cause**: Hardcoded limit ở 3 levels (schema, tool, runtime)
- **Fix**: Decouple config timeout từ per-call cap trong #3967

**#3047** - Dream memory consolidation issues
- **Root cause**: Write everything to `history.jsonl` trước khi consolidate
- Context overflow trong 2-hour window
- **Status**: Đã đóng, likely fixed bởi #3952

### ⚠️ Đang xử lý

**#3633** - Duplicate item ID error với GPT
- Lỗi HTTP 400 khi dùng gpt-5.5 model
- Agent không thể resume
- **Status**: Marked "good first issue" nhưng chưa có PR

---

## ✨ Yêu cầu tính năng

### 🎯 High priority

1. **Hooks system** (#2182)
   - Lifecycle event automation
   - Tương tự Claude Code/Copilot CLI
   - Nhiều upvotes từ community

2. **Dream system improvements** (#3973)
   - Fix "hunger problem" - đọc cả MEMORY.md
   - Real-time learning thay vì đợi 2h
   - Incremental consolidation

3. **WhatsApp human detection** (#2837)
   - Auto-pause khi detect human reply
   - Configurable pause duration

### 🔧 Developer experience

- `/skill` command để discover available skills (#3968)
- Per-subagent temperature config (#3975)
- Better provider configuration transparency

---

## 👥 Phản hồi người dùng

### 😊 Positive feedback

- **Azure Speech integration** (#3970): Người dùng đánh giá cao free tier 5h/month
- **Exec timeout removal** (#3967): Giải quyết pain point lớn cho long-running tasks
- **Xiaomi MiMo docs** (#3972): Đơn giản hóa setup cho thị trường Trung Quốc

### 😕 Pain points

- **Memory duplication**: "user speaks Chinese" lặp lại 10+ lần trong MEMORY.md
- **Dream timing**: 2-hour interval quá dài, agent không học real-time
- **Config complexity**: Transcription provider setup gây confusion
- **Missing discoverability**: Không có cách list enabled skills (đã fix bởi #3968)

### 🌍 Geographic insights

- **Tăng cường focus vào thị trường Trung Quốc**: 3/10 PRs liên quan đến CN providers
- **Multilingual support**: Issues mention Chinese language handling

---

## 🗺️ Backlog & Roadmap

### 🔜 Sắp merge (đang review)

- BM25 skill router - giảm 60% system prompt tokens
- Azure Speech voice-to-text
- OpenAI API type flexibility
- Subagent temperature control

### 📋 Backlog quan trọng

1. **Memory architecture overhaul**
   - Fix Dream hunger problem
   - Real-time learning mechanism
   - Reduce duplication

2. **Hooks/Lifecycle system**
   - Community demand cao
   - Cần design doc

3. **Platform-specific features**
   - WhatsApp human detection
   - Better multi-platform support

### 🎯 Technical debt

- Duplicate item ID error (#3633) - cần investigation
- Heartbeat reasoning decoupling (#1443) - đang review lâu (từ 02/03)

---

## 📌 Kết luận

NanoBot đang trong giai đoạn **maturation** với focus vào:
- ✅ **Stability**: Fixing config issues, removing arbitrary limits
- 🚀 **Performance**: Prompt optimization, skill routing
- 🌏 **Market expansion**: Strong push vào Trung Quốc
- 🧠 **Intelligence**: Memory system improvements

**Điểm mạnh**: Responsive maintainers (4 PRs merged trong ngày), active community feedback
**Điểm cần cải thiện**: Memory architecture cần refactor lớn, hooks system vẫn chưa có timeline rõ ràng

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo phân tích dự án Zeroclaw - 24/05/2026

## 📊 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn tái cấu trúc lớn với **25 PR song song** nhằm chuẩn hóa cơ chế allowlist trên 16+ kênh tích hợp (Slack, Discord, Matrix, WhatsApp, IRC, v.v.) - một phần của nghiên cứu ICSE 2027. Đồng thời, dự án đang xử lý các vấn đề ổn định quan trọng liên quan đến rò rỉ bộ nhớ Matrix, cấu hình SMTP, và lỗi sandbox trên Fedora 43.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 🔧 Tiến độ dự án

### Tái cấu trúc Allowlist (ICSE 2027 Research)

**Mục tiêu**: Thay thế 147 dòng code allowlist thủ công trên 16 kênh bằng `AllowlistAspect` chuẩn hóa

**Tiến độ**: 25 PR đang mở (archetype A/B/C/D), bao gồm:

- ✅ **Archetype A** (kiểm tra trực tiếp user_id): Slack #6791, Lark #6792, QQ #6790, Mattermost #6786, Twitter #6787, WeCom #6788, DingTalk #6789, MoChat #6794, WhatsApp #6797, Signal #6799, Linq #6796, WATI #6795
- ✅ **Archetype B** (kiểm tra nickname/sender): IRC #6783, Matrix #6785, iMessage #6800
- ✅ **Archetype C** (kiểm tra số điện thoại + group): WhatsApp-Web #6782
- ✅ **Archetype D→A** (chuyển đổi format trước khi kiểm tra): Nostr #6784, Discord-history #6798

**Tác động**: Giảm code duplication, tăng khả năng bảo trì, chuẩn hóa security policy

### Tính năng mới nổi bật

1. **NEAR AI Cloud Provider** (#6842) 🆕
   - Tích hợp TEE-backed inference từ NEAR AI Cloud
   - OpenAI-compatible API endpoint
   - Trạng thái: Cần review

2. **Signal Emoji Reactions** (#6840)
   - Hỗ trợ gửi/xóa emoji reactions qua signal-cli
   - Trạng thái: Cần review

3. **WeCom AI Bot WebSocket** (#6680)
   - Kênh WebSocket chuyên dụng cho WeCom AI Bot
   - Trạng thái: Cần review

4. **Zeroclaw TUI** (#6848)
   - Giao diện terminal tương tác
   - Trạng thái: Đang phát triển

---

## 🔥 Điểm nổi bật cộng đồng

### Issues được quan tâm

1. **#6856 - `show_tool_calls` bị thiếu trong schema v3** (5 bình luận)
   - Người dùng không thể hiển thị chi tiết tool calls trong channel response
   - Mức độ: S2 (degraded behavior)
   - Trạng thái: Accepted, chờ fix

2. **#6877 - `max_tool_iterations` không hoạt động ở runtime_profiles**
   - Cấu hình phải đặt ở `[agents.*]` thay vì `[runtime_profiles.*]`
   - Vấn đề thiết kế hoặc tài liệu chưa rõ ràng

3. **#6876 - `allowed_tools` không hạn chế MCP tools**
   - Risk profile chỉ áp dụng cho built-in tools, không áp dụng cho MCP
   - Cần làm rõ đây là thiết kế hay bug

---

## 🐛 Ổn định & Bugs

### Vấn đề nghiêm trọng (P1)

1. **#6879 - Discord gateway 429 retry bị block** ⚠️
   - HTTP 429 từ Discord `/gateway/bot` được wrap thành `FatalError`
   - Daemon không thể khởi động lại khi bị rate-limit
   - **Fix đang chờ**: #6879 (chuyển về retryable error)

2. **#6881 - SMTP credentials trống gây lỗi** ⚠️
   - `smtp_username=""` và `smtp_password=""` ghi đè credentials hợp lệ
   - Workflow bị block hoàn toàn
   - **Fix đang chờ**: Ignore blank overrides

### Vấn đề trung bình (P2)

3. **#6651 - Matrix channel rò rỉ ~1MB/reload** 🔴
   - Arc cycle trong matrix-sdk 0.17 (upstream bug)
   - Mỗi `/admin/reload` tăng 1MB Pss không thu hồi được
   - Trạng thái: CLOSED (chờ upstream fix)

4. **#6878 - Bubblewrap sandbox fail trên Fedora 43**
   - Thiếu `/lib64` trong bwrap parameters
   - Linked libraries không load được
   - Liên quan đến #5126

5. **#6880 - Lark/Feishu cron thiếu delivery defaults**
   - Cron tool không inject chat context cho Lark/Feishu
   - Trạng thái: Accepted

6. **#6882 - Context compressor cắt media markers** 🆕
   - Truncation có thể split media marker giữa chừng
   - **Fix đã merge**: Sanitize markers trước khi truncate

### Vấn đề tài liệu (Low priority)

7. **#6691 - RUST_LOG docs dùng target cũ** ✅
   - Tài liệu dùng `RUST_LOG=zeroclaw=debug` (không còn hoạt động)
   - **Fixed**: #6692 (merged)

8. **#6694 - mdbook sync tạo diff quá lớn** ✅
   - Sửa nhỏ docs → gettext catalog thay đổi hàng trăm dòng
   - **Fixed**: #6868 (normalize output)

---

## 💡 Yêu cầu tính năng

1. **#6883 - Shared reply-message constructor** (RFC)
   - Đề xuất: Thêm helper method `SendMessage::reply_to(msg: &ChannelMessage)`
   - Lý do: Pattern lặp lại 3 bước (recipient, thread_ts, in_reply_to) ở mọi channel
   - Trạng thái: Đang thảo luận

2. **#6665 - `channel_send` tool với default_target**
   - Agent có thể gửi tin nhắn chủ động đến channel khác
   - Trạng thái: WIP

3. **#6842 - NEAR AI Cloud provider**
   - TEE-backed inference cho use case bảo mật cao
   - Trạng thái: Cần review

---

## 👥 Phản hồi người dùng

### Tích cực

- Cộng đồng đang tích cực đóng góp tích hợp kênh mới (WeCom, Signal reactions)
- Nix flake (#5987) được cải thiện với cache efficiency tốt hơn

### Tiêu cực / Pain points

- **Confusion về config hierarchy**: `max_tool_iterations` và `allowed_tools` không hoạt động như mong đợi
- **Schema v3 regression**: Mất tính năng `show_tool_calls` từ v2
- **Stability issues**: Matrix memory leak, Discord rate-limit handling, SMTP config bugs

---

## 🗺️ Backlog & Roadmap

### Ưu tiên cao (P1)

- [ ] Fix Discord 429 retry (#6879)
- [ ] Fix SMTP blank credentials (#6881)
- [ ] Restore `show_tool_calls` trong schema v3 (#6856)

### Ưu tiên trung bình (P2)

- [ ] Hoàn thành 25 PR allowlist migration (ICSE 2027)
- [ ] Fix Lark/Feishu cron delivery (#6880)
- [ ] Fix Bubblewrap trên Fedora 43 (#6878)
- [ ] Clarify `max_tool_iterations` và `allowed_tools` behavior (#6877, #6876)

### Tính năng mới

- [ ] Zeroclaw TUI (#6848)
- [ ] NEAR AI Cloud provider (#6842)
- [ ] Signal emoji reactions (#6840)
- [ ] WeCom WebSocket channel (#6680)
- [ ] Email HTML rendering (#6512)
- [ ] `channel_send` tool (#6665)

### Research & Infrastructure

- [ ] ICSE 2027 allowlist aspect evaluation (25 PRs in progress)
- [ ] Nix flake improvements (#5987)

---

## 📈 Xu hướng phát triển

1. **Chuẩn hóa kiến trúc**: Dự án đang đầu tư mạnh vào refactoring để giảm technical debt
2. **Mở rộng kênh tích hợp**: Liên tục thêm kênh mới (WeCom, NEAR AI, Signal reactions)
3. **Cải thiện developer experience**: TUI, Nix flake, docs updates
4. **Ổn định production**: Xử lý các edge cases (rate limiting, memory leaks, config validation)

**Đánh giá tổng thể**: Dự án đang trong giai đoạn "consolidation" - tập trung vào chất lượng code và ổn định hơn là tính năng mới. Việc có 25 PR refactoring song song cho thấy commitment mạnh mẽ với code quality, nhưng cũng có thể làm chậm velocity ngắn hạn.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo phân tích PicoClaw - Ngày 24/05/2026

## 1. 🎯 Tóm tắt hôm nay

Ngày 24/05 đánh dấu một đợt dọn dẹp kỹ thuật quan trọng với 6 issues được đóng và 5 PR được merge. Dự án tập trung vào việc sửa lỗi nghiêm trọng về quản lý context budget, cải thiện tích hợp Discord, và nâng cấp bảo mật. Phiên bản nightly v0.2.9 đã được phát hành với các cải tiến về thinking mode của DeepSeek và hỗ trợ đa ngôn ngữ.

---

## 2. 🚀 Releases

### **v0.2.9-nightly.20260524** 
- ⚠️ **Bản build tự động** - có thể không ổn định
- Tích hợp các fixes quan trọng từ 5 PR được merge trong ngày
- Cải thiện khả năng xử lý context và tương thích với DeepSeek API

**Khuyến nghị**: Chỉ dùng cho testing, chưa nên deploy production

---

## 3. 📈 Tiến độ dự án

### **PRs đã merge (5)**

#### 🔧 **Fixes kỹ thuật nghiêm trọng**
- **#2895** - Sửa lỗi context budget overflow trong Seahorse Assembler
  - Trước đây: FreshTail (32 messages cuối) hoàn toàn bỏ qua giới hạn budget
  - Hậu quả: Request vượt quá context window → `400 BadRequestError`
  - Giải pháp: Áp dụng budget enforcement cho cả fresh tail và rebuild paths
  - **Impact**: Critical bug fix cho stability

- **#2931** - Sửa Discord không xử lý attachments cho vision
  - Discord chỉ download audio, bỏ qua images/files
  - CDN URLs bị serializer loại bỏ (chỉ chấp nhận base64)
  - Giờ download tất cả non-audio attachments
  - **Impact**: Mở khóa vision capabilities trên Discord

#### ✨ **Tính năng mới**
- **#2928** - Tích hợp DeepSeek thinking controls
  - Map `thinking_level` (off/low/medium/high/xhigh) sang DeepSeek API
  - Không cần `extra_body` overrides thủ công nữa
  - **Impact**: Trải nghiệm developer tốt hơn với DeepSeek models

- **#2930** - Nâng cấp bảo mật `golang.org/x/net` → v0.55.0
  - Fix govulncheck warnings trong `HtmlToMarkdown`
  - **Impact**: Security compliance

- **#1838** - Sửa typo trong onboarding prompt
  - Minor UX improvement

#### 🌍 **Đóng góp cộng đồng**
- **#2932** - Thêm Czech locale (792/792 strings) - đang review
- **#2933** - Line numbers + wrap toggle cho code blocks - đang review

### **PRs đang mở (2)**
- **#2883** - Hỗ trợ multi-account WeChat (stale - 7 ngày không hoạt động)
- Cần attention từ maintainers

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues được đóng (4)**

1. **#2421** - Email channel request (👍 2, 7 comments)
   - Yêu cầu từ @aquaratixc cho corporate/scientific environments
   - **Đã đóng**: Có thể do không phù hợp với roadmap hoặc thiếu resources

2. **#2894** - Context budget bug
   - Reported by @dtapps, fixed trong ngày qua #2895
   - **Turnaround time xuất sắc**: 5 ngày từ report → fix → merge

3. **#2903** - DeepSeek thinking mapping
   - Reported by @lc6464, fixed qua #2928
   - **Turnaround**: 3 ngày
   - Cho thấy responsive maintainers

4. **#2834** - Update documentation request
   - User cần hướng dẫn upgrade
   - Đóng sau 14 ngày - có thể đã được giải quyết hoặc stale

### **Issues đang mở (2)**

- **#2742** - Gateway starts with no channels (v0.2.8)
  - 5 comments, stale 22 ngày
  - Telegram channel không khởi động
  - **Cần attention**: Blocking issue cho Telegram users

- **#2880** - Android permission denied
  - Xiaomi Pocophone F1, Android 10
  - Không tạo được thư mục Downloads/picoclaw
  - **Cần attention**: Mobile experience bị ảnh hưởng

---

## 5. 🐛 Ổn định & Bugs

### **Đã sửa** ✅
- Context budget overflow (critical)
- Discord vision pipeline
- DeepSeek API compatibility
- Security vulnerabilities trong x/net

### **Đang mở** ⚠️
- **#2742** - Telegram gateway không start (v0.2.8)
  - Severity: High - blocking channel
  - Status: Stale 22 ngày
  
- **#2880** - Android storage permissions
  - Severity: Medium - affects mobile users
  - Platform-specific issue

### **Xu hướng**
- Team phản ứng nhanh với critical bugs (2-5 ngày)
- Stale issues cần được triage lại
- Mobile platform cần thêm attention

---

## 6. 💡 Yêu cầu tính năng

### **Đã đóng/Rejected**
- **Email channel** (#2421) - Không được chấp nhận
  - Lý do có thể: Complexity vs demand, maintenance burden
  - Alternative: Users có thể dùng email-to-webhook bridges

### **Đang review**
- **Multi-account WeChat** (#2883)
  - Technical approach: Dynamic `weixin_*` config keys
  - AI-generated với significant modifications
  - Status: Stale 7 ngày - cần maintainer review

### **UX improvements đang review**
- Line numbers + wrap toggle cho code blocks (#2933)
- Czech localization (#2932)

---

## 7. 👥 Phản hồi người dùng

### **Pain points**
1. **Channel stability** - Telegram không start (#2742)
2. **Mobile experience** - Android permissions (#2880)
3. **Documentation gaps** - Upgrade instructions (#2834)

### **Positive signals**
- Community contributions tăng (Czech locale, WeChat multi-account)
- Quick bug fixes cho critical issues
- Active international community (Czech, Chinese contributors)

### **Developer experience**
- DeepSeek integration được cải thiện đáng kể
- Discord vision pipeline giờ hoạt động đúng
- Context management đáng tin cậy hơn

---

## 8. 🗺️ Backlog & Roadmap

### **Immediate priorities** (suy luận từ activity)
1. ✅ **Stability** - Context budget, channel reliability
2. 🔄 **Channel expansion** - WeChat multi-account đang review
3. 🔄 **UX polish** - Code block improvements, localization

### **Technical debt**
- Stale issues cần triage (#2742, #2880)
- Mobile platform testing/support
- Documentation updates

### **Community momentum**
- Localization efforts (Czech added, 792 strings)
- Channel diversity (WeChat, Discord improvements)
- AI-assisted contributions được chấp nhận

### **Gaps cần address**
- Email channel rejected - cần communication về rationale
- Mobile stability - Android issues chưa được ưu tiên
- Stale issue management - 22+ ngày không response

---

## 📊 Metrics tổng hợp

| Metric | Value | Trend |
|--------|-------|-------|
| Issues đóng | 4 | ✅ Tốt |
| PRs merged | 5 | ✅ Productive |
| Avg fix time | 3-5 ngày | ✅ Nhanh |
| Stale issues | 2 | ⚠️ Cần attention |
| Community PRs | 2 pending | 📈 Tăng |
| Localization | +1 language | 🌍 Growing |

---

## 🎬 Kết luận

Ngày 24/05 là một ngày **productive và focused** với emphasis vào quality và stability. Team đã giải quyết được 2 critical bugs, cải thiện developer experience với DeepSeek, và nâng cấp bảo mật. Tuy nhiên, cần chú ý đến các stale issues (đặc biệt Telegram channel) và mobile platform support để duy trì momentum cộng đồng.

**Điểm mạnh**: Fast response time, community engagement, technical quality
**Cần cải thiện**: Stale issue management, mobile platform, communication về rejected features

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - 24/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 23/05 là một ngày **cực kỳ năng suất** với **9 PR được merge** trong vòng 24 giờ, tập trung vào việc sửa các lỗi nghiêm trọng trong WhatsApp adapter, hệ thống approval, và cơ chế load cấu hình. Đội ngũ đang trong giai đoạn ổn định hóa sau khi phát hiện nhiều edge case trong production, đặc biệt là các vấn đề liên quan đến persistence, routing, và container lifecycle.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng tốc độ merge PR cho thấy team đang chuẩn bị cho một bản release ổn định sau khi fix các critical bugs.

---

## 📈 Tiến độ dự án

### ✅ PRs đã merge (9 PRs)

**🔴 Critical Fixes - WhatsApp Routing**
- **#2554** - Sửa 2 lỗi nghiêm trọng trong WhatsApp adapter:
  - **LID mapping không persist** qua restart → tin nhắn từ LID-based sender bị routing fail
  - **platform_id lưu sai format** (có prefix `whatsapp:`) → silent routing failure
  - Impact: Người dùng WhatsApp không nhận được reply sau khi service restart

**🔐 Security Hardening**
- **#2545** - Thay `Math.random()` bằng `crypto.randomBytes()` cho approval card IDs
  - Ngăn chặn khả năng brute-force approval cards
  - Thêm verification cho clicker authorization

**🐛 Agent Runner Stability**
- **#2597** - Exit gracefully khi gặp database corruption thay vì infinite retry loop
  - Quan sát trên Docker Desktop macOS: container bị stuck 25+ phút
- **#2595** - Sửa logic `CLAUDE_TRANSCRIPT_ROTATE_AGE_DAYS=0` không hoạt động
- **#2596** - Update test sau khi drop `<messages>` envelope (#2556)

**📝 Configuration Loading**
- **#2598** - **Sửa lỗi nghiêm trọng**: `CLAUDE.local.md` không được load
  - Root cause: `settingSources` thiếu entry 'local'
  - Impact: Per-group memory/instructions bị bỏ qua hoàn toàn

**🎨 UX Improvements**
- **#2562** - Approval card giờ được gửi đến cả origin chat (không chỉ approval channel)
- **#2600** - Thêm MCP tool `send_carousel` cho rich messaging
- **#2599** - Fix prefill date cho new event creation
- **#2601** - User skills giờ được load như fragments
- **#2602** - Null check cho channel approval

### 🔄 PRs đang mở (4 PRs)

**⚠️ Cần attention:**
- **#2603** (NEW) - `skill/compact` branch conflict với v2:
  - `session-commands.ts` auto-merge nhưng import v1-only symbols
  - Breaking build ngay lập tức
  
**🔧 Pending review:**
- **#2346** - Unknown slash commands được treat như chat thay vì passthrough
- **#1994** - Route per-group custom OpenAI-compatible endpoints (LiteLLM, vLLM)
- **#2236** - Fix WORKDIR mismatch: Dockerfile tạo `/workspace/group` nhưng mount vào `/workspace/agent`

---

## 🌟 Điểm nổi bật cộng đồng

**Không có PR/issue nào có engagement cao** (tất cả 0 reactions), cho thấy:
- Đây là các internal fixes từ core team
- Community chưa kịp phản ứng (PRs merge rất nhanh trong ngày)
- Hoặc user base còn nhỏ/đang trong private beta

**Contributors active nhất:**
- @sumsumai: 4 PRs merged trong 1 ngày
- @IamAdamJowett: 2 PRs
- Tổng cộng 9 contributors khác nhau → team size ~10 người

---

## 🔧 Ổn định & Bugs

### 🚨 Critical Issues đã fix

1. **WhatsApp routing failures** (#2193, #2194)
   - Severity: HIGH - tin nhắn bị mất sau restart
   - Root cause: In-memory cache + format mismatch
   
2. **CLAUDE.local.md không load** (#2185)
   - Severity: HIGH - per-group customization hoàn toàn không hoạt động
   - Đã tồn tại từ lâu, mới được phát hiện

3. **Database corruption infinite loop** (#2597)
   - Severity: MEDIUM - container stuck, cần manual restart
   - Chỉ xảy ra trên Docker Desktop macOS

4. **Approval card security** (#2545)
   - Severity: MEDIUM - có thể brute-force với `Math.random()`

### 🐛 Known Issues

- **#2603** - Build break khi merge `skill/compact` vào v2
- **#2548** - Health monitor Keychain race condition (đã có PR nhưng closed, có thể reopen)

---

## 💡 Yêu cầu tính năng

**Từ PRs đang mở:**

1. **Custom LLM endpoints** (#1994)
   - Cho phép dùng LiteLLM, llama.cpp, vLLM thay vì ChatGPT
   - Quan trọng cho self-hosted deployments

2. **Rich messaging** (#2600)
   - Carousel support qua MCP tool
   - Mở rộng khả năng tương tác với users

3. **Slash command flexibility** (#2346)
   - Unknown commands → chat thay vì error
   - Better UX cho non-technical users

---

## 💬 Phản hồi người dùng

**Không có comment nào trên các issues/PRs** → Cho thấy:
- Team đang work in stealth mode
- Hoặc communication diễn ra ở channel khác (Discord, Slack)
- Issues được tạo và fix nội bộ rất nhanh

**Patterns từ bug reports:**
- Nhiều edge cases được phát hiện trong **production environment**
- Focus vào **multi-platform support** (WhatsApp, approval flows)
- **Container/Docker issues** là pain point (macOS, mount paths)

---

## 🗺️ Backlog & Roadmap

### 🎯 Ưu tiên ngắn hạn (suy luận từ activity)

1. **Stabilization phase** - Fix critical bugs trước khi release
2. **WhatsApp adapter maturity** - Nhiều fixes liên quan
3. **Configuration system overhaul** - CLAUDE.md loading cần refactor
4. **Container reliability** - Docker Desktop compatibility

### 🔮 Hướng phát triển

- **Multi-LLM support** - Không chỉ phụ thuộc Claude/ChatGPT
- **Rich messaging** - Carousel, cards, interactive elements
- **Better persistence** - Giải quyết in-memory cache issues
- **Security hardening** - CSPRNG, proper authorization

### ⚠️ Technical Debt

- **v1 vs v2 migration** - `skill/compact` branch conflicts
- **Test coverage** - Nhiều fixes không có tests đi kèm
- **Documentation** - CLAUDE.md loading behavior không rõ ràng

---

## 📊 Metrics

- **9 PRs merged** trong 24h
- **4 critical bugs fixed**
- **9 unique contributors**
- **0 releases** (đang tích lũy changes)
- **4 PRs pending** (1 blocking build)

---

## 🎬 Kết luận

NanoClaw đang trong **sprint ổn định hóa mạnh mẽ** sau khi phát hiện nhiều production issues. Team size nhỏ nhưng **velocity cao** (9 PRs/ngày), tập trung vào **reliability over features**. Các fixes cho thấy sản phẩm đang được **actively deployed** và team **responsive** với production incidents. Cần chú ý theo dõi #2603 (build break) và #1994 (custom LLM endpoints) trong những ngày tới.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 24/05/2026

## 📊 Tóm tắt hôm nay

Ngày 24/05/2026 đánh dấu một cột mốc quan trọng với **10 PR mới được tạo** trong cùng một ngày, tập trung vào hai hướng chiến lược: (1) **Hệ thống ký xác thực (attested-signing)** - một stack 10 PR để xây dựng nền tảng ký giao dịch an toàn với WebAuthn và kênh phê duyệt tách biệt, và (2) **Hoàn thiện hệ thống hooks** với các backend bền vững (PostgreSQL, libSQL) và kích hoạt production. Đây là giai đoạn chuyển đổi từ substrate sang production-ready infrastructure.

---

## 🚀 Releases

**Không có release mới** trong 24 giờ qua. Tuy nhiên, có một **bug nghiêm trọng** được phát hiện:

⚠️ **Issue #3945**: Installer script cho macOS/Linux bị hỏng từ v0.26 (1 tháng trước)
- Các hàm `select_archive_for_arch()` và `download_binary_and_run_installer()` không hoạt động
- Ảnh hưởng đến trải nghiệm onboarding của người dùng mới trên Unix-like OS
- Cần ưu tiên sửa chữa để không làm gián đoạn việc mở rộng cộng đồng

---

## 🏗️ Tiến độ dự án

### 🔐 **Attested-Signing Substrate Stack** (Mới - Ưu tiên cao)

Một **stack 10 PR** được khởi động hôm nay để xây dựng hệ thống ký giao dịch an toàn:

**PR #3960** (PR 1/10) - Foundation:
- Định nghĩa trait `SigningProvider` thuần túy, không phụ thuộc chain/crypto cụ thể
- Kiến trúc tách biệt: provider trait → canonical hash → grant store → challenge store → verifier

**PR #3961** (PR 2/10) - Canonical Binding:
- Crate `ironclaw_attestation` với `ApprovedTxHash` - hash binding bất biến
- Canonical signing-bytes cho Ethereum, NEAR, Solana
- Đảm bảo "what you approve is what you sign"

**PR #3963** (PR 3/10) - Authorization Primitives:
- `SealedGrantStore` - one-shot grant với sealed envelope pattern
- `SigningLedger` - idempotency tracking để chống replay attacks
- Fail-closed security: mọi lỗi đều từ chối thay vì cho phép

**PR #3964** (PR 4/10) - WebAuthn Integration:
- `DurableChallengeStore` - PostgreSQL/libSQL backed challenge storage
- `WebAuthnVerifier` - FIDO2 attestation verification
- Audit trail đầy đủ cho mọi signing decision

**Ý nghĩa chiến lược:**
- Giải quyết **Issue #1739** (async transaction approval) và **#3564** (unforgeable authorization channel)
- Thay thế host-resident keys bằng hardware-backed attestation
- Nền tảng cho financial execution layer (#1712)

---

### 🪝 **Hook Framework Production Activation**

**PR #3938** - Kích hoạt hooks trong production:
- Flag `HOOKS_ENABLED` (default OFF) để kiểm soát rollout
- Tích hợp `HookDispatcher` vào capability invocation path
- Ships dark - không thay đổi behavior cho đến khi flag được bật

**PR #3951** - Third-party extension hooks:
- Flag `HOOKS_THIRD_PARTY_ENABLED` (default OFF)
- Hook-only projection model để containment
- Cho phép extensions đăng ký hooks mà không expose full capabilities

**Durable Backend Stack** (4 PR):
- **#3933**: `PostgresPredicateStateBackend` - cross-host consistent state
- **#3936**: `LibSqlPredicateStateBackend` - embedded option
- **#3937**: Cross-backend adversarial parity suite - đảm bảo 3 implementations tương đương

**Security Fixes:**
- **#3931**: Đóng 3 lỗ hổng CRITICAL trong event-triggered hooks:
  - Cross-tenant leakage
  - Replay attacks
  - Provider spoofing
- **#3922**: Wire `SecurityAuditSink` vào obligation handler và hook deny paths

---

### 🏛️ **Reborn Architecture Refinement**

**PR #3948** - Scoped tenant sandbox:
- Docker command transport native cho Reborn
- Collision-resistant workspace identity từ `ResourceScope` digest
- Thay thế legacy `src/reborn_bridge` adapter

**PR #3955** - Manifest v2 progressive disclosure:
- `prompt_doc_ref` trở thành optional lazy metadata
- `capability_info` tool cho on-demand capability discovery
- Giảm prompt bloat, cải thiện token efficiency

**PR #3949** - Crate boundary refinement:
- Tách turn scheduler và memory context vào `ironclaw_loop_support`
- Giữ built-in tools trong `ironclaw_host_runtime`
- Rõ ràng hơn về separation of concerns

**PR #3952** - TOCTOU hardening:
- `LocalFilesystem` dùng fd-relative `openat2` với `RESOLVE_BENEATH`
- Kernel-race-free tenant boundary
- Bảo vệ secrets, run-state, processes, memory, conversations

---

### 🧪 **Testing & Quality**

**PR #3928** - Hook arguments_digest coverage:
- Drive snapshot test qua `invoke_capability` boundary
- Sửa caller-layer coverage gap từ #3637

**PR #3947** - Reborn event parity:
- Lifecycle event ordering verification
- Multi-tool capability dispatch testing
- Thread scheduling behavior validation

---

## 💬 Điểm nổi bật cộng đồng

### 🔥 **Wallet Integration Demand** (3 issues liên quan)

**Issue #3025** (1 comment):
- Người dùng yêu cầu hỗ trợ Trezor/MetaMask
- Hiện tại chỉ có hot wallet connector với các wallet không open-source
- Phản ánh nhu cầu về hardware wallet và transparency

**Issue #1739** (5 comments - nhiều nhất):
- Async transaction approval với WalletConnect
- Two-phase pattern: agent declare intent → human approve trên secure channel
- Liên quan trực tiếp đến attested-signing stack đang được xây dựng

**Issue #3564** (1 comment):
- Chỉ ra vấn đề kiến trúc: host-resident keys không đủ an toàn
- Cần unforgeable user-authorization channel
- Đang được giải quyết bởi attested-signing substrate

---

### 🛠️ **IronHub Integration** 

**PR #3737** (contributor mới @neo-sky):
- Install tools/skills từ IronHub qua CLI và agent tools
- Gateway HTTP endpoints với HMAC verification
- Live catalog cho runtime installation
- Đánh dấu sự mở rộng của ecosystem

---

## 🐛 Ổn định & Bugs

### ⚠️ **Critical Issues**

1. **Installer broken (#3945)** - QA test date 2026-05-24:
   - Ảnh hưởng: macOS/Linux users không thể cài đặt
   - Thời gian: Broken từ v0.26 (1 tháng)
   - Mức độ: HIGH - blocking new user onboarding

2. **Security bugs đã được fix (#3931)**:
   - Cross-tenant leakage trong event hooks
   - Replay attacks
   - Provider spoofing
   - Tất cả fixed fail-closed với TDD coverage

---

### 🔧 **Technical Debt**

**Issue #3962** (mới hôm nay):
- Standalone composition root không wire hooked-prompt deps
- Gate-ref factory / capability input resolver missing under `HOOKS_ENABLED`
- Phát hiện qua test `build_reborn_runtime_activates_hooks_through_real_composition_path`

**Follow-up Issues** (từ reviews):
- **#3959**: `SecurityAuditSink` adoption ở remaining boundary call sites
- **#3958**: Hooks.rs split (>1k lines), loader simplification
- **#3957**: Third-party activation hardening (quarantine surfacing, manifest validation)
- **#3956**: FS-hardening follow-up (RESOLVE_NO_XDEV bind-mount containment)
- **#3946**: Split production wiring validation ra khỏi services.rs (>3k lines)

---

## 💡 Yêu cầu tính năng

### 📋 **API Contracts** (Issue #3953)

Đề xuất thêm canonical OpenAPI/AsyncAPI contracts:
- OpenAPI cho HTTP routes (Gateway, WebUI, auth, jobs, memory, settings)
- AsyncAPI cho SSE, WebSocket, timeline, job, tool, approval, gate, logs
- Contract-first approach cho better integration

**Ý nghĩa**: Cải thiện developer experience, tự động generate clients, versioning rõ ràng

---

### 📝 **Documentation Improvement** (Issue #3954)

Đề xuất đổi tên `CLAUDE.md` thành tên semantic hơn:
- Hiện tại: `CLAUDE.md` gây confusion (không Claude-specific)
- Đề xuất: `IRONCLAW_DEV_GUIDE.md` hoặc tương tự
- Phản ánh legacy coupling cần được cleanup

---

### 🔐 **Financial Execution Layer** (Issue #1712)

Architecture proposal cho secure financial actions:
- Custody, signing, approvals, policy enforcement
- Cross-app crypto actions
- Hiện có read-only NEAR intents (PR #1622)
- Đang được giải quyết bởi attested-signing stack

---

## 👥 Phản hồi người dùng

### ✅ **Positive Signals**

1. **External contributor engagement**: 
   - @neo-sky với IronHub integration (#3737)
   - @nick-stebbings với per-channel tool filtering (#1378)
   - Cho thấy cộng đồng đang mở rộng

2. **Security-first approach được đánh giá cao**:
   - Fail-closed patterns
   - Comprehensive audit trails
   - TOCTOU hardening

---

### ⚠️ **Pain Points**

1. **Wallet integration complexity**:
   - Thiếu hardware wallet support
   - Hot wallet options không đủ transparent
   - Cần better documentation về wallet setup

2. **Installation friction**:
   - Installer broken 1 tháng chưa được fix
   - Ảnh hưởng đến first-time user experience

3. **Documentation gaps**:
   - Legacy naming (CLAUDE.md) gây confusion
   - Thiếu canonical API contracts
   - Setup guides chưa đầy đủ

---

## 🗺️ Backlog & Roadmap

### 🎯 **Immediate Priorities** (Dựa trên activity hôm nay)

1. **Attested-Signing Stack** (6 PR còn lại):
   - PR 5-10 sẽ complete WebAuthn integration
   - WalletConnect async approval flow
   - Production deployment của signing infrastructure

2. **Hook Framework Rollout**:
   - Enable `HOOKS_ENABLED` flag sau khi #3962 được fix
   - Monitor production behavior
   - Gradually enable `HOOKS_THIRD_PARTY_ENABLED` sau hardening (#3957)

3. **Critical Bug Fixes**:
   - Fix installer script (#3945) - blocking new users
   - Address composition root gaps (#3962)

---

### 📅 **Medium-term** (1-2 tuần)

1. **Reborn Production Hardening**:
   - Complete sandbox scoping (#3948)
   - TOCTOU follow-ups (#3956)
   - Credential boundary gaps (#3903)

2. **Durable Backend Completion**:
   - Merge PostgreSQL backend (#3933)
   - Merge libSQL backend (#3936)
   - Cross-backend parity validation (#3937)

3. **Code Quality**:
   - Split large files (hooks.rs >1k, services.rs >3k)
   - Refine crate boundaries (#3949)
   - Dead code elimination (#3943)

---

### 🔮 **Long-term Vision**

1. **Financial Execution Layer** (#1712):
   - Attested-signing substrate là foundation
   - Policy enforcement framework
   - Multi-chain support (Ethereum, NEAR, Solana)

2. **Ecosystem Expansion**:
   - IronHub marketplace maturity (#3737)
   - Third-party extension ecosystem
   - Per-channel tool routing (#1378)

3. **Developer Experience**:
   - OpenAPI/AsyncAPI contracts (#3953)
   - Better documentation structure (#3954)
   - Improved onboarding flow

---

## 📈 Phân tích xu hướng

### 🔐 **Security-First Architecture**

Dự án đang chuyển từ "make it work" sang "make it secure":
- 10 PR attested-signing stack trong 1 ngày
- Fail-closed patterns everywhere
- Comprehensive audit trails
- Hardware-backed attestation

**Insight**: IronClaw đang positioning như một **enterprise-grade AI agent platform** với security là competitive advantage.

---

### 🏗️ **Infrastructure Maturity**

- Durable backends (PostgreSQL, libSQL) thay thế in-memory
- Production-ready composition patterns
- TOCTOU hardening cho multi-tenant
- Comprehensive testing (adversarial parity suites)

**Insight**: Đang chuẩn bị cho **production deployment at scale**.

---

### 🤝 **Community Growth**

- External contributors tăng (neo-sky, nick-stebbings)
- User feedback về wallet integration
- Documentation improvement requests

**Insight**: Cộng đồng đang phát triển nhưng cần **better onboarding** (fix installer, improve docs).

---

## 🎯 Kết luận

**Ngày 24/05/2026** là một ngày đặc biệt productive với **10 PR mới** tập trung vào hai pillars chiến lược:

1. ✅ **Attested-Signing**: Foundation cho secure financial actions
2. ✅ **Hook Framework**: Production activation với durable backends

**Challenges cần address**:
- 🔴 Installer broken (blocking new users)
- 🟡 Documentation gaps (CLAUDE.md, API contracts)
- 🟡 Wallet integration complexity

**Outlook**: Dự án đang trong giai đoạn **infrastructure maturity** để chuẩn bị cho production scale. Security-first approach và comprehensive testing cho thấy commitment về quality. Cộng đồng đang phát triển nhưng cần cải thiện onboarding experience.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo Phân tích LobsterAI - Ngày 24/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 24/05 ghi nhận hoạt động tập trung vào **phân tích kiến trúc và điểm yếu hệ thống**. Người dùng @woxinsj đã tạo 3 issues phân tích sâu về các vấn đề cốt lõi của LobsterAI, đặc biệt là hệ thống memory và so sánh với OpenClaw. Không có release mới, nhưng có 2 PR cũ được đánh dấu stale, cho thấy backlog đang được dọn dẹp.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### Issues mới (3 issues - tất cả từ @woxinsj)

**🔴 #2041: Hệ thống memory là bottleneck lớn nhất**
- **Vấn đề cốt lõi**: Tác giả cho rằng thuật toán tiến hóa không phải vấn đề, mà **hệ thống memory** mới là điểm nghẽn
- **So sánh với lý thuyết**: Đối chiếu giữa framework lý tưởng (3 loại memory: trajectory/declarative/structured) với thực tế của skill-self-evolver
- **Đánh giá hiện trạng**:
  - ✅ Có khả năng tương tự về exploration
  - ⚠️ Memory trajectory có nhưng chưa đủ mạnh
  - Xuất ra `.learnings/` và `memory/` nhưng chưa tối ưu

**🔴 #2040: 5 điểm yếu nghiêm trọng của OpenClaw**
- **Phân tích chuyên sâu** về các vấn đề của OpenClaw (có thể là competitor hoặc upstream):
  1. **Memory loss** (🔴 Cao): Mỗi task bắt đầu từ đầu, không tích lũy học tập
  2. **Security holes** (🔴 Cực cao): 138 lỗ hổng trong 63 ngày, 1467/5700 skills độc hại
  3. **Token cost** (🔴 Cao): Computer Use yêu cầu model đắt đỏ, chi phí không giảm theo thời gian
  4. **Deployment complexity** (🔴 Cao): Cần desktop environment + VNC đầy đủ
  5. Vấn đề thứ 5 bị cắt trong summary

**⚠️ #2039: Bug trong Dreaming switch**
- **Bug cụ thể**: `/dreaming on` trong Web UI ghi config vào path mà memory-core không nhận
- **Tác động**: Gateway restart sẽ mất config dreaming
- **Giải pháp tạm thời**: Có thể bật lại trong Web UI
- **Giải pháp lâu dài**: Cần memory-core schema hỗ trợ thuộc tính `dreaming`
- **Upstream issue**: Đây là bug từ OpenClaw

### Pull Requests

**#1529 & #1530: Đều được đánh dấu [stale]**
- Cả 2 PR đều tạo từ 07/04, cập nhật lần cuối 23/05
- #1529: Export batch sessions sang JSON (từ @MaoQianTu)
- #1530: Chọn Agent khi tạo scheduled task (từ @gongzhi-netease)
- **Xu hướng**: Team đang dọn dẹp backlog, đánh dấu PR cũ để review hoặc đóng

---

## 🌟 Điểm nổi bật cộng đồng

**Không có tương tác cộng đồng đáng kể:**
- Cả 3 issues mới đều có 0 comments và 0 reactions
- Cho thấy đây là **phân tích nội bộ** hoặc từ core contributor
- Nội dung mang tính kỹ thuật cao, chưa thu hút discussion rộng rãi

---

## 🐛 Ổn định & Bugs

### Bug đang active

1. **Dreaming configuration persistence** (#2039)
   - Mức độ: Trung bình
   - Workaround: Có thể bật lại thủ công
   - Root cause: Schema mismatch giữa Web UI và memory-core

### Vấn đề kiến trúc được nhận diện

2. **Memory system bottleneck** (#2041)
   - Không phải bug mà là **architectural limitation**
   - Cần refactor để đạt được 3-tier memory như lý thuyết
   - Ảnh hưởng đến khả năng học tập dài hạn của agent

3. **Security concerns từ OpenClaw comparison** (#2040)
   - Nếu LobsterAI dựa trên OpenClaw, cần audit:
     - Malicious skills trong repository
     - Security vulnerabilities
     - Token cost optimization

---

## 💡 Yêu cầu tính năng

### Từ stale PRs (đang chờ review)

1. **Batch export sessions** (#1529)
   - Export nhiều conversations sang JSON
   - Hữu ích cho backup và data analysis
   - Đã implement đầy đủ backend + frontend

2. **Multi-agent task assignment** (#1530)
   - Chọn agent khi tạo scheduled task
   - Cải thiện UX khi có > 1 agent
   - Giải quyết confusion về task ownership

### Từ phân tích issues

3. **Enhanced memory system** (implicit từ #2041)
   - 3-tier memory architecture
   - Cross-task learning accumulation
   - Structured knowledge storage

---

## 💬 Phản hồi người dùng

**Tone phản hồi: Phân tích kỹ thuật sâu**

- @woxinsj thể hiện **hiểu biết sâu về AI agent architecture**
- So sánh có hệ thống với research papers và competing solutions
- Không có complaints mà là **constructive technical analysis**
- Cho thấy team đang ở giai đoạn **self-reflection và optimization**

**Sentiment**: Neutral-to-critical, mang tính xây dựng

---

## 🗺️ Backlog & Roadmap

### Ưu tiên cao (suy luận từ issues)

1. **Memory system refactoring** 
   - Nâng cấp từ current state lên 3-tier architecture
   - Critical cho long-term learning capability

2. **Security audit**
   - Nếu fork từ OpenClaw, cần kiểm tra 1467 malicious skills
   - Review 138 vulnerabilities đã biết

3. **Dreaming feature stabilization**
   - Fix schema mismatch
   - Ensure config persistence across restarts

### Backlog cleanup

4. **Review stale PRs**
   - #1529 và #1530 cần decision: merge hoặc close
   - Cả 2 đều có implementation hoàn chỉnh

### Optimization opportunities

5. **Token cost reduction** (từ OpenClaw analysis)
   - Explore lighter models cho non-critical tasks
   - Implement caching strategies

6. **Deployment simplification**
   - Reduce desktop environment dependencies
   - Containerization improvements

---

## 🎓 Insights & Recommendations

**Giai đoạn hiện tại**: LobsterAI đang ở phase **architectural maturation**
- Không còn focus vào features mới
- Tập trung vào **core system optimization**
- Học hỏi từ mistakes của OpenClaw

**Điểm mạnh**: Team có khả năng self-critique tốt, phân tích sâu technical tradeoffs

**Rủi ro**: Nếu dựa nhiều vào OpenClaw upstream, cần plan migration hoặc hardening strategy

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo phân tích dự án Moltis - 24/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 24/05 đánh dấu một đợt sửa lỗi tích cực với 3 PR được merge thành công, giải quyết các vấn đề về vault initialization, syntax highlighting và hook registration. Cộng đồng tiếp tục báo cáo các bug UI/UX mới, đặc biệt liên quan đến giao diện và bảo mật MCP. Một PR quan trọng về kiến trúc agents đang được review, hứa hẹn thay đổi cách quản lý capabilities trong hệ thống.

## 🚀 Releases

Không có release mới trong ngày hôm nay.

## 📈 Tiến độ dự án

### Pull Requests đã merge (3 PRs)

**✅ #1050 - Fix vault initialization**
- Giải quyết issue #1046 về việc không thể khởi tạo vault khi đã có password
- Thêm endpoint mới cho authenticated vault initialization
- Cải thiện messaging trong Settings > Encryption để phân biệt rõ giữa "set password" và "initialize vault"

**✅ #1048 - Register config-declared hooks**
- Fix issue #1024 về hooks được parse nhưng không được register
- Hooks từ `moltis.toml` giờ đây hoạt động đúng cách tại runtime
- Thêm test coverage cho hook discovery và execution

**✅ #1047 - Restore light mode syntax highlighting**
- Khắc phục issue #1045 về mất syntax highlighting ở light mode
- Sử dụng Shiki với inline light theme tokens
- Thêm Playwright test để tránh regression

### Pull Requests đang mở (1 PR)

**🔄 #1049 - Agents as capability boundaries** ⭐
- PR kiến trúc quan trọng, tái cấu trúc cách quản lý capabilities
- Mỗi agent preset giờ kiểm soát: model, MCP servers, sandbox policy, và skills
- Cho phép assign agents khác nhau cho các channels (use case: kids vs parents)
- Đây là thay đổi lớn về thiết kế hệ thống, cần review kỹ

## 💬 Điểm nổi bật cộng đồng

### Issues mới được tạo (24/05)

**🐛 #1055 - Horizontal scrolling in chat sessions**
- Tác giả: @vvuk
- Vấn đề UI lặp lại với chat-toolbar gây scrolling ngang
- Ảnh hưởng trải nghiệm người dùng

### Issues từ 23/05 vẫn đang active

**🔒 #1054 - Env vars exposed to LLM via mcp_list** (Mức độ: Cao)
- Tác giả: @IlyaBizyaev  
- **Vấn đề bảo mật**: Environment variables từ stdio MCP server config bị lộ cho LLM
- Cần ưu tiên xử lý để tránh leak sensitive data

**🎨 #1052 - Model picker UI issue**
- Model picker không hiển thị đủ cho model versions dài
- Vấn đề UX nhỏ nhưng ảnh hưởng usability

**🔧 #1051 - OpenAI-compatible provider validation**
- baseUrl không được validate
- URL thất bại không được log, khó debug
- Tác giả: @sayotte

**📝 #1053 - Automatic session title generation broken**
- Tính năng tự động đặt tên session không hoạt động
- Ảnh hưởng organization của chat history

## 🔧 Ổn định & Bugs

### Bugs đã fix ✅
- ✅ Vault initialization với existing password
- ✅ Hook registration từ config
- ✅ Light mode syntax highlighting

### Bugs đang mở 🔴
1. **Bảo mật cao**: Env vars leak qua MCP (#1054)
2. **UI/UX**: Horizontal scrolling (#1055)
3. **UI/UX**: Model picker overflow (#1052)
4. **Chức năng**: Auto session title (#1053)
5. **Developer experience**: OpenAI provider validation (#1051)

### Xu hướng
- Nhiều bug UI/UX được phát hiện, cho thấy người dùng đang test kỹ giao diện
- Vấn đề bảo mật MCP cần được ưu tiên
- Quality của recent releases tốt (3/3 PRs merge thành công)

## 💡 Yêu cầu tính năng

**🎯 #553 - Per-agent sloopback and timeout settings** (Từ 04/04)
- Tác giả: @bsarkisov
- Cho phép config timeout và sloopback riêng cho từng agent
- Liên quan đến PR #1049 về agent capabilities
- Có 1 comment, đang được theo dõi

## 👥 Phản hồi người dùng

### Tích cực
- Cộng đồng active trong việc báo cáo bugs chi tiết
- Issues được tạo với đầy đủ preflight checklist
- Team phản hồi nhanh với 3 fixes trong 1 ngày

### Quan ngại
- @IlyaBizyaev báo cáo nhiều issues liên tiếp (4 issues trong 2 ngày), cho thấy có thể có quality issues trong recent releases
- Vấn đề bảo mật (#1054) cần được xử lý khẩn cấp
- Một số bugs cũ như #553 (từ tháng 4) vẫn chưa được giải quyết

## 🗺️ Backlog & Roadmap

### Ưu tiên cao
1. **Bảo mật**: Fix env vars exposure (#1054)
2. **Kiến trúc**: Review và merge PR #1049 về agent capabilities
3. **UI polish**: Fix các issues UI/UX (#1055, #1052, #1053)

### Ưu tiên trung bình
4. **Developer experience**: Improve OpenAI provider validation (#1051)
5. **Feature request**: Per-agent timeout settings (#553)

### Insight chiến lược
PR #1049 về "agents as capability boundaries" là bước tiến quan trọng trong kiến trúc, cho phép:
- Multi-tenant scenarios (kids vs parents)
- Fine-grained security controls
- Better resource isolation

Nếu merge thành công, đây sẽ là foundation cho nhiều tính năng enterprise trong tương lai.

---

**📊 Thống kê nhanh**
- Issues mới: 1 (24/05), 4 (23/05)
- Issues đóng: 3
- PRs merge: 3
- PRs đang mở: 1 (quan trọng)
- Contributors active: 6 người

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo Phân tích Hệ sinh thái CoPaw - Ngày 24/05/2026

## 🎯 Tóm tắt hôm nay

Dự án CoPaw đang trong giai đoạn tích cực xử lý các vấn đề về trải nghiệm người dùng và mở rộng khả năng tích hợp. Cộng đồng tập trung vào 3 hướng chính: cải thiện giao diện Console UI, tăng cường khả năng mở rộng plugin, và giải quyết các vấn đề về quản lý tài nguyên hệ thống. Đáng chú ý là 2 PR lớn đang được review về marketplace MCP và plugin phân tích dữ liệu.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

Phiên bản hiện tại: `v1.1.8.post1`

---

## 📈 Tiến độ dự án

### Pull Requests đang hoạt động

**🔧 #4630 - MCP Marketplace Enhancement** (Đóng góp lần đầu)
- **Tác giả**: @sunies
- **Nội dung**: Tích hợp marketplace cho MCP servers với health check và key validation
- **Tính năng chính**:
  - Marketplace modal với các MCP servers phổ biến (MySQL, PostgreSQL, Redis, GitHub, GitLab, Jenkins, AliCloud OSS)
  - Hệ thống health monitoring cho kết nối MCP
  - Validation cho client keys
- **Ý nghĩa**: Nâng cao khả năng quản lý và tích hợp MCP, giúp người dùng dễ dàng kết nối với các dịch vụ bên ngoài

**📊 #4622 - DataPaw Plugin** (Đang review)
- **Tác giả**: @EliasMei
- **Nội dung**: Plugin phân tích dữ liệu với 12 kỹ năng BI
- **Đặc điểm**: Plugin độc lập, không cần sửa đổi host code
- **Ý nghĩa**: Mở rộng khả năng phân tích dữ liệu của CoPaw, hướng tới việc xây dựng hệ sinh thái plugin phong phú

### Xu hướng phát triển

📌 **Hướng mở rộng**: Dự án đang chuyển từ monolithic sang kiến trúc plugin-based, cho phép cộng đồng đóng góp tính năng mà không cần sửa core

📌 **Tích hợp bên ngoài**: Tăng cường khả năng kết nối với các dịch vụ và công cụ phổ biến thông qua MCP

---

## 🌟 Điểm nổi bật cộng đồng

### Issues được quan tâm nhất

**🔥 #4644 - Console UI Tool Calls Display Bug** (3 bình luận)
- **Vấn đề**: Tool calls không hiển thị real-time, cần refresh trang
- **Tác động**: Ảnh hưởng trải nghiệm người dùng khi theo dõi hoạt động agent
- **Mức độ**: Cao - vấn đề UX nghiêm trọng

**📱 #4635 - Mobile-friendly Client** (2 bình luận)
- **Yêu cầu**: Tối ưu WebUI Console cho mobile
- **Lý do**: Hiện tại chỉ hỗ trợ mobile qua chat channels (DingTalk, Feishu, QQ)
- **Nhu cầu**: Người dùng muốn truy cập đầy đủ tính năng console trên mobile

**💾 #4265 - Memory Exhaustion Bug** (5 bình luận - CLOSED)
- **Vấn đề**: Đọc conversation logs gây loop nén và đọc, dẫn đến hệ thống treo
- **Trạng thái**: Đã được đóng, có thể đã được fix

---

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng

**🚨 #4649 - Orphaned Cron Jobs** (Mới - 24/05)
- **Vấn đề**: Cron jobs cũ không được cleanup khi cập nhật `jobs.json`
- **Hậu quả**: Ghost tasks chạy vô thời hạn, lãng phí tài nguyên
- **Root cause**: APScheduler giữ state cũ khi file config thay đổi
- **Mức độ**: Cao - ảnh hưởng đến scheduled tasks

**🔐 #4643 - MCP OAuth Implementation Gap**
- **Vấn đề**: Không hỗ trợ gửi `client_secret` trong token exchange
- **Tác động**: Không thể kết nối với MCP servers yêu cầu confidential OAuth 2.0
- **Mức độ**: Trung bình - giới hạn khả năng tích hợp

**🔧 #4646 - MCP Tool Schema Sanitizer Bug**
- **Vấn đề**: Chuyển đổi boolean keywords hợp lệ thành invalid objects
- **Tác động**: Làm hỏng JSON Schemas của MCP tools
- **Mức độ**: Trung bình - ảnh hưởng đến tool integration

### Vấn đề UX

**🖥️ #4641 - Environment Variables Visibility**
- **Vấn đề**: Biến môi trường set qua `env set` không visible cho subprocess
- **Yêu cầu**: Cần `env get KEY` hoặc `--json` flag để scripts có thể fetch runtime

---

## ✨ Yêu cầu tính năng

### Tính năng được đề xuất

**📊 #4647 - Token Usage Display**
- **Yêu cầu**: Hiển thị token speed/usage ở cuối mỗi reply
- **Lý do**: Người dùng muốn monitor cost và performance
- **Mức độ ưu tiên**: Trung bình - quality of life improvement

**🖥️ #4645 - Remote Daemon Support for Pet**
- **Yêu cầu**: QwenPaw Pet kết nối với remote daemon
- **Use case**: Chạy daemon trên server, hiển thị Pet trên máy cá nhân
- **Lợi ích**: Tách biệt compute và UI, tăng tính linh hoạt

**🔌 #4642 - Plugin Extension Enhancement**
- **Yêu cầu**: Tăng cường khả năng mở rộng non-invasive
- **Nội dung**:
  - Context/Memory mechanism extension
  - Hook extension
  - Skills/Tool extension
  - Channel extension
  - Default Agent customization
- **So sánh**: Hiện tại kém hơn OpenClaw về extensibility
- **Thêm**: Hỗ trợ working directory như Codex, Claude Cowork

---

## 💬 Phản hồi người dùng

### Sentiment Analysis

**😤 Frustration Points**:
- Console UI không real-time → gây khó chịu khi debug
- Mobile experience kém → giới hạn use cases
- Memory issues → lo ngại về stability
- Cần nhiều manual intervention → giảm automation

**😊 Positive Signals**:
- Cộng đồng tích cực đóng góp (first-time contributors)
- Nhiều feature requests chi tiết → users engaged
- RFC discussions → community-driven development

### User Experience Insights

**🎯 Pain Points chính**:
1. **Real-time monitoring**: Thiếu visibility vào agent activities
2. **Mobile accessibility**: Không thể làm việc hiệu quả trên mobile
3. **Resource management**: Memory và cron job issues
4. **Extensibility**: Khó customize mà không sửa core code

**💡 User Expectations**:
- Muốn CoPaw hoạt động như một IDE/workspace hoàn chỉnh
- Cần transparency về token usage và costs
- Mong muốn plugin ecosystem phong phú hơn
- Yêu cầu better mobile support

---

## 🗺️ Backlog & Roadmap

### Ưu tiên cao (dựa trên activity)

**🔴 Critical**:
1. Fix orphaned cron jobs (#4649) - stability issue
2. Fix Console UI real-time display (#4644) - UX blocker
3. Fix MCP OAuth implementation (#4643) - integration blocker

**🟡 High Priority**:
1. Review và merge MCP Marketplace PR (#4630) - ecosystem expansion
2. Review DataPaw plugin (#4622) - capability expansion
3. Implement plugin extension framework (#4642) - architecture improvement

**🟢 Medium Priority**:
1. Mobile-friendly UI (#4635) - accessibility
2. Token usage display (#4647) - transparency
3. Remote daemon support (#4645) - deployment flexibility

### RFC Discussions

**💭 #4639/#4640 - Auto Session Summary Mechanism**
- **Đề xuất**: Pre-hook memory archiving khi session kết thúc
- **Vấn đề**: Agent quên ghi nhớ thông tin quan trọng sau khi hoàn thành task
- **Giải pháp**: Tự động trigger summary hook → extract key info → structured storage
- **Trạng thái**: RFC stage, cần community feedback

---

## 📊 Thống kê tổng quan

- **Issues mới**: 8 (trong đó 1 đã đóng)
- **PRs đang active**: 2
- **First-time contributors**: 2/2 PRs
- **Bugs nghiêm trọng**: 3
- **Feature requests**: 5
- **RFC discussions**: 2

---

## 🎯 Kết luận

CoPaw đang ở giai đoạn **maturation** với focus vào:
- **Stability**: Xử lý memory và resource management issues
- **Extensibility**: Chuyển sang plugin architecture
- **User Experience**: Cải thiện Console UI và mobile support
- **Ecosystem**: Mở rộng MCP integrations và plugin marketplace

Dự án có cộng đồng tích cực với nhiều đóng góp từ first-time contributors, cho thấy tiềm năng phát triển tốt. Tuy nhiên cần ưu tiên xử lý các stability issues trước khi thêm features mới.

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo phân tích GoClaw - 24/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 24/05 ghi nhận hoạt động tập trung vào việc đóng 2 PRs quan trọng: sửa lỗi nghiêm trọng về visibility của MCP tools sau khi grant (#1167) và rebrand dashboard thành TS SRE (#1169). PR tích hợp Bitrix24 (#1061) tiếp tục được cập nhật, cho thấy dự án đang mở rộng khả năng tích hợp với các nền tảng bên ngoài.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### PRs đã đóng (2)

**🔧 #1167 - Sửa lỗi MCP registry filter**
- **Vấn đề nghiêm trọng**: MCP tools không hiển thị cho agents sau khi grant MCP server
- **Nguyên nhân gốc rễ**: MCP tools được đăng ký trong agent-specific cloned registry, nhưng tool policy engine lại sử dụng reference đến global registry cũ/stale
- **Tác động**: Với restrictive tool profiles, các injected tools bị ẩn hoàn toàn
- **Ý nghĩa**: Đây là bugfix quan trọng ảnh hưởng đến core functionality của hệ thống MCP - một trong những tính năng chính của GoClaw

**🎨 #1169 - Rebrand dashboard thành TS SRE**
- Thay đổi logo/favicon, branding tại login/sidebar/setup
- Cập nhật page title và About dialog translations
- **Insight**: Cho thấy GoClaw đang được customize/white-label cho một tổ chức cụ thể (TS SRE), phản ánh khả năng enterprise adoption

### PRs đang mở (1)

**🔌 #1061 - Tích hợp Bitrix24 channel (PR 3/3)**
- Phần cuối của chuỗi 3 PRs split từ #1057
- Triển khai Bitrix24 channel core + UI + per-user MCP
- Sử dụng Path B per-user OAuth cho MCP integration
- Hỗ trợ per-user credentials trong group chats
- **Xu hướng**: Mở rộng khả năng tích hợp với CRM/collaboration platforms, tăng tính thực tế cho enterprise use cases

## 💡 Điểm nổi bật cộng đồng

Không có hoạt động tương tác đáng kể (reactions, comments) trong 24 giờ qua. Các PRs được merge nhanh chóng, cho thấy team có quy trình review hiệu quả nhưng cộng đồng external có vẻ chưa tham gia nhiều.

## 🐛 Ổn định & Bugs

**Bug đã sửa:**
- ✅ MCP tools visibility issue (#1167) - Lỗi nghiêm trọng ảnh hưởng đến tool policy engine và registry management
  - Liên quan đến architecture của agent-specific vs global registry
  - Ảnh hưởng đến restrictive tool profiles

**Đánh giá**: Việc phát hiện và sửa bug về registry reference cho thấy team đang chú ý đến các edge cases trong multi-agent architecture phức tạp.

## ✨ Yêu cầu tính năng

**Đang triển khai:**
- Bitrix24 channel integration (#1061) - Tính năng lớn đang trong giai đoạn cuối
  - Per-user OAuth flow
  - Group chat support với per-user credentials
  - MCP integration cho external platform

**Insight**: Focus vào enterprise integrations và multi-user scenarios, không phải consumer features.

## 💬 Phản hồi người dùng

Không có feedback trực tiếp từ users trong dữ liệu. Tuy nhiên, việc rebrand thành TS SRE (#1169) gián tiếp phản ánh nhu cầu customization từ enterprise customers.

## 🗺️ Backlog & Roadmap

**Từ chuỗi PRs Bitrix24:**
- PR 1/3 và 2/3 (#1060) đã được merge trước đó
- PR 3/3 (#1061) đang chờ review - khi merge sẽ hoàn thành milestone Bitrix24 integration

**Dự đoán hướng phát triển:**
- Tiếp tục mở rộng channel integrations (sau Bitrix24 có thể là các platforms khác)
- Tăng cường enterprise features (white-labeling, per-user auth)
- Cải thiện MCP tool management và policy engine

---

**📌 Kết luận**: GoClaw đang trong giai đoạn ổn định và mở rộng, tập trung vào enterprise adoption với các tính năng như white-labeling và external platform integrations. Hoạt động development ổn định nhưng cộng đồng external participation còn hạn chế.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo phân tích Hermes-Agent - 24/05/2026

## 1. 🎯 Tóm tắt hôm nay

Ngày 24/05 ghi nhận hoạt động phát triển cực kỳ sôi động với **27 PR mới được tạo** trong một ngày, tập trung vào việc sửa lỗi nghiêm trọng và cải thiện trải nghiệm người dùng. Các vấn đề về tích hợp Claude OAuth, lỗi TUI deadlock, và bảo mật skill loading được ưu tiên xử lý. Không có release mới nhưng dự án đang trong giai đoạn ổn định hóa mạnh mẽ trước một bản phát hành lớn.

## 2. 📦 Releases

**Không có release mới trong 24 giờ qua.**

Tuy nhiên, khối lượng PR tập trung vào bug fixes và security hardening cho thấy team đang chuẩn bị cho một bản release ổn định trong thời gian tới.

## 3. 🚀 Tiến độ dự án

### 🔥 PRs quan trọng nhất (24/05):

**🛡️ Bảo mật & Ổn định:**
- **#31229** [P1] - Sửa lỗi bảo mật nghiêm trọng trong skill trust matching, ngăn chặn skills độc hại từ repos giả mạo như `openai/skills-evil`
- **#30917** [P2] - Hạn chế quyền truy cập file nhạy cảm (`webhook_subscriptions.json`) xuống `0600`, bảo vệ HMAC secrets
- **#31226** [P3] - Cách ly kanban boards bị lỗi disk I/O để tránh spam traceback

**🐛 Bug Fixes nghiêm trọng:**
- **#31243** [P1] - Sửa lỗi TUI dashboard bị treo hoàn toàn do circular async-init trong `@hermes/ink` (#31227)
- **#31236** [P1] - Sửa Matrix E2EE dependencies và ngăn Discord tự động enable trên fresh install
- **#31228** [P2] - Sửa lỗi vision routing - images bị gửi đến text-only models thay vì auxiliary.vision config

**🔧 Cải thiện UX:**
- **#31249** - Nâng cấp MCP SDK missing log từ DEBUG lên WARNING với hướng dẫn cài đặt
- **#31245** - Load `.env` từ `~/.hermes/.env` canonical path khi `HERMES_HOME` bị redirect
- **#31235** [P2] - Debounce text follow-ups trong active sessions để tránh fragmentation

**✨ Tính năng mới:**
- **#31244** - Dashboard Memory Wiki với aggregation helpers và React UI
- **#31234** [P3] - Goal prompt oneshot loops deterministic với verdict preservation
- **#31238** [P3] - Native CloakBrowser backend integration

### 📈 Xu hướng phát triển:

1. **Hardening phase** - 40% PRs tập trung vào bug fixes và security
2. **Platform integration** - Nhiều fixes cho Matrix, Discord, Mattermost
3. **Developer experience** - Cải thiện error visibility và setup wizard
4. **Multi-agent features** - Memory Wiki, agent-to-agent messaging đang được phát triển

## 4. 💬 Điểm nổi bật cộng đồng

### 🔥 Issues hot nhất:

**#29125** [20 comments, 7 👍] - **Hermes không hoạt động qua Claude CLI**
- Vấn đề OAuth token từ Claude Pro/Max subscription bị reject
- Liên quan đến #15080 về HTTP 400 errors với Anthropic API
- Phản ánh nhu cầu lớn về Claude subscription integration

**#25267** [7 👍] - **Feature request: Claude Agent SDK với subscription OAuth**
- Người dùng muốn dùng Claude subscription thay vì trả thêm cho API key
- Đề xuất provider kiểu Codex-style để tránh "pay twice"

**#27145** - **Auto-assign unassigned kanban tasks**
- Tasks không có assignee bị stuck trong ready queue mãi mãi
- Dispatcher hiện tại skip tasks này hoàn toàn

### 👥 Engagement patterns:

- Issues về Anthropic/Claude integration nhận được nhiều attention nhất
- Kanban workflow improvements đang được community quan tâm
- Multi-agent communication (#25176) là feature request dài hạn

## 5. 🐛 Ổn định & Bugs

### 🚨 Critical bugs được fix:

1. **TUI Deadlock (#31227 → #31243)** - Dashboard TUI treo hoàn toàn, chỉ xuất 141 bytes ANSI rồi hang forever. Root cause: circular async-init trong esbuild `__esm` helper.

2. **Vision routing (#31179 → #31228)** - Images bị route đến text-only main model thay vì auxiliary.vision config, gây lỗi `unknown variant image_url`.

3. **Matrix E2EE (#31116 → #31236)** - E2EE dependencies không được cài đúng, crash ngay khi connect lần đầu.

4. **Skill security (#31229)** - Trusted repo matching cho phép `openai/skills-evil` bypass trust checks.

### ⚠️ Bugs đang được xử lý:

- **#31224** [P2] - `launchd_restart()` fails với bootstrap error khi plist missing
- **#31246** - MCP server misconfiguration hoàn toàn invisible (chỉ log ở DEBUG level)
- **#15080** [P1] - Claude Max OAuth tokens bị reject với HTTP 400 (ongoing từ 24/04)

### 🔍 Pattern nhận diện:

- Nhiều bugs liên quan đến **setup wizard** và **first-run experience**
- **Platform-specific issues** (Matrix, Discord, macOS launchd) chiếm tỷ lệ cao
- **Silent failures** là vấn đề lớn - logs không đủ visibility

## 6. ✨ Yêu cầu tính năng

### 🎯 Feature requests nổi bật:

**#25176** - **Multi-Agent Communication Channel**
- Use case: AI Anime Production Studio với specialized roles (Writer, Character Designer, Storyboard Artist)
- Cần agent-to-agent messaging để orchestrate creative production team
- Hiện tại phải dùng workaround qua shared memory

**#31233** - **`/split` slash command**
- Branch session VÀ mở branch trong terminal window mới
- `/branch` hiện tại switch current window → wrong default cho exploratory workflows
- Giống tmux split-window behavior

**#30437** - **Kanban assignee dropdown**
- Assignee field hiện là freeform text → dễ typo, không consistent
- Đề xuất: dropdown populated từ Hermes profiles

**#25267** - **Claude Agent SDK provider**
- OAuth-based provider cho Claude subscription users
- Tránh "pay twice" (subscription + API billing)
- Tương tự Codex-style integration

### 🔮 Xu hướng feature requests:

1. **Multi-agent orchestration** - Nhu cầu cao cho complex workflows
2. **Better UX cho power users** - Terminal splits, keyboard shortcuts
3. **Cost optimization** - Subscription-based providers thay vì pay-per-token
4. **Kanban improvements** - Auto-assignment, better task management

## 7. 💭 Phản hồi người dùng

### 😤 Pain points chính:

**1. Claude/Anthropic integration phức tạp:**
- OAuth tokens từ Claude Pro không work (#29125, #15080)
- Confusion giữa API key vs subscription credentials
- Documentation không rõ ràng về policy risks (#31237)

**2. Setup wizard issues:**
- Matrix E2EE dependencies không được cài đúng
- Discord tự động enable trên fresh installs
- Error messages không helpful (DEBUG-only logs)

**3. Silent failures everywhere:**
- MCP server misconfiguration invisible (#31246)
- Vision routing fails quietly (#31228)
- Kanban disk I/O errors spam logs (#31226)

### 😊 Positive feedback (implicit):

- Community actively contributing PRs (27 PRs trong 1 ngày!)
- Detailed bug reports với reproduction steps
- Feature requests có clear use cases và reasoning

### 🎯 User expectations:

- **"Just work" setup experience** - Ít manual intervention hơn
- **Better error visibility** - Logs phải actionable
- **Cost-effective Claude access** - Subscription integration
- **Production-ready stability** - Ít breaking changes hơn

## 8. 📋 Backlog & Roadmap

### 🎯 Priorities rõ ràng từ PR labels:

**P1 (Critical) - Đang được xử lý:**
- ✅ TUI deadlock (#31227 → #31243)
- ✅ Skill security hardening (#31229)
- 🔄 Claude OAuth issues (#15080, #29125)
- 🔄 Matrix E2EE setup (#31116 → #31236)

**P2 (High) - Next in queue:**
- Vision routing fixes (#31228)
- Gateway backend error suppression (#31239)
- Browser process cleanup (#31231)
- `/busy` command on gateway platforms (#18366)

**P3 (Medium) - Backlog:**
- Kanban improvements (#27145, #30437)
- Goal prompt determinism (#31234)
- CloakBrowser integration (#31238)
- Memory Wiki dashboard (#31244)

### 🗺️ Roadmap insights:

**Short-term (1-2 tuần):**
- Ổn định hóa Claude/Anthropic integration
- Fix remaining P1/P2 bugs
- Improve setup wizard reliability
- Better error visibility

**Mid-term (1-2 tháng):**
- Multi-agent communication features
- Kanban workflow enhancements
- Alternative browser backends (CloakBrowser)
- Memory Wiki production-ready

**Long-term (3+ tháng):**
- Full multi-agent orchestration system
- Advanced goal-driven automation
- Enterprise features (audit logs, RBAC)

### 📊 Velocity metrics:

- **27 PRs created** trong 1 ngày (24/05)
- **3 PRs merged/closed** trong 24h
- **10 active issues** với recent updates
- **High contributor activity** - Nhiều first-time contributors

---

## 🎬 Kết luận

Hermes-Agent đang trong **giai đoạn maturation** với focus mạnh vào stability và security. Team đang tích cực xử lý technical debt và user pain points trước khi push thêm features mới. Claude integration vẫn là bottleneck lớn nhất, nhưng community engagement rất cao và development velocity ấn tượng.

**Điểm mạnh:** Responsive team, active community, clear priorities  
**Điểm cần cải thiện:** Setup experience, error visibility, documentation clarity  
**Outlook:** Positive - dự án đang hướng tới production-ready stability 🚀

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*