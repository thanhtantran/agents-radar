# Xu hướng AI Mã nguồn mở 2026-10-13

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-13 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-10-13

## 1. Tóm tắt hôm nay

Ngày lịch sử: AI agent infrastructure bùng nổ. Top trending: reverse-engineering agents (morluto/rea +45K), AI coding context optimization (mksglu/context-mode), open-source userspace NPU drivers cho Rockchip (gregordinary/ggml-rocket, rocket-userspace). Edge AI democratization rõ nét: RK3588 NPU chạy LLM local không cần cloud. Agent harness ecosystem trưởng thành: memory persistence, multi-framework routing, context compression. Cộng đồng đang giải quyết hai bottleneck lớn: context window limits và edge inference efficiency.

## 2. Top repos theo chiều

### 🤖 AI Agents

**morluto/rea** ⭐ +45,327
- Reverse engineering with agents: từ app behavior đến native binaries
- TypeScript, architecture chưa rõ nhưng tích hợp agent workflows
- Signal: agent capability mở rộng sang reverse engineering, không chỉ coding/automation

**affaan-m/ECC** ⭐ 277,936 (+high momentum)
- Agent harness performance optimization: skills, instincts, memory, security
- Support Claude Code, Codex, Opencode, Cursor
- Research-first development approach

**NousResearch/hermes-agent** ⭐ 253,149
- "The agent that grows with you" - adaptive learning system
- Python implementation
- Focus: agent personalization và self-evolution

**Panniantong/Agent-Reach** ⭐ 96,609
- Agent web scraping: Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- Zero API fees, CLI-based
- Use case: agent data collection từ social platforms

**career-ops-hq/career-ops** ⭐ 74,198
- AI job search agent: scan jobs, score CV match, tailor resume/cover letter
- Runs local trong AI coding CLI (Claude Code, Codex, OpenCode)
- Application: vertical agent cho job hunting automation

**ZhuLinsen/daily_stock_analysis** ⭐ 66,243
- LLM-driven multi-market stock analysis agent
- Multi-source data, real-time news, decision dashboard, auto notifications
- Zero-cost scheduled runs - focus on deployment economics

**hugohe3/ppt-master** ⭐ 61,137
- AI agent tạo PowerPoint từ docs/topics: native shapes, transitions, animations, charts, audio narration
- Template support, data-backed content generation
- Vertical: presentation automation

**bojieli/ai-agent-book** ⭐ 53,724
- "深入理解 AI Agent：设计原理与工程实践" - comprehensive agent design book
- Code examples per chapter
- Educational resource cho agent development

**zhayujie/CowAgent** ⭐ 47,361
- Open-source personal AI assistant & agent harness
- Multi-agent, multi-model, multi-channel
- Self-evolving với memory và knowledge, one-line install

**codewhale-hq/Codewhale** ⭐ 41,076
- Rust agent engine + terminal client
- Provider choice, tools, approvals, receipts
- Focus: agent governance và transparency

### 🔧 AI Infrastructure

**mksglu/context-mode** ⭐ +246
- Context window optimization cho AI coding agents
- 98% tool output reduction qua sandboxing
- Session memory persistence + routing across 17 platforms via MCP + hooks
- Key insight: context management là major bottleneck

**bilawalsidhu/gods-eye-view** ⭐ +1,895
- Spy satellite simulator trong browser: real data, photorealistic 3D globe
- JavaScript, live spatial intelligence
- Use case: geospatial data visualization cho AI systems

**cathrynlavery/diagram-design** ⭐ +2,081
- Editorial diagram design cho Claude Code, Codex, GitHub Copilot, Cursor, Factory Droid, Pi
- 44 diagram types, self-contained HTML + SVG
- "No shadows. No Mermaid slop" - quality-focused tooling

**Alishahryar1/free-claude-code** ⭐ +626
- Free access (1.3B+ tokens) cho Claude Code, Codex, VSCode, Pi, OpenCode from terminal, IDE, phone, browser
- Multi-harness + multi-model, voice support, ToS friendly
- Economics: zero-cost inference democratization

**thedotmack/claude-mem** ⭐ 100,113
- Persistent context across sessions cho every agent
- Captures, compresses with AI, injects relevant context
- Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode
- Problem solved: stateless agent sessions

**headroomlabs-ai/headroom** ⭐ 75,144
- Compress tool outputs, logs, files, RAG chunks before LLM
- 20% fewer tokens for coding agents, 60-95% for JSON
- Library, proxy, MCP server implementations
- Economics: token cost optimization

**firecrawl/firecrawl** ⭐ 190,884
- Web scraping for AI agents: supercharge with web + beyond data
- TypeScript, "library for superintelligence"
- Infrastructure: agent data pipeline

**ollama/ollama** ⭐ 182,915
- Local model runner: Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma
- Go implementation, self-hosted inference
- Standard: local-first LLM serving

### 🧠 Models & Training

**lyogavin/airllm** ⭐ +879
- AirLLM 2.8T LLM inference with single 4GB GPU
- Jupyter Notebook, memory optimization techniques
- Signal: aggressive quantization + offloading cho resource-constrained environments

**microsoft/BitNet** ⭐ +97
- Official inference framework for 1-bit LLMs
- C++ implementation
- Microsoft research: extreme quantization direction

**huggingface/transformers** ⭐ 167,606
- State-of-the-art models: text, vision, audio, multimodal
- Python, inference + training
- Standard: model definition framework

### 📦 AI Applications

**storytold/artcraft** ⭐ +4,095
- Intentional crafting engine cho artists, designers, filmmakers
- Rust implementation
- Vertical: creative tooling với AI

**open-webui/open-webui** ⭐ +157
- User-friendly AI interface: Ollama, OpenAI API support
- Python, self-hosted UI layer
- Standard: LLM frontend

**CherryHQ/cherry-studio** ⭐ 52,580
- AI productivity studio: smart chat, autonomous agents, 300+ assistants
- TypeScript, unified access to frontier LLMs
- Product: all-in-one AI workspace

**HKUDS/nanobot** ⭐ 48,977
- Ultra-lightweight personal AI agent framework in Python
- WebUI, tools, memory, MCP, multi-agent workflows, automation, chat apps
- Self-hosted, open-source
- Focus: minimal footprint

**siyuan-note/siyuan** ⭐ 46,740
- Privacy-first, self-hosted knowledge workspace
- Humans + AI agents collaborate
- TypeScript, open-source
- Use case: knowledge management với agent integration

**Mintplex-Labs/anything-llm** ⭐ 66,990
- "Stop renting intelligence. Own it."
- Local-first agent experience, all-in-one
- JavaScript, self-hosted alternative to cloud AI

### 🔍 RAG & Knowledge

**infiniflow/ragflow** ⭐ 92,079
- Leading RAG engine: RAG + Agent capabilities
- Go implementation, context layer cho LLMs
- Standard: production RAG platform

**unclecode/crawl4ai** ⭐ 85,397
- Web crawler/scraper cho LLMs và AI agents
- Convert websites to clean LLM-ready Markdown
- Python, self-hosted hoặc cloud
- Infrastructure: content ingestion

**datawhalechina/hello-agents** ⭐ 82,771
- "从零开始构建智能体" - educational tutorial
- Python, principles + practice
- Chinese-language agent development guide

**mem0ai/mem0** ⭐ 67,061
- Memory layer for AI agents: drop-in memory infrastructure
- Context persistence, production-ready
- Python, solves stateless agent problem

**run-llama/llama_index** ⭐ 52,468
- Document processing platform for AI
- Python, RAG + indexing framework
- Standard: data connector for LLMs

**jeecgboot/JeecgBoot** ⭐ 48,193
- 低代码v2.0, AI low-code platform
- "一句话即可生成整个系统" - system generation từ prompt
- Java, AI Skills: flows, forms, reports, dashboards
- Built-in AI platform: chat, knowledge base, process orchestration, MCP plugins
- RAG use case: enterprise low-code với AI integration

**milvus-io/milvus** ⭐ 46,365
- High-performance vector database: scalable vector ANN search
- Go, cloud-native
- Infrastructure: vector storage cho RAG

### 🔌 Embedded AI

**jaylfc/taOS** ⭐ 558
- Self-hosted AI agent OS: memory, chat, agents, files stay on owned hardware
- Python, offline by default, cloud by choice
- Offline AI memory (taOSmd), self-hosted group chat, web desktop + app store, auto-clustering
- Runs on Orange Pi, Raspberry Pi, Mac mini, gaming PC
- **Major signal**: consumer hardware orchestration cho distributed AI

**gregordinary/rockchip-npu-notes** ⭐ 23
- Hardware reference + research notes cho RK3588 NPU regcmd interface
- Shell scripts, reverse engineering documentation
- Foundation: open NPU understanding

**gregordinary/ggml-rocket** ⭐ 23
- Drop-in ggml backend cho Rockchip NPUs
- Offloads llama.cpp/whisper.cpp prefill to RK3588 NPU
- C++, integration với existing inference engines
- **Critical**: llama.cpp ecosystem now runs on edge NPUs

**gregordinary/rocket-userspace** ⭐ 20
- Userspace driver, matmul, on-NPU op library cho Rockchip NPUs (RK3588 & subset on RK3576)
- C implementation, via mainline rocket DRM-accel driver
- **Breakthrough**: clean-room NPU driver không rely on vendor blobs

**isac322/rkmon** ⭐ 12
- Real-time hardware monitor TUI cho Rockchip RK3588 SBCs
- Go, like htop but for GPU, NPU, VPU, RGA, thermal zones
- Tooling: visibility vào NPU utilization

**oRKLLM/ork-driver** ⭐ 7
- Clean-room userspace matmul library cho Rockchip NPU
- C implementation, no vendor dependencies
- Alternative: community-driven NPU stack

**gregordinary/tflite-rocket** ⭐ 6
- TensorFlow Lite external delegate cho NPU-accelerated detection on RK3588
- C++, integration với TFLite ecosystem
- Use case: object detection trên edge

**gregordinary/patches** ⭐ 4
- Out-of-tree patch sets cho boot2deb Debian-device builder
- RK3588 mainline rocket NPU driver patches + HW video-transcode patches
- Kernel/ffmpeg/MPP, deployment tooling

**gregordinary/ort-rocket** ⭐ 3
- ONNX Runtime execution provider cho Rockchip NPUs via mainline rocket driver
- C++, offloads transformer vision encoders (RF-DETR, CLIP/SigLIP, SAM, Depth Anything v2) to NPU
- Ecosystem: ONNX models now run on RK3588

**YeWenxuan64/Edge_Inferencer** ⭐ 3
- Unified edge AI inference engine: one Python API cho Rockchip NPU, Qualcomm HTP, ONNX Runtime
- Auto-detects .rknn / .bin / .onnx, plug-and-play
- Abstraction layer: hide hardware differences

**Leon6225/InternVL3.5-4B-NPU** ⭐ 5
- InternVL3.5-4B multimodal AI cho RK3588 NPU
- C++, vision + language understanding
- Model port: SOTA multimodal trên edge

**kyshipit/eai-rk3588** ⭐ 4
- Extensible RK3588 edge inference platform
- Multi-threaded pipeline, RKNN adapters, RKLLM chat, coordinator-driven multi-slot activation
- C implementation, production-grade orchestration

**ambagesthickskin162/Qwen3.5-4B-NPU** ⭐ 1
- Qwen3.5-4B LLM on NPU hardware, efficient local inference
- C++, Chinese LLM on edge

**hanmonic/rkllm-go** ⭐ 0
- Go bindings cho RKLLM
- Language ecosystem expansion

**suan-4/rk3588-llm-inference** ⭐ 0
- RK3588 edge LLM inference: benchmarking, bottleneck analysis, optimization
- Python, Qwen3-4B on RKNPU with RKLLM
- Performance research

**MichaIng/DietPi** ⭐ 6,326
- Lightweight OS cho single-board computers
- Shell, optimized Linux distribution
- Foundation: efficient OS cho edge AI

**jaylfc/taosmd** ⭐ 80
- Local-first AI memory: runs offline on 8GB+ RAM machines (SBC, mini PC, laptop, workstation)
- Python, zero-loss verbatim archive, knowledge graph, hybrid retrieval
- Framework-agnostic, no cloud
- Companion to taOS, memory persistence layer

**nouverse/nouride-releases** ⭐ 18
- Lightweight multi-agent AI engine trong single daemon
- Homelab-friendly, built for mini devices (Raspberry Pi, Orange Pi, Geekom, NUC, LXC)
- Zero-bloat design cho resource-constrained environments

**dustbowlair424/NavCore-Pixhawk** ⭐ 7
- Real-time GPS-denied INS navigation cho drones
- Python, Pixhawk Cube Orange + Raspberry Pi 4 via MAVLink
- Edge AI use case: autonomous navigation

**Artod/robot-pepin** ⭐ 6
- Home robot on IKEA cart: differential drive, 6-DoF arm, 360° lidar, ToF, cameras
- Python, laptop brain over wifi, Orange Pi relay
- Edge compute: distributed robotics architecture

## 3. Phân tích tín hiệu xu hướng

### 🔥 NPU Democratization Wave
Rockchip RK3588 NPU đang có userspace driver ecosystem bùng nổ (gregordinary/*). Community tạo clean-room implementations không phụ thuộc vendor blobs. Integrations với llama.cpp, ONNX Runtime, TensorFlow Lite → SOTA models (Qwen, InternVL, SAM) chạy local trên $50-150 SBCs. **Implication**: edge AI không còn research toy, production-ready với consumer hardware.

### 🧩 Context Optimization Crisis
Hai approaches rõ nét:
1. **Compression**: headroomlabs-ai/headroom (60-95% reduction), mksglu/context-mode (98% tool output reduction)
2. **Persistence**: thedotmack/claude-mem (cross-session), mem0ai/mem0 (drop-in memory layer)

**Why now**: agent workloads hit context limits nhanh hơn chat. Tool outputs, logs, file contents chiếm bandwidth. Solution stack: compress ephemeral data + persist semantic memory.

### 🤝 Agent Harness Maturity
affaan-m/ECC (277K stars), zhayujie/CowAgent (47K), HKUDS/nanobot (48K) → standardized agent infrastructure. Pattern: skills/tools + memory + multi-model routing + security + self-evolution. **Not** prototype frameworks anymore, production systems với governance (Codewhale: approvals + receipts).

### 🌐 Local-First vs. Cloud Economics
Themes: "Stop renting intelligence" (anything-llm), "owned hardware" (taOS), "1.3B+ free tokens" (free-claude-code). Community building zero-cost alternatives to API-based AI. Economic pressure → technical innovation in quantization (BitNet 1-bit, airllm 2.8T on 4GB), edge deployment, self-hosting.

### 🔧 Reverse Engineering + AI
morluto/rea (+45K stars) mở hướng mới: agents not just write code, reverse engineer existing systems từ app behavior đến native binaries. **Implication**: AI capabilities expand from generation to comprehension + analysis.

### 🏭 Vertical Agent Applications
career-ops-hq/career-ops (job hunting), hugohe3/ppt-master (presentation), ZhuLinsen/daily_stock_analysis (stock), jeecgboot/JeecgBoot (low-code) → agents solving domain-specific workflows end-to-end. Not generic assistants, specialized automation với deep vertical integration.

### 📡 Multi-Source Data Ingestion
Panniantong/Agent-Reach (social platforms), firecrawl/firecrawl (web), unclecode/crawl4ai (LLM-ready scraping) → agent data pipelines standardizing. **Key**: convert unstructured web content to agent-consumable formats at scale.

## 4. Tâm điểm cộng đồng

### 🎯 morluto/rea - Reverse Engineering Agents
+45,327 stars trong 1 ngày = viral adoption. Community cần agent capabilities beyond coding: understand existing systems, analyze binaries, map behaviors. Opens use cases: security analysis, legacy system migration, competitive intelligence. Watch: tooling ecosystem around this (disassemblers, debuggers as agent tools).

### 🔌 Rockchip NPU Ecosystem (gregordinary/*)
Clean-room driver development happening in public. gregordinary shipping: rocket-userspace (userspace driver), ggml-rocket (llama.cpp backend), ort-rocket (ONNX provider), tflite-rocket (TFLite delegate), patches (kernel/ffmpeg). **Impact**: mở khóa RK3588 hardware cho open-source stack, không bị vendor lock-in. Community response: ports of SOTA models (InternVL, Qwen) + inference engines (RKLLM, eai-rk3588) + monitoring tools (rkmon).

### 💾 Context Window Wars
headroomlabs-ai/headroom (75K stars), mksglu/context-mode (+246), thedotmack/claude-mem (100K) = community urgently solving context limits. Agent workflows generate massive intermediate data (tool outputs, logs, retrieval results). Solutions: aggressive compression (98% reduction possible) + semantic persistence. **Next**: standardized protocols for context management (MCP hooks, compression APIs).

### 🏠 Self-Hosted AI Infrastructure
jaylfc/taOS (558 stars, but high momentum), anything-llm (66K), taosmd (80) → homelab AI movement. Pattern: run on consumer hardware you own (Orange Pi, Raspberry Pi, mini PC), cluster automatically, offline by default. **Philosophy shift**: from cloud-first to local-first with optional cloud. Democratization not just about model access, also about data sovereignty + zero ongoing costs.

### 📚 Chinese AI Community Output
bojieli/ai-agent-book (53K - comprehensive agent design book), ZhuLinsen/daily_stock_analysis (66K - stock analysis), jeecgboot/JeecgBoot (48K - AI low-code), datawhalechina/hello-agents (82K - agent tutorial) → Chinese-language resources reaching massive scale. **Signal**: China's open-source AI ecosystem maturing fast, not just consuming but producing educational + production systems.

---

**Kết luận**: Ngày hôm nay đánh dấu transition từ "AI as API service" sang "AI as owned infrastructure". NPU hardware + context optimization + agent frameworks converging để enable production-grade local AI. Community không chỉ build models, đang build entire stack from silicon to application.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*