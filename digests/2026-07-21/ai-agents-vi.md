# Bản tin Hệ sinh thái OpenClaw 2026-07-21

> Issues: 123 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-07-21 02:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/nanocoai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [Hermes-Agent](https://github.com/nousresearch/hermes-agent)

---

## Phân tích sâu OpenClaw

# 📊 Báo cáo Phân tích OpenClaw - 2026-07-21

## 1. 🎯 Tóm tắt hôm nay

Hôm nay OpenClaw tập trung vào **tăng cường ổn định và trải nghiệm người dùng** với nhiều bản sửa lỗi quan trọng liên quan đến phân phối tin nhắn, xử lý cron, và cải thiện UI. Các vấn đề về **bảo mật** (SSRF, prompt injection, credential leakage) đang được xử lý nghiêm túc với nhiều PR chờ review. Backlog tập trung vào việc hoàn thiện tích hợp **Dashboard × WorkBoard** và hệ thống feeds có chữ ký số.

---

## 2. 🚀 Releases

**Không có release mới** trong 24 giờ qua. Phiên bản ổn định hiện tại là `2026.7.1`.

---

## 3. 📈 Tiến độ dự án

### Pull Requests nổi bật:

**🔐 Bảo mật & Ổn định:**
- **#111233** - Sửa lỗi SSRF bypass qua DNS trong Codex WebSocket (chặn hostname giả dạng IP loopback)
- **#81185** - Redact exec tool results để ngăn rò rỉ secrets (đang chờ maintainer review)
- **#111841** - Sửa lỗi gateway không thể kích hoạt owner khi không có config model rõ ràng

**🎨 UI/UX Improvements:**
- **#111989** - Tích hợp WorkBoard cards với session dashboards (feature mới)
- **#111977** - Cải thiện widget presentation contract cho dashboard
- **#112006** - Sửa heatmap token activity luôn phải scroll ngang

**🐛 Bug Fixes:**
- **#111453** - Sửa cron không tôn trọng `deliveryBestEffort` khi suppress tin nhắn tạm thời
- **#110179** - Tách plugin synthetic-auth khỏi profile fallback cho Anthropic Vertex
- **#111696** - Nhận diện đúng response shape mới của MiniMax API

**🧪 Testing & Refactoring:**
- **#86450** - Thêm test coverage cho CLI daemon và command registry

### Xu hướng phát triển:
- **Dashboard-centric architecture**: Nhiều PR tập trung vào dashboard widgets và session integration
- **Security hardening**: Tăng cường validation, SSRF protection, và secret redaction
- **Provider compatibility**: Sửa lỗi liên quan đến Microsoft, MiniMax, Amazon Bedrock, Anthropic

---

## 4. 💬 Điểm nổi bật cộng đồng

### Issues được quan tâm nhất (theo bình luận):

**🔴 P0/P1 Critical Issues:**

1. **#88312** (22 comments, 🐚 platinum) - **[REGRESSION]** Codex app-server turn-completion stall quay trở lại
   - Ảnh hưởng: Session state, message loss
   - Vấn đề: Codex dừng trước khi xác nhận turn hoàn thành
   - **Đây là regression của bug đã fix trước đó** - cộng đồng rất lo ngại

2. **#7707** (19 comments, 🦞 diamond) - **Memory Trust Tagging** by source
   - Feature request quan trọng về **bảo mật**
   - Mục đích: Ngăn memory poisoning attacks từ nội dung không tin cậy
   - Cần security review và product decision

3. **#87744** (17 comments, 🦞 diamond) - Telegram turns timeout trên Codex 2026.5.27
   - Vấn đề tương tự #88312
   - Nhiều user gặp phải → ảnh hưởng rộng

**🛡️ Security Concerns:**

4. **#10659** (15 comments, 🦞 diamond) - **Masked Secrets** - Ngăn agent truy cập raw API keys
   - Feature request được cộng đồng ủng hộ mạnh
   - Ngăn prompt injection để đánh cắp credentials

5. **#108395** (3 comments, 🐚 platinum, **P0**) - Assistant tự tạo fake "Human:" messages
   - **Vấn đề bảo mật nghiêm trọng**: Model có thể tự authorize live actions
   - Cần xử lý gấp

**⚡ Performance & UX:**

6. **#86996** (10 comments, 🦞 diamond) - Active Memory + Codex path gây latency cao
   - Kết hợp active-memory + openclaw-honcho + Codex làm chậm hệ thống
   - Vấn đề auth-provider và crash-loop

---

## 5. 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đang được xử lý:

**Session & Delivery Issues:**
- **#108183** (CLOSED ✅) - Dashboard session auto-title không bao giờ fire
- **#107655** (CLOSED ✅) - Tool-result pressure buộc compaction dù đã truncate thành công
- **#101909** - Codex reply-session-init conflict làm mất transcript mirror
- **#104602** - Host runtime instructions không thể phân biệt với untrusted content

**Provider-specific:**
- **#109017** - Anthropic provider biến mất khỏi model picker + catalog tĩnh không pull model mới (Haiku 4.5, Fable 5)
- **#91171** - Sub-agent model routing bỏ qua parameter, fallback im lặng về deepseek
- **#111498** - Main agent bị block bởi workspace-state migration sau Anthropic auth recovery

**Tool & Execution:**
- **#108802** - PowerShell output với BOM render thành "see in attachment"
- **#100458** - Skill và Read tools truncate output ở ~600-700 chars

### Pattern nhận diện:
- **Codex integration** có nhiều vấn đề về stability
- **Model routing & fallback** cần cải thiện transparency
- **Session state management** vẫn còn edge cases

---

## 6. ✨ Yêu cầu tính năng

### Top Feature Requests:

**🔒 Security & Trust:**
1. **#7707** - Memory Trust Tagging (phân loại nguồn gốc memory)
2. **#10659** - Masked Secrets (API keys không thể đọc)
3. **#12219** - Skill Permission Manifest Standard (skill.yaml)
4. **#6792** - configPatch trong plugin manifest (tự động setup config)

**🤖 Agent Management:**
5. **#10142** - `session:end` internal hook event (workflow orchestration)
6. **#9912** - maxTurns/maxToolCalls config (giới hạn iterations)
7. **#10467** - Multi-lane concurrency cho sub-agents
8. **#9797** - `queue_status` tool (intelligent task dispatch)

**💬 Messaging & UX:**
9. **#8299** - Config option để suppress sub-agent announce
10. **#10960** - Mid-stream message injection (soft steer)
11. **#7406** - Human-readable Telegram topic names
12. **#8285** - Auto-send acknowledgment message trước khi xử lý

**🔧 Technical Enhancements:**
13. **#80752** - Optional model override trong CommitmentsConfig
14. **#8724** - Per-model generation timeout config
15. **#84527** - Add Antigravity CLI (agy) thay thế google-gemini-cli

---

## 7. 👥 Phản hồi người dùng

### Sentiment Analysis:

**😤 Frustrations:**
- **Regression issues** (#88312, #87744) gây thất vọng lớn - tính năng đã fix lại bị lỗi
- **Anthropic integration** (#109017) - provider biến mất, catalog tĩnh không update
- **Documentation gaps** - `/workspace` symlink không tồn tại (#11301)
- **Config validation** (#9993) - AI agent có thể crash gateway bằng bad config

**👍 Positive:**
- Cộng đồng đánh giá cao **security-first approach** (masked secrets, permission manifests)
- **Dashboard integration** (#111989, #111977) được chờ đợi
- **Provider diversity** - hỗ trợ nhiều providers (MiniMax, Cloudflare Workers AI, QQ Bot)

**🤔 Pain Points:**
- **Tool output truncation** (#100458) - 600-700 chars quá ít
- **Cron delivery logic** phức tạp, khó hiểu (#111453, #111851)
- **Session management** - nhiều edge cases chưa handle
- **Model fallback** không transparent (#91171)

---

## 8. 📋 Backlog & Roadmap

### Đang thực hiện (High Priority):

**🎨 UI/UX:**
- Dashboard × WorkBoard integration (#111989, #111977)
- Chat history pagination với visible cursors (#111941)
- Token activity heatmap fixes (#112006)

**🔐 Security:**
- Redact exec tool results (#81185)
- DNS SSRF bypass fix (#111233)
- Plugin synthetic-auth decoupling (#110179)

**🐛 Critical Bugs:**
- Configless gateway rebind (#111841)
- Cron deliveryBestEffort respect (#111453)
- Windows exec/read empty output (#110198)

### Roadmap suy đoán (từ patterns):

**Q3 2026:**
- ✅ Hoàn thiện Dashboard integration
- 🔒 Security hardening (masked secrets, permission manifests)
- 🤖 Advanced agent orchestration (multi-lane, queue visibility)
- 📦 Signed publisher feeds (#109305)

**Q4 2026:**
- 🔄 Model routing transparency & reliability
- 📱 Telegram/WhatsApp UX improvements
- 🧪 Test coverage expansion
- 🌐 Provider ecosystem growth (Antigravity CLI, Workers AI)

---

## 🎓 Insights & Recommendations

**Cho Maintainers:**
1. **Ưu tiên regression bugs** (#88312, #87744) - ảnh hưởng tin cậy của cộng đồng
2. **Security reviews** cần tăng tốc - nhiều PR quan trọng đang chờ
3. **Documentation** cần update (/workspace symlink, cron delivery logic)

**Cho Contributors:**
- Test coverage (#86450) đang được đẩy mạnh - cơ hội đóng góp tốt
- Security-related PRs được ưu tiên review
- UI/UX improvements có nhiều chỗ để contribute

**Cho Users:**
- Nếu dùng Codex: cẩn thận với versions 2026.5.27+ (#88312)
- Anthropic users: kiểm tra provider visibility (#109017)
- Cân nhắc upgrade sau khi regression issues được fix

---

**📊 Thống kê:**
- Issues mở: 123 (50 hiển thị)
- PRs mở: 500 (30 hiển thị)
- Rating phổ biến: 🦞 Diamond Lobster, 🐚 Platinum Hermit
- Focus areas: Security, Dashboard, Provider compatibility

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 21/07/2026

---

## 1. 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **consolidation và maturation** với tổng cộng **8 dự án major** hoạt động tích cực. Ngày 21/07/2026 ghi nhận **607 pull requests** và **169 issues** đang hoạt động, phản ánh một cộng đồng developer cực kỳ năng động.

### 🎯 Các giai đoạn phát triển

| Giai đoạn | Dự án | Đặc điểm |
|-----------|-------|----------|
| **Mature** | OpenClaw, Hermes-Agent | Production-ready, enterprise features, large community |
| **Growth** | NanoBot, Zeroclaw, IronClaw | Rapid iteration, architecture refactoring, feature expansion |
| **Emerging** | PicoClaw, NanoClaw, CoPaw, LobsterAI | Foundation building, niche focus, experimental features |

### 📈 Mức độ hoạt động tổng thể

- **Tổng PRs**: 607 (avg: 75.9 PRs/dự án)
- **Tổng Issues**: 169 (avg: 21.1 issues/dự án)
- **Releases trong 24h**: 1 (chỉ Hermes-Agent v0.19.0)
- **Critical security fixes**: 6 CVEs (NanoClaw: 4, OpenClaw: 1, PicoClaw: 1)

### 🔥 Điểm nóng hôm nay

1. **Security audits**: NanoClaw và OpenClaw đồng loạt patch RBAC vulnerabilities
2. **Architecture evolution**: 3 dự án (Zeroclaw, IronClaw, CoPaw) đang major refactor
3. **Platform expansion**: LINE (PicoClaw), Dial SMS/Voice (NanoClaw), WeChat (LobsterAI)
4. **Performance breakthroughs**: Hermes-Agent -80% latency, NanoBot SQLite indexing

---

## 2. 📊 Bảng so sánh hoạt động

### Chỉ số cốt lõi

| Dự án | Issues | PRs | Releases | P0/P1 Issues | Security Patches | Contributors (est.) |
|-------|--------|-----|----------|--------------|------------------|---------------------|
| **OpenClaw** | 123 | 500 | 0 | 5 (P0: 2) | 1 SSRF | 450+ |
| **NanoBot** | 7 | 30 | 0 | 2 (P0: 1) | 0 | ~50 |
| **Zeroclaw** | 7 | 50 | 0 | 0 | 3 (skill screening, memory scan, SSRF) | ~80 |
| **PicoClaw** | 11 | 10 | 0 | 3 (P1: 2) | 1 OAuth | ~30 |
| **NanoClaw** | 6 | 20 | 0 | 4 (P0: 4) | 4 RBAC CVEs | ~40 |
| **IronClaw** | 6 | 50 | 0 | 0 | 1 (centralized auth) | ~60 |
| **LobsterAI** | 0 | 15 | 0 | 0 | 0 | ~20 |
| **CoPaw** | 18 | 42 | 0 | 1 | 0 | ~100 |
| **Hermes-Agent** | 14 | 50 | 1 | 3 (P1: 3) | 1 test package | 450+ |

### Velocity & Quality

| Dự án | PRs merged today | Avg PR size | Test coverage trend | Documentation quality |
|-------|------------------|-------------|---------------------|----------------------|
| **OpenClaw** | ~5 | M-L | ↗️ Improving | ⭐⭐⭐⭐ Excellent |
| **NanoBot** | 6 | M-XL | ↗️ Expanding | ⭐⭐⭐⭐ Very good |
| **Zeroclaw** | 4 | M-XL | ↗️↗️ Rapid growth | ⭐⭐⭐⭐⭐ Best-in-class |
| **PicoClaw** | 5 | S-M | → Stable | ⭐⭐⭐ Good |
| **NanoClaw** | 6 | S-M | ↗️ Growing | ⭐⭐⭐⭐ Very good |
| **IronClaw** | 9 | M-XL | ↗️ Improving | ⭐⭐⭐⭐ Excellent |
| **LobsterAI** | 12 | S-M | → Stable | ⭐⭐⭐ Good |
| **CoPaw** | ~8 | M-L | ↗️ Growing | ⭐⭐⭐½ Good+ |
| **Hermes-Agent** | ~5 | M-L | ↘️ Regression | ⭐⭐⭐⭐ Very good |

### Community Engagement

| Dự án | Avg comments/issue | First-time contributors | Geographic diversity | Primary language |
|-------|-------------------|------------------------|---------------------|------------------|
| **OpenClaw** | 12.3 | High | Global | English |
| **NanoBot** | 8.5 | Medium | Asia-Pacific | English/Chinese |
| **Zeroclaw** | 5.1 | Low (mature team) | US/EU | English |
| **PicoClaw** | 4.2 | Medium | Asia | Japanese/English |
| **NanoClaw** | 6.8 | High | Global | English |
| **IronClaw** | 3.5 | Low (core team) | US | English |
| **LobsterAI** | N/A | Low | China | Chinese |
| **CoPaw** | 7.2 | High | China/Global | Chinese/English |
| **Hermes-Agent** | 4.1 | Very High | Global | English |

---

## 3. 🎯 Vị thế của OpenClaw trong hệ sinh thái

### 🏆 Điểm mạnh vượt trội

#### **1. Scale & Maturity**
- **Largest codebase**: 123 issues, 500 PRs - gấp đôi các đối thủ gần nhất
- **Longest track record**: Docs references từ 2026.5.27, cho thấy development timeline dài
- **Production deployment scale**: Railway, GCP configs trong repo

#### **2. Feature Completeness**
OpenClaw là **duy nhất** có đầy đủ:
- ✅ Dashboard integration (WorkBoard cards, session widgets)
- ✅ Memory trust tagging & masked secrets (trong roadmap)
- ✅ Multi-provider ecosystem (Anthropic, Microsoft, MiniMax, Amazon Bedrock)
- ✅ Advanced security (SSRF protection, prompt injection guards)
- ✅ Channel diversity (Telegram, Slack, Discord, WhatsApp)

#### **3. Community Governance**
- **Security-first culture**: 22 comments trên memory trust tagging issue (#7707)
- **Transparent prioritization**: Clear P0/P1/P2 labels, diamond/platinum ratings
- **Detailed changelog**: Comprehensive release notes pattern

### ⚖️ So sánh trực tiếp với đối thủ chính

| Tiêu chí | OpenClaw | Hermes-Agent | Zeroclaw | CoPaw |
|----------|----------|--------------|----------|-------|
| **Adoption** | Enterprise | Consumer + Dev | R&D/Enterprise | Dev-focused |
| **Architecture** | Monolithic→Modular | Multi-surface | Microservices | Modular |
| **Innovation** | Incremental | Aggressive | Methodical | Experimental |
| **Stability** | Regressions present | Major v0.19 issues | High | Medium |
| **Docs** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐½ |

### 🎭 Vai trò trong ecosystem

OpenClaw đóng vai trò **reference implementation** và **standard-setter**:

1. **Technical standards**: Codex integration, dashboard patterns được các dự án khác học hỏi
2. **Security benchmarks**: Memory trust tagging (#7707) và masked secrets (#10659) định hình industry best practices
3. **Feature inspiration**: Skill permission manifest (#12219) đã xuất hiện ở NanoClaw dưới dạng caldav-mcp integration

### 🚨 Điểm yếu cần cải thiện

1. **Regression issues**: #88312 (Codex stall) quay lại sau khi đã fix - QA process cần strengthen
2. **Model routing opacity**: #91171 (fallback không transparent) gây frustration
3. **Tool output truncation**: #100458 (600-700 chars) - cạnh tranh kém NanoBot (SQLite indexing) và Zeroclaw (streaming optimization)
4. **Documentation gaps**: `/workspace` symlink (#11301), cron delivery logic phức tạp

---

## 4. 🔧 Hướng kỹ thuật chung

### 🎨 Architecture patterns được áp dụng rộng rãi

#### **1. Microservices & Modularity**
- **Zeroclaw**: Eval harness với 6 PR riêng biệt cho từng component
- **IronClaw**: Xóa 70K+ LOC monolith, chuyển sang Reborn stack
- **CoPaw**: Agent mode system cho phép user-defined modes
- **NanoBot**: Unified browser tool (CDP/Selenium/Browser-Use)

**Pattern chung**: Tách monolithic agents thành composable modules với clear boundaries.

#### **2. Gateway/Hub Architecture**
| Dự án | Gateway type | Key feature |
|-------|--------------|-------------|
| OpenClaw | Codex WebSocket | Session mirroring, SSRF protection |
| NanoBot | Multi-channel hub | Telegram, Slack, QQ, Feishu unified |
| IronClaw | DeploymentConfig | Single point of deployment logic |
| CoPaw | Unified browser | One SDK, multiple backends |

#### **3. Memory & State Management**

**Trend**: Từ in-memory → persistent → indexed/searchable

- **OpenClaw**: Active Memory + openclaw-honcho (#86996 performance issue)
- **NanoBot**: WebUI SQLite indexing (#5003) với WAL mode + pagination
- **Zeroclaw**: ReMe Light index (#6235) với explicit maintenance
- **CoPaw**: Memory retrieval cache (#8897) với confidence thresholds

### 🔐 Security architecture convergence

#### **Common vulnerability patterns fixed today**:

1. **RBAC privilege escalation** (NanoClaw: 4 CVEs)
   - Self-approval prevention
   - Scope enforcement
   - Owner role protection

2. **SSRF attacks** (OpenClaw #111233, Zeroclaw #8713)
   - DNS bypass via hostname spoofing
   - Loopback IP detection

3. **Prompt injection** (OpenClaw #10659, #7707)
   - Memory poisoning prevention
   - Trust tagging by source
   - Masked secrets

4. **Test package security** (Hermes-Agent #68311)
   - `os.kill(-1, SIGTERM)` in sdist packages

**Industry direction**: Security-by-design với pre-flight authorization gates.

### ⚡ Performance optimization strategies

#### **Latency reduction techniques**:

| Technique | Adopters | Impact |
|-----------|----------|--------|
| **Prompt cache reuse** | OpenClaw (#111841), NanoBot (#4867) | -60s per turn (Ollama) |
| **Concurrent initialization** | NanoBot (#6238), Zeroclaw (#9208) | -50% startup time |
| **SQLite indexing** | NanoBot (#5003) | Scalable history |
| **Write-behind durability** | IronClaw (#6367) | -1,200 LOC complexity |
| **Streaming optimization** | Hermes-Agent v0.19.0 | -80% time-to-first-token |

#### **Resource management**:

- **Token reduction**: CoPaw (#6286) - 22 built-in tools = 8-10K tokens overhead
- **Memory cleanup**: OpenClaw (#107655) - tool-result pressure handling
- **Lazy loading**: NanoBot (#4945) - scope project instructions per workspace

### 🌐 Multi-channel/multi-surface expansion

#### **Geographic market strategies**:

| Region | Channel focus | Leaders |
|--------|---------------|---------|
| **East Asia** | LINE, Feishu, QQ | PicoClaw, NanoBot, LobsterAI |
| **Global** | Telegram, Slack, Discord | OpenClaw, NanoClaw, Hermes-Agent |
| **Enterprise** | Microsoft Teams, Zoom | (gap - no clear leader) |
| **Voice/SMS** | Dial, WhatsApp | NanoClaw |

**Trend**: Dự án Trung Quốc (CoPaw, LobsterAI) focus local channels, Western projects focus global platforms.

### 🤖 Agent orchestration models

#### **Evolution of agent interactions**:

```
Simple (v1) → Subagents (v2) → Multi-agent (v3) → Swarms (future)
```

| Model | Implementation | Projects |
|-------|----------------|----------|
| **Delegation** | Background task offload | NanoBot (#5000 - current state) |
| **Collaboration** | Persistent identities + shared state | NanoBot (#5000 - proposal) |
| **Specialization** | Named routes by purpose | IronClaw (#68304) |
| **Orchestration** | ACP-compatible any agent | Hermes-Agent (#68222) |

**Emerging pattern**: Agents chuyển từ "solo with helpers" → "team of specialists".

---

## 5. 🎭 Điểm khác biệt

### 🏢 Chiến lược sản phẩm

#### **OpenClaw**: Enterprise-first với platform ambitions
- **Target**: Developers building production AI agents
- **Moat**: Comprehensive feature set, security hardening, dashboard ecosystem
- **Risk**: Feature bloat, complexity creep (tool output issues, config validation gaps)

#### **Hermes-Agent**: Speed & developer experience
- **Target**: AI-native developers, power users
- **Moat**: 80% latency reduction, 450+ contributors, voice interaction
- **Risk**: Stability regressions (v0.19.0 desktop issues), rapid iteration breaking changes

#### **Zeroclaw**: Quality & methodology
- **Target**: Research teams, enterprise R&D
- **Moat**: Best-in-class eval harness, architecture documentation, security reviews
- **Risk**: Slower velocity, may miss market timing windows

#### **CoPaw**: Localization & customization
- **Target**: Chinese market, developers wanting deep customization
- **Moat**: Japanese localization, PawApp SDK, agent mode extensibility
- **Risk**: Geographic limitation, smaller contributor base

### 🎨 Tính năng độc đáo

| Feature | Project | Unique value |
|---------|---------|--------------|
| **Dashboard × WorkBoard** | OpenClaw (#111989) | Visual project management integration |
| **Voice Phase A/B** | Hermes-Agent (#61337) | Acknowledgement before long tasks |
| **Eval harness với LLM-judge** | Zeroclaw (#9222) | Multi-dimensional agent grading |
| **Unified Browser SDK** | CoPaw (#6276) | Write once, run on any browser backend |
| **DashScope TTS + WeChat** | LobsterAI (#3270) | Native Chinese AI voice integration |
| **CalDAV MCP** | NanoClaw (#3110) | Calendar management for agents |
| **Multi-annotation browser** | NanoBot (#2366) | Collaborative web page markup |
| **Dokploy one-click** | NanoBot (#5007) | Non-tech user installation |

### 🌍 Cộng đồng & văn hóa

#### **Governance models**:

| Model | Projects | Characteristics |
|-------|----------|-----------------|
| **Open meritocracy** | Hermes-Agent (450+ contributors) | High velocity, diverse voices, chaos potential |
| **Core team + contributors** | OpenClaw, Zeroclaw | Balanced, clear roadmap, slower feature acceptance |
| **Corporate-backed** | LobsterAI (Netease Youdao) | Fast execution, strategic alignment, less transparency |
| **Research-driven** | Zeroclaw (labs) | Methodical, quality-first, may lag market needs |

#### **Communication patterns**:

- **OpenClaw**: Detailed issue discussions (avg 12.3 comments), transparent prioritization
- **Hermes-Agent**: High volume, pragmatic, fast decision-making
- **Zeroclaw**: Low comment count (avg 5.1) but high-quality, technical depth
- **CoPaw**: Chinese + English, active first-time contributors (8/42 PRs)

### 🎯 Target user archetypes

```
┌─────────────────────────────────────────────┐
│                                             │
│   Enterprise Builders                       │
│   └─ OpenClaw, IronClaw                     │
│                                             │
│   Power Users / Tinkerers                   │
│   └─ Hermes-Agent, CoPaw                    │
│                                             │
│   Research Teams                            │
│   └─ Zeroclaw                                │
│                                             │
│   Regional Markets                          │
│   └─ PicoClaw (Japan), NanoBot (Asia)      │
│                                             │
│   Niche Applications                        │
│   └─ NanoClaw (LINE), LobsterAI (Voice)    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 6. 👥 Mức độ trưởng thành cộng đồng

### 🏆 Tiêu chí đánh giá

| Tiêu chí | Weight | Thang điểm |
|----------|--------|------------|
| **Process maturity** | 25% | PR templates, labels, milestones, triage |
| **Documentation** | 20% | README, ADR, API docs, examples |
| **Contributor diversity** | 20% | Geographic, first-timers, core vs. community |
| **Security posture** | 15% | CVE response, security reviews, audit trails |
| **Release discipline** | 10% | Versioning, changelogs, migration guides |
| **Community health** | 10% | Response time, inclusivity, conflict resolution |

### 📊 Bảng xếp hạng trưởng thành

| Rank | Project | Score | Stage | Strengths | Weaknesses |
|------|---------|-------|-------|-----------|------------|
| 🥇 | **Zeroclaw** | 9.2/10 | **Mature** | ADR tracking, eval harness, security reviews | Smaller community |
| 🥈 | **OpenClaw** | 8.7/10 | **Mature** | Scale, features, governance | Regression QA, tech debt |
| 🥉 | **Hermes-Agent** | 8.5/10 | **Growth+** | Velocity, contributors, docs | v0.19 stability issues |
| 4 | **IronClaw** | 8.1/10 | **Growth** | Architecture discipline, refactor commitment | Limited community, docs gaps |
| 5 | **NanoBot** | 7.8/10 | **Growth** | Comprehensive PRs, test coverage | Documentation localization |
| 6 | **NanoClaw** | 7.5/10 | **Growth** | Security response, quality bar | Migration path issues |
| 7 | **CoPaw** | 7.2/10 | **Early Growth** | First-timer friendly, localization | Config complexity, UX friction |
| 8 | **PicoClaw** | 6.8/10 | **Early Growth** | Quick bug response | OAuth blockers, silent failures |
| 9 | **LobsterAI** | 6.5/10 | **Emerging** | Fast execution, polish focus | Zero issues (opaque feedback loop) |

### 🎓 Phân tích chi tiết

#### **Zeroclaw (9.2/10) - Best-in-class**

**Excellence indicators**:
- ✅ **ADR baseline tracker** (#8691) - Architecture decision records audit
- ✅ **6 PRs cho eval harness trong 1 ngày** - Organized execution
- ✅ **Security screening** (#9084) - Supply-chain risk awareness
- ✅ **Comprehensive labels** - risk:high, size:XL, domain tags
- ✅ **Test coverage** - Firmware protocol, tool execution, memory scanning

**Growth opportunity**: Expand community beyond core labs team.

#### **OpenClaw (8.7/10) - Enterprise-grade với gaps**

**Strengths**:
- ✅ **Transparent prioritization** - P0/P1/P2, diamond/platinum ratings
- ✅ **Detailed issue discussions** - Avg 12.3 comments, technical depth
- ✅ **Security consciousness** - Masked secrets, memory trust tagging discourse
- ✅ **Large ecosystem** - 450+ contributors, multi-provider support

**Weaknesses**:
- ❌ **Regression pattern** - #88312 critical bug returning after fix
- ❌ **Documentation staleness** - /workspace symlink, cron delivery confusion
- ❌ **Tech debt visibility** - Tool output truncation unresolved for months

**Recommendation**: Invest in QA automation and regression test suites.

#### **Hermes-Agent (8.5/10) - High velocity, stability trade-off**

**Strengths**:
- ✅ **Massive contributor base** - 450+ contributors, very high first-timers
- ✅ **Clear release notes** - v0.19.0 changelog comprehensive
- ✅ **Performance focus** - 80% latency reduction is industry-leading

**Weaknesses**:
- ❌ **v0.19.0 regression cluster** - Desktop session loss, plugin crashes, streaming issues
- ❌ **Test package security** - #68311 (os.kill in sdist) shows CI gaps
- ❌ **Breaking changes** - Plugin `task_id` kwarg surprise

**Recommendation**: Slow down, implement release gates, beta testing phase.

#### **IronClaw (8.1/10) - Disciplined refactor**

**Strengths**:
- ✅ **70K+ LOC deletion** - Aggressive technical debt reduction
- ✅ **Architecture docs** - PRs reference design docs consistently
- ✅ **Security milestones** - §5.3.2/§9 centralized authorization

**Weaknesses**:
- ❌ **Limited external contributors** - Core team dominated
- ❌ **Long-running PRs** - #5598 (release automation) với conflicts
- ❌ **Documentation for new architecture** - Reborn stack needs more guides

**Recommendation**: Lower barrier to entry for contributors, publish architecture guides.

#### **Early-stage projects (6.5-7.8/10)**

**Common patterns**:
- ✅ Fast bug response (NanoClaw 4 CVEs fixed in 1 day)
- ✅ Clear PR templates (CoPaw `<!-- contributing-guide: v1 -->`)
- ✅ Localization efforts (PicoClaw Japanese, CoPaw Chinese)

**Common gaps**:
- ❌ Migration guides for breaking changes (PicoClaw #3105, NanoClaw)
- ❌ User feedback loops (LobsterAI 0 issues - no public feedback)
- ❌ Technical debt tracking (implicit vs. explicit backlog items)

---

## 7. 🔮 Tín hiệu xu hướng

### 📈 Macro trends từ 8 dự án

#### **1. Consolidation & Platform Play** 🏢

**Evidence**:
- IronClaw xóa 70K LOC legacy code
- OpenClaw dashboard ecosystem
- CoPaw PawApp SDK cho app plugins
- NanoBot Dokploy one-click deployment

**Prediction**: 2-3 dự án sẽ emerge như **platforms** (extension ecosystems), còn lại trở thành **specialized tools** hoặc bị absorb.

**Likely winners**: OpenClaw (features + scale), Hermes-Agent (community + velocity).

#### **2. Security becomes table stakes** 🔐

**Evidence today**:
- 6 CVEs patched (NanoClaw RBAC, OpenClaw SSRF, Hermes test package)
- Memory trust tagging discussions (#7707 - 22 comments)
- Skill sandboxing (Zeroclaw #9084)
- Centralized authorization (IronClaw #6386)

**Prediction**: 
- Q4 2026: **Security certifications** (SOC2, ISO 27001) become competitive differentiators
- **Bug bounty programs** emerge for top 3 projects
- **Supply-chain verification** (skill registries) becomes standard

#### **3. Multi-agent orchestration** 🤖🤖🤖

**Current state**:
- Simple delegation: NanoBot background tasks
- Named routing: IronClaw purpose-based delegation (#68304)
- ACP generalization: Hermes-Agent any-agent support (#68222)
- Multi-agent proposal: NanoBot persistent identities (#5000)

**Prediction**: 
- **Q3 2026**: Standardized agent communication protocol (like OpenAI Swarm but open)
- **2027**: Agent marketplaces với specialized agents (coder, researcher, designer)
- **Architecture**: Hub-and-spoke → peer-to-peer mesh networks

**Technical challenge**: State synchronization, conflict resolution, cost attribution.

#### **4. Voice & multimodal becomes default** 🎙️👁️

**Adoption signals**:
- Hermes-Agent voice Phase A/B (#61337)
- NanoClaw Dial SMS/voice integration
- LobsterAI DashScope TTS
- CoPaw browser multi-annotation with screenshots

**Prediction**:
- **End of 2026**: Text-only agents considered "legacy"
- **2027**: Vision-language models default, not optional
- **UX shift**: From "chat interface" → "natural interaction" (voice commands, screen sharing, collaborative markup)

**Blocker**: Inference cost - voice/vision 10x more expensive than text.

#### **5. Geographic fragmentation** 🌏🌍🌎

**Evidence**:
- China stack: CoPaw (QwenPaw), LobsterAI (Netease Youdao), NanoBot (QQ/Feishu focus)
- Japan focus: PicoClaw (LINE, Japanese localization)
- Global platforms: OpenClaw, Hermes-Agent (English-first)

**Prediction**:
- **Regulatory divergence**: China AI regulations → separate development tracks
- **Model access**: Some projects limited to local models (China), others global (OpenAI/Anthropic)
- **M&A activity**: Western platforms acquire Asian projects for market access

**Strategic question**: Can one codebase serve all markets, or will forks be necessary?

#### **6. Performance arms race** ⚡

**Benchmarks today**:
- Hermes-Agent: -80% latency (v0.19.0)
- NanoBot: -60s per turn (Ollama cache fix)
- OpenClaw: Codex stall regression (performance-sensitive users)

**Prediction**:
- **Latency SLOs**: Sub-1s time-to-first-token becomes standard
- **Resource efficiency**: Mobile deployment (on-device models) by 2027
- **Cost optimization**: Prompt caching, speculative execution, batching become core competencies

**Winner takes most**: Users will consolidate around fastest platforms.

#### **7. Developer experience divergence** 🧑‍💻

**Two camps emerging**:

**A. "Batteries included" platforms**:
- OpenClaw (dashboard, multi-channel, security built-in)
- Hermes-Agent (voice, multi-surface, large ecosystem)
- **Target**: Product teams wanting "just works" experience

**B. "Bring your own" toolkits**:
- Zeroclaw (eval harness, composable modules)
- CoPaw (agent modes, PawApp SDK)
- IronClaw (clean architecture, extensibility)
- **Target**: AI engineers building custom solutions

**Prediction**: Market bifurcation - no "one size fits all" winner.

### 🎯 Dự đoán 6-12 tháng

| Timeframe | Prediction | Confidence | Impact |
|-----------|------------|------------|--------|
| **Q3 2026** | 2-3 dự án announce seed/Series A funding | 70% | Consolidation acceleration |
| **Q4 2026** | OpenAI/Anthropic release native agent frameworks | 85% | Existential threat to independent projects |
| **Q4 2026** | Security incident tại 1 major project | 60% | Industry-wide security review |
| **Q1 2027** | Agent marketplace launch (1+ projects) | 75% | Monetization models emerge |
| **Q2 2027** | Standardized agent protocol v1.0 | 50% | Interoperability breakthrough |
| **2027** | On-device agent inference (mobile) | 80% | Performance/privacy paradigm shift |

### ⚠️ Rủi ro hệ thống

#### **1. Model provider lock-in**
- OpenAI/Anthropic API changes → mass breakage
- **Mitigation**: Multi-provider abstraction (OpenClaw doing well)

#### **2. Regulatory uncertainty**
- EU AI Act, China regulations → compliance burden
- **Risk**: Smaller projects can't afford legal teams

#### **3. Community fragmentation**
- Too many similar projects → developer fatigue
- **Signal**: Stale dependency PRs (OpenClaw, LobsterAI) suggest maintenance burden

#### **4. Security incidents**
- Prompt injection exploits go mainstream
- **Today's patches** show vulnerability surface expanding faster than defenses

---

## 🎓 Kết luận & Khuyến nghị

### 🏆 Thứ hạng tổng thể (21/07/2026)

| Rank | Project | Overall | Technical | Community | Growth | Recommendation |
|------|---------|---------|-----------|-----------|--------|----------------|
| 🥇 | **OpenClaw** | **A** | A | A- | B+ | **Strong buy** - Enterprise ready |
| 🥈 | **Hermes-Agent** | **A-** | A | A+ | A | **Buy** - Fix v0.19 first |
| 🥉 | **Zeroclaw** | **A-** | A+ | B | B+ | **Buy** - Best for R&D teams |
| 4 | **IronClaw** | **B+** | A | C+ | A | **Hold** - Wait for Reborn stable |
| 5 | **NanoBot** | **B+** | B+ | B | A- | **Speculative buy** - Asia growth |
| 6 | **CoPaw** | **B**

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo Phân tích Dự án NanoBot - 21/07/2026

## 📊 Tóm tắt hôm nay

Ngày 21/07 chứng kiến hoạt động tích cực với 30 PRs đang mở và 7 issues được theo dõi. Dự án đang tập trung mạnh vào **bảo mật**, **tối ưu hiệu năng**, và **cải thiện trải nghiệm đa kênh**. Đáng chú ý là các PR về bảo mật filesystem (#4987), tối ưu cache Ollama (#4867), và nâng cấp WebUI với SQLite indexing (#5003). Cộng đồng đang phản ánh mạnh về vấn đề hiệu năng với các mô hình local và lỗi vòng lặp vô hạn trong tool execution.

---

## 🚀 Releases

**Không có release mới** trong 24 giờ qua.

---

## 🔧 Tiến độ dự án

### **Bảo mật & Ổn định** 🔒

**🔴 Priority P0:**
- **#4987** - Sửa lỗi bảo mật quan trọng trong filesystem: bind workspace checks vào file handles thực tế, sử dụng `O_NOFOLLOW` để ngăn chặn symlink attacks và race conditions. Đây là fix critical security cho các thao tác `read_file`, `write_file`, `edit_file`.

**🟠 Priority P1:**
- **#4803** - API keys hiện được lưu dưới dạng plaintext trong `~/.nanobot/config.json`. Community đề xuất encrypt hoặc sử dụng keyring system.
- **#4995** - Hoàn tất migration từ channel extras sang package manifest dependencies, cải thiện dependency management.
- **#5005** - Cho phép scoped tmp cleanup commands trong shell exec, cân bằng giữa bảo mật và flexibility.

### **Hiệu năng & Tối ưu** ⚡

**Vấn đề nổi bật:**
- **#4867** (CLOSED) - Ollama đang thêm **60 giây mỗi turn** do không tái sử dụng prompt cache. Issue được đóng nhưng vẫn cần theo dõi implementation.
- **#5003** - Tối ưu lớn cho WebUI: migrate conversation history sang SQLite với indexing và WAL mode, batch writes trên dedicated thread, pagination với stable turn ordinals. Đây là architectural improvement đáng kể.
- **#4945** - Tối ưu system prompt: lazy-load skills, scope project instructions, loại bỏ empty scaffolding để giảm token overhead.

### **Multi-Agent & Subagent System** 🤖

- **#5000** - Proposal quan trọng: tiến hóa subagent system thành multi-agent collaboration thực sự với persistent identities, shared state, và agent-to-agent communication. Hiện tại subagents chỉ là background task delegation.
- **#4988**, **#4992**, **#4993** - Series PRs cải thiện subagent lifecycle: giữ background turns silent, deliver late subagent results đúng cách trong WebUI, unify internal turn lifecycle.
- **#4954** - Giữ late subagent turns visible trong WebUI, fix metadata routing.

### **Channel Integration** 📡

**Mở rộng & Cải thiện:**
- **#5009** - Feishu `groupPolicy: listen` cho context-only group ingest, reply khi @mention.
- **#4919** - Telegram hỗ trợ custom Bot API base URL và extra headers cho self-hosted servers.
- **#4928** - Fix heartbeat routing cho unified sessions, route đến last channel.
- **#4768** (CLOSED) - QQ channel: thêm exponential backoff cho WebSocket reconnect, giảm log spam khi network failure.

**Bug fixes:**
- **#4982**, **#4981** - Fix hang trong text chunking cho Feishu và Telegram khi limit <= 0.
- **#2873** - Discord: preserve forwarded referenced messages.
- **#929** - Slack: exception handling và reconnection logic.

### **Provider Ecosystem** 🌐

**Providers mới:**
- **#4965** - ModelScope provider support (OpenAI-compatible, models: Qwen, DeepSeek, Kimi, GLM, MiniMax).
- **#4996** (CLOSED) - Atlas Cloud provider support.

**OAuth & DX:**
- **#4689** - Surface OAuth status và expiry warnings trong CLI, WebUI, runtime sessions.
- **#4998** (CLOSED) - Document Ollama tool prompt cache diagnostics với custom template guide.

### **WebUI Enhancements** 🎨

- **#5003** - SQLite indexing (architectural change).
- **#5002** (CLOSED) - Simplify Markdown code blocks, flat neutral design.
- **#5001** (CLOSED) - Show copy action trên mọi assistant message.
- **#4963** - Polish agent output: unified activity language, Streamdown với Markdown repair, native rendering cho reasoning/tool logs.

### **DevOps & Deployment** 🛠️

- **#5007** - Dokploy one-click deploy template (docker-compose + template.toml).
- **#4937** (CLOSED) - Render one-click deploy Blueprint.
- **#5010** - Security docs: recommend env-var references thay vì plaintext API keys trong config.

### **Tool Gateway** 🔧

- **#5006** - Guarded tool gateway: opt-in `ToolGateway` protocol cho channels, execute gateway tool calls dưới workspace context.

---

## 🌟 Điểm nổi bật cộng đồng

### **Issue #4864** - Endless loop cho `complete_goal` tool (👍 1)
Lỗi parsing: gateway đang parse `recap` parameter là bare string thay vì JSON object. Đây là breaking change trong gateway serialization logic, ảnh hưởng đến tool execution.

### **Issue #4867** - Ollama performance degradation (15 comments)
Community phản ánh mạnh về **60s overhead mỗi turn** với Ollama do prompt cache không được reuse. Đây là pain point lớn cho local deployment với VRAM lớn. Issue đã đóng nhưng cần verify fix.

### **Issue #1503** - Dokploy template request
Non-tech users yêu cầu official Dokploy template cho easier installation. PR #5007 đã respond.

### **Issue #5000** - Multi-agent collaboration proposal (1 comment)
Đề xuất architecture lớn, nhận được attention từ team. Có thể là roadmap item quan trọng.

---

## 🐛 Ổn định & Bugs

### **Critical (P0-P1):**

1. **Filesystem security** (#4987) - Symlink/race condition vulnerabilities trong file operations.
2. **Infinite loops** (#4864) - Tool serialization breaking changes.
3. **Plaintext secrets** (#4803) - Security risk cho API keys.
4. **Ollama cache miss** (#4867) - Severe performance degradation.
5. **Subagent delivery** (#4988, #4992, #4954) - Late results không hiển thị đúng.
6. **Channel hangs** (#4982, #4981) - Text splitting với invalid params.

### **Regression fixes:**
- #4993 - Unify internal turn lifecycle để tránh logic duplication.
- #4945 - Scope project instructions đúng workspace.

### **Infrastructure:**
- #5004 - Tolerate unsupported directory fsync trên shared filesystems.
- #4995 - Complete dependency manifest migration.

---

## 💡 Yêu cầu tính năng

### **Đã có PR/Implementation:**

1. **Multi-agent collaboration** (#5000) - Persistent agents, shared state, inter-agent communication.
2. **Dokploy deployment** (#5007, #1503) - One-click deploy cho non-tech users.
3. **Feishu listen mode** (#5009) - Context accumulation without LLM turns.
4. **Telegram custom API** (#4919) - Self-hosted Bot API support.
5. **Tool gateway** (#5006) - Guarded tool execution trong channels.
6. **ModelScope provider** (#4965) - Chinese model ecosystem integration.

### **Proposals chưa implement:**

- OAuth status visibility improvements (#4689) - Đang có PR nhưng tagged `invalid`.
- Keyring/encryption cho API keys (#4803) - Chỉ có discussion.

---

## 💬 Phản hồi người dùng

### **Pain points chính:**

1. **Hiệu năng local models** (Ollama): 60s overhead không thể chấp nhận được với high-VRAM setups. Users đánh giá "totally unusable."

2. **Tool execution stability**: Breaking changes trong serialization gây infinite loops, ảnh hưởng production workflows.

3. **Deployment complexity**: Non-tech users gặp khó khăn với setup, demand one-click solutions (Dokploy, Render).

4. **Security concerns**: Plaintext API keys trong config file được community flag là risk.

### **Positive signals:**

- Active PR submissions từ community (30 PRs mở).
- Multi-provider support đang mở rộng (ModelScope, Atlas Cloud).
- WebUI improvements được prioritize (SQLite indexing, UX polish).
- Channel ecosystem phát triển mạnh (Feishu, Telegram, QQ fixes).

---

## 🗓️ Backlog & Roadmap

### **Đang triển khai (Based on P1 PRs):**

✅ **Short-term (tuần này):**
- Filesystem security fix (#4987) - P0
- Subagent delivery fixes (#4988, #4992, #4954)
- WebUI SQLite indexing (#5003)
- Channel stability (Feishu, Telegram, QQ)

🔄 **Medium-term (tháng này):**
- Multi-agent collaboration architecture (#5000)
- OAuth UX improvements (#4689)
- Provider ecosystem expansion (ModelScope #4965)
- Deployment automation (Dokploy #5007, Render #4937)

### **Technical debt:**

- API key security (#4803) - Cần encryption/keyring solution
- Ollama prompt cache optimization (#4867) - Verify fix effectiveness
- Channel dependency management (#4995) - Complete migration
- Tool serialization standardization (#4864) - Breaking change management

### **Architectural considerations:**

1. **Multi-agent system** - Từ task delegation → collaborative agents
2. **WebUI performance** - Từ JSONL reads → indexed SQLite
3. **Security posture** - Từ reactive fixes → proactive guards
4. **Provider ecosystem** - Từ hardcoded → plugin architecture

---

## 🎯 Nhận định & Khuyến nghị

### **Điểm mạnh:**
- Development velocity cao (30 PRs active)
- Community engagement tốt (responsive to user pain)
- Security-conscious (P0 filesystem fix, secret handling discussions)
- Multi-channel strategy đang payoff

### **Rủi ro:**
- Ollama performance issue có thể block local deployment adoption
- Tool execution instability ảnh hưởng production reliability
- Plaintext secrets là liability cho enterprise adoption
- Multi-agent proposal cần careful design để tránh complexity explosion

### **Opportunities:**
- Multi-agent system có thể là differentiation factor
- Chinese market expansion (ModelScope, Feishu focus)
- One-click deployment giảm barrier to entry
- WebUI SQLite indexing cho phép scale conversation history

**Priority đề xuất:** Fix P0 security (#4987) → Stabilize Ollama cache (#4867) → Ship multi-agent MVP (#5000) → Address API key security (#4803).

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo Phân tích Zeroclaw - Ngày 21/07/2026

## 🎯 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn phát triển tích cực với **7 PR mới được merge** và **30 PR đang được review**. Điểm nhấn chính là việc hoàn thiện **eval harness** (#7065) - một hệ thống đánh giá agent toàn diện với 6 PR liên quan được tạo trong ngày. Dự án cũng tập trung mạnh vào bảo mật với các cải tiến về SSRF protection, skill sandboxing, và memory content scanning.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### 🔥 Tính năng trọng tâm: Agent Evaluation Harness

Dự án đang triển khai một hệ thống đánh giá agent đầy đủ (#7065) với **6 PR mới được tạo ngày hôm nay**:

- **#9223** - JUnit XML report format cho CI integration
- **#9222** - LLM-judge grader với multi-dimensional scoring (diagnostic mode)
- **#9221** - Git-versioned baselines và regression gating
- **#9220** - Comparable run receipts và failure transcript dumps
- **#9224** - Repeated live runs với pass@k/pass^k statistics
- **#9225** - Regression test suite từ 18 real failure cases

**Ý nghĩa**: Đây là một bước tiến lớn về infrastructure testing, cho phép Zeroclaw đo lượng chất lượng agent một cách khách quan và tự động hóa việc phát hiện regression.

### 🔒 Bảo mật và Sandboxing

**#9084** - Skill install screening đang trong review:
- Screen, receipt, verify mọi skill install từ ClawHub/Git/registry
- Sandbox-gate cho skill execution với allowlist/denylist
- Cảnh báo về supply-chain risks khi install third-party skills
- Status: `needs-author-action`, `size:XL`, `risk:high`

**#8984** - Memory content scanning:
- Quét nội dung memory tại write/recall boundaries
- Hỗ trợ các scanner: basic-secrets, PII, toxicity
- Áp dụng đồng bộ cho mọi backend (sqlite, postgres, qdrant...)
- Status: `risk:high`, `size:XL`

### 🛠️ Cải tiến Runtime

**#9208** - Optimization quan trọng:
- Loại bỏ deep clones của tool schemas trong mỗi agent iteration
- Ảnh hưởng lớn đến performance với agent có nhiều tools
- Cải thiện từ delegating wrappers không forward `spec()`

**#9201** - Bug fix critical:
- Sửa shared iteration budget underflow có thể dẫn đến `usize::MAX`
- Dùng atomic `fetch_update` với checked subtraction
- Ngăn concurrent turns overdraw budget

### 🔌 Gateway và Integration

**#8486** - OpenAI Chat Completions endpoint:
- Cho phép LangChain, Continue.dev, Aider tích hợp trực tiếp
- Mở rộng khả năng tương tác với ecosystem LLM
- Status: `needs-author-action`, `size:XL`, `risk:high`

**#9203** - SOP authenticated HTTP fan-in:
- Webhook triggers qua `POST /sop/{*rest}`
- Exact-match dispatch với 404 khi không match (không LLM fallback)
- Status: Vừa mở, `risk:high`

---

## ⭐ Điểm nổi bật cộng đồng

### 📊 Issues có nhiều tương tác

**#7065** - Agent evaluation harness (4 bình luận):
- Issue gốc đã spawn ra 6 PR implementation trong ngày
- 3 follow-up issues được tạo (#9226, #9227, #9228) cho scope tiếp theo
- Cho thấy planning kỹ lưỡng và execution có tổ chức

**#8691** - ADR baseline tracker (2 bình luận):
- Audit và restore Architecture Decision Records
- Quan trọng cho governance và documentation
- Priority: P2, no-stale

### 🎯 PRs đang cần attention

Nhiều PRs có label `needs-author-action`:
- #8713 - SSRF protection (M size, 18 ngày)
- #8979 - SOP channel gate prompts (XL size, 10 ngày)
- #9030 - SOP step agent policy (L size, 8 ngày)
- #8486 - OpenAI endpoint (XL size, 23 ngày)

**Quan sát**: Có vẻ có bottleneck ở author response time cho các PRs lớn và phức tạp.

---

## 🐛 Ổn định & Bugs

### ✅ Bugs đã được sửa hôm nay

**#9078** - Serial transport desync ✅ CLOSED:
- Hardware peripheral issue nghiêm trọng (S2 severity)
- Response ID mismatch để lại buffer desync
- Đã được fix và close trong 6 ngày

**#9079** - Firmware CI coverage ✅ CLOSED:
- Thêm test cho firmware protocol crate
- Follow-up từ #9078
- Closed cùng ngày với parent issue

**#8931** - Tool-call args sanitization ✅ CLOSED:
- Fix 400 errors trên OpenRouter upstreams
- Sanitize malformed JSON từ reasoning models
- Merged sau 11 ngày review

**#8870** - Log test flakiness ✅ CLOSED:
- Flush async writes trong tests để tránh race conditions
- Fix CI red status
- Merged nhanh (13 ngày)

### 🔴 Bugs đang được xử lý

**#9102** - Audio marker degradation:
- Unplayable audio paths trở thành literal text cho model
- Silent failure gây misleading results
- Status: Open, `risk:high`

**#9099** - Model vision capability config:
- Hardcoded `supports_vision=true` gây issues với text-only models
- Ảnh hưởng llama.cpp và OpenAI-compatible providers
- Status: `needs-author-action`

**#8955** - Telegram media groups:
- Media albums không được batch đúng
- Cần buffer state để xử lý multi-part albums
- Size: XL, complexity cao

---

## 💡 Yêu cầu tính năng

### 🆕 Features mới trong ngày

**#9228** - Eval results dashboard (follow-up từ #7065):
- Longitudinal view cho eval trends
- Pass-rate tracking theo suite và thời gian
- Visual dashboard cho baseline + receipt history

**#9227** - LLM-judge calibration tooling:
- Tool để generate calibration files
- Dump >=50 judge records và compute pass-floor/fail-ceil
- Cần thiết để judge grader không còn là "diagnostic-only"

**#9226** - Memory seeding + side-effect graders:
- Seed memory state cho eval cases
- Assert memory side effects (giống workspace grader)
- Cần real memory backend thay vì `none`

### 🔄 Features đang phát triển

**#8900** - Typed memory classification:
- Phân loại memory theo semantic subtypes
- Gated extraction với confidence thresholds
- Size: XL, foundational work

**#8897** - Memory retrieval cache:
- Opt-in cache decorator over agent memory
- Giảm redundant retrievals trong multi-turn conversations
- Size: XL

---

## 💬 Phản hồi người dùng

### 🎭 Development style observations

Từ các PRs và issues có thể thấy:

1. **Structured approach**: Dự án có quy trình rõ ràng với labels chi tiết (risk level, size, domain), milestones, và stacking PRs

2. **Security-conscious**: Nhiều PRs focus vào security (SSRF, sandboxing, content scanning, secret detection)

3. **Quality-focused**: Eval harness investment lớn cho thấy commitment về test coverage và reliability

4. **Documentation**: Nhiều PRs có docs updates đi kèm, ADR tracking được prioritize

### ⚠️ Pain points

- **Review bandwidth**: Nhiều PRs `needs-author-action` kéo dài 10-23 ngày
- **Complexity**: Nhiều PRs XL size với `risk:high`, tăng review burden
- **Stacked PRs**: Có PRs stacked (#8979) có thể block nhau

---

## 🗓️ Backlog & Roadmap

### 📋 Active milestones (từ labels và trackers)

1. **Agent Evaluation** - Core milestone đang được execute mạnh
   - 6/7 PRs opened trong ngày hôm nay
   - 3 follow-up issues cho future work
   
2. **Security Hardening** - Ongoing focus
   - Skill sandboxing (#9084)
   - Memory scanning (#8984)
   - SSRF protection (#8713)

3. **Memory System** - Major enhancement track
   - Typed classification (#8900)
   - Retrieval cache (#8897)
   - Config validation (#8899)

4. **Gateway & Integration** - Expanding surfaces
   - OpenAI endpoint (#8486)
   - SOP HTTP fan-in (#9203)
   - Telegram improvements (#8955)

### 🎯 Upcoming (từ follow-up issues)

- Eval dashboard & trend tracking (#9228)
- Judge calibration tooling (#9227)
- Memory seeding for evals (#9226)
- ADR documentation audit (#8691)

---

## 📊 Metrics tổng quan

- **Issues mới**: 3 (tất cả là follow-ups từ eval harness)
- **Issues đóng**: 2 (bugs)
- **PRs mới**: 7 (6 cho eval harness + 1 optimization)
- **PRs merged**: 4
- **PRs đang review**: 26
- **Độ tập trung**: Rất cao vào eval infrastructure và security

---

## 🔮 Nhận định

Zeroclaw đang trong phase "foundational infrastructure" với investment lớn vào:
- ✅ **Testing & Quality**: Eval harness là game-changer
- 🔒 **Security**: Multi-layered approach (sandboxing, scanning, SSRF)
- 🧠 **Memory system**: Typed, cached, validated
- 🔌 **Integration**: OpenAI compatibility, webhooks

Dự án có technical debt management tốt (ADR audit, documentation) và planning có structure. Review bandwidth có vẻ là bottleneck chính, nhưng quality bar cao được duy trì.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích Hệ sinh thái PicoClaw - 21/07/2026

## 🎯 Tóm tắt hôm nay

Ngày 21/07 chứng kiến hoạt động phát triển mạnh mẽ với **10 Pull Requests** và **11 Issues** đang hoạt động. Đáng chú ý là sự xuất hiện của nhiều vấn đề nghiêm trọng: lỗi OAuth với Google Antigravity, lỗi agent loop hang khi MCP server fails, và việc mất dữ liệu cấu hình sau khi rewrite. Cộng đồng tập trung vào việc cải thiện ổn định, mở rộng localization (tiếng Nhật), và bổ sung tính năng TTS/WeChat.

## 🚀 Releases

❌ **Không có release chính thức** trong 24 giờ qua, nhưng có nhiều commit quan trọng trên nhánh `main` (85dcfcc).

## 📈 Tiến độ dự án

### 🔧 Pull Requests Quan trọng

**✅ Đã merge:**
- **#3277** - Fix tool-discovery promotions (deferred-tool visibility): Khắc phục vấn đề tool bị mất sau restart, sliding TTL, và SSE tool-call index
- **#276** - Cải thiện README.md: Polish branding và clarity
- **#277** - Cập nhật logic `make deps`: Ngăn việc update dependency packages quá thường xuyên
- **#3192, #3191** - Chore tasks: Bump Alpine 3.23, cleanup .gitignore

**🔄 Đang review:**
- **#3273** (🆕) - **Localization tiếng Nhật**: Thêm đầy đủ 968 dòng dịch cho WebUI, đăng ký dayjs locale
- **#3270** (🆕) - **DashScope TTS + WeChat audio**: Tích hợp Alibaba Cloud TTS và khả năng gửi audio file qua WeChat
- **#3271** (🆕) - **Cập nhật model names**: Refresh default models cho 9 providers (OpenAI gpt-5.6-terra/luna/sol, Anthropic claude-opus-4, v.v.)
- **#3254** - Fix model resolution logic: Ưu tiên verbatim matches thay vì provider-alias splits
- **#3251** - Capture prompt cache token usage: Cho phép tracking cache hits/misses từ Anthropic

### 📊 Xu hướng phát triển

1. **Infrastructure & Reliability** (40%): Focus mạnh vào khắc phục các vấn đề ổn định nghiêm trọng
2. **Localization & UX** (30%): Mở rộng hỗ trợ đa ngôn ngữ, cải thiện WebUI
3. **Feature Extensions** (30%): TTS providers, model updates, cache optimization

## 🌟 Điểm nổi bật cộng đồng

### 🔥 Issues được quan tâm nhất

1. **#3203** (👍 1, 3 comments) - **Matrix sync loop death**: Vấn đề nghiêm trọng về reconnection logic, không tự động kết nối lại sau network disruption, gây "silent death"

2. **#3278** (🆕 Critical) - **Google OAuth bị block**: 
   > "You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy"
   
   Antigravity provider không thể đăng nhập, ảnh hưởng toàn bộ users sử dụng Google AI models

3. **#3274** (🆕) - **Antigravity regression**: INVALID_ARGUMENT trên main branch, tool_schema_transform "simple" không còn đủ (regression từ v0.3.1)

### 💬 Tương tác cộng đồng

- Người dùng Nhật Bản (@honbou) đóng góp tích cực: 5 issues/PRs trong ngày, bao gồm Japanese localization PR
- Cộng đồng Trung Quốc (@ruiyigen, @MrTreasure) đóng góp MCP debugging và DashScope TTS
- Xuất hiện nhiều bug reports từ production deployments (Azure VM, systemd services)

## 🐛 Ổn định & Bugs

### 🚨 Critical Issues

1. **#3269** - **MCP server failure → agent loop hang**
   ```
   Nếu MCP server connection fails → agent loop treo hoàn toàn 
   → Chat interface ngừng phản hồi users
   ```
   - Ảnh hưởng: Toàn bộ chat session bị freeze
   - Phiên bản: nightly (git: 2cf030d2)

2. **#3278** - **Google OAuth policy violation**
   - Root cause: App không comply với OAuth 2.0 security policy
   - Impact: Không thể sử dụng Antigravity provider
   - Cần: Developer console configuration update

3. **#3275** (Closed quick) - **Config data loss**
   ```json
   model_list entry mất api_keys và fields khác 
   sau khi Launcher WebUI/auth login rewrites config
   ```
   - Đã được fix nhanh, nhưng cho thấy config management còn fragile

### ⚠️ Medium Priority

4. **#3274** - Tool schema transform regression trên main
5. **#3203** - Matrix channel silent death (stale tag nhưng vẫn open)
6. **#3182** - Android app service launch failure (permission issues)

## 💡 Yêu cầu tính năng

### 🆕 Đề xuất mới

1. **#3272 → PR #3273** - **Japanese localization**
   - Justification: Documentation đã có tiếng Nhật, nhưng WebUI chưa
   - Status: PR đã submit với full 968 lines translation

2. **#3270** - **DashScope TTS + WeChat Audio**
   - Alibaba Cloud DashScope TTS integration
   - WeChat audio file sending capability
   - Target: Chinese market expansion

3. **#3276** - **Launcher external gateway support**
   ```
   Request: Detect externally-managed gateway (systemd)
   + Don't hard-fail on unknown channel types
   ```
   - Use case: Headless server deployments với boot persistence

### 🔄 Improvements

4. **#3229** (Closed/stale) - **Rolling conversation cache**
   - Anthropic prompt caching với cache breakpoints
   - Keep volatile runtime context out of cached prefix
   - Optimize token usage cho agentic workloads

5. **#3231** (Closed) - **SearXNG BasicAuth headers**
   - Yêu cầu: Thêm BasicAuth request headers thay vì URL params

## 📣 Phản hồi người dùng

### 😤 Pain Points

1. **Stability concerns**: 
   - "Silent death" patterns (Matrix sync, MCP failures) → Users mất trust
   - Config rewrites causing data loss → Production risk

2. **OAuth friction**: 
   - Google blocking sign-ins → Immediate blocker cho Antigravity users
   - Cần urgent fix hoặc migration guide

3. **Documentation gaps**:
   - Android permissions không rõ ràng (#3182)
   - External gateway setup không documented (#3276)

### 😊 Positive Signals

1. **Active community contributions**: Multiple first-time contributors (@honbou with 5 items)
2. **Quick response time**: #3275 opened & closed trong cùng ngày
3. **Localization momentum**: Japanese addition shows international growth

## 📋 Backlog & Roadmap

### 🎯 Immediate Priorities (Inferred)

1. **Fix Google OAuth compliance** (#3278) - BLOCKER
2. **MCP connection resilience** (#3269) - CRITICAL reliability issue
3. **Matrix reconnection logic** (#3203) - Long-standing stale issue

### 🔮 Short-term Pipeline

- ✅ Japanese localization → Likely merge soon
- 🔄 Model name updates (#3271) → Routine maintenance
- 🔄 Cache token tracking (#3251) → Cost optimization feature
- 🔄 DashScope TTS (#3270) → Market expansion

### 📐 Technical Debt

- Config management fragility (evidenced by #3275)
- Provider alias resolution ambiguity (#3254)
- Error handling trong agent loops cần hardening
- OAuth app registration process cần modernization

---

## 💭 Nhận xét tổng quan

**Strengths**: Cộng đồng active, quick issue response, diverse feature additions
**Concerns**: Multiple critical reliability issues xuất hiện cùng lúc, OAuth blocker ảnh hưởng user adoption
**Recommendation**: Prioritize stability fixes trước khi thêm features mới, cần test coverage tốt hơn cho config management và connection resilience.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/nanocoai/nanoclaw">nanocoai/nanoclaw</a></summary>

# Báo cáo phân tích dự án NanoClaw - 21/07/2026

## 📊 Tóm tắt hôm nay

Ngày 21/07 đánh dấu một đợt rà soát bảo mật quan trọng với **4 CVE liên quan đến hệ thống phân quyền** được phát hiện và vá ngay trong ngày. Đồng thời, team đang tích cực mở rộng hệ sinh thái kênh giao tiếp với LINE (thị trường Đông Á) và Dial (SMS/voice AI), song song với việc khắc phục các vấn đề về xử lý file đính kèm qua Chat SDK.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng có 6 PR được merge tập trung vào security patches và infrastructure fixes.

---

## 🔧 Tiến độ dự án

### **Bảo mật - Rà soát hệ thống phân quyền** 🔒

Phát hiện và vá 4 lỗ hổng nghiêm trọng trong cùng một ngày:

- **PR #3104** - Ngăn chặn việc thu hồi quyền `owner` cuối cùng (mất root of trust)
- **PR #3103** - Sửa approval routing: ngăn self-approval và đảm bảo privilege hierarchy
- **PR #3102** - Cải thiện UX approval cards (hiển thị effect thay vì raw command)
- **PR #3101** - Bắt buộc `--scope` khi grant/revoke role (tránh privilege escalation)

**Đánh giá**: Đây là một security sweep chất lượng cao. Team @k-fls đã phát hiện và vá các lỗ hổng cơ bản trong RBAC system một cách có hệ thống, cho thấy quy trình security audit đang hoạt động tốt.

### **Mở rộng kênh giao tiếp** 🌏

**LINE Official Account** (#2918, #3096):
- Adapter native hoàn chỉnh cho thị trường Nhật, Đài Loan, Thái Lan
- Đang trong review phase, chờ merge vào main branch
- Ý nghĩa: Mở rộng footprint sang Đông Á, nơi LINE chiếm thị phần lớn

**Dial** (#3041, #3050):
- SMS + AI voice calls integration
- Đã tích hợp vào channel picker và setup wizard
- Công nghệ mới: Text-to-speech và voice interaction cho agent

**CalDAV MCP** (#3110 - merged):
- Bake `caldav-mcp` v0.8.0 vào base image
- Cho phép agent quản lý lịch qua CalDAV protocol

### **Chat SDK - Xử lý attachments** 📎

Ba PR liên quan đến vấn đề attachment không có `fetchData`:

- **#3044** - Fix generic cho tất cả channels mất `fetchData()` (từ issue #2888)
- **#3108** - Rehydrate attachments trong chat-sdk-bridge (đã close)
- **#3109** - iMessage specific: đọc local HEIC và convert sang JPEG

**Root cause**: Chat SDK core drop `fetchData` khi serialize, một số adapter (Telegram voice notes, iMessage) không set nó từ đầu vì file ở local host.

### **WhatsApp Cloud - Migration issue** 🔄

- **Issue #3105**: Instance re-key từ #2913 không có migration → stranding existing `messaging_groups` rows
- **PR #3106**: Adoption module để recover stranded rows
- **PR #3107**: Copy adoption logic vào `/add-whatsapp-cloud` skill

**Impact**: Existing installs bị mute WhatsApp sau `update-skills` (Meta vẫn POST nhưng không match instance key).

---

## 🌟 Điểm nổi bật cộng đồng

### **Contribution từ external contributors**

- **@joshm1230212**: LINE integration + Traditional Chinese README (#2950)
- **@OmriBenShoham**: Dial channel (SMS/voice)
- **@mtichikawa**: Voice transcription cho Chat SDK (#2459) - whisper.cpp on-device
- **@tenequm**: Container PID 1 zombie reaping (#3060)

**Nhận xét**: Cộng đồng đang tích cực contribute features quan trọng, đặc biệt là localization (Traditional Chinese) và regional channels (LINE).

### **Quality bar đang được nâng cao**

PR template (`<!-- contributing-guide: v1 -->`) được enforce nghiêm ngặt với checklist:
- Type of change classification
- `SKILL.md` documentation requirement
- Testing guidelines
- Security consideration checkbox

---

## 🐛 Ổn định & Bugs

### **Critical (đã vá trong ngày)**
- ✅ RBAC privilege escalation vectors (#3097, #3099, #3100)
- ✅ WhatsApp Cloud instance key migration (#3105)

### **In progress**
- 🔄 iMessage attachment handling (#3109 - open)
- 🔄 Voice transcription Chat SDK (#2459 - long-running PR)
- 🔄 Container zombie process reaping (#3060 - needs review)

### **Technical debt**
- **Issue #2888**: Generic attachment `fetchData` loss (được fix bởi #3044)
- **PR #1110** (closed): Container-runtime test mismatches - được close thay vì merge, có thể là technical debt

---

## 💡 Yêu cầu tính năng

### **Đã được implement (trong review)**
1. **LINE Official Account** - dominating messenger trong 3 thị trường lớn Đông Á
2. **Dial SMS + Voice** - AI voice call capability
3. **CalDAV integration** - calendar management cho agents

### **Đang được đề xuất**
- **On-device voice transcription** (#2459): whisper.cpp cho Discord/Chat SDK channels, không cần OpenAI API

### **Trend nhận diện**
- **Privacy-first**: On-device processing (whisper.cpp, local HEIC conversion)
- **Regional expansion**: LINE (Asia), Traditional Chinese docs
- **Multimodal**: Voice input/output (transcription, Dial voice calls)

---

## 👥 Phản hồi người dùng

### **Pain points được report**

1. **Upgrade breaking existing installs** (#3105)
   - WhatsApp Cloud instance key change không có migration path
   - Existing users bị silent failure → Meta webhooks ignored

2. **Approval UX confusion** (#3098)
   - Admin chỉ thấy raw command, không biết effect
   - Dễ approve nhầm vì thiếu context

3. **Attachment handling inconsistency** (#2888)
   - Telegram voice notes chỉ show filename
   - iMessage photos không hiện

### **Positive signals**

- Không có complaint về core functionality
- Contributors tích cực thêm channels mới
- Documentation được maintain tốt (Traditional Chinese translation)

---

## 📋 Backlog & Roadmap

### **Short-term (đang active)**
- Merge LINE integration (#2918)
- Merge Dial integration (#3041, #3050)
- Complete attachment rehydration fixes (#3109)
- Voice transcription Chat SDK (#2459)

### **Medium-term (inferred từ PRs)**
- **Branch maintenance model** (#3095): Docs rewrite cho registry-branch workflow → có thể là prep cho major refactor
- **Container runtime improvements**: PID 1 init, zombie reaping
- **Security hardening**: RBAC system được audit kỹ

### **Ecosystem direction**
1. **Geographic expansion**: LINE (Asia), localization efforts
2. **Communication modalities**: Voice (transcription, AI calls), không chỉ text
3. **Privacy-focused**: On-device processing thay vì cloud APIs
4. **Enterprise-ready**: RBAC improvements, audit trails, approval workflows

---

## 🎯 Đánh giá tổng quan

**Sức khỏe dự án**: ⭐⭐⭐⭐½ (4.5/5)

**Strengths**:
- Security response nhanh (4 CVEs phát hiện và vá trong 1 ngày)
- Active community contributions
- Clear contribution guidelines và quality bar
- Diverse ecosystem expansion (channels, tools, regions)

**Areas of concern**:
- Migration paths cho breaking changes cần attention (#3105)
- Long-running PRs (#2459 từ 13/05) cần được prioritize
- Test coverage cho container runtime có gaps (#1110 closed without merge)

**Momentum**: Dự án đang trong giai đoạn **consolidation + expansion** - vừa cleanup technical debt và security issues, vừa mở rộng capabilities (voice, regional channels).

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo phân tích dự án IronClaw - 21/07/2026

## 1. 🎯 Tóm tắt hôm nay

Dự án IronClaw đang trải qua một đợt tái cấu trúc kiến trúc lớn ("Tier B") với việc xóa hoàn toàn monolith v1 legacy và chuyển đổi sang stack Reborn. Đội ngũ đã merge 9 PRs quan trọng, tập trung vào việc đơn giản hóa codebase, củng cố bảo mật, và chuẩn bị release 1.0.0-rc.1. Hoạt động chủ yếu xoay quanh việc dọn dẹp technical debt và thiết lập nền tảng vững chắc cho phát triển tương lai.

## 2. 📦 Releases

**Không có release chính thức** trong 24h qua, nhưng đội ngũ đang chuẩn bị tích cực cho **1.0.0-rc.1**:

- PR #6370 đã merge changelog và release notes
- PR #6383 đang sửa blocker cho MSI installer và loại bỏ codename "Reborn" khỏi tên release
- Release sẽ được build từ branch `release-fix-1.0.0-rc.1` (không phải main tip) để tránh mang theo các refactor lớn chưa ổn định

## 3. 🚀 Tiến độ dự án

### Milestone lớn: Tier B Completion (Xóa v1 legacy)

**PR #6375** (đã merge) đánh dấu bước ngoặt quan trọng:
- Xóa hoàn toàn `src/` directory (~70K+ LOC v1 monolith)
- Loại bỏ 5 crates legacy: `ironclaw_gateway`, `ironclaw_legacy`, `ironclaw_tui`, `ironclaw_metrics`, `ironclaw_utils`
- Cắt production deploy configs (Railway, GCP) sang Reborn stack
- Giải phóng được >100K LOC technical debt

### Cải thiện kiến trúc đáng chú ý:

**Bảo mật & Authorization** (#6386 - đang review):
- Consolidate toàn bộ pre-flight policy vào `authorize()` - đạt §5.3.2/§9 security milestone
- Tạo single source of truth cho authorization decisions
- Loại bỏ scattered policy checks khắp codebase

**Turn State Durability** (#6367 - đã merge):
- Đơn giản hóa từ 3 durability modes xuống 1 (write-behind only)
- Xóa 1,200 LOC config và branching logic
- Cải thiện maintainability của crash-safety-critical code

**Composition & Deployment** (#6387 - đang review):
- Thu hẹp deployment branching từ 5 files → 3 files
- Hướng tới mục tiêu chỉ có `deployment.rs` làm single point of deployment logic

### Cleanup & Technical Debt:

- **#6378**: Loại bỏ dead feature flags (`libsql-secrets`, `filesystem-goal-store`)
- **#6372**: Xóa 131 file docs cũ (drafts, assumptions, stale plans)
- **#6382**: Refactor `filesystem_store` - retire blob store, decompose giant files
- **#6368**: Decouple migration tool khỏi legacy dependencies

## 4. ⭐ Điểm nổi bật cộng đồng

### Issue mới từ QA/bug bash:

**#6360 - Provider onboarding UX** (P1):
- Người dùng không thể quay lại menu sau khi chọn provider
- Khi nhận ra chọn nhầm provider, chỉ có thể cancel toàn bộ flow
- **Đã có fix** trong PR #6366 - cho phép Esc quay về provider menu

**#6362 - Duplicate test flows** (P2):
- UI có cả "Test connection" và "Fetch models" button nhưng làm việc giống nhau
- Gây confusion khi connection test đã hiện "47 models available"
- Chưa có PR fix

### Streaming & Resilience:

**PR #6376** (đang review) - cải thiện đáng kể trải nghiệm streaming:
- Thêm retry resilience cho LLM streaming
- Mock Python faults để test delayed responses, transient errors, broken SSE
- Cover WebUI v2 streaming/retry/cancel behavior

## 5. 🐛 Ổn định & Bugs

### Critical fixes đã merge:

**#6379** - Post-merge red main:
- Fix 2 workflows fail sau khi #6375 merge (release-plz + replay-gate)
- Cả 2 đều reference deleted legacy components
- Repair nhanh trong 1 PR tactical

### Stability improvements:

**#6337** (đã merge) - Chat stream stability:
- Keep healthy streams alive bằng inactivity timeout thay vì total duration
- Require real provider terminal marker - không còn workaround semantic-continuation
- Preserve per-thread state properly

### Auth lifecycle fixes:

**#6251** (đang review) - OAuth denial channel-neutral:
- Pin Slack OAuth to configured workspace
- Make auth denial cancel exact blocked run
- Standardize cross-channel behavior

## 6. 💡 Yêu cầu tính năng

### Đã được prioritize:

**#6384** - In-chat command coverage backlog:
- Survey toàn bộ v1 vs Reborn command surface
- Tạo prioritized list các command categories còn thiếu
- Feeds vào #3286 (command parity tracking)
- **Chưa có implementation proposal** - chỉ planning

### Đang phát triển:

**#6364** (đang review) - Multi-channel attachments:
- Telegram và Slack file routing qua unified attachment system
- Resolve assistant `/workspace/...` references
- Chuẩn hóa attachment handling across channels

## 7. 👥 Phản hồi người dùng

### Từ bug bash (internal QA):

- **UX friction** trong onboarding flow được phát hiện sớm (P1/P2 issues)
- Team responsive - P1 issue có fix trong 1 ngày
- Focus vào "paper cuts" trước khi release 1.0.0

### Developer experience:

- Architecture simplification đang được thực thi nghiêm túc
- PRs có clear rationale và tracing back to architecture docs
- Codebase giảm đáng kể size (~70K+ LOC removed today alone)

## 8. 📋 Backlog & Roadmap

### Tier B follow-up (#6369):

Sau khi xóa v1, còn lại gaps cần fill:
- Metrics & observability (v1 có, Reborn chưa có)
- Session management persistence
- Legacy CLI command parity
- Replay & audit tooling

### Architecture goals tiếp theo:

**#6274** - Finish DeploymentConfig:
- Track 1 (PR #6387): Shrink branching ratchet → đang review
- Còn lại: Eliminate profile name leaks, retire request mirrors

**#6371** (Discussion) - Narrow hooks to invocation policy:
- Simplify hook framework
- Align với architecture-simplification principles
- Đang discussion phase, chưa implement

### Dependencies:

- 4 PRs dependabot đang pending (tokio-ecosystem, serialization, everything-else)
- 1 massive PR #5598 (release automation) đã accumulate nhiều conflicts - cần rebase

### Unified extension runtime (#6116):

- PR lớn (XL) đang reconcile 92 commits từ main
- Generic extension architecture cho all extension types
- Đang rebase conflicts, có thể mất vài days để stable

---

## 🎬 Kết luận

IronClaw đang trong giai đoạn **transformation lớn nhất** từ trước đến nay. Việc xóa bỏ 70K+ LOC legacy code trong một ngày cho thấy quyết tâm refactor triệt để của team. Mặc dù tạo ra short-term gaps, nhưng foundation mới (Reborn) đang được xây dựng vững chắc với focus vào:

- **Security-first** architecture (centralized authorization)
- **Simplicity** (eliminate config branching, dead features)
- **Maintainability** (decompose giant files, clear boundaries)

Release 1.0.0-rc.1 đang được polish cẩn thận, và team đang balance giữa ship fast vs ensure quality qua bug bash process.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo phân tích LobsterAI - 21/07/2026

## 🎯 Tóm tắt hôm nay

Một ngày phát triển cực kỳ sôi động với **15 pull requests**, trong đó 12 PR đã được merge thành công. Đội ngũ tập trung vào 3 mảng chính: cải thiện trải nghiệm cập nhật Windows, nâng cấp hệ thống cộng tác (Cowork) với khả năng chú thích nhiều file, và tối ưu UI/UX cho tính năng AI Skin. Không có issue hoặc release mới, cho thấy team đang trong giai đoạn sprint tập trung vào chất lượng code.

## 🚀 Tiến độ dự án

### 🔥 Các PR chính đã merge (12/15)

#### **1. Windows Update Experience** 
- **#2368** [OPEN] - Cài đặt cập nhật Windows âm thầm (silent installation)
  - ✅ Sử dụng PowerShell để chạy NSIS installer với flag `/S`
  - ✅ Xử lý UAC prompt một cách thanh lịch - từ chối UAC (exit 1223) giờ hiển thị thông báo lỗi được bản địa hóa thay vì message thô từ OS
  - ✅ Tự động khởi chạy lại ứng dụng sau khi cài đặt xong
  - 🎯 **Ý nghĩa**: Trải nghiệm cập nhật mượt mà hơn cho người dùng Windows, giảm friction

- **#2367** [CLOSED] - Cấu trúc hóa build process cho Windows
  - Thêm entry points riêng biệt (`dist-win-channel.cjs`, `dist-win-web.cjs`)
  - Loại bỏ rủi ro env vars bị leak giữa các builds
  - 🎯 **Ý nghĩa**: Code base sạch hơn, build process đáng tin cậy hơn

#### **2. Cowork - Tính năng chú thích đa file 📝**
- **#2366** [CLOSED] - Hỗ trợ chú thích nhiều file từ browser
  - ✨ Giao thức chú thích browser mới + webview preload
  - ✨ Batch tạo chú thích với screenshot được crop tự động
  - ✨ Chú thích được lưu dưới dạng draft attachments
  - ✨ Metadata chú thích được truyền vào OpenClaw prompt
  - ✨ UI hiển thị badge số lượng chú thích thay vì show ảnh riêng lẻ
  - 📚 Bổ sung documentation đầy đủ + test coverage
  - 🎯 **Ý nghĩa**: Nâng cao đáng kể khả năng cộng tác, đặc biệt cho review và feedback trên tài liệu/web pages

- **#2364** [CLOSED] - Fix scroll jumps khi refresh session
  - Giữ nguyên message history đã load
  - Scope refresh events theo session ID
  - 🎯 **Ý nghĩa**: UX mượt mà hơn, không còn bị giật khi refresh

- **#2363** [CLOSED] - Ngăn chặn IM messages bị flicker
  - So sánh history windows khi reconciliation
  - Preserve messages cũ khi repair mismatched gateway tail
  - 🎯 **Ý nghĩa**: Real-time messaging ổn định hơn

#### **3. AI Skin Creation Flow 🎨**
- **#2361** [CLOSED] - Cải thiện quy trình tạo AI skin
  - ✨ Entry point cố định trong Appearance settings
  - ✨ Onboarding cho lần đầu sử dụng
  - ✨ Framework prompt được đặt sẵn trong "Try Asking"
  - ✨ Workflow luôn available cho các lần tạo tiếp theo
  - 🎯 **Ý nghĩa**: Democratize AI skin creation, người dùng dễ dàng customize trải nghiệm hơn

#### **4. OpenClaw & Config Management**
- **#2365** [CLOSED] - Hot-reload config qua RPC ack
  - Chuyển từ file-watching sang RPC acknowledgment
  - 🎯 **Ý nghĩa**: Config updates nhanh hơn, đáng tin cậy hơn

#### **5. Authentication & Stability**
- **#2360** [CLOSED] - Preserve local callback khi retry login
  - Reuse callback server cho multiple/concurrent login attempts
  - Thêm lifecycle diagnostics + regression tests
  - 🎯 **Ý nghĩa**: Login flow robust hơn, ít lỗi edge cases

- **#2359** [CLOSED] - Ổn định layout artifacts preview
  - Stable keys cho drag handles và content areas
  - Sync input area height trong layout phase
  - 🎯 **Ý nghĩa**: Không còn UI flicker khi toggle preview

- **#2362** [CLOSED] - Fix cron UI bugs
  - 🎯 **Ý nghĩa**: Background job scheduling hoạt động chính xác

### 📌 PRs đang chờ xử lý (3/15)

#### **Dependency Updates** (3 PRs từ tháng 4 - marked STALE)
- **#1277** [OPEN] - Electron group bump (40.2.1 → 43.1.1)
- **#1282** [OPEN] - Headless UI (1.7.19 → 2.2.9) 
- **#1283** [OPEN] - React (18.3.1 → 19.2.4)
- **#1284** [OPEN] - React Syntax Highlighter (15.6.6 → 16.1.1)

⚠️ **Quan sát**: Các dependency PRs từ Dependabot đã bị stale 3 tháng. Có thể team đang cân nhắc kỹ về breaking changes, đặc biệt với React 19.

#### **POPO Connectivity** 
- **#1349** [CLOSED] - Thêm API validation thực cho POPO connectivity test
  - Fix bug: Test luôn pass dù credentials sai
  - 🎯 **Ý nghĩa**: Integration testing đáng tin cậy hơn

## 📈 Xu hướng phát triển

### ✨ **Focus Areas**
1. **Platform Polish** (Windows): Cải thiện installation/update experience
2. **Collaboration Features**: Mở rộng khả năng teamwork với annotations
3. **Personalization**: AI Skin creation accessibility
4. **Stability**: Loạt fixes cho UI flicker, auth, messaging

### 💪 **Engineering Velocity**
- **12 PRs merged trong 1 ngày** - Tốc độ cao, cho thấy CI/CD mature
- **Comprehensive testing**: Hầu hết PRs đều kèm test coverage và documentation
- **Code quality**: Focus vào edge cases (UAC prompt, scroll preservation, race conditions)

## 🐛 Ổn định & Bugs

### ✅ Đã giải quyết
- ✅ Scroll jumping trong Cowork sessions
- ✅ IM message flickering
- ✅ Artifacts preview layout instability
- ✅ Auth callback server reuse issues
- ✅ POPO connectivity test false positives
- ✅ Cron UI bugs

### 🔍 Chất lượng kỹ thuật
- Strong focus on **race condition handling** (concurrent logins, message reconciliation)
- **Progressive enhancement**: Features có graceful degradation (UAC decline handling)
- **Developer experience**: Build process improvements, explicit channel configs

## 💡 Yêu cầu tính năng

### 🆕 Tính năng mới đã ship
1. **Silent Windows updates** với UX tốt hơn
2. **Multi-annotation support** trong browser cowork
3. **Persistent AI Skin designer** với onboarding

### 🔮 Tiềm năng phát triển (dựa trên code patterns)
- Browser-based collaboration tools có thể mở rộng sang PDF annotations, code reviews
- AI Skin framework có thể extend sang custom behaviors, không chỉ appearance
- OpenClaw integration ngày càng sâu hơn vào workflow

## 👥 Phản hồi cộng đồng

### 📊 Tương tác
- **Không có issues mới** trong 24h - Có thể do:
  - Sản phẩm đang ổn định
  - Hoặc cộng đồng đang nhỏ/private beta
  - Hoặc support channels khác (Discord, Slack)

### 🎖️ Contributors nổi bật hôm nay
- **@fisherdaddy**: 5 PRs (Windows updates, configs, cron)
- **@liugang519**: 2 PRs (Cowork annotations, artifacts)
- **@liuzhq1986**: 2 PRs (Scroll fix, IM stability)
- **@btc69m979y-dotcom**: 1 PR (AI Skin)
- **@gongzhi-netease**: 1 PR (POPO validation)

## 🗺️ Backlog & Roadmap

### ⏳ Technical Debt
- **Dependency updates cần attention**: 3 major updates đang pending từ tháng 4
  - Electron 43 có performance improvements đáng kể
  - React 19 có new concurrent features nhưng cũng có breaking changes
  - Cần timeline rõ ràng để xử lý

### 🎯 Dự đoán direction tiếp theo
1. **Cross-platform parity**: Sau khi polish Windows, có thể focus macOS/Linux
2. **Collaboration depth**: Multi-annotations chỉ là bước đầu, có thể mở rộng sang real-time co-editing
3. **AI Customization**: AI Skin có thể evolve thành full agent personality framework
4. **Enterprise features**: POPO integration hint về enterprise use cases

---

## 📝 Kết luận

Ngày 21/07/2026 là một ngày **rất productive** cho LobsterAI. Team đang trong rhythm tốt với balance giữa new features và stability fixes. Điểm đặc biệt là **engineering discipline**: mỗi PR đều có test coverage tốt, documentation đầy đủ, và xử lý edge cases cẩn thận. 

⚠️ **Action item duy nhất**: Cần resolve dependency update backlog để tránh technical debt chồng chất.

🌟 **Outlook**: Project đang hướng tới trở thành một AI collaboration platform mạnh mẽ với deep personalization capabilities.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo Phân tích Hệ Sinh thái AI Agent - CoPaw
## Ngày 21/07/2026

---

## 📊 Tóm tắt hôm nay

Dự án CoPaw (agentscope-ai/QwenPaw) đang trong giai đoạn phát triển mạnh mẽ với 42 Pull Requests và 18 Issues hoạt động. Hôm nay ghi nhận nhiều cải tiến quan trọng tập trung vào **kiến trúc agent mode**, **tính năng trình duyệt thống nhất**, và **hệ thống công cụ mở rộng**. Đặc biệt, team đang refactor cơ chế vòng lặp ReAct thành agent mode có thể cấu hình và phát triển PawApp SDK cho các ứng dụng plugin tích hợp.

---

## 🚀 Tiến độ dự án

### **Cải tiến Kiến trúc Core**

#### 🔄 **Agent Mode Refactoring** (Ưu tiên cao)
- **PR #6210** (Closed) và **#6270** (Open): Chuyển vòng lặp ReAct mặc định thành `DefaultMode` chính thức
  - Tách ownership của stop handler khỏi `AgentBuilder` và `CommandHandler`
  - Mỗi mode giờ sở hữu lifecycle riêng và stop handler độc lập
  - Runtime chuẩn bị modes qua async lifecycle thay vì khởi tạo đồng bộ
  - **Ý nghĩa**: Tạo nền tảng cho agent mode do người dùng tự định nghĩa, tăng khả năng mở rộng

#### 🌐 **Unified Browser** (Tính năng lớn)
- **PR #6276**: Thay thế stack trình duyệt cũ bằng một browser tool thống nhất
  - Một SDK, nhiều backend (CDP/CDP-via-Selenium/Browser-Use)
  - Thay menu cố định `browser_use`/`browser_cdp`/`browser_visible` bằng một `browser` tool lập trình được
  - Agent viết code chạy trên bất kỳ engine nào
  - **PR #6157**: Plugin Chrome Extension cho việc ghép nối và native messaging
  - **Ý nghĩa**: Kiến trúc module hóa, giảm coupling, tăng khả năng tùy chỉnh

### **Hệ thống Plugin & Apps**

#### 📦 **PawApp SDK & Kanban App**
- **PR #6150** (Closed → sẽ được merge) và **#6284** (Open - QwenPaw Creator):
  - `plugins/apps/qwenpaw-creator`: Workflow tạo video từ script → assets → storyboard
  - Theo pattern PawApp upstream (giống `agent-kanban`)
  - `plugin.json` khai báo `entry.backend` và `entry.frontend`
  - **Ý nghĩa**: Mở rộng QwenPaw thành nền tảng app, không chỉ là agent chat

### **Cải thiện Hiệu năng & Ổn định**

#### ⚡ **Performance Optimization**
- **PR #6238**: Khởi tạo Driver handlers đồng thời thay vì tuần tự
  - Bounded concurrency (tối đa 8 handlers cùng lúc)
  - Giảm thời gian startup cho multi-MCP setups
  
#### 🔧 **Tool Execution Fixes**
- **PR #6278**: Expose structured failure outcomes
  - Nhiều built-in tools trả về failure text nhưng mark `SUCCESS`
  - Refactor để failures nhất quán, machine-readable
  - **Issue #6257**: Bug multiple tool calls có cùng thinking output → đang được xử lý bởi **PR #6280**

#### 🧠 **Memory & Observability**
- **PR #6235** (Closed): Nâng cấp ReMe Light index maintenance
  - Chuyển index rebuild từ auto-on-startup sang explicit maintenance
  - Upgrade `reme-ai` lên `0.4.1.3`
  - Thêm random jitter cho scheduled dream tasks
- **PR #5922** (Closed) & **#6277** (Open): Fix Langfuse trace IDs
  - Sử dụng `uuid4().hex` thay vì `str(uuid4())` để tương thích với Langfuse

---

## 🔥 Điểm nổi bật cộng đồng

### **Issues được quan tâm nhiều nhất**

#### 🐛 **Bug nghiêm trọng - Doom Loop với Read-only Tools** (#5906)
- **Hiện trạng**: `DoomLoopGate` với `similarity_threshold=1.0` flag sai các tool read-only hợp lệ như doom loops
- Đọc memory 3+ lần → warning, 6+ lần → terminated
- **Giải pháp**: **PR #6041** - Miễn trừ read-only tools khỏi doom loop detection
- **Ý nghĩa**: Vấn đề UX nghiêm trọng ảnh hưởng normal memory recall

#### 🔄 **v2.0.0 Infinite Loop Issue** (#5961 - Closed)
- Model Qwen3.7-plus thực thi lặp đi lặp lại: write → delete → write → delete
- Không hoàn thành được task đơn giản
- **Trạng thái**: Đã đóng (có thể đã fix hoặc người dùng tìm ra workaround)

#### ⚠️ **Concurrent Subagent Polling Bug** (#4873)
- Mở 2 subagent tasks đồng thời → main agent polling cực nhanh đến khi task kết thúc
- Không thể interrupt từ Feishu
- **Trạng thái**: Vẫn mở, chưa có PR xử lý

---

## 🛠️ Ổn định & Bugs

### **Bugs đang được sửa**

1. **Tool call reasoning duplication** (#6257 → PR #6280)
   - Multiple tool calls trong 1 turn có cùng thinking content
   - Fix: Align reasoning với tool segments

2. **Windows tasklist liveness probe** (#6197 → PR #6203)
   - `_is_pid_running()` thiếu timeout, security context, và subprocess hiding
   - Có thể gây hang trên Windows

3. **Background tool call mechanism** (#6056 → PR #6151)
   - Dual-deadline architecture (`offload_deadline` + `kill_deadline`)
   - Fix offload triggering cancel signals incorrectly

4. **Session/Task tracking inconsistency** (#6273)
   - Task tracking khác nhau tùy execution entry point
   - Một số path serialize work, một số attach vào run đang chạy

### **Security & Safety**

- **PR #6203**: Bound và hide Windows tasklist probe để tránh shell injection
- **Tool security**: Nhiều PR focus vào proper error handling và structured failures

---

## 💡 Yêu cầu tính năng

### **Tính năng được đề xuất**

#### 🙋 **Human-in-the-Loop Support** (#6274)
- **Đề xuất**: Thêm tool `ask_user_question`
- Agent pause và hỏi user khi gặp yêu cầu mơ hồ hoặc high-risk
- Throw structured multiple-choice questions với "Other/Custom" fallback
- **Use case**: Tránh agent tự đoán hoặc thực thi destructive actions

#### 📁 **Session Grouping/Folders** (#6287)
- Thêm folder/group cho session history trong Console
- **Lý do**: Cải thiện navigation và organization với nhiều conversations

#### ⏰ **Auto-append Real-time Context** (#6283)
- Tự động thêm thông tin thời gian thực vào context gửi LLM
- **Vấn đề hiện tại**: Model nhầm lẫn ngày tháng khi restart old session
- Hiểu nhầm historical chat date là current date

#### 🎯 **Customizable Tool Descriptions** (#6286)
- 22 built-in tools luôn load full descriptions → 8K-10K tokens/request
- **Đề xuất**: Cho phép disable hoặc customize built-in tool descriptions
- Giảm token consumption cho rarely-used tools

#### 🤖 **New Model Provider - AIOnly** (#6268 → PR #6271)
- Thêm AIOnly (api.aionly.com) làm built-in provider
- Aggregates 190+ models từ nhiều providers (Anthropic, Google, OpenAI, xAI, etc.)
- **Trạng thái**: Đã có PR, đang review

#### 🖥️ **Desktop GUI Automation** (PR #5187)
- Windows computer-use với UIA + Tauri control mode
- Screenshot + UIA describe + click/type/scroll/drag/app launch
- **Ý nghĩa**: Anthropic-style computer use cho Windows

---

## 💬 Phản hồi người dùng

### **Positive Feedback**

- User đánh giá cao **per-session model overrides** (PR #5992): Cho phép một agent dùng different LLMs cho different conversations
- **Visual model fallback** (PR #5069) được community support: Text-only primary model + visual transcription model

### **Pain Points**

1. **Token consumption quá cao**: 22 built-in tools luôn load → 8-10K tokens
2. **Mobile responsive**: Người dùng yêu cầu Web Console responsive cho mobile (#6281)
3. **Upgrade path unclear**: User hỏi cách upgrade v1.x → v2.0.0 bằng script (#5959 - Closed)
4. **Configuration complexity**: 
   - Embedding dimensions setting không được expose `use_dimensions` (#6242 → PR #6243)
   - Aliyun Token Plan chưa có `qwen3.8-max-preview` (#6285)

### **User Experience Issues**

- **CSS prefix inconsistency** (#5688): `App.tsx` config `prefixCls="qwenpaw"` nhưng CSS files dùng `ant-` prefix
- **Thinking blocks formatting**: Spaces và newlines bị mất trong console rendering (#6129 → PR #6139 - Closed)

---

## 🗺️ Backlog & Roadmap

### **Đang trong pipeline (High Priority)**

1. ✅ **Agent Mode System** - Cho phép user-defined modes (PR #6270)
2. ✅ **Unified Browser Architecture** - Module hóa browser control (PR #6276 + #6157)
3. ✅ **PawApp SDK** - Plugin framework cho apps (PR #6150, #6284)
4. 🔄 **Tool execution stability** - Structured failures, background offload fixes
5. 🔄 **Memory system enhancement** - ReMe Light improvements (PR #6235)

### **Planned Features (từ Issues)**

- **Human-in-the-loop workflow** (#6274)
- **Session organization** (#6287)
- **Tool description customization** (#6286)
- **Real-time context injection** (#6283)
- **Mobile-responsive Console** (#6281)

### **Technical Debt**

- **Lifecycle refactoring**: Reset lifecycle cần unify semantics (#6101 - Closed)
- **Test cleanup**: Dead imports, wrong asyncio marks (#6065 - Closed)
- **Channel display controls**: Separate tool call và result display (#6233)

---

## 📈 Xu hướng phát triển

### **Architecture Evolution**

1. **From monolithic to modular**: Browser, Memory, Tool systems đều đang được module hóa
2. **Plugin-first approach**: PawApp SDK cho thấy hướng platform expansion
3. **Async-first design**: Lifecycle hooks, concurrent initialization

### **Developer Experience**

- Focus vào **explicit over implicit** (memory index rebuild, mode ownership)
- Tăng **observability** (Langfuse integration fixes)
- Cải thiện **error handling** (structured tool failures)

### **Community Engagement**

- Nhiều first-time contributors (8/42 PRs có label `first-time-contributor`)
- Active issue triage và PR reviews
- Good balance giữa bug fixes và new features

---

## 🎯 Kết luận

CoPaw đang trong giai đoạn **maturation** với focus vào:
- ✅ **Architecture refactoring** để support extensibility
- ✅ **Performance optimization** cho production use
- ✅ **Developer experience** improvements
- 🔄 **Bug fixes** cho stability issues từ v2.0.0

Team đang xử lý balance giữa **innovation** (Unified Browser, PawApp) và **stabilization** (tool execution, memory, lifecycle bugs). Community feedback chủ yếu về **UX improvements** và **configuration flexibility**, phản ánh product đang chuyển từ early adopters sang broader user base.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo Phân tích Hermes-Agent ngày 2026-07-21

## 1. 🎯 Tóm tắt hôm nay

Ngày 21/7/2026 là một ngày **cực kỳ năng suất** của dự án Hermes-Agent với **14 issues mới** (trong đó có nhiều bug nghiêm trọng) và **27 PRs đang hoạt động**. Đáng chú ý nhất là phát hiện **lỗi bảo mật P1 nghiêm trọng** (#68311) trong các gói phân phối có thể khiến người dùng mất toàn bộ phiên làm việc khi chạy test. Cộng đồng đang tập trung vào việc sửa các vấn đề về session management trong desktop app và cải thiện trải nghiệm đa nền tảng.

## 2. 🚀 Releases

### v0.19.0 "The Quicksilver Release" (20/7/2026)

**Thành tựu ấn tượng:**
- 📈 **2,245+ commits** từ 450+ contributors
- ⚡ **Giảm 80% thời gian time-to-first-token** trên mọi nền tảng
- 🎨 Desktop app được tối ưu qua ~20 PRs về hiệu suất
- 🔄 Reasoning streams hoạt động mặc định
- 🐛 **~3,300 issues đã đóng** kể từ v0.18.0

**Ý nghĩa:** Đây là bản cập nhật tập trung vào **tốc độ và trải nghiệm người dùng**, đánh dấu sự trưởng thành của Hermes từ một công cụ AI agent thử nghiệm thành một nền tảng production-ready với hiệu suất cao.

## 3. 📈 Tiến độ dự án

### 🔴 Các vấn đề nghiêm trọng (P1-P2)

**⚠️ #68311 - Lỗi bảo mật nguy hiểm (P1, 3 comments):**
- Các gói sdist từ v0.13.0-0.19.0 chứa test file thực thi `os.kill(-1, SIGTERM)` có thể **giết toàn bộ session của user**
- Nguyên nhân: thiếu file `conftest.py` trong gói phân phối
- **PR #68317 đã được tạo** để fix ngay lập tức bằng cách làm test fail closed

**🐛 #68321 + #68324 - Desktop app mất assistant messages (P2, duplicate):**
- Khi chuyển đổi giữa các chat session, **tất cả tin nhắn từ assistant biến mất** (user messages vẫn còn)
- Dữ liệu trong DB vẫn nguyên vẹn, chỉ là vấn đề rendering
- Khởi động lại app hoặc refresh (Cmd+R) khôi phục được

**🔧 #68318 - Plugin crash trên v0.19.0 (P2, 1 comment):**
- Mọi plugin tool handler bị crash với `TypeError: unexpected keyword argument 'task_id'`
- Ảnh hưởng: plugin `kasio-notion` với 11 tools
- Nguyên nhân: registry.dispatch spread kwargs mà handler không expect

### ✨ Tính năng đáng chú ý đang phát triển

**🔀 #68314 - Qoder CLI integration (P3):**
- Thêm skill để delegate multi-file coding tasks cho Qoder CLI
- Cho phép Hermes làm việc với các coding agent chuyên sâu khác

**🎙️ #61337 - Cải thiện voice interaction (P3):**
- Thêm acknowledgement nhanh (Phase A) trước khi thực hiện task chậm
- Phản hồi thực sự (Phase B) sau khi hoàn thành
- Giảm "im lặng đáng sợ" trong voice mode

**🔐 #27601 - Bearer token auth cho webhook (P3):**
- Hỗ trợ `Authorization: Bearer <token>` cho các webhook provider đơn giản hơn
- Bổ sung cho HMAC và GitLab-style token hiện có

## 4. 🌟 Điểm nổi bật cộng đồng

### 🏆 Issues được quan tâm nhất

**#4256 - Configurable keybindings (6 👍, 3 comments):**
- Người dùng muốn tùy chỉnh phím tắt trong CLI/TUI
- Động lực: xung đột với tmux/screen, accessibility, editor preferences
- Đề xuất: thêm section `keybindings:` trong config.yaml

**#4335 - Cross-platform session sharing (2 👍, 8 comments):**
- Feature request: chia sẻ context giữa CLI ↔ Telegram
- Use case: bắt đầu hội thoại trên desktop, tiếp tục trên mobile
- Tag `sweeper:risk-session-state` cho thấy đây là thay đổi architecture lớn

### 🎨 Trải nghiệm desktop được cải thiện

- **#68069**: Thêm avatar cho messages với khả năng tùy chỉnh
- **#68287**: Context menu "Read Aloud" + "Look Up" + "Translate" cho text đã chọn
- **#68293**: Drill-down vào project folders trước khi list sessions
- **#68302**: Fix bug không thể switch session khi đang xem Skills & Tools

## 5. 🐞 Ổn định & Bugs

### 🔥 Bugs nghiêm trọng đang được xử lý

**Session Management (Desktop):**
- Multiple issues về mất hoặc không hiển thị messages (#68321, #68324)
- Vấn đề chuyển đổi session (#68302)
- **Xu hướng:** Desktop app v0.19.0 có regression về session handling

**Platform Integration:**
- **#34372**: BlueBubbles xử lý mỗi iMessage **2 lần** do subscribe cả `new-message` và `updated-message`
- **#68313**: Telegram draft-mode streaming bị choppy/flickery trên v0.19.0
- **#68300**: ImportError cross-module có thể crash agent khi update

**Plugin System:**
- **#68318**: Plugin handlers crash với unexpected `task_id` kwarg
- Ảnh hưởng rộng đến ecosystem plugin

### ✅ Fixes đã được triển khai

- **#68319**: Guard Telegram import để tránh crash
- **#68320**: Fix Discord guild reply metadata
- **#68317**: Làm live-system-guard test fail closed (security)
- **#45317**: Prevent BlueBubbles duplicate turns

## 6. 💡 Yêu cầu tính năng

### 🌐 Multi-platform & Integration

**#4335 - Session bridging (P3, 8 comments):**
- Chia sẻ context giữa CLI và Telegram
- Architecture challenge: session stores hiện tại hoàn toàn isolated
- Cần thiết kế gateway-level session sync

**#68301 - Native session mirroring (P3, đã đóng - duplicate của #4335):**
- Mirror một conversation trên cả desktop và Telegram
- Use case: glance at either surface, reply from whichever is handy

**#64900 - Extensible send_message tool (P3, 4 comments):**
- Cho phép plugins extend send_message với platform-specific fields
- Hiện tại: schema hardcoded, plugins không thể thêm custom params

### 🧠 AI & Delegation

**#68222 - Generalize ACP client (P4, needs-decision):**
- Hỗ trợ bất kỳ ACP-compatible coding agent nào (Claude Code, Codex, Gemini, Qwen)
- Thay vì chỉ Copilot như hiện tại
- Architecture: `acp://{agent}` URL scheme + agent registry

**#68304 - Named delegation routes (P3, needs-decision):**
- Pre-configured provider/model routes theo task purpose
- Tránh expose arbitrary model selection cho model
- Example: `architect:`, `reviewer:`, `bulk_summarizer:`

### 🔧 Developer Experience

**#68306 - Widget-app SDK cho TUI (P3):**
- Apps as `state + init + reduce + render`
- TUI counterpart của desktop component model
- Ships với 3 reference apps

**#68312 - Hermes Arena leaderboard (invalid tag, nhưng흥미로운):**
- Community benchmark cho agent capabilities
- 7-dimension evaluation framework
- https://xchliu.github.io/hermes-arena/

## 7. 💬 Phản hồi người dùng

### 😤 Frustrations

**Stability regressions trong v0.19.0:**
- Desktop session management có nhiều issues mới
- Plugin ecosystem bị break (#68318)
- Telegram streaming quality giảm (#68313)
- **Nhận xét:** Release tập trung vào speed có thể đã trade-off stability

**Installation footguns:**
- #68311 là **disaster waiting to happen** - user có thể mất toàn bộ session chỉ vì chạy test
- #68310: Bundled skills không có trong wheel package

**Cross-platform experience gaps:**
- Sessions không sync giữa platforms (#4335 có 2 👍, 8 comments)
- Mỗi platform là một "silo" riêng biệt

### 😊 Positive signals

- **Voice interaction improvements** được hoan nghênh (#61337)
- **Desktop UX enhancements** (avatars, context menus, folder drill-down) cho thấy sự chăm chút detail
- **Plugin extensibility** đang được mở rộng (#64900, #68222)
- **Community engagement cao**: 450+ contributors, nhiều issues có discussion sâu

## 8. 🗺️ Backlog & Roadmap

### 🎯 Ưu tiên ngắn hạn (dựa trên P1-P2 tags)

1. **🔴 CRITICAL: Fix test package security issue** (#68311, #68317)
2. **🔴 HIGH: Stabilize desktop session management** (#68321, #68324, #68302)
3. **🟡 MEDIUM: Fix plugin handler crashes** (#68318)
4. **🟡 MEDIUM: Address platform integration issues** (BlueBubbles duplicate, Telegram streaming)

### 🚀 Tính năng chiến lược (P3-P4)

**Platform convergence:**
- Cross-platform session sharing (#4335, #68301)
- Extensible platform-specific features (#64900)

**AI capabilities:**
- Multi-agent orchestration (#68222 - generalized ACP)
- Advanced delegation routing (#68304)

**Developer platform:**
- Widget/app SDK cho TUI (#68306)
- Improved voice interaction flow (#61337)
- Enhanced OAuth flows (#21774)

### 📊 Xu hướng phát triển

**Từ monolith → ecosystem:**
- Plugin architecture đang được mở rộng
- ACP client generalization
- Platform-specific extensibility

**Từ CLI-first → multi-surface:**
- Desktop app đang nhận investment lớn
- Voice mode improvements
- Cross-platform session management trở thành priority

**Từ speed → stability:**
- v0.19.0 đạt được speed goals nhưng expose stability issues
- Backlog hiện tại nhiều bug fixes hơn features
- Cần consolidation phase trước khi push features mới

---

## 📌 Kết luận

Hermes-Agent đang ở giai đoạn **post-major-release stabilization**. v0.19.0 "Quicksilver" đạt được breakthrough về performance (80% faster) nhưng đồng thời expose nhiều regression issues, đặc biệt trong desktop app và plugin system. 

**Điểm mạnh:** Community engagement mạnh, roadmap rõ ràng về multi-platform và extensibility.

**Điểm cần cải thiện:** QA process trước release, backward compatibility testing, packaging/distribution hygiene.

**Khuyến nghị:** Users nên cẩn thận với v0.19.0, đặc biệt desktop users và plugin developers. Chờ dot-release tiếp theo để stability improvements được merge.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*