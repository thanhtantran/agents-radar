# Xu hướng AI Mã nguồn mở 2026-06-10

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-06-10 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã Nguồn Mở - 10/06/2026

## 🎯 Tóm tắt hôm nay

Hôm nay không có dữ liệu trending trực tiếp, nhưng qua GitHub Search 7 ngày gần đây, ta thấy một làn sóng mạnh mẽ về **AI on Edge** - đặc biệt là các giải pháp chạy AI trên hardware consumer như Orange Pi, Rockchip NPU. Xu hướng "local-first AI" đang bùng nổ với nhiều dự án tập trung vào khả năng chạy AI hoàn toàn offline, không phụ thuộc cloud.

Điểm nổi bật: **Sự kết hợp giữa NPU acceleration và AI agents** đang tạo ra một thế hệ mới của self-hosted intelligent systems.

---

## 🔥 Top Repos Theo Chiều

### 🤖 **AI Agents**

**⭐ NousResearch/hermes-agent** (188,888⭐)
- Agent framework có khả năng "grows with you" - học và phát triển theo người dùng
- Dẫn đầu về số lượng stars, cho thấy nhu cầu cao về autonomous agents

**⭐ zhayujie/CowAgent** (45,178⭐)
- Agent harness mã nguồn mở với khả năng self-evolve
- Multi-model, multi-channel, cài đặt one-line
- Tích hợp memory và knowledge management

**⭐ HKUDS/nanobot** (43,959⭐)
- Lightweight agent cho tools, chats, và workflows
- Focus vào tính đơn giản và khả năng mở rộng

**⭐ jaylfc/taOS** (220⭐)
- Self-hosted auto clustering AI agent OS cho consumer hardware
- Full desktop, app store, agent deployment, distributed compute
- Đặc biệt thiết kế cho Orange Pi, Raspberry Pi, Mac Mini

---

### 🔧 **AI Infrastructure**

**⭐ NotPunchnox/rkllama** (553⭐)
- Ollama alternative cho Rockchip NPU
- Giải pháp chạy AI/Deep learning tối ưu trên RK devices với NPU support

**⭐ thedotmack/claude-mem** (81,494⭐)
- Persistent context system cho AI agents
- Hoạt động với Claude Code, OpenClaw, Codex, Gemini, Hermes
- Capture, compress, và inject context vào future sessions

**⭐ safishamsi/graphify** (64,267⭐)
- AI coding assistant skill biến code/schemas/docs thành knowledge graph
- Hỗ trợ Claude Code, Codex, OpenCode, Cursor, Gemini CLI
- App code + database schema + infrastructure trong một graph

**⭐ RaspAP/raspap-webgui** (5,180⭐)
- Full-featured wireless router setup cho Debian devices
- Infrastructure tool cho edge computing setups

---

### 🧠 **Models & Training**

**⭐ Leon6225/InternVL3.5-4B-NPU** (1⭐)
- Multimodal AI (vision + language) cho RK3588 NPU
- Xu hướng port các model multimodal xuống edge hardware

**⭐ toopac01/InternVL3.5-8B-NPU** (0⭐)
- Version 8B của InternVL3.5 cho RK3588
- Đẩy ranh giới của model size trên NPU hardware

**⭐ zyp0424/Qwen-Chat-Assistant** (7⭐)
- Qwen3-2B chạy hoàn toàn local trên RK3588
- Kết hợp RKNN + RKLLM với camera, voice (KWS, ASR, TTS)
- Chatbot assistant hoàn chỉnh không cần internet

---

### 📦 **AI Applications**

**⭐ CherryHQ/cherry-studio** (47,134⭐)
- AI productivity studio với smart chat, autonomous agents
- 300+ assistants, unified access tới frontier LLMs
- All-in-one solution cho end users

**⭐ santifer/career-ops** (51,734⭐)
- AI-powered job search system built on Claude Code
- 14 skill modes, Go dashboard, PDF generation, batch processing
- Vertical solution cho career management

**⭐ ZhuLinsen/daily_stock_analysis** (41,537⭐)
- LLM-driven stock analysis cho A/H/US markets
- Multi-source data + real-time news + LLM decision dashboard
- Zero-cost scheduled runs, "pure free tier"

**⭐ lmambr2/moneypenny** (2⭐)
- NPU-accelerated AI + music assistant cho TeamSpeak 6
- Self-hosted trên Orange Pi 5 Max (RK3588)
- One repo, one docker compose, no cloud

**⭐ Ponce1969/contador-oriental-ai** (3⭐)
- Hệ thống quản lý tài chính gia đình với local AI
- Enterprise architecture: Python, Fleting, PostgreSQL, Ollama
- 100% offline, sẵn sàng cho Orange Pi 5 Plus

---

### 🔍 **RAG & Knowledge**

**⭐ langgenius/dify** (144,595⭐)
- Production-ready platform cho agentic workflow
- Dẫn đầu về RAG/workflow orchestration

**⭐ open-webui/open-webui** (140,866⭐)
- User-friendly AI interface hỗ trợ Ollama, OpenAI API
- Self-hosted alternative cho ChatGPT UI

**⭐ langchain-ai/langchain** (138,902⭐)
- "The agent engineering platform"
- Rebranding từ chain sang agent-centric approach

**⭐ infiniflow/ragflow** (82,320⭐)
- Leading open-source RAG engine
- Fusion RAG + Agent capabilities

**⭐ jaylfc/taosmd** (45⭐)
- Local-first AI memory cho máy có 8GB+ RAM
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval
- Framework-agnostic, no cloud - companion project cho taOS

**⭐ Mintplex-Labs/anything-llm** (61,327⭐)
- "Stop renting your intelligence. Own it."
- Local-first agent experience platform

**⭐ mem0ai/mem0** (58,205⭐)
- Universal memory layer cho AI Agents
- Infrastructure component cho agent memory

**⭐ Nayerim-AI/NPUShield** (0⭐)
- Production guardrail và RAG layer cho RKLLM trên RK3588 NPU
- Security và safety cho edge AI deployments

---

### 🔌 **Embedded AI**

**Monitoring & DevOps:**
- **YeWenxuan64/rktop** (4⭐): Real-time monitoring bash script cho RK3588 CPU, NPU, GPU, RGA
- **chenweihan02/rktop-lite** (1⭐): Lightweight monitor + CSV logger cho SSH-based tracking
- **portg80/Cooling-for-orange-pi-zero-w2...** (7⭐): Cooling system + Home Assistant integration

**System Building:**
- **MichaIng/DietPi** (6,106⭐): Lightweight OS cho single-board computers
- **bigbugcc/OpenWrts** (755⭐): OpenWRT firmware cho Raspberry Pi, NanoPi, Orange Pi, x86
- **CERALIVE/image-building-pipeline** (3⭐): mkosi-based image builder cho RK3588 devices

**Libraries & Tools:**
- **ptitSeb/gl4es** (835⭐): OpenGL to GL ES translation cho SBCs
- **vanvught/rpidmx512** (444⭐): Orange Pi DMX512/RDM/MIDI/OSC toolkit

**Infrastructure as Code:**
- **freed-dev-llc/terraform-provider-turingpi** (6⭐): Terraform provider cho Turing Pi 2.5 BMC
- **freed-dev-llc/terraform-turingpi-modules** (2⭐): Terraform modules cho Turing Pi clusters

---

## 🔮 Phân Tích Tín Hiệu Xu Hướng

### 1. **"Local-First AI" Movement** 🏠
- Phong trào mạnh mẽ chống lại sự phụ thuộc vào cloud
- Keywords lặp lại: "self-hosted", "offline", "no cloud", "zero-cost", "privacy-first"
- Anything-llm's tagline "Stop renting your intelligence" là biểu tượng của movement này

### 2. **NPU Acceleration on Consumer Hardware** ⚡
- Rockchip RK3588 đang trở thành platform yêu thích cho edge AI
- Orange Pi ecosystem đang bùng nổ với nhiều projects production-ready
- Xu hướng port các model lớn (Qwen3, InternVL) xuống NPU hardware

### 3. **Agent Memory & Context Persistence** 🧠
- Memory systems (claude-mem, mem0, taosmd) đang là hot topic
- Giải quyết vấn đề context loss giữa các sessions
- Knowledge graphs và hybrid retrieval đang thay thế vector-only approaches

### 4. **Multi-Modal Edge AI** 👁️🎤
- Kết hợp vision + language + voice trên cùng một device
- Qwen-Chat-Assistant là ví dụ điển hình: camera + voice + LLM on RK3588
- Xu hướng "all-in-one assistant" chạy hoàn toàn local

### 5. **Infrastructure as Code cho Edge Clusters** 🏗️
- Terraform providers cho Turing Pi, Orange Pi
- Distributed compute clusters từ consumer hardware
- taOS's "auto clustering" cho thấy xu hướng democratize cluster computing

### 6. **Agent-Centric Rebranding** 🤖
- Langchain từ "chains" → "agent engineering platform"
- RAG systems integrate agent capabilities (RAGFlow)
- Shift từ passive retrieval sang active agent behaviors

### 7. **Vertical AI Applications** 📊
- Job search (career-ops), stock analysis (daily_stock_analysis), personal finance (contador-oriental-ai)
- AI đang move từ general-purpose sang domain-specific solutions
- Focus vào "zero-cost" và "pure free tier" solutions

---

## 🎪 Tâm Điểm Cộng Đồng

### 🏆 **Mega Projects (>100K stars)**
- **NousResearch/hermes-agent** (188K): Agent có khả năng grow - conceptually breakthrough
- **langgenius/dify** (144K): Production platform đang consolidate ecosystem
- **open-webui** (140K): Self-hosted UI alternative đang thay thế các cloud solutions

### 🚀 **Rising Stars**
- **NotPunchnox/rkllama** (553⭐): Ollama cho NPU - giải pháp nhiều người đang chờ đợi
- **jaylfc/taOS** (220⭐): Full OS cho consumer AI hardware - ambitious và complete
- **thedotmack/claude-mem** (81K): Context persistence đang là must-have feature

### 💎 **Hidden Gems (<10 stars nhưng high-quality)**
- **zyp0424/Qwen-Chat-Assistant** (7⭐): Complete voice assistant hoàn toàn local, với detailed docs
- **YeWenxuan64/rktop** (4⭐): Essential monitoring tool cho RK3588 developers
- **Ponce1969/contador-oriental-ai** (3⭐): Enterprise-grade architecture cho personal finance

### 🛠️ **Developer Tools Getting Traction**
- **safishamsi/graphify** (64K): Code → knowledge graph là game changer cho code understanding
- **shareAI-lab/learn-claude-code** (65K): "Bash is all you need" - minimalist agent approach
- **freed-dev-llc Terraform ecosystem**: IaC cho edge clusters đang mature

---

## 💡 Kết Luận

Năm 2026 đang chứng kiến một **paradigm shift** từ cloud-dependent AI sang **edge-first, local-first AI**. Consumer hardware như Orange Pi + Rockchip NPU không còn là toy projects mà đang trở thành **production-grade platforms** với ecosystem hoàn chỉnh (OS, monitoring, IaC, applications).

**Key Insight**: Cộng đồng đang build một "parallel AI stack" - không phụ thuộc Big Tech cloud, chạy hoàn toàn local, accessible với budget thấp, nhưng vẫn đạt production quality. Đây là một movement về **AI sovereignty** và **democratization of AI infrastructure**.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*