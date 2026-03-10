# Bản tin Hệ sinh thái OpenClaw 2026-03-10

> Issues: 500 | PRs: 500 | Dự án: 12 | Thời gian tạo: 2026-03-10 01:53 UTC

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

⚠️ Tạo tóm tắt thất bại.

---

## So sánh hệ sinh thái chéo

Dưới đây là báo cáo so sánh chéo ngắn gọn, chuyên nghiệp và có dữ liệu hỗ trợ (tổng hợp từ các bản tin dự án bạn cung cấp, tính đến 2026-03-10).

1) Tổng quan hệ sinh thái (3–5 câu)
- Hệ sinh thái mã nguồn mở về AI agent / trợ lý cá nhân hiện rất sôi động: nhiều dự án triển khai đồng thời cải thiện kênh giao tiếp (Telegram/Feishu/Slack/QQ/Discord), mở rộng provider (Mistral/Anthropic/Copilot/Minimax/llama.cpp), và tập trung vào orchestration tool/MCP.  
- Xu hướng chung là chuyển từ “demo/proof‑of‑concept” sang “đi vào production”: dự án tăng cường timeout/retry, token-budgets, packaging (Docker/GLIBC/arm), cùng cơ chế auth/OAuth multi-provider.  
- Đồng thời, nhiều dự án gặp cùng nút thắt: ổn định channel media/markdown, packaging/compatibility, và quản lý credential/multi‑tenant — cho thấy điểm nghẽn vận hành nhiều hơn là thiếu tính năng ý tưởng.

2) So sánh mức độ hoạt động
(Dữ liệu: số issue/PR “cập nhật trong 24h” theo từng bản tin; “Release” = có phát hành mới ghi nhận; Health = 1 (rủi ro cao) → 5 (khỏe).)

Project | Issues (24h) | PRs (24h) | Release hôm nay | Health (1–5)
---|---:|---:|:---:|---:
NanoBot | 19 | 67 | No | 3 — Rất năng động; nhiều PR lớn nhưng có blocker production (global lock, timeouts).
Zeroclaw | 24 | 50 | No | 3 — Cộng đồng lớn; nhiều lỗi packaging (GLIBC/Docker) cần khắc phục.
PicoClaw | 18 | 79 | Yes (v0.2.1 + nightly) | 4 — Release gần đây, nhiều fixes kênh & provider.
NanoClaw | 28 | 50 | No | 3 — Hoạt động cao, nhưng rủi ro bảo mật/credential & token refresh.
IronClaw | 35 | 50 | No | 3 — Tập trung CI/agent stability; có issue jobs infinite-retry (ưu tiên).
LobsterAI | 15 | 26 | No | 3 — Nhiều fix IM/MCP; còn rủi ro hiệu năng shell/agent.
TinyClaw | 2 | 26 | No | 4 — Nhiều fix ổn định đã merge; PR lớn đang chờ review (monorepo/queue).
Moltis | 12 | 9 | Yes (v0.10.18) | 4 — Release gần đây; ưu tiên runtime sandbox & OAuth.
CoPaw | ~50 issues/PR | 50 PRs | Yes (v0.0.6 / .post1) | 4 — Desktop packaging, nhiều CI/packaging work; active.
ZeptoClaw | 2 | 3 | No | 2 — Nhỏ, phụ thuộc nhiều vào fixes cho WhatsApp/credential.
EasyClaw | 4 | 0 | No | 3 — Hoạt động nhẹ nhưng phản hồi nhanh; issue đa‑modal cần xử lý.

Ghi chú: số lượng thể hiện hoạt động 24h theo từng bản tin; Health là đánh giá tổng hợp dựa trên hoạt động, lượng lỗi nghiêm trọng và mức độ release.

3) Vị thế của OpenClaw
- Hiện không có tóm tắt cập nhật OpenClaw trong dữ liệu hôm nay (bản tin thất bại). Tuy nhiên, vì bạn đặt OpenClaw làm “tham chiếu chính”, có thể coi OpenClaw là repo/tiêu chuẩn tham chiếu trong hệ sinh thái (plugin/extension model, node‑runner, federation patterns thường xuất hiện trong các dự án khác).  
- Ưu thế tiềm năng (so với các dự án nhỏ hơn): nếu OpenClaw có ecosystem plugin và node/federation readiness thì nó sẽ chiếm vai trò “hub” (provider-agnostic, plugin marketplace, standard tool API) — điều mà nhiều dự án đang cố gắng bám sát (ví dụ: OpenClaw‑style plugin preinstall ở LobsterAI, node-runner ở Zeroclaw).  
- Khác biệt kỹ thuật: các dự án thay đổi theo chiều hướng “tối giản + dễ deploy” (TinyClaw, PicoClaw) hoặc “enterprise/connector-rich” (Zeroclaw, Moltis, LobsterAI). OpenClaw nếu là nền tảng tham chiếu sẽ cần cân bằng scale, plugin spec và governance.

4) Hướng kỹ thuật chung — các yêu cầu xuất hiện ở nhiều dự án
- Multi-provider auth / OAuth & provider registry (NanoBot, Moltis, NanoClaw, PicoClaw, LobsterAI) — nhu cầu: hỗ trợ OAuth cho Copilot/Gemini/enterprise tokens và proxy routing.  
- Tool / MCP interoperability & shared tool servers (NanoBot, PicoClaw, LobsterAI, CoPaw) — nhu cầu: Model Context Protocol hoặc tương đương để chia sẻ tool giữa subagents/agents.  
- Interruptible agents / async event injection / session interruption (NanoBot, IronClaw, CoPaw) — nhu cầu: user interruption, cancel long-running tasks, token budgets.  
- Packaging & runtime compatibility (Zeroclaw, Moltis, TinyClaw, PicoClaw) — GLIBC, Docker-in-Docker, arm builds, GHCR visibility; người dùng cần binary/image dễ chạy.  
- Channel media & formatting consistency (Telegram/QQ/Feishu/Slack/Discord/WeCom) (NanoBot, PicoClaw, LobsterAI, CoPaw) — nhu cầu xử lý media URLs, filename collisions, markdown/duplicate replies.  
- Credential & multi‑tenant management (NanoClaw, CoPaw, Zeroclaw) — per-group credentials, token refresh, secret leakage prevention.  
- Local / self-hosted LLM support (CoPaw, PicoClaw, TinyClaw) — llama.cpp/gguf/ollama support và UX cho local models.

5) Phân tích khác biệt hóa (trọng tâm, khách hàng, kiến trúc)
- Trọng tâm tính năng
  - Enterprise/connectors-first: Zeroclaw, LobsterAI (MS365, Google Workspace, Notion, M365 connectors). Đối tượng: tổ chức cần automation & enterprise integrations.  
  - Lightweight / ease-of-deploy / CLI-first: TinyClaw, PicoClaw. Đối tượng: dev cá nhân, hobbyists, self-hosters.  
  - Channel/IM-first (multi‑IM experience): LobsterAI, PicoClaw, NanoBot, CoPaw — chú trọng trải nghiệm trên nền tảng IM doanh nghiệp/tiếng Trung.  
  - Desktop / consumer UX: CoPaw (native installers, AppImage) — hướng tới người dùng desktop không chuyên.  
- Kiến trúc & ops
  - Federation / node runner: Zeroclaw (node-runner, reconnect), OpenClaw-style node patterns — hướng ra scale/distributed.  
  - Minimal dependencies / single‑binary friendliness: TinyClaw (SQLite queue proposal), mục tiêu giảm Redis/BullMQ friction.  
  - MCP/tool server orientation: NanoBot, PicoClaw, CoPaw — thiết kế theo microservice tool servers để share tool capabilities.  
- Người dùng mục tiêu
  - Doanh nghiệp & automation teams: Zeroclaw, Moltis, LobsterAI.  
  - Enthusiasts / self-hosters: TinyClaw, PicoClaw, CoPaw.  
  - Lightweight integrators / OEMs: NanoBot, NanoClaw (provider-flexibility).

6) Động lực & độ trưởng thành của cộng đồng
- Phân tầng hoạt động
  - Rất hoạt động và nhanh lặp (nhiều PR/issue): PicoClaw, CoPaw, NanoBot, IronClaw, Zeroclaw — nhiều PR lớn, release/nightly, tích cực review.  
  - Ổn định / release-focused: Moltis, TinyClaw — có release gần đây và chú trọng ổn định; TinyClaw nhanh fix regressions.  
  - Nhỏ / early-stage: ZeptoClaw, EasyClaw — ít PR, phản hồi nhanh nhưng cần tăng trưởng contributor.  
- Độ trưởng thành
  - Đã bước sang giai đoạn “production-hardening”: CoPaw, Moltis, PicoClaw (packaging, desktop, Docker edge-cases).  
  - Nhanh lặp nhưng chưa ổn định production: NanoBot, Zeroclaw, IronClaw — tính năng nhiều nhưng còn blocker packaging / runtime.  
  - Cần phát triển cộng đồng/CI: ZeptoClaw, EasyClaw — thích hợp cho các đóng góp hướng usability.

7) Tín hiệu xu hướng (giá trị tham khảo cho nhà phát triển AI agent)
- Chuẩn hoá tools/MCP sẽ tăng: nếu bạn xây agent/tool, làm cho tool server tương thích MCP-like sẽ tối đa hoá khả năng tái sử dụng giữa các agent. (được yêu cầu ở NanoBot, PicoClaw, LobsterAI)  
- Hỗ trợ multi-provider + OAuth enterprise là ưu tiên áp đảo: thiết kế registry/provider-agnostic auth flow và token proxying sẽ mở cánh cửa tích hợp với Copilot/Gemini/Mistral/enterprise. (NanoBot, Moltis, NanoClaw)  
- UX kênh (media, threads, markdown) gây nhiều friction thực tế: test end‑to‑end trên Telegram/Feishu/QQ/Slack/Discord, chuẩn hoá media URL handling và message chunking. (PicoClaw, NanoBot, LobsterAI, CoPaw)  
- Packaging/runability > features cho adoption: GLIBC/Docker/arm/ghcr visibility và giảm phụ thuộc (sqlite queue, single-binary) giúp tăng adoption cho self-hosters. (Zeroclaw, TinyClaw, PicoClaw)  
- Safety / operational controls là bắt buộc khi chuyển sang production: token-budgets, cancel/interrupt, tool-guards, per-group credentials cần thiết để bảo vệ chi phí & dữ liệu. (IronClaw, NanoClaw, CoPaw)

Kết luận ngắn (cho người ra quyết định kỹ thuật)
- Nếu mục tiêu là “tăng tốc adoption”: ưu tiên cải thiện packaging (Docker/GLIBC/arm, GHCR) và auth multi‑provider; điều này giải quyết nút thắt chung giữa nhiều dự án.  
- Nếu mục tiêu là “mở rộng tích hợp”: xây MCP-compatible tools và chuẩn OAuth/provider registry sẽ gia tăng khả năng tích hợp vào hệ sinh thái (được nhiều dự án yêu cầu).  
- Nếu là nhà phát triển agent: tập trung vào (1) provider-agnostic auth + token refresh, (2) tool-call/MCP interoperability, (3) channel media/formatting consistency — ba yếu tố này là điểm khác biệt quyết định khi cạnh tranh/được tích hợp trong hệ sinh thái.

Nếu bạn muốn, tôi có thể:
- xuất bản bản tóm tắt ngắn (1 trang) cho từng maintainer với top-3 hành động ưu tiên, hoặc  
- tạo checklist kỹ thuật (MCP spec + OAuth flow + media handling tests) để áp dụng chung trong nhiều repo.

---

## Báo cáo các dự án cùng nhóm

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

NanoBot — Bản tin dự án (2026-03-10)

1) Tổng quan hôm nay
- Hoạt động cộng đồng rất cao: 19 issue được cập nhật trong 24 giờ qua (16 mở/hoạt động, 3 đóng) và 67 PR có hoạt động (54 mở, 13 đã merge/đóng). Điều này cho thấy cả người dùng lẫn đóng góp viên đang tích cực đề xuất tính năng và sửa lỗi.  
- Không có phát hành mới hôm nay. Tập trung hiện tại là mở rộng provider, độ bền (timeouts/retries), và trải nghiệm kênh (Telegram/QQ/Slack).  
- Những chủ đề nổi bật: hỗ trợ OAuth cho các provider ngoài OpenAI, Model Context Protocol (MCP) / công cụ chia sẻ, và khả năng ngắt/gián đoạn tác vụ đang chạy.

2) Phát hành phiên bản
- Không có bản phát hành/phiên bản mới được công bố hôm nay.

3) Tiến độ dự án
- Trong 24 giờ qua có 13 PR được merge/đóng (tổng số PR cập nhật 67). Nhiều PR trọng tâm vẫn đang ở trạng thái open và chờ review/CI.  
- Một số PR/changes quan trọng đang được đẩy mạnh:
  - Cải thiện khả năng ngắt tác vụ và cơ chế event bất đồng bộ để cho phép "user interruption" (#1233 — async event injection) và interrupt-on-new-message trong session (#1789). Link PR: https://github.com/HKUDS/nanobot/pull/1233, https://github.com/HKUDS/nanobot/pull/1789
  - Kiến trúc dispatcher/ACP runtime để tách ingress channel khỏi runtime thực thi (hướng tới scale & gateway) (#1724). Link: https://github.com/HKUDS/nanobot/pull/1724
  - Cải thiện provider/timeout/retry cho OpenAI Codex: làm timeout cấu hình được và thêm retry cho lỗi tạm thời (#1788). Link: https://github.com/HKUDS/nanobot/pull/1788
  - Nhiều PR liên quan kênh Telegram (media URL handling, filename collision, nhóm mention-only) để cải thiện độ ổn định trải nghiệm người dùng (#1793, #1796, #1801). Links: https://github.com/HKUDS/nanobot/pull/1793, https://github.com/HKUDS/nanobot/pull/1796, https://github.com/HKUDS/nanobot/pull/1801
  - Cải thiện quản lý mem‑ory auto-consolidation state (#1795). Link: https://github.com/HKUDS/nanobot/pull/1795
  - Thêm provider Mistral / cải thiện transcription (#1680). Link: https://github.com/HKUDS/nanobot/pull/1680

4) Chủ đề nóng trong cộng đồng
- Hỗ trợ GitHub Copilot / OAuth cho các provider bên ngoài: Issue #140 (9 bình luận, 4 👍) — người dùng hỏi về kế hoạch hỗ trợ Copilot providers. Link: https://github.com/HKUDS/nanobot/issues/140  
- MCP (Model Context Protocol) / chia sẻ công cụ: Issue #359 (8 👍) và PR #1429 (share MCP tools with subagents) — nhu cầu dùng MCP-compatible tool servers lớn, đặc biệt cho workflow có connector/database. Link issue: https://github.com/HKUDS/nanobot/issues/359, PR: https://github.com/HKUDS/nanobot/pull/1429  
- Web search backend nên swappable: Issue #1719 (8 👍) và PR #398 (add configurable web search providers) — nhiều PR cố gắng thêm các provider nhưng thiếu seam chung để mở rộng. Link: https://github.com/HKUDS/nanobot/issues/1719, PR: https://github.com/HKUDS/nanobot/pull/398  
- Khả năng ngắt/tương tác khi agent đang chạy: Issue #1762 (bot không thể bị gián đoạn) — liên quan trực tiếp đến PR về interruption (#1233, #1789). Link: https://github.com/HKUDS/nanobot/issues/1762

5) Lỗi & Ổn định (xếp hạng theo mức độ tác động)
- Cao (blocker / gây mất chức năng):
  - Global lock _processing_lock gây Agent bị chặn và cron jobs không chạy (Issue #1781). Cần ưu tiên vì ảnh hưởng đến tác vụ nền. Link: https://github.com/HKUDS/nanobot/issues/1781
  - OpenAICodex hardcoded 60s timeout + không retry dẫn đến silent failures cho công việc dài (Issue #1783). Đã có PR xử lý: #1788 (thêm timeout cấu hình và retry). Link issue: https://github.com/HKUDS/nanobot/issues/1783, PR: https://github.com/HKUDS/nanobot/pull/1788
- Trung bình (ảnh hưởng UX / reliability):
  - Environment variables bị bỏ qua khi config.json tồn tại (Issue #1791). PR #1798 đã mở để merge environment overrides trước khi validate. Link issue: https://github.com/HKUDS/nanobot/issues/1791, PR: https://github.com/HKUDS/nanobot/pull/1798
  - Telegram trả lời hai lần (một có markdown, một không) (Issue #1692). Có PR/issue liên quan đến kênh Markdown/QQ rendering; một số PR Telegram đang xử lý media/filename và rendering. Link: https://github.com/HKUDS/nanobot/issues/1692
  - message tool không xử lý gửi ảnh từ MCP tools đúng cách (Issue #1792). PR #1793 (support HTTP(S) URLs for media) đề cập việc Telegram tự tải media nếu là URL. Link issue: https://github.com/HKUDS/nanobot/issues/1792, PR: https://github.com/HKUDS/nanobot/pull/1793
- Thấp (cá nhân hóa / môi trường):
  - v0.1.4.post3 → v0.1.4.post4 nâng cấp bằng source gặp lỗi (Issue #1765). Link: https://github.com/HKUDS/nanobot/issues/1765
  - 403 trên Render liên quan đến prompt/system message dài (Issue #1777) — PR docs #1790 thay đổi ví dụ history search để tránh snippet gây lỗi. Link issue: https://github.com/HKUDS/nanobot/issues/1777, PR: https://github.com/HKUDS/nanobot/pull/1790

6) Yêu cầu tính năng & tín hiệu lộ trình
- Hỗ trợ OAuth cho nhiều provider (GitHub Copilot, Google Gemini, v.v.) — Issue #397 và #140: người dùng cần tích hợp provider thương mại khác và flow đăng nhập an toàn. Link: https://github.com/HKUDS/nanobot/issues/397
- MCP / Model Context Protocol tool support: nhiều người dùng muốn Nanobot có công cụ MCP chính thức, có thể chia sẻ công cụ giữa subagent và agent chính (Issue #359, PR #1429). Link: https://github.com/HKUDS/nanobot/issues/359, https://github.com/HKUDS/nanobot/pull/1429
- Mở rộng registry các providers (Minimax missing — Issue #581) và các provider mới như Mistral (PR #1680). Link: https://github.com/HKUDS/nanobot/issues/581, https://github.com/HKUDS/nanobot/pull/1680
- Web search pluggable: nhiều PR/issue hướng đến cấu hình provider tìm kiếm có thể thay thế (Issue #1719, PR #398). Link: https://github.com/HKUDS/nanobot/issues/1719, https://github.com/HKUDS/nanobot/pull/398
- Dự đoán khả năng được đưa vào bản tiếp theo: OAuth multi‑provider login, MCP tool first-class support, session interruption/async event injection, cấu hình web-search provider plugin, cải thiện timeouts/retries cho providers.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Khó tích hợp provider ngoài OpenAI (auth + registry) — người dùng muốn dùng Copilot/Gemini/Minimax/Mistral.
  - Tính năng "dừng/điều chỉnh" tác vụ khi agent đang chạy thiếu — gây trải nghiệm không linh hoạt trong hội thoại dài hoặc cron jobs.
  - Media & Markdown rendering không nhất quán giữa các kênh (Telegram/QQ/Slack), dẫn đến trả lời trùng lặp hoặc mất định dạng.
  - Reliability: hardcoded timeouts, thiếu retry, global locks và env vars không được ưu tiên khiến deployment trong môi trường production gặp phiền phức.
- Mức độ hài lòng: cộng đồng tích cực đóng góp, nhưng có rõ ràng sự không hài lòng với trải nghiệm provider và ổn định trong môi trường sản xuất. Các PR gần đây cho thấy bảo trì đang đáp ứng nhiều vấn đề quan trọng.

8) Theo dõi tồn đọng (cần chú ý của maintainer)
- Issue & PR cần tập trung review / quyết định sớm:
  - #140 Do you have any plans to support GitHub Copilot providers? (open, thảo luận nhiều) — https://github.com/HKUDS/nanobot/issues/140
  - #397 支持多模型聚合平台与OAuth认证 (open) — https://github.com/HKUDS/nanobot/issues/397
  - #581 Missing Minimax provider in provider registry (open) — https://github.com/HKUDS/nanobot/issues/581
  - #359 Feature Request: MCP Tool Support (open, nhiều upvote) — https://github.com/HKUDS/nanobot/issues/359
  - #1719 web_search backend should be swappable (open) — https://github.com/HKUDS/nanobot/issues/1719
  - PRs quan trọng chờ review/merge: #1233 (async event injection), #1724 (ACP runtime/dispatcher), #1490 (Langfuse observability), #1680 (Mistral provider), #398 (web providers). Links: https://github.com/HKUDS/nanobot/pull/1233, https://github.com/HKUDS/nanobot/pull/1724, https://github.com/HKUDS/nanobot/pull/1490, https://github.com/HKUDS/nanobot/pull/1680, https://github.com/HKUDS/nanobot/pull/398
- Khuyến nghị ngắn:
  - Ưu tiên fix những vấn đề gây block cho production: global lock (#1781), timeouts/retry (#1783 → #1788), env overrides (#1791 → #1798).  
  - Thiết lập roadmap nhỏ cho OAuth/provider support và MCP để hướng cộng đồng đóng góp theo spec rõ ràng.  
  - Sắp xếp và review các PR liên quan kênh (Telegram/Slack/QQ) để giảm số issue lặp lại về media/markdown behavior.

Kết luận ngắn: dự án đang rất năng động với nhiều đóng góp hướng mở rộng provider và cải thiện độ ổn định. Một số vấn đề về reliability và auth/provider integration là nút thắt chính; nếu được ưu tiên sẽ nâng trải nghiệm production và mở rộng khả năng tích hợp.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

Zeroclaw — Bản tin dự án (2026-03-10)

1) Tổng quan hôm nay
- Hoạt động cộng đồng mạnh: 24 issues và 50 PRs có cập nhật trong 24 giờ qua, cho thấy cả việc báo lỗi và đóng góp tính năng đang diễn ra nhanh.  
- Tỷ lệ mở/hoạt động cao: 21 issues đang mở/hoạt động và 47 PRs vẫn chờ review, nên yêu cầu duyệt PR và sửa lỗi cấp cao đang là nút thắt.  
- Lĩnh vực ưu tiên rõ ràng: nhiều báo cáo liên quan đến tích hợp kênh (Slack/Feishu/Matrix), tương tác với providers (embedding/LLM/tool-calling) và vấn đề đóng gói/khả năng chạy (GLIBC, Docker, Raspberry Pi).  
- Không có bản phát hành mới hôm nay.

2) Phát hành phiên bản
- Không có phiên bản mới được phát hành hôm nay.

3) Tiến độ dự án (PRs đã merge/đóng hôm nay, tính năng nổi bật)
- Tổng quan: Trong 24h có 50 PRs được cập nhật; trạng thái báo cáo cho biết 3 PRs đã được merge/đóng.  
- PR đã đóng đáng chú ý:
  - #3089 (CLOSED) feat(openclaw_node): persistent node runner + reconnect fix — thêm lệnh node-run lâu dài, auto-reconnect và một số sửa lỗi giao thức/ TLS. Link: https://github.com/zeroclaw-labs/zeroclaw/pull/3089
- PRs đang chờ review (đang được đẩy mạnh, nhiều PR cùng tác giả @rareba):
  - Tích hợp file handling & Slack media hardening: #3086 — https://github.com/zeroclaw-labs/zeroclaw/pull/3086
  - Hệ thống TTS và STT đa-provider: #2994 (TTS) và #2995 (STT) — https://github.com/zeroclaw-labs/zeroclaw/pull/2994 , https://github.com/zeroclaw-labs/zeroclaw/pull/2995
  - Nhiều tool tích hợp doanh nghiệp: Microsoft 365 (#3042), Google Workspace CLI (#2987), NotionChannel (#3003) — https://github.com/zeroclaw-labs/zeroclaw/pull/3042 , https://github.com/zeroclaw-labs/zeroclaw/pull/2987 , https://github.com/zeroclaw-labs/zeroclaw/pull/3003
  - Voice-loop / hands-free audio: #3005 — https://github.com/zeroclaw-labs/zeroclaw/pull/3005
  - Security ops & playbooks: #3027 — https://github.com/zeroclaw-labs/zeroclaw/pull/3027

4) Chủ đề nóng trong cộng đồng (issues/PRs hoạt động nhiều)
- channel-lark / Feishu naming & default enablement — Issue #3012 (8 bình luận): Yêu cầu đổi tên/đề xuất bật mặc định cho hỗ trợ Feishu/Lark. Link: https://github.com/zeroclaw-labs/zeroclaw/issues/3012  
  - Nhu cầu: trải nghiệm tích hợp kênh cho thị trường châu Á, cấu hình mặc định hợp lý để giảm friction triển khai.
- GLIBC compatibility (critical runtime failure) — Issue #3070 (6 bình luận, tag S0): lỗi "./zeroclaw: libc.so.6: version `GLIBC_2.39' not found". Link: https://github.com/zeroclaw-labs/zeroclaw/issues/3070  
  - Nhu cầu: binary/packaging tương thích với nhiều distro; ảnh hưởng trực tiếp khả năng chạy trên host cũ/CI.
- Branch naming / contributor confusion — Issue #2929 (5 bình luận): tranh luận master vs main. Link: https://github.com/zeroclaw-labs/zeroclaw/issues/2929  
  - Nhu cầu: làm rõ nhánh chính của repo để giảm sai sót khi rebase/CI.
- Những chủ đề liên quan khác đang nhận chú ý: tool-calling regression với Ollama/Qwen (#3079), embedding provider key misrouting (#3083), panic với chuỗi tiếng Trung (#3024).

5) Lỗi & Ổn định — ưu tiên và trạng thái
- S0 (Critical / có thể làm repo không chạy / rủi ro an ninh)
  - #3070 GLIBC_2.39 not found — runtime/daemon không khởi động trên nhiều hệ thống. (Link) https://github.com/zeroclaw-labs/zeroclaw/issues/3070
- S1 (High / workflow blocked)
  - #2487 Invalid schema for function 'channel_ack_config' — lỗi chat/LLM tool-calling gây từ chối provider. https://github.com/zeroclaw-labs/zeroclaw/issues/2487
  - #2905 Rust compiler queries overflow compiling matrix-sdk — build failure. https://github.com/zeroclaw-labs/zeroclaw/issues/2905
  - #2930 Unbound variable during docker bootstrap on macOS — bootstrap.sh --docker thất bại. https://github.com/zeroclaw-labs/zeroclaw/issues/2930
- S2 (Medium / degraded behavior)
  - #3083 Embedding provider uses default_provider API key instead of embedding_provider's key — gửi sai key đến OpenAI → 401. https://github.com/zeroclaw-labs/zeroclaw/issues/3083
  - #3088 token cost not working for channels — cost tracker hiển thị $0.00. https://github.com/zeroclaw-labs/zeroclaw/issues/3088
  - #3079 Ollama+Qwen tool-calling regression — tool calls bị bỏ qua / malformed. https://github.com/zeroclaw-labs/zeroclaw/issues/3079
- S3 (Minor / docs/UX)
  - #3012 channel-lark naming & docs, #2929 master vs main (như trên).
- Hồi quy / build break:
  - #3063 Docker build fails — Dockerfile thiếu COPY data/ sau merge security vectordb guard (nguyên nhân gây lỗi đọc data). https://github.com/zeroclaw-labs/zeroclaw/issues/3063
- PR/tương quan sửa lỗi:
  - #3085 fix(security): honor allowed_roots — PR này trực tiếp giải quyết vấn đề tương tự issue #3082 (allowed_roots/ workspace_only). Link PR: https://github.com/zeroclaw-labs/zeroclaw/pull/3085 (và issue #3082: https://github.com/zeroclaw-labs/zeroclaw/issues/3082)
  - #3089 (CLOSED) node-run reconnect fix — đã đóng, cải thiện transport/reconnect (liên quan đến node stability). https://github.com/zeroclaw-labs/zeroclaw/pull/3089

6) Yêu cầu tính năng & tín hiệu lộ trình
- Tích hợp provider & tooling: nhiều PR của @rareba cho thấy lộ trình mở rộng connectors: Microsoft 365 (#3042), Google Workspace CLI (#2987), Notion (#3003) — hướng tới doanh nghiệp/automation. Links: https://github.com/zeroclaw-labs/zeroclaw/pull/3042 , https://github.com/zeroclaw-labs/zeroclaw/pull/2987 , https://github.com/zeroclaw-labs/zeroclaw/pull/3003
- Audio: TTS multi-provider (#2994) và STT multi-provider (#2995) cùng với voice-loop (#3005) cho thấy ưu tiên trải nghiệm thoại/hands-free. https://github.com/zeroclaw-labs/zeroclaw/pull/2994 , https://github.com/zeroclaw-labs/zeroclaw/pull/2995 , https://github.com/zeroclaw-labs/zeroclaw/pull/3005
- Node / federation: OpenClaw node runner và secure node transport (#2999, #3089) → hướng đến deploy phân tán/an toàn. https://github.com/zeroclaw-labs/zeroclaw/pull/2999 , https://github.com/zeroclaw-labs/zeroclaw/pull/3089
- Security & observability: semantic vectordb guard, MCSS security ops tool (#3027), cost-tracking fixes — nhu cầu tăng cường kiểm soát an ninh và chi phí. https://github.com/zeroclaw-labs/zeroclaw/pull/3027

Dự đoán: Phiên bản tiếp theo nhiều khả năng sẽ tập trung vào (1) cải thiện các connector doanh nghiệp (MS365, Google Workspace), (2) audio/voice (STT/TTS/voice-loop), (3) độ ổn định packaging (GLIBC, Docker, arm builds) và (4) bảo mật/guardrail.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Khả năng chạy/packaging: GLIBC mismatch (#3070), Docker build break (#3063), thiếu binary/hỗ trợ Raspberry Pi (#3043) gây trải nghiệm cài đặt tồi.  
  - Tích hợp kênh không ổn định: Slack thread reply missing (#3084), Feishu naming/not enabled (#3012), Matrix onboarding khó dùng (#2916).  
  - Hoạt động tool-calling và providers: Ollama/Qwen tool-calls bị bỏ, embedding gửi sai API key (#3083), gây gián đoạn hành vi agent.  
  - UX/Docs: nhánh main/master gây nhầm lẫn (#2929); cần readme/dịch ngôn ngữ đã được PR (#3087) nhưng contributor flow vẫn rối.  
- Mức độ hài lòng: Người dùng tích cực đóng góp tính năng (nhiều PR tính năng lớn), nhưng nhiều báo lỗi cơ bản khiến trải nghiệm triển khai và vận hành bị giảm — tức: hào hứng với tính năng nhưng bức xúc với ổn định/packaging.

8) Theo dõi tồn đọng (cần chú ý từ maintainers)
- Issues cần ưu tiên review/fix:
  - #3070 GLIBC_2.39 not found — blocker cho nhiều người dùng. https://github.com/zeroclaw-labs/zeroclaw/issues/3070
  - #3063 Docker build fails (missing data files after merge) — ảnh hưởng CI/build từ source. https://github.com/zeroclaw-labs/zeroclaw/issues/3063
  - #3083 Embedding provider uses wrong API key — lỗi bảo mật/authorization. https://github.com/zeroclaw-labs/zeroclaw/issues/3083
  - #3024 Panic with Chinese characters (string slicing) — runtime crash; dễ gây mất dữ liệu / agent crash. https://github.com/zeroclaw-labs/zeroclaw/issues/3024
  - #3084 Slack thread replies missing — trải nghiệm kênh quan trọng cho bot. https://github.com/zeroclaw-labs/zeroclaw/issues/3084
- PRs lớn chờ review (rủi ro merge conflict / cần QA):
  - TTS/STT multi-provider: #2994, #2995 — cần tích hợp test end-to-end. https://github.com/zeroclaw-labs/zeroclaw/pull/2994 , https://github.com/zeroclaw-labs/zeroclaw/pull/2995
  - Microsoft365 / Google Workspace / Notion channel: #3042, #2987, #3003 — cần security review & scope gating. https://github.com/zeroclaw-labs/zeroclaw/pull/3042 , https://github.com/zeroclaw-labs/zeroclaw/pull/2987 , https://github.com/zeroclaw-labs/zeroclaw/pull/3003
  - #3086 Slack file handling — test media flows. https://github.com/zeroclaw-labs/zeroclaw/pull/3086
- Việc dọn dẹp / process:
  - #2929 / #3061 liên quan nhánh master vs main / delete stale main — cần quyết định chính thức để giảm nhầm lẫn contributor. https://github.com/zeroclaw-labs/zeroclaw/issues/2929 , https://github.com/zeroclaw-labs/zeroclaw/issues/3061

Kết luận ngắn
- Sức khỏe dự án: cộng đồng rất năng động về tính năng, nhưng các vấn đề về packaging/compatibility và một số hồi quy runtime đang làm giảm trải nghiệm người dùng. Ưu tiên ngắn hạn nên là: (1) khắc phục GLIBC/Docker/arm packaging, (2) xử lý các lỗi runtime panic và tool-calling regressions, (3) review PRs tích hợp lớn với focus security & testing.  

(Tài nguyên tham khảo: các issue/PR đã đề cập được liên kết trong từng phần.)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

Bản tin dự án PicoClaw — 2026-03-10

1) Tổng quan hôm nay
- PicoClaw đang ở trạng thái phát triển năng động: trong 24 giờ qua có 18 issues hoạt động (15 mở) và 79 PRs cập nhật (39 mở, 40 đã merge/đóng).  
- Một phiên bản chính thức (v0.2.1) và một nightly mới (v0.2.1-nightly.20260310.b89f6445) đã được phát hành; nightly được build tự động và có thể không ổn định.  
- Hoạt động tập trung mạnh vào cải thiện kênh giao tiếp (Telegram/Feishu/QQ/IRC), nâng cấp provider (Anthropic/minimax) và ổn định công cụ (read_file, MCP, tool-calls).  
- Mức độ hoạt động: cao (nhiều PRs mở/đóng và issues liên quan đến tích hợp kênh & công cụ), với một số lỗi công cụ/đồng bộ cần ưu tiên.

2) Phát hành phiên bản
- Phiên bản mới nhất: v0.2.1-nightly.20260310.b89f6445 (Nightly của v0.2.1). Lưu ý: build tự động, có thể không ổn định. (Release: https://github.com/sipeed/picoclaw/releases/tag/v0.2.1-nightly.20260310.b89f6445 ; full changelog: https://github.com/sipeed/picoclaw/compare/v0.2.1...v0.2.1-nightly.20260310.b89f6445)
- v0.2.1 (chính): thay đổi nổi bật:
  - Banner mới cho picoclaw và picoclaw-launcher-tui (PR #1008) — giao diện/branding được cập nhật.  
  - Thêm provider "minimax" (PR #1273) — mở rộng lựa chọn nhà cung cấp LLM.  
  - Cập nhật contributing.md và chỉnh sửa nhỏ khác.  
  (Tag v0.2.1: https://github.com/sipeed/picoclaw/releases/tag/v0.2.1)
- Breaking changes / migration: không có thay đổi phá vỡ rõ ràng trong dữ liệu cung cấp; chú ý rằng nightly đã được đồng bộ hóa với pipeline gorelease/release-note (PR #1285), nên người dùng production nên dùng tag v0.2.1 thay vì nightly. (PR liên quan: https://github.com/sipeed/picoclaw/pull/1285)

3) Tiến độ dự án (PRs đã merge/đóng hôm nay)
- Tổng PRs cập nhật: 79 (39 mở, 40 merge/đóng trong 24h). Một số PR đã merge/đóng đáng chú ý:
  - Cải thiện pipeline release/nightly (PR #1285) — đồng bộ hóa với gorelease và auto changelog (closed). (https://github.com/sipeed/picoclaw/pull/1285)
  - Ngăn đọc file lớn/nhị phân trong công cụ read_file (PR #1107) — fix cho issue đọc file binary/giá trị lớn (closed). (https://github.com/sipeed/picoclaw/pull/1107)
  - Hỗ trợ natvie Anthropic Messages API (PR #1160, #1284) — thêm `anthropic-messages` protocol (one merged, one đang open/đề xuất). (https://github.com/sipeed/picoclaw/pull/1160, https://github.com/sipeed/picoclaw/pull/1284)
  - Nhiều PR nhỏ đã đóng: reaction tool cleanup (#1286), codex/reply routing (#1282), refactor nhỏ cho feishu crypto (#1267), v.v.  
- Tính năng/đề xuất đang được đẩy mạnh (một số đang open/under review): streaming token trả lời tới Telegram (PR #1101), Mattermost channel support (PR #1288), task-plan tracking với tasktool (PR #1248), tách AgentLoop để cải thiện chất lượng code (PR #699).

4) Chủ đề nóng trong cộng đồng (issues/PRs có hoạt động nhiều)
- picoclaw配置企业微信智能机器人 (AI Bot)??? — issue #1210 (10 bình luận) — câu hỏi cấu hình WeCom AI Bot, nhiều thảo luận về ví dụ cấu hình (https://github.com/sipeed/picoclaw/issues/1210).
- ghcr.io/sipeed/picoclaw is private — issue #302 (6 bình luận, mở từ 2026-02-16) — người dùng muốn registry GHCR public để dễ kéo image (https://github.com/sipeed/picoclaw/issues/302).
- Telegram Forum Topics Support — issue #1270 (mới, high priority) — yêu cầu support thread/forum topics để cô lập ngữ cảnh trong Telegram (https://github.com/sipeed/picoclaw/issues/1270).
- Signal channel integration — issue #41 (5 👍) — nhiều người quan tâm tích hợp Signal cho riêng tư/ E2E (https://github.com/sipeed/picoclaw/issues/41).
Phân tích nhu cầu: cộng đồng đang cần nhiều tích hợp kênh (do dùng đa nền tảng) và khả năng quản lý ngữ cảnh/tách luồng (threads/forums). Đồng thời, người dùng muốn trải nghiệm deploy/cdn/registry dễ dàng hơn (GHCR public).

5) Lỗi & Ổn định (xếp theo mức độ nghiêm trọng)
- Cao:
  - Tool calling fails (issue #1287) — LLM tool-calls trả về JSON không khớp kiểu (unmarshal error), dẫn tới agent LLM call failed. Ảnh hưởng tới khả năng gọi tool/flow tự động. (https://github.com/sipeed/picoclaw/issues/1287)
  - MCP initialization race (issue #1262) — MCP client chưa init xong nhưng PicoClaw đã gửi request, bị reject. Ảnh hưởng tới tích hợp MCP và các công cụ ẩn. (https://github.com/sipeed/picoclaw/issues/1262)
- Trung bình:
  - Feishu mention/sender id missing (issue #1281) — Feishu không giữ user_id của @mention và sender, ảnh hưởng tới tương tác với API bên thứ ba; có PR #1283 đang mở để fix (https://github.com/sipeed/picoclaw/issues/1281, PR: https://github.com/sipeed/picoclaw/pull/1283).
  - QQ channel phân biệt agent sai theo bindings (issue #1242) — ảnh hưởng routing session/agent trong QQ (https://github.com/sipeed/picoclaw/issues/1242).
- Thấp / Đã fix:
  - read_file tool đọc nhị phân/đọc file lớn (issue #1049) — đã được xử lý bởi PR #1107 (closed), ngăn đọc file lớn/nhị phân và tránh sinh ra output rác. (https://github.com/sipeed/picoclaw/issues/1049, PR: https://github.com/sipeed/picoclaw/pull/1107)
  - Cron-triggered response lost (PR #757 open) — issue giải quyết việc cron job trả lời bị bỏ qua; PR đang chờ review. (https://github.com/sipeed/picoclaw/pull/757)
Ghi chú: một số lỗi nghiêm trọng hiện vẫn open và cần ưu tiên (tool-calls và MCP race).

6) Yêu cầu tính năng & tín hiệu lộ trình
- Tích hợp kênh mới/khả năng kênh mở rộng:
  - Mattermost support (PR #1288) — đang review (https://github.com/sipeed/picoclaw/pull/1288).
  - Telegram streaming (PR #1101) — streaming token-by-token qua sendMessageDraft (https://github.com/sipeed/picoclaw/pull/1101).
  - Telegram Forum Topics (issue #1270), Signal integration (issue #41), Feishu long-link mode (issue #1276).
- Agent & tool orchestration:
  - Subagent support for tool access/inheritance (issue #1278) — yêu cầu granular tool permissions cho subagents (https://github.com/sipeed/picoclaw/issues/1278).
  - Tool discovery / lazy loading for MCP (PR #1243 closed) — giảm làm đầy context prompt khi nhiều tools (https://github.com/sipeed/picoclaw/pull/1243).
- Provider support:
  - anthropic-messages protocol để tương thích native Anthropic (PR #1160 merged; #1284 open) — xu hướng hỗ trợ nhiều API format (https://github.com/sipeed/picoclaw/pull/1160, https://github.com/sipeed/picoclaw/pull/1284).
Dự đoán: các bản phát hành tiếp theo sẽ tập trung vào hoàn thiện channel integrations (Telegram streaming, Mattermost, Feishu) và ổn định tool-calls/MCP; cũng sẽ tăng hỗ trợ nhiều provider native protocols.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Tính ổn định của "tools" (read_file, MCP, tool-calls) ảnh hưởng trực tiếp tới workflows tự động và test của người dùng; có phản hồi tích cực khi PR #1107 giải quyết đọc file nhị phân. (https://github.com/sipeed/picoclaw/pull/1107)
  - Khó khăn cấu hình và thiếu chức năng cho kênh doanh nghiệp: WeCom/Feishu/QQ/IRC có các edge-case (mentions, auto-join, long-link modes) gây rắc rối cho triển khai trong nội bộ. (ví dụ: #1210, #1281, #1279, #1276)
  - Cộng đồng muốn privacy-first channels (Signal) và thread-aware behavior (Telegram Forum Topics). (https://github.com/sipeed/picoclaw/issues/41, https://github.com/sipeed/picoclaw/issues/1270)
- Mức độ hài lòng: Người dùng đánh giá cao tiến bộ (fixs gần đây, provider mở rộng), nhưng vẫn không hài lòng với các lỗi tool/mcp và một số kênh chưa hoàn chỉnh.

8) Theo dõi tồn đọng (cần sự chú ý của maintainer)
- ghcr.io/sipeed/picoclaw is private — issue lâu ngày, ảnh hưởng UX deploy/CI (https://github.com/sipeed/picoclaw/issues/302).
- Refactor AgentLoop (PR #699) — lớn, open từ 2026-02-24, cần review để giảm technical debt (https://github.com/sipeed/picoclaw/pull/699).
- Signal integration (issue #41) — nhiều 👍, phù hợp roadmap privacy channels (https://github.com/sipeed/picoclaw/issues/41).
- Telegram streaming (PR #1101) và Mattermost (PR #1288) đang chờ review/merge để cải thiện trải nghiệm kênh (https://github.com/sipeed/picoclaw/pull/1101, https://github.com/sipeed/picoclaw/pull/1288).
- Tool-calls JSON unmarshal failure (issue #1287) — urgent bug, cần ưu tiên debug/PR (https://github.com/sipeed/picoclaw/issues/1287).
- MCP race init (issue #1262) — cần sửa để tránh tool requests bị từ chối khi startup (https://github.com/sipeed/picoclaw/issues/1262).

Kết luận ngắn: dự án đang phát triển nhanh với nhiều đóng góp về kênh và provider; các bản phát hành gần đây (v0.2.1 + nightly) phản ánh tiến bộ. Tuy nhiên, một vài lỗi liên quan tới tool-calls và MCP là rủi ro chính cho người dùng production — cần ưu tiên sửa. Liên kết tới repository: https://github.com/sipeed/picoclaw

Nếu cần, tôi có thể tóm tắt ưu tiên hành động (top-3 issues/PRs để maintainer xử lý) hoặc soạn đề xuất release note ngắn cho v0.2.1.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

NanoClaw — Bản tin dự án (2026-03-10)

1) Tổng quan hôm nay
- Hoạt động cộng đồng đang cao: 28 issue được cập nhật trong 24 giờ qua (24 mở/hoạt động, 4 đóng) và 50 PR được cập nhật (47 mở, 3 merge/đóng). (repo: https://github.com/qwibitai/nanoclaw)
- Chủ đề nổi bật là bảo mật và quản lý credential (agent tiết lộ secret, token hết hạn, đề xuất proxy), cùng nhu cầu mở rộng runtime/provider (không chỉ Claude).
- Có nhiều PR chức năng/khả năng tương thích nền tảng (Podman, Windows, Google Workspace, Copilot SDK) đang chờ review — tín hiệu cộng đồng muốn dùng NanoClaw đa nền tảng.
- Đồng thời có tải bảo trì bản nhánh (merge-forward thất bại trên nhiều skill branches) làm lộ rủi ro quy trình CI / release.

2) Phát hành phiên bản
- Không có phiên bản mới được phát hành hôm nay.

3) Tiến độ dự án (PRs merge/đóng & nỗ lực đáng chú ý)
- Trong 24 giờ qua có 3 PR được merge/đóng theo metadata; PR đáng chú ý đã đóng: IPC read_thread để hỗ trợ truy vấn thread giữa các luồng (closed) — https://github.com/qwibitai/nanoclaw/pull/906.
- Nhiều PR chức năng và sửa lỗi đang tích cực review / chờ merge:
  - Podman support cho setup — https://github.com/qwibitai/nanoclaw/pull/332
  - Google Workspace integration skill — https://github.com/qwibitai/nanoclaw/pull/146
  - Meta-skill /create-skill để chuẩn hóa việc tạo skill — https://github.com/qwibitai/nanoclaw/pull/363
  - Hàng loạt sửa lỗi IPC, quyền truy cập thư mục session, và chạy trên Windows — ví dụ: https://github.com/qwibitai/nanoclaw/pull/364, https://github.com/qwibitai/nanoclaw/pull/370, https://github.com/qwibitai/nanoclaw/pull/415
  - Tăng cường bảo mật mạng cho container non-main — https://github.com/qwibitai/nanoclaw/pull/460

4) Chủ đề nóng trong cộng đồng (Issues / PRs nhiều tương tác)
- Hỗ trợ runtime/provider khác ngoài Claude — Issue #80 (Enhancement, nhiều reaction & thảo luận)  
  https://github.com/qwibitai/nanoclaw/issues/80 — Nhu cầu: khả năng chuyển nhanh sang opencode, codex, gemini… để tránh bị phụ thuộc vào một nhà cung cấp.
- Agent tiết lộ keys/credentials (đã đóng) — Issue #880 (Critical)  
  https://github.com/qwibitai/nanoclaw/issues/880 — Nhu cầu: chặn xuất thông tin nhạy cảm trong output bash/terminal; cầu cấp vấn đề bảo mật ngay.
- Quản lý credential theo nhóm (per-group credentials) — Issue #869 (High)  
  https://github.com/qwibitai/nanoclaw/issues/869 — Nhu cầu: mỗi group có thể dùng credential riêng, quota và danh tính tách biệt.
- Token OAuth của Claude Code hết hạn qua đêm — Issue #730 (High)  
  https://github.com/qwibitai/nanoclaw/issues/730 — Nhu cầu: cơ chế làm mới token cho service nền.
- Scheduler idempotency — Issue #783 (Medium, mới)  
  https://github.com/qwibitai/nanoclaw/issues/783 — Vấn đề: các task định kỳ bị tạo trùng lặp khi agent chạy nhiều phiên, cần idempotency key.

5) Lỗi & Ổn định (xếp theo mức độ)
- Critical / High:
  - #730 CLAUDE_CODE_OAUTH_TOKEN hết hạn → containers fail 401 mỗi sáng (High). Link: https://github.com/qwibitai/nanoclaw/issues/730 — cần cơ chế refresh/daemon để tránh dừng service.
  - #905 Agent runner source mount không được cập nhật sau lần copy đầu tiên (High, mới) — https://github.com/qwibitai/nanoclaw/issues/905 — rủi ro: code sửa local không được phản ánh trong container chạy; ảnh hưởng dev iteration và bảo mật. 
  - #869 Per-group credential management (High) — https://github.com/qwibitai/nanoclaw/issues/869 — architectural gap, ảnh hưởng phân quyền/quota.
- Medium:
  - #783 schedule_task thiếu idempotency → trùng task qua nhiều session — https://github.com/qwibitai/nanoclaw/issues/783.
  - Merge-forward thất bại cho nhiều skill branches (#892–#897) — https://github.com/qwibitai/nanoclaw/issues/892 (và #893–#897) — làm chậm bảo trì skill ecosystem.
  - #878 mở rộng credential proxy cho GROQ/OPENAI (Medium/High enh) — https://github.com/qwibitai/nanoclaw/issues/878.
- Closed / đã xử lý gần đây:
  - #880 (SECURITY: agent reveals secrets) — đã đóng; vẫn cần xác minh patch/triaging (link trên mục 4).
  - #889 (Unicode lone surrogates corrupt transcripts) — đã đóng; phản ánh vấn đề encoding → HTTP 400; cần audit transcript handling.
- PR/ghi chú sửa lỗi liên quan:
  - IPC intake hardening PR (open) — https://github.com/qwibitai/nanoclaw/pull/364
  - refresh current_tasks.json snapshot PR (open) — https://github.com/qwibitai/nanoclaw/pull/373

6) Yêu cầu tính năng & tín hiệu lộ trình
- Hỗ trợ nhiều runtime / provider (mạnh mẽ): #80 — người dùng lo ngại lock-in với Anthropic/Claude. Link: https://github.com/qwibitai/nanoclaw/issues/80
- Per-group credential, interactive reauth via channels: #869 — quản trị đa-tenancy, quota, audit. Link: https://github.com/qwibitai/nanoclaw/issues/869
- Hỗ trợ media thống nhất across channels (images/audio/video/docs): #722 — cải thiện các skill xử lý media on-demand. Link: https://github.com/qwibitai/nanoclaw/issues/722
- Credential proxy mở rộng để che thuộc tính API keys khác (GROQ/OPENAI): #878 — nâng cấp model bảo mật hiện có. Link: https://github.com/qwibitai/nanoclaw/issues/878
- UX/Dev ergonomics: /create-skill meta-skill (#363), Google Workspace skill (#146), Podman & Windows setup support (#332, #415) — cho thấy hướng mở rộng nền tảng và làm cho việc đóng góp trở nên dễ dàng hơn.

7) Tóm tắt phản hồi người dùng
- Điểm đau lớn: quản lý credential và rủi ro lọt secret (người dùng lo ngại agent in ra keys; token expiring; containers được tin tưởng quá mức). (ví dụ: #880, #730, #865) Links: https://github.com/qwibitai/nanoclaw/issues/880, https://github.com/qwibitai/nanoclaw/issues/730, https://github.com/qwibitai/nanoclaw/issues/865
- Trải nghiệm setup/compatibility: nhiều PR/issue fix để chạy trên Windows, WSL2, Podman — người dùng muốn dễ cài đặt đa nền tảng (ví dụ PRs #332, #415, #445). Links: https://github.com/qwibitai/nanoclaw/pull/332, https://github.com/qwibitai/nanoclaw/pull/415
- Nhu cầu mở rộng tích hợp (Signal, Slack, Google Workspace, Copilot SDK) và kỹ năng tiện ích — cộng đồng đang đóng góp skills nhưng cần review nhanh hơn. (ví dụ issues/PRs: #29, #146, #399) Links: https://github.com/qwibitai/nanoclaw/issues/29, https://github.com/qwibitai/nanoclaw/pull/146, https://github.com/qwibitai/nanoclaw/pull/399
- Người dùng đánh giá cao các nỗ lực bảo mật (credential proxy, network isolation PR #460) nhưng muốn hoàn thiện nhanh hơn. Link: https://github.com/qwibitai/nanoclaw/pull/460

8) Theo dõi tồn đọng (cần chú ý của maintainers)
- Issue hỗ trợ runtime đa-provider: #80 — nhiều votes & thảo luận → cần roadmapping / position statement. https://github.com/qwibitai/nanoclaw/issues/80
- Per-group credential management: #869 — kiến trúc quan trọng cho multi-group deployments. https://github.com/qwibitai/nanoclaw/issues/869
- Token refresh / long-running service auth: #730 — ảnh hưởng reliability, ưu tiên cao. https://github.com/qwibitai/nanoclaw/issues/730
- schedule_task idempotency duplication: #783 — gây spam task/notification theo thời gian. https://github.com/qwibitai/nanoclaw/issues/783
- Agent-runner mount update bug: #905 — ảnh hưởng dev workflow, nên xử lý sớm. https://github.com/qwibitai/nanoclaw/issues/905
- Merge-forward failures cho skill branches (#892–#897) — backlog bảo trì CI/branch cần phân công người xử lý. Ví dụ: https://github.com/qwibitai/nanoclaw/issues/892
- PRs chờ review với tác động cao: Google Workspace (#146), Podman (#332), create-skill (#363), media/mentions features (#385, #403) — khuyến nghị prioritise review để duy trì đóng góp cộng đồng. Links: https://github.com/qwibitai/nanoclaw/pull/146, https://github.com/qwibitai/nanoclaw/pull/332, https://github.com/qwibitai/nanoclaw/pull/363

Kết luận ngắn
- Sức khỏe dự án: hoạt động cao, cộng đồng đóng góp tích cực về tính năng và nền tảng.  
- Rủi ro chính: bảo mật credential & token refresh, và chi phí bảo trì nhiều branch/skill.  
- Khuyến nghị ngắn hạn: (1) ưu tiên các bản vá bảo mật / token refresh; (2) xác định lộ trình cho multi-provider support; (3) dồn nguồn lực review PRs trọng yếu để giữ động lực đóng góp.

Nếu muốn, tôi có thể:
- tổng hợp các PR/issue thành một checklist ưu tiên cho maintainers,
- hoặc soạn đề xuất kỹ thuật ngắn cho giải pháp per-group credentials hoặc idempotent scheduler.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

IronClaw — Bản tin dự án (2026-03-10)

1) Tổng quan hôm nay
- Hoạt động cộng đồng cao: trong 24 giờ qua có 35 issue cập nhật (24 mở/hoạt động, 11 đã đóng) và 50 PR cập nhật (31 mở, 19 đã merge/đóng). Điều này cho thấy cả phát triển tính năng lẫn sửa lỗi đang diễn ra tích cực, đặc biệt là nhiều PR liên quan đến ổn định CI, bảo mật và vòng agent.
- Không có phát hành mới hôm nay (không có release). Nhiều thay đổi lớn vẫn đang ở dạng PR mở hoặc vừa được promote giữa nhánh staging → main.
- Trọng tâm hiện tại: ổn định agent (job retry / token budget, undo cho hành động phá hủy), cải thiện quy trình CI / promotion, và sửa các bug kênh webhook / cổng mạng.

2) Phát hành phiên bản
- Không có phiên bản mới được phát hành hôm nay — bỏ qua phần chi tiết thay đổi.

3) Tiến độ dự án (PR đã merge/đóng hôm nay)
Các PR đã được đóng/merge hoặc promoted hôm nay (chỉ liệt kê những mục nổi bật):
- #801 Promote staging → main (auto-promotion, promoted batch) — (https://github.com/nearai/ironclaw/pull/801)
- #797, #792 Promote staging → main (auto-promotion nhỏ hơn) — (https://github.com/nearai/ironclaw/pull/797), (https://github.com/nearai/ironclaw/pull/792)
- #802 CI: run fmt + clippy trên staging PRs (closed) — (https://github.com/nearai/ironclaw/pull/802)
- #803 Cherry-pick fmt+clippy for staging PRs (closed) — (https://github.com/nearai/ironclaw/pull/803)
- #799 fix(setup): pass NEARAI_API_KEY to provider in model selection (closed) — (https://github.com/nearai/ironclaw/pull/799)
- #782 fix: destructive actions from ambiguous user prompts (closed; addresses agent destructive-action issue) — (https://github.com/nearai/ironclaw/pull/782)
- #709 persist user_id in save_job and expose job_id on routine runs (closed) — (https://github.com/nearai/ironclaw/pull/709)

Tiên đoán ngắn: ngày hôm nay tập trung vào việc vá CI/automation, promote thay đổi từ staging, và đóng một số PR sửa lỗi agentic/safety.

4) Chủ đề nóng trong cộng đồng
- Telegram không có trong cài đặt mặc định / cài extension Telegram thất bại — Issue #602 (4 bình luận) (https://github.com/nearai/ironclaw/issues/602). Nhu cầu: dễ cài đặt kênh Telegram cho người dùng tự host, hoặc doc/option rõ ràng trong installer.
- Tương thích model kimi-k2.5 — Issue #728 (3 bình luận) (https://github.com/nearai/ironclaw/issues/728). Nhu cầu: xử lý giới hạn API của các backend LLM (ví dụ temperature cố định) và trường output bị thiếu (reasoning_content).
- Workflow cập nhật registry / cản trở cài WASM channel — Issue #439 (2 bình luận) (https://github.com/nearai/ironclaw/issues/439). Nhu cầu: sửa CI/generation checksum để hỗ trợ branch-protected workflows và tái cài đặt tools/WASM.
- Hành vi tác động phá hoại do prompt mơ hồ — Issue #701 (1 bình luận) (https://github.com/nearai/ironclaw/issues/701). Nhu cầu: cơ chế xác nhận/undo cho hành động xoá tool, ràng buộc an toàn.
- Routines lightweight không thực thi tool / trả raw XML — Issue #696 (1 bình luận) (https://github.com/nearai/ironclaw/issues/696). Nhu cầu: đảm bảo lightweight routines thực thi tool-call thay vì lưu XML thô cho người dùng.
- Managed ngrok tunnel bind sai cổng gây 404 cho webhook — Issue #738 (1 bình luận) (https://github.com/nearai/ironclaw/issues/738). Nhu cầu: sửa port binding để webhooks hoạt động.

5) Lỗi & Ổn định — xếp theo mức độ nghiêm trọng
- Cao (critical)
  - Jobs có vòng retry vô hạn, không có token budget hoặc iteration cap → chi phí khổng lồ và rủi ro (Issue #698) (https://github.com/nearai/ironclaw/issues/698). PR sửa liên quan: #788 (open) đưa vào cấu hình max_tokens_per_job và caps (https://github.com/nearai/ironclaw/pull/788).
  - Registry update workflow failure ngăn cài đặt WASM channel lại (Issue #439) (https://github.com/nearai/ironclaw/issues/439). Ảnh hưởng đến recovery khi người dùng vô tình xóa tool.
- Trung bình (major usability)
  - Managed Tunnel bind sai port → tất cả webhook channels trả 404 (Issue #738) (https://github.com/nearai/ironclaw/issues/738).
  - Channel HTTP server không hot-reload sau thay đổi config (Issue #702) (https://github.com/nearai/ironclaw/issues/702).
  - Chat API `/api/chat/send` trả accepted nhưng silent drop message → thread bị treo (Issue #699) (https://github.com/nearai/ironclaw/issues/699).
  - openai_compatible backend: forced-text response rejected khi model trả <tool_call> XML → fallback "I'm not sure" (Issue #789) (https://github.com/nearai/ironclaw/issues/789).
- Thấp (medium / cosmetic)
  - Onboarding xoá biến môi trường HTTP_HOST (Issue #751) (https://github.com/nearai/ironclaw/issues/751).
  - Mobile browser: chat input bị ẩn (Issue #781) (https://github.com/nearai/ironclaw/issues/781).
- Ghi chú: một số lỗi an toàn/hành vi (Issue #701) đã có PR đóng (#782). CI + promotion fixes đã được đóng/merge nhiều PR hôm nay (#802, #803, #799, #797/792/801), cải thiện quy trình release/promotion.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Hỗ trợ nhập liệu ảnh + text trong Chat API / IronClaw — Issue #766 (https://github.com/nearai/ironclaw/issues/766).
- Chia sẻ skills giữa các agents (organization-level skill sharing) — Issue #770 (https://github.com/nearai/ironclaw/issues/770).
- Slack approval buttons cho tool execution trong DM — PR #796 (open) (https://github.com/nearai/ironclaw/pull/796).
- Hỗ trợ cấu hình WASM credential injection khi không có secrets store (PR #759 open) — (https://github.com/nearai/ironclaw/pull/759).
- Tín hiệu: nhiều yêu cầu xoay quanh khả năng tích hợp kênh (Telegram, Slack), an toàn khi agent thực hiện actions có tác động (confirm/undo), và hỗ trợ nhiều backend LLM với các hạn chế API khác nhau.

7) Tóm tắt phản hồi người dùng
- Vấn đề chính mà người dùng kêu ca: cài đặt/kênh (Telegram không có trong install mặc định), recovery khi tool bị xóa (không có undo / registry broken), và tính ổn định của job (infinite retries → chi phí cao). Ví dụ: Issue #602 (Telegram), #701 (destructive action), #698 (jobs retry) minh họa ba điểm đau chính.
- Trải nghiệm UI/UX: giá hiển thị không nhất quán giữa agent.near.ai và IronClaw UI (Issue #780), và trải nghiệm trên mobile còn lỗi (Issue #781).
- Mức độ hài lòng: cộng đồng đánh giá cao hoạt động nhanh của nhóm (nhiều PR/CI fixes), nhưng lo lắng về ổn định vận hành và an toàn khi triển khai cho người dùng thực tế.

8) Theo dõi tồn đọng (cần chú ý từ người bảo trì)
- Issue #698 Jobs: infinite retry / no token budget (https://github.com/nearai/ironclaw/issues/698) — PR #788 đang mở; ưu tiên cao.
- Issue #439 Registry update workflow fail (https://github.com/nearai/ironclaw/issues/439) — ảnh hưởng cài lại WASM tools; ưu tiên cao.
- Issue #602 Telegram not in default install (https://github.com/nearai/ironclaw/issues/602) — trải nghiệm cài đặt/extension; cần quyết định cung cấp package hoặc doc rõ.
- Issue #728 kimi-k2.5 compatibility (https://github.com/nearai/ironclaw/issues/728) — cần hỗ trợ hạn chế model-specific (temperature, fields).
- Issue #699 Chat API silent drop (https://github.com/nearai/ironclaw/issues/699) — gây mất message; yêu cầu debug session/thread hydration.
- PRs lớn cần review / phối hợp:
  - #778 Encapsulate leaked abstractions (large refactor) — (https://github.com/nearai/ironclaw/pull/778) (rủi ro cao, review cần thời gian).
  - #800 Unify agentic loops into AgenticLoop engine — (https://github.com/nearai/ironclaw/pull/800) (kiến trúc; cần testing trước merge).
  - #762 Gateway workflow harness + mock LLM server — (https://github.com/nearai/ironclaw/pull/762) (giúp tăng coverage integration tests).
  - #788 Job token budget fix (https://github.com/nearai/ironclaw/pull/788) — ưu tiên verify & merge.
  - #759 WASM credential injection without secrets store — (https://github.com/nearai/ironclaw/pull/759) — cải thiện trải nghiệm no-secrets deploy.

Kết luận nhanh
- Sức khỏe dự án: rất hoạt động về đóng góp và CI/promotion, nhưng tồn tại các vấn đề ổn định và vận hành thực tế (jobs, registry/WASM, webhooks, onboarding). Ưu tiên ngắn hạn nên là hoàn thiện các PR ổn định (token budget, webhook port binding, registry fixes) và giải quyết các vấn đề an toàn/undo cho hành động phá hủy trước khi phát hành bản mới.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

Bản tin dự án LobsterAI — 2026-03-10

1) Tổng quan hôm nay
- Dự án đang trong trạng thái hoạt động cao: trong 24 giờ qua có 26 PR cập nhật (1 mở, 25 đã merge/đóng) và 15 issue hoạt động (14 mở, 1 đóng).  
- Hoạt động tập trung vào hoàn thiện tích hợp IM/MCP, sửa lỗi định lịch và cải thiện trải nghiệm bot trên nhiều kênh IM.  
- Người dùng phản ánh nhiều vấn đề về hiệu năng (thực thi bash/Git Bash chậm, lỗi tiến trình Claude) và tương tác IM (media/target notifications), cho thấy ưu tiên kỹ thuật cần đặt vào độ ổn định và hiệu năng.  
- Không có phát hành phiên bản mới hôm nay.

2) Phát hành phiên bản
- Không có phiên bản mới trong lần cập nhật này.

3) Tiến độ dự án (PR đã merge/đóng hôm nay)
- Tổng: 26 PR cập nhật trong 24h (25 đã merge/đóng, 1 PR đang mở).  
- Một số PR chính đã được đóng/merge, tập trung vào IM, định lịch và MCP:
  - Hỗ trợ MCP (mcp) đã được đưa vào (PR #233) — mở đường cho nhiều MCP backend. (https://github.com/netease-youdao/LobsterAI/pull/233)  
  - Loạt PR cải thiện IM: media input cho DingTalk/Feishu/Telegram/Discord, IM timeout/并发修复, IM 配置/清空 bug fixes (ví dụ PR #108, #83, #85, #98, #138…). (https://github.com/netease-youdao/LobsterAI/pull/108)  
  - Cải thiện hệ thống định lịch: persist notification target & media sending; sửa bug không hỗ trợ 企业微信 (PR #147, #335, #332, #331). (https://github.com/netease-youdao/LobsterAI/pull/147)  
  - Cải thiện hiển thị/điều khiển QQ robot và tắt debug log (PR #348 đã đóng). (https://github.com/netease-youdao/LobsterAI/pull/348)  
  - PR đang mở: OpenClaw plugin preinstall system + DingTalk config sync (PR #346) — cơ chế tự tải plugin dev và đóng gói production. (https://github.com/netease-youdao/LobsterAI/pull/346)

4) Chủ đề nóng trong cộng đồng
- Vấn đề chèn khoảng trắng tự động trong chuỗi "中文+数字" (issue #344) — nhiều ảnh đính kèm, phản ánh lỗi xử lý văn bản gây giảm khả năng thay thế OpenClaw. (https://github.com/netease-youdao/LobsterAI/issues/344)  
- Hiệu năng thực thi shell / lỗi zsh / Git Bash (issue #70, #350, #341) — người dùng báo thực thi lệnh qua LobsterAI chậm hoặc trả về lỗi “too many arguments”. (https://github.com/netease-youdao/LobsterAI/issues/70) (https://github.com/netease-youdao/LobsterAI/issues/350) (https://github.com/netease-youdao/LobsterAI/issues/341)  
- Remote HTTP MCP không tải được (issue #351) — người dùng cấu hình nhiều remote MCP nhưng không hiện trong giao diện. (https://github.com/netease-youdao/LobsterAI/issues/351)  
- Định lịch chỉ cho phép chọn kênh IM tổng quát, không cho chọn mục tiêu cụ thể (issue #260) — nhu cầu rõ ràng về target persistence per-chat. (https://github.com/netease-youdao/LobsterAI/issues/260)  
- QQ adapter không trả lời file/ảnh (issue #347) và các yêu cầu media trong IM vẫn là pain point. (https://github.com/netease-youdao/LobsterAI/issues/347)  
- Yêu cầu tính năng: sub-agent / custom system prompt / HITL / typing effect / multiple local agents (issues #349, #342, #343, #320) — cho thấy người dùng mong muốn orchestration, tùy chỉnh và trải nghiệm tương tác phong phú hơn. (https://github.com/netease-youdao/LobsterAI/issues/349) (https://github.com/netease-youdao/LobsterAI/issues/342) (https://github.com/netease-youdao/LobsterAI/issues/343) (https://github.com/netease-youdao/LobsterAI/issues/320)

5) Lỗi & Ổn định — xếp hạng theo mức nghiêm trọng
- Cao
  - Tự động chèn khoảng trắng giữa chữ Hán và số (issue #344) — lỗi xử lý chuỗi ảnh hưởng chất lượng output text; tác động chức năng cao. (https://github.com/netease-youdao/LobsterAI/issues/344)  
  - Thực thi bash/Git Bash chậm & lỗi “too many arguments” (issue #70, #350, #341) — ảnh hưởng trải nghiệm chính khi dùng skill chạy lệnh shell. (https://github.com/netease-youdao/LobsterAI/issues/70) (https://github.com/netease-youdao/LobsterAI/issues/350) (https://github.com/netease-youdao/LobsterAI/issues/341)  
  - Claude Code process exited with code 1 (issue #352) — lỗi tiến trình agent (Cowork/Claude) dẫn đến thất bại task. (https://github.com/netease-youdao/LobsterAI/issues/352)  
- Trung bình
  - Remote HTTP MCP không tải (issue #351) — làm giảm khả năng mở rộng MCP backends. (https://github.com/netease-youdao/LobsterAI/issues/351)  
  - QQ adapter không gửi/hiển thị media (issue #347). (https://github.com/netease-youdao/LobsterAI/issues/347)  
  - Định lịch không thể chỉ định mục tiêu IM cụ thể (issue #260) — đã có PR cải thiện định lịch/media/notification persistence nhưng người dùng vẫn còn phản ánh chi tiết target. (https://github.com/netease-youdao/LobsterAI/issues/260)  
- Ghi chú về sửa lỗi: một số PR gần đây đã xử lý IM/media và định lịch (ví dụ PR #147, #331, #335, #108, #348), nhưng nhiều lỗi hiệu năng liên quan shell và tiến trình ngoại vi chưa có PR khắc phục rõ ràng trong danh sách hiện tại. (https://github.com/netease-youdao/LobsterAI/pull/147) (https://github.com/netease-youdao/LobsterAI/pull/331) (https://github.com/netease-youdao/LobsterAI/pull/335)

6) Yêu cầu tính năng & tín hiệu lộ trình
- Yêu cầu rõ ràng từ cộng đồng:
  - Tạo SubAgent / orchestration multi-agent và custom system prompts (issue #349, #320). (https://github.com/netease-youdao/LobsterAI/issues/349) (https://github.com/netease-youdao/LobsterAI/issues/320)  
  - HITL (Human-in-the-loop) để can thiệp ở các bước then chốt (issue #342). (https://github.com/netease-youdao/LobsterAI/issues/342)  
  - Typing effect / streaming UI để giảm cảm giác chờ (issue #343). (https://github.com/netease-youdao/LobsterAI/issues/343)  
  - Hỗ trợ tốt hơn cho môi trường offline / cài đặt dependencies local để skills hoạt động trong môi trường không kết nối (issue #345). (https://github.com/netease-youdao/LobsterAI/issues/345)  
- Dự đoán roadmap sắp tới:
  - Tăng cường khả năng tích hợp MCP và hệ sinh thái plugin (dấu hiệu: PR #233 + PR #346 đang mở). (https://github.com/netease-youdao/LobsterAI/pull/346)  
  - Ưu tiên cải thiện hiệu năng thực thi shell và ổn định tiến trình agent (Claude).  
  - Mở rộng tính năng IM: media, target per-conversation, và cấu hình sync (DingTalk).

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: chậm khi thực thi lệnh shell / agent, xử lý media trên IM chưa nhất quán, và vấn đề chuỗi văn bản (spacing) khiến một số workflows không thể thay OpenClaw. (https://github.com/netease-youdao/LobsterAI/issues/70) (https://github.com/netease-youdao/LobsterAI/issues/344) (https://github.com/netease-youdao/LobsterAI/issues/347)  
- Nhiều người dùng đánh giá cao tính năng mở rộng (MCP, nhiều kênh IM, định lịch nâng cao) nhưng chưa hài lòng với tốc độ/ổn định; có người so sánh hiệu năng với OpenClaw/claude agent và mong muốn nâng cao tốc độ. (https://github.com/netease-youdao/LobsterAI/issues/353)  
- Yêu cầu UX: streaming/typing effect để giảm cảm giác chờ và tùy biến agent/system prompts cho mục đích chuyên môn (ví dụ automation, ops, assistant).

8) Theo dõi tồn đọng (cần chú ý của maintainer)
- Vấn đề nghiêm trọng chưa có fix rõ ràng: issue #344 (auto spacing) — cần ticket ưu tiên và reproducible test case. (https://github.com/netease-youdao/LobsterAI/issues/344)  
- Hiệu năng thực thi shell / zsh errors: #70, #350, #341 — cần trace execution path giữa desktop UI và spawn process; ưu tiên test trên mac (M4) và Windows Git Bash. (https://github.com/netease-youdao/LobsterAI/issues/70) (https://github.com/netease-youdao/LobsterAI/issues/350) (https://github.com/netease-youdao/LobsterAI/issues/341)  
- Remote MCP loading failure: #351 — cần logs/trace SSE client behavior và UI discovery. (https://github.com/netease-youdao/LobsterAI/issues/351)  
- Open PR cần review: #346 (OpenClaw plugin preinstall + DingTalk sync) — có khả năng thay đổi packaging/CI; cần review trước khi merge. (https://github.com/netease-youdao/LobsterAI/pull/346)  
- Yêu cầu tính năng có tác động lộ trình: #349 (SubAgent + custom system prompts), #345 (offline dependency management), #342 (HITL) — đề xuất tạo epic/roadmap items để gom các issue liên quan. (https://github.com/netease-youdao/LobsterAI/issues/349) (https://github.com/netease-youdao/LobsterAI/issues/345) (https://github.com/netease-youdao/LobsterAI/issues/342)

Kết luận ngắn: hoạt động phát triển tích cực, nhiều cải tiến về IM/MCP đã được merge, nhưng vấn đề hiệu năng thực thi shell, ổn định tiến trình agent và một số lỗi xử lý chuỗi văn bản là những rủi ro hiện tại cần được ưu tiên. Các maintainer nên dành nguồn lực cho debugging tiến trình ngoại vi, test môi trường shell đa nền tảng và ưu tiên PR #346 cùng các issue trọng yếu được liệt kê ở mục theo dõi.

Liên kết nhanh:
- Issues: https://github.com/netease-youdao/LobsterAI/issues
- Pull requests: https://github.com/netease-youdao/LobsterAI/pulls

(Đã tổng hợp từ dữ liệu GitHub cập nhật trong 24 giờ tính đến 2026-03-10.)

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

1) Tổng quan hôm nay
- Hoạt động phát triển rất cao: 26 PR được cập nhật trong 24 giờ qua (7 mở, 19 đã merge/đóng) và 2 issue được xử lý (cả hai đã đóng).  
- Không có phát hành (release) mới.  
- Dòng thay đổi tập trung vào hai hướng chính: ổn định vận hành (sửa lỗi tmux/macOS, Telegram reconnect, installer) và tái cấu trúc/khả năng mở rộng (monorepo, modular channels, provider hỗ trợ tự host).  
- Mức độ hoạt động cho thấy dự án đang tích cực tích hợp tính năng lớn nhưng cần thận trọng với các PR quy mô lớn.

2) Phát hành phiên bản
- Không có phiên bản mới trong đợt này — bỏ qua.

3) Tiến độ dự án (PR đã merge/đóng nổi bật)
Các thay đổi đã được merge/đóng gần đây bao gồm:
- Sửa lỗi chậm khởi tạo tmux để khắc phục tình trạng shell init trên macOS (thêm delay 2s) — PR #179 (merged) (https://github.com/TinyAGI/tinyclaw/pull/179). Liên quan trực tiếp tới issue #156.  
- Sửa auto-reconnect cho Telegram polling (tăng độ ổn định bot) — PR #155 (merged) (https://github.com/TinyAGI/tinyclaw/pull/155).  
- Thêm API chatroom + real-time CLI viewer (tính năng truy cập phòng chat của team) — PR #177 (merged) (https://github.com/TinyAGI/tinyclaw/pull/177).  
- Cập nhật docs/README để phản ánh chatroom và custom provider — PR #180 (merged) (https://github.com/TinyAGI/tinyclaw/pull/180).  
- Chuyển sang template PR theo conventional commits — PR #184 (merged) (https://github.com/TinyAGI/tinyclaw/pull/184).  
- Tích hợp Multi-agent teams (parallel processing, agent-to-agent comms) — PR #163 (merged) (https://github.com/TinyAGI/tinyclaw/pull/163).  
- Nhiều PR nhỏ khác như thêm Avian provider, Telnyx voice, chrome config, command blacklist v.v. (ví dụ PR #143, #39, #36, #5).

4) Chủ đề nóng trong cộng đồng
- Discord guild channels & agent handoff — PR #141 (open, cập nhật 2026-03-10): nhu cầu rõ ràng là tích hợp Discord server/guild để map kênh tới agent, tự động route tin nhắn (https://github.com/TinyAGI/tinyclaw/pull/141). Cộng đồng muốn chat-platform-first routing cho agent.  
- Monorepo + SQLite queue refactor — PR #186 (open): đề xuất tách sang npm workspaces và thay BullMQ/Redis bằng SQLite queue (https://github.com/TinyAGI/tinyclaw/pull/186). Đây là thay đổi kiến trúc lớn, cần review kỹ.  
- Migrate interactive CLI prompts sang @clack/prompts — PR #185 (open): cải thiện UX CLI, thay hàng nghìn dòng bash script bằng TS prompts (https://github.com/TinyAGI/tinyclaw/pull/185).  
- Modular channels & TUI channel example — PR #172 (open): nhu cầu làm cho kênh giao tiếp có thể mở rộng (https://github.com/TinyAGI/tinyclaw/pull/172).  
(Links: PR #141 https://github.com/TinyAGI/tinyclaw/pull/141, PR #186 https://github.com/TinyAGI/tinyclaw/pull/186, PR #185 https://github.com/TinyAGI/tinyclaw/pull/185, PR #172 https://github.com/TinyAGI/tinyclaw/pull/172)

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao: macOS shell init race — issue #156 (CLOSED) (https://github.com/TinyAGI/tinyclaw/issues/156). Triệu chứng: các pane tmux khởi tạo lệnh quá sớm và exit ngay, các process Hiện trạng: đã đóng khi merge PR #179 (fix delay) (https://github.com/TinyAGI/tinyclaw/pull/179). Khuyến nghị: test trên các shell có init nặng (.zshrc, conda, nvm).  
- Trung bình: Telegram polling disconnects — đã fix bởi PR #155 (https://github.com/TinyAGI/tinyclaw/pull/155). Ảnh hưởng đến uptime bot; fix tự reconnect đã được merge.  
- Thấp: Installer/version mismatch — issue #164 (CLOSED) (https://github.com/TinyAGI/tinyclaw/issues/164). Ảnh hưởng UX khi update/install script cài sai phiên bản; đã được đóng (cần kiểm thử thêm).  
Ghi chú: nhiều PR liên quan đến provider/custom provider và queue refactor có khả năng tạo rủi ro hồi quy nếu không test rộng (xem PR #186, #178/#166).

6) Yêu cầu tính năng & tín hiệu lộ trình
- Hướng mở rộng nhà cung cấp (custom providers, self-hosted OpenAI-compatible endpoints) đã được thúc đẩy (PR #178 closed, #166 merged/closed). Dự báo: support cho nhiều backend self-hosted sẽ là ưu tiên tiếp theo (https://github.com/TinyAGI/tinyclaw/pull/178, https://github.com/TinyAGI/tinyclaw/pull/166).  
- Integrations: Discord guild channel routing (PR #141) và voice (Telnyx PR #39 đã merged) cho thấy roadmap nghiêng về đa kênh giao tiếp.  
- Kiến trúc: monorepo + lightweight SQLite queue (PR #186 open) báo hiệu hướng đi giảm phụ thuộc Redis/BullMQ, dễ cài đặt cho người dùng cá nhân.  
- UX: TUI/chatroom và TS-based prompts (PR #177, #185) cho thấy tập trung cải thiện trải nghiệm người dùng CLI/TUI.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính: cài đặt/trải nghiệm ban đầu (installer version mismatch), ổn định daemon trên macOS (tmux + zsh), và kết nối bot (Telegram disconnects). Những điểm này đã được tác giả/maintainer ưu tiên sửa.  
- Mong muốn: dễ cấu hình provider self-host, tích hợp Discord/voice, UI/UX tốt hơn (TUI/CLI). Người dùng đánh giá cao tính năng multi-agent teamwork và chatroom real-time nhưng yêu cầu ổn định trước khi dùng ở môi trường production.

8) Theo dõi tồn đọng (cần chú ý của maintainers)
- PR quy mô lớn cần review & QA kỹ: monorepo + SQLite queue — PR #186 (open) (https://github.com/TinyAGI/tinyclaw/pull/186). Rủi ro hồi quy cao; cần benchmark, migration plan, và test trên CI.  
- Discord guild channels & agent handoff — PR #141 (open) (https://github.com/TinyAGI/tinyclaw/pull/141). Cần review bảo mật routing, mentions, và rate-limit behavior trên Discord guilds.  
- CLI UX migration — PR #185 (open) (https://github.com/TinyAGI/tinyclaw/pull/185). Kiểm thử tương thích script/automation hiện có.  
- Modular channels — PR #172 (open) (https://github.com/TinyAGI/tinyclaw/pull/172). Cần hướng dẫn phát triển kênh mới và ví dụ.  
- Giám sát sau fixes: test lại trên macOS các bản shell phổ biến để xác nhận PR #179 (https://github.com/TinyAGI/tinyclaw/pull/179) giải quyết triệt để issue #156 (https://github.com/TinyAGI/tinyclaw/issues/156).  
- Không còn issues mở được cập nhật trong 24h, nhưng maintainers nên ưu tiên review các PR lớn trước khi làm release.

Kết luận ngắn: dự án đang trong giai đoạn tăng tốc: nhiều fix ổn định đã được merge, đồng thời nhiều PR lớn hướng tới mở rộng và cải thiện UX đang chờ review. Ưu tiên hiện tại là review kỹ các refactor lớn (monorepo/queue) và tiếp tục test trên nền tảng thực tế (macOS, Telegram, Discord) trước khi phát hành bản mới.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

Bản tin dự án Moltis — 2026-03-10

1) Tổng quan hôm nay
- Dự án hoạt động tích cực: 12 issue cập nhật (5 mở/hoạt động, 7 đóng) và 9 PR cập nhật (2 mở, 7 đã merge/đóng) trong 24 giờ qua.  
- Có một phát hành mới (v0.10.18). Nhiều PR sửa lỗi/hoàn thiện trải nghiệm (OAuth, cron, prompt, model discovery, Telegram, Tailscale).  
- Mức độ ưu tiên hiện tại là ổn định môi trường runtime (sandbox / container mounts), xác thực & OAuth, và tương thích các provider mô hình.

2) Phát hành phiên bản
- Phiên bản mới: v0.10.18  
  - (Dữ liệu hiện tại chỉ ghi nhận việc phát hành v0.10.18; release notes chi tiết không được cung cấp trong dữ liệu này.)  
  - Những PR đã đóng gần đây nhiều khả năng đã được bao gồm trong chuỗi phát hành: fix Codex model discovery (PR #359), reasoning-effort feature (PR #363), Tailscale redirect fix (PR #356), Telegram duplicate-text fix (PR #373), cron deletion UI fix (PR #357), prompt/sandbox omission (PR #362), OAuth callback fallback (PR #365). Tham khảo PR để biết thay đổi cụ thể (danh sách PR ở phần Tiến độ).  
  - Breaking changes / migration notes: không có thông tin về thay đổi phá vỡ trong dữ liệu này; khuyến nghị kiểm tra trang release trên GitHub trước khi nâng cấp.

3) Tiến độ dự án (PRs đã merge/đóng gần đây)
- PRs đã đóng/merge (đáng chú ý, có link):
  - fix(providers): report compatible client_version for Codex model discovery — PR #359 (fix lọc model OpenAI Codex). Link: https://github.com/moltis-org/moltis/pull/359
  - feat(providers): add reasoning effort support — PR #363 (thêm các biến thể “reasoning” cho model selectors). Link: https://github.com/moltis-org/moltis/pull/363
  - fix(web): break redirect loop when accessing via Tailscale Serve — PR #356 (ngăn vòng lặp redirect với Tailscale). Link: https://github.com/moltis-org/moltis/pull/356
  - fix(chat): skip duplicate text fallback when TTS disabled and voice streamed — PR #373 (sửa phản hồi Telegram trùng lặp). Link: https://github.com/moltis-org/moltis/pull/373
  - fix(web): allow deleting cron sessions from chat sidebar — PR #357 (cho phép xóa cron sessions từ UI). Link: https://github.com/moltis-org/moltis/pull/357
  - fix(prompt): omit sandbox/node info from runtime prompt when disabled — PR #362 (loại bỏ thông tin sandbox khi bị vô hiệu hóa để tránh hallucination). Link: https://github.com/moltis-org/moltis/pull/362
  - feat(oauth): support pasted callback URL fallback — PR #365 (cải thiện xử lý callback OAuth). Link: https://github.com/moltis-org/moltis/pull/365
- PRs đang mở (cần review / merge):
  - fix(cron): add delay_ms to avoid LLM computing absolute timestamps — PR #377 (thêm delay_ms để tránh LLM tạo timestamp tuyệt đối không chính xác). Link: https://github.com/moltis-org/moltis/pull/377
  - fix(providers): route Copilot enterprise tokens via proxy endpoint — PR #358 (đang chuyển token Copilot enterprise qua endpoint proxy để tránh lỗi HTTP 421). Link: https://github.com/moltis-org/moltis/pull/358

4) Chủ đề nóng trong cộng đồng
- Docker-in-Docker sandbox mounts container-internal path instead of host path — Issue #102 (một bug làm workspace rỗng trong sandbox khi Moltis chạy trong Docker + Docker-in-Docker). Reactions: 👍4. Link: https://github.com/moltis-org/moltis/issues/102  
  - Nhu cầu: chạy sandbox đáng tin cậy trong các môi trường container hóa (CI, Docker-in-Docker). Yêu cầu giải pháp mapping path chính xác từ host -> sandbox.
- [Feature] web search using searxng — Issue #345 (yêu cầu tích hợp SearxNG cho web search). Link: https://github.com/moltis-org/moltis/issues/345  
  - Nhu cầu: truy vấn web riêng tư / self-hosted search cho trợ lý.
- Sign In Failed on Chrome Browsers — Issue #370 (mới, có thể ảnh hưởng đến trải nghiệm đăng nhập). Link: https://github.com/moltis-org/moltis/issues/370
- Settings UI writes main agent identity to wrong path — Issue #376 (mới, ghi IDENTITY.md ở root thay vì agents/main). Link: https://github.com/moltis-org/moltis/issues/376
- Đã được quan tâm và đã fix gần đây: duplicate text replies on Telegram (Issue #371 → PR #373). Link issue: https://github.com/moltis-org/moltis/issues/371

5) Lỗi & Ổn định — xếp theo mức độ nghiêm trọng
- Cao
  - Docker-in-Docker mounts use container-internal path → workspace rỗng (Issue #102). Ảnh hưởng: làm mất workspace trong sandbox khi chạy trong Docker; cần fix mapping host path. Link: https://github.com/moltis-org/moltis/issues/102
  - Sign In Failed on Chrome (Issue #370) — tác động đến khả năng đăng nhập người dùng trên trình duyệt phổ biến. Link: https://github.com/moltis-org/moltis/issues/370
- Trung bình
  - Function call missing thought_signature in functionCall when using Google models (Issue #375) — có thể gây lỗi tương tác function-calling với provider Google. Link: https://github.com/moltis-org/moltis/issues/375
  - Settings UI viết nhầm đường dẫn IDENTITY.md (Issue #376) — gây nhầm lẫn khi cập nhật agent chính. Link: https://github.com/moltis-org/moltis/issues/376
- Thấp / Đã xử lý
  - Tailscale redirect loop (Issue #350) — đã được đóng cùng PR #356. Issue: https://github.com/moltis-org/moltis/issues/350 | PR: https://github.com/moltis-org/moltis/pull/356
  - Telegram duplicate replies (Issue #371) — đã fix trong PR #373. Issue: https://github.com/moltis-org/moltis/issues/371 | PR: https://github.com/moltis-org/moltis/pull/373
  - Cron session cannot be deleted (Issue #342) — đã đóng bằng PR #357. Issue: https://github.com/moltis-org/moltis/issues/342 | PR: https://github.com/moltis-org/moltis/pull/357

6) Yêu cầu tính năng & tín hiệu lộ trình
- Podman as container runtime — Issue #252 (đã đóng; cần kiểm tra kết quả/triển khai). Link: https://github.com/moltis-org/moltis/issues/252
- Web search via SearxNG — Issue #345 (mở, biểu thị nhu cầu search self-hosted / riêng tư). Link: https://github.com/moltis-org/moltis/issues/345
- Scheduling robustness — PR #377 (delay_ms) đề xuất thay đổi hành vi cron để tránh LLM tính sai timestamp; có khả năng được đưa vào bản phát hành tiếp theo. Link: https://github.com/moltis-org/moltis/pull/377
- Copilot enterprise token routing — PR #358 (cải thiện tương thích enterprise). Link: https://github.com/moltis-org/moltis/pull/358

7) Tóm tắt phản hồi người dùng
- Điểm đau chính:
  - Containerized deployments: người dùng gặp lỗi khi chạy Moltis trong Docker+DinD (Issue #102) — tác động thực tế (workspaces trống, trải nghiệm sandbox không sử dụng được). Link: https://github.com/moltis-org/moltis/issues/102
  - Đăng nhập/UX trên trình duyệt: báo cáo Sign In Failed trên Chrome (Issue #370) gây lo ngại về khả năng truy cập. Link: https://github.com/moltis-org/moltis/issues/370
  - Tương thích provider & model discovery: Codex model discovery trước đây trả về catalog không đầy đủ (đã được fix PR #359) — người dùng mong muốn cập nhật model list chính xác cho code-generation. PR: https://github.com/moltis-org/moltis/pull/359
- Phản hồi tích cực:
  - Người dùng đánh giá cao các fix nhỏ nhưng quan trọng: OAuth callback flexibility (PR #365), reasoning-effort variants (PR #363) — cải thiện trải nghiệm cấu hình và tính linh hoạt model.

8) Theo dõi tồn đọng (cần sự chú ý của maintainers)
- High priority (cần hành động)
  - Issue #102 — Docker-in-Docker mount path bug. Link: https://github.com/moltis-org/moltis/issues/102
  - Issue #370 — Sign-in failures on Chrome. Link: https://github.com/moltis-org/moltis/issues/370
  - Issue #375 — Google models: missing thought_signature in functionCall. Link: https://github.com/moltis-org/moltis/issues/375
- PRs cần review / merge
  - PR #377 — add delay_ms for cron scheduling. Link: https://github.com/moltis-org/moltis/pull/377
  - PR #358 — route Copilot enterprise tokens via proxy endpoint. Link: https://github.com/moltis-org/moltis/pull/358
- Lưu ý kiểm chứng sau phát hành
  - Kiểm tra release v0.10.18 để xác nhận các fixes đã được đóng có mặt trong build cuối cùng (xác nhận changelog trên trang release).

Kết luận ngắn gọn
- Sức khỏe dự án: tích cực — nhiều fix hướng tới ổn định chạy trong môi trường thực tế (container, Tailscale, OAuth), đồng thời có tính năng nâng cao (reasoning effort).  
- Việc ưu tiên tiếp theo nên là: 1) xử lý Docker-in-Docker mount và Chrome sign-in (tác động người dùng cao), 2) review & merge PR #377 và #358, 3) theo dõi các yêu cầu tích hợp như searxng và podman.  

Tài nguyên GitHub tham khảo chính
- Repository: https://github.com/moltis-org/moltis
- Issue & PR được đề cập trong bản tin đều có link bên trong từng mục trên.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

CoPaw — Bản tin dự án (2026-03-10)

1) Tổng quan hôm nay
- Hoạt động phát triển và hỗ trợ cộng đồng rất sôi động: trong 24 giờ qua có 50 issue/PR được cập nhật (37 mở/hoạt động, 13 đóng) và 50 PR cập nhật (24 mở, 26 merge/đóng).  
- Nhóm phát hành vừa đưa lên hai tag bản mới (v0.0.6 và v0.0.6.post1), tập trung vào trải nghiệm desktop (native installers + AppImage) và một số cải tiến CI/ tài liệu.  
- Các dòng thảo luận nóng xoay quanh kênh tích hợp (飞书/QQ/DingTalk/Discord), hỗ trợ mô hình cục bộ (llama.cpp/gguf/ollama) và các lỗi vận hành gây mất trạng thái hội thoại.  
- Tổng thể: dự án đang trong trạng thái “khả quan — nhiều hoạt động”, nhưng vẫn còn một số lỗi trải nghiệm và tích hợp kênh/mô hình cần ưu tiên.

2) Phát hành phiên bản
- v0.0.6 (chi tiết): bổ sung Desktop Applications
  - Native Desktop Installers: one‑click installer cho Windows và `.app` cho macOS, sử dụng conda-pack để đóng gói Python portable; kèm workflow phát hành tự động trên GitHub Actions. (PR tham chiếu: #843)  
  - Tác động: cải thiện đáng kể trải nghiệm “cài đặt client” cho người dùng desktop; lưu ý người dùng cập nhật cấu hình và dữ liệu trước khi nâng cấp để tránh mất session cục bộ.
  - Link release: (v0.0.6) — theo thông tin phát hành nội bộ.
- v0.0.6.post1 (bump + docs + CI)
  - Bump version → v0.0.6.post1 (PR #1067), cập nhật roadmap và so sánh với OpenClaw (PR #1062), cải tiến CI cho Docker (tác giả @rayra).  
  - Lưu ý di chuyển: người dùng Docker/Windows lưu ý so sánh kích thước image (có thảo luận về “image 3GB” tại #1041).

3) Tiến độ dự án (PRs đã merge/đóng hôm nay)
- Một số PR quan trọng đã đóng/merge hôm qua/ngày gần đây:
  - fix(chat): giải quyết race condition khiến tin nhắn người dùng biến mất trong session mới — PR #1033 (closed). (link: https://github.com/agentscope-ai/CoPaw/pull/1033)
  - fix: tối ưu hoá token input để đảm bảo length < conf.running.max_input_length — PR #691 (closed) — liên quan trực tiếp issue #679 (token overflow). (link: https://github.com/agentscope-ai/CoPaw/pull/691)
  - fix: khởi tạo agent và cơ chế resilience (retries/timeouts) cho tương tác LLM/MCP — PR #970 (closed). (link: https://github.com/agentscope-ai/CoPaw/pull/970)
  - Desktop packaging: thêm Linux AppImage / build scripts — PRs #1080–#1084 (một số đã được đóng). (ví dụ: https://github.com/agentscope-ai/CoPaw/pull/1084)
- PRs đang mở được chú ý (cần review): LLM routing UI/CLI (#1089), MCP OAuth 2.1 auto-discovery (#1012), tool-guard framework (#563), Feishu cải tiến định dạng và thông báo tiến độ (#1030), DingTalk media fixes (#1051).

4) Chủ đề nóng trong cộng đồng (issues/PRs hoạt động nhất)
- #981 [OPEN] 飞书 & QQ — robot không thể gửi file khi trả lời (10 bình luận)  
  Link: https://github.com/agentscope-ai/CoPaw/issues/981  
  Nhu cầu cơ bản: gửi/đính kèm file qua kênh bên thứ ba (Feishu/QQ) — ảnh hưởng trực tiếp trải nghiệm người dùng doanh nghiệp.
- #679 [OPEN] Input token không đảm bảo < max_input_length, gây lỗi context overflow (9 bình luận)  
  Link: https://github.com/agentscope-ai/CoPaw/issues/679  
  Nhu cầu: xử lý/truncation/chuẩn hoá input trước khi gửi tới LLM; (đã có PR #691 xử lý).
- #863 [OPEN] copaw app terminal báo DeprecationWarning và lỗi runtime (9 bình luận)  
  Link: https://github.com/agentscope-ai/CoPaw/issues/863  
  Nhu cầu: ổn định CLI/desktop runtime, cảnh báo dependency.
- #1022 [CLOSED] Lỗi JSON khi dùng OpenAI-compatible providers (8 bình luận)  
  Link: https://github.com/agentscope-ai/CoPaw/issues/1022  
  Nhu cầu: chuẩn hoá format messages.content (string vs list) cho compatibility với các provider.
- #372 [OPEN] CoPaw tự động rewrite config, chặn truy cập LLM (6 bình luận)  
  Link: https://github.com/agentscope-ai/CoPaw/issues/372  
  Nhu cầu: tĩnh/ổn định cấu hình sau deploy — quan trọng cho môi trường production.

5) Lỗi & Ổn định (xếp theo mức độ nghiêm trọng)
- Mức độ nghiêm trọng cao
  - AGENT_UNKNOWN_ERROR do RemoteProtocolError khi gọi pptxgenjs (kết nối HTTP bị đóng, task dừng) — #282 (5 bình luận).  Link: https://github.com/agentscope-ai/CoPaw/issues/282  
    Tác động: task tool bị dừng giữa chừng -> trải nghiệm bị gián đoạn; cần retry/reconnect/timeout handling.  
  - Lỗi load model cục bộ (llama.cpp/gguf) khiến AGENT_UNKNOWN_ERROR: Failed to load model — #823 (3 bình luận).  Link: https://github.com/agentscope-ai/CoPaw/issues/823  
    Tác động: nhiều người dùng cục bộ không thể dùng model đã tải; ảnh hưởng adoption cho local deployment.
- Mức độ trung bình
  - Mất hội thoại đang chạy nếu rời dialog trong khi model “thinking” (Windows, v0.0.5 post1) — #982 (5 bình luận).  Link: https://github.com/agentscope-ai/CoPaw/issues/982  
    Gây rối loạn UX, có PR #1033 liên quan tới race condition tin nhắn (đã closed) có thể giảm tần suất vấn đề.  
  - CoPaw auto rewrite config khiến phải tái cấu hình model (issue #372) — gây bất tiện cho deploy liên tục.
- Mức độ thấp / thông báo
  - Markdown trong Feishu không hiển thị bảng đúng (#961, closed).  Link: https://github.com/agentscope-ai/CoPaw/issues/961  
  - Copy button không sao chép được mã trong chat (download vẫn ok) — #965 (2 bình luận).  Link: https://github.com/agentscope-ai/CoPaw/issues/965
- Ghi chú về PR sửa lỗi
  - PR #691 (closed) khắc phục input token > max_input_length (liên quan #679). (https://github.com/agentscope-ai/CoPaw/pull/691)  
  - PR #1033 (closed) xử lý race condition tin nhắn biến mất (https://github.com/agentscope-ai/CoPaw/pull/1033)  
  - PR #970 (closed) cải thiện khởi tạo agent và resilience (https://github.com/agentscope-ai/CoPaw/pull/970)

6) Yêu cầu tính năng & tín hiệu lộ trình
- Yêu cầu lặp lại từ cộng đồng:
  - Hỗ trợ cài plugin giống OpenClaw (issue #731). Link: https://github.com/agentscope-ai/CoPaw/issues/731  
  - Tích hợp thêm kênh: 企业微信 (WeCom) (#1032), Mattermost (#1071). Links: https://github.com/agentscope-ai/CoPaw/issues/1032, https://github.com/agentscope-ai/CoPaw/pull/1071  
  - LLM routing / cấu hình routing trong UI & CLI (#1089) — cho thấy nhu cầu multi-LLM và fallback routing. Link: https://github.com/agentscope-ai/CoPaw/pull/1089  
  - OAuth 2.1 auto-discovery cho MCP (#1012) — quan trọng cho tích hợp provider có auth. Link: https://github.com/agentscope-ai/CoPaw/pull/1012
- Dự đoán tính năng ở bản tiếp theo
  - Mở rộng desktop packaging (hiện đã có Windows/macOS/AppImage) sang release chính thức, kèm hướng dẫn nâng cấp.  
  - Hợp nhất LLM routing UI/CLI, cải thiện quản lý provider (custom headers, wire_api) — nhiều PR đang xử lý.  
  - Tool-guard / pre-check cho tool calls (#563) có khả năng được đưa vào như một tính năng bảo mật mặc định.

7) Tóm tắt phản hồi người dùng
- Điểm đau chính
  - Tích hợp kênh (Feishu/QQ/DingTalk/Discord) chưa ổn định: gửi file/ảnh, các giới hạn message chunking, preview video/ảnh. (issues: #981, #619, #1017, #1073, #1051)  
  - Triển khai local model: vấn đề tải model (GGUF/llama.cpp), kết nối Ollama trong môi trường Docker (issue #1094), và lỗi format JSON cho OpenAI-compatible providers (#1022).  
  - UX desktop/CLI: terminal warnings, copy button không hoạt động, gửi message nhầm khi dùng IME trên macOS (#863, #965, #974).  
- Mức độ hài lòng: cộng đồng đánh giá cao nỗ lực packaging desktop và roadmap minh bạch (issue/PR về roadmap #430, docs update #1062), nhưng nhu cầu ổn định channel & local model vẫn khiến một bộ phận người dùng không hài lòng.

8) Theo dõi tồn đọng (cần sự chú ý của maintainer)
- Issues quan trọng mở lâu hoặc cần maintainer review:
  - #372 CoPaw auto rewrites config, blocking llm access — open & ảnh hưởng production. Link: https://github.com/agentscope-ai/CoPaw/issues/372
  - #981 Feishu/QQ file sending fails (10 comments) — cần team channel/adapter check. Link: https://github.com/agentscope-ai/CoPaw/issues/981
  - #823 llama.cpp load model failed (local gguf) — nhiều user local bị ảnh hưởng. Link: https://github.com/agentscope-ai/CoPaw/issues/823
  - #282 pptxgenjs RemoteProtocolError -> task stop — cần retry/timeout fix. Link: https://github.com/agentscope-ai/CoPaw/issues/282
  - #863 copaw app terminal errors / DeprecationWarning — desktop CLI stability. Link: https://github.com/agentscope-ai/CoPaw/issues/863
- PRs cần review/merge để giải quyết pain points:
  - #1089 LLM routing UI/CLI (review cần hoàn tất). Link: https://github.com/agentscope-ai/CoPaw/pull/1089
  - #1012 MCP OAuth 2.1 auto-discovery (security/compatibility). Link: https://github.com/agentscope-ai/CoPaw/pull/1012
  - #563 tool_guard (security guard cho tool calls) — cần review vì ảnh hưởng lớn tới bảo mật. Link: https://github.com/agentscope-ai/CoPaw/pull/563
  - #1030 Feishu formatting & task notifications (tăng UX kênh). Link: https://github.com/agentscope-ai/CoPaw/pull/1030

Kết luận ngắn gọn
- CoPaw đang phát triển mạnh với nhiều đóng góp về desktop packaging, kênh tích hợp và cải tiến cấu trúc provider/CI. Tuy nhiên, để chuyển từ “alpha tiện lợi” sang “ổn định cho production” cần ưu tiên: (1) ổn định kênh (file/media, chunking, previews), (2) support và hardening cho local models (gguf/llama.cpp/ollama), và (3) hoàn thiện các PR bảo mật/route/auth (tool guard, LLM routing, MCP OAuth).  

Tài nguyên nhanh
- Roadmap & tham gia: https://github.com/agentscope-ai/CoPaw/issues/430  
- Release notes / changelog (trích): PR liên quan v0.0.6 / v0.0.6.post1 (ví dụ PR #843, #1067, #1062)  
- Một số link chính: issue #981, #679, #863, #372, #282; PRs #1033, #691, #970, #1089, #1012 (đã nêu trong nội dung trên).

Nếu bạn muốn, tôi có thể:
- Tạo checklist gợi ý cho maintainers (ưu tiên fix, review danh sách PR) hoặc  
- Soạn template comment/triage để gửi vào các issue quan trọng nhằm thu thập thêm thông tin từ báo cáo hiện tại.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

Bản tin dự án ZeptoClaw — 2026-03-10

1) Tổng quan hôm nay
- Hoạt động phát triển tương đối cao: 2 issue mới/đang hoạt động và 3 PR mở được cập nhật trong 24 giờ qua.  
- Không có phiên bản mới được phát hành. Tất cả PR hiện tại vẫn mở, chưa có merge/close trong chu kỳ này.  
- Các thay đổi tập trung vào hai hướng chính: hỗ trợ tự động nhập credentials từ Claude CLI và loại bỏ/đại tu cầu nối WhatsApp hiện tại.  
- Mức độ ưu tiên kỹ thuật hiện nghiêng về cải thiện trải nghiệm thiết lập (credential fallback, dev tools) và khắc phục điểm thất bại của kênh WhatsApp.

2) Phát hành phiên bản
- Không có bản phát hành mới hôm nay (Không có phiên bản mới nhất).

3) Tiến độ dự án
- PR merge/close hôm nay: Không có PR nào được merge hoặc đóng trong 24 giờ qua.  
- PR hoạt động:  
  - #290 (feat(auth): auto-import Claude CLI credentials as fallback) — thêm module đọc OAuth tokens từ macOS Keychain và ~/.claude.json, wired làm fallback thấp ưu tiên. Link: https://github.com/qhkm/zeptoclaw/pull/290  
  - #287 (chore: Dev tools for consistent pre-PR state) — công cụ dev nhằm tiêu chuẩn hóa môi trường test/lint trước PR. Link: https://github.com/qhkm/zeptoclaw/pull/287  
  - #286 (feat: add SKILL.md presence check in GitHub skill search) — bổ sung quét sâu để ưu tiên repo có SKILL.md. Link: https://github.com/qhkm/zeptoclaw/pull/286  
- Những tính năng đang được đẩy mạnh: tự động hoá nhập credentials (giảm friction cho người dùng Claude) và cải thiện chất lượng tìm kiếm skill; chưa có bản sửa lỗi runtime hay release.

4) Chủ đề nóng trong cộng đồng
- Tự động nhập credentials Claude CLI (Issue #289 / PR #290):  
  - Issue: https://github.com/qhkm/zeptoclaw/issues/289  
  - PR: https://github.com/qhkm/zeptoclaw/pull/290  
  - Nhu cầu cơ bản: giảm rào cản cấu hình khi người dùng chạy Claude (Code/Cowork) bằng cách fallback sang tokens có sẵn — đồng thời phải xử lý cảnh báo ToS và quyền riêng tư. Đây là cải tiến trải nghiệm thiết lập quan trọng, nhưng cần cân nhắc pháp lý/ToS và bảo mật.  
- Hỗ trợ WhatsApp Web gốc (Issue #288):  
  - Issue: https://github.com/qhkm/zeptoclaw/issues/288  
  - Vấn đề: kênh WhatsApp hiện dựa vào binary externals (whatsmeow-bridge) nhưng repo phụ không có release — làm tính năng này dễ bị “vỡ” cho người dùng. Người dùng yêu cầu thay thế stub bằng implementation native hoặc một giải pháp phân phối đáng tin cậy.  
- Các PR khác liên quan tới chất lượng đóng góp (#287, #286) đang được thảo luận nhưng chưa có phản hồi/merge.

5) Lỗi & Ổn định
- Vấn đề nghiêm trọng: WhatsApp channel bị chặn do dependency không có binary release (Issue #288) — mức độ nghiêm trọng: Cao (tính năng bị vô hiệu hóa cho người dùng cuối). Link: https://github.com/qhkm/zeptoclaw/issues/288  
- Vấn đề trung bình: nhập credentials tự động có rủi ro bảo mật/ToS nếu triển khai không rõ ràng (Issue #289 / PR #290) — cần review về hiển thị ToS, opt-in, và lưu/truy xuất an toàn. Link: https://github.com/qhkm/zeptoclaw/issues/289  
- Vấn đề thấp: không có báo cáo lỗi runtime/ hồi quy mới hôm nay; PR #287 giúp ổn định quy trình đóng góp (giảm lỗi do môi trường dev khác nhau). Link: https://github.com/qhkm/zeptoclaw/pull/287

6) Yêu cầu tính năng & tín hiệu lộ trình
- Yêu cầu nổi bật: native WhatsApp Web support (Issue #288) — đây là yêu cầu tính năng rõ ràng và có tính ảnh hưởng đến nhiều người dùng nếu kênh WhatsApp được dùng nhiều. Link: https://github.com/qhkm/zeptoclaw/issues/288  
- Tín hiệu khác: hỗ trợ tự động nhập Claude CLI credentials (PR #290) cho thấy ưu tiên giảm friction cấu hình cho các provider không dùng API key trực tiếp. Link: https://github.com/qhkm/zeptoclaw/pull/290  
- Dự đoán lộ trình tiếp theo: ưu tiên hợp thức hóa cơ chế credential fallback (đảm bảo pháp lý/bảo mật), tích hợp dev-tooling để tăng chất lượng PR, sau đó xử lý giải pháp thay thế cho whatsmeow-bridge (hoặc cung cấp hướng dẫn release/packaging).

7) Tóm tắt phản hồi người dùng
- Mặc dù hiện tại các issue/PR mới chưa có bình luận, nhưng từ nội dung có thể rút ra:  
  - Điểm đau: cài đặt ban đầu phức tạp do thiếu credentials hoặc dependency nhị phân không tồn tại; điều này ảnh hưởng tới trải nghiệm “zero-config”.  
  - Trường hợp sử dụng chính: người dùng cá nhân/nhỏ muốn chạy ZeptoClaw với Claude/WhatsApp mà không phải tự cấu hình phức tạp.  
  - Mức độ hài lòng tiềm năng: sẽ tăng nếu những PR về credential fallback và dev tooling được review và merge; ngược lại, kênh WhatsApp bị chặn sẽ gây thất vọng cho người phụ thuộc vào nền tảng này.

8) Theo dõi tồn đọng (cần chú ý của người bảo trì)
- Issue #288 — Native WhatsApp Web support (thay thế whatsmeow-bridge stub): https://github.com/qhkm/zeptoclaw/issues/288  
  - Hành động đề xuất: xác định owner/thiết kế thay thế (native implementation hoặc hướng dẫn đóng gói/binary release cho whatsmeow).  
- Issue #289 / PR #290 — auto-import Claude CLI credentials: https://github.com/qhkm/zeptoclaw/issues/289 / https://github.com/qhkm/zeptoclaw/pull/290  
  - Hành động đề xuất: review code, đánh giá rủi ro ToS & bảo mật, quyết định hiển thị ToS/opt-in hay không trước merge.  
- PR #287 — Dev tools for consistent pre-PR state: https://github.com/qhkm/zeptoclaw/pull/287  
  - Hành động đề xuất: xem xét tích hợp vào CI hoặc tài liệu đóng góp để giảm friction cho reviewers.  
- PR #286 — SKILL.md presence check in GitHub skill search: https://github.com/qhkm/zeptoclaw/pull/286  
  - Hành động đề xuất: review giá trị bổ sung so với chi phí quét sâu (token GitHub, rate-limit), và bật ở chế độ “deep” tùy chọn.

Kết luận ngắn gọn
- Dự án đang có hoạt động phát triển tập trung vào giảm friction cho người dùng (credential fallback) và cải thiện trải nghiệm đóng góp. Vấn đề nghiêm trọng nhất hiện là kênh WhatsApp phụ thuộc binary không có release — cần quyết định thiết kế/triển khai sớm để khôi phục tính năng. Các PR hiện tại cần review để biến các cải tiến này thành thực tế.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

EasyClaw — Bản tin dự án (2026-03-10)

1) Tổng quan hôm nay
- Trong 24 giờ qua dự án ghi nhận 4 issue được cập nhật, trong đó 3 đã được đóng và 1 vẫn còn mở, không có PR mới hay phát hành phiên bản.  
- Hoạt động phát triển hiện ở mức nhẹ — cộng đồng có tương tác (báo lỗi/đề xuất) và bảo trì phản hồi nhanh (3/4 issue đóng trong cùng khoảng thời gian).  
- Điểm cần chú ý: một issue mở về ảnh không được mô hình nhận (đa phương tiện / pipeline hình ảnh) cần điều tra thêm.

2) Phát hành phiên bản
- Không có phát hành mới trong kỳ này.

3) Tiến độ dự án
- PR: không có PR nào được mở/merge/đóng trong 24 giờ qua.  
- Issue đã xử lý: ba issue báo cáo trong thời gian ngắn đã được đóng — cho thấy bảo trì đang xử lý ticket. Không có thay đổi tính năng hay sửa lỗi lớn được ghi nhận qua PR.

4) Chủ đề nóng trong cộng đồng
- Issue #13 (mở): "在对话chat选择图片，但是模型并没有接受到图片" — báo rằng khi chọn ảnh trong giao diện chat, mô hình không nhận được nội dung ảnh. (https://github.com/gaoyangz77/easyclaw/issues/13) — 2 bình luận. Đây là vấn đề chức năng đa phương tiện/nhận diện ảnh, ảnh hưởng trực tiếp trải nghiệm người dùng đa-modal.  
- Issue #12 (đóng): "社群交流" — đề nghị mở nhóm trao đổi/nhóm kỹ thuật (https://github.com/gaoyangz77/easyclaw/issues/12). Phản ánh nhu cầu cộng đồng muốn kênh giao tiếp ngoài GitHub.  
- Issue #8 (đóng): Vấn đề cập nhật ứng dụng trên macOS 26.3 không cài được sau khi tải trong app (https://github.com/gaoyangz77/easyclaw/issues/8). Đây là sự cố nền tảng người dùng quan trọng nếu còn tái diễn.  
- Issue #14 (đóng): Thắc mắc về mối quan hệ với website/nhãn khác (https://github.com/gaoyangz77/easyclaw/issues/14).

5) Lỗi & Ổn định (xếp hạng theo mức độ nghiêm trọng)
- Cao: Issue #13 — Ảnh không đến mô hình trong luồng chat. Ảnh hưởng chức năng đa-modal của trợ lý, có thể làm nhiều tính năng liên quan ảnh/ngữ cảnh bị vô hiệu. Cần log/trace upload, kiểm tra pipeline front-end → backend → model adapter. (https://github.com/gaoyangz77/easyclaw/issues/13)  
- Trung bình: Issue #8 — Cập nhật ứng dụng trên macOS không cài được (đã đóng). Nếu lỗi đã được fix thì rủi ro giảm; nếu đóng do workaround thì cần kiểm tra mức độ tái phát. (https://github.com/gaoyangz77/easyclaw/issues/8)  
- Thấp: Issue #14 — Nhận diện thương hiệu/quan hệ với trang khác (đã đóng). Không ảnh hưởng kỹ thuật trực tiếp nhưng cần minh bạch thông tin cho người dùng. (https://github.com/gaoyangz77/easyclaw/issues/14)

Ghi chú: Không có PR sửa lỗi được ghi nhận trong 24h qua.

6) Yêu cầu tính năng & tín hiệu lộ trình
- Mong muốn có kênh trao đổi cộng đồng/nhóm kỹ thuật (issue #12) cho thấy nhu cầu hỗ trợ, hướng dẫn sử dụng, và đóng góp. (https://github.com/gaoyangz77/easyclaw/issues/12)  
- Yêu cầu/bug liên quan tới xử lý ảnh (#13) gợi ý lộ trình ưu tiên cho: cải thiện hỗ trợ đa-modal, kiểm thử end-to-end cho upload ảnh, logging cho pipeline ảnh → model. (https://github.com/gaoyangz77/easyclaw/issues/13)  
- Không có dấu hiệu về thay đổi API hay bản phát hành lớn trong dữ liệu hiện tại.

7) Tóm tắt phản hồi người dùng
- Người dùng báo các vấn đề thực tế: chức năng chọn ảnh không truyền tới model (gây gián đoạn trải nghiệm đa-modal) và lỗi cài đặt cập nhật trên macOS.  
- Mức độ hài lòng trung bình: cộng đồng sẵn sàng đóng góp ý tưởng (mong muốn nhóm trao đổi) và báo lỗi nhanh; phản hồi của bảo trì nhanh (đa số issue được đóng), điều này tích cực cho trải nghiệm hỗ trợ.

8) Theo dõi tồn đọng (cần chú ý)
- Issue #13 (mở): ưu tiên xử lý — cần thêm thông tin tái tạo, logs, xác nhận môi trường (frontend, backend, model adapter). Link: https://github.com/gaoyangz77/easyclaw/issues/13  
- Nếu bảo trì chưa tạo kênh giao tiếp dài hạn, nên cân nhắc mở GitHub Discussions, Discord/Telegram/Slack cho cộng đồng (dựa trên nhu cầu trong issue #12). Link: https://github.com/gaoyangz77/easyclaw/issues/12  
- Xem lại issue #8 (đóng) để xác định liệu fix đã triệt để hay chỉ là workaround; nếu cần, thêm test cài đặt cập nhật trên macOS mới. Link: https://github.com/gaoyangz77/easyclaw/issues/8

Đề xuất hành động ngắn hạn cho bảo trì
- Triaging nhanh issue #13: yêu cầu log upload ảnh, console/network trace, xác nhận backend nhận được multipart/form-data, và test với model dev (hoặc codex) để so sánh. (https://github.com/gaoyangz77/easyclaw/issues/13)  
- Thiết lập/ghi rõ kênh cộng đồng nếu nhóm muốn tăng tương tác (phản hồi #12). (https://github.com/gaoyangz77/easyclaw/issues/12)  
- Nếu phù hợp, tạo checklist release cho sửa lỗi đa-modal và cải tiến cài đặt macOS để gom các fix vào bản phát hành tiếp theo.

Tổng kết: dự án duy trì phản hồi tốt với cộng đồng nhưng cần ưu tiên khắc phục vấn đề đa-modal (ảnh không đến model) và cân nhắc thiết lập kênh cộng đồng để tăng tương tác và giảm ticket trùng lặp. Links chính: #13 https://github.com/gaoyangz77/easyclaw/issues/13, #12 https://github.com/gaoyangz77/easyclaw/issues/12, #8 https://github.com/gaoyangz77/easyclaw/issues/8, #14 https://github.com/gaoyangz77/easyclaw/issues/14.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*