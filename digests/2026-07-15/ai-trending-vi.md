# Xu hướng AI Mã nguồn mở 2026-07-15

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-15 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn Mở - 15/07/2026

## 🌟 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của **hệ sinh thái AI coding assistant** với làn sóng skills, contexts và memory systems cho các agent như Claude Code, Cursor, Codex. Bên cạnh đó, **edge AI trên hardware giá rẻ** (RK3588, Orange Pi) đang trưởng thành với các implementation thực tế từ vision models đến voice assistants. Đáng chú ý là sự xuất hiện của các **AI vertical applications** như video editing, trading agents, và presentation generators.

**Tín hiệu mạnh nhất**: Cộng đồng đang chuyển từ "xây dựng LLM" sang "làm cho LLM làm việc tốt hơn trong workflow thực tế" - thể hiện qua các projects về agent memory, safety guards, và productivity tools.

---

## 🎯 Top Repos Theo Chiều

### 🤖 **AI Agents**

**Trending hôm nay:**
- **awesome-llm-apps** (+1,106 ⭐) - Collection 100+ AI Agent & RAG apps có thể deploy ngay
- **ai-hedge-fund** (+109 ⭐) - Multi-agent system cho trading tự động
- **Vibe-Trading** (+1,256 ⭐) - Personal trading agent với "vibe" analysis

**Hot trong tuần:**
- **NousResearch/hermes-agent** (214K ⭐) - Agent framework đang dẫn đầu
- **CowAgent** (45K ⭐) - Super AI assistant tự tiến hóa với memory & knowledge
- **nanobot** (45K ⭐) - Lightweight agent cho tools & workflows

**Insight**: Trading agents đang là vertical hot nhất, với 2 projects riêng trong top trending. Pattern chung là multi-agent architecture với specialized roles.

---

### 🔧 **AI Infrastructure**

**Trending hôm nay:**
- **skills** (+1,679 ⭐) - Matt Pocock's `.claude` skills directory cho real engineers
- **destructive_command_guard** (+473 ⭐) - Safety layer bằng Rust để block dangerous commands từ agents
- **hallmark** (+1,015 ⭐) - Anti-AI-slop design skill cho Claude Code/Cursor
- **graphify** (+1,851 ⭐) - Biến codebase/docs/videos thành queryable knowledge graph

**Hot trong tuần:**
- **ECC** (229K ⭐) - Agent harness performance optimization system
- **claude-mem** (87K ⭐) - Persistent context across sessions cho mọi agent
- **career-ops** (60K ⭐) - AI job search tự động với CV tailoring

**Insight**: Đây là chiều nóng nhất - cộng đồng đang xây **infrastructure layer giữa LLM và developer workflow**. Focus vào: context persistence, safety, quality control (anti-slop), và knowledge structuring.

---

### 🧠 **Models & Training**

**Trending search:**
- **YOLO11-Training-Conversion** - End-to-end pipeline training + convert cho edge (RKNN, NCNN, Hailo)
- **Qwen3-VL-2B-NPU** (34 ⭐) - Vision-language model trên RK3588 NPU
- **InternVL3.5-4B-NPU** (3 ⭐) - Multimodal AI cho RK3588

**Hot repos:**
- **transformers** (162K ⭐) - Still dominant framework
- **rasbt/LLMs-from-scratch** (99K ⭐) - Educational implementation
- **vllm-project/vllm** (86K ⭐) - High-throughput inference engine

**Insight**: Training đang shift toward **edge deployment** - các tools convert sang RKNN, NPU formats đang xuất hiện nhiều. Vision-language models size nhỏ (2B-4B params) được ưu tiên.

---

### 📦 **AI Applications**

**Trending hôm nay:**
- **OpenCut** (+4,276 ⭐) - Open-source CapCut alternative
- **Clypra** (+85 ⭐) - Modern video editor với Tauri + React
- **ppt-master** (39K ⭐) - AI tạo PowerPoint thật (native shapes, editable charts)
- **grok2api** (+186 ⭐) - Multi-account API gateway cho Grok

**Utility apps:**
- **Win11Debloat** (+783 ⭐) - Windows declutter script
- **exercises-dataset** (+851 ⭐) - 1,324 fitness exercises với GIFs và instructions

**Insight**: **Video editing** đang là battlefield mới - 2 open-source alternatives cho CapCut trong cùng ngày. AI-generated presentations với real editing capability (không phải images) cũng đang nổi.

---

### 🔍 **RAG & Knowledge**

**Dominant players:**
- **dify** (148K ⭐) - Production RAG platform
- **open-webui** (145K ⭐) - User-friendly AI interface
- **langchain** (141K ⭐) - The agent engineering platform
- **ragflow** (85K ⭐) - RAG + Agent capabilities fusion
- **PaddleOCR** (85K ⭐) - PDF/image → structured data for AI

**New approaches:**
- **graphify** - Knowledge graph approach thay vì vector DB thuần
- **siyuan** (45K ⭐) - Privacy-first personal knowledge management

**Insight**: RAG đang evolve từ simple vector search sang **hybrid approaches**: knowledge graphs + vector DB + OCR. Privacy-first và self-hosted đang là selling points mạnh.

---

### 🔌 **Embedded AI (NPU, Edge, RK3588/Orange Pi)**

**RKLLM ecosystem:**
- **Qwen3-VL-2B-NPU** (34 ⭐) - Vision-language trên RK3588
- **rk3576-home-assistant-voice** (12 ⭐) - NPU-accelerated Whisper + Piper cho Home Assistant
- **rkllm-docker** (1 ⭐) - Dockerized RKLLM với OpenAI-compatible API
- **ggml-rocket** (6 ⭐) - GGML backend cho Rockchip NPU
- **rocket-userspace** (6 ⭐) - Userspace driver cho RK3588 NPU

**Orange Pi projects:**
- **taOS** (431 ⭐) - Self-hosted AI agent OS cho SBCs
- **taosmd** (67 ⭐) - Local-first AI memory chạy offline
- **OrangePi5Pro** (13 ⭐) - Ubuntu 26.04 với full hardware support (Mali GPU, NPU, HW video)
- **MichaIng/DietPi** (6,151 ⭐) - Lightweight OS cho SBCs

**Gaming & emulation:**
- **sharpemu** (+332 ⭐) - PS5 emulator thử nghiệm (C#)

**Insight**: **RK3588 NPU ecosystem đang mature nhanh** - từ pure inference sang full stacks (voice assistants, agents, GGML integration). Mainline kernel support với Vulkan + 3-core NPU DVFS là game changer. Xuất hiện **clean-room implementations** để tránh proprietary blobs.

---

## 📈 Phân tích Tín hiệu Xu hướng

### 🔥 **Trends nổi bật**

1. **Agent Context & Memory Wars**
   - Persistent context (claude-mem, taosmd) đang là must-have feature
   - Knowledge graphs thay vì pure vector stores (graphify)
   - Cross-session memory cho multi-turn workflows

2. **Safety & Quality Control Layer**
   - Destructive command guards (Rust-based)
   - Anti-AI-slop skills (hallmark)
   - Sandbox và security đang được prioritize

3. **Edge AI đi vào production**
   - RK3588 NPU với mainline kernel support
   - Docker containers cho NPU workloads
   - OpenAI-compatible APIs cho edge models

4. **Vertical AI Applications Boom**
   - Video editing: Open alternatives cho CapCut
   - Trading: Personal hedge fund agents
   - Presentations: Native editable outputs, không phải images
   - Voice: Home automation với local NPU acceleration

5. **Developer Experience Focus**
   - Skills directories (.claude) đang standardize
   - Agent harness optimization (ECC)
   - Lazy dev mindset (ponytail) - "best code is no code"

### 🌊 **Emerging Patterns**

- **Multi-framework agent compatibility**: Tools đang được build để work với Claude Code, Codex, Cursor, Gemini CLI, không lock-in
- **Privacy-first + Self-hosted**: Reaction với cloud dependency, users muốn own their data
- **Hybrid architectures**: NPU + GPU + CPU clustering trên consumer hardware
- **Open alternatives cho vertical tools**: CapCut, design tools đang bị target

---

## 💬 Tâm điểm Cộng đồng

### 🎖️ **Breakout Projects**

1. **OpenCut** (+4,276 trong 1 ngày) - Đánh trúng nhu cầu open-source video editing, community đang frustrate với CapCut restrictions

2. **skills by Matt Pocock** (+1,679) - Thought leader effect, developers tin vào curated skills từ known engineers hơn generic prompts

3. **graphify** (+1,851) - Knowledge graph approach đang resonate vì solve được context limitations của pure vector RAG

4. **ECC** (229K ⭐) - Đang trở thành de-facto standard cho agent optimization

### 🗣️ **Community Sentiment**

- **Frustration với AI coding assistant quality**: Hallmark (anti-slop) và ponytail (lazy dev) reflect dissatisfaction với generic AI outputs
- **Trust issues với proprietary tools**: Wave of open alternatives (OpenCut, Clypra, taOS)
- **Excitement về edge AI**: RK3588 community rất active, rapid iteration với mainline kernel
- **Demand cho practical, runnable code**: awesome-llm-apps (100+ apps) viral vì "actually run" promise

### 🎯 **What Developers Want**

1. **Agent memory that actually works** (persistent, cross-session)
2. **Safety without friction** (guards that don't break workflow)
3. **Local-first with cloud option** (privacy + convenience)
4. **Hardware utilization** (NPU, GPU clusters từ consumer hardware)
5. **Quality over quantity** (anti-slop movement strong)

---

## 🎬 Kết luận

**2026-07-15 đánh dấu shift từ "AI capabilities" sang "AI productivity infrastructure"**. Cộng đồng không còn hỏi "LLM có thể làm gì?" mà hỏi "Làm sao LLM làm việc TỐT HƠN trong workflow của tôi?". Edge AI với RK3588 đang từ experimental sang production-ready. Open-source alternatives cho vertical tools đang gain momentum mạnh.

**Key takeaway cho developers**: Invest vào agent infrastructure (memory, context, safety) và edge deployment capabilities. The next wave không phải là bigger models, mà là better integration.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*