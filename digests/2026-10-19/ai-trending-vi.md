# Xu hướng AI Mã nguồn mở 2026-10-19

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-19 02:00 UTC

---

# Báo cáo Xu hướng AI Mã Nguồn Mở - 19/10/2026

## 🎯 Tóm tắt

Coding agent đại chiến. Plugin ecosystems nổi lên (Claude Code, Cursor). Job search automation breakthrough. Agent harness tới thời điểm bùng nổ. Edge AI ngầm phát triển (RK3588, Orange Pi). Memory & context management giờ là infrastructure layer riêng.

## 📊 Top Repos Theo Chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **MadsLorentzen/ai-job-search** (+2232⭐) - Job search agent trên Claude Code: đánh giá job posting, tạo CV/cover letter, prep interview
- **anomalyco/opencode** (+1414⭐) - Open source coding agent
- **stablyai/orca** (+1146⭐) - Fleet management cho coding agents (Grok Bot, Claude Code), chạy bất kỳ agent nào với subscription riêng

**7 ngày qua:**
- **NousResearch/hermes-agent** (254K⭐) - Agent tự học, tự phát triển
- **Panniantong/Agent-Reach** (99K⭐) - Cho agent "đôi mắt" - đọc Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, zero API cost
- **career-ops-hq/career-ops** (75K⭐) - Job search agent: score jobs 1-5, tạo resume ATS-friendly, interview prep
- **zhayujie/CowAgent** (47K⭐) - Personal AI assistant, multi-agent/model/channel, tự tiến hóa
- **HKUDS/nanobot** (49K⭐) - Ultra-lightweight agent framework, Python, WebUI, tools, memory, MCP

### 🔧 AI Infrastructure

**Trending hôm nay:**
- **anthropics/claude-plugins-official** (+1175⭐) - Official plugin directory cho Claude Code
- **cursor/plugins** (+350⭐) - Cursor plugin spec + official plugins
- **ruvnet/ruflo** (+513⭐) - Original agent harness: multi-player swarms, autonomous workflows, adaptive memory
- **akitaonrails/ai-memory** (+512⭐) - Long-term memory cho agent CLIs, facilitate handoff giữa vendors

**7 ngày qua:**
- **morluto/rea** (323K⭐) - Reverse engineer anything với agents, từ app behavior đến native binaries
- **affaan-m/ECC** (283K⭐) - Agent harness performance optimization: skills, instincts, memory, security
- **firecrawl/firecrawl** (192K⭐) - Supercharge agents với web data
- **thedotmack/claude-mem** (101K⭐) - Persistent context across sessions cho mọi agent
- **headroomlabs-ai/headroom** (75K⭐) - Compress tool outputs/logs/files/RAG chunks trước khi tới LLM: 20% ít token hơn cho coding agents
- **mem0ai/mem0** (67K⭐) - Memory layer cho AI agents - drop-in infrastructure

### 🧠 Models & Training

**7 ngày qua:**
- **ollama/ollama** (183K⭐) - Run Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma locally
- **huggingface/transformers** (167K⭐) - State-of-the-art ML models framework

### 📦 AI Applications

**Trending hôm nay:**
- **HKUDS/CLI-Anything** (+589⭐) - Making ALL software agent-native
- **debpalash/VoiceStudio** (+2082⭐) - Open-source, fully-local ElevenLabs alternative: voice cloning, design, dubbing, transcription, audiobook tạo 646 ngôn ngữ

**7 ngày qua:**
- **ZhuLinsen/daily_stock_analysis** (66K⭐) - LLM-driven multi-market stock analysis: real-time news, decision dashboard, auto notifications
- **hugohe3/ppt-master** (63K⭐) - AI turns documents thành native PowerPoint với shapes, transitions, animations, charts, audio narration
- **CherryHQ/cherry-studio** (52K⭐) - AI productivity studio: smart chat, autonomous agents, 300+ assistants
- **siyuan-note/siyuan** (46K⭐) - Open-source, self-hosted knowledge workspace cho humans + AI agents
- **harry0703/MoneyPrinterTurbo** (132K⭐) - AI tự động tạo HD short videos từ topic/keyword

### 🔍 RAG & Knowledge

**7 ngày qua:**
- **open-webui/open-webui** (156K⭐) - User-friendly AI interface (Ollama, OpenAI API support)
- **langchain-ai/langchain** (148K⭐) - Agent engineering platform
- **Shubhamsaboo/awesome-llm-apps** (142K⭐) - 100+ AI Agents, Agent Skills, RAG Apps
- **Graphify-Labs/graphify** (128K⭐) - Turn codebase thành queryable knowledge graph - local deterministic AST parsing, skill cho Claude Code/Cursor/Codex/Gemini CLI
- **infiniflow/ragflow** (92K⭐) - Leading RAG engine fuses RAG với Agent capabilities
- **unclecode/crawl4ai** (85K⭐) - Open-source web crawler cho LLMs: any website → clean LLM-ready Markdown
- **datawhalechina/hello-agents** (83K⭐) - 从零开始构建智能体 tutorial

### 🔌 Embedded AI (NPU/Edge)

**RKLLM/RKNPU (7 ngày):**
- **tristanpenman/vlm-rknn** (1⭐) - Vision-language models trên Rockchip via RKNN/RKLLM
- **ambagesthickskin162/Qwen3.5-4B-NPU** (1⭐) - Deploy Qwen3.5-4B trên NPU hardware
- **QQD23/rkllm-long-context-gqa** - Experimental GQA/PV optimization cho long-context RKLLM inference trên RK3588
- **Jack-GPU/edge-llm-policy-execution-engine** - RK3588S edge verifiable control agent (RKLLM + rules + schema)
- **ShiWarai/system-one-rknn** - Сервис для system-one моделей trên Rockchip NPUs
- **C-NHXT-N/rk3576-linux-lab** - RK3576 + Linux project tutorial: Linux basics → systemd → system programming → RKNN/RKLLM → ROS 2 → embedded AI

**RKNPU (7 ngày):**
- **jaylfc/taOS** (568⭐) - Self-hosted AI agent OS: memory, chat, agents, files stay on your hardware offline. Offline AI memory (taOSmd), self-hosted group chat, web desktop + app store, auto-clustering across consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC)
- **gregordinary/ggml-rocket** (24⭐) - Drop-in ggml backend cho Rockchip NPUs: offloads llama.cpp/whisper.cpp prefill tới RK3588 NPU
- **gregordinary/rocket-userspace** (20⭐) - Userspace driver, matmul, on-NPU op library cho Rockchip NPUs via mainline rocket DRM-accel driver
- **happyme531/open_rknpu2_lm_infer** (14⭐) - Fully open-source, high-performance LLM inference engine cho RK3588 NPU
- **YeWenxuan64/rktop** (10⭐) - Real-time monitoring RK3588 CPU, NPU, GPU, RGA trong terminal
- **oRKLLM/ork-driver** (7⭐) - Clean-room userspace matmul library cho Rockchip NPU
- **gregordinary/ort-rocket** (3⭐) - ONNX Runtime execution provider cho Rockchip NPUs - offloads transformer vision encoders (RF-DETR, CLIP/SigLIP, SAM, Depth Anything v2) tới NPU

**Orange Pi (7 ngày):**
- **jaylfc/taosmd** (81⭐) - Local-first AI memory - chạy offline trên any machine 8GB+ RAM (SBC, mini PC, laptop). Zero-loss verbatim archive, knowledge graph, hybrid retrieval. Framework-agnostic, no cloud
- **ut-slayer/orangepi-4a-mainline** (15⭐) - Mainline Linux 6.18 support cho Orange Pi 4A (Allwinner T527 / A523): HDMI KMS, Mali-G57 Panfrost, WiFi, HDMI audio, ethernet, USB, cpufreq/thermal
- **Artod/robot-pepin** (6⭐) - Pepin: home robot trên IKEA cart - differential drive, 6-DoF arm, 360° lidar, ToF, cameras. Laptop brain over wifi, Orange Pi relay
- **Animan-AI/DuckBuddy** (5⭐) - Open-source embodied AI robot duck: walks, hears, sees, có life riêng. Feetech servos + Orange Pi Zero 3W, built on Pollen Robotics' Microduck

## 🔥 Tín hiệu Xu hướng

### Plugin Ecosystems Thống trị
Claude Code, Cursor đua nhau ra official plugin systems. Agent extensibility giờ là standard requirement. Third-party plugin marketplaces đang hình thành.

### Agent Harness = Infrastructure Layer
Không còn monolithic agents. Giờ là harness systems manage multiple agents, facilitate handoffs, optimize performance. ECC, ruflo, career-ops pattern.

### Memory & Context Persistence
Long-term memory thành critical infrastructure: claude-mem, ai-memory, mem0, taosmd. Agents cần remember across sessions, giữ context khi switch vendors.

### Job Search Automation Breakthrough
AI job application frameworks bùng nổ. Not just CV generation - full pipeline: evaluate postings → tailor docs → prep interviews → application tracking. Career-ops, ai-job-search đều +50K+ stars trong vài ngày.

### Knowledge Graph > Vector DB
Graphify approach: deterministic AST parsing thành queryable graph thay vì embeddings. "Every edge explained, no vector store."

### Edge AI Ngầm Phát Triển
RK3588/RK3576 NPU community đang build serious infrastructure:
- Mainline kernel drivers (rocket DRM-accel)
- Clean-room matmul libraries
- ONNX Runtime execution providers
- Full LLM inference engines
- Vision-language models
Orange Pi đang trở thành go-to hardware cho self-hosted AI agents.

### Local-First, Offline-First Revival
taOS, taosmd, VoiceStudio patterns: AI runs on your hardware, offline by default, cloud optional. Privacy-first, self-hosted waves coming back.

### CLI-Native Software
CLI-Anything project signal: making ALL software agent-native. Terminal-first interfaces cho agent consumption.

### Agent Optimization Tools
New category: tools compress outputs/logs before LLM (headroom), optimize harness performance (ECC), manage computational budgets.

### Embodied AI on Consumer Hardware
DuckBuddy pattern: full embodied AI (movement, vision, speech, autonomy) chạy local trên Orange Pi Zero 3W. Not cloud-tethered demos - real autonomous robots.

## 🌟 Tâm điểm Cộng đồng

### Top Engagement
1. **morluto/rea** (323K⭐) - Reverse engineer anything với agents
2. **affaan-m/ECC** (283K⭐) - Agent harness optimization system
3. **NousResearch/hermes-agent** (254K⭐) - Self-growing agent
4. **firecrawl/firecrawl** (192K⭐) - Web data cho agents

### Breakout Projects (high velocity)
- **MadsLorentzen/ai-job-search** (+2232 in 1 day)
- **debpalash/VoiceStudio** (+2082 in 1 day)
- **anomalyco/opencode** (+1414 in 1 day)
- **anthropics/claude-plugins-official** (+1175 in 1 day)
- **stablyai/orca** (+1146 in 1 day)

### Hidden Gems (niche nhưng high impact)
- **jaylfc/taOS** (568⭐) - Self-hosted AI OS với auto-clustering
- **Graphify-Labs/graphify** (128K⭐) - Knowledge graph thay vector store
- **gregordinary/ggml-rocket** (24⭐) - GGML backend cho RK3588
- **happyme531/open_rknpu2_lm_infer** (14⭐) - Open-source LLM inference cho RK3588

### Developer Tooling Focus
Cộng đồng đang build cho developers, not end-users:
- Plugin systems
- Agent harnesses
- Memory infrastructure
- Optimization tools
- Local deployment stacks

Edge AI community (RK3588/Orange Pi) đặc biệt active với clean-room drivers, inference engines, kernel patches. Self-hosted AI infrastructure đang mature nhanh.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*