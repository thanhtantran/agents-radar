# Xu hướng AI Mã nguồn mở 2026-10-25

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-25 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 25/10/2026

## 📊 Tóm tắt hôm nay

Cộng đồng đang tập trung vào **agent infrastructure** và **embedded AI**. Điểm nổi bật: Cloudflare ra mắt security audit skill, NVIDIA phát hành OpenShell runtime cho agent, và làn sóng optimize AI trên hardware giá rẻ (RK3588, Orange Pi) với NPU acceleration.

---

## 🔥 Top Repos Theo Chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **cloudflare/security-audit-skill** (+2264⭐) - Multi-phase security audit với machine-readable findings
- **NVIDIA/OpenShell** (+896⭐) - Safe, private runtime cho autonomous agents
- **makecindy/cindy** (+477⭐) - Open-source AI agent hoạt động out-of-the-box
- **google-gemini/gemini-cli** (+44⭐) - Gemini vào terminal

**7 ngày qua:**
- **NousResearch/hermes-agent** (256K⭐) - Agent tự học và phát triển
- **Panniantong/Agent-Reach** (101K⭐) - Agent đọc toàn bộ internet (Twitter, Reddit, YouTube...)
- **career-ops-hq/career-ops** (77K⭐) - AI job search agent, tự động score jobs, viết CV
- **zhayujie/CowAgent** (47K⭐) - Personal AI assistant framework, multi-agent, tự evolve
- **codewhale-hq/Codewhale** (41K⭐) - Terminal agent viết bằng Rust

### 🔧 AI Infrastructure

**Trending hôm nay:**
- **aws/agent-toolkit-for-aws** (+13⭐) - MCP servers, skills, plugins cho AWS
- **Nutlope/hallmark** (+455⭐) - Anti-AI-slop design skill
- **pbakaus/impeccable** (+619⭐) - Design language cho AI harness

**7 ngày qua:**
- **firecrawl/firecrawl** (195K⭐) - Web data cho AI agents
- **affaan-m/ECC** (288K⭐) - Agent harness optimization: skills, memory, security
- **thedotmack/claude-mem** (102K⭐) - Persistent context cross-session, auto-compress với AI
- **headroomlabs-ai/headroom** (77K⭐) - Compress tool outputs trước khi vào LLM, giảm 20-95% tokens
- **mem0ai/mem0** (67K⭐) - Memory layer cho AI agents

### 🧠 Models & Training

**7 ngày qua:**
- **huggingface/transformers** (168K⭐) - Framework cho SOTA ML models
- **ollama/ollama** (184K⭐) - Run Kimi, GLM, DeepSeek, Qwen local

### 📦 AI Applications

**Trending hôm nay:**
- **luongnv89/claude-howto** (+392⭐) - Visual guide cho Claude Code với templates

**7 ngày qua:**
- **morluto/rea** (378K⭐) - Reverse engineer anything với agents
- **hugohe3/ppt-master** (67K⭐) - AI tạo PowerPoint từ docs, native shapes + animations
- **ZhuLinsen/daily_stock_analysis** (67K⭐) - LLM-driven stock analysis, multi-market, real-time news
- **CherryHQ/cherry-studio** (52K⭐) - AI productivity studio, 300+ assistants
- **siyuan-note/siyuan** (46K⭐) - Self-hosted knowledge workspace, human + AI collab
- **harry0703/MoneyPrinterTurbo** (134K⭐) - AI tự động tạo short video HD

### 🔍 RAG & Knowledge

**7 ngày qua:**
- **open-webui/open-webui** (156K⭐) - User-friendly AI interface
- **langchain-ai/langchain** (148K⭐) - Agent engineering platform
- **Shubhamsaboo/awesome-llm-apps** (142K⭐) - 100+ AI Agents, RAG Apps
- **Graphify-Labs/graphify** (134K⭐) - Codebase thành queryable knowledge graph, no vector store
- **infiniflow/ragflow** (92K⭐) - RAG engine với Agent capabilities
- **unclecode/crawl4ai** (86K⭐) - Web crawler cho LLMs, any site → Markdown
- **langgenius/dify** (159K⭐) - Agentic workflows, RAG pipelines, cloud/VPC/self-hosted
- **Mintplex-Labs/anything-llm** (67K⭐) - Local-first agent experience
- **browser-use/browser-use** (119K⭐) - AI browser agents + hosted API

### 🔌 Embedded AI

**RK3588/RKLLM/RKNPU (7 ngày qua):**
- **jaylfc/taOS** (579⭐) - Self-hosted AI OS, offline-first, auto-cluster Orange Pi/Raspberry Pi/Mac mini
- **happyme531/open_rknpu2_lm_infer** (48⭐) - Fully open LLM inference engine cho RK3588 NPU
- **ajokela/rktop** (36⭐) - System monitor cho RK3588/RK3399, realtime CPU/GPU/NPU
- **Hanzo-Huang/rkllm-docker** (21⭐) - Run RKLLM trong một docker command
- **Hanzo-Huang/rk3576-home-assistant-voice** (19⭐) - Local HA voice stack, NPU-accelerated Whisper + Piper
- **happyme531/rknpu2_matmul_open** (9⭐) - Matrix mul + quantized LLM kernels cho RK3588
- **Muse-ztl/rk3588-multimodal-edge** (2⭐) - RK3588S multimodal: RF-DETR + Qwen2.5
- **kkkzx-hx/qwen-vl-rk3588** (1⭐) - Qwen2.5-VL-3B offline trên RK3588 (NPU + W8A8)

**Orange Pi (7 ngày qua):**
- **MichaIng/DietPi** (6.3K⭐) - Lightweight OS cho SBC
- **RaspAP/raspap-webgui** (5.2K⭐) - Full-featured wireless router setup
- **ptitSeb/gl4es** (863⭐) - OpenGL → GL ES translation
- **Animan-AI/DuckBuddy** (48⭐) - Embodied AI robot duck, Orange Pi Zero 3W + Feetech servos
- **nouverse/nouride-releases** (25⭐) - Multi-agent AI engine cho homelab/mini devices
- **Palmyaen/orangepi** (1⭐) - Edge-AI pipeline RK3588: YOLOv5s across 3 NPU cores + RGA/MPP

---

## 🔥 Tín hiệu Xu hướng

1. **Agent Harness Ecosystem nổi lên**
   - Skills/plugins architecture: Cloudflare security-audit-skill, AWS agent-toolkit
   - Memory persistence: claude-mem (102K⭐), mem0 (67K⭐)
   - Context optimization: headroom (77K⭐) giảm tokens 20-95%

2. **Embedded AI chuyển từ demo sang production**
   - RK3588 NPU: open-source inference engine, kernel drivers, matmul kernels
   - Home automation: RK3576 voice stack với NPU Whisper
   - Multimodal edge: RF-DETR + Qwen2.5 chạy trên RK3588S

3. **Local-first, Self-hosted phản đòn cloud**
   - taOS (579⭐): offline AI OS, auto-cluster consumer hardware
   - taosmd (82⭐): offline AI memory, zero-loss verbatim archive
   - nouride (25⭐): multi-agent daemon cho homelab

4. **Vertical AI Applications bùng nổ**
   - Job search: career-ops tự động score + ATS resume
   - Stock analysis: daily_stock_analysis multi-market với LLM
   - Content: ppt-master native PowerPoint, MoneyPrinterTurbo auto video

5. **Knowledge Graph thay Vector Store**
   - graphify (134K⭐): codebase → queryable graph, deterministic AST parsing
   - Không cần vector embeddings, mọi edge đều explainable

---

## 💬 Tâm điểm Cộng đồng

**Cuộc đua Agent Runtime:**
- NVIDIA OpenShell (+896⭐ hôm nay) vs Cloudflare security-audit-skill (+2264⭐)
- Ecosystem bet: AWS ra mắt MCP servers/skills/plugins

**Embedded AI đột phá:**
- happyme531's RK3588 stack: fully open inference engine (48⭐) + matmul kernels (9⭐)
- jaylfc's taOS (579⭐) chứng minh consumer hardware cluster khả thi

**Memory vs Compression:**
- claude-mem (102K⭐): compress + inject context
- headroom (77K⭐): compress trước khi vào LLM
- Cộng đồng chưa consensus strategy nào tối ưu

**Knowledge Graph revival:**
- graphify (134K⭐) đánh bại vector-based RAG bằng deterministic parsing
- Câu hỏi mở: liệu graph scale khi codebase > 1M LOC?

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*