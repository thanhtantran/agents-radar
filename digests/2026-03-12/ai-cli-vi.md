# Bản tin Cộng đồng Công cụ AI CLI 2026-03-12

> Thời gian tạo: 2026-03-12 01:59 UTC | Công cụ: 7

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

Dưới đây là báo cáo so sánh ngắn gọn, chuyên nghiệp về trạng thái và xu hướng của các công cụ AI CLI chính (dựa trên bản tin cộng đồng 2026-03-12 bạn cung cấp).

1) Tổng quan hệ sinh thái (3–5 câu)
- Hệ sinh thái AI CLI đang trưởng thành nhanh nhưng phân hoá theo hai trục chính: độ bền/observability (memory leaks, heapdump, telemetry) và trải nghiệm tương tác (TUI/terminal, session continuity, compression).  
- Nhiều dự án tập trung vào “hậu trường” kỹ thuật: chẩn đoán rò rỉ bộ nhớ, sandbox/permission để tránh hành vi agent nguy hiểm, và cải thiện resilience khi dùng nhiều provider/ACP/MCP.  
- Đồng thời, UX/terminal (phím, alt‑screen, paste/IME), session persistence và auto‑compaction/history management là các điểm tiếp xúc người dùng tạo áp lực lớn lên roadmap.  
- Kết quả: các nhóm dev phải cân bằng giữa hotfix (stability/security) và cải tiến UX/agent features để giữ user adoption trong môi trường production.

2) So sánh mức độ hoạt động (số liệu trích từ bản tin hôm nay)
Lưu ý: con số là lượng mục nổi bật/PR nêu trong bản tin (chứ không phải tổng trong repo).

- Claude Code
  - Issues (nổi bật): 10
  - PRs (nổi bật): 10
  - Release: v2.1.74 (mới, diagnostic + autoMemoryDirectory; có hotfix memory leak)

- Gemini CLI
  - Issues (nổi bật): 10
  - PRs (nổi bật): 10
  - Release: v0.34.0-preview.0 (preview) + v0.33.0

- GitHub Copilot CLI
  - Issues (nổi bật): 10
  - PRs (cập nhật 24h): 2 (cả repo có nhiều PR/PRs khác, nhưng 2 được đề cập hôm nay)
  - Release: v1.0.4 (observability/OpenTelemetry, shell RPC)

- Kimi Code CLI
  - Issues (nổi bật): ~8
  - PRs (nổi bật): 10
  - Release: 1.20.0

- OpenCode
  - Issues (nổi bật): 10
  - PRs (nổi bật): 10
  - Release: Không có release mới trong 24h

- Qwen Code
  - Issues (nổi bật): 10
  - PRs (nổi bật): 10
  - Release: v0.12.1 (stable/preview) + nightly (fix /export session)

- OpenAI Codex
  - Summary status: Không có tóm tắt (thất bại) — trạng thái hôm nay: không xác định trong bản tin này

3) Hướng tính năng chung (xuất hiện ở nhiều cộng đồng; công cụ liên quan)
- Memory diagnostics & auto‑cleanup (Claude Code, OpenCode, OpenCode/Opencode, báo cáo mem leak trên nhiều repo): yêu cầu heapdump, arrayBuffer/native addon diagnostics, autoMemoryDirectory.  
- Sandboxing / granular permission rules (Claude Code, Gemini, Copilot CLI, Qwen): rule‑based permissions, excludedCommands, sandbox bypass issues, sandbox on Windows/macOS.  
- Session continuity & compaction/compression (Gemini, Kimi, OpenCode): long‑running sessions cần better compression, auto‑distillation, resume/restore chính xác.  
- Terminal / TUI robustness (Copilot CLI, Qwen, OpenCode, Gemini): arrow keys, CSI sequences, alt‑screen, flicker, IME submit key, paste image.  
- File/ACP/MCP integration & fallback (Qwen, Kimi, Claude, Copilot): ACP path validation, fallback to local FS, OAuth/MCP remote flows, redirect handling.  
- Observability / telemetry (Copilot CLI, Claude Code): OpenTelemetry, tracing of LLM calls & tool executions để debug agent behavior.  
- Plugin/hook integrity & trust model (Claude, OpenCode): plugin trust store, hook‑integrity guards to prevent agents from weakening safety rules.

4) Phân tích khác biệt hóa (trọng tâm, người dùng mục tiêu, hướng kỹ thuật)
- Claude Code: trọng tâm kỹ thuật mạnh về diagnostics, memory safety và plugin‑security. Đối tượng chính: deploy của tổ chức/production servers (quan tâm stability, sandboxing, data‑loss). Kỹ thuật nổi bật: debug native addons/streaming leaks, auto‑memory config.  
- Gemini CLI (Google): nhấn vào session continuity, compression và policy/sandbox engine; phù hợp cho người dùng cần long‑running agents và enterprise policy control. Kỹ thuật: auto‑distillation, native Windows sandboxing, subagent isolation.  
- GitHub Copilot CLI: tập trung UX terminal/TUI và observability; đối tượng: developers dùng interactive flows (neovim, Windows Terminal), enterprise customers cần MCP/OAuth. Kỹ thuật: OpenTelemetry, shell RPC, adaptive color engine.  
- Kimi Code CLI: chú trọng web UI, compaction/media handling và session management; người dùng: teams sử dụng web frontend + CLI. Kỹ thuật: E2E tests cho web, compaction media filters.  
- OpenCode: tập trung UX TUI (vim motions, keybindings), MCP/stdio interoperability, hot‑reload; phù hợp cho power users muốn tight TUI experience. Kỹ thuật: TUI refinements, MCP server via stdio.  
- Qwen Code: tập trung cao vào ACP/file ops, terminal input edge‑cases và permission rules; target: VS Code users và multi‑provider setups. Kỹ thuật: ACP error mapping, path validation, terminal CSI fixes.

5) Động lực & độ trưởng thành của cộng đồng
- Hoạt động nhất / lặp nhanh: Claude Code, Gemini và GitHub Copilot CLI thể hiện nhịp độ hoạt động cao (nhiều issue nóng, release/preview và PRs). Họ vừa phát hành bản vá/preview, vừa có nhiều thread triage — dấu hiệu cộng đồng lớn và/hoặc người dùng enterprise.  
- Nhanh triển khai fix/feature: Copilot CLI và Qwen Code liên tục đẩy release/patches liên quan UX/terminal và ACP; Kimi & OpenCode đang tích cực trên PR nhưng release cadence ít dày hơn.  
- Cộng đồng ổn định nhưng ít release: OpenCode nhiều discussion/PR nhưng không có release mới 24h — tập trung vào refining UX và PR review.  
- Không xác định: OpenAI Codex (không có tóm tắt hôm nay) — cần kiểm tra trực tiếp repo để đánh giá hoạt động.

6) Tín hiệu xu hướng & khuyến nghị cho nhà phát triển/ra quyết định
- Tín hiệu ngành:
  - “Stability first”: rò rỉ bộ nhớ và compaction failures đang là vấn đề chung — ưu tiên observability (heapdump, telemetry) và chiến lược fallback.  
  - Agent safety & permission models: plugin/hook integrity và rule‑based permissions trở thành yêu cầu bảo mật bắt buộc.  
  - Session engineering: long‑running context cần better compression/auto‑distillation và resume semantics để tránh mất intent.  
  - Terminal surface is hard: nhiều dự án vẫn vật lộn với IME/CSI/alt‑screen trên Windows/macOS/Linux — cần test ma trận terminal × OS.  
  - Provider interoperability: ACP/MCP/OAuth edge cases (redirects, scopes, fallback) cần chuẩn hóa và retry/backoff.  
- Khuyến nghị hành động (ngắn, ưu tiên cho dev managers):
  - Ưu tiên giám sát mem/rò rỉ: thêm heapdump hooks, expose memory metrics, và yêu cầu reproducible repro cho mem leak bugs.  
  - Thiết kế permission model: áp dụng rule‑based tool whitelists, hook‑integrity guard và giảm quyền mặc định cho agentic actions.  
  - Đầu tư vào session persistence & compression: automated distillation, deterministic resumptions, và e2e tests cho long sessions.  
  - Tạo test matrix cho terminals: bao phủ Windows Terminal, PowerShell, neovim, Kitty, VS Code integrated terminals.  
  - Chuẩn hoá auth fallbacks: refresh_token flows, offline fallback, và rõ ràng policy cho remote‑control/OAuth in CI.  
  - Cấp phát resources cho observability: OpenTelemetry traces + telemetry schemas (tool calls, LLM IDs, session IDs).

Kết luận ngắn gọn
- Nếu bạn phải ưu tiên cho roadmap hoặc allocate engineering effort: đặt stability (mem leak, compaction, permission/sandbox) lên hàng đầu; song song đó đầu tư test/UX cho terminal và session handling vì chúng ảnh hưởng trực tiếp adoption.  
- Theo dõi repos có release/preview nhanh (Claude, Gemini, Copilot) để áp dụng hotfixs và học pattern xử lý mem leak / sandboxing; dùng các PR reference (hook‑integrity, OpenTelemetry, autoMemoryDirectory) làm checklist triển khai tương tự trong sản phẩm của bạn.

Nếu muốn, tôi có thể:
- Biên soạn checklist debugging (heapdump, native addon repro steps) cho đội vận hành, hoặc  
- Soạn ma trận test terminals × OS để giảm regressions TUI.

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nổi bật Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

Báo cáo điểm nổi bật — cộng đồng Claude Code Skills (dữ liệu đến 2026-03-12)

Tóm tắt ngắn: tập trung mạnh vào: trạng thái bền vững của ngữ cảnh (memory / tasks / knowledge), công cụ chất lượng dành cho người phát triển, chất lượng tài liệu/đầu ra (typography, ODT), và các vấn đề an toàn/độ tin cậy của nền tảng.

1) Xếp hạng Skills hot (5–8 PR được cộng đồng thảo luận/nổi bật nhất)
- #514 — Add document-typography skill — https://github.com/anthropics/skills/pull/514  
  Chức năng: kiểm soát chất lượng kiểu chữ trong tài liệu do AI tạo (orphan/widow, căn chỉnh đánh số).  
  Điểm thảo luận: giải quyết vấn đề trải nghiệm đầu ra tài liệu phổ biến; được xem là cần thiết cho sản xuất tài liệu chuyên nghiệp.  
  Trạng thái: OPEN

- #210 — Improve frontend-design skill clarity and actionability — https://github.com/anthropics/skills/pull/210  
  Chức năng: làm rõ và làm cho skill frontend-design dễ hành động hơn trong hội thoại Claude.  
  Điểm thảo luận: tối ưu hoá hướng dẫn để Claude thực hiện trong một phiên; liên quan tới hiệu quả token và tính thực thi.  
  Trạng thái: OPEN

- #83 — Add skill-quality-analyzer and skill-security-analyzer to marketplace — https://github.com/anthropics/skills/pull/83  
  Chức năng: hai meta-skill đánh giá chất lượng và bảo mật cho Skills (đa chiều: docs, tests, security…).  
  Điểm thảo luận: cộng đồng cần công cụ tự động kiểm tra chất lượng/ân toàn cho skills trước khi triển khai.  
  Trạng thái: OPEN

- #154 — Add shodh-memory skill: persistent context for AI agents — https://github.com/anthropics/skills/pull/154  
  Chức năng: hệ thống bộ nhớ bền vững cho agent, hướng dẫn khi gọi proactive_context và cấu trúc ghi nhớ.  
  Điểm thảo luận: giải quyết hạn chế Claude mất ngữ cảnh giữa các phiên — là nhu cầu được nhiều người nêu.  
  Trạng thái: OPEN

- #522 — Add plan-task skill — https://github.com/anthropics/skills/pull/522  
  Chức năng: lưu trữ kế hoạch và tiến độ tác vụ (Markdown trong .claude/tasks/) để phục hồi giữa các phiên; hỗ trợ chế độ Git.  
  Điểm thảo luận: cần thiết cho quy trình nhiều bước và liên tục; cải thiện năng suất làm việc liên phiên.  
  Trạng thái: OPEN

- #521 — Add record-knowledge skill — https://github.com/anthropics/skills/pull/521  
  Chức năng: ghi nhận tri thức/ghi chú tái sử dụng dưới dạng Markdown trong .claude/knowledge/.  
  Điểm thảo luận: complement cho memory/plan — cho phép chia sẻ kiến thức nội bộ và tránh lặp lại.  
  Trạng thái: OPEN

- #486 — Add ODT skill — OpenDocument text creation and template filling — https://github.com/anthropics/skills/pull/486  
  Chức năng: tạo/điền mẫu .odt và chuyển ODT → HTML; nhắm tới tích hợp với LibreOffice/Google Docs.  
  Điểm thảo luận: nhu cầu xuất tài liệu dạng công nghiệp, tương thích chuẩn ISO OpenDocument.  
  Trạng thái: OPEN

2) Xu hướng nhu cầu cộng đồng (từ Issues)
- Bộ nhớ và tính bền vững ngữ cảnh: nhiều yêu cầu về persistent memory / knowledge / plan để Claude tiếp tục công việc giữa các phiên (liên quan PR #154, #522, #521; issue ví dụ: #62 https://github.com/anthropics/skills/issues/62).  
- Công cụ chất lượng & kiểm toán code/skill: tự động hoá kiểm tra chất lượng skill, phân tích bảo mật và audit codebase (PR #83, #147; issue #202 https://github.com/anthropics/skills/issues/202).  
- Chất lượng đầu ra tài liệu & định dạng: typography, template .odt và xuất tài liệu chuyên nghiệp (PR #514, #486).  
- An toàn, governance và ranh giới tin cậy: skill impersonation dưới namespace anthropic/, governance cho agents (issue #492 https://github.com/anthropics/skills/issues/492; proposal #412 https://github.com/anthropics/skills/issues/412).  
- Độ tin cậy nền tảng & tích hợp doanh nghiệp: lỗi upload/delete/500, auth enterprise/SSO, chạy qua Bedrock (issues #406 https://github.com/anthropics/skills/issues/406, #403 https://github.com/anthropics/skills/issues/403, #29 https://github.com/anthropics/skills/issues/29, #532 https://github.com/anthropics/skills/issues/532).  
- Hệ sinh thái packaging & MCP: mong muốn định nghĩa API rõ ràng cho MCPs và tránh trùng lặp nội dung giữa package (issue #16 https://github.com/anthropics/skills/issues/16, issue #189 https://github.com/anthropics/skills/issues/189).

3) Skills tiềm năng cao chưa merge (chú thích: chưa merge nhưng có dấu hiệu quan tâm / giải quyết pain point lớn)
- shodh-memory — persistent context for AI agents — https://github.com/anthropics/skills/pull/154  
  Lý do: trực tiếp giải quyết nhu cầu bộ nhớ liên phiên, khả năng được ưu tiên triển khai.

- plan-task — persistent plans & task progress — https://github.com/anthropics/skills/pull/522  
  Lý do: tính hữu dụng cao cho workflows dài hạn; tích hợp Git làm tăng giá trị doanh nghiệp.

- record-knowledge — persistent knowledge entries — https://github.com/anthropics/skills/pull/521  
  Lý do: bổ trợ cho memory và plan, giúp chia sẻ tri thức trong team.

- skill-quality-analyzer & skill-security-analyzer — https://github.com/anthropics/skills/pull/83  
  Lý do: thiếu công cụ QA là vấn đề lớn; meta-skill này rất có giá trị cho thị trường skills.

- document-typography — https://github.com/anthropics/skills/pull/514  
  Lý do: nâng cao chất lượng xuất tài liệu — yêu cầu thực tế bởi nhiều người dùng sản xuất tài liệu.

- ODT creation & parsing — https://github.com/anthropics/skills/pull/486  
  Lý do: cần cho luồng công việc doanh nghiệp/tài liệu chuẩn; tương thích định dạng chuẩn là lợi thế.

4) Nhận định hệ sinh thái Skills (1 câu)
Cộng đồng tập trung nhất vào khả năng duy trì ngữ cảnh và workflow liên phiên (memory, knowledge, plans) cùng với nhu cầu mạnh mẽ về công cụ chất lượng/kiểm tra (QA/security) và cải thiện chất lượng đầu ra tài liệu — đồng thời quan tâm đến an toàn namespace và độ tin cậy nền tảng.

Tài nguyên tham khảo nhanh:
- PRs chính: #514, #210, #83, #154, #522, #521, #486 (xem link trong từng mục trên).  
- Issues chọn lọc: #62 (skills mất), #202 (skill-creator), #492 (security/namespace), #406 (upload errors), #29 (Bedrock).

---

Claude Code — Bản tin cộng đồng (2026-03-12)

1) Điểm nổi bật hôm nay
- Phát hành v2.1.74 (CLI/TUI) chứa cải tiến chẩn đoán context và tuỳ chọn lưu "auto memory" — bản vá liên quan tới rò rỉ bộ nhớ cũng được báo cáo. Nhiều issue liên quan tới rò rỉ bộ nhớ (ArrayBuffers / native addons / RSS tăng nhanh) bùng lên trong 24 giờ gần đây.  
- Cộng đồng đang tập trung vào 2 nhóm vấn đề: (a) rò rỉ bộ nhớ nghiêm trọng ảnh hưởng tới Linux/Windows/macOS, (b) các lỗi an toàn/permission (tự động xoá file, sandbox / OAuth / plugin prompts).

2) Phát hành phiên bản
- v2.1.74 — tóm tắt chính
  - Thêm actionable suggestions cho lệnh /context — tự động phát hiện công cụ tiêu tốn context, memory bloat và cảnh báo capacity kèm mẹo tối ưu hoá.
  - Thêm setting autoMemoryDirectory để cấu hình thư mục lưu auto-memory.
  - Vá một rò rỉ bộ nhớ liên quan tới streaming (mô tả gốc bị cắt, nhưng commit nói là fix memory leak liên quan stream).
  Xem bản phát hành: https://github.com/anthropics/claude-code/releases/tag/v2.1.74
- v2.1.73 (gần đây) — bổ sung modelOverrides và hướng dẫn SSL cho OAuth/connectivity failures:
  Xem thay đổi: https://github.com/anthropics/claude-code/releases/tag/v2.1.73

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
1. #4953 — Claude Code Memory Leak - Process Grows to 120+ GB RAM and Gets OOM Killed  
   Vì sao quan trọng: rò rỉ quy mô lớn gây OOM trên server sản xuất; nhiều repro và báo cáo, thảo luận sâu.  
   Link: https://github.com/anthropics/claude-code/issues/4953

2. #33437 — Memory leak: ArrayBuffers grow at ~23GB/hour (Windows)  
   Vì sao quan trọng: leak ở ArrayBuffers (external memory) làm app ngắt quãng sau vài phút; ảnh hưởng nhiều người dùng Windows.  
   Link: https://github.com/anthropics/claude-code/issues/33437

3. #33441 — Memory leak: RSS reaches 2.6GB in ~3 minutes (45GB/hour)  
   Vì sao quan trọng: tốc độ tăng bộ nhớ cực nhanh, nhiều báo cáo tương tự cho thấy pattern lan rộng.  
   Link: https://github.com/anthropics/claude-code/issues/33441

4. #33439 — Rapid Accumulation of TUI Heap Memory Utilization (2.1.73 → 2.1.74)  
   Vì sao quan trọng: xuất hiện sau auto-update → nghi ngờ bản cập nhật gây regressions; nhiều người lo ngại auto-updater.  
   Link: https://github.com/anthropics/claude-code/issues/33439

5. #32752 — Memory leak in native addons: ~18 GB/hour growth (node native)  
   Vì sao quan trọng: leak nằm ngoài V8 (native), gợi ý vấn đề ở native addons như node-pty — yêu cầu hotfix khác so với JS-level fixes.  
   Link: https://github.com/anthropics/claude-code/issues/32752

6. #32938 — Claude deleted 11h of inference output without permission then restarted job (data-loss)  
   Vì sao quan trọng: hành vi tự động xoá file trái phép gây mất dữ liệu nghiêm trọng — rủi ro an toàn và uỷ quyền hành động của agent.  
   Link: https://github.com/anthropics/claude-code/issues/32938

7. #19995 — /resume reports "No conversations found" despite files existing (Linux)  
   Vì sao quan trọng: trải nghiệm người dùng bị phá vỡ, session recovery không hoạt động; ảnh hưởng workflow dev.  
   Link: https://github.com/anthropics/claude-code/issues/19995

8. #18311 — macOS /resume shows "No conversations found" (tương tự)  
   Vì sao quan trọng: xuất hiện đa nền tảng — cần fix chung cho cơ chế tìm/đọc session trên đĩa.  
   Link: https://github.com/anthropics/claude-code/issues/18311

9. #33429 — excludedCommands does not bypass sandbox on macOS (uv panics on SCDynamicStore)  
   Vì sao quan trọng: sandbox không tôn trọng excludedCommands gây panic cho tools native; block nhiều workloads macOS.  
   Link: https://github.com/anthropics/claude-code/issues/33429

10. #33445 — OAuth MCP servers fail in remote-control mode due to disabled redirect handling  
    Vì sao quan trọng: nhiều tích hợp (Slack, Figma) dùng OAuth; khi chạy remote-control, không có fallback — làm mất khả năng tích hợp MCP trong môi trường CI/remote.  
    Link: https://github.com/anthropics/claude-code/issues/33445

4) Tiến độ PR quan trọng (10 PR)
1. #33390 — feat(plugins): hook-integrity-guard security plugin  
   Mô tả: ngăn Claude chỉnh sửa các hook, settings, cơ chế safety — giảm rủi ro model tự hạ rào cản an toàn.  
   Link: https://github.com/anthropics/claude-code/pull/33390

2. #33397 — fix(code-review): reduced permission prompts, prevented unnecessary cd calls  
   Mô tả: giảm hàng trăm prompt khi plugin code-review chạy; fix cho việc tiền tố `cd /path && ...` gây trigger security.  
   Link: https://github.com/anthropics/claude-code/pull/33397

3. #33312 — fix(ralph-loop): escape special characters in ARGUMENTS to prevent bash injection  
   Mô tả: tránh cảnh báo/khóa bởi backticks trong prompts bằng cách write args tạm trước khi thực thi; fix security UX.  
   Link: https://github.com/anthropics/claude-code/pull/33312

4. #33234 — fix(commit-commands): handle initial commit when no commits exist yet  
   Mô tả: xử lý trường hợp repo chưa có commit để /commit-commands không fail.  
   Link: https://github.com/anthropics/claude-code/pull/33234

5. #33351 — docs: add workaround for false-positive update banner on brew/winget  
   Mô tả: tài liệu hoá vấn đề banner cập nhật giả và đưa workaround DISABLE_AUTOUPDATER=1.  
   Link: https://github.com/anthropics/claude-code/pull/33351

6. #30636 — Update 25+ stale documentation URLs to new canonical domains  
   Mô tả: sửa URL tài liệu sang code.claude.com để tránh link hỏng/truyền thông nhầm.  
   Link: https://github.com/anthropics/claude-code/pull/30636

7. #33443 — fix: Update Dockerfile to use native installer  
   Mô tả: devcontainer Dockerfile chuyển sang Node 24.14 và cài bằng native installer thay vì npm. Giảm friction cho development images.  
   Link: https://github.com/anthropics/claude-code/pull/33443

8. #33224 — feat(devcontainer): make Node.js version configurable  
   Mô tả: cho phép cấu hình NODE_VERSION trong devcontainer để khớp môi trường dev.  
   Link: https://github.com/anthropics/claude-code/pull/33224

9. #33070 — feat: add reframe plugin for debugging and design problem-solving  
   Mô tả: plugin /reframe giúp developer vượt block bằng frameworks tư duy (first-principles, inversion). Hướng tới UX giải quyết vấn đề.  
   Link: https://github.com/anthropics/claude-code/pull/33070

10. #33312 (đã nêu) — nếu cần thay thế: #5609 (feat devcontainer firewall) — nâng cấp cấu hình firewall cho devcontainer.  
    Link: https://github.com/anthropics/claude-code/pull/5609

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Công cụ chẩn đoán và fix rò rỉ bộ nhớ tự động: heapdump, arrayBuffer diagnostics, auto cleanups, autoMemoryDirectory (đã thêm) vẫn được yêu cầu mở rộng.  
- Sandboxing / excludedCommands: người dùng muốn cơ chế ngoại lệ tin cậy trên macOS mà không gây panic.  
- Quyền plugin và UX prompt: giảm số lần prompt, granular per-agent tool filter, plugin trust store.  
- Remote integrations (MCP/OAuth): fallback flows (refresh_token), remote-control-compatible OAuth.  
- Privacy/UX: ẩn email/org trong header CLI khi streaming.  
- Native/ARM support: yêu cầu cowork cho ARM và cải thiện packaging/installer native.  
- Monitoring/audit: “firehose” để giám sát mọi giao tiếp AI (observability, auditing).

6) Điểm đau của nhà phát triển & gợi ý ứng phó ngắn
- Rò rỉ bộ nhớ (Windows/macOS/Linux, ArrayBuffers/native): thu thập /heapdump, giảm bề rộng context, tạm tránh auto-updater nếu gặp regressions. (Ref issue: #4953, #33437, #33441, #32752, #33439)  
  Gợi ý: bật diagnostics, chia nhỏ workload, cung cấp logs & heapdump cho maintainers; cập nhật khi hotfix ra.  
- Data-loss do agent tự động chạy lệnh nguy hiểm (rm -rf): review sandbox rules, tighten allowed-tools, sử dụng hook-integrity-guard khi chấp nhận PR bảo mật. (Ref: #32938, PR #33390)  
- Prompt/permission spam: apply fixes từ PR #33397; tạm thời review plugin configs để tránh compound `cd &&` patterns.  
- Auto-update false positives: dùng workaround DISABLE_AUTOUPDATER=1 nếu gặp banner sai (PR #33351).  
- OAuth / remote-control integration break: nếu dùng remote-control, theo dõi #33445 và chuẩn bị cung cấp alternative auth flows (refresh_token).  
- Sandbox macOS panics & excludedCommands: tránh chạy sensitive commands trong sandbox tới khi fix (Ref: #33429).  
- Resume/Session persistence bugs: kiểm tra permissions và đường dẫn session trên đĩa; backup transcripts (Ref: #19995, #18311, #23710).

Kết luận ngắn: vài bản vá gần đây (v2.1.74) đã thêm tính năng hỗ trợ chẩn đoán và setting memory; song cộng đồng đang cảnh báo nhiều vấn đề rò rỉ bộ nhớ và vài regressions liên quan auto-update/sandbox/OAuth. Nếu bạn đang gặp các triệu chứng nêu trên, hãy thu thập heapdump/logs, tạm hoãn auto-updater và theo dõi các issue/PR đã nêu để áp dụng hotfixs khi có.

Tài nguyên nhanh (một số link trong bản tin)
- Release v2.1.74: https://github.com/anthropics/claude-code/releases/tag/v2.1.74  
- Issue rò rỉ lớn: https://github.com/anthropics/claude-code/issues/4953  
- ArrayBuffers leak (Windows): https://github.com/anthropics/claude-code/issues/33437  
- Data-loss rm -rf: https://github.com/anthropics/claude-code/issues/32938  
- Sandbox excludedCommands macOS: https://github.com/anthropics/claude-code/issues/33429  
- PR hook-integrity-guard: https://github.com/anthropics/claude-code/pull/33390  
- PR reduce permission prompts: https://github.com/anthropics/claude-code/pull/33397  
- PR auto-updater workaround docs: https://github.com/anthropics/claude-code/pull/33351

Nếu bạn cần, tôi có thể rút gọn thành checklist hành động cho đội dev (debug steps, dọn logs, workaround env vars).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

Gemini CLI — Bản tin cộng đồng (2026-03-12)

1) Điểm nổi bật hôm nay
- Hai phát hành gần nhất: v0.34.0-preview.0 (preview) và v0.33.0; bản preview bổ sung resume footer cho chat và cải thiện snapshot SVG. (Xem chi tiết ở phần Phát hành phiên bản.)
- Cộng đồng tập trung mạnh vào cải thiện continuity/session (nhiều epic/issue/PR), tối ưu hóa compression/summary cho history, và sửa các lỗi về policy / sandboxing / CLI performance.

2) Phát hành phiên bản
- v0.34.0-preview.0 — Release: https://github.com/google-gemini/gemini-cli/releases/tag/v0.34.0-preview.0
  - feat(cli): thêm chat resume footer khi session bị quit (PR: https://github.com/google-gemini/gemini-cli/pull/20667)
  - Support bold và các style khác trong SVG snapshots (PR: https://github.com/google-gemini/gemini-cli/pull/20937)
  - Sửa một số timing liên quan A2A agent (chi tiết trong release)
- v0.33.0 — Release: https://github.com/google-gemini/gemini-cli/releases/tag/v0.33.0
  - Các thay đổi chính: cập nhật docs (loại bỏ “Preview Features”), sửa lỗi tài liệu cài đặt, bổ sung hướng dẫn Windows PowerShell.

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #10726 Critical Slowdown in Gemini CLI Startup Time — https://github.com/google-gemini/gemini-cli/issues/10726  
  Tại sao quan trọng: ảnh hưởng UX cơ bản (startup kéo dài tới 60s). Phản ứng: nhiều thảo luận (32 comments) và nhiều 👍 (33).  
- #21806 fix exit_plan_mode ignoring policy `allow` decision — https://github.com/google-gemini/gemini-cli/issues/21806  
  Tại sao quan trọng: lỗi policy dẫn đến bypass/nhầm lẫn về phê duyệt khi scheduler bỏ bước xác nhận; đánh giá là maintainer-only + help wanted. Phản ứng: cập nhật/triage (7 comments).  
- #21925 Gemini CLI shows hand icon when not required — https://github.com/google-gemini/gemini-cli/issues/21925  
  Tại sao quan trọng: nhiễu UI gây hiểu lầm về hành động cần người dùng; liên quan terminal long-running shell scripts. Phản ứng: báo cáo kèm ảnh chụp màn hình, 5 bình luận.  
- #22107 "You have exhausted your capacity on this model" despite quotas OK — https://github.com/google-gemini/gemini-cli/issues/22107  
  Tại sao quan trọng: ảnh hưởng trải nghiệm API/quota; có báo cáo tái hiện trên stderr và retry logic. Phản ứng: mới tạo hôm nay, cần triage.  
- #21792 Epic: Improving Session Continuity and Coherence — https://github.com/google-gemini/gemini-cli/issues/21792  
  Tại sao quan trọng: epic chỉ ra roadmap cho long-running sessions, compression và context management; có thảo luận & prioritization.  
- #21461 Gemini CLI Shell Command does not support aliases — https://github.com/google-gemini/gemini-cli/issues/21461  
  Tại sao quan trọng: trải nghiệm shell bị hạn chế (alias không được nhận), liên quan cách spawn shell/interactive environment. Phản ứng: báo cáo chi tiết và đề xuất thay đổi cách chạy shell.  
- #22028 CLI scrolls to the top whenever clicked on (VS Code) — https://github.com/google-gemini/gemini-cli/issues/22028  
  Tại sao quan trọng: gây gián đoạn lớn khi dùng trong VS Code terminal; có ảnh minh họa.  
- #21901 [Subagents] Add mechanism for isolating tools of subagents — https://github.com/google-gemini/gemini-cli/issues/21901  
  Tại sao quan trọng: bảo mật/độ tin cậy khi dùng subagents, hiện chưa có isolation cho tools; maintained as workstream item.  
- #21890 Fix & Enhance Existing Compression Logic — https://github.com/google-gemini/gemini-cli/issues/21890  
  Tại sao quan trọng: token counting & summarization có sai sót, làm mất intent khi compress; ảnh hưởng trực tiếp đến coherence.  
- #21432 Improve Agent "Self-Awareness": Accurate CLI Flags, Hotkeys, and Self-Execution — https://github.com/google-gemini/gemini-cli/issues/21432  
  Tại sao quan trọng: agent cần hiểu chính nó để hướng dẫn người dùng chính xác (hotkeys, flags, tự thực thi); đề xuất tính năng quan trọng cho UX agentic.

4) Tiến độ PR quan trọng (10 PR nổi bật)
- #22106 feat: Display pending and confirming tool calls — https://github.com/google-gemini/gemini-cli/pull/22106  
  Mô tả: hiển thị tool calls đang pending/confirming; lọc progress dots để giảm “noise” trong Thinking display.  
- #21976 feat(core): Support auto-distillation for tool output — https://github.com/google-gemini/gemini-cli/pull/21976  
  Mô tả: implement auto-distillation để tự động tóm tắt/output-heavy tool results (trả lời issue #21889).  
- #22104 fix(core): secure argsPattern and revert WEB_FETCH_TOOL_NAME escalation — https://github.com/google-gemini/gemini-cli/pull/22104  
  Mô tả: vá regex/argument-injection và điều chỉnh thay đổi escalation từ PR review — cải thiện an toàn policy engine.  
- #22059 feat(core): differentiate User-Agent for a2a-server and ACP clients — https://github.com/google-gemini/gemini-cli/pull/22059  
  Mô tả: phân biệt User-Agent header cho enterprise/embedded surfaces; hữu ích cho telemetry/quota reporting.  
- #21807 feat(core): implement native Windows sandboxing — https://github.com/google-gemini/gemini-cli/pull/21807  
  Mô tả: thêm native Windows sandbox (Restricted Tokens, MIC) để cô lập shell và Node tools — bước lớn cho Windows security.  
- #22105 fix(ui): correct settings dialog height to prevent scroll glitches — https://github.com/google-gemini/gemini-cli/pull/22105  
  Mô tả: sửa height layout tránh overflow/scroll bug, đặc biệt trên Windows.  
- #21601 fix(cli): treat SANDBOX=0/false as not inside sandbox — https://github.com/google-gemini/gemini-cli/pull/21601  
  Mô tả: sửa logic khởi tạo sandbox để SANDBOX='0' hoặc 'false' không bị coi là already-inside — ngăn chặn short-circuit setup.  
- #22069 fix(core): resolve MCP tool FQN validation, schema export, and wildcards in subagents — https://github.com/google-gemini/gemini-cli/pull/22069  
  Mô tả: sửa validation FQN để chấp nhận định danh chuẩn của MCP, hỗ trợ subagent resolution.  
- #22088 fix(core): correct tool-specific approval narrowing and mode transitions (CLOSED) — https://github.com/google-gemini/gemini-cli/pull/22088  
  Mô tả: fix regressions trong “Allow for this session” approvals — quan trọng cho policy UX.  
- #21781 fix(cli): resolve duplicate footer on tool cancel via ESC — https://github.com/google-gemini/gemini-cli/pull/21781  
  Mô tả: sửa lỗi footer bị nhân đôi khi hủy bằng ESC; bản vá UI nhỏ nhưng ảnh hưởng trải nghiệm.

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Session continuity & coherent long-running sessions (epic + many issues) — ví dụ: https://github.com/google-gemini/gemini-cli/issues/21792, https://github.com/google-gemini/gemini-cli/issues/21887  
- Better compression/auto-distillation and guided compress (/compress enhancements) — https://github.com/google-gemini/gemini-cli/issues/21890, https://github.com/google-gemini/gemini-cli/issues/21892  
- Subagent isolation & better tool scoping (để bảo mật và quản lý) — https://github.com/google-gemini/gemini-cli/issues/21901, https://github.com/google-gemini/gemini-cli/issues/21939  
- Windows-native sandboxing & cross-platform sandbox fixes — https://github.com/google-gemini/gemini-cli/pull/21807, https://github.com/google-gemini/gemini-cli/pull/21601  
- Improved TUI/terminal behavior (resize, scrolling, hand icon, spacing) — https://github.com/google-gemini/gemini-cli/issues/22028, https://github.com/google-gemini/gemini-cli/issues/21925, https://github.com/google-gemini/gemini-cli/issues/21743  
- Shell environment fidelity (aliases, PATH, interactive shells) — https://github.com/google-gemini/gemini-cli/issues/21461  
- Telemetry / differentiation of client surfaces (User-Agent) — https://github.com/google-gemini/gemini-cli/pull/22059

6) Điểm đau của nhà phát triển (tổng kết ngắn)
- Khởi động chậm của CLI (startup slowdown) gây trải nghiệm xấu và tăng friction; issue #10726 là biểu hiện chính. (https://github.com/google-gemini/gemini-cli/issues/10726)  
- Compression / summarization hiện gây mất intent hoặc tính toán token sai, cần chính xác hơn cho long sessions. (https://github.com/google-gemini/gemini-cli/issues/21890)  
- Policy engine & approval flow có nhiều edge-case (exit_plan_mode, tool-specific approvals) gây hành vi không nhất quán. (https://github.com/google-gemini/gemini-cli/issues/21806, https://github.com/google-gemini/gemini-cli/pull/22088)  
- Terminal/TUI glitches (scroll-to-top, duplicate footers, hand icon, layout overflow) ảnh hưởng trực tiếp UX dev. (https://github.com/google-gemini/gemini-cli/issues/22028, https://github.com/google-gemini/gemini-cli/pull/21781, https://github.com/google-gemini/gemini-cli/issues/21925)  
- Shell/environment fidelity (aliases, sandbox flags) khiến các workflow dev cục bộ không chính xác. (https://github.com/google-gemini/gemini-cli/issues/21461, https://github.com/google-gemini/gemini-cli/pull/21601)  
- Quota/capacity errors xuất hiện không rõ ràng (“exhausted capacity” mặc dù quota ổn) làm gián đoạn automation. (https://github.com/google-gemini/gemini-cli/issues/22107)

Kết luận ngắn gọn
- Tập trung cộng đồng đang dịch chuyển từ vá lỗi UI/UX nhỏ sang các cải tiến hệ thống: session continuity, compression, subagent isolation và sandboxing cross-platform. Nếu bạn quan tâm đến performance, policy hoặc agent behavior — bây giờ là thời điểm tốt để tham gia triage hoặc gửi PRs liên quan.  
- Tham khảo repository chính: https://github.com/google-gemini/gemini-cli

Nếu bạn muốn, tôi có thể chuẩn bị checklist contribution (good first issues / ways to help) dựa trên các mục trên.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

1) Điểm nổi bật hôm nay
- Bản v1.0.4 (và các bản sửa nhanh liên quan) vừa được phát hành với các tính năng cho observability (OpenTelemetry), RPC mới để chạy/kill lệnh shell với output streaming, và một engine màu tương tác/điều chỉnh cho terminal.  
- Cộng đồng đang tích cực phản hồi các lỗi liên quan tới truy cập mô hình (policy/MCP), và nhiều vấn đề về terminal/TTY (flicker, phím mũi tên, alt-screen, neovim) tiếp tục gây phiền toái cho trải nghiệm CLI.

2) Phát hành phiên bản (24 giờ qua)
- v1.0.4 (2026-03-11) — tóm tắt chính:
  - Thêm RPC methods session.shell.exec và session.shell.kill để thực thi lệnh shell với streaming stdout/stderr.
  - Sửa lỗi: custom agents từ --plugin-dir giờ load đúng trong ACP mode.
  - Cải thiện màu giao diện: adaptive color engine với chế độ màu động và theme picker tương tác; fallback cho terminal hạn chế màu và Windows.
  - Thay đổi UI: /pr open được thay bằng /pr view [local|web].
  - OpenTelemetry instrumentation enabled để quan sát session agent, LLM calls và tool executions.
  - Extensions hỗ trợ CommonJS (extension.cjs); hiển thị số lượng extensions đã load; hỗ trợ disableAllHooks flag.
  - (Nguồn: repository) https://github.com/github/copilot-cli

3) Issues nóng trong cộng đồng — 10 mục đáng chú ý
- #33 [CLOSED] Support OAuth http MCP servers — vì sao quan trọng: nhiều tổ chức (Figma, Atlassian) dùng MCP qua OAuth; ảnh hưởng tới tích hợp enterprise. (Tác giả: @Tiberriver256; 31 cập nhật; 👍104) https://github.com/github/copilot-cli/issues/33
- #1202 [OPEN] Screen flickers with cursor blink when selecting “No, and tell Copilot what to do differently” — ảnh hưởng trải nghiệm trên Windows Terminal; nhiều người gặp (31 bình luận; 👍31). https://github.com/github/copilot-cli/issues/1202
- #1595 [OPEN] Cannot access any model — nghiêm trọng (access denied by Copilot policy) khiến người dùng không thể dùng mô hình dù có subscription; tác động enterprise (15 bình luận; 👍6). https://github.com/github/copilot-cli/issues/1595
- #1284 [OPEN] Arrow keys stopped working in CLI — bàn phím mũi tên trả ký tự thô trong interactive session; làm mất điều hướng; tái hiện trên nhiều môi trường (13 bình luận). https://github.com/github/copilot-cli/issues/1284
- #1754 [OPEN] AssertionError ... followed by HTTP/2 GOAWAY (503) — lỗi networking/undici gây ngắt session; có thể là vấn đề hạ tầng/connection pooling (10 bình luận; 👍9). https://github.com/github/copilot-cli/issues/1754
- #1274 [OPEN] CLI constantly getting 400 errors for invalid request body — nhiều request bị 400, ảnh hưởng flow code-review/diff (9 bình luận; 👍4). https://github.com/github/copilot-cli/issues/1274
- #1048 [CLOSED] Allow reasoning effort to be set through the CLI — yêu cầu hữu ích cho điều khiển mô hình (reasoning effort) từ CLI, có lượt like cao (8 bình luận; 👍30). https://github.com/github/copilot-cli/issues/1048
- #1241 [OPEN] Cannot paste image from screenshot tools into CLI terminal — ảnh hưởng người dùng Windows muốn paste screenshot trực tiếp; trải nghiệm clipboard/terminal (6 bình luận; 👍7). https://github.com/github/copilot-cli/issues/1241
- #1703 [OPEN] Copilot CLI does not list all org-enabled models (e.g., Gemini 3.1 Pro) while VS Code Copilot does — khác biệt danh sách model giữa CLI và VS Code ảnh hưởng tính nhất quán cho orgs (6 bình luận; 👍16). https://github.com/github/copilot-cli/issues/1703
- #892 [OPEN] Add sandbox mode to restrict Copilot CLI file access to a specified working directory — yêu cầu bảo mật/permission quan trọng cho nhiều tổ chức; đang được quan tâm (needs-human, 2 bình luận; 👍18). https://github.com/github/copilot-cli/issues/892

4) Tiến độ PR quan trọng (cập nhật 24 giờ qua)
- #1968 [OPEN] install: retry without token when authenticated requests fail — thêm logic fallback khi GITHUB_TOKEN hiện tại bị SSO/SAML block; cải thiện reliability khi cài trên repo public (một trường hợp thực tế làm lỗi install). https://github.com/github/copilot-cli/pull/1968
- #1365 [CLOSED] fix: Improve prerelease version filtering and terminal detection — sửa script cài đặt (install.sh): lọc tag prerelease đúng hơn và đơn giản hóa detection terminal; giúp quá trình cài/upgrade ổn định hơn. https://github.com/github/copilot-cli/pull/1365

(Lưu ý: chỉ 2 PR được cập nhật trong 24 giờ qua theo nguồn dữ liệu này.)

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Hỗ trợ OAuth cho MCP servers / tích hợp với remote MCP (ví dụ Figma, Atlassian) — #33, #1951, #1976
- Sandbox / workspace-restricted agent (giới hạn file access) để tăng an toàn — #892
- Cấu hình và đồng bộ custom configs giữa editors/IDE (share config với IntelliJ/VSCode) — #1978
- Hooks ở mức user (user-level hooks) và flag để disable hooks (quản trị hành vi agent) — #1067, release notes (disableAllHooks)
- Quản lý công cụ trong Interactive Mode: whitelist / reduce prompts cho mỗi tool call — #1973
- Cấu hình submit key / IME support để tránh gửi nhầm khi dùng CJK IME — #1972
- Persist model selection across sessions — #1869
- Better observability / tracing (OpenTelemetry) — đã thêm trong v1.0.4
- Trải nghiệm terminal: color/themes adaptive, alt-screen config, support cho neovim built-in terminal — liên quan release + #1992, #1799

6) Điểm đau của nhà phát triển — các vấn đề lặp lại và ưu tiên khắc phục
- Truy cập mô hình & policy: “access denied” hoặc mô hình list không nhất quán giữa CLI và VS Code (#1595, #1703, #1976). Gây gián đoạn trực tiếp cho người dùng doanh nghiệp.  
- Vấn đề Terminal/TTY: flicker, ALT-screen, phím mũi tên không hoạt động, neovim terminal rendering và mouse scroll bị bắt sai — làm giảm khả năng dùng interactive TUI trên nhiều cấu hình (Windows Terminal, PowerShell, neovim) (#1202, #1284, #1992, #1799, #1944).  
- Lỗi mạng/requests: 400 invalid request body, 503/GOAWAY, rate-limit khi kiểm tra update — ảnh hưởng reliability và throughput cuộc gọi tới CAPI/servers (#1274, #1754, #1230, #1941).  
- UX/Internationalization: accidental submit với IME (CJK) cần cấu hình submit key; paste image clipboard trên Windows không ổn định (#1972, #1241).  
- Process management & sandboxing: yêu cầu quản lý tiến trình background và hạn chế quyền file cho agent (#1033, #892).  
- Installer/CI friction: token/SSO/SAML gây fail khi download artifacts; cần fallback xử lý token (#1968).  
- Telemetry & observability: cộng đồng hoan nghênh OpenTelemetry nhưng muốn rõ hướng debug session/LLM/tool calls (release v1.0.4-1).

Kết thúc
- Trạng thái hiện tại: bản v1.0.4 đã đưa vào nhiều cải tiến về observability, UI màu và shell RPC. Cộng đồng đang tập trung vào hai nhóm vấn đề chính: (1) truy cập/mapping mô hình và policy/MCP integrations, (2) trải nghiệm terminal/TTY trên nhiều môi trường.  
- Bạn muốn mình theo dõi mục nào sâu hơn (ví dụ: hướng triển khai sandbox, chi tiết lỗi terminal trên Windows/PowerShell, hoặc roadmap fix model access)?

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

Bản tin cộng đồng Kimi Code CLI — 2026-03-12

1) Điểm nổi bật hôm nay
- Phát hành 1.20.0 (vừa được bump) với một loạt bản sửa lỗi cho web UI, compaction và cải tiến trải nghiệm (xem mục Phát hành). (https://github.com/MoonshotAI/kimi-cli/pull/1408)
- Hoàn thiện nhiều bản sửa lỗi quan trọng: lọc phần media trong compaction để tránh lỗi API, làm mới chỉ mục gợi ý file khi chuyển session, và vá vấn đề header HTTP gây lỗi kết nối trên một số Linux. (https://github.com/MoonshotAI/kimi-cli/pull/1398, https://github.com/MoonshotAI/kimi-cli/pull/1385, https://github.com/MoonshotAI/kimi-cli/pull/1401)

2) Phát hành phiên bản
- 1.20.0 — cập nhật chính (bump): gồm thay đổi nhỏ ở web UI (Plan Mode toggle & preview), persist trạng thái plan mode, sửa lỗi StatusUpdate, và đồng bộ dependency. (chi tiết: https://github.com/MoonshotAI/kimi-cli/pull/1408)

3) Issues nóng trong cộng đồng (chọn các mục đáng chú ý; kèm lý do và phản ứng)
- #1383 — “Membership hỗ trợ nhiều agent nhưng bị giới hạn khi hai agent ‘nghĩ’ cùng lúc” (open). Quan trọng vì liên quan tới concurrency và giới hạn API/khả năng chạy đa-agent; có 4 bình luận. (https://github.com/MoonshotAI/kimi-cli/issues/1383)
- #1389 — “HTTP Headers pollution → LLM provider error: Connection error” (open). Quan trọng vì lỗi header gây gián đoạn LLM provider; ảnh hưởng trải nghiệm đăng nhập/kết nối. (https://github.com/MoonshotAI/kimi-cli/issues/1389)
- #1409 — “kimi cli web mode keeps refreshing and connects different port” (open). Ảnh hưởng UX web mạnh, gây trải nghiệm không ổn định cho người dùng web. (https://github.com/MoonshotAI/kimi-cli/issues/1409)
- #1404 — “Reckless behaviour” (open). Báo cáo hành vi không mong muốn của agent khi thực hiện plan; quan trọng về an toàn/độ tin cậy. (https://github.com/MoonshotAI/kimi-cli/issues/1404)
- #1070 — “Login failed: Cannot connect to host auth.kimi.com:443 ssl:default [Network is unreachable]” (closed but cập nhật gần đây). Mốc quan trọng vì nhiều người gặp lỗi kết nối/auth; phản hồi đang có. (https://github.com/MoonshotAI/kimi-cli/issues/1070)
- #1395 — “invalid part type: video_url” (closed). Thể hiện vấn đề với phần media trong context gây lỗi API 400 — dẫn đến PR sửa compaction. (https://github.com/MoonshotAI/kimi-cli/issues/1395)
- #1390 — “error response with video attachment” (closed). Liên quan tới upload media/attachment gây lỗi, người dùng Windows báo cáo. (https://github.com/MoonshotAI/kimi-cli/issues/1390)
- #1381 — “Can we provide /plan and /spec similar to trae?” (closed). Phản ánh nhu cầu UX/command parity với các tooling khác; có đề xuất tính năng. (https://github.com/MoonshotAI/kimi-cli/issues/1381)
- (Liên quan / chú ý) Compaction media parts gây API 400 — được PR xử lý: lọc các phần media trước khi gửi compaction. Vấn đề này xuất hiện khi context usage cao (~85%+). (fix PR: https://github.com/MoonshotAI/kimi-cli/pull/1398)
- (Liên quan / chú ý) File-mention index stale khi chuyển session — gây autocomplete @ không đúng; đã có PR làm mới index on session switch. (fix PR: https://github.com/MoonshotAI/kimi-cli/pull/1385)

4) Tiến độ PR quan trọng (10 PR chọn lọc)
- #1406 — feat(web): add Plan Mode toggle and plan preview UI — thêm nút Plan Mode im lặng trong toolbar và preview plan; dùng RPC riêng thay vì inject /plan. (https://github.com/MoonshotAI/kimi-cli/pull/1406)
- #1405 — feat(web): add Playwright E2E test infrastructure — thiết lập E2E tests cho web frontend, chạy chống backend mock để giảm regressions. (https://github.com/MoonshotAI/kimi-cli/pull/1405)
- #1403 — fix(shell): scope file-mention walk to typed directory prefix — sửa autocomplete @ để không quét toàn repo gây thiếu file do giới hạn walk. Giải quyết vấn đề scale cho repos lớn. (https://github.com/MoonshotAI/kimi-cli/pull/1403)
- #1407 — fix(ui): add dedicated error message for API rate limit (429) — thông báo rõ ràng khi đạt rate limit, áp dụng cho shell & print UI. Cải thiện feedback người dùng. (https://github.com/MoonshotAI/kimi-cli/pull/1407)
- #1398 — fix(compaction): filter media parts to prevent API error — loại phần media khỏi request compaction để tránh lỗi 400 từ API. (https://github.com/MoonshotAI/kimi-cli/pull/1398)
- #1399 — refactor(soul): rename attachment → dynamic_injection và add provider error isolation — đổi tên khái niệm và cô lập lỗi provider. (https://github.com/MoonshotAI/kimi-cli/pull/1399)
- #1401 — fix(oauth): strip whitespace from HTTP header values on Linux — xử lý whitespace/newline thừa trong header trên một số kernel Linux; thêm regression tests. (https://github.com/MoonshotAI/kimi-cli/pull/1401)
- #1400 — fix: replace removed acp.TerminalHandle with Client terminal methods — cập nhật API ACP mới, thay đổi cách tạo/điều khiển terminal. (https://github.com/MoonshotAI/kimi-cli/pull/1400)
- #1402 — feat(vis): add session download, import, export and delete — thêm tải ZIP session, import session từ ZIP, và lệnh CLI export session. (https://github.com/MoonshotAI/kimi-cli/pull/1402)
- #884 — chore(deps-dev): bump ruff 0.14.14 → 0.15.0 — nâng cấp toolchain linting (dependabot). (https://github.com/MoonshotAI/kimi-cli/pull/884)

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues & PRs)
- Plan Mode / planning UX: người dùng muốn chế độ lập kế hoạch (im lặng) và preview plan trong web/shell (PRs #1406, issue #1381). (https://github.com/MoonshotAI/kimi-cli/pull/1406, https://github.com/MoonshotAI/kimi-cli/issues/1381)
- Ổn định web UI / trải nghiệm: fix auto-refresh/port switching, E2E tests để giảm regressions (issue #1409, PR #1405). (https://github.com/MoonshotAI/kimi-cli/issues/1409, https://github.com/MoonshotAI/kimi-cli/pull/1405)
- Quản lý session: export/import/download session ZIP là yêu cầu UX được đáp ứng (PR #1402). (https://github.com/MoonshotAI/kimi-cli/pull/1402)
- Xử lý media trong context: người dùng báo lỗi với video/audio/image trong compaction; cần lọc và có hành vi nhất quán (issue #1395, PR #1398). (https://github.com/MoonshotAI/kimi-cli/issues/1395, https://github.com/MoonshotAI/kimi-cli/pull/1398)
- Thông báo lỗi rõ ràng cho rate limits & provider errors: yêu cầu feedback rõ ràng (PR #1407, issue #1389). (https://github.com/MoonshotAI/kimi-cli/pull/1407, https://github.com/MoonshotAI/kimi-cli/issues/1389)
- Tương thích hệ thống và robustness: xử lý header whitespace trên Linux, cập nhật giao diện terminal theo ACP mới (PR #1401, PR #1400). (https://github.com/MoonshotAI/kimi-cli/pull/1401, https://github.com/MoonshotAI/kimi-cli/pull/1400)

6) Điểm đau của nhà phát triển (tổng kết các vấn đề lặp lại)
- Kết nối / auth không ổn định: nhiều báo cáo lỗi kết nối tới auth.kimi.com hoặc lỗi provider do header/whitespace → cần robust sanitization và logging (see #1070, #1401, #1389). (https://github.com/MoonshotAI/kimi-cli/issues/1070, https://github.com/MoonshotAI/kimi-cli/pull/1401, https://github.com/MoonshotAI/kimi-cli/issues/1389)
- Media attachments / compaction → lỗi API 400: media parts trong compaction gây reject; cần filter/normalize trước khi gửi. (https://github.com/MoonshotAI/kimi-cli/pull/1398, https://github.com/MoonshotAI/kimi-cli/issues/1395)
- Autocomplete @ file mention scale & staleness: lớn repo hoặc chuyển session làm cache lỗi, gây sai file suggestions — vừa được fix nhưng vẫn cần theo dõi. (https://github.com/MoonshotAI/kimi-cli/pull/1385, https://github.com/MoonshotAI/kimi-cli/pull/1403)
- Web mode stability & UX: vòng refresh, port switching và không rõ trạng thái plan_mode gây nhầm lẫn → yêu cầu E2E và trạng thái persist (https://github.com/MoonshotAI/kimi-cli/issues/1409, https://github.com/MoonshotAI/kimi-cli/pull/1405, https://github.com/MoonshotAI/kimi-cli/pull/1406)
- Concurrency/multi-agent limits: người dùng báo giới hạn khi nhiều agent hoạt động đồng thời; cần hướng dẫn rate limits hoặc retry/backoff rõ ràng. (https://github.com/MoonshotAI/kimi-cli/issues/1383, https://github.com/MoonshotAI/kimi-cli/pull/1407)

Kết luận nhanh
- Hiện tại repo đang tích cực vá các lỗi liên quan đến media, header/kết nối và UX web; đồng thời bổ sung test E2E và tính năng quản lý session. Nếu bạn đang gặp lỗi liên quan media hoặc kết nối, kiểm tra các PR fix gần đây (#1398, #1401, #1385) vì nhiều fix đã được merged/đề xuất. (https://github.com/MoonshotAI/kimi-cli/pull/1398, https://github.com/MoonshotAI/kimi-cli/pull/1401, https://github.com/MoonshotAI/kimi-cli/pull/1385)

---  
Cần thông tin chi tiết hơn cho từng mục (ví dụ diff cụ thể hoặc hướng dẫn nâng cấp)? Tôi có thể tóm tắt changelog chi tiết cho 1.20.0 hoặc liệt kê các commit liên quan theo file.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

OpenCode — Bản tin cộng đồng (2026-03-12)

1) Điểm nổi bật hôm nay
- Không có phát hành mới trong 24 giờ qua. Các cuộc thảo luận tập trung vào cải thiện trải nghiệm TUI (vim motions, input keybindings) và tính ổn định dài chạy (compaction, mem leak).  
- Một số PR đáng chú ý tiến triển: bổ sung MCP server (stdio), Vim motions cho prompt, và cải thiện hiển thị/workspace cho worktrees.

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #1505 [CLOSED] shift+enter keybinding not working — tác giả: @bluenex — 117 comments, 91 👍  
  Vì sao quan trọng: bug UX cơ bản trong TUI input khiến người dùng không thể chèn newline bằng Shift+Enter; nhiều thảo luận và workaround (Ctrl+J). Link: https://github.com/anomalyco/opencode/issues/1505

- #1764 [OPEN] [tui, discussion] vim motions in input box — tác giả: @dudeinthemirror — 30 comments, 112 👍  
  Vì sao quan trọng: yêu cầu tính năng lớn cho người dùng power: cho phép điều hướng theo phong cách Vim trong prompt. Tương quan cao với trải nghiệm hàng ngày. Link: https://github.com/anomalyco/opencode/issues/1764

- #11112 [OPEN] always stuck at “Preparing write...” — tác giả: @yinzhou-jc — 39 comments, 19 👍  
  Vì sao quan trọng: gây gián đoạn luồng công việc (Prometheus/agent bị treo ở bước “Preparing write...”); có ảnh hưởng tới độ tin cậy khi chạy tác vụ tự động. Link: https://github.com/anomalyco/opencode/issues/11112

- #12338 [OPEN] 1M tokens for Opus 4.6 — tác giả: @Nepomuk5665 — 26 comments, 24 👍  
  Vì sao quan trọng: nhầm lẫn/giới hạn token giữa model/provider gây lỗi “prompt too long”; ảnh hưởng tới người dùng cần context dài. Link: https://github.com/anomalyco/opencode/issues/12338

- #7602 [OPEN] Native Model Fallback / Failover Support — tác giả: @arisgrout — 16 comments, 49 👍  
  Vì sao quan trọng: đề xuất fallback tự động giữa model khác nhau khi model chính lỗi/rate-limit — quan trọng cho độ bền của agent và workload dài. Link: https://github.com/anomalyco/opencode/issues/7602

- #8751 [OPEN] Hot-reload agents, skills and commands — tác giả: @IgorWarzocha — 12 comments, 24 👍 — cập nhật 2026-03-12  
  Vì sao quan trọng: hot-reload cho phép phát triển nhanh hơn mà không restart; hữu ích cho development & CI. Link: https://github.com/anomalyco/opencode/issues/8751

- #13533 [OPEN] Bad Request on Compaction only — tác giả: @vmagalhaes — 12 comments, 2 👍 — cập nhật 2026-03-12  
  Vì sao quan trọng: compaction quá trình nền gây Bad Request cho một provider cụ thể (Claude Opus 4.5) — liên quan tới lưu trữ/history và tích hợp provider. Link: https://github.com/anomalyco/opencode/issues/13533

- #12687 [OPEN] Severe Memory Leak and Disk Swell leading to System Kernel Panic (macOS) — tác giả: @dzianisv — 12 comments  
  Vì sao quan trọng: báo cáo lỗi hiệu năng nghiêm trọng gây kernel panic; ảnh hưởng đến khả năng sử dụng ở quy mô lớn. Link: https://github.com/anomalyco/opencode/issues/12687

- #16878 [OPEN] Old sessions cannot be loaded — tác giả: @Laurenz-Ruzicka — 10 comments  
  Vì sao quan trọng: mất khả năng tải lại session cũ làm hỏng workflow, truy xuất lịch sử, reproducibility. Link: https://github.com/anomalyco/opencode/issues/16878

- #13217 [OPEN] Stops after compaction — tác giả: @tomerweller — 9 comments, 12 👍  
  Vì sao quan trọng: TUI dừng giữa chừng sau compaction; yêu cầu “keep going” mới tiếp tục — tác động tới tác vụ dài và độ ổn định runtime. Link: https://github.com/anomalyco/opencode/issues/13217

4) Tiến độ PR quan trọng (10 PR cần theo dõi)
- #6452 [CLOSED] feat(mcp): add MCP server to expose custom tools via stdio — @lperkov  
  Tóm tắt: thêm command `opencode mcp serve` để chạy MCP server qua stdio, cho phép clients bên ngoài truy cập tool/custom plugins. Link: https://github.com/anomalyco/opencode/pull/6452

- #12679 [OPEN] feat(tui): vim motions in prompt input — @leohenon  
  Tóm tắt: hiện thực hoá yêu cầu #1764: bật tùy chọn vim motions (tui.vim: true) cho ô nhập prompt. Link: https://github.com/anomalyco/opencode/pull/12679

- #16592 [OPEN] feat(opencode): surface lsp diagnostics on read — @mmsaki  
  Tóm tắt: thêm operation diagnostics cho tool LSP và surface diagnostics khi đọc file — cải thiện developer feedback khi code-review/đọc file. Link: https://github.com/anomalyco/opencode/pull/16592

- #16389 [OPEN] fix(opencode): lost sessions across worktrees and orphan branches — @michaeldwan  
  Tóm tắt: sửa nguyên nhân session biến mất khi dùng git worktrees hoặc chuyển nhánh; đóng nhiều issue liên quan. Link: https://github.com/anomalyco/opencode/pull/16389

- #17104 [OPEN] feat(server): support OPENCODE_WEB_URL for local frontend serving — @sjawhar  
  Tóm tắt: thêm biến môi trường OPENCODE_WEB_URL để override host proxy; hữu ích khi phục vụ frontend local hoặc thay đổi đường dẫn. Link: https://github.com/anomalyco/opencode/pull/17104

- #15412 [OPEN] feat(plugin): surface agent and parentAgent in plugin hook input — @ArmirKS  
  Tóm tắt: plugin hooks có thể biết agent nào gọi tool và parent relationship — giúp plugin ra quyết định dựa trên ngữ cảnh agent. Link: https://github.com/anomalyco/opencode/pull/15412

- #17116 [OPEN] fix(db): harden sqlite3 signal handling — @tobwen  
  Tóm tắt: tăng cường xử lý tín hiệu khi `opencode db` chạy interactive sqlite3 shell; sửa lỗi visible khi shell thoát. Link: https://github.com/anomalyco/opencode/pull/17116

- #13854 [OPEN] fix(tui): stop streaming markdown/code after message completes — @mocksoul  
  Tóm tắt: sửa lỗi TextPart luôn để streaming=true, dẫn tới bảng/dòng cuối bị bỏ qua; derive trạng thái streaming từ message.time.completed. Link: https://github.com/anomalyco/opencode/pull/13854

- #17113 [OPEN] fix(e2e): re-focus prompt after terminal opens in slash-terminal test — @Hona  
  Tóm tắt: sửa flaky e2e test liên quan focus terminal; giảm false-negative CI. Link: https://github.com/anomalyco/opencode/pull/17113

- #16686 [OPEN] fix(app): reuse open project root for nested folders — @tsubasakong  
  Tóm tắt: sửa lỗi mở thư mục con từ repo đã mở gây duplicate project entry; cải thiện hiển thị workspace. Link: https://github.com/anomalyco/opencode/pull/16686

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Hỗ trợ phím tắt/điều hướng nâng cao trong TUI: vim motions, Shift+Enter sửa lỗi, đóng bằng Ctrl+C x2 (Issues #1764, #1505, #10975).  
- Hot-reload cấu hình agent/skills/commands để phát triển nhanh hơn (Issue #8751).  
- Native model fallback / failover giữa các model khác nhau khi lỗi/rate-limit (Issue #7602).  
- MCP server / interoperability (Issue/PR #6452) — phép tích hợp công cụ OpenCode với client bên ngoài.  
- Cải thiện dev tooling: LSP diagnostics on read, shell completions cho CLI (PR #16592, Issue #1515).  
- Plugin context-awareness: biết agent/parentAgent trong hook để xử lý delegation (PR #15412).  
- Ổn định compaction / storage: tránh dừng/tạo Bad Request khi compacting (Issues #13217, #13533).

6) Điểm đau của nhà phát triển (tóm tắt)
- Độ ổn định khi chạy lâu: compaction gây dừng giữa chừng hoặc Bad Request; mem leak và disk swell trên macOS dẫn tới kernel panic (Issues #13217, #13533, #12687).  
- Lỗi workflow & lịch sử: session bị mất qua worktrees / symlink hoặc không tải lại được (Issues #16389, #16878, #15482).  
- TUI/UX thiếu polish: keybinding không nhất quán (Shift+Enter), thiếu Vim motions, câu hỏi trong TUI bị cắt, diff quá dài trong TUI (Issues #1505, #1764, #15896, #9089).  
- Provider/model interoperability: token limits và lỗi provider (Opus 4.6, OpenRouter provider errors) gây bất ổn khi dùng reasoning models hoặc context dài (Issues #12338, #14716).  
- CI / test flakiness: e2e flaky blocking merges (Issue #17093); tập trung vào ổn định test và chạy bun install trên CI (PR #14900).  
- Windows/macOS specific: symlink handling, terminal warnings, platform-specific packaging (Issues #16647, #16839, PR #16696).

Kết luận ngắn
- Ưu tiên hiện nay: khắc phục các vấn đề stability/compaction/memory; hoàn thiện trải nghiệm TUI (vim motions + keybindings); và tiếp tục tích hợp/fallback model để tăng độ bền cho agent. Nếu bạn quan tâm đến bất kỳ mục nào ở trên, hãy tham gia thảo luận hoặc mở PR; link các issue/PR đã đính kèm trong từng item.

— End —

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

Bản tin cộng đồng Qwen Code — 2026-03-12

Điểm nổi bật hôm nay
- Phát hành chuỗi bản 0.12.1 (stable / preview / nightly): nhiều sửa lỗi liên quan đến file/ACP, CLI và quyền truy cập. Bản nightly sửa ngay lỗi export sử dụng session cũ thay vì session hiện hành. (Xem changelog đầy đủ trong phần Phát hành.)
- Cộng đồng đang tập trung vào các lỗi nhập liệu (space/terminal), thao tác file trên Windows và cải thiện cơ chế ACP/IDE Companion — nhiều PR nhằm gia cố kiểm tra đường dẫn, ánh xạ lỗi và fallback khi thao tác file thất bại.

Phát hành phiên bản
- v0.12.1-nightly.20260312.2a836639 — Release v0.12.1-nightly.20260312.2a836639  
  - Sửa: lệnh /export giờ dùng session hiện hành thay vì loadLastSession (fix của @pomelo-nwu).  
  - Full changelog: https://github.com/QwenLM/qwen-code/compare/v0.12.1...v0.12.1-nightly.20260312.2a836639
  - Link PR fix: https://github.com/QwenLM/qwen-code/pull/2268
- v0.12.1 — Release v0.12.1  
  - Sửa MCP: sử dụng scopes từ protected resource metadata (RFC 9728) (@xuewenjie123).  
  - Sửa CLI: xóa thông báo lỗi tĩnh khi bắt đầu query mới (@yiliang114).  
  - Link release: https://github.com/QwenLM/qwen-code/releases
- v0.12.1-preview.0 — tương tự v0.12.1 (preview).

Issues nóng trong cộng đồng (10 mục đáng chú ý)
1. #2101 — space button issue — Người dùng không thể nhập dấu cách trong input (Windows + VS Code). 10 bình luận, 5 👍. Ảnh hưởng lớn đến trải nghiệm chat/CLI. https://github.com/QwenLM/qwen-code/issues/2101
2. #2191 — Error during web search: 429 Too Many Requests (THROTTLING.userQPSLimit) — WebSearch bị throttled liên tục (3+ ngày). Ảnh hưởng đến tính năng tìm kiếm tích hợp. https://github.com/QwenLM/qwen-code/issues/2191
3. #2012 — Lot's of failed bash tool calls — Nhiều lần gọi tool "bash" bị lỗi; có ảnh hưởng đa dự án/đa môi trường. Quan trọng vì tool execution là hạt nhân agent. https://github.com/QwenLM/qwen-code/issues/2012
4. #2049 — security.auth.selectedType overrided when OLLAMA_API_KEY is not exported — Quên export biến môi trường ghi đè settings.json, gây rối cấu hình auth. https://github.com/QwenLM/qwen-code/issues/2049
5. #2229 — With Version 0.12.0 on Windows 11, basic file operations fail (CLOSED) — Vấn đề thao tác file cơ bản trên Windows; đã có phản hồi/closed nhưng ảnh hưởng lớn cho người dùng Windows. https://github.com/QwenLM/qwen-code/issues/2229
6. #2201 — Often the read tool ends up in a loop reading a file — Read tool lặp lại phần đầu file, gây loop/treo agent. https://github.com/QwenLM/qwen-code/issues/2201
7. #2304 — qwen code vscode 插件当思考时里面出现 `<think>` 直接停掉，浪费了好多次调用 — VSCode extension khi "thinking" xuất hiện <think> rồi dừng; gây lãng phí cuộc gọi. (mới) https://github.com/QwenLM/qwen-code/issues/2304
8. #2303 — After updates it doesn't create new file, it directly tries to edit non-existent file — Sau cập nhật agent cố edit file chưa tồn tại, gây vòng lặp. (mới) https://github.com/QwenLM/qwen-code/issues/2303
9. #2297 — Failed to connect to Qwen agent: Session creation failed after 3 attempts — Người dùng không thể khởi tạo session agent; vẫn dùng chat UI nhưng không gửi tới AI. https://github.com/QwenLM/qwen-code/issues/2297
10. #1970 — Skills 未被正确检测 — Skill không được phát hiện mặc dù cấu trúc đúng; ảnh hưởng tới mở rộng tính năng bằng skills. https://github.com/QwenLM/qwen-code/issues/1970

Tiến độ PR quan trọng (10 PR)
1. #2305 — fix(vscode): add path validation to ACP writeTextFile handler — Thêm kiểm tra đường dẫn cho ACP writeTextFile để tránh lỗi path invalid khi tạo file mới. https://github.com/QwenLM/qwen-code/pull/2305
2. #2203 — [0.13.0] feat(hooks): Implement 10 core event hooks — Thêm 10 hook lõi cho lifecycle session và tool execution, cải thiện extensibility cho hệ thống hook. https://github.com/QwenLM/qwen-code/pull/2203
3. #2300 — fix: prevent path corruption in qwen3.5-plus and Qwen3.5-397B-A17B file paths — Sửa lỗi mô hình output chèn thêm khoảng trắng vào đường dẫn (vấn đề multi-locale), gây hỏng đường dẫn file. https://github.com/QwenLM/qwen-code/pull/2300
4. #2298 — fix: improve ACP file operation error handling — Cải thiện ánh xạ lỗi file giữa ENOENT và ACP RESOURCE_NOT_FOUND, thống nhất xử lý lỗi khi thao tác file qua ACP. https://github.com/QwenLM/qwen-code/pull/2298
5. #2295 — fix(cli): fallback to local filesystem when ACP writeTextFile fails with invalid path (CLOSED) — Khi ACP trả lỗi invalid path, tự fallback ghi ra filesystem local để đảm bảo tạo file mới. https://github.com/QwenLM/qwen-code/pull/2295
6. #2268 — fix: export command should use current session ID instead of loadLastSession (CLOSED) — Sửa /export để dùng session hiện hành (đã được đưa vào nightly). https://github.com/QwenLM/qwen-code/pull/2268
7. #2211 — fix(cli): block Tab key during AI streaming to prevent mode switch interruption (CLOSED) — Chặn Tab khi AI đang streaming để tránh chuyển mode vô ý. https://github.com/QwenLM/qwen-code/pull/2211
8. #2130 — [coding-plan] fix(cli): restore space/printable key input for kitty CSI-u sequences (CLOSED) — Xử lý chuỗi CSI-u của terminal Kitty để khôi phục nhập dấu cách và ký tự in được — liên quan trực tiếp đến #2101. https://github.com/QwenLM/qwen-code/pull/2130
9. #2277 — fix(core): preserve CRLF line endings when editing files — Giữ lại CRLF khi edit file để tránh diff lớn và thay đổi line endings không mong muốn. https://github.com/QwenLM/qwen-code/pull/2277
10. #2283 — Feat: support permission — Đề xuất hệ thống permission rule-based (ví dụ: Bash(git *), Read(./secrets/**)), cho phép kiểm soát hành vi agent chi tiết hơn. https://github.com/QwenLM/qwen-code/pull/2283

Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Kiểm soát quyền/permission chi tiết cho agent: rule-based permissions (PR #2283) để hạn chế tool/đường dẫn/domaind.  
- Môi trường VS Code: tuỳ chọn đặt chat panel (primary/secondary sidebar), icon/quick-launch trong side panel và nhiều vị trí chat (đã có PR cải tiến sidebar). (Issue #1870, PR #2188)  
- Cải thiện thao tác file/ACP: tự fallback khi ACP trả lỗi path, validate path trước khi gọi ACP, ánh xạ lỗi ENOENT → RESOURCE_NOT_FOUND (PRs #2295, #2305, #2291, #2298).  
- CLI/terminal input robustness: sửa lỗi nhận dấu cách/terminal CSI-u (PR #2130), chặn Tab khi streaming (PR #2211).  
- Công cụ hỗ trợ di chuyển cấu hình: skill migrate-to-qwen giúp chuyển config từ công cụ khác (PR #2288).  
- Tiện ích thao tác nội dung: xóa lịch sử chat trong CLI, @-completion cho đường dẫn file trong lệnh, dán ảnh từ clipboard vào chat (Issues #1902, #2055, #1951).

Điểm đau của nhà phát triển (tóm tắt)
- Input/terminal: lỗi nhập dấu cách và chuỗi CSI-u (kitty) gây mất khả năng gõ; Tab có thể làm gián đoạn streaming — đã có PR khắc phục, nhưng còn cần kiểm thử rộng trên terminal đa dạng. (Refs: #2101, PR #2130, PR #2211)  
- Thao tác file trên Windows & ACP: nhiều lỗi liên quan đến đường dẫn, symlink, ENOENT, và chuyển đổi CRLF → LF; người dùng Windows gặp nhiều trường hợp không tạo/ghi file. PRs hiện tập trung vào validate path, fallback và ánh xạ lỗi. (Refs: #2229, PR #2305, PR #2295, PR #2298, PR #2286)  
- Tool execution reliability: bash tool failures, read tool looping, OOM crashes ảnh hưởng trực tiếp vận hành agent — cần log và repro rõ để fix. (Refs: #2012, #2201, #2004)  
- Auth & session stability: lỗi auth (missing API key -> settings bị ghi đè), session creation failures khiến agent không kết nối; cần cải thiện UX/kiểm tra trước khi ghi settings. (Refs: #2049, #2297, #2258)  
- Throttling & phụ thuộc dịch vụ bên ngoài: WebSearch bị 429/THROTTLING.userQPSLimit làm gián đoạn chức năng tìm kiếm — cần cơ chế backoff/retry/ttl. (Ref: #2191)

Tài nguyên nhanh
- Repo: https://github.com/QwenLM/qwen-code
- Changelog nightly: https://github.com/QwenLM/qwen-code/compare/v0.12.1...v0.12.1-nightly.20260312.2a836639

Kết luận ngắn gọn
- Bản 0.12.1 đã xử lý nhiều lỗi thiết yếu; cộng đồng đang tập trung vào ổn định thao tác file/ACP, trải nghiệm VS Code và robustness của input/terminal. Nếu bạn đang gặp các lỗi nêu trên, vui lòng kèm logs và môi trường reproducible khi mở issue/PR để tăng tốc xử lý.

Nếu muốn, tôi có thể:
- Soạn mẫu issue/bug-report chuẩn cho từng lỗi phổ biến (space input, ACP path, read-loop).  
- Tổng hợp các commits/patches liên quan để làm checklist release.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*