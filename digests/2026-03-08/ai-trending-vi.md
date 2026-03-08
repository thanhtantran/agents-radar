# Xu hướng AI Mã nguồn mở 2026-03-08

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-03-08 03:35 UTC

---

Báo cáo Xu hướng Mã nguồn mở AI — 2026-03-08

Bước 1 (Lọc)
Tôi đã chọn những repo rõ ràng liên quan đến AI/ML từ dữ liệu trending và kết quả tìm kiếm (loại trừ thư viện giao diện frontend thuần túy, game, template UI, v.v.). Những repo trending không liên quan AI (ví dụ shadcn-ui/ui) đã bị loại.

Bước 2 (Phân loại — nhóm chính)
(Dự án có thể thuộc nhiều nhóm; dưới đây là nhóm chính được chọn)

🔧 Cơ sở hạ tầng AI
- https://github.com/huggingface/transformers — ⭐157,539  
  Mô tả: Thư viện mô hình Transformer đa năng; nền tảng chuẩn cho triển khai và fine‑tune mô hình.
- https://github.com/pytorch/pytorch — ⭐98,026  
  Mô tả: Framework deep learning động, tiêu chuẩn cho nghiên cứu và sản xuất.
- https://github.com/vllm-project/vllm — ⭐72,365  
  Mô tả: Engine phục vụ inference LLM, tối ưu throughput và bộ nhớ cho mô hình lớn.
- https://github.com/ollama/ollama — ⭐164,382  
  Mô tả: Công cụ/self‑host runtime cho chạy mô hình địa phương (local LLM management).
- https://github.com/Picovoice/picollm — ⭐303  
  Mô tả: Inference LLM on‑device với X‑bit quantization — xu hướng “on‑device” và tiết kiệm tài nguyên.

🤖 AI Agent / Workflow
- https://github.com/langchain-ai/langchain — ⭐128,570  
  Mô tả: Nền tảng hàng đầu cho phát triển agent, orchestration và tool‑calling.
- https://github.com/langgenius/dify — ⭐131,562  
  Mô tả: Platform production‑ready cho phát triển workflow/agents.
- https://github.com/msitarzewski/agency-agents — (hôm nay +1,468) — (tổng: N/A)  
  Mô tả: Bùng nổ quan tâm hôm nay — bộ agent hoàn chỉnh, multi‑agent demo rất “viral”.
- https://github.com/QwenLM/Qwen-Agent — (hôm nay +586) — (tổng: N/A)  
  Mô tả: Framework agent xây dựng trên Qwen≥3.0, hỗ trợ function calling, RAG, code interpreter.
- https://github.com/agentjido/jido — (hôm nay +115) — (tổng: N/A)  
  Mô tả: Framework agent cho Elixir, hướng tới hành vi phân tán và workflow động.
- https://github.com/CherryHQ/cherry-studio — ⭐40,976  
  Mô tả: Studio năng suất AI với nhiều assistant/agent tích hợp.

📦 Ứng dụng AI (giải pháp/ngành)
- https://github.com/virattt/ai-hedge-fund — (hôm nay +248) — (tổng: N/A)  
  Mô tả: Ví dụ ứng dụng AI cho tài chính — thu hút chú ý như bản demo “team” AI cho hedge fund.
- https://github.com/OpenBB-finance/OpenBB — ⭐62,688  
  Mô tả: Nền tảng phân tích tài chính tích hợp AI, hướng tới nhà phân tích/quants.
- https://github.com/saturndec/waoowaoo — ⭐8,655  
  Mô tả: Nền tảng sản xuất video/film bằng AI — ứng dụng ngành sáng tạo.
- https://github.com/paddlepaddle/PaddleOCR — ⭐71,786  
  Mô tả: OCR đa ngôn ngữ, quan trọng cho chuyển tài liệu -> dữ liệu có thể dùng cho RAG.

🧠 LLM / Huấn luyện
- https://github.com/open-compass/opencompass — ⭐6,725  
  Mô tả: Nền tảng đánh giá LLM (hỗ trợ Llama3, Mistral, InternLM2, GPT‑4, Qwen, Claude…), quan trọng cho benchmark và safety testing.
- https://github.com/hiyouga/LlamaFactory — ⭐68,018  
  Mô tả: Bộ công cụ fine‑tuning hiệu quả cho hàng trăm LLM/VLM.
- https://github.com/rasbt/LLMs-from-scratch — ⭐87,365  
  Mô tả: Học từ cơ bản: xây LLM kiểu ChatGPT trong PyTorch — tài nguyên giảng dạy/training.
- https://github.com/galilai-group/stable-pretraining — ⭐132  
  Mô tả: Thư viện pretraining đáng tin cậy cho scale và reproducibility.
- https://github.com/skyzh/tiny-llm — ⭐3,906  
  Mô tả: Hướng dẫn triển khai inference LLM trên Apple Silicon — tập trung tối ưu cho edge.

🔍 RAG / Tri thức
- https://github.com/milvus-io/milvus — ⭐43,184  
  Mô tả: Vector DB hiệu suất cao cho ANN search, hạ tầng cho RAG.
- https://github.com/chroma-core/chroma — ⭐26,502  
  Mô tả: Cơ sở dữ liệu tìm kiếm/tri thức open‑source thân thiện dev.
- https://github.com/qdrant/qdrant — ⭐29,355  
  Mô tả: Vector search engine, tập trung scale & tính năng cloud.
- https://github.com/weaviate/weaviate — ⭐15,757  
  Mô tả: Vector DB tích hợp object + filter cho ứng dụng RAG phức tạp.
- https://github.com/run-llama/llama_index — ⭐47,454  
  Mô tả: LlamaIndex — nền tảng document agent / tích hợp OCR -> LLM.
- https://github.com/mem0ai/mem0 — ⭐48,994  
  Mô tả: Lớp memory universal cho agents — giải quyết long‑term memory cho agent.

Phần 3 — Điểm nổi bật hôm nay (3–5 câu)
- Hôm nay cộng đồng dồn sự chú ý vào agent và “agentization”: repo multi‑agent/skills như msitarzewski/agency-agents (+1,468 hôm nay) và openai/skills (+948 hôm nay) tăng mạnh.  
- Cùng lúc, các nền tảng orchestration/visual flow (langchain, dify, Flowise) và lớp nhớ/RAG (mem0, LlamaIndex, Milvus/Chroma/Qdrant) tiếp tục là trục trung tâm cho phát triển ứng dụng LLM thực tế.  
- Sự quan tâm đến inference/self‑host (ollama, vllm, tiny-llm, picollm) phản ánh nhu cầu hiệu năng và riêng tư khi nhiều mô hình mới (Llama3, Mistral, Qwen3, Gemini…) được sử dụng rộng rãi.  
- Ứng dụng ngành (tài chính, sản xuất video, trình chiếu tự động hóa) đang chuyển nhanh từ proof‑of‑concept sang sản phẩm mẫu công khai.

Phần 4 — Phân tích tín hiệu xu hướng (200–300 từ)
Hiện tại tín hiệu mạnh nhất là “agentization” — tức là sự tập trung vào agent framework, skills catalogs và multi‑agent orchestration. Số liệu trending hôm nay (agency‑agents, Qwen‑Agent, openai/skills) cho thấy cộng đồng không chỉ muốn chạy LLM, mà muốn xây hệ thống đa‑công cụ: agent có kỹ năng (skills), gọi hàm (function calling / MCP), nhớ dài hạn và tích hợp công cụ bên ngoài (browser, GitHub, API). Song song đó, lớp RAG/memory đang được cải thiện từ nhiều hướng: cơ sở dữ liệu vector (Milvus, Qdrant, Chroma, Weaviate), lớp memory chuyên dụng (mem0, memvid), và công cụ indexing (LlamaIndex, PageIndex). Điều này cho thấy kiến trúc phổ biến cho ứng dụng LLM là: local/remote LLM + agent orchestrator + vector DB + memory layer.

Ở tầng inference/hạ tầng, áp lực tối ưu hóa latency và chi phí thúc đẩy sự tăng trưởng cho vllm, Ollama và giải pháp on‑device như tiny-llm, picollm. Ngoài ra, nhiều repo nhắm tới developer UX (Flowise, Dify, CopilotKit), cho thấy dòng sản phẩm low‑code/visual cho agents vẫn rất hot. Cuối cùng, các repo benchmark và evaluation (OpenCompass, circle‑guard‑bench) xuất hiện nhiều, phản ánh nhu cầu kiểm thử, bảo mật và đánh giá mô hình sau các bản phát hành LLM mới (Llama3, Mistral, Qwen, Gemini, Claude). Kết luận: hệ sinh thái đang chuyển từ “chạy mô hình” sang “xây hệ thống agent an toàn, có trí nhớ và vận hành được” — đó là tâm điểm cộng đồng hiện nay.

Phần 5 — Điểm nóng cộng đồng (3–5 mục, kèm lý do ngắn)
1. Agent orchestration (LangChain / Dify / Flowise)  
   - https://github.com/langchain-ai/langchain | https://github.com/langgenius/dify | https://github.com/FlowiseAI/Flowise  
   - Lý do: Là trung tâm để kết hợp tools, RAG và memory — nếu xây ứng dụng LLM ở quy mô, cần nắm rõ stack này.

2. Vector DB & Memory layers (Milvus / Chroma / Qdrant / mem0)  
   - https://github.com/milvus-io/milvus | https://github.com/chroma-core/chroma | https://github.com/qdrant/qdrant | https://github.com/mem0ai/mem0  
   - Lý do: Hiệu năng tìm kiếm ngữ nghĩa và lưu trữ trí nhớ dài hạn quyết định trải nghiệm RAG/agent.

3. Local inference & efficiency (vllm / Ollama / tiny‑llm / picollm)  
   - https://github.com/vllm-project/vllm | https://github.com/ollama/ollama | https://github.com/skyzh/tiny-llm | https://github.com/Picovoice/picollm  
   - Lý do: Nhu cầu riêng tư, chi phí và latency đang thúc đẩy self‑host & quantized inference.

4. Đánh giá & an toàn LLM (OpenCompass / circle‑guard‑bench)  
   - https://github.com/open-compass/opencompass | https://github.com/whitecircle-ai/circle-guard-bench  
   - Lý do: Khi agent phức tạp hơn, cần bộ công cụ đánh giá, kiểm thử và guardrails.

Kết (gợi ý ngắn): Nếu bạn là nhà phát triển/kiến trúc sư, ưu tiên học stack agent + RAG + một giải pháp inference self‑host; chú ý các công cụ đánh giá an toàn. Các repo nêu trên là điểm xuất phát tốt để bắt kịp xu hướng cộng đồng hôm nay.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/compasify/agents-radar).*