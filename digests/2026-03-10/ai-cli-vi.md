# Bản tin Cộng đồng Công cụ AI CLI 2026-03-10

> Thời gian tạo: 2026-03-10 01:53 UTC | Công cụ: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## So sánh chéo

1) Tổng quan hệ sinh thái
- Hệ sinh thái AI‑CLI hiện tập trung vào hai mạch chính: (a) ổn định/hiệu năng (memory leaks, TUI/terminal jitter, long‑running sessions) và (b) mở rộng nền tảng (plugin/hooks/extension SDK, MCP/agent orchestration, multi‑account/workspace).  
- Vấn đề bảo mật/quyền truy cập (deny_read/.ignore, policy warnings, sandboxing Windows) và các trải nghiệm trên Windows/WSL/tmux xuất hiện đồng thời ở hầu hết các dự án.  
- Nhìn chung các repo đều active: nhiều release nhỏ, PR/issue liên tục — điều chỉnh nhanh về UX và hardening là ưu tiên cộng đồng.

2) So sánh mức độ hoạt động
(Trong báo cáo nguồn: số issue/PRs/trạng thái release nêu trong bản tin ngày 2026-03-10)

Tool | Issues nóng đề cập | PRs mới/được nêu | Release / trạng thái hôm nay
--- | ---:|---:|---
Claude Code | 10 | 9 (mới 24h) | v2.1.72 — phát hành (bypass proxy, /copy:w)
OpenAI Codex | 10 | 10 | rust-v0.113.0-alpha.2 — marked (alpha)
Gemini CLI | 10 | 10 | v0.33.0-preview.9 — preview release (cherry‑picks)
GitHub Copilot CLI | 10 | 0 (không PR mới 24h) | v1.0.3 — phát hành (extensions experimental)
Kimi Code CLI | 8 | 10 | v1.18.0 — phát hành
OpenCode | 10 | 10 | v1.2.24 — phát hành (TUI workspaces, 1M context header)
Qwen Code | 10 | 10 | v0.12.0 — phát hành (CRLF fix, tabWidth)

Ghi chú: “Issues nóng” và “PRs” lấy từ danh sách nổi bật trong mỗi bản tin; không phải là tổng số hiện tại trên repo.

3) Hướng tính năng chung (xuất hiện nhiều cộng đồng)
- Ổn định/hiệu năng: memory leak, high RAM, long-running hangs — Claude Code, OpenCode, Qwen, Codex.  
- Quản lý quota/diagnostics rate-limits: minh bạch quota và công cụ debug (Claude, Codex, Copilot).  
- Auth/token & multi‑account: token refresh/401, workspace‑aware auth (Codex, OpenCode, Copilot, Kimi).  
- Terminal/TUI reliability: cursor flicker, stuttering, tmux integration, key handling (Copilot, OpenCode, Qwen, Kimi).  
- Plugin/hooks/extension SDK: extension SDK hoặc hooks engine để tích hợp third‑party (Copilot, Codex, OpenCode, Qwen).  
- Secure execution & policy warnings: sandboxing native Windows, policy warnings for destructive commands (Gemini, OpenCode, Claude).  
- Session / resume / history UX: list/select sessions, resume behavior (Claude, Gemini, Kimi, OpenCode).

4) Phân tích khác biệt hóa
- Claude Code: trọng tâm vào hệ thống tool/agent và quyền công cụ (allowed-tools, agent flow); nhiều vấn đề lớn về memory/Cowork VM — phù hợp teams dùng plugin/agent nặng.  
- OpenAI Codex: tập trung mạnh vào bảo mật filesystem (.codexignore, deny_read), hooks engine và recovery (CLI/desktop hangs) — phù hợp workflows cần kiểm soát file/privates.  
- Gemini CLI: ưu tiên UX cho Plan mode, agent/subagent orchestration và web_fetch hardening (SSRF/rate‑limit) — hướng tới agent orchestration ở quy mô.  
- GitHub Copilot CLI: trọng tâm UX terminal, MCP server integration và mở rộng qua Extensions SDK — hướng mạnh tới tích hợp doanh nghiệp/IDE-first.  
- OpenCode: chú trọng TUI/workspace, plugin UI extensibility và multi-account — phù hợp người dùng TUI, workspace‑centric.  
- Kimi & Qwen: tập trung vào tích hợp editor/ACP (Zed), provider compatibility, và robustness CLI (input keys, CRLF, proxy) — target developer-first, editor‑centric workflows.

5) Động lực & độ trưởng thành của cộng đồng
- Hoạt động cao nhất / tương tác mạnh: Claude Code và OpenAI Codex (vấn đề memory/hang có nhiều bình luận & upvotes) — cộng đồng lớn, nhiều repro chi tiết.  
- Lặp nhanh (frequent releases / cherry‑picks): Gemini (preview chain/cherry‑picks), Copilot (v1.0.3 builds), OpenCode và Qwen đều có release gần đây — tốc độ iterate nhanh, ưu tiên sửa UX.  
- Cộng đồng nhỏ hơn nhưng focused: Kimi và Qwen có issue/PR hướng trực tiếp tới tích hợp editor và provider‑compat; phản hồi thường tập trung vào reproducibility và test vectors.  
- Kết luận: dự án lớn (Claude, Codex, Gemini) có khối lượng issue & yêu cầu phức tạp hơn (stability + governance); dự án nhỏ/nhắm dev (Kimi, Qwen) chuyển nhanh trên UX/edge‑case.

6) Tín hiệu xu hướng & khuyến nghị cho nhà phát triển / quyết định kỹ thuật
- Xu hướng ngành:
  - Reliability-first: memory profiling, long‑running session handling và deterministic IO safeguards (checkpoint safety) đang trở thành yêu cầu cơ bản.  
  - Security-by-default: file ignore/deny_read, sandbox native (Windows) và policy warnings cho automation là tiêu chuẩn bảo mật cần có.  
  - Extensibility: hooks/extension SDKs + machine‑readable outputs (stream‑JSON) ngày càng được yêu cầu để tích hợp toolchain.  
  - Cross‑platform robustness: cải thiện Windows/WSL/tmux behavior và explicit proxy/NO_PROXY handling là bắt buộc cho enterprise adoption.  
- Hành động khuyến nghị (ưu tiên cho teams kỹ thuật / product):
  1) Prioritize stability: đầu tư profiling memory, test long‑running TUI/agent scenarios, và add safe IO defaults (no‑overwrite checkpoints, atomic writes).  
  2) Add security primitives: .ignore/deny_read, explicit permission metadata inheritance, policy warning UX trước các lệnh destructive, và native sandboxing cho Windows.  
  3) Improve observability & developer diagnostics: quota/debug tool (why rate‑limited), token refresh telemetry, clear error classification (retry vs fatal).  
  4) Make CLI composable: JSON/stream output, hooks/events, and extension SDK to enable automation and third‑party integrations.  
  5) Cross‑platform test matrix: include tmux, PowerShell, WSL, and proxy/NO_PROXY cases in CI to avoid recurring platform regressions.

Tóm tắt ngắn gọn cho quyết định: nếu mục tiêu là stability & enterprise‑grade adoption, ưu tiên memory/IO safeguards + auth/quota transparency và Windows sandboxing. Nếu mục tiêu là tăng tích hợp dev‑workflow nhanh, đầu tư vào hooks/extension SDK, session UX và machine‑readable outputs sẽ đem lại giá trị chuyển đổi lớn.

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nổi bật Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

Dưới đây là báo cáo điểm nổi bật về hoạt động cộng đồng xung quanh kho anthropics/skills (dữ liệu đến 2026-03-10). Ngôn ngữ: tiếng Việt, ngắn gọn và mang tính phân tích.

1) Xếp hạng Skills hot (5–8 PR được cộng đồng quan tâm nhất)
- #521 — record-knowledge: Lưu tri thức giữa các phiên Claude Code bằng các mục Markdown trong .claude/knowledge/entries/; nổi bật vì giải quyết hạn chế mất ngữ cảnh giữa session. Trạng thái: OPEN. Link: https://github.com/anthropics/skills/pull/521
- #522 — plan-task: Lưu trữ kế hoạch và tiến độ tác vụ (Markdown, hỗ trợ chế độ Git-tracked), cho phép tiếp tục kế hoạch giữa session; điểm thảo luận chính là đồng bộ hóa và ghi nhận tiến độ lâu dài. Trạng thái: OPEN. Link: https://github.com/anthropics/skills/pull/522
- #154 — shodh-memory: Hệ thống bộ nhớ trường diễn (persistent memory) cho agents — khi gọi proactive_context, cấu trúc nhớ, khi nào trích xuất; nổi bật vì nhu cầu “nhớ” ngữ cảnh liên tục. Trạng thái: OPEN. Link: https://github.com/anthropics/skills/pull/154
- #83 — skill-quality-analyzer & skill-security-analyzer: Bộ meta-skill để đánh giá chất lượng và an toàn Skills (đa chiều: docs, cấu trúc, security checks, v.v.); được thảo luận nhiều do nó có thể nâng chuẩn marketplace. Trạng thái: OPEN. Link: https://github.com/anthropics/skills/pull/83
- #514 — document-typography: Kiểm soát chất lượng kiểu chữ cho tài liệu sinh bởi AI (orphan/widow, căn số, căn lề danh sách); nổi bật vì vấn đề này ảnh hưởng trực tiếp trải nghiệm đầu ra văn bản. Trạng thái: OPEN. Link: https://github.com/anthropics/skills/pull/514
- #486 — ODT skill: Tạo, điền template và parse ODT ↔ HTML (hỗ trợ OpenDocument, LibreOffice/Google Docs); thảo luận tập trung vào tương thích định dạng và luồng công việc văn phòng. Trạng thái: OPEN. Link: https://github.com/anthropics/skills/pull/486
- #210 — Improve frontend-design skill clarity and actionability: Làm rõ và làm thực thi được hơn kỹ năng frontend design; nhiều thảo luận về cách viết hướng dẫn “có thể chạy được” trong một conversation. Trạng thái: OPEN. Link: https://github.com/anthropics/skills/pull/210
- #509 — docs: add CONTRIBUTING.md: Tập trung cải thiện sức khỏe cộng đồng repo (điểm GitHub community health); được xem là động thái nền tảng để tăng đóng góp và chất lượng PR. Trạng thái: OPEN. Link: https://github.com/anthropics/skills/pull/509

2) Xu hướng nhu cầu cộng đồng (tóm tắt từ Issues)
- Bộ nhớ & tính bền vững ngữ cảnh: nhiều nhu cầu về nhớ lâu dài, persist knowledge/plan/task giữa session (Issue liên quan và nhiều PR memory/plan ghi nhận). Ví dụ: vấn đề mất Skills/phiên (#62) và PR memory/plan (#154/#521/#522).
- Công cụ đánh giá chất lượng & an toàn cho Skills: mong muốn meta-skill để audit docs, security, compatibility (#83, #492).
- Tương thích tài liệu và xuất bản văn phòng: kiểm soát typography, giữ nguyên XML/whitespace cho docx, hỗ trợ ODT — để bảo đảm tài liệu do AI tạo tương thích với MS Word/LibreOffice (#143, #514, #486).
- Nâng cấp tooling cho người đóng góp / skill-creator: cải thiện CLI/skill-creator (UTF-8 fixes, YAML parsing, api-key issues), và CONTRIBUTING.md để giảm friction cho cộng đồng (#284, #362, #361, #509, Issue #202).
- Enterprise / tích hợp hệ thống: tích hợp email/calendar (Google Workspaces), Bedrock và API stability—nhiều issue báo lỗi API/500 và nhu cầu dùng trong doanh nghiệp (Issues #29, #403, #406, PR #299).

3) Skills tiềm năng cao chưa merge (PR có dấu hiệu hưởng ứng/giải quyết needs, có thể sớm triển khai)
- record-knowledge (#521) — trực tiếp giải quyết nhu cầu nhớ giữa session; có khả năng được ưu tiên. Link: https://github.com/anthropics/skills/pull/521
- plan-task (#522) — tương tự, tập trung task/plan persistence và chia sẻ trạng thái; phù hợp cho workflows sản xuất. Link: https://github.com/anthropics/skills/pull/522
- shodh-memory (#154) — hệ thống bộ nhớ có hành vi chủ động; nền tảng cho agent dài hạn. Link: https://github.com/anthropics/skills/pull/154
- skill-quality-analyzer & skill-security-analyzer (#83) — meta-skill quan trọng để nâng chuẩn marketplace, nhiều dự án phụ thuộc. Link: https://github.com/anthropics/skills/pull/83
- document-typography (#514) — giải quyết lỗi hiển thị/tính đọc được tài liệu AI-generated; dễ thấy nhu cầu thực tế lớn. Link: https://github.com/anthropics/skills/pull/514
- ODT skill (#486) — bổ sung định dạng chuẩn mở cho ecosystem văn phòng, hữu ích cho người dùng doanh nghiệp. Link: https://github.com/anthropics/skills/pull/486
- Các sửa lỗi toolchain (quick_validate / UTF-8 / YAML) — #362, #361, #284: những PR này nhỏ nhưng thiết yếu để giảm lỗi upload/parse cho contributors và enterprise users. Links: https://github.com/anthropics/skills/pull/362 , https://github.com/anthropics/skills/pull/361 , https://github.com/anthropics/skills/pull/284

4) Nhận định hệ sinh thái Skills (1 câu)
Cộng đồng đang tập trung mạnh vào: duy trì ngữ cảnh/kiến thức dài hạn và tính bền vững workflow (memory, plans, tasks), đồng thời yêu cầu công cụ kiểm định chất lượng/an toàn và tương thích định dạng tài liệu—những yếu tố này quyết định khả năng đưa Skills vào sử dụng doanh nghiệp và quy mô hoá sản phẩm.

Nếu cần, tôi có thể cung cấp ma trận ưu tiên (impact vs. effort) cho các PR/issue nêu trên để hỗ trợ ra quyết định duyệt/triage.

---

Claude Code Community Bulletin — 2026-03-10

1) Điểm nổi bật hôm nay
- Bản phát hành v2.1.72 được đẩy trong 24 giờ qua với hai cập nhật hữu dụng: thay đổi tìm kiếm công cụ để có thể bỏ qua proxy bên thứ ba khi biến môi trường tương ứng được set, và phím tắt mới `w` trong `/copy` để ghi lựa chọn hiện tại trực tiếp vào file (bỏ qua clipboard) — hữu ích khi làm việc từ xa.  
- Cộng đồng đang tích cực báo cáo một số vấn đề nghiêm trọng về bộ nhớ, hiệu năng Cowork (tạo VM bundle lớn) và các lỗi phân phối/giới hạn API kiểu "rate limit" dù có đăng ký trả phí — những mục này có lượng tương tác cao và đang được thảo luận sôi nổi.

2) Phát hành phiên bản
- v2.1.72 — tóm tắt thay đổi chính:
  - Thay đổi cơ chế tìm kiếm công cụ: nếu biến môi trường tương ứng được bật thì bypass cổng proxy bên thứ ba (biến cũ `CLAUDE_CODE_PROXY_SUPPORTS_TOOL_REFERENCE` đã bị gỡ).  
  - Thêm phím `w` cho lệnh `/copy` để ghi lựa chọn đang focus trực tiếp vào file, bỏ qua clipboard (thích hợp cho phiên làm việc từ xa/SSH).  
  Link: https://github.com/anthropics/claude-code/releases/tag/v2.1.72

3) Issues nóng trong cộng đồng — 10 mục đáng chú ý
(ghi ngắn gọn vì tính kỹ thuật và mức ưu tiên; mỗi mục kèm link)

- Claude Code Memory Leak — Process Grows to 120+ GB RAM and Gets OOM Killed  
  Tại sao quan trọng: Rò rỉ bộ nhớ cực kỳ nghiêm trọng, gây OOM trên máy Linux; ảnh hưởng trực tiếp trải nghiệm lâu dài và khả năng dùng cho dự án lớn.  
  Phản ứng: 69 bình luận, 59 👍 — nhiều mô tả repro và phiên bản bị ảnh hưởng.  
  Link: https://github.com/anthropics/claude-code/issues/4953

- Cowork feature creates 10GB VM bundle that severely degrades performance  
  Tại sao quan trọng: Cowork tạo VM bundle ~10GB làm chậm toàn bộ Claude Desktop (khởi động, UI, phản hồi). Gây ảnh hưởng UX cho nhiều người dùng macOS/desktop.  
  Phản ứng: 42 bình luận, 102 👍 — high-priority.  
  Link: https://github.com/anthropics/claude-code/issues/22543

- [Windows] API Error: Rate limit reached despite Claude Max subscription and only 16% usage  
  Tại sao quan trọng: Người dùng trả phí gặp hạn chế bất ngờ — có thể liên quan auth/quota/back-end; ảnh hưởng trực tiếp khả năng chạy workflow.  
  Phản ứng: 24 bình luận, 15 👍.  
  Link: https://github.com/anthropics/claude-code/issues/29579

- Claude Code is hanging / freezing / stuck on heaps of prompts for 5-20minutes or more  
  Tại sao quan trọng: Treo/đóng băng khi xử lý nhiều prompt làm gián đoạn công việc nghiên cứu/lập trình quy mô lớn.  
  Phản ứng: 24 bình luận, 33 👍.  
  Link: https://github.com/anthropics/claude-code/issues/26224

- [Windows] API Error: Rate limit reached incorrect in CLI  
  Tại sao quan trọng: CLI báo lỗi giới hạn không chính xác — gây nhầm lẫn và dẫn đến xử lý công việc thừa.  
  Phản ứng: 16 bình luận, 9 👍.  
  Link: https://github.com/anthropics/claude-code/issues/25531

- Built-in Plan agent ignores parent settings.json permissions and repeatedly prompts for pre-approved tools  
  Tại sao quan trọng: Agent lặp lại yêu cầu quyền cho công cụ đã được cấp phép — phá vỡ luồng tự động hóa và trải nghiệm Plan agent.  
  Phản ứng: 15 bình luận, 27 👍.  
  Link: https://github.com/anthropics/claude-code/issues/10906

- Setting excludedCommands doesn't seem to be respected  
  Tại sao quan trọng: Cấu hình bảo mật/giới hạn lệnh không hoạt động như mong đợi — rủi ro workflow không an toàn hoặc bị chặn không đúng.  
  Phản ứng: 12 bình luận, 20 👍.  
  Link: https://github.com/anthropics/claude-code/issues/10524

- Skill allowed-tools doesn't grant permission for Bash commands  
  Tại sao quan trọng: Phần metadata plugin/skill báo cho phép nhưng Bash vẫn bị từ chối — làm hỏng mô hình quyền công cụ, đặc biệt với plugins/skills.  
  Phản ứng: 11 bình luận, 12 👍.  
  Link: https://github.com/anthropics/claude-code/issues/14956

- clangd LSP plugin: all operations fail with 'trying to get AST for non-added document'  
  Tại sao quan trọng: LSP clangd bị lỗi toàn diện — ảnh hưởng dev C/C++ dùng plugin tích hợp.  
  Phản ứng: 3 bình luận, 5 👍 (một số repro chi tiết).  
  Link: https://github.com/anthropics/claude-code/issues/29501

- Claude Code overwrote ML training checkpoint causing ~16h GPU compute loss  
  Tại sao quan trọng: Ghi đè checkpoint đào tạo ML dẫn tới mất nhiều giờ GPU — sự cố data-loss nghiêm trọng, cần biện pháp an toàn I/O.  
  Phản ứng: mới nộp hôm 2026-03-10, đang chờ điều tra.  
  Link: https://github.com/anthropics/claude-code/issues/32654

4) Tiến độ PR quan trọng — các PR mới nhất (24h)
Lưu ý: trong 24 giờ có 9 PR mở; dưới đây là tóm tắt 9 PR — không đủ 10 PR trong nguồn.

- Add Paper Writing Plugin with guided academic argument development (#32408)  
  Tính năng: Plugin hướng dẫn 6-phase workflow cho viết bài học thuật, gồm main command và các agent chuyên dụng.  
  Link: https://github.com/anthropics/claude-code/pull/32408

- feat: add cc-taskrunner plugin — autonomous task queue (#32629)  
  Tính năng: Plugin quản lý hàng đợi tác vụ tự động, chạy task cô lập trên nhánh auto/{task-id} (hữu ích cho chạy đêm/CI).  
  Link: https://github.com/anthropics/claude-code/pull/32629

- Add CLAUDE.md documentation for Claude Code repository (#32625)  
  Tính năng: Thêm tài liệu nội bộ cho developer, giải thích cấu trúc repo, automation, plugin architecture. Giúp onboarding.  
  Link: https://github.com/anthropics/claude-code/pull/32625

- Clarify plugin examples versus built-ins (#32430)  
  Tính năng: Ghi chú trong plugins/README.md phân biệt plugin ví dụ và tính năng built-in; hướng dẫn tài liệu chính thức trước.  
  Link: https://github.com/anthropics/claude-code/pull/32430

- Improve dedupe workflow and plugin metadata consistency (#32488)  
  Tính năng: Cân chỉnh workflow dedupe, đảm bảo metadata plugin nhất quán; giảm telemetry khi không cần.  
  Link: https://github.com/anthropics/claude-code/pull/32488

- docs: add README.md for security-guidance plugin (#17776)  
  Tính năng: Thêm README đầy đủ cho plugin security-guidance (9 security patterns).  
  Link: https://github.com/anthropics/claude-code/pull/17776

- docs: clarify Windows install command requires PowerShell (#28850)  
  Tính năng: Ghi chú rõ lệnh cài Windows phải chạy trong PowerShell (tránh lỗi 'irm' không nhận diện).  
  Link: https://github.com/anthropics/claude-code/pull/28850

- Add usage transparency plugin for quota troubleshooting (#32142)  
  Tính năng: Plugin minh bạch hoá quota/usage để phân biệt rate-limit vs billing/auth — hỗ trợ debug lỗi quota.  
  Link: https://github.com/anthropics/claude-code/pull/32142

- docs: clarify that piped commands need separate permission entries (#31543)  
  Tính năng: Ghi chú rằng mỗi command trong chuỗi piped/&&/|| phải có entry allow riêng; ví dụ JSON.  
  Link: https://github.com/anthropics/claude-code/pull/31543

5) Xu hướng yêu cầu tính năng (tổng hợp từ các Issues)
- Minh bạch quota & debug giới hạn API: nhiều người yêu cầu tool/diagnostic để biết rõ lý do rate limit (quota, org, billing, backend). (tham khảo #29579, PR #32142)  
- Quản lý phiên/tiếp tục hội thoại trên nhiều thư mục: đề xuất hợp nhất lịch sử hội thoại để dễ resume giữa dự án (#32655).  
- Plugins/skills: cần metadata/permissions rõ ràng và nhất quán (allowed-tools, permission inheritance) để tránh prompt lặp/deny (#14956, #10906).  
- Task runner/autonomous execution: nhu cầu chạy tác vụ tự động, an toàn (branch isolation, queue) — thấy trong PR cc-taskrunner (#32629).  
- An toàn IO/backup cho công việc nặng (training checkpoints): bảo vệ khỏi ghi đè và chính sách resume/exist_ok an toàn (#32654).  
- Cải thiện trải nghiệm Windows/WSL/Cowork: nhiều yêu cầu sửa lỗi tương thích và hướng dẫn cài đặt (WSL path handling, HCS errors, PowerShell notes) (#22543, #31877, #32661, #28850).  
- Tùy chỉnh CLI output: giảm formatting artifacts để copy/paste sạch hơn (issue #15199).  
- Hỗ trợ WebMCP / extension integration cho Chrome để mở rộng remote control và plugin distribution (#30645).

6) Điểm đau của nhà phát triển — tóm tắt các vấn đề thường gặp
- Hiệu năng & bộ nhớ: rò rỉ bộ nhớ nghiêm trọng và performance degradation theo thời gian (cowork VM bundle, 10+GB) là hai vấn đề hàng đầu làm giảm ổn định. (xem #4953, #22543)  
- Giới hạn API và xác thực: rate limit khó hiểu ngay cả với subscription, refresh token / OAuth metadata handling có vấn đề — gây ngắt quãng workflow. (xem #29579, #7744)  
- Quyền công cụ & flow agent: nhiều báo cáo về agent/skills không tôn trọng settings.json hoặc allowed-tools, dẫn tới prompt lặp lại và trải nghiệm gián đoạn. (xem #10906, #14956)  
- Windows/WSL/Cowork edge-cases: lỗi path, Plan9 share, HCS failures, plugin marketplace tạo path Windows trong WSL — ảnh hưởng người dùng trên Windows/WSL. (xem #31877, #32661)  
- CLI UX: định dạng đầu ra phá copy/paste, cờ --worktree có thể treo, và thiếu lịch sử hội thoại thống nhất là những cản trở năng suất. (xem #15199, #29384, #32655)  
- Rủi ro mất dữ liệu: hành vi ghi đè file checkpoint khi gọi các lệnh IO tự động có thể gây mất giờ GPU/compute; cộng đồng yêu cầu safeguard mặc định. (xem #32654)

Kết luận ngắn:
- Hôm nay cộng đồng tập trung vào các vấn đề ổn định (bộ nhớ, hiệu năng Cowork), quyền công cụ/agent và các lỗi liên quan Windows/WSL. Những PR hướng tới tài liệu, minh bạch quota và plugin mới (taskrunner, paper-writing) phản ánh nhu cầu vừa cải thiện tính ổn định vừa mở rộng workflow tự động hóa. Nếu bạn đang gặp những lỗi lớn (memory leak, cowork VM bundle, strange rate limits), hãy follow các issue tương ứng và cung cấp repro/logs — đó là thứ dev team cần nhất lúc này.

Tài nguyên nhanh:
- Repo chính: https://github.com/anthropics/claude-code

(Đã đính kèm liên kết GitHub cho từng mục trong nội dung trên.)

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

Bản tin cộng đồng OpenAI Codex — 2026-03-10

1) Điểm nổi bật hôm nay
- Phiên bản rust-v0.113.0-alpha.2 (0.113.0-alpha.2) vừa được đánh dấu; chú ý nhiều thảo luận về hiện tượng treo/“hang” của Codex CLI và vấn đề bảo mật/tiếp cận file (ignore/blocklist). Xem release: https://github.com/openai/codex/releases
- Cộng đồng đang tập trung vào ba luồng chính: (1) ổn định/treo ứng dụng & CLI, (2) quyền truy cập/ẩn-nội dung (ignore/deny_read), (3) trải nghiệm nhà phát triển (WSL/Windows, export markdown, chỉnh sửa tin nhắn).

2) Phát hành phiên bản
- rust-v0.113.0-alpha.2 — Release 0.113.0-alpha.2 (tên bản alpha được ghi nhận trong 24 giờ qua). Tham khảo trang Release để theo dõi changelog chi tiết: https://github.com/openai/codex/releases

3) Issues nóng trong cộng đồng (10 mục, vì sao quan trọng & phản ứng)
- #14048 All models — Codex CLI hangs indefinitely on all prompts, no response generated (CLOSED) — Tác giả @galcianuk. Lý do quan trọng: treo toàn cục của CLI ảnh hưởng trực tiếp dòng công việc; nhiều báo cáo, nhiều bình luận (98) và lượt + (76) => big impact. Link: https://github.com/openai/codex/issues/14048
- #2847 A way to exclude sensitive files (OPEN) — Tác giả @mkusaka. Lý do: yêu cầu bắt buộc về bảo mật/riêng tư: .codexignore / global ignore; cộng đồng ủng hộ mạnh (60 bình luận, 246 👍). Link: https://github.com/openai/codex/issues/2847
- #12764 The codex cli giving: 401 unauthorized (OPEN) — Tác giả @isha-paliwal3. Lý do: lỗi auth 401 khiến workflow CI/dev dừng; nhiều người gặp (51 bình luận). Link: https://github.com/openai/codex/issues/12764
- #9634 Your access token could not be refreshed… Please log out and sign in again (OPEN) — Tác giả @quanstromberg-spec. Lý do: vấn đề refresh token gây mất phiên; ảnh hưởng người dùng Pro/SDK (22 bình luận). Link: https://github.com/openai/codex/issues/9634
- #12661 Markdown file:// links open in default browser (Edge) instead of VS Code editor (OPEN) — Tác giả @dieterdaniel82. Lý do: UX IDE bị phá vỡ trên Windows; làm chậm dev flow (19 bình luận, 21 👍). Link: https://github.com/openai/codex/issues/12661
- #13747 Codex App bundles codex-cli 0.108.0-alpha.12 and fails on macOS (OPEN) — Tác giả @jlala. Lý do: phân phối App kèm CLI gây lỗi trên macOS Apple Silicon; người dùng báo rằng standalone cli cũ chạy được (13 bình luận). Link: https://github.com/openai/codex/issues/13747
- #2880 Copy/Export Message as Markdown (OPEN) — Tác giả @0xdevalias. Lý do: nhu cầu xuất nội dung thảo luận/code để làm tài liệu/issue; nhiều + (33) và thảo luận (11). Link: https://github.com/openai/codex/issues/2880
- #12852 Codex Desktop threads stuck in “Thinking” and cannot be stopped unless background process is force-killed (OPEN) — Tác giả @Upper-Hank. Lý do: thread không thể dừng, cần force-kill — ảnh hưởng trải nghiệm người dùng Desktop (10 bình luận). Link: https://github.com/openai/codex/issues/12852
- #13549 Codex App on Windows, when configured to use WSL, continues to reference the Windows-hosted config.toml (OPEN) — Tác giả @dhpancor. Lý do: cấu hình WSL bị bỏ qua, gây lỗi đường dẫn/file và dữ liệu làm việc (9 bình luận, 11 👍). Link: https://github.com/openai/codex/issues/13549
- #13025 Codex Desktop ignores project .codex/config.toml MCP server (Serena) and only loads ~/.codex/config.toml (OPEN) — Tác giả @PaulRBerg. Lý do: phân biệt cấu hình project vs user; tác động tới tái tạo môi trường và team workflows (9 bình luận, 7 👍). Link: https://github.com/openai/codex/issues/13025

4) Tiến độ PR quan trọng (10 PR, tính năng / bản sửa)
- #14150 Add spawn_agent model overrides — @aibrahim-oai. Thêm tuỳ chọn model và reasoning_effort khi spawn agent; hiển thị mô hình spawnable và bổ sung test. Link: https://github.com/openai/codex/pull/14150
- #12389 feat(permissions): add managed filesystem deny_read blocklist — @viyatb-oai. Thêm cơ chế deny_read được enforced từ requirements.toml cho filesystem quản lý, áp dụng cả direct file tools và sandbox macOS/Linux — nền tảng cho chặn file nhạy cảm. Link: https://github.com/openai/codex/pull/12389
- #13276 start of hooks engine — @eternal-openai. MVP cho engine hooks (SessionStart/Stop); hook đồng bộ, chặn tiến trình bình thường trong khi chạy — bước nền tảng cho tích hợp bên thứ ba / extension. Link: https://github.com/openai/codex/pull/13276
- #13418 Add code_mode experimental feature — @pakrym-oai. Tính năng cô lập để cải thiện tương tác mã (narrow js_repl-like) dưới dạng experimental. Link: https://github.com/openai/codex/pull/13418
- #14149 unifying all image saves to /tmp to bug-proof — @won-openai. Chuẩn hoá vị trí lưu hình sang /tmp để giảm lỗi path/permission liên quan image-gen. Link: https://github.com/openai/codex/pull/14149
- #14011 [apps] Fix apps enablement condition — @mzeng-openai. Sửa điều kiện enable apps để kiểm tra cả feature flag và loại user (không phải API key user). Link: https://github.com/openai/codex/pull/14011
- #13860 add guardian assessment thread items — @charley-oai. Thêm ThreadItem::GuardianAssessment để UI hiển thị trạng thái phê duyệt tự động trong lịch sử thread — liên quan governance/approvals. Link: https://github.com/openai/codex/pull/13860
- #14018 feat(tui): migrate TUI to in-process app-server — @fcoury. Di chuyển TUI để dùng app-server nội tiến trình, khắc phục bypass app-server trước đó và chuẩn hoá luồng thao tác giữa TUI và thread management. Link: https://github.com/openai/codex/pull/14018
- #13792 feat: support disabling bundled system skills — @xl-openai. Cho phép tắt skills mặc định qua config (skills.bundled.enabled = false) — quan trọng cho môi trường tuỳ biến/chiến lược an toàn. Link: https://github.com/openai/codex/pull/13792
- #13978 enh: add feature-flagged server-side compaction — @cooper-oai. Thêm flag server_side_compaction, gửi context_management thay vì gọi legacy /compact; tối ưu quản lý context/compaction. Link: https://github.com/openai/codex/pull/13978

5) Xu hướng yêu cầu tính năng (từ các Issues)
- Bảo mật/riêng tư file: .codexignore / global ignore + deny_read blocklist (Issues #2847, PR #12389) — mong muốn rõ ràng: chặn agent đọc/ gửi file nhạy cảm.
- Ổn định/khả năng phục hồi: giải quyết treo “Thinking” / CLI hangs / token refresh (Issues #14048, #12852, #12764, #9634).
- Windows/WSL và packaging: hỗ trợ installer truyền thống cho Windows, WSL path/config correctness, app bundling issues (Issues #13993, #13549, #13747, #13762).
- Developer UX trong IDE/TUI: export as Markdown, rename threads, edit messages, terminal /title, plan mode cho CLI/SDK (Issues #2880, #12564, #11086, PR #13522, #13377).
- Permissions & approvals workflow: guardian assessments, request_permissions/Reject flow, preserving forward compatibility (PRs #13860, #14118, #14107).
- Hooks & extensions: hook engine để mở rộng session lifecycle (PR #13276) và seatbelt/Chromium permission cho macOS (PR #13622).
- Context & resource management: server-side compaction, model-context-window behavior, fast-mode visibility and usage drain concerns (PR #13978, Issues #14116, #14133, PR #14135).

6) Điểm đau của nhà phát triển (tổng hợp ngắn gọn)
- Treo/đóng băng CLI và threads (“Thinking”): nhiều báo cáo lớn, yêu cầu debug sâu mạng/streaming/exec; tạm thời người dùng phải force-kill hoặc dùng khác biệt giữa app và standalone CLI. (See #14048, #12852)
- Auth & token refresh không ổn định: refresh token bị “used”/401 làm gián đoạn phiên làm việc; giải pháp tạm: logout/login lại. (See #12764, #9634)
- Bảo mật dữ liệu/độ riêng tư: thiếu cơ chế ignore/blocklist khiến repo chứa secrets có nguy cơ bị đọc / upload; cộng đồng yêu cầu .codexignore và deny_read. (See #2847, PR #12389)
- Windows/WSL path + packaging: nhiều vấn đề liên quan config location, worktree lưu trên /mnt/c, và app bundling sai CLI version — gây trải nghiệm không nhất quán giữa App và CLI. (See #13549, #13762, #13747)
- Thiếu tính năng tiện ích dev: export markdown, chỉnh sửa tin nhắn, rename thread/title, plan mode cho CLI/SDK — ảnh hưởng workflow ghi chép và automation. (See #2880, #11086, #12564, #13377)
- Quản lý context và chi phí sử dụng: fast mode / multi-agent spawning gây “usage drain” và model/context window cấu hình không được tôn trọng trong một số UI. (See #14116, #14133, PR #14135, PR #13978)

Tổng kết ngắn: tập trung theo dõi các PR về bảo mật filesystem (deny_read/.codexignore), hook engine và sửa lỗi treo CLI/desktop — đó là những mục cần ưu tiên cộng đồng. Nếu bạn đang bị lỗi, kiểm tra xem bạn đang dùng standalone CLI hay Codex App, thử logout/login, cập nhật lên bản mới nhất và theo dõi các PR/issue liên quan để áp dụng workaround tạm thời.

Tham khảo nhanh các liên kết đã trích:
- Repo: https://github.com/openai/codex
- Issues & PRs được trích trong bản tin: các liên kết ngay trong từng mục phía trên.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

Bản tin cộng đồng Gemini CLI — 2026-03-10

1) Điểm nổi bật hôm nay
- Phiên bản preview v0.33.0-preview.9 được phát hành (chuẩn bị tiếp v0.33.0-preview.10 bằng cherry‑pick tự động). Bản vá chủ yếu là các cherry‑pick sửa lỗi để ổn định chuỗi preview. Xem changelog đầy đủ để biết chi tiết: https://github.com/google-gemini/gemini-cli/compare/v0.33.0-preview.8...v0.33.0-preview.9
- Cộng đồng đang tập trung sửa các vấn đề UI/UX quan trọng: chế độ Plan (cắt nội dung, footer kép, escape handling), logic phê duyệt/exit_plan_mode liên quan tới policy ALLOW, và nhiều cải tiến cho agent/subagent, web_fetch và trải nghiệm phiên làm việc (resume sessions).

2) Phát hành phiên bản
- v0.33.0-preview.9 — Release notes ngắn: patch cherry‑picks để sửa các regression trong chuỗi preview; PR changelog tự động đã được tạo. Link release/changelog: https://github.com/google-gemini/gemini-cli/compare/v0.33.0-preview.8...v0.33.0-preview.9
- Có PR robot tạo patch tiếp (chi cherry‑pick để sinh v0.33.0-preview.10): https://github.com/google-gemini/gemini-cli/pull/21800

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #20716 Fix truncation of plans in the approval dialog — Quan trọng vì người dùng không thể xem toàn bộ plan khi phê duyệt; ảnh hưởng UX quy trình plan. Cập nhật gần nhất 2026-03-10, 8 bình luận. https://github.com/google-gemini/gemini-cli/issues/20716
- #20549 Fix issue exiting plan mode because of wrong plans path — Bug blocker: không thể thoát plan mode (affects workflow). Priority P1. https://github.com/google-gemini/gemini-cli/issues/20549
- #21806 exit_plan_mode ignores policy `allow` decision when scheduler skips confirmation — Rõ ràng là một hole logic giữa chính sách và luồng scheduler; dẫn tới việc lệnh bị từ chối dù policy cho phép. Mới tạo 2026-03-10, help wanted. https://github.com/google-gemini/gemini-cli/issues/21806
- #20302 [Epic] Remote Agents: Sprint 1 — Epic hạ tầng cho remote agents; nền tảng cho tính năng agent phân tán/streaming. Tác động lớn đến roadmap agent. https://github.com/google-gemini/gemini-cli/issues/20302
- #21461 Gemini CLI Shell Command does not support aliases — UX dev: alias shell không hoạt động trong CLI (!) — gây bất tiện cho người dùng shell-heavy. https://github.com/google-gemini/gemini-cli/issues/21461
- #20886 Refine subagents UX — Cải thiện hiển thị/điều hướng subagent; quan trọng khi tính năng subagent được kích hoạt. https://github.com/google-gemini/gemini-cli/issues/20886
- #20217 Flickering when typing file paths — Hiện tượng flicker gây khó chịu khi gõ đường dẫn; đã có file attachment; có 2 bình luận, 1 👍. https://github.com/google-gemini/gemini-cli/issues/20217
- #21808 [Bug] Input box / cursor flickers continuously during command execution — Tương tự vấn đề giao diện thời gian thực; làm giảm trải nghiệm khi bot đang chạy. Mới 2026-03-10. https://github.com/google-gemini/gemini-cli/issues/21808
- #21421 Gemini CLI should periodically reflect on the trajectory and recommend the creation or update of skills — Feature request hướng tới tự động hóa cải thiện skills/memory; có khả năng thay đổi workflow dài hạn cho agent. https://github.com/google-gemini/gemini-cli/issues/21421
- #21596 Warn users about suspicious policies — Bảo mật/An toàn: cần cảnh báo khi policy cho phép các lệnh nguy hiểm (ví dụ auto-approve rm). Quan trọng để tránh destructive automation. https://github.com/google-gemini/gemini-cli/issues/21596

4) Tiến độ PR quan trọng (10 PR được chú ý)
- #21804 fix(session): include available sessions in error when --resume gets invalid ID — Trải nghiệm phiên: khi --resume id sai, giờ sẽ hiển thị danh sách các session khả dụng trong lỗi. Tác giả @Zahed-Riyaz. https://github.com/google-gemini/gemini-cli/pull/21804
- #21797 fix: show available sessions for invalid --resume identifiers — PR tương tự/đồng bộ về UX resume sessions (tác giả @sonwr). https://github.com/google-gemini/gemini-cli/pull/21797
- #21807 feat(core): implement native Windows sandboxing — Bổ sung sandboxing native cho Windows (Restricted Tokens + MIC) để chạy tools an toàn hơn trên Windows. Tác giả @mattKorwel. https://github.com/google-gemini/gemini-cli/pull/21807
- #21794 (CLOSED) feat(core): enable retryFetchErrors by default and add user notifications — Đã đóng nhưng đáng chú ý: bật retryFetchErrors theo mặc định và thêm thông báo khi retry; liên quan tới issue #21809. https://github.com/google-gemini/gemini-cli/pull/21794
- #21037 fix(plan): prevent plan truncation in approval dialog — Sửa trực tiếp vấn đề #20716 bằng cách cho phép dialog có chiều cao không giới hạn; cải thiện phê duyệt plan dài. https://github.com/google-gemini/gemini-cli/pull/21037
- #21802 fix(core): handle policy ALLOW for exit_plan_mode — PR sửa bug được tạo để xử lý tình huống policy ALLOW cho exit_plan_mode (fixes #21806). https://github.com/google-gemini/gemini-cli/pull/21802
- #21313 feat(core): implement Stage 1 improvements for webfetch tool — Củng cố xử lý multi-URL, rate-limiting tách biệt, fallback và bảo mật (SSRF hardening). Quan trọng cho agents dùng web_fetch. https://github.com/google-gemini/gemini-cli/pull/21313
- #21439 feat(cli): add active checkpoint tag fallback for /chat save — Khi không chỉ định tag, /chat save dùng active checkpoint; cải thiện quy trình checkpoint. https://github.com/google-gemini/gemini-cli/pull/21439
- #21790 feat(skills): improve async-pr-review workflow and logging — Nâng cấp skill async PR review, tách preflight thành giai đoạn nhỏ, thêm notifications; tốt cho automation CI. https://github.com/google-gemini/gemini-cli/pull/21790
- #21799 Changelog for v0.33.0-preview.9 — PR auto-generated changelog cho release preview. https://github.com/google-gemini/gemini-cli/pull/21799

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Cải thiện UX cho Plan mode: tránh cắt nội dung, xử lý escape/footers, cho phép hiển thị đầy đủ nội dung phê duyệt (#20716, #21743, #21037).
- Agent / Remote Agents / Subagents: xây dựng nền tảng remote agents, UX subagents (epic và nhiều task liên quan) (#20302, #20304, #20886, #20195).
- An toàn khi thực thi lệnh shell: sandboxing native (Windows), cảnh báo policy nguy hiểm, và cải thiện cách chạy shell aliases (#21807, #21596, #21461).
- Trải nghiệm phiên làm việc: resume session hiển thị danh sách khả dụng, checkpoint tag fallback (#21804, #21797, #21439).
- Mạng & độ tin cậy: retryFetchErrors mặc định, xử lý SSE-corruption / classification lỗi để tránh retry loops / fallback billing (#21794, #21702).
- Tối ưu khởi động & hiệu năng: song song hoá network/I/O, tránh await không cần thiết, cache các cuộc gọi mạng/I/O (#21646, #21528, #21519, #21518).
- CLI UI cải tiến: collapsible accordion để giảm verbose output, auto-collapse completed task groups, giảm flicker/cursor issues (#21453, #21454, #20217, #21808).
- Tool hardening (web_fetch): isolation, rate limiting, SSRF protection (#21313).
- Tự phản ánh và đề xuất skills: agent đề xuất tạo/cập nhật skills theo trajectory (#21421).
- Tài liệu & links trên site: sửa links docs để hoạt động trên GitHub và site (#21437).

6) Điểm đau của nhà phát triển (tóm tắt)
- UX phê duyệt / Plan mode: nhiều báo cáo về nội dung bị cắt, double footer, escape handling — ảnh hưởng trực tiếp đến review workflow và là nguồn bug lặp lại.
- Policy <> Scheduler mismatch: khi policy cho phép một thao tác nhưng scheduler skip confirmation, payload phê duyệt null dẫn tới nhánh bị từ chối — cần đồng bộ luồng policy và executor.
- Flicker / cursor issues: khi CLI streaming hoặc thực thi lệnh, input/cursor flicker gây trải nghiệm tệ; cần ổn định terminal rendering (Ink/tui).
- Session/Resume UX: lỗi thông báo không rõ khi resume id sai — gây quên session và thao tác lặp lại; đã có PR cải thiện.
- Network resilience và phân loại lỗi SSE: SSE-corruption dẫn tới phân loại sai lỗi (retry vs fallback) gây retry loop; đã có PR mitigation tạm thời.
- Performance / startup latency: nhiều đề xuất song song hoá, giảm await, cache I/O để cải thiện trải nghiệm phản hồi.
- Safety of automated tools: policy config dễ vô tình cho phép destructive commands; cần cảnh báo và ràng buộc an toàn.
- Cross-platform sandboxing: thiếu isolation mạnh trên Windows được khắc phục bằng PR mới nhưng cần review kỹ.
- Verbosity / scrollback noise: agents quá verbose, yêu cầu accordion/collapse và auto-collapse khi task completed để giữ terminal sạch.
- Docs & site consistency: liên kết docs không đồng nhất giữa GitHub và site, làm trợ giúp/điều hướng kém.

Kết luận ngắn: hiện tại cộng đồng tập trung vào ổn định UX (Plan mode, cursor flicker, session resume), bảo mật khi chạy shell (sandboxing, policy warnings), và nâng cao reliability (retry, SSE handling). Nhiều PR và issue quan trọng đang tiến hành; nếu bạn muốn đóng góp, bắt đầu từ các issue có label help wanted / priority/p1 và những PR liên quan tới UX core hoặc agent/subagent.

Tham khảo nhanh (liên kết):
- Releases / changelog v0.33.0-preview.9: https://github.com/google-gemini/gemini-cli/compare/v0.33.0-preview.8...v0.33.0-preview.9
- Issue & PR đã trích dẫn: sử dụng các link trong nội dung trên (mỗi mục đã kèm link).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

Bản tin cộng đồng GitHub Copilot CLI — 2026-03-10

1) Điểm nổi bật hôm nay
- Phát hành nhánh v1.0.3 (v1.0.3-0 → v1.0.3-2) tập trung vào trải nghiệm CLI: bật alternate screen buffer cho staff, thêm flag --binary-version, và đưa “Extensions” thành tính năng thử nghiệm qua @github/copilot-sdk. Xem release: https://github.com/github/copilot-cli/releases/tag/v1.0.3
- Cộng đồng đang tích cực thảo luận về MCP servers (OAuth, lazy registration), vấn đề cuộn/stutter trong terminal, và các lỗi xác thực/quyền truy cập mô hình trên tài khoản Enterprise.

2) Phát hành phiên bản
- v1.0.3 (đã đẩy nhiều build 1.0.3-0 → 1.0.3-2) — tóm tắt các thay đổi chính:
  - Extensions experimental: cho phép mở rộng bằng @github/copilot-sdk, mời thử viết công cụ/hook tùy chỉnh. (release: https://github.com/github/copilot-cli/releases/tag/v1.0.3)
  - Enable alternate screen buffer mặc định cho staff users.
  - Tài liệu trợ giúp bổ sung các biến môi trường: GH_HOST, HTTP_PROXY, HTTPS_PROXY, NO_COLOR, NO_PROXY.
  - Đọc cấu hình MCP server từ .devc; thêm --binary-version flag để kiểm tra version CLI mà không khởi chạy.
  - Cải tiến hiển thị: background task notifications xuất ở timeline với chi tiết mở rộng; "quit" có thể dùng để thoát CLI.
  - Liên kết release: https://github.com/github/copilot-cli/releases/tag/v1.0.3

3) Issues nóng trong cộng đồng — 10 mục đáng chú ý
- #33 Support OAuth http MCP servers — https://github.com/github/copilot-cli/issues/33  
  Tại sao quan trọng: nhiều MCP servers mới (Figma, Atlassian) dùng OAuth; thiếu hỗ trợ gây trở ngại cho tích hợp doanh nghiệp. (Cập nhật 2026-03-09; 29 bình luận; 👍 103)
- #1161 invalid session id — https://github.com/github/copilot-cli/issues/1161  
  Tại sao quan trọng: lỗi session khiến task bash không chạy, người dùng chuyển sang bên khác; ảnh hưởng trải nghiệm cơ bản. (Cập nhật 2026-03-10; 20 bình luận; 👍 14)
- #1595 Cannot access any model — https://github.com/github/copilot-cli/issues/1595  
  Tại sao quan trọng: người dùng Enterprise có sub hợp lệ nhưng bị "access denied by Copilot policy" khi list models — vấn đề quyền/quyền lực truy cập mô hình; chặn workflow. (Cập nhật 2026-03-09; 12 bình luận; 👍 5)
- #1584 Incessant Scrolling during long running operations — https://github.com/github/copilot-cli/issues/1584  
  Tại sao quan trọng: cuộn liên tục trong khi chạy tác vụ dài làm mất khả năng đọc/điều khiển; rủi ro gây trải nghiệm xấu. (Cập nhật 2026-03-09; 10 bình luận; 👍 14)
- #373 CLI stutters and scrolls up and down after some prompts — https://github.com/github/copilot-cli/issues/373  
  Tại sao quan trọng: triệu chứng tương tự #1584, báo cáo lâu và có nhiều phản hồi; ảnh hưởng đa nền tảng. (Cập nhật 2026-03-09; 9 bình luận; 👍 9)
- #1754 AssertionError during retrospective generation + HTTP/2 GOAWAY (503) — https://github.com/github/copilot-cli/issues/1754  
  Tại sao quan trọng: lỗi bên dưới stack HTTP/connection pooling dẫn tới 503 — ảnh hưởng độ ổn định cho các phiên chạy dài. (Cập nhật 2026-03-09; 6 bình luận; 👍 9)
- #1928 Allow to pause copilot work — https://github.com/github/copilot-cli/issues/1928  
  Tại sao quan trọng: người dùng muốn tạm dừng/điều hướng hoạt động của agent để bổ sung input — tính năng UX quan trọng cho luồng tương tác phức tạp. (Tạo/Cập nhật 2026-03-09; 4 bình luận)
- #768 Option to disable MCP Servers per default — https://github.com/github/copilot-cli/issues/768  
  Tại sao quan trọng: MCP servers tự kết nối có thể tiêu hao token/tài nguyên; nhiều org muốn cấu hình tắt mặc định và bật theo nhu cầu. (Cập nhật 2026-03-09; 3 bình luận; 👍 18)
- #1326 Option to disable all animations — https://github.com/github/copilot-cli/issues/1326  
  Tại sao quan trọng: animations gây nhiễu/đầy CPU hoặc gây khó chịu khi đọc; yêu cầu cải thiện accessibility/option để tắt. (Cập nhật 2026-03-09; 3 bình luận; 👍 13)
- #1842 Scrolling does not work with Tmux — https://github.com/github/copilot-cli/issues/1842  
  Tại sao quan trọng: nhiều dev dùng tmux; không thể cuộn nội dung dài làm giảm khả năng đọc/kiểm tra output. (Cập nhật 2026-03-09; 2 bình luận; 👍 1)

4) Tiến độ PR quan trọng
- Lưu ý: Không có Pull Request mới được cập nhật trong 24 giờ qua. (Pull Requests mới nhất: 0 mục)
- Thay vào đó, các thay đổi vừa được phát hành (v1.0.3) tóm tắt những thay đổi đã merged/đóng góp gần đây:
  - Extensions experimental via @github/copilot-sdk — mở đường cho custom tools và hooks. (release: https://github.com/github/copilot-cli/releases/tag/v1.0.3)
  - Document các biến môi trường GH_HOST, HTTP_PROXY, HTTPS_PROXY, NO_COLOR, NO_PROXY trong help.
  - Read MCP server configuration from .devc — hỗ trợ cấu hình server từ file dev.
  - Thêm --binary-version flag, background task timeline, và cải tiến thoát với 'quit'.
  - Nếu cần danh sách PRs cụ thể thay vì release notes, maintainers có thể cung cấp link changelog/merge commits trong release page: https://github.com/github/copilot-cli/releases/tag/v1.0.3

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Hỗ trợ MCP servers đa dạng & bảo mật: OAuth MCP servers, tùy chọn autoConnect (lazy registration), disable-per-default cho MCP.
- Mở rộng platform: Extensions / SDK cho phép viết tools/hook (@github/copilot-sdk).
- Kiểm soát phiên/agent: pause/step/resume agent trong session, hook khi yêu cầu permission, list/check skills & agents.
- UX terminal: tùy chọn tắt animations, cải thiện hỗ trợ tmux, fix cuộn/stutter, alternate screen buffer behavior.
- Quản trị & vận hành: hiển thị usage/estimated premium requests, chính sách truy cập mô hình cho Enterprise, cách xử lý lỗi HTTP/connection pooling.

6) Điểm đau của nhà phát triển (những vấn đề lặp lại)
- Terminal instability: stuttering/crolling/shaking (issues #1584, #373, #1924) — ảnh hưởng lớn tới trải nghiệm tương tác dài, cần debug rendering/VT handling.
- Tmux & terminal integration: cuộn không hoạt động đúng, MSBuild flooding VT mouse escape (issue #1842, #1937).
- Authentication / authorization: "invalid session id" (#1161), "You are not authorized" / access denied by policy (#1595, #1897) — ảnh hưởng tới mô hình Enterprise và adoption.
- Paste / clipboard problems: Ctrl+V không hoạt động trên Windows, paste đôi lần trên VSCode terminal (#1685, #1934).
- Model & tool call failures: lỗi “array too long” khi gọi model (#509), lỗi connection pooling/503 (#1754).
- Configuration & lifecycle of MCP servers: cần option để tắt/tùy biến kết nối, đọc config từ .devc, và khả năng hot-reload / deferred registration (RFC #1938).
- UX: Plan mode bị bỏ qua, ask_user tool biến mất, yêu cầu API/hook cho permission prompts (#1654, #1898, #1651).

Kết luận nhanh
- Hãy chú ý tới release v1.0.3 (extensions experimental + config/proxy docs). Cộng đồng đang chuyển sang thảo luận sâu về cách tích hợp MCP servers (bảo mật/chi phí) và nhiều vấn đề về trải nghiệm terminal (cuộn, paste, tmux). Nếu bạn đang triển khai Copilot CLI trong team/enterprise, kiểm tra quyền truy cập mô hình và cấu hình MCP server là ưu tiên trước khi nâng cấp.

Tài nguyên
- Repo chính: https://github.com/github/copilot-cli
- Release v1.0.3: https://github.com/github/copilot-cli/releases/tag/v1.0.3

Nếu bạn muốn, tôi có thể: (a) biên soạn changelog chi tiết từ các commit/PR liên quan tới v1.0.3, hoặc (b) đề xuất checklist debug cho các vấn đề terminal/tmux để gửi vào issue templates. Bạn cần gì tiếp theo?

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

Bản tin cộng đồng Kimi Code CLI — 2026-03-10

1) Điểm nổi bật hôm nay
- Phát hành v1.18.0 đã được đẩy lên, bao gồm bản vá cho ACP (Zed @ file references), cải tiến tương thích với Anthropic (chuyền user_id trong metadata) và một số chỉnh sửa nhỏ khác. (PR liên quan: https://github.com/MoonshotAI/kimi-cli/pull/1374)
- Cộng đồng đang thảo luận sôi nổi về các vấn đề mạng/proxy (aiohttp, IPv6, header chứa ký tự đặc biệt) và độ bền của các tool/ACP (JSON parsing, terminal tool attribute), đồng thời nhiều PR tập trung vào trải nghiệm tương tác (session listing, phím tắt kiểu vim, clipboard video).

2) Phát hành phiên bản
- 1.18.0 — tóm tắt chính:
  - LLM: truyền session user_id vào Anthropic thông qua metadata để cải thiện theo dõi phiên (PR: https://github.com/MoonshotAI/kimi-cli/pull/1336).
  - ACP (Zed): hỗ trợ embedded context khi dùng cú pháp @ để tham chiếu file — khắc phục tình trạng Zed không gửi nội dung nhúng (PR: https://github.com/MoonshotAI/kimi-cli/pull/1264; bump release: https://github.com/MoonshotAI/kimi-cli/pull/1374).
  - Sửa lỗi nhỏ (typo, hỗ trợ embedded context, v.v.). Chi tiết release: https://github.com/MoonshotAI/kimi-cli/pull/1374

3) Issues nóng trong cộng đồng (đã chọn tất cả 8 mục mới nhất)
Lưu ý: đây là 8 issue được cập nhật trong 24 giờ qua — tôi liệt kê theo mức độ tác động và phản hồi.

- #1234 Environment variable based proxy is not working due to aiohttp default settings when using `kimi login`
  - Tác giả: @CyCle1024 | Cập nhật: 2026-03-09 | Bình luận: 10 | 👍: 1
  - Tại sao quan trọng: Ảnh hưởng đến người dùng dùng proxy qua biến môi trường khi đăng nhập — rất nhiều môi trường doanh nghiệp/phát triển phụ thuộc vào proxy. Có nhiều thảo luận, cần chỉnh cấu hình aiohttp hoặc tài liệu hướng dẫn.
  - Link: https://github.com/MoonshotAI/kimi-cli/issues/1234

- #1375 File mentions (@) can't find the files
  - Tác giả: @sudokai | Cập nhật: 2026-03-09 | Bình luận: 3
  - Tại sao quan trọng: Liên quan trực tiếp tới trải nghiệm ACP với Zed; nếu @ reference không tìm được file, workflow editor → LLM bị gián đoạn. Có khả năng liên quan tới thay đổi ở 1.18.0.
  - Link: https://github.com/MoonshotAI/kimi-cli/issues/1375

- #1366 Add arguments for cli to select the history session
  - Tác giả: @bakey | Cập nhật: 2026-03-09 | Bình luận: 3
  - Tại sao quan trọng: Trải nghiệm dùng session tiếp tục (resume) hiện chỉ có -C cho session cuối cùng; nhiều dev muốn list/chọn session cũ — UX/CLI enhancement phổ biến.
  - Link: https://github.com/MoonshotAI/kimi-cli/issues/1366

- #1054 Zed ACP is unable to recognize the files I am currently handling. (Closed, cập nhật 2026-03-09)
  - Tác giả: @iGxnon | Cập nhật: 2026-03-09
  - Tại sao quan trọng: Tiền thân của nhiều bug về ACP/Zed; đã có tương tác và dẫn đến sửa (PR liên quan).
  - Link: https://github.com/MoonshotAI/kimi-cli/issues/1054

- #1380 ACP terminal tool fails with 'module acp has no attribute TerminalHandle' in v1.17 & v1.18
  - Tác giả: @gp3t1 | Tạo/Cập nhật: 2026-03-10 | Bình luận: 0
  - Tại sao quan trọng: Lỗi runtime khiến tool terminal ACP không hoạt động — có thể phá vỡ các workflow tương tác trong terminal; cần fix nhanh.
  - Link: https://github.com/MoonshotAI/kimi-cli/issues/1380

- #1378 JSON parsing error when tool call arguments contain control characters
  - Tác giả: @AlejandroEsquivel | Tạo/Cập nhật: 2026-03-09
  - Tại sao quan trọng: Nếu LLM/agent trả về chuỗi chứa ký tự điều khiển, tool caller có thể bị lỗi JSON — rủi ro an toàn/ổn định cho toolchain tự động. Đã có PR đề xuất (PR #1379).
  - Link: https://github.com/MoonshotAI/kimi-cli/issues/1378

- #1371 LLM provider error: Connection error
  - Tác giả: @liushuo1024 | Cập nhật: 2026-03-09
  - Tại sao quan trọng: Lỗi kết nối tới provider (có nhắc tới /login và IPv6) ảnh hưởng trực tiếp khả năng dùng LLM; liên quan tới mạng/IPv6.
  - Link: https://github.com/MoonshotAI/kimi-cli/issues/1371

- #1368 Connection error on Linux when platform.version() contains # character in HTTP header
  - Tác giả: @chenyuchen993-cmyk | Cập nhật: 2026-03-09
  - Tại sao quan trọng: Một ký tự đặc biệt trong header (platform.version()) làm hỏng kết nối HTTP — cho thấy cần kiểm duyệt/escape header do các server hay proxy có thể từ chối header không hợp lệ.
  - Link: https://github.com/MoonshotAI/kimi-cli/issues/1368

4) Tiến độ PR quan trọng (chọn 10)
- #1379 fix: Tool call arguments that contain control characters
  - Tác giả: @AlejandroEsquivel
  - Nội dung: Khắc phục lỗi JSON khi đối số tool chứa ký tự điều khiển; trực tiếp giải quyết issue #1378.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/1379

- #1377 feat: add vim-style j/k keyboard navigation for approval and question…
  - Tác giả: @IAMLEIzZ
  - Nội dung: Thêm điều hướng kiểu vim (j/k) cho các màn hình phê duyệt và câu hỏi tương tác — cải thiện UX cho người dùng terminal power.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/1377

- #1223 fix(llm): allow default_query/custom_headers for Azure Kimi
  - Tác giả: @kingdomseed
  - Nội dung: Cho phép truyền default_query và custom_headers khi khởi tạo OpenAI-compatible clients — quan trọng cho triển khai Azure/compat providers.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/1223

- #1376 feat: add --sessions/--list-sessions CLI options & fix CJK shorten
  - Tác giả: @DRunkPiano114
  - Nội dung: Thêm tùy chọn CLI để liệt kê/chọn session lịch sử tương tác; trực tiếp giải quyết request ở issue #1366. Kèm sửa ngắt chữ cho CJK.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/1376

- #884 chore(deps-dev): bump ruff from 0.14.14 to 0.15.0
  - Tác giả: @dependabot[bot]
  - Nội dung: Cập nhật công cụ linting ruff — duy trì chất lượng mã.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/884

- #1374 chore: bump kimi-cli to 1.18.0, kosong to 0.44.0 (CLOSED)
  - Tác giả: @RealKai42
  - Nội dung: Bump release lên 1.18.0 và đồng bộ kosong; chứa changelog cho release.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/1374

- #1358 fix(llm): avoid implicit reasoning-off for responses
  - Tác giả: @wey-gu
  - Nội dung: Điều chỉnh mapping/flags để tránh tắt reasoning mặc định cho OpenAI Responses; thêm test regression.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/1358

- #1372 fix(web): use platform-specific modifier key for search shortcut (CLOSED)
  - Tác giả: @YoungY620
  - Nội dung: Sửa shortcut Cmd+F / Ctrl+F để chỉ kích hoạt theo platform — giảm nhầm phím trên macOS vs Windows/Linux.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/1372

- #1369 feat: support pasting video files from clipboard via Ctrl-V (CLOSED)
  - Tác giả: @RealKai42
  - Nội dung: Mở rộng chức năng paste clipboard để hỗ trợ video (mp4, mov, mkv…) ngoài ảnh — cải thiện trải nghiệm chia sẻ media.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/1369

- #1055 fix(cli/web): allow binding to all addresses if not lan_only (CLOSED)
  - Tác giả: @tpoisonooo
  - Nội dung: Sửa logic --public/--host/--network để bind host đúng theo flag; quan trọng cho deploy web server và truy cập LAN.
  - Link: https://github.com/MoonshotAI/kimi-cli/pull/1055

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues & PRs)
- Tích hợp ACP/Zed tốt hơn: hỗ trợ embedded context, file @ references ổn định (Issue #1375, #1054; PR #1264).
- Quản lý session trực quan: list/select session lịch sử trong CLI (Issue #1366; PR #1376).
- Độ bền của tool calls: xử lý ký tự điều khiển trong arguments / tránh lỗi JSON (Issue #1378; PR #1379).
- Mạng & proxy: hỗ trợ biến môi trường proxy với aiohttp, IPv6, và xử lý header có ký tự đặc biệt (Issue #1234, #1371, #1368).
- Tùy chỉnh provider/headers: forward default_query/custom_headers cho Azure/OpenAI-compatible (PR #1223).
- Trải nghiệm tương tác: phím tắt kiểu vim, paste media (PR #1377, #1369).
- Web/server deployment flags rõ ràng: --public/--host/--network binding behavior (PR #1055).

6) Điểm đau của nhà phát triển (tóm tắt và khuyến nghị)
- Mạng & proxy gây lỗi phổ biến: nhiều issue báo lỗi kết nối do cấu hình aiohttp, IPv6 hoặc header không hợp lệ.
  - Khuyến nghị: thêm test mạng tích hợp (proxy env, IPv6), sanitize/escape header (platform.version()), và cung cấp troubleshooting docs cho proxy/login.
- ACP/Zed và embedded context không ổn định: nhiều báo cáo về @ file references không lấy được nội dung.
  - Khuyến nghị: tăng coverage test ACP với Zed, log chi tiết khi nhận embedded blocks, và thêm fallback nếu embedded absent.
- Tool call robustness: LLM có thể sinh chuỗi chứa ký tự điều khiển → phá JSON parsing.
  - Khuyến nghị: escape/encode đối số tool trước khi serialize; thêm unit tests cho các ký tự điều khiển và binary-like output.
- UX session/history chưa đủ linh hoạt: cần list/chọn session và UX tốt hơn cho người dùng frequent.
  - Khuyến nghị: merge PR session-list, cập nhật docs và thêm shortcut/alias.
- Phát hành/CI maintenance: nhiều PR dạng bump dependencies — cần duy trì pipeline để tránh regressions khi cập nhật libs.
  - Khuyến nghị: chuẩn hóa release checklist, tăng test matrix cho platform (macOS/Linux/Windows) và edge-cases (CJK shorten).

Kết luận ngắn: bản 1.18.0 mang lại vài sửa quan trọng cho ACP và tương tác LLM, nhưng cộng đồng đang chú ý nhiều tới các lỗi liên quan mạng/proxy và robustness của tool calls. Ưu tiên hiện tại nên là: (1) vá các lỗi kết nối/proxy, (2) làm chắc chức năng ACP/Zed @ references, và (3) hoàn thiện trải nghiệm session/listing cùng các ràng buộc input (escape) để tránh lỗi JSON.

Tài nguyên nhanh
- Repo chính: https://github.com/MoonshotAI/kimi-cli
- Release bump / changelog (1.18.0): https://github.com/MoonshotAI/kimi-cli/pull/1374

Nếu bạn muốn, tôi có thể:
- Soạn checklist test cụ thể để reproducer các issue mạng/ACP.
- Viết mô tả PR mẫu cho sửa lỗi JSON-escaping (kèm test vector).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

OpenCode Community Bulletin — 2026-03-10

1) Điểm nổi bật hôm nay
- Phiên bản v1.2.24 vừa ra với nhiều cải tiến core (TUI workspaces, gửi header beta để hỗ trợ 1M context với GitLab, hỗ trợ Copilot GPT-5.4 xhigh) và vá lỗi giao diện Desktop (cuộn, spinner tiêu đề phiên, sizing sidebar). (Chi tiết trong phần Phát hành.)
- Cộng đồng đang tích cực sửa các lỗi TUI/terminal (tmux, markdown streaming, click/interaction) và xử lý các vấn đề session/worktree để tránh rò rỉ phiên giữa worktrees — nhiều PR/issue liên quan đang tiến triển nhanh.  

2) Phát hành phiên bản
- v1.2.24 — tóm tắt chính:
  - Core: thêm hỗ trợ workspace vào TUI; gửi header beta context-1m-2025-08-07 tới GitLab để bật cửa sổ ngữ cảnh 1M; thêm hỗ trợ Copilot GPT-5.4 xhigh (contributor: @Krule).  
  - Desktop: vá jitter/loop khi cuộn, sửa hiển thị spinner tiêu đề session, sửa sizing container sidebar để tránh tràn nội dung, loại bỏ animation panel review.  
  - Link: https://github.com/anomalyco/opencode/releases/tag/v1.2.24

3) Issues nóng trong cộng đồng (10 mục, vì sao quan trọng & phản ứng)
- #2072 Support for Cursor? — https://github.com/anomalyco/opencode/issues/2072  
  - Tại sao quan trọng: Cursor CLI đang phổ biến; hỗ trợ thêm provider/CLI mới mở rộng độ tương thích và trải nghiệm người dùng.  
  - Phản ứng: Rất nhiều tương tác (57 bình luận, 127 👍) — cộng đồng rất quan tâm tích hợp provider bên thứ ba.

- #16470 [bug, core] Code output unreadable in light mode — https://github.com/anomalyco/opencode/issues/16470  
  - Tại sao quan trọng: render code không đọc được phá vỡ trải nghiệm dev, ảnh hưởng trực tiếp tới khả năng review/gỡ lỗi.  
  - Phản ứng: Báo cáo kèm ảnh chụp, 13 bình luận — cần fix giao diện màu ngay.

- #8832 [bug] opencode not respecting permissions — https://github.com/anomalyco/opencode/issues/8832  
  - Tại sao quan trọng: cấu hình quyền (opencode.json) không được tôn trọng là rủi ro bảo mật/khả năng kiểm soát sandbox.  
  - Phản ứng: 12 bình luận, nhiều ví dụ config — issue có tính priority cao.

- #16351 [bug, opentui] TUI broken in tmux after 1.2.17 (found root cause) — https://github.com/anomalyco/opencode/issues/16351  
  - Tại sao quan trọng: nhiều dev chạy trong tmux; sự cố phá vỡ input/shortcuts làm giảm khả dụng CLI.  
  - Phản ứng: 11 bình luận, cập nhật gần đây báo đã tìm ra nguyên nhân.

- #12472 Native Claude Code hooks compatibility (PreToolUse, PostToolUse, Stop) — https://github.com/anomalyco/opencode/issues/12472  
  - Tại sao quan trọng: tương thích hooks của Claude Code cho phép tích hợp sâu hơn với workflows hiện có (PreToolUse/PostToolUse/Stop).  
  - Phản ứng: 9 bình luận; issue liên quan trực tiếp đến PRs mới thêm hook.

- #11141 LM Studio local 7B model issue "Cannot truncate prompt ..." — https://github.com/anomalyco/opencode/issues/11141  
  - Tại sao quan trọng: lỗi cắt prompt với local LLM (context size mismatch) ngăn dùng mô hình on‑device — tác động tới người dùng local-first.  
  - Phản ứng: 9 bình luận, nhiều người gặp lỗi tương tự.

- #4704 [bug, opentui, windows] /undo and /timeline undo does not revert file edits — https://github.com/anomalyco/opencode/issues/4704  
  - Tại sao quan trọng: tính năng undo không hoàn tác sửa file là rủi ro dữ liệu; ảnh hưởng workflow sửa/giao tiếp với git.  
  - Phản ứng: 8 bình luận, 9 👍 — issue có tác động trực tiếp tới quy trình làm việc.

- #12408 [bug, windows] ERROR service=models.dev unknown certificate verification error — https://github.com/anomalyco/opencode/issues/12408  
  - Tại sao quan trọng: lỗi TLS/CA trên Windows ngăn fetch models.dev, chặn nhiều người dùng Windows.  
  - Phản ứng: 7 bình luận, đang cần chẩn đoán môi trường/CA.

- #16281 [bug, core] OpenAI ChatGPT Pro/Plus browser login fails Token exchange failed: 403 on macOS — https://github.com/anomalyco/opencode/issues/16281  
  - Tại sao quan trọng: auth flow thất bại với ChatGPT Pro/Plus ảnh hưởng trải nghiệm đăng nhập/credential; nhiều người dùng phụ thuộc đăng nhập qua browser.  
  - Phản ứng: 7 bình luận, báo lỗi token exchange.

- #16697 [core] Multiple memory leaks cause unbounded RAM growth during extended TUI usage — https://github.com/anomalyco/opencode/issues/16697  
  - Tại sao quan trọng: memory leak gây tăng RAM không giới hạn khi dùng lâu — vấn đề nghiêm trọng cho người dùng TUI.  
  - Phản ứng: 6 bình luận, nhiều PR nhỏ đang cố gắng giải quyết từng nguồn rò rỉ.

4) Tiến độ PR quan trọng (10 PR, tính năng / sửa lỗi)
- PR #16825 refactor: lsp server and core improvements — https://github.com/anomalyco/opencode/pull/16825  
  - Nội dung: refactor LSP server và cải tiến core, tối ưu cấu hình và provider/plugin utilities — cơ sở cho tính ổn định LSP.

- PR #16827 fix(session): scope session list to current directory to prevent cross-worktree leakage — https://github.com/anomalyco/opencode/pull/16827  
  - Nội dung: sửa lỗi làm session từ worktree khác hiển thị chồng chéo — ngăn rò rỉ session khi dùng nhiều worktree (closes #15678).

- PR #16598 feat: add session.stopping hook for plugins — https://github.com/anomalyco/opencode/pull/16598  
  - Nội dung: thêm hook session.stopping để plugin có thể xử lý cleanup/Stop — liên quan tới yêu cầu Claude Stop hook.

- PR #15487 core: make account login upgrades safe while adding multi-account workspace auth — https://github.com/anomalyco/opencode/pull/15487  
  - Nội dung: thêm device-flow sign-in, hỗ trợ nhiều tài khoản, workspace-aware auth — cải thiện UX quản lý credentials.

- PR #16814 fix(opencode): run migrateFromGlobal after project upsert and on every startup — https://github.com/anomalyco/opencode/pull/16814  
  - Nội dung: sửa migrateFromGlobal để tránh sessions bị gán sai vào project global — giải quyết session/worktree leakage (closes #16812, #15678).

- PR #16817 fix(zen): emit cost chunk in client-facing format, not upstream format — https://github.com/anomalyco/opencode/pull/16817  
  - Nội dung: khi stream SSE, phần "cost" giờ phát theo định dạng mà client yêu cầu (OpenAI-compatible), không phụ thuộc upstream provider — quan trọng cho billing UI và client compatibility.

- PR #16803 [beta, Vouched] refactor(server): replace Bun serve with Hono node adapters — https://github.com/anomalyco/opencode/pull/16803  
  - Nội dung: chuyển runtime server từ Bun sang @hono/node-server/ws, đồng bộ hóa PTY/WS behavior và sửa một số vấn đề kết nối — ảnh hưởng đến deploy/runtime stability.

- PR #16811 feat(tui): mention popup quick-open shortcuts for files and directories — https://github.com/anomalyco/opencode/pull/16811  
  - Nội dung: thêm shortcut để open file/dir từ popup @mention — cải thiện luồng làm việc khi điều hướng file.

- PR #16804 feat: add plugin sidebar contributions — https://github.com/anomalyco/opencode/pull/16804  
  - Nội dung: API cho plugin đóng góp item vào sidebar web — mở rộng khả năng tích hợp UI cho plugin.

- PR #16263 feat(app): support slash commands mid-prompt — https://github.com/anomalyco/opencode/pull/16263  
  - Nội dung: cho phép gõ slash commands (/undo, /new, custom) ở giữa prompt thay vì chỉ đầu prompt — cải thiện trải nghiệm nhập liệu.

5) Xu hướng yêu cầu tính năng (tóm tắt các hướng chính)
- Mở rộng provider & CLI hỗ trợ: yêu cầu tích hợp Cursor CLI, Augment, thêm support cho nhiều mô hình (Bedrock regions) — mục tiêu: tăng độ tương thích provider. (See #2072, #10216, #16747)  
- Tăng cường plugin API / UI extensibility: plugin sidebar, MCP Apps iframe UIs, SDK cho rendering TUI, plugin đóng góp sidebar, quick-open từ mention — cộng đồng muốn mở rộng hệ sinh thái plugin/UI. (See #16804, #15926, #16821, #16811)  
- TUI/UX: clickable links, quick-open, favorite model keybinds, slash commands mid-prompt, fix streaming/render bugs — nhiều request tập trung vào tương tác terminal. (See #1168, #16802, #16811, #16263, #13854)  
- Auth & multi-account/workspace: multi-account device flow, workspace-aware auth, session scoping — cần quản lý credential & session an toàn hơn. (See PR #15487, #16827, #16814)  
- Claude / tool hooks: hỗ trợ PreToolUse/PostToolUse/Stop hooks để tương thích với existing Claude Code workflows. (See #12472)  
- Local/model issues: giảm lỗi prompt truncation với local LLMs, memory usage, and system prompt handling for some models (Qwen3.5). (See #11141, #16697, #15059)

6) Điểm đau của nhà phát triển (vấn đề lặp lại / ưu tiên cao)
- TUI reliability: breakages inside tmux, markdown/code streaming state causing truncated rendering, unclickable UI elements — ảnh hưởng hàng ngày cho người dùng terminal. (See #16351, #13854, #16796, #1168)  
- Session / worktree leakage: sessions từ nhiều worktrees chia sẻ project/global gây nhầm lẫn — đang được giải quyết bằng PRs migrate/session scoping. (See #16827, #16814)  
- Permissions & sandboxing: config permission không được tôn trọng tạo rủi ro bảo mật; cần kiểm soát command-level permissions rõ ràng. (See #8832)  
- Authentication & platform-specific errors: browser OAuth token exchange lỗi (macOS), Windows TLS certificate issues, Google service-account scopes — ảnh hưởng onboarding. (See #16281, #12408, #15109)  
- Memory leaks & long-running stability: unbounded RAM growth trong TUI khi dùng lâu — cần profiling và fixes. (See #16697)  
- Local model compatibility: prompt truncation errors and system-prompt duplication làm local LLM usage khó ổn định. (See #11141, #15059)  
- Tool output formatting: tool-call XML rendered escaped instead of human-readable, gây khó khăn khi đọc/triage output. (See #16734)  
- Undo / file revert reliability: /undo không revert file edits đúng, rủi ro mất dữ liệu. (See #4704)

Kết luận ngắn gọn
- Trong 24 giờ qua cộng đồng tập trung song song trên hai mặt: cải thiện trải nghiệm TUI/desktop (fix giao diện, behavior) và giải quyết vấn đề session/auth/multi-account. Nhiều PR khung (hook, plugin sidebar, server adapter) đang mở — dự báo vài tuần tới sẽ thấy nhiều fixes hợp nhất.  

Tài nguyên nhanh (repo chính)
- Github repo: https://github.com/anomalyco/opencode

Nếu bạn muốn, tôi có thể:
- Lọc một báo cáo riêng cho các vấn đề liên quan Windows hoặc tmux; hoặc
- Tạo danh sách PR cần review nếu bạn là maintainer.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

Bản tin cộng đồng Qwen Code — 2026-03-10

1) Điểm nổi bật hôm nay
- v0.12.0 đã được phát hành (xem thay đổi chính: sửa lỗi CRLF trên Windows và bổ sung tabWidth cho tô màu mã). Đồng thời có PR chuẩn bị bump lên v0.12.1. (Repo: https://github.com/QwenLM/qwen-code)
- Một số lỗi trải nghiệm đầu vào CLI (không gõ được phím Space / spacebar) và hành vi “YOLO” mở diff trong VS Code đang được cộng đồng phản ánh mạnh và có PR sửa chữa đang mở.

2) Phát hành phiên bản
- v0.12.0 — Release v0.12.0 (tổng quan)
  - Fix (Windows): chuẩn hóa line endings/CRLF để tránh bỏ qua subagents/skills/plug-in (PR liên quan: https://github.com/QwenLM/qwen-code/pull/1890).
  - Fix(cli) / Feature: parse markdown frontmatter trên Windows (CRLF/BOM) và thêm tabWidth cho code highlighting + thay tab bằng spaces trong CodeColorizer (xem thay đổi trong bản phát hành).
  - Chuẩn bị bump lên v0.12.1 (PR: https://github.com/QwenLM/qwen-code/pull/2226).
  - Link release: https://github.com/QwenLM/qwen-code/releases/tag/v0.12.0

3) Issues nóng trong cộng đồng (10 mục) — vì sao quan trọng & phản ứng
- #2101 space button issue (open) — https://github.com/QwenLM/qwen-code/issues/2101  
  Vì sao quan trọng: Lỗi khiến người dùng không thể nhập khi nhấn phím Space trong IDE/CLI; ảnh hưởng trực tiếp đến trải nghiệm gõ lệnh. Cộng đồng đang thảo luận (9 bình luận), upvote 5.
- #2198 Bug: Cannot type spacebar character in CLI input (open, cập nhật 2026-03-10) — https://github.com/QwenLM/qwen-code/issues/2198  
  Vì sao quan trọng: Báo cáo độc lập khác của cùng triệu chứng trong CLI; cho thấy đây là vấn đề lớn, tái hiện trên nhiều nền tảng. Cần ưu tiên debug input handling ở tầng TUI.
- #1922 [BUG] The edit tool is unable to edit files in the latest version (open) — https://github.com/QwenLM/qwen-code/issues/1922  
  Vì sao quan trọng: Công cụ edit không sửa được file Python khi gọi tool — làm gãy workflow sửa mã tự động; ảnh hưởng đến độ tin cậy của agent-based edits.
- #2191 Error during web search: DashScope 429 Too Many Requests (open) — https://github.com/QwenLM/qwen-code/issues/2191  
  Vì sao quan trọng: Throttling/429 từ provider bên thứ ba làm gián đoạn tính năng web search; ảnh hưởng tới tích hợp công cụ bên ngoài và trải nghiệm làm việc thực tế.
- #2222 shell fails with quoted text when executed via ! shell (open) — https://github.com/QwenLM/qwen-code/issues/2222  
  Vì sao quan trọng: Lỗi xử lý quotes khi gọi shell qua tool gây thất bại lệnh; ảnh hưởng tới tính khả chuyển của lệnh shell được phát sinh bởi agent.
- #2206 yolo 模式下仍然会打开 VSCode diff 编辑器 (open) — https://github.com/QwenLM/qwen-code/issues/2206  
  Vì sao quan trọng: YOLO/auto-accept mode mong muốn áp dụng sửa đổi tự động nhưng vẫn bật diff view — làm lệch kỳ vọng UX và gây phiền cho người dùng auto-apply.
- #2210 Bug: Accidental tab switch to Plan mode interrupts YOLO/auto-accept-edits (open) — https://github.com/QwenLM/qwen-code/issues/2210  
  Vì sao quan trọng: Phím Tab vô tình chuyển mode làm gián đoạn luồng AI streaming & edits — rủi ro khi dùng chế độ tự động (YOLO).
- #2223 ⚠ High memory usage detected: 7.83 GB (open) — https://github.com/QwenLM/qwen-code/issues/2223  
  Vì sao quan trọng: Báo cáo bộ nhớ cao có thể dẫn tới crash; quan trọng cho người dùng trên máy có tài nguyên hạn chế và cho testing stability.
- #2216 feat: Add skill filtering with allowed/excluded lists (open) — https://github.com/QwenLM/qwen-code/issues/2216  
  Vì sao quan trọng: Yêu cầu kiểm soát kỹ năng (skills) được kích hoạt—quan trọng cho security, auditability và cấu hình workspace.
- #795 I hope to contribute a "qwen code --output-format json/stream-json" (closed but đáng chú ý) — https://github.com/QwenLM/qwen-code/issues/795  
  Vì sao quan trọng: Nhu cầu output machine-friendly (JSON/stream-json) để tích hợp chương trình. Mặc dù Closed, đề xuất phản ánh nhu cầu tích hợp mạnh từ cộng đồng.

4) Tiến độ PR quan trọng (10 PR) — tính năng / sửa lỗi
- #2226 chore(release): bump version to 0.12.1 — https://github.com/QwenLM/qwen-code/pull/2226  
  Mục đích: Chuẩn bị phát hành 0.12.1 (version bump across monorepo).
- #2221 Skip openDiff in YOLO mode to prevent VS Code editor opening — https://github.com/QwenLM/qwen-code/pull/2221  
  Mục đích: Fix issue #2206 — khi YOLO mode bật, bỏ qua mở diff để tránh bật VS Code diff view không mong muốn.
- #2211 fix(cli): block Tab key during AI streaming to prevent mode switch interruption — https://github.com/QwenLM/qwen-code/pull/2211  
  Mục đích: Fix #2210 — chặn Tab trong lúc AI streaming để tránh chuyển nhầm và hủy bỏ response.
- #2202 feat: support skills in .agents directory and other provider directories — https://github.com/QwenLM/qwen-code/pull/2202  
  Mục đích: Mở rộng nơi load skills (ví dụ .agent/skills, .claude/skills) để tăng tính tương thích với cấu trúc dự án khác.
- #2220 Refactor model provider configuration to providerId-keyed structure (V4) — https://github.com/QwenLM/qwen-code/pull/2220  
  Mục đích: Đổi cấu trúc settings để quản lý provider bằng providerId; thêm flag --providerId và migration V3→V4.
- #1912 feat(arena): Add agent collaboration arena with multi-model competitive execution — https://github.com/QwenLM/qwen-code/pull/1912  
  Mục đích: Chạy cùng task song song trên nhiều model (worktrees) để so sánh kết quả — hữu ích cho benchmarking / chọn model.
- #2203 feat(hooks): Implement 10 core event hooks for session lifecycle and tool execution — https://github.com/QwenLM/qwen-code/pull/2203  
  Mục đích: Thêm hệ thống hooks mở rộng cho session, tool execution, subagent—tăng khả năng mở rộng và custom integration.
- #2188 feat(vscode-ide-companion): add sidebar view and multi-position chat layout — https://github.com/QwenLM/qwen-code/pull/2188  
  Mục đích: Bổ sung Activity Bar sidebar và hỗ trợ multi-position chat webview trong VS Code — cải thiện UX companion.
- #2219 fix: clean up MCP server display and add CONCAT merge strategy — https://github.com/QwenLM/qwen-code/pull/2219  
  Mục đích: Cải thiện MCP (Model Context Protocol) config display và bổ sung merge strategy cho allowed/excluded lists.
- #2205 fix: respect NO_PROXY environment variable for proxy bypass — https://github.com/QwenLM/qwen-code/pull/2205  
  Mục đích: Hỗ trợ NO_PROXY/no_proxy để bypass proxy cho host nội bộ — rất quan trọng cho môi trường corporate.

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Tính năng tích hợp/automation-friendly output: yêu cầu --output-format json/stream-json để tích hợp chương trình (#795).
- Quản lý và lọc skills: whitelist/blacklist skill để kiểm soát scope agent trong project (#2216, PR #2202).
- Multi-model / benchmarking: arena để chạy nhiều model song song để so sánh kết quả (#1912).
- Hooks & extension points: event hooks cho lifecycle/tool execution để custom và audit (#2203).
- Cấu hình provider tốt hơn: providerId-keyed settings và migration để quản lý nhiều provider (#2220).
- IDE/UX: cải thiện companion view (sidebar, multi-position) và behavior YOLO/auto-accept (#2188, #2221).
- Enterprise networking: hỗ trợ NO_PROXY và proxy bypass để hoạt động trong môi trường corp (#2205).
- CLI/TUI reliability: xử lý phím, streaming interrupt, shell quoting, và persistent model selection (#2211, #2222, #1222).
- Context management: compression / context window improvements (PRs nhỏ và feedback 0.12.0).
- Stability/observability: memory usage alerts, auto-termination errors, and clearer bug reports (#2223, #2209).

6) Điểm đau của nhà phát triển (tóm tắt)
- Input & TUI reliability: lỗi không gõ được Space, Tab gây đổi mode, hoặc chặn trong lúc AI streaming — làm gián đoạn việc tương tác với CLI/TUI (Issues #2101, #2198, #2210; PR #2211).
- Edit tool / auto-edit regressions: edit tools thất bại khi thay đổi file (ví dụ Python) khiến workflow tự động không tin cậy (Issue #1922).
- YOLO / auto-apply UX mismatch: chế độ tự động vẫn bật diff view trong VS Code — làm giảm tính “YOLO” (Issue #2206; PR #2221).
- Windows line endings và BOM: CRLF/BOM gây ignore subagents/skills — đã được sửa trong 0.12.0 nhưng vẫn cần kiểm thử rộng (PR #1890).
- Quoting & shell execution: lỗi khi truyền chuỗi có dấu nháy tới shell tool gây thất bại lệnh (Issue #2222).
- Truy cập mạng / proxy / throttling: NO_PROXY cần được tôn trọng; web search providers bị 429; ảnh hưởng đến tích hợp công cụ (Issues #2191, #2217; PR #2205).
- Cấu hình provider & persistency: model selection/persistence và thiết lập provider phức tạp — đề nghị refactor cấu trúc settings (Issue #1222; PR #2220).
- Tài nguyên & ổn định: báo cáo tiêu tốn bộ nhớ cao và lỗi terminate/“-32603” cần theo dõi (Issues #2223, #2209).

Kết luận ngắn gọn
- Tác động gần đây chủ yếu liên quan tới cải thiện trải nghiệm CLI/TUI (fix Tab/Space/YOLO), quản lý skills/provider và mở rộng khả năng tích hợp (hooks, JSON output, arena). Nhiều PR quan trọng đang chờ merge — theo dõi PR #2221, #2211, #2220, #2203 để biết khi nào các fix/feature này được phát hành trong 0.12.x.  
- Theo dõi repo để cập nhật bản vá 0.12.1: https://github.com/QwenLM/qwen-code

Một số link nhanh:
- Repo: https://github.com/QwenLM/qwen-code
- Releases: https://github.com/QwenLM/qwen-code/releases
- Các Issue/PR được nhắc trong bản tin: liên kết đã chèn theo từng mục ở trên.

Nếu bạn muốn, tôi có thể:
- Tổng hợp các cách tái hiện lỗi Space/Tab để gửi PR debug, hoặc
- Viết checklist kiểm thử (Windows/Unix/IDE/Headless) cho team QA để cover các regressions vừa xuất hiện.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*