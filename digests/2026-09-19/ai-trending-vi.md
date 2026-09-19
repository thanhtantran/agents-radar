# Xu hướng AI Mã nguồn mở 2026-09-19

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-19 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-09-19

## 1. Tóm tắt hôm nay

Ngày hôm nay đánh dấu bước ngoặt trong AI agents: từ proof-of-concept sang production tooling. Ba big tech (Cloudflare, Anthropic, Alibaba) cùng ship công cụ coding agent chất lượng production. Chủ đề chính: security audit, code review, browser automation, agent optimization framework. Edge AI tiếp tục phát triển với RK3588 NPU tooling và self-hosted agent systems cho SBC.

## 2. Top repos theo chiều

### 🤖 AI Agents

**Trending hôm nay:**

- **anthropics/claude-code** (+444⭐) - Terminal agentic coding tool, hiểu codebase, xử lý git workflows qua natural language
- **affaan-m/ECC** (+958⭐ / 262K total) - Agent harness performance optimization. Skills, instincts, memory cho Claude Code, Codex, Cursor
- **NousResearch/hermes-agent** (247K⭐) - "The agent that grows with you" - self-evolving agent framework
- **career-ops-hq/career-ops** (72K⭐) - AI job search: scan portals, evaluate listings A-H, tailor CV, track applications
- **zhayujie/CowAgent** (47K⭐) - Open-source super AI assistant. Plans tasks, runs tools, self-evolves với memory và knowledge

**Trending 7 ngày:**

- **Panniantong/Agent-Reach** (83K⭐) - Give agent eyes to see internet: Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- **ZhuLinsen/daily_stock_analysis** (65K⭐) - LLM-driven multi-market stock analysis với multi-source data, real-time news, decision dashboard
- **HKUDS/nanobot** (48K⭐) - Ultra-lightweight, self-hosted personal AI agent framework với WebUI, tools, memory, MCP

### 🔧 AI Infrastructure

**Trending hôm nay:**

- **cloudflare/security-audit-skill** (+3006⭐) - Coding-agent skill cho multi-phase security audits với machine-readable findings
- **alibaba/open-code-review** (+2704⭐) - Hybrid code review tool: deterministic pipelines + LLM Agent. Precise line-level comments, built-in ruleset (NPE, thread-safety, XSS, SQL injection)
- **Tencent/BrowserSkill** (+1306⭐) - Let AI agents dùng real, logged-in browser không interrupt work. CLI + extension
- **addyosmani/agent-skills** (+675⭐) - Production-grade engineering skills cho AI coding agents
- **TencentCloud/Octop** (+569⭐) - Smarter, self-hosted AI assistant — multi-user, multi-agent
- **coder/coder** (+478⭐) - Secure environments cho developers và agents

**Trending 7 ngày:**

- **thedotmack/claude-mem** (94K⭐) - Persistent context across sessions. Captures everything agent làm, compresses với AI, injects vào future sessions
- **headroomlabs-ai/headroom** (73K⭐) - Compress tool outputs, logs, files, RAG chunks trước khi reach LLM. 20% ít tokens cho coding agents

### 🧠 Models & Training

- **ollama/ollama** (181K⭐) - Get up and running với Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma
- **huggingface/transformers** (166K⭐) - State-of-the-art ML models cho text, vision, audio, multimodal

### 📦 AI Applications

**Trending hôm nay:**

- **Fission-AI/OpenSpec** (+296⭐) - Spec-driven development (SDD) cho AI coding assistants
- **anthropics/knowledge-work-plugins** (+299⭐) - Open source plugins cho knowledge workers trong Claude Cowork
- **supermemoryai/supermemory** (+140⭐) - Memory and context engine cực nhanh, scalable, chạy fully locally
- **tradesdontlie/tradingview-mcp** (+79⭐) - AI-assisted TradingView chart analysis — connect Claude Code tới TradingView Desktop
- **ahmedkhaleel2004/gitdiagram** (+152⭐) - Free, simple, fast interactive diagrams cho bất kỳ GitHub repo nào
- **asciimoo/hister** (+889⭐) - Your own search engine

**Trending 7 ngày:**

- **hugohe3/ppt-master** (55K⭐) - AI turns documents/topics thành native PowerPoint decks với shapes, transitions, animations, charts, audio narration
- **CherryHQ/cherry-studio** (52K⭐) - AI productivity studio với smart chat, autonomous agents, 300+ assistants
- **bojieli/ai-agent-book** (49K⭐) - 《深入理解 AI Agent：设计原理与工程实践》full book + code
- **siyuan-note/siyuan** (46K⭐) - Open-source, privacy-first, self-hosted knowledge workspace nơi humans và AI agents work together
- **Hmbown/Codewhale** (41K⭐) - Open-source coding agent cho terminal, built in Rust

### 🔍 RAG & Knowledge

**Trending 7 ngày:**

- **Shubhamsaboo/awesome-llm-apps** (139K⭐) - 100+ AI Agents, Agent Skills và RAG Apps
- **infiniflow/ragflow** (91K⭐) - Leading open-source RAG engine fuses cutting-edge RAG với Agent capabilities
- **PaddlePaddle/PaddleOCR** (90K⭐) - Turn PDF/image document thành structured data cho AI. Lightweight OCR toolkit, 100+ languages
- **datawhalechina/hello-agents** (80K⭐) - 《从零开始构建智能体》tutorial
- **Mintplex-Labs/anything-llm** (66K⭐) - Own your intelligence. Powerful local-first agent experience
- **mem0ai/mem0** (66K⭐) - The Memory Layer for AI Agents - drop-in memory infrastructure
- **run-llama/llama_index** (52K⭐) - Document processing platform cho AI
- **jeecgboot/JeecgBoot** (48K⭐) - 企业级AI低代码平台 với AI Skills: một câu vẽ flow, design form, generate report, dashboard

### 🔌 Embedded AI

**RKLLM (7 ngày):**

- **darkautism/rkllm-rs** (11⭐) - rkllm rust ffi binding
- **Leon6225/InternVL3.5-4B-NPU** (5⭐) - InternVL3.5-4B cho RK3588 NPU, multimodal AI
- **Hanzo-Huang/rkllm3-docker** (1⭐) - Run và package RKNN3 LLM models cho RK1820/RK1828 accelerators với Docker
- **ambagesthickskin162/Qwen3.5-4B-NPU** (0⭐) - Deploy Qwen3.5-4B lên NPU hardware

**RKNPU (7 ngày):**

- **jaylfc/taOS** (538⭐) - Self-hosted AI agent OS. Memory, chat, agents, files stay on hardware you own, offline by default
- **dnhkng/open-rknpu** (2⭐) - Open compiler và libc-only runtime cho RV1103/RV1106 NPU - no vendor SDK
- **ruisv/rcdl** (1⭐) - RKNPU inference & media library cho RK3588/RK3576/RK356x - NPU inference, RGA preprocessing, MPP codecs
- **gclawes/rockchip-dra-driver** (1⭐) - Kubernetes DRA driver cho RK3588 GPU/NPU
- **gjing1st/rk3588-device-plugin** (0⭐) - K8s device plugin cho RK3588/RK3588S NPU, sysfs auto-detection

**Orange Pi (7 ngày):**

- **jaylfc/taosmd** (79⭐) - Local-first AI memory — runs offline trên bất kỳ machine nào 8GB+ RAM (SBC, mini PC, laptop)
- **nouverse/nouride-releases** (9⭐) - Lightweight multi-agent AI engine trong single daemon cho homelab và mini devices (Pi, Orange Pi, NUC)
- **LingZhen07/ros2-stm32-autonomous-robot** (9⭐) - ROS 2 + STM32 autonomous robot với CAN FD, RPLIDAR, SLAM trên Orange Pi AI Pro

## 3. Phân tích tín hiệu xu hướng

### 🔥 Big Tech shipping production agent tooling

Ba big tech cùng lúc release công cụ coding agent production-grade:
- **Cloudflare** - security-audit-skill với machine-readable findings
- **Anthropic** - claude-code terminal tool + knowledge-work-plugins
- **Alibaba** - open-code-review hybrid deterministic + LLM
- **Tencent** - BrowserSkill cho browser automation

Signal: AI agents chuyển từ research/toy projects sang enterprise tooling. Focus vào **security**, **code review**, **structured output**.

### 🧠 Agent optimization là bottleneck mới

- **ECC** (262K⭐) - agent harness performance optimization system
- **claude-mem** (94K⭐) - persistent context across sessions
- **headroom** (73K⭐) - compress outputs trước khi reach LLM

Pattern: Agent capabilities đã đủ. Performance, memory, context management là pain points tiếp theo.

### 🏠 Self-hosted, local-first movement

- **taOS** - self-hosted AI agent OS offline by default
- **nanobot** - ultra-lightweight self-hosted framework
- **CowAgent** - lightweight, extensible, one-line install
- **anything-llm** - "Stop renting your intelligence. Own it"

Trend: Privacy-conscious users muốn control data, run offline. SBC (Raspberry Pi, Orange Pi) là target hardware.

### 🔌 Edge AI maturity trên Rockchip NPU

RKLLM/RKNPU ecosystem phát triển mạnh:
- **darkautism/rkllm-rs** - Rust FFI binding
- **open-rknpu** - open compiler không cần vendor SDK
- **rcdl** - inference & media library
- **K8s device plugins** cho RK3588

Signal: Rockchip RK3588/RK3576 NPU becoming serious edge AI platform. Tooling chuyển từ vendor lock-in sang open alternatives.

### 📊 Spec-driven development cho AI

- **OpenSpec** - SDD cho AI coding assistants
- **open-code-review** - structured, machine-readable findings
- **gitdiagram** - interactive diagrams cho repos

Pattern: AI cần structured I/O, không phải free-form text. Specs, schemas, machine-readable formats giúp AI reliable hơn.

### 🔒 Security-first agent design

- **cloudflare/security-audit-skill** - multi-phase audits
- **alibaba/open-code-review** - built-in ruleset NPE, XSS, SQL injection
- **coder/coder** - secure environments cho agents

Big tech worry về security khi AI agents có quyền execute code, access systems.

## 4. Tâm điểm cộng đồng

### 🏆 Viral repos hôm nay

1. **cloudflare/security-audit-skill** (+3006⭐) - Đứng đầu trending. Security audit là killer use case cho coding agents.
2. **alibaba/open-code-review** (+2704⭐) - Alibaba open-source code review tool với hybrid architecture.
3. **Tencent/BrowserSkill** (+1306⭐) - Browser automation không interrupt user work.

### 💡 Emerging stars

- **ECC** (262K⭐) - Agent optimization system đang viral. Community recognize agent performance là real problem.
- **thedotmack/claude-mem** (94K⭐) - Persistent context solution thu hút massive attention. Memory management critical cho agents.
- **career-ops-hq/career-ops** (72K⭐) - Practical application: AI job search với structured workflow.

### 🔮 Repos đáng follow

- **jaylfc/taOS** (538⭐) - Self-hosted AI agent OS cho homelab. Architecture vision compelling.
- **bojieli/ai-agent-book** (49K⭐) - Comprehensive book về AI agent design principles và engineering practices.
- **Hmbown/Codewhale** (41K⭐) - Rust-based coding agent, community-driven improvement.
- **dnhkng/open-rknpu** (2⭐) - Open compiler cho Rockchip NPU. Small star count nhưng significant technical achievement.

### 📈 Momentum builders

Repos tăng trưởng nhanh 7 ngày:
- **Panniantong/Agent-Reach** (83K⭐) - Agent content fetching
- **ZhuLinsen/daily_stock_analysis** (65K⭐) - LLM stock analysis
- **hugohe3/ppt-master** (55K⭐) - AI PowerPoint generation

Vertical applications (finance, productivity, content creation) leverage agent capabilities thành products hữu dụng.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*