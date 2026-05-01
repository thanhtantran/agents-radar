# Bản tin Hệ sinh thái OpenClaw 2026-05-01

> Issues: 262 | PRs: 500 | Dự án: 13 | Thời gian tạo: 2026-05-01 02:00 UTC

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

# Báo cáo Phân tích OpenClaw - Ngày 2026-05-01

## 📊 Tóm tắt hôm nay

Ngày 01/05/2026 chứng kiến hoạt động phát triển mạnh mẽ với **30 PRs mới** và nhiều issues quan trọng được cập nhật. Trọng tâm là **cải thiện ổn định hệ thống** (xử lý zombie processes, memory leaks, event loop blocking) và **hoàn thiện trải nghiệm đa kênh** (Telegram, Discord, WhatsApp). Đáng chú ý là các vấn đề về **plugin runtime dependencies** và **context compaction** đang được giải quyết tích cực.

---

## 🚀 Releases

### v2026.4.29 (Phát hành 30/04, ảnh hưởng đến 01/05)

**Điểm nổi bật:**

- **🤖 Messaging & Automation nâng cao:**
  - Active-run steering mặc định
  - Visible-reply enforcement
  - Metadata định tuyến cho spawned subagents
  - Follow-up commitments cho heartbeat reminders

- **🧠 Memory System cải tiến:**
  - People-aware wiki với provenance views
  - Active Memory filters theo conversation
  - Partial recall khi timeout
  - REM preview diagnostics có giới hạn

**Ý nghĩa:** Release này tập trung vào **khả năng tự động hóa thông minh** và **quản lý bộ nhớ ngữ cảnh**, giúp agents hoạt động hiệu quả hơn trong các cuộc hội thoại dài và phức tạp.

---

## 🔧 Tiến độ dự án

### PRs quan trọng đang active:

#### 🔴 Critical Fixes (Ưu tiên cao)

1. **#75330 - Gateway event loop blocked** (4 comments, 3 👍)
   - **Vấn đề:** Event loop bị block tới 32s trong agent prep, API requests bị treo
   - **Tác động:** Ảnh hưởng trực tiếp đến trải nghiệm người dùng
   - **Trạng thái:** Đang điều tra, chưa có PR fix

2. **#73306 - Active Memory plugin timeout** (11 comments, 2 👍)
   - **Vấn đề:** Plugin timeout 15s mỗi lần chạy, trả về 0 chars
   - **Xu hướng:** Vấn đề tái phát từ v2026.4.25
   - **Liên quan:** #68825, #66708, #66157, #65159

3. **#74963 - Plugin runtime-deps hash mismatch** (3 comments, 1 👍)
   - **Vấn đề:** Multi-instance trên Windows gặp ENOENT với bundled channels
   - **PR fix:** #75048 (CLOSED), #74950 (OPEN)
   - **Tiến độ:** Đang xử lý edge cases với legacy lock files

#### 🟡 Feature Development

1. **#75356 - Prevent webchat sends into heartbeat sessions** (PR mới)
   - Ngăn user gửi message vào isolated heartbeat sessions
   - Cải thiện UX cho Control UI

2. **#75326 - Keep models list responsive** (PR mới, maintainer)
   - Tối ưu hiệu năng catalog discovery
   - Giảm độ trễ cho CLI/UI control-plane calls

3. **#74411 - Agent download actions** (PR size M)
   - Thêm download helpers cho browser tool
   - Cho phép agents tương tác với browser downloads

#### 🟢 Quality & Stability

1. **#75284 - Trim trailing assistant turns** (PR mới)
   - Fix #75271: Xử lý sessions kết thúc bằng assistant message
   - Tránh lỗi 400 từ Anthropic API

2. **#75172 - Guard undefined channelLogs** (PR mới)
   - Fix #75168: Race condition trong channel lifecycle
   - Cải thiện stability cho config-reload

3. **#72480 - Honor env proxy for provider fetch** (PR size S)
   - Hỗ trợ proxy environment variables
   - Quan trọng cho enterprise deployments

---

## 🌟 Điểm nổi bật cộng đồng

### Top Issues theo engagement:

1. **#9443 - Prebuilt Android APK releases** (22 comments, 1 👍)
   - **Nhu cầu:** User muốn APK prebuilt thay vì phải build từ source
   - **Tình trạng:** OPEN từ 05/02, vẫn đang thảo luận
   - **Ý nghĩa:** Quan trọng cho mobile adoption

2. **#51857 - The Blind Spot Problem** (8 comments)
   - **Vấn đề:** Agent không "nhìn thấy" những gì user gửi (media/vision failures)
   - **Tác động:** Ảnh hưởng đến tin cậy của hệ thống
   - **Trạng thái:** Driftnet đang tracking cluster này

3. **#39476 - A2A sessions_send duplicate messages** (8 comments)
   - **Vấn đề:** Agent B có thể gọi lại Agent A, gây duplicate messages
   - **Phức tạp:** Liên quan đến multi-agent coordination
   - **Trạng thái:** OPEN từ 08/03

---

## 🐛 Ổn định & Bugs

### Vấn đề nghiêm trọng:

#### 🔥 Performance & Stability

1. **Event Loop Blocking (#75330)**
   - Max delay: 32s
   - CPU utilization: 100%
   - Môi trường: CachyOS (Arch Linux), Node v25.9.0
   - **Root cause:** Agent preparation blocking main thread

2. **Zombie Processes (#68691)**
   - Sandbox sessions tích lũy zombie processes
   - PPID = 1 nhưng không được reap
   - Nguy cơ: Đạt `pids.max` limit
   - **PR fix:** #74787 (acpx process reaper)

3. **Memory Plugin Timeout (#73306)**
   - Timeout 15s mỗi lần
   - 0 chars output
   - Regression từ v2026.4.25

#### ⚠️ Channel-specific Issues

1. **Telegram (#71066, #61012)**
   - getUpdates polling không hoạt động
   - Multi-bot routing không respect default account
   - **Tác động:** Missed messages, routing confusion

2. **WhatsApp (#70856)**
   - Listener disconnect/stall trên Windows
   - "No active WhatsApp Web listener"
   - **Regression** từ v2026.4.15

3. **Discord (#75338)**
   - Rate limit retries cần hardening
   - PR fix đang được merge (maintainer)

#### 🔧 Platform-specific

1. **Windows (#72208, #70857)**
   - Startup hang khi LiteLLM/OpenRouter timeout
   - Session lock held 191s
   - Dashboard inaccessible, Ctrl+C không exit

2. **ARM64/Raspberry Pi (#61137)**
   - Intermittent JSON parse errors
   - Error positions vary: 1144, 1383, 1692, 2...

---

## 💡 Yêu cầu tính năng

### Được cộng đồng quan tâm:

1. **#71195 - OpenAI Realtime cho macOS Talk Mode** (5 comments)
   - **Mục tiêu:** Giảm latency từ 1.7-4.9s xuống sub-second
   - **Phương pháp:** Sử dụng gpt-realtime như voice-call plugin
   - **Trạng thái:** OPEN, đang thiết kế

2. **#71058 - Multiple Azure/Teams bots** (4 comments, 1 👍)
   - **Nhu cầu:** Hỗ trợ nhiều Teams bots trên 1 gateway
   - **Hiện tại:** Chỉ 1 Azure App Registration
   - **Use case:** Enterprise multi-tenant

3. **#45758 - YAML config support** (6 comments, 1 👍)
   - **Lý do:** YAML phổ biến hơn JSON5 trong DevOps
   - **Lợi ích:** Readability, comments, multi-line strings
   - **Trạng thái:** OPEN từ 14/03

4. **#19075 - Brave Search baseUrl option** (5 comments, 2 👍)
   - **Nhu cầu:** Self-hosted/enterprise deployments
   - **Precedent:** Perplexity provider đã có baseUrl
   - **Trạng thái:** OPEN từ 17/02

5. **#12855 - Built-in auto-update** (5 comments)
   - **Tính năng:** Configurable schedule, confirmation, notifications
   - **Hiện tại:** Chỉ có primitives cơ bản
   - **Trạng thái:** OPEN từ 09/02

---

## 💬 Phản hồi người dùng

### Trải nghiệm tích cực:

- **Multi-agent coordination:** Users đánh giá cao khả năng A2A messaging, mặc dù còn issues về duplicate messages
- **Memory system:** Provenance views và people-aware wiki được đón nhận tốt
- **Plugin ecosystem:** Cộng đồng tích cực đóng góp plugins mới

### Pain points:

1. **Stability regressions:**
   - "Jesus.... you can't do a release without breaking anything eh?" (#48947)
   - Frustration về breaking changes giữa các versions

2. **Documentation gaps:**
   - WhatsApp 408 disconnect cần runbook (#72262)
   - LSP setup trên Windows thiếu hướng dẫn

3. **Enterprise readiness:**
   - Proxy support chưa đầy đủ (#72480)
   - Multi-instance deployments gặp nhiều issues (#74963, #51363)

4. **Mobile experience:**
   - Android onboarding stuck khi operator offline (#61005)
   - Thiếu prebuilt APKs (#9443)

---

## 📋 Backlog & Roadmap

### Ưu tiên ngắn hạn (dựa trên activity):

1. **🔴 Critical Stability Fixes**
   - Event loop blocking (#75330)
   - Memory plugin timeout (#73306)
   - Zombie process reaping (#68691)

2. **🟡 Channel Reliability**
   - Telegram polling fix (#71066)
   - WhatsApp Windows stability (#70856)
   - Discord rate limit hardening (#75338)

3. **🟢 Developer Experience**
   - Plugin runtime-deps robustness (#74963, #75048)
   - LSP Windows support (#75343)
   - Config audit secret redaction (#75095)

### Xu hướng phát triển:

- **Multi-agent orchestration:** Tiếp tục cải thiện A2A coordination, token cost optimization (#72629)
- **Enterprise features:** Proxy support, multi-tenant, audit logging
- **Mobile-first:** Android stability, iOS support (future)
- **Performance:** Event loop optimization, memory efficiency, context compaction quality

### Khoảng trống cần lấp:

- **Testing infrastructure:** Nhiều regressions cho thấy test coverage chưa đủ
- **Platform parity:** Windows/ARM64 còn nhiều issues so với Linux x64
- **Documentation:** Troubleshooting runbooks, deployment guides
- **Monitoring:** Better observability cho production deployments

---

## 🎯 Kết luận

OpenClaw đang trong giai đoạn **consolidation** sau các tính năng lớn. Team tập trung vào:
- ✅ Stability & reliability
- ✅ Cross-platform support
- ✅ Enterprise readiness
- ✅ Developer experience

Cộng đồng active và engaged, nhưng cần cải thiện **quality assurance** và **documentation** để giảm frustration từ breaking changes.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 01/05/2026

## 1. 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **bùng nổ phát triển** với 12 dự án được theo dõi, tổng cộng **262 issues** và **500+ PRs** đang hoạt động. Các dự án đang hội tụ quanh một số trục chính:

- **Multi-channel integration**: Telegram, Discord, WhatsApp, WeChat, Feishu
- **Provider ecosystem**: OpenAI, Anthropic, DeepSeek, Gemini, local models
- **Security & observability**: OpenTelemetry, approval flows, sandboxing
- **Developer experience**: Plugin systems, SDKs, configuration management

Đáng chú ý là sự phân hóa rõ rệt giữa các dự án **enterprise-focused** (OpenClaw, IronClaw) và **developer-friendly** (NanoBot, PicoClaw, Moltis).

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ trưởng thành | Focus chính |
|-------|--------|-----|----------|---------------|---------------------|-------------|
| **OpenClaw** | 262 | 500 | 5 | 🔥🔥🔥 Rất cao | ⭐⭐⭐⭐ Mature | Enterprise stability |
| **NanoBot** | 15 | 27 | 0 | 🔥🔥🔥 Rất cao | ⭐⭐⭐ Growing | Hook system, multi-agent |
| **Zeroclaw** | 27 | 50 | 0 | 🔥🔥 Cao | ⭐⭐⭐ Growing | Web UI, i18n, channels |
| **PicoClaw** | 37 | 38 | 2 | 🔥🔥 Cao | ⭐⭐⭐ Growing | MCP, embedded devices |
| **NanoClaw** | 8 | 46 | 0 | 🔥🔥🔥 Rất cao | ⭐⭐⭐ Growing | Security, multi-channel |
| **NullClaw** | 0 | 10 | 0 | 🔥 Trung bình | ⭐⭐ Early | Tool customization, Zig |
| **IronClaw** | 19 | 38 | 0 | 🔥🔥 Cao | ⭐⭐⭐ Growing | Reborn architecture |
| **LobsterAI** | 1 | 21 | 0 | 🔥🔥 Cao | ⭐⭐⭐ Growing | Cowork, Chinese market |
| **Moltis** | 10 | 21 | 1 | 🔥🔥🔥 Rất cao | ⭐⭐⭐⭐ Mature | Multi-provider, UX |
| **CoPaw** | 37 | 16 | 1 | 🔥🔥 Cao | ⭐⭐⭐ Growing | WeChat/Feishu, China |
| **TinyClaw** | 0 | 0 | 0 | ❄️ Không hoạt động | ⭐ Dormant | N/A |
| **EasyClaw** | 0 | 0 | 1 | 🔥 Thấp | ⭐⭐ Early | macOS distribution |

### Chỉ số tổng hợp:

- **Tổng issues**: 453
- **Tổng PRs**: 767
- **Tổng releases**: 10
- **Dự án hoạt động tích cực**: 10/12 (83%)
- **Velocity trung bình**: ~64 PRs/dự án

---

## 3. 🎯 Vị thế của OpenClaw

### Vị trí trong hệ sinh thái:

**OpenClaw là "elder statesman"** của hệ sinh thái với:

✅ **Ưu điểm vượt trội:**
- Số lượng issues/PRs lớn nhất (262/500) → Cộng đồng đông đảo nhất
- 5 releases chính thức → Mature release cycle
- Focus vào **enterprise stability** và **production readiness**
- Hệ thống memory phức tạp (people-aware wiki, provenance views)
- Multi-agent coordination (A2A messaging)

⚠️ **Thách thức:**
- **Regression issues**: Nhiều breaking changes giữa các versions
- **Platform parity**: Windows/ARM64 còn nhiều vấn đề
- **Event loop blocking**: Performance issues nghiêm trọng (#75330)
- **Documentation gaps**: Thiếu runbooks cho troubleshooting

### So sánh với competitors:

| Tiêu chí | OpenClaw | NanoBot | Moltis | IronClaw |
|----------|----------|---------|--------|----------|
| **Maturity** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Enterprise focus** | ✅ Cao | ⚠️ Trung bình | ✅ Cao | ✅ Cao |
| **Developer UX** | ⚠️ Phức tạp | ✅ Tốt | ✅ Xuất sắc | ⚠️ Đang rebuild |
| **Stability** | ⚠️ Regressions | ✅ Ổn định | ✅ Ổn định | 🔄 Refactoring |
| **Community size** | ✅ Lớn nhất | ⚠️ Trung bình | ✅ Lớn | ⚠️ Nhỏ |

### Chiến lược đề xuất cho OpenClaw:

1. **Ngắn hạn**: Ưu tiên fix critical bugs (event loop, memory timeout, zombie processes)
2. **Trung hạn**: Cải thiện test coverage để giảm regressions
3. **Dài hạn**: Đầu tư vào documentation và developer experience

---

## 4. 🔧 Hướng kỹ thuật chung

### Xu hướng được nhiều dự án áp dụng:

#### **1. Multi-Channel Architecture** 🌐
- **Adoption**: 9/12 dự án (75%)
- **Channels phổ biến**: Telegram (8), Discord (6), WeChat (5), Feishu (4), WhatsApp (4)
- **Pattern**: Channel adapters với unified message interface
- **Challenge**: Protocol changes (WhatsApp Web bump tháng 4/2026)

**Dự án dẫn đầu**: OpenClaw, Zeroclaw, NanoClaw

#### **2. Provider Abstraction Layer** 🤖
- **Adoption**: 10/12 dự án (83%)
- **Providers**: OpenAI, Anthropic, DeepSeek, Gemini, local models
- **Pattern**: OpenAI-compatible API wrappers
- **Trend**: Reasoning models (DeepSeek R1, OpenAI o-series)

**Dự án dẫn đầu**: Moltis (9 providers), OpenClaw (8 providers)

#### **3. Observability & Tracing** 📊
- **Adoption**: 5/12 dự án (42%)
- **Tools**: OpenTelemetry, Langfuse, LangSmith
- **Pattern**: Trace agent loops, LLM calls, tool executions
- **Benefit**: Production debugging, cost tracking

**Dự án dẫn đầu**: NanoBot (#3173), Zeroclaw (#6190), IronClaw (#3131)

#### **4. Security & Sandboxing** 🔒
- **Adoption**: 7/12 dự án (58%)
- **Approaches**: 
  - Container isolation (NanoClaw, NullClaw)
  - Approval flows (OpenClaw, Zeroclaw)
  - Risk classification (NullClaw 3-tier)
- **Vulnerabilities fixed**: Command injection, path traversal

**Dự án dẫn đầu**: NanoClaw (container hardening), NullClaw (risk tiers)

#### **5. Plugin/Extension Systems** 🔌
- **Adoption**: 8/12 dự án (67%)
- **Patterns**:
  - Hook systems (NanoBot #3564)
  - MCP protocol (PicoClaw, OpenClaw)
  - Skill marketplaces (NullClaw Agent Skills RFC)
- **Benefit**: Third-party ecosystem growth

**Dự án dẫn đầu**: NanoBot (typed-event hooks), PicoClaw (MCP CLI)

---

## 5. 🎨 Điểm khác biệt

### **Chiến lược phân hóa:**

#### **OpenClaw - "Enterprise Workhorse"**
- **Unique**: Memory system phức tạp nhất (people-aware wiki, provenance)
- **Strength**: Multi-agent coordination (A2A messaging)
- **Weakness**: Complexity cao, regressions nhiều
- **Target**: Large teams, complex workflows

#### **Moltis - "Developer Delight"**
- **Unique**: UX xuất sắc (auto-titles, message actions, slash commands)
- **Strength**: Velocity cao (21 PRs/day), polish tốt
- **Weakness**: Chưa có multi-agent orchestration
- **Target**: Individual developers, rapid prototyping

#### **NanoBot - "Extensibility Champion"**
- **Unique**: Hook system với plugin distribution
- **Strength**: Modularity, third-party friendly
- **Weakness**: Documentation chưa đủ
- **Target**: Plugin developers, customization needs

#### **PicoClaw - "Embedded Specialist"**
- **Unique**: Focus vào embedded devices (Raspberry Pi)
- **Strength**: MCP integration, resource efficiency
- **Weakness**: Stability issues (session race, PID check)
- **Target**: IoT, edge computing

#### **IronClaw - "Architecture Visionary"**
- **Unique**: Reborn architecture với substrate pattern
- **Strength**: Safety-first design, modular
- **Weakness**: Đang trong giai đoạn refactoring lớn
- **Target**: Long-term platform builders

#### **CoPaw/LobsterAI - "China Market Leaders"**
- **Unique**: Deep integration với WeChat/Feishu/WeCom
- **Strength**: Hiểu rõ Chinese market needs
- **Weakness**: Platform-specific issues (event loops)
- **Target**: Chinese enterprises

---

## 6. 👥 Mức độ trưởng thành cộng đồng

### **Tier 1: Mature Communities** ⭐⭐⭐⭐

**OpenClaw**
- ✅ 262 issues, 500 PRs → Cộng đồng lớn nhất
- ✅ Active discussions (22 comments trên #9443)
- ⚠️ Frustration về breaking changes
- 📊 **Health score**: 8/10

**Moltis**
- ✅ Fast response time (bugs fixed trong 24h)
- ✅ Multiple contributors (penso, gaarf, Cstewart-HC)
- ✅ Automation tốt (dependabot, CI)
- 📊 **Health score**: 9/10

### **Tier 2: Growing Communities** ⭐⭐⭐

**NanoBot**
- ✅ 27 PRs trong 1 ngày → Velocity cao
- ✅ Multi-language support (Chinese, English)
- ⚠️ Security concerns chưa được giải quyết (#979)
- 📊 **Health score**: 7/10

**Zeroclaw**
- ✅ 50 PRs, focus vào i18n
- ✅ RFC process (multi-agent UX #5890)
- ⚠️ Nhiều S1 bugs chưa resolve
- 📊 **Health score**: 7/10

**PicoClaw**
- ✅ 38 PRs, 2 releases trong 24h
- ✅ Strong MCP focus
- ⚠️ Critical bugs (session race, PID check)
- 📊 **Health score**: 6/10

**CoPaw**
- ✅ Fast bug fix velocity
- ✅ Chinese market expertise
- ⚠️ WeChat stability issues
- 📊 **Health score**: 7/10

### **Tier 3: Early Stage** ⭐⭐

**NullClaw**
- ⚠️ Không có community engagement (0 reactions)
- ✅ Technical quality cao (Zig, 3-tier security)
- ⚠️ Có thể đang phát triển nội bộ
- 📊 **Health score**: 5/10

**EasyClaw**
- ⚠️ Không có issues/PRs trong 24h
- ✅ Documentation tốt (song ngữ)
- ⚠️ Chưa có community traction
- 📊 **Health score**: 4/10

### **Tier 4: Dormant** ⭐

**TinyClaw**
- ❌ Không có hoạt động
- 📊 **Health score**: 0/10

---

## 7. 🔮 Tín hiệu xu hướng

### **Xu hướng đang nổi lên:**

#### **1. Multi-Agent Orchestration** 🤝
- **Signal strength**: 🔥🔥🔥 Mạnh
- **Evidence**:
  - OpenClaw: A2A messaging, token cost optimization
  - NanoBot: Mailbox channel (#3461)
  - Zeroclaw: Multi-agent UX RFC (#5890)
  - Moltis: Team feature request (#3987)
- **Prediction**: Sẽ trở thành **standard feature** trong Q3 2026

#### **2. Reasoning Model Support** 🧠
- **Signal strength**: 🔥🔥🔥 Mạnh
- **Evidence**:
  - DeepSeek R1 integration (6 dự án)
  - OpenAI o-series support
  - Reasoning content handling issues (#3985, #3554)
- **Prediction**: Reasoning models sẽ chiếm **>30% usage** vào cuối 2026

#### **3. Observability-First Design** 📈
- **Signal strength**: 🔥🔥 Trung bình-Cao
- **Evidence**:
  - OpenTelemetry adoption tăng (NanoBot, Zeroclaw, IronClaw)
  - Trace commons, audit trails
  - Cost tracking, usage telemetry
- **Prediction**: Trở thành **requirement** cho enterprise deployments

#### **4. Security Hardening** 🔐
- **Signal strength**: 🔥🔥 Trung bình-Cao
- **Evidence**:
  - Multiple vulnerabilities fixed (command injection, path traversal)
  - Approval flows, risk classification
  - Container isolation improvements
- **Prediction**: Security sẽ là **differentiator** chính trong 2026

#### **5. Developer Experience Focus** 🎨
- **Signal strength**: 🔥🔥🔥 Mạnh
- **Evidence**:
  - Moltis: Slash commands, auto-titles, message actions
  - NanoBot: Hook plugins, external configs
  - PicoClaw: MCP CLI commands
- **Prediction**: UX sẽ quyết định **adoption rate** hơn là features

#### **6. Chinese Market Expansion** 🇨🇳
- **Signal strength**: 🔥🔥 Trung bình-Cao
- **Evidence**:
  - WeChat/Feishu integration (6 dự án)
  - Chinese localization (Zeroclaw, LobsterAI, CoPaw)
  - Aliyun support proposals
- **Prediction**: Chinese market sẽ chiếm **>40% users** vào 2027

### **Xu hướng đang suy giảm:**

#### **1. Monolithic Architectures** ❌
- Các dự án đang chuyển sang modular/plugin-based
- IronClaw Reborn, NanoBot hooks, PicoClaw MCP

#### **2. Single-Provider Lock-in** ❌
- Tất cả dự án đều hỗ trợ multiple providers
- Trend: Provider-agnostic abstractions

#### **3. CLI-Only Interfaces** ❌
- Web dashboards trở thành standard (Zeroclaw, Moltis, CoPaw)
- Hybrid CLI + Web UI

---

## 8. 🎯 Kết luận & Khuyến nghị

### **Bức tranh tổng thể:**

Hệ sinh thái AI agent đang trong **golden age** với:
- ✅ Velocity phát triển cực cao (767 PRs)
- ✅ Đa dạng hóa chiến lược (enterprise vs developer-friendly)
- ✅ Convergence quanh best practices (multi-channel, observability)
- ⚠️ Stability challenges (regressions, platform-specific bugs)

### **Top 3 dự án theo use case:**

**Enterprise Production:**
1. **OpenClaw** - Mature, feature-rich, large community
2. **Moltis** - Excellent UX, stable, fast iteration
3. **IronClaw** - Future-proof architecture (khi Reborn hoàn thành)

**Developer Experimentation:**
1. **Moltis** - Best DX, rapid prototyping
2. **NanoBot** - Extensibility, plugin ecosystem
3. **PicoClaw** - Embedded/IoT use cases

**Chinese Market:**
1. **CoPaw** - WeChat/Feishu expertise
2. **LobsterAI** - Cowork features
3. **Zeroclaw** - i18n support

### **Khuyến nghị cho OpenClaw:**

**Ngắn hạn (1-2 tháng):**
1. 🔴 **Fix critical bugs**: Event loop, memory timeout, zombie processes
2. 🟡 **Improve test coverage**: Giảm regressions
3. 🟢 **Documentation sprint**: Runbooks, troubleshooting guides

**Trung hạn (3-6 tháng):**
1. 🔵 **Multi-agent orchestration**: Hoàn thiện A2A messaging
2. 🟣 **Observability**: OpenTelemetry integration
3. 🟠 **Developer UX**: Simplify onboarding, better error messages

**Dài hạn (6-12 tháng):**
1. 🌟 **Platform parity**: Windows/ARM64 stability
2. 🌟 **Plugin ecosystem**: MCP marketplace, third-party skills
3. 🌟 **Enterprise features**: Multi-tenancy, RBAC, audit logs

### **Cơ hội chiến lược:**

- **Differentiation**: Focus vào **multi-agent orchestration** và **enterprise security**
- **Market**: Mở rộng sang **Chinese market** với WeChat/Feishu
- **Ecosystem**: Xây dựng **plugin marketplace** để leverage community
- **Positioning**: Trở thành **"Kubernetes of AI agents"** - platform cho orchestration

---

**📌 Tóm lại**: Hệ sinh thái đang phát triển mạnh mẽ với sự phân hóa rõ ràng. OpenClaw có vị thế mạnh nhưng cần giải quyết stability issues và cải thiện DX để duy trì leadership. Xu hướng tương lai hướng tới multi-agent, observability, và security-first design.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích dự án NanoBot - 2026-05-01

## 1. 📊 Tóm tắt hôm nay

Ngày 01/05/2026 chứng kiến hoạt động phát triển cực kỳ sôi động với **27 pull requests** được tạo/cập nhật, tập trung vào 3 trục chính: cải thiện kiến trúc hệ thống (hook system, observability), sửa lỗi kênh giao tiếp (Matrix, Feishu, WeChat), và mở rộng khả năng đa tác nhân. Đáng chú ý là các PR về OpenTelemetry tracing, mailbox channel cho multi-agent, và hệ thống hook có thể mở rộng qua plugin.

## 2. 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng dựa trên các PR đang được merge, phiên bản tiếp theo có thể bao gồm:
- Hệ thống hook mới với plugin support
- OpenTelemetry integration cho observability
- Multi-agent mailbox channel
- Các bản sửa lỗi quan trọng cho Matrix, Feishu, WeChat

## 3. 🔧 Tiến độ dự án

### Kiến trúc & Infrastructure

**🎯 Hook System Refactoring (#3564)**
- Thay thế `AgentHook` bằng `HookCenter` với typed-event system
- Hỗ trợ plugin distribution qua `entry_points(group="nanobot.hooks")`
- Ba chế độ handler: observe/transform/guard
- Backward compatible với AgentHook cũ qua adapter
- **Ý nghĩa**: Giảm coupling, cho phép third-party developers mở rộng hệ thống dễ dàng hơn

**📊 OpenTelemetry Tracing (#3173)**
- Trace toàn bộ agent loop: LLM calls, tool executions, orchestration
- Tích hợp Langfuse và LangSmith
- **Ý nghĩa**: Cải thiện khả năng debug và monitor production systems

### Multi-Agent Communication

**📬 Mailbox Channel Plugin (#3461)**
- File-system-based inter-agent communication
- Zero modification to core code (pure plugin)
- Anti-loop protection với TTL decrement
- **Ý nghĩa**: Mở đường cho multi-agent orchestration patterns

**🔄 Subagent Improvements (#3532, #3561)**
- Respect configured `max_iterations` thay vì hardcode 15
- Thêm `origin_message_id` tracking và outbound deduplication
- **Ý nghĩa**: Giải quyết #970 - long-running tasks không còn bị timeout sớm

### Channel Fixes & Enhancements

**Matrix Channel**
- #3562, #3565: Fix empty stream deltas từ DeepSeek reasoning_content
- #3553: Fix đọc lại old messages khi startup/restart

**Feishu Channel**
- #3547, #3543: Respect `replyToMessage` config trong group chats (đã revert và fix lại)
- #3552: Include sender identity trong model prompt để phân biệt users
- #3558: Allowlist trong blocklist cho reactEmoji + dynamic update

**WeChat Channel**
- #3517: Refresh stale `context_token` cho cron jobs
- #3542: Multi-account support - chạy nhiều tài khoản WeChat đồng thời

## 4. 🌟 Điểm nổi bật cộng đồng

### Issues được quan tâm nhất

**#660 - "Ultra-lightweight" nhưng cần Node.js** (11 comments, 5 👍)
- Người dùng chỉ ra mâu thuẫn: claim "ultra-lightweight" nhưng Dockerfile yêu cầu cả Python và Node.js
- Đánh vào brand positioning của dự án
- Chưa có response từ maintainers

**#2298 - Breaking endless tool calling loops** (4 comments)
- Vấn đề phổ biến với smaller/local models: infinite loop khi gọi tool
- Đề xuất: detect repeated tool calls và break loop
- **Quan trọng** cho production stability

**#3546 - NanoBot "mất trí nhớ"** (6 comments)
- Feishu force `reply_in_thread` gây confusion
- Khi tắt thread, bot như "quên" context
- Đã được fix qua #3547

## 5. 🐛 Ổn định & Bugs

### Critical Bugs Fixed

**DeepSeek Reasoning Mode (#3554, #3560)**
- `reasoning_content must be passed back` error vẫn tái hiện trên v0.1.5.post3
- Root cause: condition check không đúng trong `_drop_deepseek_incomplete_reasoning_history`
- PR #3560 đã adjust logic

**OpenAI-compatible API Streaming (#3551, #3555)**
- SSE stream đóng sớm khi có tool execution
- Root cause: `on_stream_end()` được treat như final termination
- Fix: phân biệt intermediate vs final stream end

**Matrix on Windows (#3506)**
- `OSError [WinError 123]` do colon trong nio store file path
- Bot nhận được messages nhưng không gửi được
- Đã closed - likely fixed

### Platform-Specific Issues

**Windows Compatibility**
- #3556: Thêm `.gitattributes` để enforce LF line endings
- #3550: Docs dùng `/tmp/` paths không work trên Windows
- Xu hướng: Cải thiện cross-platform support

## 6. 💡 Yêu cầu tính năng

### Model & Configuration

**#3358 - Model Presets**
- Named bundles của model + generation parameters
- Quick switching giữa các preset
- Giảm boilerplate config

**#1385 - Preserve reasoning_details**
- Multi-turn tool calling với reasoning models (Gemini, Claude)
- Cần pass back `reasoning_details` theo OpenRouter docs

### Observability & Control

**#3549 - Sender ID in Context**
- Inject `sender_id` vào LLM runtime context
- Enable user-aware responses trong group chats
- **Use case**: Personalization, user-specific behaviors

**#3373 - Gateway Lifecycle Hooks**
- `on_start`/`on_stop` notifications
- Send custom messages khi gateway start/stop
- Useful cho monitoring và alerting

### Provider Support

**#3568 - Manifest LLM Router**
- Thêm Manifest.build làm gateway provider
- `is_gateway=True`, detect by `mnfst_` key prefix

## 7. 💬 Phản hồi người dùng

### Positive Signals

- Cộng đồng active với nhiều contributions (27 PRs trong 1 ngày)
- Developers sẵn sàng fix bugs và contribute features
- Multi-language support (Chinese, English) trong issues/PRs

### Pain Points

**Configuration Complexity**
- #603: Ollama local setup khó config ("keeps getting stuck")
- Cần better documentation và examples

**Memory/Context Management**
- #3484: Automation không giữ history/context
- HEARTBEAT.md không hoạt động như expected
- Cron jobs không maintain session state

**Security Concerns**
- #979: AI có thể bypass `rm` command restrictions
- User test được AI xóa backup folders
- Cần stronger safety guardrails

## 8. 📋 Backlog & Roadmap

### Đang trong pipeline (dựa trên open PRs)

**Architecture**
- ✅ Hook system refactoring (#3564) - ready to merge
- ✅ OpenTelemetry tracing (#3173) - in review
- ✅ Model presets (#3358) - in review

**Multi-Agent**
- ✅ Mailbox channel (#3461) - ready
- ✅ Sender identity tracking (#3549, #3552)

**Channel Improvements**
- ✅ WeChat multi-account (#3542)
- ✅ Feishu sender context (#3552)
- ⏳ Matrix stability fixes

### Cần ưu tiên

**High Priority**
1. **Endless loop protection** (#2298) - affects production stability
2. **Node.js dependency** (#660) - brand positioning issue
3. **Security hardening** (#979) - command execution safety

**Medium Priority**
1. Better local model support (Ollama config)
2. Context/memory persistence for automation
3. Cross-platform compatibility (Windows)

### Xu hướng phát triển

📈 **Hướng Enterprise**: OpenTelemetry, multi-agent, lifecycle hooks
🔌 **Plugin Ecosystem**: Hook plugins, channel plugins, provider plugins  
🌍 **Cross-Platform**: Windows support, portable configs
🤝 **Multi-Agent**: Mailbox channel, sender tracking, inter-agent communication

---

**Kết luận**: NanoBot đang trong giai đoạn maturity với focus vào enterprise features (observability, multi-agent) và stability (bug fixes, cross-platform). Cộng đồng rất active nhưng cần cải thiện documentation và onboarding experience.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Phân tích Hệ sinh thái AI Agent - Zeroclaw
## Ngày 2026-05-01

---

## 📊 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn phát triển mạnh mẽ với **50 PRs đang mở** và **27 issues hoạt động**. Dự án tập trung vào việc cải thiện trải nghiệm đa kênh (multi-channel), tăng cường bảo mật, và mở rộng khả năng tích hợp với các nền tảng messaging phổ biến. Đáng chú ý là các nỗ lực quốc tế hóa (i18n) với việc bổ sung tiếng Trung giản thể và đồng bộ các bản dịch hiện có.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 🔧 Tiến độ dự án

### **Xu hướng phát triển chính:**

#### 1️⃣ **Cải thiện trải nghiệm Web UI & Gateway** 🌐
- **PR #6179** (XL, risk: high): Đưa tính năng onboarding lên web dashboard thông qua các CRUD endpoints mới (`/api/config/*`), cho phép quản lý cấu hình trực tiếp từ giao diện web
- **PR #6101** (M, risk: medium): Cho phép chuyển đổi model nhanh và giữ nguyên context chat khi điều hướng trang
- **PR #6220** (S, risk: low): Thêm khóa input, nút stop, và indicator khi agent đang chạy - cải thiện feedback cho người dùng
- **PR #6217** (XS, risk: low): Mở chat trực tiếp từ bảng memory khi có session_id

**Insight**: Zeroclaw đang chuyển từ CLI-first sang hybrid model với web dashboard đầy đủ tính năng, giúp người dùng phi kỹ thuật dễ tiếp cận hơn.

#### 2️⃣ **Mở rộng hỗ trợ kênh messaging** 💬
- **PR #6242** (M, risk: medium): Thêm CLI strings tiếng Trung cho WeChat
- **PR #6166** (XL, CLOSED): Tích hợp WeChat personal account qua iLink Bot API (đã đóng, có thể do vấn đề kỹ thuật)
- **Issue #6246**: WhatsApp Web channel ngừng hoạt động sau protocol bump tháng 4/2026
- **Issue #6153**: Lỗi transcription giọng nói trên Matrix với định dạng audio không hỗ trợ

**Insight**: Zeroclaw đang mở rộng mạnh sang thị trường châu Á (WeChat) và gặp thách thức với các thay đổi protocol của các nền tảng bên thứ ba.

#### 3️⃣ **Bảo mật & Kiểm soát** 🔒
- **PR #6214** (S, risk: medium): Kích hoạt HMAC tool receipts để xác thực tool calls
- **Issue #6207** (risk: high, P1): Web dashboard bypass ApprovalManager - tool approvals không hiển thị trong supervised mode
- **PR #6192** (M, risk: medium): Sửa lỗi paircode retrieval để target đúng instance đang chạy

**Insight**: Đội ngũ đang tăng cường bảo mật, đặc biệt là kiểm soát tool execution trong môi trường production.

#### 4️⃣ **Observability & Monitoring** 📈
- **PR #6190** (L, risk: medium): Thêm OpenTelemetry GenAI spans cho memory operations
- **PR #6009** (stacked): Instrument tool calls với OTel spans

**Insight**: Zeroclaw đang xây dựng khả năng quan sát chi tiết cho production deployments, quan trọng cho enterprise adoption.

#### 5️⃣ **Quốc tế hóa (i18n)** 🌍
- **PR #6170** (XL, risk: low): Đồng bộ bản dịch FR/JA/ES và thêm zh-CN
- **PR #6242**: CLI strings tiếng Trung cho WeChat

**Insight**: Dự án đang chuẩn bị cho thị trường toàn cầu, đặc biệt là châu Á.

---

## 🔥 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

1. **#5890** (7 comments) - **RFC: Multi-agent UX flow**
   - Đề xuất thiết kế luồng UX cho multi-agent
   - Đang trong giai đoạn vote của Core Team
   - Quan trọng cho kiến trúc tương lai của Zeroclaw

2. **#5947** (6 comments) - **Schema v3 migration**
   - Merge blocker - tất cả breaking changes phải hoàn thành trước khi merge
   - Ảnh hưởng đến toàn bộ config system

3. **#6153** (6 comments) - **Matrix voice transcription failed**
   - Vấn đề với Element Web/Android clients
   - Ảnh hưởng đến 2 Matrix clients chính

### **PRs được quan tâm:**

- **#6179**: Web onboarding parity - cho phép quản lý config từ dashboard
- **#6167**: ACP protocol v1 implementation - khôi phục kết nối với Nori
- **#6164**: Manual trigger cron từ webui

---

## 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng (P1):**

1. **#6207** - Web dashboard bypass ApprovalManager
   - **Severity**: S1 (workflow blocked)
   - **Risk**: High, security concern
   - Tool approvals không hiển thị trong supervised mode

2. **#6237** - Slack bot_token phải trong config file
   - **Severity**: S1 (workflow blocked)
   - Không thể dùng environment variable

3. **#6224** - Cron job không dispatch đến WhatsApp
   - **Severity**: S1 (workflow blocked)
   - WhatsApp missing trong delivery channels

4. **#6223** - web_fetch không hoạt động trên WhatsApp Web
   - **Severity**: S1 (workflow blocked)

### **Bugs đang được xử lý:**

- **#6246**: WhatsApp Web protocol bump - messages không flow sau update tháng 4
- **#6244**: HTTP SSE transport ignore tool_timeout_secs, hardcap 30s
- **#6243**: Streaming decode error khiến ZeroClaw hang
- **#6036**: Infinite tool-call loop trên Termux/Android

**Insight**: Có nhiều bugs S1 (workflow blocked) liên quan đến channels, cho thấy multi-channel support đang là điểm yếu cần ưu tiên.

---

## ✨ Yêu cầu tính năng

### **Đang được phát triển:**

1. **#6225** (P2) - Smart Truncation cho Telegram
   - Respect Markdown structure khi split messages
   - Cải thiện UX cho code blocks

2. **#6241** (P2) - Headed/headless config cho browser tool
   - Cho phép configure browser mode

3. **#6208** (P2, good first issue) - Blog accessibility
   - Thêm RSS, sitemap.xml
   - Dễ subscribe và index

4. **#5999** (P2) - Gateway Web Chat UX Improvements
   - Task status feedback
   - Session management
   - Đang được implement qua nhiều PRs (#6220, #6217)

### **RFC đang thảo luận:**

- **#5890**: Multi-agent UX flow design - đang chờ vote Core Team

---

## 💬 Phản hồi người dùng

### **Vấn đề người dùng gặp phải:**

1. **Confusion về config**:
   - #6206: Onboarding với OpenAI-compatible provider bị lỗi "Unknown property"
   - #6222: Config reference docs bị broken links

2. **Platform-specific issues**:
   - #6036: Infinite loop trên Termux/Android
   - #6039: Copilot provider không handle images từ Discord

3. **Documentation gaps**:
   - #6193: Email channel settings cần document rõ hơn
   - #6203: Cần hướng dẫn setup cho Raspberry Pi

### **Positive signals**:

- Cộng đồng đang đóng góp PRs cho nhiều vấn đề (good first issues được pick up)
- Nhiều feature requests từ real-world use cases
- Contributors từ nhiều quốc gia (China, Russia, US, etc.)

---

## 📋 Backlog & Roadmap

### **Đang trong pipeline:**

1. **Schema v3 migration** (#5947) - Merge blocker
   - Batch breaking field migrations
   - Phải hoàn thành trước khi merge bất kỳ PR nào

2. **Multi-agent architecture** (#5890)
   - RFC đang chờ Core Team vote
   - Sẽ định hình kiến trúc tương lai

3. **SkillForge improvements** (#6210)
   - Auto-integrator emits non-schema fields
   - Blocked, cần fix trước khi tiếp tục

### **Technical debt:**

1. **Provider compatibility**:
   - #5932: Groq per-model native tool support
   - #6233: DeepSeek reasoning_content dropped in multi-turn

2. **Infrastructure**:
   - #6211: Stabilize Node.js version to latest LTS
   - #6245: Tavily search provider unimplemented (TODO stub)

3. **Testing & CI**:
   - Nhiều PRs có label "needs-author-action"
   - Cần tăng cường automated testing

---

## 🎯 Kết luận

Zeroclaw đang trong giai đoạn **scale-up** với focus vào:
- ✅ **Enterprise readiness**: Security, observability, web UI
- ✅ **Global expansion**: i18n, WeChat, Asian markets
- ⚠️ **Stability challenges**: Multi-channel bugs, protocol changes
- 🔄 **Architecture evolution**: Multi-agent, schema v3

**Rủi ro chính**: Nhiều S1 bugs chưa được resolve, có thể ảnh hưởng đến user experience. Cần ưu tiên fix bugs trước khi thêm features mới.

**Cơ hội**: Thị trường châu Á (WeChat, Chinese localization) và enterprise features (observability, security) là điểm mạnh để differentiate.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo phân tích PicoClaw - 2026-05-01

## 1. 📊 Tóm tắt hôm nay

Ngày 01/05/2026 đánh dấu một đợt hoạt động mạnh mẽ với **2 releases** (v0.2.8 và nightly build), **38 PRs** và **37 issues** đang hoạt động. Trọng tâm phát triển tập trung vào **MCP (Model Context Protocol)**, cải thiện **streaming**, và xử lý các vấn đề ổn định nghiêm trọng liên quan đến session history race và PID check. Cộng đồng đang tích cực phản hồi về các vấn đề tích hợp kênh (Feishu, WhatsApp, Telegram) và yêu cầu hỗ trợ đa người dùng.

---

## 2. 🚀 Releases

### **v0.2.8** (30/04/2026)
Phiên bản chính thức với các tính năng MCP CLI mới:

**Tính năng chính:**
- ✨ **MCP CLI commands**: `show`, `add`, `list`, `remove`, `test`, `edit` - cho phép quản lý MCP servers trực tiếp từ command line
- 🔧 **MCP tool call fix**: Gửi empty object thay vì null cho tool arguments, giải quyết vấn đề tương thích với Zod validation
- 🌐 **OpenAI-compatible endpoints**: Hỗ trợ custom endpoints qua CLI, loại bỏ TUI
- 🔌 **Serial tool support**: Hỗ trợ cross-platform cho serial communication

**Ý nghĩa:** Đây là bước tiến quan trọng trong việc làm cho PicoClaw trở thành một platform mở rộng được, đặc biệt với MCP - giao thức chuẩn cho AI agent tooling.

### **Nightly Build** (01/05/2026)
Build tự động v0.2.8-nightly.20260501.6e1fab80 - cảnh báo có thể không ổn định.

---

## 3. 📈 Tiến độ dự án

### **Xu hướng phát triển chính:**

#### 🔥 **MCP Ecosystem** (Ưu tiên cao)
- **#2725** [NEW]: Fix MCP initialization failure non-fatal - ngăn zombie state khi MCP servers fail
- **#2460** [PR]: Empty object fix cho MCP tool calls - giải quyết Zod validation issues
- **#2546**: OAuth 2.1 + PKCE support cho MCP servers từ dashboard

#### 🎯 **Streaming & UX Improvements**
- **#2587** [PR]: End-to-end streaming cho Pico web chat với auto-scroll
- **#2462** [PR]: Fix Codex streaming output và Telegram duplicate retries
- **#2090** [PR]: Resolve Telegram streaming redundant drafts

#### 🔐 **Security & Multi-tenancy**
- **#2313** [PR]: Multi-user support + Agent Shield integration - hardening security với skills whitelisting
- **#2444**: Support storing MCP secrets trong `.security.yml`
- **#2438**: Docker ReadonlyRootfs compatibility issues

#### 🌍 **Provider Ecosystem**
- **#2703** [PR]: Intel OpenVINO Model Server support cho local LLM inference
- **#2240** [PR]: GitHub Copilot stdio transport support
- **#2626** [PR]: Native audio input cho multimodal LLMs (Gemini 1.5)

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

1. **#2408** (10 comments) - **LLM Account Stacking**: Tự động rotation API keys khi hit rate limits
   - 🎯 Use case: Người dùng muốn stack nhiều free-tier accounts để tránh quota limits
   - 💡 Concept "cartridge-belt" rất được cộng đồng quan tâm

2. **#2446** (3 comments, 👍1) - **Message echo bug**: Multi-channel setup gây echo messages
   - ⚠️ Critical UX issue ảnh hưởng production deployments

3. **#2580** (2 comments, 👍2) - **Feishu plugin optimization**: Yêu cầu streaming output và status display
   - 🇨🇳 Quan trọng cho thị trường Trung Quốc (không có proxy)

### **Vấn đề người dùng quan tâm:**
- 📱 **Channel stability**: Feishu, Telegram, WhatsApp đều có issues về message handling
- 🔑 **Authentication**: OAuth flows, credential persistence, token management
- 🌐 **Local deployment**: Docker, ARM64, cross-platform compatibility

---

## 5. 🐛 Ổn định & Bugs

### **Critical Issues (Priority High):**

#### **#2721** - Session history race (v0.2.5)
```
❌ Vẫn tái hiện sau khi #704 đã đóng
🔴 Anthropic Messages API trả về 400 với tool_use_id errors
📍 Ảnh hưởng: Telegram channel với claude-sonnet-4-6
```

#### **#2720** - PID check crash loop
```
❌ Singleton check không verify process identity
🔴 Stale PID (reused bởi systemd-resolved) gây crash loop
📍 Gateway fails to start
```

#### **#2686** [CLOSED] - DeepSeek reasoning_content stripped
```
✅ Đã fix: reasoning_content bị strip incorrectly trên non-tool turns
🎯 Ảnh hưởng: deepseek-v4-pro, deepseek-reasoner models
```

### **Medium Priority:**

- **#2468**: Scheduled tasks fail với "restricted to internal channels" error
- **#2482**: Open weights models với OpenAI backend không work cho tool calls
- **#2472**: `list_dir` fails trên Windows (path separator mismatch)
- **#2447**: Chỉ process latest message khi gửi nhiều tasks liên tiếp

### **Platform-specific:**

- **#1763**: aarch64 .deb không install được (ARM64 deployment)
- **#2280**: SiliconFlow API + QQ channel configuration issues
- **#2302**: Web UI requires frequent re-authentication (antigravity API)

---

## 6. ✨ Yêu cầu tính năng

### **Infrastructure & Deployment:**

1. **#2625** - WhatsApp support trong compiled builds
   - 🎯 Raspberry Pi Zero 2 users cần rapid updates
   - 💡 Đề xuất: Include WhatsApp trong default ARM64 builds

2. **#2493** - Multiple Feishu applications
   - 🎯 Separate config directories cho mỗi Feishu app
   - 💡 Use case: Manage multiple accounts/instances

### **Developer Experience:**

3. **#2519** - Force workspace default directory
   - ⚠️ System liên tục read/write ngoài workspace (e.g., /tmp)
   - 🔒 Security concern: Cần confine operations trong workspace

4. **#2527** - Configurable fresh_tail_size (Seahorse)
   - 📊 Hiện tại hardcoded = 32 messages
   - 💡 Cho phép users tune context budget

### **Provider & Integration:**

5. **#2515** - Robust memory system
   - 🧠 Integration với mem0, Supermemory, HydraDB
   - 💡 Bring memories từ industry providers

6. **#2465** - SMTP email channel
   - 📧 Use case: Cron tasks gửi results qua email
   - 💡 Universal interface, dễ implement

7. **#2169** - Dual-HEAD authentication support
   - 🔐 Self-hosted models cần 2 headers: Authorization + X-API-Key
   - 💡 Hiện tại chỉ support single Authorization header

---

## 7. 👥 Phản hồi người dùng

### **Positive Feedback:**

- ✅ MCP CLI commands được đánh giá cao (v0.2.8)
- ✅ OpenVINO support mở rộng local inference options
- ✅ Audio input cho multimodal models là bước tiến đúng hướng

### **Pain Points:**

#### **🇨🇳 Chinese Market:**
```
"由于中国用户也占了很大比例且有的人没有代理 希望优化飞书插件"
- Streaming output thiếu
- Status display không rõ ràng
- Cần optimize cho users không có proxy
```

#### **Production Stability:**
```
@ptoxad (#2429): "Some kind of broken garbage... What kind of idiots give this one stars?"
- Console mode: Nhập 1 ký tự → xuất 2 ký tự
- Model configuration không work
⚠️ Harsh feedback nhưng highlight real UX issues
```

#### **WhatsApp Native:**
```
#2540, #2541: LID-migrated accounts + group_trigger.mention_only hoàn toàn broken
- allow_from silently drops messages
- 4 compounded defects
- Cần comprehensive fix
```

### **Developer Experience:**

- 📝 Documentation gaps: OAuth flows, token override behavior
- 🐳 Docker deployment challenges: ReadonlyRootfs incompatible
- 🔧 Build complexity: WhatsApp support requires manual compilation

---

## 8. 📋 Backlog & Roadmap

### **Immediate Priorities (Based on activity):**

#### **Week 1-2:**
1. 🔴 **Fix critical stability issues**
   - Session history race (#2721)
   - PID check crash loop (#2720)
   - MCP initialization failures (#2725)

2. 🟡 **Channel reliability**
   - Feishu mention detection (#2091)
   - Telegram streaming fixes (#2090)
   - WhatsApp LID migration (#2540, #2541)

#### **Month 1:**
3. 🟢 **Multi-user & Security** (#2313)
   - Agent Shield integration
   - Skills whitelisting
   - User isolation

4. 🔵 **Provider Expansion**
   - OpenVINO finalization (#2703)
   - GitHub Copilot stdio (#2240)
   - Audio input support (#2626)

### **Long-term Vision:**

#### **Q2 2026:**
- 🧠 **Memory System**: Integration với external providers (#2515)
- 🔐 **OAuth 2.1 + PKCE**: MCP servers từ dashboard (#2546)
- 📧 **SMTP Channel**: Email notifications cho cron tasks (#2465)
- 🎯 **Account Stacking**: Automatic API key rotation (#2408)

#### **Platform Maturity:**
- 📦 **Build System**: WhatsApp trong default builds (#2625)
- 🐳 **Docker**: ReadonlyRootfs compatibility (#2440)
- 🌍 **i18n**: Better support cho Chinese market (#2580)

### **Technical Debt:**
- 🔧 Refactor OpenAI Responses API migration (#2171)
- 🧹 Cleanup path handling trên Windows (#2472)
- 📝 Document token override behavior (#2439)
- 🔒 Improve secret handling trong config (#2444)

---

## 🎯 Kết luận

PicoClaw đang trong giai đoạn **rapid iteration** với focus mạnh vào **stability** và **ecosystem expansion**. MCP integration là strategic bet đúng đắn, nhưng cần prioritize fixing critical bugs (session race, PID check) trước khi push thêm features. Cộng đồng đa dạng (US, China, global) với use cases khác nhau đòi hỏi balance giữa innovation và reliability.

**Key Metrics:**
- 📊 38 PRs active (high velocity)
- 🐛 37 issues (nhiều stale - cần triage)
- 🚀 2 releases trong 24h (aggressive release cycle)
- 👥 Strong community engagement (10+ comments trên top issues)

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo phân tích NanoClaw - 2026-05-01

## 📊 Tóm tắt hôm nay

Ngày 30/04 đánh dấu một đợt merge lớn với **30 PRs được đóng** trong 24 giờ, tập trung vào 3 mảng chính: **bảo mật container** (sửa 2 lỗ hổng nghiêm trọng), **cải thiện trải nghiệm setup** (flow tương tác mượt mà hơn, tự động phát hiện cấu hình cũ), và **mở rộng tích hợp kênh** (Slack, iMessage, Signal attachments). Đồng thời có **8 issues mới/đang mở** phơi bày các vấn đề kỹ thuật sâu hơn trong kiến trúc provider và quản lý vòng đời container.

---

## 🚀 Releases

Không có release chính thức trong 24 giờ qua.

---

## 🔧 Tiến độ dự án

### **Bảo mật container - Đã hoàn thành** ✅

Hai lỗ hổng nghiêm trọng được vá:

- **#457 (Critical)**: Command injection qua `stopContainer()` - shell string interpolation cho phép agent chèn lệnh tùy ý
  - **Fix**: #2001 áp dụng path confinement cho outbox, ngăn agent kiểm soát đường dẫn file trên host
  
- **#458 (High)**: Container chạy với unrestricted network access - rủi ro data exfiltration khi kết hợp với `bypassPermissions`
  - **Đã đóng** nhưng không thấy PR fix cụ thể trong batch này - có thể đã xử lý trước đó

### **Setup flow - Cải tiến trải nghiệm người dùng** 🎨

Chuỗi 10+ PRs tái thiết kế quy trình cài đặt:

- **#2094**: Tự động phát hiện `.env` cũ, cho phép tái sử dụng credentials thay vì nhập lại
- **#2157**: Chuyển từ "reuse all or start fresh" sang hỏi từng bước riêng lẻ
- **#2052**: Auto-bootstrap OneCLI admin sau cài đặt local-vault
- **#2055**: Fix lỗi `onecli not found` bằng cách inject `~/.local/bin` vào PATH
- **#2111**: Xóa "Terminal Agent" test sau ping-pong, tự động tạo agent mới khi user chọn chat
- **#2155**: Cảnh báo khi chạy setup với root user trên Linux, hướng dẫn tạo user riêng
- **#2145, #2146, #2154, #2158**: Polish UI - skip browser prompts trên headless, format thời gian đẹp hơn, thêm splash screen "under-the-sea lobster" 🦞

### **Tích hợp kênh mới** 📱

- **#1929**: Thêm Slack và iMessage (experimental) với interactive setup wizard
- **#2040**: Signal hỗ trợ outbound attachments qua signal-cli JSON-RPC
- **#2107**: Implement `resolveChannelName` cho Slack/Telegram - hiển thị tên channel thực trong approval flow
- **#2105**: Cải thiện channel-approval flow - cho phép chọn agent có sẵn hoặc tạo mới với tên tùy chỉnh

### **Scheduling & Task routing** ⏰

- **#2033**: Defer task messages từ follow-up polling về main loop để `applyPreTaskScripts` chạy đúng
- **#2114**: Apply pre-task scripts cho cả follow-up injections, không chỉ initial batch
- **#2142**: Include routing fields (`platform_id`, `channel_type`, `thread_id`) trong `schedule_task` content JSON

### **Telegram fixes** 💬

- **#1942**: Fix `ask_question` cards fail trên Telegram - encode option index thay vì full value để fit 64-byte `callback_data` limit
- **#1900 follow-up**: #2112 wire `maxTextLength` để engage message splitter cho Telegram

### **Dota-Feishu decision bridge** 🤖

- **#2141**: Thêm IPC protocol extension với `targetSelf: true`, dota-bridge module nhận diện reply messages trong Feishu DM và match với pending decisions

---

## 🔥 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác**

- **#458** (4 👍): Network restrictions cho agent containers - cộng đồng quan tâm đến security posture
- **#457** (2 comments): Command injection - thảo luận về impact và fix approach

### **Vấn đề người dùng quan tâm**

- **Setup experience**: Chuỗi PRs về setup flow cho thấy team đang ưu tiên giảm friction cho người dùng mới
- **Channel integrations**: Slack, iMessage, Signal attachments - mở rộng khả năng tương tác đa nền tảng
- **Root user safety**: #2155 phản ánh concern về security best practices trong production deployments

---

## 🐛 Ổn định & Bugs

### **Vấn đề đang mở - Mức độ cao** 🚨

1. **#2150 (High)**: OpenCode provider gửi literal `@./...md` lines thay vì nội dung file - agent hoạt động mà không có instructions
   - **Root cause**: `wrapPromptWithContext` không resolve file references
   
2. **#2148 (High)**: `proc.kill('SIGKILL')` leak OpenCode binary process, giữ port 4096
   - **Impact**: Mỗi timeout leak 1 process, container trở nên unusable
   
3. **#2147 (High)**: Orphan `processing_ack` rows survive kill-ceiling, SIGKILL ngay lập tức khi respawn
   - **Impact**: Lock session khỏi message processing, cần manual DB edit để recover

4. **#2159**: OneCLI `ensureAgent` fails - agent group IDs có underscore (`ag_xxx`) nhưng OneCLI chỉ validate `[a-z0-9-]`

5. **#2149 (Medium)**: Hardcoded 90s idle timeout trong OpenCode provider breaks local-model setups (slow inference)

### **Bugs đã fix**

- **#1973**: `register-claude-token.sh` fails với "onecli not found" - PATH không propagate sang bash subprocess → Fixed #2055
- **Container restart recovery**: #1941 fix stale heartbeat + orphan claim loop khiến messages bị drop sau restart
- **Telegram callback_data overflow**: #1942 fix bằng cách encode index thay vì full value

---

## 💡 Yêu cầu tính năng

### **Đã implement**

- ✅ Outbound attachments cho Signal (#2040)
- ✅ Channel name resolution cho approval flow (#2107)
- ✅ Free-text agent naming trong setup (#2105)
- ✅ Dota-Feishu decision bridge (#2141)
- ✅ Host-actions container skill (#2027) - routing user requests đến host skills

### **Đang chờ xử lý**

- **#2160 (Open)**: Fix inbound.db stale reads - open fresh per `messages_in` read
- Các OpenCode provider issues (#2147, #2148, #2149, #2150) cần architectural fixes

---

## 💬 Phản hồi người dùng

### **Tích cực**

- Setup flow improvements được đánh giá cao - giảm manual work, tự động phát hiện config cũ
- Channel integrations mở rộng use cases (Slack cho teams, iMessage cho iOS users)

### **Pain points**

- **OpenCode provider instability**: 4 high/medium issues mới mở trong 24h cho thấy provider này chưa production-ready
- **Container lifecycle management**: Orphan processes, stale heartbeats, claim loops - cần refactor quản lý state
- **OneCLI identifier mismatch**: Friction giữa NanoClaw's naming convention và OneCLI's validation rules

---

## 🗺️ Backlog & Roadmap

### **Ưu tiên cao (dựa trên open issues)**

1. **OpenCode provider stabilization** - 4 issues cần fix trước khi promote ra stable
2. **Container lifecycle refactor** - giải quyết orphan processes và state management
3. **OneCLI integration polish** - align identifier formats, improve error handling

### **Xu hướng phát triển**

- **Multi-channel expansion**: Sau Telegram, Discord, Signal, Slack, iMessage - có thể thấy WhatsApp, WeChat trong roadmap
- **Security hardening**: Sau 2 critical fixes, team đang audit thêm attack surfaces
- **Developer experience**: Setup flow, documentation (CLAUDE.md updates #1502), PR hygiene checks

### **Technical debt**

- **#1924**: Revert container home permissions fix - có thể cần approach khác
- **Inbound.db stale reads** (#2160): Cần kiến trúc mới cho message queue
- **Pre-task script application**: Đã fix 2 lần (#2033, #2114) - có thể cần redesign scheduling logic

---

## 🎯 Kết luận

NanoClaw đang trong giai đoạn **maturation** - team focus vào **stability** (fix critical security bugs, container lifecycle), **usability** (setup flow overhaul), và **ecosystem expansion** (new channels). Tuy nhiên, OpenCode provider issues cho thấy cần thêm testing và architectural review trước khi scale. Cộng đồng đang tích cực contribute (30 PRs merged trong 1 ngày), nhưng cần balance giữa velocity và quality assurance.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo phân tích NullClaw - 2026-05-01

## 📊 Tóm tắt hôm nay

Ngày hôm nay chứng kiến một đợt merge và đóng PR mạnh mẽ với 5 PRs được đóng, tập trung vào hai hướng chính: **hoàn thiện hệ thống tool customization** (PRs #834-836) và **sửa các lỗi nghiêm trọng liên quan đến Zig 0.16** (PRs #873, #876). Đặc biệt, các lỗi về Mattermost integration và gateway performance đã được giải quyết sau khi gây ảnh hưởng nghiêm trọng đến production.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### Hoàn thành (5 PRs đã đóng)

**🔧 Hệ thống Tool Customization (3 PRs)**
- **#834**: Thêm schema cấu hình cho tool customization với struct `ToolCustomization` và các trường mới trong `ToolsConfig`
- **#835**: Triển khai override cho `system_prompt` và `enabled`, cho phép tắt/bật tools động và thay đổi mô tả
- **#836**: Ưu tiên tools dựa trên trigger keywords, tự động inject priority hints vào LLM context

**🐛 Sửa lỗi nghiêm trọng Zig 0.16 (2 PRs)**
- **#873**: Sửa 2 lỗi critical:
  - CPU spin 100% trên gateway thread do busy-loop trên EAGAIN
  - Mattermost POST requests thất bại do empty body (Writer.Allocating không flush)
- **#876**: Thay `readSliceShort` bằng `readVec` để unblock HTTP/1.1 keep-alive clients (curl bị block do không gửi FIN)

### Đang mở (5 PRs)

**✨ Tính năng mới**
- **#837**: Hỗ trợ load tool customizations từ file JSON external, với hybrid merging system (Array + Object format)

**🔒 Bảo mật & Ổn định**
- **#875**: Phân loại rủi ro 3 cấp cho commands, thêm medium-risk tier cho network tools (curl, wget), strip exec-prefix
- **#877**: Fix Mattermost body allocation - gọi `toArrayList()` trước `curlPost()` để đảm bảo buffer được flush
- **#878**: Dùng `nanosleep` trên POSIX thay vì `std.Io.sleep()` để thực sự suspend OS thread

**🌐 Skills Ecosystem**
- **#831**: Hỗ trợ Agent Skills RFC 0.2.0, cải thiện web skill fetch với validation schema, resolve relative URLs, verify SHA256

## 🌟 Điểm nổi bật cộng đồng

**Không có tương tác đáng kể** - Tất cả PRs đều có 0 reactions và không có comments được ghi nhận. Điều này cho thấy:
- Dự án có thể đang trong giai đoạn phát triển nội bộ
- Cộng đồng chưa tích cực tham gia review hoặc thảo luận
- Hoặc dữ liệu comments chưa được thu thập đầy đủ

## 🔥 Ổn định & Bugs

### Đã giải quyết ✅

**Critical regressions từ Zig 0.16 migration:**

1. **Gateway CPU spin (100% utilization)** - PR #873
   - Nguyên nhân: `std.Io.Threaded` trả về `EAGAIN` thay vì block, gateway loop không sleep
   - Ảnh hưởng: Tất cả agents chạy daemon mode trên mọi platform
   - Giải pháp: Thêm `thread.sleep()` khi accept trả về `WouldBlock`

2. **Mattermost silent failure** - PR #873
   - Nguyên nhân: `Writer.Allocating` trong Zig 0.16 không auto-flush, `body.items` rỗng khi POST
   - Ảnh hưởng: Tất cả Mattermost-connected agents không gửi được tin nhắn
   - Giải pháp: Gọi `toArrayList()` trước khi truyền body

3. **HTTP keep-alive blocking** - PR #876
   - Nguyên nhân: `readSliceShort()` loop đến khi buffer đầy, curl keep-alive không gửi FIN
   - Ảnh hưởng: Clients bị block tại `SO_RCVTIMEO` timeout
   - Giải pháp: Dùng `readVec()` để đọc partial data

### Đang xử lý 🔄

- **#877**: Mattermost body allocation vẫn cần finalize trước curlPost
- **#878**: Thread sleep không thực sự suspend OS thread trên POSIX

## 💡 Yêu cầu tính năng

### Tool Customization System (Đã triển khai)

Hệ thống cho phép:
- Load cấu hình tools từ file JSON external
- Override system prompts và enable/disable tools động
- Trigger-based prioritization với keyword detection
- Hybrid format support (Array + Object)

### Security Enhancements (Đang review - #875)

- **3-tier risk classification**: Low/Medium/High thay vì chỉ Low/High
- **Medium-risk tier**: Cho phép dùng curl, wget trong supervised mode (giải quyết #167)
- **Exec-prefix stripping**: Tăng cường bảo mật command execution

### Agent Skills RFC 0.2.0 (Đang review - #831)

- Hỗ trợ `.well-known/agent-skills/index.json`
- Validation schema 0.2.0
- SHA256 digest verification
- Support cho skill-md, .tar.gz, .zip artifacts

## 👥 Phản hồi người dùng

**Không có phản hồi trực tiếp** từ cộng đồng trong dữ liệu thu thập được. Tuy nhiên, có thể suy luận:

- Issue #167 (curl blocked in supervised mode) đã được reference trong PR #875, cho thấy có feedback từ users về hạn chế của risk classification cũ
- Các critical bugs về Mattermost và gateway được đánh dấu `[!CAUTION]` cho thấy đã có báo cáo từ production users

## 🗺️ Backlog & Roadmap

### Ưu tiên cao (PRs đang mở)

1. **Merge #837** - External tool customizations file (blocking cho flexibility)
2. **Merge #875** - Security 3-tier classification (blocking cho usability)
3. **Merge #877, #878** - Hoàn thiện Zig 0.16 compatibility fixes
4. **Merge #831** - Agent Skills RFC 0.2.0 support

### Xu hướng phát triển

**Hướng tới modularity và extensibility:**
- Tool system ngày càng linh hoạt với external configs
- Skills ecosystem chuẩn hóa theo RFC
- Security model tinh chỉnh hơn (3-tier thay vì 2-tier)

**Ổn định platform:**
- Zig 0.16 migration đang trong giai đoạn hardening
- Focus vào compatibility và performance regressions

---

**📌 Kết luận**: NullClaw đang trong giai đoạn consolidation sau migration Zig 0.16, với focus song song vào **stability fixes** và **feature extensibility**. Việc không có tương tác cộng đồng đáng kể có thể là dấu hiệu cần cải thiện engagement hoặc đơn giản là dự án đang phát triển nội bộ trước khi public release lớn.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo Phân tích Hệ sinh thái IronClaw - 01/05/2026

## 📊 Tóm tắt hôm nay

Dự án IronClaw đang trong giai đoạn tái cấu trúc lớn với kiến trúc **Reborn**, tập trung vào việc xây dựng nền tảng runtime mới với các substrate độc lập. Hoạt động chính xoay quanh việc tích hợp các thành phần cốt lõi (WASM runtime, HTTP egress, memory storage, capability host) vào nhánh `reborn-integration`. Cộng đồng gặp một số vấn đề về UX (TUI display, Gmail authentication, mission creation) cần được giải quyết.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua. Dự án đang trong giai đoạn phát triển nội bộ với kiến trúc Reborn.

---

## 🏗️ Tiến độ dự án

### **Kiến trúc Reborn - Giai đoạn Landing**

Dự án đang thực hiện chiến lược landing phức tạp theo [#2987](https://github.com/nearai/ironclaw/issues/2987) với 43 bình luận, cho thấy đây là trọng tâm của team:

**✅ Các thành phần đã merge vào `reborn-integration`:**

- **WASM Runtime** (#3097 - CLOSED): Runtime WIT-compatible mới thay thế JSON-ABI cũ, hỗ trợ component model chuẩn
- **HTTP Egress** (#3098 - CLOSED): Shared runtime HTTP egress với DNS/SSRF protection, policy checks, và resource accounting
- **Memory Storage** (#3078, #3079 - CLOSED): Document storage boundary và search/plugin seams
- **Capability Host** (#3071 - CLOSED): Base workflow cho capability invocation với authorization và lifecycle management

**🔄 Đang trong quá trình review:**

- **Host Runtime Services** (#3126): Composition graph tích hợp Script/MCP/WASM adapters với shared services
- **Trace Commons Client** (#3131): Tích hợp client-side capture, local queue, và credit notices
- **CI Cutover** (#3104): Chuyển đổi workflows sang main merge queue
- **Responses API Enhancement** (#3122): Hỗ trợ externally-provided tools theo OpenAI wire shape

**📋 Các blocker tiếp theo:**

- **TurnCoordinator** (#3013): Host-layer turn coordination với thread/turn admission
- **AgentLoopHost** (#3016): Reference loop host facade cho shipped agent loops
- **Permission UX** (#3127): Scalable capability permission UX và policy resolver

### **Xu hướng phát triển**

1. **Modular substrate approach**: Tách biệt các thành phần thành crates độc lập với contract rõ ràng
2. **Safety-first**: Tập trung vào authorization, obligations, audit trails, và resource limits
3. **Test coverage**: Thêm vertical-slice integration tests (#3067, #3110, #3114)
4. **Dual-binary strategy**: Ship Reborn như binary riêng `ironclaw-reborn` (#3069)

---

## 💬 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

1. **#2987 - Reborn EPIC** (43 comments): Tracker chính cho kiến trúc Reborn, thu hút nhiều discussion về strategy và implementation plan

2. **#3067 - Integration Test Suite** (10 comments): Cộng đồng quan tâm đến test coverage cho vertical slices

3. **#3103 - TUI Display Issue** (7 comments): Vấn đề High ASCII TUI không hiển thị đúng trên một số TTY, ảnh hưởng UX

### **Vấn đề người dùng quan tâm:**

- **Developer Experience**: Các PR lớn về Abound demo (#1764) và Aliyun support (#1446) cho thấy nhu cầu tích hợp với các platform khác
- **Production readiness**: Config-driven composition root (#3101) và CI improvements (#3104) hướng tới production deployment

---

## 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng:**

1. **#3133 - Gmail Mission Failed**: Mission gửi email thất bại do không thể sử dụng Gmail
2. **#3132 - Mission Creation Error**: Lỗi validation `'cooldown_secs' must be an integer, got "120"` - type mismatch
3. **#3128 - Gmail 502 Error**: Authentication flow trả về 502 khi callback, nhưng cài đặt qua settings thì work
4. **#3103 - TUI Display**: High ASCII không render đúng khi scrolling trên một số terminal

### **Canary failures:**

- **#3116, #3115, #3113**: Live canary tests failed cho `public-smoke`, `persona-rotating`, và `provider-matrix anthropic`
- Cho thấy có regression trong integration với Anthropic provider

### **Vấn đề bảo mật/infrastructure:**

- **#3108 - API Key 401**: Web IDE-issued NEAR AI API keys bị reject với "Session not found" trên private.near.ai gateway

---

## ✨ Yêu cầu tính năng

### **Đang được implement:**

1. **Trace Commons Integration** (#3131): Client-side capture, standing policy, local queue cho observability
2. **Reasoning Trace** (#3129): Emit reasoning content từ GLM-5, DeepSeek, OpenAI o-series
3. **External Tools Support** (#3122): Cho phép externally-provided tools trong Responses API
4. **Native Memory Service** (#3118): Reborn-native memory storage/search thay vì adapter legacy workspace

### **Proposals từ cộng đồng:**

- **NEAR Intents Tool** (#1479): Tool cho Defuse 1Click API để swap tokens
- **Aliyun Coding Plan** (#1446): Support cho Aliyun BaiLian với Anthropic-compatible interface
- **Telegram Polling Fix** (#3105): Fallback cho channel setup trên headless servers

---

## 👥 Phản hồi người dùng

### **Trải nghiệm tích cực:**

- Không có feedback tích cực rõ ràng trong 24h qua (focus vào internal development)

### **Pain points:**

1. **Authentication UX**: Gmail integration không ổn định, gây friction cho users muốn setup email missions
2. **Mission Creation**: Type validation quá strict, không auto-convert string to int
3. **Terminal Compatibility**: TUI không work tốt trên tất cả terminal types
4. **API Key Management**: Web IDE keys không work với private gateway, confusing cho users

### **Developer feedback:**

- PR #3104 có discussion về CI workflow cutover, cho thấy team đang cẩn thận với infrastructure changes
- Multiple test coverage PRs (#3110, #3114, #3117) phản ánh culture chú trọng quality

---

## 🗺️ Backlog & Roadmap

### **Immediate priorities (Q2 2026):**

**Phase 1 - Complete Reborn Landing:**
- ✅ Runtime lanes (WASM, Script, MCP)
- ✅ HTTP egress & network policy
- ✅ Memory storage substrate
- ✅ Capability host base
- 🔄 Host runtime services composition (#3126)
- 📋 TurnCoordinator (#3013)
- 📋 AgentLoopHost facade (#3016)

**Phase 2 - Production Readiness:**
- 🔄 Config-driven composition (#3101)
- 🔄 CI/CD cutover (#3104)
- 📋 Separate binary shipping (#3069)
- 📋 Permission UX design (#3127)

**Phase 3 - Feature Completeness:**
- 📋 Native memory service (#3118)
- 📋 E2E integration tests (#3067)
- 🔄 Trace Commons (#3131)
- 🔄 External tools API (#3122)

### **Technical debt:**

- Legacy workspace DB migration to Reborn memory (#3112 closed, superseded by #3118)
- WASM HTTP routing through shared egress (#3123)
- Approval lifecycle hardening (#3111 merged)

### **Long-term vision:**

Dựa trên pattern của các PRs, roadmap dài hạn hướng tới:
- **Modular runtime architecture** với pluggable capabilities
- **Multi-tenant safety** với fine-grained authorization
- **Observability-first** với trace commons và audit trails
- **Developer-friendly** với better tooling và documentation

---

## 🎯 Đánh giá tổng quan

**Điểm mạnh:**
- ✅ Kiến trúc Reborn được thiết kế cẩn thận với clear contracts
- ✅ Test coverage được ưu tiên ngay từ đầu
- ✅ Safety và security được bake vào design
- ✅ Incremental landing strategy giảm risk

**Thách thức:**
- ⚠️ Complexity cao của migration có thể kéo dài timeline
- ⚠️ User-facing bugs (Gmail, TUI, missions) cần attention
- ⚠️ Canary failures cho thấy regression risk
- ⚠️ Documentation chưa theo kịp code changes

**Khuyến nghị:**
1. Tăng focus vào user-facing bug fixes song song với Reborn development
2. Improve error messages và validation (như #3132)
3. Strengthen canary tests trước khi merge vào main
4. Document migration path cho existing users

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo Phân tích LobsterAI - Ngày 2026-05-01

## 🎯 Tóm tắt hôm nay

Dự án LobsterAI có một ngày hoạt động tích cực với **9 PRs được merge** vào nhánh chính, tập trung vào việc sửa lỗi và cải thiện trải nghiệm người dùng. Đáng chú ý là các bản vá liên quan đến tính ổn định của hệ thống cowork, UI/UX, và quy trình cập nhật. Một issue mới về tích hợp WeChat đã được báo cáo, phản ánh nhu cầu cải thiện trải nghiệm cấu hình IM bot.

---

## 🚀 Releases

Không có release chính thức nào được phát hành trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### ✅ PRs đã merge (9 PRs)

**Nhóm 1: Cải thiện Cowork & Gateway Stability**
- **#1869** - Sửa lỗi deadlock session khi gateway retry request thất bại
  - Vấn đề: Khi LLM request thất bại và gateway retry vô hạn, adapter cleanup local turn nhưng gateway run vẫn active, dẫn đến các message tiếp theo bị reject
  - Giải pháp: Gửi `chat.abort` đến gateway trước khi cleanup
  
- **#1857** - Ngăn gateway hard restart khi đổi model trên home page
  - Cải thiện trải nghiệm người dùng khi thay đổi cấu hình

**Nhóm 2: UI/UX Improvements**
- **#1868** - Giới hạn kích thước ảnh markdown và thêm click-to-preview cho ảnh từ IM channel
  - Sửa vấn đề ảnh từ WeChat hiển thị quá lớn
  
- **#1855** - Truncate tên model dài trong ModelSelector để tránh header overflow
  - Cải thiện giao diện khi sử dụng model có tên dài

- **#1829** - Xóa thông báo auto-restart không chính xác trong trạng thái installing

**Nhóm 3: Configuration & Data Management**
- **#1840** - Sửa lỗi `updateConfig` ghi đè providers đã lưu bằng defaults cũ
  - Chuyển sang pattern read-modify-write để đảm bảo partial updates đọc config mới nhất từ store

**Nhóm 4: Platform-specific Fixes**
- **#1851** - Release file watchers trước khi xóa skill directory trên Windows
  - Sửa lỗi không thể xóa skill trên Windows do file watcher đang giữ lock

- **#1841** - Sử dụng IntCmp thay vì StrCmp cho NSIS exit code check
  - Cải thiện độ tin cậy của installer trên Windows

**Nhóm 5: Skills Enhancement**
- **#1864** - Nâng cấp youdaonote skill với tính năng mới

### 🔄 PRs đang mở (12 PRs - đánh dấu stale)

Có **12 PRs đang pending** từ ngày 25/03/2026, đều được đánh dấu `[stale]`, cho thấy cần review và quyết định merge:

**Security & Performance:**
- #826 - Validation URL protocol cho `shell.openExternal` (bảo mật)
- #828 - Ngăn path traversal trong `localfile://` protocol handler (bảo mật nghiêm trọng)
- #830 - Tối ưu SQLite performance parameters
- #842 - Thêm security environment scanning với UI thân thiện

**Feature Enhancements:**
- #827 - Ngăn cài đặt skill trùng lặp
- #835 - JSON paste mode cho batch MCP server creation
- #836 - Xử lý duplicate local skill imports
- #838 - Per-channel model override cho IM bot sessions
- #841 - Ngăn overlapping runtime poll cycles
- #848 - Batch config writes trong transaction

**Bug Fixes:**
- #847 - Preserve single tilde ranges trong chat rendering (11~21°C)
- #852 - Sửa crash khi `event.sender` bị gọi sau khi window destroyed

---

## 🌟 Điểm nổi bật cộng đồng

### Issue #1878 - Vấn đề cấu hình WeChat bot
- **Mức độ ưu tiên**: Cao (ảnh hưởng trực tiếp đến onboarding)
- **Vấn đề**: Sau khi quét mã QR, WeChat yêu cầu nhập mã 6 số xác thực nhưng OpenClaw client không hiển thị giao diện nhập
- **Tác động**: Người dùng không thể hoàn tất cấu hình WeChat bot
- **Trạng thái**: Mới mở, chưa có response từ maintainers

---

## 🐛 Ổn định & Bugs

### ✅ Đã sửa trong ngày
1. **Session deadlock** (#1869) - Vấn đề nghiêm trọng ảnh hưởng đến khả năng xử lý message liên tục
2. **Config overwrite** (#1840) - Mất dữ liệu cấu hình providers
3. **Windows file lock** (#1851) - Không thể xóa skills trên Windows
4. **UI overflow** (#1855, #1868) - Các vấn đề hiển thị giao diện

### ⚠️ Đang chờ xử lý
- **Security vulnerabilities** (PRs #826, #828) - Cần được ưu tiên review và merge
- **Main process crash** (#852) - Lỗi nghiêm trọng khi window destroyed
- **WeChat verification** (#1878) - Blocking user onboarding

---

## 💡 Yêu cầu tính năng

### Đang pending review:
1. **JSON paste mode cho MCP servers** (#835) - Cải thiện batch configuration workflow
2. **Per-channel model override** (#838) - Cho phép sử dụng model khác nhau cho từng IM channel
3. **Security scanning** (#842) - Quét và quản lý quyền truy cập của skills
4. **Duplicate skill prevention** (#827, #836) - Ngăn cài đặt trùng lặp

---

## 💬 Phản hồi người dùng

### Vấn đề UX được quan tâm:
- **WeChat integration** - Quy trình xác thực chưa hoàn chỉnh, thiếu UI cho bước nhập mã
- **Model name display** - Tên model dài gây vỡ giao diện (đã sửa)
- **Image preview** - Ảnh từ IM channels hiển thị không tối ưu (đã sửa)

### Xu hướng feedback:
- Người dùng quan tâm đến **tính ổn định** của cowork/gateway system
- Nhu cầu về **flexibility** trong cấu hình (per-channel models, batch operations)
- Quan tâm đến **security** và kiểm soát quyền truy cập của skills

---

## 🗺️ Backlog & Roadmap

### Ưu tiên cao (cần action ngay):
1. ⚠️ **Xử lý 12 stale PRs** - Đã pending hơn 1 tháng, cần review và quyết định
2. 🔒 **Security PRs** (#826, #828) - Vulnerabilities cần được patch sớm
3. 🐛 **WeChat verification UI** (#1878) - Blocking user adoption

### Ưu tiên trung bình:
- Performance optimization (SQLite tuning #830)
- Feature enhancements (MCP batch config, per-channel models)
- Code quality improvements (transaction batching, polling optimization)

### Quan sát:
- Dự án đang trong giai đoạn **stabilization** với focus vào bug fixes và UX improvements
- Có nhiều PRs chất lượng đang pending, cần tăng tốc độ review
- Security concerns cần được ưu tiên cao hơn trong roadmap

---

## 📊 Thống kê

- **PRs merged**: 9
- **PRs pending**: 12 (tất cả stale)
- **Issues mới**: 1
- **Tổng issues mở**: 1
- **Contributors active**: ~10 (dựa trên PR authors)

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Báo cáo phân tích dự án Moltis - Ngày 2026-05-01

## 📊 Tóm tắt hôm nay

Moltis đang trong giai đoạn phát triển cực kỳ tích cực với **21 PRs được merge** trong 24 giờ qua, tập trung vào 3 trụ cột chính: mở rộng hệ sinh thái provider (Gemini, DeepInfra, Zen), nâng cấp trải nghiệm người dùng (auto-title, message actions, voice controls), và cải thiện khả năng triển khai (remote sandbox, GPU passthrough). Dự án đã phát hành **version 20260430.01** và đang xử lý các bug UI liên quan đến chat scrolling và layout.

## 🚀 Releases

### Version 20260430.01 (2026-04-30)

Release này đánh dấu một bước tiến lớn với hàng loạt tính năng mới:

**Tính năng nổi bật:**
- **Multi-provider expansion**: Tích hợp Gemini (OAuth + API key), DeepInfra (8 models), và Zen proxy
- **UX improvements**: Auto-generate session titles, message action bar (Copy/Retry/Fork), voice button controls
- **Infrastructure**: Remote sandbox support (Vercel, Daytona, Firecracker), GPU passthrough cho Docker
- **Developer tools**: SDK foundations (TypeScript, Python, Go), per-skill usage telemetry
- **Stability**: Graceful SIGTERM handling, clipboard fallback cho HTTP contexts

**Ý nghĩa chiến lược:**
- Mở rộng khả năng tương thích với nhiều LLM providers, giảm vendor lock-in
- Cải thiện khả năng self-hosted trên cloud platforms không hỗ trợ Docker-in-Docker
- Xây dựng nền tảng SDK cho ecosystem bên thứ ba

## 📈 Tiến độ dự án

### Các PR quan trọng đã merge (20/21 PRs)

**🎯 Provider Ecosystem (3 PRs)**
- #33: Gemini provider với OAuth + PKCE flow - mở rộng sang Google AI
- #934: DeepInfra provider + GPU passthrough - hỗ trợ Llama 4, DeepSeek V3/R1
- #944: Zen multi-protocol proxy - single API key cho GPT/Claude/Gemini

**💡 User Experience (6 PRs)**
- #933: Auto-generate session titles sau first exchange
- #932: Message action bar với Copy/Retry/Fork buttons
- #943: Hide voice buttons khi STT/TTS disabled
- #925: Fix scroll-hijacking ResizeObserver (#922)
- #941: Fix system-notice text overflow
- #936: Clipboard fallback cho insecure HTTP contexts

**🏗️ Infrastructure (4 PRs)**
- #942: Remote sandbox support (Vercel, Daytona, Firecracker)
- #940: SIGTERM handling cho graceful Docker shutdown
- #921: Auto-trigger code indexing on file changes
- #288: SDK foundations (TS/Python/Go)

**🔧 Developer Tools (3 PRs)**
- #935: Per-skill usage telemetry
- #926: Slash commands (/btw, /fast, /insights, /steer, /queue)
- #931: Replace completion probe với catalog check (fix #919)

**📦 Dependencies**
- #928: Bump marked 18.0.0 → 18.0.2 (security)
- #259: Migrate CI to Blacksmith runners

### Xu hướng phát triển

1. **Provider-agnostic architecture**: Dự án đang xây dựng abstraction layer mạnh mẽ để hỗ trợ nhiều LLM providers
2. **Cloud-native deployment**: Focus vào remote sandbox và containerization
3. **Developer ecosystem**: Đầu tư vào SDKs và tooling cho third-party integrations
4. **UX polish**: Nhiều improvements nhỏ nhưng có impact lớn đến usability

## 🌟 Điểm nổi bật cộng đồng

### Issues được quan tâm

**#922 - Chat scrolling bug** (CLOSED, 3 comments)
- Vấn đề: ResizeObserver hijack user scroll intent
- Impact: Người dùng không thể scroll up khi content đang stream
- Resolution: PR #925 thay thế bằng single IntersectionObserver
- **Insight**: Bug này ảnh hưởng trực tiếp đến core UX, được ưu tiên cao

**#266 - 9router support** (CLOSED, 2 comments)
- Request: Native support cho universal AI proxy
- Status: Closed - có thể đã được giải quyết qua Zen provider (#944)
- **Insight**: Community muốn flexibility trong routing giữa providers

### PRs có tương tác

**#942 - Remote sandbox** (OPEN, 0 comments nhưng critical)
- Giải quyết pain point lớn: Docker-in-Docker không khả dụng trên nhiều cloud platforms
- Architecture inspired by sandcastle's provider pattern
- **Insight**: Đây là blocker cho enterprise adoption

## 🐛 Ổn định & Bugs

### Bugs đã fix (6 issues)

✅ **#922**: Chat scrolling hijacked by ResizeObserver → Fixed in #925  
✅ **#919**: Model discovery timeout với large models → Fixed in #931 (catalog check thay vì completion probe)  
✅ **#927**: Missing re-auth button cho expired OAuth → Fixed in #930  
✅ **#938**: System-notice text overflow → Fixed in #941  
✅ **#939**: SIGTERM not handled → Fixed in #940  
✅ **#936**: Clipboard broken on HTTP → Fixed với fallback

### Bugs đang mở (3 issues)

🔴 **#947**: Bug report trống - chưa có thông tin chi tiết  
🔴 **#946**: Chat doesn't auto-scroll when at end - có thể related to #922  
🔴 **#945**: Chat layout broken - too wide  
🔴 **#937**: Settings/terminal tmux error  

**Phân tích:**
- 3/4 bugs mới liên quan đến chat UI → Có thể do refactor gần đây
- #946 và #945 cần được ưu tiên vì ảnh hưởng core UX
- Bug fix velocity rất cao: 6 bugs closed trong 1 ngày

## 💡 Yêu cầu tính năng

### Đã implement

**Slash commands suite** (#926):
- `/btw` - Ephemeral side questions không pollute session
- `/fast` - Quick responses với lightweight model
- `/insights` - Session analytics và skill usage
- `/steer` - Adjust agent behavior mid-conversation
- `/queue` - Background task management

**Auto-features**:
- Auto-generate session titles (#933, #197)
- Auto-trigger code indexing (#921)

### Patterns đáng chú ý

1. **Auxiliary model concept**: Sử dụng lightweight models cho non-critical tasks (titles, summaries)
2. **Ephemeral interactions**: `/btw` command cho quick questions không cần persistence
3. **Observability**: Telemetry và insights commands cho power users

## 👥 Phản hồi người dùng

### Pain points được giải quyết

1. **Deployment friction**: Remote sandbox (#942) giải quyết Docker-in-Docker limitation
2. **Provider lock-in**: Multi-provider support giảm dependency vào single vendor
3. **Session management**: Auto-titles giúp organize conversations tốt hơn
4. **Clipboard issues**: HTTP fallback cho self-hosted deployments

### User experience improvements

- Message action bar (#932): Copy/Retry/Fork ngay trong chat
- Voice controls (#943): Hide buttons khi không cần thiết
- Graceful shutdown (#940): Không mất data khi restart

### Community engagement

- **Contributors**: @penso (15 PRs), @gaarf (3 PRs), @Cstewart-HC (2 PRs)
- **Bot activity**: dependabot, blacksmith-sh automation
- **Response time**: Bugs được fix trong vòng 24h

## 🗺️ Backlog & Roadmap

### Đang trong pipeline

**#942 - Remote sandbox** (OPEN):
- Multi-backend architecture (Vercel, Daytona, Firecracker)
- Critical cho cloud deployments
- Cần review và testing

**#944 - Zen provider** (OPEN):
- OpenCode.ai integration
- Multi-protocol support
- Đang chờ merge

**#943 - Voice controls** (OPEN):
- Config-driven UI visibility
- Part of voice feature refinement

### Technical debt

- **#937**: Terminal/tmux integration issues cần investigation
- **Chat UI stability**: 3 open issues (#945, #946, #947) cần consolidation
- **SDK maturity**: #288 đã merge nhưng cần documentation và examples

### Xu hướng phát triển tiếp theo

Dựa trên activity patterns:

1. **Multi-modal support**: Voice features đang được polish
2. **Enterprise readiness**: Remote sandbox, OAuth, graceful shutdown
3. **Developer ecosystem**: SDKs, telemetry, observability tools
4. **Provider diversity**: Tiếp tục expand LLM provider support
5. **UX refinement**: Focus vào chat experience và session management

---

## 🎯 Kết luận

Moltis đang trong giai đoạn **rapid iteration** với velocity cực cao (21 PRs/day). Dự án đang balance tốt giữa:
- ✅ Feature development (providers, commands, sandbox)
- ✅ Bug fixes (6 critical bugs resolved)
- ✅ Infrastructure (SDKs, CI/CD, deployment)
- ✅ UX polish (auto-scroll, titles, actions)

**Điểm mạnh**: Fast response to user feedback, strong contributor activity, clear architectural vision

**Điểm cần chú ý**: Chat UI có signs of instability (3 new bugs), cần consolidation và testing trước khi ship thêm features

**Outlook**: Dự án đang build foundation vững chắc cho enterprise adoption và ecosystem growth. Remote sandbox và multi-provider support là game-changers cho self-hosted deployments.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo Phân tích Hệ sinh thái CoPaw - Ngày 2026-05-01

## 🎯 Tóm tắt hôm nay

Ngày 30/04 - 01/05 chứng kiến hoạt động cực kỳ sôi động với **16 PRs** và **37 issues** được xử lý. Đội ngũ tập trung vào việc sửa lỗi nghiêm trọng liên quan đến **kênh WeChat/WeCom** (lỗi event loop, mất phản hồi), cải thiện **trải nghiệm UI** (dark mode, code highlighting, responsive), và tăng cường **bảo mật** (path traversal vulnerability). Phiên bản **v1.1.5.post1** được phát hành với nhiều hotfix quan trọng.

---

## 🚀 Releases

### **v1.1.5.post1** (30/04/2026)

**Các thay đổi chính:**

✅ **Sửa lỗi nghiêm trọng WeChat/WeCom:**
- Khắc phục lỗi "Thinking..." bị kẹt khi xử lý task phức tạp (#3950)
- Sửa race condition trong reconnect logic (#3963)
- Giải quyết cross-loop runtime error (#3978)

✅ **Cải thiện Feishu Channel:**
- Nâng cấp tool_guard approval lên interactive card buttons (#3941)
- Thêm FeishuCardHandler để xử lý tương tác card tập trung

✅ **UI/UX Enhancements:**
- Sửa lỗi CodeMirror line wrapping trong tool call blocks (#3960)
- Loại bỏ deprecated antd v5 APIs (#3981)

✅ **Bảo mật:**
- Ngăn chặn path traversal vulnerability (#3973, liên quan #3955)

**Ý nghĩa:** Đây là bản hotfix quan trọng giải quyết các vấn đề blocking nghiêm trọng về channels và bảo mật, đảm bảo tính ổn định cho production.

---

## 📈 Tiến độ dự án

### **Xu hướng phát triển chính:**

🔧 **Channel Stability (Ưu tiên cao nhất)**
- **WeChat/WeCom:** 5 PRs liên quan (#3978, #3963, #3950, #3948, #3300)
  - Vấn đề cốt lõi: asyncio event loop conflicts giữa main loop và WebSocket loop
  - Giải pháp: Dispatch SDK calls đến đúng loop, cải thiện heartbeat logic
  - Thêm `share_session_in_group` toggle để kiểm soát scope conversation

- **Feishu:** Nâng cấp lên interactive cards (#3941, #3982)
  - Chuyển từ text-command sang one-click approval
  - Thêm docs hint cho subscription setup

🎨 **Frontend Improvements**
- Dark mode code highlighting (#3587) ✅ Closed
- CodeMirror wrapping fix (#3960) ✅ Merged
- Antd v5 migration (#3981) ✅ Merged
- Wide-screen mode request (#3146) ✅ Closed
- Timestamp display (#3038) ✅ Closed

🔐 **Security Hardening**
- Path traversal fix (#3973) - Reject absolute paths trong static file serving
- Liên quan đến #3955 (Windows file traversal vulnerability)

🆕 **New Features in Pipeline**
- GitHub Copilot provider support (#3846) 🔄 Under Review
- Knowledge base feature (#3989) 🔄 First-time contributor
- Ralph-loop magic command (#3972) - Self-referential task execution

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

1️⃣ **#3955 - Windows File Traversal Vulnerability** (12 comments, 👍 0)
   - Lỗ hổng bảo mật nghiêm trọng cho phép truy cập tùy ý file trên Windows
   - Đã được fix trong #3973 và v1.1.5.post1

2️⃣ **#3853 - Debian Page Freeze Bug** (10 comments)
   - Trang đóng băng sau khi save model settings trên Debian
   - Chỉ xảy ra với non-root user
   - Status: Closed (có thể đã fix)

3️⃣ **#2757 - WeChat Channel Disconnection** (7 comments)
   - Kênh WeChat thường xuyên ngắt kết nối
   - Liên quan đến các fix trong v1.1.5.post1

4️⃣ **#3350 - UI Lag with 200+ Conversation Rounds** (6 comments)
   - Trang scroll cực kỳ lag sau 200+ lượt hội thoại
   - Yêu cầu phương pháp luận cho long-running projects

---

## 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng đã fix:**

✅ **WeChat/WeCom Issues:**
- `RuntimeError: Future attached to a different loop` (#3296, #3300)
- Stream placeholder stuck on "Thinking..." (#3947, #3950)
- Double reconnect race condition (#3963)
- Cross-loop disconnect (#3963)

✅ **UI/Frontend:**
- CodeMirror overflow (#3960)
- Deprecated antd APIs warnings (#3981)

✅ **Security:**
- Path traversal vulnerability (#3955, #3973)

### **Bugs đang mở:**

🔴 **Critical:**
- #3976 - Session cleanup mechanism cancels running tasks (2 comments)
- #3977 - Memory search error: `'list' object has no attribute 'get'` (3 comments)
- #3980 - Running Config API returns 404 Not Found (2 comments)

🟡 **High Priority:**
- #3957 - Agent workspace switches incorrectly when receiving channel messages (5 comments)
- #3969 - `FunctionCallOutput` validation error + `loop_config.json` corruption (2 comments)
- #3984 - Context compaction splits user/assistant pairs, causing orphaned messages (1 comment)
- #3985 - DeepSeek `reasoning_content` not passed back in multi-turn, causing HTTP 500 (1 comment)
- #3986 - Cron scheduler never auto-triggers enabled jobs (1 comment)

🟢 **Medium:**
- #3861 - Console page conversation interruptions (3 comments)
- #3967 - Workspace confusion between core config and user files (3 comments)

---

## 💡 Yêu cầu tính năng

### **Đã được implement/merged:**

✅ **#3972 - /ralph-loop magic command** (Closed)
   - Self-referential task execution loop
   - Tương tự Ralph Loop concept từ oh-my-openagent

✅ **#3866 - Auto-focus input after New Chat** (Closed)
   - Cải thiện UX workflow

✅ **#3146 - Wide-screen mode** (Closed)
   - Tận dụng không gian màn hình cho tables

### **Đang được đề xuất:**

🔄 **#3516 - Hermes Evolution Concept** (4 comments)
   - Tích hợp Hermes để agent tự động tiến hóa
   - Đang được thảo luận

🔄 **#3987 - Team/Multi-agent Orchestration** (1 comment)
   - Tính năng team như Accio Work
   - Hỗ trợ multi-agent scheduling

🔄 **#3983 - Artifact-style Code/Preview Dual View** (1 comment)
   - Claude/GitHub Preview style
   - Hiện tại chỉ có Mermaid rendering

🔄 **#3979 - Windows Client Background Service** (2 comments)
   - Cho phép client chạy background khi đóng window
   - Tray icon support

---

## 👥 Phản hồi người dùng

### **Trải nghiệm tích cực:**

👍 **Channel Improvements:**
- Feishu interactive cards được đánh giá cao
- WeChat stability fixes giải quyết pain points lớn

👍 **UI/UX Enhancements:**
- Dark mode code highlighting
- Auto-focus input
- Wide-screen mode

### **Pain points chính:**

😓 **Performance Issues:**
- #3350: UI lag nghiêm trọng với 200+ rounds conversation
- #3971: Windows exe white screen on first launch (7/7 machines)
- #3964: Python-based Windows version resource-heavy, slow

😓 **Stability Concerns:**
- #2757, #3937: WeChat channel frequent disconnections
- #3861: Console conversation interruptions
- #3976: Session cleanup cancels running tasks

😓 **UX Confusion:**
- #3967: Core config vs user workspace separation unclear
- #3965: Channel messages not showing input in chat window
- #3975: History shows system commands (Mission Phase instructions)

### **Yêu cầu documentation:**

📚 **#3982 - Feishu card.action.trigger subscription**
   - Cần docs rõ ràng hơn cho setup

📚 **#3968 - .gitignore conflicts with AGENT.md**
   - Cần clarification về file structure

---

## 🗺️ Backlog & Roadmap

### **Đang trong pipeline (Under Review):**

🔄 **#3846 - GitHub Copilot Provider** (First-time contributor)
   - Hỗ trợ GitHub Copilot models
   - Đang review

🔄 **#3989 - Knowledge Base Feature** (First-time contributor)
   - Thêm knowledge management
   - Mới submit 01/05

🔄 **#3605 - WeChat/Weixin Identifier Unification**
   - Fix identity mismatch trong registry

🔄 **#3958, #3959 - Chat Session Persistence**
   - Restore chat khi switch agents
   - Keep Chat mounted khi navigate

### **Cần ưu tiên:**

🎯 **Performance Optimization:**
- Long conversation UI lag (#3350)
- Windows client performance (#3964, #3971)
- Context management optimization

🎯 **Multi-agent Orchestration:**
- Team feature (#3987)
- Agent workspace isolation (#3957)

🎯 **Developer Experience:**
- Hermes integration (#3516)
- Better error handling (#3969, #3977)
- Cron scheduler reliability (#3986)

### **Technical Debt:**

⚠️ **Context Management:**
- #3984: Context compaction logic needs refinement
- Memory search implementation (#3977)

⚠️ **API Stability:**
- #3980: Running Config endpoint missing
- #3985: DeepSeek reasoning_content handling

⚠️ **Build System:**
- #3988: conda-pack conflicts with pip install
- #3971: Windows exe first-run issues

---

## 📊 Thống kê tổng quan

- **Total Issues:** 37 (20 closed, 17 open)
- **Total PRs:** 16 (14 closed/merged, 2 open)
- **Release:** 1 (v1.1.5.post1)
- **First-time Contributors:** 3 (#3989, #3958, #3959, #3846)
- **Critical Bugs Fixed:** 5+
- **New Features Merged:** 3+

**Tốc độ xử lý:** Rất nhanh - hầu hết issues/PRs được resolve trong 1-2 ngày.

**Sức khỏe dự án:** ⭐⭐⭐⭐☆ (4/5)
- ✅ Responsive team
- ✅ Active development
- ✅ Security-conscious
- ⚠️ Cần cải thiện performance & stability cho production use

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# 📊 Báo cáo Phân tích EasyClaw - Ngày 01/05/2026

## 🎯 Tóm tắt hôm nay

Dự án **EasyClaw** (gaoyangz77/easyclaw) có một ngày tương đối yên tĩnh với hoạt động chính là phát hành **v1.8.10** vào ngày 30/04. Không có issues hoặc pull requests mới được cập nhật trong 24 giờ qua, cho thấy đây có thể là giai đoạn ổn định sau release hoặc đang trong kỳ nghỉ lễ.

---

## 🚀 Releases

### **v1.8.10 - RivonClaw** (Phát hành: 30/04/2026)

**Điểm nổi bật:**

- **Vấn đề macOS Gatekeeper**: Release này tập trung vào việc hướng dẫn người dùng macOS xử lý cảnh báo bảo mật khi ứng dụng chưa được ký số
- **Hướng dẫn chi tiết**: Cung cấp command line rõ ràng để bypass quarantine flag
- **Hỗ trợ đa ngôn ngữ**: Documentation song song tiếng Anh và tiếng Trung

**Phân tích:**

Việc release notes tập trung vào hướng dẫn xử lý Gatekeeper cho thấy:
- Dự án đang nhận được phản hồi từ người dùng macOS về vấn đề này
- Team chưa có Apple Developer certificate để ký ứng dụng (chi phí $99/năm)
- Đây là giải pháp tạm thời nhưng hiệu quả cho ứng dụng open-source

**Rủi ro tiềm ẩn:**
- Yêu cầu `sudo` có thể khiến một số người dùng không kỹ thuật e ngại
- Cần cân nhắc code signing trong tương lai để cải thiện trải nghiệm người dùng

---

## 📈 Tiến độ dự án

**Trạng thái:** 🟡 Giai đoạn ổn định

- ✅ Không có PR mới → Có thể đã merge xong các tính năng cho v1.8.10
- ✅ Không có issue mới → Người dùng chưa báo cáo bug nghiêm trọng sau release
- ⚠️ Hoạt động thấp có thể do:
  - Kỳ nghỉ lễ (1/5 - Ngày Quốc tế Lao động)
  - Giai đoạn quan sát sau release để thu thập feedback
  - Team đang làm việc offline trên các tính năng lớn

---

## 💬 Điểm nổi bật cộng đồng

**Không có dữ liệu trong 24h qua**

Dựa trên release notes, có thể suy luận:
- Cộng đồng người dùng macOS đang tích cực (cần hướng dẫn riêng)
- Người dùng Trung Quốc chiếm tỷ lệ đáng kể (documentation song ngữ)

---

## 🐛 Ổn định & Bugs

**Không có bug report mới trong 24h**

**Đánh giá:**
- ✅ Tín hiệu tích cực: v1.8.10 có vẻ ổn định
- ⏳ Cần theo dõi thêm 2-3 ngày để xác nhận
- 🔍 Vấn đề macOS Gatekeeper không phải bug thực sự, mà là hạn chế về quy trình phân phối

---

## 💡 Yêu cầu tính năng

**Không có feature request mới**

**Gợi ý tiềm năng** (dựa trên context):
- 🍎 **Code signing cho macOS**: Đầu tư Apple Developer Program để loại bỏ friction
- 📦 **Notarization**: Tự động hóa quy trình notarize app cho macOS
- 🪟 **Windows signing**: Nếu có bản Windows, cần xem xét SmartScreen issues tương tự

---

## 👥 Phản hồi người dùng

**Không có feedback công khai trong 24h**

**Phân tích gián tiếp:**
- Release notes phản ứng với vấn đề thực tế → Team lắng nghe người dùng
- Hướng dẫn chi tiết cho thấy sự quan tâm đến user experience
- Documentation song ngữ thể hiện commitment với thị trường quốc tế

---

## 🗺️ Backlog & Roadmap

**Không có thông tin roadmap công khai**

**Dự đoán ưu tiên tiếp theo:**

1. **Ngắn hạn (1-2 tuần):**
   - Thu thập feedback về v1.8.10
   - Xử lý các bug reports nếu có
   - Cải thiện documentation dựa trên câu hỏi người dùng

2. **Trung hạn (1-3 tháng):**
   - Cân nhắc code signing solution
   - Tối ưu hóa distribution pipeline
   - Có thể có v1.9.x với tính năng mới

3. **Dài hạn:**
   - Mở rộng platform support
   - Tăng cường automation trong release process

---

## 📌 Kết luận

**EasyClaw** đang trong giai đoạn **ổn định sau release**, với focus vào việc hỗ trợ người dùng macOS. Sự yên tĩnh trong 24h qua là bình thường cho ngày lễ và giai đoạn post-release. 

**Điểm mạnh:**
- ✅ Responsive với user pain points
- ✅ Documentation chất lượng
- ✅ Hỗ trợ đa ngôn ngữ

**Cần cải thiện:**
- ⚠️ Code signing để nâng cao trust và UX
- ⚠️ Tăng transparency về roadmap
- ⚠️ Khuyến khích community engagement

**Đánh giá tổng thể:** 🟢 **Healthy project** với development process chuyên nghiệp

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*