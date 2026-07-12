# Xu hướng AI Mã nguồn mở 2026-07-12

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-12 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 12/07/2026

## 📊 Tóm tắt hôm nay

Ngày 12/07/2026 chứng kiến sự bùng nổ của **agent frameworks và tooling ecosystems**. Điểm nổi bật là sự xuất hiện hàng loạt công cụ tối ưu hóa cho các AI coding assistants như Claude Code, cùng với xu hướng mạnh mẽ về **edge AI và NPU acceleration** trên các thiết bị nhúng. RAG và knowledge management tiếp tục là trọng tâm, với nhiều giải pháp persistent memory cho agents.

**Con số ấn tượng**: 
- 🔥 909 stars cho DesktopCommanderMCP (MCP server cho Claude)
- 🚀 774 stars cho pgrust (Postgres viết lại bằng Rust)
- 💪 740 stars cho superpowers (agentic skills framework)

---

## 🤖 AI Agents

### **Frameworks & Systems**

**🌟 wonderwhy-er/DesktopCommanderMCP** (+909 ⭐)
- MCP server cấp cho Claude khả năng điều khiển terminal, tìm kiếm filesystem và chỉnh sửa file với diff
- TypeScript implementation, tích hợp sâu với desktop workflows

**🎯 obra/superpowers** (+740 ⭐)
- Agentic skills framework với methodology cho software development
- Shell-based, tập trung vào developer experience

**🚀 NousResearch/hermes-agent** (213K ⭐)
- "The agent that grows with you" - Python-based agent framework
- Top search result cho chủ đề ai-agent

**🔧 santifer/career-ops** (59K ⭐)
- AI job search agent: scan portals, score A-F, tailor CV, track applications
- Chạy local trong AI coding CLIs (Claude Code, Gemini, Codex...)

**📈 ZhuLinsen/daily_stock_analysis** (56K ⭐)
- Multi-market stock analysis với LLM: multi-source data, real-time news, decision dashboard
- Hỗ trợ zero-cost scheduled runs

**👁️ Panniantong/Agent-Reach** (54K ⭐)
- "Give your AI agent eyes" - read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- One CLI, zero API fees

**💎 CherryHQ/cherry-studio** (48K ⭐)
- AI productivity studio: smart chat, autonomous agents, 300+ assistants
- TypeScript, unified access to frontier LLMs

**🐮 zhayujie/CowAgent** (45K ⭐)
- Open-source super AI assistant: plans, runs tools/skills, self-evolves với memory
- Multi-model, multi-channel, lightweight (formerly chatgpt-on-wechat)

**🤖 HKUDS/nanobot** (45K ⭐)
- Lightweight, open-source AI agent cho tools, chats, workflows

---

## 🔧 AI Infrastructure

### **Developer Tools & CLIs**

**⚡ affaan-m/ECC** (228K ⭐)
- Agent harness performance optimization: skills, instincts, memory, security
- Research-first development cho Claude Code, Codex, Opencode, Cursor

**🎨 davila7/claude-code-templates** (+232 ⭐)
- CLI tool for configuring and monitoring Claude Code
- Python-based configuration management

**🛠️ google-labs-code/stitch-skills** (+340 ⭐)
- Library of Agent Skills cho Stitch MCP server
- TypeScript, tuân thủ Agent Skills open standard
- Compatible với Antigravity, Gemini CLI, Claude Code, Cursor

**📝 hugohe3/ppt-master** (38K ⭐)
- AI generates real, editable PowerPoint: native shapes, animations, charts, tables
- Speaker notes + audio narration, template support

**🔗 CopilotKit/CopilotKit** (35K ⭐)
- Frontend Stack for Agents & Generative UI
- React, Angular, Mobile, Slack support - makers of AG-UI Protocol

### **Infrastructure & Deployment**

**🏗️ hashicorp/terraform** (+229 ⭐)
- Infrastructure as Code leader, vẫn trending mạnh
- Go-based, declarative configuration

**⚡ oven-sh/bun** (+658 ⭐)
- Fast JavaScript runtime, bundler, test runner, package manager - all in one
- Rust-based, vượt trội về performance

**🏡 home-assistant/core** (+80 ⭐)
- Open source home automation với local control & privacy
- Python, 80 stars growth cho thấy integration với AI agents

---

## 🧠 Models & Training

**🔥 malisper/pgrust** (+774 ⭐)
- **Postgres rewritten in Rust**, passing 100% regression tests
- Breakthrough trong database systems, performance potential lớn

**🤗 huggingface/transformers** (162K ⭐)
- State-of-the-art ML models framework
- Text, vision, audio, multimodal - both inference & training

**📚 rasbt/LLMs-from-scratch** (98K ⭐)
- Implement ChatGPT-like LLM in PyTorch từ đầu
- Jupyter Notebook-based educational resource

**⚡ vllm-project/vllm** (85K ⭐)
- High-throughput, memory-efficient inference & serving engine
- Python-based, critical infrastructure cho LLM deployment

---

## 📦 AI Applications

### **Platforms & Solutions**

**🎯 langgenius/dify** (148K ⭐)
- Production-ready platform for agentic workflow development
- TypeScript, enterprise-grade

**🌐 open-webui/open-webui** (145K ⭐)
- User-friendly AI Interface (Ollama, OpenAI API support)
- Python-based web interface

**📱 siyuan-note/siyuan** (45K ⭐)
- Privacy-first, self-hosted personal knowledge management
- TypeScript + Golang, fully open source

**🎨 DayuanJiang/next-ai-draw-io** (+81 ⭐)
- Next.js app integrating AI với draw.io diagrams
- Natural language commands cho diagram creation

### **Testing & Development**

**✅ catchorg/Catch2** (+113 ⭐)
- Modern C++-native test framework (C++14, C++17, later)
- TDD and BDD support

**🧪 cypress-io/cypress** (+19 ⭐)
- Fast, reliable testing cho browser applications
- TypeScript-based end-to-end testing

---

## 🔍 RAG & Knowledge

**🧠 thedotmack/claude-mem** (86K ⭐)
- **Persistent Context Across Sessions** cho mọi agent
- Captures, compresses với AI, injects context vào future sessions
- JavaScript, works với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot

**📊 Graphify-Labs/graphify** (82K ⭐)
- AI coding assistant skill: turn code/SQL/docs/videos thành queryable knowledge graph
- Python, app code + database schema + infrastructure trong một graph

**🔥 infiniflow/ragflow** (84K ⭐)
- Leading open-source RAG engine fusing RAG với Agent capabilities
- Go-based, superior context layer cho LLMs

**🔗 langchain-ai/langchain** (141K ⭐)
- Agent engineering platform
- Python, de facto standard cho RAG applications

**📚 Shubhamsaboo/awesome-llm-apps** (118K ⭐)
- 100+ AI Agent & RAG apps bạn có thể chạy
- Python, clone-customize-ship approach

**🌊 Mintplex-Labs/anything-llm** (63K ⭐)
- "Stop renting your intelligence. Own it"
- JavaScript, local-first agent experience

**💾 mem0ai/mem0** (60K ⭐)
- Universal memory layer for AI Agents
- TypeScript implementation

**🤖 datawhalechina/hello-agents** (65K ⭐)
- Tutorial "从零开始构建智能体" (Building Agents from Zero)
- Python, Chinese language educational content

---

## 🔌 Embedded AI & Edge Computing

### **🎯 RKLLM/RKNPU - Rockchip NPU Ecosystem**

**🚀 NotPunchnox/rkllama** (572 ⭐)
- Ollama alternative for Rockchip NPU
- Python, efficient AI/DL models trên Rockchip với NPU support

**👁️ Qengineering/Qwen3-VL-2B-NPU** (34 ⭐)
- Qwen3-VL-2B running on RK3588 NPU
- C++ implementation cho vision-language models

**🏠 Hanzo-Huang/rk3576-home-assistant-voice** (10 ⭐)
- Local Home Assistant voice stack cho RK3576
- NPU-accelerated Whisper + Piper qua Wyoming, plus openWakeWord + RKLLM

**🌌 Leon6225/InternVL3.5-4B-NPU** (3 ⭐)
- Advanced multimodal AI với InternVL3.5-4B cho RK3588 NPU
- C++, vision and language understanding

**🐋 Hanzo-Huang/rkllm-docker** (0 ⭐, mới)
- Dockerized RKLLM runtime serving Rockchip NPU models
- OpenAI-compatible API

**📊 YeWenxuan64/rktop** (6 ⭐)
- Lightweight Bash script monitoring RK3588: CPU, NPU, GPU, RGA performance
- Terminal-based real-time monitoring

**🔧 gregordinary/rocket-userspace** (5 ⭐)
- Userspace driver, matmul, on-NPU op library cho Rockchip NPUs
- Via mainline rocket DRM-accel driver

**⚡ gregordinary/ggml-rocket** (4 ⭐)
- Drop-in ggml backend for Rockchip NPUs
- C++, offloads llama.cpp/whisper.cpp prefill to RK3588 NPU

**🎯 fukumori/iwagumi** (3 ⭐)
- Open runtime driving RK3588 NPU directly
- Offloading GGUF matmul through ggml backend, Apache-2.0

### **🍊 Orange Pi Projects**

**🖥️ jaylfc/taOS** (424 ⭐)
- **Self-hosted AI agent OS**: memory, chat, agents, files trên hardware bạn own
- Offline AI memory (taOSmd), multi-framework group chat, web desktop + app store
- Auto-clustering across Orange/Raspberry Pi, Mac mini, gaming PC

**💾 jaylfc/taosmd** (66 ⭐)
- Local-first AI memory: runs offline trên any machine 8GB+ RAM
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval
- Framework-agnostic, no cloud

**🌟 mack42/OrangePi5Pro** (13 ⭐)
- Ubuntu 26.04 cho Orange Pi 5 Pro / RK3588S
- Mainline kernel: Mali-G610 GPU + Vulkan (PanVK), RK3588 NPU inference (330 fps @ 800 MHz)
- HW video decode (VA-API), KDE Plasma

**🔧 MichaIng/DietPi** (6,144 ⭐)
- Lightweight justice for single-board computers
- Shell-based, widely supported

**📡 RaspAP/raspap-webgui** (5,193 ⭐)
- Easiest full-featured wireless router setup cho Debian devices
- PHP-based web interface

---

## 💡 Phân tích tín hiệu xu hướng

### **1. 🎯 Agent Infrastructure Maturation**

Ecosystem xung quanh AI coding assistants đang standardize nhanh:
- **MCP (Model Context Protocol)** emerging as standard (DesktopCommanderMCP, stitch-skills)
- **Agent Skills open standard** gaining adoption (stitch-skills compatible với nhiều platforms)
- **Persistent memory across sessions** trở thành must-have (claude-mem, mem0, taosmd)

### **2. 🔄 Local-First & Self-Hosted Movement**

Strong pushback against cloud dependency:
- "Stop renting your intelligence" (anything-llm)
- Offline-by-default architectures (taOS, taosmd)
- Zero API fees approaches (Agent-Reach, career-ops)
- Privacy-first designs (siyuan-note)

### **3. ⚡ Edge AI Acceleration**

Rockchip NPU ecosystem bùng nổ:
- **RKLLM** đang trở thành standard runtime cho Rockchip
- Mainline kernel support (rocket driver) mở đường cho production adoption
- NPU-accelerated LLM inference becoming viable (330 fps @ 800 MHz)
- Multi-modal models (vision-language) chạy được trên edge (Qwen3-VL, InternVL3.5)

### **4. 🔧 Developer Tooling Consolidation**

Tools tối ưu hóa agent performance:
- Performance optimization frameworks (ECC)
- Configuration management (claude-code-templates)
- Multi-platform compatibility layers (CopilotKit)
- Test automation (Catch2, Cypress trending)

### **5. 🧠 Knowledge Graph Renaissance**

RAG evolution sang structured knowledge:
- Code + schema + infrastructure in one graph (Graphify)
- Queryable knowledge bases from any content type
- Hybrid retrieval systems (vector + graph)

### **6. 🦀 Rust trong Infrastructure**

Rust rewrites gaining serious traction:
- **pgrust**: Postgres passing 100% regression tests
- **bun**: JavaScript tooling performance breakthrough
- vllm, oven-sh/bun showing Rust advantage trong high-performance systems

---

## 🎪 Tâm điểm cộng đồng

### **🔥 Hot Debates**

1. **pgrust (+774)**: Community excited về Postgres rewrite - performance implications massive
2. **superpowers (+740)**: "Methodology that works" - developers resonating với opinionated frameworks
3. **DesktopCommanderMCP (+909)**: Desktop control cho agents - enabling new use cases

### **🌊 Emerging Patterns**

**Agent-First Development**:
- Tools building FOR agents, not just WITH agents
- Agents as first-class citizens trong development workflows
- MCP standardization accelerating integration

**Hardware Democratization**:
- Orange Pi, Rockchip NPU making edge AI accessible
- Complete stacks (OS + runtime + tools) for SBCs
- Auto-clustering turning consumer hardware thành compute clusters

**Knowledge as Infrastructure**:
- Persistent memory systems
- Knowledge graphs for code understanding
- Context management across sessions

### **🎯 Developer Sentiment**

Strongest themes:
- **Autonomy**: "Own your intelligence", local-first, self-hosted
- **Performance**: Rust rewrites, NPU acceleration, optimization frameworks
- **Integration**: Multi-platform support, open standards, compatibility layers
- **Simplicity**: One-line installs, zero API fees, "methodology that works"

---

## 🎬 Kết luận

Ngày 12/07/2026 đánh dấu sự trưởng thành của **agent infrastructure ecosystem**. Xu hướng rõ ràng: developers muốn **own & control** AI systems của họ, chạy local, với persistent memory và knowledge graphs. Edge AI không còn là future - nó là present, với complete toolchains cho Rockchip NPUs.

**Next to watch**: MCP adoption rate, edge AI performance benchmarks, và Rust infrastructure rewrites.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*