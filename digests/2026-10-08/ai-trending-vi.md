# Xu hướng AI Mã nguồn mở 2026-10-08

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-08 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-10-08

## 🔥 Tóm tắt hôm nay

Cộng đồng đang chuyển sang **AI Agents tự vận hành** với bộ kỹ năng riêng (skills, .agents directory). Dòng chảy chính: làm agent **nhớ được context** (persistent memory), **xuất kết quả clean** (ADHD-friendly), và **chạy offline** trên hardware riêng. Edge AI bùng nổ với RK3588 NPU driver mainline và RKLLM deployment.

---

## 🗂️ Top repos theo chiều

### 🤖 **AI Agents**

**Trending:**
- **morluto/rea** (+4655⭐) - Reverse engineer apps/binaries bằng agents
- **mattpocock/skills** (+1403⭐) - Skills từ .agents directory của senior engineer
- **ayghri/i-have-adhd** (+619⭐) - Skill chặn agent chôn câu trả lời, output ADHD-friendly
- **addyosmani/agent-skills** (+677⭐) - Production-grade skills cho coding agents

**Search (LLM/AI-agent):**
- **NousResearch/hermes-agent** (251K⭐) - Agent lớn theo user
- **affaan-m/ECC** (274K⭐) - Agent harness: skills, instincts, memory, security
- **Significant-Gravitas/AutoGPT** (187K⭐) - Accessible AI cho mọi người
- **Panniantong/Agent-Reach** (93K⭐) - Cho agent "mắt thấy" cả internet (Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu)
- **HKUDS/nanobot** (48K⭐) - Ultra-lightweight self-hosted agent framework Python
- **zhayujie/CowAgent** (47K⭐) - Open-source personal AI assistant, self-evolving
- **career-ops-hq/career-ops** (73K⭐) - AI job search agent: scan, score CV, tailor resume/cover letter

### 🔧 **AI Infrastructure**

**Trending:**
- **thedotmack/claude-mem** (+578⭐) - Persistent context across sessions, capture/compress/inject
- **manaflow-ai/cmux** (+44⭐) - Ghostty-based macOS terminal với vertical tabs cho agent multitasking
- **trycua/cua** (+228⭐) - Scale computer-use 2.0: drivers, cross-OS fleets, benchmarks

**Search:**
- **ollama/ollama** (182K⭐) - Chạy Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma
- **open-webui/open-webui** (154K⭐) - User-friendly AI interface (Ollama, OpenAI API)
- **firecrawl/firecrawl** (189K⭐) - Supercharge agents với data từ web
- **DietrichGebert/ponytail** (157K⭐) - Làm agent nghĩ như lazy senior dev

### 🧠 **Models & Training**

**Search:**
- **huggingface/transformers** (167K⭐) - State-of-the-art ML models text/vision/audio/multimodal

### 📦 **AI Applications**

**Trending:**
- **cathrynlavery/diagram-design** (+825⭐) - 42 diagram types, self-contained HTML+SVG, no Mermaid slop
- **DuarteSantos8/openGym** (+1493⭐) - Self-hosted gym tracker, passkey login, data riêng
- **EpicGames/raddebugger** (+90⭐) - Native, user-mode, multi-process graphical debugger

**Search:**
- **CherryHQ/cherry-studio** (52K⭐) - AI productivity studio, smart chat, 300+ assistants
- **siyuan-note/siyuan** (46K⭐) - Privacy-first knowledge workspace người + agent
- **hugohe3/ppt-master** (58K⭐) - AI tạo native PowerPoint deck từ documents/topics
- **ZhuLinsen/daily_stock_analysis** (66K⭐) - LLM multi-market stock analysis:行情+新闻+dashboard+推送

### 🔍 **RAG & Knowledge**

**Trending:**
- **thedotmack/claude-mem** - Xem AI Infrastructure

**Search:**
- **thedotmack/claude-mem** (97K⭐) - Persistent context cho mọi agent
- **infiniflow/ragflow** (91K⭐) - Leading RAG engine + Agent capabilities
- **unclecode/crawl4ai** (84K⭐) - Crawler cho LLM: website → clean Markdown
- **headroomlabs-ai/headroom** (74K⭐) - Compress tool outputs/logs/files/RAG: 20-95% fewer tokens
- **Mintplex-Labs/anything-llm** (66K⭐) - Own intelligence local-first
- **mem0ai/mem0** (66K⭐) - Memory layer cho agents, context persists
- **run-llama/llama_index** (52K⭐) - Document processing platform cho AI
- **milvus-io/milvus** (46K⭐) - High-performance cloud-native vector DB
- **langchain-ai/langgraph** (42K⭐) - Build resilient agents
- **HKUDS/DeepTutor** (40K⭐) - Lifelong personalized tutoring

### 🔌 **Embedded AI**

**Trending:**
- **boykopovar/AnyPS5** (+2716⭐) - Auto port PS5 executables sang Linux/Windows
- **tester-army/e2e** (+1390⭐) - Next-gen e2e testing framework web/mobile
- **cloudflare/security-audit-skill** (+576⭐) - Multi-phase security audit skill, machine-readable findings

**Search (rkllm/rknpu/orangepi):**
- **gregordinary/ggml-rocket** (22⭐) - ggml backend cho Rockchip NPU: offload llama.cpp/whisper.cpp prefill
- **gregordinary/rocket-userspace** (20⭐) - Userspace driver cho RK3588 NPU qua mainline rocket DRM-accel
- **gregordinary/rockchip-npu-notes** (19⭐) - Hardware reference + research notes RK3588 NPU
- **oRKLLM/ork-driver** (5⭐) - Clean-room userspace matmul library RK NPU
- **gregordinary/tflite-rocket** (6⭐) - TFLite external delegate NPU-accelerated RK3588
- **Leon6225/InternVL3.5-4B-NPU** (5⭐) - InternVL3.5-4B cho RK3588 NPU
- **Miayyys/smolvla-rk3588** - SmolVLA mixed-precision quantization RK3588
- **jaylfc/taOS** (556⭐) - Self-hosted AI agent OS, offline by default, auto-cluster Orange/Raspberry Pi
- **jaylfc/taosmd** (79⭐) - Local-first AI memory, offline, SBC/mini PC/laptop
- **ryan4yin/nixos-rk3588** (171⭐) - Minimal NixOS trên RK3588 SBC
- **MichaIng/DietPi** (6.3K⭐) - Lightweight justice cho SBC
- **RaspAP/raspap-webgui** (5.2K⭐) - Full-featured wireless router setup Debian
- **YeWenxuan64/yolo26_ModelDeploy** (1⭐) - YOLO26 PyTorch→ONNX→RKNN/QNN cho Rockchip/Qualcomm NPU

---

## 📊 Phân tích tín hiệu xu hướng

**Agent Skills Ecosystem đang hình thành:**
- Cộng đồng standardize ".agents directory" pattern
- Skills như modules: security audit, ADHD output, reverse engineering
- Production-grade engineering skills từ big names (Addy Osmani, Matt Pocock)

**Persistent Memory = killer feature:**
- 3 repos top về persistent context (claude-mem, taosmd, mem0ai)
- Compress + inject relevant context = giải bài toán context window
- Local-first, offline, zero-cloud

**Edge AI NPU bùng nổ:**
- Mainline Linux driver cho RK3588 NPU (rocket DRM-accel)
- Userspace matmul library clean-room
- Offload LLM prefill, vision transformers sang NPU
- Đẩy AI về SBC (Orange/Raspberry Pi, mini PC)

**Output Quality = ưu tiên mới:**
- ADHD-friendly output (ayghri/i-have-adhd)
- Diagram design no Mermaid slop (cathrynlavery/diagram-design)
- Lazy senior dev philosophy (ponytail)

**Security-first Agent Development:**
- Multi-phase security audit skill từ Cloudflare
- Machine-readable findings
- Security vào agent harness (ECC)

---

## 💬 Tâm điểm cộng đồng

**🚀 morluto/rea** (+4655⭐): Reverse engineering với agents - từ app behavior xuống native binary. Autonomous RE workload.

**🧠 thedotmack/claude-mem** (+578⭐, 97K⭐ total): Giải bài toán agent "quên" context. Capture→compress→inject, work với mọi agent (Claude Code, Codex, Gemini, Hermes, Copilot).

**⚡ Edge AI NPU Stack** (gregordinary/*): Mainline Linux driver cho RK3588 NPU + userspace library + backends cho ggml/TFLite/ONNX. Đưa LLM inference về SBC.

**🎯 Agent Reach** (93K⭐): "Mắt cho agent" - read/search Twitter/Reddit/YouTube/GitHub/Bilibili/XiaoHongShu, zero API fees.

**🏗️ Agent Harness** (affaan-m/ECC 274K⭐): Performance optimization system cho agent: skills + instincts + memory + security. Research-first development.

**🤖 Career Ops** (73K⭐): AI job agent - scan boards, score jobs vs CV, tailor resume/cover letter, runs locally trong AI coding CLI.

---

**Kết luận**: Agents đang dịch chuyển từ "chatbot" sang "autonomous systems với memory, skills, và hardware riêng". Edge AI NPU driver mainline = tín hiệu chuyển LLM từ cloud về local hardware. Skills standardization = App Store moment cho AI agents.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*