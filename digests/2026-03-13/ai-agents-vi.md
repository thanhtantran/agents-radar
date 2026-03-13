# Bản tin Hệ sinh thái OpenClaw 2026-03-13

> Issues: 500 | PRs: 500 | Dự án: 12 | Thời gian tạo: 2026-03-13 01:58 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## Phân tích sâu OpenClaw

Bản tin dự án OpenClaw — 2026-03-13

1) Tổng quan hôm nay
- Hoạt động cộng đồng rất cao: 500 issues và 500 PRs cập nhật trong 24 giờ qua (428 issues mở/hoạt động, 360 PR mở). Số lượng báo cáo lỗi và hồi quy gia tăng sau loạt phát hành gần đây.  
- Nhóm phát triển đang phát hành sửa lỗi bảo mật khẩn cấp (Gateway/WebSocket) và đồng thời xử lý nhiều hồi quy liên quan tới gateway, cron/isolation, và I/O (file/sandbox).  
- Tâm điểm: ổn định runtime (gateway, sandbox, cron jobs) và cải tiến trải nghiệm agent (memory, thinking, integrations).

2) Phát hành phiên bản
- Mới: v2026.3.11 (openclaw 2026.3.11) — bản chính thức và v2026.3.11-beta.1.  
  - Nội dung chính (Security): Gateway/WebSocket giờ ép kiểm tra Origin trình duyệt cho mọi kết nối khởi phát từ browser, kể cả khi không có proxy headers, nhằm đóng lỗ hổng cross-site WebSocket hijacking trong chế độ `trusted-proxy` có thể cấp quyền `operator.admin` cho origin không tin cậy. (GHSA-5wcw-8).  
  - Ghi chú di chuyển: mọi deployment chạy `trusted-proxy` cần kiểm tra cấu hình proxy/headers; node/nginx reverse proxy cần đảm bảo header X-Forwarded-* được cấu hình đúng để tránh xác thực sai (xem mục lỗi/tracking bên dưới).  
  - Link: https://github.com/openclaw/openclaw/releases (chi tiết trong changelog release v2026.3.11)

3) Tiến độ dự án (PRs merge/đóng và tính năng đang đẩy)
- PR đã đóng/merge gần đây đáng chú ý:
  - Docs: Ollama onboarding cập nhật (PR #43473 — closed) (https://github.com/openclaw/openclaw/pull/43473).  
  - Đã đóng: một số PR cũ sạch CI/cleanup (ví dụ PR #12039 — closed).  
- PRs đang tích cực review / mở và sẽ ảnh hưởng lớn:
  - adaptive thinking controls (PR #44126 — open) (https://github.com/openclaw/openclaw/pull/44126) — thêm tool `set_thinking_level` và cơ chế điều chỉnh thinking mid-run.  
  - Cortex local memory integration (PR #44421 — open) (https://github.com/openclaw/openclaw/pull/44421) — tích hợp Cortex làm substrate bộ nhớ cục bộ, lộ diện các command / tooling cho memory.  
  - Compaction & session truncation (PR #41021 — open) (https://github.com/openclaw/openclaw/pull/41021) — opt‑in truncateAfterCompaction để kiểm soát kích thước session JSONL.  
  - Dashboard & session API improvements (PR #43811 — open) (https://github.com/openclaw/openclaw/pull/43811) — làm sạch/ổn định dữ liệu Control UI.  
- Những PR hotfix triển khai sớm:
  - Sửa restart khi systemd (PR #44531 — open) (https://github.com/openclaw/openclaw/pull/44531).  
  - Script restart an toàn để tránh gateway tự-kill (PR #44520 — open) (https://github.com/openclaw/openclaw/pull/44520).  
  - Bảo vệ tránh hỏng file session khi mất lock (PR #44510 — open) (https://github.com/openclaw/openclaw/pull/44510).  

4) Chủ đề nóng trong cộng đồng (top active)
- Internationalization (i18n) & Localization Support — issue #3460 (98 bình luận) (https://github.com/openclaw/openclaw/issues/3460). Nhu cầu: UI/CLI/Agent multi‑lang; but team báo thiếu bandwidth. Người dùng mong muốn hỗ trợ bản địa hóa cho trải nghiệm rộng hơn.  
- Add DingTalk as first-install channel option — issue #26534 (62 bình luận, nhiều 👍) (https://github.com/openclaw/openclaw/issues/26534). Nhu cầu cụ thể: hiển thị DingTalk trong onboarding wizard — nhiều người Trung Quốc/enterprise cần.  
- Linux/Windows Clawdbot Apps — issue #75 (39 bình luận, nhiều 👍) (https://github.com/openclaw/openclaw/issues/75). Nhu cầu: desktop apps parity với macOS/iOS/Android.  
- Kimi K2.5 config validation / model issues — issue #41445 (closed) (https://github.com/openclaw/openclaw/issues/41445) — nhiều báo cáo liên quan tới model provider configs, tương thích schema, ảnh hưởng tới người dùng Kimi.  
Phân tích chung: cộng đồng đang yêu cầu trải nghiệm đa nền tảng (onboarding+kênh), hỗ trợ models bên thứ ba dễ cấu hình, và i18n/LOE để mở rộng adoption.

5) Lỗi & Ổn định — xếp hạng theo mức độ nghiêm trọng (tóm tắt, links)
- Cao (blocker / data-loss / crash)
  - Sandbox FS Bridge v3.11 regression: Write/Edit tool luôn tạo file 0-byte khi python3 có trong image — gây mất dữ liệu công việc (issue #44122) (https://github.com/openclaw/openclaw/issues/44122). Rất nghiêm trọng cho workflows viết file trong sandbox.  
  - Gateway crash / removed after restart (issue #44093) (https://github.com/openclaw/openclaw/issues/44093) — restart gây crash/launchd vấn đề. PR liên quan: safe-restart script (PR #44520) và systemd restart fix (PR #44531).  
  - Cron isolated sessions timing out / jobs enqueued but never executed (issues #40868, #44257) (https://github.com/openclaw/openclaw/issues/40868, https://github.com/openclaw/openclaw/issues/44257). Ảnh hưởng cron automation lớn.  
  - Edit tool wipes file to 0 bytes while reporting success (issue #43858) (https://github.com/openclaw/openclaw/issues/43858) — nguy cơ mất dữ liệu.  
- Trung bình (hành vi sai, regressions, usability)
  - Exec approval socket not created on gateway startup (issue #43989) (https://github.com/openclaw/openclaw/issues/43989) — approval flow treo.  
  - macOS Gateway never becomes ready (setup wizard stuck) (issue #6156) (https://github.com/openclaw/openclaw/issues/6156) — blocker UX cho macOS install.  
  - openclaw-message OOM on 4GB servers since v2026.3.7 (issue #41778) (https://github.com/openclaw/openclaw/issues/41778) — ảnh hưởng VPS nhỏ. PRs tối ưu memory chưa rõ đã merge.  
  - provider routing & API errors (Mistral 422, GitHub Copilot 421, provider auth missing) — issues #41293, #8366, #34830 (https://github.com/openclaw/openclaw/issues/41293, https://github.com/openclaw/openclaw/issues/8366, https://github.com/openclaw/openclaw/issues/34830).  
- Ghi chú PR sửa lỗi/giảm thiểu:
  - PR #44531 (systemd restart fix) và PR #44520 (safe restart script) đang mở để giảm crash-on-restart (https://github.com/openclaw/openclaw/pull/44531, https://github.com/openclaw/openclaw/pull/44520).  
  - PR #44510 bảo vệ chống corruption do concurrent writes (https://github.com/openclaw/openclaw/pull/44510).  
  - PR #44512 workspace symlink escape fix (https://github.com/openclaw/openclaw/pull/44512) để giảm vector LPE/escape.  
  - PR #44476 exit 0 on EADDRINUSE để tránh crash-loop dưới systemd (https://github.com/openclaw/openclaw/pull/44476).

6) Yêu cầu tính năng & tín hiệu lộ trình
- Được yêu cầu nhiều: i18n/localization (#3460) (https://github.com/openclaw/openclaw/issues/3460), DingTalk onboarding (#26534) (https://github.com/openclaw/openclaw/issues/26534), Linux/Windows native apps (#75) (https://github.com/openclaw/openclaw/issues/75).  
- Tính năng được tích cực phát triển / có khả năng vào release tiếp theo: Cortex local memory integration (PR #44421) (https://github.com/openclaw/openclaw/pull/44421), adaptive thinking controls (PR #44126) (https://github.com/openclaw/openclaw/pull/44126), memory_lancedb improvements (PR #43498) (https://github.com/openclaw/openclaw/pull/43498).  
- Nhiều tín hiệu cho roadmap: cải thiện memory/compaction, agent reasoning controls, integrations (Ollama, DingTalk, enterprise channels), ổn định gateway/crons/sandbox.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Hồi quy sau một số bản 2026.3.x: cron isolated jobs không chạy, session/tool I/O lỗi (sandbox/write/edit), gateway restart instability — gây mất automations và workflow. (ví dụ #40868, #44122, #44093).  
  - Khó configure third‑party models/providers (Kimi, Mistral, GitHub Copilot routing) — dẫn tới nhiều ticket cấu hình/validation. (ví dụ #41445, #41293, #8366).  
  - Onboarding & platform parity: DingTalk / Windows / Linux apps và i18n là yêu cầu lớn để mở rộng userbase.  
- Tâm trạng cộng đồng: tích cực đóng góp, nhưng có phần bất mãn với regressions lặp lại; người dùng mong fix nhanh cho cron/sandbox/gateway trước khi thêm tính năng mới.

8) Theo dõi tồn đọng (cần sự chú ý)
- Issues cần hành động/triage từ maintainers:
  - i18n & localization (issue #3460) — cần roadmap/acceptance criteria (https://github.com/openclaw/openclaw/issues/3460).  
  - DingTalk onboarding (issue #26534) — small UX work but high demand (https://github.com/openclaw/openclaw/issues/26534).  
  - Sandbox FS Bridge regression producing 0-byte files (issue #44122) — blocker dữ liệu, ưu tiên cao (https://github.com/openclaw/openclaw/issues/44122).  
  - Cron isolated sessions still failing post-2026.3.11 (issue #44257) (https://github.com/openclaw/openclaw/issues/44257) — regression not resolved per reports.  
  - trusted-proxy/nginx authentication broken (issue #43561) — security/ops concern for multi-node deployments (https://github.com/openclaw/openclaw/issues/43561).  
  - openrouter / 401 missing auth header (issue #34830) và provider plugin discovery failures (issue #32892) — ảnh hưởng onboarding model providers (https://github.com/openclaw/openclaw/issues/34830, https://github.com/openclaw/openclaw/issues/32892).  
- PRs quan trọng cần review/merge:
  - PR #44421 (Cortex memory integration) (https://github.com/openclaw/openclaw/pull/44421).  
  - PR #44126 (adaptive thinking) (https://github.com/openclaw/openclaw/pull/44126).  
  - PR #44510 (session file corruption mitigation) (https://github.com/openclaw/openclaw/pull/44510).  
  - PR #44531 (systemd restart fix) & PR #44520 (safe restart script) (https://github.com/openclaw/openclaw/pull/44531, https://github.com/openclaw/openclaw/pull/44520).  

Kết luận ngắn: hiện tại OpenClaw có hoạt động cộng đồng mạnh và đang khẩn trương xử lý một số hồi quy nghiêm trọng gây mất dữ liệu hoặc làm gián đoạn automation (sandbox write, cron isolated sessions, gateway restart). Nếu bạn đang vận hành OpenClaw trong môi trường production: (1) kiểm tra đã cập nhật lên v2026.3.11 (security patch) và (2) tạm hoãn upgrade nếu phụ thuộc vào cron/isolated jobs hoặc workflows viết file trong sandbox cho tới khi các PR hotfix được merge và xác nhận.  

Tài liệu tham khảo (một số link đã trích trong bản tin):  
- Issue i18n: https://github.com/openclaw/openclaw/issues/3460  
- Issue DingTalk onboarding: https://github.com/openclaw/openclaw/issues/26534  
- Sandbox regression (0-byte files): https://github.com/openclaw/openclaw/issues/44122  
- Cron isolated jobs failing: https://github.com/openclaw/openclaw/issues/40868 và https://github.com/openclaw/openclaw/issues/44257  
- Edit tool wipes file: https://github.com/openclaw/openclaw/issues/43858  
- Gateway restart/systemd fixes (PRs): https://github.com/openclaw/openclaw/pull/44531, https://github.com/openclaw/openclaw/pull/44520  
- Cortex memory PR: https://github.com/openclaw/openclaw/pull/44421  
- Adaptive thinking PR: https://github.com/openclaw/openclaw/pull/44126

Nếu bạn muốn, tôi có thể tạo checklist hành động cho maintainers (triage/prioritization) hoặc tóm tắt nhanh các PR liên quan đến mỗi lỗi để tiện review.

---

## So sánh hệ sinh thái chéo

1) Tổng quan hệ sinh thái
- Hệ sinh thái mã nguồn mở cho trợ lý AI cá nhân/agent đang rất sôi động: nhiều dự án khác nhau tập trung vào những mảng chuyên biệt (orchestration lớn, kênh/chatops, local‑LLM, CLI/dev UX), đồng thời chia sẻ chuỗi vấn đề chung như sandboxing/bảo mật, quản lý credential/token, và độ ổn định runtime (gateway/cron/sessions).  
- Xu hướng rõ ràng: mở rộng providers & kênh, đầu tư vào memory/vector stores, và cơ chế điều khiển hành vi agent (thinking levels/tool guards). Người vận hành quan tâm mạnh tới tính ổn định và an toàn hơn là thêm tính năng mới trong ngắn hạn.

2) So sánh mức độ hoạt động
(Dữ liệu tóm tắt 24h từ bản tin — Issues / PRs cập nhật trong 24h; Release = có release mới trong chu kỳ; Health = đánh giá ngắn gọn)

| Dự án        | Issues (24h) | PRs (24h) | Release (gần nhất)        | Health (tóm tắt)                       |
|--------------|--------------:|-----------:|---------------------------|----------------------------------------|
| OpenClaw     | 500 (428 open)| 500 (360 open) | v2026.3.11 (security)     | Rất cao hoạt động; lớn, nhưng có regressions nghiêm trọng (gateway/sandbox/cron) |
| NanoBot      | 51 (30 open)  | 76 (36 open) | —                         | Nhiều PR provider/channel; cần sandboxing non‑root (bảo mật) |
| PicoClaw     | 26 (16 open)  | 111 (72 open)| nightly v0.2.2-nightly    | Hoạt động mạnh, tập trung local‑LLM & channels |
| NanoClaw     | 19 (16 open)  | 32 (21 open) | —                         | Hoạt động cao; vận hành/token lifecycle là pain point |
| IronClaw     | 50 (36 open)  | 50 (25 open) | —                         | Nhiều bug‑bash P1; tích hợp OAuth/Telegram cần ưu tiên |
| LobsterAI    | 6            | 10 (9 closed)| v0.2.4                    | Hoạt động nhẹ; release vá lỗi khởi động/gateway |
| TinyClaw     | 4             | 11 (9 merged)| v0.0.12                   | Nhỏ, nhanh fix install/onboarding; tập trung CLI/UX |
| Moltis       | 11 (4 open)   | 16 (10 open) | —                         | Tập trung local‑LLM/DoS fixes; hoạt động vừa phải |
| CoPaw        | ~50 (39 open) | ~30 open     | v0.0.7                    | Hoạt động rất cao; backlog review PR lớn, cần ổn định runtime |
| ZeptoClaw    | 11 (6 open)   | 6 (3 open)   | —                         | Nhỏ Nhưng năng động về UX/skills; cần fix CI/agent bugs |
| EasyClaw     | 1 closed      | 0            | v1.6.7                    | Hoạt động thấp; focus UX macOS/OAuth                 |
| Zeroclaw     | —             | —            | —                         | Thông tin thất bại (không có dữ liệu)               |

Ghi chú: con số là snapshot 24h từ bản tin—mục đích so sánh tương đối hoạt động & tình trạng release.

3) Vị thế của OpenClaw
- Ưu thế: quy mô cộng đồng và hoạt động (500 issues/PR trong 24h) lớn hơn hầu hết dự án khác; ưu tiên kỹ thuật đa dạng (gateway, sandbox, memory, adaptive thinking) và nhiều PR lớn (Cortex memory, adaptive thinking, compaction). OpenClaw là “platform‑grade” — hướng tới orchestration, integrations và enterprise deployment.  
- Khác biệt kỹ thuật: đầu tư sâu vào runtime (gateway/WebSocket/security, cron isolation, sandbox FS bridge) và vào control plane (dashboard/session API, compaction). Nhiều dự án nhỏ tập trung vào channel/provider; OpenClaw hướng tới scale & governance.  
- Quy mô cộng đồng: rõ ràng lớn nhất (activity + nhiều issues/PR), do đó có cả lợi thế (nhiều đóng góp) và rủi ro (nhiều regressions, cần triage).

4) Hướng kỹ thuật chung (các yêu cầu lặp lại, kèm dự án minh họa)
- Sandboxing & non‑root exec (bảo mật): NanoBot (#1873), NanoClaw (#865), OpenClaw (sandbox FS regressions #44122). Nhiều PR/issue yêu cầu bubblewrap / non‑root container và hardening.  
- Quản lý credential / token lifecycle & proxy: NanoClaw (#730, credential refresh), NanoBot (credential exposure), Moltis (secret MCP URLs), NanoBot / EasyClaw (OAuth flows).  
- Local‑LLM / Ollama / GGUF / Vulkan support: PicoClaw (Ollama), Moltis (GGUF + Vulkan), LobsterAI (local provider configs).  
- Semantic memory / vector store integrations: OpenClaw (Cortex PR #44421), NanoClaw (LanceDB skill #1013), NanoBot (memory consolidation).  
- Multi‑channel integrations (APAC/enterprise channels): DingTalk/Feishu/QQ/XMPP/Matrix/WhatsApp — OpenClaw (DingTalk request), NanoBot (XMPP, DingTalk), PicoClaw (WeCom), CoPaw (Feishu/QQ issues).  
- Runtime reliability: cron/isolation/job execution (OpenClaw cron issues #40868/#44257, IronClaw routines #823), gateway restart stability.  
- Packaging / platform parity & signing: EasyClaw (macOS Gatekeeper), LobsterAI (code signing fixes), NanoBot (PyPI vs GitHub release parity).

5) Phân tích khác biệt hóa (trọng tâm, người dùng, kiến trúc)
- OpenClaw: platform/orchestration, hướng enterprise/self‑host scale, tập trung runtime hardening, memory platform, integrations. Người dùng: ops, enterprises, power self‑hosters.  
- NanoBot / NanoClaw: channel‑first, provider breadth, nhiều skill/kênh; người dùng: multi‑channel chatops, APAC audiences (QQ/Feishu), developer community đóng nhiều PR. Kiến trúc: nhẹ hơn, tập trung kênh + provider adapters.  
- PicoClaw / Moltis / LobsterAI: local‑LLM & embedded/GGUF focus (Ollama, Vulkan); phù hợp với người muốn chạy models cục bộ/edge.  
- CoPaw: chatops + security UX (Tool Guard), multi‑workspace / multi‑agent roadmap — hướng vào deployment an toàn cho tổ chức.  
- TinyClaw / ZeptoClaw: CLI/dev UX và coding workflows (streaming, agent_message persistence, ask_clarification) — target: developers, hobbyists, rapid prototyping.  
- EasyClaw: desktop app / người dùng cá nhân, focus UX/macOS packaging.  
Mỗi nhóm có trọng tâm khác nhau: scale/orchestration vs channel integrations vs local‑LLM vs developer UX.

6) Động lực & độ trưởng thành của cộng đồng
- Lớp “vòng trong” (lặp nhanh, nhiều đóng góp): OpenClaw (rất nhiều activity, nhiều PR mở), NanoBot, PicoClaw, CoPaw, IronClaw — these ship features fast but often have high backlog/triage needs.  
- Lớp “ổn định/nhỏ” (ít thay đổi, release nhẹ): LobsterAI, EasyClaw — release nhanh vá lỗi nhưng ít PR/issue hàng ngày.  
- Lớp “focused/CLI” (nhiều tính năng UX nhỏ, phối hợp nhanh): TinyClaw, ZeptoClaw — đóng PR UX nhanh, thích hợp cho developer adoption.  
- Rủi ro cộng đồng: dự án lớn (OpenClaw) có sức mạnh nhưng cũng phải đối mặt với regressions nghiêm trọng; dự án channel‑heavy thường phải ưu tiên reliability (NanoBot, CoPaw). Zeroclaw: không có dữ liệu => chưa thể đánh giá.

7) Tín hiệu xu hướng (những điều nhà phát triển agent nên chú ý)
- Sandbox & execution hardening trở thành nhu cầu bắt buộc (evidence: NanoBot #1940, OpenClaw sandbox 0‑byte regression, NanoClaw container security discussions). Hãy thiết kế agent runtimes để chạy non‑root, rõ ràng về mounts/paths và giới hạn I/O.  
- Hỗ trợ local‑LLM (Ollama, GGUF, Vulkan) tiếp tục tăng — triển khai seamless local provider config và hot‑swap fallback cho cloud providers (PicoClaw, Moltis, LobsterAI).  
- Memory / vector store tích hợp là cạnh tranh sản phẩm (Cortex, LanceDB, lancedb) — cần API/CLI cho quản trị bộ nhớ, compaction/truncation và tiết kiệm token.  
- Multi‑channel & APAC providers matter — DingTalk/Feishu/QQ/XMPP/WeCom yêu cầu native UX; nếu target thị trường APAC, kênh này là quyết định.  
- Agent control primitives: adaptive thinking, tool guards, per‑run thinking level, và clearer tool approval flows (OpenClaw adaptive thinking PR, CoPaw Tool Guard). Đây là cơ hội để giảm rủi ro hành vi agent.  
- Reliability patterns: cron/isolation, job queues, restart/safe‑restart scripts, network fallbacks — dự án nào bỏ qua sẽ gặp đau đầu vận hành (OpenClaw cron/gateway, IronClaw routines).  
- Packaging & platform parity: code signing, native desktop apps, PyPI vs GitHub release parity — ảnh hưởng adoption cho non‑technical users (EasyClaw, LobsterAI, NanoBot).

Kết luận ngắn gọn (dành cho người ra quyết định kỹ thuật)
- Nếu bạn cần một nền tảng lớn, tích hợp sâu và community‑backed làm control plane: OpenClaw dẫn đầu về quy mô và tính năng nhưng cần thận trọng với các regressions runtime hiện tại (khuyến nghị: đợi hotfixes nếu phụ thuộc cron/sandbox).  
- Nếu ưu tiên kênh & provider breadth (APAC / chatops): NanoBot / NanoClaw / CoPaw cung cấp bộ adapters nhanh, nhưng hãy ưu tiên review các PR sandbox/credential trước khi triển khai production.  
- Nếu mục tiêu là local‑LLM/edge: PicoClaw / Moltis / LobsterAI có đầu tư rõ ràng vào GGUF/Ollama/Vulkan.  
- Tổng quan: kiến trúc agent an toàn (sandboxing, credential proxy), memory subsystem và reliable orchestration là các khoản đầu tư chiến lược nhất cho 6–12 tháng tới.

Nếu muốn, tôi có thể chuyển các điểm ưu tiên (per‑project) thành checklist hành động ngắn cho maintainers hoặc roadmap rủi ro/mitigation để dùng trong quyết định nâng cấp production.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

NanoBot — Bản tin dự án (2026-03-13)

1) Tổng quan hôm nay
- Trong 24 giờ qua kho chứa có hoạt động cao: 51 issue cập nhật (30 mở/hoạt động, 21 đóng) và 76 PR cập nhật (36 mở, 40 đã merge/đóng).  
- Chủ đề chính là mở rộng provider/channel, cải thiện bảo mật khi exec, và sửa các lỗi giao diện/kênh (Telegram/QQ/Matrix/DingTalk).  
- Nhiều PR tính năng lớn đang chờ review (Vertex AI, XMPP, sandbox exec) và một số PR sửa lỗi đã được merge/đóng — dự án có cộng đồng đóng góp sôi động nhưng vẫn cần bảo trì tập trung vào các điểm nghẽn.  

2) Phát hành phiên bản
- Không có phiên bản mới trong báo cáo này.

3) Tiến độ dự án (PRs đã merge/đóng / thay đổi quan trọng)
- Tổng quan: 40 PR được merge/đóng trong 24h, nhiều PR lớn vẫn mở (36).  
- PR đã đóng/merge nổi bật (ví dụ):  
  - #1856 (closed) — exclude hidden files khi sync template workspace (fix đồng bộ file ẩn). Link: https://github.com/HKUDS/nanobot/pull/1856  
  - #1608 (closed) — thêm VolcEngine & BytePlus provider support. Link: https://github.com/HKUDS/nanobot/pull/1608  
  - #1930 (closed) — bảo toàn format CLI cho output của subagent bất đồng bộ (fix giao diện CLI). Link: https://github.com/HKUDS/nanobot/pull/1930  
- PR đang chờ review/merge và đáng chú ý (đẩy mạnh chức năng / khắc phục vấn đề):  
  - Sandbox exec bằng bubblewrap, chạy container non-root — #1940 (fix/security, liên quan #1873). Link: https://github.com/HKUDS/nanobot/pull/1940  
  - Hỗ trợ Google Vertex AI — #1943. Link: https://github.com/HKUDS/nanobot/pull/1943  
  - XMPP channel — #1945. Link: https://github.com/HKUDS/nanobot/pull/1945  
  - Khôi phục gửi plain-text cho QQ (fix tương thích client cũ) — #1941. Link: https://github.com/HKUDS/nanobot/pull/1941  
  - Cho phép vô hiệu hoá skill bằng frontmatter 'enabled: false' — #1934. Link: https://github.com/HKUDS/nanobot/pull/1934

4) Chủ đề nóng trong cộng đồng
- feishu cấu hình không thành công (#176, 17 bình luận, CLOSED) — vấn đề thực tế với channel Feishu / cấu hình gateway: https://github.com/HKUDS/nanobot/issues/176  
- Hỗ trợ GitHub Copilot provider (#140, 11 bình luận) — nhu cầu về tích hợp thêm provider/engine: https://github.com/HKUDS/nanobot/issues/140  
- Thiếu tài liệu tiếng Trung/Localization (#1617, 10 bình luận, CLOSED) — nhiều người dùng yêu cầu README/Tài liệu CN: https://github.com/HKUDS/nanobot/issues/1617  
- Bảo mật: agent có thể truy cập config và rò rỉ key (#1873, OPEN, 8 bình luận) — người dùng mong sandbox/run non-root: https://github.com/HKUDS/nanobot/issues/1873  
- Channel reliability: Matrix không hoạt động (#1300, 6 bình luận) và Telegram trả lời đôi (#1692, 5 bình luận) — các vấn đề channel phổ biến: https://github.com/HKUDS/nanobot/issues/1300, https://github.com/HKUDS/nanobot/issues/1692  
- Cộng đồng cũng đang đề xuất web UI quản lý self-hosted (nanobot-webui #1922) — tín hiệu rõ ràng về nhu cầu GUI: https://github.com/HKUDS/nanobot/issues/1922

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao (bảo mật / có thể rò rỉ key): #1873 — agent có thể truy cập config.json; PR khắc phục tạm thời: #1940 (sandbox với bubblewrap + non-root). Issue: https://github.com/HKUDS/nanobot/issues/1873 — PR: https://github.com/HKUDS/nanobot/pull/1940  
- Trung bình-cao (memory / mất ổn định): #1931 — memory consolidation báo LLM không gọi save_memory, có thể dẫn đến mất lịch sử hoặc tăng phí token: https://github.com/HKUDS/nanobot/issues/1931  
- Trung bình (channel break / user impact): #1300 Matrix channel fails, #1692 Telegram trả lời 2 lần, #1157 OpenRouter StepFun trả 400 — ảnh hưởng trực tiếp trải nghiệm người dùng đa kênh: https://github.com/HKUDS/nanobot/issues/1300, https://github.com/HKUDS/nanobot/issues/1692, https://github.com/HKUDS/nanobot/issues/1157  
- Hồi quy/khả năng phá vỡ tương tác legacy: #1936 QQ markdown phá vỡ client cũ — PR #1941 để khôi phục plain-text: https://github.com/HKUDS/nanobot/issues/1936, PR: https://github.com/HKUDS/nanobot/pull/1941  
- Ghi chú: một số lỗi CLI/encoding đã được đóng với PR #1930 (fix hiển thị) và PR nhỏ khác (ví dụ exclude file ẩn #1856).

6) Yêu cầu tính năng & tín hiệu lộ trình
- Mở rộng providers: nhiều PR/issue yêu cầu support Vertex AI (#1943), Mistral / transcription (#1680), VolcEngine/BytePlus đã được thêm (#1608). Links: https://github.com/HKUDS/nanobot/pull/1943, https://github.com/HKUDS/nanobot/pull/1680, https://github.com/HKUDS/nanobot/pull/1608  
- Channel/interop: XMPP (#1945), DingTalk file/richText receiving (#1925), cải thiện WhatsApp/iMessage bridges (#92, #90) — người dùng cần nhiều kênh hơn và ổn định hơn. Links: https://github.com/HKUDS/nanobot/pull/1945, https://github.com/HKUDS/nanobot/pull/1925, https://github.com/HKUDS/nanobot/issues/92  
- Kiểm soát agent: disable skills via config (#1934), per-subagent working_dir (#1935), council/orchestrator of bots (#1928) — xu hướng hướng tới cấu hình linh hoạt và multi-agent. Links: https://github.com/HKUDS/nanobot/pull/1934, https://github.com/HKUDS/nanobot/pull/1935, https://github.com/HKUDS/nanobot/issues/1928  
- Dự đoán: các tính năng có khả năng xuất hiện trong phiên bản tiếp theo nếu PR được review/merge: sandbox exec (bảo mật), Vertex AI support, XMPP channel, khả năng disable skill, và cải thiện transcription/providers.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: tích hợp kênh không ổn định (Matrix/Telegram/QQ/WhatsApp), memory/token management gây chi phí/policing, và thiếu tài liệu hướng dẫn nhất quán (đặc biệt là bản tiếng Trung). Ví dụ: #176 (Feishu config), #680 (mismatch config tutorial), #1617 (thiếu README tiếng Trung). Links: https://github.com/HKUDS/nanobot/issues/176, https://github.com/HKUDS/nanobot/issues/680, https://github.com/HKUDS/nanobot/issues/1617  
- Người dùng đánh giá cao: cộng đồng đóng góp nhiều PR cho providers và kênh; có nhu cầu rõ ràng cho web UI quản lý (issue #1922). Link: https://github.com/HKUDS/nanobot/issues/1922  
- Mức độ hài lòng: vừa phải — người dùng khen nỗ lực mở rộng provider nhưng thất vọng với một số lỗi kênh, tài liệu và phát hành không đồng bộ (PyPI vs GitHub Releases, issue #1059/#88).

8) Theo dõi tồn đọng (cần sự chú ý của maintainer)
- Bảo mật / exec access: #1873 (OPEN) — ưu tiên cao, PR #1940 tồn tại nhưng cần review/merge và testing: https://github.com/HKUDS/nanobot/issues/1873, PR: https://github.com/HKUDS/nanobot/pull/1940  
- Matrix channel not working: #1300 — cần maintainer hỗ trợ, log triage: https://github.com/HKUDS/nanobot/issues/1300  
- Web UI / quản lý tập trung: #1922 — xác định roadmap cho GUI và phân quyền: https://github.com/HKUDS/nanobot/issues/1922  
- web_search swappable: #1719 (👍10) — nhiều PR lẻ tẻ đã đề xuất, cần định nghĩa seam/extension point: https://github.com/HKUDS/nanobot/issues/1719  
- PyPI vs GitHub release parity: #1059 / #88 — đảm bảo phát hành đồng bộ để cải thiện discoverability / packaging: https://github.com/HKUDS/nanobot/issues/1059, https://github.com/HKUDS/nanobot/issues/88  
- PR chờ review quan trọng: #1943 (Vertex AI), #1945 (XMPP), #1934 (disable skills), #1939 (skip heartbeat), #1935 (spawn working_dir), #1925 (DingTalk file receiving). Links: https://github.com/HKUDS/nanobot/pull/1943, https://github.com/HKUDS/nanobot/pull/1945, https://github.com/HKUDS/nanobot/pull/1934, https://github.com/HKUDS/nanobot/pull/1939, https://github.com/HKUDS/nanobot/pull/1935, https://github.com/HKUDS/nanobot/pull/1925

Kết luận / Khuyến nghị nhanh cho maintainer
- Ưu tiên cao: review/merge PR liên quan sandboxing (#1940) để giảm rủi ro rò rỉ key; xử lý Matrix/Telegram/QQ regressions để ổn định trải nghiệm multi-channel.  
- Trung hạn: hợp nhất provider lớn (Vertex, Mistral, VolcEngine/BytePlus) và làm rõ seam cho web_search để tránh duplicate PRs.  
- Tài liệu & phát hành: bổ sung README tiếng Trung, cập nhật hướng dẫn config (đồng bộ với thực tế), và publish GitHub Releases đồng bộ với PyPI.

Tất cả link GitHub đã nêu trong từng mục để tham khảo chi tiết.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

1) Tổng quan hôm nay
- PicoClaw đang ở trạng thái phát triển tích cực: trong 24 giờ qua có 26 issues được cập nhật (16 mở/hoạt động, 10 đã đóng) và 111 PR được cập nhật (72 mở, 39 đã merge/đóng).  
- Một nightly build mới được tạo (v0.2.2-nightly.20260313.19835b2f). Đây là bản build tự động, có thể không ổn định — dùng thận trọng. (Changelog: https://github.com/sipeed/picoclaw/compare/v0.2.2...main)  
- Hoạt động cộng đồng tập trung vào: (1) cấu hình chạy mô hình cục bộ (Ollama), (2) refactor agent và quản lý context, (3) tương tác với hệ thống orchestration / gateway.

2) Phát hành phiên bản
- Phiên bản mới nhất: nightly v0.2.2-nightly.20260313.19835b2f (automated). Thông báo build: Nightly Build for v0.2.2-nightly.20260313.19835b2f — có thể không ổn định. Full changelog: https://github.com/sipeed/picoclaw/compare/v0.2.2...main

3) Tiến độ dự án (PRs đã merge/đóng hôm nay & thay đổi nổi bật)
- Tổng số PR merge/đóng trong 24h: 39. Một số PR đã đóng/merge đáng chú ý:
  - fix(web): correct SVG MIME type → đóng (PRs #1429 https://github.com/sipeed/picoclaw/pull/1429 và #1443 https://github.com/sipeed/picoclaw/pull/1443) — sửa lỗi hiển thị SVG trong trình duyệt.  
  - go.mod Go version format fix — đóng (PR #1432 https://github.com/sipeed/picoclaw/pull/1432) — sửa lỗi khởi động trên Windows.  
  - docs: Azure OpenAI added to docs/config.example — đóng (PR #1472 https://github.com/sipeed/picoclaw/pull/1472) và readme update (PR #1469 https://github.com/sipeed/picoclaw/pull/1469).  
  - Docker healthchecks cho gateway — đóng (PR #1470 https://github.com/sipeed/picoclaw/pull/1470 và #1471 https://github.com/sipeed/picoclaw/pull/1471) — cải thiện trải nghiệm chạy trong container/orchestration.  
- PRs đang mở triển vọng/quan trọng: Mattermost channel (PR #1288 https://github.com/sipeed/picoclaw/pull/1288), MiniMax reasoning_split support (PR #1459 https://github.com/sipeed/picoclaw/pull/1459), 多模态 WeCom AIBot hoàn thiện (PR #1478 https://github.com/sipeed/picoclaw/pull/1478).

4) Chủ đề nóng trong cộng đồng (issues/PRs hoạt động nhiều)
- Cấu hình Ollama (issue #1161, 17 bình luận): "How to correctly configure PicoClaw with local Ollama models?" — vấn đề tích hợp mô hình cục bộ, agent khởi động nhưng không trả lời. https://github.com/sipeed/picoclaw/issues/1161  
- Agent refactor / định nghĩa agent (issue #1218) và meta refactor (issue #1216): thảo luận về cách lưu ý "SOUL.md/AGENT.md" và semantics mới cho agent. https://github.com/sipeed/picoclaw/issues/1218, https://github.com/sipeed/picoclaw/issues/1216  
- Quản lý context & token budgeting (issue #1439): định nghĩa ranh giới history/summary/compression cho session. https://github.com/sipeed/picoclaw/issues/1439  
- Orchestration / gateway features (issues #1474, #1475, #1476, #1462): chuỗi đề xuất cho discovery, event stream, stable identity và OpenClaw compatibility — tín hiệu rõ ràng là tích hợp với control planes đang được ưu tiên. https://github.com/sipeed/picoclaw/issues/1474, https://github.com/sipeed/picoclaw/issues/1475, https://github.com/sipeed/picoclaw/issues/1476, https://github.com/sipeed/picoclaw/issues/1462

5) Lỗi & Ổn định (xếp theo mức độ nghiêm trọng)
- Cao
  - Fallback chain aborts on retriable OpenRouter transport resets (issue #1419) — ảnh hưởng tới tính khả dụng của fallback providers; PR #1465 đang mở để sửa phân loại lỗi transport (PR: https://github.com/sipeed/picoclaw/pull/1465). Issue: https://github.com/sipeed/picoclaw/issues/1419
- Trung bình
  - DoS vectors trong webhook/channels: LINE webhook đọc body không giới hạn (issue #1407) — đã được đóng sau PR fix (PR #1428 đang mở để thêm giới hạn kích thước) https://github.com/sipeed/picoclaw/issues/1407; PR: https://github.com/sipeed/picoclaw/pull/1428  
  - Matrix channel media download without size limit (issue #1405) — báo cáo DoS, đã được đóng (xem: https://github.com/sipeed/picoclaw/issues/1405) — kiểm tra xem patch bảo vệ streaming/giới hạn bộ nhớ đã được áp dụng chưa.  
- Thấp / UI
  - SVG MIME type trả về incorrect Content-Type (issue #1410) — đã fix bằng PRs #1429/#1443 (đã đóng). Issue: https://github.com/sipeed/picoclaw/issues/1410; PRs: https://github.com/sipeed/picoclaw/pull/1429, https://github.com/sipeed/picoclaw/pull/1443
- Ghi chú: nhiều lỗi nghiêm trọng liên quan tới tích hợp kênh (channels) và providers — một số đã có PR sửa, nhưng cần review/merge nhanh để giảm rủi ro bảo mật/DoS.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Hỗ trợ Azure OpenAI (issue #1424) — đã có tài liệu mẫu và readme cập nhật (PRs #1472, #1469) → khả năng sẽ được tích hợp chính thức. https://github.com/sipeed/picoclaw/issues/1424  
- Orchestration / Gateway: capability discovery, structured run events, stable identity, OpenClaw compatibility (issues #1474, #1475, #1476, #1462) — thể hiện nhu cầu làm PicoClaw phù hợp cho scale và control-plane integration. https://github.com/sipeed/picoclaw/issues/1474, https://github.com/sipeed/picoclaw/issues/1475, https://github.com/sipeed/picoclaw/issues/1476, https://github.com/sipeed/picoclaw/issues/1462  
- Kênh mới: Mattermost (PR #1288), Zalo (PR #1351), WeCom multimodal improvements (PR #1478) — xu hướng mở rộng kênh tích hợp khu vực/APAC. PR Mattermost: https://github.com/sipeed/picoclaw/pull/1288; PR Zalo: https://github.com/sipeed/picoclaw/pull/1351; PR WeCom: https://github.com/sipeed/picoclaw/pull/1478

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: cấu hình provider/cục bộ (Ollama) và hành vi không nhất quán khi mô hình không trả lời — người dùng cần hướng dẫn cấu hình mẫu và debug logs (#1161). https://github.com/sipeed/picoclaw/issues/1161  
- Vấn đề kênh thực tế: kết nối/độ tin cậy khi dùng mobile hotspot (Feishu/飞书 #1437) và trạng thái "typing" infinite trên Telegram đã từng xảy ra (#1212, #1323) — ảnh hưởng trải nghiệm người dùng. https://github.com/sipeed/picoclaw/issues/1437  
- Người dùng đánh giá cao sửa lỗi hạ tầng nhỏ (SVG MIME, go.mod) và các cải tiến container/orchestration (healthchecks) — nhưng mong muốn phản hồi nhanh hơn cho PR tích hợp kênh và provider.

8) Theo dõi tồn đọng (cần chú ý của người bảo trì)
- #1161 Ollama configuration (high activity, 17 comments) — cần hướng dẫn chính thức hoặc example config / debug steps: https://github.com/sipeed/picoclaw/issues/1161  
- Agent refactor meta/tài liệu: #1216 (meta), #1218 (AGENT/SOUL) — cần roadmap rõ hơn và hành động phân kỳ: https://github.com/sipeed/picoclaw/issues/1216, https://github.com/sipeed/picoclaw/issues/1218  
- Context management (compression/token budgeting) #1439 — làm rõ ranh giới và triggers để tránh token bloat: https://github.com/sipeed/picoclaw/issues/1439  
- Fallback transport errors #1419 — PR #1465 open (classification) cần review/merge để tránh abort fallback chain: https://github.com/sipeed/picoclaw/issues/1419, PR: https://github.com/sipeed/picoclaw/pull/1465  
- LINE webhook fix PR #1428 awaiting review/merge (DoS mitigation): https://github.com/sipeed/picoclaw/pull/1428  
- Mattermost channel PR #1288 và Zalo PR #1351 đang chờ review/feedback: https://github.com/sipeed/picoclaw/pull/1288, https://github.com/sipeed/picoclaw/pull/1351  
- Web UX: load recent session fix PR #1464 open — improve UX by not creating new chat each time: https://github.com/sipeed/picoclaw/pull/1464

Kết luận ngắn: dự án khỏe, hoạt động cộng đồng mạnh mẽ với nhiều PR/issue (tập trung vào tích hợp kênh, provider, và refactor agent). Ưu tiên hiện tại nên là (1) hoàn thiện các bản vá bảo mật/DoS (LINE/Matrix), (2) review các PR kênh mới (Mattermost, Zalo, WeCom), và (3) thống nhất lộ trình refactor agent / context để giảm chi phí kỹ thuật dài hạn.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

1) Tổng quan hôm nay
- Hoạt động cộng đồng cao: trong 24 giờ gần đây có 19 issue được cập nhật (16 mở/đang hoạt động, 3 đã đóng) và 32 PR cập nhật (21 mở, 11 merge/đóng). Dòng thay đổi tập trung vào: bảo mật cấu hình/credential, giảm chi phí token & hiệu năng gọi container, và bổ sung kênh/tính năng file/nhớ ngữ nghĩa.
- Không có phát hành phiên bản mới (không có release).
- Tâm điểm kỹ thuật hiện là: (1) quản lý credential an toàn khi chạy container; (2) giảm chi phí token/độ trễ cho đường dẫn container (Gemini Pro); (3) hoàn thiện các skill kênh (WhatsApp/Telegram/Discord) và hỗ trợ file.

2) Phát hành phiên bản
- Không có phiên bản mới trong đợt này.

3) Tiến độ dự án (PRs đã merge/đóng gần đây)
- Trong vòng 24h có 11 PR được merge/đóng (theo số liệu tóm tắt). Một số PR đã đóng/merge đáng chú ý:
  - #976 — feat: add GitHub MCP server to container agents (đã đóng) — thêm MCP server GitHub cho agents (token đọc từ .env). Link: https://github.com/qwibitai/nanoclaw/pull/976
  - #1013 — Add semantic memory skill with LanceDB + Gemini embeddings (đã đóng) — skill nhớ ngữ nghĩa. Link: https://github.com/qwibitai/nanoclaw/pull/1013
  - #1012 — feat: add Discord file-sending skill (đã đóng) — hướng dẫn gửi file trên Discord (Markdown-only). Link: https://github.com/qwibitai/nanoclaw/pull/1012
  - #1008, #1007, #1006, #1005, #1004 … (nhiều PR docs/fixes/feature deployment đã đóng). Ví dụ: Docker Compose / Dokploy support (#1004) — triển khai production docker-compose; suppress [SILENT] messages (#1005) — ngăn tin nhắn nội bộ lọt ra kênh. Links: https://github.com/qwibitai/nanoclaw/pull/1004, https://github.com/qwibitai/nanoclaw/pull/1005
- PRs đang cần review (đề nghị bảo trì ưu tiên phê duyệt): WhatsApp file PR #862, news-briefing #886, lancedb-memory #979 (cũng có bản đã đóng #1013), Telegram callback #1014, lớn hơn: WhatsApp/Gmail/vision/voice bundle #917. Links: https://github.com/qwibitai/nanoclaw/pull/862, https://github.com/qwibitai/nanoclaw/pull/886, https://github.com/qwibitai/nanoclaw/pull/979, https://github.com/qwibitai/nanoclaw/pull/1014, https://github.com/qwibitai/nanoclaw/pull/917

4) Chủ đề nóng trong cộng đồng (issues/PRs hoạt động nhất)
- Token CLAUDE_CODE_OAUTH_TOKEN hết hạn qua đêm — containers trả 401 mỗi sáng (Issue #730, High): người dùng báo token cli được đặt trong .env hết hạn sau vài giờ và dịch vụ background không tự refresh, gây downtime buổi sáng. Link: https://github.com/qwibitai/nanoclaw/issues/730
  - Nhu cầu: cơ chế refresh/renew token hoặc hướng dẫn rõ ràng chuyển sang credential proxy / API key.
- Bảo mật khi dùng container (Issue #865, High): phản ánh kiến trúc hiện tin tưởng container quá nhiều; đề xuất di chuyển scripts khỏi mức agent, tăng ràng buộc quyền. Link: https://github.com/qwibitai/nanoclaw/issues/865
- Hiệu năng đường dẫn Gemini Pro (Issue #989, High): độ trễ ~3.5 phút cho tác vụ công cụ đơn giản do prompt lớn (123K token input) và nhiều luồng gọi API; cần trim context + early-exit. Link: https://github.com/qwibitai/nanoclaw/issues/989
- Mở rộng credential proxy để che GROQ/OpenAI (Issue #878 + PR #999): nhu cầu rõ ràng giữ credential trên host, PR #999 đang mở để hỗ trợ nhiều host routing. Links: https://github.com/qwibitai/nanoclaw/issues/878, https://github.com/qwibitai/nanoclaw/pull/999
- Validation agent protocol — tool_use finish reason with zero tool calls (Issue #827, PR #1003): lỗi giao thức khiến agent chấp nhận FinishReason::ToolUse mà không có tool calls; PR #1003 sửa phần kiểm tra. Links: https://github.com/qwibitai/nanoclaw/issues/827, https://github.com/qwibitai/nanoclaw/pull/1003

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao
  - #730 CLAUDE_CODE_OAUTH_TOKEN expiring — containers 401 hàng ngày. (Open) Link: https://github.com/qwibitai/nanoclaw/issues/730
  - #865 Using containers alone doesn't make you more secure — kiến nghị hardening kiến trúc container trust. (Open) Link: https://github.com/qwibitai/nanoclaw/issues/865
  - #341 add-discord skill contains outdated Apple Container code — break Docker users (mở từ 2026-02-21). (Open) Link: https://github.com/qwibitai/nanoclaw/issues/341
  - #989 perf: reduce Gemini Pro container latency — input-token bloat & multi-request overhead. (Open) Link: https://github.com/qwibitai/nanoclaw/issues/989
- Trung bình
  - #827 FinishReason::ToolUse protocol violation — PR sửa: #1003 mở để validate. (Issue + PR) Links: https://github.com/qwibitai/nanoclaw/issues/827, https://github.com/qwibitai/nanoclaw/pull/1003
  - #830 scheduled task fires silently dropped when session is busy — task bị bỏ lỡ. (Open) Link: https://github.com/qwibitai/nanoclaw/issues/830
- Thấp / Đã đóng
  - #991, #993, #992 — ba issue đã đóng (usage.db INSERT, Podman SSH macOS, Matrix sluggish) — theo dõi hậu kiểm. Links: https://github.com/qwibitai/nanoclaw/issues/991, https://github.com/qwibitai/nanoclaw/issues/993, https://github.com/qwibitai/nanoclaw/issues/992
- Ghi chú PR sửa liên quan:
  - PR #1003 đang chờ review để khắc phục #827. Link: https://github.com/qwibitai/nanoclaw/pull/1003
  - PR #999 mở để mở rộng credential proxy (liên quan tới #878). Link: https://github.com/qwibitai/nanoclaw/pull/999
  - Một số PR fix nhỏ (unicode surrogate sanitization #1009, Apple container mounts #1010) đang chờ review. Links: https://github.com/qwibitai/nanoclaw/pull/1009, https://github.com/qwibitai/nanoclaw/pull/1010

6) Yêu cầu tính năng & tín hiệu lộ trình
- Token / credential management: mở rộng credential proxy để che Groq/OpenAI (Issue #878, PR #999). Link: https://github.com/qwibitai/nanoclaw/issues/878
- Giảm chi phí token & tổng chi phí gọi API: Inline Compaction (#984), CLAUDE.md auto-compression (#986), Response length control (#985), và usage.db schema mở rộng (#990) cho reporting. Links: https://github.com/qwibitai/nanoclaw/issues/984, https://github.com/qwibitai/nanoclaw/issues/986, https://github.com/qwibitai/nanoclaw/issues/985, https://github.com/qwibitai/nanoclaw/issues/990
- Kênh & file: WhatsApp two-way file (#862), Telegram inline callback (#1014), Discord file-sending (#1012) — rõ ràng cộng đồng muốn hỗ trợ file và UX kênh phong phú. Links: https://github.com/qwibitai/nanoclaw/pull/862, https://github.com/qwibitai/nanoclaw/pull/1014, https://github.com/qwibitai/nanoclaw/pull/1012
- Long-term memory: LanceDB + Gemini embeddings (skill đã merge / PRs tương tự) cho agents nhớ qua phiên. Link: https://github.com/qwibitai/nanoclaw/pull/1013

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Credential lifecycle (token hết hạn) gây downtime định kỳ — ảnh hưởng vận hành 24/7 (#730).
  - Hiệu năng container path (Gemini Pro) quá chậm cho tác vụ công cụ đơn giản — trải nghiệm bị phá vỡ (#989).
  - Việc chạy trên macOS/Apple Container có nhiều cạm bẫy (mounts / Podman SSH), làm mất nhóm người dùng Docker/Podman (#341, #993). Links: https://github.com/qwibitai/nanoclaw/issues/341, https://github.com/qwibitai/nanoclaw/issues/993
  - Người dùng khen ngợi tính năng mới (kênh, file, memory) nhưng yêu cầu review nhanh hơn để sử dụng. PR lớn (#917, #862) được quan tâm. Links: https://github.com/qwibitai/nanoclaw/pull/917, https://github.com/qwibitai/nanoclaw/pull/862
- Mức độ hài lòng:
  - Tính năng: tích cực; cộng đồng đóng góp mạnh (skill/kênh/memory).
  - Ổn định & vận hành: chưa hài lòng ở vài điểm (credential, latency, macOS integration).

8) Theo dõi tồn đọng (cần chú ý của maintainer)
- Issues ưu tiên cần hành động:
  - #730 — CLAUDE_CODE_OAUTH_TOKEN expires overnight (High). Link: https://github.com/qwibitai/nanoclaw/issues/730
  - #865 — architecture security concerns (High). Link: https://github.com/qwibitai/nanoclaw/issues/865
  - #989 — Gemini Pro latency (High). Link: https://github.com/qwibitai/nanoclaw/issues/989
  - #341 — add-discord skill Apple Container code (High, lâu). Link: https://github.com/qwibitai/nanoclaw/issues/341
  - #830 — scheduled task drop / needs deferral queue (Medium). Link: https://github.com/qwibitai/nanoclaw/issues/830
- PRs chờ review quan trọng (gây tác động lớn nếu merge):
  - #862 WhatsApp file support — https://github.com/qwibitai/nanoclaw/pull/862
  - #917 WhatsApp/Gmail/vision/voice bundle — https://github.com/qwibitai/nanoclaw/pull/917
  - #999 Extend credential proxy (OpenAI/Groq) — https://github.com/qwibitai/nanoclaw/pull/999
  - #1003 Protocol validation fix for tool_use — https://github.com/qwibitai/nanoclaw/pull/1003
  - #979 / #1013 LanceDB memory skill (one PR merged, #979 còn cần review/điều chỉnh) — https://github.com/qwibitai/nanoclaw/pull/979
  - #1014 Telegram callback keyboard — https://github.com/qwibitai/nanoclaw/pull/1014

Kết luận ngắn gọn
- Sức khỏe dự án: hoạt động cộng đồng mạnh mẽ, nhiều đóng góp tính năng; nhưng rủi ro vận hành (credential lifecycle, container path latency, macOS integration) đang ảnh hưởng trải nghiệm người dùng sản xuất. Ưu tiên ngắn hạn: sửa token refresh/credential proxy, giảm prompt/context bloat cho container calls, và review một số PR kênh/file/memory để chuyển từ thử nghiệm sang sản xuất.
- Hành động đề xuất cho maintainer: (1) ưu tiên xử lý #730 và #989; (2) review/merge PR mở liên quan credential proxy (#999) và protocol validation (#1003); (3) nhanh cleanup hướng dẫn/compat cho macOS/Podman (#341, #993).

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

1) Tổng quan hôm nay
- Hoạt động cao: trong 24 giờ qua có 50 Issues cập nhật (36 mở/hoạt động, 14 đóng) và 50 PRs cập nhật (25 mở, 25 đã merge/đóng). Đội đang tập trung mạnh vào bug-bash và ổn định kênh tích hợp (Telegram, Google) cùng với loạt PRs lớn về audit/CI.
- Trọng tâm chính: sửa lỗi tích hợp (OAuth, Telegram, Google Sheets), ổn định engine routine (cron/event) và hardening CI (no-panics, staging promotion).
- Tình trạng sức khỏe: hoạt động phát triển/triaging rất tích cực, nhiều issue P1 xuất hiện đồng thời — ưu tiên vẫn là ổn định sản phẩm trước khi có release mới.

2) Phát hành phiên bản
- Không có phiên bản mới hôm nay.

3) Tiến độ dự án (PRs đã merge/đóng / điểm nổi bật)
- Tổng kết: 25 PRs đã được merge/đóng trong 24h vừa qua; nhiều PRs lớn đang chờ review hoặc mở. Một số PR/merge/close đáng chú ý:
  - fix(wasm) followups: #1092 (closed) — cải thiện hiển thị mô tả và an toàn ép kiểu cho WASM tools (https://github.com/nearai/ironclaw/pull/1092)
  - repair staging-ci parsing: #1090 (closed) — sửa parsing workflow (https://github.com/nearai/ironclaw/pull/1090)
  - tool_info schema discovery: #1086 (closed) — thêm khám phá schema on-demand cho WASM tools (https://github.com/nearai/ironclaw/pull/1086)
  - extensions lifecycle + E2E: #1070 (closed) — sửa lifecycle cho extension và hợp nhất UX auth (https://github.com/nearai/ironclaw/pull/1070)
  - loạt promote staging -> main: #1065 (closed) (https://github.com/nearai/ironclaw/pull/1065)
- PRs lớn đang chờ review/merge và tác động rộng:
  - Comprehensive MCP audit fixes: #1094 (open) (https://github.com/nearai/ironclaw/pull/1094)
  - Enforce no panics in prod CI: #1087 (open) (https://github.com/nearai/ironclaw/pull/1087)
  - Programmatic Tool Calling (PTC) executor & E2E: #625 (open) (https://github.com/nearai/ironclaw/pull/625)
  - A2A agent bridge tool (builtin): #1048 (open) (https://github.com/nearai/ironclaw/pull/1048)

4) Chủ đề nóng trong cộng đồng (issues/PRs hoạt động nhất và phân tích nhu cầu)
- Vấn đề cài extension/artefact 404: #1060 (open) — người dùng báo lỗi 404 khi cài extension (https://github.com/nearai/ironclaw/issues/1060). Nhu cầu: đảm bảo release artifact và fallback installer.
- Bug-bash tập trung trên tích hợp Google / Telegram / routines:
  - Google OAuth URL broken from Telegram: #992 (open) (https://github.com/nearai/ironclaw/issues/992) — parameter tên sai (clientid vs client_id) gây lỗi OAuth.
  - Google Sheets permission / serialization: #999 (open) (https://github.com/nearai/ironclaw/issues/999), #993 (open) (https://github.com/nearai/ironclaw/issues/993), #1002 (open) (https://github.com/nearai/ironclaw/issues/1002) — gồm 403 PERMISSION_DENIED, values serialized thành string, sheet rỗng.
  - Telegram reliability & pairing: #991 (open) (https://github.com/nearai/ironclaw/issues/991), #1001 (open) (https://github.com/nearai/ironclaw/issues/1001), #994 (open) (https://github.com/nearai/ironclaw/issues/994) — token validation thất thường, pairing edge-cases, routine broadcast dùng chat_id="default".
- Tác động cộng đồng: nhiều report P1/P2 từ bug-bash cho thấy người dùng thực thi workflows thực tế (OAuth, bot pairing, routines -> kênh) bị ngắt quãng — cần sửa nhanh theo thứ tự độ ảnh hưởng.

5) Lỗi & Ổn định (xếp theo mức độ nghiêm trọng)
- CRITICAL / High
  - N+1 query trong event trigger loop (routine_engine) — #823 (open) (CRITICAL) (https://github.com/nearai/ironclaw/issues/823). Tác động: hiệu năng khi có nhiều routine/event.
  - Non-transactional multi-step context updates (race) — #813 (open) (CRITICAL) (https://github.com/nearai/ironclaw/issues/813). Tác động: data-race / corruption khi setup metadata/tokens.
  - Webhook auth bypass when secret not configured — #1033 (closed) (CRITICAL) (https://github.com/nearai/ironclaw/issues/1033). Ghi chú: issue đã bị triage và có PR/patch liên quan trong các batch fixes (xem PRs #1083 và các PR sửa liên quan).
- P1 (bug_bash)
  - Tool approval modal requires page reload — #996 (closed) (https://github.com/nearai/ironclaw/issues/996)
  - Google OAuth URL broken from Telegram — #992 (open) (https://github.com/nearai/ironclaw/issues/992)
  - Routines created in web invisible from Telegram — #995 (open) (https://github.com/nearai/ironclaw/issues/995)
  - Google Sheets 403 after OAuth — #999 (open) (https://github.com/nearai/ironclaw/issues/999)
  - google-sheets values passed as JSON string — #993 (open) (https://github.com/nearai/ironclaw/issues/993)
  - Telegram bot token validation intermittently 404 — #991 (open) (https://github.com/nearai/ironclaw/issues/991)
  - Routine broadcast to Telegram uses chat_id="default" — #994 (open) (https://github.com/nearai/ironclaw/issues/994)
- Ghi chú sửa: nhiều lỗi được đóng/sửa trong các PR batch (#1070, #1086, #1083, #1092, #1090). Tuy nhiên một số P1 từ bug-bash vẫn open và cần fix nhanh (OAuth, Sheets, Telegram).

6) Yêu cầu tính năng & tín hiệu lộ trình
- Programmatic Tool Calling (PTC) — #625 (open) (https://github.com/nearai/ironclaw/pull/625): rõ ràng có nhu cầu cho tool-to-tool execution không cần round-trip LLM; đây là tính năng nền tảng có khả năng xuất hiện trong phiên bản tiếp theo nếu ổn định.
- A2A Agent bridge (Agent-to-Agent) — #1048 (open) (https://github.com/nearai/ironclaw/pull/1048): nhu cầu kết nối agents; có khả năng được đưa vào như builtin tool.
- CLI improvements (hooks, models) — #1023, #1043 (open) (https://github.com/nearai/ironclaw/pull/1023, https://github.com/nearai/ironclaw/pull/1043): tín hiệu là cải thiện quản trị và UX devops.
- Installer portability (musl targets) — #1013 (open) (https://github.com/nearai/ironclaw/pull/1013): nhu cầu mạnh cho fallback static binaries để hỗ trợ môi trường Linux cũ.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Tích hợp bên thứ ba không ổn định (Google OAuth/Sheets, Telegram pairing/token) — ảnh hưởng trực tiếp đến workflow automation và routines.
  - Trải nghiệm quản lý extension / tool: cài đặt thất bại do missing artefacts (#1060) và approval modal không xuất hiện real-time (#996).
  - Routines: đồng bộ giữa giao diện web và kênh Telegram có lỗi (routines “tàng hình” trên Telegram, broadcast thất bại).
- Mức độ hài lòng: hiện có sự bực bội rõ ràng từ người dùng chuyên dụng (bug-bash reports). Nhiều vấn đề là blockers cho người dùng triển khai thực tế.

8) Theo dõi tồn đọng & khuyến nghị cho bảo trì
- Issues cần ưu tiên chú ý (open, tác động cao):
  - #823 N+1 routine event loop (https://github.com/nearai/ironclaw/issues/823)
  - #813 Non-transactional updates (https://github.com/nearai/ironclaw/issues/813)
  - #992 Google OAuth URL broken from Telegram (https://github.com/nearai/ironclaw/issues/992)
  - #993 / #999 / #1002 Google Sheets failures (https://github.com/nearai/ironclaw/issues/993, https://github.com/nearai/ironclaw/issues/999, https://github.com/nearai/ironclaw/issues/1002)
  - #991 / #1001 / #994 Telegram pairing / broadcast issues (https://github.com/nearai/ironclaw/issues/991, https://github.com/nearai/ironclaw/issues/1001, https://github.com/nearai/ironclaw/issues/994)
  - #1060 Installer extension 404 (https://github.com/nearai/ironclaw/issues/1060)
  - #1076 Routine cache invalidation (https://github.com/nearai/ironclaw/issues/1076)
- PRs lớn cần review / phối hợp:
  - #1094 MCP audit fixes (https://github.com/nearai/ironclaw/pull/1094)
  - #1087 no-panics CI (https://github.com/nearai/ironclaw/pull/1087)
  - #625 PTC executor (https://github.com/nearai/ironclaw/pull/625)
  - #1048 A2A bridge (https://github.com/nearai/ironclaw/pull/1048)
- Khuyến nghị hành động ngắn hạn:
  1. Ưu tiên sửa nhanh các lỗi OAuth/Telegram/Sheets (P1) vì chặn luồng người dùng thực tế.
  2. Khóa và review các PR audit/CI (#1094, #1087) để tránh regressions trong production.
  3. Chạy bộ E2E (Telegram + Chrome MCP + Claude Code test) như yêu cầu #1044 để tái tạo dòng lỗi bug-bash.
  4. Giao nhiệm vụ cho một nhóm nhỏ xử lý những CRITICAL performance/transaction bugs (#823, #813) trước khi mở rộng tính năng mới.

Tổng kết ngắn: hoạt động cộng đồng tích cực, nhiều chỉnh sửa quan trọng đã merged, nhưng còn tập trung cấp bách vào ổn định tích hợp (OAuth/Telegram/Sheets) và một vài lỗi CRITICAL liên quan transaction/performace — xử lý những điểm này sẽ cải thiện đáng kể trải nghiệm triển khai thực tế.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

Bản tin dự án LobsterAI — 2026-03-13

1) Tổng quan hôm nay
- Dự án đang hoạt động tích cực: trong 24 giờ qua có 6 issue mới/hoạt động và 10 PR được cập nhật (9 PR đã đóng/merge, 1 còn mở).  
- Một phiên bản nhỏ v0.2.4 vừa phát hành tập trung vào vá lỗi kết nối IM và tình trạng ứng dụng khởi động treo.  
- Hoạt động kỹ thuật tập trung vào ổn định (gateway / startup / code signing) và cải thiện trải nghiệm người dùng (link protocol, cập nhật nhà cung cấp).  
- Sức khỏe chung: cao về tốc độ đóng PR và phát hành nhanh, còn một số vấn đề người dùng cần điều tra tiếp.

2) Phát hành phiên bản
- v0.2.4 — thay đổi chính:
  - fix: 修复 IM 渠道连接性测试引起的 bug (sửa bug trong kiểm tra kết nối kênh IM) — PR #393 (closed).  
  - fix：修复应用启动时一直处于加载状态的问题 (sửa lỗi ứng dụng luôn ở trạng thái loading lúc khởi động) — PR #396 (closed).  
  - Không có ghi chú về breaking changes hay yêu cầu di chuyển cấu hình.  
  - Full changelog: https://github.com/netease-youdao/LobsterAI/compare/v0.2.3

3) Tiến độ dự án (PRs đã merge/đóng hôm nay)
- PR nổi bật đã đóng/merge trong 24h:
  - #395 — openclaw gateway 启动速度优化 (giảm thời gian khởi động gateway trên Windows từ >180s xuống ~85s/15s) — cải thiện hiệu năng khởi động.
    https://github.com/netease-youdao/LobsterAI/pull/395
  - #396 — fix: sửa lỗi ứng dụng khởi động treo (đã đưa vào v0.2.4).
    https://github.com/netease-youdao/LobsterAI/pull/396
  - #393 — fix: sửa bug trong kiểm tra kết nối IM (đã đưa vào v0.2.4).
    https://github.com/netease-youdao/LobsterAI/pull/393
  - #380 — feat: hỗ trợ custom URI protocols trong markdown links (mở rộng khả năng mở ứng dụng ngoài).
    https://github.com/netease-youdao/LobsterAI/pull/380
  - #387 — fix: resolve macOS code signing failures (ổn định pipeline build macOS).
    https://github.com/netease-youdao/LobsterAI/pull/387
  - Một số PR liên quan đến "Feature/openclaw 0.2.3" (#392, #394, #397) đã được đóng/điều phối; thể hiện nỗ lực chuẩn bị release/ghép OpenClaw.
    https://github.com/netease-youdao/LobsterAI/pull/392
    https://github.com/netease-youdao/LobsterAI/pull/394
    https://github.com/netease-youdao/LobsterAI/pull/397
- PR đang mở cần review:
  - #388 — update MiniMax provider default base URL and model list (cập nhật base URL cho provider MiniMax) — chú ý cho tính khả dụng quốc tế.
    https://github.com/netease-youdao/LobsterAI/pull/388

4) Chủ đề nóng trong cộng đồng
- IM channel / kết nối gateway & startup:
  - Issue #366: vấn đề gateway status và cấu hình PATH cho OpenClaw gateway — liên quan trực tiếp tới trải nghiệm cục bộ khi dùng gateway. https://github.com/netease-youdao/LobsterAI/issues/366
- Token overflow / context length:
  - Issue #370: lỗi "超token数" khi người dùng nhập “你好” nhưng nhận về API Error liên quan tới input/output token size; cần xác định nguyên nhân (cấu hình model/params hay xử lý tiền xử lý). https://github.com/netease-youdao/LobsterAI/issues/370
- Apple Silicon cập nhật:
  - Issue #390: trên ARM64 v0.2.2, chức năng "Check for updates" không nhận ra v0.2.3 — UX/auto-update trên macOS ARM bị khiếm khuyết. https://github.com/netease-youdao/LobsterAI/issues/390
- Tính năng UX nhỏ được yêu cầu:
  - Issue #391: đề xuất nút "tối ưu prompt" để hỗ trợ người mới dùng. https://github.com/netease-youdao/LobsterAI/issues/391

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao
  - Ứng dụng treo khi khởi động — đã có PR sửa (#396) và được release trong v0.2.4. https://github.com/netease-youdao/LobsterAI/pull/396
  - Gateway service không load / PATH không đặt đúng — issue #366 đang mở, ảnh hưởng đến người dùng cần gateway. https://github.com/netease-youdao/LobsterAI/issues/366
- Trung bình
  - IM channel connectivity test gây lỗi — đã có PR sửa (#393) và có trong v0.2.4. https://github.com/netease-youdao/LobsterAI/pull/393
  - macOS code signing failures — đã fix trong PR #387, giúp ổn định bản build macOS. https://github.com/netease-youdao/LobsterAI/pull/387
- Thấp / cần điều tra thêm
  - Token/context error (Issue #370) — cần log chi tiết và replica case; hiện chưa có PR sửa. https://github.com/netease-youdao/LobsterAI/issues/370
  - GLM 4.5（阿里云百炼）调用报错 (Issue #399) — báo cáo mới, cần test lại tích hợp provider. https://github.com/netease-youdao/LobsterAI/issues/399

6) Yêu cầu tính năng & tín hiệu lộ trình
- Yêu cầu người dùng rõ rệt:
  - Nút "tối ưu prompt" (Issue #391) để hỗ trợ người mới và cải thiện chất lượng phản hồi. https://github.com/netease-youdao/LobsterAI/issues/391
  - Lệnh/chiếc nút để xóa/đặt lại memory trong bot của plugin 飞书 (Issue #398). https://github.com/netease-youdao/LobsterAI/issues/398
  - Cải thiện hỗ trợ nhà cung cấp (provider) và URL mặc định (PR #388) — cho thấy nhu cầu đa khu vực / multi-provider. https://github.com/netease-youdao/LobsterAI/pull/388
- Dự đoán cho phiên bản tiếp theo:
  - Tiếp tục cải tiến openclaw gateway (startup speed + config robustness). PR #395 đã cho thấy hướng này. https://github.com/netease-youdao/LobsterAI/pull/395
  - UX: thêm các thao tác quản lý trò chuyện (reset/clear) cho plugin chat và công cụ tối ưu prompt.
  - Cải thiện auto-update trên Apple Silicon.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Khởi động chậm/treo và gateway không khởi động khiến trải nghiệm cục bộ kém — đã được ưu tiên sửa. https://github.com/netease-youdao/LobsterAI/pull/395 https://github.com/netease-youdao/LobsterAI/pull/396
  - Vấn đề tích hợp model/provider (token phàn nàn, lỗi gọi GLM 4.5) gây gián đoạn workflow chuyên sâu. https://github.com/netease-youdao/LobsterAI/issues/370 https://github.com/netease-youdao/LobsterAI/issues/399
  - Thiếu các lệnh reset/clear trong plugin chat và thiếu công cụ hỗ trợ prompt cho người mới. https://github.com/netease-youdao/LobsterAI/issues/398 https://github.com/netease-youdao/LobsterAI/issues/391
- Mức độ hài lòng: người dùng đánh giá cao tốc độ phản hồi của team (nhiều PR/bugfix nhanh), nhưng vẫn còn bất mãn với một số trải nghiệm nền tảng (gateway, update trên ARM).

8) Theo dõi tồn đọng (cần ưu tiên / gọi reviewer)
- Issues cần thêm thông tin hoặc hành động từ maintainer:
  - #366 — gateway status / PATH not set (cần chẩn đoán/service config). https://github.com/netease-youdao/LobsterAI/issues/366
  - #370 — token/context overflow error (cần logs, steps to reproduce, config của model). https://github.com/netease-youdao/LobsterAI/issues/370
  - #399 — GLM 4.5 调用报错 (provider integration test). https://github.com/netease-youdao/LobsterAI/issues/399
  - #390 — Apple Silicon update check không nhận bản mới (cần reproduce trên ARM64). https://github.com/netease-youdao/LobsterAI/issues/390
  - #398 — Feishu plugin: thêm command clear memory (UX request). https://github.com/netease-youdao/LobsterAI/issues/398
- PR cần review / quyết định:
  - #388 — update MiniMax provider default base URL and model list (review/merge để cải thiện tính khả dụng quốc tế). https://github.com/netease-youdao/LobsterAI/pull/388

Kết luận ngắn: phiên bản v0.2.4 đã vá hai lỗi người dùng lớn (IM connectivity và startup hang). Nhóm phát triển đang dồn lực vào ổn định gateway và trải nghiệm nền tảng (khởi động, code signing, provider configs). Ưu tiên tiếp theo là điều tra các lỗi liên quan token/context và sự cố tích hợp nhà cung cấp (GLM 4.5), cùng hoàn thiện UX nhỏ như reset memory và hỗ trợ tối ưu prompt để giảm rào cản cho người mới.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

1) Tổng quan hôm nay
- Hoạt động phát triển cao: 11 PR cập nhật trong 24 giờ (9 PR đã đóng/merge, 2 PR còn mở) và 4 issue được cập nhật (2 mở/2 đã đóng).  
- Phiên bản mới v0.0.12 được phát hành, tập trung vào lưu trữ lịch sử hội thoại của agent và đơn giản hoá luồng sự kiện SSE.  
- Nhiều sửa lỗi cài đặt và tương thích CLI đã được xử lý nhanh (ví dụ: lỗi thiếu script setup-wizard và lỗi import @clack/prompts).  
- Tình trạng chung: tích cực, với ưu tiên hiện tại là ổn định hoá trải nghiệm lần chạy đầu và phục hồi kênh Telegram.

2) Phát hành phiên bản
- v0.0.12 (release): https://github.com/TinyAGI/tinyclaw/releases
  - Tính năng chính: thêm bảng SQLite agent_messages để persist toàn bộ lịch sử chat của agent; giới thiệu event SSE mới agent_message (một event cho mỗi phản hồi của agent) — điều này thay thế nhu cầu lắng nghe toàn bộ lifecycle chain_step và đơn giản hóa luồng chat dành cho single-agent. (PR #202: https://github.com/TinyAGI/tinyclaw/pull/202)
  - Lưu ý di chuyển: nâng cấp có thể yêu cầu migration/database seed để tạo bảng agent_messages; khách hàng sử dụng các listener theo lifecycle cũ cần cập nhật sang event agent_message.
- v0.0.11: sửa lỗi import bị phá vỡ từ các shell script cũ của setup-wizard (ghi chú release).

3) Tiến độ dự án (PR đã merge/đóng hôm nay)
Các PR chính đã đóng/merge (9):
- #202 feat(api): add agent message persistence and simplified event stream — agent_messages + agent_message SSE (https://github.com/TinyAGI/tinyclaw/pull/202)
- #206 fix(cli): convert to ESM to support @clack/prompts v1.x — chuyển CLI sang ESM (https://github.com/TinyAGI/tinyclaw/pull/206)
- #204 feat(settings): add interactive setup wizard for initial configuration — wizard lần chạy đầu (https://github.com/TinyAGI/tinyclaw/pull/204)
- #201 feat(office): add organization chart visualization page — org chart UI (https://github.com/TinyAGI/tinyclaw/pull/201)
- #200 fix(telegram): prevent polling from stalling after network reconnect — timeout + watchdog cải thiện polling (https://github.com/TinyAGI/tinyclaw/pull/200)
- #199 feat: add chat rooms and projects to tinyoffice — chat rooms & projects (https://github.com/TinyAGI/tinyclaw/pull/199)
- #203 feat: add projects and chat rooms management — quản lý projects & rooms (https://github.com/TinyAGI/tinyclaw/pull/203)
- #198 fix: remove stale setup-wizard.sh references — sửa lỗi cài đặt lần đầu (https://github.com/TinyAGI/tinyclaw/pull/198)
- #195 fix: convert send_message skill from TS to plain Node.js — sửa lỗi ts-node bằng chuyển sang JS thuần (https://github.com/TinyAGI/tinyclaw/pull/195)

Tổng kết: hôm nay tập trung vào hai hướng chính — (1) cải thiện trải nghiệm lần chạy đầu và ổn định cài đặt, (2) UX/office features (chat rooms, projects, org-chart) và luồng chat/streaming cho agent.

4) Chủ đề nóng trong cộng đồng
- Telegram Bot Auto-Reconnect Failure (Issue #126, mở): https://github.com/TinyAGI/tinyclaw/issues/126 — nhiều tương tác (6 bình luận). Người dùng báo bot Telegram không tự reconnect sau khi kết nối bị rớt; liên quan trực tiếp tới PR #200 (đã đóng) nhưng vấn đề vẫn mở cho trường hợp tái kết nối bền vững. Đây là nhu cầu về độ sẵn sàng kết nối trên môi trường mạng biến động.
- TinyOffice first-run onboarding (Issue #193, mở): https://github.com/TinyAGI/tinyclaw/issues/193 — đề xuất bổ sung onboarding web lần chạy đầu để giảm việc phụ thuộc CLI/config thủ công. Liên quan chặt tới PR #204 (đã merge) nhưng issue vẫn nêu các yêu cầu UX chi tiết hơn.
- Thiếu setup-wizard.sh trong release 0.0.10 (Issue #197, đã đóng): https://github.com/TinyAGI/tinyclaw/issues/197 — gây lỗi cài đặt lần đầu; đã được fix nhanh bằng PR #198.

5) Lỗi & Ổn định (xếp theo mức độ)
- Critical → đã đóng: missing setup-wizard.sh causing install failure (Issue #197, closed) — PR #198 fixed (https://github.com/TinyAGI/tinyclaw/issues/197; https://github.com/TinyAGI/tinyclaw/pull/198).
- High → đã đóng: import error with @clack/prompts breaking pairing CLI (Issue #205) — fixed by converting CLI to ESM in PR #206 (https://github.com/TinyAGI/tinyclaw/issues/205; https://github.com/TinyAGI/tinyclaw/pull/206).
- Medium → mở: Telegram Bot Auto-Reconnect Failure (Issue #126) — liên quan tới polling/stall; một PR (#200) đã đóng với timeout/watchdog cải thiện, nhưng issue vẫn mở để theo dõi trường hợp tái kết nối không ổn định (https://github.com/TinyAGI/tinyclaw/issues/126; https://github.com/TinyAGI/tinyclaw/pull/200).
Ghi chú: nhiều lỗi cài đặt và tương thích được xử lý nhanh trong ngày, cho thấy tốc độ phản hồi tốt cho các sự cố ảnh hưởng trải nghiệm người dùng.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Onboarding web lần đầu cho TinyOffice (Issue #193): rõ ràng có nhu cầu trải nghiệm GUI-friendly cho người mới (https://github.com/TinyAGI/tinyclaw/issues/193). PR #204 (setup wizard) là bước đầu; mong đợi mở rộng tích hợp wizard vào TinyOffice.
- Streaming và tiến trình agent theo thời gian thực: PR #196 (mở) đề xuất stream progress via onEvent + agent_progress SSE — đây là xu hướng được đẩy mạnh để cải thiện feedback loop cho người dùng (https://github.com/TinyAGI/tinyclaw/pull/196).
- Rebrand lớn (PR #191 mở): hoàn toàn đổi tên TinyClaw → TinyAGI (https://github.com/TinyAGI/tinyclaw/pull/191). Đây là thay đổi phạm vi rộng, nếu được chấp nhận sẽ ảnh hưởng đến packaging/CI/docs — cần quyết định sớm.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Trải nghiệm "lần chạy đầu" (first-run) kém — nhiều người gặp lỗi cài đặt hoặc phải dùng CLI phức tạp (Issue #197, #193). (links: https://github.com/TinyAGI/tinyclaw/issues/197, https://github.com/TinyAGI/tinyclaw/issues/193)
  - Tính ổn định kết nối kênh (Telegram) khi mạng thay đổi — ảnh hưởng hoạt động bot trên môi trường thực tế (Issue #126).
  - Tương thích CLI và dependency (ví dụ @clack/prompts) gây lỗi runtime; việc chuyển sang ESM đã giải quyết vấn đề này (PR #206).
- Mức độ hài lòng: người dùng bức xúc về hỏng trải nghiệm cài đặt ban đầu nhưng phản ứng tích cực khi fixes được merge nhanh.

8) Theo dõi tồn đọng (cần chú ý của maintainer)
- Issue #126 — Telegram Bot Auto-Reconnect Failure (mở, 6 bình luận): cần xác nhận liệu PR #200 đã triệt để giải quyết mọi trường hợp reconnect, thêm test/monitoring cho long-poll stability. https://github.com/TinyAGI/tinyclaw/issues/126
- PR #191 — rebrand to tinyagi (mở, phạm vi rộng): cần roadmap rõ ràng, kiểm thử CI và thông báo breaking changes nếu merge. https://github.com/TinyAGI/tinyclaw/pull/191
- PR #196 — stream agent execution progress (mở): review/merge nếu muốn đẩy tính năng streaming tiến độ thời gian thực lên roadmap. https://github.com/TinyAGI/tinyclaw/pull/196
- Issue #193 — TinyOffice first-run onboarding (mở): theo dõi để đảm bảo PR #204 (setup wizard) được tích hợp mượt mà vào TinyOffice UI nếu cộng đồng mong muốn. https://github.com/TinyAGI/tinyclaw/issues/193

Kết luận ngắn: hôm nay là một ngày bận rộn với nhiều fix quan trọng liên quan tới cài đặt và tương thích, đồng thời có tiến triển lớn về lưu trữ lịch sử hội thoại và UX TinyOffice. Ưu tiên tiếp theo đề xuất: (1) đóng Issue #126 hoặc bổ sung test/telemetry cho Telegram reconnect, (2) quyết định chiến lược rebrand (#191) trước khi merge rộng, (3) hoàn thiện streaming progress (#196) và tích hợp onboarding vào TinyOffice.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

Bản tin dự án Moltis — 2026-03-13

1) Tổng quan hôm nay
- Dự án đang ở trạng thái phát triển tích cực: 11 issue được cập nhật trong 24 giờ qua (4 mở/hoạt động, 7 đã đóng) và 16 pull request được cập nhật (10 mở, 6 đã merge/đóng).  
- Không có phát hành mới hôm nay. Hoạt động tập trung nhiều vào ổn định sandbox, hỗ trợ local-LLM (GGUF/Vulkan), và cải thiện trải nghiệm cài đặt/phát hành nền tảng (Docker/macOS).  
- Tốc độ phản hồi tương đối nhanh cho các lỗi cốt lõi (vài lỗi lớn đã được đóng kèm PR sửa), nhưng vẫn còn một số issue mở liên quan tới sandbox/Docker và xử lý web non-UTF8 cần chú ý.

2) Phát hành phiên bản
- Không có phiên bản mới hôm nay — phần này bỏ qua.

3) Tiến độ dự án (PR đã merge/đóng hôm nay)
Các PR đã được đóng/merge trong vòng 24 giờ gần nhất (tóm tắt tác dụng chính):
- #404 fix(telegram): strip HTML tags from plain fallback — làm sạch văn bản khi fallback gửi tin nhắn Telegram (đã đóng). Link: https://github.com/moltis-org/moltis/pull/404
- #405 fix(tools): harden apple container bootstrap execs — sửa lỗi Apple Container chdir (/home/sandbox) (đã đóng). Link: https://github.com/moltis-org/moltis/pull/405
- #401 feat(docker): support generic provider env bootstrap — hỗ trợ biến môi trường chung cho Docker (đã đóng). Link: https://github.com/moltis-org/moltis/pull/401
- #398 fix(web): address installation feedback from user testing — nhiều cải tiến UX/installer (đã đóng). Link: https://github.com/moltis-org/moltis/pull/398
- #416 feat: support secret remote MCP URLs and headers — hỗ trợ URL MCP bí mật và header (đã đóng). Link: https://github.com/moltis-org/moltis/pull/416
- #400 fix(config): support legacy memory embedding keys — tương thích ngược với các khóa embedding cũ (đã đóng). Link: https://github.com/moltis-org/moltis/pull/400

4) Chủ đề nóng trong cộng đồng
- Issue #176 [Feature] Add datetime to system prompt context — nhiều thảo luận (13 bình luận). Người dùng muốn đưa ngày/giờ vào ngữ cảnh system prompt để cải thiện hành vi theo thời gian. Link: https://github.com/moltis-org/moltis/issues/176
- PR #417 fix(local-llm): restore custom GGUF setup without restart — ảnh hưởng đến thiết lập local-LLM/GGUF, quan trọng cho người dùng chạy mô hình cục bộ. Link: https://github.com/moltis-org/moltis/pull/417
- PR #408 feat(local-llm): add opt-in Vulkan GGUF support — tín hiệu rõ ràng cho nhu cầu chạy GGUF trên Vulkan/GPU di động/embedded. Link: https://github.com/moltis-org/moltis/pull/408
- Issue #420 web_fetch panics on legacy/non-UTF8 pages — báo lỗi gây panic; tác động đến công cụ web_fetch. Link: https://github.com/moltis-org/moltis/issues/420

5) Lỗi & Ổn định (xếp hạng theo mức độ ảnh hưởng)
- Cao: web_fetch panics on legacy/non-UTF8 pages (#420) — có thể crash dịch vụ khi gặp trang không UTF-8; cần PR sửa để tránh panic. Link: https://github.com/moltis-org/moltis/issues/420
- Cao/Trung bình: docker moltis + docker sandbox issues (#423) — vấn đề sandbox khi chạy trong Docker ảnh hưởng trải nghiệm cài đặt phổ biến. Link: https://github.com/moltis-org/moltis/issues/423
- Trung bình: Trusted-network proxy shuts down immediately (đã đóng) — đã có issue #367 và đã được đóng; cần xác nhận bản sửa trên các cấu hình `trusted` (đã đóng). Link: https://github.com/moltis-org/moltis/issues/367
- Thấp/đã xử lý: Telegram delivery falls back to plain text, showing raw HTML tags (#214) — đã được giải quyết qua PR #404. Link issue: https://github.com/moltis-org/moltis/issues/214 ; PR: https://github.com/moltis-org/moltis/pull/404
- Ghi chú: nhiều lỗi liên quan sandbox/containers đã được khắc phục bởi các PR (#405, #401), nhưng vẫn còn các báo cáo mới về Docker/sandbox cần theo dõi.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Thực tế người dùng đề nghị: thêm datetime vào context system prompt (#176) — có khả năng được đưa vào bản phát hành tiếp theo vì ích lợi chung rõ ràng. Link: https://github.com/moltis-org/moltis/issues/176
- Hỗ trợ prebuilt Android/Termux (#424) — yêu cầu mới cho môi trường di động/Termux, đang mở. Link: https://github.com/moltis-org/moltis/issues/424
- Hướng tới local-LLM tốt hơn: restore custom GGUF (#417) và opt-in Vulkan GGUF (#408) cho thấy roadmap đang ưu tiên cải thiện trải nghiệm mô hình cục bộ. PRs: https://github.com/moltis-org/moltis/pull/417 và https://github.com/moltis-org/moltis/pull/408
- Symphony/workflow: PR #421 giới thiệu nền tảng workflow daemon — dấu hiệu phát triển tính năng orchestration/workflow. Link: https://github.com/moltis-org/moltis/pull/421

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: sandbox/Docker và tương thích môi trường (Apple Container, Docker sandbox, trusted-network proxy) — người dùng gặp lỗi khởi tạo container, shutdown proxy và vấn đề cấu hình. Điểm cộng: các lỗi cốt lõi đang được xử lý nhanh bằng PR.  
- Trải nghiệm cài đặt/phát hành: người dùng đánh giá cao cải tiến installer/Tailscale và Docker env handling (PR #398, #401).  
- Tương tác bot/không gian xuất: Telegram HTML fallback từng gây hiển thị thô, đã sửa; tuy nhiên vẫn có lo ngại về an toàn/định dạng khi LLM sinh HTML không hợp lệ.

8) Theo dõi tồn đọng (cần chú ý của người bảo trì)
- Issue/PR quan trọng đang chờ review / cần hành động:
  - #176 Add datetime to system prompt context (mở, 13 bình luận) — cần quyết định thiết kế và triển khai. Link: https://github.com/moltis-org/moltis/issues/176
  - #417 fix(local-llm) restore custom GGUF setup without restart (mở) — tác động lớn tới người dùng local-LLM; cần review/merge. Link: https://github.com/moltis-org/moltis/pull/417
  - #408 feat(local-llm) add opt-in Vulkan GGUF support (mở) — build/CI/doc implications; cần maintainer sign-off. Link: https://github.com/moltis-org/moltis/pull/408
  - #413 feat(skills) support safe agent-written sidecar files (mở) — bảo mật/giới hạn path cần thảo luận kỹ. Link: https://github.com/moltis-org/moltis/pull/413
  - #421 feat(symphony) add workflow daemon foundation (mở) — lớn về scope; cần roadmap/ghi chú tích hợp. Link: https://github.com/moltis-org/moltis/pull/421
  - #420 web_fetch panics on legacy/non-UTF8 pages (mở, có khả năng gây crash) — ưu tiên sửa. Link: https://github.com/moltis-org/moltis/issues/420
  - #423 docker moltis + docker sandbox issues (mở) — nhiều người dùng Docker bị ảnh hưởng. Link: https://github.com/moltis-org/moltis/issues/423
  - #422 fix(macos): configure release signing and notarization (mở) — quan trọng cho phát hành macOS có chữ ký. Link: https://github.com/moltis-org/moltis/pull/422

Kết luận nhanh
- Sức khỏe dự án: năng động và hướng tới ổn định/triển khai thực tế — nhiều lỗi cốt lõi đã được sửa nhanh, đồng thời có hoạt động feature lớn (local-LLM, Vulkan, workflow).  
- Nên ưu tiên: (1) xử lý panic/non-UTF8 (ổn định runtime), (2) review PRs liên quan local-LLM và Vulkan, (3) theo dõi Docker/sandbox issues và hoàn thiện release signing để giảm ma sát cài đặt cho người dùng.

— Hết —

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

Bản tin dự án CoPaw — 2026-03-13

1) Tổng quan hôm nay
- Hoạt động cộng đồng rất cao: 24h qua có ~50 issue/PR cập nhật (39 issue mở/hoạt động, 30 PR mở) và một phát hành mới (v0.0.7).  
- Nhiều báo cáo về sự cố nghiêm trọng (crash/400 errors, cấu hình model/vision, mất cấu hình trong container), đồng thời có nhiều PR sửa giao diện và cơ chế xử lý (cron/timezone, workspace refresh, skill dedupe).  
- Tốc độ đóng/mrg PR vẫn đang chậm so với lượng issue — nhiều PR quan trọng đang chờ review (bao gồm một PR thay đổi kiến trúc lớn).

2) Phát hành phiên bản
- v0.0.7 (mới) — tính năng nổi bật:
  - Thêm lớp bảo mật trước khi gọi tool: "Tool Guard" quét tham số công cụ để phát hiện mẫu rủi ro (ví dụ: lệnh shell chứa rm, mv). Các cuộc gọi rủi ro bị chặn cho đến khi người dùng phê duyệt bằng lệnh /approve; những tool bị từ chối luôn bị chặn. (Release notes: v0.0.7)
  - Giao diện cài đặt Security mới để quản lý hành vi này.  
  Lưu ý: mô tả phát hành bị cắt trong dữ liệu nguồn; người dùng cần kiểm tra chi tiết trên tag/release chính thức trước khi triển khai. Link: https://github.com/agentscope-ai/CoPaw/releases/tag/v0.0.7

3) Tiến độ dự án (PRs đã merge/đóng hôm nay và các thay đổi chính)
- PRs đã đóng gần đây:
  - #1392 test(channels): add unit tests for Feishu session resolution (CLOSED) — test coverage cho channel Feishu. https://github.com/agentscope-ai/CoPaw/pull/1392
  - #1389 feat(channels): add Discord streaming responses and typing indicator (CLOSED) — Discord streaming/typing hỗ trợ (opt-in). https://github.com/agentscope-ai/CoPaw/pull/1389
  - #1235 feat(skills): show metadata description in unified card layout (CLOSED) — hiển thị mô tả skill trong giao diện. https://github.com/agentscope-ai/CoPaw/pull/1235
  - #1262 fix(crons): preserve cron request context (CLOSED) — sửa lỗi cron làm mất context request. https://github.com/agentscope-ai/CoPaw/pull/1262
- PRs đang mở/tiến triển quan trọng:
  - #1375 Multi-agent/multi-workspace architecture (WIP, Breaking) — thay đổi kiến trúc lớn, cần feedback. https://github.com/agentscope-ai/CoPaw/pull/1375
  - #1321 feat(crons): enable specify timezone — cho phép chỉ định timezone cho cron (liên quan báo cáo timezone). https://github.com/agentscope-ai/CoPaw/pull/1321
  - #1402 fix: workspace refresh + skill area style — sửa lỗi refresh file list (liên quan issue #1374). https://github.com/agentscope-ai/CoPaw/pull/1402
  - #1396 fix(skills): dedupe duplicated built-in skill listings — khắc phục hiển thị skill trùng lặp (liên quan #1370). https://github.com/agentscope-ai/CoPaw/pull/1396
  - #1361 Add docker-compose.yml — hỗ trợ build/run local bằng docker compose (giúp trải nghiệm dev và người dùng tự host). https://github.com/agentscope-ai/CoPaw/pull/1361

4) Chủ đề nóng trong cộng đồng (những thread hoạt động/quan tâm nhất)
- Thảo luận về built-in skills/MCPs (18 bình luận): #280 — dùng để quyết định có nên cài sẵn skill/MCP phổ biến để cải thiện trải nghiệm out-of-the-box. https://github.com/agentscope-ai/CoPaw/issues/280
- Vấn đề cập nhật phiên bản không phản ánh UI (14 bình luận): #1195 — người dùng báo pip upgrade nhưng giao diện vẫn hiển thị phiên bản cũ. https://github.com/agentscope-ai/CoPaw/issues/1195
- Channel file sending (QQ/Feishu) không gửi file (11 bình luận): #981 — file/attach qua các channel gặp vấn đề, ảnh hưởng tính năng cơ bản. https://github.com/agentscope-ai/CoPaw/issues/981
- Hỏi/ghi nhận về time/tool usage trong context (6 bình luận): #1346 — đề xuất nhúng thời gian hệ thống vào context thay vì phụ thuộc tool gọi get_current_time (vấn đề tương thích model). https://github.com/agentscope-ai/CoPaw/issues/1346
- Khác: phản hồi model “overthinking” / trả lời dài không cần thiết (#1034). https://github.com/agentscope-ai/CoPaw/issues/1034

Phân tích nhanh: cộng đồng tập trung vào trải nghiệm cốt lõi (cập nhật/phiên bản, kênh tích hợp, thời gian hệ thống, skill mặc định). Nhiều thread đề xuất thay đổi UX để giảm friction cho người không chuyên.

5) Lỗi & Ổn định — xếp hạng theo mức độ nghiêm trọng (dựa trên tác động và tần suất báo cáo)
- Mức nghiêm trọng cao (blocker/production-impact):
  - Mất cấu hình và dữ liệu sau container/k8s restart (Issue #1382) — tác động: mất toàn bộ config, skills, memory; cần hướng dẫn mount volume/đề xuất persisting. https://github.com/agentscope-ai/CoPaw/issues/1382
  - API/model 400 errors / Agent crashes khi gửi media tới model không hỗ trợ vision (Issue #1383) — gửi ảnh trực tiếp làm agent crash. https://github.com/agentscope-ai/CoPaw/issues/1383
  - Exceeded request body size / BadRequestError dẫn tới dialog crash (Issue #1277) — giới hạn kích thước payload gây lỗi. https://github.com/agentscope-ai/CoPaw/issues/1277
- Mức nghiêm trọng trung bình:
  - Message compression / assistant message count mismatch → API gọi thất bại (Issue #1222). https://github.com/agentscope-ai/CoPaw/issues/1222
  - Phiên bản UI không cập nhật sau pip upgrade (Issues #1195, #1315) — user confusion; tiềm ẩn rollback cho triển khai. https://github.com/agentscope-ai/CoPaw/issues/1195 https://github.com/agentscope-ai/CoPaw/issues/1315
  - Feishu/QQ bot: “delay reply” hoặc gửi nhầm nội dung (Issue #1345, #981) — trải nghiệm kênh không ổn định. https://github.com/agentscope-ai/CoPaw/issues/1345 https://github.com/agentscope-ai/CoPaw/issues/981
- Mức nhẹ:
  - UI: skill list duplicate (#1370), workspace refresh error (#1374), model selector overflow (#1381). PRs đã/đang xử lý nhiều trường hợp này (#1396, #1402, #1371). https://github.com/agentscope-ai/CoPaw/issues/1370 https://github.com/agentscope-ai/CoPaw/issues/1374 https://github.com/agentscope-ai/CoPaw/issues/1381

Ghi chú: nhiều lỗi có PR liên quan:
- #1402 sửa refresh workspace (liên quan #1374) — PR mở. https://github.com/agentscope-ai/CoPaw/pull/1402
- #1396 dedupe skill (liên quan #1370) — PR mở. https://github.com/agentscope-ai/CoPaw/pull/1396
- Cron timezone fixes: PR #1321 (open) và PR #1269 (normalize day_of_week) giúp giải quyết mismatch lịch. https://github.com/agentscope-ai/CoPaw/pull/1321 https://github.com/agentscope-ai/CoPaw/pull/1269

6) Yêu cầu tính năng & tín hiệu lộ trình
- Nhiều yêu cầu từ cộng đồng cho trải nghiệm “vanilla” tốt hơn:
  - Pre-install built-in skills/MCPs để giảm thiết lập ban đầu (Issue #280). https://github.com/agentscope-ai/CoPaw/issues/280
  - Webhook support để tích hợp hai chiều với hệ thống người dùng (Issue #338). https://github.com/agentscope-ai/CoPaw/issues/338
  - Hỗ trợ providers dùng Responses API (OpenAI-compatible responses-only gateways) (Issue #944). https://github.com/agentscope-ai/CoPaw/issues/944
  - CDP support cho browser_control để điều khiển trình duyệt đã bật debug (Issue #1348). https://github.com/agentscope-ai/CoPaw/issues/1348
  - Đồng bộ Docker image khi phát hành (Issue #1362) — người dùng self-host mong có image sẵn. https://github.com/agentscope-ai/CoPaw/issues/1362
- Tín hiệu lộ trình:
  - Kiến trúc multi-agent/multi-workspace (#1375) nếu được duyệt sẽ là roadmap lớn (tổ chức, isolation, multi-tenant). https://github.com/agentscope-ai/CoPaw/pull/1375
  - Nhiều PR đang thêm khả năng timezone/cron và cải thiện channel UX → khả năng ra mắt các bản vá/phiên bản nhỏ tập trung vào ổn định kênh và quản lý lịch.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Không dai dẳng: cập nhật version không phản ánh trên UI → mất niềm tin khi nâng cấp (#1195, #1315). https://github.com/agentscope-ai/CoPaw/issues/1195 https://github.com/agentscope-ai/CoPaw/issues/1315
  - Triển khai trong container không bền (không mount volume) dẫn đến mất dữ liệu (#1382). https://github.com/agentscope-ai/CoPaw/issues/1382
  - Channel integrations thiếu ổn định (Feishu/QQ delayed reply, file sending blocked) làm giảm khả năng dùng CoPaw trong production chatops (#981, #1345). https://github.com/agentscope-ai/CoPaw/issues/981 https://github.com/agentscope-ai/CoPaw/issues/1345
  - Trải nghiệm UI còn vụng về: trùng skill, dropdown tràn, copy button lỗi — ảnh hưởng tính tiện dụng (#1370, #1381). https://github.com/agentscope-ai/CoPaw/issues/1370 https://github.com/agentscope-ai/CoPaw/issues/1381
- Tổng quan cảm nhận: người dùng đánh giá tính năng nhiều nhưng đang bị ảnh hưởng bởi các lỗi UX/triển khai; nhu cầu mạnh về trải nghiệm out-of-the-box và stability.

8) Theo dõi tồn đọng (cần sự chú ý của maintainers)
- Thảo luận chiến lược built-in skills / MCPs: Issue #280 — cần quyết định product-policy. https://github.com/agentscope-ai/CoPaw/issues/280
- Cập nhật phiên bản không hiển thị trên UI: #1195 & #1315 — xác định root cause của cơ chế hiển thị version sau upgrade. https://github.com/agentscope-ai/CoPaw/issues/1195 https://github.com/agentscope-ai/CoPaw/issues/1315
- Data loss on container restart: #1382 — hướng dẫn và/hoặc kiểm tra default deployment để tránh mất config. https://github.com/agentscope-ai/CoPaw/issues/1382
- Message compression / assistant message count mismatch: #1222 — gây lỗi API; ưu tiên điều tra cho session dài. https://github.com/agentscope-ai/CoPaw/issues/1222
- Agent crashes khi gửi media không hỗ trợ vision: #1383 — cần routing/media handling trước khi gửi tới model. https://github.com/agentscope-ai/CoPaw/issues/1383
- PR lớn thay đổi kiến trúc: #1375 (Multi-agent) — cần review kỹ, đánh giá phá vỡ backward-compatibility. https://github.com/agentscope-ai/CoPaw/pull/1375
- PRs mở quan trọng cần review/merge: #1402 (workspace refresh), #1396 (skill dedupe), #1321 (cron timezone), #1361 (docker-compose). Links: https://github.com/agentscope-ai/CoPaw/pull/1402 https://github.com/agentscope-ai/CoPaw/pull/1396 https://github.com/agentscope-ai/CoPaw/pull/1321 https://github.com/agentscope-ai/CoPaw/pull/1361

Kết luận ngắn gọn
- Sức hoạt động cộng đồng rất mạnh (nhiều issue/PR), cho thấy nhu cầu thực và sự quan tâm. Tuy nhiên hiện tại độ ổn định và trải nghiệm triển khai/self-host là điểm nghẽn chính. Ưu tiên nên là (1) khắc phục các sự cố production/blocker (container persistence, channel crashes, payload size/format), (2) xử lý các PR UX nhỏ để giảm lượng issue lặp lại, và (3) hoạch định chính sách cho built-in skills/MCPs trước khi thực thi thay đổi lớn.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

Bản tin dự án ZeptoClaw — 2026-03-13

1) Tổng quan hôm nay
- Hoạt động cộng đồng cao: 11 issue cập nhật trong 24 giờ (6 đang mở/hoạt động, 5 đã đóng) và 6 PR cập nhật (3 mở, 3 đã đóng). Những thay đổi tập trung vào trải nghiệm CLI/UX, công cụ agent và kỹ năng mẫu.  
- Mức độ tiến triển tích cực: một số tính năng UX và “skill” đã được merge, trong khi vài vấn đề trọng yếu về hành vi agent và CI/containers vẫn cần xử lý.  
- Không có phát hành (release) mới hôm nay; thay vào đó là nhiều thay đổi nhỏ và PR chỉnh sửa/tiện ích.

2) Phát hành phiên bản
- Không có phiên bản mới.

3) Tiến độ dự án (PRs đã merge/đóng hôm nay)
- #343 (CLOSED) — Add ask_clarification tool with pause_for_input agent loop integration (merged). Thêm tool cho phép agent tạm dừng và hỏi người dùng, cùng cập nhật vòng lặp agent để hỗ trợ pause_for_input. Link: https://github.com/qhkm/zeptoclaw/pull/343
- #344 (CLOSED) — Add deep-research skill with 4-phase methodology (merged). Thêm skill mẫu "deep-research" (SKILL.md) với quy trình 4 pha phục vụ nghiên cứu web có tích hợp memory và nhận thức thời gian. Link: https://github.com/qhkm/zeptoclaw/pull/344
- #337 (CLOSED) — Shimmer spinner + enhanced CLI UX for agent responses (merged). Cải thiện UX CLI: shimmer "Thinking...", spinner, tiến độ step/checkbox cho tool, và separator giữa tiến trình tool và kết quả. Link: https://github.com/qhkm/zeptoclaw/pull/337
- PRs đang mở có liên quan: #342 (streaming by default + response footer) đang chờ review/merge: https://github.com/qhkm/zeptoclaw/pull/342 ; #335 (Zhipu key validation) đang mở: https://github.com/qhkm/zeptoclaw/pull/335 ; #287 (dev tools) đang mở: https://github.com/qhkm/zeptoclaw/pull/287

4) Chủ đề nóng trong cộng đồng
- Streaming mặc định + response metadata footer — Issue #341 (open) và PR #342 (open) hướng tới thay đổi UX CLI lớn (stream token-by-token, footer hiển thị token/tool/time). Tác động lớn tới UX người dùng CLI; tranh luận có thể xoay quanh cấu hình mặc định và backward-compat. Issue: https://github.com/qhkm/zeptoclaw/issues/341 PR: https://github.com/qhkm/zeptoclaw/pull/342
- Bug: coder template LLM tự viết test sai — Issue #345 (P2-high, open). Vấn đề agent tạo/đánh giá bằng test suite khớp với hành vi buggy thay vì sử dụng test hiện có; ảnh hưởng trực tiếp tới độ tin cậy workflow "coder" của agent. Link: https://github.com/qhkm/zeptoclaw/issues/345
- Podman / Dockerfile.dev cache mount build error — Issue #333 (open). Gây hỏng quy trình lint-container/auto-build trong môi trường dùng Podman; ảnh hưởng tới CI/cộng tác đóng góp. Link: https://github.com/qhkm/zeptoclaw/issues/333
- Telegram integration improvements — Issue #331 (open). Người dùng kỳ vọng định dạng tốt hơn và typing indicator để trải nghiệm thân thiện hơn trên Telegram. Link: https://github.com/qhkm/zeptoclaw/issues/331

5) Lỗi & Ổn định (xếp hạng)
- Cao (P2-high): #345 — agent coder template tự tạo test khớp với lỗi (ảnh hưởng tính chính xác của sửa lỗi mã). (Open) https://github.com/qhkm/zeptoclaw/issues/345
- Trung bình: #333 — Dockerfile.dev Podman cache mount build error (blocks lint-container auto-build). (Open) https://github.com/qhkm/zeptoclaw/issues/333
- Trung bình: #185 (CLOSED) — chore: upgrade jsonwebtoken 9 → 10 (breaking). Đã đóng nhưng ghi chú ở issue cho biết jsonwebtoken v10 có breaking API; cần migration thủ công ở mã auth panel nếu cập nhật. (Closed) https://github.com/qhkm/zeptoclaw/issues/185
- Thấp/đã xử lý: #332 (CLOSED) — Zhipu API key validation during onboarding (issue đóng); tương tự PR #335 đang mở để thêm xác thực qua /models endpoint. Issue: https://github.com/qhkm/zeptoclaw/issues/332 PR: https://github.com/qhkm/zeptoclaw/pull/335

6) Yêu cầu tính năng & tín hiệu lộ trình
- Streaming-by-default + response metadata footer (issue #341, PR #342) là tính năng UX trọng điểm có khả năng được bật làm mặc định trong bản phát hành tiếp theo. Issue: https://github.com/qhkm/zeptoclaw/issues/341 PR: https://github.com/qhkm/zeptoclaw/pull/342
- Tool để hỏi làm rõ (ask_clarification) vừa được merge (#343): cho thấy định hướng giảm đoán mò của agent và tăng tương tác người-dùng. Link: https://github.com/qhkm/zeptoclaw/pull/343
- Skills mẫu (deep-research) được bổ sung (#344): xu hướng cung cấp "skill packs" đi kèm để hướng dẫn hành vi agent — có thể nhiều skill khác sẽ theo sau. Link: https://github.com/qhkm/zeptoclaw/pull/344
- Benchmark coding fixture (issue #340) và cải thiện Telegram (issue #331) được đề xuất — dấu hiệu cộng đồng muốn đo lường hiệu năng agent và mở rộng kênh tích hợp. Issue: https://github.com/qhkm/zeptoclaw/issues/340 ; https://github.com/qhkm/zeptoclaw/issues/331

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: trải nghiệm CLI (độ mượt khi chờ kết quả, metadata hiển thị), tính nhất quán của agent trong workflow mã hóa (agent phải tuân thủ test có sẵn), và trải nghiệm tích hợp (Telegram định dạng/typing).  
- Người đóng góp cũng gặp rào cản CI/container (Podman) dẫn tới lỗi build/lint cục bộ.  
- Mức độ hài lòng: cải tiến UX vừa được merge sẽ nâng trải nghiệm, nhưng tồn tại ít nhất một lỗi hành vi quan trọng (#345) làm giảm độ tin cậy cho các use-case sửa mã tự động.

8) Theo dõi tồn đọng (cần chú ý của người bảo trì)
- #345 (bug, P2-high) — coder template LLM viết test sai: cần repro, prompt/constraint fixes hoặc thêm verification/guardrails. Open: https://github.com/qhkm/zeptoclaw/issues/345
- #342 / #341 (feat) — streaming by default + footer: PR #342 đang open, cần review về config migration (agents.defaults.streaming đổi) và docs. PR: https://github.com/qhkm/zeptoclaw/pull/342 Issue: https://github.com/qhkm/zeptoclaw/issues/341
- #335 (PR open) — Zhipu API key validation: issue #332 đã đóng nhưng PR #335 vẫn open; cần hoàn thiện review/merge để đồng nhất onboarding. PR: https://github.com/qhkm/zeptoclaw/pull/335 Issue: https://github.com/qhkm/zeptoclaw/issues/332
- #333 (issue open) — Podman/Dockerfile.dev cache mount: ảnh hưởng CI; cần fix (workaround hoặc build flag) để không chặn PRs liên quan tới lint/container. Link: https://github.com/qhkm/zeptoclaw/issues/333
- #331, #340, #287 — Telegram improvements, coding benchmark fixture, và dev tools for consistent pre-PR state: đều là mục tác động cộng đồng/đóng góp, nên được ưu tiên theo năng lực maintainers. Links: https://github.com/qhkm/zeptoclaw/issues/331 , https://github.com/qhkm/zeptoclaw/issues/340 , https://github.com/qhkm/zeptoclaw/pull/287

Kết luận ngắn gọn
- Sức khỏe dự án: năng động, nhiều PR/issue liên quan UX và trải nghiệm developer/agent.  
- Khuyến nghị ưu tiên: (1) xử lý bug hành vi coder template (#345), (2) hoàn thiện streaming-by-default review/điều chỉnh config (#342/#341), (3) sửa CI/Podman build issue (#333), (4) hợp nhất Zhipu validation nếu chưa hoàn chỉnh (#335).  

Tài liệu tham khảo (liên kết GitHub chính đề cập trong bản tin)
- Issues & PRs nêu trong bản tin:  
  - #341 issue / #342 PR (streaming + footer): https://github.com/qhkm/zeptoclaw/issues/341 , https://github.com/qhkm/zeptoclaw/pull/342  
  - #345 bug (coder template): https://github.com/qhkm/zeptoclaw/issues/345  
  - #333 Podman Dockerfile.dev: https://github.com/qhkm/zeptoclaw/issues/333  
  - #331 Improve Telegram support: https://github.com/qhkm/zeptoclaw/issues/331  
  - #340 coding benchmark fixture: https://github.com/qhkm/zeptoclaw/issues/340  
  - #343 ask_clarification (merged): https://github.com/qhkm/zeptoclaw/pull/343  
  - #344 deep-research (merged): https://github.com/qhkm/zeptoclaw/pull/344  
  - #337 shimmer spinner (merged): https://github.com/qhkm/zeptoclaw/pull/337  
  - #332 Zhipu validation (closed issue) / #335 PR (open): https://github.com/qhkm/zeptoclaw/issues/332 , https://github.com/qhkm/zeptoclaw/pull/335  
  - #185 jsonwebtoken upgrade note: https://github.com/qhkm/zeptoclaw/issues/185  
  - #287 dev tools (open PR): https://github.com/qhkm/zeptoclaw/pull/287

Nếu cần, tôi có thể tổng hợp một checklist hành động ngắn cho maintainers (ví dụ PR ưu tiên, mô tả reproduction steps cho #345, test cases CI cho Podman).

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

EasyClaw — Bản tin dự án (2026-03-13)

1) Tổng quan hôm nay
- Dự án duy trì hoạt động bảo trì nhẹ: trong 24 giờ qua có 1 issue được đóng, không có PR mới hoặc PR được merge.  
- Có phát hành một phiên bản nhỏ (v1.6.7) với nội dung liên quan đến hướng dẫn cài đặt macOS.  
- Mức độ hoạt động hiện tại: thấp–vừa (bảo trì và phản hồi vấn đề), không có dấu hiệu phát triển tính năng lớn trong ngắn hạn.  
- Khuyến nghị tạm thời: chú ý tới các vấn đề liên quan tới OAuth và trải nghiệm cài đặt trên macOS.

2) Phát hành phiên bản
- Mới: v1.6.7 — "EasyClaw v1.6.7"  
  - Nội dung nổi bật: phần "Installation / 安装说明" được cập nhật, có hướng dẫn xử lý cảnh báo macOS Gatekeeper ("'EasyClaw' is damaged and can't be opened" / "'已损坏，无法打开'") kèm song ngữ Trung-Anh. Hướng dẫn khởi đầu bằng việc mở Terminal (ghi chú trong changelog bị cắt ngắn: "Open Terminal (pres...").  
  - Lưu ý di chuyển / thay đổi phá vỡ: không thấy ghi chú thay đổi phá vỡ; bản phát hành dường như tập trung vào hướng dẫn cài đặt và trải nghiệm người dùng macOS.  
  - Link release: https://github.com/gaoyangz77/easyclaw/releases/tag/v1.6.7  
  - Gợi ý cho maintainer: hoàn chỉnh phần hướng dẫn cài đặt (đoạn bị cắt) và cân nhắc ký mã (code signing) cho bản macOS để giảm lỗi Gatekeeper.

3) Tiến độ dự án
- PRs: 0 PRs được mở/merge/đóng trong 24 giờ qua — không có hoạt động PR trong đợt này.  
- Issues: 1 issue đã được đóng (xem phần sau).  
- Diễn tiến chính: phát hành v1.6.7 (hướng dẫn cài đặt macOS) và đóng issue liên quan tới OpenAI OAuth; chưa có dấu hiệu PR khắc phục rõ ràng công khai.

4) Chủ đề nóng trong cộng đồng
- Issue hoạt động nhất (mới nhất và có ảnh đính kèm): #16 "OpenAI Oauth好像有问题" — tác giả @westisc, tạo 2026-03-11, cập nhật 2026-03-12, 1 bình luận. Người dùng báo lỗi giống nhau trên phiên bản portable và cài đặt.  
  - Link: https://github.com/gaoyangz77/easyclaw/issues/16  
  - Phân tích nhu cầu: người dùng cần xác thực OpenAI hoạt động ổn định; vấn đề ảnh hưởng trực tiếp tới khả năng sử dụng các tính năng phụ thuộc OpenAI (rất có khả năng là tính năng lõi). Hình ảnh đính kèm cho thấy lỗi có thể là lỗi xác thực/flow OAuth hoặc cấu hình hệ thống.

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Mức nghiêm trọng: Cao — Issue #16: OpenAI OAuth có vấn đề (gây mất khả năng đăng nhập/ủy quyền) — đã được báo và sau đó đóng (2026-03-12). Link: https://github.com/gaoyangz77/easyclaw/issues/16  
  - Tình trạng: đóng; không rõ có PR sửa tương ứng hay fix nằm trong release v1.6.7.  
  - Ghi chú: vấn đề ảnh hưởng tính năng liên quan đến OpenAI; cần xác nhận bản phát hành đã khắc phục hay cần theo dõi tái phát.  
- Mức nghiêm trọng: Trung bình — macOS Gatekeeper hiển thị cảnh báo cho cả bản portable và bản cài đặt (ghi trong release notes). Giải pháp tạm thời hướng dẫn dùng Terminal; khuyến nghị ký mã sản phẩm để loại bỏ cảnh báo.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Không có yêu cầu tính năng mới được liệt kê trong dữ liệu 24h.  
- Dưới đây là các tính năng có khả năng được ưu tiên trong các bản phát hành tới (dựa trên các vấn đề hiện tại):
  - Cải thiện/ổn định OAuth cho OpenAI (flow đăng nhập, xử lý lỗi, hướng dẫn người dùng).  
  - Ký mã (code signing) và đóng gói macOS chính thức để tránh Gatekeeper.  
  - Hướng dẫn cài đặt đầy đủ và kịch bản khôi phục lỗi cho macOS và Windows.  
  - Giao diện báo lỗi rõ ràng hơn khi xác thực thất bại.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: lỗi xác thực OpenAI (không thể OAuth) và cảnh báo Gatekeeper trên macOS khi mở ứng dụng. Người dùng đính kèm ảnh chụp màn hình để minh họa.  
- Mức độ hài lòng: đang có bất bình/khó chịu từ người dùng bị ảnh hưởng bởi OAuth và việc cài đặt trên macOS; những người không gặp lỗi sẽ ít thấy tác động.  
- Trường hợp sử dụng bị ảnh hưởng: mọi tính năng phụ thuộc OpenAI (chat, agent, gọi API) đều bị gián đoạn nếu OAuth không hoạt động.

8) Theo dõi tồn đọng / Ghi chú hành động cho maintainer
- Kiểm tra lại issue #16 (https://github.com/gaoyangz77/easyclaw/issues/16) — xác nhận nguyên nhân, đánh dấu liệu fix đã nằm trong v1.6.7 hay cần patch bổ sung.  
- Hoàn thiện phần hướng dẫn macOS trong release notes (đoạn "Open Terminal (pres..." bị cắt) và cân nhắc công bố hướng dẫn đầy đủ bằng tiếng Anh/Trung/VN nếu có cộng đồng đa ngôn ngữ. Release link: https://github.com/gaoyangz77/easyclaw/releases/tag/v1.6.7  
- Ưu tiên: ký mã macOS để dập tắt Gatekeeper; kiểm tra flow OAuth với các tài khoản thực tế và log chi tiết để hỗ trợ debug.  
- Backlog hiện tại: không có PRs mở/ít tồn đọng được liệt kê trong dữ liệu 24h; tuy nhiên nên rà soát các issue cũ hơn chưa được phản hồi.

Tổng kết ngắn: hôm nay là ngày bảo trì nhẹ với một bản phát hành nhỏ (v1.6.7) tập trung vào hướng dẫn cài đặt macOS và một issue OAuth đã được đóng. Những ưu tiên tiếp theo nên là xác minh và công khai fix OAuth (nếu chưa rõ), hoàn thiện hướng dẫn cài đặt, và cân nhắc ký mã bản macOS để cải thiện trải nghiệm người dùng.

Repo chính: https://github.com/gaoyangz77/easyclaw
Issue nóng: https://github.com/gaoyangz77/easyclaw/issues/16
Release v1.6.7: https://github.com/gaoyangz77/easyclaw/releases/tag/v1.6.7

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*