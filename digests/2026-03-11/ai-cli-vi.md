# Bản tin Cộng đồng Công cụ AI CLI 2026-03-11

> Thời gian tạo: 2026-03-11 01:53 UTC | Công cụ: 7

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

Dưới đây là báo cáo so sánh chéo ngắn gọn, chuyên nghiệp (dữ liệu trích từ bản tin cộng đồng 2026-03-11 bạn cung cấp).

1) Tổng quan hệ sinh thái
- Các CLI AI hiện đang chuyển từ giai đoạn “tăng tính năng nhanh” sang “ổn định và mở rộng hệ sinh thái”: song song với nhiều PR tính năng (plugins, plan/approval, voice/vis), cộng đồng đang thúc đẩy fixes về UX TUI/terminal, tương thích OS (đặc biệt Windows) và kiểm soát chi phí/token.  
- Trọng tâm thực tế: (1) orchestration/agent patterns (subagents, hooks, skills), (2) trải nghiệm CLI/TUI mượt mà (vim motions, cursor, paste/space, resize), và (3) độ tin cậy (session stability, auth/MCP, memory/CPU leaks, token waste).

2) So sánh mức độ hoạt động
(Tổng hợp các mục “Issues nóng” / “PRs đáng chú ý” trong bản tin; “Release” = có release mới trong 24h hay nightly được nhắc)

Tool | #Issues nổi bật | #PRs nổi bật (như báo cáo) | Release (hôm nay)
---|---:|---:|---
Claude Code | 10 | 10 | Không có release mới (vấn đề nghiêm trọng: #16157 — 1231 comments)
Gemini CLI | 10 | 10 | Có: v0.33.0-preview.15 + v0.34.0-nightly
GitHub Copilot CLI | 10 | 2 (mới 24h) | Có: v1.0.4-0
Kimi Code CLI | 10 | 10 | Có: 1.19.0 (vừa phát hành)
OpenCode (AnomalyCo) | 10 | 10 | Không có release mới
Qwen Code | 10 | 10 | Có nightly v0.12.1
OpenAI Codex | N/A (tóm tắt thất bại) | N/A | N/A

Ghi chú: con số “nổi bật” là mức độ đề cập trong từng bản tin (chọn 10 issues/PRs tiêu biểu mỗi repo); Claude Code có thread cực lớn về quota (#16157 — 1231 bình luận) thể hiện áp lực cộng đồng.

3) Hướng tính năng chung (xuất hiện ở nhiều cộng đồng)
- Orchestration / Subagents & Isolation
  - Xuất hiện: Gemini (subagents isolation #21901), Copilot (sub-agent support), Opencode (plugin/agent context), Qwen (skills in .agents).  
  - Nhu cầu: tách công cụ/permission giữa agent và subagent, isolation để tránh leak tool access.
- Hooks / Plugins / Skills管理
  - Xuất hiện: Claude Code (plugin ecosystem), Qwen (hooks #2203, skills whitelist #2255), OpenCode (plugin SDK mở rộng).  
  - Nhu cầu: lifecycle hooks, plugin SDK với auth/route/context, whitelist/blacklist cho governance.
- Plan mode / Approval / Undo / Rewind
  - Xuất hiện: Kimi (plan mode v1.19.0), Gemini (plan mode issues/PRs), Qwen (rollback/rewind request), Claude (workflow plugins).  
  - Nhu cầu: chế độ “phê duyệt trước khi ghi”, undo/rollback để an toàn khi agent sửa mã.
- Terminal / TUI polish (paste, space, vim motions, cursor, resize flicker)
  - Xuất hiện: Copilot, Gemini, Qwen, OpenCode, Kimi.  
  - Nhu cầu: fix auto-scrolling, paste ảnh/clipboard, spacebar/paste trên Windows, vim motions, flicker-free resize, cursor config.
- Auth / MCP / OAuth / SSO robustness
  - Xuất hiện: Gemini (MCP OAuth), Copilot (installer GITHUB_TOKEN SSO), Qwen (MCP scopes RFC fix), Kimi/OpenCode (MCP connect).  
  - Nhu cầu: robust token refresh, graceful credential deletion, clear OAuth flows for plugin-sourced MCP.
- Session persistence / cross-device sync / visualization
  - Xuất hiện: Copilot (cloud-synced sessions request), Kimi (session vis), OpenCode/Qwen (session reliability).  
  - Nhu cầu: session sync, tracing/visualization, prevent lost sessions across git ops.
- Cost / token management
  - Xuất hiện: Claude (token waste system prompt), Qwen (token runaway), Gemini/Kimi mention token/context compaction.  
  - Nhu cầu: giảm waste system prompts, transparent quotas, compaction correctness for large-context models.

4) Phân tích khác biệt hóa (trọng tâm, người dùng mục tiêu, hướng kỹ thuật)
- Claude Code
  - Trọng tâm: tính năng plugin/agent mạnh nhưng đang bị ảnh hưởng bởi vấn đề stability & chi phí (token waste) và lỗi nền tảng nghiêm trọng (BSOD).  
  - Người dùng: dev/researcher cần automation sâu, trả phí Max bị ảnh hưởng.  
  - Kỹ thuật: cần fixes cấp cao về quota/telemetry và hardening TUI.
- Gemini CLI (Google)
  - Trọng tâm: agent orchestration (subagents, plan mode), TUI polish, auth/MCP compatibility; phát hành nhanh (nightlies/preview).  
  - Người dùng: người dùng cần workflow agent phức tạp, doanh nghiệp quan tâm auth.  
  - Kỹ thuật: nhiều patch cherry‑pick; mạnh ở UX TUI và policy/tooling integration.
- GitHub Copilot CLI
  - Trọng tâm: điều khiển agent (reasoning-effort, ask permission), doanh nghiệp/installer (SSO/Token), và trải nghiệm terminal.  
  - Người dùng: developer/enterprise, tight GitHub integration.  
  - Kỹ thuật: chú trọng installer robustness và quản lý quyền.
- Kimi Code CLI
  - Trọng tâm: plan mode & session visualization, stream stability; nhanh lặp feature cho workflows phê duyệt.  
  - Người dùng: teams cần phê duyệt thay đổi và trace session.  
  - Kỹ thuật: đầu tư vào tracing backend/frontend (FastAPI + React).
- OpenCode (AnomalyCo)
  - Trọng tâm: TUI/terminal ổn định và broad provider compatibility (Grok, Qwen, Minimax, GPT).  
  - Người dùng: người dùng đa-provider, dev dùng tmux/terminal phức tạp.  
  - Kỹ thuật: fix leaks, streaming/FPS, session reconstruction.
- Qwen Code
  - Trọng tâm: Windows/terminal platform bugs (space/paste/write_file), hooks/skills quản lý và provider config refactor.  
  - Người dùng: dev dùng Windows/IDE integration, multi-provider setups.  
  - Kỹ thuật: hotfixes Windows PTY, input handling và hooks API.
- OpenAI Codex
  - Báo cáo không có dữ liệu (tóm tắt thất bại) — cần cập nhật nguồn trước khi so sánh.

5) Động lực & độ trưởng thành của cộng đồng
- Hoạt động nhất / ảnh hưởng lớn nhất: Claude Code (thread #16157 có >1k bình luận cho thấy vấn đề ảnh hưởng rộng), Gemini (nhanh release/nightly + nhiều PR patch), OpenCode/Opencode và Qwen đều có hoạt động mạnh về fixes/PRs chuyên sâu.  
- Lặp nhanh (release cadence / nightlies): Gemini (preview + nightly), Qwen (nightly), Kimi & Copilot đều có bản release gần đây — cho thấy cadence nhanh ở các team có CI/nightly.  
- Cộng đồng hướng feature vs bugfix: Claude & OpenCode đang bị kéo về bugfix/stability; Gemini/Copilot/Kimi vẫn song hành feature rollout + hotfixes.

6) Tín hiệu xu hướng & khuyến nghị cho nhà phát triển/ra quyết định
- Xu hướng ngành:
  - Agent orchestration (subagents, skills/hooks) + governance (whitelist/blacklist, permission model) sẽ là tiêu chuẩn tiếp theo.  
  - UX CLI/TUI là rào cản chấp nhận: terminal polish (paste, space, vim motions, flicker-free) và Windows/PTY compatibility quyết định trải nghiệm developer.  
  - Observability cho agent (session tracing, event logs, compaction telemetry) cần thiết để debug và kiểm soát chi phí.  
  - Auth/MCP/SSO robustness là yêu cầu bắt buộc cho doanh nghiệp và plugin ecosystems.  
  - Cost control (token-waste mitigation, transparent quotas) trở thành priority nếu muốn retention trả phí.
- Hành động đề xuất (ngắn gọn, ưu tiên):
  1. Ưu tiên triage: fixes gây mất an toàn/OS crash (BSOD), token runaway, terminal freeze — những lỗi này phá hoại adoption.  
  2. Đầu tư vào observability: session traces, token/compaction metrics, tool_call/ tool_result logging — giảm thời gian debug cho cả dev và maintainers.  
  3. Chuẩn hóa hooks/sdk: xác định contract (agentId, parentAgent, auth info) để plugin ecosystem mở rộng an toàn.  
  4. Terminal compatibility matrix & regression tests: Windows Terminal, tmux, VS Code integrated terminal; thêm E2E cho paste/space/pty.  
  5. Auth flows & installer hardening: SSO/SSO-fallback, OAuth prompt invariant cho plugin-sourced MCPs.  
  6. Rõ ràng về quota/UX cho người trả phí: minh bạch limits, tooling báo trước khi sắp hết quota.

Kết luận ngắn: nếu phải ưu tiên cho roadmap 1–3 tháng: (A) chặn các lỗi an toàn/OS và token-runaway; (B) cải thiện auth/MCP & installer cho doanh nghiệp; (C) chuẩn hóa hooks/plugins và build observability/session tracing để hỗ trợ scale và giảm chi phí debug. Những đầu tư này tối ưu cho cả trải nghiệm developer lẫn khả năng mở rộng hệ sinh thái.

Nếu cần, tôi có thể:
- xuất checklist ưu tiên (triage + test cases) cho từng repo (Claude/Gemini/Copilot/Qwen/Kimi/OpenCode), hoặc  
- soạn template bug-report / telemetry schema gợi ý để thu thập log hữu dụng từ người dùng (terminal, pty, auth, token).

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nổi bật Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

Dưới đây là báo cáo điểm nổi bật của cộng đồng Claude Code Skills (dữ liệu tới 2026-03-11).

1) Xếp hạng Skills hot (5–8 PR được quan tâm nhất)
- 1. document-typography — Prevent common typographic problems in generated documents  
  - Chức năng: kiểm soát chất lượng typographic (orphan/widow, numbering misalignment) cho tài liệu do AI tạo.  
  - Điểm nổi bật thảo luận: giải quyết một vấn đề thường gặp trong đầu ra văn bản (độ tin cậy hiển thị/ấn phẩm).  
  - Trạng thái: OPEN  
  - Link: https://github.com/anthropics/skills/pull/514

- 2. shodh-memory — persistent context for AI agents  
  - Chức năng: hệ thống memory bền vững cho agent, hướng dẫn khi gọi `proactive_context` và cấu trúc nhớ.  
  - Điểm nổi bật thảo luận: đáp ứng nhu cầu lớn về giữ ngữ cảnh liên phiên; liên quan trực tiếp tới nhiều issue yêu cầu “persistent memory”.  
  - Trạng thái: OPEN  
  - Link: https://github.com/anthropics/skills/pull/154

- 3. record-knowledge — persist knowledge across sessions  
  - Chức năng: lưu tri thức/ghi chú Claude dưới dạng Markdown trong `.claude/knowledge/entries/` để tái sử dụng.  
  - Điểm nổi bật thảo luận: pragmatic workaround cho vấn đề mất ngữ cảnh giữa các session; kết nối với nhu cầu người dùng về “remembering fixes/workarounds”.  
  - Trạng thái: OPEN  
  - Link: https://github.com/anthropics/skills/pull/521

- 4. plan-task — persist multi-step plans and progress  
  - Chức năng: lưu kế hoạch và tiến độ task dưới dạng Markdown (.claude/tasks/), hỗ trợ chế độ Git-tracked.  
  - Điểm nổi bật thảo luận: nhu cầu quản lý tiến độ công việc liên phiên, tích hợp workflow sản xuất.  
  - Trạng thái: OPEN  
  - Link: https://github.com/anthropics/skills/pull/522

- 5. skill-quality-analyzer & skill-security-analyzer (marketplace meta-skills)  
  - Chức năng: công cụ phân tích chất lượng skill theo nhiều tiêu chí (docs, testing, security, v.v.).  
  - Điểm nổi bật thảo luận: cung cấp tiêu chuẩn kiểm duyệt/đánh giá chất lượng cho cộng đồng tạo Skill.  
  - Trạng thái: OPEN (example-skills)  
  - Link: https://github.com/anthropics/skills/pull/83

- 6. frontend-design — improve clarity/actionability of frontend skill  
  - Chức năng: chỉnh sửa frontend-design skill để trở nên cụ thể, có thể thực thi trong một conversation.  
  - Điểm nổi bật thảo luận: tập trung vào token-efficiency và khả năng thực thi thực tế của skill.  
  - Trạng thái: OPEN  
  - Link: https://github.com/anthropics/skills/pull/210

- 7. ODT skill — OpenDocument create/fill/parse  
  - Chức năng: tạo và điền template .odt, phân tích ODT → HTML (hỗ trợ LibreOffice/OOXML tương thích).  
  - Điểm nổi bật thảo luận: nhu cầu tương tác tốt với định dạng văn bản chuẩn mở, tăng khả năng tương tác với công cụ văn phòng.  
  - Trạng thái: OPEN  
  - Link: https://github.com/anthropics/skills/pull/486

- 8. codebase-inventory-audit — codebase cleanup & audit  
  - Chức năng: workflow 10 bước để phát hiện mã thừa, file không dùng, thiếu docs, produce CODEBASE-STATUS.md.  
  - Điểm nổi bật thảo luận: nhu cầu tự động hoá audit codebase, duy trì kho mã lớn.  
  - Trạng thái: OPEN  
  - Link: https://github.com/anthropics/skills/pull/147

2) Xu hướng nhu cầu cộng đồng (tóm tắt hướng Skill mới được mong đợi)
- Persistence & memory: lưu ngữ cảnh, ghi nhớ tri thức, kế hoạch và tiến độ (shodh-memory, record-knowledge, plan-task; nhiều issue liên quan).  
- Developer tooling & quality: công cụ kiểm tra/đánh giá Skill (skill-quality-analyzer), cải tiến skill-creator để phù hợp best-practice, UTF-8/encoding robustness.  
- Document fidelity & interoperability: xuất/nhập định dạng văn phòng (docx/ODT), giữ nguyên XML/whitespace, typographic quality.  
- Security & governance: ranh giới tin tưởng với skills dưới namespace anthropic/, agent governance patterns, policy/audit.  
- Reliability & API/Platform fixes: xử lý lỗi upload/404/500, hoạt động với Bedrock và các runtime khác, MCP/tool integration.  
- Accessibility & standards: a11y-auditor, chuẩn hoá content/standards cho marketplace.

(Tham khảo nhiều issue liên quan: https://github.com/anthropics/skills/issues/62, /202, /492, /189, /406, /61, /29)

3) Skills tiềm năng cao chưa merge (lý do tiềm năng)
- shodh-memory — đáp ứng nhu cầu giữ context liên phiên; high-impact cho agent workflows. (OPEN)  
  Link: https://github.com/anthropics/skills/pull/154

- record-knowledge — giải pháp đơn giản, hữu dụng để ghi nhớ tri thức người dùng; khả năng áp dụng nhanh. (OPEN)  
  Link: https://github.com/anthropics/skills/pull/521

- plan-task — giải quyết vấn đề multi-step persistence; hữu ích cho productivity use-cases. (OPEN)  
  Link: https://github.com/anthropics/skills/pull/522

- document-typography — khắc phục lỗi hiển thị phổ biến trong đầu ra văn bản; dễ thấy nhu cầu từ người dùng tạo tài liệu. (OPEN)  
  Link: https://github.com/anthropics/skills/pull/514

- skill-quality-analyzer / skill-security-analyzer — cung cấp bộ công cụ đánh giá bắt buộc cho marketplace, có khả năng nâng chuẩn chất lượng. (OPEN)  
  Link: https://github.com/anthropics/skills/pull/83

- ODT skill — tăng khả năng tương tác với hệ sinh thái văn phòng mã nguồn mở; có tính tương tác rộng. (OPEN)  
  Link: https://github.com/anthropics/skills/pull/486

(Lý do chọn: các PR này trực tiếp khắc phục pain-point được cộng đồng nêu trong issues hoặc mở rộng khả năng tích hợp/độ tin cậy.)

4) Nhận định hệ sinh thái Skills (1 câu)
Cộng đồng tập trung mạnh vào: duy trì ngữ cảnh/persistence (memory, tasks), cải thiện chất lượng và độ tin cậy của Skill (testing/quality/security), và tương tác chính xác với tài liệu/định dạng/flow sản xuất — tức là ưu tiên cho tính thực dụng, bền vững và an toàn trong workflows của Claude Code.

Tài nguyên nhanh (một số link tham khảo từ báo cáo):  
- PR tiêu biểu: https://github.com/anthropics/skills/pull/514, /154, /521, /522, /83, /210, /486, /147  
- Issues tiêu biểu: https://github.com/anthropics/skills/issues/62, /202, /492, /189, /406

Nếu cần, tôi có thể xuất bản bản tóm tắt này dưới dạng PDF/Markdown kèm links đầy đủ và đề xuất ưu tiên triển khai theo ảnh hưởng người dùng.

---

Bản tin cộng đồng Claude Code — 2026-03-11

1) Điểm nổi bật hôm nay
- Vấn đề lớn nhất tiếp tục là khiếu nại về giới hạn sử dụng cho người đăng ký Max (Issue #16157) — thread rất lớn (1231 bình luận) và đang kéo theo nhiều báo cáo liên quan tới tính toán quota/chi phí. Xem chi tiết: https://github.com/anthropics/claude-code/issues/16157
- Một loạt lỗi nền tảng và CLI nghiêm trọng đang được báo cáo: từ khóa hệ thống tiêu tốn token quá nhiều (#8245), khóa terminal khi bấm ESC (#4805), đến BSOD Windows khi chạy phiên Claude Code (#30137). Đây là những vấn đề ảnh hưởng trực tiếp tới trải nghiệm phát triển. Các link ở phần Issues bên dưới.

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua — bỏ qua phần chi tiết phát hành.

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #16157 — [BUG] Instantly hitting usage limits with Max subscription  
  Tác giả: @deqrocks — Bình luận: 1231, 👍: 541. Tại sao quan trọng: thread lớn nhất, ảnh hưởng tới người trả phí Max; nhiều báo cáo trùng lặp và yêu cầu minh bạch quota/giải pháp cấp bách. https://github.com/anthropics/claude-code/issues/16157

- #8756 — [BUG] max_tokens must be greater than thinking.budget_tokens  
  Tác giả: @solace-rcampbell — Bình luận: 38, 👍: 33. Tại sao quan trọng: lỗi tham số API có thể phá vỡ tích hợp Bedrock / model orchestration trong môi trường production. https://github.com/anthropics/claude-code/issues/8756

- #8245 — [BUG] System prompt wastes >10k tokens on large git repos that cannot be disabled  
  Tác giả: @verbraucher — Bình luận: 18, 👍: 10. Tại sao quan trọng: gây lãng phí token/chi phí lớn cho dự án lớn; ảnh hưởng trực tiếp tới khả năng sử dụng lâu dài và tính kinh tế của công cụ. https://github.com/anthropics/claude-code/issues/8245

- #4805 — [BUG] ESC Key Causes Complete Terminal Freeze in Claude Code  
  Tác giả: @pm0code — Bình luận: 15, 👍: 11. Tại sao quan trọng: lỗi giao diện TUI làm mất work-in-progress và buộc kill tiến trình — mức độ nghiêm trọng cao cho người dùng CLI. https://github.com/anthropics/claude-code/issues/4805

- #30137 — [BUG] Claude Code sessions cause Windows kernel BSODs (0x139, 0x1E, 0x50)  
  Tác giả: @joe-hireable — Bình luận: 7. Tại sao quan trọng: crash cấp kernel trên Windows là sự cố an toàn nghiêm trọng, yêu cầu điều tra hệ thống và hướng dẫn tạm thời cho Windows users. https://github.com/anthropics/claude-code/issues/30137

- #29583 — [BUG] Cowork: Cannot use folders outside home directory on Windows (secondary drive)  
  Tác giả: @juanyepes-softwareone — Bình luận: 34, 👍: 27. Tại sao quan trọng: giới hạn đường dẫn làm giảm tính khả dụng cho dev dùng multi-drive trên Windows; ảnh hưởng trải nghiệm Cowork. https://github.com/anthropics/claude-code/issues/29583

- #28951 — [BUG] Remote control (/rc) not supported in VS Code extension  
  Tác giả: @arigon — Bình luận: 34, 👍: 22. Tại sao quan trọng: tích hợp VS Code thiếu tính năng Remote Control gây rào cản cho workflow IDE. https://github.com/anthropics/claude-code/issues/28951

- #17688 — [BUG] Skill-scoped hooks defined in SKILL.md frontmatter are not triggered within plugins  
  Tác giả: @yansfil — Bình luận: 17, 👍: 20. Tại sao quan trọng: plugin authoring break — hook scope không hoạt động đúng, ảnh hưởng hệ sinh thái plugin/automation. https://github.com/anthropics/claude-code/issues/17688

- #33022 — [BUG] Chrome integration: MCP server does not connect to browser bridge socket  
  Tác giả: @EyanGoldman — Bình luận: 2. Tại sao quan trọng: phá vỡ tích hợp trình duyệt (Chrome MCP), ảnh hưởng tính năng in-browser và extension workflows. https://github.com/anthropics/claude-code/issues/33022

- #33030 — [BUG] Command history navigation truncates draft input — saves only first few lines, loses the rest  
  Tác giả: @arbind — Bình luận: 1. Tại sao quan trọng: mất dữ liệu soạn thảo dài khi duyệt lịch sử lệnh — UX tồi đối với người soạn prompt/phức tạp. https://github.com/anthropics/claude-code/issues/33030

4) Tiến độ PR quan trọng (10 PR đáng chú ý)
- #32408 — Add Paper Writing Plugin with guided academic argument development  
  Tác giả: @dkfqdf. Tính năng: plugin hướng dẫn quy trình viết bài khoa học 6 giai đoạn — mở rộng hệ sinh thái cho người nghiên cứu. https://github.com/anthropics/claude-code/pull/32408

- #33015 — feat: Add tmp-cleanup plugin to mitigate /tmp file leak (#8856)  
  Tác giả: @qbit-glitch. Tính năng: plugin dọn file /tmp bị rò rỉ do Bash tool — cải thiện stability và disk hygiene. https://github.com/anthropics/claude-code/pull/33015

- #33007 — fix(hookify): correct field mapping for stop and prompt events  
  Tác giả: @daniel-dallimore. Sửa lỗi: mapping sự kiện trong hookify, fix lỗi logic gây rule matching sai. https://github.com/anthropics/claude-code/pull/33007

- #33006 — fix(code-review): align README with actual workflow and document required permissions  
  Tác giả: @daniel-dallimore. Sửa lỗi tài liệu và quyền cần thiết cho plugin code-review — giảm nhầm lẫn cho contributor. https://github.com/anthropics/claude-code/pull/33006

- #32980 — feat: add /create-test command and plugin  
  Tác giả: @Fabien83560. Tính năng: plugin tự động sinh unit tests (đa ngôn ngữ: JS/TS/Python/Go…), tăng năng suất QA. https://github.com/anthropics/claude-code/pull/32980

- #32979 — feat: add explain-architecture plugin  
  Tác giả: @Fabien83560. Tính năng: quét repo, build dependency graph, xuất Mermaid/PlantUML/JSON — hữu ích cho onboarding và tài liệu kiến trúc. https://github.com/anthropics/claude-code/pull/32979

- #32943 — Validate plugin catalog in CI  
  Tác giả: @Atman36. Cải tiến CI: validator cho catalogue plugin để ngăn metadata/manifest bị thiếu — nâng độ tin cậy marketplace. https://github.com/anthropics/claude-code/pull/32943

- #32931 — fix: resolve hookify rules from the project root  
  Tác giả: @Atman36. Sửa lỗi: discovery rule từ root repo thay vì cwd — tránh thất lạc rule khi chạy từ thư mục con. https://github.com/anthropics/claude-code/pull/32931

- #32894 — feat: language-orthography plugin — enforce diacritical marks for non-English languages  
  Tác giả: @alissonlinneker. Tính năng: ép chính tả có dấu cho ngôn ngữ không-ASCII — hữu ích cho đa ngôn ngữ/QA ngôn ngữ. https://github.com/anthropics/claude-code/pull/32894

- #32856 — fix: Parse actual subnet from routing table instead of assuming /24  
  Tác giả: @anshul-garg27. Sửa script devcontainer firewall để parse subnet đúng (không giả định /24) — cải thiện deploy devcontainer trên mạng non-/24. https://github.com/anthropics/claude-code/pull/32856

5) Xu hướng yêu cầu tính năng (tóm tắt)
- Tăng cường tích hợp trình duyệt / MCP (WebMCP, Chrome bridge) để mở rộng tính năng in-browser và extension workflows. (ví dụ: #30645, #33022)
- Hệ sinh thái plugin phong phú: tự động sinh unit test (/create-test), giải thích kiến trúc, viết bài khoa học — cộng đồng muốn nhiều plugin chuyên dụng cho workflow dev/research. (PRs: #32980, #32979, #32408)
- Cấu hình và kiểm soát hành vi CLI/TUI: tắt cảnh báo không mong muốn, điều chỉnh auto-scroll, tuỳ chọn cách tải skill/agent (để đảm bảo isolation dự án). (Issues: #27957, #25042, #33019)
- Quản lý tài nguyên & chi phí: giảm lãng phí token (system prompt), quản lý quota cho người đăng ký, cleanup tệp tạm. (Issues/PRs: #16157, #8245, #33015)
- Nâng cao CI/validator cho plugin/marketplace để ngăn metadata lỗi trước khi release. (PR: #32943)

6) Điểm đau của nhà phát triển (tổng hợp)
- Quản lý token/chi phí: system prompts quá dài và giới hạn usage gây tốn token hoặc tràn quota (#8245, #16157). Link: https://github.com/anthropics/claude-code/issues/8245 và https://github.com/anthropics/claude-code/issues/16157
- Ổn định nền tảng & an toàn OS: terminal freeze (ESC), kernel BSOD trên Windows, nhiều lỗi nền tảng gây mất dữ liệu/OS crash (#4805, #30137). Links: https://github.com/anthropics/claude-code/issues/4805, https://github.com/anthropics/claude-code/issues/30137
- Tương thích OS và file system: Cowork không hỗ trợ thư mục ngoài home trên Windows (secondary drive) gây hạn chế workflow đa ổ đĩa (#29583). https://github.com/anthropics/claude-code/issues/29583
- Tích hợp IDE & browser: thiếu /rc trong VS Code, MCP ↔ browser bridge flaky (#28951, #33022). https://github.com/anthropics/claude-code/issues/28951, https://github.com/anthropics/claude-code/issues/33022
- Plugin authoring & hook scoping: hook không trigger trong plugin, mapping event sai dẫn tới hành vi không mong muốn (#17688, PR #33007). https://github.com/anthropics/claude-code/issues/17688, https://github.com/anthropics/claude-code/pull/33007
- UX CLI/TUI nhỏ nhưng gây phiền toái: history navigation làm mất bản thảo, auto-scroll/copy-paste vấn đề, confirmation prompts thừa (#33030, #25042, #27957). https://github.com/anthropics/claude-code/issues/33030, https://github.com/anthropics/claude-code/issues/25042, https://github.com/anthropics/claude-code/issues/27957
- Bảo trì dev-environment: rò rỉ /tmp file và cần cleanup tự động (PR #33015). https://github.com/anthropics/claude-code/pull/33015

Kết luận ngắn: hiện tại cộng đồng đang đẩy mạnh hai hướng chính — (1) khắc phục các sự cố ổn định/chi phí nghiêm trọng (token waste, BSOD, freezes, quota) và (2) mở rộng hệ sinh thái plugin / tích hợp (tests, architecture, browser/MCP). Nếu bạn là contributor: ưu tiên cao cho fixes liên quan stability và giảm chi phí trải nghiệm người dùng; tiếp theo là PR plugin/CI để mở rộng tính năng an toàn.

— End of bulletin —

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ Tạo tóm tắt thất bại.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

Bản tin cộng đồng Gemini CLI — 2026-03-11

1) Điểm nổi bật hôm nay
- Phát hành nhanh v0.33.0-preview.15 (cherry‑pick patch) và bản nightly v0.34.0-nightly.20260310 có sửa môi trường và một số chỉnh sửa billing. Những bản này chủ yếu là các sửa lỗi vá ghép (patch/cherry‑pick) để khắc phục regressions nhỏ và hành vi OAuth/billing.
- Cộng đồng đang tập trung vào cải thiện trải nghiệm agent/subagent (isolation, UX, docs), xử lý trạng thái hủy yêu cầu (cancel/retry race), và các cải tiến giao diện TUI (vim motions, footer, plan mode).

2) Phát hành phiên bản
- v0.33.0-preview.15 — Release v0.33.0-preview.15  
  Tóm tắt: patch cherry‑pick để vá các xung đột trong chuỗi release (PR: https://github.com/google-gemini/gemini-cli/pull/21952).  
  Full changelog: https://github.com/google-gemini/gemini-cli/compare/v0.33.0-preview.14...v0.33.0-preview.15
- v0.34.0-nightly.20260310.4653b126f — Release v0.34.0-nightly.20260310.4653b126f  
  Tóm tắt: whitelist biến môi trường TERM và COLORTERM trong environment sanitization (fix UI/terminal), + fix lifecycle/setting của overage strategy trong billing (PRs: https://github.com/google-gemini/gemini-cli/pull/20514 và các PR billing liên quan).

3) Issues nóng trong cộng đồng (10 mục, vì sao quan trọng & phản ứng)
- #18708 — feat: Add /undo command to revert last conversation turn  
  Vì sao quan trọng: Tính năng cơ bản cho workflow lặp/truy vấn với LLM trên CLI; tránh "ô nhiễm" context. Phản ứng: nhiều bình luận (9), +1 vote. Link: https://github.com/google-gemini/gemini-cli/issues/18708
- #20549 — Fix issue exiting plan mode because of wrong plans path (priority/p1)  
  Vì sao quan trọng: Plan mode bị kẹt ảnh hưởng trực tiếp UX và launch readiness; priority/p1. Phản ứng: 7 bình luận. Link: https://github.com/google-gemini/gemini-cli/issues/20549
- #18895 — CLI cannot use fresh token in MCP OAuth  
  Vì sao quan trọng: OAuth/mcp token flow lỗi gây mất khả năng tích hợp với private MCPs; ảnh hưởng auth reliability. Phản ứng: 6 bình luận. Link: https://github.com/google-gemini/gemini-cli/issues/18895
- #21925 — Hand icon shows action required even when not required  
  Vì sao quan trọng: Thông báo sai lệch gây nhầm người dùng, nhất là khi shell scripts chạy lâu; có ảnh chụp minh hoạ. Phản ứng: 2 bình luận. Link: https://github.com/google-gemini/gemini-cli/issues/21925
- #21461 — Shell Command does not support aliases  
  Vì sao quan trọng: Người dùng mong alias shell tiêu chuẩn (bash/zsh) hoạt động; ảnh hưởng lớn đến workflow tích hợp shell. Phản ứng: 2 bình luận. Link: https://github.com/google-gemini/gemini-cli/issues/21461
- #20886 — Refine subagents UX  
  Vì sao quan trọng: Subagents là trọng tâm mới; UX trực quan sẽ quyết định chấp nhận tính năng. Phản ứng: 2 bình luận. Link: https://github.com/google-gemini/gemini-cli/issues/20886
- #21901 — [Subagents] Add mechanism for isolating the tools of subagents from the main agent  
  Vì sao quan trọng: Isolate toolsets để tránh tác động không mong muốn giữa agent và subagent (bảo mật & quản lý). Phản ứng: 1 bình luận. Link: https://github.com/google-gemini/gemini-cli/issues/21901
- #21432 — Improve Agent "Self-Awareness": Accurate CLI Flags, Hotkeys, and Self-Execution  
  Vì sao quan trọng: Giúp agent đưa hướng dẫn chính xác về cách hoạt động/khởi chạy chính nó — tăng độ tin cậy khi agent tư vấn cho người dùng. Phản ứng: 1 bình luận. Link: https://github.com/google-gemini/gemini-cli/issues/21432
- #21421 — Gemini CLI should periodically reflect on the trajectory and recommend creation/update of skills  
  Vì sao quan trọng: Tự động đề xuất kỹ năng/skill updates giúp duy trì hiệu quả dài hạn của agent. Phản ứng: 1 bình luận, +1 vote. Link: https://github.com/google-gemini/gemini-cli/issues/21421
- #21924 — High performance and flicker free behavior on terminal resize  
  Vì sao quan trọng: Resize flicker ảnh hưởng UX TUI; yêu cầu thay đổi render strategy (RenderStatic, batch updates). Phản ứng: 0 bình luận (mới), nhưng technical. Link: https://github.com/google-gemini/gemini-cli/issues/21924

4) Tiến độ PR quan trọng (10 PRs, mô tả ngắn)
- #21932 — feat(ui): add missing vim mode motions (X, ~, r, f/F/t/T, df/dt and friends)  
  Nội dung: Bổ sung các motion của vim normal mode giúp editor tích hợp trong CLI trực quan hơn. Link: https://github.com/google-gemini/gemini-cli/pull/21932
- #21168 — [DRAFT] feat(plan): support clearing conversation context on plan approval  
  Nội dung: Cho phép xóa chọn lọc context (terminal UI + LLM history) sau khi approve plan — giảm "noise" lưu trữ token. Link: https://github.com/google-gemini/gemini-cli/pull/21168
- #18499 — feat: Add voice input with pluggable backend (Gemini zero-install + Whisper)  
  Nội dung: Thêm voice input với backend plugin — mặc định dùng `gemini` zero‑install, tùy chọn local `whisper`. Tính năng quan trọng cho accessibility & zero‑install UX. Link: https://github.com/google-gemini/gemini-cli/pull/18499
- #21781 — fix(cli): resolve duplicate footer on tool cancel via ESC (#21743)  
  Nội dung: Khắc phục footer bị duplicated khi hủy tool confirmation bằng ESC (giải quyết visual glitch trong plan/tool flow). Link: https://github.com/google-gemini/gemini-cli/pull/21781
- #21960 — fix(cli): clear stale retry/loading state after cancellation (#21096)  
  Nội dung: Vá race condition: sau khi cancel (Esc) có thể còn trạng thái retry muộn làm UI bị "stuck loading". PR xóa trạng thái lỗi thời để GUI phản ánh đúng. Link: https://github.com/google-gemini/gemini-cli/pull/21960
- #21951 — fix(acp): send tool_call session update before request_permission  
  Nội dung: Trong ACP mode, đảm bảo gửi tool_call session update trước khi request_permission để backend và UI có thứ tự sự kiện chính xác. Link: https://github.com/google-gemini/gemini-cli/pull/21951
- #21949 — fix(core): handle missing credentials gracefully in deleteCredentials  
  Nội dung: Ngăn throw khi xoá credential không tồn tại (Keychain/File token storages) để tránh cascade error trong re-auth flows. Link: https://github.com/google-gemini/gemini-cli/pull/21949
- #21947 — fix(a2a): add missing return after 501 in /tasks/metadata endpoint  
  Nội dung: Thêm return để tránh gửi response thứ hai và crash khi dùng non-InMemory task store (stability bugfix cho server). Link: https://github.com/google-gemini/gemini-cli/pull/21947
- #21950 — test(core): add dedicated unit tests for stableStringify  
  Nội dung: Thêm 28 unit tests cho stableStringify (security‑critical utility cho policy rule matching) — tăng độ tin cậy. Link: https://github.com/google-gemini/gemini-cli/pull/21950
- #21963 — fix(core): strip $schema from MCP tool parameters for API compatibility  
  Nội dung: Loại bỏ $schema trong Draft 2020-12 JSON schemas để tránh lỗi khi đăng ký MCP tools; giữ validation local nhưng đảm bảo tương thích API. Link: https://github.com/google-gemini/gemini-cli/pull/21963

5) Xu hướng yêu cầu tính năng (tóm lược từ Issues)
- Subagents: isolation giữa main/subagent, UX/expander cho history, làm mặc định experiment, tài liệu đầy đủ. (Issues: #20886, #21901, #20312, #20310)
- Plan mode & workflow control: undo/ability to revert last turn, clear context on plan approval, auto-collapse task groups / accordion UI để giảm scroll noise. (Issues/PRs: #18708, #21168, #21454, #21453, #21452)
- Agent self‑improvement: periodic reflection & skill recommendation, agent self-awareness về flags/hotkeys. (Issues: #21421, #21432)
- CLI TUI polish: vim motions, customizable keybindings, 256‑color support, flicker-free resize, footer/footer duplicate fixes. (PRs & Issues: #21932, #21945, #21832, #21924, #21781)
- Auth & OAuth robustness: MCP refresh token usage, graceful credential deletion, fix fallback auth logic. (Issues/PRs: #18895, #21949, #21962)
- Tool confirmation/ACP flow correctness: ensure correct session updates order and allow safe tools while agent runs. (PRs/Issues: #21951, #20331)
- Voice input / multimodal capture: zero‑install and pluggable transcription backends. (PR: #18499)

6) Điểm đau của nhà phát triển (thường gặp)
- Race conditions khi hủy (cancel) request dẫn đến UI hiển thị sai (stuck loading / stale retry) — được phản ánh qua #21960 và #21096.
- Plan mode instability: khó thoát, render glitches (double footer, expanded plan exit), và "noisy" planning context ảnh hưởng token/chat history — nhiều issue/PR liên quan (#20549, #21743/#21781, #21168).
- OAuth/MCP token flow không ổn định: không sử dụng token mới/refresh đúng cách và lỗi khi xóa credential gây cascade error (#18895, #21949, #21962).
- Subagent/tool isolation và UX chưa hoàn thiện: rủi ro bảo mật/không mong muốn khi share tool giữa agent/subagent; thiếu docs và controls (#21901, #20310, #20312).
- TUI rendering/performance: flicker khi resize, màu terminal an toàn cho 256‑color, và thiếu một số motions/keybindings gây trải nghiệm không mượt (#21924, #21832, #21932).
- MCP schema compatibility: Draft 2020-12 $schema gây lỗi khi gửi tool declarations — cần strip để tương thích API (#21963).
- Thiếu coverage cho code quan trọng (policy utils) — đang được khắc phục bằng unit tests (#21950).

Kết luận ngắn
- Hiện tại ưu tiên là ổn định UX/flow (plan mode, cancel/race fixes), hoàn thiện subagent (isolation + docs), và vá những lỗi auth/compatibility nhỏ. Nhiều PR nhỏ (patch/cherry‑pick) đang liên tục được merge để giữ chuỗi release sạch trước các tính năng lớn (voice input, refreshed UX, subagents).

Tìm hiểu thêm / theo dõi
- Repo: https://github.com/google-gemini/gemini-cli
- Một số link đã dẫn trong từng mục — mở để đọc chi tiết issue/PR.

Nếu cần, tôi có thể tóm tắt chi tiết kỹ thuật cho một Issue hoặc PR cụ thể (root cause, patch đề xuất, ảnh hưởng).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

1) Điểm nổi bật hôm nay
- Phát hành v1.0.4-0 (xem phần Phát hành) thêm flag điều chỉnh "reasoning effort", quyền "ask" cho hooks và sub-agent mới để quản lý MCP/custom agents/skills. (Repo: https://github.com/github/copilot-cli/releases)
- Cộng đồng đang tập trung vào hai nhóm vấn đề lớn: trải nghiệm terminal (auto-scrolling / Windows Terminal / copy/paste) và độ ổn định liên quan tới kết nối/mô hình (access denied, 400/503, retry, store_memory). Nhiều báo cáo với tương tác cao, cho thấy ảnh hưởng thực tế tới người dùng.

2) Phát hành phiên bản
- v1.0.4-0 — tóm tắt chính:
  - Added:
    - --reasoning-effort CLI flag: cho phép điều chỉnh mức "nỗ lực suy luận" của agent.
    - Hooks có thể yêu cầu xác nhận người dùng trước khi chạy tool với quyết định quyền 'ask'.
    - Thêm sub-agent configure-copilot để quản lý MCP servers, custom agents và skills qua task tool.
  - Improved:
    - Faster shell (tối ưu tốc độ shell/phiên tương tác).
  - Tham chiếu: https://github.com/github/copilot-cli/releases

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #1595 Cannot access any model — @jaroslaw-buryk-lgs (tạo 2026-02-21) — Lý do quan trọng: người dùng doanh nghiệp báo không thể liệt kê/call model do "access denied by Copilot policy" trong khi subscription hợp lệ; ảnh hưởng tới khả năng sử dụng cho tài khoản Enterprise. Cộng đồng tương tác: 13 bình luận, 5 👍. Link: https://github.com/github/copilot-cli/issues/1595
- #1584 Incessant Scrolling during long running operations — @BrainSlugs83 (2026-02-21) — Lý do: auto-scrolling liên tục gây trải nghiệm tồi, có thể làm mất context/khó đọc output trên các terminal; nhiều người báo tương tự. 11 bình luận, 14 👍. Link: https://github.com/github/copilot-cli/issues/1584
- #1754 AssertionError ... followed by HTTP/2 GOAWAY (503) — @kvn8888 (2026-03-01) — Lý do: lỗi assertion sâu trong thư viện HTTP và 503 GOAWAY làm gián đoạn các nhiệm vụ dài; liên quan tới độ ổn định mạng/connection pooling. 9 bình luận, 9 👍. Link: https://github.com/github/copilot-cli/issues/1754
- #1274 CLI constantly getting 400 errors for invalid request body — @unusualbob (2026-02-04) — Lý do: nhiều request bị server trả về 400; có thể do format request từ CLI hoặc thay đổi server-side validation. Làm giảm hiệu suất debug/automation. 8 bình luận, 3 👍. Link: https://github.com/github/copilot-cli/issues/1274
- #1241 Cannot paste image from screenshot tools into CLI terminal — @timheuer (2026-02-01, updated 2026-03-11) — Lý do: paste screenshot không hoạt động trên Windows Terminal; ảnh hưởng lớn đến workflow debug bug/UI bằng ảnh. 5 bình luận, 7 👍. Link: https://github.com/github/copilot-cli/issues/1241
- #1108 Subagent Tried to Call `store_memory` And Failed — @rolledback (2026-01-25) — Lý do: store_memory tool trả lỗi “Unable to store memory”, ảnh hưởng hành vi stateful của agents (ghi nhớ). 6 bình luận, 3 👍. Link: https://github.com/github/copilot-cli/issues/1108
- #1775 Scroll position in Windows Terminal sometimes goes crazy — @danroth27 (2026-03-02) — Lý do: vấn đề auto-scroll cụ thể trên Windows Terminal, nhiều người dùng Windows báo cáo; tác động trải nghiệm lớn. 4 bình luận, 9 👍. Link: https://github.com/github/copilot-cli/issues/1775
- #1939 Dead loop on editing content — @XJTLUmedia (2026-03-10) — Lý do: session rơi vào vòng lặp/AssertionError khi chỉnh sửa nội dung; có thể gây treo CLI. 3 bình luận. Link: https://github.com/github/copilot-cli/issues/1939
- #1967 Plugin-sourced HTTP MCP servers with OAuth never trigger authorization prompt — @tmech (2026-03-11) — Lý do: plugin marketplace định nghĩa MCP servers không kích hoạt OAuth flow; plugin-based integrations bị vô hiệu hóa, ảnh hưởng mở rộng hệ sinh thái. 1 bình luận. Link: https://github.com/github/copilot-cli/issues/1967
- #1947 Feature Request: Cloud-synced sessions for cross-device continuity — @robgrame (2026-03-10) — Lý do: yêu cầu trải nghiệm cross-device (đồng bộ session), nhiều người thấy giới hạn hiện tại (local ~/.copilot) gây bất tiện. 3 bình luận. Link: https://github.com/github/copilot-cli/issues/1947

4) Tiến độ PR quan trọng (mới nhất, 24h)
- #1968 install: retry without token when authenticated requests fail — @devm33 (OPEN, 2026-03-11) — Nội dung: sửa tình huống cài đặt bị lỗi khi GITHUB_TOKEN thuộc thành viên org chưa SSO-authorized; script bây giờ thử tải với token rồi tự động retry không có token nếu có lỗi SSO/SAML. Giúp cài đặt public repo ổn định hơn trong môi trường tổ chức. Link: https://github.com/github/copilot-cli/pull/1968
- #1960 install: use GITHUB_TOKEN for authenticated GitHub requests — @devm33 (CLOSED, 2026-03-10) — Nội dung: thêm Authorization header từ GITHUB_TOKEN cho curl/wget và embed token vào git remote; giảm rate-limit và hỗ trợ tải từ repo private. Link: https://github.com/github/copilot-cli/pull/1960
- Lưu ý: Trong 24 giờ qua chỉ có 2 PR cập nhật; các PR này hướng tới cải thiện trải nghiệm cài đặt/triển khai (installer).

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Hỗ trợ paste hình ảnh/đính kèm clipboard image trực tiếp vào prompt CLI (issues #1241, #1276).
- Đồng bộ hóa session trên mây để chuyển tiếp công việc giữa thiết bị (cloud-synced sessions #1947).
- Khả năng set default model hoặc cấu hình model per-user (default model selection #1824).
- Trung tâm quản lý task/agents (central registry of tasks #1966).
- Cải thiện quyền/authorization flow cho MCP servers được cài qua plugin (plugin-sourced MCP OAuth #1967).
- Tùy chỉnh thao tác Ctrl+C (clear prompt trước vs cancel operation #1961) và cải thiện tương tác phím Enter trong chọn lựa (issue #1873 đã đóng trước đó).
- API/installer robust khi có token SSO/SAML (PRs #1968, #1960).

6) Điểm đau của nhà phát triển (tóm tắt vấn đề phổ biến)
- Truy cập mô hình & lỗi policy: người dùng Enterprise gặp "access denied" khi liệt kê/call models (#1595). Ảnh hưởng tới adopt trong tổ chức.
- Độ ổn định kết nối: 400 invalid request body, 503 GOAWAY, retry thất bại, AssertionError từ stack HTTP dẫn đến task bị hủy/nhảy retry (#1274, #1754, #1590).
- Trải nghiệm terminal bị hỏng: auto-scrolling / scroll position điên (Windows Terminal), Ctrl+Z/Windows Terminal integration, và multi-line prompt issues (#1584, #1775, #1946, #1964).
- Clipboard & encoding: không dán ảnh từ screenshot; copy/paste tiếng Trung bị garbled sau nâng cấp (#1241, #1276, #1940).
- store_memory và persistent state: công cụ lưu nhớ thất bại thường xuyên, làm giảm khả năng agents duy trì ngữ cảnh (#1108, #1751).
- Plugin & MCP ecosystem: OAuth từ plugin không kích hoạt browser prompt, MCP servers behave differently between VS Code và CLI (#1967, #1707, #1892).
- Installer / CI friction: GITHUB_TOKEN + SSO/SAML gây lỗi download/install; PRs đang cố gắng giảm friction (#1968, #1960).

Kết luận ngắn: bản phát hành v1.0.4-0 tập trung vào khả năng điều khiển agent (reasoning effort, ask permission, configure-copilot sub-agent) — một hướng đi tích cực cho tính mở rộng. Tuy nhiên cộng đồng vẫn gặp nhiều vấn đề liên quan tới trải nghiệm terminal, tính ổn định kết nối và tích hợp MCP/plugin; các PR gần đây ưu tiên gia cố quá trình cài đặt trong môi trường doanh nghiệp. Nếu bạn đang bị ảnh hưởng bởi những lỗi trên, hãy tham gia các issue đã nêu (liên kết bên trên) để cung cấp log/chi tiết môi trường — đó là thông tin hữu ích cho đội phát triển.

— Bản tin do nhà phân tích kỹ thuật dựa trên dữ liệu GitHub (github.com/github/copilot-cli) cập nhật 2026-03-11.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

Kimi Code CLI — Bản tin cộng đồng (2026-03-11)
Repo: https://github.com/MoonshotAI/kimi-cli

1) Điểm nổi bật hôm nay
- Phiên bản 1.19.0 vừa phát hành (2026-03-10): bổ sung "plan mode" cho luồng phê duyệt trước thao tác ghi và hệ thống trực quan hóa session tracing (vis). (Xem phát hành chi tiết bên dưới.)
- Một số sửa lỗi quan trọng được gộp: ngăn tái kết nối WebSocket hàng loạt trên stream session và xử lý ô nhiễm header HTTP gây lỗi kết nối tới LLM provider.

2) Phát hành phiên bản
- 1.19.0 — (bumped, release PR: https://github.com/MoonshotAI/kimi-cli/pull/1394)
  - feat: Plan mode — chế độ lập kế hoạch: LLM giới hạn ở chế độ đọc và ghi vào file kế hoạch được chỉ định; có luồng phê duyệt via ExitPlanMode, slash /plan, phím tắt Shift-Tab và nhắc nhở hệ thống định kỳ. (PR: https://github.com/MoonshotAI/kimi-cli/pull/1392)
  - feat(vis): Hệ thống trực quan hóa session tracing — backend FastAPI + frontend React, xem wire events, context, state và thống kê (PR: https://github.com/MoonshotAI/kimi-cli/pull/1391)
  - fix(web): ngăn reconnection storm cho session stream WebSocket (PR: https://github.com/MoonshotAI/kimi-cli/pull/1386)
  - Các cải tiến khác: CLI options mới, terminal notifications, sanitization header fix, ACP routing fixes (chi tiết PRs bên dưới).

3) Issues nóng trong cộng đồng (10 mục)
- #1375 [OPEN] File mentions (@) can't find the files — tác giả @sudokai (tạo 2026-03-09, cập nhật 03-10, 6 bình luận). Tầm quan trọng: autocomplete @ file bị sai ảnh hưởng UX khi tham chiếu file trong session. Link: https://github.com/MoonshotAI/kimi-cli/issues/1375
- #1382 [CLOSED] proposal: I need kimi-cli mobile connector — @tpoisonooo (03-10). Tầm quan trọng: nhu cầu truy cập session khi không có máy tính; phản ánh nhu cầu di động cao. Link: https://github.com/MoonshotAI/kimi-cli/issues/1382
- #1383 [OPEN] 多agent 并发受限 (membership supports multiple agents but concurrent limitation) — @asecret (03-10). Tầm quan trọng: vấn đề rate/limits khi chạy nhiều agent song song, ảnh hưởng quy mô workflows. Link: https://github.com/MoonshotAI/kimi-cli/issues/1383
- #1380 [OPEN] ACP terminal tool fails with 'module acp has no attribute TerminalHandle' — @gp3t1 (03-10, cập nhật 03-11). Tầm quan trọng: tích hợp ACP/terminal bị vỡ trên v1.17/1.18, ảnh hưởng trải nghiệm remote terminal automation. Link: https://github.com/MoonshotAI/kimi-cli/issues/1380
- #1389 [OPEN] HTTP Headers pollution causes LLM provider error: Connection error. — @ITdesk01 (03-10). Tầm quan trọng: lỗi kết nối LLM do giá trị header không hợp lệ, dẫn tới gián đoạn mạng/agent. Link: https://github.com/MoonshotAI/kimi-cli/issues/1389
- #1353 [CLOSED] feat: Add docx skill for reading and editing Word documents — @stevenobiajulu (03-05, closed 03-10). Tầm quan trọng: nhu cầu skill để thao tác .docx (tài liệu) bằng thuần Python; hữu ích cho workflows liên quan tài liệu. Link: https://github.com/MoonshotAI/kimi-cli/issues/1353
- #1395 [OPEN] invalid part type: video_url — @ZeusHay (03-10). Tầm quan trọng: upload/attachment video gây lỗi message validation — ảnh hưởng tính năng đa phương tiện. Link: https://github.com/MoonshotAI/kimi-cli/issues/1395
- #1390 [OPEN] error response with video attachment — @sven-ren (03-10). Tương tự #1395, nhấn mạnh vấn đề attachment video trên Windows. Link: https://github.com/MoonshotAI/kimi-cli/issues/1390
- #1388 [OPEN] kimicode trên CentOS7.9: mcp connect failed — @supsmile (03-10). Tầm quan trọng: môi trường máy chủ cũ (CentOS7) gặp lỗi kết nối MCP, ảnh hưởng người dùng enterprise/servers. Link: https://github.com/MoonshotAI/kimi-cli/issues/1388
- #1381 [OPEN] Can we provide /plan and /spec similar to trae? — @lululu233 (03-10). Tầm quan trọng: người dùng muốn lệnh /plan, /spec tương tự công cụ khác — khớp với bản phát hành plan mode. Link: https://github.com/MoonshotAI/kimi-cli/issues/1381

Ghi chú: cộng đồng phản ứng bằng các issue, comment và đề xuất PR (một số đã được đóng nhanh khi có PR tương ứng).

4) Tiến độ PR quan trọng (10 PR)
- #1394 [CLOSED] chore: bump kimi-cli to 1.19.0 (release) — https://github.com/MoonshotAI/kimi-cli/pull/1394
  - Đồng bộ phiên bản và chuyển changelog sang 1.19.0.
- #1392 [CLOSED] feat: add plan mode — https://github.com/MoonshotAI/kimi-cli/pull/1392
  - Thêm chế độ Plan: đọc + viết vào file plan, phê duyệt trước khi thực thi, slash /plan và Shift-Tab toggle.
- #1391 [CLOSED] feat(vis): add session tracing visualization system — https://github.com/MoonshotAI/kimi-cli/pull/1391
  - Hệ thống vis: FastAPI backend + React frontend, viewer cho wire events, context, session state, summaries.
- #1386 [CLOSED] fix(web): prevent WebSocket reconnection storm in session stream — https://github.com/MoonshotAI/kimi-cli/pull/1386
  - Sửa hook useSessionStream để tránh vòng tái kết nối do dependency identity không ổn định.
- #1384 [OPEN] fix: sanitize http header newline — https://github.com/MoonshotAI/kimi-cli/pull/1384
  - Loại bỏ newline trong platform.version() để tránh h11 từ chối header — giải quyết #1321/#1364/#1368.
- #1393 [OPEN] fix(acp): route shell commands through terminal args — https://github.com/MoonshotAI/kimi-cli/pull/1393
  - Sửa routing lệnh shell cho ACP: truyền command/executable và args đúng, thêm regression test cho bash/PowerShell.
- #1385 [OPEN] fix(web): refresh @ file mention index on session switch and staleness — https://github.com/MoonshotAI/kimi-cli/pull/1385
  - Reset cached file index khi đổi session và khi workspace thay đổi — giải quyết issue @ mention stale.
- #1377 [OPEN] feat: add vim-style j/k keyboard navigation for approval and question… — https://github.com/MoonshotAI/kimi-cli/pull/1377
  - Thêm điều hướng phím j/k trong UI phê duyệt/hỏi, nâng UX cho người dùng vim.
- #1376 [OPEN] feat: add --sessions/--list-sessions CLI options & fix CJK shorten — https://github.com/MoonshotAI/kimi-cli/pull/1376
  - Thêm tùy chọn list/select session tương tác; cải thiện rút ngắn text cho CJK.
- #1345 [OPEN] feat(soul): add OSC 9 terminal notifications for task completion — https://github.com/MoonshotAI/kimi-cli/pull/1345
  - Thêm thông báo terminal (OSC 9) để hiển thị notification native khi task hoàn thành hoặc cần phê duyệt.

5) Xu hướng yêu cầu tính năng
- Plan/spec workflow: nhiều đề nghị /plan, /spec và chế độ lên kế hoạch (đã triển khai 1.19.0).
- Di động / remote connector: nhu cầu "mobile connector" để tiếp tục session khi không có máy tính (#1382).
- Session management: list/select sessions trên CLI, trực quan hóa session (vis) và export/logging.
- Terminal integrations: OSC notifications, ACP terminal stability, đúng routing command/args.
- Document handling skills: hỗ trợ docx và thao tác tài liệu trong agent workflows.
- Multimodal attachments: hỗ trợ video attachments và các part types hợp lệ (video_url errors).

6) Điểm đau của nhà phát triển (tóm tắt)
- Kết nối & networking: HTTP header newline gây lỗi kết nối tới LLM provider; WebSocket reconnection storm gây tiêu tốn tài nguyên; MCP connect failures trên một số distro (CentOS7).
- Tích hợp terminal/ACP: routing command/args và thay đổi SDK breakpoints khiến terminal tool lỗi (TerminalHandle attribute); cần regression tests.
- File mention & workspace sync: index @ file bị stale khi đổi session hoặc khi workspace thay đổi — ảnh hưởng autocomplete và tốc độ làm việc.
- Multimodal/attachments: video attachments / video_url phần type validation gây lỗi runtime trên Windows và khi upload.
- Concurrency & rate limits: chạy nhiều agents song song gặp giới hạn API/rate, ảnh hưởng workflows scale-out.
- UX bàn phím & session UX: người dùng muốn thao tác nhanh (vim-style navigation, session list, notifications).

Kết luận nhanh
- 1.19.0 mang hai tính năng lớn (plan mode, vis) và một số sửa lỗi quan trọng; nhiều issue liên quan tới networking, terminal tích hợp và attachments đang được xử lý bằng PRs. Nếu bạn đang vận hành Kimi ở scale hoặc dùng nhiều agents/multimedia, ưu tiên cập nhật 1.19.0 và theo dõi PR #1384, #1393, #1385, #1386.

Tham khảo nhanh (PRs/Issues đề cập)
- Release PR 1.19.0: https://github.com/MoonshotAI/kimi-cli/pull/1394
- Plan mode: https://github.com/MoonshotAI/kimi-cli/pull/1392
- Vis: https://github.com/MoonshotAI/kimi-cli/pull/1391
- WebSocket fix: https://github.com/MoonshotAI/kimi-cli/pull/1386
- HTTP header sanitize: https://github.com/MoonshotAI/kimi-cli/pull/1384
- ACP fix: https://github.com/MoonshotAI/kimi-cli/pull/1393
- @ mention stale fix: https://github.com/MoonshotAI/kimi-cli/pull/1385
- Issues (examples): #1375 https://github.com/MoonshotAI/kimi-cli/issues/1375, #1389 https://github.com/MoonshotAI/kimi-cli/issues/1389, #1380 https://github.com/MoonshotAI/kimi-cli/issues/1380

Nếu bạn muốn, tôi có thể rút ngắn thành một changelog ngắn cho bản phát hành 1.19.0 hoặc tổng hợp các tập test/regression cần thêm dựa trên các bug report.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

OpenCode Community Bulletin — 2026-03-11

1) Điểm nổi bật hôm nay
- Không có phát hành mới trong 24 giờ qua, nhưng nhóm vẫn tích cực xử lý các vấn đề về TUI, session và tương thích model (Grok/Qwen/Minimax/GPT).  
- Nhiều PR nhắm vào ổn định session và trải nghiệm terminal (cursor, FPS, streaming) được mở/review — cho thấy trọng tâm chuyển sang độ ổn định lâu dài và trải nghiệm nhà phát triển.

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (chọn 10)
- #2072 Support for Cursor? — Tác giả: @ThallesP — Cập nhật: 2026-03-10 — Bình luận: 58 — 👍: 127  
  https://github.com/anomalyco/opencode/issues/2072  
  Tại sao quan trọng: Người dùng muốn hỗ trợ CLI/eco của Cursor; nhiều lượt tương tác cho thấy nhu cầu tích hợp các công cụ CLI model mới. Việc này ảnh hưởng tới cách người dùng chạy model tại local/remote.

- #6918 [bug, nix] qwen3-coder fails to call edit tool — Tác giả: @mausch — Cập nhật: 2026-03-10 — Bình luận: 35 — 👍: 19  
  https://github.com/anomalyco/opencode/issues/6918  
  Tại sao quan trọng: Lỗi gọi tool “edit” với provider OpenRouter (qwen3-coder) gây ngắt quy trình tự động hoá; ảnh hưởng tới tích hợp provider bên thứ ba và hành vi tool validation.

- #16351 [bug, opentui] TUI broken in tmux after 1.2.17 — Tác giả: @asaf92 — Cập nhật: 2026-03-10 — Bình luận: 19 — 👍: 12  
  https://github.com/anomalyco/opencode/issues/16351  
  Tại sao quan trọng: TUI trong tmux bị vỡ (input thành ô màu, phím không hoạt động) ảnh hưởng trực tiếp đến nhiều dev dùng terminal multiplexers — tính khả dụng cơ bản bị ảnh hưởng.

- #16333 [bug, core] Compaction occurs way before context limit reached on GPT 5.4 — Tác giả: @GrahamCampbell — Cập nhật: 2026-03-10 — Bình luận: 9 — 👍: 4  
  https://github.com/anomalyco/opencode/issues/16333  
  Tại sao quan trọng: Compaction sớm phá hủy ngữ cảnh cho model có context lớn (~1M). Ảnh hưởng tới chính xác/ghi nhớ của agent khi dùng GPT-5.4.

- #15092 [bug, core] Minimax M2.5 experience is weird — Tác giả: @mindplay-dk — Cập nhật: 2026-03-11 — Bình luận: 9 — 👍: 0  
  https://github.com/anomalyco/opencode/issues/15092  
  Tại sao quan trọng: Báo cáo trải nghiệm bất thường với Minimax M2.5 (không phải do giới hạn context) — cần debug tương thích model mới.

- #16851 [bug, windows, core] ChatGPT not working in new version 1.2.24 — Tác giả: @rony53 — Cập nhật: 2026-03-10 — Bình luận: 8 — 👍: 0  
  https://github.com/anomalyco/opencode/issues/16851  
  Tại sao quan trọng: Lỗi “model not supported when using Codex with a ChatGPT account” làm gián đoạn người dùng Windows dùng Codex/ChatGPT — ảnh hưởng đến mô hình hoạt động mặc định.

- #16721 (CLOSED) sdk方法中 sessions.abort方法不能终止后台服务的任务的运行 — Tác giả: @ZYT20001 — Cập nhật: 2026-03-10 — Bình luận: 5 — 👍: 0  
  https://github.com/anomalyco/opencode/issues/16721  
  Tại sao quan trọng: sessions.abort không dừng tác vụ nền; liên quan tới khả năng huỷ chạy tác vụ/chi phí và trải nghiệm người dùng khi họ muốn ngắt tác vụ.

- #13533 [bug] Bad Request on Compaction only — Tác giả: @vmagalhaes — Cập nhật: 2026-03-10 — Bình luận: 5 — 👍: 2  
  https://github.com/anomalyco/opencode/issues/13533  
  Tại sao quan trọng: Compaction chỉ thất bại với Claude Opus 4.5 gây lỗi "Bad Request" khi compaction bắt đầu — tác động đến tích hợp GitHub Copilot và provider cụ thể.

- #11313 [perf] Long-running bash commands with large outputs cause truncation and agent retry loops — Tác giả: @nabilfreeman — Cập nhật: 2026-03-10 — Bình luận: 3 — 👍: 1  
  https://github.com/anomalyco/opencode/issues/11313  
  Tại sao quan trọng: Lệnh bash dài bị cắt/timeout, dẫn tới agent lặp lại lệnh — gây mất idempotency trong workflows CI / automation.

- #4804 (CLOSED) [bug, opentui, perf] High CPU usage — Tác giả: @shantur — Cập nhật: 2026-03-11 — Bình luận: 14 — 👍: 4  
  https://github.com/anomalyco/opencode/issues/4804  
  Tại sao quan trọng: CPU tăng dần ngay cả khi idle (Mac Intel). Dù đã đóng, đây là vấn đề được nhiều người gặp và dẫn tới PR/issue liên quan (FPS, animation frame, memory leaks).

4) Tiến độ PR quan trọng (chọn 10)
- #16751 fix(session): fix root causes and reconstruction of tool_use/tool_result mismatch — @altendky — Open — https://github.com/anomalyco/opencode/pull/16751  
  Mô tả: Sửa nguyên nhân gốc và cung cấp safety reconstruction cho mismatch giữa tool_use và tool_result — hướng tới ổn định luồng tool calls.

- #16945 fix(session): emit completion-only idle events (PoC) — @kitlangton — Open — https://github.com/anomalyco/opencode/pull/16945  
  Mô tả: PoC thêm lý do cho idle session và chỉ phát event completion cho turns hoàn tất; giúp ngăn double notifications / âm thanh khi interrupt.

- #16389 fix(opencode): lost sessions across worktrees and orphan branches — @michaeldwan — Open — https://github.com/anomalyco/opencode/pull/16389  
  Mô tả: Sửa hai nguyên nhân khiến sessions biến mất trong git worktree; quan trọng cho người dùng dùng worktree/workspaces thường xuyên.

- #16814 fix(opencode): sessions lost after git init in existing project — @michaeldwan — Open — https://github.com/anomalyco/opencode/pull/16814  
  Mô tả: Fix bug trong migrateFromGlobal() gây mất sessions sau git init; cải thiện tính ổn định khi khởi tạo repo.

- #15646 fix: prevent memory leaks from SSE streams, LSP, Bus, and process cleanup — @brendandebeasi — Open — https://github.com/anomalyco/opencode/pull/15646  
  Mô tả: Sửa nhiều leak khiến tăng bộ nhớ; tác động lớn tới độ ổn định lâu dài của desktop/web daemons.

- #16947 feat(tui): support configurable cursor style, blink, and color — @fanyu — Open — https://github.com/anomalyco/opencode/pull/16947  
  Mô tả: Thêm cấu hình con trỏ TUI (block/line/underline, blink, color). Trực tiếp giải quyết các phàn nàn về trải nghiệm textareas/cursor (vấn đề #11305).

- #13901 feat(web): Add FPS configuration for terminal to stop busy cycling — @jmagder — Open — https://github.com/anomalyco/opencode/pull/13901  
  Mô tả: Thêm cấu hình FPS cho terminal web để tránh busy-loop animation frame (giải quyết CPU 100% cho màn hình tốc độ cao).

- #13854 fix(tui): stop streaming markdown/code after message completes — @mocksoul — Open — https://github.com/anomalyco/opencode/pull/13854  
  Mô tả: Đảm bảo TUI không đánh dấu message đã hoàn tất là đang stream; sửa bỏ sót hàng cuối cùng của bảng khi message hoàn thành.

- #15412 feat(plugin): surface agent and parentAgent in plugin hook input — @ArmirKS — Open — https://github.com/anomalyco/opencode/pull/15412  
  Mô tả: Cung cấp thông tin agent/parentAgent cho hooks plugin (tool.execute.before/after, shell.env) — giúp plugin có ngữ cảnh đầy đủ về nguồn gọi tool.

- #16941 feat(plugin): add getAuth, route, model.select and AuthLoaderResult to plugin SDK — @vglafirov — Open — https://github.com/anomalyco/opencode/pull/16941  
  Mô tả: Mở rộng plugin SDK để hỗ trợ auth, route, và sub-selection model — bước quan trọng để tách provider-specific code thành plugin.

5) Xu hướng yêu cầu tính năng (tổng hợp)
- TUI / terminal: nhiều yêu cầu cấu hình (cursor style/blink/color), sửa lỗi rendering trong tmux, fix streaming rendering và syntax highlighting. (vấn đề & PR liên quan: #16351, #13854, #16947, #12301)  
- Session & workspace stability: khôi phục/giữ sessions qua worktrees, git init, abort/interrupt behavior, và emit idle events chính xác. (issues & PRs: #16721, #16389, #16814, #16945, #16751)  
- Model/provider support: thêm Grok 4.2, Groq compound, Cursor CLI, Qwen/Minimax/GPT compatibility và xử lý compaction cho model lớn. (issues: #16277, #16213, #2072, #6918, #15092, #16333)  
- Plugin SDK & extensibility: auth, routes, agent context, sidebar contributions, và plugin-driven UI/UX (PRs: #16941, #15412, #16804).  
- UX desktop/web: flatpak, word-wrap trong File Viewer, Feishu cho cộng đồng Trung Hoa, auto-sync projects web. (issues: #5651, #16781, #16908, #13626)  
- Run / CLI ergonomics: hỗ trợ JSON schema cho opencode run, projects listing, và root-level config respect. (issues: #9320, #7545, #10544)

6) Điểm đau của nhà phát triển (tóm tắt)
- TUI instability: rendering và input trong tmux, syntax highlighting lỗi, streaming rendering incomplete — ảnh hưởng trải nghiệm hàng ngày.  
- Session reliability: sessions “mất” sau git operations / worktrees, abort không dừng task nền, không phân biệt completion vs error dẫn tới double-notifs.  
- Provider/model incompatibilities: compaction sớm trên GPT-5.4, model-specific errors (Claude Opus compaction Bad Request, Codex/ChatGPT account model errors), và tool call validation lỗi với Qwen.  
- Performance & resource leaks: CPU high (web terminal animation), memory leaks (SSE, LSP, bus), cần cleanup process/streams.  
- Long-running tools: truncation/timeout cho lệnh bash verbose gây agent retry loops và mất idempotency.  
- Plugin/SDK gaps: thiếu hook-level auth & agent context làm plugin khó tích hợp provider-specific flows.

Kết luận nhanh
- Trọng tâm ngắn hạn của cộng đồng đang là: (1) ổn định TUI/terminal trải nghiệm, (2) chắc chắn hóa session/workspace behavior, và (3) mở rộng hỗ trợ model/provider mới. Các PR hiện tại phản ánh hướng xử lý lỗi hệ thống (memory leaks, session reconstruction, streaming fixes) trước khi thêm nhiều tính năng mới.

Tài liệu tham khảo (liên kết đã được nhắc ở trên cho từng mục). Nếu bạn muốn, tôi có thể:
- Soạn checklist ưu tiên cho team dev lấy từ các issue/PR này, hoặc  
- Tạo draft comment/PR template để tập trung thông tin chẩn đoán cho từng loại lỗi (TUI, session, provider).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

Qwen Code — Bản tin cộng đồng (2026-03-11)
Tóm tắt ngắn gọn dành cho nhà phát triển AI/Tooling.

1) Điểm nổi bật hôm nay
- Phát hành nhánh nightly của 0.12.1 với hai sửa lỗi quan trọng: cải thiện xử lý scope MCP theo RFC 9728 và xóa thông báo lỗi tĩnh khi bắt đầu truy vấn mới. (Xem phần Phát hành)
- Cộng đồng tập trung mạnh vào các lỗi trải nghiệm CLI/IDE trên Windows và terminal (không gõ được dấu cách, dán, write_file, run_shell_command), cùng các yêu cầu về quản lý skills, hooks và cấu hình provider.

2) Phát hành phiên bản
- v0.12.1-nightly.20260311.bf99f956 — Release v0.12.1-nightly
  - Những thay đổi chính:
    - fix(mcp): lấy scopes từ protected resource metadata theo RFC 9728 (PR: https://github.com/QwenLM/qwen-code/pull/2212)
    - fix(cli): xóa thông báo lỗi tĩnh khi bắt đầu truy vấn mới (PR: https://github.com/QwenLM/qwen-code/pull/2110)
    - chore: bump version (PR: https://github.com/QwenLM/qwen-code/pull/2226)
  - Link PR bump: https://github.com/QwenLM/qwen-code/pull/2226
- v0.12.0-preview.2 — bao gồm cùng hai sửa lỗi trên (cùng thay đổi như v0.12.1-preview).  

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #83 — qwen code tokens 消耗不正常 (closed)  
  Tại sao quan trọng: báo cáo tiêu thụ token bất thường (hàng triệu tokens) ảnh hưởng chi phí và niềm tin doanh nghiệp; nhiều bình luận và reactions.  
  Link: https://github.com/QwenLM/qwen-code/issues/83
- #1002 — Connection problem (open)  
  Tại sao quan trọng: lỗi kết nối/streaming timeout lẻ tẻ, khó tái tạo — ảnh hưởng tới khả năng dùng LLM ở quy mô. Cần điều tra hạ tầng/agent.  
  Link: https://github.com/QwenLM/qwen-code/issues/1002
- #1922 — BUG: edit tool không thể sửa file trong phiên bản mới (open)  
  Tại sao quan trọng: edit tool bị lỗi khiến agent không thể sửa mã, trực tiếp phá vỡ workflow tự động hoá; nhiều nhà dev gặp lại vấn đề đã từng "fix" trước đó.  
  Link: https://github.com/QwenLM/qwen-code/issues/1922
- #2198 — Bug: Cannot type spacebar character in CLI input (open)  
  Tại sao quan trọng: không gõ được dấu cách trong CLI làm mất khả năng nhập lệnh/prompt cơ bản; tác động lớn đến UX CLI.  
  Link: https://github.com/QwenLM/qwen-code/issues/2198
- #2186 — Space character input not working in Qwen (open)  
  Tại sao quan trọng: báo cáo tương tự như #2198 nhưng trong VS Code integrated terminal — cho thấy phạm vi rộng hơn (terminal vs OS).  
  Link: https://github.com/QwenLM/qwen-code/issues/2186
- #2261 — issue with the write_file tool in my current environment (windows x64) (open)  
  Tại sao quan trọng: write_file không tạo file trên Windows dù lệnh chấp nhận — làm gián đoạn khả năng agent ghi thay đổi vào workspace.  
  Link: https://github.com/QwenLM/qwen-code/issues/2261
- #2252 — can't paste (open)  
  Tại sao quan trọng: không thể paste (Ctrl+V / Shift+Insert) trong CLI gây cản trở lớn cho thao tác copy/paste, nhiều báo cáo trùng khớp với input-space issue.  
  Link: https://github.com/QwenLM/qwen-code/issues/2252
- #2244 — run_shell_command on Windows returns empty output (open)  
  Tại sao quan trọng: run_shell_command trả về output rỗng trên Windows dù lệnh thực thi thành công — agent không thể "thấy" kết quả lệnh, phá vỡ automation.  
  Link: https://github.com/QwenLM/qwen-code/issues/2244
- #2249 — Internal error (code: -32603) while following editing and reading documentation (open)  
  Tại sao quan trọng: lỗi nội bộ liên quan tới mismatch giữa assistant/tool_calls và tool messages — có thể gây crash agent flow khi gọi tool/làm việc với multi-step tools.  
  Link: https://github.com/QwenLM/qwen-code/issues/2249
- #2262 — 代码回退机制 (open, feature request)  
  Tại sao quan trọng: yêu cầu checkpoint/rewind để rollback code (giống Claude Code rewind) — nhu cầu cao đối với an toàn khi agent tự động sửa mã.  
  Link: https://github.com/QwenLM/qwen-code/issues/2262

4) Tiến độ PR quan trọng (10 PR)
- #2061 — feat(insight): add multi-language support for insight reports (open)  
  Nội dung: hỗ trợ đa ngôn ngữ cho báo cáo /insight, truyền ngôn ngữ người dùng vào prompt của LLM.  
  Link: https://github.com/QwenLM/qwen-code/pull/2061
- #2220 — Refactor model provider configuration to providerId-keyed structure (V4) (open)  
  Nội dung: thay đổi cấu trúc config provider, thêm flag --providerId và migration V3→V4; liên quan tới quản lý nhiều provider.  
  Link: https://github.com/QwenLM/qwen-code/pull/2220
- #2203 — feat(hooks): Implement 10 core event hooks (open)  
  Nội dung: thêm hệ thống hooks cốt lõi (session, tool exec, conversation, subagent...) để mở rộng bằng script/command. Quan trọng cho extensibility.  
  Link: https://github.com/QwenLM/qwen-code/pull/2203
- #2255 — feat(skills): add allowed and excluded skills configuration (open)  
  Nội dung: thêm cấu hình skills.allowed / skills.excluded để whitelist/blacklist skills — hữu ích cho governance và giảm noise.  
  Link: https://github.com/QwenLM/qwen-code/pull/2255
- #1912 — feat(arena): Add agent collaboration arena with multi-model competitive execution (open)  
  Nội dung: chạy cùng task trên nhiều model song song, so sánh kết quả và merge tốt nhất — công cụ so sánh model thực tế.  
  Link: https://github.com/QwenLM/qwen-code/pull/1912
- #2202 — feat: support skills in .agents directory and other provider directories (open)  
  Nội dung: cho phép load skills từ nhiều thư mục provider (ví dụ .agent/.cursor/.codex) — cải thiện tổ chức skill.  
  Link: https://github.com/QwenLM/qwen-code/pull/2202
- #2221 — fix(core): skip openDiff in YOLO mode to prevent VS Code editor opening (open)  
  Nội dung: ngăn openDiff gây bật VS Code không mong muốn khi chạy YOLO mode với IDE companion.  
  Link: https://github.com/QwenLM/qwen-code/pull/2221
- #2195 — feat(vscode): add sidebar chat view (open)  
  Nội dung: thêm view sidebar cho Qwen Code trong VS Code, tái sử dụng surface chat hiện có. Tăng tích hợp IDE.  
  Link: https://github.com/QwenLM/qwen-code/pull/2195
- #2211 — fix(cli): block Tab key during AI streaming to prevent mode switch interruption (open)  
  Nội dung: khóa Tab trong khi AI streaming để tránh chuyển mode ngẫu nhiên; fix UX CLI khi streaming.  
  Link: https://github.com/QwenLM/qwen-code/pull/2211
- #2259 — fix(test): handle thinking model assistant messages in SDK E2E tests (open)  
  Nội dung: sửa test để bỏ qua assistant messages chỉ có "thinking" block, tăng độ ổn định cho các model phát triển.  
  Link: https://github.com/QwenLM/qwen-code/pull/2259

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Quản lý skills: whitelist/blacklist, load từ nhiều thư mục provider, và phạm vi visibility cho subagents (PR #2255, #2202, issue #182? & #1782).  
- Hooks / Events: nhu cầu hook lifecycle và tool execution để mở rộng/kiểm soát hành vi agent (PR #2203, issue #2246 về schema).  
- IDE tích hợp: sidebar chat, multi-position layouts cho VS Code, plugin cho JetBrains/IDE (PR #2195, #2188, issue #2247).  
- Provider & MCP: refactor cấu hình provider (providerId), reconnect command cho MCP, và xử lý scopes (RFC 9728) (PR #2220, issue #2241, release fixes PR #2212).  
- Safety / Dev ergonomics: checkpoint/rewind (rollback code), better retry/reconnect để auto-recovery của LLM (issue #2262, #2241).  
- Mở rộng quốc tế hoá: multi-language reports (PR #2061).

6) Điểm đau của nhà phát triển (tóm tắt)
- Tiêu thụ token bất thường và chi phí bất ngờ (issue #83) — ưu tiên cao vì liên quan tới chi phí doanh nghiệp. Link: https://github.com/QwenLM/qwen-code/issues/83
- Kết nối/streaming bị ngắt, timeout, lỗi nội bộ (issues #1002, #2249) — dẫn tới trải nghiệm không ổn định. Links: https://github.com/QwenLM/qwen-code/issues/1002, https://github.com/QwenLM/qwen-code/issues/2249
- CLI/Terminal input UX: không gõ được dấu cách, không paste, Tab gây chuyển mode khi streaming (issues #2198, #2252, PR #2211) — ảnh hưởng trực tiếp thao tác hàng ngày. Links: https://github.com/QwenLM/qwen-code/issues/2198, https://github.com/QwenLM/qwen-code/issues/2252, https://github.com/QwenLM/qwen-code/pull/2211
- Windows-specific: write_file không tạo file, run_shell_command trả output rỗng, pty resize crash sau upgrade (issues #2261, #2244, #2242) — nhiều bug liên quan nền tảng Windows cần hotfix. Links: https://github.com/QwenLM/qwen-code/issues/2261, https://github.com/QwenLM/qwen-code/issues/2244, https://github.com/QwenLM/qwen-code/issues/2242
- File encoding & diff/edit: CRLF/BOM gây thất bại edit tool, openDiff gây bật VS Code không mong muốn (issues #2257/#2256, PR #2221). Links: https://github.com/QwenLM/qwen-code/issues/2257, https://github.com/QwenLM/qwen-code/pull/2221
- Cấu hình và provider management: yêu cầu migration/đảm bảo tương thích khi đổi cấu trúc provider; cần công cụ reconnect cho MCP (PR #2220, issue #2241). Links: https://github.com/QwenLM/qwen-code/pull/2220, https://github.com/QwenLM/qwen-code/issues/2241

Kết luận ngắn
- Tiếp tục ưu tiên: (1) Fix các lỗi input/Windows nóng (space, paste, write_file, run_shell_command), (2) ổn định kết nối/streaming và xử lý token runaway, (3) tiếp tục hoàn thiện hệ thống hooks/skills/ provider để đáp ứng nhu cầu governance và mở rộng.  
- Tài nguyên tham khảo (repo): https://github.com/QwenLM/qwen-code

Nếu bạn muốn, tôi có thể:
- Biên soạn list TODO ưu tiên cho release tiếp theo dựa trên các issue có vote/comment cao.  
- So sánh PR liên quan đến skills/hooks để đề xuất roadmap tích hợp.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*