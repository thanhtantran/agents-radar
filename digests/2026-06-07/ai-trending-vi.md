# Xu hướng AI Mã nguồn mở 2026-06-07

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-06-07 02:00 UTC

---

# Báo cáo Xu Hướng AI Mã Nguồn Mở - 07/06/2026

## 📊 Tóm tắt hôm nay

Ngày hôm nay chứng kiến sự bùng nổ của **AI Agent Infrastructure** với hơn 2,000+ stars cho các dự án agent skills và frameworks. Xu hướng "agent harness" đang thống trị với nhiều implementation khác nhau. Nổi bật là làn sóng **embedded AI trên NPU Rockchip**, đặc biệt là RKLLM với các giải pháp local inference trên hardware giá rẻ (~$50 SBC).

Điểm nhấn: Cộng đồng đang chuyển từ "chat with AI" sang "AI that does things" - từ RAG systems sang autonomous agents với memory, skills, và tool execution.

---

## 🎯 Top Repos Theo Chiều

### 🤖 **AI Agents** (Frameworks & Automation)

**⭐ Nổi bật nhất:**

- **lfnovo/open-notebook** (+794 ⭐)
  - Open source implementation của Notebook LM với nhiều tính năng và flexibility hơn
  - TypeScript-based, production-ready alternative

- **obra/superpowers** (+700 ⭐)
  - Agentic skills framework & methodology that actually works
  - Shell-based, nhấn mạnh practical implementation

- **Panniantong/Agent-Reach** (+683 ⭐)
  - Agent vision system: đọc & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
  - CLI tool, zero API fees - giải pháp "eyes for AI agents"

**Các framework đáng chú ý:**

- **CopilotKit/CopilotKit** (+631 ⭐): Frontend stack cho Agents & Generative UI (React, Angular, Mobile, Slack) - creators của AG-UI Protocol
- **mvanhorn/last30days-skill** (+439 ⭐): AI agent skill research topics across multiple platforms, synthesize summaries
- **MemPalace/mempalace** (+446 ⭐): Best-benchmarked open-source AI memory system, miễn phí

**Vertical applications:**

- **santifer/career-ops** (+193 ⭐): AI-powered job search với 14 skill modes, Go dashboard, PDF generation
- **danielmiessler/Personal_AI_Infrastructure** (+70 ⭐): Agentic AI Infrastructure để magnify HUMAN capabilities

---

### 🔧 **AI Infrastructure** (SDKs, Tools, CLIs)

**Enterprise-grade tools:**

- **PaddlePaddle/PaddleOCR** (+433 ⭐)
  - OCR toolkit bridge giữa images/PDFs và LLMs
  - Hỗ trợ 100+ ngôn ngữ, turn documents thành structured data

- **openai/plugins** (+213 ⭐)
  - Official OpenAI Plugins repository
  - Ecosystem expansion signal

**Security & DevOps:**

- **aquasecurity/trivy** (+159 ⭐): Vulnerability scanner cho containers, K8s, code, clouds
- **microsoft/mxc** (+64 ⭐): Policy-driven layered isolation và containment (Rust)

**Voice AI:**

- **microsoft/VibeVoice** (+216 ⭐)
  - Open-source frontier voice AI
  - Microsoft's entry vào open voice space

---

### 🧠 **Models & Training**

- **openai/whisper** (+150 ⭐): Robust speech recognition via large-scale weak supervision
  - Vẫn maintain momentum mạnh sau years

---

### 🔌 **Embedded AI** (NPU, Edge, Orange Pi, Rockchip)

**🔥 Xu hướng nóng nhất tuần này:**

**RKLLM Ecosystem:**

- **NotPunchnox/rkllama** (547 ⭐)
  - Ollama alternative cho Rockchip NPU
  - Efficient AI/DL models trên RK devices với NPU optimization
  - Python-based, key enabler cho edge AI

- **mafischer/oRKLLM** (2 ⭐): OpenAI-compatible LLM inference server cho RK3576/RK3588
  - Run local AI trên $50 SBC
  - OpenAI API compatibility = easy integration

**Infrastructure cho Edge:**

- **jaylfc/taOS** (209 ⭐)
  - Self-hosted auto-clustering AI agent OS cho consumer hardware
  - Desktop, app store, agent deployment, distributed compute cluster
  - Democratizing AI infrastructure

**Monitoring & Optimization:**

- **YeWenxuan64/rktop** (4 ⭐): Real-time monitoring RK3588 CPU/NPU/GPU/RGA
- **chenweihan02/rktop-lite** (1 ⭐): Lightweight CSV logger cho SSH-based tracking

**Multimodal on Edge:**

- **Leon6225/InternVL3.5-4B-NPU** (1 ⭐): InternVL3.5-4B cho RK3588 NPU
- **toopac01/InternVL3.5-8B-NPU** (0 ⭐): 8B variant cho multimodal tasks

**Orange Pi Ecosystem:**

- **jaylfc/taosmd** (44 ⭐)
  - Local-first AI memory runs offline trên 8GB+ RAM machines (SBC, mini PC)
  - Zero-loss verbatim archive, knowledge graph, hybrid retrieval
  - Framework-agnostic, no cloud

- **MichaIng/DietPi** (6,100 ⭐): Lightweight OS cho SBCs
- **CERALIVE/image-building-pipeline** (3 ⭐): mkosi-based image builder cho RK3588 devices

---

### 🔍 **RAG & Knowledge**

**Top platforms:**

- **langgenius/dify** (144,177 ⭐): Production-ready agentic workflow platform
- **open-webui/open-webui** (140,385 ⭐): User-friendly AI interface
- **langchain-ai/langchain** (138,679 ⭐): The agent engineering platform

**Emerging tools:**

- **Shubhamsaboo/awesome-llm-apps** (113,542 ⭐): 100+ AI Agent & RAG apps you can run
- **infiniflow/ragflow** (82,049 ⭐): Leading RAG engine fusing RAG + Agent capabilities

**Context & Memory:**

- **thedotmack/claude-mem** (80,990 ⭐)
  - Persistent context across sessions
  - Works với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot+

- **safishamsi/graphify** (60,655 ⭐)
  - Turn code/SQL/docs/images/videos thành queryable knowledge graph
  - AI coding assistant skill

---

### 📦 **AI Applications**

**Development tools:**

- **vitejs/vite** (+25 ⭐): Next-gen frontend tooling
- **sveltejs/svelte** (+25 ⭐): Web development for the rest of us

**Foundation:**

- **nginx/nginx** (+20 ⭐): Official NGINX repository
- **golang/go** (+30 ⭐): The Go programming language

---

## 🔥 Phân tích Tín Hiệu Xu Hướng

### 1. **Agent Harness Renaissance**
- Multiple implementations competing: Superpowers, ECC, career-ops, Personal_AI_Infrastructure
- Focus shift từ "what agents can do" sang "how to build agent systems"
- Emphasis trên **skills/capabilities architecture** thay vì monolithic agents

### 2. **Edge AI Democratization Wave**
- **RKLLM đang emerge** như PyTorch của embedded AI
- $50 SBCs (RK3588) chạy được multimodal LLMs locally
- Orange Pi + Rockchip NPU = accessible AI infrastructure cho masses
- Xu hướng: "AI without cloud dependency"

### 3. **Memory-First Agent Design**
- MemPalace, claude-mem, taosmd: memory là foundational component
- Không còn stateless agents - persistent context across sessions
- Knowledge graph integration (graphify) cho structured memory

### 4. **Multi-Source Intelligence Gathering**
- Agent-Reach, last30days-skill: agents need "eyes" để see internet
- Research automation across Reddit, X, YouTube, HN, Polymarket
- Synthesis capabilities quan trọng hơn raw data collection

### 5. **OpenAI API Compatibility Pattern**
- oRKLLM, ollama: OpenAI-compatible APIs như standard interface
- Easy migration path từ cloud to edge
- Developer experience > vendor lock-in

### 6. **Embedded Multimodal Push**
- InternVL models running trên NPUs
- Vision + language trên edge devices
- Next frontier: multimodal agents on consumer hardware

### 7. **Self-Hosted Agent OS**
- taOS: complete OS stack cho AI agents
- Desktop, app store, cluster management - treating agents như first-class citizens
- Infrastructure-as-code cho agent deployments

---

## 💡 Tâm điểm Cộng đồng

### **Most Discussed: Agent Skills Architecture**
Community debate: monolithic vs. modular agent design. Projects như Superpowers và last30days-skill đang win với pluggable skills approach.

### **Underrated Gem: taOS + taosmd**
Combination của agent OS + local memory system. Chạy được trên Orange Pi. Full stack từ OS layer đến memory layer. Could be gamechanging cho edge AI deployments.

### **Technical Achievement: RKLLM Ecosystem**
Từ 0 đến ecosystem chỉ trong vài tháng. Community đang standardize around rkllama như reference implementation. Monitoring tools (rktop) và infrastructure (oRKLLM) đang follow.

### **Enterprise Interest: OCR-to-LLM Pipeline**
PaddleOCR momentum = enterprises realizing unstructured documents là gold mine. Bridge giữa legacy documents và modern AI systems.

### **Developer Experience Win: CopilotKit AG-UI Protocol**
Frontend framework cho generative UI. React/Angular/Mobile support. Community hungry cho production-ready agent UI frameworks.

---

## 🎯 Takeaway cho Developers

1. **Nếu build agents**: Adopt skills/capabilities architecture ngay. Monolithic agents don't scale.

2. **Nếu quan tâm edge AI**: RK3588 boards + RKLLM = best bang for buck. Start với rkllama.

3. **Nếu build products**: Memory systems (MemPalace, claude-mem) là must-have, không phải nice-to-have.

4. **Nếu research**: Multi-source intelligence tools (Agent-Reach, last30days-skill) automate research workflows dramatically.

5. **Infrastructure folks**: Self-hosted solutions (taOS, open-webui) đang mature. Time to evaluate cloud alternatives.

---

**Bottom line:** Community đang move fast từ "AI as service" sang "AI as infrastructure you own." Edge AI, agent frameworks, và memory systems là 3 pillars của next wave.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*