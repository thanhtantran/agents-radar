# Xu hướng AI Mã nguồn mở 2026-10-02

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-02 02:00 UTC

---

# 📊 Báo cáo xu hướng GitHub - 2026-10-02

## 🔥 Tóm tắt hôm nay

AI agent ecosystem bùng nổ. Trending hôm nay dominated bởi agent frameworks, tooling, context optimization. Shift rõ: từ standalone LLM apps → agent infrastructure + multi-agent orchestration. NPU/edge AI niche nhưng active. RAG + memory systems mature hơn.

## 📂 Top repos theo chiều

### 🤖 **AI Agents** (Frameworks, multi-agent, automation)

**Trending:**
- **NVIDIA/OpenShell** (+2,456⭐) — Safe runtime cho autonomous agents, Rust
- **mvschwarz/openrig** (+642⭐) — Multi-agent network: Claude Code/Codex/Pi với roles + shared context
- **obra/superpowers** (+455⭐) — Agentic skills framework + dev methodology
- **earendil-works/pi** (+298⭐) — Agent toolkit: unified LLM API, agent loop, TUI, coding CLI

**Search 7 days:**
- **NousResearch/hermes-agent** (250K⭐) — "The agent that grows with you"
- **affaan-m/ECC** (270K⭐) — Performance optimization system cho agent harness
- **zhayujie/CowAgent** (47K⭐) — Open-source personal AI assistant, self-evolves
- **HKUDS/nanobot** (48K⭐) — Ultra-lightweight self-hosted agent framework
- **career-ops-hq/career-ops** (73K⭐) — AI job search agent: scan portals, CV tailoring, tracking

### 🔧 **AI Infrastructure** (SDKs, inference, tools, CLIs)

**Trending:**
- **cursor/plugins** (+150⭐) — Cursor plugin spec + official plugins
- **mksglu/context-mode** (+362⭐) — Context window optimization: 98% tool output reduction, MCP + hooks
- **DietrichGebert/ponytail** (+1,194⭐) — Makes agent think like lazy senior dev
- **mattpocock/skills** (+883⭐) — Skills for real engineers

**Search 7 days:**
- **langchain-ai/langchain** (147K⭐) — Agent engineering platform
- **ollama/ollama** (182K⭐) — Run Kimi, GLM, DeepSeek, Qwen local
- **firecrawl/firecrawl** (187K⭐) — Web data API cho AI agents
- **headroomlabs-ai/headroom** (74K⭐) — Compress tool outputs/logs: 60-95% token reduction

### 🧠 **Models & Training**

**Trending:**
- **firebase/firebase-ios-sdk** (+112⭐) — Apple SDK
- **Friedrich-M/UniMate** (+217⭐) — [SIGGRAPH Asia 2026] Animate diverse skeletons

**Search 7 days:**
- **huggingface/transformers** (166K⭐) — State-of-the-art ML models
- **tile-ai/tilelang** (+163⭐) — DSL cho GPU/CPU/Accelerator kernels

### 📦 **AI Applications** (Products, solutions)

**Trending:**
- **heygen-com/hyperframes** (+627⭐) — Write HTML, render video cho agents
- **pablostanley/yoinks** (+361⭐) — yoink video from terminal
- **pbakaus/impeccable** (+495⭐) — Design language cho AI harness

**Search 7 days:**
- **Significant-Gravitas/AutoGPT** (187K⭐) — Accessible AI vision
- **CherryHQ/cherry-studio** (52K⭐) — AI productivity studio: chat, agents, 300+ assistants
- **harry0703/MoneyPrinterTurbo** (127K⭐) — AI tạo HD short video
- **browser-use/browser-use** (116K⭐) — Agents use browser
- **hugohe3/ppt-master** (57K⭐) — AI turns docs/topics → native PowerPoint
- **ZhuLinsen/daily_stock_analysis** (65K⭐) — LLM-driven multi-market stock analysis

### 🔍 **RAG & Knowledge**

**Search 7 days:**
- **open-webui/open-webui** (153K⭐) — User-friendly AI interface
- **Shubhamsaboo/awesome-llm-apps** (140K⭐) — 100+ AI Agents, skills, RAG apps
- **Graphify-Labs/graphify** (123K⭐) — Turn codebase → queryable knowledge graph
- **thedotmack/claude-mem** (95K⭐) — Persistent context across sessions
- **infiniflow/ragflow** (91K⭐) — RAG engine + Agent capabilities
- **Mintplex-Labs/anything-llm** (66K⭐) — Local-first agent experience
- **mem0ai/mem0** (66K⭐) — Memory layer cho AI agents
- **thedaviddias/Front-End-Checklist** (74K⭐) — Checklist cho humans + AI agents

### 🔌 **Embedded AI** (NPU, edge AI, Orange Pi, RKLLM/RKNPU)

**Orange Pi:**
- **jaylfc/taOS** (554⭐) — Self-hosted AI agent OS: offline-first, auto-clustering across SBCs
- **jaylfc/taosmd** (79⭐) — Local-first AI memory, 8GB+ RAM, offline
- **MichaIng/DietPi** (6,315⭐) — Lightweight OS cho SBCs
- **RaspAP/raspap-webgui** (5,225⭐) — Full-featured wireless router

**RKLLM:**
- **Leon6225/InternVL3.5-4B-NPU** (5⭐) — Multimodal AI cho RK3588 NPU
- **ambagesthickskin162/Qwen3.5-4B-NPU** (1⭐) — Qwen3.5-4B trên NPU hardware
- **WMXJY/rkllm-openai-server** (0⭐) — OpenAI-compatible RKLLM inference: Qwen3-VL 2B/4B trên RK3576/RK3588
- **chenchengchen13/rk3588-llm-npu** (0⭐) — Deploy LLM (DeepSeek-R1-Distill/Qwen2.5) trên RK3588 NPU

**RKNPU:**
- **lona-cn/vision-simple** (92⭐) — Lightweight C++ vision inference: YOLOv10/v11, PaddleOCR
- **gregordinary/ggml-rocket** (21⭐) — ggml backend cho Rockchip NPUs: llama.cpp/whisper.cpp
- **isac322/rkmon** (12⭐) — Real-time hardware monitor TUI cho RK3588: GPU, NPU, VPU
- **gregordinary/rockchip-npu-notes** (17⭐) — RK3588 NPU research notes
- **gregordinary/rocket-userspace** (17⭐) — Userspace driver cho Rockchip NPUs

## 🎯 Phân tích tín hiệu xu hướng

**1. Agent harness ecosystem maturity:**
- Agent frameworks không còn experimental. Production-ready tools xuất hiện (OpenShell, openrig, superpowers)
- Focus shift: từ "làm agent chạy được" → "làm agent chạy tốt + scale"
- Multi-agent orchestration: shared context, roles, persistent teams emerging pattern

**2. Context window optimization critical:**
- Context limits = bottleneck lớn
- Solutions: compression (headroom: 60-95%), sandbox tool output (context-mode: 98%), memory systems (claude-mem, taosmd)
- MCP (Model Context Protocol) adoption tăng

**3. Edge AI movement gains momentum:**
- NPU inference trên consumer hardware (RK3588, Orange Pi) viable
- Local-first philosophy: privacy + offline capability
- taOS signal: clustering consumer hardware thành distributed AI infrastructure

**4. Skills/instincts pattern:**
- "Skills for agents" trend: mattpocock/skills, obra/superpowers, ECC
- Agent capabilities packaged as shareable skills
- Shift từ monolithic agent → modular, composable agent abilities

**5. Developer experience focus:**
- CLI-first tools (pi, yoinks)
- Integration với existing workflows (cursor/plugins)
- "Lazy senior dev" philosophy (ponytail): ít code hơn, efficient hơn

**6. Vertical AI solutions explode:**
- Job search (career-ops), stock analysis (daily_stock_analysis), video generation (MoneyPrinterTurbo, hyperframes), PPT (ppt-master)
- Agents specializing → domain-specific products

## 🌟 Tâm điểm cộng đồng

**Top momentum (stars hôm nay):**
1. **NVIDIA/OpenShell** (+2,456⭐) — Nvidia entry vào agent runtime space, big signal
2. **ponytail** (+1,194⭐) — Philosophy resonates: code you never wrote = best code
3. **mattpocock/skills** (+883⭐) — Real engineers want practical skills, not abstractions

**Breakout projects:**
- **openrig**: Multi-agent collaboration với Claude Code/Codex/Pi, persistent teams
- **context-mode**: 98% output reduction addresses real pain
- **Graphify-Labs/graphify**: Knowledge graph cho codebase, no vector store, deterministic

**Underrated gems:**
- **taOS/taosmd**: Local-first AI memory trên commodity hardware, offline-by-default
- **gregordinary/ggml-rocket**: llama.cpp offload sang RK3588 NPU
- **headroom**: Token compression library, 20-95% reduction

**Community energy:**
- AI agent infra > apps: frameworks, tooling, optimization tools dominate trending
- Open-source momentum: alternatives tới closed solutions (local LLMs, self-hosted agents)
- Edge AI niche nhưng passionate: dedicated engineers building userspace drivers, benchmarks, tooling

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*