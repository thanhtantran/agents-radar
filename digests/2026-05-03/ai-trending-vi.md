# Xu hướng AI Mã nguồn mở 2026-05-03

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-05-03 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn mở - 03/05/2026

## 🎯 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của **AI Agents** và **orchestration platforms**, với 3/8 repo trending top đều liên quan đến agent frameworks. Đặc biệt nổi bật là sự xuất hiện của các giải pháp tích hợp Claude Code và multi-agent systems. Bên cạnh đó, **embedded AI trên NPU** (đặc biệt RK3588) đang có động lực phát triển mạnh với nhiều dự án multimodal mới.

**Điểm nhấn**: Cộng đồng đang chuyển từ "chat với AI" sang "AI làm việc tự động" - từ trading agents đến coding agents, từ browser automation đến enterprise orchestration.

---

## 🏆 Top Repos Theo Chiều

### 🤖 **AI Agents** - Orchestration & Automation

**⭐ Trending hôm nay:**

- **TauricResearch/TradingAgents** (+2,225 ⭐)
  - Multi-agent LLM framework cho trading tài chính
  - Python-based, tập trung vào autonomous trading decisions
  
- **ruvnet/ruflo** (+1,299 ⭐)
  - Enterprise-grade orchestration platform cho Claude
  - Multi-agent swarms, distributed intelligence, RAG integration
  - TypeScript, native Claude Code/Codex support

- **browserbase/skills** (+346 ⭐)
  - Claude Agent SDK với web browsing capabilities
  - JavaScript, tích hợp sâu với browser automation

**🔥 Top repos theo search (7 ngày):**

- **NousResearch/hermes-agent** (129K ⭐) - "The agent that grows with you"
- **CherryHQ/cherry-studio** (44.9K ⭐) - AI productivity studio với 300+ assistants
- **zhayujie/CowAgent** (44K ⭐) - Siêu AI assistant cho WeChat/Feishu/DingTalk
- **santifer/career-ops** (41.9K ⭐) - AI job search system trên Claude Code
- **HKUDS/nanobot** (41.5K ⭐) - Ultra-lightweight personal AI agent

**💡 Insight**: Agent frameworks đang phân hóa theo vertical - từ trading, career, productivity đến enterprise orchestration.

---

### 🔧 **AI Infrastructure** - SDKs, Tools & CLIs

**⭐ Trending & Notable:**

- **1jehuang/jcode** (+482 ⭐)
  - Coding Agent Harness bằng Rust
  - Focus vào performance và reliability

**🔥 Top repos theo search:**

- **CopilotKit/CopilotKit** (30.6K ⭐) - Frontend stack cho Agents & Generative UI (React + Angular)
- **googleworkspace/cli** (25.7K ⭐) - Unified CLI cho toàn bộ Google Workspace + AI agent skills
- **Gitlawb/openclaude** (25.5K ⭐) - "runs anywhere, uses anything"
- **iOfficeAI/AionUi** (23.5K ⭐) - Local 24/7 cowork app cho Gemini CLI, Claude Code, Codex...

**💡 Insight**: Infrastructure đang hướng tới **unified interfaces** - một CLI/SDK cho nhiều LLM providers, cross-platform, local-first.

---

### 🧠 **Models & Training**

**🔥 Top repos:**

- **huggingface/transformers** (160K ⭐) - Framework chuẩn cho ML models
- **hiyouga/LlamaFactory** (70.8K ⭐) - Unified fine-tuning cho 100+ LLMs & VLMs
- **vllm-project/vllm** (78.9K ⭐) - High-throughput inference engine

**💡 Insight**: Focus chuyển sang **efficiency** - inference optimization, memory-efficient serving, unified fine-tuning frameworks.

---

### 📦 **AI Applications** - Vertical Solutions

**⭐ Trending:**

- **soxoj/maigret** (+1,064 ⭐)
  - OSINT tool: thu thập dossier từ 3000+ sites theo username
  - Python, use case rõ ràng cho security/investigation

**🔥 Top repos:**

- **nocobase/nocobase** (22.3K ⭐) - AI + no-code platform cho business systems
- **ShareX/ShareX** (+152 hôm nay) - Screen capture & upload tool (C#)

**💡 Insight**: Applications đang kết hợp AI với no-code/low-code để democratize development.

---

### 🔍 **RAG & Knowledge Management**

**🔥 Top repos:**

- **langgenius/dify** (139.9K ⭐) - Production-ready agentic workflow platform
- **langchain-ai/langchain** (135.6K ⭐) - Agent engineering platform
- **open-webui/open-webui** (135.2K ⭐) - User-friendly AI interface
- **Shubhamsaboo/awesome-llm-apps** (108.4K ⭐) - 100+ AI Agent & RAG apps
- **thedotmack/claude-mem** (71.1K ⭐) - Auto-capture & compress Claude sessions với AI
- **Mintplex-Labs/anything-llm** (59.4K ⭐) - All-in-one AI productivity, on-device
- **mem0ai/mem0** (54.6K ⭐) - Universal memory layer cho AI Agents
- **FlowiseAI/Flowise** (52.5K ⭐) - Build AI Agents visually
- **run-llama/llama_index** (49.1K ⭐) - Document agent & OCR platform

**💡 Insight**: RAG đang evolve thành **memory systems** - không chỉ retrieve mà còn learn, compress, và inject context intelligently.

---

### 🔌 **Embedded AI** - NPU, Edge AI, RKLLM/RKNPU

**🔥 RKLLM/RKNPU Projects:**

- **Leon6225/InternVL3.5-4B-NPU** (1 ⭐, updated 03/05)
  - Multimodal AI (InternVL3.5-4B) cho RK3588 NPU
  - C++, vision + language understanding

- **toopac01/InternVL3.5-8B-NPU** (0 ⭐, updated 03/05)
  - InternVL3.5-8B variant cho RK3588
  - Advanced multimodal capabilities

- **jaylfc/tinyagentos** (94 ⭐)
  - Self-hosted AI agent OS cho low-cost hardware (Orange Pi, Raspberry Pi)
  - Python, desktop shell, app store, distributed compute cluster

- **w568w/rknpu-module** (10 ⭐)
  - Out-of-tree RKNPU kernel module cho mainline Linux 6.19+
  - C, enables NPU support on vanilla kernels

- **schwankner/talos-rk3588-npu** (2 ⭐)
  - Talos Linux extension + K8s CDI device plugin cho RK3588 NPU
  - Kubernetes-native NPU orchestration

- **kenedii/autonav** (0 ⭐)
  - Self-driving RC car với ResNet vision models
  - End-to-end pipeline cho NVIDIA Jetson Nano & Rockchip NPU

**🍊 Orange Pi Ecosystem:**

- **jaylfc/taosmd** (25 ⭐)
  - Local-first AI memory cho SBC/mini PC
  - Zero-loss archive, knowledge graph, hybrid retrieval
  - Framework-agnostic, offline-first

- **MichaIng/DietPi** (6K ⭐) - Lightweight OS cho SBC
- **bigbugcc/OpenWrts** (748 ⭐) - OpenWRT builds cho Orange Pi R1Plus

**💡 Insight**: 
- **RK3588 NPU đang trở thành platform chính cho edge multimodal AI** - từ vision models đến agent OS
- **Kubernetes + NPU integration** đang xuất hiện (Talos Linux extension)
- **Local-first AI** trên SBC đang mature - từ inference đến memory systems
- Trend: **Multimodal models (InternVL) đang được port sang NPU** thay vì chỉ single-task models

---

## 🔮 Phân tích Tín hiệu Xu hướng

### 1️⃣ **Agent Orchestration Platforms đang bùng nổ**
- Từ single-agent sang **multi-agent swarms** (ruflo)
- Enterprise-grade features: distributed intelligence, RAG, security
- Vertical specialization: trading, coding, career, productivity

### 2️⃣ **Claude Code/Codex Integration là hot trend**
- Nhiều projects tích hợp native Claude Code (ruflo, AionUi, career-ops)
- Memory systems cho Claude sessions (claude-mem)
- Unified interfaces cho multiple coding agents (jcode, openclaude)

### 3️⃣ **Local-first & Privacy-first AI**
- On-device inference (anything-llm, open-webui)
- Self-hosted agent OS (tinyagentos)
- Local memory systems (taosmd)
- Trend: "runs anywhere, uses anything"

### 4️⃣ **Edge AI trên NPU đang mature**
- **RK3588 NPU** trở thành platform chính
- **Multimodal models** (InternVL3.5) đang được optimize cho NPU
- Kubernetes integration cho NPU workloads
- Agent OS cho low-cost hardware

### 5️⃣ **Memory & Context Management**
- Từ RAG sang **universal memory layers** (mem0)
- Auto-capture & compress sessions (claude-mem)
- Knowledge graphs + hybrid retrieval (taosmd)
- Long-term memory cho agents

### 6️⃣ **Unified Tooling & Cross-platform**
- One CLI for multiple services (googleworkspace/cli)
- Framework-agnostic memory (taosmd)
- Multi-LLM support (ollama, AionUi)

---

## 🎪 Tâm điểm Cộng đồng

### 🥇 **Most Exciting Today**
1. **TradingAgents** - AI vào finance, high-stakes domain
2. **ruflo** - Enterprise orchestration cho Claude, production-ready
3. **jcode** - Rust-based coding agent harness, performance-focused

### 🚀 **Rising Stars (7 days)**
1. **hermes-agent** (129K ⭐) - "The agent that grows with you" - massive adoption
2. **everything-claude-code** (172K ⭐) - Comprehensive Claude Code ecosystem
3. **nanobot** (41.5K ⭐) - Ultra-lightweight personal agent

### 🔥 **Community Momentum**
- **Agent frameworks** đang thống trị trending
- **Claude ecosystem** đang expand nhanh
- **Edge AI trên NPU** có community nhỏ nhưng active
- **Local-first AI** đang được ưu tiên hơn cloud solutions

### 💎 **Hidden Gems**
- **taosmd** - Local AI memory cho SBC, framework-agnostic
- **InternVL3.5-NPU projects** - Multimodal AI trên edge hardware
- **talos-rk3588-npu** - K8s integration cho NPU

---

## 📌 Kết luận

**2026 là năm của AI Agents** - không còn là concept mà đã production-ready với enterprise features. **Claude Code** đang trở thành platform chính cho coding agents. **Edge AI trên NPU** đang mature với multimodal capabilities. **Local-first & privacy-first** là xu hướng mạnh, đặc biệt trong context geopolitical tensions.

**Next wave**: Multi-agent orchestration, memory systems, và edge multimodal AI sẽ tiếp tục phát triển mạnh.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*