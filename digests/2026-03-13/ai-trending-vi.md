# Xu hướng AI Mã nguồn mở 2026-03-13

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-03-13 01:58 UTC

---

Báo cáo Xu hướng Mã nguồn mở AI — 2026-03-13

Bước 1 (Lọc)
Tôi đã chọn các dự án rõ ràng liên quan đến AI/ML từ danh sách Trending và kết quả tìm kiếm chủ đề, loại bỏ repo không chuyên AI (frontend chung, game, v.v.). Các repo được giữ bao gồm inference runtime, frameworks ML/LLM, agent & workflow, RAG/vector DB, TTS, memory/long-term memory, và nền tảng huấn luyện.

Bước 2 (Phân loại chính)
(Chú ý: một số dự án xuất hiện cả trong Trending và Topic — tôi đưa thông tin tổng sao nếu có, kèm số sao "mới hôm nay" từ Trending khi có.)

🔧 Cơ sở hạ tầng AI
- microsoft/BitNet — (mới hôm nay +2149) — https://github.com/microsoft/BitNet  
  Official inference framework for 1-bit LLMs; đáng chú ý vì cú nhảy về inference cực tiết kiệm bộ nhớ/chi phí.
- google-ai-edge/LiteRT — (mới hôm nay +13) — https://github.com/google-ai-edge/LiteRT  
  Google's successor to TensorFlow Lite: runtime & conversion tối ưu cho on-device GenAI.
- vllm-project/vllm — ⭐72,959 — https://github.com/vllm-project/vllm  
  High-throughput, memory-efficient inference & serving engine cho LLMs.
- ollama/ollama — ⭐164,954 — https://github.com/ollama/ollama  
  Local/hosted model runtime & repo cho nhiều mô hình (dễ triển khai on-prem).
- huggingface/transformers — ⭐157,798 — https://github.com/huggingface/transformers  
  Model-definition framework đa mô-đun cho text/vision/audio — hạ tầng chuẩn cho mô hình.
- pytorch/pytorch — ⭐98,236 — https://github.com/pytorch/pytorch  
  Thư viện core cho training/inference GPU, vẫn là nền tảng hàng đầu.

🤖 AI Agent / Workflow
- langflow-ai/openrag — (mới hôm nay +322) — https://github.com/langflow-ai/openrag  
  OpenRAG: nền tảng tích hợp RAG + agent, hợp nhất nhiều thành phần (Langflow/Docling/Opensearch).
- msitarzewski/agency-agents — (mới hôm nay +4168) — https://github.com/msitarzewski/agency-agents  
  Bộ sưu tập agent chuyên môn hoá; xu hướng “agency” hóa workflows.
- NousResearch/hermes-agent — ⭐6,199 (mới hôm nay +1264) — https://github.com/NousResearch/hermes-agent  
  Agent tự phát triển/long-term growth — thu hút nhiều chú ý hôm nay.
- CopilotKit/CopilotKit — ⭐29,317 — https://github.com/CopilotKit/CopilotKit  
  Frontend stack cho Agents & Generative UI — tiêu chuẩn giao diện tác nghiệp cho agent apps.
- trycua/cua — ⭐13,030 — https://github.com/trycua/cua  
  Hạ tầng mở cho Computer-Use Agents (sandbox, SDK, benchmark).
- FlowiseAI/Flowise — ⭐50,672 — https://github.com/FlowiseAI/Flowise  
  Xây agent bằng giao diện trực quan — no/low-code cho agent workflows.

📦 Ứng dụng AI (industry / end-user)
- fishaudio/fish-speech — (mới hôm nay +637) — https://github.com/fishaudio/fish-speech  
  SOTA Open Source TTS — thu hút devs làm sản phẩm voice.
- anthropics/claude-plugins-official — (mới hôm nay +150) — https://github.com/anthropics/claude-plugins-official  
  Thư mục plugin chính thức cho Claude Code — biểu hiện hệ sinh thái plugin phát triển.
- 666ghj/MiroFish — (mới hôm nay +1857) — https://github.com/666ghj/MiroFish  
  Swarm intelligence engine — ứng dụng dự đoán/agent swarm.
- Panniantong/Agent-Reach — ⭐8,712 — https://github.com/Panniantong/Agent-Reach  
  Cấp “mắt” cho agent trên internet (Twitter, Reddit, YouTube…) — giảm chi phí API.
- OpenBB-finance/OpenBB — ⭐62,920 — https://github.com/OpenBB-finance/OpenBB  
  Ứng dụng AI cho phân tích tài chính và agent nghiệp vụ.

🧠 LLM / Huấn luyện
- hiyouga/LlamaFactory — ⭐68,315 — https://github.com/hiyouga/LlamaFactory  
  Unified efficient fine-tuning cho >100 LLMs & VLMs — tối ưu hoá FT quy mô lớn.
- The-Pocket/PocketFlow — ⭐10,184 — https://github.com/The-Pocket/PocketFlow  
  100-line LLM framework — đơn giản hoá xây dựng/triển khai LLM.
- open-compass/opencompass — ⭐6,751 — https://github.com/open-compass/opencompass  
  Nền tảng benchmark/eval LLM lớn, hỗ trợ nhiều model (Llama3, Mistral, v.v.).
- rasbt/LLMs-from-scratch — ⭐87,849 — https://github.com/rasbt/LLMs-from-scratch  
  Hướng dẫn xây LLM bằng PyTorch — quan trọng cho học tập/giảng dạy.

🔍 RAG / Tri thức (Vector DB, retrieval, memory)
- langchain-ai/langchain — ⭐129,306 — https://github.com/langchain-ai/langchain  
  Hệ sinh thái agent & RAG chuẩn — nền tảng cho orchestration & tool-calling.
- langgenius/dify — ⭐132,548 — https://github.com/langgenius/dify  
  Production-ready platform cho agentic workflows & RAG.
- run-llama/llama_index — ⭐47,628 — https://github.com/run-llama/llama_index  
  Leading document agent & OCR platform — tích hợp tri thức cho LLMs.
- mem0ai/mem0 — ⭐49,597 — https://github.com/mem0ai/mem0  
  Universal memory layer cho AI Agents — long-term memory tập trung.
- milvus-io/milvus — ⭐43,322 — https://github.com/milvus-io/milvus  
  Vector DB hiệu năng cao cho ANN search quy mô.
- chroma-core/chroma — ⭐26,602 — https://github.com/chroma-core/chroma  
  OSS embedded retrieval DB cho ứng dụng multimodal.

Bước 3 — Xuất báo cáo

1) Điểm nổi bật hôm nay
- Cộng đồng đang bùng nổ quan tâm tới “agent stack” (từ UI/visual builders đến orchestration & multi-agent): nhiều repo agent nhận lượng star lớn.  
- Hiện tượng nổi bật là Microsoft/BitNet (1-bit LLM inference) thu hút rất nhiều quan tâm — tín hiệu mạnh cho xu hướng inference cực tiết kiệm tài nguyên.  
- Hệ sinh thái RAG / vector DB tiếp tục trưởng thành (LangChain, Dify, Milvus, Chroma, LlamaIndex, mem0) — tập trung vào memory & retrieval cho agent.  
- On-device/runtime improvements (Google LiteRT, Ollama, vLLM) cùng với plugin ecosystems (Anthropic Claude plugins) cho thấy hướng đa dạng hoá triển khai: on-prem, edge, cloud.

2) Phân tích tín hiệu xu hướng (200–300 từ)
Các tín hiệu từ danh sách hôm nay cho thấy ba trục chính: (1) Agentization — nhiều dự án agent/agency (langchain, openrag, agency-agents, hermes-agent, Flowise) cho thấy cộng đồng đang chuyển từ “single-query LLM” sang các hệ thống có trạng thái, công cụ, quy trình (workflows) và multi-agent; (2) Efficiency & Edge inference — BitNet (1-bit inference), vLLM, LiteRT, Ollama phản ánh áp lực giảm chi phí inference: mô hình nhỏ/biến đổi kích thước, quantization mạnh, runtime chuyên dụng để triển khai thực tế; (3) RAG + Memory — vector DBs, mem0, LlamaIndex và các nền tảng RAG tích hợp đang là lớp trung gian thiết yếu để biến LLM thành công cụ có “tri thức” bền vững. Sự xuất hiện của giao diện plugin chính thức (Claude plugins) và các công cụ no-code/visual (Flowise, Langflow) chỉ ra nhu cầu nhanh chóng chuyển từ prototyping sang sản phẩm. Những xu hướng này liên quan trực tiếp đến các phát hành LLM gần đây (Llama3, Mistral, nhiều model on-device trên Ollama), vì các model mới thúc đẩy nhu cầu runtime hiệu năng cao và hệ sinh thái hỗ trợ (tooling, retrieval, memory, guardrails). Cuối cùng, sự cạnh tranh giữa vector DB (Milvus, Qdrant, Chroma) và các giải pháp embedded (LEANN, Lancedb) cho thấy tối ưu chi phí lưu trữ/latency là yếu tố quyết định cho ứng dụng RAG ở sản xuất.

3) Điểm nóng cộng đồng (3–5 mục, kèm lý do)
- microsoft/BitNet — https://github.com/microsoft/BitNet  
  Lý do: 1-bit inference có thể thay đổi chi phí triển khai LLM lớn; đáng thử nghiệm cho các hệ thống production-constrained.  
- langchain-ai/langchain & langgenius/dify — https://github.com/langchain-ai/langchain | https://github.com/langgenius/dify  
  Lý do: nền tảng orchestration & RAG trung tâm cho agent; tích hợp sâu là vũ khí cạnh tranh cho nhiều sản phẩm AI.  
- mem0ai/mem0 & vector DBs (milvus, chroma) — https://github.com/mem0ai/mem0 | https://github.com/milvus-io/milvus | https://github.com/chroma-core/chroma  
  Lý do: triển khai long-term memory và retrieval hiệu quả là chìa khóa để agent hữu dụng lâu dài.  
- google-ai-edge/LiteRT & ollama/ollama — https://github.com/google-ai-edge/LiteRT | https://github.com/ollama/ollama  
  Lý do: runtime/edge/on-prem inference—cần quan tâm nếu bạn triển khai mô hình tại biên hoặc cần privacy/on-prem solutions.

Kết luận ngắn gọn: cộng đồng đang tích hợp LLM với hệ thống tri thức và agent orchestration, đồng thời đẩy mạnh inference tiết kiệm tài nguyên và runtime đa nền tảng. Nếu bạn là dev/architect, ưu tiên thử nghiệm 1-bit inference, layer memory (mem0/llama_index) và công cụ orchestration (LangChain/ Dify/Flowise) để xây ứng dụng agent có khả năng sản xuất.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*