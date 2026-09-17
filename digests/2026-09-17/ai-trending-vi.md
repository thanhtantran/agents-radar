# Xu hướng AI Mã nguồn mở 2026-09-17

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-17 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở 2026-09-17

## Tóm tắt hôm nay

Sóng AI Agents tràn vào. Code review, security audit, research automation thống trị trending. Infrastructure hướng edge: MoE streaming from disk, NPU deployment bùng nổ. Agent memory và skill systems trở thành tầng nền tảng. Embedded AI (RKLLM/RKNPU) chuyển từ niche sang mainstream.

---

## Top repos theo chiều

### 🤖 AI Agents

**Trending:**
- **alibaba/open-code-review** (+3231) - Hybrid code review: deterministic pipeline + LLM agent, line-level comments, multi-language ruleset built-in
- **NousResearch/hermes-agent** (246K ⭐) - Agent grows with you, persistent learning
- **Significant-Gravitas/AutoGPT** (187K ⭐) - Accessible AI for everyone, vision-driven
- **anthropics/claude-code** (+165) - Agentic coding trong terminal, hiểu codebase, natural language commands
- **cline/cline** (+112) - Autonomous coding agent: SDK, IDE extension, CLI
- **langchain-ai/langchain** (146K ⭐) - Agent engineering platform

**Search hits:**
- **career-ops-hq/career-ops** (71K ⭐) - AI job search automation: scan portals, evaluate A-H report, tailor CV
- **CowAgent/zhayujie** (47K ⭐) - Super AI assistant, multi-agent workflows, self-evolves, lightweight
- **HKUDS/nanobot** (48K ⭐) - Ultra-lightweight framework, WebUI + tools + memory + MCP
- **DietrichGebert/ponytail** (140K ⭐) - Lazy senior dev thinking: best code = code never written

**Pattern nổi**: Agent harness optimization (ECC framework), persistent memory across sessions (claude-mem), agent skills marketplace

### 🔧 AI Infrastructure

**Trending:**
- **cloudflare/security-audit-skill** (+927) - Multi-phase security audits, machine-readable findings
- **anthropics/knowledge-work-plugins** (+110) - Plugins for Claude Cowork, knowledge workers focused
- **addyosmani/agent-skills** (+658) - Production-grade engineering skills cho AI agents
- **affaan-m/ECC** (+1057) - Agent harness performance optimization: skills, instincts, memory, security

**Core platforms:**
- **ollama/ollama** (181K ⭐) - Local model runtime: Kimi, GLM, Qwen, Gemma support
- **open-webui/open-webui** (152K ⭐) - User-friendly AI interface
- **huggingface/transformers** (166K ⭐) - Model-definition framework, multimodal
- **langgenius/dify** (156K ⭐) - Agentic workflows + RAG pipelines, collaborative workspace

**Tools:**
- **firecrawl/firecrawl** (181K ⭐) - Web data API: search, scrape, interact at scale
- **roboflow/supervision** (+260) - Reusable computer vision tools
- **headroomlabs-ai/headroom** (72K ⭐) - Compress tool outputs before LLM: 20% fewer tokens coding, 60-95% JSON

### 🧠 Models & Training

**Trending:**
- **JustVugg/colibri** (+1546) - Run frontier MoE on existing hardware, pure C, zero deps, experts streamed from disk
- **jamiepine/voicebox** (+417) - Open-source AI voice studio: clone, dictate, create
- **multimodal-art-projection/YuE** (+332) - Frontier music generation: symbolic planning, zero-shot covers, agentic editing

**Edge deployment:**
- **Leon6225/InternVL3.5-4B-NPU** - Vision+language cho RK3588 NPU
- **Qwen3.5-4B-NPU** - Deploy Qwen3.5 lên NPU local inference

### 📦 AI Applications

**Trending:**
- **Tencent/WeKnora** (+1197) - LLM knowledge platform: documents → RAG + autonomous agent + self-maintaining Wiki
- **ever-co/ever-gauzy** (+778) - Open Business Management Platform (ERP/CRM/HRM/ATS/PM)
- **supabase/supabase** (+120) - Postgres development platform cho web, mobile, AI apps

**Vertical solutions:**
- **hugohe3/ppt-master** (54K ⭐) - AI turns docs/topics → native PowerPoint: shapes, transitions, animations, audio narration
- **ZhuLinsen/daily_stock_analysis** (65K ⭐) - LLM multi-market stock analysis: real-time news, decision dashboard, auto push
- **CherryHQ/cherry-studio** (51K ⭐) - AI productivity studio: smart chat, autonomous agents, 300+ assistants

**Tools:**
- **abue-ammar/tinycast** (+1179) - Native macOS launcher, hotkeys, clipboard history
- **NationalSecurityAgency/ghidra** (+1059) - Software reverse engineering framework
- **ankitects/anki** (+58) - Smart spaced repetition flashcards

### 🔍 RAG & Knowledge

**Trending:**
- **alphaXiv/OpenResearch** (+1017) - Coding agents → research agents
- **rlaope/oh-my-hermes** (+80) - All-in-one plugin: coding intelligence, long-term memory, workflow packages

**Core systems:**
- **Shubhamsaboo/awesome-llm-apps** (138K ⭐) - 100+ AI Agents, Agent Skills, RAG Apps
- **thedotmack/claude-mem** (94K ⭐) - Persistent context across sessions, captures everything, injects relevant context
- **infiniflow/ragflow** (90K ⭐) - RAG + Agent capabilities, superior context layer
- **PaddlePaddle/PaddleOCR** (89K ⭐) - PDF/image → structured data, 100+ languages
- **Mintplex-Labs/anything-llm** (66K ⭐) - Own your intelligence, local-first agent
- **mem0ai/mem0** (65K ⭐) - Memory Layer for AI Agents, drop-in infrastructure
- **run-llama/llama_index** (52K ⭐) - Document processing platform
- **bojieli/ai-agent-book** (48K ⭐) - 《深入理解 AI Agent》开源主仓库

**Specialized:**
- **AKHYui/rkllama-webui** - Web UI for RKLLM NPU: multi-session, RAG knowledge base (bge-small-zh + ChromaDB)
- **Panniantong/Agent-Reach** (82K ⭐) - Give agents eyes: read & search Twitter, Reddit, YouTube, GitHub, zero API fees

### 🔌 Embedded AI

**Trending:**
- **rkllm ecosystem bùng nổ**: 
  - **darkautism/rkllm-rs** (11 ⭐) - Rust FFI binding
  - **Hanzo-Huang/rkllm3-docker** - RKNN3 LLM for RK1820/RK1828 via Docker
  - **boundarybitlabs/rkllm-rs** - Rust bindings to airockchip runtime
  - **T-Firefly-Dev/rknn-llm** - RKLLM Runtime for AIBOX-3588

**RKNPU development:**
- **dnhkng/open-rknpu** - Open compiler + libc-only runtime for RV1103/RV1106, no vendor SDK
- **gclawes/rockchip-dra-driver** - Kubernetes DRA driver for RK3588 GPU/NPU
- **darkautism/RockNPU** - Rust userspace runtime + compiler for mainline Linux
- **ruisv/rcdl** - RKNPU inference + media library: NPU inference, RGA preprocessing, MPP codecs
- **YeWenxuan64/Edge_ModelDeploy** - PyTorch/TensorFlow → ONNX → edge NPUs (RKNPU + Qualcomm HTP)

**Orange Pi ecosystem:**
- **jaylfc/taOS** (534 ⭐) - Self-hosted AI agent OS: memory, chat, agents on hardware you own, offline-first, auto-clustering
- **jaylfc/taosmd** (79 ⭐) - Local-first AI memory, runs offline on 8GB+ SBC, zero-loss archive, knowledge graph
- **MichaIng/DietPi** (6.2K ⭐) - Lightweight OS for single-board computers
- **LingZhen07/ros2-stm32-autonomous-robot** - ROS 2 + STM32 autonomous robot, CAN FD, RPLIDAR, SLAM on Orange Pi AI Pro

**Platforms:**
- **freed-dev-llc/terraform-provider-turingpi** - Terraform provider for Turing Pi 2.5 BMC
- **siyuan-note/siyuan** (46K ⭐) - Self-hosted knowledge workspace: humans + AI agents

---

## Phân tích tín hiệu xu hướng

**Agent Infrastructure Maturation:**
- Persistent memory systems (mem0, claude-mem) trở thành tầng nền tảng bắt buộc
- Agent skill marketplace xuất hiện: agent-skills, knowledge-work-plugins, Claude-Red (offensive security skills)
- Optimization frameworks (ECC, ponytail) tập trung compression và efficiency

**Hybrid Approaches Win:**
- Deterministic pipeline + LLM Agent (open-code-review)
- Local-first + cloud-optional (taOS, anything-llm)
- Specialized skills + general reasoning (security-audit-skill, OpenResearch)

**Edge AI Explosion:**
- RKLLM/RKNPU ecosystem chuyển từ experimental → production-ready
- Rust bindings xuất hiện hàng loạt (rkllm-rs, RockNPU, rkwhisper)
- MoE streaming from disk (colibri) mở AI frontier cho consumer hardware
- Orange Pi + RK3588 trở thành target platform chính cho self-hosted AI

**Knowledge Work Automation:**
- Career automation (career-ops): job search, CV tailoring, application tracking
- Content creation (ppt-master, YuE): native format output với full features
- Research workflows (OpenResearch, WeKnora): documents → queryable knowledge + autonomous agents

**Security & Production Focus:**
- Multi-phase security audits với machine-readable findings
- Offensive security skills (Claude-Red): SQLi, EDR evasion, exploit dev
- Production-grade engineering skills standardization

---

## Tâm điểm cộng đồng

**🔥 Hottest Releases:**
1. **alibaba/open-code-review** (+3231) - Alibaba-scale code review, tích hợp LLM agent + deterministic rules
2. **JustVugg/colibri** (+1546) - Chạy frontier MoE trên hardware existing, zero deps
3. **Tencent/WeKnora** (+1197) - Tencent's knowledge platform: RAG + agent + Wiki
4. **abue-ammar/tinycast** (+1179) - Native macOS productivity tool
5. **NationalSecurityAgency/ghidra** (+1059) - NSA's reverse engineering framework trending

**💡 Innovation Leaders:**
- **ponytail** (140K ⭐) - Philosophy shift: "best code = code never written"
- **ECC** (260K ⭐) - Agent harness optimization system
- **claude-mem** (94K ⭐) - Persistent context across sessions
- **Agent-Reach** (82K ⭐) - Give agents internet eyes, zero API fees

**🚀 Rising Stars:**
- **taOS** - Self-hosted AI agent OS, offline-first architecture
- **colibri** - Pure C MoE engine, experts streamed from disk
- **open-rknpu** - Open RKNPU compiler, không vendor lock-in
- **rkllm ecosystem** - Rust bindings maturation

**Ecosystem Health:**
- AI agents: số lượng frameworks bùng nổ, standardization đang diễn ra
- RAG/Knowledge: consolidation around major platforms (mem0, llama_index, ragflow)
- Embedded AI: RKLLM/RKNPU từ niche → mainstream trong 2026
- Developer tools: productivity automation (career-ops, ppt-master) thu hút attention lớn

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*