# Bản tin Hệ sinh thái Hermes Agent 2026-10-23

> Issues: 165 | PRs: 500 | Dự án: 9 | Thời gian tạo: 2026-10-23 02:00 UTC

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

# Báo cáo Hermes Agent - 2026-10-23

## 📊 Tóm tắt hôm nay

Không có release. Hoạt động tập trung vào: cleanup code cũ (xóa agent-browser), sửa bugs Desktop/gateway, ổn định install flow trên Windows/NixOS.

---

## 🚀 Releases

Không có release mới.

---

## 🔧 Tiến độ dự án

### PRs quan trọng đang mở

**#143146** - Xóa hẳn agent-browser + built-in browser tools
- Browser automation chỉ chạy qua `browser_exec`
- Camofox chuyển thành plugin catalog
- Giảm dependencies, đơn giản hóa codebase

**#143332** - Fix NixOS dev shell
- Python trong shell giờ self-contained
- Chuẩn hóa PM tool list
- Darwin shell builds lại work

**#143339** - Windows update giữ `hermes.exe` sau Python repin
- Trước: degraded về `hermes.cmd` only
- RC2 test failed, PR fix

**#143336** - Desktop negotiate canonical protocol cho public connections
- Trước: chỉ chạy trên `native_dial` URLs
- Giờ: check `session_authority: true` flag

### Xu hướng

- **Cleanup phase**: xóa deprecated code (agent-browser, duplicate configs)
- **Platform stability**: nhiều fix cho Windows, macOS OCLP, NixOS
- **Desktop polish**: spell check opt-in, context menu API, profile rename keep sessions

---

## 💬 Điểm nổi bật cộng đồng

### Issues hot nhất (theo comments)

**#134889** - Gateway ownership tracking (213 comments)
- Post-merge fixes cho unified-gateway-runtime
- P0 priority
- Ảnh hưởng: sessions, message delivery, Windows compat

**#97681** - Bot collaboration across gateways (40 comments)
- Feature: bots work together cross-machine
- Nền tảng cho multi-owner collaboration
- P3 nhưng interest cao

**#141346** - Smart approval auto-approved osascript → data loss (33 comments)
- Agent drove PowerPoint via osascript
- Closed unsaved deck + deleted export
- Unrecoverable user data loss
- Security/UX critical

**#135039** - Memory budget enforcement (15 comments)
- `MEMORY.md` / `USER.md` injected every turn
- Không có size budget, acceptance test
- Cost/latency impact

---

## 🐛 Ổn định & Bugs

### Critical bugs

**#143290** - `/v1/runs/{id}/stop` trên finished run giết turn tiếp theo
- User message silently dropped
- Chưa fix

**#142731** - Session paused trên admission_conflict không recover
- HTTP 409 forever
- Session ID unusable

**#143288** - Long-lived session pin vision route to one provider
- `auxiliary.vision.provider` ignored
- Chỉ model name propagate

**#142844** - Session live nhưng missing routing entry → un-drainable
- Inputs queue forever
- Gateway restart only recovery

### Platform-specific

**Windows**
- #143326: Permission issues sau update
- #142032: WSL2 worker refused sau 9-65s (btime re-anchor)
- #91097: Scheduled Task không restart watchdog

**macOS**
- #141649: Monterey Intel/OCLP activation fails
- #107296: systemd unit PATH thiếu NixOS coreutils

**Install/Update**
- #128799: PM-built installs thiếu `locales/` → raw keys render
- #98010: `hermes update` từ gateway tree → infinite restart loop

---

## ✨ Yêu cầu tính năng

**#126292** - Native Android/iOS apps (4 comments)
- Real-time voice
- Location consent
- Approvals on phone
- P3, needs-decision

**#28056** - In-run quality gates cho cron/agent (7 comments)
- Bounded retry
- Completion criteria
- Không chỉ "model produced text"

**#75607** - Tách cron definitions khỏi execution state (5 comments)
- `cron/jobs.json` mix intent + volatile state
- Conflict-prone, không reproducible

**#26277** - Email session isolation by subject (15 comments)
- Opt-in mode
- Normalize subject → separate sessions
- Hiện: same sender = one session

---

## 👥 Phản hồi người dùng

### Pain points

1. **Smart approval quá aggressive** (#141346)
   - Auto-approved osascript commands
   - User data loss
   - Cần review approval heuristics

2. **Desktop group features bị mất** (#142248)
   - Cross-machine rooms gone
   - Reply-in-thread gone
   - @ picker gone
   - Docs vẫn promise → user confusion

3. **Profile switching phức tạp**
   - #139002: Desktop group creation fail
   - #142849: Window-owned requests timeout trên shared profile
   - #143334: Renamed profile stranded local chats

4. **Install/update không smooth**
   - Nhiều platform-specific issues
   - Locales missing
   - PATH problems

### Positive signals

- Plugin system mở rộng tốt (catalog additions)
- Desktop APIs mở cho plugins (spell check, context menu)
- Community submit fixes (nhiều PRs từ external contributors)

---

## 📋 Backlog & Roadmap

### In progress (từ PRs)

- Browser automation simplification (remove agent-browser)
- Profile system stability fixes
- Cross-platform install improvements
- Desktop protocol negotiation

### Planned (từ issues)

- Bot collaboration framework (#97681)
- Memory budget enforcement (#135039)
- Lifecycle hooks as shared contract (#67798)
- Native mobile apps (#126292)

### Needs decision

- Email HTML rendering (#138554)
- Cron state separation (#75607)
- Quality gates for agent runs (#28056)

---

## ⚠️ Risk areas

1. **Session state** - Nhiều issues về session routing, profile switching
2. **Message delivery** - Gateway ownership, admission conflicts
3. **Platform compat** - Windows, macOS OCLP, NixOS, WSL2
4. **Security boundary** - Smart approval data loss case
5. **Install/update** - Locales missing, PATH issues, update loops

---

**Nhận xét chung**: Project trong giai đoạn ổn định sau unified-gateway-runtime merge. Focus vào fix bugs, cleanup deprecated code, polish Desktop UX. Community active nhưng nhiều platform-specific issues chưa resolve. Cần prioritize user data safety (approval heuristics) và install reliability.

---

## So sánh hệ sinh thái chéo

# Báo cáo So sánh Hệ sinh thái AI Agent - 2026-10-23

## 1. 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI agent bước vào **giai đoạn ổn định sau mở rộng**. Các dự án lớn (Hermes, OpenClaw) focus cleanup + platform stability, dự án nhỏ (NullClaw, IronClaw, PicoClaw) maintenance mode. Activity pattern: **burst PRs + silent issues** = internal-driven hoặc closed testing groups.

**Tín hiệu chính:**
- **Security tightening**: 4/9 dự án merge security patches trong 24h (Node CVE, CA trust, credential leakage)
- **Memory/performance crisis**: 3 dự án có P0/P1 memory leak issues
- **Platform fragmentation pain**: Windows/macOS/NixOS/WSL bugs cao → multi-platform support costly
- **Gateway architecture consolidation**: Hermes, OpenClaw, NanoClaw đều refactor gateway ownership/routing

---

## 2. 📊 Bảng so sánh hoạt động

| Dự án | Issues | PRs | Releases | Tương tác | Mức độ | Ghi chú |
|-------|--------|-----|----------|-----------|---------|---------|
| **Hermes Agent** | 165 | 500 | 0 | ⭐️⭐️⭐️⭐️ | Enterprise | Cleanup phase, 213 comments/issue top |
| **OpenClaw** | 84 | 500 | 1 | ⭐️⭐️⭐️⭐️ | Production | v2026.10.6 breaking (Node mandatory), 60% heap leak |
| **NanoBot** | 8 | 50 | 0 | ⭐️⭐️ | Rapid dev | 22 PR/day, 0 engagement |
| **Zeroclaw** | 13 | 50 | 0 | ⭐️ | Beta | XMPP + Goal Mode foundation, maintainer-only |
| **PicoClaw** | 0 | 10 | 0 | ⭐️ | Maintenance | 9/10 PR stale, dependency bumps |
| **NanoClaw** | 3 | 50 | 1 | ⭐️⭐️⭐️ | Growing | RC2 security release, OneCLI migration |
| **NullClaw** | 1 | 1 | 0 | - | Minimal | arm32 fix + LLM compat |
| **IronClaw** | 2 | 1 | 0 | - | Research | Benchmark tracking, 0 community |
| **Qwen-Paw** | 11 | 26 | 1 | ⭐️⭐️⭐️ | Maturing | v2.2.2.post1 hotfix, Desktop refactor XXXL |

**Phân loại:**
- **Tier 1** (production): Hermes, OpenClaw — enterprise features, active community, breaking changes confidence
- **Tier 2** (maturing): NanoClaw, Qwen-Paw — rapid iteration, security focus, user feedback loop
- **Tier 3** (dev/beta): NanoBot, Zeroclaw — high velocity, low engagement
- **Tier 4** (minimal): PicoClaw, NullClaw, IronClaw — maintenance or research-only

---

## 3. 🎯 Vị thế Hermes Agent

**Strengths:**
- **Cộng đồng mature nhất**: 213 comments trên single issue (#134889 gateway ownership), nhiều external contributors
- **Enterprise architecture**: unified-gateway-runtime + profile system + Desktop group features (dù bị remove)
- **Platform coverage sâu**: Windows/macOS/NixOS/WSL bugs được track + fix
- **Plugin ecosystem**: browser tools → catalog, extensibility cao

**Weaknesses:**
- **Không có release trong 24h** (competitors có 3 releases)
- **Chất lượng stability**: nhiều P0 bugs (session routing, admission conflicts, message delivery)
- **Breaking changes không smooth**: Desktop group features removed → user confusion, docs stale
- **Smart approval risk**: #141346 data loss từ auto-approved osascript → security/UX critical

**So sánh OpenClaw:**
- OpenClaw ship v2026.10.6 với Node mandatory → confidence thực thi breaking changes
- Hermes stuck post-merge bugs từ unified-gateway-runtime → slower release cadence
- OpenClaw heap leak 60% được prioritize P1, Hermes session bugs P0 nhưng chưa fix nhanh

**So sánh NanoClaw:**
- NanoClaw RC2 trong 24h (v2026.10.1), Hermes 0 release → velocity thấp hơn
- Cả hai focus OneCLI/credential management, NanoClaw ship trước

**Vị trí:** **Leader nhưng đang slow down**. Cộng đồng + architecture tốt nhất, nhưng stability + release velocity thua OpenClaw/NanoClaw trong 24h này.

---

## 4. 🔧 Hướng kỹ thuật chung

### Shared patterns (4+ dự án):

**1. Gateway architecture refactor**
- Hermes: unified-gateway-runtime + ownership tracking (#134889)
- OpenClaw: gateway publication timeout, event loop stalls (#160959)
- NanoBot: idle scan race, context budget (#6405, #6404)
- NanoClaw: channel delivery timeout, OneCLI grants (#4192, #4094)

→ **Gateway = single point of failure**, scale pain khi sessions/channels nhiều

**2. Memory management crisis**
- OpenClaw: 60% heap từ AsyncLocalStorage (#180898)
- Hermes: memory budget không enforce (#135039)
- Zeroclaw: subagent assignments leak (#172837)

→ **Long-lived processes** chưa production-ready, cần lifecycle + compaction

**3. Security tightening**
- OpenClaw: Node 24.22.1+ mandatory (TLS CVE)
- NanoClaw: OneCLI secrets không qua command line (#4187)
- Qwen-Paw: emSign CA + Node CVE hotfix (v2.2.2.post1)
- Zeroclaw: Wasmtime 5 CVE patch (#11906)

→ **Supply chain security** serious, 4/9 dự án patch trong 24h

**4. Platform fragmentation**
- Hermes: Windows permission, macOS OCLP, NixOS PATH, WSL2 btime
- OpenClaw: macOS SQLite cache, Windows plugin smoke, arm64 OOM
- NullClaw: arm32 atomic fix
- Qwen-Paw: Windows test, macOS timeout, container loopback

→ **Cross-platform = exponential test matrix**, nhỏ teams không sustain

**5. SQLite performance wall**
- OpenClaw: 10 GB store → 100s read block (#179231)
- Hermes: cron state mix intent + volatile (#75607)
- NanoClaw: attachment staging path separators (#4170)

→ **SQLite không scale** cho large agent stores, cần sharding hoặc migrate

### Diverging choices:

| Aspect | Hermes/OpenClaw | NanoBot/Zeroclaw | NanoClaw/Qwen-Paw |
|--------|-----------------|------------------|-------------------|
| **Gateway** | Unified runtime | Lightweight runtime | CLI-managed daemon |
| **Plugins** | Catalog external | Skill payload inline | Subprocess isolated |
| **Approval** | Smart heuristics | Per-turn budget | OneCLI grants |
| **Desktop** | Electron-like | Web-only | Native daemon |

---

## 5. 🔍 Điểm khác biệt

### Architecture philosophy:

**Hermes/OpenClaw** — **Monolithic gateway**
- Pro: Unified state, cross-session features (rooms, threading)
- Con: Single point of failure, memory leaks critical, slow restarts

**NanoBot/Zeroclaw** — **Lightweight runtime**
- Pro: Fast iteration, simple deploy
- Con: Không scale team collaboration, ephemeral state

**NanoClaw/Qwen-Paw** — **CLI-first, daemon-backed**
- Pro: Local-first, credential security
- Con: Desktop features lag (Qwen-Paw #8373 daemon PR mới mở)

### Community engagement:

**High** (Hermes, OpenClaw):
- External contributors nhiều
- Issues có discussion threads dài (10-40 comments)
- Feature requests từ users, không chỉ maintainers

**Medium** (NanoClaw, Qwen-Paw):
- Contributors có, nhưng mainly dependency bumps
- Issues báo bugs thực tế (post-upgrade breakage)
- Roadmap responsive (fix trong 24h)

**Low** (NanoBot, Zeroclaw, PicoClaw):
- 0 reactions, 0-1 comments
- PRs từ bots (dependabot) hoặc maintainers only
- Closed testing groups hoặc early stage

**None** (NullClaw, IronClaw):
- Maintenance mode hoặc research-only
- Không có user-facing features

### Release strategy:

**Aggressive** (NanoClaw):
- RC2 trong 24h sau RC1
- Breaking changes với migration scripts
- Beta channel separate từ stable

**Confident** (OpenClaw):
- v2026.10.6 breaking (Node mandatory)
- Enforce security, refuse start unsafe versions
- Auto chọn patched runtime trong installer

**Cautious** (Hermes):
- 0 release trong 24h
- Post-merge bug fixes chậm (P0 chưa close)
- Desktop features removed → user trust hit

**Hotfix-driven** (Qwen-Paw):
- v2.2.2.post1 emergency release
- Security > stability
- 4h verification deadline

---

## 6. 🌱 Mức độ trưởng thành cộng đồng

### Tier 1 — **Production-ready communities**

**Hermes Agent** ⭐️⭐️⭐️⭐️⭐️
- Contributors: External PRs nhiều, quality code reviews
- Users: Power users file detailed bugs (data loss #141346)
- Docs: Stale nhưng comprehensive
- Support: Issues get maintainer response
- Pain: Desktop group removal → communication failure

**OpenClaw** ⭐️⭐️⭐️⭐️
- Contributors: Internal-heavy, external contributions accepted
- Users: Filed 63 issues/day, real pain points (#160959 gateway block)
- Docs: Breaking change guidance (Node upgrade recovery)
- Support: P0 reproduced, fixes tracked
- Pain: Update experience tệ, first-time setup slow

### Tier 2 — **Growing communities**

**NanoClaw** ⭐️⭐️⭐️
- Contributors: Mix internal/external, security-conscious
- Users: Report bugs post-upgrade (Resend, Google Chat)
- Docs: Changelog accurate, OneCLI migration docs
- Support: Fix trong 24h (RC2 address RC1 feedback)
- Pain: OneCLI learning curve

**Qwen-Paw** ⭐️⭐️⭐️
- Contributors: First-time contributors merge PRs (#8345, #8376)
- Users: Feature requests (global Skill #8275, auto-scroll #7339)
- Docs: Post-upgrade breakage docs reactive
- Support: Hotfix release 4h verification
- Pain: Matrix E2EE lost keys, CORS config không work

### Tier 3 — **Developer-focused**

**NanoBot** ⭐️⭐️
- Contributors: Maintainer-only (22 PR/day)
- Users: Silent (0 reactions)
- Docs: Không thấy
- Support: Merge velocity cao, engagement 0
- Pattern: Internal product hoặc closed beta

**Zeroclaw** ⭐️
- Contributors: Maintainer-only
- Users: Không thấy
- Docs: XMPP/Goal Mode chưa release
- Support: PRs sit weeks
- Pattern: Stealth mode hoặc small team

### Tier 4 — **Minimal/Research**

**PicoClaw** ⭐️
- 9/10 PR stale, dependabot only
- 0 user engagement
- Maintenance mode

**NullClaw** -
- 1 issue, 1 PR trong 24h
- arm32 fix = embedded/Android focus
- Niche use case

**IronClaw** -
- Benchmark tracking only
- 0 community signals
- Research infrastructure

---

## 7. 📈 Tín hiệu xu hướng

### Ngắn hạn (Q4 2026)

**1. Memory management arms race**
- OpenClaw 60% leak → competitors sẽ hit tương tự khi scale
- Zeroclaw subagent leak → pattern chung: retained references từ async context
- **Dự đoán**: Q4 sẽ có wave PRs về lifecycle hooks, context cleanup, compaction strategies

**2. Security compliance wave**
- 4 dự án patch supply chain trong 24h → industry incident gần đây?
- Node CVE enforcement (OpenClaw mandatory, Qwen-Paw hotfix)
- **Dự đoán**: Credential management + approval systems sẽ tightening, Hermes smart approval (#141346 data loss) sẽ pivot

**3. Platform consolidation pressure**
- Windows/macOS/NixOS bugs exponential → small teams không sustain
- **Dự đoán**: 
  - Tier 3/4 dự án sẽ drop platforms (focus Linux/Docker)
  - Tier 1 sẽ invest CI infrastructure (OpenClaw đã sharded tests)

**4. Gateway architecture crisis**
- Hermes, OpenClaw, NanoBot đều hit gateway scale issues
- **Dự đoán**: 
  - Shift sang **federated gateways** (Hermes #97681 bot collaboration)
  - Hoặc **stateless gateways** + external session store

### Trung hạn (2027)

**5. Plugin ecosystem maturity**
- Hermes catalog externalize, NanoClaw skill payload, Qwen-Paw subprocess isolation
- **Dự đoán**: Standard plugin protocol sẽ emerge (nhiều dự án chọn subprocess isolation → security boundary)

**6. Desktop app renaissance**
- Hermes Desktop group features removed → step back
- Qwen-Paw #8373 shared daemon (XXXL PR) → step forward
- **Dự đoán**: Native desktop apps (not Electron wrappers) sẽ comeback, mobile apps theo sau (#126292 Android/iOS)

**7. AI collaboration protocols**
- Hermes #97681 bot collaboration cross-gateway (40 comments, P3)
- Zeroclaw Goal Mode foundation
- **Dự đoán**: Multi-agent orchestration sẽ shift từ single-runtime đến distributed protocols

**8. SQLite replacement**
- OpenClaw 10 GB → 100s stall
- **Dự đoán**: 
  - Embedded databases (RocksDB, LMDB) cho write-heavy workloads
  - Postgres cho multi-user, queryable state
  - Remain SQLite cho single-user, read-heavy

### Rủi ro hệ thống

**Fragmentation risk** ⚠️
- 9 dự án, 4 architecture styles, 0 interop
- Nếu không có standard protocol, users lock vào single vendor
- **Mitigation**: OpenAI Assistants API, Anthropic Claude API đang become de-facto standards

**Sustainability risk** ⚠️⚠️
- Tier 3/4 dự án maintenance mode hoặc stale PRs
- Community engagement thấp → contributors burn out
- **Signal**: PicoClaw 9/10 stale, NanoBot 0 reactions despite 22 PR/day

**Security debt** ⚠️⚠️⚠️
- Smart approval data loss (Hermes #141346)
- Credential leakage patterns (NanoClaw #4187)
- Supply chain trust (4 CVE patches trong 24h)
- **Critical**: Agent systems có file/shell access → approval systems phải 100% reliable

---

## 8. 🎬 Kết luận

**Hệ sinh thái AI agent năm 2026 = post-hype consolidation.**

**Winners so far:**
- **Hermes** = best community + architecture
- **OpenClaw** = best velocity + confidence
- **NanoClaw** = best security posture

**Common pain:**
- Memory leaks
- Gateway scale
- Platform fragmentation
- Approval system trust

**Next 6 months sẽ quyết định:**
- Ai survive platform fragmentation (drop platforms hoặc invest CI)
- Ai solve memory management (lifecycle hooks standard)
- Ai ship multi-agent protocols (collaboration > single-runtime)
- Ai earn user trust (security + reliability > features)

**Hermes cần:**
1. Ship release (velocity thua)
2. Fix P0 session bugs (stability thua)
3. Restore Desktop features hoặc communicate removal (trust recovery)
4. Review smart approval (security critical)

**Nếu Hermes execute 4 items trên Q4 2026 → retain leader position. Nếu không → OpenClaw/NanoClaw sẽ overtake.**

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# Báo cáo OpenClaw 2026-10-23

## 1. 🎯 Tóm tắt hôm nay

Ngày bận rộn với **63 issues mới** và **30+ PRs**. Tập trung vào: sửa memory leak gateway (issue #180898 - 60% heap qua AsyncLocalStorage), fix runtime publication timeout sau sleep/wake (issue #158592), và performance cải thiện cho catalog 1000+ models. Release 2026.10.6 ra tối qua, bắt buộc Node 24.22.1+/26.12.1+ do vá TLS security.

## 2. 📦 Releases

### v2026.10.6 (2026-10-22)

**Highlights:**
- 🔒 **Node patched bắt buộc**: Node 24.22.1+/26.12.1+ (vá TLS compromise October). Docker ship 24.22.1, `openclaw update` từ chối cài trên Node cũ với recovery guidance.
- Gateway từ chối start khi detect unsafe Node version
- Installer auto chọn patched runtime

**Ý nghĩa:** Breaking change về infra - operators phải upgrade Node hoặc gateway chết. Tốt cho security, đau cho người dùng chưa patch.

## 3. 🚀 Tiến độ dự án

### PRs nổi bật:

**Performance:**
- **#179160** (P2): Dừng re-parse tool args mỗi delta stream. 60 KB file write tốn >1s CPU do parse lặp JSON buffer mỗi chunk OpenAI. → Parse once, cache.
- **#181031** (P2): Defer English copy + code highlight grammars. Giảm first-paint bundle cho chat.
- **#181154** (P2): Reuse authority facts trong retained work → ít serialize + policy rebuild.
- **#181190**: Large model catalogs (1000+) mở nhanh hơn - chỉ mount visible options.

**Bugfixes:**
- **#171951** (security): Redact credential fallbacks `${VAR:-secret}` trong config snapshots
- **#180847** (P2): Doctor từ chối import lossy meeting transcripts (invalid UTF-8)
- **#181125** (P2): Doctor media migration ghi đè corrupt archive bằng U+FFFD → reject hoặc warning
- **#181082**: Cron forwarded messages không crash unprepared display projection

**Features:**
- **#181179**: Cron precheck shell - skip run khi inbox/queue empty
- **#120491** (P2): Per-turn per-target send budget cho message tools (chặn duplicate storms)

### Xu hướng:
- Focus vào **performance at scale** (large catalog, large session, heap pressure)
- Security tightening (redaction, Node version enforcement)
- UX polish (accessibility, keyboard nav, error feedback)

## 4. 💬 Điểm nổi bật cộng đồng

**Issues nhiều comments:**

1. **#160959** (42 comments, P0): Gateway block minutes khi capture large plugin (2026.9.6 regression). Nhóm reproduced, đang làm fix.

2. **#53763** (18 comments, P3): Yêu cầu **built-in headless browser** để agent access web không cần Chrome ngoài. Tranh luận về bundle size vs reliability.

3. **#172837** (12 comments, P1): Codex `nativeSubagentAssignments` không bao giờ xoá sau completion timeout → mỗi parent thread re-pin & re-send.

4. **#167557** (10 comments, P1): Plugin data migration stuck vô hạn sau npm update (Linux). "managed handoff lease database identity changed".

5. **#166634** (9 comments, P0): Crash recovery fail checkpoint → agent unavailable mãi mãi với `UNAVAILABLE`.

**Chủ đề nóng:**
- **Runtime stability** sau host sleep/wake, crash recovery
- **SQLite performance** với large stores (10 GB / 35k events → 100s read stall)
- **Memory leaks** từ AsyncLocalStorage clones

## 5. 🐛 Ổn định & Bugs

### Critical (P0):

- **#160959**: Gateway block event loop minutes (plugin capture regression)
- **#166634**: Late reclamation checkpoint failure → agent chết mãi
- **#158592**: Runtime publication timeout sau host sleep → "runtime owner not published" vĩnh viễn
- **#181032**: Server CPU không AVX → bun crash (compiled sai)
- **#181152**: "runtime owner not published" retry vô tận → typing indicator stuck, turn lost

### High Priority (P1):

- **#180898**: **Gateway heap leak 60%** - AsyncLocalStorage giữ full session store copies mỗi turn
- **#172837**: Subagent assignments leak memory, không xoá
- **#167876**: Talk consultations mất caller authority sau setup
- **#111376**: Memory-core Dreaming rewrite unchanged state → gateway stall
- **#179231**: 10 GB agent store → SQLite reads block 10-100s (macOS, no cache tuning)

### Patterns:
- **Session state corruption** nhiều (checkpoints, migrations, recovery)
- **Event loop stalls** từ sync SQLite, large plugin captures
- **Memory leaks** từ clones, retained references, unclosed handles

## 6. ✨ Yêu cầu tính năng

**Được đề xuất:**

1. **#53763** (18 comments): Built-in headless browser - bundle Chromium cho web access ổn định
2. **#142966**: Two-column model picker (providers left, models right) cho multi-provider setup
3. **#177432**: Config option tắt "Current model identity" trong system prompt (branded products)
4. **#181160**: Filter `openclaw sessions --label <text>`
5. **#181157**: Show last activity trong `nodes describe`
6. **#181155**: Show workspace binding trong `sessions list`
7. **#181158**: Filter `skills list --bundled`

**Được merge:**
- Cron precheck (#181179)
- Send budget guard (#120491)

## 7. 📢 Phản hồi người dùng

**Pain points:**

- **Update experience tệ**: Node 24.22.1 bắt buộc nhưng nhiều user chưa biết → gateway chết (#181050, #180903)
- **First-time setup chậm**: Persistent nodes 59-68s first session sau update (#140425)
- **SQLite stalls**: Large stores (10 GB) block UI giây-phút (#179231, #181084)
- **Memory pressure**: Heap leak làm gateway chậm dần (#180898)

**Positive:**
- Web UI improvements được khen (accessibility, performance)
- Cron + automation features được xài nhiều
- Security tightening được ủng hộ dù breaking

**Frustrations:**
- Breaking changes không có migration path rõ (#178741 - state-dir relocation breaks Claw agents)
- Error messages không actionable (#181165 - "GitHub identity setup failed" nuốt lỗi gốc)

## 8. 📋 Backlog & Roadmap

**Đang làm:**
- Fix P0 runtime stability (sleep/wake, crash recovery)
- Resolve memory leaks (AsyncLocalStorage, session clones)
- SQLite performance tuning cho large stores
- Gateway event loop health (async I/O, defer work)

**Queued (fix-shape-clear, queueable-fix):**
- #163900: Memory-core budget compaction không xoá "Consolidated Memory" sections
- #172817: UI Locale textbox rỗng (should be Language picker)
- #180969: Windows plugin smoke cleanup fails

**Design decisions needed:**
- #53763: Built-in browser (bundle size vs reliability tradeoff)
- #142966: Two-column model picker (UX redesign)
- #134982: Exec approval prompts mất buttons trên channels không support typed approval
- #180490: Chat ẩn agent narration sau run finish (UX debate)

**Long-term:**
- Nephesh dream provenance integration (#113895)
- Windows-node release validation (#119762)
- Cloud workspace recovery improvements (#162654)

---

**Nhìn chung:** OpenClaw đang scale pain (large catalogs, large sessions, long-lived installs). Team focus đúng: performance, memory, stability. Security tốt nhưng breaking changes cần docs + migration guidance tốt hơn. Community active, nhiều filed issues chất lượng.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# Báo cáo NanoBot - 2026-10-23

## 📊 Tóm tắt hôm nay

22 PR merge, 7 issue đóng. Tập trung vào 3 mảng: WebUI polish (OAuth, sidebar icons, composer layout), agent stability (idle scan race, context budget overflow), infrastructure (CI isolation, retry amplification fix).

## 🚀 Releases

Không có release.

## 📈 Tiến độ dự án

**Merged (22 PR):**

**WebUI polish:**
- #6321: Video attachment + local file ref (không upload nội dung)
- #6391: Website preview bỏ, dùng native link
- #6398: Skill ref giữ `$` prefix
- #6396: OAuth callback instruction rõ hơn
- #6397: Version check chỉ khi mở About, không check lúc connect
- #6400: Sidebar icon simplify
- #6393: Restored waiting message không tự chạy

**Agent stability:**
- #6405: Idle scan giờ skip session có direct turn đang chạy (fix race đọc `_pending_queues`)
- #6404: Large tool result sau compaction không abort turn nữa
- #6389: Context compaction reason phân biệt (idle / pressure / manual)
- #5841: Temp chat không log tool progress

**Infrastructure:**
- #6402: CI concurrency dùng SHA, không cancel nhầm newer commit
- #6403: Segmented indicator animate transform thay vì width
- #6394: Test cleanup: bỏ unreachable case, assert mạnh hơn

**Channel:**
- #6392: Channel install xong hiện nút Restart trong row
- #6399: Figma remote preset bỏ (auth flow vẫn fail)

**Open PR cần theo dõi:**

**P1 (1):**
- #6367: Retry amplification fix – nested retry nhân request, Telegram replay prefix duplicate, domain owner giữ replay decision

**P2 (8):**
- #6401: WebUI polling → gateway invalidation (usage/pairing/channel/automation)
- #6337: Task state backend-authoritative, không tin local send/transcript
- #6405: Idle scan race (đã merge nhưng vẫn open?)
- #6404: Tool result budget (đã merge nhưng vẫn open?)
- #6323: Edit + resend message trong session
- #6289: Matrix `listen` group policy (observe room, reply on mention)
- #6256: Composer workspace toolbar compact
- #5653: Exec deny pattern enforce trong full access

**Conflict cần rebase (6):**
- #6267: Plugin approval bind instance owner
- #6032: WebUI extension surface
- #6377: macOS Dock restore existing window
- #6110: Slack compaction notice dùng chat.update
- #6043: Settings save preserve concurrent edit
- #5825: Provider-neutral structured decision client

## 🔥 Điểm nổi bật cộng đồng

**Issue đóng có tương tác:**
- #2020 (5 comment): Token usage tracking – closed, likely merged
- #1006 (4 comment): Subagent control plane (list/kill) – closed
- #6285 (3 comment): DuckDuckGo consecutive search fail – closed

**PR open có xung đột (6 conflict):** Community contribution bị outdated, cần rebase. Maintainer chưa priority.

## 🐛 Ổn định & Bugs

**Fixed today:**
- Idle scan abort running direct turn (#6405)
- Large tool result abort turn sau compaction (#6404)
- Version check spam lúc connect (#6397)
- OAuth callback instruction unclear (#6396)
- Restored waiting message tự chạy (#6393)
- CI cancel nhầm newer commit (#6402)

**Open bug:**
- #6337: Task state không authoritative – reconnect/reload sai state
- #6285: DuckDuckGo no retry, consecutive search fail (đã đóng nhưng không thấy PR)

## ✨ Yêu cầu tính năng

**Implemented:**
- Video attachment (#6321)
- Matrix listen policy (#6289)
- Edit + resend message (#6323, open)
- Compact composer toolbar (#6256, open)

**Closed:**
- #2020: Token tracking – merged
- #1006: Subagent control plane – merged

## 💬 Phản hồi người dùng

**Token usage tracking (3 issue về topic này đóng):** Community yêu cầu lâu, giờ có. Không rõ API shape.

**Exec deny pattern (#5653):** Full access bypass deny – security concern, PR open 1.5 tháng chưa merge.

**Session security (#5278):** Session trong workspace – closed, likely wontfix hoặc design choice.

**WebUI iOS PWA (#5772):** Washed out viewport – closed, no PR ref.

## 📋 Backlog & Roadmap

**P1 cần làm:**
- #6367: Retry amplification (open, conflict)

**P2 backlog:**
- Gateway invalidation thay polling (#6401)
- Backend-authoritative task state (#6337)
- Edit message (#6323)
- Matrix listen (#6289)

**Conflict cần rebase:** 6 PR outdated, maintainer chưa priority.

**Pattern:** Velocity cao (22 merge/ngày), focus polish + stability. Community contribution bị lag (6 conflict). Token usage đóng nhưng không thấy docs.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Báo cáo Zeroclaw - 2026-10-23

## 🎯 Tóm tắt hôm nay

Không có release. Team đóng 7 issues/PRs trong đợt dọn dẹp, tập trung vào sửa lỗi v0.8.7 và bảo mật. Nhiều PR lớn đang mở cho v0.9.0 (dashboard chat scope, XMPP channel, Goal Mode foundation).

---

## 📦 Releases

Không có.

---

## 🚀 Tiến độ dự án

### Đã đóng hôm nay (7 mục)

**Sửa lỗi v0.8.7:**
- #11863: Late tool search tests opt-in ngoài CI runtime job
- #11848: Plugin channel denial logs thiếu tên sender
- #11841: Docs changelog match wording OIDC từ v0.8.6
- #11833: Arm64 dist image OOM → thêm 8GB swap, dry-run dispatch
- #11967: Crates.io preflight chạy nhầm trên PR merge master
- #11941: Cranelift CI timeout 20→30 phút (job thường 18-20 phút)
- #11906: Wasmtime 48.0.6→48.0.7 patch 5 CVE (RUSTSEC-2026-0375..0379)

### Đang mở quan trọng

**v0.9.0 features (risk:high, size:XL):**
- #11986: Dashboard chat cho non-admin accounts, scope theo grant, JWKS validation
- #11225: Delegate preserve owner/namespace/tenant (security fix, release-gate)
- #10407: Session persistent prompt attachments (SQLite collection 4 prompts)
- #11878: Goal Mode V1 foundation 1/12 - task lifecycle contracts

**Security & stability:**
- #11925: Refresh CA stores sau emSign distrust
- #11822: POSIX command split at substitution/subshell boundaries (security:policy)
- #11861: Ngăn stale run copy revive/overwrite terminal run

**Channels:**
- #11847: XMPP/Prosody channel với OMEMO (size:XL, risk:high)
- #11911: Preserve tool results, reuse bounded recovery cho channel turns
- #11993: Email HTML từ Markdown structure only (drop raw HTML, filter img URLs)
- #11990: Honour excluded_tools per channel instance
- #11939: Quote original message trong email replies

**Other:**
- #11994: Shell commands đọc bash grammar khi bash run (security)
- #10034: Probe saved provider alias sau model-routing update
- #11895: Keep quota provider out đến stated reset time

---

## 💬 Điểm nổi bật cộng đồng

Không có PR/issue nào nhiều bình luận hay reaction. Chủ yếu maintainer work.

---

## 🐛 Ổn định & Bugs

**Đã sửa:**
- Wasmtime CVE batch (5 advisories)
- Gateway không drain connections khi stop (#11901 đang mở)
- Plugin channel denial logs thiếu context
- Arm64 dist build OOM
- CI preflight logic nhầm

**Đang sửa:**
- #11991: Email HTML pass raw markup/arbitrary img URLs từ agent text (S2)
- #11989: Per-channel excluded_tools không apply (S2)
- #11987: Semgrep nosemgrep comments không stop alerts (S3)
- #11966: Crates preflight fail sau khi tag exists (S2)

---

## ✨ Yêu cầu tính năng

**Mới hôm nay:**
- #11995: Restore background delegation cho principal-owned sessions (follow-up từ #11225 containment)
- #11992: Email channel operator templates + sanitised HTML body

**Đang implement:**
- Dashboard chat non-admin (#11986)
- XMPP channel (#11847)
- Goal Mode foundation series (#11878, #11879)
- Session prompt attachments (#10407)

---

## 👥 Phản hồi người dùng

Không có feedback công khai. Issues/PRs từ maintainers và contributors.

---

## 📋 Backlog & Roadmap

**v0.8.7 gần done:**
- Còn #11861 (stale run), #11811 (plugin info verify), #11901 (gateway drain)

**v0.9.0 track:**
- Dashboard chat scope (#11986, #11985 tests)
- Delegate owner preservation (#11225)
- XMPP channel (#11847)

**Goal Mode V1:**
- Foundation PR 1-2/12 đang mở
- Chưa claim merge readiness

**Follow-ups open:**
- #11995: Background delegation sau scope fix
- #10526: RFC append-only session history, deterministic replay (status:accepted, 13 comments)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# Báo cáo PicoClaw - 23/10/2026

## 1. Tóm tắt hôm nay

Hoạt động chủ yếu maintenance: 1 PR enhancement được merge (feat QQ channel upload local files), 9 PR còn mở - gồm 5 dependency updates, 2 tính năng mới (Standard Compute provider, hide tool feedback args), 2 bugfix (Gemini thought_signature). Không có release mới. Các PR đều được đánh dấu `stale` do không có update trong 7 ngày.

## 2. Releases

Không có release mới.

## 3. Tiến độ dự án

**Merged:**
- #1227 ✅ (đóng 22/10): QQ Channel upload file/image local, không cần image host nữa

**Đang mở:**
- #3431 🆕 Standard Compute provider - OpenAI-compatible gateway, 1 key access nhiều model
- #3429 + #3430 🔒 Hide tool feedback arguments - ẩn serialized args, giữ tool name/explanation (backend + web UI)
- #3428 🐛 Fix Gemini thought_signature error - handle `400 INVALID_ARGUMENT` khi continue tool-calling conversation

**Dependency updates (5 PR):**
- anthropic-sdk-go: 1.55.1 → 1.80.0
- golang.org/x/crypto: 0.53.0 → 0.58.0  
- adhocore/gronx: 1.20.0 → 1.20.5
- Azure azidentity: 1.14.0 → 1.14.1
- go.mau.fi/util: 0.9.8 → 0.10.1

**Xu hướng:** Focus vào provider expansion (Standard Compute), privacy/security (hide args), bugfix Gemini integration, maintenance deps.

## 4. Điểm nổi bật cộng đồng

Không có PR/issue nào có reaction hoặc nhiều comment. Community engagement thấp trong 24h qua - có thể do weekend hoặc PR đều technical/maintenance, không có feature lớn.

## 5. Ổn định & Bugs

- **#3428**: Gemini 3 throwing `400 INVALID_ARGUMENT` - thiếu `thought_signature` trong function call parts. PR handle echo captured + sentinel cho unsigned tool calls
- **Stale PRs**: 9/10 PR được bot đánh dấu stale (no update 7 days) - có thể cần maintainer review

## 6. Yêu cầu tính năng

- **#3431 Standard Compute provider**: Thêm OpenAI-compatible gateway mới - tiện cho user muốn 1 key access models từ nhiều labs
- **#3429 + #3430 Hide tool feedback args**: User request ẩn arguments trong tool feedback (privacy/readability) - keep tool name + explanation only

## 7. Phản hồi người dùng

Không có comment mới từ user trong 24h. Các PR chủ yếu từ contributors (@unera, @racso2609, @henrikdukefoss) và dependabot.

## 8. Backlog & Roadmap

Không có thông tin roadmap rõ ràng trong data. 

**Ưu tiên gần:** Review 9 stale PRs - đặc biệt #3428 (Gemini bugfix) và #3431 (Standard Compute provider) có impact cao. 5 dependency PRs cần merge sớm cho security/stability.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# Báo cáo NanoClaw — 2026-10-23

## 🔥 Tóm tắt hôm nay

Release candidate thứ 2 cho v2026.10.1 đã phát hành. Core team merge 7 PR bảo mật và hardening, fix bugs liên quan credential leakage, attachment staging, channel delivery. Chuyển sang OneCLI 1.45 với agent grant model mới.

## 📦 Releases

**v2026.10.1-rc.2** (2026-10-22)
- OneCLI 1.45: agent group mới chỉ nhận model key, các key khác phải grant riêng
- Webhook server mặc định bind `127.0.0.1` thay vì `0.0.0.0` (bảo mật)
- Yêu cầu Node October 2026 security release (fix Brotli RCE, TLS hostname validation)
- Egress lockdown apply cho container đang chạy
- Beta channel nhận RC này, stable vẫn ở 2026.10.0

## 🚀 Tiến độ dự án

**Bảo mật & Hardening (ưu tiên cao)**
- #4183: Bump Node cho Oct 2026 security fix (CVE-2026-111497 Brotli RCE) — merged
- #4187: OneCLI secrets không còn pass qua command line, redact error output — merged
- #4193: Bun 1.4.0→1.4.4 loại bỏ eMudhra revoked root — merged
- #4194: Template restamp write qua pinned directory, ngăn TOCTOU
- #4195: Read legacy container.json không follow symlink

**Channel & Delivery Fixes**
- #4169: Fix Resend adapter, agent reply hoạt động trở lại — merged
- #4170: Stage attachment cho message ID chứa `/` (Google Chat) — merged, fix #3206
- #4192: Stuck channel send không còn silence session, 60s timeout
- #4156: Approval card dài hiển thị đầy đủ trên Telegram/Discord/WhatsApp

**OneCLI & Credential Management**
- #4094: OneCLI 1.45 agent grants, new group chỉ có model credential — merged
- #4095: Dial tool scope với OneCLI grants — merged
- #4189: Dial key + grant trong 1 project, safe group name — merged
- #4196: Xóa Dial key chỉ khi upgrade thực sự cần
- #4199: OneCLI admin API + Postgres bind 127.0.0.1 trên Linux

**Infrastructure**
- #4191: CI gate 7.5min → 2.5min (sharded test, cached image)
- #3978: Dependabot cho Actions/pnpm/bun/docker/skill pins
- #4198: Agent image refresh v2026.10.0-20261022T1525

## 🐛 Ổn định & Bugs

**Đã fix**
- ✅ #4175: Claude agent không đọc PDF (thiếu poppler-utils) — cần verify
- ✅ #4142: Resend channel không gửi được do null thread ID
- ✅ #3206: Attachment bị drop khi message ID có path separator

**Đang xử lý**
- #4197: Test fail khi `.env` set `DEFAULT_AGENT_PROVIDER` khác `claude`
- #4164: Codex image generation không hoạt động qua OneCLI

## 💡 Yêu cầu tính năng

- #3976: GitHub Copilot provider skill (đang review)
- #4129: Pi agent provider (đang review)
- #3996: Base image lên node:24-trixie-slim (cần author response)

## 👥 Phản hồi người dùng

**Vấn đề nổi bật**
- Resend channel silent failure frustrate user (#4142)
- Google Chat attachment drop không có error log (#3206)
- Webhook bind 0.0.0.0 là security risk không cần thiết (#2546, #3144)

**Cải thiện**
- Command-line secret exposure đã được fix (#4187)
- Delivery timeout không còn block toàn bộ session (#4192)

## 📋 Backlog & Roadmap

**Đã hoàn thành (cho 2026.10.1)**
- OneCLI 1.45 migration với grant model
- Node security update enforcement
- Webhook bind address configurable

**Tiếp theo**
- Channel adapter move vào skill payload (#4178 proof-of-concept)
- Provider test coverage cải thiện
- Dependabot automation hoàn chỉnh

**Kỹ thuật nợ**
- #3674: Teams file delivery thiếu MIME type
- #4057: Docker --rm auto-removal race condition
- #3970: Agent reaction/edit target ID vẫn có suffix

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# Báo cáo NullClaw - 2026-10-23

## 1. Tóm tắt hôm nay

Hoạt động nhẹ. Một issue về tương thích LLM API (cho phép `temperature` null). Một PR sửa lỗi build arm32 cho QQ gateway.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR #1077** - Fix build arm32
- **Vấn đề**: `std.atomic.Value(i64)` không compile trên arm32. Builds nightly (`linux-arm32-gnu`, `linux-arm32-musl`, `android-armv7`) fail từ 10-05
- **Giải pháp**: Dùng atomic portable cho `gateway_attempt_started_ms` và `last_gateway_activity_ms` trong `src/channels/qq.zig`
- **Ý nghĩa**: Khôi phục support arm32. Quan trọng cho embedded devices, Android cũ

**Issue #1078** - Temperature null
- Mở ngày hôm nay, chưa có PR
- Xu hướng: Cải thiện tương thích với nhiều LLM providers

## 4. Điểm nổi bật cộng đồng

Không có tương tác đáng kể. Issue #1078 mới mở (0 comment, 0 reaction). PR #1077 từ 10-22, không có data về comments/reactions.

## 5. Ổn định & Bugs

**Arm32 builds** (PR #1077)
- Lỗi: atomic 64-bit không work trên 32-bit targets
- Scope: QQ channel gateway
- Impact: Nightly builds fail 18 ngày (từ 10-05)

**LLM API compatibility** (Issue #1078)
- Lỗi: Một số providers không support `temperature` parameter
- Error message: `"Unsupported parameter: 'temperature' is not supported with this model"`
- Workaround cần: Cho phép set `temperature` = `null` để skip parameter khi gọi API

## 6. Yêu cầu tính năng

**Temperature null support** (#1078)
- Cho phép `temperature: null` trong config
- Khi null, không pass parameter đến LLM API
- Giải quyết lỗi compatibility với providers strict về parameters

## 7. Phản hồi người dùng

Ít feedback trực tiếp. Issues báo lỗi cụ thể (arm32, temperature) cho thấy:
- User deploy trên arm32 hardware
- User dùng nhiều LLM providers khác nhau, gặp vấn đề khi providers có requirements khác nhau

## 8. Backlog & Roadmap

Không có thông tin roadmap từ data.

**Backlog suy diễn:**
- Fix arm32 atomic issue (PR đang mở)
- Implement temperature null support (issue mới, chưa có PR)
- Tiếp tục cải thiện LLM provider compatibility

---

**Nhận xét:** Dự án ở giai đoạn stabilization. Focus vào compatibility (arm32, LLM APIs) hơn là features lớn. Activity thấp ngày hôm nay.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Báo cáo IronClaw — 2026-10-23

## 1. Tóm tắt hôm nay

Hoạt động nhẹ. Issue #8153 phân tích lỗi hàng ngày của officeqa benchmark (64 task fail), chủ yếu do model DeepSeek-V4-Flash. Issue ARM64 support (#3168) đóng sau 6 tháng mở. Dependabot nâng vite 8.1.3 → 8.1.6 trong webui.

## 2. Releases

Không có.

## 3. Tiến độ dự án

**PR #8154**: Dependency bump (vite 8.1.3 → 8.1.6)
- Bảo trì frontend webui
- Tự động bởi dependabot
- Không có tương tác từ team

**Issue #8153**: Daily failure taxonomy 2026-10-22
- Officeqa suite: 64 non-pass tasks
- Lỗi do model DeepSeek-V4-Flash điều hướng kém
- Taxonomy hàng ngày → công cụ theo dõi chất lượng agent

**Issue #3168**: ARM64 support đóng
- Mở 2026-05-01, đóng 2026-10-22 (6 tháng)
- Không có comment → có thể resolved âm thầm hoặc không còn liên quan
- Cranelift hỗ trợ aarch64, chỉ armv7 bị block

**Xu hướng**: Focus vào benchmark quality tracking. Model evaluation infrastructure đang hoạt động.

## 4. Điểm nổi bật cộng đồng

Không có. Cả 3 item đều 0 reaction, 0-1 comment. Cộng đồng im lặng hoặc chỉ có internal team hoạt động.

## 5. Ổn định & Bugs

**Issue #8153**: 64 lỗi officeqa
- Không phải bug IronClaw
- Model quality issue (DeepSeek-V4-Flash)
- IronClaw đang hoạt động đúng, tracking model performance

**PR #8154**: Vite security/bug fix
- Patch release 8.1.3 → 8.1.6
- Bảo trì thường xuyên, không có incident lớn

## 6. Yêu cầu tính năng

Không có feature request mới ngày hôm nay.

Issue #3168 (ARM64) đã đóng → hoặc đã implement hoặc không còn trong roadmap.

## 7. Phản hồi người dùng

Không có. Zero engagement trên tất cả items. Dự án có vẻ internal-driven hoặc early stage với user base nhỏ.

## 8. Backlog & Roadmap

**Từ dữ liệu có**:
- Daily taxonomy reports (#8153) → benchmark quality monitoring đang chạy
- Frontend maintenance (vite bumps) → webui active development
- ARM64 issue closed → multiarch support có thể đã xong hoặc deprioritized

**Suy luận**:
- Benchmark infrastructure đã mature (automated daily reports)
- Focus vào model evaluation hơn platform features
- Maintenance mode cho dependencies

**Thiếu**: Không có public roadmap trong data. Team không communicate plans qua issues/PRs.

---

**Đánh giá tổng thể**: Dự án vận hành ổn định, không có drama. Activity thấp có thể do đội nhỏ hoặc công việc chính diễn ra nơi khác (internal repos, Discord). Benchmark tracking là mảng hoạt động chính visible từ GitHub.

</details>

<details>
<summary><strong>Qwen-Paw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Báo cáo hoạt động QwenPaw — 2026-10-23

## 1. Tóm tắt hôm nay

Release v2.2.2.post1 vá bảo mật khẩn cấp (emSign CA + Node.js CVE). 26 PR đang mở, tập trung vào Desktop daemon independence, frontend test coverage (+1,811 statements), plugin subprocess isolation, và CORS runtime fix. 11 issue mới, chủ yếu bugs sau upgrade.

---

## 2. Releases

### v2.2.2.post1 (2026-10-22)
**Bảo mật khẩn cấp** — người dùng cần upgrade ngay.

**Fixes:**
- #8370: emSign CA trust — sửa dependency, installers, builds
- #8371: Node.js → 22.23.4 — vá CVE-2026-111497 + CVE-2026-105481
- #8369: Version bump → 2.2.2.post1

Release duty #8386 track verification deadline: 2026-10-22 15:50 UTC (4h sau publish).

---

## 3. Tiến độ dự án

### Desktop Architecture (XXXL)
**#8373** — Shared daemon cho desktop  
Hiện tại mỗi window sở hữu backend riêng → nhiều instance tranh runtime, đóng/update một window phá vỡ window khác. PR này tách runtime ownership vào native daemon độc lập, windows chỉ là UI.

### Testing & Quality
**#8380** — Frontend unit tests +106 files (+1,811 statements, +4.97pp coverage)  
Console web UI chưa có test đầy đủ. PR này thêm 41k dòng test (100% test code, 0 product changes).

**#8381-8383** — Platform stability fixes  
- #8381: Windows test failures (advisor listing, TUI drain)
- #8382: macOS timeout (sidecar probe dùng raw socket)
- #8383: Windows sips preflight (macOS-only binary)

### Plugin System (XXXL)
**#8187** — Channels → plugins với subprocess isolation  
Extract official channels (trừ Console) thành plugins, giảm SDK imports ở host process, cô lập channel failures.

**#8345** — Plugin install không abort khi `invalidate_caches` fail  
Bug: distro-patched Python 3.11 raise TypeError → block plugin install. PR catch + log, không abort.

**#7565** — Plugin unload + hot reload  
Clean teardown + rollback-safe reload → install/update/uninstall không rebuild mọi workspace, failed update không để user trên half-applied version.

### Security & Refactors
**#8360** → **#8356** (closed) → #8360 merged  
Chuyển Jev decision model sang AgentScope classifier interface (AgentScope 2.0.10 có `JevClassifierModel` + `TypeSafeCredential`).

**#8366** — Loại bỏ html2text (GPL-3.0)  
Conflict với Apache-2.0. Thay bằng stdlib converter cho `web_fetch`.

### Hub & Gateway
**#8387** — Gateway timeout configurable (120s → 600s default)  
User #8372 report file processing tasks timeout. PR expose **Gateway timeout (seconds)** trong Hub settings.

**#8384** — Hub trong container → reach Docker runtimes  
Hub trong container publish runtime port ở `127.0.0.1` → probe/proxy fail (loopback là Hub's own). PR detect container + expose port trên `0.0.0.0`.

### UX & Features
**#8332** — Console UI/UX refactor (XXXL)  
Usability, resilience, responsive UX. Mouse-first interaction patterns.

**#8367** — Keyword + agentic conversation search  
Auto-generated titles không chứa keywords user nhớ. PR thêm content search + agentic search cho sidebar.

**#8224** — Experimental Python Code Mode  
Rebuild Code Mode: model thấy một `run_code` tool, gọi native tools với `await tools.<name>(...)` trong CPython worker. Nested calls giữ permissions, execution hooks, concurrency.

**#8376** — PowerContext v1.4.0 support  
Update optional PowerContext backend, expose structured context + Artifact APIs (profiles, topic memories, atomic memories, experiences).

**#7874** — PawApp SDK redesign (XXXL)  
PawApps expose durable work qua shared Host contract. Small Apps register `app.action` handler. Host owns task identity, retries, permissions, setup.

---

## 4. Điểm nổi bật cộng đồng

**#8275** (2 comments, 1 👍) — Global Skill + MCP management cho Hub  
User @DrHA request: admin install Skill/MCP một lần → tất cả users dùng được, không cần config riêng. Preserve personal config. Team scenario pain point.

**#7339** (2 comments) — Desktop App auto-scroll disable setting  
User @Skepticwise request toggle để lock viewport khi streaming generation.

---

## 5. Ổn định & Bugs

### Post-Upgrade Bugs (v2.2.2 → v2.2.2.post1)
**#8388** — QQ channel không hoạt động  
Error: `No module named '_qwenpaw_remote_backend'` → toàn bộ tool calls fail. Môi trường QwenPaw bị hỏng sau upgrade.

**#8378** — Model invocation error sau upgrade  
Old agent config `agent.json` có `active_model` → mismatch với v2.2.2 schema.

**#8368** — Delete current chat → 404  
Fixed bởi #8375: introduce "deleted route" flag trong `sessionApi`, skip `resolveChat` cho deleted routes.

### Infrastructure & Config
**#8374** — `QWENPAW_CORS_ORIGINS` qua Web UI/CLI không work  
Fixed bởi #8389: constant read lúc import, trước khi `load_envs_into_environ()` load `envs.json`. PR đọi runtime.

**#8365** — Matrix channel login mỗi lần start + không re-upload E2EE keys  
Config `user_id` + `password` (no `access_token`) → fresh login mỗi process start → new session → homeserver drop device → keys lost.

### Test Stability
**#8379** — pytest collection abort: `import file mismatch: test_backup`  
Two `test_backup.py` (unit + integration) → collection conflict. PR rename một file.

---

## 6. Yêu cầu tính năng

1. **#8275** — Global Skill/MCP management (Hub)
2. **#7339** — Auto-scroll disable setting (Desktop)
3. **#8367** — Conversation content search (implemented in PR)
4. **#8224** — Python Code Mode (experimental, in PR)

---

## 7. Phản hồi người dùng

### Positive
- PowerContext v1.4.0 integration (#8376) — first-time contributor
- Plugin install resilience (#8345) — first-time contributor fix real pain point

### Pain Points
- **Post-upgrade breakage**: #8388 (QQ), #8378 (model config), #8368 (delete chat)
- **Timeout issues**: #8372 (gateway 120s → 600s needed)
- **CORS config**: #8374 (Web UI set không work)
- **Matrix E2EE**: #8365 (keys lost mỗi restart)
- **Team sharing**: #8275 (cần global Skill/MCP)

---

## 8. Backlog & Roadmap

### In Progress (Large PRs)
- #8373 Desktop shared daemon (XXXL)
- #8187 Channel plugins subprocess isolation (XXXL)
- #7874 PawApp SDK redesign (XXXL)
- #8332 Console UI/UX refactor (XXXL)
- #7565 Plugin hot reload (XXXL, under review)

### Ready/Near Merge
- #8389 CORS runtime fix (M)
- #8387 Gateway timeout configurable (S)
- #8375 Delete chat 404 fix (M)
- #8380 Frontend tests +106 files (XXXL)
- #8366 Remove GPL html2text (M)

### Test Stability (mergeable)
- #8379, #8381, #8382, #8383 — platform test fixes

### Creator Release
- #8357 QwenPaw Creator 2.0.2 (XXXL) — skills management + narration safety

**Security posture:** v2.2.2.post1 vá emSign CA + Node CVE. User cần upgrade ngay. Issue #8385 track security notice.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*