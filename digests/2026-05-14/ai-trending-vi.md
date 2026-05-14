# Xu hướng AI Mã nguồn mở 2026-05-14

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-05-14 02:24 UTC

---

# Báo cáo Phân Tích Xu Hướng AI Mã Nguồn Mở - 14/05/2026

## 📊 Tóm tắt hôm nay

Ngày hôm nay chứng kiến sự bùng nổ của **Agent Infrastructure** với 3 repo về skills/capabilities cho AI agents đều lọt top trending. Xu hướng "agent harness" và "agentic workflows" đang thống trị, với sự chuyển dịch từ chatbot đơn thuần sang các hệ thống agent tự chủ có khả năng lập kế hoạch và thực thi tác vụ phức tạp.

**Điểm nổi bật**: 
- Skills frameworks cho agents chiếm 4/19 vị trí top trending
- Memory systems cho agents đang trở thành infrastructure layer quan trọng
- Embedded AI trên RK3588 NPU đang có động thái phát triển mạnh
- Browser automation và stealth testing tools đang được quan tâm cao

---

## 🔥 Top Repos Theo Chiều

### 🤖 **AI Agents** (Frameworks, Multi-Agent, Automation)

**Trending hôm nay:**

1. **obra/superpowers** (+1,401 ⭐) - Shell
   - Agentic skills framework & software development methodology
   - Tập trung vào methodology thực tế, không chỉ là code

2. **rohitg00/agentmemory** (+1,379 ⭐) - TypeScript
   - #1 Persistent memory cho AI coding agents
   - Dựa trên real-world benchmarks, giải quyết vấn đề context loss

3. **mattpocock/skills** (+3,392 ⭐) - Shell
   - Skills for Real Engineers từ .claude directory
   - Community-driven, practical skills collection

4. **danielmiessler/Personal_AI_Infrastructure** (+435 ⭐) - TypeScript
   - Agentic AI Infrastructure để magnify HUMAN capabilities
   - Nhấn mạnh vào augmentation thay vì replacement

**Top repos 7 ngày (ai-agent):**

- **NousResearch/hermes-agent** (148K ⭐) - "The agent that grows with you"
- **ruvnet/ruflo** (50K ⭐) - Leading agent orchestration platform cho Claude
- **CherryHQ/cherry-studio** (45K ⭐) - AI productivity studio với autonomous agents
- **zhayujie/CowAgent** (44K ⭐) - Super AI assistant với task planning và long-term memory

**Insight**: Agent frameworks đang chuyển từ "chat interface" sang "autonomous execution environment" với khả năng planning, memory, và tool use.

---

### 🔧 **AI Infrastructure** (SDKs, Tools, CLIs)

**Trending hôm nay:**

1. **CloakHQ/CloakBrowser** (+1,835 ⭐) - Python
   - Stealth Chromium pass mọi bot detection test
   - Drop-in Playwright replacement với source-level fingerprint patches
   - 30/30 tests passed - critical cho agent automation

2. **github/spec-kit** (+1,120 ⭐) - Python
   - Toolkit cho Spec-Driven Development
   - GitHub chính thức support workflow mới

3. **millionco/react-doctor** (+604 ⭐) - TypeScript
   - Catches bad React code từ agents
   - Quality control layer cho AI-generated code

**Top repos 7 ngày (llm):**

- **affaan-m/everything-claude-code** (181K ⭐) - Agent harness performance optimization
- **ollama/ollama** (171K ⭐) - Local model runtime cho Kimi-K2.5, GLM-5, MiniMax, DeepSeek
- **langchain-ai/langchain** (136K ⭐) - The agent engineering platform
- **firecrawl/firecrawl** (119K ⭐) - API to search, scrape, interact với web cho AI

**Insight**: Infrastructure đang focus vào 3 pillar: local-first runtime, agent quality control, và web interaction capabilities.

---

### 🧠 **Models & Training**

**Trending hôm nay:**

1. **rasbt/LLMs-from-scratch** (+821 ⭐) - Jupyter Notebook
   - Implement ChatGPT-like LLM in PyTorch từ đầu
   - Educational resource đang được quan tâm cao

**Top repos 7 ngày:**

- **huggingface/transformers** (160K ⭐) - Model-definition framework cho SOTA models
- **Significant-Gravitas/AutoGPT** (184K ⭐) - Vision of accessible AI for everyone

**Insight**: Community đang có nhu cầu hiểu sâu về fundamentals, không chỉ sử dụng API.

---

### 📦 **AI Applications** (Vertical Solutions)

**Trending hôm nay:**

1. **tinyhumansai/openhuman** (+1,696 ⭐) - Rust
   - Personal AI super intelligence
   - Private, Simple, extremely powerful
   - Rust implementation cho performance và security

2. **yikart/AiToEarn** (+981 ⭐) - TypeScript
   - Use AI to Earn - monetization focus
   - Practical application của AI capabilities

3. **supertone-inc/supertonic** (+859 ⭐) - Swift
   - Lightning-Fast, On-Device, Multilingual TTS
   - Native ONNX runtime - edge deployment ready

**Top repos 7 ngày:**

- **santifer/career-ops** (44K ⭐) - AI-powered job search system trên Claude Code
- **ZhuLinsen/daily_stock_analysis** (35K ⭐) - LLM-driven stock analysis cho A/H/US markets
- **CopilotKit/CopilotKit** (31K ⭐) - Frontend Stack for Agents & Generative UI

**Insight**: Applications đang move towards personal productivity và specialized vertical solutions.

---

### 🔍 **RAG & Knowledge** (Retrieval, Memory, Knowledge Graphs)

**Top repos 7 ngày:**

1. **Shubhamsaboo/awesome-llm-apps** (110K ⭐)
   - 100+ AI Agent & RAG apps có thể chạy thực tế
   - Clone, customize, ship

2. **infiniflow/ragflow** (80K ⭐)
   - Leading open-source RAG engine
   - Fuses RAG với Agent capabilities

3. **thedotmack/claude-mem** (75K ⭐)
   - Persistent Context Across Sessions
   - Captures, compresses, injects context vào future sessions

4. **mem0ai/mem0** (55K ⭐)
   - Universal memory layer cho AI Agents

5. **safishamsi/graphify** (47K ⭐)
   - Turn any folder thành queryable knowledge graph
   - App code + database schema + infrastructure in one graph

**Insight**: Memory và knowledge management đang trở thành critical infrastructure layer. Xu hướng chuyển từ stateless RAG sang stateful memory systems.

---

### 🔌 **Embedded AI** (NPU, Edge AI, RKLLM, RKNPU)

**Trending RKLLM (7 ngày):**

1. **XHMiaoInNUAA/rk3588-video-dma-ai-stream** (2 ⭐)
   - Real-time RK3588 video pipeline
   - V4L2 capture + RGA DMA-BUF + MPP RTMP + RKNN/RKLLM inference
   - Full stack video AI pipeline

2. **Leon6225/InternVL3.5-4B-NPU** (1 ⭐)
   - Multimodal AI cho RK3588 NPU
   - Vision + language understanding

3. **toopac01/InternVL3.5-8B-NPU** (0 ⭐)
   - 8B variant cho RK3588

**Trending RKNPU (7 ngày):**

1. **jaylfc/tinyagentos** (130 ⭐)
   - Self-hosted auto clustering AI agent OS
   - Chạy trên low-cost hardware (Orange Pi, Raspberry Pi, Mac)
   - Desktop shell, app store, agent deployment, distributed compute

2. **jaylfc/taosmd** (36 ⭐)
   - Local-first AI memory
   - Runs offline trên any machine với 8GB+ RAM
   - Zero-loss verbatim archive, knowledge graph, hybrid retrieval

3. **boundarybitlabs/rkwhisper** (0 ⭐)
   - Speech to text daemon over Unix domain sockets
   - Whisper models cho RKNN

**Trending Orange Pi (7 ngày):**

- **MichaIng/DietPi** (6K ⭐) - Lightweight OS cho SBC
- **RaspAP/raspap-webgui** (5K ⭐) - Wireless router setup
- **mazoqui/thermy** (18 ⭐) - CLI cho ultra-cheap thermal printers qua Bluetooth

**Insight**: 
- RK3588 NPU đang có ecosystem phát triển mạnh với multimodal models
- Xu hướng "AI agent OS" cho edge devices đang nổi lên
- Local-first, offline-capable AI đang được ưu tiên
- Full-stack video AI pipelines trên embedded hardware đang khả thi

---

## 🎯 Phân Tích Tín Hiệu Xu Hướng

### 1. **Agent Skills Ecosystem đang bùng nổ**
- 4 repos về skills/capabilities trong top 20 trending
- Community đang standardize cách agents interact với tools
- Shift từ "prompt engineering" sang "skill engineering"

### 2. **Memory = New Database Layer**
- Persistent memory cho agents đang trở thành infrastructure critical
- Xu hướng: stateless → stateful → learning agents
- Knowledge graphs đang integrate với agent memory systems

### 3. **Local-First AI Renaissance**
- Ollama support cho Chinese models (Kimi, GLM-5, MiniMax, DeepSeek)
- Edge AI trên RK3588 với multimodal capabilities
- Privacy và offline operation đang là priority

### 4. **Agent Quality Control**
- Tools để catch bad AI-generated code (react-doctor)
- Stealth browser automation cho reliable agent actions
- Testing và validation infrastructure cho agentic systems

### 5. **Embedded AI Maturity**
- RK3588 NPU đang có full-stack solutions (video pipeline + inference)
- Agent OS cho edge devices
- Distributed compute clusters trên consumer hardware

### 6. **Spec-Driven Development**
- GitHub official support cho spec-kit
- Shift từ code-first sang spec-first development
- Better alignment giữa human intent và AI execution

---

## 💡 Tâm Điểm Cộng Đồng

### 🔥 **Hottest Debates**

1. **Agent Harness Wars**
   - `everything-claude-code` (181K ⭐) vs `openclaude` (26K ⭐)
   - Community đang tìm kiếm "the right abstraction" cho agent development

2. **Memory Architecture**
   - `agentmemory` vs `claude-mem` vs `mem0`
   - Persistent context đang là unsolved problem lớn

3. **Local vs Cloud**
   - Ollama ecosystem vs OpenAI/Anthropic APIs
   - Privacy, cost, và performance tradeoffs

### 🚀 **Rising Stars**

1. **tinyagentos** (130 ⭐ trong 7 ngày)
   - Agent OS cho consumer hardware
   - Democratizing AI agent deployment

2. **graphify** (47K ⭐)
   - Knowledge graph cho code + data + infrastructure
   - Unified context layer

3. **CloakBrowser** (+1,835 trong 1 ngày)
   - Solving bot detection cho agent automation
   - Critical infrastructure piece

### 📈 **Growth Trajectories**

- **Agent frameworks**: Exponential growth, consolidation sắp xảy ra
- **Memory systems**: Early stage, nhiều competing approaches
- **Embedded AI**: Steady growth, RK3588 đang lead
- **Quality control tools**: Emerging category, high demand

---

## 🎓 Kết Luận

Ngày 14/05/2026 đánh dấu sự trưởng thành của **Agent Infrastructure Layer**. Community đang move beyond "chat with AI" towards "AI that acts autonomously". 

**Key takeaways:**
- Skills > Prompts
- Memory > Context
- Local > Cloud (cho privacy-sensitive use cases)
- Quality Control đang trở thành critical concern
- Embedded AI đang ready for production

**Next wave predictions:**
- Agent orchestration platforms sẽ consolidate
- Memory systems sẽ standardize
- Edge AI sẽ có breakthrough trong multimodal capabilities
- Quality assurance tools cho AI-generated code sẽ explode

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*