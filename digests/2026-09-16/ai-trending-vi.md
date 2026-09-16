# Xu hướng AI Mã nguồn mở 2026-09-16

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-16 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 16/09/2026

## 🔥 Tóm tắt hôm nay

Edge AI đang bùng nổ: NPU inference engines, MoE streaming, voice cloning local-first. AI agents hợp nhất: code review, research, multi-agent orchestration. Infrastructure đơn giản hóa: zero-deps C engines, unified LLM APIs, context compression. Self-hosted đánh bại cloud: CRM, knowledge base, desktop OS đều chạy local.

---

## 📊 Top repos theo chiều

### 🤖 AI Agents

**alibaba/open-code-review** ⭐ +2,756  
Go | Hybrid: deterministic + LLM. Code review tại Alibaba scale. NPE, thread-safety, XSS, SQL injection built-in. OpenAI/Anthropic compatible.

**alphaXiv/OpenResearch** ⭐ +531  
Rust | Coding agents → research agents. Tool để agents nghiên cứu.

**pacifio/atlas** ⭐ +91  
Rust | Source control cho agents. Track changes từ nhiều coding agents cùng lúc, query tập trung.

**addyosmani/agent-skills** ⭐ +307  
JavaScript | Production engineering skills cho AI coding agents.

**earendil-works/pi** ⭐ +458  
TypeScript | Agent toolkit: unified LLM API, agent loop, TUI, coding agent CLI.

**NousResearch/hermes-agent** ⭐ 245,889  
Python | Agent học hỏi và phát triển.

**Panniantong/Agent-Reach** ⭐ 82,075  
Python | Agent có mắt nhìn internet: Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu. Zero API fees.

**career-ops-hq/career-ops** ⭐ 71,740  
JavaScript | AI job search: scan portals, A-H report + global 1-5 score, CV tailor, tracking. Local trong AI CLI.

**zhayujie/CowAgent** ⭐ 46,988  
Python | Super AI assistant. Plans, runs tools/skills, self-evolves với memory/knowledge. Multi-agent, multi-model, multi-channel. Lightweight, one-line install.

**HKUDS/nanobot** ⭐ 48,196  
Python | Ultra-lightweight personal AI agent: WebUI, tools, memory, MCP, multi-agent workflows, automation. Self-hosted.

**bojieli/ai-agent-book** ⭐ 47,655  
Python | Sách《深入理解 AI Agent》: thiết kế + thực hành kỹ thuật. Full book + code.

### 🔧 AI Infrastructure

**JustVugg/colibri** ⭐ +2,026  
C | MoE models trên hardware có sẵn. Pure C, zero deps, experts stream từ disk. Tiny engine, immense model.

**debpalash/VoiceStudio** ⭐ +2,072  
Python | Local ElevenLabs alternative: voice cloning, voice design, video dubbing, dictation, transcription, audiobook creation. 646 languages.

**Homebrew/BrewUI** ⭐ +271  
Swift | Homebrew macOS GUI chính thức.

**danny-avila/LibreChat** ⭐ +254  
TypeScript | Enhanced ChatGPT Clone: Agents, MCP, Skills, DeepSeek, Anthropic, AWS, OpenAI. Multi-user, self-hosted.

**tonhowtf/omniget** ⭐ +258  
Rust | Download Udemy, Hotmart, YouTube, music, books. 1,800+ sites, no terminal. Desktop app + player + reader.

**affaan-m/ECC** ⭐ 259,355  
JavaScript | Agent harness performance optimization: skills, instincts, memory, security. Claude Code, Codex, Opencode, Cursor.

**firecrawl/firecrawl** ⭐ 180,904  
TypeScript | Context API: search, scrape, web interaction at scale.

**DietrichGebert/ponytail** ⭐ 139,421  
JavaScript | Agents think như laziest senior dev. Best code = code never written.

**browser-use/browser-use** ⭐ 114,743  
Python | Agents dùng browser.

**thedotmack/claude-mem** ⭐ 93,980  
TypeScript | Persistent context across sessions. Captures, compresses với AI, inject vào future sessions. Works với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode.

**headroomlabs-ai/headroom** ⭐ 72,341  
Python | Compress tool outputs, logs, files, RAG chunks trước LLM. 20% fewer tokens cho coding agents, 60-95% cho JSON. Library, proxy, MCP server.

### 🧠 Models & Training

**ollama/ollama** ⭐ 181,079  
Go | Run Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma local.

**huggingface/transformers** ⭐ 166,197  
Python | Model framework: text, vision, audio, multimodal. Inference + training.

**harry0703/MoneyPrinterTurbo** ⭐ 124,023  
Python | AI workflow: topic/keyword → HD short video. 利用 AI 大模型和自动化.

**TauricResearch/TradingAgents** ⭐ 106,711  
Python | Multi-Agents LLM Financial Trading Framework.

**ZhuLinsen/daily_stock_analysis** ⭐ 65,113  
Python | LLM multi-market stock analysis: multi-source data, real-time news, dashboard, auto notifications. Zero cost scheduled runs.

**hugohe3/ppt-master** ⭐ 54,599  
Python | AI documents/topics → native PowerPoint: native shapes, transitions, animations, charts, tables, audio narration, template support.

### 📦 AI Applications

**ever-co/ever-gauzy** ⭐ +634  
TypeScript | Open Business Management Platform (ERP/CRM/HRM/ATS/PM).

**melgarafael/DeskcommCRM** ⭐ +193  
TypeScript | Self-hosted AI sales OS: CRM + native AI agents + WhatsApp. Open alternative to Kommo, Octadesk, Intercom. MCP-ready, multi-tenant, LGPD.

**NationalSecurityAgency/ghidra** ⭐ +725  
Java | Software reverse engineering framework.

**MG1937/ASC** ⭐ +129  
Python | Super FAST Android decompiler front-end cho Agents/Mobile Researchers.

**CherryHQ/cherry-studio** ⭐ 51,840  
TypeScript | AI productivity studio: smart chat, autonomous agents, 300+ assistants. Unified access to frontier LLMs.

**siyuan-note/siyuan** ⭐ 46,378  
TypeScript | Privacy-first, self-hosted knowledge workspace. Humans + AI agents work together. 开源、隐私优先、自托管.

### 🔍 RAG & Knowledge

**open-webui/open-webui** ⭐ 152,219  
Python | User-friendly AI Interface. Supports Ollama, OpenAI API.

**langchain-ai/langchain** ⭐ 146,406  
Python | Agent engineering platform.

**Shubhamsaboo/awesome-llm-apps** ⭐ 138,352  
Python | 100+ AI Agents, Agent Skills, RAG Apps. Free + open source.

**Graphify-Labs/graphify** ⭐ 118,061  
Python | Codebase + docs + SQL schemas + configs + PDFs → queryable knowledge graph. Local deterministic AST parsing. No vector store. Skill cho Claude Code, Cursor, Codex, Gemini CLI.

**infiniflow/ragflow** ⭐ 90,761  
Go | RAG engine fuses RAG + Agent capabilities. Context layer cho LLMs.

**Mintplex-Labs/anything-llm** ⭐ 66,075  
JavaScript | Stop renting intelligence. Own it. Local-first agent experience.

**mem0ai/mem0** ⭐ 65,358  
Python | Memory Layer cho AI Agents. Drop-in memory infrastructure. Context persists. Production-ready.

**run-llama/llama_index** ⭐ 52,176  
Python | Document processing platform cho AI.

### 🔌 Embedded AI

**jaylfc/taOS** ⭐ 533  
Python | Self-hosted AI agent OS. Memory, chat, agents, files trên hardware tự có. Offline by default, cloud by choice. Offline AI memory (taOSmd), multi-framework group chat, web desktop + app store, auto-clustering across Orange/Raspberry Pi, Mac mini, gaming PC.

**jaylfc/taosmd** ⭐ 78  
Python | Local-first AI memory. Runs offline on 8 GB+ RAM (SBC, mini PC, laptop, workstation). Zero-loss verbatim archive, knowledge graph, hybrid retrieval. Framework-agnostic, no cloud.

**MichaIng/DietPi** ⭐ 6,270  
Shell | Lightweight justice cho single-board computer. Orange Pi supported.

**RaspAP/raspap-webgui** ⭐ 5,220  
PHP | Easiest wireless router setup cho Debian devices.

**bigbugcc/OpenWrts** ⭐ 768  
JavaScript | OpenWRT firmware downloads.

**boundarybitlabs/rknpu2-rs** ⭐ 12  
Rust | Rust bindings cho Rockchip RKNN Runtime API (librknnrt.so). Deploy deep learning models trên Rockchip NPUs.

**isac322/rkmon** ⭐ 11  
Go | Real-time hardware monitor TUI cho Rockchip RK3588 SBCs. htop nhưng cho GPU, NPU, VPU, RGA, thermal zones.

**YeWenxuan64/Edge_Inferencer** ⭐ 3  
Python | Unified edge AI inference engine. One Python API cho Rockchip NPU, Qualcomm HTP, ONNX Runtime. Auto-detects .rknn/.bin/.onnx.

**darkautism/rkllm-rs** ⭐ 11  
Rust | rkllm rust ffi binding.

**AKHYui/rkllama-webui** ⭐ 1  
Python | Web UI cho RKLLM NPU models trên RK3588. Multi-session chat + SSE streaming, model mounting, RAG knowledge base (bge-small-zh + ChromaDB). FastAPI + SQLite.

---

## 📈 Phân tích tín hiệu xu hướng

### 1. **Edge AI infrastructure thống trị**
- **MoE streaming** (colibri): experts stream từ disk, zero deps C. Frontier models trên consumer hardware.
- **NPU acceleration** bùng nổ: Rockchip RK3588 toolchains (rknpu2-rs, rkmon, Edge_Inferencer), unified edge inference APIs.
- **Local-first memory** (taOSmd): offline AI memory với knowledge graph, hybrid retrieval. 8 GB RAM đủ.

### 2. **AI agents hợp nhất với developer workflows**
- **Code review** automated at scale (alibaba/open-code-review): deterministic + LLM hybrid. NPE, thread-safety, XSS, SQL injection built-in.
- **Multi-agent orchestration** (atlas, pi): source control cho agents, unified LLM APIs, agent loops.
- **Research agents** (OpenResearch): coding agents → research agents.

### 3. **Context compression + persistent memory**
- **Compression** (headroom): 20% fewer tokens cho coding agents, 60-95% cho JSON. Library, proxy, MCP server.
- **Persistent context** (claude-mem): captures, compresses với AI, inject vào future sessions. Works across Claude Code, OpenClaw, Codex, Gemini, Hermes.
- **Knowledge graphs** (Graphify): codebase + docs + SQL + configs + PDFs → queryable graph. Local deterministic AST parsing, no vector store.

### 4. **Self-hosted đánh bại cloud**
- **AI OS** (taOS): self-hosted agent OS. Memory, chat, agents, files offline. Auto-clustering across Orange/Raspberry Pi, Mac mini, gaming PC.
- **CRM + AI agents** (DeskcommCRM): self-hosted CRM với native AI agents + WhatsApp. MCP-ready, multi-tenant.
- **Knowledge workspace** (siyuan): privacy-first, self-hosted. Humans + AI agents work together.

### 5. **Voice + multimodal local**
- **Voice cloning** (VoiceStudio): local ElevenLabs alternative. Voice cloning, design, video dubbing, dictation, transcription, audiobook. 646 languages.
- **PPT generation** (ppt-master): AI documents/topics → native PowerPoint với native shapes, transitions, animations, charts, audio narration.

### 6. **Zero-deps, pure C/Rust engines**
- **colibri**: MoE models, pure C, zero deps.
- **omniget**: Rust, download 1,800+ sites, no terminal.
- **OpenResearch**: Rust, research agents.

---

## 🎯 Tâm điểm cộng đồng

### **alibaba/open-code-review** (+2,756 stars hôm nay)
Alibaba scale. Hybrid: deterministic pipelines + LLM Agent. NPE, thread-safety, XSS, SQL injection built-in. OpenAI/Anthropic compatible. Production-proven.

### **JustVugg/colibri** (+2,026 stars)
MoE models trên hardware có sẵn. Pure C, zero deps, experts stream từ disk. Tiny engine, immense model. Edge AI breakthrough.

### **debpalash/VoiceStudio** (+2,072 stars)
Local ElevenLabs alternative. Voice cloning, design, video dubbing, dictation, transcription, audiobook. 646 languages. Fully local.

### **jaylfc/taOS** (533 stars)
Self-hosted AI agent OS. Memory, chat, agents, files trên hardware tự có. Offline by default, cloud by choice. Auto-clustering across Orange/Raspberry Pi, Mac mini, gaming PC. Complete ecosystem.

### **Graphify-Labs/graphify** (118,061 stars)
Codebase + docs + SQL + configs + PDFs → queryable knowledge graph. Local deterministic AST parsing, no vector store. Skill cho Claude Code, Cursor, Codex, Gemini CLI. Code understanding revolution.

---

**Kết luận**: Edge AI infrastructure + self-hosted agents + context compression + local-first memory = AI workflows shift từ cloud về hardware tự có. NPU acceleration (Rockchip) + MoE streaming (colibri) + persistent memory (claude-mem, taOSmd) + knowledge graphs (Graphify) = complete local-first AI stack. Voice, multimodal, code review, research đều chạy local. Cloud thua.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*