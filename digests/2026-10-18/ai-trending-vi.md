# Xu hướng AI Mã nguồn mở 2026-10-18

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-18 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn Mở - 18/10/2026

## 📊 Tóm tắt hôm nay

Thị trường bùng nổ với **coding agents** và **agent infrastructure**. Claude Code ecosystem tạo sóng: plugins chính thức từ Anthropic, job search framework, agent harness. Embedded AI trên RK3588 NPU đang hình thành hệ sinh thái mã nguồn mở với mainline drivers. RAG & knowledge graph tools phục vụ agents. Self-hosted, offline-first, và edge deployment là chủ đề xuyên suốt.

---

## 🤖 AI Agents

**Top Repos:**

- **anthropics/claude-code** (+179) - Agent terminal chính chủ từ Anthropic, xử lý git workflows qua natural language
- **MadsLorentzen/ai-job-search** (+1,365) - Job search agent: đánh giá postings, tailor CV, viết cover letter, prep interviews
- **anomalyco/opencode** (+438) - Open-source coding agent
- **stablyai/orca** (+830) - Multi-agent fleet manager (Grok Bot, Claude Code), cross-platform desktop/mobile/remote
- **ruvnet/ruflo** (+420) - Agent harness với multi-player swarms, adaptive memory, self-learning, federation
- **NousResearch/hermes-agent** (254K+ stars) - Agent learns và grows với user
- **CherryHQ/cherry-studio** (52K+ stars) - AI productivity studio: smart chat, autonomous agents, 300+ assistants
- **HKUDS/nanobot** (49K+ stars) - Ultra-lightweight Python agent framework: WebUI, tools, memory, MCP, multi-agent workflows
- **zhayujie/CowAgent** (47K+ stars) - Personal AI assistant, plans tasks, runs tools, self-evolves. Multi-agent, multi-model, multi-channel
- **Panniantong/Agent-Reach** (98K+ stars) - Agent có mắt: scrape Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu

**Career & Productivity Agents:**

- **career-ops-hq/career-ops** (75K+ stars) - Job finder: scan boards, score jobs, tailor resume, interview prep, tracker
- **hugohe3/ppt-master** (63K+ stars) - Tạo PowerPoint deck native từ docs/topics: shapes, transitions, animations, charts, audio narration
- **ZhuLinsen/daily_stock_analysis** (66K+ stars) - LLM stock analysis: multi-market data, real-time news, decision dashboard, automated alerts

**Tín hiệu:** Agents chuyển từ demo sang tools production-ready. Job search, career ops, và stock analysis là các vertical đầu tiên được automate. Multi-agent coordination (Orca, Ruflo) là layer mới.

---

## 🔧 AI Infrastructure

**Top Repos:**

- **anthropics/claude-plugins-official** (+1,397) - Plugin directory chính chủ từ Anthropic cho Claude Code
- **affaan-m/ECC** (+1,145 trending, 282K+ stars) - Agent harness optimization: skills, instincts, memory, security. Đa nền tảng (Claude Code, Codex, Opencode, Cursor)
- **HKUDS/CLI-Anything** (+574) - Biến mọi software thành agent-native qua CLI
- **akitaonrails/ai-memory** (+178, Rust) - Long-term memory cho agent coding CLIs, handoff giữa các vendor
- **android/skills** (+355, Kotlin) - Android skills library
- **thedotmack/claude-mem** (101K+ stars, TypeScript) - Persistent context across sessions cho mọi agent: capture, compress, inject context
- **mem0ai/mem0** (67K+ stars) - Memory layer infrastructure cho AI agents: drop-in, production-ready
- **headroomlabs-ai/headroom** (75K+ stars) - Nén tool outputs, logs, files, RAG chunks trước khi tới LLM: 20% fewer tokens coding agents, 60-95% fewer JSON

**CLI & Terminal:**

- **morluto/rea** (308K+ stars, TypeScript) - Reverse engineer anything với agents: từ app behavior xuống native binaries

**Tín hiệu:** Infrastructure layer đang consolidate. Memory (claude-mem, mem0, ai-memory) và compression (headroom) trở thành primitives. Skills/plugins standardization bắt đầu (anthropics plugins, android/skills, K-Dense-AI/scientific-agent-skills).

---

## 🧠 Models & Training

**Top Repos:**

- **ollama/ollama** (183K+ stars) - Local model runtime: Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma
- **huggingface/transformers** (167K+ stars) - Model-definition framework cho SOTA ML: text, vision, audio, multimodal

**Tín hiệu:** Ổn định. Không có breakthrough mới hôm nay.

---

## 📦 AI Applications

**Top Repos:**

- **K-Dense-AI/scientific-agent-skills** (+878) - Biến agent thành AI Scientist: 177 validated skills + 100+ scientific databases (biology, chemistry, medicine, drug discovery). Compatible với Cursor, Claude Code, Codex, Pi
- **debpalash/VoiceStudio** (+2,125) - Open-source, fully-local voice cloning, voice design, video dubbing, dictation, transcription, audiobook creation. 646 languages
- **siyuan-note/siyuan** (46K+ stars) - Self-hosted knowledge workspace: humans + AI agents cùng làm việc
- **langgenius/dify** (158K+ stars) - Build agentic workflows, RAG pipelines: rich AI model & tool support, cloud/VPC/self-hosted

**Tín hiệu:** Vertical applications cho domains cụ thể (science, voice, notes, workflows).

---

## 🔍 RAG & Knowledge

**Top Repos:**

- **xerj-org/xerj** (+1,160, Rust) - Autoindex cho agents: index code, docs, logs, PDFs cho search, RAG, security audits, agent memory. 40x fewer tokens so với grep. Có thể thay ElasticSearch, save 10x infra costs
- **Graphify-Labs/graphify** (127K+ stars) - Biến codebase (docs, SQL schemas, configs, PDFs) thành queryable knowledge graph. `/graphify` skill cho Claude Code, Cursor, Codex, Gemini CLI. Local deterministic AST parsing, no vector store
- **open-webui/open-webui** (156K+ stars) - User-friendly AI interface: Ollama, OpenAI API
- **langchain-ai/langchain** (148K+ stars) - Agent engineering platform
- **Shubhamsaboo/awesome-llm-apps** (142K+ stars) - 100+ AI Agents, Agent Skills, RAG Apps
- **infiniflow/ragflow** (92K+ stars) - RAG engine: RAG + Agent capabilities, context layer cho LLMs
- **unclecode/crawl4ai** (85K+ stars) - Open-source web crawler & scraper cho LLMs/agents: any website → clean, LLM-ready Markdown
- **datawhalechina/hello-agents** (83K+ stars) - 《从零开始构建智能体》tutorial

**Tín hiệu:** Knowledge graph (Graphify) thay vector stores trong use cases nhất định. Autoindexing (xerj) giảm token waste. Crawlers (crawl4ai, firecrawl) trở thành commodity. RAG frameworks mature (ragflow, langchain).

---

## 🔌 Embedded AI

### RK3588 NPU Ecosystem

**Mainline Drivers & Userspace:**

- **gregordinary/ggml-rocket** (+24, C++) - Drop-in ggml backend cho Rockchip NPUs: offload llama.cpp/whisper.cpp prefill lên RK3588 NPU
- **gregordinary/rocket-userspace** (+20, C) - Userspace driver, matmul, on-NPU op library cho Rockchip NPUs qua mainline rocket DRM-accel driver
- **gregordinary/ort-rocket** (+3, C++) - ONNX Runtime execution provider cho RK3588 NPU: offload transformer vision encoders (RF-DETR, CLIP/SigLIP, SAM, Depth Anything v2) lên NPU
- **gregordinary/rockchip-npu-notes** (+23, Shell) - Hardware reference & research notes cho RK3588 NPU, regcmd interface
- **lurenJBD/rknpu-mainline-dkms** (+7, Makefile) - Debian DKMS packaging cho mainline Rockchip RK3588 RKNPU driver

**Inference Engines:**

- **happyme531/open_rknpu2_lm_infer** (+13, Rust) - Fully open-source, high-performance LLM inference engine cho RK3588 NPU
- **happyme531/rknpu2_matmul_open** (+3, C++) - Matrix multiplication & quantized LLM kernels cho RK3588 RKNPU2
- **oRKLLM/ork-driver** (+7, C) - Clean-room userspace matmul library cho Rockchip NPU

**Vision-Language Models:**

- **Leon6225/InternVL3.5-4B-NPU** (+5, C++) - InternVL3.5-4B cho RK3588 NPU: multimodal AI, vision + language
- **tristanpenman/vlm-rknn** (+1, C++) - Starter CMake project cho vision-language models trên Rockchip qua RKNN/RKLLM
- **ambagesthickskin162/Qwen3.5-4B-NPU** (+1, C++) - Qwen3.5-4B deploy trên NPU hardware

**RKLLM Wrappers & Control:**

- **kyshipit/eai-rk3588** (+4, C) - Extensible RK3588 edge inference platform: multi-threaded pipeline, RKNN adapters, RKLLM chat, coordinator-driven activation
- **Jack-GPU/edge-llm-control-plane** (Python) - RK3588S edge verifiable control agent (RKLLM + rules + schema)
- **QQD23/rkllm-long-context-gqa** (C++) - Experimental GQA/PV optimization cho long-context RKLLM inference
- **rockchip-wardner/wdnai** - Secondary wrapper cho Rockchip RKNN3 LLMs
- **DMRedstone/rkllm-runtime** (Python) - Testing, local chat, API, connector

**Monitoring & Utilities:**

- **isac322/rkmon** (+13, Go) - Real-time hardware monitor TUI cho RK3588 SBCs: như htop nhưng cho GPU, NPU, VPU, RGA, thermal zones
- **YeWenxuan64/rktop** (+10, Shell) - Lightweight Bash script: real-time monitoring RK3588 CPU, NPU, GPU, RGA trong terminal

### Orange Pi

**OS & Infrastructure:**

- **MichaIng/DietPi** (6.3K+ stars, Shell) - Lightweight justice cho single-board computer
- **jaylfc/taOS** (+565, Python) - Self-hosted AI agent OS: memory, chat, agents, files stay offline trên hardware you own (Orange/Raspberry Pi, Mac mini, gaming PC). Offline AI memory (taOSmd), self-hosted multi-framework group chat, web desktop + app store, auto-clustering
- **jaylfc/taosmd** (+81, Python) - Local-first AI memory: runs offline trên any machine 8GB+ RAM. Zero-loss verbatim archive, knowledge graph, hybrid retrieval. Framework-agnostic, no cloud

**Hardware Support:**

- **ut-slayer/orangepi-4a-mainline** (+15) - Mainline Linux 6.18 support cho Orange Pi 4A (Allwinner T527/A523): HDMI KMS, Mali-G57 Panfrost, WiFi, HDMI audio, ethernet, USB, cpufreq/thermal. 106-patch series
- **ptitSeb/gl4es** (863 stars, C) - OpenGL 2.1/1.5 → GL ES 2.0/1.1 translation: support Pandora, ODroid, OrangePI, CHIP, Raspberry PI, Android, Emscripten, AmigaOS4
- **art-den/astra_lite** (+54, Rust) - Deepsky astrophotography & live stacking trên low power PCs (Raspberry Pi, Orange Pi)

**Robotics:**

- **Artod/robot-pepin** (+6, Python) - Pepin: home robot trên IKEA cart (differential drive, 6-DoF arm, 360° lidar, ToF, cameras). Laptop brain over wifi, Orange Pi relay
- **dustbowlair424/NavCore-Pixhawk** (+7, Python) - Real-time GPS-denied INS navigation cho drones: Pixhawk Cube Orange + Raspberry Pi 4 via MAVLink

**Tín hiệu:** Embedded AI đang mature. RK3588 NPU có ecosystem mã nguồn mở đang phát triển: mainline drivers (rocket), userspace libraries (ggml-rocket, rocket-userspace, ork-driver), inference engines (open_rknpu2_lm_infer), ONNX Runtime EP (ort-rocket). Monitoring tools (rkmon, rktop) xuất hiện. Orange Pi + Raspberry Pi trở thành hardware chính cho self-hosted, offline-first AI (taOS, taosmd). Astrophotography (astra_lite), robotics (robot-pepin), drone navigation (NavCore-Pixhawk) là use cases edge AI.

---

## 🔥 Phân tích Tín hiệu Xu hướng

### 1. **Coding Agents Đi Vào Production**

Anthropic ra mắt **claude-code** chính thức và **claude-plugins-official**. Job search (MadsLorentzen/ai-job-search, career-ops-hq/career-ops), stock analysis (ZhuLinsen/daily_stock_analysis), và PPT generation (hugohe3/ppt-master) là các vertical đầu tiên được agents automate end-to-end.

### 2. **Agent Infrastructure Standardization**

Memory (claude-mem, mem0, ai-memory), compression (headroom), và skills/plugins (anthropics plugins, android/skills, K-Dense-AI/scientific-agent-skills) đang trở thành foundational layers. Multi-agent coordination (Orca, Ruflo) là layer mới cho swarms.

### 3. **Knowledge Graph Thay Vector Stores**

Graphify (127K+ stars) và xerj (autoindex) cho thấy knowledge graphs + deterministic AST parsing đang thay vector stores trong coding & documentation use cases. 40x fewer tokens, no embedding drift.

### 4. **Embedded AI Ecosystem Mature**

RK3588 NPU có mainline Linux support (rocket driver), userspace libraries (ggml-rocket, rocket-userspace, ork-driver), inference engines (open_rknpu2_lm_infer), ONNX Runtime EP (ort-rocket). Monitoring tools (rkmon, rktop) xuất hiện. Orange Pi + Raspberry Pi là hardware chính cho self-hosted, offline-first AI (taOS, taosmd).

### 5. **Offline-First & Self-Hosted Dominance**

VoiceStudio (fully-local voice cloning), taOS (offline AI memory), mem0 (self-hosted memory), siyuan (self-hosted knowledge workspace), dify (cloud/VPC/self-hosted), ragflow (self-hosted RAG). Xu hướng: privacy, ownership, no cloud vendor lock-in.

### 6. **LLM Token Efficiency**

headroom (20% fewer tokens coding agents, 60-95% fewer JSON), xerj (40x fewer tokens vs grep). Token là cost center, compression & autoindexing là cơ hội optimize.

### 7. **CLI & Terminal Agents**

claude-code, CLI-Anything, nanobot, CowAgent. Terminal-native agents cho developers đang trở thành interface chính, không phải web UIs.

---

## 🎯 Tâm điểm Cộng đồng

### Top 5 Repos Được Chú ý Nhất (hôm nay)

1. **morluto/rea** (308K+ stars) - Reverse engineer anything với agents
2. **affaan-m/ECC** (282K+ stars) - Agent harness optimization system
3. **NousResearch/hermes-agent** (254K+ stars) - Agent grows với user
4. **firecrawl/firecrawl** (192K+ stars) - Supercharge agents với web data
5. **ollama/ollama** (183K+ stars) - Local model runtime

### Trending Hôm Nay (theo stars gain)

1. **debpalash/VoiceStudio** (+2,125) - Local voice cloning, video dubbing, 646 languages
2. **anthropics/claude-plugins-official** (+1,397) - Anthropic plugin directory
3. **MadsLorentzen/ai-job-search** (+1,365) - AI job search framework
4. **xerj-org/xerj** (+1,160) - Autoindex cho agents, 40x fewer tokens vs grep
5. **affaan-m/ECC** (+1,145) - Agent harness

### Community Momentum

- **Claude Code ecosystem** đang explode: chính chủ từ Anthropic (plugins, terminal agent), third-party tools (job search, memory, harness)
- **RK3588 NPU open-source movement** đang build từ zero: mainline drivers, inference engines, monitoring tools
- **Self-hosted AI** đang trở thành norm: voice (VoiceStudio), memory (taOS), knowledge (siyuan), RAG (ragflow)

---

**Kết luận:** Ngày 18/10/2026 là ngày của **coding agents**, **agent infrastructure**, và **embedded AI**. Anthropic lead với Claude Code ecosystem. Community respond với open-source alternatives (opencode, orca, ruflo) và infrastructure layers (memory, compression, skills). RK3588 NPU open-source ecosystem đang form. Self-hosted, offline-first là dominant theme. Token efficiency (compression, autoindexing) trở thành optimization frontier.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*