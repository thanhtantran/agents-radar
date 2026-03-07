# Bản tin Hệ sinh thái OpenClaw 2026-03-07

> Issues: 500 | PRs: 500 | Dự án: 11 | Thời gian tạo: 2026-03-07 13:56 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## Phân tích sâu OpenClaw

Bản tin dự án OpenClaw — 2026-03-07

1) Tổng quan hôm nay
- Hoạt động cộng đồng cực kỳ cao: trong 24 giờ qua có 500 issue được cập nhật (179 đang mở/hoạt động, 321 đã đóng) và 500 PR được cập nhật (323 mở, 177 merge/đóng).  
- Không có phát hành mới trong ngày. Tập trung hiện tại là xử lý hàng loạt báo cáo lỗi nghiêm trọng liên quan tới kênh/IO, bảo mật SSRF và suy giảm ngữ cảnh (compaction).  
- Các PR lớn về hardening sanitization, runtime-aware dashboard và cơ chế phòng vệ khi tràn context đang chờ review — dự án đang cân bằng giữa sửa lỗi khẩn cấp và nâng cấp kiến trúc.  

2) Phát hành phiên bản
- Không có phiên bản mới hôm nay.

3) Tiến độ dự án (PR đã merge/đóng & điểm nhấn)
- Trong 24h có 177 PR được merge/đóng. Một số PR nhỏ/khẩn cấp đã đóng:
  - Thêm biến môi trường kiểm soát mở rộng path: OPENCLAW_EXPAND_PATHS (PR 38495 — closed) — fix tiện ích hiển thị đường dẫn. https://github.com/openclaw/openclaw/pull/38495
  - Brave Search: thêm Content-Type header để tránh 422 (PR 38898 — closed). https://github.com/openclaw/openclaw/pull/38898
  - Windows: restart gateway via Scheduled Task (PR 38825 — closed) — cải thiện restart trên Windows. https://github.com/openclaw/openclaw/pull/38825
  - Bump build-info version (PR 38575 — closed). https://github.com/openclaw/openclaw/pull/38575
  - Fix: ignore empty strings in legacy message fields (PR 38864 — closed) — khắc phục lỗi gửi target rỗng. https://github.com/openclaw/openclaw/pull/38864
- PR đang được thảo luận / chờ review (đáng chú ý, chưa merge):
  - Mission Control → runtime surface, execution queue, autonomy posture (PR 38897 — open). https://github.com/openclaw/openclaw/pull/38897
  - Sanitization hardening — multi-stage sanitization + audit (PR 35427 — open). https://github.com/openclaw/openclaw/pull/35427
  - 3-layer context overflow protection + LLM-based compaction (PR 38747 — open). https://github.com/openclaw/openclaw/pull/38747
  - Self-escalation tool để handoff model (PR 38840 — open). https://github.com/openclaw/openclaw/pull/38840
  - Contextual group activation (peeking/engaged) cho group chats (PR 38350 — open). https://github.com/openclaw/openclaw/pull/38350

4) Chủ đề nóng trong cộng đồng (issues/PR hoạt động nhiều nhất)
- #34810: OpenClaw bất ngờ mất công cụ filesystem (exec/read/write) — agent không thể tạo file/chạy lệnh (26 bình luận, 👍7). Tác động lớn đến workflows tự động hóa. https://github.com/openclaw/openclaw/issues/34810
- #32828: False "API rate limit reached" trên mọi model dù API ngoài OpenClaw vẫn hoạt động (16 bình luận). Có khả năng liên quan tới logic đo/auth hoặc cache trạng thái. https://github.com/openclaw/openclaw/issues/32828
- #3038: mol tbot / tên CLI gây nhầm lẫn (zsh: command not found: moltbot) — nhiều người mới gặp lỗi do tài liệu. (closed, 15 bình luận, 👍9). https://github.com/openclaw/openclaw/issues/3038
- #13688: Discord WebSocket 1005/1006 disconnects với resume logic thất bại và backoff tăng vô hạn (11 bình luận) — bot offline lâu, mất DM. https://github.com/openclaw/openclaw/issues/13688
- #28744: Yêu cầu hỗ trợ nhận diện nội dung hình ảnh (vision) — nhiều trường hợp kênh gửi hình nhưng không truyền nội dung ảnh đến model. (9 bình luận). https://github.com/openclaw/openclaw/issues/28744

Phân tích nhu cầu cơ bản: cộng đồng đang cần (1) độ ổn định kênh/IO (WebSocket, webhook, channel adaptor), (2) đáng tin cậy khi gọi model (auth / rate-limit logic), và (3) khả năng đa phương thức (hình ảnh) cho agents.

5) Lỗi & Ổn định — danh sách theo mức độ nghiêm trọng (ưu tiên)
- Cao (blocker/không thể tiếp tục workflows):
  - #34810 Filesystem tools mất chức năng — agents không thể tạo file/exec lệnh => nhiều automation và plugin bị vô hiệu. https://github.com/openclaw/openclaw/issues/34810
  - #37834 Session context corruption: orphaned tool_use ID gây vòng lặp 400 vĩnh viễn — làm chết session dài hạn (một trường hợp báo cáo reproducible). https://github.com/openclaw/openclaw/issues/37834
  - #36229 Compaction corrupts thinking block signatures — khiến Anthropic từ chối API và gây session irrecoverable. https://github.com/openclaw/openclaw/issues/36229
- Trung bình (gây gián đoạn/khó chịu):
  - #13688 Discord WebSocket disconnect + unbounded backoff — bot offline lâu, mất DM. https://github.com/openclaw/openclaw/issues/13688
  - #34052 Health monitor restarts ALL channels (stale-socket) trong multi-account — gây restart loop. https://github.com/openclaw/openclaw/issues/34052
  - #32828 False API rate limit reached — nhiều người không thể biết nguyên nhân thật. https://github.com/openclaw/openclaw/issues/32828
  - #36495 / #36008 systemctl is-enabled unavailable / install regression sau 2026.3.2 — ảnh hưởng deploy trên hệ thống không có systemctl hoặc trả mã `not-found`. https://github.com/openclaw/openclaw/issues/36495 https://github.com/openclaw/openclaw/issues/36008
- Thấp (hành vi/UX, config):
  - #36090 WhatsApp group reactions fail khi thiếu participant field — hành vi im lặng, khó debug. https://github.com/openclaw/openclaw/issues/36090
  - #33086 SSRF protection blocks Discord CDN khi chạy sau Clash Verge TUN (fake-ip) — hiện đã có PR (25258) bổ sung cấu hình cho phép phạm vi benchmark RFC2544. https://github.com/openclaw/openclaw/issues/33086 https://github.com/openclaw/openclaw/pull/25258
  - #38439 Webchat avatar /avatar/{agentId} trả 404 (regression). https://github.com/openclaw/openclaw/issues/38439

Ghi chú về PR sửa lỗi liên quan:
- PR 25258 (closed) mở cấu hình cho phạm vi benchmark 198.18.0.0/15 để không chặn fake-ip proxies — trực tiếp giải quyết #33086. https://github.com/openclaw/openclaw/pull/25258
- PR 38898 (closed) sửa header Brave Search — giải quyết web_search 422. https://github.com/openclaw/openclaw/pull/38898
- Một số PR nhỏ (38864, 38495, 38825) đã đóng để khắc phục lỗi UX/khởi chạy.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Hỗ trợ nội dung hình ảnh trong agents (vision): #28744 — nhiều người muốn truyền ảnh xuống model tuyến dưới (MiniMax-Vision, v.v.). https://github.com/openclaw/openclaw/issues/28744
- Self-escalation / model handoff tool (PR 38840) — đề xuất cho phép mô hình nhẹ chuyển sang mô hình mạnh giữa lượt. https://github.com/openclaw/openclaw/pull/38840
- Contextual group activation / peeking state machine (PR 38350) — kích hoạt bot trong group theo ngữ cảnh, giảm nhiễu. https://github.com/openclaw/openclaw/pull/38350
- Per-bot heartbeats (issue 752) — mong muốn heartbeat theo từng bot, không chỉ default. https://github.com/openclaw/openclaw/issues/752
- Dự đoán cho bản tiếp theo: các thay đổi về sanitization/compaction (PR 35427, PR 38747) và cải thiện runtime/tool observability (PR 38897) có khả năng được ưu tiên vì liên quan trực tiếp tới ổn định và bảo mật.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Ổn định kênh (Discord/Telegram/WhatsApp/Feishu/iMessage) — disconnect, duplicate messages, silent failures gây mất niềm tin. Ví dụ #13688, #36090, #25200. https://github.com/openclaw/openclaw/issues/13688 https://github.com/openclaw/openclaw/issues/36090 https://github.com/openclaw/openclaw/issues/25200
  - Session/context corruption và compaction gây mất tiến độ công việc dài (long-running sessions) — người dùng enterprise lo ngại về reliability. #36229, #37834. https://github.com/openclaw/openclaw/issues/36229 https://github.com/openclaw/openclaw/issues/37834
  - Auth / provider model mapping và rate-limit false positives — làm gián đoạn fallback model flow. #32828, #37623, #26103. https://github.com/openclaw/openclaw/issues/32828 https://github.com/openclaw/openclaw/issues/37623 https://github.com/openclaw/openclaw/issues/26103
  - Mất công cụ filesystem/exec (severe) — phá vỡ nhiều plugin/skill. #34810. https://github.com/openclaw/openclaw/issues/34810
- Mức độ hài lòng: cộng đồng tích cực đóng góp PR và triage, nhưng tiếng kêu về regressions và docs/installer confusion (moltbot vs clawdbot, npm package issues) vẫn nhiều. Ví dụ #3038 và các issue liên quan tới npm/moltbot. https://github.com/openclaw/openclaw/issues/3038

8) Theo dõi tồn đọng (cần chú ý/triage)
- Các issue quan trọng lâu chưa được xử lý hoặc cần maintainer attention:
  - #34810 (Filesystem tools lost) — high priority, 26 bình luận. https://github.com/openclaw/openclaw/issues/34810
  - #37834 (session context corruption) — gây permanent 400 loop. https://github.com/openclaw/openclaw/issues/37834
  - #36229 (compaction corrupts thinking block signatures) — tác động sâu tới Anthropic runs. https://github.com/openclaw/openclaw/issues/36229
  - #13688 (Discord WebSocket resume/backoff) — đã mở từ 2026-02-10. https://github.com/openclaw/openclaw/issues/13688
  - #28744 (vision support) — yêu cầu tính năng có volume người dùng lớn ở kênh hình ảnh. https://github.com/openclaw/openclaw/issues/28744
  - #26103 (Gemini provider: 429 blocks whole provider) — ảnh hưởng fallback model logic. https://github.com/openclaw/openclaw/issues/26103
- PR lớn cần review/triage (ảnh hưởng nhiều subsystem):
  - PR 35427 — Sanitization hardening (XL). https://github.com/openclaw/openclaw/pull/35427
  - PR 38897 — Mission Control runtime surface (XL). https://github.com/openclaw/openclaw/pull/38897
  - PR 38747 — 3-layer context overflow protection (XL). https://github.com/openclaw/openclaw/pull/38747
  - PR 38350 — Contextual group activation (XL). https://github.com/openclaw/openclaw/pull/38350

Kết luận & đề xuất ngắn
- Ưu tiên ngay: (1) điều tra và khắc phục #34810 (filesystem tools) và #37834 / #36229 (context corruption/compaction) vì gây mất dữ liệu/workflow; (2) làm rõ và fix nguyên nhân thông báo "API rate limit reached" sai (#32828) để tránh false-positive dẫn tới thất thoát khả năng phục vụ; (3) review/merge các PR liên quan đến sanitization và context overflow (PR 35427, 38747) — chúng tác động trực tiếp tới nhiều báo cáo vừa qua.  
- Đồng thời, cần tăng tốc review cho PRs lớn về observability/runtime (38897) để giúp triage các sự cố thời gian thực.  

Nếu bạn muốn, tôi có thể:
- Tạo danh sách issue/PR cần assign cho từng nhóm (gateway, channels, compaction, auth) với đề xuất maintainer và mức ưu tiên.  
- Soạn template triage checklist cho những báo cáo session/compaction để giúp reproduce nhanh.

---

## So sánh hệ sinh thái chéo

1) Tổng quan hệ sinh thái
- Hệ sinh thái mã nguồn mở về AI agent/trợ lý cá nhân hiện rất phong phú: nhiều dự án song song tối ưu hoá cho self‑host, multi‑provider, đa kênh (chat/vision/audio) và tích hợp runtime/container.  
- Điểm chung nổi bật: cộng đồng ưu tiên tính ổn định kênh/IO, tương tác với providers (auth/rate‑limit/fallback), quản lý session/long‑running context và bảo mật (SSRF/sandbox).  
- Tức thời: dự án lớn (ví dụ OpenClaw) có hoạt động cực kỳ sôi động nhưng đang cân bằng giữa sửa lỗi khẩn cấp và cải tiến kiến trúc; nhiều dự án nhỏ‑vừa tập trung vào trải nghiệm cục bộ (Ollama, vLLM, packaging).

2) So sánh mức độ hoạt động
(Biểu đồ so sánh tóm tắt — dữ liệu là cập nhật 24h gần nhất trong bản tin)

Project | Issues (24h cập nhật) | PRs (24h cập nhật) | Release (hôm nay) | Điểm sức khỏe (1–5) & lý do ngắn
---|---:|---:|---|---
OpenClaw | 500 (179 open/321 closed) | 500 (323 open/177 merged/closed) | Không | 4 (rất aktif; high‑risk stability: nhiều blocker về filesystem/context/compaction)
NanoBot | 29 (22 open/7 closed) | 56 (41 open/15 merged) | Không | 4 (active, nhiều provider work; cần fixes interoperability)
Zeroclaw | 15 (11 open/4 closed) | 50 (32 open/18 merged) | Không (issue release assets missing) | 3 (active; install/runtime pain points)
PicoClaw | 18 (13 open/5 closed) | 48 (35 open/13 merged) | Không | 3 (active; backlog review cần tăng tốc)
NanoClaw | 16 (7 open/9 closed) | 33 (23 open/10 merged) | Không | 3 (active; security/ops concerns)
IronClaw | 30 (23 open/7 closed) | 50 (24 open/26 merged) | v0.16.1 & v0.16.0 (trước ngày) | 4 (maturing: releases + CI fixes; onboarding bugs remain)
LobsterAI | 13 | 23 merged | Không | 3 (fast PR merges; platform/runtime fixes focus)
TinyClaw | 2 | 4 | Không | 2 (nhỏ, ổn định tương đối; release/installer issues)
CoPaw | 50 (40 open/10 closed) | 28 (22 open/6 merged) | Không | 4 (rất active; nhiều stability/blocker container)
ZeptoClaw | 5 | 9 | v0.7.0 (mới) | 4 (security‑first; release vừa có)
EasyClaw | 3 issues closed | 0 PR | v1.6.2 / v1.6.1 (gần đây) | 2 (hoạt động thấp; focus ổn định macOS/migration)

Ghi chú: “Điểm sức khỏe” là chỉ số tổng hợp (1 = thấp, 5 = rất tốt/ổn định hoạt động) cân bằng giữa mức hoạt động cộng đồng và rủi ro/ổn định vận hành.

3) Vị thế của OpenClaw
- Quy mô & tốc độ: OpenClaw là “đầu đàn” về khối lượng hoạt động (500 issue/PR cập nhật trong 24h) — cộng đồng lớn và rất năng nổ.  
- Ưu thế kỹ thuật: dẫn dắt ở mặt hardening sanitization, context compaction (LLM‑based compaction), runtime surface / Mission Control và cơ chế phòng vệ khi tràn context — những đầu tư này hướng tới reliability ở quy mô enterprise.  
- Khác biệt so với phần còn lại: nhiều dự án nhỏ hơn tập trung vào local models / packaging; OpenClaw phải cân bằng scale (đa‑kênh, plugins, long‑running sessions) và an toàn, nên chịu nhiều báo cáo blocker (filesystem tools, session corruption).  
- Kết luận: OpenClaw có lợi thế cộng đồng và phạm vi tính năng lớn nhưng đang chịu áp lực ổn định cao — nếu giải quyết nhanh các blocker (filesystem, compaction, false rate limits) thì vị thế sẽ càng mạnh.

4) Hướng kỹ thuật chung (những yêu cầu xuất hiện ở nhiều dự án)
- Ổn định kênh / IO & dedupe (OpenClaw, CoPaw, IronClaw, Zeroclaw): khắc phục WebSocket disconnects, duplicate messages, resume/backoff logic.  
- Provider interoperability & session consistency (NanoBot, NanoClaw, OpenClaw): call_id length, responses API limits, fallback/routing và false 429/ratelimit handling.  
- Hỗ trợ local models / Ollama / vLLM routing (PicoClaw, NanoBot, LobsterAI, TinyClaw): config mẫu, offline lazy‑loading, session‑affinity.  
- Session & memory persistence, compaction, overflow protection (OpenClaw, NanoBot, CoPaw, PicoClaw): long‑running sessions, LLM‑based compaction, corrupt signatures handling.  
- Security hardening: SSRF, sandbox, symlink/mount validation (ZeptoClaw, OpenClaw, Zeroclaw): hop‑by‑hop redirect checks, TOCTOU mitigation.  
- Observability & runtime debugging (OpenClaw, IronClaw, NanoBot): split LLM debug logs, runtime dashboards, prompt/response tracing.  
- Packaging / installer / onboarding (Zeroclaw, IronClaw, LobsterAI, TinyClaw): signed macOS binaries, missing release assets, bootstrap scripts.

5) Phân tích khác biệt hóa (trọng tâm, đối tượng, kiến trúc)
- Đối tượng người dùng:
  - Enterprise / scale & extensibility: OpenClaw, IronClaw, CoPaw (multi‑channel, heavy observability, long‑running sessions).  
  - Self‑host / local‑first hobbyists: PicoClaw, LobsterAI, TinyClaw, EasyClaw (Ollama, local runtime, desktop packaging).  
  - Provider‑diverse integrators: NanoBot, NanoClaw, Zeroclaw (nhiều provider adapters, memory backends).  
- Trọng tâm tính năng:
  - Security / sandboxing: ZeptoClaw (rất rõ), Zeroclaw (installer/runtime hardening).  
  - Memory / vector backends: Zeroclaw (Cortex integration), CoPaw (memory refactor), IronClaw (libSQL vector gaps).  
  - WASM/extension ecosystem: IronClaw (WASM tooling/versioning).  
- Kiến trúc kỹ thuật:
  - Local vLLM + session‑affinity (NanoBot, CoPaw) vs. cloud‑first with provider fallback (OpenClaw, IronClaw).  
  - Heavy plugin/tool sandbox model (OpenClaw, ZeptoClaw) vs. lightweight desktop agents (LobsterAI, EasyClaw).  
- Kết luận: các dự án khác nhau rõ rệt về trade‑offs: performance/scalability (enterprise) đối nghịch với ease‑of‑use/self‑host (local models).

6) Động lực & độ trưởng thành của cộng đồng
- Nhóm lặp nhanh / high momentum: OpenClaw, IronClaw, CoPaw — nhiều PR/issue, releases, và hoạt động triage. Những dự án này có cộng đồng lớn nhưng phải quản lý backlog stability.  
- Nhóm phát triển tích cực / feature momentum: NanoBot, Zeroclaw, PicoClaw — nhiều PR provider/media, đang mở rộng khả năng runtime/local.  
- Nhóm ổn định / tập trung UX: LobsterAI, NanoClaw, EasyClaw, TinyClaw — ít issue nhưng tập trung sửa nền tảng/installer; ZeptoClaw thuộc nhóm small‑but‑critical (bảo mật).  
- Khả năng release & CI maturity: IronClaw và ZeptoClaw có releases/CI improvements; OpenClaw có throughput cao nhưng đang ưu tiên stability patches.  
- Tác động tới quyết định: nếu cần đối tác/đóng góp nhanh — hướng tới OpenClaw/IronClaw; nếu cần tích hợp local model nhẹ & UX dễ dùng — xem PicoClaw/LobsterAI/EasyClaw.

7) Tín hiệu xu hướng (giá trị tham khảo cho nhà phát triển AI agent)
- Hỗ trợ đa‑provider và local models là phải có: Ollama, vLLM, Mistral, Kilo xuất hiện rộng — chuẩn hoá adapter/provider interface sẽ tăng khả năng tái sử dụng. (tham khảo: NanoBot, PicoClaw, TinyClaw, LobsterAI)  
- Quản lý ngữ cảnh (compaction/overflow protection) là yếu tố sống còn cho sessions dài: LLM‑based compaction + 3‑layer overflow protection đang phổ biến (OpenClaw, NanoBot, CoPaw).  
- Bảo mật input/tooling (SSRF, symlink, mount policies) cần thiết khi mở tools/plugin — dự án bảo mật‑first (ZeptoClaw) là hình mẫu.  
- Observability + runtime dashboards + structured debug logs giảm thời gian triage drastically — đầu tư vào traceable prompt/response flow có ROI cao (OpenClaw, IronClaw, NanoBot).  
- UX/onboarding & packaging quyết định tỷ lệ chấp nhận tự‑host: signed binaries, clear migration, reliable bootstrap scripts (Zeroclaw, IronClaw, LobsterAI, TinyClaw).  
- Khuyến nghị kỹ thuật ngắn: xây một adapter layer cho providers, chuẩn session format + compaction API, watchdog/heartbeat cho per‑bot channels, và instrumented tracing (request/response ids) để giảm false rate‑limit/debug time.

Kết luận ngắn (cho người ra quyết định)
- Nếu mục tiêu là nhanh chiếm thị trường enterprise/scale: đầu tư vào ổn định kênh (WebSocket/webhook), session compaction reliability, và observability — đó là điểm đau xuất hiện ở OpenClaw/CoPaw/IronClaw.  
- Nếu mục tiêu là self‑host adoption nhanh: ưu tiên local model integration, installer/packaging, clear docs & migration scripts (PicoClaw, LobsterAI, EasyClaw).  
- Đầu tư lõi cho mọi dự án: (1) provider adapter chung + robust fallback/auth logic; (2) session persistence + compaction; (3) security sandboxing cho tool execution; (4) telemetry/trace để debug. Những mục này giảm tín hiệu tiếng kêu của cộng đồng và tăng adoption.

Nếu bạn muốn, tôi có thể tiếp theo:
- Lập ma trận ưu tiên (actionable) 48–72h cho OpenClaw (blocker → reviewer/assignee đề xuất), hoặc  
- Soạn checklist kỹ thuật chuẩn (provider adapter spec + session compaction contract + telemetry fields) để chia sẻ với các maintainer.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

Tổng quan hôm nay
- Hoạt động cộng đồng rất cao: 24h qua có 29 issue (22 đang mở/hoạt động, 7 đã đóng) và 56 PR được cập nhật (41 mở, 15 merge/đóng). Dự án đang ở trạng thái phát triển tích cực với nhiều đóng góp liên quan tới provider, kênh nhắn tin (QQ/Discord/Telegram/WhatsApp) và cải thiện độ ổn định.
- Không có phát hành phiên bản mới hôm nay.
- Các chủ đề nổi bật tập trung vào: hỗ trợ provider (Ollama, Kilo, Mistral, v.v.), multi‑agent / multi‑workspace, xử lý media (hình/âm thanh), và lỗi tương tác giữa providers (call_id / session corruption).
- Tổng thể: cộng đồng năng động, backlog lớn về provider/interop và một số vấn đề ổn định cần ưu tiên.

Phát hành phiên bản
- Không có phiên bản mới được phát hành hôm nay.

Tiến độ dự án (PR đã merge/đóng & tính năng nổi bật)
- 15 PR đã được merge/đóng trong 24h qua (tổng PR cập nhật 56). Một số PR/merge/close đáng chú ý:
  - feat(providers): Kilo AI gateway config — PR #1585 (Đã đóng) — thêm cấu hình cho Kilo (link: https://github.com/HKUDS/nanobot/pull/1585).
  - feat(providers): Mistral Provider và Voxtral Audio — PR #1390 (Đã đóng) — mở rộng providers và chuẩn bị cho audio transcription (link: https://github.com/HKUDS/nanobot/pull/1390).
  - feat(providers): debug log cho LLM responses — PR #1374 (Đã đóng) — cải thiện khả năng debug LLM (link: https://github.com/HKUDS/nanobot/pull/1374).
  - mem0 memory integration — PR #1632 (Đã đóng) — tích hợp bộ nhớ thay thế (link: https://github.com/HKUDS/nanobot/pull/1632).
- PR đang chờ review/merge (đáng chú ý, có khả năng vào bản tiếp theo):
  - #1665 Improve long-workflow context retention (pin memory / long-task handling) — https://github.com/HKUDS/nanobot/pull/1665
  - #1673 Local transcription support (generalize TranscriptionProvider) — https://github.com/HKUDS/nanobot/pull/1673
  - #1668 Discord replyToMessage parity with Telegram — https://github.com/HKUDS/nanobot/pull/1668
  - #1667 QQ: send local image support — https://github.com/HKUDS/nanobot/pull/1667
  - #1666 Reinjecting images on subsequent turns — https://github.com/HKUDS/nanobot/pull/1666
  - #1657 Split LLM debug logs by call type (observability) — https://github.com/HKUDS/nanobot/pull/1657
  - #1659 Fix CLI I/O conflict with background subagents — https://github.com/HKUDS/nanobot/pull/1659

Chủ đề nóng trong cộng đồng (issues/PRs hoạt động nhất)
- “How Do I content the Ollama” — Issue #75 (18 bình luận): thảo luận cấu hình Ollama và ví dụ config; thể hiện nhu cầu rõ ràng về tài liệu/ ví dụ cho Ollama. Link: https://github.com/HKUDS/nanobot/issues/75
- “Ollama api support?” — Issue #193 (11 bình luận): yêu cầu hỗ trợ API Ollama thay vì chỉ vLLM; người dùng mong muốn tích hợp Ollama làm provider. Link: https://github.com/HKUDS/nanobot/issues/193
- “Multi agents setup - Supported ?” — Issue #222 (10 bình luận, +5 reactions): nhiều người hỏi cách cấu hình multi-agent / nhiều workspace và mong có hướng dẫn chính thức. Link: https://github.com/HKUDS/nanobot/issues/222
- “WebSocket 连接报 SSL CERTIFICATE_VERIFY_FAILED (uv 环境)” — Issue #1519 (6 bình luận, đã đóng): báo lỗi SSL trong môi trường uv, root cause và giải pháp (systemd inject cert vars) đã được ghi lại. Link: https://github.com/HKUDS/nanobot/issues/1519
Phân tích nhu cầu cơ bản: cộng đồng đang cần (1) tích hợp thêm providers (Ollama, Kilo, Mistral…), (2) tài liệu/mẫu cấu hình cho multi‑agent và kênh, (3) xử lý media (gửi/nhận ảnh/âm thanh) và (4) hướng dẫn vận hành self‑host (SSL, vLLM routing).

Lỗi & Ổn định — xếp hạng theo mức độ nghiêm trọng
- Cao
  - Session corruption when switching providers: tool call IDs exceed OpenAI Responses 64‑char limit — Issue #1634 (mất session, cần /new để khôi phục). Link: https://github.com/HKUDS/nanobot/issues/1634 — tác động lớn tới phiên hội thoại, cần fix provider interop.
  - Session stuck even after manual memory deletion (GLM-4.7 cloud model) — Issue #1640 — agent bị kẹt persistent context. Link: https://github.com/HKUDS/nanobot/issues/1640
- Trung bình
  - 使用openrouter的StepFun模型报400错误 (Openrouter StepFun returns 400) — Issue #1157 — gây lỗi LLM calls với một provider cụ thể. Link: https://github.com/HKUDS/nanobot/issues/1157
  - Kimi K2.5 (Moonshot) không nhận ảnh/video do LiteLLM flatten messages — Issue #1628 — liên quan dependency litellm, có PRs để khắc phục bằng nâng cấp litellm. Link: https://github.com/HKUDS/nanobot/issues/1628
  - Unable to use Web Search via Brave API — Issue #1537 — config/api key usage problem. Link: https://github.com/HKUDS/nanobot/issues/1537
- Thấp / Tác động nhỏ nhưng gây phiền toái
  - Gateway not binding to 18790 (port binding) — Issue #510 — môi trường container/networking. Link: https://github.com/HKUDS/nanobot/issues/510
  - Cron jobs use two different storage locations (workspace vs config dir) — Issue #1649 — dẫn tới job CLI không chạy khi gateway active. Link: https://github.com/HKUDS/nanobot/issues/1649
- Ghi chú về PR sửa lỗi:
  - #1667 (QQ local image) đang partial fix cho #1662 (QQ files/images not sent): https://github.com/HKUDS/nanobot/pull/1667
  - #1666 (Reinjecting images) hướng tới sửa trải nghiệm ảnh bị “chỉ thấy 1 lần”: https://github.com/HKUDS/nanobot/pull/1666
  - #1519 (SSL CERTIFICATE_VERIFY_FAILED) đã có hướng giải quyết trong issue #1519 (đã đóng): https://github.com/HKUDS/nanobot/issues/1519
  - #1655 & #1656 và #1660 chứa các fix nhỏ về hiển thị reasoning, validation None và Telegram stop command.

Yêu cầu tính năng & tín hiệu lộ trình
- Mô hình theo task (task-specific model config) — Issue #912: nhiều người muốn cấu hình model khác nhau cho conversational / tool / browser tasks. Link: https://github.com/HKUDS/nanobot/issues/912
- Multi‑agent / multi‑workspace support và hướng dẫn chính thức — #222, #1642. Link: https://github.com/HKUDS/nanobot/issues/222, https://github.com/HKUDS/nanobot/issues/1642
- Session‑affinity / vLLM routing để giữ prefix‑cache locality — #1645. Link: https://github.com/HKUDS/nanobot/issues/1645
- Transcription/local ASR support (PR #1673) và audio transcription (PRs liên quan): xu hướng tích hợp transcription cục bộ cho privacy/perf. Link PR: https://github.com/HKUDS/nanobot/pull/1673
- Provider mở rộng: Kilo, Mistral, AtomGit, NanoGPT — biểu hiện rõ qua nhiều PR (#1674, #1390, #1661, #1035). Links: https://github.com/HKUDS/nanobot/pull/1674, https://github.com/HKUDS/nanobot/pull/1390, https://github.com/HKUDS/nanobot/pull/1661, https://github.com/HKUDS/nanobot/pull/1035
- Observability: tách LLM debug logs theo call type (#1657) và debug response logging (#1374) — tín hiệu rằng maintainers ưu tiên khả năng debug cho self‑host.

Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Provider interoperability: lỗi call_id length / session corruption khi chuyển provider (OpenAI Codex / Responses API) — gây trải nghiệm hỏng session (#1623, #1634).
  - Thiếu/thiếu rõ ràng tài liệu cấu hình cho providers (Ollama) và multi‑agent: nhiều issue hỏi cách cấu hình mẫu (#75, #193, #222).
  - Media handling: QQ/WhatsApp/Discord có vấn đề với gửi/nhận file, ảnh/âm thanh hoặc reply behavior (#1662, #1672, #1663).
  - Self‑host vận hành: SSL cert trong uv env (#1519) và vLLM routing/session affinity (#1645) gây khó khăn khi scale.
- Mức độ hài lòng: cộng đồng đánh giá tích cực về tính năng và tốc độ phát triển, nhưng thất vọng về các lỗi provider/interop và thiếu doc cho các setup phức tạp.

Theo dõi tồn đọng (cần maintainers / reviewer chú ý)
- Issues quan trọng cần phản hồi/điều tra:
  - #1634 Session corruption when switching providers — https://github.com/HKUDS/nanobot/issues/1634
  - #1640 Session stuck (GLM-4.7 cloud) — https://github.com/HKUDS/nanobot/issues/1640
  - #1157 Openrouter StepFun 400 error — https://github.com/HKUDS/nanobot/issues/1157
  - #1649 Cron jobs storage inconsistency — https://github.com/HKUDS/nanobot/issues/1649
  - #75 How Do I content the Ollama — https://github.com/HKUDS/nanobot/issues/75
  - #193 Ollama api support? — https://github.com/HKUDS/nanobot/issues/193
  - #222 Multi agents setup - Supported ? — https://github.com/HKUDS/nanobot/issues/222
- PRs cần review / có ảnh hưởng lớn đang chờ:
  - #1665 improve long-workflow context retention — https://github.com/HKUDS/nanobot/pull/1665
  - #1673 Local transcription support — https://github.com/HKUDS/nanobot/pull/1673
  - #1668 Discord replyToMessage parity — https://github.com/HKUDS/nanobot/pull/1668
  - #1667 QQ: send local image support — https://github.com/HKUDS/nanobot/pull/1667
  - #1666 Reinjecting images on subsequent turns — https://github.com/HKUDS/nanobot/pull/1666
  - #1657 Observability: split LLM debug logs — https://github.com/HKUDS/nanobot/pull/1657
  - #1659 CLI I/O conflict fix — https://github.com/HKUDS/nanobot/pull/1659
  - #1641 Feishu attachment extraction hardening — https://github.com/HKUDS/nanobot/pull/1641

Kết luận ngắn
- Nanobot đang trong giai đoạn phát triển nhanh với nhiều đóng góp về providers, media handling và observability. Tuy nhiên một số vấn đề nghiêm trọng liên quan tới provider interoperability và session management cần ưu tiên để tránh trải nghiệm người dùng bị gián đoạn. Đề nghị maintainers tập trung review các PR liên quan đến providers, image/media reinjection, và fixes cho session/call_id; đồng thời bổ sung hướng dẫn cấu hình cho Ollama và multi‑agent để giảm lượng issue lặp lại.

(Tham khảo dữ liệu GitHub: issues & PRs trích nguồn từ repository NanoBot — https://github.com/HKUDS/nanobot)

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

1) Tổng quan hôm nay  
- Hoạt động phát triển rất cao: trong 24 giờ qua có 15 issue được cập nhật (11 mở/hoạt động, 4 đã đóng) và 50 PR cập nhật (32 mở, 18 đã merge/đóng).  
- Nhiều thay đổi liên quan đến backend bộ nhớ (cortex-mem), xác thực OAuth và cải tiến kênh (MQTT, Matrix) đang được thảo luận/đóng góp.  
- Đồng thời có một số sự cố nghiêm trọng ảnh hưởng trải nghiệm (WebUI, WebSocket, lỗi cài đặt Docker/installer) đang tồn tại và cần ưu tiên xử lý.  
- Tổng thể: cộng đồng tích cực nhưng có dấu hiệu cần tăng tốc phản hồi cho các issue có mức độ nghiêm trọng cao.

2) Phát hành phiên bản  
- Không có phiên bản mới hôm nay. Lưu ý: có issue báo rằng tag v0.1.8 thiếu binary assets và làm hỏng script cài đặt chính thức — cần fix trước khi release script được dùng rộng rãi: https://github.com/zeroclaw-labs/zeroclaw/issues/2921

3) Tiến độ dự án (PRs đã merge/đóng hôm nay & những điểm nổi bật)  
- PR đã đóng/merge hôm nay (chốt từ dữ liệu):  
  - fix(tools): declare items for channel_ack_config rules schema — PR #2710 (closed) https://github.com/zeroclaw-labs/zeroclaw/pull/2710  
  - Feature/cortex memory as optional memory backend — PR #2946 (closed) và kèm PR #2945 (closed) do @sopaco (nhiều thay đổi liên quan tới tích hợp Cortex Memory) https://github.com/zeroclaw-labs/zeroclaw/pull/2946 https://github.com/zeroclaw-labs/zeroclaw/pull/2945  
  - feat(memory) optional profile & bridge — PR #2250 (closed) https://github.com/zeroclaw-labs/zeroclaw/pull/2250  
  - Claude/remove firmware… — PR #2939 (closed) https://github.com/zeroclaw-labs/zeroclaw/pull/2939  
- PR đang hoạt động đáng chú ý (mức ảnh hưởng / tính năng):  
  - Add Cortex Memory (tiếp tục): PR #2948 (open) https://github.com/zeroclaw-labs/zeroclaw/pull/2948  
  - Provider-neutral onboarding + dashboard v0.1.9 (release PR): #2890 (open) https://github.com/zeroclaw-labs/zeroclaw/pull/2890  
  - OAuth model-fetch / token keepalive: #2911 (open) và #2942 (open) https://github.com/zeroclaw-labs/zeroclaw/pull/2911 https://github.com/zeroclaw-labs/zeroclaw/pull/2942  
  - MQTT channel implementation: #2940 (open) https://github.com/zeroclaw-labs/zeroclaw/pull/2940

4) Chủ đề nóng trong cộng đồng (những issue/PR nhiều tương tác)  
- Community update — thông điệp công khai về tình hình và xin lỗi cộng đồng: Issue #2922 (2 bình luận, +11 👍). Nêu nhu cầu minh bạch và kêu gọi phối hợp: https://github.com/zeroclaw-labs/zeroclaw/issues/2922  
- v0.1.8 release has no binary assets — tạo gián đoạn cài đặt cho người dùng: Issue #2921 (4 bình luận): https://github.com/zeroclaw-labs/zeroclaw/issues/2921  
- Compilation error in lark.rs (đã đóng) — build bị block khi bật feature channel-lark, trước đây gây block workflow: Issue #1717 (closed): https://github.com/zeroclaw-labs/zeroclaw/issues/1717  
- Discord websocket stops after first message — báo cáo nghiêm trọng về kênh Discord: Issue #2896 (open): https://github.com/zeroclaw-labs/zeroclaw/issues/2896

Nhận xét ngắn: các chủ đề nóng tập trung vào tính ổn định runtime (WebSocket, WebUI, Docker/installer) và trải nghiệm onboarding / release (binaries, provider defaults).  

5) Lỗi & Ổn định — xếp hạng theo mức độ nghiêm trọng (S0 = cao nhất)
- S0 (data loss / service outage / trải nghiệm bị chặn):  
  - Discord websocket gateway dừng nhận events sau vòng tin nhắn đầu tiên — Issue #2896 (open): https://github.com/zeroclaw-labs/zeroclaw/issues/2896  
  - webui agent không hoạt động trên v0.1.8 (Connection error… Attempting to reconnect…) — Issue #2910 (open): https://github.com/zeroclaw-labs/zeroclaw/issues/2910  
  - local llama docker fails; interactive onboard chuyển sang open router — Issue #2924 (open): https://github.com/zeroclaw-labs/zeroclaw/issues/2924
- S1 (workflow blocked / cản trở triển khai):  
  - Compilation error in lark.rs khi build với feature channel-lark — Issue #1717 (CLOSED, đã xử lý) https://github.com/zeroclaw-labs/zeroclaw/issues/1717  
  - bootstrap.sh --docker lỗi “Unbound variable” trên macOS — Issue #2930 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2930  
  - Web config saving (docker/WSL) trả HTTP 500 khi lưu config.toml — Issue #2947 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2947
- S2 (degraded behavior):  
  - thiếu flag channel-matrix trong bản build chính thức → không thể dùng Matrix — Issue #2953 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2953  
  - open-skills audit failures (đã đóng) — Issue #1391 (closed) https://github.com/zeroclaw-labs/zeroclaw/issues/1391
- Ghi chú về PR sửa lỗi: một số fix đã được merged/closed (ví dụ lark.rs fix đóng issue #1717 và các PR liên quan đến cortex-mem đã có PR đóng/merge), nhưng một số lỗi runtime quan trọng vẫn chưa có PR hợp lệ/merge (Discord, WebUI, Docker bootstrap).

6) Yêu cầu tính năng & tín hiệu lộ trình
- Tích hợp Cortex-Memory như optional backend (đã có nhiều PR từ @sopaco; phần lớn code được PR/merged/đóng nhưng còn PR mở tiếp tục) — PR #2948 (open) và PRs đã đóng #2946/#2945: https://github.com/zeroclaw-labs/zeroclaw/pull/2948 https://github.com/zeroclaw-labs/zeroclaw/pull/2946  
- Kênh mới: MQTT channel implementation — PR #2940 (open): https://github.com/zeroclaw-labs/zeroclaw/pull/2940  
- Provider/onboarding: provider-neutral onboarding & UI dashboard v0.1.9 — PR #2890 (open): https://github.com/zeroclaw-labs/zeroclaw/pull/2890  
- OAuth & token management: model fetch bằng OAuth bearer và background token keepalive — PR #2911, #2942 (open): https://github.com/zeroclaw-labs/zeroclaw/pull/2911 https://github.com/zeroclaw-labs/zeroclaw/pull/2942  
- Các yêu cầu nhỏ nhưng có tần suất cao: configurable provider HTTP timeout (#2926), hỗ trợ prefix provider_api (`openai-`), Matrix flag trong builds (#2953), movie extension (#2951).  
Dự đoán lộ trình: bản phát hành tiếp theo nhiều khả năng tập trung vào ổn định runtime (WebSocket/WebUI/Docker fixes), hoàn thiện tích hợp memory backend (cortex-mem) và cải thiện onboarding/provider/auth flows.

7) Tóm tắt phản hồi người dùng  
- Điểm đau chính: cài đặt/gỡ rối (missing binaries cho release, bootstrap.sh trên macOS), kết nối kênh (WebSocket/Discord/MQTT/Matrix), và WebUI/config lưu không ổn định — những vấn đề này trực tiếp ảnh hưởng khả năng self-hosted trải nghiệm. (ví dụ #2921, #2930, #2896, #2947)  
- Yêu cầu chức năng: người dùng muốn backend nhớ mạnh hơn (layered memory), tuỳ chỉnh timeout cho các provider, và tích hợp kênh/skill đa dạng (MQTT, Matrix, Gemini tools).  
- Tâm lý: mặc dù có một số than phiền về trải nghiệm cài đặt/conn, cộng đồng vẫn tích cực đóng góp PR/issue; có dấu hiệu tin tưởng nếu các vấn đề then chốt được xử lý (phản hồi +11 trên message community update #2922 cho thấy mong muốn minh bạch): https://github.com/zeroclaw-labs/zeroclaw/issues/2922

8) Theo dõi tồn đọng (cần ưu tiên/attention của maintainer)
- Vấn đề runtime/độ trầm trọng cao (ưu tiên):  
  - Discord websocket dừng sau tin nhắn đầu tiên — Issue #2896 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2896  
  - webui agent không hoạt động trên v0.1.8 — Issue #2910 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2910  
  - v0.1.8 release thiếu binary assets (làm hỏng installer) — Issue #2921 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2921  
  - local llama docker/interactive onboard fail (chuyển sang open router) — Issue #2924 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2924  
- Các bug/edge-case cần fix sớm:  
  - bootstrap.sh --docker Unbound variable trên macOS — Issue #2930 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2930  
  - web_fetch allowed_domains serde default bug (khởi tạo thành vec![] khi người dùng đặt chỉ enabled=true) — Issue #2941 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2941  
  - thiếu flag channel-matrix trong build chính thức — Issue #2953 (open) https://github.com/zeroclaw-labs/zeroclaw/issues/2953  
- PR lớn cần review / quyết định merge:  
  - Provider-neutral onboarding & v0.1.9 release PR #2890 (open) https://github.com/zeroclaw-labs/zeroclaw/pull/2890  
  - Cortex Memory integration (còn PR mở #2948) https://github.com/zeroclaw-labs/zeroclaw/pull/2948  
  - MQTT channel implementation #2940 (open) https://github.com/zeroclaw-labs/zeroclaw/pull/2940  
  - WebSocket handshake fix (PR #2586) — liên quan trực tiếp đến lỗi WebSocket trên UI: https://github.com/zeroclaw-labs/zeroclaw/pull/2586

Kết luận ngắn: dự án đang rất năng động với nhiều đóng góp tính năng quan trọng (memory backend, channel, auth improvements), nhưng phải ưu tiên xử lý các vấn đề ổn định và trải nghiệm cài đặt để tránh ảnh hưởng lan rộng tới người dùng self-hosted. Những issue S0/S1 nêu trên cần được gán người chịu trách nhiệm và có tiến trình rõ ràng trong 48–72 giờ để giữ đà phát triển cộng đồng.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

PicoClaw — Bản tin dự án (2026-03-07)

1) Tổng quan hôm nay
- Hoạt động cộng đồng cao: trong 24 giờ qua có 18 issue được cập nhật (13 mở/đang hoạt động, 5 đã đóng) và 48 PR được cập nhật (35 mở, 13 đã merge/đóng).  
- Không có phiên bản phát hành mới. Các hoạt động chủ yếu tập trung vào tương thích provider cục bộ (Ollama / modelscope), trải nghiệm kênh (Telegram/QQ/Feishu) và sửa các hồi quy về agent/đồng bộ hóa tác vụ.  
- Dự án có dòng PR tương đối nhiều (nhiều PR tính năng/tiện ích đang chờ review) cho thấy cộng đồng đóng góp tích cực nhưng cần tăng tốc review để đưa về nhánh chính.

2) Phát hành phiên bản
- Không có phiên bản mới trong bản tin này.

3) Tiến độ dự án (PRs đã merge/đóng hôm nay và thay đổi đáng chú ý)
- Một số PR sửa lỗi và tính năng đã được đóng/merge trong 24 giờ vừa qua:
  - fix: reasoning content fallback — sửa lỗi trả về content rỗng khi reasoning dùng hết token (PR #992, closed) — liên quan đến issue #966. Link: https://github.com/sipeed/picoclaw/pull/992
  - Fix recurring cron jobs regression — sửa lỗi cron trở thành task một lần (PR #1128, closed). Link: https://github.com/sipeed/picoclaw/pull/1128
  - Thêm IRC channel (PR #1138, closed) — mở rộng kênh giao tiếp. Link: https://github.com/sipeed/picoclaw/pull/1138
  - Docs và provider cleanup (PR #426, #424, closed) — cập nhật README và thông tin provider. Links: https://github.com/sipeed/picoclaw/pull/426, https://github.com/sipeed/picoclaw/pull/424
  - Sửa lỗi: background task results bị bỏ qua (PR #1143, closed). Link: https://github.com/sipeed/picoclaw/pull/1143
- PR đáng chú ý đang chờ review/merge (đang được cộng đồng/maintainers xử lý):
  - Telegram streaming: stream token tới Telegram bằng sendMessageDraft (PR #1101, open). Link: https://github.com/sipeed/picoclaw/pull/1101
  - JSONL persistence tích hợp vào vòng đời agent (PR #1170, open). Link: https://github.com/sipeed/picoclaw/pull/1170
  - pico_client outbound WebSocket channel (PR #1198, open). Link: https://github.com/sipeed/picoclaw/pull/1198
  - QQ channel nâng cấp (group/typing/media) (PR #1208, open). Link: https://github.com/sipeed/picoclaw/pull/1208
  - fix exec workspace guard để cho phép URL (PR #1178, open) — liên quan tới issue #1203. Link: https://github.com/sipeed/picoclaw/pull/1178
  - Hỗ trợ Vivgrid provider (PR #1100, open). Link: https://github.com/sipeed/picoclaw/pull/1100

4) Chủ đề nóng trong cộng đồng
- Cấu hình Ollama / vận hành local models: issue #1161 (open, 11 bình luận) — người dùng không nhận được phản hồi cuối cùng khi cấu hình Ollama local. Đây là vấn đề quan trọng với người muốn chạy hoàn toàn offline. Link: https://github.com/sipeed/picoclaw/issues/1161
- Telegram realtime streaming: feature request #1098 (issue) + PR #1101 (open) nhằm thay thế trạng thái “Thinking…” bằng streaming token thật — nhu cầu UX rõ rệt cho trợ lý chat. Issue: https://github.com/sipeed/picoclaw/issues/1098 — PR: https://github.com/sipeed/picoclaw/pull/1101
- Chạy trong môi trường air-gapped (local-only Ollama): issue #1204 (open) đề xuất lazy-loading provider để cho phép chạy không cần cloud — điều này ăn khớp với nhu cầu bảo mật/offline. Link: https://github.com/sipeed/picoclaw/issues/1204
- Duplicate model_name fallback bug: issue #1153 (open) mô tả fallback/load-balancing không đúng khi trùng model_name — ảnh hưởng tới cấu hình đa provider. Link: https://github.com/sipeed/picoclaw/issues/1153

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao
  - Local Ollama models không trả về response hoàn chỉnh (issue #1161, open) — chặn use-case chạy toàn bộ offline. Link: https://github.com/sipeed/picoclaw/issues/1161
  - Timeouts / context deadline exceeded khi chạy agent one-shot (issue #1209, open) — ảnh hưởng tới khả năng chạy lệnh đơn giản; cần log/timeout tuning. Link: https://github.com/sipeed/picoclaw/issues/1209
- Trung bình
  - Safety guard chặn lệnh chứa URL (issue #1203, open) — chặn công cụ như agent-browser open URL; PR #1178 đang xử lý. Issue: https://github.com/sipeed/picoclaw/issues/1203 — PR fix: https://github.com/sipeed/picoclaw/pull/1178
  - Duplicate model_name fallback (issue #1153, open) — có nguy cơ làm mất cân bằng hoặc ưu tiên nhầm provider cho model names. Link: https://github.com/sipeed/picoclaw/issues/1153
- Thấp / UX
  - Telegram “đang nhập…” bị kẹt sau nhiều tin nhắn (issue #1212, open) — ảnh hưởng trải nghiệm người dùng kênh Telegram. Link: https://github.com/sipeed/picoclaw/issues/1212
  - Modelscope / deepseek provider lỗi cấu hình, lỗi API trả về mã 400 (issues #1102/#1103) — đã có một issue đóng (#1103 closed) và cần follow-up nếu còn tái hiện. Links: https://github.com/sipeed/picoclaw/issues/1102, https://github.com/sipeed/picoclaw/issues/1103
- Ghi chú sửa lỗi đã có PR:
  - Reasoning content fallback fix (PR #992) giải quyết issue #966 (closed). Link: https://github.com/sipeed/picoclaw/pull/992 / https://github.com/sipeed/picoclaw/issues/966
  - Exec workspace guard fix (PR #1178) đang chờ merge để giải quyết blocking URL (issue #1203). Link: https://github.com/sipeed/picoclaw/pull/1178

6) Yêu cầu tính năng & tín hiệu lộ trình
- Realtime/streaming trả lời cho Telegram (nhu cầu mạnh, PR #1101 đang chờ review). Link: https://github.com/sipeed/picoclaw/pull/1101
- Hỗ trợ client-mode pico (pico_client) để kết nối outbound WebSocket — dùng cho bridging/distributed deployments (PR #1198). Link: https://github.com/sipeed/picoclaw/pull/1198
- JSONL session persistence tích hợp vào agent loop (PR #1170) — cải thiện hiệu suất và bền vững bộ nhớ. Link: https://github.com/sipeed/picoclaw/pull/1170
- Nâng cấp kênh QQ/Feishu: nhóm, typing, media, tách message theo bảng (PR #1208, #1175). Links: https://github.com/sipeed/picoclaw/pull/1208, https://github.com/sipeed/picoclaw/pull/1175
- Air-gapped / lazy provider loading để chạy hoàn toàn local (issue #1204). Link: https://github.com/sipeed/picoclaw/issues/1204
- Cấu hình fallback cho API provider (issue #1213 hỏi cách thiết lập) — người dùng cần hướng dẫn rõ ràng về fallback chaining. Link: https://github.com/sipeed/picoclaw/issues/1213

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Chạy provider cục bộ/offline (Ollama, ModelScope/deepseek) khó cấu hình, dễ gặp lỗi không rõ nguyên nhân — người dùng mong muốn ví dụ cấu hình rõ ràng và lazy-loading provider. (issues #1161, #1102/#1103, #1204)
  - Tương thích endpoint OpenAI-compat: các endpoint trả về HTML hoặc chặn trường không mong muốn gây lỗi không rõ (issue #1068; đã có PR cải thiện thông báo lỗi #1075). Links: https://github.com/sipeed/picoclaw/issues/1068, https://github.com/sipeed/picoclaw/pull/1075
  - Trải nghiệm kênh (Telegram/QQ/Feishu): cần streaming, chỉ báo typing đúng, tách message quá dài/bảng — ảnh hưởng trực tiếp UX. (issues/PRs liên quan #1098/#1101, #1212, #1208, #1175)
  - Khó debug do logs bị truncate — PR #1207 thêm flag --no-truncate nhằm cải thiện trải nghiệm debug. Link: https://github.com/sipeed/picoclaw/pull/1207
- Mức độ hài lòng: người dùng tích cực đóng góp PRs và issues; họ đánh giá cao fix nhanh (vài PR đã đóng), nhưng vẫn còn phản hồi tiêu cực do cấu hình local và lỗi UX kênh.

8) Theo dõi tồn đọng (cần sự chú ý của maintainer)
- Issues cần phản hồi / điều tra sâu:
  - #1161 — Ollama local models không trả response hoàn chỉnh (11 bình luận) — ưu tiên cao. Link: https://github.com/sipeed/picoclaw/issues/1161
  - #1153 — Duplicate model_name fallback hành vi không như mong đợi — có thể ảnh hưởng đến load-balancing/config. Link: https://github.com/sipeed/picoclaw/issues/1153
  - #1204 — Yêu cầu support air-gapped lazy-loading provider — liên quan việc cho phép chạy chỉ với Ollama. Link: https://github.com/sipeed/picoclaw/issues/1204
  - #1213 — Hướng dẫn thiết lập API fallbacks (tài liệu) — khuyến nghị bổ sung docs. Link: https://github.com/sipeed/picoclaw/issues/1213
  - #1209 — Timeout / context deadline exceeded khi chạy agent one-shot — cần thêm logs/timeout config docs. Link: https://github.com/sipeed/picoclaw/issues/1209
- PRs quan trọng đang chờ review/merge:
  - #1101 Telegram streaming — cải thiện UX lớn. Link: https://github.com/sipeed/picoclaw/pull/1101
  - #1170 JSONL session persistence — ảnh hưởng tới bền vững dữ liệu. Link: https://github.com/sipeed/picoclaw/pull/1170
  - #1198 pico_client outbound channel — mở thêm kịch bản tích hợp. Link: https://github.com/sipeed/picoclaw/pull/1198
  - #1208 QQ channel enhancement — nhiều cải tiến kênh. Link: https://github.com/sipeed/picoclaw/pull/1208
  - #1178 exec workspace guard — xử lý bug chặn URL trong lệnh. Link: https://github.com/sipeed/picoclaw/pull/1178

Kết luận ngắn gọn
- Sức khỏe dự án: năng động, nhiều đóng góp nhưng cần tăng tốc review và tập trung vào một số vấn đề trọng tâm (hỗ trợ provider cục bộ/Ollama, cải thiện UX kênh Telegram, sửa các guard blocking).  
- Gợi ý hành động ưu tiên: (1) điều tra và fix #1161 (Ollama), (2) review/merge PR #1101 và #1178 để cải thiện UX/thiết thực kênh, (3) hoàn thiện docs về provider fallback & offline setup (#1213, #1204).

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

1) Tổng quan hôm nay
- NanoClaw đang hoạt động tích cực: 24 giờ qua có 33 PR được cập nhật (23 mở, 10 đã merge/đóng) và 16 issue có hoạt động (7 mở, 9 đóng). Hoạt động tập trung mạnh vào việc mở rộng kênh giao tiếp (Feishu, QQ, Matrix, Signal), tích hợp runtime/LLM thay thế và cải thiện bảo mật/quan sát.
- Dự án có lượng đóng góp tính năng lớn từ cộng đồng (nhiều PR skill mới) nhưng đồng thời xuất hiện các vấn đề bảo mật và vận hành (quyền file trong container, quản lý secrets, OAuth token hết hạn).
- Không có phát hành (release) mới hôm nay.

2) Phát hành phiên bản
- Không có phiên bản mới để báo cáo.

3) Tiến độ dự án
- PR đã merge/đóng gần đây (tổng 10 trong 24h theo metadata); những PR được đóng/merge hiển thị gồm:
  - fix: preempt active container when scheduled task is enqueued (PR #296) — xử lý tiền lệ khi task theo lịch bị trì hoãn bởi container đang idle (đã đóng) (https://github.com/qwibitai/nanoclaw/pull/296)
  - feat: add /use-avian skill for Avian LLM provider (PR #549) — thêm skill chuyển sang Avian (đã đóng) (https://github.com/qwibitai/nanoclaw/pull/549)
  - next version (PR #787) — PR quản lý phiên bản (đã đóng) (https://github.com/qwibitai/nanoclaw/pull/787)
- PR đang tích cực review/merge (đáng chú ý):
  - /setup-secrets cho sops+age (PR #795) — thêm skill mã hóa .env bằng sops+age (https://github.com/qwibitai/nanoclaw/pull/795)
  - Thêm nhiều kênh/skills mới: QQ Bot (PR #796), Feishu (PR #671), Matrix (PR #791), Signal + reactions (PR #784), import-clawhub (PR #786), add-llamacpp-tool (PR #762) — cho thấy hướng mở rộng đa-runtime/kênh và local model (https://github.com/qwibitai/nanoclaw/pull/796, https://github.com/qwibitai/nanoclaw/pull/671, https://github.com/qwibitai/nanoclaw/pull/791, https://github.com/qwibitai/nanoclaw/pull/784, https://github.com/qwibitai/nanoclaw/pull/786, https://github.com/qwibitai/nanoclaw/pull/762)
- Một số PR bị block hoặc cần thảo luận (ví dụ #412, #744, #785) — yêu cầu review/triage trước khi merge.

4) Chủ đề nóng trong cộng đồng
- Hỗ trợ runtime ngoài Claude (Issue #80) — đề xuất mở rộng để dùng opencode, codex, gemini, vv. (17 bình luận, 36 👍) (https://github.com/qwibitai/nanoclaw/issues/80). Nhu cầu cơ bản: giảm phụ thuộc nhà cung cấp, chống rủi ro ngừng dịch vụ/BYO của Anthropic.
- Quyền/permissions container khi host chạy root (Issue #777) — container EACCES/ENOENT do mismatch UID giữa host root và user trong container (High) (https://github.com/qwibitai/nanoclaw/issues/777). Nhu cầu: vận hành an toàn theo systemd/host root.
- Quản lý secrets không đồng nhất (Issue #709) — allowlist vs subprocess blocklist có thể diverge, rủi ro rò rỉ secrets (High) (https://github.com/qwibitai/nanoclaw/issues/709).
- Bảo mật kỹ năng theo khả năng (Capability-based skills) (Issue #779) — đề xuất manifest capability cho skills (network/fs/env) (https://github.com/qwibitai/nanoclaw/issues/779). Nhu cầu: chính sách ít quyền nhất cho skills containerized.

5) Lỗi & Ổn định (xếp theo mức độ)
- Critical / High
  - DB queries fetch unbounded message history — no LIMIT (Issue #692) — (đã đóng) (https://github.com/qwibitai/nanoclaw/issues/692). Tác động: truy vấn lớn, OOM/độ trễ; hiện đã đóng (kiểm tra patch/PR tương ứng để xác nhận).
  - fix: container EACCES/ENOENT when host runs as root (Issue #777) — mở, High; cần patch để chown/debug dir và IPC input dir (https://github.com/qwibitai/nanoclaw/issues/777).
  - Risk of secret env var management diverging (Issue #709) — mở, High; có liên quan trực tiếp đến bảo mật runtime (https://github.com/qwibitai/nanoclaw/issues/709).
- Medium
  - schedule_task thiếu idempotency (Issue #783) — gây duplicate scheduled tasks (https://github.com/qwibitai/nanoclaw/issues/783).
  - pairing code expires before display (Issue #747) — đã đóng; root cause và fix được áp dụng (https://github.com/qwibitai/nanoclaw/issues/747).
- PR sửa lỗi liên quan:
  - fix: pause task on group-not-found to prevent infinite retry (PR #792) — open, đang chờ review; liên quan đến scheduler (https://github.com/qwibitai/nanoclaw/pull/792).
  - fix(ipc): distinguish task-not-found from unauthorized (PR #789) — open, giảm nhầm lẫn báo lỗi ở agent (https://github.com/qwibitai/nanoclaw/pull/789).
  - fix(auth): read OAuth token from ~/.claude/.credentials.json to fix daily 401s (PR #785) — open/blocked; khắc phục token expired (https://github.com/qwibitai/nanoclaw/pull/785).

6) Yêu cầu tính năng & tín hiệu lộ trình
- Các requests/tendencies nổi bật:
  - Hỗ trợ nhiều runtime/LLM (Issue #80) và skills tích hợp Avian/llama.cpp/Ollama/llamacpp (PRs #549, #762): tín hiệu rõ ràng muốn giảm phụ thuộc Claude/Anthropic và hỗ trợ inference cục bộ (https://github.com/qwibitai/nanoclaw/issues/80, https://github.com/qwibitai/nanoclaw/pull/762).
  - Quản lý secrets an toàn (PR #795 cho sops+age) và fix OAuth token (PR #785): người dùng muốn workflow deploy an toàn không phụ thuộc dịch vụ bên ngoài (https://github.com/qwibitai/nanoclaw/pull/795, https://github.com/qwibitai/nanoclaw/pull/785).
  - Capability-based skill model (Issue #779) — khả năng chính sách runtime granular để giảm bề mặt tấn công (https://github.com/qwibitai/nanoclaw/issues/779).
- Dự đoán: các tính năng nhiều khả năng xuất hiện trong release tiếp theo là multi-runtime support (hoặc adapter), local model/llamacpp integration, và cải thiện secrets/OAuth handling.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Vendor lock-in với Claude/Anthropic và rủi ro bị khóa/thu hồi quyền sử dụng (Issue #80, #782) — người dùng muốn lựa chọn provider khác (https://github.com/qwibitai/nanoclaw/issues/80, https://github.com/qwibitai/nanoclaw/issues/782).
  - Vấn đề vận hành: container permission khi host chạy root (Issue #777) gây crash/silent-fail — ảnh hưởng tới deploy trên VPS/systemd (https://github.com/qwibitai/nanoclaw/issues/777).
  - Quản lý secrets và token hết hạn (Issue #709, PR #785) làm hệ thống container gặp lỗi auth hàng ngày (https://github.com/qwibitai/nanoclaw/issues/709, https://github.com/qwibitai/nanoclaw/pull/785).
- Mức độ hài lòng: cộng đồng tích cực đóng góp tính năng mới, nhưng có lo ngại về an toàn vận hành và rò rỉ/khóa provider.

8) Theo dõi tồn đọng (cần chú ý của maintainers)
- Issue #80 — Support runtime(s) other than Claude — nhiều 👍 và thảo luận từ 2026-02-04: cần roadmap/position statement (https://github.com/qwibitai/nanoclaw/issues/80).
- Issue #777 — container EACCES/ENOENT when host runs as root — High, mới nhưng có tác động lớn; cần PR hotfix hoặc hướng dẫn vận hành tạm thời (https://github.com/qwibitai/nanoclaw/issues/777).
- Issue #709 — secret env var management divergence — High security risk; đề xuất refactor readSecrets/ subprocess blocklist (https://github.com/qwibitai/nanoclaw/issues/709).
- PR #785 — fix(auth) OAuth token handling — khắc phục lỗi 401 hàng ngày; hiện open/blocked (https://github.com/qwibitai/nanoclaw/pull/785).
- PRs tính năng lớn đang chờ review/block: #412 (host machine auth passthrough), #744 (S3 storage), #762 (llamacpp tool), #795 (sops+age). Những PR này định hướng roadmap — yêu cầu review/triage nhanh để giảm backlog (https://github.com/qwibitai/nanoclaw/pull/412, https://github.com/qwibitai/nanoclaw/pull/744, https://github.com/qwibitai/nanoclaw/pull/762, https://github.com/qwibitai/nanoclaw/pull/795).

Kết luận ngắn gọn: hoạt động phát triển đang mạnh về mở rộng kênh và hỗ trợ runtime/local model, đồng thời có vài vấn đề vận hành và bảo mật cần ưu tiên (container file permissions, secrets management, OAuth token). Đề nghị ưu tiên hotfix cho các lỗi High và đánh giá nhanh các PR liên quan đến secrets/OAuth và multi-runtime để giảm rủi ro cho người dùng.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Tổng quan hôm nay
- Hoạt động cộng đồng rất cao: trong 24 giờ qua có 30 issues mới/được cập nhật (23 mở/hoạt động, 7 đóng) và 50 PRs được cập nhật (24 mở, 26 merge/đóng). Đây là ngày có nhiều thay đổi liên quan đến ổn định runtime, WASM và backend libSQL.  
- Hai bản phát hành vừa tạo vào 2026-03-06 (v0.16.0 và v0.16.1) cho thấy nỗ lực sửa nhanh lỗi liên quan WASM artifacts và bổ sung test/CI; đồng thời nhiều PR lớn vẫn đang chờ review/merge.  
- Hoạt động tập trung mạnh ở mảng kênh (Telegram/Discord/WhatsApp), WASM tools/runtime, và backend libSQL — cả bugfix/ổn định lẫn các đề xuất refactor kiến trúc agent.  

Phát hành phiên bản
- v0.16.1 — 0.16.1 (2026-03-06)  
  - Fixed: revert WASM artifact SHA256 checksums to null. (PR: https://github.com/nearai/ironclaw/pull/627)  
  - Lưu ý cài đặt: có hướng dẫn cài prebuilt binary qua shell script trong release notes.  
  - Ảnh hưởng: bản vá này là sửa lỗi hẹp liên quan WASM artifacts; không báo cáo breaking change.
- v0.16.0 — 0.16.0 (2026-03-06)  
  - Added: e2e extensions tab tests, CI parallelization, 3 production bug fixes (PR: https://github.com/nearai/ironclaw/pull/584).  
  - Added: WASM extension versioning với WIT compat checks (PR: https://github.com/nearai/ironclaw/pull/592).  
  - Ghi chú: v0.16.x liên tục sửa lỗi WASM và nâng cấp test/CI; có PR release v0.17.0 đang mở (breaking, xem phần Theo dõi tồn đọng). (PR release: https://github.com/nearai/ironclaw/pull/633)

Tiến độ dự án (PRs đã merge/đóng đáng chú ý hôm nay)
- PRs đã đóng/merge (chọn lọc, hôm nay/đã cập nhật):  
  - perf: build system prompt once per turn, skip tools on force-text — merged/closed (https://github.com/nearai/ironclaw/pull/583) — cải thiện hiệu năng vòng agent.  
  - feat: enable Anthropic prompt caching via automatic cache_control injection — closed/merged (https://github.com/nearai/ironclaw/pull/660) — bật caching cho backend Anthropic, có thể giảm chi phí/latency.  
  - Improve test infrastructure: StubChannel, gateway helpers, security tests — closed/merged (https://github.com/nearai/ironclaw/pull/623) — củng cố test harness, giúp giảm regressions.  
  - fix(tests): replace hardcoded /tmp paths + add 300 unit tests — closed/merged (https://github.com/nearai/ironclaw/pull/659) — tăng tính ổn định CI.  
  - Một số PR lớn vẫn mở/chờ review (ví dụ: WASM attachments, unified thread model). Xem danh sách PR mở cho chi tiết (https://github.com/nearai/ironclaw/pulls).

Chủ đề nóng trong cộng đồng
- Telegram không có trong cài đặt mặc định và cài extension Telegram thất bại — Issue #602 (https://github.com/nearai/ironclaw/issues/602). Tác động: trải nghiệm cài đặt local bị ảnh hưởng; nhiều người dùng muốn tích hợp Telegram dễ dàng.  
- Panic trên Windows liên quan Instant overflow — Issue #657 (https://github.com/nearai/ironclaw/issues/657) → PR fix sẵn: https://github.com/nearai/ironclaw/pull/664 (replace toán tử trừ bằng checked_sub). Tác động: crash runtime trên máy Windows với uptime thấp.  
- Setup wizard: OpenAI-compatible model config không lưu API key (secrets_crypto không khởi tạo) — Issue #666 (https://github.com/nearai/ironclaw/issues/666) → PR fix: https://github.com/nearai/ironclaw/pull/669. Tác động: onboarding thất bại, người dùng không thể cấu hình LLM.  
- libSQL timestamps inconsistent / secrets gaps — Issue #663 (https://github.com/nearai/ironclaw/issues/663) và PR chuẩn hóa timestamp: https://github.com/nearai/ironclaw/pull/667. Ngoài timestamp, có issue lớn về thiếu secrets store và tích hợp vector search cho libSQL (#655: https://github.com/nearai/ironclaw/issues/655).  
- WASM runtime / channel proxy problems (Discord websocket không dùng hệ thống proxy) — Issue #658 (https://github.com/nearai/ironclaw/issues/658). Người dùng báo stuck ở “Awaiting Pairing” khi proxy bật cho macOS.

Lỗi & Ổn định — xếp hạng ngắn (High / Medium / Low)
- High
  - Telegram missing in default install (UX/feature regression) — #602 (https://github.com/nearai/ironclaw/issues/602). Ảnh hưởng lớn tới người dùng tích hợp kênh. Trạng thái: mở.  
  - Setup wizard không lưu API key (onboarding broken) — #666 (https://github.com/nearai/ironclaw/issues/666). PR fix đang mở: https://github.com/nearai/ironclaw/pull/669.  
  - libSQL backend thiếu secrets store & vector search gaps — #655 (https://github.com/nearai/ironclaw/issues/655). Ảnh hưởng: libSQL-only deployments thiếu các tính năng then chốt.
- Medium
  - Panic Instant duration overflow trên Windows — #657 (https://github.com/nearai/ironclaw/issues/657). PR fix: https://github.com/nearai/ironclaw/pull/664 (đã mở).  
  - Discord WebSocket không dùng system proxy (WASM runtime) — #658 (https://github.com/nearai/ironclaw/issues/658).  
  - WASM tool WIT bindgen metadata extraction & tool-to-tool invocation thiếu triển khai — #649 (https://github.com/nearai/ironclaw/issues/649). Ảnh hưởng: giảm khả năng introspect và compose tools.  
- Low
  - Cron expression format mismatch (5-field → needs 6-field quartz) — PR open to auto-convert: https://github.com/nearai/ironclaw/pull/668.  
  - Các dead code / hygiene issues (cleanup PRs đề xuất) — #648 (https://github.com/nearai/ironclaw/issues/648).

Yêu cầu tính năng & tín hiệu lộ trình
- Timezone-aware session context / client detection — #661 (https://github.com/nearai/ironclaw/issues/661). Rõ ràng nhiều người muốn UI/notification hiển thị theo timezone người dùng (đặc biệt logs, routine scheduling). Có khả năng trở thành ưu tiên trong bản phát hành tiếp theo.  
- Unify agentic loops thành AgenticLoop engine (giảm code-dup) — #654 (https://github.com/nearai/ironclaw/issues/654). Đây là refactor lớn, tác động tới kiến trúc agent; nếu được chấp nhận sẽ sắp tới.  
- MCP stdio transport (sidecar process management) — #652 (https://github.com/nearai/ironclaw/issues/652) — yêu cầu từ tích hợp MCP phổ biến.  
- WASM tools: WIT bindgen & tool-to-tool invocation — #649 (https://github.com/nearai/ironclaw/issues/649) — cần để hoàn thiện hệ sinh thái WASM tool.  
- NEAR Wallet OAuth cho session login — #650 (https://github.com/nearai/ironclaw/issues/650) — tích hợp auth bổ sung cho NEAR AI flow.  
- Trace replay / audit cho mutating gateway operations (submission tracing) — #640–#643 (https://github.com/nearai/ironclaw/issues/640, https://github.com/nearai/ironclaw/issues/642, https://github.com/nearai/ironclaw/issues/643) — xu hướng rõ rệt hướng tới có audit/history để hỗ trợ debugging và undo.

Tóm tắt phản hồi người dùng
- Điểm đau thực tế: onboarding và cài đặt local (Telegram không đi kèm, setup wizard không lưu API key, local LLM timeout) làm giảm khả năng chấp nhận cho người dùng không chuyên. (Issues: #602 https://github.com/nearai/ironclaw/issues/602, #666 https://github.com/nearai/ironclaw/issues/666, #615 https://github.com/nearai/ironclaw/issues/615)  
- Trải nghiệm dev/test: nhiều cải thiện test/CI vừa được merge (stub channels, thêm nhiều unit tests) — phản hồi tích cực về giảm flakiness (PRs: https://github.com/nearai/ironclaw/pull/623, https://github.com/nearai/ironclaw/pull/659).  
- Tính năng thiếu: ảnh/processing images (issue #549 https://github.com/nearai/ironclaw/issues/549), better MCP auth headers (#639 https://github.com/nearai/ironclaw/issues/639), embedding dim mismatch gây lỗi lưu embeddings (#494 https://github.com/nearai/ironclaw/issues/494).

Theo dõi tồn đọng (cần chú ý của maintainers)
- Telegram install UX / failures — #602 (https://github.com/nearai/ironclaw/issues/602) — ưu tiên cao (user-facing).  
- Setup wizard secrets_crypto bug — #666 (https://github.com/nearai/ironclaw/issues/666) — PR fix open: https://github.com/nearai/ironclaw/pull/669 (cần review/merge).  
- Windows Instant overflow crash — #657 (https://github.com/nearai/ironclaw/issues/657) — PR fix open: https://github.com/nearai/ironclaw/pull/664 (cần review/merge).  
- libSQL gaps: secrets store và vector search integration — #655 (https://github.com/nearai/ironclaw/issues/655) — lớn/chiến lược cho deployments không dùng Postgres.  
- Unify agent loops refactor — #654 (https://github.com/nearai/ironclaw/issues/654) — cần đánh giá rủi ro/benefit trước khi chấp nhận.  
- WASM tool WIT metadata & tool-to-tool — #649 (https://github.com/nearai/ironclaw/issues/649) — ảnh hưởng tới khả năng publish/consume WASM tools.  
- PR release v0.17.0 (breaking changes) — https://github.com/nearai/ironclaw/pull/633 — flagged as breaking; cần review kỹ và lập kế hoạch migration nếu merge.

Kết luận ngắn
- Sức khỏe dự án: rất năng động — nhiều bugfix quan trọng và cải tiến test/CI được merge, nhưng còn nhiều issue người dùng (onboarding, kênh Telegram, libSQL gaps, WASM runtime/proxy) cần ưu tiên.  
- Hành động đề xuất cho maintainers: (1) ưu tiên merge PRs sửa onboarding và crash (PR#669, PR#664), (2) xử lý Telegram installer/extension UX (#602), (3) plan roadmap cho libSQL feature parity (#655) và đánh giá rủi ro PR release v0.17.0 trước khi merge.

Tài nguyên nhanh (liên kết)
- Repo: https://github.com/nearai/ironclaw  
- Issue Telegram default install: https://github.com/nearai/ironclaw/issues/602  
- Issue Windows panic: https://github.com/nearai/ironclaw/issues/657 — Fix PR: https://github.com/nearai/ironclaw/pull/664  
- Issue Setup wizard secrets: https://github.com/nearai/ironclaw/issues/666 — Fix PR: https://github.com/nearai/ironclaw/pull/669  
- libSQL timestamp/feature gaps: https://github.com/nearai/ironclaw/issues/663, https://github.com/nearai/ironclaw/issues/655 — PR timestamp: https://github.com/nearai/ironclaw/pull/667  
- Releases v0.16.1 / v0.16.0: see PRs/notes referenced ở phần Phát hành.

Nếu bạn muốn, tôi có thể:
- Lập danh sách PRs/Issues cần review theo mức ưu tiên cụ thể (blocker/high/medium/low) để gởi cho maintainers.  
- Soạn checklist migration nếu team quyết định merge PR release v0.17.0.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

1. Tổng quan hôm nay
- LobsterAI có hoạt động mã nguồn mở rất tích cực trong 24 giờ qua: 23 PR được đóng/merge và 13 issue mới/hoạt động (mở/không có issue đóng trong 24h). (PRs đóng: 23, Issues cập nhật: 13)
- Không có phát hành (release) mới.
- Mục tiêu ngắn hạn dường như tập trung vào sửa lỗi môi trường (Windows/mac sandbox, cygpath/git-bash, runtime bundling) và cải thiện trải nghiệm desktop (UI/scroll, batch delete).
- Độ hoạt động chung: cao về tốc độ phản hồi/merge PRs, nhưng vẫn còn nhiều lỗi người dùng báo cáo liên quan tới tích hợp runtime cục bộ và trạng thái agent.

2. Phát hành phiên bản
- Không có phiên bản mới hôm nay. (Không có thay đổi phiên bản để báo cáo.)

3. Tiến độ dự án (PRs đã merge/đóng hôm nay)
Một số PR tiêu biểu được đóng/merge trong ngày (liên kết):
- fix Windows sandbox / cập nhật sandbox image: https://github.com/netease-youdao/LobsterAI/pull/304
- sửa lỗi Windows không dùng built-in node: https://github.com/netease-youdao/LobsterAI/pull/308
- sửa lỗi liên quan mac sandbox: https://github.com/netease-youdao/LobsterAI/pull/301
- batch delete tasks / UI batch operations: https://github.com/netease-youdao/LobsterAI/pull/326
- tối ưu UI/biểu tượng/khác: https://github.com/netease-youdao/LobsterAI/pull/324 và https://github.com/netease-youdao/LobsterAI/pull/327
- đóng nhiều PR sửa lỗi nền tảng (git bash/cygpath, model selection, runtime bundling): https://github.com/netease-youdao/LobsterAI/pull/212, https://github.com/netease-youdao/LobsterAI/pull/194, https://github.com/netease-youdao/LobsterAI/pull/192
Tóm tắt: hôm nay tập trung vào độ ổn định nền tảng (Windows/mac), trải nghiệm chat (scroll, input lag), và tính năng quản lý (xóa hàng loạt).

4. Chủ đề nóng trong cộng đồng
Những issue có hoạt động/quan tâm cao:
- Không thể dùng Ollama / tích hợp Ollama cục bộ: #150 (5 bình luận) https://github.com/netease-youdao/LobsterAI/issues/150 và #174 (3 bình luận) https://github.com/netease-youdao/LobsterAI/issues/174
  - Nhu cầu cơ bản: chạy mô hình LLM cục bộ ổn định (giảm token cost) và cấu hình Ollama reliable.
- Skill mặc định bật nhưng không gọi được / nghi ngờ phụ thuộc cygpath: #188 (3 bình luận) https://github.com/netease-youdao/LobsterAI/issues/188
  - Nhu cầu: trải nghiệm cross-platform mượt (Windows) và tài liệu/installer xử lý phụ thuộc.
- Lỗi đường dẫn tự chèn thêm khoảng trắng gây fail file I/O: #303 (2 bình luận) https://github.com/netease-youdao/LobsterAI/issues/303
- Mất lịch sử hội thoại khi hạ/cài đặt phiên bản: #317 (1 bình luận) https://github.com/netease-youdao/LobsterAI/issues/317
- Mac M1 (macOS 15.6.1) task không xuất output: #323 https://github.com/netease-youdao/LobsterAI/issues/323
Nhận xét: các vấn đề liên quan tới tích hợp runtime cục bộ và khả năng tương thích nền tảng là trọng điểm cộng đồng.

5. Lỗi & Ổn định (xếp theo mức độ nghiêm trọng)
- Cao (blocker/user-facing):
  - Ollama cục bộ không hoạt động / timeouts / không trả lời (#150, #174). Link: https://github.com/netease-youdao/LobsterAI/issues/150 https://github.com/netease-youdao/LobsterAI/issues/174
  - Task trên Mac M1 không có output, đang bị treo (#323). Link: https://github.com/netease-youdao/LobsterAI/issues/323
- Trung bình:
  - Skill không thực thi được trên Windows / phụ thuộc cygpath/git-bash (#188). Link: https://github.com/netease-youdao/LobsterAI/issues/188
  - Mất ngữ cảnh/đứt mạch đa lượt trong agent (context loss) (#312). Link: https://github.com/netease-youdao/LobsterAI/issues/312
- Thấp:
  - File/folder tên bị thêm khoảng trắng khi thao tác file (I/O fail) (#303). Link: https://github.com/netease-youdao/LobsterAI/issues/303
  - Mất lịch sử hội thoại sau downgrade/uninstall (#317). Link: https://github.com/netease-youdao/LobsterAI/issues/317
- Ghi chú về sửa lỗi đã có PR: nhiều PR đã đóng để xử lý sandbox/Windows (ví dụ #304, #308, #301), fix cygpath (#212), bundling Python cho Windows (#192), và fix model selection (#194). Các PR này giảm bớt các lỗi môi trường nhưng các báo cáo mới cho thấy một số luồng (Ollama, Mac M1, context loss) vẫn cần theo dõi thêm.

6. Yêu cầu tính năng & tín hiệu lộ trình
- Yêu cầu nổi bật:
  - Hỗ trợ cấu hình-driven cho nhiều Agent (CLI + GUI) để giảm rào cản không phải dev: #322 https://github.com/netease-youdao/LobsterAI/issues/322
  - Chọn môi trường runtime theo task (Sandbox / Local / Auto): #321 https://github.com/netease-youdao/LobsterAI/issues/321
  - Chạy nhiều agent song song / “龙虾军团” (multi-agent local) : #320 https://github.com/netease-youdao/LobsterAI/issues/320
  - Hỗ trợ chỉnh sửa lịch trình thủ công (fix nan:nan): #318 https://github.com/netease-youdao/LobsterAI/issues/318
- Dự đoán: sau khi đã ổn định nền tảng, khả năng cao nhóm sẽ ưu tiên:
  - trải nghiệm multi-agent cấu hình-driven (đã có nhiều request),
  - cải thiện tích hợp Ollama và runtime local (do tần suất report cao),
  - UI/UX cho quản lý tác vụ (batch delete đã được merge: https://github.com/netease-youdao/LobsterAI/pull/326).

7. Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Tích hợp mô hình cục bộ (Ollama) không ổn định — người dùng cần chạy offline/local để tiết kiệm token nhưng gặp timeouts và “vòng quay chờ”.
  - Trải nghiệm Windows/mac: thiếu/mất dependency (cygpath/git bash), sandbox từng lỗi — mặc dù nhiều PR đã cố gắng chỉnh sửa.
  - Vấn đề thao tác file thực tế (khoảng trắng trong đường dẫn) gây lỗi file I/O và làm gián đoạn workflow.
  - Mất lịch sử hội thoại khi cài/hạ phiên bản khiến người dùng lo ngại về dữ liệu cá nhân.
- Cảm nhận chung: người dùng đánh giá cao tốc độ sửa lỗi (nhiều PR merge), nhưng trải nghiệm quan trọng (local LLM, stability, data persistence) vẫn chưa đủ ổn định để dùng yên tâm ở môi trường production/cá nhân.

8. Theo dõi tồn đọng (cần chú ý / ưu tiên)
- Vấn đề cần triage & follow-up:
  - #150 / #174 — Ollama local deploy & reliability: cần logs, repro steps, timeout handling improvements. https://github.com/netease-youdao/LobsterAI/issues/150 https://github.com/netease-youdao/LobsterAI/issues/174
  - #323 — Mac M1 task không output: cần repro trên macOS 15.6.1 (M1) và log thu thập. https://github.com/netease-youdao/LobsterAI/issues/323
  - #312 — Context loss giữa các lượt agent: cần test case, reproducible conversation traces. https://github.com/netease-youdao/LobsterAI/issues/312
  - #188 — Skills không gọi được trên Windows / cygpath: dù đã có PR #212, cần kiểm tra regressions và cải thiện hướng dẫn cài đặt. https://github.com/netease-youdao/LobsterAI/issues/188 https://github.com/netease-youdao/LobsterAI/pull/212
  - #317 — Mất lịch sử khi hạ/cài: cần tài liệu migration và cơ chế backup restore. https://github.com/netease-youdao/LobsterAI/issues/317
  - #303 — File path whitespace bug (I/O): trường hợp lỗi rõ ràng, cần test/patch parser xử lý tên file có ký tự/số. https://github.com/netease-youdao/LobsterAI/issues/303
  - #314 — Ảnh không gửi được sang Feishu (400): cần log request/response để xác định payload validation. https://github.com/netease-youdao/LobsterAI/issues/314
- Đề xuất hành động cho maintainers:
  - Ưu tiên repro và log collection cho Ollama & Mac M1.
  - Tạo test automation/regression cho đường dẫn file, sandbox, và multi-turn context.
  - Bổ sung hướng dẫn cài đặt/upgrade và backup history trong docs/release notes.

Tài nguyên tham khảo nhanh:
- Repo: https://github.com/netease-youdao/LobsterAI
- Một số issue/PR đã nêu trong bản tin (liên kết được trình bày trong từng phần trên).

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

1) Tổng quan hôm nay
- Dự án hoạt động đều, có vài hoạt động nhận biết trong 24 giờ qua: 2 issue được cập nhật (1 mở, 1 đã đóng) và 4 PR được cập nhật (2 mở, 2 đóng).  
- Không có phát hành (release) mới. Hoạt động hiện tập trung vào tích hợp nhà cung cấp AI CLI và sửa các vấn đề về quy trình phát hành/cập nhật.  
- Mức độ hoạt động: trung bình — có đóng góp tính năng nhanh (PR đóng cùng ngày) nhưng vẫn còn PR/issue cần review để ổn định.

2) Phát hành phiên bản
- Không có phiên bản mới được phát hành hôm nay.

3) Tiến độ dự án (PR đã merge/đóng gần đây)
- #165 (CLOSED) feat: add Gemini CLI provider support — thêm hỗ trợ nhà cung cấp Gemini CLI theo cùng mô hình tích hợp với các provider khác. Liên kết: https://github.com/TinyAGI/tinyclaw/pull/165
- #161 (CLOSED) fixes ISSUE 160 — thêm bước kiểm tra trong GitHub Action release để đồng bộ tag và package.json, ngăn cảnh báo cập nhật sai. Liên kết: https://github.com/TinyAGI/tinyclaw/pull/161
- PR mở đáng chú ý (cần review):  
  - #152 (OPEN) feat: per-thread session isolation for Claude and Codex agents — thêm bảng thread_sessions để tách session theo (agent_id, thread_id). Liên kết: https://github.com/TinyAGI/tinyclaw/pull/152  
  - #154 (OPEN) fix: resolve issue #19 security gaps and logging discrepancies — loại bỏ snippet tin nhắn plaintext trong logs, thay đổi sandbox Chromium cho WhatsApp, v.v. Liên kết: https://github.com/TinyAGI/tinyclaw/pull/154

4) Chủ đề nóng trong cộng đồng
- Issue #160 (CLOSED) — cảnh báo "Update Available" báo lỗi do tag HEAD không khớp version trong package.json. Liên kết: https://github.com/TinyAGI/tinyclaw/issues/160  
  - Nhu cầu: đảm bảo quy trình release/cherry-pick không tạo trạng thái tag/version không nhất quán; người dùng muốn thông báo cập nhật chính xác, không gây hiểu nhầm.
- Issue #164 (OPEN) — installer/update script trên tag 0.0.9 lại cài 0.0.8. Liên kết: https://github.com/TinyAGI/tinyclaw/issues/164  
  - Nhu cầu: sửa script cài/ cập nhật để khớp với phiên bản phát hành; người dùng bị ảnh hưởng trực tiếp khi chạy installer.

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Mức cao: Installer cập nhật sai phiên bản (Issue #164, OPEN) — ảnh hưởng trải nghiệm cập nhật, có khả năng gây nhầm lẫn/rollback cho người dùng. Cần fix script nhanh. Link: https://github.com/TinyAGI/tinyclaw/issues/164
- Mức trung bình: Cảnh báo cập nhật sai do tag/version mismatch (Issue #160, đã đóng bằng PR #161) — đã có PR (#161) thêm guard vào action release để ngăn lỗi này. Link issue: https://github.com/TinyAGI/tinyclaw/issues/160 và PR fix: https://github.com/TinyAGI/tinyclaw/pull/161
- Mức trung bình/ông trọng (bảo mật): Logging/độ an toàn (PR #154, OPEN) — loại bỏ plaintext snippets khỏi logs và quản lý sandbox cho WhatsApp; nếu không xử lý, có rủi ro lộ dữ liệu nhạy cảm. Link: https://github.com/TinyAGI/tinyclaw/pull/154

6) Yêu cầu tính năng & tín hiệu lộ trình
- Hỗ trợ thêm provider CLI: Gemini CLI vừa được bổ sung trong PR #165 (đóng), tiếp tục xu hướng tích hợp nhiều CLI providers (ví dụ: Cursor trước đó). Link: https://github.com/TinyAGI/tinyclaw/pull/165
- Quản lý session theo luồng: PR #152 đề xuất per-thread session isolation cho Claude và Codex — đây là tính năng có khả năng xuất hiện trong bản phát hành tiếp theo để cải thiện đa người dùng/đa luồng. Link: https://github.com/TinyAGI/tinyclaw/pull/152
- Cải thiện quy trình release và installer: issue #164 và #160 cho thấy cần hoàn thiện script release/install để tránh mismatch version và cài đặt sai.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: công cụ cập nhật/cài đặt không nhất quán (cảnh báo update sai hoặc cài phiên bản cũ) gây mất niềm tin vào quy trình phát hành. (Issue #160, #164)  
- Bảo mật/riêng tư: người dùng quan tâm tới logging chứa nội dung tin nhắn; PR #154 phản ánh nhu cầu giảm lộ thông tin trong logs.  
- Tính năng: có nhu cầu mạnh về hỗ trợ nhiều nhà cung cấp (gemini, cursor, v.v.) và quản lý session tốt hơn cho trải nghiệm đa luồng. Tổng thể: cộng đồng hào hứng với tích hợp mới nhưng kỳ vọng cải thiện ổn định và an toàn.

8) Theo dõi tồn đọng (cần chú ý của người bảo trì)
- Issue #164 (OPEN) — installer/update script cài sai phiên bản. Cần prioritise fix và release lại installer. Link: https://github.com/TinyAGI/tinyclaw/issues/164
- PR #152 (OPEN) — per-thread session isolation: cần review kỹ (thiết kế DB session, ảnh hưởng backwards compatibility). Link: https://github.com/TinyAGI/tinyclaw/pull/152
- PR #154 (OPEN) — security/logging fixes: cần review sớm do liên quan bảo mật và dữ liệu người dùng. Link: https://github.com/TinyAGI/tinyclaw/pull/154
- Đã đóng: PR #161 đã thêm guard cho release action để khắc phục issue #160 (good to confirm release pipeline hoạt động trên tag tiếp theo). Link PR: https://github.com/TinyAGI/tinyclaw/pull/161

Kết luận ngắn: hoạt động phát triển vẫn tích cực theo hướng mở rộng provider và cải thiện bảo mật/phiên làm việc, nhưng cần ưu tiên sửa lỗi quy trình phát hành/installer và review các PR bảo mật/session để nâng cao trải nghiệm người dùng trước phiên bản tiếp theo.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

Bản tin dự án CoPaw — 2026-03-07

1) Tổng quan hôm nay
- Hoạt động cộng đồng rất sôi nổi: 50 issue được cập nhật (40 mở/đang hoạt động, 10 đóng) và 28 PR cập nhật (22 mở, 6 đã merge/đóng) trong 24 giờ qua.  
- Không có phát hành phiên bản mới. Nhóm phát triển và cộng đồng đang tập trung vào độ ổn định (container / session / memory), kênh tích hợp (Telegram/飞书/DingTalk/Discord) và routing/provider cho LLM.  
- Nhiều PR tính năng lớn đang chờ review (memory refactor, background process manager, dual-LLM routing, desktop packaging), cho thấy hướng đi rõ ràng về tính ổn định và đa kênh.

2) Phát hành phiên bản
- Không có bản phát hành mới hôm nay.

3) Tiến độ dự án (PR đã merge/đóng & điểm nổi bật)
- PR đã đóng/merge tiêu biểu hôm nay (xem chi tiết):  
  - #890 closed — fix typo: change xiaohongshu to rednote (https://github.com/agentscope-ai/CoPaw/pull/890)  
  - #742 closed — add install.bat (https://github.com/agentscope-ai/CoPaw/pull/742)  
  - #862 closed — Telegram access control (https://github.com/agentscope-ai/CoPaw/pull/862)  
  (Tổng số PR được merge/đóng trong 24h: 6 — theo dữ liệu hoạt động.)  
- PR tính năng/đang đẩy mạnh (đang review hoặc mở):  
  - Memory refactor & new split strategy — #867 (https://github.com/agentscope-ai/CoPaw/pull/867) — cải thiện lưu trữ/thể hiện memory.  
  - Background process manager (hỗ trợ lệnh chạy lâu) — #877 (https://github.com/agentscope-ai/CoPaw/pull/877) — rất quan trọng để tránh block agent khi chạy server/command dài.  
  - vLLM/session-affinity routing fix — #882 (https://github.com/agentscope-ai/CoPaw/pull/882) — cải thiện routing cho self-hosted LLMs.  
  - Dual local/cloud LLM routing foundation — #849 (https://github.com/agentscope-ai/CoPaw/pull/849).  
  - Desktop packaging Windows/macOS — #843 (https://github.com/agentscope-ai/CoPaw/pull/843).  
  - Channels & provider work: Dingtalk audio (#889), Discord improvements (#830), OpenRouter provider (#759), Anthropic image handling (#868).

4) Chủ đề nóng trong cộng đồng (issues/PR hoạt động nhất)
- #280 Discussion: Which Skills and MCPs Can Be Built-in? — 15 bình luận  
  https://github.com/agentscope-ai/CoPaw/issues/280  
  Nhu cầu: mặc định hoá một số skill/MCP phổ biến để cải thiện trải nghiệm OOTB. Liên quan đến quyết định UX, phụ thuộc và kích thước gói cài đặt.  
- #872 Docker本地部署0.0.5版本，首次对话没有对话引导，且无法长期记忆和跨对话记忆 — 12 bình luận  
  https://github.com/agentscope-ai/CoPaw/issues/872  
  Nhu cầu: bootstrap lần đầu, persistence/session/memory trong môi trường Docker.  
- #859 容器里随机卡死，且无法恢复 — 12 bình luận (nghiêm trọng)  
  https://github.com/agentscope-ai/CoPaw/issues/859  
  Nhu cầu: điều tra CPU spike / deadlock trong container; ảnh hưởng tính khả dụng.  
- #736 信息回答错乱 — 9 bình luận  
  https://github.com/agentscope-ai/CoPaw/issues/736  
  Nhu cầu: hội thoại bị “trộn ngược” state; liên quan tới session/restore/state machine.  
- #831 0.0.5 没有telegram channel啊 — 9 bình luận  
  https://github.com/agentscope-ai/CoPaw/issues/831  
  Nhu cầu: thiếu parity kênh Telegram / cấu hình kênh.  
- #814 Model Authentication failed — 7 bình luận  
  https://github.com/agentscope-ai/CoPaw/issues/814  
  Nhu cầu: xác thực provider (ModelScope) lỗi 401 — cần hướng dẫn cấu hình/giải thích lỗi.

5) Lỗi & Ổn định — xếp hạng theo mức độ nghiêm trọng
- Mức độ Cao (P0–P1)  
  - #859 容器里随机卡死，且无法恢复 — container CPU 100% dẫn tới service unresponsive (https://github.com/agentscope-ai/CoPaw/issues/859). Hành động cần thiết: thu thập traces, coredump, giới hạn process, watchdog.  
  - #736 信息回答错乱 — hội thoại bị dính state sau restart (https://github.com/agentscope-ai/CoPaw/issues/736). Có nguy cơ gây mất dữ liệu/trải nghiệm sai.  
  - #886 飞书 WebSocket 重复推送导致重复回复 — duplicate messages gây spam replies (https://github.com/agentscope-ai/CoPaw/issues/886). Cần dedupe bằng msg_id hoặc server-side dedupe.  
- Mức độ Trung bình (P2)  
  - #872 Docker 本地部署首次对话无引导且记忆失效 (https://github.com/agentscope-ai/CoPaw/issues/872).  
  - #828 tool use input 参数为空 (https://github.com/agentscope-ai/CoPaw/issues/828).  
  - #805 write_file 工具调用失败 — thiếu argument (https://github.com/agentscope-ai/CoPaw/issues/805).  
  - Provider auth / ModelScope 401 — #814 (https://github.com/agentscope-ai/CoPaw/issues/814).  
- Mức độ Thấp (P3)  
  - Windows-specific: #885 execute_shell_command block on interactive script (https://github.com/agentscope-ai/CoPaw/issues/885), #875 中文乱码 result (https://github.com/agentscope-ai/CoPaw/issues/875).  
  - Channels parity: Telegram missing channel / UI issues (#831) (https://github.com/agentscope-ai/CoPaw/issues/831).  
- PR liên quan giúp giảm rủi ro:  
  - #877 (background process manager) trực tiếp nhắm tới lệnh lâu/blocking (https://github.com/agentscope-ai/CoPaw/pull/877).  
  - #882 (session-affinity routing) giúp routing/latency vấn đề với vLLM/self-hosted (https://github.com/agentscope-ai/CoPaw/pull/882).  
  - Tuy nhiên nhiều bug cốt lõi (container freeze, session corruption) vẫn cần debugging và test tự động.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Yêu cầu mạnh từ cộng đồng:  
  - Pre-installed builtin skills / MCPs để trải nghiệm tốt hơn OOTB — #280 (https://github.com/agentscope-ai/CoPaw/issues/280).  
  - Quản lý session/cleanup cho kênh (ví dụ 飞书 session cleanup) — #817 (https://github.com/agentscope-ai/CoPaw/issues/817).  
  - Dual routing local/cloud LLM và session-aware routing — #849 (https://github.com/agentscope-ai/CoPaw/pull/849) và #882 (https://github.com/agentscope-ai/CoPaw/pull/882).  
  - Hỗ trợ nền tảng desktop (Windows/macOS) và đóng gói — #843 (https://github.com/agentscope-ai/CoPaw/pull/843).  
  - Long-running background process management — #877 (https://github.com/agentscope-ai/CoPaw/pull/877).  
- Dự đoán tính năng có khả năng xuất hiện trong bản tiếp theo: memory refactor (#867), background process manager (#877), vLLM session-affinity (#882), và cải thiện providers (OpenRouter #759) vì nhiều PR liên quan đang tích cực được đóng góp.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính (theo issue): cài đặt/triển khai (Docker/Windows/容器持久化/SDK thiếu), tính ổn định (container freeze, session dính), và kênh tích hợp không đồng đều (Telegram/飞书重复/消息丢失). Ví dụ: #864/#869/#872/#859 (https://github.com/agentscope-ai/CoPaw/issues/864, https://github.com/agentscope-ai/CoPaw/issues/869, https://github.com/agentscope-ai/CoPaw/issues/872, https://github.com/agentscope-ai/CoPaw/issues/859).  
- Tâm trạng cộng đồng: vừa tích cực đóng góp PR tính năng vừa có vài phản hồi tiêu cực mạnh (ví dụ #576 nội dung bức xúc) — chỉ ra nhu cầu cải thiện độ ổn định và trải nghiệm cài đặt trước khi mở rộng tính năng.

8) Theo dõi tồn đọng & đề xuất ưu tiên cho bảo trì
- Issues/PR cần chú ý cấp cao (chưa được giải quyết hoặc cần review):  
  - #859 容器里随机卡死 — ưu tiên debug (https://github.com/agentscope-ai/CoPaw/issues/859).  
  - #736 信息回答错乱 — investigate session/state machine (https://github.com/agentscope-ai/CoPaw/issues/736).  
  - #872 Docker 本地部署首次对话/记忆问题 — reproduce & persistence fixes (https://github.com/agentscope-ai/CoPaw/issues/872).  
  - #886 飞书 WebSocket duplicate push — cần dedupe logic (https://github.com/agentscope-ai/CoPaw/issues/886).  
  - PR đang chờ review nhưng có tác động lớn: #867 (memory refactor) https://github.com/agentscope-ai/CoPaw/pull/867, #877 (background process) https://github.com/agentscope-ai/CoPaw/pull/877, #882 (vLLM routing) https://github.com/agentscope-ai/CoPaw/pull/882, #849 (LLM routing) https://github.com/agentscope-ai/CoPaw/pull/849, #843 (desktop packaging) https://github.com/agentscope-ai/CoPaw/pull/843.  
- Đề xuất ngắn hạn cho maintainers: tập trung đội QA/triage vào 1) reproducible steps + logs cho các sự cố container freeze và session corruption; 2) ưu tiên merge PR bảo vệ chống blocking (background process manager) và routing fixes; 3) thêm hướng dẫn cài đặt Docker/Windows/ollama SDK vào docs/quickstart; 4) bổ sung dedupe bằng msg_id cho các kênh WebSocket.

Kết luận
- Sức khỏe dự án: hoạt động cộng đồng mạnh, nhiều đóng góp tính năng có chiều sâu; tuy nhiên tồn tại những vấn đề ổn định nghiêm trọng (container freeze, session memory corruption, channel duplicate messages) cần ưu tiên. Nếu maintainers ưu tiên triage và merge các PR ổn định (background process, routing, memory fixes) trong ngắn hạn, trải nghiệm người dùng sẽ được cải thiện rõ rệt.

Tài liệu tham khảo nhanh (liên kết đề cập trong bản tin)
- Issue #280: https://github.com/agentscope-ai/CoPaw/issues/280  
- Issue #872: https://github.com/agentscope-ai/CoPaw/issues/872  
- Issue #859: https://github.com/agentscope-ai/CoPaw/issues/859  
- Issue #736: https://github.com/agentscope-ai/CoPaw/issues/736  
- Issue #831: https://github.com/agentscope-ai/CoPaw/issues/831  
- Issue #886: https://github.com/agentscope-ai/CoPaw/issues/886  
- PR #877: https://github.com/agentscope-ai/CoPaw/pull/877  
- PR #867: https://github.com/agentscope-ai/CoPaw/pull/867  
- PR #882: https://github.com/agentscope-ai/CoPaw/pull/882  
- PR #849: https://github.com/agentscope-ai/CoPaw/pull/849  
- PR #843: https://github.com/agentscope-ai/CoPaw/pull/843  
- PR #890: https://github.com/agentscope-ai/CoPaw/pull/890  
- PR #742: https://github.com/agentscope-ai/CoPaw/pull/742  
- PR #862: https://github.com/agentscope-ai/CoPaw/pull/862

Nếu muốn, tôi có thể chuẩn bị một checklist ưu tiên (bug fixes + PR merges) cho maintainers để dùng trong sprint tiếp theo.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

1) Tổng quan hôm nay
- Hoạt động phát triển cao: trong 24 giờ qua có 9 PR được cập nhật (2 open, 7 đã merge/đóng) và 5 issue được cập nhật (1 mở, 4 đóng).  
- Trọng tâm rõ ràng hướng về củng cố an toàn (SSRF, kiểm tra đường dẫn, mount/symlink) và cải thiện trải nghiệm tích hợp (Feishu/Lark Markdown, provider presets).  
- Một phiên bản mới v0.7.0 đã được phát hành, bao gồm bổ sung nhà cung cấp và một vài sửa lỗi vận hành.  
- Tín hiệu cộng đồng cho thấy ưu tiên bảo mật và độ ổn định CI/testing.

2) Phát hành phiên bản
- Phiên bản mới: v0.7.0 — https://github.com/qhkm/zeptoclaw/releases/tag/v0.7.0  
  What's changed (tóm tắt):
  - feat(providers): thêm xAI (Grok) và Baidu Qianfan presets (PR #247) — https://github.com/qhkm/zeptoclaw/pull/247  
  - fix(channels): hiển thị các model đã cấu hình cho provider trong /model list (PR #216) — https://github.com/qhkm/zeptoclaw/pull/216  
  - fix(cron): rà soát và tăng độ tin cậy cho scheduler  
- Thay đổi phá vỡ: không có thay đổi phá vỡ ghi nhận trong changelog.  
- Lưu ý di chuyển: nếu sử dụng các provider mới (xAI, Baidu Qianfan), hãy kiểm tra cấu hình credential và tên model; không có yêu cầu di chuyển cấu trúc dữ liệu nào được nêu.

3) Tiến độ dự án (PRs đã merge/đóng hôm nay)
- PRs đóng/merge chính (trong 24h):
  - #276: add code coverage with cargo-llvm-cov + Codecov — https://github.com/qhkm/zeptoclaw/pull/276  
  - #278: harden path validation against dangling symlink escapes — https://github.com/qhkm/zeptoclaw/pull/278  
  - #273: switch to cargo-nextest for OOM-resistant test runs — https://github.com/qhkm/zeptoclaw/pull/273  
  - #272: enforces SSRF checks on the actual browser request chain — https://github.com/qhkm/zeptoclaw/pull/272  
  - #274: harden screenshot tool against SSRF via redirect chains — https://github.com/qhkm/zeptoclaw/pull/274  
  - #270: feat(lark): enable Markdown rendering in Feishu/Lark — https://github.com/qhkm/zeptoclaw/pull/270  
  - #260: add SSRF guardrails to skill installer downloads — https://github.com/qhkm/zeptoclaw/pull/260  
- Những nội dung nổi bật được đẩy mạnh: bảo mật đầu vào/requests (SSRF), đường dẫn/symlink validation, cải thiện CI testing/coverage, và hỗ trợ Markdown cho kênh Feishu/Lark.

4) Chủ đề nóng trong cộng đồng
- SSRF / screenshot redirect chains — Issue #271 (đã đóng) & PRs #272/#274: https://github.com/qhkm/zeptoclaw/issues/271, https://github.com/qhkm/zeptoclaw/pull/272, https://github.com/qhkm/zeptoclaw/pull/274  
  - Nhu cầu: chặn redirect chain độc hại khi chụp ảnh web; yêu cầu kiểm tra từng hop redirect.  
- Mount / symlink bypass — Issue #280 (mở) và PR #281 (open): https://github.com/qhkm/zeptoclaw/issues/280, https://github.com/qhkm/zeptoclaw/pull/281  
  - Nhu cầu: resolve đường dẫn (lstat) trước khi áp chính sách mount để tránh bypass qua symlink/hardlink.  
- Workspace path boundary & TOCTOU — Issue #277 & PR #278 (đã đóng): https://github.com/qhkm/zeptoclaw/issues/277, https://github.com/qhkm/zeptoclaw/pull/278  
  - Nhu cầu: chống nhiều vector bypass liên quan symlink/dangling/hardlink.

5) Lỗi & Ổn định (xếp theo mức độ nghiêm trọng)
- Cao:
  - SSRF via redirect chains trong screenshot tool (Issue #271) — đã được xử lý bởi PRs #272 và #274 (đã đóng). Links: https://github.com/qhkm/zeptoclaw/issues/271, https://github.com/qhkm/zeptoclaw/pull/272, https://github.com/qhkm/zeptoclaw/pull/274
  - Container mount blocked-pattern bypass via symlink/hardlink (Issue #280, open) — đang chờ xử lý; PR #281 mở nhằm harden validate_mount_not_blocked: https://github.com/qhkm/zeptoclaw/issues/280, https://github.com/qhkm/zeptoclaw/pull/281
- Trung bình:
  - Workspace path boundary (symlink/TOCTOU/hardlink) — Issue #277 đã đóng cùng PR #278 thực hiện các sửa lstat/checks: https://github.com/qhkm/zeptoclaw/issues/277, https://github.com/qhkm/zeptoclaw/pull/278
- Ghi chú: nhiều sửa liên quan an ninh đã được merged trong 24h; còn một số thay đổi bảo mật quan trọng đang chờ review (ví dụ #281).

6) Yêu cầu tính năng & tín hiệu lộ trình
- Đã được yêu cầu / đang phát triển:
  - Per-template capability sandbox (PR #279, open) — thêm cấu hình sandbox theo template (shell_allowlist, v.v.): https://github.com/qhkm/zeptoclaw/pull/279  
  - Hỗ trợ provider mới đã được đưa vào v0.7.0 (xAI, Baidu) — có thể tiếp tục bổ sung presets/providers khác. PR liên quan: https://github.com/qhkm/zeptoclaw/pull/247  
- Dự đoán cho phiên bản tiếp theo:
  - Hoàn thiện per-template sandboxing và các chính sách an toàn chi tiết cho công cụ plugin/shell.  
  - Tiếp tục củng cố SSRF/mount/sandboxing; nhiều PR bảo mật cho thấy roadmap ưu tiên bảo mật runtime và isolation.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Lo ngại bảo mật (SSRF, symlink escape, mount policy bypass) — các báo cáo và PRs tập trung vào khía cạnh này.  
  - Độ ổn định CI/test: chuyển sang cargo-nextest và thêm coverage để cải thiện khả năng phát hiện/regression.  
  - Tích hợp kênh (Feishu/Lark): người dùng mong muốn Markdown render — đã được giải quyết (PR #270).  
- Mức độ hài lòng: tích cực về phản hồi nhanh (nhiều PR sửa lỗi bảo mật đã được merge trong một ngày), vẫn còn lo ngại ở các bề mặt bảo mật chưa hoàn toàn đóng (ví dụ issue #280).

8) Theo dõi tồn đọng (cần sự chú ý của người bảo trì)
- Issue mở quan trọng:
  - #280 — Security: container mount blocked-pattern bypass via symlink and hardlink — https://github.com/qhkm/zeptoclaw/issues/280 (open) — mức nghiêm trọng cao, PR #281 đang chờ review.  
- PRs open cần review / merge:
  - #281 — fix(security): harden lightweight mount validation — https://github.com/qhkm/zeptoclaw/pull/281  
  - #279 — feat: per-template capability sandbox — https://github.com/qhkm/zeptoclaw/pull/279  
- Kiểm tra tiếp:
  - Đảm bảo release notes v0.7.0 phản ánh đầy đủ các thay đổi bảo mật/khuyến cáo vận hành; xác minh các thay đổi CI không gây regressions.

Kết luận ngắn: trong 24 giờ qua ZeptoClaw có hoạt động mạnh mẽ, trọng tâm rõ ràng là vá các lỗ hổng tấn công đường dẫn/SSRF và nâng cao độ tin cậy CI; còn vài mục bảo mật quan trọng vẫn đang chờ review (xem #280, #281, #279).

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

Dưới đây là bản tin dự án EasyClaw dành cho ngày 2026-03-07 — tổng hợp hoạt động gần nhất trên GitHub (với liên kết tham chiếu).

1) Tổng quan hôm nay
- Dự án đang duy trì hoạt động ổn định: 3 issue được xử lý/đóng trong 24 giờ qua, không có PR mới hoặc PR được merge trong cùng khoảng thời gian.  
- Hai phiên bản gần đây (v1.6.2 và v1.6.1) được phát hành; nội dung công bố chủ yếu liên quan đến hướng dẫn cài đặt macOS (xử lý Gatekeeper).  
- Hoạt động community tập trung vào ba vấn đề về tương thích model (khả năng thị giác), lỗi sau cập nhật và di trú/đồng nhất đường dẫn thư mục kỹ năng.  
- Đánh giá mức độ hoạt động: Trung bình — nhiều issue được đóng nhanh nhưng thiếu PR minh bạch (không có PR/commit công khai được liệt kê trong 24h).

Liên kết dự án: https://github.com/gaoyangz77/easyclaw
Trang phát hành: https://github.com/gaoyangz77/easyclaw/releases

2) Phát hành phiên bản
- Phiên bản mới nhất: v1.6.2 (cùng tồn tại v1.6.1). Cả hai release ghi chú chính đều chứa mục “Installation / 安装说明” cho macOS, hướng dẫn xử lý cảnh báo "'EasyClaw' is damaged and can't be opened" do Gatekeeper (ứng dụng chưa ký số).  
- Nội dung thay đổi (từ mô tả công khai): cập nhật hướng dẫn cài đặt macOS và cách bỏ chặn ứng dụng chưa ký; không có thông tin chi tiết về thay đổi API phá vỡ trong dữ liệu hiện tại.  
- Lưu ý di chuyển: không có ghi chú di chuyển cấu hình chi tiết trong release notes được cung cấp; tuy nhiên một issue (xem phần dưới) liên quan tới di trú dữ liệu (.openclaw → .easyclaw) đã được báo cáo và đóng — cần kiểm chứng rằng migration đã hoàn chỉnh trên release.

3) Tiến độ dự án (PRs / merge / release)
- PRs trong 24h: không có (mở: 0; merge/đóng: 0).  
- Activity chính: 3 issue đã được đóng (xem mục “Chủ đề nóng” bên dưới). Việc đóng issue cho thấy xử lý lỗi/triage đã diễn ra, nhưng không kèm PR công khai trong phạm vi dữ liệu, nên không thể khẳng định các fix đã được merge vào mã nguồn hay chỉ là hướng dẫn/giải pháp tạm thời.

4) Chủ đề nóng trong cộng đồng (issues hoạt động nhất)
- #9 [CLOSED] easyclaw接入百炼CodingPlan后，没有完全支持模型能力，如视觉理解 — Tác giả: @slowayear — 5 bình luận. Vấn đề: khi tích hợp “百炼CodingPlan”, các model (qwen3.5, kimi2.5) hỗ trợ hiểu hình ảnh nhưng EasyClaw mặc định cấu hình chỉ cho khả năng text, dẫn tới không tận dụng được khả năng thị giác. Link: https://github.com/gaoyangz77/easyclaw/issues/9  
  - Nhu cầu cơ bản: mapping/metadata về “năng lực” (text vs vision) của model trong cấu hình; runtime chọn pipeline phù hợp theo khả năng model.  
- #11 [CLOSED] 更新1.5.16后异常 — Tác giả: @kichy-ge — 4 bình luận. Vấn đề: lỗi/ngoại lệ xuất hiện sau nâng cấp lên 1.5.16 (hình ảnh log thể hiện), người dùng báo lỗi sau cập nhật. Link: https://github.com/gaoyangz77/easyclaw/issues/11  
  - Nhu cầu: ổn định bản cập nhật, kiểm thử hồi quy trước release.  
- #10 [CLOSED] 技能目录路径不一致 - 版本升级后配置与 UI 读取路径分离 — Tác giả: @slowayear — 3 bình luận. Vấn đề: di trú dữ liệu không hoàn chỉnh — dữ liệu đầy đủ ở .openclaw nhưng UI đọc từ .easyclaw\openclaw\skills dẫn tới mất đồng bộ. Link: https://github.com/gaoyangz77/easyclaw/issues/10  
  - Nhu cầu: migration tool/đồng bộ hóa dữ liệu khi nâng cấp, hướng dẫn rõ ràng cho người dùng Windows/Mac.

5) Lỗi & ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao: #11 (cập nhật 1.5.16 gây ngoại lệ) — ảnh hưởng trực tiếp đến người dùng nâng cấp; cần hotfix/rollback nếu lan rộng. Hiện trạng: issue đã đóng; không có PR tương ứng trong dữ liệu 24h. Link: https://github.com/gaoyangz77/easyclaw/issues/11
- Trung bình: #10 (đường dẫn skills không nhất quán sau upgrade) — gây mất chức năng UI/không tìm thấy skills; có thể ảnh hưởng trải nghiệm lớn cho người dùng nâng cấp. Link: https://github.com/gaoyangz77/easyclaw/issues/10
- Trung bình: #9 (không tận dụng khả năng thị giác của một số model) — làm giảm tính năng cho người dùng muốn dùng multimodal models; mức độ nghiêm trọng phụ thuộc vào nhóm người dùng cần chức năng thị giác. Link: https://github.com/gaoyangz77/easyclaw/issues/9
- Ghi chú về fixes: các issue nói trên đều được đóng nhưng không có PR/commit được liệt kê trong phạm vi 24h; cần xác nhận commit/release chứa fix để đảm bảo người dùng được cập nhật.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Mapping năng lực model (text vs vision): người dùng cần metadata/thuộc tính model để tự động bật pipeline xử lý hình ảnh khi model hỗ trợ vision (dựa trên #9). Khả năng sẽ trở thành ưu tiên nếu EasyClaw hướng đến hỗ trợ đa-modal.  
- Cơ chế migration rõ ràng: công cụ/migration script từ .openclaw → .easyclaw, cùng với kiểm tra toàn vẹn dữ liệu sau nâng cấp (từ #10).  
- Ký mã/ứng dụng macOS: tránh Gatekeeper cảnh báo bằng việc phát hành binary đã ký số (code signing) hoặc cung cấp hướng dẫn rõ ràng trong release — đây là nhu cầu UX rõ ràng.  
- Hệ thống kiểm thử hồi quy và CI cho release: giảm rủi ro lỗi như trong #11.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: (1) nâng cấp gây lỗi/ngoại lệ; (2) di trú dữ liệu không đồng bộ dẫn tới mất skill/thiếu tương thích UI; (3) thiếu mapping khả năng model khiến chức năng thị giác không sử dụng được dù model hỗ trợ.  
- Trường hợp sử dụng bị ảnh hưởng: người dùng nâng cấp (update workflows), người dùng tích hợp multimodal models (vision), và người dùng macOS không quen xử lý Gatekeeper.  
- Mức độ hài lòng: người dùng tích cực báo lỗi và đóng góp nhưng có mức bức xúc với trải nghiệm nâng cấp/migration; phản hồi cho thấy cộng đồng mong nhanh fix và hướng dẫn rõ ràng.

8) Theo dõi tồn đọng / Hành động đề xuất cho maintainers
- Xác nhận trạng thái fixes: với 3 issue đã đóng, maintainers nên: (a) liên kết trực tiếp commit/PR/Release chứa fix trong mỗi issue; (b) công bố changelog chi tiết nếu fix đã được phát hành.  
  - Links: #9 https://github.com/gaoyangz77/easyclaw/issues/9, #10 https://github.com/gaoyangz77/easyclaw/issues/10, #11 https://github.com/gaoyangz77/easyclaw/issues/11
- Ưu tiên ngắn hạn: ký mã macOS hoặc thông báo rõ ràng trong release và tự động hóa migration cho thư mục cấu hình.  
- Ưu tiên trung hạn: bổ sung metadata năng lực model và flow chọn pipeline cho multimodal; bổ sung test suite hồi quy để giảm lỗi sau release.  
- Nếu cần sự hỗ trợ cộng đồng: đề xuất mở 1 PR chi tiết chứa fix migration và 1 PR/issue cho việc thêm mapping khả năng model để mời cộng tác viên review.

Kết luận ngắn: EasyClaw đang có phản hồi cộng đồng nhanh (3 issue được đóng) và đã phát hành các bản có hướng dẫn macOS, nhưng cần minh bạch hơn về fixes (PR/commit liên quan) và ưu tiên hai vấn đề lớn: di trú/đồng bộ cấu hình (migration) và hỗ trợ rõ ràng cho model multimodal nhằm tận dụng tính năng vision.

Nếu bạn muốn, tôi có thể:
- Soạn mẫu changelog chi tiết từ các issue để maintainers copy/paste vào release notes; hoặc
- Chuẩn bị checklist migration và hướng dẫn khắc phục Gatekeeper cho README/release notes.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*