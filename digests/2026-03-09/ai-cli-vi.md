# Bản tin Cộng đồng Công cụ AI CLI 2026-03-09

> Thời gian tạo: 2026-03-09 02:01 UTC | Công cụ: 7

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

1) Tổng quan hệ sinh thái (3–5 câu)
- Các CLI AI hiện tập trung vào hai nhóm vấn đề chính: (a) ổn định nền tảng/terminal (Windows, WSL, macOS, tmux) và UX phiên làm việc (session persistence, auth/refresh, quota transparency), và (b) khả năng orchestration/agent (subagents, remote agents, quyền động) cùng hiệu quả token (indexing, server-side compaction).  
- Một lớp nhu cầu chung khác là tương thích với mô hình cục bộ/đa-provider (auto-detect Ollama, mapping capability) và trải nghiệm IDE (VS Code sidebar, /ide docs).  
- Nhiều dự án đang vừa vá nhanh các lỗi nền tảng vừa thực thi những thay đổi kiến trúc (in-process app-server, feature flags) để giảm flakiness và chi phí vận hành.

2) So sánh mức độ hoạt động (hôm nay)
Tool | Notable issues nêu trong bulletin | PRs hoạt động/được liệt kê (24h) | Release (24h)
--- | ---: | ---: | ---
Claude Code | 10 issues nổi bật | ~5 PR mới/hoạt động | Không có release
OpenAI Codex | 10 issues nổi bật | ~10 PR hoạt động | Có (rust-v0.113.0-alpha.1 + v0.112.0 changelog)
Gemini CLI | 10 issues nổi bật | ~10 PR hoạt động | Không có release
GitHub Copilot CLI | 10 issues nổi bật | 1 PR mở | Không có release
Kimi Code CLI | 5 issue mới/được cập nhật | 0 PR mới trong 24h | Không có release
OpenCode | 10 issues nổi bật | ~10 PR theo dõi | Có (v1.2.22)
Qwen Code | 10 issues nổi bật | ~10 PR hoạt động | Có (v0.12.0-preview/nightly)

Ghi chú: “Notable issues” lấy theo số mục được nêu trong từng bulletin; “PRs” là số PR được liệt kê/nhắc tới trong bản tin 24h.

3) Hướng tính năng chung (xuất hiện ở nhiều cộng đồng)
- Codebase indexing / semantic search: Claude Code (issue #4556), OpenAI Codex (issue #5181), OpenCode (demand for semantic search), Qwen (worktree/isolation requests).  
- Session persistence / per-folder context: Copilot CLI (#1912), Kimi (history session selection #1366), nhiều đề xuất cho resume/shorthand ở Codex/GitHub.  
- Subagents / agent orchestration: Gemini (epics #20302, #20195), Copilot & Qwen có issue yêu cầu subagent levels.  
- Windows/WSL/terminal fixes (PTY, IME, tmux): Claude (Windows/Cowork), Codex (WSL/PowerShell), Gemini (flicker, PTY), Copilot (IME/WSL), OpenCode (tmux).  
- Quota/billing transparency & rate-limit handling: Claude (rate-limit despite subscription), Codex (server-side compaction), Qwen (429 WebSearch throttling).  
- Local model / provider compatibility & auto-detect: OpenCode (Ollama auto-detect PR), demand xuất hiện ở nhiều repo.

4) Phân tích khác biệt hóa (trọng tâm, mục tiêu người dùng, hướng kỹ thuật)
- Claude Code: trọng tâm vào UX nền tảng Cowork/Windows và minh bạch quota — phù hợp teams dùng desktop-integrated agents; kỹ thuật: ổn định TUI/VM boot và quota telemetry.  
- OpenAI Codex: hướng kiến trúc (in-process app-server), quyền động (request_permissions) và tối ưu token (server-side compaction) — nhắm vào tính nhất quán giữa nhiều surfaces và workloads nặng, đầu tư vào backend/handshake/event model.  
- Gemini CLI: tập trung mạnh vào agent orchestration (subagents/remote), voice/multimodal và giảm verbosity trong UI — thích hợp cho workflows agent phân tán và hands-free; kỹ thuật: streaming, task-group UI, performance parallelization.  
- GitHub Copilot CLI: ưu tiên input/terminal UX (IME, Cmd/C), persistent sessions và observability — tập trung enterprise/IDE-first adoption; kỹ thuật: terminal integration, OTel export.  
- OpenCode: nền tảng mature hơn (đã release), chú trọng tính tương thích provider, automations và xử lý symlink/canonicalization — phù hợp cho người dùng multi-provider và automation-heavy.  
- Qwen Code: chú ý tới tích hợp VSCode, highlighting và tính năng interactive agents; nhiều work về UX khởi động và tools robustness.  
- Kimi Code CLI: small/targeted — ưu tiên tích hợp VSCode, project-level config và fixes nền tảng (Ubuntu/http headers); phù hợp nhóm dev nhỏ muốn project-scoped config.

5) Động lực & độ trưởng thành của cộng đồng
- Hoạt động nhất (số issue/PR + releases): OpenAI Codex, Gemini CLI và OpenCode thể hiện hoạt động cao (nhiều PR/epic/release). Codex có nhiều PR kiến trúc; OpenCode và Qwen có release gần đây => lặp nhanh.  
- Cộng đồng đang tăng trưởng/quan tâm mạnh: OpenCode (nhiều upvote cho provider requests, releases, nhiều PR fix symlink), Qwen (nightly/preview releases + nhiều PR UX).  
- Dự án nhỏ/ổn định hơn: Kimi có ít issue/PR trong 24h — khối lượng công việc tập trung, cộng đồng nhỏ hơn. Copilot CLI hiện có nhiều issue nhưng ít PR mới trong 24h (triage-heavy).  
- Tín hiệu chất lượng: nhiều issue có upvotes lớn (ví dụ Codex #10410, OpenCode #12954) cho thấy nhu cầu người dùng rõ rệt; PRs fix platform bugs (symlink, IME, tmux) là dấu hiệu chăm sóc trải nghiệm nền tảng.

6) Tín hiệu xu hướng & giá trị tham khảo cho nhà phát triển
- Orchestration & subagent patterns trở thành chuẩn: cần thiết kế API cho nested agents, provenance, and replay. Giá trị: cho phép workflows phân tách trách nhiệm, tăng tự động hoá.  
- Workspace-scoped persistence và project-level config: session-per-folder / project config giúp reproducibility và CI integration — ưu tiên low-friction UX (CLI args, default project files).  
- Token efficiency: server-side compaction và codebase indexing/embeddings là cách giảm chi phí thực tế cho người dùng; đầu tư vào offline index sẽ giảm load API.  
- Robustness across terminals/OS: nhiều vấn đề thực tế (IME, WSL, PowerShell, tmux, symlink) ảnh hưởng adoption— bắt buộc có CI nền tảng (macOS, Windows, Linux) và test matrix.  
- Local-model & provider interoperability: auto-detect local runtimes (Ollama), capability mapping và gating option khi đổi model giảm lỗi runtime.  
- Observability & safety: export telemetry (OTel), quota transparency và LLM-suggested policy scoping khi approve tools giúp enterprise adoption và debugging.

Kết luận ngắn gọn cho người ra quyết định kỹ thuật
- Nếu mục tiêu là nhanh ổn định UX nền tảng cho devs trên desktop/terminal: ưu tiên fixes Windows/WSL/IME, session persistence và platform CI (tham khảo cách OpenCode/Qwen xử lý).  
- Nếu mục tiêu là scale agent orchestration / multimodal: đầu tư vào subagent API, event/permission model và task-group UI (tham khảo Gemini và Codex).  
- Nếu cần giảm chi phí sử dụng LLM: ưu tiên codebase indexing + server-side compaction và chỉ mục ngữ nghĩa (đa repo), điều này xuất hiện như nhu cầu chung toàn hệ sinh thái.

Nếu bạn muốn, tôi có thể chuyển phần “Hành động ưu tiên (quick wins + medium/long-term)” dựa trên báo cáo này để gửi cho đội phát triển.

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nổi bật Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

Báo cáo tóm tắt — Hoạt động cộng đồng Claude Code Skills (dữ liệu đến 2026-03-09)

1) Xếp hạng Skills “hot” (5–8 PR được thảo luận nhiều nhất)
- #514 Add document-typography skill — kiểm soát chất lượng kiểu chữ cho tài liệu (ngăn orphan/widow, canh số, v.v.). Được thảo luận vì ảnh hưởng trực tiếp tới văn bản xuất ra và UX người dùng. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/514
- #210 Improve frontend-design skill clarity and actionability — chỉnh lại hướng dẫn frontend-design để Claude thực thi hiệu quả hơn trong một cuộc hội thoại. Thảo luận tập trung vào tính khả thi và hiệu quả token. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/210
- #83 Add skill-quality-analyzer and skill-security-analyzer to marketplace — thêm hai meta-skill để tự đánh giá Skills theo nhiều tiêu chí (chất lượng, security). Nổi bật vì là công cụ “meta” giúp nâng chuẩn toàn bộ hệ sinh thái. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/83
- #154 Add shodh-memory skill — hệ thống bộ nhớ bền vững cho agents (khi nào gọi proactive_context, cấu trúc memory…). Thảo luận tập trung vào bảo mật và tính tương thích với SSO/khách hàng doanh nghiệp. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/154
- #147 Add codebase-inventory-audit skill — audit mã nguồn: tìm code mồ côi, file dư, lỗ hổng tài liệu. Được quan tâm vì trực tiếp hỗ trợ duy trì kho code/quality. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/147
- #444 AURELION skill suite (kernel, advisor, agent, memory) — khung nhận thức + quản lý tri thức chuyên nghiệp; thảo luận về mô hình kiến trúc và tích hợp với workflows. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/444
- #288 Add 8 new skills: foundation, standards, and development series — bộ skill đa dụng (tutorial-builder, a11y-auditor, changelog-curator,...). Nổi bật vì cung cấp nhiều building-block cho cộng đồng. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/288
- #368 Add flutter-theme-factory skill — tạo theme chuyên nghiệp cho Flutter (12 theme, color schemes, fonts). Hấp dẫn với dev mobile/web. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/368

2) Xu hướng nhu cầu cộng đồng (tóm tắt từ Issues)
- Độ tin cậy & ổn định API / vận hành: lỗi upload/delete skills, “Not found”, internal server error, downtime model (ví dụ #406, #403, #61, #389). Người dùng cần hệ vận hành skills đáng tin cậy. https://github.com/anthropics/skills/issues/406 https://github.com/anthropics/skills/issues/403
- Quản trị và bảo mật agent: lo ngại impersonation dưới namespace anthropic/, governance patterns cho agents (#492, #412). Cần khung an toàn/uy tín cho skills cộng đồng. https://github.com/anthropics/skills/issues/492 https://github.com/anthropics/skills/issues/412
- Công cụ đánh giá chất lượng & tự động hoá kiểm thử skills: nhu cầu meta-skills để audit/đánh giá (phù hợp với PR #83) và công cụ chạy đánh giá trigger/coverage (#556). https://github.com/anthropics/skills/issues/556 https://github.com/anthropics/skills/pull/83
- Trạng thái developer experience & best-practice cho tạo skill: skill-creator cần cải tiến để tối ưu token/hoạt động (#202, #532). https://github.com/anthropics/skills/issues/202 https://github.com/anthropics/skills/issues/532
- Tính tương thích / tích hợp nền tảng: yêu cầu Bedrock, MCPs, phụ thuộc test (Playwright), duplicate packages giữa plugin (#29, #16, #189, #282). https://github.com/anthropics/skills/issues/29 https://github.com/anthropics/skills/issues/189

3) Skills tiềm năng cao chưa merge (được thảo luận/quan tâm, có khả năng triển khai sớm)
- skill-quality-analyzer & skill-security-analyzer (#83) — công cụ meta để chuẩn hóa chất lượng/security của skills. https://github.com/anthropics/skills/pull/83
- shodh-memory (persistent memory) (#154) — nhu cầu bộ nhớ bền vững cho agent rất lớn trong thực tế doanh nghiệp. https://github.com/anthropics/skills/pull/154
- document-typography (#514) — cải thiện đầu ra văn bản chuyên nghiệp, ít tốn công chỉnh tay. https://github.com/anthropics/skills/pull/514
- codebase-inventory-audit (#147) — hữu ích cho teams muốn tự động hoá audit mã và tài liệu. https://github.com/anthropics/skills/pull/147
- AURELION suite (kernel/advisor/agent/memory) (#444) — khung lớn, nếu được duyệt sẽ thúc đẩy nhiều tích hợp tri thức. https://github.com/anthropics/skills/pull/444
- 8-skills bundle (tutorial-builder, a11y-auditor, changelog-curator, ...) (#288) — nhanh chóng mở rộng catalog tính năng. https://github.com/anthropics/skills/pull/288

4) Nhận định hệ sinh thái Skills (1 câu)
Cộng đồng đang tập trung mạnh vào: nâng cao độ tin cậy/ops của hệ thống skills và xây dựng các meta‑skills (quality/security/governance), cùng nhu cầu rõ ràng cho bộ nhớ bền vững và tự động hoá workflow nhằm đưa agent vào quy trình doanh nghiệp. Repository chính: https://github.com/anthropics/skills

— Kết thúc —

---

Bản tin cộng đồng Claude Code — 2026-03-09

1) Điểm nổi bật hôm nay
- Nhiều vấn đề liên quan đến xác thực, giới hạn API và độ ổn định trên Windows/Cowork tiếp tục thu hút thảo luận mạnh — issue #1757 (yêu cầu đăng nhập liên tục) đang có 60 bình luận. (https://github.com/anthropics/claude-code/issues/1757)  
- Một số PR hướng đến minh bạch sử dụng/quota và trải nghiệm đa ngôn ngữ đang được đề xuất (ví dụ PRs #32142, #32278). (https://github.com/anthropics/claude-code/pull/32142, https://github.com/anthropics/claude-code/pull/32278)

2) Phát hành phiên bản
- Không có phát hành mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng — 10 mục đáng chú ý
- #1757 [BUG] Claude code requires users to constantly login — Vấn đề xác thực liên tục (60 bình luận, 43 👍). Ảnh hưởng lớn tới UX: nhiều người phải xác thực web mỗi ngày. (https://github.com/anthropics/claude-code/issues/1757)
- #22277 [BUG] persistent 404 on git_proxy endpoint — Lỗi 404 với git_proxy trên web/mobile (39 bình luận). Gây mất khả năng truy cập repo/branches từ giao diện; có repro trên macOS. (https://github.com/anthropics/claude-code/issues/22277)
- #29583 [BUG] Cowork: Cannot use folders outside home directory on Windows — Người dùng không thể mở thư mục trên ổ khác (29 bình luận, 16 👍). Ảnh hưởng lớn với dev dùng secondary drives trên Windows. (https://github.com/anthropics/claude-code/issues/29583)
- #29579 [BUG] API Error: Rate limit reached despite Claude Max subscription — Khiếu nại về rate limit bất chấp thuê bao, chỉ 16% usage (21 bình luận, 14 👍). Liên quan tới minh bạch quota/billing. (https://github.com/anthropics/claude-code/issues/29579)
- #4556 [Feature request] Add codebase indexing — Yêu cầu nhiều lượt ủng hộ (50 👍). Giải quyết vấn đề tiêu tốn token khi tìm/đọc codebase lớn. (https://github.com/anthropics/claude-code/issues/4556)
- #23347 spinnerVerbs setting ignored — Cấu hình spinner không được áp dụng (14 bình luận, 15 👍). Ảnh hưởng tới tính tuỳ biến giao diện TUI. (https://github.com/anthropics/claude-code/issues/23347)
- #24840 Extreme memory consumption on Windows — Báo cáo tiêu thụ bộ nhớ lớn (13 bình luận). Có máy Windows bị dùng hàng chục GB; nghiêm trọng cho môi trường phát triển. (https://github.com/anthropics/claude-code/issues/24840)
- #32167 Claude Desktop freezes on launch when scheduled-tasks.json exists — Desktop freeze khi file scheduled-tasks.json tồn tại (5 bình luận, 6 👍). Dẫn tới mất khả năng khởi chạy trên macOS. (https://github.com/anthropics/claude-code/issues/32167)
- #30457 Google Drive connector shows connected but tools not exposed in Cowork — Connector báo connected nhưng không expose tools (6 bình luận, 8 👍). Tác động tới tích hợp công cụ và workflow truy cập file. (https://github.com/anthropics/claude-code/issues/30457)
- #32219 Cowork VM boot IPC hangs silently — VMCLIRunner block UI indefinitely trên Win11 (5 bình luận). Gây treo khi boot VM cowork; high-impact cho trải nghiệm Cowork trên Windows. (https://github.com/anthropics/claude-code/issues/32219)

4) Tiến độ PR quan trọng (mới/hoạt động trong 24h)
- #32278 Add i18n-spinner-tips plugin — Thêm plugin hiển thị mẹo dev song ngữ (8 ngôn ngữ). Tăng tính thân thiện quốc tế khi spinner hiển thị. (https://github.com/anthropics/claude-code/pull/32278)
- #32142 Add usage transparency plugin for quota troubleshooting — PR hướng tới hiển thị thông tin sử dụng/quota để dễ chẩn đoán rate limit và sự cố billing. (https://github.com/anthropics/claude-code/pull/32142)
- #32250 feat(feature-dev): add iterative PR workflow to implementation phase — Chia Phase 5 thành planning + iterative implementation, hỗ trợ workflow PR rõ ràng hơn. (https://github.com/anthropics/claude-code/pull/32250)
- #32136 Add BrewLab concept document — Thêm tài liệu ý tưởng sản phẩm (không phải code): ví dụ use-case, hữu ích cho nội dung mẫu và testing. (https://github.com/anthropics/claude-code/pull/32136)
- #32094 (CLOSED) Add swarm-dev orchestration plugin — Thêm plugin orchestration với agents chuyên dụng và guardrails; đóng góp vào automation/workflow orchestration. (https://github.com/anthropics/claude-code/pull/32094)  
Lưu ý: trong 24h có 5 PR cập nhật/khởi tạo — danh mục trên là tất cả PR mới/hoạt động trong khoảng này.

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Codebase indexing / embedding để giảm token cost khi tìm/đọc repo (issue #4556). (https://github.com/anthropics/claude-code/issues/4556)  
- Minh bạch usage/quota và troubleshooting thông tin billing (PR #32142, issue #29579). (https://github.com/anthropics/claude-code/pull/32142, https://github.com/anthropics/claude-code/issues/29579)  
- Cải thiện hỗ trợ Windows/Cowork: ổ đĩa ngoài, VM boot, memory/perf, plugin registration (issues #29583, #32219, #24840, #32268). (https://github.com/anthropics/claude-code/issues/29583, https://github.com/anthropics/claude-code/issues/32219, https://github.com/anthropics/claude-code/issues/24840, https://github.com/anthropics/claude-code/issues/32268)  
- Sandbox / macOS seatbelt detection fixes (issues #31804, #32275). (https://github.com/anthropics/claude-code/issues/31804, https://github.com/anthropics/claude-code/issues/32275)  
- Better plugin/marketplace ergonomics (pre-registration, Windows compatibility, LSP parameter fixes). (https://github.com/anthropics/claude-code/issues/32268, https://github.com/anthropics/claude-code/issues/30948)

6) Điểm đau của nhà phát triển — tóm tắt ngắn
- Xác thực/phiên: người dùng báo phải login quá thường xuyên, làm gián đoạn workflow (https://github.com/anthropics/claude-code/issues/1757).  
- Giới hạn API / quota không rõ ràng: rate-limit xảy ra dù có subscription, thiếu thông tin backend/billing (https://github.com/anthropics/claude-code/issues/29579).  
- Ổn định Windows/Cowork: nhiều báo cáo về treo VM, crash desktop, memory spike, hạn chế truy cập ổ đĩa ngoài (https://github.com/anthropics/claude-code/issues/32219, https://github.com/anthropics/claude-code/issues/24840, https://github.com/anthropics/claude-code/issues/29583).  
- Tích hợp công cụ và plugin: marketplace/registry khác biệt giữa macOS và Windows; LSP/plugin fail silent trên Windows (https://github.com/anthropics/claude-code/issues/32268, https://github.com/anthropics/claude-code/issues/32264).  
- Developer UX & cost: output CLI định dạng phá copy/paste; cần indexing để tiết kiệm token (https://github.com/anthropics/claude-code/issues/15199, https://github.com/anthropics/claude-code/issues/4556).

Kết luận ngắn: hiện tại cộng đồng tập trung vào ổn định nền tảng (Windows/Cowork, sandbox), cải thiện trải nghiệm xác thực/quota và giảm chi phí token bằng indexing. Những PR về minh bạch quota và i18n là tín hiệu tích cực về hướng phát triển trải nghiệm người dùng.

— End of bulletin —

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

Bản tin cộng đồng OpenAI Codex — 2026-03-09

1) Điểm nổi bật hôm nay
- Nhóm phát triển tiếp tục tiến hành tái kiến trúc app-server (nhiều PR hướng tới in-process app-server) và thêm cơ chế yêu cầu quyền động (request_permissions) để phiên làm việc có thể xin quyền khi cần.  
- Các vấn đề “zombie / Thinking” và lãng phí token khi polling tiến trình nền đang gây nhiều phiền toái; cộng đồng có nhiều báo cáo và PR để ổn định luồng websocket / polling / compaction.

2) Phát hành phiên bản
- Có bản phát hành (alpha) mới: rust-v0.113.0-alpha.1 (Release 0.113.0-alpha.1). Ngoài ra v0.112.0 đã được gắn nhãn với các thay đổi UI/UX:
  - Thêm `@plugin` mentions để tham chiếu plugin trong chat và tự động bao gồm context MCP/app/skill. (PR/issue liên quan: thấy trong changelog v0.112.0)  
  - Cập nhật mặt chọn model trong TUI để phản ánh catalog model mới.  
  Tham khảo trang Releases: https://github.com/openai/codex/releases

3) Issues nóng trong cộng đồng (10 mục, vì sao quan trọng + phản ứng)
- #10410 Codex Desktop App: macOS Intel (x86_64) support — https://github.com/openai/codex/issues/10410  
  Tại sao quan trọng: Nhiều người dùng còn dùng Intel Mac; thiếu bản build Universal/x86_64 cản trở adopt. Cộng đồng tích cực (105 bình luận, 135 👍) yêu cầu build Intel/Universal.
- #2109 Event Hooks — https://github.com/openai/codex/issues/2109  
  Tại sao quan trọng: Yêu cầu hỗ trợ hook pattern-matching để chạy script trước/sau hành vi Codex — mở rộng khả năng tự động hoá/integ. Rất nhiều upvote (475 👍), nhiều thảo luận tính khả thi và bảo mật.
- #13733 Background process polling wastes tokens — https://github.com/openai/codex/issues/13733  
  Tại sao quan trọng: Mỗi lần poll trạng thái tiến trình nền kích hoạt một lượt API với toàn bộ lịch sử, gây lãng phí token/chi phí — ảnh hưởng trực tiếp đến chi phí người dùng. Cộng đồng đã cung cấp ví dụ và workload đo đếm token.
- #12161 Codex IDE keeps getting stuck on "Thinking" — https://github.com/openai/codex/issues/12161  
  Tại sao quan trọng: IDE extension (VS Code, Cursor, Windsurf) bị treo làm giảm năng suất dev; nhiều người bị ảnh hưởng trên Windows. Thảo luận nhiều (19 bình luận).
- #13747 App bundles codex-cli 0.108.0-alpha.12 and fails on macOS — https://github.com/openai/codex/issues/13747  
  Tại sao quan trọng: Sự khác biệt giữa app-bundled CLI và standalone gây lỗi không nhất quán — ảnh hưởng UX desktop. Người dùng báo lỗi, mong bản vá.
- #9634 Refresh token error: "refresh token already used" — https://github.com/openai/codex/issues/9634  
  Tại sao quan trọng: Lỗi xác thực làm gián đoạn phiên, bắt buộc logout/login lại; tác động tới trải nghiệm khối lượng người dùng Pro. Có 21 bình luận cung cấp log và hệ điều hành.
- #5181 Semantic codebase indexing and search — https://github.com/openai/codex/issues/5181  
  Tại sao quan trọng: Nhu cầu chỉ mục ngữ nghĩa cho codebase lớn để cải thiện tìm kiếm / navigation — tính năng chiến lược cho hiệu quả dev; nhiều người ủng hộ (28 👍).
- #13549 Codex App on Windows, when configured to use WSL, continues to reference Windows-hosted config.toml — https://github.com/openai/codex/issues/13549  
  Tại sao quan trọng: WSL integration bị lỗi đường dẫn config gây crash hoặc hành vi không mong muốn cho người dùng Windows+WSL. 8 bình luận, tác động đến workflow WSL.
- #13917 Codex desktop on Windows cannot start PowerShell host in session (8009001d) — https://github.com/openai/codex/issues/13917  
  Tại sao quan trọng: Lỗi khởi tạo PowerShell host chặn tương tác terminal; ảnh hưởng trực tiếp người dùng Windows (8 bình luận).
- #14008 Model selection in desktop app reverts to gpt-5.3-codex — https://github.com/openai/codex/issues/14008  
  Tại sao quan trọng: Server-side Statsig config ghi đè lựa chọn model người dùng — gây mất kiểm soát cấu hình model trên client, ảnh hưởng reproducibility và trust.

4) Tiến độ PR quan trọng (10 PR, tóm tắt tính năng / sửa lỗi)
- #13092 Add request permissions tool — https://github.com/openai/codex/pull/13092  
  Nội dung: Thêm công cụ nội bộ request_permissions và luồng emit RequestPermissions event, cho phép một turn đang chạy yêu cầu quyền từ client thay vì policy tĩnh. Tác động: cải thiện UX cho workflows cần quyền truy cập tạm thời (ví dụ: file, network).
- #13978 enh: add feature-flagged server-side compaction — https://github.com/openai/codex/pull/13978  
  Nội dung: Thêm feature flag `server_side_compaction` để di chuyển compaction Responses API lên server khi có thể, đồng thời giữ `/compact` và các phương án tùy chỉnh. Tác động: giảm tải client, tối ưu token/historic context.
- #14004 feat(tui) render request_permissions calls — https://github.com/openai/codex/pull/14004  
  Nội dung: Hỗ trợ TUI hiển thị các request_permissions call — liên quan trực tiếp tới PR #13092 để UI có thể hiển thị/thu thập phản hồi quyền.
- #14018 feat(tui): migrate cli surfaces to in-process app-server — https://github.com/openai/codex/pull/14018  
  Nội dung: Migrates CLI surfaces to an in-process app-server để thống nhất handshake, session selection, event dispatch. Tác động: giảm drift giữa TUI và app-server, đơn giản hoá logic surface.
- #13636 feat(tui): migrate cli surfaces to in-process app-server (closed) — https://github.com/openai/codex/pull/13636  
  Nội dung: Phiên bản trước của migration, đã đóng nhưng là phần của tiến trình lớn. Liên quan kiến trúc.
- #14017 Stabilize websocket response.failed error delivery — https://github.com/openai/codex/pull/14017  
  Nội dung: Khi stream terminal gặp lỗi, drop kết nối ngay thay vì chờ handshake đóng — giúp giao tiếp lỗi ổn định hơn và giảm flakiness test/UX.
- #13678 feat(core): add watchdog runtime and prompts — https://github.com/openai/codex/pull/13678  
  Nội dung: Thêm runtime watchdog cho agent threads, quản lý lifecycle và prompts/overrides model cho watchdog. Tác động: kiểm soát agent lâu chạy/tự phục hồi.
- #13665 feat(core): support custom model aliases in config.toml — https://github.com/openai/codex/pull/13665  
  Nội dung: Hỗ trợ bí danh model tuỳ chỉnh trong config.toml (lưu ý: PR này đã bị supersede bởi #13825 nhưng vẫn là tham chiếu lịch sử). Giúp người dùng map tên model nội bộ.
- #13637 feat(rollout): preserve fork references across replay — https://github.com/openai/codex/pull/13637  
  Nội dung: Thêm fork reference rollout items để nhánh fork có thể reuse lịch sử parent thay vì duplicate; bảo toàn ref khi replay/resume. Tác động: giảm trùng lặp dữ liệu, giữ tính nhất quán thread.
- #13593 Stabilize flaky tests — https://github.com/openai/codex/pull/13593  
  Nội dung: Chuỗi thay đổi nhằm sửa flakiness tests `codex-rs` bằng cách đồng bộ hoá deterministically hoặc sửa nhỏ production code khi flake cho thấy race condition.

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Event hooks / scripting trước-sau hành vi (Issue #2109) — cộng đồng muốn triggers và pattern matching để tự động hoá.  
- Tích hợp/hoán đổi session giữa Codex CLI và ChatGPT (Issue #2153) — luồng nghiên cứu / web-search trong GUI rồi trả lại CLI.  
- Semantic codebase indexing & search (Issue #5181) — tìm kiếm ngữ nghĩa cho code lớn.  
- Quyền động/permission requests (PR #13092 + #14004) — chạy turn có thể xin quyền thay vì policy tĩnh.  
- Model picker cleanup & custom aliases (Issues/PRs) — giảm bloat, alias model trong config (PR #13665).  
- Server-side compaction / token efficiency (PR #13978) — giảm chi phí và tải client.  
- WSL / Windows integration improvements (Issues #13549, #13699, #13917) — path/config và host/terminal reliability.  
- Multi-terminal/tabs & sandbox folder config (Issues #11427, #13914) — UX terminal và sandbox flexibility.  
- Better tooling for background processes to avoid token burn (Issue #13733).  
- Debuggable, stable websocket/streaming errors (PR #14017).

6) Điểm đau của nhà phát triển (tóm tắt các vấn đề thường gặp)
- "Thinking" / zombie threads: threads hoặc IDE/extension/app kẹt ở trạng thái Thinking, đôi khi không thể dừng/khởi động lại — ảnh hưởng trực tiếp dev flow. (Ví dụ: #12161, #12852, #13997)  
- Token/chi phí lãng phí khi polling tiến trình nền: polling liên tục gây full API round-trip với toàn bộ history; cần cơ chế polling nhẹ hơn hoặc server-side status (Issue #13733).  
- Windows + WSL inconsistencies: config location, sandbox access, PowerShell host startup errors gây crash hoặc hành vi bất ngờ (#13549, #13917, #13699).  
- Auth: refresh token bị mark-used dẫn đến forced logout/login (#9634).  
- Model picker & server-side overrides: lựa chọn model trên client bị ghi đè bởi config server-side (Statsig), gây nhầm lẫn và mất kiểm soát (#14008).  
- CLI UX: multiline paste trên Windows (Ctrl+V) thực thi ngay; thiếu multi-terminal tabs; cần lệnh như `codex inject` để thao tác session từ scripts (#13729, #11415, #11427).  
- Test flakiness và websocket streaming errors ảnh hưởng tới stability liên tục; đang có PR fix cho delivery error và ổn định test (#14017, #13593).

Kết luận ngắn
- Kiến trúc app-server (in-process) và request_permissions là hai hướng chính đang được phát triển — chúng hứa hẹn cải thiện tính nhất quán giữa các surfaces và UX quyền động.  
- Các vấn đề hoạt động (Thinking, polling token burn, WSL/Windows) là điểm đau lớn nhất của cộng đồng hiện tại; mong đợi nhiều bản sửa lỗi nhỏ liên tiếp (PRs liên quan đã mở/đóng trong 48 giờ qua).

Tham khảo nhanh
- Repo chính: https://github.com/openai/codex  
- Issues & PRs trích dẫn trong bản tin đều có link trong từng mục trên.

Nếu bạn muốn, tôi có thể:
- Lập danh sách hành động kỹ thuật ưu tiên (quick wins + medium/long term) cho đội phát triển; hoặc  
- Soạn template issue/bug-report tiêu chuẩn giúp cộng đồng gửi repro log hiệu quả.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

Bản tin cộng đồng Gemini CLI — 2026-03-09

1) Điểm nổi bật hôm nay
- Công việc chính hướng tới: subagents / remote agents (nhiều epic và sprint), cùng các cải tiến UX để giảm độ ồn (verbosity) và quản lý nhóm tác vụ trong UI CLI.  
- Song song là chuỗi cải tiến performance/startup (song song hóa gọi mạng), và một số PR tập trung vào voice/multimodal cũng đang vào review.

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #20716 Fix truncation of plans in the approval dialog — Người dùng báo dialog phê duyệt kế hoạch cắt nội dung sau ~15 dòng; ảnh hưởng tới hiểu đúng kế hoạch trước khi approve. (8 bình luận) Link: https://github.com/google-gemini/gemini-cli/issues/20716
- #20302 [Epic] Remote Agents: Sprint 1 — Thiết lập nền tảng và streaming cho remote agents; epic này định hướng nhiều workstream quan trọng cho agent từ xa. Link: https://github.com/google-gemini/gemini-cli/issues/20302
- #21461 Gemini CLI Shell Command does not support aliases — Aliases shell (ví dụ alias baz=echo) không hoạt động khi gọi qua `! baz`; ảnh hưởng trải nghiệm dùng shell tích hợp. Link: https://github.com/google-gemini/gemini-cli/issues/21461
- #20886 Refine subagents UX — Cần expander để xem lịch sử call của subagent, đồng bộ mock UX mới; UX subagent đang là tâm điểm. Link: https://github.com/google-gemini/gemini-cli/issues/20886
- #20550 Ran out of js heap — Báo lỗi hết heap JS trong runtime; có traceback đính kèm — nguy cơ gây crash cho người dùng nặng. Link: https://github.com/google-gemini/gemini-cli/issues/20550
- #20217 Flickering when typing file paths — Hiện tượng flicker khi nhập đường dẫn file; ảnh hưởng trên terminal rendering/UX. Link: https://github.com/google-gemini/gemini-cli/issues/20217
- #20195 [Agents] - Local Subagent - Sprint 1 — Sprint đầu cho subagent local; liên quan mật thiết đến #20302 và #20886. Link: https://github.com/google-gemini/gemini-cli/issues/20195
- #21432 Improve Agent "Self-Awareness": Accurate CLI Flags, Hotkeys, and Self-Execution — Yêu cầu agent hiểu rõ flags/hotkeys của chính nó; quan trọng cho khả năng agent tư vấn & tự chạy. Link: https://github.com/google-gemini/gemini-cli/issues/21432
- #20331 Support running safe tools immediately while the agent is running — Hiện các tool bị block khi agent chạy; đề xuất cho phép tool “safe” (ví dụ /settings, /vim) vẫn hoạt động. Link: https://github.com/google-gemini/gemini-cli/issues/20331
- #20193 [Epic] Robust API Response Parsing and Defensive Implementation — Xử lý lỗi phân tích response backend (proto thay đổi gây crash); ưu tiên tăng robustness/parsing defensiveness. Link: https://github.com/google-gemini/gemini-cli/issues/20193

Tại sao quan trọng: những issue trên ảnh hưởng trực tiếp tới trải nghiệm người dùng (UX), độ ổn định (OOM, parsing), bảo mật/quyền (tool approvals) và roadmap agent/subagent (nhiều epic/feature liên quan). Cộng đồng đang thảo luận tích cực, nhiều issue có labels maintainer-only / workstream-rollup cho thấy đang nằm trong luồng phát triển trọng tâm.

4) Tiến độ PR quan trọng (10 PR)
- #21656 commit — PR mới hôm 2026-03-09, hiện mở; nội dung chưa chi tiết trong tiêu đề (tên branch/commit). Link: https://github.com/google-gemini/gemini-cli/pull/21656
- #5342 feat(cli): Add /export command — Đã đóng cập nhật 2026-03-09; thêm lệnh /export xuất lịch sử chat sang markdown / jsonl, hữu ích cho sao lưu và automation. Link: https://github.com/google-gemini/gemini-cli/pull/5342
- #20989 feat(voice): implement speech-friendly response formatter — Thêm tiện ích chuyển markdown/ANSI → plain text sạch cho TTS; nền tảng cho voice mode. Link: https://github.com/google-gemini/gemini-cli/pull/20989
- #21215 feat(cli): restore unsent draft before input history — Lưu bản nháp chưa gửi trước khi xóa/bỏ, cải thiện trải nghiệm input history (Up arrow), tránh mất gõ. Link: https://github.com/google-gemini/gemini-cli/pull/21215
- #20992 fix(core): preserve registrationUrl in OAuth config merges — Sửa lỗi làm mất registrationUrl khi khám phá OAuth, ảnh hưởng dynamic client registration; quan trọng cho OAuth interoperability. Link: https://github.com/google-gemini/gemini-cli/pull/20992
- #21647 fix(cli): serialize object settings as JSON for display and editing — Hiển thị đúng các giá trị object trong settings dialog (không còn “[object Object]”); quan trọng cho chỉnh sửa cấu hình phức tạp. Link: https://github.com/google-gemini/gemini-cli/pull/21647
- #21601 fix(cli): treat SANDBOX=0/false as not inside sandbox — Sửa logic SANDBOX env để '0'/'false' không bị coi là đã ở trong sandbox; tránh short-circuit sai khi khởi tạo sandbox. Link: https://github.com/google-gemini/gemini-cli/pull/21601
- #21651 feat(cli): add foundational configuration schema for multimodal voice mode — Thêm schema cấu hình cho Hands-Free Multimodal Voice Mode; đặt nền cho prefs voice. Link: https://github.com/google-gemini/gemini-cli/pull/21651
- #21650 feat(security): LLM-suggested policy scoping for tool approvals — Khi user approve tool, gọi Flash để gợi ý policy hạn chế hơn, hiển thị suggestion non-blocking — cải thiện an toàn mặc định khi approve. Link: https://github.com/google-gemini/gemini-cli/pull/21650
- #21648 perf(core): parallelize user quota and experiments fetching in refreshAuth — Tối ưu startup latency bằng cách song song hóa gọi mạng trong refreshAuth; bước nhỏ nhưng có tác động rõ rệt tới thời gian khởi động. Link: https://github.com/google-gemini/gemini-cli/pull/21648

Tác động chung: nhiều PR tập trung vào UX (settings, drafts), voice/multimodal, bảo mật tool-approval, và performance — phản ánh ưu tiên hiện tại của dự án.

5) Xu hướng yêu cầu tính năng (tổng quan từ các Issues)
- Subagents / Remote Agents: nhiều epic/sprint liên tục — cộng đồng muốn khả năng agent phân tách, subagent local/remote, và UX để inspect subagent history. (ví dụ #20302, #20195, #20886)
- Giảm verbosity và quản lý nhóm tác vụ: accordion/collapse, milestone-driven prompting, auto-collapse khi hoàn thành để giảm scrollback. (ví dụ #21453, #21454, #21450)
- Voice / multimodal: formatter cho TTS, config schema, visual feedback waveform — chuẩn bị cho hands-free experiences. (PR #20989, #21651, #21115)
- Headless / scripting: đảm bảo chế độ headless sạch, verbosity levels cho non-interactive runs để dùng trong pipelines. (ví dụ #21433)
- Tool approval & policy safety: tự động gợi ý policy scoping, cảnh báo rule nguy hiểm khi user approve công cụ. (ví dụ #21650, #21596)
- Performance & reliability: song song hóa gọi mạng, cache I/O/network, tránh await không cần thiết, tăng robustness parsing stream. (ví dụ #21646, #21648, #20193, #21518)
- Terminal UX polish: scrollbar trong prompt, flicker fix, header rendering trên mac, Windows PTY fixes. (ví dụ #21423, #20217, #20924, #20680)
- Settings / config UX: hiển thị object settings đúng cách, chuyển model config vào defaultModelConfigs, restore drafts. (PR #21647, #21472, #21215)

6) Điểm đau của nhà phát triển (tóm tắt / khuyến nghị)
- Truyền tải thông tin dài bị cắt (plan approval truncation) → ưu tiên sửa hiển thị/scroll trong dialog để tránh approve thiếu thông tin (#20716). Link: https://github.com/google-gemini/gemini-cli/issues/20716
- OOM / js heap và memory spikes → cần telemetries/profiling để xác định leak và giới hạn tải công việc (#20550). Link: https://github.com/google-gemini/gemini-cli/issues/20550
- Aliases shell không hoạt động trong shell wrapper → làm giảm trải nghiệm dev; thay đổi cách spawn shell/rc loading cần thiết (#21461). Link: https://github.com/google-gemini/gemini-cli/issues/21461
- Settings hiển thị [object Object] và object fields không thể edit dễ dàng → apply JSON stringify và editor init cho object types (#21647, #21458). Link: https://github.com/google-gemini/gemini-cli/pull/21647
- SANDBOX env handling gây short-circuit sai → fix parsing env boolean-like values để tránh skip init (#21601). Link: https://github.com/google-gemini/gemini-cli/pull/21601
- Startup latency do chuỗi await/blocking calls; cần song song hóa và cache calls quan trọng (#21646, #21648). Link: https://github.com/google-gemini/gemini-cli/issues/21646
- Verbosity/scrollback noise khi agent chạy nhiều tool → cần ui_task_group + auto-collapse + milestone-driven prompting để giữ “quiet by default” (#21452–#21454, #21450). Link: https://github.com/google-gemini/gemini-cli/issues/21452
- Robustness khi backend proto thay đổi → thêm defensive parsing, better logging và alerts cho stream errors (#20193). Link: https://github.com/google-gemini/gemini-cli/issues/20193
- Headless / non-interactive consistency (clean stdout) — quan trọng cho scripting/CI; needs strict verbosity levels (#21433). Link: https://github.com/google-gemini/gemini-cli/issues/21433
- Input UX flicker / platform rendering (mac/win) — polish terminal rendering và PTY behaviors để ổn định across terminals (#20217, #20924, #20680). Link: https://github.com/google-gemini/gemini-cli/issues/20217

Kết luận ngắn gọn
- Hiện tại cộng đồng tập trung mạnh vào: subagents/remote agents, giảm verbosity và grouping task UI, voice/multimodal groundwork, cùng một số hotfix liên quan đến settings/OAuth/sandbox. Nếu bạn muốn đóng góp nhanh: xem PRs về settings/serialization, OAuth fix, và perf parallelization — đó là những PR được review và có tác động thực tế cao.

Tham khảo nhanh (links chính)
- Repo: https://github.com/google-gemini/gemini-cli
- Một số issue/PR được nêu trong bản tin (liên kết mỗi mục trong thân bài).

Nếu bạn muốn, tôi có thể chuẩn bị:
- Danh sách “good first issues” phù hợp người mới (triage labels), hoặc
- Tóm tắt patch đề xuất cho #20716 (approval dialog) và #21461 (shell aliases) để dễ bắt tay sửa.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

Bản tin GitHub Copilot CLI — 2026-03-09

1) Điểm nổi bật hôm nay
- Không có phát hành mới trong 24 giờ qua. Hoạt động cộng đồng tập trung vào ổn định đầu vào/Unicode (IME, WSL, macOS) và yêu cầu tính năng liên quan tới trải nghiệm phiên làm việc (persistent sessions, /ide integration, telemetry).
- Nhiều issue triage mới xuất hiện đề xuất cải tiến quản lý mô hình, cấu hình thư mục làm việc và khả năng mở rộng plugin/agent.

2) Phát hành phiên bản
- Không có phát hành mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (10 mục nổi bật)
- #1698 — IME candidate window is misplaced, invisible, or detaches in CJK (Japanese) input (CLOSED)  
  Tác giả: @MtkN1 — Tại sao quan trọng: Ảnh hưởng trực tiếp tới trải nghiệm nhập liệu của người dùng Nhật/Trung/Hàn; làm CLI gần như không dùng được với IME. Phản hồi: 6 bình luận, 51 👍.  
  Link: https://github.com/github/copilot-cli/issues/1698

- #1868 — [triage] Document `/ide` support for integration with other IDEs like Visual Studio, Eclipse, ... (OPEN)  
  Tác giả: @sailro — Tại sao quan trọng: nhiều nhóm muốn tích hợp Copilot CLI với IDE ngoài VSCode; tài liệu nội bộ sẽ giúp bên thứ ba xây cầu nối (extensions). Phản hồi: 6 bình luận.  
  Link: https://github.com/github/copilot-cli/issues/1868

- #1754 — AssertionError [ERR_ASSERTION] during retrospective generation followed by HTTP/2 GOAWAY connection error (503) (OPEN)  
  Tác giả: @kvn8888 — Tại sao quan trọng: lỗi kết nối/khóa nội bộ có thể gây gián đoạn tác vụ dài (retrospective/agent runs) và ảnh hưởng độ ổn định. Phản hồi: 5 bình luận, 9 👍.  
  Link: https://github.com/github/copilot-cli/issues/1754

- #248 — Optional Models (OPEN)  
  Tác giả: @jumpnut187 — Tại sao quan trọng: người dùng cần lựa chọn model (chi phí/hiệu năng); hỗ trợ nhiều model giúp linh hoạt cho workflows khác nhau. Phản hồi: 3 bình luận, 2 👍.  
  Link: https://github.com/github/copilot-cli/issues/248

- #1918 — Copy command breaks Unicode string on WSL (OPEN)  
  Tác giả: @qwaz — Tại sao quan trọng: lỗi copy/paste Unicode trên WSL phá vỡ luồng công việc đa nền tảng — đặc biệt với mã nguồn/nhận xét chứa ký tự non-ASCII. Mới tạo hôm nay.  
  Link: https://github.com/github/copilot-cli/issues/1918

- #1374 — Allowing more levels of subagents calls (OPEN)  
  Tác giả: @JanKrivanek — Tại sao quan trọng: hỗ trợ subagent lồng nhau nâng cao khả năng orchestration/phân chia task phức tạp cho agent workflows. Phản hồi: 2 bình luận, 2 👍.  
  Link: https://github.com/github/copilot-cli/issues/1374

- #1585 — [macOS] Cmd+C copy broken after alt-screen enabled by default for --experimental users (v0.0.413) (OPEN)  
  Tác giả: @kevindesuyo — Tại sao quan trọng: kiểu tương tác cơ bản (Cmd+C) bị ảnh hưởng khi bật chế độ experimental — tác động lớn tới người dùng macOS. Phản hồi: 2 bình luận, 5 👍.  
  Link: https://github.com/github/copilot-cli/issues/1585

- #970 — Copilot app blocked by macOS Gatekeeper under corporate security policy (OPEN)  
  Tác giả: @jdesulme — Tại sao quan trọng: triển khai/upgrade qua Homebrew bị Gatekeeper chặn trong môi trường doanh nghiệp — cản trở việc áp dụng nội bộ. Phản hồi: 2 bình luận, 16 👍.  
  Link: https://github.com/github/copilot-cli/issues/970

- #1912 — Context Manager for Persistent Sessions Per Folder (OPEN)  
  Tác giả: @kristiansnts — Tại sao quan trọng: hiện tại mỗi lần mở Copilot CLI tạo session mới; yêu cầu này nhắm tới lưu/khôi phục ngữ cảnh theo thư mục để nâng cao trải nghiệm phát triển lâu dài. Mới tạo, chưa có phản hồi.  
  Link: https://github.com/github/copilot-cli/issues/1912

- #1911 — Export traces, metrics, and events via OpenTelemetry (OTel) (OPEN)  
  Tác giả: @doughgle — Tại sao quan trọng: quan sát (observability) cho agent interactions, LLM calls, token usage rất quan trọng để debug hiệu năng/chi phí trong môi trường sản xuất. Mới tạo.  
  Link: https://github.com/github/copilot-cli/issues/1911

4) Tiến độ PR quan trọng
- Hiện có rất ít PR mới trong 24 giờ qua — chỉ 1 PR mở:
  - #1916 — Rename install.sh to 1install.sh (OPEN) — Tác giả: @ahamedjobayer081-spec  
    Nội dung: đổi tên script cài đặt (có thể nhằm thay đổi thứ tự hoặc tránh trùng tên). Chưa có bình luận/👍.  
    Link: https://github.com/github/copilot-cli/pull/1916
- Nhận xét tổng quát: hoạt động PR trong 24h hạn chế; nhiều hoạt động đang diễn ra dưới dạng issue/triage hơn là merge PR.

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Quản lý và lựa chọn model: yêu cầu hỗ trợ optional models, model highlighting và xử lý case-insensitive (Issues #248, #1325, #1908).  
- Phiên làm việc bền vững: persist sessions per folder, /new vs /clear behavior, resume shorthand (Issues #1912, #1915, #1914).  
- Mở rộng tích hợp IDE: tài liệu /ide và hỗ trợ IDE khác ngoài VSCode (Issue #1868).  
- Quan sát & đo lường: xuất traces/metrics qua OpenTelemetry để debug agent/LLM/tool (Issue #1911).  
- Plugin/skill ecosystem: namespacing, cập nhật plugin khi cài từ repo, giảm noisy warnings (Issues #1766, #1290/#1885, #1631).  
- Agent orchestration: hỗ trợ subagent lồng nhau (Issue #1374).  
- Cấu hình môi trường làm việc: persistent additional working directories, /add-dir cải thiện (Issues #1919, #1917, #1779).

6) Điểm đau của nhà phát triển — tổng hợp ngắn gọn
- Nhập liệu & Unicode: IME cho CJK bị lệch/không hiện (Closed nhưng tác động rộng), copy/paste Unicode hỏng trên WSL, Cmd+C mất tác dụng trên macOS khi bật alt-screen — gây gián đoạn công việc cơ bản. (See #1698, #1918, #1585)  
- Ổn định kết nối/timeout: assertion/HTTP/2 GOAWAY (503) khi chạy tác vụ dài khiến các agent/retrospective không ổn định. (See #1754)  
- Trải nghiệm phiên làm việc: thiếu persistent sessions per-folder và hành vi lệnh /new gây nhầm lẫn; cần resume ngắn gọn. (See #1912, #1915, #1914)  
- Quản lý mô hình & chi phí: người dùng lo ngại chọn nhầm model đắt tiền — cần highlighting và danh sách model rõ ràng, case-insensitive matching. (See #248, #1325, #1908)  
- Tích hợp & triển khai: docs /ide cho IDE khác, plugin update cho cài đặt trực tiếp từ repo, Gatekeeper trên macOS trong doanh nghiệp. (See #1868, #1290/#1885, #970)  
- Quan sát và phân tích: thiếu export telemetry làm khó debug chuỗi tương tác agent → LLM → tool. (See #1911)

Kết luận nhanh
- Ưu tiên kỹ thuật trong thời gian tới nên tập trung vào: (1) sửa lỗi đầu vào/Unicode và tương tác terminal (IME, WSL, macOS), (2) ổn định kết nối cho tác vụ dài, (3) trải nghiệm phiên làm việc bền vững và (4) tài liệu /ide + observability để mở rộng tích hợp.

Nếu bạn muốn, tôi có thể:
- Chuẩn hoá một template issue cho từng loại lỗi (IME / Unicode / Gatekeeper) để đẩy nhanh xử lý; hoặc
- Tổng hợp các comment/PR liên quan tới model selection để đề xuất thiết kế UI/UX cho việc highlight và case-insensitive matching.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

Bản tin cộng đồng Kimi Code CLI — 2026-03-09

1) Điểm nổi bật hôm nay
- Không có bản phát hành mới trong 24 giờ qua. Trong cộng đồng xuất hiện một số issue quan trọng liên quan tới trải nghiệm VSCode extension, quản lý session lịch sử qua CLI, cấu hình mức dự án cho MCP/subagents và một số lỗi kết nối trên Ubuntu / khi mount agent file cho chế độ web.
- Hiện có 5 issue mới/được cập nhật trong 24 giờ qua — đây là các vấn đề thực tế đang ảnh hưởng tới UX plugin/CLI và workflow tích hợp vào dự án.

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (mục đáng chú ý nhất — tất cả 5 issue mới)
Lưu ý: các link dẫn tới GitHub được đính kèm để xem chi tiết và tham gia thảo luận.

1. #1270 — [enhancement] VSCode扩展，敲入@后，应该优先显示已经打开的文件  
   Tác giả: @ljyfree | Tạo: 2026-02-27 | Cập nhật: 2026-03-08 | Bình luận: 1 | 👍: 0  
   Link: https://github.com/MoonshotAI/kimi-cli/issues/1270  
   Tại sao quan trọng: Trải nghiệm tìm/insert file trong VSCode (gõ "@") đang không ưu tiên file đang mở, gây cản trở thao tác thường gặp khi dev muốn phân tích/operate file hiện hành. Cải thiện UX này sẽ tăng hiệu quả làm việc của plugin.  
   Phản ứng cộng đồng: Có 1 bình luận, chưa có upvote — đề xuất mang tính UX/ưu tiên hiển thị.

2. #1366 — [enhancement] Add arguments for cli to select the history session  
   Tác giả: @bakey | Tạo: 2026-03-09 | Cập nhật: 2026-03-09 | Bình luận: 0 | 👍: 0  
   Link: https://github.com/MoonshotAI/kimi-cli/issues/1366  
   Tại sao quan trọng: Hiện chỉ có -C để tiếp tục session cuối cùng; nhu cầu là liệt kê và chọn session lịch sử. Tính năng này hữu ích cho workflow tái sử dụng cuộc hội thoại/agent state.  
   Phản ứng cộng đồng: Mới tạo, chưa phản hồi — nhưng thể hiện nhu cầu quản lý session rõ ràng từ người dùng.

3. #1365 — [enhancement] 现在只有全局的mcp、subagents配置，我需要项目级别的配置 || Now there is only global mcp and subagents configuration, I need project-level configuration  
   Tác giả: @cnzys | Tạo: 2026-03-08 | Cập nhật: 2026-03-08 | Bình luận: 0 | 👍: 1  
   Link: https://github.com/MoonshotAI/kimi-cli/issues/1365  
   Tại sao quan trọng: Người dùng muốn config MCP/subagents theo từng dự án (project-level) thay vì bắt buộc cấu hình global hoặc truyền flag tay mỗi lần. Quan trọng cho tích hợp CI/CD và trải nghiệm lập trình theo dự án.  
   Phản ứng cộng đồng: 1 thumbs-up — vấn đề có tính thực tế cao với nhiều repo/dự án.

4. #1364 — [bug] Bug Report: Connection error on Ubuntu due to illegal HTTP header value  
   Tác giả: @laserwang | Tạo: 2026-03-08 | Cập nhật: 2026-03-08 | Bình luận: 0 | 👍: 0  
   Link: https://github.com/MoonshotAI/kimi-cli/issues/1364  
   Tại sao quan trọng: Lỗi "Connection error" khi chạy kimi chat trên Ubuntu (1.17.0) có thể chặn dev sử dụng công cụ trên môi trường phổ biến. Cần debug header/HTTP client để đảm bảo tương thích Linux.  
   Phản ứng cộng đồng: Chưa có phản hồi — cần team core prioritise vì tác động rộng.

5. #1363 — [bug] Kimi web目前似乎无法通过："kimi --agent-file /path/to/my-agent.yaml web"挂载自定义的agent file  
   Tác giả: @gjczone | Tạo: 2026-03-08 | Cập nhật: 2026-03-08 | Bình luận: 0 | 👍: 0  
   Link: https://github.com/MoonshotAI/kimi-cli/issues/1363  
   Tại sao quan trọng: Tài liệu chỉ dẫn dùng --agent-file để mount agent khi chạy web nhưng người dùng báo không hoạt động. Gây mất khả năng thử agent tuỳ chỉnh trên giao diện web — ảnh hưởng tới quy trình phát triển và thử nghiệm.  
   Phản ứng cộng đồng: Chưa có bình luận — là bug chức năng cần fix sớm.

(Tổng số issue cập nhật/khởi tạo trong 24h: 5)

4) Tiến độ PR quan trọng
- Không có Pull Request mới hoặc cập nhật trong 24 giờ qua trong repository.  
- Gợi ý ưu tiên cho PR tiếp theo: fix lỗi kết nối Ubuntu (#1364), hỗ trợ --agent-file cho web (#1363), thêm CLI args để liệt kê/chọn history session (#1366), và cải thiện VSCode extension UX (#1270). Các PR này sẽ có tác dụng trực tiếp lên trải nghiệm người dùng.

5) Xu hướng yêu cầu tính năng
Từ các issue mới, các hướng tính năng được cộng đồng quan tâm nhiều nhất:
- Tối ưu UX VSCode extension (ưu tiên file đang mở khi gõ "@"). (Issue #1270)  
- Quản lý session lịch sử trong CLI: list/select specific session (không chỉ tiếp tục session cuối). (Issue #1366)  
- Hỗ trợ cấu hình ở cấp dự án (project-level) cho MCP và subagents, thay vì chỉ global. (Issue #1365)  
- Cho phép mount agent tùy chỉnh khi chạy web (đảm bảo --agent-file hoạt động). (Issue #1363)  
- Khắc phục lỗi kết nối/HTTP header trên Ubuntu để đảm bảo tương thích môi trường. (Issue #1364)

6) Điểm đau của nhà phát triển (tóm tắt vấn đề lặp lại / ưu tiên giải quyết)
- Thiếu cấu hình theo dự án: Dev không muốn thêm flag tay mỗi lần khởi động; mong có vị trí config mặc định trong thư mục dự án. (ảnh hưởng đến onboarding & CI)  
- Quản lý session hạn chế: hiện chỉ có tiếp tục session cuối, thiếu cơ chế liệt kê/chọn session cũ cho workflow lặp lại.  
- Vấn đề tương thích nền tảng (Ubuntu): lỗi kết nối có thể đến từ header/HTTP client — cần logging/stacktrace rõ để fix.  
- Tính năng web bị lệch so với tài liệu: --agent-file không hoạt động khi chạy web, gây gián đoạn thử nghiệm agent tuỳ chỉnh.  
- Trải nghiệm plugin VSCode chưa tối ưu cho thao tác nhanh (nhất là thao tác chọn file hiện mở khi dùng "@").

Kết luận và đề xuất hành động ngắn
- Ưu tiên sửa lỗi nền tảng (#1364) và bug web agent-file (#1363) trước vì gây gián đoạn chức năng.  
- Song song, lên kế hoạch PR cho: hỗ trợ project-level config (#1365) và CLI session management (#1366).  
- Với VSCode UX (#1270), một PR nhỏ thay đổi thứ tự hiển thị kết quả khi gõ "@" có thể nhanh chóng nâng cao trải nghiệm.

Tài nguyên / Links
- Issue #1270: https://github.com/MoonshotAI/kimi-cli/issues/1270  
- Issue #1366: https://github.com/MoonshotAI/kimi-cli/issues/1366  
- Issue #1365: https://github.com/MoonshotAI/kimi-cli/issues/1365  
- Issue #1364: https://github.com/MoonshotAI/kimi-cli/issues/1364  
- Issue #1363: https://github.com/MoonshotAI/kimi-cli/issues/1363

Nếu bạn muốn, tôi có thể:
- Soạn sẵn template PR/issue comment để bắt đầu fix các mục ưu tiên, hoặc  
- Gợi ý patches/PR skeleton cho từng vấn đề ưu tiên (ví dụ: debug HTTP header trên Ubuntu, hoặc CLI args cho history).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

OpenCode Community Bulletin — 2026-03-09

1) Điểm nổi bật hôm nay
- Phát hành v1.2.22 (24h qua): sửa một số lỗi TUI liên quan canonicalize đường dẫn/TUI MCP toggle, cập nhật kiểm tra đường dẫn database, cho phép kênh beta chia sẻ DB với stable, và thêm biến môi trường OPENCODE_SKIP_MIGRATIONS để bypass migration. (Chi tiết bên dưới.)
- Cộng đồng đang tập trung vào hai nhóm vấn đề chính: sự cố với thư viện mô hình (Copilot/Codex/Opus) khiến tính năng reasoning/assistant prefill không tương thích; và lỗi liên quan symlink / canonicalization làm sinh nhiều instance / TUI treo. Nhiều PR đang nhắm tới giải quyết canonicalize/resolve symlink và cải thiện hỗ trợ các backend mô hình cục bộ như Ollama.

2) Phát hành phiên bản (mới nhất: v1.2.22)
Phiên bản: v1.2.22 (cập nhật trong 24h)
- Core
  - Canonicalize current working directory after changing directories in TUI — giảm lỗi đường dẫn/instance không nhất quán
  - Fix broken MCP toggling in TUI (author: @natewill)
  - Update database path test to verify correct channel-based filename
  - Allow beta channel to share database with stable channel
  - Add OPENCODE_SKIP_MIGRATIONS flag to bypass migrations
- Link dự án: https://github.com/anomalyco/opencode

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
Lưu ý: mỗi item kèm link GitHub; có chú thích ngắn về vì sao quan trọng và phản ứng cộng đồng.

- #8598 — [CLOSED] [bug] Copilot requested model not supported  
  https://github.com/anomalyco/opencode/issues/8598  
  Tại sao quan trọng: Nhiều người không thể dùng các model Copilot (ví dụ 5.2-Codex, Raptor) dù bật tính năng ở VS Code; ảnh hưởng tới trải nghiệm tích hợp phổ biến.  
  Phản ứng: 41 bình luận, 👍7 — thảo luận nhiều về tương thích provider và cách OpenCode phát hiện/cấu hình model.

- #11112 — [OPEN] [bug] always stuck at “Preparing write...”  
  https://github.com/anomalyco/opencode/issues/11112  
  Tại sao quan trọng: Lỗi làm tác vụ I/O/“write” bị treo (Prometheus / tool execution aborted), ảnh hưởng tới workflow tự động hóa và plugin.  
  Phản ứng: 38 bình luận, 👍17 — người dùng cung cấp logs/trace; issue có mức độ ảnh hưởng cao.

- #13768 — [OPEN] [bug] This model does not support assistant message prefill / Github Copilot with Opus 4.6  
  https://github.com/anomalyco/opencode/issues/13768  
  Tại sao quan trọng: Một lớp lỗi khi provider/model không hỗ trợ “assistant prefill” — dẫn tới kết thúc hội thoại sai và dừng luồng. Ảnh hưởng tới Opus 4.6 và tương tự.  
  Phản ứng: 23 bình luận, 👍11 — nhiều người gặp lỗi tương tự; liên quan chặt tới cách OpenCode map các khả năng của model.

- #12954 — [OPEN] [discussion][FEATURE] 5.3 Codex for Github Copilot provider  
  https://github.com/anomalyco/opencode/issues/12954  
  Tại sao quan trọng: Cộng đồng yêu cầu hỗ trợ Codex 5.3 (được public), quan trọng cho devs dùng Copilot-style models.  
  Phản ứng: 17 bình luận, 👍121 — nhu cầu lớn; thảo luận về cách triển khai provider mapping.

- #16470 — [OPEN] [bug, core] Code output unreadable in light mode  
  https://github.com/anomalyco/opencode/issues/16470  
  Tại sao quan trọng: Bug giao diện khiến mã không thể đọc được trong light theme — trực tiếp ảnh hưởng UX cho nhiều dev.  
  Phản ứng: 12 bình luận — issue core UI, cần hotfix hoặc theme patch.

- #11439 — [OPEN] Support parsing `<think>` and `<thinking>` tags as reasoning blocks  
  https://github.com/anomalyco/opencode/issues/11439  
  Tại sao quan trọng: Người dùng muốn hiển thị reasoning blocks từ tags (hữu ích khi mô phỏng “thinking” cho các model không hỗ trợ reasoning native).  
  Phản ứng: 11 bình luận, 👍8 — feature request có liên quan tới cách trình bày output và tính minh bạch reasoning.

- #16647 — [OPEN] [windows, core] Symlinked project directories break after 8a95be4 (realpath resolution)  
  https://github.com/anomalyco/opencode/issues/16647  
  Tại sao quan trọng: Canonicalization/realtime resolution gây dereference symlinks và dẫn tới break trên Windows / symlinked setups — phổ biến với dotfiles / monorepo workflows.  
  Phản ứng: 9 bình luận — issue lõi, nhiều ảnh hưởng đến developer workflow.

- #15482 — [OPEN] [bug, core] Two server instances created when project path contains symlink, causing TUI to freeze on prompt  
  https://github.com/anomalyco/opencode/issues/15482  
  Tại sao quan trọng: Sinh ra hai state instances khiến prompt trong TUI bị “mất” hoặc không được process — trải nghiệm người dùng bị hỏng.  
  Phản ứng: 6 bình luận — liên quan chéo với issue symlink khác.

- #16351 — [OPEN] [core, opentui] TUI broken in tmux after 1.2.17 (found root cause)  
  https://github.com/anomalyco/opencode/issues/16351  
  Tại sao quan trọng: TUI trong tmux bị hỏng (input không nhận, escape sequences hiển thị) — tác động tới nhiều dev dùng tmux/remote terminals.  
  Phản ứng: 3 bình luận, 👍9 — issue quan trọng cho người dùng terminal.

- #9988 — [OPEN] [bug] Shared Link Missing Latest Chat Content (Even After Re-sharing)  
  https://github.com/anomalyco/opencode/issues/9988  
  Tại sao quan trọng: Shared-session không cập nhật nội dung mới ngay cả khi re-share — quan trọng cho tính năng chia sẻ và hợp tác.  
  Phản ứng: 2 bình luận — đang có PR (16655) nhằm vô hiệu hóa caching cho trang share.

4) Tiến độ PR quan trọng (10 PR đang theo dõi)
Mỗi PR kèm link và tóm tắt ngắn về mục tiêu/tác động.

- #16651 — fix: resolve symlinks in Instance cache to prevent duplicate contexts  
  https://github.com/anomalyco/opencode/pull/16651  
  Mục tiêu: Sửa lỗi cache key của Instance — resolve symlink thực sự để tránh duplicate instances. Khắc phục hàng loạt issue symlink/TUI. (Liên quan: #16647, #15482, #16522)

- #16665 — fix: canonicalize filepath in Instance.containsPath() for symlink support  
  https://github.com/anomalyco/opencode/pull/16665  
  Mục tiêu: Chuẩn hóa filepath khi kiểm tra chứa path; bổ trợ cho PR/issue về symlink, giảm sai khớp đường dẫn.

- #16653 — feat: auto-detect local Ollama models  
  https://github.com/anomalyco/opencode/pull/16653  
  Mục tiêu: Tự động phát hiện Ollama (localhost) models, auto-register provider, thêm --local flag cho /models, enable tool calling cho Ollama — cải thiện trải nghiệm chạy mô hình cục bộ.

- #16630 — fix(opencode): sanitize history and gate options on target model switch  
  https://github.com/anomalyco/opencode/pull/16630  
  Mục tiêu: Khi chuyển model mục tiêu, sanitize history và điều chỉnh options tương thích — tránh gửi param reasoning incompatible đến các backend OpenAI-compatible. (Fix #16154)

- #16654 — fix: keep streamed text when providers skip text-start  
  https://github.com/anomalyco/opencode/pull/16654  
  Mục tiêu: Xử lý trường hợp provider phát các text-delta trước `text-start` — đảm bảo không mất đoạn text đầu, ổn định streaming.

- #16655 — fix: keep shared sessions fresh instead of serving cached snapshots (needs:compliance)  
  https://github.com/anomalyco/opencode/pull/16655  
  Mục tiêu: Vô hiệu HTTP caching cho trang public shared-session / data endpoint để giải quyết issue #9988 (shared links stale).

- #16263 — feat(app): support slash commands mid-prompt  
  https://github.com/anomalyco/opencode/pull/16263  
  Mục tiêu: Cho phép slash commands (/undo, /new, custom) sử dụng ở giữa prompt, cải thiện UX chat/TUI.

- #16638 — fix(provider): extend mistral transform to codestral, pixtral, mixtral…  
  https://github.com/anomalyco/opencode/pull/16638  
  Mục tiêu: Mở rộng transform dành cho họ Mistral nhằm hỗ trợ các họ model mới (codestral, pixtral, mixtral) — tăng tính tương thích provider.

- #16663 — feat(opencode): add macOS to test matrix  
  https://github.com/anomalyco/opencode/pull/16663  
  Mục tiêu: Thêm macos-latest runner vào CI (unit/e2e) — cải thiện coverage và phát hiện regressions nền tảng macOS.

- #12417 — feat: introduce automations across server, app, and TUI (CLOSED)  
  https://github.com/anomalyco/opencode/pull/12417  
  Mục tiêu: Thêm hệ thống Automations (scheduled/manual prompts across projects, session spin-up, history recording). Lớn về scope — đã đóng nhưng đáng chú ý cho roadmap automation.

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Hỗ trợ các model Codex/Copilot/GPT-5.x mới (5.3 Codex, 5.4, v5 family): nhiều yêu cầu để map khả năng và flags tương thích. (See #12954, #16265, #16470, #8598)
- Hỗ trợ mô hình cục bộ / tự host (Ollama auto-detect, --local models, tool calling cho local models). (See PR #16653)
- Semantic code search / vector indexing / integrate mgrep — nhu cầu tăng cho tìm kiếm ngữ nghĩa trong codebase. (See #6265, #3184, #5909)
- Automation & scheduling (Automations across server/app/TUI). (PR #12417)
- Better TUI UX: slash commands mid-prompt, session picker improvements, undo/redo keybind normalization, tmux compatibility. (PR #16263, #16611, #13877, #16351)
- Claude Code compatibility (hooks PreToolUse/PostToolUse/Stop) và skills integration. (See #12472)
- Shared-session reliability: keep shared pages fresh and prevent stale CDN caching. (Issue #9988, PR #16655)
- Fine-grained permission flows (e.g., “Allow All for This Query”) to streamline multi-tool approvals. (Issue #16637)

6) Điểm đau của nhà phát triển (tổng hợp ngắn)
- Symlink/canonicalization: nhiều lỗi (duplicate instances, TUI blank, freeze) do resolve/realpath behavior — đang có nhiều PR sửa (16650/16651/16665). (Issues #16647, #15482, #16522)
- Model capability mismatch: OpenCode gửi reasoning params hoặc assistant-prefill tới provider không hỗ trợ => session dừng hoặc errors. Cần mapping capability tốt hơn và gating option khi đổi model. (Issues #13768, #16154, PR #16630)
- Stream handling: một số providers emit `text-delta` trước `text-start`, gây mất text hoặc rendering lệch; PR #16654 đang khắc phục. (Issue #5210)
- Terminal/TUI fragility: tmux, WSL symlinks, keybinds (undo/redo) và theme rendering (code invisible in light mode) => ảnh hưởng lớn tới dev yang work in terminal. (Issues #16351, #16470, PR #16611)
- Shared sessions / caching: shared links đôi khi phục vụ nội dung cũ do cache/CDN — PR #16655 đang xử lý; cần disable caching cho endpoint chia sẻ.
- Provider compatibility & local model support: mong muốn auto-discover local runtimes (Ollama) và better OpenAI-compatible provider behavior.

Kết luận ngắn
- Trong 24h gần nhất OpenCode tập trung sửa các vấn đề symlink/canonicalization và cải thiện tương thích model & streaming. Các PR quan trọng đang tiến hành nhằm khắc phục nhiều pain point cốt lõi (duplicate instances, streaming deltas, stale shared sessions, local model auto-detect). Nếu bạn gặp các lỗi symlink/TUI hoặc model incompatibility, theo dõi các PR #16651, #16665, #16654, #16653 và issue tương ứng để thử patch/PR hoặc cung cấp logs.

Cần thêm thông tin chi tiết hay tin nhắn mẫu cho người dùng (ví dụ cách thu logs, workaround symlink) không?

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

Qwen Code — Bản tin cộng đồng (2026-03-09)

1) Điểm nổi bật hôm nay
- Phát hành nhánh preview/nightly v0.12.0 đưa vào hai sửa/tiện ích chính: sửa parsing frontmatter trên Windows (CRLF/BOM) và bổ sung tabWidth + chuyển tab thành spaces trong phần tô màu code. (xem phần Phát hành bên dưới)
- Nhiều PR liên quan tới trải nghiệm khởi động, xử lý lỗi retry và đồng bộ hoá nhãn công cụ đã được merged — tập trung sửa các nguồn gây nhiễu UX và cải thiện khả năng tương thích với VSCode.

2) Phát hành phiên bản
- v0.12.0-nightly.20260309.d63798cc (release): https://github.com/QwenLM/qwen-code/releases/tag/v0.12.0-nightly.20260309.d63798cc
- v0.12.0-preview.1 (release): https://github.com/QwenLM/qwen-code/releases/tag/v0.12.0-preview.1
  Nội dung chính:
  - fix(cli): parse markdown command frontmatter trên Windows CRLF/BOM — PR: https://github.com/QwenLM/qwen-code/pull/2078
  - feat: thêm tabWidth cho code highlighting và tự động thay tab bằng spaces trong CodeColorizer — PR: https://github.com/QwenLM/qwen-code/pull/2077

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #311 qwen code is working slowly — https://github.com/QwenLM/qwen-code/issues/311  
  Tại sao quan trọng: hiệu năng là rào cản chính khi dùng CLI/agent; tác giả báo lỗi trên nhiều máy. Cộng đồng phản hồi nhiều (18 bình luận, 5 👍).  
- #2105 Error message not cleared after switching model and sending new request — https://github.com/QwenLM/qwen-code/issues/2105  
  Tại sao quan trọng: lỗi UX gây nhầm lẫn khi chuyển model; đã có PR fix liên quan (PR #2192, #2160). Bình luận: 5.  
- #2191 Error during web search: 429 Too Many Requests (throttling) — https://github.com/QwenLM/qwen-code/issues/2191  
  Tại sao quan trọng: giới hạn QPS ảnh hưởng chức năng WebSearch kéo dài >3 ngày; tác động lên reproducibility của tìm kiếm web. Bình luận: 4, 1 👍.  
- #2012 Lot's of failed bash tool calls — https://github.com/QwenLM/qwen-code/issues/2012  
  Tại sao quan trọng: nhiều cuộc gọi bash thất bại trên nhiều dự án — ảnh hưởng công việc tự động hoá/agent. Bình luận: 4.  
- #1815 Feature Request: Agent Team - Multi-Agent Collaboration — https://github.com/QwenLM/qwen-code/issues/1815  
  Tại sao quan trọng: yêu cầu tính năng cộng tác đa-agent được ưa chuộng (7 👍); mở hướng cho workflow phức tạp và phân nhiệm. Cập nhật gần nhất: 2026-03-09.  
- #2198 Bug: Cannot type spacebar character in CLI input — https://github.com/QwenLM/qwen-code/issues/2198  
  Tại sao quan trọng: lỗi cơ bản làm mất khả năng nhập lệnh; chặn sử dụng CLI. Bình luận: 1.  
- #2201 Often the read tool ends up in a loop reading a file — https://github.com/QwenLM/qwen-code/issues/2201  
  Tại sao quan trọng: read tool lặp gây mất thời gian và sai ngữ cảnh khi agent cần đọc vùng file cụ thể. Không có bình luận hiện tại.  
- #2200 compress not working — https://github.com/QwenLM/qwen-code/issues/2200  
  Tại sao quan trọng: feature compress không giảm context window như mong đợi — tác động trực tiếp lên việc quản lý context. Không có bình luận hiện tại.  
- #2196 ignored directives at ~/.qwen/QWEN.md and ~/.qwen/settings.json every CLI new instance — https://github.com/QwenLM/qwen-code/issues/2196  
  Tại sao quan trọng: cấu hình toàn cục bị bỏ qua khi spawn CLI mới — ảnh hưởng trải nghiệm người dùng và thiết lập mặc định. Không có bình luận.  
- #2194 Add --worktree flag to enable isolated parallel Qwen Code sessions using Git worktrees — https://github.com/QwenLM/qwen-code/issues/2194  
  Tại sao quan trọng: chạy nhiều session đồng thời gây xung đột file — worktree là giải pháp nhẹ để cô lập session; đề xuất hữu dụng cho CI/dev workflows. Không có bình luận.

4) Tiến độ PR quan trọng (10 PR)
- #2192 CLOSED — fix: clear retry error even without countdown timer — https://github.com/QwenLM/qwen-code/pull/2192  
  Tác giả: @hkc5. Sửa lỗi khiến lỗi retry vẫn hiển thị khi không có countdown; liên quan issue #2105.
- #2195 OPEN — feat(vscode): add sidebar chat view — https://github.com/QwenLM/qwen-code/pull/2195  
  Tác giả: @buaoyezz. Thêm sidebar chat tập trung cho VS Code, tích hợp webview chat.
- #1828 CLOSED — [v0.12.0] feat: Implement AskUserQuestionTool for interactive user queries — https://github.com/QwenLM/qwen-code/pull/1828  
  Tác giả: @DragonnZhang. Thêm tool để agent có thể hỏi người dùng trong giữa nhiệm vụ (AskUser).
- #2159 CLOSED — feat(ui): add setting to suppress home directory warning — https://github.com/QwenLM/qwen-code/pull/2159  
  Tác giả: @echoVic. Thêm ui.suppressHomeDirectoryWarning để tắt cảnh báo khởi động từ home.
- #2160 CLOSED — fix(ui): clear static retry error on new query — https://github.com/QwenLM/qwen-code/pull/2160  
  Tác giả: @echoVic. Xoá lỗi retry-stub khi bắt đầu truy vấn mới; có test hồi quy. Giải quyết #2105.
- #2161 CLOSED — feat(ui): add actionable guidance to home directory warning — https://github.com/QwenLM/qwen-code/pull/2161  
  Tác giả: @echoVic. Cập nhật thông báo với hướng dẫn cụ thể (cd <project-dir>, ignore .qwen/settings.json).
- #2162 CLOSED — fix(auth): preserve selected auth type when init auth fails — https://github.com/QwenLM/qwen-code/pull/2162  
  Tác giả: @echoVic. Giữ nguyên lựa chọn auth khi khởi tạo thất bại; thêm test.
- #2174 CLOSED — feat(core): discover project skills from .agents/skills — https://github.com/QwenLM/qwen-code/pull/2174  
  Tác giả: @echoVic. Mở rộng khám phá skills cho thư mục .agents/skills (project-level).
- #2175 CLOSED — fix(cli): dedupe identical startup warning errors — https://github.com/QwenLM/qwen-code/pull/2175  
  Tác giả: @echoVic. Gộp cảnh báo khởi động trùng lặp để giảm nhiễu output.
- #2163 CLOSED — feat(webui): unify shell tool label to Shell — https://github.com/QwenLM/qwen-code/pull/2163  
  Tác giả: @echoVic. Chuẩn hoá nhãn cho shell tool trong web UI, đồng nhất với CLI.

5) Xu hướng yêu cầu tính năng
- Agent collaboration / multi-agent workflows (Issue #1815). Link: https://github.com/QwenLM/qwen-code/issues/1815  
- Interactive AskUser capability để agent hỏi rõ ràng (PR #1828 / Issue liên quan). Link: https://github.com/QwenLM/qwen-code/pull/1828  
- Isolation cho nhiều session (git worktree flag) để tránh xung đột working dir (Issue #2194). Link: https://github.com/QwenLM/qwen-code/issues/2194  
- Nâng cao input capabilities (checkbox, tabs, richer input) (Issue #1664). Link: https://github.com/QwenLM/qwen-code/issues/1664  
- Tích hợp VS Code sidebar / companion improvements (PR #2195). Link: https://github.com/QwenLM/qwen-code/pull/2195  
- Cải thiện UX khởi động: home-directory warnings, suppress setting, hướng dẫn hành động (PRs #2159, #2161). Links: https://github.com/QwenLM/qwen-code/pull/2159, https://github.com/QwenLM/qwen-code/pull/2161

6) Điểm đau của nhà phát triển (tóm tắt & hành động đề xuất)
- Hiệu năng tổng thể chậm (Issue #311) — đề xuất: tập trung profiling CLI/agent, thu thập traces từ người dùng, so sánh với gemini CLI. Link: https://github.com/QwenLM/qwen-code/issues/311
- Công cụ thất bại không nhất quán: bash tool lỗi (#2012), read tool loop (#2201), compress không hoạt động (#2200) — hành động: thêm test e2e trên tool calls, cải thiện logging và retry/backoff. Links: https://github.com/QwenLM/qwen-code/issues/2012, https://github.com/QwenLM/qwen-code/issues/2201, https://github.com/QwenLM/qwen-code/issues/2200
- UX CLI cơ bản bị lỗi: không gõ được space (#2198), cấu hình global bị bỏ qua (#2196), cảnh báo khởi động ồn (#2159/#2161/#2175) — hành động: ưu tiên sửa blocking input bug, đảm bảo đọc file config lúc spawn, duy trì copy hướng dẫn. Links: https://github.com/QwenLM/qwen-code/issues/2198, https://github.com/QwenLM/qwen-code/issues/2196
- Xử lý lỗi/retry hiển thị: lỗi cũ còn hiện khi gửi truy vấn mới (#2105) — đã có PRs (#2192, #2160) nhưng cần test rộng. Links: https://github.com/QwenLM/qwen-code/issues/2105, https://github.com/QwenLM/qwen-code/pull/2192
- Throttling / rate limit khi dùng WebSearch (429) — đề xuất: báo rõ rate-limit, expose backoff thông minh hoặc quota info cho người dùng. Link: https://github.com/QwenLM/qwen-code/issues/2191
- Yêu cầu tính năng lớn: multi-agent & interactive AskUser — cần roadmap/thiết kế API để tránh phá vỡ compat. Links: https://github.com/QwenLM/qwen-code/issues/1815, https://github.com/QwenLM/qwen-code/pull/1828

Kết luận ngắn gọn: bản phát hành v0.12.0 đã giải quyết một số vấn đề tương thích (Windows frontmatter, tab handling), cộng đồng đang tập trung vào ổn định công cụ (bash/read/compress), cải thiện UX khởi động và hỗ trợ workflows phức tạp (multi-agent, worktree, VSCode sidebar). Các PR liên quan tới clear retry/errors và cải thiện UX đã được merged — bước tiếp theo ưu tiên là hiệu năng, test tool robustness và xử lý rate-limit.

Nếu bạn muốn, tôi có thể:
- soạn checklist kỹ thuật ưu tiên để team dev tackle 5 vấn đề hàng đầu,
- hoặc tạo mẫu issue template để thu thập trace/performance từ người báo lỗi.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*