# Bản tin Hệ sinh thái OpenClaw 2026-03-12

> Issues: 500 | PRs: 500 | Dự án: 12 | Thời gian tạo: 2026-03-12 01:59 UTC

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

Bản tin dự án OpenClaw — 2026-03-12

1) Tổng quan hôm nay
- Hoạt động cộng đồng rất cao: 500 issue và 500 PR có cập nhật trong 24 giờ qua (một phần lớn là thảo luận, báo lỗi và PR xử lý sự cố/regression).
- Nhiều báo cáo về lỗi nghiêm trọng liên quan đến cron/jobs, regressions sau bản 2026.3.7→2026.3.8, và tương thích provider (Kimi / Codex / GPT-5x). Một số fix đã được đóng hoặc PR đã mở nhưng nhiều đầu mục vẫn cần review.
- Sức khỏe dự án: tích cực về mặt đóng/mở PR nhưng đang chịu áp lực từ các lỗi vận hành và hồi quy khiến trải nghiệm người dùng không ổn định.

2) Phát hành phiên bản
- Không có phiên bản mới phát hành hôm nay.

3) Tiến độ dự án (PRs đã merge/đóng / thay đổi đáng chú ý hôm nay)
- PRs đóng/đóng hôm 2026-03-12 (ví dụ):
  - docs: update Raspberry Pi dashboard access instructions — https://github.com/openclaw/openclaw/pull/43584 (OPEN) và https://github.com/openclaw/openclaw/pull/43577 (CLOSED)
  - Feat/portable openclaw — https://github.com/openclaw/openclaw/pull/43583 (CLOSED)
  - security: config include path hardening (NUL + length) — https://github.com/openclaw/openclaw/pull/43576 (CLOSED)
  - Feat: collapsible thinking/code blocks chat — https://github.com/openclaw/openclaw/pull/43582 (CLOSED)
- PRs mở đáng chú ý (đang chờ review/merge):
  - tools.fs.allowedRoots (cho phép cấu hình đường gốc filesystem cho công cụ fs) — https://github.com/openclaw/openclaw/pull/43565
  - cron: start/catch-up fixes và timeout/AbortController improvements — https://github.com/openclaw/openclaw/pull/43053, https://github.com/openclaw/openclaw/pull/42482
  - route embedded tool calls through in-process dispatch — https://github.com/openclaw/openclaw/pull/42497
  - Mistral as web_search provider — https://github.com/openclaw/openclaw/pull/41834
  - Deepgram Aura as TTS provider — https://github.com/openclaw/openclaw/pull/43580
  (Danh sách đầy đủ PRs mở/đóng trong phần PRs mới nhất trên GitHub)

4) Chủ đề nóng trong cộng đồng (Issues/PRs nhiều thảo luận nhất)
- #32828 [CLOSED] False 'API rate limit reached' on all models — 51 bình luận — https://github.com/openclaw/openclaw/issues/32828
  - Nhu cầu: xác định root cause hiển thị thông báo rate-limit sai; tránh làm người dùng nhầm lẫn khi keys/APIs hoạt động bình thường.
- #26534 [OPEN] Add DingTalk as a first-install channel option — 43 bình luận — https://github.com/openclaw/openclaw/issues/26534
  - Nhu cầu: đưa DingTalk vào flow onboarding để giảm friction cho người dùng doanh nghiệp tại Trung Quốc.
- #9443 [OPEN] Prebuilt Android APK releases — 16 bình luận — https://github.com/openclaw/openclaw/issues/9443
  - Nhu cầu: cung cấp binary APKs để đơn giản hóa chạy app Android cho người dùng không muốn build.
- #9899 [OPEN] Include day of week in system prompt date/time injection — 15 bình luận — https://github.com/openclaw/openclaw/issues/9899
  - Nhu cầu: cải thiện độ chính xác lịch/định dạng ngày giờ trong system prompt.
- Các chủ đề liên quan đến Kimi provider, cron/job regressions và session handling cũng có lượng thảo luận lớn (ví dụ #39907, #41445, #41690).

5) Lỗi & Ổn định — xếp hạng theo mức độ nghiêm trọng (dựa trên tác động và tần suất báo cáo)
- Mức độ Cao (ảnh hưởng chức năng cốt lõi hoặc gây mất dữ liệu/không chạy agent)
  - Cron/jobs bị deadlock / không chạy sau upgrade 2026.3.8:
    - #42579 Cron lane self-deadlock (isolated agentTurn never execute) — https://github.com/openclaw/openclaw/issues/42579
    - #42883 Cron jobs broken after update to 2026.3.8 — https://github.com/openclaw/openclaw/issues/42883
    - PRs liên quan đang mở: https://github.com/openclaw/openclaw/pull/43053, https://github.com/openclaw/openclaw/pull/42482
  - Recurring execution stall: assistant xác nhận task nhưng không thực thi — #40631 — https://github.com/openclaw/openclaw/issues/40631
  - Model/tool integration regressions khiến tool calls không chạy (Kimi k2p5 emits plain text) — #39907 (CLOSED), #40157 (CLOSED) — https://github.com/openclaw/openclaw/issues/39907, https://github.com/openclaw/openclaw/issues/40157
  - Codex Responses streaming server_error không trigger fallback model — #35220 — https://github.com/openclaw/openclaw/issues/35220
- Mức độ Trung bình (làm giảm trải nghiệm, yêu cầu fix nhưng còn giải pháp tạm thời)
  - Config validation / provider schema regressions (Kimi requiresOpenAiAnthropicToolPayload) — #41445 (CLOSED), #41690 (CLOSED), #40911 (CLOSED) — https://github.com/openclaw/openclaw/issues/41445, https://github.com/openclaw/openclaw/issues/41690, https://github.com/openclaw/openclaw/issues/40911
  - Session store lock timeouts & concurrent channel failures — #3092 — https://github.com/openclaw/openclaw/issues/3092
  - Session context accumulates infinitely → exceed model limits — #13938 — https://github.com/openclaw/openclaw/issues/13938
  - Workspace file injection gây lãng phí token rất lớn — #9157 — https://github.com/openclaw/openclaw/issues/9157
  - Empty agent payloads + websocket 1006 closures with local LM Studio backend — #42270 — https://github.com/openclaw/openclaw/issues/42270
- Mức độ Thấp (thuộc tính/kích thước trải nghiệm)
  - Channel-specific bugs: Slack / Signal / Feishu attachments / Discord REST proxy — #33229, #22487, #25200, #27409 — links trong danh sách issues.
- Ghi chú PR sửa lỗi liên quan:
  - Cron/timeout fixes: https://github.com/openclaw/openclaw/pull/42482, https://github.com/openclaw/openclaw/pull/43053
  - Embedded tool routing: https://github.com/openclaw/openclaw/pull/42497
  - Một số bugs đã được đóng sau investigations (ví dụ Kimi-related closes), nhưng nhiều root-cause vẫn đang điều tra.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Tính năng được yêu cầu nhiều / có tín hiệu mạnh:
  - DingTalk trong first-install onboarding — https://github.com/openclaw/openclaw/issues/26534 (có nhiều + và bình luận).
  - Prebuilt Android APK releases để giảm rào cản cài đặt — https://github.com/openclaw/openclaw/issues/9443.
  - Hỗ trợ đầu vào hình ảnh/khả năng thị giác cho agents (Feishu/群 ảnh) — https://github.com/openclaw/openclaw/issues/28744.
  - Memory v2: cải thiện traversal/forgetting để agent scale dài hạn — https://github.com/openclaw/openclaw/issues/28930.
- PRs liên quan tới roadmap khả năng media/TTS/search:
  - Deepgram Aura TTS — https://github.com/openclaw/openclaw/pull/43580
  - Mistral web_search provider — https://github.com/openclaw/openclaw/pull/41834
  - Plugin media provider hooks (ASR, image/video understand) — https://github.com/openclaw/openclaw/pull/41496
- Dự đoán: bản phát hành tiếp theo sẽ ưu tiên ổn định cron/agent execution, cải tiến công cụ web/browser routing, và tăng cường hỗ trợ providers/TTS/media dựa trên số PR đang mở.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Regressions sau upgrade (cron không chạy, subagents thiếu công cụ, empty payloads) → ảnh hưởng trực tiếp tới các deployment production và automated jobs.
  - Tương thích provider (Kimi, Codex, GitHub Copilot) gây thất vọng: cấu hình hiển thị model nhưng runtime báo Unknown/misdirected/unsupported.
  - Hiệu suất & chi phí: workspace file injection lặp lại làm lãng phí token lớn, người dùng báo tăng chi phí API.
  - Thiếu tiện ích “binary” cho app mobile (Android APK) khiến trải nghiệm onboarding khó khăn.
- Mức độ hài lòng: hỗn hợp — người dùng đánh giá cao hoạt động nhanh trong community và PR docs, nhưng mệt mỏi với các regression và lỗi vận hành lặp đi lặp lại.

8) Theo dõi tồn đọng (cần sự chú ý của maintainers)
- Issues quan trọng chưa được giải quyết / cần action:
  - #42579 Cron lane self-deadlock — https://github.com/openclaw/openclaw/issues/42579
  - #40631 Recurring execution stall — https://github.com/openclaw/openclaw/issues/40631
  - #35220 Codex Responses streaming server_error fallback — https://github.com/openclaw/openclaw/issues/35220
  - #9157 Workspace file injection wastes token budget — https://github.com/openclaw/openclaw/issues/9157
  - #26534 DingTalk onboarding — https://github.com/openclaw/openclaw/issues/26534
  - #13938 Session context accumulation until API limits exceeded — https://github.com/openclaw/openclaw/issues/13938
  - #3092 Session lock timeout causing channel handler failures — https://github.com/openclaw/openclaw/issues/3092
  - #42270 Empty payloads / websocket 1006 with LM Studio — https://github.com/openclaw/openclaw/issues/42270
- PRs quan trọng chờ review/merge:
  - tools.fs.allowedRoots — https://github.com/openclaw/openclaw/pull/43565
  - cron startup/catch-up + per-attempt AbortController fixes — https://github.com/openclaw/openclaw/pull/43053, https://github.com/openclaw/openclaw/pull/42482
  - route embedded tool calls in-process — https://github.com/openclaw/openclaw/pull/42497
  - plugin media provider hooks — https://github.com/openclaw/openclaw/pull/41496
  - backup/encrypted snapshot flow — https://github.com/openclaw/openclaw/pull/41345

Khuyến nghị ngắn gọn cho maintainers
- Ưu tiên khắc phục cron/agent execution regressions (triaging, backport hotfix nếu cần) — các PR #42482 / #43053 là ứng viên chính để review sớm.
- Tập trung vào provider-compatible regressions (Kimi / Codex / GitHub Copilot) để tránh mất lòng tin người dùng.
- Xem xét quick-win giảm thiểu token-waste (workspace file injection) — tác động chi phí trực tiếp cho người dùng.
- Phân bổ reviewer cho PRs media/TTS/search để đón nhận tín hiệu roadmap (Deepgram, Mistral, plugin media) và giảm backlog.

Tài nguyên & liên kết nhanh
- Issues hot: #32828, #26534, #9443, #9899 — https://github.com/openclaw/openclaw/issues/32828, https://github.com/openclaw/openclaw/issues/26534, https://github.com/openclaw/openclaw/issues/9443, https://github.com/openclaw/openclaw/issues/9899
- PRs nổi bật: https://github.com/openclaw/openclaw/pull/43565, https://github.com/openclaw/openclaw/pull/42482, https://github.com/openclaw/openclaw/pull/42497, https://github.com/openclaw/openclaw/pull/43053

Kết luận ngắn gọn
- Cộng đồng rất năng động, nhiều PR/issue xử lý trong ngày. Tuy nhiên, mức độ regressions/vấn đề vận hành hiện tại là điểm nghẽn chính; nếu tập trung nhanh vào cron/agent và provider regressions, trải nghiệm người dùng sẽ cải thiện rõ rệt trước khi mở rộng tính năng mới.

---

## So sánh hệ sinh thái chéo

1) Tổng quan hệ sinh thái (3–5 câu)
- Hệ sinh thái mã nguồn mở cho AI agent / trợ lý cá nhân hiện rất sôi động nhưng phân mảnh: vài dự án “lớn” có cộng đồng và tích hợp đa provider, bên cạnh nhiều dự án tập trung vào ngóc ngách (desktop, WASM, hardening, local-LLM).  
- Các vấn đề lặp lại xuyên suốt là tương thích provider (cloud/local), tính ổn định của cron/agent execution, quản lý session/memory (để tránh token bloat) và trải nghiệm onboarding/triển khai (binary, Docker, APK, macOS packaging).  
- Tín hiệu mạnh: chuyển hướng sang hỗ trợ mô hình cục bộ/GGUF/Ollama/vLLM, tối ưu chi phí token/memory, và gia tăng chú ý cho hardening (filesystem, webhook auth, secrets).

2) So sánh mức độ hoạt động (tóm tắt chỉ số chính)
(Lưu ý: các con số là activity window 24h từ bản tin)

- OpenClaw
  - Issues/PRs ngày: ~500 issues + ~500 PRs có cập nhật
  - Release hôm nay: Không
  - Sức khỏe: Cao hoạt động nhưng unstable — nhiều regression vận hành (cron, provider)

- NanoBot
  - Issues/PRs ngày: ~51 issue, 83 PR activity
  - Release hôm nay: Không
  - Sức khỏe: Rộng đóng góp, cần ưu tiên bảo mật config & ổn định SIGTERM

- Zeroclaw
  - Issues/PRs ngày: ~46 issues, 50 PRs
  - Release hôm nay: v0.1.7-beta.30 / beta.28
  - Sức khỏe: Nhanh iterate, tập trung CI/branch consolidation; có vấn đề packaging (GLIBC)

- PicoClaw
  - Issues/PRs ngày: ~23 issues, 104 PR activity (64 open)
  - Release hôm nay: Nightly v0.2.2-nightly.20260312
  - Sức khỏe: Rất năng động; nhiều nightly, nhưng còn race/compatibility bugs (Groq)

- NanoClaw
  - Issues/PRs ngày: ~16 issues, 38 PRs
  - Release hôm nay: Không
  - Sức khỏe: Tập trung tối ưu token + semantic memory; một số lỗi streaming/auth cần fix

- IronClaw
  - Issues/PRs ngày: ~45 issues, 50 PRs activity
  - Release gần: v0.18.0 (2026-03-11)
  - Sức khỏe: Ổn định tương đối (recent release) nhưng nhiều kênh/WASM/registry bugs cần xử lý

- LobsterAI
  - Issues/PRs ngày: ~12 issues, 11 PRs
  - Release hôm nay: v0.2.3 (mới)
  - Sức khỏe: Nhỏ hơn, tập trung IM/QQ; còn bug chức năng (image hang, formatting)

- TinyClaw
  - Issues/PRs ngày: ~12 issues, 7 PRs
  - Release hôm nay: v0.0.10
  - Sức khỏe: Tập trung UX TinyOffice & refactor infra; cần migrate guidance

- Moltis
  - Issues/PRs ngày: ~33 issues, 26 PRs
  - Release hôm nay: Không
  - Sức khỏe: Ổn định hướng infra/cron/sandbox; nhiều PR nhỏ fix regressions

- ZeptoClaw
  - Issues/PRs ngày: ~14 issues, 13 PRs
  - Release hôm nay: v0.7.6 (mới)
  - Sức khỏe: Tốt — nhanh fix hardening và CLI UX

- EasyClaw
  - Issues/PRs ngày: ~1 issue, 1 PR activity
  - Release hôm nay: v1.6.6
  - Sức khỏe: Nhỏ, focus macOS + OAuth; blocker OpenAI OAuth reported

3) Vị thế của OpenClaw
- Ưu thế: OpenClaw là đầu tàu về quy mô cộng đồng và độ phủ tính năng (rất nhiều integrations provider, kênh, plugin/media); volume hoạt động gấp nhiều lần dự án khác (500+ cập nhật/24h) nên có lợi thế tốc độ phát triển và số lượng đóng góp.  
- Khác biệt kỹ thuật: OpenClaw đang vận hành at-scale agent orchestration (cron/agent lanes, embedded tool routing, rich provider-fallback logic) — đây là lớp orchestration phức tạp mà nhiều dự án nhỏ chưa có.  
- Hạn chế hiện thời: quy mô lớn đi cùng rủi ro regressions và vận hành — hiện nổi bật là các lỗi cron/agent execution và provider-compatible regressions gây mất niềm tin. So với các dự án niche (ZeptoClaw hay TinyClaw) OpenClaw có cộng đồng và độ phủ lớn nhưng cần kỷ luật release/triage cao hơn.

4) Hướng kỹ thuật chung (những yêu cầu lặp lại, kèm dự án liên quan)
- Provider diversity & adapters: OpenClaw (Kimi, Codex, GPT-5x), NanoBot (Zhipu/GLM, Mistral, Ollama), Zeroclaw (Azure), PicoClaw (Groq, LongCat), TinyClaw (Avian). Nhu cầu: chuẩn hoá adapter, comprehensive schema tests và fallback handling.  
- Cron / agent execution stability: OpenClaw (deadlocks #42579), Moltis (cron/heartbeat), Zeroclaw (daemon SIGTERM handling), IronClaw (onboarding cron failures). Nhu cầu: robust startup/catch-up logic, per-attempt AbortController, backports hotfix.  
- Session / memory bounding & token-cost controls: OpenClaw (#13938, workspace file injection #9157), NanoClaw (token optimization tracking), PicoClaw (prompt cache issues). Nhu cầu: session compaction, memory v2, inline compaction, response-length control.  
- Onboarding / packaging / binaries: OpenClaw (APK request), NanoBot (multi-instance/packaging), Zeroclaw (GLIBC compatibility), LobsterAI/EasyClaw (macOS packaging, Docker). Nhu cầu: cross-platform builds, signed macOS apps, APKs, compatibility builds (musl/static).  
- Security & config hardening: ZeptoClaw (filesystem boundary, webhook auth), NanoBot (config.json leak), Moltis (secret remote MCP), ZeptoClaw/NanoClaw emphasize least-privilege. Nhu cầu: safe exec, dirfd/openat patterns, secret vault UX.  
- Streaming / channel UX (typing, realtime): PicoClaw (Telegram typing hang), NanoClaw (WhatsApp flood), NanoBot (Telegram reply-to). Nhu cầu: buffer-before-send, stop-typing on failure, robust streaming backpressure.  
- Local-LLM & GGUF/Vulkan/Ollama support: Moltis, PicoClaw, ZeptoClaw, TinyClaw, Zeroclaw — xu hướng rõ rệt sang on-prem models; yêu cầu async register, opt-in features, compatibility tests.

5) Phân tích khác biệt hóa (ai tập trung vào gì)
- OpenClaw: nền tảng tổng hợp, quy mô cộng đồng lớn, nhiều provider & agent orchestration — hướng tới deployments production/enterprises với plugin ecosystem.  
- NanoBot: kênh & provider đa dạng, multi-instance, nhắm vào dễ tích hợp kênh (Telegram/WhatsApp/Matrix) và khu vực Trung Quốc (Zhipu).  
- Zeroclaw: tập trung vào CI/packaging, portability (32-bit), và hỗ trợ providers enterprise (Azure) — hướng tới độ bền hạ tầng.  
- PicoClaw: provider compatibility, web UX, nightly releases, roadmap automation (Android device automation) — người dùng dev/experimenters.  
- NanoClaw: tối ưu token & semantic memory (LanceDB), MCP integrations — appeal cho operators cần tiết kiệm chi phí và scale memory.  
- IronClaw: WASM/registry + CLI and channel integrations — tập trung vào modular tool runtimes (WASM) và developer workflows.  
- LobsterAI: IM-first (QQ/IM) cho thị trường Trung Quốc, UX desktop — target user: IM-heavy teams.  
- TinyClaw: TinyOffice UX, observability/mission control, lightweight queue (SQLite) — tốt cho small-team UX-first deployments.  
- Moltis: ổn định cron/sandbox, local-llm support — ops-first, chú trọng reliability.  
- ZeptoClaw: security-first (filesystem, webhook), CLI polish, Ollama keyless — target users cần high-assurance local deployments.  
- EasyClaw: desktop app macOS focus, OAuth & packaging — target end-user desktop adoption.

6) Động lực & độ trưởng thành cộng đồng (phân tầng)
- Siêu năng động / lặp nhanh: OpenClaw, PicoClaw, Zeroclaw — nhiều PR/issue, phát triển tính năng và fixes hàng ngày; rủi ro regressions cao.  
- Năng động, tập trung feature: NanoBot, IronClaw, Moltis — iterate nhanh trên stability/infra và kênh/provider support.  
- Trung bình, ổn định, UX-driven: TinyClaw, ZeptoClaw — release tính ổn định, hardening, CLI/UX polish; phản hồi nhanh cho security issues.  
- Nhỏ / tập trung niche: LobsterAI, EasyClaw, NanoClaw (nhỏ hơn) — ít activity nhưng tập trung vào vấn đề thị trường cụ thể (IM, desktop).  
- Hậu quả cho maintainers: dự án lớn cần tập trung triage/QA release; dự án nhỏ cần prioritise repro & docs để tăng adoption.

7) Tín hiệu xu hướng (hành động khuyến nghị cho nhà phát triển AI agent)
- Hỗ trợ đa-provider + adapter test-suite: chuẩn hóa adapter interface và tạo CI tests lặp để catch provider regressions sớm — ưu tiên cho OpenClaw/NanoBot/Zeroclaw/Irons.  
- Ưu tiên ổn định cron/agent loop & graceful shutdown: nhiều dự án bị downtime do cron/queue deadlock hoặc SIGTERM. Triaged hotfix + backport là must-have.  
- Quản lý context/token-cost: tích hợp compaction, response-length caps, selective history injection để giảm chi phí API; có ROI trực tiếp cho người dùng.  
- On-prem/local model readiness: GGUF/Ollama/vLLM/GPU opt-in (Vulkan) là competitive advantage — cần async model register and compatibility matrix.  
- Packaging & cross-platform builds: cung cấp signed macOS builds, APKs, musl/static binaries hoặc container images compatible (GLIBC issues) trực tiếp tăng adoption.  
- Security-by-default: harden filesystem boundaries, restrict exec, secrets vault UX; prioritized in ZeptoClaw and NanoBot reports.  
- Observability & audit: mission-control traces and tamper-evident audit (Merkle chain) là yêu cầu ngày càng tăng cho production agents.  
- Channel UX improvements: streaming buffering, stop-typing on failure, reply threading support cải thiện trải nghiệm IM.

Kết luận ngắn cho người ra quyết định kỹ thuật
- Nếu mục tiêu là nhanh tiếp cận thị trường và đa dạng provider/channel: học theo mô hình OpenClaw (scale + plugin), nhưng bổ sung quy trình release/triage nghiêm ngặt (cron/provider regression tests).  
- Nếu ưu tiên ổn định production cho deployments on-prem: tập trung vào hardening (filesystem, secrets), packaging cross-platform và kiểm thử môi trường (GLIBC/musl); ZeptoClaw/Moltis/Zeroclaw đặt mẫu tốt.  
- Ngay lập tức khuyến nghị cho tất cả dự án: 1) thêm test-suite cho provider adapters, 2) áp dụng session compaction/token-cost controls, 3) xử lý hotfix cron/daemon shutdown bugs, 4) cung cấp cross-platform builds/artefacts để giảm friction onboarding.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

1) Tổng quan hôm nay
- Hoạt động cộng đồng cao: trong 24 giờ qua có 51 issue (25 mở/hoạt động, 26 đã đóng) và 83 PR (32 mở, 51 đã merge/đóng).  
- Không có phát hành (release) mới. Dự án đang nhận nhiều đóng góp về hỗ trợ provider, kênh (channels) và cải thiện ổn định.  
- Các chủ đề nổi bật: mở rộng hỗ trợ provider (Zhipu/GLM, Mistral, Ollama), kênh nhắn tin (Telegram reply-to, WhatsApp QR, Matrix), và một vấn đề bảo mật cấu hình nghiêm trọng (config.json).  

2) Phát hành phiên bản
- Không có phiên bản mới hôm nay. Bỏ qua chi tiết thay đổi.

3) Tiến độ dự án (PRs đã merge/đóng hôm nay)
- PR #1581 — feat: multi-instance support with --config parameter (Đã đóng 2026-03-12) — thêm tùy chọn chạy nhiều instance với tham số --config, hữu ích cho triển khai multi-tenant. Link: https://github.com/HKUDS/nanobot/pull/1581
- PR #1902 — Reconcile upstream changes with custom features (Đã đóng 2026-03-12) — nhiều điều chỉnh schema và truyền param tùy chỉnh, khôi phục một số tính năng tùy biến. Link: https://github.com/HKUDS/nanobot/pull/1902
- PR #1892 — fix: filter image_url from session history for non-vision models (Đã đóng 2026-03-12) — sửa lỗi gây lỗi khi chuyển sang model không hỗ trợ vision bằng cách lọc các block image_url trong lịch sử phiên. Link: https://github.com/HKUDS/nanobot/pull/1892

Ghi chú: Một số PR quan trọng vẫn mở (ví dụ PR #1901 đề xuất giải pháp thay thế cho lọc image_url ở lớp provider). Link: https://github.com/HKUDS/nanobot/pull/1901

4) Chủ đề nóng trong cộng đồng (issues/PRs nhiều thảo luận)
- Hỗ trợ Z.AI / GLM (Issue #2, 19 bình luận) — yêu cầu tích hợp native keys cho Zhipu AI để gọi GLM-4.x/4.7: https://github.com/HKUDS/nanobot/issues/2
- Hỗ trợ Ollama (Issue #193, 13 bình luận) — người dùng hỏi về tích hợp Ollama và cách dùng cùng vLLM: https://github.com/HKUDS/nanobot/issues/193
- Kinh nghiệm chạy local & debug (Issue #855, 9 bình luận) — chia sẻ thiết lập phần cứng và các vấn đề khi chạy local với LmStudio và các model lớn: https://github.com/HKUDS/nanobot/issues/855
- Bảo mật config (Issue #1873, 8 bình luận, mới mở 2026-03-11/12) — báo cáo khả năng agent truy cập config.json và rò rỉ key thông qua exec(); yêu cầu chạy agent dưới user ít quyền hơn: https://github.com/HKUDS/nanobot/issues/1873
- Telegram reply-to / kênh (PR #1900 liên quan -> mở) — PR để đọc nội dung reply_to_message trên Telegram (fix cho Issue #1875): https://github.com/HKUDS/nanobot/pull/1900 và https://github.com/HKUDS/nanobot/issues/1875

Nhu cầu cơ bản rút ra: người dùng cần (1) mở rộng provider (cả cloud và local), (2) kênh giao tiếp đáng tin cậy (Telegram/WhatsApp/Matrix/WeChat/Feishu), và (3) bảo mật cấu hình khi chạy agent.

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao (S1): Rủi ro lộ thông tin khóa cấu hình — Issue #1873: khả năng agent đọc config.json qua exec() (yêu cầu chạy agent dưới user khác hoặc giới hạn quyền). Chưa thấy PR fix hoàn chỉnh; cần ưu tiên. https://github.com/HKUDS/nanobot/issues/1873
- Cao (S1): Ứng dụng tự thoát SIGTERM không rõ nguyên nhân — Issue #1833: nhiều báo cáo chương trình dừng đột ngột; ảnh hưởng trải nghiệm ổn định. https://github.com/HKUDS/nanobot/issues/1833
- Trung bình (S2): Lỗi provider/auth sau nâng cấp Openrouter / StepFun — Issue #842 và #1157 báo lỗi 401/400 khi gọi Openrouter/StepFun; gây gián đoạn dịch vụ cho người dùng dùng Openrouter. https://github.com/HKUDS/nanobot/issues/842 và https://github.com/HKUDS/nanobot/issues/1157
- Trung bình (S2): WhatsApp không tạo QR code (Issue #1879) — ảnh hưởng kênh WhatsApp: https://github.com/HKUDS/nanobot/issues/1879
- Trung bình (S2): Matrix missing from channel list / khởi động channel (Issue #1887, #1300) — hiển thị/khởi động channel bị lỗi: https://github.com/HKUDS/nanobot/issues/1887 và https://github.com/HKUDS/nanobot/issues/1300
- Đã có PRs sửa liên quan: PR #1892 đã đóng (lọc image_url trong lịch sử phiên) giúp tránh lỗi gọi API khi chuyển model không có vision: https://github.com/HKUDS/nanobot/pull/1892. PR #1894 (open) sửa lỗi slicing trong get_history; cần review/merge: https://github.com/HKUDS/nanobot/pull/1894

6) Yêu cầu tính năng & tín hiệu lộ trình
- Hỗ trợ provider thêm: Zhipu (Z.AI / GLM), Ollama, Mistral, Groq/StepFun tweaks — nhiều issue/PR phản ánh nhu cầu đa dạng provider (Issue #2, #193; PR #1680). Links: https://github.com/HKUDS/nanobot/issues/2, https://github.com/HKUDS/nanobot/issues/193, https://github.com/HKUDS/nanobot/pull/1680
- Multi-instance / multi-tenant triển khai (PR #1581 đóng) — cho thấy nhu cầu chạy nhiều instance/ cấu hình riêng cho teams/tenants: https://github.com/HKUDS/nanobot/pull/1581
- Kênh nhẹ Web UI zero-npm (PR #1707) và plugin system (PR #361) — xu hướng muốn UI nhẹ, plugin hóa: https://github.com/HKUDS/nanobot/pull/1707, https://github.com/HKUDS/nanobot/pull/361
- Endpoint/OpenAI-compatible API (PR #1861 đang mở) — yêu cầu expose API để tích hợp bên ngoài: https://github.com/HKUDS/nanobot/pull/1861
- Dự đoán: phiên bản tiếp theo sẽ tiếp tục tập trung vào cải thiện provider abstraction, kênh tích hợp (đặc biệt Telegram/WhatsApp/Matrix/WeChat), và các tùy chọn triển khai multi-instance/container.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: cấu hình provider dễ bị lỗi sau nâng cấp (openrouter/auth), cấu hình local chạy model lớn phức tạp (tài nguyên GPU/CPU), và kênh nhắn tin không ổn định (QR WhatsApp, Matrix). Ví dụ: user báo Openrouter 401/400 (#842, #1157), trải nghiệm local thất thường (#855). Links: https://github.com/HKUDS/nanobot/issues/842, https://github.com/HKUDS/nanobot/issues/1157, https://github.com/HKUDS/nanobot/issues/855
- Yêu cầu tính năng: nhiều người muốn native support cho các nhà cung cấp Trung Quốc (Zhipu), các giải pháp local/Ollama và trải nghiệm kênh tốt hơn (Telegram reply threading, streaming trên Telegram). Links: https://github.com/HKUDS/nanobot/issues/2, https://github.com/HKUDS/nanobot/issues/193, https://github.com/HKUDS/nanobot/pull/1900
- Hài lòng/khiếu nại: cộng đồng tích cực đóng góp PR/issue, nhưng có sự bất mãn với các lỗi gây gián đoạn trải nghiệm và thiếu tài liệu/phiên bản tiếng Trung (Issue #1617): https://github.com/HKUDS/nanobot/issues/1617

8) Theo dõi tồn đọng (cần sự chú ý của bảo trì)
- Bảo mật cấu hình: Issue #1873 — cần đề xuất kiến trúc (chạy agent dưới user ít quyền, mount/volume an toàn) và ưu tiên fix: https://github.com/HKUDS/nanobot/issues/1873
- SIGTERM / dừng đột ngột: Issue #1833 — cần logs, repro steps và triage: https://github.com/HKUDS/nanobot/issues/1833
- Openrouter / StepFun errors: Issue #842, #1157 — triage auth/param changes và cập nhật docs/provider adapter: https://github.com/HKUDS/nanobot/issues/842, https://github.com/HKUDS/nanobot/issues/1157
- Telegram reply-to support: PR #1900 (mở) — review & merge để cải thiện UX Telegram: https://github.com/HKUDS/nanobot/pull/1900
- Lịch sử session & image_url slicing: PR #1894 (open) và PR #1901 (open alternative) — cần đánh giá giải pháp để tránh regressions: https://github.com/HKUDS/nanobot/pull/1894, https://github.com/HKUDS/nanobot/pull/1901
- Plugin/WebUI / Endpoint: PR #361, #1707, #1861 — các sáng kiến lớn/kiến trúc cần maintainer review để tích hợp an toàn: https://github.com/HKUDS/nanobot/pull/361, https://github.com/HKUDS/nanobot/pull/1707, https://github.com/HKUDS/nanobot/pull/1861

Kết luận ngắn: dự án rất năng động với lượng issue/PR lớn (nhiều request về provider & channel). Ưu tiên hiện tại nên là (1) khắc phục lỗ hổng bảo mật cấu hình và sự cố dừng chương trình, (2) hoàn thiện fixes liên quan lịch sử phiên & chuyển đổi model (image_url/get_history), và (3) review/merge những PR có tác động UX lớn (multi-instance, Telegram reply-to, WebUI). Các maintainer cần tập trung triage các issue bảo mật/ổn định trước khi mở rộng thêm features lớn.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

Bản tin dự án Zeroclaw — 2026-03-12

1) Tổng quan hôm nay
- Hoạt động cộng đồng rất cao: 24 giờ qua có 46 issue cập nhật (19 mở/hoạt động, 27 đã đóng) và 50 PR cập nhật (15 mở, 35 đã merge/đóng).  
- Những thay đổi lớn tập trung vào hợp nhất nhánh (branch consolidation), đơn giản hóa CI/CD và nhiều sửa lỗi/ổn định cho gateway, web UI và trình xử lý tool-call.  
- Cảm nhận chung: sprint khắc phục sự cố và chỉnh sửa cấu trúc repo đang được đẩy mạnh — nhiều PR nhỏ/ổn định được đóng trong ngày; vẫn còn vài lỗi nghiêm trọng đang chờ sửa.  
- Tỷ lệ phản hồi nhanh: nhiều PR/docs/CI đã được đóng/được sửa trong 24h, cho thấy maintainer tích cực xử lý hậu quả của chuyển đổi nhánh và CI.

2) Phát hành phiên bản
- Hai bản beta mới được phát hành: v0.1.7-beta.30 và v0.1.7-beta.28. Những thay đổi chính trong changelog:
  - Thay thế toàn bộ workflows bằng quy trình CI/CD đơn giản hóa (PR: https://github.com/zeroclaw-labs/zeroclaw/pull/2895).  
  - Di trú sang mô hình nhánh đơn “master” và cập nhật danh sách người duy trì (PR: https://github.com/zeroclaw-labs/zeroclaw/pull/2928).  
  - Một số mục “fix” trong changelog ghi không đầy đủ (ghi “fix: re…”), cần kiểm tra ghi chú phát hành chi tiết.  
  - Lưu ý di chuyển: repo đã chuẩn hoá về nhánh master — người đóng góp cần cập nhật fork/local để tránh nhầm lẫn với nhánh main (xem thêm mục Branch consolidation).  

3) Tiến độ dự án (PRs đã merge/đóng hôm nay)
- Tổng quan: 35 PR đã được merge/đóng trong 24h — nhiều PR liên quan tới docs/branching, CI scripts, gateway fixes và UI polish. Một số PR nổi bật đã đóng:
  - Sửa lỗi strip "think" tag & tool-call regression (Qwen/Ollama): https://github.com/zeroclaw-labs/zeroclaw/pull/3241 (CLOSED) — khắc phục lỗi chuỗi suy luận làm hỏng trích xuất tool-call.  
  - Gateway: endpoint integrations/settings, WS protocol echo và session persistence: https://github.com/zeroclaw-labs/zeroclaw/pull/3242 (CLOSED) — cải thiện ổn định WebSocket và API trả về JSON.  
  - UI: auto-expanding chat textarea & copy-on-hover: https://github.com/zeroclaw-labs/zeroclaw/pull/3243 (CLOSED).  
  - Repo/docs: thay thế tham chiếu main → master, thêm phần branching model: https://github.com/zeroclaw-labs/zeroclaw/pull/3194 (CLOSED), https://github.com/zeroclaw-labs/zeroclaw/pull/3237 (CLOSED).  
  - Khắc phục cargo fmt blocking CI: https://github.com/zeroclaw-labs/zeroclaw/pull/3244 (CLOSED).  
- PR mở đáng chú ý (đang review/đợi merge):
  - Azure OpenAI provider (first-class): https://github.com/zeroclaw-labs/zeroclaw/pull/3246 (OPEN) — nếu được merge sẽ bổ sung hỗ trợ Azure.  
  - Hỗ trợ 32-bit via feature gates: https://github.com/zeroclaw-labs/zeroclaw/pull/3245 (OPEN).  
  - Handle SIGTERM cho daemon (container/K8s): https://github.com/zeroclaw-labs/zeroclaw/pull/3193 (OPEN).  
  - Webhook-audit builtin hook: https://github.com/zeroclaw-labs/zeroclaw/pull/3212 (OPEN).

4) Chủ đề nóng trong cộng đồng
- Lỗi GLIBC (mức nghiêm trọng cao): Issue #3070 — "version `GLIBC_2.39' not found" (https://github.com/zeroclaw-labs/zeroclaw/issues/3070). Nhiều người dùng gặp lỗi runtime khi chạy binary tại môi trường có libc cũ — ảnh hưởng đến khả năng chạy trên một số distro/container. Cần hướng dẫn tạm thời (rebuild trên toolchain thấp hơn hoặc cung cấp musl/static) hoặc release build tương thích.  
- Branch consolidation / default branch confusion: Issue #2929 (đã đóng) và Issue #3247 (https://github.com/zeroclaw-labs/zeroclaw/issues/3247) — cộng đồng quan tâm mạnh đến chuyển sang `master` duy nhất; nhiều PR/docs liên quan đã được cập nhật/đóng hôm nay.  
- Tool-calling regressions với Ollama/Qwen: Issue #3079 (https://github.com/zeroclaw-labs/zeroclaw/issues/3079) — mô tả model trả "thinking-only" output và gây rơi hành động; PR 3241 (fix) đã đóng để xử lý các thẻ <think> làm bẩn luồng tool-call.  
- MCP tool visibility to subagents: Issue #3069 (https://github.com/zeroclaw-labs/zeroclaw/issues/3069) — MCP công bố tool vào system prompt nhưng không expose như native callable tools cho subagents; nhu cầu rõ ràng từ người dùng sử dụng MCP/phân tách tác vụ.

5) Lỗi & Ổn định (xếp theo mức độ)
- S0 (mức rất nghiêm trọng):  
  - #3070 GLIBC_2.39 missing (https://github.com/zeroclaw-labs/zeroclaw/issues/3070) — runtime không khởi động trên hệ có libc cũ. Chưa có PR sửa chính thức trong danh sách.  
- S1 (workflow blocked / nghiêm trọng):  
  - #2930 Unbound variable on Docker bootstrap via macOS (https://github.com/zeroclaw-labs/zeroclaw/issues/2930) — cản trở setup bằng ./bootstrap.sh --docker.  
  - #2947 Docker web config saving → HTTP 500 (https://github.com/zeroclaw-labs/zeroclaw/issues/2947) — GUI không lưu config trong môi trường WSL/docker.  
  - #3135 cargo clippy pre-push hook fails on Windows (https://github.com/zeroclaw-labs/zeroclaw/issues/3135) — chặn git push trên Windows.  
- S2 (degraded behavior):  
  - #2953 Missing channel-matrix flag in official builds (https://github.com/zeroclaw-labs/zeroclaw/issues/2953).  
  - #2960 Browser pairing persistence broken (https://github.com/zeroclaw-labs/zeroclaw/issues/2960).  
  - #2494 channels_config.feishu cannot start (https://github.com/zeroclaw-labs/zeroclaw/issues/2494).  
- Đã có PR/ fixes cho một số vấn đề:
  - Qwen/Ollama tool-call regression → PR 3241 (CLOSED) (https://github.com/zeroclaw-labs/zeroclaw/pull/3241).  
  - Gateway/ws/session fixes → PR 3242 (CLOSED) (https://github.com/zeroclaw-labs/zeroclaw/pull/3242).  
  - Config secrets roundtrip test added → PR 3240 (CLOSED) (https://github.com/zeroclaw-labs/zeroclaw/pull/3240).

6) Yêu cầu tính năng & tín hiệu lộ trình
- Azure OpenAI support: Issue #3176 (https://github.com/zeroclaw-labs/zeroclaw/issues/3176) và PR 3246 (OPEN) (https://github.com/zeroclaw-labs/zeroclaw/pull/3246) — rõ ràng là một tính năng mong muốn và có PR sẵn sàng. Dự đoán: khả năng được hợp nhất trong bản phát hành tiếp theo nếu review nhanh.  
- 32-bit system support: Issue #3174 (https://github.com/zeroclaw-labs/zeroclaw/issues/3174) và PR 3245 (OPEN) (https://github.com/zeroclaw-labs/zeroclaw/pull/3245) — tín hiệu rõ ràng từ duy trì thêm target edge/legacy. Có khả năng trở thành tùy chọn build feature (feature-gated).  
- On-demand MCP tool loading / deferred activation: Issue #3095 (https://github.com/zeroclaw-labs/zeroclaw/issues/3095) — giúp giảm hệ thống prompt size; có thể ưu tiên để tối ưu hiệu năng với nhiều MCP.  
- Webhook-audit hook: PR 3212 (OPEN) (https://github.com/zeroclaw-labs/zeroclaw/pull/3212) — nhu cầu audit/observability tool calls đang tăng.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Khó chịu do nhầm nhằng nhánh (main vs master) — đã gây ra nhiều PR/doc fixes; cộng đồng yêu cầu rõ ràng hơn cho contributors. (xem PRs 3194, 3237, issue 2929).  
  - Regession tool-calling (Ollama/Qwen) gây mất chức năng tự động hoá và trải nghiệm không nhất quán — sửa bởi PR 3241 nhưng người dùng vẫn kiểm thử rộng.  
  - Cấu hình kênh và pairing không ổn định (Matrix flag thiếu trong build, Feishu/Slack thread issues, pairing persistence) ảnh hưởng những deployments thực tế.  
- Mức độ hài lòng: có tín hiệu tích cực — nhiều PR fix/UX polish được merge nhanh, nhưng vẫn còn các vấn đề môi trường/packaging (GLIBC, Docker builds) làm giảm trải nghiệm cho người dùng không có khả năng tự build.

8) Theo dõi tồn đọng / cần chú ý của maintainer
- Vấn đề cần ưu tiên (chưa hoặc đang mở):  
  - #3070 GLIBC_2.39 not found — cần hành động (build lại, hướng dẫn fallback) (https://github.com/zeroclaw-labs/zeroclaw/issues/3070).  
  - #2930 bootstrap docker failing on macOS — chặn một số người dùng mới (https://github.com/zeroclaw-labs/zeroclaw/issues/2930).  
  - #2947 web config save → HTTP 500 trong Docker/WSL (https://github.com/zeroclaw-labs/zeroclaw/issues/2947).  
  - #3069 MCP tools not exposed to delegate subagents — hành vi non-intuitive với MCP/subagent (https://github.com/zeroclaw-labs/zeroclaw/issues/3069).  
  - #3176 Add Azure OpenAI provider — PR 3246 đang mở, review & tests cần được đẩy nhanh (https://github.com/zeroclaw-labs/zeroclaw/pull/3246).  
  - #2953 channel-matrix flag missing from official builds — blocker cho người dùng Matrix (https://github.com/zeroclaw-labs/zeroclaw/issues/2953).  
- PRs/Issues trông ổn nhưng cần theo dõi thêm để release:
  - PR 3193 (SIGTERM handling) — quan trọng cho container/K8s shutdown (https://github.com/zeroclaw-labs/zeroclaw/pull/3193).  
  - PR 3245 (32-bit support) — cần CI green để chấp nhận (https://github.com/zeroclaw-labs/zeroclaw/pull/3245).  
- Đề xuất hành động nhanh cho maintainers: xử lý GLIBC release notes / provide compatibility builds; ưu tiên fixes blocking installs (bootstrap/docker), review PRs liên quan Azure/32-bit/daemon SIGTERM để chuẩn bị cho release kế tiếp.

Tài nguyên tham chiếu nhanh
- Repo: https://github.com/zeroclaw-labs/zeroclaw  
- Issue GLIBC: https://github.com/zeroclaw-labs/zeroclaw/issues/3070  
- PR changelog CI: https://github.com/zeroclaw-labs/zeroclaw/pull/2895  
- PR branch consolidation: https://github.com/zeroclaw-labs/zeroclaw/pull/2928  
- PR Qwen/Ollama fix: https://github.com/zeroclaw-labs/zeroclaw/pull/3241  
- PR gateway fixes: https://github.com/zeroclaw-labs/zeroclaw/pull/3242  
- PR Azure provider (open): https://github.com/zeroclaw-labs/zeroclaw/pull/3246  
- PR 32-bit support (open): https://github.com/zeroclaw-labs/zeroclaw/pull/3245

Kết luận ngắn: ZeroClaw đang trải qua giai đoạn ổn định hạ tầng (branch/CI) và nhiều bản sửa hữu ích đã được nhập. Tuy nhiên vài vấn đề môi trường/packaging (GLIBC, Docker) và tính năng MCP/adapter vẫn cần ưu tiên để đảm bảo trải nghiệm triển khai mượt mà cho người dùng.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

PicoClaw — Bản tin dự án (2026-03-12)

1) Tổng quan hôm nay
- Hoạt động đóng/mở PR và issue rất cao: trong 24 giờ có 104 PR được cập nhật (64 mở, 40 merge/đóng) và 23 issue có hoạt động (17 mở/hoạt động, 6 đóng). Dự án đang trong giai đoạn phát triển tích cực với nhiều sửa lỗi provider/agent và cải tiến giao diện web.
- Phiên bản nightly mới được phát hành hôm nay (v0.2.2-nightly.20260312.6612ca09), kèm vài thay đổi về channel, provider và agent internals — build cảnh báo có thể không ổn định.
- Tín hiệu tích cực: nhiều PR sửa lỗi liên quan tới tương thích provider (OpenAI/Groq) và cải thiện trải nghiệm web; trạng thái cần chú ý là một số lỗi provider và race condition vẫn còn mở.

2) Phát hành phiên bản
- v0.2.2-nightly.20260312.6612ca09 (Nightly for v0.2.2)
  - Những thay đổi nổi bật trong changelog:
    - Enable rich-text messages in matrix channel (commit 39a451d) — #1370 (xem thay đổi trong build nightly).
    - Thêm hỗ trợ provider "LongCat" (commit 9222351) — #1317.
    - Fix: initialize MCP in direct agent mode (commit 9b0a48a).
  - Lưu ý: Đây là nightly build (tự động, có thể không ổn định). Full changelog: https://github.com/sipeed/picoclaw/compare/v0.2.2...v0.2.2-nightly.20260312.6612ca09
- v0.2.2 (staged release) vẫn tồn tại; nightly là bản thử nghiệm của v0.2.2.

3) Tiến độ dự án (PRs đã merge/đóng & mốc quan trọng)
- Hoạt động 24h: 40 PR đã được merge/đóng. Một số PR đã đóng/merge đáng chú ý:
  - #1388 Closed — Remove stale TOOLS.md references (dọn dẹp tài liệu/migration): https://github.com/sipeed/picoclaw/pull/1388
  - #1056 Closed — fix(read_file) add safe guard: https://github.com/sipeed/picoclaw/pull/1056
  - #956 Closed — fix promptcachekey used for non-openai models: https://github.com/sipeed/picoclaw/pull/956
  - #1196 Closed — skip prompt_cache_key for Groq endpoints (fix tương thích Groq): https://github.com/sipeed/picoclaw/pull/1196
  - #1355 Closed — include TOOLS.md in bootstrap files & cache tracking: https://github.com/sipeed/picoclaw/pull/1355
  - #1387 Closed — improve prompt_cache_key host matching: https://github.com/sipeed/picoclaw/pull/1387
- PRs open/đang review với ảnh hưởng lớn:
  - #1390 Open — fix(telegram): stop typing indicator when LLM fails/hangs (giải quyết trạng thái typing vô hạn): https://github.com/sipeed/picoclaw/pull/1390
  - #1385 / #1386 Open — web fixes: restore last active chat session (#1385) https://github.com/sipeed/picoclaw/pull/1385 ; allow horizontal scrolling in raw json editor (#1386) https://github.com/sipeed/picoclaw/pull/1386
  - #1393 / #1391 Open — build/onboard and model round-robin fixes: https://github.com/sipeed/picoclaw/pull/1393 , https://github.com/sipeed/picoclaw/pull/1391

4) Chủ đề nóng trong cộng đồng
- "Agent refactor / What an Agent is" — Issue #1218 (13 bình luận): thảo luận định nghĩa SOUL.md và AGENT.md cho pico agent; nhu cầu: rõ ràng về persona/nhân cách agent và định dạng bootstrap. https://github.com/sipeed/picoclaw/issues/1218
- Event-driven agent loop — Issue #1316 (7 bình luận): đề xuất chuyển loop agent sang event-driven để hỗ trợ hooks, interrupts, steering — ảnh hưởng lớn đến khả năng quan sát, mở rộng và tương tác thời gian thực. https://github.com/sipeed/picoclaw/issues/1316
- Groq API compatibility — Issue #748 (6 bình luận): Groq trả về định dạng tool call khác gây lỗi tool_use_failed; nhiều PR đã thêm ngoại lệ cho prompt_cache_key nhưng vấn đề tương thích tool-calling vẫn nóng. https://github.com/sipeed/picoclaw/issues/748
- Web UI session/editor UX — Issue #1373 & PR #1385/#1386: người dùng yêu cầu lưu/khôi phục phiên chat gần nhất và sửa trình soạn JSON (cuộn ngang). Issue: https://github.com/sipeed/picoclaw/issues/1373

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao
  - Groq tool call / prompt cache incompatibility — #748 (tác động: agent tool-calls thất bại trên Groq) — có PR đã loại prompt_cache_key cho Groq (#1196/#835) nhưng vẫn cần kiểm thử rộng. https://github.com/sipeed/picoclaw/issues/748
  - TUI config race / PHI tab write race — #1151 (priority: high): race read-modify-write có thể làm hỏng config; cần sửa concurrency trong tui. https://github.com/sipeed/picoclaw/issues/1151
  - Launcher docker image manifest không có — #1350 (deploy bằng docker-compose thất bại): ảnh hưởng tới trải nghiệm triển khai. https://github.com/sipeed/picoclaw/issues/1350
- Trung bình
  - Provider/tool calling fails — #1287 (JSON unmarshal tool_calls error): ảnh hưởng tới tool-calls, liên quan tới parsing định dạng trả về từ LLMs. https://github.com/sipeed/picoclaw/issues/1287
  - SSL problem for volcengine — #1375 (kết nối provider bị lỗi SSL): https://github.com/sipeed/picoclaw/issues/1375
  - Windows build error khi khởi động từ source — #1348: ảnh hưởng tới contributor/Windows user onboarding. https://github.com/sipeed/picoclaw/issues/1348
- Ghi chú sửa lỗi đã có PR:
  - prompt_cache_key/Groq: PRs #1196, #835, #956 đã đóng/merge. #1196: https://github.com/sipeed/picoclaw/pull/1196
  - TOOLS.md cleanup và bootstrap: #1388, #1355 đóng/merge. #1388: https://github.com/sipeed/picoclaw/pull/1388

6) Yêu cầu tính năng & tín hiệu lộ trình
- Android Device Automation & Remote Operations — #292 (roadmap, priority high): mong muốn tích hợp điều khiển thiết bị Android để hỗ trợ tác vụ thực thi—dấu hiệu cho khả năng hành động thực tế của agent. https://github.com/sipeed/picoclaw/issues/292
- Engram as persistent memory backend — #175: đề xuất backend bộ nhớ có tìm kiếm (thay cho MEMORY.md file-based). https://github.com/sipeed/picoclaw/issues/175
- Telegram realtime streaming support — #1098: người dùng muốn streaming real-time cho trải nghiệm assistant mượt hơn. https://github.com/sipeed/picoclaw/issues/1098
- GitHub Device Code Auth for Copilot, WeCom long-connection, OpenIM plugin — các yêu cầu tích hợp kênh & auth (#1347, #1295, #1372) cho thấy nhu cầu mở rộng kênh và xác thực. https://github.com/sipeed/picoclaw/issues/1347 , https://github.com/sipeed/picoclaw/pull/1295 , https://github.com/sipeed/picoclaw/issues/1372
- Dự đoán: trong bản phát hành tiếp theo sẽ ưu tiên:
  - Sửa các tương thích provider (Groq, OpenAI-compat) và typing/streaming channel fixes (Telegram, Matrix).
  - Cải tiến agent loop / hooks theo #1316 nếu có đóng góp chính thức.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Tương thích provider và tool-calling: Groq và một số provider gây lỗi tool calls — làm người dùng mất tính năng công cụ (tools). (Issue #748, #1287)
  - UX web: raw JSON editor không cuộn ngang và không ghi nhớ phiên chat — ảnh hưởng tới workflow quản trị và cấu hình. (Issues #1369/#1373)
  - Triển khai: Docker launcher manifest thiếu và build trên Windows gặp lỗi khiến onboarding khó khăn. (Issues #1350, #1348)
  - Concurrency/race trong TUI config khiến config bị ghi đè.
- Mức độ hài lòng: cộng đồng tích cực đóng góp nhiều PR thể hiện quan tâm cao; tuy nhiên các vấn đề liên quan tới provider/triển khai và race conditions đang gây phiền toái thực tế cho người dùng sản xuất.

8) Theo dõi tồn đọng (cần sự chú ý của bảo trì)
- Agent refactor & persona files: #1218 — cần quyết định format/behavior cho SOUL.md / AGENT.md. https://github.com/sipeed/picoclaw/issues/1218
- Event-driven agent loop: #1316 — lớn về kiến trúc, cần roadmap/owner. https://github.com/sipeed/picoclaw/issues/1316
- Iteration limit / context bounding: #440 — thay đổi chính sách vòng lặp agent, tránh hard-limit 20 iteration. https://github.com/sipeed/picoclaw/issues/440
- Groq compatibility (tool calls): #748 — cần test end-to-end với các PR đã đóng để đảm bảo vấn đề được giải quyết. https://github.com/sipeed/picoclaw/issues/748
- TUI PHI tab race: #1151 — priority high, cần sửa concurrency. https://github.com/sipeed/picoclaw/issues/1151
- Docker launcher manifest: #1350 — blockers deploy; đề nghị release maintainer kiểm tra image tags/manifests. https://github.com/sipeed/picoclaw/issues/1350
- Android automation / Engram memory / GitHub device auth: #292, #175, #1347 — feature requests quan trọng cho roadmap dài hạn. https://github.com/sipeed/picoclaw/issues/292 , https://github.com/sipeed/picoclaw/issues/175 , https://github.com/sipeed/picoclaw/issues/1347

Kết luận ngắn: Dự án rất năng động với nhiều đóng góp sửa lỗi và cải tiến (đặc biệt cho provider và web UX), nhưng vẫn còn vài vấn đề cấp cao (tương thích provider, race condition, deploy) cần sự tập trung của maintainers để tăng độ ổn định cho người dùng sản xuất. Các link được trích dẫn chi tiết trong từng mục để tiện theo dõi.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

NanoClaw — Bản tin dự án (2026-03-12)

1) Tổng quan hôm nay
- Hoạt động cộng đồng cao: 24-giờ qua có 16 issue (10 mở/đang hoạt động, 6 đóng) và 38 PR (30 mở, 8 đã đóng/merged).  
- Chủ đề chính tập trung vào tối ưu token (bộ tính năng/issue liên quan được tạo và một số tracking issue vừa đóng), tính năng bộ nhớ ngữ nghĩa (LanceDB) và nhiều PR mở cho kênh/skill mới.  
- Tình trạng ổn định: vẫn còn vài lỗi nghiêm trọng liên quan streaming và truyền biến môi trường vào container; nhiều PR fix/ổn định đang chờ rà soát.

2) Phát hành phiên bản
- Không có phiên bản mới hôm nay. (Không có bản phát hành để báo cáo.)

3) Tiến độ dự án (PR đã merge/đóng hôm nay & việc được đẩy mạnh)
- Một số tracking issue cho loạt tối ưu token đã được đóng (có thể đang chuyển sang giai đoạn triển khai): Token Optimization tracking (#983: https://github.com/qwibitai/nanoclaw/issues/983), và hai cơ chế con (#980: https://github.com/qwibitai/nanoclaw/issues/980, #982: https://github.com/qwibitai/nanoclaw/issues/982) đã đóng hôm nay.  
- PR tính năng bộ nhớ ngữ nghĩa bằng LanceDB ban đầu (feat: semantic memory) đã được đóng/processed (#977: https://github.com/qwibitai/nanoclaw/pull/977). Một PR mới cải tiến tương tự vẫn mở (#979: https://github.com/qwibitai/nanoclaw/pull/979).  
- PR sửa streaming để gom kết quả trước khi gửi (giảm flood trên WhatsApp) đang chờ review (#965: https://github.com/qwibitai/nanoclaw/pull/965).  
- Các PR mở nổi bật đang tiến triển: GitHub MCP server (#976: https://github.com/qwibitai/nanoclaw/pull/976), multi-instance support (#970: https://github.com/qwibitai/nanoclaw/pull/970), alternative agent engine (#963: https://github.com/qwibitai/nanoclaw/pull/963), kênh mới (Feishu #964, Discord image/voice #974, QQ #966).

4) Chủ đề nóng trong cộng đồng
- Tối ưu token (chi phí): loạt issue/feature liên quan (tracking #983 https://github.com/qwibitai/nanoclaw/issues/983; Inline Compaction #984 https://github.com/qwibitai/nanoclaw/issues/984; Response length control #985 https://github.com/qwibitai/nanoclaw/issues/985; CLAUDE.md auto-compression #986 https://github.com/qwibitai/nanoclaw/issues/986). Nhu cầu cơ bản: giảm chi phí hoạt động bằng cách nén lịch sử/thắt chặt output mà không thêm chi phí gọi LLM.  
- Bảo mật chạy trong container: issue #865 (Using containers alone doesn't make you more secure) (https://github.com/qwibitai/nanoclaw/issues/865) đề cập tin cậy container ở nhiều điểm — cộng đồng muốn kiểm soát mặt hạn chế quyền/đường đi cho script.  
- Streaming flood trên kênh (WhatsApp): issue #732 (Send message after agent completes, not during streaming) (https://github.com/qwibitai/nanoclaw/issues/732) có liên quan trực tiếp tới PR #965 (fix streaming) (https://github.com/qwibitai/nanoclaw/pull/965).  
Các link trên là tâm điểm thảo luận/dẫn hướng roadmap.

5) Lỗi & Ổn định (xếp theo mức độ nghiêm trọng)
- Cao
  - Không nhận được phản hồi từ NanoClaw (Issue #958: https://github.com/qwibitai/nanoclaw/issues/958) — người dùng báo agent không trả lời sau khi setup; ảnh hưởng trực tiếp trải nghiệm.  
  - MCP env vars không được truyền vào container sau migration credential proxy (Issue #960: https://github.com/qwibitai/nanoclaw/issues/960) — làm hỏng tích hợp với MCP bên ngoài; tác động lớn cho người dùng cấu hình.  
  - Streaming gây flood message (Issue #732: https://github.com/qwibitai/nanoclaw/issues/732) — trải nghiệm kênh xấu; PR #965 (https://github.com/qwibitai/nanoclaw/pull/965) đang cố gắng sửa bằng cách buffer và gửi 1 lần sau khi agent hoàn tất.  
- Trung bình
  - Setup chậm (Issue #973: https://github.com/qwibitai/nanoclaw/issues/973) — nhiều người cảm thấy setup qua claude code quá phức tạp.  
  - Auth token name mismatch (Issue #853: https://github.com/qwibitai/nanoclaw/issues/853) — thiếu hỗ trợ biến môi trường ANTHROPIC_AUTH_TOKEN trong verify step.  
- Ghi chú về PR sửa lỗi: PRs #930 (refresh expired OAuth tokens) (https://github.com/qwibitai/nanoclaw/pull/930) và #969 (token refresh locking fix) (https://github.com/qwibitai/nanoclaw/pull/969) đang giải quyết lỗi 401 do token hết hạn.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Ưu tiên cao: giảm chi phí token (Inline Compaction #984 https://github.com/qwibitai/nanoclaw/issues/984, Response length control #985 https://github.com/qwibitai/nanoclaw/issues/985, CLAUDE.md compression #986 https://github.com/qwibitai/nanoclaw/issues/986). Đây là tín hiệu mạnh về yêu cầu tiết kiệm chi phí vận hành.  
- Tính năng bộ nhớ ngữ nghĩa và công cụ MCP: LanceDB memory skill (#979 https://github.com/qwibitai/nanoclaw/pull/979) và GitHub MCP server (#976 https://github.com/qwibitai/nanoclaw/pull/976) cho thấy xu hướng mở rộng khả năng agents truy cập kho tri thức và dịch vụ bên ngoài.  
- Mở rộng deployment: multi-instance support (#970 https://github.com/qwibitai/nanoclaw/pull/970) và hỗ trợ engine thay thế (#963 https://github.com/qwibitai/nanoclaw/pull/963) là các ứng viên cho bản phát hành tiếp theo.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: chi phí token tăng do prompt/ memory bloat; lỗi token OAuth hết hạn gây downtime theo chu kỳ; một số thiết lập/giải pháp quá phức tạp đối với người dùng không chuyên.  
- Mong muốn: cấu hình đơn giản hơn (setup nhanh), bảo mật tốt hơn (không tin cậy container tuyệt đối, kiểm soát env/secret), và khả năng mở rộng (multi-instance, Podman đề xuất #957 https://github.com/qwibitai/nanoclaw/issues/957).  
- Tâm trạng cộng đồng: tích cực tham gia (nhiều PR/issue) nhưng có sự bất mãn rõ rệt về trải nghiệm vận hành và chi phí.

8) Theo dõi tồn đọng (cần chú ý từ maintainers)
- Issue/PR cần review sớm:
  - PR sửa streaming: #965 (https://github.com/qwibitai/nanoclaw/pull/965) — liên quan trực tiếp tới issue #732.  
  - PR LanceDB memory: #979 (https://github.com/qwibitai/nanoclaw/pull/979) và PR GitHub MCP: #976 (https://github.com/qwibitai/nanoclaw/pull/976) — review để sớm có tính năng memory/MCP.  
  - Token refresh fixes: #930 (https://github.com/qwibitai/nanoclaw/pull/930) và #969 (https://github.com/qwibitai/nanoclaw/pull/969).  
  - Bảo mật container: issue #865 (https://github.com/qwibitai/nanoclaw/issues/865) — cần thảo luận thiết kế và roadmap cải thiện hardening.  
  - MCP env interpolation bug: #960 (https://github.com/qwibitai/nanoclaw/issues/960).  
  - Setup UX: #973 (https://github.com/qwibitai/nanoclaw/issues/973) và verify token name #853 (https://github.com/qwibitai/nanoclaw/issues/853).  
- Lời khuyến nghị: ưu tiên fixes ảnh hưởng trực tiếp đến hoạt động (token refresh, streaming flood, env propagation), đồng thời duy trì tiến độ trên token-cost optimizations và native MCP integrations.

Kết luận ngắn: dự án rất năng động với nhiều đóng góp tính năng (memory, MCP, kênh mới) và các nỗ lực tối ưu chi phí đang tăng tốc. Tuy nhiên các vấn đề về authentication, env propagation và streaming trải nghiệm cần được ưu tiên để giữ ổn định cho người dùng hiện tại.

Các liên kết tham chiếu
- Issues & PRs trích dẫn trong bản tin xuất phát từ kho: https://github.com/qwibitai/nanoclaw (xem từng link đã đính kèm bên trên).

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

IronClaw — Bản tin dự án (2026-03-12)

1) Tổng quan hôm nay
- Hoạt động cộng đồng cao: 24 PR mở, 37 issue hoạt động; trong 24 giờ có 50 PR được cập nhật (26 đã merge/đóng) và 45 issue (8 đã đóng). Dự án đang trong giai đoạn ổn định sau đợt promote staging -> main và có nhiều báo cáo liên quan tới WASM / registry / tích hợp kênh.  
- Tập trung kỹ thuật hiện tại: bản phát hành v0.18.0 (2026-03-11) + chỉnh sửa manifest/checksum cho WASM artifacts, đồng thời loạt báo cáo bug_bash về tích hợp kênh (Telegram, Google OAuth, Google Sheets) xuất hiện mạnh ngày hôm nay.  
- Sức khỏe tổng thể: mã base tiếp tục nhận tính năng CLI và cải tiến bảo mật; nhưng tồn tại nhiều lỗi tích hợp kênh và vấn đề registry/WASM cần ưu tiên.

2) Phát hành phiên bản
- v0.18.0 (0.18.0) — 2026-03-11. Release notes ghi nhận việc promote staging lên main và cập nhật WASM artifacts:
  - Merge PR #907 (staging→main) và promote staging ([#865]). (xem release trên GitHub)
  - Lưu ý quan trọng: nhiều manifest WASM trước đây chưa dùng tên phiên bản hoặc checksum chính xác — dẫn tới 404/checksum failures khi chạy ironclaw registry install. Có PR đang sửa manifest để sử dụng URL bản phiên bản hoá và checksum (PR #1007).  
  - Tác động có thể có: người dùng mới/khởi tạo có thể gặp lỗi khi onboarding nếu registry artifacts không khớp với bản host WIT (xem Issue #840). Nếu bạn vận hành agent production, kiểm tra/đồng bộ manifest & checksums sau bản này.
  - Link release: https://github.com/nearai/ironclaw/releases/tag/v0.18.0

3) Tiến độ dự án (PR đã merge/đóng gần đây)
- Đợt promote staging → main (ghi nhận trong release). PR promote tự động: #1006 (auto-promotion staging → main) đang mở để tiếp tục chuỗi promote: https://github.com/nearai/ironclaw/pull/1006  
- PR/merge/đóng đáng chú ý trong 48h qua:
  - fix: patch manifest khi tools/channels share filename — merged/closed (#945): https://github.com/nearai/ironclaw/pull/945  
  - Security / hardening merges (gần đây): webhook HMAC migration (#513), CSP header (#514), sandbox FullAccess restriction (#516), thread-safe env override fix (#522). (xem #513, #514, #516, #522)  
  - PRs tính năng CLI lớn đang mở: channels list (#933) và skills CLI (#918) — đẩy mạnh trải nghiệm CLI cho quản trị và headless use-cases:
    - https://github.com/nearai/ironclaw/pull/933
    - https://github.com/nearai/ironclaw/pull/918
  - PR bảo đảm registry artifacts / checksums: #961 (ci guard) và #1007 (update registry manifests với URL & SHA256 từ v0.18.0):
    - https://github.com/nearai/ironclaw/pull/961
    - https://github.com/nearai/ironclaw/pull/1007

4) Chủ đề nóng trong cộng đồng
- Vấn đề yêu cầu auth NEAR AI / cảm xúc người dùng (#142, 9 bình luận) — nhiều bất mãn về phần auth bắt buộc: https://github.com/nearai/ironclaw/issues/142  
- Ngrok / Managed tunnel problems:
  - ngrok trở thành process zombie sau khi lấy URL (bug reported) — #733 (5 bình luận): https://github.com/nearai/ironclaw/issues/733  
  - Managed tunnel bind sai cổng (bind vào 3000 thay vì 8080) dẫn tới webhook 404 — #738: https://github.com/nearai/ironclaw/issues/738  
- Onboarding cài đặt WASM lỗi tương thích WIT — Issue #840 (WASM artifacts cũ so với host WIT 0.3.0): https://github.com/nearai/ironclaw/issues/840  
- Loạt bug_bash tập trung (ngày 2026-03-12) — nhiều vấn đề UX/integration được report đồng thời (ví dụ Telegram pairing, Google OAuth, Google Sheets, rate limiter, tool approval UX): hàng loạt issue #991–#1005 (ví dụ #1005 cao mức độ): https://github.com/nearai/ironclaw/issues/1005

5) Lỗi & Ổn định — danh sách theo mức độ nghiêm trọng (tóm tắt)
- Cao (HIGH)
  - #1005 — Inconsistent double opt-in enforcement pathway (staging CI): mức HIGH — cần review hành vi opt-in trước khi promote: https://github.com/nearai/ironclaw/issues/1005
  - Registry/WASM mismatches dẫn tới 404 / checksum failures (v0.18.0): liên quan đến onboarding break; PR sửa manifest đang mở #1007: https://github.com/nearai/ironclaw/pull/1007
  - Onboard installs stale WASM tools incompatible with host WIT — #840: https://github.com/nearai/ironclaw/issues/840
- Trung bình (MEDIUM)
  - Ngrok tunnel binding / zombie process (#733, #738) — làm mất webhook/tunnel reliability: https://github.com/nearai/ironclaw/issues/733, https://github.com/nearai/ironclaw/issues/738
  - CI auto-created staging review warnings (unbounded JSON, hardcoded env, misleading warnings) — #976–#980, #988–#990: https://github.com/nearai/ironclaw/issues/976 (ví dụ)  
- Thấp / UX
  - Tool approval modal không hiện realtime (#996) và "Error: Waiting for approval" gây hiểu nhầm (#997): https://github.com/nearai/ironclaw/issues/996, https://github.com/nearai/ironclaw/issues/997
  - Google Sheets / OAuth integration bugs (403, malformed clientid param, values serialized as string) — #992, #999, #993: https://github.com/nearai/ironclaw/issues/992, https://github.com/nearai/ironclaw/issues/999, https://github.com/nearai/ironclaw/issues/993
- Ghi chú sửa lỗi đã có PR:
  - Manifest/filename collision patched (#945): https://github.com/nearai/ironclaw/pull/945
  - CI guard for registry artifacts added (#961): https://github.com/nearai/ironclaw/pull/961
  - PR chuẩn hoá registry manifests (URL+SHA) mở để hoàn thiện (#1007): https://github.com/nearai/ironclaw/pull/1007

6) Yêu cầu tính năng & tín hiệu lộ trình
- CLI nâng cấp: channels list, skills list/search/info, routine management CLI — nhiều PR đang mở (#933, #918, #844). Có xu hướng rõ ràng: đầu tư vào trải nghiệm CLI / headless:  
  - https://github.com/nearai/ironclaw/pull/933
  - https://github.com/nearai/ironclaw/pull/918
  - https://github.com/nearai/ironclaw/pull/844
- Hỗ trợ kênh Gateway/WASM (Discord Gateway PR #944) và cải tiến UX kênh — có thể trở thành prior trong release tiếp theo: https://github.com/nearai/ironclaw/pull/944
- Provider & model support (Z.AI GLM-5 PR #938) — mở rộng khả năng LLM backend: https://github.com/nearai/ironclaw/pull/938
- Nhiều issue yêu cầu: cải thiện Telegram pairing reliability, Google OAuth từ kênh Telegram, routines cross-channel visibility — các đề xuất này có khả năng được ưu tiên nếu liên quan đến trải nghiệm người dùng phổ biến (#1001, #992, #995,…)

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Onboarding không trơn: WASM artifact mismatch, checksum/404, và công cụ cài đặt thất bại khiến trải nghiệm lần đầu kém mượt. (Issue #875, #840) https://github.com/nearai/ironclaw/issues/875, https://github.com/nearai/ironclaw/issues/840  
  - Tích hợp kênh (Telegram, Slack, webhooks) không ổn định: pairing cần thao tác thủ công, token validation thất thường, webhook routing sai cổng. (Issues #1001, #991, #738) https://github.com/nearai/ironclaw/issues/1001, https://github.com/nearai/ironclaw/issues/991, https://github.com/nearai/ironclaw/issues/738  
  - UX: modal phê duyệt công cụ không hiển thị realtime, thông báo "Error" cho trạng thái chờ gây hoang mang. (Issues #996, #997) https://github.com/nearai/ironclaw/issues/996, https://github.com/nearai/ironclaw/issues/997
- Mức độ hài lòng: người dùng kỹ thuật đánh giá cao cải tiến bảo mật và CLI, nhưng bức xúc với các lỗi tích hợp/kênh và onboarding.

8) Theo dõi tồn đọng (cần sự chú ý của người bảo trì)
- Urgent / cần review & action:
  - #1005 — Inconsistent double opt-in enforcement (HIGH): https://github.com/nearai/ironclaw/issues/1005
  - #1007 — PR để dùng URL bản phiên bản + checksums cho tất cả WASM manifests (mở): https://github.com/nearai/ironclaw/pull/1007
  - #961 — CI guard cho registry artifact checksum/URL (mở): https://github.com/nearai/ironclaw/pull/961
  - #840 — onboarding cài WASM lỗi WIT mismatch: https://github.com/nearai/ironclaw/issues/840
  - #733 / #738 — ngrok tunnel zombie và tunnel bind sai cổng: https://github.com/nearai/ironclaw/issues/733, https://github.com/nearai/ironclaw/issues/738
  - #992, #993, #999 — Google OAuth / Google Sheets integration bugs (Telegram-initiated OAuth URL, values param, permission 403): https://github.com/nearai/ironclaw/issues/992, https://github.com/nearai/ironclaw/issues/993, https://github.com/nearai/ironclaw/issues/999
- PR features cần review để tiếp tục forward:
  - CLI features: #933, #918, #844 (review/merge để hoàn thiện CLI UX): https://github.com/nearai/ironclaw/pull/933, https://github.com/nearai/ironclaw/pull/918, https://github.com/nearai/ironclaw/pull/844
  - Discord Gateway WASM flow: #944 (kiểm thử và review): https://github.com/nearai/ironclaw/pull/944

Kết luận ngắn
- Hoạt động phát triển rất năng động (bản v0.18.0 + nhiều PR/issue). Ưu tiên hiện tại nên là: 1) hoàn thiện registry manifests + checksum/versioned URLs để khắc phục onboarding/404; 2) xử lý các lỗi kênh/Webhook/ngrok làm ảnh hưởng đến tính năng giao tiếp; 3) giải quyết loạt bug_bash liên quan đến Telegram/Google OAuth/Sheets để cải thiện trải nghiệm người dùng.  

Nếu cần, tôi có thể tổng hợp danh sách tác vụ ưu tiên (triaged backlog) theo thứ tự tác động và đề xuất owners/labels cho mỗi issue/PR.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

1) Tổng quan hôm nay
- Hoạt động cộng đồng đang ở mức cao: trong 24 giờ qua có 12 issue được cập nhật (11 đang mở/hoạt động, 1 đóng) và 11 PR được cập nhật (4 mở, 7 đã merge/đóng).  
- Có một bản phát hành mới v0.2.3, tập trung vào sửa lỗi IM/QQ, cải thiện phân trang chat và hỗ trợ chọn nhiều file trên giao diện chính.  
- Dòng nhận xét và issue chủ yếu xoay quanh tính ổn định (đọc ảnh bị treo, thực thi bash chậm), khả năng nhớ của agent và trải nghiệm cập nhật/triển khai (docker, biến môi trường).

2) Phát hành phiên bản
- v0.2.3 (mới)
  - Nội dung chính (tổng hợp từ changelog):
    - Sửa lỗi IM/QQ liên quan (Liuzhq/im qq fix) — PR https://github.com/netease-youdao/LobsterAI/pull/348
    - Cải thiện phân trang cuộc trò chuyện (chat paging) — PR https://github.com/netease-youdao/LobsterAI/pull/355
    - Tính năng: giao diện chính hỗ trợ chọn nhiều file cho attachment — PR https://github.com/netease-youdao/LobsterAI/pull/371
  - Lưu ý di chuyển / breaking changes: không có ghi chú về thay đổi phá vỡ trong changelog; thông tin thay đổi có vẻ là sửa lỗi và cải tiến giao diện. (Ghi chú: phần cuối changelog bị cắt ("fi"), nếu cần, nên xác nhận release notes đầy đủ trong repo.)

3) Tiến độ dự án (PRs đã merge/đóng hôm nay)
- Đã merge/đóng (7 PRs) — những PR đáng chú ý:
  - #371 feat: 主界面附件支持多文件选择 — nhiều-file attachment (https://github.com/netease-youdao/LobsterAI/pull/371)
  - #378、#381、#383: hỗ trợ OpenClaw cho các kênh IM (钉钉、qq、企微) — tích hợp IM/OpenClaw (https://github.com/netease-youdao/LobsterAI/pull/378, /pull/381, /pull/383)
  - #375 fix: 修复 mac 端 node 环境污染的问题 — sửa vấn đề môi trường Node trên mac (https://github.com/netease-youdao/LobsterAI/pull/375)
  - #372、#373: các PR liên quan đến async message handler (một số bản sao/phiên bản đã bị đóng) — nỗ lực xử lý timeout nền cho IM (https://github.com/netease-youdao/LobsterAI/pull/372, /pull/373)
- Mở/đang review (4 PRs) đáng chú ý:
  - #376 feat: hourly schedule mode for scheduled tasks — lịch theo giờ (https://github.com/netease-youdao/LobsterAI/pull/376)
  - #380 feat: support for custom URI protocols in markdown links — mở được ứng dụng ngoài từ markdown (https://github.com/netease-youdao/LobsterAI/pull/380)
  - #240 Feat/workflow enhancement — đề xuất workflow agent phân công trách nhiệm và soul.md (https://github.com/netease-youdao/LobsterAI/pull/240)
  - #374 fix: Add async message handler to prevent IM platform timeout — bản PR hiện vẫn mở (https://github.com/netease-youdao/LobsterAI/pull/374)

4) Chủ đề nóng trong cộng đồng
- Issue #344: “自动在字符串中加空格的问题” (5 bình luận) — người dùng báo lỗi nghiêm trọng: LobsterAI tự chèn khoảng trắng giữa “Chinese+number”, gây hỏng chuỗi/nhãn và làm không thể thay thế OpenClaw. Link: https://github.com/netease-youdao/LobsterAI/issues/344. Nhu cầu: sửa xử lý token/formatting khi mix ngôn ngữ/chữ số; mức ưu tiên cao cho người dùng bị ảnh hưởng.
- Issue #350: “bash执行太慢了” (3 bình luận) — thực thi lệnh shell chậm/treo, làm giảm trải nghiệm CLI/skill. Link: https://github.com/netease-youdao/LobsterAI/issues/350.
- Issue #357: “让ai读取图片会卡死” (3 bình luận) — đọc ảnh dẫn tới treo app; có ảnh minh họa. Link: https://github.com/netease-youdao/LobsterAI/issues/357.
- Issue #186: “记忆能力很差” — phàn nàn về khả năng nhớ (memory) kém so với OpenClaw; liên quan đến việc agent không lưu/truy xuất ngữ cảnh đúng. Link: https://github.com/netease-youdao/LobsterAI/issues/186.
- Những tín hiệu khác: yêu cầu docker (#386), cấu hình biến môi trường (#377), lỗi token/context (#370), tính năng mở đường dẫn file từ chat (#379).

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng dựa trên ảnh hưởng)
- Cao (critical/high)
  - #344: tự chèn khoảng trắng giữa chữ Hán và số — phá vỡ đầu ra chuỗi, nhiều người dùng gọi là blocker. (https://github.com/netease-youdao/LobsterAI/issues/344)
  - #357: đọc ảnh gây treo app — ảnh hưởng trực tiếp tới tính khả dụng khi dùng tính năng đọc Ảnh. (https://github.com/netease-youdao/LobsterAI/issues/357)
- Trung bình
  - #350: thực thi bash chậm hoặc chờ lệnh không trả về — ảnh hưởng UX của các skill tương tác shell. (https://github.com/netease-youdao/LobsterAI/issues/350)
  - #370: lỗi token/context dẫn tới API Error 400 — cần validate input và hiển thị cảnh báo trước khi gọi model. (https://github.com/netease-youdao/LobsterAI/issues/370)
  - #385: 对话报错 liên quan Claude Code process exit code 1 — cần log chi tiết và resilience. (https://github.com/netease-youdao/LobsterAI/issues/385)
- Thấp/không cấp bách
  - #382: cập nhật làm mất settings — trải nghiệm cập nhật. (https://github.com/netease-youdao/LobsterAI/issues/382)
- Ghi chú về PR sửa lỗi: v0.2.3 bao gồm một số sửa IM/QQ (#348) và các PR async message handler (#372/#373 đã đóng, #374 đang mở). Cần kiểm tra xem các PR async đã xử lý triệt để timeout và edge-case.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Yêu cầu phổ biến:
  - Hỗ trợ deploy trong Docker (#386) — nhiều người muốn triển khai server/agent trong container. (https://github.com/netease-youdao/LobsterAI/issues/386)
  - Cấu hình biến môi trường trong app để skill có thể đọc process.env (ví dụ API key) — #377. (https://github.com/netease-youdao/LobsterAI/issues/377)
  - Mở file所在路径 từ chat (icon mở thư mục) — đề xuất UX nhỏ nhưng hữu dụng (#379). (https://github.com/netease-youdao/LobsterAI/issues/379)
  - Lịch theo giờ cho scheduled tasks — PR #376 đang chờ review. (https://github.com/netease-youdao/LobsterAI/pull/376)
  - Hỗ trợ custom URI trong markdown để mở app ngoài (obsidian://, vscode://…) — PR #380. (https://github.com/netease-youdao/LobsterAI/pull/380)
- Dự đoán lộ trình: những yêu cầu có nhiều tác động thực tế (docker, env vars, cải thiện IM timeout) rất có khả năng được đưa vào release tiếp theo trước các tính năng lớn như workflow agent (#240) nếu team ưu tiên ổn định và trải nghiệm.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Độ ổn định: treo khi đọc ảnh và khi chạy lệnh shell, cùng với lỗi process exit (Claude) làm giảm tính tin cậy cho workflow tự động và IM tích hợp.
  - Độ chính xác định dạng/đầu ra: bug tự động chèn khoảng trắng giữa chữ Hán và số (issue #344) gây hỏng nhãn/chuỗi, là vấn đề chức năng quan trọng.
  - Trải nghiệm cập nhật và cấu hình: người dùng bức xúc vì phải cấu hình lại sau mỗi cập nhật (#382), mong muốn triển khai Docker và quản lý biến môi trường để dễ vận hành.
- Mức độ hài lòng: có chuyển biến tích cực (nhiều PR sửa IM/attachment đã được merged), nhưng vẫn còn nhiều phàn nàn về các vấn đề cốt lõi (memory, xử lý ảnh, xử lí shell), dẫn tới mức độ không hài lòng trung bình- thấp đối với người dùng muốn thay thế OpenClaw.

8) Theo dõi tồn đọng (ưu tiên cần maintainer/triage)
- Issues cần ưu tiên phân tích/reproduce:
  - #344: 自动在字符串中加空格的问题 — [Link](https://github.com/netease-youdao/LobsterAI/issues/344) — Rất cần repro + test case + unit test.
  - #357: 读取图片卡死 — [Link](https://github.com/netease-youdao/LobsterAI/issues/357) — cần logs, phiên bản model, sample image.
  - #350: bash执行太慢了 — [Link](https://github.com/netease-youdao/LobsterAI/issues/350) — cần tracing timeout, blocking call detection.
  - #186: 记忆能力很差 — [Link](https://github.com/netease-youdao/LobsterAI/issues/186) — kiểm tra pipeline lưu/đọc memory và cần benchmark so sánh với OpenClaw.
  - #370: token overflow error — [Link](https://github.com/netease-youdao/LobsterAI/issues/370) — bổ sung frontend validation trước khi gọi API.
  - #377: 添加环境变量配置项 — [Link](https://github.com/netease-youdao/LobsterAI/issues/377) — yêu cầu thiết kế config UI/secure storage.
  - #386: 支持docker容器部署 — [Link](https://github.com/netease-youdao/LobsterAI/issues/386) — task triển khai/CI ảnh hưởng adoption.
- PRs cần review/triage:
  - #240 Feat/workflow enhancement — [Link](https://github.com/netease-youdao/LobsterAI/pull/240) — PR lớn, cần review chức năng và an toàn.
  - #376 hourly schedule — [Link](https://github.com/netease-youdao/LobsterAI/pull/376) — nhỏ nhưng hữu dụng cho scheduled tasks.
  - #380 custom URI protocols — [Link](https://github.com/netease-youdao/LobsterAI/pull/380) — cần review về security (XSS/unsafe protocols).
  - #374 async message handler — [Link](https://github.com/netease-youdao/LobsterAI/pull/374) — đang mở, liên quan đến IM timeout; cần xác nhận các trường hợp đã xử lý.

Kết luận ngắn: hoạt động cộng đồng đang nhộn nhịp, release v0.2.3 đã giải quyết một số painpoint IM và UX attachment, nhưng còn vài lỗi nền tảng (formatting giữa chữ Hán và số, đọc ảnh bị treo, thực thi shell chậm, memory) đang ảnh hưởng nghiêm trọng tới người dùng. Đề xuất ngay: 1) ưu tiên repro và test cho #344 và #357; 2) hoàn thiện/merge PR liên quan async message handler và xác nhận không regress; 3) lên roadmap ngắn hạn cho Docker + biến môi trường để cải thiện trải nghiệm vận hành.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

TinyClaw — Bản tin dự án (2026-03-12)

1) Tổng quan hôm nay
- Dự án đang có hoạt động cao: 12 issue và 7 PR được cập nhật trong 24 giờ qua, với đợt đóng + merge lớn (6 PR đóng/merge). Hoạt động tập trung vào tách monolith, cải tiến UX TinyOffice, xử lý comms theo thời gian thực và mở rộng nhà cung cấp mô hình.  
- Cộng đồng đang nhấn mạnh hai nhóm nhu cầu: hỗ trợ mô hình cục bộ/compatible endpoints và trải nghiệm TinyOffice (onboarding, runtime control, lịch sử chat).  
- Sức khỏe dự án: tích cực (nhiều PR/issue được giải quyết), nhưng có một số thay đổi mang tính hạ tầng / breaking-potential (monorepo, thay tên/đổi biến môi trường) cần sự kiểm tra khi upgrade.

2) Phát hành phiên bản
- Mới: v0.0.10 (Release v0.0.10)
  - Nội dung chính: loại bỏ logs pane khỏi tmux (daemon.sh); đơn giản hóa phát hiện TINYCLAW_HOME trong heartbeat-cron.sh; tăng timeout watchdog Telegram từ 2m → 5m; nội địa hóa (localize) Task/TaskStatus types (ghi chú commit bị cắt bớt: "Move Task/TaskStatus types from..." — cần kiểm tra thay đổi đường dẫn/exports).
  - Lưu ý di chuyển / breaking: thay đổi về vị trí/đường dẫn types (Task/TaskStatus) có thể khiến code hoặc tích hợp bên ngoài cần chỉnh import path; xóa logs pane ảnh hưởng workflow người dùng phụ thuộc vào tmux logs; thay đổi TINYCLAW_HOME/daemon defaults có thể ảnh hưởng scripts khởi động. Kiểm tra tài liệu nâng cấp trước khi cập nhật.
  - Link release/PR liên quan: (xem changelog trong repository).

3) Tiến độ dự án (PR đã merge/đóng hôm nay)
- PRs chính đã đóng/merge:
  - #186 refactor: split monolith into npm workspaces monorepo with SQLite queue — tách codebase thành workspaces và thay BullMQ/Redis bằng SQLite queue (closed) (https://github.com/TinyAGI/tinyclaw/pull/186)
  - #185 refactor(cli): migrate interactive prompts to @clack/prompts — thay bash prompts bằng TypeScript prompts (closed) (https://github.com/TinyAGI/tinyclaw/pull/185)
  - #182 Auto-trigger agent when task moves to in progress — tự động kích hoạt agent khi task kéo vào "In Progress" (closed) (https://github.com/TinyAGI/tinyclaw/pull/182)
  - #183 Remove message_received event and simplify office UI — đơn giản hoá Office UI, remove event thừa (closed) (https://github.com/TinyAGI/tinyclaw/pull/183)
  - #143 feat: add Avian AI provider — thêm Avian làm provider (closed) (https://github.com/TinyAGI/tinyclaw/pull/143)
  - #190 fix: team comms and stream responses in real-time — cải thiện giao tiếp team và stream response (closed) (https://github.com/TinyAGI/tinyclaw/pull/190)
- Tác động nổi bật: chuẩn hoá CLI, cải tiến UX (auto-trigger tasks, đơn giản UI), mở rộng providers, và thay đổi hạ tầng queue — đẩy mạnh khả năng vận hành nhẹ, cài đặt đơn giản và trải nghiệm người dùng tương tác tốt hơn.

4) Chủ đề nóng trong cộng đồng
- Mission control / traceability: Issue #66 (6 bình luận) — yêu cầu UI mission control kiểu Mission ControlHQ / Claude-trace (https://github.com/TinyAGI/tinyclaw/issues/66). Nhu cầu: observability cho agent interactions, tool usage, graph trace.
- Rebrand lớn (open PR): #191 feat: rebrand tinyclaw to tinyagi — PR mở đề xuất đổi tên toàn bộ project / env / package (https://github.com/TinyAGI/tinyclaw/pull/191). Tác động: rất lớn (breaking, cần coordination, docs, migration plan).
- TinyOffice control & UX: Issues #192, #193, #194 (mới/ mở) — gồm UX suggestions, first-run onboarding, và runtime control panel (https://github.com/TinyAGI/tinyclaw/issues/192, https://github.com/TinyAGI/tinyclaw/issues/193, https://github.com/TinyAGI/tinyclaw/issues/194). Nhu cầu cơ bản: giảm friction khi lần đầu cài đặt và điều khiển daemon/queue/heartbeat từ UI.
- Local model/support & provider requests: Issue #111 (ollama/local models, 3 bình luận) và #41 (add more providers) — người dùng muốn chạy mô hình cục bộ hoặc thêm OpenAI-compatible endpoints (https://github.com/TinyAGI/tinyclaw/issues/111, https://github.com/TinyAGI/tinyclaw/issues/41).

5) Lỗi & Ổn định (xếp hạng theo mức độ)
- Trung bình → Cao:
  - #91 Agent does not acknowledge messages — user báo agent “implied typing” rồi không gửi update, phải query lại (closed) (https://github.com/TinyAGI/tinyclaw/issues/91). Ảnh hưởng UX kênh chat (WhatsApp). Đã có ticket đóng — cần theo dõi nếu tái xuất.
- Trung bình:
  - #63 Clear interval on shutdown in queue-processor.ts — có khả năng interval tiếp tục chạy sau shutdown gây cleanup không hoàn chỉnh (closed) (https://github.com/TinyAGI/tinyclaw/issues/63). Đã được thảo luận/đóng; nếu chưa có PR sửa cần hồi phục.
- Ghi chú: nhiều PR gần đây đã giải quyết các vấn đề comms/streaming (#190) và UI (#183), đồng thời refactor queue có thể thay đổi hành vi runtime — cần test hồi quy sau upgrade.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Hottest requests:
  - Mission-control / traceability (Issue #66) → có nhu cầu lớn về observability/graph trace cho agents.
  - Local models / ollama / OpenAI-compatible endpoints (Issue #111, #41) → cộng đồng muốn route agents tới mô hình cục bộ hoặc endpoints thay thế.
  - TinyOffice: first-run onboarding, runtime control panel, UX improvements (Issues #192/#193/#194) → biến TinyOffice thành entrypoint cho người mới.
- Dự đoán tính năng sắp tới: hỗ trợ providers mở rộng (Avian đã được thêm), tiếp tục bổ sung local model adapters, cải thiện onboarding TinyOffice, và có thể rebrand nếu PR #191 được merge — tất cả hướng đến trải nghiệm dễ cài đặt và multi-provider orchestration.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Onboarding nặng CLI và chỉnh config thủ công — nhiều đề xuất cho first-run web onboarding (https://github.com/TinyAGI/tinyclaw/issues/193).
  - Quan sát hoạt động agent (traceability/mission control) thiếu — người dùng muốn graph trace và lịch sử tương tác (https://github.com/TinyAGI/tinyclaw/issues/66).
  - Hỗ trợ mô hình cục bộ/endpoint đa dạng để giảm phụ thuộc dịch vụ đám mây (https://github.com/TinyAGI/tinyclaw/issues/111, https://github.com/TinyAGI/tinyclaw/issues/41).
- Mức độ hài lòng: tích cực với tiến bộ (providers, UX fixes, streaming), nhưng vẫn còn thất vọng ở trải nghiệm first-run và observability.

8) Theo dõi tồn đọng (cần chú ý của maintainers)
- PR #191 Rebrand to TinyAGI — thay đổi phạm vi lớn, cần roadmap migration, CI checks, docs, và thông báo breaking changes (https://github.com/TinyAGI/tinyclaw/pull/191).
- Issues TinyOffice: #192 (UX suggestions), #193 (first-run onboarding), #194 (runtime control panel) — cần định hướng/triage để ưu tiên phát triển UI (https://github.com/TinyAGI/tinyclaw/issues/192, https://github.com/TinyAGI/tinyclaw/issues/193, https://github.com/TinyAGI/tinyclaw/issues/194).
- Phát hành v0.0.10: làm rõ thay đổi "Move Task/TaskStatus types from..." (release notes bị cắt) — maintainer nên bổ sung hướng dẫn migration và cập nhật changelog/doc (xem release v0.0.10 trong repo).
- Kiểm thử hồi quy sau refactor queue (#186) — thay đổi từ Redis → SQLite có thể ảnh hưởng scale và behavior; cần matrix test migration, backup/restore và docs (https://github.com/TinyAGI/tinyclaw/pull/186).

Kết luận ngắn: hoạt động phát triển đang mạnh (nhiều PR/merge), trọng tâm chuyển dần sang trải nghiệm người dùng (TinyOffice), khả năng deploy nhẹ hơn (SQLite queue), và mở rộng providers. Tuy nhiên các thay đổi hạ tầng và đề xuất rebrand là các điểm rủi ro/gián đoạn cần chú ý — khuyến nghị: bổ sung hướng dẫn migration, kiểm thử hồi quy, và ưu tiên onboarding/observability để giảm rào cản người dùng mới.

(Tất cả link đề cập trỏ tới repository TinyClaw trên GitHub: https://github.com/TinyAGI/tinyclaw)

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

Bản tin dự án Moltis — 2026-03-12
Repo: https://github.com/moltis-org/moltis

1) Tổng quan hôm nay
- Trong 24 giờ qua có nhiều hoạt động: 33 issue được cập nhật (9 còn mở/hoạt động, 24 đã đóng) và 26 PR được cập nhật (19 mở, 7 đã merge/đóng). Không có phát hành bản mới.
- Hoạt động tập trung mạnh vào ổn định nền tảng (cron, sandbox, Docker/IaaS), trải nghiệm cài đặt/onboarding và cải tiến provider/LLM nội bộ (local-llm / GGUF / MLX).
- Nhiều PR nhỏ/medium hướng tới sửa lỗi hồi quy và thêm kiểm thử (Playwright/Rust), cho thấy ưu tiên hiện tại là độ ổn định và hồi phục sau các báo cáo cài đặt thực tế.
- Mức độ hoạt động: cao trên xử lý lỗi và PR cải thiện trải nghiệm; cần review nhanh một số PR chức năng lớn đang chờ duyệt.

2) Phát hành phiên bản
- Không có phiên bản mới trong đợt này.

3) Tiến độ dự án (PR đã merge/đóng hôm nay & tính năng/ sửa lỗi được đẩy mạnh)
- PR đã đóng/merge đáng chú ý (theo dữ liệu cung cấp):
  - #397 (CLOSED) fix(providers): strip stop tokens from MLX streaming output — loại bỏ token đặc biệt từ luồng MLX, sửa lỗi rò token vào output người dùng. Link: https://github.com/moltis-org/moltis/pull/397
  - #399 (CLOSED) fix(chat): compact the active channel session — sửa auto-compact để compact đúng session kênh (fix cho Discord-style sessions). Link: https://github.com/moltis-org/moltis/pull/399
- PR đang mở (đang đẩy nhanh các điểm sau):
  - Onboarding / UX: #406 improve onboarding password autofill hints (thêm metadata để password manager hoạt động tốt hơn). https://github.com/moltis-org/moltis/pull/406
  - Secrets / remote MCP: #416 support secret remote MCP URLs and headers (hỗ trợ header/param bí mật cho remote MCP, sanitize UI). https://github.com/moltis-org/moltis/pull/416
  - local-llm / GGUF: #417 restore custom GGUF setup without restart (download/register async, restore at startup). https://github.com/moltis-org/moltis/pull/417
  - Trình duyệt / sandbox: #412 scope cached browser sessions per chat (cách ly state trình duyệt theo session). https://github.com/moltis-org/moltis/pull/412
  - Lưu lịch sử khi abort: #418 persist aborted partial history (lưu partial output khi chat bị abort). https://github.com/moltis-org/moltis/pull/418
  - Opt-in Vulkan GGUF: #408 (thêm feature non-default cho Vulkan). https://github.com/moltis-org/moltis/pull/408
  - Cron tests & docs: #411 add delivery regressions and sync docs (tăng coverage cho cron). https://github.com/moltis-org/moltis/pull/411

4) Chủ đề nóng trong cộng đồng (issues/PRs hoạt động nhất)
- #181 [CLOSED] [Bug]: Crons and heartbeat can't be setup and activate! — báo lỗi cron/heartbeat không thể thiết lập; nhiều thảo luận (8 bình luận). Ảnh hưởng đến automation/cron agents. https://github.com/moltis-org/moltis/issues/181
- #102 [CLOSED] Docker-in-Docker sandbox mounts container-internal path instead of host path — vấn đề mount Docker-in-Docker dẫn đến workspace rỗng; có thumbs-up cao (4). Ảnh hưởng tới người chạy Moltis trong Docker với sandbox tạo container. https://github.com/moltis-org/moltis/issues/102
- #129 [CLOSED] Unable to login with password after Docker setup — lỗi đăng nhập password sau cài Docker, bot Telegram vẫn hoạt động; 4 bình luận. https://github.com/moltis-org/moltis/issues/129
- #391 [OPEN] RFC: Node-Advertised Tools (Extending the Node Protocol) — RFC quan trọng về mở rộng giao thức node để quảng bá tools trên node từ xa; cần review cộng đồng/maintainers. https://github.com/moltis-org/moltis/issues/391
- #414 [OPEN] [bug] z.ai does not work out of the box and manual gives network errors. — user-facing provider/integration failure, đang chờ điều tra. https://github.com/moltis-org/moltis/issues/414
- #272 [OPEN] [enhancement] Need Webhook Function — yêu cầu webhook (2 bình luận, 2 👍) — tín hiệu rõ ràng cho tích hợp event-driven. https://github.com/moltis-org/moltis/issues/272

Phân tích nhu cầu cơ bản: nhiều người dùng gặp vấn đề cài đặt/triaging trong Docker môi trường khác nhau; yêu cầu mở rộng tích hợp (webhook, node tools) và ổn định provider (z.ai, Copilot, local-llm) là trọng tâm.

5) Lỗi & Ổn định — xếp theo mức độ ảnh hưởng
- Cao (blocker / ảnh hưởng chức năng):
  - Cron / heartbeat không thiết lập (ISSUE #181) — ảnh hưởng automation scheduling; đã có thảo luận và issue đóng — kiểm tra PR liên quan (#411) để bảo đảm regression test tồn tại. https://github.com/moltis-org/moltis/issues/181
  - Docker-in-Docker workspace mount (ISSUE #102) — sandbox workspace rỗng trong DinD; đã được thảo luận và issue đóng; cần test lại trong CI/container matrix. https://github.com/moltis-org/moltis/issues/102
  - Network-filter proxy failing (ISSUE #407, OPEN) — gây hỏng web_search; tác động đến tool web access. https://github.com/moltis-org/moltis/issues/407
- Trung bình (gây khó chịu, UX, dẫn tới support requests):
  - z.ai provider failing out-of-box (ISSUE #414, OPEN) — provider integration cần attention. https://github.com/moltis-org/moltis/issues/414
  - Vault UX “sealed” poor messaging (ISSUE #344, OPEN) — UX gây nhầm lẫn. https://github.com/moltis-org/moltis/issues/344
  - Login password after Docker (ISSUE #129, CLOSED) — đã có fix/workaround nhưng phản ánh vấn đề onboarding Docker. https://github.com/moltis-org/moltis/issues/129
- Thấp (cosmetic / minor):
  - local-llm special tokens leak (#306, CLOSED) — đã được xử lý qua PR #397. https://github.com/moltis-org/moltis/issues/306
  - LLM not seeing tool outputs (#319, CLOSED) — đã có fix/triage. https://github.com/moltis-org/moltis/issues/319

Ghi chú PR sửa lỗi liên quan:
- #397: loại bỏ stop tokens MLX streaming — fix cho token leak. https://github.com/moltis-org/moltis/pull/397
- #399: compact đúng session cho auto-compact — fix cho auto-compact Discord. https://github.com/moltis-org/moltis/pull/399
- #411: thêm test cho cron delivery (một PR đang mở để tăng độ tin cậy). https://github.com/moltis-org/moltis/pull/411

6) Yêu cầu tính năng & tín hiệu lộ trình
- Webhook support (ISSUE #272) — nhiều người dùng cần webhook để integrate với hệ thống bên ngoài. https://github.com/moltis-org/moltis/issues/272
- Node-Advertised Tools RFC (ISSUE #391) — mở rộng giao thức node để cho phép node quảng bá tools; có thể là bước lớn cho chạy tác vụ phân tán. https://github.com/moltis-org/moltis/issues/391
- Provider compatibility & secret-aware remote MCP (PR #416) — yêu cầu rõ ràng về cấu hình bí mật cho remote MCP, giảm rò rỉ URL/OAuth. https://github.com/moltis-org/moltis/pull/416
- Local LLM improvements: restore custom GGUF without restart (#417), opt-in Vulkan GGUF (#408) — xu hướng hướng tới cải thiện trải nghiệm LLM cục bộ. https://github.com/moltis-org/moltis/pull/417 https://github.com/moltis-org/moltis/pull/408
- Truyền thông/kết nối: Discord/Whatsapp requests đã từng xuất hiện (đã có issue/đóng) — tiếp tục là điểm tích hợp người dùng quan tâm.

Dự đoán: các mục ưu tiên trong bản phát hành tiếp theo sẽ tập trung vào ổn định cron/sandbox, provider integrations (z.ai, Copilot), local-llm usability (GGUF/Vulkan), và webhook/remote node tooling.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Cài đặt trong Docker / DinD phức tạp (mounts, login, node pairing) — nhiều báo cáo từ người dùng triển khai containerized. (#102, #129, #366). https://github.com/moltis-org/moltis/issues/102 https://github.com/moltis-org/moltis/issues/129 https://github.com/moltis-org/moltis/issues/366
  - Tools/provider integration thất bại gây trải nghiệm “không hoạt động out-of-box” (z.ai, web_search proxy). (#414, #407). https://github.com/moltis-org/moltis/issues/414 https://github.com/moltis-org/moltis/issues/407
  - UX onboarding/password/vault messaging gây nhầm lẫn — có PR/ít test được thêm để cải thiện. (#406, #415, #344). https://github.com/moltis-org/moltis/pull/406 https://github.com/moltis-org/moltis/pull/415 https://github.com/moltis-org/moltis/issues/344
- Mức độ hài lòng: người dùng đánh dấu cao các bản sửa lỗi nhanh (ví dụ issues đóng), nhưng vẫn còn không hài khi cài trong môi trường Docker hoặc khi provider bên thứ ba không hoạt động.

8) Theo dõi tồn đọng (cần chú ý của maintainers)
- RFC và thiết kế:
  - #391 RFC: Node-Advertised Tools — cần review và phản hồi của maintainer để quyết định lộ trình. https://github.com/moltis-org/moltis/issues/391
- Bugs/Integrations cần ưu tiên:
  - #414 z.ai not working — điều tra provider integration & network errors. https://github.com/moltis-org/moltis/issues/414
  - #407 Network-filter Proxy failing — ảnh hưởng web_search, cần triage nhanh. https://github.com/moltis-org/moltis/issues/407
  - #272 Webhook feature request — nếu roadmap muốn mở rộng tích hợp, đây là ticket nên có owner. https://github.com/moltis-org/moltis/issues/272
  - #261 GitHub Copilot provider errors — provider-specific failures đang làm giảm trải nghiệm. https://github.com/moltis-org/moltis/issues/261
- PRs chờ review / cần quyết định sớm:
  - #416 support secret remote MCP URLs and headers — bảo mật & UI change; ưu tiên review. https://github.com/moltis-org/moltis/pull/416
  - #417 restore custom GGUF setup without restart — cải thiện UX local-llm, cần merge để giảm restart pain. https://github.com/moltis-org/moltis/pull/417
  - #418 persist aborted partial history — quan trọng cho UX khi abort/interrupt. https://github.com/moltis-org/moltis/pull/418
  - #413 enable_agent_sidecar_files — cần thảo luận về bảo mật/ audit trước merge. https://github.com/moltis-org/moltis/pull/413
  - #408 Vulkan GGUF opt-in — nên đánh giá chi phí build/test trước khi merge. https://github.com/moltis-org/moltis/pull/408

Kết luận & đề xuất hành động ngắn hạn
- Ưu tiên review/merge các PR ổn định UX/ bảo mật (PR #416, #417, #418, #406) để giảm lượt issue lặp lại trên cài đặt và local-llm.
- Triaging RFC #391 và issue webhook (#272) để quyết định hướng mở rộng node/protocol và tích hợp event-driven.
- Tăng coverage CI/integ tests cho DinD/sandbox/cron flows (PR #411 là bước đúng hướng).
- Giữ liên lạc với reporters liên quan đến provider failures (z.ai, Copilot, web_search) để có repro steps và logs.

Nếu cần, tôi có thể chuẩn hóa một checklist reviewer cho các PR ưu tiên (bảo mật, regression tests, doc updates) hoặc tạo tóm tắt tác động cho mỗi PR lớn để giúp maintainer quyết định nhanh.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

ZeptoClaw — Bản tin dự án (2026-03-12)

1) Tổng quan hôm nay
- Hoạt động phát triển rất cao: 24h qua có 13 PR được đóng/merge và 14 issue được cập nhật (13 đóng, 1 còn mở).  
- Tâm điểm là chuỗi sửa lỗi/bảo mật liên quan đến ranh giới filesystem và xác thực webhook, cùng một số nâng cấp trải nghiệm CLI và hỗ trợ nhà cung cấp mô hình.  
- Sức khỏe dự án ở mức tốt: nhiều thay đổi hardening và bản vá kịp thời; phần lớn vấn đề nghiêm trọng được xử lý trong cùng ngày.

2) Phát hành phiên bản
- v0.7.6 (mới)
  - Những điểm chính: sửa cảnh báo token đăng ký Claude bị lặp, bổ sung gợi ý slash command trong chế độ tương tác CLI, tăng cường ràng buộc xác thực inbound và biên giới filesystem.  
  - PR liên quan: fix deduplicate Claude token (#320) https://github.com/qhkm/zeptoclaw/pull/320, slash suggestions (#323) https://github.com/qhkm/zeptoclaw/pull/323, hardening inbound/auth (#324) https://github.com/qhkm/zeptoclaw/pull/324.  
  - Lưu ý di chuyển: không thấy thay đổi phá vỡ rõ rệt; tuy nhiên nếu bạn dùng Telegram username-based allowlist hoặc tùy chỉnh workspace/mount, hãy kiểm tra cấu hình vì có các thay đổi về chính sách ràng buộc (xem phần tiến độ/ổn định).
- v0.7.5
  - Những điểm chính: thêm lệnh config reset và uninstall cho CLI; thêm kiểm tra tương thích model-provider.  
  - PRs/Công việc liên quan: lệnh uninstall và model-provider validation được đưa vào trước đó (tham chiếu issue/PR trong changelog).

3) Tiến độ dự án (PRs đã merge/đóng hôm nay)
- PRs quan trọng đã đóng/merge:
  - #324 fix: harden inbound auth and filesystem boundaries — ràng buộc mạnh cho webhook inbound, WhatsApp Cloud và hardening viết file/mount https://github.com/qhkm/zeptoclaw/pull/324
  - #323 feat: slash command suggestions in CLI interactive mode — autocomplete lệnh `/` trong `zeptoclaw agent` https://github.com/qhkm/zeptoclaw/pull/323
  - #320 fix: deduplicate Claude subscription token warning — tránh in cảnh báo lặp nhiều lần https://github.com/qhkm/zeptoclaw/pull/320
  - #316 feat: Ollama cloud model support (keyless auth) — cho phép Ollama/vLLM không cần API key cho local instances https://github.com/qhkm/zeptoclaw/pull/316
  - Nhiều PR cập nhật phụ thuộc của dependabot (ví dụ #302, #303, #296, #297, #299, #300, #301, #304, #298) giúp giữ thư viện và CI hiện đại.
- Tác động: đẩy mạnh hai trục chính — bảo mật/ổn định I/O & inbound auth, và cải thiện UX CLI + mở rộng hỗ trợ provider.

4) Chủ đề nóng trong cộng đồng
- Hardening webhook & filesystem (PR #324 / Issues #319,#318,#329,#330): chuỗi issue/PR liên quan tới TOCTOU, symlink, và xác thực webhook. PR #324 đóng gói nhiều sửa chữa và là tâm điểm. Link PR: https://github.com/qhkm/zeptoclaw/pull/324, ví dụ issue theo dõi: https://github.com/qhkm/zeptoclaw/issues/319
- Telegram username allowlist deprecation (Issue #321): rủi ro do username có thể được gán lại — thay đổi được staged để ưu tiên numeric ID, cần cảnh báo người dùng. https://github.com/qhkm/zeptoclaw/issues/321
- Slash command trong CLI (PR #323 / Issue #322): cải thiện trải nghiệm tương tác, đặc biệt hữu dụng cho người dùng CLI nặng. https://github.com/qhkm/zeptoclaw/pull/323 / https://github.com/qhkm/zeptoclaw/issues/322
- Merkle audit trail (Issue #221 — còn mở): đề xuất tính năng audit tamper-evident cho tool execution; là tín hiệu về nhu cầu tăng cường chứng thực và kiểm toán. https://github.com/qhkm/zeptoclaw/issues/221

5) Lỗi & Ổn định (xếp hạng theo mức độ)
- P1 – Critical (đã xử lý)
  - Filesystem & workspace write hardening (Issues #319, #330, #329) — đã được xử lý qua PR #324; giải pháp bao gồm openat/dirfd-relative I/O và giảm TOCTOU. Links: https://github.com/qhkm/zeptoclaw/issues/319, https://github.com/qhkm/zeptoclaw/issues/330, https://github.com/qhkm/zeptoclaw/issues/329
  - Inbound webhook authentication (Issue #318) — đã theo dõi và chỉnh sửa trong PR #324; bao gồm WhatsApp Cloud improvements. https://github.com/qhkm/zeptoclaw/issues/318
- P1/P2 – High (đã xử lý)
  - WhatsApp Cloud webhook signature verification (Issue #317) — đã yêu cầu X-Hub-Signature-256 và được đóng sau sửa/kiểm tra. https://github.com/qhkm/zeptoclaw/issues/317
  - Telegram username allowlist deprecation (Issue #321) — staged; cần thông báo và gating config để tránh ngắt dịch vụ. https://github.com/qhkm/zeptoclaw/issues/321
- Ghi chú: hầu hết vấn đề nghiêm trọng đã có PR/ sửa được merge trong cùng ngày, giảm rủi ro vận hành.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Đang được thúc đẩy / đã vào mã:
  - CLI UX: slash command autocomplete, uninstall, config reset — cải thiện onboarding và quản lý local state (#323, #307). https://github.com/qhkm/zeptoclaw/pull/323 / https://github.com/qhkm/zeptoclaw/issues/307
  - Nhà cung cấp mô hình: Ollama/vLLM keyless support và model-provider compatibility checks (#316 và liên quan) — mở rộng khả năng dùng các backend local hoặc cloud. https://github.com/qhkm/zeptoclaw/pull/316
- Tín hiệu từ cộng đồng:
  - Audit trail tamper-evident (Issue #221) có khả năng được đưa vào roadmap tiếp theo nếu nhu cầu kiểm toán/ghi nhật ký tăng. https://github.com/qhkm/zeptoclaw/issues/221

7) Tóm tắt phản hồi người dùng
- Những điểm đau chính:
  - Lo ngại bảo mật vận hành: rò rỉ qua symlink/TOCTOU, webhook không xác thực — dẫn tới loạt sửa hardening hôm nay. (see #319, #324) https://github.com/qhkm/zeptoclaw/issues/319 https://github.com/qhkm/zeptoclaw/pull/324
  - Trải nghiệm CLI: mong muốn autocomplete, lệnh uninstall/reset để dễ quản lý state local — đã được giải quyết phần lớn. https://github.com/qhkm/zeptoclaw/pull/323
  - Tính tương thích provider: nhu cầu dùng Ollama/vLLM local mà không cần API key — đã hỗ trợ. https://github.com/qhkm/zeptoclaw/pull/316
- Mức độ hài lòng: hành động nhanh của maintainers (nhiều PR/issue đóng cùng ngày) là tín hiệu tích cực; người dùng chuyên về bảo mật/triaging sẽ đánh giá cao các thay đổi hardening.

8) Theo dõi tồn đọng (cần chú ý)
- Issue mở quan trọng:
  - #221 feat: Merkle hash-chain audit trail for tool execution — là yêu cầu tính năng có tác động về an toàn/kiểm toán, cần đánh giá phạm vi và ưu tiên. https://github.com/qhkm/zeptoclaw/issues/221
- Các điểm cần follow-up mặc dù đã close:
  - Giao tiếp với người dùng về Telegram username deprecation để tránh bất ngờ khi chuyển sang numeric-ID-first (Issue #321). https://github.com/qhkm/zeptoclaw/issues/321
  - Kiểm thử chéo cho filesystem hardening trên các nền tảng (Unix vs non-Unix) để đảm bảo thay đổi openat/dirfd không phá vỡ trường hợp biên. Tham khảo PR #324 / Issues #329/#330. https://github.com/qhkm/zeptoclaw/pull/324 https://github.com/qhkm/zeptoclaw/issues/329 https://github.com/qhkm/zeptoclaw/issues/330

Kết luận ngắn: chu kỳ hôm qua là một đợt bảo trì/ổn định lớn — nhiều vấn đề bảo mật và trải nghiệm CLI đã được xử lý nhanh chóng, đồng thời mở rộng hỗ trợ cho nhà cung cấp mô hình. Giai đoạn tiếp theo khuyến nghị: ưu tiên đánh giá kỹ lưỡng các thay đổi filesystem trên mọi nền tảng, thông báo rõ ràng tới người dùng về deprecation của Telegram username allowlist, và xác định ưu tiên cho yêu cầu audit trail (#221).

Các liên kết tham khảo chính:
- PR #324: https://github.com/qhkm/zeptoclaw/pull/324
- PR #323: https://github.com/qhkm/zeptoclaw/pull/323
- PR #320: https://github.com/qhkm/zeptoclaw/pull/320
- PR #316: https://github.com/qhkm/zeptoclaw/pull/316
- Issue #221: https://github.com/qhkm/zeptoclaw/issues/221
- Issue #321: https://github.com/qhkm/zeptoclaw/issues/321
- Issue #319: https://github.com/qhkm/zeptoclaw/issues/319

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

Dự án: EasyClaw — Bản tin ngày 2026-03-12

1) Tổng quan hôm nay
- Hoạt động hiện tại ở mức nhẹ nhưng có chỉ dấu quan tâm từ người dùng: trong 24 giờ vừa qua có 1 issue mở hoạt động và 1 PR đang mở/được cập nhật.  
- Không có PR nào được merge hoặc issue nào đóng trong khoảng thời gian này.  
- Cộng đồng đang tập trung vào hai vấn đề chính: vấn đề OAuth của OpenAI (user-facing, ảnh hưởng trải nghiệm) và cải thiện hiển thị/icon trên macOS.

2) Phát hành phiên bản
- Phiên bản mới: v1.6.6 — EasyClaw v1.6.6  
  - Link: https://github.com/gaoyangz77/easyclaw/releases/tag/v1.6.6  
  - Nội dung công bố hiện tại chủ yếu liên quan tới hướng dẫn cài đặt macOS (lưu ý Gatekeeper: thông báo "'EasyClaw' is damaged and can't be opened" là do macOS chặn ứng dụng chưa ký; hướng dẫn khắc phục bắt đầu bằng "Open Terminal (pres..." nhưng phần chỉ dẫn bị cắt trong dữ liệu hiện có).  
  - Không có changelog chi tiết công khai trong dữ liệu được cung cấp, vì vậy không thể xác nhận thay đổi chức năng hay breaking changes. Khuyến nghị: kiểm tra trang release đầy đủ để xem thay đổi và các lưu ý di chuyển.

3) Tiến độ dự án
- PR/issue trong 24h: không có PR nào được merge/đóng hôm nay.  
- PR đang hoạt động: #15 "fix: app icon in macos dock and system tray" (mục tiêu cải thiện trải nghiệm macOS liên quan icon). Link: https://github.com/gaoyangz77/easyclaw/pull/15  
- Tạm thời không có tính năng mới được xác nhận là đã được đẩy vào bản phát hành trong dữ liệu này.

4) Chủ đề nóng trong cộng đồng
- Issue #16 — "OpenAI Oauth好像有问题" (mở): tác giả @westisc, tạo 2026-03-11, cập nhật 2026-03-11, 1 bình luận. Link: https://github.com/gaoyangz77/easyclaw/issues/16  
  - Tóm tắt: cả phiên bản portable và cài đặt đều báo cùng một lỗi khi thực hiện OAuth với OpenAI; kèm ảnh chụp màn hình lỗi.  
  - Nhu cầu cơ bản: sửa hoặc hướng dẫn khắc phục lỗi xác thực OAuth để người dùng có thể kết nối với OpenAI; có thể liên quan tới cấu hình redirect URI, client id/secret, hoặc xử lý callback trong các gói đóng gói.  
- PR #15 (macOS icon) cũng được cập nhật gần đây và thu hút chú ý bởi ảnh hưởng tới trải nghiệm desktop macOS.

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao: Issue #16 — OpenAI OAuth không hoạt động (ảnh hưởng trực tiếp đến chức năng chính nếu ứng dụng phụ thuộc vào API OpenAI). Chưa có PR sửa. Cần logs/chi tiết reproduce và phân tích luồng OAuth để xác định nguyên nhân (CORS, redirect, môi trường đóng gói, config). Link: https://github.com/gaoyangz77/easyclaw/issues/16
- Trung bình: macOS Gatekeeper (từ hướng dẫn v1.6.6) — gây cản trở cài đặt nhưng có hướng dẫn tạm thời; cần cân nhắc ký code/đóng gói chính thức để giảm ma sát người dùng. Release notes đề cập nhưng chỉ dẫn bị cắt trong dữ liệu; xem release page để có chỉ dẫn đầy đủ. Link release: https://github.com/gaoyangz77/easyclaw/releases/tag/v1.6.6
- Thấp: Icon trong dock/system tray (PR #15) — không gây lỗi chức năng nhưng ảnh hưởng nhận diện/UX trên macOS. Link: https://github.com/gaoyangz77/easyclaw/pull/15

6) Yêu cầu tính năng & tín hiệu lộ trình
- Tín hiệu rõ ràng: cải thiện hỗ trợ macOS (ký app, trải nghiệm dock/tray, hướng dẫn Gatekeeper) và ổn định hóa quá trình OAuth với OpenAI.  
- Dự đoán cho bản tiếp theo: sửa lỗi OAuth (fix authentication flow), hoàn thiện đóng gói macOS (ký code hoặc hướng dẫn toàn diện), và cập nhật icon/UX trên desktop. Những mục này có khả năng xuất hiện trong release tiếp theo nếu duy trì thứ tự ưu tiên theo vấn đề người dùng báo cáo.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: không thể hoàn tất xác thực OpenAI (issue #16) — giảm khả năng sử dụng tính năng AI.  
- Friction cài đặt macOS do Gatekeeper (thông báo "is damaged" cho app chưa ký) khiến trải nghiệm onboarding kém mượt mà.  
- Cảm nhận: người dùng đang gặp vấn đề nghiêm trọng về tính năng cốt lõi (auth) và khó chịu với ma sát nền tảng (macOS). Mức độ hài lòng tạm thời thấp cho các trường hợp sử dụng liên quan đến OpenAI và người dùng macOS.

8) Theo dõi tồn đọng (cần hành động của maintainer)
- Issue #16 (OpenAI OAuth) — cần phản hồi, yêu cầu logs/chi tiết môi trường, hướng dẫn reproduce và (nếu có) ưu tiên xử lý. Link: https://github.com/gaoyangz77/easyclaw/issues/16
- PR #15 (fix icon macOS) — cần review/merge nếu ổn; kiểm tra tương thích với các bản đóng gói macOS và cách đóng gói ảnh hưởng tới Gatekeeper. Link: https://github.com/gaoyangz77/easyclaw/pull/15
- Release v1.6.6 — hoàn thiện nội dung release notes (nếu còn thiếu) và cập nhật hướng dẫn macOS đầy đủ; cân nhắc thông báo/FAQ cho Gatekeeper hoặc hướng dẫn ký code nếu có thể. Link release: https://github.com/gaoyangz77/easyclaw/releases/tag/v1.6.6

Kết luận ngắn: Hoạt động cộng đồng đang tập trung vào hai vấn đề thực tế—OAuth với OpenAI (hiện là blocker chức năng quan trọng) và trải nghiệm macOS (Gatekeeper + icon). Ưu tiên khuyến nghị: rà soát và phản hồi issue OAuth trước, đồng thời hoàn thiện hướng dẫn/cách đóng gói macOS để giảm ma sát người dùng.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*