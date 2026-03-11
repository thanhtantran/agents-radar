# Xu hướng AI Mã nguồn mở 2026-03-11

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-03-11 01:53 UTC

---

Báo cáo Xu hướng Mã nguồn mở AI — 2026-03-11

Bước 1 — Lọc
Từ dữ liệu nguồn, tôi chọn các repo rõ ràng liên quan tới AI/ML (loại trừ framework frontend thuần, game, công cụ không AI). Danh sách đã lọc (trending + search) gồm:

Trending (AI liên quan):
- https://github.com/msitarzewski/agency-agents — tăng +6,223 hôm nay (tổng sao không có trong nguồn)
- https://github.com/666ghj/MiroFish — tăng +4,504 hôm nay
- https://github.com/NousResearch/hermes-agent — tăng +781 hôm nay
- https://github.com/promptfoo/promptfoo — tăng +661 hôm nay
- https://github.com/GoogleCloudPlatform/generative-ai — tăng +530 hôm nay
- https://github.com/karpathy/nanochat — tăng +705 hôm nay
- https://github.com/obra/superpowers — tăng +1,387 hôm nay
- https://github.com/alibaba/page-agent — tăng +891 hôm nay
- https://github.com/openclaw/openclaw — tăng +9,080 hôm nay
- https://github.com/pbakaus/impeccable — tăng +939 hôm nay
- https://github.com/bytedance/deer-flow — tăng +1,413 hôm nay
- https://github.com/virattt/ai-hedge-fund — tăng +300 hôm nay

Search (đã loại trùng, kèm sao tổng):
- https://github.com/huggingface/transformers — ⭐157,711
- https://github.com/ollama/ollama — ⭐164,784
- https://github.com/vllm-project/vllm — ⭐72,765
- https://github.com/langchain-ai/langchain — ⭐129,035
- https://github.com/langgenius/dify — ⭐132,148
- https://github.com/FlowiseAI/Flowise — ⭐50,594
- https://github.com/run-llama/llama_index — ⭐47,563
- https://github.com/milvus-io/milvus — ⭐43,300
- https://github.com/zhayujie/chatgpt-on-wechat — ⭐42,107
- https://github.com/CherryHQ/cherry-studio — ⭐41,195
- https://github.com/mem0ai/mem0 — ⭐49,332
- https://github.com/qdrant/qdrant — ⭐29,482
- https://github.com/chroma-core/chroma — ⭐26,546
- https://github.com/rasbt/LLMs-from-scratch — ⭐87,641
- https://github.com/OpenBB-finance/OpenBB — ⭐62,797
(Chỉ liệt kê các mục tiêu tiêu biểu ở bước tiếp theo.)

Bước 2 — Phân loại (mỗi repo gán nhóm chính)

🔧 Cơ sở hạ tầng AI
- https://github.com/huggingface/transformers — ⭐157,711 — Framework định nghĩa mô hình transformer cho NLP/vision/audio; vẫn là chuẩn công nghiệp cho phát triển mô hình.
- https://github.com/ollama/ollama — ⭐164,784 — Local model runtime/manager (hỗ trợ nhiều model); thúc đẩy xu hướng vận hành LLM cục bộ.
- https://github.com/vllm-project/vllm — ⭐72,765 — Engine inference hiệu suất cao cho LLM; nổi bật vì throughput/memory-efficient.
- https://github.com/GoogleCloudPlatform/generative-ai — tăng +530 hôm nay — Bộ notebook mẫu triển khai Generative AI trên Google Cloud (Gemini/Vertex).
- https://github.com/promptfoo/promptfoo — tăng +661 hôm nay — Công cụ test, pentest và đo lường prompts/agent; tăng độ trưởng thành của dev-safety.

🤖 AI Agent / Workflow
- https://github.com/langchain-ai/langchain — ⭐129,035 — Nền tảng agent engineering tiêu chuẩn công nghiệp cho xây dựng agents và tích hợp tool-calls.
- https://github.com/langgenius/dify — ⭐132,148 — Nền tảng production-ready cho agentic workflow; cạnh tranh trực tiếp với LangChain.
- https://github.com/msitarzewski/agency-agents — tăng +6,223 hôm nay — Bộ agent chuyên môn hoá sẵn; phản ánh trào lưu “agent-as-product”.
- https://github.com/CherryHQ/cherry-studio — ⭐41,195 — Studio năng suất với agents và 300+ assistants.
- https://github.com/bytedance/deer-flow — tăng +1,413 hôm nay — SuperAgent harness nghiên cứu & tạo nội dung với sandbox/memories/tools.

📦 Ứng dụng AI (giải pháp ngành)
- https://github.com/zhayujie/chatgpt-on-wechat — ⭐42,107 — CowAgent: AI assistant đa kênh cho WeChat/Feishu; ví dụ ứng dụng agent tại doanh nghiệp/tiếp cận người dùng Trung Quốc.
- https://github.com/OpenBB-finance/OpenBB — ⭐62,797 — Nền tảng dữ liệu + AI cho phân tích tài chính.
- https://github.com/saturndec/waoowaoo — ⭐9,068 — Agent nền tảng sản xuất phim & video bằng AI.
- https://github.com/virattt/ai-hedge-fund — tăng +300 hôm nay — Demo “AI hedge fund team” ứng dụng agents trên finance.

🧠 LLM / Huấn luyện
- https://github.com/rasbt/LLMs-from-scratch — ⭐87,641 — Hướng dẫn step-by-step xây LLM như ChatGPT — tài liệu học tập và minh hoạ.
- https://github.com/hiyouga/LlamaFactory — ⭐68,167 — Công cụ fine-tune hiệu quả cho nhiều LLM/VLM.
- https://github.com/open-compass/opencompass — ⭐6,742 — Nền tảng đánh giá LLM đa-bộ dữ liệu.

🔍 RAG / Tri thức (vector DB, RAG engines)
- https://github.com/run-llama/llama_index — ⭐47,563 — Leading document agent & OCR platform; cầu nối giữa docs và LLM.
- https://github.com/FlowiseAI/Flowise — ⭐50,594 — Build AI agents visually — mạnh về RAG visual flows.
- https://github.com/milvus-io/milvus — ⭐43,300 — Vector DB hiệu suất cho tìm kiếm ANN ở quy mô.
- https://github.com/qdrant/qdrant — ⭐29,482 — Vector search engine quy mô.
- https://github.com/chroma-core/chroma — ⭐26,546 — Open-source retrieval DB cho ứng dụng multimodal.
- https://github.com/mem0ai/mem0 — ⭐49,332 — Lớp memory universal cho agents.

Bước 3 — Báo cáo

1) Điểm nổi bật hôm nay
- Bùng nổ quan tâm đến hệ sinh thái AI “agentic”: nhiều repo agent/harness (agency-agents, openclaw, hermes-agent, deer-flow) lọt trending với lượng sao lớn.  
- Local-first inference và runtime tiếp tục mạnh (ollama, vllm, open-webui): cộng đồng tiếp tục ưu tiên vận hành LLM cục bộ để tiết kiệm chi phí và tăng quyền riêng tư.  
- RAG và cơ sở dữ liệu vector (milvus, qdrant, chroma, llama_index) vẫn là trung tâm cho ứng dụng AI thực tế — nhiều công cụ tích hợp RAG + agents ngày càng phổ biến.  
- An toàn & kiểm thử prompt/agent (promptfoo) nổi lên như nền tảng cần thiết khi agents ngày càng tự động hóa tác vụ quan trọng.

2) Dự án hot theo danh mục
(Chỉ liệt kê nhanh — link kèm sao/tăng hôm nay)

🔧 Cơ sở hạ tầng AI
- https://github.com/huggingface/transformers — ⭐157,711 — Framework mô hình đa-domain; chuẩn để phát triển/integrate mô hình.
- https://github.com/ollama/ollama — ⭐164,784 — Local model manager/runtime; thúc đẩy deployment cục bộ.
- https://github.com/vllm-project/vllm — ⭐72,765 — High-throughput inference engine cho LLM.
- https://github.com/promptfoo/promptfoo — tăng +661 hôm nay — Test & red-teaming prompts/agents.

🤖 AI Agent / Workflow
- https://github.com/langchain-ai/langchain — ⭐129,035 — Nền tảng agent engineering tiêu chuẩn.
- https://github.com/langgenius/dify — ⭐132,148 — Production agent workflow platform.
- https://github.com/msitarzewski/agency-agents — tăng +6,223 hôm nay — Bộ agent chuyên môn hoá sẵn, viral hôm nay.
- https://github.com/openclaw/openclaw — tăng +9,080 hôm nay — Personal assistant across OS.

📦 Ứng dụng AI
- https://github.com/zhayujie/chatgpt-on-wechat — ⭐42,107 — AI assistant đa-kênh cho thị trường Trung Quốc.
- https://github.com/OpenBB-finance/OpenBB — ⭐62,797 — Ứng dụng AI cho phân tích tài chính.
- https://github.com/saturndec/waoowaoo — ⭐9,068 — Nền tảng sản xuất video bằng AI.

🧠 LLM / Huấn luyện
- https://github.com/rasbt/LLMs-from-scratch — ⭐87,641 — Giáo trình build LLM từ đầu.
- https://github.com/hiyouga/LlamaFactory — ⭐68,167 — Fine-tuning efficient toolset.

🔍 RAG / Tri thức
- https://github.com/run-llama/llama_index — ⭐47,563 — Document agent / OCR → RAG glue.
- https://github.com/FlowiseAI/Flowise — ⭐50,594 — Visual builder cho agents + RAG.
- https://github.com/milvus-io/milvus — ⭐43,300 — Vector DB hiệu suất.
- https://github.com/qdrant/qdrant — ⭐29,482 — Scalable vector search.

3) Phân tích tín hiệu xu hướng (200–300 từ)
Cộng đồng mã nguồn mở đang chuyển trọng tâm từ “mô hình riêng lẻ” sang cả một ngăn xếp hoàn chỉnh: agents + RAG + inference/ops. Dấu hiệu rõ ràng là các repo agent/harness (agency-agents, openclaw, deer-flow, langchain, dify) đồng thời bùng nổ cùng các dự án vector DB và RAG (milvus, qdrant, chroma, llama_index). Điều này phản ánh mô hình ứng dụng hiện nay: LLM trở thành motor suy luận, còn RAG + vector DB là lớp ngữ cảnh quan trọng để làm cho output chính xác và có chứng cứ. Đồng thời, hệ sinh thái “local-first” và hiệu năng inference đang lên — ollama, vllm, open-webui — cho thấy nhu cầu giảm chi phí gọi API, tăng riêng tư và control. Một tín hiệu khác là tập trung vào độ tin cậy của chuỗi công việc AI: promptfoo đại diện cho nhu cầu test, red-teaming và phòng chống hành vi không mong muốn của agents. Cuối cùng, sự phổ biến của repo hướng dẫn và huấn luyện (LLMs-from-scratch, LlamaFactory) cho thấy cộng đồng còn đang học để tùy chỉnh/huấn luyện mô hình, đặc biệt sau làn sóng phát hành nhiều mô hình mở/half-open trong vài năm gần đây. Kết luận: ứng dụng thực tế (agents + RAG) và vận hành (inference/runtime + testing) là hai trục tăng tốc chính của năm nay.

4) Điểm nóng cộng đồng — 3–5 mục để chú ý
- promptfoo (https://github.com/promptfoo/promptfoo) — cần theo dõi cho testing & red-teaming agents trước khi triển khai.
- ollama (https://github.com/ollama/ollama) & vllm (https://github.com/vllm-project/vllm) — quan trọng cho ai muốn deploy LLM cục bộ hiệu năng cao.
- run-llama/llama_index (https://github.com/run-llama/llama_index) & chroma (https://github.com/chroma-core/chroma) — nếu bạn xây RAG, đây là lớp tri thức cần ưu tiên.
- msitarzewski/agency-agents (https://github.com/msitarzewski/agency-agents) & openclaw (https://github.com/openclaw/openclaw) — xu hướng “agent-as-product” đáng thử nghiệm ý tưởng UX và monetization.

Kết thúc báo cáo. Nếu cần, tôi có thể xuất file CSV/JSON chứa danh sách repo đã lọc và phân loại để phục vụ phân tích tiếp theo.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*