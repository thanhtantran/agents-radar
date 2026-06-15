# Xu hướng AI Mã nguồn mở 2026-06-15

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-06-15 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 15/06/2026

## 📊 Tóm tắt hôm nay

Cộng đồng AI mã nguồn mở đang chứng kiến sự phát triển mạnh mẽ theo 3 hướng chính:

- **Agent Ecosystem đang bùng nổ**: Từ agent harness (ECC +215K⭐) đến production platforms (Dify +145K⭐), hệ sinh thái agent đã trưởng thành với memory persistence, skill systems và multi-agent orchestration
- **Edge AI trên NPU đang cất cánh**: NVIDIA SkillSpector (+964 stars/ngày) cho thấy security đang là ưu tiên hàng đầu, trong khi RKLLM/RKNPU trên RK3588 đang tạo ra làn sóng AI cục bộ với các dự án như taOS và InternVL3.5 NPU ports
- **Infrastructure tooling chuyển sang agent-first**: Từ career automation (career-ops +53K⭐) đến knowledge graphs (graphify +67K⭐), mọi tool đều được thiết kế để agents có thể sử dụng

## 🎯 Top repos theo chiều

### 🤖 AI Agents

**Agent Platforms & Frameworks:**
- **affaan-m/ECC** (215K⭐): Agent harness với performance optimization, skills, instincts, memory - hỗ trợ Claude Code, Codex, Cursor
- **NousResearch/hermes-agent** (193K⭐): "The agent that grows with you" - agent tự tiến hóa
- **Significant-Gravitas/AutoGPT** (184K⭐): Vision của accessible AI, tools để build agents
- **zhayujie/CowAgent** (45K⭐): Super AI assistant với task planning, tool execution, self-evolution, multi-model/channel
- **HKUDS/nanobot** (44K⭐): Lightweight agent cho tools, chats, workflows

**Specialized Agents:**
- **santifer/career-ops** (53K⭐): AI-powered job search với 14 skill modes, Go dashboard, batch processing
- **Panniantong/Agent-Reach** (28K⭐): "Give your AI agent eyes" - scrape Twitter, Reddit, YouTube, GitHub, Bilibili không cần API
- **ZhuLinsen/daily_stock_analysis** (42K⭐): LLM-driven stock analysis cho A/H/US markets với multi-source data

**Agent Development Tools:**
- **CopilotKit/CopilotKit** (35K⭐): Frontend stack cho agents & generative UI - React, Angular, Mobile, Slack
- **Gitlawb/openclaude** (28K⭐): "runs anywhere. uses anything" - universal agent runtime

### 🔧 AI Infrastructure

**Runtime & Orchestration:**
- **ollama/ollama** (174K⭐): Local LLM runtime hỗ trợ Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, Qwen, Gemma
- **langchain-ai/langchain** (139K⭐): The agent engineering platform
- **langgenius/dify** (145K⭐): Production-ready platform cho agentic workflow development
- **open-webui/open-webui** (141K⭐): User-friendly AI Interface với Ollama, OpenAI support

**Developer Tools:**
- **huggingface/transformers** (161K⭐): Model framework cho ML models trong text, vision, audio, multimodal
- **andrewyng/aisuite** (291 stars/ngày): Simple, unified interface tới multiple Gen AI providers
- **firecrawl/firecrawl** (132K⭐): API để search, scrape, interact với web at scale

**Security & Guardrails:**
- **NVIDIA/SkillSpector** (964 stars/ngày): 🔥 Security scanner cho AI agent skills - detect vulnerabilities, malicious patterns

### 🧠 Models & Training

**Financial Domain:**
- **shiyu-coder/Kronos** (244 stars/ngày): Foundation model cho language of financial markets

**Multimodal on NPU:**
- **Leon6225/InternVL3.5-4B-NPU**: InternVL3.5-4B port cho RK3588 NPU
- **toopac01/InternVL3.5-8B-NPU**: InternVL3.5-8B port cho RK3588

### 📦 AI Applications

**Vertical Solutions:**
- **CherryHQ/cherry-studio** (47K⭐): AI productivity studio với smart chat, autonomous agents, 300+ assistants
- **siyuan-note/siyuan** (44K⭐): Privacy-first personal knowledge management với TypeScript + Golang
- **chatwoot/chatwoot** (400 stars/ngày): Open-source omni-channel desk - alternative cho Intercom, Zendesk

**Developer Productivity:**
- **GorvGoyl/Clone-Wars** (269 stars/ngày): 100+ open-source clones của Airbnb, Amazon, Instagram với source code, demo, tech stack
- **thedaviddias/Front-End-Checklist** (72K⭐): Essential checklist cho modern web development, cho humans và AI agents

### 🔍 RAG & Knowledge

**RAG Engines:**
- **Shubhamsaboo/awesome-llm-apps** (114K⭐): 100+ AI Agent & RAG apps bạn có thể chạy ngay
- **infiniflow/ragflow** (82K⭐): Leading RAG engine với Agent capabilities
- **FlowiseAI/Flowise** (53K⭐): Build AI Agents visually

**Memory & Context:**
- **thedotmack/claude-mem** (82K⭐): 🔥 Persistent context across sessions - captures agent actions, compresses với AI, injects context. Works với Claude Code, Codex, Gemini, Hermes
- **mem0ai/mem0** (58K⭐): Universal memory layer cho AI Agents

**Knowledge Processing:**
- **safishamsi/graphify** (67K⭐): Turn code/SQL/docs/images/videos thành queryable knowledge graph - skill cho Claude Code, Codex, OpenCode
- **PaddlePaddle/PaddleOCR** (82K⭐): Turn PDFs/images thành structured data cho AI - lightweight OCR với 100+ languages
- **pathwaycom/llm-app** (59K⭐): Ready-to-run RAG templates với live data sync từ Sharepoint, Google Drive, S3, Kafka

**Full Stacks:**
- **Mintplex-Labs/anything-llm** (61K⭐): "Stop renting your intelligence. Own it" - everything cho powerful local-first agent experience
- **datawhalechina/hello-agents** (59K⭐): Tutorial từ zero về agent principles & practice (tiếng Trung)

### 🔌 Embedded AI

**NPU Platforms & Runtimes:**
- **NotPunchnox/rkllama** (554⭐): Ollama alternative cho Rockchip NPU - efficient solution cho AI/DL models với RKLLM
- **oRKLLM/oRKLLM**: Vue-based interface cho RKLLM
- **oRKLLM/ork-driver**: Clean-room userspace matmul library cho Rockchip NPU

**Edge Agent Systems:**
- **jaylfc/taOS** (237⭐): 🔥 Self-hosted auto clustering AI agent OS cho consumer hardware (Orange/Raspberry Pi, Mac Mini) - full desktop, app store, agent deployment, distributed compute
- **jaylfc/taosmd** (45⭐): Local-first AI memory chạy offline trên machines với 8GB+ RAM - zero-loss archive, knowledge graph, hybrid retrieval

**NPU Development Tools:**
- **anoxia1/rknn-model-tools**: CLI toolkit cho Rockchip NPU - model inspect, conversion (TFLite/ONNX → RKNN), benchmarking
- **isac322/rkmon**: Real-time hardware monitor TUI cho RK3588 - like htop nhưng cho GPU, NPU, VPU, RGA

**NPU Applications:**
- **zyp0424/Qwen-Chat-Assistant**: Voice chat assistant trên RK3588 với Qwen3-2B (rknn+rkllm), camera, kws, asr, tts
- **kyshipit/eai-rk3588**: Extensible RK3588 edge inference platform với multi-threaded pipeline, RKNN adapters, RKLLM chat
- **Nayerim-AI/NPUShield**: Production guardrail và RAG layer cho RKLLM trên RK3588 NPU

**SBC Infrastructure:**
- **MichaIng/DietPi** (6.1K⭐): Lightweight Linux cho single-board computers
- **CERALIVE/image-building-pipeline**: mkosi-based builder cho CeraLive streaming appliances - produces sysext bundles cho RK3588 (Orange Pi 5+, Radxa Rock 5B+)
- **Ponce1969/contador-oriental-ai**: Sistema de gestión financiera với local AI - Python, Fleting, PostgreSQL, Ollama, 100% offline cho Orange Pi 5 Plus

## 🚀 Phân tích tín hiệu xu hướng

### 1. **Agent Memory đang trở thành competitive moat**
- **claude-mem** (82K⭐) và **taosmd** cho thấy persistent memory không còn là nice-to-have mà là must-have
- Pattern: compress session → extract relevant context → inject vào future sessions
- Xu hướng: từ stateless agents → stateful agents với long-term memory

### 2. **Security-first Agent Development**
- NVIDIA SkillSpector (+964/ngày) signals rằng agent security đang là pain point lớn
- NPUShield cho RKLLM cho thấy edge AI cũng cần guardrails
- Prediction: agent marketplaces sẽ yêu cầu security scans như app stores

### 3. **RKLLM/RKNPU đang tạo "iPhone moment" cho Edge AI**
- RK3588 trở thành de-facto platform cho local AI (giống như Raspberry Pi cho IoT)
- Pattern xuất hiện: port popular models (Qwen, InternVL) → build tools (rkllama, ork-driver) → create applications (taOS, voice assistants)
- Ecosystem đang mature: từ low-level drivers → runtimes → full agent OS

### 4. **"Agent-first" thay thế "API-first"**
- Tools không còn expose APIs cho humans mà expose skills/capabilities cho agents
- Examples: Agent-Reach (web scraping), graphify (knowledge graphs), career-ops (job search)
- Implication: developer experience design sẽ focus vào agent UX

### 5. **Local-first AI đang mainstream**
- ollama (174K⭐), open-webui (141K⭐), anything-llm (61K⭐) cho thấy demand cho AI không phụ thuộc cloud
- taOS/taosmd: full agent OS chạy trên consumer hardware
- Driver: privacy concerns + cost optimization + latency requirements

### 6. **Multimodal trên Edge**
- InternVL3.5 ports cho NPU, Qwen-VL-RKNN signals rằng vision+language đang đến edge devices
- PaddleOCR (82K⭐) bridges PDFs/images với LLMs
- Next: real-time multimodal agents trên $100 hardware

## 💡 Tâm điểm cộng đồng

### 🔥 Hottest Projects Today

1. **iptv-org/iptv** (+1,528 stars): TypeScript IPTV collection - utility project thu hút massive attention
2. **NVIDIA/SkillSpector** (+964 stars): Agent security scanner - timing perfect khi agent adoption tăng
3. **chatwoot/chatwoot** (+400 stars): Open-source customer support platform - Intercom alternative đang hot

### 📈 Rising Stars (7 days)

1. **affaan-m/ECC** (215K⭐): Agent harness performance optimization - foundational infrastructure
2. **NousResearch/hermes-agent** (193K⭐): Self-growing agent - ambitious vision
3. **Shubhamsaboo/awesome-llm-apps** (114K⭐): 100+ runnable apps - lowering barrier to entry

### 🌊 Emerging Niches

**Financial AI:**
- Kronos (+244/day): foundation model cho financial markets
- daily_stock_analysis (42K⭐): LLM-driven stock analysis

**Voice & Multimodal on Edge:**
- Qwen-Chat-Assistant: complete voice assistant trên RK3588
- InternVL NPU ports: vision+language trên $100 hardware

**Agent Operating Systems:**
- taOS (237⭐): full desktop + app store + distributed compute cho agents
- Concept mới: không phải "AI trong OS" mà "OS cho AI"

### 🎓 Educational Impact

- **datawhalechina/hello-agents** (59K⭐): comprehensive agent tutorial (Chinese) signals China's strong investment trong agent education
- **Front-End-Checklist** (72K⭐): explicitly designed "for humans and AI agents" - docs đang adapt cho dual audience

---

**Kết luận:** Ngày 15/06/2026 đánh dấu maturation của agent ecosystem. Từ memory persistence (claude-mem) đến security (SkillSpector), từ edge OS (taOS) đến NPU tooling (RKLLM), các building blocks đang được đặt nền móng cho thế hệ tiếp theo của autonomous AI systems. RK3588/RKLLM đang emerge như một platform key cho democratized, local-first AI.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*