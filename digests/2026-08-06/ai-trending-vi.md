# Xu hướng AI Mã nguồn mở 2026-08-06

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-08-06 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 06/08/2026

## 📊 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của **AI Agent Infrastructure** với 3 repo lớn từ Cloudflare, Tencent và các framework agent mới. Xu hướng **Agent Memory & Context Management** đang trở thành điểm nóng, khi các dự án như TencentDB Agent Memory (+1892 sao) và claude-mem (89K sao) giải quyết bài toán lưu trữ và chia sẻ kiến thức giữa các agent.

**Edge AI** tiếp tục phát triển mạnh với hệ sinh thái Rockchip NPU (RK3588/RK3576), từ driver tự viết đến các công cụ monitoring và deployment. Điểm nhấn là xu hướng **self-hosted, offline-first** - người dùng muốn sở hữu và kiểm soát AI của họ, không phụ thuộc vào cloud.

## 🗂️ Top repos theo chiều

### 🤖 AI Agents

**1. cloudflare/computer** ⭐ +891
- Cho phép agent điều khiển máy tính như một công cụ
- TypeScript, từ Cloudflare - có thể tích hợp với Workers ecosystem
- Xu hướng: Agent không chỉ gọi API mà còn tương tác trực tiếp với GUI

**2. huangruiteng/loopx** ⭐ +326
- Kernel nhẹ cho long-running agent teams
- Agent-agnostic: hỗ trợ Codex, Claude Code và nhiều coding agent khác
- Giải quyết bài toán: durable goals, quota management, verifiable handoffs
- Python - phù hợp cho orchestration layer

**3. NousResearch/hermes-agent** ⭐ 226K
- "The agent that grows with you" - agent tự học và phát triển
- Python, từ NousResearch - đội đứng sau các model Hermes
- Likely: tích hợp chặt với Hermes LLM family

**4. esengine/DeepSeek-Reasonix** ⭐ +747
- Coding agent cho terminal, tối ưu cho DeepSeek
- Engineered around prefix-cache stability - có thể chạy lâu dài
- Go - performance tốt cho CLI tools

**5. obra/superpowers** ⭐ +931
- Agentic skills framework & software development methodology
- Shell-based - tập trung vào automation workflows
- "that works" - nhấn mạnh tính thực tiễn

**6. zhayujie/CowAgent** ⭐ 46K
- Open-source super AI assistant, multi-model & multi-channel
- Python, self-evolves với memory và knowledge
- Formerly chatgpt-on-wechat - có base người dùng Trung Quốc

**7. HKUDS/nanobot** ⭐ 46K
- Ultra-lightweight personal AI agent framework
- Python với WebUI, tools, memory, MCP, multi-agent workflows
- Self-hosted focus - phù hợp cho cá nhân

### 🔧 AI Infrastructure

**1. TencentCloud/TencentDB-Agent-Memory** ⭐ +1892 🔥
- Team-level memory hub cho AI Agents
- 4 loại memory assets: Chat Memory, Skill, LLM-Wiki, Code-Graph
- TypeScript - có thể dễ tích hợp với JS/TS agent frameworks
- Giải quyết bài toán: knowledge sharing & governance giữa agents

**2. addyosmani/agent-skills** ⭐ +226
- Production-grade engineering skills cho AI coding agents
- JavaScript, từ Addy Osmani (Google Chrome team)
- Tập trung vào best practices và production-ready skills

**3. thedotmack/claude-mem** ⭐ 89K
- Persistent context across sessions cho mọi agent
- Captures, compresses với AI, injects lại vào future sessions
- JavaScript - hỗ trợ Claude Code, Codex, Gemini, etc.
- Universal solution cho context persistence

**4. affaan-m/ECC** ⭐ 238K 🔥
- Agent harness performance optimization system
- Skills, instincts, memory, security
- JavaScript - cho Claude Code, Codex, Opencode, Cursor
- Likely: meta-framework để tối ưu agent performance

**5. firecrawl/firecrawl** ⭐ 161K
- Context API để search, scrape, interact với web at scale
- TypeScript - cho agent web access
- Positioned as "The" context API

**6. browser-use/browser-use** ⭐ 107K
- Make websites accessible for AI agents
- Python - automate tasks online
- Web automation layer cho agents

**7. Panniantong/Agent-Reach** ⭐ 67K
- Give AI agents eyes to see the internet
- Python, read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- Zero API fees - scraping-based approach

**8. headroomlabs-ai/headroom** ⭐ 65K
- Compress tool outputs, logs, files, RAG chunks before LLM
- Python - 20% fewer tokens for coding agents, 60-95% for JSON
- Library, proxy, MCP server - multiple integration options

**9. CopilotKit/CopilotKit** ⭐ 36K
- Frontend Stack for Agents & Generative UI
- TypeScript - React, Angular, Mobile, Slack
- Makers of AG-UI Protocol

### 🧠 Models & Training

**1. ollama/ollama** ⭐ 177K
- Run Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, Gemma locally
- Go - cross-platform local model serving
- Standard de facto cho local LLM deployment

**2. huggingface/transformers** ⭐ 163K
- Model-definition framework cho ML models
- Python - text, vision, audio, multimodal
- Core library của HuggingFace ecosystem

**3. vllm-project/vllm** ⭐ 88K
- High-throughput và memory-efficient inference engine
- Python - cho production LLM serving
- Performance-focused

**4. lyogavin/airllm** ⭐ +833
- 70B inference với single 4GB GPU
- Jupyter Notebook - research-oriented
- Breakthrough về memory efficiency

### 📦 AI Applications

**1. langgenius/dify** ⭐ 151K 🔥
- Build Agentic workflows, RAG pipelines
- TypeScript - collaborative workspace
- Deploy: cloud, VPC, self-hosted
- Enterprise-ready platform

**2. open-webui/open-webui** ⭐ 147K
- User-friendly AI Interface
- Python - supports Ollama, OpenAI API
- Self-hosted focus

**3. Shubhamsaboo/awesome-llm-apps** ⭐ 130K
- 100+ AI Agents, Agent Skills và RAG Apps
- Python - free and open source collection
- Learning resource

**4. CherryHQ/cherry-studio** ⭐ 49K
- AI productivity studio: smart chat, autonomous agents, 300+ assistants
- TypeScript - unified access to frontier LLMs
- All-in-one productivity tool

**5. Mintplex-Labs/anything-llm** ⭐ 64K
- Stop renting your intelligence. Own it.
- JavaScript - local-first agent experience
- Strong privacy focus

**6. ZhuLinsen/daily_stock_analysis** ⭐ 60K
- LLM-driven multi-market stock analysis system
- Python - multi-source data, real-time news, dashboard
- Vertical application: finance

**7. santifer/career-ops** ⭐ 62K
- Open-source AI job search
- JavaScript - scan jobs, evaluate, tailor CV, track applications
- Runs locally in AI coding CLI
- Vertical application: career management

**8. hugohe3/ppt-master** ⭐ 43K
- AI turns documents into native PowerPoint decks
- Python - native shapes, transitions, animations, audio narration
- Vertical application: presentation automation

**9. harry0703/MoneyPrinterTurbo** ⭐ 101K
- Generate HD short videos from topic/keyword với AI workflow
- Python - video content automation
- Vertical application: content creation

**10. siyuan-note/siyuan** ⭐ 45K
- Privacy-first, self-hosted personal knowledge management
- TypeScript & Go - fully open source
- PKM (Personal Knowledge Management) space

### 🔍 RAG & Knowledge

**1. infiniflow/ragflow** ⭐ 86K
- Leading RAG engine với Agent capabilities
- Go - superior context layer for LLMs
- Enterprise-grade RAG

**2. Graphify-Labs/graphify** ⭐ 103K 🔥
- Turn codebase into queryable knowledge graph
- Python - skill for Claude Code, Cursor, Codex, Gemini
- Local deterministic AST parsing, no vector store
- Code understanding focus

**3. langchain-ai/langchain** ⭐ 143K
- The agent engineering platform
- Python - standard framework cho LLM applications
- Ecosystem leader

**4. datawhalechina/hello-agents** ⭐ 71K
- 《从零开始构建智能体》教程
- Python - Chinese learning resource
- Educational content

### 🔌 Embedded AI (NPU, Edge AI, Orange Pi, RKLLM, RKNPU)

#### Rockchip NPU Infrastructure

**1. jaylfc/taOS** ⭐ 473 🔥
- Self-hosted AI agent OS
- Python - memory, chat, agents, files stay on your hardware
- Offline-first, cloud by choice
- Auto-clustering across Orange/Raspberry Pi, Mac mini, gaming PC
- Full web desktop + app store
- **Breakthrough**: unified OS cho personal AI infrastructure

**2. Hanzo-Huang/rkllm-docker** ⭐ 7
- Dockerized RKLLM runtime
- Python - OpenAI-compatible API
- Production deployment cho Rockchip NPU models

**3. oRKLLM/ork-driver** ⭐ 1
- Clean-room userspace matmul library cho Rockchip NPU
- C - bare-metal approach
- Alternative driver implementation

**4. cuiwader51/rk-npu-llm** ⭐ 0
- Hand-written bare-metal/NPU LLM runtimes
- C - bypassing vendor stack
- Run Qwen3 with long context on RK3588/RK3399
- Extreme optimization approach

**5. ambagesthickskin162/Qwen3.5-4B-NPU** ⭐ 0
- Deploy Qwen3.5-4B on NPU hardware
- C++ - efficient local inference
- Model-specific optimization

#### Rockchip Monitoring & Tools

**6. YeWenxuan64/rktop** ⭐ 8
- Real-time monitoring cho RK3588
- Shell - CPU, NPU, GPU, RGA performance in terminal
- DevOps tool

**7. zouri/rtop** ⭐ 0
- Read-only terminal system monitor
- Go - CPU, memory, thermal, GPU, NPU, DDR, power, fan
- More comprehensive than rktop

#### Rockchip Computer Vision

**8. StepfenShawn/rockchip_yolo26** ⭐ 1
- Run YOLO26 on RK35XX series NPU
- C - RK3588/RK3566/RK3568
- Latest YOLO on NPU

**9. ma-mehralian/rknn-yolo** ⭐ 0
- Modern C++ library for YOLO on Rockchip NPUs
- C++ - using RKNN Runtime
- Clean API design

**10. xu13517942055-alt/LSD1** ⭐ 1
- Line Segment Detection on RK3576
- C - real-time wire/cable detection
- Dense + Score dual-model architecture
- Industrial application

#### Rockchip ML Frameworks

**11. tristanpenman/vlm-rknn** ⭐ 1
- Starter CMake project for vision-language models
- C++ - RKNN/RKLLM
- VLM on Rockchip

**12. tristanpenman/marian-rknn** ⭐ 1
- MarianMT on Rockchip NPU
- C++ & Python - translation models on NPU
- NLP on edge

**13. LM-cell/RKNPU** ⭐ 0
- RK3588 NPU driver và system integration
- Rust - trên StarryOS
- Alternative OS approach

#### Rockchip System Level

**14. gregordinary/patches** ⭐ 4
- Out-of-tree patches cho boot2deb Debian-device builder
- C - RK3588 mainline NPU driver patches
- HW video-transcode (kernel/ffmpeg/MPP) patches
- System-level enablement

#### Infrastructure as Code

**15. freed-dev-llc/terraform-provider-turingpi** ⭐ 7
- Terraform provider cho Turing Pi 2.5 BMC
- Go - cluster deployment
- IaC cho edge clusters

**16. freed-dev-llc/terraform-turingpi-modules** ⭐ 2
- Terraform modules for Turing Pi clusters
- HCL - works with turingpi provider
- Higher-level abstractions

#### Orange Pi Projects

**17. jaylfc/taosmd** ⭐ 72
- Local-first AI memory
- Python - runs offline on 8GB+ RAM (SBC, mini PC, laptop)
- Zero-loss archive, knowledge graph, hybrid retrieval
- Framework-agnostic, no cloud
- Core component of taOS

**18. MichaIng/DietPi** ⭐ 6,177
- Lightweight OS for SBCs
- Shell - supports Orange Pi
- Optimized base OS

**19. geerlingguy/sbc-reviews** ⭐ 989
- SBC review data
- Python - Raspberry Pi, Radxa, Orange Pi
- Community resource

**20. mhamidjamil/orangepi** ⭐ 4
- Automation hub for Orange Pi 5 Plus
- Python - serial bridge to ESP32, Flask web console, InfluxDB, ntfy alerts
- Home automation/IoT hub

**21. Ponce1969/contador-oriental-ai** ⭐ 3
- Family financial management với local AI
- Python - enterprise architecture: Flask, PostgreSQL, Ollama
- 100% offline, ready for Orange Pi 5 Plus
- Vertical application on edge

**22. art-den/astra_lite** ⭐ 53
- Deepsky astrophotography & live stacking
- Rust - cho Raspberry Pi hoặc Orange Pi
- Niche vertical: astronomy

#### Embedded AI Tools

**23. firecrawl/pdf-inspector** ⭐ +1582
- Fast Rust library for PDF inspection, classification, text extraction
- Rust - detects scanned vs text-based PDFs
- Smart routing decisions
- Could run on edge devices

**24. uber/ADR** ⭐ +354
- Secures enterprise AI agents
- Python - observability, security benchmarking, threat detection
- Deployed at Uber
- Enterprise security for agents

**25. roboflow/supervision** ⭐ +146
- Reusable computer vision tools
- Python - could run on NPU-enabled SBCs
- CV infrastructure

## 🔍 Phân tích tín hiệu xu hướng

### 1. **Agent Memory Wars** 🧠
- **TencentDB Agent Memory** (team-level), **claude-mem** (universal), **taosmd** (local-first) đang cạnh tranh
- Xu hướng: từ stateless agents → agents với persistent memory & knowledge sharing
- 4 loại memory assets emerging: Chat, Skill, Wiki, Code-Graph
- Enterprise cần team-level governance, individuals cần privacy & ownership

### 2. **Offline-First AI Movement** 🔒
- **taOS**, **taosmd**, **anything-llm**, **siyuan**: "stop renting your intelligence"
- Privacy-first, self-hosted, runs on consumer hardware
- Clustering nhỏ: Orange Pi + Mac mini + gaming PC → personal cloud
- Anti-cloud sentiment tăng mạnh

### 3. **Rockchip NPU Ecosystem Maturity** 🚀
- Từ vendor stack (RKLLM) → bare-metal implementations (rk-npu-llm, ork-driver)
- Complete toolchain: docker runtime, monitoring (rktop/rtop), IaC (terraform)
- Model support: Qwen3.5, YOLO26, VLM, MarianMT
- RK3588/RK3576 becoming de facto standard cho edge AI
- Price/performance sweet spot: ~$100-200 hardware với NPU 6 TOPS

### 4. **Agent Infrastructure Layer** 🏗️
- **ECC** (238K sao) - meta-framework optimization
- **loopx** - long-running orchestration
- **headroom** - token compression
- Solving: persistence, efficiency, interoperability
- Agent đang chuyển từ demos → production systems

### 5. **Multi-Agent & Team Coordination** 🤝
- **loopx**: verifiable handoffs giữa agents
- **TencentDB Agent Memory**: shared knowledge governance
- **CowAgent**: multi-agent workflows
- Trend: từ single autonomous agent → coordinated agent teams

### 6. **Context Compression Tech** 📉
- **headroom**: 20-60% token reduction
- **caveman skill**: 65% reduction by simplified language
- Cost optimization critical khi agents chạy 24/7
- Prefix-cache stability (DeepSeek-Reasonix) quan trọng cho long-running

### 7. **Vertical Agent Applications** 📱
- **career-ops**: job search
- **daily_stock_analysis**: finance
- **ppt-master**: presentations  
- **contador-oriental-ai**: family finance on edge
- Pattern: general-purpose agents → domain-specific solutions

### 8. **Web Access Layer Consolidation** 🌐
- **firecrawl** (161K) positioned as "The" context API
- **browser-use** (107K) cho web automation
- **Agent-Reach** (67K) cho social media scraping
- Agents cần structured web access, không chỉ search APIs

### 9. **Infrastructure as Code cho Edge** 🔧
- Terraform provider cho Turing Pi
- boot2deb với patches cho NPU
- Docker runtime cho RKLLM
- Edge deployment đang industrialize

### 10. **AI-Native Development Tools** 💻
- Cloudflare cho agents điều khiển computers
- Skills frameworks (agent-skills, superpowers)
- Agent-agnostic orchestration (loopx)
- Development workflow đang được redesign cho AI era

## 🎯 Tâm điểm cộng đồng

### 🔥 Mega Trends (100K+ sao)

1. **affaan-m/ECC** (238K) - Agent performance optimization đang become critical infrastructure
2. **NousResearch/hermes-agent** (226K) - Self-evolving agent với backing của strong model team
3. **ollama** (177K) - Standard cho local model serving, bây giờ support Kimi, GLM-5.2, MiniMax
4. **langgenius/dify** (151K) - Enterprise agent platform winner
5. **firecrawl** (161K) - Web context API becoming essential infrastructure

### 🌟 Hot New Projects (500+ sao hôm nay)

1. **TencentDB-Agent-Memory** (+1892) - Tencent đang push team-level agent memory hard
2. **firecrawl/pdf-inspector** (+1582) - Rust PDF tool cho intelligent routing
3. **cloudflare/computer** (+891) - Cloudflare entering agent space với computer control
4. **obra/superpowers** (+931) - Skills framework "that works"
5. **lyogavin/airllm** (+833) - 70B on 4GB breakthrough
6. **esengine/DeepSeek-Reasonix** (+747) - DeepSeek-optimized coding agent

### 💡 Emerging Ecosystems

**Rockchip Edge AI** đang build complete stack:
- OS layer: taOS, DietPi
- Runtime: rkllm-docker
- Drivers: ork-driver, vendor RKLLM
- Monitoring: rktop, rtop
- Models: Qwen3.5, YOLO26, VLM
- Applications: LSD1, contador-oriental-ai
- IaC: terraform-provider-turingpi

**Agent Memory Solutions** 3-way:
- Enterprise: TencentDB-Agent-Memory (team governance)
- Universal: claude-mem (cross-framework)
- Self-hosted: taosmd (privacy-first, offline)

**Chinese AI Community** very active:
- CowAgent (46K) - formerly chatgpt-on-wechat
- ZhuLinsen/daily_stock_analysis (60K)
- MoneyPrinterTurbo (101K)
- datawhalechina/hello-agents (71K)
- Ponce1969/contador-oriental-ai
- Strong focus on vertical applications + local deployment

### 🎓 Learning & Reference

- **Shubhamsaboo/awesome-llm-apps** (130K) - 100+ agent examples
- **geerlingguy/sbc-reviews** (989) - Hardware comparison data
- **datawhalechina/hello-agents** (71K) - Chinese agent tutorial
- **prompts.chat** (166K) - Community prompt library

### 🚨 Watch List

1. **taOS ecosystem** (taOS + taosmd) - nếu momentum tiếp tục, có thể become standard cho self-hosted AI
2. **Rockchip NPU adoption** - nếu IaC tooling mature (terraform), có thể see enterprise edge deployments
3. **Agent memory standards** - 3 major approaches competing, market chưa consolidate
4. **Context compression** - headroom + caveman showing 20-95% gains, critical cho cost
5. **Cloudflare's agent strategy** - computer project là first mover, likely more coming

---

**Kết luận**: Hôm nay cho thấy AI đang mature từ experimentation → production infrastructure. Agent memory, edge deployment, và cost optimization là 3 pillar chính. Self-hosted/offline-first movement gaining serious momentum, đặc biệt ở China. Rockchip NPU ecosystem approaching production-ready với complete toolchain.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*