# Bản tin Hệ sinh thái OpenClaw 2026-06-23

> Issues: 37 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-06-23 02:00 UTC

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

# Báo cáo phân tích dự án OpenClaw - Ngày 23/06/2026

## 1. 📋 Tóm tắt hôm nay

Ngày 23/06 là ngày hoạt động **cực kỳ sôi nổi** với 13 issue mới được tạo và 1 beta release (v2026.6.10-beta.2) vừa phát hành ngày 22/06. Cộng đồng tập trung xử lý các vấn đề nghiêm trọng về **message delivery, authentication, và memory leaks**. Đặc biệt có nhiều báo cáo về **Cron job failures, OAuth provider issues, và embedded agent memory không được giải phóng** - những vấn đề ảnh hưởng trực tiếp đến trải nghiệm người dùng production.

---

## 2. 🚀 Releases

### **v2026.6.10-beta.2** (Phát hành: 22/06/2026)

#### Tính năng nổi bật:
- ✨ **Automatic fast mode for talks**: Tự động chuyển sang fast mode cho các turn hội thoại ngắn, tối ưu trải nghiệm real-time
- 🎯 **Cải thiện model routing**: 
  - Zai model synthesis ổn định hơn
  - GLM overload failover
  - Native reasoning-level selection tuân thủ model catalog chặt chẽ hơn

#### Ý nghĩa:
Release này tập trung vào **performance và reliability** - hai yếu tố quan trọng cho một AI agent framework production-ready. Tính năng fast mode tự động cho thấy OpenClaw đang tiến gần hơn đến trải nghiệm "tự nhiên" trong đối thoại.

---

## 3. 📊 Tiến độ dự án

### Issues quan trọng được cập nhật hôm nay:

#### 🔴 **Priority 1 - Critical Issues:**

1. **#92460** - Isolated cron completion drops delivery channel ⭐ **9 bình luận**
   - Cron jobs thất bại khi announce completion qua controller return
   - Ảnh hưởng: message-loss, session-state
   - Đánh giá: 🐚 platinum hermit (mức độ nghiêm trọng cao nhất)

2. **#94432** - OpenAI/Codex OAuth fails với Cloudflare 403 ⭐ **4 bình luận**
   - OAuth login thành công nhưng model calls fail do Cloudflare challenge
   - Ảnh hưởng: auth-provider, message-loss
   - **Blocking cho nhiều users dùng Codex models**

3. **#90288** - Non-Anthropic models output plain text tool calls ⭐ **4 bình luận**
   - MiniMax, DeepSeek models xuất `[tool: exec]` thay vì structured tool_use
   - Compatibility layer bị broken

4. **#87058** - Android node advertises zero commands ⭐ **3 bình luận**
   - Android paired node connects nhưng không expose capabilities
   - Security + session-state impact

#### 🟡 **Priority 2 - Important Issues:**

5. **#95724** - Memory indexing by agent ID instead of workspace ⭐ **5 bình luận, NEW**
   - Multiple agents cùng workspace tạo duplicate vector stores
   - **Performance và storage overhead đáng kể**

6. **#94147** - macOS CLLocationManager rebuild loop ⭐ **4 bình luận**
   - TCC permission requests bị spam (~45 lần/10s)
   - **Battery drain và system pollution**

### Pull Requests nổi bật:

#### 🔧 **Performance & Optimization:**

- **#95697** - Reduce hot-path linear scans (XL, maintainer review)
  - Loại bỏ O(n²) scans, giảm redundant I/O
  - **Impact lớn lên performance với large datasets**

- **#95916** - Improve node:sqlite unavailable guidance (NEW)
  - Better error messaging cho memory_search failures

#### 🛡️ **Security Fixes:**

- **#95895** - GEMINI_API_KEY plaintext in systemd unit (NEW)
  - **Critical security issue**: API key được ghi trực tiếp vào service file
  - Cần urgent fix

#### 🐛 **Bug Fixes:**

- **#79811** - Fix cron delivered status for empty receipts
  - Status: Ready for maintainer look
  - Prevents false "delivered" status

- **#80392** - Disable startup trace on failure
  - Cleanup `monitorEventLoopDelay` properly

### Xu hướng phát triển:

📈 **Tăng focus vào production readiness:**
- Nhiều fix về error handling, timeouts, và resource cleanup
- Security hardening (credential management, permission handling)
- Performance optimization (memory indexing, hot-path scans)

🔄 **Cross-platform challenges:**
- Android node issues (#87058)
- macOS permission loops (#94147)
- systemd secret management (#95895)

---

## 4. 💬 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

1. **#92460** (9 comments) - Cron completion announcer
   - Ongoing discussion về fix approach
   - Liên quan đến architecture: completion announcer vs message queue

2. **#95724** (5 comments, NEW) - Memory indexing duplication
   - **Pain point thực sự**: users với multi-agent setups bị hit hard
   - Đề xuất: index by workspace thay vì agent ID

3. **#94432** (4 comments) - Codex OAuth Cloudflare issue
   - Users báo cáo consistent failures
   - Possibly related to Cloudflare bot detection changes

### Vấn đề người dùng quan tâm nhất:

🎯 **Reliability & Stability:**
- Cron jobs failing silently (#92460, #95907)
- Message delivery failures across channels
- Memory leaks trong embedded runs (#95915)

🔐 **Authentication & Security:**
- OAuth provider failures (#94432, #95612)
- Plaintext secrets in config (#95895)
- Device pairing loops (#95882)

⚡ **Performance:**
- Memory duplication (#95724)
- Permission spam loops (#94147)
- Embedded run resource leaks (#95915)

---

## 5. 🔧 Ổn định & Bugs

### Bugs nghiêm trọng đang được xử lý:

#### 🚨 **Critical - Production Impact:**

1. **#95915** (NEW) - Heap not released on embedded run abort
   - **Memory leak nghiêm trọng**: `released=0` sau abort
   - Yêu cầu periodic forced restarts
   - **100% reproducible**

2. **#95907** (NEW) - Cron agent loop continues after "ok" status
   - Token consumption không dừng sau completion
   - **Cost impact trực tiếp**

3. **#95904** (NEW) - Non-Codex fallback models fail tool calls
   - Internal_error với trivial tool calls
   - Breaks fallback chain

#### ⚠️ **High - Functional Issues:**

4. **#95891** (NEW) - MiniMax-M3 thinking content leaks to channel
   - Internal reasoning xuất hiện trong user messages
   - **UX degradation**

5. **#95878** - Telegram long-message truncation regression
   - 5 truncations in single session
   - **Still present in 2026.6.9** despite previous fixes

6. **#95866** - Gateway restart discards in-flight replies
   - 0ms drain timeout → message loss
   - **Data integrity issue**

### Pattern nhận diện:

🔁 **Regression issues**: Telegram truncation (#95878), Cron behaviors
🧵 **Concurrency problems**: Message delivery races, session locks
💾 **Resource management**: Memory leaks, heap not released, permission loops

---

## 6. ✨ Yêu cầu tính năng

### Feature requests được đề xuất:

#### 🎯 **High-value enhancements:**

1. **#95724** - Index memory by workspace not agent
   - **Business value**: Giảm storage overhead đáng kể
   - Improves multi-agent workflows

2. **#29372** - Per-agent subagents.workspace config
   - Cho phép workspace isolation per parent agent
   - **Better multi-tenancy support**

3. **#92666** - Channel-aware device scope upgrade
   - Send approval cards back to triggering channel
   - **Smoother UX cho pairing flows**

4. **#94153** - Persist subagent announcements to queue
   - Thay vì direct dispatch → more reliable delivery
   - Prevents deadlocks (#90178)

#### 🛠️ **Developer experience:**

5. **#95853** (CLOSED) - Audio playback icon in WebChat
   - TTS integration cho accessibility
   - One-click listen experience

6. **#87253** - Subagent workdir isolation built-in
   - Auto-inject isolation → prevent data overwrites
   - Safety by default

### Trend:

📦 **Multi-agent orchestration**: Workspace management, subagent isolation
🔊 **Channel integration**: Better delivery, approval flows, media handling
♿ **Accessibility**: TTS, better error messages

---

## 7. 👥 Phản hồi người dùng

### Sentiment analysis từ comments:

#### 😤 **Frustrations:**

- **"every 4 seconds hitting llm limits"** (#95882) - Device pairing loop gây rate limiting
- **"permanent deadlock"** (#90178) - Subagent yield không được wake
- **"invisible to the skill"** (#87253) - Workdir conflicts không có safeguards
- **"silently truncated"** (#95878) - Message loss không có warning

#### 💡 **Constructive feedback:**

- Users đang actively propose solutions (workspace indexing, queue-based delivery)
- Detailed reproduction steps cho complex issues
- Cross-referencing related issues → community debugging

#### 🎉 **Positive signals:**

- Release frequency cao (beta releases liên tục)
- Maintainers responsive với labels và triage
- Feature requests được xem xét nghiêm túc

### Pain points chính:

1. **Silent failures**: Cron jobs, message delivery, permissions
2. **Resource leaks**: Memory, connections, permission loops
3. **Auth complexity**: OAuth flows, device pairing, token management
4. **Channel quirks**: Telegram truncation, Discord mentions, Slack Socket Mode

---

## 8. 📅 Backlog & Roadmap

### Từ các linked PRs và issue patterns:

#### 🔜 **Short-term (đang được xử lý):**

- **Memory management overhaul**: 
  - Workspace-based indexing (#95724)
  - Heap release on abort (#95915)
  - Resource cleanup improvements

- **Cron stability**:
  - Completion announcer fixes (#92460)
  - Queue-based delivery (#94153)
  - Token consumption control (#95907)

- **Auth provider reliability**:
  - Cloudflare bypass cho Codex (#94432)
  - CLI device pairing fix (#95612, #95882)

#### 🎯 **Medium-term (feature development):**

- **Multi-agent orchestration**:
  - Subagent workspace isolation (#29372, #87253)
  - Better subagent completion handling

- **Channel enhancements**:
  - Telegram message splitting fix (#95878)
  - Discord implicit reply policy (#80235)
  - Channel-aware approvals (#92666)

- **Performance optimization**:
  - Hot-path scan reduction (#95697)
  - MCP runtime scoping (#79882)

#### 🔮 **Long-term (architectural):**

- **Talk video support**: Plugin SDK seam (#78886)
- **Plugin ecosystem maturity**: ACP spawn capabilities (#80008)
- **Cross-platform parity**: Android node capabilities (#87058)

### Insights:

🏗️ **Architecture evolution**: Message queue > direct dispatch, workspace-centric indexing
🔐 **Security hardening**: Credential management, permission boundaries
⚡ **Performance at scale**: Linear scan elimination, resource pooling

---

## 📈 Kết luận

OpenClaw đang trải qua giai đoạn **production hardening** điển hình. Với **37 open issues** và **500 PRs** (30 được highlight), dự án có velocity cao nhưng đang gặp các **growing pains** về stability, security, và cross-platform compatibility.

**Điểm mạnh:**
- Release cadence nhanh (beta.2 vừa ra)
- Cộng đồng active với bug reports chi tiết
- Maintainers responsive với triage và labeling

**Điểm cần cải thiện:**
- Critical bugs tồn đọng (memory leaks, auth failures)
- Regressions xuất hiện (Telegram truncation)
- Security issues cần urgent attention (plaintext secrets)

**Outlook**: Dự án đang đi đúng hướng với focus vào reliability và performance, nhưng cần ưu tiên xử lý các critical issues trước khi thêm features mới. 🎯

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - Ngày 23/06/2026

## 1. 🌐 Tổng quan Hệ sinh thái

Hệ sinh thái AI agent framework đang trong giai đoạn **maturation và consolidation** với các dự án lớn chuyển từ "feature race" sang "production hardening". Điểm đánh dấu chính:

- **Scale diversity**: Từ embedded systems (PicoClaw) đến enterprise platforms (OpenClaw, IronClaw)
- **Convergence patterns**: Tất cả projects đều focus vào **multi-channel integration, tool orchestration, và memory management**
- **Stability crisis**: Gần như mọi dự án đều gặp critical bugs về message delivery, resource leaks, hoặc platform compatibility
- **Security awakening**: Tăng đột biến về security-focused PRs (sandbox isolation, secret management, SSRF guards)

---

## 2. 📈 Bảng So sánh Hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động nổi bật | Community Health |
|-------|--------|-----|----------|-------------------|------------------|
| **OpenClaw** | 37 | 500 (30 hot) | 1 (beta.2) | 🔴 13 issues mới/ngày, critical bugs tồn đọng | ⚠️ High velocity, regression risks |
| **NanoBot** | 4 | 27 (14 merged) | 1 (v0.2.2) | ✅ 140 PRs merged trong cycle, 21 contributors mới | ✨ Excellent momentum |
| **Zeroclaw** | 5 | 50 (30 active) | 0 | 🔒 Security hardening sprint, plugin isolation | 🔄 Careful review, slow merge |
| **PicoClaw** | 3 | 18 | 0 | 🛡️ 2 security PRs, Android automation | 🌱 Steady, balanced growth |
| **NanoClaw** | 0 | 6 | 0 | 📧 Email integration (3 months review) | 🐢 Small team, long review cycles |
| **IronClaw** | 18 | 23 | 0 | 🚨 Critical regression (#5139), performance sprint | ⚡ Fast iteration, instability |
| **LobsterAI** | 5 | 14 | 0 | 🎨 Plan Mode launch, OpenClaw plugin expansion | 🧹 Technical debt cleanup phase |
| **CoPaw** | 8 | 50 (30 active) | 0 | 📱 Mobile responsiveness campaign (10+ PRs) | 💪 Strong first-time contributor pipeline |
| **Hermes-Agent** | 12 | 50 (30 new) | 0 | 🪟 Windows compatibility sprint, Discord fixes | 🔥 Extremely active, cross-platform focus |

### 🏆 Velocity Champions:
1. **OpenClaw** - 500 total PRs, 13 issues/day
2. **Hermes-Agent** - 30 PRs/day burst
3. **NanoBot** - 140 PRs merged in single release

### 🛡️ Stability Leaders:
1. **NanoBot** - Clean release with comprehensive testing
2. **PicoClaw** - Balanced security + features
3. **Zeroclaw** - Thorough review discipline

---

## 3. 🎯 Vị thế của OpenClaw

### Vai trò trong Hệ sinh thái:

**OpenClaw = "The Foundation Framework"**

- **Upstream influence**: LobsterAI explicitly tích hợp OpenClaw plugins, NanoBot shares architectural patterns
- **Scale target**: Enterprise-grade với 37 open issues và 500 PRs cho thấy đây là **production workhorse**
- **Pain points = Industry pain points**: 
  - Message delivery failures → multi-channel orchestration khó
  - Memory leaks → long-running agent stability
  - OAuth provider issues → authentication complexity

### Điểm Mạnh:

✅ **Release velocity cao** - Beta releases liên tục  
✅ **Feature breadth** - Đa dạng tính năng nhất (cron, MCP, multi-model, approval workflows)  
✅ **Community size** - Issues có nhiều comments nhất (9 bình luận trên #92460)  
✅ **Real production usage** - Bugs phản ánh actual user workloads  

### Điểm Yếu:

⚠️ **Regression risks** - Telegram truncation regression (#95878) tái phát  
⚠️ **Critical bugs tồn đọng** - Memory leaks (#95915), cron failures (#92460)  
⚠️ **Security gaps** - Plaintext secrets (#95895) discovered late  
⚠️ **Cross-platform fragility** - Android, macOS, systemd issues  

### So với Competitors:

| Aspect | OpenClaw | NanoBot | Hermes-Agent | IronClaw |
|--------|----------|---------|--------------|----------|
| **Maturity** | Production | Stabilizing | Beta | Alpha |
| **Scale** | Enterprise | SMB | Individual | Experimental |
| **Stability** | ⚠️ Regressions | ✅ Solid | ⚠️ Volatile | 🔴 Unstable |
| **Features** | 🌟🌟🌟🌟🌟 | 🌟🌟🌟🌟 | 🌟🌟🌟🌟🌟 | 🌟🌟🌟 |
| **Community** | 🌟🌟🌟🌟 | 🌟🌟🌟🌟🌟 | 🌟🌟🌟🌟 | 🌟🌟🌟 |

---

## 4. 🔧 Hướng Kỹ thuật Chung

### Pattern 1: **Multi-Channel Integration Race**

Tất cả projects đang expand communication channels:

| Project | Channels | Status |
|---------|----------|--------|
| NanoBot | Email (IMAP/SMTP), Telegram | Email in review, Telegram merged |
| PicoClaw | Discord, Telegram, DingTalk | Stable |
| Hermes-Agent | Discord, Telegram, WeChat, Feishu | Active development |
| CoPaw | Telegram, DingTalk, Lark, WeCom | Native support |

**Insight**: **Telegram** là universal target (6/9 projects), **WeChat/Feishu** là China market differentiator.

### Pattern 2: **MCP (Model Context Protocol) Adoption**

- **OpenClaw**: Native MCP với bugs (#95915 - heap leaks)
- **Zeroclaw**: Deep MCP integration với #8193 (tools not showing)
- **NanoClaw**: Email as MCP toolset (#1235)
- **IronClaw**: MCP Bridge Server (#1408 - promise handling)

**Convergence**: MCP đang trở thành **standard** cho tool orchestration, nhưng implementations còn buggy.

### Pattern 3: **Memory Management Evolution**

Hai approaches đang compete:

**A. Compression-based** (Traditional):
- OpenClaw, Hermes-Agent, PicoClaw
- Summarize old messages, keep recent context

**B. Retrieval-based** (New Wave):
- **CoPaw** #5321: Scroll context với SQLite + full-text search
- **Zeroclaw** #8196: Whole-turn trim với RPC event visibility
- **NanoBot** #95724: Workspace-based indexing

**Trend**: Industry moving towards **hybrid retrieval** - full history + semantic search thay vì lossy compression.

### Pattern 4: **Security Hardening Sprint**

Mọi dự án đều có security PRs trong 24h:

- **OpenClaw** #95895: Plaintext API keys in systemd
- **Zeroclaw** #8137, #8128: Plugin isolation + SSRF guards
- **PicoClaw** #3160, #3161: CSRF protection + sandbox deny rules
- **NanoBot** #4454: Gateway shutdown edge cases
- **IronClaw** #1407: Request body size limits

**Root cause**: Production deployments expose security assumptions không hold true ở scale.

### Pattern 5: **Cross-Platform Pain**

Windows compatibility là **universal pain point**:

- **Hermes-Agent**: 3 PRs về Windows encoding/path bugs
- **OpenClaw**: macOS CLLocationManager spam (#94147)
- **Zeroclaw**: Windows WASM auth errors (#4969)
- **IronClaw**: Android node capability issues (#87058)

**Lesson**: Desktop agents cần **platform-specific testing** - write-once-run-anywhere không còn đủ.

---

## 5. 🎨 Điểm Khác biệt

### Architecture Philosophy:

**Monolithic vs. Modular:**

| Approach | Projects | Trade-off |
|----------|----------|-----------|
| **Monolithic** | OpenClaw, Hermes-Agent | Fast iteration, tight coupling |
| **Modular** | Zeroclaw (decomposing #5137), IronClaw (Reborn refactor) | Clean boundaries, slower velocity |
| **Hybrid** | NanoBot, CoPaw | Balance pragmatism |

**Observation**: Projects với >1 năm tuổi đang **refactor towards modularity** (Zeroclaw god-crate, IronClaw Reborn).

### Feature Strategy:

**Breadth vs. Depth:**

- **OpenClaw, Hermes-Agent**: Wide feature surface → more bugs, broader appeal
- **PicoClaw, NanoClaw**: Narrow focus → stable, niche
- **CoPaw**: Mobile-first UX focus → UI polish priority
- **LobsterAI**: Plan Mode differentiator → strategic feature bets

### Community Model:

**Corporate vs. Open:**

| Model | Projects | Characteristics |
|-------|----------|-----------------|
| **Corporate-led** | LobsterAI (Netease), CoPaw (AgentScope) | Internal QA, slower external contributions |
| **Open-first** | OpenClaw, Hermes-Agent | High external PRs, diverse contributors |
| **Hybrid** | NanoBot (21 new contributors), Zeroclaw | Growing external participation |

**Trend**: Corporate projects đang **opening up** (LobsterAI accept external PRs, CoPaw có first-time contributors).

### Target Market:

**Individual → SMB → Enterprise:**

```
PicoClaw, NanoClaw → Hermes-Agent, NanoBot → OpenClaw, IronClaw, LobsterAI
   (Hobbyist)            (Power Users)           (Enterprise)
```

**Market gaps**:
- **Missing**: True consumer-friendly agent (non-technical users)
- **Oversaturated**: Developer-focused CLI agents
- **Emerging**: Mobile-first agents (CoPaw mobile campaign)

---

## 6. 🌱 Mức độ Trưởng thành Cộng đồng

### Tier 1: Mature Communities ⭐⭐⭐⭐⭐

**NanoBot**:
- ✅ 21 new contributors in single cycle
- ✅ Fast PR review (<24h for quality PRs)
- ✅ Comprehensive testing (146 tests)
- ✅ Documentation updates với features

**OpenClaw**:
- ✅ 9 comments on critical issue (#92460)
- ✅ Cross-referencing between issues (community debugging)
- ✅ Detailed reproduction steps
- ⚠️ Regression issues → testing gaps

### Tier 2: Growing Communities ⭐⭐⭐⭐

**Hermes-Agent**:
- ✅ 30 PRs/day burst = high contributor activity
- ✅ Multi-platform focus = diverse user base
- ⚠️ 50+ issues open = potential maintainer overload

**CoPaw**:
- ✅ 10 PRs from first-time contributors (@yaozy2020, @niceIrene)
- ✅ Responsive maintainers (mobile PRs merged quickly)
- ⚠️ Zero reactions on most items = engagement could be higher

**Zeroclaw**:
- ✅ Thorough code review (slow merge rate = quality focus)
- ✅ @singlerider contributes 40%+ PRs
- ⚠️ Stale PRs accumulating (6 dependency updates)

### Tier 3: Small but Stable ⭐⭐⭐

**PicoClaw**:
- ✅ Balanced internal + community contributions
- ✅ Clear prioritization (security PRs fast-tracked)
- ⚠️ Low issue activity (good or lack of users?)

**IronClaw**:
- ✅ Active dogfooding (#5119 findings)
- ✅ Barcelona Hackathon fork (@elliotBraem)
- ⚠️ Regression blocking (#5139) → testing needs improvement

**LobsterAI**:
- ✅ Stale PR cleanup shows active maintenance
- ✅ External contributions accepted
- ⚠️ Zero reactions across board = low public visibility

### Tier 4: Early Stage ⭐⭐

**NanoClaw**:
- ⚠️ 3-month review cycles (Email PR #1235)
- ⚠️ No issue activity = small user base or internal-only
- ✅ Clean backlog management

---

## 7. 🔮 Tín hiệu Xu hướng

### Trend 1: **Consolidation Wave Incoming** 🌊

**Signals**:
- OpenClaw có regressions, NanoBot release ổn định → users sẽ migrate sang stable platforms
- Zeroclaw, IronClaw đang refactor → chuẩn bị cho growth phase
- LobsterAI cleanup stale PRs → preparing for next phase

**Prediction**: **Q3-Q4 2026 sẽ có consolidation** - 2-3 frameworks sẽ nổi lên dominant, smaller projects sẽ niche hoặc sunset.

### Trend 2: **Mobile-First Agents** 📱

**Signals**:
- CoPaw dedicated mobile campaign (10+ PRs)
- PicoClaw Android automation (#3157)
- Hermes-Agent macOS/Windows parity focus

**Prediction**: **Mobile agents sẽ là next battleground**. Desktop-first projects sẽ phải adapt hoặc lose to mobile-native competitors.

### Trend 3: **Security Becomes Table Stakes** 🔒

**Signals**:
- Universal security PRs (8/9 projects)
- Sandbox isolation (Zeroclaw, PicoClaw)
- Secret management improvements across board

**Prediction**: **2026 Q4 sẽ có major security incident** trong AI agent space → industry-wide hardening sprint. Projects chưa có security model sẽ struggle.

### Trend 4: **Retrieval > Compression for Memory** 🧠

**Signals**:
- CoPaw scroll context (#5321)
- Zeroclaw whole-turn trim (#8196)
- NanoBot workspace indexing (#95724)

**Prediction**: **Compression-based context sẽ deprecated** trong 6-12 tháng. Semantic search + full history storage sẽ become standard.

### Trend 5: **MCP Will Fragment** 🔌

**Signals**:
- Multiple MCP implementations với incompatible quirks
- Bugs across all MCP-integrated projects
- No clear reference implementation

**Prediction**: **MCP sẽ cần formal spec revision** hoặc risk fragmentation. Có thể xuất hiện "MCP 2.0" standardization effort.

### Trend 6: **Enterprise Features Trickle Down** 💼

**Signals**:
- Plan Mode (LobsterAI) = explainability
- Approval workflows (OpenClaw, NanoBot)
- Audit trails (NanoBot history segmentation)

**Prediction**: **Consumer agents sẽ adopt enterprise patterns** - explainability và control sẽ become expected, không chỉ enterprise-only features.

### Trend 7: **China Market Divergence** 🇨🇳

**Signals**:
- CoPaw, LobsterAI focus on WeChat/DingTalk/Feishu
- Western projects add Telegram/Discord
- Different regulatory concerns (secret management patterns)

**Prediction**: **Hệ sinh thái sẽ split** - China-focused vs. global projects với minimal overlap. Cross-market players (nếu có) sẽ có competitive moat.

---

## 🎯 Kết luận Chiến lược

### For OpenClaw:

**Immediate (1-2 tuần)**:
1. 🔴 **Triage critical bugs** - Memory leaks, cron failures block production use
2. 🛡️ **Security audit** - Plaintext secrets issue (#95895) là symptom của broader problem
3. ✅ **Regression prevention** - CI cần catch Telegram truncation types

**Short-term (1-3 tháng)**:
1. 📱 **Mobile strategy** - CoPaw đang lead, cần respond hoặc risk losing mobile users
2. 🧠 **Memory architecture review** - Evaluate retrieval-based approaches như CoPaw
3. 🔒 **Security hardening sprint** - Learn từ Zeroclaw's plugin isolation approach

**Long-term (6-12 tháng)**:
1. 🏗️ **Architecture refactor** - Consider Zeroclaw-style modularization để reduce coupling
2. 🌐 **International expansion** - China market hoặc double-down on global?
3. 🤝 **Ecosystem play** - Formalize OpenClaw as "platform" với clear plugin/extension model

### For the Ecosystem:

**Opportunities**:
- **Missing consumer play**: Không ai target non-technical users effectively
- **Mobile gap**: CoPaw leading nhưng chưa dominant
- **Enterprise consolidation**: Multiple players, chưa có clear winner

**Threats**:
- **Security incident waiting to happen**: Multiple projects có security gaps
- **MCP fragmentation risk**: Lack of standard reference implementation
- **Sustainability concerns**: Nhiều projects với <5 active contributors

**Wildcards**:
- OpenAI/Anthropic có thể enter market với native agents
- Regulatory changes (EU AI Act, China regulations) có thể reshape landscape
- Breakthrough model capabilities có thể obsolete current architectures

---

**Đánh giá tổng thể**: Hệ sinh thái AI agent đang healthy nhưng **immature**. 2026 Q3-Q4 sẽ là **critical consolidation period** - projects cần choose giữa niche excellence hoặc platform ambition. OpenClaw có foundation strength nhưng cần address stability và security urgently để maintain leadership position.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 Báo cáo Phân tích Dự án NanoBot - Ngày 2026-06-23

## 1. 🎯 Tóm tắt hôm nay

Ngày 23/06 đánh dấu cột mốc quan trọng với **phiên bản v0.2.2** chính thức phát hành sau quá trình merge 140 PRs và đón nhận 21 contributor mới. Đội ngũ tập trung vào việc **củng cố độ ổn định hệ thống**, đặc biệt là cải thiện khả năng xử lý shutdown của gateway, sửa các lỗi race condition trong WebUI fork, và nâng ngưỡng context window mặc định lên 200K tokens. Hoạt động phát triển vẫn duy trì tốc độ cao với 27 PRs và 4 issues được xử lý trong ngày.

---

## 2. 🚀 Releases: v0.2.2 - Bản cập nhật tập trung vào độ bền

### 🔑 Điểm nhấn chính:

**Độ bền & ổn định (Durability)**
- ✅ **Segmented transcripts**: Lịch sử hội thoại không còn nằm trong một file duy nhất dễ vỡ, giúp sessions dài không bị mất dữ liệu
- ✅ **Fork reliability**: Cải thiện khả năng bảo toàn replies trong forked chats
- ✅ **Gateway shutdown**: Xử lý tắt gateway mượt mà hơn, giảm thiểu lỗi khi dừng service
- ✅ **Streaming stability**: Active turns scroll và replay đáng tin cậy hơn

**Trải nghiệm người dùng**
- 🎨 Startup paths ít bị block hơn
- 🛡️ Xử lý tốt hơn với stale providers, slow routes, broken config files, malformed history, và stream stalls

**Con số ấn tượng**: 140 PRs merged, 21 contributors mới - cho thấy sức sống mạnh mẽ của cộng đồng

### 💡 Ý nghĩa:
Phiên bản này đánh dấu sự trưởng thành của NanoBot từ một công cụ thử nghiệm sang một nền tảng production-ready có thể xử lý các use case phức tạp và kéo dài.

---

## 3. 📈 Tiến độ dự án

### 🔥 PRs nổi bật đã merge:

**Infrastructure & Stability (5 PRs merged trong ngày)**
- **#4454**: Ổn định shutdown gateway và WebUI fork replay - sửa root cause của SIGINT/SIGTERM handling
- **#4456**: Tolerate cancelled channel tasks - xử lý Python 3.11 CancelledError properly
- **#4450**: Close MCP stdio transports từ đúng agent task - sửa AnyIO cancel-scope errors
- **#4448**: Nâng default context window lên **200K tokens** (từ 65K) - phù hợp với LLMs hiện đại
- **#4445**: Chuẩn bị release v0.2.2 với version bump và changelog

**WebUI Improvements (4 PRs merged)**
- **#4451**: Ổn định sent turn layout và dev reloads
- **#4453**: Follow active turn output sau khi send
- **#4455**: Preserve fork replies trong history refresh
- **#4398**: Tránh slow settings route refreshes bằng cách cache Codex OAuth

**Feature Enhancements (3 PRs merged)**
- **#4395**: Cải thiện onboard wizard với Quick Start flow cho beginners
- **#4206**: DingTalk channel thêm `group_allow_from` allowlist
- **#1854**: Background gateway controls (`--background`, `status`, `logs`, `restart`, `stop`)

### 🔄 PRs đang active (13 PRs):

**Channel Integration (2 PRs)**
- **#4459**: Mattermost channel support - tính năng hot với real-time WebSocket và streaming responses
- **#4446**: DingTalk cải tiến - gate private chats và mention sender trong group replies

**Bug Fixes & Hardening (6 PRs)**
- **#4447**: Gateway lifecycle edge cases handling
- **#4443**: Guard duplicate tool_use IDs - sửa session bricking bug
- **#4441**: Force-close streamable_http generator trên reconnect failure
- **#4436**: Gate MCP resources/prompts bằng enabledTools
- **#4433**: Normalize sender IDs to str trong pairing store
- **#4397**: Insert user-attention hint cho mid-turn interruptions

**New Features (3 PRs)**
- **#4458**: PWA support cho WebUI - cài đặt lên mobile home screen
- **#4439**: Read-only `search_history` tool để recall memory
- **#4291**: Subagents với configurable model presets

**Infrastructure (2 PRs)**
- **#4460**: Bump to Node 24
- **#4452**: Enforce MCP enabledTools cho resources và prompts

### 📊 Xu hướng phát triển:

1. **Stability-first approach**: 50%+ PRs tập trung vào bug fixes và edge cases
2. **Multi-channel expansion**: Đang tích cực mở rộng sang Mattermost, cải thiện DingTalk
3. **Enterprise readiness**: Background gateway, service controls, allowlist features
4. **Mobile-first**: PWA support cho trải nghiệm native-like trên mobile

---

## 4. 🌟 Điểm nổi bật cộng đồng

### 📌 Issues đáng chú ý:

**#4413 - Telegram Bot API 10.1 rich messages** (2 comments)
- Request hỗ trợ format rich messages mới của Telegram
- Chưa có PR implement, đang ở giai đoạn discussion
- Quan trọng cho user experience với Telegram channel

**#4376 - User friendly wizard** (1 👍, CLOSED)
- Yêu cầu cải thiện `nanobot onboard --wizard` cho non-technical users
- ✅ Đã được giải quyết qua PR #4395
- Phản ánh nhu cầu hạ thấp technical barrier to entry

**#1461 - Unified daemon gateway** (4 comments, CLOSED)
- Feature request về daemon gateway layer
- ✅ Đã implement qua PR #1854
- Cho thấy project đang đáp ứng tốt enterprise use cases

### 🔝 PRs có tương tác:

Hầu hết PRs có lượng comment undefined (chưa được tải), nhưng nhìn vào labels và tốc độ merge:
- **Infrastructure PRs được ưu tiên cao**: merge trong vòng vài giờ
- **Feature PRs trải qua review kỹ hơn**: thời gian mở lâu hơn

---

## 5. 🐛 Ổn định & Bugs

### ✅ Bugs đã sửa (merged hôm nay):

**Critical Stability Issues:**
- **Gateway shutdown crashes** (#4454, #4456) - gateway không terminate đúng cách khi nhận SIGINT/SIGTERM
- **Fork reply disappearing** (#4455) - race condition khiến assistant replies biến mất sau history refresh
- **MCP transport errors** (#4450) - AnyIO cancel-scope errors khi close stdio transports

**User Experience Bugs:**
- **WebUI scroll behavior** (#4453, #4451) - không follow streaming output, sent messages không anchor đúng
- **Slow settings load** (#4398) - OAuth token refresh block route response

### 🚧 Bugs đang xử lý:

**#4443 - Duplicate tool_use IDs** (PR open)
- Streaming Anthropic providers đôi khi yield duplicate tool_use blocks
- Gây session brick với HTTP 400 errors
- Đang implement deduplication logic

**#4441 - MCP reconnection crash** (PR open)
- Runtime error khi MCP server terminate và reconnect
- Liên quan đến anyio task group lifecycle
- Critical cho long-running sessions

**#4397 - Mid-turn user interruption** (PR open, marked invalid)
- LLM ignore user messages khi đang trong tool chain
- Đang thử nghiệm inject hint message approach
- Cần validation về effectiveness

---

## 6. 💡 Yêu cầu tính năng

### 🆕 Tính năng mới đang develop:

**Channel Integrations:**
- **Mattermost support** (#4459) - real-time WebSocket, streaming responses
- **DingTalk enhancements** (#4446) - private chat gating, sender mentions

**Developer Experience:**
- **PWA support** (#4458) - install WebUI lên mobile home screen như native app
- **Search history tool** (#4439) - LLM có thể recall past conversations
- **Subagent model presets** (#4291) - spawn subagents với different models

**Infrastructure:**
- **Node 24 upgrade** (#4460) - leverage latest Node.js features
- **MCP resource controls** (#4452, #4436) - granular control over MCP capabilities

### 📋 Feature requests chưa implement:

**#4413 - Telegram rich messages**
- Hỗ trợ Telegram Bot API 10.1 rich format
- Convert markdown sang Telegram format automatically
- Quan trọng cho Telegram channel users

### 🎯 Priority insights:

1. **Multi-platform messaging** là priority cao - Mattermost, DingTalk, Telegram đều active
2. **Mobile experience** đang được invest - PWA support
3. **Developer tooling** quan trọng - history search, model flexibility
4. **Enterprise features** steady growth - access controls, service management

---

## 7. 💬 Phản hồi người dùng

### 😊 Positive feedback:

**Context window upgrade** (#4448)
- User @chengyongru chỉ ra 65K default "quá nhỏ" cho modern LLMs
- Community đồng thuận nâng lên 200K
- Phản ánh users đang làm việc với large contexts

**Wizard improvements** (#4376, #4395)
- 1 upvote cho feature request
- Clear pain point: technical barrier cao cho non-technical users
- Solution được implement và merge nhanh

### 😟 Pain points:

**Gateway stability** (multiple PRs)
- Nhiều edge cases trong shutdown/restart flows
- Users encounter crashes khi stop services
- Đã được address trong v0.2.2

**WebUI race conditions** (#4455, #4453, #4451)
- Fork behavior unreliable
- Scroll behavior confusing
- Active development để fix

**MCP integration fragility** (#4441, #4450, #4436)
- Reconnection errors
- Task lifecycle issues
- Resource/prompt leakage
- Đang được hardened systematically

### 🔍 Community health signals:

- **21 new contributors** trong release cycle này - cộng đồng đang grow
- **Response time nhanh** - critical bugs được merge trong ngày
- **Thorough testing** - nhiều test coverage additions
- **Documentation focus** - docs updates đi kèm features

---

## 8. 🗓️ Backlog & Roadmap

### 📍 Hiện tại (từ activity pattern):

**Phase: Post-v0.2.2 Stabilization**
- Cleanup remaining edge cases từ v0.2.2
- Complete in-flight features (Mattermost, PWA, search_history)
- Harden MCP integration layer

### 🔮 Short-term (1-2 tuần tới):

**Channel Expansion:**
- Merge Mattermost support (#4459)
- Complete DingTalk enhancements (#4446)
- Address Telegram rich messages (#4413)

**Developer Experience:**
- Complete PWA implementation (#4458)
- Finalize search_history tool (#4439)
- Stabilize subagent model switching (#4291)

**Infrastructure:**
- Complete Node 24 migration (#4460)
- Enforce MCP controls (#4452)
- Fix remaining MCP bugs (#4441, #4443)

### 🎯 Medium-term insights:

Dựa vào closed issues #1461 và #1854, roadmap đã include:
- ✅ **Daemon gateway layer** - completed
- ✅ **Service management** - completed
- 🔄 **Enterprise access controls** - in progress (MCP allowlists, DingTalk group controls)

**Likely next focuses:**
1. **Mobile optimization** - PWA là đầu mối
2. **Multi-model orchestration** - subagent presets, model switching
3. **Advanced memory** - search_history tool, better context management
4. **Production hardening** - continued stability work

### ⚠️ Technical debt areas:

- **Provider compatibility** - DeepSeek message handling (#3869) vẫn open từ 2026-05-16
- **User interruption UX** - #4397 marked invalid, cần approach khác
- **MCP SDK integration** - nhiều edge cases còn emerge

---

## 📊 Metrics Summary

| Metric | Giá trị | Insight |
|--------|---------|---------|
| PRs merged trong release | 140 | Tốc độ phát triển cao |
| Contributors mới | 21 | Community growth mạnh |
| Issues đã đóng hôm nay | 2 | Responsive issue management |
| PRs merged hôm nay | 14 | Execution velocity tốt |
| PRs đang active | 13 | Healthy pipeline |
| Context window mới | 200K tokens | 3x upgrade từ 65K |

---

## 🎬 Kết luận

NanoBot v0.2.2 đánh dấu **bước chuyển mình quan trọng** từ prototype sang production-grade platform. Team đã addresses systematically các pain points về stability, đặc biệt là gateway lifecycle và WebUI race conditions. 

**Strengths:**
- ✅ Fast iteration cycle (140 PRs trong một release)
- ✅ Community engagement tốt (21 new contributors)
- ✅ Stability-first mindset
- ✅ Clear prioritization (infrastructure trước features)

**Watch items:**
- 🔍 MCP integration vẫn cần hardening
- 🔍 Provider compatibility issues (DeepSeek) kéo dài
- 🔍 User interruption UX chưa có solution tốt

**Outlook:** Với momentum hiện tại và focus vào mobile (PWA) + multi-channel + advanced orchestration (subagents), NanoBot đang hướng tới trở thành một **comprehensive AI agent platform** cho cả developers và end-users. 🚀

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 📊 Báo cáo phân tích Zeroclaw - 23/06/2026

## 1. 🎯 Tóm tắt hôm nay

Zeroclaw đang trong giai đoạn chuẩn bị release v0.8.2-v0.8.3 với trọng tâm vào **bảo mật plugin/WASM**, **ổn định runtime**, và **tích hợp MCP tools**. Đáng chú ý là 30+ PR đang mở với nhiều thay đổi risk:high, phản ánh việc đội ngũ đang thực hiện refactoring lớn về kiến trúc bảo mật và quản lý tài nguyên. Một bug nghiêm trọng (#8193) về MCP tools không hiển thị trong TUI sessions đang được ưu tiên xử lý.

## 2. 🚀 Releases

**Không có release mới trong 24h qua.** Tuy nhiên, dự án đang tracking 2 milestone quan trọng:
- **v0.8.2**: Tập trung vào infrastructure, CI/CD, docs, và non-plugin fixes
- **v0.8.3**: Runtime stability, agent-loop, tool execution, và memory management

## 3. 📈 Tiến độ dự án

### Xu hướng phát triển chính

**🔐 Bảo mật Plugin/WASM** (Track nóng nhất)
- **#8137**: Scope plugin config per-alias, loại bỏ raw env access → ngăn chặn cross-plugin secret leakage
- **#8172**: Áp dụng signature policy khi load plugin tools (trước đây hardcode disabled)
- **#8128**: Thêm SSRF guard cho `zc_http_request` host function → ngăn plugin truy cập loopback/private IPs

**🧠 Agent Runtime Stability**
- **#8196** (XL, risk:high): Refactor toàn bộ history management - loại bỏ 6-phase pruner, thay bằng whole-turn trim với RPC event visibility
- **#8179**: Thêm `ResolvedAgentExecution::resolve` - single constructor cho agent-policy parity
- **#8104**: Drain gateway trước khi RPC reload để tránh connection loss

**🔧 MCP Tools Integration**
- **#8193** (P1, S1 - workflow blocked): Bug nghiêm trọng - MCP tools không xuất hiện trong TUI sessions mặc dù gateway thấy chúng
- **#8199**: Fix initialize MCP cho Chat TUI sessions (trước đây hardcode `initialize_mcp = false`)
- **#8023**: Stop leaking stdio child processes per MCP heartbeat tick

**📊 Quan sát về code velocity**
- 50 PRs đang mở, 30 PRs có nhiều tương tác nhất
- Nhiều PR size:M đến XL với risk:high → refactoring sâu đang diễn ra
- @singlerider đóng góp 40%+ PRs (13/30 top PRs)
- Merge rate thấp trong 24h (chỉ 2 PRs closed) → đang review kỹ các thay đổi bảo mật

## 4. 💬 Điểm nổi bật cộng đồng

### Issues được quan tâm

**#8193** - MCP tools missing in TUI (👍0 nhưng priority:p1, risk:high)
- **Tác động**: Chặn workflow của users sử dụng MCP servers
- **Root cause**: Gateway expose tools nhưng TUI runtime không nhận
- **Trạng thái**: Đã có PR #8199 fix phần `initialize_mcp`, nhưng vấn đề tool discovery vẫn cần investigation

**#8075** - Keybinds vs OS globals (2 comments)
- Ctrl+up trên macOS conflict với Mission Control
- PR #8166 đã fix bằng cách đổi sang Alt+up/down
- Phản ánh vấn đề UX với cross-platform keybinding

### Pull Requests nổi bật

**#8200** - Integration QA branch (status:blocked, DO NOT MERGE)
- Branch tích hợp **TẤT CẢ** open PRs của @singlerider để QA
- Đánh dấu rõ "intended to die" → testing strategy trước khi merge riêng lẻ
- Scope khổng lồ: XL size, chạm 15+ subsystems

## 5. 🐛 Ổn định & Bugs

### Critical Bugs (S1 - workflow blocked)

**#8193** - MCP tools không load trong TUI
- **Severity**: S1 
- **Component**: zerocode/tui, runtime, gateway
- **Fix PR**: #8199 (partial), cần investigation thêm

**#8202** - Skill bundles missing trong new sessions
- **Severity**: S1
- **Root cause**: `refreshed_new_session_system_prompt` chỉ load workspace/open-skills, bỏ qua bundled_skill
- **Fix PR**: #8203 đã mở

### Runtime Stability Issues

**#7935** - Shell command pipe deadlock
- Drain stdout/stderr immediately sau spawn thay vì wait for exit
- Prevent large-output commands blocking on full pipes

**#8104** - Gateway connection loss during daemon reload
- Thêm graceful shutdown cho gateway trước RPC reload

**#7909** - Groq API rejection: tool results thiếu `name` field
- Fix: Include tool name trong native tool-result messages

## 6. ✨ Yêu cầu tính năng

### Agent & Execution

**#8066** - Opt-in LLM request payload capture
- Hiện tại chỉ log response, không log request
- Thêm config `observability.capture_llm_requests` (default off) cho audit

**#8006** - Aliases/Costs tabs trong TUI provider list
- Web gateway đã có, TUI thiếu
- Giúp users quản lý provider aliases tốt hơn

### Developer Experience

**#8169** - Move translation catalogues sang git submodule
- Tách `.po` files ra repo riêng: zeroclaw-docs-translations
- Giảm noise trong main repo, dễ quản lý i18n

**#8133** - Redefine "Balanced" preset
- Thay đổi từ medium-risk-approval sang trusted-local daily driver
- Drop shell allowlist để routing tasks thuận tiện hơn

## 7. 💭 Phản hồi người dùng

### Pain Points

**MCP Integration** (#8193, #8199)
- Users report MCP servers connect nhưng tools không xuất hiện
- Vấn đề đặc biệt phổ biến với TUI mode
- → Team đang prioritize fix này (P1)

**Keybinding Conflicts** (#8075)
- MacOS users bị conflict với system shortcuts
- → Quick fix với Alt key, nhưng cần cross-platform keybinding review

**Documentation Translation** (#8169)
- Stale placeholder translations gây warning noise
- → Đang migrate sang submodule structure

### Positive Signals

- Không có issue/PR nào có negative reactions
- Community contributions đa dạng (@singlerider, @Audacity88, @perlowja, @Nillth, etc.)
- Testing discipline tốt: integration QA branch (#8200) trước khi merge

## 8. 🗺️ Backlog & Roadmap

### Milestone v0.8.2 (#8181 - 28 open items)
**Focus areas**:
- CI/CD improvements
- Documentation & quickstart
- Config & gateway enhancements
- Security hardening
- Test coverage

### Milestone v0.8.3 (#8071)
**Focus areas**:
- Runtime stability
- Agent loop robustness  
- Tool execution reliability
- Memory management
- Daemon/cron/skills infrastructure

### Long-term Initiatives

**A2A (Agent-to-Agent) Discovery** (#7763)
- Gateway agent discovery surface
- Catalog cards cho published agents
- Non-conforming với one-agent-per-origin spec (deliberate design choice)

**SOP (Standard Operating Procedures) Durability** (#8001)
- `SopRunStore` trait + in-memory backend
- Foundation cho durable run-state, CAS-claim admission, event log

**Plugin Security Hardening** (Multiple PRs)
- Signature verification enforcement
- SSRF protection
- Environment isolation
- Per-alias config scoping

---

## 📌 Kết luận

Zeroclaw đang trong phase **stabilization & security hardening** với focus mạnh vào:
1. **Plugin isolation** - Ngăn chặn các attack vector từ untrusted plugins
2. **Runtime stability** - Refactor history management, execution flow
3. **MCP integration** - Fix critical bugs ảnh hưởng TUI users

Team đang áp dụng testing discipline cao (integration QA branch) và review kỹ các high-risk changes. Tốc độ merge chậm lại là dấu hiệu tốt cho chất lượng code trước release.

**Risk to watch**: Số lượng open PRs (50+) với nhiều dependencies có thể gây merge conflicts và integration issues. Team nên consider batch merging theo component groups.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo hoạt động PicoClaw - 23/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 23/06/2026, PicoClaw tập trung mạnh vào **bảo mật và ổn định hệ thống** với 2 PR quan trọng về authentication và sandbox security. Đồng thời, dự án mở rộng khả năng tương tác thiết bị với **công cụ điều khiển Android từ xa qua ADB**. Cộng đồng báo cáo bug về việc AI lặp lại task và vấn đề rò rỉ tool call với Doubao Seed model.

---

## 🚀 Releases

Không có release mới trong 24 giờ qua.

---

## 📈 Tiến độ dự án

### 🔒 Bảo mật (Ưu tiên cao)

**PR #3160** - Khắc phục lỗ hổng cross-site launcher setup
- **Vấn đề**: Endpoint `/api/auth/setup` có thể bị tấn công CSRF trong quá trình thiết lập mật khẩu lần đầu
- **Giải pháp**: Thêm kiểm tra `Sec-Fetch-Site`, `Origin`, và `Referer` để chặn request cross-site
- **Ý nghĩa**: Ngăn chặn kịch bản attacker chiếm quyền điều khiển dashboard khi người dùng chưa thiết lập mật khẩu

**PR #3161** - Tăng cường sandbox exec security
- **Vấn đề**: Custom allow patterns có thể bypass deny rules, dẫn đến rủi ro như `jq` đọc environment variables
- **Giải pháp**: Luôn áp dụng deny patterns ngay cả khi command match allow rule
- **Ý nghĩa**: Tăng cường defense-in-depth cho sandbox execution

### 🤖 Tính năng mới

**PR #3157** - Công cụ điều khiển Android từ xa (Experimental)
- **Khả năng**: List devices, screenshots, UI hierarchy, tap, swipe, text input, wake
- **Kiến trúc**: Disabled by default, yêu cầu cấu hình `android.enable_tool = true`
- **Use case**: Cho phép AI agent thao tác trực tiếp trên thiết bị Android

**PR #3156** - Tracking token usage chi tiết
- Emit riêng input/output tokens cho mỗi conversation turn
- Hỗ trợ tính toán chi phí chính xác (input/output có giá khác nhau)

### 🔧 Cải tiến UX

**PR #3152** (Merged) - Hướng dẫn cài đặt skills
- Lệnh `picoclaw skills search` giờ hiển thị luôn cách cài đặt
- Giảm friction cho người dùng mới

### 🐛 Bug fixes

**PR #3154** - Khắc phục Doubao Seed tool call leak (issue #3153)
- Parser XML để phát hiện và chuyển đổi `<seed:tool_call>` thành format chuẩn
- Giải quyết vấn đề model trả về tool call dưới dạng raw XML thay vì JSON

---

## ⭐ Điểm nổi bật cộng đồng

### Issue được quan tâm

**#3093** - Yêu cầu hỗ trợ messaging platforms riêng tư (3 comments, 1 👍)
- User yêu cầu tích hợp **SimpleX**, Wire, hoặc Tox
- Phản ánh nhu cầu về privacy-focused communication channels
- Đang trong discussion, chưa có commitment từ team

---

## 🔴 Ổn định & Bugs

### Bugs đang mở

**#3159** - AI lặp lại task (Mới, chưa có response)
- **Môi trường**: v0.2.9, deepseek-v4-flash-free, Debian 13
- **Hiện tượng**: Hỏi tin tức Mỹ → OK, hỏi tin tức Pháp → làm lại task tin tức Mỹ trước
- **Tác động**: Gây lãng phí token và thời gian, ảnh hưởng UX

**#3153** - Doubao Seed tool calls rò rỉ dưới dạng XML
- **Root cause**: Model đôi khi trả tool call trong `message.content` thay vì `tool_calls` field
- **Đã có fix**: PR #3154 đang chờ review
- **Workaround**: Tạm chuyển sang model khác hoặc chờ patch

### Housekeeping

- **6 stale PRs** liên quan dependency updates và type assertion fixes
- Cần review và merge/close để giữ backlog sạch

---

## 💡 Yêu cầu tính năng

### Feature requests mới

**#3093** - Privacy-focused messaging gateways
- SimpleX, Wire, hoặc Tox integration
- Phù hợp với trend tăng cường privacy

**PR #3157** - Android remote control (đang triển khai)
- Mở rộng khả năng automation sang mobile
- Potential use cases: Mobile app testing, device automation, accessibility support

### Features đang phát triển

**PR #3155** - `direct_reply` parameter cho spawn tool
- Giải quyết duplicate message issue (#3094)
- Cho phép kiểm soát rõ ràng message routing: user-only vs. trigger main agent

---

## 👥 Phản hồi người dùng

### Feedback tích cực

- User đánh giá cao tính năng skills search mới (PR #3152 merged nhanh)
- Cộng đồng đóng góp fixes tích cực (nhiều community PRs)

### Pain points

1. **Task duplication** (#3159): AI lặp lại công việc đã làm
2. **Model compatibility**: Doubao Seed có quirks đặc biệt cần workaround
3. **Setup friction**: Đã được giải quyết phần nào qua PR #3152

### Xu hướng

- Tăng nhu cầu về **privacy & security** (issue #3093, PR #3160)
- Quan tâm về **device automation** (Android tool)
- **Token cost awareness** tăng cao (PR #3156 về usage tracking)

---

## 🗺️ Backlog & Roadmap

### Đang chờ review (cần action)

- 🔒 **Security PRs** (#3160, #3161) - Nên merge ưu tiên
- 🤖 **Android tool** (#3157) - Feature lớn, cần testing kỹ
- 📊 **Token tracking** (#3156) - Useful cho production users
- 🐛 **Doubao fix** (#3154) - Blocking cho Volcengine users

### Tech debt

- 6 stale PRs cần triage
- Type assertion improvements (#3053, #3091, #3131) - Code quality
- Dependency updates (#3100-#3105) - Maintenance

### Gaps cần giải quyết

1. **Task orchestration logic** - Issue #3159 cho thấy có vấn đề với context/memory management
2. **Model compatibility layer** - Cần abstraction tốt hơn cho các quirks của từng model
3. **Privacy channels** - SimpleX/Tox integration nếu có nhu cầu thực sự

---

## 📌 Đánh giá tổng thể

PicoClaw đang trong giai đoạn **maturity & hardening**:
- ✅ Tập trung vào security & stability
- ✅ Mở rộng capabilities (Android automation)
- ✅ Cải thiện observability (token tracking)
- ⚠️ Cần xử lý task orchestration bug
- ⚠️ Backlog cần cleanup

Dự án có sức khỏe tốt với cả internal development và community contributions cân bằng.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/nanocoai/nanoclaw">nanocoai/nanoclaw</a></summary>

# 📊 Báo cáo phân tích NanoClaw - Ngày 23/06/2026

## 🎯 Tóm tắt hôm nay

Ngày 22-23/06 ghi nhận hoạt động tích cực với 6 PR được cập nhật, tập trung vào việc mở rộng khả năng tích hợp (email, Telegram) và cải thiện trải nghiệm người dùng (approval workflow, CLI dashboard). Một PR đã được merge thành công (Telegram integration), cho thấy tốc độ review nhanh chóng. Không có issue mới hoặc release, cho thấy đây là giai đoạn tập trung vào phát triển tính năng hơn là xử lý bug.

## 🚀 Releases

**Không có release mới** trong 24 giờ qua.

## 📈 Tiến độ dự án

### PRs đang hoạt động (5 OPEN + 1 CLOSED)

**🔥 Tính năng nổi bật:**

- **#2831 [CLOSED] - Telegram Integration** ✅
  - Tác giả: @aarchh
  - **Đã được merge thành công** sau khi verify hoạt động trên v2.1.1
  - Bổ sung kênh giao tiếp mới cho agent, mở rộng khả năng tiếp cận người dùng
  - Tốc độ merge nhanh (cùng ngày tạo) cho thấy chất lượng code tốt và review hiệu quả

- **#1235 - IMAP/SMTP Email Integration**
  - Tác giả: @aronjanosch | Đang review từ 18/03
  - Thêm email như **channel** (nhận tin nhắn qua IMAP polling) và **toolset** (agent chủ động quản lý email)
  - 6 MCP tools: `list_accounts`, `list_emails`, `get_email`, `compose_email`, `move_email`, `list_folders`
  - **Insight**: PR này kéo dài 3 tháng, cho thấy đây là tính năng phức tạp cần review kỹ lưỡng

- **#2832 - Approval Rejection với lý do**
  - Tác giả: @moshe-nanoco | Mới tạo 22/06
  - Cải thiện approval workflow: thêm nút "Reject with reason" để approver có thể giải thích lý do từ chối
  - Agent nhận feedback để điều chỉnh hành vi thay vì chỉ nhận "declined"
  - **UX improvement**: Tăng tính minh bạch và khả năng học hỏi của agent

**🛠️ Utility & Tooling:**

- **#2795 - CLI Dashboard Skill**
  - Tác giả: @leetwito
  - Thêm skill `/add-clidash` - read-only dashboard từ CLI
  - **Utility skill** không thay đổi source code, dễ maintain
  - Giúp monitoring và debug agent qua giao diện CLI

**🐛 Fixes:**

- **#2830 - Cleanup dead service registrations**
  - Tác giả: @amit-shafnir | Tạo 21/06
  - **Problem**: Xóa NanoClaw checkout mà không chạy uninstaller để lại launchd/systemd config trỏ đến binary không tồn tại
  - Gây tích tụ zombie processes (quan sát thấy 6 registrations trên một máy test)
  - **Impact**: Cải thiện stability trên môi trường dev/test

- **#2531 - Poll-loop duplicate text fix**
  - Tác giả: @cfis | Đang review từ 18/05
  - Sửa lỗi text bị duplicate khi `send_message` gọi giữa turn
  - PR kéo dài >1 tháng, có thể là edge case khó reproduce

### 📊 Xu hướng phát triển

1. **Mở rộng channels**: Email (IMAP/SMTP) + Telegram → tăng khả năng tích hợp đa nền tảng
2. **Cải thiện UX**: Approval với feedback chi tiết → agent learning tốt hơn
3. **Tooling**: CLI dashboard → better observability
4. **Stability**: Cleanup zombie processes → production-ready hơn

## 🌟 Điểm nổi bật cộng đồng

**Không có dữ liệu về reactions/comments** cho các PR (tất cả hiển thị `undefined`), nhưng có thể quan sát:

- **Telegram integration được merge nhanh** → nhu cầu cao từ community
- **Email integration review lâu (3 tháng)** → tính năng quan trọng cần đảm bảo chất lượng
- **Đa dạng contributors**: @aronjanosch, @leetwito, @moshe-nanoco, @amit-shafnir, @aarchh, @cfis → cộng đồng phát triển active

## 🔧 Ổn định & Bugs

### Đang xử lý:

1. **#2830 - Dead service registration cleanup** 
   - Severity: Medium
   - Impact: Dev/test environments bị zombie processes
   - Status: PR đang review

2. **#2531 - Duplicate text trong poll-loop**
   - Severity: Low-Medium  
   - Impact: UX issue khi message bị duplicate
   - Status: PR đang review từ lâu → có thể cần thêm context hoặc testing

### Quan sát:

- **Không có issues mới trong 24h** → product ổn định hoặc users đang tập trung vào testing các tính năng mới
- Focus vào feature development hơn bug fixing → giai đoạn growth

## 💡 Yêu cầu tính năng

### Đang implement:

1. **Email as Agent Channel** (#1235)
   - Cho phép agent nhận/gửi email tự động
   - 6 MCP tools cho email management
   - Use case: Customer support automation, email triage

2. **Telegram Integration** (#2831) ✅ MERGED
   - Agent có thể giao tiếp qua Telegram
   - Use case: Chatbot, notification system

3. **CLI Dashboard** (#2795)
   - Read-only monitoring interface
   - Use case: DevOps, debugging, observability

4. **Approval với Feedback** (#2832)
   - Rejection có kèm lý do → agent learning
   - Use case: Human-in-the-loop workflows

### Pattern quan sát:

- **Communication channels** là priority cao (Email, Telegram)
- **Developer experience** được chú trọng (CLI dashboard, approval UX)
- **MCP tools integration** → extensibility architecture

## 👥 Phản hồi người dùng

**Thiếu dữ liệu reactions/comments**, nhưng có thể suy luận:

- **Telegram merge nhanh** → feedback tích cực hoặc đáp ứng đúng nhu cầu
- **Email PR kéo dài** → có thể có nhiều discussion về implementation approach
- **Không có issues mới** → users hài lòng với stability hiện tại hoặc đang trong giai đoạn testing silent

## 🗓️ Backlog & Roadmap

### Dựa trên PRs đang chờ:

**Q3 2026 priorities** (dự đoán):

1. ✅ **Telegram integration** - DONE
2. 🔄 **Email integration** - In review (high priority, 3 months in progress)
3. 🔄 **Approval UX improvements** - In review (recent, likely fast-track)
4. 🔄 **CLI tooling** - In review
5. 🐛 **Stability fixes** - Ongoing (poll-loop, service cleanup)

### Xu hướng chiến lược:

- **Multi-channel agent platform**: Mở rộng từ CLI sang Email, Telegram → universal agent interface
- **Production readiness**: Focus vào stability, cleanup, monitoring
- **Human-in-the-loop**: Approval workflow cải tiến → enterprise use cases
- **Extensibility**: MCP tools, skills architecture → ecosystem growth

---

## 📝 Kết luận

NanoClaw đang trong **giai đoạn mở rộng tính năng mạnh mẽ** với focus vào:
- ✅ Multi-channel integration (Email, Telegram)
- ✅ Better developer experience (CLI tools, approval UX)  
- ✅ Production stability (cleanup zombie processes)

**Tốc độ phát triển tốt** với 6 PRs active, community contributors đa dạng, và khả năng merge nhanh cho tính năng chất lượng. Đây là dấu hiệu của một dự án **healthy và đang growth**.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo phân tích IronClaw - 23/06/2026

## 📊 Tóm tắt hôm nay

Ngày 23/06 đánh dấu một đợt refactoring lớn của IronClaw Reborn với việc tách "god-crate" composition thành các module nhỏ hơn, đồng thời tăng cường khả năng tự động hóa qua pause/resume/delete automation. Một regression nghiêm trọng khiến web/research tasks bị treo hoàn toàn đã được phát hiện và đang điều tra. Tuần này tập trung vào cải thiện performance và dogfooding experience.

---

## 🚀 Releases

Không có release chính thức trong 24 giờ qua.

---

## 🏗️ Tiến độ dự án

### **Refactoring kiến trúc lớn**
- **#5137 - Tách `ironclaw_reborn_http_kit`**: Khởi đầu chuỗi PR phân rã crate `ironclaw_reborn_composition` (~132k dòng code) thành các module nhỏ hơn, tập trung vào HTTP middleware kit trước
- **#5135 - Decompose composition god-crate** (closed/superseded): Kế hoạch tách thành 6 crates đã bị thay thế bằng chiến lược incremental (từng PR nhỏ)
- **Mục tiêu**: Giảm phụ thuộc, tăng tính module hóa, dễ maintain hơn

### **Automation workflows - Chức năng mới hoàn chỉnh**
✅ **Đã merge**:
- **#5063 - Per-turn auto-approve**: Thiết lập auto-approve per-user qua DB, không cần restart (#4959)
- **#5062 - Per-tool permission model**: 3 trạng thái `always_allow`/`ask_each_time`/`disabled` cho từng capability (#4958)

🔄 **Đang review**:
- **#5131 - Automation pause/resume**: Thêm khả năng tạm dừng/tiếp tục automation qua trigger state transitions
- **#5133 - Automation delete**: Xóa automation với confirmation UI

### **Concurrency & Performance**
✅ **#5085 - Concurrent turn execution**: Chuyển từ serial sang concurrent turn execution với `TurnRunScheduler`, có per-user/per-type rate limits
- Trước: 1 turn/lúc, queue block toàn bộ
- Sau: Multi-turn parallel, cấu hình được qua `[reborn.runtime.turn_runner]`

🔍 **#5125 - Performance investigation tuần này**:
- #5126: Thêm latency logging chi tiết
- #5127: Điều tra inference latency và provider tuning
- #5128: Giảm các bước agent/runtime không cần thiết

### **Infrastructure & Data persistence**
✅ **#4989 - Engine V2 LLM usage tracking**: Sửa `/api/admin/usage` trống trên Engine V2 deployments
✅ **#5081 - Hosted single-tenant Postgres**: Profile mới cho hosted preview với PostgreSQL backend thay vì libSQL

---

## 🔥 Điểm nổi bật cộng đồng

### **🚨 Regression nghiêm trọng - #5139**
**Web/research tasks bị treo hoàn toàn** sau khi main branch nâng từ `2b2ccc55` → `704fcd43`:
- **Triệu chứng**: Task timeout với 0 LLM calls, 0 tool calls
- **Tác động**: 21/147 tasks trên PinchBench daily bị zero
- **Kiểm soát**: Đã xác định bisect window (10 commits), đang điều tra
- **Ưu tiên cao**: Blocking cho dogfooding và daily benchmarks

### **UX pain points từ dogfooding**
**#5119 & #4879 - Dogfooding findings**:
- #5129: "Always approve" không hoạt động cho `outbound_delivery_target_set`
- #5124: Hỗ trợ Telegram channel cho Reborn (hiện chỉ có legacy v1)
- #4925: NEAR AI MCP hiển thị "SETUP NEEDED" mặc dù đã sẵn sàng (đã fix)

---

## 🐛 Ổn định & Bugs

### **Đã sửa ✅**
- **#5140 - Trigger input errors**: Surface lỗi structured cho `builtin.trigger_create` thay vì opaque failures
- **#4985/#4989 - Admin usage tracking**: Engine V2 giờ ghi đúng LLM usage
- **#4925 - MCP setup UI**: Fix false "setup needed" warning

### **Đang điều tra 🔍**
- **#5139**: Web/research task hang (regression chính)
- **#4108**: Nightly E2E failures tiếp diễn

### **Cần attention 🟡**
- **#4969 - Google WASM auth errors**: Structured `auth_required` errors cho Drive/Docs/Sheets/Slides 401s

---

## 💡 Yêu cầu tính năng

### **Skill extraction & Self-evolution - #5061**
Hermes-style learning system:
- Tự động distill transcript thành `SKILL.md` sau turn thành công
- Prompt injection safety scan trước khi install
- UI note "learned a skill" trong activity feed
- Activation controls cho user

### **OpenAI-compatible surface - #5094**
- `/v1/models` endpoint
- Model validation layer
- Foundation cho external-tool gate (chưa active)

### **GitHub bug workflow - #5134**
Design docs cho MVP GitHub bug-fix workflow trên IronClaw Reborn (engineering design, subsystem overview, implementation plan)

---

## 💬 Phản hồi người dùng

### **Positive signals**
- Concurrent turn execution (#5085) cải thiện đáng kể throughput cho multi-user scenarios
- Permission model 3-state (#5062) đáp ứng đúng user expectations từ V1

### **Pain points**
1. **Performance**: Local Reborn "feels slow" → dedicate tuần này cho latency investigation
2. **UX confusion**: MCP setup, auto-approve không rõ ràng
3. **Regression instability**: Main branch breaks affecting daily usage

### **Community contribution**
- @rafly-habibi: 2 WebUI v2 fixes (sidebar highlight, invalid chat routes)
- @elliotBraem: Barcelona Hackathon fork với stability focus
- @theredspoon: CI improvement (reuse cargo-component installer)

---

## 📋 Backlog & Roadmap

### **Tuần này (06/22 - 06/28)**
**Focus areas**:
1. ⚡ **Performance** (#5125): Latency logging, inference tuning, reduce unnecessary steps
2. 🤖 **Automations** (#5123): Pause/resume (#5131), delete (#5133), Telegram support (#5124)
3. 🐛 **Regression fix** (#5139): Unblock web/research tasks ASAP

### **Near-term (đang trong queue)**
- Decompose composition crate (series of small PRs starting #5137)
- Gmail OAuth E2E coverage (#5136)
- Gate declined semantics unification (#5120)
- Skill extraction activation (#5061)

### **Dependencies & Maintenance**
- Massive dependency bumps: #5138 (45 updates), #5116 (44 updates)
- WASM group updates blocked since 05/25 (#4032)

---

## 🎯 Takeaways

**Strengths**:
- Incremental refactoring strategy (small PRs) thay vì big-bang
- Dogfooding-driven development phát hiện issues thực tế
- Concurrency improvements đáp ứng production readiness

**Risks**:
- Regression #5139 blocking critical workflows
- God-crate refactor có thể gây merge conflicts nếu không land nhanh
- Performance issues có thể ảnh hưởng adoption nếu kéo dài

**Momentum**: Cao - nhiều PR lớn merge, feature velocity tốt, nhưng cần stabilize main branch trước khi tiếp tục ship features mới.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 Báo cáo Phân tích Dự án LobsterAI - 23/06/2026

## 🎯 Tóm tắt hôm nay

LobsterAI đang trải qua một đợt tích lũy kỹ thuật quan trọng với 14 PRs và 5 issues chủ yếu tập trung vào **stabilization và quality hardening**. Điểm đáng chú ý là đội ngũ đang đẩy mạnh xử lý các vấn đề về concurrency safety, database optimization, và plugin architecture improvements - đặc biệt là tích hợp OpenClaw framework sâu hơn. Không có release mới nhưng các commits cho thấy chuẩn bị cho một phiên bản ổn định hơn.

## 🚀 Releases

**Không có releases mới trong 24 giờ qua.** Tuy nhiên, từ các PR merged, dự án đang trong giai đoạn consolidation trước một release lớn tiềm năng.

## 📈 Tiến độ dự án

### PRs Đã Merge (4 PRs quan trọng)

**🎨 Tính năng mới - Plan Mode Workflow (#2183)**
- Thêm **Plan Mode** vào composer menu - cho phép AI đề xuất kế hoạch trước khi thực thi
- Render các proposed plans dưới dạng interactive blocks với actions: copy, download, expand/collapse
- Workflow: User xem plan → approve → execution flow bình thường
- **Impact**: Nâng cao UX đáng kể, tăng tính minh bạch và kiểm soát cho người dùng trong collaborative coding

**🔧 OpenClaw Infrastructure Improvements (#2186, #2182, #2185)**
- Fix compile runtime entry cho NIM plugin TypeScript
- Support upgraded IM plugin installs (DingTalk, Lark/Feishu, WeCom, POPO)
- Cải thiện plugin installation layout compatibility (`extensions/` và `npm/projects/.../node_modules/`)
- **Impact**: Mở rộng hệ sinh thái plugin, tăng khả năng tích hợp với các nền tảng IM phổ biến tại Trung Quốc

**📝 Documentation & Testing (#2184, #2187)**
- Cập nhật AGENTS.md về Cowork/OpenClaw architecture
- Align metadata expectations cho reasoning-capable models
- 146 tests passed

### PRs Đang Mở - Technical Debt Resolution

**🔒 Security & Safety (3 PRs cao độ ưu tiên)**

1. **#1407 - Request Body Size Limit**
   - **Vấn đề**: OpenClaw Token Proxy không giới hạn request body → nguy cơ OOM attack
   - **Giải pháp**: Thêm limit 10MB với real-time byte counting
   - **Đánh giá**: Critical security fix, cần merge nhanh

2. **#1408 - Promise Error Handling**
   - **Vấn đề**: MCP Bridge Server không await/catch Promise rejections → unhandled errors, potential crashes
   - **Giải pháp**: Proper async handling trong callback chain
   - **Đánh giá**: Stability improvement quan trọng

3. **#1415 - Migration Transaction Safety**
   - **Vấn đề**: Migration flag được set trước khi COMMIT → nếu rollback vẫn skip migration lần sau
   - **Giải pháp**: Chỉ set flag sau COMMIT thành công
   - **Đánh giá**: Data integrity issue, cần fix

**⚡ Performance Optimizations (2 PRs)**

1. **#1410 - SQLite Batching**
   - **Vấn đề**: `SqliteStore.set()` đồng bộ disk I/O mỗi lần ghi → blocking event loop, lag trong streaming
   - **Giải pháp**: Debounced batch writes
   - **Impact**: Cải thiện đáng kể UX trong high-frequency update scenarios

2. **#1421 - Memory Caching**
   - **Vấn đề**: `buildUserMemoriesXml()` full-scan DB mỗi turn → không cần thiết
   - **Giải pháp**: 5s TTL cache + precise invalidation
   - **Impact**: Giảm DB overhead, faster prompt generation

**🐛 Bug Fixes (2 PRs)**

1. **#1419 - NIM Group Type Enum**
   - Sửa mapping sai giữa `sessionType` và `V2NIMTeamType` (2↔1 bị đảo ngược)
   - Fix cho issue #1200

2. **#1420 - Cron Concurrency**
   - Sửa reentrant calls trong `pollOnce()` khi Gateway chậm
   - Prevent event storms và ghost events
   - Fix cho issue #1107

### Xu hướng phát triển

📊 **Pattern phát triển rõ ràng:**
- **Phase 1** (đã qua): Feature expansion với OpenClaw/Cowork
- **Phase 2** (hiện tại): **Hardening & stabilization** - xử lý technical debt tích lũy
- **Phase 3** (sắp tới): Có thể là performance tuning và scaling improvements

## 🌟 Điểm nổi bật cộng đồng

**Không có activity cao** - tất cả issues/PRs đều có 0-1 reactions. Điều này cho thấy:
- Cộng đồng contributor chủ yếu là internal team
- Issues được report qua internal QA thay vì user-driven
- Cần strategies để tăng external contribution

**Label "stale"** xuất hiện trên nhiều items - cho thấy backlog đang tồn đọng, cần prioritization tốt hơn.

## 🐛 Ổn định & Bugs

### Critical Issues đang mở

**#1414 - Tổng số hội thoại luôn hiển thị 0**
- Mặc dù có 432 API calls và 444.39 credits usage
- Stats aggregation logic bị lỗi
- **Impact**: Metrics không chính xác → khó theo dõi usage patterns

**#1409 - Scheduled tasks không tạo history records**
- Cross-day triggers không được log
- **Impact**: Audit trail bị thiếu, troubleshooting khó khăn

**#1416 - UI Layout vỡ khi chuyển sang English**
- Text overlap trong "Current Plan" card
- **Root cause**: Không có i18n-aware responsive design
- **Impact**: UX kém cho international users

**#1413 - Skills display không scale**
- Khi có nhiều skills, UI hiển thị không tối ưu
- **Impact**: UX issue, nhưng priority thấp hơn

**#1411 - Time filter không hoạt động**
- Pointer cursor xuất hiện nhưng click không responsive
- **Impact**: Users không thể customize analytics view

### Phân loại độ nghiêm trọng

🔴 **High**: #1407, #1408, #1415, #1414  
🟡 **Medium**: #1410, #1421, #1409, #1420, #1419  
🟢 **Low**: #1416, #1413, #1411

## 💡 Yêu cầu tính năng

**Plan Mode (#2183)** - Đây là feature request lớn nhất được implement:
- Cho phép users review execution plan trước khi AI action
- Tăng trust và control trong AI-assisted development
- Potentially game-changing cho enterprise adoption

**Không có feature requests mới từ community** trong 24h - chủ yếu là bug fixes và improvements.

## 📣 Phản hồi người dùng

### Pain Points được phản ánh

1. **Stability concerns**: Nhiều concurrency và error handling issues
2. **Data integrity**: Migration và history tracking problems
3. **UX polish gaps**: UI bugs khi scale (nhiều skills, i18n)
4. **Performance**: DB query optimization needs

### Positive signals

- Team đang **proactively addressing** technical debt
- Test coverage được maintain (146 tests trong #2187)
- Documentation updates theo kịp architecture changes

## 🗺️ Backlog & Roadmap

### Short-term (Dự kiến 1-2 tuần)

**Must-fix trước release tiếp theo:**
- ✅ Merge security fixes (#1407, #1408)
- ✅ Merge data integrity fix (#1415)
- ⚠️ Resolve UI bugs cho international users (#1416)
- ⚠️ Fix stats display (#1414)

### Mid-term (Dự kiến 1-2 tháng)

**Performance & Polish:**
- Performance optimizations (#1410, #1421) - có thể postpone nếu không critical
- OpenClaw plugin ecosystem expansion
- Cron service reliability improvements (#1420)

### Strategic observations

**Cần chú ý:**
- **Stale PR accumulation**: Nhiều PRs open từ 04/03 chưa được review/merge
- **Review bandwidth issue**: Có thể là bottleneck
- **Community engagement**: Cần strategies để grow external contributors

**Opportunities:**
- Plan Mode có thể là killer feature cho marketing
- OpenClaw plugin ecosystem có potential để tạo differentiation
- Stability improvements sẽ tăng enterprise readiness

---

**📌 Kết luận**: LobsterAI đang trong **consolidation phase** tốt - focus vào quality over quantity. Nếu team có thể clear backlog và ship các fixes trong 1-2 tuần tới, sẽ có một stable release foundation mạnh mẽ để build thêm features sau.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Báo cáo Phân tích Hệ sinh thái CoPaw - 23/06/2026

## 📊 Tóm tắt hôm nay

Dự án đang trong giai đoạn **tập trung ổn định và tối ưu trải nghiệm người dùng**, với 8 issues mới và 30 PRs hoạt động. Hai xu hướng chính: (1) **Mobile responsiveness** - hàng loạt PR cải thiện giao diện di động cho từng trang Console, và (2) **Sửa lỗi nghiêm trọng** - xử lý các vấn đề crash frontend, lỗi cron scheduler, và vấn đề tích hợp provider tùy chỉnh.

---

## 🚀 Releases

**Không có release mới trong 24 giờ qua.**

---

## 📈 Tiến độ dự án

### 🎯 Xu hướng phát triển chính

#### 1. **Chiến dịch Mobile Responsiveness** ⭐
- **Quy mô**: 10+ PRs từ @yaozy2020 và @lecheng2018
- **Phạm vi**: Bao phủ hầu hết các trang Console
  - ✅ Chat header (#5350, #5355)
  - ✅ CronJobs (#5362)
  - ✅ Sessions (#5364)
  - ✅ Agent Config (#5366)
  - ✅ Skill Pool (#5368)
  - ✅ Channels (#5369)
  - ✅ ACP (#5382)
  - ✅ Inbox (#5383)
  - ✅ Workspace (#5384)
  - ✅ Environments (#5385)
  - ✅ Settings-Models (#5397)

**Phương pháp thống nhất**:
- Chuyển từ Table sang Card layout trên màn hình ≤768px
- Stack vertical cho header và toolbar
- Responsive dropdown/modal positioning

#### 2. **Core Stability Fixes** 🔧

**#5401 - Console crash với tool-use history lớn** (CRITICAL)
- **Nguyên nhân**: Backend trả `type: "data"` cho tool blocks, nhưng frontend chỉ xử lý `type: "tool_use"`
- **Ảnh hưởng**: Toàn bộ session không render được
- **Trạng thái**: Đang điều tra root cause

**#5398 - Cron scheduler ngừng hoạt động** (HIGH)
- **Biểu hiện**: Jobs không fire mặc dù app vẫn chạy và jobs vẫn enabled
- **Agents bị ảnh hưởng**: chenlingyue (cả 2 jobs)
- **Trạng thái**: Chưa có solution

**#5402 - Dream Task thất bại** (MEDIUM)
- **Mô tả**: Dream task lúc 10pm không thực thi được cho cả 3 agents
- **Liên quan**: Có thể cùng root cause với #5398

#### 3. **Provider & Model Management** 🔌

**#5345 - Custom OpenAI providers không hỗ trợ function calling**
- **Vấn đề**: OMLX (OpenAI-compatible) hoạt động tốt trên Reasonix nhưng không gọi tools trong QwenPaw
- **So sánh**: Ollama (native support) hoạt động bình thường
- **Tác động**: Giới hạn khả năng mở rộng ecosystem

**#5399 - Custom model ordering** (NEW FEATURE)
- Thêm trường `sort_order` cho ModelInfo
- API endpoints: `POST /{provider_id}/models/reorder`
- UI: Drag-and-drop + up/down buttons

#### 4. **Context Management Evolution** 🧠

**#5321 - Scroll context manager** (MAJOR FEATURE)
- **Khái niệm**: Thay vì compression, lưu full conversation vào SQLite và cho model recall qua REPL
- **Architecture**:
  - Durable storage với full-text search
  - Python REPL tool để query lịch sử
  - Configurable retention policies
- **Trạng thái**: Under Review, đang chờ feedback

**#5325 - Recency-aware memory ranking**
- Exponential temporal decay cho daily memory files
- Timezone-aware aging calculation
- Threshold filtering với `min_score`

---

## 🌟 Điểm nổi bật cộng đồng

### 👥 First-time contributors tích cực
- @yaozy2020: 7 PRs về mobile adaptation
- @niceIrene: Scroll context manager (#5321)
- @vanwaals: Policy engine refactor (#5301)

### 💬 Issues được quan tâm nhất

1. **#5360 - "Stabilize core before new features"** (2 comments)
   - Phản ánh tâm lý cộng đồng: ưu tiên stability hơn features mới
   - Yêu cầu: Mobile responsiveness + agent interaction reliability

2. **#5401 - Console crash** (2 comments)
   - Blocking issue cho users với nhiều tool interactions

3. **#5392 - Agent-workspace decoupling** (1 comment)
   - Yêu cầu kiến trúc: Cho phép reuse agent giữa các workspaces

---

## 🐛 Ổn định & Bugs

### Critical Issues

| Issue | Severity | Impact | Status |
|-------|----------|--------|--------|
| #5401 Console crash | 🔴 | Frontend không render với tool history lớn | Investigating |
| #5398 Cron stops | 🔴 | Scheduled tasks không chạy | Open |
| #5402 Dream task fails | 🟠 | Background processing lỗi | Open |

### UI/UX Bugs

- **#5378 - Model page unusable sau khi thêm custom model**
  - Endpoint tự động điền vào search box và không xóa được
  - Page trống, không dùng được
  
- **#5403 - Browser autofill hijacks search input**
  - Trường "Search providers" bị browser nhận nhầm là username field
  - Autofill popup che mất UI

### Integration Issues

- **#5345 - OMLX function calling không hoạt động**
  - Chỉ trả text, không invoke tools
  - Blocking việc integrate custom providers

---

## 💡 Yêu cầu tính năng

### 1. **Agent-Workspace Decoupling** (#5392)
```
Current: Agent ↔ Workspace (1:1 tight coupling)
Proposed: Agent ↔ Workspace (N:N reuse)
```
**Benefit**: Một agent có thể phục vụ nhiều workspaces

### 2. **Batch Operations** (#5297)
- Batch test models
- Batch delete models
- Parallel execution với `asyncio.gather`

### 3. **Enhanced Context Management**
- **Scroll strategy** (#5321): Retrieval-based thay vì compression
- **Recency ranking** (#5325): Time-aware memory search

### 4. **Security Improvements**
- **#5028 - Isolated keychain per install**: Mỗi QwenPaw install có master key riêng
- **#5027 - Session resume**: Không pollute console với warmup sessions

---

## 💭 Phản hồi người dùng

### Positive Signals
✅ Mobile adaptation đang được triển khai có hệ thống  
✅ First-time contributors tích cực đóng góp  
✅ Code review process hoạt động (nhiều PR Under Review)

### Pain Points
⚠️ **Stability concerns** - Issue #5360 phản ánh lo ngại về độ ổn định  
⚠️ **Cron reliability** - Background tasks không đáng tin cậy  
⚠️ **Custom provider support** - Khó tích hợp providers mới  
⚠️ **UI bugs** - Nhỏ nhưng gây phiền nhiễu (autofill, search box)

### User Experience Issues
- Console crash với sessions lớn → Blocking daily use
- Model management bugs → Onboarding friction
- Cron failures → Tin cậy giảm cho autonomous features

---

## 🗺️ Backlog & Roadmap

### Immediate Priorities (Dựa trên activity)

#### P0 - Critical Fixes
1. ✅ Fix console crash với tool-use history (#5401)
2. ✅ Debug cron scheduler reliability (#5398, #5402)
3. ✅ Fix model page UI bugs (#5378, #5403)

#### P1 - Stability Foundation
4. ✅ Complete mobile responsiveness campaign (~80% done)
5. ✅ Custom provider function calling support (#5345)
6. ✅ Security hardening (keychain isolation merged)

#### P2 - Feature Enhancements
7. 🔄 Scroll context manager review (#5321)
8. 🔄 Agent-workspace decoupling architecture (#5392)
9. 🔄 Batch operations for models (#5297)

### Emerging Patterns

**Governance & Safety**: PR #5301 merge ToolGuard vào Policy engine - consolidating safety controls

**Developer Experience**:
- TUI improvements (#5400 - animated logo)
- Better error visibility
- Comprehensive mobile support

**Architecture Evolution**:
- Moving from monolithic context to retrieval-based
- Decoupling core entities (agent/workspace)
- Plugin system maturation

---

## 🎯 Insights & Recommendations

### 1. **Mobile-First đang thành priority**
Với 10+ PRs về mobile, rõ ràng team đang respond to user demand. Nên có guideline thống nhất về breakpoints và patterns.

### 2. **Stability debt đang tích lũy**
Issues #5398, #5401, #5402 đều là production blockers. Cần sprint tập trung vào reliability trước khi ship features mới (đúng như #5360 đề xuất).

### 3. **Custom provider ecosystem cần attention**
#5345 cho thấy extensibility không hoạt động như mong đợi. Cần rõ ràng hóa contract giữa QwenPaw và OpenAI-compatible providers.

### 4. **Context management đang evolve**
Hai approaches đang được explore (scroll #5321, recency ranking #5325). Cần architectural decision về long-term direction.

### 5. **Community health tốt**
Nhiều first-time contributors, code review process active, responsive maintainers. Duy trì momentum này.

</details>

<details>
<summary><strong>Hermes-Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# 📊 Báo cáo phân tích Hermes-Agent - 23/06/2026

## 🎯 Tóm tắt hôm nay

Hermes-Agent ghi nhận một ngày hoạt động cực kỳ sôi nổi với **30 PR mới và 12 issue được cập nhật**. Dự án đang trong giai đoạn ổn định hóa mạnh mẽ với trọng tâm vào việc sửa lỗi cross-platform (Windows/macOS), cải thiện gateway Discord/Telegram, và tăng cường bảo mật. Đáng chú ý là sự xuất hiện của nhiều bug nghiêm trọng liên quan đến Windows path corruption, Discord double-dispatch, và secret redaction mangles code.

## 🚀 Releases

Không có release chính thức trong 24 giờ qua, nhưng nhiều PR đang hướng tới ổn định hóa cho phiên bản v0.17.1 sắp tới.

## 📈 Tiến độ dự án

### 🔧 Sửa lỗi quan trọng (P1-P2)

**Gateway & Platform Issues:**
- **#51057** (P1): Discord gửi message 2 lần → agent chạy 2 lần và trả lời duplicate trên v0.17.0
- **#51129** [PR]: Fix double-dispatch thông qua thread-starter deduplication
- **#51140** [PR]: Sửa Discord typing indicator không dừng trong threads
- **#48685** [MERGED]: Xử lý race condition khi tạo Discord auto-thread

**Windows Platform:**
- **#51113** [PR]: Fix Windows path corruption và test collection crash trong ACP adapter
- **#51119** [PR]: Thêm `encoding='utf-8'` explicit cho Path.read_text/write_text (Windows mặc định dùng cp1252)
- **#51127**: Bootstrap installer progress bar không bao giờ hoàn thành trên Windows

**Security & Configuration:**
- **#51115** [PR]: Gateway sử dụng `get_secret()` thay vì `os.getenv` để tránh profile token leakage
- **#51122** [PR]: Fix plugin trust policy config bị sai do `bool("false")` = `True`

**Computer Use:**
- **#51132**: Agent từ chối launch apps trên Windows mặc dù cua-driver đã expose MCP tool
- **#51137** [PR]: Expose `launch_app` + `list_apps` như proper actions
- **#51139**: Missing wrappers cho page/hotkey/move_cursor/zoom trong cua_backend

### ✨ Tính năng mới (P3)

**MCP & Project Integration:**
- **#51069**: Request hỗ trợ `.mcp.json` ở project-level
- **#51135** [PR]: Implement tính năng load project `.mcp.json` servers

**Voice & Live Sessions:**
- **#45614** [MERGED]: Thêm live voice session backend với provider selection, budget controls
- **#51131**: Generalize `[voice:transcribed]` tag cho tất cả platforms (hiện chỉ WeChat)

**Search & Memory:**
- **#51125** [PR]: Semantic/hybrid session search với sqlite-vec embeddings
- **#51124** [PR]: Sanitize FTS5 MATCH query để fix silent empty results

**UI/UX:**
- **#51118** [PR]: Thay native browser dialogs bằng in-app ConfirmDialog trong Kanban
- **#49036** [PR]: Spanish (es-ES) locale cho Desktop app
- **#51128** [PR]: Dashboard session filtering (Chats/Automation/All)

**Skills & Project-local:**
- **#51114**: Request hỗ trợ project-local skills scoped to repo/cwd

### 🐛 Bug Fixes quan trọng

**File Operations:**
- **#51141**: `write_file` secret redaction phá hỏng Python variable assignments (ví dụ: `os.getenv("FEISHU_APP_SECRET")`)
- **#50540** [PR]: Ngăn Unicode corruption trong patch tool và line-number corruption

**Process Management:**
- **#51112** [PR]: Detect launchd via `XPC_SERVICE_NAME` cho Telegram /restart trên macOS
- **#39817** [MERGED]: Preserve gateway restart in-flight resume state
- **#45608** [MERGED]: Propagate CLI command failures (exit codes)

**Desktop App:**
- **#42666** [PR]: Stop spinning animation trên archived in_progress todo items
- **#51117** [PR]: Bind new-chat workspace to active profile (fix workspace switching bug)

## 💬 Điểm nổi bật cộng đồng

### 🔥 Issues được quan tâm nhiều nhất:

1. **#12639** (👍 10, 11 comments): Request native Google/Vertex AI provider để bypass OpenRouter 402 errors
   - User phàn nàn OpenRouter charge markup và rate limit quá chặt
   - Cần direct integration với Vertex AI

2. **#37505** (7 comments): Hermes Desktop macOS DMG chỉ build arm64 → fail trên Intel Macs
   - macOS 15.7.4 trên Intel MBP không launch được
   - Cần universal binary hoặc separate Intel build

3. **#27912** [CLOSED]: Telegram passive history mode implemented
   - Wake word detection cho group chats
   - Đã implement và merge vào main

### 🏆 PR hoạt động tích cực:

- **#50494**: macOS gateway fd exhaustion - add launchd NumberOfFiles limits
- **#51109**: Fix Feishu budget loops + duplicate YAML key diagnostics

## 🔒 Ổn định & Bugs

### ❗ Critical Issues (P1):

- **Discord double dispatch** (#51057): Single message → 2 agent runs. Fix đang trong PR #51129
- **File tool Unicode corruption** (#51141, #50540): Secret redaction breaking valid code

### ⚠️ High Priority (P2):

- **Windows encoding issues**: Path operations dùng system locale thay vì UTF-8
- **Security**: Gateway tokens bypass profile scope, plugin trust policy config sai
- **Computer Use**: Agent không thể launch apps mặc dù tool có sẵn
- **macOS restart**: Telegram /restart fail do không detect launchd

### 📋 Medium Priority (P3):

- Bootstrap installer UI freeze trên Windows (update thực sự succeed nhưng không hiển thị)
- Honcho memory provider không check SDK dependency
- FTS5 query với punctuation → silent empty results
- Desktop todo spinning animation không dừng

## 🎁 Yêu cầu tính năng

### Top Requests:

1. **Native Google/Vertex AI provider** (#12639) - để tránh OpenRouter middleware
2. **Project-local .mcp.json** (#51069) - đã có PR #51135 implement
3. **Project-local skills** (#51114) - scoped to repo thay vì profile-level
4. **Voice conversation tagging** (#51131) - generalize [voice:transcribed] cho mọi platform
5. **Telegram passive mode** (#27912) - ✅ Đã implement

### Experimental Features in Progress:

- **Semantic session search** (PR #51125) - sqlite-vec embeddings
- **Live voice sessions** (PR #45614) - ✅ Merged
- **CLI message injection** (PR #51126) - send to running sessions

## 👥 Phản hồi người dùng

### 😤 Pain Points:

- **OpenRouter dependency**: Users muốn direct provider integration để tránh 402 errors và markups
- **Cross-platform issues**: 
  - Windows path/encoding bugs làm gián đoạn workflow
  - macOS Intel users bị bỏ rơi (arm64-only builds)
  - Bootstrap installer UX kém trên Windows
- **Docker image**: Lazy dependencies không install được trong official image (#51136)
- **Discord reliability**: Double-message bug gây phiền nhiễu nghiêm trọng

### 😊 Positive Signals:

- **Active maintenance**: 30 PRs trong 1 ngày cho thấy team rất responsive
- **Community contributions**: Contributors đa dạng (jeeves-assistant, teknium1, etc.)
- **Feature velocity**: Voice, MCP, semantic search đều đang ship
- **I18n effort**: Spanish locale được add (PR #49036)

## 🗺️ Backlog & Roadmap

### Immediate Focus (đang active):

1. **Stability Pass**: 
   - Fix Discord double-dispatch (PR #51129)
   - Windows encoding/path fixes (PR #51113, #51119)
   - Secret redaction corruption (PR #50540)

2. **Platform Expansion**:
   - Native Vertex AI support (#12639)
   - Universal macOS binary (#37505)
   - Docker image lazy-install support (#51136)

3. **Gateway Improvements**:
   - Voice conversation source tagging (#51131)
   - Telegram passive mode refinements
   - Feishu budget loop fixes (PR #51109)

### Medium-term (Next Sprint):

- **Project-local workflows**: MCP configs + skills scoped to repo
- **Search improvements**: Semantic session search (PR #51125)
- **Computer Use**: Complete cua_backend wrapper coverage (#51139)
- **Security hardening**: Profile-scoped secrets, trust policy fixes

### Long-term Themes:

- **Multi-modal**: Voice sessions, live conversations
- **Developer Experience**: Project-local tooling, better Docker support
- **Reliability**: Cross-platform parity, better error handling
- **Internationalization**: Expanding beyond English/Spanish

---

## 📊 Metrics Summary

- **PRs opened**: 30 (1 ngày)
- **PRs merged**: 5 (45608, 39817, 27912, 48685, 45614)
- **Issues updated**: 12
- **Priority breakdown**: 3 P1, 8 P2, 17 P3
- **Platform focus**: 40% gateway/platform bugs, 30% cross-platform fixes, 30% features

**Xu hướng**: Dự án đang trong "hardening phase" trước release tiếp theo, với focus mạnh vào Windows/macOS compatibility và gateway reliability.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*