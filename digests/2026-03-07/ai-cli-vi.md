# Bản tin Cộng đồng Công cụ AI CLI 2026-03-07

> Thời gian tạo: 2026-03-07 13:56 UTC | Công cụ: 7

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
- Các dự án AI‑CLI hiện tập trung vào hai mạch chính: (a) tính ổn định/khả năng chạy cross‑platform (Windows/WSL/Android/Termux) và quản lý session dài hạn; (b) mở rộng khả năng tự động hoá/agent (hooks, subagents, scheduling, prompt replay) đồng thời kiểm soát chi phí/quota và hành vi mô hình.  
- Nhiều repo đang tung nightly/alpha nhanh (rollouts liên tục), trong khi các issue lớn xoay quanh rate‑limits, auth/refresh, và tương thích terminal/IME — những vấn đề cơ bản ảnh hưởng trực tiếp tới developer experience.  
- Kết quả: tốc độ đổi mới cao nhưng cũng có nhiều regressions vận hành; observability, retry/backoff và UX headless là những điểm cần ưu tiên.

2) So sánh mức độ hoạt động (hôm nay)
Tool | Issues (hot/updated) | PRs (notable active/merged) | Release (24h)
Claude Code | 10 issues nóng | 10 PRs tiến độ (stability/hooks/safe‑edit) | v2.1.71 (mới) — /loop, cron (có bug báo cáo)
OpenAI Codex | 10 issues nóng | 10 PRs (subagents, hooks, sandbox) | Loạt rust‑v0.112.0‑alpha.* (6 alpha releases)
Gemini CLI | 10 issues chọn lọc | 10 PRs (headless, sandbox, agent UX) | v0.34.0‑nightly + v0.33.0‑preview.5
GitHub Copilot CLI | 10 issues theo dõi | ~0 PR mới trong 24h (nhiều issue đóng gần đây) | v1.0.2 (GA bump) + v0.0.423
Kimi Code CLI | 3 issues cập nhật | 2 PRs (header/OAuth fixes) | No release (không có release mới)
OpenCode | 10 issues lớn | 10 PRs (compaction, session lifecycle, 1M header) | No release (không có release mới)
Qwen Code | 9 issues cập nhật | 10 PRs (VSCode UX, session replay) | v0.12.0‑nightly (mới)

(Ghi chú: “Issues” và “PRs” ở trên là số bản tin nêu ra hôm nay — chỉ báo hoạt động/ưu tiên, không phải tổng repo.)

3) Hướng tính năng chung (xuất hiện trên nhiều công cụ)
- Cross‑platform/WSL/Windows fixes (Claude Code, Codex, Gemini, Copilot, OpenCode, Qwen): sửa path/TMP, editor detection, PowerShell compatibility, terminal rendering.  
- Session/stateful remote control & resume (Gemini, Claude, Codex, OpenCode): stateful WebSocket / resume, long sessions, session IDs trong hooks.  
- Hooks / extensibility / subagents (Codex, Gemini, Claude, Qwen): engine cho SessionStart/Stop, hook schemas, HTTP hooks và propagation of execpolicy.  
- Automation scheduling / replay (/loop, cron, prompt‑replay) (Claude, Gemini, Copilot): chạy định kỳ, prompt replay cache, dry‑run previews.  
- Quota/usage attribution & rate‑limit visibility (Claude, Codex, Copilot, Qwen): usage misattribution, unexpected rate limits, need for clearer metrics.  
- Sandbox options non‑Docker (udocker) & macOS seatbelt fixes (Gemini, Codex, OpenCode): hỗ trợ môi trường edge/Android, tôn trọng filesystem carveouts.  
- Safety/file‑edit guards and CLAUDE.md-like policies (Claude, Copilot, OpenCode): chặn edit trên file chưa đọc, validate agent instructions.  
- Observability / better error payloads (Kimi, Qwen, Copilot): request IDs, payload/log collection for 400s/connection errors.

4) Phân tích khác biệt hóa
- Claude Code: tập trung sâu vào agent workflows, plugin/hooks, an toàn thao tác file và tích hợp IDE (VS Code) — khách hàng mục tiêu: developers xây dựng automation CI/CD‑centric. Vấn đề nổi bật: hành vi model (Opus 4.6) + tích hợp nền tảng.  
- OpenAI Codex: nhấn mạnh vào subagents, hooks engine và cải thiện stability ở mức infra (rate‑limits, auth, streaming). Iteration rất nhanh (nhiều alpha Rust), hướng tới developer platform enterprise với kiểm soát rollout/guardian.  
- Gemini CLI: ưu tiên headless/automation reliability, agent UX (giảm narration), và sandboxing không‑Docker — phù hợp cho CI, embedded/edge và team automation.  
- GitHub Copilot CLI: trọng tâm UX TUI và shell execution (forms, IME, shell guards), GA‑ready trải nghiệm cho dev cá nhân/teams; pain points chủ yếu là terminal/PowerShell/IME.  
- OpenCode: tập trung xử lý Windows ecosystem, session/storage compaction và hỗ trợ context‑1M token — target: người dùng desktop/large‑scale sessions.  
- Qwen Code & Kimi: tập trung UX VS Code companion, session replay, và reliability kết nối/OAuth — giải pháp compact cho workflows IDE‑centric.  
Tóm lại: mỗi công cụ nhắm tới các lớp người dùng khác nhau (agent heavy automation vs IDE companion vs infra/platform stability), nên ưu tiên kỹ thuật phản ánh target user.

5) Động lực & độ trưởng thành của cộng đồng
- Hoạt động mạnh/nhanh: OpenAI Codex (loạt alpha releases, threads lớn về rate limits) và Claude Code (nhiều issue/PR, release feature) — cộng đồng chuyên sâu, nhiều contributors và nhiều signal phân loại.  
- Iteration nhanh (nightly/alpha cadence): Codex, Gemini, Qwen, Claude. Những repo này triển khai tính năng thí nghiệm thường xuyên nhưng kèm theo regressions.  
- Cộng đồng tập trung vào triage/ops lớn: OpenCode có các “mega‑issue” Windows (202 comments) — chỉ ra vấn đề người dùng thực tế và nhu cầu hợp tác maintainer‑user.  
- Ít hoạt động/ngày: Kimi Code (ít issue/PR cập nhật) — cần review prioritization để tăng tốc fix.  
Rủi ro: dự án có cadence nhanh nhưng thiếu observability/tracing dễ dẫn đến regressions và user churn.

6) Tín hiệu xu hướng & gợi ý cho nhà phát triển
- Xu hướng ngành: mô hình hóa agent + automation là trung tâm; đồng thời yêu cầu cơ sở hạ tầng xung quanh (session state, hooks, sandbox portability, prompt caching) ngày càng quan trọng.  
- Nên ưu tiên (ngắn hạn, high ROI): (1) observability — request IDs, structured logs, reproducible repro templates; (2) session/state APIs (resume, session IDs in hooks); (3) cross‑platform fixes (Windows/WSL/PowerShell/Termux); (4) robust retry/backoff + clear 400/429 diagnostics; (5) lightweight sandboxing options cho edge (udocker).  
- Về sản phẩm: cung cấp dry‑run/previews, prompt‑replay cache và per‑agent model selection giảm chi phí/risks — được nhiều cộng đồng yêu cầu.  
- Chiến lược cộng đồng: tập trung triage các mega‑issues (Windows, rate limits, model regressions) và kêu gọi repro/logs từ reporter sẽ rút ngắn vòng sửa lỗi và tăng độ tin cậy release.

Nếu cần, tôi có thể xuất checklist ưu tiên 2 tuần (triage + observability + platform fixes) hoặc mẫu bug‑report chuẩn để thu thập logs/request IDs từ người dùng.

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nổi bật Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

Báo cáo nhanh — Điểm nổi bật cộng đồng Claude Code Skills (dữ liệu tới 2026-03-07)

1) Xếp hạng "Skills hot" (5–8 PR được thảo luận/quan tâm nhiều nhất)
- #514 Add document-typography — Kiểm soát chất lượng chữ/format cho tài liệu do AI tạo (tránh orphan/widow, căn số bị lệch). Điểm thảo luận: cải thiện đầu ra văn bản và tương thích in/Word; phù hợp cho người dùng chuyên soạn thảo tài liệu. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/514
- #210 Improve frontend-design skill clarity and actionability — Làm rõ hướng dẫn thiết kế giao diện front-end, tập trung tính khả thi trong một phiên hội thoại. Điểm thảo luận: giảm tính mô tả quá mức, tăng tính thực thi. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/210
- #83 Add skill-quality-analyzer and skill-security-analyzer to marketplace — Hai meta-skill phân tích chất lượng và an ninh cho Skills (đa tiêu chí). Điểm thảo luận: nhu cầu tool kiểm thử/đánh giá Skills trước khi phát hành. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/83
- #154 Add shodh-memory skill — Hệ thống bộ nhớ bền cho agent, hướng dẫn khi nào gọi proactive_context và cách cấu trúc memory. Điểm thảo luận: nhu cầu nhớ ngữ cảnh liên tục giữa các phiên; ảnh hưởng tới UX agent. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/154
- #147 Add codebase-inventory-audit skill — Audit mã nguồn: tìm code mồ côi, file unused, gap tài liệu, và tạo báo cáo CODEBASE-STATUS.md. Điểm thảo luận: tự động hoá audit, cải thiện maintainability. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/147
- #444 feat: add AURELION skill suite — Bộ kỹ năng AURELION (kernel, advisor, agent, memory) cho quản lý tri thức và hợp tác AI. Điểm thảo luận: framework nhận thức/memory cho luồng công việc chuyên nghiệp. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/444
- #246 Configure skills in Claude user preferences — Khuôn mẫu cấu hình skill theo người dùng, template preference và skill ngôn ngữ. Điểm thảo luận: cá nhân hoá hành vi Claude qua preferences. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/246
- #299 Google Workspaces assistant skills — Bộ skill cho tương tác email/calendar/tasks qua GOG CLI. Điểm thảo luận: tích hợp hệ sinh thái bên thứ ba (Google Workspace) để làm trợ lý cá nhân. Trạng thái: OPEN. https://github.com/anthropics/skills/pull/299

2) Xu hướng nhu cầu cộng đồng (tóm tắt từ Issues)
- Trạng thái và bộ nhớ bền/khôi phục: người dùng cần memory bền cho agent, khắc phục tình trạng "skills biến mất" và giữ ngữ cảnh liên tục (liên quan: issue #62). https://github.com/anthropics/skills/issues/62
- Công cụ và tiêu chuẩn phát triển Skill: nâng cấp skill-creator theo best practices, giảm verbose/hướng dẫn dành cho dev, tăng token-efficiency (issue #202). https://github.com/anthropics/skills/issues/202
- Kiểm thử/đánh giá chất lượng và an ninh cho Skills: mong muốn có analyzer/quality checks trước khi publish (phản ánh PR #83 và thảo luận chung). https://github.com/anthropics/skills/pull/83
- Packaging / MCP / quản lý phụ thuộc: yêu cầu expose Skills như MCPs, package manager cho Skills và hỗ trợ MCP Apps (issue #16, #185). https://github.com/anthropics/skills/issues/16 https://github.com/anthropics/skills/issues/185
- Tích hợp hệ thống bên thứ ba & cloud (Bedrock, Google Workspace): nhu cầu chạy Skills với AWS Bedrock, tích hợp API của Google/Workspace để tự động hoá công việc cá nhân/enterprise (issue #29 và PR #299). https://github.com/anthropics/skills/issues/29 https://github.com/anthropics/skills/pull/299
- Vận hành và ổn định API: lỗi upload/delete/serving Skills qua API (issues #406, #403, #389) gây gián đoạn sản xuất; cộng đồng cần ổn định nền tảng. https://github.com/anthropics/skills/issues/406 https://github.com/anthropics/skills/issues/403 https://github.com/anthropics/skills/issues/389
- An ninh, governance cho agents: đề xuất skill về agent-governance (policy/enforcement/audit) phản ánh quan ngại về an toàn hệ thống agent. https://github.com/anthropics/skills/issues/412
- SOP & công cụ chuyên ngành nội bộ: nhu cầu SOP/task-specific MCP tool definitions cho tác vụ doanh nghiệp (issue #273). https://github.com/anthropics/skills/issues/273
- Chất lượng đầu ra tài liệu: typographic và whitespace issues cho docx/OOXML, nhu cầu chuẩn hoá xuất văn bản (PR #514, #143). https://github.com/anthropics/skills/pull/514 https://github.com/anthropics/skills/pull/143

3) Skills tiềm năng cao chưa merge (PR có khả năng sớm được triển khai)
- shodh-memory (PR #154) — Trùng khớp nhu cầu lớn về bộ nhớ bền; nếu được duyệt sẽ giải quyết nhiều issue UX/consistency. https://github.com/anthropics/skills/pull/154
- skill-quality-analyzer & skill-security-analyzer (PR #83) — Meta-skill hữu ích cho pipeline phát triển Skills; được kỳ vọng để nâng mức chất lượng cộng đồng. https://github.com/anthropics/skills/pull/83
- document-typography (PR #514) — Tập trung vào lỗi typographic phổ biến; có ứng dụng thực tế ngay cho người tạo tài liệu/enterprise. https://github.com/anthropics/skills/pull/514
- codebase-inventory-audit (PR #147) — Công cụ audit codebase sẽ được đón nhận bởi teams muốn tự động hoá cleanup và tạo “single source of truth”. https://github.com/anthropics/skills/pull/147
- AURELION skill suite (PR #444) — Framework tri thức toàn diện, có thể thu hút adoption trong môi trường doanh nghiệp/phân phối kiến thức. https://github.com/anthropics/skills/pull/444
- Improve frontend-design (PR #210) — Cải thiện khả năng thực thi của skill hiện có; dễ merge vì giá trị thực tiễn cho designer/dev workflows. https://github.com/anthropics/skills/pull/210

4) Nhận định hệ sinh thái Skills (1 câu)
Cộng đồng tập trung mạnh vào xây dựng nền tảng vận hành và developer experience cho agent: tức là memory bền + governance, công cụ đánh giá/kiểm thử/packaging (MCP) và tích hợp/ổn định API để đưa Skills từ prototype thành dịch vụ đáng tin cậy cho doanh nghiệp và người dùng cuối.

Tài liệu tham khảo nhanh (một số link chính):
- PRs: #514 https://github.com/anthropics/skills/pull/514, #210 https://github.com/anthropics/skills/pull/210, #83 https://github.com/anthropics/skills/pull/83, #154 https://github.com/anthropics/skills/pull/154, #147 https://github.com/anthropics/skills/pull/147, #444 https://github.com/anthropics/skills/pull/444, #246 https://github.com/anthropics/skills/pull/246, #299 https://github.com/anthropics/skills/pull/299
- Issues: #62 https://github.com/anthropics/skills/issues/62, #202 https://github.com/anthropics/skills/issues/202, #16 https://github.com/anthropics/skills/issues/16, #412 https://github.com/anthropics/skills/issues/412, #403 https://github.com/anthropics/skills/issues/403, #406 https://github.com/anthropics/skills/issues/406, #273 https://github.com/anthropics/skills/issues/273

Nếu cần, tôi có thể chuẩn hoá những đề xuất ưu tiên (roadmap ngắn hạn 30–90 ngày) dựa trên ảnh hưởng người dùng và chi phí triển khai.

---

1) Điểm nổi bật hôm nay
- Phát hành v2.1.71 bổ sung /loop (lặp lịch lệnh), cron scheduling trong session, và keybinding push-to-talk cho voice. Tuy nhiên một báo cáo đã nêu /loop không được nhận diện — cần theo dõi. (Xem phần phát hành & issue liên quan)
- Cộng đồng đang tập trung vào hai nhóm vấn đề: hành vi mô hình (Opus 4.6) và các lỗi/điểm nghẽn tích hợp nền tảng (VS Code, iOS web UI, WSL, rate limits).

2) Phát hành phiên bản
- v2.1.71 (mới, 24 giờ qua)
  - Thêm lệnh /loop để chạy prompt hoặc slash command theo khoảng lặp (ví dụ: /loop 5m check the deploy).
  - Thêm công cụ lập lịch cron để kích hoạt prompts định kỳ trong một session.
  - Thêm keybinding voice:pushToTalk để cho phép đổi phím kích hoạt thoại.
  - Link release: https://github.com/anthropics/claude-code/releases/tag/v2.1.71

3) Issues nóng trong cộng đồng (10 mục)
- #28951 — [BUG] Remote control (/rc) not supported in VS Code extension
  - Tại sao quan trọng: chức năng remote control quan trọng cho workflows từ xa; ảnh hưởng nhiều người dùng VS Code.
  - Phản ứng: 28 bình luận, 14 👍 — nhiều thảo luận và repro. Link: https://github.com/anthropics/claude-code/issues/28951

- #30021 — "Create PR" button missing in Claude Code web UI after push
  - Tại sao quan trọng: làm gián đoạn flow commit → PR, đặc biệt với người dùng iOS; gây mất năng suất.
  - Phản ứng: 20 bình luận, 39 👍 — issue có nhiều 👍, ưu tiên UX cao. Link: https://github.com/anthropics/claude-code/issues/30021

- #27302 — FEATURE: Support multiple Connector accounts (same connector, different accounts) on web
  - Tại sao quan trọng: nhiều developer/người dùng cần dùng nhiều tài khoản connector (GitHub, GitLab, CI); hiện hạn chế gây friction.
  - Phản ứng: 24 bình luận, 22 👍 — yêu cầu tính năng rõ ràng từ cộng đồng. Link: https://github.com/anthropics/claude-code/issues/27302

- #12487 — Documentation/question: Are Opus and Sonnet limits independent or shared after Nov 24 update?
  - Tại sao quan trọng: gây nhầm lẫn về quota/cost; ảnh hưởng lên cách người dùng điều phối workload giữa model.
  - Phản ứng: 19 bình luận, 28 👍 — cần làm rõ chính thức. Link: https://github.com/anthropics/claude-code/issues/12487

- #26533 — [MODEL] Opus 4.6 ignores document instructions, repeats failed solutions, fabricates self-diagnosis
  - Tại sao quan trọng: báo cáo hành vi không chính xác/không tuân thủ ngữ cảnh của model — rủi ro về độ tin cậy và chi phí.
  - Phản ứng: 13 bình luận — nhiều người gặp regressions sau Opus 4.6. Link: https://github.com/anthropics/claude-code/issues/26533

- #20508 — [BUG] API Error 400: "tool_use ids must be unique" when using -p flag with tool-requiring prompts
  - Tại sao quan trọng: gây lỗi API reproducible khi dùng tính năng -p (prompt/parallel) — cản trở automation.
  - Phản ứng: 12 bình luận, 13 👍 — có repro. Link: https://github.com/anthropics/claude-code/issues/20508

- #27032 — Model ignores CLAUDE.md instructions despite reading them at session start
  - Tại sao quan trọng: vi phạm các quy tắc tuân thủ người dùng (CLAUDE.md) có thể gây hành vi sai lệch, thậm chí gây hại.
  - Phản ứng: 9 bình luận — báo cáo liên quan đến an toàn/quyền kiểm soát. Link: https://github.com/anthropics/claude-code/issues/27032

- #24387 — Corrupted image in context permanently breaks session — workaround and suggested fix
  - Tại sao quan trọng: file/image hỏng làm session bị hỏng vĩnh viễn → mất state, gián đoạn công việc; có workaround và đề xuất sửa.
  - Phản ứng: 6 bình luận, 4 👍 — có fix đề xuất. Link: https://github.com/anthropics/claude-code/issues/24387

- #23030 — [Bug] Rate limit triggered before reaching session usage limit (71%)
  - Tại sao quan trọng: trải nghiệm billing/usage không nhất quán dẫn tới ngắt session bất ngờ; ảnh hưởng người dùng trả nhiều tiền.
  - Phản ứng: 7 bình luận, 12 👍 — người dùng chuyên nghiệp báo cáo. Link: https://github.com/anthropics/claude-code/issues/23030

- #31759 — [Bug] /loop slash command not recognized in v2.1.71
  - Tại sao quan trọng: trực tiếp mâu thuẫn với changelog v2.1.71; nếu /loop không hoạt động thì tính năng lặp định kỳ không dùng được.
  - Phản ứng: 2 bình luận, 4 👍 — ngay sau release. Link: https://github.com/anthropics/claude-code/issues/31759

4) Tiến độ PR quan trọng (10 PR)
- #31732 — feat(feature-dev): add dry-run preview and iterative PR workflow
  - Nội dung: thêm preview dry-run trước khi thực thi trong plugin feature-dev; chia công việc ra PR nhỏ để review từng bước. Link: https://github.com/anthropics/claude-code/pull/31732

- #31723 — feat(plugin-dev): add HTTP hook type support to validate-hook-schema.sh
  - Nội dung: cho phép schema validator chấp nhận hook type "http" (trước chỉ có "command" hoặc "prompt"). Hỗ trợ tích hợp hooks HTTP. Link: https://github.com/anthropics/claude-code/pull/31723

- #31721 — Fix hookify plugin imports missing CLAUDE_PLUGIN_ROOT fallback
  - Nội dung: sửa export/biến môi trường để python hooks có CLAUDE_PLUGIN_ROOT nếu không được export; fix lỗi runtime plugin hooks. Link: https://github.com/anthropics/claude-code/pull/31721

- #31717 — Fix hooks.json schema to use direct format across all plugins
  - Nội dung: chuẩn hóa schema hooks.json (loại bỏ wrapper invalid) để tránh lỗi khi chạy hook (ví dụ Stop hook error). Link: https://github.com/anthropics/claude-code/pull/31717

- #31701 — fix: respect $TMPDIR and os.tmpdir() instead of hardcoding /tmp/claude
  - Nội dung: sửa hardcoded /tmp/claude → dùng TMPDIR/os.tmpdir(), giải quyết sự cố trên Termux/Android và môi trường hạn chế. Link: https://github.com/anthropics/claude-code/pull/31701

- #31699 — feat(code-review): add --model flag to override agent model selection
  - Nội dung: cho phép người dùng override model được dùng cho các agent (tiết kiệm chi phí hoặc thay đổi chất lượng). Link: https://github.com/anthropics/claude-code/pull/31699

- #31698 — fix(code-review): strengthen step 1 gating agent reliability
  - Nội dung: nâng cấp logic/đổi model để tránh skip nhầm PR "trivial"; cải thiện độ tin cậy pipeline review. Link: https://github.com/anthropics/claude-code/pull/31698

- #31697 — fix(code-review): include CLAUDE.md agents in step 5 validation
  - Nội dung: đảm bảo các cảnh báo/vi phạm do CLAUDE.md agents được lọc/validate đúng và không bị bỏ qua. Link: https://github.com/anthropics/claude-code/pull/31697

- #31633 — feat(plugin): add safe-edit-guard — block Edit/Write on unread files
  - Nội dung: plugin bảo vệ chặn Edit/Write nếu Claude chưa Read file trong session — giúp ngăn overwrite "mù" làm hỏng mã. Link: https://github.com/anthropics/claude-code/pull/31633

- #31608 — docs: Add contribution workflow guide
  - Nội dung: thêm CONTRIBUTING.md hướng dẫn workflow fork & PR, cách giữ repo đồng bộ — cải thiện onboarding contributors. Link: https://github.com/anthropics/claude-code/pull/31608

5) Xu hướng yêu cầu tính năng (tổng quan)
- Hỗ trợ nhiều tài khoản trên cùng một connector (GitHub/GitLab) — #27302. (Nhiều 👍)
- Cải thiện lập lịch/automation: /loop + cron scheduling (v2.1.71) và mong muốn tính năng lập lịch bền vững trong session.
- Dry-run / preview trước khi Claude sửa/commit — #31732.
- Công cụ an toàn khi sửa mã: safe-edit-guard, kiểm tra CLAUDE.md trước khi chỉnh sửa — #31633, #31697, #27032.
- Quản lý model & chi phí: flag override model (--model) và rõ ràng về quota giữa Opus/Sonnet — #31699, #12487.
- Mở rộng hooks (HTTP), tiêu chuẩn schema hooks, và cải thiện tích hợp plugin — #31723, #31717, #31721.
- Cải thiện trải nghiệm multi-platform: WSL/Windows/macOS path handling (TMPDIR), sandbox support — #31701, #31708.
- Hiển thị metrics rõ ràng: session-total vs segment metrics khi resume — #31839.

6) Điểm đau của nhà phát triển (tóm tắt ngắn)
- Hành vi mô hình thất thường: nhiều báo cáo Opus 4.6 bỏ qua hướng dẫn, lặp, hoặc fabricate (xem #26533, #26761, #31841). Kết quả: mất thời gian debug, tăng chi phí.
- Tích hợp nền tảng thiếu ổn định: VS Code remote, iOS web UI (Create PR missing), Bun/Windows crashes, WSL sandbox — khiến workflows cross-platform bị gián đoạn (#28951, #30021, #31282, #31708).
- Quản lý quota & rate-limits: endpoint usage rate-limiting quá mạnh và meter không nhất quán → session bị cắt ngang (#31637, #23030, #31843).
- Hooks & TLS: HTTP hooks + bundled TLS không dùng CA store hệ thống gây lỗi certificate (#31777).
- Lưu trữ/đường dẫn cứng: hardcoded /tmp gây lỗi trên Termux/Android; conversation.jsonl không được ghi trên Windows — mất persist state (#31701, #31610).
- An toàn thao tác file: Claude thực hiện edits trái phép hoặc chỉnh sửa trên file chưa đọc → rủi ro hỏng code/giảm an toàn (#26980, #22638); giải pháp tạm gồm safe-edit-guard (#31633).
- UX automation regressions: contextual prompt suggestions biến mất, /loop không ổn định — ảnh hưởng trải nghiệm người dùng và automation (#27716, #31759).

Kết luận ngắn: bản phát hành v2.1.71 mang tính năng automation hữu ích (cron, /loop) nhưng ngay lập tức lộ ra các vấn đề vận hành (slash command không nhận, model regressions và nhiều lỗi tích hợp nền tảng). Các PR hiện tại tập trung vào ổn định plugin/hooks, an toàn sửa file, và trải nghiệm developer (dry-run, docs). Nếu bạn đang bị ảnh hưởng, theo dõi các issue/PR nêu trên và góp thêm repro/logs vào những báo cáo tương ứng để giúp ưu tiên fix.

Tài nguyên nhanh (liên kết chính):
- Repo: https://github.com/anthropics/claude-code
- Release v2.1.71: https://github.com/anthropics/claude-code/releases/tag/v2.1.71
- Một số issue & PR nổi bật đã nêu tại phần tương ứng (links trong từng mục).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

Bản tin cộng đồng OpenAI Codex — 2026-03-07

1) Điểm nổi bật hôm nay
- Cộng đồng đang tập trung vào các vấn đề giới hạn sử dụng (rate limits) và tính toán usage không chính xác, với một thread báo cáo giảm giới hạn sử dụng đột ngột thu hút nhiều phản hồi. (Issue #13568)
- Nhiều bản phát hành nhánh Rust alpha (v0.112.0-alpha.*) được đẩy trong 24 giờ qua; đồng thời có hoạt động lớn trên phần quản lý subagents, hooks và sandbox (PRs #13096, #13276, #13702).  

2) Phát hành phiên bản
Các release nhánh Rust alpha được tạo trong 24h qua (tệp tag trong repo):
- rust-v0.112.0-alpha.10 — Release: 0.112.0-alpha.10  
  https://github.com/openai/codex/releases/tag/rust-v0.112.0-alpha.10
- rust-v0.112.0-alpha.9 — Release: 0.112.0-alpha.9  
  https://github.com/openai/codex/releases/tag/rust-v0.112.0-alpha.9
- rust-v0.112.0-alpha.8 — Release: 0.112.0-alpha.8  
  https://github.com/openai/codex/releases/tag/rust-v0.112.0-alpha.8
- rust-v0.112.0-alpha.7 — Release: 0.112.0-alpha.7  
  https://github.com/openai/codex/releases/tag/rust-v0.112.0-alpha.7
- rust-v0.112.0-alpha.6 — Release: 0.112.0-alpha.6  
  https://github.com/openai/codex/releases/tag/rust-v0.112.0-alpha.6
- rust-v0.112.0-alpha.5 — Release: 0.112.0-alpha.5  
  https://github.com/openai/codex/releases/tag/rust-v0.112.0-alpha.5

(Tóm tắt: loạt alpha releases lớn cho codebase Rust — theo dõi changelog các tag nếu cần chi tiết kỹ thuật.)

3) Issues nóng trong cộng đồng (10 mục, vì sao quan trọng & phản ứng)
- #13568 Usage dropping too quickly — https://github.com/openai/codex/issues/13568  
  Tại sao quan trọng: báo cáo người dùng bị trả về giới hạn thấp hơn bất ngờ và bắt đầu tiêu tốn credits; ảnh hưởng trực tiếp UX & chi phí. Phản ứng: thread lớn (177 bình luận) với nhiều biểu cảm đồng ý (👍 52) — vấn đề ưu tiên về limits/rate accounting.

- #10410 Codex Desktop App: macOS Intel (x86_64) support — https://github.com/openai/codex/issues/10410  
  Tại sao quan trọng: nhiều người vẫn dùng Intel mac; thiếu build Universal/x86_64 gây lỗi tương thích và giảm phạm vi người dùng. Phản ứng: nhiều upvote (👍129) và thảo luận (104 bình luận).

- #12764 The codex cli giving: 401 unauthorized — https://github.com/openai/codex/issues/12764  
  Tại sao quan trọng: lỗi 401 từ CLI/Windows chặn luồng làm việc developer; có thể liên quan tới authentication endpoints. Phản ứng: nhiều báo cáo tương tự (50 bình luận) — tác động rộng.

- #9634 Refresh token already used / reauth flow lỗi — https://github.com/openai/codex/issues/9634  
  Tại sao quan trọng: lỗi làm mất phiên (token refresh), yêu cầu logout/login; gây gián đoạn cho người dùng lâu dài. Phản ứng: thảo luận về UX auth và kịch bản refresh.

- #3000 Voice dictation / microphone input (feature request) — https://github.com/openai/codex/issues/3000  
  Tại sao quan trọng: mong muốn nhập liệu bằng giọng nói cho TUI/IDE là hướng trải nghiệm mới, đặc biệt với workflow lập trình nhanh. Phản ứng: nhiều +1 (👍77) và thảo luận tính khả thi/ETA.

- #10665 Native Azure DevOps (Azure Repos) Integration — https://github.com/openai/codex/issues/10665  
  Tại sao quan trọng: tích hợp Git không chỉ trên GitHub mà còn Azure Repos là nhu cầu doanh nghiệp; thiếu hỗ trợ ảnh hưởng adoption tại tổ chức. Phản ứng: upvote đáng kể (👍25).

- #13549 Codex App on Windows referencing Windows-hosted config when using WSL — https://github.com/openai/codex/issues/13549  
  Tại sao quan trọng: WSL là luồng làm việc phổ biến trên Windows; sai chỗ cấu hình gây mismatch môi trường/command. Phản ứng: nhiều người báo lỗi tương tự, ảnh hưởng trải nghiệm dev trên Windows.

- #13717 Runaway rg processes + high CPU/RAM after extension update — https://github.com/openai/codex/issues/13717  
  Tại sao quan trọng: extension gây tải cao/tiêu tốn tài nguyên là vấn đề nghiêm trọng cho IDEs, ảnh hưởng năng suất. Phản ứng: báo cáo real-world (5 bình luận) — cần fix cấp tốc.

- #13854 Usage being counted to wrong models — https://github.com/openai/codex/issues/13854  
  Tại sao quan trọng: đo lường usage sai model có thể ảnh hưởng billing và limits; liên quan tới thread rate-limits chung. Phản ứng: mới được báo, có thể liên kết nhóm rate-limit/billing.

- #13811 stream disconnected before completion (network/request errors) — https://github.com/openai/codex/issues/13811  
  Tại sao quan trọng: lỗi streaming/HTTP làm gián đoạn response kéo dài, ảnh hưởng CLI/App reliability. Phản ứng: nhiều báo cáo thời gian cố định (5 bình luận) — có khả năng liên quan hạ tầng mạng/endpoint.

4) Tiến độ PR quan trọng (10 PR, tính năng / sửa lỗi)
- #13096 Introduce rollout store and in-memory source — https://github.com/openai/codex/pull/13096  
  Mô tả: Tạo RolloutStore / InMemoryRolloutSource để chuẩn hóa đọc/ghi rollout metadata, cải thiện reconstruction & in-memory caching.

- #13692 Add guardian approval MVP (CLOSED) — https://github.com/openai/codex/pull/13692  
  Mô tả: Thêm luồng reviewer guardian cho on-request approvals; giữ feature sau flag features.guardian_approval — quan trọng cho kiểm soát an toàn thao tác có rủi ro.

- #13841 tui: clarify pending steer follow-ups — https://github.com/openai/codex/pull/13841  
  Mô tả: Cải thiện UI/TUI cho pending steers và queued follow-ups, mô tả hành vi Esc (interrupts) — tăng rõ ràng UX tương tác người/nhiều bước.

- #13593 Stabilize flaky tests — https://github.com/openai/codex/pull/13593  
  Mô tả: Sửa test flakiness (đặc biệt trên Windows/app-server) bằng deterministic waits và helpers — quan trọng để giữ CI ổn định.

- #13777 Fix subagent notifications after interruptive resend — https://github.com/openai/codex/pull/13777  
  Mô tả: Chia sẻ AgentControl giữa clones để trạng thái interrupt-follow-up hiển thị nhất quán; giảm thông báo bị sai lệch.

- #13850 feat: make interrupt state not final for multi-agents — https://github.com/openai/codex/pull/13850  
  Mô tả: Thay đổi lifecycle: trạng thái interrupted không final nữa để cho phép parent chờ tiếp — sửa hành vi multi-agent/interrupt race.

- #13829 add js_repl polling and reuse unified_exec managed process lifecycle — https://github.com/openai/codex/pull/13829  
  Mô tả: Thêm polling mode cho js_repl và tái dùng cơ chế sandbox/managed-process, cho incremental logs và reusable session IDs — cải thiện trải nghiệm kernel JS.

- #13276 start of hooks engine — https://github.com/openai/codex/pull/13276  
  Mô tả: MVP cho hooks (SessionStart/Stop), hook engine chuyên dụng; thiết kế blocking hook execution — nền tảng cho extension event-driven.

- #13448 seatbelt: honor split filesystem sandbox policies — https://github.com/openai/codex/pull/13448  
  Mô tả: Sửa generation policy macOS Seatbelt để tôn trọng carveouts filesystem và split network rules — quan trọng cho sandboxing và an toàn runtime trên macOS.

- #13702 fix(subagents) share execpolicy by default — https://github.com/openai/codex/pull/13702  
  Mô tả: Nếu user persist approval cho execpolicy trong subagent, mặc định nên propagate — cải thiện UX permission và giảm yêu cầu xác thực lặp.

5) Xu hướng yêu cầu tính năng (tổng hợp từ Issues)
- Hỗ trợ nền tảng: macOS Intel / Universal builds và cải thiện trải nghiệm Windows/WSL (Issues #10410, #13549, #13699).  
- Tích hợp SCM doanh nghiệp: Azure DevOps / Azure Repos tương đương GitHub (Issue #10665).  
- Nhập liệu giọng nói / mic trong IDE/TUI và CLI (Issue #3000).  
- Hooks / extensibility engine để chạy sự kiện session (PR #13276).  
- Quản lý rollout, flags và hot-reload config (PR #13096, PR #13839).  
- JS REPL/polling và cải thiện managed process lifecycle (PR #13829).  
- Tùy chỉnh và lan truyền chính sách execpolicy cho subagents (PR #13702, PR #13850).  
- Cải thiện hiển thị/UX cho pending suggestions & interrupts (PR #13841).

6) Điểm đau của nhà phát triển (tổng kết các vấn đề lặp lại)
- Rate limits / usage accounting không nhất quán: người dùng báo giảm giới hạn đột ngột và usage bị quy sai model; ảnh hưởng billing & trust. (Issues #13568, #13854)  
- Authentication/token refresh thất bại: refresh token bị "already used", yêu cầu re-login gây gián đoạn. (Issue #9634)  
- Windows/WSL-specific problems: config location mismatches, non-interactive shells không load NVM (node/pnpm missing), launching cwd dùng \\?\ namespace gây lỗi toolchain (Issues #13549, #13566, #13845). Tác động lớn đến dev Node/JS ecosystem.  
- Network/stream reliability: stream disconnected / error sending requests ảnh hưởng CLI và app streaming responses. (Issues #12764, #13811)  
- Extension/IDE resource issues: runaway rg processes, high CPU/RAM sau update extension — làm chậm IDE. (Issue #13717)  
- Flaky tests và CI instability, đặc biệt trên Windows/build server — PRs đang cố gắng ổn định. (PR #13593)  
- Sandboxing & permissions complexity: macOS Seatbelt và split filesystem policies có những carveout phức tạp dẫn tới approval paths không mong muốn. (PRs #13448, #13445)  
- Multi-agent/subagent coordination: interrupt behavior, notification sync và execpolicy propagation cần cải thiện để tránh lost state/race. (PRs #13777, #13850, #13702)

Kết luận ngắn gọn
- Hiện tại ưu tiên kỹ thuật rõ ràng: sửa rate-limits/accounting & usage attribution, tăng độ ổn định auth/streaming, và xử lý Windows/WSL integration issues. Về sản phẩm, cộng đồng mong đợi hỗ trợ nền tảng rộng hơn (macOS Intel, Azure Repos) và tính năng nâng cao (voice input, hooks, js_repl polling).  

Tham khảo nhanh: repository chính https://github.com/openai/codex

Nếu bạn muốn, tôi có thể:
- Tạo một checklist kỹ thuật ưu tiên dựa trên tần suất issues để đề xuất roadmap ngắn hạn (2 tuần).  
- Liệt kê log/trace patterns cần thu thập để debug vấn đề rate-limits & usage attribution.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

1) Điểm nổi bật hôm nay
- Phiên bản nightly v0.34.0-nightly.20260307 được phát hành cùng với một preview v0.33.0-preview.5 — thay đổi chính liên quan tới cập nhật changelog cho các preview trước và chuẩn hoá định dạng thời gian trong tài liệu (HH:MM UTC). (Releases: https://github.com/google-gemini/gemini-cli/releases)
- Cộng đồng đang tập trung vào hai trục chính: (1) ổn định/độ tin cậy cho môi trường không tương tác (headless / automation) và (2) cải thiện trải nghiệm agent (giảm lời thuyết minh thừa, nhóm công việc có thể gập/mở).

2) Phát hành phiên bản
- v0.34.0-nightly.20260307.6c3a90645 — Release nightly:
  - Bao gồm changelog cho các bản preview v0.33.0-preview.2 và v0.33.0-preview.3 (PRs #21333, #21347).
  - Tài liệu: chuẩn hoá hiển thị thời gian phát hành sang định dạng HH:MM UTC (PR by @pavan-sh).
  - Link: https://github.com/google-gemini/gemini-cli/releases/tag/v0.34.0-nightly.20260307.6c3a90645
- v0.33.0-preview.5 — Release:
  - Cherry‑pick sửa lỗi từ release/v0.33.0-preview.4 (PR có xung đột).
  - Full changelog: https://github.com/google-gemini/gemini-cli/compare/v0.33.0-preview.4...v0.33.0-preview.5

3) Issues nóng trong cộng đồng (10 chọn lọc)
- #15888 — GEMINI_SANDBOX=UDOCKER: enable sandboxing via Udocker (44 bình luận)  
  Tại sao quan trọng: mở rộng phương án sandbox để chạy trên Android/thiết bị không hỗ trợ Docker/Podman; tác động lớn tới khả năng triển khai trên thiết bị di động/edge. Cộng đồng đang thảo luận chi tiết về tính khả thi kỹ thuật. Link: https://github.com/google-gemini/gemini-cli/issues/15888
- #19664 — Gemini CLI crashed after inactivity with a RangeError: Invalid string length (7 bình luận)  
  Tại sao quan trọng: crash sau nhiều ngày không hoạt động ảnh hưởng tới workflow dài hạn (tmux, session phục hồi). Đã có tham chiếu nội bộ (b/485951886). Link: https://github.com/google-gemini/gemini-cli/issues/19664
- #21111 — Wrong headless mode docs (5 bình luận, area/documentation)  
  Tại sao quan trọng: tài liệu headless sai lệch gây lỗi tự động hoá (positional vs -p/--prompt). Document fixes critical cho scripting/CI. Link: https://github.com/google-gemini/gemini-cli/issues/21111
- #20782 — [Proposal] Stateful Remote WebSocket API for Interactive Control (2 bình luận)  
  Tại sao quan trọng: mở đường cho giao diện web/mobile với khả năng tách rời phiên dài hạn (disconnect/reconnect). Tác động lớn với use‑cases agent/remote control. Link: https://github.com/google-gemini/gemini-cli/issues/20782
- #21461 — Gemini CLI Shell Command does not support aliases (2 bình luận, 🔒 maintainer only)  
  Tại sao quan trọng: gây bất tiện lớn cho người dùng shell (alias không hoạt động trong ‘! cmd’), liên quan tới cách spawn shell; cần fix để giữ trải nghiệm dev native. Link: https://github.com/google-gemini/gemini-cli/issues/21461
- #20886 — Refine subagents UX (2 bình luận, area/agent)  
  Tại sao quan trọng: UX con‑agent/subagent ảnh hưởng trực tiếp tới cách hiển thị lịch sử tool calls và khả năng gỡ lỗi; đang đề xuất expander để xem đầy đủ lịch sử gọi tool. Link: https://github.com/google-gemini/gemini-cli/issues/20886
- #21570 — Prompt Replay Cache to Reduce Redundant Model Calls (1 bình luận)  
  Tại sao quan trọng: đề xuất cache kết quả prompt để tránh gọi model lặp lại — tiết kiệm chi phí và giảm độ trễ. Link: https://github.com/google-gemini/gemini-cli/issues/21570
- #19507 — Some users are reporting React ERROR Maximum update depth exceeded errors (closed, 1 bình luận)  
  Tại sao quan trọng: lỗi React gây crash/UI loop; dù closed, vẫn báo hiệu vùng dễ gặp regressions giao diện. Link: https://github.com/google-gemini/gemini-cli/issues/19507
- #21432 — Improve Agent "Self-Awareness": Accurate CLI Flags, Hotkeys, and Self-Execution (1 bình luận)  
  Tại sao quan trọng: agent cần hiểu chính nó để hướng dẫn người dùng chính xác (hotkeys, flags, tự thực thi) — quan trọng cho tính minh bạch/UX. Link: https://github.com/google-gemini/gemini-cli/issues/21432
- #20924 — Header Redesign Code Review comment fixes (1 bình luận)  
  Tại sao quan trọng: rendering header xấu trên terminal mac mặc định; liên quan tới hiển thị cross‑platform. Link: https://github.com/google-gemini/gemini-cli/issues/20924

4) Tiến độ PR quan trọng (10 nổi bật)
- #21576 — fix(core): improve editor detection on Windows (CLOSED)  
  Nội dung: cải thiện phát hiện editor trên Windows bằng việc tra các đường dẫn cài đặt phổ biến; giải quyết nhiều bug phát hiện editor không trong PATH. Link: https://github.com/google-gemini/gemini-cli/pull/21576
- #21132 — feat(browser): implement input blocker overlay during automation (OPEN)  
  Nội dung: thêm overlay ngăn người dùng can thiệp khi chạy automation không headless; cấu hình disableUserInput mặc định true. Hữu ích cho chạy automation trên GUI. Link: https://github.com/google-gemini/gemini-cli/pull/21132
- #21393 — fix(cli): validate --model argument at startup (OPEN)  
  Nội dung: xác thực model ngay khi khởi động để báo lỗi sớm thay vì thất bại khi gửi request. Tránh nhầm lẫn với tên model không hợp lệ. Link: https://github.com/google-gemini/gemini-cli/pull/21393
- #21356 — fix(core): avoid event-loop stalls when sanitizing binary payloads (CLOSED)  
  Nội dung: tối ưu escapeAnsiCtrlCodes cho Uint8Array/Buffer để tránh traversal byte‑by‑byte trên payload lớn; thêm regression tests. Quan trọng cho hiệu năng và độ ổn định. Link: https://github.com/google-gemini/gemini-cli/pull/21356
- #21288 — feat: Introduce core tool definitions, command action types, and a ne… (OPEN)  
  Nội dung: bổ sung built-in /map command để tự động sinh Mermaid.js architecture diagram của workspace — hữu dụng cho phân tích nhanh cấu trúc dự án. Link: https://github.com/google-gemini/gemini-cli/pull/21288
- #20863 — fix(core): handle AbortError when ESC cancels tool execution (OPEN)  
  Nội dung: khi người dùng nhấn ESC, request bị AbortError; PR xử lý AbortError như cancel bình thường để không hiện stack trace. Cải thiện UX khi huỷ thao tác. Link: https://github.com/google-gemini/gemini-cli/pull/20863
- #21566 — Fix/agent info leak 21555 (OPEN)  
  Nội dung: sửa rò rỉ metadata nội bộ của subagent (ví dụ "Termination Reason: GOAL") vào đầu ra người dùng. Bảo mật/đẹp UX. Link: https://github.com/google-gemini/gemini-cli/pull/21566
- #21287 — fix(docs): fix headless mode docs (OPEN)  
  Nội dung: sửa tài liệu headless để nêu rõ cần dùng -p/--prompt cho non-interactive; đồng bộ docs với hành vi thực tế. Link: https://github.com/google-gemini/gemini-cli/pull/21287
- #21561 — feat(core): support custom base URL via env vars (OPEN)  
  Nội dung: cho phép cấu hình URL base (Gemini/Vertex AI) qua env vars với kiểm tra an toàn — hữu ích cho proxy/gateway enterprise. Link: https://github.com/google-gemini/gemini-cli/pull/21561
- #21426 — feat(cli): add update command to auto-upgrade based on package manager (OPEN)  
  Nội dung: thêm lệnh gemini update để tự động phát hiện package manager (npm/brew/yarn/bun/pnpm) và chạy lệnh upgrade tương ứng — giảm friction cho người dùng. Link: https://github.com/google-gemini/gemini-cli/pull/21426

5) Xu hướng yêu cầu tính năng (tóm tắt các hướng chính)
- Sandboxing trên nền không‑Docker (udocker) để hỗ trợ Android và môi trường hạn chế. (Issue #15888)
- Cải thiện trải nghiệm headless/non‑interactive: sửa docs, đảm bảo output sạch cho scripting, thêm verbosity levels cho headless runs. (Issues #21111, #21433)
- Remote/stateful WebSocket API để điều khiển phiên từ xa và hỗ trợ disconnect/reconnect cho tác vụ lâu. (Issue #20782)
- UX agent: giảm verbosity, milestone-driven prompting, collapsible task groups, cải thiện subagent behaviour (ít “narration” thừa). (Issues #21449–#21454, #21432)
- Hiệu năng & chi phí: prompt replay cache, cache I/O/network calls, tránh gọi model trùng lặp. (Issues #21570, #21519, #21518)
- Platform/interop: custom base URLs, proxy support, Windows editor detection, PTY/pty teardown cross‑platform fixes. (PRs #21561, Issues #21575/#21571, PR #20945)
- Developer ergonomics: /map command, gemini update, non-interactive stats output. (PRs #21288, #21426, #20536)

6) Điểm đau của nhà phát triển (tóm tắt)
- Không đồng nhất giữa interactive vs headless: docs và CLI behavior gây lỗi cho automation; cần làm rõ và bảo đảm output headless “clean” (Issues #21111, PR #21287, #21433).
- Ổn định session / crash: crash sau dài inactivity (RangeError) và lỗi React đôi khi gây remount/loop — ảnh hưởng workflows dài, tmux, suspend/resume. (Issues #19664, #19507, PR #20873)
- Platform support: Windows editor detection, Android sandboxing (udocker), proxy/corp network support — nhiều dev bị cản trở khi môi trường không “standard”. (PR #21576, Issue #15888, Issue #21575)
- UX agent và verbosity: agent quá verbose hoặc tiết lộ metadata nội bộ; cần milestone prompting, collapse task outputs, sửa rò rỉ thông tin. (Issues #21304 group, PR #21566)
- I/O/network performance and cost: nhiều lời kêu gọi cache kết quả prompts / network / file I/O để giảm latency và chi phí API. (Issues #21570, #21519, #21518)
- Shell integration: alias không hoạt động, PTY teardown gây zombie processes, interactive shells sizing sai — ảnh hưởng trực tiếp tới trải nghiệm dev. (Issues #21461, PR #20945, Issue #21494)
- Tooling/automation UX: need for commands to help manage installs/updates and produce machine-readable stats for automation (PRs #21426, #20536).

Tổng kết nhanh: hiện tại cộng đồng đang tập trung vào việc làm cho Gemini CLI ổn định và đáng tin cậy trong kịch bản automation (headless, remote sessions), đồng thời cải thiện UX agent (ít verbose hơn, nhóm công việc gập/mở) và nâng cao tính tương thích nền tảng (Windows/Android/proxy). Nếu bạn muốn góp sức: góp ý tài liệu headless, khảo sát các use‑case udocker, hoặc review PRs về base URL / editor detection là những điểm có tác động tức thì.

Links chung:
- Repository: https://github.com/google-gemini/gemini-cli
- Releases & full changelog: https://github.com/google-gemini/gemini-cli/compare/v0.33.0-preview.4...v0.33.0-preview.5

Nếu cần, tôi có thể gửi phiên bản ngắn gọn cho Slack/maillist (≤10 câu) hoặc tạo checklist dành cho maintainers dựa trên các điểm đau ở mục 6.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

Bản tin cộng đồng GitHub Copilot CLI — 2026-03-07

Nguồn: https://github.com/github/copilot-cli

1) Điểm nổi bật hôm nay
- Copilot CLI vừa có bản chính thức lớn: v1.0.2 (bumped to 1.0 để đánh dấu GA) với một số thay đổi UX trong TUI và xử lý form. Xem release: https://github.com/github/copilot-cli/releases/tag/v1.0.2
- Bản v0.0.423 (2026-03-06) bổ sung thêm các guardrail cho shell command prompts và chặn /share gist cho EMU/GHE Cloud; cũng thay đổi hành vi nhập form/elicitation. Xem release: https://github.com/github/copilot-cli/releases/tag/v0.0.423

2) Phát hành phiên bản
- v1.0.2 (2026-03-06)
  - Mục tiêu: kỷ niệm Copilot CLI đạt general availability — tăng major version lên 1.0.
  - Thay đổi nổi bật: hỗ trợ gõ "exit" như lệnh trống để đóng CLI; ask_user form bây giờ submit bằng Enter và cho phép trả lời tuỳ chỉnh với các trường enum; hỗ trợ trường 'command' (ghi chú: thông báo release có phần bị cắt).
  - Link: https://github.com/github/copilot-cli/releases/tag/v1.0.2
- v0.0.423 (2026-03-06)
  - Bổ sung cảnh báo khi người dùng nhập shell commands có khả năng mở rộng/biến thể nguy hiểm; chặn /share gist cho EMU/GHE Cloud với thông báo lỗi rõ ràng; thay đổi hành vi xác nhận cho một số trường elicitation.
  - Link: https://github.com/github/copilot-cli/releases/tag/v0.0.423

3) Issues nóng trong cộng đồng (10 mục nên theo dõi)
- #575 — Bash execution environment hangs - all commands timeout
  - Tại sao quan trọng: lệnh shell bị treo hoàn toàn khiến tính năng thực thi shell của CLI gần như vô dụng; ảnh hưởng lớn tới trải nghiệm người dùng. Cập nhật gần nhất 2026-03-07. (30 bình luận)
  - Link: https://github.com/github/copilot-cli/issues/575
- #1081 — AggregateError: Failed to list models
  - Tại sao quan trọng: lỗi kết nối/điều phối model khiến CLI không thể thực thi lệnh; ảnh hưởng tới người dùng Enterprise/MCP. (21 bình luận, 👍 8)
  - Link: https://github.com/github/copilot-cli/issues/1081
- #1698 — IME candidate window is misplaced/invisible (CJK)
  - Tại sao quan trọng: nhập liệu CJK (Nhật, Trung, …) bị lỗi hiển thị IME — rất ảnh hưởng với người dùng châu Á; nhiều upvote cho fix. (51 👍)
  - Link: https://github.com/github/copilot-cli/issues/1698
- #1854 — Multi line not working on Copilot CLI 0.0.422-1
  - Tại sao quan trọng: multiline input / shift+enter tưởng tượng nhưng lại submit — tác động trực tiếp tới khả năng soạn prompt phức tạp, đặc biệt trong VS Code. (6 bình luận)
  - Link: https://github.com/github/copilot-cli/issues/1854
- #618 (CLOSED) — Feature Request: Support custom slash commands from .github/prompts
  - Tại sao quan trọng: nhu cầu tích hợp prompt local (như extension VS Code) được cộng đồng rất ủng hộ (90 👍); đã đóng (có thể đã được chấp nhận/triển khai).  
  - Link: https://github.com/github/copilot-cli/issues/618
- #1680 — pwsh.exe hardcoded — CLI unusable on Windows with only PowerShell 5.1
  - Tại sao quan trọng: Windows users gặp lỗi nghiêm trọng khi hệ thống chỉ có powershell.exe (5.1); làm mất khả năng chạy shell commands trên nhiều máy Windows. (4 bình luận, ảnh hưởng lớn)
  - Link: https://github.com/github/copilot-cli/issues/1680
- #1874 — Terminal rendering enters infinite refresh loop when conversation history is long
  - Tại sao quan trọng: session dài gây re-render vô hạn, terminal flicker và không thể dùng tiếp — cần giải pháp giới hạn/virtualize history. (2 bình luận)
  - Link: https://github.com/github/copilot-cli/issues/1874
- #1241 — Cannot paste image from screenshot tools into CLI terminal
  - Tại sao quan trọng: tính năng paste screenshot quảng bá nhưng không hoạt động trên một số cấu hình Windows/Terminal — giảm tính hữu dụng của workflow chia sẻ hình ảnh nhanh. (4 bình luận)
  - Link: https://github.com/github/copilot-cli/issues/1241
- #755 — Read Shell errors (Invalid session ID)
  - Tại sao quan trọng: lỗi session ID khiến việc đọc output shell thất bại, cho thấy vấn đề quản lý session và log; thường xuyên xuất hiện trong ticket hỗ trợ. (nhiều báo cáo)
  - Link: https://github.com/github/copilot-cli/issues/755
- #1857 — Allow users to cancel or remove enqueued messages before they are executed
  - Tại sao quan trọng: không thể hủy các message đã xếp hàng (queued) gây phiền toái khi agent bận; UX quan trọng cho workflows autopilot/autopilot queuing. (3 bình luận, 👍 6)
  - Link: https://github.com/github/copilot-cli/issues/1857

4) Tiến độ PR quan trọng
- Lưu ý: không có Pull Request mới được cập nhật trong 24 giờ qua (theo dữ liệu repo). Link general repo: https://github.com/github/copilot-cli
- Thay vào đó, dưới đây liệt kê các thay đổi/issue đã đóng/merge gần đây có tác động tương đương PR (tóm tắt ngắn):
  1. v1.0.2 release — GA bump and UX tweaks (exit alias, form Enter behavior). Release: https://github.com/github/copilot-cli/releases/tag/v1.0.2
  2. v0.0.423 release — shell guardrails, block /share gist for EMU/GHE Cloud: https://github.com/github/copilot-cli/releases/tag/v0.0.423
  3. #618 (closed) — Custom slash commands support request (wide community demand): https://github.com/github/copilot-cli/issues/618
  4. #1863 (CLOSED) — Elicitation: Allow Enter key to submit forms: https://github.com/github/copilot-cli/issues/1863
  5. #1867 (CLOSED) — Accept 'exit' as alias for /exit: https://github.com/github/copilot-cli/issues/1867
  6. #1885 (CLOSED) — copilot plugin update fails for directly-installed plugins (fix/duplicate of #1290): https://github.com/github/copilot-cli/issues/1885
  7. #1866 (CLOSED) — Login hangs on ubuntu (investigations/fixes merged): https://github.com/github/copilot-cli/issues/1866
  8. #1854 (CLOSED) — Multiline input behavior fixes in some builds: https://github.com/github/copilot-cli/issues/1854
  9. #1698 (CLOSED) — IME candidate window fixes (CJK improvements): https://github.com/github/copilot-cli/issues/1698
  10. #838 (CLOSED) — Vietnamese IME input rendering fixes in overlay: https://github.com/github/copilot-cli/issues/838
- Ghi chú: các item trên nhiều khi là kết quả của PR/merge; nếu bạn cần danh sách PR cụ thể, đề xuất chạy API/GraphQL GitHub để lấy lịch sử PR.

5) Xu hướng yêu cầu tính năng (tóm tắt hướng cộng đồng quan tâm)
- Tùy biến lệnh slash / prompt local: hỗ trợ .github/prompts/ custom slash commands (ứng dụng cho teams và workflow lặp lại).
- Model routing & per-agent model selection: cần chọn model cho mỗi agent/subagent và routing cấu hình.
- IDE/integration: mở rộng /ide để hỗ trợ IDE khác ngoài VS Code (Visual Studio, JetBrains…).
- Session management: session forking, session IDs trong hook payload để traceability, và khả năng hủy các message trong hàng đợi.
- Tích hợp dev environment: packaging (docker image) để cài nhanh trên máy không có Node.js.
- Tùy chỉnh UI/TUI: status line tuỳ biến, kiểm soát lịch sử/virtualize history để tránh re-render.
- Better Windows interoperability: hỗ trợ PowerShell 5.1 (powershell.exe) và các shell phổ biến trên Windows.
- Configuration ergonomics: hỗ trợ biến môi trường trong mcp-config (${VAR}), .github/lsp.json & .github/mcp.json đọc đúng.
- Billing/usage visibility: hiển thị overage premium request khi quota cá nhân vượt.
- Clipboard/image workflows: paste screenshot/clipboard image support across terminal hosts.

6) Điểm đau của nhà phát triển (vấn đề lặp lại, cần ưu tiên)
- Thực thi shell bị treo/timeouts và session management không ổn: #575, #755, #686 — dẫn đến trải nghiệm không thể chạy lệnh hoặc đọc output reliably.
- Windows-specific breakages: hardcoded pwsh.exe vs powershell.exe (không tương thích PS5.1) — #1680.
- Terminal rendering & flicker với session dài hoặc khi "thinking": #158, #1874 — làm CLI không ổn định khi lịch sử lớn.
- IME và input composition cho ngôn ngữ CJK / Vietnamese: #1698, #838 — trải nghiệm nhập liệu quan trọng cho nhiều vùng.
- Elicitation / forms UX: cần Enter để submit, hỗ trợ enum + custom responses — đã có tiến triển (#1863, v1.0.2 notes), nhưng vẫn nhiều báo cáo.
- Plugin lifecycle & updates: plugin update/install thông tin source bị mất gây lỗi update (#1885, #1290).
- Paste hình ảnh / clipboard inconsistencies: #1241 — workflow chia sẻ nhanh bị gián đoạn trên Windows Terminal.
- Không có cơ chế hủy/điều chỉnh hàng đợi lệnh: #1857 — cần queuing/cancel controls cho autopilot/autopruning.
- Observability / tracing: hook payload thiếu session id (#1425) — khó debug/điều tra sự cố.
- Quản lý quota và hiển thị thông tin overage: #1881 — cần minh bạch khi vượt hạn mức premium.

Kết luận ngắn
- Bản 1.0.2 đánh dấu mốc GA; nhiều cải tiến UX nhỏ đã được đưa vào (Enter để submit form, alias exit). Tuy nhiên một số vấn đề nền tảng (shell execution hangs, Windows PowerShell compatibility, terminal rendering, session handling) vẫn là các pain point có ảnh hưởng lớn đến trải nghiệm. Cộng đồng đang yêu cầu cải tiến về model routing, session control và tích hợp IDE/flows.

Muốn nhận bản tin hàng tuần? Tôi có thể tự động trích xuất và gửi bản tóm tắt định kỳ (sử dụng API GitHub) hoặc mở rộng thành checklist hành động (triage/labels/PRs cần ưu tiên).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

Kimi Code CLI — Bản tin cộng đồng (2026-03-07)

1) Điểm nổi bật hôm nay
- Không có phát hành mới trong 24 giờ qua. Tin quan trọng: hai PR sửa lỗi header HTTP/OAuth được mở (#1360, #1361) xử lý tình trạng lỗi kết nối/protocol do giá trị header không hợp lệ.  
- Ba issue đang hot liên quan đến lỗi kết nối LLM / lỗi API 400 và đề xuất cải thiện UX cho slash commands — đây là những điểm đau ảnh hưởng trực tiếp đến trải nghiệm dev và độ ổn định.

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (mới/được cập nhật trong 24 giờ qua)
Lưu ý: chỉ có 3 issue mới/được cập nhật trong 24 giờ theo dữ liệu nguồn; liệt kê tất cả bên dưới.

- #1285 — Bug: LLM provider error: Connection error.  
  Tác giả: @perogeremmer | Tạo: 2026-02-27 | Cập nhật: 2026-03-07 | Bình luận: 8 | 👍 0  
  Link: https://github.com/MoonshotAI/kimi-cli/issues/1285  
  Tại sao quan trọng: lỗi kết nối tới provider LLM gây gián đoạn trực tiếp cho luồng làm việc (generate/code assist). Nhiều bình luận cho thấy vấn đề tái diễn trên Linux, cần log chẩn đoán và retry/backoff rõ ràng.  
  Phản ứng cộng đồng: thảo luận kỹ về môi trường, logs và khả năng liên quan tới header/HTTP.

- #1346 — API Error: 400 {"error":{"type":"invalid_request_error","message":"Invalid request Error"},"type":"error"}  
  Tác giả: @xytd20 | Tạo: 2026-03-05 | Cập nhật: 2026-03-07 | Bình luận: 6 | 👍 0  
  Link: https://github.com/MoonshotAI/kimi-cli/issues/1346  
  Tại sao quan trọng: lỗi 400 từ API làm ngắt chức năng và khó debug nếu message chung chung. Có khả năng tương quan với thay đổi model/provider hoặc payload không hợp lệ.  
  Phản ứng cộng đồng: đề nghị thêm logging payload, request ID và cách tái hiện lỗi để developer/support xử lý.

- #751 — Slash commands execute immediately upon selection. (enhancement)  
  Tác giả: @Grin1024 | Tạo: 2026-01-28 | Cập nhật: 2026-03-07 | Bình luận: 3 | 👍 0  
  Link: https://github.com/MoonshotAI/kimi-cli/issues/751  
  Tại sao quan trọng: UX hiện tại yêu cầu nhấn Enter hai lần — gây cản trở dòng thao tác nhanh. Việc thực thi ngay khi chọn sẽ nâng cao trải nghiệm tương tác CLI.  
  Phản ứng cộng đồng: đề xuất rõ ràng, ít xung đột kỹ thuật nhưng cần kiểm tra tương thích với hotkeys/confirm flows.

4) Tiến độ PR quan trọng (mới/được cập nhật trong 24 giờ qua)
Lưu ý: hai PR mới/được cập nhật trong 24 giờ theo dữ liệu nguồn.

- #1361 — fix: strip whitespace from oauth header values  
  Tác giả: @0xsirsaif | Tạo/Cập nhật: 2026-03-07 | 👍 0  
  Link: https://github.com/MoonshotAI/kimi-cli/pull/1361  
  Mô tả ngắn: Trimming whitespace dẫn/trailing trên giá trị header OAuth và header chung trước khi gửi. Giải quyết các lỗi như X-Msh-Os-Version chứa whitespace và ngăn httpx.LocalProtocolError.  
  Tại sao quan trọng: xử lý các giá trị header không hợp lệ là cách tiếp cận nhanh để giảm lỗi protocol/connection, cải thiện độ ổn định khi platform/version trả chuỗi bất thường.

- #1360 — fix: replace platform.version() with system+release for HTTP headers  
  Tác giả: @T1mn | Tạo/Cập nhật: 2026-03-07 | 👍 0  
  Link: https://github.com/MoonshotAI/kimi-cli/pull/1360  
  Mô tả ngắn: Thay platform.version() (có thể chứa ký tự '#' như trên một số kernel Ubuntu) bằng tổ hợp system + release để sinh header HTTP hợp lệ; khắc phục httpx.LocalProtocolError (fixes #1332).  
  Tại sao quan trọng: loại lỗi này gây crash/protocol error trên một số distro; PR cải thiện tính tương thích đa nền tảng cho header HTTP.

Trạng thái chung: cả hai PR đều mở và nhắm đến việc khắc phục nguyên nhân gốc dẫn tới lỗi kết nối/LocalProtocolError. Chưa thấy phản hồi nhiều (comments undefined), khuyến nghị reviewer kiểm thử trên các distro phổ biến.

5) Xu hướng yêu cầu tính năng (tổng hợp từ các issue hiện có)
- Cải thiện robustness kết nối tới LLM providers: retry/backoff, better error messages, và logging request/response IDs. (từ #1285, #1346)  
- Kiểm tra và chuẩn hóa header HTTP/OAuth: loại bỏ whitespace, dùng giá trị platform phù hợp để tránh vi phạm spec HTTP. (dẫn đến PR #1360, #1361)  
- Tối ưu UX tương tác CLI (slash commands): giảm số phím cần nhấn, hành vi chọn/execute trực tiếp. (từ #751)  
- Tăng cường thông tin lỗi API (chi tiết hơn cho 400s) và hướng dẫn tái tạo lỗi cho người dùng.

6) Điểm đau của nhà phát triển (tóm tắt các vấn đề thường gặp)
- Lỗi kết nối đến provider LLM khiến trải nghiệm bị gián đoạn; nguyên nhân có thể là network, format header, hoặc lỗi protocol từ httpx. (được nêu trong #1285)  
- Lỗi 400 “Invalid request” thiếu ngữ cảnh: người dùng cần request payload, request id, và logs để debug. (được nêu trong #1346)  
- Header HTTP không hợp lệ do platform.version() hoặc whitespace gây httpx.LocalProtocolError; dẫn đến crash hoặc kết nối bị từ chối — đã có PR sửa. (được xử lý bởi #1360, #1361)  
- UX CLI nhỏ nhưng phiền phức: hành vi slash commands hiện tại không trực quan cho người dùng gõ nhanh. (từ #751)  
- Thiếu phản hồi/triaging kịp thời cho issues: nhiều issue có bình luận nhưng chưa có ghi nhận kế hoạch hành động rõ ràng — cần maintainer prioritization và release notes.

Kết luận & khuyến nghị ngắn
- Ưu tiên merge/kiểm thử #1360 và #1361 để giảm lỗi protocol/connection; đồng thời bổ sung thêm logging cho các lỗi 400/connection để nhanh chóng triage.  
- Với UX (slash commands), chuẩn bị PR nhỏ thay đổi hành vi Enter để cải thiện trải nghiệm — đây là low-risk, high-impact.  
- Yêu cầu contributor khi report lỗi cung cấp request payload, môi trường (OS/kernel), và logs để rút ngắn vòng debug.

Tài nguyên nhanh
- Issue #1285: https://github.com/MoonshotAI/kimi-cli/issues/1285  
- Issue #1346: https://github.com/MoonshotAI/kimi-cli/issues/1346  
- Issue #751: https://github.com/MoonshotAI/kimi-cli/issues/751  
- PR #1361: https://github.com/MoonshotAI/kimi-cli/pull/1361  
- PR #1360: https://github.com/MoonshotAI/kimi-cli/pull/1360

Nếu cần, tôi có thể soạn checklist reviewer cho hai PR liên quan header hoặc mẫu template bug report để thu thập logs/request payload hiệu quả hơn.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

OpenCode Community Bulletin — 2026-03-07

1) Điểm nổi bật hôm nay
- Nhiều vấn đề liên quan Windows/Terminal và Desktop/Web UI tiếp tục chi phối thảo luận (hàng loạt issue báo lỗi EPERM, MCP không phản hồi, thông báo malware). Xem #631, #16314, #16449, #16458.  
- Vấn đề liên quan context window của Claude Opus 4.6 (1M token) và header beta vẫn đang gây ảnh hưởng lớn tới người dùng, kèm theo PR đang tiến tới hỗ trợ header này (#12338, PR #16153).  
Links: https://github.com/anomalyco/opencode

2) Phát hành phiên bản
- Không có phiên bản mới trong 24 giờ qua.

3) Issues nóng trong cộng đồng (10 mục đáng chú ý)
1. Windows Support — #631  
   https://github.com/anomalyco/opencode/issues/631  
   Tại sao quan trọng: tổng hợp “siêu-issue” theo dõi mọi vấn đề Windows (installer, terminal, MCP, antivirus). Có 202 bình luận và nhiều lượt +, là đầu mối cho trải nghiệm người dùng Windows.  
2. Copilot auth now sets far too many requests as "user" — #8030  
   https://github.com/anomalyco/opencode/issues/8030  
   Tại sao quan trọng: báo cáo khiến quota premium bị tiêu hao nhanh do header X-Initiator sai; tác động chi phí cho người dùng tích hợp Copilot. (166 bình luận, 54 👍)  
3. vim motions in input box (tui) — #1764  
   https://github.com/anomalyco/opencode/issues/1764  
   Tại sao quan trọng: đề xuất UX/TUI cấp thiết cho người dùng power-user (vim keybindings trong input), nhiều + (109) và thảo luận thiết kế.  
4. 1M tokens for Opus 4.6 — #12338  
   https://github.com/anomalyco/opencode/issues/12338  
   Tại sao quan trọng: người dùng không thể tận dụng context window 1M token do giới hạn 200k — ảnh hưởng tới workflows lớn; tranh luận về cấu hình và header beta. (19 bình luận, 24 👍)  
5. Trojan: Script/Wacatac.H!m! after update 1.2.20 (Windows) — #16314  
   https://github.com/anomalyco/opencode/issues/16314  
   Tại sao quan trọng: báo cáo cảnh báo AV sau cập nhật, khiến app không chạy — rủi ro tin cậy và trải nghiệm cài đặt trên Windows. (17 bình luận)  
6. Desktop UI crashes on load (Cannot read properties of undefined (reading 'id')) — #16459  
   https://github.com/anomalyco/opencode/issues/16459  
   Tại sao quan trọng: crash khởi động Desktop/Web UI ảnh hưởng ngay lập tức tới người dùng; blocker trải nghiệm GUI. (10 bình luận)  
7. Models output duplicate responses — #13791  
   https://github.com/anomalyco/opencode/issues/13791  
   Tại sao quan trọng: lỗi mô hình trả về câu trả lời trùng lặp (GLM, Kimi), ảnh hưởng chất lượng UX/automations. (9 bình luận)  
8. Infinite loop — #11398  
   https://github.com/anomalyco/opencode/issues/11398  
   Tại sao quan trọng: báo cáo trường hợp agent/model vào vòng lặp vô hạn — rủi ro chi phí và tính sẵn sàng. (8 bình luận)  
9. Mouse wheel stops working after some usage on Windows Terminal — #7316  
   https://github.com/anomalyco/opencode/issues/7316  
   Tại sao quan trọng: trải nghiệm TUI trên Windows Terminal bị ảnh hưởng (không thể cuộn), trực tiếp làm giảm khả năng đọc lịch sử. (6 bình luận)  
10. Opencode is super slow / huge snapshot file — #16438  
    https://github.com/anomalyco/opencode/issues/16438  
    Tại sao quan trọng: báo cáo hiệu năng nghiêm trọng (reply chậm, snapshot file ~16GB) — tác động tới cả built-in và remote models, chỉ ra vấn đề lưu trữ/compaction. (5 bình luận)

4) Tiến độ PR quan trọng (10 PR nổi bật)
1. fix(opencode): prevent plugin deduplication collision for index.js entry points — PR #11161  
   https://github.com/anomalyco/opencode/pull/11161  
   Nội dung: sửa collision khi plugin có entry point index.js, tránh ghi đè/nhập nhằng tên plugin.  
2. fix: show streaming progress for large tool inputs instead of stuck Preparing write — PR #16024  
   https://github.com/anomalyco/opencode/pull/16024  
   Nội dung: cải thiện hiển thị TUI khi AI ghi file lớn (>100KB), tránh trạng thái "Preparing write..." bị treo.  
3. fix: improve compaction continuation to prevent agent from stopping — PR #16073  
   https://github.com/anomalyco/opencode/pull/16073  
   Nội dung: sửa quy trình compaction để agent không bị dừng sau khi compact — liên quan trực tiếp tới vấn đề hiệu năng/agent stopping.  
4. feat(session): add lifecycle management — storage reclamation, CLI commands, VACUUM support — PR #16201  
   https://github.com/anomalyco/opencode/pull/16201  
   Nội dung: thêm quản lý vòng đời session, thu hồi dung lượng, lệnh CLI và hỗ trợ VACUUM để giảm snapshot/log growth.  
5. fix(tui): fix toggling in /mcp within the TUI — PR #16431  
   https://github.com/anomalyco/opencode/pull/16431  
   Nội dung: sửa thao tác toggle trong dialog /mcp của TUI (đóng/mở bằng Space) cho một số terminal (ví dụ VS Code integrated).  
6. fix(storybook): restore build by mocking useLocation — PR #16472  
   https://github.com/anomalyco/opencode/pull/16472  
   Nội dung: khôi phục build Storybook bằng cách mock useLocation, sửa lỗi build môi trường dev/docs.  
7. fix(app): text-shimmer undefined length — PR #16475  
   https://github.com/anomalyco/opencode/pull/16475  
   Nội dung: sửa lỗi 500 trên desktop liên quan đến text-shimmer (TypeError do undefined length).  
8. fix(app): sticky accordion scroll issue — PR #16408  
   https://github.com/anomalyco/opencode/pull/16408  
   Nội dung: duy trì scroll đúng khi đóng sticky accordion trên UI.  
9. feat(gitlab): send context-1m-2025-08-07 beta header to enable 1M context window — PR #16153  
   https://github.com/anomalyco/opencode/pull/16153  
   Nội dung: thêm header beta (anthropic-beta: context-1m-2025-08-07) vào aiGatewayHeaders cho GitLab Duo để unlock context 1M token — trực tiếp giải quyết #12338.  
10. feat: add /model x/y command to switch models — PR #2490  
    https://github.com/anomalyco/opencode/pull/2490  
    Nội dung: thêm command nhanh /model để chuyển model trực tiếp (UX TUI tiện lợi hơn).

5) Xu hướng yêu cầu tính năng (tổng hợp)
- Hỗ trợ Windows toàn diện: nhiều issue gom các lỗi Windows (MCP, antivirus false-positive, terminal artifacts). (ví dụ #631, #16314, #16449, #16458)  
- Mở rộng và cấu hình context window cho mô hình lớn (1M token) — yêu cầu gửi header beta đúng để unlock (issues #12338, #12507; PR #16153).  
- TUI ergonomics: vim keybindings trong input, keybind/session scrolling, paste behavior, mouse wheel — nhiều yêu cầu UX cho người dùng terminal (#1764, #14577, #10444, #7316).  
- Ổn định agent: ngăn agent dừng sau compaction, tránh infinite loops, xử lý tool_use/tool_result mismatch (#16073, #11398, #1662).  
- Quản lý session & storage: lifecycle, compaction, VACUUM, snapshot growth → PR #16201; nhiều report chậm/ổ cứng.  
- Cải thiện lỗi mô hình (duplicate outputs, fast mode support): yêu cầu hỗ trợ “fast mode” cho Opus 4.6 và xử lý duplicate trả lời (#12923, #13791).  
- Plugins: xử lý plugin dedup/entrypoint, tốt hơn cho JS plugins (#11161, #1765).  
- Observability / lỗi rõ ràng: nhiều issue than phiền về lỗi không rõ ràng hoặc crash stack traces (desktop/web) — mong muốn logs/diagnostics tốt hơn (#16459, #16473).

6) Điểm đau của nhà phát triển (tóm tắt các vấn đề thường gặp)
- Windows reliability: cài đặt, AV false-positive, MCP không phản hồi, EPERM khi spawn rg.exe — gây ngưng sử dụng ngay lập tức (xem #631, #16314, #16449, #16458).  
- TUI input/scroll regressions: không thể paste, mất scroll, keybinds không hoạt động hoặc không nhất quán giữa terminal (xem #3081, #14577, #7316, #10444).  
- Hiệu năng và storage bloat: snapshot/log files phình to (GB), compaction không ổn định → real-world slowdowns (xem #16438, PR #16073, PR #16201).  
- Mismatch model capabilities vs config: model hỗ trợ 1M tokens nhưng client/server không gửi header cần thiết; người dùng bị giới hạn 200k (xem #12338, #12507, PR #16153).  
- Agent/tool failures gây silent crash: tool name length, missing tool_result blocks, infinite loops — nhiều trường hợp dẫn tới agent “chết” hoặc dừng xử lý (xem #3523, #1662, #11398).  
- UX desktop/web crashes: TypeError undefined thuộc tính làm app hiển thị “Something went wrong” — gây mất niềm tin GUI (xem #16459, #16473).

Kết luận ngắn gọn
- Ưu tiên hiện tại: khắc phục Windows/MCP và GUI crashes, hoàn thiện hỗ trợ context-1M cho Opus 4.6, và cải thiện compaction/session lifecycle để giảm snapshot growth và agent stoppages. Các PR liên quan (#16073, #16201, #16153, #16024) đang xử lý nhiều vấn đề then chốt.

Cần theo dõi nhanh: #631, #8030, #12338, PR #16153, PR #16073.

— Truy cập repo để đọc chi tiết từng báo cáo / PR: https://github.com/anomalyco/opencode

Nếu bạn muốn, tôi có thể tạo bản tóm tắt short-form để đăng lên Slack/Discord (1–2 câu chính cho mỗi danh mục).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

Qwen Code — Bản tin cộng đồng (2026-03-07)

1) Điểm nổi bật hôm nay
- Phát hành nightly v0.12.0 có hai sửa lỗi/tiện ích tập trung vào CLI và tô màu mã: sửa parsing frontmatter Markdown trên Windows (CRLF/BOM) và thêm hỗ trợ tabWidth/chuẩn hoá tab thành space trong CodeColorizer. (Xem chi tiết PRs bên dưới.)
- Dòng PR về UI/IDE tiếp tục sôi động: bổ sung chế độ sidebar/multi-position cho VS Code companion và nhiều PR điều chỉnh trải nghiệm khởi động/ cảnh báo thư mục người dùng.

2) Phát hành phiên bản
- v0.12.0-nightly.20260307.0b7ad066 — Release notes tóm tắt:
  - fix(cli): parse markdown command frontmatter trên Windows (CRLF/BOM). PR: https://github.com/QwenLM/qwen-code/pull/2078
  - feat: thêm tabWidth support cho code highlighting và thay tab bằng spaces trong CodeColorizer. PR: https://github.com/QwenLM/qwen-code/pull/2077
  - (Tag release): https://github.com/QwenLM/qwen-code/releases/tag/v0.12.0-nightly.20260307.0b7ad066

3) Issues nóng trong cộng đồng (24h qua — tất cả 9 issue được cập nhật)
Lưu ý: trong 24 giờ có 9 issue được cập nhật; liệt kê tất cả theo độ quan trọng kỹ thuật / mức ảnh hưởng.

- #1902 — deleting chat history in the CLI (OPEN, needs-triage, feature-request)  
  Tại sao quan trọng: người dùng CLI muốn xoá lịch sử chat để tránh tích tụ dữ liệu không cần thiết; ảnh hưởng UX và quyền riêng tư.  
  Tác giả/Trạng thái: @slimeopus | 3 bình luận | https://github.com/QwenLM/qwen-code/issues/1902

- #2186 — Space character input not working in Qwen (OPEN, bug)  
  Tại sao quan trọng: gõ dấu cách không hoạt động trong input chat (VS Code integrated terminal) làm gián đoạn tương tác hàng ngày; tác động lớn đến developer productivity. Có 1 bình luận và 1 👍.  
  Tác giả/Trạng thái: @TarasVP | https://github.com/QwenLM/qwen-code/issues/2186

- #2191 — Error during web search: THROTTLING.userQPSLimit (OPEN, bug)  
  Tại sao quan trọng: lỗi 429 khi gọi WebSearch làm gián đoạn workflow phụ thuộc công cụ tìm kiếm; đang diễn ra >3 ngày theo báo cáo. Cần áp dụng backoff / quota handling.  
  Tác giả/Trạng thái: @xDeshe4ka | https://github.com/QwenLM/qwen-code/issues/2191

- #2190 — tools (OPEN, bug)  
  Tại sao quan trọng: lỗi nội bộ liên quan đến tool_call / tool messages (InternalError.Algo.InvalidParameter) gây hỏng luồng tích hợp công cụ — có thể làm hỏng automation/agent flows.  
  Tác giả/Trạng thái: @chuckyLeeVIII | https://github.com/QwenLM/qwen-code/issues/2190

- #2187 — ✕ [API Error: Connection error.] 怎么解决 (OPEN, bug)  
  Tại sao quan trọng: lỗi kết nối/ API error khi đăng nhập Qwen Code; ảnh hưởng lớn đến người dùng Windows và trải nghiệm khởi tạo. Báo cáo kèm thông tin client.  
  Tác giả/Trạng thái: @firehzx77 | https://github.com/QwenLM/qwen-code/issues/2187

- #2185 — MCP "Add Server" command does nothing (OPEN, bug)  
  Tại sao quan trọng: tính năng quản lý server trong MCP không mở dialog như mong đợi — blocker cho người cấu hình server trong Extension.  
  Tác giả/Trạng thái: @capri07 | https://github.com/QwenLM/qwen-code/issues/2185

- #2165 — testest (OPEN, bug / placeholder)  
  Tại sao quan trọng: mặc dù là ticket test, cho thấy có người đang gặp lỗi / thử nghiệm; cần rời triage để lọc spam vs. bug thực sự.  
  Tác giả/Trạng thái: @AlexNova-ops | https://github.com/QwenLM/qwen-code/issues/2165

- #2112 — Thinking messages are not displayed after session load (CLOSED, VSCode IDE Companion)  
  Tại sao quan trọng: thinking/reasoning messages biến mất khi nạp lại session — ảnh hưởng tính minh bạch reasoning trong companion. Đã đóng, có PRs liên quan khôi phục.  
  Tác giả/Trạng thái: @yiliang114 | https://github.com/QwenLM/qwen-code/issues/2112

- #821 — Failed to initialize Qwen: Qwen OAuth authentication failed (CLOSED, P1)  
  Tại sao quan trọng: lỗi OAuth khởi tạo ngăn người dùng login từ CLI; là một vấn đề P1 đã được đóng lại nhưng vẫn được cập nhật. Thông tin debug hữu ích cho support.  
  Tác giả/Trạng thái: @yshngg | https://github.com/QwenLM/qwen-code/issues/821

4) Tiến độ PR quan trọng (chọn 10)
- #2188 — feat(vscode-ide-companion): add sidebar view and multi-position chat layout  
  Nội dung: thêm entry Activity Bar và hỗ trợ chat multi-position (sidebar, bottom panel, secondary side bar), cho phép kéo thả native để đổi vị trí. Quan trọng cho UX VS Code.  
  Link: https://github.com/QwenLM/qwen-code/pull/2188

- #2174 — feat(core): discover project skills from .agents/skills  
  Nội dung: scan `.agents/skills` cùng với `.qwen/skills` để phát hiện skills ở mức project; không thay đổi precedence. Mở đường cho cấu trúc agent-centric.  
  Link: https://github.com/QwenLM/qwen-code/pull/2174

- #2063 — [v0.12.0] refactor(acp): migrate ACP integration to @agentclientprotocol/sdk (CLOSED)  
  Nội dung: chuyển sang dùng chính thức @agentclientprotocol/sdk; loại bỏ implementation tùy biến, chuẩn hóa types/handling. Tốt cho duy trì/compatibility.  
  Link: https://github.com/QwenLM/qwen-code/pull/2063

- #2173 — fix(vscode): expand stored thoughts in fallback session loads  
  Nội dung: chuyển persisted `thoughts` thành `thinking` chat messages khi load session fallback; sửa lỗi hiển thị reasoning.  
  Link: https://github.com/QwenLM/qwen-code/pull/2173

- #2172 — fix(vscode): preserve thought parts in session reader  
  Nội dung: bảo toàn phần "assistant thought" riêng biệt khi parse JSONL sessions; cải thiện fidelity của session replay.  
  Link: https://github.com/QwenLM/qwen-code/pull/2172

- #2170 — fix(vscode): restore thinking messages from JSONL sessions  
  Nội dung: tái tạo assistant thought parts như các `thinking` messages khi load JSONL; bổ sung test regression.  
  Link: https://github.com/QwenLM/qwen-code/pull/2170

- #2181 — feat(ui): add minimal loading phrase set  
  Nội dung: thêm setting `ui.loadingPhraseSet` với option `minimal` để dùng các loading phrase trung tính; vẫn giữ custom phrases ưu tiên. Tốt cho trải nghiệm nhẹ nhàng hơn.  
  Link: https://github.com/QwenLM/qwen-code/pull/2181

- #2180 — feat(ui): add setting to suppress root directory warning  
  Nội dung: setting `ui.suppressRootDirectoryWarning` để bỏ cảnh báo khi chạy từ filesystem root — giảm tiếng ồn khởi động.  
  Link: https://github.com/QwenLM/qwen-code/pull/2180

- #2159 — feat(ui): add setting to suppress home directory warning  
  Nội dung: `ui.suppressHomeDirectoryWarning` để tắt cảnh báo chạy từ home directory; ôn hoà hoá trải nghiệm CLI/IDE.  
  Link: https://github.com/QwenLM/qwen-code/pull/2159

- #2189 — Fix typo in class name  
  Nội dung: sửa chính tả class name "Thingking" → "Thinking". Nhỏ nhưng tránh nhầm lẫn/tech debt.  
  Link: https://github.com/QwenLM/qwen-code/pull/2189

5) Xu hướng yêu cầu tính năng (tổng quan từ Issues/PRs)
- Kiểm soát lịch sử chat / xóa chat từ CLI (yêu cầu riêng tư, #1902).  
- Tùy chọn giao diện/positioning chat trong VS Code (sidebar, panel, multi-position) — cải thiện workspace layout (#2188, #1954).  
- Quản trị cảnh báo khởi động: tắt cảnh báo home/root hoặc hiển thị đường dẫn chính xác (nhiều PR của @echoVic: #2176/#2178/#2180/#2159).  
- Mở rộng discovery cho project skills: hỗ trợ `.agents/skills` (#2174, docs updates #2177/#2179).  
- Cải thiện session replay/hiển thị reasoning/thinking messages (vấn đề #2112 + PRs #2170/#2172/#2173).  
- Tăng khả năng phục hồi mạng/thoả thuận rate-limit cho WebSearch và gọi công cụ (429 throttling, tool_call errors #2191/#2190).

6) Điểm đau của nhà phát triển (tổng hợp ngắn gọn)
- Xác thực / kết nối không ổn định: OAuth/device-flow lỗi khởi tạo và API connection errors (ví dụ #821, #2187) — cần logging tốt hơn và hướng dẫn recovery.  
- Tương tác trong terminal/IDE: lỗi ký tự space không gõ được trong input chat (VS Code integrated terminal, #2186) là blocker UX.  
- Quản lý tool/agent: lỗi tool_call / thiếu response messages dẫn đến InternalError ( #2190 ) — ảnh hưởng flows tự động hoá.  
- Rate limits / throttling cho web search: 429 làm gián đoạn các tính năng dùng websearch (#2191). Cần backoff/retry và thông báo rõ ràng.  
- Tiếng ồn khởi động & hành vi mặc định: nhiều người yêu cầu tắt cảnh báo phiền nhiễu hoặc cung cấp option để suppress (hàng loạt PR UI settings của @echoVic).  
- Session replay và hiển thị reasoning: mất/thay đổi thinking messages khi load session ảnh hưởng reproducibility/debugging (đang được sửa bằng một loạt PR).

Kết luận ngắn
- Đợt cập nhật hôm nay tập trung sửa các lỗi nền tảng (Windows parsing, code highlighting) và tiến triển rõ rệt về UX trong VS Code (sidebar/multi-position), đồng thời cộng đồng đang đẩy mạnh các thay đổi nhằm giảm tiếng ồn khởi động, cải thiện session replay và ổn định authentication/tool integrations. Nếu bạn đang gặp các lỗi authenticate/connection, space-input hoặc throttle websearch — theo dõi các issue tương ứng và cung cấp logs giúp đội phát triển ưu tiên sửa.

Tham khảo nhanh (links)
- Repo: https://github.com/QwenLM/qwen-code
- Release nightly: https://github.com/QwenLM/qwen-code/releases/tag/v0.12.0-nightly.20260307.0b7ad066
- Một số issue/PR đã nêu trong bản tin:  
  Issues: #1902 https://github.com/QwenLM/qwen-code/issues/1902 | #2186 https://github.com/QwenLM/qwen-code/issues/2186 | #2191 https://github.com/QwenLM/qwen-code/issues/2191 | #2190 https://github.com/QwenLM/qwen-code/issues/2190 | #2187 https://github.com/QwenLM/qwen-code/issues/2187 | #2185 https://github.com/QwenLM/qwen-code/issues/2185 | #2112 https://github.com/QwenLM/qwen-code/issues/2112 | #821 https://github.com/QwenLM/qwen-code/issues/821  
  PRs: #2188 https://github.com/QwenLM/qwen-code/pull/2188 | #2174 https://github.com/QwenLM/qwen-code/pull/2174 | #2063 https://github.com/QwenLM/qwen-code/pull/2063 | #2173 https://github.com/QwenLM/qwen-code/pull/2173 | #2172 https://github.com/QwenLM/qwen-code/pull/2172 | #2170 https://github.com/QwenLM/qwen-code/pull/2170 | #2181 https://github.com/QwenLM/qwen-code/pull/2181 | #2180 https://github.com/QwenLM/qwen-code/pull/2180 | #2159 https://github.com/QwenLM/qwen-code/pull/2159 | #2189 https://github.com/QwenLM/qwen-code/pull/2189

Nếu bạn muốn, tôi có thể soạn đề xuất ngắn cho maintainers về thứ tự ưu tiên sửa lỗi (authentication / space-input / tool_call / throttling) kèm checklist debug cần thu thập từ người báo lỗi.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*