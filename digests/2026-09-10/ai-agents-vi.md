# Bản tin Hệ sinh thái Hermes Agent 2026-09-10

> Issues: 97 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-10 02:00 UTC

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

# 📊 Báo cáo Phân Tích Hệ Sinh Thái Hermes Agent - Ngày 2026-09-10

## 🎯 Tóm tắt hôm nay

Dự án Hermes Agent đang trong giai đoạn ổn định hóa hệ thống với **30 PR mới** và xử lý **50 issue** hoạt động. Trọng tâm chính là sửa lỗi ứng dụng Desktop trên Windows, cải thiện quản lý phiên làm việc (session management), và tăng cường bảo mật. Đáng chú ý là các vấn đề về zombie processes, context compression, và nhiều lỗi cụ thể trên nền tảng Windows đang được ưu tiên xử lý.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua**. Dự án đang tích lũy các bản vá và cải tiến để chuẩn bị cho bản phát hành tiếp theo.

---

## 📈 Tiến độ dự án

### 🔧 Pull Requests Quan Trọng

#### **Sửa lỗi nghiêm trọng (P1-P2)**

- **#107031** - 🔴 **Fix Desktop session claim trên Windows**: Sửa lỗi "Hermes could not safely reserve this session" xảy ra khi có các lease không xác minh được PID liveness trên Windows
- **#107032** - 🔴 **Fix killpg tự sát trên Darwin**: Ngăn terminal tool killpg nhầm process group của chính gateway, tránh gateway tự SIGKILL
- **#106715** - 🔧 **Fix MCP validation**: Cho phép MCP servers được validate đúng trong platform_toolsets thay vì bị reject là "unknown tool"
- **#103362** - 🔒 **Flock single-writer gate**: Ngăn chặn tình trạng nhiều process ghi đồng thời vào state.db gây corruption (7 sự cố trong 4 ngày)

#### **Cải thiện bảo mật**

- **#107030** - 🛡️ **npm audit remediation**: Vá các lỗ hổng bảo mật trong dependencies của root và web workspace
- **#81108** - 🔐 **Guard security-policy keys**: Ngăn agent tự thay đổi security config như `approvals.mode` hoặc `command_allowlist`
- **#80927** - 🔑 **API key security**: Chuyển custom endpoint API keys từ config.yaml sang key_env để tránh leak
- **#66926** - 🔒 **Gemini key redaction**: Bổ sung pattern phát hiện Gemini authorization keys định dạng `AQ.`

#### **Tính năng mới**

- **#107033** - ✨ **PostOnce MCP integration**: Thêm workflow lưu nháp social media posts qua MCP
- **#107025** - 🧠 **Unattended memory consolidation**: Cho phép tự động consolidate MEMORY.md và USER.md ở chế độ background
- **#94266** - 🤖 **Hermes Collective Wisdom Agent V1**: Thêm agent tổng hợp kinh nghiệm cộng đồng (đang review)

#### **Tối ưu hiệu năng**

- **#107034** - ⚡ **Bypass SDK transform**: Bỏ qua pydantic transform trong auxiliary/summary calls để giảm GIL contention với messages/tools lớn
- **#80974** - 🧹 **GC after large tool results**: Trigger gc.collect() sau tool result ≥1MB UTF-8

---

## 🔥 Điểm nổi bật cộng đồng

### Issues với nhiều tương tác nhất

1. **#66616** (187 comments) - ⚠️ **Skills index watchdog**: Index bị stale 29.8h (vượt limit 26h), blocking Skills Hub
   
2. **#78647** (82 comments) - 🏗️ **God-file eradication epic**: Còn ~2K tasks sau #102117, chiến dịch refactor god-files thành clean modules

3. **#88584** (81 comments) - ⛔ **Nous integration blocked**: Automated merge bị conflict trong `cron/jobs.py`

4. **#105145** (17 comments, ✅ CLOSED) - ✔️ **Windows desktop update bug**: `hermes update` luôn báo FAILED (exit 8) dù update thành công - đã fix

5. **#100401** (11 comments) - 💀 **Cron deadlock**: Fire-claim heartbeat tự deadlock với chính nó, kill mọi job chạy >60s

### Vấn đề người dùng quan tâm

- **Desktop trên Windows**: Nhiều lỗi cụ thể trên Windows (#105145, #105629, #102958, #106285, #106359) - nhóm phát triển đang ưu tiên platform này
- **Session management**: Các vấn đề về session lifecycle, liveness tracking, và multi-profile installs (#102792, #103375, #107016)
- **Memory & context**: Context compression failures, stale usage stats (#106459, #94001, #80646)

---

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng đang xử lý (P1)

1. **#100401** - Cron heartbeat deadlock giết jobs >60s
2. **#105145** - Windows desktop update false-positive failures (✅ ĐÃ FIX)
3. **#48860** - OAuth URL sanitizer biến `hermes-agent.nousresearch.com` → `claude-code.nousresearch.com` (NXDOMAIN)
4. **#106459** - Over-limit sessions không thể compress, /compress no-ops, không có recovery path
5. **#80646** - `agent_context` hardcoded "primary", context-skip logic của cron/flush/subagent là dead code
6. **#106935** - Desktop over SSH: idle-exit của isolated backend giết backend khác đang active

### Bugs hệ thống (P2-P3)

- **#97296** - macOS 27 fork crash: kanban dispatcher SIGSEGV trong Network.framework khi fork gateway threaded
- **#102792** - Desktop new session từ project sidebar mất owner metadata → null route
- **#106596** - YouTube embeds fail error 153 trong desktop (Referer fix wired sai partition)
- **#99533** - Firecrawl web_extract flatten site refusal thành empty success
- **#92644** - Scanner false positive: block SOUL.md content mô tả prompt injection defenses

---

## 💡 Yêu cầu tính năng

### Tính năng được yêu cầu nhiều

1. **#11911** (7 comments, 2 👍) - 📱 **Native Mobile App**: iOS & Android với voice calling
2. **#70421** (5 comments, 7 👍) - 📋 **Show all project chats**: Bỏ giới hạn 3-session preview trong Desktop sidebar
3. **#74302** (3 comments, 1 👍) - 📄 **Collapse inline diffs**: Setting để giữ file diffs collapsed mặc định
4. **#106267** (5 comments) - 🎯 **Per-tool YOLO mode**: Fine-grained bypass approval cho từng tool category

### Cải tiến UX

- **#106258** - 🗣️ Natural language slash commands: Resolve "/model grok" → `xai-oauth`
- **#106261** - 🖥️ Session context clarity: Phân biệt rõ "user's browser" là backend browser chứ không phải client
- **#106253** - ⚡ Desktop Fast toggle: Cần giải thích rõ đây là priority lane chứ không phải speed/quality tradeoff
- **#106299** - 💾 Settings page caching: Model list takes too long mỗi lần request

---

## 💬 Phản hồi người dùng

### Trải nghiệm tích cực

- ✅ Issue #105145 (Windows update bug) được fix nhanh chóng và đóng trong ~2 ngày
- ✅ Team responsive với bug reports, nhiều issue có maintainer engagement

### Pain points chính

1. **Windows Desktop stability**: Nhiều lỗi nghiêm trọng về process lifecycle, DPI scaling, update flow
2. **Session reliability**: Users gặp sessions bị mất, context usage sai, không thể reopen
3. **Context management**: Compression failures, stale stats, over-limit sessions stuck
4. **Multi-profile complexity**: Profile switching gây confusion, bot tiles loop reconnect
5. **Platform-specific issues**: macOS fork crashes, Windows path separators, Linux SIGTRAP

### Feedback từ international users

- 🇨🇳 **Chinese users** (#106184): Model provider list chỉ hiện 5/10 providers
- 🇻🇳 **Vietnamese reports**: Desktop window transparent khi di chuyển giữa displays với DPI khác nhau (#106285)
- 🇮🇩 **Indonesian community**: Đang contribute i18n documentation (#92192, #93632)

---

## 🗓️ Backlog & Roadmap

### Công việc ưu tiên cao (từ issue labels)

#### Epic đang ongoing

1. **God-file eradication** (#78647): ~2K tasks còn lại, policy không revert
2. **Wisdom Agent** (#94266): Private package review navigation phase
3. **Skills index watchdog** (#66616): Index freshness degraded, cần fix workflow

#### Blockers cần giải quyết

- ⛔ Automated Nous integration blocked (#88584)
- 🔴 Cron fire-claim deadlock (#100401) - ảnh hưởng tất cả long-running jobs
- 🔴 Session claim issues trên Windows multi-profile installs

#### Architectural improvements planned

- **Context provider isolation** (#80646): Fix hardcoded agent_context
- **Memory system** (#107025): Unattended consolidation framework
- **Security hardening**: Config guard, key management, redaction coverage
- **Platform stability**: Windows process lifecycle, macOS fork safety

### Needs-decision items

- #78647 - Chiến lược hoàn thiện god-file refactor
- #94266 - Wisdom Agent architecture decisions
- #106267 - Per-tool YOLO scope design
- #106292 - Kanban CLI completion bypass hooks policy
- #98995 - Codex app-server turn continuity model

---

## 📊 Thống kê tổng quan

- **📝 Issues mở**: 97 (hiển thị top 50)
- **🔧 Pull Requests**: 500 total (30 PRs mới trong 24h)
- **🏷️ Priority breakdown**:
  - P1 (Critical): ~8 issues
  - P2 (High): ~15 issues  
  - P3 (Medium): ~30 issues
  - P4 (Low): ~5 issues
- **🖥️ Platform focus**: Windows compatibility issues đang được ưu tiên
- **🔒 Security**: Active với 7 security-related PRs/issues
- **🌍 Internationalization**: Indonesian i18n PRs đang được merge

---

## 🎓 Kết luận

Hermes Agent đang trong **giai đoạn consolidation** với focus mạnh vào:
1. ✅ **Stability first**: Fix critical bugs trước khi thêm features mới
2. 🪟 **Windows platform parity**: Addressing nhiều Windows-specific issues
3. 🔐 **Security hardening**: API key management, config protection, redaction coverage
4. 🧠 **Memory & context refinement**: Compression reliability, state management
5. 🌏 **Global expansion**: i18n documentation, multi-region user support

Team đang **response tốt** với community feedback và maintain **high code review standards**. Technical debt (god-files) đang được giải quyết có kế hoạch.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 10/09/2026

## 1. 🌍 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trải qua giai đoạn **consolidation và chuyên biệt hóa**. Sau làn sóng đổi mới ban đầu, các dự án đang tập trung vào **ổn định hóa, bảo mật, và trải nghiệm người dùng** hơn là thêm tính năng mới. Đáng chú ý là sự xuất hiện của các **vấn đề kiến trúc lớn** (god-file refactoring, plugin systems, memory management) và **nhu cầu về cross-platform compatibility**.

### Phân khúc thị trường rõ nét:

- **Enterprise/Production-grade**: Hermes Agent, OpenClaw (focus stability, security)
- **Developer tools**: Zeroclaw (technical depth, RFC-driven)
- **Specialized/Niche**: NanoBot (WebUI-focused), PicoClaw (embedded/edge)
- **Emerging players**: NanoClaw, IronClaw (smaller scale, specific use cases)
- **Research/Experimental**: QwenPaw (tích cực thử nghiệm features mới)

---

## 2. 📊 Bảng so sánh hoạt động chính

| Dự án | Issues | PRs | Releases | Mức độ hoạt động | PR Velocity | Community Engagement |
|-------|--------|-----|----------|------------------|-------------|---------------------|
| **Hermes Agent** | 97 | 500 | 0 | 🔥🔥🔥🔥🔥 Rất cao | 30 PRs/ngày | ⭐⭐⭐⭐ Cao (187 comments/issue) |
| **OpenClaw** | 106 | 500 | 0 | 🔥🔥🔥🔥 Cao | ~6 PRs active | ⭐⭐⭐ Trung bình |
| **NanoBot** | 4 | 21 | 0 | 🔥🔥🔥 Trung bình | 6 merged/ngày | ⭐⭐ Thấp (<2 reactions) |
| **Zeroclaw** | 13 | 50 | 0 | 🔥🔥🔥 Trung bình | 3 PRs mới/ngày | ⭐⭐⭐⭐ Cao (36 comments/RFC) |
| **PicoClaw** | 3 | 5 | 0 | 🔥🔥 Thấp | Cleanup phase | ⭐ Rất thấp (stale bot) |
| **NanoClaw** | 1 | 7 | 0 | 🔥🔥 Thấp | 7 PRs/ngày (burst) | ⭐ Rất thấp (0 reactions) |
| **NullClaw** | 0 | 0 | 0 | ❄️ Không hoạt động | - | - |
| **IronClaw** | 1 | 4 | 0 | 🔥 Rất thấp | - | ⭐ Rất thấp (0 interactions) |
| **QwenPaw** | 21 | 36 | 0 | 🔥🔥🔥🔥 Cao | 5 PRs mới + 9 closed | ⭐⭐⭐ Trung bình (8 comments max) |

### Chỉ số khác biệt:

| Dự án | Bug Severity | Security Focus | Multi-platform | Mobile Support | RFC Process |
|-------|--------------|----------------|----------------|----------------|-------------|
| Hermes Agent | P0-P1 nhiều | 🔒🔒🔒 Cao | ✅ Win/Mac/Linux | ❌ | ❌ |
| OpenClaw | P0 critical | 🔒🔒 Trung bình | ✅ Win/Mac/Linux | 📱 iPad concepts | ❌ |
| NanoBot | P1 | 🔒🔒 Trung bình (sandbox) | ✅ | ❌ | ❌ |
| Zeroclaw | S2 | 🔒🔒🔒 Cao (audit chain) | ✅ | ❌ | ✅ RFC-driven |
| QwenPaw | Mixed | 🔒🔒 Trung bình | ✅ | 📱 Draft React Native | ❌ |

---

## 3. 🎯 Vị thế của Hermes Agent trong hệ sinh thái

### **A. Điểm mạnh (Leadership positions)**

#### 1️⃣ **Scale & Velocity vượt trội**
- **30 PRs/ngày** - cao gấp 5-10 lần các đối thủ
- **500 total PRs** - backlog lớn nhất trong danh sách
- **97 issues** với 50 active - cho thấy user base rộng

#### 2️⃣ **Community engagement mạnh nhất**
- **187 comments** trên một issue (#66616) - cao nhất ecosystem
- **82 comments** trên god-file eradication epic
- Maintainer team responsive và active

#### 3️⃣ **Production maturity**
- Focus mạnh vào **Windows compatibility** (nhiều issues/PRs nhất)
- **Security hardening** systematic (API keys, config guards, redaction)
- **Multi-profile support** - enterprise feature

#### 4️⃣ **Technical ambition**
- **God-file refactoring epic** (~2K tasks) - largest tech debt initiative
- **Wisdom Agent** - unique collective intelligence feature
- **Memory consolidation** - advanced context management

### **B. Thách thức**

#### 1️⃣ **Stability concerns**
- **8 P1 critical bugs** - nhiều hơn các dự án khác
- **Process leaks, zombie processes** - vấn đề hệ thống nền
- **Session management complexity** - multi-profile edge cases

#### 2️⃣ **Platform fragmentation**
- **Windows issues overrepresented** - compatibility burden cao
- **macOS fork crashes** - platform-specific complexity
- **Cross-platform testing** chưa đủ comprehensive

#### 3️⃣ **Architecture debt**
- **God-files** vẫn tồn tại dù có kế hoạch cleanup
- **Context compression failures** - scaling bottleneck
- **Cron deadlock** (#100401) - critical infrastructure issue

### **C. Vị trí chiến lược**

```
┌─────────────────────────────────────────┐
│     ENTERPRISE/PRODUCTION LEADER        │
│         (Hermes Agent)                  │
│  • Largest community                    │
│  • Highest velocity                     │
│  • Most ambitious features              │
└─────────────────────────────────────────┘
                  ▲
                  │
    ┌─────────────┴──────────────┐
    │                             │
┌───┴────┐                   ┌───┴────┐
│OpenClaw│                   │Zeroclaw│
│Quality │                   │ RFC-   │
│ Focus  │                   │ driven │
└────────┘                   └────────┘
    │                             │
    └─────────────┬──────────────┘
                  ▼
        ┌──────────────────┐
        │  Specialized     │
        │ (Nano/Pico/Qwen) │
        └──────────────────┘
```

**Hermes Agent đang dẫn đầu về quy mô và tốc độ**, nhưng **OpenClaw và Zeroclaw** đang cạnh tranh bằng **chất lượng và kiến trúc tốt hơn**.

---

## 4. 🛠️ Hướng kỹ thuật chung

### **A. Xu hướng chung toàn ecosystem**

#### 1️⃣ **MCP (Model Context Protocol) adoption** 🔌
- **Hermes**: MCP validation issues (#106715)
- **NanoBot**: MCP timeout config (#3997), TLS support (#4175)
- **IronClaw**: Hosted-MCP isolation (#8090), caller attribution (#8084)
- **NanoClaw**: MCP child process lifecycle (#142965)

💡 **Insight**: MCP đang trở thành **standard de facto** cho tool integration, nhưng mỗi dự án đang giải quyết các vấn đề khác nhau:
- **Security/isolation** (IronClaw)
- **Reliability/timeout** (NanoBot)
- **Validation** (Hermes)

#### 2️⃣ **Context & Memory Management** 🧠
- **Hermes**: Context compression failures, stale stats (#106459, #80646)
- **OpenClaw**: SQLite unbounded growth (#114612)
- **QwenPaw**: Long-term memory proposals (MemCode #7656, Honcho #2183)
- **Zeroclaw**: Memory category-scoped grants (#10252)

💡 **Insight**: Đây là **bottleneck lớn nhất** của ecosystem - chưa có giải pháp standard, mỗi dự án tự implement.

#### 3️⃣ **Sandbox & Security** 🔒
- **Hermes**: Security policy guards (#81108, #80927)
- **NanoBot**: Restricted shell bypass (#5536), macOS Seatbelt (#5628)
- **Zeroclaw**: Canonical sandbox policy schema (#7821)
- **QwenPaw**: Backup permissions leak (#7658)

💡 **Insight**: Security đang được **tăng cường systematic**, nhưng mỗi dự án có approach khác nhau (OS-level vs app-level).

#### 4️⃣ **Multi-channel/platform support** 📱
- **Hermes**: Desktop trên Windows focus
- **OpenClaw**: Telegram, Feishu, multiple channels
- **NanoBot**: Telegram commands (#5711), Console UI
- **PicoClaw**: IRC, QQ, WhatsApp
- **QwenPaw**: Mobile app draft (#7378)

💡 **Insight**: **Fragmentation** - không có consensus về priority platforms, mỗi dự án phục vụ audience khác nhau.

### **B. Divergence points (khác biệt chiến lược)**

| Vấn đề | Hermes Agent | OpenClaw | Zeroclaw | QwenPaw |
|--------|--------------|----------|----------|---------|
| **Architecture** | Monolith → modules | Plugin refactor (#140674) | WASM plugins (#10076) | Modular từ đầu |
| **Decision making** | Maintainer-driven | Product + maintainer | RFC consensus | Fast iteration |
| **Quality vs Speed** | Speed (30 PRs/day) | Balance | Quality (RFC review) | Experimentation |
| **Target users** | Enterprise Windows | Production multi-platform | Technical developers | Researchers |

---

## 5. 🎨 Điểm khác biệt

### **A. Chiến lược phát triển**

#### **Hermes Agent** - "Move Fast, Fix Later"
- ✅ **Strengths**: Rapid feature delivery, quick bug response
- ⚠️ **Tradeoffs**: Technical debt accumulation (god-files), stability issues
- 🎯 **Philosophy**: Ship first, stabilize later

#### **OpenClaw** - "Consolidation & Polish"
- ✅ **Strengths**: Systematic resource management, cross-platform focus
- ⚠️ **Tradeoffs**: Slower velocity, upgrade pain
- 🎯 **Philosophy**: Get it right before scaling

#### **Zeroclaw** - "Architecture First"
- ✅ **Strengths**: RFC-driven design, thoughtful decisions
- ⚠️ **Tradeoffs**: Decision bottlenecks (RFC process friction)
- 🎯 **Philosophy**: Design once, implement correctly

#### **QwenPaw** - "Experimentation Platform"
- ✅ **Strengths**: Trying new ideas (Advisor Mode, mobile), external integrations
- ⚠️ **Tradeoffs**: Feature sprawl, regression bugs
- 🎯 **Philosophy**: Explore possibilities, iterate quickly

### **B. Tính năng độc đáo**

| Dự án | Killer Feature | Uniqueness Score |
|-------|---------------|-----------------|
| **Hermes** | Wisdom Agent (collective intelligence) | ⭐⭐⭐⭐⭐ |
| **OpenClaw** | Plugin discovery unification | ⭐⭐⭐ |
| **Zeroclaw** | WASM plugin architecture | ⭐⭐⭐⭐ |
| **QwenPaw** | Advisor Mode (2-model pairing) | ⭐⭐⭐⭐ |
| **NanoBot** | WebUI TUI integration | ⭐⭐ |
| **PicoClaw** | Edge computing vision | ⭐⭐⭐ (nếu execute) |

### **C. Cộng đồng & Ecosystem**

#### **Hermes Agent** - Largest, most active
- **User base**: Enterprise-heavy (Windows issues)
- **Contributors**: High volume (30 PRs/day implies large team)
- **International**: Vietnamese, Chinese users visible
- **Pain**: Complex upgrade paths, Windows-specific bugs

#### **OpenClaw** - Quality-conscious professionals
- **User base**: Production deployments (long-running instances)
- **Contributors**: Balanced maintainer/community
- **Focus**: Reliability over features
- **Pain**: Upgrade friction, Windows stability

#### **Zeroclaw** - Technical enthusiasts
- **User base**: Developers comfortable with RFCs
- **Contributors**: High-quality discussions (36 comments/RFC)
- **Focus**: Architecture correctness
- **Pain**: RFC process too slow

#### **QwenPaw** - Researchers & experimenters
- **User base**: Academic/research oriented (AgentScope.ai)
- **Contributors**: First-time contributors welcome (3 in week)
- **Focus**: Innovation over stability
- **Pain**: Regression bugs, mobile UX gaps

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### **Maturity Matrix**

```
High Maturity │     Hermes
              │       ●
              │   OpenClaw
              │       ●
              │           Zeroclaw
              │              ●
              │                  QwenPaw
              │                     ●
              │
Low Maturity  │  Nano/Pico/IronClaw
              │     ●
              └─────────────────────────────
                Low          High
                  Community Size
```

### **Chi tiết phân tích**

#### **Hermes Agent** - ⭐⭐⭐⭐⭐ Mature
- ✅ Established processes (P0-P4 priority system)
- ✅ Active internationalization (CJK users)
- ✅ Epic-scale technical debt management
- ✅ Security-conscious culture
- ⚠️ Needs better RFC/decision process (như Zeroclaw)

#### **OpenClaw** - ⭐⭐⭐⭐ Maturing
- ✅ Production-grade quality focus
- ✅ Systematic refactoring (51-PR epic #140674)
- ✅ Good bug triage (P0/P1 labels)
- ⚠️ Community engagement chưa cao (ít comments/reactions)
- ⚠️ Documentation gaps (user complaints)

#### **Zeroclaw** - ⭐⭐⭐⭐ Maturing (architectural maturity cao)
- ✅ RFC process (structured decision making)
- ✅ High-quality technical discussions
- ✅ Security audit chain
- ⚠️ RFC friction causing bottlenecks
- ⚠️ Smaller contributor base

#### **QwenPaw** - ⭐⭐⭐ Growing
- ✅ Welcoming to first-time contributors
- ✅ High experimentation velocity
- ✅ External partnership interests (MemCode, ntfy)
- ⚠️ Critical bugs open too long (#7237: 2 weeks)
- ⚠️ Regression issues (workflow UX)

#### **NanoBot** - ⭐⭐ Early
- ⚠️ Low community interaction
- ⚠️ Fast merges but little discussion
- ✅ Clean PR velocity (6 merged/day)
- ❌ No clear roadmap

#### **PicoClaw, NanoClaw, IronClaw** - ⭐ Very Early
- ❌ Minimal community engagement (0 reactions)
- ❌ Stale bot closing issues prematurely
- ❌ No public roadmap or communication
- ⚠️ Possible internal/private development

---

## 7. 🔮 Tín hiệu xu hướng

### **A. Xu hướng ngắn hạn (Q4 2026)**

#### 1️⃣ **Consolidation wave tiếp tục**
- **Hermes**: God-file cleanup completion
- **OpenClaw**: Resource management epic finish
- **Zeroclaw**: RFC backlog resolution
- **Signal**: Ít dự án nào thêm features lớn mới, focus vào stability

#### 2️⃣ **Windows platform parity**
- **Hermes**: Heavy Windows bug fixing
- **OpenClaw**: Windows-specific PRs
- **Zeroclaw**: Stack overflow trên Windows (#10734)
- **Prediction**: Q4 sẽ thấy Windows support ngang bằng macOS/Linux

#### 3️⃣ **MCP ecosystem maturation**
- Mọi dự án đang fix MCP issues đồng thời
- **Prediction**: MCP 2.0 spec hoặc breaking changes sắp đến

### **B. Xu hướng trung hạn (2027)**

#### 1️⃣ **Mobile-first experience**
- **QwenPaw**: React Native draft
- **OpenClaw**: iPad concepts
- **Signal**: Desktop-first era kết thúc, mobile demand tăng
- **Prediction**: H1 2027 sẽ thấy mobile apps production-ready

#### 2️⃣ **Memory architecture convergence**
- **QwenPaw**: 2 competing proposals (MemCode, Honcho)
- **Hermes**: Unattended consolidation
- **Zeroclaw**: Category-scoped grants
- **Prediction**: Một standard memory protocol sẽ emerge (như MCP cho tools)

#### 3️⃣ **Plugin ecosystems explode**
- **Zeroclaw**: WASM architecture (#10076)
- **OpenClaw**: Plugin discovery unification
- **Hermes**: Skills versioning
- **Prediction**: App stores/marketplaces cho AI agent plugins

#### 4️⃣ **Edge/embedded agents**
- **PicoClaw**: Edge computing vision (#3345)
- **Signal**: IoT và edge AI là next frontier
- **Prediction**: 2027 sẽ thấy lightweight agent runtimes cho RISC-V/ARM

### **C. Rủi ro tiềm ẩn** ⚠️

#### 1️⃣ **Fragmentation risk**
- Không có standards cho memory, context, sessions
- Mỗi dự án tự implement → không interoperable
- **Impact**: Users bị lock-in vào một ecosystem

#### 2️⃣ **Security incidents chờ xảy ra**
- Nhiều dự án có security issues open (#5536, #7821, #81108)
- Sandbox bypasses chưa được fix
- **Impact**: Một breach lớn có thể làm chậm toàn bộ adoption

#### 3️⃣ **Maintainer burnout**
- **Hermes**: 30 PRs/day không sustainable
- **Zeroclaw**: RFC bottlenecks
- **OpenClaw**: Upgrade pain causing user frustration
- **Impact**: Slowdown hoặc abandonment của một số dự án

#### 4️⃣ **Context window limitations**
- Mọi dự án đang struggle với context management
- LLM providers chưa có breakthroughs về infinite context
- **Impact**: Fundamental limit to agent capabilities

### **D. Opportunities** 🚀

#### 1️⃣ **Standardization initiative**
- Cơ hội cho một consortium tạo standards:
  - Memory protocol
  - Session management
  - Security policies
- **Hermes có thể lead** nếu leverage community size

#### 2️⃣ **Enterprise consolidation**
- Nhiều dự án nhỏ → Một vài winners emerge
- **OpenClaw & Hermes** positioned best cho enterprise
- M&A activity có thể xảy ra

#### 3️⃣ **Vertical specialization**
- Healthcare agents (HIPAA-compliant)
- Financial agents (SOC2)
- Legal agents (privilege handling)
- **Opportunity**: Specialized forks của Hermes/OpenClaw

---

## 8. 🎯 Khuyến nghị chiến lược cho Hermes Agent

### **Leveraging strengths** ✅

1. **Capitalize on community size**
   - Launch standards initiative (Memory Protocol Standard)
   - Host inter-project working groups
   - Position as ecosystem leader

2. **Windows advantage**
   - Double down on Windows polish
   - Enterprise Windows features (AD integration, Group Policy)
   - Market as "only production-ready agent for Windows"

3. **Wisdom Agent differentiation**
   - This is unique - market heavily
   - Build case studies, success stories
   - Open-source core, monetize enterprise features

### **Addressing weaknesses** ⚠️

1. **Stability crisis mitigation**
   - **Immediately**: Fix P0/P1 bugs (#100401 cron deadlock)
   - Freeze new features until critical bugs < 5
   - Public stability dashboard

2. **Architecture modernization**
   - Complete god-file epic by EOY
   - Adopt RFC process (learn from Zeroclaw)
   - Public technical roadmap

3. **Quality gates**
   - Slow down PR velocity (30/day → 20/day)
   - Mandatory regression testing
   - Break glass process for P0 only

### **Strategic positioning** 🎯

```
        Current State              Desired State (H1 2027)
              ●                            ●
        Fast & Large              Fast, Large & Stable
              │                            │
              │                            │
              ▼                            ▼
     "Move Fast, Fix Later"    "Enterprise Standard"
```

**Target**: Trở thành "**Linux của AI agents**" - standard, stable, extensible, community-driven.

---

## 9. 📊 Kết luận Executive Summary

### **Key Findings**

1. **Hermes Agent is the ecosystem leader** bằng quy mô và velocity, nhưng đang đánh đổi stability
2. **MCP đang trở thành standard**, nhưng fragmented implementations
3. **Memory/context management** là bottleneck lớn nhất, chưa có solution tốt
4. **Windows support** là competitive moat của Hermes
5. **Mobile-first shift** đang đến (2027)

### **Strategic Imperative for Hermes**

🎯 **Mission**: Transform từ "fast mover" → "industry standard"

**Priorities**:
1. ✅ Fix stability crisis (6 tháng)
2. ✅ Lead standards initiative (12 tháng)
3. ✅ Windows enterprise features (12 tháng)
4. ✅ Mobile strategy (18 tháng)

**Risk**: Nếu không cải thiện stability, **OpenClaw hoặc Zeroclaw** sẽ overtake trong enterprise segment.

**Opportunity**: Với community size hiện tại, Hermes có **18-24 tháng window** để consolidate leadership position trước khi competition catch up.

---

*Báo cáo được tạo dựa trên dữ liệu ngày 10/09/2026. Một số dự án có thể có hoạt động không được công khai hoặc đang trong development mode riêng tư.*

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo phân tích OpenClaw - 2026-09-10

## 📊 Tóm tắt hôm nay

Dự án OpenClaw đang trong giai đoạn tích cực xử lý các vấn đề chất lượng và ổn định sau bản phát hành 2026.9.3. Hoạt động chính tập trung vào việc sửa lỗi nghiêm trọng liên quan đến quản lý tài nguyên (process leaks, memory growth), cải thiện trải nghiệm người dùng trên Control UI, và xử lý các regression bugs từ các bản cập nhật gần đây. Có 6 issues mới được mở trong ngày, trong đó 3 issues có mức độ nghiêm trọng P0/P1.

## 🚀 Releases

Không có release mới trong 24 giờ qua. Phiên bản hiện tại là **2026.9.3 (1391f7c)** được phát hành trước đó.

## 🔧 Tiến độ dự án

### Pull Requests nổi bật:

**🔴 Critical Infrastructure:**
- **#143429** - Fix Doctor migration auth profiles: Sửa lỗi nghiêm trọng trong quá trình migration làm mất đồng bộ giữa auth profiles và credentials
- **#142957** - HTTPS connections cho paired operators: Thêm khả năng kết nối HTTPS bảo mật cho operators
- **#140674** - Refactor resource management: Cải thiện cách quản lý scoped resources trong plugins (đã chia thành 51 PRs nhỏ hơn)

**🎨 UI/UX Improvements:**
- **#142782** - Plugin discovery unification: Hợp nhất giao diện khám phá và cài đặt plugin
- **#137886** - ClawHub plugin installation từ Control UI: Cho phép cài đặt plugin trực tiếp từ giao diện web
- **#143489** - Chat icons và session reference chips alignment

**🐛 Bug Fixes:**
- **#143583** - Surface Telegram message cancellation reasons
- **#143538** - Report correct runtime version thay vì source version
- **#143519** - Ngừng discard launchd stderr trên macOS

### Xu hướng phát triển:

1. **Focus vào stability**: Nhiều PR xử lý resource leaks, process management, và memory issues
2. **Better UX**: Cải thiện plugin management, keyboard navigation, và error messaging
3. **Cross-platform fixes**: Đặc biệt chú trọng Windows và macOS compatibility
4. **Security hardening**: Auth profile management, HTTPS support

## 🔥 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác nhất:

**#97616** (16 comments, 1 👍) - **Zombie process accumulation**
- Vấn đề nghiêm trọng: OpenClaw leak unreaped child processes từ hook/tool execution
- Gây runtime degradation theo thời gian
- Được đánh giá P1, impact: message-loss, crash-loop

**#139714** (13 comments) - **"Update in progress" forever**
- Post-core update resume child tạo update_runs row không thể finalize
- `openclaw status` báo update đang chạy vô thời hạn
- Cần maintainer review và product decision

**#114612** (12 comments) - **SQLite unbounded growth**
- `memory_index_chunks` và `memory_embedding_cache` không có retention policy
- Sẽ fill disk theo thời gian
- Ảnh hưởng production instances chạy lâu dài

### Vấn đề người dùng quan tâm:

1. **Resource management**: Process leaks, memory growth là mối quan tâm hàng đầu
2. **Upgrade pain**: Nhiều issues liên quan migration và compatibility problems
3. **Plugin ecosystem**: Người dùng muốn dễ dàng discover và install plugins hơn
4. **Voice/Meet features**: Các issues về Google Meet, voice agent consult

## 🐛 Ổn định & Bugs

### Critical issues (P0):

**#143584** - **Plugin-state deadlock** (MỚI hôm nay)
- Memory-core wedged fleet-wide trong 24 ngày
- Plugin-wide cap nhưng namespace-scoped eviction → deadlock
- Không thể self-heal khi store đầy

**#142737** - **Gateway hangs với cron**
- Gateway không responsive khi cron reservations không tiến triển
- Accumulate unfinished cron scheduler invocations
- Ảnh hưởng Windows + Node 24.18.0

**#142559** - **Windows Gateway không bind port**
- Gateway logs "listening" nhưng ECONNREFUSED
- Blocking users trên Windows 11

### High priority issues (P1):

**#143580** - **Heartbeat confusion** (MỚI hôm nay)
- Post-tool continuation sent without transcript
- Confused reply delivered to channel (Signal)
- Version 2026.9.3

**#143569** - **Slack thread blocking** (MỚI hôm nay)
- Một thread không adopt được block cả channel
- 130 events delayed 33 minutes
- Per-channel ingress lane bottleneck

**#143461** - **Message cancellation error** (MỚI hôm nay)
- Hook cancellation surfaces as generic UNAVAILABLE
- cancelReason bị discard
- Agents retry deliberate suppression

### Regression issues:

- **#142585** - Doctor refuses valid legacy workspace (2026.9.3)
- **#140971** - Feishu plugin tools dropped (2026.8.1)
- **#143523** - `--task-supervisor < NUL` regression (2026.9.3)

## 💡 Yêu cầu tính năng

**#138614** - **iOS hardware keyboard support** (3 comments)
- Return/Cmd+Return để send message
- Use case: iPad Mini với Bluetooth keyboard

**#142949** - **Independent iPad conversation windows** (2 comments)
- Mỗi window giữ riêng Gateway, agent, session, draft
- Durable restoration design cần review riêng

**#137720** - **Telegram progress message improvements** (2 comments)
- Retain checklist, commentary, tools trong một message
- Prevent tool activity evicting commentary

**#143413** - **WebMCP tools qua Chrome DevTools** (2 comments)
- Expose WebMCP tools through existing browser driver
- Chrome DevTools MCP có experimental WebMCP support

**#113582** - **Workboard completion gates** (3 comments)
- Fail-closed gates với execution evidence
- Prevent premature completion without proof

## 💬 Phản hồi người dùng

### Positive signals:

- Plugin discovery unification (#142782) được đánh giá là improvement quan trọng
- UI improvements (chat icons, keyboard navigation) được community ủng hộ
- Resource management refactor (#140674) cho thấy commitment về code quality

### Pain points:

1. **Upgrade complexity**: Nhiều users gặp vấn đề khi upgrade từ 2026.7.x → 2026.8.x → 2026.9.3
2. **Windows support**: Liên tục có issues về Windows compatibility
3. **Memory/resource leaks**: Users chạy long-running instances gặp degradation
4. **Documentation gaps**: 
   - Battery level format không documented (#141066)
   - Model binding fields confusing (#142854)
5. **CLI backend issues**: Duplicate renders, stuck sessions

### Quality concerns:

- Issue #143396 reports healthy turns bị abort bởi stuck-session recovery
- Multiple reports về internal output leaking to user chats (#143278)
- Context engine resources cleanup issues (#143491)

## 📋 Backlog & Roadmap

### Immediate priorities (dựa trên P0/P1 issues):

1. **Resource management crisis**:
   - Fix process leaks (#97616, #142965)
   - Fix plugin-state deadlock (#143584)
   - SQLite unbounded growth (#114612)

2. **Upgrade/migration stability**:
   - Doctor migration auth alignment (#143429)
   - Windows gateway port binding (#142559)
   - Legacy workspace validation (#142585)

3. **Message delivery reliability**:
   - Slack thread blocking (#143569)
   - Telegram message cancellation (#143461)
   - Codex session recovery (#126923)

### Medium-term improvements:

1. **Plugin ecosystem maturity**:
   - Complete ClawHub integration (#137886)
   - Plugin setup state clarity (#142624)
   - MCP child process lifecycle (#142965)

2. **Cross-platform polish**:
   - Windows command quoting (#143089)
   - macOS launchd stderr (#143519)
   - Linux memory pressure handling (#142764)

3. **Developer experience**:
   - Better error messages
   - Improved documentation
   - Testing infrastructure

### Strategic initiatives (based on PRs):

- **Security**: HTTPS paired connections, auth profile management
- **Performance**: Context engine optimization, memory management
- **Accessibility**: Keyboard navigation, WCAG compliance
- **Internationalization**: CJK policy support (#142848)

---

**Kết luận**: OpenClaw đang trong giai đoạn consolidation sau các releases lớn. Team đang tích cực xử lý technical debt, đặc biệt về resource management và cross-platform compatibility. Cộng đồng active với feedback quality cao, nhưng có signs của upgrade pain và stability concerns cần được ưu tiên xử lý.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích NanoBot - 10/09/2026

## 🎯 Tóm tắt hôm nay

Hôm nay NanoBot tập trung mạnh vào cải thiện WebUI với 9 PR liên quan đến giao diện người dùng, bao gồm tổ chức lại settings, tối ưu hiệu suất render, và sửa nhiều lỗi hiển thị. Các vấn đề về tích hợp provider (OpenCode, OpenRouter) và bảo mật sandbox cũng nhận được sự chú ý. Đặc biệt có 2 đề xuất về tính năng memory dài hạn từ các nhà cung cấp khác nhau, cho thấy nhu cầu mạnh mẽ về khả năng ghi nhớ cross-session.

## 📦 Releases

Không có release mới trong 24 giờ qua.

## 🚀 Tiến độ dự án

### WebUI - Làn sóng cải tiến lớn
**9/21 PR liên quan đến WebUI**, cho thấy đây là trọng tâm phát triển:

#### Tính năng mới
- **#5704** 🎛️ Settings mở rộng với autosave - Tái cấu trúc toàn bộ cách quản lý cấu hình
- **#5710** 📁 Tổ chức projects và đơn giản hóa sidebar - Tách biệt project directory và topic history
- **#5705** 📊 TUI /usage charts - Hiển thị context và token usage trực quan

#### Tối ưu hiệu suất
- **#5703** ⚡ Giảm công việc lặp lại trong rendering - Index prompt elements một lần, giới hạn history rendering

#### Sửa lỗi UI
- **#5717** ✅ (Merged) Giữ project khi tạo topic từ menu
- **#5714** ✅ (Merged) Giữ edit diffs ngoài reasoning folds 
- **#5716** ✅ (Merged) Refresh skill suggestions khi mở picker
- **#5713** ✅ (Merged) Ngăn italic labels bị clip
- **#5712** ✅ (Merged) Bảo toàn so sánh < trong streaming math
- **#5715** 🔄 Honor persisted session marker cho titles

### Providers & Integration
- **#5662** ✅ (Merged) OpenCode session header - **Critical**: Tránh lỗi và mất prompt-cache sau 06/09
- **#5718** 🖼️ OpenRouter native image generation API - Mở rộng khả năng tạo ảnh
- **#5437** 🔍 Serply (Google Search API) provider - Thêm lựa chọn web search mới

### Bảo mật & Sandbox
- **#5536** 🔒 **Priority P1**: Fail closed khi restricted shell thiếu sandbox - Fix lỗ hổng bảo mật nghiêm trọng
- **#5628** ✅ (Merged) macOS Seatbelt sandbox backend - Tăng cường sandbox cho macOS

### Channels & Commands
- **#5720** 📢 Compaction notices tuân theo send_progress
- **#5711** 🤖 Đổi tên slash commands sang underscore cho Telegram

### Memory & Core
- **#4819** 🔐 Fix consolidation locks với WeakValueDictionary - Ngăn race condition
- **#4820** 🛡️ Reject non-string web fetch URLs

## ⭐ Điểm nổi bật cộng đồng

### Tương tác cao
- **#5661** 👍 1 reaction - OpenCode session header (đã close)
- Phần lớn issues và PRs mới chưa có nhiều tương tác (< 24h)

### Vấn đề người dùng quan tâm
1. **Memory dài hạn** - Có đến 2 proposals khác nhau (#5721 MemCode, #2183 Honcho)
2. **WebUI UX** - Nhiều improvements cho thấy feedback liên tục từ người dùng
3. **Provider compatibility** - OpenCode và OpenRouter updates phản ánh nhu cầu tích hợp mới nhất

## 🐛 Ổn định & Bugs

### Đã sửa (Merged hôm nay)
✅ **5 bugs WebUI** - Tất cả được merge nhanh chóng trong ngày
✅ **OpenCode session header** - Critical fix cho provider

### Đang xử lý
- **#5647** 🔴 Session title không generate khi frontend envelope thiếu webui flag
- **#5719** → **#5720** Discord compaction notices bỏ qua sendProgress config
- **#5536** 🔴 **P1 Security**: Restricted shell bypass - Conflict cần resolve
- **#4819** Lock management race condition - Conflict cần resolve

### Mức độ nghiêm trọng
- 2 vấn đề **Priority P1** (security + provider compatibility)
- 3 conflicts cần giải quyết trước khi merge

## 💡 Yêu cầu tính năng

### Đề xuất mới
1. **#5721 MemCode integration** 
   - Durable memory cross-session
   - Hosted hoặc self-managed backend
   - Tác giả là CEO của MemCode - partnership proposal

2. **#5718 OpenRouter image generation**
   - Native Images API support
   - Mở rộng providers và models cho generate_image tool

3. **#5437 Serply web search**
   - Alternative cho Serper
   - Google SERP API integration

### Đề xuất dài hạn
- **#2183 Honcho long-term memory** (từ tháng 3) - Vẫn open, có conflicts

## 🗣️ Phản hồi người dùng

### Tích cực
- Số lượng PR merge nhanh (6 PRs merged trong ngày) cho thấy team responsive
- WebUI improvements liên tục phản ánh listening to feedback

### Thách thức
- **Memory cross-session**: 2 vendors khác nhau đề xuất giải pháp → Team cần quyết định hướng đi
- **Telegram compatibility**: Commands với hyphen không work → Shows real-world usage issues
- **Security concerns**: Sandbox bypass vẫn là vấn đề mở

### Pattern nhận diện
- Users quan tâm đến **persistent state** (memory, sessions)
- **UX polish** được ưu tiên cao (nhiều small fixes)
- **Provider ecosystem** đang mở rộng nhanh

## 📋 Backlog & Roadmap

### Ưu tiên ngắn hạn
1. ✅ Resolve 3 conflicts hiện tại (#5536, #5710, #5498)
2. 🔴 Merge security fix #5536 (P1)
3. 📱 Complete WebUI reorganization (#5710, #5704)

### Xu hướng phát triển
- **WebUI maturity**: Từ functional → polished UX
- **Provider diversity**: Thêm nhiều AI services và search providers
- **Security hardening**: Sandbox improvements cho production use
- **Memory architecture**: Preparing for long-term memory features

### Gaps cần giải quyết
- Memory strategy chưa rõ ràng (2 competing proposals)
- Testing coverage cho WebUI changes
- Documentation cho provider integrations mới

---

**Tổng kết**: NanoBot đang trong giai đoạn maturity với focus mạnh vào UX polish và ecosystem expansion. Tốc độ merge PR cao (6/21 trong ngày) và responsive với issues mới. Security và memory architecture là 2 areas cần strategic decisions.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Phân tích Hệ Sinh thái Zeroclaw - 10/09/2026

## 📋 Tóm tắt hôm nay

Ngày 10/09/2026, dự án Zeroclaw tiếp tục tập trung vào **cải thiện độ ổn định** và **kiến trúc hệ thống**. Không có releases mới, nhưng có **3 issues mới được tạo** và nhiều PR quan trọng được cập nhật. Các chủ đề nóng bao gồm: khắc phục lỗi streaming fallback, tối ưu stack overflow trên Windows, và hoàn thiện RFC về kiến trúc plugin WASM.

---

## 🚀 Releases

**Không có release nào trong 24 giờ qua.**

---

## 📊 Tiến độ dự án

### 🔥 Các PR nổi bật đang hoạt động

#### 1. **Streaming & Gateway** 
- **#10450** - Stream webhook chat qua Server-Sent Events (SSE)
  - Thêm khả năng streaming opt-in cho endpoint `/webhook`
  - Giữ tương thích ngược với JSON response
  - Status: Cần review từ maintainer
  - Risk: HIGH, Size: XL

#### 2. **Security & Sandbox**
- **#7821** - Canonical sandbox policy schema
  - Triển khai `SandboxPolicyConfig` cho OS-level sandbox
  - Thống nhất enforcement layer giữa application và OS
  - Status: BLOCKED, cần quyết định kiến trúc
  - Risk: HIGH

#### 3. **Provider Improvements**
- **#10687** - Custom OpenAI endpoints mặc định sử dụng native tool calling
  - Sửa lỗi configuration để enable native tools
  - Risk: MEDIUM, Size: XS - PR nhỏ nhưng tác động lớn

### 📐 Các RFC quan trọng đang thảo luận

#### **#9487** - Runtime-owned conversation sessions
- 36 bình luận, đang ở Revision 5
- Đề xuất thay đổi cách quản lý session và transport adapter
- Cần quyết định từ maintainer

#### **#10076** - Composable WASM plugin architecture  
- 12 bình luận, thiết kế kiến trúc plugin composable
- Định nghĩa core APIs và extension points
- Tác động lớn đến khả năng mở rộng hệ thống

#### **#10549** - Đơn giản hóa RFC voting process
- Đề xuất bỏ mandatory discussion windows
- Cho phép REVISE dừng snapshot hiện tại
- Nhằm giảm friction trong quy trình RFC

---

## 🌟 Điểm nổi bật cộng đồng

### 💬 Issues/PRs có nhiều tương tác

1. **#9487** (36 comments) - RFC về runtime sessions
   - Tranh luận sôi nổi về kiến trúc transport layer
   - Đã qua 5 revisions, cho thấy độ phức tạp cao

2. **#9488** (29 comments) - Unified file/attachment architecture
   - Cộng đồng đang tìm consensus về cách xử lý files
   - Revision 10, chứng tỏ vấn đề khó

3. **#6996** (29 comments) - Granular sandbox filesystem restrictions
   - Vấn đề security nhạy cảm được thảo luận kỹ lưỡng
   - Status: IN-PROGRESS, ACCEPTED

### 🎯 Xu hướng đóng góp

- **3 PRs mới được đóng** trong ngày (#9731, #9730, #9729) - liên quan đến zerocode UI improvements
- Distinguished contributors rất active: @JordanTheJet, @Audacity88, @IftekharUddin
- Nhiều PRs đang ở trạng thái `needs-author-action` hoặc `needs-maintainer-review`

---

## 🐛 Ổn định & Bugs

### 🔴 Bugs nghiêm trọng mới

#### **#10736** - Pre-output stream failure bỏ qua fallback
- **Severity: S2** - Degraded behavior
- Provider streaming error trước khi emit content → không fallback sang non-streaming
- Ảnh hưởng đến reliability của hệ thống

#### **#10734** - Stack overflow trên Windows
- **Component:** Tooling/CI
- `process_line` gây stack overflow với Windows thread stack nhỏ
- **PR #10735** đã được tạo để fix bằng cách heap-pin các branches lớn

#### **#10731** - `zeroclaw service logs` không hiển thị gì trên macOS/Windows
- **Severity: S2**
- Chỉ systemd on Linux hoạt động đúng
- **PR #10732** đã được tạo để fix

### 🟡 Bugs quan trọng khác

- **#9999** - Terminal responses bị output-limited cần classification tốt hơn
- **#10442** - OpenRouter streams cần keep-alive mechanism
- **#10446** - Tool-call envelopes bị serialize thành prose thay vì structured channel

---

## ✨ Yêu cầu tính năng

### 🎨 Tính năng mới được đề xuất/triển khai

1. **Server-Sent Events streaming** (#10450)
   - Cho phép webhook streaming qua SSE
   - Tăng khả năng real-time interaction

2. **Multiple models per provider** (#9809)
   - Một provider profile có thể host nhiều models
   - Giảm duplicate credentials
   - Size: XL, needs author action

3. **Gemini speech-to-speech broker** (#10430)
   - Realtime voice model integration
   - Daemon-side core implementation
   - Risk: HIGH

4. **OSC terminal integration** (#9876)
   - Report turn state qua OSC 2 title và OSC 9;4 progress
   - Cải thiện UX cho terminal users

### 🏗️ Cải tiến kiến trúc

- **A2A outbound client** (#9324) - Agent-to-Agent communication tools
- **Memory category-scoped grants** (#10252) - Cross-agent memory sharing với scope control
- **Atomic SOP rename** (#10233) - Collision-checked rename flow

---

## 💬 Phản hồi người dùng

### 😊 Feedback tích cực

- Zerocode UI improvements (#9729, #9730, #9731) được merge, cho thấy cải thiện UX được ưu tiên
- Multi-session tracking và agent sidebar được cộng đồng đón nhận

### 😤 Pain points

1. **RFC process quá phức tạp**
   - Issue #10549 đề xuất đơn giản hóa
   - Discussion windows không mang lại nhiều review như kỳ vọng

2. **Provider compatibility issues**
   - Custom OpenAI endpoints cần explicit config (#10687)
   - OpenRouter streaming stability (#10442)

3. **Cross-platform stability**
   - Windows stack overflow (#10734)
   - Service logs không hoạt động trên non-Linux (#10731)

### 🔐 Security concerns

- Delegate filesystem tools chưa respect target workspace (#10391)
- Git operations chưa honor allowed roots đúng cách (#10337)
- Audit chain cần preserve qua log rotation (#10463)

---

## 🗺️ Backlog & Roadmap

### 📌 Ưu tiên cao (Priority P2)

1. **RFC decisions** (#8692) - Maintainer decision queue
   - Nhiều RFCs đang chờ quyết định
   - #9487, #9488, #10076, #10526 cần attention

2. **Security hardening**
   - Sandbox policy enforcement (#7821, #6996)
   - Filesystem restrictions và security policy
   - Audit logging improvements

3. **Provider stability**
   - Reliable provider fallback mechanisms
   - Streaming error handling
   - Context window management (#8966)

### 🔄 In-progress items

- **Granular sandbox policy** (#6996) - ACCEPTED, IN-PROGRESS
- **Token accounting on history-trim** (#9713) - BLOCKED
- **Status localization** (#8546) - Needs maintainer review

### 🚧 Blocked items

Nhiều PRs quan trọng đang bị block:
- #9713 - Token accounting
- #10252 - Memory grants  
- #10358 - Mattermost approvals
- #9324 - A2A outbound client
- #10337 - Git allowed roots

### 📅 Xu hướng phát triển

**Short-term (1-2 tuần):**
- Giải quyết các bugs nghiêm trọng (streaming, Windows stack)
- Hoàn thiện các RFC đang pending
- Unblock các PRs quan trọng

**Mid-term (1-2 tháng):**
- WASM plugin architecture rollout
- Sandbox policy enforcement
- Multi-model provider support

**Long-term:**
- Unified conversation architecture
- Agent-to-agent communication ecosystem
- Advanced memory management

---

## 🎯 Nhận xét tổng quan

Zeroclaw đang ở giai đoạn **consolidation và hardening**. Dự án không rush tính năng mới mà tập trung vào:

✅ **Ổn định hóa core infrastructure**  
✅ **Cải thiện security posture**  
✅ **Giải quyết technical debt**  
✅ **Hoàn thiện kiến trúc foundation**

Tuy nhiên, có một số **bottlenecks rõ ràng**:
- Quá nhiều PRs cần maintainer review
- RFC process tạo friction
- Một số PRs quan trọng bị blocked lâu

Cộng đồng contributor rất active và có quality, nhưng cần **faster decision-making** từ maintainer team để duy trì momentum. 🚀

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo phân tích PicoClaw - Ngày 10/09/2026

## 🎯 Tóm tắt hôm nay

Hoạt động chính trong ngày tập trung vào **dọn dẹp backlog** với 3 issues cũ được đóng do stale bot. Về phát triển tính năng, có 4 PRs đang được review tập trung vào cải thiện trải nghiệm channel (IRC, QQ, thread handling) và tái cấu trúc DeltaChat. Không có release mới, nhưng dự án đang trong giai đoạn ổn định và cải thiện chất lượng code.

## 📦 Releases

**Không có release mới** trong 24 giờ qua. Dự án đang tích lũy các cải tiến để chuẩn bị cho phiên bản tiếp theo.

## 🚀 Tiến độ dự án

### PRs đang hoạt động

**1. Channel & Integration Layer** (3 PRs)

- **#1349 - QQ Channel enhancement** 🎨
  - Hỗ trợ parse và reply nhiều loại attachment (emoji, voice, image, video, file)
  - Ưu tiên Markdown trong replies với fallback
  - Thể hiện nỗ lực mở rộng khả năng tương tác đa phương tiện

- **#3354 - IRC multiline support** 📝
  - Implement IRCv3 `draft/multiline` để nhận tin nhắn dài như một message nguyên vẹn
  - Request các capabilities cần thiết (batch, message-tags)
  - Cải thiện UX cho IRC users với messages phức tạp

- **#3353 - Tool feedback animations** ⏱️
  - Giới hạn thời gian animation (5 phút max)
  - Ngăn việc edit message vô thời hạn khi lifecycle cleanup thất bại
  - Tăng stability và tránh resource leak

**2. Core Functionality**

- **#3358 - Thread responses fix** 🔗
  - Fix vấn đề bot reply không link đến câu hỏi gốc trong group chat
  - Đặc biệt quan trọng cho busy groups để theo dõi context
  - Cải thiện user experience đáng kể

**3. Refactoring**

- **#3222 - DeltaChat cleanup** 🧹
  - Giảm 200 LOC, loại bỏ legacy code
  - Chuẩn hóa configuration (rename fields, remove hardcoded data)
  - Yêu cầu secrets qua jsonrpc thay vì password-based config
  - Modernize codebase và improve maintainability

### Xu hướng phát triển

🔄 **Consolidation phase**: Dự án đang trong giai đoạn củng cố với focus vào code quality, user experience và stability hơn là thêm features lớn.

## 💬 Điểm nổi bật cộng đồng

### Issues được đóng (Stale cleanup)

Cả 3 issues đều được đóng tự động sau 30+ ngày không hoạt động:

1. **#3269 - MCP server hang** (1 👍)
   - Bug nghiêm trọng: agent loop hang khi MCP server connection fails
   - 9 comments cho thấy community engagement
   - Được đóng do stale, có thể chưa được fix hoàn toàn

2. **#3265 - Gateway deltachat error** (1 👍)
   - Lỗi startup về deltachat channel dù không config
   - 4 comments discussion
   - Potential configuration bug

3. **#3345 - Edge compute worker mode** (0 reactions)
   - Proposal về lightweight mode cho RISC-V/ARM/MIPS devices
   - Vision về distributed agent system
   - 2 comments, ít traction

⚠️ **Concern**: Việc đóng issues do stale bot có thể che giấu các vấn đề chưa được giải quyết, đặc biệt #3269 về MCP server hang.

## 🐛 Ổn định & Bugs

### Đã được xử lý qua PRs

✅ **#3358** - Fix thread context loss trong group chats  
✅ **#3353** - Bound animation để tránh infinite editing  

### Vấn đề tiềm ẩn (từ closed issues)

⚠️ **MCP Server Reliability** (#3269)
- Agent loop có thể hang khi MCP connection fails
- Ảnh hưởng: Chat interface không phản hồi
- Status: Unclear nếu đã fix

⚠️ **Gateway Configuration** (#3265)
- Unknown channel type errors với configs không liên quan
- Có thể là channel registry initialization issue

### Độ ưu tiên

🔴 **High**: MCP connection handling cần kiểm tra lại  
🟡 **Medium**: Gateway error handling cần strengthen

## 💡 Yêu cầu tính năng

### Đề xuất edge computing (#3345)

**Concept**: Lightweight PicoClaw worker mode

**Target devices**: 
- RISC-V/ARM/MIPS boards
- Raspberry Pi
- Old Android phones  
- Devices với 10-20MB RAM available

**Architecture vision**:
- Distributed agent system
- Household edge compute nodes
- Central coordinator + lightweight workers

**Status**: Đóng do stale, cho thấy proposal chưa được prioritize

**Assessment**: Ý tưởng có tiềm năng cho IoT/edge AI use cases nhưng cần resource commitment lớn để implement.

## 👥 Phản hồi người dùng

### Engagement metrics

📉 **Thấp**: Issues trong ngày có ít reactions (0-1 👍)  
📊 **Moderate**: PRs có activity nhưng chưa có community feedback rõ ràng

### Pain points từ closed issues

1. **Reliability concerns**: MCP server failures, gateway errors
2. **Resource constraints**: Interest trong lightweight deployment
3. **UX issues**: Thread context loss, animation không bound

### Positive signals

✨ Multi-channel support improvements (QQ, IRC) cho thấy focus vào interoperability  
✨ Code quality initiatives (refactoring, cleanup) thể hiện mature development practices

## 📋 Backlog & Roadmap

### Immediate focus (từ active PRs)

**Q3 2026 priorities**:
1. ✅ Channel experience improvements (IRC, QQ, threading)
2. ✅ Stability fixes (animations, error handling)
3. ✅ Code modernization (DeltaChat refactor)

### Technical debt

🔧 **Cần attention**:
- Legacy code removal (đang tiến hành với #3222)
- Configuration system standardization
- Error handling robustness (MCP, Gateway)

### Future considerations

🔮 **Potential directions**:
- Edge computing mode (nếu có demand rõ ràng)
- Thêm channel integrations
- MCP server reliability improvements

### Gaps

⚠️ **Thiếu**:
- Public roadmap document
- Feature prioritization transparency  
- Release schedule communication

---

## 📌 Kết luận

PicoClaw đang trong **giai đoạn consolidation** với focus mạnh vào stability và code quality. Việc cleanup backlog qua stale bot giúp giảm noise nhưng cần đảm bảo các bugs thực sự được resolve. Active PRs cho thấy development vẫn healthy với cải tiến UX across multiple channels. Dự án sẽ benefit từ transparent roadmap và better community engagement around feature priorities.

**Recommendation**: Monitor MCP server reliability và consider reopening #3269 nếu issue vẫn tồn tại sau các fixes gần đây.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - Ngày 10/09/2026

## 🎯 Tóm tắt hôm nay

Ngày 09/09 chứng kiến một đợt hoạt động sửa lỗi tập trung với **7 pull requests**, phần lớn tập trung vào việc cải thiện trải nghiệm người dùng và sửa các lỗi kỹ thuật quan trọng. Đáng chú ý là các bản sửa lỗi liên quan đến agent-runner, messaging threads, và WhatsApp integration. Có **1 issue mới** được báo cáo về vấn đề scheduling của recurring tasks, hiện vẫn đang mở.

---

## 🚀 Releases

**Không có release mới** trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### Pull Requests hoàn thành (2 PRs đã merge)

#### ✅ **#3756** - Cải thiện thông báo lỗi usage allowance
- **Tác giả**: @moshe-nanoco
- **Phạm vi**: agent-runner, core
- **Tác động**: Phần 3 của 3 trong chuỗi cải thiện xử lý usage limits
- **Chi tiết**: Khi Gateway từ chối request vì vượt usage allowance, giờ đây hiển thị thông báo rõ ràng hơn cho người dùng thay vì mã lỗi kỹ thuật
- **Ý nghĩa**: Cải thiện đáng kể UX khi người dùng gặp giới hạn sử dụng

#### ✅ **#3753** - Sửa lỗi ghi nhận Echo image trong community portal
- **Tác giả**: @Koshkoshinsk
- **Loại**: Bug fix
- **Vấn đề**: Portal ghi nhận `NANOCLAW_HARDENED_IMAGE=true` trước khi người dùng thực sự chọn, dẫn đến mismatch giữa record và thực tế
- **Giải pháp**: Portal giờ ghi nhận đúng image version mà người dùng đã chọn

#### ✅ **#3738** - Sửa lỗi threading trong message replies
- **Tác giả**: @zvi-fried
- **Phạm vi**: agent-runner, core, sessions, tools
- **Vấn đề quan trọng**: Files được gửi qua `send_message`, `send_file` không reply đúng thread, rơi vào main channel
- **Nguyên nhân**: `resolveRouting` lấy thread từ `session_routing.thread_id` thay vì từ message đang được trả lời
- **Tác động**: Cải thiện organization của conversations, đặc biệt quan trọng với file sharing

### Pull Requests đang mở (4 PRs)

#### 🔄 **#3754** - Tối giản portal link trong setup
- **Tác giả**: @Koshkoshinsk
- **Mục tiêu**: In ra chỉ 1 link portal thay vì multiple links gây nhầm lẫn
- **Vấn đề UX**: Hiện tại hiển thị portal link + thêm block "No browser? Sign in from another device" với WorkOS code, khiến người dùng nghĩ là alternative hoàn chỉnh nhưng chỉ sign in

#### 🔄 **#3755** - Dọn dẹp processing_ack orphaned rows
- **Tác giả**: @tchopoorian
- **Phạm vi**: agent-runner, core
- **Vấn đề kỹ thuật**: `sqliteGetPendingMessages` filter tất cả messages với `processing_ack` không có time bound, gây leak memory khi message đã bị xóa
- **Tác động**: Cải thiện performance và ngăn database bloat

#### 🔄 **#3752** - Giữ questions answerable trong WhatsApp chat
- **Tác giả**: @horsehcj
- **Phạm vi**: WhatsApp channel
- **Mục tiêu**: Đảm bảo mọi pending question trong chat vẫn có thể được trả lời

#### 🔄 **#3751** - Bỏ qua @newsletter JIDs trong WhatsApp
- **Tác giả**: @horsehcj
- **Phạm vi**: WhatsApp channel
- **Mục tiêu**: Ignore newsletter JIDs ở inbound boundary để tránh xử lý không cần thiết

### Xu hướng phát triển

📌 **Chủ đề chính**: Bug fixing & UX refinement
- Tập trung vào **messaging stability** (threading, routing)
- Cải thiện **WhatsApp integration** (2 PRs liên tiếp)
- **Setup/onboarding experience** được polish
- **Database cleanup** và performance optimization

---

## 💬 Điểm nổi bật cộng đồng

### Tương tác thấp
Các PRs và issues trong ngày có **ít hoặc không có reactions** (👍: 0 cho tất cả items), cho thấy:
- Đây là các công việc kỹ thuật nội bộ
- Chưa có community testing rộng rãi
- Hoặc là các fixes được triển khai nhanh mà không cần discussion dài

### Active contributors
Team đang làm việc active với **5 contributors khác nhau** trong 1 ngày:
- @moshe-nanoco, @Koshkoshinsk, @tchopoorian, @zvi-fried, @horsehcj

---

## 🐛 Ổn định & Bugs

### Issue đang mở - Nghiêm trọng

#### **#3705** - Recurring task schedule không update
- **Người báo**: @DawoudIO
- **Mức độ**: 🔴 **Cao** - Ảnh hưởng task automation
- **Vấn đề**: 
  - Khi dùng `ncl tasks update --recurrence <new-cron>` để đổi cadence
  - `process_after` không được recompute
  - VD: Đổi từ weekly → daily, task vẫn chạy theo schedule weekly cũ
- **Status**: Open (tạo từ 03/09, update cuối 09/09)
- **Tác động**: User phải manually workaround hoặc delete/recreate tasks

### Bugs đã fix trong ngày

✅ **Threading issues** - Files không reply đúng thread (#3738)
✅ **Portal recording mismatch** - Echo image không match thực tế (#3753)
✅ **Usage limit messaging** - Thông báo lỗi không rõ ràng (#3756)

### Vấn đề tiềm ẩn đang được xử lý

⚠️ **Memory leak risk** - `processing_ack` rows không được cleanup (#3755)
⚠️ **WhatsApp stability** - Newsletter JIDs gây noise (#3751), question handling (#3752)

---

## ✨ Yêu cầu tính năng

**Không có feature requests mới** trong ngày hôm nay. Tất cả hoạt động đều là bug fixes và improvements.

---

## 👥 Phản hồi người dùng

### Từ issue #3705
- User @DawoudIO phản ánh workflow issue với recurring tasks
- Đây là **pain point thực tế** trong việc manage scheduled automation
- Đã có 1 comment nhưng chưa có solution commit

### Insights về product usage
Từ các bugs được fix, có thể thấy users đang:
- ✉️ Sử dụng tích cực **threading và file sharing** (đủ để phát hiện routing bug)
- 📱 Deploy **WhatsApp integration** ở production (có newsletter spam issues)
- 🔄 Chạy **recurring tasks** và cần flexibility trong scheduling
- 💳 Gặp **usage limits** (cần better error messaging)

---

## 📋 Backlog & Roadmap

### Ưu tiên cao (cần giải quyết)
1. 🔴 **Issue #3705** - Recurring task schedule update (đang open 7 ngày)
2. 🟡 **4 PRs đang mở** - Cần review và merge

### Xu hướng ngắn hạn
Dựa trên pattern của các PRs:
- **Channel stability**: WhatsApp đang được hardening (2 PRs)
- **Setup/onboarding polish**: Portal experience improvements
- **Core reliability**: Messaging, threading, database cleanup

### Technical debt được address
- Database cleanup (orphaned rows)
- Error messaging clarity
- Threading logic refactor

---

## 🎓 Kết luận

NanoClaw đang ở giai đoạn **stabilization và polish** sau các features chính. Team tập trung vào:

✅ **Strengths**:
- Fast iteration (7 PRs trong 1 ngày)
- Đa dạng team members contribute
- Focus on UX details (error messages, portal flow)

⚠️ **Areas needing attention**:
- Issue #3705 cần priority cao hơn (open 7 ngày)
- WhatsApp integration cần more testing/hardening
- Community engagement thấp (có thể do internal sprint)

📊 **Health score**: **7.5/10** - Productive development, nhưng cần close open issues nhanh hơn

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo phân tích dự án IronClaw - 10/09/2026

## 1. 🎯 Tóm tắt hôm nay

Dự án IronClaw tập trung vào cải thiện hệ thống MCP (Model Context Protocol) và các tích hợp kênh giao tiếp. Hoạt động chính xoay quanh việc sửa các vấn đề về authentication, state management trong hosted-MCP servers, cùng với cải tiến trải nghiệm người dùng trên Telegram và WebChat v2. Không có release mới nhưng có 4 PRs đang được xem xét và 1 bug report mới về IME input.

## 2. 📦 Releases

**Không có releases nào được phát hành trong 24 giờ qua.**

## 3. 🚀 Tiến độ dự án

### Pull Requests đang triển khai:

#### 🔴 **Ưu tiên cao - Vấn đề bảo mật/isolation:**

**#8090 - Fix MCP catalog keying** ⚠️
- **Vấn đề nghiêm trọng**: Users đang ghi đè lên tools của nhau trên hosted-MCP servers
- **Nguyên nhân**: Discovery catalog được key theo extension ID thay vì theo caller
- **Ảnh hưởng**: User A và User B share credentials → tools của người gọi sau sẽ ghi đè tools của người trước
- **Giải pháp**: Key catalogs per-caller thay vì per-extension
- **Trạng thái**: Đang review từ 08/09

**#8084 - SEP-414 caller attribution cho hosted-MCP** 🔐
- **Vấn đề**: Hosted MCP servers không biết request đến từ conversation nào, không phân biệt được retry
- **Hệ quả**: 
  - Không maintain được per-conversation state
  - Có thể charge duplicate cho side-effecting calls bị retry
- **Giải pháp**: Implement opt-in SEP-414 caller attribution protocol
- **Tầm quan trọng**: Critical cho billing accuracy và state management

#### 🟡 **Vấn đề kỹ thuật cần sửa:**

**#8085 - Fix operator-installed package handling** 🔧
- **Vấn đề**: Packages do operator cài đặt có thể build nhưng không dùng được
- **Nguyên nhân**: Inconsistency giữa constructor và validator về inline dynamic schemas
- **Impact**: Operator-installed extensions bị unusable

**#8072 - Telegram command menu registration** 📱
- **Scope**: Large, low risk, docs + dependencies
- **Tính năng**: Auto-register Bot API commands (`/model`, `/status`, `/new`, `/stop`, `/interrupt`)
- **Trải nghiệm**: Users sẽ thấy commands trong hamburger menu của Telegram
- **Implementation**: Dùng `setMyCommands` API, cleanup với `deleteMyCommands`

### Xu hướng phát triển:

📈 **Multi-tenancy & Isolation**: Dự án đang giải quyết các vấn đề về tenant isolation trong hosted environments
🔌 **Channel Integrations**: Cải thiện tích hợp với messaging platforms (Telegram)
🛡️ **Security & Attribution**: Tăng cường tracking và attribution cho MCP calls

## 4. 💬 Điểm nổi bật cộng đồng

**Tương tác thấp** - Các PRs và issues đều có 0 comments/reactions, cho thấy:
- Đây là internal development phase
- Chưa có community engagement mạnh
- Có thể là private/enterprise project với limited public visibility

**Issue duy nhất (#8091)** cũng không có tương tác nào, mặc dù là user-facing bug.

## 5. 🐛 Ổn định & Bugs

### Bug đang mở:

**#8091 - IME composition bug trong WebChat v2** 🇯🇵
- **Mô tả**: Phím Enter vừa confirm IME composition vừa send message
- **User impact**: Messages bị gửi khi chưa hoàn thành nhập liệu (ảnh hưởng users dùng Japanese/Chinese/Korean input)
- **Severity**: Medium - ảnh hưởng UX cho non-Latin script users
- **Lịch sử**: Regression - vấn đề đã từng xuất hiện trước đây
- **Status**: Mới report 09/09, chưa có ai claim

### Critical bugs từ PRs:

⚠️ **User isolation breach** (#8090) - Nghiêm trọng nhất
⚠️ **Billing/retry issues** (#8084) - Critical cho production
⚠️ **Package unusability** (#8085) - Ảnh hưởng extensibility

## 6. ✨ Yêu cầu tính năng

**Từ PRs:**
- **Caller attribution protocol** (#8084): Cho phép MCP servers track conversation context và prevent duplicate billing
- **Telegram command menu** (#8072): UX improvement cho Telegram users

**Không có feature requests từ issues mới.**

## 7. 👥 Phản hồi người dùng

### Insights từ bug report:

**@supermomonga** (#8091) phản ánh vấn đề IME - cho thấy:
- Có users quốc tế đang dùng product (CJK users)
- Quality regression đang xảy ra
- Cần better QA cho i18n/input methods

### Thiếu vắng feedback:

- Không có discussions trong PRs
- Không có user testimonials
- Chưa thấy adoption metrics hay user satisfaction signals

## 8. 📋 Backlog & Roadmap

### Từ PR pipeline, ưu tiên ngắn hạn:

**🔥 Hot fixes (cần ship ngay):**
1. Fix MCP catalog isolation (#8090) - Security/correctness critical
2. Implement caller attribution (#8084) - Prevent billing issues

**🔧 Quality fixes:**
3. Fix operator package handling (#8085)
4. Fix IME composition (#8091)

**✅ Enhancements:**
5. Telegram command menu (#8072) - Ready to merge

### Gap analysis:

**Thiếu trong roadmap công khai:**
- Documentation updates
- Testing strategy cho multi-tenant scenarios
- Migration plan cho existing users affected by #8090
- Internationalization testing framework (để catch #8091 trước khi ship)

### Recommendations:

🎯 **Tăng test coverage** cho:
- Multi-user scenarios trong MCP
- IME input handling
- Package installation/validation flows

🎯 **Improve community engagement**:
- Add discussion threads cho major PRs
- Public roadmap document
- User feedback channels

---

## 📊 Metrics tóm tắt

- **PRs mới**: 0
- **PRs đang active**: 4
- **Issues mới**: 1
- **Critical bugs**: 2-3 (tùy severity classification)
- **Community engagement**: Rất thấp (0 interactions)
- **Development velocity**: Ổn định (4 PRs in pipeline)

**⚡ Priority action**: Ship fixes cho MCP isolation và caller attribution trước khi có production incidents.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo Phân tích Hệ sinh thái QwenPaw - Ngày 10/09/2026

## 📊 Tóm tắt hoạt động hôm nay

Dự án QwenPaw tiếp tục duy trì tốc độ phát triển cao với **5 PR mới được mở** và **9 PR/issue được đóng** trong ngày. Hoạt động tập trung vào việc **củng cố bảo mật hệ thống** (backup permissions, TLS certificates), **tối ưu hiệu năng** (scroll history integrity checks), và **cải thiện trải nghiệm người dùng** đa nền tảng. Đặc biệt, có sự xuất hiện của đề xuất tích hợp bên thứ ba (MemCode, ntfy) cho thấy QwenPaw đang thu hút sự chú ý từ cộng đồng developer.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng dự án đã **bump version lên 2.2.1b2** (#7643), cho thấy đang trong giai đoạn ổn định hóa trước khi ra mắt bản 2.2.1 chính thức.

---

## 🔧 Tiến độ dự án

### **A. Bảo mật & Hạ tầng** 🔐

**1. Sửa lỗi nghiêm trọng về quyền truy cập file**
- **#7658** - Khắc phục vấn đề backup restore làm giảm quyền của thư mục `SECRET_DIR` từ `0o700` → `0o755` và `.master_key` từ `0o600` → `0o644` (world-readable)
- **Impact**: Ngăn chặn lộ thông tin nhạy cảm trong môi trường multi-user
- **Trạng thái**: Open, cần review

**2. Hỗ trợ TLS certificates tùy chỉnh**
- **#7659** - Cho phép desktop app tin tưởng các CA operator-provided (corporate networks)
- **#4175** - Thêm `tls_verify` và `ca_file` vào MCP client config
- **Use case**: Doanh nghiệp sử dụng private CA hoặc self-signed certs

### **B. Hiệu năng & Ổn định** ⚡

**1. Tối ưu Scroll history integrity checks** (#7639)
- **Vấn đề**: Mỗi lần khởi tạo agent đều chạy `PRAGMA quick_check` → overhead lớn
- **Giải pháp**: Chỉ check 1 lần/process cho mỗi `history.db`, dùng locking tránh concurrent checks
- **Kết quả**: Giảm đáng kể thời gian khởi động agent

**2. Sửa lỗi FTS corruption trong history.db** (#7655, #7596)
- **Root cause**: Retention purge thất bại do `SQLITE_CORRUPT_VTAB` khi xóa recall-tool rows chưa được index
- **Fix**: Đồng bộ FTS maintenance xuyên suốt updates/purges/duplicates

**3. Context compaction vượt budget** (#7628)
- **Vấn đề**: Trigger compaction chỉ dựa trên conversation context, không tính toàn bộ request → vẫn có thể vượt provider limit
- **Đề xuất**: Tính toán dựa trên complete request budget
- **Trạng thái**: Open, chưa có fix

### **C. Trải nghiệm người dùng** 🎨

**1. Console/Web UI improvements**
- **#7237** - Ngăn chặn session races khi queue messages và switch sessions (bug nghiêm trọng về cross-session mix-up)
- **#7622** - Sửa lỗi modal overlay không có màu nền tối trong v2.2.0
- **#7646** - Align CSS selectors từ `.ant-*` sang `.qwenpaw-*` (do `prefixCls` change)
- **#7611** - Hỗ trợ BiDi rendering (Arabic/Hebrew + English/code)

**2. Mobile experience**
- **#7378** - [DRAFT] Giới thiệu QwenPaw Mobile (React Native/Expo) cho Android/iOS
- **#7623** - Cải thiện mobile agent selector với pinned agents entry

**3. UX enhancements**
- **#7542** - Thêm scroll-back pagination cho lịch sử tin nhắn đã bị compact
- **#7648** - Yêu cầu tùy chỉnh web title (hiện tại tất cả tabs đều là "QwenPaw Console")

### **D. Tính năng mới** ✨

**1. Advisor Mode** (#7569)
- **Concept**: Pair 2 models – advisor (stronger) + worker (cheaper)
- **Flow**: Advisor đưa ra kế hoạch → Worker thực hiện → Advisor review và suggest corrections
- **Status**: Open PR, feature hoàn chỉnh

**2. Skills versioning & dependencies** (#7609 → merged, #7557)
- **Vấn đề**: Skills là plain directories, không có version tracking
- **Giải pháp**: Expose versions trong workspace/Pool APIs, validate MCP requirements
- **Lợi ích**: Fleet management, dependency checking

**3. QwenPaw-Data 0.3.0 integration** (#7637)
- Embed QPD Data Console làm UI chính cho analysis engine
- Bridge giữa file system và QwenPaw agents

---

## 🌟 Điểm nổi bật cộng đồng

### **Tương tác cao nhất** 💬

1. **#7011** (8 comments) - Bug về Console cancel request ảnh hưởng đến Feishu session → **đã đóng**
2. **#7177** (8 comments) - Yêu cầu tối ưu UX của platform.agentscope.io/deploy → chưa resolve
3. **#7363** (6 comments) - Synchronous calls freeze event loop và timeout không hoạt động (Desktop 2.1.1b1)

### **Vấn đề người dùng quan tâm** 👥

**1. Khó khăn với working directory selection** (#7601)
- Phàn nàn: v2.2.0 chỉ cho phép click từng cấp, không thể paste path trực tiếp (v2.1.0 được)
- **Community pain point**: Workflow regression

**2. App market UX confusion** (#7228, #7651)
- Installed apps vẫn hiển thị "Install" button thay vì "Uninstall"/"Installed"
- **Fix đã merge**: Match apps bằng App ID thay vì author field

**3. Cross-session message routing bugs** (#7231)
- Tin nhắn gửi sang sai session khi switch nhanh
- **Critical fix**: #7237 đang pending review

---

## 🐛 Ổn định & Bugs

### **Đã sửa** ✅
- ✅ FTS corruption trong history.db (#7655)
- ✅ Tool result duplication khi MCP trả về structuredContent (#6969)
- ✅ Console CSS selector mismatch (#5688, #7646)
- ✅ Audio fallback không nhận diện được llama-server/DashScope rejections (#7654)

### **Đang xử lý** 🔄
- 🔄 **P0**: Session identity races (#7237) - 2 tuần chưa merge
- 🔄 **P1**: Context compaction vượt budget (#7628)
- 🔄 Playwright driver connection dead-lock (#6776) - mở từ 08/07
- 🔄 Desktop startup blocking 118-135s do synchronous calls (#7363)

### **Chưa giải quyết** ⚠️
- ⚠️ Console streaming không hiển thị trên Chrome (Safari OK) (#7642)
- ⚠️ Tool-returned image/PDF trigger 400 "file must have file_id" (#7597)

---

## 💡 Yêu cầu tính năng

### **Mới nhất** 🆕

**1. Tích hợp bên thứ ba**
- **#7657** - Hỗ trợ ntfy channel (self-hosted push service, 34k ⭐)
  - Author: @Mcpy (working implementation ready)
  - Use case: Home-lab/self-hosted users
  
- **#7656** - Durable memory across sessions (MemCode)
  - Proposal từ Vivek Gupta (CEO MemCode)
  - Preserve user routines/preferences xuyên suốt sessions

**2. UX improvements**
- **#7648** - Customizable web title (giải quyết tab confusion)
- **#7644** - Cho phép edit default agent parameters từ frontend
- **#7650** - Truyền channel parameters (QQ号/工号) vào MCP tools

**3. Infrastructure**
- **#4175** - MCP client `tls_verify`/`ca_file` support (corporate networks)
- **#3997** - Configurable MCP timeout (hiện hardcode 30s)

---

## 💬 Phản hồi người dùng

### **Tích cực** 👍
- Community bắt đầu đóng góp first-time PRs (#7659, #7611, #7542)
- Có proposals từ các startup muốn integrate (MemCode, ntfy)

### **Tiêu cực** 👎
- **Regression complaints**: Working directory UX trong v2.2.0 (#7601)
- **Critical bugs lâu chưa fix**: Session races (#7237 mở từ 24/08), Playwright dead-lock (#6776 mở từ 07/08)
- **Documentation gaps**: User phàn nàn không biết cách truyền channel params (#7650)

### **Pain points chính** 🔥
1. **Multi-session stability**: Cross-session bugs vẫn tồn tại sau nhiều fixes
2. **Desktop performance**: Startup blocking 100s+ (#7363) chưa có roadmap fix
3. **Mobile gaps**: Draft PR #7378 cho thấy mobile vẫn chưa là priority

---

## 🗓️ Backlog & Roadmap

### **Đang trong sprint** 🏃
- **Bảo mật**: Backup permissions (#7658), TLS support (#7659)
- **Ổn định**: Session races (#7237), history integrity (#7639, #7655)
- **Testing**: Coverage sprint +5.02pp (#7653), E2E rebuild (#7645)

### **Next milestones** 🎯
- **2.2.1 release**: Đang ở b2, có thể sắp ra stable
- **Mobile app**: Draft PR #7378 cho thấy đang explore, chưa timeline rõ ràng
- **Memory backends migration**: ADBPG/PowerContext → plugins (#7616)

### **Backlog dài hạn** 📋
- **Reranker UI** (#6399) - mở từ 23/07, chưa merge
- **Shell PATH fixes** (#7057) - ready-for-review nhưng chưa được prioritize
- **Scroll-back pagination** (#7542) - first-time contributor PR, chưa review

---

## 📈 Metrics tổng quan

- **Active PRs**: 21 open (tăng từ 16 ngày 09/09)
- **Active Issues**: 21 open
- **Merge rate**: 9 merged/closed trong 24h (tốc độ cao)
- **Community engagement**: 3 first-time contributors trong tuần
- **Code quality**: Coverage tăng 5.02pp trong batch 2 unit tests (#7653)

---

## 🎯 Kết luận

QwenPaw đang trong **giai đoạn consolidation** trước khi release 2.2.1 stable. Dự án **prioritize bảo mật & ổn định** (backup permissions, session races, FTS corruption) song song với việc **mở rộng ecosystem** (MCP timeout config, skills versioning, external integrations). 

**Điểm lo ngại**: Một số critical bugs (session races, desktop blocking) đã mở lâu chưa resolve, và mobile experience vẫn còn ở dạng draft. **Điểm tích cực**: Community engagement tăng mạnh với nhiều first-time contributors và proposals từ các công ty bên ngoài.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*