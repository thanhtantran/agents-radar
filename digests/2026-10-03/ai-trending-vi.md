# Xu hướng AI Mã nguồn mở 2026-10-03

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-03 02:00 UTC

---

# 📊 Báo cáo xu hướng AI mã nguồn mở - 2026-10-03

## 🎯 Tóm tắt hôm nay

Làn sóng **agent optimization** thống trị GitHub trending. Cộng đồng đang chạy đua giảm token cost, tối ưu context window, và xây agent frameworks tự học. Embedded AI trên NPU RK3588 bùng nổ với kernel mainline support.

**3 tín hiệu lớn:**
- Skills framework cho agents (4 repos trending top 10)
- Token compression techniques (caveman-style prompts, context optimization)
- RK3588 NPU mainline driver ecosystem đã sẵn sàng production

---

## 🏆 Top repos theo chiều

### 🤖 **AI Agents**

**Agent frameworks & orchestration:**
- **NousResearch/hermes-agent** ⭐ 250K - "The agent that grows with you"
- **zhayujie/CowAgent** ⭐ 47K - Personal AI với self-evolution, multi-agent workflows
- **HKUDS/nanobot** ⭐ 48K - Ultra-lightweight Python agent framework, WebUI + MCP
- **career-ops-hq/career-ops** ⭐ 73K - AI job search agent: scan, score, tailor CV, track applications

**Agent skills & capabilities:**
- **obra/superpowers** ⭐ 556↑ - Agentic skills framework that works
- **mattpocock/skills** ⭐ 955↑ - Skills từ `.agents` directory của Matt Pocock
- **google/skills** ⭐ 39↑ - Agent skills cho Google products
- **coreyhaines31/marketingskills** ⭐ 140↑ - CRO, copywriting, SEO cho agents

**Multi-agent systems:**
- **mvschwarz/openrig** ⭐ 683↑ - Build agent networks từ Claude Code, Codex, Pi - persistent teams với roles + shared context

### 🔧 **AI Infrastructure**

**Agent harness optimization:**
- **affaan-m/ECC** ⭐ 271K - Performance optimization cho Claude Code, Codex, Cursor: skills, instincts, memory, security
- **shareAI-lab/learn-claude-code** ⭐ 77K - Nano claude code-like agent harness, built 0→1

**Token & context optimization:**
- **JuliusBrussee/caveman** ⭐ 209↑ (Go) - 65% token cut bằng caveman-style prompts
- **DietrichGebert/ponytail** ⭐ 151K / 1435↑ - Agent thinks like lazy senior dev: best code = no code
- **headroomlabs-ai/headroom** ⭐ 74K - Compress tool outputs trước khi vào LLM: 20% fewer tokens (coding), 60-95% (JSON)
- **mksglu/context-mode** ⭐ 282↑ - Context window optimization: sandbox tool output (98% reduction), session memory, routing qua 17 platforms

**Memory & retrieval:**
- **thedotmack/claude-mem** ⭐ 95K - Persistent context across sessions cho agents
- **mem0ai/mem0** ⭐ 66K - Memory Layer for AI Agents, drop-in infrastructure

**Agent security & runtime:**
- **NVIDIA/OpenShell** ⭐ 594↑ (Rust) - Safe, private runtime cho autonomous agents

**Web & data access:**
- **Panniantong/Agent-Reach** ⭐ 696↑ - Agent có eyes để xem internet: read/search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu - 0 API fees
- **firecrawl/firecrawl** ⭐ 187K - Web data API: search, scrape, access multiple sources cho agents
- **colbymchenry/codegraph** ⭐ 98↑ (C) - Pre-indexed code knowledge graph, auto sync on changes - fewer tokens, 100% local

**CLI & tooling:**
- **pablostanley/yoinks** ⭐ 623↑ - Yoink video từ terminal, no ads
- **cursor/plugins** ⭐ 163↑ - Cursor plugin spec + official plugins

### 🧠 **Models & Training**

**LLM runtimes:**
- **ollama/ollama** ⭐ 182K - Run Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma locally
- **huggingface/transformers** ⭐ 166K - State-of-the-art ML models: text, vision, audio, multimodal

**Education:**
- **bojieli/ai-agent-book** ⭐ 52K - 《深入理解 AI Agent：设计原理与工程实践》toàn bộ chính văn + code
- **datawhalechina/hello-agents** ⭐ 81K - 从零开始构建智能体

### 📦 **AI Applications**

**Productivity:**
- **CherryHQ/cherry-studio** ⭐ 52K - AI productivity studio: smart chat, autonomous agents, 300+ assistants
- **hugohe3/ppt-master** ⭐ 57K - AI turns docs/topics → native PowerPoint với shapes, transitions, animations, charts, audio narration
- **ZhuLinsen/daily_stock_analysis** ⭐ 65K - LLM-driven multi-market stock analysis: multi-source data, real-time news, decision dashboard, auto push

**Design:**
- **pbakaus/impeccable** ⭐ 722↑ - Design language cho AI harness

**Development:**
- **thedaviddias/Front-End-Checklist** ⭐ 74K - Essential checklist cho modern web development, for humans + AI agents

**Chatbots & UI:**
- **Significant-Gravitas/AutoGPT** ⭐ 187K - Accessible AI for everyone
- **open-webui/open-webui** ⭐ 153K - User-friendly AI Interface (Ollama, OpenAI API support)
- **Mintplex-Labs/anything-llm** ⭐ 66K - Local-first agent experience, own your intelligence

### 🔍 **RAG & Knowledge**

**RAG engines:**
- **infiniflow/ragflow** ⭐ 91K (Go) - Leading RAG engine, fuses cutting-edge RAG với Agent capabilities
- **Shubhamsaboo/awesome-llm-apps** ⭐ 140K - 100+ AI Agents, Agent Skills, RAG Apps

**Document processing & indexing:**
- **run-llama/llama_index** ⭐ 52K - Document processing platform for AI

**Vector databases:**
- **milvus-io/milvus** ⭐ 46K (Go) - High-performance, cloud-native vector DB cho scalable vector ANN search

**Frameworks:**
- **langchain-ai/langchain** ⭐ 147K - Agent engineering platform
- **langchain-ai/langgraph** ⭐ 42K - Build resilient agents

**Platforms:**
- **langgenius/dify** ⭐ 157K - Build Agentic workflows, RAG pipelines: deploy cloud/VPC/self-hosted

### 🔌 **Embedded AI**

**NPU frameworks & drivers (RK3588):**
- **jaylfc/taOS** ⭐ 553 - Self-hosted AI agent OS: memory, chat, agents, files trên hardware bạn sở hữu. Offline AI memory (taOSmd), auto-clustering qua Orange/Raspberry Pi, Mac mini, gaming PC
- **gregordinary/ggml-rocket** ⭐ 21 (C++) - Drop-in ggml backend cho Rockchip NPU: offload llama.cpp/whisper.cpp prefill tới RK3588 NPU
- **gregordinary/rocket-userspace** ⭐ 17 (C) - Userspace driver, matmul, on-NPU op library cho RK3588 qua mainline rocket DRM-accel driver
- **gregordinary/rockchip-npu-notes** ⭐ 18 - Hardware reference + research notes cho RK3588 NPU và regcmd interface
- **gregordinary/ort-rocket** ⭐ 2 (C++) - ONNX Runtime execution provider cho RK3588 NPU - offload transformer vision encoders (RF-DETR, CLIP/SigLIP, SAM, Depth Anything v2) tới NPU
- **gregordinary/tflite-rocket** ⭐ 5 (C++) - TensorFlow Lite external delegate cho NPU-accelerated detection trên RK3588

**RKLLM deployments:**
- **Leon6225/InternVL3.5-4B-NPU** ⭐ 5 (C++) - InternVL3.5-4B cho RK3588 NPU: multimodal AI
- **ambagesthickskin162/Qwen3.5-4B-NPU** ⭐ 1 (C++) - Deploy Qwen3.5-4B trên NPU hardware, efficient local inference
- **WMXJY/rkllm-openai-server** ⭐ 0 - OpenAI-compatible RKLLM inference: deploy Qwen3-VL 2B/4B trên RK3576/RK3588 NPU, `/v1/chat/completions` API + web chat + dashboard
- **chenchengchen13/rk3588-llm-npu** ⭐ 0 - Deploy LLM (DeepSeek-R1-Distill / Qwen2.5) trên RK3588 NPU: W8A8 quantization, NPU vs CPU benchmarks, rkllm-runtime version compatibility notes

**Kernel & system-level:**
- **gregordinary/patches** ⭐ 4 (C) - Out-of-tree patches cho boot2deb Debian builder: RK3588 mainline rocket NPU driver patches + HW video-transcode patches (kernel/ffmpeg/MPP)

**Vision inference:**
- **lona-cn/vision-simple** ⭐ 103 (C++) - Lightweight cross-platform vision inference: YOLOv10/v11/v26, PaddleOCR, dùng ONNXRuntime/RKNPU với multiple execution providers

**Monitoring & management:**
- **isac322/rkmon** ⭐ 12 (Go) - Real-time hardware monitor TUI cho RK3588: GPU, NPU, VPU, RGA, thermal zones (like htop cho SBC)
- **gclawes/rockchip-dra-driver** ⭐ 2 (Go) - Kubernetes DRA driver cho RK3588 features (GPU, NPU)

**Orange Pi ecosystem:**
- **jaylfc/taosmd** ⭐ 79 - Local-first AI memory: runs offline trên machine 8GB+ RAM (SBC, mini PC), zero-loss verbatim archive, knowledge graph, hybrid retrieval
- **MichaIng/DietPi** ⭐ 6.3K - Lightweight justice cho single-board computers
- **RaspAP/raspap-webgui** ⭐ 5.2K (PHP) - Easiest wireless router setup cho Debian devices
- **orangepi-xunlong/orangepi-build** ⭐ 1.1K - Orange Pi build cho H2+, H3, H5, H6, H616, RK3328, RK3399, RK3588(s)

**Media & video:**
- **heygen-com/hyperframes** ⭐ 580↑ - Write HTML. Render video. Built for agents

**Other embedded tools:**
- **art-den/astra_lite** ⭐ 53 (Rust) - Deepsky astrophotography + live stacking trên low power PCs (Raspberry Pi, Orange Pi)
- **Effect-TS/effect** ⭐ 80↑ - Build production-ready apps in TypeScript

**Error tracking:**
- **getsentry/sentry** ⭐ 16↑ - Developer-first error tracking + performance monitoring

---

## 🔥 Phân tích tín hiệu xu hướng

### 1. **Agent Skills Ecosystem đang mature**
4 repos top 10 trending là skills frameworks. Community đã shift từ "làm agent chạy được" sang "làm agent có skills tái sử dụng, composable".

Pattern: `.agents` directory convention đang emerge như standard. Skills = reusable, versioned capabilities cho agents.

### 2. **Token Economics trở thành obsession**
65% token cut (caveman), 98% tool output reduction (context-mode), 20-60% compression (headroom).

Không còn "just throw more tokens". Mọi người đang optimize từng byte vào context window. Lazy coding philosophy (ponytail) = ít code hơn = ít tokens hơn.

### 3. **RK3588 NPU mainline driver đã sẵn sàng**
`rocket` DRM-accel driver (mainline Linux kernel) + userspace toolchain hoàn chỉnh:
- ggml backend (llama.cpp/whisper.cpp)
- ONNX Runtime execution provider
- TFLite delegate
- Userspace driver + matmul library

Embedded AI không còn là vendor SDK hell. Có mainline kernel support + open-source userspace stack.

### 4. **Agent memory persistence = new standard**
claude-mem (95K stars), mem0 (66K), taosmd (79). Agents không còn stateless. Session memory + knowledge graph = expected features.

Local-first, offline-first approach: taOS, taosmd run trên SBC 8GB RAM.

### 5. **Multi-agent orchestration moving beyond LangChain**
openrig (build agent networks), CowAgent (self-evolving multi-agent), nanobot (multi-agent workflows).

Không phải "1 agent làm mọi thứ". Là "network of specialized agents collaborate".

### 6. **Design language for AI = new vertical**
impeccable (722 stars) - design language cho AI harness. AI không chỉ code, còn phải "think design".

### 7. **Video as code**
hyperframes: Write HTML → Render video. Built for agents.

Agents sẽ không chỉ generate text/code, mà generate video programmatically.

---

## 🎪 Tâm điểm cộng đồng

### 🥇 **Caveman prompting phenomenon**
JuliusBrussee/caveman (209 stars overnight) viral vì concept đơn giản mà hiệu quả: talk like caveman = 65% fewer tokens.

Community đang meme-ify nó, nhưng underneath là insight thật: verbose prompts = waste tokens. Terse = efficient.

### 🥈 **Agent Reach = eyes for agents**
Panniantong/Agent-Reach (696 stars) - trending #1.

"Give your AI agent eyes to see the entire internet" - read Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu - zero API fees.

Đây là missing piece: agents cần access real-time internet data mà không tốn tiền API.

### 🥉 **taOS = self-hosted agent OS**
jaylfc/taOS (553 stars) - trending mạnh trong ai-agent searches.

"Your memory, chat, agents, and files stay on hardware you own, offline by default, cloud by choice."

Auto-clustering qua Orange Pi, Raspberry Pi, Mac mini, gaming PC = democratize AI infrastructure. Không cần cloud.

### 📈 **RK3588 NPU ecosystem explosion**
gregordinary đang single-handedly build toàn bộ open-source stack cho RK3588 NPU:
- ggml-rocket (21 stars)
- rocket-userspace (17 stars)
- ort-rocket (2 stars)
- tflite-rocket (5 stars)
- rockchip-npu-notes (18 stars)
- patches (4 stars)

Tất cả repos created trong tháng 9-10/2026. Community đang rally around mainline kernel approach.

### 🎯 **Career-ops = AI job search agent**
career-ops-hq/career-ops (73K stars) - scan job boards, score jobs 1-5 against CV, tailor resume + cover letter, interview prep, application tracker.

"You press Submit" = agent làm mọi thứ except final decision.

Vertical application của agents đang explode: không chỉ coding, mà mọi professional workflow.

---

## 💡 Insights & Predictions

**Near-term (Q4 2026):**
- Skills marketplaces sẽ xuất hiện (npm cho agent skills)
- Token optimization = competitive moat cho agent products
- RK3588-powered edge AI devices sẽ ship với pre-trained models

**Mid-term (2027):**
- Multi-agent workflows = default architecture cho complex tasks
- Video generation from code = mainstream (hyperframes approach)
- Self-hosted agent OS (taOS-style) = alternative stack beside cloud AI

**Watching:**
- Ponytail philosophy vs traditional software engineering: tension sẽ tăng
- NPU support trong mainstream ML frameworks (PyTorch, TensorFlow)
- Agent security (OpenShell) - khi agents autonomous hơn, attack surface tăng

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*