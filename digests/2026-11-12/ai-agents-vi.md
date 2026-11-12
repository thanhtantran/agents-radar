# Bản tin Hệ sinh thái Hermes Agent 2026-11-12

> Issues: 71 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-11-12 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-11-12

## 📊 Tóm tắt hôm nay

Dự án focus security marathon: 15+ PR fix lỗ hổng bảo mật từ SSRF, credential leaks, đến authorization bypass. Desktop thêm redesigned workspace (PR #152168). Plugin catalog mở rộng: logmine (log analysis), dosbox-full-auto, exoself, roster-compiler.

---

## 🚀 Tiến độ dự án

### Security Marathon (ưu tiên cao)
- **#154128**: SSRF trong cron monitor - urllib follow redirect bypass scheme check
- **#153643**: Relay media bearer leak - URL parsing bypass qua `@attacker.example/` 
- **#153645**: Desktop credentials attach before origin pin - GHSA-74649
- **#153813**: `/stop`, `/new`, `/reset` cancel session trước khi runner chấp thuận
- **#153846**: Skills scanner bypass qua invalid UTF-8, PEP 263 encoding cookies, NUL bytes
- **#154125**: Symlink bypass trong sensitive-path guard
- **#153855**: Dashboard basic-auth sessions persist sau logout
- **#153849**: WhatsApp session store mode 644 leak credentials
- **#153818**: Skills Hub redirect SSRF
- **#153815**: SMTP/IMAP login cleartext khi STARTTLS stripped
- **#154126**: Google OAuth secrets không mask trong logs

Pattern: authorization checks race, credential scope leaks, path canonicalization holes.

### Major Features
- **#152168** [Desktop redesign]: Global nav, gateway-grouped agents, pinned sessions. Classic layout optional (Settings → Window layout)
- **#154163**: Delegate task continue after gateway crash - salvage #145331
- **#153134**: `roster-compiler` plugin - hospital duty roster validator

### Desktop Stability
- **#154191**: Multi-line SSH payload qua stdin - fix csh login shell
- **#154189**: macOS fullscreen → tray không còn black screen (port cline#14271)
- **#154188**: Telegram file/photo trong clarify answer giờ reach agent (port cline#15059)

### Plugin Ecosystem
- **#151546**: Hermes Wear Kit (WearOS) - full gateway trên smartwatch
- **#153651**: logmine - local log analysis với template mining
- **#153648**: exoself - auto-update `SOUL.md` identity per profile
- **#152641**: Hermes Market - skill API discovery, contract drafting, purchase

### Infrastructure & Bugs
- **#152296**: Cron receipt recovery clear newer firer's `fire_claim`
- **#152333**: Fallback model persist qua session reload → sai billing
- **#148498**: macOS desktop `hermes --version` cost 4-76s passive update check → false "missing"
- **#145375**: `hermes update` pause gateways, systemd restart nhưng pause record stuck → infinite retry
- **#152288**: OpenRouter spend under-report 3x - dùng model price thay vì endpoint `usage.cost`

---

## 🔥 Điểm nổi bật cộng đồng

### Top Engagement (10+ comments)
1. **#143547** (60 comments): Unified gateway post-merge issues - platform/Discord, sessions, profiles
2. **#143379** (36 comments): RFC doc-chain substrate - read, governance, compaction
3. **#106592** (10 comments): Update reports failure sau systemd restart thành công

### High Impact Issues
- **#153396** (8 comments, 7 👍): Slack team gateway - bring your own app, keep bot name/avatar
- **#153727** (6 comments): Gateway event loop GIL-starved với 15 profiles macOS - 69-84% time in `take_gil`
- **#95670** (6 comments, 1 👍): Discord handoff thread omit type → default `private_thread`

---

## 🐛 Ổn định & Bugs

### Critical
- **#127882**: `browser_vault_enter_code` no origin binding - TOTP vào bất kỳ page nào
- **#73748**: Gateway turn aborted by transient error lost, not retried
- **#84269**: Run/approval registries authorize by run ID only - no profile binding

### High Priority
- **#152365**: WeChat voice message (empty text) stuck `session_admissions` at `started`
- **#152175**: MCP loop teardown fail → mất hết tools, "zero servers" đến restart
- **#106775**: 6 high-severity dev-tree advisories có fix >14 days

### Medium Impact  
- **#147400**: Webapp sticky-prompt clip break khi CSS zoom ≠ 100%
- **#145296**: Android soft-keyboard input dropped trong dashboard chat
- **#142488**: Model switch crash profile-following sessions - `moved` tuple shadowed
- **#133569**: Desktop "Show earlier" inert - không load older history

---

## 💡 Yêu cầu tính năng

### Plugins & Extensions
- **#154193**: gleif plugin - LEI records từ GLEIF API
- **#154016**: Plugin API documented cách resolve provider credentials
- **#88141**: Video fast-path cho `video_analyze` - native multimodal channel

### Desktop & UX
- **#153586**: `kanban_create` set block reason khi `initial_status: "blocked"`
- **#152279**: Cmd+B follow Sessions thay vì physical left sau sidebar swap

### Infrastructure
- **#152221**: Profile remote override flip local wire → legacy, break image paste
- **#152102**: Kanban webapp move to Done fail - "no result evidence", no way supply

---

## 💬 Phản hồi người dùng

### Pain Points
- **i18n**: #105163 - stall-guard English-only → non-English agents disabled
- **Auth complexity**: #107988 - Keys settings "Get key" links dead sau hardened policy
- **Update UX**: #145375, #152200 - `hermes update` restart logic incomplete, confusing states

### Positive Signals  
- #51292, #103798: Container CVE cleanup proactive từ community
- #151546: WearOS full client - first full-featured smartwatch trong catalog
- Plugin ecosystem growth: 4 new submissions tuần này

---

## 📋 Backlog & Roadmap

### Active Tracks
1. **Security hardening** (marathon mode): ~15 PRs open, focus credential scope, path canonicalization, redirect handling
2. **Desktop redesign rollout**: #152168 default, classic fallback
3. **Gateway stability**: sessions, profiles, multiplexed performance
4. **Plugin ecosystem**: tooling API documentation, validation improvements

### Pending Major Work
- #143547: Unified gateway remaining post-merge issues (60 comments backlog)
- #143379: Doc-chain substrate RFC implementation
- MCP tooling stability (#152175, #153727 GIL contention)

---

**Trend**: Security audit in full swing. Desktop polish. Plugin ecosystem mature. Gateway multiplexing performance bottlenecks emerge at scale (15+ profiles).

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-11-12

## 1. Tổng quan hệ sinh thái

Hệ sinh thái đang trong giai đoạn **security hardening** và **plugin architecture standardization**. Hermes Agent, Zeroclaw dồn dập fix lỗ hổng bảo mật (SSRF, injection, credential leak). QwenPaw chuyển sang plugin cho local models, MCP, third-party agents. NanoBot dọn dẹp technical debt session management.

**Mức độ hoạt động**: cao (Hermes, QwenPaw), trung bình (NanoBot, Zeroclaw), thấp/không hoạt động (PicoClaw, NullClaw, IronClaw, NanoClaw, OpenClaw).

**Chủ đề chung**: channel stability (desktop, multi-platform), cost control, multi-agent orchestration, local model inference.

---

## 2. Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động chính | Mức độ tương tác |
|-------|--------|-----|----------|----------------|------------------|
| **Hermes Agent** | 71 | 500 | 0 | Security marathon: 15+ PR fix SSRF/injection/credential leak. Desktop redesign (#152168). Plugin catalog mở rộng (logmine, dosbox, exoself, roster-compiler). | ⭐⭐⭐⭐⭐ (60 comments #143547, 36 comments #143379) |
| **QwenPaw** | 7 | 33 | 1 | v2.3.0 stable: Piccolo local models (4B/9B/27B). Tách local model management, MCP, third-party agents thành plugin. Fix channel plugin Windows/Linux. | ⭐⭐⭐ (5 comments #8669, 4 comments #8538) |
| **NanoBot** | 3 | 16 | 0 | Refactor session: xóa shared-session mode, retire OpenAI selector cũ. WebUI stability: context panel, turn recovery. Fix cross-session message leak. | ⭐⭐ (0 thumbs-up, minimal external engagement) |
| **Zeroclaw** | 8 | 49 | 0 | Security: 8 PR injection/sanitization (firejail, git, email, Notion, ANSI). Feature pending: SSH reuse, delegate bounds, inter-agent sessions. | ⭐⭐ (5 comments #8794, 6 comments #7461) |
| **PicoClaw** | 4 | 0 | 0 | Không hoạt động phát triển. Bot đóng issues cũ. Security issue #3456 (approval hook reload) vẫn mở. | ⭐ (0 reactions) |
| **OpenClaw** | 170 | 500 | 1 | ⚠️ Tạo tóm tắt thất bại | ❓ |
| **NanoClaw** | 0 | 23 | 0 | ⚠️ Tạo tóm tắt thất bại | ❓ |
| **NullClaw** | 0 | 0 | 0 | Không hoạt động | ❌ |
| **IronClaw** | 0 | 0 | 0 | Không hoạt động | ❌ |

---

## 3. Vị thế của Hermes Agent

### 🏆 Dẫn đầu về:

**Security leadership**: Hermes chạy marathon hardening với 15+ PR fix lỗ hổng trong 1-2 ngày. Coverage toàn diện: SSRF (cron monitor, Skills Hub), credential leak (relay media, WhatsApp session, Google OAuth), authorization bypass (session cancel, skills scanner), path traversal (symlink bypass). Pattern: tìm và fix từng điểm yếu cụ thể, không đợi incident.

**Community engagement**: 60 comments (#143547 unified gateway issues), 36 comments (#143379 doc-chain RFC). Issues có tương tác cao, discussions về RFC, roadmap. User report production pain points (WeChat voice stuck, MCP loop teardown, gateway GIL contention).

**Feature velocity**: Desktop redesign shipped (#152168), 4 plugin mới (logmine, dosbox-full-auto, exoself, roster-compiler), Hermes Market (skill API discovery), Wear Kit (WearOS full gateway).

**Ecosystem maturity**: Plugin catalog phát triển nhanh. Tooling API documentation đang cải thiện. Community contributors active (container CVE cleanup #51292, #103798).

### ⚠️ Pain points:

- **Gateway multiplexing bottleneck**: 15 profiles trên macOS → GIL-starved 69-84% (#153727)
- **Update UX confusion**: `hermes update` restart logic incomplete (#145375, #152200), pause record stuck → infinite retry
- **i18n gaps**: stall-guard English-only → non-English agents disabled (#105163)
- **Post-merge issues**: #143547 (60 comments backlog) unified gateway còn nhiều vấn đề platform/Discord, sessions, profiles

### 📊 So với đối thủ:

Hermes dẫn về **feature breadth** (desktop, mobile, wearable, plugins, channels) và **security rigor**. QwenPaw dẫn về **local model integration** (Piccolo 4B/9B/27B runtime). Zeroclaw focus **foundational correctness** (SSH reuse, delegate bounds, multi-model schema). NanoBot focus **session consistency**.

Hermes = platform, QwenPaw = inference engine, Zeroclaw = framework.

---

## 4. Hướng kỹ thuật chung

### 🔐 Security hardening (Hermes, Zeroclaw):
- **Injection prevention**: firejail flag injection, git ref validation, email CRLF
- **Credential scope**: relay bearer leak, WhatsApp session permissions, OAuth secrets logging
- **Path canonicalization**: symlink bypass, sensitive-path guards
- **SSRF**: cron monitor redirect, Skills Hub redirect

### 🔌 Plugin architecture (Hermes, QwenPaw):
- **Subsystem isolation**: QwenPaw tách local models, MCP, third-party agents thành plugin (#8499, #8469, #8426)
- **Catalog growth**: Hermes thêm 4 plugins, tooling API documentation
- **Config compatibility**: QwenPaw giữ nguyên config/model files cũ khi migrate

### 💬 Channel stability (Hermes, QwenPaw):
- **Multi-platform**: desktop Windows/Linux/macOS, mobile Android/iOS, wearable
- **Race conditions**: QwenPaw #8669 (channel startup), Hermes #152296 (cron receipt recovery)
- **Error handling**: DingTalk markdown rendering, WeChat voice empty text

### 🤖 Local models (QwenPaw):
- **Decision models**: Piccolo 4B/9B/27B cho tool review, context compaction
- **Runtime**: BF16, Q8_0, llama.cpp lifecycle
- **Opt-in**: không thay thế cloud mặc định, giảm phụ thuộc cho internal tasks

### 🔄 Multi-agent orchestration (Hermes, Zeroclaw):
- **Hermes**: #143379 doc-chain substrate RFC (read, governance, compaction)
- **Zeroclaw**: #12258/#12259 `sessions_prompt` sync, `sessions_message` async

### 💰 Cost control (Hermes, Zeroclaw):
- **Hermes**: OpenRouter spend under-report 3x fix (#152288), fallback model persist billing bug (#152333)
- **Zeroclaw**: operator override exceeded limit (#11589)

---

## 5. Điểm khác biệt

### Chiến lược:

| Dự án | Focus | Approach |
|-------|-------|----------|
| **Hermes** | Platform completeness | Broad surface: desktop/mobile/wearable/plugins. Security marathon. Community-driven feature requests. |
| **QwenPaw** | Local inference | Plugin architecture. Piccolo decision models runtime. Beta → stable transition. |
| **Zeroclaw** | Correctness | Foundational features (SSH reuse, delegate bounds, multi-model schema). Security point fixes. Long review cycles (3+ months). |
| **NanoBot** | Session consistency | Technical debt cleanup. Refactor shared-session mode, OpenAI selector. Strengthen state management. |

### Tính năng độc quyền:

- **Hermes**: WearOS full gateway, Hermes Market (skill API discovery), global nav desktop redesign
- **QwenPaw**: Piccolo local models (4B/9B/27B), OpenSandbox cloud container integration
- **Zeroclaw**: Native Rust XMPP with OMEMO, Gemini speech-to-speech broker
- **NanoBot**: (không có tính năng độc quyền rõ ràng)

### Cộng đồng:

- **Hermes**: High engagement (60/36 comments top issues), RFC discussions, production pain reports, plugin ecosystem growth
- **QwenPaw**: Beta testers active, channel plugin migration issues có nhiều feedback, community contributors (#8678, #8601, #1972)
- **Zeroclaw**: Production users report trace loss, cron status confusion, cross-OS CI gaps. Long-standing issues (8+ months)
- **NanoBot**: Low external engagement (0 thumbs-up), internal team work, minimal discussion
- **PicoClaw**: Bot activity only, security issue không được xử lý

---

## 6. Mức độ trưởng thành cộng đồng

### 🏆 Trưởng thành (Hermes):
- RFC process (#143379 doc-chain substrate)
- Production pain feedback (#153727 GIL contention, #145375 update UX)
- Plugin ecosystem (4 mới, community submissions)
- 60-comment discussions về post-merge issues
- Container CVE cleanup proactive (#51292, #103798)

### 🌱 Phát triển (QwenPaw):
- Beta → stable transition (v2.3.0)
- Community contributors (#8678 first-time, #8601, #1972)
- Channel plugin migration có nhiều feedback (5/4 comments)
- Desktop/Windows/Linux cross-platform users

### 🔨 Xây dựng (Zeroclaw):
- Production deployment reports (Windows service trace loss)
- Long review cycles (3-8 months PRs)
- Cross-OS CI coverage gaps (#7461)
- Cron status, error reporting confusion

### 🌿 Nền tảng (NanoBot):
- Internal team work (7 PR merged 4 giờ)
- 0 external reactions
- Bug fixes không có discussion
- Technical debt cleanup phase

### 🪫 Không hoạt động (PicoClaw, NullClaw, IronClaw):
- Bot-only activity (PicoClaw)
- Không commits, PRs, releases
- Security issues không được xử lý

---

## 7. Tín hiệu xu hướng

### 🔮 6-12 tháng tới:

**1. Security baseline thành standard**
- Hermes, Zeroclaw đang set precedent: SSRF, injection, credential scope checks
- Các dự án khác sẽ áp dụng audit process tương tự
- Security-as-code: pre-commit hooks, automated scanning

**2. Plugin architecture phổ biến**
- QwenPaw migrate local models, MCP, third-party agents
- Hermes plugin catalog growth
- Pattern: core minimal, extensions via plugins
- Tooling API documentation, validation frameworks

**3. Local inference cho decision tasks**
- QwenPaw Piccolo 4B/9B/27B cho tool review, context compaction
- Trend: cloud cho reasoning, local cho gating/filtering
- Edge deployment: WearOS (Hermes Wear Kit), mobile runtimes

**4. Multi-agent orchestration standardization**
- Hermes doc-chain substrate RFC
- Zeroclaw `sessions_prompt`/`sessions_message` tools
- Pattern: inter-agent sessions, delegation bounds, workspace preservation

**5. Channel multiplexing optimization**
- Hermes GIL contention 15 profiles (#153727)
- QwenPaw channel startup race conditions
- Focus: concurrent channels, async I/O, worker pools

**6. Cost control tooling**
- Operator overrides (Zeroclaw #11589)
- Spend reporting accuracy (Hermes #152288 OpenRouter fix)
- Budget tracking, usage analytics dashboards

**7. Cross-platform desktop stability**
- Hermes desktop redesign, macOS fullscreen fix
- QwenPaw Windows/Linux channel plugin fixes
- Zeroclaw Windows CI matrix gaps
- Pattern: platform-specific quirks → abstraction layers

**8. Observability gaps**
- Zeroclaw trace loss (#12391), query dump overflow (#12674)
- Hermes log compaction, session debugging
- Trend: structured logging, trace retention policies, diagnostics UX

### ⚠️ Rủi ro:

**Breaking changes**: NanoBot retire shared-session mode, QwenPaw plugin migration → instability phase. Users cần migration paths rõ ràng.

**Desktop packaging**: Hermes, QwenPaw gặp vấn đề Windows/macOS specific. Native dependencies, environment variables, path handling cần standardization.

**Multiplexing performance**: 15+ profiles → bottleneck (Hermes #153727). Multi-tenant deployments cần async overhaul.

**Ecosystem fragmentation**: 9 dự án, 3 không hoạt động, 2 fail tóm tắt. Consolidation có thể xảy ra (mergers, forks die off).

### 🚀 Cơ hội:

**Security leadership**: Dự án nào ship audit dashboard, compliance reports, penetration test frameworks sẽ win enterprise.

**Local inference**: Edge deployment (WearOS, mobile), offline mode, privacy-focused use cases.

**Plugin marketplace**: Hermes Market đang thử nghiệm. Monetization, discovery, curation tools.

**Multi-agent frameworks**: Dự án nào abstract delegation, sessions, workspace bounds tốt nhất sẽ become platform layer.

---

**Kết luận**: Hermes dẫn về platform completeness, community engagement, security rigor. QwenPaw dẫn local inference. Zeroclaw focus correctness. NanoBot dọn dẹp debt. PicoClaw/NullClaw/IronClaw không hoạt động. Xu hướng: security baseline, plugin architecture, local decision models, multi-agent orchestration, cross-platform stability.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-11-12

## 📊 Tóm tắt hôm nay

Ngày refactor lớn: merged 7 PR trong 4 giờ, tập trung dọn dẹp kiến trúc session và cải thiện WebUI stability. Không có release mới.

## 🚀 Releases

Không có.

## 📈 Tiến độ dự án

### Merged hôm nay (7 PR)

**Refactor kiến trúc session:**
- #6621 ❌ Xóa shared-session mode toàn cục - breaking change lớn
- #6615 ❌ Retire OpenAI API selector cũ sau 2 release chuyển đổi
- #6613 🐛 Fix cross-session message ownership, tránh duplicate input

**WebUI stability:**
- #6631 ⚡ Tối ưu model preset saves, giảm 2 consecutive mutations xuống 1
- #6629 🐛 Thêm nút đóng cho expanded context panel
- #6628 🐛 Settle interrupted turns trước khi replay follow-ups
- #6627 🐛 Preserve whitespace khi answer hits output limit

### Open PR đáng chú ý

**High priority (P2):**
- #6468 🐛 Drain parallel tools trước khi finalize cancelled runs (10/26)
- #6617 🐛 Correlate chat requests, cancel stale reconnects (11/09)
- #6265 ⚡ Replay reasoning chỉ cho current turn, không replay toàn bộ history (10/16)

**Feature lớn:**
- #6032 🔐 Configurable local WebUI extensions surface - trusted browser add-ons (10/04, có conflict)
- #6014 🌐 Thêm Keenable MCP preset cho web search (10/03)

**Docs:**
- #6626 📝 Deprecate shared sessions cho setup mới (11/11)

**Đóng/conflict:**
- #2767 ⚙️ Make tool limits configurable (04/03) - đóng do conflict
- #6586 Fix oversized turn history - merged vào #6265

## 🔥 Điểm nổi bật cộng đồng

**#5798 đóng sau 2 tháng** - bug "串会话" (messages leak giữa conversations) từ 09/17, finally fixed. User báo 0.3.5 bị, 0.3.0 không bị.

**#6619 critical** (11/09) - heartbeat turns deliver output to wrong room trong multi-room deployments. Issue nghiêm trọng cho production multi-tenant.

**#6632 feature request** (11/11) - Discord channel cần backfill thread history + optional startup presence. Bot hiện tại answer blind vì không đọc messages cũ.

## 🐛 Ổn định & Bugs

### Đã fix hôm nay:
- Session message ownership corruption
- WebUI interrupted turn recovery
- Model output whitespace loss at continuation boundaries
- Stale reconnect requests
- Context panel UX

### Đang xử lý:
- **#6619** Multi-room output routing - chưa có PR
- **#6468** Parallel tool cleanup race conditions - open từ 10/26
- **#6617** Chat request correlation - open từ 11/09

Pattern: nhiều race conditions và state management bugs. Team đang strengthen consistency guarantees.

## ✨ Yêu cầu tính năng

1. **Discord improvements** (#6632) - backfill history, presence control
2. **WebUI extensions** (#6032) - local trusted add-ons, đang review
3. **Keenable MCP** (#6014) - web search integration, đang review
4. **Tool limits config** (#2767) - đóng do conflict, cần rebase

## 💬 Phản hồi người dùng

**Bug reports:**
- Chinese user (#5798) báo conversation leakage trên Windows 3.12
- @orrinwitt (#6619) báo production multi-room issue với evidence cụ thể

**Quality signals:**
- 0 thumbs-up trên tất cả issues/PRs mới → low external engagement hoặc internal team work
- 3 bình luận trên #5798 → có back-and-forth debugging

## 🗺️ Backlog & Roadmap

**Immediate (merged hoặc sắp merge):**
- ✅ Retire shared-session mode
- ✅ Retire old OpenAI selector
- 🔄 Parallel tool safety (#6468)
- 🔄 Chat request correlation (#6617)

**Next up:**
- Multi-room routing fix (#6619) - chưa có PR
- Discord history backfill (#6632) - mới đề xuất
- Extensions system (#6032) - review dài hạn
- Replay optimization (#6265) - conflict cần resolve

**Trend:** Dọn dẹp technical debt, strengthen multi-tenancy, improve WebUI reliability. Breaking changes tập trung vào Q4 2026 cho v0.5.0?

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw ngày 2026-11-12

## 1. Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào sửa lỗi bảo mật và ổn định: 8 PR mới về injection prevention, sanitization, resource bounds. 8 issue mở, 4 về cấu hình chết và trace loss, 4 về tính năng (XMPP, cron status, SSH reuse, delegate tool ceiling).

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR bảo mật (8 PR, tất cả 2026-11-11, tác giả @Matoo125):**
- #12387: thêm `--` trước invocation trong firejail, chặn flag injection
- #12388: validate emoji Discord, percent-encode URL
- #12389: sanitize ANSI/control chars trong CLI memory output
- #12385: sanitize CRLF trong email subject/message-id
- #12386: bound Notion API response 2 MiB
- #12384: reject ref name bắt đầu `-` trong CI git script
- #12383: browser delegate URL scan case-insensitive

Đợt hardening toàn diện: injection (firejail, git, email), overflow (Notion), escape (ANSI, Discord emoji). Tất cả size XS/S, tập trung sửa từng điểm yếu cụ thể.

**PR tính năng lớn đang pending review:**
- #11869 (2026-10-19, size XL): SSH transport reuse cho `shell` tool, task-owned pool
- #10391 (2026-08-26, size XL): `delegate` tool giữ workspace/policy bounds qua nhiều turn, fix #9872
- #12258/#12259 (2026-11-06, size XL): thêm `sessions_prompt` (sync) và `sessions_message` (async scaffold) cho inter-agent communication
- #11847 (2026-10-19, size XL): native Rust XMPP channel với OMEMO, trả lời #9814
- #9809 (2026-08-07, size XL): schema v4, multiple models per provider profile

**PR UX/stability:**
- #11730 (2026-10-14): hiện tool calls của foreground delegate trong parent turn
- #11698 (2026-10-13): personality files stable per session, giữ prompt cache
- #11589 (2026-10-07): operator override exceeded cost limit
- #12074 (2026-10-27): refresh context budget sau trim
- #12070 (2026-10-27): re-apply system prompt cap sau skill refresh
- #12346 (2026-11-09): notify owner chat khi có unauthorized Telegram message
- #12198 (2026-11-02): `default_provider` fallback cho transcription
- #12197 (2026-11-02): include media captions/voice paths trong Telegram reply context

**Merged hôm nay:**
- #12380: pin docs translations tới v0.9.0
- #12392: bump `rustix` 1.1.6 cho RUSTSEC-2026-0486
- #12215: chore deps bump 36 crates (superseded bởi #12393)

## 4. Điểm nổi bật cộng đồng

**Issue có tương tác:**
- #12397 (2026-11-12, @berot3): cron job report `Ok` nhưng agent kết luận `BLOCKED`, status không phân biệt cron execution success vs agent task outcome
- #8794 (2026-07-07, 5 comments): stop agent mid-work xóa tool calls và thinking khỏi context, workflow blocked (S1)
- #7461 (2026-06-10, 6 comments): test suite chỉ chạy Linux CI, cần Windows/macOS matrix

**User pain points:**
- Cron reporting opacity: executor thấy OK nhưng task thực tế fail
- Context loss khi stop agent: không recover được partial work
- Platform coverage: Linux-only tests miss Windows/macOS bugs

## 5. Ổn định & Bugs

**Bugs mở:**
- #12391: `runtime-trace.jsonl` mất nhiều giờ events qua daemon restarts, handoff buffer drops
- #12396: `history_pruning.keep_recent` và `collapse_tool_results` dead knobs từ #8196
- #12390: `shell` tool trả `"error":""` khi non-zero exit, stderr bị nuốt
- #8794: stop agent mid-work xóa context

**Security fixes merged/pending:**
- Merged: rustix 1.1.6 (RUSTSEC-2026-0486)
- Pending: 8 PR injection/sanitization từ @Matoo125

**Performance:**
- #11698: prompt cache stability qua personality file renders
- #12074: context budget UI refresh post-trim

## 6. Yêu cầu tính năng

**New features requested:**
- #12397: phân biệt cron execution status vs agent outcome
- #9814 (4 comments): native XMPP/Prosody channel cho self-hosted lightweight chat
- #11869: SSH transport reuse, task-owned pool cho repeated remote shell calls

**Major feature PRs:**
- #12258/#12259: inter-agent session prompting (`sessions_prompt` sync, `sessions_message` async)
- #9809: multi-model per provider profile (schema v4)
- #10430: Gemini speech-to-speech broker channel (realtime voice)

## 7. Phản hồi người dùng

**Production pain:**
- @RO-mix (#12391): production Windows service mất giờ trace coverage, debug bị mù
- @berot3 (#12397): cron dashboard hiện OK nhưng task blocked, operator không biết thực tế

**UX gaps:**
- @susyabashti (#8794): stop agent = mất công làm, không thể tiếp
- @ascariandrea (#12390): shell error rỗng, model không biết tại sao fail

**Feature requests:**
- @fabricioartur (#9814): XMPP cho home-lab, nhẹ hơn Matrix/Telegram
- @NiuBlibing (#7461): CI coverage chỉ Linux, prod Windows/macOS bugs thoát

## 8. Backlog & Roadmap

**Parking lot (status:parking-lot):**
- #9814: XMPP channel (priority:p2, risk:high)
- #10430: Gemini speech-to-speech PR1 (daemon-side core)

**In progress (status:in-progress):**
- #7461: Windows/macOS CI matrix (priority:p2, risk:high, 6 comments)

**Accepted & needs work (status:accepted + needs-author-action):**
- #10391: delegate bounds (8+ months old, size XL)
- #11730, #11698, #11589, #11633: UX/stability PRs cần revision
- #12198, #12197, #12070: channel fixes cần revision
- #9809: multi-model schema v4 (3+ months old, 14-package impact)

**Roadmap signals:**
- Multi-agent orchestration: `sessions_prompt`/`sessions_message` tools
- Cost control: operator override cho exceeded limits
- Security hardening: đợt injection fixes toàn diện
- Platform stability: Windows trace loss, cross-OS CI
- Voice/realtime: Gemini STS broker, transcription fallback

**Technical debt:**
- Dead config knobs (#12396): `keep_recent`, `collapse_tool_results`
- Stderr swallowing (#12390): shell tool error reporting
- Context preservation (#8794): stop-agent recovery

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 2026-11-12

## 🔍 Tóm tắt hôm nay

Không có hoạt động phát triển mới. Bốn issues đã được đóng/đánh dấu stale, ba trong số đó do bot tự động xử lý sau thời gian không hoạt động. Một issue bảo mật (#3456) vẫn mở, cần xử lý.

## 📦 Releases

Không có releases mới.

## 📊 Tiến độ dự án

**Pull Requests**: Không có hoạt động.

**Issues đóng trong 24h**:
- **#3468**: Bug nghiêm trọng - MCP init failure làm agent loop treo hoàn toàn trên Windows 0.5.4. Chat không trả lời, `/health` vẫn OK, log đóng băng.
- **#3450**: Feature request - thêm chat folders cho Web UI để tổ chức session history.
- **#3449**: Bug report không có nội dung chi tiết.

**Xu hướng**: Dự án đang trong giai đoạn ổn định, không có commit hay PR mới. Activity chủ yếu từ bot dọn dẹp issues cũ.

## ⚡ Điểm nổi bật cộng đồng

Không có issues hay PRs có tương tác cao. Các issues đều có 0 reactions và 1-2 comments (chủ yếu từ bot).

## 🐛 Ổn định & Bugs

**Bug nghiêm trọng (#3468)**: 
- MCP server init failure làm treo toàn bộ agent loop
- Ảnh hưởng: Windows 0.5.4, tất cả channels
- Triệu chứng: chat không phản hồi, `/health` vẫn OK, log không ghi
- Đã đóng nhưng chưa thấy commit fix

**Lỗ hổng bảo mật (#3456) - ĐANG MỞ**:
- Approval hook re-init thất bại khi reload → gateway chạy không kiểm soát tools
- Nguy cơ: tools chạy không qua approval process
- Cần ưu tiên xử lý

## 🎯 Yêu cầu tính năng

**#3450 - Chat folders trong Web UI**:
- Hiện tại: tất cả sessions trong một list phẳng, sắp xếp theo thời gian
- Đề xuất: thêm folders để tổ chức sessions (theo project, date, tags)
- Backend: cần thêm folder metadata vào session storage
- Frontend: UI quản lý folders, drag-drop sessions

## 💬 Phản hồi người dùng

Ít tương tác từ cộng đồng. Issues được report nhưng không có discussion hay upvotes.

## 📋 Backlog & Roadmap

Không có thông tin roadmap mới. Hai vấn đề cần xử lý:
1. Fix security issue #3456 (approval hook reload)
2. Investigate và fix MCP init hang trên Windows (issue #3468 đã đóng nhưng chưa thấy giải pháp)

---

**Đánh giá**: Dự án đang yên tĩnh, có thể đang tập trung fix bugs nội bộ trước khi release tiếp theo. Security issue cần attention ngay.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo QwenPaw - 2026-11-12

## 📅 Tóm tắt hôm nay

v2.3.0 stable vừa phát hành (11/11), đang chạy verification. Team đồng thời sửa bug channel plugin trên Windows/Linux, chuẩn bị tách local model management thành plugin, và fix các vấn đề tích lũy log/dump không giới hạn.

---

## 🚀 Releases

### v2.3.0 (Stable - 2026-11-11)
**Tính năng chính:**
- **Piccolo Local Decision Models**: Thêm Piccolo 4B/9B/27B cho tool review và context compaction, tải runtime tự động từ HuggingFace/ModelScope
- **Local model runtime**: BF16 và Q8_0, phục vụ 1 model mỗi lúc, opt-in cho review/compaction
- Release note chi tiết: [v2.3.0](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0)

**Ý nghĩa**: Bước đầu hỗ trợ decision model chạy local, giảm phụ thuộc cloud cho các tác vụ internal (tool review, context compression). Plugin architecture đang được mở rộng.

---

## 🔧 Tiến độ dự án

### PRs nổi bật:

**Plugin Architecture Migration (đang triển khai):**
- #8499 (XXL): Tách local model management thành plugin - download, llama.cpp lifecycle, giữ nguyên config/model files cũ
- #8426 (XXL): Extract third-party agent thành plugin
- #8469 (XXL): Extract MCP thành plugin
- #1972: Tích hợp OpenSandbox (cloud sandbox backend) - shell/file/browser automation trong container

**UI/UX:**
- #8648/#8647/#8649 (stacked): Thêm local engine/GPU/auto-update controls vào Console, hỗ trợ MLX engine
- #8601: Fix DingTalk AI card không hiện bảng markdown khi thiếu dòng trống

**Stability fixes:**
- #8678 ⚠️ (first-time): Giới hạn query error dumps (đang ghi không giới hạn vào temp dir)
- #8675 + #8680: Fix Feishu channel Windows desktop - native library path conflict (`\\?\` + `..`)
- #8676: Preserve completion integrity, localize warnings khi model trả empty response

**Testing/Infra:**
- #8308: Thêm test provider lookup trả 404
- #8268: Fix TaskTracker run cleanup callback hang
- #8677: Tăng macOS build timeout lên 90 phút

**Xu hướng**: Tập trung pluginize các subsystem lớn (local models, MCP, third-party agents) và fix các corner case từ production (Windows desktop channel, query error dump overflow).

---

## 🔥 Điểm nổi bật cộng đồng

### Issues có nhiều tương tác:

**#8669** (5 comments): Channel plugin race condition - `_wait_connected` treat initial `platform_state="disconnected"` là fatal → CHANNEL_NOT_CONNECTED trên mọi lần start (Feishu deterministic)
- **Root cause**: Startup logic chưa phân biệt "initial disconnected" vs "failed after attempt"
- **Impact**: Desktop packaged build (2.3.0b4 Windows) fail 100%

**#8538** (4 comments): Matrix channel plugin fail activate khi nhiều workspace cùng enable (10s shared startup window chỉ cover workspace đầu)
- **Impact**: 3 workspaces A/B/C, không workspace nào online sau upgrade 2.3.0b2

**#8616** (3 comments): 2.3.0-beta.1 không start trên Windows 11 IoT LTSC - "path not found" → AppHang (2.2.2 chạy OK)

**#8682**: Official channel plugin workers crash Linux - không có `HOME` / `QWENPAW_WORKING_DIR` từ launcher/worker bootstrap → `qwenpaw.constant` fail

**Chủ đề**: Channel plugin migration (Feishu/Matrix/WeChat) gặp vấn đề trên desktop/Windows/Linux. Team đang active fix (#8675, #8680 đã close).

---

## 🐛 Ổn định & Bugs

### Critical (đang fix):

1. **Query error dump overflow** (#8674 → #8678):
   - Mỗi query fail ghi full conversation JSON vào temp dir, không có limit
   - Production session với recurring fail → hundreds of MB trong vài giờ
   - PR #8678 (first-time contributor) thêm size/count/age/rate limit

2. **Channel plugin startup issues** (Windows/Linux):
   - #8669: Race condition treat initial state là fail
   - #8682: Linux worker crash thiếu env vars
   - #8675 + #8680: Feishu Windows native lib path conflict → fixed, merged

3. **DingTalk markdown rendering** (#8601):
   - Bảng markdown render thành plain text nếu không có blank line phía trước
   - AI card hiển thị pipe syntax thay vì bảng

### Medium:

- #8512: Gateway-reported status trong error text không được parse
- #8487: URL-referenced media trong tool result không được fold khi context compress
- #8268: TaskTracker run completion callback hang → run entry leak

---

## 💡 Yêu cầu tính năng

1. **Cloud sandbox** (#1972): OpenSandbox integration - tool operations (shell, file, browser) chạy trong container
2. **MLX engine** (#8647): Managed MLX + auto-update cho macOS Apple Silicon
3. **QQ C2C streaming** (#8409): Streaming message support cho QQ channel
4. **Configurable Whisper model** (#8052): Cho phép chọn model name cho transcription API (mặc định hardcode `whisper-1`)

---

## 👥 Phản hồi người dùng

### Positive:
- Community contributors đang active: #8678 (query dump limit), #8601 (DingTalk markdown), #1972 (OpenSandbox)
- Plugin architecture được chấp nhận: local models, MCP, third-party agents đang tách dần

### Pain points:
- **Channel plugin migration gây instability** trên desktop/Windows/Linux (3 issues critical, nhiều comments)
- **Windows IoT LTSC compatibility** (#8616): Beta không start, 2.2.2 OK
- **Query error diagnostics**: Thiết kế ban đầu không có retention policy → disk overflow

### Expectations:
- Stable channel plugins (Feishu/Matrix/WeChat) trên mọi platform
- Local model management trong plugin (đang implement #8499)
- Better error handling/logging retention

---

## 📋 Backlog & Roadmap

### Đang triển khai (high priority):
- Plugin migration: local models (#8499), MCP (#8469), third-party agents (#8426)
- Channel stability fixes: #8669, #8682, #8616
- Query diagnostic improvements: #8678

### Planned (từ PRs open):
- OpenSandbox integration (#1972)
- Skill pool install optimization (#8477 - rename instead of copy)
- Sandbox ACL safety (#8018 - never write ACE on volume root Windows)

### Beta → Stable transition:
- v2.3.0-beta.4 (#8667) verification closed → v2.3.0 stable (#8681) verification đang chạy
- macOS build timeout raised 90m (#8677)

**Next milestone**: Plugin architecture hoàn thiện (local models, MCP), channel plugin ổn định trên all platforms.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*