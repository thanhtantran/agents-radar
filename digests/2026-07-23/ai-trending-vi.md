# Xu hướng AI Mã nguồn mở 2026-07-23

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-23 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 23/07/2026

## 🎯 Tóm tắt hôm nay

Ngày 23/07/2026 đánh dấu sự bùng nổ của **Agent Infrastructure** và **Edge AI**. Cộng đồng đang chứng kiến làn sóng mạnh mẽ về các công cụ tối ưu hoá agent harness, với điểm nhấn là các giải pháp nén context, persistent memory, và việc đưa AI xuống thiết bị edge. Đặc biệt, hệ sinh thái Rockchip NPU đang trải qua một bước nhảy vọt với nhiều dự án open-source driver và kernel patches.

**Con số nổi bật**: 7 repo vượt 1000+ stars trong ngày, với **worldmonitor** (+4139) dẫn đầu, theo sau là **OmniRoute** (+1651) và **i-have-adhd** (+1699).

---

## 📊 Top Repos Theo Chiều

### 🤖 **AI Agents**

**⭐ Top trending:**
- **worldmonitor** (+4139) - Dashboard tình báo toàn cầu real-time với AI-powered news aggregation và geopolitical monitoring
- **i-have-adhd** (+1699) - Skill cho coding agent giúp output ADHD-friendly, ngăn agent "chôn vùi" câu trả lời
- **pi-web** (+314) - Web UI cho pi coding agent
- **code-review-graph** (+882) - Local-first code intelligence graph cho MCP và CLI, giảm context khi review code

**🔥 Search highlights (7 ngày):**
- **ECC** (232K ⭐) - Agent harness performance optimization với skills, instincts, memory cho Claude Code, Codex, Cursor
- **hermes-agent** (219K ⭐) - "The agent that grows with you" - agent tự phát triển
- **AutoGPT** (186K ⭐) - Vision of accessible AI for everyone
- **nanobot** (46K ⭐) - Lightweight AI agent cho tools, chats, workflows
- **CowAgent** (46K ⭐) - Open-source super AI assistant, multi-model, multi-channel

**💡 Insight**: Agents đang dịch chuyển từ "one-shot tools" sang "persistent companions" với memory, learning capability, và ADHD-friendly UX.

---

### 🔧 **AI Infrastructure**

**⭐ Top trending:**
- **OmniRoute** (+1651) - Free MIT AI gateway: 1 endpoint, 268+ providers (50+ free), 500+ models. Quota-aware auto-fallback, RTK+Caveman compression tiết kiệm 15-95% tokens
- **RuView** (+741) - Biến WiFi signals thành spatial intelligence, vital sign monitoring, presence detection - không cần camera
- **voicebox** (+557) - Open-source AI voice studio: clone, dictate, create
- **croc** (+739) - Gửi file an toàn giữa các máy tính

**🔥 Search highlights:**
- **claude-mem** (88K ⭐) - Persistent context across sessions cho mọi agent
- **firecrawl** (155K ⭐) - API để search, scrape, interact với web at scale
- **ollama** (177K ⭐) - Local model runtime cho Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen
- **headroom** (61K ⭐) - Nén tool outputs, logs, files, RAG chunks trước khi đưa vào LLM (20-95% token reduction)

**💡 Insight**: Infrastructure focus = **cost reduction** (token compression, free gateways) + **persistence** (cross-session memory).

---

### 🧠 **Models & Training**

**⭐ Top trending:**
- **Kronos** (+137) - Foundation Model cho ngôn ngữ thị trường tài chính

**🔥 Search highlights:**
- **transformers** (163K ⭐) - HuggingFace model-definition framework
- **PaddleOCR** (86K ⭐) - OCR toolkit hỗ trợ 100+ ngôn ngữ, biến PDF/image thành structured data cho AI

**💡 Insight**: Vertical-specific foundation models (finance, legal, medical) đang là trend.

---

### 📦 **AI Applications**

**⭐ Top trending:**
- **openship** (+1302) - Self-hosted deployment platform
- **likec4** (+80) - Visualize, collaborate, evolve software architecture với diagrams từ code
- **Apollo-11** (+768) - Source code AGC gốc của Apollo 11 (lịch sử!)
- **awesome-claude-skills** (+163) - Curated list of Claude Skills
- **ai-engineering-from-scratch** (+652) - Learn, build, ship AI engineering

**🔥 Search highlights:**
- **awesome-llm-apps** (126K ⭐) - 100+ AI Agents, Agent Skills, RAG Apps
- **career-ops** (61K ⭐) - AI job search: scan portals, evaluate với rubric A-F, tailor CV
- **daily_stock_analysis** (58K ⭐) - LLM-driven multi-market stock analysis với real-time news
- **ppt-master** (41K ⭐) - AI biến documents thành native PowerPoint với animations, charts, audio narration

**💡 Insight**: AI applications đang vertical hoá (job search, stock analysis, PPT generation) với focus trên automation end-to-end.

---

### 🔍 **RAG & Knowledge**

**🔥 Search highlights:**
- **dify** (150K ⭐) - Build Agentic workflows, RAG pipelines trên collaborative workspace
- **ragflow** (86K ⭐) - Leading RAG engine kết hợp Agent capabilities
- **hello-agents** (68K ⭐) - "从零开始构建智能体" - tutorial từ zero đến hero
- **anything-llm** (64K ⭐) - "Stop renting your intelligence. Own it" - local-first agent experience
- **mem0** (61K ⭐) - Universal memory layer cho AI Agents
- **Flowise** (55K ⭐) - Build AI Agents visually
- **llama_index** (51K ⭐) - Leading document agent và OCR platform

**💡 Insight**: RAG đang merge với Agent capabilities. Memory layer trở thành first-class citizen.

---

### 🔌 **Embedded AI** (NPU, Edge, Orange Pi, RKLLM, RKNPU)

**⭐ RKLLM/RKNPU trending:**
- **Qwen3-VL-2B-NPU** (36 ⭐) - Qwen3-VL-2B trên RK3588 NPU
- **Qwen3-VL-4B-NPU** (10 ⭐) - Qwen3-VL-4B trên RK3588 NPU
- **InternVL3.5-4B-NPU** (5 ⭐) - Multimodal AI trên RK3588
- **RKNN-LLM** (4 ⭐) - Local multimodal system dựa trên Qwen3-VL-2B, RKNN, RKLLM cho RK3588

**⭐ Orange Pi trending:**
- **DietPi** (6.2K ⭐) - Lightweight OS cho SBC
- **rpidmx512** (446 ⭐) - DMX512/RDM/MIDI/OSC/Art-Net cho Orange Pi
- **taosmd** (70 ⭐) - Local-first AI memory chạy offline trên SBC, mini PC (8GB+ RAM)
- **openWRT-OrangePiZero3** (61 ⭐) - OpenWRT cho Orange Pi Zero3
- **astra_lite** (53 ⭐) - Software cho deepsky astrophotography trên Raspberry/Orange Pi
- **orangepi-4a-mainline** (5 ⭐) - Mainline Linux 6.18 support cho Orange Pi 4A (Allwinner T527)

**🔥 Search highlights:**
- **taOS** (447 ⭐) - Self-hosted AI agent OS: memory, chat, agents chạy trên hardware bạn sở hữu (Orange/Raspberry Pi, Mac mini, gaming PC)
- **ggml-rocket** (9 ⭐) - Drop-in ggml backend cho Rockchip NPUs: offload llama.cpp/whisper.cpp prefill vào RK3588 NPU
- **rockchip-npu-notes** (6 ⭐) - Hardware reference và research notes cho RK3588 NPU
- **patches** (4 ⭐) - RK3588 mainline rocket NPU driver patches
- **rkopnu** (0 ⭐, mới) - Clean-room open driver cho Rockchip NPU trên mainline Linux kernel

**💡 Insight**: **Đây là breakthrough moment cho Rockchip NPU**. Cộng đồng đang:
1. Port multimodal models (Qwen3-VL, InternVL) xuống RK3588
2. Build clean-room open-source drivers (rkopnu, ggml-rocket) thay thế vendor blobs
3. Integrate NPU vào mainline Linux kernel
4. Tạo local-first AI OS (taOS) chạy trên consumer hardware

---

## 🔮 Phân tích Tín hiệu Xu hướng

### 1️⃣ **Agent Harness Optimization Explosion**
- **Token compression** (OmniRoute: 15-95%, headroom: 20-95%) đang là arms race
- **Persistent memory** (claude-mem, mem0, taosmd) trở thành standard requirement
- **ADHD-friendly UX** (i-have-adhd) - addressing cognitive load của developers khi làm việc với agents

### 2️⃣ **Embedded AI Goes Mainstream**
- RK3588 NPU đang là "Raspberry Pi moment" cho AI inference
- Clean-room driver development (rkopnu, ggml-rocket) phá vỡ vendor lock-in
- Multimodal models (Qwen3-VL, InternVL) chạy trên $100-200 SBCs
- **Self-hosted AI OS** (taOS) - trend "own your intelligence"

### 3️⃣ **Vertical AI Applications**
- AI không còn là general-purpose tools
- Vertical solutions: job search (career-ops), stock analysis (daily_stock_analysis), PPT generation (ppt-master)
- End-to-end automation thay vì partial assistance

### 4️⃣ **WiFi Sensing as AI Input**
- RuView (+741) - WiFi signals → spatial intelligence, vital signs
- Camera-free monitoring - privacy-first approach

### 5️⃣ **Cost Reduction as Core Feature**
- Free AI gateways (OmniRoute: 268+ providers, 50+ free)
- Token compression technologies
- Local-first deployments (anything-llm, taOS)

### 6️⃣ **Multi-Agent Orchestration**
- Agent-to-agent communication (A2A) trong OmniRoute
- MCP (Model Context Protocol) adoption
- Knowledge graphs cho code intelligence (code-review-graph)

---

## 🎪 Tâm điểm Cộng đồng

### 🏆 **Biggest Movers**
1. **worldmonitor** (+4139) - Real-time global intelligence đang hot vì geopolitical tensions
2. **OmniRoute** (+1651) - Free AI gateway với 268+ providers đang viral trong dev community
3. **i-have-adhd** (+1699) - Đánh trúng pain point của devs làm việc với verbose AI outputs

### 🌟 **Dark Horses**
- **RuView** (+741) - WiFi sensing là tech đột phá, ít người biết nhưng potential huge
- **code-review-graph** (+882) - Local-first approach cho code intelligence đang được ưa chuộng
- **taOS** (447 ⭐, 7 days) - Self-hosted AI OS trên consumer hardware - disrupting cloud AI model

### 🔥 **Ecosystem Wars**
- **Rockchip NPU** vs **Qualcomm NPU** vs **Apple Neural Engine**: RK3588 đang lead trong open-source community
- **Claude Code** vs **Cursor** vs **GitHub Copilot**: Agent harness optimization đang là battleground

### 🚀 **Emerging Patterns**
- **Local-first AI**: Privacy + cost + control đang thắng cloud
- **Compression as feature**: Token = money, compression = competitive advantage
- **Clean-room implementations**: Vendor blobs → open drivers (rkopnu example)
- **Agent memory**: From stateless → stateful → learning agents

---

## 💭 Kết luận

Ngày 23/07/2026 là ngày của **infrastructure builders**, không phải model builders. Cộng đồng đang focus vào:
- Làm AI rẻ hơn (compression, free gateways)
- Làm AI smarter hơn (persistent memory, learning)
- Làm AI accessible hơn (edge deployment, open drivers)
- Làm AI usable hơn (ADHD-friendly UX, vertical apps)

**Next big thing**: Theo dõi Rockchip NPU ecosystem và local-first AI OS movement. 🚀

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*