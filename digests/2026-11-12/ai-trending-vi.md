# Xu hướng AI Mã nguồn mở 2026-11-12

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-11-12 02:00 UTC

---

# 📊 Báo cáo xu hướng AI mã nguồn mở — 2026-11-12

## 🎯 Tóm tắt hôm nay

Edge AI và AI agents thống trị. NPU edge deployment (RK3588) đang hot. Agent frameworks nổi bật: multi-agent orchestration, browser automation, code generation. RAG + knowledge graph pattern tiếp tục mạnh. Open-source personal finance, home automation với AI. Design systems và security tools từ big tech (Meta, OpenAI, Google).

---

## 📂 Top repos theo chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **shadcn/improve** (+361) — Audit codebase với capable model, viết plans cho cheaper models execute
- **addyosmani/agent-skills** (+787) — Production-grade engineering skills cho AI coding agents
- **vercel-labs/agent-browser** (+708, Rust) — Browser automation CLI cho AI agents

**Search 7 ngày:**
- **NousResearch/hermes-agent** (262k ⭐, Python) — Agent grows với user
- **career-ops-hq/career-ops** (82k ⭐, JavaScript) — AI job search agent: scan boards, score jobs, tailor CV/cover, interview prep, tracker
- **zhayujie/CowAgent** (47k ⭐, Python) — Personal AI assistant: plans tasks, runs tools, self-evolves với memory/knowledge
- **codewhale-hq/Codewhale** (41k ⭐, Rust) — Terminal agent, any provider/model
- **can1357/oh-my-pi** (38k ⭐, TypeScript) — Coding agent với IDE wired in

### 🔧 AI Infrastructure

**Trending hôm nay:**
- **openai/codex-security** (+52, TypeScript) — Codex Security CLI/SDK cho security vulnerabilities
- **homeassistant-ai/ha-mcp** (+645, Python) — Configure Home Assistant với Claude, ChatGPT

**Search 7 ngày:**
- **affaan-m/ECC** (301k ⭐, JavaScript) — Agent harness performance optimization: skills, instincts, memory, security
- **firecrawl/firecrawl** (200k ⭐, TypeScript) — Supercharge agents với web data
- **Panniantong/Agent-Reach** (111k ⭐, Python) — Give agents eyes: read/search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- **thedotmack/claude-mem** (116k ⭐, TypeScript) — Persistent context cross sessions cho mọi agent
- **unclecode/crawl4ai** (87k ⭐, Python) — Web scraping/extraction API cho AI agents, self-host hoặc cloud
- **headroomlabs-ai/headroom** (79k ⭐, Python) — Compress tool outputs/logs/RAG chunks trước LLM: -20% tokens coding, -60-95% JSON
- **JuliusBrussee/caveman** (119k ⭐, Go) — Cut 65% tokens bằng caveman talk

### 🧠 Models & Training

**Search 7 ngày:**
- **ollama/ollama** (186k ⭐, Go) — Run Kimi, GLM, MiniMax, DeepSeek, Qwen, Gemma local
- **huggingface/transformers** (168k ⭐, Python) — State-of-the-art ML models: text, vision, audio, multimodal

### 📦 AI Applications

**Trending hôm nay:**
- **meta/astryx** (+2776, TypeScript) — Open-source design system, fully customizable, agent ready
- **ZhuLinsen/daily_stock_analysis** (+278, Python) — LLM multi-market stock analysis: multi-source data, real-time news, dashboard, auto push
- **GoogleChrome/modern-web-guidance-src** (+159, TypeScript)
- **we-promise/sure** (+1078, Ruby) — Personal finance app for everyone

**Search 7 ngày:**
- **hugohe3/ppt-master** (75k ⭐, Python) — AI turns docs/topics thành native PowerPoint: shapes, transitions, animations, charts, audio
- **HKUDS/nanobot** (50k ⭐, Python) — Lightweight open-source personal agent
- **siyuan-note/siyuan** (47k ⭐, TypeScript) — Privacy-first self-hosted knowledge workspace: humans + AI agents collaborate
- **harry0703/MoneyPrinterTurbo** (142k ⭐, Python) — Generate HD short videos từ topic/keyword với AI workflow
- **browser-use/browser-use** (120k ⭐, Python) — AI browser agents library + Browser Use Cloud

### 🔍 RAG & Knowledge

**Search 7 ngày:**
- **open-webui/open-webui** (158k ⭐, Svelte) — User-friendly AI interface (Ollama, OpenAI API)
- **langchain-ai/langchain** (149k ⭐, Python) — Agent engineering platform
- **Graphify-Labs/graphify** (146k ⭐, Python) — Turn codebase thành queryable knowledge graph: AST parsing, no vector store
- **Shubhamsaboo/awesome-llm-apps** (144k ⭐, Python) — 100+ AI Agents, skills, RAG apps
- **infiniflow/ragflow** (94k ⭐, Go) — Agent-native database: RAG engine thành context infrastructure
- **datawhalechina/hello-agents** (86k ⭐, Python) — 从零开始构建智能体 tutorial
- **mem0ai/mem0** (68k ⭐, Python) — Memory layer cho AI agents: drop-in infrastructure, persistent context
- **langgenius/dify** (160k ⭐, Python) — Build agentic workflows, RAG pipelines: cloud/VPC/self-hosted

### 🔌 Embedded AI (NPU/Edge)

**Search rkllm:**
- **2549227674/vlm-sam-industrial-vision-v2** (8 ⭐, Python) — MVTec AD defect detection: RK3588 C++20 4-thread pipeline, FastAPI backend, Next.js dashboard
- **2549227674/EdgeForge** (0 ⭐, Python) — Edge LLM deployment: Gemma4 E4B, QLoRA fine-tuning, RK3588 NPU (RKLLM W8A8), Triton/NEON ops
- **lucasTan-16/rk3588_edge_inspection_agent** (0 ⭐, Python) — RK3588 multimodal inspection agent: YOLOv11n + Qwen2.5-0.5B, vision-reasoning-action loop
- **DMRedstone/rkllm-runtime** (0 ⭐, Python) — rknn-1.3.1 wrapper
- **rockchip-wardner/wdnai** (0 ⭐, Python) — Model-agnostic interface cho Rockchip RKNN3 LLMs
- **anguoyang/awesome-rockchip** (0 ⭐) — Curated list: Rockchip boards, OS, RKNN/RKLLM tooling, models

**Search orangepi:**
- **jaylfc/taOS** (605 ⭐, Python) — Self-hosted AI agent OS: memory, chat, agents, files on your hardware. Offline AI memory, multi-framework group chat, web desktop, auto-cluster (Orange/Raspberry Pi, Mac mini, gaming PC)
- **nouverse/nouride** (100 ⭐, TypeScript) — Zero-bloat multi-agent AI engine in single daemon: homelab-friendly, mini devices (Pi, Orange Pi, NUC)
- **Animan-AI/DuckBuddy** (92 ⭐, Rust) — Embodied AI robot duck: walks, hears, sees. Feetech servos + Orange Pi Zero 3W
- **jaylfc/taosmd** (84 ⭐, Python) — Local-first AI memory: offline on 8GB+ RAM, verbatim archive, knowledge graph, hybrid retrieval
- **MichaIng/DietPi** (6.4k ⭐, Shell) — Lightweight justice cho single-board computers
- **RaspAP/raspap-webgui** (5.2k ⭐, PHP) — Wireless router setup cho Debian-based devices
- **orangepi-xunlong/orangepi-build** (1.2k ⭐, Shell) — Orange Pi build: H2+, H3, H5, H6, H616, RK3328, RK3399, RK3588(s)

**Search rknpu:**
- **gregordinary/rockchip-npu-notes** (35 ⭐, Shell) — RK3588 NPU hardware reference, regcmd interface research
- **gregordinary/ggml-rocket** (26 ⭐, C++) — Drop-in ggml backend: offload llama.cpp/whisper.cpp prefill to RK3588 NPU
- **gregordinary/rocket-userspace** (24 ⭐, C) — Userspace driver, matmul, on-NPU op library cho RK3588/RK3576 via mainline rocket DRM-accel
- **gregordinary/tflite-rocket** (7 ⭐, C++) — TensorFlow Lite delegate cho NPU-accelerated detection on RK3588
- **gregordinary/ort-rocket** (5 ⭐, C++) — ONNX Runtime EP cho RK3588 NPU: offload transformer vision encoders (RF-DETR, CLIP/SigLIP, SAM, Depth Anything v2)

---

## 🔥 Tín hiệu xu hướng

1. **Edge AI deployment boom**: RK3588 NPU ecosystem chín muồi — toolchains (ggml-rocket, ort-rocket, tflite-rocket), userspace drivers, production use cases (industrial vision, inspection agents)

2. **Agent harness optimization**: Persistent memory (claude-mem, mem0, taosmd), token compression (headroom, caveman), production skills (agent-skills, ECC)

3. **Multi-agent orchestration**: Personal agent OS (taOS, nanobot, hermes-agent), lightweight multi-agent engines (nouride, CowAgent)

4. **Browser automation cho agents**: agent-browser (Vercel), browser-use — web interaction capability critical

5. **Knowledge graph > vector store**: Graphify deterministic AST parsing pattern nổi lên

6. **Self-hosted AI infrastructure**: Privacy-first, offline-capable (taOS, siyuan, open-webui) — phản ứng cloud privacy concerns

7. **Vertical AI applications**: Job search (career-ops), stock analysis (daily_stock_analysis), PPT generation (ppt-master), personal finance (sure)

8. **Home automation + AI**: ha-mcp cho Home Assistant with Claude/ChatGPT

9. **Security-first coding**: codex-security từ OpenAI — security integrated vào dev workflow

10. **Embodied AI nhỏ gọn**: DuckBuddy robot duck on Orange Pi — embodied AI democratization

---

## 🎪 Tâm điểm cộng đồng

**Big tech releases:**
- Meta: astryx design system (+2776)
- OpenAI: codex-security CLI/SDK (+52)
- Google Chrome: modern-web-guidance-src (+159)
- Vercel Labs: agent-browser (+708)

**Community momentum:**
- **shadcn/improve** (+361): Two-tier agent pattern (expensive audit → cheap execution) resonates
- **addyosmani/agent-skills** (+787): Production engineering cho agents — gap đang được fill
- **we-promise/sure** (+1078): Personal finance by everyone for everyone — community-driven finance app
- **homeassistant-ai/ha-mcp** (+645): Home Assistant + Claude/ChatGPT — smart home AI integration

**Edge AI grassroots:**
- RK3588 NPU ecosystem grassroots development mạnh (gregordinary repos)
- Orange Pi AI OS projects (taOS, nouride, DuckBuddy) — self-hosted AI on cheap hardware movement

**Established growth:**
- RAG frameworks (langchain 149k, infiniflow/ragflow 94k)
- Open-source AI interfaces (open-webui 158k)
- Agent platforms (AutoGPT 187k, dify 160k)
- Knowledge management (siyuan 47k với AI agent collaboration)

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*