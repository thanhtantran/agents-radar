# Xu hướng AI Mã nguồn mở 2026-09-18

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-18 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở — 2026-09-18

## 📊 Tóm tắt hôm nay

Ngày bùng nổ AI Agent infra. Code review agent (Alibaba), security audit agent (Cloudflare), browser automation (Tencent), research agent (alphaXiv). Anthropic ra Claude Code + knowledge work plugins. Skills & harness optimization (ECC, agent-skills) chiếm spotlight. Edge AI yên ắng, chủ yếu RKLLM/NPU tooling.

---

## 🗂 Top repos theo chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **affaan-m/ECC** (+1,171) — Agent harness performance optimization. Skills, instincts, memory, security. Hỗ trợ Claude Code, Codex, Opencode, Cursor
- **anthropics/claude-code** (+538) — Terminal-native agentic coding tool. Hiểu codebase, chạy task, giải thích code, xử lý git. Natural language commands
- **anthropics/knowledge-work-plugins** (+287) — Plugins cho Claude Cowork. Knowledge workers
- **cline/cline** (+380) — Autonomous coding agent dạng SDK, IDE extension, CLI assistant

**Search 7 ngày:**
- **NousResearch/hermes-agent** ⭐246K — "The agent that grows with you"
- **Significant-Gravitas/AutoGPT** ⭐187K — Accessible AI, tools để focus vào matters
- **zhayujie/CowAgent** ⭐47K — Super AI assistant & Agent Harness. Plan task, run tools/skills, self-evolve memory. Multi-agent, multi-model, multi-channel
- **HKUDS/nanobot** ⭐48K — Ultra-lightweight Python agent framework. WebUI, tools, memory, MCP, multi-agent workflows
- **Panniantong/Agent-Reach** ⭐83K — Cho agent đọc & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu. Zero API fees
- **career-ops-hq/career-ops** ⭐72K — AI job search. Scan portals, evaluate A-H report, tailor CV, track. Chạy local trong CLI (Claude Code, Codex, OpenCode...)
- **hugohe3/ppt-master** ⭐55K — AI turn doc/topic thành PowerPoint. Native shapes, transitions, audio narration, template support

### 🔧 AI Infrastructure

**Trending hôm nay:**
- **alibaba/open-code-review** (+3,286) — Hybrid code review tool. Deterministic pipelines + LLM Agent. Line-level comments, multi-language ruleset (NPE, thread-safety, XSS, SQL injection). OpenAI & Anthropic compatible
- **cloudflare/security-audit-skill** (+3,607) — Coding-agent skill cho multi-phase security audits. Verified, machine-readable findings
- **addyosmani/agent-skills** (+680) — Production-grade engineering skills cho AI coding agents
- **Tencent/BrowserSkill** (+1,302) — AI agents dùng real, logged-in browser. CLI + extension cho automation
- **alphaXiv/OpenResearch** (+939) — Turn coding agents thành research agents
- **n8n-io/n8n** (+281) — Fair-code workflow automation. Native AI capabilities, visual + custom code, 400+ integrations

**Search 7 ngày:**
- **firecrawl/firecrawl** ⭐182K — Web data API. Search, scrape, interact at scale
- **ollama/ollama** ⭐181K — Run Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma models
- **langchain-ai/langchain** ⭐147K — Agent engineering platform
- **DietrichGebert/ponytail** ⭐141K — Make agent think như laziest senior dev
- **thedotmack/claude-mem** ⭐94K — Persistent context across sessions. Capture sessions, compress, inject relevant context. Hỗ trợ Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode
- **headroomlabs-ai/headroom** ⭐73K — Compress tool outputs, logs, files, RAG chunks trước khi vào LLM. 20% fewer tokens coding agents, 60-95% fewer tokens JSON

### 🧠 Models & Training

**Trending hôm nay:**
- **jamiepine/voicebox** (+667) — Open-source AI voice studio. Clone, dictate, create
- **JustVugg/colibri** (+873) — Run frontier MoE models trên hardware hiện có. Pure C, zero deps, experts streamed từ disk

**Search 7 ngày:**
- **huggingface/transformers** ⭐166K — State-of-the-art ML models. Text, vision, audio, multimodal. Inference & training

### 📦 AI Applications

**Trending hôm nay:**
- **Tencent/WeKnora** (+1,125) — LLM knowledge platform. Raw documents → queryable RAG + autonomous reasoning agent + self-maintaining Wiki
- **abue-ammar/tinycast** (+739) — Tiny, native macOS launcher, hotkeys, clipboard history
- **roboflow/supervision** (+329) — Reusable computer vision tools
- **TencentCloud/Octop** (+367) — Smarter, self-hosted AI assistant. Multi-user, multi-agent
- **ever-co/ever-gauzy** (+470) — Open Business Management Platform (ERP/CRM/HRM/ATS/PM)
- **coder/coder** (+145) — Secure environments cho developers và agents

**Search 7 ngày:**
- **open-webui/open-webui** ⭐152K — User-friendly AI Interface (hỗ trợ Ollama, OpenAI API...)
- **CherryHQ/cherry-studio** ⭐52K — AI productivity studio. Smart chat, autonomous agents, 300+ assistants. Unified access frontier LLMs
- **bojieli/ai-agent-book** ⭐48K — "Hiểu AI Agent: Thiết kế & thực tiễn". Full text, PDF, code theo chương
- **siyuan-note/siyuan** ⭐46K — Open-source, privacy-first, self-hosted knowledge workspace. Người & AI agents làm việc cùng
- **Hmbown/Codewhale** ⭐41K — Open-source coding agent cho terminal. Rust. Community improvement
- **ZhuLinsen/daily_stock_analysis** ⭐65K — LLM stock analysis. Multi-market, real-time news, decision dashboard, auto notifications, zero-cost scheduled runs
- **jaylfc/taOS** ⭐536 — Self-hosted AI agent OS. Memory, chat, agents, files stay offline. Web desktop + app store. Auto-cluster Orange/Raspberry Pi, Mac mini, gaming PC

### 🔍 RAG & Knowledge

**Search 7 ngày:**
- **Shubhamsaboo/awesome-llm-apps** ⭐139K — 100+ AI Agents, Agent Skills, RAG Apps
- **infiniflow/ragflow** ⭐91K — Leading RAG engine. Fuse RAG + Agent capabilities
- **PaddlePaddle/PaddleOCR** ⭐90K — Turn PDF/image → structured data cho AI. Lightweight OCR toolkit. 100+ languages
- **datawhalechina/hello-agents** ⭐80K — "Xây dựng agent từ zero". Tutorial nguyên lý & thực hành
- **Mintplex-Labs/anything-llm** ⭐66K — Stop renting intelligence. Own it. Local-first agent experience
- **mem0ai/mem0** ⭐66K — Memory Layer cho AI Agents. Drop-in memory infra. Persistent context
- **run-llama/llama_index** ⭐52K — Document processing platform cho AI
- **jeecgboot/JeecgBoot** ⭐48K — Enterprise AI low-code platform. Generate system trong một câu. AI Skills: draw flow, design form, generate report, dashboard. AI chat, knowledge base, flow orchestration, MCP plugins

### 🔌 Embedded AI

**Trending hôm nay:**
Yên ắng. Ghidra (+912) là outlier (reverse engineering framework, không phải AI).

**Search — rkllm:**
- **darkautism/rkllm-rs** ⭐11 — rkllm Rust FFI binding
- **freed-dev-llc/terraform-provider-turingpi** ⭐7 — Terraform provider cho Turing Pi 2.5 BMC
- **Leon6225/InternVL3.5-4B-NPU** ⭐5 — InternVL3.5-4B cho RK3588 NPU. Vision & language
- **Hanzo-Huang/rkllm3-docker** ⭐1 — Docker cho RKNN3 LLM models (RK1820, RK1828)

**Search — rknpu:**
- **jaylfc/taOS** ⭐536 (cũng trong ai-agent) — Self-hosted agent OS. Auto-cluster Orange/Raspberry Pi
- **dnhkng/open-rknpu** ⭐2 — Open compiler + libc-only runtime cho RV1103/RV1106 NPU. Không vendor SDK, không RKNN library
- **ruisv/rcdl** ⭐0 — RKNPU inference & media library (C++17 + Python). NPU inference, RGA preprocessing, MPP codecs, zero-copy pipelines

**Search — orangepi:**
- **MichaIng/DietPi** ⭐6.3K — Lightweight cho SBC
- **RaspAP/raspap-webgui** ⭐5.2K — Full-featured wireless router setup
- **orangepi-xunlong/orangepi-build** ⭐1.2K — Build cho H2+, H3, H5, H6, H616, RK3328, RK3399, RK3588
- **jaylfc/taosmd** ⭐79 — Local-first AI memory. Offline 8GB+ RAM. Zero-loss archive, knowledge graph, hybrid retrieval
- **nouverse/nouride-releases** ⭐9 — Lightweight multi-agent AI engine. Single daemon. Homelab-friendly (Raspberry Pi, Orange Pi, Geekom, NUC, LXC)
- **LingZhen07/ros2-stm32-autonomous-robot** ⭐9 — ROS 2 + STM32 autonomous mobile robot. CAN FD, RPLIDAR, SLAM, navigation trên Orange Pi AI Pro

---

## 🔥 Phân tích tín hiệu xu hướng

### 1. Agent Skills & Harness Optimization lên ngôi
Không chỉ agent framework, giờ cộng đồng tập trung vào **skills** (production-grade engineering skills, security audit skills, research skills) và **harness optimization** (ECC cho performance, claude-mem cho persistent context, headroom cho compression). Đây là layer standardization bên trên raw agent frameworks.

### 2. Terminal-native & Local-first Agents
Claude Code (Anthropic), Codewhale (Rust), cline (SDK/IDE/CLI) đều push terminal-native experience. Parallel: local-first memory (claude-mem, taosmd), local-first agent OS (taOS). Privacy & offline capability lên giá.

### 3. Hybrid Architecture = Tương lai Code Review & Security
Alibaba open-code-review kết hợp deterministic pipelines + LLM Agent. Cloudflare security-audit-skill cũng multi-phase với verified findings. Pattern: rule-based precision + LLM flexibility.

### 4. Multi-Agent Systems đi production
WeKnora (Tencent) biến docs thành RAG + autonomous reasoning agent + Wiki. Octop (TencentCloud) multi-user, multi-agent. Nanobot framework WebUI + multi-agent workflows. Agents không còn đơn lẻ, thành teams.

### 5. Edge AI vẫn niche nhưng có hardcore community
RKLLM/RKNPU không viral nhưng có steady progress: open-rknpu (no vendor SDK), rkllm-rs (Rust FFI), taOS (auto-cluster SBCs). Nouride-releases (lightweight multi-agent daemon cho mini devices) là điểm sáng.

### 6. Context Compression = Critical Infra
Headroom (compress trước LLM, 20-95% fewer tokens) và claude-mem (compress session context) cho thấy context management là bottleneck. Agents chạy dài cần compression, không thì token cost phát nổ.

### 7. Browser Automation Skills
Tencent BrowserSkill và Agent-Reach (read Twitter, Reddit, YouTube, GitHub...) cho agents "eyes to see internet". Web access không còn qua APIs mà qua real browser hoặc scraping. 

### 8. Career/Job Search Automation
Career-ops (72K stars) AI scan job portals, evaluate, tailor CV. Vertical use case đủ lớn để spawn dedicated tools.

### 9. Knowledge Work Plugins
Anthropic knowledge-work-plugins riêng category. Signals: AI không chỉ code, còn knowledge work tasks (research, writing, analysis).

### 10. Low-Code AI Platforms
JeecgBoot (48K stars) "một câu generate cả hệ thống". AI Skills draw flow, design form, generate report. Low-code + AI = tương lai enterprise automation.

---

## 🎯 Tâm điểm cộng đồng

### 🏆 Alibaba open-code-review (+3,286)
Battle-tested at Alibaba scale. Hybrid architecture = best of both worlds (rules + LLM). Multi-language ruleset (NPE, thread-safety, XSS, SQL injection) = immediate value.

### 🏆 Cloudflare security-audit-skill (+3,607)
Security audit là hard problem. Multi-phase + independently verified findings = trust. Coding-agent skill format = plug-and-play.

### 🏆 Tencent BrowserSkill (+1,302)
Real browser automation = killer feature. CLI + extension = versatile. "Without interrupting your work" = UX win.

### 🏆 ECC (+1,171)
Agent harness performance optimization = niche critical. Skills, instincts, memory, security = comprehensive. Support nhiều tools (Claude Code, Codex, Opencode, Cursor) = wide adoption potential.

### 🏆 Tencent WeKnora (+1,125)
Raw docs → RAG + agent + Wiki = full knowledge lifecycle. Self-maintaining = automation dream. Open-source từ Tencent = enterprise credibility.

### 🏆 JustVugg/colibri (+873)
Run frontier MoE models trên hardware hiện có. Pure C, zero deps, experts streamed từ disk = technical marvel. Tiny engine, immense model = democratizing AI.

### 🏆 Career-ops (72K stars search)
AI job search automation = relatable pain point. Open-source + runs local in CLI = privacy + free. A-H report với global score = structured decision-making.

### 🏆 thedotmack/claude-mem (94K stars search)
Persistent context across sessions = game-changer. Hỗ trợ nhiều agents = framework-agnostic. Context là limiting factor, này là solution.

### 🏆 Headroom (73K stars search)
20% fewer tokens coding agents, 60-95% fewer tokens JSON = ROI rõ ràng. Library, proxy, MCP server = flexible deployment.

---

**Kết luận:** Ngày hôm nay agents không còn ở giai đoạn "build framework", đã chuyển sang "optimize harness", "standardize skills", và "compress context". Hybrid architectures (rules + LLM) thắng trong production (code review, security audit). Local-first và terminal-native = trend mạnh. Edge AI yên nhưng hardcore community vẫn build.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*