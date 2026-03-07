# Xu hướng AI Mã nguồn mở 2026-03-07

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-03-07 13:56 UTC

---

Báo cáo Xu hướng Mã nguồn mở AI — 2026-03-07

Bước 1 — Lọc
Tôi đã chọn các repo rõ ràng liên quan đến AI/ML từ danh sách Trending và kết quả tìm kiếm chủ đề (loại trừ UI thuần túy, thư viện frontend/giao diện, game, v.v.). Repos được giữ bao gồm framework/engine, agent/flow, RAG/vector DB, LLM/huấn luyện và ứng dụng AI.

Bước 2 — Phân loại (mỗi dự án kèm link; nhóm chính được chỉ định)

🔧 Cơ sở hạ tầng AI (framework, SDK, inference, CLI)
- https://github.com/ollama/ollama — ⭐164,338 — Nền tảng chạy/triển khai nhiều model (Kimi-K2.5, GLM-5, Qwen,...). Quan trọng cho triển khai mô hình cục bộ/multi-model.
- https://github.com/huggingface/transformers — ⭐157,511 — Thư viện định nghĩa mô hình và API chuẩn cho training/inference; vẫn là trung tâm hệ sinh thái.
- https://github.com/vllm-project/vllm — ⭐72,319 — Engine phục vụ inference hiệu năng cao cho LLM; quan trọng cho scale và latency thấp.
- https://github.com/tensorflow/tensorflow — ⭐194,022 — Framework ML nền tảng, dùng cả cho nghiên cứu và production.
- https://github.com/pytorch/pytorch — ⭐98,018 — Framework dynamiс hàng đầu cho phát triển mô hình và tối ưu GPU.
- https://github.com/open-webui/open-webui — ⭐126,070 — Giao diện người dùng cho chạy nhiều backend LLM (hữu ích cho demo/UX của infra).

🤖 AI Agent / Workflow (agent frameworks, orchestration, MCP)
- https://github.com/langchain-ai/langchain — ⭐128,537 — Nền tảng kiến trúc agent & chain cho xây dựng ứng dụng LLM; trung tâm cho engineering agent.
- https://github.com/msitarzewski/agency-agents — ⭐ (tổng N/A) +1,468 hôm nay — Full AI agency demo; biểu hiện bùng nổ quan tâm về “agency” và multi-agent.
- https://github.com/QwenLM/Qwen-Agent — ⭐ (tổng N/A) +586 hôm nay — Framework & apps xây dựng agent trên Qwen>=3.0; nổi bật vì hỗ trợ Function Calling, RAG, code interpreter.
- https://github.com/FlowiseAI/Flowise — ⭐50,470 — Xây agent theo dạng visual flow — tiếp tục thu hút dev muốn low-code cho agents.
- https://github.com/agentjido/jido — ⭐ (tổng N/A) +143 hôm nay — Agent framework cho hệ phân tán (Elixir) — trending nhỏ về agent phân tán.
- https://github.com/activepieces/activepieces — ⭐21,110 — Low-code/automation cho agent & workflow (MCPs).

📦 Ứng dụng AI (giải pháp, vertical apps)
- https://github.com/PaddlePaddle/PaddleOCR — ⭐71,742 — OCR đa ngôn ngữ, cầu nối dữ liệu hình ảnh → LLM; thiết yếu cho pipeline RAG.
- https://github.com/OpenBB-finance/OpenBB — ⭐62,666 — Ứng dụng dữ liệu & phân tích cho tài chính; kết hợp ML/agent cho research.
- https://github.com/virattt/ai-hedge-fund — ⭐ (tổng N/A) +248 hôm nay — Ví dụ ứng dụng agent/ML cho đầu tư, phản ánh xu hướng “agent làm team” trên domain tài chính.
- https://github.com/deepfakes/faceswap — ⭐55,022 — Ứng dụng xử lý ảnh/generation có tiếng — chú ý về đạo đức và kỹ thuật.

🧠 LLM / Huấn luyện (models, fine-tuning, pretraining)
- https://github.com/hiyouga/LlamaFactory — ⭐68,004 — Công cụ fine-tune/efficient FT cho nhiều LLM/VLM.
- https://github.com/rasbt/LLMs-from-scratch — ⭐87,336 — Hướng dẫn + cài đặt LLM từ đầu (giáo dục & nghiên cứu).
- https://github.com/galilai-group/stable-pretraining — ⭐132 — Library cho pretraining đáng tin cậy và có thể mở rộng.
- https://github.com/skyzh/tiny-llm — ⭐3,905 — Thực hành inference LLM nhỏ trên Apple Silicon / hệ nhỏ — xu hướng on-device/quantized.
- https://github.com/Picovoice/picollm — ⭐303 — On-device LLM inference bằng x-bit quantization — hướng privacy-first.

🔍 RAG / Tri thức (vector DB, memory, retrieval, orchestration)
- https://github.com/run-llama/llama_index — ⭐47,440 — LlamaIndex: agent/document index & connector cho RAG/agents.
- https://github.com/milvus-io/milvus — ⭐43,181 — Vector DB cloud-native, scale cho ANN search.
- https://github.com/qdrant/qdrant — ⭐29,343 — Vector search engine hiệu năng/ổn định cho RAG.
- https://github.com/chroma-core/chroma — ⭐26,496 — DB/infra retrieval mã nguồn mở cho AI apps.
- https://github.com/VectifyAI/PageIndex — ⭐20,732 — PageIndex: hướng “vectorless reasoning-based RAG”.
- https://github.com/memvid/memvid — ⭐13,279 — Memory layer cho agents: giảm phức tạp RAG và cung cấp long-term memory.
- https://github.com/neuml/txtai — ⭐12,260 — All-in-one semantic search + orchestration LLM.

Bước 3 — Xuất báo cáo

1) Điểm nổi bật hôm nay
- Cơn bão quan tâm tập trung vào agent, skills và hệ sinh thái agent: repo về agency/skills (msitarzewski/agency-agents, openai/skills, Qwen-Agent) ghi nhận lượng sao tăng mạnh hôm nay.
- Công cụ RAG/tri thức và memory cho agents tiếp tục vững: LlamaIndex, PageIndex và nhiều vector DB (Milvus/Qdrant/Chroma) vẫn là trụ cột cho ứng dụng production.
- Hướng on-device & privacy (tiny-llm, picollm) và multi-model orchestration (Ollama, Open-WebUI) nổi bật do nhu cầu chạy model cục bộ và quản lý nhiều LLM cùng lúc.
- Google Cloud (Gemini trên Vertex) và các model mới (Qwen ≥3.0, Claude Code...) thúc đẩy các adapter, skills và plugin trong cộng đồng.

2) Dự án hot theo danh mục (tiêu biểu, kèm sao)
(Đã liệt kê ở trên — mỗi mục kèm link và sao; trong danh sách này, các repo trending hôm nay với số sao “mới hôm nay” thể hiện lượng tương tác đột biến: msitarzewski/agency-agents +1,468, openai/skills +947, Qwen-Agent +586, 666ghj/MiroFish +345, GoogleCloudPlatform/generative-ai +348, virattt/ai-hedge-fund +248, agentjido/jido +143.)

3) Phân tích tín hiệu xu hướng (200–300 từ)
Cộng đồng mã nguồn mở đang chuyển từ “chỉ có model” sang “ecosystem xung quanh model”: hôm nay biểu đồ hoạt động cho thấy sự bùng nổ ở tầng agent/skills (catalogs, multi-agent demos, frameworks hỗ trợ function-calling, MCPs), đồng thời tầng tri thức (vector DB, memory, RAG simplification) vẫn liên tục nhận đầu tư cộng đồng. Sự xuất hiện các repo như agency-agents và openai/skills cho thấy developer focus đang chuyển mạnh sang: (1) đóng gói “kỹ năng” có thể tái dùng (skills marketplace/catalogs), (2) orchestration giữa nhiều LLM và công cụ (MCPs, connectors), và (3) bộ nhớ dài hạn cho agent (memvid, mem0). Bên cạnh đó, nhu cầu chạy model cục bộ/riêng tư thúc đẩy on-device inference & quantization (tiny-llm, picollm) và multi-model runtime (Ollama, Open-WebUI). Vector DB vẫn là hạ tầng then chốt — Milvus/Qdrant/Chroma tiếp tục là lựa chọn cho scale; đồng thời có xu hướng “vectorless” hoặc reasoning-first (PageIndex) cho các trường hợp cần tối ưu lưu trữ/chi phí. Các hoạt động này gắn chặt với các phát hành LLM gần đây (Qwen >=3.0, Gemini, Claude Code): khi model mới ra, cộng đồng lập tức xây tools, agents, connectors và skills để tận dụng khả năng mới, dẫn đến làn sóng forks, templates và demos trên GitHub.

4) Điểm nóng cộng đồng — nên chú ý
- Agent frameworks & skills catalogs (ví dụ https://github.com/langchain-ai/langchain, https://github.com/openai/skills): tốc độ tích hợp nhanh, nhiều pattern tái sử dụng.
- Memory / long-term agent memory (https://github.com/memvid/memvid, https://github.com/mem0ai/mem0): đóng vai trò quyết định để làm agent “liên tục” và hữu dụng.
- RAG & vector DB scale (https://github.com/milvus-io/milvus, https://github.com/qdrant/qdrant, https://github.com/chroma-core/chroma): cần biết để đưa vào production.
- On-device inference & quantization (https://github.com/skyzh/tiny-llm, https://github.com/Picovoice/picollm): quan trọng cho privacy-first hoặc edge deployment.
- Multi-model orchestration / local model runtimes (https://github.com/ollama/ollama, https://github.com/open-webui/open-webui): hỗ trợ triển khai hybrid cloud/local model stacks.

Kết luận ngắn: hôm nay cộng đồng tập trung mạnh vào “agent + memory + RAG” kèm xu hướng chạy model cục bộ và multi-model orchestration. Nếu bạn là dev hoặc architect, ưu tiên khảo sát agent frameworks, tích hợp memory layer và chọn vector DB phù hợp — đó là nơi giá trị ứng dụng thực tế được tạo ra trong 6–12 tháng tới.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*