# Xu hướng AI Mã nguồn mở 2026-07-13

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-13 02:00 UTC

---

# 📊 Báo cáo xu hướng AI mã nguồn mở - 13/07/2026

## 🎯 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của **AI Agent tooling và safety systems**, với focus đặc biệt vào việc kiểm soát và bảo vệ khi AI agents tương tác với hệ thống. Các giải pháp **local-first AI** đang chiếm ưu thế, với nhiều project hướng đến việc chạy AI hoàn toàn offline trên hardware cá nhân. Thị trường **embedded AI** (NPU, Orange Pi) tiếp tục nóng với các breakthrough về performance và khả năng chạy multimodal models.

**Con số ấn tượng**: 3 repo về AI agents vượt 210+ stars trong ngày, 2 repo về trading agents (tổng 880+ stars), và ecosystem xung quanh Claude Code đang mở rộng nhanh chóng.

---

## 🤖 AI Agents

### Trending hôm nay

**Dicklesworthstone/destructive_command_guard** ⭐ 444 hôm nay | Rust
- Guard system chặn các lệnh nguy hiểm từ AI agents
- Giải quyết pain point lớn: AI có thể execute destructive commands
- Tín hiệu: cộng đồng đang prioritize safety trong autonomous agents

**wonderwhy-er/DesktopCommanderMCP** ⭐ 210 hôm nay | TypeScript  
- MCP server cho Claude với terminal control + file editing
- Diff-based file editing thay vì full rewrite
- Trend: MCP protocol đang trở thành standard cho Claude extensions

**ColeMurray/background-agents** ⭐ 16 hôm nay | TypeScript
- Open-source system cho background agents
- Cho phép agents chạy liên tục, không cần user interaction

### Top repos theo search (7 ngày)

**NousResearch/hermes-agent** ⭐ 213K | Python
- Agent platform "grows with you"  
- Competition trực tiếp với AutoGPT và agent frameworks lớn

**Significant-Gravitas/AutoGPT** ⭐ 185K | Python
- Vẫn duy trì vị trí top với vision "accessible AI for everyone"
- Focus vào tooling để developers có thể build trên nền tảng

**affaan-m/ECC** ⭐ 228K | JavaScript
- Agent harness với performance optimization
- Hỗ trợ multi-platform: Claude Code, Codex, OpenCode, Cursor
- Skills + instincts + memory architecture

---

## 🔧 AI Infrastructure & Tooling

### Trending hôm nay

**davila7/claude-code-templates** ⭐ 274 hôm nay | Python
- CLI tool để config và monitor Claude Code
- Ecosystem tooling xung quanh Claude Code đang phát triển mạnh

**Nutlope/hallmark** ⭐ 155 hôm nay | CSS
- Anti-AI-slop design skill cho Claude Code, Cursor, Codex
- Trend: community đang build "skills" và "quality filters" cho AI output

### Search highlights

**langchain-ai/langchain** ⭐ 141K | Python
- Giữ vững vị trí "agent engineering platform"
- Đã pivot từ chain-of-thought sang agent-first

**firecrawl/firecrawl** ⭐ 149K | TypeScript
- API để search, scrape, interact với web at scale
- Critical infrastructure cho AI agents cần web access

**open-webui/open-webui** ⭐ 145K | Python  
- User-friendly interface cho Ollama, OpenAI API
- Xu hướng: self-hosted UI đang thay thế cloud dashboards

---

## 🧠 Models & Training

**ollama/ollama** ⭐ 176K | Go
- Hỗ trợ: Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, Qwen, Gemma
- Model ecosystem đang mở rộng với Chinese và multilingual models

**huggingface/transformers** ⭐ 162K | Python
- State-of-the-art cho text, vision, audio, multimodal
- Vẫn là standard framework cho model inference & training

---

## 📦 AI Applications

### Trading & Finance

**HKUDS/Vibe-Trading** ⭐ 768 hôm nay | Python
- "Your Personal Trading Agent"
- AI agents đang penetrate vertical markets như trading

**virattt/ai-hedge-fund** ⭐ 115 hôm nay | Python
- Complete AI Hedge Fund Team simulation
- 883 stars cho 2 trading repos → strong signal về financial AI

**ZhuLinsen/daily_stock_analysis** ⭐ 56K | Python
- Multi-market stock analysis với LLM
- Multi-source data + real-time news + auto notifications
- Cost-free scheduled runs

### Productivity & Work

**santifer/career-ops** ⭐ 59K | JavaScript
- AI job search: scan portals, score A-F, tailor CV
- Chạy local trong AI coding CLI
- Vertical AI automation đang solve real problems

**hugohe3/ppt-master** ⭐ 38K | Python
- Generate editable PowerPoint từ document
- Native shapes, animations, charts với editable data
- Không phải slide images → real productivity tool

### Knowledge Management

**siyuan-note/siyuan** ⭐ 45K | TypeScript
- Privacy-first, self-hosted personal knowledge management
- Written in TypeScript + Golang
- Trend: self-hosted knowledge tools với AI integration

**jaylfc/taOS** ⭐ 427 | Python
- Self-hosted AI agent OS
- Memory + chat + agents + files trên local hardware
- Offline by default, cloud by choice
- Auto-clustering across consumer hardware (Pi, Mac mini, gaming PC)

---

## 🔍 RAG & Knowledge Systems

**Shubhamsaboo/awesome-llm-apps** ⭐ 118K (408 hôm nay) | Python
- 100+ AI Agent & RAG apps có thể run ngay
- Community-driven collection với practical focus

**thedotmack/claude-mem** ⭐ 86K | JavaScript
- Persistent context across sessions cho mọi agent
- Captures → compresses với AI → injects vào future sessions
- Works với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot

**infiniflow/ragflow** ⭐ 84K | Go
- Leading open-source RAG engine
- Fuses RAG với Agent capabilities

**Graphify-Labs/graphify** ⭐ 83K | Python
- Turn bất kỳ folder nào thành queryable knowledge graph
- Code + SQL schemas + docs + papers + images + videos trong 1 graph
- AI coding assistant skill cho Claude Code, Codex, OpenCode

**headroomlabs-ai/headroom** ⭐ 58K | Python
- Compress outputs, logs, files, RAG chunks trước khi đến LLM
- 60-95% fewer tokens, same answers
- Library + proxy + MCP server

**mem0ai/mem0** ⭐ 60K | TypeScript
- Universal memory layer cho AI Agents
- Critical infrastructure piece

---

## 🔌 Embedded AI - NPU & Edge Computing

### RKLLM/RKNPU (Rockchip NPU)

**NotPunchnox/rkllama** ⭐ 572 | Python
- Ollama alternative cho Rockchip NPU
- Optimized NPU support cho AI/DL models trên RK devices
- Signal: community muốn Ollama-like UX cho embedded

**Qengineering/Qwen3-VL-2B-NPU** ⭐ 34 | C++
- Qwen3-VL-2B multimodal model trên RK3588 NPU
- VLM (vision-language) đang được port sang NPU

**Leon6225/InternVL3.5-4B-NPU** ⭐ 3 | C++
- InternVL3.5-4B cho RK3588 NPU
- Advance multimodal: vision + language understanding
- Trend: multimodal models đang land trên embedded NPU

**Hanzo-Huang/rk3576-home-assistant-voice** ⭐ 12 | Python
- Local Home Assistant voice stack cho RK3576
- NPU-accelerated Whisper + Piper qua Wyoming + openWakeWord + RKLLM
- Use case: smart home voice assistant hoàn toàn local

**gregordinary/ggml-rocket** ⭐ 5 | C++
- Drop-in ggml backend cho Rockchip NPUs
- Offload llama.cpp/whisper.cpp prefill lên RK3588 NPU
- Bridge giữa ggml ecosystem và Rockchip hardware

**fukumori/iwagumi** ⭐ 3 | C
- Open runtime drive RK3588 NPU directly
- Offload GGUF matmul qua ggml backend
- Apache-2.0 license

**oRKLLM/ork-driver** ⭐ 1 | C
- Clean-room userspace matmul library cho Rockchip NPU
- Community đang build open-source driver stack

### Orange Pi Ecosystem

**jaylfc/taOS** ⭐ 427 | Python
- (Đã nêu ở AI Applications)
- Chạy được trên Orange Pi, Raspberry Pi, Mac mini, gaming PC

**mack42/OrangePi5Pro** ⭐ 13 | Shell
- Ubuntu 26.04 cho Orange Pi 5 Pro / RK3588S
- Mainline kernel với Mali-G610 GPU + Vulkan (PanVK)
- RK3588 NPU trên 3 cores (multi-core, 800 MHz DVFS, ~558 inf/s)
- HW video decode (VA-API) + KDE Plasma
- Complete computing experience trên SBC

**YeWenxuan64/rktop** ⭐ 6 | Shell
- Real-time monitoring cho RK3588: CPU, NPU, GPU, RGA
- Bash script lightweight
- DevOps tool cho embedded AI

**jaylfc/taosmd** ⭐ 67 | Python
- Local-first AI memory
- Chạy offline trên any machine với 8 GB+ RAM (SBC, mini PC, laptop)
- Zero-loss verbatim archive + knowledge graph + hybrid retrieval
- Framework-agnostic, no cloud

---

## 🔮 Tín hiệu xu hướng nổi bật

### 1. **Safety-First Agent Tooling**
- Destructive command guard (444 stars) cho thấy cộng đồng đang nghiêm túc với agent safety
- Không còn chạy blind execution → cần guardrails và confirmation flows

### 2. **MCP Protocol Adoption**
- MCP servers cho Claude đang proliferate
- Trở thành de facto standard cho AI IDE extensions
- Desktop Commander, memory systems đều build trên MCP

### 3. **Local-First AI Movement**
- taOS (427 stars): self-hosted agent OS
- Orange Pi + NPU: complete AI stack chạy local
- Privacy và ownership đang thắng cloud convenience

### 4. **Multimodal trên Edge**
- VLM models (Qwen3-VL, InternVL3.5) đang được port sang NPU
- RK3588 có thể chạy vision-language models at scale
- Edge AI không còn limited to inference đơn giản

### 5. **AI Agents vào Vertical Markets**
- Trading agents (883 combined stars)
- Job search automation (59K stars)
- PPT generation (38K stars)
- Từ general-purpose → domain-specific solutions

### 6. **Context & Memory Infrastructure**
- 4 repos về memory/context trong top search (86K + 60K + 58K + 50K stars)
- Persistent memory across sessions là key differentiator
- Compression tech (60-95% token reduction) đang critical

### 7. **Open NPU Ecosystem**
- Community building open-source driver stack cho Rockchip
- ggml integration bridges với llama.cpp/whisper.cpp
- Clean-room implementations (iwagumi, ork-driver) để tránh licensing issues

---

## 💡 Tâm điểm cộng đồng

### Câu chuyện nổi bật nhất

**Destructive Command Guard** (444 stars) đánh vào pain point mà mọi người dùng AI agents đều gặp: sợ AI execute `rm -rf /` hoặc push code lên production nhầm. Đây là security layer mà ecosystem cần, và Rust implementation cho thấy performance là priority.

**Embedded AI Performance Breakthrough**: Orange Pi 5 Pro với Ubuntu 26.04 + mainline kernel giờ có full stack working: GPU + Vulkan, NPU 3-core 800MHz (~558 inf/s), HW video decode. Đây là milestone: SBC giờ có thể chạy complete AI workloads như desktop.

**Trading Agents Explosion**: 2 repos về trading agents gather 883 stars trong ngày → financial services đang là next frontier cho AI automation. Không phải chatbots, mà là actual decision-making agents với real money.

### Community sentiment

- **Urgency về safety**: 444 stars cho guard system trong 1 ngày
- **Distrust với cloud**: local-first, self-hosted projects đang outperform
- **Demand cho practical apps**: vertical solutions (trading, job search, PPT) >> general frameworks
- **NPU evangelism**: Rockchip community đang very active với driver development

---

## 🎬 Kết luận

13/07/2026 đánh dấu sự trưởng thành của AI agent ecosystem: từ "cool demos" sang "production-ready with safety". Embedded AI không còn là niche, mà đang become mainstream với complete software stacks. Vertical AI applications đang prove commercial viability, đặc biệt trong finance và productivity. 

Next wave sẽ là: **safety tooling**, **memory systems**, và **multimodal edge AI**.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*