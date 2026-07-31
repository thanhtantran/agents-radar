# Xu hướng AI Mã nguồn mở 2026-07-31

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-31 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 31/07/2026

## 📊 Tóm tắt hôm nay

Cộng đồng AI mã nguồn mở đang chứng kiến sự bùng nổ mạnh mẽ của **AI Agents** và **Agent Harness** - các hệ thống không chỉ thực thi lệnh mà còn có khả năng tự chủ, lập kế hoạch và học hỏi. Điểm nhấn là sự chuyển dịch từ các chatbot đơn giản sang các hệ thống agent phức tạp với memory, skills, và khả năng tự tiến hóa. Đồng thời, làn sóng **Edge AI** và **local-first** tiếp tục tăng tốc với nhiều giải pháp chạy hoàn toàn offline trên hardware consumer.

**Con số ấn tượng**: 
- 4/5 repo trending hàng đầu liên quan đến agents và automation
- Agent harness trở thành từ khóa hot với 3 projects vượt 60K stars
- Speech-to-speech và voice agents đang tăng tốc mạnh (+628 stars/ngày)

---

## 🤖 AI Agents

**Agent Harness & Frameworks đang thống trị**

- **affaan-m/ECC** (⭐236K, +804 hôm nay) - JavaScript
  - Agent harness performance optimization cho Claude Code, Codex, Opencode, Cursor
  - Skills, instincts, memory, security, research-first development
  - Chiếm vị trí số 1 trong cả trending và search results

- **NousResearch/hermes-agent** (⭐222K) - Python  
  - "The agent that grows with you" - agent tự tiến hóa
  - Cập nhật mới nhất hôm nay (31/07)

- **Significant-Gravitas/AutoGPT** (⭐185K) - Python
  - Pioneer trong lĩnh vực autonomous agents
  - Vision: "Accessible AI for everyone, to use and to build on"

**Lightweight & Local-First Agents**

- **HKUDS/nanobot** (⭐46K) - Python
  - Ultra-lightweight, self-hosted personal AI agent
  - WebUI, tools, memory, MCP, multi-agent workflows
  - Tiêu điểm: không cần cloud, chạy hoàn toàn local

- **zhayujie/CowAgent** (⭐46K) - Python  
  - Open-source super AI assistant
  - Tự tiến hóa với memory và knowledge base
  - Multi-model, multi-channel, one-line install

**Vertical Agent Solutions**

- **mvanhorn/last30days-skill** (+378 hôm nay) - Python
  - Agent skill research topics từ Reddit, X, YouTube, HN, Polymarket
  - Synthesizes grounded summary - giải quyết bài toán tổng hợp thông tin

- **santifer/career-ops** (⭐62K) - JavaScript
  - AI job search agent: scan portals, evaluate, tailor CV
  - Chạy local trong CLI như Claude Code, Codex, OpenCode

- **hugohe3/ppt-master** (⭐42K) - Python
  - AI turns docs into native PowerPoint với transitions, animations
  - Audio narration from speaker notes

---

## 🔧 AI Infrastructure

**Voice & Speech**

- **huggingface/speech-to-speech** (#1 trending, +628 hôm nay) - Python
  - Build local voice agents với open-source models
  - HuggingFace đang đẩy mạnh voice AI infrastructure

**Development Tools**

- **different-ai/openwork** (+915 hôm nay) - TypeScript
  - Open-source alternative to Claude Cowork
  - Powered by opencode

- **ChromeDevTools/chrome-devtools-mcp** (+80 hôm nay) - TypeScript
  - Chrome DevTools cho coding agents
  - MCP (Model Context Protocol) integration

- **agavra/tuicr** (+190 hôm nay) - Rust
  - Code review TUI với vim keybindings
  - Developer experience optimization

**Orchestration & Platforms**

- **langchain-ai/langchain** (⭐143K) - Python
  - "The agent engineering platform" - định vị mới
  - Framework chuẩn cho agent development

- **langgenius/dify** (⭐150K) - TypeScript
  - Build Agentic workflows, RAG pipelines
  - Deploy on cloud, VPC, or self-hosted
  - Focus: prototype to production seamlessly

- **CopilotKit/CopilotKit** (⭐36K) - TypeScript
  - Frontend Stack for Agents & Generative UI
  - React, Angular, Mobile, Slack support
  - Makers of AG-UI Protocol

---

## 🧠 Models & Training

**Model Access & Deployment**

- **ollama/ollama** (⭐177K) - Go
  - Hỗ trợ Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma
  - Standard tool cho local model deployment

- **huggingface/transformers** (⭐163K) - Python
  - State-of-the-art ML models: text, vision, audio, multimodal
  - Inference và training

**Prompts & Best Practices**

- **f/prompts.chat** (⭐166K) - HTML
  - Share, discover, collect prompts từ community
  - Self-host cho organizations với complete privacy

---

## 📦 AI Applications

**Productivity & Knowledge Management**

- **siyuan-note/siyuan** (⭐45K) - TypeScript
  - Privacy-first, self-hosted personal knowledge management
  - TypeScript + Golang

- **CherryHQ/cherry-studio** (⭐49K) - TypeScript
  - AI productivity studio: smart chat, autonomous agents, 300+ assistants
  - Unified access to frontier LLMs

**Specialized Solutions**

- **ZhuLinsen/daily_stock_analysis** (⭐59K) - Python
  - LLM-driven multi-market stock analysis
  - Multi-source data, real-time news, automated notifications
  - Zero-cost scheduled runs

- **pascalorg/editor** (+625 hôm nay) - TypeScript
  - Create and share 3D architectural projects
  - Niche application nhưng tăng trưởng mạnh

---

## 🔍 RAG & Knowledge

**RAG Engines & Platforms**

- **Shubhamsaboo/awesome-llm-apps** (⭐129K) - Python
  - 100+ AI Agents, Agent Skills và RAG Apps
  - Free and open source collection

- **infiniflow/ragflow** (⭐86K) - Go
  - Leading RAG engine fused với Agent capabilities
  - Superior context layer for LLMs

- **run-llama/llama_index** (⭐51K) - Python
  - "The leading document agent and OCR platform"
  - Định vị mới: từ RAG framework → document agent

**Memory & Context Management**

- **thedotmack/claude-mem** (⭐89K) - JavaScript
  - Persistent context across sessions cho every agent
  - Compresses với AI, injects relevant context
  - Works với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot

- **mem0ai/mem0** (⭐62K) - Python
  - Universal memory layer for AI Agents
  - Giải quyết bài toán agent memory persistence

- **headroomlabs-ai/headroom** (⭐63K) - Python
  - Compress tool outputs, logs, files, RAG chunks trước khi đến LLM
  - 20% fewer tokens cho coding agents, 60-95% cho JSON
  - Library, proxy, MCP server

**Visual AI Development**

- **FlowiseAI/Flowise** (⭐55K) - TypeScript
  - Build AI Agents, Visually
  - Low-code approach cho agent development

---

## 🔌 Embedded AI

**Edge AI OS & Frameworks**

- **jaylfc/taOS** (⭐465) - Python
  - Self-hosted AI agent OS cho hardware bạn sở hữu
  - Offline by default, cloud by choice
  - Offline AI memory (taOSmd), multi-framework group chat
  - Auto-clustering across Orange/Raspberry Pi, Mac mini, gaming PC

- **jaylfc/taosmd** (⭐72) - Python
  - Local-first AI memory chạy offline trên any machine với 8GB+ RAM
  - Zero-loss verbatim archive, knowledge graph, hybrid retrieval
  - Framework-agnostic, no cloud

**RK3588 NPU Development**

- **Qengineering/SmolVLM2-*** (12, 7, 5 stars) - C++
  - SmolVLM2 variants (256M, 500M, 2B) trên RK3588 NPU
  - Vision-language models cho embedded devices

- **Qengineering/InternVL3-NPU** (⭐7) - C++
- **Leon6225/InternVL3.5-4B-NPU** (⭐5) - C++
  - Advanced multimodal AI trên RK3588 NPU

**Infrastructure & Tools**

- **gregordinary/patches** (⭐4) - C
  - Kernel patches cho RK3588 mainline rocket NPU driver
  - HW video-transcode patches (kernel/ffmpeg/MPP)

- **YeWenxuan64/Edge_Inferencer** (⭐1) - Python
  - Unified edge AI inference engine
  - One Python API cho Rockchip NPU, Qualcomm HTP & ONNX Runtime
  - Auto-detects .rknn / .bin / .onnx

- **freed-dev-llc/terraform-provider-turingpi** (⭐7) - Go
  - Terraform provider cho Turing Pi 2.5 BMC
  - Infrastructure-as-code cho edge AI clusters

**Orange Pi Ecosystem**

- **MichaIng/DietPi** (⭐6,173) - Shell
  - Lightweight OS cho single-board computers
  - Active maintenance (cập nhật 30/07)

- **ut-slayer/orangepi-4a-mainline** (⭐6)
  - Mainline Linux 6.18 support cho Orange Pi 4A (Allwinner T527)
  - HDMI KMS, Mali-G57 Panfrost, WiFi, HDMI audio

- **lmambr2/moneypenny** (⭐4) - TypeScript
  - Self-hosted AI + music assistant cho TeamSpeak 6
  - Two editions: SBC (Orange Pi / RK3588) và Server (x86 + GPU)
  - Whisper STT · Piper British TTS · local Gemma

---

## 🔥 Phân tích Tín hiệu Xu hướng

### 1. Agent Harness Revolution
**Agent harness** đã trở thành pattern architecture chính cho AI agents. Không còn là simple chatbots, agents giờ cần:
- **Skills system**: Pluggable capabilities
- **Memory & Context**: Persistent learning across sessions
- **Security**: Sandboxing, permission management
- **Performance optimization**: Token compression, context management

ECC (236K stars) dẫn đầu với approach "research-first development" và optimization cho production agent harnesses như Claude Code, Codex, Opencode.

### 2. Local-First & Privacy-First
Làn sóng "own your intelligence" đang mạnh mẽ:
- **Mint plex-Labs/anything-llm**: "Stop renting your intelligence"
- **taOS + taosmd**: Offline-first OS với memory layer
- **siyuan-note**: Privacy-first knowledge management
- **DietPi/Orange Pi**: Lightweight infrastructure cho local AI

Người dùng muốn control hoàn toàn data và processing, không phụ thuộc cloud.

### 3. Voice & Multimodal Agents
Speech-to-speech (+628 stars/day) cho thấy voice interface là next frontier:
- Local voice agents với open-source models
- Speech recognition + synthesis + LLM reasoning
- Multimodal VLMs (SmolVLM2, InternVL3) trên edge devices

### 4. Context Compression & Memory
Bài toán "context window" đang được giải quyết từ nhiều hướng:
- **headroom**: Compress outputs trước khi vào LLM (20-95% token reduction)
- **claude-mem**: Persistent context compression across sessions
- **mem0**: Universal memory layer
- **taosmd**: Zero-loss verbatim archive + knowledge graph

### 5. Edge AI Infrastructure Maturity
RK3588 NPU ecosystem đang trưởng thành:
- Multiple VLM implementations (SmolVLM2, InternVL3)
- Unified inference APIs (Edge_Inferencer)
- Production-ready patches cho mainline kernel
- Infrastructure-as-code tools (Terraform provider)

Orange Pi / Raspberry Pi không còn là hobby projects mà là serious edge AI infrastructure.

### 6. Low-Code Agent Development
Visual và low-code tools đang democratize agent development:
- **Flowise**: Visual agent builder
- **dify**: Prototype to production without rebuilding stack
- **jeecgboot**: AI low-code platform - "一句话即可生成整个系统"

### 7. Vertical Agent Applications
Agents đang được specialized cho specific use cases:
- Job search (career-ops)
- Stock analysis (daily_stock_analysis)
- Content research (last30days-skill)
- PPT generation (ppt-master)
- Code review (tuicr)

Pattern: Generic chatbots → Task-specific autonomous agents.

---

## 🎯 Tâm điểm Cộng đồng

### 🏆 Breakout Projects (>500 stars/day)

1. **different-ai/openwork** (+915/day) - TypeScript
   - Open-source Claude Cowork alternative
   - Timing hoàn hảo khi Claude Cowork đang beta
   - Cộng đồng muốn open-source alternatives cho proprietary tools

2. **affaan-m/ECC** (+804/day) - JavaScript
   - Agent harness optimization system
   - Top 1 trong search results với 236K stars
   - Giải quyết production pain points của coding agents

3. **pascalorg/editor** (+625/day) - TypeScript
   - 3D architectural projects
   - Niche nhưng có product-market fit mạnh
   - Potential: AI-assisted 3D design

4. **huggingface/speech-to-speech** (+628/day) - Python
   - Voice agents là next wave
   - HuggingFace backing tạo trust

5. **paperswithbacktest/awesome-systematic-trading** (+621/day) - Python
   - Finance + AI intersection
   - Systematic trading đang adopt AI/LLM rapidly

### 🌊 Emerging Themes

**"Agent Engineering" thay "Prompt Engineering"**
- LangChain rebrands thành "The agent engineering platform"
- Focus chuyển từ crafting prompts → designing agent systems
- Skills: architecture, orchestration, memory management, security

**"Research-First Development"**
- ECC nhấn mạnh "research-first development"
- Pattern: Investigate → Plan → Implement
- Tools support deeper codebase understanding trước khi code

**"Framework-Agnostic" Infrastructure**
- taosmd: Framework-agnostic memory
- Edge_Inferencer: Unified API cho multiple NPUs
- Trend: Interoperability > vendor lock-in

### 📈 Hot Technologies

- **MCP (Model Context Protocol)**: Chrome DevTools MCP, headroom MCP server
- **RKLLM/RKNPU**: RK3588 trở thành standard edge AI chip
- **Whisper STT + Piper TTS**: Local voice stack
- **Knowledge Graphs**: taosmd, mem0 sử dụng KG cho memory
- **Terraform for Edge**: Infrastructure-as-code cho Pi clusters

### 💡 Insights cho Developers

1. **Invest in Agent Skills**: Reusable, composable skills > monolithic agents
2. **Design for Local-First**: Privacy concerns drive local deployment
3. **Optimize Context**: Token costs matter - compression is king
4. **Multimodal is Table Stakes**: Text-only agents sẽ bị bỏ lại
5. **Edge AI is Production-Ready**: RK3588 ecosystem mature enough for real products

---

**Kết luận**: Ngày 31/07/2026 đánh dấu sự chuyển dịch rõ ràng từ "AI assistants" sang "AI agents" với autonomous capabilities, từ "cloud-first" sang "local-first" với privacy focus, và từ "hobbyist edge AI" sang "production-ready embedded systems". Agent harness architecture đang trở thành standard, và context/memory management là bài toán then chốt cần giải quyết.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*