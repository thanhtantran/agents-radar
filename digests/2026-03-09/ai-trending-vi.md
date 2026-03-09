# Xu hướng AI Mã nguồn mở 2026-03-09

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-03-09 02:01 UTC

---

Báo cáo Xu hướng Mã nguồn mở AI — 2026-03-09

Bước 1 — Lọc
Từ dữ liệu cung cấp, tôi giữ các repo liên quan rõ ràng tới AI/ML và loại bỏ các dự án frontend/generic không phải AI.
- Trending (giữ): 
  - GoogleCloudPlatform/generative-ai (AI notebooks, +522 hôm nay)
  - 666ghj/MiroFish (swarm intelligence, +1104)
  - openclaw/openclaw (personal AI assistant, +4603)
  - shareAI-lab/learn-claude-code (nano Claude Code agent, +566)
  - openai/skills (Skills Catalog for Codex, +612)
  - virattt/ai-hedge-fund (AI hedge fund, +275)
  - teng-lin/notebooklm-py (Unofficial NotebookLM API, +196)
  - Ed1s0nZ/CyberStrikeAI (AI-native security testing, +244)
- Trending (loại bỏ vì không rõ ràng AI): shadcn-ui/ui, toeverything/AFFiNE, is-a-dev/register, pbakaus/impeccable.

Ngoài ra, tôi sử dụng danh sách tìm kiếm chủ đề AI để lấy các dự án AI/ML tiêu biểu (ví dụ: langchain, dify, milvus, qdrant, transformers, vllm, llama_index, mem0, v.v.).

Bước 2 — Phân loại (mỗi dự án chỉ ghi nhóm chính)

🔧 Cơ sở hạ tầng AI (framework, SDK, inference, dev tools)
- https://github.com/tensorflow/tensorflow — ⭐194,049  
  Một framework ML nền tảng; tiếp tục là cơ sở cho đào tạo & triển khai quy mô lớn.
- https://github.com/pytorch/pytorch — ⭐98,055  
  Thư viện deep learning động, tiêu chuẩn cho nghiên cứu và triển khai.
- https://github.com/vllm-project/vllm — ⭐72,455  
  Engine inference hiệu suất cao, tối ưu serving LLM.
- https://github.com/ollama/ollama — ⭐164,491  
  Môi trường chạy/host mô hình on-device / local, hỗ trợ nhiều model.
- https://github.com/lancedb/lancedb — ⭐9,344  
  Thư viện embedded retrieval cho multimodal AI, tiện cho triển khai nhẹ.
- https://github.com/firecrawl/firecrawl — ⭐89,573  
  Web data API để chuẩn hoá dữ liệu đầu vào cho pipeline LLM.

🤖 AI Agent / Workflow (agent framework, orchestration, MCP)
- https://github.com/langgenius/dify — ⭐131,640 [topic:rag]  
  Nền tảng production cho phát triển workflow agent.
- https://github.com/langchain-ai/langchain — ⭐128,668  
  Hệ sinh thái agent/chain phổ biến cho xây dựng ứng dụng LLM.
- https://github.com/FlowiseAI/Flowise — ⭐50,532  
  Xây agents bằng giao diện trực quan (visual builder).
- https://github.com/openclaw/openclaw — (tăng +4,603 hôm nay)  
  Trào lưu trợ lý cá nhân mã nguồn mở — hiện đang bùng nổ về quan tâm.
- https://github.com/shareAI-lab/learn-claude-code — (tăng +566 hôm nay)  
  Ví dụ nhỏ cho Claude Code–like agent, phản ánh xu hướng tích hợp Claude.
- https://github.com/CherryHQ/cherry-studio — ⭐41,032  
  Studio năng suất AI với agents & assistants chuyên dụng.

📦 Ứng dụng AI (giải pháp ngành, ứng dụng cuối)
- https://github.com/Ed1s0nZ/CyberStrikeAI — (tăng +244 hôm nay)  
  Nền tảng test bảo mật “AI-native” — kết hợp nhiều tool với orchestration thông minh.
- https://github.com/virattt/ai-hedge-fund — (tăng +275 hôm nay)  
  Bộ công cụ minh họa ứng dụng AI cho tài chính.
- https://github.com/zhayujie/chatgpt-on-wechat — ⭐42,013  
  Triển khai AI assistant trên nền tảng WeChat/enterprise — ví dụ ứng dụng thực tế.
- https://github.com/OpenBB-finance/OpenBB — ⭐62,718  
  Nền tảng dữ liệu & phân tích tài chính tích hợp AI.
- https://github.com/saturndec/waoowaoo — ⭐8,790  
  Agent platform cho sản xuất phim/điện ảnh bằng AI.
- https://github.com/presenton/presenton — ⭐4,273  
  Generator slide/présentation AI mã nguồn mở.

🧠 LLM / Huấn luyện (model code, fine-tuning, pretraining)
- https://github.com/huggingface/transformers — ⭐157,574  
  Khung định nghĩa mô hình & tooling cho training/inference LLM/VLM.
- https://github.com/hiyouga/LlamaFactory — ⭐68,052  
  Công cụ fine-tuning hiệu quả cho nhiều LLM/VLM.
- https://github.com/rasbt/LLMs-from-scratch — ⭐87,442  
  Tài liệu/khoá học triển khai LLM step-by-step — hữu ích cho engineering learning.
- https://github.com/galilai-group/stable-pretraining — ⭐132  
  Thư viện pretraining tối giản, nhắm tới reproduce/scale.
- https://github.com/skyzh/tiny-llm — ⭐3,910  
  Hướng dẫn inference & tối ưu trên Apple Silicon — xu hướng on-device.
- https://github.com/affaan-m/everything-claude-code — ⭐67,566  
  Hệ sinh thái tối ưu cho Claude Code / agent harness performance.

🔍 RAG / Tri thức (vector DB, retrieval, memory)
- https://github.com/run-llama/llama_index — ⭐47,488  
  Leading document agent / OCR platform (indexing + retrieval).
- https://github.com/milvus-io/milvus — ⭐43,201  
  Vector DB cloud-native cho ANN search quy mô lớn.
- https://github.com/qdrant/qdrant — ⭐29,379  
  Vector DB hiệu năng cao, phổ biến trong RAG stacks.
- https://github.com/chroma-core/chroma — ⭐26,514  
  DB retrieval cho ứng dụng RAG mã nguồn mở.
- https://github.com/weaviate/weaviate — ⭐15,763  
  Vector DB tích hợp schema & semantic search.
- https://github.com/mem0ai/mem0 — ⭐49,070  
  Lớp memory cho agents, tập trung vào long-term memory cho workflows.

Bước 3 — Điểm nổi bật hôm nay (3–5 câu)
- Cộng đồng đang đổ xô vào nền tảng agent và trợ lý cá nhân mã nguồn mở: openclaw (trend +4.6k sao hôm nay) cùng với các agent stacks như LangChain/Dify/Flowise thu hút nhiều hoạt động.  
- Hệ sinh thái RAG và cơ sở dữ liệu vector (Milvus, Qdrant, Chroma, Weaviate, Mem0) tiếp tục là xương sống cho ứng dụng LLM thực tế.  
- Tăng tốc ở lớp inference/on-device (Ollama, vllm, tiny-llm) và tích hợp với các API frontier (Gemini, Claude Code) thúc đẩy nhiều repo ví dụ, SDK và hướng dẫn.

Bước 4 — Phân tích tín hiệu xu hướng (200–300 từ)
Ngày 2026-03-09 cho thấy tín hiệu rõ rệt: cộng đồng ưu tiên “agent-first” và “data-to-LLM” stacks. Các repo agent (LangChain, Dify, Flowise, openclaw) và các memory/knowledge layer (Mem0, LlamaIndex, Milvus, Qdrant, Chroma) xuất hiện đồng thời, cho thấy mô hình phát triển ứng dụng AI hiện nay là kết hợp agent orchestration + retrieval-augmented context. Sự bùng nổ sao trên openclaw và nhiều repo tích hợp Claude/Gemini phản ánh hai luồng: (1) tích hợp nhanh các LLM thương mại mới (Gemini trên Vertex AI; Claude Code) thông qua ví dụ/mẫu; (2) khả năng chạy cục bộ và tối ưu inference (Ollama, vllm, tiny-llm) để đáp ứng nhu cầu riêng tư và chi phí. Ngoài ra, các tool chuyên ngành (CybersStrikeAI, OpenBB, Waoowaoo) minh họa việc chuyển từ PoC sang sản phẩm theo ngành. Sự xuất hiện nhiều repo “memory layer” và “agent orchestration” chỉ ra rằng sau giai đoạn “model mania”, cộng đồng đang đầu tư vào hạ tầng vận hành: lưu trữ tri thức, bảo đảm ngữ cảnh dài hạn, sandbox an toàn cho agents, và pipelines chuẩn hoá dữ liệu (Firecrawl, PaddleOCR). Kết luận: năm 2026 tiếp tục là cuộc đua tích hợp LLM với infra RAG + agents + inference hiệu năng cao — người chiến thắng là hệ sinh thái cung cấp stack end-to-end, dễ tích hợp với cả cloud frontier (Gemini/Claude) và runtime local.

Bước 5 — Điểm nóng cộng đồng (3–5 đề xuất)
- LangChain (https://github.com/langchain-ai/langchain) — vì là tiêu chuẩn de-facto cho agent/chain, cần theo dõi API/khả năng tích hợp mới.  
- Dify (https://github.com/langgenius/dify) — nền tảng production-ready cho agentic workflows; thích hợp cho triển khai doanh nghiệp.  
- vllm (https://github.com/vllm-project/vllm) & Ollama (https://github.com/ollama/ollama) — theo dõi nếu bạn cần inference throughput và on-device hosting.  
- Mem0 (https://github.com/mem0ai/mem0) & LlamaIndex (https://github.com/run-llama/llama_index) — layer memory / doc indexing đang trở thành yếu tố phân biệt trải nghiệm agent.  
- Qdrant (https://github.com/qdrant/qdrant) / Chroma (https://github.com/chroma-core/chroma) — ưu tiên khi xây RAG: performance và tích hợp SDK.

Kết thúc — Gợi ý ngắn cho nhà phát triển
- Nếu bạn làm sản phẩm: ưu tiên tích hợp RAG + short/long-term memory từ đầu.  
- Nếu bạn là kỹ sư nền tảng: đầu tư vào inference-efficient runtimes và SDK kết nối tới Gemini/Claude.  
- Nếu bạn là nhà nghiên cứu: đóng góp benchmarks/guardrails cho agents (safety, evaluation) — vùng này còn thiếu chuẩn mực.

Nếu cần, tôi có thể xuất bản bản tóm tắt ngắn cho mỗi repo (README keypoints, quickstart link) hoặc lọc thêm theo ngôn ngữ lập trình/ứng dụng cụ thể.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*