# Bản tin Hệ sinh thái Hermes Agent 2026-09-24

> Issues: 87 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-09-24 02:00 UTC

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

# Báo cáo Hermes Agent 2026-09-24

## 📊 Tóm tắt hôm nay

Ngày bùng nổ sửa lỗi: 30 PRs mới merge/open, tập trung vào vấn đề mất dữ liệu session (#120582 - truncation mid-session), lỗi compression (#120821 - atomic rewrite fence), và các bug đa nền tảng Windows. Không có release mới. Cộng đồng phản ánh mạnh về reliability issues trong long-running sessions và local model problems.

## 🚀 Releases

Không có releases trong 24h qua.

## 🛠 Tiến độ dự án

### PRs quan trọng merged/mở:

**Critical fixes:**
- #120821 ✅ **Atomic compression fence** - Fix race condition khiến tool results bị stub và args bị truncate giữa session (#120582). SQLite atomic write với proof validation.
- #120883 🔄 **Preserve executed tools** - Tool calls biến mất sau empty-response recovery. Recovery cleanup xóa nhầm `assistant(tool_calls) → tool` pair.
- #120891 🔄 **Bound SQLite backup** - Backup hung indefinitely do concurrent writes. Thêm deadline absolute.

**Platform reliability:**
- #119251 🔄 **Windows exe integrity check** - Hermes.exe corrupted sau build (antivirus stub) → blank window. Re-verify at launch.
- #120889 🔄 **Discover external CLIs** - SSH backend PATH restricted → model picker missing installed CLIs. Use shared resolver.

**Desktop UX:**
- #120899 🔄 **Preserve connection in secondary windows** - Child window lose connection/profile. `connectionId` missing from URL.
- #120900 🔄 **Preserve steer metadata** - Compaction unwrapping dropped `display_kind` → transcript rendering broken.

**Gateway/Platform:**
- #120898 🔄 **Env-only credentials** - Feishu/WeCom với credentials trong `.env` show "not configured". Checker chỉ đọc `config.extra`.
- #84121 ✅ **Telegram topic binding** - Race condition trong topic assignment. Stable tiebreaker added.

### Xu hướng:

1. **Session state corruption** đang ưu tiên hàng đầu - multiple PRs xử lý compression/pruning edge cases
2. **Windows platform parity** - encoding (GBK), path separators, integrity checks
3. **Local models reliability** - CUDA detection, VRAM estimation, UI visibility

## 💬 Điểm nổi bật cộng đồng

**Top discussion issues:**

1. **#120582** (P1, 4💬) - **Production incident: Real data loss** từ proactive prune + compression. Fleet session có patched scripts corrupted mid-turn với state.db evidence. Triggered atomic-rewrite PR.

2. **#59293** (16💬) - **Security: config write bypass** - `hermes config set` disable approval layer un-gated. CLI escapes system-config protection.

3. **#56004** (14💬, 5👍) - **Thinking models lose reasoning** - OpenAI-compatible endpoints strip reasoning between tool calls. Replay không preserve thinking.

4. **#118029** (10💬) - **Enterprise rollout control** - Request unified control plane cho managed SSH installations. Links security assurance requirement.

5. **#120691** (2💬) - **Duplicate model loading** - 2 runtime managers from 1 launch, mỗi cái load 26GB copy của cùng model. macOS 64GB RAM.

## 🐛 Ổn định & Bugs

### Critical bugs:

**Data integrity:**
- Session compression racing → tool args truncated, results stubbed (#120582, #120821)
- Empty-response recovery deletes executed tools (#120883, #120826)
- Proactive prune ignores arg rewrites (#118360)

**Platform-specific:**
- Windows exe corruption → blank window (#112961 - FAST_FAIL_FATAL_APP_EXIT)
- GBK encoding kills gateway (#83851)
- Linux NVIDIA: auto backend resolves nonexistent CUDA asset (#120872)

**Authentication:**
- Cloud agent fails "not signed in" after cookie expiry (#109769)
- xAI 403 classified non-retryable → never refresh OAuth token (#82052)

**Local models:**
- 9B model launched with FFN→CPU on 8GB card despite fitting (#113329)
- Two managers load duplicate 26GB copies (#120691)

### Recent fixes landed:

- Telegram topic binding race (#84121) ✅
- h2 CVE-2026-71554 bump to 4.4.1 (#91240) ✅
- Windows fr-FR timezone strftime crash (#102910) ✅
- Desktop Chinese text mojibake (#53367) ✅

## ✨ Yêu cầu tính năng

**Được đề xuất:**

1. **#120880** - Model sync status visibility - Show last sync, changes, current status trong Settings
2. **#120881** - SDK update checker - Poll npm registry, notify về SDK updates
3. **#117321** - Session takeover - Opt-in cho 1 chat follow you across devices
4. **#35060** - Configurable deliver target - Home Assistant events → WhatsApp/Telegram thay vì notification

**Bundling & packaging:**
- #102765 (mega PR) - Unified package manager, tool bundles, dependency isolation

## 🗣 Phản hồi người dùng

**Pain points chính:**

1. **Long-running sessions unstable** - Tool corruption, compression race, memory staleness (#120582, #66025)
2. **Local models hard to use** - Installation, VRAM estimation wrong, UI hidden on Linux (#120872)
3. **Windows second-class** - Encoding bugs, path issues, integrity problems (#112961, #83851)
4. **Gateway restart fragile** - Named profiles refuse own host, point to default (#120871)
5. **Voice/TTS hardcoded English** - Stop phrases, placeholders ignore i18n (#117801, #86602)

**Positive signals:**
- Fast response to production incident (#120582 → #120821 trong 24h)
- i18n expansion (Indonesian docs #92192, #93632)
- Kaspersky false positive tracked (#120897)

## 📋 Backlog & Roadmap

**Active tracks từ PRs/issues:**

1. **Reliability hardening** - Atomic operations, proof validation, bound timeouts
2. **Platform parity** - Windows/Linux gaps, encoding correctness
3. **Local model UX** - Better VRAM estimation, UI discoverability, backend selection
4. **Session continuity** - Takeover protocol, memory refresh, compression safety
5. **i18n completion** - Indonesian locale, voice phrase localization, BiDi fixes

**Blocked/needs-decision:**
- Enterprise SSH rollout (#118029) - Waiting security assurance spec
- Bundles/package manager (#102765) - Large scope, needs architecture review
- Memory provider ownership (#117487) - Upstream direction change, on hold

**Infrastructure:**
- Bot Screen deployment (#112381) - Hosting-friendly install method
- Webhook session context (#112274) - Closed, needs rethink

---

## So sánh hệ sinh thái chéo

# 📊 Báo cáo So sánh Hệ sinh thái AI Agent - 2026-09-24

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent ngày 24/09/2026 cho thấy **giai đoạn consolidation sau tăng trưởng nhanh**. 9 dự án theo dõi tập trung vào:

**Stability over features**: 7/9 dự án ưu tiên fix bugs production hơn tính năng mới
- Hermes Agent: 30 PRs sửa corruption, compression race
- OpenClaw: v2026.9.6 withdrawn do macOS crash
- NanoBot: 13 PRs fix memory race conditions
- QwenPaw: Context management crisis (#7853 memory leak)

**Multi-agent architecture**: 4 dự án phát triển agent coordination
- Zeroclaw: Agent-to-agent messaging RFC (#11027)
- NanoClaw: Gateway credentials abstraction (v2.4.0)
- QwenPaw: A2A server-side support request (#7958)

**Platform parity**: Windows/Linux gaps đang được vá
- Hermes: GBK encoding, exe integrity checks
- OpenClaw: SQLite WAL issues Docker/Windows
- NullClaw: WSL CPU loop, Android Termux fixes

**Security hardening**: Prompt injection, sandbox escape, credential leaks
- Zeroclaw: 5 PRs về shell command allowlist, workspace confinement
- QwenPaw: Skill directory protection (#7864)
- NanoBot: Atomic write helpers (#5873)

**Dự án chết sàng**: PicoClaw (TLS cert expired 12 ngày), IronClaw (0 engagement)

---

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity Level | Community Mood | Focus chính |
|-------|--------|-----|----------|----------------|----------------|-------------|
| **Hermes Agent** | 87 | 500 | 0 | 🔥🔥🔥 Cao | 😟 Concerned | Session corruption fixes |
| **OpenClaw** | 147 | 500 | 1 (withdrawn) | 🔥🔥🔥 Cao | 😰 Anxious | Update pipeline stability |
| **NanoBot** | 6 | 32 | 0 | 🔥🔥 Trung bình | 😌 Stable | Memory compaction polish |
| **Zeroclaw** | 5 | 50 | 0 | 🔥🔥 Trung bình | 🤔 Deliberate | Security & RFC governance |
| **QwenPaw** | 32 | 24 | 0 | 🔥🔥 Trung bình | 😟 Concerned | Context overflow crisis |
| **NanoClaw** | 4 | 27 | 1 (v2.4.0) | 🔥 Ổn định | 👍 Positive | Gateway architecture |
| **NullClaw** | 17 | 21 | 0 | 🔥 Ổn định | 😣 Frustrated | Low-resource device fixes |
| **PicoClaw** | 1 | 2 | 0 | 💀 Chết sàng | 😡 Angry | Site down (TLS expired) |
| **IronClaw** | 0 | 2 | 0 | 💤 Dormant | 😐 Silent | Maintenance only |

**Metrics:**
- **Activity Level**: Số lượng commits/PRs trong 24h
- **Community Mood**: Từ issue comments và PR reactions
- **Focus chính**: Đề tài được ưu tiên theo PR merge pattern

---

## 3. Vị thế của Hermes Agent

### Điểm mạnh:

✅ **Technical maturity cao nhất**
- 500 PRs = nhiều nhất trong nhóm
- Atomic write với proof validation (#120821) → architectural best practice
- Fast incident response: #120582 production data loss → #120821 fix trong 24h

✅ **Platform coverage rộng**
- Windows/Linux parity đang được đẩy mạnh
- Local model support (CUDA detection, VRAM estimation)
- Desktop + Gateway + Cloud agent tích hợp

✅ **Enterprise-ready concerns**
- Security assurance spec (#118029)
- Multi-user access đang được thảo luận (#7318 ở QwenPaw context)
- SSH rollout control đang được track

### Điểm yếu:

❌ **Critical reliability issues chưa giải quyết hết**
- Long-running session unstable (tool corruption, compression race vẫn xảy ra)
- Context management chưa robust như QwenPaw's agent-autonomous approach
- Windows vẫn second-class citizen (encoding, path, integrity bugs)

❌ **Local model UX tệ**
- Installation khó (#120872), VRAM estimation sai, UI hidden trên Linux
- Chậm hơn NullClaw (đã có bounded timeout MCP #996, stack tuning #985)

❌ **Không có release trong 24h** → velocity thấp hơn NanoClaw (v2.4.0), OpenClaw (attempted 2026.9.6)

### So sánh trực tiếp:

**vs OpenClaw**: Hermes ổn định hơn (không có withdrawn release), nhưng chậm hơn về feature velocity (OpenClaw 178 commits vs Hermes estimate ~30-50 PRs từ report)

**vs Zeroclaw**: Zeroclaw focus security sâu hơn (5 PRs sandbox/allowlist), RFC governance mạnh, nhưng cộng đồng nhỏ hơn

**vs QwenPaw**: QwenPaw có agent-autonomous context management request (#7733) mà Hermes chưa có → architecture gap

**vs NanoClaw**: NanoClaw clean gateway abstraction (v2.4.0), Hermes vẫn đang sửa gateway integration bugs (#120871)

---

## 4. Hướng kỹ thuật chung

### 4.1 Context Management Evolution

**Problem**: Tất cả dự án gặp context overflow/corruption
- Hermes: Compression racing (#120582, #120821)
- OpenClaw: Cache rewrite every turn (4-8x cost #140129)
- NanoBot: Oversized results abort turn (#5879)
- QwenPaw: `view_image` base64 cumulative leak (#7853)

**Solution patterns**:
1. **Atomic operations**: Hermes #120821, NanoBot #5873
2. **Proof validation**: Hermes SQLite atomic write với validation
3. **Agent-driven compaction**: QwenPaw #7733 (advance notice), NanoBot #5885 (token threshold gate)
4. **Continuation/pagination**: NanoBot #5880 (recover oversized), NanoBot #5877 (grep incremental)

**Trend**: Shift từ **reactive pruning** sang **agent-autonomous memory management**

---

### 4.2 Multi-Agent Architecture

**Current state**: 4/9 dự án có active work
- Zeroclaw: A2A messaging RFC (#11027)
- NanoClaw: Gateway credential abstraction (v2.4.0 shipped)
- QwenPaw: A2A server request (#7958)
- NanoBot: Subagent transcript persistence (#5291 merged)

**Patterns emerging**:
1. **Credential isolation**: NanoClaw OneCLI vs Iron Proxy, per-gateway auth stores
2. **Session isolation**: Zeroclaw RFC propose separate message streams không merge history
3. **Resource admission control**: Zeroclaw RFC #10970 (per-agent bounds tránh OOM)

**Gap**: Hermes chưa có multi-agent story rõ ràng. #118029 enterprise SSH rollout mention "managed installations" nhưng không có RFC/design doc

---

### 4.3 Security Hardening

**Attack vectors addressed**:

| Vector | Dự án giải quyết | Approach |
|--------|------------------|----------|
| Prompt injection deletion | QwenPaw #7864, Zeroclaw #9839 | Block destructive commands, sandbox policy |
| Path traversal | Zeroclaw #10381 | Resolve launchers trước workspace |
| Allowlist bypass | Zeroclaw #11061 | High-risk commands block ngay cả allowlist |
| Skill directory exposure | QwenPaw #7864 | File-level protection |
| SQLite race corruption | Hermes #120821, NanoBot #5884 | Atomic write + lock |
| Sandbox escape | Zeroclaw #7821, #9977 | Canonical policy schema, confine mutations |

**Best practices**:
- **Defense in depth**: Zeroclaw có 5 PRs security vs Hermes chỉ fix races
- **Schema-driven enforcement**: Zeroclaw #7821 canonical sandbox_policy
- **Fail-safe defaults**: High-risk commands blocked by default

**Hermes gap**: Không thấy explicit prompt injection defense hay sandbox policy. Shell tool approval layer (#59293) có bypass bug.

---

### 4.4 Platform Portability

**Windows parity issues** (3 dự án):
- Hermes: GBK encoding #83851, exe integrity #112961, fr-FR timezone crash #102910 (fixed)
- OpenClaw: Schema preflight + lease deadlock, SQLite WAL overlay FS
- NullClaw: WSL CPU loop #870, aarch64 SIGSEGV #976 (fixed)

**Solution patterns**:
1. **Encoding correctness**: UTF-8 everywhere, explicit GBK handling
2. **Path separators**: Cross-platform helpers (Zeroclaw, NanoBot atomic write)
3. **Stack limits**: NullClaw #985 (512KB→16MB cho agent turns)
4. **Filesystem quirks**: OpenClaw SQLite WAL Docker overlay, Windows ACL #7943

**Low-resource devices** (NullClaw focus):
- Bounded timeouts MCP #996
- Typing thread stack #978
- `web_search` unusable #871 (DuckDuckGo direct cần)

**Best-in-class**: NullClaw có systematic low-resource focus (Android Termux, WSL, aarch64). Hermes local model VRAM estimation wrong → UX gap.

---

### 4.5 MCP/Tool Integration

**Common bugs**:
- **Tool schema validation**: QwenPaw #7959 (Moonshot reject `anyOf` unions thiếu top-level `type`)
- **Timeout/hang**: NullClaw #991 → #996 (MCP stdio bounded), Hermes #120582 (truncation mid-session)
- **Credential injection**: NanoBot #5878 (log mid-turn messages), Hermes #120898 (env-only credentials checker)

**Plugin systems**:
- OpenClaw: ESM module cache không invalidate reload
- IronClaw: Virtual skill roots clarification #8109
- NanoClaw: Install-wide skill packaging

**Trend**: Shift từ **inline tools** sang **MCP-first + plugin packaging**. Hermes chưa có plugin bundle story (#102765 mega PR đang pending).

---

## 5. Điểm khác biệt

### 5.1 Chiến lược phát triển

**Hermes Agent**: **Breadth-first expansion**
- Nhiều features (Desktop, Gateway, Cloud, local models)
- Bugs nhiều platform (Windows, Linux, macOS)
- Slow to stabilize (critical bugs từ production #120582)

**OpenClaw**: **High velocity, high risk**
- 178 commits/day, aggressive infrastructure refactor (TS6→7, CI routing)
- Withdrawn release (v2026.9.6 macOS crash)
- Update pipeline fragile (nhiều failure points)

**Zeroclaw**: **Security & governance first**
- 5 PRs security trong 1 ngày
- RFC-driven (form require alternatives #11078)
- Slow merge (10 PRs tagged `needs-author-action`)

**NanoClaw**: **Foundation over features**
- v2.4.0 gateway abstraction = architectural investment
- Cleanup debt trước push features (#3871, #3874)
- Clean container lifecycle

**QwenPaw**: **Production hardening**
- Shift từ feature velocity sang stability
- Agent-autonomous patterns (context handover #7733)
- Multi-tenancy Hub roadmap

**NullClaw**: **Resource-constrained first**
- Android Termux, WSL, low-RAM focus
- 9 critical fixes trong 1 ngày (segfault, CPU loop)
- DuckDuckGo web_search instead of Brave API

---

### 5.2 Cộng đồng & Contribution

| Dự án | Contributor diversity | Response time | Governance |
|-------|----------------------|---------------|------------|
| **Hermes** | Medium (core team driven) | Fast (24h fix #120582→#120821) | Implicit |
| **OpenClaw** | High (178 commits, many contributors) | Fast (P0 closed 1-2 days) | Implicit |
| **Zeroclaw** | High (distinguished/principal labels) | Slow (10 PRs needs-author-action) | **RFC-driven** |
| **NanoClaw** | Low (team-driven, few external PRs) | Medium | Implicit |
| **QwenPaw** | Medium (first-time contributors tăng) | Medium (Hub roadmap 33 comments) | Community discussion |
| **NanoBot** | Low (core team) | Fast (issue #5870→#5874 same day) | Implicit |
| **NullClaw** | Low (core team) | Fast (9 fixes 1 day) | Implicit |

**Best governance**: Zeroclaw (RFC form, vote simplification, routing rules)
**Best responsiveness**: Hermes, NanoBot (same-day fixes), NullClaw (9 critical bugs → 9 PRs)
**Best diversity**: OpenClaw (178 commits), Zeroclaw (distinguished contributors)

---

### 5.3 Tính năng độc đáo

**Hermes Agent**:
- ✨ Local model runtime (CUDA/VRAM detection)
- ✨ Cloud agent với cookie-based auth
- ⚠️ Reliability issues (session corruption, compression race)

**OpenClaw**:
- ✨ Codex native compaction với provider state
- ✨ Multi-stage update pipeline (preflight, Doctor, managed-service handoff)
- ⚠️ Update failures nhiều (schema, lint, timeout)

**Zeroclaw**:
- ✨ Host admission control RFC (resource bounds)
- ✨ Multiple models per provider profile (#9809)
- ✨ Agent-to-agent messaging RFC
- ⚠️ Security debt cao (5 PRs active)

**NanoClaw**:
- ✨ Gateway credentials abstraction (OneCLI + Iron Proxy)
- ✨ Container lifecycle clean (atomic stop, cleanup race fixes)
- ✨ TypeSafe Jev + Graphiti knowledge graph skills

**QwenPaw**:
- ✨ Multi-tenant Hub (v2.2.0)
- ✨ Agent-autonomous context management (proposed #7733)
- ✨ A2A server-side support request (#7958)

**NullClaw**:
- ✨ Low-resource device focus (Android Termux, aarch64)
- ✨ DuckDuckGo metasearch thay Brave API
- ✨ Stack tuning (512KB→16MB), bounded MCP timeout

**PicoClaw**:
- 💀 Site down (TLS expired), Keenable web search provider (not merged)

**IronClaw**:
- 💤 Maintenance only (RC 1.4.1, docs clarification)

---

## 6. Mức độ trưởng thành cộng đồng

### Tier 1: Production-ready với active community
**OpenClaw**, **Hermes Agent**, **QwenPaw**
- High PR volume (500, 500, 24)
- Responsive maintainers (P0 closed <48h)
- Production incident handling (Hermes #120582→#120821, OpenClaw withdrawn release recovery)
- Community roadmap discussions (QwenPaw #7318 Hub, 33 comments)

**Indicators**:
- Multiple issues >10 comments
- External contributors với non-trivial PRs
- Security/stability prioritized over features
- Multi-release cadence (OpenClaw attempted v2026.9.6, NanoClaw v2.4.0)

---

### Tier 2: Stable với niche focus
**NanoClaw**, **Zeroclaw**, **NanoBot**, **NullClaw**
- Medium PR volume (21-50)
- Specialized focus (NanoClaw gateway, Zeroclaw security, NullClaw low-resource)
- Core team driven, few external contributors
- RFC/design discussions (Zeroclaw), same-day bug fixes (NanoBot, NullClaw)

**Indicators**:
- <10 comments per issue
- Feature requests explicit (NullClaw #871 web_search, Zeroclaw #10970 admission control)
- Governance experiments (Zeroclaw RFC process)
- Clean release cadence (NanoClaw v2.4.0 foundation)

---

### Tier 3: Early-stage / Maintenance mode
**IronClaw** (maintenance), **PicoClaw** (abandoned?)
- Low activity (0-2 PRs)
- Zero community engagement (IronClaw), critical infra failure (PicoClaw TLS)
- Documentation-only PRs
- No feature development

**Risk signals**:
- PicoClaw: Site down 12 days, TLS cert not renewed → team không có infra access hoặc bỏ dự án
- IronClaw: 0 comments on PRs, RC maintenance only → giữ lights on

---

### Maturity patterns:

**Growing**: QwenPaw (first-time contributors tăng, Hub roadmap), NanoClaw (v2.4.0 foundation)

**Stable**: Hermes (high volume, production fixes), OpenClaw (velocity cao, infra refactor)

**Consolidating**: Zeroclaw (RFC governance tightening), NullClaw (systematic low-resource fixes)

**Declining**: PicoClaw (site down), IronClaw (zero engagement)

---

## 7. Tín hiệu xu hướng

### 7.1 Ngắn hạn (Q4 2026)

🔥 **Context management crisis sẽ spawn new architectures**
- QwenPaw #7733 agent-autonomous handover = direction
- Expect: Context-aware LLM agents với self-management hooks
- Hermes, OpenClaw sẽ phải follow hoặc bị bỏ lại

🔥 **Multi-agent coordination standards**
- Zeroclaw A2A messaging RFC, QwenPaw A2A server, NanoClaw gateway abstraction
- Expect: Standardized inter-agent protocols (giống HTTP cho services)
- Hermes không có multi-agent story = risk tụt hậu

🔥 **Security audits tăng**
- Zeroclaw 5 PRs security, QwenPaw prompt injection defense
- Expect: Enterprise customers yêu cầu security certifications
- Dự án không hardening (Hermes shell bypass #59293) sẽ mất deal

---

### 7.2 Trung hạn (2027)

🌐 **Platform convergence**
- Windows parity được vá (Hermes GBK, OpenClaw SQLite WAL, NullClaw WSL)
- Low-resource devices thành first-class (NullClaw Android Termux trend)
- Expect: Agent runtime chạy desktop/mobile/embedded seamless

🤖 **Plugin ecosystems mature**
- OpenClaw plugin reload, IronClaw skill roots, NanoClaw install-wide packaging
- Hermes #102765 bundles vẫn pending
- Expect: Marketplace-style agent skill distribution (giống VSCode extensions)

🧠 **Memory & knowledge graphs**
- NanoClaw Graphiti (#3870), QwenPaw OpenViking (#7613)
- Expect: Persistent agent memory beyond single sessions
- Long-context models không đủ → cần structured memory

---

### 7.3 Dài hạn (2027+)

🏢 **Enterprise multi-tenancy**
- QwenPaw Hub v2.2.0 = first mover
- Hermes #118029 SSH rollout control
- Expect: SaaS agent platforms với team workspaces, RBAC, audit logs

🔐 **Compliance & governance**
- Zeroclaw RFC-driven development = template cho regulated industries
- Expect: Agent behavior auditing, explainable decision logs
- Dự án không governance trail (Hermes, OpenClaw implicit) = blocker cho healthcare/finance

⚡ **Edge computing agents**
- NullClaw low-resource focus = precursor
- Expect: Agents chạy IoT devices, automotive, wearables
- Bandwidth constraints → local model inference (Hermes CUDA detection relevant)

---

### 7.4 Rủi ro & Consolidation

⚠️ **Dự án sẽ die**:
- PicoClaw (TLS expired = no infra access)
- IronClaw (zero engagement = abandoned?)
- Expect: 3-4 winners trong 9 dự án hiện tại

⚠️ **M&A activity**:
- OpenClaw velocity cao nhưng stability thấp → acquisition target cho enterprise player
- Zeroclaw security focus → target cho compliance-heavy verticals
- NullClaw edge focus → target cho IoT/automotive companies

⚠️ **Standardization battles**:
- A2A protocols, MCP tool schemas, context management APIs
- Winner takes ecosystem (giống REST vs SOAP)
- Hermes không tham gia standards process = risk bị marginalized

---

## 8. Kết luận & Khuyến nghị cho Hermes Agent

### 🎯 Vị thế hiện tại:
**Top 3 về technical maturity**, nhưng **không lead về innovation**. High activity, fast incident response, nhưng **reactive** hơn **proactive**.

### ⚡ Điểm mạnh cần leverage:
1. **Fast incident response** (24h #120582→#120821) → market như "production-ready reliability"
2. **Platform breadth** (Desktop/Gateway/Cloud) → integrate seamlessly thay vì feature parity
3. **Enterprise concerns** (#118029 SSH rollout) → push compliance/audit story

### 🚨 Gaps cần đóng gấp:

**P0 - Architectural**:
1. **Multi-agent story**: Zeroclaw, NanoClaw, QwenPaw đều có. Hermes không có = tụt hậu 2027.
   - Action: RFC cho agent coordination protocol (học Zeroclaw governance)
2. **Context management**: QwenPaw #7733 agent-autonomous > Hermes reactive pruning.
   - Action: Agent-driven context handover hooks
3. **Security hardening**: Prompt injection, sandbox escape chưa addressed.
   - Action: Canonical security policy (học Zeroclaw #7821)

**P1 - Operational**:
1. **Windows stability**: Vẫn second-class (encoding, paths, integrity).
   - Action: Dedicated Windows CI, parity checklist
2. **Local model UX**: Installation khó, VRAM sai, UI hidden.
   - Action: One-click model install, UI discoverability audit
3. **Plugin system**: #102765 bundles pending 6+ tháng.
   - Action: Ship MVP hoặc close issue (decision paralysis = death)

**P2 - Community**:
1. **Governance visibility**: Implicit governance vs Zeroclaw RFC, QwenPaw roadmap.
   - Action: Public roadmap, RFC process cho breaking changes
2. **External contributors**: Core team driven, few first-time contributors.
   - Action: "Good first issue" labeling, contribution guide

---

### 🎲 Chiến lược recommendations:

**Option A: Production reliability leader**
- Double down stability (long-running session fixes, Windows parity)
- Security certifications (SOC 2, ISO 27001)
- Enterprise features (audit logs, RBAC)
- Risk: Boring, lose developer mindshare

**Option B: Innovation leader**
- Ship multi-agent coordination first (beat Zeroclaw RFC to implementation)
- Agent-autonomous context management (beat QwenPaw proposal)
- Plugin marketplace MVP (beat OpenClaw ESM reload fixes)
- Risk: Destabilize production users

**Option C: Platform play** (recommended)
- Position như "agent runtime" (giống Node.js cho JavaScript)
- Gateway architecture = NanoClaw standard
- MCP-first tool integration
- Plugin ecosystem = developer traction
- Security/compliance = enterprise moat
- Balance: Innovation trong architecture, stability trong runtime

---

### 📊 Success metrics (6 tháng):

**Technical**:
- Zero P0 data loss bugs (hiện có #120582 pattern)
- Windows parity score >90% (định nghĩa checklist trước)
- Local model one-click install <5min (measure hiện tại)

**Community**:
- 10+ external contributors with merged PRs (hiện tại ~2-3?)
- Public roadmap với quarterly goals
- RFC process cho 3+ major features

**Business**:
- 5+ enterprise pilots với security requirements
- Plugin marketplace với 20+ community plugins
- Multi-agent coordination demo với 3+ agents

---

**Final take**: Hermes trong **top tier maturity**, nhưng risk **commoditization** nếu không differentiate. Multi-agent + security + plugin ecosystem = moats cần build now. 2027 sẽ có 3-4 winners, Hermes cần pick lane và execute fast.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-09-24

## 1. Tóm tắt hôm nay

Release 2026.9.6 withdrawn - macOS app crash toàn bộ (#156861). Hotfix 2026.9.7 đang làm. npm/Gateway package 2026.9.6 OK. Hôm nay có 178 commit, 30+ PR merge, focus fix stability bugs và refactor internals.

## 2. Releases

### v2026.9.6 (⚠️ withdrawn macOS)
- **Withdrawn**: macOS app crash loop ngay sau update
- **Affected**: macOS app only, npm package stable
- **Workaround**: rollback 2026.9.5 from GitHub releases
- **Status**: 2026.9.7 hotfix đang track

## 3. Tiến độ dự án

### Merged/Active PRs (high impact):

**Infrastructure & Performance**:
- #156829: Migrate TypeScript 6→7, plugin execution không cần TS6 nữa
- #156834: CI thêm Blacksmith budget routing, hosted runners default
- #156158: RunsOn capacity diversify, 32/16 classes → actual 8/4 CPUs matched
- #156788: Session reconciliation lifecycle chạy trong worker phases

**Bug fixes (P0/P1)**:
- #148682: Fix usage undercount Claude CLI multi-call turns (cache cost tính sai)
- #148770: Gateway node connection retire khi pairing changed server-side
- #148039: Browser CDP command cancel sau handshake (fix hang)
- #155994: Copilot reasoning ciphertext preserve với long IDs

**UX improvements**:
- #156914: Hide empty outbox helper khi compose
- #156927: Keep "Back to tasks" button compact
- #156926: Agent narration inline, avatars top-aligned
- #156921: Remove blank space nested tool groups
- #156918: Failed sidebar sessions 1 line only

## 4. Điểm nổi bật cộng đồng

### Top issues (by comments):

**Critical bugs**:
1. **#148707** (16 comments): Reply lost với "no active tool authority snapshot" - 2026.9.4 regression
2. **#156712** (10 comments): `openclaw triage` subprocess hold gateway-lifecycle lock, block restart
3. **#140129** (9 comments): Anthropic cache stuck ~46k, session:sanitized rewrites history

**Update failures**:
- **#146887** (9 comments): 2026.9.3→9.4 fail qua 4 stages: stdio MCP timeout, lint hard-gate, managed-service restore
- **#156861** (7 comments): 2026.9.6 macOS unlaunchable cả 2 Macs
- Multiple update-failure reports (P0, maturity:stable tag)

**Platform-specific**:
- **#156674** (8 comments): macOS 2026.9.5 resource pressure với long-lived Codex workers
- **#99659** (7 comments): OOM killed sau companion app connect

## 5. Ổn định & Bugs

### P0 Critical:
- macOS 2026.9.6 crash loop (withdrawn)
- Update pipeline fragile: schema preflight, managed-service handoff, Doctor timeout
- Gateway lifecycle lock leak từ repair subprocess

### P1 High:
- Cache regression: history rewritten every turn (4-8x cost)
- Reply lost khi second run displace in-flight turn
- Memory search timeout 15s (CLI works fine)
- Matrix E2EE decrypt stop sau Megolm rotation

### Pattern thấy:
- Update process có nhiều failure points không recover clean
- SQLite WAL/lock issues trên Docker overlay FS và Windows
- Plugin reload không invalidate ESM module cache
- Context-engine không nhận senderId trong assemble()

## 6. Yêu cầu tính năng

**Active requests**:
- #40982: Raise/remove 3min no-output watchdog cho long-running tasks
- #80843: web_search provider fallback chain cho quota/network failures
- #48855: Android Gateway support (via Termux)

**In-progress**:
- #147886: Feishu markdown table mode support
- #151453: Chat turn spacing balance, mobile footer align
- #147732: RTL direction paragraph-level cho Persian/Arabic mix

## 7. Phản hồi người dùng

### Pain points:

**Update experience**:
- Nhiều user báo update fail ở nhiều stage khác nhau
- Database migration không rollback clean
- Windows users hit schema preflight + lease deadlock

**Resource usage**:
- macOS 8GB VM struggle với Codex workers
- Sparkle Autoupdate persist 3 days high CPU
- Memory indexer subprocess tốn resource

**Auth & integration**:
- OpenAI Codex OAuth bind wrong workspace
- Gateway/standalone codex CLI separate auth stores
- SecretRef credentials không resolve trong memory indexer

### Positive signals:
- Community active debug (detailed repros với logs)
- Contributors submit fixes nhanh
- Maintainers responsive với P0 issues

## 8. Backlog & Roadmap

### Immediate (this week):
- macOS 2026.9.7 hotfix release
- Fix update pipeline stability
- Resolve gateway lifecycle lock leaks

### Short-term:
- Complete TypeScript 7 migration (#156829 merged)
- CI infrastructure cost optimization
- Plugin system stability (reload, state migration)

### Medium-term architectural:
- #144005: State backup before migrations + rollback support
- Session reconciliation worker phases (#156788)
- Workshop storage operations shared worker (#156110)

### Open questions:
- Android Gateway feasibility (resource constraints)
- web_search provider fallback design
- Long-running task watchdog policy

---

**Risk level hôm nay**: 🔴 High (macOS build withdrawn)  
**Community mood**: 😟 Concerned về update stability, nhưng engaged fix nhanh  
**Development velocity**: 🚀 High (178 commits, nhiều infrastructure refactor)

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-09-24

## 📊 Tóm tắt hôm nay

Ngày sửa lỗi nặng: 13 PR đóng, tập trung vào memory/context compaction bugs, atomic write race conditions, và WebUI preview features. Cộng đồng báo context compaction spam trên Telegram (#5870) và workspace config regression (#5881).

## 🚀 Releases

Không có.

## 🔧 Tiến độ dự án

### Core fixes (merged):

**Memory & Context:**
- #5884 - Fix history compaction race: `_append_lock` giờ bảo vệ `compact_history()`, tránh overwrite concurrent writes
- #5883 - Preserve state cho Codex native compaction, tránh clear provider state sớm
- #5880 - Recover oversized `read_file` results sau compaction với continuation logic
- #5874 - Isolate heartbeat compaction notifications, fix #5870 spam
- #5878 - Log mid-turn injected messages với preview

**WebUI (consolidated stack - all closed):**
- #5847, #5848, #5850-#5856 - Unified preview pane cho files/websites, usage stats, image artifacts, command panels, subtask outputs
- Chiến lược: merge features vào shared preview infrastructure, giữ session-scoped state

**Refactoring:**
- #5873 - Dedupe atomic JSONL write helper → `atomic_write_lines` trong `utils/helpers.py`
- #5877 - Grep incremental context pages, tránh O(n²) rebuild
- #5291 - Persist subagent transcripts vào `subagent/` directory

**Providers:**
- #5875 - IO Intelligence (io.net) provider merged

**Documentation:**
- #5882 - Correct context compaction docs: giờ replace conversation với summary, không giữ recent messages verbatim

### Open work:

- #5885 - Gate idle transcript replacement với token threshold (tránh summarize tiny sessions)
- #5861 - Warm fallback tokenizer in background
- #5824 - `read_file` bounded oversized lines với `column` continuation
- #5780 - Stop autocompaction notifications (proposal)
- #5664 - Bound idle summary cache
- #5520 - Langfuse tracing cho Codex
- #5405 - Manual-only skill invocation với `disable-model-invocation: true`
- #4551 - Heartbeat shared session mode với `isolatedSession: false`

## 🔥 Điểm nổi bật cộng đồng

- **#5870** (closed via #5874) - Telegram spam `Context compacted.` lặp 6+ lần. Root cause: heartbeat dùng user destination cho internal events
- **#5881** (open) - Config validation regression: `_nanobot` directory bây giờ cấm trong workspace, breaking existing setups. User yêu cầu rollback hoặc make optional

## 🐛 Ổn định & Bugs

**Critical fixes (merged):**
- Memory race condition: concurrent append + compaction có thể mất data
- Context compaction overwriting Codex native state
- Oversized tool results abort turns sau successful compaction
- WebUI stale restart prompts sau reconnect
- Windows `PermissionError` retry (#5382 - merged sau nhiều tháng)

**Open issues:**
- #5879 - Large `read_file` delta survive compaction unsummarized → abort turn (fixed by #5880)
- Config validation (#5881) breaking backward compatibility

## ✨ Yêu cầu tính năng

**Merged:**
- Native WhatsApp voice (STT+TTS) - #2152 (Fish Audio integration)
- Boot notification qua WhatsApp - #2160
- Linear native agent UX improvements - #5871
- IO Intelligence provider - #5875

**Open:**
- Manual-only skill invocation - #5405
- Heartbeat shared session mode - #4551
- Langfuse Codex tracing - #5520

## 💬 Phản hồi người dùng

Positive: WebUI preview stack consolidation, memory fixes, provider ecosystem growth

Negative:
- Context compaction UX confusing (spam notifications, không rõ khi nào trigger)
- Config validation quá strict (#5881) - breaking production setups
- Docs lag behind behavior (context compaction docs just fixed in #5882)

## 🗓️ Backlog & Roadmap

Priorities inferred từ `priority:p0/p1` labels:

**P0:**
- Memory append race (#5884) ✅
- Large file read recovery (#5880) ✅

**P1:**
- Context compaction UX (#5870, #5780) - partially fixed
- Telegram spam isolation ✅
- Tokenizer warmup lag (#5861) - open

**P2 infrastructure:**
- Idle compaction improvements (#5664, #5885)
- Atomic write deduplication (#5873) ✅
- Subagent transcript persistence (#5291) ✅

Xu hướng: Stability pass sau feature growth period. Memory/context subsystem under heavy refactoring.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-09-24

## 1. Tóm tắt hôm nay

Zeroclaw tập trung vào security hardening và RFC governance. Nhiều PR về sandbox policy, access control, agent-to-agent messaging. Không có release mới. Hoạt động chính: sửa lỗi security, cải thiện quy trình RFC.

## 2. Releases

Không có releases trong 24h qua.

## 3. Tiến độ dự án

### Security & Architecture (ưu tiên cao)

**RFC đang review:**
- **#10970** - Host admission control cho multi-agent machines. Đề xuất resource bounds per-agent để tránh OOM khi chạy nhiều agent. Status: needs maintainer review.
- **#11027** - Agent-to-agent session messaging. Cho phép agents trao đổi trực tiếp không merge history. Status: needs maintainer review, 3 comments.

**Security fixes đang active:**
- **#10381** (XL, 8 tuần) - Resolve host launchers trước workspace cwd. Fix path injection qua malicious workspace. Distinguished contributor.
- **#11061** (mới, high-risk) - Block high-risk shell commands ngay cả khi trong allowlist. Fix bypass `rm -rf` qua allowlist.
- **#9839** (6 tuần) - Block destructive commands (`rm -rf`, `dd`, `mkfs`). Needs author action.
- **#7821** (14 tuần, XL) - Canonical sandbox_policy schema với application-layer enforcement. Needs author action.
- **#9977** (6 tuần, XL) - Confine filesystem mutations to workspace. Distinguished contributor.

### Channel improvements

- **#10980** (XL) - WhatsApp PDF preview thumbnails. Render first page của PDF thành preview. Needs maintainer review.
- **#11065** (mới) - Dependency updates: matrix-sdk 0.19, rusqlite 0.40, otel 0.33.
- **#10084** (5 tuần, XL) - Fix WhatsApp passkey gate để hoàn thành device linking. Needs author action.

### Tools & Runtime

- **#11076** (mới, XL) - Add `agy_cli` tool cho Google Antigravity CLI (thay Gemini CLI deprecated).
- **#10746** (2 tuần) - Plugin install verification. Load-verify WASM component trước khi copy.
- **#10599** (3 tuần) - Cron non-execution recording để silent failures visible.

### Multi-model & Provider

- **#9809** (7 tuần, XL, principal contributor) - Multiple models per provider profile. `[providers.models.<family>.<alias>.models.<model>]`. Needs author action.
- **#10172** (5 tuần, XL) - Preserve configured provider profile semantics, không collapse `<family>.<alias>` về bare family.

### Governance

- **#11079** (mới, docs) - Contributing guide: route work by author's knowledge (biết how → PR, biết what → issue).
- **#11078** (mới) - RFC form require alternatives section.
- **#10855** (10 ngày) - Implement RFC vote simplification (FND-003 Rev. 19).
- **#9817** (CLOSED, parking-lot) - RFC routing rules update.

## 4. Điểm nổi bật cộng đồng

**Tracker issues:**
- **#8692** (15 comments) - Maintainer decision queue cho RFCs. Vẫn đang active.
- **#10814** - Release efficiency tracker. Track cải thiện release workflow sau v0.8.5.

**Contributor highlights:**
- @JordanTheJet, @Audacity88: distinguished contributors, nhiều PR security/architecture.
- @NiuBlibing: principal contributor, multi-model support (#9809).
- @RustLangLatam: WhatsApp features, voice-note docs.
- @tunglambk: security fix #11061.

## 5. Ổn định & Bugs

**High-risk bugs đang fix:**
- **#11061** - Shell command allowlist bypass (high priority).
- **#10600** (3 tuần) - Channels report success cho messages chưa gửi. Needs author action.
- **#10599** - Cron silent failures không visible.
- **#10813** (11 ngày) - Headless SOP step turns drive own run (recursive SOP engine).
- **#9819** (7 tuần, XL) - Image validation prevent corrupt images fail provider requests. Principal contributor.

**Dependencies:**
- **#11065** - Major version bumps: matrix-sdk, rusqlite, otel. Cần verify compatibility.

## 6. Yêu cầu tính năng

**Đã có RFC/PRs:**
- Agent-to-agent messaging (#11027) - coordination không merge history.
- Host admission control (#10970) - resource bounds cho multi-agent deploys.
- PDF thumbnails cho WhatsApp (#10980).
- Antigravity CLI tool (#11076) - Google's new Gemini interface.
- Export agent to portable bundle (#9986, 5 tuần) - move agents giữa installs.

**Chưa có implementation:**
- #11050 - Pace native polls với outbound messages (follow-up).

## 7. Phản hồi người dùng

**Pain points từ issues/PRs:**
- Security: nhiều path injection, allowlist bypass cases. Team focus vào hardening.
- Multi-agent resource management: cần bounds để tránh OOM (#10970).
- WhatsApp UX: thiếu PDF previews, voice-note docs unclear.
- Cron debugging: silent failures khó troubleshoot (#10599).
- Provider config: dotted profiles bị collapse, gây confusion (#10172).

**Positive signals:**
- Contributor engagement tốt: distinguished/principal contributors active.
- RFC process đang được refine (#11078, #11079, #10855).
- Test coverage mentions trong nhiều PRs.

## 8. Backlog & Roadmap

**Từ trackers:**
- **#8692** - Maintainer decision queue: 5 RFCs pending review (including #10970, #11027).
- **#10814** - Release efficiency: measure v0.8.6+ against v0.8.5 workflow baseline.

**Parking lot:**
- #9817 - RFC routing docs (closed, deferred).
- #10172 - Provider profile semantics (parking-lot label, needs resolution).
- #10133 - Panic-free operational paths (refactor, deferred).

**Blocked/needs action:**
- 10 PRs tagged `needs-author-action` (includes #10381, #7821, #9839, #10600, #10084, #10391 - high-impact).
- 6 PRs tagged `needs-maintainer-review` (includes #10970, #11027, #11061, #10980).

**Patterns:**
- Security debt being paid down systematically.
- Multi-agent/multi-model capabilities maturing.
- Governance process tightening (mandatory RFC alternatives, faster votes).
- Channel parity work (WhatsApp features catching up).

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 Báo cáo PicoClaw – 24/09/2026

## 1. Tóm tắt hôm nay

Không có hoạt động mới ngày 24/09. Có 2 mục đang active từ trước: issue **CRITICAL** về TLS cert hết hạn làm sập site chính, và PR thêm Keenable web search provider. PR phone pairing đóng ngày 23/09.

---

## 2. Releases

Không có.

---

## 3. Tiến độ dự án

**PR đang mở:**

- **#3370** – Keenable web search provider  
  Thêm provider mới cho `web_search`, không cần API key, gọi endpoint public `/v1/search/public`. Tạo từ 07/09, update 23/09, chưa merge.

**PR đã đóng:**

- **#3344** – Build Remote Agent phone pairing (đóng 23/09)  
  Tính năng ghép phone để theo dõi desktop agent qua protocol `gbr/1`. Install MIT `gbr-agent`, QR + 8-char code, attach `127.0.0.1:8788` hoặc stdio.

**Xu hướng:**  
Tích hợp thêm tool provider bên ngoài (Keenable). Remote debugging/monitoring (phone pairing) mới đóng → có thể thử nghiệm xong hoặc bỏ.

---

## 4. Điểm nổi bật cộng đồng

**Issue #3377** – TLS cert expired (🔥 CRITICAL)  
- Cert của **picoclaw.io** hết hạn **10/09/2026**, site down cho tất cả browser.  
- Tạo 12/09, update 23/09, 2 comment, 1 👍.  
- **Quan trọng nhất**: homepage dự án không truy cập được, ảnh hưởng onboarding user mới và tín nhiệm dự án.

Không có PR/issue nào khác có tương tác đáng kể.

---

## 5. Ổn định & Bugs

**🚨 Issue #3377 – TLS cert expired**  
- Site chính không accessible → blocker cho user mới và docs.  
- Đã 12 ngày kể từ khi cert hết hạn, 2 ngày kể từ khi issue mở → phản ứng chậm hoặc team không có quyền renew cert ngay.  
- Cần ưu tiên cao: renew cert, setup auto-renewal (Let's Encrypt), hoặc chuyển docs sang subdomain backup.

Không có bug kỹ thuật nào khác được báo cáo ngày hôm nay.

---

## 6. Yêu cầu tính năng

**PR #3370** – Keenable web search  
Không phải yêu cầu từ user, là contribution từ tác giả Keenable (@ilya-bogin-keenable).  
Cho phép dùng Keenable như tool web search không cần key, cạnh tranh với provider hiện có (có thể là Google/Bing/Brave).

Không có feature request nào khác ngày hôm nay.

---

## 7. Phản hồi người dùng

**Issue #3377:**  
User @dimonb báo site down, có 1 upvote → có người khác cũng gặp.  
Chưa có comment từ maintainer → user không biết timeline fix.

**PR #3370:**  
Không có feedback từ maintainer sau 16 ngày mở. Có thể đang review hoặc chưa ưu tiên merge.

---

## 8. Backlog & Roadmap

Không có thông tin roadmap từ data.

**Ưu tiên cần làm:**
1. ⚠️ Fix TLS cert cho picoclaw.io (blocker)
2. Review PR #3370 (Keenable) – quyết định merge hay decline
3. Setup cert auto-renewal để tránh lặp lại

**Rủi ro:**  
Cert expired 12 ngày mà chưa fix → có thể team thiếu access đến infra hoặc không active maintain. User mới không vào được site → churn rate tăng.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# 📊 Báo cáo NanoClaw - 2026-09-24

## 1. Tóm tắt hôm nay

Ra mắt **v2.4.0** với gateway credentials qua skills (OneCLI default, Iron Proxy mới). 27 PR merge/đóng trong ngày, tập trung fix stability: update-nanoclaw cutover, transcript rotation, container lifecycle. Team đang tích cực polish experience trước khi push tính năng lớn tiếp theo.

## 2. 🚀 Releases: v2.4.0

**Phát hành**: 2026-09-23 (chính thức đi vào production hôm nay)

**Tính năng chính**:
- 🔐 **Gateway credentials qua skills**: OneCLI vẫn default, thêm Iron Proxy gateway
- 🏢 **Community portal setup**: image Echo đã hardened + managed Slack app
- ⚙️ **Model controls**: install-wide và per-group speed/model settings
- 💬 **Mattermost channel**: mở rộng integrations
- 🔄 **OpenCode provider rework**: cải thiện authentication flow
- 🤖 **Claude Opus 5.5**: model default mới

**Ý nghĩa**: Đây là bản foundation cho multi-gateway architecture. Cho phép users chọn credential provider (OneCLI vs Iron Proxy) mà không thay đổi provider login flow. Mở đường cho enterprise deployments với strict security requirements.

## 3. 📈 Tiến độ dự án

### Merge hôm nay (quan trọng):

**Core stability fixes**:
- ✅ #3873: Fix update-nanoclaw cutover - stop containers thay vì wait (bug #3828)
- ✅ #3876 + #3875: Teams bot display name → prompt name khi `assistant_name` unset
- ✅ #3878: Stop ping agent container trước khi xóa folder (cleanup race)
- ✅ #3868: Bump Claude Code 2.1.280 + Agent SDK 0.3.280
- ✅ #3866 + #3867: Codex wait for MCP servers, pin @openai/codex 0.155.1

**Gateway architecture** (chuỗi PR foundation):
- ✅ #3815: Centralize credential gateway contract
- ✅ #3816: Extract OneCLI thành installable skill
- ✅ #3817: Add Iron Proxy gateway
- ✅ #3818: Gateway selection trong setup (không ảnh hưởng provider login)
- ✅ #3825: OpenCode auth qua Iron Proxy
- ✅ #3872: Fix Codex work qua Iron sau rejected WebSocket upgrade

### Đang review/mở:

🔥 **High priority**:
- #3871: Transcript rotation giữa warm turns (fix #3732 - recurring tasks)
- #3878: Cleanup race trong setup ping agent

🎯 **Feature skills**:
- #3848: `/add-typesafe-tool` - TypeSafe Jev judgments làm container tool
- #3870: `/add-graphiti` - knowledge-graph memory với Neo4j
- #3503: Apple Container support (macOS microVM thay vì Docker)

**Xu hướng**: Focus rõ ràng vào **stability over features** trong đợt này. 8/27 PR hôm nay là fixes, 6 PR là gateway refactor. Team đang consolidate foundation trước khi scale.

## 4. 💡 Điểm nổi bật cộng đồng

### Issues nhiều tương tác:

❌ **Critical bugs đã fix**:
- #3869 (closed): `update-nanoclaw` crash thiếu transitive imports → fix #3750 merge
- #3828 (closed): Cutover drain never succeed → fix #3873 merge
- #3732 (open, 1 comment): Transcript rotation never runs → PR #3871 đang review

🔒 **Security concerns**:
- #3874 (mới, 0 comment): OneCLI gateway ownership check dùng group existence thay vì installation identity - chưa có response từ maintainers

**Phản hồi**: Issues được close nhanh (1-2 ngày), cho thấy team responsive. Security issue #3874 mới đăng, cần follow.

## 5. 🐛 Ổn định & Bugs

### Đã sửa hôm nay:

✅ **Container lifecycle**:
- Update-nanoclaw cutover: stop containers explicitly thay vì poll wait
- Setup cleanup: stop ping agent trước khi xóa folder
- Better-sqlite3 rebuild detection: check broken addon không chỉ missing

✅ **Gateway/auth**:
- Codex qua Iron Proxy: fix token refresh 400 error
- Teams bot display name propagation
- MCP server wait timing trong Codex

### Còn open:

⚠️ **Transcript rotation** (#3732): Recurring tasks keep container alive → never rotate. PR #3871 đang fix bằng cách rotate giữa warm turns.

⚠️ **Security** (#3874): OneCLI ownership check potentially exploitable - chưa có PR.

### Đánh giá:

Container lifecycle đã ổn định hơn nhiều sau đợt fixes hôm nay. Gateway architecture solid. Vẫn còn edge cases với long-running containers.

## 6. ✨ Yêu cầu tính năng

### Skills đang review:

1. **`/add-typesafe-tool`** (#3848): TypeSafe Jev cho classification/routing - giảm load agent, tăng consistency
2. **`/add-graphiti`** (#3870): Knowledge graph memory với Neo4j - long-term context
3. **Apple Container** (#3503): macOS microVM thay Docker - isolation tốt hơn

### Patterns:

- Skills > core features: extensibility first
- Memory/context enhancements: knowledge graphs, transcript rotation
- Platform diversity: Apple Container, Mattermost, Iron Proxy

Không thấy breaking feature requests - users tập trung vào polish hiện tại.

## 7. 💬 Phản hồi người dùng

**Từ issues/PRs**:

👍 **Positive**:
- Gateway abstraction được đón nhận tốt (OneCLI + Iron Proxy)
- Update process đang được fix kỹ - users đánh giá cao

😐 **Pain points**:
- Container lifecycle edge cases gây confusion (transcript rotation, cutover timing)
- Security concerns được raise nhưng chưa nhiều discussion (#3874)

**Không thấy** complaints về breaking changes - migration path smooth.

## 8. 🗺️ Backlog & Roadmap

### Short-term (suy từ PR activity):

1. **Polish v2.4.0**: Fix remaining container lifecycle issues (#3871)
2. **Security audit**: Resolve #3874 ownership check
3. **Skills pipeline**: Merge TypeSafe + Graphiti nếu reviews pass

### Medium-term (suy từ open PRs):

- **MCP policy enforcement** (#3551, #3552): Per-group remote MCP routing
- **macOS support** (#3503): Apple Container alternative
- **CLI improvements** (#3275): `ncl` symlink trên upgrade path

### Signals:

- **No major feature branches** visible - consolidation phase
- Gateway architecture done → có thể pivot sang features khác
- Memory/knowledge work (Graphiti) suggests **long-context agents** là focus tiếp

---

**Kết luận**: v2.4.0 là bản **foundation release**. Team đang cleanup debt trước khi push next big thing. Gateway architecture solid, container lifecycle gần stable. Expect tăng tốc features sau khi remaining bugs (#3732, #3874) được fix.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw 2026-09-24

## Tóm tắt hôm nay

Không có release mới. Hoạt động tập trung vào đóng 9 PR sửa lỗi nghiêm trọng (segfault, CPU loop, use-after-free) và cải thiện memory recall. 6 PR còn mở đợi review. Cộng đồng báo lỗi với thiết bị yếu, Discord, Telegram idle.

## Releases

Không có.

## Tiến độ dự án

### PR đóng (9 mục)

**Sửa lỗi crash/hang:**
- #996: bound timeout cho MCP stdio, tránh hang indefinitely (#991)
- #985: tăng stack 512KB→16MB cho agent turn, fix SIGSEGV trên Telegram (#976)
- #978: typing thread Discord chạy trên heavy stack, fix overflow khi TLS handshake
- #980: persist paired token khi /pair, scheduler tool đọc từ disk được (#839)
- #984: poll thread Telegram/Matrix fail nhiều → supervisor kill, fix idle silent (#972)

**Tính năng mới:**
- #981: thêm `grok-cli` provider cho xAI Grok CLI
- #979: memory recall configurable (`auto_recall`, `recall_limit`, `max_context_bytes`) (#919)
- #969: approval flow hai vòng cho shell tool (approval_request/response)

**Cấu hình:**
- #986: `memory.database_path` configurable, tách SQLite path khỏi workspace (#548)

### PR mở (6 mục)

- #970: arrow key support trong REPL CLI (#865)
- #953: recover Discord gateway socket khi closed
- #954: fix use-after-free trong cron one-shot, message fail silent (#941)
- #959: persist paired token via SecretStore (ChaCha20-Poly1305)
- #962: docs cho native Anthropic provider + OAuth (#767)
- #963: docs Weixin iLink QR auth (#817)
- #966: curl fallback trên Android (Termux DNS fail)
- #971: native tool calls trong SSE streaming
- #987: loop hygiene cho tool-heavy runs (compress output, cache system prompt)
- #777, #776: docs cleanup + MCP/subagents/skills/voice/hardware docs

### Xu hướng phát triển

- **Stability first**: 9 PR sửa crash/hang/silent-fail merged ngay
- **Resource-constrained devices**: Stack size, timeout, typing thread fix cho WSL/Android/low-RAM
- **Configuration flexibility**: Memory recall, database path, approval flow đều configurable
- **Documentation debt**: 2 PR docs lớn (#776, #777) mở 6 tháng chưa merge

## Điểm nổi bật cộng đồng

Top issues theo bình luận:

1. **#871** (8 comments, 👍0): `web_search` không chạy được trên thiết bị yếu, Brave API cần key, DuckDuckGo không support trực tiếp
2. **#972** (5 comments, 👍1): Telegram channel die sau idle qua đêm → **fixed** bởi #984
3. **#915** (5 comments, 👍1): scheduler unauthorized → **fixed** bởi #980
4. **#976** (4 comments, 👍0): SIGSEGV mọi message Telegram trên aarch64 → **fixed** bởi #985
5. **#865** (4 comments, 👍0): CLI arrow keys hiển thị CTRL chars → **PR #970** đang mở

**PR HOT:**
- #965: streaming tool-call support (closed)
- #996: MCP timeout fix (closed)

## Ổn định & Bugs

### Fixed hôm nay

✅ **SIGSEGV Telegram** (#976 → #985): Stack 512KB không đủ cho agent turn path, tăng 16MB  
✅ **Telegram idle silent** (#972 → #984): Poll thread fail không báo supervisor, thêm aging logic  
✅ **Scheduler unauthorized** (#915 → #980): paired token generate nhưng không write file  
✅ **MCP hang** (#991 → #996): stdio response wait không timeout, thêm bound  
✅ **Discord CPU 100%** (typing thread overflow → #978): TLS handshake stack overflow  

### Mở chưa fix

🔴 **Critical (#871)**: `web_search` không khả dụng thiết bị yếu, cần DuckDuckGo direct support  
🟡 **WSL2 CPU loop (#870)**: gateway accept4 busy loop 100% CPU ngay cả idle  
🟡 **CLI arrow keys (#865)**: CTRL chars thay vì di chuyển cursor → PR #970 đang review  

### Regression risk

- #984: supervision timeout mới có thể kill thread healthy khi network lag
- #985: 16MB stack/thread tăng memory usage đáng kể trên multi-session

## Yêu cầu tính năng

### Đã implement

- **Memory recall tuning** (#919 → #979): disable auto-recall, tune limit/context bytes
- **Approval flow** (#969): two-turn shell tool approval cho destructive commands
- **Database path config** (#986): tách SQLite khỏi workspace cho read-only deploy
- **Grok CLI provider** (#981): local `grok` CLI support

### Đang đợi

- **Vision pipeline** (#624, 2 comments): gửi image/file trực tiếp, auto base64 encode
- **DDGS search** (#623, 2 comments): metasearch aggregator thay Brave API
- **/status endpoint** (#631, 2 comments, 👍1): HTTP GET JSON cho monitoring
- **Subagent spawn** (#190, 3 comments): multi-agent với different provider (#190)
- **WeChat QR login** (#817, 3 comments): confirm support hay plan
- **CloudFlare/nginx tunnel** (#495, 2 comments): web channel qua tunnel thay public IP

## Phản hồi người dùng

### Pain points

1. **Low-resource devices**: web_search không chạy (#871), SIGSEGV (#976), CPU loop (#870)
2. **Idle reliability**: Telegram/Matrix silent sau đêm (#972) - đã fix
3. **CLI UX**: arrow keys broken (#865) - PR pending
4. **Scheduler broken**: unauthorized (#839, #915) - đã fix

### Positive signals

- User report "LLM works fine, tool calling works mostly fine" (#915)
- User persist với workarounds (self-written skills #624)
- Detailed bug reports với environment info (#976, #870, #991)

## Backlog & Roadmap

### Near-term (PR open)

- Arrow key CLI (#970)
- Discord reconnect (#953)
- Cron one-shot fix (#954)
- Native streaming tools (#971, #965)
- Loop hygiene (#987)

### Documentation debt

- MCP/subagents/skills/voice/hardware docs (#776) - 6 tháng mở
- Archive stale planning docs (#777) - 6 tháng mở
- Anthropic provider docs (#962) - chờ merge
- Weixin iLink docs (#963) - chờ merge

### High-impact unaddressed

- **DuckDuckGo direct support** (#871) - critical cho use case core
- **WSL2 CPU loop** (#870) - ảnh hưởng Windows dev
- **GET /status endpoint** (#631) - cần cho production monitoring

### Long-term asks

- Vision pipeline (#624)
- Subagent orchestration (#190)
- Alternative web channels (#495)

---

**Takeaway**: Team ưu tiên stability - 9 critical fixes merged trong 1 ngày. Resource-constrained target rõ ràng (stack tuning, timeout bounds, typing thread). Documentation và feature requests tích lũy. Core bugs còn: web_search unusable, WSL CPU loop.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-09-24

## 1. Tóm tắt hôm nay

Hoạt động thấp. 2 PR tài liệu và release candidate. Không có issue mới, không có tương tác cộng đồng.

## 2. Releases

Không có release chính thức. PR #8110 chuẩn bị RC2 phiên bản 1.4.1.

**Nội dung RC 1.4.1-rc.2:**
- Fix OAuth cho Google extension (tiếp từ RC1)
- Cập nhật dependency bảo mật: wasmtime 47.0.4, rustls 0.23.45
- Scope giống RC1, chỉ vá lỗ hổng

Đây là maintenance release, không có tính năng mới.

## 3. Tiến độ dự án

**PR #8110** - Release candidate 1.4.1-rc.2
- Loại: chore/release
- Size: M, risk: low
- Tác giả: @serrrfirat (core contributor)
- Mục đích: vá bảo mật dependency, giữ nguyên scope OAuth fix

**PR #8109** - Clarify virtual skill roots
- Loại: documentation
- Tác giả: @mmemcormier
- Cập nhật docs về cách discovery skill directories
- Làm rõ scoped roots: `/skills`, `/system/skills`, `/tenant-shared/skills`
- Phân biệt runtime discovery vs legacy disk imports

**Xu hướng:** Không có phát triển tính năng. Focus maintenance và clarity.

## 4. Điểm nổi bật cộng đồng

Không có. 0 bình luận, 0 reactions trên cả 2 PR.

## 5. Ổn định & Bugs

**Vấn đề đã fix (trong RC):**
- Google extension OAuth bug (đã có trong RC1)
- Advisory database yêu cầu patch wasmtime và rustls

**Mức độ:** Low-risk, maintenance patches.

## 6. Yêu cầu tính năng

Không có feature requests trong 24h qua.

## 7. Phản hồi người dùng

Không có tương tác từ người dùng. Cả 2 PR không có comment hay reaction.

## 8. Backlog & Roadmap

Không có thông tin roadmap mới. Dựa trên hoạt động:
- RC 1.4.1 đang được finalize
- Docs cleanup tiếp tục (skill discovery)
- Không thấy tín hiệu về tính năng lớn sắp tới

---

**Nhận xét:** Ngày rất yên tĩnh. Core team làm housekeeping (docs + security patches). Không có engagement từ external contributors hay users. Dự án đang trong maintenance phase hoặc giữa 2 release cycles lớn.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw (2026-09-24)

## 📋 Tóm tắt hôm nay

QwenPaw tập trung vào **ổn định hệ thống** và **trải nghiệm người dùng**. Ngày hôm nay không có release mới, nhưng có 24 PRs và 32 issues hoạt động, trong đó nổi bật là các bản vá bảo mật (skill directory protection #7864), cải thiện context management (#7628, #7733), và sửa lỗi kỹ thuật nghiêm trọng (SQLite lock #7943, context overflow #7853, MCP tool schema validation #7959).

## 🚀 Releases

Không có release mới trong 24 giờ qua. Phiên bản ổn định hiện tại: **v2.2.0** (QwenPaw Hub multi-tenant ra mắt tháng 8/2026).

## 📊 Tiến độ dự án

### PRs quan trọng đang mở:

**🔒 Bảo mật & Ổn định**
- **#7864** - Bảo vệ skill directories khỏi prompt injection deletion attacks ⚠️ HIGH PRIORITY
- **#7930** - Sửa SQLite snapshot gây SIGBUS trên Linux khi backup
- **#7960** - Provider recovery sau khi stream cleanup bị stall
- **#7943** - Windows sandbox ACL trên drive root có thể lock volume

**🧠 Context Management**
- **#7872** - Giữ interrupted requests qua context compaction (#7836)
- **#7733** - Feature request: Agent-autonomous context management (4 👍)

**🎨 Console/UI**
- **#7956** - Tối ưu settings workflows, sidebar interactions
- **#7861** - Multi-tab authenticated chat terminal với xterm
- **#7931** - Durable paginated transcript history với SQLite

**🔌 Tích hợp**
- **#7613** - OpenViking memory plugin (first-time contributor)
- **#7874** - Thiết kế lại PawApp SDK và control plane

### PRs đã đóng (24h qua):

- **#7952** - Phân biệt invitation redemption failures (403 response)
- **#7955** - Docs: Download provenance và usage policy
- **#7941** - Cross-platform tests: batch-3 lock & portability (+2720 test cases, coverage 70.51% → 73.79%)
- **#7409** - Drop empty assistant text blocks (fix Volcengine Ark 400 error)
- **#6854** - Localized approval purpose descriptions

## 🔥 Điểm nổi bật cộng đồng

### 1. **QwenPaw Hub roadmap discussion** (#7318, 33 bình luận, 4 👍)
Community đang thảo luận tính năng tiếp theo cho multi-tenant Hub sau v2.2.0:
- Multi-user access & admin-managed skills (#2324 đã được giải quyết)
- Đề xuất: team workspace, role-based permissions, audit logs

### 2. **Context management crisis** (#7628, #7733, #7853)
Vấn đề nóng: Context compaction vẫn vượt quá provider budget và fail active turns
- #7853: `view_image` base64 không bị prune → memory leak → model context overflow
- #7733: Agent không được thông báo trước khi context eviction xảy ra
- Community yêu cầu agent-autonomous context handover

### 3. **MCP tool schema validation** (#7959)
Moonshot (kimi-k3) reject MCP tools với `anyOf` unions thiếu top-level `type` → HTTP 400 trước khi gọi model

## 🐛 Ổn định & Bugs

### Bugs nghiêm trọng:

**P0 - Nguy cơ mất dữ liệu/bảo mật**
- **#7943** - Windows sandbox ACL trên `C:\` có thể lock toàn bộ ổ đĩa
- **#7864** - Skill directories không được bảo vệ khỏi prompt-injected `rm -rf`
- **#7853** - `view_image` base64 cumulative leak → model context overflow (100% reproducible)

**P1 - Ảnh hưởng sản xuất**
- **#7576** - Tất cả models bị hardcode 32768 context → CONTEXT_UNFIT với >31130 tokens (CLOSED 2026-09-23)
- **#7402** - Empty assistant text blocks → Volcengine Ark 400 "MissingParameter" (CLOSED 2026-09-23)
- **#4227** - MCP stream_http mode stuck khi server trả 401 (timeout block)

**P2 - Trải nghiệm người dùng**
- **#7571** - Agent liên tục quên instructions (TODO files xuất hiện khắp nơi, code vào wrong directory)
- **#2710** - Scheduled task notifications không hiển thị
- **#2335** - Feishu WebSocket drops không auto-reconnect → no response (6-24h uptime)

## 💡 Yêu cầu tính năng

### High demand:

1. **A2A server-side support** (#7958, mới 2026-09-23)
   - Expose QwenPaw agents as discoverable A2A v1.0 peers
   - Complement của #7484 (client-side A2A đã requested 2026-09-02)

2. **Agent-autonomous context management** (#7733)
   - Agent gets advance notice trước context eviction
   - Smooth handover qua compaction
   - Token threshold không đủ → cần agent-driven trigger

3. **Console UI improvements** (#7957)
   - Manually deactivate/disable premade models & channels
   - "OCD users" muốn hide unused features

4. **ChatGPT-5.5 support** (#4474, CLOSED)
   - Đã cấu hình nhưng không hoạt động (resolved)

## 👥 Phản hồi người dùng

### Positive:
- Multi-tenant Hub (v2.2.0) được đón nhận tốt, community hỏi roadmap tiếp theo
- First-time contributors tăng: #6854, #7613 (OpenViking plugin)
- Test coverage tăng mạnh: +2720 cases trong 1 PR (#7941)

### Pain points:
- **Memory issues**: Agent quên context liên tục (#7571), view_image leak (#7853)
- **Channel stability**: Feishu/DingTalk WebSocket drops (#2335, #2414)
- **MCP compatibility**: Moonshot model reject tools (#7959), 401 errors block (#4227)
- **Configuration UX**: Model config errors không rõ ràng (#7950, #7951)

## 📅 Backlog & Roadmap

### Short-term (đang làm):
- ✅ Security hardening: skill directory protection (#7864)
- ✅ Context management fixes: preserve interrupted requests (#7872)
- ✅ Console UX: settings workflow redesign (#7956)
- 🔄 Storage migration: async SQLite/PostgreSQL contracts (#7954)

### Mid-term (community requests):
- A2A server implementation (#7958)
- Agent-autonomous context handover (#7733)
- OpenViking memory integration (#7613)
- PawApp SDK redesign (#7874)

### Infrastructure:
- PostgreSQL multi-instance support (vs. NFS-shared SQLite issues)
- Async storage backend contracts (#7954)
- Cross-platform test coverage expansion (batch-4+)

---

**Xu hướng tổng quan**: Dự án đang chuyển từ **feature velocity** sang **production hardening**. Focus chính: bảo mật (prompt injection), stability (context/memory leaks), và multi-tenancy infrastructure (Hub roadmap). Community engagement cao (33 comments trên roadmap thread), first-time contributors tăng.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*