# Xu hướng AI Mã nguồn mở 2026-05-30

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-05-30 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 30/05/2026

## 📊 Tóm tắt hôm nay

Thị trường AI mã nguồn mở đang chứng kiến sự bùng nổ của **AI Agents** và **Agent Harness** - các hệ thống cho phép AI tự động hóa công việc phức tạp. Đồng thời, **Embedded AI trên NPU** (đặc biệt là Rockchip RK3588) đang trở thành xu hướng mạnh với nhiều dự án triển khai LLM và multimodal AI trên phần cứng giá rẻ. RAG và knowledge management tiếp tục là nền tảng quan trọng cho các ứng dụng AI thực tế.

---

## 🏆 Top Repos Theo Chiều

### 🤖 **AI Agents**

**⭐ Siêu sao:**
- **NousResearch/hermes-agent** (172,882⭐) - "The agent that grows with you" - Agent tự phát triển với khả năng học hỏi
- **affaan-m/ECC** (198,600⭐) - Hệ thống tối ưu hiệu suất agent harness với skills, instincts, memory cho Claude Code và các agent khác

**🔥 Trending mạnh:**
- **shareAI-lab/learn-claude-code** (63,578⭐) - "Bash is all you need" - Xây dựng agent harness từ 0 đến 1
- **zhayujie/CowAgent** (44,948⭐) - Super AI assistant mã nguồn mở, tự động lập kế hoạch, chạy tools, tự phát triển với memory
- **HKUDS/nanobot** (43,376⭐) - Lightweight agent cho tools, chats và workflows
- **santifer/career-ops** (47,835⭐) - Hệ thống tìm việc AI-powered với 14 skill modes, dashboard Go

**💡 Đáng chú ý:**
- **CopilotKit/CopilotKit** (31,843⭐) - Frontend Stack cho Agents & Generative UI (React + Angular)
- **Gitlawb/openclaude** (28,051⭐) - "runs anywhere. uses anything" - Agent đa nền tảng

### 🔧 **AI Infrastructure**

**🚀 Nền tảng phát triển:**
- **langgenius/dify** (143,122⭐) - Platform production-ready cho agentic workflow
- **langchain-ai/langchain** (137,990⭐) - "The agent engineering platform"
- **ollama/ollama** (172,620⭐) - Chạy Kimi-K2.5, GLM-5, MiniMax, DeepSeek, Qwen, Gemma local

**⚡ Inference & Serving:**
- **vllm-project/vllm** (81,384⭐) - High-throughput inference engine cho LLMs
- **open-webui/open-webui** (139,198⭐) - User-friendly AI Interface hỗ trợ Ollama, OpenAI API

**🛠️ Tools & SDKs:**
- **firecrawl/firecrawl** (126,169⭐) - API để search, scrape và tương tác với web ở quy mô lớn
- **browser-use/browser-use** (96,204⭐) - Làm cho websites accessible cho AI agents

### 🧠 **Models & Training**

- **huggingface/transformers** (161,051⭐) - Framework cho SOTA ML models (text, vision, audio, multimodal)
- **hiyouga/LlamaFactory** (71,701⭐) - Unified fine-tuning cho 100+ LLMs & VLMs (ACL 2024)
- **OpenHands/OpenHands** (75,340⭐) - AI-Driven Development platform

### 📦 **AI Applications**

**🎯 Vertical Solutions:**
- **CherryHQ/cherry-studio** (46,573⭐) - AI productivity studio với smart chat, autonomous agents, 300+ assistants
- **ZhuLinsen/daily_stock_analysis** (39,398⭐) - LLM-driven stock analysis cho A/H/US markets với multi-source data
- **Mintplex-Labs/anything-llm** (60,788⭐) - All-in-one AI productivity accelerator, on-device và privacy-first

**📚 Học tập & Cộng đồng:**
- **f/prompts.chat** (163,033⭐) - Share, discover prompts từ cộng đồng (f.k.a. Awesome ChatGPT Prompts)
- **datawhalechina/hello-agents** (54,649⭐) - Tutorial xây dựng intelligent agents từ đầu (tiếng Trung)
- **thedaviddias/Front-End-Checklist** (72,747⭐) - Essential checklist cho web development hiện đại, cho cả humans và AI agents

### 🔍 **RAG & Knowledge**

**🏗️ RAG Platforms:**
- **infiniflow/ragflow** (81,528⭐) - Leading RAG engine kết hợp Agent capabilities
- **thedotmack/claude-mem** (79,619⭐) - Persistent context across sessions cho mọi agent - captures, compresses và injects context

**📄 Document Processing:**
- **PaddlePaddle/PaddleOCR** (78,969⭐) - Powerful OCR toolkit hỗ trợ 100+ ngôn ngữ, bridge giữa images/PDFs và LLMs

**🧩 Knowledge Management:**
- **mem0ai/mem0** (57,099⭐) - Universal memory layer cho AI Agents
- **safishamsi/graphify** (56,202⭐) - AI coding assistant skill - biến code, schemas, docs thành queryable knowledge graph

### 🔌 **Embedded AI**

**🎯 Rockchip NPU (RK3588/RK3576):**

**Multimodal AI:**
- **Leon6225/InternVL3.5-4B-NPU** (1⭐) - InternVL3.5-4B cho RK3588 NPU với vision & language understanding
- **toopac01/InternVL3.5-8B-NPU** (0⭐) - InternVL3.5-8B variant cho RK3588

**Inference Platforms:**
- **mafischer/oRKLLM** (1⭐) - OpenAI-compatible LLM inference server cho Rockchip NPU, chạy local AI trên SBC $50
- **kyshipit/edgeai_platform** (0⭐) - Extensible RK3588 edge inference platform với multi-threaded pipeline, RKNN adapters, RKLLM chat

**SDKs & Bindings:**
- **swdee/go-rknnlite** (179⭐) - CGO bindings cho RKNN-Toolkit2, inferencing trong Go trên Rockchip NPU

**🍊 Orange Pi Ecosystem:**
- **MichaIng/DietPi** (6,088⭐) - Lightweight OS cho single-board computers
- **geerlingguy/sbc-reviews** (979⭐) - Jeff Geerling's SBC review data (Raspberry Pi, Radxa, Orange Pi)
- **lvyufeng/minicpm-v-4.6-orangepi** (9⭐) - MiniCPM-V 4.6 trên Orange Pi
- **Ponce1969/contador-oriental-ai** (3⭐) - Hệ thống quản lý tài chính gia đình với AI local, 100% offline cho Orange Pi 5 Plus

**🔧 Infrastructure:**
- **freed-dev-llc/terraform-provider-turingpi** (6⭐) - Terraform provider cho Turing Pi 2.5 BMC cluster deployment
- **vanvught/rpidmx512** (442⭐) - Orange Pi DMX512/RDM/MIDI/OSC/Art-Net support

---

## 🔮 Phân tích Tín hiệu Xu hướng

### 1️⃣ **Agent Harness Revolution**
- **Pattern mới:** "Agent harness" đang trở thành thuật ngữ hot - các framework cho phép agents tự động hóa, học hỏi và phát triển
- **Công nghệ nổi bật:** Memory persistence (claude-mem), skill systems (ECC), autonomous growth (CowAgent)
- **Insight:** Thị trường đang chuyển từ "chatbot" sang "autonomous agent" có khả năng tự phát triển

### 2️⃣ **Embedded AI Democratization**
- **Rockchip NPU boom:** RK3588/RK3576 đang trở thành platform phổ biến cho edge AI với giá thành cực thấp ($50 SBC)
- **Multimodal on edge:** InternVL3.5 (4B/8B) chạy được trên NPU - vision + language trên phần cứng giá rẻ
- **OpenAI-compatible servers:** oRKLLM cho thấy xu hướng standardization API ngay cả trên embedded

### 3️⃣ **Knowledge Graph for Code**
- **Graphify pattern:** Biến code, schemas, docs thành knowledge graph queryable - cách tiếp cận mới cho code understanding
- **RAG evolution:** Từ simple retrieval sang graph-based reasoning

### 4️⃣ **Privacy-First AI**
- **On-device inference:** Anything-llm, Orange Pi solutions nhấn mạnh privacy và offline capability
- **Local-first architecture:** Xu hướng chạy AI hoàn toàn local, không phụ thuộc cloud

### 5️⃣ **Agent Engineering Platform**
- **Langchain rebranding:** Từ "framework" sang "agent engineering platform" - signal về sự trưởng thành của lĩnh vực
- **Production-ready focus:** Dify, vLLM nhấn mạnh production deployment, không chỉ prototype

---

## 🎯 Tâm điểm Cộng đồng

### 🔥 **Cuộc đua Agent Harness**
- **ECC (198K⭐)** vs **Hermes-agent (172K⭐)** vs **CowAgent (44K⭐)** - ba cách tiếp cận khác nhau cho autonomous agents
- Cộng đồng đang tìm kiếm "the right abstraction" cho agent development

### 💎 **Hidden Gems**
- **oRKLLM** - OpenAI-compatible server trên $50 hardware là game-changer cho edge AI
- **graphify** - Code-to-knowledge-graph approach rất innovative cho AI coding assistants
- **claude-mem** - Persistent context solution đang được nhiều agent frameworks adopt

### 🌊 **Sóng mới từ Trung Quốc**
- **daily_stock_analysis**, **hello-agents**, **CowAgent** - ecosystem AI mạnh từ Trung Quốc với focus vào practical applications
- Nhiều projects Trung Quốc đang dẫn đầu về agent automation và vertical AI solutions

### 🛠️ **Developer Experience Focus**
- **Front-End-Checklist** update cho AI agents - signal về việc tools cần adapt cho AI-first development
- **CopilotKit** - Frontend stack cho Generative UI đang tạo standard mới

---

## 💡 Kết luận

**2026 là năm của Autonomous Agents và Embedded AI.** Thị trường đang chuyển từ "AI as a service" sang "AI as a teammate" với khả năng tự phát triển, và từ "cloud AI" sang "edge AI" với chi phí cực thấp. Các developer cần chú ý đến agent harness frameworks, Rockchip NPU ecosystem, và knowledge graph approaches cho code understanding.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*