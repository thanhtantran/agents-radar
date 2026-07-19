# Xu hướng AI Mã nguồn mở 2026-07-19

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-19 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn mở - 19/07/2026

## 🎯 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của **AI agents tự chủ** và **local-first infrastructure**. Các dự án trending đều hướng tới việc giúp AI "tự lái" thay vì chỉ phản hồi lệnh, đồng thời tăng cường khả năng chạy offline trên phần cứng consumer. Xu hướng rõ nét là **democratization** - đưa AI về tay người dùng thông qua hardware giá rẻ (Orange Pi, RK3588) và tooling mở.

Điểm nhấn: **MCP (Model Context Protocol)** xuất hiện ở nhiều repo, cho thấy cộng đồng đang chuẩn hóa cách agents tương tác với tools và memory.

---

## 🔥 Top Repos Theo Chiều

### 🤖 **AI Agents - Tự chủ & Đa năng**

**Trending hôm nay:**
- **PostHog/posthog** (+338⭐) - Platform cho "self-driving products" với AI observability, session replay, và MCP support. Định vị là context layer cho agents.
- **tirth8205/code-review-graph** (+355⭐) - Code intelligence graph local-first, giảm context cho AI coding tools khi review code.
- **KnockOutEZ/wigolo** (+203⭐) - Web engine cho AI coding agents: search, fetch, crawl qua MCP, zero cloud, $0/query.

**Top search ai-agent (7 ngày):**
- **NousResearch/hermes-agent** (216K⭐) - "Agent that grows with you" - framework tự học và tiến hóa
- **santifer/career-ops** (60K⭐) - AI job hunter chạy local: scan jobs, score A-F, tailor CV, track applications
- **CherryHQ/cherry-studio** (48K⭐) - AI productivity studio với smart chat, autonomous agents, 300+ assistants
- **zhayujie/CowAgent** (46K⭐) - Super AI assistant tự plan, chạy tools, tự evolve với memory/knowledge
- **HKUDS/nanobot** (45K⭐) - Lightweight agent cho tools, chats, workflows

**Insight:** Agents không còn là "chatbot nâng cao" mà trở thành **hệ thống tự vận hành** - plan → execute → evolve. Focus vào memory, tool use, và khả năng tự cải thiện.

---

### 🔧 **AI Infrastructure - Tools & Orchestration**

**Trending hôm nay:**
- **rohitg00/ai-engineering-from-scratch** (+191⭐) - Complete learning path cho AI engineering
- **MoonshotAI/kimi-cli** (+65⭐) - Kimi Code CLI - next-gen CLI agent

**Top search llm (7 ngày):**
- **affaan-m/ECC** (230K⭐) - Agent harness optimization: skills, instincts, memory, security cho Claude Code, Codex, Cursor...
- **ollama/ollama** (176K⭐) - Get up running với Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, Gemma
- **firecrawl/firecrawl** (152K⭐) - API to search, scrape, interact with web at scale
- **langgenius/dify** (149K⭐) - Production-ready platform cho agentic workflow
- **open-webui/open-webui** (145K⭐) - User-friendly AI interface cho Ollama, OpenAI API...
- **langchain-ai/langchain** (142K⭐) - Agent engineering platform
- **browser-use/browser-use** (105K⭐) - Make websites accessible for AI agents

**Insight:** Infrastructure layer đang mature với focus vào **agent orchestration**, không chỉ model serving. CLI tools trở thành first-class citizen.

---

### 🧠 **Models & Training - Từ Cloud xuống Edge**

**Trending hôm nay:**
- **lyogavin/airllm** (+161⭐) - Chạy 70B inference trên GPU 4GB duy nhất

**Top search llm:**
- **huggingface/transformers** (162K⭐) - State-of-the-art ML models cho text, vision, audio, multimodal

**Insight:** Optimization cho resource-constrained environments - chạy large models trên hardware consumer.

---

### 📦 **AI Applications - Vertical Solutions**

**Trending hôm nay:**
- **apache/ossie** (+47⭐) - Standardize semantic metadata exchange across analytics, AI, BI platforms
- **ibelick/ui-skills** (+123⭐) - Skills for Design Engineers
- **elder-plinius/G0DM0D3** (+69⭐) - "LIBERATED AI CHAT"

**Top search ai-agent:**
- **ZhuLinsen/daily_stock_analysis** (57K⭐) - LLM-driven multi-market stock analysis: multi-source data, real-time news, auto notifications
- **Panniantong/Agent-Reach** (57K⭐) - Cho agent "eyes to see internet" - Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, zero API fees
- **hugohe3/ppt-master** (39K⭐) - AI turns documents/topics into native PowerPoint với shapes, transitions, animations, charts, audio narration
- **siyuan-note/siyuan** (45K⭐) - Privacy-first, self-hosted personal knowledge management

**Insight:** Vertical apps đang dịch chuyển từ "AI feature" sang **AI-native workflows** - từ job search đến stock analysis, content creation.

---

### 🔍 **RAG & Knowledge - Memory Layer**

**Top search rag (7 ngày):**
- **Shubhamsaboo/awesome-llm-apps** (124K⭐) - 100+ AI Agent & RAG apps có thể chạy ngay
- **Graphify-Labs/graphify** (90K⭐) - Turn code, schemas, docs, papers, images, videos thành queryable knowledge graph
- **thedotmack/claude-mem** (87K⭐) - Persistent context across sessions cho mọi agent - capture, compress, inject relevant context
- **PaddlePaddle/PaddleOCR** (85K⭐) - OCR toolkit: PDF/image → structured data cho AI, 100+ languages
- **infiniflow/ragflow** (85K⭐) - Leading RAG engine fused với Agent capabilities
- **datawhalechina/hello-agents** (67K⭐) - 《从零开始构建智能体》- tutorial từ zero
- **Mintplex-Labs/anything-llm** (63K⭐) - "Stop renting intelligence. Own it" - local-first agent experience
- **mem0ai/mem0** (61K⭐) - Universal memory layer for AI Agents
- **headroomlabs-ai/headroom** (59K⭐) - Compress outputs, logs, files, RAG chunks trước khi tới LLM: 20% fewer tokens cho coding agents, 60-95% cho JSON
- **FlowiseAI/Flowise** (54K⭐) - Build AI Agents, Visually

**Insight:** RAG evolve thành **agent memory systems** - không chỉ retrieve documents mà quản lý persistent context, compression, và knowledge graphs. Focus vào **local-first** và giảm token cost.

---

### 🔌 **Embedded AI - Edge Revolution**

**Trending hôm nay:**
- **Robbyant/lingbot-map** (+831⭐ - top trending!) - Feed-forward 3D foundation model cho reconstructing scenes từ streaming data

**Top search rknpu/rkllm/orangepi:**

**Hardware & OS:**
- **jaylfc/taOS** (440⭐) - **Self-hosted AI agent OS** - memory, chat, agents, files on hardware you own, offline by default. Offline AI memory, multi-framework group chat, web desktop + app store, auto-clustering across Pi/Mac mini/gaming PC
- **mack42/OrangePi5Pro** (14⭐) - Ubuntu 26.04 cho Orange Pi 5 Pro/RK3588S với Mali-G610 GPU + Vulkan, RK3588 NPU 3 cores, HW video decode
- **MichaIng/DietPi** (6,155⭐) - Lightweight justice cho SBC
- **OOHehir/luckfox-pico-yocto** (4⭐) - Yocto BSP cho LuckFox Pico Ultra W (RV1106G3) với WiFi 6, NPU, touchscreen, BT 5.2

**NPU Drivers & Runtimes:**
- **gregordinary/ggml-rocket** (8⭐) - Drop-in ggml backend cho Rockchip NPUs - offload llama.cpp/whisper.cpp prefill to RK3588 NPU
- **gregordinary/rocket-userspace** (8⭐) - Userspace driver, matmul, on-NPU op library cho RK3588
- **gregordinary/rockchip-npu-notes** (6⭐) - Hardware reference cho RK3588 NPU
- **Hanzo-Huang/rkllm-docker** (4⭐) - Dockerized RKLLM runtime với OpenAI-compatible API
- **oRKLLM/ork-driver** (1⭐) - Clean-room userspace matmul library cho Rockchip NPU

**Models on NPU:**
- **Leon6225/InternVL3.5-4B-NPU** (5⭐) - Multimodal AI InternVL3.5-4B cho RK3588 NPU
- **Qengineering/Qwen3.5-2B-NPU** (1⭐) - Qwen3.5-VL-2B trên RK3588 NPU
- **Qengineering/Qwen3.5-0.8B-NPU** (0⭐) - Qwen3.5-VL-0.8B trên RK3588 NPU
- **shaddockpeel2/RKNN-LLM** (0⭐) - Local multimodal system trên RK3588: Qwen3-VL-2B, image QA, GPIO/485 control, continuous chat, web access

**Memory Systems:**
- **jaylfc/taosmd** (69⭐) - Local-first AI memory chạy offline trên 8GB+ RAM (SBC, mini PC, laptop) - zero-loss archive, knowledge graph, hybrid retrieval

**Insight:** **Edge AI đang bùng nổ** với RK3588 NPU ecosystem. Community đang build:
1. **Full-stack OS** (taOS) cho agent workloads trên consumer hardware
2. **Native NPU support** trong ggml/llama.cpp
3. **Multimodal VLMs** (InternVL, Qwen) running on-device
4. **Local-first memory** systems không phụ thuộc cloud

Đây là **democratization thực sự** - AI chạy trên hardware $50-200, không cần cloud, không API fees.

---

## 🔮 Phân tích Tín hiệu Xu hướng

### 1. **MCP (Model Context Protocol) Everywhere**
- Xuất hiện ở PostHog, wigolo, taOS
- Đang trở thành **standard** cho agent-tool communication
- Thay thế các ad-hoc API integrations

### 2. **Local-First > Cloud-First**
- taOS, taosmd, wigolo, anything-llm đều nhấn "offline by default"
- Privacy, cost, và ownership là drivers
- Cloud as **optional enhancement**, không phải requirement

### 3. **Agent Memory = Competitive Moat**
- claude-mem, mem0, taosmd - persistent context là killer feature
- Không còn stateless conversations
- Memory compression (headroom) để giảm cost

### 4. **Knowledge Graphs > Vector Stores**
- Graphify, code-review-graph
- Structured knowledge thắng unstructured embeddings
- Queryable relationships quan trọng hơn similarity search

### 5. **Edge AI = RK3588 NPU**
- RK3588 trở thành "M1 chip of edge AI"
- Community đang xây full stack: drivers, runtimes, models, OS
- NPU inference competitive với cloud (558 inf/s on-device)

### 6. **AI Agents = Operating Systems**
- taOS concept: agents không phải apps, mà là **platform**
- Auto-clustering, app stores, desktop environments cho AI
- Shift từ "AI tool" sang "AI environment"

### 7. **Compression > Scaling**
- headroom: compress trước khi tới LLM (60-95% token reduction)
- airllm: 70B trên 4GB GPU
- Focus vào efficiency, không phải throwing compute at problems

---

## 🌟 Tâm điểm Cộng đồng

### **Top 3 Projects to Watch:**

1. **jaylfc/taOS** (440⭐) 
   - **Why:** Định nghĩa lại "AI infrastructure" - không phải cloud platform mà là **self-hosted agent OS**. Vision về AI chạy trên consumer hardware clusters (Pi + Mac mini + gaming PC) là disruptive.

2. **Robbyant/lingbot-map** (+831⭐ trending #1)
   - **Why:** 3D scene reconstruction từ streaming data - use case cho robotics, AR/VR, spatial computing. Feed-forward architecture cho real-time performance.

3. **tirth8205/code-review-graph** (+355⭐)
   - **Why:** Giải quyết "context window hell" cho coding agents. Persistent code intelligence graph = agents đọc đúng thứ cần, không phải entire codebase.

### **Dark Horses:**

- **gregordinary/ggml-rocket**: Drop-in NPU backend cho llama.cpp - nếu stable, sẽ unlock toàn bộ llama.cpp ecosystem trên RK3588
- **Graphify-Labs/graphify**: 90K stars cho knowledge graph tool - signal mạnh về community cần structured knowledge
- **santifer/career-ops**: 60K stars cho AI job search - vertical app được embrace nhanh, validation cho AI-native workflows

---

## 💡 Key Takeaways

1. **AI đang về nhà** - từ cloud về edge, từ proprietary về open-source, từ rented sang owned
2. **Agents > Models** - cộng đồng quan tâm systems có thể act, không chỉ respond
3. **Memory là moat** - persistent context, knowledge graphs, compression là differentiators
4. **RK3588 = edge AI standard** - ecosystem đang mature nhanh với drivers, runtimes, models
5. **MCP đang thắng** - standardization của agent-tool protocol

**Bottom line:** Năm 2026 là năm AI **democratization** - mọi developer có thể self-host agents trên hardware giá rẻ, với performance competitive với cloud.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*