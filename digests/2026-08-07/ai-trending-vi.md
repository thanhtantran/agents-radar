# Xu hướng AI Mã nguồn mở 2026-08-07

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-08-07 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn mở - 2026-08-07

## 🎯 Tóm tắt hôm nay

Hôm nay chứng kiến một **làn sóng mạnh mẽ về AI Agent infrastructure** với 7/10 repo trending top đều liên quan đến agent frameworks, skills, và memory systems. Điểm nổi bật là sự xuất hiện đồng loạt của các "agent skills" repos từ những tên tuổi lớn (Tencent, Cloudflare, cộng đồng developer), cho thấy **xu hướng chuẩn hóa và chia sẻ năng lực của AI agents** đang bùng nổ.

Bên cạnh đó, **Embedded AI trên NPU Rockchip** tiếp tục phát triển mạnh với nhiều dự án mới về RKLLM/RKNPU, đặc biệt là các giải pháp chạy LLM trên hardware giá rẻ (RK3588, Orange Pi).

**Con số ấn tượng**: Cloudflare/computer đạt +2802 stars trong ngày, cho thấy nhu cầu lớn về computer use cho agents.

---

## 📂 Top repos theo chiều

### 🤖 **AI Agents** (Chiếm ưu thế tuyệt đối)

**Production-Ready Agent Frameworks:**

- **affaan-m/ECC** ⭐ 238K - Agent harness performance optimization system với skills, instincts, memory cho Claude Code, Codex, Cursor
- **NousResearch/hermes-agent** ⭐ 226K - "The agent that grows with you" - tương tác động, học hỏi liên tục
- **HKUDS/nanobot** ⭐ 46K - Ultra-lightweight Python agent framework với WebUI, tools, memory, MCP, multi-agent workflows
- **zhayujie/CowAgent** ⭐ 46K - Open-source super AI assistant, tự tiến hóa với memory và knowledge (formerly chatgpt-on-wechat)
- **Significant-Gravitas/AutoGPT** ⭐ 186K (+37 hôm nay) - Vision of accessible AI for everyone

**Agent Skills & Capabilities:**

- **addyosmani/agent-skills** ⭐ +593 hôm nay - Production-grade engineering skills cho AI coding agents (JavaScript)
- **mattpocock/skills** ⭐ +1873 hôm nay - Skills for Real Engineers từ .agents directory (Shell)
- **obra/superpowers** ⭐ +858 hôm nay - Agentic skills framework & software development methodology
- **cloudflare/computer** ⭐ +2802 hôm nay - Give your agent a computer 👾 (TypeScript)

**Agent Memory & Context:**

- **TencentCloud/TencentDB-Agent-Memory** ⭐ +1057 hôm nay - Team-level memory hub biến conversations/docs/code thành 4 loại memory assets có thể chia sẻ (TypeScript)
- **thedotmack/claude-mem** ⭐ 89K - Persistent context across sessions cho mọi agent, hoạt động với Claude Code, Codex, Gemini...

**Specialized Agents:**

- **Panniantong/Agent-Reach** ⭐ 67K - Cho agent khả năng "nhìn" toàn bộ internet: Twitter, Reddit, YouTube, GitHub... (Python)
- **santifer/career-ops** ⭐ 63K - AI job search agent: scan portals, đánh giá A-F, tailor CV, track applications (JavaScript)
- **ZhuLinsen/daily_stock_analysis** ⭐ 60K - LLM-driven multi-market stock analysis với real-time news & auto notifications (Python)

### 🔧 **AI Infrastructure**

**Loop & Orchestration:**

- **huangruiteng/loopx** ⭐ +847 hôm nay - Lightweight loop engineering state kernel cho long-running AI agent teams (Python)
- **esengine/DeepSeek-Reasonix** ⭐ +888 hôm nay - DeepSeek-native AI coding agent cho terminal, engineered around prefix-cache stability (Go)

**LLM Serving & Inference:**

- **ollama/ollama** ⭐ 177K - Chạy Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, Gemma (Go)
- **vllm-project/vllm** ⭐ 88K - High-throughput memory-efficient inference engine (Python)

**Context Optimization:**

- **headroomlabs-ai/headroom** ⭐ 65K - Compress tool outputs/logs/files/RAG chunks trước khi đến LLM, giảm 20-95% tokens (Python)
- **JuliusBrussee/caveman** ⭐ 96K - Claude Code skill cắt 65% tokens bằng cách "nói như người nguyên thủy" (JavaScript)

**Code Intelligence:**

- **tirth8205/code-review-graph** ⭐ +237 hôm nay - Local-first code intelligence graph cho MCP và CLI (Python)
- **Graphify-Labs/graphify** ⭐ 103K - Biến codebase thành queryable knowledge graph, deterministic AST parsing (Python)

**Document Processing:**

- **firecrawl/pdf-inspector** ⭐ +1190 hôm nay - Fast Rust library cho PDF inspection, phát hiện scanned vs text-based (Rust)
- **firecrawl/firecrawl** ⭐ 162K - Context API để search, scrape, interact với web at scale (TypeScript)

### 🧠 **Models & Training**

- **huggingface/transformers** ⭐ 163K - State-of-the-art ML models framework (Python)

### 📦 **AI Applications**

**Productivity & Creation:**

- **CherryHQ/cherry-studio** ⭐ 49K - AI productivity studio với smart chat, autonomous agents, 300+ assistants (TypeScript)
- **hugohe3/ppt-master** ⭐ 43K - AI tạo PowerPoint decks từ documents/topics với native shapes, transitions, audio (Python)
- **harry0703/MoneyPrinterTurbo** ⭐ 101K - Tạo HD short videos từ topic/keyword với AI workflow (Python)

**Browser Automation:**

- **browser-use/browser-use** ⭐ 108K - Make websites accessible for AI agents (Python)

**Personal Knowledge:**

- **siyuan-note/siyuan** ⭐ 45K - Privacy-first, self-hosted personal knowledge management (TypeScript & Go)
- **jaylfc/taOS** ⭐ 475 - Self-hosted AI agent OS, memory/chat/agents/files stay offline (Python)

**Developer Tools:**

- **CopilotKit/CopilotKit** ⭐ 36K - Frontend Stack for Agents & Generative UI (TypeScript)

### 🔍 **RAG & Knowledge**

**RAG Platforms:**

- **langgenius/dify** ⭐ 151K - Build Agentic workflows, RAG pipelines với rich AI model support (TypeScript)
- **infiniflow/ragflow** ⭐ 86K - Leading open-source RAG engine fuses RAG với Agent capabilities (Go)
- **Shubhamsaboo/awesome-llm-apps** ⭐ 131K - 100+ AI Agents, Agent Skills và RAG Apps (Python)

**UI & Interface:**

- **open-webui/open-webui** ⭐ 148K - User-friendly AI Interface (Python)
- **Mintplex-Labs/anything-llm** ⭐ 64K - Local-first agent experience (JavaScript)

**Agent Engineering:**

- **langchain-ai/langchain** ⭐ 143K - The agent engineering platform (Python)
- **datawhalechina/hello-agents** ⭐ 71K - 《从零开始构建智能体》教程 (Python)

**Prompts & Resources:**

- **f/prompts.chat** ⭐ 166K - Share, discover prompts from community (HTML)

### 🔌 **Embedded AI** (NPU/Edge AI)

**RKLLM/RKNPU Runtimes:**

- **Hanzo-Huang/rkllm-docker** ⭐ 7 - Dockerized RKLLM runtime với OpenAI-compatible API (Python)
- **cuiwader51/rk-npu-llm** ⭐ 0 - Hand-written bare-metal NPU LLM runtimes cho RK3588/RK3399, chạy Qwen3 với long context (C)
- **oRKLLM/ork-driver** ⭐ 1 - Clean-room userspace matmul library cho Rockchip NPU (C)

**Vision & Multimodal:**

- **Leon6225/InternVL3.5-4B-NPU** ⭐ 5 - InternVL3.5-4B cho RK3588 NPU, multimodal AI (C++)
- **ambagesthickskin162/Qwen3.5-4B-NPU** ⭐ 0 - Deploy Qwen3.5-4B trên NPU hardware (C++)
- **tristanpenman/vlm-rknn** ⭐ 1 - Starter CMake project cho vision-language models trên Rockchip (C++)
- **tristanpenman/marian-rknn** ⭐ 1 - MarianMT implementation chạy trên Rockchip NPU (C++)

**Object Detection:**

- **StepfenShawn/rockchip_yolo26** ⭐ 1 - YOLO26 trên RK35XX NPU devices (C)
- **ma-mehralian/rknn-yolo** ⭐ 0 - Modern C++ library cho YOLO trên Rockchip NPUs (C++)
- **xu13517942055-alt/LSD1** ⭐ 1 - Real-time line segment detection trên RK3576 (C)

**Infrastructure & Deployment:**

- **freed-dev-llc/terraform-provider-turingpi** ⭐ 7 - Terraform provider cho Turing Pi 2.5 BMC (Go)
- **freed-dev-llc/terraform-turingpi-modules** ⭐ 2 - Terraform modules cho Turing Pi clusters (HCL)
- **jaylfc/taOS** ⭐ 475 - Self-hosted AI agent OS với auto-clustering across consumer hardware (Orange/Raspberry Pi, Mac mini) (Python)

**Memory & Monitoring:**

- **jsramesh1990/RK3568-DDR-Memory-Manager** ⭐ 1 - Comprehensive DDR memory management cho RK3568 (C)
- **zouri/rtop** ⭐ 0 - Terminal system monitor cho Rockchip Linux: CPU, memory, GPU, NPU, DDR metrics (Go)

**System Integration:**

- **LM-cell/RKNPU** ⭐ 0 - RK3588 NPU driver và system integration trên StarryOS (Rust)
- **gregordinary/patches** ⭐ 4 - Out-of-tree kernel patches cho RK3588 mainline NPU driver (C)

**Orange Pi Ecosystem:**

- **MichaIng/DietPi** ⭐ 6K - Lightweight OS cho single-board computers (Shell)
- **jaylfc/taosmd** ⭐ 72 - Local-first AI memory chạy offline trên SBC với 8GB+ RAM (Python)
- **jym66/openWRT-OrangePiZero3** ⭐ 62 - OpenWRT cho Orange Pi Zero3 (Shell)

---

## 🔥 Phân tích tín hiệu xu hướng

### 1. **Agent Skills Marketplace đang hình thành**

Sự xuất hiện đồng loạt của nhiều "skills repos" (addyosmani, mattpocock, obra) cho thấy cộng đồng đang:
- Chuẩn hóa cách định nghĩa và chia sẻ agent capabilities
- Tạo một "marketplace" ngầm định cho reusable agent skills
- Chuyển từ "prompt engineering" sang "skills engineering"

**Ý nghĩa**: Agent development đang trưởng thành, chuyển từ experimental sang production-ready với best practices rõ ràng.

### 2. **Memory là competitive advantage mới**

3 repo về agent memory (TencentDB-Agent-Memory, claude-mem, taosmd) cùng trending cho thấy:
- Context persistence across sessions là pain point lớn
- Team-level memory sharing là nhu cầu enterprise
- Offline-first memory cho privacy và ownership

**Ý nghĩa**: Agents không chỉ cần "thông minh" mà cần "nhớ" và "học" từ interactions trước đó.

### 3. **Computer Use = Agent killer feature**

Cloudflare/computer với +2802 stars cho thấy:
- Desktop automation là frontier tiếp theo
- Agents cần tương tác với GUI applications, không chỉ CLI/API
- Infrastructure giants (Cloudflare) đang tham gia agent ecosystem

### 4. **Token optimization = cost optimization**

headroom (65K stars) và caveman (96K stars) đều focus vào token reduction:
- 20-95% token savings trực tiếp = giảm chi phí API calls
- Context window constraints vẫn là vấn đề thực tế
- Clever engineering vẫn quan trọng hơn "throwing more tokens"

### 5. **Embedded AI đang decentralize**

RKLLM/RKNPU ecosystem phát triển mạnh:
- NPU hardware giá rẻ (<$100) chạy được LLM 4B params
- Từ bare-metal drivers đến high-level SDKs
- Self-hosted AI trở nên khả thi cho individuals/SMEs

**Ý nghĩa**: AI không còn là đặc quyền của cloud providers. "Own your intelligence" đang trở thành reality.

### 6. **Loop Engineering = new paradigm**

loopx và DeepSeek-Reasonix focus vào long-running agents:
- Agents cần hoạt động liên tục, không chỉ one-shot tasks
- State management, quota-aware auto-wake, durable goals
- Prefix-cache stability cho efficiency

### 7. **Code Intelligence Graph > Vector Databases**

Graphify (103K) và code-review-graph (237 trending):
- Deterministic AST parsing thay vì probabilistic embeddings
- Knowledge graphs với explainable edges
- Local-first, không phụ thuộc vector stores

**Ý nghĩa**: Shift từ "semantic similarity" sang "structural understanding" cho code.

### 8. **Vertical AI Applications bùng nổ**

- career-ops: Job search automation
- daily_stock_analysis: Stock analysis & alerts
- ppt-master: Presentation creation
- MoneyPrinterTurbo: Video generation

**Pattern**: Không còn "general-purpose chatbots", mà là specialized tools giải quyết specific workflows.

---

## 🎪 Tâm điểm cộng đồng

### 🏆 **Most Viral**: Cloudflare/computer (+2802 stars)

Cloudflare entry vào agent space với computer use capability. Signal: Desktop automation sẽ là battlefield tiếp theo.

### 🚀 **Dark Horse**: mattpocock/skills (+1873 stars)

Developer influencer chia sẻ personal .agents directory, viral ngay lập tức. Cho thấy:
- Developers muốn "proven patterns" từ practitioners
- Personal productivity > corporate frameworks
- Authenticity wins: "Skills for Real Engineers"

### 🇨🇳 **China AI Wave**:

- TencentCloud/TencentDB-Agent-Memory
- ZhuLinsen/daily_stock_analysis
- CherryHQ/cherry-studio
- TapXWorld/ChinaTextbook

China-based projects chiếm 4/13 top trending. AI development ở Trung Quốc đang cực kỳ sôi động, focus vào:
- Enterprise tools
- Financial applications
- Education resources
- Self-hosted solutions

### 💎 **Hidden Gem**: firecrawl/pdf-inspector (+1190 stars)

PDF processing vẫn là pain point. Fast Rust library phân biệt scanned vs text-based PDFs = routing decision thông minh cho RAG pipelines.

### 🔬 **Technical Excellence**: affaan-m/ECC (238K stars)

Agent harness performance optimization system comprehensive nhất, cho thấy engineering discipline đang mature:
- Skills + Instincts + Memory + Security
- Research-first development
- Multi-platform support (Claude Code, Codex, Cursor...)

---

## 💡 Kết luận

**2026-08-07 = Ngày của Agent Infrastructure**. Cộng đồng đang xây dựng foundational tools để agents chuyển từ demos sang production. Ba pillar chính:

1. **Skills** - Reusable, shareable capabilities
2. **Memory** - Persistent, team-level context
3. **Computer Use** - Desktop automation beyond CLI

Đồng thời, **Embedded AI trên NPU** đang làm cho local inference khả thi, hỗ trợ vision "own your intelligence" thay vì phụ thuộc cloud.

Trend rõ ràng: **AI đang decentralize, democratize, và specialize** 🚀

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*