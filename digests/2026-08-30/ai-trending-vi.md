# Xu hướng AI Mã nguồn mở 2026-08-30

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-08-30 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 30/08/2026

## 🎯 Tóm tắt hôm nay

Ngày 30/08/2026 đánh dấu sự bùng nổ của **Agent Skills** - xu hướng mới giúp biến AI coding agents thành các chuyên gia domain-specific. Cộng đồng đang chuyển hướng từ việc xây dựng agents mới sang việc **trang bị skills cho agents hiện có**. 

Điểm nổi bật: 
- 🔥 **archify** (3,902 ⭐ trong ngày) - skill tạo architecture diagrams tự động
- 🧪 **scientific-agent-skills** (1,587 ⭐) - 165 skills khoa học + 100 databases
- 🎬 **OpenMontage** (806 ⭐) - 12 pipelines video production, 700+ agent skills

Một tín hiệu quan trọng khác: **Edge AI trên Rockchip NPU** đang trưởng thành với hệ sinh thái tools hoàn chỉnh từ rkllama, RKLLM-API-Server đến ggml-rocket backend.

---

## 🏆 Top Repos Theo Chiều

### 🤖 AI Agents

**tt-a1i/archify** ⭐ 3,902 | JavaScript
Agent skill tạo architecture diagrams tuyệt đẹp, verifiable, tự động - output HTML độc lập với motion và export sắc nét.

**K-Dense-AI/scientific-agent-skills** ⭐ 1,587 | Python  
Biến mọi AI agent thành AI Scientist với 165 skills + 100+ databases khoa học (biology, chemistry, medicine, drug discovery). Tương thích Cursor, Claude Code, Codex.

**THU-MAIC/OpenMAIC** ⭐ 907 | TypeScript  
Multi-agent classroom - trải nghiệm học tập với nhiều agents tương tác, chỉ một click.

**calesthio/OpenMontage** ⭐ 806 | Python  
Hệ thống video production agentic mã nguồn mở đầu tiên thế giới: 12 pipelines, 100+ tools, 700+ agent skills. Biến AI coding assistant thành studio sản xuất video hoàn chỉnh.

**addyosmani/agent-skills** ⭐ 196 | JavaScript  
Production-grade engineering skills cho AI coding agents.

**ComposioHQ/awesome-claude-skills** ⭐ 73 | Python  
Danh sách tuyển chọn Claude Skills, resources, tools để customize Claude AI workflows.

---

### 🔧 AI Infrastructure & Tools

**bilawalsidhu/gods-eye-view** ⭐ 1,855 | JavaScript  
Spy satellite simulator trong browser với dữ liệu thật - spatial intelligence mã nguồn mở trên globe 3D photorealistic.

**tailscale/tailcat** ⭐ 789 | Go  
Giống netcat, nhưng chạy qua data plane của Tailscale, không cần control plane.

**p-e-w/heretic** ⭐ 150 | Python  
Gỡ bỏ censorship hoàn toàn tự động cho language models.

**every-app/open-seo** ⭐ 517 | TypeScript  
Alternative mã nguồn mở cho Semrush và Ahrefs.

**workweave/router** ⭐ 284 | Go  
Model router cho agentic systems - route mọi prompt đến đúng model trong <50ms. Cắt giảm costs 40-70% chỉ bằng thay endpoint.

**JetBrains/go-modern-guidelines** ⭐ 303 | Go  
Giúp AI coding agents viết Go hiện đại.

**anthropics/claude-plugins-official** ⭐ 358 | Python  
Directory chính thức, do Anthropic quản lý, chứa Claude Code Plugins chất lượng cao.

---

### 📦 AI Applications

**abi/screenshot-to-code** ⭐ 550 | Python  
Drop screenshot và convert thành clean code (HTML/Tailwind/React/Vue).

**Osmantic/ODS** ⭐ 35 | Python  
Biến PC/Mac/Linux thành AI server: LLM inference, chat UI, voice, agents, workflows, RAG, image generation.

**kaifcodec/user-scanner** ⭐ 39 | Python  
Email & Username OSINT suite phân tích 455+ scan vectors (175+ email / 280+ username) cho security research.

---

### 🔍 RAG & Knowledge Systems

Không có repos RAG đặc sắc trong trending hôm nay, nhưng có một số từ search 7 ngày:

**Graphify-Labs/graphify** ⭐ 112,327 | Python  
Biến codebase (docs, SQL schemas, configs, PDFs) thành queryable knowledge graph. Skill cho Claude Code/Cursor - local AST parsing, không cần vector store.

**thedotmack/claude-mem** ⭐ 92,590 | JavaScript  
Persistent context across sessions cho mọi agent - capture toàn bộ, compress bằng AI, inject vào future sessions.

**headroomlabs-ai/headroom** ⭐ 68,021 | Python  
Compress tool outputs, logs, files, RAG chunks trước khi đến LLM: 20% ít tokens hơn cho coding agents, 60-95% cho JSON, cùng kết quả.

---

### 🔌 Embedded AI & Edge Computing

**NotPunchnox/rkllama** ⭐ 596 | Python  
Ollama alternative cho Rockchip NPU - giải pháp hiệu quả chạy AI/DL models trên devices Rockchip với NPU support (rkllm).

**jaylfc/taOS** ⭐ 502 | Python  
Self-hosted AI agent OS: memory, chat, agents, files offline-first trên hardware bạn sở hữu. Offline AI memory (taOSmd), multi-framework group chat, web desktop + app store, auto-clustering trên consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC).

**GatekeeperZA/RKLLM-API-Server** ⭐ 23 | Python  
OpenAI-compatible API server cho Rockchip NPU (RK3588/RK3576) - local LLM inference trên Orange Pi với Open WebUI support.

**gregordinary/ggml-rocket** ⭐ 18 | C++  
Drop-in ggml backend cho Rockchip NPUs - offload llama.cpp/whisper.cpp prefill lên RK3588 NPU.

**gregordinary/rocket-userspace** ⭐ 14 | C  
Userspace driver, matmul, on-NPU op library cho Rockchip NPUs (RK3588) qua mainline rocket DRM-accel driver.

**isac322/rkmon** ⭐ 7 | Go  
Real-time hardware monitor TUI cho Rockchip RK3588 SBCs - giống htop nhưng cho GPU, NPU, VPU, RGA, thermal zones.

**jaylfc/taosmd** ⭐ 77 | Python  
Local-first AI memory chạy offline trên máy 8GB+ RAM (SBC, mini PC, laptop) - zero-loss archive, knowledge graph, hybrid retrieval.

---

## 🔮 Phân tích Tín hiệu Xu hướng

### 1. **Agent Skills Ecosystem đang bùng nổ**
Thay vì xây agents mới, cộng đồng đang tập trung vào **skill marketplace** cho agents hiện có. Pattern:
- Domain-specific skills (science, architecture, video)
- Plug-and-play vào nhiều platforms (Cursor, Claude Code, Codex)
- Skills package kèm tools + knowledge databases
- Xu hướng "turn X into Y" (turn agent into scientist, turn CLI into studio)

### 2. **Edge AI trưởng thành trên Rockchip**
Hệ sinh thái NPU hoàn chỉnh đang hình thành:
- **Runtime layer**: rkllama (Ollama alternative), RKLLM-API-Server (OpenAI-compatible)
- **Backend optimization**: ggml-rocket, rocket-userspace driver
- **Tooling**: rkmon (hardware monitor), model conversion notebooks
- **OS integration**: taOS cho AI agent OS trên SBC

Tín hiệu: **SBC không còn chỉ để chạy servers, mà đang trở thành AI inference platforms**.

### 3. **"Local-first" trở thành selling point chính**
Các repos nhấn mạnh:
- Offline by default (taOS, taosmd)
- Zero API fees (Agent-Reach)
- Self-hosted (ODS, open-seo)
- Privacy-first (siyuan)

Cộng đồng đang phản ứng với cloud dependency và data privacy concerns.

### 4. **AI Tooling hướng đến "zero-friction"**
- Gods-eye-view: spatial intelligence trong browser
- screenshot-to-code: drop và convert
- archify: self-contained HTML output
- Model router: chỉ cần đổi endpoint

Pattern: **Giảm thiểu setup, maximize instant value**.

### 5. **Compression & Efficiency layer đang nổi**
- headroom: compress trước khi đến LLM
- Model router: routing thông minh giảm 40-70% costs
- ggml-rocket: offload prefill lên NPU

Tín hiệu: Token costs và context limits vẫn là bottlenecks lớn, solutions đang xuất hiện.

---

## 🎪 Tâm điểm Cộng đồng

### 🔥 **archify** - The Architecture Diagram Agent
3,902 stars trong ngày cho thấy pain point lớn: developers ghét vẽ diagrams nhưng cần chúng để communicate. Archify giải quyết bằng agent skill tạo diagrams đẹp, verifiable, exportable.

### 🌍 **gods-eye-view** - Open Source Spy Satellite
1,855 stars cho một simulator là con số ấn tượng. Công nghệ spatial intelligence đang democratize - từ government/military tool thành browser app.

### 🧪 **scientific-agent-skills** - Domain Expertise as Code
1,587 stars phản ánh nhu cầu mạnh từ research community. 165 skills + 100 databases = instant domain expert. Pattern này sẽ lặp lại cho medical, legal, finance, etc.

### 🎬 **OpenMontage** - Vertical AI sẽ là Skills
806 stars cho video production suite chứng minh: thay vì build vertical AI apps, package chúng thành skills cho general agents. Flexible hơn, wider adoption.

### 🍊 **Rockchip NPU Stack** - SBC AI Renaissance
Tổng hợp 596+502+23+18+14+7 ≈ 1,160 stars từ các repos Rockchip-related trong 7 ngày. Orange Pi 5 đang trở thành "Raspberry Pi của AI inference" với:
- Giá rẻ (~$100)
- NPU mạnh (6 TOPS RK3588)
- Ecosystem tools hoàn chỉnh
- Linux mainline support đang improve

---

## 💡 Takeaways cho Developers

1. **Build skills, not apps**: Nếu giải quyết domain problem, package thành agent skill thay vì standalone app
2. **Local-first wins trust**: Privacy và offline capabilities là competitive advantages
3. **SBCs are serious AI hardware**: Orange Pi 5 + proper tools = production-ready edge AI
4. **Compression matters**: Token costs tăng, compression/routing tools sẽ cần thiết
5. **OpenAI-compatible APIs** = best distribution strategy cho inference tools

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*