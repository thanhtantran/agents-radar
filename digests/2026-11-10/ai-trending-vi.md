# Xu hướng AI Mã nguồn mở 2026-11-10

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-11-10 10:06 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 10/11/2026

## 1. Tóm tắt hôm nay

**Agent** đại thắng. Anthropic ship skills repo, Meta open-source design system cho agent, Vercel ship browser automation CLI. Cộng đồng build agent harness, memory layer, framework. Edge AI lặng lẽ nhưng tiến mạnh: RKLLM/RKNPU driver mới, Rust inference engine, NPU matmul kernel.

3 làn sóng song song:
- **Agent infrastructure**: memory, skills, browser control
- **Vertical agent apps**: job search, stock analysis, PPT generation  
- **Edge AI**: NPU unlock RK3588, mainline kernel driver, on-device LLM

## 2. Top Repos Theo Chiều

### 🤖 AI Agents

**anthropics/skills** (+1,038) · Python  
Public skill repo for Claude agents. Anthropic standardize agent capability.

**NousResearch/hermes-agent** (262K⭐) · Python  
Agent grows with you. Multi-agent orchestration.

**Significant-Gravitas/AutoGPT** (188K⭐) · Python  
Vision: accessible AI for everyone. Mission: tools so you focus what matters.

**langchain-ai/langchain** (149K⭐) · Python  
Agent engineering platform. Industry standard.

**Shubhamsaboo/awesome-llm-apps** (144K⭐) · Python  
100+ agent, skills, RAG app. Free, open source.

**affaan-m/ECC** (300K⭐) · JavaScript  
Agent harness perf optimization. Skills, instinct, memory, security for Claude/Codex/Cursor.

**Panniantong/Agent-Reach** (111K⭐) · Python  
Agent eyes: read Twitter, Reddit, YouTube, GitHub, Bilibili, XHS. Zero API fee.

**career-ops-hq/career-ops** (82K⭐) · JavaScript  
AI job search agent. Scan board, score CV, tailor resume, prep interview. Runs local in CLI.

**hugohe3/ppt-master** (75K⭐) · Python  
Doc→PowerPoint. Native shape, transition, animation, chart, audio. Support template.

**HKUDS/nanobot** (50K⭐) · Python  
Lightweight personal agent. Open source.

**zhayujie/CowAgent** (48K⭐) · Python  
Personal AI assistant. Plan task, run tool, self-evolve. Multi-agent, multi-model, one-line install.

**codewhale-hq/Codewhale** (41K⭐) · Rust  
Terminal agent in Rust. Any provider, any model.

**CopilotKit/CopilotKit** (39K⭐) · TypeScript  
Frontend stack for agent & generative UI. React, Angular, mobile, Slack. AG-UI protocol maker.

**can1357/oh-my-pi** (38K⭐) · TypeScript  
Coding agent with IDE wired in. Stencil Labs.

**vercel-labs/agent-browser** (+916) · Rust  
Browser automation CLI for agent.

**milind-soni/OpenMausBot** (+1,587) · TypeScript  
Open-source Grok bot alternative. Virtual machine for bot.

**garrytan/gbrain** (+216) · TypeScript  
Opinionated OpenClaw/Hermes agent brain.

### 🔧 AI Infrastructure

**anthropics/claude-quickstarts** (+551) · Python  
Project collection: build deployable app with Claude API.

**meta/astryx** (+3,278) · TypeScript  
Open-source design system. Fully customizable, agent ready.

**ollama/ollama** (187K⭐) · Go  
Get running with Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma.

**firecrawl/firecrawl** (200K⭐) · TypeScript  
Supercharge agent with web data. Library for superintelligence.

**thedotmack/claude-mem** (116K⭐) · TypeScript  
Persistent context across session. Compress with AI, inject relevant context. Works Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode.

**headroomlabs-ai/headroom** (79K⭐) · Python  
Compress tool output, log, file, RAG chunk before LLM. 20% fewer token for code agent, 60-95% for JSON. Library, proxy, MCP server.

**unclecode/crawl4ai** (87K⭐) · Python  
Official Crawl4AI Cloud: web scraping, extraction, search API for agent. Free key, 1K credit/month. Open source Apache-2.0.

**huggingface/transformers** (169K⭐) · Python  
Model-definition framework. SOTA ML model: text, vision, audio, multimodal. Inference + training.

### 🧠 Models & Training

**google-deepmind/mujoco** (+574) · C++  
Multi-joint dynamics with contact. General purpose physics sim.

### 📦 AI Applications

**sherlock-project/sherlock** (+4,267) · Python  
Hunt social media account by username across network.

**ruvnet/RuView** (+172) · Rust  
WiFi signal→spatial intelligence, vital sign, presence detection. No video pixel.

**ZhuLinsen/daily_stock_analysis** (+506 trending, 69K search) · Python  
LLM多市场股票分析：多源行情、实时新闻、决策看板、推送。零成本定时运行。

**homeassistant-ai/ha-mcp** (+31) · Python  
Configure Home Assistant with Claude, ChatGPT, AI assistant.

**HKUDS/DeepTutor** (58K⭐) · Python  
Lifelong personalized tutoring.

**siyuan-note/siyuan** (47K⭐) · TypeScript  
Privacy-first self-host knowledge workspace. Human + agent collaborate.

**cloudkucooland/OurVillage** (new) · Go  
Small MUD-like environment for LLM play.

### 🔍 RAG & Knowledge

**langgenius/dify** (161K⭐) · Python  
Build agentic workflow, RAG pipeline. Rich model + tool on one workspace. Cloud/VPC/self-host. Prototype→production no rebuild.

**open-webui/open-webui** (158K⭐) · Svelte  
User-friendly AI interface. Support Ollama, OpenAI API.

**infiniflow/ragflow** (94K⭐) · Go  
Agent-native database. RAG engine grew into context infrastructure.

**mem0ai/mem0** (69K⭐) · Python  
Memory layer for agent. Drop-in memory infra. Context persist. Production-ready.

**Mintplex-Labs/anything-llm** (68K⭐) · JavaScript  
Stop rent intelligence. Own it. Everything for powerful local-first agent.

**run-llama/llama_index** (53K⭐) · Python  
Document processing platform for AI.

**jeecgboot/JeecgBoot** (48K⭐) · Java  
AI时代业务系统基座。企业级AI低代码：权限、多租户、工作流、报表、大屏、知识库开箱即用。AI生成业务差异部分。一句话生成完整系统：建表、前后端、菜单权限、BPM、表单、报表全自动。内置AI应用平台（聊天、知识库、流程编排、MCP），兼容主流大模型。

**f/prompts.chat** (177K⭐) · MDX  
fka Awesome ChatGPT Prompts. Share, discover prompt. Self-host for org privacy.

### 🔌 Embedded AI

**happyme531/open_rknpu2_lm_infer** (77⭐) · Rust  
Fully open-source, high-perf LLM inference for RK3588 NPU.

**gregordinary/rockchip-npu-notes** (34⭐) · Shell  
Hardware ref + research note for RK3588 NPU, regcmd interface.

**gregordinary/ggml-rocket** (26⭐) · C++  
Drop-in ggml backend for Rockchip NPU. Offload llama.cpp/whisper.cpp prefill to RK3588 NPU.

**gregordinary/rocket-userspace** (23⭐) · C  
Userspace driver, matmul, on-NPU op library for Rockchip NPU (RK3588 & RK3576) via mainline rocket DRM-accel driver.

**happyme531/rknpu2_matmul_open** (21⭐) · C++  
Matmul + LLM serving kernel for RK3588 RKNPU2. Like FlashInfer but RKNPU2.

**gregordinary/tflite-rocket** (7⭐) · C++  
TFLite external delegate for NPU-accelerated detection on RK3588.

**gregordinary/ort-rocket** (5⭐) · C++  
ONNX Runtime EP for Rockchip NPU (RK3588) via mainline rocket driver. Offload transformer vision encoder (RF-DETR, CLIP/SigLIP, SAM, Depth Anything v2) to NPU.

**gregordinary/patches** (4⭐) · C  
Out-of-tree patch for boot2deb Debian builder. RK3588 mainline rocket NPU driver + HW video transcode patch.

**huonwe/rkllm_openai_like_api** (53⭐) · Python  
Lightweight rkllm server.

**legion1581/go2-npu-unlock** (1⭐) · C  
Enable 6 TOPS NPU on Unitree Go2 with Rockchip rknpu 0.9.8 (LLM-capable). Runtime, no flash.

**rockchip-wardner/wdnai** (new) · Python  
Secondary wrapper for Rockchip RKNN3 LLM. Model-agnostic interface for language I/O.

**anguoyang/awesome-rockchip** (new)  
Curated Rockchip board, OS, RKNN/RKLLM tooling, model, multimedia, dev tool. PR answer 48h.

**2549227674/EdgeForge** (new) · Python  
端侧大模型部署优化：Gemma4 E4B数据治理、QLoRA微调、在线蒸馏、RK3588 NPU (RKLLM W8A8) 部署、Triton/NEON算子开发、NPU性能评测。

**lucasTan-16/rk3588_edge_inspection_agent** (new) · Python  
RK3588端侧多模态巡检agent：YOLOv11n + Qwen2.5-0.5B。视觉-推理-行动闭环。

**2549227674/vlm-sam-industrial-vision-v2** (8⭐) · Python  
MVTec AD缺陷检测：RK3588 C++20四线程流水线（采集、门控、定位、上传），FastAPI后端入库WebSocket推送，Next.js看板。

**jaylfc/taOS** (605⭐) · Python  
Self-host AI agent OS. Memory, chat, agent, file stay on your hardware. Offline by default, cloud by choice. Offline AI memory, multi-framework group chat, web desktop + app store, auto-cluster across consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC).

**jaylfc/taosmd** (84⭐) · Python  
Local-first AI memory. Run offline on 8GB+ RAM (SBC, mini PC, laptop). Zero-loss archive, knowledge graph, hybrid retrieval. Framework-agnostic, no cloud.

**Animan-AI/DuckBuddy** (90⭐) · Rust  
Open-source embodied AI duck robot. Walk, hear, see, life. 让DuckBuddy成为真正生活伙伴鸭：运动、语音、视觉与生命层全部跑机器人身上。Feetech servo + Orange Pi Zero 3W. Built on Pollen Robotics' Microduck (unofficial).

**nouverse/nouride** (96⭐) · TypeScript  
Lightweight zero-bloat multi-agent AI engine in single daemon. Homelab-friendly, built for mini device (RPi, Orange Pi, Geekom, NUC, LXC).

**MichaIng/DietPi** (6,397⭐) · Shell  
Lightweight for SBC.

**RaspAP/raspap-webgui** (5,234⭐) · PHP  
Easiest full-featured wireless router setup for Debian device.

**orangepi-xunlong/orangepi-build** (1,222⭐) · Shell  
Orange Pi build for H2+, H3, H5, H6, H616, RK3328, RK3399, RK3588(s).

**orangepi-xunlong/wiringOP** (537⭐) · C  
wiringPi for Orange Pi.

**art-den/astra_lite** (54⭐) · Rust  
Deepsky astrophotography + live stack on low power PC (RPi/Orange Pi).

**gclawes/rockchip-dra-driver** (5⭐) · Go  
K8s DRA driver for RK3588 feature (GPU, NPU).

## 3. Tín hiệu Xu hướng

### Agent Làm Điều Thật
Không còn demo chatbot. Agent giờ:
- Browse web (agent-browser)
- Search job + tailor CV (career-ops)
- Generate PPT with animation (ppt-master)
- Trade stock (daily_stock_analysis)
- Control home (ha-mcp)

Pattern: agent + tool + memory + multi-step reasoning.

### Memory & Context = Bài Toán Trung Tâm
- claude-mem: persistent context cross session
- mem0: memory layer for agent
- headroom: compress context 60-95%
- taosmd: local-first offline memory

Cộng đồng solve: LLM context expensive, ephemeral. Need: cheap, persistent, relevant retrieval.

### Agent Harness = New Stack Layer
- ECC: perf optimization system for Claude Code/Codex/Cursor
- hermes-agent: agent grow with you
- CowAgent: plan + run + self-evolve

Mô hình: agent không phải app, là platform. Need: skill management, memory, multi-agent orchestration.

### Edge AI Bùng Nổ Âm Thầm
RK3588 NPU community ship:
- **Mainline kernel driver** (rocket DRM-accel)
- **Userspace matmul kernel** (RKNPU2 FlashInfer)
- **ONNX Runtime + TFLite delegate**
- **Drop-in ggml backend** cho llama.cpp/whisper.cpp
- **Rust inference engine** fully open-source

Breakthrough: không còn phụ thuộc Rockchip closed-source RKLLM. Community reverse-engineer NPU, write open driver + kernel.

Embedded AI giờ:
- Run Qwen2.5-0.5B on Orange Pi
- YOLOv11n + LLM multi-modal agent on edge
- 6 TOPS NPU on $500 robot dog

### Design System Cho Agent
meta/astryx: first design system "agent ready". Signal: UI không còn design cho human, design cho agent consume.

### Local-First AI
Pattern lặp lại:
- taOS: self-host agent OS
- taosmd: offline memory
- nouride: homelab multi-agent daemon
- anything-llm: local-first agent
- ollama: run model local

Trend: không tin cloud, run everything on hardware you own.

### Browser Automation = Agent Eyes
- agent-browser (Vercel)
- Agent-Reach (read social media)
- firecrawl (web data for agent)

Agent cần interact với web như human. Browser automation = critical infra.

### MCP Protocol
homeassistant-ai/ha-mcp: configure Home Assistant with Claude/ChatGPT via MCP.

MCP (Model Context Protocol) emerging standard cho agent tool call.

## 4. Tâm Điểm Cộng Đồng

### Anthropic Move Nhanh
- **anthropics/skills**: public skill repo, ship trong 24h
- **anthropics/claude-quickstarts**: quickstart project

Strategy: commoditize agent capability, let community build.

### Edge AI Underground Movement
`gregordinary`, `happyme531` lead RK3588 NPU reverse-engineer. Ship:
- Mainline kernel driver (rocket)
- Userspace library
- ONNX/TFLite delegate
- ggml backend
- Rust inference engine

Impact: RK3588 từ closed-source toy thành serious edge AI platform. Chinese homelab community (Orange Pi owner) có path run LLM local không phụ thuộc Rockchip.

### Agent Harness War
- ECC (300K⭐): perf optimization cho Claude Code
- claude-mem (116K⭐): persistent memory
- career-ops (82K⭐): vertical agent app

Competition: ai làm layer giữa LLM provider (Anthropic/OpenAI) và end user. Winner own agent distribution.

### Vertical Agent App Explode
Không còn build general chatbot. Build:
- Job search agent
- Stock analysis agent
- PPT generation agent
- Home automation agent

Pattern: agent = vertical SaaS killer. One agent replace entire category.

### Open-Source Design System
Meta ship astryx: agent-ready design system. Bold move: design system không phải cho designer, cho agent.

Implication: UI component có semantic meaning agent hiểu. Agent build UI từ spec, không cần human designer.

---

**Kết luận**: Agent từ hype thành production reality. Infra mature (memory, tool, harness), vertical app ship, edge AI democratize. Next 6 month: agent replace SaaS category by category.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*