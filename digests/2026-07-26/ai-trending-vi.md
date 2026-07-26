# Xu hướng AI Mã nguồn mở 2026-07-26

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-26 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 26/07/2026

## 📊 Tóm tắt hôm nay

Ngày hôm nay chứng kiến sự bùng nổ của **hệ sinh thái Agent Skills** - một làn sóng mới trong phát triển AI đưa khái niệm "kỹ năng có thể tái sử dụng" vào trung tâm. Các repo về agent frameworks, skill management, và automation chiếm ưu thế tuyệt đối trong danh sách trending. Đồng thời, **Embedded AI trên NPU** (đặc biệt là Rockchip RK3588) tiếp tục phát triển mạnh mẽ với các Vision-Language Models nhỏ gọn chạy trên edge devices.

**Tín hiệu quan trọng**: Sự dịch chuyển từ "AI as a product" sang "AI as a development methodology" - các công cụ không còn chỉ là chatbot mà trở thành môi trường phát triển hoàn chỉnh với memory, skills, và khả năng tự học.

---

## 🎯 Top Repos Theo Chiều

### 🤖 AI Agents

**⭐ Trending cao nhất:**

1. **NousResearch/hermes-agent** - 220,484 stars
   - "The agent that grows with you" - Agent platform tự tiến hóa
   - Điểm nổi bật: Khả năng học và phát triển theo thời gian

2. **mattpocock/skills** - +1,740 stars hôm nay
   - Skills từ thư mục `.agents` của một senior engineer
   - Tín hiệu: Developer đang chia sẻ cách họ tự động hóa công việc thực tế

3. **obra/superpowers** - +479 stars
   - "An agentic skills framework & software development methodology that works"
   - Framework skills với phương pháp phát triển phần mềm mới

4. **affaan-m/ECC** - +377 stars
   - Agent harness performance optimization system
   - Tối ưu skills, instincts, memory, security cho mọi agent platform

5. **zhayujie/CowAgent** - 46,121 stars
   - Open-source super AI assistant từ chatgpt-on-wechat
   - Tự tiến hóa với memory và knowledge graph

**Insight**: Cộng đồng đang chuẩn hóa cách chia sẻ agent skills - từ repo cá nhân đến framework tổ chức, tương tự như package managers trong lập trình truyền thống.

---

### 🔧 AI Infrastructure

**Code Review & Developer Tools:**

1. **alibaba/open-code-review** - +431 stars hôm nay
   - Hybrid architecture: deterministic pipelines + LLM Agent
   - Built-in ruleset cho NPE, thread-safety, XSS, SQL injection
   - Battle-tested tại quy mô Alibaba

2. **citrolabs/ego-lite** - +986 stars
   - "The fastest browser for AI agents"
   - Chia sẻ browser state đã đăng nhập với AI agents
   - Zero cost, zero config

**Context & Memory Management:**

3. **thedotmack/claude-mem** - 88,562 stars
   - Persistent context across sessions
   - Nén và inject context liên quan vào future sessions

4. **headroomlabs-ai/headroom** - 62,419 stars
   - Nén tool outputs, logs, files, RAG chunks trước khi đến LLM
   - Giảm 20% tokens cho coding agents, 60-95% cho JSON

5. **Graphify-Labs/graphify** - 95,883 stars
   - Biến codebase + docs + SQL + PDFs thành knowledge graph có thể query
   - Local deterministic AST parsing, no vector store

**Communication & Collaboration:**

6. **block/buzz** - +2,491 stars hôm nay (cao nhất!)
   - "A hive mind communication platform"
   - Viết bằng Rust - có thể là mesh communication cho agents?

**Insight**: Infrastructure đang giải quyết 3 bottleneck chính: context window limits, browser automation, và code understanding. Trend rõ ràng là local-first và deterministic.

---

### 🧠 Models & Training

**Education & Resources:**

1. **Lordog/dive-into-llms** - +408 stars
   - 《动手学大模型Dive into LLMs》
   - Tutorial thực hành về LLMs bằng tiếng Trung

**Vector & Embedding:**

2. **RyanCodrai/turbovec** - +86 stars
   - Vector index dựa trên TurboQuant
   - Rust core với Python bindings

**Domain-Specific:**

3. **shiyu-coder/Kronos** - +319 stars
   - Foundation Model cho ngôn ngữ thị trường tài chính
   - Niche vertical: financial markets

**Insight**: Ít hoạt động về model weights mới, focus chuyển sang optimization (quantization, vector indexing) và domain adaptation.

---

### 📦 AI Applications

**Content & Productivity:**

1. **palmier-io/palmier-pro** - +412 stars
   - macOS video editor built for AI
   - Swift native

2. **hugohe3/ppt-master** - 41,090 stars
   - AI tạo PowerPoint decks với native shapes, transitions, animations
   - Hỗ trợ templates, audio narration, charts/tables

3. **CoreBunch/Instatic** - +426 stars
   - Alternative cho Webflow/Framer/WordPress
   - "Agentic self-hosted visual CMS"

**Job Search & Career:**

4. **santifer/career-ops** - 61,551 stars
   - AI job search: scan portals, evaluate với A-F rubric
   - Tailor CV, track applications locally

**Social Media & Content Scraping:**

5. **Panniantong/Agent-Reach** - 60,838 stars
   - "Give your AI agent eyes to see the entire internet"
   - Read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
   - Zero API fees

**Finance & Analysis:**

6. **ZhuLinsen/daily_stock_analysis** - 58,808 stars
   - LLM-driven multi-market stock analysis
   - Multi-source data, real-time news, automated notifications

**Knowledge Management:**

7. **siyuan-note/siyuan** - 45,419 stars
   - Self-hosted personal knowledge management
   - Privacy-first, TypeScript + Golang

**Insight**: Applications đang verticalize - mỗi domain có tool chuyên biệt thay vì general-purpose chatbot. Focus vào automation end-to-end trong workflows cụ thể.

---

### 🔍 RAG & Knowledge

**Platforms:**

1. **langgenius/dify** - 150,245 stars
   - Build Agentic workflows, RAG pipelines
   - Rich AI model & tool support
   - One collaborative workspace

2. **open-webui/open-webui** - 146,732 stars
   - User-friendly AI Interface
   - Hỗ trợ Ollama, OpenAI API

3. **infiniflow/ragflow** - 85,993 stars
   - RAG engine kết hợp Agent capabilities
   - Leading open-source trong RAG space

**Local-First & Privacy:**

4. **Mintplex-Labs/anything-llm** - 63,838 stars
   - "Stop renting your intelligence. Own it."
   - Powerful local-first agent experience

**OCR & Document Processing:**

5. **PaddlePaddle/PaddleOCR** - 86,250 stars
   - Turn PDFs/images thành structured data
   - Hỗ trợ 100+ ngôn ngữ

**Resources:**

6. **ComposioHQ/awesome-claude-skills** - +577 stars
   - Curated list của Claude Skills
   - Resources & tools cho customizing Claude workflows

7. **anthropics/claude-cookbooks** - +132 stars
   - Official notebooks/recipes từ Anthropic
   - Showcasing effective ways sử dụng Claude

8. **Shubhamsaboo/awesome-llm-apps** - 127,673 stars
   - 100+ AI Agents, Agent Skills, RAG Apps
   - Free & open source

9. **andrewyng/aisuite** - +77 stars
   - Simple, unified interface to multiple GenAI providers
   - Từ Andrew Ng

**Insight**: RAG đang trưởng thành - từ simple vector search đến hybrid systems kết hợp knowledge graphs, deterministic parsing, và agent capabilities. Privacy & local-first là priority.

---

### 🔌 Embedded AI (NPU, Edge, SBC)

**⚡ Rockchip RK3588 NPU - Vision-Language Models:**

**SmolVLM2 Series** (Qengineering):
- **SmolVLM2-2B-NPU** - 7 stars
- **SmolVLM2-500M-NPU** - 5 stars  
- **SmolVLM2-256M-NPU** - 12 stars
- Trend: Scale models xuống edge devices

**Qwen3-VL Series** (Qengineering):
- **Qwen3-VL-4B-NPU** - 10 stars
- **Qwen3-VL-2B-NPU** - 36 stars
- **Qwen3.5-4B-NPU** - 3 stars
- **Qwen3.5-2B-NPU** - 2 stars

**InternVL Series:**
- **InternVL3-NPU** (Qengineering) - 7 stars
- **InternVL3.5-4B-NPU** (Leon6225) - 5 stars
- Multimodal AI cho RK3588

**🚀 NPU Infrastructure & Drivers:**

1. **gregordinary/ggml-rocket** - 9 stars
   - Drop-in ggml backend cho Rockchip NPUs
   - Offloads llama.cpp/whisper.cpp prefill to RK3588 NPU

2. **marfrit/rkopnu** - 0 stars (new!)
   - Clean-room open driver cho RK3588 NPU
   - Run vendor librknnrt.so trên mainline Linux kernel
   - 128K-context soak-tested

3. **oRKLLM/ork-driver** - 1 star
   - Clean-room userspace matmul library cho Rockchip NPU

4. **gregordinary/rockchip-npu-notes** - 6 stars
   - Hardware reference & research notes cho RK3588 NPU

5. **isac322/rkmon** - 2 stars
   - Real-time hardware monitor TUI cho RK3588
   - Monitor GPU, NPU, VPU, RGA, thermal zones

**🍊 Orange Pi & SBC Ecosystem:**

1. **jaylfc/taOS** - 459 stars
   - Self-hosted AI agent OS
   - Offline AI memory, multi-framework chat, web desktop
   - Auto-clustering across Orange/Raspberry Pi, Mac mini, gaming PC

2. **jaylfc/taosmd** - 71 stars
   - Local-first AI memory
   - Runs offline trên 8GB+ RAM (SBC, mini PC, laptop)
   - Zero-loss verbatim archive, knowledge graph

3. **MichaIng/DietPi** - 6,165 stars
   - Lightweight OS cho single-board computers

4. **ut-slayer/orangepi-4a-mainline** - 5 stars (new!)
   - Mainline Linux 6.18 support cho Orange Pi 4A (Allwinner T527)
   - HDMI KMS, Mali-G57 Panfrost, WiFi, HDMI audio

**🔧 Infrastructure & Tooling:**

1. **freed-dev-llc/terraform-provider-turingpi** - 7 stars
   - Terraform provider cho Turing Pi 2.5 BMC
   - Cluster deployment automation

2. **ncz-os/mnemos-embedkit** - 0 stars (new!)
   - Open embedding devkit
   - Same API across NPU/GPU/CPU silicon (NVIDIA, AMD, Intel, Apple, Rockchip, MediaTek)

**Insight**: 
- **VLM on Edge is real**: Vision-Language Models từ 256M đến 4B parameters đang chạy production trên NPU consumer-grade
- **Open driver movement**: Cộng đồng đang reverse-engineer và xây dựng clean-room drivers cho Rockchip NPU, phá vỡ vendor lock-in
- **Clustered edge AI**: Trend mới là clustering SBCs thành distributed AI systems (taOS)
- **Mainline kernel support**: Effort để đưa NPU support vào mainline Linux kernel

---

## 🔮 Phân tích Tín hiệu Xu hướng

### 1. **Agent Skills Economy đang hình thành**

Pattern mới: developers chia sẻ `.agents` directory như chia sẻ dotfiles. Các repo như `mattpocock/skills`, `obra/superpowers`, `affaan-m/ECC` là proof-of-concept cho một "skills marketplace" tương lai.

**Tại sao quan trọng**: Giống như npm packages đã democratize code reuse, agent skills sẽ democratize automation workflows. Developer không cần viết agent từ đầu, chỉ cần compose skills.

### 2. **Deterministic AI Infrastructure**

Repos như `Graphify-Labs/graphify` (deterministic AST parsing), `alibaba/open-code-review` (deterministic pipelines + LLM), `headroom` (lossless compression) cho thấy trend rõ ràng: **moving away from pure probabilistic LLM outputs toward hybrid systems with deterministic components**.

**Insight**: Production AI systems cần reliability. Purely stochastic LLMs không đủ - cần layer deterministic để guarantee correctness.

### 3. **Context is King - Compression Wars**

Với context windows ngày càng lớn, paradox mới xuất hiện: có nhiều context hơn không có nghĩa là AI hoạt động tốt hơn. Repos như `headroom` (20-95% token reduction), `claude-mem` (compressed memory), `Graphify` (knowledge graph thay vì flat text) đang giải quyết "curse of abundance".

**Prediction**: Compression & retrieval techniques sẽ quan trọng hơn raw context window size.

### 4. **NPU Revolution on Edge**

Rockchip RK3588 đang trở thành "Raspberry Pi của AI era". Số lượng VLM ports (SmolVLM2, Qwen3-VL, InternVL3) và infrastructure tools (ggml-rocket, rkopnu) cho thấy ecosystem đã mature.

**Why it matters**: 
- Privacy: On-device inference
- Latency: No cloud roundtrip
- Cost: One-time hardware vs continuous API fees
- Sovereignty: Own your intelligence stack

### 5. **Local-First is the New Cloud-First**

Các repo như `anything-llm` ("Stop renting your intelligence"), `taOS` (offline by default), `jaylfc/taosmd` (local-first memory) phản ánh backlash against cloud dependency.

**Trend**: Self-hosted AI infrastructure với offline-capable agents.

### 6. **Browser as First-Class AI Citizen**

`ego-lite` (browser for AI agents) và các tools tương tự cho thấy: web scraping/automation không còn là afterthought mà là core capability. Agents cần "see" the web như humans.

### 7. **Code Review đang được AI-native hoá**

`alibaba/open-code-review` không phải là LLM wrapper đơn giản - là hybrid system với built-in security/quality rulesets. Đây là template cho "AI-native tooling" - AI là component, không phải toàn bộ solution.

---

## 🔥 Tâm điểm Cộng đồng

### 🏆 Top 5 Repos Hot Nhất (theo tăng trưởng hôm nay):

1. **block/buzz** (+2,491) - "Hive mind communication" - mystery repo, có thể là coordination layer cho multi-agent systems?

2. **permissionlesstech/bitchat** (+1,720) - Bluetooth mesh chat, IRC vibes - interesting cho decentralized agent communication

3. **mattpocock/skills** (+1,740) - Skills từ senior engineer - authentic, practical, community gold

4. **citrolabs/ego-lite** (+986) - Browser cho AI agents - giải quyết pain point thực sự

5. **ComposioHQ/awesome-claude-skills** (+577) - Resource aggregation - cho thấy nhu cầu cao về skill discovery

### 💡 Hidden Gems (ít stars nhưng có potential):

- **gregordinary/ggml-rocket**: NPU backend cho llama.cpp - có thể unlock performance leap cho edge inference
- **marfrit/rkopnu**: Open driver cho RK3588 NPU - quan trọng cho open-source NPU ecosystem
- **jaylfc/taOS**: Self-hosted agent OS - vision về AI infrastructure owned by user
- **ncz-os/mnemos-embedkit**: Unified API across silicon vendors - giải quyết fragmentation

### 🎯 Các Chủ đề Đang "Hot":

1. **Agent Harnesses & Skills Management** - Từ framework cá nhân đến enterprise-grade systems
2. **NPU/Edge AI Inference** - Democratization of on-device VLMs
3. **Deterministic + Probabilistic Hybrid Systems** - Best of both worlds
4. **Context Management** - Compression, retrieval, knowledge graphs
5. **Browser Automation for Agents** - Web as native agent environment

---

## 📈 Kết luận

Ngày 26/07/2026 đánh dấu một shift quan trọng: từ "AI tools" sang "AI development methodology". Cộng đồng không còn hỏi "LLM nào tốt nhất?" mà hỏi "Làm sao compose skills?", "Làm sao manage context?", "Làm sao run local?".

**Key takeaway**: AI đang trở thành infrastructure layer - và như mọi infrastructure, nó cần standardization, tooling, và best practices. Chúng ta đang chứng kiến sự hình thành của các patterns và conventions này trong thời gian thực.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*