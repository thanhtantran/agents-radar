# Xu hướng AI Mã nguồn mở 2026-09-22

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-22 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 22/09/2026

## 1. Tóm tắt hôm nay

Bùng nổ **agentic frameworks** và **computer-use automation**. AI agents chiếm 40% top trending, tập trung vào autonomous coding, multi-agent orchestration, và persistent memory. Edge AI xuất hiện mạnh với RKLLM/RKNPU binding cho Orange Pi/Rockchip NPU. Knowledge management shift sang offline-first với local AI stacks.

---

## 2. Top repos theo chiều

### 🤖 AI Agents

**Trending:**
- **BuilderIO/agent-native** (+607) - TypeScript agentic app framework
- **NousResearch/hermes-agent** (247K ⭐) - Self-evolving agent với growth mechanism
- **CherryHQ/cherry-studio** (52K ⭐) - Unified LLM studio, 300+ assistants
- **zhayujie/CowAgent** (47K ⭐) - Multi-agent harness, self-evolution với memory
- **Hmbown/Codewhale** (41K ⭐) - Terminal coding agent trong Rust

**Search (7 ngày):**
- **jaylfc/taOS** (543 ⭐) - Self-hosted agent OS, offline AI memory, auto-clustering
- **HKUDS/nanobot** (48K ⭐) - Ultra-lightweight Python agent với WebUI, MCP, workflows

**Tín hiệu:** Framework consolidation. Builders muốn persistent memory (mem0, claude-mem), multi-agent coordination, và local deployment. Rust agents xuất hiện (Codewhale).

### 🔧 AI Infrastructure

**Trending:**
- **trycua/cua** (+609) - Computer-use automation, cross-OS fleets
- **coder/coder** (+460) - Secure dev environments cho developers + agents
- **akitaonrails/ai-memory** (+167) - Long-term memory cho agent CLIs, vendor handoff

**Search:**
- **affaan-m/ECC** (264K ⭐) - Agent harness optimization: skills, instincts, memory cho Codex/Claude
- **thedotmack/claude-mem** (94K ⭐) - Persistent context across sessions, AI compression
- **headroomlabs-ai/headroom** (73K ⭐) - Compress tool outputs/logs trước khi vào LLM (20-95% token giảm)

**Tín hiệu:** Memory infrastructure là bottleneck. Solutions: compression (headroom), persistent context (claude-mem), long-term storage (ai-memory).

### 🧠 Models & Training

**Search:**
- **ollama/ollama** (181K ⭐) - Local model runtime (Kimi, GLM, Qwen, DeepSeek)
- **huggingface/transformers** (166K ⭐) - SOTA model framework

Không có model repos nổi bật trong trending hôm nay. Focus shift sang deployment và application.

### 📦 AI Applications

**Trending:**
- **Open-Dev-Society/OpenStock** (+844) - Open-source stock platform, real-time prices + alerts
- **anthropics/financial-services** (+424) - Financial domain (Python)
- **zhouxiaoka/autoclip** (+250) - AI video clipping, highlight generation
- **Crosstalk-Solutions/project-nomad** (+394) - Offline knowledge server: Wikipedia, books, maps, local AI

**Search:**
- **career-ops-hq/career-ops** (72K ⭐) - AI job search, CV tailoring, runs local trong coding CLIs
- **ZhuLinsen/daily_stock_analysis** (65K ⭐) - LLM-driven multi-market stock analysis
- **hugohe3/ppt-master** (55K ⭐) - AI → native PowerPoint với shapes, transitions, charts

**Tín hiệu:** Vertical AI apps trong finance, video processing, education. Offline-first là theme (project-nomad). Integration vào existing workflows (career-ops trong CLIs).

### 🔍 RAG & Knowledge

**Search:**
- **Shubhamsaboo/awesome-llm-apps** (139K ⭐) - 100+ AI agents, agent skills, RAG apps
- **infiniflow/ragflow** (91K ⭐) - RAG engine fused với agent capabilities
- **PaddlePaddle/PaddleOCR** (89K ⭐) - PDF/image → structured data, 100+ languages
- **datawhalechina/hello-agents** (80K ⭐) - Agents tutorial (中文)
- **Mintplex-Labs/anything-llm** (66K ⭐) - Local-first agent, own intelligence
- **mem0ai/mem0** (65K ⭐) - Memory layer cho AI agents, persistent context
- **run-llama/llama_index** (52K ⭐) - Document processing platform

**Trending:**
- **siyuan-note/siyuan** (46K ⭐) - Knowledge workspace, humans + AI agents collaborate

**Tín hiệu:** RAG → Agent integration. Knowledge không chỉ retrieval, còn là workspace cho human-AI collaboration. OCR là bridge giữa documents và LLMs.

### 🔌 Embedded AI

**Search - rkllm:**
- **darkautism/rkllm-rs** (12 ⭐) - Rust FFI binding cho RKLLM
- **XiaomingX/awesome-rk3588** (5 ⭐) - RK3588 ecosystem curated list
- **Leon6225/InternVL3.5-4B-NPU** (5 ⭐) - InternVL multimodal cho RK3588 NPU

**Search - rknpu:**
- **jaylfc/taOS** (543 ⭐) - Auto-clustering across Orange/Raspberry Pi, gaming PC
- **ruisv/rcdl** (1 ⭐) - RKNPU inference + media library (C++17 + Python)
- **gclawes/rockchip-dra-driver** (1 ⭐) - Kubernetes DRA driver cho RK3588 GPU/NPU
- **gjing1st/rk3588-device-plugin** - K8s device plugin cho RK3588 NPU
- **darkautism/RockNPU** - Open-source Rust userspace runtime + compiler cho Rockchip NPUs

**Search - orangepi:**
- **nouverse/nouride-releases** (12 ⭐) - Lightweight multi-agent AI daemon cho mini devices (Pi, Orange Pi)
- **Artod/robot-pepin** (5 ⭐) - Home robot trên IKEA cart, Orange Pi relay

**Tín hiệu:** Edge AI maturity. RKLLM/RKNPU có Rust bindings, K8s integration, mainline Linux support. Orange Pi/RK3588 là target cho homelab AI stacks và robotics.

---

## 3. Phân tích tín hiệu xu hướng

### 🔥 Hot patterns

1. **Computer-use automation** (cua +609) - AI tương tác OS, cross-platform fleet management
2. **Persistent agent memory** - claude-mem, mem0, ai-memory: context vượt qua sessions
3. **Token compression** - headroom: 20-95% giảm tokens, giữ accuracy
4. **Offline-first AI** - project-nomad, taOS, anything-llm: own your intelligence
5. **Rust in AI infra** - rkllm-rs, Codewhale, RockNPU: performance + safety
6. **Edge AI orchestration** - K8s device plugins, DRA drivers cho NPUs
7. **Multi-agent frameworks** - CowAgent, nanobot: workflows, MCP, self-evolution

### 📊 Technology shifts

- **Memory → infrastructure layer**: không còn afterthought, là platform concern
- **RAG → Agent fusion**: RAG engines (ragflow) tích hợp agent capabilities
- **Local-first comeback**: offline knowledge servers, homelab-friendly agents
- **Edge inference maturity**: production-ready RKNPU stacks, containerization

### ⚡ Emerging tech

- **MCP (Model Context Protocol)**: xuất hiện trong nanobot, cherry-studio
- **Agentic workflows**: multi-step, conditional logic thay single-shot
- **RKLLM ecosystem**: Rust bindings, mainline kernel, K8s integration
- **Computer-use APIs**: cua framework cho automation across OS

---

## 4. Tâm điểm cộng đồng

### 🌟 Breakout projects (trending velocity)

1. **Open-Dev-Society/OpenStock** (+844) - FOSS alternative cho expensive market platforms
2. **trycua/cua** (+609) - Computer-use 2.0, training/eval benchmarks
3. **BuilderIO/agent-native** (+607) - Fresh agentic app framework

### 💎 Established momentum

- **NousResearch/hermes-agent** (247K ⭐) - Dominant agent với growth mechanism
- **affaan-m/ECC** (264K ⭐) - Agent harness optimization platform
- **Shubhamsaboo/awesome-llm-apps** (139K ⭐) - Canonical collection: 100+ agents/skills

### 🛠️ Infrastructure plays

- **thedotmack/claude-mem** (94K ⭐) - Memory persistence cho mọi agent
- **headroomlabs-ai/headroom** (73K ⭐) - Token compression library/proxy/MCP
- **coder/coder** (+460 trending) - Dev environments secure cho agents

### 🏠 Homelab trend

- **jaylfc/taOS** (543 ⭐) - Self-hosted agent OS, auto-clustering
- **Crosstalk-Solutions/project-nomad** (+394) - Offline knowledge server
- **nouverse/nouride-releases** (12 ⭐) - Multi-agent daemon cho mini devices

### 🇨🇳 Chinese ecosystem

- **bojieli/ai-agent-book** (49K ⭐) - Agent design book với code
- **datawhalechina/hello-agents** (80K ⭐) - Agents tutorial
- **jeecgboot/JeecgBoot** (47K ⭐) - Low-code platform, AI skills generation
- **ruanyf/weekly** (+182) - Tech weekly (中文)

---

## Kết luận

**Core theme:** Agents shift từ demos → production infrastructure. Memory persistence, token efficiency, và offline-first là requirements, không phải nice-to-haves. Edge AI (RKLLM/RKNPU) mature đủ cho homelab deployment. Computer-use automation là next frontier.

**Watch:** Computer-use frameworks (cua), persistent memory solutions, Rust agent runtimes, MCP adoption.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*