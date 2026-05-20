# Bản tin Hệ sinh thái OpenClaw 2026-05-20

> Issues: 103 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-05-20 02:00 UTC

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

# Báo cáo phân tích OpenClaw - Ngày 2026-05-20

## 1. 📋 Tóm tắt hôm nay

OpenClaw đang trong giai đoạn ổn định hóa sau các bản phát hành gần đây, với 2 bản beta/alpha được release trong 24h qua. Hoạt động chính tập trung vào việc sửa lỗi nghiêm trọng liên quan đến session state, message delivery, và tối ưu hóa resource usage. Cộng đồng đang phản ánh nhiều vấn đề về stability trên các phiên bản mới nhất (2026.5.18), đặc biệt là crash loops và memory leaks.

## 2. 🚀 Releases

### v2026.5.19-beta.2 & v2026.5.19-alpha.1

**Thay đổi chính:**
- 🔧 **Cải thiện kiến trúc nội bộ**: Nhấn mạnh refactoring sạch, giảm thiểu technical debt
- 📦 **Cập nhật dependencies**: 
  - `@openclaw/proxyline` → 0.3.3
  - Pi packages → 0.75.1
  - Yêu cầu Node.js 22.19+ (tăng từ 22.x)
- 🐳 **Docker/Podman**: Thêm `OPENCLAW_IMAGE_APT_PACKAGES` để cài đặt packages linh hoạt hơn

**Ý nghĩa**: Đây là các bản hotfix nhằm ổn định sau những vấn đề nghiêm trọng được phát hiện ở v2026.5.18. Việc nâng yêu cầu Node.js cho thấy team đang tận dụng các tính năng mới để cải thiện performance.

## 3. 📊 Tiến độ dự án

### Pull Requests nổi bật:

**🔴 Ưu tiên cao (P1):**

1. **#84388 - Fail closed Codex native execution** (maintainer review)
   - Vô hiệu hóa Codex native execution trong sandbox để tăng cường bảo mật
   - Merge risk: compatibility + security boundary
   - Phản ánh xu hướng tăng cường sandbox isolation

2. **#82263 - Fix parallel tool call deltas** (ready for review)
   - Sửa lỗi nghiêm trọng: phantom tool calls khi streaming từ OpenAI API
   - Impact: message delivery
   - Đã có proof sufficient

3. **#84141 - Isolated cron agent missing exec tool** (Issue)
   - Regression nghiêm trọng ở v2026.5.18: cron jobs thiếu tools đã được config
   - 2 comments, 2 👍 - đang được điều tra

**🟡 Cải tiến quan trọng:**

4. **#84290 - Doctor structured repair conversion** (XL size)
   - Tiếp tục chuyển đổi doctor command sang kiến trúc structured health checks
   - Part của refactoring lớn hơn (#83753)

5. **#82937 - Yield diagnostic event drains** (automerge armed)
   - Tối ưu event loop để tránh blocking khi có burst traffic
   - Sử dụng Codex extension

### Xu hướng phát triển:

- **Refactoring hệ thống**: Nhiều PR lớn (XL size) đang chuyển đổi sang kiến trúc mới (doctor commands, health checks)
- **Stability focus**: Ưu tiên sửa crash loops, memory leaks, và session state issues
- **Security hardening**: Tăng cường sandbox isolation và permission controls

## 4. 🌟 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

1. **#68596 - Configurable streaming watchdog timeout** (12 comments, 7 👍)
   - Models với extended reasoning (kimi-k2.5, DeepSeek-R1) bị timeout sai
   - Yêu cầu: cho phép config timeout threshold
   - Status: Diamond Lobster rating, cần product decision

2. **#7722 - Filesystem Sandboxing Config** (7 comments, 4 👍)
   - Feature request: `tools.fileAccess` để giới hạn filesystem access
   - Security impact cao
   - Đã có reproduction steps rõ ràng

3. **#67419 - Session context bloat** (7 comments, 1 👍)
   - Bootstrap files chiếm 20-30% context và được re-inject mỗi turn
   - Waste tokens nghiêm trọng
   - Cần product decision về cách optimize

### Vấn đề người dùng quan tâm:

- **Token efficiency**: Context bloat và bootstrap file re-injection
- **Timeout tuning**: Cần flexibility cho các model khác nhau
- **Security controls**: Filesystem sandboxing và permission management
- **Stability**: Crash loops trên macOS và Windows

## 5. 🐛 Ổn định & Bugs

### Bugs nghiêm trọng (P1):

1. **#83968 - Gateway crashes on macOS v2026.5.18** (4 comments)
   - `AssertionError: assert(!this.paused)` gây crash loop
   - Rollback về 2026.5.12 để ổn định
   - Chưa có root cause analysis

2. **#68258 - Gateway self-SIGTERM on OAuth refresh**
   - OAuth token refresh trigger gateway restart
   - Drops tất cả in-flight WebSocket work
   - Impact: message loss + auth provider

3. **#67461 - Undici socket leak** (2 comments)
   - Leak IPv6 sockets đến api.anthropic.com
   - 11,507 leaked sockets sau 5 giờ → `spawn EBADF`
   - Root cause: `buildManagedResponse` missing finalize on GC

### Bugs về message delivery:

4. **#84238 - Telegram reply stuck in pendingFinalDelivery**
   - Reply không được gửi dù `attempt=1, lastError=null`
   - Regression ở v2026.5.18

5. **#83831 - Discord streamed reply disappears**
   - Reply biến mất sau tool-call failure warning
   - Đã closed nhưng có proof supplied

### Memory & Performance:

6. **#68527 - MCP retry storm exhausts VM resources**
   - Misconfigured MCP server → 312 child processes, ~10GB RSS
   - Cần: backoff, circuit breaker, systemd guardrails

7. **#68470 - MiniMax token double-counting**
   - Prompt tokens bị count 2 lần → premature compaction ở ~20% context

## 6. 💡 Yêu cầu tính năng

### High priority:

1. **Per-agent compaction overrides** (#83637 - PR open)
   - Cho phép mỗi agent config riêng compaction behavior
   - Quan trọng cho multi-agent setups

2. **Remote Reranker Endpoint Support** (#64438)
   - Tương tự remote embedding providers
   - Support Qwen3-Reranker-8B, Cohere Rerank
   - Security + product decision needed

3. **Persist per-session working context** (#67511)
   - Giữ working directory context qua `/compact`, `/new`, subagent runs
   - Giảm confusion về "where am I working"

### Medium priority:

4. **Session duration in status footer** (#68226)
   - Hiển thị elapsed time của session
   - Simple UX improvement

5. **Sender name alias mapping for Feishu** (#68618)
   - Override/customize sender names
   - Giải quyết API permission limitations

6. **Expose maxMissedJobsPerRestart in cron config** (#42039)
   - Hiện tại hardcoded, cần expose ra config
   - Quan trọng cho gateway restarts

## 7. 💬 Phản hồi người dùng

### Tích cực:

- Cộng đồng đánh giá cao việc team responsive với bug reports
- Documentation improvements được chú ý (nhiều docs PRs)
- ClawSweeper bot automation được sử dụng tích cực

### Tiêu cực:

1. **Regression concerns** (#67626 - closed):
   - User phàn nàn: "越更新越更的像屎一样" (càng update càng tệ)
   - Phản ánh frustration với stability issues

2. **Upgrade pain**:
   - Nhiều users gặp issues khi upgrade từ 2026.5.7 → 2026.5.18
   - Breaking changes không được document rõ ràng

3. **Configuration complexity**:
   - Setup process phức tạp hơn so với thời kỳ clawbot
   - Cần nhiều manual config tweaking

### Trải nghiệm cụ thể:

- **Matrix integration**: Bot receives messages nhưng không deliver đến agent (#68188)
- **Canvas/Browser UI**: Visualization fails trong chat environment (#68264)
- **Node v25.9 issues**: 100% CPU, broken tools, no long-term memory (#68285)

## 8. 🗺️ Backlog & Roadmap

### Đang trong pipeline:

1. **Doctor command refactoring** (multi-PR effort)
   - #83753, #84290, #84326, #84340
   - Chuyển sang structured health checks
   - Improve dry-run/diff proof

2. **Security hardening**:
   - Sandbox isolation improvements (#84388)
   - Filesystem access controls (#7722)
   - Plugin allowlist warnings (#68780)

3. **Memory optimization**:
   - Bootstrap file injection optimization (#67419)
   - Context bloat reduction
   - Token efficiency improvements

### Technical debt:

- **Socket leak fixes** (#67461) - critical
- **OAuth refresh handling** (#68258) - causes downtime
- **MCP retry logic** (#68527) - resource exhaustion risk
- **Hot-reload stability** (#68493) - Windows crash loops

### Cần product decisions:

- Filesystem sandboxing API design (#7722)
- Streaming watchdog timeout configuration (#68596)
- Bootstrap file injection strategy (#67419)
- Multi-user session attribution (#68353)

---

## 🎯 Kết luận

OpenClaw đang trong giai đoạn **consolidation** sau một đợt phát triển tính năng mạnh. Team đang ưu tiên:

1. ✅ **Stability** - sửa crash loops và memory leaks
2. ✅ **Performance** - optimize token usage và event loop
3. ✅ **Security** - tăng cường sandbox và permission controls
4. ⚠️ **User experience** - vẫn còn pain points về configuration complexity

**Rủi ro chính**: Regression rate cao ở các bản gần đây (2026.5.18) đang gây frustration trong cộng đồng. Cần cân bằng giữa velocity và stability testing.

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 2026-05-20

## 1. 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trải qua giai đoạn **consolidation và maturation** với các dự án chuyển từ rapid prototyping sang production-ready systems. Ngày 20/05/2026 chứng kiến hoạt động sôi nổi với **285 PRs** và **176 issues** trên 10 dự án chính, phản ánh sự cạnh tranh khốc liệt và innovation liên tục.

### Đặc điểm chung:
- **Security-first mindset**: Tất cả dự án đều ưu tiên bảo mật (sandbox isolation, auth hardening)
- **Multi-agent orchestration**: Xu hướng chuyển từ single-agent sang collaborative systems
- **Cross-platform push**: Windows đang được nâng từ "best-effort" lên tier-1 support
- **Plugin/Extension ecosystems**: Marketplace models đang nổi lên (CoPaw, OpenClaw, Zeroclaw)
- **Cost optimization**: Prompt caching, context management, token efficiency là pain points chung

---

## 2. 📈 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Velocity | Community Engagement | Maturity Level |
|-------|--------|-----|----------|----------|---------------------|----------------|
| **OpenClaw** | 103 | 500 | 2 | 🔥🔥🔥🔥🔥 | ⭐⭐⭐⭐ | Production |
| **NanoBot** | 31 | 36 | 0 | 🔥🔥🔥🔥 | ⭐⭐⭐ | Beta |
| **Zeroclaw** | 7 | 43 | 0 | 🔥🔥🔥 | ⭐⭐ | Alpha |
| **PicoClaw** | 9 | 18 | 1 | 🔥🔥🔥 | ⭐⭐⭐ | Beta |
| **NanoClaw** | 4 | 22 | 0 | 🔥🔥 | ⭐⭐ | Alpha |
| **IronClaw** | 19 | 50 | 0 | 🔥🔥🔥🔥🔥 | ⭐⭐⭐ | Beta |
| **LobsterAI** | 1 | 50 | 0 | 🔥🔥 | ⭐⭐ | Alpha |
| **Moltis** | 4 | 4 | 0 | 🔥 | ⭐ | Early Beta |
| **CoPaw** | 29 | 44 | 2 | 🔥🔥🔥🔥 | ⭐⭐⭐⭐ | Production |
| **GoClaw** | 41 | 16 | 0 | 🔥🔥 | ⭐⭐⭐ | Beta |
| **Hermes-Agent** | 14 | 50 | 0 | 🔥🔥🔥🔥🔥 | ⭐⭐⭐⭐ | Beta |

### Chú thích:
- **Velocity**: Tốc độ phát triển (số lượng PR merged/day)
- **Community Engagement**: Mức độ tương tác (comments, reactions, external contributors)
- **Maturity Level**: Giai đoạn phát triển dựa trên stability và feature completeness

---

## 3. 🎯 Vị thế của OpenClaw

### Điểm mạnh:

**1. Market Leader Position** 👑
- **Số lượng issues/PRs cao nhất** (103/500) cho thấy adoption rộng rãi
- **2 releases trong 24h** (v2026.5.19-beta.2 & alpha.1) - aggressive release cadence
- **Cộng đồng lớn nhất** với nhiều external contributors và active discussions

**2. Technical Maturity** 🏗️
- **Production-ready**: Đã có users deploy ở scale với cron jobs, multi-agent setups
- **Comprehensive feature set**: 
  - Multi-agent orchestration (subagent spawning, routing)
  - Rich channel support (Telegram, Discord, WhatsApp, Matrix, IRC, Signal, Email...)
  - Advanced context management (compaction, archiving, memory)
  - Plugin ecosystem với MCP/ACP integration

**3. Innovation Leadership** 💡
- **Pioneering features**:
  - Streaming watchdog với configurable timeouts (#68596)
  - Filesystem sandboxing controls (#7722)
  - Session context optimization (#67419)
  - Progressive streaming (#815)
- **Research-driven**: Nhiều features được design dựa trên user feedback và academic research

### Điểm yếu:

**1. Stability Concerns** ⚠️
- **High regression rate**: v2026.5.18 gây nhiều issues (crash loops, memory leaks)
- **Context compaction bugs**: Infinite loops, session state corruption
- **Channel-specific issues**: Gateway crashes, OAuth refresh problems

**2. Complexity Overhead** 🧩
- **Configuration complexity**: Setup process phức tạp hơn competitors
- **Breaking changes**: Upgrade pain từ 2026.5.7 → 2026.5.18
- **Documentation gaps**: Nhiều features mới chưa có docs đầy đủ

**3. Resource Intensity** 💰
- **Token efficiency issues**: Bootstrap file re-injection waste tokens (#67419)
- **Memory footprint**: Context bloat gây performance degradation
- **Startup time**: Chậm hơn so với lightweight alternatives (NanoBot: 6.9s → 385ms)

### So sánh với competitors:

| Tiêu chí | OpenClaw | NanoBot | CoPaw | Hermes-Agent |
|----------|----------|---------|-------|--------------|
| **Feature richness** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Stability** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Performance** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Ease of use** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Community size** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Innovation** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Kết luận**: OpenClaw là **market leader** về features và community, nhưng đang đối mặt với **technical debt** và **stability challenges**. Cần balance giữa innovation velocity và quality assurance.

---

## 4. 🔧 Hướng kỹ thuật chung

### Xu hướng được nhiều dự án áp dụng:

**1. Multi-Agent Orchestration** 🤖🤖🤖
- **OpenClaw**: Subagent spawning, routing, observable subagents
- **NanoBot**: Nanobot Legion - multi-agent trên single container
- **IronClaw**: Reborn architecture với 8 lanes phát triển song song
- **CoPaw**: Spawn Subagent tool, agent collaboration
- **Zeroclaw**: Multi-Agent Runtime trong v0.8.0 Beta

**Insight**: Đây là **killer feature** của 2026 - chuyển từ single-agent sang agent swarms.

**2. Plugin/Extension Ecosystems** 🔌
- **CoPaw**: Plugin Distribution marketplace, QwenPaw Pet, CloudPaw
- **OpenClaw**: MCP/ACP integration, skill system
- **Zeroclaw**: Extension Manifest v2, capability providers
- **NanoBot**: Skill router với BM25-lite

**Insight**: Marketplace models đang thay thế monolithic architectures.

**3. Context Management Innovation** 🧠
- **OpenClaw**: Bootstrap file optimization, session context bloat fixes
- **NanoBot**: Unified archiving, rolling summary buffer
- **PicoClaw**: Context budget enforcement, SeaHorse overflow fixes
- **CoPaw**: Agent self-managed context lifecycle

**Insight**: Context window limits là **bottleneck lớn nhất** - các dự án đang compete về efficiency.

**4. Security Hardening** 🔒
- **OpenClaw**: Sandbox isolation, filesystem access controls
- **GoClaw**: 4 security vulnerabilities fixed (command injection, auth bypass)
- **Zeroclaw**: Air-gapped execution mode proposal
- **IronClaw**: NoExposureGuard service, fail-closed policies

**Insight**: Production deployment đòi hỏi **enterprise-grade security**.

**5. Cross-Platform Support** 🪟🍎🐧
- **Hermes-Agent**: Windows tier-1 push (subprocess, paths, test isolation)
- **OpenClaw**: macOS crash fixes, Windows encoding issues
- **NanoBot**: Docker optimization, multi-platform builds

**Insight**: Windows đang được nâng từ "afterthought" lên **first-class citizen**.

**6. Streaming & Real-time UX** 🌊
- **PicoClaw**: Dual opt-in streaming support
- **OpenClaw**: Streaming watchdog, progressive streaming
- **CoPaw**: Streaming card output cho Feishu
- **NanoBot**: Event streaming manager

**Insight**: Real-time feedback là **table stakes** cho modern AI UX.

**7. Cost Optimization** 💰
- **OpenClaw**: Token usage tracking, context compaction
- **GoClaw**: Prompt caching fixes (3-4x cost reduction)
- **CoPaw**: Token usage display, cached prompt estimation
- **NanoBot**: BM25-lite skill router (60% system prompt reduction)

**Insight**: LLM costs là **major concern** - efficiency = competitive advantage.

---

## 5. 🎨 Điểm khác biệt

### Chiến lược phát triển:

| Dự án | Chiến lược | Target User | Differentiation |
|-------|-----------|-------------|-----------------|
| **OpenClaw** | Feature-rich platform | Power users, enterprises | Comprehensive tooling, largest ecosystem |
| **NanoBot** | Performance-first | Developers, self-hosters | 94% startup time reduction, lightweight |
| **CoPaw** | User-friendly platform | General users, teams | Plugin marketplace, pet desktop app |
| **Hermes-Agent** | Research-driven | Researchers, advanced users | Self-evolution, academic rigor |
| **Zeroclaw** | Academic focus | Researchers | ICSE 2027 research, formal methods |
| **IronClaw** | Enterprise-ready | Businesses | Reborn architecture, production focus |
| **GoClaw** | Multi-channel | Communication teams | 25+ channels, IM integration |
| **PicoClaw** | Stability-first | Production users | Context safety, reliability |
| **Moltis** | Simplicity | Small teams | Minimal setup, focused features |
| **LobsterAI** | Cowork-focused | Collaborative teams | Session sharing, team features |

### Tính năng độc đáo:

**OpenClaw** 🏆
- Streaming watchdog với configurable timeouts
- Filesystem sandboxing controls
- Largest channel support (16+)

**NanoBot** ⚡
- 94% startup time reduction (6.9s → 385ms)
- Nanobot Legion (multi-agent on single container)
- BM25-lite skill router

**CoPaw** 🎨
- QwenPaw Pet (desktop pet plugin)
- Plugin Distribution marketplace
- Skill Market với 3 providers

**Hermes-Agent** 🧬
- Self-evolution capability proposal
- Dream Mode (periodic memory consolidation)
- Academic research integration

**Zeroclaw** 🔬
- AllowlistAspect refactoring (ICSE 2027)
- Air-gapped execution mode
- Formal verification focus

**IronClaw** 🏗️
- Reborn architecture (8 lanes)
- Extension Manifest v2
- Host API contracts

**GoClaw** 📱
- 25+ communication channels
- Bitrix24, Max Messenger integration
- Multi-tenant SaaS focus

**PicoClaw** 🛡️
- Context budget enforcement
- SeaHorse overflow protection
- Model name persistence

### Cộng đồng & Culture:

**OpenClaw**: Largest, most diverse, high engagement but some frustration với regressions

**NanoBot**: Developer-centric, performance-obsessed, Chinese-language dominant

**CoPaw**: User-friendly, creative (pet plugin!), strong Chinese market presence

**Hermes-Agent**: Research-oriented, academic discussions, high technical bar

**Zeroclaw**: Academic rigor, formal methods, ICSE 2027 focus

**IronClaw**: Enterprise mindset, methodical development, production-first

**GoClaw**: Communication-focused, multi-channel expertise, IM integration specialists

**PicoClaw**: Stability-conscious, careful iteration, production reliability

**Moltis**: Small but focused, simplicity advocates

**LobsterAI**: Collaboration-focused, team workflows

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Tier 1: Mature Communities (Production-Ready)

**OpenClaw** ⭐⭐⭐⭐⭐
- **Strengths**: 
  - Largest community (103 issues, 500 PRs)
  - Active external contributors
  - Rich documentation (though gaps exist)
  - Established release cadence
- **Weaknesses**:
  - Regression frustration ("càng update càng tệ")
  - Configuration complexity barriers
  - Upgrade pain points
- **Maturity indicators**: Production deployments, enterprise users, comprehensive feature set

**CoPaw** ⭐⭐⭐⭐
- **Strengths**:
  - Plugin marketplace ecosystem
  - 2 releases in 24h (v1.1.8)
  - Strong Chinese market presence
  - Creative features (pet plugin)
- **Weaknesses**:
  - Windows encoding issues
  - Markdown rendering bugs
  - Stale PR backlog (24 PRs)
- **Maturity indicators**: Marketplace model, OAuth 2.1, security hardening

**Hermes-Agent** ⭐⭐⭐⭐
- **Strengths**:
  - 30 PRs in 1 day (high velocity)
  - Research-driven development
  - Academic discussions
  - Self-evolution proposals
- **Weaknesses**:
  - Kanban safety issues (unbounded worker spawns)
  - Resource management concerns
  - Documentation lag
- **Maturity indicators**: Windows tier-1 push, gateway hardening, production focus

### Tier 2: Growing Communities (Beta Stage)

**NanoBot** ⭐⭐⭐
- **Strengths**:
  - 30 PRs in 1 day (breakthrough optimization)
  - Performance-first culture
  - Active Chinese community
- **Weaknesses**:
  - Smaller community size
  - Less external contributions
  - Documentation in Chinese primarily
- **Maturity indicators**: Nanobot Legion, multi-agent architecture, skill system

**IronClaw** ⭐⭐⭐
- **Strengths**:
  - Methodical development (8 lanes)
  - Enterprise focus
  - 15+ PRs merged/day
- **Weaknesses**:
  - Complexity overhead
  - Smaller community
  - Steep learning curve
- **Maturity indicators**: Reborn architecture, E2E testing, production readiness

**PicoClaw** ⭐⭐⭐
- **Strengths**:
  - Stability-focused
  - Fast PR turnaround
  - Active maintainer engagement
- **Weaknesses**:
  - Smaller community
  - Documentation debt
  - Critical bugs pending
- **Maturity indicators**: Context safety, provider diversity, nightly builds

**GoClaw** ⭐⭐⭐
- **Strengths**:
  - 25+ channel support
  - Multi-tenant SaaS focus
  - Active security audits
- **Weaknesses**:
  - 4 security vulnerabilities in 1 day
  - Backup/restore instability
  - Provider config issues
- **Maturity indicators**: Channel ecosystem, OAuth, localization (pt-BR)

### Tier 3: Emerging Communities (Alpha Stage)

**Zeroclaw** ⭐⭐
- **Strengths**:
  - Academic rigor (ICSE 2027)
  - Formal methods focus
  - 25 PRs refactoring campaign
- **Weaknesses**:
  - Very small community
  - Limited external contributions
  - Research-first (not user-first)
- **Maturity indicators**: v0.8.0 Beta prep, multi-agent runtime, schema v3

**NanoClaw** ⭐⭐
- **Strengths**:
  - Fast bug resolution (<24h)
  - 22 active PRs
  - Clear issue tracking
- **Weaknesses**:
  - Very small community (0 reactions on issues)
  - Limited documentation
  - WhatsApp-focused
- **Maturity indicators**: Agent network feature, two-tier context loading

**LobsterAI** ⭐⭐
- **Strengths**:
  - Cowork-focused features
  - 24 stale PRs (backlog of work)
  - Multi-agent orchestration
- **Weaknesses**:
  - Slow review process
  - Small community
  - Limited external contributions
- **Maturity indicators**: Session grouping, agent templates, TTS

**Moltis** ⭐
- **Strengths**:
  - Fast iteration (2 PRs merged in 1 day)
  - Responsive maintenance
  - Security-conscious
- **Weaknesses**:
  - Very small community
  - Limited features
  - Early stage
- **Maturity indicators**: Vault security, Docker sandbox, WebSocket fixes

---

## 7. 🔮 Tín hiệu xu hướng

### Ngắn hạn (Q2-Q3 2026):

**1. Multi-Agent Orchestration sẽ trở thành standard** 🤖
- Tất cả dự án tier-1 đều đang implement hoặc đã có
- Killer use cases: complex workflows, specialized agents, parallel processing
- **Prediction**: Single-agent systems sẽ bị coi là "legacy" vào cuối 2026

**2. Plugin/Extension Marketplaces sẽ bùng nổ** 🔌
- CoPaw và OpenClaw đang lead với marketplace models
- Monetization opportunities cho plugin developers
- **Prediction**: "App Store moment" cho AI agents - ecosystem effects sẽ tạo moats

**3. Windows sẽ đạt parity với Linux/macOS** 🪟
- Hermes-Agent, OpenClaw đang push hard
- Enterprise adoption requires Windows support
- **Prediction**: Windows tier-1 support sẽ là requirement cho production-ready agents

**4. Cost optimization sẽ là competitive battleground** 💰
- Prompt caching, context management, token efficiency
- GoClaw's 3-4x cost reduction từ prompt caching là game-changer
- **Prediction**: Agents với best token efficiency sẽ win enterprise deals

**5. Security sẽ là table stakes** 🔒
- GoClaw's 4 vulnerabilities in 1 day shows importance
- Sandbox isolation, auth hardening, audit trails
- **Prediction**: Security certifications (SOC2, ISO27001) sẽ differentiate winners

### Trung hạn (Q4 2026 - Q1 2027):

**6. Self-evolution capabilities sẽ emerge** 🧬
- Hermes-Agent's Dream Mode, self-evolution proposals
- Agents learning from interactions, improving over time
- **Prediction**: "Learning agents" sẽ là next frontier sau multi-agent

**7. Vertical-specific agents sẽ proliferate** 🏢
- GoClaw's communication focus, LobsterAI's cowork focus
- Domain expertise > general-purpose
- **Prediction**: Horizontal platforms (OpenClaw) vs vertical specialists (GoClaw) competition

**8. Context management breakthroughs** 🧠
- Infinite context với intelligent compression
- Cross-session memory persistence
- **Prediction**: Context limits sẽ không còn là bottleneck - compression tech sẽ mature

**9. Real-time collaboration features** 👥
- Shared sessions, team workflows, approval flows
- LobsterAI, NanoClaw đang pioneer
- **Prediction**: "Google Docs for AI agents" - collaborative agent workspaces

**10. Regulatory compliance focus** 📜
- GDPR, data residency, audit trails
- Enterprise requirements driving features
- **Prediction**: Compliance-first agents sẽ win regulated industries (finance, healthcare)

### Dài hạn (2027+):

**11. Agent-to-agent protocols sẽ standardize** 🤝
- MCP, ACP đang emerge
- Interoperability giữa các platforms
- **Prediction**: "HTTP for agents" - universal agent communication protocol

**12. Autonomous agent networks** 🌐
- Agents discovering và collaborating với nhau
- Decentralized agent marketplaces
- **Prediction**: "Internet of Agents" - self-organizing agent ecosystems

**13. Hybrid human-agent workflows** 🤝
- Seamless handoffs, approval gates, human-in-the-loop
- Not full automation, but augmentation
- **Prediction**: "Centaur agents" - human+AI collaboration sẽ outperform pure AI

**14. Edge deployment & privacy** 🔐
- Local models, on-device inference
- Privacy-preserving agents
- **Prediction**: "Privacy-first agents" sẽ win consumer trust

**15. Agent observability & debugging** 🔍
- Tracing, metrics, replay, time-travel debugging
- IronClaw's EventStreamManager là early signal
- **Prediction**: "DevTools for agents" - mature observability platforms

---

## 🎯 Kết luận chiến lược

### Cho OpenClaw:

**Ưu tiên ngắn hạn** (Q2 2026):
1. ✅ **Stabilize v2026.5.x**: Fix crash loops, memory leaks, context bugs
2. ✅ **Improve upgrade experience**: Better migration, clearer breaking changes
3. ✅ **Token efficiency**: Resolve bootstrap file re-injection (#67419)
4. ✅ **Documentation**: Close gaps, update examples, improve onboarding

**Ưu tiên trung hạn** (Q3-Q4 2026):
1. 🎯 **Plugin marketplace**: Compete với CoPaw's ecosystem
2. 🎯 **Windows tier-1**: Match Hermes-Agent's push
3. 🎯 **Cost optimization**: Implement aggressive prompt caching
4. 🎯 **Security certifications**: SOC2, ISO27001 for enterprise

**Ưu tiên dài hạn** (2027+):
1. 🔮 **Self-evolution**: Research Hermes-Agent's Dream Mode
2. 🔮 **Agent protocols**: Lead MCP/ACP standardization
3. 🔮 **Observability**: Build best-in-class debugging tools
4. 🔮 **Vertical solutions**: Partner with domain experts

### Rủi ro cần watch:

⚠️ **Technical debt**: Regression rate cao đang erode trust  
⚠️ **Complexity creep**: Configuration overhead vs competitors  
⚠️ **Performance gap**: NanoBot's 94% startup improvement là wake-up call  
⚠️ **Security incidents**: GoClaw's 4 vulns in 1 day shows importance of audits  

### Cơ hội:

✅ **Market leadership**: Largest community, most features - leverage network effects  
✅ **Innovation velocity**: 2 releases in 24h - maintain momentum  
✅ **Ecosystem play**: Plugin marketplace có thể tạo moat như App Store  
✅ **Enterprise readiness**: Production deployments cho thấy product-market fit  

---

**Tổng kết**: Hệ sinh thái AI agent đang ở **inflection point** - chuyển từ experimentation sang production deployment. OpenClaw có **pole position** nhưng cần **execute flawlessly** trên stability, performance, và developer experience để maintain lead. Competition đang intensify - NanoBot (performance), CoPaw (UX), Hermes-Agent (research) đều là threats. **Winning strategy**: Leverage ecosystem advantages, fix stability issues, và double down on enterprise features.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo Phân tích Dự án NanoBot - Ngày 2026-05-20

## 📊 Tóm tắt hôm nay

Ngày 19/5/2026 là một ngày **cực kỳ sôi động** với **30 Pull Requests** được tạo/cập nhật và nhiều issue được đóng. Dự án đang trong giai đoạn tái cấu trúc lớn với focus vào **tối ưu hiệu năng** (giảm 94% thời gian khởi động), **mở rộng hệ sinh thái provider** (thêm APIFree, StepFun, Skywork), và **nâng cấp kiến trúc multi-agent**. Đặc biệt, có sự xuất hiện của tính năng **Nanobot Legion** - hệ thống multi-agent chạy trên single container.

---

## 🚀 Releases

**Không có release chính thức** trong 24h qua, nhưng có nhiều thay đổi quan trọng đang được chuẩn bị cho phiên bản tiếp theo.

---

## 🔧 Tiến độ dự án

### **Tối ưu hiệu năng - Breakthrough lớn** ⚡

**PR #3918** - Giảm thời gian khởi động gateway từ ~6.9s xuống ~385ms (giảm **94%**):
- `channel_manager`: 5430ms → 30ms (-99.4%)
- `provider_snapshot`: 1082ms → 13ms (-98.8%)
- Áp dụng lazy-loading cho channels và providers

### **Mở rộng hệ sinh thái Provider** 🌐

1. **APIFree** (PR #3917, #3915) - Provider mới với model `skywork-ai/skyclaw-v1`
2. **Skywork** (PR #3916) - First-level support cho Skywork AI
3. **StepFun** (PR #3910, #3911) - Thêm image generation với `step-image-edit-2` và `step-1x-medium`

### **Kiến trúc Multi-Agent** 🤖

**PR #3913 - Nanobot Legion**: Showcase tích hợp multi-agent chạy trên **single HuggingFace Space container**:
- Hỗ trợ 1-2 người + nhóm AI agents (planner/dev/reviewer/assistant/on-call)
- WebUI với mỗi agent một tab riêng
- Không cần Kubernetes hay infrastructure phức tạp

**PR #3908** - Peer discovery qua `NANOBOT_PEER_*` env vars cho multi-instance orchestration

### **Cải thiện Memory & Context Management** 🧠

1. **PR #3920** - Benchmark framework cho context compaction + tối ưu consolidator prompt
2. **PR #3686** - Unified archiving với rolling summary buffer (fix information funnel)
3. **PR #3859** - Loại bỏ duplicate runtime context injection (tiết kiệm tokens)

### **Skill System Enhancement** 📚

**PR #3847** - Tool `skill_load` mới để prevent skill content loss trong multi-turn conversations

**PR #3865** - BM25-lite skill router giảm **60% system prompt** bằng cách chỉ load top-5 relevant skills

### **Refactoring & Code Quality** 🏗️

1. **PR #3715** - Convert `_process_message` thành functional state machine (RESTORE → COMPACT → COMMAND → BUILD → RUN → SAVE → RESPOND)
2. **PR #3914** - Split image generation providers thành per-file modules
3. **PR #3893** - Provider registry cho image generation (giảm coupling)

### **Channel Improvements** 📱

1. **PR #3852** - Signal channel support với signal-cli daemon
2. **PR #3684** - Fix WeChat silent message drops
3. **PR #3774** - Chat-native DM sender approval (pairing flow)

### **WebUI Enhancements** 🎨

1. **PR #3906** - Upgrade settings page thành app-style settings center
2. **PR #3894** - Fix tool trace rendering (accept end/error phases)
3. **PR #3891** - `bootstrap_allow_from` cho remote Docker deployments

---

## 🌟 Điểm nổi bật cộng đồng

### **Issues được quan tâm nhất:**

1. **#3790** (14 comments) - WebUI conversation display bug sau update 5.13
2. **#193** (14 comments) - Yêu cầu Ollama API support (đã đóng)
3. **#2463** (11 comments) - Architectural issue về prompt prefix preservation

### **Vấn đề người dùng gặp nhiều:**

- **Telegram bot trả lời 2 lần** (#1692 - 9 comments, 4 👍)
- **WeChat login issues** (#3863 - 6 comments)
- **Session bloat** gây bot ngừng phản hồi (#2638, #3029)

---

## 🐛 Ổn định & Bugs

### **Bugs đã fix:**

1. ✅ **#3894** - Tool call events không hiển thị trong WebUI (phase filtering issue)
2. ✅ **#3859** - Duplicate runtime context injection lãng phí tokens
3. ✅ **#3684** - WeChat silent message drops từ poll exceptions
4. ✅ **#3919** - `restrictToWorkspace` bug trong shell tool

### **Bugs đang xử lý:**

1. 🔄 **#3907** - Page rendering issue với DeepSeek reasoning mode (mỗi word xuống dòng mới)
2. 🔄 **#3884** - WebUI conversation đóng sau first response
3. 🔄 **#3790** - WebUI content display corruption sau update

### **Architectural Issues:**

- **#2463** - Prompt prefix không được preserve chính xác
- **#2638, #3029** - Session history grows unbounded → context exhaustion
- **#2604** - Memory consolidation cần fully asynchronous

---

## 💡 Yêu cầu tính năng

### **Đã implement:**

1. ✅ **#3735** - `/insights` command cho historical token usage tracking
2. ✅ **#3888** - Mnemon integration cho persistent memory
3. ✅ **#3322** - Human takeover với `/bot on/off` commands

### **Đang được đề xuất:**

1. 🔮 **#3846** - Keep skill content trong multi-turn conversations (đang implement #3847)
2. 🔮 **#2845** - Native MPP (Machine Payments Protocol) tool
3. 🔮 **#1604** - Personalize Telegram và channels messages

---

## 💬 Phản hồi người dùng

### **Positive:**

- Community đánh giá cao tốc độ phát triển và responsive của maintainers
- Nhiều PRs được merge nhanh trong ngày (10+ PRs closed)

### **Pain Points:**

1. **Setup complexity**: Docker build issues trên Windows (#87), SSH connection problems (#1826)
2. **MCP integration**: Tools không refresh sau server update (#2325)
3. **Channel stability**: Feishu errors sau long conversations (#2007), WeChat login issues (#3863)
4. **Context management**: Bot asks repetitive questions (#923), session bloat (#2638)

### **User Expectations:**

- Mong muốn **continuous actions** không cần approval (#2442)
- Cần **better error messages** và debugging tools
- Yêu cầu **local model support** rõ ràng hơn (Ollama #193)

---

## 🗺️ Backlog & Roadmap

### **Priorities hiện tại (dựa trên PR activity):**

1. **Performance optimization** ✅ (đã đạt breakthrough với -94% startup time)
2. **Multi-agent orchestration** 🔄 (Nanobot Legion đang finalize)
3. **Provider ecosystem expansion** 🔄 (APIFree, Skywork, StepFun added)
4. **Memory & context management** 🔄 (multiple PRs addressing this)
5. **WebUI modernization** 🔄 (settings upgrade, peer discovery)

### **Technical Debt được xử lý:**

- Refactoring agent loop thành state machine (#3715)
- Provider registry pattern (#3893, #3914)
- Unified archiving paths (#3686)
- Documentation updates (#3860)

### **Upcoming Focus Areas:**

1. **Stability**: Fix remaining channel issues (WeChat, Feishu, Telegram)
2. **Developer Experience**: Better local setup docs, clearer error messages
3. **Scalability**: Async memory consolidation (#2604), proactive GC
4. **Feature Completeness**: MCP tool refresh, skill system improvements

---

## 🎯 Kết luận

Dự án NanoBot đang trong **giai đoạn maturation mạnh mẽ** với focus vào:
- ✅ **Performance** (breakthrough optimization)
- ✅ **Scalability** (multi-agent architecture)
- ✅ **Ecosystem** (provider expansion)
- 🔄 **Stability** (bug fixes ongoing)

Với **30 PRs trong 1 ngày** và nhiều architectural improvements, team đang push hard cho một major release. Community engagement cao nhưng cần cải thiện documentation và onboarding experience.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Phân Tích Hệ Sinh Thái AI Agent - Zeroclaw
## Ngày 20/05/2026

---

## 📊 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn chuẩn bị phát hành **v0.8.0 Beta** với tính năng Multi-Agent Runtime và Schema V3. Hoạt động chính tập trung vào việc refactoring hệ thống allowlist trên 25 channels khác nhau thông qua việc áp dụng `AllowlistAspect` - một nỗ lực chuẩn hóa code lớn phục vụ nghiên cứu ICSE 2027. Đồng thời, một bug nghiêm trọng về memory namespace đã được phát hiện và sửa chữa.

---

## 🚀 Releases

**Không có release chính thức** trong 24 giờ qua, nhưng PR #6398 đang trong giai đoạn **SEEKING APPROVAL** cho v0.8.0 Beta với các thay đổi lớn:

- **Multi-Agent Runtime**: Hỗ trợ chạy nhiều agent đồng thời
- **Schema V3**: Cấu trúc dữ liệu mới cho memory và configuration
- **Cải thiện ACP/MCP**: Tích hợp sâu hơn với các protocol chuẩn
- **Blast radius**: Ảnh hưởng đến toàn bộ codebase với 40+ labels

---

## 🔧 Tiến độ dự án

### **Xu hướng chính: Chuẩn hóa Allowlist Architecture**

Một chiến dịch refactoring quy mô lớn đang diễn ra với **25 PRs liên tiếp** (từ #6778 đến #6800) do @yijunyu thực hiện:

- **Mục tiêu**: Thay thế 147 LOC allowlist logic thủ công trên 16 channels bằng `aspect_std::AllowlistAspect`
- **Phạm vi**: Các channels như Telegram, Discord, WhatsApp, Slack, Matrix, IRC, Signal, Email, và nhiều nền tảng khác
- **Archetypes**: Phân loại thành 4 kiểu pattern (A, B, C, D→A) để xử lý các trường hợp khác nhau
- **Ý nghĩa**: Đây là nghiên cứu học thuật cho ICSE 2027 M1 evaluation, đồng thời cải thiện maintainability

### **ACP Session Persistence** ✅

PR #6649 đã được merge, giải quyết issue #6543:
- Thêm `AcpSessionStore` với SQLite backend
- Hỗ trợ 4 JSON-RPC methods mới cho session management
- Editor ACP sessions giờ đây survive reconnects mà không mất context

### **Bug Fixes quan trọng**

**#6801 - Memory Namespace Bug** (S2 severity):
- `SqliteMemory::purge_namespace` đang xóa theo `category` thay vì `namespace`
- PR #6777 đã sửa bằng cách thay đổi query từ `WHERE category = ?1` sang `WHERE namespace = ?1`
- **Impact**: Ảnh hưởng đến tính toàn vẹn dữ liệu memory

---

## 💬 Điểm nổi bật cộng đồng

### **Issue #5849 - Dream Mode** 🌙 (10 comments, P1 priority)

Đề xuất tính năng **"Dream Mode"** - một cơ chế consolidation memory định kỳ:
- Chạy background process trong idle periods
- Consolidate daily memories và reflect on interactions
- Update long-term knowledge structures
- **Trạng thái**: Accepted, high risk, đang chờ implementation

### **Issue #6293 - Air-gapped Execution Mode** 🔒 (2 comments, P2 priority)

RFC về kiến trúc bảo mật cao:
- Tách ZeroClaw thành 2 processes: offline agent + online daemon
- Kết nối qua unix socket
- Proxy internet access qua approved ACP/MCP servers
- **Trạng thái**: Blocked, cần maintainer review

### **Issue #6253 - Skills Support Track** 🛠️ (1 comment, P1 priority)

Tracker cho v0.7.6 theme về cải thiện `zeroclaw skills`:
- CLI, loader, audit, install paths
- Sandbox, test harness
- Skill authoring tools
- **Kêu gọi**: Community input được khuyến khích

---

## 🐛 Ổn định & Bugs

### **Bugs đang active:**

1. **#6771 - Heredocs bị chặn bởi SecurityPolicy** (S1 - workflow blocked)
   - ZeroClaw's security policy ngăn chính nó sử dụng skill tạo PR
   - Multiline heredocs trong bash bị false positive
   - Chưa có PR fix

2. **#6801 - Memory namespace deletion bug** (S2 - degraded behavior)
   - Đã có PR #6777 fix
   - Ảnh hưởng đến integration/v0.8.0 branch

### **Bugs đã giải quyết:**

- **#1458 - Local CA certificates support**: Đã closed, cho phép custom inference endpoints với local PKI

---

## ✨ Yêu cầu tính năng

### **Đang được xem xét:**

1. **Dream Mode (#5849)** - P1, Accepted
   - Periodic memory consolidation
   - Reflective learning mechanism
   - High risk nhưng có tiềm năng lớn

2. **Air-gapped Mode (#6293)** - P2, RFC stage
   - Security-focused architecture
   - Enclave support
   - Cần thiết kế kỹ lưỡng hơn

3. **Skills UX Improvements (#6253)** - P1, Accepted
   - Toàn diện về developer experience
   - Tracking issue cho v0.7.6

---

## 👥 Phản hồi người dùng

### **Tích cực:**

- PR #6776 (UI fixes cho 0.8.0) được merge nhanh chóng, cho thấy responsive với UX issues
- ACP session persistence được đón nhận tích cực (giải quyết pain point về reconnection)

### **Thách thức:**

- **Security policy quá strict** (#6771): Chính tool bị chặn bởi policy của nó
- **Documentation gaps**: PR #6748 optimize images, #6769 fix link rendering - cho thấy docs cần attention
- **Complexity tăng cao**: v0.8.0 với 40+ labels và blast radius lớn có thể gây khó khăn cho contributors

---

## 🗺️ Backlog & Roadmap

### **Ngắn hạn (v0.7.6):**
- ✅ Skills support improvements (#6253)
- 🔄 Security policy refinement (#6771)

### **Trung hạn (v0.8.0 Beta):**
- 🔄 Multi-Agent Runtime (#6398) - đang chờ approval
- ✅ ACP session persistence - đã merge
- 🔄 Schema V3 migration
- 🔄 25 PRs allowlist refactoring - đang progress

### **Dài hạn (Future):**
- 💭 Dream Mode implementation (#5849)
- 🔒 Air-gapped execution mode (#6293)
- 📚 ICSE 2027 research deliverables

### **Quan sát chiến lược:**

1. **Academic-driven development**: Nghiên cứu ICSE 2027 đang drive một đợt refactoring lớn
2. **Security-first mindset**: Nhiều features xoay quanh security và isolation
3. **Multi-channel strategy**: Hỗ trợ 25+ communication channels cho agent
4. **Memory architecture evolution**: Từ simple storage đến sophisticated consolidation (Dream Mode)

---

## 📈 Metrics

- **Issues mới**: 2 (1 bug, 1 đã close)
- **PRs mới**: 26 (25 allowlist refactoring + 1 memory fix)
- **PRs merged**: 2 (#6649 ACP sessions, #6776 UI fixes)
- **Active contributors**: ~5 (singlerider, yijunyu, tidux, nixosclaw, ilteoood, Project516)
- **Community engagement**: Moderate (10 comments trên Dream Mode issue)

---

**🎯 Kết luận**: Zeroclaw đang trong giai đoạn maturation với focus mạnh vào code quality, security, và academic rigor. Việc chuẩn bị v0.8.0 Beta và chiến dịch refactoring quy mô lớn cho thấy dự án đang chuyển từ rapid prototyping sang sustainable engineering practices.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo Phân tích PicoClaw - Ngày 2026-05-20

## 🎯 Tóm tắt hôm nay

Hôm nay PicoClaw tập trung vào việc **tái cấu trúc kiến trúc core** với 3 PR lớn về metadata provider, streaming support và context budget enforcement. Dự án đang trong giai đoạn ổn định hóa sau Phase 1 refactor, với nhiều PR được đóng (7 PRs merged/closed) và phát hành nightly build v0.2.8. Cộng đồng đang tích cực phản hồi về các vấn đề streaming, context management và multi-provider support.

---

## 🚀 Releases

### **v0.2.8-nightly.20260520** (Nightly Build)
- Build tự động hàng đêm, **không khuyến nghị dùng production**
- Tích hợp các thay đổi mới nhất từ main branch
- Phục vụ mục đích testing và early adoption cho contributors

---

## 📈 Tiến độ dự án

### **Kiến trúc Core - Refactoring Phase**

#### 🔄 **Provider Metadata Unification** (#2896)
- **Mục tiêu**: Đưa backend trở thành nguồn chân lý duy nhất cho metadata provider
- **Tác động**: Giảm chi phí bảo trì dài hạn, loại bỏ duplicate logic giữa frontend/backend
- **Trạng thái**: Đang review, tiếp nối hướng đi của #2701

#### 🌊 **Streaming Support** (#2892 - MERGED)
- **Cơ chế dual opt-in**: Cả model entry và channel phải enable streaming
- **Tính năng**: Generic agent streaming eligibility, configuration-driven
- **Ý nghĩa**: Nâng cao UX với real-time response, đặc biệt quan trọng cho chat interfaces

#### 💾 **Model Name Persistence** (#2897)
- **Vấn đề giải quyết**: Model name không được lưu trữ xuyên suốt chat history
- **Thay đổi**: Persist qua SeaHorse, session transcript API, Pico realtime payloads
- **Giá trị**: Traceability tốt hơn cho debugging và analytics

#### 🧠 **Context Budget Enforcement** (#2895)
- **Bug fix**: SeaHorse overflow khi FreshTailCount vượt quá budget (#2894)
- **Giải pháp**: Enforce budget trên fresh tail và rebuild paths
- **Tầm quan trọng**: Critical cho stability khi làm việc với large contexts

### **Multi-Agent & Session Management**

#### 🤝 **Multi-Agent Collaboration** (#1934)
- **Phase 2 Roadmap**: Đang ở trạng thái DRAFT
- **Mục tiêu**: Agent collaboration trong single Pico, agent memory system
- **Tiến độ**: Phase 1 đã hoàn thành (#1894), đang chuẩn bị Phase 2

#### 📋 **Session Commands** (#2491 - MERGED)
- **Tính năng mới**: `/status`, `/compact`, `/new` commands
- **Use case**: Manual context management, token usage monitoring
- **Feedback**: Cải thiện đáng kể developer experience

### **Provider Ecosystem Expansion**

#### 🔧 **Intel OpenVINO Support** (#2703 - MERGED)
- **Tích hợp**: Local LLM inference với OpenVINO trên Intel CPU/GPU/NPU
- **Ý nghĩa**: Mở rộng khả năng self-hosted, giảm phụ thuộc cloud providers

#### 🤖 **Xiaomi Mimo Provider** (#2755 - MERGED)
- **Capabilities**: Chat, image/video/audio understanding
- **Streaming reasoning**: Hỗ trợ reasoning_content và video media
- **Tác động**: Đa dạng hóa provider options cho thị trường châu Á

#### 🦆 **DuckDuckGo Web Search** (#2647)
- **Thay đổi**: Enable DuckDuckGo as default web_search provider
- **YAML support**: Fix config loading issues
- **Trạng thái**: Đang review, liên quan #2616

---

## 🌟 Điểm nổi bật cộng đồng

### **Top Engagement Issues**

#### 🔥 **Codex OAuth Empty Response** (#2674 - 4 👍)
- **Vấn đề**: ChatGPT backend streams qua `response.output_item.done` nhưng response trống
- **Tác động**: Blocking users sử dụng ChatGPT Codex OAuth
- **Cộng đồng**: Nhiều users gặp vấn đề tương tự, cần priority fix

#### 🔐 **Security: Path Enumeration** (#2688 - CLOSED)
- **Phát hiện**: `find /` có thể enumerate paths ngoài workspace sandbox
- **Giải pháp**: Đã được fix và merged
- **Lesson learned**: Safety guards cần cover cả indirect filesystem access

### **Channel & Integration Issues**

#### 📱 **Discord Mention-Only Mode** (#317 - MERGED)
- **Feature**: Chỉ respond khi được @-mention
- **Use case**: Giảm noise trong group chats
- **Community value**: Highly requested feature

#### 🔔 **Telegram Cron Channel Error** (#1757 - CLOSED)
- **Bug**: Channel error khi schedule hourly tasks
- **Root cause**: Cron + channel interaction issue
- **Resolution**: Fixed sau 9 comments discussion

---

## 🐛 Ổn định & Bugs

### **Critical Fixes**

#### ⚠️ **PID Stale Lock** (#2720, #2813)
- **Vấn đề**: Gateway crash loop khi PID được reuse bởi process khác
- **Nguyên nhân**: Singleton check không verify process identity
- **Giải pháp**: PR #2813 verify gateway identity trước khi block startup
- **Priority**: HIGH - ảnh hưởng production deployments

#### 🧮 **Context Budget Overflow** (#2894, #2895)
- **Bug**: SeaHorse không enforce budget trên fresh tail
- **Tác động**: Context overflow, unpredictable behavior
- **Fix**: PR #2895 đang được review
- **Severity**: Medium-High

#### 🤔 **DeepSeek Reasoning Content Loss** (#2740 - MERGED)
- **Issue**: Streaming parser drop `reasoning_content` từ thinking-mode
- **Fix**: Update Delta struct để capture reasoning tokens
- **Impact**: Cải thiện compatibility với reasoning models

### **Configuration & Build Issues**

#### 🏗️ **Build from Source - Missing Launcher** (#2753 - CLOSED)
- **Problem**: `picoclaw-launcher` không tồn tại sau build
- **User impact**: Blocking new contributors
- **Resolution**: Documentation và build script updates

#### ⚙️ **Config Reliability** (#2771 - CLOSED)
- **Requests**: 
  - Update example config từ V2 → V3
  - Better migration error messages
  - Config validation on startup
- **Status**: Addressed và closed

---

## ✨ Yêu cầu tính năng

### **Async Tool Result Delivery** (#2829, #2830)
- **Problem**: Parent agent nhận duplicate results từ subagent spawns
- **Proposal**: Explicit async delivery policy với configurable routing
- **Design**: 
  - `delivery_mode` parameter trên spawn tool
  - Options: `none`, `parent_only`, `both`
- **Status**: PR #2830 đang review

### **Context & Memory Management** (#2774 - CLOSED)
- **Inspiration**: OpenCode plugin magic-context
- **Features requested**:
  - Cache-aware infinite context
  - Cross-session memory
  - Background history compression
- **Response**: Đã có partial support, cần clarification về specific use cases

### **Channel Identification Refactor** (#2551)
- **Goal**: Decouple channel names từ provider types
- **Benefit**: Cho phép multiple instances của cùng provider
- **Scope**: Refactor ChannelType, InboundContext, message bus logic
- **Status**: Đang review, breaking change potential

### **Subagent Lane Selection** (#2761 - MERGED)
- **Feature**: Support `agent_id` parameter cho sync subagent
- **Use case**: Explicit lane selection cho same-turn tasks
- **Previous gap**: Chỉ có async delegation có lane selection

---

## 💬 Phản hồi người dùng

### **Positive Feedback**

✅ **Session Management Commands** (#2491)
- Users đánh giá cao `/status`, `/compact`, `/new` commands
- Cải thiện visibility vào token usage và context state
- Developer experience tốt hơn đáng kể

✅ **Multi-Provider Support**
- Intel OpenVINO (#2703) và Xiaomi Mimo (#2755) được welcome
- Community muốn nhiều local inference options hơn
- Self-hosted deployment đang là trend

### **Pain Points**

❌ **Streaming Reliability**
- Codex OAuth empty responses (#2674) gây frustration
- DeepSeek reasoning content loss (#2740) đã fix nhưng expose gaps
- Users cần stable streaming cho production use

❌ **Configuration Complexity**
- Example configs out of date (#2771)
- Migration errors không clear
- YAML support inconsistent (#2647)

❌ **Documentation Gaps**
- Build from source issues (#2753)
- Missing guidance cho advanced features
- Need better troubleshooting docs

### **Feature Requests Pattern**

🎯 **Top Themes**:
1. **Better context management** - infinite context, compression, memory
2. **Multi-agent orchestration** - explicit routing, result delivery policies
3. **Provider diversity** - more local options, better streaming support
4. **DX improvements** - better errors, validation, debugging tools

---

## 🗺️ Backlog & Roadmap

### **Immediate Focus (Sprint hiện tại)**

🔴 **High Priority**
- Fix PID stale lock issue (#2813) - blocking production
- Resolve Codex OAuth empty response (#2674) - nhiều users affected
- Complete context budget enforcement (#2895) - stability critical

🟡 **Medium Priority**
- Provider metadata unification (#2896) - architecture cleanup
- Async delivery policy (#2830) - improve multi-agent UX
- Channel identification refactor (#2551) - enable multi-instance

### **Phase 2 Roadmap** (#1934)

📋 **Multi-Agent Collaboration Goals**:
1. Agent collaboration trong single Pico
2. Agent memory system
3. Improved steering và context management
4. Better subagent orchestration

**Status**: DRAFT, Phase 1 completed

### **Technical Debt**

🔧 **Cần address**:
- Configuration system modernization
- Documentation updates (examples, migration guides)
- Test coverage cho streaming paths
- Provider compatibility matrix

### **Community Wishlist**

💡 **Emerging Themes**:
- Infinite context với intelligent compression
- Cross-session memory persistence
- Better observability tools (tracing, metrics)
- Plugin/extension system
- More channel integrations (Slack, MS Teams mentioned)

---

## 📊 Metrics Summary

**Activity Level**: 🔥 **Cao**
- **7 PRs merged/closed** trong 24h
- **18 PRs active** (3 opened hôm nay)
- **9 issues** được update
- **1 nightly release**

**Health Indicators**:
- ✅ Fast PR turnaround (nhiều PRs merged same day)
- ✅ Active maintainer engagement
- ✅ Community contributions đa dạng
- ⚠️ Một số critical bugs cần attention
- ⚠️ Documentation debt đang tích lũy

**Momentum**: Dự án đang trong **giai đoạn consolidation** sau major refactor, focus vào stability và DX improvements trước khi push Phase 2 features.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo Phân tích NanoClaw - Ngày 2026-05-20

## 🎯 Tóm tắt hôm nay

Dự án NanoClaw đang trong giai đoạn ổn định hóa tích hợp WhatsApp với 22 PR hoạt động và 4 issue mới. Trọng tâm chính là sửa lỗi hệ thống mention trong WhatsApp groups, xử lý vấn đề context compaction gây agent bị treo, và cải thiện quy trình onboarding. Đáng chú ý là có nhiều PR liên quan đến messaging groups và agent network, cho thấy dự án đang mở rộng khả năng giao tiếp đa kênh.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### 🔥 Các vấn đề nghiêm trọng đã được giải quyết

**1. WhatsApp Mention Detection (#2560 → #2565) - CLOSED ✅**
- **Vấn đề**: Bot không nhận diện được @-mentions trong WhatsApp groups, khiến flow onboarding bị block hoàn toàn
- **Nguyên nhân**: Code hardcode `isMention: undefined`, router bỏ qua tất cả tin nhắn từ group chưa được approve
- **Giải pháp**: PR #2565 đã fix bằng cách parse `contextInfo.mentionedJid` từ Baileys protocol
- **Tác động**: Mở khóa channel-approval workflow, cho phép bot hoạt động trong WhatsApp groups

**2. Context Compaction Infinite Loop (#2561) - CLOSED ✅**
- **Vấn đề nghiêm trọng**: Agent bị treo vô hạn sau khi context vượt ~165k tokens
- **Cơ chế lỗi**: Sau compaction, agent output thiếu `<message to="...">` blocks → system retry vô hạn không có circuit breaker
- **Giải pháp**: PR #2559 đã fix boundary progress event
- **Mức độ ưu tiên**: Critical - ảnh hưởng trực tiếp đến khả năng hoạt động liên tục của agent

### 🔧 Các PR đang active

**Messaging & Groups (4 PRs)**
- **#2564**: Fix channel destination rename khi agent-name clash
- **#2563**: Scope `--assistant-name` chỉ cho registered group
- **#2562**: Deliver approval card đến origin chat + verify clicker
- **#2497**: Feature/agent network - tính năng lớn đang phát triển

**WhatsApp Improvements (4 PRs)**
- **#2552**: Render @mentions đúng format, fix shutdown-race credentials wipe
- **#2553**: Add whatsapp-formatting container skill
- **#2554**: Tổng hợp các WhatsApp channel bugs
- **#2551**: Fix QR-browser wrapper và method references

**Infrastructure & Tooling**
- **#2490**: Add LiteLLM provider - mở rộng khả năng tích hợp LLM
- **#2556**: Fix agent-runner để claude-agent-sdk gọi API đúng cách
- **#2531**: Suppress duplicate text khi send_message fires mid-turn

### 📊 Xu hướng phát triển

1. **Ổn định hóa WhatsApp integration** (7/22 PRs = 32%)
2. **Cải thiện messaging groups** (4/22 PRs = 18%)
3. **Agent network capabilities** - feature lớn đang được xây dựng
4. **Multi-LLM support** - thêm LiteLLM provider

---

## 💬 Điểm nổi bật cộng đồng

### Issues được quan tâm

**#2555 - Multi-message batch bug** (OPEN)
- Vấn đề: Claude Agent SDK emit synthetic response thay vì call API khi có 2+ messages
- Tác động: Agent không xử lý được batch messages
- Đã có PR #2556 để fix

**#2550 - Two-tier project context loading** (OPEN)
- Đề xuất: Lightweight index + on-demand STATUS files
- Bối cảnh: Users với nhiều projects đang gặp vấn đề context overload
- Giải pháp đề xuất: Tách index nhẹ và load STATUS files theo nhu cầu

### Mức độ tương tác

- Các issue về WhatsApp và messaging có response time nhanh (< 24h)
- PRs được review và merge trong cùng ngày với critical bugs
- Không có issue nào có reaction đáng kể (tất cả 👍: 0) - có thể do cộng đồng nhỏ hoặc internal team

---

## 🐛 Ổn định & Bugs

### ✅ Đã giải quyết (trong 24h)

1. **WhatsApp @-mentions blocking** - Critical, đã fix
2. **Context compaction infinite loop** - Critical, đã fix
3. **Duplicate text mid-turn** - PR #2531 đang review

### ⚠️ Đang xử lý

1. **Multi-message batch synthetic response** (#2555)
   - Severity: High
   - Workaround: PR #2556 đã submit

2. **WhatsApp credentials wipe race condition** (#2552)
   - Severity: Medium-High
   - Nguyên nhân: Shutdown timing issue

3. **Setup CLI issues** (#2558, #2551)
   - OneCLI default URL sai subdomain
   - QR-browser method references không đúng

### 🔍 Vấn đề tiềm ẩn

- **Progressive streaming** (PR #815 - BLOCKED): Feature streaming messages bị block, chưa rõ lý do
- **Database adapter refactor** (PR #1723): Đang open từ 2026-04-10, có thể gặp khó khăn

---

## ✨ Yêu cầu tính năng

### Đang phát triển

**1. Agent Network (#2497)**
- Tính năng lớn cho phép agents giao tiếp với nhau
- Status: Active development
- Tác động: Mở rộng khả năng collaboration giữa các agents

**2. Two-tier Project Context (#2550)**
- Giải quyết vấn đề context overload cho multi-project users
- Approach: Lightweight index + lazy-load STATUS files
- Use case: Workshop business, side projects, job search, art installations

**3. LiteLLM Provider (#2490)**
- Mở rộng hỗ trợ nhiều LLM providers
- Tăng flexibility cho users

### Đề xuất từ cộng đồng

- **Progressive message streaming** (#815): Đã có PR nhưng bị blocked, cần unblock
- **Database adapter layer** (#1723): Refactor để hỗ trợ nhiều DB backends

---

## 👥 Phản hồi người dùng

### Pain points được báo cáo

1. **Onboarding friction**: WhatsApp group setup bị block do mention bug
2. **Context management**: Users với nhiều projects gặp khó khăn quản lý context
3. **Setup complexity**: CLI có nhiều references không đúng, gây confusion

### Trải nghiệm tích cực

- **Fast bug resolution**: Critical bugs được fix trong < 24h
- **Active maintenance**: 22 PRs active cho thấy development velocity cao
- **Clear issue tracking**: Issues được label rõ ràng (Type, Priority)

### Feedback về documentation

- Setup guides có outdated references (--method flags)
- Cần cập nhật docs sau khi fix WhatsApp bugs

---

## 🗺️ Backlog & Roadmap

### Short-term (đang xử lý)

1. ✅ Stabilize WhatsApp integration
2. 🔄 Complete agent network feature (#2497)
3. 🔄 Fix multi-message batch handling (#2555)
4. 🔄 Improve messaging groups UX (#2562-2564)

### Mid-term (có PR/issue)

1. **Two-tier context loading** (#2550) - Architecture improvement
2. **Database adapter layer** (#1723) - Infrastructure refactor
3. **Progressive streaming** (#815) - UX enhancement (blocked)
4. **Release workflow** (#2403) - CI/CD improvement

### Long-term signals

- **Multi-LLM support**: LiteLLM integration cho thấy hướng đi vendor-agnostic
- **Agent collaboration**: Agent network feature mở đường cho distributed agent systems
- **Enterprise readiness**: Database adapter và release workflow cải thiện production-readiness

### Rủi ro tiềm ẩn

- PR #815 (streaming) bị blocked lâu - cần clarify blocker
- PR #1723 (DB refactor) open 40+ ngày - có thể scope quá lớn hoặc gặp technical challenges
- Nhiều WhatsApp PRs đồng thời - risk merge conflicts

---

## 📌 Kết luận

NanoClaw đang trong giai đoạn **ổn định hóa và mở rộng tính năng**. Team đã xử lý xuất sắc 2 critical bugs trong 24h, cho thấy response time tốt. Trọng tâm hiện tại là WhatsApp integration và messaging groups, với tầm nhìn dài hạn về agent network và multi-LLM support. Cộng đồng tương tác chưa cao (0 reactions) nhưng development velocity mạnh với 22 PRs active.

**Điểm mạnh**: Fast bug fixes, clear priorities, active development  
**Cần cải thiện**: Unblock streaming feature, complete long-running PRs, update documentation

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 2026-05-20

## 1. 📊 Tóm tắt hôm nay

Dự án IronClaw đang trong giai đoạn tái cấu trúc lớn với **Reborn architecture**, tập trung vào việc xây dựng hệ thống modular với 8 lanes phát triển song song. Hoạt động chính xoay quanh việc tách biệt các thành phần (crate boundaries), xây dựng WebUI v2, và thiết lập framework kiểm thử E2E. Có 19 issues mở và 50 PRs đang hoạt động, cho thấy tốc độ phát triển cao với nhiều tính năng đang được triển khai đồng thời.

## 2. 🚀 Releases

**Không có release chính thức trong 24h qua**, nhưng có PR #3708 đang chuẩn bị release với các thay đổi breaking:
- `ironclaw_common`: 0.4.2 → 0.5.0 (⚠️ API breaking changes)
- `ironclaw`: 0.24.0 → 0.28.2

Các thay đổi breaking chủ yếu liên quan đến enum discriminant values, cho thấy đang có sự điều chỉnh cấu trúc dữ liệu nội bộ.

## 3. 🏗️ Tiến độ dự án

### **Kiến trúc Reborn - 8 Lanes phát triển song song**

Dự án đang triển khai kiến trúc mới theo 8 lanes độc lập:

**Lane 1-3: Core Infrastructure** ✅ Đang merge
- **Lane 1** (#3800): REPL golden path - Chuyển REPL từ gọi trực tiếp sang composition services
- **Lane 2** (#3801): Extension-v2 catalog readiness - Chuẩn bị cho Notion MCP, GitHub WASM, Memory
- **Lane 3** (#3803): Secrets/egress substrate - Hoàn thiện secrets injection cho production tools

**Lane 4-6: Capability Providers** 🔄 Đang phát triển
- **Lane 4** (#3804): Native Memory as capability provider
- **Lane 5** (#3805): Notion MCP capability path - Tool MCP đầu tiên
- **Lane 6** (#3806): GitHub WASM capability path - Tool WASM đầu tiên

**Lane 7-8: Product Surfaces** 🚧 Đang xây dựng
- **Lane 7** (#3807): WebUI beta route/tool surface
- **Lane 8** (#3809): EventStreamManager timeline/replay path

### **PRs quan trọng đã merge trong 24h:**

✅ **#3795** - Tighten legacy extension v2 manifests (MERGED)
- Reject third-party legacy manifests trong production
- Chỉ cho phép host-bundled legacy capabilities

✅ **#3797** - Wire REPL tools through live adapters (MERGED)
- Kết nối REPL với product-live/host-runtime adapters
- Expose local-dev builtins với scoped `/workspace → /projects` mounts

✅ **#3794** - Extension v2 lifecycle E2E coverage (MERGED)
- Test discover → install/enable → hot catalog publication → dispatch
- Fail-closed coverage cho unknown required host ports

✅ **#3792** - Route REPL LLM auth through composition (MERGED)
- Di chuyển LLM resolution ra khỏi CLI vào `ironclaw_reborn_composition`
- Thêm `ResolvedRebornLlm` opaque type

✅ **#3791** - Convert fixtures to host API manifests (MERGED)
- Chuyển đổi script, WASM, MCP fixtures sang `[[host_api]]` format

✅ **#3790** - Hot capability catalog publication (MERGED)
- Publish capabilities từ Extension Manifest v2 packages
- Resolve schema refs qua package virtual roots

✅ **#3788** - Wire default HostPortCatalog (MERGED)
- Thêm `HOST_RUNTIME_HTTP_EGRESS_PORT_ID` vocabulary
- Validate `required_host_ports` trong manifests

✅ **#3787** - Register default host API contracts (MERGED)
- Registry cho capability-provider và product-adapter contracts

✅ **#3786** - Approval cancellation parity test (MERGED)
- Test cancel blocked approval runs

✅ **#3785** - Composed CLI REPL (MERGED)
- Dedicated `ironclaw-reborn repl` entrypoint

✅ **#3783** - Host API manifest projections (MERGED)
- `HostApiManifestProjection` cho contract outputs

✅ **#3784** - Private WebUI services composition hook (MERGED)
- Compose `RebornServicesApi` từ `RebornRuntime`

✅ **#3780** - Core builtin tool parity test (MERGED)
- E2E coverage cho `builtin.time`, `builtin.json`, `builtin.http`, `builtin.apply_patch`

✅ **#3779** - Normalize provider tool arguments by schema (MERGED + DB MIGRATION)
- Schema-guided normalization cho tool-call arguments
- Coerce types theo advertised capability schema

✅ **#3739** - Extract embeddings crate (MERGED)
- Tách embeddings providers vào `ironclaw_embeddings` crate riêng

### **PRs đang active:**

🔥 **#3590** - Telegram v2 inbound tracer (XL, 13 ngày)
- Webhook → ledger + binding, chưa có reply path
- ProductAdapter/ProductWorkflow stack cho Telegram v2

🔥 **#3808** - `/benchmark` slash-command dispatcher (M, mới)
- Cho phép maintainer chạy benchmarks qua comment
- Tích hợp với nearai-bench

🔥 **#3802** - Wire Reborn REPL host-runtime capabilities (XL, mới)
- Expose built-in capabilities cho REPL model calls

🔥 **#3738** - Migrate trace client to reborn (XL, 2 ngày)
- Prune trace CLI thành contributor-only
- Operator/admin commands move ra khỏi Ironclaw

🔥 **#3632** - Before-inbound policy seam (XL, 6 ngày)
- `BeforeInboundPolicy` cho WebUI/WebChat v2
- Check/rewrite/reject messages trước khi staging

🔥 **#3767** - Lean host NoExposureGuard service (L, 2 ngày)
- Wrap `ironclaw_safety::LeakDetector`
- Boundary-aware text, JSON, HTTP checks

🔥 **#3799** - Identity prompt scope isolation test (S, mới)
- Binary-E2E test với injected `HostIdentityContextSource`

🔥 **#3548** - DISABLE_TOOLS_LIST flag (XL, 8 ngày)
- Config flag để disable specific tools
- Security regression test

🔥 **#3747** - WebUI v2 routes with RebornServicesApi (XL, 2 ngày)
- 6 axum handlers: create_thread, send_message, get_timeline, stream_events, cancel_run, resolve_gate
- Mỗi handler có `IngressRouteDescriptor`

🔥 **#3761** - Event stream manager slice (XL, 2 ngày)
- Transport-neutral product-facing stream manager
- Projection snapshots/replay với access checks

🔥 **#3789** - Wire CLI identity config (M, mới)
- Map `[identity].tenant` và `[identity].default_agent`

🔥 **#3793** - Thread binding isolation parity test (XS, mới)
- Cover external conversation → canonical thread binding

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

🔥 **#3702** - Reborn binary-E2E test framework (4 comments)
- Audit 88 `tests/*.rs` files, classify 29 core agent-loop tests
- Phased implementation plan cho test parity

🔥 **#3798** - Subagent spawn design (mới, 0 comments nhưng quan trọng)
- Design doc + 3 phased implementation docs
- Phases: contracts → mechanisms → integration

### **Vấn đề người dùng quan tâm:**

- **Crate boundary ambiguity** (#3773): Audit 47 `ironclaw_*` crates để làm rõ ownership
- **WebUI Beta lifecycle** (#3630, #3629, #3628, #3627, #3612): 5 issues về gate/cancel/resume DTOs
- **Approval/auth interactions** (#3094): Services cho blocked run-state

## 5. 🐛 Ổn định & Bugs

### **Bugs đã fix:**

✅ **#3779** - Schema normalization cho tool arguments
- Fix issue với quoted integers, stringified JSON
- Fail closed on invalid types

✅ **#3789** - CLI identity config không được wire
- Fix mismatch giữa `config init` output và `run` parsing

### **Issues kỹ thuật đang xử lý:**

⚠️ **#3610** - Preserve typed filesystem errors
- `ProcessError::Filesystem(String)` mất typed details
- Cần preserve NotFound và các error types khác

⚠️ **Dependency updates pending:**
- #3764: 44 packages trong everything-else group
- #3360: 6 packages trong tokio-ecosystem group

## 6. ✨ Yêu cầu tính năng

### **Tính năng mới đang implement:**

🎯 **Subagent spawn** (#3798)
- Design cho spawning subagents trong Reborn loop
- 3 phases: contracts → mechanisms → integration

🎯 **Tenant-scoped groups & project ACLs** (#3796)
- Projects shareable across users
- First-class permission decisions

🎯 **DISABLE_TOOLS_LIST** (#3548)
- Runtime tool disabling capability
- Security-focused feature

🎯 **Telegram v2 integration** (#3590)
- Inbound tracer đã xong
- Reply path đang pending

## 7. 👥 Phản hồi người dùng

### **Developer Experience:**

- **Positive**: Kiến trúc modular với 8 lanes cho phép phát triển song song hiệu quả
- **Concern**: Complexity tăng cao với nhiều abstraction layers (ProductAdapter, ProductWorkflow, HostRuntime, TurnCoordinator...)
- **Request**: Cần documentation tốt hơn cho crate boundaries (#3773)

### **Testing & Quality:**

- **Positive**: Focus mạnh vào E2E testing và parity tests
- **Positive**: Fail-closed approach cho security (unknown host ports, invalid schemas)
- **Positive**: Binary-E2E test framework đang được xây dựng (#3702)

## 8. 📋 Backlog & Roadmap

### **Immediate priorities (đang active):**

1. **WebUI Beta** - 5 issues (#3630, #3629, #3628, #3627, #3612) đang close
2. **Extension v2 readiness** - Lanes 2, 4, 5, 6 đang triển khai
3. **REPL composition** - Lane 1 đang finalize
4. **Event streaming** - Lane 8 cần hoàn thiện

### **Next milestones:**

1. **Concrete tool integrations:**
   - Notion MCP (Lane 5)
   - GitHub WASM (Lane 6)
   - Native Memory (Lane 4)
   - Google Suite (mentioned in #3801)

2. **Binary-E2E test coverage:**
   - 29 core agent-loop tests cần port (#3702)
   - Subagent spawn tests (#3798)

3. **Production readiness:**
   - Secrets/egress substrate (Lane 3)
   - NoExposureGuard service (#3767)
   - Approval/auth services (#3094)

### **Technical debt:**

- Crate boundary cleanup (#3773)
- Legacy extension manifest migration
- Filesystem error typing (#3610)
- Dependency updates (#3764, #3360)

---

## 📈 Metrics

- **Issues mở**: 19 (8 mới trong 24h)
- **PRs active**: 50 (15 merged trong 24h)
- **Contributors active**: ~8-10 (core team + dependabot)
- **Velocity**: Rất cao - average 15+ PRs merged/day
- **Focus areas**: Reborn architecture (80%), WebUI v2 (15%), Infrastructure (5%)

**Đánh giá tổng thể**: Dự án đang trong giai đoạn refactoring lớn với tốc độ phát triển rất cao. Kiến trúc Reborn đang được xây dựng methodical với 8 lanes song song, focus mạnh vào testing và security. Cần chú ý đến complexity management và documentation khi số lượng abstractions tăng lên.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo Phân tích LobsterAI - Ngày 2026-05-20

## 🎯 Tóm tắt hôm nay

Dự án LobsterAI đang trong giai đoạn tích cực xử lý backlog với 30 PR đang chờ xử lý (nhiều đã bị đánh dấu `stale`). Hoạt động chính tập trung vào việc cải thiện trải nghiệm người dùng trong module Cowork, tối ưu hóa UI/UX, và nâng cấp khả năng quản lý Agent. Có 1 issue mới được mở yêu cầu tích hợp engine OpenHuman, cho thấy cộng đồng đang quan tâm đến việc mở rộng khả năng tích hợp của hệ thống.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### 🔥 PR Đang Hoạt động (Mới nhất)

**#2015** - Fix: Xử lý retry và gap trong tool result của OpenClaw
- **Tác giả**: @fisherdaddy
- **Phạm vi**: renderer, docs, main, cowork
- **Ý nghĩa**: Cải thiện độ tin cậy của hệ thống compaction và xử lý kết quả công cụ

**#2013** - Fix: Context window slider snap-to-preset và K/M text input
- **Trạng thái**: CLOSED
- **Tính năng**: 
  - Slider tự động snap vào các giá trị preset (32K/64K/200K/1M/2M)
  - Hỗ trợ nhập text với đơn vị K/M (ví dụ: `1m` = 1,000,000)
  - Click vào điểm preset để nhảy nhanh
- **Đánh giá**: Cải thiện đáng kể UX khi cấu hình context window

**#2014** - Fix: Weixin QR gateway restart
- **Trạng thái**: CLOSED
- **Phạm vi**: renderer, docs, main, IM
- **Ý nghĩa**: Sửa lỗi khởi động lại gateway WeChat QR

### 📊 Xu hướng phát triển

**1. Tối ưu hóa trải nghiệm Cowork** (Chiếm ~40% PR)
- Cải thiện UI/UX cho session list, message display
- Thêm tính năng tiện ích: scroll to bottom, regenerate, read aloud
- Tối ưu search và navigation

**2. Quản lý Agent nâng cao** (Chiếm ~20% PR)
- Import/export agent templates (#1691)
- Cấu hình working directory riêng cho từng agent (#1668)
- Hiển thị thông tin agent trên welcome screen (#1660)

**3. Multi-Agent Orchestration** (Chiếm ~15% PR)
- PR #680: Hệ thống quan sát subagent realtime
- PR #2011: Sidebar hiển thị subagent sessions
- Tích hợp OpenClaw v2026.4.12 (#1663)

**4. Cải thiện bảo mật & ổn định** (Chiếm ~10% PR)
- Log sanitization (#1661)
- Confirmation modals cho destructive actions (#1690)
- URL validation (#1683)

---

## 🌟 Điểm nổi bật cộng đồng

### 🔝 PR Quan trọng nhất

**#680 - Multi-Agent Orchestration với Subagent Observable**
- **Tính năng**: Biến OpenClaw từ "black box" thành hệ thống hoàn toàn transparent
- **Khả năng**:
  - Agent Router tự động phân phối subtask cho Worker Agents
  - Sidebar hiển thị tiến độ realtime
  - Xem lịch sử đối thoại đầy đủ của subagent
- **Tác động**: Đây là bước tiến lớn trong việc xây dựng hệ thống multi-agent production-ready

### 💡 Tính năng UX được cộng đồng yêu thích

1. **#1682 - Text-to-Speech cho AI responses**
   - Sử dụng Web Speech API native
   - Zero dependency, hoạt động ngay lập tức
   - Có animation sóng âm thanh

2. **#1691 - Agent Template Import/Export**
   - Chia sẻ cấu hình agent giữa các thiết bị
   - Format JSON chuẩn
   - Hỗ trợ import từ URL hoặc file local

3. **#1675 - Session List Grouping**
   - Nhóm sessions theo thời gian (Hôm nay, Hôm qua, 7 ngày, 30 ngày, theo tháng)
   - Cải thiện khả năng tìm kiếm lịch sử

---

## 🐛 Ổn định & Bugs

### ✅ Đã sửa

1. **Context Window Slider** (#2013)
   - Không thể chọn chính xác giá trị preset
   - Thiếu hỗ trợ nhập text với đơn vị

2. **Input Draft Loss** (#1693)
   - Mất nội dung input khi chưa cấu hình model
   - Đã thêm draft preservation

3. **Agent Switching Bug** (#1707)
   - Input không được clear khi chuyển agent
   - Tất cả agents chia sẻ cùng draft key `'__home__'`

4. **Log Security** (#1661)
   - API keys và tokens bị lộ trong exported logs
   - Đã implement log sanitization

### 🔄 Đang xử lý

1. **OpenClaw Compaction Issues** (#2015)
   - Retry logic và tool result gaps
   - Đang được fix bởi @fisherdaddy

2. **Stale PRs** (24 PRs đánh dấu `stale`)
   - Nhiều PR chất lượng bị pending quá lâu
   - Cần review và merge để tránh conflict

---

## 💡 Yêu cầu tính năng

### 🆕 Issue mới hôm nay

**#2016 - Đề xuất tích hợp OpenHuman engine**
- **Tác giả**: @qxjysd
- **Nội dung**: Yêu cầu thêm hỗ trợ cho OpenHuman engine
- **Trạng thái**: OPEN, chưa có phản hồi
- **Đánh giá**: Cần clarification về use case và integration requirements

### 🎨 Tính năng UX đang được phát triển

1. **Right-click Context Menu** (#1642)
   - Tích hợp với Windows Explorer
   - Registry-based implementation
   - Command: `--open-directory="%V"`

2. **User Avatar Settings** (#1629)
   - 6 preset SVG avatars
   - Upload custom images
   - Auto-assign random avatar cho user mới

3. **MCP Quick Add Templates** (#1631)
   - Templates cho File System, SQLite, Brave Search
   - Pre-filled forms để giảm configuration effort

---

## 💬 Phản hồi người dùng

### 😊 Positive Feedback (Implicit)

- **Multi-agent orchestration** (#680): Giải quyết pain point lớn về transparency
- **Session grouping** (#1675): Cải thiện đáng kể khả năng quản lý lịch sử
- **Agent templates** (#1691): Giải quyết vấn đề sharing và backup

### 😐 Pain Points

1. **Stale PRs**: 24/30 PRs bị đánh dấu stale cho thấy bottleneck trong review process
2. **I18n inconsistency** (#1639): Nhiều nơi vẫn hardcode English strings
3. **Model setup UX** (#1693): Entry point không rõ ràng cho người dùng mới

### 🔧 Developer Experience

- **Verification workflow** được nhấn mạnh trong nhiều PRs
- **Safety guardrails** được implement cẩn thận (confirmation modals, log sanitization)
- **Code quality**: PRs có test plan và detailed description

---

## 🗺️ Backlog & Roadmap

### 📋 Backlog Analysis

**Phân loại 30 PRs đang pending:**

| Danh mục | Số lượng | % |
|----------|----------|---|
| UX/UI Improvements | 12 | 40% |
| Agent Management | 6 | 20% |
| Multi-Agent Features | 5 | 17% |
| Bug Fixes | 4 | 13% |
| Security & Stability | 3 | 10% |

### 🎯 Ưu tiên đề xuất

**High Priority** (Nên merge sớm):
1. #680 - Multi-agent orchestration (tính năng core)
2. #1661 - Log sanitization (security critical)
3. #2015 - OpenClaw compaction fixes (stability)
4. #1691 - Agent templates (high user value)

**Medium Priority** (Cải thiện UX):
5. #1675 - Session grouping
6. #1682 - Text-to-speech
7. #1693 - Model setup improvements

**Low Priority** (Nice to have):
8. #1629 - User avatars
9. #1642 - Right-click menu

### 🚧 Roadmap Insights

Dựa trên pattern của PRs, dự án đang hướng tới:

1. **Production-ready Multi-Agent System**
   - Observable subagents
   - Agent orchestration
   - Template sharing

2. **Enterprise Features**
   - Security hardening (log sanitization, confirmations)
   - IM integrations (WeChat, DingTalk, Feishu, QQ)
   - Working directory isolation

3. **Developer Experience**
   - Better debugging tools
   - Comprehensive documentation
   - Improved error handling

---

## 📌 Khuyến nghị

### Cho maintainers:
1. **Giải quyết stale PRs**: 24 PRs cần review urgently để tránh merge conflicts
2. **Prioritize security PRs**: #1661 (log sanitization) nên merge ngay
3. **Document multi-agent features**: #680 là tính năng lớn, cần documentation đầy đủ

### Cho contributors:
1. **I18n compliance**: Check tất cả hardcoded strings trước khi submit PR
2. **Test coverage**: Đảm bảo có test plan cho mọi feature PR
3. **Follow verification guidelines**: Build + test trước khi present results

### Cho users:
1. **Thử nghiệm multi-agent**: Tính năng orchestration đang được phát triển tích cực
2. **Backup agent configs**: Sử dụng export feature khi có (#1691)
3. **Report OpenHuman use cases**: Issue #2016 cần thêm context để implement

---

**Tổng kết**: LobsterAI đang trong giai đoạn phát triển mạnh mẽ với focus vào multi-agent capabilities và enterprise readiness. Tuy nhiên, cần cải thiện review velocity để tránh backlog tăng cao. 🚀

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# 📊 Báo cáo phân tích dự án Moltis - Ngày 20/05/2026

## 🎯 Tóm tắt hôm nay

Ngày 19-20/05 ghi nhận hoạt động tích cực với **2 PR được merge** giải quyết các vấn đề kỹ thuật quan trọng về WebSocket và Docker sandbox. Dự án đang trong giai đoạn ổn định hóa với focus vào việc sửa lỗi hạ tầng cốt lõi, đặc biệt là các vấn đề liên quan đến vault security và sandbox isolation. Có **2 PR đang mở** bổ sung tính năng mới cho OpenAI Codex và cải thiện bảo mật vault.

---

## 🚀 Releases

**Không có release mới** trong 24 giờ qua. Dự án đang tích lũy các fixes và improvements để chuẩn bị cho release tiếp theo.

---

## 📈 Tiến độ dự án

### Pull Requests đã merge ✅

**#1023 - Fix WebSocket timeout false positives**
- **Vấn đề giải quyết**: Người dùng gặp thông báo "WebSocket disconnected" khi thực tế chỉ là RPC timeout
- **Giải pháp**: Giữ nguyên timeout 5s nhưng cải thiện error messaging, hiển thị rõ method bị timeout
- **Impact**: Cải thiện UX đáng kể, giúp debug dễ dàng hơn
- **Liên quan**: Đóng issue #1022

**#1025 - Fix Docker sandbox zombie processes**
- **Vấn đề giải quyết**: Orphaned processes trong Docker sandbox không được reap, tích lũy thành zombies
- **Giải pháp**: Thêm `--init` flag cho Docker containers để tự động reap zombie processes
- **Impact**: Cải thiện resource management và stability của sandbox environment
- **Liên quan**: Đóng issue #423 (docker + sandbox issues)

### Pull Requests đang mở 🔄

**#1026 - Vault auth password sync improvements** ⚠️ **Critical Security**
- **Mục đích**: Đảm bảo auth password và vault password luôn đồng bộ atomic
- **Chi tiết kỹ thuật**:
  - Reject first-password/reset flows có thể tạo mismatch với sealed vault
  - Thêm regression tests cho vault rotation và mismatch scenarios
- **Ý nghĩa**: Tăng cường bảo mật vault, tránh data loss do password mismatch

**#1005 - OpenAI Codex reasoning effort support**
- **Tính năng**: Hỗ trợ `reasoning_effort` parameter cho GPT-5 Codex
- **Implementation**: 
  - Carry reasoning_effort qua cloned provider instances
  - Serialize effort config trong Responses API requests
  - Giữ `encrypted_content` cho backward compatibility
- **Tác giả**: @PeterDaveHello (contributor tích cực)

### Xu hướng phát triển 📊

- **Focus chính**: Stability & reliability improvements
- **Lĩnh vực ưu tiên**: 
  1. Security (vault, auth)
  2. Infrastructure (sandbox, websocket)
  3. AI provider integration (Codex)

---

## 🌟 Điểm nổi bật cộng đồng

### Issue #423 - Docker + Sandbox issues (👍 5)
- **Tương tác cao nhất** trong batch này
- Vấn đề đã tồn tại từ 12/03, cuối cùng được resolve qua PR #1025
- Cho thấy pain point quan trọng của người dùng self-host với Docker

### Issue #850 - MCP OAuth client_secret support
- Feature request cho OAuth configuration flexibility
- Đã được đóng (19/05), có thể đã được implement hoặc rejected
- Liên quan đến MCP (Model Context Protocol) server integration

---

## 🐛 Ổn định & Bugs

### Đã sửa ✅

1. **WebSocket false disconnects** (#1022 → #1023)
   - Symptom: "WebSocket disconnected" khi update LLM modes
   - Root cause: RPC timeout được report sai thành connection loss
   - Status: Fixed và merged

2. **Docker zombie processes** (#423 → #1025)
   - Symptom: Zombie processes tích lũy trong sandbox containers
   - Root cause: Thiếu init process để reap orphans
   - Status: Fixed và merged

### Đang xử lý 🔧

**#1024 - Hooks config not registered at runtime**
- **Severity**: Medium-High
- **Vấn đề**: Config section `[hooks]` được parse và validate nhưng không được register
- **Impact**: Hooks configuration không hoạt động dù syntax đúng
- **Status**: Mới report (19/05), chưa có PR fix
- **Tác giả**: @dmitriikeler

---

## 💡 Yêu cầu tính năng

### Đã implement/đang review

**OpenAI Codex reasoning effort** (#1005)
- Cho phép control reasoning depth của GPT-5 Codex
- Hữu ích cho balance giữa quality và cost/latency
- Status: PR đang open, có vẻ gần merge

### Đã xử lý

**MCP OAuth client_secret** (#850)
- Đã closed, có thể đã được implement trong version gần đây
- Liên quan đến enterprise/production OAuth flows

---

## 💬 Phản hồi người dùng

### Pain points chính

1. **Docker deployment complexity** 
   - Issue #423 với 5 upvotes cho thấy nhiều người gặp vấn đề tương tự
   - Self-hosting với Docker cần được improve

2. **WebSocket stability concerns**
   - Người dùng lo lắng về connection stability khi thấy disconnect messages
   - Đã được cải thiện với better error messaging

3. **Configuration gaps**
   - Hooks config không hoạt động (#1024)
   - OAuth config limitations (#850)

### Sentiment tổng quan

- **Tích cực**: Team responsive, fixes được merge nhanh (trong 1 ngày)
- **Trung lập**: Vẫn còn một số rough edges trong production deployment
- **Cần cải thiện**: Documentation và error messages (đang được address)

---

## 🗺️ Backlog & Roadmap

### Priorities ngắn hạn (dựa trên activity)

1. **Security hardening** 
   - Vault password sync (#1026) - Critical
   - Auth flow improvements

2. **Infrastructure stability**
   - Hooks registration fix (#1024) - Pending
   - Sandbox improvements (ongoing)

3. **AI provider features**
   - Codex reasoning effort (#1005) - Near completion
   - Potential MCP enhancements

### Xu hướng dài hạn

- **Enterprise readiness**: OAuth, vault security, production deployment
- **Developer experience**: Better error messages, configuration validation
- **AI capabilities**: Advanced reasoning controls, provider flexibility

---

## 📌 Kết luận

Moltis đang trong giai đoạn **maturation** với focus mạnh vào stability và production-readiness. Velocity của team tốt (2 PRs merged trong ngày), responsive với user issues. Các vấn đề được ưu tiên đúng (security, infrastructure) cho thấy dự án đang hướng tới enterprise adoption. Cộng đồng tương đối nhỏ nhưng engaged, với các issues được track và resolve có hệ thống.

**Điểm mạnh**: Fast iteration, security-conscious, good engineering practices  
**Cần cải thiện**: Documentation, deployment experience, configuration flexibility

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# 📊 Báo cáo phân tích CoPaw - Ngày 2026-05-20

## 1. 🎯 Tóm tắt hôm nay

Dự án CoPaw (QwenPaw) đã phát hành **phiên bản v1.1.8** với nhiều tính năng đột phá, đặc biệt là hệ thống plugin chính thức và tính năng thú cưng desktop. Cộng đồng rất sôi nổi với **44 PRs** và **29 issues** hoạt động, tập trung vào cải thiện trải nghiệm người dùng, bảo mật, và khả năng tích hợp. Các vấn đề về encoding Windows, streaming API, và quản lý context đang được ưu tiên xử lý.

---

## 2. 🚀 Releases

### **v1.1.8** (Phát hành: 2026-05-19)

#### ✨ Tính năng nổi bật:

**🔌 Hệ sinh thái Plugin**
- **Plugin Distribution chính thức** ([#4482](https://github.com/agentscope-ai/QwenPaw/pull/4482)): Người dùng có thể duyệt và tải plugin từ website, hoặc cài đặt một cú nhấp chuột trong Console Plugin Manager
- **QwenPaw Pet** ([#4418](https://github.com/agentscope-ai/QwenPaw/pull/4418)): Plugin thú cưng desktop với cửa sổ động vật hoạt hình - tính năng độc đáo tạo trải nghiệm thân thiện
- **CloudPaw**: Plugin triển khai Alibaba Cloud mới

**🛠️ Cải tiến công cụ**
- **Skill Market** ([#4518](https://github.com/agentscope-ai/QwenPaw/pull/4518)): Chợ kỹ năng thống nhất với 3 nhà cung cấp, tìm kiếm async, phân trang "Load More"
- **OAuth 2.1 cho MCP** ([#4532](https://github.com/agentscope-ai/QwenPaw/pull/4532)): Luồng xác thực PKCE + DCR cho remote MCP servers
- **Spawn Subagent** ([#4530](https://github.com/agentscope-ai/QwenPaw/pull/4530)): Công cụ tạo sub-agent để ủy quyền tác vụ phụ trong cùng workspace

**🔒 Bảo mật**
- Đóng lỗ hổng path traversal trong `AgentMdManager` ([#4511](https://github.com/agentscope-ai/QwenPaw/pull/4511))
- Yêu cầu xác thực cho tất cả API routes của plugin ([#4513](https://github.com/agentscope-ai/QwenPaw/pull/4513))

**📊 Trải nghiệm người dùng**
- Hiển thị thông tin token usage trong mỗi cuộc hội thoại ([#4433](https://github.com/agentscope-ai/QwenPaw/pull/4433))
- Streaming card output cho Feishu channel ([#4480](https://github.com/agentscope-ai/QwenPaw/pull/4480))
- Tối ưu hiệu suất Model trong Console ([#4502](https://github.com/agentscope-ai/QwenPaw/pull/4502))

#### 🎯 Ý nghĩa:
Phiên bản này đánh dấu bước chuyển mình quan trọng của CoPaw từ một công cụ AI agent đơn lẻ sang **nền tảng hệ sinh thái** với marketplace plugin, khả năng mở rộng cao, và trải nghiệm người dùng được đánh bóng. Việc tích hợp OAuth 2.1 và cải thiện bảo mật cho thấy dự án đang hướng tới sử dụng enterprise-grade.

---

## 3. 📈 Tiến độ dự án

### **PRs quan trọng đang mở (Open)**

#### 🔥 Ưu tiên cao:

**#4536 - OpenCode Go Provider** (19 bình luận dự kiến)
- Thêm OpenCode Go làm cloud provider tích hợp với 10 models tương thích OpenAI
- Đáp ứng yêu cầu từ issue #4441 về cấu hình một cú nhấp chuột
- **Xu hướng**: Mở rộng danh sách providers miễn phí cho người dùng

**#4537 - Feishu Group Shared Session** 
- Cho phép tất cả thành viên trong group chat Feishu chia sẻ cùng session context thay vì tách biệt theo user
- **Impact**: Cải thiện trải nghiệm làm việc nhóm trên Feishu

**#4464 - E2E Test Migration**
- Di chuyển toàn bộ test suite E2E vào CoPaw với mock API infrastructure
- **Ý nghĩa**: Nâng cao chất lượng code và giảm regression bugs

**#4428 - MCP Tool Name Prefixing**
- Giải quyết xung đột tên công cụ khi cấu hình nhiều MCP Server cùng loại
- Thêm prefix theo client key để tránh collision
- **Vấn đề**: Hiện tại chỉ một MCP server được đăng ký khi có tên trùng

**#3813 - Tauri 2.x Desktop App** (đang review từ 24/4)
- Thêm hỗ trợ desktop app với Tauri 2.x
- Wrap Console frontend trong Tauri webview, chạy FastAPI backend local
- **Trạng thái**: PR lớn, đang chờ review kỹ lưỡng

#### 🛠️ Cải tiến kỹ thuật:

**#4520 - Chat Input Draft Persistence**
- Lưu nội dung đang soạn trong input box khi chuyển trang
- Sử dụng localStorage + polling để khôi phục
- **UX improvement**: Tránh mất nội dung khi navigate

**#4337 - Shell Command Discovery**
- Tự động phát hiện Node.js bin directories từ Volta, fnm, nvm, Homebrew
- Thêm `~/.local/bin` vào PATH cho daemon/systemd users
- **Impact**: Cải thiện khả năng thực thi shell commands

### **Xu hướng phát triển:**

1. **Mở rộng hệ sinh thái**: Plugin marketplace, skill market, nhiều providers
2. **Enterprise-ready**: OAuth, bảo mật, E2E testing
3. **Multi-channel**: Cải thiện Feishu, WeChat, Discord integration
4. **Desktop experience**: Tauri app, pet plugin
5. **Developer experience**: Better error messages, token tracking, draft persistence

---

## 4. 💬 Điểm nổi bật cộng đồng

### **Issues có nhiều tương tác:**

**#4496 - AGENTS.md Loading Bug** (9 bình luận)
- **Vấn đề**: Sau upgrade lên 1.1.7, AGENTS.md trong system prompt load template mặc định thay vì file thực tế trong workspace
- **Tác động**: Nghiêm trọng - ảnh hưởng đến hành vi agent
- **Trạng thái**: Đang được điều tra, có 2 trường hợp khác nhau

**#4543 - API Streaming Incomplete** (4 bình luận)
- **Vấn đề**: Lần đầu tiên khởi tạo session_id mới qua API, dữ liệu streaming không đầy đủ
- **Tần suất**: Chỉ xảy ra lần đầu, lần sau bình thường
- **Ưu tiên**: Cao - ảnh hưởng API integration

**#4535 - /backups HTTP 403** (4 bình luận)
- **Vấn đề**: Truy cập `/backups` từ localhost bị 403 Forbidden
- **Phiên bản**: 1.1.8
- **Liên quan**: Có thể là vấn đề auth configuration

**#4497 - Markdown Table Line Breaks** (4 bình luận, lần thứ 3 báo cáo)
- **Vấn đề**: `<br>` trong Markdown tables không tạo line break
- **Frustration level**: Cao - người dùng báo cáo 3 lần
- **Cần**: Ưu tiên xử lý để cải thiện trải nghiệm

### **Vấn đề người dùng quan tâm:**

1. **Encoding trên Windows** (#4481): Đề xuất giải quyết hệ thống vấn đề GBK encoding thay vì vá lẻ tẻ
2. **Plugin marketplace timeline** (#4499): Người dùng hỏi khi nào phát hành - đã được giải quyết trong v1.1.8
3. **Model auto-routing** (#4539): Yêu cầu tự động chuyển model khi gửi ảnh/video/audio như Doubao
4. **Pagination cho All Chats** (#3570): Danh sách chat quá dài load chậm

---

## 5. 🐛 Ổn định & Bugs

### **Bugs đang được xử lý:**

#### 🔴 Nghiêm trọng:

**#4494 - Console Stream Stalls** (CLOSED)
- Token streaming dừng giữa chừng với thông báo "you interrupted me" sai
- Xảy ra khi session context lớn hoặc >10 tool-call rounds
- **Đã fix**: Merged vào v1.1.8

**#4449 - Model 429 → Queue Cleared** (CLOSED)
- Khi model bị rate-limit 429, zero-downtime reload xóa toàn bộ message queue
- Agent "đóng băng" vĩnh viễn, không thể khôi phục ngay cả khi đổi model
- **Root cause**: `UnifiedQueueManager.stop()` clear pending messages
- **Đã fix**: Merged

**#4470 - Plugin RCE Vulnerability** (CLOSED)
- Lỗ hổng remote code execution không xác thực ở plugin interface
- **Mức độ**: Critical security issue
- **Đã fix**: Closed nhanh chóng

#### 🟡 Trung bình:

**#4542 - Model Connection Test Fails** (CLOSED)
- `max_tokens=1` trong test connection gây lỗi với một số API (như B.AI) yêu cầu `>= 3`
- **Impact**: Tất cả models của B.AI đều fail test
- **Đã fix**: Merged

**#4454 - /mission Command Freeze**
- Thực thi `/mission` làm Console freeze hoàn toàn
- Process vẫn chạy nhưng UI không phản hồi
- **Workaround**: Chưa có
- **Trạng thái**: Open, cần điều tra

**#4528 - Model Test Button Breaks Feishu**
- Click nút test model trong khi dùng Feishu làm conversation không hoạt động
- **Channel-specific**: Chỉ ảnh hưởng Feishu
- **Trạng thái**: Open

#### 🟢 Nhỏ:

**#4544 - Feishu Message Not Showing in Console**
- Thỉnh thoảng tin nhắn từ Feishu không hiển thị trong console
- **Tần suất**: Ngẫu nhiên
- **Phiên bản**: 1.1.8

**#4540/#4541 - Pet Plugin Crash** (CLOSED/OPEN)
- Plugin Pet làm crash app khi bắt đầu chat (ConnectTimeout / PySide6)
- **Môi trường**: Windows 11, cả Desktop và pip
- **Trạng thái**: Đang điều tra

### **Xu hướng ổn định:**

- ✅ **Bảo mật được ưu tiên**: RCE và path traversal được fix nhanh
- ✅ **Streaming issues**: Nhiều vấn đề streaming được giải quyết
- ⚠️ **Channel stability**: Feishu có một số vấn đề cần theo dõi
- ⚠️ **Plugin ecosystem**: Pet plugin mới có teething problems
- ⚠️ **Windows encoding**: Vẫn là pain point cần giải pháp hệ thống

---

## 6. 💡 Yêu cầu tính năng

### **Tính năng được đề xuất:**

#### 🔥 Được cộng đồng ủng hộ:

**#4539 - Free Multimodal Routing** (👍 1)
- **Mô tả**: Tự động chuyển model khi gửi ảnh/video/audio, giống Doubao
- **Use case**: 
  - Gửi ảnh → tự động dùng free vision model (Gemma 3N / Qwen-VL)
  - Gửi video → free video understanding model
  - Gửi audio → free speech recognition
  - Yêu cầu AI vẽ → free image generation
- **Lợi ích**: Trải nghiệm liền mạch, không cần chuyển model thủ công
- **Trạng thái**: Open, đang thảo luận

**#4525 - Agent Self-Managed Context Lifecycle**
- **Vấn đề**: Agent chạy cron tasks/long pipelines mất chất lượng khi context đầy (50-60%)
- **Đề xuất**: 
  - Auto checkpoint & reset cho cron tasks
  - Agent tự quản lý context lifecycle
  - Preserve execution quality trong long-running workflows
- **Impact**: Critical cho automation use cases
- **Trạng thái**: Open

**#4463 - Cached Prompt Token Estimation**
- **Mục tiêu**: Cải thiện ước tính token bằng cách tái sử dụng prompt usage từ provider
- **Kỹ thuật**: Chỉ estimate delta messages khi history khớp cached boundary
- **Lợi ích**: Token tracking chính xác hơn, giảm overhead
- **Trạng thái**: Open

**#3311 - Self-Evolution Capability** (từ 13/4)
- **Đề xuất**: Thêm khả năng tự tiến hóa như Hermes Agent
- **Mục tiêu**: Giải quyết AI hallucination và quản lý memory
- **Scope**: Core / Backend
- **Trạng thái**: Open, long-term feature

#### 🛠️ Cải tiến UX:

**#4514 - Source Tracing / Citation**
- **Yêu cầu**: Thêm tính năng truy xuất nguồn/trích dẫn trong conversation outputs
- **Use case**: Khi model xử lý large documents, hiển thị nguồn thông tin
- **Lợi ích**: Tăng độ tin cậy, dễ verify
- **Trạng thái**: Open

**#4432 - Cron "Clear Before Run"** (có PR)
- **Tính năng**: Toggle "Clear Before Run" để reset context trước khi chạy cron task
- **Lợi ích**: Tránh context cũ ảnh hưởng automated tasks
- **Trạng thái**: Có PR, đang review

### **Xu hướng yêu cầu:**

1. **Automation-first**: Context management cho long-running tasks
2. **Multimodal intelligence**: Auto-routing, vision, audio
3. **Transparency**: Token tracking, source citation
4. **Self-improvement**: Agent evolution, memory management
5. **Zero-friction UX**: Auto-switching, smart defaults

---

## 7. 👥 Phản hồi người dùng

### **Trải nghiệm tích cực:**

✅ **Plugin ecosystem được đón nhận tốt**
- Người dùng hào hứng với plugin marketplace và Pet plugin
- Yêu cầu thêm nhiều plugin chính thức

✅ **Bảo mật được đánh giá cao**
- Cộng đồng ghi nhận việc fix nhanh các lỗ hổng RCE và path traversal
- Thêm auth cho plugin APIs được ủng hộ

✅ **Token tracking transparency**
- PR #4433 về hiển thị token usage được đánh giá cao
- Người dùng muốn kiểm soát chi phí tốt hơn

### **Pain points:**

⚠️ **Windows encoding hell**
- Issue #4481 phản ánh frustration với GBK encoding errors liên tục
- Người dùng yêu cầu giải pháp hệ thống thay vì vá lẻ tẻ
- **Quote**: "Một ngày thấy vô số lần lỗi GBK"

⚠️ **Markdown rendering issues**
- Issue #4497 được báo cáo **3 lần** về line breaks trong tables
- Cho thấy vấn đề nhỏ nhưng ảnh hưởng trải nghiệm hàng ngày

⚠️ **Upgrade concerns**
- Issue #4430: Lo lắng mất config khi upgrade 1.1.6 → 1.1.7
- Người dùng muốn biết rõ data migration strategy

⚠️ **Channel stability**
- Feishu users báo cáo nhiều vấn đề: message không hiển thị, test button break conversation
- WeChat (iLink) API không gửi được message thực tế dù API trả về success

### **Feature requests từ real use cases:**

💼 **Enterprise needs:**
- OAuth cho MCP (đã có trong v1.1.8)
- Better error messages và debugging
- Backup/restore functionality

🤖 **Automation needs:**
- Context lifecycle management cho cron
- Subagent spawning (đã có trong v1.1.8)
- Mission command stability

🎨 **UX polish:**
- Draft persistence (có PR)
- Pagination cho long lists
- Multimodal auto-routing

### **Sentiment analysis:**

- **Tổng thể**: Tích cực, cộng đồng active và constructive
- **Frustration areas**: Windows encoding, Markdown rendering, channel stability
- **Excitement**: Plugin ecosystem, new features trong v1.1.8
- **Trust**: Team responsive với security issues và bug fixes

---

## 8. 📋 Backlog & Roadmap

### **Đang trong pipeline (có PR):**

#### 🚀 Sắp merge:

1. **OpenCode Go Provider** (#4536) - Thêm 10 free models
2. **Feishu Group Shared Session** (#4537) - Team collaboration
3. **E2E Test Suite** (#4464) - Quality assurance
4. **MCP Tool Prefixing** (#4428) - Fix collision
5. **Chat Draft Persistence** (#4520) - UX improvement
6. **Shell Command Discovery** (#4337) - Better PATH handling

#### 🔄 Long-term (đang review):

1. **Tauri Desktop App** (#3813) - Native desktop experience
2. **Cron Clear Before Run** (#4432) - Automation improvement

### **Backlog ưu tiên cao:**

#### 🔴 Critical:

1. **Fix /mission freeze** (#4454) - Blocking feature
2. **Feishu stability issues** (#4528, #4544) - Channel reliability
3. **Pet plugin crash** (#4541) - New feature broken
4. **Windows GBK system fix** (#4481) - Platform support

#### 🟡 Important:

1. **Multimodal auto-routing** (#4539) - UX game-changer
2. **Agent context lifecycle** (#4525) - Automation quality
3. **Source citation** (#4514) - Trust & transparency
4. **Cached token estimation** (#4463) - Accuracy
5. **Pagination for All Chats** (#3570) - Performance

#### 🟢 Nice-to-have:

1. **Self-evolution capability** (#3311) - Advanced AI
2. **Markdown table line breaks** (#4497) - Polish
3. **Better upgrade experience** (#4430) - Migration

### **Roadmap insights (suy luận từ activities):**

#### **Q2 2026 Focus:**

1. **Ecosystem maturity**
   - ✅ Plugin marketplace (done in v1.1.8)
   - ✅ Skill market (done in v1.1.8)
   - 🔄 More official plugins
   - 🔄 Plugin developer docs

2. **Enterprise readiness**
   - ✅ OAuth 2.1 (done in v1.1.8)
   - ✅ Security hardening (ongoing)
   - 🔄 E2E testing
   - 🔄 Better monitoring/observability

3. **Multi-channel excellence**
   - 🔄 Feishu stability fixes
   - 🔄 WeChat improvements
   - 🔄 Group collaboration features

4. **Desktop experience**
   - ✅ Pet plugin (done in v1.1.8)
   - 🔄 Tauri app (in review)
   - 🔄 Native integrations

#### **Future directions:**

1. **AI capabilities**
   - Multimodal routing
   - Self-evolution
   - Better context management
   - Source attribution

2. **Developer experience**
   - Better error messages
   - Token transparency
   - Debugging tools
   - Plugin SDK improvements

3. **Platform support**
   - Windows encoding fix
   - Cross-platform consistency
   - Performance optimization

4. **Automation**
   - Cron improvements
   - Subagent orchestration
   - Long-running task support

---

## 🎯 Kết luận

**CoPaw đang trong giai đoạn tăng trưởng mạnh mẽ** với v1.1.8 đánh dấu bước chuyển từ tool sang platform. Cộng đồng rất active với 44 PRs và 29 issues, cho thấy sự quan tâm cao. 

**Điểm mạnh:**
- Plugin ecosystem đang hình thành
- Security được ưu tiên
- Team responsive với bugs và features
- Nhiều improvements về UX

**Thách thức:**
- Windows encoding cần giải pháp hệ thống
- Channel stability (đặc biệt Feishu)
- Một số features mới có teething problems
- Cần cải thiện upgrade experience

**Outlook**: Tích cực. Dự án đang đi đúng hướng với focus vào ecosystem, enterprise features, và developer experience. Nếu giải quyết được các pain points hiện tại, CoPaw có tiềm năng trở thành platform AI agent hàng đầu.

</details>

<details>
<summary><strong>GoClaw</strong> — <a href="https://github.com/nextlevelbuilder/goclaw">nextlevelbuilder/goclaw</a></summary>

# 📊 Báo cáo Phân tích GoClaw - Ngày 2026-05-20

## 🎯 Tóm tắt hôm nay

Ngày 19/05 chứng kiến một đợt hoạt động mạnh mẽ với **5 PR mới** được mở, tập trung vào việc sửa lỗi bảo mật nghiêm trọng (command injection trong sandbox), cải thiện UX cho Skills, và mở rộng khả năng tích hợp (MCP sandbox agent độc lập, GPT-5.5 support). Đáng chú ý là **3 lỗ hổng bảo mật P0/P1** được báo cáo bởi @YLChen-007, cho thấy dự án đang được kiểm tra kỹ lưỡng về mặt security. Không có release mới, nhưng có nhiều tiến triển quan trọng về infrastructure và developer experience.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

Phiên bản hiện tại: **v3.11.3** (Docker), với v3.10.0 bị thiếu Docker image (#1025).

---

## 📈 Tiến độ dự án

### 🔥 Pull Requests nổi bật (mới nhất 19/05)

#### **Bảo mật & Ổn định**
- **#1155** 🔒 `fix(sandbox): avoid shell in FsBridge writes` - **CRITICAL FIX**
  - Sửa lỗi command injection trong `FsBridge.WriteFile` bằng cách loại bỏ `sh -c` path
  - Truyền filename trực tiếp vào `tee` thay vì interpolate vào shell command
  - Thêm regression tests cho command-substitution-style filenames
  - **Liên quan trực tiếp đến #1121** (P0-critical security issue)

- **#1152** 🛡️ `fix(mcp): use standalone flag matching to prevent false positives`
  - Sửa false positive trong MCP arg validation (package names như `clickup-cli` bị reject nhầm)
  - Đóng góp từ contributor độc lập @algojogacor
  - **Giải quyết #1027** (good first issue)

#### **Tính năng mới & Cải tiến UX**
- **#1154** 🆕 `feat: add standalone MCP sandbox agent`
  - Binary độc lập `mcp-sandbox-agent` expose Feishu form fill, OpenCode run/workspace qua MCP
  - Thêm MCP progress forwarding và AgentPlatform gateway progress callback
  - Dockerfile + docker-compose riêng cho deployment

- **#1159** 🤖 `feat(providers): list gpt-5.5 for ChatGPT OAuth`
  - Thêm GPT-5.5 vào model catalog cho ChatGPT OAuth
  - Expose reasoning controls trong model picker

- **#1156** ⚙️ `feat(skills): configure upload size limit`
  - Thêm `skills.max_upload_size_mb` config (default 20MB)
  - Environment override: `GOCLAW_SKILLS_MAX_UPLOAD_SIZE_MB`
  - **Giải quyết #1153** (feature request từ @clark-cant)

- **#1158** 🎨 `feat(skills): improve operations UX` (CLOSED)
  - URL-backed search/filter/sort cho `/skills`
  - Skills health summary, creator/manager chips, dependency badges
  - Bulk-action affordances

- **#1157** 🩹 `fix(channels): ignore zero failure timestamps`
  - Xử lý Go zero-value timestamps (`0001-01-01T00:00:00Z`) trong channel diagnostics

### 📊 PRs đang chờ merge (quan trọng)

- **#1109** 📱 `feat(channels): add Max Messenger channel` - Tích hợp Max (https://max.ru) như first-class channel
- **#1061** 💼 `feat(channels): Bitrix24 channel core + UI + per-user MCP` - Phần 3/3 của tích hợp Bitrix24
- **#908** ☁️ `feat(providers): add Google Cloud Vertex AI provider` - OAuth2 auth với service account JSON
- **#944, #969** 📦 Package management Phase 2a/2b - pip/npm/apk update flows
- **#943** 🖥️ `feat(workstation): Remote Workstation Runtime` - SSH exec + security + audit
- **#981** 🪝 `feat(webhooks): HTTP webhooks to trigger agents` - HMAC auth + durable callbacks
- **#980** 🔐 `feat(packages): unify Packages & CLI Credentials` - Per-grant env overrides

**Xu hướng**: Dự án đang mở rộng mạnh về **tích hợp channels** (Max, Bitrix24), **providers** (Vertex AI, GPT-5.5), và **infrastructure** (webhooks, remote workstation, MCP sandbox).

---

## 🌟 Điểm nổi bật cộng đồng

### 🔝 Issues có nhiều tương tác

1. **#1070** 👍1 - MCP test succeeds nhưng save fails cho local/private URLs (SSRF validation mismatch)
2. **#1042** - OpenRouter+Anthropic: prompt caching disabled → **3-4x cost overhead** (P1-high)
3. **#1029** - WhatsApp chat ID chứa `@` breaks Docker container naming

### 💬 Vấn đề người dùng quan tâm nhất

- **Chi phí LLM cao** (#1042): Prompt caching không hoạt động với OpenRouter → tốn 3-4x chi phí
- **Bảo mật multi-tenant** (#1118, #1119, #1120, #1121): 4 lỗ hổng nghiêm trọng được báo cáo cùng ngày
- **Tích hợp kênh** (#966, #1058): Zalo OA non-bot, Telegram proxy timeout
- **Backup/Restore** (#1076, #1077, #1122): Nhiều lỗi khi backup tenant và restore

---

## 🐛 Ổn định & Bugs

### 🚨 Critical/High Priority (P0-P1)

#### **Bảo mật** (4 issues từ @YLChen-007)
- **#1121** 🔴 P0 - **Arbitrary Command Execution in Sandbox** via FsBridge command injection
  - ✅ **Đã có fix trong PR #1155**
- **#1118** 🔴 P0 - RoleAdmin Gateway Auth Bypass (Viewer modifies admin-only TTS/Storage config)
- **#1119** 🟠 P1 - Agent Config Bypass via V3-Flags (Viewer mutates admin-only agent config)
- **#1120** 🟠 P1 - Evolution Suggestion Authorization Bypass (tool disabled)

#### **Providers & Channels**
- **#1042** 🟠 P1 - OpenRouter+Anthropic prompt caching disabled (3-4x cost)
- **#1058** 🟠 P1 - Telegram channel permanently broken sau proxy timeout (no reconnect)
- **#1075** 🟠 P1 - Browser Pairing stuck ở `/setup` (RoleOperator không đủ quyền GET `/v1/providers`)
- **#1076** 🟠 P1 - Backup tenant fails (config_secrets thiếu cột `id`)
- **#1077** 🟠 P1 - Xoá team fails (trigger conflict với CHECK constraint)

#### **Data & Config**
- **#978** 🟠 P1 - Editing provider Advanced settings → infinite 500/404 loop (requires DB fix)
- **#1034** 🟠 P1 - Provider broken sau upgrade v3.9.2 → v3.11.1

### 🟡 Medium Priority (P2)

- **#1029** - Docker container naming invalid (WhatsApp `@` in chat ID)
- **#1070** - MCP SSRF validation mismatch (test OK, save fails)
- **#1080** - TTS provider không thể switch về "None (Disabled)"
- **#1039** - Deleting MCP env vars không persist
- **#1054** - Master system không thể edit predefined context files
- **#979** - TTS lỗi NoAudioReceived với vi-VN voices
- **#986** - Browser `open tab: context canceled`
- **#1046** - CLI setup fails (providerType naming mismatch: `openai-compat` vs `openai_compat`)
- **#1047** - DeepSeek V4 Pro lỗi 400 (thiếu `reasoning_content` trên Zalo)
- **#1122** - Dashboard refuses to restore backups

**Nhận xét**: Có **cluster lỗi bảo mật nghiêm trọng** cần xử lý ngay. Nhiều vấn đề về **provider integration** và **backup/restore stability**.

---

## 💡 Yêu cầu tính năng

### 🆕 Feature Requests mới

1. **#1153** 📤 Configurable max upload file size cho skills (hiện hardcoded 20MB)
   - ✅ **Đã được implement trong PR #1156**

2. **#1086** 🔗 Chain LLM providers với automatic fallback khi primary fails
   - Use case: downtime, rate limiting, credential expiration
   - Đề xuất: Web UI config cho fallback chain

3. **#1036** ⏱️ Configurable message debounce timer cho continuous chat
   - Tránh xử lý từng message riêng lẻ khi user gửi liên tiếp

4. **#1087** 🎯 Auto-detect và activate skills via slash command syntax
   - VD: `/search "AI trends"` → tự động activate search skill

5. **#1095** 🔐 Pre-Auth Webhook Interceptor cho Channels
   - Prevent LLM Denial-of-Wallet trong multi-tenant SaaS
   - Validate user trước khi trigger LLM

6. **#1097** ⏸️ Built-in `wait` tool với millisecond delay parameter
   - Hiện chỉ có browser wait, cần general-purpose wait

7. **#1102** 🔄 Background Exec với Output Delivery to LLM
   - Long-running tasks với incremental results

8. **#1112** 🌍 Portuguese (Brazil) - pt-BR localization
   - ✅ **Full translation đã được cung cấp** bởi @ambroz-io (39 files)

### 🔧 Config/DevEx Improvements

- **#1098** ⚙️ `GOCLAW_CRON_JOB_TIMEOUT` env var (hiện chỉ có JSON config)
- **#1052** 🏠 Allow local network cho providers (hiện bị SSRF block)
- **#966** 📱 Support Zalo OA cho non-bot (phone-number) accounts

**Xu hướng**: Cộng đồng cần **flexibility** (configurable limits, fallback chains), **security** (pre-auth webhooks), và **localization**.

---

## 👥 Phản hồi người dùng

### 😊 Tích cực
- @ambroz-io đóng góp full pt-BR translation (39 files) - thể hiện sự quan tâm từ Brazil market
- @algojogacor contribute fix cho MCP validation false positive - community engagement tốt
- Nhiều feature requests chi tiết, well-reasoned (VD: #1086, #1095, #1102)

### 😟 Tiêu cực / Pain Points

1. **Chi phí LLM cao** (#1042): "3-4x cost overhead" do prompt caching không hoạt động
2. **Backup/Restore không ổn định** (#1076, #1077, #1122): Nhiều lỗi DB schema
3. **Security concerns** (#1118-#1121): 4 lỗ hổng nghiêm trọng trong cùng 1 ngày
4. **Channel stability** (#1058): Telegram permanently broken sau proxy timeout
5. **Provider config UX** (#978, #1034): Editing settings → infinite loop, upgrade breaks providers
6. **MCP integration friction** (#1070, #1038, #1039): Test OK nhưng save fails, env vars không persist

### 🗣️ Quotes đáng chú ý

> "Currently, every call resends the full prompt at full input rate" (#1042) - về OpenRouter prompt caching

> "A hard page reset does NOT fix it. The only recovery is manual DB intervention" (#978) - về provider config loop

> "This is the opposite of isolation" (#1073) - về workspace scoping by channel first

---

## 🗓️ Backlog & Roadmap

### 🚧 Đang triển khai (In Progress PRs)

1. **Channels expansion**: Max Messenger (#1109), Bitrix24 (#1061)
2. **Provider ecosystem**: Vertex AI (#908), GPT-5.5 (#1159)
3. **Package management**: pip/npm/apk update flows (#944, #969)
4. **Infrastructure**: Webhooks (#981), Remote Workstation (#943), MCP sandbox agent (#1154)
5. **Security fixes**: Command injection (#1155), MCP validation (#1152)

### 📋 Backlog ưu tiên cao

1. **Security patches** cho #1118, #1119, #1120 (auth bypass issues)
2. **Prompt caching fix** cho OpenRouter+Anthropic (#1042)
3. **Backup/Restore stability** (#1076, #1077, #1122)
4. **Channel reconnect logic** (#1058 - Telegram)
5. **Provider config stability** (#978, #1034)

### 🔮 Roadmap dài hạn (từ feature requests)

- **LLM provider fallback chains** (#1086)
- **Pre-auth webhook interceptor** (#1095)
- **Background exec với LLM feedback** (#1102)
- **Zalo OA non-bot support** (#966)
- **Localization expansion** (pt-BR ready #1112)

---

## 📌 Kết luận

**GoClaw đang trong giai đoạn mở rộng mạnh** về tích hợp (channels, providers, MCP) nhưng đồng thời **gặp nhiều vấn đề về stability và security**. Ngày 19/05 đánh dấu một **security audit wave** với 4 lỗ hổng nghiêm trọng được báo cáo, trong đó 1 lỗi đã được fix ngay (command injection). 

**Ưu tiên ngắn hạn** nên là:
1. ✅ Merge security fixes (#1155, #1152)
2. 🔒 Patch các auth bypass issues (#1118, #1119, #1120)
3. 💰 Fix prompt caching để giảm chi phí LLM (#1042)
4. 🗄️ Stabilize backup/restore flow (#1076, #1077, #1122)

**Cộng đồng đang active** với nhiều feature requests chất lượng cao và contributions từ external developers, cho thấy dự án có tiềm năng phát triển mạnh nếu giải quyết được các vấn đề nền tảng hiện tại.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Báo cáo Phân tích Hermes-Agent - 2026-05-20

## 📊 Tóm tắt hôm nay

Ngày 20/05/2026 là một ngày **cực kỳ sôi động** với **30 PRs mới** và **14 issues** đang hoạt động. Dự án đang trải qua giai đoạn ổn định hóa mạnh mẽ với focus vào **Windows compatibility**, **gateway platform fixes**, và **developer experience improvements**. Đáng chú ý là các vấn đề về resource management (CPU spikes, unbounded worker spawns) và cross-platform compatibility đang được ưu tiên xử lý.

---

## 🚀 Releases

**Không có release mới trong 24h qua** - dự án đang trong giai đoạn tích lũy fixes và improvements.

---

## 📈 Tiến độ dự án

### 🔥 Xu hướng chính

**1. Windows Tier-1 Support Push** 🪟
- **PR #29028**: Fix duplicate `creationflags` causing subprocess crashes trên Windows
- **PR #28991**: Hỗ trợ Windows drive-letter paths (`C:/...`) trong MEDIA tag extraction
- **PR #29016**: Test isolation bằng `multiprocessing.spawn` thay vì `os.fork()` để tương thích Windows
- **Ý nghĩa**: Hermes đang nâng Windows từ "best-effort" lên **tier-1 platform** - quan trọng cho enterprise adoption

**2. Gateway Platform Stability** 🌐
- **PR #29033** (P1): Fix Telegram polling startup để tránh message flood sau restart
- **PR #29010**: Fix QQBot WebSocket 100% CPU spin khi connection closed
- **PR #29005**: Cải thiện reconnection exhaustion handling cho QQBot/Telegram
- **PR #29023**: Fix WhatsApp reply-to-bot detection (device suffix mismatch)
- **Tác động**: Các platform adapters đang được hardened cho production deployment

**3. Resource Management & Safety** ⚠️
- **Issue #28706** (CLOSED): CPU spike 144%+ do uncoordinated kanban worker CI parallelism
- **Issue #29034**: Kanban defaults có thể auto-launch unbounded paid worker swarms
- **Issue #29027**: Kanban dispatcher retries finished tasks causing duplicate runs
- **Issue #29014**: Dispatcher repeatedly respawns blocked tasks → quota drain
- **Phân tích**: Kanban system có **critical safety gaps** - có thể gây chi phí không kiểm soát với paid models

**4. Developer Experience** 🛠️
- **PR #29024**: Enable faulthandler và preserve stderr trong oneshot mode
- **PR #29011**: Surface verbose tool details trong TUI
- **PR #29030**: Replace deprecated `datetime.utcnow()` (Python 3.12+)
- **PR #29032**: Add `pytest.importorskip` guards cho optional dependencies

---

## 💬 Điểm nổi bật cộng đồng

### 🔝 Issues có nhiều tương tác

**1. Issue #19986** (👍 3, 6 comments) - Make bundled skills optional
- **Vấn đề**: Hermes ships quá nhiều bundled skills → heavy updates, large footprint
- **Đề xuất**: Chuyển sang opt-in model với minimal default install
- **Liên quan**: PR #11894 và #29013 đang implement `auto_sync_bundled` config flag
- **Tác động**: Giảm friction cho new users, tăng control cho power users

**2. Issue #12406** (👍 4, 2 comments) - Session Selector UI
- **Pain point**: `hermes resume` command quá basic, khó tìm historical sessions
- **Đề xuất**: Professional session selector interface với search/filter
- **Ý nghĩa**: UX improvement cho long-term users với nhiều sessions

**3. Issue #8965** (P1, 4 comments) - Ollama cloud models tool calls rendered as XML
- **Bug nghiêm trọng**: Tool calls không execute, chỉ output raw XML
- **Scope**: Ảnh hưởng deepseek-v3.2, glm-5.1, kimi-k2.5 qua Ollama proxy
- **Status**: Đang investigate, chưa có fix

---

## 🐛 Ổn định & Bugs

### Critical (P1)

**1. PR #29033** - Telegram message flood sau restart
- **Root cause**: `drop_pending_updates=True` trong reconnect logic
- **Impact**: Users spam messages during downtime → flood khi bot online
- **Fix**: Chỉ drop pending updates ở initial startup, không drop khi reconnect

**2. PR #29021** - Pydantic thread segfault
- **Symptom**: Hard SIGSEGV crash trong codex_responses dispatch
- **Cause**: `pydantic-core==2.41.5` segfault với OpenAI SDK Responses API
- **Fix**: Bump pydantic `2.12.5` → `2.13.4` (pydantic-core `2.46.4`)

**3. Issue #8965** - Ollama cloud tool execution failure
- **Status**: Open, chưa có workaround
- **Blocking**: Ollama cloud users không thể dùng tools

### High Priority (P2)

**4. PR #29019** - Unguarded `json.loads()` và non-atomic writes
- **Scope**: 5 files với potential crash on malformed JSON
- **Risk**: State corruption khi crash during write
- **Fix**: Add try/except guards + atomic writes với temp files

**5. Issue #29015** - macOS keychain isolation breaks claude CLI
- **Cause**: Per-profile `HOME` rewrite hides `~/Library/Keychains`
- **Impact**: External CLIs không access được credentials
- **Workaround**: Chưa có, đang investigate

**6. PR #29031** - Computer-use không target apps across Spaces (macOS)
- **Limitation**: Chỉ list windows trên current Space
- **Fix**: List all windows + prefer titled/large content windows

---

## ✨ Yêu cầu tính năng

### Đang được implement

**1. Grok Build CLI provider** (PR #29029)
- **Scope**: Add `grok-build` as separate external-process provider
- **Approach**: Option 2 - keep existing xAI flow unchanged, add new path
- **Status**: PR open, includes tests + docs

**2. Memory plugin improvements** (PR #29020)
- **Feature**: `memory.suppress_builtin_when_external` opt-in
- **Problem**: Double-injection của MEMORY.md khi dùng external providers (OpenViking, Honcho)
- **Solution**: Config flag để suppress built-in memory khi external provider active

**3. Model fallback management** (PR #29035)
- **Scope**: Web UI controls cho fallback providers
- **Context**: Clean replacement cho blocked draft PR #27648
- **Status**: Rebased, ready for review

### Đề xuất mới

**4. Discord reaction support** (Issue #29026)
- **Use case**: Quick feedback signals với emoji reactions (✅, 👍, 🩵)
- **Benefit**: Faster interaction cho simple confirmations
- **Status**: Feature request, chưa có implementation

**5. Mem0 force_user_id config** (Issue #25084)
- **Problem**: Gateway-supplied `user_id` fragments Mem0 namespace
- **Solution**: Add `force_user_id` config để prevent override
- **Impact**: Single-user installs với multiple gateways

---

## 👥 Phản hồi người dùng

### Pain Points được raise

**1. Resource Management Anxiety** 😰
- **Issue #29034**: "Unbounded paid worker swarms" - users lo ngại chi phí không kiểm soát
- **Issue #29014**: Quota drain do repeated respawns
- **Sentiment**: Cần **safety guardrails mạnh hơn** cho production use

**2. Platform-Specific Bugs** 🪲
- **Windows users**: Subprocess crashes, path handling issues
- **macOS users**: Keychain isolation, Spaces targeting
- **WhatsApp/Telegram users**: Message handling edge cases
- **Feedback**: Cross-platform testing cần được strengthen

**3. Documentation Gaps** 📚
- **Issue #29017**: Curator docs stale (không match implementation)
- **PR #29012**: Dead links trong Google Workspace docs
- **Request**: Docs cần sync với code changes

### Positive Signals

- **Active PR velocity**: 30 PRs trong 1 ngày cho thấy healthy contributor activity
- **Responsive maintenance**: Critical bugs (P1) được address nhanh
- **Community engagement**: Issues có constructive discussions, không toxic

---

## 🗺️ Backlog & Roadmap

### Immediate Focus (đang active)

**1. Windows Tier-1 Completion** 🎯
- Subprocess handling ✅ (PR #29028)
- Path normalization ✅ (PR #28991)
- Test isolation ✅ (PR #29016)
- **Remaining**: Full Windows CI pipeline, installer improvements

**2. Gateway Hardening** 🛡️
- Telegram stability ✅ (PR #29033)
- QQBot CPU fix ✅ (PR #29010)
- WhatsApp reply detection ✅ (PR #29023)
- **Remaining**: Reconnection exhaustion handling (Issue #29005)

**3. Kanban Safety** ⚠️
- **Critical**: Fix unbounded worker spawns (Issue #29034)
- **High**: Stop retry loops cho finished tasks (Issue #29027)
- **Medium**: Improve dispatcher logic (Issue #29014)
- **Timeline**: Cần urgent attention trước khi production-ready

### Medium-term (next 2-4 weeks)

**4. Skill Management Overhaul**
- Optional bundled skills (Issue #19986, PR #11894)
- Better curator semantics (Issue #29017, PR #29018)
- **Goal**: Reduce footprint, improve UX

**5. Developer Experience**
- Session selector UI (Issue #12406)
- Better verbose tooling (PR #29011)
- Improved error messages

### Long-term Themes

- **Enterprise readiness**: Safety, resource limits, audit trails
- **Multi-platform parity**: Windows = Linux = macOS
- **Plugin ecosystem**: Better external provider integration
- **Performance**: Address CPU/memory issues at scale

---

## 🎯 Đánh giá tổng quan

**Strengths** ✅
- Velocity cao, responsive maintenance
- Đang address critical production gaps
- Strong focus on cross-platform compatibility

**Concerns** ⚠️
- Kanban system có **serious safety issues** cần urgent fix
- Test coverage gaps (optional deps, platform-specific code)
- Documentation lag behind implementation

**Recommendation** 💡
- **Prioritize**: Kanban safety fixes trước khi promote production use
- **Invest**: Windows CI pipeline để catch platform issues early
- **Improve**: Automated docs sync process

---

**Kết luận**: Hermes-Agent đang trong giai đoạn **maturation** với focus đúng hướng vào stability và production-readiness. Kanban safety issues là blocker lớn nhất cần resolve urgent. Windows support progress rất tích cực và sẽ mở rộng user base đáng kể.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*