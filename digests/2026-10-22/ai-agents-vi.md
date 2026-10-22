# Bản tin Hệ sinh thái Hermes Agent 2026-10-22

> Issues: 117 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-22 02:00 UTC

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

# Báo cáo Hermes Agent — 2026-10-22

## 🔥 Tóm tắt hôm nay

Ra v0.22.3 và v0.22.4 trong 24h. Patch loạt lỗ hổng bảo mật dependencies (Pillow, certifi, js-yaml) và sửa Desktop không còn hiện suggestion pills. Gateway session-lock có race condition nghiêm trọng — bump epoch mà không giữ lock, brick write đến khi restart.

## 📦 Releases

### v0.22.4 (Oct 21)
- **Desktop UX cleanup**: Xóa suggestion pills xuất hiện ngẫu nhiên trên composer
- Roll-up plugin và dashboard fixes
- Delivery: CLI, Microsoft Store, Docker, Hermes Cloud

### v0.22.3 (Oct 21)
- Cuộn 620 PR merge từ v0.22.2
- ~2,911 commits, +360K/-64K dòng
- Notes đầy đủ dời đến v0.23.0

## 🚧 Tiến độ dự án

### Security Surge (P3→P2→CLOSED chuỗi)
- **#142831** [OPEN]: Bump Pillow 12.3.0→13.0.0 (28 CVE, 3 critical: GHSA-8g5g-8vmr-9782 heap overflow JPEG decode)
- **#142307** [CLOSED]: Certifi pin 2026.5.20 vẫn trust eMudhra intermediate bị hack (8-bit P-384 keys)
- **#122424** [CLOSED]: js-yaml 4.3.1 trong CVE range, bump→4.3.2 xong
- **#135810/135938** [CLOSED]: multidict 6.7.1 (CVE-2026-104874 ref leak)→6.9.1

### Gateway Core (#106742 aftermath)
Issue #134889 track post-merge fixes cho unified-gateway-runtime. Vẫn 212 comments, hàng chục edge case:

- **#142741** [OPEN P2]: macOS launchd retry loop không kickstart gateway job đã register nhưng không chạy→restart fails
- **#142670** [OPEN P2]: Discord reconnect failed→watcher hang forever tại `_cancel_bot_task`→RuntimeStoreError not_found
- **#142730** [OPEN P2]: Session `admission_conflict` pause vĩnh viễn — mọi turn sau HTTP 409 mãi mãi
- **#142487** [OPEN P2]: Ingress drop toàn bộ message khi 1 media entry không phải file local (Matrix, WhatsApp)

### Desktop Major Refactor
- **#139961** [OPEN P2]: Migrate existing Desktop Group Chats vào gateway-hosted rooms (full log, threads, single driver)
- **#142740** [OPEN P2]: Addressed-member nudge fire sau khi address đã answered; `addressedKeys` frozen tại drive start

### Tool & MCP
- **#140265** [OPEN P2]: Lazy MCP server mất tool cache sau profile reconciliation lần 2, markers còn→discovery nghĩ đã register
- **#142766** [OPEN P3 PR]: Enforce exact-channel tool catalogs cho receiving bots (adapter hints+fallback bị bypass)

## 👥 Điểm nổi bật cộng đồng

### Top Engagement (comments+reactions)
1. **#134889** (212💬): Gateway unification tracking — mọi người report edge-case post-merge
2. **#141346** (25💬): Smart approval auto-approved osascript→closed user's unsaved PowerPoint→unrecoverable loss
3. **#122424** (17💬+1👍): js-yaml CVE được fix rồi nhưng vẫn còn chút residual discussion
4. **#79087** (12💬): Windows runtime probe timeout→route install vào first-run onboarding, offer reinstall

### Pain Points nổi bật
- **Smart approval too permissive** (#141346): User mất data thật vì osascript được phép
- **WhatsApp silence guard broken** (#120051): `NO_REPLY`→group nhận warning message thay vì silence
- **Windows multi-backend mayhem** (#79087): Probe timeout causes ghost installs

## 🐛 Ổn định & Bugs

### Critical (P0-P1)
- **#137334** [P1]: Anthropic `sk-ant-usr-*` Console keys classified as OAuth→400 "credit balance too low"
- **#79087** [P1]: Windows desktop probe timeout routing bug
- **#135037** [P1]: Windows user-PATH registration writes sandbox bin dirs vào shared `HKCU\Environment\Path`

### High Impact (P2, nhiều sweeper tags)
- **#142330** [P3→security]: `begin_runtime_epoch()` bump epoch không assert profile lock→brick gateway writes
- **#142414** [P2]: Cron observer give up sau 1 timeout 30s→pause job mà gateway vẫn chạy
- **#141973** [P2]: Mid-turn sends unreliable — queued thay vì deliver, "sent" mà harness không nhận, Steer button silent no-op
- **#142487** [P2]: Gateway ingress drop message khi có media không phải local file

### Platform-Specific
- **Discord** (#142461): Auto-thread automation wake refused `admission_conflict` forever
- **Slack** (#142728): Status line lost trên assistant.threads.setStatus (SDK 3.44+ enum issue)
- **Matrix/WhatsApp** (#141429): Cron threads seed brief under group key, reply lose context
- **Feishu** (#142833 PR): Async completions không deliver trong topics

## 💡 Yêu cầu tính năng

### Infra & Observability
- **#6642** (7💬+1👍): Unified telemetry — latency, cost, completion/failure rates (oldest open: Apr 9)
- **#107960** (4💬): Multi-GPU tensor-split cho llama.cpp runtime (chỉ dùng GPU đầu tiên)

### UX Improvements
- **#89720** (4💬): Custom @handle cho default profile (hiện hard-code @hermes dù display name khác)
- **#142814** [PR]: Name the prompt + magnify selected mark trong timeline rail (8×1px bars không đủ identify)

### Platform Expansion
- **#11442** (3💬+1👍): GitHub Copilot cho GitHub Enterprise Server (GHE) — custom domain unsupported

### Automation
- **#91687** (9💬): A2A long jobs nên return task ID thay vì wait→timeout
- **#128411** (3💬): Multiplex outbound-only delivery grant — satellite profile's cron alerts dùng bot profile khác

## 🗣️ Phản hồi người dùng

### Usability Pain
- **Smart approval false-positive** (#141346): User mất unsaved work vì approval logic quá rộng
- **Lifecycle guard over-match** (#124700 +1👍): Block LaunchAgent maintenance không liên quan, no sanctioned path for independent service

### i18n Community
- **#119706** [PR]: Brazilian Portuguese (pt-BR) locale cho Desktop app (7th locale)
- **#119292** [PR]: pt-BR README translation
- Signals interest Brazil market

### Compression Issues
- **#50132** (3💬+2👍): `_build_call_kwargs` drop `max_tokens` cho OpenAI-compat→runaway compression summaries trên local backends

## 📋 Backlog & Roadmap

### Near-Term (PRs ready/in-review)
- **Security patches**: Pillow, certifi, multidict, js-yaml — rolling out
- **Gateway session safety**: Lock race conditions (#142330), admission conflict recovery (#142731)
- **Desktop migrations**: Group chats→gateway rooms (#139961)

### Medium-Term (needs-decision tag)
- **Memory budget enforcement** (#135039): `MEMORY.md`/`USER.md` budget+acceptance pipeline
- **Per-chat pending slots** (#136450): Enable multiple chats per platform trong session groups
- **API-scoped fallback** (#139290 PR): Không dùng messaging platform's fallback chain

### Long-Term (P3, waiting)
- Telemetry (#6642)
- Multi-GPU llama.cpp (#107960)
- GitHub Enterprise Copilot (#11442)
- Eager+usage-learned tool search (#139289 PR)

---

**Tổng quan:** Releases vá security, tập trung stabilize gateway post-#106742. Desktop Group Chat migration bắt đầu. Community report nhiều edge-case, team phản hồi nhanh nhưng backlog còn dày (117 open issues, 50 hiển thị ở đây). Security posture được chú trọng sau loạt CVE disclosure Oct 17-19.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-22

## 1. Tổng quan hệ sinh thái

Hệ sinh thái AI agent đang trong giai đoạn **consolidation và stabilization**. Sau làn sóng feature explosion 2025, các dự án chuyển sang fix technical debt, harden security, tối ưu UX. Pattern chung: gateway/runtime bugs, context management crisis, platform-specific quirks.

**Hai进路 rõ rệt:**
- **Production-focused** (Hermes, OpenClaw): Chạy theo scale, security, multi-platform reliability
- **Research/niche** (NanoClaw, QwenPaw, IronClaw): Thử nghiệm architecture mới, vertical use cases

**Dead signals:**
- PicoClaw: ghost repo (3 stale PRs closed, zero new activity)
- NullClaw: không tồn tại hoạt động nào

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Activity 24h | Cộng đồng | Trạng thái |
|-------|--------|-----|----------|--------------|-----------|------------|
| **Hermes Agent** | 117 | 500 | 2 (v0.22.3, v0.22.4) | 🔥 Cao | 212 comments trên #134889 | **Production** |
| **OpenClaw** | 53 | 500 | 1 (beta.3) | 🔥 Cao | 134 comments trên #143524 | **Beta** |
| **NanoBot** | 1 | 50 | 0 | Medium | Ít engagement | **Active dev** |
| **QwenPaw** | 14 | 27 | 0 | Medium | 10 comments trên #338 | **Active dev** |
| **Zeroclaw** | 13 | 50 | 0 | Low | Maintainer-driven | **Maintenance** |
| **NanoClaw** | 4 | 49 | 0 | Low | 0 comments trên issues mới | **Maintenance** |
| **IronClaw** | 0 | 50 | 0 | ❄️ Frozen | Zero engagement | **Stalled** |
| **PicoClaw** | 0 | 3 | 0 | ❄️ Dead | Zero engagement | **Abandoned?** |
| **NullClaw** | 0 | 0 | 0 | ❄️ Dead | N/A | **Ghost** |

### Chỉ số chất lượng

**Issue close rate (24h):**
- Hermes: 7 closed (security patches)
- OpenClaw: Không rõ (tracking issue dominant)
- NanoBot: 0 (chỉ có 1 issue total)
- QwenPaw: 4 closed (bugs + feature clarification)

**PR velocity:**
- NanoBot: 15 merged/day (highest, polish phase)
- Hermes: ~10 merged/day (security + gateway fixes)
- OpenClaw: ~5 merged/day (beta stabilization)

**Release cadence:**
- Hermes: 2 patch releases trong 24h (aggressive patching)
- OpenClaw: 1 beta/3 weeks (deliberate)
- Còn lại: Không ship

## 3. Vị thế Hermes Agent

### Điểm mạnh

**🏆 Market leader signals:**
- **Scale**: 620 PRs merged trong 1 release cycle (v0.22.2→v0.22.3)
- **Velocity**: 2 patch releases trong 24h (v0.22.3, v0.22.4)
- **Community**: 212 comments trên tracking issue (#134889), multiple user pain reports
- **Distribution**: CLI, Microsoft Store, Docker, Cloud — widest reach

**Security-first posture:**
- Loạt CVE fixes: Pillow (28 CVE), certifi (eMudhra hack), js-yaml, multidict
- 3 critical GHSA patches trong 48h
- Community trust cao (user reports production data loss #141346)

**Ecosystem maturity:**
- Desktop app với native integrations
- Gateway unification đã merge (#106742) — big architecture bet paid off
- Multi-platform support: Discord, Slack, Matrix, WhatsApp, Feishu

### Điểm yếu

**Technical debt crisis:**
- #134889 có 212 comments = post-merge gateway bugs không hết
- Smart approval false-positive làm user mất data (#141346)
- Session management bugs: admission_conflict pause forever (#142730), race condition brick writes (#142330)

**Stability vs features tradeoff:**
- Backlog 117 issues, 50 hiển thị trong báo cáo
- Long-tail edge cases: WhatsApp silence, Discord reconnect hang, macOS launchd retry
- Feature requests chờ lâu: Telemetry (#6642, từ Apr 9), Multi-GPU (#107960)

**Communication gap:**
- User không biết osascript approval risk → mất unsaved work
- Context: User dùng sản phẩm complex, docs/warnings chưa đủ

### So với đối thủ

| Tiêu chí | Hermes | OpenClaw | NanoBot | QwenPaw |
|----------|--------|----------|---------|---------|
| **Production readiness** | ✅ Shipping | ⚠️ Beta | 🔨 Dev | 🔨 Dev |
| **Community size** | 🏆 Lớn nhất | Medium | Nhỏ | Nhỏ |
| **Security posture** | 🏆 Proactive | Reactive | Unknown | Reactive |
| **Platform coverage** | 🏆 Rộng nhất | Medium | Niche | Medium |
| **Innovation** | Incremental | Incremental | High (A2A, MCP Apps) | High (PawApp, ReMe) |

**Hermes = enterprise-grade stabilizer.** OpenClaw đuổi theo. NanoBot/QwenPaw thử nghiệm tính năng Hermes chưa có.

## 4. Hướng kỹ thuật chung

### 🎯 Top patterns trong hệ sinh thái

#### 1. **Gateway/Runtime Isolation** (xuất hiện ở 4/6 dự án active)

**Hermes:**
- Unified-gateway-runtime merge (#106742) → 212 comments bugs
- Session admission_conflict, epoch race conditions

**OpenClaw:**
- SQLite WAL bloat (2.8GB) crisis (#143524)
- Session checkpoint failures block startup

**NanoBot:**
- A2A Protocol (#216) — agent-to-agent JSON-RPC
- Secure credential form (#5970) bypass model context

**NanoClaw:**
- OneCLI 1.45 migration (#4094) — breaking change, explicit grants required
- Channel-to-skill isolation (#4177, #4178)

**Pattern:** Mọi dự án đều gặp session/gateway lifecycle bugs sau khi scale. Gateway = single point of complexity.

#### 2. **Context Management Crisis**

**Hermes:**
- Smart approval over-match (#141346)
- Memory budget enforcement (#135039) chưa implement

**OpenClaw:**
- Agent DB WAL 1.4-2.8GB trong vài ngày (#143524)
- Late reclamation commit failure (#166634)

**IronClaw:**
- Cắt output tool (#5450), auto-activate web search (#6232), derive compaction (#7976) — 3 PRs từ June/July chưa merge
- Self-verification pass (#6093) stuck

**QwenPaw:**
- ReMe 0.4.2 integration (#8347) với JEV compaction
- Automatic Memory Search loop (#8361)

**Root cause:** Models lớn → context window lớn → state management, eviction, compaction trở thành bottleneck. Chưa có best practice convergence.

#### 3. **Security Hardening** (tăng mạnh sau CVE wave Oct 17-19)

**Hermes:** 28 CVE Pillow, eMudhra intermediate cert hack, js-yaml

**NanoBot:** Secure form (#5970), signed webhooks (#5652), config read isolation (#6269)

**Zeroclaw:** Plugin egress ceremony (#11808), SOP integrity (#11861), container CA refresh (#11925)

**NanoClaw:** Approval card race condition (#4168, #4171) — security boundary

**Shift:** Từ "ship features" → "don't brick production". Dependencies, auth flows, approval mechanisms đang được audit lại.

#### 4. **Multi-Platform Fragmentation**

Mọi dự án gặp platform-specific bugs:
- **Windows:** Hermes probe timeout (#79087), OpenClaw DLP blocks (#179923), NanoBot long path (#6356)
- **macOS:** Hermes launchd retry (#142741), OpenClaw Talk Mode dies (#153044), NanoBot window restore (#6377)
- **Linux/Docker:** Zeroclaw ARM64 memory (#11833), QwenPaw readiness probe (#8359)

**No one has cracked cross-platform consistency.** Test matrix explosion.

#### 5. **OAuth/Auth Instability**

**Hermes:** Anthropic sk-ant-usr-* keys classified wrong (#137334)

**OpenClaw:** OAuth refresh failures (#178646) — XL PR, cross-cutting 6 providers

**NanoBot:** MCP OAuth memory leak (#5665)

**NanoClaw:** Google Chat JWT audience claim (#4100, #4132)

**Provider APIs không stable, hoặc dự án chưa handle transient failures đúng.**

### 🔧 Tech stack convergence

| Layer | Dominant choices | Outliers |
|-------|------------------|----------|
| **Language** | TypeScript (6/6) | IronClaw có Rust components |
| **Runtime** | Node.js 22-24 | NanoClaw thử upgrade 24 |
| **DB** | SQLite (5/6) | PostgreSQL ở production backends |
| **Gateway** | Custom (Hermes, OpenClaw, QwenPaw) | OneCLI (NanoClaw) |
| **UI** | React (5/6) | Zeroclaw unknown, NanoBot Solid refactor |
| **Deployment** | Docker + native binaries | Hermes thêm Microsoft Store |

**Không có framework wars.** Đều converge về TypeScript + SQLite + React.

## 5. Điểm khác biệt

### Chiến lược

| Dự án | Chiến lược chính | Target user | Moat |
|-------|------------------|-------------|------|
| **Hermes** | Enterprise-grade stability, wide platform support | Businesses, power users | Distribution (Microsoft Store, Cloud), security trust |
| **OpenClaw** | Production reliability, feature parity chase | Prosumers, early enterprise | Beta program feedback loop |
| **NanoBot** | Protocol innovation (A2A, MCP Apps) | Developers, integrators | Extensibility architecture |
| **QwenPaw** | Alibaba Cloud integration, Chinese market | China enterprises, Qwen users | Bailian/Qwen tie-in |
| **Zeroclaw** | Security-first conservative | Paranoid users | Audit trail, least-privilege |
| **NanoClaw** | Skill modularity, OneCLI ecosystem | Hackers, customizers | Skill marketplace potential |
| **IronClaw** | NEAR Protocol blockchain agents | Web3 developers | IronHub, decentralized compute |

### Tính năng độc quyền

**Hermes:**
- Desktop Group Chats migration (#139961)
- Gateway-hosted rooms với full log
- Microsoft Store distribution

**NanoBot:**
- A2A Protocol (#216) — agent-to-agent communication
- MCP Apps hosting (#6363) — structured result rendering

**QwenPaw:**
- PawApp SDK redesign (#7874) — task contract system
- QwenPaw-Data integration (#8363)
- Realtime voice chat (#7785)

**Zeroclaw:**
- SOP (Standard Operating Procedure) integrity (#11861)
- Plugin egress staggered dial (Happy Eyeballs for tools)

**IronClaw:**
- Runtime-swappable components (#7510)
- IronHub agent link (#7516)
- NEAR blockchain primitives

**Overlap thấp.** Mỗi dự án đang carve riêng niche.

### Cộng đồng

**Hermes: Production users với real pain**
- User reports data loss (#141346)
- Detailed edge-case logs (#134889, #142670)
- Feature requests có use case cụ thể (#6642, #107960)

**OpenClaw: Beta testers engaged**
- 134 comments trên WAL bloat (#143524)
- Community PRs: Tailscale fix (#137454), iOS UX (#170245)

**NanoBot: Developer-centric, quiet**
- Bug reports có reproduction steps
- Maintainer-driven development
- Feature requests technical (#216, #6363)

**QwenPaw: Chinese community, Alibaba ecosystem**
- Brazilian Portuguese i18n (#119706, #119292)
- Bailian integration questions (#6973)

**Zeroclaw: Internal dogfooding**
- Zero external comments
- Maintainers discover bugs through use
- Security-conscious culture

**NanoClaw: Small, focused**
- Core team @glifocat dominant
- External contributors (@barnuri, @antonio-antuan) occasional

**IronClaw: Ghost town**
- 30 PRs, zero comments
- No community visible

## 6. Mức độ trưởng thành cộng đồng

### Tier 1: Production communities

**Hermes Agent** ⭐⭐⭐⭐⭐
- ✅ Hundreds of users
- ✅ Production pain reports
- ✅ Multi-locale (pt-BR, Chinese signals)
- ✅ External contributors
- ⚠️ High noise (212 comments trên 1 issue)

**OpenClaw** ⭐⭐⭐⭐
- ✅ Beta testers active
- ✅ Community PRs merged
- ✅ Detailed bug reports
- ⚠️ Smaller than Hermes

### Tier 2: Developer communities

**NanoBot** ⭐⭐⭐
- ✅ Technical discussions
- ✅ Protocol innovation interest
- ⚠️ Low volume
- ⚠️ Maintainer-driven

**QwenPaw** ⭐⭐⭐
- ✅ International (Brazilian, Chinese)
- ✅ Alibaba ecosystem tie-in
- ⚠️ Feature requests generic
- ⚠️ Engagement medium

**NanoClaw** ⭐⭐
- ✅ Focused contributors
- ⚠️ Very small (4-5 active)
- ⚠️ Issues có 0 comments

**Zeroclaw** ⭐⭐
- ✅ Disciplined team
- ⚠️ Zero external engagement
- ⚠️ Private development vibe

### Tier 3: Stalled/Dead

**IronClaw** ⭐
- ❌ Zero community
- ❌ PRs không comments
- ❌ 30 PRs open >2 months

**PicoClaw** ☠️
- ❌ Abandoned

**NullClaw** ☠️
- ❌ Ghost

### Maturity signals

**Hermes đạt được:**
- Production incident handling (smart approval data loss)
- Security patching velocity (2 releases/24h)
- Multi-distribution (Store, Cloud, self-host)
- I18n presence

**Còn lại chưa có:**
- OpenClaw: Beta exit criteria chưa rõ
- NanoBot/QwenPaw: Release process chưa formal
- Zeroclaw: Community building không ưu tiên
- IronClaw: Critical mass contributors

## 7. Tín hiệu xu hướng

### 📈 Xu hướng đang lên

#### 1. **Agent-to-Agent Communication**

**NanoBot A2A Protocol (#216):** JSON-RPC + agent card. Cho phép agents delegate tasks.

**QwenPaw PawApp SDK (#7874):** Task contract system, apps register handlers expose vào Main Chat.

**NanoClaw channel-to-skill migration (#4177):** Adapters thành independent skills, có thể compose.

**Insight:** Monolithic agent → agent mesh. Specialization + coordination thay vì one-agent-does-all.

**Hermes chưa có tín hiệu này.** Risk: bị bỏ lại nếu agent mesh trở thành standard.

#### 2. **MCP (Model Context Protocol) Ecosystem**

**NanoBot MCP Apps hosting (#6363):** Render structured results thay vì text.

**NanoBot MCP OAuth leak fix (#5665):** Memory management cho repeated flows.

**Hermes version check conflict (#6376):** HTTP MCP dùng pinned-DNS transport.

**MCP đang trở thành lingua franca cho tool integration.** Anthropic đẩy mạnh, community adopt nhanh.

**Hermes đang integrate nhưng gặp friction (conflict #6376).** Cần prioritize MCP-first design.

#### 3. **Structured Outputs & Typed Interactions**

**QwenPaw TypeSafe JEV (#8283):** Decision-model-backed tool approval.

**Zeroclaw plugin egress ceremony (#11808):** Declarative grants thay vì runtime permission prompts.

**NanoClaw enforce exact-channel tool catalogs (#142766):** Adapter hints + fallback enforcement.

**Shift từ free-form text → structured contracts.** Reliability > flexibility.

#### 4. **Security Tightening**

**Hermes security surge:** 28 CVE patches trong 48h.

**Zeroclaw SOP integrity (#11861):** Prevent stale run copies overwrite terminal state.

**NanoBot secure credential form (#5970):** Bypass model context cho sensitive input.

**Post-CVE wave Oct 17-19, toàn industry tăng cường security review.** Dependencies, auth, state integrity đều under scrutiny.

#### 5. **Context Management Solutions**

**QwenPaw ReMe integration (#8347):** JEV compaction option.

**IronClaw compaction derives (#7976):** Model window size thay vì hardcode.

**Hermes memory budget enforcement (#135039):** Acceptance pipeline chưa implement.

**Problem chung, chưa có winner solution.** Ai solve first = competitive advantage.

### 📉 Xu hướng đang xuống

#### 1. **Monolithic Releases**

Hermes v0.22.3 cuộn 620 PRs, +360K/-64K lines. **Unsustainable.**

Trend: Micro-releases, feature flags, gradual rollout. Hermes chưa chuyển.

#### 2. **Platform-Specific Builds**

Mọi dự án gặp Windows/macOS/Linux quirks. **Convergence chậm.**

Wasm/WASI, cloud-native runtimes có thể reduce fragmentation. Chưa ai adopt.

#### 3. **CLI-First UX**

**NanoClaw OneCLI migration (#4094):** CLI required stop agent trước upgrade.

**IronClaw IronHub operator UI (#7516):** Hiện tại CLI-only, cần WebUI.

**User expectations:** GUI-first. CLI = power users only.

#### 4. **Single-Agent Paradigm**

Agent mesh, A2A, PawApp task contracts → **multi-agent architecture đang thay thế single-agent.**

Hermes Desktop Group Chats (#139961) đang migrate sang gateway-hosted rooms = gián tiếp support nhiều agents trong 1 context.

### 🔮 Dự đoán 6-12 tháng

**1. Agent mesh trở thành standard**

NanoBot A2A, QwenPaw PawApp nếu succeed → Hermes, OpenClaw phải follow. Expect: federation protocols, agent discovery, cross-agent auth.

**2. MCP marketplace bùng nổ**

Giống VSCode extensions. Ai build MCP app hosting + discovery first = platform play. NanoBot (#6363) đang lead.

**3. Context management commoditized**

ReMe, JEV compaction, memory budget → giải pháp open-source emerge. Integrated vào runtimes.

**4. Security incidents force regulation**

Smart approval data loss (#141346) = preview. Nếu xảy ra incident lớn (financial loss, PII leak) → compliance requirements, audit trails mandatory.

**5. Consolidation wave**

IronClaw, PicoClaw đã chết. Zeroclaw nếu không build community → niche hoặc sunset. Hermes, OpenClaw, NanoBot sống sót. QwenPaw nếu Alibaba commit → China market win.

**6. Blockchain agents stay niche**

IronClaw stalled = tín hiệu blockchain + AI agents chưa product-market fit. NEAR ecosystem nhỏ, use cases chưa rõ.

### ⚠️ Risk factors cho Hermes

**Technical debt crisis (#134889):**
- 212 comments = post-merge bugs chưa hết
- Nếu không contain → user churn, reputation hit

**Innovation lag:**
- Không có A2A, MCP Apps, agent mesh signals
- NanoBot, QwenPaw đang thử nghiệm features Hermes chưa roadmap

**Community fatigue:**
- Backlog 117 issues, feature requests chờ lâu (#6642 từ Apr 9)
- Smart approval false-positive mất user data (#141346) = trust damage

**Competition tăng:**
- OpenClaw đuổi theo feature parity
- NanoBot innovate nhanh hơn
- QwenPaw có Alibaba backing

### 🎯 Cơ hội cho Hermes

**Security leadership:**
- Proactive CVE patching = trust signal
- Nếu build audit trail, compliance features → enterprise moat

**Distribution advantage:**
- Microsoft Store, Cloud = reach competitors không có
- Leverage vào enterprise sales

**Gateway unification payoff:**
- Architecture bet đã merge, nếu stabilize → tech moat
- Multi-channel reliability = killer feature cho businesses

**Community size:**
- Largest user base = data advantage
- Nếu channel feedback vào roadmap → product-market fit tốt hơn

---

## Kết luận

**Hệ sinh thái AI agent = early consolidation phase.** Hermes lead về scale + distribution, nhưng innovation đang ở NanoBot/QwenPaw. OpenClaw đuổi theo. Zeroclaw/NanoClaw niche. IronClaw stalled. PicoClaw/NullClaw dead.

**Technical challenges chung:** Context management, gateway lifecycle, platform fragmentation, OAuth instability. Chưa có best practices convergence.

**Xu hướng tương lai:** Agent mesh, MCP ecosystem, structured outputs, security tightening. Hermes cần pivot từ "ship features" → "innovate architecture" để maintain lead.

**Recommendation cho Hermes:**
1. Contain #134889 gateway bugs trước khi ship features mới
2. Prioritize A2A, agent mesh architecture
3. MCP-first integration design
4. Build compliance/audit features cho enterprise
5. Reduce release size, increase cadence
6. Channel community feedback vào roadmap faster

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw ngày 2026-10-22

## 1. Tóm tắt hôm nay

Release beta.3 version 2026.10.10 tập trung fix Windows reliability. Hoạt động chính: 30 PR mới, 180+ issue active, focus vào database corruption (WAL bloat), update failures, auth/OAuth stability. Cộng đồng pressure cao trên P0 crashes.

## 2. Releases

### v2026.10.10-beta.3 (2026-10-21)

**Windows reliability wins:**
- Fresh state init restored
- SQLite helper windows hidden during updates  
- Forced Gateway reinstalls tolerate launcher timestamp settling
- PRs: #176194, #174969, #176174, #176945

**Upgrade recovery:**
- App-owned plugins converge to upgraded core version
- Critical fixes cho update pipeline

## 3. Tiến độ dự án

### PRs quan trọng đang xử lý

**Merge-ready / High impact:**

1. **#124517** - LINE channel reply durability (rating 🦐 gold shrimp)
   - Fix lost/duplicate replies khi crash interrupt delivery
   - Compatibility + message-delivery + security boundary risk
   - Status: needs proof

2. **#178646** - OAuth refresh failures fix (XL, security-review-required)
   - Keep OAuth sign-ins safe through transient refresh failures
   - Cross-cutting: MSTeams, Twitch, Google, xAI, OpenAI, MiniMax
   - Auth-provider + security-boundary merge risk

3. **#180081** - Restore remote access sau Tailscale restarts (diamond lobster)
   - Based on community PR #137454
   - Ready for maintainer review

**Performance & optimization:**

- #180142: Reduce session broadcast allocations
- #151406: Cut Codex app-server notification overhead
- #180145: Avoid session rereads cho speed hint updates

**Test cleanup wave** (batch d418-d421):
- Multiple PRs removing low-value tests
- Consolidate duplicated setup across Doctor, Gateway, wizard, plugins

### Xu hướng development

- **Focus chuyển sang stability**: 7/10 top PRs là bug fixes
- **Security tightening**: OAuth, auth-provider boundaries under review
- **Platform-specific fixes**: iOS, Windows, macOS có dedicated PRs
- **Test debt reduction**: Aggressive test suite cleanup đang diễn ra

## 4. Điểm nổi bật cộng đồng

### Issues hot nhất (theo comments)

**#143524 - SQLite WAL bloat crisis** (134 comments, P0)
- Agent DB WAL grows 1.4-2.8 GB trong vài ngày
- `wal_autocheckpoint=1000` không hoạt động
- Blocks gateway startup trên Windows
- Impact: message-loss + crash-loop
- Rating: 🦐 gold shrimp, release blocker

**#145252 - 2026.9.3/9.4 update reliability tracking** (13 comments, P0)
- Coordination index cho update/upgrade/recovery issues
- Master tracking ticket
- Release blocker status

**#162164 - iOS/macOS personal identity** (10 comments, P2)
- Feature request: opt-in personal sign-in
- Preserve Shared owner mechanism
- Product decision needed

**#166634 - Late reclamation commit failure** (8 comments, P0)
- Agent unavailable sau crash recovery
- SQLite session checkpoint expired
- Not repro on main, needs investigation

### Community pain points

1. **Update failures dominate**: 10+ issues về failed updates (runtime-verification-failed, global-install-failed)
2. **Platform fragmentation**: macOS, Windows, Linux có specific issues
3. **OAuth instability**: Multiple reports về auth provider failures
4. **Database issues**: WAL bloat + checkpoint failures recurring theme

## 5. Ổn định & Bugs

### P0 Critical bugs

**Database layer:**
- #143524: SQLite WAL unchecked growth (2.8GB)
- #166634: Reclamation checkpoint expiry
- #176669: System-agent DB stuck at schema 24 post-update (CLOSED today)

**Update/Upgrade failures:**
- #153333, #153773, #153768: Various update-failure modes
- Pattern: `database-schema-preflight`, `runtime-verification-failed`, `global-install-failed`
- Affects 2026.9.4 → 2026.9.5 transition

**Channel stability:**
- #146876: Heartbeat replies misrouted to global target (session-scoped)
- #153453: WhatsApp replies wait for recovery (registry switches)
- #180152: Feishu exec completions routed as replies, 400 errors

**Auth/OAuth:**
- #153861: Model fallback silent (no user notice)
- #148341: Telegram specialist scope leak post-upgrade (security)

### P1/P2 stability work

- #153732: Gateway WorkerThread CPU burn (session-store clone)
- #153864: Stale contextTokens self-perpetuate
- #109956: Phantom `agent_databases` row with literal id `agent`

## 6. Yêu cầu tính năng

### High-value requests

**#180126 - Shared model defaults cho multi-agent fleets** (diamond lobster, P2)
- Problem: `openclaw configure --section model` không support shared `agents.defaults`
- Impact: Must configure each agent individually
- Use case: Fleet operators với 2+ agents

**#180140 - Agent-to-agent ask_user support** (tidepool, P2)
- Let agent channel plugins offer ask_user
- Questions route to agent owner
- Blocked by current agentPrompt.questionInputMode logic

**#180113 - Doctor --rebuild mode** (tidepool, P2)
- Preserve-and-rebuild repair path
- Rebuild config/skeleton/plugins, preserve data surfaces
- For installs beyond targeted repairs

**#180112 - User-lockable skill toggles** (silver shellfish, P2)
- Frozen skills require interactive confirmation
- Security enhancement
- Attempt logging + surfacing

**#153686 - Named session groups in team mode** (diamond lobster, P2)
- Keep agent's non-empty named groups visible
- Currently flattened to pinned/recent
- Operator workflow issue

### Quality-of-life

- #126012: Pre-turn context gate (forced /compact at threshold)
- #162164: iOS/macOS personal identity opt-in
- #178373: Agent loop run-level budgets (turn/token caps)

## 7. Phản hồi người dùng

### Pain patterns từ issues

**Complexity fatigue:**
- Multi-step setup failures confusing (update pipeline)
- Doctor reports valid configs as broken (#180143)
- Error messages không actionable

**Platform gaps:**
- macOS Talk Mode dies sau first turn (#153044)
- Windows DLP blocks native plugins (#179923 - CLOSED today)
- Android location.get fails while foreground (#153867)

**Visibility issues:**
- Silent fallbacks (#153861 - model switches)
- Internal messages leak to users (#153522 - "Skipped to process...")
- Double-rendered replies (#153671 - UI vs history mismatch)

**Power user requests:**
- Session group preservation
- Shared config for fleets
- Better recovery tools (doctor --rebuild)

### Positive signals

- Community contributing fixes: #137454 (Tailscale), #170245 (iOS button UX)
- Detailed bug reports với logs/reproduction steps
- Active engagement on tracking issues

## 8. Backlog & Roadmap

### Immediate priorities (từ PR activity)

**Stability track:**
1. SQLite WAL checkpoint fix (#143524 blocking)
2. Update pipeline hardening (multiple failures)
3. OAuth refresh resilience (#178646 in security review)
4. Session persistence (heartbeat routing, delivery recovery)

**Platform work:**
- Windows reliability (beta.3 addressed some)
- macOS Homebrew Node upgrade recovery (#174379 merged)
- iOS Gateway Connect UX (#170245 ready)

**Technical debt:**
- Test suite cleanup (d418-d421 batches active)
- UI refactor to Solid boundaries (#180031, #180053)
- Performance: session broadcasts, Codex notifications

### Strategic themes (suy từ labels/ratings)

**Security hardening:**
- Multiple PRs require security review
- Auth boundary work active
- Skill lockdown features requested

**Multi-agent/Fleet support:**
- Shared defaults (#180126)
- Session group preservation (#153686)
- Team mode improvements

**Developer experience:**
- Better failure messages
- Improved Doctor diagnostics
- Rebuild/recovery paths

### Blocked/Needs decision

- #162164: Personal identity (needs product + security decision)
- #180140: Agent ask_user (needs product decision)
- #180113: Doctor rebuild (needs product decision)
- #148341: Telegram specialist scope (needs security review)

---

**Conclusion:** Dự án trong stabilization phase mạnh. Beta releases focus Windows. Community áp lực trên database reliability + update failures. Nhiều security-sensitive changes đang review. Test debt đang giảm. Feature requests pivot sang fleet/power-user workflows.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-22

## 1. Tóm tắt hôm nay

Dự án tập trung vào polish WebUI và cải thiện quy trình CI/CD. Merge 15 PR trong ngày, chủ yếu fix bug hiển thị, tối ưu hiệu suất test, và cải thiện trải nghiệm người dùng. Không có release mới.

## 2. Releases

Không có release.

## 3. Tiến độ dự án

**Merged PRs (15)**:

**WebUI polish**:
- #6381: Fix emphasis delimiter với CJK text (Chinese `**` render lỗi khi chạm dấu câu)
- #6374: Ẩn idle compaction notice trong transcript (background maintenance không cần hiển thị)
- #6369: Render cross-session message dạng left-aligned bubble + `@handle` label
- #6380: Xóa "Preparing diagram..." text cho Mermaid
- #6354: Fix transcript jump khi gõ multiline draft (scroll position ổn định)
- #6338: Show skeleton khi load conversation history thay vì blank screen
- #6355: Unify About version actions - auto check update khi vào, một button cho tất cả
- #6376: Fix version check conflict với HTTP MCP (cùng dùng pinned-DNS transport)
- #6371: Sync activity ring animation trong sidebar (đồng bộ hướng, đổi sang neutral color)

**Backend stability**:
- #6379: Fix cross-session message mất provenance sau display persistence
- #6373: Fix race condition - history load drop live output khi timing xung đột
- #6353: Windows graceful shutdown - gateway cleanup trước khi kill process
- #6356: Support Windows long path (228→266 char) trong atomic I/O

**CI/CD**:
- #6378: Tách native acceptance test, bind artifacts cho release candidate (giảm 31min overhead cho small frontend change)
- #6357: Giảm Python test latency trên Windows, lazy allocate test resources
- #6335: Sync touch composer typography snapshot (fix flaky test)

**Open PRs chờ review (15)**:

**Ưu tiên cao**:
- #6372 (p2): Centralize proxy settings - một proxy config cho providers/web/channels/MCP (#6372)
- #6323 (p2): Edit & resend message in-place (không tạo topic mới)
- #6269 (p1): Tách config read khỏi network policy activation (security fix)
- #6340 (p2): Clarify QQ setup state (QR binding vs running channel)

**Feature mới**:
- #216: A2A Protocol support - agent-to-agent communication
- #6363: Opt-in MCP Apps hosting trong WebUI (render structured result thay vì text)
- #5970 (p2): Secure form cho credentials (không đi qua model context/transcript)
- #5915 (p2): Add Cheaper Inference provider (15-60% rẻ hơn list price)
- #5652 (p2): Signed webhook cho direct delivery (CI/monitoring bypass agent loop)

**Bug fix**:
- #6375: Prevent overlapping cron executions
- #5665 (p2): Bound MCP OAuth flows (memory leak với repeated attempts)
- #5302 (p2): Fix Dream consolidation tool call (prompt/tool registry mismatch)

**Infrastructure**:
- #6377: Restore macOS WebUI window từ Dock/Command-Tab
- #5727 (p2): Docs cho headless login secret

## 4. Điểm nổi bật cộng đồng

**Issue #6370** (mở 2026-10-21, 0 comment): WebUI compaction divider không rõ nguyên nhân - idle maintenance giống context-window pressure. Event chỉ có `compaction_id` + `phase`, thiếu `reason` field.

→ Fix nhanh #6374 merged trong 1 ngày: ẩn idle compaction, chỉ hiển thị turn-scoped compaction.

Phản ánh: team responsive, ưu tiên UX clarity.

## 5. Ổn định & Bugs

**Đã fix**:
- CJK emphasis parsing (#6381)
- Cross-session provenance loss (#6379)
- History/live output race (#6373)
- Windows shutdown cleanup (#6353)
- Windows long path (#6356)
- Version check/MCP conflict (#6376)
- Multiline draft scroll jump (#6354)

**Đang xử lý**:
- Cron overlap (#6375) - có PR
- MCP OAuth memory leak (#5665) - có PR
- Dream tool registry mismatch (#5302) - có PR

**Patterns**:
- Polish WebUI UX (7/15 merged PRs)
- Windows platform parity (2 PRs)
- Race condition fixes (2 PRs)

## 6. Yêu cầu tính năng

**Top requests (có PR)**:
1. **A2A Protocol** (#216): Agent-to-agent communication - JSON-RPC + agent card
2. **MCP Apps hosting** (#6363): Render structured results trong WebUI
3. **Secure credential form** (#5970): Bypass model context cho sensitive input
4. **In-place edit** (#6323): Sửa message không tạo topic mới
5. **Centralized proxy** (#6372): Một config cho tất cả network components

**Infrastructure**:
- Signed webhook (#5652): Direct delivery cho trusted systems
- Cheaper Inference provider (#5915): Cost optimization

## 7. Phản hồi người dùng

**Positive signals**:
- Bug reports có fix trong 24h (#6370 → #6374)
- Detailed reproduction steps trong issues
- Community PR contributions (3/30 PRs từ external contributors)

**Pain points** (inferred từ PRs):
- Cross-session UX confusion (#6369)
- Windows platform friction (#6353, #6356)
- CI overhead cho small changes (#6378)
- Credential security (#5970)

## 8. Backlog & Roadmap

**Active tracks**:
1. **WebUI polish** - ongoing, high velocity
2. **Security hardening** - config isolation (#6269), secure forms (#5970), signed webhooks (#5652)
3. **Platform parity** - Windows fixes, macOS UX (#6377)
4. **CI/CD optimization** - native test scoping (#6378), Python overhead (#6357)
5. **Protocol support** - A2A (#216), MCP Apps (#6363)

**Technical debt addressed**:
- Memory leaks (OAuth flows #5665)
- Race conditions (#6373, #6379)
- Prompt/tool mismatches (#5302)

**Merge velocity**: 15 PRs/day chủ yếu p2 fixes. Feature PRs (#216, #6363, #5970) đang review kỹ.

**Health indicators**:
- ✅ Responsive bug fixes (<24h)
- ✅ CI/CD optimization focus
- ✅ Security-conscious (3 security-tagged PRs)
- ⚠️ 15 open PRs có conflicts - cần rebase
- ⚠️ Some p1/p2 PRs open >1 month (#6269, #5970, #5915)

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-22

## 🔍 Tóm tắt hôm nay

Zeroclaw đang chốt v0.8.7 với focus vào bảo mật plugin egress và stability runtime. 7 issues được đóng (mostly bug fixes), 6 issues mới được mở (follow-ups từ code review + 2 feature requests). 15+ PRs active, nhiều nhất là security hardening cho Docker containers và plugin isolation.

## 📦 Releases

Không có release public. v0.8.7 đang trong release candidate stage - nhiều PR tagged `release:v0.8.7` được merge hôm nay.

## 🚀 Tiến độ dự án

### Merged PRs (hôm nay)
- **#11808, #11814**: Plugin egress security - WebSocket/socket counting + staggered dial prevents blackhole stall
- **#11852**: Quickstart UX - đổi thứ tự prompt (endpoint trước model), fix model picker empty state
- **#11832**: CI maintenance - migrate macOS builds sang `macos-15` before runner retirement
- **#11840**: Docs fix - clarify API keys stored encrypted locally, không dùng OS keyring
- **#11141**: PR review protocol - preserve fetch command exit codes

### In-Review PRs (high-activity)
- **#11861** (19 comments): SOP integrity - prevent stale run copies từ overwriting terminal runs. Critical runtime safety fix
- **#11833**: Docker CI - bound ARM64 memory + dry-run dispatch. Blocker cho release automation
- **#11925**: Container security - refresh CA stores after emSign distrust. High-risk change cần careful review

### Trend
Maintenance mode vibe: security hardening, CI stability, plugin sandbox tightening. Ít feature work, nhiều integrity/safety fixes follow-up từ prior releases.

## 💬 Điểm nổi bật cộng đồng

**Issues có engagement:**
- **#11552** (egress ceremony bug) - @IftekharUddin discovered WebSocket/socket declarations bị ignored trong grant ceremony. Fixed in #11808
- **#10920** (docs) - @Audacity88 request preserve fetch statuses. Long-running thread, finally resolved in #11141
- **#11819** (quickstart UX) - @JordanTheJet reported bad ordering + empty model picker. Fixed trong #11852

**Community asks:**
- #11930 (@m-ridha): Longer sync gateway webhook timeout cho agent tasks
- #11938 (@mov-xound-glitch): Email channel quote original message in replies

Không có hot drama. Đa số feedback từ maintainers tự dogfooding.

## 🐛 Ổn định & Bugs

### Critical fixes landed
1. **Plugin egress stalls** (#11813 → #11814): TCP dial tới IPv6 blackhole address → stall entire connection. Fix: parallel staggered dials with Happy Eyeballs
2. **Plugin config refusal** (#11811): Runtime từ chối tool config nhưng CLI `plugin list` không report. Fixed với propagated error codes
3. **SOP run integrity** (#11861): Stale process copies có thể revive finished runs. Added `TerminalRun` store error

### Open follow-ups (từ #11861 review)
- #11948: Record SOP step khi cancel finishes after refused write
- #11947: SQLite schema trigger refuse terminal 1→0 transition
- #11946: Prevent stale checkpoint copy từ overwriting state file
- #11945: Test coverage cho stale-copy branches
- #11944: Clean `run_revisions` entries khi run start rolled back

Pattern: một big integrity PR (#11861) spawn 5 follow-up issues. Thorough review process.

## ✨ Yêu cầu tính năng

1. **Gateway webhook timeout** (#11930, PR #11931): Người dùng cần longer timeout cho sync agent calls. Proposal: reuse existing long-running timeout config
2. **Email reply quoting** (#11938): Email channel replies không quote original message → breaks conversation context. Request toggle flag `quote_original`
3. **OpenRouter credit balance** (#11845, #11846): Show credit balance in dashboard, controllable via settings. In review, cần opt-in model

Không có big-vision features. Đều là operational/usability improvements.

## 📊 Phản hồi người dùng

Quiet day. Maintainer-driven fixes, không thấy external user complaints hoặc praise.

**Web UX improvements in review:**
- #11933: Chat header wrapping trên mobile
- #11920: Toggle collapse Thinking box khi model streams

Suggests active use of web UI by team, polishing rough edges.

## 📋 Backlog & Roadmap

### v0.8.7 scope (wrapping up)
- Plugin security hardening ✅
- Quickstart UX fixes ✅
- CI macOS migration ✅
- Container CA refresh (in review)
- Gateway connection draining (#11901 open)

### v0.9.0 tagged
- #11099: Relay enrollment QR codes
- #11174: Capability-taking turn constructors (architecture refactor)

### Long-term threads
- RFC #6954 (conversation binding): #11438 slice 2a/3 in review
- OIDC sign-in: groundwork laid v0.8.6, no active work visible
- Rust 1.99.1 upgrade (#11634): blocked on something, stale for 13 days

**Assessment:** Team đang ship incremental safety/quality improvements. Không có rushed timelines hoặc scope creep visible. Conservative release cadence.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw ngày 2026-10-22

## 1. Tóm tắt hôm nay

Không có hoạt động mới. Chỉ có 3 PR cũ đóng vào ngày 21/10, không có issue hay release trong 24h qua. Dự án đang im lặng.

## 2. Releases

Không có.

## 3. Tiến độ dự án

Ba PR đóng hôm qua, đều là code cũ từ tháng 2-3/2026:

- **#536** (docker sandbox cho agent): WIP từ tháng 2, đóng sau 8 tháng không merge. Security feature bị bỏ.
- **#1268** (iMessage support + logs): Thêm tích hợp iMessage, LLM API logs, conversation logs, stop command. Go code. Đóng nhưng không rõ merged hay rejected.
- **#1545** (merge multiple PRs): Gộp fixes từ 5 PR khác (#1500, #1490, #1488, #1487, #1485). Không có chi tiết về nội dung fixes.

Xu hướng: Dọn backlog cũ, không có feature mới. Không có PR mới được tạo.

## 4. Điểm nổi bật cộng đồng

Không có. Ba PR đóng đều 0 reaction, 0 comment. Cộng đồng không tương tác.

## 5. Ổn định & Bugs

Không có issue bugs mới. #1545 gộp fixes nhưng không rõ bugs gì được sửa.

## 6. Yêu cầu tính năng

Không có feature request mới. #1268 thêm iMessage nhưng đã đóng.

## 7. Phản hồi người dùng

Không có.

## 8. Backlog & Roadmap

Không có thông tin. Dự án trông như đang stall - đóng PR cũ không merge, không có activity mới. Cần kiểm tra repo để xác nhận trạng thái thực sự (archived? pivoting?).

---

**Đánh giá**: Ngày yên tĩnh. Hoạt động duy nhất là đóng PR cũ. Không có tín hiệu phát triển tích cực.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw ngày 2026-10-22

## 1. Tóm tắt hôm nay

Ngày bảo trì chất lượng: 7 PR merged, 5 PR mới. Core team @glifocat dọn backlog approval/attachment bugs đồng thời chuẩn bị tách channel adapters ra skill payloads. Không có release.

## 2. Releases

Không có releases.

## 3. Tiến độ dự án

### Đóng hôm nay (7 PRs)

**Approval card flow fixed (#4168, #4171)**
- Vấn đề: button click resolve ngay trước khi host kiểm tra quyền → user bấm "Deny" nhưng action đã chạy
- Fix: channel đợi host decision rồi mới edit card
- Ảnh hưởng: WhatsApp, iMessage, web chat, Google Chat

**Attachment staging path traversal (#4170, #3276)**
- Message ID chứa `/` (Google Chat dùng `spaces/<id>/messages/<id>`) bị drop attachment
- Fix: escape path separators khi stage files

**Google Chat webhooks (#4100, #4132)**
- Adapter không verify được Workspace add-on JWT
- Fix: collect endpoint URL + project number, dùng đúng audience claim

**Channel code move (#3156)**
- Attachments (photos, PDFs) giờ pass qua provider dưới dạng structured parts thay vì text mention
- Vision models nhận được file thực

**PDF support (#4174)**
- Agent image thiếu `poppler-utils` → Claude Read tool fail mọi PDF
- Fix: add package vào Dockerfile

**Update-skills barrel detection (#3451, #4144)**
- `/update-skills` nhầm support modules (như `slack-a2a-guard.js`) là channel skills → fail
- Fix: attribute barrel imports về skill đúng

### Đang mở (quan trọng)

**OneCLI 1.45 migration (#4094, #4095)** - core-team
- Pin OneCLI gateway 1.45, CLI 2.11 (required stop trước 2.x)
- 1.44+ start agents với no grants → phải define explicit grants
- `/add-dial-tool` ported sang agent grants
- Chặn mọi channel PRs khác vì breaking change lớn

**Channel-to-skill migration prep (#4177, #4178)** - core-team
- Add CI jobs test channel payloads
- Google Chat adapter moved vào skill payload làm proof-of-concept
- Mục tiêu: tách channels branch, mỗi adapter thành independent skill

**Image base upgrade (#3996, #2307, #1778)** - triage/needs-author
- 3 PRs muốn upgrade node:22-slim → node:24-trixie-slim
- Lý do: pin GLIBC version, fix `gws` calendar GLIBC_2.39 requirement
- Đang review conflicts

**Approval card text length (#4156, #4147)** - core-team
- Long approval requests bị cut trên Telegram/Discord/WhatsApp Cloud
- Fix: split thành full-text message + short button card
- Gateway cards luôn show full action text

## 4. Điểm nổi bật cộng đồng

**Most active issue: #3529 (5 comments)** - OPEN
- Update skill refresh xóa local custom adapters
- Không có opt-out mechanism
- User @glifocat report, đang pending fix

**Fresh bugs reported:**
- #4175: Agent image thiếu pdftoppm → không đọc được PDF (fixed #4174)
- #4173: Agent muốn reset session + resume từ handover khi context đầy

**PRs từ community:**
- @barnuri: #3976 GitHub Copilot provider skill (under review)
- @antonio-antuan, @stefancgillberg, @horsehcj, @gbmerrall: bug fixes cho CLI/channels

## 5. Ổn định & Bugs

### Severity cao đã fix
- Discord approval buttons corrupt custom_id (#3456) - CLOSED 2026-10-21
- Approval click race condition (#4168, #4171) - security impact

### Đang xử lý
- #3529: Update overwrites local adapters
- Resend (email) channel broken (#4169) - fix đang review
- Subprocess timeout trong OneCLI detector test (#4022)

### Container/deployment
- Signal adapter clock-step bug on Raspberry Pi (#4018) - fixed
- Systemd unit race với docker start (#4019) - fixed

## 6. Yêu cầu tính năng

**#4173: Agent session reset capability** (mới, 2026-10-21)
- User: @carstenf
- Problem: long research runs fill context → auto-compact drops details
- Request: tool để agent reset session + resume từ handover file trước khi hit limit

**#3976: GitHub Copilot provider** (under review)
- Skill dùng device-login token qua credential gateway
- Tránh pass token qua environment variables

## 7. Phản hồi người dùng

Không có discussion threads mới. Activity tập trung vào bug reports và PR reviews.

Issues đóng gần đây cho thấy user pain points:
- Approval UX broken nhiều channels
- PDF handling missing
- Google Chat integration không hoạt động

Core team responsive: bugs reported 2026-10-21 đã có fixes merged cùng ngày.

## 8. Backlog & Roadmap

### Đang diễn ra (inferred từ PR activity)

**Q4 2026 priorities:**
1. **Channels → Skills migration** (#4177, #4178)
   - Tách channels branch
   - Mỗi adapter thành independent skill payload
   - Google Chat là pilot

2. **OneCLI 2.x prep** (#4094)
   - Pin 1.45 gateway
   - Migrate mọi skills sang explicit grants
   - Breaking change: phải complete trước 2.x

3. **Container modernization** (#3996, #2307, #1778)
   - Node 24, Debian Trixie
   - Pin GLIBC version
   - 3 competing PRs cần consolidate

### Backlog cleanup
- Core team @glifocat đang systematic clear approval/attachment bugs
- Community PRs (@barnuri Copilot, @orgads container) đang review

### Blockers
- OneCLI migration blocking channel work
- Base image PRs conflict, cần decision

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw - 2026-10-22

## 📊 Tóm tắt hôm nay

Không có activity mới đáng kể. 30 PRs mở từ tháng 6-8 vẫn đang pending, chủ yếu tập trung vào reborn agent optimization, WebUI design system, và infrastructure hardening. Không có releases, issues, hay merges trong 24h qua.

## 🚀 Releases

Không có releases.

## 📈 Tiến độ dự án

### Core Agent (reborn)
**Context management crisis** - nhiều PRs stuck từ tháng 6-7:
- #5450: Cắt output tool để giảm context carry-across (XS, June 30)
- #5353: Fix http.save body limit - agent loop timeout → score 0 (S, June 26)  
- #6093: Self-verification pass + benchmark profile (XL, July 14)
- #6232: Auto-activate web search - agent không tự discover được web tools (XL, July 18)
- #7976: Derive compaction từ model window size thay vì hardcode (XL, Aug 28)

**Pattern**: Context window đầy → eviction → re-read balloon → quality loss. Team đang thử nhiều levers nhưng chưa merge solution nào.

### WebUI & Design System
Epic #7781 phase 2 đang triển khai:
- #7994: DESIGN.md governance + Storybook guidelines (M, Aug 31)
- #8010: Session-event transport + run-completion notifications (XL, Aug 31)
- #7831: Chromatic CI lane cho Storybook visual regression (XL, Aug 23)

M3 Expressive design language đang được formalize. React 19 + Tailwind v4 stack.

### Infrastructure & Safety
- #7958: Shared review router cho learning feedback (XL, Aug 27)
- #7945: Preserve case-sensitive MCP tool names (L, Aug 27)
- #5356: Harden activity identity invariants (L, June 26)

### Dependencies
Bot đang bump thường xuyên:
- #8140: serde_json 1.0.151 → 1.0.154
- #8141: tokio ecosystem group (5 updates)
- #8152: rustls 0.23.43 → 0.23.45
- #8150: multidict 6.7.1 → 6.9.1

## 🔍 Điểm nổi bật cộng đồng

**Không có engagement.** 30 PRs có `undefined` comments. Không có discussions, không có external contributions. Red flag cho community health.

Possible causes:
- Team nhỏ, internal development
- PRs quá technical cho external contributors
- Thiếu first-good-issue tags
- Docs chưa đủ onboard contributors

## 🐛 Ổn định & Bugs

### Critical production issues (chưa fix)
1. **Agent score 0 trên benchmarks** (#5353): http.save reject large downloads → timeout loop → task fails
2. **Web search không discoverable** (#6232): reborn treat mọi integration như opt-in extension, agent không tự activate web_search
3. **Context eviction quality loss** (#5450, #7976): nhiều attempts, không converge

### Fixed issues
- #8056: Malformed preview range panic (XS, Sept 3)
- #7974: Project untagged observations safely (M, Aug 28)
- #7897: Chat users không biết đi đâu setup ceremony (XL, Aug 26)

## ✨ Yêu cầu tính năng

### Đang implement
1. **Runtime-swappable components** (#7510): Design doc approved, cho phép swap agent components at runtime
2. **IronHub agent link operator UI** (#7516): WebUI surface để register với IronHub, hiện tại CLI-only
3. **Concurrent subagent cap** (#8061): Limit children subagents, verify approval card replay
4. **Custom MCP registration privacy** (#7253): Keep hosted-MCP registration private, definition-only

### Docs & QA
- #7114: Cover 11 manual QA use cases chưa có automated tests
- #7636: Shell tool description guidance - model nghĩ mỗi call = 1 primitive thay vì command line

## 💬 Phản hồi người dùng

**Không có user feedback visible.** Tất cả PRs từ internal team (@pranavraja99, @BenKurrek, @serrrfirat, @rdisandro, @henrypark133, @ilblackdragon).

Duy nhất external: @neo-sky trên #7516 (tag `contributor: new`), nhưng không có comments.

## 🗓️ Backlog & Roadmap

### Near-term (đang active)
- WebUI design system consolidation (M3 Expressive)
- Reborn context management fixes
- Learning review router
- MCP integration hardening

### Blocked/stale (>2 months)
- #5450, #5353, #5298, #5356 (June PRs chưa merge)
- #6093, #6232 (July PRs chưa merge)

### Architecture shifts
- #7510: Runtime-swappable components design approved
- #6559: Make IronClaw contracts canonical, normalize `IRONCLAW_*` env vars

---

**Health check**: Velocity thấp. 30 PRs open, cũ nhất 4 tháng. Zero community engagement. Critical agent bugs (#5353, #6232) chưa resolve. Team focus vào foundation (design system, architecture docs) thay vì ship features.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-10-22

## 📊 Tóm tắt hôm nay

Không có release. Tập trung vào sửa lỗi và cải thiện trải nghiệm người dùng. 27 PR đang mở, 9 PR merged/closed trong 24h qua. Nhiều fix liên quan đến UI Console, cron jobs, và context management.

## 🚀 Tiến độ dự án

### PRs chính đang triển khai

**🎯 Tính năng lớn (XXXL):**

- **#7874** - Thiết kế lại SDK và control plane cho PawApp. Cho phép apps đăng ký handler và expose công việc ra Main Chat qua Host contract. Đang review.
- **#8363** - Tích hợp QwenPaw-Data với PawApp task contract. Mở rộng khả năng delegate analysis từ Main Chat.
- **#8248** - Tích hợp OpenUI plugin để render UI tương tác trong chat reply (closed hôm nay).
- **#8187** - Tách channels thành plugins với subprocess isolation để tăng tính ổn định.
- **#7565** - Hot reload plugin an toàn với rollback mechanism.

**🔧 Cải thiện chất lượng (L-XL):**

- **#8347** - Tích hợp ReMe 0.4.2 với JEV compaction option để tối ưu context.
- **#8133** - Fix markdown emphasis cho CJK text trong chat console.
- **#8287** - Fix thinking slider fill và stabilize việc lưu settings.
- **#8362** - Scope chat drafts theo conversation thay vì agent (fix #8351).

### Issues quan trọng đang mở

**🐛 Bugs nghiêm trọng:**

- **#8359** - Hub trong container không start được Docker runtime do readiness probe hardcode 127.0.0.1. Mới mở hôm nay.
- **#8279** - ReMe watchers exhaust thread limiter, làm stall HTTP endpoints.
- **#8361** - Automatic Memory Search lặp đi lặp lại cùng query, bị block và không reply.
- **#8350** - Feishu channel thực thi sync network call trên main event loop, làm toàn service đứng khi mạng chậm.

**✨ Feature requests:**

- **#338** - Request thêm webhook để tích hợp với hệ thống bên ngoài. Issue cũ (2026-03), có 10 comments.
- **#8354** - Cho phép set QWENPAW_* env vars cho Hub-managed runtimes qua UI.

## 🔥 Điểm nổi bật cộng đồng

**Top tương tác:**

1. **#338** (webhook) - 10 comments, 1 👍. Cộng đồng đang chờ cơ chế tích hợp async.
2. **#8351** (draft leak) - Issue mới phát hiện bug UX: draft gõ dở trong 1 conversation hiện lại ở conversation khác cùng agent. Đã có fix #8362.
3. **#8298** - send_file_to_user với video làm wedge session vĩnh viễn (422 unknown variant). Đã có fix #8299.

**Closed hôm nay:**

- **#6973** - Question về token plan của Alibaba Cloud Bailian (6 comments).
- **#8340** - Cron editor không đóng được sau edit.
- **#8252** - Agent cross-call bị cancel thầm lặng không ghi log.
- **#8225** - Config save trigger hot reload làm cancel cron jobs đang chạy.

## 🛠️ Ổn định & Bugs

**Merged/closed hôm nay:**

1. **#8353** - Fix cron jobs bị cancel khi agent reload. Bảo toàn running jobs và concurrency limits.
2. **#8349 + #8267** - Fix cron editor: time picker hiển thị sai 00:00, request content thành `[object Object]`, không đóng được modal.
3. **#8327** - Fix ACP exit non-zero sau khi task solved do long tool calls.
4. **#8317** - Trace cancel reason và initiator trong stop cascade (fix #8252).
5. **#8283** - Thêm decision-model-backed tool approval mode (TypeSafe JEV).

**Đang xử lý:**

- **#8359** - Docker runtime readiness probe bug. Mới mở, chưa có fix.
- **#8361** - Memory search loop. Chưa có PR.
- **#8279** - Thread limiter exhaustion. Đang điều tra root cause.

## 📋 Yêu cầu tính năng

1. **Webhook** (#338) - Cho phép gọi API của hệ thống khác, nhận response async.
2. **Hub env vars UI** (#8354) - Set QWENPAW_* vars qua Console thay vì hand-edit docker-compose.
3. **Bailian token plan** (#6973, closed) - Đã có người confirm không cần vì dùng được API keys thông thường.

## 💬 Phản hồi người dùng

**Pain points:**

- **Cron UX**: Nhiều user gặp bug editor (time reset, content corrupt, modal stuck). Đã fix.
- **Context**: Long conversations gặp memory và performance issues. #8347 đang thêm ReMe compaction.
- **Channels stability**: Feishu channel block main loop (#8350). Đang refactor #8187 tách isolation.
- **Video handling**: Send video to user làm hỏng session (#8298). Đã có retry fallback.

**Positive:**

- Realtime voice chat (#7785) đang được phát triển.
- PawApp architecture (#7874) mở rộng khả năng tích hợp apps.

## 🗺️ Backlog & Roadmap

**Đang trong pipeline (đã có PR):**

- **PawApp SDK redesign** (#7874, #8363, #8364) - Hệ thống task contract mới.
- **Realtime voice** (#7785) - Speech input/output trong chat.
- **Plugin isolation** (#8187) - Channels thành subprocess plugins.
- **ReMe context** (#8347) - JEV compaction option.

**Beta release:**

- Version bump 2.3.0b1 (#8355, closed hôm nay).
- Creator 2.0.2 (#8357) - Skills management và narration safety.

**Chưa có PR:**

- Webhook (#338).
- Hub env vars UI (#8354).
- Memory search loop fix (#8361).

---

**Nhìn chung:** Dự án đang trong giai đoạn bug fixing và stabilization sau release 2.2.x. Focus vào UX (cron editor, chat drafts, thinking slider), performance (context, thread limiter), và architecture refactor (PawApp, plugin isolation). Cộng đồng active, nhiều user reports chất lượng.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*