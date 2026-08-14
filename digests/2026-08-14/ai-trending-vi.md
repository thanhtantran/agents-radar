# Xu hướng AI Mã nguồn mở 2026-08-14

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-08-14 02:00 UTC

---

# Báo cáo Phân Tích Xu Hướng AI Mã Nguồn Mở - 14/08/2026

## 📊 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của **AI agent ecosystems** với các giải pháp tích hợp toàn diện. Xu hướng nổi bật là **agent skills & memory systems** - các công cụ giúp AI agents trở nên thực dụng hơn với khả năng ghi nhớ và thực thi tác vụ phức tạp. Đồng thời, **embedded AI trên NPU** (Rockchip RK3588) đang chuyển từ thử nghiệm sang production với các công cụ deployment hoàn chỉnh.

**Điểm nổi bật**: Anthropics công khai repo "skills" - động thái chiến lược hướng tới agent marketplace, trong khi cộng đồng tập trung xây dựng unified workspaces cho teams.

---

## 🔥 Top Repos Theo Chiều

### 🤖 **AI Agents**

**1. NousResearch/hermes-agent** ⭐ 230,162
- Agent framework "phát triển cùng bạn" - adaptive learning
- Dẫn đầu với cơ số star khổng lồ

**2. anthropics/skills** ⭐ 312 (+312 hôm nay)
- Repo chính thức của Anthropic cho Agent Skills
- Tín hiệu quan trọng: Big Tech đang chuẩn bị standardize agent capabilities

**3. msitarzewski/agency-agents** ⭐ 778 (+778 hôm nay)
- "AI agency hoàn chỉnh trong tầm tay"
- Specialized agents với personality riêng: frontend wizards, Reddit ninjas, reality checkers
- Shell-based, dễ deploy

**4. shareAI-lab/learn-claude-code** ⭐ 74,150
- "Bash is all you need" - build agent harness từ 0
- Educational repo với adoption cao

**5. Panniantong/Agent-Reach** ⭐ 71,464
- "Cho AI agent đôi mắt nhìn cả internet"
- Scrapes Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- Zero API fees - quan trọng cho cost-sensitive deployments

**6. santifer/career-ops** ⭐ 63,752
- AI job search automation: scan → evaluate (A-F rubric) → tailor CV → track
- Practical vertical application của agents

**7. HKUDS/nanobot** ⭐ 46,955
- Ultra-lightweight self-hosted agent framework
- WebUI + tools + memory + MCP + multi-agent workflows
- Giải pháp cho những ai muốn self-host nhỏ gọn

**8. zhayujie/CowAgent** ⭐ 46,503
- Super AI assistant với self-evolution
- Multi-model, multi-channel, extensible
- Formerly chatgpt-on-wechat - strong community base

---

### 🔧 **AI Infrastructure**

**1. affaan-m/ECC** ⭐ 239,990
- Agent harness performance optimization system
- Skills, instincts, memory, security cho Claude Code/Codex/Cursor
- Hệ sinh thái tooling cho agent developers

**2. holaboss-ai/holaOS** ⭐ 241 (+241 hôm nay)
- All-in-One AI agent workspace
- 100+ integrations + MCP support
- Shared memory across agents - key differentiator

**3. macro-inc/macro** ⭐ 1,239 (+1,239 hôm nay)
- Unified workspace: email, chat, docs, tasks, agents, calls, CRM
- @-linked với shared AI memory
- Rust-based - performance-first

**4. NVIDIA-NeMo/Switchyard** ⭐ 408 (+408 hôm nay)
- Traffic routing cho models/providers
- Preserves OpenAI & Anthropic API compatibility
- Cost/performance optimization platform

**5. thedotmack/claude-mem** ⭐ 90,658
- Persistent context across sessions
- Captures → compresses → injects back
- Universal: Claude Code, Codex, Gemini, Hermes, Copilot...

**6. headroomlabs-ai/headroom** ⭐ 66,239
- Token compression: 20% for code, 60-95% for JSON
- Library + proxy + MCP server
- Critical cho cost optimization

**7. firecrawl/firecrawl** ⭐ 167,000
- Context API để search, scrape, interact với web at scale
- Infrastructure cho agent web access

**8. browser-use/browser-use** ⭐ 109,123
- Make websites accessible cho AI agents
- Automate tasks online

---

### 🧠 **Models & Training**

**1. cactus-compute/needle** ⭐ 769 (+769 hôm nay)
- 14MB foundation model cho tiny devices
- Phones, wearables, smart home, robots
- Breakthrough trong model miniaturization

**2. unslothai/unsloth** ⭐ 328 (+328 hôm nay)
- Local UI để run & train LLMs + diffusion models
- Qwen3.8, Kimi K3, MiniMax-H3, Gemma 4, DeepSeek-V4, FLUX
- All-in-one training platform

**3. Lightricks/LTX-2** ⭐ 205 (+205 hôm nay)
- Audio-video generative model
- Inference + LoRA trainer package
- Multimodal generation

**4. ollama/ollama** ⭐ 178,487
- Run Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, Gemma
- Standard tool cho local model deployment

**5. rasbt/LLMs-from-scratch** ⭐ 102,614
- Educational: implement ChatGPT-like LLM in PyTorch step-by-step
- Community favorite cho learning

---

### 📦 **AI Applications**

**1. CherryHQ/cherry-studio** ⭐ 50,430
- AI productivity studio: smart chat + autonomous agents + 300+ assistants
- Unified access to frontier LLMs

**2. hugohe3/ppt-master** ⭐ 46,543
- AI turns docs/topics → native PowerPoint
- Shapes, transitions, animations, charts, audio narration
- Vertical application với high polish

**3. ZhuLinsen/daily_stock_analysis** ⭐ 62,750
- LLM-driven multi-market stock analysis
- Multi-source data + real-time news + decision dashboard + auto notifications
- Zero-cost scheduled runs

**4. altic-dev/FluidVoice** ⭐ 76 (+76 hôm nay)
- Fastest macOS dictation với on-device STT + custom AI enhancement
- Local Wispr Flow alternative

**5. lightningpixel/modly** ⭐ 118 (+118 hôm nay)
- Desktop app: images → 3D models
- Runs entirely on GPU
- Local-first 3D generation

**6. harry0703/MoneyPrinterTurbo** ⭐ 103,157
- Topic/keyword → HD short videos
- Automated AI workflow
- Content creation automation

---

### 🔍 **RAG & Knowledge**

**1. langgenius/dify** ⭐ 152,380
- Agentic workflows + RAG pipelines builder
- Cloud/VPC/self-hosted flexibility
- Prototype → production platform

**2. open-webui/open-webui** ⭐ 148,722
- User-friendly AI interface cho Ollama, OpenAI API
- Strong community adoption

**3. langchain-ai/langchain** ⭐ 144,193
- The agent engineering platform
- Industry standard framework

**4. Shubhamsaboo/awesome-llm-apps** ⭐ 132,517
- 100+ AI Agents, Skills, RAG Apps
- Free & open source collection

**5. Graphify-Labs/graphify** ⭐ 106,049
- Codebase → queryable knowledge graph
- Skill cho Claude Code/Cursor/Codex/Gemini CLI
- Local deterministic AST parsing, no vector store

**6. infiniflow/ragflow** ⭐ 88,049 (+465 hôm nay)
- Leading RAG engine + Agent capabilities
- Context layer cho LLMs

**7. semantica-agi/semantica** ⭐ 713 (+713 hôm nay)
- Graph-Native Infrastructure cho Context & Accountable AI
- Python-based

**8. Mintplex-Labs/anything-llm** ⭐ 64,702
- "Stop renting your intelligence. Own it."
- Local-first agent experience

---

### 🔌 **Embedded AI**

**1. jaylfc/taOS** ⭐ 483
- Self-hosted AI agent OS
- Memory, chat, agents, files trên hardware bạn sở hữu
- Offline by default, cloud by choice
- Auto-clustering across consumer hardware (Orange Pi, Raspberry Pi, Mac mini, gaming PC)
- **Game changer**: democratizing AI infrastructure

**2. jaylfc/taosmd** ⭐ 75
- Local-first AI memory
- 8GB+ RAM (SBC, mini PC, laptop, workstation)
- Zero-loss verbatim archive + knowledge graph + hybrid retrieval
- Framework-agnostic, no cloud

**3. GatekeeperZA/RKLLM-API-Server** ⭐ 19
- RKLLM API Server - Open WebUI Managed Version
- Production-ready infrastructure cho Rockchip NPU

**4. Hanzo-Huang/rkllm-docker** ⭐ 9
- Dockerized RKLLM runtime
- OpenAI-compatible API cho Rockchip NPU models
- Containerization standardization

**5. Leon6225/InternVL3.5-4B-NPU** ⭐ 5
- Multimodal AI (InternVL3.5-4B) trên RK3588 NPU
- Vision + language understanding on edge

**6. isac322/rkmon** ⭐ 6
- Real-time hardware monitor TUI cho RK3588
- Like htop cho GPU, NPU, VPU, RGA, thermal zones
- Essential developer tool

**7. YeWenxuan64/Edge_Inferencer** ⭐ 1
- Unified edge AI inference engine
- One Python API cho Rockchip NPU, Qualcomm HTP, ONNX Runtime
- Auto-detects .rknn/.bin/.onnx

**8. YeWenxuan64/Edge_ModelDeploy** ⭐ 0 (mới)
- PyTorch/TensorFlow → ONNX → RKNN/QNN
- One-click quantization cho Rockchip & Qualcomm NPU

**9. cathrynlavery/diagram-design** ⭐ 4,475 (+4,475 hôm nay)
- 29 editorial diagram types cho Claude Code
- Self-contained HTML + SVG, no Mermaid
- Better visualization cho AI agents

---

## 🔮 Phân tích tín hiệu xu hướng

### **1. Agent Memory & Skills - From Stateless to Stateful**
- **Tín hiệu mạnh**: Anthropic publish "skills" repo → standardization sắp tới
- **Pattern**: Memory systems (claude-mem, taosmd) + skill repositories (obsidian-skills, anthropics/skills)
- **Ý nghĩa**: Agents đang chuyển từ "single-shot" sang "long-running with context"
- **Next**: Expect skill marketplaces và memory-as-a-service

### **2. Unified Workspaces - The "AI OS" Moment**
- **Repos**: macro (Rust), holaOS (TypeScript), taOS (Python)
- **Pattern**: Email + chat + docs + agents + CRM trong 1 workspace
- **Shared memory** là core differentiator
- **Ý nghĩa**: Moving beyond chat interfaces → full productivity suites
- **Challenge**: Adoption friction, migration từ existing tools

### **3. Embedded AI on NPU - Production Ready**
- **Hardware target**: Rockchip RK3588 (Orange Pi, Rock 5B+)
- **Toolchain maturity**: Docker images, API servers, monitoring tools, model deployment pipelines
- **Models**: Qwen2-VL-2B, Qwen3.5-4B, InternVL3.5-4B đã có NPU ports
- **Ý nghĩa**: Edge AI không còn là PoC - đang move to production
- **Cost angle**: Zero cloud inference costs - appealing cho startups & privacy-conscious users

### **4. Token Economy - Compression as Infrastructure**
- **headroom**: 60-95% token reduction cho JSON
- **caveman**: 65% reduction bằng cách "talk like caveman"
- **Ý nghĩa**: Token costs driving architectural innovations
- **Pattern**: Compression layers becoming standard middleware

### **5. Local-First AI - Sovereignty & Privacy**
- **Repos**: taOS, taosmd, anything-llm ("Stop renting your intelligence")
- **Driver**: Privacy concerns, cost control, data sovereignty
- **Enabler**: Smaller capable models (needle - 14MB), efficient inference (NPU)
- **Counter-trend**: Cloud services still dominant nhưng local-first đang có foothold

### **6. Vertical AI Applications - From Platforms to Products**
- **Examples**: ppt-master (presentations), career-ops (job search), daily_stock_analysis (finance)
- **Pattern**: Tận dụng existing agent frameworks để build focused solutions
- **Market signal**: Users muốn outcomes, không chỉ tools

### **7. Multimodal Edge Computing**
- **Audio-video generation** (LTX-2) + **3D generation** (modly) + **vision models on NPU**
- **Inference moving to edge** kể cả cho heavy workloads
- **Enabler**: Specialized hardware (NPU, GPU) trong consumer devices

---

## 💬 Tâm điểm cộng đồng

### **🌟 Top Community Momentum**

1. **cathrynlavery/diagram-design** (+4,475 stars)
   - Viral growth - giải quyết pain point cụ thể: better diagrams cho AI agents
   - No-dependency approach resonates với developers

2. **macro-inc/macro** (+1,239 stars)
   - Unified workspace narrative đang hot
   - Rust implementation signals performance focus

3. **semantica-agi/semantica** (+713 stars)
   - Graph-native infrastructure - alternative approach to vector stores
   - Accountability angle unique

4. **cactus-compute/needle** (+769 stars)
   - 14MB model excitement - model compression breakthrough
   - Embedded AI use cases expanding

5. **msitarzewski/agency-agents** (+778 stars)
   - "Complete AI agency" promise
   - Personality-driven agents appealing concept

### **📈 Sustained Growth Leaders**

- **NousResearch/hermes-agent**: 230K+ stars - established leader
- **affaan-m/ECC**: 239K+ stars - critical infrastructure
- **langgenius/dify**: 152K+ - enterprise adoption signal

### **🔧 Developer Tools Getting Traction**

- **kepano/obsidian-skills** (+292): Agent skills cho Obsidian - bridges PKM & AI agents
- **isac322/rkmon**: Monitoring tools cho NPU critical cho debugging

### **🎯 Themes Driving Engagement**

1. **Practical skills over theoretical frameworks** - skills repos outperforming pure frameworks
2. **Cost optimization** - compression & local-first repos getting attention
3. **Production readiness** - Docker images, API servers for NPU showing maturity
4. **Unified experiences** - fatigue với fragmented tool landscape

---

## 🎬 Kết luận

Ngày 14/08/2026 đánh dấu **sự trưởng thành của AI agent ecosystems**. Không còn chỉ là chat interfaces hay RAG demos - cộng đồng đang xây dựng:

- **Production-grade agent operating systems** với persistent memory
- **Standardized skill systems** (Anthropic leading)
- **Edge AI toolchains** hoàn chỉnh cho NPU hardware
- **Vertical solutions** giải quyết specific use cases

**Investment thesis**: Local-first + agent skills + embedded AI là 3 pillars đang converge. Startups nên focus vào vertical applications tận dụng 3 trends này.

**Watch next**: Anthropic's skills marketplace launch, further NPU model optimizations, memory-as-a-service platforms.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*