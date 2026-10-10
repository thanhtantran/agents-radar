# Xu hướng AI Mã nguồn mở 2026-10-10

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-10 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-10-10

## 1. Tóm tắt hôm nay

Cộng đồng đang hội tụ vào **agent autonomy** và **infrastructure cho AI coding assistants**. Trend chính: agent skills systems (skills repository cho coding agents), reverse engineering tools, và edge AI deployment (RK3588 NPU). 

Điểm đặc biệt: xuất hiện các "quality of life" tools cho agents - memory persistence, context compression, knowledge graphs - thay vì chỉ model weights.

---

## 2. Top repos theo chiều

### 🤖 **AI Agents**

**Trending hôm nay:**
- **NousResearch/hermes-agent** ⭐ 252K | Python
  Agent framework tự phát triển với user
  
- **affaan-m/ECC** ⭐ 276K | JavaScript  
  Performance optimization system cho agent harness (Claude Code, Codex, Cursor)

- **Panniantong/Agent-Reach** ⭐ 95K | Python
  Tool cho agent đọc/tìm Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu - zero API fees

- **zhayujie/CowAgent** ⭐ 47K | Python
  Personal AI assistant với task planning, tools, self-evolution, multi-agent workflows

- **HKUDS/nanobot** ⭐ 49K | Python
  Ultra-lightweight personal agent framework - WebUI, tools, memory, MCP, multi-agent

**Search 7 ngày:**
- **career-ops-hq/career-ops** ⭐ 74K | JavaScript
  AI job search agent: scan jobs, score vs CV, tailor resume/cover letter, interview prep

- **hugohe3/ppt-master** ⭐ 59K | Python  
  Docs/topics → native PowerPoint với shapes, transitions, animations, charts, audio narration

- **ZhuLinsen/daily_stock_analysis** ⭐ 66K | Python
  LLM-driven multi-market stock analysis: multi-source data, real-time news, decision dashboard

---

### 🔧 **AI Infrastructure**

**Trending hôm nay:**
- **morluto/rea** ⭐ +14,927 | TypeScript
  Reverse engineer anything với agents - app behavior đến native binaries

- **mattpocock/skills** ⭐ +1,687 | Shell  
  Skills cho real engineers - straight from .agents directory

- **addyosmani/agent-skills** ⭐ +436 | JavaScript
  Production-grade engineering skills cho AI coding agents

- **alibaba/open-code-review** ⭐ +326 | Go
  Hybrid code review: deterministic pipelines + LLM agent, line-level comments, built-in rulesets (NPE, thread-safety, XSS, SQL injection)

- **anthropics/knowledge-work-plugins** ⭐ +709 | Python
  Open source plugins cho knowledge workers trong Claude Cowork

- **BerriAI/litellm** ⭐ +95 | Python
  Fastest AI Gateway - Rust core + Python SDK, 100+ LLMs OpenAI-format, cost tracking, guardrails

**Search 7 ngày:**
- **thedotmack/claude-mem** ⭐ 99K | TypeScript
  Persistent context across sessions - captures agent actions, AI compression, injects context vào future sessions

- **headroomlabs-ai/headroom** ⭐ 75K | Python
  Compress tool outputs, logs, files, RAG chunks trước khi vào LLM - 20% fewer tokens coding agents, 60-95% fewer JSON

- **mem0ai/mem0** ⭐ 67K | Python
  Memory layer cho AI agents - drop-in memory infrastructure, context persists

- **langchain-ai/langchain** ⭐ 148K | Python
  Agent engineering platform

- **firecrawl/firecrawl** ⭐ 190K | TypeScript
  Supercharge agents với web data - library for superintelligence

---

### 🧠 **Models & Training**

Không có repo mới nổi bật trong trending hôm nay về model weights hay training frameworks.

---

### 📦 **AI Applications**

**Trending hôm nay:**
- **storytold/artcraft** ⭐ +3,752 | Rust
  Intentional crafting engine cho artists, designers, filmmakers

- **cathrynlavery/diagram-design** ⭐ +1,739 | HTML
  Editorial diagram design cho Claude Code, Codex, GitHub Copilot, Factory Droid, Pi - 42 diagram types, self-contained HTML+SVG

**Search 7 ngày:**
- **CherryHQ/cherry-studio** ⭐ 52K | TypeScript
  AI productivity studio: smart chat, autonomous agents, 300+ assistants, unified LLM access

- **siyuan-note/siyuan** ⭐ 47K | TypeScript
  Privacy-first knowledge workspace - humans + AI agents collaborate

- **open-webui/open-webui** ⭐ 154K | Python
  User-friendly AI interface (Ollama, OpenAI API support)

- **Mintplex-Labs/anything-llm** ⭐ 67K | JavaScript
  Own your intelligence - local-first agent experience

---

### 🔍 **RAG & Knowledge**

**Trending hôm nay:**
- **Robbyant/lingbot-map** ⭐ +110 | Python
  [ECCV 2026 Best Paper Candidate] Geometric Context Transformer cho streaming 3D reconstruction

**Search 7 ngày:**
- **Graphify-Labs/graphify** ⭐ 125K | Python
  Codebase → queryable knowledge graph - local deterministic AST parsing, no vector store

- **infiniflow/ragflow** ⭐ 92K | Go
  Leading RAG engine với Agent capabilities

- **unclecode/crawl4ai** ⭐ 85K | Python
  Web crawler/scraper cho LLMs: website → clean LLM-ready Markdown

- **datawhalechina/hello-agents** ⭐ 82K | Python
  《从零开始构建智能体》tutorial

---

### 🔌 **Embedded AI**

**Trending hôm nay:**
- **boykopovar/AnyPS5** ⭐ +5,868 | C++
  Tool auto-port PS5 executables sang Linux/Windows

- **twostraws/SwiftUI-Agent-Skill** ⭐ +65
  SwiftUI agent skill cho Claude Code, Codex

**Search 7 ngày - rkllm/rknpu:**
- **Leon6225/InternVL3.5-4B-NPU** ⭐ 5 | C++
  InternVL3.5-4B cho RK3588 NPU - multimodal AI

- **ambagesthickskin162/Qwen3.5-4B-NPU** ⭐ 1 | C++
  Deploy Qwen3.5-4B trên NPU hardware - efficient local inference

- **suan-4/rk3588-llm-inference** ⭐ 0 | Python
  RK3588 edge LLM inference: benchmarking, bottleneck analysis, optimization (Qwen3-4B on RKNPU)

- **gregordinary/ggml-rocket** ⭐ 23 | C++
  Drop-in ggml backend cho Rockchip NPUs - offloads llama.cpp/whisper.cpp prefill to RK3588 NPU

- **oRKLLM/ork-driver** ⭐ 7 | C
  Clean-room userspace matmul library cho Rockchip NPU

**Orange Pi:**
- **jaylfc/taOS** ⭐ 557 | Python
  Self-hosted AI agent OS - offline memory, self-hosted chat, web desktop, auto-clustering trên consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC)

- **jaylfc/taosmd** ⭐ 80 | Python
  Local-first AI memory - offline trên 8GB+ RAM (SBC, mini PC), zero-loss archive, knowledge graph, hybrid retrieval

- **nouverse/nouride-releases** ⭐ 16
  Lightweight multi-agent AI engine trong single daemon - homelab-friendly cho mini devices (Raspberry Pi, Orange Pi, Geekom, NUC, LXC)

---

## 3. Phân tích tín hiệu xu hướng

### 🔥 **Agent Skills Ecosystem**
Cộng đồng đang build **skill repositories** cho coding agents thay vì chỉ viết prompts. Các repo như `mattpocock/skills`, `addyosmani/agent-skills`, `twostraws/SwiftUI-Agent-Skill` cho thấy pattern: agents cần **reusable skills** như developers cần libraries.

### 🧠 **Memory & Context Management**
Trend mới: **persistent memory systems** (`claude-mem`, `mem0`, `taosmd`) giải quyết vấn đề agents quên context giữa các sessions. Kết hợp với **context compression** (`headroom`) để maximize token efficiency.

### 🛠️ **Hybrid Architecture: Deterministic + LLM**
Alibaba's `open-code-review` và `Graphify-Labs/graphify` show pattern: **deterministic pipelines** (AST parsing, static analysis) + LLM reasoning thay vì pure LLM. Trade accuracy cho cost/speed.

### 🏠 **Homelab & Edge AI**
Strong signal: developers muốn **self-hosted, offline-first** solutions. `taOS`, `nouride`, và RK3588 NPU projects cho thấy push về **consumer hardware AI** (Orange Pi, Raspberry Pi, mini PC). Privacy + cost là drivers.

### 🔧 **Infrastructure Consolidation**
`litellm`, `firecrawl`, `career-ops-hq` pattern: **unified interfaces** che đi complexity của multiple APIs/services. Market muốn abstraction layers giữa agents và raw tools.

---

## 4. Tâm điểm cộng đồng

### ⚡ **morluto/rea** (+14,927 ⭐)
Reverse engineering với agents - từ app behavior đến native binaries. Use case độc đáo: security research, legacy code analysis, binary understanding.

### 🎮 **boykopovar/AnyPS5** (+5,868 ⭐)
PS5 executable porting tool - niche nhưng high interest. Gaming emulation community đang active.

### 📊 **storytold/artcraft** (+3,752 ⭐)
Crafting engine cho creative professionals (artists, designers, filmmakers). Rust-based, intentional design - khác với generic creative tools.

### 🧑‍💻 **affaan-m/ECC** (276K ⭐)
Agent harness optimization system - massive stars cho infrastructure project. Shows cộng đồng coi agent performance là critical.

### 🌐 **Graphify-Labs/graphify** (125K ⭐)
Codebase → knowledge graph không dùng vector store - deterministic approach đang thắng cho code understanding tasks.

---

**Kết luận:** Ngày 2026-10-10 đánh dấu shift từ "better models" sang "better agent infrastructure". Focus: skills, memory, compression, hybrid pipelines, và self-hosted edge deployments.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*