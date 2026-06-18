# Xu hướng AI Mã nguồn mở 2026-06-18

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-06-18 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn Mở - 18/06/2026

## 📊 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của **agent harness** và **agentic infrastructure** - xu hướng chính với 5/10 repo trending hàng đầu thuộc về frameworks và tooling cho AI agents. Cộng đồng đang chuyển từ việc xây dựng agents đơn lẻ sang phát triển các hệ thống agent có khả năng tự phát triển, có memory persistence và context awareness.

**Điểm nổi bật**: 
- Skills frameworks và agent harnesses chiếm ưu thế tuyệt đối
- Code intelligence và knowledge graphs trở thành nền tảng quan trọng
- Embedded AI trên Rockchip NPU đang phát triển mạnh mẽ
- RAG đã chuyển từ retrieval đơn thuần sang multi-modal knowledge graphs

---

## 🗂️ Top repos theo chiều

### 🤖 **AI Agents** - Frameworks & Automation

**⭐ Trending hôm nay:**

1. **obra/superpowers** (+1,129) 
   - Skills framework với methodology hoàn chỉnh cho agent development
   - Tín hiệu: Cộng đồng cần standardization trong cách build agents

2. **Panniantong/Agent-Reach** (+1,161)
   - Agent "có mắt" - scrape toàn bộ internet không cần API
   - Support Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
   - Tín hiệu: Data acquisition cho agents đang là bottleneck

3. **mattpocock/skills** (+1,523) 
   - Skills trực tiếp từ .claude directory
   - Tín hiệu: Developer muốn share và reuse agent skills

**🔥 Trong top search 7 ngày:**

- **affaan-m/ECC** (217K ⭐) - Agent harness với performance optimization
- **NousResearch/hermes-agent** (196K ⭐) - "Agent that grows with you"
- **shareAI-lab/learn-claude-code** (67K ⭐) - Nano agent harness từ scratch
- **santifer/career-ops** (54K ⭐) - AI job search với 14 skill modes
- **zhayujie/CowAgent** (45K ⭐) - Super assistant với self-evolution
- **HKUDS/nanobot** (44K ⭐) - Lightweight agent cho tools & workflows

**💡 Insight**: Agent frameworks không còn là wrappers đơn giản. Chúng đang tiến hóa thành full operating systems với memory, skills registry, security layers và research-first development methodology.

---

### 🔧 **AI Infrastructure** - Tools & Platforms

**⭐ Trending hôm nay:**

1. **DeusData/codebase-memory-mcp** (+371)
   - High-performance code intelligence MCP server
   - Index repo trong milliseconds, query sub-ms, 99% fewer tokens
   - Single static binary, zero dependencies
   - Tín hiệu: MCP (Model Context Protocol) đang trở thành standard

2. **n0-computer/iroh** (+421)
   - "IP addresses break, dial keys instead"
   - Modular networking stack in Rust
   - Tín hiệu: P2P infrastructure cho distributed agents

3. **continuedev/continue** (+49)
   - Open-source coding agent
   - Tín hiệu: VS Code extension ecosystem cho agents đang mature

**🔥 Trong top search:**

- **ollama/ollama** (174K ⭐) - Standard cho local model serving
- **langchain-ai/langchain** (139K ⭐) - "Agent engineering platform" (rebrand từ "LLM framework")
- **firecrawl/firecrawl** (134K ⭐) - Web scraping API at scale
- **langgenius/dify** (145K ⭐) - Production-ready agentic workflow platform
- **FlowiseAI/Flowise** (53K ⭐) - Visual AI agent builder

**💡 Insight**: Infrastructure đang shift từ "LLM serving" sang "agent orchestration". MCP đang emerge như protocol chuẩn cho agent-to-tool communication.

---

### 🧠 **Models & Training**

**⭐ Trending hôm nay:**

1. **google-research/timesfm** (+606)
   - Pretrained foundation model cho time-series forecasting
   - Tín hiệu: Foundation models mở rộng sang specialized domains

**🔥 Trong top search:**

- **huggingface/transformers** (161K ⭐) - Still the backbone
- **ollama/ollama** (174K ⭐) - Support Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, gpt-oss

**💡 Insight**: Domain-specific foundation models (time-series, vision, audio) đang được phát triển song song với general models.

---

### 📦 **AI Applications** - Vertical Solutions

**⭐ Trending hôm nay:**

1. **bytedance/UI-TARS-desktop** (+150)
   - Multimodal AI agent stack for desktop automation
   - Connect cutting-edge models với agent infra

2. **calesthio/OpenMontage** (+98)
   - Agentic video production system
   - 12 pipelines, 52 tools, 500+ agent skills
   - Turn coding assistant thành video production studio

**🔥 Trong top search:**

- **CherryHQ/cherry-studio** (47K ⭐) - AI productivity với 300+ assistants
- **ZhuLinsen/daily_stock_analysis** (42K ⭐) - LLM-driven stock analysis
- **CopilotKit/CopilotKit** (35K ⭐) - Frontend stack cho agents & generative UI

**💡 Insight**: Agents đang được vertical-ized cho specific workflows (video production, stock analysis, UI automation) thay vì remain general-purpose.

---

### 🔍 **RAG & Knowledge** - Memory & Context

**⭐ Trending hôm nay:**

Không có repo RAG thuần trong top trending, nhưng nhiều agent repos có RAG embedded.

**🔥 Trong top search:**

- **Shubhamsaboo/awesome-llm-apps** (114K ⭐) - 100+ RAG apps you can run
- **infiniflow/ragflow** (83K ⭐) - RAG fused với Agent capabilities
- **thedotmack/claude-mem** (83K ⭐) - Persistent context across sessions cho mọi agent
- **safishamsi/graphify** (68K ⭐) - Turn code/docs/videos thành queryable knowledge graph
- **Mintplex-Labs/anything-llm** (61K ⭐) - "Stop renting your intelligence"
- **mem0ai/mem0** (58K ⭐) - Universal memory layer
- **run-llama/llama_index** (50K ⭐) - "Leading document agent and OCR platform"

**💡 Insight**: RAG đang evolve từ simple retrieval thành:
1. **Persistent memory systems** (claude-mem, mem0)
2. **Knowledge graphs** (graphify)
3. **Multi-modal indexing** (OCR + vision + text)
4. **Agent-integrated retrieval** (RAGFlow with agent capabilities)

---

### 🔌 **Embedded AI** - NPU, Edge, RKLLM

**⭐ Top repos RKLLM/RKNPU:**

1. **NotPunchnox/rkllama** (556 ⭐)
   - Ollama alternative cho Rockchip NPU
   - Optimized NPU support cho AI models

2. **zyp0424/Qwen-Chat-Assistant** (9 ⭐)
   - Voice chat assistant trên RK3588
   - Qwen3-2B with RKNN + RKLLM
   - Camera + speaker integration
   - KWS wake word + ASR + TTS

3. **Leon6225/InternVL3.5-4B-NPU** (2 ⭐)
   - Multimodal AI (vision + language) trên RK3588 NPU

4. **tristanpenman/marian-rknn** (1 ⭐)
   - MarianMT translation model trên Rockchip NPU

5. **isac322/rkmon** (1 ⭐)
   - Real-time hardware monitor TUI cho RK3588
   - Monitor GPU, NPU, VPU, RGA, thermal

**⭐ Top repos Orange Pi:**

1. **jaylfc/taOS** (243 ⭐)
   - Self-hosted auto-clustering AI agent OS
   - Cho consumer hardware (Orange Pi, Raspberry Pi, Mac Mini)
   - Full desktop, app store, agent deployment, distributed compute

2. **jaylfc/taosmd** (47 ⭐)
   - Local-first AI memory cho SBCs (8GB+ RAM)
   - Zero-loss verbatim archive + knowledge graph
   - Framework-agnostic, no cloud

**💡 Insight**: 
- Rockchip RK3588 đang trở thành platform chính cho edge AI
- Cộng đồng đang build full-stack solutions: OS layer (taOS), memory layer (taosmd), model serving (rkllama)
- Multimodal models (vision + language) đang được port lên NPU
- Real-time monitoring tools cho NPU đang emerge

---

## 🔮 Phân tích tín hiệu xu hướng

### 1. **Agent Harness Wars** 🥊
Các frameworks đang compete trên **developer experience**:
- Skills-based architecture (superpowers, mattpocock/skills)
- Memory persistence (claude-mem, mem0)
- Performance optimization (ECC)
- Self-evolution capability (CowAgent, hermes-agent)

**Prediction**: Winner sẽ là framework kết hợp được tất cả: easy skill authoring + persistent memory + auto-optimization.

### 2. **MCP Protocol Adoption** 🔌
**DeusData/codebase-memory-mcp** là tín hiệu mạnh:
- MCP (Model Context Protocol) đang được adopt như standard
- Single binary, zero dependencies = production-ready
- 99% token reduction = giải quyết cost problem

**Prediction**: MCP sẽ trở thành "HTTP cho AI agents" - universal protocol cho agent-to-tool communication.

### 3. **From Retrieval to Knowledge Graphs** 🕸️
RAG evolution rõ ràng:
- **Phase 1**: Vector similarity search (2023)
- **Phase 2**: Hybrid retrieval (2024-2025)  
- **Phase 3**: Knowledge graphs + reasoning (2026) ← we are here

graphify, claude-mem, ragflow đều hướng đến graph-based knowledge representation.

### 4. **Vertical Agent Specialization** 🎯
General-purpose agents → Domain-specific agents:
- Video production (OpenMontage)
- Job search (career-ops)
- Stock analysis (daily_stock_analysis)
- Desktop automation (UI-TARS)

**Prediction**: Sẽ có "Shopify for AI agents" - platform để build & distribute vertical agent apps.

### 5. **Edge AI Democracy** 🌍
RK3588 ecosystem booming:
- OS layer (taOS)
- Memory layer (taosmd)
- Model serving (rkllama)
- Multimodal inference (InternVL3.5-4B-NPU)

**Prediction**: Edge AI sẽ không còn là "toy projects". Production-grade systems sẽ chạy trên $100 SBCs.

### 6. **Skills as First-Class Citizens** 🧩
Từ "prompts" → "skills":
- Reusable, composable
- Shareable across frameworks
- Version-controlled (.claude directory)

mattpocock/skills (+1,523) và superpowers (+1,129) là proof.

---

## 🎯 Tâm điểm cộng đồng

### 🏆 **Most Disruptive**: 
**Panniantong/Agent-Reach** (+1,161)
- Giải quyết data acquisition bottleneck
- Zero API fees = democratize data access
- Multi-platform (Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu)

### 🚀 **Most Ambitious**: 
**jaylfc/taOS** (243 ⭐)
- Agent OS cho consumer hardware
- Distributed compute clustering
- Đối trọng với cloud-first approach

### 🔥 **Most Controversial**:
**thedotmack/claude-mem** (83K ⭐)
- Persistent context across sessions
- Privacy vs convenience debate
- "Captures everything your agent does"

### 💎 **Hidden Gem**:
**DeusData/codebase-memory-mcp** (+371)
- Technical excellence: milliseconds indexing, sub-ms queries
- Single static binary
- MCP protocol adoption

### 📚 **Most Educational**:
**shareAI-lab/learn-claude-code** (67K ⭐)
- "Bash is all you need"
- Build agent harness from 0 to 1
- Demystify the magic

---

## 🎬 Kết luận

2026 là năm của **agent infrastructure maturity**. Cộng đồng đã vượt qua giai đoạn "LLM wrapper" và đang xây dựng:

1. **Standard protocols** (MCP)
2. **Persistent memory systems** 
3. **Knowledge graphs** thay vì vector databases
4. **Skills marketplaces** thay vì prompt libraries
5. **Edge AI operating systems**

Đặc biệt, **embedded AI trên Rockchip** đang proof rằng production-grade AI không cần cloud hay expensive GPUs. Với $100 SBC + 8GB RAM, bạn có thể chạy multimodal agents với memory persistence.

**Next wave**: Agent orchestration frameworks sẽ consolidate, MCP sẽ become ubiquitous, và vertical agent apps sẽ explode giống cách mobile apps exploded sau khi iOS/Android mature.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*