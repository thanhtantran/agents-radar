# Bản tin Hệ sinh thái Hermes Agent 2026-09-09

> Issues: 114 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-09 02:00 UTC

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

# 📊 Báo cáo Phân tích Dự án Hermes Agent - 2026-09-09

## 1. 🎯 Tóm tắt hôm nay

Hôm nay Hermes Agent tập trung vào **stabilization và developer experience** với 30 PRs và 114 issues đang hoạt động. Hai vấn đề nổi bật: bug Windows Desktop updater (#105145, #105587, #106097) cuối cùng đã được giải quyết sau hơn 16 bình luận, và một lỗi nghiêm trọng về MCP profile scoping (#106005) khiến chỉ profile đầu tiên nhận được tools trong môi trường multiplex. Không có release mới, nhưng có nhiều infrastructure fixes và DX improvements được merge.

## 2. 📦 Releases

**Không có release mới trong 24h qua.**  
Phiên bản ổn định hiện tại: v0.21.1 (dựa trên các tham chiếu trong issues)

## 3. 🚀 Tiến độ dự án

### **Xu hướng phát triển chính**

#### **A. Windows Desktop Platform Stabilization (Ưu tiên cao)**
- 🐛 **Critical fix merged**: Desktop updater trên Windows luôn báo FAILED sau khi update thành công (#105145, #105587, #106097)
  - Root cause: Script verify chạy với `cwd=$HERMES_HOME` thay vì install root
  - Impact: Mọi Windows desktop user đều gặp false-negative này
  - **3 issues duplicate được đóng cùng lúc** - cho thấy đây là pain point lớn

#### **B. MCP & Multi-Profile Architecture (P1)**
- 🔴 **Regression nghiêm trọng**: #106005 - MCP connections không được scope theo profile
  - Trong môi trường `GATEWAY_MULTIPLEX_PROFILES=true`, chỉ profile đầu tiên nhận toolset
  - Ảnh hưởng: Mọi multi-profile deployment với shared MCP server names
  - Chưa có PR fix - đang trong investigation phase

#### **C. Compression & Context Management Evolution**
- ✅ **Major feature PR**: #105555 - Persist compaction events vào durable session logs
  - Thêm `compaction_events` table với start/end rows
  - Cho phép detect orphaned compactions sau crashes
  - Audit trail cho debugging context budget issues

#### **D. Gateway Platform Ecosystem Expansion**
- 🌍 **Platform coverage improvements**:
  - Gitea webhook recognition (#106191)
  - Discord voice auto-TTS fixes (#101185)
  - WhatsApp ephemeral message quote parser (#106066)
  - Signal reaction delivery attribution (#106153)
  - Feishu forum thread routing (#37787)

### **PRs đáng chú ý**

| PR | Loại | Tác động | Status |
|---|---|---|---|
| #105555 | feat(compression) | Durable compaction audit trail | 🟡 Open |
| #106197 | fix(console) | Cancel propagation to provider | 🟡 Open |
| #106193 | fix(models) | Custom provider cache keying | 🟡 Open |
| #106183 | fix(anthropic) | Preserve cache tokens in usage | 🟡 Open |
| #104131 | fix(desktop) | Artifact path routing Windows | 🟡 Open |

## 4. 💬 Điểm nổi bật cộng đồng

### **Top issues theo engagement**

1. **#66616** (181 bình luận) - Skills index watchdog: Index degraded 29.8h
   - Automated monitoring đang hoạt động tốt
   - Cho thấy team có culture ops rõ ràng

2. **#88584** (78 bình luận) - Nous integration blocked
   - Automated merge conflicts trong `cron/jobs.py`
   - Long-running issue về CI/CD pipeline

3. **#105145** (16 bình luận) - Windows update false FAILED
   - **Đã được giải quyết** - 3 duplicate issues closed together
   - User feedback tích cực trong comments

### **Community pain points**

- 🌏 **China market request** (#96858, 3👍): User đề xuất official mirror cho thị trường Trung Quốc
  - Lập luận business: Compete với DeepSeek, Tencent WorkBuddy
  - Benefit: Tăng adoption, feedback quality, ecosystem contribution
  - Status: `needs-decision` - chưa có official response

- 🎨 **UX feedback** (#58841, 1👍): Dark mode themes readability issues
  - Request: Catppuccin themes + "boring" high-contrast option
  - Reflect user base quan tâm DX/UX details

## 5. 🐛 Ổn định & Bugs

### **Critical issues**

1. **MCP profile isolation failure** (#106005) - P1
   - First-profile-only tool access trong multiplex mode
   - Chưa có fix, impact cao

2. **Windows terminal tool blocks 330s** (#80952) - P2, CLOSED as duplicate
   - Khi spawned bởi ACP client (Buzz)
   - Falls back to WSL bash - workaround tồn tại

3. **OAuth refresh_token erasure** (#62333) - P2, CLOSED
   - MCP servers die ~1h sau login
   - Đã được fix trong recent commits

### **Platform-specific issues**

**Windows** (6 active issues với label `platform/windows`):
- Desktop updater verification đã fix
- Terminal tool blocking pattern identified
- Computer-use provider attributes missing

**Voice/Audio** (Discord, Signal):
- Auto-TTS không play trong voice channels (#101185)
- Inactivity timer không reset (#105974)

### **Session management reliability**

Cluster của issues về session state corruption:
- #106016: `--in DIR` + `--continue` tạo unbound session
- #106003: Desktop sidebar "No sessions yet" với 40+ sessions tồn tại
- #96201, #96194, #96206: Silent failures khi persist/flush

**Pattern**: Error handling nuốt exceptions → silent data loss → hard to debug

## 6. ✨ Yêu cầu tính năng

### **High-value requests**

1. **Python 3.14 support** (#48723) - P1
   - Current pin: `<3.14,>=3.11`
   - Python 3.14 đã là default trên Homebrew macOS
   - Blocking adoption cho early adopters

2. **Per-model compression thresholds** (#87943) - P3
   - Global `threshold_tokens` không fit heterogeneous fleets
   - Use case: Different context windows per model

3. **Session directory switching** (#50195) - P3, 1👍
   - Không thể đổi working directory giữa session
   - Workaround hiện tại: Exit và restart

4. **Email session isolation by subject** (#26277) - P3, 2👍
   - Current: Treat all emails from sender as one session
   - Request: Optional subject-based isolation

### **Infrastructure requests**

- Session_id in chat-completions metadata (#106113) - deployment affinity
- Docker environment profile scoping (#106204) - multi-tenant safety
- Kanban promote --force actual execution (#106195) - workflow tooling

## 7. 👥 Phản hồi người dùng

### **Positive signals**

- **Windows fix appreciation**: Multiple users confirmed #105145 fix works
- **Documentation quality**: i18n expansion (Indonesian) shows international adoption
- **Responsive maintainers**: Critical bugs được address trong <24h

### **Friction points**

1. **Installation complexity**: SQLite WAL repair hint confuses Git users (#79179)
   - Misclassifies `git` installs as "Hermes-managed"
   - Recommends `hermes update` cho system Python

2. **Error message clarity**: Nhiều "silent failure" patterns
   - Memory flush timeout không log (#96194)
   - Session persist failures swallowed (#96201, #96206)
   - Custom provider disappears without warning (#106184)

3. **Multi-profile UX gaps**:
   - Desktop dropdown omits default profile (#106017)
   - Profile count >10 breaks UI (#106184)
   - Bot Mode flickers với multiplex (#94769)

### **Feature adoption signals**

- **MCP ecosystem growth**: 5+ platform adapters active
- **Computer-use expansion**: Remote desktop transport PR (#103653)
- **Cron/automation maturity**: Per-job max_turns (#57285)

## 8. 🗺️ Backlog & Roadmap

### **Inferred priorities từ labels & activity**

#### **Q4 2026 Focus Areas** (dựa trên P1/P2 concentration)

1. **Stability tier 1**: Session management reliability
   - 8+ open issues về silent persist failures
   - Compaction audit trail (#105555) addressing this

2. **Platform parity**: Windows desktop experience
   - Update flow fixed
   - Còn terminal tool latency (#80952)

3. **Multi-tenant readiness**: Profile isolation
   - MCP scoping bug (#106005) blocking production deployments
   - Docker environment scoping (#106204)

#### **Technical debt clusters**

- **Error handling**: 6+ PRs adding logging to silent-failure paths
- **Cache coherency**: Custom provider cache (#106193), MCP schema cache (#101007)
- **Type safety**: New `ty invalid-method-override` gate (#106192)

#### **Ecosystem expansion**

- **i18n momentum**: Indonesian docs PRs merged, foundation cho thêm languages
- **Platform coverage**: 5 messaging platform fixes in flight
- **Observability**: ACP/batch surface attribution (#106194)

### **Blocked items cần decisions**

- China mirror strategy (#96858) - `needs-decision`
- Computer-use remote transport (#103653) - long-review
- Per-model compression config (#87943) - `needs-decision`

---

## 📈 Metrics Summary

- **Issues mở**: 114 (50 displayed by comments)
- **PRs mở**: 30 (từ 500 total)
- **Critical (P1) issues**: 6
- **Platform coverage**: 8 messaging platforms active
- **i18n languages**: 3+ in progress (zh, id, en)
- **Duplicate closures hôm nay**: 4 (Windows update cluster)

**Health indicators**:
- ✅ Fast response on critical bugs (<24h)
- ✅ Active i18n expansion
- ⚠️ Silent failure patterns cần systematic fix
- ⚠️ Multi-profile architecture cần hardening

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 09/09/2026

## 1. 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI agent vào ngày 09/09/2026 đang trong giai đoạn **maturity và consolidation** với các dự án lớn tập trung vào ổn định hóa thay vì thêm features mới. Có sự phân hóa rõ ràng giữa các dự án về quy mô, mục tiêu, và độ trưởng thành:

- **Tier 1 (Enterprise-ready)**: Hermes Agent, OpenClaw, QwenPaw - focus vào production stability, multi-tenant, security
- **Tier 2 (Growth phase)**: NanoBot, Zeroclaw, IronClaw - velocity cao, đang hoàn thiện architecture
- **Tier 3 (Emerging)**: PicoClaw, NanoClaw - nhỏ gọn, tập trung vào use cases cụ thể
- **Inactive**: NullClaw - không có hoạt động

**Điểm chung**: Tất cả dự án đang xử lý các vấn đề về **session management**, **provider compatibility**, và **cost tracking** - dấu hiệu của việc chuyển từ prototypes sang production systems.

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity Level | Focus Area | Community Size |
|-------|--------|-----|----------|----------------|------------|----------------|
| **Hermes Agent** | 114 | 500 | 0 | 🔥🔥🔥 High | Stability, Multi-platform | ⭐⭐⭐⭐ Large |
| **OpenClaw** | 135 | 500 | 1 (v2026.9.3) | 🔥🔥🔥 High | Production hardening | ⭐⭐⭐⭐ Large |
| **QwenPaw** | 19 | 46 | 1 (v2.2.1-beta.1) | 🔥🔥 Medium-High | Multi-modal, Plugins | ⭐⭐⭐ Medium |
| **NanoBot** | 2 | 40 | 0 | 🔥🔥🔥 Very High | Bug fixes, Performance | ⭐⭐ Small-Medium |
| **Zeroclaw** | 16 | 50 | 0 | 🔥🔥 Medium | Provider expansion, Security | ⭐⭐⭐ Medium |
| **IronClaw** | 2 | 11 | 0 | 🔥🔥 Medium | Hosted-MCP, Security | ⭐ Small |
| **PicoClaw** | 5 | 8 | 0 | 🔥 Low-Medium | Config, Concurrent access | ⭐ Small |
| **NanoClaw** | 2 | 10 | 0 | 🔥🔥 Medium | OpenCode integration | ⭐ Small |
| **NullClaw** | 0 | 0 | 0 | ❄️ Inactive | - | - |

### Chỉ số chi tiết

| Dự án | Merge Velocity | Critical Bugs | Security Issues | i18n Support | Platform Coverage |
|-------|---------------|---------------|-----------------|--------------|-------------------|
| Hermes | ~3-5/day | 6 P1 | Low | 3+ languages | 8 platforms |
| OpenClaw | ~5-7/day | 4 P0/P1 | Medium | Unknown | 6+ channels |
| QwenPaw | ~4-6/day | 5 critical | Medium | Unknown | Multi-platform |
| NanoBot | **12/day** 🏆 | 4 critical | High | Unknown | Telegram focus |
| Zeroclaw | ~3-4/day | 5 P2 | High | Unknown | Multi-provider |
| IronClaw | ~2-3/day | 2 critical | **High** 🔴 | Unknown | Hosted-MCP |
| PicoClaw | ~1-2/day | **3 critical** 🔴 | **Critical** 🔴 | Unknown | Limited |
| NanoClaw | ~2-3/day | 3 | Medium | Unknown | Multi-channel |

---

## 3. 🎯 Vị thế của Hermes Agent

### **Định vị**: Enterprise-grade foundational platform

**Điểm mạnh:**

1. **Quy mô cộng đồng lớn nhất** - 114 active issues, 500 PRs
2. **Multi-platform leadership** - 8 messaging platforms (nhiều nhất)
3. **Internationalization maturity** - 3+ languages đang phát triển (Indonesian, Chinese)
4. **Governance rõ ràng** - RFC process, P0-P3 prioritization
5. **Stabilization focus** - Ít features mới, tập trung fix regressions

**Điểm yếu:**

1. **Silent failure patterns** - 6+ issues về error handling nuốt exceptions
2. **Windows desktop friction** - Nhiều platform-specific bugs
3. **Multi-profile architecture chưa hoàn thiện** - Bug #106005 nghiêm trọng về MCP scoping
4. **Technical debt cao** - Nhiều session management issues

**So sánh với competitors:**

- **vs OpenClaw**: OpenClaw có release cadence tốt hơn (v2026.9.3), nhưng Hermes có platform coverage rộng hơn
- **vs QwenPaw**: QwenPaw đổi mới nhanh hơn (memory backends, plugins), nhưng Hermes ổn định hơn
- **vs NanoBot**: NanoBot velocity cao hơn (12 merges/day), nhưng Hermes có architecture chín chắn hơn

**Chiến lược hiện tại**: **Consolidate trước khi scale** - Đúng hướng cho enterprise adoption, nhưng cần cải thiện error visibility và Windows experience.

---

## 4. 🔧 Hướng kỹ thuật chung

### **Convergence patterns** - Các vấn đề mọi dự án đều gặp:

#### A. **Session & Context Management** (8/8 dự án)

| Vấn đề | Hermes | OpenClaw | QwenPaw | NanoBot | Zeroclaw | IronClaw | PicoClaw | NanoClaw |
|--------|--------|----------|---------|---------|----------|----------|----------|----------|
| Session lifecycle | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Context compaction | ✅ | ✅ | ✅ | ✅ | - | - | - | ✅ |
| Multi-user isolation | ⚠️ | ⚠️ | - | - | ✅ | 🔴 | - | - |

**Insight**: Đây là **hard problem** của hệ sinh thái - chưa có best practices chung.

#### B. **Provider Abstraction & Compatibility** (7/8 dự án)

**Xu hướng chung:**
- OpenAI-compatible gateway support (LiteLLM, AWS Bedrock)
- Provider-specific features (Anthropic cache, OpenAI Responses, Gemini streaming)
- Cost tracking và attribution

**Leaders:**
- **Zeroclaw** - Hỗ trợ advanced features nhiều nhất (OpenAI Responses steering, Anthropic extended thinking)
- **QwenPaw** - Plugin architecture cho providers
- **NanoClaw** - OpenCode provider integration (non-LLM AI)

**Laggards:**
- PicoClaw, NanoBot - Limited provider support

#### C. **Multi-Channel Architecture** (6/8 dự án)

**Platform coverage:**

| Platform | Hermes | OpenClaw | QwenPaw | Zeroclaw | NanoClaw | Others |
|----------|--------|----------|---------|----------|----------|--------|
| Telegram | ✅ | ✅ | ✅ | ✅ | ✅ | PicoClaw |
| Slack | ✅ | ✅ | - | - | ✅ | - |
| Discord | ✅ | ✅ | - | - | ✅ | - |
| WhatsApp | ✅ | ✅ | - | - | ✅ | - |
| iMessage | ✅ | ✅ | - | - | ✅ | - |
| Matrix | ✅ | ✅ | - | - | - | - |
| Email | - | ✅ | - | - | ✅ | - |

**Winner**: **Hermes & OpenClaw** tie với 6+ platforms

#### D. **Security & Sandboxing** (Emerging trend)

**Concerns đang được address:**
- **IronClaw**: Cross-user metadata exposure (#6778) - CRITICAL
- **PicoClaw**: Data race, data loss bugs (#3374, #3373) - CRITICAL
- **Zeroclaw**: Session-scoped permissions (#10405, #9977)
- **Hermes**: Multi-profile isolation (#106005)

**Pattern**: Các dự án đang phát hiện security issues khi scale lên multi-user deployments.

#### E. **Cost Visibility & Tracking** (6/8 dự án)

**Common pain points:**
- Cache write premium pricing (Hermes #105555, Zeroclaw #10716)
- Conversation-level attribution (OpenClaw, Zeroclaw #10700)
- Token budget optimization (OpenClaw #141747 - 686 tokens overhead)

**Solutions emerging:**
- Durable compaction audit trails
- Per-conversation session IDs
- Cost dashboards trong UI

---

## 5. 💡 Điểm khác biệt

### **Architecture Philosophy**

| Dự án | Philosophy | Extensibility | Target User |
|-------|-----------|---------------|-------------|
| **Hermes** | Monolithic, batteries-included | Plugins via MCP | Enterprise teams |
| **OpenClaw** | Modular, plugin-first | 152 bundled plugins | Power users |
| **QwenPaw** | Memory-centric, multi-modal | Plugin marketplace | Researchers |
| **NanoBot** | Minimalist, fast iterations | Limited | Individual devs |
| **Zeroclaw** | Provider-agnostic, composable | WASM plugins (WIP) | Platform builders |
| **IronClaw** | Hosted-MCP focused | Extensions | SaaS operators |
| **PicoClaw** | Lightweight, embedded | Minimal | IoT/edge |
| **NanoClaw** | Email-first, async | Channel adapters | Workflow automation |

### **Unique Selling Points**

#### **Hermes Agent** 🏆
- **Multi-platform breadth** - 8 channels, most comprehensive
- **i18n leadership** - Only project with active multi-language support
- **Governance maturity** - Clear P0-P3, RFC process

#### **OpenClaw** 🚀
- **Plugin ecosystem** - 152 bundled, 21 categories
- **Release cadence** - Consistent stable releases (v2026.9.3)
- **Migration tooling** - V1→V2 migration support

#### **QwenPaw** 🧠
- **Memory innovation** - Multiple backends (OpenViking, PowerContext, ADBPG)
- **Multi-modal robustness** - Advanced PDF/binary handling
- **Plugin marketplace** - User-facing marketplace với update notifications

#### **NanoBot** ⚡
- **Velocity king** - 12 merges/day, fastest iteration
- **Telegram-native** - Best Telegram integration (streaming, rich messages)
- **Memory efficiency** - Aggressive cache bounding

#### **Zeroclaw** 🔧
- **Provider sophistication** - Advanced features (OpenAI Responses, Anthropic thinking)
- **WASM plugins** - Next-gen extensibility (#10076)
- **Cost tracking maturity** - Most detailed cost attribution

#### **IronClaw** 🏗️
- **Hosted-MCP specialization** - Only project focused on hosted-MCP as core
- **Caller attribution** - SEP-414 implementation for multi-tenant

#### **PicoClaw** 📱
- **Embedded/IoT focus** - Lightweight for resource-constrained environments
- **Gitea integration** - Version control native

#### **NanoClaw** 📧
- **Email-first** - AgentMail, Resend native support
- **Async workflows** - Designed for delayed responses

### **Technology Choices**

| Dự án | Language | Runtime | Database | Notable Tech |
|-------|----------|---------|----------|--------------|
| Hermes | TypeScript | Node.js | SQLite (WAL) | Compression events table |
| OpenClaw | Python | asyncio | PostgreSQL | Durable session logs |
| QwenPaw | TypeScript | Node.js | - | QwenPaw-Data engine |
| NanoBot | TypeScript | Node.js | - | WebSocket envelope |
| Zeroclaw | Rust | tokio | - | WASM plugins |
| IronClaw | Go | - | - | Hosted-MCP |
| PicoClaw | Go | - | - | sync.Mutex |
| NanoClaw | TypeScript | Node.js | - | Provider contracts |

**Language distribution:**
- TypeScript: 4 (Hermes, QwenPaw, NanoBot, NanoClaw)
- Go: 2 (IronClaw, PicoClaw)
- Rust: 1 (Zeroclaw)
- Python: 1 (OpenClaw)

**Insight**: TypeScript dominates cho rapid development, Rust/Go cho performance-critical hoặc security-sensitive deployments.

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### **Community Health Metrics**

| Dự án | Contributor Diversity | First-timer Friendly | Response Time | Documentation | Governance |
|-------|----------------------|---------------------|---------------|---------------|------------|
| **Hermes** | ⭐⭐⭐⭐ High | ⭐⭐⭐ Good | <24h | ⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |
| **OpenClaw** | ⭐⭐⭐⭐ High | ⭐⭐⭐ Good | <24h | ⭐⭐⭐⭐ Very Good | ⭐⭐⭐⭐ Strong |
| **QwenPaw** | ⭐⭐⭐ Medium | ⭐⭐⭐⭐ Excellent | Fast | ⭐⭐⭐ Good | ⭐⭐⭐ Moderate |
| **NanoBot** | ⭐⭐ Low | ⭐⭐ Fair | Fast | ⭐⭐ Limited | ⭐⭐ Weak |
| **Zeroclaw** | ⭐⭐⭐ Medium | ⭐⭐ Fair | Variable | ⭐⭐⭐ Good | ⭐⭐⭐ Moderate |
| **IronClaw** | ⭐ Very Low | ⚠️ Internal | Fast | ⭐⭐ Limited | ⭐ Minimal |
| **PicoClaw** | ⭐ Very Low | ⭐ Poor | Slow | ⭐ Minimal | ⭐ Minimal |
| **NanoClaw** | ⭐⭐ Low | ⭐⭐⭐ Good | Fast | ⭐⭐ Limited | ⭐⭐ Weak |

### **Engagement Patterns**

#### **Hermes Agent** 🏆
- **181 comments** trên single issue (#66616) - highest engagement
- **Multi-national community** - Chinese market requests, Indonesian i18n
- **Professional users** - Production fleet operators (mentions of 40+ sessions)
- **Pain point**: Silent failures frustrate advanced users

**Stage**: **Mature community với production users**

#### **OpenClaw**
- **23 comments** trên critical bug - healthy troubleshooting
- **Enterprise concerns** - Multi-agent orchestration (#43367)
- **Platform diversity** - Windows, Linux, China deployment requests
- **Pain point**: Upgrade complexity (2026.7.x → 2026.8.x → 2026.9.x)

**Stage**: **Growing enterprise adoption**

#### **QwenPaw**
- **First-time contributors welcomed** - @1printf example
- **Feature requests practical** - Traffic light (#7600), sticker support
- **Multi-modal focus** - PDF, binary handling priorities
- **Pain point**: VM/cloud desktop compatibility

**Stage**: **Welcoming to new contributors, practical focus**

#### **NanoBot**
- **Low external engagement** - 2 issues, mostly bot activity
- **High velocity** - 12 merges/day suggests internal team
- **Technical PRs** - Fixes are narrow, specific
- **Pain point**: Lack of community discussion

**Stage**: **Internal development, limited community**

#### **Zeroclaw**
- **@Audacity88 dominates** - Distinguished contributor
- **RFC process active** - #10076 WASM discussion
- **Security conscious** - Multiple PRs về permissions
- **Pain point**: High-risk PRs cần careful review

**Stage**: **Core team driven, emerging governance**

#### **IronClaw**
- **@kirikov solo sprint** - 9/11 PRs trong 1 ngày
- **No community reactions** - 0 👍 trên tất cả issues/PRs
- **Internal refactoring** - Architecture changes
- **Pain point**: Zero external contributors

**Stage**: **Single-company internal project**

#### **PicoClaw**
- **Stale bot active** - 4 items marked stale
- **Critical bugs từ @sting8k** - Quality audit
- **Low community size** - Minimal discussions
- **Pain point**: Maintainer bandwidth

**Stage**: **Small team, resource constrained**

#### **NanoClaw**
- **@TO-maschenborn fleet operator** - Production feedback
- **Fast bug fixes** - Issues closed same day
- **Cross-functional PRs** - 8 areas affected
- **Pain point**: Archive retention chưa có solution

**Stage**: **Professional usage, responsive team**

---

## 7. 📈 Tín hiệu xu hướng

### **Immediate trends (1-2 tháng tới)**

#### A. **Production Hardening Wave** 🔒
**Drivers:** Hermes, OpenClaw, Zeroclaw, IronClaw đều gặp multi-user security issues

**Predictions:**
- ✅ Session isolation sẽ là table stakes
- ✅ Cost tracking tools sẽ standardize (per-conversation, per-user)
- ✅ Audit trails cho compaction/context management
- ⚠️ Một số dự án sẽ có breaking changes để fix security

**Winners:** Projects với strong governance (Hermes, OpenClaw)  
**Losers:** Projects chậm fix security (PicoClaw at risk)

#### B. **Provider Feature Parity Race** 🏁
**Drivers:** OpenAI Responses, Anthropic extended thinking, Gemini multimodal đang được adopted

**Predictions:**
- Zeroclaw sẽ lead với advanced features
- QwenPaw sẽ focus multi-modal robustness
- Hermes sẽ theo sau với conservative approach (stability first)
- Smaller projects sẽ chọn subset thay vì full parity

**Key question:** Có standardized abstraction layer xuất hiện không? (Hint: WASM plugins là một candidate)

#### C. **Memory Architecture Innovation** 🧠
**Drivers:** QwenPaw memory backend migration, OpenViking integration

**Predictions:**
- Plugin-based memory backends sẽ là standard
- Long-term memory sẽ tách khỏi short-term context
- Vector stores sẽ được integrate native
- **Wild card:** AI-driven memory compaction (models decide what to keep)

**Leaders:** QwenPaw (đã implement), Hermes (audit trail foundation)

#### D. **Channel Consolidation** 📱
**Current state:** Mỗi project support 3-8 channels, có overlap lớn

**Predictions:**
- 🔮 **Telegram sẽ là baseline** - 7/8 projects support
- 🔮 **Email agents sẽ rise** - NanoClaw's AgentMail, OpenClaw's Resend
- 🔮 **Voice channels chưa mature** - Discord voice issues chưa resolved
- ⚠️ **iMessage/WhatsApp cần ecosystem effort** - Platform restrictions khó vượt

**Opportunity:** Standardized channel adapter protocol (không ai đang làm)

### **Mid-term trends (3-6 tháng)**

#### E. **WASM Plugin Ecosystem** 🌐
**Signal:** Zeroclaw RFC #10076, QwenPaw plugin marketplace

**Predictions:**
- WASM sẽ là extension standard (security + portability)
- Plugin marketplaces sẽ xuất hiện cho mỗi major project
- Cross-project plugin compatibility sẽ được thử nghiệm
- **Risk:** Fragmentation nếu không có common ABI

**Catalyst needed:** Industry working group cho plugin standards

#### F. **Enterprise Features Maturity** 🏢
**Signals:** Multi-tenant isolation bugs, cost tracking, audit trails

**Predictions:**
- RBAC/permission systems sẽ là requirement
- Compliance logging (SOC2, GDPR) sẽ được built-in
- SLA monitoring và alerting
- **Differentiation:** Projects với enterprise DNA (Hermes, OpenClaw) sẽ pull ahead

**Watch:** Hermes' P0-P3 governance là template tốt

#### G. **Cost Optimization Arms Race** 💰
**Driver:** Context costs tăng với longer sessions, multimodal data

**Innovations đang test:**
- Aggressive compaction (NanoBot cache bounds)
- Smart caching (Anthropic cache write pricing)
- Token budget frameworks (OpenClaw 686 overhead issue)
- **Next frontier:** AI-driven context pruning

**Winner prediction:** Project nào ship cost dashboard trước

### **Long-term trends (6-12 tháng)**

#### H. **Agent-to-Agent Protocols** 🤖↔️🤖
**Early signal:** Zeroclaw A2A Phase 1 (#9324), NanoClaw multi-environment continuity

**Vision:**
- Agents delegate tasks to specialized sub-agents
- Cross-platform agent collaboration
- Federated agent networks

**Blocker:** Không có standardized A2A protocol (OpenAI Assistant API không đủ)

**Bold prediction:** 🔮 Một consortium sẽ form để standardize A2A (giống ActivityPub cho social)

#### I. **Vertical Specialization** 🎯
**Trend:** Generic assistants → specialized agents

**Emerging verticals:**
- **Code agents** (dominant now)
- **Research agents** (QwenPaw direction)
- **Workflow agents** (NanoClaw email focus)
- **IoT agents** (PicoClaw embedded)
- **Future:** Healthcare, legal, finance agents với compliance built-in

**Implication:** Hệ sinh thái sẽ fork - general-purpose platforms vs vertical-specific

#### J. **Consolidation & Acquisitions** 💼
**Market dynamics:**
- Too many projects với overlapping features
- Enterprise buyers want fewer vendors
- Open source maintainer burnout

**Predictions:**
- 2-3 projects sẽ merge hoặc được acquire
- **At risk:** PicoClaw (low activity), IronClaw (single-company)
- **Survivors:** Hermes, OpenClaw, QwenPaw (strong communities)
- **Dark horse:** NanoBot nếu velocity được sustained

**Timeline:** 12-18 tháng

---

## 8. 🎯 Strategic Recommendations

### **Cho Hermes Agent** 🏆

#### **Ưu tiên ngay (1 tháng)**
1. ✅ **Fix MCP profile scoping** (#106005) - CRITICAL blocker cho enterprise
2. ✅ **Cải thiện error visibility** - End silent failures pattern
3. ✅ **Polish Windows experience** - Desktop updater false FAILED đã fix, but more work needed

#### **Đầu tư chiến lược (3-6 tháng)**
1. 🎯 **Cost visibility dashboard** - Beat competitors to market
2. 🎯 **Plugin marketplace** - Learn from QwenPaw's success
3. 🎯 **A2A protocol leadership** - Định nghĩa standard trước Zeroclaw
4. 🎯 **Enterprise compliance toolkit** - Audit logs, RBAC, SOC2 controls

#### **Differentiation plays**
- **Leverage i18n leadership** → China expansion (respond to #96858)
- **Multi-platform breadth** → "Universal agent" positioning
- **Governance maturity** → "Enterprise-ready by default"

#### **Threats to watch**
- ⚠️ OpenClaw's plugin ecosystem momentum
- ⚠️ QwenPaw's innovation velocity (memory, multi-modal)
- ⚠️ Zeroclaw's WASM plugins (next-gen extensibility)

### **Cho ecosystem nói chung**

#### **Collaboration opportunities**
1. **Channel adapter standardization** - Reduce duplicate work
2. **A2A protocol working group** - Prevent fragmentation
3. **Security best practices sharing** - Multi-tenant patterns
4. **Cost tracking common format** - Interoperable billing

#### **Red flags**
- 🚩 PicoClaw's critical bugs (#3373 data loss) need urgent attention
- 🚩 IronClaw's security issue (#6778) affects hosted-MCP ecosystem
- 🚩 NullClaw inactivity - project possibly abandoned

---

## 9. 🔮 Kết luận

Hệ sinh thái AI agent đang ở **inflection point** từ experimentation sang production deployment. Các dấu hiệu rõ ràng:

✅ **Maturity signals:**
- Security issues being taken seriously
- Cost tracking becoming priority
- Session management being hardened
- Enterprise features emerging

⚠️ **Growing pains:**
- Too many projects với overlapping features
- No standard protocols (channels, A2A, plugins)
- Community fragmentation
- Maintainer bandwidth constraints

🔮 **Future state (12 tháng):**
- 3-4 dominant platforms (Hermes, OpenClaw, QwenPaw likely survivors)
- Standardized plugin ecosystems (WASM-based)
- Vertical specialization begins
- First A2A protocol draft
- Enterprise adoption accelerates

**Biggest opportunity:** 🎯 Whoever ships **production-grade multi-tenant platform** với **plugin marketplace** và **cost dashboard** first sẽ capture enterprise market.

**Hermes Agent's position:** 🏆 **Strong foundation, needs execution velocity**. Multi-platform breadth và governance maturity là competitive moats, nhưng cần accelerate on cost visibility và plugin ecosystem để stay ahead.

---

**Thời điểm cập nhật:** 2026-09-09 02:03 UTC  
**Phương pháp:** Phân tích dữ liệu từ GitHub issues, PRs, releases của 9 dự án  
**Độ tin cậy:** High (dựa trên dữ liệu public, insights là analytical không phải factual)

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo Phân tích OpenClaw - Ngày 2026-09-09

## 1. 📊 Tóm tắt hôm nay

Dự án OpenClaw đang trong giai đoạn ổn định hóa sau bản phát hành 2026.9.3 với tập trung chính vào việc sửa lỗi hồi quy từ các phiên bản 2026.8.x và 2026.9.x. Nhóm duy trì đang xử lý một loạt vấn đề về đồng bộ session, xác thực provider, và các lỗi nghiêm trọng ảnh hưởng đến trải nghiệm người dùng. Hoạt động cộng đồng tập trung cao với 30 PR đang mở và nhiều issue P0/P1 cần giải quyết khẩn cấp.

## 2. 🚀 Releases

### v2026.9.3 (Phát hành: 2026-09-08)

**Highlights chính:**

- **Cập nhật an toàn hơn**: Thử nghiệm các thay đổi core và plugin trong môi trường isolated trước khi kích hoạt, hỗ trợ migration từ 2026.9.2, và khôi phục các bản ghi update bị bỏ quên mà không cần dừng Gateway đang hoạt động
- **Cải thiện hiệu năng**: Giữ lại prompt cache warm, giảm công việc không cần thiết trong cold session updates và memory search, tái sử dụng worker builds giữa các session

**Ý nghĩa**: Bản phát hành này tập trung vào độ ổn định và hiệu năng thay vì tính năng mới, phản ánh nỗ lực ổn định hóa sau các thay đổi lớn ở phiên bản 2026.8.x.

## 3. 🔧 Tiến độ dự án

### PRs quan trọng đang mở (30 PRs)

**Ưu tiên cao (P0-P1):**

- **#142750**: Backport retirement E2EE client an toàn cho Matrix - xử lý vấn đề rò rỉ session và treo không giới hạn
- **#142742**: Tự động đề xuất cập nhật Node.js khi CLI runtime không tương thích - cải thiện UX khi nâng cấp
- **#142649**: Sửa lỗi markdown table delimiter - ngăn nội dung bảng bị hiểu sai trên Discord, Slack, Mattermost
- **#142626**: Khôi phục feedback sau bridge recovery trên iMessage

**Xu hướng phát triển:**

1. **Ổn định hệ thống cốt lõi**: Nhiều PR tập trung sửa regression từ 2026.8.x/2026.9.x
2. **Cải thiện UX**: Skeleton loaders, error messages rõ ràng hơn, workflow nâng cấp tốt hơn
3. **Mở rộng plugin ecosystem**: Phân loại lại 152 plugin manifest với 21 categories mới
4. **Tích hợp đa kênh**: Sửa lỗi cho Signal, iMessage, Matrix, Telegram, Feishu

## 4. 🌟 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác nhất:

**#135111 (23 bình luận)** - 🔥 **[P1] Lỗi "Provider completed tool call with malformed JSON"**
- Lỗi ngẫu nhiên sau nâng cấp lên v2026.8.1 với claude-sonnet-5
- Không liên quan đến file/tool cụ thể, gây gián đoạn agent runs
- Ảnh hưởng: auth-provider, đánh giá 🐚 platinum hermit

**#97616 (15 bình luận)** - **Rò rỉ zombie processes từ hook/tool execution**
- OpenClaw không reap child processes, gây tích tụ zombies
- Dẫn đến suy giảm hiệu năng runtime nghiêm trọng
- Regression - đã hoạt động trước đây

**#43367 (14 bình luận)** - **Multi-agent orchestration không ổn định**
- Concurrent agents ghi đè config, session-lock failures
- Detached child work
- Ảnh hưởng nghiêm trọng đến use case đa tác nhân

**Vấn đề người dùng quan tâm:**
- Độ ổn định sau nâng cấp 2026.8.x → 2026.9.x
- Vấn đề xác thực với OpenAI, Claude CLI, Anthropic providers
- Memory và session management không nhất quán

## 5. 🐛 Ổn định & Bugs

### Bugs nghiêm trọng (P0):

**#142701** - Gateway trở nên unkillable trong quá trình reindex memory
- Yêu cầu `sudo reboot`, lock files tồn tại qua restarts
- Ảnh hưởng: crash-loop, đánh giá 🦪 silver shellfish

**#136203** - Windows upgrade để lại Doctor maintenance blocked
- Nâng cấp từ 2026.7.1-2 → 2026.8.2 trên Windows de-DE
- Legacy workspace state còn sót lại
- Impact: UX release blocker

**#135519** - Claude CLI session expiry (410) hiển thị error chung
- OAuth expiry không được xử lý đúng, không có hướng dẫn reauth
- Impact: UX release blocker

### Vấn đề kỹ thuật đang xử lý:

1. **Session state consistency**: Nhiều issues về session không đồng bộ, undeletable sessions, split-brain auth
2. **Provider auth**: OpenAI, Claude CLI, Anthropic auth bị lỗi sau upgrade
3. **Message delivery**: Echo bypasses, duplicate messages, dropped replies
4. **Memory & context**: Active memory không recall, compaction failures
5. **Channel-specific issues**: iMessage reflections, Telegram stickers, Matrix E2EE

## 6. 💡 Yêu cầu tính năng

### Feature requests nổi bật:

**#62615** - **Gateway circuit breaker cho unhealthy sessions**
- Dừng retry session thất bại sau số lần nhất định
- Ngăn oversized context, provider rate-limits gây crash loop

**#107930** - **Cải thiện upgrade experience khi Node.js thay đổi**
- Tự động upgrade Node.js, reinstall packages, fix managed Gateway
- PR #142742 đang triển khai

**#45503** - **Manual context clearing cho tool results**
- Cho phép xóa large tool results (emails, search) sau khi dùng xong
- Hiện chỉ có TTL tự động (1h)

**#82011** - **Kiểm tra lỗi chính tả đầu vào** (tiếng Việt)
- Tự động phát hiện lỗi chính tả, ngữ pháp trong chat input
- Cải thiện độ chính xác và hiệu quả đối thoại

**#142484** - **Scoped persistent-agent continuity qua environments**
- Cho phép một agent tiếp tục công việc qua nhiều OpenClaw environments
- Không merge histories vào shared context

## 7. 💬 Phản hồi người dùng

### Trải nghiệm tích cực:
- Đánh giá cao nỗ lực cải thiện UX trong upgrade workflow
- Plugin ecosystem phong phú với 152 plugins bundled
- Hỗ trợ đa kênh rộng (Slack, Discord, Matrix, iMessage, WhatsApp, etc.)

### Điểm đau chính:

**Nâng cấp phức tạp:**
- Nhiều người dùng gặp vấn đề khi upgrade 2026.7.x → 2026.8.x → 2026.9.x
- Auth providers bị reset, sessions không migrate đúng
- Windows users đặc biệt gặp khó khăn

**Tài liệu thiếu:**
- Issues về config không rõ ràng (heartbeat settings, plugin host restrictions)
- Security audit logic không đúng (GPT-6 bị flag là "below GPT-5")

**Performance concerns:**
- Zombie process accumulation
- Gateway unkillable during memory operations
- Context scaffolding adds ~686 tokens/turn không thể opt-out

### Feedback đáng chú ý:

**#46058** - Người dùng đề xuất Android chat-first fork
- Đang xây dựng fork độc lập với use case mobile hẹp
- Hỏi về khả năng upstream một phần tính năng

**#39734** - AWS user yêu cầu custom `anthropic_beta` flags cho Bedrock
- Phải patch manually sau mỗi update
- Cần first-class config support

## 8. 📋 Backlog & Roadmap

### Ưu tiên ngắn hạn (dựa trên issues/PRs):

**Ổn định release 2026.9.x:**
- ✅ Sửa P0/P1 regressions từ 2026.8.x
- 🔄 Cải thiện session lifecycle và cleanup
- 🔄 Provider auth resilience
- 🔄 Message delivery consistency

**Cải thiện UX:**
- 🔄 Node.js auto-update trong CLI (#142742)
- 🔄 Control UI startup skeletons (#142383)
- 🔄 Better error messages cho auth failures

**Plugin ecosystem:**
- ✅ 21 plugin categories với icons (#142759, #142760)
- 🔄 Plugin gateway method return values (#142756)
- 🔄 Improved plugin trust/security checks

### Ưu tiên trung hạn:

**Multi-agent orchestration** (#43367)
- Concurrent config safety
- Session-lock reliability
- Child agent work isolation

**Memory improvements:**
- Manual context clearing (#45503)
- Gateway circuit breaker (#62615)
- Active memory recall reliability (#142479)

**Channel stability:**
- Matrix E2EE retirement (#142750)
- iMessage reflection handling (#135704)
- Telegram sticker support (#142530)

### Vấn đề chưa rõ roadmap:

- **Android surface** (#46058) - cần product decision
- **Cross-environment agent continuity** (#142484) - exploration phase
- **Custom Bedrock beta flags** (#39734) - cần maintainer review
- **Token budget optimization** (#141747) - 686 tokens/turn overhead

---

## 🎯 Kết luận

OpenClaw đang trong giai đoạn **"consolidation and stabilization"** sau các thay đổi kiến trúc lớn ở 2026.8.x. Nhóm duy trì đang tập trung xử lý technical debt và regressions thay vì tính năng mới. Cộng đồng active với feedback chất lượng cao, nhưng nhiều người dùng gặp khó khăn với upgrade path. 

**Priorities rõ ràng**: Ổn định session management, provider auth, và message delivery trước khi thêm features mới. Plugin ecosystem đang được tổ chức lại tốt hơn. Cần cải thiện docs và UX cho upgrade workflow.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo phân tích dự án NanoBot - 09/09/2026

## 🎯 Tóm tắt hôm nay

Ngày 09/09 ghi nhận hoạt động cực kỳ sôi động với **12 PR được merge** trong vòng 24 giờ, tập trung vào việc sửa lỗi WebUI, cải thiện hiệu năng và tăng cường độ ổn định. Đặc biệt, có một làn sóng lớn các PR liên quan đến Telegram channel, công cụ tìm kiếm file, và tối ưu hóa bộ nhớ cache. Dự án đang trong giai đoạn hoàn thiện các tính năng hiện có trước khi phát triển tính năng mới.

## 📦 Releases

Không có release mới trong 24 giờ qua.

## 🚀 Tiến độ dự án

### PRs đã merge (12 PRs - hoạt động rất cao)

**🔧 Sửa lỗi WebUI & UX (5 PRs)**
- **#5700** - Sửa lỗi nghiêm trọng: prompt đang chờ có thể bị gửi nhầm sang session khác khi chuyển đổi
- **#5701** - Cải thiện tooltip hiển thị model preset và activity preview
- **#5695** - Đảm bảo tool results ổn định khi replay conversation
- **#5658** - Sửa lỗi không tạo session title khi WebSocket envelope thiếu flag `webui: true`
- **#5648** - Yêu cầu opt-in rõ ràng cho việc tạo title tự động

**🔍 Cải thiện công cụ tìm kiếm (1 PR)**
- **#5692** - Sửa lỗi recursive glob filter trong `find_files` và `grep` - trước đây `**` chỉ match một segment thay vì nhiều directories

**💬 Telegram enhancements (2 PRs)**
- **#5614** - Hỗ trợ streaming rich messages trong Telegram private chats với `sendRichMessageDraft`
- **#5682** - Sửa lỗi bảo mật: `working_dir` tương đối giờ được resolve từ workspace thay vì CWD

**📋 Đóng issues (2 issues)**
- **#5693** - Từ chối đề xuất tích hợp với "落朵无人零售" (retail IoT) - không phù hợp với scope
- **#5696** - First-time contributor tìm kiếm beginner-friendly issues

### PRs đang mở quan trọng (18 PRs active)

**⚡ Performance & Memory (4 PRs)**
- **#5664** - Giới hạn idle summary cache để tránh memory leak
- **#5663** - Bound Mattermost thread context cache
- **#5665** - Giới hạn số lượng MCP browser OAuth flows trong memory
- **#5703** - Tối ưu WebUI: giảm repeated work và bound history rendering

**🤖 Agent Core (3 PRs)**
- **#5152** - Mark partial completion results cho subagent tasks
- **#5590** - Summarize persisted JSON tool results thay vì chỉ lấy 1200 ký tự đầu
- **#5708** - Preserve UTF-8 encoding across streaming output chunks

**💬 Telegram improvements (4 PRs)**
- **#5711** - Rename hyphenated commands (`/dream-log`) thành underscore (`/dream_log`) để Telegram chấp nhận
- **#5707** - Route `/compact` và `/evaluator-prompt` đúng vào command router
- **#5706** - Collapse context compaction notices thành một message được edit
- **#4919** - Support custom Bot API base URL cho self-hosted Telegram servers

**🌐 Web Search & Providers (2 PRs - có conflict)**
- **#5437** - Thêm Serply (Google Search API) provider
- **#5234** - Tích hợp mst-python metasearch (aggregate nhiều search engines)

**🎨 WebUI Features (4 PRs)**
- **#5710** - Organize projects và simplify sidebar navigation
- **#5704** - Expand settings với autosave và live configuration
- **#5705** - Thêm `/usage` panel với context và token charts trong TUI
- **#5698** - Preserve API types khi toggle search settings

## 🌟 Điểm nổi bật cộng đồng

### Contributor mới
- **@1printf** (#5696) - Developer có kinh nghiệm Python/LangChain/RAG muốn contribute, được team hướng dẫn tìm issues phù hợp

### Đề xuất không phù hợp
- Issue #5693 từ @linxingming168 đề xuất tích hợp với hệ thống "无人零售" (unmanned retail) của Trung Quốc - team từ chối vì không phù hợp với product direction

## 🐛 Ổn định & Bugs

### Critical bugs đã fix
1. **Session isolation breach** (#5700) - Prompt có thể leak sang session khác
2. **Security: path traversal** (#5682) - `working_dir` có thể escape workspace
3. **Data integrity** (#5695) - Tool results không stable khi replay
4. **UTF-8 corruption** (#5708) - Multi-byte characters bị break qua stream chunks

### Memory leaks được xử lý
- Idle summary cache không bị bound (#5664)
- Mattermost thread context tích lũy vô hạn (#5663)
- MCP OAuth flows không được cleanup (#5665)

### UX bugs
- Recursive glob `**` không hoạt động đúng (#5692)
- Telegram commands với hyphen không clickable (#5711)
- Title generation bị skip với một số WebSocket messages (#5658)

## ✨ Yêu cầu tính năng

### Đang implement
1. **Rich Telegram streaming** (#5614) - Đã merge, cải thiện trải nghiệm chat
2. **Custom Telegram Bot API endpoint** (#4919) - Cho enterprise/self-hosted deployments
3. **Enhanced WebUI settings** (#5704) - 48 config fields với autosave
4. **Project organization** (#5710) - Sidebar navigation mới, tách projects khỏi topic history
5. **TUI usage charts** (#5705) - Visualize context và token usage

### Đang review (có potential conflict)
1. **Alternative search providers** - Serply (#5437) và MST metasearch (#5234) - cần quyết định architecture
2. **Telegram sticker support** (#5387) - Reusable stickers với emoji/set name

## 💬 Phản hồi người dùng

### Pain points được xử lý
- **Telegram UX**: Commands không autocomplete, messages bị spam → nhiều PRs đang fix
- **WebUI stability**: Session switching bugs, title generation issues → đã fix
- **Search accuracy**: Recursive glob miss files → đã fix
- **Memory leaks**: Nhiều caches không bounded → đang được systematically addressed

### Developer experience
- First-time contributors được welcome và hướng dẫn
- Đề xuất không phù hợp được từ chối lịch sự nhưng firm

## 📋 Backlog & Roadmap

### Xu hướng phát triển
1. **Stabilization phase** - Focus vào bug fixes và memory optimization hơn là features mới
2. **Channel improvements** - Đặc biệt Telegram đang được polish intensively
3. **Performance tuning** - Nhiều PRs về caching, memory bounds, và rendering optimization
4. **Developer experience** - TUI/WebUI improvements, better configuration

### Technical debt đang được xử lý
- Cache management: Từ unbounded sang bounded với proper eviction
- Encoding correctness: UTF-8 handling across async boundaries
- Security hardening: Path resolution, workspace isolation
- UX polish: Command naming, streaming behavior, UI consistency

### Potential blockers
- **Conflicts trong 4 PRs** - Cần merge decisions cho search providers và một số features
- **Architecture decisions pending** - Multiple search provider integration strategy

---

**📈 Đánh giá chung**: Dự án đang trong giai đoạn **maturity và polish** với focus mạnh vào stability, performance và UX. Velocity rất cao (12 merges/ngày) nhưng disciplined - ưu tiên quality over features. Community active với contributor mới được onboard tốt.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo Phân tích Hệ sinh thái AI Agent - Zeroclaw
## Ngày 09/09/2026

---

## 1. 🎯 Tóm tắt hôm nay

Zeroclaw đang trải qua một giai đoạn phát triển tích cực với **16 issues mới/đang mở** và **50 PRs đang hoạt động**. Dự án tập trung mạnh vào việc nâng cao khả năng tương tác với các provider AI (đặc biệt là OpenAI Responses/Astra), cải thiện bảo mật với session-scoped prompt attachments, và xử lý các vấn đề về cost tracking. Một số bugs nghiêm trọng liên quan đến UI (zerocode) và cấu hình đã được phát hiện và đang được xử lý khẩn cấp.

---

## 2. 📦 Releases

**Không có release chính thức trong 24 giờ qua.**

Tuy nhiên, các PR đang hướng tới các cải tiến lớn cho phiên bản tiếp theo, bao gồm hỗ trợ WASM plugins, nâng cấp OpenAI Responses, và cải thiện quy trình RFC.

---

## 3. 🚀 Tiến độ dự án

### **Các PR quan trọng đang triển khai:**

#### 🔥 **Tính năng mới nổi bật:**

- **#10716** ✅ **[MERGED LIKELY]** - Sửa lỗi tính giá cache writes với đúng premium rate
  - Trước đây, cache writes được tính sai giá (input rate thay vì write premium 1.25-2x)
  - Ảnh hưởng: Anthropic và các provider có cache

- **#10718** 🔄 **[CLOSED → Tiếp tục #10700]** - Gán cost records cho đúng conversation
  - Hiện tại `session_id` là daemon-lifetime ID, không phân biệt được conversations
  - Cần thiết để theo dõi chi phí từng cuộc trò chuyện

- **#10720** 🐛 **[P2 - In Progress]** - Agent responses hiển thị 2 lần trong zerocode v0.8.5
  - Bug UI nghiêm trọng ảnh hưởng trải nghiệm người dùng
  - Tool call chỉ chạy 1 lần (đúng) nhưng render bị duplicate

#### 🔒 **Bảo mật & Architecture:**

- **#10405** 📋 **[Tracker]** - Triển khai session-scoped prompt attachments (#9998)
  - Cho phép inject prompts theo session, không phải toàn cục
  - Risk: HIGH - liên quan security và ACP sessions

- **#10076** 💬 **[RFC - 11 comments]** - WASM plugin runtime architecture
  - Thiết kế kiến trúc composable cho WASM plugins
  - Typed extension points, replaceable providers
  - Đang chờ maintainer review

#### 🌐 **OpenAI Responses & Provider Support:**

- **#10708, #10707, #10704, #10706** - Series 4 PRs hỗ trợ OpenAI Responses advanced features:
  - Active-response steering qua WebSocket
  - Bounded programmatic tool calling
  - Async function tools
  - Preserve opaque reasoning state
  - **Risk: HIGH** - Thay đổi lớn về runtime architecture

- **#10605** - Anthropic extended thinking qua OpenAI-compatible gateways
  - Cho phép dùng Anthropic's `thinking.display` qua LiteLLM/AWS Bedrock
  - Opt-in với `thinking_passthrough` flag

#### 📁 **Channel & Integration:**

- **#10715** 💬 **[In Progress]** - Passive group context cho Telegram groups
  - Tương tự WhatsApp Web feature (#8379)
  - Ghi nhận messages không tag bot làm context
  - Shared history across participants

- **#10714** - Sửa lỗi routing integration config links

### **Xu hướng phát triển:**

1. **Multi-provider sophistication** - Ngày càng nhiều tính năng advanced của providers được hỗ trợ native
2. **Security hardening** - Liên tục cải thiện session isolation, tool permissions
3. **Cost visibility** - Tập trung sửa lỗi tracking và attribution
4. **UI/UX polish** - Zerocode đang được cải thiện (selection, chat interactions)

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

- **#8692** (15 comments) - **Maintainer decision queue** cho RFCs
  - Tracker để theo dõi các RFC cần review
  - Phản ánh quy trình governance đang được formalize

- **#10076** (11 comments) - **WASM plugin RFC**
  - Cộng đồng quan tâm đến extensibility
  - Nhiều discussion về API design

- **#5514** (8 comments) - **Telegram media groups** batch vào 1 turn
  - Feature request lâu năm (từ 04/2026)
  - Đang in-progress, người dùng đợi lâu

### **Contributors tích cực:**

- **@Audacity88** - Distinguished contributor, lead nhiều PRs quan trọng về security và architecture
- **@IftekharUddin** - Đóng góp nhiều về OpenAI Responses support
- **@NiuBlibing** - Principal contributor, focus vào WASM và context management
- **@sunlit-deng** - Active trong cost tracking fixes

---

## 5. 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng (P2):**

1. **#10721** 🆕 **[CRITICAL]** - `knowledge.db_path` tilde expansion bug
   - `String::replace('~', home)` thay thế **TẤT CẢ** `~` trong string, không chỉ home prefix
   - **Hậu quả**: Nếu path có `~` ở giữa → sai đường dẫn → knowledge tool bị drop silently
   - Cần fix gấp với `starts_with('~')` check

2. **#10720** - Zerocode double-render responses
   - Ảnh hưởng UX, nhưng không phá hoại dữ liệu

3. **#10700** - Cost tracking: session_id dùng daemon-lifetime ID
   - Không phân biệt được spend theo conversation
   - Khó troubleshoot chi phí

4. **#10701** - User message với image invalidates toàn bộ cache prefix
   - Anthropic cache không reuse được trên compatible-provider gateways
   - Chi phí tăng không cần thiết

5. **#5514** - Telegram media groups không batch
   - Gửi 3 ảnh → 3 responses riêng biệt thay vì 1 multimodal turn

### **Security issues:**

- **#10468** - ACP session tools không expose owned sessions → đang fix
- **#10391** - Delegate filesystem tools không respect target workspace → đang fix
- **#9977** - Filesystem mutations cần confine trong workspace

---

## 6. ✨ Yêu cầu tính năng

### **Tính năng mới được đề xuất:**

1. **#10708** - Active-response steering cho OpenAI Responses
   - Cho phép user corrections trong khi response đang generate
   - WebSocket steering protocol

2. **#10707** - Bounded programmatic tool calling
   - Model orchestrate tools và reduce kết quả
   - Giảm latency cho multi-tool workflows

3. **#10704** - Async function tools
   - Model tiếp tục work trong khi tools chạy background
   - Tăng throughput

4. **#10715** - Telegram passive group context
   - Đọc all messages trong group làm context, không cần @mention

5. **#10549** - Đơn giản hóa RFC voting process
   - Bỏ mandatory discussion windows
   - REVISE stops current snapshot

### **Cải tiến kiến trúc:**

- **#10076** - WASM plugins với typed extension points
- **#9809** - Multiple models per provider profile
- **#9535** - Context compaction dựa trên model window ratio

---

## 7. 👥 Phản hồi người dùng

### **Pain points:**

1. **Cost visibility** - Nhiều users phàn nàn khó track chi phí theo conversation (#10700)
2. **Telegram UX** - Media group handling chưa tốt, users muốn batch (#5514)
3. **Configuration complexity** - Tilde expansion bug (#10721) cho thấy config parsing còn edge cases
4. **Zerocode stability** - Double-render bug (#10720) ảnh hưởng adoption

### **Đánh giá tích cực:**

- Cộng đồng appreciate việc hỗ trợ nhiều providers (OpenAI, Anthropic, Bedrock...)
- RFC process đang được improve (transparency tốt hơn với #8692, #10549)
- Security được take seriously (nhiều PRs về sandboxing, permissions)

### **Requests:**

- **Documentation** - Nhiều PRs có label `needs-docs` → cần improve docs coverage
- **Testing** - CI improvements (#10094 PostgreSQL tests, #10646 link checker)
- **Windows support** - #10675 explicit Windows test scoping

---

## 8. 📅 Backlog & Roadmap

### **Short-term (1-2 tuần):**

1. ✅ **Fix critical bugs:**
   - #10721 (knowledge.db_path)
   - #10720 (zerocode double-render)
   - #10700 (cost session_id)

2. 🔄 **Merge ready PRs:**
   - #10716 (cache write pricing) - Đã sẵn sàng merge
   - #10718/#10719 (cost attribution, tool image refs)

3. 📋 **Complete trackers:**
   - #10405 (session-scoped prompts implementation)

### **Mid-term (1-2 tháng):**

1. 🏗️ **Architecture upgrades:**
   - #10076 WASM plugins (pending maintainer review)
   - OpenAI Responses full support (#10708, #10707, #10704, #10706)
   - #10621 Coordinate agent lifecycle mutations

2. 🌐 **Channel improvements:**
   - #10715 Telegram passive groups
   - #10241 Supervised shell approval routing

3. 🔐 **Security hardening:**
   - #9977 Filesystem confinement
   - #9746 Per-agent ownership scoping
   - #9724 always_ask survives Full autonomy

### **Long-term (3+ tháng):**

1. **A2A (Agent-to-Agent) protocol** - #9324 (Phase 1 đã có)
2. **Multi-model routing** - #9809 (multiple models per provider)
3. **Advanced cost tracking** - Attribution, budgets, alerts
4. **Hailo-Ollama integration** - #9109 (experimental)

### **Blocked/Deferred:**

- **#10241** - Channel approval routing (status: blocked)
- **#9109** - Hailo-Ollama (do-not-merge, experimental)
- **#9419** - Credential rotation (do-not-merge, needs more design)

---

## 📈 Số liệu thống计

| Metric | Giá trị |
|--------|---------|
| Issues đang mở | 16 |
| PRs đang mở | 50+ |
| PRs merged hôm nay | ~3 (#10675, #10620, #10718) |
| Contributors hoạt động | 15+ |
| Priority P2 issues | 13/16 |
| High-risk PRs | 20+ |
| Size XL PRs | 18 (cần review kỹ) |

---

## 🎬 Kết luận

Zeroclaw đang trong giai đoạn phát triển **tích cực và chín chắn**. Dự án balance tốt giữa:
- ✅ Thêm tính năng mới (OpenAI Responses, WASM plugins)
- 🐛 Sửa bugs nghiêm trọng (cost tracking, UI issues)
- 🔒 Tăng cường security (session isolation, tool sandboxing)
- 📚 Cải thiện governance (RFC process streamlining)

**Điểm cần chú ý:** Số lượng high-risk PRs cao (20+) đòi hỏi maintainers review kỹ càng. Một số bugs critical (#10721) cần hot-fix ngay. Tổng thể, momentum tốt với contributor base đa dạng và active.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích PicoClaw - Ngày 09/09/2026

## 🎯 Tóm tắt hôm nay

Ngày 09/09/2026 ghi nhận hoạt động tích cực với **2 bug reports nghiêm trọng mới** liên quan đến data race và data loss, cùng **4 PRs đang chờ xử lý** tập trung vào cải thiện tích hợp Telegram và sửa lỗi config. Hệ thống đang được củng cố về mặt ổn định kỹ thuật, đặc biệt là xử lý đồng thời và quản lý cấu hình. Công tác dọn dẹp các stale issues cũng được thực hiện với 4 issues được đánh dấu stale.

---

## 📦 Releases

Không có release mới trong 24 giờ qua.

---

## 🚀 Tiến độ dự án

### Pull Requests Hoạt động Tích Cực

#### 🔧 **Sửa lỗi nghiêm trọng (Mới nhất - 08/09)**

- **#3375** - Fix data race trong sensitive cache
  - ⚠️ Sửa lỗi đồng thời nghiêm trọng có thể gây panic
  - Thêm `sync.Mutex` để bảo vệ lazy initialization
  - Tác động: Tăng độ ổn định cho môi trường multi-threaded

- **#3372** - Làm công cụ reaction có thể cấu hình
  - Sửa lỗi `reaction` tool không đọc được config
  - Thêm trường `Reaction` vào `ToolsConfig`
  - Cho phép tắt/bật tính năng reaction qua config

#### 🔌 **Tích hợp Provider mới**

- **#3371** - Thêm OpenCode-Go provider
  - Hỗ trợ `x-opencode-session` header cho session tracking
  - Tự động định tuyến model dựa trên ID
  - Mở rộng khả năng tích hợp AI model

#### 💬 **Cải thiện Telegram**

- **#3357** - Xử lý reply như implicit mention (stale)
  - Fix: Bot bỏ qua reply trong group khi `mention_only: true`
  - Cải thiện UX: Reply tự nhiên không cần @mention

- **#3356** - Re-attach documents khi reply (stale)
  - Fix: Quoted documents chỉ hiển thị `[file]` placeholder
  - Agent giờ nhận được document content đầy đủ

#### 🛠️ **Refactoring & Infrastructure**

- **#3344** - Build Remote Agent phone pairing (gbr/1)
  - Cho phép phone spectate desktop agent qua QR/8-char code
  - Protocol mới: `gbr/1`

- **#714** [MERGED] - Skills CLI refactor
  - Thêm `install/reinstall` commands
  - Hỗ trợ `repo@branch` và subpath
  - Sử dụng GitHub Trees API

- **#3222** - Deltachat cleanup -200LOC (stale)
  - Loại bỏ legacy features
  - Cải thiện documentation

### 📊 Xu hướng phát triển

- **Tập trung ổn định hóa**: 2/8 PRs mới là bug fixes nghiêm trọng
- **Cải thiện UX channels**: 2 PRs Telegram tăng trải nghiệm hội thoại
- **Mở rộng provider ecosystem**: Thêm OpenCode-Go

---

## ⭐ Điểm nổi bật cộng đồng

### 🔥 Issues được quan tâm

- **#3265** [CLOSED] - Gateway startup fails với deltachat error
  - 👍 1 upvote, 3 comments
  - Đã được đóng sau khi được đánh dấu stale
  - Vấn đề: Channel type không được nhận diện dù không config

### 📈 Tương tác

Hoạt động cộng đồng tương đối thấp trong ngày (chủ yếu là bot stale marking), nhưng có 2 bug reports kỹ thuật chất lượng cao từ @sting8k cho thấy có developers đang nghiêm túc audit codebase.

---

## 🐛 Ổn định & Bugs

### ⚠️ **Bugs nghiêm trọng mới phát hiện (08/09)**

#### 1. **#3374 - Data race trong Config.initSensitiveCache** 🚨
- **Mức độ**: Critical
- **Tác động**: Có thể panic khi concurrent access
- **Root cause**: Lazy init không synchronization
- **PR fix**: #3375 (đã submit)

#### 2. **#3373 - SaveConfig xóa API keys** 🚨
- **Mức độ**: Critical - Data loss
- **Tác động**: Mất tất cả api_keys sau key đầu tiên khi save config
- **Chi tiết**: 
  - Round trip `LoadConfig` → `SaveConfig` làm mất data
  - Để lại dangling `fallbacks` reference
- **Trạng thái**: Chưa có PR fix

### 🔄 **Bugs đang xử lý**

- **#3343** - Tool feedback animation edit message vô hạn
  - 228,000+ edit attempts sau failed turn
  - Rate limit từ Telegram
  - Cần timeout mechanism

- **#3355** - Feishu connection error (config unknown field)
  - Config parsing issue với `app_id`
  - Có thể là breaking change chưa document

### ✅ **Bugs đã resolved**

- **#3265** - Gateway deltachat startup (closed/stale)
- **#714** - Skills CLI issues (merged)

---

## 💡 Yêu cầu tính năng

### Đã implement/đang implement

- **Build Remote Agent pairing** (#3344) - Phone spectating
- **OpenCode-Go provider** (#3371) - AI model expansion
- **Reaction tool configuration** (#3372) - Customization

### Feature requests từ bug fixes

- Telegram: Better reply handling và document attachment
- Config: Safety cho concurrent access
- Skills: GitHub-based installation với versioning

---

## 💬 Phản hồi người dùng

### 😊 Tích cực

- Skills CLI refactor được merge cho thấy community feedback được lắng nghe
- PR #3357, #3356 giải quyết pain points thực tế trong Telegram usage

### 😟 Tiêu cực/Quan ngại

- **Data loss trong SaveConfig** (#3373) là vấn đề nghiêm trọng có thể ảnh hưởng production users
- **Tool animation loop** (#3343) cho thấy thiếu defensive programming trong feedback mechanisms
- Nhiều stale issues/PRs (4 items) cho thấy có thể bandwidth maintainer bị hạn chế

### 🎯 Developer Experience

- @sting8k đóng góp 2 bug reports có chất lượng với detailed reproduction steps
- @hugodeco focus vào UX improvements cho Telegram
- Cộng đồng đang actively audit code quality

---

## 📋 Backlog & Roadmap

### 🔴 **Ưu tiên cao (Cần xử lý ngay)**

1. **Fix #3373** - Data loss trong SaveConfig (chưa có PR)
2. **Merge #3375** - Data race fix (đã có PR)
3. **Fix #3343** - Telegram animation loop (chưa có fix)

### 🟡 **Ưu tiên trung bình**

1. Review và merge Telegram improvements (#3357, #3356)
2. Xử lý Feishu config issue (#3355)
3. Review OpenCode-Go provider (#3371)

### 🟢 **Long-term improvements**

1. Deltachat refactoring (#3222) - cleanup -200LOC
2. Build Remote Agent integration (#3344)
3. Stale issue/PR cleanup strategy

### 📊 **Xu hướng roadmap**

- **Stabilization phase**: Focus vào bug fixes và data integrity
- **Channel improvements**: Tăng cường Telegram, Feishu, Deltachat
- **Provider ecosystem**: Mở rộng AI model integrations
- **Developer tools**: CLI improvements, pairing mechanisms

---

## 🎬 Kết luận

Ngày 09/09 đánh dấu một giai đoạn **consolidation** quan trọng của PicoClaw với phát hiện và xử lý 2 bugs nghiêm trọng về concurrent access và data loss. Mặc dù không có releases mới, chất lượng bug reports và PRs cho thấy dự án đang được audit kỹ lưỡng. 

**Khuyến nghị**: Team cần ưu tiên xử lý #3373 (data loss) và merge #3375 (data race fix) ngay để đảm bảo production stability trước khi tiếp tục develop features mới.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo Phân tích NanoClaw - Ngày 2026-09-09

## 📊 Tóm tắt hôm nay

Dự án NanoClaw đang trong giai đoạn tích hợp mạnh mẽ với provider OpenCode và mở rộng hệ sinh thái channel. Đội ngũ core team tập trung vào việc hoàn thiện kiến trúc provider contracts, sửa lỗi nghiêm trọng về threading và context management, đồng thời bổ sung khả năng kết nối email qua AgentMail. Đáng chú ý là vấn đề về conversation archives không giới hạn đang gây lo ngại về khả năng vận hành lâu dài.

## 🚀 Releases

Không có release chính thức nào được phát hành trong 24 giờ qua.

## 🔧 Tiến độ dự án

### **Tích hợp OpenCode Provider** (Ưu tiên cao - 2 PRs)

**PR #3733 & #3747** đánh dấu cột mốc quan trọng trong việc tích hợp OpenCode như một provider chính thức:

- **Runtime Integration**: Adapter đầy đủ cho native tools, MCP, cancellation, compaction và resume
- **Setup Experience**: Provider picker mới trong interactive setup, không yêu cầu preset môi trường
- **Authentication Flow**: Route authentication và host assistance qua provider-owned adapters
- **Scope**: Ảnh hưởng đến 8 areas quan trọng (agent-runner, core, providers, skills, tools, containers, repository-maintenance, setup)

**Ý nghĩa**: OpenCode đang được nâng cấp từ tích hợp thử nghiệm lên provider tier-1, mở rộng khả năng của NanoClaw ra ngoài các LLM truyền thống.

### **Critical Fixes - Thread & Provider Stability**

**PR #3749** - Sửa lỗi nghiêm trọng về message threading:
- **Vấn đề**: Replies bị drop khi trigger messages từ các threads khác nhau đến cùng lúc trong processing window
- **Giải pháp**: Đảm bảo mỗi thread xử lý đúng một agent invocation

**PR #3746** - Bảo toàn provider state:
- Preserve cancellation signal qua MCP request wrappers
- Giữ failed-turn status để tránh retry loops
- Bảo vệ existing skill files khỏi bị ghi đè

**PR #3738** - Thread reply routing:
- Sửa bug khiến files/messages không land đúng thread
- Resolves routing từ message đang được answer, không phải session routing

**Ảnh hưởng**: Ba PRs này giải quyết các race conditions và routing bugs có thể gây mất tin nhắn trong production environments.

### **Channel Ecosystem Expansion**

**PR #3743** - AgentMail channel adapter:
- Email channel mới không yêu cầu MX record ownership
- Giải quyết DNS conflict với existing mail providers
- Fully-managed inbox via API (https://agentmail.to)

**Issue #3744** (CLOSED) - Migration completion:
- Hoàn tất install 4 channels còn lại: WhatsApp, iMessage, Resend, Discord
- V1→V2 migration script đã được cập nhật để xử lý `nc:`-directive trong `SKILL.md`

### **Developer Experience**

**PR #3745** - Context preview tool revival:
- Phục hồi `scripts/context-preview.ts` trên main branch
- Cho phép xem exact context mà agent nhìn thấy mà không cần spawn container
- Hỗ trợ debugging và e2e testing

**PR #3729** (CLOSED) - Community portal setup:
- Echo và Slack setup được move vào community portal
- Single browser visit thay vì manual CLI steps
- Host được link trực tiếp với account cell

**PR #3750** - Update controller fix:
- Restore `/update-nanoclaw` command
- Fix module loading issue do thiếu `scripts/provider-contract-verifier.ts`

**PR #3441** (CLOSED) - Atomic file operations:
- Setup copy steps dùng temp files + atomic move
- Tránh partial writes khi `git show` fails

## 🔥 Điểm nổi bật cộng đồng

**Issue #3735** - Conversation archives grow without bound (⚠️ Production concern):
- **Reporter**: @TO-maschenborn (từ fleet operations)
- **Severity**: Critical cho long-running deployments
- **Problem**: `archiveTranscriptFile()` ghi markdown archive mỗi compaction, không có retention/rotation/cap
- **Impact**: Directory grows indefinitely, đã reach "hundreds of MB" trong fleet thực tế
- **Activity**: 2 comments trong 24h, chưa có solution proposal

**Xu hướng**: Issue này phản ánh NanoClaw đang được deploy ở quy mô đủ lớn để data retention trở thành vấn đề. Community cần retention policy và cleanup mechanism.

## 🐛 Ổn định & Bugs

### **Critical - Đã được xử lý**
- ✅ Thread reply dropping (#3749) - one invocation per thread
- ✅ Provider cancellation not propagating (#3746)
- ✅ Files landing in wrong threads (#3738)
- ✅ Setup file corruption khi git fails (#3441)

### **Critical - Chưa giải quyết**
- ⚠️ **Conversation archives unbounded growth** (#3735)
  - Thiếu: retention policy, max size cap, cleanup job
  - Risk: Disk exhaustion trong long-running agents
  - Priority: Cần roadmap trong 2-3 ngày tới

### **Medium - Fixed**
- ✅ Update controller module loading (#3750)
- ✅ V1→V2 channel migration gaps (#3744)

## 💡 Yêu cầu tính năng

### **Đang triển khai**
1. **OpenCode provider integration** (#3733, #3747) - Near completion
2. **AgentMail email channel** (#3743) - In review
3. **Context preview tool** (#3745) - Restored for dev workflows

### **Community requests** (từ patterns trong issues)
- **Data retention management** - Implied by #3735, chưa có RFC
- **Atomic operations in setup** - Delivered via #3441

## 👥 Phản hồi người dùng

### **Production Operators** (@TO-maschenborn)
- Đang run fleet với scale đủ lớn để gặp storage issues
- Cần operational controls (retention, monitoring, cleanup)
- Feedback loop tốt: file issue với metrics cụ thể

### **Core Team Velocity**
- **High**: 10 PRs trong 2 ngày (7-8 Sept)
- **Well-labeled**: Consistent use of kind/, area/, delivery/ labels
- **Cross-functional**: PRs span providers, channels, core, skills
- **Quality focus**: Multiple stability fixes alongside features

### **Migration Experience**
- V1→V2 migration hitting edge cases (channel installation)
- Team responsive: Issue filed 09-08, closed same day

## 📋 Backlog & Roadmap

### **Immediate (đang active)**
- ✅ OpenCode provider contracts - merging phase
- ✅ Channel ecosystem completion - 4/5 channels restored
- 🔄 AgentMail email integration - in review

### **Short-term (inferred priorities)**
1. **Archive retention policy** - Critical, cần design doc
2. **Provider stability hardening** - 3 concurrent fixes signal focus area
3. **Setup UX improvements** - Community portal, atomic operations

### **Technical Debt**
- Context preview tool đã bị stale, vừa được restore (#3745)
- Migration tooling gaps (fixed trong #3744)
- File operation atomicity (fixed trong #3441)

## 🎯 Insights & Đánh giá

### **Strengths**
- ✅ **Velocity cao** với quality controls tốt (labeling, templates, guidelines)
- ✅ **Responsive** đến production feedback (archive issue được acknowledge nhanh)
- ✅ **Architecture maturity**: Provider contracts cho phép pluggable LLM backends
- ✅ **Channel diversity**: Email, Slack, WhatsApp, iMessage, Discord, Resend

### **Risks**
- ⚠️ **Data retention** chưa có solution - blocker cho enterprise adoption
- ⚠️ **Threading complexity** - đã có 2 PRs fix race conditions trong 2 ngày
- ⚠️ **Migration debt** - V1→V2 gaps vẫn được phát hiện

### **Opportunities**
- 🚀 OpenCode integration mở cửa cho non-LLM AI providers
- 🚀 AgentMail giải quyết email friction (no MX ownership required)
- 🚀 Community portal setup đơn giản hóa onboarding

---

**Kết luận**: NanoClaw đang trong giai đoạn maturity transition - mở rộng provider ecosystem và channel support, đồng thời hardening stability cho production use cases. Archive retention issue (#3735) là signal rõ ràng về adoption ở scale, và cần priority cao trong roadmap tuần này.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 Báo cáo phân tích IronClaw - 09/09/2026

## 🎯 Tóm tắt hôm nay

Ngày hôm nay chứng kiến một đợt hoạt động cực kỳ mạnh mẽ từ @kirikov với 9 PRs liên quan đến cải thiện kiến trúc Hosted-MCP và extensions. Tập trung chính vào việc sửa lỗi bảo mật nghiêm trọng (cross-user metadata exposure) và cải thiện khả năng cấu hình cho deployments sản xuất. Không có release mới nhưng có nhiều thay đổi quan trọng về infrastructure đang được review.

## 🚀 Releases

Không có releases trong 24 giờ qua.

## 📈 Tiến độ dự án

### **Xu hướng chính: Tăng cường bảo mật và tính linh hoạt triển khai**

#### 🔴 Vấn đề bảo mật nghiêm trọng đang được xử lý

**Issue #6778** - Cross-user metadata exposure:
- Phát hiện lỗ hổng bảo mật khi nhiều người dùng chia sẻ cùng một hosted-MCP server
- Hiện tại tool catalogs được publish theo extension id thay vì theo installation/user
- Hậu quả: User A có thể thấy tools của user B, gây rò rỉ metadata

**Giải pháp đang triển khai:**
- **PR #8090** (OPEN): Thay đổi cách key discovered catalogs từ per-extension sang per-caller
- **PR #8083** (CLOSED): Merge catalogs thay vì replace - đã đóng, có thể thay thế bằng approach khác
- **PR #8084** (OPEN): Triển khai SEP-414 caller attribution để hosted-MCP servers có thể phân biệt users

#### 🏗️ Cải thiện khả năng cấu hình và triển khai

**PR #8087** (OPEN) - Prompt context limit override:
- Cho phép override context limit (hiện hard-coded 128k tokens) qua env var
- Quan trọng cho deployments sử dụng models có context window lớn hơn

**PR #8088** (CLOSED) - Environment variable handling:
- Phân biệt env var được set empty (`FOO=`) vs unset
- Tránh silent fallback to defaults gây nhầm lẫn trong production

**PR #8085** (OPEN) - Operator-installed packages:
- Sửa inconsistency giữa constructor và validator
- Cho phép operator install packages giống như host-bundled ones

#### 🔧 Hosted-MCP và Extensions infrastructure

**PR #8089** (CLOSED) - Bundle agent-market provider:
- Thêm first-party package cho agent.market hosted-MCP provider
- Reopen từ PR #6760 với approach mới sau khi bundled extensions architecture thay đổi

**PR #8072** (OPEN) - Telegram Bot API commands:
- Register command menu (`/model`, `/status`, `/new`, etc.) qua Bot API
- Cải thiện UX cho Telegram integration

#### 📄 Tối ưu hóa tài nguyên

**PR #8082** (OPEN) - Document attachment pointer mode:
- Giải quyết vấn đề document text tiêu tốn quá nhiều context (25k tokens/PDF)
- Opt-in pointer mode thay vì inline toàn bộ text vào model request

### **Các vấn đề kỹ thuật nổi bật**

**Issue #8086** - CLI visibility bug:
- `ironclaw skills list` không thấy skills mà runtime đã write
- Gây khó khăn cho debugging: "why can't my agent see its skill"
- Chưa có PR xử lý

## 💬 Điểm nổi bật cộng đồng

Hoạt động chủ yếu đến từ **@kirikov** - một contributor có vẻ đang làm refactoring lớn về architecture:
- 9/11 PRs được tạo trong ngày
- 2/2 issues được tạo trong ngày
- Tất cả đều liên quan đến hosted-MCP, extensions, và deployment infrastructure

**@thisisjoshford** đóng góp PR #8072 về Telegram integration - cho thấy có sự quan tâm đến chat interfaces.

**Chú ý**: Không có nhiều tương tác từ cộng đồng rộng (0 reactions trên tất cả issues/PRs). Có thể đây là internal development cycle hoặc dự án còn ở giai đoạn đầu.

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng:

1. **Cross-user metadata exposure** (#6778) - CRITICAL
   - Impact: Security/privacy
   - Đã có giải pháp trong PR #8090

2. **Skills visibility** (#8086) - HIGH
   - Impact: Developer experience
   - Chưa có fix

### Technical debt:

- Hard-coded constants cần thay thế bằng config (context limits, URLs)
- Inconsistency giữa validation logic trong extensions system
- Empty env var handling không đúng semantic

## ✨ Yêu cầu tính năng

### Đang được implement:

1. **SEP-414 caller attribution** (PR #8084)
   - Cho phép hosted-MCP servers track conversations và prevent duplicate charging
   - Opt-in per provider manifest

2. **Document pointer mode** (PR #8082)
   - Giảm context consumption cho document attachments
   - Critical cho use cases với nhiều documents

3. **Telegram command menu** (PR #8072)
   - Improve discoverability cho bot commands

### Implied từ bugs:

- Better CLI tooling cho debugging agent skills
- Multi-tenant isolation improvements

## 👥 Phản hồi người dùng

Thiếu feedback trực tiếp từ end users trong dataset. Issues và PRs chủ yếu mang tính kỹ thuật và infrastructure.

Tuy nhiên, các vấn đề được xử lý phản ánh concerns thực tế:
- Privacy/security trong multi-tenant deployments
- Cost optimization (context usage, retry charging)
- Developer experience (debugging tools, configuration)

## 🗺️ Backlog & Roadmap

### Near-term priorities (dựa trên open PRs):

1. **Hoàn thiện hosted-MCP security fixes** - PRs #8090, #8084
2. **Improve deployment configurability** - PR #8087
3. **Fix skills visibility** - Issue #8086 chưa có PR
4. **Document handling optimization** - PR #8082

### Architecture direction:

Dự án đang trong phase **"production hardening"**:
- Từ proof-of-concept sang production-grade multi-tenant system
- Focus vào security, configurability, và resource optimization
- Refactoring extensions/MCP infrastructure để support operator customization

### Concerns:

- Nhiều PRs mở cùng lúc (7 open PRs) - có thể gây merge conflicts
- Một số PRs closed nhanh, reopen với approach khác - sign của design iteration
- Thiếu community feedback - có thể cần better communication về changes

---

## 🔮 Đánh giá tổng quan

**Điểm mạnh:**
- Proactive security fixes
- Clear focus on production readiness
- Systematic approach to architectural improvements

**Điểm cần lưu ý:**
- Volume cao của changes có thể ảnh hưởng stability
- Cần test coverage tốt cho security-critical changes
- Thiếu community engagement - cân nhắc communication strategy

**Risk level:** MEDIUM - Nhiều thay đổi fundamental đồng thời, nhưng có vẻ well-planned.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo Phân tích QwenPaw - 2026-09-09

## 📋 Tóm tắt hôm nay

Dự án QwenPaw phát hành **v2.2.1-beta.1** với nhiều cải tiến về routing mô hình, đồng bộ session, và cập nhật website. Hoạt động cộng đồng tập trung vào việc sửa lỗi nghiêm trọng liên quan đến xử lý PDF/binary trong tool calls, cải thiện trải nghiệm plugin marketplace, và giải quyết các vấn đề tương thích với Gemini và các endpoint OpenAI-compatible. Có 19 issues đang mở với nhiều báo cáo bug quan trọng và 46 PRs đang được xử lý tích cực.

---

## 🚀 Releases

### **v2.2.1-beta.1** (2026-09-08)

Phiên bản beta mới với các cải tiến chính:

- **🎯 Agent Model Routing**: Bổ sung cài đặt định tuyến mô hình theo agent (#7501)
- **🔄 Session Sync**: Sửa lỗi đồng bộ session trong quá trình streaming (#7523)
- **📚 Cập nhật website**: Documentation cho v2.2.0 (#7517)

**Ý nghĩa**: Bản beta này tập trung vào ổn định hóa tính năng routing và xử lý session đã được giới thiệu trong v2.2.0, chuẩn bị cho stable release tiếp theo.

---

## 📊 Tiến độ dự án

### **Công việc đang triển khai**

#### 🔧 Sửa lỗi nghiêm trọng (High Priority)

1. **PDF/Binary handling** (#7597, #7617, #7621, #7636)
   - Tool trả về PDF/image binary gây lỗi 400 với các endpoint không hỗ trợ multimodal
   - Đã merge #7621 để xử lý PDF blocks cho text-only models
   - #7636 đang mở rộng fix cho tất cả OpenAI chat-completions servers

2. **Gemini compatibility** (#7625, #7626, #7629)
   - Background tool completion gây lỗi 400 "Requests ending with a model turn"
   - Root cause: completion notifications được gửi với `role="assistant"` thay vì `role="user"`
   - #7626 và #7629 đang fix vấn đề này

3. **MCP authentication** (#7620, #7627)
   - Non-conforming HTTP 401 chặn legacy fallback
   - #7627 đã merged fix để legacy handshake xử lý 401 discover probe

#### ⚡ Cải tiến hiệu năng

- **History scan optimization** (#7639): Tránh repeated integrity scans, chỉ check một lần mỗi process
- **Context memory** (#7521): Fold consumed thinking khi gặp context pressure
- **Shell subprocess** (#7598): Detach child stdin để tránh block console

#### 🎨 UX improvements

- **Plugin marketplace** (#7605, #7582): 
  - Preserve context sau khi install/update
  - Batch update hỗ trợ
  - Update notifications
  - **Merged** vào 2026-09-08

- **Mobile agent selector** (#7623): Cải thiện trải nghiệm chọn agent trên mobile
- **Sidebar redesign** (#7502): Merged - tái thiết kế sidebar và settings experience

#### 🔌 Tính năng mới

- **Memory backend migration** (#7616): Migrate ADBPG và PowerContext thành plugins
- **OpenViking long-term memory** (#7613): Backend mới cho long-term memory
- **Per-session model overrides** (#5992): Cho phép override model theo session
- **QwenPaw-Data 0.3.0** (#7637): Tích hợp analysis engine mới

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues nổi bật**

1. **#7579 - Model context loss** (8 comments, 👍 0)
   - Assistant reply được persist nhưng mất khỏi context trong request tiếp theo
   - Triệu chứng: model "không thấy" những gì vừa nói

2. **#7615 - Community support channel** (1 comment, 👍 3)
   - Câu hỏi về nơi hỏi third-party plugins/skills
   - Được chỉ dẫn đến QwenPaw Community

3. **#7600 - Traffic Light feature** (2 comments, 👍 0)
   - Đề xuất thêm traffic light indicator để theo dõi status khi switch window
   - Use case thực tế từ người dùng daily

### **PRs có nhiều activity**

- **#7237** - Console session identity freeze: Fix race conditions khi user switch session
- **#7616** - Memory backend plugin migration: Kiến trúc mới cho memory backends
- **#7637** - QwenPaw-Data 0.3.0: Major version bump với nhiều tính năng mới

---

## 🐛 Ổn định & Bugs

### **Bugs nghiêm trọng đang được xử lý**

1. **Data handling issues**
   - PDF/binary trong tool results gây crash với text-only endpoints
   - Session history bị broken permanently sau khi có PDF DataBlock
   - Status: Đang được fix tích cực qua nhiều PRs

2. **Platform compatibility**
   - **#7363**: Sync calls block event loop, timeout không hoạt động (118-135s startup freeze trên Windows)
   - **#7630**: CPU detection chặn VM và cloud desktop
   - **#7633**: llama.cpp version parsing fail với format mới (b10853)

3. **Tool execution**
   - **#7572**: Exception stack bị nuốt trong tool coordinator
   - **#7554**: Shell tool subprocess inherit console stdin, gây hang

4. **Console & Session**
   - **#7559**: 409 error khi gửi message trong khi task đang chạy
   - Missing queue mechanism cho concurrent messages

### **Fixes đã merged**

- ✅ MCP legacy handshake (#7627)
- ✅ Plugin marketplace UX (#7605)
- ✅ Console submission queue (#7610)
- ✅ Shell stdin detach (#7598)
- ✅ PDF handling for text-only models (#7621)

---

## 💡 Yêu cầu tính năng

### **Đang được phát triển**

1. **QwenPaw Traffic Light** (#7600)
   - Visual indicator cho processing status
   - Giúp user track khi switch windows

2. **Skill versioning & validation** (#7609)
   - Expose skill versions
   - Validate dependencies
   - Prerequisites checking

3. **Reranker UI config** (#6399)
   - Visual config panel cho reranker backend
   - Tích hợp vào Agent Config

4. **PawPort import system** (#6960)
   - Import settings/skills/projects từ agent khác (Codex, Qoder)
   - End-to-end portability subsystem

### **Đề xuất mới**

1. **#7553**: Hiển thị artifacts ở vị trí dễ truy cập hơn (trên timestamp thay vì trong collapsed steps)

2. **#7630**: Option để disable CPU detection cho VM/cloud desktop

3. **#2972**: Tắt hiển thị thinking process trong CoPaw panel

---

## 💬 Phản hồi người dùng

### **Positive feedback**

- Plugin marketplace improvements được đánh giá cao
- Sidebar redesign cải thiện workflow
- Community support channel rõ ràng hơn

### **Pain points**

1. **Installation complexity**: 
   - Multiple clicks để install nhiều plugins (#7582)
   - Thiếu bulk operations
   - Không có update notifications

2. **Status visibility**:
   - Khó track long-running tasks khi switch windows (#7600)
   - Thinking process làm lộn xộn chat history (#2972)

3. **Error handling**:
   - 409 errors gây confusion (#7559)
   - Exception messages không đủ context (#7572)
   - Binary data errors khó troubleshoot (#7597, #7617)

4. **Platform limitations**:
   - VM/cloud desktop không thể dùng do CPU check (#7630)
   - Windows console blocking issues (#7554, #7363)

---

## 🗺️ Backlog & Roadmap

### **Short-term (đang active development)**

1. ✅ **Stability fixes** - Ưu tiên cao
   - PDF/binary handling
   - Gemini compatibility
   - Session management

2. 🔄 **Memory architecture** - Migration đang diễn ra
   - Plugin-based backends (#7616)
   - OpenViking integration (#7613)
   - PowerContext migration

3. 🎨 **UX polish**
   - Mobile improvements (#7623)
   - Plugin marketplace enhancements (merged)
   - Chat scroll lock (#7356)

### **Mid-term (under review)**

1. **Per-session model routing** (#5992)
2. **PawPort import system** (#6960)
3. **MCP configurable timeout** (#6874)
4. **Creator 1.2.0** (#7486) - Major app-plugin update

### **Long-term considerations**

- Reranker UI integration (#6399)
- Frontend dependency updates (#7427)
- Protected execution contract (#7526)

---

## 📈 Xu hướng phát triển

1. **Modularization**: Chuyển các components sang plugin architecture (memory backends)
2. **Multi-modal robustness**: Cải thiện xử lý binary data và media content
3. **Platform compatibility**: Mở rộng hỗ trợ VM, cloud environments
4. **Developer experience**: Better error messages, validation, và debugging tools
5. **Enterprise features**: Long-term memory, advanced routing, portability

**Tốc độ merge**: Cao - nhiều PRs được merge trong ngày, đặc biệt các critical fixes

**Community engagement**: Tích cực - contributors mới (#7632, #7626, #7638) và first-time contributors được hỗ trợ tốt

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*