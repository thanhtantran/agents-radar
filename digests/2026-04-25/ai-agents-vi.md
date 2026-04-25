# Bản tin Hệ sinh thái OpenClaw 2026-04-25

> Issues: 380 | PRs: 500 | Dự án: 13 | Thời gian tạo: 2026-04-25 02:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## Phân tích sâu OpenClaw

# Báo cáo phân tích OpenClaw - 25/04/2026

## 1. 📊 Tóm tắt hôm nay

Ngày 25/04 chứng kiến hoạt động mạnh mẽ với **4 releases beta liên tiếp** cho phiên bản 2026.4.23, tập trung vào tích hợp image generation qua OpenAI và OpenRouter. Đội ngũ đóng **hơn 30 issues** tồn đọng từ tháng 3, chủ yếu là các regression bugs sau các bản cập nhật 2026.3.x. Có **15+ PRs mới** được mở, phần lớn là bugfixes cho voice-call, browser automation, và session management.

## 2. 🚀 Releases

### v2026.4.23 (4 beta releases trong ngày)

**Tính năng chính:**

- **🎨 Image Generation qua OAuth**: 
  - OpenAI `gpt-image-2` giờ hoạt động mà không cần `OPENAI_API_KEY`, sử dụng Codex OAuth
  - OpenRouter hỗ trợ image generation với `OPENROUTER_API_KEY` (#55066)
  - Agents có thể yêu cầu quality hints và output format từ provider

- **🔧 Cải thiện kỹ thuật**:
  - Tích hợp reference-image editing
  - Pass OpenAI-specific parameters cho image models

**Ý nghĩa**: Đây là bước tiến quan trọng giúp OpenClaw dễ tiếp cận hơn - người dùng không cần quản lý nhiều API keys riêng lẻ, đặc biệt với OpenAI.

## 3. 📈 Tiến độ dự án

### PRs nổi bật đang mở:

**🔒 Security & Infrastructure:**
- **#70044** - Network-level SSRF protection qua Caddy proxy (XL size)
  - Giải quyết DNS-rebinding TOCTOU gap
  - Opt-in sidecar architecture
  - Đây là PR quan trọng cho production security

**🧠 Memory & Context:**
- **#70554** - Fix dreaming narrative retries cho gateway background runs
  - Cải thiện memory-core extension
  - Xử lý retry logic cho narrative generation

**🌐 Browser Automation:**
- **#71361** - Respect NO_PROXY trong browser navigation SSRF guard
  - Fix blocking không cần thiết cho public URLs khi có proxy config

### PRs đã merge hôm nay:

✅ **#71351** - Hide Telegram tool progress by default (giảm noise)  
✅ **#71317** - Reject unscoped bound turn events trong Codex  
✅ **#71359** - Keep session store live during rotation (tránh data loss)  
✅ **#70431** - Expand tilde (~) trong browser executablePath  

**Xu hướng**: Team đang focus vào **stability và UX polish** - nhiều fixes cho edge cases và user experience improvements.

## 4. 💬 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

**🔥 #39604** (7 comments, 4 👍) - **[STALE]** Feature request: `tools.web.fetch.allowPrivateNetwork`
- Người dùng muốn opt-in cho private network access
- Vẫn chưa được giải quyết sau 1.5 tháng

**⚠️ #40868** (11 comments, 2 👍) - Cron isolated sessions timeout sau update 2026.3.8
- Vấn đề nghiêm trọng ảnh hưởng scheduled tasks
- Đã được đóng nhưng có nhiều duplicates (#51000, #64497, #63805)

**🎙️ Voice Call Issues** - Cụm vấn đề lớn:
- #58115 (11 comments) - EADDRINUSE error
- #58231 (7 comments) - Telnyx inbound calls không được answer
- #64117 (5 comments) - voice-call tool luôn hit EADDRINUSE

**Insight**: Voice-call plugin có nhiều vấn đề về port binding và session management, cần refactor.

## 5. 🐛 Ổn định & Bugs

### Vấn đề nghiêm trọng đã fix:

**Session Management:**
- ✅ Isolated cron sessions overwrite parent session's `updatedAt` (#51000)
- ✅ Session store rotation gây data loss (#71359)
- ✅ Cron jobs timeout do stale runtime artifacts (#71340)

**Browser Automation:**
- ✅ Chrome CDP WebSocket unreachable trên macOS ARM64 (#65740)
- ✅ Tilde expansion trong executablePath (#67264, #67707, #70431)
- ✅ SSRF policy blocking private network khi không nên (#68308)

**Channel-specific:**
- ✅ Telegram media download fails khi có proxy (#45814)
- ✅ Discord proxy không apply cho Carbon REST client (#43581, #52151)
- ✅ WhatsApp voice notes bypass STT pipeline (#63677)

### Vấn đề đang xử lý:

**🔴 Critical:**
- Gateway event loop freezes trên Slack socket mode (#46327)
- Gateway OOM crash với 2GB RAM (#45962)
- WebSocket CLI connection timeout sau upgrade (#47265)

**🟡 Medium:**
- Control UI image upload không deliver (#46534)
- Mistral API 422 error với `max_completion_tokens` (#47079)
- Browser snapshot `refs=aria` fails vì thiếu `_snapshotForAI` (#68059)

## 6. 💡 Yêu cầu tính năng

### Đang được xem xét:

**🌐 Network & Security:**
- Private network access opt-in (#39604) - **STALE nhưng có demand**
- pi-multi-pass integration cho multiple OAuth accounts (#46261)

**🔧 Developer Experience:**
- Better error messages trong stability bundles (#71352)
- Centralized model catalog normalization (#71360)

### Patterns từ user feedback:

1. **Proxy & Network**: Nhiều users ở regions bị chặn (China, etc.) cần proxy support tốt hơn
2. **Multi-tenancy**: Nhu cầu multiple accounts/identities per provider
3. **Observability**: Users muốn better diagnostics và error reporting

## 7. 👥 Phản hồi người dùng

### Trải nghiệm tích cực:

- Voice-call plugin được quan tâm nhiều (mặc dù có bugs)
- Browser automation features được sử dụng rộng rãi
- Cron/scheduled tasks là use case phổ biến

### Pain points:

**🇨🇳 Chinese users** (#46818, #46164, #46207):
- UI bugs với triangle warning icons
- Telegram proxy issues
- Localization concerns

**🔧 DevOps users**:
- Gateway stability trên low-memory VPS
- Docker build failures
- CLI handshake timeouts

**🎙️ Voice users**:
- Telnyx/Twilio integration không ổn định
- Port binding conflicts
- Media stream WebSocket issues

### Quote đáng chú ý:

> "Gateway event loop freezes after Slack connects on 2026.3.13, health endpoint stays live but inbound Slack messages are never processed; 2026.3.8 works fine with identical config." - #46327

Cho thấy regression testing cần được cải thiện.

## 8. 📋 Backlog & Roadmap

### Priorities rõ ràng từ activity:

**🔥 Immediate (đang làm):**
1. ✅ Image generation OAuth integration (shipped trong 2026.4.23)
2. 🔄 Voice-call stability fixes (nhiều PRs đang mở)
3. 🔄 Session management refactor (ongoing)
4. 🔄 SSRF protection hardening (#70044)

**📅 Short-term (1-2 tuần tới):**
1. Gateway memory optimization cho low-spec VPS
2. Browser automation stability (CDP, Playwright integration)
3. Channel proxy support improvements
4. Cron/scheduled task reliability

**🔮 Medium-term (có signals nhưng chưa prioritize):**
1. Private network access policy (#39604)
2. Multi-account OAuth support (#46261)
3. Better observability/diagnostics
4. Localization improvements

### Technical debt đang được giải quyết:

- Model catalog normalization (#71360)
- Legacy clawdbot metadata support (#71346)
- Centralized mention-pattern policy (#70864)

---

## 🎯 Kết luận

OpenClaw đang trong giai đoạn **consolidation và stability** sau các releases 2026.3.x gây nhiều regressions. Team đang:

- ✅ Actively fixing bugs từ backlog tháng 3
- ✅ Shipping new features (image generation) song song
- ✅ Improving security posture (SSRF protection)
- ⚠️ Cần attention hơn cho voice-call và gateway stability

**Momentum tích cực** với 4 beta releases trong ngày và high PR merge velocity. Community engagement tốt với nhiều detailed bug reports.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 25/04/2026

## 1. 🌐 Tổng quan Hệ sinh thái

Hệ sinh thái AI agent đang trải qua giai đoạn **phát triển bùng nổ** với sự xuất hiện của nhiều dự án có định hướng khác nhau. Trong ngày 25/04/2026, chúng ta chứng kiến:

- **Tổng cộng 11 dự án** đang hoạt động tích cực
- **~250 PRs** được tạo/merge trong 24 giờ
- **~100 issues** được xử lý
- **10 releases** từ các dự án khác nhau

### Phân loại theo định hướng:

**🏢 Enterprise-focused**: OpenClaw, IronClaw, Moltis
**🔬 Research/Academic**: NanoBot, CoPaw (QwenPaw)
**🛠️ Developer Tools**: Zeroclaw, PicoClaw, NanoClaw
**🎯 Niche/Specialized**: LobsterAI, NullClaw, ZeptoClaw

---

## 2. 📈 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ trưởng thành | Điểm nổi bật |
|-------|--------|-----|----------|---------------|---------------------|--------------|
| **OpenClaw** | 380 | 500 | 4 | 🔥🔥🔥🔥🔥 | ⭐⭐⭐⭐⭐ | 4 beta releases, image generation OAuth |
| **NanoBot** | 16 | 40 | 0 | 🔥🔥🔥🔥 | ⭐⭐⭐⭐ | Deadlock fix, memory optimization |
| **Zeroclaw** | 16 | 50 | 0 | 🔥🔥🔥🔥🔥 | ⭐⭐⭐ | Multi-agent RFC, config overhaul |
| **PicoClaw** | 11 | 36 | 1 | 🔥🔥🔥🔥 | ⭐⭐⭐⭐ | Reasoning visibility, MCP tools |
| **NanoClaw** | 14 | 37 | 0 | 🔥🔥🔥🔥🔥 | ⭐⭐⭐ | V2 stabilization, observability |
| **NullClaw** | 2 | 11 | 0 | 🔥🔥 | ⭐⭐ | Tool customization, E2EE |
| **IronClaw** | 12 | 50 | 0 | 🔥🔥🔥🔥 | ⭐⭐⭐⭐ | Engine V2, multi-tenant |
| **LobsterAI** | 3 | 10 | 2 | 🔥🔥🔥 | ⭐⭐⭐⭐ | DeepSeek V4, embedding config |
| **Moltis** | 10 | 32 | 0 | 🔥🔥🔥🔥🔥 | ⭐⭐⭐⭐ | Landlock isolation, Home Assistant |
| **CoPaw** | 33 | 43 | 2 | 🔥🔥🔥🔥 | ⭐⭐⭐⭐ | Plan Mode, memory refactor |
| **ZeptoClaw** | 1 | 0 | 0 | 🔥 | ⭐⭐ | Feishu integration proposal |

### Chú thích:
- 🔥 = Mức độ hoạt động (1-5 flames)
- ⭐ = Mức độ trưởng thành (1-5 stars)

---

## 3. 🏆 Vị thế của OpenClaw

### Điểm mạnh vượt trội

**1. Quy mô & Độ trưởng thành**
- **380 issues, 500 PRs** - Lớn nhất trong hệ sinh thái
- **4 releases trong 1 ngày** - Velocity cao nhất
- Cộng đồng đông đảo với nhiều contributors

**2. Tính năng dẫn đầu**
- ✅ **OAuth integration** cho image generation - Duy nhất trong hệ sinh thái
- ✅ **Multi-channel support** hoàn chỉnh nhất (Telegram, Discord, Slack, WhatsApp, Signal)
- ✅ **Voice-call plugin** - Tính năng độc quyền
- ✅ **Browser automation** với CDP/Playwright

**3. Production-ready**
- Hệ thống session management ổn định
- SSRF protection với Caddy proxy
- Comprehensive error handling
- Docker-first approach

### Điểm yếu cần cải thiện

**1. Technical Debt**
- Voice-call plugin có nhiều bugs (EADDRINUSE, port binding)
- Gateway stability issues trên low-memory VPS
- Regression testing chưa đủ mạnh (nhiều bugs từ 2026.3.x)

**2. Developer Experience**
- Documentation gaps cho advanced features
- Onboarding phức tạp cho người dùng mới
- Proxy configuration không nhất quán

**3. Cạnh tranh từ các dự án khác**
- **IronClaw**: Engine V2 architecture hiện đại hơn
- **Moltis**: Security-first approach với Landlock
- **CoPaw**: Memory system tiên tiến hơn

### Vị trí trong hệ sinh thái

OpenClaw đang ở vị trí **"Industry Standard"** - dự án được tham chiếu nhiều nhất, nhưng đang đối mặt với áp lực từ các dự án mới với kiến trúc hiện đại hơn.

```
Maturity vs Innovation Matrix:

High Innovation │     IronClaw    Moltis
                │     NanoClaw    
                │                 
                │  Zeroclaw   CoPaw
                │                 
                │ OpenClaw ◄─── Đang ở đây
                │  LobsterAI     
                │                 
Low Innovation  │ NullClaw  PicoClaw
                └─────────────────────
                Low          High
                   Maturity
```

---

## 4. 🔧 Hướng Kỹ thuật Chung

### Xu hướng được nhiều dự án áp dụng

**1. Multi-Agent Architecture** 🤖
- **Zeroclaw**: RFC #5890 cho multi-agent UX
- **NanoClaw**: Delegate tool cho cross-agent handoff
- **Moltis**: Sub-agent presets với 7 built-in roles
- **CoPaw**: Async agent communication

**Insight**: Hệ sinh thái đang chuyển từ **single-agent** sang **agent orchestration**.

**2. Memory & Context Management** 🧠
- **CoPaw**: Refactor bộ nhớ dài hạn với auto-summarization
- **NanoBot**: Memory optimization (giảm 25MB startup)
- **LobsterAI**: Embedding configuration cho memory search
- **OpenClaw**: Session management improvements

**Insight**: **Long-term memory** là bài toán quan trọng nhất hiện nay.

**3. Security & Isolation** 🔒
- **Moltis**: Landlock filesystem isolation (kernel-level)
- **OpenClaw**: SSRF protection qua Caddy proxy
- **IronClaw**: Multi-tenant channel instances
- **NullClaw**: E2EE với pantalaimon proxy

**Insight**: **Production security** đang được ưu tiên cao hơn features.

**4. Provider Flexibility** 🔌
- **Zeroclaw**: Provider failover mechanism
- **NanoClaw**: Custom OpenAI-compatible endpoints
- **LobsterAI**: DeepSeek V4, Kimi K2.6 support
- **IronClaw**: NEAR AI tool schema normalization

**Insight**: Phá vỡ **vendor lock-in**, hỗ trợ self-hosted LLMs.

**5. Observability & Debugging** 📊
- **NanoClaw**: Tool call event logging, live activity
- **IronClaw**: OpenTelemetry tracing
- **Moltis**: Witness recording với zkperf
- **PicoClaw**: Thought visibility toggle

**Insight**: **Production debugging** là pain point lớn.

---

## 5. 🎯 Điểm Khác biệt

### Chiến lược Sản phẩm

| Dự án | Chiến lược | Target User | Moat |
|-------|-----------|-------------|------|
| **OpenClaw** | Feature breadth | Enterprise/SMB | Ecosystem size |
| **IronClaw** | Architecture quality | Developers | Engine V2 design |
| **Moltis** | Security-first | Security-conscious orgs | Landlock isolation |
| **CoPaw** | AI capabilities | AI researchers | Memory system |
| **NanoBot** | Simplicity | Individual users | Ease of use |
| **Zeroclaw** | Flexibility | Power users | Customization |

### Tính năng Độc quyền

**OpenClaw**:
- ✅ OAuth image generation (không cần API keys)
- ✅ Voice-call plugin (Telnyx/Twilio)
- ✅ Browser CDP WebSocket

**IronClaw**:
- ✅ Engine V2 với available_actions
- ✅ NEAR AI native integration
- ✅ Multi-tenant control plane

**Moltis**:
- ✅ Landlock kernel-level isolation
- ✅ Home Assistant integration
- ✅ Witness recording (blockchain-adjacent)

**CoPaw**:
- ✅ Plan Mode với live panel
- ✅ Semantic skill routing
- ✅ CJK-aware memory tokenization

**NanoClaw**:
- ✅ Observability infrastructure
- ✅ Gmail/Calendar MCP tools
- ✅ WhatsApp media handling

### Cộng đồng & Văn hóa

**OpenClaw**: 
- 🌍 Quốc tế, đa dạng use cases
- 💬 High engagement, nhiều bug reports
- 📚 Documentation tốt nhưng chưa đủ

**IronClaw**:
- 🔬 Developer-centric, technical discussions
- 🏗️ Architecture-focused
- 📖 Documentation gaps lớn

**Moltis**:
- 🛡️ Security-conscious community
- 🤝 Collaborative, nhiều RFCs
- 📝 Systematic documentation (AutoDoc)

**CoPaw**:
- 🇨🇳 Chủ yếu Trung Quốc
- 🎓 Academic/research oriented
- 🚀 Fast-paced development

**NanoBot**:
- 👤 Individual users, simple use cases
- 🐛 Bug-focused discussions
- 📖 Minimal documentation

---

## 6. 🌱 Mức độ Trưởng thành Cộng đồng

### Tier 1: Mature Communities (⭐⭐⭐⭐⭐)

**OpenClaw**
- ✅ 380 issues, 500 PRs - Quy mô lớn nhất
- ✅ Nhiều contributors, high bus factor
- ✅ Established processes (release cycles, bug triage)
- ⚠️ Cần cải thiện: Regression testing, documentation

**Đánh giá**: **Industry leader**, nhưng cần consolidation.

### Tier 2: Growing Communities (⭐⭐⭐⭐)

**IronClaw, Moltis, CoPaw, LobsterAI, PicoClaw**
- ✅ Active development (30-50 PRs/ngày)
- ✅ Clear roadmap và priorities
- ✅ Responsive maintainers
- ⚠️ Cần cải thiện: Contributor diversity, documentation

**Đánh giá**: **Fast-growing**, có tiềm năng vượt OpenClaw.

### Tier 3: Emerging Communities (⭐⭐⭐)

**Zeroclaw, NanoClaw, NanoBot**
- ✅ Solid technical foundation
- ✅ Niche use cases rõ ràng
- ⚠️ Cần cải thiện: Community size, stability

**Đánh giá**: **Promising**, cần thời gian để mature.

### Tier 4: Early Stage (⭐⭐)

**NullClaw, ZeptoClaw**
- ✅ Innovative ideas
- ⚠️ Low activity, small community
- ⚠️ Unclear roadmap

**Đánh giá**: **Experimental**, chưa rõ tương lai.

---

## 7. 🔮 Tín hiệu Xu hướng

### Xu hướng Ngắn hạn (Q2 2026)

**1. Consolidation Phase**
- Các dự án lớn (OpenClaw, IronClaw, Moltis) đang focus vào **stability** hơn features
- Nhiều bugs từ releases trước đang được fix
- **Prediction**: Sẽ có ít releases lớn, nhiều hotfixes

**2. Security Hardening**
- Landlock, SSRF protection, E2EE đang được triển khai rộng rãi
- **Prediction**: Security sẽ trở thành **table stakes** cho production deployment

**3. Multi-Agent Orchestration**
- Nhiều dự án đang implement agent-to-agent communication
- **Prediction**: **Agent mesh** sẽ là kiến trúc phổ biến trong 6 tháng tới

### Xu hướng Trung hạn (Q3-Q4 2026)

**1. Memory System Evolution**
- Từ simple context window → RAG → semantic memory
- **Prediction**: **Vector databases** sẽ trở thành core dependency

**2. Provider Ecosystem**
- Phá vỡ vendor lock-in, hỗ trợ self-hosted LLMs
- **Prediction**: **LiteLLM/OpenRouter** sẽ trở thành standard abstraction layer

**3. Observability Standards**
- OpenTelemetry, structured logging đang được áp dụng
- **Prediction**: **Langfuse/LangSmith** sẽ là de-facto monitoring tools

**4. Platform Consolidation**
- Một số dự án nhỏ sẽ bị merge hoặc abandoned
- **Prediction**: Chỉ còn **5-6 dự án chính** vào cuối năm

### Xu hướng Dài hạn (2027+)

**1. Enterprise Features**
- Multi-tenancy, RBAC, audit trails
- **Prediction**: **IronClaw/Moltis** sẽ dẫn đầu enterprise adoption

**2. Vertical Integration**
- Specialized agents cho từng industry (healthcare, finance, legal)
- **Prediction**: **Niche players** sẽ xuất hiện và thành công

**3. Standardization**
- Agent Skills RFC, MCP protocol sẽ trở thành standards
- **Prediction**: **Interoperability** giữa các frameworks

---

## 8. 💡 Insights Chiến lược

### Cho OpenClaw

**Ưu tiên ngay lập tức**:
1. 🔴 **Fix voice-call plugin** - Đang làm mất uy tín
2. 🔴 **Improve regression testing** - Tránh bugs từ releases mới
3. 🟡 **Documentation overhaul** - Giảm friction cho new users

**Ưu tiên trung hạn**:
1. 🟡 **Multi-agent architecture** - Đuổi kịp Zeroclaw/NanoClaw
2. 🟡 **Memory system upgrade** - Học từ CoPaw
3. 🟢 **Security hardening** - Học từ Moltis (Landlock)

**Chiến lược dài hạn**:
- **Defend market share** bằng cách cải thiện stability
- **Innovate selectively** - Không cần mọi tính năng mới
- **Build ecosystem** - Plugin marketplace, skill registry

### Cho các dự án khác

**IronClaw**: Focus vào **documentation** và **developer experience** để tăng adoption

**Moltis**: Leverage **security moat**, target **enterprise customers**

**CoPaw**: Expand **internationally**, improve **English documentation**

**NanoClaw**: Complete **v2 stabilization**, build **production case studies**

**Zeroclaw**: Finish **multi-agent RFC**, establish **thought leadership**

---

## 9. 🎬 Kết luận

Hệ sinh thái AI agent đang ở giai đoạn **"Cambrian Explosion"** với nhiều dự án cạnh tranh khốc liệt. OpenClaw vẫn giữ vị trí dẫn đầu về quy mô và tính năng, nhưng đang đối mặt với áp lực từ các dự án mới với kiến trúc hiện đại hơn.

**Key Takeaways**:
1. **Security & Stability** đang trở thành ưu tiên số 1
2. **Multi-agent orchestration** là xu hướng không thể đảo ngược
3. **Memory systems** là bài toán quan trọng nhất
4. **Provider flexibility** phá vỡ vendor lock-in
5. **Observability** là pain point lớn cần giải quyết

**Dự đoán**: Trong 6-12 tháng tới, sẽ có **consolidation** với 2-3 dự án chiếm ưu thế, phần còn lại sẽ trở thành niche players hoặc bị abandoned. OpenClaw cần **act fast** để maintain leadership position.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích dự án NanoBot - 25/04/2026

## 📊 Tóm tắt hôm nay

Ngày 24-25/04 là một ngày hoạt động cực kỳ sôi nổi với **16 issues được cập nhật** và **30 PRs được merge/đóng**. Dự án tập trung mạnh vào việc cải thiện hiệu suất, sửa lỗi nghiêm trọng về deadlock, và nâng cấp khả năng xử lý media (video). Đáng chú ý là các vấn đề về memory consumption và session management đang được ưu tiên xử lý.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng có nhiều hotfix và cải tiến quan trọng được merge vào nightly branch, dự kiến sẽ có trong bản v0.1.5.post3 sắp tới.

---

## 🔧 Tiến độ dự án

### PRs quan trọng đã merge (24/04):

**🔴 Critical Fixes:**
- **#3428** - Sửa lỗi deadlock nghiêm trọng khi LLM API call bị treo, gây session lock starvation
- **#3427** - Sửa lỗi session replay token budgeting và normalize DeepSeek content payloads
- **#3423** - Giảm 25MB memory startup bằng lazy-import document parsers (openpyxl, python-docx, python-pptx)

**🎥 Media Enhancement:**
- **#3429** - Telegram giờ gửi video qua `send_video` thay vì `send_document`, hỗ trợ inline player
- **#3430** - WebUI render video attachments với signed media URLs

**🔐 Security & Stability:**
- **#1403** - Deny by default trong `is_allowed` cho tất cả channels (bảo mật)
- **#1272** - Tích hợp Ruff linting + pre-commit hooks
- **#1400** - Xử lý SIGTERM, SIGHUP đúng cách trên Linux

**🛠️ Infrastructure:**
- **#1435** - Hỗ trợ chạy multiple instances với `--workspace/-w` flag
- **#1241** - Systemd service CLI interface cho Linux
- **#1327** - Thêm WeChat Work (WeCom) channel support

### Xu hướng phát triển:
- **Observability**: PR #3173 đang thêm OpenTelemetry tracing (Langfuse, LangSmith)
- **Multi-platform**: Mở rộng sang WeChat Work, cải thiện MSTeams threading
- **Performance**: Tập trung giảm memory footprint và tối ưu startup time

---

## 💬 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

**🔥 #3376** (7 comments, 1 👍) - **Provider/Model Failover**
- Người dùng Trung Quốc yêu cầu tự động chuyển đổi provider khi gặp lỗi 429/5xx
- Hiện tại chỉ retry trong cùng provider, gây gián đoạn khi single point failure
- Đây là tính năng quan trọng cho production deployment

**🤔 #3421** (4 comments) - **RFC: `nanobot update` command**
- Đề xuất thêm CLI command để check và update nanobot
- Hiện phải chạy `pip install --upgrade` thủ công
- Cộng đồng đang thảo luận về UX và implementation

**📱 #3344** (4 comments) - **DingTalk file upload issue**
- File upload và @mention gửi thành 2 message riêng biệt
- Bot không nhận được file
- Vấn đề platform-specific cần workaround

---

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đã fix:

**#3424 → #3428** - **Agent deadlock** ⚠️
- LLM API call treo → session lock bị giữ vô thời hạn
- Heartbeat và message mới bị block
- **Fix**: Thêm wall-clock timeout guard

**#3410** - **RAM consumption tăng 3x** (200MB → 600MB)
- Sau upgrade v0.1.4 → v0.1.5.post2
- Nghi ngờ do tính năng "dream" mới
- Đang điều tra và tối ưu

**#3417** - **Claude Opus 4.7 reject với 400**
- `anthropic_provider` hardcode `temperature=1.0`
- Opus 4.7 deprecated parameter này
- Đã fix trong #3417

**#3426** - **OpenAI Codex không stream progress**
- Regression từ v0.1.4.post6 → v0.1.5.post2
- Tool events OK nhưng không có streaming deltas
- Ảnh hưởng UX khi chờ response

### Bugs đang mở:

**#2568** - Telegram markdown rendering không ổn định (từ v0.1.4.post6)
**#2772** - WeChat chỉ trả về tối đa 10 messages per context

---

## ✨ Yêu cầu tính năng

### Đang được thảo luận:

**#3421** - `nanobot update` CLI command
- Auto-check và apply updates
- Giảm friction cho end users

**#3376** - Provider/Model Failover
- Tự động chuyển provider khi gặp lỗi
- Critical cho production reliability

**#3309** - Per-chat group policy cho Telegram
- Hiện tại chỉ có workspace-wide `group_policy`
- Cần override riêng cho từng group

**#162** - Cải thiện session management
- Hỗ trợ multiple conversations
- Auto-expiration
- Session key phức tạp hơn

---

## 👥 Phản hồi người dùng

### Tích cực:
- Cộng đồng đánh giá cao tốc độ fix bugs (deadlock fix trong 24h)
- WeChat Work integration được chào đón
- Video support cải thiện UX đáng kể

### Tiêu cực/Quan ngại:
- **Memory consumption** tăng đột biến gây lo ngại cho VPS nhỏ
- **Markdown rendering** trên Telegram không ổn định gây khó chịu
- **Skill creation** bị remove khiến user bối rối (#2049)

### Pain points chính:
1. Thiếu failover mechanism cho multi-provider setup
2. Session management còn đơn giản, thiếu flexibility
3. Platform-specific issues (DingTalk, WeChat) cần attention

---

## 🗺️ Backlog & Roadmap

### Đang trong pipeline:

**Observability** (#3173)
- OpenTelemetry tracing
- Langfuse/LangSmith integration
- Production monitoring capabilities

**MSTeams improvements** (#3431, #3432)
- Threaded replies với `replyToId`
- Prune stale conversation refs
- Better notification logic

**Performance optimization**
- Lazy imports (#3423 ✅)
- Memory profiling cho "dream" feature
- Session file growth caps (#3427 ✅)

### Roadmap dự kiến:

**Q2 2026:**
- Provider failover mechanism
- Enhanced session management
- Video support cho các channels khác
- Memory optimization phase 2

**Cần ưu tiên:**
- Stability trước features mới
- Memory footprint optimization
- Better error handling và recovery
- Documentation cho advanced features

---

## 📈 Metrics

- **Issues đóng**: 6/16 (37.5%)
- **PRs merge**: 30+ trong 24h
- **Contributors active**: ~10-15 người
- **Response time**: < 24h cho critical bugs
- **Community engagement**: Cao (nhiều RFC và discussions)

---

**Kết luận**: NanoBot đang trong giai đoạn phát triển nhanh với focus mạnh vào stability và performance. Team phản ứng rất nhanh với bugs nghiêm trọng, nhưng cần cân bằng giữa features mới và technical debt. Memory consumption là vấn đề cần giải quyết gấp trước khi release stable version tiếp theo.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo Phân tích Zeroclaw - Ngày 25/04/2026

## 🎯 Tóm tắt hôm nay

Zeroclaw đang trải qua một đợt tái cấu trúc lớn với 50 PRs đang hoạt động, tập trung vào việc cải thiện hệ thống config, mở rộng hỗ trợ đa kênh, và sửa lỗi tool calling. Dự án đang chuyển hướng mạnh mẽ sang kiến trúc multi-agent với RFC #5890 đang trong giai đoạn thảo luận. Có 16 issues mở, trong đó nhiều vấn đề nghiêm trọng (S0-S1) liên quan đến provider configuration và tool execution đang được ưu tiên xử lý.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### Các PR quan trọng đang được xử lý:

**🔧 Cải thiện hệ thống cấu hình:**
- **#5960** - Viết lại hoàn toàn module onboarding (8,534 dòng → schema-driven), giảm độ phức tạp và tăng tính idempotent
- **#6092** - Sửa lỗi nghiêm trọng: fallback providers không đọc được `api_key`, `base_url` từ config, chỉ dựa vào env vars
- **#6021** - Hỗ trợ cú pháp JSON array cho `Vec<String>` trong `config set`
- **#6085** - Thay đổi `session_ttl_hours` mặc định từ 0 (vô hạn) → 168h (7 ngày) để tránh memory leak

**🤖 Multi-agent & Internationalization:**
- **#5890** (RFC) - Thiết kế UX flow cho multi-agent, đang trong giai đoạn thảo luận 7 ngày
- **#5788** - Tích hợp Mozilla Fluent cho i18n + multi-locale mdBook documentation
- **#5889** - Xử lý vấn đề config fields phức tạp (Vec, HashMap) không được hỗ trợ đầy đủ

**🔌 Mở rộng hỗ trợ kênh:**
- **#6010** - Triển khai `request_approval()` cho Discord, Slack, Signal, Matrix, WhatsApp (trước đây chỉ có Telegram)
- **#6088** - Batch media-group images trên Telegram thành một request duy nhất
- **#6080** - Enable tool support cho webhook endpoint
- **#6087** - Hỗ trợ env var overrides cho channel tokens (Slack, Discord, Telegram)

**🛠️ Provider & Tool Calling Fixes:**
- **#6093** - Loại bỏ narration push trùng lặp trước AssistantToolCalls
- **#6027** - Enable native tool calling cho MiniMax provider
- **#5975** - Sửa lỗi tool-call compatibility với Gemini/OpenRouter

### Xu hướng phát triển:

1. **Decoupling & Modularity**: Tách gateway và tui-onboarding khỏi agent-runtime (#5735)
2. **PostgreSQL comeback**: Đưa PostgreSQL memory backend trở lại (#6016) sau khi bị xóa ở #4714
3. **Observability**: Enriching OTel spans với semantic conventions (#6009)
4. **Docker improvements**: Sửa lỗi web dashboard không được include trong Docker images (#6025, #5996)

## 🌟 Điểm nổi bật cộng đồng

### Issues được quan tâm nhất:

**#5459** (👍 4) - **Ollama provider tool calling bị broken**
- Provider hard-code `tool_count=0`, khiến native tool calling hoàn toàn không hoạt động
- Ảnh hưởng nghiêm trọng đến người dùng self-hosted với Ollama

**#5815** (👍 2, 9 comments) - **Provider ignores llamacpp config**
- Config `[providers.models.llamacpp]` bị ignore, luôn dùng default values
- Vấn đề xuất hiện sau schema version 2

**#5890** (5 comments) - **RFC: Multi-agent UX flow**
- Đang trong giai đoạn discussion 7 ngày
- Thiết kế kiến trúc cho multi-agent system
- Cộng đồng đang tích cực thảo luận về implementation approach

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng (S0-S1):

**S0 - Data loss / Security risk:**
- **#6097** - Local image reading failed: images từ "skill" dùng local path, API models không đọc được
- **#6089** - False "Missing API key" warning khi dùng local llamacpp với WhatsApp channel
- **#6090** - Telegram misconfigured anthropic call

**S1 - Workflow blocked:**
- **#5815** - Provider ignores llamacpp config
- **#5459** - Ollama tool calling hoàn toàn không hoạt động
- **#5962** - Ollama Provider call failed khi cần tools
- **#6000** - Hard-coded defaults ngăn cản local hosted setup
- **#4846** - WhatsApp-Web channel broken (requires feature flag)
- **#6095** - Bedrock 400 error với claude-opus-4-7: "temperature is deprecated"

### Bugs đã được fix (PRs merged/closed):

- **#2324** - Tools trong `always_ask` bị auto-denied thay vì prompt confirmation (fixed by #6010)
- **#6000** - Duplicate của #5815, đã đóng
- **#6016** - PostgreSQL memory backend đã được restore

## 💡 Yêu cầu tính năng

**Đang được triển khai:**

1. **Multi-agent architecture** (#5890 RFC) - Thiết kế UX flow cho hệ thống multi-agent
2. **i18n support** (#5788) - Mozilla Fluent pipeline + multi-locale docs
3. **PostgreSQL memory backend** (#6015, #6016) - Cho production deployments
4. **Enhanced observability** (#6009) - OTel semantic conventions cho tool spans

**Được đề xuất:**

- **#5318** - Ẩn nội dung "thinking" khi `stream_mode = Partial` (4 comments, chưa có response)

## 👥 Phản hồi người dùng

### Pain points chính:

1. **Local LLM setup phức tạp**: Nhiều users gặp khó khăn với Ollama và llamacpp configuration
2. **Tool calling không ổn định**: Đặc biệt với Ollama và các providers tự host
3. **Channel-specific issues**: WhatsApp, Telegram có nhiều edge cases chưa được xử lý
4. **Memory management**: Session TTL mặc định = 0 gây memory leak nghiêm trọng
5. **Documentation gaps**: Thiếu hướng dẫn cho local/self-hosted setups

### Điểm tích cực:

- Maintainers (@singlerider) rất responsive, nhiều PRs được tạo trong 24h để fix reported issues
- Community đang tích cực tham gia RFC discussions
- Codebase đang được refactor để dễ maintain hơn

## 🗺️ Backlog & Roadmap

### Đang trong pipeline:

**High priority:**
- Hoàn thiện multi-agent UX flow (RFC #5890 - vote dự kiến sau 7 ngày)
- Stabilize tool calling across all providers
- Fix critical S0/S1 bugs (11 issues)

**Medium priority:**
- Complete i18n implementation (#5788)
- Improve Docker experience (#6025, #6096)
- Enhance observability (#6009)

**Technical debt:**
- Remove dead code (#6094 - 566-line orphan file)
- Decouple dependencies (#5735)
- Improve config system (#5889 - compound fields support)

### Rủi ro cần lưu ý:

⚠️ **#6064** - PR nguy hiểm: Implement bypass cho shell policy validation (marked DO NOT MERGE) - cần review kỹ về security implications

---

**Kết luận**: Zeroclaw đang trong giai đoạn tái cấu trúc mạnh mẽ với focus vào stability, multi-agent support, và developer experience. Số lượng PRs cao (50) cho thấy momentum phát triển tốt, nhưng cần ưu tiên xử lý các S0/S1 bugs để đảm bảo trải nghiệm người dùng.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo Phân tích Hệ sinh thái PicoClaw - 2026-04-25

## 1. 📊 Tóm tắt hôm nay

Ngày 24-25/04 chứng kiến một đợt hoạt động mạnh mẽ với **36 PRs** và **11 issues** được xử lý. Trọng tâm là cải thiện trải nghiệm người dùng với reasoning visibility, sửa lỗi MCP tool execution, và tăng cường bảo mật WebSocket. Đặc biệt, có nhiều PR được merge liên quan đến ổn định hệ thống và cấu hình đa ngôn ngữ.

---

## 2. 🚀 Releases

### **v0.2.7-nightly.20260425.8d51d306**
- Build tự động hàng đêm, đánh dấu giai đoạn phát triển tích cực
- ⚠️ Cảnh báo: Bản nightly có thể không ổn định, khuyến nghị dùng cho testing

---

## 3. 🔧 Tiến độ dự án

### **Các PR quan trọng đã merge:**

#### 🛡️ Bảo mật & Ổn định
- **#2256**: Tăng cường bảo mật WebSocket với `CheckOrigin` validation - ngăn chặn CSWSH attacks
- **#2642**: Xử lý PID file trong Docker containers (tránh conflict với PID 1)
- **#2474**: Cron jobs giờ dùng session độc lập, tránh lịch sử hội thoại bị chồng chéo

#### 🌐 Đa ngôn ngữ & Cấu hình
- **#2573**: Sửa lỗi locale changes ảnh hưởng đến web_search routing toàn cục
- **#2037**: Thêm hỗ trợ tiếng Bồ Đào Nha (Brazil) - 534 chuỗi dịch hoàn chỉnh
- **#2415**: Cải thiện thông báo lỗi cấu hình JSON với line/column chính xác

#### 🤖 Agent & Tool Improvements
- **#2657**: Sửa lỗi DeepSeek reasoning mode - persist canonical history đúng cách
- **#2641**: CLI quản lý MCP servers (show/add/list/remove/test/edit)
- **#2647**: Enable DuckDuckGo mặc định cho web_search, sửa YAML config support

### **PRs đang chờ review (quan trọng):**

#### 🎯 Tính năng mới
- **#2656**: **Prompt layering** - cơ chế phân lớp prompt với metadata (layer/slot/source)
- **#2531**: **Delegate tool** - cho phép agents giao task cho nhau (cross-agent handoff)
- **#2653**: **MQTT channel support** - mở rộng kênh giao tiếp

#### 🐛 Bug fixes đang chờ
- **#2666**: MCP tool gửi empty object thay vì null
- **#2664**: Retry MCP tool calls khi HTTP session bị mất
- **#2660**: Format tool args dạng JSON code blocks trong feedback
- **#2663**: Cải thiện feedback khi save/restart config

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues được quan tâm nhất:**

#### 🔥 #2404 - Streaming HTTP requests (👍 1)
- Yêu cầu thêm `"streaming": true` trong config để gửi streaming requests tới LLM backend
- Tương tự Python OpenAI client behavior

#### 🐛 #2616 - Web search không hoạt động khi DuckDuckGo disabled (👍 1)
- **ĐÃ SỬA** trong #2647: DuckDuckGo giờ được enable mặc định
- Vấn đề nghiêm trọng với người dùng quốc tế

#### ❓ #2651 - Hướng dẫn build trên Windows
- Cộng đồng cần documentation rõ ràng hơn cho Windows build flow
- Liên quan đến #2487 đã fix Windows build issues

---

## 5. 🔴 Ổn định & Bugs

### **Bugs đang được xử lý:**

#### 🚨 Ưu tiên cao
1. **#2665** - Anthropic model IDs sai format (dots thay vì dashes)
   - Ví dụ: `claude-sonnet-4.6` → `claude-sonnet-4-6`
   - Ảnh hưởng: API calls thất bại

2. **#2650** - DeepSeek-V4-Flash lỗi sau khi gọi tools với reasoning enabled
   - Workaround: Tắt reasoning hoặc clear session
   - Root cause: Liên quan đến #2648 (reasoning content ordering)

3. **#2448** - WebUI hiển thị agent reasoning lẫn với user reply
   - **ĐÃ SỬA** qua #2661: Thêm toggle để ẩn/hiện thoughts
   - Cải thiện UX đáng kể

### **Bugs đã giải quyết:**
- ✅ Web search provider selection bị leak qua UI language changes (#2572 → #2573)
- ✅ Cron job session interference (#2474)
- ✅ Windows build failures (#2487)

---

## 6. ✨ Yêu cầu tính năng

### **Đang được đề xuất:**

#### 🌟 #2652 - GitHub Copilot support
- Yêu cầu tích hợp GitHub Copilot provider
- Chưa có implementation details

#### 🔌 #2649 - Serial port (UART) tool support
- Bổ sung cho I2C/SPI tools hiện có
- Use case: Embedded development, IoT debugging
- Rất hợp lý cho định hướng hardware của Sipeed

#### 🔐 #2499 - Secure third-party WS access
- Auth boundaries cho browser extensions và external clients
- Versioned compatibility policy
- **Status**: Marked as `wontfix` - team có thể không ưu tiên

---

## 7. 👥 Phản hồi người dùng

### **Trải nghiệm tích cực:**
- 🎉 Cộng đồng đánh giá cao việc thêm Portuguese (Brazil) locale
- 👍 MCP CLI commands được chào đón (dễ quản lý hơn manual JSON editing)
- ✅ Thought visibility toggle giải quyết pain point về reasoning clutter

### **Pain points:**
- 😓 Windows build process vẫn gây khó khăn cho contributors
- 🌍 Web search chỉ hoạt động tốt ở Trung Quốc (Sogou), người dùng quốc tế gặp vấn đề
- 🔧 DeepSeek reasoning mode chưa ổn định với tool calls

### **Yêu cầu documentation:**
- Cần hướng dẫn rõ hơn về Windows build
- MCP server configuration examples
- Multi-agent delegation patterns

---

## 8. 📋 Backlog & Roadmap

### **Đang triển khai (Phase 2):**
- ✅ **Delegate tool** (#2531) - Cross-agent task handoff
- 🔄 **Prompt layering** (#2656) - Structured prompt management
- 🔄 **Channel standardization** (#2551) - Decouple name from provider type

### **Xu hướng phát triển:**
1. **Multi-agent orchestration** - Delegate tool là bước đầu
2. **Hardware integration** - Serial port tool cho embedded use cases
3. **Enterprise features** - Secure WS access, OAuth improvements
4. **Developer experience** - Better config diagnostics, CLI tools
5. **Internationalization** - Mở rộng hỗ trợ ngôn ngữ (đã có EN, ZH, PT-BR)

### **Technical debt:**
- Windows build flow cần refactor toàn diện
- MCP session lifecycle cần robust error handling
- Provider-specific quirks (DeepSeek reasoning, Anthropic model IDs)

---

## 🎯 Kết luận

PicoClaw đang trong giai đoạn **maturation** với focus vào:
- ✅ Ổn định core features (MCP, reasoning, multi-channel)
- 🚀 Mở rộng capabilities (delegate tool, MQTT, serial port)
- 🌍 Cải thiện accessibility (i18n, better configs, CLI tools)
- 🛡️ Tăng cường bảo mật (WebSocket hardening, OAuth fixes)

Tốc độ phát triển cao (36 PRs/ngày) cho thấy team và cộng đồng rất active. Cần chú ý đến Windows support và documentation để mở rộng contributor base.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo Phân tích NanoClaw - Ngày 2026-04-25

## 🎯 Tóm tắt hôm nay

Ngày 24-25/04 là một trong những ngày hoạt động mạnh nhất của dự án NanoClaw với **30 PRs được tạo/cập nhật** trong 24 giờ, tập trung vào việc ổn định kiến trúc v2 mới ra mắt (22/04). Cộng đồng đang tích cực sửa lỗi setup, cải thiện observability, và mở rộng hỗ trợ messaging channels (WhatsApp, Signal). Đáng chú ý là các nỗ lực làm cho v2 production-ready thông qua việc sửa các lỗi critical trong quá trình cài đặt và vận hành.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng dự án đang trong giai đoạn **post-v2 stabilization**. Version 2.0 (phát hành 22/04) là một architectural rewrite lớn với những thay đổi quan trọng:

- Kiến trúc container mới với credential isolation
- OneCLI trở thành con đường duy nhất cho API credentials
- Hệ thống messaging được thiết kế lại với `engage_mode` thay vì `trigger_rules`

---

## 📈 Tiến độ dự án

### 🔥 Xu hướng phát triển chính

**1. Ổn định Setup & Installation (Ưu tiên cao nhất)**

Nhiều PRs tập trung vào việc sửa các lỗi blocking trong quá trình cài đặt v2:

- **#1987** - Fail fast khi thiếu build tools trước khi chạy `pnpm install`
- **#1973** - Fix lỗi `onecli not found` do PATH không được propagate đến bash subprocess
- **#1981** - Systemd bị misdetect trên headless Linux
- **#1960** - Register step sử dụng columns đã bị xóa bởi migration 010

💡 **Insight**: Team đang gặp friction lớn với developer experience trong setup flow, đặc biệt trên Linux environments.

**2. Observability & Debugging (Tính năng mới quan trọng)**

Chuỗi PRs từ @Jeffrey-Keyser xây dựng hệ thống quan sát tool calls:

- **#1986, #1993** - Tool call event logging cho CEO và ops agents
- **#1985** - Live agent activity observability với SQLite storage
- Thêm `/activity` command để xem real-time agent execution

💡 **Insight**: Đây là bước tiến lớn cho production debugging - trước đây không có cách nào để quan sát agents đang làm gì.

**3. Messaging Channels Expansion**

- **#1998, #1988** - WhatsApp media handling improvements (mimetype fixes, attachment pipeline)
- **#1962** - Signal adapter enhancements (voice transcription, images, mentions, groupV2)
- **#1963** - Fix channel registration với engage fields mới

💡 **Insight**: Dự án đang mở rộng từ Telegram sang WhatsApp và Signal, hướng tới multi-platform messaging hub.

**4. Custom LLM Provider Support**

- **#1994, #1995** - Routing cho custom OpenAI-compatible endpoints (LiteLLM, llama.cpp, vLLM)
- **#1968** - End-to-end per-agent provider và model configuration
- **#1983** - Wire per-group `container_config.env` vào spawn

💡 **Insight**: Đang phá vỡ vendor lock-in với Claude/OpenAI, cho phép self-hosted LLMs.

**5. Google Workspace Integration**

- **#1964** - Gmail MCP tool với OneCLI credential injection
- **#1961** - Google Calendar MCP tool

💡 **Insight**: Hướng tới personal assistant use cases với calendar và email access.

---

## 🌟 Điểm nổi bật cộng đồng

### Issues được quan tâm nhất:

**#1503** - SSL cert invalid cho nanoclaw.dev (18 comments)
- Vấn đề infrastructure đang ảnh hưởng đến documentation site
- Cộng đồng đang chờ fix từ maintainers

**#1984** - Custom OpenAI-compat endpoint support (3 comments)
- Nhu cầu rõ ràng từ users muốn dùng local LLMs
- Đã được address bởi PRs #1994 và #1995

### Contributors nổi bật hôm nay:

- **@glifocat** - 6 PRs về docs cleanup và schema updates
- **@Jeffrey-Keyser** - 5 PRs về observability infrastructure
- **@grtwrn** - 3 PRs về WhatsApp và Gmail/Calendar tools
- **@IamAdamJowett** - 3 PRs về provider configuration
- **@TeeJS** - 3 PRs về custom endpoint routing

---

## 🐛 Ổn định & Bugs

### Critical bugs được fix:

1. **Setup failures trên Linux** (#1973, #1981, #1987)
   - PATH propagation issues
   - Systemd detection failures
   - Missing build tools detection

2. **Data isolation** (#4)
   - Task data leakage giữa các groups
   - IPC directories giờ được isolate per-group

3. **Container lifecycle** (#1997)
   - Host sweep killing fresh containers do UTC parsing bug
   - Containers bị kill trong ~60s trên non-UTC hosts

4. **Authentication** (#1970)
   - Setup ping không detect được Claude auth failures
   - Giờ classify riêng `auth_error` thay vì accept bất kỳ stdout nào

5. **Messaging** (#1982)
   - Duplicate replies sau khi pair channel thứ hai
   - #1963 fix channel registration với engage fields

### Bugs còn open:

- **#414** - Docker group stale detection không được remediate
- **#1982** - V2 duplicate replies (chưa có PR)

---

## 💡 Yêu cầu tính năng

### Đã được implement:

✅ **Custom LLM endpoints** (#1984) - Addressed by #1994, #1995
✅ **Tool call observability** - Implemented in #1986, #1993
✅ **Gmail/Calendar tools** - Added in #1961, #1964

### Đang được thảo luận:

🔄 **#1989** - Upgrade fork lên v2 và validate Pan architecture
- Liên quan đến deploy-lan và Telegram work
- Cần validate trên kiến trúc mới

---

## 👥 Phản hồi người dùng

### Pain points chính:

1. **Setup complexity trên Linux**
   - Multiple users gặp issues với systemd, PATH, build tools
   - Developer experience cần cải thiện đáng kể

2. **Documentation lag**
   - Nhiều docs vẫn reference v1 architecture
   - @glifocat đang cleanup với historical banners (#1978)

3. **SSL certificate issues**
   - nanoclaw.dev không accessible, ảnh hưởng onboarding

### Positive signals:

- Cộng đồng contributors rất active (30 PRs trong 24h)
- Quick turnaround trên bug fixes
- Clear communication trong PR descriptions

---

## 🗺️ Backlog & Roadmap

### Immediate priorities (dựa trên activity):

1. **Stabilize v2 setup flow** ⚡ (Highest priority)
   - Fix remaining Linux installation issues
   - Improve error messages và fail-fast behavior

2. **Complete observability rollout** 📊
   - Extend tool logging to all agent types
   - Build UI/dashboard cho `/activity` data

3. **Multi-channel messaging** 💬
   - Finish WhatsApp media handling
   - Stabilize Signal adapter
   - Add more platforms (Discord, Slack mentioned in past issues)

4. **Custom provider ecosystem** 🔧
   - Document custom endpoint setup
   - Add more provider examples (vLLM, Ollama)
   - Per-agent model selection UI

### Strategic direction:

Dự án đang chuyển từ **"Claude-only agent framework"** sang **"multi-provider, multi-channel agent orchestration platform"**. Focus vào:

- Vendor independence (custom LLMs)
- Platform diversity (messaging channels)
- Production readiness (observability, stability)
- Developer experience (setup, docs)

---

## 📊 Metrics Summary

- **PRs created/updated**: 30 trong 24h
- **Issues updated**: 14
- **Contributors active**: ~10
- **Closed PRs**: 15 (high merge velocity)
- **Open critical bugs**: 2-3
- **New features shipped**: 5+ (observability, tools, providers)

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn **intense post-v2 stabilization** với velocity cao và focus rõ ràng. Team đang balance giữa việc fix critical bugs và ship new features, với ưu tiên đúng đắn cho setup stability. Nếu các issues về Linux installation được resolve trong vài ngày tới, v2 sẽ sẵn sàng cho wider adoption. Hướng đi multi-provider và multi-channel là strategic và phù hợp với xu hướng thị trường.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# 📊 Báo cáo phân tích NullClaw - 25/04/2026

## 🎯 Tóm tắt hôm nay

Dự án NullClaw đang trong giai đoạn phát triển tích cực với 11 PR đang chờ review, tập trung vào việc mở rộng khả năng tùy biến và cải thiện trải nghiệm người dùng. Hoạt động chính xoay quanh việc nâng cấp hệ thống skills, tools customization, và tích hợp Matrix E2EE. Cộng đồng đang gặp một số vấn đề về HTTP requests và hiệu năng gateway trên ARM.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### Xu hướng phát triển chính

**🔧 Hệ thống Tools & Skills (6 PRs)**

- **#836 - Tool Prioritization**: Cơ chế ưu tiên tools dựa trên trigger keywords, tự động inject priority hints vào LLM context
- **#834 + #835 - Tool Customization**: Schema mới cho phép override `system_prompt`, `enabled`, và các thuộc tính tools
- **#837 - External Config**: Hỗ trợ load tool customizations từ file JSON bên ngoài với hybrid merging
- **#840 - Nested Skills**: Cho phép tổ chức skills theo category subdirectories (1 level deep)
- **#831 - Skills RFC 0.2.0**: Nâng cấp lên Agent Skills RFC 0.2.0, hỗ trợ `.well-known/agent-skills/`, SHA256 verification

**🌐 Tích hợp & Giao tiếp (2 PRs)**

- **#838 - Pantalaimon Proxy**: Thêm hỗ trợ E2EE cho Matrix thông qua pantalaimon proxy
- **#844 - A2A Progress Hints**: Forward tool-call progress từ skills sang A2A stream để theo dõi real-time

**⚙️ UX & DevEx (3 PRs)**

- **#841 - `--skill` Flag**: Kích hoạt skill ngay khi khởi động agent
- **#842 - `--workspace` Flag**: Override workspace directory, hữu ích cho multi-instance
- **#843 - Onboard Fix**: Sửa lỗi `KeyWriteFailed` khi config directory không writable (Docker issue)

### Đánh giá kỹ thuật

Tác giả @manelsen đang dẫn dắt roadmap với 11/11 PRs, cho thấy sự tập trung cao vào:
- **Modularity**: Tách biệt config, hỗ trợ external files
- **Flexibility**: Nested structures, override mechanisms
- **Standards compliance**: RFC 0.2.0, SHA256 verification
- **Production readiness**: Multi-workspace, E2EE, progress tracking

## 💬 Điểm nổi bật cộng đồng

### Issue #812 - HTTP Request Bug (CLOSED) 👍 1
- Người dùng từ Picoclaw/ZeroClaw gặp vấn đề với internet search capability
- Đã test tất cả examples nhưng không hoạt động
- **Đã được đóng** sau 7 bình luận, cho thấy team responsive

### Issue #851 - Gateway CPU Pegging (OPEN)
- **Platform-specific**: Raspberry Pi 5 (ARM64) + Debian Trixie
- Gateway process busy-loop trên `accept4()` returning `EAGAIN`, tiêu tốn 100% CPU core
- Vấn đề nghiêm trọng cho edge deployment và IoT use cases
- Chưa có PR fix, cần ưu tiên

## 🐛 Ổn định & Bugs

### Đang xử lý
1. **#843 - KeyWriteFailed**: Fix cho Docker environments khi config dir không writable
2. **#851 - Gateway busy-loop**: Critical performance issue trên ARM architecture

### Đã giải quyết
- **#812 - HTTP requests**: Đã close, có thể liên quan đến config hoặc dependencies

### Rủi ro tiềm ẩn
- 11 PRs đang pending có thể gây merge conflicts nếu không được review kịp thời
- Thiếu automated testing cho ARM platforms (Pi 5 issue)

## ✨ Yêu cầu tính năng

### Đã implement (pending review)
- ✅ Trigger-based tool prioritization
- ✅ External tool customizations file
- ✅ Nested skill directories
- ✅ Matrix E2EE via pantalaimon
- ✅ A2A progress streaming
- ✅ CLI flags cho skill activation và workspace override

### Đang chờ
- Không có feature requests mới trong issues

## 👥 Phản hồi người dùng

### Tích cực
- Người dùng từ Picoclaw/ZeroClaw đánh giá cao tính tổ chức của NullClaw
- Cộng đồng active trong việc report bugs với thông tin chi tiết (strace logs)

### Tiêu cực
- Internet search capability không hoạt động out-of-the-box
- Gateway không stable trên ARM platforms
- Onboarding process gặp vấn đề với Docker setups

### Insights
- Cần cải thiện documentation cho HTTP tools setup
- ARM/edge deployment cần được test kỹ hơn
- Docker-first approach cần được ưu tiên trong testing

## 🗺️ Backlog & Roadmap

### Ưu tiên cao (dựa trên PR activity)
1. **Merge wave 1**: Tool customization stack (#834, #835, #837)
2. **Merge wave 2**: Skills improvements (#831, #840, #841)
3. **Merge wave 3**: Infrastructure (#838, #842, #843, #844)
4. **Critical fix**: Gateway ARM busy-loop (#851)

### Xu hướng dài hạn
- **Standardization**: Tuân thủ Agent Skills RFC, chuẩn hóa APIs
- **Enterprise features**: E2EE, multi-workspace, external configs
- **Developer experience**: CLI improvements, better onboarding
- **Cross-platform**: Cần focus vào ARM/embedded systems

### Khuyến nghị
- Thiết lập CI/CD testing cho ARM64 architecture
- Tạo integration tests cho HTTP tools
- Document Docker best practices
- Consider feature freeze để merge backlog trước khi thêm features mới

---

**📊 Metrics**: 2 issues active | 11 PRs pending | 1 contributor dominant | 0 releases

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo phân tích IronClaw - 25/04/2026

## 🎯 Tóm tắt hôm nay

IronClaw đang trong giai đoạn tái cấu trúc lớn với **Engine V2** và kiến trúc "reborn OS-like". Hoạt động chính tập trung vào việc chuẩn hóa tool schema cho các LLM provider (đặc biệt NEAR AI), sửa lỗi multi-tenant channels, và cải thiện trải nghiệm người dùng qua command palette và secrets management. Có 12 issues mới (8 bugs từ QA bug bash) và 50 PRs đang active, cho thấy nhịp độ phát triển rất cao.

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng có hoạt động staging promotion (#2940) cho môi trường staging.

## 📈 Tiến độ dự án

### 🔥 Các PR quan trọng đang triển khai

**1. Engine V2 & Kiến trúc mới** 
- **#2868** - Engine V2 với `available_actions` callable-only cho blocked providers (XL, 🔴 high activity)
- **#2953** - Feedback về kiến trúc reborn OS-like design, đề xuất cải thiện crate boundaries và service contracts
- Xu hướng: Chuyển từ monolithic sang kiến trúc phân tầng rõ ràng hơn

**2. LLM Provider Integration**
- **#2951** - Fix tool schema shaping cho NEAR AI (XL, critical)
  - Tách riêng provider-safe schema cleanup khỏi strict optional-field rewriting
  - Giải quyết vấn đề NEAR AI từ chối top-level combinators (`oneOf`/`anyOf`/`allOf`)
- **#2463** - Normalize NEAR AI tool schemas (đã đóng, merged vào #2951)
- **#1446** - Thêm hỗ trợ Aliyun Coding Plan với HTTP/1.1 compatibility

**3. Multi-tenant & Channels**
- **#2841** - Multi-tenant channel instances control plane (Phase 1) với DB migration
  - Cho phép nhiều tenant cùng loại channel coexist
  - Thêm bảng `channel_instances` với dispatch-key routing
- **#2927** - Fix `load_startup_active_channels` cho first-run fallback
- **#1549** - Slack Socket Mode cho NAT-friendly connectivity (không cần public URL)

**4. Developer Experience**
- **#2335** - Cmd+K command palette kiểu VS Code cho omnisearch
- **#2754** - Self-service user secrets và durable binding approvals
- **#2899** - Standalone gateway lifecycle commands (`serve`, `start`, `stop`, `status`)
- **#2728** - Engine V2 migrate CLI cho OpenClaw và Hermes

**5. Tool System Refactoring**
- **#2904** - Thay thế 11 WASM API-proxy tools bằng skill-based HTTP declarations
  - Giảm complexity, tăng maintainability
  - Built-in `http` tool xử lý requests với cùng security guarantees
- **#2947** - Fit tool names vào giới hạn 64-char của AWS Bedrock/OpenAI

## 🌟 Điểm nổi bật cộng đồng

### 📢 Issues có nhiều tương tác

**Bug Bash QA Session** - Phát hiện nhiều vấn đề UX/reliability:
- **#2945** - One-time login link trả về "Unauthorized" ngay sau khi tạo (P2)
- **#2944** - Assistant claim success dù extraction/search failed (P2) 
- **#2943** - Response sau tool calls chỉ hiện sau refresh (P2)
- **#2942** - Telegram integration hiện MTProto config thay vì user-friendly flow (P2)

**Staging Environment Issues**:
- **#2939** - Telegram bot ngừng respond sau TEE IronClaw upgrade (happy-owl)
- **#2938** - Routines tab biến mất sau upgrade (fierce-bat)

### 💬 Vấn đề người dùng quan tâm

1. **Installation Issues** (#2949) - Script installer lỗi trên x86_64-unknown-linux-gnu
2. **Config Persistence** (#2946) - `llm_backend` bị reset về `nearai` mỗi lần startup, override cả env vars và config.toml
3. **Minimum Rust Version** (#2898, đã đóng) - README sai, cần Rust 1.91 chứ không phải 1.85

## 🐛 Ổn định & Bugs

### Critical Bugs đang xử lý

**1. LLM Provider Compatibility**
- Tool schema không tương thích với NEAR AI (top-level combinators)
- Negative `max_tokens` overflow (#2668) - đã có fix với structured error handling

**2. Multi-tenant Stability**
- Channel instances không activate đúng sau first-run
- Telegram integration bị break sau upgrade TEE

**3. Auth & Security**
- One-time login links fail ngay lập tức
- Relay callback HMAC mismatch (#2941) - đang debug với fingerprint logging

**4. UX/Streaming Issues**
- Tool call responses không stream real-time, cần refresh
- Assistant false-positive success messages

### Fixes đã merge/đang review

- **#2890** - Fix empty "Fetch available models" cho NEAR AI (relax subdomain check)
- **#1988** - Char-boundary-safe truncation cho MCP tool descriptions
- **#1989** - Fallback to current dir khi shell workdir không tồn tại
- **#2934** - Decouple webhook listener bind từ HTTP channel enablement

## ✨ Yêu cầu tính năng

### Đang triển khai

1. **Command Palette** (#2335) - VS Code-style Cmd+K cho quick actions
2. **User Secrets Management** (#2754) - Self-service CRUD với approval system
3. **Migration Tools** (#2728) - CLI migrate từ OpenClaw/Hermes
4. **Socket Mode** (#1549) - Slack connectivity không cần public URL
5. **Tool Builder Skill** (#2897) - User-authored WASM tools (phase 1)

### Đề xuất từ cộng đồng

- **ClawHub Toggle** (#2727) - `CLAWHUB_ENABLED` flag để disable public registry
- **Slim Build Profile** (#2693) - Default features nhẹ hơn cho local dev
- **PDF Extraction** (#1435) - Thay `pdf-extract` bằng `pdf_oxide` (faster, zero non-Rust deps)

## 📋 Backlog & Roadmap

### Engine V2 Epic (#2767)
Đang trong giai đoạn triển khai với nhiều tasks hoàn thành:
- ✅ Task 4: `available_actions()` callable-only cleanup
- ✅ Task 5: Tool schema normalization
- 🔄 Task 6-8: Streaming, error handling, testing

### Multi-tenant Architecture
- Phase 1: Channel instances control plane (#2841) - đang review
- Phase 2: Per-user tool registry isolation
- Phase 3: Tenant-scoped secrets và credentials

### Developer Experience
- Standalone gateway commands (#2899)
- Improved onboarding với migration detection (#2810)
- Better debugging tools (HMAC diagnostics #2941)

### Documentation
- **#2948** - Thêm Database và Configuration pages vào live navigation
- Cần document PostgreSQL + libSQL dual-backend system (24 migrations, pgvector)

## 🎭 Phản hồi người dùng

### Tích cực
- Đánh giá cao nỗ lực refactor tool system (WASM → skills)
- Command palette được chờ đợi
- Multi-tenant support đáp ứng nhu cầu enterprise

### Tiêu cực / Pain points
- Config persistence không đáng tin cậy (llm_backend reset)
- Installation experience chưa smooth (platform detection issues)
- Documentation gaps lớn (database setup, configuration priority)
- Staging upgrades gây breaking changes cho existing deployments
- QA bug bash phát hiện nhiều UX regressions

### Suggestions
- Cần CI/CD checks tốt hơn trước khi promote staging
- Documentation-first approach cho major features
- Clearer migration paths cho breaking changes

---

**Tổng kết**: IronClaw đang trải qua giai đoạn modernization lớn với Engine V2 và multi-tenant architecture. Mặc dù có nhiều bugs từ QA (đặc biệt auth và streaming), team đang xử lý nhanh với 50 PRs active. Ưu tiên hiện tại là ổn định LLM provider integration và cải thiện developer experience.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo Phân tích LobsterAI - Ngày 25/04/2026

## 🎯 Tóm tắt hôm nay

Ngày 24-25/04 là một ngày hoạt động cực kỳ sôi nổi với **10 PRs được merge** và **2 releases** liên tiếp. Đội ngũ tập trung vào việc tích hợp các mô hình AI mới nhất (DeepSeek V4, Kimi K2.6), cải thiện trải nghiệm người dùng với embedding configuration cho memory search, và sửa nhiều bugs quan trọng liên quan đến skills management và UI consistency.

---

## 🚀 Releases

### **Release 2026.4.24** (Mới nhất)
**Tính năng chính:**
- ✨ **Hỗ trợ mô hình mới**: Thêm DeepSeek V4 Flash và DeepSeek V4 Pro - hai mô hình AI tiên tiến nhất hiện nay
- 🔍 **Cải thiện UX**: Tối ưu search query với whitespace normalization và nút clear trong skills/MCP settings

**Ý nghĩa**: Cho thấy LobsterAI đang theo sát xu hướng AI models mới nhất, đặc biệt là dòng DeepSeek V4 vừa ra mắt gần đây.

### **Release 2026.4.23**
**Điểm nổi bật:**
- 🔐 Sửa lỗi authentication và user profile
- 🛡️ Cải thiện Windows Defender exclusions
- 🎨 Hỗ trợ LM Studio trong model configuration
- 📦 Nhiều cải tiến về installer và update mechanism

---

## 📈 Tiến độ dự án

### **Xu hướng phát triển chính**

#### 1️⃣ **Mở rộng hệ sinh thái AI Models** 
- PR #1812: Tích hợp Kimi K2.6, DeepSeek V4 Flash/Pro
- Chiến lược: Hỗ trợ đa dạng providers để người dùng có nhiều lựa chọn

#### 2️⃣ **Memory & Embedding Infrastructure** 🧠
- PR #1810: Thêm embedding configuration cho memory search
- Hỗ trợ remote providers (OpenAI, Gemini)
- Giữ `memory_search` tool hoạt động ngay cả khi embedding disabled
- **Impact**: Nâng cấp khả năng "trí nhớ" của agent, cho phép tìm kiếm ngữ cảnh thông minh hơn

#### 3️⃣ **Skills Management Overhaul** 🔧
- PR #1815: Sửa lỗi nghiêm trọng về skill discovery paths
- **Vấn đề**: Skills hiển thị trong UI nhưng không available tại runtime
- **Giải pháp**: Đồng bộ discovery roots với runtime paths (`userData/SKILLs`)

#### 4️⃣ **UI/UX Polish** 🎨
- PR #1816: Căn chỉnh width của quick actions với input box
- PR #1814: Khôi phục DiffView cho edit tool
- PR #1811: Cải thiện search experience với trim/normalize
- **Insight**: Đội ngũ đang chú trọng đến consistency và polish trong UI

#### 5️⃣ **Agent Runtime Fixes** 🤖
- PR #1817: Sync session model để agent report đúng model đang dùng
- **Bug**: Khi user đổi model giữa session, agent vẫn đọc tên cũ từ system prompt
- **Fix**: Patch session trước mỗi chat.send

---

## 🔥 Điểm nổi bật cộng đồng

### **Issue #1813: DeepSeek V4 không hoạt động** ⚠️
- **Trạng thái**: OPEN (mới 1 ngày)
- **Vấn đề**: "LLM request failed: provider rejected the request schema or tool payload"
- **Phân tích**: 
  - Có thể do schema mismatch giữa LobsterAI và DeepSeek V4 API
  - Cần kiểm tra tool calling format compatibility
  - Mặc dù PR #1812 đã thêm model, nhưng có thể chưa test kỹ với tool usage

**Khuyến nghị**: Đây là issue ưu tiên cao vì ảnh hưởng đến tính năng mới vừa release

### **Stale Issues được đánh dấu**
- Issue #38: Tiết kiệm tokens và requests
- Issue #41: Playwright skill error
- **Insight**: Bot stale đang hoạt động, nhưng 2 issues này vẫn chưa được giải quyết sau 2 tháng

---

## 🐛 Ổn định & Bugs

### **Bugs đã sửa trong 24h**

| Bug | Mức độ | Giải pháp |
|-----|--------|-----------|
| Skills không available tại runtime | 🔴 Critical | Đồng bộ discovery paths (#1815) |
| Agent report sai model name | 🟡 Medium | Sync session model (#1817) |
| DiffView không render đúng | 🟡 Medium | Fix edits array format (#1814) |
| Search query whitespace issues | 🟢 Low | Normalize và trim (#1811) |

### **Bugs đang mở**
- **DeepSeek V4 compatibility** (#1813): Cần xử lý gấp
- **Playwright skill error** (#41): Mismatch giữa docs và implementation

---

## 💡 Yêu cầu tính năng

### **Từ cộng đồng**
- **Token optimization** (#38): Người dùng quan tâm đến chi phí sử dụng
  - Đề xuất: Caching, prompt compression, streaming optimization

### **Từ roadmap (suy luận từ PRs)**
- ✅ Embedding configuration - **Đã hoàn thành**
- ✅ Multi-provider support - **Đang mở rộng**
- 🔄 Local GGUF embedding - **Đã ẩn trong UI, có thể sẽ deprecated**

---

## 💬 Phản hồi người dùng

### **Tích cực** ✅
- Cộng đồng đánh giá cao việc support models mới nhanh chóng
- UI improvements được chú ý (quick actions alignment, search UX)

### **Tiêu cực** ⚠️
- DeepSeek V4 issue cho thấy có thể thiếu testing trước release
- Stale issues chưa được xử lý tạo cảm giác bị bỏ rơi
- Playwright skill docs không match với code

### **Xu hướng**
- Người dùng muốn **tiết kiệm chi phí** (tokens, requests)
- Quan tâm đến **stability** hơn là features mới
- Cần **documentation** rõ ràng hơn cho skills/MCP

---

## 🗺️ Backlog & Roadmap

### **Ưu tiên cao (suy luận)**
1. 🔴 Fix DeepSeek V4 compatibility (#1813)
2. 🟡 Resolve stale issues (#38, #41)
3. 🟡 Improve testing coverage cho new models
4. 🟢 Documentation update cho skills system

### **Xu hướng phát triển**
- **Short-term**: Stabilization và bug fixes
- **Mid-term**: Token optimization, cost management features
- **Long-term**: Advanced memory/embedding capabilities

### **Dự đoán sprint tiếp theo**
- Hotfix cho DeepSeek V4
- Cleanup stale issues
- Testing infrastructure improvements
- Documentation sprint

---

## 📊 Metrics Tổng quan

- **PRs merged**: 10 (rất cao)
- **Issues mới**: 1
- **Releases**: 2
- **Contributors active**: ~5
- **Velocity**: Rất nhanh (2 releases trong 2 ngày)

**Đánh giá**: Dự án đang trong giai đoạn phát triển tích cực với velocity cao, nhưng cần cân bằng giữa features mới và stability.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo Phân tích Hệ sinh thái Moltis - 25/04/2026

## 🎯 Tóm tắt hôm nay

Ngày 24-25/04 là một trong những ngày hoạt động mạnh nhất của dự án Moltis với **32 PRs được merge** và **7 issues được đóng**. Dự án đang trong giai đoạn cải tiến hạ tầng mạnh mẽ với 3 trục chính: bảo mật (Landlock filesystem isolation, vault security), trải nghiệm người dùng (layered config, smart UI), và mở rộng tích hợp (MCP servers, Home Assistant, Discord patterns).

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng khối lượng merge lớn cho thấy đang chuẩn bị cho một release quan trọng với nhiều breaking changes về cấu trúc config.

---

## 📈 Tiến độ dự án

### 🔐 Bảo mật & Isolation (Ưu tiên cao)

**#866 - Landlock Filesystem Isolation** 
- Triển khai kernel-level FS isolation cho sandbox `restricted-host`
- Graceful degradation khi Landlock không khả dụng (kernel cũ, container)
- Runtime capability probe thông minh
- **Tác động**: Nâng cấp bảo mật đáng kể cho môi trường production

**#867 - Voice API Keys Security Issue** (OPEN)
- Phát hiện lỗ hổng: API keys của ElevenLabs/Whisper được lưu plain text trong `moltis.toml`
- Cần chuyển sang vault storage
- **Mức độ nghiêm trọng**: Cao - ảnh hưởng đến mọi người dùng voice features

### ⚙️ Cấu trúc Config (Breaking Changes)

**#864 - Layered Config System**
- Tách `defaults.toml` (managed) và `moltis.toml` (user overrides only)
- Template mới cho fresh installs chỉ set API keys + project path
- **Tác động**: Breaking change lớn, cần migration guide rõ ràng

**#844 - Default Sub-agent Presets**
- Thêm 7 presets built-in: `research`, `coder`, `reviewer`, `qa`, `ux`, `docs`, `coordinator`
- Session-scoped Modes (inspired by Hermes personalities)
- **Giá trị**: Giảm friction cho người dùng mới, tăng khả năng discover

### 🤖 AI Agent Capabilities

**#840 - MCP Server Management Skill**
- Bundled skill mới cho quản lý MCP servers programmatically
- Post-install recipes cho common patterns (GBrain, GitHub, filesystem)
- **Ý nghĩa**: Agents có thể tự cấu hình tools của mình

**#827 - Home Assistant Integration**
- Native crate mới `moltis-home-assistant`
- REST + WebSocket clients
- AgentTool implementation cho LLM-driven home automation
- **Tiềm năng**: Mở rộng use case sang IoT/smart home

### 🐛 Bug Fixes Quan trọng

**#858/#871 - Heartbeat Re-fire Loop** 
- Critical bug: exec trong heartbeat turn gây infinite loop
- Fix: thêm cooldown check trong `CronService::wake()`
- **Tác động**: Ổn định hệ thống cho production deployments

**#862 - Fireworks AI JSON Schema Compatibility**
- Fix #848: Fireworks reject `null` trong enum arrays
- Provider-specific schema transformation
- **Lesson learned**: Cần abstraction layer tốt hơn cho provider quirks

**#861 - Bundled Skills Script Materialization**
- Scripts của bundled skills (như `maps`) không tồn tại trên disk
- Fix: materialize sidecars từ embedded store
- **Root cause**: Packaging oversight

### 🎨 UX Improvements

**#846 - Smart Auto-scroll** (Fixes #824)
- Không auto-scroll khi user đang đọc history
- "↓ New messages" indicator
- **Feedback**: Highly requested feature

**#839 - Vault Sealed Banner** (Fixes #344)
- Thêm visual notification khi vault sealed
- **Before**: UI trông như broken, model list empty
- **After**: Clear action path cho users

**#303 - Voice Input Modes**
- Push-to-talk (PTT) với configurable hotkey
- VAD continuous listening
- BroadcastChannel tab coordination
- **Complexity**: Đáng chú ý về implementation quality

### 📚 Documentation Overhaul

**#783, #789, #799-802 - AutoDoc Rotisserie**
- Automated audit của 44 docs files
- 50+ rotisserie commits
- Fix P2 issues từ Greptile reviews
- **Phương pháp**: Systematic, tool-assisted documentation maintenance

### 🌐 Platform & Integrations

**#869 - Obscura Browser Backend**
- Lightweight alternative cho Chromium
- Sidecar pattern, zero new Rust deps
- ~30 MB vs Chromium's bulk
- **Trade-off**: Functionality vs footprint

**#865 - Discord Channel Filtering**
- Pattern-based filtering (`ticket-*`)
- Per-pattern model/prompt overrides
- Category allowlist
- **Use case**: Multi-tenant Discord bots

**#745 - Nix Flake Support**
- `nix run github:moltis-org/moltis`
- NixOS configuration integration
- **Community**: Expanding to Nix ecosystem

---

## 💬 Điểm nổi bật cộng đồng

### 🔥 Most Active Discussions

**#176 - Datetime in System Prompt** (18 comments, CLOSED)
- Feature request từ tháng 2, cuối cùng được implement
- Cho phép agents có time awareness
- **Community win**: Long-requested feature delivered

**#470 - Witness Recording + zkperf Integration**
- Tool execution audit trails
- Performance monitoring
- **Innovative**: Blockchain-adjacent approach cho verifiable AI actions

### 🌍 Internationalization

**#339 - Traditional Chinese (zh-TW) Support**
- Full locale support cho Taiwan market
- UI strings, locale detection, language selection
- **Contributor**: @PeterDaveHello
- **Trend**: Growing non-English user base

---

## 🐞 Ổn định & Bugs

### Critical Issues Resolved ✅

1. **Heartbeat infinite loop** (#858) - Production blocker
2. **Fireworks AI compatibility** (#848) - Provider support
3. **Bundled skills execution** (#861) - Core functionality
4. **Vault UX confusion** (#344) - User experience

### Open Security Concerns ⚠️

1. **#867 - Voice API keys in plain text** - Needs immediate attention
2. **#868 - Landlock debug logging** - Observability gap

### Platform-Specific Issues

**#828 - Docker on WSL2** (CLOSED)
- Missing `/sys/class/dmi` causing sandbox failures
- **Resolution**: Likely workaround implemented

---

## ✨ Yêu cầu tính năng

### Implemented This Cycle

- ✅ Datetime context (#176)
- ✅ Smart auto-scroll (#824)
- ✅ MCP server management (#840)
- ✅ Sub-agent presets (#844)
- ✅ Home Assistant integration (#827)

### Proposed/In Progress

- 🔄 **#870 - Bundled Skill Filtering** (CLOSED quickly - likely merged)
  - Whitelist/blacklist với wildcard patterns
  - Category-based filtering
  
- 🔄 **Voice provider security** (#867)
  - Move API keys to vault
  - Encrypted storage

---

## 🗺️ Backlog & Roadmap

### Emerging Patterns

1. **Config System Maturity**
   - Layered defaults → user overrides
   - Preset-driven onboarding
   - Migration path cho existing users

2. **Security Hardening**
   - Landlock isolation
   - Vault-first secrets management
   - Audit trails (witness recording)

3. **Agent Ecosystem**
   - MCP server integration
   - Sub-agent orchestration
   - Skill marketplace foundation

4. **Multi-modal Expansion**
   - Voice (PTT, VAD, continuous)
   - Browser automation (Obscura)
   - Home automation (HA integration)

### Technical Debt Being Addressed

- **Documentation**: Systematic rotisserie audits
- **Provider compatibility**: Schema transformation layer
- **Packaging**: Bundled resource materialization
- **Dependency management**: Crate extraction (`moltis-splitter` #791)

---

## 🎓 Insights & Takeaways

### Strengths

- **Velocity**: 32 PRs merged trong 1-2 ngày cho thấy team coordination tốt
- **Quality**: Comprehensive testing, thoughtful architecture decisions
- **Community**: Responsive to user feedback (voice modes, auto-scroll)
- **Innovation**: Unique features như witness recording, MCP integration

### Challenges

- **Breaking changes**: Layered config cần communication strategy rõ ràng
- **Security debt**: Voice API keys issue tồn tại lâu
- **Complexity**: Feature surface area đang mở rộng nhanh

### Recommendations

1. **Release notes chi tiết** cho layered config migration
2. **Security audit** cho credential storage patterns
3. **Feature flag system** để rollout safer
4. **User onboarding flow** tận dụng new presets

---

**📊 Metrics Summary:**
- 32 PRs merged
- 7 issues closed  
- 3 issues opened
- 0 releases (preparing for major version)
- High contributor activity (@Cstewart-HC, @penso leading)

**🔮 Outlook:** Dự án đang trong giai đoạn "consolidation before expansion" - củng cố nền tảng (config, security, docs) trước khi scale features. Expect một release lớn trong 1-2 tuần tới.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo Phân tích Hệ sinh thái CoPaw - Ngày 25/04/2026

## 1. 🎯 Tóm tắt hôm nay

Dự án CoPaw (QwenPaw) vừa phát hành **v1.1.4** và hotfix **v1.1.4.post1** trong vòng 24 giờ, tập trung vào cải thiện bộ nhớ dài hạn với tokenization hỗ trợ CJK và khắc phục lỗi nghiêm trọng về white screen trên desktop. Cộng đồng đang gặp nhiều vấn đề tương thích với DeepSeek v4 và Anthropic API, đồng thời có nhu cầu mạnh về sandbox bảo mật và cải thiện UX cho kênh IM (DingTalk, Feishu).

---

## 2. 🚀 Releases

### **v1.1.4** (24/04/2026)
Phiên bản chính với nhiều cải tiến lớn:

**🧠 Hệ thống Agent & Memory**
- **Refactor bộ nhớ dài hạn**: Backend pluggable, tự động tóm tắt sau N lượt hội thoại, tự động truy xuất memory
- **Plan Mode**: Chế độ lập kế hoạch có cấu trúc với `/plan`, hiển thị live plan panel trong console
- **Context Management**: Interface quản lý context mới

**🔧 Tính năng khác**
- Cải thiện quản lý model với capability tags và tìm kiếm
- Tối ưu workflow cập nhật built-in skills
- Hỗ trợ async buffered token usage recording

### **v1.1.4.post1** (24/04/2026 - Hotfix)
- **Fix critical**: Thêm CJK-aware query tokenization cho memory search (#3811)
- **Rollback**: Revert Vite v6→v8 upgrade do gây white screen (#3812)

**📌 Ý nghĩa**: Hotfix nhanh chóng cho thấy team phản ứng tốt với bug nghiêm trọng, nhưng cũng phơi bày vấn đề QA trước release.

---

## 3. 📈 Tiến độ dự án

### **Xu hướng phát triển chính**

#### 🔥 **Tích hợp Model & API** (Ưu tiên cao)
- **DeepSeek v4 compatibility**: 4 issues/PRs xử lý lỗi `reasoning_content` không được truyền đúng (#3782, #3788, #3794, #3799)
- **Anthropic API fixes**: Sửa lỗi 400 BadRequestError do format message không hợp lệ (#3489)
- **Volcano Coding Plan**: Yêu cầu hỗ trợ mặc định (#3753)

#### 🎨 **Console UX Improvements**
- **Model Management Modal refactor**: Thay "Auto Discover" bằng danh sách browsable với checkbox (#3819)
- **Agent Statistics**: Di chuyển vào nhóm Workspace (#3754)
- **Sender identity & timestamps**: Hiển thị thông tin người gửi trong lịch sử chat (#3603)

#### 🔒 **Security & Sandbox**
- **File path guardian**: Hỗ trợ Windows path, mặc định disable shell invasion (#3781)
- **Workspace sandbox**: Yêu cầu cơ chế sandbox giống Claude Code (#3814)
- **DingTalk privacy**: Sửa lỗi lộ đường dẫn file local (#3760, #3790)

#### 🤖 **Agent Collaboration**
- **Async agent communication**: Yêu cầu giao tiếp bất đồng bộ, có callback (#2225)
- **Semantic skill routing**: Dùng embedding để lọc skills trước khi inject vào context (#3117)

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác**

1. **#3753** (7 comments) - "Khi nào hỗ trợ Volcano Coding Plan mặc định?"
   - Nhu cầu tích hợp với nền tảng Trung Quốc

2. **#3702** (4 comments) - "Skill pool liên tục báo lỗi"
   - Vấn đề ổn định của tính năng core

3. **#3782** (4 comments) - DeepSeek v4 reasoning_content bug
   - Ảnh hưởng đến nhiều người dùng sử dụng DeepSeek

### **Vấn đề người dùng quan tâm nhất**

🔴 **White screen trên Desktop v1.1.4** (#3815, #3806, #3807, #3805)
- 4 issues tương tự trong 1 ngày
- Ảnh hưởng nghiêm trọng đến trải nghiệm Windows/macOS
- Đã được hotfix trong v1.1.4.post1

🟡 **Tương thích model**
- DeepSeek v4 thinking mode
- Anthropic API format
- Custom provider headers (#3796)

---

## 5. 🐛 Ổn định & Bugs

### **Bugs đã fix (Closed)**

✅ **Critical**
- White screen desktop (#3815, #3806, #3807) → Revert Vite upgrade
- DeepSeek reasoning_content (#3782, #3788, #3794, #3799) → Thêm empty thinking content
- Anthropic invalid message format (#3489) → Normalize message structure
- DingTalk file path exposure (#3760, #3790) → Remove placeholder text

✅ **Medium**
- Built-in tool icon null (#3758) → Normalize missing icons
- Agent stats không refresh (#3743) → Thêm agent_id vào useEffect
- Send_file_to_user với non-ASCII chars (#3625) → Percent-encode URL

### **Bugs đang xử lý (Open)**

🔴 **High Priority**
- Skill pool liên tục lỗi (#3702)
- 422 MODEL_EXECUTION_FAILED thường xuyên (#3795)
- macOS Dock icon thành Python 3.10 khi bật MCP (#3808)
- Shell thiếu node symlink, mất sau update (#3809)

🟡 **Medium Priority**
- Vector model config bị reset sau restart (#3817)
- Cài đặt script lỗi Python exception (#3818)
- Hyperlink `file://` không mở được trên macOS Desktop (#3816)

---

## 6. 💡 Yêu cầu tính năng

### **Tính năng được đề xuất nhiều**

1. **Proactive message custom channels** (#3804)
   - Gửi proactive message đến Feishu/DingTalk thay vì chỉ Console

2. **Markdown rendering cho user input** (#2975, #3802)
   - Render input của user giống như AI response

3. **Feishu interactive approval cards** (#3800)
   - Thẻ phê duyệt tương tác cho workflow

4. **Auto-adapt context length** (#3801)
   - Model tự điều chỉnh context thay vì giới hạn cứng

5. **Custom HTTP headers cho providers** (#3796)
   - Hỗ trợ API trung gian cần headers đặc biệt

6. **Discord thread creation trước dispatch** (#3525)
   - Cô lập output của cron job vào thread riêng

### **Tính năng đang phát triển (Open PRs)**

- **Tauri 2.x desktop app** (#3813) - Thay thế Electrobun
- **Scope-aware model routing** (#3550) - Routing model theo scope
- **Semantic skill routing** (#3117) - Lọc skills bằng embedding

---

## 7. 👥 Phản hồi người dùng

### **Trải nghiệm tích cực** ✨
- Plan Mode được đánh giá cao
- Memory refactor cải thiện khả năng ghi nhớ
- Hotfix nhanh cho white screen bug

### **Điểm đau chính** 😓

1. **Ổn định Desktop app**
   - White screen sau update
   - Icon bị đổi khi dùng MCP
   - Symlink bị mất

2. **Tương thích Model**
   - DeepSeek v4 thinking mode
   - Anthropic API format
   - Custom provider cần headers

3. **UX trên IM channels**
   - File path bị lộ
   - Thiếu interactive cards
   - Không tùy chỉnh được format

4. **Security concerns**
   - Cần workspace sandbox
   - File path guardian chưa đủ mạnh
   - Shell command cần kiểm soát chặt hơn

### **Feedback từ first-time contributors**
- 4 PRs từ contributors mới (#3813, #3793, #3553, #3779)
- Cho thấy dự án đang thu hút được cộng đồng

---

## 8. 📋 Backlog & Roadmap

### **Đang trong pipeline (Under Review)**

🔄 **High Priority**
- Discord thread creation (#3525)
- Scope-aware routing (#3550)
- SSE crash fix (#3553)
- Semantic skill routing (#3117)

🔄 **Medium Priority**
- Sender info display (#3603)
- Agent Statistics reorganization (#3754)
- Tauri desktop app (#3813)

### **Roadmap suy đoán từ trends**

**Q2 2026 (Ngắn hạn)**
1. Ổn định Desktop app (macOS/Windows)
2. Hoàn thiện DeepSeek v4 & Anthropic compatibility
3. Cải thiện security với workspace sandbox
4. Tối ưu UX cho IM channels (DingTalk/Feishu)

**Q3 2026 (Trung hạn)**
1. Semantic skill routing production-ready
2. Async agent collaboration
3. Advanced memory management với RAG
4. Multi-model routing optimization

**Dài hạn**
- Enterprise features (audit, compliance)
- Advanced agent orchestration
- Plugin ecosystem expansion

---

## 📊 Thống kê tổng quan

- **Issues mới**: 10 (trong đó 7 đã đóng)
- **PRs mới**: 15 (trong đó 13 đã merge)
- **Contributors mới**: 4 first-time contributors
- **Releases**: 2 (v1.1.4 + hotfix)
- **Vấn đề nóng nhất**: White screen bug (4 issues)
- **Tính năng được yêu cầu nhiều nhất**: Workspace sandbox, IM channel improvements

---

## 🎯 Kết luận

CoPaw đang trong giai đoạn phát triển nhanh với **2 releases trong 1 ngày**, cho thấy team phản ứng tốt với bugs nhưng cũng cần cải thiện QA. Dự án đang tập trung vào **3 trụ cột chính**: (1) Tương thích model/API, (2) Bảo mật & sandbox, (3) UX cho enterprise users. Cộng đồng đang phát triển tích cực với nhiều contributors mới và feedback chất lượng.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# 📊 Báo cáo phân tích ZeptoClaw - 25/04/2026

## 🎯 Tóm tắt hôm nay

Dự án ZeptoClaw đang trong giai đoạn phát triển tính năng tích hợp mới với Nanodio. Hoạt động chính tập trung vào việc thiết kế kiến trúc cho kênh Feishu/Lark native, cho phép xử lý tin nhắn thông qua subprocess worker thay vì embedding trực tiếp. Đây là bước đầu tiên trong việc mở rộng khả năng tích hợp của ZeptoClaw với các nền tảng messaging.

---

## 🚀 Releases

Không có release mới trong ngày hôm nay.

---

## 📈 Tiến độ dự án

### Issues đang mở

**#546 - Tích hợp Feishu long-connection với Nanodio subprocess** 🆕
- **Tác giả**: @CangWolf17
- **Trạng thái**: Mới tạo (24/04), chưa có tương tác
- **Mục tiêu**: Implement V1 local host path cho Nanodio bên trong ZeptoClaw
- **Kiến trúc đề xuất**:
  - Sử dụng native Lark channel với flag `feishu=true`
  - Forward inbound messages đến supervised local subprocess worker
  - Tách biệt Nanodio khỏi in-process để tăng tính ổn định và khả năng scale

**Xu hướng phát triển**:
- Dự án đang chuyển hướng sang kiến trúc microservices/subprocess để xử lý messaging
- Tập trung vào tích hợp với nền tảng Feishu/Lark (phổ biến tại thị trường Trung Quốc)
- Ưu tiên tính modular và khả năng mở rộng

---

## 💬 Điểm nổi bật cộng đồng

Hoạt động cộng đồng khá yên tĩnh trong ngày hôm nay:
- Issue #546 chưa nhận được phản hồi hoặc reaction nào
- Chưa có discussion hoặc debate về hướng đi kỹ thuật
- Có thể đây là giai đoạn đầu của sprint mới hoặc team đang trong quá trình planning

---

## 🐛 Ổn định & Bugs

Không có bug reports hoặc issues liên quan đến stability được báo cáo trong 24h qua.

**Đánh giá**: Dự án đang trong trạng thái ổn định, tập trung vào feature development thay vì bug fixing.

---

## ✨ Yêu cầu tính năng

### Feature request chính: Tích hợp Nanodio-Feishu (#546)

**Scope kỹ thuật**:
- Native Lark/Feishu long-connection host path
- Minimal subprocess supervision layer
- Message forwarding mechanism
- Local development workflow

**Ý nghĩa chiến lược**:
- Mở rộng khả năng tích hợp với các nền tảng messaging châu Á
- Cải thiện architecture để hỗ trợ multiple channels
- Tăng reliability thông qua process isolation

---

## 👥 Phản hồi người dùng

Chưa có feedback từ người dùng trong ngày hôm nay. Issue #546 là technical proposal từ contributor, chưa có user-facing impact.

---

## 🗺️ Backlog & Roadmap

### Ưu tiên hiện tại
1. **V1 Nanodio-Feishu integration** - Đang trong giai đoạn proposal/design
2. Subprocess worker architecture - Foundation cho các tích hợp tương lai

### Dự đoán roadmap
- **Short-term**: Hoàn thiện implementation cho Feishu channel
- **Mid-term**: Mở rộng sang các messaging platforms khác (Slack, Discord, etc.)
- **Long-term**: Xây dựng plugin ecosystem cho AI agent integrations

---

## 📌 Kết luận

ZeptoClaw đang trong giai đoạn phát triển tính năng chiến lược với focus vào messaging platform integrations. Hoạt động trong ngày khá nhẹ nhàng với chỉ 1 issue mới, cho thấy team có thể đang trong planning phase hoặc đang làm việc offline. Hướng đi về subprocess architecture là một quyết định kỹ thuật đúng đắn để đảm bảo scalability và stability cho tương lai.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*