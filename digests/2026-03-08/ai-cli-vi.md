# Bản tin Cộng đồng Công cụ AI CLI 2026-03-08

> Thời gian tạo: 2026-03-08 03:35 UTC | Công cụ: 7

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

Dưới đây là báo cáo so sánh chéo ngắn gọn, chuyên nghiệp và có số liệu hỗ trợ (dựa trên bản tin ngày 2026-03-08).

1) Tổng quan hệ sinh thái (3–5 câu)
Các CLI AI hiện ở giai đoạn “mở rộng tính năng đồng thời ổn định hoá nền tảng”: nhiều dự án đẩy nhanh tính năng agent/subagent, hooks, và UX TUI/IDE trong khi phải xử lý lỗi nền tảng (TTY/PTY, sandbox, rate‑limit, platform‑specific). Những nhu cầu chung xuất phát từ việc tích hợp sâu vào workflow dev (shell, VS Code, remote sessions, approval flows) và từ áp lực giảm chi phí/độ trễ (local exec / dry‑run / compaction). Một số dự án (Codex, OpenCode, Claude Code) có hoạt động và thread rất lớn — chỉ ra cả cộng đồng rộng lẫn các thách thức vận hành quy mô.

2) So sánh mức độ hoạt động (Issues / PRs / Release — dữ liệu hôm nay)
(Lưu ý: “Issues”/“PRs” là các mục nổi bật được trình bày trong từng bản tin.)
- Claude Code: Issues nóng = 10; PRs nổi bật = 10; Release trong 24h = None.  
- OpenAI Codex: Issues nóng = 10; PRs nổi bật = 10; Releases = 3 alpha (rust-v0.112.0-alpha.10 → .11 → .12).  
- Gemini CLI: Issues nóng = 10; PRs nổi bật = 10 (một số WIP/closed); Release = None.  
- GitHub Copilot CLI: Issues nóng = 10; PRs trong 24h = 1; Release = None.  
- Kimi Code CLI: Issues cập nhật = 5; PRs = 1; Release = None.  
- OpenCode: Issues nóng = 10; PRs nổi bật = 10; Release = v1.2.21 (đã phát hành).  
- Qwen Code: Issues cập nhật = 7; PRs = 4; Release = v0.12.0‑nightly (cập nhật parsing + tabWidth).

3) Hướng tính năng chung (xuất hiện ở nhiều cộng đồng — công cụ + nhu cầu cụ thể)
- Terminal / interactive shell / PTY support
  - Claude Code (#9881, iTerm2 #24301), GitHub Copilot CLI (#575, #1284), OpenCode (PTY fixes in v1.2.21), Qwen/others → nhu cầu PTY, interactive shells, split‑pane, xử lý escape sequences.
- Cross‑platform stability (macOS/WSL/Windows)
  - Claude (#22543 VM bundle, #5674 macOS), Codex (sandbox/Windows issues #13574, #13917), Gemini (Windows performance), OpenCode (Windows path fixes) → xử lý sandbox, TMPDIR, rate‑limit trên WSL.
- Agent / subagent orchestration & permissions
  - Gemini (Remote Agents epic #20302), Claude (agent teams permissions #26479), OpenCode (dynamic model selection #6651, subagent MCP permissions #16551) → remote agents, model selection, permission propagation.
- Hooks / plugin security & schema
  - Claude (hooks vuln #27289, schema PRs), Codex (hooks engine PR #13276), Gemini (hooks UI) → cần validator, sandboxing, schema mở rộng.
- Local execution / token & latency optimization
  - Claude (local shell interceptor PR #31867, dry‑run PR #31732), OpenCode (local‑memory plugin), Codex (request_permissions tool) → giảm token usage, local exec.
- UX for approvals / plan / verbosity control
  - Gemini (milestone‑driven prompting #21450, approval dialog #20716), OpenCode (plan/compaction #8140), Codex (guardian/assessment) → giảm noise, improve safety review flows.
- IME / encoding / clipboard / session management
  - Copilot CLI (IME/arrow keys/clipboard #1698/#1241), Qwen (space input #2101), Codex (accents in WSL #13638), OpenCode (TUI tmux issues) → hỗ trợ quốc tế hoá và clipboard images.
- Billing / usage transparency
  - Codex (usage/rate limits #13568), Copilot CLI (overage display #1881), Gemini (privacy consent PR) → minh bạch quota/billing.

4) Phân tích khác biệt hoá (trọng tâm, người dùng mục tiêu, hướng kỹ thuật)
- Claude Code: tập trung vào ecosystem cho “AI assistants in repo” — hooks/plugin authoring, agent teams, governance (CLAUDE.md). Người dùng: developer teams muốn assistant tích hợp sâu. Kỹ thuật: nhiều work trên plugin schema, local exec, cross‑platform PTY.
- OpenAI Codex: hướng mạnh về runtime/sandbox và governance (guardian, hooks engine) cùng chuỗi alpha runtime releases — phù hợp cho tổ chức cần kiểm soát quyền/permission và realtime features (voice). Kỹ thuật: sandbox policies, Rust runtime, guardian auditing.
- Gemini CLI: trọng tâm UX agent/subagent, milestone prompting và headless/scriptability — nhắm vào người dùng xây dựng workflows agent phức tạp và automation/CI. Kỹ thuật: prompt engineering, streaming/subagent infra.
- GitHub Copilot CLI: tập trung vào trải nghiệm terminal cơ bản (TTY/IME/clipboard), tính tương thích shell và enterprise model access — nhắm đến developer cá nhân và enterprise với chú trọng UX terminal. Kỹ thuật: TTY handling, IME, HTTP/2 resilience, billing UI.
- OpenCode: hướng vào TUI/LSP reliability, model selection cho subagents và context compaction — người dùng là dev teams cần local-first/OSS flexibility. Kỹ thuật: LSP incremental sync fixes, PTY leaks, provider compatibility.
- Qwen & Kimi: quy mô nhỏ hơn, tập trung vào IDE integration và kết nối provider LLM; Kimi chú trọng tính ổn định kết nối provider và remote continuation; Qwen tập UX VS Code và session isolation.

5) Động lực & độ trưởng thành của cộng đồng
- Hoạt động mạnh nhất: OpenAI Codex và OpenCode (nhiều PR/issue + releases trong 24h), Claude Code có lượng tương tác lớn trên vài thread trọng yếu (ví dụ Cowork bundle). Dữ liệu: Codex có thread lớn (308 comments #13568) và 3 alpha releases; OpenCode vừa có release v1.2.21 + 10 PRs nổi bật.
- Lặp nhanh (fast iteration): Codex (alpha release chain) và OpenCode (recent release + nhiều PR fix nóng). Qwen thể hiện nightly cadence.  
- Cộng đồng nhỏ/nhanh nhưng target rõ: Kimi và Qwen — ít issue/PR nhưng tập trung vào customer painpoints cụ thể (LLM connectivity, VS Code input).
- Công cụ có nhiều issue UX nền tảng (Copilot CLI) nhưng ít PR merge trong 24h — cho thấy cần nguồn lực engineering cho fixes platform‑level.

6) Tín hiệu xu hướng ngành (giá trị tham khảo cho nhà phát triển)
- Tăng trưởng nhu cầu về “shell‑native” trải nghiệm: PTY, split panes, alias support, IME/clipboard image support — nếu bạn phát triển tool/extension, đầu tư vào TTY/terminal testing cross‑platform sẽ giảm nhiều vấn đề hỗ trợ.  
- Agent orchestration và security là tiêu điểm: remote agents, step‑through approval, permission propagation và hook validation — cần thiết cho scale và an toàn khi cho agent quyền hành.  
- Giảm cost/latency bằng local execution & compaction: dry‑run, local shell interceptor, thought‑level compaction là cách trực tiếp tối ưu token cost và UX.  
- Prompting UX / verbosity control: milestone‑driven prompting và approval UIs đang được ưu tiên để giảm noise và tăng trust. Đây là chỗ tốt để đầu tư UX nghiên cứu/behavioural eval.  
- Sandbox & platform‑specific stability quyết định trải nghiệm production: Windows/macOS/WSL/sandbox bugs xuất hiện nhiều; kiểm thử multi‑platform (including WSL, tmux, VS Code integrated terminal) rất quan trọng.  
- Billing/usage transparency và model routing matter: enterprise users yêu cầu hiển thị usage/overage và chính sách routing — cần telemetry và UX rõ ràng để tránh customer churn.

Kết (tối ưu hành động ngắn)
- Nếu bạn là quyết định kỹ thuật: ưu tiên đầu tư vào cross‑platform terminal testing, permission model cho agents/hooks, và cơ chế audit/approval.  
- Nếu bạn là dev contributor: góp logs/repro cho platform‑specific issues (macOS/WSL/IME) và review PRs về sandbox/hooks/PTY sẽ có tác động nhanh.  
- Nếu bạn là PM: cân nhắc roadmap cho remote sessions, approval flows và local‑exec (dry‑run) — đều là nhu cầu chung được nhiều cộng đồng yêu cầu.

Nếu cần, tôi có thể:
- Chuẩn hoá checklist repro multi‑platform (TTY/IME/WSL/macOS) cho team QA.  
- Rút gọn bảng ưu tiên issues (critical/high/medium) để đội triage dùng.

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nổi bật Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

Dưới đây là báo cáo điểm nổi bật về cộng đồng Claude Code Skills (dữ liệu tới 2026-03-08). Ngắn gọn, chuyên nghiệp và tập trung vào các PR/Issue nổi bật cùng xu hướng nhu cầu.

1) Xếp hạng Skills “hot” (5–8 PR được thảo luận nhiều nhất)
- Add document-typography (PR #514) — Chức năng: kiểm soát chất lượng kiểu gõ/typography cho tài liệu do AI sinh ra (ngăn orphan word wrap, widow paragraphs, căn số mục đánh số sai). Điểm nổi bật thảo luận: vấn đề kiểu gõ ảnh hưởng rộng tới mọi tài liệu Claude tạo; nhu cầu mạnh về đầu ra “chuyên nghiệp” cho văn bản và xuất tài liệu. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/514

- Improve frontend-design skill clarity and actionability (PR #210) — Chức năng: sửa đổi skill frontend-design để rõ ràng, có thể hành động và token-efficient hơn. Điểm nổi bật: tập trung làm cho hướng dẫn có thể thực thi bởi Claude trong một cuộc hội thoại; liên quan tới việc tối ưu hóa prompt/skill authoring. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/210

- Add skill-quality-analyzer and skill-security-analyzer to marketplace (PR #83) — Chức năng: hai meta-skill để đánh giá Skills theo nhiều chiều (chất lượng tài liệu, cấu trúc, bảo mật, v.v.). Điểm nổi bật: cộng đồng cần công cụ tự động đánh giá/chuẩn hoá Skills trước khi dùng hoặc xuất bản. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/83

- Add codebase-inventory-audit skill (PR #147) — Chức năng: audit làm sạch codebase, tìm mã thừa, file không dùng, lỗ hổng tài liệu; xuất CODEBASE-STATUS.md. Điểm nổi bật: nhu cầu cải thiện chất lượng kho mã, quản trị kỹ thuật và giảm “bloat”. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/147

- Add shodh-memory skill: persistent context for AI agents (PR #154) — Chức năng: hệ thống bộ nhớ bền cho agent, khi gọi proactive_context, định dạng nhớ, khi lưu/triage. Điểm nổi bật: nhu cầu mạnh về “memory” để duy trì ngữ cảnh qua nhiều cuộc hội thoại/agent. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/154

- Add SAP-RPT-1-OSS predictor skill (PR #181) — Chức năng: tích hợp mô hình bảng của SAP cho phân tích dự đoán dữ liệu doanh nghiệp. Điểm nổi bật: nhu cầu tích hợp các TFM/tabular models chuyên dụng cho doanh nghiệp. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/181

- feat: add AURELION skill suite (kernel, advisor, agent, memory) (PR #444) — Chức năng: bộ kỹ năng AURELION cho quản lý kiến thức + bộ nhớ có cấu trúc (kernel, advisor, agent, memory). Điểm nổi bật: khung nhận thức/memory chuyên nghiệp cho KM và cộng tác AI. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/444

- Add flutter-theme-factory skill (PR #368) — Chức năng: tạo theme chuyên nghiệp cho Flutter (12 theme, ColorScheme, font pairing, hỗ trợ light/dark). Điểm nổi bật: nhu cầu tạo giao diện nhanh, chất lượng cho app dev. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/368

2) Xu hướng nhu cầu cộng đồng (tóm tắt từ Issues)
- Độ tin cậy & vận hành (stability): nhiều Issue báo lỗi API/không thể tải/không xóa/500 errors — ví dụ #406 (unable to upload), #403 (delete returns 500), #389 (API down). Người dùng cần hạ tầng Skills ổn định. https://github.com/anthropics/skills/issues/406 https://github.com/anthropics/skills/issues/403 https://github.com/anthropics/skills/issues/389

- Bộ nhớ liên tục & ngữ cảnh (persistent memory): nhu cầu Skill lưu giữ ngữ cảnh giữa các cuộc hội thoại — liên quan trực tiếp tới PR shodh-memory và AURELION. https://github.com/anthropics/skills/pull/154 https://github.com/anthropics/skills/pull/444

- Công cụ chất lượng & bảo mật cho Skills (meta-skills): mong muốn analyzer/validator cho SKILL.md, security checks — thể hiện qua PR #83 (skill-quality/security-analyzer) và issue về best-practice cho skill-creator (#202). https://github.com/anthropics/skills/pull/83 https://github.com/anthropics/skills/issues/202

- Developer UX / authoring best-practices: cần hướng dẫn rõ ràng cho SKILL.md (YAML quoting PR #359), encoding fixes, contributing guide (#509). Người dùng muốn giảm lỗi khi đóng gói/đăng Skill. https://github.com/anthropics/skills/pull/359 https://github.com/anthropics/skills/pull/509

- Tích hợp nền tảng & công cụ bên thứ ba: yêu cầu tích hợp với Bedrock/AWS, Google Workspaces, Masonry CLI… (Issues/PR liên quan: #29, PR cho Google Workspaces, PR Masonry). https://github.com/anthropics/skills/issues/29 https://github.com/anthropics/skills/pull/299 https://github.com/anthropics/skills/pull/335

- Quản trị & governance cho agent systems: đề xuất skill agent-governance cho policy, audit, trust scoring (#412). https://github.com/anthropics/skills/issues/412

- Tối ưu hoá đầu ra tài liệu và UX (typography, docx formatting): PR document-typography và guidance để tránh whitespace reformat (#143) cho thấy nhu cầu đầu ra “chuẩn” khi xuất văn bản. https://github.com/anthropics/skills/pull/514 https://github.com/anthropics/skills/pull/143

3) Skills tiềm năng cao chưa merge (PR phù hợp nhu cầu, có khả năng được triển khai sớm)
- shodh-memory (PR #154) — trực tiếp giải quyết nhu cầu memory liên tục của cộng đồng. https://github.com/anthropics/skills/pull/154

- Add document-typography (PR #514) — giải quyết vấn đề chất lượng tài liệu đầu ra rất phổ biến; hữu ích cho người dùng doanh nghiệp. https://github.com/anthropics/skills/pull/514

- skill-quality-analyzer & skill-security-analyzer (PR #83) — cung cấp khả năng kiểm tra/chuẩn hoá skills, phù hợp với xu hướng yêu cầu tooling. https://github.com/anthropics/skills/pull/83

- codebase-inventory-audit (PR #147) — phù hợp nhu cầu audit/code hygiene trong Issues. https://github.com/anthropics/skills/pull/147

- AURELION suite (PR #444) — khung tri thức + memory cho KM chuyên nghiệp, hấp dẫn tổ chức. https://github.com/anthropics/skills/pull/444

- Improve frontend-design (PR #210) — vì liên quan tới best-practice authoring và cải thiện UX cho các skill front-end. https://github.com/anthropics/skills/pull/210

- Configure skills in Claude user preferences (PR #246) — hỗ trợ cá nhân hoá và quản lý preferences khi cài skill, phản ánh nhu cầu tiện ích hoá. https://github.com/anthropics/skills/pull/246

Lý do chọn: các PR trên khớp trực tiếp với các Issue có lượt thảo luận/biểu cảm (ví dụ stability, memory, quality/tooling, integration), nên có khả năng nhận ưu tiên/merge sớm.

4) Nhận định hệ sinh thái Skills (1 câu)
Cộng đồng tập trung mạnh vào: nâng cao độ tin cậy và khả năng vận hành (stability/infra), tooling cho chất lượng & bảo mật của Skills, hỗ trợ bộ nhớ liên tục/kiến thức dài hạn và tích hợp nền tảng — tức là ưu tiên “kỹ thuật/operational” để biến Skills thành công cụ an toàn, lặp được và phù hợp doanh nghiệp.

Tài liệu tham khảo (chọn ví dụ chính)
- PR document-typography: https://github.com/anthropics/skills/pull/514
- PR shodh-memory: https://github.com/anthropics/skills/pull/154
- PR skill-quality-analyzer: https://github.com/anthropics/skills/pull/83
- PR codebase-inventory-audit: https://github.com/anthropics/skills/pull/147
- PR AURELION suite: https://github.com/anthropics/skills/pull/444
- Issue stability: unable to upload (#406) https://github.com/anthropics/skills/issues/406
- Issue skill-creator best practices (#202) https://github.com/anthropics/skills/issues/202
- Issue agent-governance proposal (#412) https://github.com/anthropics/skills/issues/412

Nếu cần, tôi có thể: (a) tạo một bảng đối chiếu nhu cầu → PR/Issue cho roadmap ưu tiên, hoặc (b) đề xuất checklist kỹ thuật để ưu tiên merge theo rủi ro vận hành. Bạn muốn phương án nào tiếp theo?

---

Claude Code Community Bulletin — 2026-03-08

1) Điểm nổi bật hôm nay
- Vấn đề Cowork tạo VM bundle lớn (≈10GB) tiếp tục gây ra suy giảm hiệu năng nghiêm trọng trên macOS và đang nhận nhiều tương tác từ cộng đồng; đây là ticket hàng đầu về độ ưu tiên và mức ảnh hưởng. (See #22543)
- Một số lỗi tích hợp IDE/CLI và đồng bộ hoá trạng thái (VS Code, iOS web UI, WSL) xuất hiện dày đặc — cộng đồng tập trung vào trải nghiệm UX và độ ổn định cross-platform. (See #30021, #31989, #22016)

2) Phát hành phiên bản
- Không có phát hành mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (10 mục)
Đã chọn theo mức ảnh hưởng, số tương tác và phạm vi tác động. Mỗi mục kèm lý do quan trọng và phản ứng cộng đồng.

1. #22543 — Cowork feature creates 10GB VM bundle that severely degrades performance  
   Link: https://github.com/anthropics/claude-code/issues/22543  
   Tại sao quan trọng: Tạo file/VM bundle ~10GB làm chậm hoàn toàn Claude Desktop (khởi động, UI, phản hồi). Ảnh hưởng rộng với nhiều người dùng macOS; nhiều bình luận (41) và like (99) chỉ ra mức ưu tiên cao.

2. #30021 — "Create PR" button missing in Claude Code web UI after push  
   Link: https://github.com/anthropics/claude-code/issues/30021  
   Tại sao quan trọng: Gián đoạn luồng làm việc trên iOS/web (commit & push nhưng không có nút tạo PR). UX blocker cho mobile-first workflow; nhiều tương tác (23 comments, 46 👍).

3. #5674 — Persistent ECONNRESET Errors on macOS Network Connections  
   Link: https://github.com/anthropics/claude-code/issues/5674  
   Tại sao quan trọng: Kết nối hay bị reset trên macOS gây ngắt task/automation — tác động đến reliability, cross-platform discrepancy (không gặp trên Linux/Windows). Nhiều thảo luận kỹ thuật (22 comments).

4. #22016 — VSCode ext - "Fork conversation from here" doesn't do anything  
   Link: https://github.com/anthropics/claude-code/issues/22016  
   Tại sao quan trọng: Tinh năng collaboration/conversation management trong VS Code không hoạt động — ảnh hưởng trực tiếp tới workflow developer và tích hợp extension (14 comments, 22 👍).

5. #9881 — Add Interactive Shell Support to the Bash Tool via PTY  
   Link: https://github.com/anthropics/claude-code/issues/9881  
   Tại sao quan trọng: Yêu cầu tính năng để hỗ trợ shell tương tác (PTY) — ảnh hưởng lớn tới trải nghiệm automation/agents chạy công cụ bash. Nhiều upvotes (32 👍).

6. #24301 — iTerm2 native split pane not working with teammateMode auto  
   Link: https://github.com/anthropics/claude-code/issues/24301  
   Tại sao quan trọng: Người dùng macOS/iTerm2 kỳ vọng split panes cho agent teams; hiện fallback âm thầm sang in-process gây mất visibility/hiệu năng. (7 comments, 6 👍).

7. #26479 — Agent Teams teammates ignore bypassPermissions for Bash  
   Link: https://github.com/anthropics/claude-code/issues/26479  
   Tại sao quan trọng: Quyền và cài đặt dự án không được truyền xuống agent teammates — rủi ro bảo mật/khả năng tái sử dụng team agents.

8. #29513 — Remote Control not enabled for Max 20x subscriber ($200/mo)  
   Link: https://github.com/anthropics/claude-code/issues/29513  
   Tại sao quan trọng: Người trả phí Max không được cấp quyền Remote Control — tác động tới trải nghiệm khách hàng trả phí, cần điều tra billing/feature flags (4 comments, 4 👍).

9. #27289 — Hooks introduce vulnerability to bad faith injection  
   Link: https://github.com/anthropics/claude-code/issues/27289  
   Tại sao quan trọng: Hooks cơ chế mở có thể tạo lỗ hổng chèn lệnh xấu — quan ngại bảo mật; cần rà soát schema & sandboxing.

10. #31989 — All new claude CLI processes return "API Error: Rate limit reached" for 8+ hours on WSL  
    Link: https://github.com/anthropics/claude-code/issues/31989  
    Tại sao quan trọng: Sự cố rate-limiting kéo dài riêng trên WSL (VSCode session cũ không bị ảnh hưởng) khiến dev workflow bị gián đoạn; yêu cầu điều tra phân vùng rate limits/platform-specific behavior.

4) Tiến độ PR quan trọng (10 PR)
Chọn các PR có thay đổi chức năng, sửa lỗi cross-platform, tài liệu hướng dẫn, hoặc công cụ phát triển.

1. #31974 — feat(code-review): add pattern learning to auto-suggest CLAUDE.md rules  
   Link: https://github.com/anthropics/claude-code/pull/31974  
   Nội dung: Thêm lớp học mẫu để tự động gợi ý cập nhật CLAUDE.md khi cùng loại lỗi lặp lại qua PRs — cải thiện governance của assistant.

2. #31953 — fix: support equals-sign ralph-loop flags  
   Link: https://github.com/anthropics/claude-code/pull/31953  
   Nội dung: Hỗ trợ cờ dạng --flag=value cho script ralph-loop; mở rộng parsing cờ CLI.

3. #31945 — docs: Add CLAUDE.md repository guide for AI assistants  
   Link: https://github.com/anthropics/claude-code/pull/31945  
   Nội dung: Thêm tài liệu hướng dẫn CLAUDE.md cho assistants — giúp giữ nhất quán khi AI tương tác với repo.

4. #31701 — fix: respect $TMPDIR and os.tmpdir() instead of hardcoding /tmp/claude  
   Link: https://github.com/anthropics/claude-code/pull/31701  
   Nội dung: Thay /tmp/claude bằng TMPDIR/os.tmpdir() — khắc phục lỗi trên Termux/Android và môi trường hạn chế.

5. #31867 — feature: local shell interceptor  
   Link: https://github.com/anthropics/claude-code/pull/31867  
   Nội dung: Plugin chặn lệnh shell thông thường và thực thi cục bộ để tiết kiệm token/latency — cải thiện UX và chi phí.

6. #31732 — feat(feature-dev): add dry-run preview and iterative PR workflow  
   Link: https://github.com/anthropics/claude-code/pull/31732  
   Nội dung: Thêm preview dry-run trước khi code thay đổi; chia nhỏ công việc thành PR có thể review độc lập — workflow an toàn hơn cho feature dev.

7. #31728 — docs(plugin-dev): document MCP server deduplication behavior  
   Link: https://github.com/anthropics/claude-code/pull/31728  
   Nội dung: Tài liệu hóa hành vi bỏ qua MCP servers trùng lặp — giúp tránh cấu hình lặp.

8. #31723 — feat(plugin-dev): add HTTP hook type support to validate-hook-schema.sh  
   Link: https://github.com/anthropics/claude-code/pull/31723  
   Nội dung: Bổ sung hỗ trợ hook type "http" trong validator — mở rộng khả năng hook plugin.

9. #31721 — Fix hookify plugin imports missing CLAUDE_PLUGIN_ROOT fallback  
   Link: https://github.com/anthropics/claude-code/pull/31721  
   Nội dung: Sửa lỗi biến môi trường CLAUDE_PLUGIN_ROOT không có fallback khi chạy python hooks — tăng tính ổn định plugin execution.

10. #31717 — Fix hooks.json schema to use direct format across all plugins  
    Link: https://github.com/anthropics/claude-code/pull/31717  
    Nội dung: Sửa validator schema để dùng định dạng trực tiếp, tránh lỗi khi chạy hooks; giảm lỗi runtime cho hook authoring.

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Tương tác terminal tốt hơn: PTY/interactive shell support, iTerm2/tmux native split panes, customizable terminal title, statusline token usage chính xác. (See #9881, #24301, #31996 (closed), #32014)
- Quyền/permissions cho agent teams: bypassPermissions, kế thừa settings project, kiểm soát prompt permission cho Bash tools. (See #26479, #32009)
- Local execution & token/latency tối ưu: local shell interceptor và cơ chế dry-run để giảm token usage và rủi ro. (See #31867, #31732)
- Hook ecosystem: mở rộng schema (http hooks), bảo mật hooks, schema validator, tài liệu plugin/hook. (See #31723, #31717, #27289)
- Cross-platform stability: xử lý TMPDIR, WSL rate limits, macOS network ECONNRESET, Windows installer duplication. (See #31701, #31989, #5674, #31980)
- UX nhỏ nhưng quan trọng: nút “Create PR” trên web/iOS, sessions list, trust-folder behavior in VSCode. (See #30021, #32007, #32008)

6) Điểm đau của nhà phát triển (tóm tắt)
- Ổn định kết nối và platform-specific failures: macOS ECONNRESET, WSL rate-limits, Windows installer duplication gây mất thời gian debug. (High priority: #5674, #31989, #31980)
- Silent fallbacks / thiếu thông báo: teammateMode fallback sang in-process mà không cảnh báo gây nhầm lẫn (iTerm2/tmux issues). (See #24301, #24292, #23572)
- Quyền agent và bảo mật hooks: agents không thừa hưởng cấu hình hoặc bypassPermissions không hoạt động — rủi ro an toàn khi chạy scripts. (See #26479, #27289, #32009)
- UX/workflow chặn phát triển: thiếu nút Create PR, session lists biến mất, extension tạo cửa sổ thừa — làm gián đoạn developer flow. (See #30021, #32007, #32008)
- Chi phí/hiệu năng: Cowork tạo bundle lớn và plugin/local-exec để giảm token/latency là hai vấn đề đối trọng. (See #22543, #31867)

Kết luận nhanh
- Ưu tiên hiện tại: (1) fix Cowork bundle/performance (high-priority), (2) xử lý các lỗi connect/WSL/macOS, (3) ổn định agent permissions & hooks bảo mật. Các PR tài liệu và tooling (CLAUDE.md, hook schema, TMPDIR fixes, local shell interceptor) đang tiến triển giúp giảm nhiều vấn đề thực tế nếu được merge sớm.

Theo dõi chi tiết và tham gia thảo luận các issue/PR qua các link trong từng mục.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

Bản tin cộng đồng OpenAI Codex — 2026-03-08

1) Điểm nổi bật hôm nay
- Vòng cập nhật alpha cho kênh rust tiếp tục với các bản 0.112.0-alpha.10 → .11 → .12, cho thấy nỗ lực ổn định liên tiếp ở tầng runtime/tooling. (Tham khảo phần Phát hành phiên bản.)
- Cộng đồng nổi bật hai vấn đề lớn: (1) than phiền về giới hạn sử dụng/credit giảm đột ngột với nhiều phản hồi; (2) lỗi kết nối/streaming và vấn đề sandbox/permission trên Windows/macOS ảnh hưởng trải nghiệm desktop/CLI.

2) Phát hành phiên bản
- rust-v0.112.0-alpha.12 — Release 0.112.0-alpha.12  
  Link: https://github.com/openai/codex/releases/tag/rust-v0.112.0-alpha.12
- rust-v0.112.0-alpha.11 — Release 0.112.0-alpha.11  
  Link: https://github.com/openai/codex/releases/tag/rust-v0.112.0-alpha.11
- rust-v0.112.0-alpha.10 — Release 0.112.0-alpha.10  
  Link: https://github.com/openai/codex/releases/tag/rust-v0.112.0-alpha.10

Ghi chú: các bản trên là chuỗi alpha; changelog chi tiết không được cung cấp trong dữ liệu đầu vào — kỳ vọng tiếp tục ổn định test và sửa lỗi nội bộ.

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #13568 [bug, rate-limits] Usage dropping too quickly — Tác giả @sibonyves — Bình luận: 308 — 👍:85  
  Vì sao quan trọng: Vấn đề giới hạn/credit giảm đột ngột tác động trực tiếp năng suất người dùng; thread lớn (308 bình luận) cho thấy phạm vi ảnh hưởng rộng và nhu cầu hỗ trợ gấp.  
  Link: https://github.com/openai/codex/issues/13568

- #10450 [enhancement, app] Remote Development in Codex Desktop App — Tác giả @pocca2048 — Bình luận: 40 — 👍:272  
  Vì sao quan trọng: Yêu cầu hỗ trợ phát triển từ xa trong app desktop là yêu cầu tính năng lớn cho workflow thực tế (IDE → remote), có nhiều vote cộng đồng.  
  Link: https://github.com/openai/codex/issues/10450

- #3000 [enhancement, extension, TUI] Voice dictation / microphone input — Tác giả @hopenjin — Bình luận: 23 — 👍:78  
  Vì sao quan trọng: Gợi ý cho input bằng giọng nói (push-to-talk) trên nhiều surface (CLI/TUI/extension) — cải thiện trải nghiệm tương tác, đặc biệt cho thao tác hands-free.  
  Link: https://github.com/openai/codex/issues/3000

- #13574 [bug, windows-os, app] 5.3 apply_patch fails under sandboxed default permission on Windows — Tác giả @EarzuChan — Bình luận: 23 — 👍:13  
  Vì sao quan trọng: Lỗi do sandbox/permission khiến tính năng apply_patch không hoạt động trong môi trường mặc định Windows — ảnh hưởng luồng làm việc và an toàn.  
  Link: https://github.com/openai/codex/issues/13574

- #11011 [bug, app] Switching between threads is very slow — Tác giả @ImanYZ — Bình luận: 12 — 👍:6  
  Vì sao quan trọng: Hiệu năng UI khi chuyển thread chậm làm giảm trải nghiệm multi-thread/workflow cho người dùng Pro.  
  Link: https://github.com/openai/codex/issues/11011

- #13245 [bug, agent] Stream disconnected before completion: error sending request for url (...) — Tác giả @joe5saia — Bình luận: 8 — 👍:3  
  Vì sao quan trọng: Lỗi reconnect/streaming trên CLI gây mất phiên/không ổn định khi chạy agent/turn dài; ảnh hưởng reproducibility và automation.  
  Link: https://github.com/openai/codex/issues/13245

- #13747 [bug, app] Codex App bundles codex-cli 0.108.0-alpha.12 and fails on macOS, while standalone codex-cli 0.105.0 works — Tác giả @jlala — Bình luận: 4  
  Vì sao quan trọng: Vấn đề bản phân phối (bundled CLI trong App) gây crash/không khởi động trên macOS Apple Silicon — phá vỡ đường dẫn cài đặt phổ biến.  
  Link: https://github.com/openai/codex/issues/13747

- #13864 [bug, model-behavior, app] gpt-5.4 generates response to earlier messages not the last user message — Tác giả @cheulyop — Bình luận: 4  
  Vì sao quan trọng: Hành vi model trả lời sai message gần nhất dẫn tới sai ngữ cảnh và tin cậy; cần phân tích lỗi luồng context/turning.  
  Link: https://github.com/openai/codex/issues/13864

- #13917 [bug, windows-os, app] Codex desktop on Windows cannot start PowerShell host in session (8009001d) — Tác giả @TaylorAdamCA — Bình luận: 2  
  Vì sao quan trọng: Lỗi khởi tạo PowerShell host chặn nhiều workflow Windows; ảnh hưởng quyền truy cập môi trường người dùng.  
  Link: https://github.com/openai/codex/issues/13917

- #13638 [OPEN] Accented characters not working in Codex on WSL2 terminal in VSCode — Tác giả @samuelrizzo — Bình luận: 3  
  Vì sao quan trọng: Vấn đề encoding/locale làm hỏng ký tự có dấu (những ngôn ngữ không phải ASCII) trong trải nghiệm VSCode+WSL2, ảnh hưởng quốc tế hóa.  
  Link: https://github.com/openai/codex/issues/13638

4) Tiến độ PR quan trọng (10 PR nổi bật)
- #13593 Stabilize flaky tests — @aibrahim-oai  
  Nội dung: Chỉnh sửa và ổn định test flaky trong codex-rs, hướng tới deterministic test và loại bỏ debug tạm thời. Tác dụng: tăng độ tin cậy CI, giảm false negative.  
  Link: https://github.com/openai/codex/pull/13593

- #13820 Close realtime before interrupting on ctrl+c — @aibrahim-oai  
  Nội dung: Khi Ctrl+C trong realtime, đóng session realtime trước khi interrupt để tránh trạng thái treo; cũng hủy realtime khi meter voice bị xóa. Tác dụng: cải thiện UX cho realtime/voice interactions.  
  Link: https://github.com/openai/codex/pull/13820

- #13449 linux-sandbox: plumb split sandbox policies through helper — @bolinfest  
  Nội dung: Truyền chính sách sandbox tách filesystem/network qua helper Linux (bubblewrap/seccomp) thay vì dựa trên projection cũ. Tác dụng: sandbox chính xác hơn, giới hạn quyền tốt hơn.  
  Link: https://github.com/openai/codex/pull/13449

- #13092 Add request permissions tool — @mousseau-oai  
  Nội dung: Thêm tool tích hợp request_permissions cho phép một turn đang chạy yêu cầu quyền bổ sung từ client thay vì dùng policy tĩnh. Tác dụng: linh hoạt cấp quyền thời gian chạy, cải thiện UX tool-driven.  
  Link: https://github.com/openai/codex/pull/13092

- #13923 Add keyboard based fast switching between agents in TUI — @gabec-openai  
  Nội dung: Thêm navigation agent nhanh bằng phím tắt + hiển thị agent hiện hoạt; test & coverage. Tác dụng: tăng hiệu quả điều hướng multi-agent trên TUI.  
  Link: https://github.com/openai/codex/pull/13923

- #13777 Fix subagent notifications after interruptive resend — @gabec-openai  
  Nội dung: Chia sẻ AgentControl giữa ThreadManager clones và suppress trạng thái Interrupted tạm thời để notification/retry nhất quán. Tác dụng: cải thiện thông báo/flow khi resend/interrupt.  
  Link: https://github.com/openai/codex/pull/13777

- #13636 feat(tui): migrate cli surfaces to in-process app-server — @fcoury  
  Nội dung: Hợp nhất logic app-server vào process để tránh duplicate handshake/dispatch/shutdown behavior giữa TUI và exec. Tác dụng: giảm drift, dễ bảo trì, đồng nhất hành vi.  
  Link: https://github.com/openai/codex/pull/13636

- #13915 feat(core): allow guardian prompt overrides from model metadata — @charley-oai  
  Nội dung: Cho phép metadata model cung cấp override cho guardian prompt, nhưng vẫn thêm JSON contract. Tác dụng: linh hoạt cấu hình guardian theo model.  
  Link: https://github.com/openai/codex/pull/13915

- #13860 add guardian assessment thread items — @charley-oai  
  Nội dung: Thêm event GuardianAssessment lifecycle, persist và hiển thị trong app-server v2 thread items/notifications (experimental). Tác dụng: nâng khả năng audit/giám sát quyết định guardian.  
  Link: https://github.com/openai/codex/pull/13860

- #13276 start of hooks engine — @eternal-openai  
  Nội dung: MVP hooks engine (SessionStart/Stop) dưới codex-rs/hooks; hook synchronous, blocking turn progression. Tác dụng: khởi tạo nền tảng mở rộng automation/event hooks.  
  Link: https://github.com/openai/codex/pull/13276

5) Xu hướng yêu cầu tính năng (tóm tắt các hướng chính)
- Remote Development support trong Codex Desktop (IDE integration, remote workspaces). (Issue #10450)  
- Đầu vào bằng giọng nói / dictation (TUI/CLI/extension). (Issue #3000)  
- Công cụ quản lý quyền động: request_permissions để xin quyền thời gian chạy. (PR #13092)  
- Tính năng automation linh hoạt: single-use automations và thời gian lập lịch (one-off, delay/interval). (Issue #13925, #8317)  
- UX thread/conversation: fork từ message, copy plan, clear context & start coding, manual /compact command. (Issues #13087, #10561, #11325)  
- Tối ưu trải nghiệm TUI/CLI: keyboard agent switching, in-process app-server, realtime Ctrl+C behavior. (PRs #13923, #13636, #13820)  
- Guardian/assessment/metadata controls cho governance & auditing. (PRs #13915, #13860)  
- Hỗ trợ IDE thêm (ví dụ: PhpStorm trong "Open in"). (Issue #10884)

6) Điểm đau của nhà phát triển (tổng hợp)
- Quản lý giới hạn & credit: nhiều than phiền về usage tuần/giờ giảm đột ngột, yêu cầu minh bạch và tính toán lại giới hạn (ví dụ #13568, #13567).  
- Độ ổn định kết nối/streaming: reconnect/disconnected errors gây mất tiến trình, đặc biệt trên CLI/realtime (ví dụ #13245, #13832).  
- Sandbox & permission trên Windows/macOS: lỗi ở sandbox mặc định, PowerShell host, và chính sách macOS seatbelt (ví dụ #13574, #13917, PRs #13449/#13448).  
- Phân phối app vs standalone CLI: bundling phiên bản CLI trong App dẫn đến tương thích/khởi động (ví dụ #13747).  
- Hành vi model không đúng luồng (context misalignment): model trả lời tin cũ thay vì tin cuối cùng (ví dụ #13864).  
- Vấn đề encoding/locale trong terminal (mojibake, accented characters) ảnh hưởng quốc tế hóa (ví dụ #13638, #13743).  
- UX / hiệu năng trên UI/TUI: chậm khi chuyển thread, hiển thị context không đồng bộ, stale processes khi thoát app (ví dụ #11011, #13896, #13786).

Kết luận ngắn gọn
- Tâm điểm hiện nay nằm ở ổn định vận hành (rate limits, streaming, sandbox) và cải thiện trải nghiệm làm việc (remote dev, voice input, TUI shortcuts). Nhiều PR đang hướng tới infrastructure/guardrail (sandbox, guardian, hooks) — dấu hiệu tích cực cho độ trưởng thành nền tảng, nhưng các vấn đề cấp trải nghiệm người dùng vẫn cần ưu tiên xử lý.

Tài nguyên
- Kho mã: https://github.com/openai/codex

Nếu bạn muốn, tôi có thể:
- Soạn một danh sách issues có mức ưu tiên (critical/high/medium) để đội triage tham khảo.  
- Tạo mẫu comment trả lời chung cho các thread về rate-limits/usage để giảm thiết lập phản hồi lặp lại.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

Bản tin cộng đồng Gemini CLI — 2026-03-08

1) Điểm nổi bật hôm nay
- Không có phát hành mới trong 24 giờ qua. Trong khi đó, cộng đồng tiếp tục tập trung vào hai trục lớn: cải thiện trải nghiệm Agent/Subagent (remote agents, step-through/approval flows, task grouping) và giảm độ ồn/verbosity của model bằng chiến lược prompting mới.  
- Một issue đóng gần đây báo cáo người dùng bị kẹt khi đăng nhập (Auth Login) — vấn đề này có lượng thảo luận cao và đang được chú ý vì ảnh hưởng trực tiếp tới trải nghiệm on‑boarding. (Xem chi tiết bên dưới.)

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #2268 [CLOSED] Stuck in the Auth Login — https://github.com/google-gemini/gemini-cli/issues/2268  
  Tại sao quan trọng: lỗi chặn quy trình "Login with Google" (trình duyệt không mở / tiến trình đóng băng). Ảnh hưởng lớn tới người mới và deploy trên máy dùng Firefox / sudo. Đã có 10 bình luận và 3 lượt 👍 — nhiều thảo luận kỹ thuật/triaging.  

- #20716 [OPEN] Fix truncation of plans in the approval dialog — https://github.com/google-gemini/gemini-cli/issues/20716  
  Tại sao quan trọng: dialog phê duyệt cắt nội dung kế hoạch (>15 dòng), có thể che mất thông tin quan trọng khi người dùng review before approve. Đang chờ triage / đang có 8 bình luận.  

- #20302 [OPEN][Epic] Remote Agents: Sprint 1 (Foundation & Core UX) — https://github.com/google-gemini/gemini-cli/issues/20302  
  Tại sao quan trọng: epic nền tảng cho remote agents (streaming, core infra). Đây là roadmap chức năng quan trọng cho khả năng scale agent ra môi trường từ xa.  

- #21461 [OPEN] Gemini CLI Shell Command does not support aliases — https://github.com/google-gemini/gemini-cli/issues/21461  
  Tại sao quan trọng: không nhận alias shell (ví dụ alias baz=echo) làm giảm tính tương thích với môi trường dev. Giải pháp sẽ liên quan tới cách CLI spawn shell processes. Có 2 bình luận.  

- #20886 [OPEN] Refine subagents UX — https://github.com/google-gemini/gemini-cli/issues/20886  
  Tại sao quan trọng: UX cho subagent (history expander, matching mocks) để cải thiện visibility khi agent/ subagent gọi tool — trực tiếp ảnh hưởng đến debug và tin cậy.  

- #20550 [OPEN] Ran out of js heap — https://github.com/google-gemini/gemini-cli/issues/20550  
  Tại sao quan trọng: crash/GC trace khi xử lý lượng lớn dữ liệu; tác động tới reliability trên workload lớn. Có 2 bình luận và kèm file traceback.  

- #21602 [OPEN] Request: Wrap long prompts in Tool Confirmation Screen instead of truncating — https://github.com/google-gemini/gemini-cli/issues/21602  
  Tại sao quan trọng: truncation trong màn hình confirm tool (ví dụ WebFetch) làm người dùng không thấy đầy đủ nội dung họ sắp approve — ảnh hưởng an toàn/UX. Mới tạo, chưa có bình luận.  

- #21596 [OPEN] Warn users about suspicious policies — https://github.com/google-gemini/gemini-cli/issues/21596  
  Tại sao quan trọng: cảnh báo chính sách (policy) nguy hiểm (ví dụ auto-approve rm) — quan trọng cho an toàn khi cho phép tool có quyền chạy shell. Mới tạo, chưa có bình luận.  

- #21450 [OPEN] Implement 'Milestone-Driven' prompting strategy — https://github.com/google-gemini/gemini-cli/issues/21450  
  Tại sao quan trọng: thay đổi System Instructions để giảm narration thừa và tập trung vào milestones — mục tiêu làm agent "im lặng theo mặc định" nhằm giảm độ ồn cho người dùng.  

- #21433 [OPEN] Clean up Headless Mode Invocation and Implement Verbosity Levels — https://github.com/google-gemini/gemini-cli/issues/21433  
  Tại sao quan trọng: headless mode phải sạch và ổn định cho scripting/automation (1.0 requirement). Liên quan tới behavior cho pipelines / CI.  

4) Tiến độ PR quan trọng (10 PR)
- #18499 [OPEN] feat: Add voice input with pluggable backend (Gemini zero-install + Whisper) — https://github.com/google-gemini/gemini-cli/pull/18499  
  Tính năng: thêm input voice native với backend pluggable (mặc định dùng Gemini zero-install, tuỳ chọn Whisper). Tác động: trải nghiệm tương tác đa phương thức, có lợi cho accessibility.  

- #21581 [OPEN] feat(cli): add builtin /skills sync command — https://github.com/google-gemini/gemini-cli/pull/21581  
  Tính năng: lệnh /skills sync nội tại để đồng bộ skills từ external tools (Claude Code, OpenCode) — giảm phụ thuộc script bên ngoài, cải thiện độ tin cậy.  

- #21595 [OPEN] feat(core): add interactive task tree visualization (WIP) — https://github.com/google-gemini/gemini-cli/pull/21595  
  Tính năng: visualization cây nhiệm vụ tương tác cho tool/sub-agent calls — giúp debug luồng tác vụ và hiểu thứ tự thực thi. WIP.  

- #21119 [OPEN] Feat/browser privacy consent — https://github.com/google-gemini/gemini-cli/pull/21119  
  Tính năng: bổ sung first-run privacy disclosure và truyền đúng flags privacy vào Browser Agent (tùy chọn thu thập dữ liệu). Hữu ích cho compliance và quyền riêng tư.  

- #20992 [OPEN] fix(core): preserve registrationUrl in OAuth config merges — https://github.com/google-gemini/gemini-cli/pull/20992  
  Sửa lỗi: khôi phục registrationUrl khi merge cấu hình OAuth — cần thiết cho dynamic client registration (RFC 7591) với MCP servers.  

- #21601 [OPEN] fix(cli): treat SANDBOX=0/false as not inside sandbox — https://github.com/google-gemini/gemini-cli/pull/21601  
  Sửa lỗi: xử lý biến môi trường SANDBOX để '0'/'false' không bị hiểu là đang trong sandbox — tránh bypass logic init sandbox. Mới mở hôm nay.  

- #21206 [OPEN] refactor(cli): better react patterns for BaseSettingsDialog — https://github.com/google-gemini/gemini-cli/pull/21206  
  Cải tiến code: rút gọn React anti-patterns và cải thiện responsive rendering cho dialog settings; chuẩn bị cho alternate buffer settings dialog. Yêu cầu review.  

- #21509 [OPEN] Show extension name in /hooks panel UI — https://github.com/google-gemini/gemini-cli/pull/21509  
  Tính năng UI nhỏ nhưng hữu dụng: hiển thị tên extension khi xem hooks, giúp trace nguồn hook nhanh hơn.  

- #18367 [CLOSED] Windows performance optimizations: paste handling, shell compatibility, and message display — https://github.com/google-gemini/gemini-cli/pull/18367  
  Sửa lỗi/optimize: nhiều cải tiến hiệu năng cho Windows (large paste, shell compatibility). Đã đóng — quan trọng cho cross‑platform UX.  

- #18387 [CLOSED] feat(cli): support git submodules in extension installation — https://github.com/google-gemini/gemini-cli/pull/18387  
  Tính năng: hỗ trợ clone recursive và init submodules khi cài extension — tránh broken extensions do submodule thiếu. Đã merged/closed.

5) Xu hướng yêu cầu tính năng (tổng quan)
- Agent/Subagent & Remote Agents: nhiều epic/issue/PR hướng tới streaming, background processing, subagent UX, và remote agent sprints (#20302, #20303, #20304, #20886).  
- Giảm verbosity / Milestone-driven prompting: loạt issue/task triển khai audit system prompts, milestone pattern, và behavioral evals (#21449–21454, #21450).  
- Approval / Step-through flows: yêu cầu step approval mode để pause trước mỗi tool call và cải tiến dialog phê duyệt (#21593, #20716, #21602).  
- Headless/scriptable mode & stability: đảm bảo headless invocation sạch cho automation (#21433).  
- Security / Policy safety: cảnh báo policy nguy hiểm, OAuth fixes, browser privacy consent (#21596, #20992, #21119).  
- Performance & reliability: JS heap/OOM, cache I/O/network, avoid await, Windows fixes (#20550, #21518–21519, #21528, #18367).  
- Extensions & skills ecosystem: built-in /skills sync, hooks UI, submodule support (#21581, #21509, #18387).  
- UX terminal polish: accordion/collapsible UI, scrollbars, input prompt scrolling, task grouping (#21453, #21454, #21423).

6) Điểm đau của nhà phát triển (tóm tắt các vấn đề lặp lại)
- Đăng nhập / Auth flow không ổn định (browser open freeze) — block on‑boarding (#2268).  
- OAuth dynamic registration/config merge bị mất registrationUrl — can thiệp auth flows cho MCP (#20992).  
- Truncation/wrapping dialogs (plan approval, tool confirm) gây mất thông tin khi review — rủi ro an toàn (#20716, #21602).  
- Verbosity quá lớn từ agent làm output khó theo dõi; yêu cầu milestone/accordion để giảm noise (#21449–21454).  
- Sandbox env var parsing sai (SANDBOX='0' treated as true) gây init logic sai (#21601).  
- Windows-specific rendering/path/line ending issues và performance khi paste lớn — tác động cross‑platform (#18367, #21068, #21164).  
- Memory/JS heap exhaustion trên workload lớn — cần profil và caching (#20550, #21518–21519).  
- Không chạy alias shell và một số lỗi tương thích khi spawn shell commands — ảnh hưởng workflow dev (#21461).  
- Headless mode chưa hoàn toàn tin cậy cho scripting/CI (#21433).  
- Thiếu cảnh báo policy nguy hiểm khi cấu hình tool authorization — cần safety checks (#21596).

Kết luận ngắn: hiện tại cộng đồng đang chuyển từ giai đoạn "tăng tính năng" sang "ổn định hóa trải nghiệm" — tập trung vào reliability (auth, OAuth, memory), scripting/headless mode, và giảm độ ồn output bằng chiến lược prompting + UI collapse/accordion. Nếu bạn đang đóng góp, các mục cần reviewer/hỗ trợ hiện hữu: voice input, /skills sync, step-through approval scaffolding, Windows fixes, và các tasks audit/behavioral evals cho verbosity.

— End of newsletter —

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

Bản tin cộng đồng GitHub Copilot CLI — 2026-03-08

1) Điểm nổi bật hôm nay
- Không có bản phát hành mới trong 24 giờ qua. Cộng đồng đang thảo luận mạnh về các vấn đề liên quan đến môi trường shell (treo/timeout), tương tác terminal (phím mũi tên, IME, dán ảnh), và quyền truy cập mô hình/hiển thị mức sử dụng premium.  
- Một PR tinh chỉnh cấu trúc repository (di chuyển examples/gradio) đang chờ review; phần lớn hoạt động hiện tập trung vào ổn định UX/interop.

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
1. #575 — Bash execution environment hangs - all commands timeout  
   Link: https://github.com/github/copilot-cli/issues/575  
   Tại sao quan trọng: Lỗi làm treo mọi lệnh shell dẫn tới mất khả năng dùng chế độ !/shell — ảnh hưởng nghiêm trọng tới workflow. (Cập nhật 2026-03-07, 30 bình luận)  

2. #1284 — Arrow keys stopped working in CLI  
   Link: https://github.com/github/copilot-cli/issues/1284  
   Tại sao quan trọng: Phím mũi tên trả về ký tự thô ("A","B","C","D") thay vì điều hướng — gây suy giảm trải nghiệm tương tác cơ bản trong terminal. (12 bình luận)  

3. #1595 — Cannot access any model  
   Link: https://github.com/github/copilot-cli/issues/1595  
   Tại sao quan trọng: Người dùng doanh nghiệp báo không thể liệt kê/đăng ký mô hình do “access denied by Copilot policy” — tác động tới khả năng dùng tính năng AI cho tài khoản Enterprise. (11 bình luận, 👍4)  

4. #1698 — IME candidate window is misplaced, invisible, or detaches in CJK (Japanese) input (CLOSED)  
   Link: https://github.com/github/copilot-cli/issues/1698  
   Tại sao quan trọng: Vấn đề IME ảnh hưởng tới người dùng CJK; được cộng đồng đánh dấu rộng (51 👍) — tính đa ngôn ngữ/IME là yêu cầu thiết yếu. (Closed nhưng có nhiều tương tác)  

5. #1241 — Cannot paste image from screenshot tools into CLI terminal  
   Link: https://github.com/github/copilot-cli/issues/1241  
   Tại sao quan trọng: Dán ảnh từ clipboard (SnagIt, Snipping Tool) bị lỗi — giảm tính tiện lợi khi gửi ảnh/screenshot vào phiên làm việc. (4 bình luận, 👍6)  

6. #1754 — AssertionError [ERR_ASSERTION] during retrospective generation followed by HTTP/2 GOAWAY (503)  
   Link: https://github.com/github/copilot-cli/issues/1754  
   Tại sao quan trọng: Lỗi nội bộ + lỗi kết nối 503 cho thấy vấn đề độ bền/kết nối phía client hoặc MCP/HTTP2 gây gián đoạn khi chạy tác vụ dài. (4 bình luận, 👍9)  

7. #1546 — Thinking makes UI jitter  
   Link: https://github.com/github/copilot-cli/issues/1546  
   Tại sao quan trọng: UI “jitter” khi model đang suy nghĩ gây khó chịu, đặc biệt khi người dùng hủy/tiếp tục tác vụ — tác động trải nghiệm trực quan. (2 bình luận, 👍5)  

8. #1854 — Multi line not working on GitHub Copilot CLI 0.0.422-1 (CLOSED)  
   Link: https://github.com/github/copilot-cli/issues/1854  
   Tại sao quan trọng: Shift+Enter gửi lệnh thay vì xuống dòng — ảnh hưởng trực tiếp tới soạn thảo prompt đa dòng. (6 bình luận, 👍3)  

9. #1883 — Open files in external editor from within Copilot CLI  
   Link: https://github.com/github/copilot-cli/issues/1883  
   Tại sao quan trọng: Thiếu cơ chế mở file trực tiếp bằng editor bên ngoài (ví dụ: VSCode/Neovim) làm giảm tính liên tục của workflow giữa CLI và IDE. (1 bình luận)  

10. #1881 — Display premium request overage usage when personal allowance is exhausted  
    Link: https://github.com/github/copilot-cli/issues/1881  
    Tại sao quan trọng: Hiển thị mức sử dụng overage/billing chưa rõ ràng — người dùng và tổ chức cần minh bạch về ai/bao nhiêu request bị tính phí. (1 bình luận, 👍1)  

4) Tiến độ PR quan trọng
- Chỉ có 1 PR cập nhật trong 24 giờ qua:
  - #1617 — Top-level cleanup: move examples/gradio and add scripts  
    Link: https://github.com/github/copilot-cli/pull/1617  
    Tóm tắt: Tổ chức lại repository — di chuyển gradio/ → examples/gradio, thêm scripts hỗ trợ di chuyển/đọc tài liệu. Giúp cấu trúc rõ ràng hơn trước các thay đổi top-level; không phải PR tính năng hoặc sửa lỗi runtime.

  Ghi chú: Không có nhiều PR tính năng/sửa lỗi mới được cập nhật trong phạm vi 24h này — hiện cộng đồng tập trung vào issue triage và ổn định trải nghiệm tương tác.

5) Xu hướng yêu cầu tính năng (từ các Issues)
- Cải thiện tương tác terminal/TTY: xử lý escape sequences (phím mũi tên), hỗ trợ OSC 8 hyperlinks, tối ưu hóa trạng thái “thinking” để tránh jitter. (ví dụ #1284, #1837, #1546)  
  Link ví dụ: https://github.com/github/copilot-cli/issues/1284, https://github.com/github/copilot-cli/issues/1837

- Hỗ trợ IME và đa ngôn ngữ: sửa lỗi hiển thị/preedit cho CJK và các IME khác (bao gồm Vietnamese). (ví dụ #1698, #838)  
  Link ví dụ: https://github.com/github/copilot-cli/issues/1698

- Clipboard / dán ảnh: restore/paste screenshot từ clipboard trên Windows/macOS. (ví dụ #1241, #1894)  
  Link ví dụ: https://github.com/github/copilot-cli/issues/1241

- Minh bạch billing/usage: hiển thị overage/budget khi vượt hạn mức premium request. (ví dụ #1677, #1881)  
  Link ví dụ: https://github.com/github/copilot-cli/issues/1677

- Quản trị truy cập/route mô hình: model routing, quyền truy cập theo chính sách tổ chức, và khả năng chọn mô hình cho agent. (ví dụ #1595, #1354)  
  Link ví dụ: https://github.com/github/copilot-cli/issues/1595

- Tích hợp editor/IDE: mở file trong editor bên ngoài, tài liệu /ide cho VS/other IDEs, và hỗ trợ LSP config (/.github/lsp.json). (ví dụ #1883, #1868, #1886)  
  Link ví dụ: https://github.com/github/copilot-cli/issues/1883

- An toàn agent / deterministic behavior: tránh agent chạy các hướng dẫn cũ không liên quan (plan.md stale writes). (ví dụ #1896)  
  Link: https://github.com/github/copilot-cli/issues/1896

6) Điểm đau của nhà phát triển (tóm tắt ngắn gọn)
- Môi trường shell không ổn định / treo lệnh (#575) — làm mất khả năng dùng các lệnh shell trong session.  
- Tương tác terminal cơ bản bị hỏng: mũi tên, multiline, clipboard/paste hình ảnh — ảnh hưởng UX hàng ngày (#1284, #1854, #1241).  
- IME & input composition cho CJK/Vietnamese — nhiều người dùng bị ảnh hưởng, cần ưu tiên. (#1698, #838)  
- Quyền truy cập mô hình và routing không nhất quán — người dùng Enterprise gặp “access denied” dù có subscription. (#1595)  
- Thiếu minh bạch về billing/overage trong UI — cần hiển thị rõ remaining/overage để tránh bất ngờ phí tổn. (#1677, #1881)  
- Sự kiện lỗi backend/HTTP2 (503) và assertion errors khi chạy tác vụ dài — vấn đề độ bền/kết nối. (#1754)  
- Thiếu tài liệu/interop cho /ide với IDE khác ngoài VSCode và cấu hình LSP/MCP. (#1868, #1886)  
- Plugin management edge-cases: cập nhật plugin cài trực tiếp từ repo thất bại do thiếu field source. (#1885)  

Kết luận nhanh
- Hiện ưu tiên cộng đồng là sửa các lỗi tương tác cơ bản (terminal/IME/clipboard) và các vấn đề về quyền truy cập mô hình/billing. Nếu bạn gặp các lỗi trên, hãy đóng góp logs, môi trường (OS/version/terminal) và reproduction steps vào issue tương ứng để đẩy nhanh triage.

Nếu bạn muốn bản tin hàng tuần hoặc phiên bản ngắn gọn cho nhóm, tôi có thể rút gọn hoặc xuất bản ở dạng markdown.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

Bản tin cộng đồng Kimi Code CLI — 2026-03-08

Tổng quan repo: https://github.com/MoonshotAI/kimi-cli

1) Điểm nổi bật hôm nay
- Không có phát hành mới trong 24 giờ qua. Hoạt động chính tập trung vào báo cáo lỗi liên quan đến kết nối với nhà cung cấp LLM và một số đề xuất cải thiện trải nghiệm người dùng (slash commands, remote session, chia sẻ ngữ cảnh cho task song song).
- 1 Pull Request đang mở (sửa xử lý header OAuth) có khả năng khắc phục lỗi nền tảng gây LocalProtocolError trên một số hệ thống.

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (danh sách hiện có — 5 mục)
Lưu ý: đây là toàn bộ Issues được cập nhật trong 24 giờ qua trong dữ liệu cung cấp.

1. #1285 — Bug: LLM provider error: Connection error.
   - Tác giả: @perogeremmer | Tạo: 2026-02-27 | Cập nhật: 2026-03-07 | Bình luận: 8
   - Tại sao quan trọng: lỗi kết nối tới provider LLM ảnh hưởng trực tiếp khả năng dùng CLI để code/hoạt động; nhiều nhà phát triển bị gián đoạn.  
   - Phản ứng cộng đồng: thảo luận nhiều (8 bình luận), cần log chi tiết và reproducible steps để điều tra.  
   - Link: https://github.com/MoonshotAI/kimi-cli/issues/1285

2. #751 — Enhancement: Slash commands execute immediately upon selection.
   - Tác giả: @Grin1024 | Tạo: 2026-01-28 | Cập nhật: 2026-03-07 | Bình luận: 3
   - Tại sao quan trọng: trải nghiệm tương tác CLI; giảm bước nhấn Enter thứ hai sẽ làm thao tác nhanh và trực quan hơn cho người dùng tương tác.  
   - Phản ứng cộng đồng: đề xuất UX rõ ràng, đang chờ maintainers cân nhắc thay đổi hành vi mặc định.  
   - Link: https://github.com/MoonshotAI/kimi-cli/issues/751

3. #1332 — Bug: lỗi sau khi nâng cấp lên 1.17.0 trên Ubuntu 22.04.
   - Tác giả: @babushkinaa | Tạo: 2026-03-03 | Cập nhật: 2026-03-07 | Bình luận: 2
   - Tại sao quan trọng: báo cáo nâng cấp gây lỗi làm giảm độ tin cậy của release process trên distro phổ biến; cần xác định regression và hướng khắc phục nhanh.  
   - Phản ứng cộng đồng: có các thông tin nền (platform/version); maintainers cần log/trace cụ thể để tái tạo.  
   - Link: https://github.com/MoonshotAI/kimi-cli/issues/1332

4. #1282 — Enhancement: Remote Control - Continue local sessions from any device.
   - Tác giả: @CatKang | Tạo: 2026-02-27 | Cập nhật: 2026-03-07 | Bình luận: 1 | 👍: 1
   - Tại sao quan trọng: tăng tính di động và continuity của workflow — nhiều dev muốn tiếp tục session trên điện thoại/tablet/browser mà vẫn tận dụng env local.  
   - Phản ứng cộng đồng: có upvote, đề xuất tính năng nhận được sự quan tâm; cần đánh giá bảo mật/arch (tunnel, auth, sync).  
   - Link: https://github.com/MoonshotAI/kimi-cli/issues/1282

5. #1362 — Enhancement (zh): Parallel tasks share task context descriptions...
   - Tác giả: @littletiny | Tạo/Cập nhật: 2026-03-07 | Bình luận: 0
   - Tại sao quan trọng: tối ưu hóa giải mã/chi phí cho agent chính khi chạy tác vụ song song — đề xuất cấu trúc prompt hai giai đoạn (shared + task) có thể giảm overhead đáng kể.  
   - Phản ứng cộng đồng: đề xuất kỹ thuật, cần thảo luận về API Task và backward compatibility.  
   - Link: https://github.com/MoonshotAI/kimi-cli/issues/1362

4) Tiến độ PR quan trọng (dữ liệu hiện tại: 1 PR)
Lưu ý: chỉ có 1 PR được cập nhật trong 24 giờ qua trong dữ liệu nguồn.

1. #1361 — fix: strip whitespace from oauth header values
   - Tác giả: @0xsirsaif | Tạo/Cập nhật: 2026-03-07
   - Mô tả: loại bỏ khoảng trắng đầu/cuối trong giá trị header OAuth/common trước khi gửi request. Sửa lỗi X-Msh-Os-Version khi platform.version() có trailing whitespace và ngăn ngừa httpx.LocalProtocolError.  
   - Tại sao quan trọng: xử lý lỗi nền tảng cụ thể giúp ổn định kết nối HTTP, có thể khắc phục các triệu chứng lỗi nâng cấp/connection observed trong issues. PR tham chiếu resolve #886, #414.  
   - Link: https://github.com/MoonshotAI/kimi-cli/pull/1361

5) Xu hướng yêu cầu tính năng
Tóm tắt các hướng quan tâm chính rút ra từ Issues hiện có:
- Trải nghiệm tương tác CLI (slash commands nên thực thi ngay khi chọn) — #751 (UX/efficiency).
- Tiếp nối session từ xa / remote control để tiếp tục session local trên thiết bị khác — #1282 (mobility + continuity + security).
- Quản lý ngữ cảnh cho task song song, giảm tải decode cho agent chính (two-stage prompts: shared + task) — #1362 (performance & cost).
- Stabilize LLM connectivity và xử lý lỗi HTTP/platform-specific — #1285, #1332 và PR #1361 (reliability).
- Yêu cầu logging/diagnostics rõ ràng để tái tạo và điều tra lỗi upgrade/connection.

(Links: #751 https://github.com/MoonshotAI/kimi-cli/issues/751, #1282 https://github.com/MoonshotAI/kimi-cli/issues/1282, #1362 https://github.com/MoonshotAI/kimi-cli/issues/1362, #1285 https://github.com/MoonshotAI/kimi-cli/issues/1285, #1332 https://github.com/MoonshotAI/kimi-cli/issues/1332)

6) Điểm đau của nhà phát triển (tổng hợp ngắn gọn)
- Kết nối tới nhà cung cấp LLM không ổn định hoặc không có thông tin lỗi đủ chi tiết để debug (Issue #1285). Link: https://github.com/MoonshotAI/kimi-cli/issues/1285
- Regres­sion sau nâng cấp trên một số distro (Ubuntu 22.04 gặp lỗi chạy sau nâng cấp lên 1.17.0) gây mất niềm tin vào release cadence. Link: https://github.com/MoonshotAI/kimi-cli/issues/1332
- Trải nghiệm tương tác đôi khi cồng kềnh (slash commands yêu cầu nhấn Enter hai lần) khiến thao tác lặp tốn thời gian. Link: https://github.com/MoonshotAI/kimi-cli/issues/751
- Thiếu khả năng tiếp tục session từ thiết bị khác — mong muốn remote control/continuity tính năng. Link: https://github.com/MoonshotAI/kimi-cli/issues/1282
- Khi chạy tác vụ song song, parent agent phải lặp giải mã cùng ngữ cảnh nhiều lần — cần design Task API hỗ trợ shared context để giảm overhead. Link: https://github.com/MoonshotAI/kimi-cli/issues/1362
- Vấn đề platform-specific headers/whitespace có thể gây lỗi HTTP (đang có PR sửa) — cần kiểm thử đa nền tảng. PR #1361: https://github.com/MoonshotAI/kimi-cli/pull/1361

Kết luận / Gợi ý hành động ngắn
- Ưu tiên điều tra và thu thập logs cho #1285 và #1332 (repro steps, http logs, environment info).  
- Xem xét merge PR #1361 sớm nếu kiểm thử đa nền tảng cho thấy giải quyết được LocalProtocolError. PR: https://github.com/MoonshotAI/kimi-cli/pull/1361  
- Thảo luận roadmap UX cho slash commands (#751) và đánh giá thiết kế bảo mật/architectural cho Remote Control (#1282).  
- Bắt đầu thảo luận kỹ thuật về design Task hai giai đoạn để hỗ trợ sharing context (#1362).

Nếu bạn muốn, tôi có thể soạn mẫu checklist để thu thập logs cho #1285 và #1332 hoặc đề xuất API draft cho Task two-stage prompts để đem lên bàn thảo luận.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

OpenCode — Bản tin cộng đồng (2026-03-08)

1) Điểm nổi bật hôm nay
- Phiên bản v1.2.21 vừa phát hành (xem mục Phát hành bên dưới) với nhiều sửa lỗi ổn định liên quan đến git/PTY và xử lý tên file preview.  
- Cộng đồng đang thảo luận mạnh về hai mũi nhọn: cải thiện quản lý context/compact để tiết kiệm chi phí và cơ chế chọn model động cho subagents (Task tool). Nhiều PR sửa lỗi TUI / LSP đang tiến triển để giải quyết treo UI và vấn đề với file lớn.

2) Phát hành phiên bản
- v1.2.21 — (chi tiết release: https://github.com/anomalyco/opencode/releases/tag/v1.2.21)
  - Preserve original line endings in edit tool (đóng góp: @ranqn) — giữ kết cấu file khi sửa.
  - Fix Git path resolution for modified files across Git Bash, MSYS2, and Cygwin on Windows — sửa đường dẫn Git trên Windows.
  - Fix PTY session handle leak (@kikuchan) — sửa rò rỉ handle PTY.
  - Sanitize preview database filenames — tránh tên file preview không hợp lệ.
  - Log stack trace when schema validation fails — log chi tiết hơn khi validate schema lỗi.
  - (Ghi chú: changelog có mục bị cắt trong dữ liệu nguồn — xem release page để biết chi tiết đầy đủ.)

3) Issues nóng trong cộng đồng — 10 mục đáng chú ý
(Dưới mỗi mục: vì sao quan trọng + phản ứng cộng đồng)

1. #6708 — "GLM 4.7 on Zai coding plan puts tool calls inside the thinking/reasoning tag"  
   Link: https://github.com/anomalyco/opencode/issues/6708  
   Tại sao quan trọng: tool-calling bị đóng vào thẻ reasoning khiến session hỏng và bắt buộc phải restart; ảnh hưởng trực tiếp đến độ tin cậy của agent khi gọi tool.  
   Phản ứng: 28 bình luận, nhiều người xác nhận tái tạo sự cố; +8 thumbs — đang được thảo luận tích cực.

2. #6651 — "[FEATURE] Dynamic model selection for subagents via Task tool"  
   Link: https://github.com/anomalyco/opencode/issues/6651  
   Tại sao quan trọng: subagents hiện không thể được chỉ định model động — hạn chế lớn cho workflows phân tác vụ, scale và dùng model rẻ hơn/đặc thù cho subtask.  
   Phản ứng: 16 bình luận, +23 thumbs — cộng đồng mong muốn mạnh mẽ.

3. #8140 — "Configurable context limit and auto-compaction threshold"  
   Link: https://github.com/anomalyco/opencode/issues/8140  
   Tại sao quan trọng: người dùng cần kiểm soát trigger compaction để tối ưu chi phí và hiệu suất; hiện chỉ dùng ngưỡng mặc định của model.  
   Phản ứng: 11 bình luận, +23 thumbs — đề xuất có lượng ủng hộ cao.

4. #11439 — "Support parsing <think> and <thinking> tags as reasoning blocks"  
   Link: https://github.com/anomalyco/opencode/issues/11439  
   Tại sao quan trọng: hỗ trợ hiển thị reasoning blocks từ model không có thinking-native giúp tương thích với nhiều provider/custom prompts.  
   Phản ứng: 10 bình luận, +8 thumbs — hữu ích cho khả năng tương tác và debug.

5. #16506 (CLOSED) — "Drizzle migration name mismatch causes startup crash on upgrade to v1.2.21"  
   Link: https://github.com/anomalyco/opencode/issues/16506  
   Tại sao quan trọng: nâng cấp gây crash toàn bộ startup — ảnh hưởng đến trải nghiệm upgrade; liên quan đến migration DB và beta builds.  
   Phản ứng: 9 bình luận — đã xác định root cause (beta pollute migrations) và issue đã đóng; quan trọng cho người upgrade.

6. #16494 — "TypeError: Cannot read properties of undefined (reading 'length') in session view"  
   Link: https://github.com/anomalyco/opencode/issues/16494  
   Tại sao quan trọng: lỗi runtime trên web UI gây crash view session — tác động UX nghiêm trọng.  
   Phản ứng: 9 bình luận — đang điều tra.

7. #5444 — "MCP with oauth doesn't work"  
   Link: https://github.com/anomalyco/opencode/issues/5444  
   Tại sao quan trọng: MCP là integration quan trọng; cấu hình OAuth không hoạt động làm gián đoạn nhiều workflows tích hợp bên ngoài.  
   Phản ứng: 7 bình luận — issue vẫn mở, người dùng cung cấp logs / config.

8. #16528 — "TUI renders blank responses when launched from a symlinked directory"  
   Link: https://github.com/anomalyco/opencode/issues/16528  
   Tại sao quan trọng: symlink/worktree là setup phổ biến (dotfiles, worktrees) — gây blank UI, nhưng model vẫn xử lý backend, khiến debugging khó xác định.  
   Phản ứng: 3 bình luận, cập nhật reproducible steps.

9. #16115 — "UI freezes indefinitely when patching large Python files in large projects"  
   Link: https://github.com/anomalyco/opencode/issues/16115  
   Tại sao quan trọng: ảnh hưởng đến dev productivity khi thao tác file lớn; gây pyright cold-start, CPU cao và treo.  
   Phản ứng: 1 bình luận — đã tạo PR fix liên quan (xem PR #16538).

10. #16511 — "Random hexadecimal characters in chat input (opentui, windows/tmux)"  
    Link: https://github.com/anomalyco/opencode/issues/16511  
    Tại sao quan trọng: làm giao diện nhập liệu TUI mất tin cậy trong môi trường tmux; ảnh hưởng dev dùng terminal workflows.  
    Phản ứng: 2 bình luận — có báo lại bước tái tạo (tmux shortcut), cần debugging terminal input handling.

4) Tiến độ PR quan trọng — 10 PR cần chú ý
(Short summary + link)

1. #16538 — fix(lsp): prevent socket deadlock on large files with incremental sync  
   Link: https://github.com/anomalyco/opencode/pull/16538  
   Tóm tắt: Sửa deadlock socket khi incremental sync với file lớn — trực tiếp giải quyết issue #16115 (UI freezes). Status: open.

2. #16541 (CLOSED) — fix(opencode): sort log files before cleanup to avoid deleting newest  
   Link: https://github.com/anomalyco/opencode/pull/16541  
   Tóm tắt: Sửa race condition và ordering khi cleanup log — tránh xóa file log mới nhất. Đã đóng/merged; fixes #14731.

3. #15387 — fix: use StringDecoder for stdout/stderr to prevent UTF-8 corruption  
   Link: https://github.com/anomalyco/opencode/pull/15387  
   Tóm tắt: Thu thập stdout/stderr an toàn để tránh hỏng UTF-8 khi ghép chunk — cải thiện reliability của tool/bash và session.prompt.

4. #13854 — fix(tui): stop streaming markdown/code after message completes  
   Link: https://github.com/anomalyco/opencode/pull/13854  
   Tóm tắt: Khắc phục rendering markdown/code streaming trong TUI — đảm bảo message hoàn chỉnh được hiển thị đầy đủ (fixes #13855).

5. #15250 — feat(app): view archived sessions & unarchive  
   Link: https://github.com/anomalyco/opencode/pull/15250  
   Tóm tắt: Thêm UI quản lý session đã archive — hữu ích cho lịch sử và phục hồi session lâu dài.

6. #15266 — feat(app): changelog with PR links  
   Link: https://github.com/anomalyco/opencode/pull/15266  
   Tóm tắt: Hiển thị release notes/PR links trong Settings — giúp người dùng dễ theo dõi thay đổi.

7. #16431 — fix(tui): fix broken /mcp toggling  
   Link: https://github.com/anomalyco/opencode/pull/16431  
   Tóm tắt: Sửa tương tác toggle /mcp trong một số terminal (ví dụ VS Code Integrated Terminal) — cải thiện UX trong TUI.

8. #16552 — feat(opencode): thought level config in acp  
   Link: https://github.com/anomalyco/opencode/pull/16552  
   Tóm tắt: Thay đổi cách cấu hình “thinking modes” trong ACP (giảm số lượng model duplicate bằng config mức thinking) — feature-oriented change để đơn giản hóa quản lý model.

9. #16551 — Fix subagent MCP tool permissions  
   Link: https://github.com/anomalyco/opencode/pull/16551  
   Tóm tắt: Subagents spawned via Task tool giờ có thể thực thi MCP tools — sửa lỗi về permission array thiếu MCP tools; fixes #16491.

10. #16555 — docs: add local-memory to ecosystem  
    Link: https://github.com/anomalyco/opencode/pull/16555  
    Tóm tắt: Thêm plugin community "local-memory" vào docs ecosystem — local SQLite memory bằng Ollama embeddings, 100% local.

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Model selection động cho subagents / Task tool (#6651, #16551): cần cơ chế chọn model cụ thể cho subtask, cùng với quyền và permissions cho subagent.  
- Cấu hình context & auto-compaction (#8140): cho phép trigger compaction sớm, custom max context để tối ưu chi phí.  
- Support reasoning/thinking tags (<think>/<thinking>) (#11439): parse/hiển thị reasoning blocks từ nhiều provider.  
- Modular config (config.d/) để chia nhỏ opencode.json cho dự án lớn (#9062).  
- Hỗ trợ các model frontier mới (ví dụ Grok 4.2) và mở rộng provider (#16277, #16542).  
- API usage/plan endpoints (Go plan usage) để thống kê và giám sát usage programmatically (#16017).  
- UX: "Accept plan and clear context" cho chế độ Plan Mode (#13271) — thao tác nhanh khi kết thúc plan.  
- Thought-level config / unify thinking modes (#16552) — giảm duplicate models, dễ quản lý.

6) Điểm đau của nhà phát triển — tổng hợp ngắn
- Tool-calling reliability: công cụ gọi (tool calling) với một số open-source models hoặc trong thinking tags vẫn không ổn định (ví dụ #6708, #234).  
- Custom provider incompatibilities: provider OpenAI-compatible trả về response nhưng opencode hiển thị rỗng / 0 tokens (ví dụ #5210, #15756, #10573) — nhiều báo cáo về SDK/session prompt trả rỗng.  
- Terminal/TUI edge cases: tmux / symlink / worktree / TERM differences gây blank responses, escape sequences text, random hex chars trong input (#16528, #16547, #16511, #15482).  
- Upgrades & migrations: migration naming / drizzle table pollution từ beta builds có thể crash khi upgrade (v1.2.21) — người dùng cần chỉ dẫn rollback/cleanup (#16506).  
- Large project perf: patching file lớn kích hoạt pyright scans, gây CPU spike và UI freeze — cần incremental sync / LSP fixes (#16115, PR #16538).  
- Cross-platform path/encoding bugs: Windows Git path resolution, UTF-8 corruption on child stdout chunks, code signature issues on macOS updates (# v1.2.21 notes, #15387, #9939).  
- UX polish: color scheme bugs (code unreadable in light mode #16470), fixed session width in v1.2.21 (#16516) — ảnh hưởng trực quan.

Kết luận / Gợi ý cho người đọc
- Nếu bạn phụ thuộc vào subagents hoặc nhiều model trong workflows, theo dõi #6651 và PR liên quan (ví dụ #16551) để cập nhật thay đổi quyền và chọn model.  
- Nếu gặp treo khi thao tác file lớn hoặc blank TUI trong tmux/symlink, thử cập nhật lên branch có PR #16538/#13854/#15387 hoặc theo dõi các PR này để biết thời điểm merge.  
- Khi nâng cấp lên v1.2.21, kiểm tra migrations (đặc biệt nếu bạn chạy các beta builds trước đó) để tránh lỗi Drizzle migration (#16506).

Theo dõi các link dưới đây để cập nhật nhanh:
- Repo chính: https://github.com/anomalyco/opencode  
- Release v1.2.21: https://github.com/anomalyco/opencode/releases/tag/v1.2.21

Các links thảo luận/PR chính đã dẫn ở từng mục trên. Nếu bạn muốn, tôi có thể tạo một bản tóm tắt riêng cho nhóm QA/DevOps với checklist upgrade (migrations backup, test plan, rollback steps).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

Bản tin cộng đồng Qwen Code — 2026-03-08

1) Điểm nổi bật hôm nay
- Phát hành nightly v0.12.0 có hai cập nhật chính: sửa parsing frontmatter trên Windows (CRLF/BOM) và thêm tabWidth cho code highlighting/đổi tab thành spaces trong CodeColorizer. (Chi tiết ở phần Phát hành phiên bản)
- Cộng đồng đang tập trung trên một số lỗi đầu vào/UX trong môi trường VS Code (phím Space không nhập được trong ô chat) và lỗi hiển thị thông báo lỗi không được xoá khi đổi model — các PR sửa lỗi và cải tiến UI/điều phối session đang được mở.  

2) Phát hành phiên bản
- v0.12.0-nightly.20260308.0b7ad066 — Release v0.12.0-nightly.20260308.0b7ad066  
  What's Changed:
  - fix(cli): parse markdown command frontmatter on Windows CRLF/BOM — khắc phục parsing frontmatter trên Windows để tránh lỗi khi file có CRLF hoặc BOM. (PR: https://github.com/QwenLM/qwen-code/pull/2078)
  - feat: add tabWidth support for code highlighting and replace tabs with spaces in CodeColorizer — thêm tùy chỉnh tabWidth cho highlight mã, và tự động thay tab bằng spaces trong trình tô màu mã nhằm đảm bảo hiển thị nhất quán. (PR: https://github.com/QwenLM/qwen-code/pull/2077)
  Link bản phát hành: https://github.com/QwenLM/qwen-code/releases

3) Issues nóng trong cộng đồng (mới/được cập nhật trong 24 giờ qua)
Lưu ý: danh sách dưới đây phản ánh các issue được cung cấp (7 mục). Mỗi mục kèm link, lý do quan trọng và phản ứng cộng đồng.

- #2101 — space button issue  
  Tác giả: @Manolito016 | Tạo: 2026-03-05 | Cập nhật: 2026-03-07 | Bình luận: 5 | 👍: 4  
  Link: https://github.com/QwenLM/qwen-code/issues/2101  
  Tại sao quan trọng: lỗi khiến người dùng không thể nhập ký tự space trong ô chat; ảnh hưởng trực tiếp trải nghiệm trong VS Code. Đã có nhiều comment và upvote => mức ảnh hưởng thực tế cao.

- #2186 — Space character input not working in Qwen  
  Tác giả: @TarasVP | Tạo: 2026-03-06 | Cập nhật: 2026-03-07 | Bình luận: 1 | 👍: 2  
  Link: https://github.com/QwenLM/qwen-code/issues/2186  
  Tại sao quan trọng: báo cáo tương tự #2101 nhưng từ môi trường VS Code integrated terminal; khẳng định đây là vấn đề lặp lại/đa nền tảng. Có upvote, cần ưu tiên điều tra giao diện input.

- #2105 — Error message not cleared after switching model and sending new request  
  Tác giả: @yiliang114 | Tạo: 2026-03-05 | Cập nhật: 2026-03-07 | Bình luận: 4 | 👍: 0  
  Link: https://github.com/QwenLM/qwen-code/issues/2105  
  Tại sao quan trọng: UX bối rối khi lỗi cũ vẫn hiển thị sau khi đổi model; dẫn tới hiểu sai trạng thái yêu cầu. Được nhiều bình luận kỹ thuật; đã có PR liên quan (#2192).

- #2191 — Error during web search: THROTTLING.userQPSLimit (429)  
  Tác giả: @xDeshe4ka | Tạo: 2026-03-07 | Cập nhật: 2026-03-07 | Bình luận: 1 | 👍: 1  
  Link: https://github.com/QwenLM/qwen-code/issues/2191  
  Tại sao quan trọng: throttling từ dịch vụ tìm kiếm gây lỗi 429; ảnh hưởng chức năng web-search và trải nghiệm liên quan đến công cụ bổ trợ.

- #2190 — tools (InternalError.Algo.InvalidParameter related to tool_calls)  
  Tác giả: @chuckyLeeVIII | Tạo: 2026-03-07 | Cập nhật: 2026-03-07 | Bình luận: 0 | 👍: 0  
  Link: https://github.com/QwenLM/qwen-code/issues/2190  
  Tại sao quan trọng: lỗi nội bộ liên quan tới định dạng cuộc gọi tool -> tool_responses; có thể phá vỡ tích hợp tool hoặc execution pipeline.

- #1902 — deleting chat history in the CLI (feature request)  
  Tác giả: @slimeopus | Tạo: 2026-02-22 | Cập nhật: 2026-03-07 | Bình luận: 3 | 👍: 0  
  Link: https://github.com/QwenLM/qwen-code/issues/1902  
  Tại sao quan trọng: quản lý lịch sử chat trong CLI đang thiếu lệnh xóa; quan trọng cho maintainer/điều hành phiên làm việc dài hạn và quyền riêng tư.

- #821 — Failed to initialize Qwen: Qwen OAuth authentication failed (Đã đóng, trạng thái: need-information -> closed)  
  Tác giả: @yshngg | Tạo: 2025-10-16 | Cập nhật: 2026-03-07 | Bình luận: 2 | 👍: 0  
  Link: https://github.com/QwenLM/qwen-code/issues/821  
  Tại sao quan trọng: vấn đề auth khi khởi chạy CLI (device flow / token refresh); mặc dù đã đóng, vẫn cho thấy các biến thể thất bại khi dùng token manager trong môi trường khác nhau.

4) Tiến độ PR quan trọng (mới/được cập nhật trong 24 giờ qua)
(Danh sách PR hiện có: 4 mục)

- #2193 — feat: add --worktree flag for parallel session execution  
  Tác giả: @jqueguiner | Tạo: 2026-03-08  
  Link: https://github.com/QwenLM/qwen-code/pull/2193  
  Mô tả: Thêm cờ --worktree để tạo git worktrees cô lập, cho phép chạy nhiều phiên Qwen Code song song với tách biệt file hoàn toàn — hữu ích cho CI, testing và đa session.

- #2192 — fix: clear retry error even without countdown timer  
  Tác giả: @hkc5 | Tạo: 2026-03-07  
  Link: https://github.com/QwenLM/qwen-code/pull/2192  
  Mô tả: Sửa #2105 — đảm bảo thông báo lỗi retry được xoá ngay cả khi không có countdown timer; cải thiện UX khi đổi model hoặc gửi yêu cầu mới.

- #2188 — feat(vscode-ide-companion): add sidebar view and multi-position chat layout  
  Tác giả: @yiliang114 | Tạo: 2026-03-07  
  Link: https://github.com/QwenLM/qwen-code/pull/2188  
  Mô tả: Thêm entry Activity Bar, hỗ trợ chat ở nhiều vị trí (sidebar, bottom panel, secondary side bar) bằng WebviewView; nâng cao linh hoạt UI trong VS Code.

- #2189 — Fix typo in class name  
  Tác giả: @szepeviktor | Tạo: 2026-03-07  
  Link: https://github.com/QwenLM/qwen-code/pull/2189  
  Mô tả: Sửa lỗi đánh máy "Thingking" → "Thinking" (tối giản nhưng giảm technical debt/nhầm lẫn ký hiệu).

5) Xu hướng yêu cầu tính năng (tóm tắt từ tất cả Issues)
- Cải thiện trải nghiệm nhập liệu trong VS Code chat: fix sự cố phím Space không hoạt động (đa người báo cáo).  
- Quản lý lịch sử chat trong CLI: lệnh xóa/clean để tránh tích tụ dữ liệu không cần thiết.  
- Tách phiên làm việc / chạy song song: worktree / isolation cho nhiều session (PR #2193).  
- Nâng cấp UI/UX IDE companion: sidebar view, multi-position chat layout (PR #2188).  
- Quản lý lỗi/hiển thị trạng thái: tự động xoá thông báo lỗi cũ khi đổi model hoặc gửi request mới (PR #2192).  
- Ổn định tích hợp công cụ và tool_calls: xử lý đúng tool_call_id và phản hồi tương ứng.  
- Chống throttling cho web-search: xử lý retry/backoff hoặc giới hạn QPS để tránh lỗi 429.  
- Cấu hình hiển thị mã: tabWidth và xử lý tab/spaces để đảm bảo highlight nhất quán (phát hành nightly).

6) Điểm đau của nhà phát triển (tổng hợp ngắn gọn)
- Input/UX trong IDE: lỗi nhập ký tự cơ bản (space) khiến workflow chat bị gián đoạn — ưu tiên cao vì ảnh hưởng trực tiếp năng suất. (Refs: #2101, #2186)  
- Thông báo lỗi “mãi không biến mất”: trạng thái lỗi cũ vẫn hiển thị sau khi hành động đã thay đổi; gây nhầm lẫn về trạng thái hệ thống. (Ref: #2105, PR #2192)  
- Tích hợp công cụ/phần mở rộng: sai lệch trong flow tool_calls → tool responses gây lỗi runtime/500-class; cần kiểm tra luồng message/tool response. (Ref: #2190)  
- Throttling ngang dịch vụ bên ngoài (WebSearch): ảnh hưởng tới các tính năng phụ thuộc API bên ngoài, cần chiến lược retry/exponential backoff hoặc giới hạn QPS. (Ref: #2191)  
- CLI usability & session isolation: thiếu lệnh quản lý lịch sử và hỗ trợ chạy song song an toàn; cộng đồng đề xuất worktree và lệnh delete-history. (Refs: #1902, PR #2193)  
- Authentication/token flow: lỗi OAuth/device flow và quản lý refresh token gây vấn đề khởi tạo CLI trong một số môi trường. (Ref: #821)  
- Consistency hiển thị mã: thiếu cài đặt tabWidth/treatment tabs dẫn tới khác biệt hiển thị giữa môi trường — đã có fix trong nightly.

Kết luận nhanh
- Hôm nay tập trung vào các sửa lỗi UX/IO trong VS Code và cải tiến hỗ trợ session/UX cho IDE companion. PR #2192 và #2193/ #2188 là các thay đổi đáng quan tâm trong ngắn hạn; nightly v0.12.0 đã đóng góp 2 bản sửa quan trọng cho parsing và hiển thị mã. Các maintainer nên ưu tiên: (1) sửa triệt để lỗi Space input, (2) xử lý hiển thị lỗi cố hữu, (3) kiểm thử tích hợp tool_calls và cơ chế retry cho web-search.

Tổng hợp liên kết nhanh
- Repo: https://github.com/QwenLM/qwen-code
- Release v0.12.0-nightly.20260308.0b7ad066: https://github.com/QwenLM/qwen-code/releases
- Issues & PRs đã nêu: xem các link inline trong từng mục ở trên.

Nếu bạn muốn, tôi có thể:
- Soạn checklist kỹ thuật để reproduce / debug lỗi space input trong VS Code.  
- Chuẩn bị draft comment/triage template cho các issue liên quan tới tool_calls hoặc throttling.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*