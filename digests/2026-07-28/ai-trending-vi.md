# Xu hướng AI Mã nguồn mở 2026-07-28

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-28 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn mở - 28/07/2026

## 🌟 Tóm tắt hôm nay

Cộng đồng AI mã nguồn mở đang chứng kiến sự bùng nổ của **AI agents tự chủ** và **embedded AI**. Xu hướng nổi bật là sự dịch chuyển từ chatbot đơn thuần sang các hệ thống agent đa năng có khả năng tự động hóa công việc phức tạp. Đồng thời, AI edge trên hardware giá rẻ (Orange Pi, RK3588) đang trở thành mainstream với khả năng chạy VLM và LLM offline.

**Tín hiệu quan trọng**: 
- Agent harness và context optimization đang là bài toán trọng tâm
- Self-hosted, privacy-first AI đang được ưa chuộng hơn cloud services
- NPU/edge inference đang có bước tiến vượt bậc về performance và accessibility

---

## 🤖 AI Agents - Hệ thống tự chủ thông minh

### 🔥 Trending hôm nay

**moeru-ai/airi** (+572 ⭐)
- Self-hosted AI companion với khả năng voice chat realtime
- Chơi được Minecraft và Factorio (!), đa nền tảng (Web/macOS/Windows)
- Hướng tới mục tiêu đạt level Neuro-sama
- *Insight*: AI companions đang tiến từ text-only sang embodied agents có khả năng tương tác với games và virtual worlds

**alibaba/open-code-review** (+979 ⭐)
- Battle-tested tại quy mô Alibaba
- Hybrid architecture: deterministic pipelines + LLM Agent
- Built-in ruleset cho NPE, thread-safety, XSS, SQL injection
- *Insight*: Enterprise đang áp dụng AI vào code review với approach kết hợp rule-based và AI

### 📈 Trending 7 ngày

**NousResearch/hermes-agent** (221K ⭐)
- "The agent that grows with you" - learning agent framework
- Cộng đồng lớn nhất trong phân khúc agent development

**affaan-m/ECC** (234K ⭐)
- Agent harness performance optimization system
- Skills, instincts, memory cho Claude Code, Codex, Cursor
- *Insight*: Agent optimization đang là competitive edge mới

**zhayujie/CowAgent** (46K ⭐)
- Self-evolving agent với memory và knowledge
- Multi-model, multi-channel, lightweight
- Từ chatgpt-on-wechat tiến hóa thành full agent framework

---

## 🔧 AI Infrastructure - Tools & SDKs

### 🔥 Trending hôm nay

**bradautomates/claude-video** (+434 ⭐)
- Cho phép Claude xem video: download → extract frames → transcribe → analyze
- *Insight*: Multimodal capabilities đang được mở rộng từ image sang video

**mvanhorn/last30days-skill** (+240 ⭐)
- AI agent skill research topics across Reddit, X, YouTube, HN, Polymarket
- Synthesize grounded summary
- *Insight*: Composable agent skills đang trở thành pattern phổ biến

### 📈 Trending 7 ngày

**ollama/ollama** (177K ⭐)
- Hỗ trợ Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen
- Infrastructure layer cho local LLM deployment

**firecrawl/firecrawl** (157K ⭐)
- API to search, scrape, and interact with web at scale
- Infrastructure cho web agents

**headroomlabs-ai/headroom** (62K ⭐)
- Compress tool outputs, logs trước khi đưa vào LLM
- 20% fewer tokens cho coding agents, 60-95% cho JSON
- *Insight*: Context optimization đang là bottleneck lớn, giải pháp compression rất được quan tâm

**thedotmack/claude-mem** (88K ⭐)
- Persistent context across sessions cho mọi agent
- AI-powered compression và context injection
- *Insight*: Memory management là yếu tố quyết định trải nghiệm agent dài hạn

---

## 🧠 Models & Training

### 🔥 Trending hôm nay

**shiyu-coder/Kronos** (+441 ⭐)
- Foundation model cho ngôn ngữ của thị trường tài chính
- *Insight*: Domain-specific foundation models đang được phát triển cho các vertical chuyên sâu

---

## 📦 AI Applications - Sản phẩm thực tế

### 🔥 Trending hôm nay

**pbakaus/impeccable** (+847 ⭐)
- Design language giúp AI harness thiết kế tốt hơn
- *Insight*: Design systems cho AI-generated UI đang là frontier mới

**permissionlesstech/bitchat** (+2,346 ⭐ - TOP 1!)
- Bluetooth mesh chat với IRC vibes
- *Insight*: Decentralized, permissionless communication đang có sức hút mạnh

**opengeos/GeoLibre** (+420 ⭐)
- Cloud-native GIS platform
- Chạy trên browser, desktop, mobile, Jupyter notebooks
- *Insight*: Lightweight, cross-platform GIS tools đang democratize geospatial analysis

### 📈 Trending 7 ngày

**CherryHQ/cherry-studio** (49K ⭐)
- AI productivity studio với 300+ assistants
- Unified access to frontier LLMs
- Smart chat + autonomous agents

**hugohe3/ppt-master** (41K ⭐)
- AI tạo native PowerPoint với shapes, transitions, animations
- Data-backed charts, audio narration
- *Insight*: AI đang move beyond text generation sang structured content creation

**Panniantong/Agent-Reach** (61K ⭐)
- Cho phép agent "nhìn" toàn bộ internet
- Read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- Zero API fees

**santifer/career-ops** (61K ⭐)
- Open-source AI job search
- Scan job portals, evaluate với A-F rubric, tailor CV
- *Insight*: Career automation là use case thực tế được quan tâm

---

## 🔍 RAG & Knowledge - Hệ thống tri thức

### 📈 Trending 7 ngày

**Shubhamsaboo/awesome-llm-apps** (128K ⭐)
- 100+ AI Agents, Agent Skills và RAG Apps
- Community-driven repository lớn nhất

**infiniflow/ragflow** (86K ⭐)
- Leading RAG engine fusion với Agent capabilities
- Superior context layer cho LLMs

**Mintplex-Labs/anything-llm** (63K ⭐)
- "Stop renting your intelligence. Own it"
- Local-first agent experience
- *Insight*: Privacy và data ownership đang là selling point chính

**mem0ai/mem0** (61K ⭐)
- Universal memory layer for AI Agents
- Cross-platform memory management

**run-llama/llama_index** (51K ⭐)
- Leading document agent và OCR platform
- *Insight*: Document understanding đang converge với agent capabilities

---

## 🔌 Embedded AI - Edge Computing & NPU

### 🔥 Trending hôm nay (Search results)

**jaylfc/taOS** (462 ⭐)
- **Self-hosted AI agent OS**
- Memory, chat, agents, files trên hardware bạn sở hữu
- Offline by default, cloud by choice
- **Auto-clustering** across Orange/Raspberry Pi, Mac mini, gaming PC
- *Insight*: Distributed edge AI đang trở thành reality với auto-clustering

**jaylfc/taosmd** (71 ⭐)
- Local-first AI memory
- Chạy offline trên bất kỳ máy nào có 8GB+ RAM (SBC, mini PC, laptop)
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval
- *Insight*: 8GB RAM threshold làm cho AI memory accessible trên hardware phổ thông

### 📈 RK3588 NPU Ecosystem (7 ngày)

**Qengineering series** - VLM trên RK3588:
- **Qwen3-VL-2B-NPU** (36 ⭐)
- **Qwen3-VL-4B-NPU** (10 ⭐)
- **SmolVLM2** series (256M, 500M, 2B) (12-7-5 ⭐)
- **InternVL3-NPU** (7 ⭐)
- *Insight*: Vision-Language Models đang được port massively sang NPU

**Leon6225/InternVL3.5-4B-NPU** (5 ⭐)
- Advance multimodal AI on RK3588 NPU

**kyshipit/eai-rk3588** (1 ⭐)
- Extensible edge inference platform
- Multi-threaded pipeline, RKNN adapters, RKLLM chat
- Coordinator-driven multi-slot activation
- *Insight*: Production-ready inference frameworks cho NPU đang xuất hiện

**YeWenxuan64/Edge_ModelDeploy + Edge_Inferencer** (0 ⭐ - mới)
- Toolchain PyTorch/TensorFlow → ONNX → RKNN/QNN
- One-click quantization cho Rockchip & Qualcomm NPU
- Unified API cho RKNN/QNN/ONNX Runtime
- *Insight*: Cross-platform edge deployment đang được standardize

**ncz-os/mnemos-embedkit** (0 ⭐ - mới)
- Open embedding devkit
- Same API across NPU/GPU/CPU silicon (NVIDIA, AMD, Intel, Apple, Rockchip, MediaTek)
- *Insight*: Hardware abstraction layer cho AI inference

**ut-slayer/orangepi-4a-mainline** (5 ⭐)
- Mainline Linux 6.18 support cho Orange Pi 4A (Allwinner T527)
- HDMI KMS, Mali-G57 Panfrost, WiFi, audio
- *Insight*: Mainline kernel support cải thiện stability và longevity cho edge AI hardware

### 📈 Orange Pi Ecosystem

**MichaIng/DietPi** (6,170 ⭐)
- Lightweight OS cho single-board computers
- Foundation cho nhiều edge AI deployments

**vanvught/rpidmx512** (446 ⭐)
- Orange Pi DMX512/Art-Net/MIDI với GD32
- *Insight*: Orange Pi đang được dùng trong professional IoT applications

---

## 🔮 Phân tích tín hiệu xu hướng

### 1️⃣ Agent Harness Optimization - The New Frontier
Sau giai đoạn model development, focus đang chuyển sang **agent optimization**:
- Context compression (headroom: -60-95% tokens)
- Persistent memory (claude-mem, mem0)
- Performance tuning (ECC framework)
- **Nhận định**: Ai optimize agent tốt hơn sẽ có competitive edge, không phải ai có model lớn hơn

### 2️⃣ Self-hosted & Privacy-first Movement
Community đang phản ứng mạnh với cloud lock-in:
- "Stop renting your intelligence" (AnythingLLM)
- "Offline by default, cloud by choice" (taOS)
- Self-hosted agent OS, VPN clients (Amnezia)
- **Nhận định**: Privacy và data ownership đang trở thành differentiation factor chính

### 3️⃣ Multimodal Agents Going Mainstream
Agents không còn chỉ chat:
- Video understanding (claude-video)
- Game playing (airi: Minecraft, Factorio)
- Design generation (impeccable)
- Voice chat realtime (airi)
- **Nhận định**: Text-only agents đang obsolete nhanh

### 4️⃣ Edge AI Democratization
NPU inference đã ready for prime time:
- VLM 2B-4B chạy mượt trên RK3588
- 8GB RAM threshold cho AI memory
- Auto-clustering trên consumer hardware
- Cross-platform toolchains (RKNN/QNN/ONNX)
- **Nhận định**: Edge AI không còn là experiment, đã sang production deployment

### 5️⃣ Composable Agent Skills
Pattern mới: agent skills như plugins:
- Agent-Reach (web scraping skill)
- last30days-skill (research skill)
- Career-ops (job search workflow)
- **Nhận định**: Agent ecosystem đang hình thành với reusable skills

### 6️⃣ Domain-specific Foundation Models
Beyond general-purpose LLMs:
- Kronos (financial markets)
- ppt-master (structured content)
- GeoLibre (geospatial)
- **Nhận định**: Vertical AI đang là opportunity lớn hơn horizontal AI

---

## 💡 Tâm điểm cộng đồng

### 🏆 Breakout Stars (>400 stars/day)

1. **permissionlesstech/bitchat** (+2,346) - Decentralized communication
2. **alibaba/open-code-review** (+979) - Enterprise AI code review
3. **pbakaus/impeccable** (+847) - Design language for AI
4. **yorukot/superfile** (+600) - Modern terminal file manager
5. **moeru-ai/airi** (+572) - AI companion with game-playing abilities
6. **amnezia-vpn/amnezia-client** (+515) - Self-hosted VPN

### 🔥 Community Energy

**Embedded AI**: Qengineering đang port aggressive VLMs sang RK3588, community đang build production toolchains

**Agent Infrastructure**: Multiple approaches đang compete (ECC, claude-mem, headroom) - chưa có clear winner

**Self-hosted AI**: Strong momentum với taOS, AnythingLLM, siyuan-note

**Enterprise Adoption**: Alibaba releasing open-code-review là signal rõ về production readiness

---

## 🎯 Kết luận

**Thị trường đang ở giai đoạn chuyển tiếp**:
- ✅ Model inference: solved problem (ollama, transformers)
- 🔥 Agent optimization: hot frontier (context, memory, skills)
- 🚀 Edge deployment: ready for scale (NPU, VLM, auto-clustering)
- 🌱 Vertical AI: early but promising (finance, design, GIS)

**Cơ hội lớn nhất**: Build agent infrastructure, composable skills, và vertical solutions trên nền tảng self-hosted/edge AI. The winner won't be who has the biggest model, but who has the best agent harness.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*