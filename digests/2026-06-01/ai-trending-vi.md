# Xu hướng AI Mã nguồn mở 2026-06-01

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-06-01 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 01/06/2026

## 📊 Tóm tắt hôm nay

Ngày hôm nay chứng kiến sự bùng nổ của **Agent Harness** - một khái niệm mới đang định hình lại cách chúng ta xây dựng AI agents. Cộng đồng đang chuyển từ các chatbot đơn giản sang các hệ thống agent tự chủ với khả năng lập kế hoạch, thực thi công cụ, và tự học hỏi. Đặc biệt, có sự quan tâm mạnh mẽ đến **embedded AI** trên phần cứng giá rẻ như Orange Pi và Rockchip NPU, cho thấy xu hướng democratization của AI.

**Điểm nổi bật:**
- Agent frameworks chiếm ưu thế tuyệt đối trong trending
- Sự xuất hiện của các giải pháp AI hoàn toàn offline và local-first
- Công nghệ RKLLM/RKNPU đang trở thành mainstream cho edge AI
- RAG và memory systems ngày càng tinh vi hơn

---

## 🤖 AI Agents

### **Frameworks & Platforms**

**⭐ NousResearch/hermes-agent** (174K stars)
- Agent tự phát triển với khả năng học hỏi liên tục
- Đang là chuẩn mực mới cho autonomous agents

**⭐ anthropics/claude-code** (+489 hôm nay)
- Công cụ coding agent chạy trong terminal
- Hiểu codebase, xử lý git workflows qua ngôn ngữ tự nhiên
- Cạnh tranh trực tiếp với GitHub Copilot

**⭐ zhayujie/CowAgent** (44K stars)
- Open-source super AI assistant với agent harness
- Tự động lập kế hoạch, chạy tools, tự phát triển với memory
- Multi-model, multi-channel, cài đặt một dòng lệnh

**⭐ HKUDS/nanobot** (43K stars)
- Lightweight agent cho tools, chats, workflows
- Tập trung vào tính đơn giản và khả năng mở rộng

**⭐ revfactory/harness** (+323 hôm nay)
- Meta-skill thiết kế domain-specific agent teams
- Định nghĩa specialized agents và generate skills tự động

### **Agent Harness Ecosystem**

**⭐ shareAI-lab/learn-claude-code** (63K stars)
- "Bash is all you need" - Nano claude code-like agent harness
- Xây dựng từ 0 đến 1, tài liệu học tập xuất sắc

**⭐ affaan-m/ECC** (200K stars)
- Hệ thống tối ưu hiệu suất agent harness
- Skills, instincts, memory, security cho Claude Code, Codex, Cursor

**⭐ nesquena/hermes-webui** (+357 hôm nay)
- Web UI tốt nhất để sử dụng Hermes Agent
- Truy cập từ web hoặc điện thoại

### **Multi-Agent Systems**

**⭐ CherryHQ/cherry-studio** (46K stars)
- AI productivity studio với smart chat, autonomous agents
- 300+ assistants, unified access đến frontier LLMs

**⭐ Gitlawb/openclaude** (28K stars)
- "Runs anywhere. Uses anything"
- Framework linh hoạt cho multi-platform agents

---

## 🔧 AI Infrastructure

### **Development Tools**

**⭐ EveryInc/compound-engineering-plugin** (+251 hôm nay)
- Official plugin cho Claude Code, Codex, Cursor
- Tích hợp compound engineering workflows

**⭐ nicobailon/pi-subagents** (+69 hôm nay)
- Pi extension cho async subagent delegation
- Truncation, artifacts, session sharing

**⭐ iOfficeAI/AionUi** (27K stars)
- Free, local, open-source 24/7 Cowork app
- Hỗ trợ 20+ CLI agents (OpenClaw, Hermes, Claude Code, Gemini CLI...)
- Customize assistants, chạy hoàn toàn offline

### **Inference & Serving**

**⭐ ollama/ollama** (172K stars)
- Chạy Kimi-K2.5, GLM-5, MiniMax, DeepSeek, Qwen, Gemma
- Tiêu chuẩn de facto cho local LLM inference

**⭐ open-webui/open-webui** (139K stars)
- User-friendly AI interface
- Hỗ trợ Ollama, OpenAI API và nhiều backends khác

### **Data Processing**

**⭐ microsoft/markitdown** (+2798 hôm nay)
- Python tool convert files và office documents sang Markdown
- Chuẩn bị data cho LLMs

**⭐ D4Vinci/Scrapling** (+606 hôm nay)
- Adaptive web scraping framework
- Xử lý từ single request đến full-scale crawl

**⭐ firecrawl/firecrawl** (126K stars)
- API để search, scrape, interact với web at scale
- Infrastructure cho AI data collection

---

## 🧠 Models & Training

**⭐ FareedKhan-dev/train-llm-from-scratch** (+626 hôm nay)
- Phương pháp đơn giản train LLM từ đầu
- Từ download data đến generate text

**⭐ huggingface/transformers** (161K stars)
- Framework định nghĩa model cho SOTA ML
- Text, vision, audio, multimodal - inference và training

**⭐ OpenBMB/VoxCPM** (+635 hôm nay)
- VoxCPM2: Tokenizer-Free TTS
- Multilingual speech generation, creative voice design, true-to-life cloning

---

## 📦 AI Applications

### **Content Creation**

**⭐ harry0703/MoneyPrinterTurbo** (+1937 hôm nay)
- Sử dụng AI LLM tạo short videos chất lượng cao một cú click
- Tự động hóa content creation

### **Productivity & Knowledge**

**⭐ supermemoryai/supermemory** (+264 hôm nay)
- Memory engine cực nhanh, scalable
- Memory API cho kỷ nguyên AI

**⭐ Crosstalk-Solutions/project-nomad** (+374 hôm nay)
- Self-contained, offline survival computer
- Critical tools, knowledge, và AI - hoạt động mọi lúc, mọi nơi
- Giải pháp cho scenarios không có internet

### **Stock Analysis**

**⭐ ZhuLinsen/daily_stock_analysis** (39K stars)
- LLM-driven A/H/US stock analysis
- Multi-source data + real-time news + LLM decision dashboard
- Zero cost scheduled runs, hoàn toàn miễn phí

---

## 🔍 RAG & Knowledge Systems

**⭐ infiniflow/ragflow** (81K stars)
- Leading open-source RAG engine
- Kết hợp RAG với Agent capabilities

**⭐ thedotmack/claude-mem** (79K stars)
- Persistent context across sessions cho mọi agent
- Capture, compress với AI, inject context vào future sessions
- Hoạt động với Claude Code, OpenClaw, Codex, Gemini, Hermes...

**⭐ safishamsi/graphify** (57K stars)
- AI coding assistant skill
- Biến code, SQL schemas, docs, papers, images, videos thành queryable knowledge graph
- App code + database schema + infrastructure trong một graph

**⭐ mem0ai/mem0** (57K stars)
- Universal memory layer cho AI Agents
- Chuẩn hóa cách agents lưu trữ và truy xuất memory

**⭐ PaddlePaddle/PaddleOCR** (79K stars)
- Biến PDF/image documents thành structured data cho AI
- Powerful, lightweight OCR toolkit
- Hỗ trợ 100+ ngôn ngữ

**⭐ FlowiseAI/Flowise** (53K stars)
- Build AI Agents visually
- Low-code platform cho RAG workflows

**⭐ run-llama/llama_index** (49K stars)
- Leading document agent và OCR platform
- Framework cho data ingestion và retrieval

**⭐ milvus-io/milvus** (44K stars)
- High-performance, cloud-native vector database
- Scalable vector ANN search

---

## 🔌 Embedded AI & Edge Computing

### **RKLLM/RKNPU Ecosystem**

**⭐ mafischer/oRKLLM** (1 star, mới)
- OpenAI-compatible LLM inference server cho Rockchip NPU (RK3576/RK3588)
- Chạy local AI trên SBC $50

**⭐ zyp0424/Qwen-Chat-Assistant** (3 stars)
- Voice chat assistant hoàn toàn local trên RK3588
- Qwen3-2B (rknn+rkllm) + camera analysis + KWS + ASR + TTS
- Qwen3 "rất thông minh và hiểu biết mọi thứ trên thế giới"

**⭐ Alexander-68/rkllm_server_RK3576** (1 star, mới)
- Lightweight C++ HTTP server cho RKLLM models
- OpenAI-style endpoints, model switching, streaming chat

**⭐ Leon6225/InternVL3.5-4B-NPU** (1 star, mới)
- Multimodal AI với InternVL3.5-4B cho RK3588 NPU
- Vision và language understanding

**⭐ toopac01/InternVL3.5-8B-NPU** (0 stars, mới)
- InternVL3.5-8B cho RK3588
- Advanced multimodal capabilities

**⭐ kyshipit/edgeai_platform** (0 stars, mới)
- Extensible RK3588 edge inference platform
- Multi-threaded pipeline, RKNN adapters, RKLLM chat

### **Orange Pi & SBC**

**⭐ jaylfc/tinyagentos** (184 stars)
- Self-hosted auto clustering AI agent OS cho consumer hardware
- Raspberry Pi, Orange Pi, Mac Mini
- Full desktop, app store, agent deployment, distributed compute cluster

**⭐ jaylfc/taosmd** (41 stars)
- Local-first AI memory
- Chạy offline trên máy 8GB+ RAM (SBC, mini PC, laptop)
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval

**⭐ MichaIng/DietPi** (6K stars)
- Lightweight justice cho single-board computers
- Tối ưu cho Orange Pi, Raspberry Pi

**⭐ bigbugcc/OpenWrts** (755 stars)
- OpenWRT firmware cho Raspberry Pi, NanoPi, Orange Pi
- Auto compile hàng tuần

**⭐ Ponce1969/contador-oriental-ai** (3 stars)
- Hệ thống quản lý tài chính gia đình với AI local
- Python, Flutter, PostgreSQL, Ollama
- 100% offline, sẵn sàng cho Orange Pi 5 Plus

---

## 🔥 Phân tích Tín hiệu Xu hướng

### 1. **Agent Harness Revolution**
Khái niệm "Agent Harness" đang trở thành paradigm mới:
- Không chỉ là chatbot, mà là hệ thống quản lý lifecycle của agents
- Skills, instincts, memory, security được tích hợp sâu
- Multi-agent coordination và delegation
- **Tín hiệu:** Từ "harness" xuất hiện trong 5+ repos trending hôm nay

### 2. **Local-First & Privacy-First AI**
Xu hướng mạnh mẽ về AI hoàn toàn offline:
- Chạy trên consumer hardware ($50 SBC)
- Zero cloud dependency
- Complete privacy
- **Drivers:** Concerns về privacy, cost, và reliability

### 3. **Embedded AI Democratization**
RKLLM/RKNPU đang làm AI accessible cho mọi người:
- RK3588/RK3576 NPU trở thành platform phổ biến
- OpenAI-compatible APIs cho edge devices
- Multimodal models (vision + language) trên $50 hardware
- **Impact:** AI không còn là đặc quyền của cloud providers

### 4. **Memory & Context Management**
Persistent memory trở thành competitive advantage:
- Cross-session context preservation
- Knowledge graphs cho code và documents
- Hybrid retrieval systems
- **Evolution:** Từ stateless chatbots đến stateful agents

### 5. **Multimodal Integration**
Vision + Language + Audio trong một pipeline:
- Camera analysis + LLM reasoning
- Voice assistants với visual understanding
- OCR + structured data extraction
- **Trend:** Single models xử lý multiple modalities

### 6. **Developer Experience Focus**
Tools tập trung vào DX:
- One-line installation
- Visual builders (Flowise)
- Terminal-native agents (Claude Code)
- Web UIs cho CLI tools
- **Philosophy:** Make AI accessible to all developers

---

## 🎯 Tâm điểm Cộng đồng

### **Cuộc đua Agent Frameworks**
- **Claude Code** vs **Hermes Agent** vs **CowAgent**: Ba frameworks đang cạnh tranh gay gắt
- Mỗi framework có approach khác nhau về autonomy và control
- Community đang thử nghiệm và so sánh

### **RKLLM Ecosystem Explosion**
- Trong 7 ngày qua, xuất hiện 5+ repos mới về RKLLM
- Community đang port các models lớn (InternVL, Qwen) sang NPU
- Tín hiệu: Edge AI đang từ niche trở thành mainstream

### **Memory Wars**
- **claude-mem** (79K stars) vs **mem0** (57K stars) vs **taosmd** (41 stars)
- Các approaches khác nhau: cloud-based vs local-first vs hybrid
- Community đang tìm kiếm "the right way" để làm persistent memory

### **Agent Harness Standardization**
- **ECC** (200K stars) đang trở thành de facto standard
- Community đang converge về common patterns
- Interoperability giữa các agent systems đang được ưu tiên

### **Survival Computing**
- **Project NOMAD** (+374 stars) phản ánh concerns về resilience
- Offline-first, self-contained systems
- Trend: AI không chỉ cho productivity mà còn cho survival scenarios

---

## 💡 Kết luận

Ngày 01/06/2026 đánh dấu một bước ngoặt quan trọng trong AI mã nguồn mở:

1. **Agent Harness** đang định hình lại cách chúng ta build AI systems
2. **Embedded AI** không còn là future - nó là hiện tại
3. **Local-first** đang thắng **cloud-first** trong nhiều use cases
4. **Memory & Context** là competitive moat mới
5. **Developer Experience** là yếu tố quyết định adoption

**Dự đoán:** Trong 6 tháng tới, chúng ta sẽ thấy:
- Standardization của agent harness protocols
- RKLLM/RKNPU trở thành mainstream cho edge AI
- Consolidation trong memory/RAG space
- Emergence của "AI Operating Systems" cho consumer hardware

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*