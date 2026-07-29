# Xu hướng AI Mã nguồn mở 2026-07-29

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-29 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 29/07/2026

## 📊 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của các dự án **Agent Harness & Optimization** với ECC dẫn đầu (+636 stars). Các xu hướng nổi bật:

- **Agent Infrastructure**: Công cụ tối ưu hóa hiệu suất cho Claude Code, Cursor và các coding agents
- **Embedded AI**: Sự phát triển mạnh mẽ của NPU trên RK3588 với các VLM models (SmolVLM2, InternVL3)
- **Local-first AI**: Các giải pháp self-hosted, offline-first đang trở thành xu hướng chính
- **Multimodal Agents**: Voice agents, video processing, và companion AI systems

## 🎯 Top Repos theo Chiều

### 🤖 AI Agents

**⭐ Dẫn đầu: moeru-ai/airi** (+797)
- 💖 Self-hosted AI companion với realtime voice chat
- Chơi được Minecraft, Factorio
- Cross-platform: Web/macOS/Windows

**⭐ NousResearch/hermes-agent** (221K stars)
- "The agent that grows with you" - agent framework có khả năng tự phát triển
- Trending mạnh trong tuần qua

**⭐ shareAI-lab/learn-claude-code** (72K stars)
- Hướng dẫn xây dựng agent harness từ 0
- "Bash is all you need" - tiếp cận minimalist

**⭐ zhayujie/CowAgent** (46K stars)
- Open-source super AI assistant
- Multi-model, multi-channel, self-evolving với memory

### 🔧 AI Infrastructure

**⭐ Trending: affaan-m/ECC** (+636)
- Agent harness performance optimization system
- Skills, instincts, memory, security cho Claude Code/Codex/Cursor

**⭐ andrewyng/aisuite** (+62)
- API thống nhất cho multiple AI providers
- Từ Andrew Ng - tín hiệu mạnh về standardization

**⭐ virgiliojr94/book-to-skill** (+423)
- Convert PDF kỹ thuật thành Claude Code skills
- Giải pháp cho knowledge transfer

**⭐ bradautomates/claude-video** (+988)
- Cho phép Claude xem video
- Download, extract frames, transcribe tự động

**⭐ thedotmack/claude-mem** (88K stars)
- Persistent context across sessions
- Compress & inject relevant context

**⭐ headroomlabs-ai/headroom** (62K stars)
- Compression cho tool outputs, logs, RAG chunks
- Tiết kiệm 20-95% tokens

### 🧠 Models & Training

**⭐ huggingface/speech-to-speech** (+227)
- Build local voice agents với open-source models
- Local-first approach

**⭐ huggingface/transformers** (163K stars)
- Framework chuẩn cho ML models
- Text, vision, audio, multimodal

**⭐ rasbt/LLMs-from-scratch** (100K stars)
- Implement ChatGPT-like LLM trong PyTorch
- Educational approach

### 📦 AI Applications

**⭐ langgenius/dify** (150K stars)
- Build Agentic workflows, RAG pipelines
- Deploy cloud/VPC/self-hosted

**⭐ open-webui/open-webui** (147K stars)
- User-friendly AI interface
- Supports Ollama, OpenAI API

**⭐ CherryHQ/cherry-studio** (49K stars)
- AI productivity studio
- Smart chat, autonomous agents, 300+ assistants

**⭐ siyuan-note/siyuan** (45K stars)
- Privacy-first, self-hosted knowledge management
- TypeScript + Golang

**⭐ hugohe3/ppt-master** (41K stars)
- AI tạo PowerPoint decks từ documents
- Native shapes, transitions, animations, charts

**⭐ santifer/career-ops** (62K stars)
- Open-source AI job search
- Scan portals, evaluate listings, tailor CV

**⭐ ZhuLinsen/daily_stock_analysis** (59K stars)
- LLM-driven stock analysis system
- Multi-market, real-time news, automated notifications

### 🔍 RAG & Knowledge

**⭐ Graphify-Labs/graphify** (97K stars)
- Turn codebase thành queryable knowledge graph
- Local deterministic AST parsing, no vector store

**⭐ infiniflow/ragflow** (86K stars)
- Leading RAG engine với Agent capabilities
- Context layer cho LLMs

**⭐ Mintplex-Labs/anything-llm** (64K stars)
- "Stop renting your intelligence"
- Local-first agent experience

**⭐ Shubhamsaboo/awesome-llm-apps** (128K stars)
- 100+ AI Agents, Agent Skills, RAG Apps
- Free and open source

### 🔌 Embedded AI

**🔥 Hot Trend: RK3588 NPU Ecosystem**

**Vision-Language Models trên NPU:**
- **Qengineering/SmolVLM2-256M-NPU** (12 stars) - Variant nhẹ nhất
- **Qengineering/SmolVLM2-500M-NPU** (5 stars)
- **Qengineering/SmolVLM2-2B-NPU** (7 stars) - Cân bằng performance/accuracy
- **Qengineering/InternVL3-NPU** (7 stars)
- **Leon6225/InternVL3.5-4B-NPU** (5 stars) - State-of-the-art multimodal

**Infrastructure:**
- **jaylfc/taOS** (463 stars) - Self-hosted AI agent OS cho SBC
- **jaylfc/taosmd** (71 stars) - Local-first AI memory, 8GB+ RAM
- **freed-dev-llc/terraform-provider-turingpi** (7 stars) - Terraform cho Turing Pi 2.5
- **tristanpenman/vlm-rknn** (1 star) - CMake starter cho VLMs
- **kyshipit/eai-rk3588** (1 star) - Extensible edge inference platform

**Orange Pi Ecosystem:**
- **MichaIng/DietPi** (6K stars) - Lightweight OS cho SBC
- **ut-slayer/orangepi-4a-mainline** (6 stars) - Mainline Linux 6.18 support

## 🎯 Phân tích Tín hiệu Xu hướng

### 1. **Agent Harness Optimization War**
Sự xuất hiện của ECC (+636) cho thấy cộng đồng đang tìm cách **tối ưu hóa hiệu suất** của coding agents. Xu hướng:
- Skills & instincts thay vì one-off prompts
- Memory systems cho persistent context
- Security-first approach
- Research-driven development

### 2. **Embedded AI Renaissance**
RK3588 NPU đang trở thành **platform chuẩn** cho edge AI:
- VLM models từ 256M → 4B parameters
- Full stack: từ kernel drivers đến inference engines
- Terraform infrastructure-as-code cho SBC clusters
- Trend: "Cloud-quality AI on $100 hardware"

### 3. **Local-first > Cloud-first**
Các dự án như taOS, taosmd, anything-llm thể hiện shift mạnh:
- **Privacy-first**: Data stays on hardware you own
- **Offline by default, cloud by choice**
- **Self-hosted** với consumer hardware
- Zero-cost scheduled runs

### 4. **Context Compression Innovation**
Token optimization đang là battleground mới:
- headroom: 20-95% token reduction
- caveman: 65% token cut với "caveman speak"
- Trend: **Same answers, fewer tokens = lower costs**

### 5. **Knowledge Graph > Vector Store**
Graphify (97K stars) signals shift from embeddings:
- **Deterministic** thay vì probabilistic
- **Explainable edges** thay vì "magic similarity"
- AST parsing cho code understanding
- Trend: **Structured knowledge wins**

### 6. **Multimodal Agent Explosion**
- Voice agents (speech-to-speech, airi)
- Video processing (claude-video)
- Visual understanding (VLMs on NPU)
- Trend: **"See, hear, speak" = table stakes**

## 🔥 Tâm điểm Cộng đồng

### 🏆 Breakout Stars (hôm nay)

1. **bradautomates/claude-video** (+988)
   - Giải pháp đột phá: Claude có thể "xem" video
   - Impact: Mở rộng khả năng analysis sang multimedia

2. **moeru-ai/airi** (+797)
   - AI companion tự host với voice chat realtime
   - Gaming integration (Minecraft, Factorio)
   - Signal: Shift từ chatbots → interactive companions

3. **yorukot/superfile** (+662)
   - Terminal file manager hiện đại
   - Developer tooling vẫn hot

4. **affaan-m/ECC** (+636)
   - Agent optimization infrastructure
   - Critical infrastructure cho agent ecosystem

5. **opengeos/GeoLibre** (+607)
   - Lightweight, cloud-native GIS platform
   - Cross-platform: browser/desktop/mobile/Jupyter

### 💡 Emerging Patterns

**"Claude Code Ecosystem"** đang hình thành:
- ECC: Performance optimization
- claude-mem: Persistent memory
- book-to-skill: Knowledge injection
- claude-video: Multimodal capabilities
- caveman: Token efficiency

**Edge AI Infrastructure Maturity:**
- Từ proof-of-concept → production-ready
- Infrastructure-as-code (Terraform)
- Full OS stack (taOS)
- Multi-framework support

### 🎓 Educational Impact

- **learn-claude-code** (72K): Demystifying agent harness
- **LLMs-from-scratch** (100K): Building from ground up
- **hello-agents** (69K): Chinese-language agent education

**Trend:** Community đang focus vào **understanding internals** thay vì chỉ sử dụng tools.

---

**Kết luận:** Ngày 29/07/2026 đánh dấu sự trưởng thành của **Agent Infrastructure** và **Embedded AI**. Cộng đồng đang shift từ "chạy model" sang "tối ưu hóa agent systems" và từ "cloud-dependent" sang "local-first". RK3588 NPU ecosystem đang trở thành challenger nghiêm túc cho NVIDIA trong edge AI space.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*