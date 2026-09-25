# Xu hướng AI Mã nguồn mở 2026-09-25

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-25 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở ngày 2026-09-25

## 📊 Tóm tắt hôm nay

AI agents phát triển mạnh. Nhiều framework orchestration mới từ Google, Anthropic, startup. Embedded AI tăng tốc: RKLLM/RKNPU ecosystem phát triển, edge device run model local. Memory và context compression solve token waste. Agent infrastructure mature - nhiều SDK production-ready.

---

## 🎯 Top repos theo chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **google/ax** (+1373) - Google ra agentic orchestration runtime mã nguồn mở, Go
- **vectorize-io/hindsight** (+1668) - Agent memory tự học, Python  
- **obra/superpowers** (+611) - Agentic skills framework, Shell
- **strands-agents/harness-sdk** (+455) - SDK production agent Python/TypeScript, multi-model/multi-cloud
- **superdesigndev/treg** (+468) - OpenRouter cho agent tools

**7 ngày qua (ai-agent):**
- **NousResearch/hermes-agent** (⭐248K) - Agent tự phát triển
- **zhayujie/CowAgent** (⭐47K) - Open-source AI assistant, multi-agent/multi-model
- **HKUDS/nanobot** (⭐48K) - Lightweight self-hosted agent framework, WebUI
- **HKUDS/CLI-Anything** (+413) - Làm mọi software agent-native
- **jaylfc/taOS** (⭐548) - Self-hosted agent OS, offline-first, run trên Pi/mini PC

**Tín hiệu:** Agent orchestration standardize. Google enter game. Memory persistence solve context problem. CLI/terminal agent boom.

### 🔧 AI Infrastructure  

**Trending hôm nay:**
- **rohitg00/ai-engineering-from-scratch** (+347) - Learn/build/ship AI engineering
- **anthropics/financial-services** (+509) - Anthropic ra financial vertical tools

**7 ngày qua:**
- **thedotmack/claude-mem** (⭐94K) - Persistent context cho mọi agent, compress AI
- **headroomlabs-ai/headroom** (⭐73K) - Compress output/log/file trước khi đưa LLM, giảm 20-95% token
- **career-ops-hq/career-ops** (⭐72K) - AI job search local CLI
- **affaan-m/ECC** (⭐266K) - Agent harness optimization system
- **JuliusBrussee/caveman** (⭐107K) - Viral skill cut 65% token bằng cách nói như caveman

**Tín hiệu:** Token compression hot topic. Local-first infrastructure. Agent performance optimization critical. CLI agent mainstream.

### 🧠 Models & Training

**Trending hôm nay:**
- **NVIDIA/Model-Optimizer** (+44) - SOTA optimization: quantization, distillation, pruning, NAS

**7 ngày qua:**
- **leejet/stable-diffusion.cpp** (+36) - Diffusion model pure C/C++, SD/Flux/Qwen Image

**Tín hiệu:** Model optimization quan trọng cho deployment. Lightweight inference C++ trend.

### 📦 AI Applications

**Trending hôm nay:**
- **dream-num/univer** (+1082) - Office harness cho AI agents: spreadsheet/docs/slides/canvas/tables/PDF, TypeScript
- **FxEmbed/FxEmbed** (+182) - Fix X/Twitter embed: multiple images/videos/polls
- **mvt-project/mvt** (+272) - Mobile forensics toolkit

**7 ngày qua:**
- **CherryHQ/cherry-studio** (⭐52K) - AI productivity studio, smart chat/agents/300+ assistants
- **siyuan-note/siyuan** (⭐46K) - Self-hosted knowledge workspace, human-AI collab
- **hugohe3/ppt-master** (⭐56K) - AI tạo PowerPoint native từ doc/topic
- **ZhuLinsen/daily_stock_analysis** (⭐65K) - LLM stock analysis, multi-market
- **Hmbown/Codewhale** (⭐41K) - Terminal coding agent, Rust
- **bojieli/ai-agent-book** (⭐50K) - Sách "Hiểu sâu AI Agent", PDF + code

**Tín hiệu:** Vertical AI apps bùng nổ (finance, stock, office, code). Knowledge management + AI. Education material phát triển.

### 🔍 RAG & Knowledge

**7 ngày qua:**
- **open-webui/open-webui** (⭐153K) - AI interface hỗ trợ Ollama/OpenAI
- **langchain-ai/langchain** (⭐147K) - Agent engineering platform
- **Shubhamsaboo/awesome-llm-apps** (⭐139K) - 100+ AI agents/skills/RAG apps
- **Graphify-Labs/graphify** (⭐121K) - Codebase thành knowledge graph, AST parsing
- **infiniflow/ragflow** (⭐91K) - RAG engine + Agent capabilities
- **datawhalechina/hello-agents** (⭐80K) - Tutorial agent từ đầu (tiếng Trung)
- **Mintplex-Labs/anything-llm** (⭐66K) - Local-first agent experience
- **mem0ai/mem0** (⭐65K) - Memory layer cho AI agents

**Tín hiệu:** RAG mature, integrate với agent. Knowledge graph approach. Memory persistence infrastructure.

### 🔌 Embedded AI

**Trending hôm nay:** Không có repo nổi bật

**7 ngày qua (rkllm):**
- **darkautism/rkllm-rs** (⭐13) - RKLLM Rust FFI binding
- **XiaomingX/awesome-rk3588** (⭐5) - RK3588 resource index: RKNN/RKLLM/NPU
- **Leon6225/InternVL3.5-4B-NPU** (⭐5) - InternVL3.5 cho RK3588 NPU
- **ambagesthickskin162/Qwen3.5-4B-NPU** (⭐1) - Qwen3.5 NPU deployment
- **davidfeng12/MiniCPM-V-4.6-RK3588S** (⭐0) - MiniCPM-V deploy RK3588S, RKNN/RKLLM

**7 ngày qua (rknpu):**
- **lona-cn/vision-simple** (⭐40) - Lightweight C++ vision inference, YOLO/PaddleOCR, ONNXRuntime/RKNPU
- **dnhkng/open-rknpu** (⭐6) - Open compiler cho RV1103/RV1106 NPU, no vendor SDK
- **ruisv/rcdl** (⭐1) - RKNPU inference library, RK3588/RK3576
- **gclawes/rockchip-dra-driver** (⭐1) - Kubernetes DRA driver cho RK3588 GPU/NPU
- **lurenJBD/rk3588-rknn-core** (⭐0) - Mainline kernel driver RK3588 RKNPU

**7 ngày qua (orangepi):**
- **jaylfc/taOS** (⭐548) - Agent OS run offline trên Pi/mini PC
- **jaylfc/taosmd** (⭐79) - Local-first AI memory, 8GB+ RAM
- **nouverse/nouride-releases** (⭐13) - Multi-agent engine cho Pi/Orange Pi
- **MichaIng/DietPi** (⭐6.2K) - Lightweight OS cho SBC
- **RaspAP/raspap-webgui** (⭐5.2K) - Wireless router setup
- **geerlingguy/sbc-reviews** (⭐996) - SBC review data
- **art-den/astra_lite** (⭐53) - Astrophotography software cho Pi

**Tín hiệu:** Edge AI explode. RKLLM/RKNPU ecosystem phát triển. Rust binding appear. Open-source alternative vendor SDK. Kubernetes integration edge device. Orange Pi/Raspberry Pi chạy agent production.

---

## 🔥 Phân tích tín hiệu xu hướng

### Agent Orchestration Mainstream
- Google ra Ax (Go)
- Nhiều SDK production (Strands, Treg)
- Agent harness optimization (ECC, Superpowers)

### Token Economics Critical
- Compression framework hot: Headroom, Claude-mem, Caveman
- Giảm 20-95% token = tiết kiệm cost + faster
- Memory persistence solve context window problem

### Embedded AI Production-Ready
- RKLLM/RKNPU ecosystem mature
- Open compiler, Rust binding, Kubernetes driver
- Edge device (Pi, Orange Pi) run agent offline local
- Multi-agent OS cho homelab

### Local-First Movement
- Self-hosted agent (taOS, Nanobot, AnythingLLM)
- Offline-first memory (taosmd)
- Privacy-first knowledge workspace (SiYuan)

### Vertical AI Apps Boom
- Finance (Anthropic, TradingAgents)
- Office (Univer, PPT Master)
- Job search (Career Ops)
- Stock analysis
- Coding (Codewhale)

### Knowledge Graph > Vector DB
- Graphify: AST parsing codebase thành graph
- Deterministic, explainable
- No vector store

---

## 🎯 Tâm điểm cộng đồng

**Google/Ax** - Tech giant enter agent orchestration. Go language signal performance focus.

**Hindsight** - Agent memory tự học. 1668 star ngày đầu = community hungry cho memory solution.

**Univer** - Office harness cho agent. Spreadsheet/docs/slides trong một runtime = killer app cho business automation.

**ECC** - 266K star. Agent performance optimization system. Viral trong coding agent community.

**taOS + taosmd** - Self-hosted agent OS run trên consumer hardware. Privacy-first alternative cloud agent.

**Headroom + Caveman** - Token compression viral. Simple idea, big impact. 60-95% saving impossible ignore.

**RKLLM ecosystem** - Edge AI explode. Rust binding, open compiler, Kubernetes integration. Rockchip NPU from niche to production.

**Graphify** - Knowledge graph beat vector DB narrative. Deterministic, explainable, AST-based.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*