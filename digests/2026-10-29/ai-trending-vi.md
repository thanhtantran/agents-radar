# Xu hướng AI Mã nguồn mở 2026-10-29

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-29 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 29/10/2026

## 🌟 Tóm tắt hôm nay

Làn sóng "Agent Harness" đang bùng nổ - 8/10 repo trending top là framework/tooling cho coding agents (Claude Code, Cursor, Codex). Community đang xây infrastructure chứ không chỉ dùng AI.

Edge AI nở rộ: Rockchip NPU (RK3588/3576) xuất hiện mạnh trong search queries với 10+ repos mới về RKLLM/RKNPU deployment, homebrew inference engines.

Cộng đồng châu Á dẫn đầu: 40% repos trending có mô tả tiếng Trung/Việt, nhiều dự án localization/vertical apps cho thị trường nội địa.

---

## 📊 Top repos theo chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **obra/superpowers** (+1095⭐) - Agentic skills framework với software methodology mới
- **makecindy/cindy** (+728⭐) - Open-source AI agent "out of the box", song ngữ EN/CN
- **nightly-labs/openbot** (+1054⭐) - Local-first desktop workspace, multi-agent collaboration, browser control
- **HKUDS/DeepTutor** (+2371⭐) - Lifelong personalized tutoring system

**Từ search (7 ngày):**
- **NousResearch/hermes-agent** (258K⭐) - "Agent that grows with you" - scale lớn nhất
- **Panniantong/Agent-Reach** (106K⭐) - Cho agent "mắt nhìn internet" - scrape Twitter/Reddit/YouTube/GitHub/Bilibili/XiaoHongShu
- **shareAI-lab/learn-claude-code** (79K⭐) - Nano Claude Code build từ 0, bash-first approach
- **career-ops-hq/career-ops** (78K⭐) - AI job search agent: score jobs, tailor CV, interview prep
- **CherryHQ/cherry-studio** (53K⭐) - AI productivity studio, 300+ assistants
- **HKUDS/nanobot** (50K⭐) - Ultra-lightweight Python agent framework với WebUI/MCP/multi-agent
- **zhayujie/CowAgent** (48K⭐) - Personal AI assistant tự tiến hóa với memory/knowledge

**Insight:** Framework đang phân tầng rõ - specialized (career, tutoring) vs general-purpose (Hermes, CowAgent). Local-first + multi-agent collaboration là điểm nhấn mới.

---

### 🔧 AI Infrastructure

**Trending:**
- **JetBrains/thinkrail** (+1068⭐) - "Vibe code with π" - real IDE tự customize, TypeScript
- **Nutlope/hallmark** (+2110⭐) - Anti-AI-slop design skill cho Claude/Cursor/Codex
- **pbakaus/impeccable** (+1472⭐) - Design vocabulary cho coding agents, Rust, "catch AI slop before ships"
- **elayadesign/ai-design-skills** (+2139⭐) - Design skills package

**Từ search:**
- **morluto/rea** (403K⭐) - Reverse engineer anything với agents, binary-level
- **affaan-m/ECC** (292K⭐) - Agent harness performance optimization system
- **firecrawl/firecrawl** (196K⭐) - Web scraping cho AI agents
- **thedotmack/claude-mem** (104K⭐) - Persistent context across sessions, works với mọi major agent
- **Graphify-Labs/graphify** (138K⭐) - Codebase → knowledge graph, deterministic AST parsing
- **headroomlabs-ai/headroom** (78K⭐) - Compress tool outputs/logs/RAG trước khi đưa vào LLM, giảm 20-95% tokens
- **unclecode/crawl4ai** (86K⭐) - Web crawler/scraper cho LLMs

**Insight:** "Agent harness" là từ khóa hot nhất - tooling để agents hoạt động tốt hơn. Anti-slop movement: hallmark, impeccable focus vào quality control. Memory + context management đang là pain point lớn (claude-mem, headroom).

---

### 🧠 Models & Training

Không có repo nổi bật trong trending hôm nay. Search results focus vào application layer.

---

### 📦 AI Applications

**Trending:**
- **macro-inc/macro** (+117⭐) - Unified workspace: email/chat/docs/tasks/agents/calls/CRM với shared AI memory, Rust
- **hmjz100/LinkSwift** (+1616⭐) - Công cụ lấy direct link từ 8 dịch vụ cloud storage Trung Quốc
- **xiaolai/the-craft-of-selfteaching** (+148⭐) - Jupyter Notebook về self-teaching

**Từ search:**
- **hugohe3/ppt-master** (70K⭐) - Docs/topics → native PowerPoint với shapes/transitions/animations/charts
- **ZhuLinsen/daily_stock_analysis** (67K⭐) - LLM-driven multi-market stock analysis, Chinese focus
- **siyuan-note/siyuan** (47K⭐) - Privacy-first knowledge workspace, human-AI collaboration
- **harry0703/MoneyPrinterTurbo** (136K⭐) - AI tạo video ngắn HD từ topic/keyword

**Insight:** Vertical apps cho thị trường Trung Quốc/châu Á rất mạnh (stock analysis, cloud downloader, video gen). Knowledge management + AI collaboration trends (Siyuan, Macro).

---

### 🔍 RAG & Knowledge

**Từ search:**
- **open-webui/open-webui** (157K⭐) - User-friendly AI interface, supports Ollama/OpenAI
- **langchain-ai/langchain** (149K⭐) - Agent engineering platform
- **infiniflow/ragflow** (93K⭐) - RAG engine fused với Agent capabilities
- **mem0ai/mem0** (68K⭐) - Memory layer for AI agents, production-ready
- **Mintplex-Labs/anything-llm** (68K⭐) - Local-first agent experience: "stop renting your intelligence"
- **run-llama/llama_index** (53K⭐) - Document processing platform for AI

**Insight:** RAG đang merge với Agent capabilities (RAGFlow). Local-first + memory persistence là trend rõ (Mem0, AnythingLLM). "Own your intelligence" messaging xuất hiện nhiều.

---

### 🔌 Embedded AI

**RKLLM (Rockchip LLM):**
- **NotPunchnox/rkllama** (618⭐) - Ollama alternative cho Rockchip NPU, efficient inference
- **Hanzo-Huang/rkllm-docker** (21⭐) - RKLLM trong 1 docker command
- **Hanzo-Huang/rk3576-home-assistant-voice** (19⭐) - Home Assistant voice stack trên RK3576, NPU-accelerated Whisper/Piper
- **tristanpenman/vlm-rknn** (1⭐) - Starter CMake cho vision-language models trên Rockchip
- **kkkzx-hx/qwen-vl-rk3588** (1⭐) - Qwen2.5-VL-3B offline deployment RK3588, W8A8 quantization

**RKNPU (Rockchip NPU):**
- **jaylfc/taOS** (582⭐) - Self-hosted AI agent OS, offline by default, auto-clustering across consumer hardware (Orange/Raspberry Pi)
- **happyme531/open_rknpu2_lm_infer** (52⭐) - Fully open-source LLM inference engine cho RK3588 NPU
- **ajokela/rktop** (38⭐) - High-performance system monitor cho Rockchip SoCs, Rust
- **yjdwbj/panther-x2** (16⭐) - RK3566 board chạy Buildroot + Rockchip 6.12 kernel, LoRa gateway + UVC camera + NPU person detection
- **happyme531/rknpu2_matmul_open** (11⭐) - Matrix multiplication và quantized LLM kernels cho RK3588
- **anand34577/ggml-rknpu2** (0⭐) - ggml backend cho Rockchip NPU, one-line installer

**Orange Pi:**
- **jaylfc/taosmd** (82⭐) - Local-first AI memory trên 8GB+ RAM machines (SBC/mini PC), zero-loss archive + knowledge graph
- **Animan-AI/DuckBuddy** (77⭐) - Open-source embodied AI robot duck trên Orange Pi Zero 3W, motion/vision/audio
- **nouverse/nouride-releases** (26⭐) - Lightweight multi-agent AI engine daemon cho mini devices (Raspberry/Orange Pi)
- **7noemo/Orange-Pi-Zero-ZeroPlus-Openwrt** (20⭐) - OpenWrt auto-build cho Orange Pi Zero với Wi-Fi drivers

**Insight:** Rockchip NPU (RK3588/3576) đang là "hidden gem" - 10+ repos trong tuần đều about homebrew inference engines, quantization, Docker deployment. Community đang viết open-source alternatives cho proprietary RKLLM SDK.

Orange Pi xuất hiện trong embedded AI use cases: robot duck, voice assistant, multi-agent systems. Trend: mọi người chạy agent stacks trên hardware consumer-grade thay vì cloud.

---

## 🔥 Phân tích tín hiệu xu hướng

### 1. "Agent Harness" ecosystem đang hình thành
- 8/10 trending repos là tooling/infrastructure cho coding agents
- Không chỉ dùng Claude/Cursor - đang build entire ecosystem quanh chúng
- Keywords: skills, memory, context compression, anti-slop, design vocabulary
- Shift từ "use AI" → "make AI work better"

### 2. Anti-AI-slop movement
- **hallmark**, **impeccable** focus vào quality control
- "Catch AI slop before ships" - community nhận ra output quality là bottleneck
- Design skills/vocabularies cho agents = new category

### 3. Local-first + Privacy-first resurrection
- Nhiều repos nhấn mạnh "self-hosted", "offline by default", "own your intelligence"
- Phản ứng với cloud dependency? hoặc data privacy concerns?
- Examples: taOS, AnythingLLM, Siyuan, taosmd

### 4. Edge AI đang bùng nổ (Rockchip NPU)
- 10+ repos RKLLM/RKNPU trong 1 tuần
- Community viết open-source inference engines, bypass vendor SDKs
- RK3588/3576 = sweet spot: NPU power + consumer price
- Use cases: voice assistants, vision models, robots, home automation

### 5. Multi-agent systems maturity
- Repos không chỉ là single agent - focus vào agent-to-agent collaboration
- Examples: openbot, nanobot, nouride
- "Agent orchestration" = next frontier

### 6. Memory/Context management hot
- claude-mem (104K⭐), mem0 (68K⭐), headroom (78K⭐)
- Pain point: agents forget, context windows expensive
- Solutions: persistent memory, compression, knowledge graphs

### 7. Vertical AI apps cho châu Á
- Stock analysis, cloud downloaders, video generators với Chinese UI
- Localized datasets/prompts
- Market opportunity: Western AI tools chưa optimize cho non-English

---

## 💡 Tâm điểm cộng đồng

### 🥇 Siêu trending (1000+ ⭐/ngày):
1. **DeepTutor** (+2371) - Lifelong tutoring, giáo dục là vertical hot
2. **elayadesign/ai-design-skills** (+2139) - Design skills demand rõ
3. **Nutlope/hallmark** (+2110) - Anti-slop có traction lớn
4. **hmjz100/LinkSwift** (+1616) - Utility tools cho Chinese users
5. **pbakaus/impeccable** (+1472) - Rust-based design vocabulary

### 🏆 Established leaders (100K+ ⭐):
- **morluto/rea** (403K) - Reverse engineering với agents = niche nhưng đỉnh
- **affaan-m/ECC** (292K) - Agent harness optimization platform
- **firecrawl** (196K) - Web scraping infra for AI

### 🌱 Emerging (500-1000 ⭐/ngày):
- **obra/superpowers** (+1095) - Skills framework mới
- **nightly-labs/openbot** (+1054) - Local desktop workspace cho agents
- **JetBrains/thinkrail** (+1068) - JetBrains entering agent space?

### 🔬 Niche nhưng quan trọng:
- **NotPunchnox/rkllama** (618⭐) - Ollama cho Rockchip, bắt đầu ecosystem mới
- **jaylfc/taOS** (582⭐) - Self-hosted agent OS, visionary
- **Animan-AI/DuckBuddy** (77⭐) - Embodied AI robot trên Orange Pi, playful + educational

---

## 📌 Takeaways

**Infrastructure đang thắng:** Coding agents mature → focus shift sang tooling/quality/workflow.

**Edge AI = new frontier:** Rockchip NPU xuất hiện mạnh, open-source community bypass vendor locks.

**Local-first comeback:** Privacy + ownership concerns drive self-hosted solutions.

**Asian markets lead verticals:** Localized apps, Chinese datasets, non-English optimization underserved.

**Memory problem unsolved:** Context persistence/compression still hard, nhiều approaches compete.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*