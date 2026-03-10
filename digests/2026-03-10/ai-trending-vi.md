# Xu hướng AI Mã nguồn mở 2026-03-10

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-03-10 01:53 UTC

---

Báo cáo Xu hướng Mã nguồn mở AI — 2026-03-10

Bước 1 — Lọc
- Bao gồm: tất cả repo rõ ràng liên quan AI/ML/LLM/agent/vector-RAG từ cả danh sách Trending và kết quả tìm kiếm chủ đề (ví dụ: GoogleCloudPlatform/generative-ai, openclaw/openclaw, karpathy/nanochat, vllm, langchain, meilisearch, milvus, qdrant, …).
- Loại ra: repo không liên quan trực tiếp tới AI (ví dụ Win11Debloat), frontend/giao diện thuần túy không chuyên AI nếu không có thành phần AI rõ ràng.

Bước 2 — Phân loại (mỗi repo chọn nhóm chính)

🔧 Cơ sở hạ tầng AI
- https://github.com/pytorch/pytorch — ⭐98,135 — Framework deep learning phổ biến cho huấn luyện & inference.
- https://github.com/huggingface/transformers — ⭐157,666 — Thư viện định nghĩa & tải model SOTA; cơ sở cho nhiều pipeline.
- https://github.com/vllm-project/vllm — ⭐72,630 — Engine inference hiệu năng cao cho LLM; tối ưu throughput/memory.
- https://github.com/ollama/ollama — ⭐164,671 — Runtime/self-host cho nhiều model mở; tiện cho triển khai cục bộ.
- https://github.com/open-webui/open-webui — ⭐126,443 — Giao diện người dùng đa model, hữu ích cho triển khai nhanh & testing.
- https://github.com/GoogleCloudPlatform/generative-ai — ⭐0 (+1282 today) — Bộ notebook mẫu tích hợp Gemini/Vertex AI, đáng chú ý vì lượng tương tác hôm nay.

🤖 AI Agent / Workflow
- https://github.com/langchain-ai/langchain — ⭐128,870 — Nền tảng chính cho kiến trúc agent và orchestration.
- https://github.com/langgenius/dify — ⭐131,806 — Nền tảng production-ready cho agentic workflow.
- https://github.com/CherryHQ/cherry-studio — ⭐41,118 — Studio năng suất với agent & thư viện assistents.
- https://github.com/activepieces/activepieces — ⭐21,147 — Tự động hóa workflow & MCPs cho agents.
- https://github.com/msitarzewski/agency-agents — ⭐0 (+4415 today) — Bộ agent mô phỏng agency (trending hôm nay).
- https://github.com/NousResearch/hermes-agent — ⭐0 (+377 today) — Agent "tự lớn" (trending).

📦 Ứng dụng AI (giải pháp, ngành dọc)
- https://github.com/666ghj/MiroFish — ⭐0 (+2294 today) — Swarm intelligence engine cho dự báo (trending).
- https://github.com/666ghj/BettaFish — ⭐0 (+514 today) — Ứng dụng đa-agent phân tích舆情 (trending).
- https://github.com/zhayujie/chatgpt-on-wechat — ⭐42,067 — Ứng dụng chatbot/agent tích hợp nhiều nền tảng nhắn tin.
- https://github.com/presenton/presenton — ⭐4,282 — Generator slide AI, thay thế công cụ trình bày.
- https://github.com/saturndec/waoowaoo — ⭐8,932 — Nền tảng sản xuất video/film bằng AI.
- https://github.com/OpenBB-finance/OpenBB — ⭐62,752 — Ứng dụng phân tích tài chính có tích hợp AI.

🧠 LLM / Huấn luyện
- https://github.com/hiyouga/LlamaFactory — ⭐68,113 — Framework fine-tuning thống nhất cho nhiều LLM/VLM.
- https://github.com/The-Pocket/PocketFlow — ⭐10,167 — Khung LLM nhẹ, hỗ trợ xây dựng/agents.
- https://github.com/rasbt/LLMs-from-scratch — ⭐87,547 — Tài nguyên học & triển khai LLM từ đầu.
- https://github.com/galilai-group/stable-pretraining — ⭐133 — Thư viện tối giản cho pretraining quy mô lớn.
- https://github.com/skyzh/tiny-llm — ⭐3,913 — Hướng dẫn inference LLM trên Apple Silicon (học/triển khai).

🔍 RAG / Tri thức (vector DB, retrieval, memory)
- https://github.com/meilisearch/meilisearch — ⭐56,255 — Search engine tốc độ cao, hỗ trợ hybrid/semantic search.
- https://github.com/milvus-io/milvus — ⭐43,275 — Vector DB cloud-native quy mô lớn.
- https://github.com/qdrant/qdrant — ⭐29,446 — Vector search engine hiệu năng cao.
- https://github.com/chroma-core/chroma — ⭐26,525 — OSS retrieval DB cho ứng dụng AI.
- https://github.com/weaviate/weaviate — ⭐15,770 — Vector DB tích hợp filtering & schema.
- https://github.com/lancedb/lancedb — ⭐9,364 — Library embedded retrieval multimodal.
- https://github.com/infiniflow/ragflow — ⭐74,588 — RAG engine tích hợp agent để tạo context layer.
- https://github.com/mem0ai/mem0 — ⭐49,189 — Lớp memory cho AI agents.
- https://github.com/khoj-ai/khoj — ⭐33,317 — Self-host RAG & personal AI second brain.

1) Điểm nổi bật hôm nay
- Sự bùng nổ tương tác với các dự án agent và multi-agent: openclaw, msitarzewski/agency-agents và nhiều repo agent khác tăng mạnh lượng sao.  
- Vector DB & RAG tiếp tục là trục trung tâm: nhiều dự án (Milvus, Qdrant, Chroma, Meilisearch, Lancedb) giữ traction mạnh.  
- Runtime/inference stacks (vllm, Ollama, Open Web UI) và notebook mẫu cloud (Google generative-ai) chiếm spotlight — phản ánh nhu cầu triển khai model đa dạng (self-host, cloud, on-device).  
- Xu hướng “privacy/on-device” và “agent ecosystems” song hành: project như anything-llm, LlamaFactory, tiny-llm và Ollama cho thấy nhu cầu vận hành LLM tại rìa (edge) đồng thời tích hợp nhiều nguồn tri thức.

2) Phân tích tín hiệu xu hướng (200–300 từ)
Cộng đồng đang tập trung tiền tuyến vào hai lớp nền tảng: (1) runtime-inference và deployment (vllm, Ollama, Open Web UI) để tối ưu chi phí/latency khi phục vụ LLM; và (2) lớp ngữ nghĩa/tri thức (vector DB + RAG) để cung cấp context bền vững cho LLM. Đồng thời, “agentization” — tức đưa LLM vào cấu trúc agent có memory, skills và workflow — đang bùng nổ: LangChain, Dify, Flowise và hàng loạt project agent trên Trending cho thấy nhà phát triển ưu tiên orchestration/automation hơn là chỉ gọi API đơn thuần. Hai dòng song song nữa nổi lên: on-device & privacy-first (anything-llm, tiny-llm, LlamaFactory) và toolchains cho production (ActivePieces, Cherry Studio, Infiniflow/ragflow). Sự đa dạng runtime/model (hỗ trợ nhiều mô hình mở và proprietary trong cùng một stack) khiến hệ sinh thái chuyển từ “một model” sang “nhiều model, nhiều runtime, nhiều nguồn tri thức”. Điều này liên quan trực tiếp tới làn sóng model mở và công cụ phục vụ self‑hosting/inference hiệu năng cao: khi nhiều model mới xuất hiện, nhu cầu về vector DB, memory layers và orchestrator agent càng tăng. Kết quả: dự án kết hợp RAG + agent + runtime được cộng đồng chú ý mạnh nhất.

3) Điểm nóng cộng đồng — 3–5 khuyến nghị cho nhà phát triển
- Tập trung vào tích hợp RAG + agent: xem xét đóng góp/ứng dụng tại https://github.com/langchain-ai/langchain và https://github.com/infiniflow/ragflow — vì đây là stack có traction cao.  
- Thử nghiệm với runtime inference hiệu năng (vllm) và self-host runtimes: https://github.com/vllm-project/vllm và https://github.com/ollama/ollama — cần cho production.  
- Chọn một hoặc hai vector DB để hỗ trợ RAG (Meilisearch / Milvus / Qdrant / Chroma): https://github.com/meilisearch/meilisearch , https://github.com/milvus-io/milvus , https://github.com/qdrant/qdrant — tương lai là multi-store interoperability.  
- Xem xét phát triển tính năng privacy/on-device: https://github.com/Mintplex-Labs/anything-llm , https://github.com/skyzh/tiny-llm — xu hướng quan trọng cho sản phẩm có yêu cầu dữ liệu nhạy cảm.  
- Nếu làm sản phẩm agent hướng doanh nghiệp, theo dõi/đóng góp vào https://github.com/activepieces/activepieces và https://github.com/CherryHQ/cherry-studio — frameworks này đang trở thành tiêu chuẩn cho workflow & MCP.

Kết luận ngắn: Hệ sinh thái OSS AI hiện chuyển từ “mô hình đơn lẻ” sang “stack có lớp runtime + tri thức + agent” — các công trình tối ưu inference, vector-RAG và agent orchestration là những nơi nhận được nhiều tín hiệu cộng đồng nhất.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*