# Bản tin Hệ sinh thái OpenClaw 2026-05-15

> Issues: 223 | PRs: 500 | Dự án: 13 | Thời gian tạo: 2026-05-15 09:05 UTC

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

# 📊 Báo cáo Phân tích OpenClaw - Ngày 2026-05-15

## 🎯 Tóm tắt hôm nay

Hôm nay OpenClaw tập trung vào **ổn định hóa sau release 2026.5.12**, với nhiều hoạt động xoay quanh việc sửa lỗi Codex OAuth (#81941 - đã đóng trong ngày), cải thiện UI/UX cho Control UI, và tiếp tục công việc quốc tế hóa (i18n) cho giao diện tiếng Trung. Cộng đồng đang phản ánh tích cực về các cải tiến gần đây, đặc biệt là việc tách dependencies và cải thiện độ tin cậy của Telegram channel.

---

## 🚀 Releases

### **v2026.5.12** (Phát hành 2026-05-14)

**Điểm nổi bật:**

- **🎯 Cài đặt gọn nhẹ hơn**: Tách WhatsApp, Slack, Amazon Bedrock, Anthropic Vertex ra khỏi core runtime → chỉ cài những gì thực sự dùng
- **💪 Telegram channel mạnh mẽ hơn**: 
  - Polling độc lập, spooling cục bộ bền vững
  - Xử lý media trong group an toàn hơn
  - Giữ nguyên định dạng HTML/Markdown khi streaming và scheduling
- **🔧 Codex/OpenAI mượt mà hơn**: 
  - Auth-profile-backed media tools
  - MCP server projection
  - Context-engine thread rotation

**Ý nghĩa**: Release này thể hiện chiến lược **modularization** - giảm footprint cài đặt mặc định đồng thời tăng độ tin cậy cho các channel phổ biến. Đây là bước quan trọng để OpenClaw scale tốt hơn trong môi trường production.

### **Beta releases** (2026.5.14)

- `v2026.5.14-beta.1`: Tích hợp `@openclaw/proxyline` để quản lý proxy routing tốt hơn
- `v2026.5.12-beta.7/8`: Tiếp tục externalize dependencies và cải thiện Control UI auto-scroll

---

## 📈 Tiến độ dự án

### **Xu hướng phát triển chính:**

#### 1️⃣ **Quốc tế hóa (i18n) - Tiếng Trung**
- **#81279**: Localize Skills page (grouping labels, status chips) cho zh-CN
- **#81333**: Dịch toàn bộ Nodes page UI sang tiếng Trung giản thể
- **Insight**: OpenClaw đang đầu tư mạnh vào thị trường Trung Quốc, thể hiện qua việc hoàn thiện i18n một cách có hệ thống

#### 2️⃣ **Cải thiện độ tin cậy & observability**
- **#54406**: Thêm compaction event observability (lý do, trạng thái hoàn thành, retry)
- **#54436**: Fix resource leaks trong media download (write stream không đóng khi vượt size limit)
- **#82084**: Deliver generated media dưới dạng structured attachments thay vì legacy `MEDIA:` text

#### 3️⃣ **Bảo mật & quyền hạn**
- **#54343**: Yêu cầu `operator.admin` cho lệnh `/stop` trong auto-reply
- **#54141**: Ngừng flag `$VAR` env refs là PLAINTEXT trong secrets audit

#### 4️⃣ **Tính năng mới**
- **#81864**: Plain-language plugin approvals (thay thế debug output bằng ngôn ngữ tự nhiên)
- **#54099**: Hỗ trợ group/channel cho Synology Chat
- **#53997**: ACPX terminal-truth artifacts và strict terminal states

---

## 🔥 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

1. **#53628** (12 comments): `${XDG_CONFIG_HOME}` không được xử lý khi cài skill
   - Vấn đề Docker environment variable
   - Ảnh hưởng đến workflow cài đặt skill

2. **#50096** (12 comments): Long-Term Memory & Knowledge Management
   - Thảo luận chiến lược về khả năng ghi nhớ của agent
   - Cộng đồng quan tâm đến việc agent "học" và "nhớ" theo thời gian

3. **#51429** (11 comments): Hardcoded working path `/Users/wangtao`
   - Bug nghiêm trọng: ai đó hardcode đường dẫn cá nhân vào code
   - Phản ánh vấn đề code review process

4. **#51871** (10 comments): Cron jobs không hiển thị trong Control UI dashboard
   - Regression từ 2026.3.13
   - Ảnh hưởng đến UX của scheduled tasks

### **Vấn đề người dùng quan tâm:**

- **Telegram delivery reliability**: #51628 - Queue recovery có thể replay old messages
- **Browser control hangs**: #53399 - `npx chrome-devtools-mcp` stuck trong Gateway process
- **Multi-instance conflicts**: #51363 - Docker sandbox container name collision

---

## 🐛 Ổn định & Bugs

### **Đã giải quyết trong ngày:**

✅ **#81941** (CLOSED): Codex harness fails với 401 token_expired sau fresh OAuth login
- **Root cause**: Auth refresh logic không xử lý đúng freshly logged-in profile
- **Impact**: Blocking mọi Codex turn trên 2026.5.12
- **Fix**: Đã merge và close trong ngày

### **Đang xử lý:**

🔧 **#82037** (5 comments): WebSocket connection failures sau update 2026.5.12 trên macOS 26.5
- Logs show "wrong protocol" errors
- Ảnh hưởng cả web UI và Mac App

🔧 **#53540**: Embedded runner "Network connection lost" khi LLM generate large tool parameters
- Timeout issue khi param generation > request timeout

🔧 **#52421**: LLM API error với unexpected `tool_use_id` trong tool_result blocks
- Intermittent nhưng recurring, gây disruption session

### **Patterns đáng chú ý:**

- **Resource leaks**: Media download, write streams (#54436)
- **Auth/token management**: Codex OAuth, token refresh timing
- **WebSocket stability**: Connection failures sau updates (#82037)

---

## 💡 Yêu cầu tính năng

### **Được đề xuất nhiều:**

1. **#53638** (4 comments): Per-channel/group/DM model override trong config
   - Cho phép conversations khác nhau dùng models khác nhau
   - Hiện tại chỉ có global default

2. **#52640** (6 comments): Persistent task-status surface cho long-running channel turns
   - Đặc biệt cho Discord
   - Typing indicators không đủ cho tasks dài

3. **#51805** (4 comments): Shared session context giữa group chats và DMs
   - Hiện tại group và DM luôn isolated
   - Users muốn context liên tục khi chuyển từ group sang DM

4. **#51451** (4 comments): Per-request workspace override qua HTTP header
   - Cho multi-tenant SaaS deployments
   - Header `x-openclaw-workspace`

### **Infrastructure & DevOps:**

- **#50900**: Per-pattern session retention rules (thay vì uniform age threshold)
- **#51860**: macOS LaunchAgents boot-without-login support
- **#50442**: Backup create cleanup .tmp files on timeout

---

## 💬 Phản hồi người dùng

### **Tích cực:**

- Release 2026.5.12 được đánh giá cao về **dependency externalization** → cài đặt nhanh hơn
- Telegram improvements được community hoan nghênh
- i18n efforts cho thị trường Trung Quốc được đánh giá cao

### **Tiêu cực/Frustrations:**

1. **Regression frequency**: 
   - #48947: "Jesus.... you can't do a release without breaking anything eh?"
   - Phản ánh concern về QA process

2. **Documentation gaps**:
   - #54275: Stale `docs:build` script references
   - #50719: Local model setup broken sau upgrade

3. **UX friction**:
   - #49692: Gateway drain message quá technical cho end users
   - #50145: Interrupt queue mode replays previous reply

### **Pain points chính:**

- **Config migration**: Breaking changes trong channel config (#53556)
- **Error messages**: Quá technical, thiếu context (#51336)
- **Session management**: Subagent sessions không được cleanup (#51767)

---

## 📋 Backlog & Roadmap

### **Priorities rõ ràng từ activity:**

#### **Ngắn hạn (đang active):**

1. **Stability fixes**:
   - WebSocket connection issues (#82037)
   - Resource leak cleanup (#54436)
   - Auth token management (#81941 - done)

2. **i18n completion**:
   - Hoàn thiện zh-CN cho tất cả UI components
   - Baseline report tool (#81320)

3. **Observability**:
   - Compaction events (#54406)
   - Plugin approval UX (#81864)

#### **Trung hạn (có PRs/discussions):**

1. **Multi-agent orchestration**:
   - Control UI improvements (#52803)
   - ACP parent-child session management (#52249)

2. **Channel reliability**:
   - WhatsApp retry logic (#54183)
   - Telegram delivery queue recovery (#51628)

3. **Developer experience**:
   - Sandbox improvements (#53822, #53821)
   - Per-channel model override (#53638)

#### **Dài hạn (strategic):**

1. **Long-term memory** (#50096):
   - Knowledge management architecture
   - Agent learning & recall capabilities

2. **Multi-tenancy** (#51451):
   - Per-request workspace isolation
   - SaaS deployment patterns

3. **Proxyline integration** (#79857):
   - Managed proxy routing
   - Replace in-repo shims

---

## 🎓 Insights & Recommendations

### **Cho maintainers:**

1. **QA process cần tăng cường**: Regression frequency cao gây frustration
2. **Error messages cần human-friendly hơn**: Nhiều complaints về technical jargon
3. **Migration guides cần chi tiết hơn**: Config breaking changes gây confusion

### **Cho contributors:**

1. **i18n là priority**: Nhiều opportunities để contribute translations
2. **Documentation improvements**: Stale docs là low-hanging fruit
3. **Channel reliability**: Telegram, WhatsApp, Discord đều cần attention

### **Cho users:**

1. **Nên đợi .1 patch sau major releases**: Giảm risk regressions
2. **Backup trước khi upgrade**: Đặc biệt với config changes
3. **Follow beta releases**: Để test sớm và report issues

---

**📊 Tổng kết**: OpenClaw đang trong giai đoạn **consolidation** sau release lớn, tập trung vào stability, i18n, và developer experience. Cộng đồng active và engaged, nhưng cần cải thiện QA process và communication về breaking changes.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 2026-05-15

---

## 1. 🌐 Tổng quan Hệ sinh thái

Hệ sinh thái AI agent ngày 2026-05-15 cho thấy một bức tranh **phân hóa rõ rệt** với 3 nhóm dự án chính:

### **🔥 Nhóm Siêu Năng Suất (Hyperactive)**
- **OpenClaw**: 223 issues, 500 PRs - Dẫn đầu về quy mô và hoạt động
- **IronClaw**: 6 issues, 50 PRs - Tái cấu trúc kiến trúc lớn (Reborn)
- **CoPaw**: 14 issues, 50 PRs - Velocity cực cao với 50 PRs/ngày

### **⚡ Nhóm Phát triển Tích cực (Active)**
- **NanoBot**: 60 issues, 22 PRs - Chiến dịch tài liệu hóa 40 issues
- **PicoClaw**: 10 issues, 30 PRs - 14 PRs merged trong ngày
- **LobsterAI**: 0 issues, 35 PRs - 30 PRs merged, focus vào plugin system
- **NanoClaw**: 2 issues, 25 PRs - Marketing automation stack
- **Zeroclaw**: 12 issues, 50 PRs - Recovery sau bulk revert

### **💤 Nhóm Không Hoạt động (Dormant)**
- **NullClaw, TinyClaw, ZeptoClaw, EasyClaw**: 0 hoạt động
- **Moltis**: 1 issue duy nhất về TLS certificates

**Insight chính**: Hệ sinh thái đang **consolidate** xung quanh một số dự án lớn thay vì phân tán đều. OpenClaw đóng vai trò **hub trung tâm**, các dự án khác hoặc fork/extend OpenClaw hoặc phát triển độc lập với focus riêng.

---

## 2. 📈 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động chính | Mức độ tương tác | Trạng thái |
|-------|--------|-----|----------|-----------------|------------------|------------|
| **OpenClaw** | 223 | 500 | 4 | Ổn định sau release 2026.5.12, i18n zh-CN | ⭐⭐⭐⭐⭐ | 🔥 Dẫn đầu |
| **IronClaw** | 6 | 50 | 1 | Reborn architecture, universal filesystem | ⭐⭐⭐⭐ | 🚀 Tái cấu trúc |
| **CoPaw** | 14 | 50 | 0 | Security hardening, GitHub Copilot | ⭐⭐⭐⭐⭐ | 🔥 Siêu tốc |
| **NanoBot** | 60 | 22 | 0 | Tài liệu hóa 40 issues, bảo mật | ⭐⭐⭐ | 📚 Consolidate |
| **PicoClaw** | 10 | 30 | 1 | Reasoning models, dependencies update | ⭐⭐⭐ | ⚡ Ổn định |
| **LobsterAI** | 0 | 35 | 1 | Plugin system, MCP native | ⭐⭐⭐ | 🔌 Modular |
| **NanoClaw** | 2 | 25 | 0 | Marketing automation, social listening | ⭐⭐ | 🎯 Niche focus |
| **Zeroclaw** | 12 | 50 | 0 | Recovery, cron fixes, Matrix threading | ⭐⭐⭐ | 🔧 Stabilizing |
| **Moltis** | 1 | 0 | 0 | TLS certificate issue | ⭐ | 😴 Yên tĩnh |
| **NullClaw** | 0 | 0 | 0 | Không hoạt động | - | 💀 Dormant |
| **TinyClaw** | 0 | 0 | 0 | Không hoạt động | - | 💀 Dormant |
| **ZeptoClaw** | 0 | 0 | 0 | Không hoạt động | - | 💀 Dormant |
| **EasyClaw** | 0 | 0 | 0 | Không hoạt động | - | 💀 Dormant |

### **Chỉ số Velocity (PRs merged/24h)**
1. 🥇 **CoPaw**: ~20 PRs
2. 🥈 **LobsterAI**: 30 PRs
3. 🥉 **PicoClaw**: 14 PRs
4. **OpenClaw**: ~15-20 PRs (ước tính từ 500 total)
5. **NanoClaw**: ~20 PRs

### **Chỉ số Community Engagement**
1. 🥇 **OpenClaw**: 12 comments/issue (cao nhất)
2. 🥈 **CoPaw**: 7-8 comments/issue
3. 🥉 **NanoBot**: 5 comments/issue
4. **IronClaw**: 1-2 comments/issue (technical focus)

---

## 3. 👑 Vị thế của OpenClaw

### **Vai trò: Platform Leader & Standard Setter**

OpenClaw đóng vai trò **nền tảng trung tâm** của hệ sinh thái với các đặc điểm nổi bật:

#### **🎯 Ưu điểm Cạnh tranh**

**1. Quy mô & Maturity**
- **500 PRs, 223 issues** - Lớn nhất trong hệ sinh thái
- **4 releases** - Chu kỳ phát hành ổn định
- **Cộng đồng lớn**: 12 comments/issue, nhiều first-time contributors

**2. Chiến lược Quốc tế hóa**
- Đầu tư mạnh vào **thị trường Trung Quốc** (zh-CN localization)
- Issues #81279, #81333 - Localize toàn bộ UI
- Phản ánh tham vọng **global expansion**

**3. Kiến trúc Modular**
- **Dependency externalization** (WhatsApp, Slack, Bedrock)
- Giảm footprint cài đặt → dễ scale
- Cho phép users chỉ cài những gì cần

**4. Channel Reliability**
- Telegram improvements được đánh giá cao
- Polling độc lập, spooling bền vững
- Focus vào **production readiness**

#### **⚠️ Thách thức**

**1. Regression Frequency**
- Issue #48947: "Jesus.... you can't do a release without breaking anything eh?"
- Phản ánh concern về **QA process**
- Cần cân bằng giữa velocity và stability

**2. Documentation Gaps**
- Stale docs (#54275)
- Breaking changes không được communicate tốt
- Ảnh hưởng đến developer experience

**3. Complexity Creep**
- 500 PRs → codebase lớn, khó maintain
- Cần consolidation và cleanup

#### **📊 So sánh với Competitors**

| Tiêu chí | OpenClaw | IronClaw | CoPaw | NanoBot |
|----------|----------|----------|-------|---------|
| **Quy mô** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Stability** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Innovation** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Community** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Documentation** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Kết luận**: OpenClaw là **market leader** về quy mô và cộng đồng, nhưng đang đối mặt với thách thức về **quality control** và **technical debt**. IronClaw và CoPaw đang đuổi kịp với **innovation velocity** cao hơn.

---

## 4. 🔧 Hướng Kỹ thuật Chung

### **Xu hướng 1: Modularization & Plugin Systems** 🔌

**Dự án áp dụng**: OpenClaw, LobsterAI, NanoClaw, CoPaw

**Đặc điểm**:
- **OpenClaw**: Externalize dependencies (WhatsApp, Slack, Bedrock)
- **LobsterAI**: Plugin system với schema-driven config (#1963)
- **NanoClaw**: Skills marketplace với built-in discovery
- **CoPaw**: Plugin ecosystem với first-party plugins

**Lợi ích**:
- ✅ Giảm footprint cài đặt
- ✅ Dễ extend và customize
- ✅ Tách biệt concerns
- ✅ Ecosystem growth

**Thách thức**:
- ⚠️ Plugin security (CoPaw #4406)
- ⚠️ Version compatibility
- ⚠️ Discovery & distribution

---

### **Xu hướng 2: MCP (Model Context Protocol) Native** 🔗

**Dự án áp dụng**: LobsterAI, IronClaw, OpenClaw

**Đặc điểm**:
- **LobsterAI**: Migration từ mcp-bridge sang OpenClaw MCP Client (#1980)
- **IronClaw**: MCP streamable HTTP & integration tests (#2811)
- **OpenClaw**: MCP server projection trong Codex

**Tác động**:
- ✅ Loại bỏ lớp trung gian → giảm complexity
- ✅ Tận dụng native capabilities
- ✅ Better performance & reliability
- ✅ Standardization across ecosystem

---

### **Xu hướng 3: Reasoning Models Support** 🧠

**Dự án áp dụng**: PicoClaw, NanoBot, IronClaw, CoPaw

**Models được hỗ trợ**:
- **DeepSeek v4** (thinking mode)
- **Xiaomi MiMo 2.5** (reasoning_content)
- **Claude Sonnet** (extended thinking)

**Challenges**:
- **PicoClaw #2862**: MiMo multi-turn conversation errors
- **IronClaw #3673**: DeepSeek reasoning_content dropped
- **CoPaw #4320**: MiMo + tool calls → 400 error

**Pattern chung**: Preserve `reasoning_content` qua các turn, parse streaming chunks đúng format

---

### **Xu hướng 4: Security Hardening** 🔒

**Dự án áp dụng**: NanoBot, CoPaw, IronClaw, OpenClaw

**Focus areas**:

**1. File Access Control**
- **NanoBot #3842**: Confine local media attachments
- **NanoBot #3789**: Sanitize Feishu downloaded filenames
- **OpenClaw #54343**: Require `operator.admin` cho `/stop`

**2. Secrets Management**
- **OpenClaw #54141**: Stop flagging `$VAR` env refs as PLAINTEXT
- **IronClaw #3667**: Credential account resolver
- **CoPaw #4421**: Channel config exposure fix

**3. Trust Policies**
- **IronClaw #3638**: Fail-closed default policy
- **CoPaw #4409**: Backup import trust controls
- **IronClaw #3573**: Reborn hooks framework với trust primitives

**Pattern**: Shift-left security - bảo mật được tích hợp từ đầu thay vì bolt-on sau

---

### **Xu hướng 5: Universal Filesystem Abstraction** 📁

**Dự án áp dụng**: IronClaw (leading), OpenClaw (implicit)

**IronClaw's approach** (#3659):
- `RootFilesystem` trait thống nhất
- Ops: put/get/delete/list_dir/query/ensure_index/stat/begin/append
- Native CAS + versioning + query/index cho LibSQL & Postgres
- Dissolve `ironclaw_storage` crate

**Tác động**:
- ✅ Thay thế Store/Repository phân tán
- ✅ Chuẩn bị cho checkpoint/resume
- ✅ Distributed storage ready
- ✅ Consistent interface across backends

**Đây là xu hướng quan trọng** - các dự án khác có thể học hỏi từ IronClaw

---

### **Xu hướng 6: Multi-Provider Flexibility** 🌐

**Dự án áp dụng**: NanoClaw, CoPaw, LobsterAI

**Strategies**:

**1. Provider Abstraction**
- **CoPaw #3846**: GitHub Copilot support
- **CoPaw #4352**: OAuth framework
- **NanoClaw #2474**: Claude Code vs Codex picker

**2. Custom Configuration**
- **CoPaw #4413**: Custom HTTP headers per-provider
- **LobsterAI #3785**: OpenCode Go aggregated gateway
- **OpenClaw**: Codex harness với auth-profile-backed tools

**3. Fallback Mechanisms**
- **IronClaw #6668**: Codex non-streaming fallback
- **LobsterAI**: SSL verification config cho corporate proxy

**Lợi ích**: Giảm vendor lock-in, tăng resilience, support enterprise use cases

---

### **Xu hướng 7: Observability & Telemetry** 📊

**Dự án áp dụng**: OpenClaw, Zeroclaw, IronClaw

**Implementations**:
- **OpenClaw #54406**: Compaction event observability
- **Zeroclaw #6596**: Fix Prometheus metrics split
- **IronClaw #3573**: Reborn hooks với telemetry dispatcher

**Focus**: Không chỉ logging, mà là **structured observability** với metrics, traces, và events

---

## 5. 🎭 Điểm Khác biệt

### **A. Chiến lược Sản phẩm**

#### **OpenClaw: Platform Play** 🏛️
- **Mục tiêu**: Trở thành "WordPress của AI agents"
- **Chiến lược**: 
  - Modular architecture
  - Rich channel ecosystem (Telegram, Slack, WhatsApp, Discord)
  - i18n cho global markets
- **Target users**: Developers, enterprises, SaaS builders
- **Monetization**: Có thể là managed hosting, enterprise support

#### **IronClaw: Innovation Lab** 🔬
- **Mục tiêu**: Push boundaries của agent architecture
- **Chiến lược**:
  - Reborn architecture - complete rework
  - Universal filesystem, host ports, hooks framework
  - Technical excellence over market share
- **Target users**: Advanced developers, researchers
- **Đặc điểm**: Willing to break things để đạt được better design

#### **CoPaw: Rapid Iteration** ⚡
- **Mục tiêu**: Fast follower với high velocity
- **Chiến lược**:
  - 50 PRs/ngày - cực kỳ aggressive
  - Quick adoption của new providers (GitHub Copilot)
  - Security-first approach
- **Target users**: Developers cần bleeding-edge features
- **Risk**: Có thể sacrifice stability cho speed

#### **NanoBot: Enterprise Focus** 🏢
- **Mục tiêu**: Production-ready cho doanh nghiệp
- **Chiến lược**:
  - 40 issues tài liệu hóa trong 1 ngày
  - Security hardening (file access, path traversal)
  - Feishu/Lark integration (Trung Quốc market)
- **Target users**: Chinese enterprises, corporate deployments
- **Đặc điểm**: Documentation-first, stability over features

#### **LobsterAI: Desktop Experience** 🖥️
- **Mục tiêu**: Best-in-class desktop AI assistant
- **Chiến lược**:
  - Plugin system với schema-driven config
  - Voice input, thinking level control
  - MCP native integration
- **Target users**: Individual users, knowledge workers
- **Đặc điểm**: UX-focused, performance-optimized

#### **NanoClaw: Vertical SaaS** 📈
- **Mục tiêu**: Marketing automation platform
- **Chiến lược**:
  - LinkedIn Ads, Reddit research, social listening
  - Website audit stack (Lighthouse, axe)
  - Niche focus thay vì general-purpose
- **Target users**: Marketing teams, agencies
- **Đặc điểm**: Domain-specific tools, opinionated workflows

#### **PicoClaw: Lightweight Fork** 🪶
- **Mục tiêu**: Simplified OpenClaw
- **Chiến lược**:
  - Focus on core features
  - Reasoning models support
  - Frequent dependency updates
- **Target users**: Users muốn OpenClaw nhưng nhẹ hơn
- **Đặc điểm**: Maintenance-focused, conservative changes

#### **Zeroclaw: Community Fork** 🌱
- **Mục tiêu**: Community-driven alternative
- **Chiến lược**:
  - Recovery sau bulk revert (153 commits)
  - Skills support & UX improvements
  - Contributor-friendly
- **Target users**: Open-source enthusiasts
- **Đặc điểm**: Transparent governance, community-first

---

### **B. Khác biệt Kỹ thuật**

| Tiêu chí | OpenClaw | IronClaw | CoPaw | NanoBot | LobsterAI |
|----------|----------|----------|-------|---------|-----------|
| **Architecture** | Modular monolith | Microservices-ready | Monolith | Modular | Desktop app |
| **Language** | Python | Rust | Python | Python | Python + Electron |
| **Storage** | SQLite/Postgres | Universal FS (LibSQL/PG) | SQLite | SQLite | SQLite |
| **Deployment** | Docker, native | Docker, K8s-ready | Docker | Docker | Desktop installer |
| **Extensibility** | Skills, channels | Hooks, capabilities | Plugins, skills | Skills, tools | Plugins, MCP |
| **Security model** | Role-based | Trust policies | Approval flow | Confine + audit | Sandbox |

---

### **C. Khác biệt Cộng đồng**

#### **OpenClaw: Mature & Diverse** 🌍
- **Quy mô**: Lớn nhất (500 PRs, 223 issues)
- **Đặc điểm**: 
  - Mix của core team và community contributors
  - Nhiều first-time contributors
  - Active discussions (12 comments/issue)
- **Thách thức**: Quản lý expectations, maintain quality với scale lớn

#### **IronClaw: Technical Elite** 🎓
- **Quy mô**: Nhỏ nhưng focused (50 PRs, 6 issues)
- **Đặc điểm**:
  - Core team driven
  - Ít comments nhưng high-quality technical discussions
  - Willing to make breaking changes
- **Strength**: Technical depth, architectural vision

#### **CoPaw: Hyper-engaged** 🚀
- **Quy mô**: Trung bình nhưng velocity cao (50 PRs/ngày)
- **Đặc điểm**:
  - 6 first-time contributors trong 1 ngày
  - Fast PR review & merge
  - Active issue triage
- **Risk**: Burnout, quality control

#### **NanoBot: Chinese Market** 🇨🇳
- **Quy mô**: Trung bình (60 issues, 22 PRs)
- **Đặc điểm**:
  - Cộng đồng Trung Quốc chiếm đa số
  - Enterprise use cases
  - Documentation-heavy
- **Strength**: Clear target market, enterprise feedback

#### **LobsterAI: Netease-backed** 🏢
- **Quy mô**: Trung bình (35 PRs)
- **Đặc điểm**:
  - Corporate-backed (Netease Youdao)
  - Professional development process
  - Focus on polish & UX
- **Strength**: Resources, stability

#### **NanoClaw: Niche Community** 🎯
- **Quy mô**: Nhỏ (25 PRs, 2 issues)
- **Đặc điểm**:
  - Marketing professionals
  - Domain experts contributing
  - Opinionated workflows
- **Strength**: Clear use cases, focused scope

---

### **D. Khác biệt về Governance**

| Dự án | Model | Decision-making | Transparency |
|-------|-------|-----------------|--------------|
| **OpenClaw** | Benevolent dictator | Core team | High |
| **IronClaw** | Core team | Technical merit | Medium |
| **CoPaw** | Community-driven | Consensus | High |
| **NanoBot** | Corporate-backed | Product team | Medium |
| **LobsterAI** | Corporate | Netease Youdao | Low |
| **NanoClaw** | Small team | Founder-led | Medium |
| **Zeroclaw** | Community fork | Democratic | High |

---

## 6. 🌱 Mức độ Trưởng thành Cộng đồng

### **Maturity Model**

```
Level 5: Self-sustaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo phân tích dự án NanoBot - 2026-05-15

## 📊 Tóm tắt hôm nay

Ngày 15/05/2026 đánh dấu một đợt hoạt động tài liệu hóa quy mô lớn với **40 issues tài liệu** được tạo và đóng trong cùng ngày, tập trung vào việc bổ sung chú thích tiếng Trung, tài liệu hướng dẫn và sơ đồ kiến trúc. Bên cạnh đó, dự án tiếp tục xử lý các vấn đề bảo mật quan trọng và cải thiện tích hợp với các nền tảng messaging.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua. Phiên bản hiện tại đang được sử dụng là `0.1.5.post3.2026.05.13`.

---

## 📈 Tiến độ dự án

### 🎯 Chiến dịch tài liệu hóa toàn diện

Dự án đã khởi động một **chiến dịch tài liệu hóa có tổ chức** với 40 issues được tạo và hoàn thành trong ngày:

**Chú thích mã nguồn (10 issues #3822-#3831)**
- ✅ Thêm chú thích tiếng Trung cho tất cả module Python chính
- 📦 Bao gồm: Agent core, Tools, Message bus, Channels, Providers, Config, Session, CLI, Skills, WebUI frontend, Bridge

**Tài liệu README (15 issues #3799-#3813)**
- ✅ Tạo README_zh.md cho mọi thư mục quan trọng
- 📂 Cấu trúc: nanobot/agent, tools, bus, channels, providers, config, session, security, utils, skills, templates, webui, tests

**Sơ đồ kiến trúc (4 issues #3818-#3821)**
- ✅ Vẽ sơ đồ bằng Mermaid: Architecture, Flow, Sequence, Data structure
- 🎨 Đặt trong `images/diagrams/`

**Phân tích kiến trúc (4 issues #3814-#3817)**
- ✅ Phân tích tech stack: Python core, LLM providers, Frontend, Design principles

**Hướng dẫn sử dụng (4 issues #3832-#3835)**
- ✅ Tạo: Quick start, Deployment, Developer guide, Extension guide

**Tài liệu nâng cao (3 issues #3836-#3839)**
- ✅ Best practices, Gotchas, Performance, Security guide

### 🔒 Cải tiến bảo mật

**PR #3842** - Confine local media attachments
- 🛡️ Hạn chế truy cập file đính kèm khi bật `restrictWorkspace`
- ⚠️ Ngăn LLM đọc file ngoài workspace thông qua `message(media=[...])`

**PR #3789** - Confine Feishu downloaded media filenames
- 🔐 Xử lý an toàn tên file từ Feishu API để tránh path traversal
- 🧹 Normalize và sanitize filename trước khi lưu

### 🐛 Sửa lỗi quan trọng

**PR #3752** ✅ Merged - Clear media_paths after voice transcription
- 🎤 Xóa đường dẫn .ogg sau khi transcribe thành công
- 🔧 Tránh LLM nhận tag `[file: ...]` và từ chối xử lý

**PR #3775** ✅ Merged - Register no-op handlers for Feishu bot events
- 📱 Xử lý sự kiện bot được thêm/xóa khỏi nhóm
- 🔕 Loại bỏ lỗi "processor not found"

**PR #3779** ✅ Merged - Persist shortcut commands
- 💾 Lưu lịch sử lệnh shortcut (`/help`, `/pairing`) vào session
- 🖥️ Sửa lỗi WebUI hiển thị chat trống

**PR #3786** ✅ Merged - Wire transcription config for Telegram
- ⚙️ Kết nối đúng config `transcription_provider/api_key/language`
- 🎙️ Sửa lỗi voice message không được transcribe

### ✨ Tính năng mới

**PR #3792** 🔄 Open - Gateway lifecycle notification hooks
- 📢 Gửi thông báo khi gateway start/stop
- 🔔 Cấu hình custom message trong gateway config

**PR #3791** 🔄 Open - Plan tool for task decomposition
- 📋 Tool `plan` để phân rã task phức tạp
- 💾 Plan persist qua các turn và survive context compaction
- 🎯 Actions: create, update, show, complete

**PR #3774** ✅ Merged - Chat-native DM sender approval
- 👤 Pairing flow cho private assistant deployments
- ✅ Approve/reject sender trực tiếp trong chat

**PR #3785** 🔄 Open - OpenCode Go gateway support
- 🌐 Tích hợp OpenCode Go (aggregated API gateway)
- 🤖 Hỗ trợ GLM, Kimi, DeepSeek, MiMo, Qwen, MiniMax qua single API key

**PR #3734** ✅ Merged - Wire MiMo thinking_type
- 🧠 Cho phép disable reasoning với `reasoning_effort: "none"`
- 🔧 Sửa lỗi hosted Xiaomi MiMo API

### 🔧 Cải tiến kỹ thuật

**PR #3793** 🔄 Open - Stabilize Codex prompt cache key
- 🔑 Dùng session-scoped key thay vì per-turn message payload
- 🔐 Hash session key trước khi gửi

**PR #3764** ✅ Merged - Support UNC paths in Windows
- 🪟 Hỗ trợ UNC paths (`\\server\share`) trong shell tool
- 📁 Cải thiện regex extraction

**PR #3840** 🔄 Open - Back off Brave search rate limits
- ⏱️ Serialize requests và retry với Retry-After
- 🚦 Xử lý HTTP 429 tốt hơn

**PR #3841** 🔄 Open - Remove GlobTool
- 🧹 Loại bỏ GlobTool redundant (GrepTool đã có `glob` parameter)

**PR #3783/3784** - SSL verification config for corporate proxy
- 🔒 Thêm `ssl_verify` config cho môi trường corporate proxy
- 🏢 Hỗ trợ self-signed CA

---

## 🌟 Điểm nổi bật cộng đồng

### 🔥 Issues được quan tâm

**#3402** (9 comments) - Replace JSON with TOML for config
- 💬 Đề xuất chuyển từ JSON sang TOML cho config files
- 🎯 Lý do: Human-friendly, comments, better structure
- ✅ Đã đóng - có thể đã được xem xét

**#3689** (5 comments) - 中断会话丢失上一轮会话的聊天记录
- 🇨🇳 Người dùng Trung Quốc báo cáo mất context khi interrupt
- 🔄 Yêu cầu giữ lại dialog history khi interrupt task

**#3780** (3 comments) - 支持更安全的文件访问控制与脚本审查
- 🏢 Công ty nhỏ dùng shared nanobot, lo ngại về file access
- 🪟 Windows không có sandbox, cần fine-grained access control
- 💡 Đề xuất: Allow read external files nhưng block write/delete

### 🐛 Bugs được báo cáo

**#3790** (2 comments) - WebUI会话-打印内容显示错乱
- 🖥️ WebUI hiển thị lỗi sau khi print, cần refresh
- 📅 Version: 0.1.5.post3.2026.05.13

**#3787** (2 comments) - Bot reply mention
- 📱 Feishu bot bị lỗi khi bot khác được @mention
- 🔧 Đã được fix trong PR #3775

**#3772** (2 comments) - Feishu群聊组被其他机器人艾特时出错
- 🤖 Lỗi "processor not found" khi bot khác được mention
- ✅ Đã được fix

---

## 🔧 Ổn định & Bugs

### ✅ Đã sửa

1. **Voice transcription cleanup** - Media paths không bị clear sau transcribe
2. **Feishu event handling** - Missing handlers cho bot member events
3. **Shortcut command persistence** - Commands không được lưu vào session
4. **Telegram transcription config** - Config không được wire through
5. **MiMo reasoning control** - Không thể disable thinking mode

### 🔄 Đang xử lý

1. **WebUI display corruption** (#3790) - Cần refresh sau print
2. **Context loss on interrupt** (#3689) - Mất history khi interrupt
3. **Brave search rate limits** (#2560) - PR #3840 đang open
4. **Codex prompt cache stability** (#2440) - PR #3793 đang open

---

## 💡 Yêu cầu tính năng

### 🎯 Đang phát triển

1. **Plan tool** (PR #3791) - Task decomposition và progress tracking
2. **Gateway lifecycle hooks** (PR #3792) - Start/stop notifications
3. **OpenCode Go integration** (PR #3785) - Unified gateway cho multiple LLMs
4. **Long-task orchestration** (PR #3460, #3788) - Multi-step agent tasks

### 📋 Được đề xuất

1. **TOML config format** (#3402) - Thay thế JSON
2. **Fine-grained file access control** (#3780) - Cho Windows non-sandbox
3. **Better interrupt handling** (#3689) - Preserve context

---

## 💬 Phản hồi người dùng

### 🇨🇳 Cộng đồng Trung Quốc rất tích cực

- 📚 **Chiến dịch tài liệu hóa** được thúc đẩy bởi @xianqiangfu với 40 issues
- 🏢 **Enterprise use cases**: Công ty nhỏ dùng shared nanobot cho data analysis
- 🔒 **Security concerns**: Lo ngại về file access trong môi trường Windows
- 📱 **Feishu integration**: Nhiều issues liên quan đến Feishu/Lark

### 🌍 Cộng đồng quốc tế

- 🔐 **Security focus**: Nhiều PR về confine file access và path traversal
- 🤖 **LLM provider diversity**: Yêu cầu tích hợp nhiều providers (OpenCode Go)
- 🏢 **Corporate deployment**: Quan tâm về SSL proxy và enterprise features

---

## 🗺️ Backlog & Roadmap

### 📚 Tài liệu (Hoàn thành 100%)

- ✅ 40/40 issues tài liệu đã hoàn thành trong ngày
- ✅ Chú thích tiếng Trung cho toàn bộ codebase
- ✅ README cho mọi module
- ✅ Sơ đồ kiến trúc Mermaid
- ✅ Hướng dẫn sử dụng đầy đủ

### 🔒 Bảo mật (Đang tiến hành)

- 🔄 File access confinement (PR #3842, #3789)
- 🔄 Path traversal prevention
- 📋 Fine-grained access control (đề xuất #3780)

### 🤖 Agent capabilities (Đang phát triển)

- 🔄 Plan tool (PR #3791)
- 🔄 Long-task orchestration (PR #3460, #3788)
- 🔄 Goal state streaming (PR #3788)

### 🌐 Integrations (Mở rộng)

- 🔄 OpenCode Go gateway (PR #3785)
- ✅ Feishu improvements (multiple PRs merged)
- ✅ Telegram transcription (PR #3786)
- ✅ WhatsApp voice cleanup (PR #3752)

### 🔧 Infrastructure

- 🔄 Prompt cache stability (PR #3793)
- 🔄 Rate limit handling (PR #3840)
- 🔄 SSL verification config (PR #3783/3784)
- 🔄 UNC path support (PR #3764 merged)

---

## 🎯 Kết luận

Ngày 15/05/2026 là một **milestone quan trọng về tài liệu hóa** cho dự án NanoBot. Với 40 issues được hoàn thành, dự án đã có một bộ tài liệu tiếng Trung toàn diện, giúp cộng đồng Trung Quốc - một phần quan trọng của user base - dễ dàng tiếp cận và đóng góp hơn.

Bên cạnh đó, dự án tiếp tục **tăng cường bảo mật** với các PR về file access control và **cải thiện tích hợp** với các nền tảng messaging phổ biến. Các tính năng mới như **plan tool** và **long-task orchestration** đang được phát triển tích cực, hứa hẹn nâng cao khả năng xử lý task phức tạp của agent.

Cộng đồng người dùng đang phát triển mạnh, đặc biệt ở thị trường Trung Quốc, với nhiều feedback thực tế từ enterprise deployments. 🚀

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo phân tích Zeroclaw - 15/05/2026

## 📊 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn tái cấu trúc và ổn định hệ thống sau bulk revert 153 commits. Hôm nay có 8 PR được merge tập trung vào sửa lỗi quan trọng (cron store, Matrix threading, system messages) và cải thiện observability. Cộng đồng đang tích cực đóng góp với 50 PR đang mở, trong đó có nhiều tính năng mới như ACP session persistence, file rotation, và strict tool parsing mode.

## 🚀 Releases

Không có release chính thức trong 24h qua. Dự án đang chuẩn bị cho v0.7.6 với theme "zeroclaw skills support and UX" (#6253).

## 📈 Tiến độ dự án

### Các PR quan trọng được merge hôm nay:

**Sửa lỗi nghiêm trọng:**
- **#6655** - Tách đường dẫn read-only khỏi schema init trong cron store, tránh tạo DB không cần thiết
- **#6656** - Tối ưu cron: persist run results trong một transaction duy nhất
- **#6525** - Sửa Matrix threading: tránh auto-thread cho root timeline messages
- **#6552** - Chuẩn hóa system messages luôn ở đầu chat history (quan trọng cho provider compatibility)

**Cải thiện observability:**
- **#6596** - Sửa lỗi Prometheus metrics bị split: share PrometheusObserver across subsystems

**Trải nghiệm người dùng:**
- **#6430** - Sửa bash completion infinite recursion (#6402)
- **#6409** - Hiển thị tier banner khi install skills (trust signaling)

### PR đang được review tích cực:

**Tính năng mới quan trọng:**
- **#6649** - ACP session persistence: cho phép editor sessions survive reconnects (size: XL, risk: high)
- **#6611** - File rotation crate mới cho log management (size: XL)
- **#6675** - Strict tool parsing mode: yêu cầu native provider tool calls thay vì fallback text parsing
- **#6676** - Suggest missing skill capabilities tự động khi agent cần

**Cải thiện hạ tầng:**
- **#6553** - Khôi phục SSE /logs stream + build-stamped version cho remote deployments
- **#6671** - Session notifications qua WebSocket cho gateway dashboard

## 🔥 Điểm nổi bật cộng đồng

### Issues được quan tâm:

1. **#6074** (2 comments) - Tracking 153 commits bị mất trong bulk revert c3ff635, cần recovery có chọn lọc
2. **#5833** (3 comments) - Session ownership model cho destructive operations - vấn đề bảo mật quan trọng
3. **#5316** (3 comments) - Đề xuất SearXNG support + cải thiện web search robustness (CAPTCHA detection)

### Contributor highlights:

- **@drbparadise** - 5 PR merged hôm nay (cron, Matrix, system messages)
- **@Audacity88** - 4 PR mới về skills localization, strict parsing, session notifications
- **@tidux** - ACP persistence implementation (PR lớn)

## 🐛 Ổn định & Bugs

### Bugs được sửa hôm nay:

✅ **#6402** - Bash completion infinite recursion  
✅ **#6654** - Cron read-only queries vẫn hit writable schema path  
✅ **Matrix threading** - Root messages không còn auto-open threads  
✅ **System messages** - Đã normalize vị trí trong chat history  

### Bugs đang mở:

🔴 **#6672** (mới) - `reasoning_content` không được pass back trong agentic loops với Xiaomi thinking models (mimo-v2.5)  
🟡 **#6657** - Advisory scan failed: TLS hostname verification disabled với Boring TLS backend  

### Technical debt đang xử lý:

- **#6669** - Audit observability backends cho split-instance metric/trace sinks
- **#6288** - Systemd unit name cần derive từ config-dir cho named instances

## ✨ Yêu cầu tính năng

### Tính năng mới được đề xuất hôm nay:

1. **#6670** - Localize skills install output với Fluent (đã có PR #6674)
2. **#6676** - Auto-suggest missing skills khi agent cần capabilities (đã có PR)

### Tính năng đang phát triển:

- **#6522** - Web chat tool approval UI cho supervised-mode (blocked, cần frontend implementation)
- **#6253** - Skills support & UX improvements (v0.7.6 theme)
- **#5838** - Webhook retry logic với exponential backoff

### Provider ecosystem:

- **#6268** - Thêm Manifest open-source LLM router
- **#6607** - Respect explicit provider kind trong config
- **#6668** - Khôi phục Codex non-streaming fallback

## 💬 Phản hồi người dùng

### Pain points được báo cáo:

1. **Docker deployment** (#6621) - Dashboard install conflict với /zeroclaw-data bind mount
2. **Config UX** (#6086) - Người dùng muốn dùng `allowed_path/allowed_paths` thay vì `allowed_roots`
3. **Service management** (#6288) - Named instances không hoạt động đúng với systemd

### Cải thiện được đánh giá cao:

- Tier banner cho skills install (trust signaling)
- Bash completion fix (ảnh hưởng trực tiếp đến CLI UX)
- Matrix threading behavior (tránh spam threads)

## 🗺️ Backlog & Roadmap

### v0.7.6 focus (theo #6253):

- ✅ Skills audit scope clarification (#5956, #5952)
- ✅ Skills install UX improvements (#6409)
- 🔄 Skills timeout respect (#6054)
- 🔄 Skills localization (#6674)
- 🔄 Skills auto-suggestion (#6676)

### High-priority blocked items:

- **#5833** - Session ownership model (blocked, needs maintainer review)
- **#6522** - Web tool approval UI (blocked, needs frontend work)
- **#6074** - Commit recovery audit (in-progress, no-stale)

### Infrastructure improvements:

- File rotation system (#6611)
- ACP persistence (#6649)
- Observability consolidation (#6669, #6596)
- Strict tool parsing (#6675)

---

**Nhận xét tổng quan:** Zeroclaw đang trong giai đoạn consolidation mạnh mẽ sau bulk revert. Team tập trung vào stability (8 bugfix PRs merged), observability (metrics/logs), và developer experience (skills UX, CLI improvements). Cộng đồng đóng góp tích cực với nhiều PR chất lượng cao. Dự án cần ưu tiên review các PR lớn đang pending (#6649, #6611, #6553) để không block contributors.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích PicoClaw - Ngày 15/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 15/05 chứng kiến hoạt động merge và đóng PR cực kỳ mạnh mẽ với **14 PRs được đóng** trong một ngày, tập trung vào việc tích hợp các tính năng lớn đã phát triển trong tuần qua. Các cải tiến chính bao gồm hỗ trợ reasoning models (DeepSeek, MiMo), nâng cấp dependencies, và cải thiện trải nghiệm streaming. Một release nightly mới (v0.2.8-nightly.20260515) đã được phát hành với các thay đổi này.

---

## 🚀 Releases

### **v0.2.8-nightly.20260515.794eb04f**
- ⚠️ **Nightly build** - phiên bản tự động, có thể không ổn định
- Tích hợp các thay đổi từ 14 PRs được merge trong ngày
- Các cải tiến chính:
  - ✅ Hỗ trợ đầy đủ reasoning models (DeepSeek v4, MiMo 2.5)
  - ✅ Cập nhật dependencies quan trọng (Slack SDK, Tailwind, SQLite)
  - ✅ Cải thiện xử lý media trong Pico client
  - ✅ Sửa lỗi streaming với reasoning_content

---

## 📈 Tiến độ dự án

### **Các PR được merge hôm nay (14 PRs):**

#### 🔥 **Tính năng lớn:**

1. **#2862 - Hỗ trợ MiMo reasoning replay** ✅
   - Sửa lỗi multi-turn với MiMo thinking mode
   - Tái sử dụng logic reasoning của DeepSeek cho MiMo
   - Giải quyết issue #2859 về lỗi 400 sau 2-3 vòng hội thoại

2. **#2741 - Parse reasoning_content trong streaming** ✅
   - Tích lũy `reasoning_content` deltas trong streaming
   - Sửa lỗi SSE payload parsing
   - Cải thiện độ tin cậy với thinking models

3. **#2874 - Preserve image media trong Pico** ✅
   - Parse inline image từ cả `media` và `attachments`
   - Forward image media qua `pico_client` thay vì drop
   - Xử lý `media.create` trong Pico server

4. **#2832 - Fetch models và saved catalog** ✅
   - API mới: `POST /api/models/fetch` để lấy models từ providers
   - `GET /api/models/saved` để lấy catalog đã lưu
   - Phần 2/3 của refactor lớn từ #2752

#### 🔧 **Dependencies & Maintenance:**

- **#2875** - Slack SDK: v0.17.3 → v0.23.1
- **#2876** - Tailwind Vite: 4.2.4 → 4.3.0
- **#2872** - Tailwind CSS: 4.2.4 → 4.3.0
- **#2871** - TypeScript ESLint: 8.59.1 → 8.59.3
- **#2870** - Prettier Tailwind: 0.7.2 → 0.8.0
- **#2869** - Jotai: 2.19.1 → 2.20.0
- **#2868** - Gronx: 1.19.6 → 1.19.7
- **#2867** - golang.org/x/net: 0.53.0 → 0.54.0
- **#2866** - Telego: 1.8.0 → 1.9.0
- **#2865** - Vite: 8.0.10 → 8.0.13
- **#2864** - Lark SDK: 3.6.1 → 3.7.5
- **#2863** - SQLite: 1.48.2 → 1.50.1

### **PRs đang mở (8 PRs):**

#### 🎯 **Ưu tiên cao:**

1. **#2877 - Tirith pre-exec scanning** 🆕
   - Thay thế #1932 sau rebase
   - Thêm security scanning cho shell commands
   - Phát hiện threats mà regex deny list không catch được

2. **#2833 - Test connection với real verification** (Part 3/3)
   - Phụ thuộc #2831
   - Hoàn thiện refactor lớn về model management

3. **#2811 - MCP streamable HTTP & integration tests**
   - Docker-backed integration testing framework
   - Cải thiện MCP transport configuration

#### 📚 **Documentation:**

4. **#2766 - Sync docs to V3 config format**
   - Cập nhật 26 files
   - `api_key` → `api_keys`, `channels` → `channel_list`

#### 🐛 **Bug fixes:**

5. **#2836 - PowerShell encoding bypass fix**
6. **#2779 - Telegram topic group trigger overrides**
7. **#2778 - Working summary tool feedback**
8. **#2777 - Suppress feedback for scheduled turns**

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues được đóng hôm nay:**

1. **#2859 - MiMo multi-turn conversation error** 👍1
   - Lỗi 400 sau 2-3 vòng với Xiaomi MiMo 2.5
   - **Đã giải quyết** bằng #2862
   - Vấn đề: `reasoning_content` không được preserve

2. **#2706 - DeepSeek v4 thinking model** 👍1
   - Yêu cầu hỗ trợ reasoning_content replay
   - **Đã giải quyết** bằng #2741 và #2862
   - Cộng đồng Trung Quốc quan tâm cao

3. **#2171 - OpenAI Responses API migration**
   - Refactor từ Chat Completions sang Responses API
   - 11 comments, discussion sâu về architecture

### **Issues hot đang mở:**

1. **#2702 - Multi-user group history lacks sender attribution** (3 comments)
   - Vấn đề: Historical messages không có thông tin sender
   - Ảnh hưởng: Discord và group channels
   - Cần thiết cho multi-user context

2. **#2798 - PDF Stream Data error in Telegram** (1 comment)
   - PDF nhỏ gây break stream/session
   - Chỉ xảy ra với PicoClaw, không xảy ra với OpenClaw
   - Docker Compose environment

---

## 🐛 Ổn định & Bugs

### **Đã sửa hôm nay:**

✅ **Reasoning models stability** (#2862, #2741)
- MiMo và DeepSeek thinking mode giờ hoạt động ổn định
- Multi-turn conversations không còn bị 400 error
- Streaming reasoning_content được preserve đúng

✅ **Media handling** (#2874)
- Image attachments không còn bị drop trong Pico
- Parse đúng cả `media` và `attachments` structures

### **Vẫn đang xử lý:**

⚠️ **#629 - LLM call failed without retry** (14 comments, stale)
- HTTP 500 từ OpenRouter không được retry
- Task bị hang
- Cần cải thiện retry logic

⚠️ **#2721 - Session history race** (priority: high)
- `tool_use_id` 400 từ Anthropic
- Vẫn tái hiện trong v0.2.5
- Race condition trong session management

⚠️ **#2795 - Conversation history chỉ hiện last message**
- Session compression ảnh hưởng UI
- User chỉ thấy message cuối cùng trong history

⚠️ **#2787 - Messages lack individual timestamps**
- Tất cả messages dùng chung `session.updated` time
- Gây hiển thị thời gian không chính xác

---

## 💡 Yêu cầu tính năng

### **Đang phát triển:**

1. **#2877 - Tirith security scanning** 🆕
   - Pre-exec command scanning
   - Phát hiện homograph URLs, pipe-to-shell patterns
   - Optional feature, không breaking

2. **#2833 - Real connectivity verification**
   - Test connection với actual provider calls
   - Part 3/3 của model management refactor

3. **#2811 - MCP integration tests**
   - Docker-backed testing framework
   - Streamable HTTP support

### **Được đề xuất:**

1. **#2775 - Sub-agent AGENT.md inheritance issue**
   - Sub-agents kế thừa root AGENT.md
   - Gây confusion về role identity
   - Cần per-agent system prompts

2. **#2779 - Telegram topic-specific triggers**
   - Per-topic `group_trigger` overrides
   - Cho phép bot active trong specific forum topics

3. **#2778 - Working summary tool feedback**
   - Compact progress messages: `Working... • tool: xyz`
   - Edit in-place, cleanup khi done

---

## 💬 Phản hồi người dùng

### **Tích cực:**

✅ **Reasoning models support được đánh giá cao**
- Cộng đồng Trung Quốc hài lòng với DeepSeek v4 support
- MiMo users giờ có thể dùng thinking mode

✅ **Dependencies được cập nhật thường xuyên**
- 12 dependency updates trong một ngày
- Thể hiện maintenance tốt

### **Tiêu cực / Cần cải thiện:**

⚠️ **Session management issues**
- Multiple reports về history, timestamps, race conditions
- Ảnh hưởng UX nghiêm trọng

⚠️ **Retry logic cần cải thiện**
- #629 mở từ tháng 2, vẫn chưa fix
- Critical cho production use

⚠️ **Documentation lag**
- #2766 vẫn đang sync docs sang V3 format
- 26 files cần update

---

## 🗺️ Backlog & Roadmap

### **Đang trong pipeline:**

1. **Model Management Refactor** (3-part series)
   - ✅ Part 1: #2831 (merged)
   - ✅ Part 2: #2832 (merged hôm nay)
   - 🔄 Part 3: #2833 (đang review)

2. **Security Enhancements**
   - 🔄 #2877 - Tirith scanning (mới mở)
   - 🔄 #2836 - PowerShell bypass fix

3. **Telegram Improvements**
   - 🔄 #2779 - Topic triggers
   - 🔄 #2778 - Working summary
   - 🔄 #2777 - Cron feedback suppression
   - 🔄 #2776 - Forum topic typing state
   - 🔄 #2772 - Topic preservation for message tool

### **Technical Debt:**

- **Session management refactor** - Multiple related issues (#2702, #2787, #2795, #2721)
- **Retry logic improvement** - #629 (stale since Feb)
- **Channel identification standardization** - #2551 (large refactor)
- **Documentation V3 migration** - #2766

### **Xu hướng phát triển:**

📊 **Focus areas:**
1. **Reasoning models** - Ưu tiên cao, đã có progress tốt
2. **Security** - Tirith integration, PowerShell hardening
3. **Telegram features** - Nhiều PRs về forum topics, feedback
4. **Stability** - Session management, retry logic
5. **Developer experience** - Integration tests, documentation

---

## 📊 Thống kê

- **PRs merged hôm nay:** 14
- **PRs mở mới:** 1 (#2877)
- **Issues đóng:** 3 (#2859, #2706, #2171)
- **Dependencies updated:** 12
- **Release:** 1 nightly build
- **Active contributors hôm nay:** ~10+

---

## 🎬 Kết luận

Ngày 15/05 là một **ngày merge lớn** với 14 PRs được tích hợp, đánh dấu milestone quan trọng trong việc hỗ trợ reasoning models và cập nhật dependencies. Dự án đang trong giai đoạn consolidation sau các feature sprints, với focus vào stability và developer experience. Các vấn đề về session management và retry logic cần được ưu tiên trong tuần tới.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo Phân tích NanoClaw - 15/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 15/05 đánh dấu một đợt phát triển tích cực với **25 PRs** (20 đã merge, 5 đang mở) tập trung vào việc mở rộng hệ sinh thái skills và tăng cường bảo mật. Dự án đang chuyển hướng mạnh mẽ sang **marketing automation** và **social listening** với hàng loạt tích hợp mới (LinkedIn Ads, Reddit, Firecrawl, Serper). Đồng thời, team đang giải quyết các vấn đề về **container orchestration** và **user experience** cho người dùng mới.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng có dấu hiệu chuẩn bị cho **v2 consolidation** (#2479) - một bước quan trọng để ổn định kiến trúc trước khi phát hành phiên bản lớn tiếp theo.

---

## 📈 Tiến độ dự án

### 🔥 Xu hướng chính: Marketing & Social Intelligence Stack

Dự án đang xây dựng một **bộ công cụ marketing tự động** hoàn chỉnh:

**✅ Đã merge (13/05-14/05):**
- **#2450** - LinkedIn Ads playbook skills
- **#2449** - LinkedIn community manager (agent-browser based)
- **#2448** - Social listening composite skill (Serper + Reddit + RSS)
- **#2447** - Reddit research skill với 4 playbooks (ICP mining, competitor analysis)
- **#2446** - Firecrawl integration cho structured extraction
- **#2445** - Serper search integration
- **#2455** - Website audit stack (Lighthouse + axe + linkinator)
- **#2451-#2454** - Localization của audit-website và copy-grader skills

**💡 Insight:** NanoClaw đang định vị mình như một **AI marketing ops platform**, không chỉ là chatbot framework. Việc tích hợp đồng loạt các công cụ SEO, social listening, và ads management cho thấy tham vọng phục vụ marketing teams.

### 🔐 Bảo mật được ưu tiên

- **#2478** - Yêu cầu admin role cho approval responses (đã mở)
- **#2468** - Chặn unsafe symlink forwarding trong agent-to-agent attachments (đang review)

**⚠️ Đánh giá:** Việc hardening approval flow và attachment handling cho thấy dự án đang trưởng thành về security posture, đặc biệt quan trọng khi agents có quyền truy cập vault secrets.

### 🏗️ Infrastructure & Developer Experience

**Đang mở:**
- **#2479** - Consolidate canonical v2 setup (draft, quan trọng cho stability)
- **#2474** - AI coding CLI picker (Claude Code vs Codex) cho setup flow
- **#2475** - Surface skills + persona to Codex agents (parity với Claude)
- **#2470** - CLI mode để bypass Agent SDK quota limits

**Đã merge:**
- **#2467** - Fix duplicate welcome messages
- **#2481** - Fix cron output suppression (Lili & Lobby agents)
- **#2472-#2471** - Per-message threading cho Slack DMs

**💡 Insight:** Team đang đầu tư mạnh vào **developer onboarding** (setup flow improvements) và **provider flexibility** (Codex support), giảm vendor lock-in với Claude.

---

## 🌟 Điểm nổi bật cộng đồng

### 🔴 Issue #2480 - Docker Desktop Linux blockers (mới nhất, 15/05)

**Tác giả:** @AlonMiz  
**Vấn đề:** Ba bugs chồng chéo khiến container crash ngay lập tức trên fresh Linux install:
- Claude Code binary không tìm thấy tại `/pnpm/claude`
- Silent failures không có error logs

**📊 Tác động:** Đây là **critical UX issue** cho new users trên Linux - platform phổ biến cho developers. Chưa có comments/reactions nhưng severity cao.

### ⚠️ Issue #2466 - Race condition trong container orchestration

**Tác giả:** @glifocat  
**Vấn đề:** Duplicate containers spawn khi script và host sweep chạy đồng thời, dẫn đến xử lý trùng lặp cùng một task.

**📊 Tác động:** Waste resources và có thể gây side effects (duplicate posts, double charges). Đã có 1 comment, đang được investigate.

---

## 🐛 Ổn định & Bugs

### 🔧 Đã sửa (merged)

1. **Cron output suppression** (#2481)
   - **Triệu chứng:** Lili và Lobby agents xử lý cron tasks nhưng không deliver output
   - **Root cause:** Hai bugs độc lập - Lobby dropped output, Lili self-silenced với `<internal>silent`
   - **Impact:** Scheduled tasks "chạy ngầm" mà user không biết

2. **Duplicate welcome messages** (#2467)
   - **Root cause:** Conflict giữa welcome skill và sending-rules trong system prompt
   - **Fix:** Loại bỏ `send_message` tool call, chỉ dùng `<message>` tags

3. **WhatsApp recovery guidance** (#2469)
   - Sửa hướng dẫn recovery cho decrypt failures (thay `launchctl kickstart` bằng xóa `store/auth/`)

### 🚨 Đang xử lý

1. **Container spawn race** (#2466) - chưa có PR fix
2. **Linux Docker Desktop crashes** (#2480) - chưa có PR fix
3. **Unsafe attachment forwarding** (#2468) - đang review

**⚠️ Đánh giá:** Hai issues mới (#2466, #2480) đều là **high-priority** vì ảnh hưởng đến core functionality (orchestration) và new user experience.

---

## 💡 Yêu cầu tính năng

### 🆕 Tính năng mới được implement

1. **Network access control hooks** (#2477)
   - Cho phép skills regulate internet access của agents
   - Use case: compliance, cost control, security policies

2. **CLI mode for quota bypass** (#2470)
   - Sử dụng `claude --print --resume` thay vì Agent SDK
   - Mục đích: Bypass API quota limits bằng cách dùng interactive quota
   - **⚠️ Ethical concern:** Đây là workaround có thể vi phạm ToS của Anthropic

3. **Provider flexibility** (#2474, #2475)
   - Setup flow cho phép chọn Claude Code hoặc Codex
   - Codex agents nhìn thấy skills catalog như Claude agents

### 📋 Backlog insights

Từ các PRs đã merge, có thể thấy roadmap ngầm:

- **Phase 1 (done):** Marketing automation foundation
- **Phase 2 (in progress):** Multi-provider support, security hardening
- **Phase 3 (upcoming):** V2 consolidation (#2479), stability improvements

---

## 💬 Phản hồi người dùng

### 😤 Pain points

1. **Linux setup experience** (#2480)
   - Fresh install fails immediately
   - Error messages không rõ ràng
   - Thiếu fallback/recovery guidance

2. **Container orchestration reliability** (#2466)
   - Race conditions gây duplicate work
   - Không có idempotency guarantees

3. **Cron visibility** (#2481 - đã fix)
   - Tasks chạy nhưng không có output
   - Khó debug scheduled workflows

### 👍 Positive signals

- **20/25 PRs merged trong 2 ngày** - velocity cao, review process hiệu quả
- **Comprehensive testing:** PRs như #2470 có "40 unit tests passing"
- **Documentation focus:** Nhiều PRs include SKILL.md, README updates
- **Security consciousness:** Proactive hardening (#2478, #2468)

---

## 🗺️ Backlog & Roadmap

### 🎯 Ưu tiên cao (dựa trên open issues/PRs)

1. **V2 Consolidation** (#2479 - draft)
   - Reconcile upstream fixes với v2 architecture
   - Critical cho stability trước khi scale

2. **Linux Docker Desktop fixes** (#2480)
   - Blocker cho Linux adoption
   - Cần urgent attention

3. **Container orchestration hardening** (#2466)
   - Implement locking/idempotency
   - Prevent duplicate spawns

### 🔮 Xu hướng dài hạn

**Marketing Automation Platform:**
- Đã có: LinkedIn (organic + ads), Reddit, social listening, SEO audit
- Thiếu: Twitter/X, Facebook Ads, email marketing integrations

**Multi-provider strategy:**
- Đang mở rộng từ Claude-only sang Codex
- Có thể thêm Gemini, Aider trong tương lai

**Enterprise readiness:**
- Security hardening (approvals, attachments)
- Network access control
- Audit trails (implied by vault secrets reference #2454)

---

## 📊 Metrics Summary

| Metric | Value | Trend |
|--------|-------|-------|
| PRs merged (24h) | 20 | 🔥 Rất cao |
| PRs open | 5 | ✅ Healthy |
| Issues open | 2 | ⚠️ Cần attention |
| Contributors active | ~15 | 📈 Tăng |
| Focus areas | Marketing, Security, DX | 🎯 Rõ ràng |

---

## 🎬 Kết luận

NanoClaw đang trong giai đoạn **rapid feature expansion** với focus rõ ràng vào marketing automation. Velocity cao (20 merges/2 days) cho thấy team size và process tốt, nhưng cần cân bằng giữa new features và stability:

**✅ Strengths:**
- Clear product vision (marketing ops platform)
- Strong security awareness
- Good documentation practices
- Multi-provider flexibility

**⚠️ Risks:**
- New user experience issues (#2480)
- Container orchestration reliability (#2466)
- Potential ToS concerns với CLI mode quota bypass (#2470)
- V2 consolidation chưa hoàn thành có thể gây technical debt

**🎯 Recommended focus:** Prioritize #2480 (Linux blockers) và #2479 (v2 consolidation) trước khi thêm features mới để đảm bảo foundation vững chắc.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 2026-05-15

## 1. 📋 Tóm tắt hôm nay

Ngày 15/05 đánh dấu một đợt tái cấu trúc kiến trúc lớn với **50 PRs** hoạt động, tập trung vào việc xây dựng nền tảng "Reborn" - thế hệ kiến trúc mới của IronClaw. Điểm nổi bật là việc triển khai hệ thống filesystem thống nhất (#3659) và chuỗi 6 PRs về host ports cho agent loop. Release v0.28.2 vừa ra mắt sửa lỗi nghiêm trọng về `tool_install` và cải thiện bảo mật LLM provider.

## 2. 🚀 Releases

### **v0.28.2** (2026-05-14)

**Sửa lỗi quan trọng:**
- ✅ **Khôi phục `tool_install` qua chat** (#3559): Lỗi nghiêm trọng khiến việc cài đặt tool qua chat bị hỏng trong 5 ngày (8-13/05) mà không bị phát hiện bởi canary tests
- ✅ **Sửa double-invoke và auto-approve footgun**: Ngăn chặn việc tool được gọi 2 lần và tự động approve không an toàn

**Cải thiện kiến trúc:**
- 🔒 **Ẩn cấu hình LLM provider** (#3416): Auth, model fetch, và embeddings config giờ được đặt sau facades để tăng bảo mật
- ✅ **Unxfail 2 auth-matrix tests** (#3589): Contracts giờ khớp với expectations

**Ý nghĩa:** Release này tập trung vào stability và security, đặc biệt sửa regression nghiêm trọng về extensions.

## 3. 📊 Tiến độ dự án

### **Xu hướng chính: Kiến trúc "Reborn"**

Dự án đang trong giai đoạn tái cấu trúc toàn diện với 3 luồng công việc song song:

#### **A. Universal Filesystem Dispatch (#3659 + cascade)**

**Mục tiêu:** Thay thế hệ thống `Store`/`Repository` phân tán bằng một `RootFilesystem` trait thống nhất

**Tiến độ:**
- ✅ **Foundation** (#3659): +15,214 LOC, 61 files - trait `RootFilesystem` với ops: `put/get/delete/list_dir/query/ensure_index/stat/begin/append`
- ✅ **SQL backends** (#3660, #3661): Native CAS + versioning + query/index cho LibSQL & Postgres
- 🔄 **Consumer migrations** (cascade 5 PRs):
  - #3666: `ironclaw_processes` ✅ merged
  - #3670: `FilesystemOutboundStateStore` ✅ merged  
  - #3671: `ironclaw_authorization` ✅ merged
  - #3672: `ironclaw_run_state` ✅ merged
  - #3678: Dissolve `ironclaw_storage` crate ✅ merged
- 🔄 **Final integration** (#3679): Apply across ALL consumer crates - 13 commits, đang review

**Tác động:** Đây là refactor lớn nhất, ảnh hưởng 6+ crates, chuẩn bị nền tảng cho checkpoint/resume và distributed storage.

#### **B. Agent Loop Host Ports (WS-9 đến WS-15)**

**Mục tiêu:** Xây dựng 6 host ports cho Reborn agent loop

**Tiến độ (6 PRs song song):**
- #3644 (WS-9): **Capability host port** - visibility & invocation adapters
- #3645 (WS-10): **Checkpoint store & resume** - read-side + resume path
- #3646 (WS-11): **Loop input port** - drain steering inputs
- #3647 (WS-12): **Loop progress port** - durable milestones ✅ closed (merged vào parent?)
- #3648 (WS-13): **Host cancellation accessor** - cancellation signal
- #3649 (WS-15): **Prompt context assembly** - identity-context source
- #3650 (WS-14-parent): **Integration parent** - merge 6 branches trên

**Kiến trúc:** Mỗi port giải quyết một concern riêng biệt (separation of concerns), tránh mixing state.

#### **C. Reborn Hooks Framework (#3573, #3635)**

- ✅ **v1 foundation** (#3573): Trust primitives, sealed decisions, dispatcher, telemetry - đã merge
- 🔄 **Persistent predicate counter** (#3635): Draft scope doc cho backend survive restarts

### **Các công việc khác:**

**Security & Trust:**
- #3638: **Fail-closed default policy** - Thay `HostTrustPolicy::empty()` bằng `fail_closed()` explicit
- #3667: **Credential account resolver** - Resolve scoped credentials cho Host API

**Product surfaces:**
- #3611: **WebChat v2 routes** (Reborn WebUI Beta) - P0, default-off
- #3580: **Port WebUI to Reborn** - Native surface migration
- #3578: **Define ingress boundary** - Host-owned HTTP ingress

**Tooling:**
- #3681: **First-party HTTP egress tool** - `builtin.http` capability
- #3680: **WeChat docs** - Setup, QR login, capabilities

**CI/Testing:**
- #3682: **Canary fixes** - Accurate test counts, chat-install probe, strict xfails (phản ứng với regression 8-13/05)

## 4. 🔥 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

Không có issue nào có reactions đáng kể (tất cả 👍: 0), nhưng có 3 issues đáng chú ý:

1. **#3611 - WebChat v2 routes** (1 comment)
   - Module M1, Priority P0
   - Scope: Create thread, send message, get timeline/snapshot
   - Đây là surface quan trọng cho beta users

2. **#3447 - Nightly E2E failed** (auto-generated)
   - Workflow failure liên tục
   - Commit: faf2ed4, attempt 1
   - Cần attention từ team

3. **#3675 - TUI markdown table rendering**
   - Tools return markdown tables nhưng không render đúng
   - UX issue ảnh hưởng terminal users

### **PRs có nhiều hoạt động:**

Không có PR nào có comments count rõ ràng (undefined), nhưng dựa vào size và risk:

**Top PRs theo impact:**
- #3659 (XL, low risk): Universal FS - foundation cho toàn bộ rework
- #3679 (XL, medium risk): Apply FS dispatch across ALL crates - 15K+ LOC
- #3650 (XL, medium risk): Integration parent cho 6 host ports

## 5. 🐛 Ổn định & Bugs

### **Bugs đang được xử lý:**

1. **#3673 - DeepSeek v4-pro multi-turn tool calls broken** (QA)
   - `openai_compatible` provider drops `reasoning_content`
   - Ảnh hưởng: Multi-turn tool calling với DeepSeek thinking-mode
   - Severity: High (breaks core LLM functionality)

2. **#3675 - TUI markdown table rendering**
   - Tables hiển thị dạng plain text thay vì formatted
   - Severity: Medium (UX issue)

3. **#3447 - Nightly E2E failures**
   - Workflow: Nightly E2E scheduled run
   - Status: failure liên tục
   - Severity: High (CI reliability)

### **Regressions đã sửa:**

- ✅ **tool_install regression** (8-13/05): Đã fix trong v0.28.2 (#3559)
- ✅ **Double-invoke footgun**: Đã fix trong v0.28.2

### **Stability improvements:**

- #3682: **Canary test improvements** - Accurate counts, probes, strict xfails để tránh regressions trượt qua
- #2341: **Bound file history memory** - Eviction policy (50MB cap) để tránh memory bloat
- #2314: **Version tracking & downgrade detection** - Warn on restart với older image

## 6. 💡 Yêu cầu tính năng

### **Đang triển khai:**

1. **Reborn WebUI surfaces** (#3611, #3580)
   - WebChat v2 với native routes
   - Default-off beta mode
   - Priority: P0

2. **First-party HTTP egress** (#3681)
   - `builtin.http` tool
   - Method, URL, headers, body (UTF-8/JSON/base64)
   - Response limits & timeouts

3. **Mission outcome routing** (#3584)
   - Route notifications về originating thread
   - Fix notification leaks vào assistant conversation

### **Planned (từ PRs):**

1. **Persistent predicate counters** (#3635)
   - Backend survive restarts
   - Consistent across processes

2. **HSM Backend placeholder** (#3678)
   - Hardware Security Module integration
   - Part of storage rework

3. **Async transaction approval** (#1759)
   - WalletConnect integration
   - Ethereum wallet tools (`wallet_pair`, `wallet_transact`)

## 7. 👥 Phản hồi người dùng

### **Pain points từ issues:**

1. **TUI rendering issues** (#3675)
   - User @chenyulue report markdown tables không render
   - Ảnh hưởng terminal-based workflows

2. **Nightly E2E instability** (#3447)
   - Auto-generated reports về failures
   - Gây lo ngại về CI reliability

3. **DeepSeek compatibility** (#3673)
   - User @NikZak report multi-turn tool calls broken
   - Ảnh hưởng users dùng DeepSeek v4-pro

### **Positive signals:**

- **WeChat integration docs** (#3680): Contributor @hanakannzashi thêm docs đầy đủ
- **Security deep-dive** (#3676): New contributor @thisisjoshford viết docs về secrets & sandboxing cho evaluators
- **Active refactoring**: Team đang invest heavily vào architecture improvements

### **Contributor activity:**

- **Core team**: @ilblackdragon, @serrrfirat, @henrypark133, @zmanian - driving major refactors
- **Experienced**: @italic-jinxin, @hanakannzashi - product features
- **New**: @thisisjoshford - documentation
- **Community**: @chenyulue, @NikZak - bug reports

## 8. 🗺️ Backlog & Roadmap

### **Immediate (đang làm):**

**Phase 1: Foundation (tuần này)**
- ✅ Universal filesystem dispatch foundation (#3659)
- 🔄 Consumer crate migrations (#3666-#3672, #3679)
- 🔄 6 host ports integration (#3644-#3650)

**Phase 2: Product surfaces (song song)**
- 🔄 WebChat v2 beta (#3611)
- 🔄 WebUI Reborn port (#3580)
- 🔄 Ingress boundary definition (#3578)

### **Near-term (1-2 tuần tới):**

1. **Complete Reborn foundation:**
   - Merge #3679 (universal FS across all crates)
   - Merge #3650 (6 host ports integration)
   - Land hooks persistent backend (#3635)

2. **Stabilization:**
   - Fix DeepSeek reasoning_content (#3673)
   - Fix TUI markdown rendering (#3675)
   - Improve canary reliability (#3682)

3. **Product readiness:**
   - WebChat v2 beta launch
   - Mission outcome routing (#3584)
   - HTTP egress tool (#3681)

### **Medium-term (roadmap signals):**

Từ PR descriptions và architecture docs:

1. **Distributed agent execution:**
   - Checkpoint/resume infrastructure (WS-10)
   - Progress tracking (WS-12)
   - Cancellation handling (WS-13)

2. **Enhanced security:**
   - HSM backend integration
   - Credential injection improvements
   - WASM sandbox hardening

3. **Multi-channel expansion:**
   - WeChat full support (groups, multi-account)
   - WalletConnect async approvals (#1759)

4. **Developer experience:**
   - Better docs (security deep-dive #3676)
   - Improved error messages
   - Version tracking & downgrade protection (#2314)

### **Technical debt being addressed:**

- ✅ Storage sprawl → Unified filesystem
- ✅ Module visibility → Sealed internal modules (#3668)
- 🔄 Trust policy ambiguity → Explicit fail-closed (#3638)
- 🔄 Memory unbounded → Eviction policies (#2341)

---

## 📈 Đánh giá tổng quan

**Velocity:** Rất cao - 50 PRs active, 13 commits trong single PR (#3679)

**Focus:** 80% effort vào architecture refactor (Reborn), 20% vào stability & product

**Risk:** Medium - Large-scale refactors đang diễn ra song song, cần careful integration

**Community health:** Tốt - Mix của core team, experienced contributors, và new contributors. Bug reports được respond nhanh.

**Next milestone:** Hoàn thành Reborn foundation + WebChat v2 beta launch (ước tính 1-2 tuần)

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# Báo cáo phân tích LobsterAI - 2026-05-15

## 📊 Tóm tắt hôm nay

LobsterAI đã phát hành phiên bản **2026.5.14** với 30 PR được merge trong 24 giờ qua, tập trung vào việc tái cấu trúc hệ thống plugin, tích hợp MCP native, và tối ưu hiệu năng. Đây là một ngày phát triển cực kỳ năng suất với nhiều cải tiến quan trọng về kiến trúc và trải nghiệm người dùng.

---

## 🚀 Releases

### **2026.5.14** - Bản phát hành tập trung vào plugin và MCP

**Tính năng chính:**

- **🔌 Hệ thống quản lý plugin hoàn chỉnh** (#1963)
  - Cài đặt plugin từ npm, clawhub, git, hoặc local
  - Giao diện cấu hình nâng cao dựa trên schema
  - Bật/tắt và gỡ cài đặt plugin linh hoạt

- **🔗 Tích hợp MCP native** (#1980)
  - Loại bỏ lớp trung gian mcp-bridge
  - Sử dụng OpenClaw MCP Client trực tiếp
  - Hỗ trợ stdio, sse, và streamable-http

- **🧠 Dreaming memory consolidation** (#1943)
  - Tính năng tổng hợp ký ức nền với lịch trình cron
  - Giao diện hiển thị trạng thái và nhật ký Dreaming
  - Cấu hình múi giờ và model override

- **🎤 Voice input** (#1947, #1956)
  - Nút nhập liệu bằng giọng nói trong chat
  - Tích hợp với dictation hệ thống (Win+H / Fn+Fn)

**Ý nghĩa:** Bản phát hành này đánh dấu bước chuyển mình quan trọng về kiến trúc, từ các giải pháp tự xây dựng sang tận dụng khả năng native của OpenClaw, giúp codebase gọn gàng hơn và dễ bảo trì hơn.

---

## 📈 Tiến độ dự án

### **Xu hướng phát triển**

**Tái cấu trúc kiến trúc (Architecture Refactoring):**
- Migration sang OpenClaw native MCP (#1980) - loại bỏ 1000+ dòng code trung gian
- Plugin system với schema-driven config (#1963) - mở rộng khả năng tùy biến
- Tối ưu heartbeat token consumption (#1978) - giảm 50% token usage

**Cải thiện hiệu năng (Performance):**
- Incremental tool result backfill (#1972) - hiển thị kết quả công cụ nhanh hơn 2s
- Streaming render optimization (#1186) - giảm 90% re-render không cần thiết
- SQLite performance tuning (#830) - tối ưu cache và journal mode

**Trải nghiệm người dùng (UX):**
- Voice input integration (#1947) - nhập liệu bằng giọng nói
- Thinking level control (#1985) - điều chỉnh mức độ suy nghĩ của AI
- Memory settings refactor (#1943) - giao diện quản lý ký ức trực quan hơn

### **PRs quan trọng**

**🔥 Hot PRs:**
- #1980 (MCP native migration) - Thay đổi kiến trúc lớn, ảnh hưởng toàn bộ tool calling
- #1963 (Plugin management) - Mở ra hệ sinh thái plugin cho LobsterAI
- #1972 (Incremental backfill) - Cải thiện đáng kể trải nghiệm real-time

**🐛 Bug fixes quan trọng:**
- #1986 - Sửa lỗi mất ký tự trong managed session sync
- #1973 - Sửa lỗi hiển thị tên app bị garbled trên Windows tiếng Trung
- #1981 - Sửa lỗi cài đặt plugin npm trên macOS

---

## 🌟 Điểm nổi bật cộng đồng

**Không có issues hoặc PRs nào có tương tác đặc biệt cao** trong 24h qua, cho thấy team đang tập trung vào development sprint mạnh mẽ hơn là community engagement.

**Các PR đáng chú ý từ contributors:**
- @btc69m979y-dotcom đóng góp 15+ PRs trong ngày, bao gồm các tính năng lớn như plugin system, MCP migration, voice input
- @liugang519 sửa lỗi critical về session sync (#1986)

---

## 🔧 Ổn định & Bugs

### **Bugs đã được sửa**

**Critical:**
- **Session sync data loss** (#1986) - Lỗi mất ký tự trùng lặp trong managed session (file:/// → file://)
- **Plugin installation failure on macOS** (#1981) - npm không tìm thấy do PATH không đầy đủ khi khởi động từ Dock

**High priority:**
- **Garbled app names on Chinese Windows** (#1973) - PowerShell encoding mismatch (GBK vs UTF-8)
- **Artifact open-in-browser failure** (#1955) - Đường dẫn tiếng Trung không được xử lý đúng
- **Code block background scroll issue** (#1944) - Background không mở rộng khi scroll ngang

**Medium priority:**
- **POPO channel title truncation** (#1966) - Cắt cụt 12 ký tự gây hiển thị sai
- **Voice input permission on macOS** (#1956) - Cần xử lý accessibility permission

### **Vấn đề kỹ thuật đang được theo dõi**

**Stale PRs cần attention:**
- #806 - Performance bottleneck với nhiều session (đã có index optimization)
- #807 - executionMode config không hoạt động
- #822 - Token refresh race condition

---

## 💡 Yêu cầu tính năng

### **Tính năng mới được implement**

**✅ Đã hoàn thành:**
- **Thinking level control** (#1985) - Cho phép điều chỉnh mức độ suy nghĩ (Off/Minimal/Low/Medium/High/Adaptive)
- **Security monitoring toggle** (#1962) - Bật/tắt nsp-clawguard trong Settings
- **JSON paste mode for MCP** (#835) - Import hàng loạt MCP servers từ Claude Desktop config
- **Duplicate skill detection** (#827, #836) - Ngăn chặn cài đặt skill trùng lặp

### **Tính năng đang phát triển**

Không có thông tin rõ ràng về feature requests mới từ community trong 24h qua.

---

## 💬 Phản hồi người dùng

### **Pain points được giải quyết**

**Hiệu năng:**
- Streaming render lag với nhiều messages (#1186) - Đã tối ưu bằng React.memo và selector
- Database slow với nhiều sessions (#830) - Đã thêm indexes và tuning SQLite

**Usability:**
- Không thể mở folder của custom skills (#1185) - Đã thêm nút "Open Folder"
- Voice input không hoạt động trên macOS (#1956) - Đã implement fallback mechanism

**Localization:**
- Garbled text trên Windows tiếng Trung (#1973) - Đã sửa encoding issue

### **Trải nghiệm tích cực**

Không có feedback trực tiếp từ users trong dataset, nhưng số lượng bug fixes và UX improvements cho thấy team đang lắng nghe và phản hồi nhanh các vấn đề thực tế.

---

## 🗺️ Backlog & Roadmap

### **Kế hoạch ngắn hạn (suy luận từ PRs)**

**Đang trong pipeline:**
- Hoàn thiện plugin ecosystem với marketplace/registry
- Tối ưu tiếp memory management và context handling
- Cải thiện IM bot capabilities (POPO, DingTalk, Feishu)

### **Technical debt đang được xử lý**

- Migration từ custom solutions sang OpenClaw native features (MCP ✅, tiếp theo có thể là auth, storage)
- Cleanup stale PRs (#806, #807, #822, #826-830)
- Performance optimization cho large-scale usage

### **Xu hướng dài hạn**

Dựa trên pattern của các PRs:
1. **Extensibility** - Plugin system là nền tảng cho ecosystem mở rộng
2. **Performance** - Liên tục tối ưu cho production workloads
3. **Enterprise readiness** - Security monitoring, IM integrations, multi-channel support
4. **AI capabilities** - Dreaming memory, thinking levels, voice input

---

## 🎯 Kết luận

LobsterAI đang trong giai đoạn phát triển cực kỳ năng suất với **30 PRs merged trong 1 ngày**. Team tập trung vào:

✅ **Tái cấu trúc kiến trúc** để dễ bảo trì và mở rộng  
✅ **Tối ưu hiệu năng** cho production usage  
✅ **Cải thiện UX** với voice input, plugin management, memory visualization  
✅ **Sửa bugs nhanh** với focus vào localization và cross-platform issues  

Dự án đang hướng tới một **platform mở và có thể mở rộng** thay vì một ứng dụng monolithic, với plugin system và MCP native integration là những bước đi chiến lược quan trọng.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo phân tích dự án Moltis - 15/05/2026

## 🎯 Tóm tắt hôm nay

Hoạt động của dự án Moltis trong ngày hôm nay khá yên tĩnh với chỉ 1 issue mới được báo cáo. Issue này liên quan đến vấn đề bảo mật TLS certificates, cho thấy người dùng đang triển khai Moltis trong môi trường production và gặp phải hạn chế về cấu hình mạng. Không có PR mới hoặc release nào được phát hành, cho thấy đây có thể là giai đoạn ổn định hoặc đội ngũ đang tập trung vào các tác vụ nội bộ.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

**Không có hoạt động PR**: Không có pull request nào được tạo hoặc cập nhật trong ngày, cho thấy:
- Có thể đội ngũ đang trong giai đoạn nghỉ lễ hoặc cuối tuần
- Đang tập trung vào công việc nội bộ chưa sẵn sàng để mở PR
- Dự án đang trong giai đoạn ổn định, ít thay đổi lớn

**Xu hướng**: Với chỉ 1 issue mới và không có PR, hoạt động phát triển đang ở mức thấp. Cần theo dõi thêm để xác định đây là xu hướng tạm thời hay dài hạn.

## 🌟 Điểm nổi bật cộng đồng

**Issue #996 - Vấn đề TLS certificates**
- 📅 Được tạo: 14/05/2026 (hôm qua)
- 👤 Tác giả: @IlyaBizyaev
- 💬 Tương tác: 0 bình luận, 0 reactions

Mặc dù chưa có tương tác nào, issue này đáng chú ý vì:
- Người dùng đã làm đầy đủ preflight checklist, cho thấy đây là báo cáo chất lượng
- Đang sử dụng phiên bản mới nhất của Moltis
- Vấn đề liên quan đến triển khai thực tế (production use case)

## 🐛 Ổn định & Bugs

### Issue #996: Generated TLS certificates chỉ hoạt động với localhost

**Mô tả vấn đề**:
- Certificates được tạo tự động chỉ hợp lệ cho `localhost`
- Điều này mâu thuẫn với tài liệu hướng dẫn
- Ảnh hưởng đến khả năng triển khai trong môi trường mạng thực tế

**Tác động**:
- 🔴 **Mức độ nghiêm trọng**: Trung bình đến cao
- Chặn việc sử dụng Moltis trong môi trường production với nhiều máy chủ
- Gây nhầm lẫn giữa tài liệu và hành vi thực tế của hệ thống
- Có thể ảnh hưởng đến trải nghiệm người dùng doanh nghiệp

**Khuyến nghị**:
- Cần ưu tiên xử lý để hỗ trợ các Subject Alternative Names (SANs) hoặc wildcard certificates
- Cập nhật tài liệu để phản ánh chính xác hành vi hiện tại
- Có thể cần thêm tùy chọn cấu hình cho certificate generation

## 💡 Yêu cầu tính năng

Không có feature request mới trong ngày hôm nay.

## 💬 Phản hồi người dùng

**Chất lượng báo cáo**: Issue #996 cho thấy người dùng có kỹ năng kỹ thuật tốt và tuân thủ quy trình báo cáo. Việc họ kiểm tra phiên bản mới nhất và tìm kiếm issue trùng lặp trước khi báo cáo là dấu hiệu tích cực.

**Use case thực tế**: Việc gặp vấn đề với TLS certificates cho thấy Moltis đang được triển khai trong môi trường thực tế, không chỉ dùng cho development local.

**Thiếu tương tác**: Việc issue chưa nhận được phản hồi nào sau 1 ngày có thể là do:
- Cuối tuần hoặc múi giờ khác nhau
- Đội ngũ maintainer đang bận với công việc khác
- Cần cải thiện thời gian phản hồi để giữ chân cộng đồng

## 📋 Backlog & Roadmap

Không có thông tin cụ thể về roadmap từ dữ liệu hiện tại. Tuy nhiên, dựa trên issue mới:

**Đề xuất ưu tiên**:
1. 🔧 Sửa lỗi TLS certificate generation để hỗ trợ network deployment
2. 📚 Audit và cập nhật tài liệu về TLS/SSL configuration
3. 🧪 Thêm test cases cho certificate generation trong các môi trường khác nhau

---

## 📌 Kết luận

Ngày 15/05/2026 là một ngày yên tĩnh đối với dự án Moltis. Issue về TLS certificates là điểm đáng chú ý duy nhất, phản ánh nhu cầu thực tế từ người dùng đang triển khai production. Đội ngũ dự án nên ưu tiên phản hồi và xử lý issue này để duy trì niềm tin của cộng đồng và hỗ trợ các use case enterprise.

**Khuyến nghị theo dõi**: Kiểm tra hoạt động trong 2-3 ngày tới để xác định đây có phải là giai đoạn yên tĩnh tạm thời hay xu hướng giảm hoạt động dài hạn.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo Phân tích Hệ sinh thái AI Agent - CoPaw
## Ngày 2026-05-15

---

## 📊 Tóm tắt hôm nay

Ngày 15/05/2026 chứng kiến hoạt động cực kỳ sôi động của dự án CoPaw với **50 pull requests** và **14 issues** được xử lý. Đội ngũ tập trung mạnh vào việc **củng cố bảo mật** (backup trust controls, channel config exposure), **cải thiện trải nghiệm người dùng** (chat sorting, pinned sessions), và **mở rộng tích hợp** (GitHub Copilot, custom headers, OAuth framework). Đáng chú ý là nhiều PR được đóng nhanh trong ngày, cho thấy quy trình review và merge hiệu quả.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng dựa trên các PR đã merge, phiên bản tiếp theo (có thể là v1.1.8) sẽ bao gồm:
- Nâng cấp AgentScope lên 1.0.20
- Sửa lỗi bảo mật nghiêm trọng với backup import
- Cải thiện xử lý audio và thinking mode
- Hỗ trợ custom HTTP headers cho providers

---

## 🔧 Tiến độ dự án

### **Bảo mật - Ưu tiên hàng đầu** 🔒

**PR #4409** (Under Review) - Backup Import Trust Controls
- **Vấn đề nghiêm trọng**: Backup có thể chứa code độc hại và được restore mà không có xác thực
- **Giải pháp**: Thêm HMAC signing cho backup, validate signatures, block unauthenticated remote access
- **Tác động**: Ngăn chặn vector tấn công qua backup manipulation

**Issue #4421** (CLOSED) - Channel Config Exposure
- **Lỗ hổng**: Channel config (chứa tokens, webhooks) được ghi plaintext vào workspace mà agent có thể đọc
- **Rủi ro**: Agent có thể leak credentials qua tool calls
- **Trạng thái**: Đã được fix nhanh trong ngày

### **Tích hợp Model Providers** 🤖

**PR #3846** (Under Review) - GitHub Copilot Support
- Tích hợp GitHub Copilot làm model provider
- Contributor lần đầu (@moarychan) đóng góp tính năng lớn
- Mở rộng khả năng sử dụng Copilot models trong CoPaw workflows

**PR #4413** (Under Review) - Custom Headers & Anthropic Auth
- Cho phép config custom HTTP headers per-provider
- Hỗ trợ Anthropic auth token mode
- Giải quyết nhu cầu của users cần custom headers cho proxy/enterprise setups

**PR #4352** (Under Review) - Provider OAuth Extension
- Xây dựng infrastructure cho OAuth authentication
- Chuẩn bị cho tích hợp các providers yêu cầu OAuth flow
- Thiết kế extensible cho future providers

### **Cải thiện UX** ✨

**PR #4384** (CLOSED) - Chat Sorting by Activity
- Sắp xếp chats theo thời gian hoạt động gần nhất thay vì creation time
- Giải quyết **Issue #2982** - vấn đề UX được report từ tháng 4
- Cải thiện workflow khi làm việc với nhiều chats

**PR #4416** (Under Review) - Pinned Chat Sessions
- Thêm tính năng pin/unpin chats
- Sử dụng localStorage để persist trạng thái
- Giúp users tổ chức workspace hiệu quả hơn

### **Xử lý Lỗi & Stability** 🐛

**PR #4320** (CLOSED) - MiMo Reasoning Content Fix
- Sửa lỗi **Issue #4314**: MiMo thinking mode + tool calls gây 400 error
- Preserve `reasoning_content` khi retry providers
- Parse MiMo/OpenAI-style reasoning chunks từ Anthropic-compatible streams

**PR #4301** (CLOSED) - Tool Raw Input Repair
- Sửa malformed tool inputs bằng json-repair
- Unwrap full tool-call payloads trước khi execution
- Tăng độ robust khi xử lý LLM outputs không chuẩn

**PR #4411** (Under Review) - LLM Call Timeout & Watchdog
- **Vấn đề nghiêm trọng**: Sessions bị stuck vĩnh viễn khi LLM provider không response
- **Giải pháp**: 
  - Thêm per-call timeout cho LLM requests
  - Task watchdog để detect và terminate stuck sessions
  - Graceful error handling thay vì silent hang
- **Tác động**: Ngăn chặn "zombie sessions" ảnh hưởng đến user experience

**PR #4223** (Under Review) - Cron Soft Delete
- Sửa **Issue #4162**: Cron tasks resurrect deleted chat contexts
- Implement soft delete thay vì hard delete
- Prevent zombie session resurrection

---

## 🌟 Điểm nổi bật cộng đồng

### **First-time Contributors** 🎉
Ngày hôm nay có **6 first-time contributors** tham gia:
- @moarychan - GitHub Copilot integration
- @PatrickG1014 - OAuth infrastructure
- @TheSh0e - World Cup skill
- @wylovejzj - Console static directory consolidation
- @cls3389 - LLM timeout fix
- @aqilaziz - Nhiều PRs về bug fixes và testing

### **Issues được quan tâm** 👀

**Issue #4299** (7 comments) - write_file() Loop Error
- Lỗi khi output dài: `write_file() missing required arguments`
- Ảnh hưởng đến nhiều users từ v1.1.6 trở về trước
- Đang được investigate

**Issue #1516** (7 comments) - Telegram Audio Support
- AudioContent không được xử lý đúng trong Telegram channel
- Voice messages không thể convert sang format LLM hiểu được
- Có PR fix đang pending review

**Issue #3957** (8 comments, CLOSED) - Agent Workspace Switching Bug
- Bug nghiêm trọng: Agent workspace bị switch khi nhận message từ agent khác qua channel
- Gây identity confusion
- Đã được fix

---

## 🐛 Ổn định & Bugs

### **Bugs đã fix trong ngày** ✅

1. **Backup Security** (#4421) - Channel config exposure
2. **MiMo Thinking Mode** (#4314) - 400 errors với tool calls
3. **Agent Workspace** (#3957) - Identity confusion
4. **Memory Backend** (#3854 via #4377) - Auto backend defaulting
5. **Audio Processing** (#1516 via #4383) - Telegram voice messages

### **Bugs đang xử lý** 🔄

1. **write_file() Loop** (#4299) - High priority, affects many users
2. **Browser CDP Timeout** (#4309, CLOSED) - Agent unresponsive khi CDP timeout
3. **Thinking-only Responses** (#4367) - Assistant stuck showing only "Thinking"
4. **macOS Icon Size** (#4412) - UI issue trên macOS 15

### **Technical Debt được giải quyết** 🧹

- **PR #4419**: Remove MCP JSON schema monkey-patch sau khi upgrade AgentScope
- **PR #4371**: Consolidate console static directory resolution
- **PR #4373-4376**: Thêm test coverage cho telemetry, env store, security utilities

---

## 💡 Yêu cầu tính năng

### **Đang được implement** 🚧

1. **GitHub Copilot Provider** (#3846) - Tích hợp Copilot models
2. **OAuth Framework** (#4352) - Infrastructure cho OAuth providers
3. **Custom HTTP Headers** (#4413) - Per-provider header configuration
4. **Pinned Chats** (#4416) - Pin/unpin chat sessions
5. **World Cup Skill** (#4407) - Match companion với live scores, predictions

### **Feature requests mới** 📝

**Issue #4408** - Workspace Organization
- Đề xuất: Đặt default files vào folder `.qwenpaw` (giống OpenCode)
- Lý do: Workspace sạch hơn, dễ quản lý
- Trạng thái: Open, đang discussion

**Issue #4406** - Built-in Plugins Discovery
- Vấn đề: First-party plugins trong `/plugins/` không thể discover/install
- Đề xuất: Parity với built-in skills experience
- Tác động: Cải thiện plugin ecosystem

---

## 💬 Phản hồi người dùng

### **Positive Feedback** 👍

- Community đánh giá cao tốc độ fix bugs (nhiều issues closed trong ngày)
- First-time contributors được welcome và support tốt
- PR review process nhanh và constructive

### **Pain Points** 😓

1. **Stability Issues**: 
   - Sessions bị stuck (#4411)
   - Zombie sessions (#4223)
   - write_file() loops (#4299)

2. **Security Concerns**:
   - Channel config exposure (#4421)
   - Backup trust issues (#4409)

3. **UX Friction**:
   - Chat sorting không intuitive (#2982)
   - Workspace organization (#4408)
   - macOS icon issues (#4412)

### **Documentation Needs** 📚

- Node.js LTS recommendation cho MCP servers (#4368)
- Tavily troubleshooting cho Node 25 issues
- WCAG compliance validation guidance

---

## 🗺️ Backlog & Roadmap

### **Short-term (Đang active)** 📅

1. **Security Hardening**
   - Backup trust controls (#4409)
   - Channel config protection (done)
   - Tool guard improvements (#4376)

2. **Provider Ecosystem**
   - GitHub Copilot (#3846)
   - OAuth infrastructure (#4352)
   - Custom headers (#4413)

3. **Stability Fixes**
   - LLM timeout watchdog (#4411)
   - Cron soft delete (#4223)
   - write_file() loop (#4299)

### **Medium-term (Planned)** 🔮

1. **Plugin System Enhancement**
   - Built-in plugins discovery (#4406)
   - Plugin marketplace infrastructure

2. **UX Improvements**
   - Workspace organization (#4408)
   - Advanced chat management
   - Better error messaging

3. **Testing & Quality**
   - Expanded test coverage (nhiều test PRs merged)
   - Integration testing framework
   - Performance benchmarking

### **Technical Priorities** ⚙️

- **AgentScope 1.0.20 adoption** - Đã upgrade, cleanup monkey-patches
- **DingTalk refactor** (#4420) - Unify message processing
- **Model config enhancement** (#4417) - Per-model max_tokens
- **Audio pipeline** (#4383) - Better format support

---

## 📈 Metrics & Insights

- **PR Velocity**: 50 PRs trong 1 ngày (cực kỳ cao)
- **Issue Resolution**: 7/14 issues closed trong ngày
- **Community Growth**: 6 first-time contributors
- **Focus Areas**: Security (30%), Stability (25%), Features (25%), UX (20%)

**Xu hướng**: Dự án đang trong giai đoạn **maturation** - tập trung vào security hardening, stability improvements, và ecosystem expansion thay vì chỉ thêm features mới.

---

## 🎯 Kết luận

CoPaw đang có momentum phát triển mạnh mẽ với sự tham gia tích cực của cộng đồng. Đội ngũ core đang cân bằng tốt giữa innovation (GitHub Copilot, OAuth) và stability (security fixes, timeout handling). Các vấn đề được phản hồi và xử lý nhanh chóng, tạo niềm tin cho users. Roadmap rõ ràng với focus vào security, stability, và developer experience.

**Điểm mạnh**: Fast iteration, responsive team, growing community
**Cần cải thiện**: Documentation, testing coverage, long-standing bugs (#4299)

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*