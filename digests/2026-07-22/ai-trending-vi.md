# Xu hướng AI Mã nguồn mở 2026-07-22

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-22 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 22/07/2026

## 📊 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của **AI Agent Infrastructure** với các công cụ giúp agent hoạt động hiệu quả hơn. Xu hướng nổi bật là **local-first** và **context optimization** - các giải pháp giúp giảm chi phí token, tăng hiệu suất mà không phụ thuộc vào cloud. Embedded AI trên các SBC như Orange Pi và Rockchip NPU cũng đang có những bước tiến đáng kể với việc port các LLM/VLM lên edge devices.

Một tín hiệu thú vị: cộng đồng đang phát triển các "meta-tools" - công cụ để agent sử dụng agent khác hiệu quả hơn, tạo nên một hệ sinh thái tools đa tầng.

---

## 🔍 Top Repos theo Chiều

### 🤖 **AI Agents** (Frameworks & Orchestration)

**⭐ Top trending:**
- **bojieli/ai-agent-book** (+4,624) - Sách về thiết kế và thực hành AI Agent, có code mẫu theo từng chương
- **NousResearch/hermes-agent** (218K ⭐) - Agent framework "grows with you", có khả năng tự phát triển
- **zhayujie/CowAgent** (46K ⭐) - Agent harness mã nguồn mở, multi-model, multi-channel, dễ mở rộng
- **HKUDS/nanobot** (46K ⭐) - Lightweight agent cho tools, chats và workflows
- **AstrBotDevs/AstrBot** (+416) - AI Agent Assistant tích hợp nhiều IM platform, LLMs và plugins

**💡 Insight:** Agent frameworks đang chuyển từ "single-task executors" sang "learning systems" - có bộ nhớ, khả năng tự cải thiện và tích hợp đa kênh.

---

### 🔧 **AI Infrastructure** (SDKs, Tools & Optimization)

**⭐ Top trending:**
- **affaan-m/ECC** (231K ⭐) - Hệ thống tối ưu hiệu suất cho agent harness: skills, instincts, memory, security
- **diegosouzapw/OmniRoute** (+2,034) - AI gateway thống nhất: 1 endpoint, 268+ providers, 500+ models, quota-aware auto-fallback
- **tirth8205/code-review-graph** (+1,925) - Code intelligence graph local-first cho MCP và CLI
- **KnockOutEZ/wigolo** (+642) - Web tool cho AI agent: local-first search, fetch, crawl & research qua MCP
- **headroomlabs-ai/headroom** (61K ⭐) - Nén outputs, logs, RAG chunks trước khi đưa vào LLM: giảm 20-95% tokens
- **thedotmack/claude-mem** (88K ⭐) - Persistent context across sessions cho mọi agent
- **AlexsJones/llmfit** (+129) - CLI tìm model nào chạy được trên hardware của bạn

**🔥 Highlight:** 
- **Context compression** đang là hot trend - giảm token cost mà vẫn giữ quality
- **Local-first architecture** phổ biến hơn cloud-dependent solutions
- **Universal gateways** giúp switching providers dễ dàng, tránh vendor lock-in

---

### 🧠 **Models & Training**

**Trending topics theo search:**
- **ollama/ollama** (176K ⭐) - Hỗ trợ Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, Gemma
- **huggingface/transformers** (162K ⭐) - Framework cho text, vision, audio, multimodal
- **dottxt-ai/outlines** (+65) - Structured Outputs cho LLMs

**💡 Insight:** Focus đang chuyển từ model size sang **model efficiency** và **structured generation**.

---

### 📦 **AI Applications** (Vertical Products)

**⭐ Top trending:**
- **koala73/worldmonitor** (+1,295) - Real-time global intelligence dashboard với AI news aggregation
- **santifer/career-ops** (60K ⭐) - AI job search: scan portals, evaluate listings, tailor CV
- **Panniantong/Agent-Reach** (59K ⭐) - Cho agent "mắt" để xem toàn bộ internet: Twitter, Reddit, YouTube, GitHub...
- **ZhuLinsen/daily_stock_analysis** (58K ⭐) - LLM-driven stock analysis với multi-source data
- **CherryHQ/cherry-studio** (48K ⭐) - AI productivity studio với 300+ assistants
- **hugohe3/ppt-master** (40K ⭐) - AI tạo PowerPoint từ documents/topics với shapes, transitions, audio narration
- **every-app/open-seo** (+849) - Alternative mã nguồn mở cho Semrush và Ahrefs
- **tradesdontlie/tradingview-mcp** (+114) - AI-assisted TradingView chart analysis qua MCP

**🎯 Pattern:** Vertical applications tập trung vào **research**, **productivity**, và **domain-specific intelligence**.

---

### 🔍 **RAG & Knowledge Management**

**⭐ Top trending:**
- **Shubhamsaboo/awesome-llm-apps** (125K ⭐) - 100+ AI Agent & RAG apps có thể chạy ngay
- **infiniflow/ragflow** (85K ⭐) - RAG engine với Agent capabilities
- **datawhalechina/hello-agents** (67K ⭐) - Tutorial xây dựng agent từ đầu (tiếng Trung)
- **Mintplex-Labs/anything-llm** (63K ⭐) - Local-first agent experience platform
- **mem0ai/mem0** (61K ⭐) - Universal memory layer cho AI Agents
- **FlowiseAI/Flowise** (54K ⭐) - Build AI Agents visually
- **run-llama/llama_index** (50K ⭐) - Leading document agent và OCR platform
- **milvus-io/milvus** (45K ⭐) - Vector database cho scalable vector ANN search
- **jaylfc/taosmd** (70 ⭐) - Local-first AI memory chạy offline, zero-loss archive

**💡 Insight:** RAG đang merge với **long-term memory systems** và **knowledge graphs** để tạo agents có "trí nhớ" tốt hơn.

---

### 🔌 **Embedded AI** (NPU, Edge Computing)

**🚀 Breakthrough area:**

#### RKLLM/RKNPU (Rockchip NPU):
- **Leon6225/InternVL3.5-4B-NPU** (5 ⭐) - Multimodal AI trên RK3588 NPU
- **Qengineering/Qwen3.5-2B-NPU** (2 ⭐) - Qwen3.5-VL-2B trên RK3588
- **Qengineering/Qwen3.5-4B-NPU** - Qwen3.5-VL-4B trên RK3588
- **Qengineering/Qwen3.5-0.8B-NPU** - Qwen3.5-VL-0.8B trên RK3588
- **shaddockpeel2/RKNN-LLM** (2 ⭐) - Multi-modal system dựa trên Qwen3-VL-2B, RKNN và RKLLM
- **gregordinary/ggml-rocket** (9 ⭐) - Drop-in ggml backend cho Rockchip NPUs
- **gregordinary/rocket-userspace** (8 ⭐) - Userspace driver và matmul library cho RK3588
- **gregordinary/rockchip-npu-notes** (6 ⭐) - Hardware reference cho RK3588 NPU

#### Orange Pi & SBC:
- **jaylfc/taOS** (444 ⭐) - Self-hosted AI agent OS chạy trên Orange Pi, offline by default
- **MichaIng/DietPi** (6K ⭐) - Lightweight OS cho SBC
- **freed-dev-llc/terraform-provider-turingpi** (7 ⭐) - Terraform provider cho Turing Pi 2.5 BMC
- **ut-slayer/orangepi-4a-mainline** (5 ⭐) - Mainline Linux 6.18 cho Orange Pi 4A
- **lmambr2/moneypenny** (4 ⭐) - Self-hosted AI + music assistant cho TeamSpeak 6, chạy trên Orange Pi

**🔥 Major development:**
- **gregordinary** đang phát triển full stack NPU infrastructure: mainline kernel driver (rocket), userspace driver, ggml backend
- Các VLM models (Qwen3.5, InternVL) đang được port lên RK3588
- Terraform automation cho Turing Pi clusters - infrastructure-as-code cho edge clusters

---

## 🌟 Phân tích Tín hiệu Xu hướng

### 1. **Context Optimization là Must-have**
Token cost đang trở thành bottleneck. Các giải pháp như:
- RTK+Caveman compression (OmniRoute): giảm 15-95%
- Headroom: giảm 20-95% cho logs/RAG
- Code intelligence graphs: chỉ đọc code relevant

### 2. **Local-first > Cloud-first**
- taOS, taosmd: AI OS chạy hoàn toàn offline
- wigolo: $0/query, no API keys
- Anything-llm: "Stop renting your intelligence"

**Lý do:** Privacy, cost control, và khả năng tùy biến cao hơn.

### 3. **Agent Collaboration Infrastructure**
Không chỉ build single agent, mà build **systems of agents**:
- Multi-agent orchestration (ECC)
- Agent memory systems (mem0, claude-mem)
- Agent communication protocols (MCP)

### 4. **Edge AI đang Mature**
- Rockchip NPU có userspace driver chuẩn
- VLM models (multi-modal) chạy được trên 8GB RAM
- Infrastructure-as-code cho SBC clusters
- Mainline kernel support (Linux 6.18)

### 5. **Vertical AI Products Boom**
Từ horizontal platforms (ChatGPT, Claude) → vertical solutions:
- Career ops
- Stock analysis
- SEO tools
- PPT generation
- Trading analysis

---

## 🎯 Tâm điểm Cộng đồng

### 🏆 **Dự án được quan tâm nhất:**

1. **affaan-m/ECC** (231K ⭐) - Agent performance optimization system
   - Skills, instincts, memory, security cho coding agents
   - Research-first development approach

2. **bojieli/ai-agent-book** (+4,624 trong ngày)
   - Sách về thiết kế AI Agent bằng tiếng Trung
   - Có code mẫu practical
   - Phản ánh nhu cầu học về agent architecture

3. **diegosouzapw/OmniRoute** (+2,034)
   - Universal AI gateway với 268+ providers
   - Free MIT license
   - Built by 500+ contributors - strong community

4. **gregordinary/ggml-rocket** ecosystem
   - Đang xây infrastructure hoàn chỉnh cho Rockchip NPU
   - Từ kernel driver → userspace → GGML integration
   - Breakthrough cho edge AI

### 💬 **Conversation Topics:**

- **"How to reduce token costs?"** → Context compression tools
- **"Can I run AI offline?"** → Local-first solutions like taOS, taosmd
- **"Edge AI for production?"** → RK3588 NPU với VLM support
- **"Multi-agent coordination?"** → MCP protocol, agent harnesses

---

## 🔮 Dự đoán Ngắn hạn

1. **MCP (Model Context Protocol)** sẽ trở thành standard cho agent communication
2. **NPU-accelerated VLMs** trên edge sẽ phổ biến hơn GPU cloud inference
3. **Context compression** sẽ được tích hợp native vào các agent frameworks
4. **Agent OS** (như taOS) sẽ xuất hiện nhiều hơn, tạo ecosystems riêng

---

**📌 Kết luận:** Ngày 22/07/2026 đánh dấu sự trưởng thành của AI infrastructure layer. Cộng đồng đang chuyển từ "make it work" sang "make it efficient, private, and scalable". Edge AI không còn là experimental mà đang production-ready.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*