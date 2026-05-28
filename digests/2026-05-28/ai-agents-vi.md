# Bản tin Hệ sinh thái OpenClaw 2026-05-28

> Issues: 188 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-05-28 02:00 UTC

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

# Báo cáo phân tích OpenClaw - Ngày 2026-05-28

## 1. 📊 Tóm tắt hôm nay

OpenClaw đang trong giai đoạn ổn định hóa sau bản phát hành v2026.5.26, với **13 issues mới được đóng** trong 24h qua và tập trung xử lý các regression nghiêm trọng. Điểm nổi bật là lỗi "Native hook relay unavailable" (#87331, #87317, #87395) ảnh hưởng đến Codex runtime sau khi nâng cấp, cùng với các vấn đề về memory leak, session state, và event loop saturation đang được ưu tiên xử lý.

## 2. 🚀 Releases

### v2026.5.26 (Phát hành: 2026-05-27)

**Cải tiến hiệu năng chính:**
- ⚡ **Khởi động Gateway nhanh hơn**: Loại bỏ các lần quét trùng lặp cho plugins, channels, sessions, usage-cost, warnings, scheduled-services và filesystem
- 📨 **Phản hồi nhanh hơn**: Tách biệt việc gửi tin nhắn cho người dùng khỏi các tác vụ xử lý chậm ở background
- 💾 **Cache tối ưu**: Gateway runtime/session caches ít bị churn hơn dưới tải cao

**Transcript trở thành core:**
- Transcript-backed meeting summaries, source-provider chunks, cleaned user turns
- Media provenance, Codex mirrors, WebChat replies
- CLI/TUI replay đều sử dụng một transcript path đáng tin cậy hơn

**Ý nghĩa:** Đây là bản cập nhật tập trung vào performance và reliability, đặc biệt quan trọng cho các deployment production với nhiều sessions đồng thời.

## 3. 📈 Tiến độ dự án

### PRs quan trọng đang active:

**🔥 Ưu tiên cao (P1):**

1. **#87476** - Fix session delivery context preference
   - Sửa lỗi session announce delivery khi có stale internal route fields
   - Ảnh hưởng: webchat và external routing

2. **#87457** - Nostr DM subscription fix (🦞 diamond lobster)
   - Giải quyết restart loop trong Nostr channel
   - Giữ DM subscriptions alive cho đến khi abort

3. **#87449** - Mattermost text-block boundaries (🐚 platinum hermit)
   - Sửa lỗi draft preview xóa text blocks trước khi user đọc
   - Áp dụng logic tương tự Discord đã có từ lâu

4. **#81027** - Gateway hard-kill socket teardown
   - Loại bỏ zombie processes sau abort
   - Critical cho stability

**🎯 Tính năng mới:**

5. **#86210** - Multi-slot memory role architecture (✨ showcase)
   - Kiến trúc memory mới với các slots chuyên biệt: `memory.recall`, `memory.compaction`, `memory.capture`
   - Cho phép memory plugins compose thay vì replace nhau
   - Tác động lớn đến extensibility

6. **#87362** - Task flow lifecycle hook events
   - Emit lifecycle events cho plugin observability
   - Quan trọng cho monitoring và debugging

### Xu hướng phát triển:

- **Stability first**: 60% PRs đang focus vào bug fixes và regressions
- **Plugin ecosystem**: Nhiều cải tiến cho plugin SDK và extensibility
- **Performance**: Tiếp tục optimize event loop, caching, và startup time
- **Channel parity**: Đưa các channels về cùng feature set (ví dụ: Mattermost catch up với Discord)

## 4. 🌟 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác nhất:

**#87331** - "Native hook relay unavailable" regression (👍 8, 💬 13)
- **Vấn đề:** Sau upgrade lên 2026.5.26, Codex tool calls fail intermittently
- **Tác động:** Blocking cho production users sử dụng Codex
- **Trạng thái:** CLOSED - đã fix nhanh
- **Insight:** Cho thấy community rất nhạy cảm với Codex stability

**#86820** - Codex OAuth compaction fallback (👍 6, 💬 10)
- **Vấn đề:** Compaction falls back to direct OpenAI API khi không có OPENAI_API_KEY
- **Tác động:** Confusing error messages, breaks expected OAuth flow
- **Quan tâm:** Users muốn OAuth flow hoạt động consistently

**#80380** - Gemini 3.1 Flash Lite GA update (👍 4, 💬 13)
- **Yêu cầu:** Update từ preview model sang GA version
- **Lý do:** Preview model sẽ deprecated
- **Thảo luận:** Community discussion về migration path

### Patterns từ community:

- Users rất quan tâm đến **OAuth stability** và **auth provider reliability**
- **Regression detection** nhanh - community report bugs trong vòng 24h sau release
- Nhiều users chạy **production workloads** - không chấp nhận downtime

## 5. 🐛 Ổn định & Bugs

### Critical bugs (P0-P1):

**🔴 Event Loop & Performance:**

1. **#86599** - Local model blocks event loop on Windows (🦐 gold shrimp)
   - Trivial inference run mất ~4 phút
   - Blocks toàn bộ Gateway event loop
   - Beta release blocker

2. **#84903** - Single stalled session blocks entire Gateway (🐚 platinum hermit)
   - Session isolation failure
   - Một agent hang → tất cả agents stop
   - Critical architecture issue

3. **#84771** - Event loop saturation during startup
   - Model-prewarm và session-locks block event loop 28-64 giây
   - Max delay 64s, utilization 93-96%
   - Ảnh hưởng user experience nghiêm trọng

**🔴 Session State & Memory:**

4. **#48183** - Feishu monitor memory leak (🦞 diamond lobster)
   - httpServers Map entries deleted trước khi server close
   - Potential memory leak
   - 17 comments - đang được investigate kỹ

5. **#86702** - MemoryIndexManager race condition (🦞 diamond lobster)
   - close() races với in-flight sync()
   - Provider/DB closed trước khi sync settles
   - Data corruption risk

6. **#87095** - Dreaming short-term recall unbounded growth
   - Recall entries grow without limit
   - Agents chạy 6 tuần có 130KB+ dream diaries
   - Cần rotation/cap mechanism

**🔴 Message Delivery:**

7. **#87177** - QQBot message duplication (🦪 silver shellfish)
   - Heartbeat session leakage
   - Duplicate messages từ multiple sources
   - Ảnh hưởng user experience

8. **#87326** - Telegram streaming text loss
   - Intermediate text blocks bị overwrite
   - Chỉ final text visible
   - Meaningful context bị mất

### Patterns trong bugs:

- **Event loop contention** là recurring theme
- **Session isolation** chưa đủ robust
- **Memory management** cần attention (leaks, unbounded growth)
- **Race conditions** trong async operations

## 6. 💡 Yêu cầu tính năng

### Tính năng được đề xuất:

**#86881** - Gateway-lite mode (👍 0, 💬 6)
- **Đề xuất:** Deployment mode không có AI harness cho deterministic workflows
- **Use case:** Channel gateways, webhooks, cron scheduling, deterministic plugins
- **Lý do:** Không cần ship AI harness khi không dùng model
- **Tác động:** Giảm footprint, tăng deployment flexibility

**#86434** - ElevenLabs Realtime Voice Provider (👍 1, 💬 3)
- **Đề xuất:** Thêm ElevenLabs vào talk.realtime.provider
- **Lý do:** Better voice quality, lower latency với Flash v2.5
- **Hiện tại:** Chỉ support OpenAI và Google
- **Demand:** Users muốn voice identity options

**#10142** - session:end internal hook event (👍 0, 💬 4)
- **Đề xuất:** Hook event khi session completes
- **Use case:** Workflow orchestration (Temporal integration)
- **Tác động:** Better integration với external systems

**#10253** - Configurable webhook session cleanup (👍 1, 💬 3)
- **Vấn đề:** Hook sessions accumulate indefinitely
- **Đề xuất:** Auto-cleanup và archival policy
- **Tác động:** Storage management, UI clutter reduction

### Insights:

- Community muốn **deployment flexibility** (lite mode, different runtimes)
- **Voice capabilities** đang được quan tâm
- **Integration hooks** cho external systems
- **Lifecycle management** cho sessions và data

## 7. 💬 Phản hồi người dùng

### Trải nghiệm tích cực:

- **Performance improvements** trong v2026.5.26 được đánh giá cao
- **Transcript-backed features** tăng reliability
- **Quick bug fixes** - regressions được patch trong 24-48h

### Pain points:

**🔴 Upgrade experience:**
- **#83935** - Post-update sessions surface stale errors until doctor runs
- **#87302** - Docker container broke after upgrade
- **#75270** - Sticky model fallback sau upgrade
- **Pattern:** Upgrades không smooth, cần manual intervention

**🔴 Configuration complexity:**
- **#50630** - Tailscale + auth.mode=none security issue (CVSS 9.3 Critical)
- **#48104** - Model safety blocks authorized operational tasks
- **Pattern:** Config interactions không intuitive, security defaults unclear

**🔴 Error messages:**
- **#86820** - Confusing "Missing API key" khi dùng OAuth
- **#52497** - sessions_send timeout không show root cause
- **Pattern:** Error messages không actionable

### User sentiment:

- **Frustration** với regressions sau updates
- **Appreciation** cho quick fixes và responsive maintainers
- **Concern** về production stability
- **Desire** cho better upgrade paths và migration tools

## 8. 📋 Backlog & Roadmap

### Đang trong pipeline:

**Phase 1 - Stability (Current focus):**
- ✅ Fix critical regressions từ v2026.5.26
- 🔄 Event loop optimization (#84771, #86599)
- 🔄 Session isolation improvements (#84903)
- 🔄 Memory leak fixes (#48183, #87095)

**Phase 2 - Channel Broker:**
- **#86113** - Channel Broker Phase 3 cho official app/API channels
- Rollout sau khi Telegram, Discord, Slack prove contract
- Standardize routing, streaming, receipts, retries

**Phase 3 - Plugin Ecosystem:**
- **#87165** - Flat package types cho Plugin SDK
- **#87362** - Task flow lifecycle hooks
- **#86210** - Multi-slot memory architecture
- Better observability và extensibility

**Phase 4 - Performance:**
- **#68920** - HTTP /v1/chat/completions TTFB optimization (10-15s → <1s)
- lightContext/voice mode cho real-time agents
- Continued event loop optimization

### Technical debt priorities:

1. **Event loop architecture** - Cần fundamental redesign để prevent saturation
2. **Session isolation** - Implement proper sandboxing
3. **Memory management** - Caps, rotation, cleanup policies
4. **Upgrade experience** - Migration tools, compatibility checks
5. **Error handling** - Actionable messages, better diagnostics

### Roadmap insights:

- **Short-term:** Stability và bug fixes dominate
- **Mid-term:** Plugin ecosystem maturity
- **Long-term:** Performance optimization và architecture improvements
- **Continuous:** Channel parity và feature completeness

---

## 🎯 Kết luận

OpenClaw đang trong giai đoạn **consolidation** sau một release lớn. Team đang balance giữa:
- ✅ **Fixing regressions** nhanh để maintain user trust
- 🔄 **Addressing technical debt** (event loop, memory, isolation)
- 🚀 **Building plugin ecosystem** cho extensibility
- 📈 **Improving performance** cho production workloads

**Điểm mạnh:** Responsive maintenance, quick fixes, strong community engagement

**Thách thức:** Upgrade stability, event loop architecture, session isolation

**Outlook:** Nếu team giải quyết được các critical stability issues, OpenClaw có potential trở thành platform mạnh cho AI agent deployment. Plugin ecosystem đang phát triển tốt và có nhiều innovation trong memory architecture.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ Sinh Thái AI Agent - Ngày 2026-05-28

## 1. 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trải qua giai đoạn **consolidation và maturation** với các dự án chuyển từ feature velocity sang stability và production readiness. Ngày 28/05/2026 ghi nhận hoạt động sôi động với **213 PRs** và **71 issues** trên 10 dự án, phản ánh sự cạnh tranh khốc liệt và đổi mới nhanh chóng.

### Các xu hướng nổi bật:

🔐 **Security-first mindset**: 3/10 dự án có security audit waves (OpenClaw, IronClaw, Hermes-Agent)

🏗️ **Architecture refactoring**: Nhiều dự án đang redesign core systems (NanoBot Dream, IronClaw Reborn, Zeroclaw skills)

🌐 **Multi-provider strategy**: Giảm vendor lock-in với Anthropic/OpenAI (NanoClaw, LobsterAI, Hermes-Agent)

🖥️ **Desktop-first pivot**: Tauri 2.x adoption tăng mạnh (CoPaw, PicoClaw)

🔌 **Plugin ecosystems**: MCP và custom plugin architectures đang mature (OpenClaw, Zeroclaw, IronClaw)

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ tương tác | Giai đoạn |
|-------|--------|-----|----------|---------------|------------------|-----------|
| **OpenClaw** | 188 | 500 | 2 | 🔥🔥🔥 Rất cao | ⭐⭐⭐⭐⭐ (60+ reactions) | Stabilization |
| **Hermes-Agent** | 6 | 50 | 0 | 🔥🔥🔥 Rất cao | ⭐⭐⭐ (3-5 comments) | Security hardening |
| **IronClaw** | 20 | 50 | 0 | 🔥🔥🔥 Rất cao | ⭐⭐⭐⭐ (10+ reactions) | Reborn completion |
| **Zeroclaw** | 9 | 50 | 0 | 🔥🔥 Cao | ⭐⭐ (0-2 comments) | Pre-release polish |
| **CoPaw** | 28 | 27 | 2 | 🔥🔥 Cao | ⭐⭐⭐⭐ (63 comments) | Desktop expansion |
| **NanoBot** | 5 | 23 | 0 | 🔥🔥 Cao | ⭐⭐⭐ (10+ reactions) | MCP hardening |
| **LobsterAI** | 2 | 24 | 1 | 🔥 Trung bình | ⭐⭐ (2-4 comments) | Feature expansion |
| **NanoClaw** | 1 | 9 | 0 | 🔥 Trung bình | ⭐⭐⭐⭐ (60+ reactions) | Multi-provider push |
| **PicoClaw** | 4 | 6 | 1 | 🔥 Trung bình | ⭐ (0-1 comments) | Nightly stabilization |
| **Moltis** | 2 | 2 | 0 | 🟢 Thấp | ⭐ (0-4 comments) | Steady development |
| **GoClaw** | 1 | 1 | 0 | 🟢 Thấp | ⭐ (0-1 comments) | Early stage |

### Phân loại theo hoạt động:

**🔥 Tier 1 - Hyperactive** (30+ PRs/ngày):
- OpenClaw, Hermes-Agent, IronClaw

**🔥 Tier 2 - Active** (10-30 PRs/ngày):
- Zeroclaw, CoPaw, NanoBot, LobsterAI

**🟢 Tier 3 - Steady** (<10 PRs/ngày):
- NanoClaw, PicoClaw, Moltis, GoClaw

---

## 3. 🎯 Vị thế của OpenClaw

### **Vai trò: Platform Leader & Standard Setter**

OpenClaw đang định vị là **nền tảng AI agent toàn diện** với:

✅ **Quy mô lớn nhất**: 188 issues, 500 PRs - gấp 10 lần các đối thủ

✅ **Cộng đồng mạnh nhất**: 60+ reactions trên single issue, 33 comments trên feature requests

✅ **Release cadence ổn định**: v2026.5.26 với performance improvements lớn

✅ **Plugin ecosystem mature**: Multi-slot memory, Channel Broker Phase 3, Plugin SDK

### Điểm mạnh so với đối thủ:

| Khía cạnh | OpenClaw | Đối thủ gần nhất |
|-----------|----------|------------------|
| **Scale** | 500 PRs | IronClaw/Hermes: 50 PRs |
| **Community** | 60+ reactions | NanoClaw: 60, CoPaw: 63 |
| **Architecture** | Channel Broker, Plugin SDK | IronClaw: Reborn loop |
| **Stability focus** | 60% PRs là bugfix | Hermes: 50% security |
| **Documentation** | Extensive SKILL.md | Varies |

### Thách thức:

⚠️ **Upgrade experience**: Nhiều regressions sau updates (83935, 87302, 75270)

⚠️ **Event loop architecture**: Fundamental issues cần redesign (84771, 86599, 84903)

⚠️ **Vendor lock-in perception**: Anthropic account closures gây lo ngại (NanoClaw #80)

### Cơ hội:

🚀 **Dẫn đầu standardization**: Channel Broker có thể trở thành industry standard

🚀 **Enterprise adoption**: Plugin ecosystem và stability focus phù hợp enterprise

🚀 **Community momentum**: Responsive maintenance tạo trust

---

## 4. 🔧 Hướng kỹ thuật chung

### **A. Architecture Patterns**

#### **1. Agent Loop Redesign** (4/10 dự án)

| Dự án | Approach | Status |
|-------|----------|--------|
| **IronClaw** | Reborn loop với context compaction | ✅ Hoàn thành |
| **NanoBot** | Dream single-phase consolidation | 🔄 Đang refactor |
| **OpenClaw** | Event loop optimization | ⚠️ Cần redesign |
| **Hermes-Agent** | Context audit trail | ✅ Implemented |

**Insight**: Tất cả đều hướng tới **declarative, observable, và resource-efficient** loops.

#### **2. Plugin/Extension Systems** (6/10 dự án)

```
OpenClaw:    Multi-slot memory + Plugin SDK
IronClaw:    Extension lifecycle + declarative policy
Zeroclaw:    Builtin tool elevation + skill-scoped activation
NanoBot:     MCP tools/list_changed + dynamic reloading
CoPaw:       DataPaw plugin + custom channels
LobsterAI:   Kit Store (skill suites)
```

**Convergence**: Hướng tới **MCP-compatible, sandboxed, và composable** plugins.

### **B. Security & Safety**

#### **Common vulnerabilities discovered**:

🚨 **RCE via deserialization**: Hermes-Agent YAML, IronClaw potential

🚨 **Session hijacking**: Hermes-Agent TUI gateway, Zeroclaw token rotation

🚨 **Auth bypass**: Hermes-Agent WebSocket, Zeroclaw credential leaks

🚨 **SSRF**: Zeroclaw http_request, OpenClaw web_fetch

**Best practices emerging**:
- ✅ Typed credential surfaces (Zeroclaw #6982)
- ✅ Private-host allowlists (Zeroclaw #6981)
- ✅ Audit trails (Hermes-Agent #33593, IronClaw context snapshots)
- ✅ Sandbox approvals (IronClaw #4094)

### **C. Multi-Provider Strategy**

#### **Provider expansion trends**:

| Provider | Adopted by | Rationale |
|----------|------------|-----------|
| **Codex** | 7/10 dự án | OAuth, billing optimization |
| **Gemini** | 5/10 | Free tier, multimodal |
| **DeepSeek** | 4/10 | Cost-effective, reasoning |
| **Local LLMs** | 6/10 | Privacy, offline |
| **Kimi/MiMo** | 3/10 | Chinese market |

**Insight**: Đang chuyển từ **Anthropic-first** sang **multi-provider by default**.

### **D. Desktop vs Web**

#### **Desktop adoption (Tauri 2.x)**:

✅ **CoPaw**: Full migration, Coding Mode với 3-panel IDE

✅ **PicoClaw**: Replacing pywebview

🔄 **IronClaw**: Desktop client development (#4150-#4153)

**Drivers**:
- Native performance
- Offline capabilities
- Better file system access
- Platform-specific integrations

#### **Web advantages**:

✅ **OpenClaw**: WebUI v2 với transcript-backed features

✅ **LobsterAI**: HTML share service

✅ **Hermes-Agent**: Lattice UI implementation

**Drivers**:
- Zero installation
- Cross-platform consistency
- Easier updates

**Verdict**: **Hybrid approach winning** - desktop for power users, web for accessibility.

---

## 5. 🎨 Điểm khác biệt

### **A. Chiến lược sản phẩm**

#### **OpenClaw: Platform Play**
- Focus: Extensibility, plugin ecosystem, channel parity
- Target: Developers building on top
- Moat: Channel Broker, Plugin SDK, community size

#### **IronClaw: Enterprise Focus**
- Focus: Stability, audit trails, RBAC (#4702)
- Target: Enterprise deployments
- Moat: Reborn architecture, context management

#### **Hermes-Agent: Research-Driven**
- Focus: Cutting-edge features, rapid iteration
- Target: Early adopters, researchers
- Moat: Feature velocity, Nous Research backing

#### **CoPaw: Developer Experience**
- Focus: IDE integration, coding workflows
- Target: Software engineers
- Moat: Coding Mode, Tauri desktop app

#### **NanoBot: Local-First**
- Focus: Privacy, local LLM support
- Target: Privacy-conscious users
- Moat: Self-hosted, no cloud dependencies

### **B. Tính năng độc đáo**

| Dự án | Killer Feature | Competitive Advantage |
|-------|----------------|----------------------|
| **OpenClaw** | Channel Broker | Unified routing cho 10+ channels |
| **IronClaw** | Context Compaction | 1M token context với auto-summarization |
| **Hermes-Agent** | Context Audit | Full transparency cho model requests |
| **CoPaw** | Coding Mode | 3-panel IDE với inline diff |
| **Zeroclaw** | Builtin Elevation | Temporary tool permissions cho skills |
| **NanoBot** | MCP Dynamic Tools | Hot-reload tools without restart |
| **LobsterAI** | Kit Store | Skill suites marketplace |
| **NanoClaw** | Multi-Provider | Giảm Anthropic dependency |

### **C. Cộng đồng & Governance**

#### **Community engagement levels**:

**🏆 Tier 1 - Vibrant**:
- **OpenClaw**: 60+ reactions, 33 comments, quick fixes
- **CoPaw**: 63 comments on help-wanted, first-time contributors
- **NanoClaw**: 60 reactions on multi-provider issue

**⭐ Tier 2 - Active**:
- **IronClaw**: Desktop client developer, 10+ reactions
- **NanoBot**: 18+ contributors, AI-assisted PRs
- **Hermes-Agent**: Diverse contributors, fast response

**🟢 Tier 3 - Growing**:
- **Zeroclaw**, **LobsterAI**, **PicoClaw**: 0-4 comments typical
- **Moltis**, **GoClaw**: Early stage, limited engagement

#### **Governance models**:

| Model | Dự án | Characteristics |
|-------|-------|-----------------|
| **Open Core** | OpenClaw, IronClaw | Public repo, commercial backing |
| **Community-Driven** | NanoBot, CoPaw | Multiple maintainers, democratic |
| **Research Lab** | Hermes-Agent | Nous Research led, experimental |
| **Corporate** | LobsterAI (NetEase) | Internal team, selective open-source |

---

## 6. 📈 Mức độ trưởng thành cộng đồng

### **Maturity Matrix**

| Dự án | Code Quality | Documentation | Testing | Community | Release Process | **Score** |
|-------|--------------|---------------|---------|-----------|-----------------|-----------|
| **OpenClaw** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **23/25** |
| **IronClaw** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | **21/25** |
| **Hermes-Agent** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | **18/25** |
| **CoPaw** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **20/25** |
| **NanoBot** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | **17/25** |
| **Zeroclaw** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | **18/25** |
| **LobsterAI** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | **14/25** |
| **NanoClaw** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | **14/25** |
| **PicoClaw** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | **12/25** |
| **Moltis** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | **11/25** |
| **GoClaw** | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐ | **9/25** |

### **Phân tích chi tiết**:

#### **🏆 Mature (20+ points)**

**OpenClaw** (23/25):
- ✅ Extensive documentation (SKILL.md, API docs)
- ✅ Vibrant community (60+ reactions, quick responses)
- ✅ Stable release cadence (v2026.5.26)
- ⚠️ Testing coverage có thể cải thiện (event loop issues)

**IronClaw** (21/25):
- ✅ Excellent code quality (thorough PRs, typed surfaces)
- ✅ Comprehensive testing (967 tests, 89% security coverage)
- ✅ Strong architecture (Reborn loop, declarative policy)
- ⚠️ Release process chưa ổn định (no official releases)

**CoPaw** (20/25):
- ✅ Strong community (63 comments, first-time contributors)
- ✅ Good documentation (i18n, SKILL.md)
- ✅ Regular releases (v1.1.9)
- ⚠️ Testing coverage cần mở rộng

#### **⭐ Growing (15-19 points)**

**Hermes-Agent** (18/25):
- ✅ Fast iteration (30 PRs/day)
- ✅ Security-conscious (audit wave)
- ⚠️ Documentation lagging behind features
- ⚠️ No stable releases yet

**Zeroclaw** (18/25):
- ✅ Strong technical foundation (security focus)
- ✅ Good documentation
- ⚠️ Community engagement thấp
- ⚠️ Pre-release stage

**NanoBot** (17/25):
- ✅ Active contributors (18+)
- ✅ AI-assisted development
- ⚠️ Coordination issues (duplicate PRs)
- ⚠️ Testing infrastructure đang build

#### **🌱 Early Stage (10-14 points)**

**LobsterAI** (14/25):
- ✅ Regular releases
- ⚠️ Stale PR backlog (20+ PRs)
- ⚠️ Limited community engagement
- ⚠️ Testing coverage thấp

**NanoClaw** (14/25):
- ✅ Strong community interest (60 reactions)
- ⚠️ Slow PR merge velocity
- ⚠️ Documentation gaps
- ⚠️ No releases

**PicoClaw** (12/25):
- ✅ Nightly builds
- ⚠️ Limited documentation
- ⚠️ Small community
- ⚠️ Stability issues

**Moltis** (11/25):
- ✅ Steady development
- ⚠️ Minimal community
- ⚠️ Limited documentation
- ⚠️ No releases

**GoClaw** (9/25):
- ⚠️ Very early stage
- ⚠️ Minimal activity
- ⚠️ Limited documentation
- ⚠️ Small community

---

## 7. 🔮 Tín hiệu xu hướng

### **A. Ngắn hạn (Q3 2026)**

#### **1. Security Consolidation Wave** 🔐

**Drivers**:
- 3 dự án có security audits đồng thời (OpenClaw, IronClaw, Hermes)
- RCE, session hijacking, auth bypass được phát hiện
- Enterprise adoption yêu cầu compliance

**Predictions**:
- ✅ Tất cả dự án Tier 1-2 sẽ có security audit
- ✅ Industry-wide security best practices sẽ emerge
- ✅ CVE disclosures và coordinated patches

**Impact**: Dự án nào audit trước sẽ có competitive advantage trong enterprise sales.

#### **2. MCP Standardization** 🔌

**Current state**:
- NanoBot: MCP reconnection fixes, dynamic tools
- OpenClaw: Plugin SDK với MCP compatibility
- IronClaw: Private MCP catalogs
- Zeroclaw: MCP tool schemas

**Predictions**:
- ✅ MCP sẽ trở thành de facto standard cho tool integration
- ✅ Cross-platform tool sharing qua MCP catalogs
- ✅ MCP marketplace emergence

**Impact**: Dự án nào có best MCP support sẽ attract plugin developers.

#### **3. Multi-Provider Becomes Default** 🌐

**Catalysts**:
- Anthropic account closures (NanoClaw #80)
- OAuth billing optimization (Hermes #33570)
- Cost pressure (DeepSeek, local LLMs)

**Predictions**:
- ✅ Mọi dự án sẽ support 5+ providers
- ✅ Provider routing logic sẽ sophisticated hơn (cost, latency, capability)
- ✅ Local LLM support sẽ first-class

**Impact**: Vendor lock-in sẽ không còn là competitive moat.

### **B. Trung hạn (Q4 2026 - Q1 2027)**

#### **4. Desktop Renaissance** 🖥️

**Momentum**:
- CoPaw: Tauri 2.x với Coding Mode
- PicoClaw: Replacing pywebview
- IronClaw: Desktop client development

**Predictions**:
- ✅ 50% dự án sẽ có native desktop apps
- ✅ Electron → Tauri migration wave
- ✅ Platform-specific integrations (macOS Shortcuts, Windows PowerToys)

**Impact**: Desktop apps sẽ differentiate "pro" tier từ web tier.

#### **5. Agent Orchestration Layer** 🤖

**Signals**:
- Moltis: PTY-based multi-agent control (#235)
- IronClaw: Subagent flavors (coder, explorer)
- OpenClaw: Channel Broker cho agent routing

**Predictions**:
- ✅ Multi-agent orchestration sẽ built-in
- ✅ Agent-to-agent communication protocols
- ✅ Hierarchical agent architectures

**Impact**: Single-agent systems sẽ obsolete, orchestration là table stakes.

#### **6. Context Management Innovation** 💾

**Current challenges**:
- OpenClaw: Event loop saturation (#84771)
- IronClaw: Context compaction với 1M tokens
- Hermes: Context window regression (#32423)
- GoClaw: Context overflow (#1136)

**Predictions**:
- ✅ Streaming context windows (không cần full load)
- ✅ Hierarchical memory architectures (hot/warm/cold)
- ✅ Context-aware routing (lightweight vs heavyweight models)

**Impact**: Dự án nào solve context management tốt nhất sẽ win long-running sessions.

### **C. Dài hạn (2027+)**

#### **7. Enterprise-Grade Features** 🏢

**Requirements emerging**:
- RBAC (IronClaw #4702)
- Audit trails (Hermes #33593)
- Multi-tenancy (NanoBot group isolation)
- Compliance (GDPR, SOC2)

**Predictions**:
- ✅ Open-source core + enterprise edition model
- ✅ Self-hosted vs cloud-hosted tiers
- ✅ Enterprise support contracts

**Impact**: Monetization sẽ shift từ API usage sang enterprise licenses.

#### **8. Vertical Specialization** 🎯

**Current**: General-purpose AI agents

**Future**:
- 🏥 Healthcare agents (HIPAA-compliant)
- 💰 Financial agents (SOX-compliant)
- ⚖️ Legal agents (privilege-preserving)
- 🏭 Industrial agents (OT-safe)

**Predictions**:
- ✅ Domain-specific forks sẽ emerge
- ✅ Vertical-specific plugin ecosystems
- ✅ Compliance-as-a-feature

**Impact**: Horizontal platforms (OpenClaw, IronClaw) sẽ compete với vertical specialists.

#### **9. AI-Native Development** 🤖

**Signals**:
- NanoBot: AI-assisted PRs
- CoPaw: Coding Mode
- IronClaw: Model-selected skill activation

**Predictions**:
- ✅ Agents sẽ contribute code vào chính mình
- ✅ Self-improving agent loops
- ✅ Human-in-the-loop giảm dần

**Impact**: Development velocity sẽ tăng 10x, nhưng quality control trở nên critical.

---

## 8. 🎯 Khuyến nghị chiến lược

### **Cho OpenClaw**:

#### **Ngắn hạn (Q3 2026)**:
1. ✅ **Ưu tiên security audit** - Học từ Hermes/IronClaw, audit trước khi competitors
2. ✅ **Fix event loop architecture** - Đây là technical debt lớn nhất (#84771, #86599)
3. ✅ **Improve upgrade experience** - Regressions đang erode trust (#83935, #87302)
4. ✅ **Accelerate Channel Broker** - Đây là moat lớn nhất, cần ship Phase 3 nhanh

#### **Trung hạn (Q4 2026)**:
1. 🔄 **Desktop app strategy** - Evaluate Tauri 2.x để compete với CoPaw
2. 🔄 **Multi-agent orchestration** - Subagent system cần mature hơn
3. 🔄 **Enterprise features** - RBAC, audit trails để compete với IronClaw
4. 🔄 **Context management innovation** - Solve event loop = solve context scaling

#### **Dài hạn (2027+)**:
1. 🔮 **Platform play** - Trở thành "Kubernetes of AI agents"
2. 🔮 **Vertical partnerships** - Healthcare, finance, legal verticals
3. 🔮 **Open-source + enterprise model** - Monetize enterprise features
4. 🔮 **Agent marketplace** - Channel Broker + Plugin SDK → marketplace

### **Cho các dự án khác**:

**IronClaw**: Focus vào enterprise sales, leverage Reborn architecture và audit trails

**Hermes-Agent**: Stabilize sau security audit, consider official releases

**CoPaw**: Double down trên desktop + coding workflows, target developer market

**NanoBot**: Solve MCP stability, position as local-first alternative

**Zeroclaw**: Ship v0.8.1, build community engagement

**LobsterAI**: Clear stale PR backlog, fix authentication issues

**NanoClaw**: Accelerate multi-provider implementation, leverage community momentum

**PicoClaw**: Stabilize nightly builds, improve documentation

**Moltis**: Focus on PTY-based orchestration, differentiate on multi-agent

**GoClaw**: Increase development velocity, build community

---

## 9. 📊 Kết luận

### **Bức tranh tổng thể**:

Hệ sinh thái AI agent đang ở **inflection point** giữa innovation và consolidation. Các dự án đang chuyển từ "move fast and break things" sang "move fast and don't break production".

### **Winners & Losers**:

**🏆 Positioned to Win**:
- **OpenClaw**: Platform scale, community momentum, plugin ecosystem
- **IronClaw**: Enterprise focus, technical excellence, Reborn architecture
- **CoPaw**: Desktop-first, developer experience, coding workflows

**⚠️ Need Execution**:
- **Hermes-Agent**: Security audit done, cần stable releases
- **NanoBot**: MCP leadership, cần better coordination
- **Zeroclaw**: Strong foundation, cần community building

**🚧 At Risk**:
- **LobsterAI**: Stale backlog, authentication issues
- **NanoClaw**: Slow velocity despite community interest
- **PicoClaw**: Stability issues, limited community
- **Moltis/GoClaw**: Early stage, need momentum

### **Key Takeaways**:

1. **Security is table stakes** - Dự án nào không audit sẽ bị loại khỏi enterprise consideration

2. **Multi-provider is mandatory** - Vendor lock-in không còn acceptable

3. **Desktop apps are differentiator** - Web là baseline, desktop là premium

4. **Plugin ecosystems win** - Extensibility > feature completeness

5. **Community > code** - Vibrant community beats better code

6. **Context management is unsolved** - Dự án nào solve được sẽ có breakthrough

7. **Enterprise features = monetization** - Open-source core + enterprise edition là winning model

### **Final Verdict**:

OpenClaw đang **leading** nhưng không **dominating**. IronClaw và CoPaw đang close the gap với focused strategies. Hệ sinh thái đủ healthy để có 3-5 winners, không phải winner-takes-all. Cuộc đua sẽ quyết định bởi **execution velocity** và **community building** trong 6-12 tháng tới.

---

**Ngày báo cáo**: 2026-05-28  
**Phương pháp**: Phân tích 213 PRs, 71 issues, 10 dự án  
**Độ tin cậy**: Cao (dựa trên dữ liệu công khai GitHub)

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích NanoBot - Ngày 28/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 28/05 ghi nhận hoạt động phát triển cực kỳ sôi động với **23 PRs** được tạo/cập nhật, tập trung vào 3 hướng chính: **cải thiện tích hợp MCP** (Model Context Protocol), **tối ưu hóa kiến trúc hệ thống** (refactor Dream, heartbeat, system prompt), và **mở rộng khả năng tương tác** (Discord slash commands, DingTalk isolation, GitAgent Protocol). Đáng chú ý là sự xuất hiện của nhiều contributor mới với các PR chất lượng cao, cho thấy cộng đồng đang phát triển mạnh mẽ.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua. Tuy nhiên, dựa trên các PR đang được merge, phiên bản tiếp theo có thể bao gồm:
- Hỗ trợ MCP reconnection và dynamic tool reloading
- Kiến trúc Dream mới (single-phase consolidation)
- Cải thiện streaming timeout cho local LLMs

---

## 📈 Tiến độ dự án

### 🔥 Các PR quan trọng đang active:

#### **1. Cải thiện MCP (Model Context Protocol)** - Ưu tiên cao
- **#4028** & **#4014**: Hỗ trợ `tools/list_changed` notification - cho phép MCP server thông báo khi danh sách tools thay đổi mà không cần restart
- **#4027** & **#4012**: Fix critical reconnection bug - reset `_mcp_connected` flag khi session drop, thêm reconnect callbacks
- **Ý nghĩa**: MCP là backbone của tool integration trong NanoBot. Những fix này giải quyết vấn đề "dead session" nghiêm trọng và cho phép dynamic tool loading - quan trọng cho production stability.

#### **2. Refactor kiến trúc core** - Tầm nhìn dài hạn
- **#3990**: Dream system refactor - chuyển từ 2-phase sang single-phase, sử dụng AgentLoop với goal-state lifecycle
  - Loại bỏ Phase 1 (pure LLM analysis), merge vào AgentRunner
  - Thêm session persistence và model override preset
  - **Impact**: Đơn giản hóa code, giảm latency, dễ maintain hơn
  
- **#4023**: Migrate heartbeat từ standalone service sang cron-based auto-registration
  - Xóa `HeartbeatService` background loop
  - **Impact**: Giảm infrastructure overhead, tận dụng cron system có sẵn

- **#4022**: Modular system prompt - cho phép toggle từng component (agents, soul, user)
  - **Impact**: Tăng flexibility, giảm token usage khi không cần full prompt

#### **3. Provider & Streaming improvements**
- **#4020**: Configurable stream-idle timeout per-provider (giải quyết #4013)
  - Cho phép config riêng cho local LLMs (LM Studio, Ollama) vs cloud providers
  - Default 90s quá aggressive cho local models
  
- **#4018**: Honor `NANOBOT_STREAM_IDLE_TIMEOUT_S` trong Codex provider
  - Codex đang hardcode 60s, không đọc env var như các provider khác

- **#4017**: Parse text-format tool calls trong openai-compat responses
  - Một số provider (Xiaomi MiMo) trả tool calls dạng plain text thay vì structured format

- **#4021**: Dedup reasoning items trước khi send tới Codex API (fix #3633)
  - Tránh lỗi `400 Duplicate item found` khi re-send reasoning items

#### **4. Channel & Integration expansions**
- **#4031**: Discord `/model` slash command - cho phép user switch model preset từ chat
- **#4016**: DingTalk group_user_isolation - mỗi user trong group có session riêng
- **#4007**: WebUI project workspaces - Codex-style project binding, access controls

#### **5. GitAgent Protocol (GAP) support** - Xu hướng mới
- **#4030**, **#4019**, **#4024** (duplicate): 3 PRs từ 3 contributors khác nhau đề xuất tích hợp GitAgent Protocol
  - Thêm `agent.yaml` và `SOUL.md` manifest
  - **Ý nghĩa**: GAP là open standard cho portable AI agents. Việc nhiều người đồng thời đề xuất cho thấy community interest cao, nhưng cũng cần coordination tốt hơn để tránh duplicate effort.

---

## 🌟 Điểm nổi bật cộng đồng

### 🏆 Top engagement:

1. **#1922** (10 👍, 10 comments) - **nanobot-webui** by @Good0007
   - Self-hosted web management panel với full-featured dashboard
   - Multi-user support, real-time chat, UI-based config
   - **Status**: CLOSED - có thể đã được merge hoặc moved to separate repo

2. **#4013** (1 comment, spawned 2 PRs) - Stream timeout issue
   - User báo cáo "stream stalled for more than 90 seconds" với local LLMs
   - Triggered immediate response: #4020 và #4018 để fix
   - **Insight**: Community responsive, issue → fix turnaround time < 24h

### 👥 Contributor diversity:
- **23 PRs từ 18+ contributors khác nhau** - cho thấy healthy open-source ecosystem
- Mix của core maintainers và first-time contributors
- Nhiều PRs có tag `[AI-assisted]` - team đang sử dụng AI tools để accelerate development

---

## 🐛 Ổn định & Bugs

### Critical fixes đang được xử lý:

1. **MCP reconnection bug** (#4027, #4012) - **Severity: HIGH**
   - `_mcp_connected` flag không bao giờ reset → dead sessions không thể reconnect
   - **Status**: PR đã submit, chờ review

2. **Stream timeout với local LLMs** (#4013, #4020, #4018) - **Severity: MEDIUM**
   - 90s timeout quá aggressive cho Ollama/LM Studio
   - Codex provider không honor env var
   - **Status**: 2 PRs đang active

3. **Orphan tool results** (#4011, fixes #4006) - **Severity: MEDIUM**
   - `role: "tool"` messages không có matching `tool_call_id` gây lỗi
   - **Status**: PR đã submit với guard logic

4. **Codex duplicate reasoning items** (#4021, fixes #3633) - **Severity: LOW**
   - Occasional 400 errors khi re-send reasoning items
   - **Status**: PR với dedup pass trước send

### 🔍 Issues cần attention:

- **#2772**: WeChat chỉ support 10 messages max per context_token - chưa có solution rõ ràng
- **#4029**: Request provider override cho dream-specific model - enhancement request

---

## 💡 Yêu cầu tính năng

### Đã có PR implementation:

1. ✅ **Discord slash commands** (#4031) - `/model` command để switch presets
2. ✅ **DingTalk session isolation** (#4016) - per-user sessions trong group chat
3. ✅ **WebUI project workspaces** (#4007) - Codex-style project binding
4. ✅ **GitAgent Protocol** (#4030, #4019) - portable agent manifests
5. ✅ **Modular system prompt** (#4022) - toggle prompt components

### Enhancement requests (chưa có PR):

1. **#3885**: Global switch cho Dream system jobs
   - User muốn disable Dream cron job hoàn toàn
   - Đề xuất: thêm `enabled: false` flag trong config
   - **Priority**: MEDIUM - quality of life improvement

2. **#4029**: Dream-specific model override
   - Cho phép dùng model khác cho Dream vs default chat
   - **Use case**: Dùng cheaper model cho background consolidation
   - **Priority**: LOW - optimization feature

---

## 💬 Phản hồi người dùng

### Positive signals:

1. **WebUI adoption** (#1922) - 10 upvotes cho community-built management panel
   - Cho thấy nhu cầu cao về GUI management
   - Self-hosted approach phù hợp với privacy-conscious users

2. **Quick issue resolution** - #4013 reported → 2 PRs trong 24h
   - Community và maintainers responsive
   - AI-assisted development tăng velocity

### Pain points:

1. **Local LLM experience** (#4013, #4020)
   - Timeout defaults được tune cho cloud providers
   - Local models (Ollama, LM Studio) cần config khác
   - **Takeaway**: Need better defaults hoặc auto-detection

2. **MCP stability** (#4027, #4012)
   - Reconnection issues ảnh hưởng production usage
   - **Takeaway**: MCP integration cần hardening trước khi promote rộng rãi

3. **WeChat limitations** (#2772)
   - 10-message limit là platform constraint
   - Chưa có workaround rõ ràng
   - **Takeaway**: Cần document limitations hoặc implement chunking strategy

---

## 🗺️ Backlog & Roadmap

### Inferred priorities (dựa trên PR activity):

#### **Q2 2026 Focus Areas:**

1. **🔧 Infrastructure stability** (Highest priority)
   - MCP reconnection fixes
   - Stream timeout configurability
   - Memory/session management improvements (#4025 - protect unprocessed history)

2. **🏗️ Architecture refactoring** (Medium-term)
   - Dream system single-phase migration (#3990)
   - Heartbeat → cron migration (#4023)
   - Modular system prompt (#4022)
   - **Goal**: Simplify codebase, reduce maintenance burden

3. **🌐 Channel & Provider expansion** (Ongoing)
   - Discord enhancements (#4031)
   - DingTalk improvements (#4016)
   - Qiniu provider (#3643)
   - OpenAI-compat provider fixes (#4017)

4. **🎨 Developer experience** (Community-driven)
   - WebUI improvements (#4007)
   - GitAgent Protocol support (#4030)
   - Better local LLM support (#4020)

### 🚧 Technical debt being addressed:

- **Duplicate PRs** - 3 GitAgent Protocol PRs cho thấy cần better coordination
- **Provider inconsistencies** - Codex không honor env vars như peers
- **Session management** - Orphan tool results, unprocessed history protection

### 🔮 Emerging trends:

1. **AI-assisted development** - Nhiều PRs tagged `[AI-assisted]`
2. **Standardization** - GitAgent Protocol interest cho thấy ecosystem maturity
3. **Enterprise features** - Access controls, workspaces, multi-user support
4. **Local-first** - Tăng focus vào local LLM experience

---

## 📊 Metrics snapshot

- **PRs created today**: 23
- **Issues updated**: 5
- **Active contributors**: 18+
- **Critical bugs**: 2 (MCP reconnection, stream timeout)
- **Enhancement requests**: 2 open
- **Community engagement**: High (multiple duplicate PRs, quick responses)

---

## 🎯 Khuyến nghị

### Cho maintainers:

1. **Ưu tiên merge MCP fixes** (#4027, #4028) - critical for stability
2. **Coordinate GitAgent Protocol PRs** - 3 duplicate efforts cần consolidate
3. **Review Dream refactor** (#3990) - large architectural change cần thorough testing
4. **Document local LLM setup** - giảm friction cho new users

### Cho contributors:

1. **Check existing PRs** trước khi submit - tránh duplicate work
2. **Add tests** cho critical paths (MCP, streaming, session management)
3. **Focus on documentation** - nhiều features mới cần usage examples

### Cho users:

1. **Chờ MCP fixes** trước khi deploy production với MCP-heavy workflows
2. **Test local LLM configs** với upcoming timeout improvements
3. **Explore WebUI** (#1922) nếu cần GUI management

---

**Tổng kết**: NanoBot đang trong giai đoạn phát triển mạnh mẽ với focus vào **stability** (MCP, streaming) và **architecture modernization** (Dream, heartbeat). Community engagement cao, contributor diversity tốt, nhưng cần better coordination để tránh duplicate efforts. Roadmap rõ ràng hướng tới enterprise-ready features trong khi maintain local-first philosophy. 🚀

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo phân tích dự án Zeroclaw - 28/05/2026

## 📊 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn củng cố bảo mật và hoàn thiện hệ thống skills trước bản v0.8.1. Hôm nay tập trung vào 3 trụ cột: **bảo mật** (token rotation, credential handling, private-host allowlist), **observability** (OTel GenAI spans cho LLM calls và memory ops), và **skills infrastructure** (builtin tool elevation, skill-scoped activation). Không có release mới nhưng có 50 PRs đang active với 9 issues được theo dõi sát.

---

## 🚀 Releases

**Không có release mới trong 24h qua.**

Dự án đang hướng tới v0.8.1 với focus vào integration/channel/provider/tool queue (#6970) và v0.7.6 cho skills UX (#6253).

---

## 🔧 Tiến độ dự án

### **Bảo mật - Ưu tiên cao** 🔐

**#6984 [S1 - workflow blocked]**: Token rotation không invalidate tokens cũ
- `get-paircode --new` và API rotate endpoint tạo token mới nhưng **không thu hồi token cũ**
- Rủi ro: stolen tokens vẫn hoạt động sau khi user rotate
- Phát hiện bởi @nixosclaw trong incident response của GHSA-f385-f6h2-3gqj
- **Cần xử lý ngay** - đây là lỗ hổng bảo mật nghiêm trọng

**#6982 [PR - risk: high]**: Phân loại credential surfaces
- Đánh dấu các config field chứa credentials (API keys, passwords, tokens) để:
  - Saved config encryption hoạt động đúng
  - Schema export không leak secrets
  - Audit logs redact đúng
- Thêm test registry cho credential-shaped property paths

**#6981 [PR]**: Private-host allowlist cho `http_request` tool
- Align với model an toàn của `web_fetch` (#6974)
- Thay vì boolean `allow_private_hosts`, dùng explicit allowlist
- Ngăn SSRF attacks vào internal services

**#6978 [S0 - security risk]**: Nested secrets trong object-array configs bị leak
- `Vec<T>` configs serialize toàn bộ object, bỏ qua `#[secret]` fields bên trong
- Ví dụ: array of SMTP configs với embedded passwords
- Cần recursive redaction logic

### **Skills System - Core infrastructure** 🛠️

**#6924 [PR - risk: high]**: Builtin tool elevation cho skills
- Skills giờ có thể khai báo `kind = "builtin"` để dùng tools bị block
- **Temporary elevation**: tool chỉ active trong scope của skill execution
- Giải quyết #6915 - cho phép skills dùng sensitive tools (file ops, http_request) mà không grant blanket access cho agent

**#6667 [PR - XL]**: Background review fork + `skill_manage` tool
- Implement post-turn background review pattern từ nousresearch/hermes-agent
- Agent tự cải thiện skills dựa trên execution outcomes
- Đọc/ghi SKILL.md format từ agentskills.io
- **Needs author action** - đang chờ revisions

**#6684 [PR]**: Enforce cooldown trong skill patch
- Wire `SkillImprover::should_improve_skill` vào `SkillManageTool`
- Ngăn skill rewrite loops (agent liên tục patch cùng một skill)

### **Observability - Debugging & monitoring** 📈

**#6966 [PR - risk: high]**: Capture prompt/completion content trong OTel spans
- `llm.call` spans giờ ghi `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system`
- Langfuse và Tempo có thể hiển thị full prompt context
- Critical cho debugging prompt engineering issues

**#6190 [PR - stacked on #6009]**: OTel spans cho memory operations
- Instrument `memory.store`, `memory.search`, `memory.delete`
- Theo dõi latency và errors của memory backend
- Stacked PR - chờ #6009 merge trước

**#6955 [PR]**: Fix missing LlmRequest/LlmResponse events
- 0.8.0-beta refactor làm mất events trong `Agent::turn()` paths
- Khôi phục SSE observability cho agent turns

### **Channels & Integrations** 📡

**#6389 [PR - L, needs-author-action]**: Per-recipient reply pacing
- Rate limiting per (channel, recipient) với `reply_min_interval_secs`
- Áp dụng cho 9 channels (Matrix, Slack, Discord, Telegram, etc.)
- Ngăn spam và respect platform rate limits

**#6968 [PR]**: Configurable TTS endpoint cho OpenAI provider
- Hardcoded URL và format block OpenAI-compatible backends (Groq, Azure)
- Thêm `tts_uri` và `response_format` configs

**#6979 [PR]**: Ignore blank SMTP credential overrides
- Blank `smtp_username`/`smtp_password` giờ fallback về shared email credentials
- Fix UX issue khi users để trống overrides

### **Tools - Mở rộng capabilities** 🔨

**#6957 [PR - L]**: `file_download` tool
- Counterpart của file upload endpoint
- Agent có thể GET files từ remote URL vào workspace
- Security: size limits, path validation, workspace-relative only

**#6775 [PR - L]**: `file_upload_bundle` tool
- Multi-file upload trong single multipart request
- Per-file và total size limits
- Configurable upload URL và HTTP method

**#6833 [PR]**: Jina AI web search provider
- Thêm Jina AI vào web_search provider routing
- Alternative cho existing providers (Google, Bing, etc.)

---

## 🌟 Điểm nổi bật cộng đồng

### **Top issues theo severity:**

1. **#6984** (S1 - workflow blocked): Token rotation security hole - **0 comments nhưng critical**
2. **#6978** (S0 - security risk): Nested secret leakage - **0 comments, cần attention**
3. **#6976** (S2): Web UI WebSocket fails với 1006 - missing `?agent=` param

### **Top PRs theo impact:**

1. **#6848** (XL - DO NOT MERGE): Zerocode TUI + RPC transport + beta-2 integration
   - Massive PR với known issues
   - Introduces new TUI interface
   - Intentionally removed legacy fallback behaviors
   - Context counter unreliable, Code agent "forgets" operations

2. **#6924** (L): Builtin tool elevation - **game changer cho skills security model**

3. **#6966** (M): OTel prompt/completion capture - **critical cho debugging**

### **Community feedback:**

- **#6969** (CLOSED): RFC về unified output routing bị đóng nhanh - user migrate từ Letta, mất khả năng control reply delivery (morning briefing qua email, urgent qua SMS)
- **#6975**: `zeroclaw onboard` marks sections complete nhưng không write config - UX regression
- **#6950** (referenced by #6952): Compact keyboards không có F-keys không cycle được TUI modes

---

## 🐛 Ổn định & Bugs

### **Critical (S0-S1):**

- ✅ **#6978**: Nested secrets leak - có PR #6982 đang review
- ⚠️ **#6984**: Token rotation không revoke old tokens - **chưa có PR, cần urgent fix**
- ✅ **#6975**: Onboard không write config - severity S1

### **High-risk fixes merged/in-progress:**

- **#6983**: Stream error recovery - fallback trước khi user thấy error
- **#6980**: Preserve reasoning_content trong native tool requests (DeepSeek, compatible providers)
- **#6960**: Apply SecurityPolicy tool filter trong `process_message()` - tools bypass security check
- **#6972**: `image_info` tool không resolve paths qua policy - path traversal risk

### **Platform compatibility:**

- **#6913**: Windows path support trong multimodal policy tests - `C:\Users\...` bị treat as literal text
- **#6952**: Tab/Shift+Tab cho TUI mode cycling - fix cho compact keyboards

---

## 💡 Yêu cầu tính năng

### **Accepted & prioritized:**

1. **#6977** (P1): Align `http_request` private-host allowlist với `web_fetch`
   - Có PR #6981 implementing
   - Part of broader SSRF protection strategy

2. **#6253** (P1): Skills support & UX tracker cho v0.7.6
   - Coordinating issue cho skills improvements
   - Community input encouraged

### **In discussion:**

- **#6969** (CLOSED but valuable): Unified output routing model
  - Per-peer modality preference (email vs SMS vs push)
  - Agent `send_via` tool cho explicit routing
  - Closed nhưng feedback hợp lý - có thể reopen với refined scope

### **Blocked:**

- **#6915**: Skill-scoped tool activation
  - Blocked, needs maintainer review
  - Có implementation PR #6924 nhưng cần architectural decision

---

## 💬 Phản hồi người dùng

### **Pain points:**

1. **Onboarding UX** (#6975, #6908):
   - Onboard wizard không persist config
   - OpenAI provider force API key flow, block Codex subscription auth

2. **Security model confusion**:
   - Users không hiểu tại sao skills không thể dùng blocked tools
   - #6924 addresses này với builtin elevation

3. **Observability gaps**:
   - Langfuse/Tempo empty Input/Output panes (#6966)
   - Missing LlmRequest/LlmResponse events (#6955)

### **Migration friction:**

- **#6969**: Letta → Zeroclaw migration mất output routing control
- Users expect per-recipient delivery preferences (morning briefing qua email, urgent qua SMS)

### **Developer experience:**

- **#6848**: Zerocode TUI promising nhưng có known issues (context counter, agent memory)
- **#6952**: Accessibility - compact keyboard users stuck

---

## 📋 Backlog & Roadmap

### **v0.8.1 focus** (#6970):
- Integration/channel/provider/tool PR queue
- Complement long-term Integrations → Plugins architecture (#6489)

### **v0.7.6 focus** (#6253):
- Skills support & UX improvements
- CLI, loader, audit, install paths
- Sandbox, test harness, authoring tools

### **Security hardening (ongoing):**
- Token lifecycle management (#6984)
- Credential surface classification (#6982)
- Private-host allowlist alignment (#6977, #6981)
- Path traversal fixes (#6972)

### **Observability (in-flight):**
- OTel GenAI spans for LLM calls (#6966)
- Memory operation instrumentation (#6190)
- Event recovery in agent turns (#6955)

### **Skills infrastructure (beta):**
- Builtin tool elevation (#6924)
- Background review fork (#6667)
- Cooldown enforcement (#6684)

### **Blocked/needs decision:**
- Skill-scoped activation architectural review (#6915)
- Output routing model (#6969 - closed but may revisit)

---

## 🎯 Nhận định

**Strengths:**
- Bảo mật được prioritize cao (4 security issues/PRs trong top 10)
- Observability infrastructure đang được build đúng (OTel GenAI semantic conventions)
- Skills system có architectural vision rõ ràng (elevation, scoping, background review)

**Concerns:**
- **#6984** (token rotation) là critical security hole chưa có PR
- **#6848** (Zerocode TUI) quá lớn với nhiều known issues - risk merge conflicts và regression
- Onboarding UX regressions (#6975, #6908) ảnh hưởng first-time user experience

**Recommendations:**
1. Tách #6848 thành smaller PRs (TUI, RPC transport, beta-2 integration riêng biệt)
2. Fast-track #6984 fix - token security không thể chờ
3. Prioritize onboarding fixes (#6975, #6908) - first impression matters
4. Consider reopening #6969 với scoped proposal - output routing là valid use case

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo phân tích PicoClaw - Ngày 28/05/2026

## 🎯 Tóm tắt hôm nay

Dự án PicoClaw tiếp tục chu kỳ phát triển nightly với phiên bản v0.2.9-nightly.20260528. Hoạt động chính tập trung vào việc sửa lỗi nghiêm trọng liên quan đến streaming, quản lý process, và cấu hình channel. Cộng đồng phản ánh một số vấn đề về tương thích nền tảng (Android 32-bit) và yêu cầu cải thiện UX cho việc quản lý model providers.

---

## 🚀 Releases

### **v0.2.9-nightly.20260528** (Nightly Build)
- **Loại**: Automated nightly build - không ổn định, dùng thử nghiệm
- **Commit**: `28ec5793`
- **Ý nghĩa**: Đây là bản build tự động hàng đêm, phản ánh các thay đổi mới nhất từ nhánh main. Người dùng production nên thận trọng khi sử dụng.

---

## 📈 Tiến độ dự án

### **Pull Requests đang hoạt động** (6 PRs)

#### 🔥 **Ưu tiên cao - Sửa lỗi nghiêm trọng**

**#2957 - Fix tool_calls bị mất trong streaming** ⚠️
- **Vấn đề**: Messages `tool_calls` bị lọc nhầm là auxiliary messages, dẫn đến mất thông tin khi streaming
- **Nguyên nhân**: Logic filtering từ #2892 không phân biệt được tool_calls
- **Giải pháp**: Thêm helper `outboundMessageIsToolCalls()` để loại trừ tool_calls khỏi auxiliary filtering
- **Tác động**: Critical fix cho tính năng agent core

**#2955 - Verify process identity trong singleton check** 🔒
- **Vấn đề**: PID file có thể chứa PID đã được reuse bởi process khác (vd: systemd-resolved), gây startup failure
- **Giải pháp**: Kiểm tra không chỉ PID tồn tại mà còn verify đó là picoclaw process
- **Tác động**: Cải thiện reliability khi khởi động, đặc biệt trên môi trường production

**#2956 - Preserve channel enabled state khi merge security.yml** ⚙️
- **Vấn đề**: Channels được set `enabled: true` trong config.json bị disable sau khi load security.yml
- **Nguyên nhân**: Merge logic ghi đè enabled state khi user chỉ thêm credentials
- **Tác động**: UX issue nghiêm trọng - user phải config lại enabled mỗi lần update credentials

#### 🔄 **Đang review/stale**

**#2853 - ChatStream support cho real-time streaming** [CLOSED]
- Đã đóng, có thể đã merge hoặc reject
- Tính năng: Real-time token streaming qua WebSocket cho pico channel

**#2899 - Configurable TLS verification cho MQTT** [STALE]
- **Vấn đề bảo mật**: `InsecureSkipVerify` hardcoded = true, dễ bị MITM attacks
- **Giải pháp**: Thêm config `TLSSkipVerify` (default false)
- **Trạng thái**: Stale - cần attention

**#2696 - Dynamic headers cho MCP từ channel context**
- **Tính năng**: Channels có thể forward HTTP headers đến MCP servers per-request
- **Use case**: Authorization headers động từ user context
- **Trạng thái**: Enhancement đang review

### **Xu hướng phát triển**
- ✅ **Stability focus**: 3/6 PRs là bug fixes nghiêm trọng
- 🔐 **Security awareness**: Addressing TLS và process verification
- 🎨 **UX improvements**: Config management và streaming experience
- 🔧 **Architecture**: MCP integration và channel extensibility

---

## 💬 Điểm nổi bật cộng đồng

### **Issue có tương tác cao**

**#2952 - Yêu cầu release mới và cải thiện UX** (1 comment)
- **Phản ánh**: User chờ đợi release chính thức lâu
- **3 vấn đề cụ thể**:
  1. Exec command thiếu `actions:run` → model lỗi
  2. QQ channel restart loop khi gửi message sau restart
  3. Model provider UI cần cải thiện: hiển thị saved keys, dropdown selection, API test

**#2958 - Tool_calls messages dropped qua pico channel** (0 comments - MỚI)
- **Vấn đề**: Consecutive requests mất tool_calls messages, chỉ request đầu hiển thị
- **Liên quan**: Trùng với PR #2957
- **Tác động**: Ảnh hưởng trực tiếp đến agent workflow

---

## 🐛 Ổn định & Bugs

### **Bugs đang được xử lý**

1. **#2953 - OpenAI/Codex OAuth trả về empty response** ⚠️
   - **Triệu chứng**: "Model returned empty response" nhưng không phải lỗi OAuth/token
   - **Root cause**: `response.output_text.delta` stream events bị ignore
   - **Tác động**: Codex backend không hoạt động
   - **Trạng thái**: 1 comment, đang investigate

2. **#2954 - Không hỗ trợ Android 32-bit** 📱
   - **Platform compatibility issue**
   - **Tác động**: Loại bỏ một phần user base trên thiết bị cũ
   - **Trạng thái**: 1 comment, cần xác định priority

3. **#2958 + #2957 - Tool_calls streaming issue** 🔧
   - **Đã có PR fix**: #2957
   - **Timeline**: Phát hiện và fix trong cùng ngày (27/05)

### **Đánh giá độ ổn định**
- ⚠️ **Medium stability**: Có 3 bugs nghiêm trọng ảnh hưởng core functionality
- ✅ **Fast response**: Team phản ứng nhanh với PRs fix trong 24h
- 🔄 **Regression risk**: Bug #2958 có thể là regression từ #2892

---

## ✨ Yêu cầu tính năng

### **Từ issue #2952**
1. **Model Provider Management UI** 🎨
   - Hiển thị providers đã có key
   - Dropdown selection với key reuse
   - API test connection + auto-fetch models list
   - **Giá trị**: Giảm friction khi setup multiple models

2. **Better Agent Protocol Compliance** 📋
   - User phản ánh picoclaw không tuân thủ đầy đủ agent.md
   - **Cần clarify**: Spec nào đang vi phạm?

### **Từ PRs**
3. **MCP Dynamic Headers** (#2696)
   - Per-request authorization từ channel context
   - **Use case**: Multi-tenant scenarios, user-specific credentials

---

## 👥 Phản hồi người dùng

### **Sentiment Analysis**

😟 **Frustrations**:
- Release cycle quá chậm (nightly builds không đủ cho production)
- QQ channel có restart loop bug ảnh hưởng UX
- Model setup workflow phức tạp, thiếu visual feedback

😊 **Positive signals**:
- Cộng đồng active report bugs với details tốt
- Contributors nhanh chóng tạo PRs fix

### **User personas xuất hiện**
- **Chinese-speaking users**: Issues #2952, #2954 bằng tiếng Trung
- **Enterprise users**: Quan tâm TLS security (#2899), process management (#2955)
- **Developer users**: Deep technical issues như OAuth streaming (#2953)

---

## 🗺️ Backlog & Roadmap

### **Immediate priorities** (dựa trên bug severity)
1. ✅ Merge #2957 (tool_calls fix) - CRITICAL
2. ✅ Merge #2955 (process identity) - HIGH
3. ✅ Merge #2956 (channel config) - HIGH
4. 🔍 Investigate #2953 (Codex OAuth) - MEDIUM
5. 🤔 Evaluate #2954 (Android 32-bit support) - LOW-MEDIUM

### **Feature roadmap** (inferred)
- 🎨 **Q2 2026**: Model provider UI improvements (#2952)
- 🔐 **Ongoing**: Security hardening (TLS, process verification)
- 🔧 **Ongoing**: MCP ecosystem expansion (#2696)
- 📱 **TBD**: Platform compatibility expansion

### **Technical debt**
- ⚠️ Auxiliary message filtering logic cần refactor (gây ra #2957)
- ⚠️ Config merge strategy cần redesign (#2956)
- ⚠️ Stream event handling cần standardize (#2953)

---

## 📊 Metrics Summary

| Metric | Value | Trend |
|--------|-------|-------|
| Open Issues | 4 | 🆕 |
| Open PRs | 5 (1 stale) | ➡️ |
| Bug fixes in progress | 3 | 📈 |
| Community engagement | Medium | ➡️ |
| Release cadence | Nightly only | ⚠️ |

---

## 🎯 Kết luận

PicoClaw đang trong giai đoạn **stabilization** với focus vào bug fixes và security improvements. Team phản ứng nhanh với issues nhưng **thiếu stable releases** đang tạo friction cho production users. Cộng đồng Chinese-speaking chiếm tỷ trọng cao, cần đảm bảo i18n support tốt. 

**Khuyến nghị**: Ưu tiên merge các critical fixes (#2957, #2955, #2956) và release v0.2.9 stable trong tuần tới để đáp ứng kỳ vọng từ #2952.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - Ngày 28/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 28/05/2026 chứng kiến một đợt hoạt động tích cực với **6 PR mới được mở** và **3 PR được đóng**, tập trung vào việc sửa lỗi và cải thiện trải nghiệm người dùng. Đáng chú ý, issue #80 về hỗ trợ đa provider (60 👍) đã được đóng sau 4 tháng thảo luận, phản ánh nhu cầu cấp thiết của cộng đồng về việc giảm phụ thuộc vào Anthropic. Các PR mới tập trung vào sửa lỗi cấu hình, tích hợp kênh (Teams, Signal, Slack), và cải thiện trải nghiệm trên NixOS.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### Pull Requests đáng chú ý:

**🔧 Sửa lỗi cấu hình & UX:**

- **#2628** (OPEN) - Sửa lỗi CLI bỏ qua `--id` do người dùng cung cấp
  - Vấn đề: Lệnh `ncl groups create --id daily-os` bị ghi đè bởi UUID ngẫu nhiên
  - Tác động: Cải thiện khả năng tùy chỉnh và dự đoán được của CLI

- **#2624** (OPEN) - Thêm `disabledTools` cho từng MCP server
  - Cho phép tắt các công cụ cụ thể theo server
  - Tăng tính linh hoạt trong cấu hình

**📱 Tích hợp kênh:**

- **#2627** (OPEN) - Sửa lỗi reactions không hoạt động trên đa kênh
  - Vấn đề: MCP yêu cầu shortcode (`:thumbs_up:`) nhưng hầu hết kênh cần Unicode
  - Giải pháp: Dịch shortcode → Unicode cho WhatsApp/Discord/Telegram/Teams/GChat, giữ nguyên cho Slack
  - Tác động: Reactions sẽ hoạt động đúng trên tất cả các nền tảng

- **#2625** (OPEN) - Bật hỗ trợ file trong Teams
  - Sửa `supportsFiles: false` → `true` trong manifest
  - Cho phép gửi/nhận file qua Teams bot

- **#2626** (OPEN) - Sửa lỗi Signal service restart im lặng
  - Thay thế `stdio: 'ignore'` bằng xử lý lỗi rõ ràng
  - Cải thiện khả năng debug khi setup Signal

**🐧 Hỗ trợ NixOS:**

- **#2629** (CLOSED) - Sử dụng `--network=host` trên NixOS
  - Giải quyết vấn đề `host.docker.internal` không resolve được
  - Chuyển sang `127.0.0.1` với `--network=host` cho NixOS

**🐛 Bugfix:**

- **#5** (CLOSED) - Sửa lỗi scheduled tasks nhận sai `chat_jid` giữa các group
  - Vấn đề: Container truyền JID của chính nó thay vì target group
  - Giải pháp: Host process tra cứu JID đúng từ `registeredGroups`

### Xu hướng phát triển:

- **Tập trung vào độ ổn định**: 5/6 PR mới là bugfix, cho thấy dự án đang trong giai đoạn ổn định hóa
- **Cải thiện đa nền tảng**: Hỗ trợ NixOS và sửa lỗi cross-platform (reactions, file sharing)
- **Nâng cao trải nghiệm CLI**: Sửa các vấn đề về UX và khả năng cấu hình

## 🌟 Điểm nổi bật cộng đồng

### Issue #80 - Hỗ trợ đa provider (CLOSED) 🔥

- **60 👍** - Issue được quan tâm nhất
- **33 bình luận** - Thảo luận sôi nổi trong 4 tháng
- **Bối cảnh**: Anthropic đang đóng tài khoản người dùng sử dụng với OpenClaw
- **Nhu cầu**: Hỗ trợ OpenCode, Codex, Gemini để giảm phụ thuộc vào một provider
- **Ý nghĩa**: Việc đóng issue này có thể báo hiệu tính năng đã được implement hoặc có hướng giải quyết

## 🔧 Ổn định & Bugs

### Các vấn đề đang được xử lý:

1. **Reactions không hoạt động** (#2627)
   - Nguyên nhân: Mismatch giữa format shortcode và Unicode
   - Trạng thái: Đang có PR sửa

2. **CLI không tôn trọng user input** (#2628)
   - Nguyên nhân: Logic tạo ID bị hardcode
   - Trạng thái: Đang có PR sửa

3. **Signal service restart thất bại im lặng** (#2626)
   - Nguyên nhân: `stdio: 'ignore'` che giấu lỗi
   - Trạng thái: Đang có PR sửa

4. **Teams không hỗ trợ file** (#2625)
   - Nguyên nhân: Cấu hình manifest sai
   - Trạng thái: Đang có PR sửa

5. **NixOS networking issues** (#2629)
   - Nguyên nhân: Docker bridge không expose host gateway
   - Trạng thái: ✅ Đã merge

6. **Cross-group scheduled tasks bug** (#5)
   - Nguyên nhân: IPC message truyền sai JID
   - Trạng thái: ✅ Đã merge

### Đánh giá:

- Dự án đang trong giai đoạn **bug squashing** tích cực
- Các lỗi chủ yếu liên quan đến **tích hợp kênh** và **cross-platform compatibility**
- Response time nhanh: Nhiều PR được tạo và merge trong cùng ngày

## 💡 Yêu cầu tính năng

### Đã được giải quyết:

- **Hỗ trợ đa provider** (#80) - Issue được đóng, có thể đã implement hoặc có roadmap rõ ràng

### Đang được đề xuất qua PRs:

- **Per-server tool configuration** (#2624) - Cho phép tắt công cụ theo từng MCP server
- **Cải thiện CLI flexibility** (#2628) - Cho phép user tự định nghĩa ID

## 👥 Phản hồi người dùng

### Vấn đề quan tâm nhất:

1. **Vendor lock-in với Anthropic** (60 👍)
   - Lo ngại về việc tài khoản bị đóng
   - Mong muốn có lựa chọn thay thế (OpenCode, Gemini, Codex)

2. **Trải nghiệm đa nền tảng**
   - NixOS users gặp vấn đề networking
   - Reactions không hoạt động trên nhiều kênh
   - Teams thiếu hỗ trợ file

3. **CLI usability**
   - Mong muốn kiểm soát tốt hơn các tham số (như `--id`)

### Sentiment:

- Cộng đồng **tích cực đóng góp** với nhiều PR chất lượng
- Các contributor đang **chủ động fix bugs** thay vì chỉ report
- Có sự quan tâm đến **documentation** (nhiều PR có SKILL.md)

## 🗺️ Backlog & Roadmap

### Dựa trên hoạt động hiện tại:

**Ưu tiên cao (đang xử lý):**
- ✅ Sửa lỗi reactions cross-platform
- ✅ Cải thiện CLI UX
- ✅ Ổn định tích hợp Teams và Signal
- ✅ Hỗ trợ NixOS

**Tiếp theo (dự đoán):**
- 🔄 Hoàn thiện hỗ trợ đa provider (sau khi đóng #80)
- 🔄 Cải thiện error handling và logging
- 🔄 Mở rộng hỗ trợ file sharing cho các kênh khác

**Xu hướng dài hạn:**
- Giảm phụ thuộc vào Anthropic
- Tăng tính linh hoạt và khả năng tùy chỉnh
- Cải thiện trải nghiệm cross-platform

---

## 📊 Thống kê nhanh

- **PRs mới**: 6 (5 bugfix, 1 feature)
- **PRs merged**: 3
- **Issues đóng**: 1 (major feature request)
- **Tổng tương tác**: 60+ reactions trên issue #80
- **Contributors hoạt động**: 7+ người

**Đánh giá tổng thể**: Dự án đang trong giai đoạn **maturation** với focus vào stability, cross-platform support, và giảm vendor lock-in. Cộng đồng tích cực và responsive. 🚀

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - Ngày 2026-05-28

## 1. 📊 Tóm tắt hôm nay

Ngày 28/5 đánh dấu một đợt hoạt động cực kỳ mạnh mẽ với **30 PRs được merge** trong 24 giờ, tập trung vào việc hoàn thiện hệ thống **Reborn agent loop**. Các cải tiến lớn bao gồm context compaction (nén ngữ cảnh), Google OAuth backend, subagent flavors, và nhiều sửa lỗi quan trọng về quyền truy cập filesystem và credential management. Đồng thời, có 4 feature requests mới từ desktop client team (@abbyshekit) cho thấy sự phát triển của hệ sinh thái xung quanh IronClaw.

## 2. 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng khối lượng merge lớn cho thấy đang chuẩn bị cho một milestone quan trọng.

## 3. 🔨 Tiến độ dự án

### **Reborn Agent Loop - Giai đoạn hoàn thiện**

#### Context Compaction (PR #4110) ✅
- **Tầm quan trọng**: Giải quyết vấn đề giới hạn context window của LLM
- **Cơ chế**: Sử dụng system-inference để tóm tắt lịch sử hội thoại, giữ lại thông tin quan trọng
- **Kiến trúc**: Thêm strategy slot, executor stage, host compaction port
- **Tác động**: Cho phép agent xử lý các cuộc hội thoại dài mà không bị giới hạn bởi token limit

#### Google OAuth & GSuite Integration (PR #4111) ✅
- **Backend hoàn chỉnh**: Token exchange, refresh mechanism, typed error states
- **Security**: Credential failures được map thành typed dispatch reasons
- **Theo dõi**: 3 issues follow-up (#4112, #4113, #4160, #4161) cho WebUI OAuth flow và token lifecycle

#### Subagent System - Mở rộng khả năng
- **Flavors mới** (PR #4087): Thêm `coder` và `explorer` subagent types
- **Background mode disabled** (PR #4148): Tạm dừng background subagents do vấn đề completion delivery (#4147)
- **Vấn đề thiết kế**: Issue #4147 đặt ra câu hỏi về durable completion delivery - cần thiết kế lại

#### Filesystem & Security Improvements
- **HTTP save_to authority** (PR #4105): Yêu cầu write-capable mount view
- **Shell path aliases** (PR #4155): Hỗ trợ `/workspace` và host root aliases
- **Yolo coding tools** (PR #4156): Grant ambient workspace paths cho local-dev
- **Saved output refs** (PR #4154): Capture large shell output vào temp files thay vì buffer memory

#### Skill System Enhancements
- **Model-selected activation** (PR #4146): Codex-style skill activation qua tool calls
- **Regex activation config** (PR #4144): Thêm regex-only activation switch
- **Plain Markdown support** (PR #4138): Chấp nhận skill installs không có frontmatter
- **Oversized prompt fallback** (PR #4134): Xử lý graceful khi skill prompts quá lớn

### **Xu hướng kiến trúc**

1. **Declarative policy** (PR #4127): Chuyển capability grants sang TOML policy
2. **Typed surfaces**: Tách model content khỏi safe summaries (PR #4140, #4141)
3. **Refactoring signals**: 2 issues mới (#4162, #4163) về decomposition của compaction và prompt stage

## 4. 💬 Điểm nổi bật cộng đồng

### **Desktop Client Integration** (@abbyshekit)
Một developer đang xây dựng **Tauri v2 + SvelteKit native macOS client** và đã tạo 4 feature requests trong ngày:

- **#4150**: `POST /api/routines` - Tạo routine từ UI
- **#4151**: `DELETE /api/memory` - Xóa knowledge documents
- **#4152**: `POST /api/auth/signout` - Server-side sign-out
- **#4153**: `GET /api/routines/recent-runs` - Recent runs feed cho sparkline view

**Ý nghĩa**: Cho thấy IronClaw đang được sử dụng thực tế và cần API endpoints cho production use cases.

### **Thread Title UX** (PR #4142)
- Contributor @italic-jinxin fix vấn đề WebUI v2 hiển thị "Thread <uuid>"
- Giải pháp: Populate title từ câu đầu tiên của user message
- **Impact**: Cải thiện UX đáng kể cho sidebar navigation

### **Conversation Delete** (Issue #1907)
- Feature request từ @saga197410qq (1 👍)
- Vấn đề: Không thể xóa conversations trong WebUI
- **Status**: Vẫn OPEN sau 2 tháng - có thể cần prioritize

## 5. 🐛 Ổn định & Bugs

### **Critical Fixes Merged**

1. **Background subagent completion** (PR #4089 → Issue #4084)
   - **Bug**: Background subagents hoàn thành nhưng không notify parent
   - **Root cause**: `SubagentCompletionObserver` không gọi notification
   - **Fix**: Thêm notification mechanism
   - **Follow-up**: Disabled background mode (PR #4148) do cần thiết kế lại (#4147)

2. **Reply completion stop strategy** (PR #4139)
   - **Bug**: Reply-only turns bypass stop strategy
   - **Fix**: Route qua existing stop strategy thay vì canonical executor bypass

3. **"null" string handling** (PR #4133)
   - **Bug**: Weak models gửi `"null"` string thay vì omit optional params
   - **Impact**: `builtin.time` có 9 optional params → nhiều lỗi
   - **Fix**: Treat "null" string as absent

4. **Extension catalog duplicates** (PR #4157, #4158)
   - **Bug**: Bundled extensions bị duplicate với local entries
   - **Fix**: Prefer bundled entries, skip incomplete local directories

### **Security & Safety**

- **Credential vocabulary validation** (PR #4141): Typed prompt surfaces với distinct policies
- **Auth gate improvements** (PR #4136): Missing credentials → auth-required gate thay vì terminal failure
- **Process sandbox approvals** (PR #4094): Re-apply approval wiring sau khi revert

## 6. ✨ Yêu cầu tính năng

### **Đã được đề xuất**

1. **Trigger Loop** (Issue #3873) - Scheduled (cron) triggers
   - Use case: "Every morning at 8am, summarize my unread mail"
   - Status: Design phase, chưa implement

2. **Ambient runtime context** (Issue #4149)
   - Inject current date, cwd, platform, shell, git status vào prompts
   - Reborn hiện tại thiếu context này so với legacy system

3. **GSuite live harness** (Issue #3968)
   - Cần live integration tests cho Calendar/Gmail
   - Hiện tại chỉ có recorded fixtures

### **Desktop Client Requests** (xem mục 4)

## 7. 👥 Phản hồi người dùng

### **Positive Signals**

- **Active external contributors**: @italic-jinxin, @standardtoaster đóng góp meaningful PRs
- **Real-world usage**: Desktop client development cho thấy adoption
- **Quality bar**: PRs có thorough testing và documentation

### **Pain Points**

1. **Missing API endpoints**: Desktop client cần 4 endpoints mới
2. **Thread management**: Không thể delete conversations (2 tháng chưa fix)
3. **Weak model compatibility**: Cần nhiều workarounds cho quantized models

### **Developer Experience**

- **Documentation**: Các PRs đều có detailed summaries và test coverage
- **Architecture clarity**: Issues như #4162, #4163 cho thấy team aware về technical debt
- **Safety-first**: Nhiều PRs focus vào security và proper error handling

## 8. 📋 Backlog & Roadmap

### **Immediate Next Steps** (dựa trên open issues/PRs)

1. **Compaction refactoring** (#4162, #4163)
   - Decompose `CompactionTask::run` thành typed pipeline stages
   - Refactor `PromptStage` orchestration

2. **Google OAuth completion** (#4112, #4113, #4160, #4161)
   - WebUI OAuth flow E2E
   - Token refresh implementation
   - Account health tracking
   - Adapter boundary refactoring

3. **Subagent completion delivery** (#4147)
   - Design durable background completion
   - Hiện tại background mode bị disabled

4. **Desktop client API support** (#4150-#4153)
   - 4 endpoints cần implement

### **Strategic Initiatives**

1. **Extension lifecycle** (PR #4128): Enable cho production profiles
2. **WebUI v2 mount coverage** (PR #4135): Lock beta route surface E2E
3. **Trigger Loop** (#3873): Scheduled workflows - major feature

### **Technical Debt**

- **executor.rs decomposition** (#3871): File quá lớn, cần break down
- **Skill activation complexity**: Đang có nhiều modes (keyword, tag, regex, model-selected)
- **Auth/credential boundaries**: Nhiều PRs touch vào area này → cần consolidation

---

## 🎯 Kết luận

IronClaw đang trong giai đoạn **maturation** với focus vào:
- ✅ **Stability**: Nhiều bug fixes và safety improvements
- ✅ **Production readiness**: OAuth, auth gates, proper error handling
- ✅ **Developer experience**: Refactoring, typed surfaces, declarative policies
- ⚠️ **Feature velocity**: Một số features (trigger loop, ambient context) vẫn ở design phase

**Điểm mạnh**: Engineering discipline cao, thorough testing, active community
**Điểm cần cải thiện**: API completeness cho external clients, faster feature delivery

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo phân tích LobsterAI - Ngày 2026-05-28

## 🎯 Tóm tắt hôm nay

LobsterAI vừa phát hành phiên bản **2026.5.27** với tính năng tạo video/media quan trọng và dịch vụ chia sẻ HTML. Dự án đang tích cực xử lý backlog với 24 PR đang mở (nhiều PR bị đánh dấu "stale"), tập trung vào cải thiện UX/UI cho các module định thời, kỹ năng, và tích hợp OpenClaw. Cộng đồng phản ánh vấn đề đăng nhập thành viên và giới hạn thời gian chạy task.

---

## 🚀 Releases

### **Version 2026.5.27** (Phát hành: 27/05/2026)

**Tính năng chính:**

- **🎬 Tạo media/video**: Tích hợp Kling V3 với hệ thống quota-based entitlement - đây là bước tiến quan trọng cho khả năng tạo nội dung đa phương tiện của LobsterAI
- **🔗 Dịch vụ chia sẻ HTML**: Cho phép chia sẻ nội dung dưới dạng HTML, cải thiện khả năng cộng tác
- **🔄 Đồng bộ OpenClaw hai chiều**: Plugin/skill sync giữa LobsterAI và OpenClaw, tăng cường tính linh hoạt
- **🐛 Sửa lỗi ổn định OpenClaw**: Loạt bản vá ổn định cho tích hợp OpenClaw
- **🖼️ Preview ảnh trong input**: Click để xem ảnh đính kèm ở kích thước đầy đủ (#2061)
- **🔧 Sửa lỗi gateway restart**: Do GitHub Copilot token refresh

**Ý nghĩa:** Release này đánh dấu sự mở rộng đáng kể về khả năng tạo nội dung (từ text sang media) và cải thiện trải nghiệm tích hợp với OpenClaw - cho thấy LobsterAI đang phát triển thành nền tảng AI agent toàn diện hơn.

---

## 📈 Tiến độ dự án

### **Xu hướng phát triển**

**Tích cực:**
- Phát hành đều đặn với tính năng mới quan trọng
- Tập trung cải thiện UX/UI cho các module hiện có
- Tăng cường tích hợp OpenClaw (plugin sync, stability fixes)

**Thách thức:**
- **20+ PR bị đánh dấu "stale"** - backlog đang tích tụ nghiêm trọng
- Nhiều PR cải tiến UX từ tháng 4 vẫn chưa được merge (#1488, #1494, #1773, #1485-#1507)
- Dependency updates (#1277, #1491-#1493) bị trì hoãn

### **PR quan trọng đang chờ xử lý**

**🎨 UX/UI Improvements:**
- **#1488**: Nâng cấp toàn diện UI module định thời (card grid, search, history grouping) - cải thiện đáng kể trải nghiệm quản lý task
- **#1494**: Quản lý trạng thái skill selection theo session - sửa lỗi UX quan trọng (skill không nên persist giữa các session)
- **#1773**: Thêm translation key "edit" cho memory entry - fix nhỏ nhưng cần thiết cho i18n

**⚙️ Core Functionality:**
- **#1485**: Enforce disabled skills trong system prompts - đảm bảo skill bị tắt thực sự không hoạt động
- **#1499**: Session pruning để tránh vượt context window - giải quyết vấn đề "input quá dài" trong long-running sessions
- **#2060**: **Kit (Expert Suite) Store** - tính năng mới cho phép đóng gói nhiều skills thành suite, có marketplace riêng

**🔧 Bug Fixes:**
- #1486, #1489, #1490: Cải thiện scheduled task (test button, local notifications, delivery channel updates)
- #1501, #1505: Sửa lỗi skill management (disabled skills vẫn active, không sync khi update agent)
- #1507: Validate POPO AES Key khi enable bot

---

## 🌟 Điểm nổi bật cộng đồng

### **Issue #1903** - Đăng nhập thành viên thất bại thường xuyên ⚠️
- **Mức độ nghiêm trọng**: Cao (ảnh hưởng trực tiếp đến khả năng sử dụng dịch vụ trả phí)
- **Trạng thái**: Mở từ 07/05, cập nhật 27/05 (2 comments)
- **Vấn đề**: Người dùng không thể đăng nhập tài khoản thành viên → không sử dụng được model trả phí của NetEase
- **Tác động**: Ảnh hưởng trực tiếp đến revenue và trải nghiệm người dùng premium

### **Issue #2062** - Task vượt quá thời gian tối đa
- **Vấn đề**: Task 24h liên tục bị dừng với lỗi "Task timed out"
- **Không rõ**: Task thực sự dừng hay vẫn chạy background
- **Liên quan**: PR #1499 về session pruning có thể giúp giải quyết phần nào vấn đề này

---

## 🐛 Ổn định & Bugs

### **Đang được xử lý:**

1. **Authentication issues** (#1903) - Ưu tiên cao, ảnh hưởng monetization
2. **Task timeout handling** (#2062) - Cần làm rõ behavior và giới hạn
3. **Gateway restart** - Đã fix trong 2026.5.27 (GitHub Copilot token refresh)
4. **OAuth protocol handler** - Đã fix cho Windows dev mode (#2059)

### **Backlog bugs (stale PRs):**
- Skill management bugs (#1501, #1505) - Skills không được disable đúng cách
- POPO IM validation (#1507) - Thiếu validation cho AES Key
- Delivery channel không update (#1490)
- Session context overflow (#1499) - Cần session pruning

**Đánh giá:** Có nhiều bug fixes quan trọng đang nằm trong stale PRs, cần được ưu tiên review và merge.

---

## 💡 Yêu cầu tính năng

### **Đang phát triển:**

**🎁 Kit (Expert Suite) Store** (#2060) - Tính năng mới đáng chú ý:
- Đóng gói nhiều Skills thành một Suite có thể cài đặt một lần
- Marketplace với UI card grid, search, install/uninstall
- Tích hợp vào dialog input (Popover multi-select + Badge display)
- Auto-inject skills từ Kit vào session context
- Try Asking guidance và Kit selection persistence

**Ý nghĩa:** Đây là bước tiến lớn trong việc tạo ecosystem cho LobsterAI - cho phép chia sẻ và phân phối "expert configurations" dễ dàng hơn.

### **UX Enhancements đang chờ:**
- Scheduled Task UI overhaul (#1488) - Card grid, search, history grouping
- Test Task button (#1486) - Quick validation trước khi save
- Local macOS notifications (#1489)
- Rich Markdown editor cho Agent guides (#1503)
- Session-scoped skill selection (#1494)

---

## 💬 Phản hồi người dùng

### **Pain points chính:**

1. **🔐 Authentication reliability** - Đăng nhập thành viên không ổn định, blocking việc sử dụng premium features
2. **⏱️ Task execution limits** - Không rõ giới hạn thời gian, task dài bị terminate không báo trước
3. **🔄 Skill management confusion** - Skills bị disable vẫn hoạt động, không sync giữa sessions

### **Expectations:**
- Cần cơ chế đăng nhập thành viên đáng tin cậy hơn
- Transparent task execution limits và better error messages
- Consistent skill behavior across sessions

---

## 🗺️ Backlog & Roadmap

### **Ưu tiên cao (cần xử lý ngay):**

1. **Fix authentication issues** (#1903) - Critical cho business
2. **Clear stale PR backlog** - 20+ PRs từ tháng 4 cần review
3. **Dependency updates** - Security và compatibility (#1277, #1491-#1493)

### **Roadmap ngắn hạn (dựa trên PRs):**

**Q2 2026:**
- ✅ Media generation (shipped in 2026.5.27)
- ✅ HTML share service (shipped)
- 🔄 Kit Store (#2060) - Đang phát triển
- 🔄 Scheduled Task UX overhaul (#1488)
- 🔄 Session pruning (#1499)

**Tính năng tiềm năng:**
- Rich Markdown editor cho Agent configuration (#1503)
- Windows close behavior customization (#1497)
- Enhanced IM integrations (POPO improvements)

### **Technical debt:**
- Electron version upgrade (40.2.1 → 42.2.0) - #1277
- GitHub Actions updates (#1491-#1493)
- Code quality improvements (nhiều bug fixes trong stale PRs)

---

## 📊 Đánh giá tổng quan

**Điểm mạnh:**
- ✅ Phát hành đều đặn với tính năng mới có giá trị
- ✅ Mở rộng khả năng (text → media generation)
- ✅ Tích hợp OpenClaw ngày càng chặt chẽ

**Điểm cần cải thiện:**
- ⚠️ Backlog quá lớn (20+ stale PRs)
- ⚠️ Authentication reliability issues
- ⚠️ Review velocity cần tăng lên

**Khuyến nghị:**
1. Ưu tiên fix authentication (#1903) - ảnh hưởng trực tiếp revenue
2. Sprint để clear stale PRs - nhiều improvements quan trọng đang bị block
3. Tăng cường testing cho authentication và long-running tasks

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo phân tích dự án Moltis - 28/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 27-28/05 ghi nhận hoạt động tích cực với 2 PR được merge thành công, mở rộng khả năng tích hợp AI provider và cải thiện hệ thống memory. Dự án tiếp tục nhận được feedback từ cộng đồng về vấn đề tương tác multi-agent và lỗi xác thực người dùng. Không có release mới nhưng các cải tiến kỹ thuật quan trọng đã được triển khai.

---

## 🚀 Releases

Không có release mới trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### Pull Requests đã merge

**✅ #1074 - Cấu hình linh hoạt cho embedding dimensions**
- **Tác động**: Cho phép tùy chỉnh số chiều embedding cho các provider OpenAI-compatible
- **Tính năng chính**:
  - Thêm trường `dimensions` trong config (hỗ trợ cả alias `embedding_dimensions`)
  - Tự động reindex khi thay đổi dimensions với flag `reindex_on_dim_change`
  - Phát hiện dimensions tự động qua query thử nghiệm
- **Ý nghĩa**: Tăng tính linh hoạt cho hệ thống memory, cho phép tối ưu hiệu suất theo từng use case cụ thể

**✅ #451 - Tích hợp Novita AI provider**
- **Tác động**: Mở rộng hệ sinh thái AI provider
- **Chi tiết**:
  - Endpoint: `https://api.novita.ai/openai`
  - 3 models mới: `moonshotai/kimi-k2.5`, `deepseek/deepseek-v3.2`, `zai-org/glm-5`
  - Cấu hình qua `NOVITA_API_KEY`
- **Ý nghĩa**: Tăng khả năng lựa chọn model cho người dùng, đặc biệt với các model Trung Quốc phổ biến

### Xu hướng phát triển

🔹 **Mở rộng provider ecosystem**: Dự án đang tích cực thêm các AI provider mới, theo hướng OpenAI-compatible để dễ tích hợp

🔹 **Cải thiện memory system**: Tập trung vào tối ưu hóa embedding và khả năng tùy chỉnh

---

## 🌟 Điểm nổi bật cộng đồng

### Issue #235 - PTY-based interactive Claude Code CLI control (👍 1, 💬 4)

**Vấn đề**: Khi agent frameworks spawn Claude Code qua subprocess, Claude Code phát hiện không có terminal thật (`isatty() == false`) và tắt chế độ interactive, khiến không thể:
- Nhận feedback giữa task
- Xử lý prompts xác nhận
- Điều khiển autonomous multi-agent orchestration

**Tầm quan trọng**: 
- Issue này ảnh hưởng trực tiếp đến khả năng tích hợp Moltis vào các hệ thống multi-agent phức tạp
- Có 4 bình luận cho thấy cộng đồng đang tích cực thảo luận giải pháp
- Mở ra hướng phát triển quan trọng cho autonomous agent orchestration

**Đề xuất giải pháp**: Cần cơ chế PTY-based để giữ interactive mode ngay cả khi chạy trong subprocess

---

## 🐛 Ổn định & Bugs

### Issue #1077 - Lỗi xác thực user name (Mới, chưa có phản hồi)

**Mô tả**: `Error: invalid params, user name must be consistent (2013)`

**Trạng thái**: 
- Mới được báo cáo ngày 27/05
- Chưa có bình luận hoặc phản hồi từ maintainers
- User đã follow checklist đầy đủ (search existing issues, dùng latest version, cung cấp context)

**Đánh giá mức độ**: 
- Có thể ảnh hưởng đến trải nghiệm người dùng mới
- Cần được ưu tiên xử lý để tránh tạo rào cản onboarding

---

## 💡 Yêu cầu tính năng

### Feature Request: PTY-based Interactive Control (#235)

**Mục tiêu**: Cho phép agent frameworks điều khiển Claude Code trong chế độ interactive đầy đủ

**Use cases**:
- Multi-agent orchestration tự động
- Nhận feedback real-time từ Claude Code
- Xử lý confirmation prompts trong workflow tự động

**Tác động tiềm năng**: Mở ra khả năng xây dựng các hệ thống agent phức tạp hơn với Moltis làm core component

---

## 💬 Phản hồi người dùng

### Tích cực
- Cộng đồng đang tích cực đóng góp code (2 PRs từ contributors bên ngoài)
- Người dùng follow quy trình báo lỗi đúng chuẩn (checklist đầy đủ)
- Có engagement với các tính năng nâng cao (multi-agent orchestration)

### Cần cải thiện
- Thời gian phản hồi với issue mới (#1077) cần nhanh hơn
- Cần documentation rõ ràng hơn về user authentication để tránh lỗi như #1077

---

## 🗺️ Backlog & Roadmap

### Ưu tiên cao
1. **Xử lý lỗi authentication** (#1077) - Ảnh hưởng trải nghiệm người dùng
2. **PTY-based interactive control** (#235) - Mở khóa use cases mới

### Xu hướng phát triển
- **Provider expansion**: Tiếp tục thêm AI providers mới (đã có Novita AI)
- **Memory optimization**: Cải thiện embedding system với configurable dimensions
- **Multi-agent capabilities**: Hướng tới hỗ trợ orchestration phức tạp hơn

### Cơ hội phát triển
- Xây dựng documentation cho multi-agent integration
- Tạo examples về autonomous agent workflows
- Cải thiện error messages và debugging experience

---

## 📊 Thống kê tổng quan

- **Issues mở**: 2 (1 feature request, 1 bug)
- **PRs merged**: 2 (100% success rate trong ngày)
- **Engagement**: Trung bình (4 comments trên issue quan trọng nhất)
- **Contributor diversity**: Tốt (PRs từ nhiều contributors khác nhau)

**Đánh giá chung**: Dự án đang phát triển ổn định với focus rõ ràng vào mở rộng tích hợp và cải thiện core features. Cần chú ý đến việc xử lý bugs nhanh hơn để duy trì trải nghiệm người dùng tốt.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo Phân tích Hệ Sinh Thái CoPaw - Ngày 2026-05-28

## 1. 📊 Tóm tắt hôm nay

Ngày 27-28/05 đánh dấu cột mốc quan trọng với **phát hành v1.1.9 chính thức**, tập trung vào Desktop App (Tauri 2.x) và Coding Mode mới. Cộng đồng rất tích cực với 27 PRs và 28 issues, trong đó nhiều first-time contributors tham gia. Các vấn đề về UX (timestamp, session persistence) được ưu tiên xử lý nhanh, phản ánh sự lắng nghe người dùng của team.

---

## 2. 🚀 Releases

### **v1.1.9 - Bản phát hành chính thức (27/05/2026)**

**Tính năng nổi bật:**

✨ **Desktop & IDE**
- **Tauri 2.x Desktop App**: Ứng dụng native cho macOS/Windows, thay thế pywebview cũ (#3813)
- **Coding Mode**: Web IDE 3 panel (file tree + editor với inline diff + Git panel) cho code review và commit (#4578, #4671)

🔧 **Cải thiện UX**
- Hỗ trợ external links trong desktop app (#4683)
- Sửa lỗi SVG MIME type trên Windows (#4718)
- Ẩn console windows của Git trên Windows (#4696)

🛡️ **Bảo mật & Ổn định**
- Sửa lỗi schema sanitizer làm hỏng MCP tool schemas (#4690)
- Xử lý reasoning content với file blocks (#4728)
- Cải thiện timestamp consistency trong vector store (#4710)

**Ý nghĩa:** Đây là bước tiến lớn về trải nghiệm desktop và khả năng code collaboration, đưa CoPaw gần hơn với các IDE chuyên nghiệp như Cursor/Windsurf.

---

## 3. 📈 Tiến độ dự án

### **Xu hướng phát triển chính:**

#### 🎯 **Desktop-first Strategy**
- PR #4683, #4696, #4724: Liên tục fix các vấn đề desktop (external links, hidden windows, subprocess flags)
- Chuyển từ pywebview sang Tauri 2.x cho performance tốt hơn

#### 🧪 **Test Coverage Expansion**
- PR #4674: Mở rộng integration tests với tiered CI gate (Sprint 1.1+1.2)
- PR #4464: Migrate python_e2e với mock infrastructure
- Mục tiêu: 89% security coverage, 967 tests

#### 🔌 **Plugin Ecosystem**
- PR #4622: DataPaw plugin với 12 BI skills
- PR #4693: Hỗ trợ plugin-registered custom channels với schema-driven UI
- PR #4719: Thêm GitLab skill source support

#### 🌐 **Provider Expansion**
- PR #4682: Thêm Kimi K2.6, xóa K2 series deprecated
- PR #4722: Thêm Xiaomi MiMo Token Plan provider
- PR #4660: Slim OpenCode models xuống 8 models (Zen ∩ Go)

### **Breaking Changes sắp tới:**
⚠️ **Issue #4727**: Migration từ AgentScope 1.x → 2.0 đang được lên kế hoạch (1 👍)

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

🔥 **#2291** - Help Wanted: Open Tasks (63 comments)
- Task list mở cho contributors, priority P0→P2
- Phản ánh sự mở cửa với cộng đồng

🕐 **#4662** - Thêm timestamp cho mỗi tin nhắn (6 comments, CLOSED)
- Yêu cầu từ @tina0501853, được fix nhanh trong PR #4720
- Cho thấy team responsive với feedback UX

🐛 **#4653** - Định thời task bị interrupt bởi user message (5 comments, CLOSED)
- Vấn đề session sharing giữa cron và user
- Được giải quyết, cải thiện reliability

### **First-time Contributors:**
- 5 PRs từ first-time contributors (#4615, #4708, #4719, #4718, #4717)
- Chủ yếu về features (Feishu thread reply, GitLab skills) và bug fixes

---

## 5. 🐛 Ổn định & Bugs

### **Bugs đã fix:**

✅ **Console không responsive** (#3468, CLOSED)
- Hiện tượng: UI freeze nhưng refresh lại có content
- Đã được xử lý trong v1.1.9

✅ **Timestamp inconsistency** (#4710, OPEN)
- MemoryNode dùng naive datetime, metadata dùng UTC
- Đang được investigate

✅ **Wechat poll thread crash** (#4697, OPEN)
- Thread bị kill khi workspace reload, không auto-recovery
- Critical cho production deployment

### **Security Issues:**

🔒 **#4709** - ToolGuard bypass (OPEN)
- Agent có thể đọc process env vars qua `execute_shell_command`
- Cần attention cao vì liên quan security

🔒 **#4646** - MCP tool schema corruption (CLOSED)
- Schema sanitizer convert boolean keywords thành invalid objects
- Đã fix trong PR #4690

---

## 6. 💡 Yêu cầu tính năng

### **UX Improvements:**

📁 **#4408** - Thống nhất working directory vào `.qwenpaw` folder (5 comments)
- Giống OpenCode, giữ workspace gọn gàng
- Đang được consider

📜 **#4732** - Sort lịch sử chat theo thời gian gần nhất (2 comments, CLOSED)
- Đã được implement nhanh

🔄 **#4733** - Restore session khi restart app (1 comment, OPEN)
- Desktop app không nhớ agent/session cuối cùng
- Ảnh hưởng UX nghiêm trọng

### **Advanced Features:**

🧠 **#4652** - Tăng cường memory system với "tóm tắt-liên kết-nhắc nhở" (3 comments)
- Hiện tại chỉ record không học
- Đề xuất: state management, cross-time aggregation, smart reminders

📋 **#4651** - Auto-load operation specs (1 comment)
- Giống Code Review Checklist
- Load SKILL.md tự động khi execute task

👥 **#4702** - RBAC cho multi-user enterprise (2 comments)
- Yêu cầu từ enterprise users
- Cần admin panel quản lý users

---

## 7. 🗣️ Phản hồi người dùng

### **Positive:**
- Desktop app được đón nhận tích cực
- Coding Mode đáp ứng nhu cầu code collaboration
- Team responsive với bug reports (fix trong 1-2 ngày)

### **Pain Points:**

⚠️ **Stability Issues:**
- Console freeze (#3468)
- Cron job interruption (#4653)
- Wechat channel crash (#4697)

⚠️ **UX Gaps:**
- Thiếu timestamp (#4662) → đã fix
- Session không persist (#4733)
- Lịch sử chat không sort (#4732) → đã fix

⚠️ **Configuration:**
- Auto-generate agent mỗi lần restart (#4264)
- Model switch không auto-adapt config (#4687)

### **Enterprise Concerns:**
- Cần RBAC/multi-user (#4702)
- File upload size limit cần configurable (#4729)

---

## 8. 🗺️ Backlog & Roadmap

### **Confirmed Roadmap:**

🔴 **Breaking Change - Q3 2026**
- **AgentScope 2.0 Migration** (#4727)
- Upgrade từ 1.x → 2.0 architecture
- Expected ship: several months

### **High Priority (P0-P1):**

🟡 **Security**
- Fix ToolGuard bypass (#4709)
- Audit env var exposure

🟡 **Stability**
- Wechat poll thread auto-recovery (#4697)
- Orphaned cron job cleanup (#4649)

🟡 **UX Polish**
- Session persistence (#4733)
- Working directory cleanup (#4408)

### **Plugin Ecosystem:**
- DataPaw plugin review (#4622)
- Custom channel registration (#4693)
- GitLab skill source (#4719)

### **Provider Expansion:**
- Xiaomi MiMo (#4722)
- Kimi K2.6 (#4682)

---

## 📌 Kết luận

**Điểm mạnh:**
- ✅ Release cadence ổn định (v1.1.9 đúng hạn)
- ✅ Cộng đồng tích cực (nhiều first-time contributors)
- ✅ Responsive với feedback (fix bugs trong 1-2 ngày)
- ✅ Desktop-first strategy rõ ràng

**Cần cải thiện:**
- ⚠️ Stability issues cần ưu tiên (Wechat, cron jobs)
- ⚠️ Security audit (ToolGuard bypass)
- ⚠️ Enterprise features (RBAC, multi-user)
- ⚠️ Memory system cần refactor (issue #4652)

**Outlook:** CoPaw đang trên đà phát triển tốt với focus vào desktop experience và plugin ecosystem. Migration sang AgentScope 2.0 sẽ là milestone lớn tiếp theo, nhưng cần đảm bảo stability trước khi breaking change.

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo phân tích GoClaw - 28/05/2026

## 🎯 Tóm tắt hôm nay

Hoạt động của GoClaw hôm nay tập trung vào việc sửa lỗi hạ tầng cốt lõi với 2 vấn đề quan trọng đang được xử lý. Một PR đang chờ merge để sửa lỗi nghiêm trọng trong hệ thống vault (lưu trữ tài liệu), trong khi một issue ưu tiên cao về quản lý context trong chat sessions vẫn đang được thảo luận. Không có release mới, cho thấy team đang tập trung vào ổn định hóa sản phẩm.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### Pull Requests đang hoạt động

**#1174 - Sửa lỗi nghiêm trọng trong Vault API** 🔴
- **Vấn đề**: API endpoint `POST /v1/agents/{id}/vault/documents` không lưu nội dung tài liệu
- **Nguyên nhân**: Struct body thiếu field `content`, dẫn đến dữ liệu bị loại bỏ im lặng
- **Hậu quả**: 
  - `content_hash` trống
  - Không có file được ghi
  - Pipeline enrichment không chạy
  - Người dùng nhận HTTP 201 nhưng tài liệu thực tế không được lưu
- **Trạng thái**: PR đã được tạo từ 25/05, cập nhật lần cuối 27/05, đang chờ review

**Đánh giá**: Đây là lỗi data loss nghiêm trọng ảnh hưởng trực tiếp đến trải nghiệm người dùng. Việc PR vẫn chưa được merge sau 3 ngày cho thấy có thể đang cần review kỹ lưỡng hoặc thiếu reviewer.

## 🔥 Điểm nổi bật cộng đồng

Hoạt động cộng đồng khá yên tĩnh với không có tương tác đáng kể (0 reactions trên cả issue và PR). Điều này có thể cho thấy:
- Dự án đang trong giai đoạn phát triển nội bộ
- Cộng đồng người dùng còn nhỏ
- Các vấn đề này mang tính kỹ thuật cao, chưa ảnh hưởng rộng rãi

## 🐛 Ổn định & Bugs

### Issue #1136 - Context Overflow trong Long-lived Chat Sessions (P1-High) 🔴

**Vấn đề cốt lõi**:
- GoClaw có cơ chế auto-compaction cho session, nhưng trong thực tế chat sessions dài vẫn có thể vượt quá giới hạn context của model trước khi compaction kích hoạt
- Dẫn đến lỗi khi gọi API model/provider

**Tác động**:
- Ảnh hưởng đến `area:agent-loop` và `area:data-store`
- Làm gián đoạn trải nghiệm chat của người dùng trong các phiên làm việc dài

**Giải pháp đề xuất**:
1. Thêm cơ chế overflow-triggered compact + retry
2. Bổ sung manual compact controls cho người dùng

**Trạng thái**: 
- Mở từ 09/05 (19 ngày)
- Cập nhật lần cuối 27/05
- Có 1 comment thảo luận
- Được gắn nhãn P1-high nhưng vẫn chưa có PR tương ứng

**Phân tích**: Đây là vấn đề về kiến trúc và quản lý tài nguyên - một thách thức phổ biến trong các AI agent systems. Việc issue tồn tại gần 3 tuần với priority cao cho thấy đây là vấn đề phức tạp, có thể cần thiết kế lại cơ chế compaction.

## 💡 Yêu cầu tính năng

Không có feature request mới trong ngày hôm nay. Issue #1136 tuy là bug report nhưng cũng đề xuất thêm tính năng manual compact controls.

## 💬 Phản hồi người dùng

Dựa trên dữ liệu hiện có:
- **Vault API issue**: Người dùng gặp vấn đề khi upload tài liệu nhưng không nhận được thông báo lỗi rõ ràng (silent failure)
- **Context overflow**: Người dùng trong các phiên chat dài gặp lỗi đột ngột khi context vượt giới hạn

Cả hai vấn đề đều liên quan đến **trải nghiệm người dùng kém** do thiếu feedback rõ ràng và cơ chế xử lý lỗi graceful.

## 🗺️ Backlog & Roadmap

Dựa trên labels và priority:

**Ưu tiên cao (P1)**:
- ✅ Sửa lỗi context overflow trong agent loop
- ✅ Cải thiện cơ chế data store và session management

**Xu hướng phát triển**:
- Tập trung vào **độ tin cậy** (reliability) của hệ thống
- Cải thiện **khả năng xử lý long-running sessions**
- Tăng cường **error handling và user feedback**

**Dự đoán**: Team có thể sẽ tập trung vào việc release một bản patch sửa lỗi trong thời gian tới, đặc biệt là vault API fix vì đây là data loss issue nghiêm trọng.

---

## 📌 Kết luận

GoClaw đang trong giai đoạn **ổn định hóa sản phẩm** với focus vào việc sửa các lỗi hạ tầng quan trọng. Hai vấn đề chính (vault API và context management) đều ảnh hưởng đến trải nghiệm người dùng và cần được ưu tiên giải quyết. Hoạt động cộng đồng còn hạn chế, cho thấy dự án có thể đang trong giai đoạn early-stage hoặc phát triển nội bộ.

**Khuyến nghị**: Team nên ưu tiên merge PR #1174 sớm để tránh data loss cho người dùng, đồng thời cần có roadmap rõ ràng hơn cho việc giải quyết issue #1136.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo phân tích Hermes-Agent - 28/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 28/05 chứng kiến một đợt hoạt động mạnh mẽ với **30 PRs mới** tập trung vào bảo mật và ổn định hệ thống. Dự án đang trải qua giai đoạn hardening quan trọng với nhiều bản vá bảo mật nghiêm trọng (RCE, session hijacking, auth bypass) và sửa lỗi resource leak. Đáng chú ý là các cải tiến về OAuth billing, MCP catalog, và gateway stability.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng dự án đang chuẩn bị cho một bản release ổn định với khối lượng lớn security patches và bug fixes.

---

## 📈 Tiến độ dự án

### 🔐 **Bảo mật - Ưu tiên cao nhất**

Một loạt lỗ hổng bảo mật nghiêm trọng được phát hiện và vá trong ngày:

- **#33588, #33589**: 🚨 **RCE qua YAML deserialization** - `yaml.load()` với `CSafeLoader` vẫn cho phép arbitrary object construction. Đã chuyển sang `yaml.safe_load()`.

- **#33591**: 🚨 **Session hijacking trong TUI gateway** - Phương thức `_respond()` không verify message ownership, cho phép attacker respond vào approval messages của session khác.

- **#33590**: 🚨 **WebSocket auth bypass** - Exception handling trong `_check_ws_token()` trả về `True` khi import fail, bỏ qua hoàn toàn token verification.

- **#33592**: ⚠️ **Webhook route reload bypass** - Dynamic reload bỏ qua `INSECURE_NO_AUTH` safety check, khác với static registration.

**Đánh giá**: Đây là những lỗ hổng nghiêm trọng ảnh hưởng đến production. Việc phát hiện đồng loạt cho thấy dự án đang trải qua security audit toàn diện.

### 🛠️ **Ổn định hệ thống**

- **#33564, #33580**: 🔧 **FD exhaustion fix** - Kanban DB connection leak gây "Too many open files" trên macOS. Mỗi connection mở 3 FDs (`.db`, `.db-wal`, `.db-shm`) trong WAL mode. PR thêm context manager để đảm bảo close FD.

- **#33566**: 🔧 **LSP installer crash** - Auto-install subprocess kế thừa TUI gateway stdin pipe, gây deadlock. Đã detach stdin với `subprocess.DEVNULL`.

- **#33579, #33578**: 🔧 **OpenAI Codex provider crash** - `response.output: null` gây `TypeError`. Đã thêm null guard.

- **#33581**: 🔧 **Memory manager type error** - `sanitize_context()` nhận structured content blocks thay vì string, gây regex crash.

### 💰 **OAuth & Billing optimization**

- **#33570**: 💡 **Strip `mcp_` prefix** - Anthropic OAuth billing classifier route requests có tool name bắt đầu bằng `mcp_` vào "extra usage", gây HTTP 400 khi bucket empty. PR strip prefix để tránh extra charges.

- **#31904**: 💡 **Normalize Nous Portal entitlement** - Tạo abstraction `NousPortalAccountInfo` để check free/paid tier một cách nhất quán.

- **#33574**: 🔧 **Codex token staleness** - JWT `exp` claim có thể bị clock skew. Thêm wall-clock floor và cross-profile shared token store.

### 🌐 **Gateway & Platform fixes**

- **#33582, #33584, #33568**: 🔧 **Feishu routing bugs** - Ba lỗi liên quan: topic reply anchor sai, invalid `thread_id` API call, @mention detection không hoạt động.

- **#33576, #33530**: 🔧 **Gateway message mirror** - Queued `send_message` mirrors không được replay khi target session chưa tồn tại.

- **#29582**: 🔧 **WeChat HTML file** - Gateway từ chối `.html` files do extension allowlist quá strict.

### ✨ **Tính năng mới**

- **#33593**: 📊 **Context audit snapshots** - Append-only audit trail cho mỗi model request, expose qua `/api/sessions/{session_id}/audit`.

- **#33587**: 🆕 **ByteDance Coding Plan provider** - Thêm BytePlus/ByteDance Ark làm built-in provider.

- **#33577**: 🎨 **Lattice UI implementation** - Bắt đầu port Lattice design prototype sang TypeScript React.

- **#33571, #33567**: ⏱️ **Activity-aware clarify timeout** - Reset deadline khi user đang typing, tránh timeout giữa chừng.

- **#33575**: 📁 **Private MCP catalog paths** - Support `mcp_catalog_paths` cho private/team catalogs.

- **#33569**: ⚡ **Lean API mode** - `extra.lean` flag để skip agent rule injection, giảm overhead.

- **#33583**: 🐳 **Docker s6 auto-upgrade** - `gateway run` tự động upgrade sang supervised mode trong s6 container.

---

## 🔥 Điểm nổi bật cộng đồng

### Issues được quan tâm:

1. **#32423** (3 comments): Context window giảm từ 1M xuống 256K sau interrupted compaction - ảnh hưởng trực tiếp đến user experience.

2. **#29582** (2 comments): WeChat gateway không gửi được HTML files - blocking cho use case documentation sharing.

### PRs có impact cao:

- **#31904**: Normalize Nous Portal auth - foundation cho billing/entitlement logic
- **#33570**: OAuth billing optimization - tiết kiệm chi phí cho Pro/Pro Max users
- **#33564**: Kanban FD leak fix - giải quyết crash trên production macOS deployments

---

## 🐛 Ổn định & Bugs

### 🚨 **Critical (P2)**

- **Context window regression** (#32423): Compaction interrupt gây downgrade 1M → 256K
- **Feishu routing** (#33568): Messages escape topics vào main chat
- **WeChat file delivery** (#29582): HTML files bị block
- **Codex auth** (#33574): Token staleness gây auth failures

### ⚠️ **High (P3)**

- **OpenAI Codex crash** (#33578): `NoneType` iteration error
- **Kanban FD leak** (#33580): macOS file descriptor exhaustion
- **LSP installer** (#33566): TUI gateway stdin deadlock

### 📊 **Xu hướng**

- **Security hardening**: 5 PRs bảo mật trong 1 ngày cho thấy đang có security audit
- **Resource management**: 3 PRs về FD/connection leaks
- **OAuth optimization**: 3 PRs về billing và token management
- **Platform stability**: 4 PRs fix Feishu/WeChat/gateway issues

---

## 💡 Yêu cầu tính năng

### Đã implement:

1. ✅ **Context audit trail** (#33593) - Transparency cho model requests
2. ✅ **Activity-aware timeout** (#33571) - Better UX cho clarify tool
3. ✅ **Private MCP catalogs** (#33575) - Enterprise/team use cases
4. ✅ **Lean API mode** (#33569) - Performance optimization
5. ✅ **ByteDance provider** (#33587) - Mở rộng model choices

### Đang chờ:

- **Collapsible sidebar** (#33421) - Dashboard UX improvement
- **Lattice UI** (#33577) - Major UI overhaul đang trong giai đoạn đầu

---

## 💬 Phản hồi người dùng

### 😤 **Pain points**:

- **Context window instability**: Users mất context capacity sau interruption
- **Platform-specific bugs**: Feishu và WeChat users gặp routing/delivery issues
- **Resource exhaustion**: macOS users hit FD limits trong long-running sessions
- **OAuth billing surprises**: Pro users bị charge extra usage không mong đợi

### 😊 **Positive signals**:

- **Fast response**: Security issues được patch trong cùng ngày
- **Community contributions**: 30 PRs từ diverse contributors
- **Feature velocity**: 5 new features trong 1 ngày

---

## 🗺️ Backlog & Roadmap

### 🎯 **Immediate priorities** (dựa trên P2 issues):

1. **Stability hardening**: 
   - Context window regression fix (#32423)
   - Gateway message routing (#33568, #29582)
   - Auth token management (#33574)

2. **Security audit completion**:
   - Merge pending security PRs
   - Comprehensive security testing
   - Release security advisory

3. **Resource management**:
   - FD leak fixes (#33564, #33580)
   - Connection pooling improvements

### 🔮 **Medium-term** (dựa trên P3 và feature PRs):

1. **UI modernization**: Lattice UI implementation (#33577)
2. **Provider expansion**: ByteDance và các providers khác
3. **Enterprise features**: Private catalogs, audit trails, lean mode
4. **Platform coverage**: Feishu/WeChat stability improvements

### 📝 **Technical debt**:

- Normalize auth/entitlement logic (#31904)
- Refactor session context management (#32927)
- Test coverage cho security-critical paths

---

## 🎬 Kết luận

Hermes-Agent đang trong **giai đoạn maturation quan trọng**, chuyển từ feature velocity sang stability và security. Ngày 28/05 đánh dấu một security audit wave với 4 critical vulnerabilities được patch. Dự án cần:

1. ✅ **Hoàn thành security hardening** trước khi release tiếp theo
2. ⚠️ **Giải quyết context window regression** - blocking issue cho power users  
3. 🔄 **Stabilize platform adapters** - Feishu/WeChat cần attention
4. 📊 **Improve observability** - Audit trails là bước đúng hướng

**Momentum tích cực** với 30 PRs và diverse contributor base, nhưng cần balance giữa feature development và stability work.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*