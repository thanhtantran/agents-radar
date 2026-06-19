# Xu hướng AI Mã nguồn mở 2026-06-19

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-06-19 02:00 UTC

---

# Báo cáo Xu hướng GitHub AI - 19/06/2026

## 📊 Tóm tắt hôm nay

Thị trường AI mã nguồn mở đang chứng kiến sự bùng nổ của **agentic frameworks** và **edge AI**. Cộng đồng đang chuyển dịch từ việc chạy model đơn lẻ sang xây dựng **hệ sinh thái agent tự động** với khả năng lập trình, phân tích, và ra quyết định. Đồng thời, xu hướng **local-first AI** trên phần cứng embedded (NPU, SBC) đang tăng tốc mạnh mẽ.

**Điểm nổi bật**: 
- 6 trong top 10 trending là agent frameworks hoặc agent tooling
- Edge AI với Rockchip NPU xuất hiện trong cả trending lẫn search
- RAG + Knowledge Graph đang trở thành standard stack
- Cộng đồng Trung Quốc dẫn đầu về open-source AI models

---

## 🎯 Top Repos Theo Chiều

### 🤖 **AI Agents** (Thống trị trending)

**⭐ Siêu nổi bật:**
- **obra/superpowers** (+1,429) - Agentic skills framework với software development methodology mới
- **zai-org/GLM-5** (+202) - "From Vibe Coding to Agentic Engineering" - shift về agent-centric development
- **Kilo-Org/kilocode** (+1,345) - All-in-one agentic engineering platform, coding agent phổ biến nhất

**Frameworks & Harnesses:**
- **withastro/flue** (+162) - Sandbox agent framework từ team Astro
- **NousResearch/hermes-agent** (197K ⭐) - "The agent that grows with you"
- **zhayujie/CowAgent** (45K ⭐) - Super AI assistant tự tiến hóa với memory + knowledge

**Vertical Agents:**
- **santifer/career-ops** (54K ⭐) - AI job search system trên Claude Code với 14 skill modes
- **HKUDS/nanobot** (44K ⭐) - Lightweight agent cho tools, chats, workflows
- **ZhuLinsen/daily_stock_analysis** (43K ⭐) - LLM-driven stock analysis với multi-source data

### 🔧 **AI Infrastructure & Tools**

**Memory & Context:**
- **DeusData/codebase-memory-mcp** (+2,322) ⚡ - High-performance code intelligence MCP server, 158 languages, sub-ms queries
- **thedotmack/claude-mem** (83K ⭐) - Persistent context across sessions cho mọi agent
- **safishamsi/graphify** (69K ⭐) - Transform code/docs/media thành queryable knowledge graph

**Inference & Serving:**
- **vllm-project/vllm** (83K ⭐) - High-throughput inference engine cho LLMs
- **ollama/ollama** (174K ⭐) - Hỗ trợ Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek mới nhất

**Development Tools:**
- **affaan-m/ECC** (217K ⭐) - Agent harness performance optimization system
- **CopilotKit/CopilotKit** (35K ⭐) - Frontend Stack for Agents & Generative UI

### 🧠 **Models & Training**

**Foundation Models:**
- **google-research/timesfm** (+844) - Time Series Foundation Model cho forecasting
- **Lightricks/LTX-2** (+51) - Audio-video generative model với Python inference + LoRA trainer

**Open Models:**
- **huggingface/transformers** (161K ⭐) - Framework cho SOTA models
- Ollama support: GLM-5.1, Kimi-K2.6, MiniMax, DeepSeek, gpt-oss, Qwen

### 📦 **AI Applications**

**Productivity & Knowledge:**
- **langgenius/dify** (145K ⭐) - Production-ready agentic workflow platform
- **open-webui/open-webui** (142K ⭐) - User-friendly AI interface
- **Mintplex-Labs/anything-llm** (61K ⭐) - "Stop renting your intelligence" - local-first agent
- **siyuan-note/siyuan** (44K ⭐) - Privacy-first personal knowledge management

**Development Platforms:**
- **freeCodeCamp/freeCodeCamp** (+417) - Open-source learning platform
- **makeplane/plane** (+613) - Open-source project management (Jira/Linear alternative)

**Specialized:**
- **CherryHQ/cherry-studio** (47K ⭐) - AI productivity studio với 300+ assistants
- **LibreTranslate/LibreTranslate** (+51) - Free, self-hosted machine translation

### 🔍 **RAG & Knowledge Systems**

**RAG Platforms:**
- **infiniflow/ragflow** (83K ⭐) - Leading RAG engine với Agent capabilities
- **PaddlePaddle/PaddleOCR** (82K ⭐) - Turn PDFs/images into structured data cho LLMs

**Educational:**
- **Shubhamsaboo/awesome-llm-apps** (114K ⭐) - 100+ runnable AI Agent & RAG apps
- **datawhalechina/hello-agents** (60K ⭐) - Tutorial từ zero đến advanced (tiếng Trung)

**Vector & Search:**
- **alibaba/zvec** (+259) - Lightning-fast in-process vector database
- **yifanfeng97/Hyper-Extract** (+124) - Transform text thành graphs, hypergraphs với LLMs

### 🔌 **Embedded AI & Edge Computing**

**Rockchip NPU Ecosystem:**
- **NotPunchnox/rkllama** (556 ⭐) - Ollama alternative cho Rockchip NPU
- **jaylfc/taOS** (243 ⭐) - Self-hosted agent OS cho consumer hardware (Orange Pi, Raspberry Pi)
- **zyp0424/Qwen-Chat-Assistant** (10 ⭐) - Voice chat assistant trên RK3588 với Qwen3-2B

**Orange Pi Projects:**
- **jaylfc/taosmd** (47 ⭐) - Local-first AI memory cho SBC/mini PC (8GB+ RAM)
- **MichaIng/DietPi** (6K ⭐) - Lightweight OS cho SBC
- **CERALIVE/image-building-pipeline** (3 ⭐) - OTA system cho RK3588 devices

**Tools & Infrastructure:**
- **isac322/rkmon** (1 ⭐) - Real-time hardware monitor TUI cho RK3588 (GPU, NPU, VPU)
- **vanvught/rpidmx512** (445 ⭐) - Orange Pi protocols stack

---

## 🔥 Phân tích Tín hiệu Xu hướng

### 1. **Agent-First Development đang thay thế Model-First**
- Cộng đồng không còn hỏi "model nào tốt nhất?" mà hỏi "agent framework nào mạnh nhất?"
- Từ khóa "agentic engineering", "agent harness", "skills framework" xuất hiện khắp nơi
- Multi-agent systems đang mainstream hóa (GLM-5, superpowers, CowAgent)

### 2. **Knowledge Graph = New Standard cho Enterprise AI**
- Hầu hết RAG platform đều integrate knowledge graph (graphify, codebase-memory-mcp)
- Hybrid retrieval (vector + graph) thay thế pure vector search
- Hypergraph cho complex relationships (Hyper-Extract)

### 3. **Local-First đang chiến thắng Cloud-First**
- "Stop renting your intelligence" (AnythingLLM) phản ánh sentiment mạnh
- Privacy-first, self-hosted, offline-capable là top requirements
- SBC + NPU đủ mạnh để chạy production workloads

### 4. **Edge AI đang bùng nổ với Rockchip**
- RKLLM, RKNPU xuất hiện trong search results dù niche
- Community tự build alternatives cho cloud services (rkllama = Ollama cho NPU)
- Voice assistants, vision models chạy hoàn toàn local trên RK3588

### 5. **China Open-Source AI dẫn đầu**
- GLM-5, Qwen3, DeepSeek, Kimi-K2.6 đều từ Trung Quốc
- Chất lượng tương đương/vượt Western models
- Community tutorials (hello-agents 60K⭐) rất mạnh

### 6. **Developer Experience là chiến trường mới**
- Agent harness optimization (ECC 217K⭐) quan trọng hơn model optimization
- Memory systems (claude-mem, taosmd) giải quyết pain point lớn nhất
- One-line install, zero dependencies là selling points

---

## 💡 Tâm điểm Cộng đồng

### 🏆 **Breakout Stars (tăng nhanh nhất)**

1. **DeusData/codebase-memory-mcp** (+2,322) 
   - Giải quyết vấn đề lớn: code intelligence với 99% fewer tokens
   - Single binary, zero dependencies = friction-free adoption

2. **Kilo-Org/kilocode** (+1,345)
   - "Most popular open source coding agent" - bold claim nhưng traction thật
   - All-in-one platform approach đang thắng specialized tools

3. **obra/superpowers** (+1,429)
   - Framework + methodology = complete solution
   - "That works" trong title = community pain đang rất lớn

### 🎯 **Community Validation**

- **langgenius/dify** (145K⭐): Production-ready = đã battle-tested
- **langchain-ai/langchain** (139K⭐): Vẫn là standard reference dù nhiều alternatives
- **ollama/ollama** (174K⭐): De-facto local model runtime

### 🌊 **Emerging Patterns**

**Pattern 1: Unified Platforms thay Specialized Tools**
- Kilocode, CherryStudio, AnythingLLM thắng vì all-in-one
- Developers mệt với việc integrate nhiều tools

**Pattern 2: Memory = Competitive Moat**
- Persistent context (claude-mem, taosmd) differentiate agents
- Knowledge accumulation > single-shot performance

**Pattern 3: Framework-Agnostic Infrastructure**
- MCP servers, knowledge graphs phải work với mọi agent
- Lock-in resistance rất cao trong community

---

## 🎬 Kết luận

**2026 là năm của Agentic AI**, không còn là research toy mà đã production-ready. Edge AI và local-first đang phá vỡ monopoly của cloud providers. Cộng đồng open-source, đặc biệt từ Trung Quốc, đang dẫn dắt innovation với tốc độ chưa từng có.

**Recommendation cho developers:**
- Học agent frameworks thay vì chỉ học models
- Invest vào knowledge graph + RAG infrastructure
- Theo dõi Rockchip NPU ecosystem nếu làm edge AI
- Consider local-first architecture từ đầu

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*