# Bản tin Hệ sinh thái OpenClaw 2026-07-28

> Issues: 190 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-07-28 02:00 UTC

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

# Báo cáo phân tích OpenClaw - 28/07/2026

## 📊 Tóm tắt hôm nay

OpenClaw đang trong giai đoạn cải tiến mạnh mẽ với 30 PRs đang chờ xét duyệt và 190 issues đang mở. Hoạt động chính tập trung vào **sửa lỗi memory leak nghiêm trọng**, **tái cấu trúc hệ thống scheduler** (đổi tên từ "cron" → "Automations"), và **cải thiện độ tin cậy của session management**. Dự án đang ưu tiên giải quyết các vấn đề critical về performance và user experience trước khi phát hành beta.2 ổn định.

---

## 🚀 Releases

**Không có releases mới trong 24h qua**, nhưng có tín hiệu mạnh về chuẩn bị cho một release quan trọng:

- Beta 2026.7.2-beta.4 đã phát hành trước đó, hiện đang trong giai đoạn hotfix
- Nhiều PR P0/P1 đang được review gấp (#109867 - migration bug, #114388 - default agent removal)

---

## 🔧 Tiến độ dự án

### **Xu hướng chính:**

#### 1️⃣ **Tái cấu trúc Scheduler → Automations** 
Stack PR đang được triển khai (#114841, #114852, #114853) để đổi tên toàn bộ hệ thống "cron" thành "Automations":
- **Lý do**: "Cron" là thuật ngữ kỹ thuật, gây nhầm lẫn cho người dùng không chuyên
- **Phạm vi**: Tool identity, UI strings, agent prompts, documentation
- **Trạng thái**: 3 PRs đã sẵn sàng merge, RFC đã được phê duyệt

#### 2️⃣ **Durable Core Infrastructure (PR 5/6 #111464)**
Thêm operation-scoped execution recovery với lease fencing - phần của một chiến lược dài hạn để giảm agent silence trên OpenClaw 7.1:
- 📦 Size: XL (thay đổi lớn)
- ⚠️ Merge risks: compatibility, session-state, availability
- 🎯 Mục tiêu: Infrastructure-level agent silence prevention

#### 3️⃣ **iOS Native Improvements**
- #113057: Render assistant media attachments (images từ AI không hiển thị)
- #113372: Sử dụng đúng Speech Language đã cấu hình
- #113062: Prevent stale wake tasks (fix race conditions)

### **PRs đáng chú ý:**

| PR | Độ ưu tiên | Vấn đề giải quyết | Merge Risk |
|---|---|---|---|
| #114388 | P2 🔴 | Remove stored default agent (misattribution bugs) | 🚨 Compatibility, Auth, Session |
| #111464 | P2 🔴 | Durable execution recovery | 🚨 Compatibility, Session, Availability |
| #114283 | P2 | Tavily tools broken when Brave selected | 🚨 Security boundary |
| #114799 | P1 🔴 | No-visible-reply detection từ turn ledger | 🚨 Message delivery |

---

## 🔥 Điểm nổi bật cộng đồng

### **Issues hot nhất (theo bình luận):**

#### 1. **#7707 - Memory Trust Tagging** (22 comments, 🐚 platinum)
- **Vấn đề**: Memory poisoning attacks - instructions ẩn trong web scrapes có thể ảnh hưởng agent behavior
- **Đề xuất**: Tag memory entries theo trust level (user commands = trusted, web content = untrusted)
- **Tình trạng**: Needs security review, stuck trong recovery queue

#### 2. **#91588 - Gateway Memory Leak Critical** (21 comments, P0, 🐚 platinum)
- **Nghiêm trọng**: RSS tăng từ 350MB → 15.5GB sau 2-3 ngày → OOM crash loop
- **Impact**: Production-blocking, launchd restart storm
- **Tình trạng**: Vẫn OPEN, chưa có PR fix

#### 3. **#102020 - Second message fails** (16 comments, CLOSED ✅)
- **Bug**: Message thứ 2 trong session bị "reply session initialization conflicted"
- **Đã fix**: Closed gần đây, likely fixed in beta.2

#### 4. **#11665 - Webhook multi-turn support** (11 comments, 🦞 diamond)
- **Vấn đề**: `sessionKey` không hoạt động như docs - mỗi webhook call tạo session mới
- **Impact**: Không thể có multi-turn conversations qua webhooks
- **Tình trạng**: Có linked PR đang open

---

## 🐛 Ổn định & Bugs

### **Critical Issues (P0/P1):**

#### ⚠️ **Performance & Memory:**
1. **#91588** - Gateway memory leak 350MB→15.5GB (P0, 21 comments)
2. **#87109** - Heap grows to 1073MB+ idle, cron fails silently (P1, 9 comments)
3. **#113434** - Codex scans exhaust Gateway RAM (P1, 7 comments)

#### ⚠️ **Session Management:**
1. **#102020** - Second message "initialization conflicted" (CLOSED ✅)
2. **#113306** - SQLite snapshot restore lacks crash guarantees (P1)
3. **#85844** - Auto-update leaves stale hashed bundle imports (P1)

#### ⚠️ **Auth & Pairing:**
1. **#74484** - Gateway pairing scope deadlock (P1, CLOSED ✅)
2. **#64664** - Approvals lost on restart (P2, CLOSED ✅)

### **Regression Fixes:**
- **#40255** - User heartbeat prompt no longer respected (CLOSED ✅)
- **#109867** - beta.2 migration creates index before column (P0, CLOSED ✅)

---

## 💡 Yêu cầu tính năng

### **Bảo mật & Trust:**
1. **#7707** - Memory trust tagging (22 comments) - Prevent poisoning attacks
2. **#12219** - Skill Permission Manifest (6 comments) - Standard permissions like mobile apps
3. **#6615** - Denylist for exec-approvals (10 comments) - "Allow all except dangerous commands"

### **UX & Developer Experience:**
1. **#10118** - TUI Shift+Enter for newline (6 comments) - Multi-line prompts
2. **#9637** - Disable emojis for screenreaders (6 comments) - Accessibility
3. **#9409** - Better context overflow errors (5 comments) - Show actual vs limit tokens

### **AI & Models:**
1. **#10687** - Dynamic model discovery for OpenRouter (10 comments)
2. **#9016** - Expose OpenRouter usage cost to agents (6 comments)
3. **#9986** - Trigger fallback on context length exceeded (6 comments)

### **Integrations:**
1. **#9764** - Google Chat OAuth for reactions (5 comments)
2. **#7476** - WhatsApp sticker support (6 comments)
3. **#10944** - Telegram parseMode config (5 comments)

---

## 💬 Phản hồi người dùng

### **Pain Points chính:**

#### 1. **Memory & Performance** (⭐⭐⭐⭐⭐ Critical)
> "Gateway heap grows to 1073MB+ at idle... cron jobs fail silently under memory pressure" - #87109

- Users báo cáo gateway không thể chạy ổn định lâu dài
- Memory leak forcing restart cycles gây mất data và downtime

#### 2. **Session Reliability** (⭐⭐⭐⭐ High)
> "Second message in a session fails... cross-channel, position-dependent" - #102020

- Multi-turn conversations không ổn định
- Webhook sessions không thể tái sử dụng (#11665)

#### 3. **Context Management** (⭐⭐⭐ Medium)
> "Bootstrap files re-injected every turn, wasting 20-30% tokens" - #67419

- Context bloat làm tăng cost và giảm available space
- Compaction không đủ thông minh

#### 4. **Documentation Gaps** (⭐⭐ Low)
> "npm 11 blocks preinstall scripts by default, install fails silently" - #114665

- Setup instructions outdated với npm 11+
- Error messages thiếu actionable details

### **Positive Signals:**
- Active maintainer engagement (steipete, omarshahine frequent commits)
- Community contributors filing detailed issues với reproduction steps
- AI-assisted PRs được chấp nhận (#113920, #114734)

---

## 📋 Backlog & Roadmap

### **Immediate Focus (Sprint hiện tại):**

#### 🔴 **P0/P1 Blockers:**
1. **Memory leak resolution** (#91588, #87109) - Gateway stability
2. **Default agent removal** (#114388) - Fix ownership misattribution
3. **Session recovery improvements** (#111464 - Durable Core PR 5/6)

#### 🟡 **Beta Stabilization:**
1. Migration bugs fixing (#109867 - CLOSED)
2. iOS native experience (#113057, #113372, #113062)
3. Automations rebrand (#114841, #114852, #114853)

### **Medium-term (Next 2-4 weeks):**

#### **Infrastructure:**
- Complete Durable Core stack (currently 5/6 PRs)
- Stack-safe attachment handling (#90098)
- Lane leak fixes for claude-cli (#89766)

#### **Security:**
- Memory trust tagging implementation (#7707)
- Skill permission manifest standard (#12219)
- Exec denylist support (#6615)

#### **Developer Experience:**
- Dynamic model discovery (#10687)
- Better error messages (#9409)
- Context overflow fallbacks (#9986)

### **Long-term Vision (từ các RFCs):**

1. **RFC 0026**: Scheduler → Automations rename (Phase 1 đang triển khai)
2. **Memory system overhaul**: Trust-based segmentation
3. **Cloud-worker improvements**: Better placement recovery
4. **Multi-agent coordination**: Parent-child session reliability

### **Backlog Insights:**

- **190 open issues**: Số lượng lớn nhưng được triage tốt với labels
- **500 PRs total**: High throughput, cần cải thiện merge velocity
- **Recovery-stuck label**: 15+ issues bị kẹt trong triaging, cần attention

---

## 🎯 Đánh giá tổng quan

### **Điểm mạnh:**
✅ Active development với maintainer engagement cao  
✅ Detailed issue tracking và labeling system  
✅ Community-driven feature requests với clear use cases  
✅ AI-assisted contributions được embrace  

### **Điểm cần cải thiện:**
⚠️ Memory leak chưa được resolve (critical blocker)  
⚠️ PR merge velocity thấp (30 PRs pending, nhiều đã ready)  
⚠️ Documentation gaps với tooling updates (npm 11)  
⚠️ Session reliability vẫn có edge cases  

### **Xu hướng:**
📈 **Maturity trajectory**: Dự án đang chuyển từ "move fast" → "stabilize core"  
🔧 **Focus shift**: Features → Reliability & Performance  
🤝 **Community health**: Strong engagement, constructive discussions  

---

**Kết luận**: OpenClaw đang trong giai đoạn then chốt trước một release ổn định. Team đang ưu tiên đúng hướng (fix critical bugs trước features), nhưng cần tăng tốc merge velocity để không bị bottleneck ở review process. Memory leak issue cần được escalate do ảnh hưởng production.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 28/07/2026

## 🌐 1. Tổng quan Hệ sinh thái

Hệ sinh thái AI agent ngày 28/07/2026 đang trải qua giai đoạn **consolidation và maturity** với các dấu hiệu rõ rệt:

- **Từ MVP sang Production**: Hầu hết dự án đang chuyển focus từ "ship features fast" sang "stabilize & harden"
- **Infrastructure Investment**: Tất cả dự án đều có PR về observability, error handling, test coverage
- **Security-First**: Xuất hiện nhiều security fixes (path traversal, token leaks, secret redaction)
- **Developer Experience**: Tăng cường documentation, CLI tools, development workflows
- **Enterprise Readiness**: Hỗ trợ systemd, Docker, multi-tenant, production deployment

### Thống kê tổng thể:

| Metric | Tổng | Trung bình | Cao nhất |
|--------|------|------------|----------|
| **Issues** | 314 | 35 | 190 (OpenClaw) |
| **PRs** | 247 | 27 | 50 (Hermes, ZeroClaw, IronClaw) |
| **Releases** | 1 | 0.11 | 1 (IronClaw) |
| **Comments/Issue** | ~500+ | ~5-8 | 22 (OpenClaw #7707) |

---

## 📋 2. Bảng So sánh Hoạt động

### Metrics Chính

| Dự án | Issues | PRs | Releases | Hoạt động 24h | Mức độ tương tác | Maturity Level |
|-------|--------|-----|----------|---------------|------------------|----------------|
| **OpenClaw** | 190 🔴 | 500 🔴 | 0 | Cao (30 PRs pending) | Rất cao (22 comments/issue) | ⭐⭐⭐ Mid-stage |
| **NanoBot** | 64 | 36 | 0 | Rất cao (18 PRs merged) | Trung bình | ⭐⭐⭐⭐ Late-stage |
| **ZeroClaw** | 19 | 50 | 0 | Cao (v0.8.5 prep) | Cao (RFCs active) | ⭐⭐⭐⭐ Late-stage |
| **PicoClaw** | 5 | 4 | 0 | Trung bình | Thấp | ⭐⭐ Early-stage |
| **NanoClaw** | 0 🟢 | 9 | 0 | Thấp (cleanup mode) | Rất thấp | ⭐⭐⭐ Mid-stage |
| **IronClaw** | 20 | 50 | 1 🟢 | Rất cao (v1.0.0!) | Cao (14 comments/epic) | ⭐⭐⭐⭐⭐ Production |
| **LobsterAI** | 8 | 9 | 0 | Trung bình | Cao (critical bugs) | ⭐⭐ Early-stage |
| **CoPaw** | 20 | 49 | 0 | Cao | Cao (multi-model focus) | ⭐⭐⭐⭐ Late-stage |
| **Hermes** | 8 | 50 | 0 | Rất cao (50 PRs!) | Rất cao | ⭐⭐⭐⭐ Late-stage |

### Velocity & Health Indicators

| Dự án | Merge Rate | Issue Resolution | Community Health | Security Posture |
|-------|------------|------------------|------------------|------------------|
| **OpenClaw** | 🟡 Chậm | 🟡 Backlog lớn | 🟢 Rất tốt | 🟢 Proactive |
| **NanoBot** | 🟢 Rất nhanh | 🟢 Nhanh (18/day) | 🟢 Tốt | 🟢 Proactive |
| **ZeroClaw** | 🟢 Tốt | 🟢 Responsive | 🟢 RFC-driven | 🟢 Security-first |
| **PicoClaw** | 🟡 Chậm | 🟡 Accumulating | 🟡 Growing | 🟢 Basic |
| **NanoClaw** | 🟡 Ổn định | 🟢 Maintenance | 🟡 Quiet | 🟢 Solid |
| **IronClaw** | 🟢 Tốt | 🟢 Epic-tracked | 🟢 Mature | 🟢 Production-grade |
| **LobsterAI** | 🟡 Chậm | 🔴 Critical bugs | 🟡 Active reporters | 🔴 Issues found |
| **CoPaw** | 🟢 Tốt | 🟢 Responsive | 🟢 Active | 🟢 Improving |
| **Hermes** | 🟢 Rất nhanh | 🟢 Same-day fixes | 🟢 Rất tốt | 🟢 Security-conscious |

---

## 🎯 3. Vị thế của OpenClaw

### Điểm mạnh

✅ **Số lượng issues cao nhất** (190) → Cộng đồng active, nhiều use cases thực tế  
✅ **Engagement xuất sắc** (22 comments trên issue #7707) → Discussions chất lượng cao  
✅ **RFC-driven development** → Quy trình mature, community input được tôn trọng  
✅ **Security-focused** → Memory trust tagging (#7707), permission manifests (#12219)  
✅ **Well-documented problems** → Issues có reproduction steps chi tiết

### Thách thức

⚠️ **PR merge velocity thấp** → 30 PRs pending dù nhiều đã ready, risk bottleneck  
⚠️ **Memory leak chưa fix** → Critical blocker (#91588) tồn tại lâu, ảnh hưởng production  
⚠️ **Technical debt lớn** → 190 issues, nhiều P0/P1 chưa address  
⚠️ **No releases** → Không có cadence ổn định, users khó track progress

### Positioning trong Ecosystem

OpenClaw đang ở vị trí **"Reference Implementation"**:
- Nhiều dự án khác reference architecture patterns của OpenClaw
- RFC process được xem là best practice
- Community-driven approach được đánh giá cao

Tuy nhiên, đang bị **outpaced về velocity** bởi NanoBot (18 merges/day) và Hermes (50 active PRs với high throughput).

### So sánh trực tiếp với competitors:

| Tiêu chí | OpenClaw | NanoBot | ZeroClaw | IronClaw |
|----------|----------|---------|----------|----------|
| **Community Size** | 🥇 Lớn nhất | 🥈 Lớn | 🥉 Trung bình | 🥉 Trung bình |
| **Code Quality** | 🥇 RFC-driven | 🥈 Test-driven | 🥇 RFC-driven | 🥇 Epic-tracked |
| **Velocity** | 🥉 Chậm | 🥇 Rất nhanh | 🥈 Tốt | 🥈 Tốt |
| **Stability** | 🥉 Issues lớn | 🥇 Ổn định | 🥈 Tốt | 🥇 Production |
| **Innovation** | 🥇 Memory trust | 🥈 Skills marketplace | 🥈 AI PR review | 🥇 Manifest-driven |

---

## 🔧 4. Xu hướng Kỹ thuật Chung

### Infrastructure & Reliability (100% dự án)

**🔥 Durable Execution & Error Recovery**
- **OpenClaw**: Durable Core stack (#111464) - operation-scoped recovery with lease fencing
- **ZeroClaw**: Error recoverability endgame (#6284) - 100% model failure recovery
- **Hermes**: Session state hardening - 4 PRs về message delivery pipeline
- **IronClaw**: Error recoverability epic - manifest-driven failure handling

**📊 Observability & Telemetry**
- **Hermes**: Relay metrics system - 5 categories từ install đến tool usage
- **IronClaw**: Ledger-based audit trails
- **NanoBot**: Health CLI (`ncc` utility skill)
- **ZeroClaw**: DORA metrics retirement → simpler observability

**🧪 Test Isolation & Hermetic Testing**
- **ZeroClaw**: Hermetic testing platform (#6524) - deterministic replay
- **Hermes**: Test pollution fixes (#50681, #71271) - state.db contamination
- **LobsterAI**: Test hygiene issues
- **IronClaw**: Pin fault state, replay provider journeys

### Security (80% dự án)

**🔐 Credential & Secret Management**
- **IronClaw**: Credential firewall, TLS termination seam (#6740)
- **ZeroClaw**: Auth profile security, token leak fixes (#9417)
- **OpenClaw**: Memory trust tagging (#7707) - prompt injection prevention
- **LobsterAI**: Email attachment path traversal fix (#2389)
- **Hermes**: Secret redaction in cron jobs (#73026)

**🛡️ Isolation & Sandboxing**
- **CoPaw**: Sub-agent session isolation (#6509) - UUID-based directories
- **IronClaw**: Sandbox CA infrastructure (#6723)
- **ZeroClaw**: Security tool exposure prevention (#9472)

### AI/LLM Integration (90% dự án)

**🤖 Multi-model & Provider Flexibility**
- **CoPaw**: Multi-model execution trong 1 agent (#6455)
- **PicoClaw**: Model fallback chain configuration (#3200)
- **ZeroClaw**: Atlas Cloud provider, dynamic model discovery
- **NanoBot**: Multi-custom provider support

**🧠 Context Management**
- **CoPaw**: Visual Compact (#6456) - convert history thành images để giảm tokens
- **OpenClaw**: Context overflow fallbacks, bootstrap injection optimization
- **Hermes**: Verify-on-stop persistence, activity watchdog

**🔍 Memory & RAG**
- **OpenClaw**: Memory trust tagging - separate user commands vs web scrapes
- **CoPaw**: Reranker support cho ReMe (#6398)
- **IronClaw**: Pluggable memory providers (#6482)

### Platform Expansion (70% dự án)

**📱 Channels & Integrations**
- **NanoClaw**: Dial integration, Signal fixes
- **PicoClaw**: LINE Messaging API (#5115), DashScope TTS (#3270)
- **Hermes**: Discord durable threads, Google Chat OAuth fixes
- **ZeroClaw**: Nextcloud Talk signed bot API

**🖥️ Desktop & UI**
- **Hermes**: Cold start optimization (-22MB parse), React churn fixes
- **CoPaw**: CPU usage optimization (#6460), SSE replay buffer limits
- **NanoBot**: WebUI asset optimization (SVG conversion)

### Extension & Plugin Systems (60% dự án)

**📦 Manifest-Driven Architecture**
- **IronClaw**: Unified extension manifest (#6481) - capabilities declared in manifest
- **NanoBot**: Platform extension system (#5098)
- **CoPaw**: Third-party agent framework (#6397) - Codex, Qoder, Skills, MCP

**🛠️ Skills & Tools**
- **NanoBot**: Skills marketplace integration (#5116)
- **OpenClaw**: Skill permission manifest (#12219)
- **ZeroClaw**: Tool metrics aggregation, skill lifecycle tracking

---

## 🎨 5. Điểm Khác biệt

### Chiến lược Product

| Dự án | Focus | Target Users | Differentiation |
|-------|-------|--------------|-----------------|
| **OpenClaw** | Reference platform | Developers, researchers | RFC-driven, security-first, memory trust |
| **NanoBot** | Rapid iteration | Early adopters | Skills marketplace, fast merges |
| **ZeroClaw** | Security & stability | Enterprise | RFC process, security-first |
| **PicoClaw** | Localization | Asia-Pacific | Japanese/Chinese markets |
| **NanoClaw** | Consolidation | Internal teams | Cleanup & maintenance |
| **IronClaw** | Clean-slate rewrite | Production users | Manifest-driven, v1.0 architecture |
| **LobsterAI** | Bug-fixing mode | Existing users | Stability focus |
| **CoPaw** | Multi-model power | Power users | Visual context, parallel models |
| **Hermes** | High velocity | Active community | Fast response, Desktop polish |

### Architecture Philosophy

**OpenClaw** - **Community Consensus**
- RFC-driven với public discussions
- Breaking changes thông qua community vote
- Examples: Scheduler → Automations rename

**IronClaw** - **Clean Break**
- v1.0.0 là rebuild hoàn toàn
- No backward compatibility để đảm bảo architecture đúng
- Manifest-driven extension system từ đầu

**ZeroClaw** - **Incremental Hardening**
- Weekly releases (v0.8.5) với non-breaking changes
- Error recovery được build dần qua epics
- Balance giữa stability và innovation

**NanoBot** - **Move Fast, Fix Fast**
- 18 PRs merged trong 1 ngày
- Bug → Fix → Merge trong vài giờ
- Risk: có thể introduce regressions

**Hermes** - **High Throughput**
- 50 PRs active cùng lúc
- Same-day bug fixes
- Desktop UX được polish liên tục

### Feature Uniqueness

| Feature | Dự án | Innovation |
|---------|-------|------------|
| **Memory Trust Tagging** | OpenClaw | Tag memories theo trust level để prevent poisoning |
| **Visual Context Compression** | CoPaw | Convert history thành images để save tokens |
| **Hermetic Testing** | ZeroClaw | Deterministic replay cho mọi capability |
| **Skills Marketplace** | NanoBot | Built-in skill discovery & installation |
| **Multi-model Execution** | CoPaw | Chạy nhiều models song song, merge results |
| **Credential Firewall** | IronClaw | Sandbox CA với TLS termination |
| **Relay Metrics** | Hermes | Privacy-safe aggregated telemetry |
| **Wake Words** | Hermes | On-device open-vocabulary wake detection |

---

## 👥 6. Mức độ Trưởng thành Cộng đồng

### Tier 1: Mature Communities (IronClaw, Hermes, ZeroClaw)

**Đặc điểm:**
- ✅ RFC/Epic-driven development
- ✅ Contributor tiers (trusted/distinguished/principal)
- ✅ Same-day responses trên issues
- ✅ Security disclosure process
- ✅ Release cadence ổn định (hoặc milestone tracking)

**Metrics:**
- Issue response time: < 24h
- PR review time: 1-3 ngày
- Community contributors: 10+ active
- Documentation: Comprehensive

### Tier 2: Growing Communities (OpenClaw, CoPaw, NanoBot)

**Đặc điểm:**
- ✅ Active discussions (10+ comments/issue)
- ✅ RFC process được adopt
- 🟡 Merge velocity chưa optimal
- 🟡 Contributor diversity improving
- 🟡 Documentation có gaps

**Metrics:**
- Issue response time: 1-3 ngày
- PR review time: 3-7 ngày
- Community contributors: 5-10
- Documentation: Good but improving

### Tier 3: Emerging Communities (PicoClaw, LobsterAI, NanoClaw)

**Đặc điểm:**
- 🟡 Fewer issues (< 20)
- 🟡 Limited contributor base (< 5)
- 🟡 Slower response times
- 🟡 Documentation basic
- 🟡 No formal governance

**Metrics:**
- Issue response time: 3-7 ngày
- PR review time: 1-2 tuần
- Community contributors: 2-5
- Documentation: Basic

### Community Health Signals

| Dự án | Response Time | Contributor Diversity | Governance | Documentation | Overall Health |
|-------|---------------|----------------------|------------|---------------|----------------|
| **IronClaw** | 🟢 < 24h | 🟢 10+ tiers | 🟢 Epic-tracked | 🟢 Excellent | 🟢 Excellent |
| **Hermes** | 🟢 Same-day | 🟢 High | 🟢 Issue-driven | 🟢 Good | 🟢 Excellent |
| **ZeroClaw** | 🟢 < 48h | 🟢 Tiered | 🟢 RFC process | 🟢 Good | 🟢 Excellent |
| **OpenClaw** | 🟢 1-2 days | 🟢 High | 🟢 RFC-driven | 🟢 Good | 🟢 Good |
| **CoPaw** | 🟢 1-2 days | 🟡 Medium | 🟡 Informal | 🟡 Improving | 🟢 Good |
| **NanoBot** | 🟢 Fast | 🟡 Medium | 🟡 Informal | 🟡 Basic | 🟡 Good |
| **PicoClaw** | 🟡 3-5 days | 🟡 Small | 🔴 None | 🟡 Basic | 🟡 Emerging |
| **LobsterAI** | 🟡 2-4 days | 🟡 Small | 🔴 None | 🟡 Basic | 🟡 Emerging |
| **NanoClaw** | 🟢 1-2 days | 🟡 Core team | 🟡 Informal | 🟢 Good | 🟡 Stable |

---

## 🔮 7. Tín hiệu Xu hướng

### Immediate Trends (Q3 2026)

**1️⃣ Stabilization Wave** 🌊
- Tất cả dự án mature đang shift từ features → stability
- Security fixes chiếm 30-40% PR activity
- Test coverage được tăng cường aggressive
- Error handling được rebuilt từ ground up

**Tín hiệu:**
- IronClaw: v1.0.0 clean rewrite
- ZeroClaw: Error recoverability endgame
- OpenClaw: Memory leak P0 issues
- Hermes: Session state hardening (4 PRs)

**2️⃣ Observability Investment** 📊
- Infrastructure cho production monitoring
- Privacy-safe telemetry systems
- Audit trails và compliance features

**Tín hiệu:**
- Hermes: Relay metrics (5 categories)
- IronClaw: Ledger-based audit
- ZeroClaw: DORA metrics → simpler approach
- NanoBot: Health CLI tools

**3️⃣ Multi-model Era** 🤖
- Không còn "one model to rule them all"
- Fallback chains, parallel execution
- Provider-agnostic architectures

**Tín hiệu:**
- CoPaw: Multi-model execution (#6455)
- PicoClaw: Configurable fallback chains
- ZeroClaw: Dynamic model discovery
- OpenClaw: Context overflow fallbacks

### Medium-term Trends (Q4 2026)

**4️⃣ Manifest-Driven Extensions** 📦
- Shift từ hardcoded capabilities → declared manifests
- Plugin ecosystems maturity
- Marketplace models

**Tín hiệu:**
- IronClaw: Unified extension manifest (#6481)
- NanoBot: Skills marketplace (#5116)
- CoPaw: Third-party agent framework
- OpenClaw: Skill permission manifests

**5️⃣ Desktop-First UX** 🖥️
- Electron/Tauri apps được polish mạnh
- Cold start optimization, performance focus
- Native integrations (không chỉ web)

**Tín hiệu:**
- Hermes: 25% effort vào Desktop UX
- CoPaw: CPU usage optimization
- Hermes: Computer Use feature proposal
- NanoBot: WebUI asset optimization

**6️⃣ Enterprise Readiness** 🏢
- Production deployment patterns
- Multi-tenant support
- Compliance & audit features

**Tín hiệu:**
- PicoClaw: Systemd support request
- IronClaw: Credential firewall
- ZeroClaw: Windows platform parity
- OpenClaw: Skill permission manifests

### Long-term Trends (2027+)

**7️⃣ Federated Agent Networks** 🕸️
- Agents gọi agents
- Cross-project interoperability
- Standard protocols (MCP, etc.)

**Tín hiệu:**
- CoPaw: Sub-agent isolation architecture
- OpenClaw: Multi-agent coordination discussions
- NanoClaw: Self-serve wiring controls
- IronClaw: Pluggable memory providers

**8️⃣ On-Device AI** 📱
- Local models được tích hợp deep
- Privacy-first architectures
- Offline-capable agents

**Tín hiệu:**
- Hermes: Wake words on-device (#70509)
- Multiple projects: Ollama integration issues
- CoPaw: Computer Use (desktop automation)

**9️⃣ AI-Assisted Development** 🤖➕👨‍💻
- AI giúp review PRs, triage issues
- Code generation trong CI/CD
- Self-improving agents

**Tín hiệu:**
- ZeroClaw: AI-assisted PR pre-review RFC (#9330)
- Multiple projects: AI-generated PRs được accept
- Hermes: High PR throughput với automation

### Emerging Risks ⚠️

**🔴 Test Pollution Epidemic**
- Hermes, LobsterAI, ZeroClaw đều gặp test hygiene issues
- State leakage giữa tests → flaky suites
- Risk: CI/CD trust sụp đổ

**🔴 Context Window Race**
- Models tăng context → agents inject nhiều hơn
- Bootstrap files, tool schemas bùng nổ
- Risk: Cost explosion, latency tăng

**🔴 Security Debt**
- Path traversal, token leaks, credential exposure
- Memory poisoning attacks
- Risk: Production incidents nếu không address sớm

**🔴 Ecosystem Fragmentation**
- 9 dự án, 9 kiến trúc khác nhau
- Khó migrate giữa platforms
- Risk: Community split, effort duplication

---

## 🎯 Kết luận Chiến lược

### Top Performers (28/07/2026)

🥇 **IronClaw** - Dám clean break để có architecture đúng, v1.0.0 là cột mốc quan trọng  
🥈 **Hermes** - Velocity cao nhất, Desktop UX được polish xuất sắc, same-day bug fixes  
🥉 **ZeroClaw** - Balance tốt nhất giữa stability và innovation, RFC process mature

### OpenClaw - Cơ hội & Thách thức

**💪 Strengths to Leverage:**
- Community engagement xuất sắc
- RFC process được respect
- Security innovation (memory trust tagging)

**⚡ Urgent Actions:**
- Fix memory leak (#91588) - blocking production adoption
- Tăng PR merge velocity - 30 pending PRs là bottleneck
- Establish release cadence - users cần predictability

**🚀 Strategic Moves:**
- Lead interoperability standards (leverage community influence)
- Double down on security differentiation (permission manifests)
- Improve contributor onboarding (capitalize on high issue engagement)

### Ecosystem Health

**🟢 Positive Signals:**
- Stabilization wave shows maturity
- Security investment across board
- Active communities với constructive discussions

**🟡 Watch Areas:**
- Test hygiene issues widespread
- Ecosystem fragmentation risk
- No clear interoperability standards

**🔴 Concerns:**
- Multiple critical bugs in production (memory leaks, data corruption)
- Some projects có velocity issues
- Documentation gaps common

---

**📅 Báo cáo này phản ánh snapshot của 28/07/2026. Landscape thay đổi nhanh - recommend weekly updates.**

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Hoạt động NanoBot - Ngày 28/07/2026

## 🎯 Tóm tắt hôm nay

Ngày 27-28/07 là một ngày **cực kỳ năng suất** với **18 PRs được merge** và **18 issues được đóng**. Đội ngũ tập trung mạnh vào việc **ổn định hạ tầng core**, **cải thiện WebUI**, và **sửa các bugs nghiêm trọng** liên quan đến memory management, Dream system, và session handling. Đặc biệt có nhiều cải tiến về trải nghiệm người dùng và khả năng tích hợp.

---

## 🚀 Releases

Không có release chính thức trong 24h qua, nhưng khối lượng thay đổi cho thấy đang chuẩn bị cho một release lớn.

---

## 📈 Tiến độ dự án

### 🔥 Các PR quan trọng đã merge (18 PRs)

#### **Core Infrastructure & Bug Fixes**
- ✅ **#5126** - Sửa lỗi critical: GitStore trả về hex-of-hex thay vì git object IDs thực
- ✅ **#5099** - Bảo vệ lịch sử Dream chưa xử lý khỏi bị compact mất dữ liệu
- ✅ **#5107** - Khôi phục khả năng override model preset cho Dream
- ✅ **#5106** - Dọn dẹp các compatibility shims đã hết hạn từ v0.3.1
- ✅ **#5105** - Refactor lifecycle scaffolding, loại bỏ dead code

#### **WebUI Enhancements**
- ✅ **#5077** - Cho phép chuyển đổi model presets trực tiếp từ composer
- ✅ **#5080** - Chuyển đổi tất cả assets sang SVG để tối ưu hiệu suất
- ✅ **#5076** - Hỗ trợ custom gateway port với Vite
- ✅ **#5113** - Ổn định repeated model preset rows
- ✅ **#5121** - Sửa scroll jitter khi resize composer
- ✅ **#5103** - Giữ unread activity markers qua các lần reconnect

#### **Documentation & DX**
- ✅ **#5109** - Cải thiện README discoverability
- ✅ **#5119** - Điều chỉnh typography của model selector

### 🔄 PRs đang mở (8 PRs active)

#### **High Priority**
- 🔶 **#5122** - Đọc document attachments on-demand thay vì eager load
- 🔶 **#5116** - Tích hợp skills.sh marketplace vào WebUI
- 🔶 **#5115** - Thêm LINE Messaging API channel (thị trường châu Á)
- 🔶 **#5098** - Platform extension system thống nhất
- 🔶 **#5108** - Per-sender rate limiting cho channels

#### **Medium Priority**
- 🟡 **#5112** - Hiển thị Dream runs dưới dạng read-only sessions trong WebUI
- 🟡 **#5111** - SDK host integration extension points
- 🟡 **#5117** - Tolerate invalid idle-compaction timestamps

---

## 💬 Điểm nổi bật cộng đồng

### 📌 Issues có nhiều tương tác

1. **#1991** (9 comments) - Yêu cầu hỗ trợ nhiều custom providers
   - *Đã đóng* - Người dùng muốn dễ dàng switch giữa nhiều custom models

2. **#3123** (8 comments) - Vấn đề với cron message send
   - *Đã đóng* - Cron job gửi message trong isolated session, người dùng không thể hỏi thêm về nội dung

3. **#2570** (7 comments) - Local Ollama config gặp 404
   - *Đã đóng* - Vấn đề cấu hình Ollama local model

### 🎭 Vấn đề người dùng quan tâm nhất

- **Multi-provider support**: Nhiều người muốn switch linh hoạt giữa các models
- **Cron & scheduled tasks**: Workflow automation là use case phổ biến
- **Local model integration**: Ollama, LM Studio - người dùng muốn self-host
- **Channel stability**: Discord, WhatsApp, Feishu đều có reports về issues

---

## 🐛 Ổn định & Bugs

### ⚠️ Bugs nghiêm trọng đã sửa

1. **Data Loss Issues**
   - ✅ Memory consolidation có thể xóa mất Dream history chưa xử lý (#5099)
   - ✅ GitStore trả về IDs sai → không tìm được commits (#5126)
   - ✅ `/stop` command làm mất messages trong queue (#4792)
   - ✅ File paths trong `media[]` bị drop sau consolidation (#5120)

2. **Concurrency & Race Conditions**
   - ✅ Memory consolidation lock cleanup có race condition (#1255)
   - ✅ Inter-instance cache staleness (#1033)
   - ✅ Cross-channel `_sent_in_turn` variable corruption (#2549)

3. **UX Issues**
   - ✅ WebUI cron results không hiển thị dù `lastStatus: ok` (#5102)
   - ✅ Workspace switch không dừng old CRON jobs (#2358)
   - ✅ Feishu channel không hiển thị progress notifications (#3166)

### 🔒 Security Fixes
- ✅ Dream có thể ghi đè user skills → thêm write guard (#4667)
- ✅ High severity finding trong `file_state.py` (#5104)

---

## ✨ Yêu cầu tính năng

### 🎯 Đang được implement

1. **Skills Marketplace** (#5116) - Tích hợp skills.sh trực tiếp vào WebUI
2. **Extension Platform** (#5098) - Unified extension system cho third-party
3. **LINE Channel** (#5115) - Expand sang thị trường châu Á
4. **Rate Limiting** (#5108) - Per-sender protection chống spam

### 📋 Feature Requests từ cộng đồng

- **Multi-custom providers** (#1991) - Dễ dàng switch models
- **Dream model override** (#4029) - Dùng model khác cho Dream
- **OpenAI Response API** (#4612) - Alternative connection method
- **Local network whitelist** (#2370) - Cho private Gitea/services
- **Chrome DevTools MCP** (#1415) - Browser automation

---

## 👥 Phản hồi người dùng

### 😊 Tích cực
- WebUI đang được cải thiện liên tục với UX polish
- Memory system ổn định hơn sau các fixes
- Documentation được cập nhật thường xuyên

### 😕 Pain Points
- **Local model setup** vẫn khó với nhiều người (Ollama, LM Studio)
- **Provider configuration** confusing - force provider nhưng route sai model
- **Channel inconsistency** - mỗi channel có quirks riêng
- **Cron/scheduled tasks** thiếu context - không chat được với kết quả

### 🎓 Learning Curve
- Nhiều users không hiểu cách config providers đúng
- MCP integration docs cần chi tiết hơn
- Skills vs Tools vs MCP - phân biệt chưa rõ

---

## 📅 Backlog & Roadmap

### 🚧 Đang trong pipeline

1. **Platform Stability** (P1)
   - Memory system hardening
   - Session lifecycle cleanup
   - Error handling improvements

2. **Developer Experience** (P1)
   - Extension platform
   - Better local model support
   - SDK improvements

3. **User Features** (P2)
   - Skills marketplace
   - More channels (LINE, etc.)
   - Advanced scheduling

### 🔮 Hướng phát triển

Dựa trên activity patterns:

- **Short-term** (1-2 tuần): Ổn định core, polish WebUI, merge extension platform
- **Mid-term** (1-2 tháng): Skills marketplace, more channels, rate limiting
- **Long-term**: Plugin ecosystem, advanced automation, enterprise features

### 📊 Metrics quan sát được

- **Code quality focus**: Nhiều refactoring & test PRs
- **Community-driven**: Nhiều PRs từ external contributors
- **Rapid iteration**: 18 PRs merged trong 1 ngày
- **Bug-fixing priority**: 50%+ PRs là bug fixes/stability

---

## 🎖️ Đánh giá tổng quan

**Điểm mạnh:**
- ✅ Tốc độ phát triển cao
- ✅ Responsive với community feedback
- ✅ Focus vào stability & security
- ✅ Continuous UX improvements

**Cần cải thiện:**
- ⚠️ Documentation cho advanced features
- ⚠️ Consistency across channels
- ⚠️ Onboarding experience với local models

**Xu hướng:** Dự án đang chuyển từ "move fast" sang "stabilize & polish" - dấu hiệu tốt cho production readiness.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo phân tích dự án ZeroClaw - 28/07/2026

## 🎯 Tóm tắt hôm nay

ZeroClaw đang trong giai đoạn chuẩn bị phát hành **v0.8.5** với tập trung mạnh vào **bảo mật và ổn định**. Dự án xử lý 8 lỗ hổng bảo mật nghiêm trọng (P1), bao gồm token leaks, file write escapes và auth migration failures. Cộng đồng đóng góp tích cực với 50 PRs đang mở, phản ánh quy trình phát triển có nhịp độ cao nhưng cần kiểm soát technical debt tốt hơn.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng:

- **v0.8.5 đang được track** (#9459) - Weekly non-breaking release
- Milestone hiện tại: chuẩn bị các bản vá bảo mật và cải thiện ổn định
- Dự kiến phát hành: tuần này (status tracker mới được tạo 27/07)

---

## 📈 Tiến độ dự án

### **Các PR quan trọng đang active** (theo mức độ ưu tiên):

#### 🔴 **Critical Security Fixes (P1)**

| PR | Vấn đề | Trạng thái | Risk |
|---|---|---|---|
| **#9424** | Reject semantic-empty terminal completions | In-progress | High |
| **#9447** | Classify incomplete terminal responses (Anthropic) | In-progress, stacked on #9424 | High |
| **#9362** | Browser tool file write escape - validate screenshot paths | Needs author action | High |
| **#9340** | CLI-created cron jobs cannot deliver output | In-progress | High |
| **#9472** | Stop registering vi_verify as model-callable tool | Fresh (27/07) | High |

**Phân tích**: Dự án đang xử lý các lỗ hổng bảo mật nghiêm trọng liên quan đến:
- **Arbitrary file write** qua browser tool (#9362)
- **Token leaks** trong WhatsApp approval flow (#9417)
- **Security tool exposure** cho model (#9472)

#### 🟡 **Platform Stability (P1-P2)**

- **#9182** PowerShell support on Windows - tính năng lớn (XL), cần review kỹ
- **#9181** Nextcloud Talk signed bot API - fix channel delivery
- **#9251** PostgreSQL session backend - **CLOSED** (consolidated approach)
- **#9475** Fix flaky client count tests - bounded wait thay vì fixed sleep

#### 🟢 **Feature Enhancements**

- **#9195** ACP resource.blob support + deliver_file với citation URIs (P2, XL)
- **#8313** Compact skill injection default (deprecate full mode)
- **#8443** Matrix single-message progress drafts (trusted contributor)

### **Xu hướng phát triển**:

1. **Security-first approach**: 7/30 top PRs liên quan bảo mật
2. **Windows platform parity**: PowerShell, ACL hardening (#9460)
3. **Observability cleanup**: Retire DORA telemetry (#9451)
4. **Test stability**: Fixing flaky tests (#9429, #9475, #9442)

---

## 🌟 Điểm nổi bật cộng đồng

### **Top Issues theo engagement**:

1. **#9357** ⚠️ `cargo test` fails 19/20 runs on master
   - Nghiêm trọng: flaky test độc chiếm global mutex
   - 5 comments, P1 priority
   - Ảnh hưởng CI/CD pipeline

2. **#9425** 🛑 Running SOP jobs have no cancellation path
   - Workflow blocked (S1)
   - Người dùng không thể dừng SOP jobs đang chạy
   - Web dashboard limitation

3. **#9417** 🔐 WhatsApp approval token leak
   - Security P1: Token rò rỉ khi send failure/cancellation
   - Risk: High, cần hotfix

### **Community contributors nổi bật**:

- **@vrurg** (trusted): 3 PRs bảo mật critical (#9424, #9447, #9420)
- **@AngryPacifist**: 4 issues/PRs về test stability và runtime
- **@Audacity88** (distinguished): 6 PRs governance/security/config

---

## 🐛 Ổn định & Bugs

### **Critical Bugs (S1 - Workflow Blocked)**:

1. **#9474** 🚨 Auth profile store fails to load
   - Lỗi migration: `model_provider` required nhưng store cũ dùng `provider`
   - **Impact**: Tất cả `zeroclaw auth` commands fail
   - Mới phát hiện 27/07, chưa có PR fix

2. **#9425** SOP jobs không có cancel button
   - Web dashboard thiếu Stop/Cancel action
   - Chỉ hiện Approve/Deny khi pending

### **Major Bugs (S2 - Degraded Behavior)**:

1. **#9357** Test suite flaky - 95% failure rate
2. **#9363** Config metadata không dịch (vẫn English trong UI đa ngôn ngữ)
3. **#9429** Channel tests timeout trên slow runners - **CLOSED** (đã fix)

### **Flaky Test Epidemic**:

- **Pattern**: Fixed wall-clock timeouts thay vì bounded waits
- **PRs fixing**: #9475, #9442, #9298
- **Root cause**: Test assume scheduling guarantees không có trong async runtime

---

## 💡 Yêu cầu tính năng

### **RFC đang chờ maintainer review**:

1. **#9330** 🤖 AI-assisted PR pre-review
   - Dùng CI results trigger AI review
   - Keep human approval cho high-risk changes
   - Risk: High, needs careful design

2. **#9346** 📦 Unified package/capability catalog contract
   - Chuẩn hóa integrations, built-ins, plugins
   - Liên quan #6489 (product-level catalog)
   - Architecture RFC, needs alignment

### **Feature PR đáng chú ý**:

- **#9195** Binary resource exchange qua ACP channel (P2)
- **#9336** Render TodoWrite plan events trong web dashboard
- **#8313** Compact skill injection - giảm prompt token overhead

---

## 👥 Phản hồi người dùng

### **Pain points từ community**:

1. **Developer experience**:
   - "cargo test fails 95% of the time on master" (#9357)
   - Windows developer bị block do shell mismatch (#9182)
   - Auth migration breaking existing setups (#9474)

2. **Operational gaps**:
   - Không thể cancel running jobs (#9425)
   - Cron output bị discard mặc định (#9340)
   - Config UI vẫn English dù chọn locale khác (#9363)

3. **Security concerns**:
   - WhatsApp token leak (#9417)
   - Browser tool file write escape (#9362)
   - Security tool exposed to model (#9472)

### **Positive signals**:

- Contributors mới tích cực (10+ tác giả trong 30 PRs top)
- RFC process hoạt động (2 RFC proposals tuần này)
- Maintainers responsive (most issues labeled trong 48h)

---

## 🗺️ Backlog & Roadmap

### **v0.8.5 Scope** (từ #9459):

**Must-have**:
- ✅ Security fixes (#9417, #9362, #9472)
- 🔄 Auth migration fix (#9474) - blocking
- 🔄 Test stability (#9357, #9475)

**Should-have**:
- PowerShell Windows support (#9182)
- Nextcloud Talk bot API (#9181)
- SOP cancellation (#9425)

### **Long-term trackers**:

1. **#8288** 🎯 SOP daemon control plane to 5/5
   - Epic tracker cho SOP capabilities
   - 13 capabilities cần verify
   - P2 priority, high risk

2. **#8858** 📝 Audit drift surfaces
   - Cleanup tracker: comments, docs, examples out of sync
   - P2, low risk, ongoing

3. **#8692** 🏛️ Maintainer decision queue
   - RFC approval/rejection tracker
   - 2 RFCs pending (#9330, #9346)

### **Technical debt**:

- **#8784** Refactor split-history loop (stale candidate)
- **#9473** Recover disabled zeroclaw_root_crate tests
- **#9471** Retire dormant cron test module
- **#9451** Remove unused DORA telemetry

---

## 🎓 Insights & Recommendations

### **Điểm mạnh**:

✅ Quy trình security response nhanh (P1 bugs get immediate attention)  
✅ Strong contributor diversity (trusted/distinguished/principal tiers)  
✅ Comprehensive RFC process cho breaking changes  
✅ Active CI/test investment

### **Rủi ro cần theo dõi**:

⚠️ **Test stability crisis** - 95% failure rate trên master chặn CI  
⚠️ **Migration path gaps** - auth profile breaking users  
⚠️ **Windows platform debt** - nhiều Windows-specific fixes cần backport  
⚠️ **Stacked PR risk** - #9447 depends on #9424, có thể delay v0.8.5

### **Khuyến nghị**:

1. **Immediate**: Hotfix #9474 (auth migration) - blocking all auth commands
2. **Short-term**: Stabilize test suite trước khi add features mới
3. **Medium-term**: Windows parity pass (PowerShell, ACL, test coverage)
4. **Long-term**: Consider AI PR review RFC (#9330) sau khi test stability resolved

---

**📅 Next update**: 29/07/2026  
**🔗 Milestone tracker**: [v0.8.5](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo phân tích PicoClaw - Ngày 2026-07-28

## 🎯 Tóm tắt hôm nay

Dự án PicoClaw đang trong giai đoạn hoàn thiện và mở rộng với 5 issues và 4 pull requests đang mở. Các hoạt động chính tập trung vào **quốc tế hóa** (thêm tiếng Nhật), **cải thiện trải nghiệm deployment** (hỗ trợ systemd), **cập nhật model providers**, và **xử lý các vấn đề về hiệu năng WebUI**. Đáng chú ý là cộng đồng đang phát hiện một số lỗi nghiêm trọng ảnh hưởng đến trải nghiệm người dùng như agent loop bị treo và WebUI lag.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### Pull Requests đáng chú ý

#### 🌐 **PR #3273: Bổ sung localization tiếng Nhật**
- **Tác giả**: @honbou
- **Nội dung**: Thêm đầy đủ 968 dòng dịch tiếng Nhật cho WebUI
- **Ý nghĩa**: Mở rộng thị trường châu Á, đặc biệt là Nhật Bản - thị trường quan trọng cho công cụ AI
- **Chất lượng**: Dịch hoàn chỉnh từ `en.json`, tích hợp dayjs locale

#### 🤖 **PR #3271: Cập nhật danh sách models mới nhất (2026-07)**
- **Tác giả**: @LeaderOnePro
- **Scope**: Cập nhật 9 providers chính
- **Highlights**:
  - OpenAI: `gpt-5.6-terra/luna/sol` (thế hệ mới thay gpt-5.4/5.5)
  - Anthropic: `claude-4.1-halo/neo/lux`
  - Google: Gemini 3 series
- **Ý nghĩa**: Đảm bảo người dùng có thể truy cập các model AI mới nhất

#### 🎤 **PR #3270: Thêm DashScope TTS & WeChat audio**
- **Tác giả**: @MrTreasure
- **Tính năng mới**:
  - TTS provider cho Alibaba Cloud DashScope
  - Gửi file audio qua WeChat
  - Hỗ trợ nhiều voice models và định dạng (MP3, WAV, PCM)
- **Ý nghĩa**: Mở rộng khả năng đa phương tiện và tích hợp với hệ sinh thái Trung Quốc

#### 🔄 **PR #3200: Configurable fallback chain cho models**
- **Tác giả**: @lc6464
- **Tính năng**: Cho phép cấu hình chuỗi fallback models mặc định qua WebUI
- **UX improvement**: Người dùng có thể đặt model chính + backup, reorder chain
- **Trạng thái**: Đang mở từ đầu tháng 7, cho thấy tính năng phức tạp cần review kỹ

---

## 💡 Điểm nổi bật cộng đồng

### 🔥 Issue được quan tâm nhất

#### **Issue #3276: Hỗ trợ systemd cho deployment production**
- **Yêu cầu**: 
  - Phát hiện gateway được quản lý bởi systemd
  - Không hard-fail khi gặp channel types không rõ trong config
- **Bối cảnh**: Người dùng deploy headless server trên Ubuntu VM
- **Tầm quan trọng**: **Cao** - liên quan đến production deployment, một use case quan trọng cho enterprise

#### **Issue #3281: WebUI lag nghiêm trọng với lịch sử chat dài**
- **Triệu chứng**: Input box bị lag khi session có nhiều lịch sử
- **Tác động**: **Trải nghiệm người dùng bị ảnh hưởng nặng**
- **Nguyên nhân có thể**: Rendering performance issue, không tối ưu virtualization

---

## 🐛 Ổn định & Bugs

### 🚨 **Critical Bug: Agent loop hang khi MCP server fail (#3269)**
- **Tác giả**: @ruiyigen
- **Mức độ nghiêm trọng**: **Rất cao** 🔴
- **Hiện tượng**: 
  - Khi MCP server connection fail → agent loop bị treo
  - Chat interface ngừng phản hồi người dùng
- **Môi trường**: Qwen3 model, picoclaw nightly build
- **Ảnh hưởng**: Làm gián đoạn hoàn toàn workflow của người dùng
- **Root cause**: Thiếu error handling và timeout mechanism trong agent loop

### ⚠️ **Issue #3268: exec tool action parameter design flaw**
- **Vấn đề**: 
  - Parameter `action` được đánh dấu required nhưng không có default
  - AI agent thường bỏ qua parameter này → tool call fail
- **Đề xuất**: Default `action` về `"run"` (99% use case)
- **Tác động**: Ảnh hưởng đến reliability của AI agent interactions

### 🎨 **Issue #3281: WebUI performance degradation**
- **Tái diễn**: Lag tăng theo độ dài lịch sử chat
- **Nguyên nhân tiềm ẩn**: 
  - Không có virtual scrolling
  - Re-render toàn bộ message list
  - Memory leak trong React components

---

## ✨ Yêu cầu tính năng

### 🌍 **Localization expansion (#3272)**
- **Ngôn ngữ**: Tiếng Nhật (đã có PR #3273)
- **Motivation**: Documentation đã có tiếng Nhật nhưng UI chưa
- **Impact**: Mở rộng user base tại Nhật Bản

### 🔧 **DevOps-friendly deployment (#3276)**
- **Yêu cầu**:
  - Detect externally-managed gateway (systemd, docker, k8s)
  - Graceful handling của unknown channel types
- **Use case**: Enterprise deployment patterns

### 🎛️ **Model fallback configuration (#3200)**
- **Feature**: UI để config default fallback chain
- **Benefit**: 
  - Tăng reliability khi primary model down
  - Tự động chuyển sang backup models
  - User-friendly configuration

---

## 👥 Phản hồi người dùng

### Sentiment tích cực ✅
- Cộng đồng đang **actively contribute** features (localization, TTS, model updates)
- Có nhiều PR từ contributors khác nhau → community engagement tốt
- Người dùng có nhu cầu production deployment → sản phẩm đạt mức maturity cao

### Pain points 🔴
1. **Stability issues**: MCP connection failures gây agent hang
2. **Performance**: WebUI lag với chat history dài
3. **DX issues**: Tool parameter defaults không hợp lý
4. **Deployment friction**: Thiếu hỗ trợ cho enterprise deployment patterns

### Xu hướng sử dụng 📊
- **Headless/server deployment** đang phổ biến (systemd, VM)
- **Multi-model setup** với fallback chains
- **International users** (Nhật Bản, Trung Quốc)
- **Voice/audio integration** với platforms như WeChat

---

## 🗺️ Backlog & Roadmap

### Immediate priorities (inferred from issues)
1. **🔴 Fix critical bugs**:
   - Agent loop hang on MCP failure (#3269)
   - WebUI performance with long history (#3281)
   
2. **🟡 DX improvements**:
   - Systemd gateway detection (#3276)
   - exec tool default parameters (#3268)

3. **🟢 Feature expansion**:
   - Complete Japanese localization (#3273)
   - Model fallback chain UI (#3200)
   - DashScope TTS integration (#3270)

### Technical debt signals ⚠️
- Error handling infrastructure cần cải thiện (MCP timeout issue)
- Frontend performance optimization cần được ưu tiên
- Config validation logic cần robust hơn (unknown channel types)

### Growth indicators 📈
- **Provider ecosystem expanding**: 9 providers được cập nhật model list
- **Platform integration**: WeChat, DashScope (Alibaba Cloud)
- **Enterprise readiness**: Systemd, production deployment concerns
- **International expansion**: Japanese localization

---

## 💬 Kết luận

PicoClaw đang trong giai đoạn **maturation** với focus vào:
- ✅ **Stability & reliability** (fixing critical bugs)
- ✅ **User experience** (performance, localization)
- ✅ **Enterprise readiness** (deployment patterns, fallback mechanisms)
- ✅ **Ecosystem expansion** (new providers, integrations)

**Điểm cần lưu ý**: Có 2 critical bugs (#3269, #3281) cần được ưu tiên xử lý để duy trì user trust. Các PR đang mở cho thấy community health tốt nhưng cần review và merge nhanh hơn để maintain momentum.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/nanocoai/nanoclaw">nanocoai/nanoclaw</a></summary>

# 📊 Báo cáo Phân tích NanoClaw - 28/07/2026

## 🎯 Tóm tắt hôm nay

Hôm nay NanoClaw chứng kiến hoạt động tập trung vào việc hoàn thiện các tính năng hiện có với 9 PR đang hoạt động, trong đó có 1 PR được đóng và 8 PR đang mở. Không có issue mới được tạo, cho thấy đội ngũ đang tập trung vào việc giải quyết backlog và cải thiện chất lượng code. Các cải tiến chủ yếu xoay quanh sửa lỗi adapter Signal, cải thiện hệ thống approval, và mở rộng khả năng tích hợp kênh mới.

## 🚀 Releases

Không có release mới trong 24 giờ qua.

## 📈 Tiến độ dự án

### **Xu hướng phát triển chính:**

**🔧 Cải thiện Hạ tầng Core (Core Team Focus)**
- **PR #3137** - Sửa lỗi engagement consistency và công khai self-serve wiring controls
  - Cho phép agents kiểm tra wirings của chính mình và yêu cầu cập nhật engagement-policy đã được phê duyệt
  - Giữ lại accumulated messages làm context mà không kích hoạt warm-container follow-up turns
  - Từ chối các JavaScript engagement regexes không hợp lệ
  
- **PR #3143** - Bảo toàn nội dung approval card đã resolved
  - Approval cards giờ đây giữ lại title và request details sau khi resolved
  - Thay thế buttons bằng decision status và actor info

**📡 Tích hợp Kênh Mới**
- **PR #3050** - Thêm Dial vào channel picker với wizard/skills
  - Mở rộng ecosystem với kênh giao tiếp mới
  - Cập nhật: 2026-07-27 (hoạt động tích cực)

**🐛 Sửa lỗi Signal Adapter (Ưu tiên cao)**
- **PR #3142** - Sửa lỗi nghiêm trọng về attachments trong Signal
  - Path `/workspace/extra/signal-attachments/<id>` không được mount vào container
  - Agent không thể đọc được PDFs, text files, documents qua Read tool
  - Fix: forward attachments qua mounted inbox path
  
- **PR #2685** - Cập nhật docs cho Signal features
  - Group typing indicators (DMs và groups)
  - Outbound reactions (`operation: 'reaction'`)
  - Quote-reply fixes

**⚙️ Cải thiện Configuration & Skill System**
- **PR #3141** - Sửa lỗi skill selection trong container.json
  - Đảm bảo CLAUDE.md fragments tôn trọng skill selection
  
- **PR #2598** - **[CLOSED]** Fix load per-group CLAUDE.local.md
  - Đã được merge sau 2 tháng development

**🛠️ Utility Skills**
- **PR #2971** - Thêm `ncc` utility skill
  - Host operational và health CLI
  - Công cụ monitoring/diagnostic mới

**💬 UX Improvements**
- **PR #2346** - Sửa lỗi unknown slash commands
  - Commands không xác định bị hiểu nhầm thành Claude Code slash commands
  - Output bị dropped vì không có `<message>` blocks
  - Fix: fallback về `category: 'none'` để xử lý như chat bình thường

## 🌟 Điểm nổi bật cộng đồng

- Không có PR hoặc issue nào có engagement đặc biệt cao (reactions, comments)
- Các PR chủ yếu từ core team và contributors đã quen thuộc
- Hoạt động đều đặn với updates gần đây trên 8/9 PRs (updated trong 2 ngày qua)

## 🔧 Ổn định & Bugs

### **Critical Bugs đang được xử lý:**

1. **Signal Attachments Path Issue** (#3142) - **Ưu tiên cao**
   - Ảnh hưởng: Agents không thể xử lý file attachments trong Signal
   - Impact: Mọi loại file không phải image/audio đều không thể đọc được
   - Status: PR đang mở, cần review

2. **Slash Command Parsing** (#2346)
   - Ảnh hưởng: Unknown commands bị dropped hoàn toàn
   - Thời gian tồn tại: ~2.5 tháng (từ 08/05)
   - Status: Đang chờ merge

3. **Skill Selection Consistency** (#3141)
   - container.json skill selection không được áp dụng đúng cho CLAUDE.md fragments
   - Status: Fix đang review

### **Stability Improvements:**

- Engagement consistency được cải thiện (#3137)
- Approval card state persistence (#3143)
- Rejection cho invalid regex patterns

## ✨ Yêu cầu tính năng

### **Tính năng mới đang triển khai:**

1. **Self-serve Wiring Controls** (#3137)
   - Cho phép agents tự quản lý engagement policies
   - Tăng autonomy và flexibility

2. **Dial Integration** (#3050)
   - Mở rộng khả năng kết nối sang platform mới
   - Bổ sung vào channel ecosystem

3. **NCC Utility Skill** (#2971)
   - Operational và health monitoring CLI
   - Cải thiện observability

4. **Signal Enhancements** (#2685)
   - Group typing indicators
   - Outbound reactions support
   - Quote-reply functionality

## 💬 Phản hồi người dùng

- **Không có feedback trực tiếp từ end-users** trong dữ liệu issues/PRs
- Các cải tiến chủ yếu dựa trên internal testing và core team priorities
- Signal adapter bugs cho thấy gap giữa development và real-world usage testing

## 🗺️ Backlog & Roadmap

### **Ưu tiên ngắn hạn (dựa trên PR activity):**

1. **Hoàn thiện Signal Integration** - 2 PRs đang active
2. **Merge các fixes quan trọng** - Slash commands, skill selection, attachments
3. **Stabilize Approval System** - Preserve card state
4. **Complete Dial Integration** - Đang trong giai đoạn cuối

### **Technical Debt đang tồn đọng:**

- PR #2346 tồn tại từ 08/05 (2.5 tháng) - slash command handling
- PR #2685 tồn tại từ 04/06 (gần 2 tháng) - Signal docs
- Cần review process nhanh hơn cho các fixes quan trọng

### **Xu hướng dài hạn:**

- Mở rộng channel ecosystem (Dial là bước đầu)
- Tăng agent autonomy (self-serve controls)
- Cải thiện observability (ncc utility skill)
- Standardize skill system (container.json fixes)

---

## 📌 Kết luận

NanoClaw đang trong giai đoạn **consolidation và stabilization** thay vì rapid feature development. Với 9 PRs đang active và không có issues mới, đội ngũ tập trung vào việc hoàn thiện các tính năng hiện có và sửa bugs tích lũy. Điểm đáng chú ý là sự tập trung vào Signal adapter - một tín hiệu cho thấy platform này đang được sử dụng nhiều trong production. Các cải tiến về autonomy (self-serve wiring) và observability (ncc skill) cho thấy project đang mature về mặt operations.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo Phân tích IronClaw - Ngày 2026-07-28

## 1. 🎯 Tóm tắt hôm nay

IronClaw đã **chính thức phát hành phiên bản 1.0.0** - một cột mốc quan trọng đánh dấu việc tái kiến trúc hoàn toàn hệ thống từ đầu. Đây không phải là bản nâng cấp từ 0.29.x mà là sản phẩm được xây dựng lại từ nền tảng, tập trung vào kiến trúc extension manifest-driven và cải thiện khả năng phục hồi lỗi. Cùng ngày, team tiếp tục đẩy mạnh 4 epic lớn về khả năng phục hồi lỗi, nền tảng testing hermetic, hệ thống extension thống nhất, và tích hợp memory provider.

## 2. 🚀 Releases

### **ironclaw-v1.0.0** (27/07/2026)

**Ý nghĩa chiến lược:**
- 🏗️ **Tái kiến trúc toàn bộ**: Agent runtime, storage, extension host, và Web UI được xây dựng lại hoàn toàn
- ⚠️ **Breaking change lớn**: Không có đường migration từ 0.29.x - người dùng cần bắt đầu lại với config, database, và secrets mới
- 📦 Binary `ironclaw` mới là sản phẩm chính thức, `ironclaw-legacy` (v1 monolith) không được publish

**Tác động:**
- Team đã quyết đoán chọn clean break thay vì backward compatibility để đảm bảo kiến trúc mới không bị ràng buộc bởi legacy code
- Tín hiệu về sự trưởng thành của dự án - sẵn sàng cho production với kiến trúc được thiết kế từ đầu

## 3. 📊 Tiến độ dự án

### **Epic tracking (4 epic chính đang active)**

#### Epic #6284: Error Recoverability Endgame 🎯
**Mục tiêu**: Model phục hồi từ 100% lỗi
- ✅ PR #6697 merged: LLM adapters giờ báo cáo đúng finish reason từ provider (không còn nhầm lẫn giữa truncated/filtered với success)
- ✅ PR #6684 merged: Thống nhất 5 failure enum thành một `FailureKind` duy nhất, phát hiện và fix 6 lỗi wrongful-terminal/mis-retry
- ✅ PR #6665: Làm cho capability failure diagnostics có thể hành động - thêm `ModelDiagnostic` với giới hạn 4096 bytes
- 14 comments trong issue cho thấy team đang xử lý tích cực

#### Epic #6524: Hermetic Testing Platform 🧪
**Mục tiêu**: Mọi capability và user journey có coverage deterministic
- ✅ PR #6728: Replay provider journeys theo thứ tự đảo ngược trong nightly tests (isolation proof)
- ✅ PR #6738: Pin fault state không leak giữa các test cases
- Đây là nền tảng để đảm bảo chất lượng khi scale

#### Epic #6481: Unified Manifest-Driven Extension Platform 📦
**Mục tiêu**: Extension là package manifest-driven thống nhất
- 🔥 PR #6655: Normalize filesystem-backed extension state records - lifecycle state giờ là derived, không stored
- 🔥 PR #6691: Refactor composition assembly thành focused builders
- PR #6729: Normalize extension installation persistence
- PR #6678: Product command pipeline live (/model, /status) hoạt động đồng nhất trên Slack/Telegram/WebUI

#### Epic #6482: Pluggable Memory Providers 🧠
**Mục tiêu**: Memory là provider-neutral extension surface
- 🔥 PR #6724: Rebuild memory contract dựa trên declared capabilities - manifest giờ là source of truth
- PR #6730: Correct memory provider lifecycle capabilities

### **Infrastructure & Safety Improvements**

- 🔒 **PR #6740**: TLS termination seam cho sandbox egress proxy - bước đầu của credential firewall
- 🔒 **PR #6723** (merged): Sandbox CA + credential-firewall primitives
- 🏗️ **PR #6696**: Collapse lifecycle state vào row-native process journal - kiến trúc storage mới
- 📄 **PR #6692** (merged): Tái cấu trúc docs site - phát hiện 33 internal docs đang bị serve công khai (!), đã fix

### **Xu hướng phát triển**

1. **Shift to Manifest-Driven**: Tất cả extensions, tools, channels giờ khai báo capabilities qua manifest thay vì hardcode
2. **Fail-Closed by Default**: Safety guardrails được tăng cường, mọi thứ mặc định fail safely
3. **Test Isolation**: Investment lớn vào hermetic testing để đảm bảo mỗi test case độc lập
4. **Lifecycle Normalization**: Di chuyển từ aggregate state sang durable lifecycle records

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues được tạo hôm nay (28/07)**

- **#6741** 🐛 **OAuth connection fails** cho Gmail/Calendar sau khi hoàn tất sign-in flow
  - User experience trực tiếp bị ảnh hưởng
  - Chưa có response từ team

- **#6742** ✨ **Missing user profile view** trong WebUI
  - User không biết mình đang dùng account nào (personal vs org)
  - UX issue quan trọng cho multi-account scenarios

- **#6743** 💡 **Request: In-app feedback widget**
  - Hiện user phải ra khỏi app để báo bug
  - Tín hiệu team muốn thu thập feedback tốt hơn

### **Issues có nhiều tương tác**

- **#6284** (14 comments): Error recoverability - vấn đề core về trải nghiệm agent
- **#6524** (3 comments): Testing platform - quan trọng cho chất lượng dài hạn

## 5. 🔧 Ổn định & Bugs

### **Bugs đang được xử lý**

1. **#6060** (CLOSED): Routine delivery target leak - một routine deliver to Slack làm tất cả routines khác cũng đổi sang Slack
   - Đã được fix

2. **#6741** (OPEN - mới hôm nay): OAuth Gmail/Calendar fails
   - Critical cho người dùng extensions
   - Cần attention urgently

3. **#6726** (OPEN): `register_generic_channel_outbound_targets` có thể no-op mà tests vẫn pass
   - Dead code detection - cho thấy test coverage gap

### **Reliability Improvements Merged**

- ✅ Fix 6 wrongful-terminal/mis-retry bugs trong failure handling (#6684)
- ✅ Compaction outage không còn bị classify là driver bug (#6735)
- ✅ LLM finish reasons giờ chính xác (#6697)

## 6. 🎁 Yêu cầu tính năng

### **Tính năng mới được đề xuất hôm nay**

1. **#6743**: In-app feedback widget
   - Giảm friction trong việc báo cáo bugs
   - Tăng quality của feedback nhận được

2. **#6742**: User profile details view
   - Transparency về account đang sử dụng
   - Essential cho multi-tenant scenarios

### **Epic-level Features trong Pipeline**

1. **#6734**: Agent tự truy cập docs của mình
   - Model có thể guide user qua tool/channel configuration
   - Giảm hallucination về capabilities

2. **#6731**: Tích hợp IronHub vào IronClaw
   - Biến tool set từ build-time fixed thành runtime marketplace
   - Community có thể đóng góp tools/skills

3. **#6727**: Support custom MCP servers
   - Hiện chỉ có 2 bundled MCP servers
   - Mở rộng extensibility cho power users

4. **#6725**: Migration path từ pre-Reborn sang v1
   - Critical cho existing users
   - Chưa có design cụ thể

## 7. 👥 Phản hồi người dùng

### **Pain points từ issues**

1. **Setup friction**: OAuth connections failing (#6741) là điểm đau ngay lập tức
2. **Account confusion**: Không biết đang dùng account nào (#6742) gây mất confidence
3. **Feedback loop**: Phải rời app để báo bug (#6743) làm giảm reporting rate

### **Developer Experience**

- Dependabot tạo nhiều dependency update PRs (rust, tokio, wasm, serialization) - team maintain cẩn thận về deps
- CI được tăng cường: TZ/locale pinning, orphan-history branch rejection (#6721)
- Test isolation được investment mạnh - tín hiệu về quality commitment

## 8. 📋 Backlog & Roadmap

### **Immediate Focus (dựa trên open PRs)**

1. **Composition refactor** (#6691) - XL size, risk low
2. **Lifecycle state collapse** (#6696) - XL size, DB migration
3. **Memory provider capabilities** (#6724) - contract rebuild
4. **Extension state normalization** (#6655) - filesystem records

### **Next Wave (dựa trên Epic issues)**

1. **Error recoverability** (#6284) - endgame phase, 100% recovery target
2. **Hermetic testing** (#6524) - platform foundation
3. **Shared messaging layer** (#6484) - provider-neutral operations
4. **Telegram completeness** (#6483) - production hardening

### **Strategic Initiatives**

1. **IronHub integration** (#6731) - marketplace model
2. **Custom MCP servers** (#6727) - extensibility
3. **Migration path** (#6725) - user retention
4. **Ledger clear-signing** (#6672) - security/Web3 integration đang trong review

### **Risks & Gaps**

- ⚠️ **No migration path từ 0.29.x** - có thể mất users
- ⚠️ **OAuth issues** - blocking user onboarding
- ⚠️ **Dead code detection** (#6726) - test coverage không đủ sâu
- ⚠️ **33 internal docs leaked publicly** - đã fix nhưng security concern

---

## 🎬 Kết luận

IronClaw 1.0.0 đánh dấu một bước ngoặt táo bạo - clean break với legacy để xây kiến trúc đúng đắn. Team đang execute tốt trên nhiều epic song song với focus rõ ràng vào reliability, extensibility, và developer experience. Tuy nhiên, cần attention urgent vào OAuth issues và migration path để không mất users hiện tại.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo phân tích hoạt động LobsterAI - 28/07/2026

## 🎯 Tóm tắt hôm nay

Dự án đang trong giai đoạn xử lý các vấn đề nghiêm trọng về bảo mật và độ ổn định, với 3 PR được merge để fix các lỗi critical. Cộng đồng ghi nhận thêm 1 issue mới về lỗi cài đặt, trong khi nhiều issue cũ đang được đánh dấu [stale]. Hoạt động chính tập trung vào việc củng cố nền tảng thay vì phát triển tính năng mới.

## 📦 Releases

Không có release chính thức nào trong 24 giờ qua.

## 🚀 Tiến độ dự án

### PRs đã merge (3)
- **#2394** 🔧 Fix lỗi cài đặt trên Windows khi file bị block bởi manual overwrite protection
- **#2389** 🔐 **[CRITICAL]** Bảo mật email skill - ngăn chặn path traversal attack qua filename trong attachments
- **#2388** ✨ Thêm nút Share/Deploy vào toolbar của Artifact preview, cải thiện UX khi chia sẻ nội dung
- **#2386** 🛑 Fix vòng lặp vô hạn khi tool không tạo progress, terminate sớm trước khi hết token budget

### PRs đang mở (5)
- **#1277** 📦 Dependabot: Upgrade Electron từ 40.2.1 → 43.2.0 (chờ 3+ tháng)
- **#1239** 🔔 Thêm notification bằng cách nhấp nháy taskbar/dock khi task hoàn thành (chờ 3+ tháng)
- **#1241** 💾 Thêm confirm dialog khi đóng Settings có chỉnh sửa chưa lưu (chờ 3+ tháng)

**Xu hướng**: Team đang ưu tiên fix bug nghiêm trọng (bảo mật, infinite loop) hơn là review các enhancement PR đã lâu.

## ⭐ Điểm nổi bật cộng đồng

### Issue hot nhất
**#2393** 🔴 **[BUG NGHIÊM TRỌNG]** - LobsterAI accelerator tự động replace `\f` thành `\x0C` (form feed), gây hỏng dữ liệu file
- Mức độ: Critical - 100% reproducible
- Ảnh hưởng: Bất kỳ file nào chứa literal string như `\firecrawl`, `\filename` đều bị corrupt
- Phát hiện: 27/07 lúc 22:18 bởi @woxinsj
- Liên quan: Đã có bug tương tự với `$PSVersionTable`

Đây là lỗi data corruption nghiêm trọng cần ưu tiên cao nhất.

## 🐛 Ổn định & Bugs

### Bugs đã fix (24h qua)
✅ Path traversal trong email attachments  
✅ Tool infinite loop exhaust token budget  
✅ Windows installation blocked issue  

### Bugs đang mở
🔴 **#2393** - String replacement gây corrupt data (`\f` → `\x0C`)  
🔴 **#2395** - Không thể cài đặt: "user skills could not be backed up"  
🟡 **#1240** - API rate limit lan sang tất cả các agent khác, gây toàn bộ hệ thống "bị liệt"  
🟡 **#2062** - Task timeout nhưng không rõ đã dừng hay vẫn chạy background  
🟡 **#2390** - `exec` tool hardcode `powershell.exe` thay vì `pwsh.exe`, gây lỗi encoding với username tiếng Trung  

### Vấn đề pattern đáng lo ngại
- **Data integrity issues**: Bug #2393 cho thấy có vấn đề với string processing pipeline trong LobsterAI accelerator
- **Installation fragility**: 2 issues về cài đặt thất bại (#2395, #2394)
- **Resource isolation**: API limit của 1 model lan sang tất cả models (#1240)

## 💡 Yêu cầu tính năng

**#2392** - Scheduled tasks thiếu khả năng config:
- Không chọn được agent nào sẽ chạy
- Không chọn được skill nào sẽ dùng

**#2391** - Yêu cầu rename skills (hiện không hỗ trợ)

**#1241** (PR) - Confirm dialog khi đóng Settings có unsaved changes

**#1239** (PR) - Flash taskbar/bounce dock icon khi task complete

## 💬 Phản hồi người dùng

### Trải nghiệm tiêu cực
- **@1yuyin1**: Frustration với lỗi cài đặt, error message không rõ ràng
- **@zolufly-web**: Báo cáo nghiêm trọng - toàn bộ LobsterAI "bị liệt" sau khi 1 API rate limited
- **@woxinsj**: Phát hiện 2 bug nghiêm trọng (data corruption #2393 và PowerShell encoding #2390) với documentation chi tiết xuất sắc

### Pain points chính
1. **Silent failures**: Settings không save (#1237), data bị corrupt không warning (#2393)
2. **Cross-contamination**: 1 API limit ảnh hưởng tất cả agents (#1240)
3. **Lack of visibility**: Task timeout không rõ trạng thái (#2062)
4. **Windows-specific issues**: Chinese username encoding, hardcoded shell paths

## 📋 Backlog & Roadmap

### Ưu tiên khẩn cấp (cần fix ngay)
1. 🔴 Fix data corruption bug (#2393)
2. 🔴 Fix installation issues (#2395)
3. 🟡 Isolate API limits per agent (#1240)

### Technical debt cần xử lý
- Review và merge các PR đang pending 3+ tháng (#1277, #1239, #1241)
- Upgrade Electron lên version mới hơn
- Cải thiện error handling và visibility cho users

### Cải tiến UX được đề xuất
- Scheduled tasks configuration
- Skills rename capability
- Better progress/status indicators
- Unsaved changes detection

---

**📌 Kết luận**: Dự án đang trong "bug-fixing mode" với nhiều vấn đề nghiêm trọng về data integrity và stability. Cần prioritize fix các critical bugs trước khi tiếp tục phát triển tính năng mới. Quality của bug reports từ community rất tốt (đặc biệt @woxinsj), giúp team dễ dàng reproduce và fix issues.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo Phân tích CoPaw - Ngày 28/07/2026

## 📊 Tóm tắt hôm nay

Dự án CoPaw (trước đây là QwenPaw) đang trong giai đoạn phát triển tích cực với 20 issues và 30 PRs được cập nhật trong 24 giờ qua. Trọng tâm chính là nâng cấp kiến trúc hệ thống (sub-agent isolation, browser unification), sửa lỗi trải nghiệm người dùng (context injection, PATH handling), và mở rộng khả năng tích hợp (model providers, third-party agents). Đáng chú ý là các vấn đề về hiệu năng UI (#6460 - CPU cao) và cơ chế approval level không được kế thừa trong sub-sessions (#6506).

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua. Phiên bản hiện tại đang được sử dụng rộng rãi là **v2.0.1** và **v2.0.0.post4**.

---

## 🔧 Tiến độ dự án

### **PRs quan trọng đang được phát triển:**

#### 🎯 Kiến trúc hệ thống
- **#6508** - Sửa lỗi approval_level không được kế thừa trong spawn_subagent
  - **Vấn đề**: Khi user đặt "never ask" ở parent session, sub-sessions vẫn hỏi xác nhận
  - **Giải pháp**: Truyền approval_level qua request context
  
- **#6509** - Yêu cầu cơ chế cách ly giữa Sub Agents
  - **Vấn đề 1**: Sub Agents có thể gọi lẫn nhau qua CLI (rủi ro bảo mật multi-user)
  - **Vấn đề 2**: Workspace media bị chia sẻ giữa các sessions → xung đột tên file
  - **Đề xuất**: UUID-based directories cho mỗi session

- **#6276** - Browser unification: Một SDK, nhiều backend
  - Thống nhất giao diện điều khiển trình duyệt (CDP, Playwright, Selenium)
  - Thêm WebSocket server `/api/ws/chrome` cho Chrome Extension

#### 🧠 AI & Context Management
- **#6456** - Visual Compact: Nén context bằng hình ảnh
  - Giảm token usage bằng cách convert history/tool results thành visual context
  - Hỗ trợ recovery nội dung gốc khi cần

- **#6398** - Reranker support cho ReMe memory search
  - Over-fetch candidates → rerank → return top results
  - Tích hợp external reranker API

#### 🔌 Integrations
- **#6397** - Tích hợp Codex, Qoder, Skills, MCP
  - Architecture mở rộng cho third-party agents
  - Mỗi agent chọn backend độc lập với Coding Mode

- **#6499** - Thêm Atlas Cloud provider
  - OpenAI-compatible endpoint
  - Model discovery tự động

### **Xu hướng phát triển:**
1. **Bảo mật & Isolation**: Tăng cường cách ly giữa agents/sessions
2. **UI Performance**: Tối ưu SSE replay buffer, giảm CPU usage
3. **Developer Experience**: Cải thiện test coverage (fail_under=50%), documentation
4. **Extensibility**: Mở rộng plugin ecosystem, model providers

---

## ⭐ Điểm nổi bật cộng đồng

### **Issues hot nhất:**

#### 🔥 #6460 - CPU usage cao trên Edge+Wayland (3 comments)
- **Hiện tượng**: Single tab QwenPaw chiếm CPU liên tục, quạt máy kêu
- **Trigger**: Mở trang chủ hoặc sessions lớn có nhiều ComfyUI workflows
- **Root cause** (theo #6485): 
  - Replay buffer không giới hạn → reconnect replay toàn bộ events
  - Thiếu stream heartbeat → reconnect loop không cần thiết

#### 🐛 #6506 - Approval level không work với sub-agents (2 comments)
- **Impact**: Mission Mode workers vẫn hỏi xác nhận dù user đã tắt
- **Workaround**: Chờ fix #6508

#### 🌏 #6510 - Chinese path bị URL encode (1 comment)
```
Expected: 2026-06-17-灵魂互换那天，我的冰箱哭了
Actual:   2026-06-17-%E7%81%B5%E9%AD%82%E4%BA%92%E6%8D%A2...
```
- Lỗi path handling trong QwenPaw 2.0
- Ảnh hưởng người dùng Trung Quốc/Châu Á

---

## 🐞 Ổn định & Bugs

### **Bugs đã fix/đang fix:**

#### ✅ Đã fix
- **#6412** - Windows PowerShell multiline commands bị collapse
- **#6410** - Gemini schema sanitization không xử lý annotated null
- **#6409** - Local models tool call JSON malformed → AttributeError

#### 🔄 Đang xử lý
- **#6258** - OpenAI max_tokens không có hiệu lực (4 comments)
- **#6324** - MiniMax-M3 response bị truncate (3 comments)
- **#6386** - Tool được gọi lặp lại nhiều lần (2 comments)

#### ⚠️ Cần attention
- **#6358** - Context injection dùng role='system' ở giữa message list
  - Nhiều API (GLM, OpenAI, Anthropic) yêu cầu system message ở đầu
  - Fix #6360 đề xuất đổi sang role='user'

---

## 💡 Yêu cầu tính năng

### **Top feature requests:**

1. **#6455** - Multi-model execution trong 1 agent (2 comments)
   - User muốn: "Chạy DS v4 Pro, Qwen 3.7 Max, Kimi K3 độc lập → merge kết quả"
   - Use case: File modification, fact checking

2. **#6507** - Group/filter sub-agent sessions trong chat history
   - **Vấn đề**: Mission Mode spawn hàng trăm sub-sessions → chat list không dùng được
   - **Đề xuất**: Group, filter hoặc exclude khỏi main history

3. **#6269** - Workspace checkpoint management
   - Git-based snapshot system cho conversation history
   - Shadow repo không ảnh hưởng workspace's .git

4. **#6424** - Native desktop GUI automation (Computer Use)
   - Windows + macOS support
   - Accessibility-first + Tauri control mode

---

## 💬 Phản hồi người dùng

### **Tích cực:**
- Cộng đồng đánh giá cao responsive team (nhiều issues được reply trong 1-2 ngày)
- Architecture improvements được chào đón (browser unification, agent stats)

### **Tiêu cực / Pain points:**
- **Chinese path handling** (#6510): Người dùng Trung Quốc gặp khó khăn với tên file UTF-8
- **CPU usage trên remote access** (#6460): Ảnh hưởng trải nghiệm khi dùng qua mạng
- **Sub-agent UX chaos** (#6507, #6509): Thiếu isolation và organization
- **Model compatibility** (#6258, #6324): Token limit và truncation không đáng tin cậy

### **Documentation gaps:**
- #6467 - User nhầm lẫn QwenPaw với VPN tool (do xem nhầm video)
- #6501 - Dev setup instructions thiếu `test` extra

---

## 📋 Backlog & Roadmap

### **Short-term (đang code):**
1. ✅ Sub-agent approval inheritance (#6508)
2. 🔄 SSE performance optimization (#6485)
3. 🔄 Test coverage gate (50% threshold) (#6489)
4. 🔄 Atlas Cloud provider integration (#6499)

### **Mid-term (in review):**
1. Browser unification + Chrome Extension (#6276, #6157)
2. Third-party agent framework (Codex, Qoder) (#6397)
3. Visual Compact context compression (#6456)
4. Workspace checkpoints (#6269)

### **Long-term (proposed):**
1. Multi-model parallel execution (#6455)
2. Computer Use - desktop automation (#6424)
3. QwenPaw Creator app (#6284)
4. Session isolation architecture (#6509)

### **Technical debt:**
- Windows PATH separator handling (#6239 - closed but related issues remain)
- Plugin versioning logic (#6496 - legacy plugins silently disabled)
- Context injection API design (#6358)

---

## 🎯 Kết luận

**CoPaw đang trong giai đoạn trưởng thành**, chuyển từ MVP sang production-grade system. Team tập trung vào:
- **Stability**: Fixing UX bugs, performance issues
- **Scalability**: Agent isolation, context management
- **Extensibility**: Plugin ecosystem, provider integrations

**Risk areas cần watch:**
- Multi-user security (sub-agent isolation chưa đầy đủ)
- Performance trên large sessions (SSE replay, visual context)
- Breaking changes trong plugin versioning

**Cộng đồng**: Active, patient với bugs, nhưng cần better docs và clearer roadmap communication.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo Phân tích Hermes-Agent | 2026-07-28

## 🎯 Tóm tắt hôm nay

Hermes-Agent có một ngày hoạt động **cực kỳ sôi nổi** với 8 issues mới và 50 pull requests (30 PR hiển thị), tập trung vào 3 trục chính: **sửa lỗi session state và message delivery** (chiếm ~40% hoạt động), **cải thiện UX trên Desktop app**, và **xây dựng hệ thống observability với Relay metrics**. Đáng chú ý là chuỗi PR về telemetry cho thấy dự án đang chuẩn bị infrastructure cho production-grade monitoring.

---

## 🚀 Releases

Không có release nào được phát hành trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### 🔥 Xu hướng phát triển chính

**1. Session State & Message Delivery (P1-P2, Critical Path)**

Đây là ưu tiên số 1 với loạt PR high-risk:

- **#73031** (P1): Gateway thiếu activity watchdog → agent loop stall không được phát hiện. Đây là revert của revert, cho thấy tính năng quan trọng nhưng quy trình review chưa hoàn thiện.
- **#73028** (P2): OpenRouter/Kimi - empty stream stub gây session poisoning khi stream bị drop giữa tool call. PR salvage từ #68041, có logic repair cho sessions bị hỏng.
- **#73027** (P2): HTTP 422 không được classify → screenshot trong tool message giết chết session vĩnh viễn (#72905). Multimodal content trên OpenRouter đang gặp nhiều vấn đề.
- **#73039**: Verify-on-stop/pre_verify nudge không persist trước khi emit UI → có thể mất answer nếu DB fail.

**Insight**: Message delivery pipeline đang được hardening mạnh mẽ, đặc biệt với OpenRouter provider. Nhiều edge case liên quan đến streaming và multimodal content.

**2. Desktop App UX Polish (P3, User-Facing)**

Chuỗi PR từ @OutThisLife và team:

- **#73041**: Tab scrolling - active tab và nút "+" biến mất khỏi viewport khi scroll
- **#73038**: Theme picker trong ⌘K không show check cho theme đang active
- **#73035** (P2): Clarify prompt card "chiếm hostage" keyboard → không thể type message để từ chối options
- **#72986**: Drag animation cho pet overlay (gamification feature)
- **#73024** (perf): Cold start optimization - loại shiki/mermaid khỏi boot path, giảm 22MB parse upfront
- **#73033** (perf): GlyphSpinner gây React churn với timer state

**Insight**: Desktop đang được polish ở mức micro-interaction. Nhiều PR nhỏ nhưng impact lớn lên perceived performance và usability.

**3. Observability & Telemetry Stack (P3, Infrastructure)**

Chuỗi PR dài từ @afourniernv xây dựng Relay metrics system:

- **#68882**: Tool metrics aggregation (Category 6)
- **#68883**: Skill lifecycle metrics (Category 7)
- **#68978**: Client resource metrics (Category 2)
- **#69416**: Active install metrics (Category 1)
- **#69437**: Setup và first-use metrics (Category 3)

**Insight**: Đây là một **infrastructure overhaul** lớn, có khả năng chuẩn bị cho commercial/enterprise offering. Privacy-safe aggregation được nhấn mạnh nhiều lần.

**4. Safety & Security**

- **#73026** (P3, security): Cron LLM job responses không được redact secrets trước khi deliver
- **#27016** (P3): Google Chat OAuth bug dùng resource ID thay vì email → token lookup fail

---

## 🔍 Điểm nổi bật cộng đồng

### Issues có tương tác cao:

1. **#50681** (3 comments): **Pytest pollution vào production state.db** - 187 fake sessions sau mỗi test run. Root cause: `DEFAULT_DB_PATH` là module-level constant, freeze lúc import. Đây là **critical test hygiene issue**.

2. **#40146** (4 comments): IME composition (Chinese input) không trigger send button → UX bug ảnh hưởng CJK users. Open từ 2026-06-05, chưa fix.

3. **#67325** (2 comments): Skill documentation drift detection - CI regenerate docs nhưng không có read-only check. Needs-decision label cho thấy đang tranh luận approach.

4. **#72905** (1 comment): Screenshot + OpenRouter → session killed permanently. Đã có PR fix (#73027) trong cùng ngày.

### PR đáng chú ý:

- **#73008**: Discord durable thread lifecycle với terminal markers (`⏳ ✅ ⏹️ ❌ ⚠️`). Giải quyết #73032 về duplicate threads.
- **#70509** (needs-decision): **On-device wake words** với open-vocabulary và multi-profile voice routing. Feature lớn nhưng đang pending review.

---

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng (P1-P2):

1. **Session poisoning cluster** (4 PRs active):
   - Empty stream stubs
   - HTTP 422 misclassification
   - Verify-on-stop không persist
   - Activity watchdog missing

2. **#73042** (mới nhất): Context-usage statusbar item deadlock - ẩn by default nhưng không thể toggle back. Hidden + runtime condition xung đột.

3. **#73030**: Kanban child subscriptions drop `chat_type` và `delivery_metadata` → notifications không deliver đúng platform.

4. **#73032**: Discord auto-thread tạo duplicate threads và duplicate agent replies.

### Regression risk:

- **#71271**: Test suite ghi vào `~/.hermes/logs/` thật của developer (cùng category với #50681)
- **#69243**: Service test suite gây hard exit, truncate pytest

**Insight**: Test isolation và state management là **pain point lớn**. Cả state.db lẫn logs đều bị test pollution.

---

## ✨ Yêu cầu tính năng

### Features đang được implement:

1. **#70509** (voice): Wake words với open-vocabulary - feature hoàn chỉnh nhưng needs-decision
2. **#72477** (orchestration): Dynamic contract boundaries - pure/unwired domain package
3. **#73025** (TUI/Desktop): Auto-indentation cho list numbers trong prompt input

### Feature gaps được highlight:

- **#67325**: Documentation drift detection
- **#73008**: Durable Discord thread lifecycle (đang được add)

---

## 💬 Phản hồi người dùng

### Pain points từ community:

1. **CJK input support** (#40146) - vấn đề kéo dài 2 tháng chưa fix
2. **Session contamination** (#50681) - test pollution ảnh hưởng production DB
3. **Discord threading confusion** (#73032) - duplicate threads gây UX chaos
4. **OpenRouter compatibility** - nhiều issues về multimodal content và error handling

### Positive signals:

- Desktop UX đang được polish chi tiết (tab scrolling, theme picker, clarify prompt)
- Performance được chú ý (cold start optimization, React churn fixes)
- Security được tích hợp sâu (secret redaction in cron, OAuth fixes)

---

## 🗺️ Backlog & Roadmap

### Đang triển khai (inferred từ PR patterns):

1. **Q3 2026 - Observability Stack**: Chuỗi 5 PR về Relay metrics cho thấy đang build production monitoring foundation. Có thể là chuẩn bị cho enterprise tier.

2. **Desktop v2 Polish**: Liên tục có micro-optimization và UX fixes. Khả năng chuẩn bị major release.

3. **Multi-platform Gateway Hardening**: Discord, Telegram, Google Chat đều có active fixes. Gateway đang được ổn định hóa.

### Needs-decision items:

- **#67325**: Doc generation approach
- **#70509**: Wake word feature (complete, pending approval)
- **#72477**: Orchestration architecture

### Technical debt being addressed:

- Test isolation (#71271, #50681, #69243)
- Session state consistency (4 active PRs)
- Provider compatibility layer (OpenRouter, DeepSeek, Kimi)

---

## 📊 Phân tích số liệu

- **50 PRs active** - tốc độ phát triển rất cao
- **8 new issues** - phần lớn là bugs từ recent changes
- **~40% effort** đổ vào session state/message delivery
- **~25% effort** đổ vào Desktop UX
- **~20% effort** đổ vào observability infrastructure
- **Multiple P1-P2 issues** trong cùng category (session state) → có thể có systemic design issue

---

## 🎯 Đánh giá tổng quan

**Tích cực**:
- Velocity cao, response time nhanh (nhiều issue có PR trong cùng ngày)
- Đầu tư vào observability cho thấy mindset production-ready
- Desktop UX được chăm chút chi tiết
- Security-conscious (secret redaction, OAuth fixes)

**Cần cải thiện**:
- Test isolation là vấn đề lớn, ảnh hưởng developer experience
- Session state có nhiều edge cases chưa cover → cần architectural review
- OpenRouter integration cần compatibility layer tốt hơn
- Quy trình review chưa chặt (có revert của revert)

Hermes-Agent đang trong giai đoạn **mature rapidly** với focus vào stability và production-readiness, đồng thời maintain velocity cao cho features mới.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*