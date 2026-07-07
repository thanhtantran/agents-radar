# Xu hướng AI Mã nguồn mở 2026-07-07

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-07 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn mở - 2026-07-07

## 🎯 Tóm tắt hôm nay

Hôm nay đánh dấu một làn sóng mới trong hệ sinh thái AI: **kỷ nguyên "AI Coding Agents"** đang bùng nổ với sự xuất hiện của các agent skills, prompt leaks từ các mô hình hàng đầu, và sự chuyển mình mạnh mẽ sang **local-first AI**. Đồng thời, cộng đồng đang tích cực xây dựng các giải pháp **agent multiplexing**, **context management**, và **embedded AI** trên phần cứng giá rẻ.

**Con số ấn tượng**: 
- 8/15 repos trending đầu tiên liên quan đến AI coding agents
- Xu hướng "skills" và "system prompts" chiếm ưu thế
- Local-first và privacy-first được nhấn mạnh mạnh mẽ

---

## 🗂️ Top Repos Theo Chiều

### 🤖 **AI Agents** (Frameworks, Multi-agent, Automation)

**1. addyosmani/agent-skills** ⭐ +1,112
- Production-grade engineering skills cho AI coding agents
- Tín hiệu: Cộng đồng đang chuẩn hóa "skills" như building blocks cho agents

**2. Leonxlnx/taste-skill** ⭐ +1,458
- "Good taste" cho AI - ngăn output nhạt nhẽo
- Insight: Chất lượng output đang trở thành priority, không chỉ functional correctness

**3. alirezarezvani/claude-skills** ⭐ +610
- 345 skills cho Claude Code & 8+ coding agents khác
- Bao phủ: engineering, marketing, product, compliance, C-level advisory
- Tín hiệu: Multi-domain skills package đang là xu hướng

**4. ogulcancelik/herdr** ⭐ +779
- Agent multiplexer trong terminal
- Pattern mới: orchestration layer cho multi-agent workflows

**5. gastownhall/gastown** ⭐ +291
- Multi-agent workspace manager
- Insight: Quản lý nhiều agents đồng thời đang trở thành bottleneck cần giải quyết

**6. NousResearch/hermes-agent** ⭐ 210,397
- "The agent that grows with you"
- Dự án lớn với traction cao, focus vào agent evolution

**7. zhayujie/CowAgent** ⭐ 45,832
- Open-source super AI assistant, self-evolves với memory
- Formerly chatgpt-on-wechat - pivot sang agent platform

**8. HKUDS/nanobot** ⭐ 45,078
- Lightweight AI agent cho tools, chats, workflows
- Tín hiệu: Demand cho lightweight alternatives

**9. Gitlawb/openclaude** ⭐ 29,824
- "Runs anywhere. Uses anything"
- Universal agent runtime đang được community quan tâm

### 🔧 **AI Infrastructure** (SDKs, Inference, CLIs, Tools)

**1. asgeirtj/system_prompts_leaks** ⭐ +1,378 🔥
- System prompts từ Claude 5 Opus 4.8, GPT 5.5, Gemini 3.5, Grok, v.v.
- **Breakthrough**: Cộng đồng đang reverse-engineer các frontier models
- Tác động: Transparency và democratization của AI knowledge

**2. openai/codex-plugin-cc** ⭐ +906
- Codex từ Claude Code để review code hoặc delegate tasks
- Insight: Interop giữa các AI coding platforms đang được chính hãng hỗ trợ

**3. steipete/CodexBar** ⭐ +598
- Show usage stats cho OpenAI Codex và Claude Code
- Pain point: Cost monitoring cho API-based agents

**4. firecrawl/firecrawl** ⭐ +867 (trending) | 146,322 total
- Search, scrape, interact với web at scale
- Critical infrastructure cho agents cần web access

**5. ollama/ollama** ⭐ 175,615
- Hỗ trợ Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, gpt-oss
- Tiếp tục là runtime choice cho local LLM deployment

**6. affaan-m/ECC** ⭐ 226,691 🏆
- Agent harness performance optimization
- Skills, instincts, memory, security cho Claude Code, Codex, Cursor
- **Largest project** trong danh sách - platform-level tool

**7. alibaba/zvec** ⭐ +382
- Lightweight, lightning-fast, in-process vector database
- Tín hiệu: Embedded vector DB cho local-first apps

### 🧠 **Models & Training**

Không có repos nổi bật trong trending hôm nay - cộng đồng đang focus vào application layer hơn model research.

### 📦 **AI Applications** (Vertical Products, Solutions)

**1. Zackriya-Solutions/meetily** ⭐ +2,494 🔥
- Privacy-first AI meeting assistant
- 4x faster Parakeet/Whisper, speaker diarization, Ollama summarization
- 100% local, no cloud - chạy trên Rust
- Use case: Vertical app với strong privacy positioning

**2. ruvnet/RuView** ⭐ +470
- WiFi signals → spatial intelligence, vital sign monitoring, presence detection
- Không cần camera/video
- Innovation: Non-visual sensing bằng commodity WiFi

**3. bradautomates/claude-video** ⭐ +427
- Cho Claude khả năng "xem" video
- /watch command → download, extract frames, transcribe
- Tín hiệu: Video understanding đang được democratized

**4. karakeep-app/karakeep** ⭐ +199
- Self-hostable bookmark app với AI tagging & full-text search
- Pattern: "AI-enhanced traditional apps" với self-hosting

**5. santifer/career-ops** ⭐ 58,869
- AI job search: scan portals, score listings A-F, tailor CV
- Chạy local trong AI coding CLI
- Vertical use case với high PMF

**6. ZhuLinsen/daily_stock_analysis** ⭐ 55,154
- LLM-driven multi-market stock analysis
- Multi-source data, real-time news, auto notifications
- Zero-cost scheduled runs

**7. Panniantong/Agent-Reach** ⭐ 52,079
- "Give your AI agent eyes to see the internet"
- Read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- One CLI, zero API fees

**8. CherryHQ/cherry-studio** ⭐ 48,236
- AI productivity studio: smart chat, autonomous agents, 300+ assistants
- Unified access to frontier LLMs

**9. hugohe3/ppt-master** ⭐ 37,183
- AI generates editable PowerPoint từ documents
- Native shapes, animations, voiced speaker notes

**10. CopilotKit/CopilotKit** ⭐ 35,810
- Frontend Stack for Agents & Generative UI
- React, Angular, Mobile, Slack
- Makers of AG-UI Protocol

### 🔍 **RAG & Knowledge** (Vector DBs, Retrieval)

**1. thedotmack/claude-mem** ⭐ 86,174 🏆
- Persistent context across sessions cho every agent
- AI-compressed session memory, injected vào future sessions
- Works với Claude Code, Codex, Gemini, Hermes, Copilot, OpenCode
- **Critical infrastructure** cho long-running agent workflows

**2. infiniflow/ragflow** ⭐ 84,426
- Leading RAG engine + Agent capabilities
- Superior context layer cho LLMs

**3. Graphify-Labs/graphify** ⭐ 78,760
- Turn any folder → queryable knowledge graph
- AI coding assistant skill
- App code + DB schema + infrastructure in one graph
- Innovation: Graph-based code understanding

**4. Mintplex-Labs/anything-llm** ⭐ 62,705
- "Stop renting your intelligence. Own it"
- Local-first agent experience

**5. mem0ai/mem0** ⭐ 60,245
- Universal memory layer for AI Agents
- Core infrastructure piece

**6. pathwaycom/llm-app** ⭐ 59,106
- Ready-to-run cloud templates cho RAG, AI pipelines
- Live sync với Sharepoint, Google Drive, S3, Kafka, PostgreSQL

**7. headroomlabs-ai/headroom** ⭐ 57,172
- Compress tool outputs, logs, files, RAG chunks trước khi đến LLM
- 60-95% fewer tokens, same answers
- Library, proxy, MCP server
- **Critical**: Context window optimization

**8. FlowiseAI/Flowise** ⭐ 54,346
- Build AI Agents, Visually
- No-code agent builder

**9. run-llama/llama_index** ⭐ 50,690
- Leading document agent and OCR platform
- Established infrastructure

**10. jaylfc/taosmd** ⭐ 65
- Local-first AI memory trên SBC/mini PC
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval
- Framework-agnostic, no cloud

### 🔌 **Embedded AI** (NPU, Edge AI, Orange Pi, RKLLM)

**1. jaylfc/taOS** ⭐ 414
- Self-hosted AI agent OS
- Memory, chat, agents, files stay on YOUR hardware
- Offline by default, cloud by choice
- Auto-clustering across Orange Pi, Raspberry Pi, Mac mini, gaming PC
- **Game changer**: Distributed AI OS trên consumer hardware

**2. mack42/OrangePi5Pro** ⭐ 12
- Ubuntu 26.04 LTS build cho Orange Pi 5 Pro
- Workaround cho rust-coreutils panic trên RK3588

**3. oRKLLM/ork-driver** ⭐ 1
- Clean-room userspace matmul library cho Rockchip NPU
- Low-level infrastructure

**4. gregordiary/patches** ⭐ 1
- RK3588 mainline rocket NPU driver patches
- HW video-transcode patches

**5. gregordinary/ggml-rocket** ⭐ 0
- Drop-in ggml backend cho Rockchip NPUs
- Offload llama.cpp/whisper.cpp prefill to RK3588 NPU

**6. gregordinary/tflite-rocket** ⭐ 0
- TensorFlow Lite delegate cho NPU-accelerated detection trên RK3588

**7. gregordinary/rocket-userspace** ⭐ 0
- Userspace driver, matmul, on-NPU op library cho Rockchip NPUs
- Via mainline rocket DRM-accel driver

**8. Leon6225/InternVL3.5-4B-NPU** ⭐ 3
- Multimodal AI (InternVL3.5-4B) cho RK3588 NPU
- Vision + language understanding

**9. xuzaiyyyy/friday_voice_speaker** ⭐ 1
- Multimodal smart voice speaker trên Orange Pi
- Local ASR, LLM, RKNN vision, Qt UI

**10. MichaIng/DietPi** ⭐ 6,143
- Lightweight OS cho SBCs
- Foundation cho embedded AI deployments

---

## 🔮 Phân tích Tín hiệu Xu hướng

### 1. **"Skills Marketplace" cho AI Agents**
- Cộng đồng đang standardize reusable "skills" như npm packages
- Pattern: agent-skills, taste-skill, claude-skills
- Tương lai: Skills registry, versioning, dependency management

### 2. **System Prompt Transparency Movement**
- System prompts leaks từ các frontier models
- Democratization của AI knowledge
- Tác động: Cộng đồng có thể học và replicate best practices

### 3. **Agent Multiplexing & Orchestration**
- herdr, gastown, claude-mem
- Pain point: Quản lý nhiều agents, persist context across sessions
- Giải pháp: Orchestration layers, persistent memory systems

### 4. **Local-First & Privacy-First AI**
- meetily (100% local), taOS (offline by default), anything-llm
- Strong positioning: "Stop renting your intelligence. Own it"
- Driver: Privacy concerns + cost control

### 5. **Embedded AI trên Consumer Hardware**
- RK3588 NPU ecosystem đang mature
- Orange Pi, Raspberry Pi clusters chạy distributed AI
- Pattern: "Cloud at home" với hardware bạn sở hữu

### 6. **Context Window Optimization**
- headroom: 60-95% token reduction
- Critical cho cost control và performance
- Compression techniques becoming infrastructure

### 7. **Agent Interoperability**
- openai/codex-plugin-cc: Codex ↔ Claude Code
- Trend: Cross-platform agent workflows
- Future: Agent-to-agent communication protocols

### 8. **Video Understanding Democratization**
- claude-video, InternVL3.5-4B-NPU
- Multimodal becoming accessible
- Pattern: Frame extraction + transcription + LLM reasoning

---

## 🎪 Tâm điểm Cộng đồng

### 🔥 **Hottest Debates**

**"System Prompts Should Be Public"**
- asgeirtj/system_prompts_leaks với +1,378 stars ngay hôm đầu
- Cộng đồng đang demand transparency từ AI vendors
- Ethical question: IP protection vs. user knowledge

**"Local vs. Cloud AI"**
- meetily (privacy-first, 100% local) vs. cloud-based solutions
- taOS positioning: "offline by default, cloud by choice"
- Trend: Hybrid approach đang chiến thắng

### 💡 **Emerging Patterns**

**"Agent OS" concept**
- taOS, hermes-agent, CowAgent
- Không chỉ là tools, mà là entire operating environments
- Multi-agent, memory, self-evolution

**"Skills as First-Class Citizens"**
- agent-skills, taste-skill, claude-skills
- Reusable, composable, shareable
- NPM moment cho AI agents

**"Embedded AI Renaissance"**
- RK3588 NPU ecosystem với 10+ active projects
- Consumer hardware (Orange Pi, <$100) chạy production AI workloads
- Democratization của AI infrastructure

### 🚀 **Projects to Watch**

1. **thedotmack/claude-mem** (86K stars) - Solving persistent context problem
2. **affaan-m/ECC** (226K stars) - Platform-level agent optimization
3. **jaylfc/taOS** - Bold vision: Self-hosted AI OS
4. **Graphify-Labs/graphify** - Knowledge graph approach cho code understanding
5. **headroomlabs-ai/headroom** - Context compression infrastructure

---

## 📌 Kết luận

**2026-07-07 đánh dấu một turning point:**

✅ AI Coding Agents không còn là novelty - đang trở thành mainstream development tool

✅ Cộng đồng demand **transparency** (system prompts), **ownership** (local-first), và **interoperability** (cross-platform)

✅ **Skills ecosystem** đang hình thành - tương tự npm/PyPI revolution

✅ **Embedded AI** trên hardware giá rẻ đang feasible cho production workloads

✅ **Context management** và **agent orchestration** là critical infrastructure pieces tiếp theo

**Tín hiệu mạnh nhất**: Sự chuyển dịch từ "AI as service" sang "AI as owned infrastructure" - reflected trong local-first movement và embedded AI adoption.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*