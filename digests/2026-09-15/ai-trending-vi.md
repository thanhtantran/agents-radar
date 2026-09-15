# Xu hướng AI Mã nguồn mở 2026-09-15

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-15 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-09-15

## 1. Tóm tắt hôm nay

3 tín hiệu nổi bật:

**Edge AI bùng nổ**: Frontier MoE chạy thuần C (colibri +2173⭐), RKLLM/RKNPU ecosystem phát triển mạnh với 15+ repo mới về NPU deployment trên RK3588. Xu hướng chạy LLM local không cần cloud.

**Agent infrastructure chín muồi**: Alibaba ra open-code-review (+1571⭐), frameworks như hermes-agent (245K⭐), career-ops-hq tự động hoá tìm việc. Agent không còn demo, đã production-ready.

**Multimodal đột phá**: Voice (VoiceStudio +2776⭐ hỗ trợ 646 ngôn ngữ), music generation (YuE2), WiFi-based spatial intelligence (RuView). AI vượt text, vào real-world sensing.

## 2. Top repos theo chiều

### 🤖 AI Agents

**hermes-agent** (245K⭐, Python)  
Agent tự tiến hoá, multi-model, nhẹ, cài 1 dòng lệnh.

**career-ops-hq/career-ops** (71K⭐, JS)  
Scan job portals, đánh giá A-H + score 1-5, tự động tailor CV. Chạy local trong Claude Code/Cursor.

**nanobot** (48K⭐, Python)  
Ultra-lightweight self-hosted agent framework: WebUI, tools, memory, MCP, multi-agent.

**CowAgent** (46K⭐, Python)  
Super assistant: plans tasks, runs tools/skills, self-evolves. Multi-agent, multi-model, multi-channel.

**Codewhale** (40K⭐, Rust)  
Terminal coding agent, built in Rust, community-driven.

**TradingAgents** (745⭐, Python)  
Multi-agent LLM cho giao dịch tài chính.

**Panniantong/Agent-Reach** (651⭐, Python)  
Agent có mắt nhìn internet: read/search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu. Zero API fees.

### 🔧 AI Infrastructure

**alibaba/open-code-review** (1571⭐, Go)  
Hybrid architecture: deterministic pipelines + LLM Agent. Line-level comments, built-in rulesets (NPE, thread-safety, XSS, SQLi). OpenAI/Anthropic compatible.

**tech-leads-club/agent-skills** (512⭐, TypeScript)  
Secure validated skill registry cho AI coding agents. Extend Antigravity, Claude Code, Cursor, Copilot.

**Graphify-Labs/graphify** (116K⭐, Python)  
Turn codebase thành queryable knowledge graph. Local deterministic AST parsing, mọi edge explained, no vector store.

**headroomlabs-ai/headroom** (72K⭐, Python)  
Compress tool outputs, logs, files, RAG chunks. 20% fewer tokens cho coding agents, 60-95% cho JSON. Library, proxy, MCP server.

**claude-mem** (93K⭐, TypeScript)  
Persistent context across sessions. Captures mọi thứ agent làm, AI compress, inject lại future sessions. Works với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot.

**affaan-m/ECC** (258K⭐, JS)  
Agent harness performance optimization: skills, instincts, memory, security. Cho Claude Code, Codex, Opencode, Cursor.

**firecrawl** (180K⭐, TypeScript)  
Context API: search, scrape, interact với web at scale.

**ponytail** (138K⭐, JS)  
Agent think như lazy senior dev. Best code = code never wrote.

### 🧠 Models & Training

**JustVugg/colibri** (2173⭐, C)  
Chạy frontier MoE models trên hardware sẵn có. Thuần C, zero deps, experts streamed from disk.

**multimodal-art-projection/YuE** (559⭐, Python)  
YuE2: frontier music generation với symbolic planning, zero-shot covers, agentic music editing.

**VoxCPM** (216⭐, Python)  
VoxCPM2: Tokenizer-Free TTS cho multilingual speech generation, creative voice design, true-to-life cloning.

**transformers** (536⭐ hôm nay, Python)  
HuggingFace framework cho SOTA ML models: text, vision, audio, multimodal. Inference + training.

### 📦 AI Applications

**debpalash/VoiceStudio** (2776⭐, Python)  
Open-source, fully-local ElevenLabs alternative: voice cloning, voice design, video dubbing, dictation, transcription, audiobook creation. 646 ngôn ngữ.

**666ghj/MiroFish** (560⭐, Python)  
Simple universal swarm intelligence engine. Predicting anything. 简洁通用群体智能引擎，预测万物.

**CherryHQ/cherry-studio** (51K⭐, TypeScript)  
AI productivity studio: smart chat, autonomous agents, 300+ assistants. Unified access tới frontier LLMs.

**daily_stock_analysis** (65K⭐, Python)  
LLM-driven multi-market stock analysis: multi-source data, real-time news, decision dashboard, automated notifications. Zero-cost scheduled runs.

**ppt-master** (54K⭐, Python)  
AI turns documents/topics thành native PowerPoint decks: shapes, transitions, animations, data-backed charts/tables, audio narration, support custom .pptx templates.

**MoneyPrinterTurbo** (123K⭐, Python)  
AI + automation workflow: từ topic/keyword ra HD short videos 1 click.

**ever-gauzy** (1130⭐, TypeScript)  
Open Business Management Platform (ERP/CRM/HRM/ATS/PM).

**project-nomad** (40⭐, TypeScript)  
Offline-first knowledge/education server: Wikipedia, thousands books, courses, maps, optional local AI. No internet required.

**flowsint** (280⭐, TypeScript)  
Visual, flexible graph-based investigation platform cho cybersecurity analysts.

**opendisplay** (229⭐, Swift)  
Free open-source Sidecar/Duet alternative: use iPhone/iPad như true second monitor cho Mac qua USB/WiFi. Low latency H.264, Retina HiDPI, touch input.

### 🔍 RAG & Knowledge

**open-webui** (152K⭐, Python)  
User-friendly AI Interface (supports Ollama, OpenAI API...).

**langchain** (146K⭐, Python)  
Agent engineering platform.

**awesome-llm-apps** (138K⭐, Python)  
100+ AI Agents, Agent Skills, RAG Apps. Free, open source.

**ragflow** (90K⭐, Go)  
Leading RAG engine: cutting-edge RAG + Agent capabilities = superior context layer cho LLMs.

**anything-llm** (66K⭐, JS)  
Stop renting intelligence. Own it. Everything for powerful local-first agent experience.

**mem0** (65K⭐, Python)  
Memory Layer cho AI Agents: drop-in memory infrastructure. Context persists. Production-ready.

**llama_index** (52K⭐, Python)  
Document processing platform cho AI.

**dify** (155K⭐, TypeScript)  
Build Agentic workflows, RAG pipelines. Rich AI model/tool support. Deploy cloud/VPC/self-hosted. Prototype → production không rebuild stack.

### 🔌 Embedded AI

**taOS** (530⭐, Python)  
Self-hosted AI agent OS. Memory, chat, agents, files stay trên hardware own, offline default, cloud by choice. Offline AI memory (taOSmd), self-hosted multi-framework group chat, web desktop + app store, auto-clustering across consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC).

**taosmd** (78⭐, Python)  
Local-first AI memory: runs offline trên 8GB+ RAM machine (SBC, mini PC, laptop, workstation). Zero-loss verbatim archive, knowledge graph, hybrid retrieval. Framework-agnostic, no cloud.

**rkllm-rs** (11⭐, Rust)  
RKLLM Rust FFI binding.

**InternVL3.5-4B-NPU** (5⭐, C++)  
Multimodal AI với InternVL3.5-4B cho RK3588 NPU: vision + language understanding.

**rkllama-webui** (1⭐, Python)  
Web UI cho RKLLM NPU models trên RK3588. Multi-session chat với SSE streaming, model mounting, RAG knowledge base (bge-small-zh + ChromaDB), configurable llm_demo driver. FastAPI + SQLite.

**rkllm3-docker** (0⭐, Shell)  
Run/package RKNN3 LLM models cho Rockchip RK1820/RK1828 accelerators bằng reproducible Docker images.

**RockNPU** (0⭐, Rust)  
Open-source Rust userspace runtime + compiler cho Rockchip NPUs trên mainline Linux.

**Edge_Inferencer** (3⭐, Python)  
Unified edge AI inference engine: one Python API cho Rockchip NPU, Qualcomm HTP, ONNX Runtime. Auto-detects .rknn/.bin/.onnx, plug-and-play.

**open-rknpu** (2⭐, Python)  
Open compiler + libc-only runtime cho Rockchip RV1103/RV1106 NPU. No vendor SDK, no RKNN library, no captured binaries.

**rockchip-dra-driver** (1⭐, Go)  
Kubernetes DRA driver cho Rockchip RK3588 features (GPU, NPU).

**rkmon** (11⭐, Go)  
Real-time hardware monitor TUI cho Rockchip RK3588 SBCs. Like htop, for GPU, NPU, VPU, RGA, thermal zones.

**rknpu2-rs** (12⭐, Rust)  
Rust bindings cho Rockchip RKNN Runtime API (librknnrt.so). Deploy deep learning models trên Rockchip NPUs.

**RuView** (383⭐, Rust)  
Turns commodity WiFi signals thành real-time spatial intelligence, vital sign monitoring, presence detection. No video pixels.

## 3. Phân tích tín hiệu xu hướng

**Edge AI đi mainstream**: 
- MoE models chạy pure C (colibri)
- Rust ecosystem cho NPU (rkllm-rs, rknpu2-rs, RockNPU) 
- Kubernetes integration (rockchip-dra-driver)
- Docker packaging (rkllm3-docker)
→ Edge AI không còn niche, đã có đủ toolchain production

**Agent infrastructure consolidation**:
- Skill registries (agent-skills, Claude-Red)
- Memory layers (claude-mem, mem0)
- Performance optimization (ECC, headroom)
- Harness frameworks (hermes-agent, nanobot, CowAgent)
→ Không còn build agent from scratch, giờ là compose + extend

**Multimodal vượt text**:
- Voice: 646 languages (VoiceStudio), tokenizer-free TTS (VoxCPM)
- Music: symbolic planning, agentic editing (YuE2)
- Sensing: WiFi-based spatial intelligence (RuView)
→ AI đang vào physical world

**Local-first movement**:
- Offline AI OS (taOS)
- Offline memory (taosmd) 
- Offline knowledge server (project-nomad)
- No-internet inference (colibri, Edge_Inferencer)
→ Phản ứng với cloud lock-in + privacy concerns

**Security + safety focus**:
- Code review at Alibaba scale (open-code-review)
- System prompt leaks (system_prompts_leaks)
- Offensive security skills (Claude-Red)
→ AI adoption tăng, security attack surface tăng

**Developer productivity vertical**:
- Career automation (career-ops-hq)
- Trading agents (TradingAgents) 
- Business management (ever-gauzy)
- Stock analysis (daily_stock_analysis)
→ AI agents đang solve real business workflows

## 4. Tâm điểm cộng đồng

**colibri** (2173⭐): Frontier MoE thuần C, zero deps. Proof rằng không cần GPU farm để chạy SOTA models. Community thích lightweight + portable.

**VoiceStudio** (2776⭐): Local ElevenLabs alternative với 646 languages. Privacy-first + multilingual = hit với non-English communities.

**alibaba/open-code-review** (1571⭐): Battle-tested at Alibaba scale, hybrid deterministic + LLM approach. Enterprise đang tìm production-ready code review automation.

**ECC** (258K⭐): Performance optimization cho agent harness. Số sao khủng vì solve pain point của mọi developer dùng Claude Code/Cursor: agent chậm, context lộn xộn, security gaps.

**hermes-agent** (245K⭐): Agent self-evolves + grows với user. Số sao phản ánh community muốn agents không chỉ execute commands mà còn learn + adapt.

**system_prompts_leaks** (764⭐): Extracted system prompts từ Claude, GPT, Gemini, Grok. Community thích transparency + reverse engineering closed models.

**taOS** (530⭐): Self-hosted AI agent OS. Offline-first, auto-clustering across consumer hardware. Hit với self-hoster community + people chán cloud subscriptions.

Trend chung: **Local-first + production-ready + open transparency** là 3 yếu tố tạo viral growth hôm nay.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*