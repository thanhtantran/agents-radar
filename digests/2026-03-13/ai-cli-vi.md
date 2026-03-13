# Bản tin Cộng đồng Công cụ AI CLI 2026-03-13

> Thời gian tạo: 2026-03-13 01:58 UTC | Công cụ: 7

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
- Các dự án AI‑CLI đang cùng giải quyết hai lớp vấn đề chính: (a) quản lý bối cảnh/token (compaction, compression, session continuity) để scale workflows agent, và (b) độ tin cậy trải nghiệm terminal/IDE (TTY, tmux, VS Code, WebSocket).  
- Mỗi repo vừa vá các lỗi vận hành nền tảng (OS‑specific builds, auth/quota) vừa triển khai các tính năng mở rộng (hooks, remote control, retrieval/BYOK, per‑tool permissions).  
- Nhìn chung, có sự phân hóa: một số dự án (Codex, Qwen, Gemini) lặp nhanh với nightly/alpha releases và nhiều PR hằng ngày; các dự án nhỏ hơn/ổn định hơn tập trung vào UX và cross‑platform fixes.

2) So sánh mức độ hoạt động
Tool | Issues nóng (liệt kê) | PRs hoạt động (24h ghi nhận) | Release hôm nay
---|---:|---:|---
Anthropic — Claude Code | 10 issues nóng | 7 PRs ghi nhận (24h) | Không có release trong 24h
OpenAI — Codex | 10 issues nóng | ~10 PRs đáng theo dõi | Nhiều alpha rust tags (rust‑v0.115.x) — release activity cao
Google — Gemini CLI | 10 issues nóng | 10 PRs theo dõi | v0.35.0‑nightly.20260313 (nightly)
GitHub — Copilot CLI | ~10 issues nổi bật | 1 PR cập nhật/đóng (24h) | v1.0.5‑0 (mới)
MoonshotAI — Kimi Code CLI | 7 issue cập nhật | ~10 PRs (một số vừa closed) | v1.21.0 (mới)
AnomalyCo — OpenCode | 10 issues nóng | 10 PRs theo dõi | v1.2.25 (mới)
QwenLM — Qwen Code | 10 issues nổi bật | 10 PRs theo dõi | v0.12.2 và nightly 20260313

(Chú thích: "Issues nóng" là số mục nổi bật trong bản tin; "PRs hoạt động" là số PR được liệt kê/nhắc tới trong bản tin của ngày.)

3) Hướng tính năng chung (xuất hiện ở nhiều cộng đồng)
- Quản lý bối cảnh & token hiệu quả (Claude, Codex, Gemini, Copilot, Qwen): token compression, auto‑compaction trước khi lỗi API, metrics token usage.  
- Isolation cho subagents / sessions (Claude, Gemini, OpenCode, Qwen): parameter isolated / worktree flag / per‑session worktree để tránh leak reasoning và xung đột multi‑session.  
- Terminal & IDE compatibility (Codex, Gemini, Copilot, Qwen, Kimi): tmux/VS Code scroll/flicker, CJK/IME issues, keybinding conflicts, embedded terminals.  
- Hooks / event system & extensibility (Codex, Qwen, Copilot): pre/post hooks, event hooks, plugin/telemetry để automation và observability.  
- Auth / quota / enterprise flows (Codex, OpenCode, Copilot): device‑code, team/business quota resets, Copilot billing attribution bugs.  
- Remote control / multiprocess operation (Qwen, Copilot, Kimi): remote/web control, Telegram/bot mode, MCP reconnect commands.  
- Sandboxing & permissions / per‑tool safety (OpenCode, Kimi, Gemini, Claude): finer permission controls, deny‑with‑reason, YOLO/skip prompts.

4) Phân tích khác biệt hóa
- Trọng tâm kỹ thuật:
  - Codex: runtime/TUI & low‑level platform stability (rust builds, app‑server v2 FS, compaction). Hướng đến enterprise scale và TUI convergence.  
  - Claude Code: agent orchestration và an toàn (deny plugin, CLAUDE.md, subagent isolation, voice support). Ưu tiên an toàn/agent patterns.  
  - Gemini CLI: tương tác thời gian thực và UX terminal (AgentLoopContext migration, Plan Mode, terminal fallbacks). Tập trung trải nghiệm người dùng tương tác.  
  - Copilot CLI: developer‑centric UX (diff highlighting, retrieval embeddings, MCP/skill management) và tích hợp GitHub ecosystem.  
  - Kimi Code: tính năng interactive (steer in‑turn), session vis, nhanh sửa lỗi WebSocket/headers — sản phẩm nhỏ gọn, thích hợp rapid UX iteration.  
  - OpenCode: TUI/clipboard và provider compatibility, chú trọng đa‑provider (Azure/OpenRouter) và desktop/web parity.  
  - Qwen Code: hooks, remote control, IDE companion reliability — hướng đến tích hợp sâu với IDE và remote workflows.
- Người dùng mục tiêu:
  - Enterprise / team automation: Codex, OpenCode, Claude (agent teams, quota/auth concerns).  
  - Dev power‑users / IDE-centric: Copilot CLI, Qwen, Gemini, Kimi.  
  - Lightweight/embedded & hobbyists: Qwen/nightlies, Kimi (fast UX fixes).
- Hướng kỹ thuật khác nhau: Codex và Qwen chạy nhiều nightly/alpha (fast iterate, breaking changes); Claude/Genesis emphasize policy/safety primitives; Copilot/OpenCode emphasize ecosystem (GitHub/Azure) integration.

5) Động lực & độ trưởng thành của cộng đồng
- Hoạt động nhất: OpenAI Codex và Qwen Code — nhiều releases/nightlies, PRs hàng ngày và issue threads lớn (Codex có thread với >300 bình luận). Điều này cho thấy tốc độ lặp nhanh và lượng contributor/reporters lớn.  
- Cộng đồng có tương tác sâu (nhiều comment và thumbs): OpenCode (issue billing 172 comments), Codex (quota/compaction threads), Claude (subagent/context crash) — thể hiện users enterprise/ops sôi nổi.  
- Lặp nhanh (fast cadence): Codex, Qwen (nightlies/alpha tags, nhiều PRs).  
- Ổn định/ổn định theo UX: Kimi, Copilot, Gemini tập trung vá lỗi UX/compatibility thay vì thay đổi kiến trúc lớn.

6) Tín hiệu xu hướng (đề xuất chiến lược cho nhà phát triển)
- Đầu tư vào quản lý bối cảnh/token: native compression, guided compaction, và observability (token metrics) là ưu tiên chung — giảm rủi ro OOM và “forgetting” mid‑task.  
- Thiết kế isolation primitives: per‑session worktrees, isolated tool contexts, và fine‑grained tool permissions để support multi‑agent và bảo mật.  
- Robust terminal/IDE experience là bàn đạp adoption: fix tmux/VSCode embedding, IME/CJK input, keybinding conflicts — ảnh hưởng trực tiếp retention.  
- Hooks / event APIs và telemetry: chuẩn hoá pre/post hooks, plugin telemetry và event parsers giúp tích hợp automation và làm cho hệ sinh thái mở rộng hơn.  
- Enterprise auth & quota transparency: cho thấy rủi ro kinh doanh nếu bỏ qua (billing misattribution, team quota resets) — cần logs/attribution và hỗ trợ BYOK/device flows.  
- Resilience for large artifacts: streaming file handling, truncate policies, OOM protection khi repo/file quá lớn.  
- UX for expert users: lightweight/no‑animation modes, programmatic MCP controls, and commands like worktree/reconnect sẽ được ưa chuộng.

Kết luận ngắn: nếu phải ưu tiên cho một lộ trình kỹ thuật chung cho các CLI agent, hãy tập trung (1) bối cảnh/token và observability, (2) isolation & per‑tool security primitives, và (3) trải nghiệm terminal/IDE bền vững — những điểm này xuất hiện liên tục trong hầu hết các cộng đồng và có tác động lớn tới khả năng mở rộng, an toàn và trải nghiệm nhà phát triển. Nếu cần, tôi có thể chuyển những đề xuất này thành backlog ưu tiên (impact × effort) cho từng repo cụ thể.

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nổi bật Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

Báo cáo điểm nổi bật — cộng đồng Claude Code Skills (dữ liệu đến 2026-03-13)

1) Xếp hạng Skills "hot" (5–8 PR được thảo luận/quan tâm nhiều nhất)
- Add document-typography skill — typographic quality control for generated documents (PR #514)  
  Chức năng: phát hiện/sửa lỗi kiểu gõ thường gặp trong tài liệu do AI tạo (orphan/widow, căn chỉnh đánh số).  
  Điểm nổi bật thảo luận: nhu cầu cải thiện đầu ra văn bản theo chuẩn in/đọc; tác động trực tiếp tới mọi tài liệu Claude sinh.  
  Trạng thái: OPEN.  
  Link: https://github.com/anthropics/skills/pull/514

- Improve frontend-design skill clarity and actionability (PR #210)  
  Chức năng: làm rõ và cụ thể hóa skill hỗ trợ thiết kế frontend để Claude có thể thực thi trong cuộc hội thoại.  
  Điểm nổi bật thảo luận: tối ưu hoá tone/instruction để giảm phí token và tăng khả năng thực thi.  
  Trạng thái: OPEN.  
  Link: https://github.com/anthropics/skills/pull/210

- Add skill-quality-analyzer and skill-security-analyzer to marketplace (PR #83)  
  Chức năng: hai meta-skill phân tích chất lượng và bảo mật của Skills theo nhiều tiêu chí (structure, docs, testing, security…).  
  Điểm nổi bật thảo luận: nhu cầu công cụ đánh giá chuẩn cho hệ sinh thái skills; sẽ hỗ trợ curators và reviewer.  
  Trạng thái: OPEN.  
  Link: https://github.com/anthropics/skills/pull/83

- Add masonry-generate-image-and-videos skill (PR #335)  
  Chức năng: CLI cho tạo ảnh và video từ text (hỗ trợ các backend như Imagen/Veo).  
  Điểm nổi bật thảo luận: tích hợp tạo media đa phương tiện vào workflow Claude; quản lý job, lịch sử, tải về.  
  Trạng thái: OPEN.  
  Link: https://github.com/anthropics/skills/pull/335

- Add shodh-memory skill: persistent context for AI agents (PR #154)  
  Chức năng: hệ thống memory bền (persistent memory) để duy trì ngữ cảnh giữa các session/agents.  
  Điểm nổi bật thảo luận: nhu cầu lưu giữ kiến thức/biện pháp tránh quên giữa các lần dùng Claude.  
  Trạng thái: OPEN.  
  Link: https://github.com/anthropics/skills/pull/154

- Add ODT skill — OpenDocument text creation and template filling and parse ODT to HTML (PR #486)  
  Chức năng: tạo/điền template .odt và parse ODT sang HTML; tương thích LibreOffice/Google Docs.  
  Điểm nổi bật thảo luận: nhu cầu xuất bản/tích hợp tài liệu theo định dạng tiêu chuẩn công nghiệp.  
  Trạng thái: OPEN.  
  Link: https://github.com/anthropics/skills/pull/486

- Add Buildr skill - Telegram bridge for Claude Code (PR #419)  
  Chức năng: cầu nối session Claude Code với bot Telegram, mirror/forward, điều khiển phiên coding từ điện thoại.  
  Điểm nổi bật thảo luận: mong muốn remote control / mobile workflow cho developer.  
  Trạng thái: OPEN.  
  Link: https://github.com/anthropics/skills/pull/419

2) Xu hướng nhu cầu cộng đồng (tóm tắt từ Issues)
- Tính bền bỉ ngữ cảnh / memory: nhiều Issue/PR yêu cầu persistent memory hoặc ghi nhận kiến thức giữa session (ví dụ skill shodh-memory, record-knowledge).  
- Công cụ quản trị/kiểm soát agent: đề xuất skill agent-governance (chính sách, audit, trust scoring).  
- Độ tin cậy & vận hành (ops): lỗi upload/replace skill, xóa phiên bản trả 500, API downtime (OPUS), run_eval không kích hoạt skill — cộng đồng cần ổn định API/CLI và debug tool.  
- Bảo mật & trust trên marketplace: lo ngại skills giả mạo namespace anthropic/ gây lạm quyền; cần cơ chế xác thực/namespace rõ ràng.  
- Developer tooling & tiêu chuẩn hoá skill: cải thiện skill-creator, frontmatter/YAML validation, CONTRIBUTING.md, quality analyzer để nâng chất lượng contribution.  
- Kết nối hệ sinh thái (connectors): tích hợp Google Workspace, Telegram, Masonry media, SAP và các backend cloud (Bedrock) được kỳ vọng.  
- Tự động hóa workflow và QA: skill tạo test, audit codebase, a11y-auditor, changelog-curator, và công cụ đánh giá chất lượng/độ an toàn skill.

(Tham khảo Issues: https://github.com/anthropics/skills/issues)

3) Skills tiềm năng cao chưa merge (chọn các PR có ý nghĩa thực tiễn và phù hợp nhu cầu cộng đồng)
- skill-quality-analyzer & skill-security-analyzer (PR #83) — cung cấp thước đo chuẩn cho cộng đồng; giải quyết trực tiếp nhu cầu chất lượng/kiểm toán.  
  Link: https://github.com/anthropics/skills/pull/83

- shodh-memory (PR #154) — persistent memory là nhu cầu lặp lại trong Issues; nếu merge sẽ cải thiện UX lớn.  
  Link: https://github.com/anthropics/skills/pull/154

- record-knowledge (PR #521) — cơ chế lưu trữ kiến thức người dùng giữa session, thực tế và dễ áp dụng.  
  Link: https://github.com/anthropics/skills/pull/521

- document-typography (PR #514) — cải thiện chất lượng đầu ra văn bản (typography) với tác động lớn cho tài liệu chuyên nghiệp.  
  Link: https://github.com/anthropics/skills/pull/514

- masonry-generate-image-and-videos (PR #335) — tích hợp media generation, phù hợp xu hướng multimodal.  
  Link: https://github.com/anthropics/skills/pull/335

- ODT creation & parsing (PR #486) — hữu ích cho enterprise/sản xuất tài liệu chuẩn.  
  Link: https://github.com/anthropics/skills/pull/486

Lý do chọn: các PR này giải quyết vấn đề được nhiều Issue/PR phản ánh (memory, ops, quality, integrations, document output) — nên có khả năng được ưu tiên review/merge.

4) Nhận định hệ sinh thái Skills (tóm tắt 1 câu)
Cộng đồng tập trung mạnh vào: tăng độ tin cậy và khả năng vận hành thực tế của Skills (persistent context, công cụ đánh giá/kiểm toán, connectors/integations và sửa lỗi API/UX) để đưa Claude từ prototype sang workflow sản xuất.

Tài nguyên tham khảo (PRs/Issues chính trích dẫn trong báo cáo):  
- PRs: #514, #210, #83, #335, #154, #486, #419, #521 — https://github.com/anthropics/skills/pulls  
- Issues nổi bật: #62, #202, #412, #189, #556, #492 — https://github.com/anthropics/skills/issues

Nếu cần, tôi có thể: (a) ưu tiên phân tích chi tiết một PR/Issue cụ thể, hoặc (b) đề xuất checklist review để đẩy nhanh merge những PR tiềm năng.

---

Bản tin cộng đồng Claude Code — 2026-03-13

1) Điểm nổi bật hôm nay
- Hai vấn đề kỹ thuật lớn đang thu hút chú ý: (1) Subagent/Task tool có thể trả kết quả lớn khiến context parent bị tràn và làm session không phục hồi (Issue #23463), và (2) lỗi CLI trên macOS — Bash tool không trả về output trên macOS 26 (Issue #19663) — cả hai đều gây gián đoạn workflow tự độnghoá. Xem chi tiết dưới đây.
- Hoạt động PR đáng chú ý: PR thêm plugin deny-with-reason (một cơ chế chặn tool calls có lý do giải thích cho Claude) đang mở, cùng với PR tài liệu lớn (CLAUDE.md) vừa được đóng/merge. Links trong phần PR.

2) Phát hành phiên bản
- Không có bản phát hành mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (10 mục, vì sao quan trọng & phản ứng)
- #23463 — Subagent results silently overflow context, causing unrecoverable session crash
  Link: https://github.com/anthropics/claude-code/issues/23463
  Tại sao quan trọng: Làm hỏng hoàn toàn session khi nhiều subagent trả về văn bản lớn — ảnh hưởng trực tiếp đến khả năng scale của agents / Task tool.
  Phản ứng: 9 bình luận; báo động về tính đáng tin cậy của workflows song song/đệ quy.

- #19663 — Claude Code CLI Bug Report: Bash Tool Returns No Output on macOS 26
  Link: https://github.com/anthropics/claude-code/issues/19663
  Tại sao quan trọng: Người dùng macOS (môi trường dev phổ biến) không nhận output từ Bash tool; ảnh hưởng đến debugging và CI địa phương.
  Phản ứng: 18 bình luận, 10 👍 — vấn đề có repro và nhiều người bị ảnh hưởng.

- #16721 — Cannot read properties of undefined (reading 'trim') when resuming session
  Link: https://github.com/anthropics/claude-code/issues/16721
  Tại sao quan trọng: Lỗi crash khi resume session phá vỡ UX của làm việc liên tục; có thể làm mất ngữ cảnh quan trọng.
  Phản ứng: 10 bình luận, 3 👍 — có repro rõ ràng.

- #33464 — Feature Request: Native token compression for CLAUDE.md and instruction files
  Link: https://github.com/anthropics/claude-code/issues/33464
  Tại sao quan trọng: Khi CLAUDE.md và file hướng dẫn ngày càng lớn, chúng tiêu thụ context; native compression có thể tăng hiệu quả sử dụng context window.
  Phản ứng: 8 bình luận — chủ đề kiến trúc dài hạn được cộng đồng quan tâm.

- #32869 — [REGRESSION] Approval transitions into a phase as if the plan has been rejected
  Link: https://github.com/anthropics/claude-code/issues/32869
  Tại sao quan trọng: Hành vi sai về state machine của agent/plan gây rối workflow phê duyệt tự động — tác động đến quy trình review/code generation.
  Phản ứng: 6 bình luận, 5 👍 — được báo là regression nên cần ưu tiên.

- #31082 — Voice mode: "Connection closed: code 1006" on Linux
  Link: https://github.com/anthropics/claude-code/issues/31082
  Tại sao quan trọng: Voice mode không ổn định trên Linux (WebSocket 1006) ảnh hưởng người dùng microphone/voice workflows.
  Phản ứng: 6 bình luận, 9 👍 — nhiều người bị ảnh hưởng.

- #31065 — Voice recording requires the native audio module, which could not be loaded. (Windows)
  Link: https://github.com/anthropics/claude-code/issues/31065
  Tại sao quan trọng: Thiếu native audio module khiến tính năng voice không hoạt động trên Windows; cản trở cross-platform parity.
  Phản ứng: 8 bình luận, 2 👍 — đang tìm nguyên nhân native dependency.

- #28013 — Claude in Chrome: extension permanently disconnects after screenshot/scroll operations
  Link: https://github.com/anthropics/claude-code/issues/28013
  Tại sao quan trọng: Extension mất kết nối trong tác vụ tương tác (screenshot/scroll) — UX Cowork/Browser integrations bị ảnh hưởng.
  Phản ứng: 5 bình luận, 5 👍 — reproducible với macOS/Chrome.

- #20304 — Add `isolated` parameter to Task tool for true context isolation
  Link: https://github.com/anthropics/claude-code/issues/20304
  Tại sao quan trọng: Hiện subagents kế thừa context của parent; nhiều workflow (code review, security audit) cần isolation thực sự để tránh leak reasoning — đề xuất kiến trúc quan trọng.
  Phản ứng: 4 bình luận — feature request mang ý nghĩa bảo mật/độ tin cậy.

- #33391 — CLAUDE.md rules for destructive operations not reliably followed
  Link: https://github.com/anthropics/claude-code/issues/33391
  Tại sao quan trọng: Model không tuân thủ quy tắc nội bộ khi thực hiện thao tác nguy hiểm — rủi ro an toàn thực thi trên repo/infra.
  Phản ứng: 3 bình luận — mô tả hành vi model-level cần khắc phục.

4) Tiến độ PR quan trọng (7 PR có hoạt động trong 24h gần nhất)
- #33809 — feat: add deny-with-reason plugin (OPEN)
  Link: https://github.com/anthropics/claude-code/pull/33809
  Nội dung: Thêm plugin cấu hình rule deny với lý do, gửi lý do đó vào Claude như system message để model hiểu tại sao một tool bị chặn — giúp giảm false positives và cải thiện phản ứng model.

- #30596 — docs: add CLAUDE.md with codebase structure and conventions (CLOSED)
  Link: https://github.com/anthropics/claude-code/pull/30596
  Nội dung: Thêm CLAUDE.md tài liệu toàn repo: cấu trúc, plugin system, định dạng file lệnh/agents/hooks, workflows CI, onboarding dev — tài liệu cốt lõi đã merge/đóng.

- #32890 — fix: Update stale Task tool references to Agent tool in plugin docs (OPEN)
  Link: https://github.com/anthropics/claude-code/pull/32890
  Nội dung: Cập nhật tài liệu (8 file) đổi tên “Task tool” → “Agent tool” để đồng bộ sau rename — giảm nhầm lẫn cho contributor.

- #33710 — Add complete town simulator game with entities, systems, and rendering (OPEN)
  Link: https://github.com/anthropics/claude-code/pull/33710
  Nội dung: Một demo/game lớn (vanilla JS + Canvas) — có thể là ví dụ tích hợp agents hoặc demo plugin; cần review để đảm bảo phù hợp repo.

- #33472 — feat(code-review): pass confirmed=true when posting inline comments (CLOSED)
  Link: https://github.com/anthropics/claude-code/pull/33472
  Nội dung: Sửa để tránh subagents đăng comment thử lên PRs khi gặp lỗi permission — đóng PR khắc phục hành vi gây spam.

- #30636 — Update 25+ stale documentation URLs to new canonical domains (OPEN)
  Link: https://github.com/anthropics/claude-code/pull/30636
  Nội dung: Cập nhật hàng loạt URL tài liệu sang code.claude.com/docs/en/* — cải thiện tính liên kết và tính hợp lệ của docs.

- #16215 — fix(docs): fix broken CONTRIBUTING and LICENSE links in plugin docs (CLOSED)
  Link: https://github.com/anthropics/claude-code/pull/16215
  Nội dung: Sửa link hỏng trong docs plugin; housekeeping giúp contributor onboarding.

Ghi chú: trong 24h có 7 PR được ghi nhận (một số đã đóng/merge), không đủ 10 PR mới.

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Quản lý và tối ưu hóa context window: token compression cho file metadata (CLAUDE.md, rules), metrics hiển thị token usage, tăng effective context hoặc giảm overhead compaction (#33464, #32840, #28984, #33823).
- Isolation cho subagents/Task/Agent tool: chế độ isolated để tránh leak reasoning giữa creator & reviewer; cấu hình worktree/branch naming cho PR rõ nghĩa (#20304, #33744).
- Bộ công cụ voice/đa nền tảng ổn định: giải quyết native audio module, WebSocket voice errors, push-to-talk regressions trên macOS/Linux/Windows (#31065, #31082, #33378).
- Better hooks/environment: đảm bảo biến môi trường hook (ví dụ $CLAUDE_PROJECT_DIR) được set trong hook và tool execution (#33815).
- Improved permission/deny UX: deny-with-reason plugin, đánh dấu allow patterns chính xác cho Bash, tránh spam comments & default Co-Authored-By behavior (#33809, #33595, #33830).
- Observability cho agents: notifications from MCP servers surfaced as chat messages; token/context usage metrics để tối ưu agent planning (#33679, #32840).

6) Điểm đau của nhà phát triển (tóm tắt các vấn đề lặp lại)
- Context tràn & mất trạng thái: subagents trả nhiều dữ liệu, resume session hoặc fork/plan storage sai chỗ dẫn tới mất hoặc lẫn lộn context (#23463, #16721, #23761, #32861).
- Voice & native module fragility: nhiều nền tảng (macOS/Linux/Windows) gặp lỗi voice, WebSocket disconnects hoặc native dependencies không load được (#31065, #31082, #33378).
- Permission/Pattern matching trong Bash tool: phép match cho phép/deny break với ký tự đặc biệt (parentheses, globs), dẫn tới prompts/blocks không mong muốn (#32876, #33595, #33827 closed).
- Inconsistent auth flows for MCP/external servers: MCP Authorization header không được nhận dẫn đến fallback sang OAuth; breaks integrations (#33817).
- UX/dev tooling annoyances: terminal scrollback bị xóa khi compacting, Co-Authored-By mặc định trong git commits, và thiếu metrics để tối ưu context — ảnh hưởng trực tiếp productivity (#32807, #33767, #33830, #32840).
- Docs & naming drift: rename Task→Agent và stale links gây nhầm lẫn cho contributors; tài liệu mới (CLAUDE.md) giúp nhưng vẫn cần cleanup (#32890, #30596, #30636).

Kết luận ngắn
- Ưu tiên kỹ thuật hiện tại: (1) Fix các lỗi tràn context/subagent (phiên bản runtime/compaction logic), (2) Ổn định voice trên Linux/Windows/macOS và (3) sửa các regressions resume/permission trên macOS. Bên cạnh đó, các feature request về token compression và isolation cho subagents nên lên roadmap để cải thiện khả năng scale và an toàn.

Để đọc chi tiết hoặc tham gia thảo luận từng mục, mở các link trong phần tương ứng. Nếu bạn muốn, tôi có thể tạo checklist ưu tiên kỹ thuật cho maintainers dựa trên tác động và lượng users bị ảnh hưởng.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

Bản tin cộng đồng OpenAI Codex — 2026-03-13

1) Điểm nổi bật hôm nay
- Nhiều bản alpha của nhánh rust (v0.115.x) được đẩy trong 24 giờ qua, báo hiệu đợt phát triển nội bộ mạnh trên runtime/CLI. (Repo releases: https://github.com/openai/codex/releases)
- Cộng đồng đang tập trung vào ba chủ đề lớn: (1) biến động hạn mức/usage & tính công bằng cho tài khoản Team/Business; (2) các lỗi liên quan đến “context compaction” khiến model quên ngữ cảnh/mid-task; (3) cải tiến trải nghiệm desktop/TUI và remote development.

2) Phát hành phiên bản
- Các tag alpha rust được phát hành gần đây (24h): rust-v0.115.0-alpha.16, alpha.15, alpha.14, alpha.13, alpha.12, alpha.11, alpha.9, alpha.7 — xem trang Releases để theo dõi changelog/cherry-pick: https://github.com/openai/codex/releases

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #13568 Usage dropping too quickly (CLOSED) — https://github.com/openai/codex/issues/13568  
  Tại sao quan trọng: báo cáo lượng phản hồi lớn (325 bình luận, 87 👍) về hạn mức bị giảm nhanh, ảnh hưởng trực tiếp tới trải nghiệm người dùng và chi phí. Phản ứng: thảo luận rộng về cách tính quota và yêu cầu minh bạch từ đội ngũ.
- #2109 Event Hooks (OPEN) — https://github.com/openai/codex/issues/2109  
  Tại sao quan trọng: yêu cầu tính năng cho phép pattern-matched hooks (pre/post) để tích hợp workflow — có lượng ủng hộ lớn (493 👍). Phản ứng: nhiều đề xuất thiết kế và use-case từ người dùng.
- #10450 Remote Development in Codex Desktop App (OPEN) — https://github.com/openai/codex/issues/10450  
  Tại sao quan trọng: mong muốn hỗ trợ remote dev parity với VS Code; ảnh hưởng trực tiếp adoption của desktop app. Phản ứng: thảo luận chi tiết về UX, SSH/remote worktree.
- #5957 Auto compaction causes GPT-5-Codex to lose the plot (OPEN) — https://github.com/openai/codex/issues/5957  
  Tại sao quan trọng: lỗi làm model “quên” là đang mid-task khi compaction tự động thực hiện; gây gián đoạn luồng làm việc tự động hóa. Phản ứng: nhiều logs debug, đề xuất tạm vô hiệu hóa compaction khi exec/tool-call đang chạy.
- #14331 The GPT-5.3-Codex model does NOT WORK in PAID ACCOUNT (OPEN) — https://github.com/openai/codex/issues/14331  
  Tại sao quan trọng: vấn đề auth/model availability cho tài khoản trả phí — ảnh hưởng UX và niềm tin khách hàng. Phản ứng: báo cáo môi trường/extension, yêu cầu fix gấp.
- #14329 Team/Business accounts systematically excluded from every usage reset (OPEN) — https://github.com/openai/codex/issues/14329  
  Tại sao quan trọng: ảnh hưởng hàng loạt khách hàng tổ chức; khiếm khuyết trong cơ chế reset usage. Phản ứng: nhiều bình luận, yêu cầu can thiệp từ support/engineering.
- #14486 Codex re-answered earlier prompt when given a new prompt (OPEN) — https://github.com/openai/codex/issues/14486  
  Tại sao quan trọng: regression tương quan với session state; dẫn đến mất time và đầu ra sai. Phản ứng: logs và repro steps được cung cấp, cần reproduce server-side.
- #14346 Context Compaction Hanging (OPEN) — https://github.com/openai/codex/issues/14346  
  Tại sao quan trọng: compaction treo kéo dài; làm chậm/khóa trải nghiệm trên 5.4/xhigh. Phản ứng: nhiều người report tương tự; priority cao.
- #14474 Linux arm64: musl binary segfaults (OPEN) — https://github.com/openai/codex/issues/14474  
  Tại sao quan trọng: segfault trên bundled musl arm64 khiến dev trên ARM (Raspberry/embedded) không thể chạy CLI. Phản ứng: furnish core dumps, urgent build-fix cần thiết.
- #14345 Directories not trusted by default even with bypass option (OPEN) — https://github.com/openai/codex/issues/14345  
  Tại sao quan trọng: phá vỡ workflow sandbox/approvals khi thất kỳ flag `--dangerously-bypass-approvals-and-sandbox` không hành xử như mong đợi. Phản ứng: báo cáo regression, tác động tới dev power-users.

4) Tiến độ PR quan trọng (10 PR cần theo dõi)
- #14531 Add plugin usage telemetry — https://github.com/openai/codex/pull/14531  
  Nội dung: thêm metrics plugin-used/installed/enabled để hiểu adoption plugin.
- #14511 code_mode: Move exec params to @pragma — https://github.com/openai/codex/pull/14511  
  Nội dung: di chuyển exec session settings vào pragma hàng đầu trong code, giúp model điều khiển exec behavior rõ ràng hơn.
- #14481 refactor(core): move auth into codex-auth — https://github.com/openai/codex/pull/14481  
  Nội dung: tách auth khỏi codex-core để giảm chi phí build và cô lập logic auth.
- #14512 Start TUI on embedded app server — https://github.com/openai/codex/pull/14512  
  Nội dung: di chuyển TUI lên in-process app server (bước trung gian), tiền đề cho thống nhất server/client.
- #14541 clarify plugin + app copy in model instructions — https://github.com/openai/codex/pull/14541  
  Nội dung: làm rõ cách mô tả plugin/app trong hướng dẫn model, cải thiện sanitization.
- #14514 fix: reopen writable linux carveouts under denied parents (CLOSED) — https://github.com/openai/codex/pull/14514  
  Nội dung: sửa tương tác mount mask trên Linux để giữ tính tương thích bubblewrap cho nested writable paths.
- #14430 emittance (telemetry) — https://github.com/openai/codex/pull/14430  
  Nội dung: metadata emission cho user message types và wiring cho ResponseItem — mở đường cho phân tích hành vi.
- #14529 Simplify permissions in request_permissions tool — https://github.com/openai/codex/pull/14529  
  Nội dung: hạn chế scope permissions tool chỉ còn filesystem/network, đơn giản hoá surface area.
- #14537 Add realtime v2 event parser (feature-flagged) — https://github.com/openai/codex/pull/14537  
  Nội dung: parser v2 trên pipeline websocket để hỗ trợ handoff event mới.
- #14245 app-server: add v2 filesystem APIs — https://github.com/openai/codex/pull/14245  
  Nội dung: thêm protocol-level v2 fs API (read/write/metadata/subscribe) — giảm phụ thuộc vào host helpers, bước quan trọng cho app-server progress.

5) Xu hướng yêu cầu tính năng
- Event hooks / scripting pre/post turn (Issue #2109) — nhiều người muốn pattern-driven automation.
- Remote development và tích hợp worktree/SSH trong Codex Desktop (Issue #10450, #13762).
- TUI nâng cao: /archive, /btw side-questions, reasoning-depth hotkeys, re-render scrollback (Issues #14076, #14506, #14356, #5259).
- Better auth flows (device-code) và xử lý callback localhost trên Windows/WSL (Issue #12263).
- Plugin/telemetry: plugin usage metrics và làm rõ plugin-to-model instruction copy (PRs #14531, #14541).
- Fine-grained permission controls cho skills/plugins (PR #14522, #14529).
- Multi-agent control: typed outputs, splitting handlers, more stable multiagent runs (PRs #14536 closed, #14535).

6) Điểm đau của nhà phát triển (tổng hợp)
- Quota / rate-limit & usage resets: nhiều báo cáo (bao gồm Team/Business) gây lo ngại về fairness và billing; cần minh bạch và fix nhanh (Issues #13568, #14329, #14349).  
- Context compaction / memory: compaction tắt/ngắt quãng hoặc gây “forgetting”/treo khi model đang thực thi — ảnh hưởng task automation (Issues #5957, #14346, #14342).  
- Authentication/authorization: model availability cho tài khoản trả phí, device-code OAuth và extension sign-in failures (Issues #14331, #5673, #12263).  
- Sandboxing & permissions: inconsistencies giữa flags và actual trust/sandbox behavior, cùng với phức tạp cho nested filesystem policies trên Windows/Linux (Issues #14345, PR #14514).  
- Platform-specific bugs: Windows CreateProcessAsUserW errors, mixed line endings, Apple Silicon vs Intel installer, arm64 musl segfaults (Issues #13965, #4003, #12941, #14474).  
- Tool/execution stability: long-running tool calls hanging (dotnet build), aggressive parallel tool calls, multiagent failures after time (Issues #5946, #14485, #14458).  
- Dev UX requests: more control over model depth, ephemeral threads, archived sessions, and remote dev parity (Issues/PRs referenced above).

Kết luận ngắn: trong 48–72 giờ tới nên ưu tiên: (1) điều tra & ổn định các vụ liên quan đến compaction/quota/auth cho enterprise; (2) tiếp tục hoàn thiện app-server v2 FS + TUI chuyển đổi; (3) rolling fixes cho platform-specific builds (arm64 musl, Windows). Theo dõi PR/issue links để cập nhật chi tiết.

Liên kết nhanh:
- Repo Releases: https://github.com/openai/codex/releases
- Issues & PRs được nhắc trong bản tin đều kèm link ngay trong từng mục.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

1) Điểm nổi bật hôm nay
- Phát hành nightly v0.35.0-nightly.20260313 với vài sửa nhanh về tài liệu/themes và refactor nội bộ đổi khóa 'return' → 'enter' (xem phần Phát hành).  
- Cộng đồng tiếp tục tập trung vào ổn định trải nghiệm tương tác: session continuity, xử lý subagents, và nhiều sửa UI/scrolling/terminal compatibility được thảo luận hoặc đang PR.  

2) Phát hành phiên bản
- v0.35.0-nightly.20260313.bb060d7a9 — Release nightly hôm 2026-03-13. Nội dung chính từ changelog: cập nhật ảnh chụp màn hình theme và thêm theme thiếu (fix docs) (PR liên quan: #20689); refactor đổi tên khóa 'return' thành 'enter' nội bộ (PR #21796). Link release/PR: https://github.com/google-gemini/gemini-cli/pull/22251  
- Các phiên bản preview/patch gần đây: v0.34.0-preview.2 (cherry-pick patch) và v0.34.0-preview.1 / v0.33.1 (patch releases tạo bằng cherry‑pick). Thông tin chi tiết trong lịch sử release trên repo.

3) Issues nóng trong cộng đồng (10 mục, vì sao quan trọng + phản ứng)
- #20017 OAuth authentication fails: Protected resource origin does not match exact connection URL path  
  Tại sao quan trọng: Ảnh hưởng trực tiếp tới người dùng cấu hình MCP/OAuth tuỳ chỉnh — chặn flow xác thực.  
  Phản ứng: 6 bình luận, đang cần triage. Link: https://github.com/google-gemini/gemini-cli/issues/20017

- #21925 Gemini CLI shows the hand icon indicating that Action is required even when it is not required  
  Tại sao quan trọng: Thông báo sai dẫn đến nhầm lẫn UX (CLI báo chờ input khi thực tế không cần).  
  Phản ứng: 5 bình luận; ảnh chụp minh hoạ lỗi. Link: https://github.com/google-gemini/gemini-cli/issues/21925

- #22215 Fix UI snapping to top of plan while reading plans  
  Tại sao quan trọng: Ảnh hưởng trải nghiệm đọc plan (Plan Mode) — cản trở review nội dung dài.  
  Phản ứng: 3 bình luận, đang triage. Link: https://github.com/google-gemini/gemini-cli/issues/22215

- #22028 CLI scrolls to the top whenever clicked on  
  Tại sao quan trọng: Gây gián đoạn khi dùng trong IDE (ví dụ VS Code) — nghiêm trọng cho workflow tương tác.  
  Phản ứng: 2 bình luận, có ảnh lỗi. Link: https://github.com/google-gemini/gemini-cli/issues/22028

- #21792 Epic: Improving Session Continuity and Coherence in Gemini CLI  
  Tại sao quan trọng: Epic tập trung vào vấn đề cốt lõi — giảm suy thoái ngữ cảnh trong phiên dài, ảnh hưởng đến độ tin cậy agent.  
  Phản ứng: 2 bình luận; nhiều issue nhỏ liên quan được gắn vào epic. Link: https://github.com/google-gemini/gemini-cli/issues/21792

- #21461 Gemini CLI Shell Command does not support aliases  
  Tại sao quan trọng: Thiếu hỗ trợ alias khiến shell tool không thuận tiện cho devs (breaks expected shell behavior).  
  Phản ứng: 2 bình luận; đề xuất thay đổi cách chạy shell để giữ alias. Link: https://github.com/google-gemini/gemini-cli/issues/21461

- #21982 Bug: run_shell_command fails with 'Cannot read properties of undefined (reading "publish")'  
  Tại sao quan trọng: Gây crash khi chạy lệnh git qua tool — ảnh hưởng trực tiếp tính ổn định công việc dev.  
  Phản ứng: 1 bình luận; đang triage. Link: https://github.com/google-gemini/gemini-cli/issues/21982

- #21901 [Subagents] Add mechanism for isolating the tools of subagents from the main agent  
  Tại sao quan trọng: Thiếu isolation gây rủi ro an toàn/logic (subagent can affect main agent tools/state).  
  Phản ứng: 1 bình luận; yêu cầu thiết kế/hệ thống. Link: https://github.com/google-gemini/gemini-cli/issues/21901

- #21688 TUI: Sub-agent thought messages are always concatenated without spaces  
  Tại sao quan trọng: Real‑time progress trở nên khó đọc — tổn hại UX khi theo dõi subagents.  
  Phản ứng: 1 bình luận; dễ repro. Link: https://github.com/google-gemini/gemini-cli/issues/21688

- #22176 Bug Report: CJK (Korean) Input Issue and Missing Multiline Support in Windows Terminal  
  Tại sao quan trọng: Nhập liệu CJK trên Windows bị lỗi — ảnh hưởng lớn tới người dùng tiếng Hàn/Trung/Nhật.  
  Phản ứng: mới tạo, chưa comment nhiều nhưng là blocker cho Windows users. Link: https://github.com/google-gemini/gemini-cli/issues/22176

4) Tiến độ PR quan trọng (10 PR, mô tả ngắn)
- #22211 fix(core): add actionable warnings for terminal fallbacks  
  Nội dung: Thêm cảnh báo tương thích terminal (tmux/screen/dumb) có hướng xử lý cụ thể thay vì tắt chức năng. Link: https://github.com/google-gemini/gemini-cli/pull/22211

- #22255 (CLOSED) fix(core): explicitly pass messageBus to policy engine for MCP tool saves  
  Nội dung: Sửa lỗi gây crash "Cannot read properties of undefined (reading 'publish')" khi lưu ủy quyền MCP; fix quan trọng cho tool authorization. Link: https://github.com/google-gemini/gemini-cli/pull/22255

- #22252 fix(cli): resolve subagent grouping and UI state persistence  
  Nội dung: Cải thiện UX/ổn định khi render subagents, batch tool calls để tránh tearing, và sửa typing. Link: https://github.com/google-gemini/gemini-cli/pull/22252

- #22175 fix(core): ensure AgentLoopContext getters are preserved in updatePolicy  
  Nội dung: Sửa regression liên quan đến "Always Allow" và crash liên quan đến context getters; cải thiện tính bền vững policy engine. Link: https://github.com/google-gemini/gemini-cli/pull/22175

- #22115 feat(core): Fully migrate packages/core to AgentLoopContext  
  Nội dung: Chuỗi PR nhằm chuyển toàn bộ core sang AgentLoopContext — nền tảng cho nhiều sửa ổn định agent. Link: https://github.com/google-gemini/gemini-cli/pull/22115

- #21865 fix(settings): prevent j/k navigation keys from intercepting edit buffer input  
  Nội dung: Sửa xung đột phím (vim-style j/k) trong chỗ nhập chuỗi trong Settings, tránh mất ký tự khi gõ. Link: https://github.com/google-gemini/gemini-cli/pull/21865

- #22254 ACP integration documents  
  Nội dung: Tài liệu tích hợp ACP (IDE integration) và cập nhật docs hướng dẫn dùng ACP mode trong Gemini CLI — hữu ích cho người dùng IDE. Link: https://github.com/google-gemini/gemini-cli/pull/22254

- #22082 feat(core): instrument file system tools for JIT context discovery  
  Nội dung: Instrument các file-system tools để tự động load GEMINI.md dọc path khi agent truy cập — cải thiện JIT context discovery. Link: https://github.com/google-gemini/gemini-cli/pull/22082

- #22060 feat(tracker): return TodoList display for tracker tools  
  Nội dung: Trả về cấu trúc TodoList từ tracker tools để UI hiển thị trạng thái tasks native thay vì raw text. Link: https://github.com/google-gemini/gemini-cli/pull/22060

- #22230 fix: Adjust ToolGroupMessage filtering to hide Confirming and show Canceled tool calls  
  Nội dung: Sửa hiển thị tool outputs trùng lặp; giữ các tool bị Cancel visible và ẩn Confirming khi cần — sửa lỗi UI lịch sử. Link: https://github.com/google-gemini/gemini-cli/pull/22230

5) Xu hướng yêu cầu tính năng (tóm tắt các hướng cộng đồng quan tâm)
- Session continuity & coherence: tăng cường checkpoint, compression thông minh, auto‑distillation để giữ bối cảnh trong phiên dài (epic #21792, #21887, #21890, #21892).  
- Subagent isolation & UX: tách công cụ của subagents khỏi main agent và cải thiện hiển thị/nhóm tool (issues #21901, PR #22252).  
- Terminal/IDE compatibility: giảm flicker/scrolling, cảnh báo cấu hình terminal, hỗ trợ 256-colors và Windows CJK (issues #22028, #21924, PR #22211).  
- Shell/tool execution fidelity: hỗ trợ alias, sửa lỗi run_shell_command liên quan git và publish, bảo đảm hành vi shell tương tự môi trường dev (issues #21461, #21982).  
- Plan Mode & ACP: xử lý Plan Mode trong non-interactive/ACP (issue #22191) và tài liệu ACP (PR #22254).  
- Security hardening for web_fetch & OAuth: SSRF/DNS rebinding hardening và OAuth origin matching (issues #20017, PR #22217).  
- JIT memory & file-context discovery: JIT memory loading và tự động load GEMINI.md khi agent điều hướng file system (issues #22057, PR #22082).

6) Điểm đau của nhà phát triển (vấn đề lặp lại / ưu tiên giải quyết)
- Crash khi lưu/MCP tool authorization ("publish" undefined): gây mất ổn định workflows khi chọn "Always Allow" — đã có PR sửa (#22255, #22175). Refs: https://github.com/google-gemini/gemini-cli/issues/21982 / https://github.com/google-gemini/gemini-cli/pull/22255  
- UI scroll / snap / click-to-top trong terminal/IDE: làm gián đoạn tương tác, nhiều report trên VS Code (issues #22028, #22215). Links: https://github.com/google-gemini/gemini-cli/issues/22028, https://github.com/google-gemini/gemini-cli/issues/22215  
- Keybinding và input conflicts (j/k intercept, CJK on Windows): làm giảm khả năng nhập liệu — cần fix phím và IME handling (PR #21865, issue #22176). Links: https://github.com/google-gemini/gemini-cli/pull/21865, https://github.com/google-gemini/gemini-cli/issues/22176  
- Context loss & compression behavior: agents bị "mất ngữ cảnh" trên phiên dài; community yêu cầu cải thiện compression threshold, guided compression và auto‑distillation (issues #21888, #21892, #21889). Links: https://github.com/google-gemini/gemini-cli/issues/21888  
- Subagent message formatting & isolation: concatenated thought messages, không có tool isolation — ảnh hưởng readability và an toàn (issues #21688, #21901). Links: https://github.com/google-gemini/gemini-cli/issues/21688, https://github.com/google-gemini/gemini-cli/issues/21901  
- Shell behavior differences (aliases, environment): thiếu alias support và cách chạy shell hiện tại phá vỡ kỳ vọng Dev UX (issue #21461). Link: https://github.com/google-gemini/gemini-cli/issues/21461  
- Plan Mode & ACP file access: Plan Mode kẹt do không tìm được nơi ghi file trong ACP/non-interactive (issue #22191). Link: https://github.com/google-gemini/gemini-cli/issues/22191

Kết luận ngắn: phiên bản nightly hôm nay chứa vài sửa tài liệu và refactor nhỏ; trọng tâm cộng đồng hiện tại là ổn định trải nghiệm tương tác (session continuity, subagents, UI scrolling), xử lý các crash liên quan đến tool authorizations, và hoàn thiện tính năng cho môi trường tích hợp (ACP/IDE). Đề xuất: ưu tiên fixes cho crash/publish, cải thiện input/terminal compatibility, và tiếp tục các PR migration sang AgentLoopContext để giảm regressions.

Tài nguyên nhanh (một số link đã dẫn ở trên):
- Repo: https://github.com/google-gemini/gemini-cli  
- Issue/vấn đề nổi bật: xem #20017, #21925, #22215, #22028, #21792, #21461, #21982, #21901, #21688, #22176  
- PR quan trọng: #22211, #22255, #22252, #22175, #22115, #21865, #22254, #22082, #22060, #22230

Nếu bạn muốn, mình có thể tạo checklist đề xuất ưu tiên cho maintainers (ví dụ: hotfixes, medium-term refactors, docs/tasks) để giúp phân bổ lực lượng phát triển.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

Bản tin cộng đồng GitHub Copilot CLI — 2026-03-13

1) Điểm nổi bật hôm nay
- Phát hành nội bộ mới: v1.0.5-0 được đẩy lên (xem phần Phát hành), bổ sung /version trong phiên tương tác, hỗ trợ highlight trong /diff và thử nghiệm retrieval embedding cho MCP/skills.  
- Vấn đề về trải nghiệm terminal (flicker/scroll, tmux, VSCode) và quản lý ngữ cảnh dài (auto-compact / CAPI 400) tiếp tục là các điểm nóng trong cộng đồng; nhiều issue quan trọng đang được thảo luận và phân loại.  

2) Phát hành phiên bản
- v1.0.5-0 — (mới trong 24 giờ)
  - Added: /version command để hiển thị phiên bản CLI và kiểm tra cập nhật trong phiên tương tác.  
  - Added: experimental embedding-based dynamic retrieval of MCP and skill instructions per turn (thử nghiệm retrieval embedding cho MCP/skill).  
  - Added: Syntax highlighting trong /diff với hỗ trợ 17 ngôn ngữ lập trình.  
  - Added: preCompact hook to run comm (ghi chú: mô tả nguồn bị cắt ngắn trong dữ liệu).  
  - Link: https://github.com/github/copilot-cli/releases (xem release tương ứng)

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #53 Bring back the GitHub Copilot in the CLI commands to not break workflows — Tại sao quan trọng: nhiều người phản ánh thiếu tính năng/command truyền thống khiến workflow bị phá vỡ; cộng đồng bắt đầu fork/giải pháp thay thế. Phản hồi: 30 bình luận, 72 👍. Link: https://github.com/github/copilot-cli/issues/53
- #1048 Allow reasoning effort to be set through the CLI (CLOSED) — Tại sao quan trọng: người dùng muốn điều khiển mức "reasoning effort" khi gọi model từ CLI (không chỉ interactive). Đã có thảo luận/đóng issue với 9 bình luận, 30 👍; cho thấy nhu cầu cấu hình model sâu hơn. Link: https://github.com/github/copilot-cli/issues/1048
- #1599 UI Bug: Copilot CLI output flickers/stutters constantly during text stream response — Tại sao quan trọng: trải nghiệm đọc thời gian thực bị ảnh hưởng, giảm khả năng sử dụng trong terminal; nhiều báo cáo tương tự (terminal flicker là chủ đề lặp lại). Link: https://github.com/github/copilot-cli/issues/1599
- #254 copilot-cli keeps asking to login again — Tại sao quan trọng: lỗi xác thực/phiên làm việc gây gián đoạn, đặc biệt với tài khoản GitHub Business; ảnh hưởng tới UX cơ bản. Link: https://github.com/github/copilot-cli/issues/254
- #768 Option to disable MCP Servers per default — Tại sao quan trọng: tiết kiệm token / chi phí và tránh gọi MCP không cần thiết; nhiều người muốn tắt mặc định. Phản hồi: 4 bình luận, 22 👍. Link: https://github.com/github/copilot-cli/issues/768
- #892 Add sandbox mode to restrict Copilot CLI file access to a specified working directory — Tại sao quan trọng: an toàn/độ tin cậy khi agent thao tác filesystem; yêu cầu cao về security/sandboxing cho code agent. Link: https://github.com/github/copilot-cli/issues/892
- #1095 Support for BYOK to add models into COPILOT CLI Through API Keys — Tại sao quan trọng: nhu cầu dùng BYOK để thêm model bên thứ ba (ví dụ Grok) với cửa sổ context lớn; liên quan tới khả năng mở rộng và tích hợp model. Link: https://github.com/github/copilot-cli/issues/1095
- #1723 /ide fails in VS Code - No active IDE workspaces found. — Tại sao quan trọng: tích hợp IDE là tính năng cốt lõi; lỗi này phá vỡ trải nghiệm /ide trong VS Code (Apple Silicon report). Link: https://github.com/github/copilot-cli/issues/1723
- #1842 Scrolling does not work with Tmux — Tại sao quan trọng: người dùng terminal phổ biến (tmux) không thể đọc trả lời dài; ảnh hưởng tới khả năng sử dụng ở quy mô. Link: https://github.com/github/copilot-cli/issues/1842
- #2008 Feature Request: Auto-compact to prevent CAPIError 400 before the error not after. — Tại sao quan trọng: ngăn mất work-in-progress khi context vượt quá giới hạn API; yêu cầu giải pháp tự động compact trước khi lỗi xảy ra. Link: https://github.com/github/copilot-cli/issues/2008

4) Tiến độ PR quan trọng (cập nhật trong 24 giờ qua)
- #2004 Alter PATH for login shells, not interactive shells (CLOSED) — Mô tả: sửa hướng dẫn cài đặt để chỉ thay đổi PATH cho login shells, tránh sửa .bashrc cho interactive shells (giải quyết issue #2001). Tác giả: @tpope. Link: https://github.com/github/copilot-cli/pull/2004
- Lưu ý: trong vòng 24 giờ được cung cấp chỉ có PR #2004 được cập nhật/đóng; không có thêm PR khác được liệt kê trong nguồn dữ liệu.

5) Xu hướng yêu cầu tính năng (từ các Issues)
- Kiểm soát chi tiết model / runtime: set default model, reasoning-effort qua CLI, BYOK để thêm model. (ví dụ #1048, #2006, #1095)  
- Quản lý ngữ cảnh và độ dài session: auto-compact trước khi gây CAPI 400, preCompact hooks và cơ chế compact/trim. (ví dụ #2008, liên quan đến release preCompact hook)  
- Bảo mật & giới hạn file access: sandbox mode để giới hạn agent chỉ trong thư mục làm việc. (ví dụ #892)  
- Hiệu năng trải nghiệm terminal/IDE: fix flicker/scroll/scroll-jump, tmux và VS Code embedded terminal stability. (ví dụ #1599, #1811, #1842)  
- Tùy chỉnh MCP/skill behavior: option tắt MCP server mặc định, dynamic retrieval embeddings cho MCP/skills (mới thử nghiệm trong release). (ví dụ #768 và release v1.0.5-0)  
- Giao diện người dùng nhập liệu: paste ảnh từ clipboard, xử lý phím đặc thù (German keyboard @), right-click paste target. (ví dụ #1276, #1999, #1989)  
- Multi-repo & workflow integration: hỗ trợ multi-repo workspaces, chia sẻ cấu hình giữa IDE và CLI. (ví dụ #2011, #1978)  
- Plugin & extensibility: load plugin.json ở nhiều vị trí mong đợi, ổn định flag --plugin-dir. (ví dụ #2010)

6) Điểm đau của nhà phát triển (tóm tắt các vấn đề thường gặp)
- Trải nghiệm terminal không ổn định: flicker/stutter khi streaming, scroll jump trong tmux và embedded terminals (VS Code/Visual Studio) — gây khó đọc và crash trong một số trường hợp. (xem #1599, #1811, #1842)  
- Quản lý ngữ cảnh dài gây lỗi API (CAPI 400) và mất nội dung khi turn bị kill — cần cơ chế auto-compact chủ động và hook trước khi compact. (xem #2008, release preCompact hook)  
- Phiên & xác thực không bền: copilot yêu cầu login lại không mong muốn gây gián đoạn; session file corrupt do ký tự Unicode (U+2028/U+2029) phá vỡ JSON.parse. (xem #254, #2012)  
- Tùy biến model/chi phí: yêu cầu BYOK, set default model, tắt MCP để tiết kiệm token; cần config dễ tiếp cận. (xem #1095, #2006, #768)  
- Tính mở rộng và tích hợp IDE/plugin: /ide gặp lỗi, plugin dir không load đúng cấu trúc, multi-repo friction — ảnh hưởng trải nghiệm dev day-to-day. (xem #1723, #2010, #2011)  
- Vấn đề nhập liệu & i18n: bàn phím layout (ví dụ German @), paste targets, hỗ trợ dán ảnh — làm giảm tính khả dụng cho người dùng quốc tế. (xem #1999, #1989, #1276)  

Kết luận nhanh
- Phiên bản v1.0.5-0 mang vài cải tiến quan trọng (version command, syntax highlight, thử nghiệm retrieval embeddings) nhưng nhiều vấn đề UX/ops (terminal flicker, session stability, context management) vẫn là ưu tiên hàng đầu của cộng đồng. Nếu bạn đang gặp các lỗi nêu trên, hãy tham gia comment trực tiếp vào issue tương ứng và share reproducible logs/steps để giúp đội phát triển ưu tiên xử lý.  

Tài nguyên nhanh
- Repo chính: https://github.com/github/copilot-cli  
- Issue highlights: xem từng liên kết trong phần "Issues nóng" ở trên.  

Nếu bạn muốn, tôi có thể chuyển những issue có nhiều lượt 👍 thành template báo cáo lỗi chuẩn (steps/logs) để tăng khả năng fix nhanh hơn.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

Bản tin cộng đồng Kimi Code CLI — 2026-03-13

1) Điểm nổi bật hôm nay
- Phiên bản 1.21.0 vừa được phát hành, gồm nhiều cải tiến UX/đáng chú ý: xác thực API key trong setup, input “steer” khi agent đang chạy, và cải thiện tương tác web/vis. (Xem PR cập nhật và changelog liên quan.)
- Nhiều PR sửa lỗi liên quan tới header HTTP (whitespace/newline/ký tự không an toàn) và ổn định WebSocket đã được đóng/mở — phản ánh vấn đề thực tế gây kết nối lỗi cho người dùng Linux/Ubuntu.

2) Phát hành phiên bản
- 1.21.0 (đã đẩy changelog) — tóm tắt chính:
  - Setup: xác thực API key khi cấu hình nền tảng, hiển thị spinner và tóm tắt thiết lập (PR #1415). https://github.com/MoonshotAI/kimi-cli/pull/1415
  - Shell: cho phép “steer” input trong khi agent đang chạy, lưu lại làm message tiếp theo và emit sự kiện SteerInput (PR #1422). https://github.com/MoonshotAI/kimi-cli/pull/1422
  - Vis: thêm thao tác Open Dir / Copy DIR và hỗ trợ Windows cho “open-in” (PR #1416). https://github.com/MoonshotAI/kimi-cli/pull/1416
  - Persist system prompt vào context.jsonl để frontend/vis có thể đọc nguyên bối cảnh (PR #1417). https://github.com/MoonshotAI/kimi-cli/pull/1417
  - (Phiên bản được bump trong PR #1425.) https://github.com/MoonshotAI/kimi-cli/pull/1425

3) Issues nóng trong cộng đồng (cập nhật 24h — tổng 7 mục)
Lưu ý: trong 24 giờ có 7 issue được cập nhật/mở; danh sách dưới đây sắp xếp theo mức độ ảnh hưởng/quan tâm.

- #1383 — 为什么说的会员权益是支持多agent但是我两个小龙虾同时思考就会出现限制 (OPEN) — Tác giả: @asecret. Tại sao giới hạn xảy ra khi chạy nhiều agent đồng thời; liên quan đến giới hạn API rate/ghi chú nền tảng. Quan trọng vì ảnh hưởng tới use-case đa-agent. (Tạo 2026-03-10, cập nhật 2026-03-12, 5 bình luận) https://github.com/MoonshotAI/kimi-cli/issues/1383

- #1227 — LLM provider error: Connection error. (CLOSED) — Tác giả: @pi-null-mezon. Báo lỗi kết nối với provider (khi dùng kimi-for-coding); có phản hồi và fix liên quan header/whitespace. Quan trọng vì hay gặp trên Linux. (2026-02-24 → 2026-03-12) https://github.com/MoonshotAI/kimi-cli/issues/1227

- #1413 — 终端的AskUserQuestion工具无法在最后一个选项中输入内容 (CLOSED) — Tác giả: @cnzys. Bug tương tác AskUserQuestion trong terminal; đã có reproduce và fix. Quan trọng cho UX interactive agent. (2026-03-12) https://github.com/MoonshotAI/kimi-cli/issues/1413

- #1426 — 1.21.0版本中，cli输入区键入的内容会在agent输出结束后消失 (OPEN) — Tác giả: @Wolido. Mô tả: khi agent đang output có thể gõ trong input; nhưng khi output kết thúc thì nội dung đang gõ biến mất. Ảnh hưởng trải nghiệm “steer in-turn”; cần fix để không mất dữ liệu người dùng. (2026-03-13) https://github.com/MoonshotAI/kimi-cli/issues/1426

- #1420 — web未能渲染行内公式 (OPEN) — Tác giả: @yuantianyu177. Web UI không render công thức inline; liên quan hiển thị Markdown/math rendering trong web mode. Ảnh hưởng trải nghiệm tài liệu/đầu ra. (2026-03-12) https://github.com/MoonshotAI/kimi-cli/issues/1420

- #1412 — Add support for logging in with kimi-code API key (CLOSED, enhancement) — Tác giả: @AlizeCamlost. Yêu cầu hỗ trợ login bằng kimi-code API key; đã được khắc phục/đánh dấu. Quan trọng cho luồng auth của người dùng Kimi Code. (2026-03-12) https://github.com/MoonshotAI/kimi-cli/issues/1412

- #1414 — 在弹框询问用户获取操作权限的时候能否加一个直接切换成yolo模式的选项 (OPEN, enhancement) — Tác giả: @ZDGggg817. Yêu cầu: khi hỏi quyền thao tác, thêm nút chuyển thẳng sang “yolo mode” (không hỏi thêm). Liên quan tới trải nghiệm cấp quyền agent. (2026-03-12) https://github.com/MoonshotAI/kimi-cli/issues/1414

Tổng kết phản ứng cộng đồng: nhiều issue liên quan đến UX interactive (AskUserQuestion, in-turn steer, input mất khi agent kết thúc), và connectivity/header issues đã được nhanh chóng gắn PR fix. Một số enhancement (login bằng kimi-code API key, yolo-mode) nhận được sự chú ý.

4) Tiến độ PR quan trọng (chọn 10 PR nổi bật)
- #1131 — feat: add AgentHooks support for dogfooding (OPEN) — @IndenScale. Thêm hệ thống AgentHooks (discovery/parser/executor/manager) và hooks built-in như chặn lệnh shell nguy hiểm, enforce-tests. Quan trọng cho policy/security khi chạy agent. https://github.com/MoonshotAI/kimi-cli/pull/1131

- #1424 — feat(tests): add end-to-end tests for shell PTY and session management (OPEN) — @RealKai42. Thêm e2e tests cho PTY shell và quản lý session — giúp phát hiện regressions về input/output và session restore. https://github.com/MoonshotAI/kimi-cli/pull/1424

- #884 — chore(deps-dev): bump ruff from 0.14.14 to 0.15.0 (OPEN, dependabot) — Cập nhật công cụ lint ruff; ảnh hưởng CI/coding style. https://github.com/MoonshotAI/kimi-cli/pull/884

- #1425 — chore: bump kimi-cli and kimi-code to 1.21.0 (CLOSED) — @RealKai42. Bump phiên bản và đồng bộ changelog/release notes; chuẩn bị phát hành 1.21.0. https://github.com/MoonshotAI/kimi-cli/pull/1425

- #1422 — feat(shell): support steering running agent turns (CLOSED) — @RealKai42. Thêm input “steer” khi agent đang chạy; lưu input như follow-up message và phát event SteerInput. Cải thiện UX tương tác thời gian thực. https://github.com/MoonshotAI/kimi-cli/pull/1422

- #1421 — fix(tools): treat dismissed questions as errors instead of proceeding (OPEN) — @howardpen9. Khi user dismiss prompt/AskUserQuestion, LLM sẽ dừng và chờ thay vì ngầm tiếp tục. Sửa logic trả về is_error cho dialogs. Quan trọng cho an toàn/độ tin cậy hành vi agent. https://github.com/MoonshotAI/kimi-cli/pull/1421

- #1419 — fix(web): stabilize WebSocket connect to prevent reconnection storms (OPEN) — @howardpen9. Sửa reconnect storm trong web mode do callback capture; giảm vòng lặp reconnect. Quan trọng để tránh refresh/luồng reconnect liên tục. https://github.com/MoonshotAI/kimi-cli/pull/1419

- #1416 — feat(vis): add session dir actions and Windows open-in support (CLOSED) — @RealKai42. Thêm Open Dir/Copy DIR, expose session_dir API và mở rộng open-in cho Windows. Tốt cho cross-platform workflows. https://github.com/MoonshotAI/kimi-cli/pull/1416

- #1415 — feat(setup): enhance platform setup with API key verification and imp… (CLOSED) — @RealKai42. Nâng cấp flow setup: kiểm tra key, gợi ý khi 401 vì chọn sai nền tảng, spinner, và tóm tắt. Giảm friction cho người mới. https://github.com/MoonshotAI/kimi-cli/pull/1415

- #1417 — feat(context): persist system prompt in context.jsonl (CLOSED) — @RealKai42. Ghi hệ thống prompt làm bản ghi _system_prompt đầu tiên trong context.jsonl, dùng khi restore session thay vì regenerate. Quan trọng cho tính nhất quán bối cảnh/restore. https://github.com/MoonshotAI/kimi-cli/pull/1417

5) Xu hướng yêu cầu tính năng (từ issues & PRs)
- Hỗ trợ multi-agent/đồng thời mà không chạm giới hạn API (rate limit / session isolation). (Issue #1383) https://github.com/MoonshotAI/kimi-cli/issues/1383
- Đăng nhập bằng kimi-code API key / làm rõ UX auth giữa các nền tảng. (Issue #1412, PR #1415) https://github.com/MoonshotAI/kimi-cli/issues/1412 https://github.com/MoonshotAI/kimi-cli/pull/1415
- Thêm chế độ “yolo” nhanh khi hỏi quyền thao tác (một nút chuyển đổi trong dialog). (Issue #1414) https://github.com/MoonshotAI/kimi-cli/issues/1414
- Tương tác thời gian thực: steer input khi agent đang chạy, và tránh mất nội dung input khi agent kết thúc. (PR #1422; Issue #1426) https://github.com/MoonshotAI/kimi-cli/pull/1422 https://github.com/MoonshotAI/kimi-cli/issues/1426
- Quản lý session & xuất/visualization: hành động Open Dir/Copy và persist system prompt để frontend đọc. (PR #1416, #1417) https://github.com/MoonshotAI/kimi-cli/pull/1416 https://github.com/MoonshotAI/kimi-cli/pull/1417
- Test coverage cho PTY/shell để giảm regressions trong tương tác terminal. (PR #1424) https://github.com/MoonshotAI/kimi-cli/pull/1424
- Hooks và policy (AgentHooks) để giới hạn/kiểm soát hành vi agent (security/quality gates). (PR #1131) https://github.com/MoonshotAI/kimi-cli/pull/1131

6) Điểm đau của nhà phát triển (tổng hợp)
- Kết nối/Connection errors do HTTP header không sạch: whitespace/newline/# và ký tự không an toàn trong platform.version() gây h11/httpx lỗi — nhiều PR đang fix (PRs #1361, #1229, #1384, #1410, #1265). Đây là nguồn lỗi phổ biến trên Linux/Ubuntu. https://github.com/MoonshotAI/kimi-cli/pull/1361 https://github.com/MoonshotAI/kimi-cli/pull/1229 https://github.com/MoonshotAI/kimi-cli/pull/1384 https://github.com/MoonshotAI/kimi-cli/pull/1410 https://github.com/MoonshotAI/kimi-cli/pull/1265
- WebSocket/refresh storm: web mode reconnect nhanh gây nhiều kết nối ngắn; đang sửa để ổn định (PR #1419). https://github.com/MoonshotAI/kimi-cli/pull/1419
- Tương tác terminal/UX: AskUserQuestion/terminal input có edge-case (không nhập option cuối, input mất khi agent kết thúc). Cần test PTY hơn nữa (Issue #1413, #1426; PR #1424). https://github.com/MoonshotAI/kimi-cli/issues/1413 https://github.com/MoonshotAI/kimi-cli/issues/1426 https://github.com/MoonshotAI/kimi-cli/pull/1424
- Quyền/confirm flow: khi user dismiss prompt, agent không nên tiếp tục tự động — đã có PR để coi dismiss là lỗi (PR #1421). https://github.com/MoonshotAI/kimi-cli/pull/1421
- Cross-platform quirks: open-in/vis cần hỗ trợ Windows/macOS; session dir actions giúp debug/support (PR #1416). https://github.com/MoonshotAI/kimi-cli/pull/1416
- Thiếu tính năng auth linh hoạt: login bằng kimi-code API key là yêu cầu phổ biến; đã có hứa hẹn trong setup improvements. https://github.com/MoonshotAI/kimi-cli/issues/1412 https://github.com/MoonshotAI/kimi-cli/pull/1415

Kết luận nhanh
- Phiên bản 1.21.0 mang nhiều cải tiến UX/ổn định quan trọng; cộng đồng đang tập trung sửa các vấn đề về header HTTP và interactive terminal UX. Nếu bạn gặp connection error trên Linux hoặc thấy input mất sau khi agent kết thúc, hãy kiểm tra các issue/PR liên quan và cập nhật lên 1.21.0 khi sẵn sàng.

Tài nguyên nhanh (chọn lọc)
- Release bump / 1.21.0: https://github.com/MoonshotAI/kimi-cli/pull/1425
- Setup + API key verification: https://github.com/MoonshotAI/kimi-cli/pull/1415
- Steer in-turn (shell): https://github.com/MoonshotAI/kimi-cli/pull/1422
- AgentHooks (security hooks): https://github.com/MoonshotAI/kimi-cli/pull/1131
- WebSocket stabilize: https://github.com/MoonshotAI/kimi-cli/pull/1419
- Các issue nóng: https://github.com/MoonshotAI/kimi-cli/issues/1383 https://github.com/MoonshotAI/kimi-cli/issues/1426

Nếu muốn, tôi có thể:
- Soạn mẫu hướng dẫn nâng cấp và checklist kiểm tra sau khi cập nhật lên 1.21.0.
- Tạo danh sách các patch/PR cần backport nếu bạn duy trì bản phân phối tùy chỉnh.

Chúc bạn phát triển hiệu quả — báo lại nếu cần link chi tiết hoặc tóm tắt changelog đầy đủ.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

OpenCode Community Bulletin — 2026-03-13

1) Điểm nổi bật hôm nay
- Phát hành v1.2.25 cập nhật các loại ID và types để tăng an toàn kiểu, đồng thời cải thiện hỗ trợ cho các mô hình Azure non‑OpenAI dùng completions endpoint. (Xem phần "Phát hành phiên bản" bên dưới.)
- Một số vấn đề nóng liên quan tới xác thực/tiêu dùng (Copilot) và trải nghiệm TUI (clipboard, paste preview, tool_call parsing) đang thu hút nhiều thảo luận và PR vá lỗi tích cực. (Ví dụ: issue #8030, #4283 và PR #17261, #17258.)

2) Phát hành phiên bản
- v1.2.25
  - Hỗ trợ mô hình Azure không thuộc OpenAI mà sử dụng completions endpoints.
  - Flow/branding ProviderID và ModelID qua các chữ ký nội bộ.
  - Brand các kiểu ProviderID, ModelID, PermissionID, PtyID, Quest để tăng an toàn kiểu.
  - Loại bỏ việc sinh sourcemap bên ngoài để giảm artifact build.
  - (Phiên bản được ghi nhận trong 24 giờ qua.)

3) Issues nóng trong cộng đồng (chọn 10, vì sao quan trọng & phản ứng)
- #8030 Copilot auth now sets far too many requests as "user" (OPEN) — https://github.com/anomalyco/opencode/issues/8030  
  Tại sao quan trọng: Tác động tới phí/thanh toán người dùng (một số yêu cầu bị tính là premium sai), nhiều người bị mất quota. Phản ứng: 172 bình luận, 58 👍 — issue có tính khẩn cấp cao.

- #4283 Copy To Clipboard is not working (OPEN) — https://github.com/anomalyco/opencode/issues/4283  
  Tại sao quan trọng: TUI không copy được text khiến workflow bị gián đoạn cho nhiều người dùng CLI/TUI. Phản ứng: 65 bình luận, 50 👍 — ưu tiên UX cao.

- #6918 qwen3-coder fails to call edit tool (OPEN) — https://github.com/anomalyco/opencode/issues/6918  
  Tại sao quan trọng: 1) tích hợp với mở rộng mô hình (openrouter) bị lỗi khi gọi tool edit; 2) làm gián đoạn khả năng chỉnh sửa tự động. Phản ứng: 37 bình luận, 20 👍.

- #988 Feature request: add MCP remote using oauth (CLOSED) — https://github.com/anomalyco/opencode/issues/988  
  Tại sao quan trọng: Yêu cầu mạnh về OAuth/MCP để cài đặt server an toàn hơn và đơn giản hóa ủy quyền; nhiều +1 (78 👍), nhiều thảo luận (35 bình luận). Đã đóng nhưng cho thấy nhu cầu rõ ràng.

- #12661 Add Agent Teams Equivalent or Better (OPEN) — https://github.com/anomalyco/opencode/issues/12661  
  Tại sao quan trọng: Cộng đồng muốn khả năng tổ chức agent theo team (tương tự Claude Agent Teams) — ảnh hưởng tới quy mô sử dụng và phối hợp nhóm. Phản ứng: 16 bình luận, 86 👍.

- #6651 Dynamic model selection for subagents via Task tool (OPEN) — https://github.com/anomalyco/opencode/issues/6651  
  Tại sao quan trọng: Hiện subagents không thể chọn model động; điều này gây rườm rà (tạo nhiều agent tương tự). Phản ứng: 18 bình luận, 24 👍. (Liên quan PR: #11377.)

- #15675 `write` tool causes client to hang indefinitely when creating a new file (OPEN) — https://github.com/anomalyco/opencode/issues/15675  
  Tại sao quan trọng: Hành vi treo giao diện trong IDE dù file đã được tạo — làm người dùng mất phản hồi UI; cần điều tra signaling hoàn thành.

- #7654 Questions from nested sub-agents don't appear in TUI (OPEN) — https://github.com/anomalyco/opencode/issues/7654  
  Tại sao quan trọng: Tin nhắn/triệu hồi từ subagents sâu không hiển thị dẫn đến agent treo; ảnh hưởng trực tiếp tới khả năng tương tác với workflows phức tạp.

- #17252 Large file tracked by opencode git tool causes OOM (OPEN) — https://github.com/anomalyco/opencode/issues/17252  
  Tại sao quan trọng: Tài nguyên (RAM) có thể bị tiêu thụ nghiêm trọng khi file lớn (+200MB) bị đưa vào session — rủi ro ổn định/độ tin cậy.

- #16303 Task tool in nested subSession dispatches to wrong agent (OPEN) — https://github.com/anomalyco/opencode/issues/16303  
  Tại sao quan trọng: Giao tiếp giữa subagents bị misroute, dẫn tới hành vi không nhất quán; tính đúng đắn của hệ thống agent bị ảnh hưởng.

4) Tiến độ PR quan trọng (10 PR, mô tả ngắn)
- #17204 fix: guard text-only models from image read attachments (OPEN) — https://github.com/anomalyco/opencode/pull/17204  
  Nội dung: Ngăn các mô hình chỉ xử lý text gọi Read trên ảnh (tránh trả data:image/...); vá lỗi input type.

- #17261 fix(app): ensure tool calls are properly formatted with newlines in user and assistant messages (OPEN, needs:compliance) — https://github.com/anomalyco/opencode/pull/17261  
  Nội dung: Sửa để tool_call luôn có newline hợp lệ — khắc phục parsing từng làm tool calls thất bại.

- #17248 feat(tui): make pasted summaries expandable/collapsible in prompt (OPEN) — https://github.com/anomalyco/opencode/pull/17248  
  Nội dung: Cải thiện UX khi paste nhiều dòng bằng cách cho summary có thể bung/thu gọn trong prompt (phụ thuộc PR opentui).

- #17116 fix(db): harden sqlite3 signal handling (OPEN) — https://github.com/anomalyco/opencode/pull/17116  
  Nội dung: Ổn định lệnh `opencode db` khi khởi chạy sqlite3 interactive shell; giảm lỗi khi thoát/interrupt.

- #13854 fix(tui): stop streaming markdown/code after message completes (OPEN) — https://github.com/anomalyco/opencode/pull/13854  
  Nội dung: Đảm bảo markdown/code hoàn toàn render khi message đã hoàn; khắc phục hàng thiếu do streaming flag sai.

- #17096 fix(tui): make question footer actions clickable (OPEN) — https://github.com/anomalyco/opencode/pull/17096  
  Nội dung: Tăng khả năng tương tác bằng chuột cho hành động footer khi hỏi (enter/esc).

- #17149 fix(web): order session messages by creation time (OPEN) — https://github.com/anomalyco/opencode/pull/17149  
  Nội dung: Sửa lỗi ordering message ở web frontend — theo creation time, chỉnh lỗi cross-machine ordering (liên quan #17010).

- #16836 fix(prompt): open slash menu when typing / anywhere (OPEN) — https://github.com/anomalyco/opencode/pull/16836  
  Nội dung: Cải thiện UX: slash menu được kích hoạt ở mọi vị trí con trỏ, không chỉ đầu dòng.

- #17155 desktop: multi-window support in electron (CLOSED) — https://github.com/anomalyco/opencode/pull/17155  
  Nội dung: Hỗ trợ nhiều cửa sổ trên desktop (Cmd+Shift+N), sync theme via localstorage; PR đã đóng sau review.

- #11377 feat(agent): implement model tier selection with variant support for subagents (OPEN) — https://github.com/anomalyco/opencode/pull/11377  
  Nội dung: Thực hiện selection tier/variant cho subagents (đóng #6651) — tính năng quan trọng để điều chỉnh chất lượng/chi phí cho subagent.

5) Xu hướng yêu cầu tính năng (tóm tắt)
- OAuth / token flows cho providers / MCP / console (issues #988, #10279, #12258, PRs #17265/#17264) — cộng đồng muốn cách ủy quyền an toàn, ít copy/paste secret.
- Quản lý và tổ chức agents theo team/nhóm (Agent Teams) (#12661).
- Model selection động cho subagents / variant support (#6651, PR #11377).
- Per-tool output visibility và granular tool output controls (#17250).
- "YOLO mode" / skip permission prompts cho môi trường tin cậy (#8463).
- UI/UX: cải thiện paste handling, slash menu, question footer, multi-window desktop (PRs #17248, #16836, #17096, #17155).
- Caching và provider config (prompt_cache_ttl cho OpenRouter, #16848).
- Split/edit model responses / undo granular (#17251).

6) Điểm đau của nhà phát triển (vấn đề lặp lại / ưu tiên)
- Xác thực & billing: báo cáo tiêu phí không hợp lý (Copilot / premium requests) là nguy cơ mất tiền cho người dùng và cần giải pháp audit/headers (x-initator). (see #8030)
- TUI clipboard & paste: copy/paste không ổn trên Linux/Windows, paste preview được bao gồm trong input, hoặc thông báo "Copied" sai khi thiếu dependencies — ảnh hưởng trải nghiệm CLI hàng ngày. (see #4283, #11143, #17257, PR #17258)
- Tool_call parsing/newline edge cases: tool calls thất bại nếu định dạng thiếu newline hoặc bị render sai — gây treo agent hoặc dừng luồng. (see #17253 closure via PR #17261)
- Subagent coordination: nested subagents không chuyển tiếp câu hỏi/channels đúng, hoặc dispatch tới agent sai — làm workflows phức tạp bị treo. (see #7654, #16303)
- Mô hình/provider quirks: vấn đề tương thích với OpenRouter/Gemini/Minimax (streaming, context behavior, token limits) cần workarounds. (see #15092, #12219)
- Tài nguyên & stability: OOM khi file lớn bị đưa vào session, và client hang sau tool write — cần giới hạn/streaming/throttling. (see #17252, #15675)
- Message ordering và clock-skew: so sánh ID lexicographic gây lỗi restore/timeline trên multi‑machine. (see #17255, PR #17149)
- Theme/windows rendering: một số theme khiến code invisible (Catppuccin Light). (see #17148)

Kết luận ngắn
- Có tiến triển rõ ràng về sửa lỗi TUI và agent tooling (vài PR tập trung vào parsing, paste, clipboard, message ordering). Các ưu tiên tiếp theo nên tập trung vào: (1) sửa lỗi tiêu dùng/authorization (Copilot/billing), (2) ổn định subagent messaging và tool_call parsing, (3) xử lý lỗi OOM / large-file và UX clipboard cho Linux.  

Tài nguyên / liên kết nhanh
- Repo: https://github.com/anomalyco/opencode
- Một số issue/PR đã đề cập trong bản tin (nhấn vào link từng mục để xem chi tiết).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

Bản tin cộng đồng Qwen Code — 2026-03-13

1) Điểm nổi bật hôm nay
- Phát hành loạt bản 0.12.2 (stable, preview và nightly) với vài sửa lỗi quan trọng (export/session) và cải thiện trải nghiệm OAuth trong MCP. Xem changelog đầy đủ tại https://github.com/QwenLM/qwen-code/compare/v0.12.2...v0.12.2-nightly.20260313.46d57afb
- Nhiều PR lớn đang mở cho hệ thống hooks, remote web-control, và cải thiện kết nối IDE/VSCode — cho thấy hướng phát triển sang mở rộng khả năng tích hợp và quản lý phiên/agent.

2) Phát hành phiên bản
- v0.12.2-nightly.20260313.46d57afb (nightly)
  - Cải thiện UX OAuth trên MCP: phản hồi sau xác thực, i18n, clear auth và sửa một số bug. PR: https://github.com/QwenLM/qwen-code/pull/2327
  - Full changelog: https://github.com/QwenLM/qwen-code/compare/v0.12.2...v0.12.2-nightly.20260313.46d57afb
- v0.12.2 (stable)
  - Fix: lệnh export giờ dùng session hiện tại thay vì loadLastSession (giảm lỗi xuất nhầm phiên). PR liên quan: https://github.com/QwenLM/qwen-code/pull/2268 (đã merged trong release PR)
  - Thay đổi quản lý code owner cho một số package (vscode-ide-companion, webui).
- v0.12.2-preview.0
  - Nội dung tương tự bản stable (preview cho kiểm thử trước release).

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
- #2101 space button issue — đóng — Người dùng báo không thể gõ sau khi bấm phím Space (10 bình luận, 👍5). Ảnh hưởng UX đầu vào trên Windows/VSCode. https://github.com/QwenLM/qwen-code/issues/2101
- #2261 issue with the write_file tool (windows x64) — đóng — Việc gọi write_file nhận lệnh nhưng không tạo file; tác động tới automation và workflows trên Windows (8 bình luận). https://github.com/QwenLM/qwen-code/issues/2261
- #2191 Error during web search: 429 Too Many Requests — đóng — Lỗi rate-limit khi sử dụng web search (DashScope) gây thất bại thực thi tool; tác động tới tính năng tìm kiếm thực tế (7 bình luận, 👍2). https://github.com/QwenLM/qwen-code/issues/2191
- #1985 Allow toggling Plan Mode in VSCode Companion — mở — Yêu cầu bổ sung khả năng chuyển Plan Mode trong VSCode Companion để đồng bộ hành vi CLI/GUI; quan trọng cho người dùng muốn workflow lập kế hoạch (4 bình luận). https://github.com/QwenLM/qwen-code/issues/1985
- #2279 qwenlm.qwen-code-vscode-ide-companion 0.12.0 does not connect — mở — Nhiều người gặp lỗi “Preparing Qwen Code... constantly spinning”, ảnh hưởng tính năng IDE Companion (3 bình luận). https://github.com/QwenLM/qwen-code/issues/2279
- #2339 Telegram Bot Mode (--telegram flag) — mới mở — Đề xuất chạy qwen-code như Telegram bot để remote control; phản ánh nhu cầu tích hợp messenger/remote access (2 bình luận, 👍1). https://github.com/QwenLM/qwen-code/issues/2339
- #2194 Add --worktree flag to enable isolated parallel Qwen Code sessions — mở — Yêu cầu tạo worktree cho mỗi session để tránh xung đột khi chạy song song; rất quan trọng cho CI/đa-session (2 bình luận). https://github.com/QwenLM/qwen-code/issues/2194
- #2338 qwen is confused on /skills — mở — Vấn đề activation của skill sau khi cài; ảnh hưởng trải nghiệm mở rộng (skills) và tự động nhận ngữ cảnh (2 bình luận). https://github.com/QwenLM/qwen-code/issues/2338
- #2306 Qwen Code crash when asking permission to execute cmd — mở — Chọn “always allow” khiến crash sau nâng cấp v0.12.0; liên quan đến flow quyền thực thi lệnh và độ ổn định (2 bình luận). https://github.com/QwenLM/qwen-code/issues/2306
- #2336 Add configuration option to disable loading animation/hints — mở — Người dùng muốn chế độ terminal tối giản (giảm animation/hints); phản ánh nhu cầu UX cho người dùng chuyên nghiệp (1 bình luận). https://github.com/QwenLM/qwen-code/issues/2336

Tại sao quan trọng: các issue trên che phủ ba nhóm lớn — (1) độ ổn định/bug (crash, write_file), (2) UX/IDE integration (VSCode connection, input handling, loading hints), (3) tính năng mở rộng/scale (worktrees, Telegram, skills). Cộng đồng đã tương tác (bình luận & thumbs) chủ yếu tập trung vào các vấn đề làm gián đoạn workflow.

4) Tiến độ PR quan trọng (10 PR)
- #2203 feat(hooks): Implement 10 core event hooks — OPEN — Thêm 10 hooks cốt lõi cho lifecycle session và tool execution, mở đường cho extensibility/plugins. https://github.com/QwenLM/qwen-code/pull/2203
- #2322 fix(ide): resolve IDE connection issues in some VSCode clients — OPEN — Sửa lỗi kết nối IDE Companion cho một số client (Codespaces, code-server), cải thiện lookup config. https://github.com/QwenLM/qwen-code/pull/2322
- #2330 feat: remote-control feature for browser-based CLI interaction — OPEN — Cung cấp HTTP+WebSocket server và web UI để điều khiển qwen qua trình duyệt (token-based auth, realtime sync). https://github.com/QwenLM/qwen-code/pull/2330
- #2328 feat(export): add metadata and statistics tracking — OPEN — Thêm metadata (model, channel, git branch) và thống kê token/file vào chức năng export; giúp audit/telemetry. https://github.com/QwenLM/qwen-code/pull/2328
- #2207 (release) #2307 chore: Release v0.12.2 — CLOSED — Bump phiên bản lên 0.12.2 across monorepo. https://github.com/QwenLM/qwen-code/pull/2307
- #2327 feat(mcp): improve OAuth auth UX — CLOSED — Hoàn thiện UX OAuth MCP: feedback sau auth, i18n, clear auth, auto-navigate, và sửa lỗi liên quan. https://github.com/QwenLM/qwen-code/pull/2327
- #2324 feat(core): add truncation support to LS tool — CLOSED — Giới hạn output khi thư mục có quá nhiều file, tránh overflow context. https://github.com/QwenLM/qwen-code/pull/2324
- #2320 fix(core): convert array content to string for DeepSeek API — CLOSED — Sửa lỗi gửi mảng thay vì string cho DeepSeek; khắc phục API 400. https://github.com/QwenLM/qwen-code/pull/2320
- #2308 fix(webui): add Tab key support to CompletionMenu — CLOSED — Thêm support phím Tab trong menu hoàn thiện (fix trải nghiệm slash commands trong VSCode extension). https://github.com/QwenLM/qwen-code/pull/2308
- #2316 feat: Add CLI command to reconnect MCP servers — OPEN — Thêm lệnh CLI `qwen mcp reconnect` để programmatic reconnection (hữu ích cho auto-recovery/non-interactive flows). https://github.com/QwenLM/qwen-code/pull/2316

Ý nghĩa: nhiều PR tập trung vào ổn định IDE integration, UX authentication, mở rộng API/hook, và khả năng remote/automation — cho thấy ưu tiên của dự án là tin cậy hóa tích hợp và mở rộng cho workflows thực tế.

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Hỗ trợ chạy song song/isolated sessions (worktree flag, arena multi-model) — #2194, #1912
- Khả năng remote control / bot mode (web UI, Telegram flag) — #2330, #2339
- Mở rộng hệ thống hooks & event để custom behavior/automation — #2203
- Quản lý context/subagent: clean context và token budget cho subagents — PR #2337
- Nâng cao tích hợp IDE: Plan Mode toggle, Tab behavior, improved @ mention (folder + fuzzy) — #1985, #2308, #2325
- Export & telemetry: metadata và token/file statistics trong export — #2328
- UX auth: cải thiện OAuth (i18n, post-auth feedback, remove QR causing flicker) — #2327, #2311
- File/IO robustness: validate paths, ACP error mapping, write_file reliability — #2305, #2298, #2261
- Lightweight/terminal-only mode: option để tắt loading animations/hints — #2336
- Better large-repo handling: truncation/limits when reading many files — #2324, #2319

6) Điểm đau của nhà phát triển (tóm tắt)
- Xung đột đa-session / thiếu isolation: người dùng muốn chạy nhiều phiên cùng repo mà không đụng nhau — issue #2194. Giải pháp đề xuất: worktree per session.
  - Link: https://github.com/QwenLM/qwen-code/issues/2194
- Tích hợp VSCode không ổn định: lỗi kết nối IDE Companion, Tab/command insertion, và mất line input/space behaviour gây gián đoạn lớn cho dev workflow — #2279, #2293, #2101.
  - Links: https://github.com/QwenLM/qwen-code/issues/2279, https://github.com/QwenLM/qwen-code/issues/2293, https://github.com/QwenLM/qwen-code/issues/2101
- File operations thiếu bền vững trên Windows / ACP mismatches: write_file không tạo file; ACP lỗi chuyển đổi mã lỗi; path validation cần thiết — #2261, #2305, #2298.
  - Links: https://github.com/QwenLM/qwen-code/issues/2261, https://github.com/QwenLM/qwen-code/pull/2305, https://github.com/QwenLM/qwen-code/pull/2298
- Lỗi API/serialization và rate-limit bên ngoài (DeepSeek 400, DashScope 429) làm các tool phụ thuộc bên thứ ba bị đứt mạch — #2318, #2191, #2158.
  - Links: https://github.com/QwenLM/qwen-code/issues/2318, https://github.com/QwenLM/qwen-code/issues/2191
- Quản lý context & performance với thư mục rất lớn: đọc quá nhiều file gây overflow context; cần truncation/limits — #2319, PR #2324.
  - Link: https://github.com/QwenLM/qwen-code/issues/2319
- UX OAuth / terminal flicker / authentication reliability: một số terminal (PowerShell/Win11) gặp flicker, device flow failures; cần UX/tolerant flows — #2254, #2081 và PRs #2311/#2327.
  - Links: https://github.com/QwenLM/qwen-code/issues/2254, https://github.com/QwenLM/qwen-code/issues/2081

Kết luận ngắn gọn
- Hiện tại nhóm phát triển đang tập trung vào: (1) sửa lỗi kết nối IDE & input UX, (2) củng cố file/tool reliability (ACP, write_file, DeepSeek), và (3) mở rộng khả năng tích hợp (hooks, remote web UI, worktree/arena). Nếu bạn quan tâm đóng góp, PR về validate path, truncate large outputs, hooks hoặc remote-control đều đang nhận review. 

Tài nguyên / liên kết chính
- Repo chính: https://github.com/QwenLM/qwen-code
- Changelog/nightly: https://github.com/QwenLM/qwen-code/compare/v0.12.2...v0.12.2-nightly.20260313.46d57afb

Nếu muốn, tôi có thể:
- Tạo checklist kỹ thuật để triển khai --worktree safe sessions.
- Tổng hợp các steps debug cho lỗi write_file trên Windows.
- Soạn mẫu issue/PR template cho tích hợp hooks hoặc remote-control.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*