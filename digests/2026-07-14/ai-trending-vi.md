# Xu hướng AI Mã nguồn mở 2026-07-14

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-14 02:00 UTC

---

# Báo cáo Phân tích Xu hướng AI Mã nguồn mở - 14/07/2026

## 1. Tóm tắt hôm nay

Ngày hôm nay chứng kiến sự bùng nổ của **AI Coding Skills** - một làn sóng mới trong phát triển phần mềm. Thay vì chỉ là các công cụ đơn lẻ, cộng đồng đang xây dựng hệ sinh thái "kỹ năng" có thể cắm vào các AI coding assistants (Claude Code, Cursor, Codex, Gemini CLI). 

Xu hướng nổi bật:
- **Skills-based architecture** cho AI agents đang thay thế monolithic tools
- **Knowledge graph** trở thành cách tiếp cận chính cho RAG trong coding
- **Edge AI trên NPU** (đặc biệt RK3588) đang trưởng thành với hệ sinh thái hoàn chỉnh
- **Local-first AI** với memory và automation hoàn toàn offline

## 2. Top Repos Theo Chiều

### 🤖 AI Agents

**affaan-m/ECC** ⭐ 229K
- Agent harness optimization system với skills, memory, security
- Hỗ trợ đa nền tảng: Claude Code, Codex, Opencode, Cursor
- Tín hiệu: Cộng đồng đang tập trung vào **agent performance** thay vì chỉ functionality

**NousResearch/hermes-agent** ⭐ 214K  
- "Agent that grows with you" - học và tiến hóa theo thời gian
- Self-evolving architecture

**zhayujie/CowAgent** ⭐ 46K
- Super AI assistant tích hợp: task planning, tool execution, self-evolution
- Multi-model, multi-channel, one-line install
- Tín hiệu: **Ease of deployment** là yếu tố quan trọng cho adoption

**HKUDS/nanobot** ⭐ 45K
- Lightweight agent cho tools, chats, workflows
- Xu hướng: **Minimalist agents** đang được ưa chuộng

**HKUDS/Vibe-Trading** ⭐ +1,153 hôm nay
- Personal trading agent - ứng dụng vertical AI agent
- Tín hiệu: AI agents đang xâm nhập các domain chuyên biệt (finance, trading)

### 🔧 AI Infrastructure

**Graphify-Labs/graphify** ⭐ 85K | +1,095 hôm nay 🔥
- Biến code, schemas, docs, videos thành **queryable knowledge graph**
- Skill cho multiple AI coding assistants
- Tín hiệu: **Knowledge graph > vector embeddings** cho code understanding

**thedotmack/claude-mem** ⭐ 87K
- Persistent context across sessions
- Compression với AI, inject context vào future sessions
- Hỗ trợ đa nền tảng agent
- Tín hiệu: **Memory management** là bottleneck lớn của AI agents

**github/spec-kit** ⭐ +543 hôm nay
- Toolkit cho Spec-Driven Development từ GitHub chính thức
- Tín hiệu: **Design-first approach** với AI đang được standardize

**firecrawl/firecrawl** ⭐ 150K
- API để search, scrape, interact với web at scale
- Infrastructure cho AI agents cần data

**headroomlabs-ai/headroom** ⭐ 59K
- Compression tool outputs/logs/RAG trước khi đến LLM
- 60-95% fewer tokens, same answers
- Tín hiệu: **Token economy** là mối quan tâm thực tế trong production

### 🧠 Models & Training

**ollama/ollama** ⭐ 176K
- Hỗ trợ Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma
- Tín hiệu: **Model diversity** và local inference vẫn là priority

**huggingface/transformers** ⭐ 163K
- Framework cho SOTA models: text, vision, audio, multimodal
- Cả inference và training

**Qengineering/Qwen3-VL-2B-NPU** ⭐ 34
- Qwen3-VL-2B trên RK3588 NPU
- Tín hiệu: Vision-language models đang được port xuống edge devices

**Leon6225/InternVL3.5-4B-NPU** ⭐ 3
- InternVL3.5-4B cho RK3588 NPU
- Multimodal AI với vision & language

### 📦 AI Applications

**OpenCut-app/OpenCut** ⭐ +1,229 hôm nay 🔥
- Open-source CapCut alternative
- TypeScript
- Tín hiệu: **AI video editing** đang được democratize

**moeru-ai/airi** ⭐ +78 hôm nay
- Self-hosted AI companion với realtime voice chat
- Chơi được Minecraft, Factorio
- Multiplatform: Web/macOS/Windows
- Tín hiệu: **AI companions** với gaming abilities là niche mới

**santifer/career-ops** ⭐ 60K
- AI job search: scan portals, score listings, tailor CV, track applications
- Chạy locally trong AI coding CLI
- Tín hiệu: **Vertical AI apps** cho career/recruiting đang nở rộ

**ZhuLinsen/daily_stock_analysis** ⭐ 57K
- LLM-powered multi-market stock analysis
- Multi-source data, real-time news, decision dashboard
- Zero-cost scheduled runs

**hugohe3/ppt-master** ⭐ 39K
- AI tạo PowerPoint thật từ document
- Native shapes, animations, editable charts, audio narration
- Tín hiệu: **Document automation** với AI đang tiến bộ vượt bậc

**CherryHQ/cherry-studio** ⭐ 49K
- AI productivity studio: smart chat, autonomous agents, 300+ assistants
- Unified access to frontier LLMs

**siyuan-note/siyuan** ⭐ 45K
- Privacy-first, self-hosted personal knowledge management
- TypeScript + Golang

### 🔍 RAG & Knowledge

**Shubhamsaboo/awesome-llm-apps** ⭐ 120K | +996 hôm nay 🔥
- 100+ AI Agent & RAG apps có thể chạy thật
- Clone, customize, ship
- Tín hiệu: **Ready-to-run examples** quan trọng hơn documentation

**infiniflow/ragflow** ⭐ 85K
- Leading RAG engine kết hợp Agent capabilities
- Superior context layer cho LLMs

**Mintplex-Labs/anything-llm** ⭐ 63K
- "Stop renting your intelligence. Own it."
- Local-first agent experience

**mem0ai/mem0** ⭐ 61K
- Universal memory layer cho AI Agents
- TypeScript implementation

**run-llama/llama_index** ⭐ 51K
- Leading document agent & OCR platform

**jaylfc/taosmd** ⭐ 67
- Local-first AI memory - offline, 8GB+ RAM
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval
- Framework-agnostic, no cloud
- Tín hiệu: **Privacy-first memory** cho agents

### 🔌 Embedded AI (NPU/Edge/Orange Pi)

**jaylfc/taOS** ⭐ 430 🔥
- Self-hosted AI agent OS
- Offline AI memory, multi-framework group chat, web desktop + app store
- Auto-clustering across Orange Pi, Raspberry Pi, Mac mini, gaming PC
- Tín hiệu: **Distributed edge AI** với consumer hardware

**mack42/OrangePi5Pro** ⭐ 13
- Ubuntu 26.04 cho Orange Pi 5 Pro / RK3588S
- Mainline kernel: Mali-G610 GPU, RK3588 NPU (3 cores, 800 MHz, ~558 inf/s)
- HW video decode, KDE Plasma
- Tín hiệu: **Production-ready embedded AI** với full desktop experience

**Hanzo-Huang/rk3576-home-assistant-voice** ⭐ 12
- Local Home Assistant voice stack cho RK3576
- NPU-accelerated Whisper + Piper
- openWakeWord + RKLLM
- Tín hiệu: **Voice AI trên edge** đang mature

**Hanzo-Huang/rkllm-docker** ⭐ 0 (mới)
- Dockerized RKLLM runtime
- OpenAI-compatible API cho Rockchip NPU models

**fukumori/iwagumi** ⭐ 3
- Open runtime điều khiển RK3588 NPU trực tiếp
- Offload GGUF matmul qua ggml backend
- Apache-2.0 license

**oRKLLM/ork-driver** ⭐ 1
- Clean-room userspace matmul library cho Rockchip NPU
- Tín hiệu: **Open-source NPU drivers** đang được phát triển

**CERALIVE/image-building-pipeline** ⭐ 3
- mkosi-based image builder cho streaming appliances
- .raw sysext bundles + .raucb A/B RAUC OTA packages
- RK3588 devices (Orange Pi 5+, Radxa Rock 5B+)

### 🎨 Developer Experience

**Nutlope/hallmark** ⭐ +794 hôm nay
- Anti-AI-slop design skill cho Claude Code, Cursor, Codex
- CSS-based skill
- Tín hiệu: **Design quality** trong AI-generated code là concern lớn

**coreyhaines31/marketingskills** ⭐ +299 hôm nay
- Marketing skills cho Claude Code & AI agents
- CRO, copywriting, SEO, analytics, growth engineering
- Tín hiệu: **Cross-functional skills** cho AI agents đang mở rộng

**Panniantong/Agent-Reach** ⭐ 56K
- Cho AI agent "eyes" để xem entire internet
- Read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- One CLI, zero API fees

**hasaneyldrm/exercises-dataset** ⭐ +451 hôm nay
- 1,324-exercise fitness dataset với animations, thumbnails, 6 languages
- Tín hiệu: **Domain-specific datasets** đang được open-source

## 3. Phân tích Tín hiệu Xu hướng

### 🎯 Skills-as-Plugins Architecture
Thay vì các tools monolithic, cộng đồng đang xây dựng "skills" có thể plug vào nhiều AI coding assistants. Xu hướng này cho phép:
- Interoperability giữa các platforms (Claude Code, Cursor, Codex, Gemini)
- Specialization (design, marketing, security, infrastructure)
- Community-driven development

**Key repos**: Graphify, hallmark, marketingskills, spec-kit

### 📊 Knowledge Graph > Vector Embeddings
Cho code understanding và RAG, knowledge graphs đang thể hiện ưu thế hơn pure vector embeddings:
- Quan hệ giữa code, database, infrastructure explicit
- Query phức tạp và reasoning tốt hơn
- Graphify (+1,095 stars today) là case study điển hình

### 🏠 Local-First Revolution
Privacy và ownership đang trở thành priority:
- Offline AI memory (taosmd)
- Self-hosted agent OS (taOS) 
- Local inference (ollama, anything-llm)
- "Stop renting your intelligence" là slogan mới

### 🔌 Edge AI Maturity (RK3588/NPU)
Hệ sinh thái RK3588 NPU đang đạt production-ready:
- Multi-core NPU support (800 MHz, ~558 inf/s)
- Vision-language models (Qwen3-VL, InternVL3.5)
- Full OS integration (Ubuntu 26.04, KDE Plasma)
- Docker + OpenAI-compatible APIs
- Open-source drivers đang được phát triển

**Tín hiệu**: Edge AI không còn là experimental, đang ready for deployment.

### 🧩 Multi-Agent Orchestration
Agents đang tiến hóa từ single-purpose sang orchestration:
- Auto-clustering across hardware (taOS)
- Multi-framework group chat
- Self-evolution và memory persistence
- Agent harness performance optimization (ECC)

### 💰 Token Economy & Compression
Production costs đang drive innovation:
- headroom: 60-95% token reduction
- AI compression cho outputs/logs/RAG
- Exact answer quality, massive cost savings

### 🎮 AI Companions + Gaming
Niche mới: AI companions với gaming capabilities
- airi: realtime voice chat + Minecraft/Factorio
- Self-hosted, privacy-first
- "Container of souls of waifu, cyber livings"

## 4. Tâm điểm Cộng đồng

### 🔥 Hottest Today

1. **OpenCut** (+1,229) - Democratizing video editing với open-source CapCut alternative
2. **Vibe-Trading** (+1,153) - AI trading agent cho personal finance
3. **Graphify** (+1,095) - Knowledge graph cho code understanding
4. **awesome-llm-apps** (+996) - 100+ runnable AI apps
5. **hallmark** (+794) - Design quality skill cho AI coding

### 🌟 Rising Stars

**taOS ecosystem** đang thu hút attention:
- taOS (430 stars): Self-hosted AI agent OS
- taosmd (67 stars): Local-first AI memory
- Offline-first, privacy-first, hardware-agnostic

**RK3588 NPU ecosystem** đang mature:
- OrangePi5Pro với Ubuntu 26.04 mainline
- RKLLM Docker với OpenAI API
- Open-source drivers (iwagumi, ork-driver)
- Production applications (CERALIVE streaming)

### 💡 Paradigm Shifts

1. **From Tools to Skills**: AI coding assistants đang chuyển sang skills-based architecture
2. **From Cloud to Edge**: Edge AI với NPU đang production-ready
3. **From Monolithic to Distributed**: Multi-device agent orchestration
4. **From Proprietary to Open**: Open-source alternatives cho major platforms (CapCut, trading tools)

---

**Kết luận**: Ngày 14/07/2026 đánh dấu sự chuyển đổi từ "AI as a service" sang "AI as infrastructure you own". Skills-based architecture, local-first approach, và edge AI maturity đang reshape cách chúng ta build và deploy AI systems.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*