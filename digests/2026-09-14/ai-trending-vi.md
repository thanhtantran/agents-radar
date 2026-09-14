# Xu hướng AI Mã nguồn mở 2026-09-14

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-14 02:00 UTC

---

# 📊 Báo cáo Phân Tích Xu Hướng AI Mã Nguồn Mở - 14/09/2026

## 🎯 Tóm tắt hôm nay

Hôm nay đánh dấu sự bùng nổ của **AI coding agents** và **embedded AI**. Cộng đồng đang chuyển từ LLM đơn thuần sang các hệ thống agent tự động hóa phức tạp, với sự xuất hiện của nhiều công cụ tối ưu context, skill registry, và framework multi-agent. Đồng thời, làn sóng triển khai AI trên edge device (Rockchip NPU, Orange Pi) đang tăng tốc mạnh mẽ với các giải pháp inference offline hoàn chỉnh.

**Điểm nhấn chính:**
- Skill-based agent architecture đang thay thế prompt engineering đơn thuần
- Frontier models có thể chạy hoàn toàn offline trên hardware giá rẻ
- System prompts của các mô hình thương mại bị leak hàng loạt
- AI agents chuyên sâu theo vertical (pentesting, video production, code review)

---

## 🤖 AI Agents - Frameworks & Automation

### 🔥 Hot picks

**tech-leads-club/agent-skills** (+265 ⭐)
- Registry an toàn cho AI coding agent skills
- Tích hợp sẵn với Antigravity, Claude Code, Cursor, Copilot
- Giải quyết vấn đề tin cậy và bảo mật khi extend agent capabilities

**NousResearch/hermes-agent** (245K ⭐, +updates)
- "The agent that grows with you" - framework agent có khả năng học và phát triển
- Xu hướng: agents không chỉ thực thi mà còn tự cải tiến

**zhayujie/CowAgent** (47K ⭐)
- Super AI assistant từ chatgpt-on-wechat
- Multi-agent, multi-model, multi-channel
- Self-evolving với memory và knowledge base

**HKUDS/nanobot** (48K ⭐)
- Ultra-lightweight personal AI agent framework
- WebUI + tools + memory + MCP + multi-agent workflows
- Self-hosted và open-source hoàn toàn

**siyuan-note/siyuan** (46K ⭐)
- Knowledge workspace nơi con người và AI agents cộng tác
- Privacy-first, self-hosted
- Xu hướng: AI agents như "đồng nghiệp" chứ không phải công cụ

### 🎯 Vertical-specific agents

**vxcontrol/pentagi** (+590 ⭐)
- Autonomous penetration testing agents
- Thực thi complex security tasks tự động

**SnailSploit/Claude-Red** (+506 ⭐)
- Offensive security skills library cho Claude
- Structured SKILL.md files cho từng attack surface
- Từ SQLi đến EDR evasion

**jihe520/MathModelAgent** (+246 ⭐)
- Agent chuyên về mathematical modeling
- Tự động hoàn thành và generate paper submission-ready

**career-ops-hq/career-ops** (71K ⭐)
- AI job search agent: scan portals, evaluate, tailor CV
- Chạy local trong AI coding CLI

---

## 🔧 AI Infrastructure - SDKs, Inference & Tools

### 🚀 Inference engines

**JustVugg/colibri** (+868 ⭐ - TOP 1)
- Chạy frontier MoE models trên hardware consumer
- Pure C, zero deps, experts streamed từ disk
- "Tiny engine, immense model" - đột phá về resource efficiency

**calesthio/OpenMontage** (+380 ⭐)
- Agentic video production system đầu tiên open-source
- 12 production pipelines, 100+ tools, 700+ skill files
- Biến AI coding assistant thành video production studio

### 🔐 Security & System prompts

**asgeirtj/system_prompts_leaks** (+706 ⭐)
- Leak system prompts từ Claude Fable 5.1, Opus 5, GPT-6-Astra, Gemini 3.8, Grok
- Cập nhật thường xuyên
- Insight vào cách các công ty lớn design AI behavior

### 🎙️ Voice & Audio

**debpalash/VoiceStudio** (+2,632 ⭐ - TOP trending)
- Open-source, fully-local ElevenLabs alternative
- Voice cloning, design, video dubbing, transcription
- 646 ngôn ngữ, chạy hoàn toàn offline

**multimodal-art-projection/YuE** (+487 ⭐)
- Frontier music generation với symbolic planning
- Zero-shot covers và agentic music editing

### 🛠️ Developer tools

**alibaba/open-code-review** (+443 ⭐)
- Battle-tested tại Alibaba scale
- Hybrid: deterministic pipelines + LLM Agent
- Precise line-level comments với built-in multi-language ruleset

**affaan-m/ECC** (258K ⭐)
- Agent harness performance optimization
- Skills, instincts, memory cho Claude Code, Codex, Cursor

**JuliusBrussee/caveman** (105K ⭐)
- Cắt 65% tokens bằng cách "talk like caveman"
- "why use many token when few token do trick"

**headroomlabs-ai/headroom** (72K ⭐)
- Compress tool outputs, logs, files trước khi reach LLM
- 20% fewer tokens cho coding agents, 60-95% cho JSON

---

## 🧠 Models & Knowledge Systems

### 📚 RAG & Knowledge graphs

**Graphify-Labs/graphify** (116K ⭐)
- Chuyển codebase + docs + schemas thành queryable knowledge graph
- Skill cho Claude Code, Cursor, Codex
- Local deterministic AST parsing, không dùng vector store

**thedotmack/claude-mem** (94K ⭐)
- Persistent context across sessions cho mọi agent
- AI-compressed memory injection
- Works với Claude Code, Codex, Gemini, Hermes

**infiniflow/ragflow** (91K ⭐)
- Leading RAG engine với Agent capabilities
- Superior context layer cho LLMs

**Shubhamsaboo/awesome-llm-apps** (138K ⭐)
- 100+ AI Agents, Agent Skills và RAG Apps
- Free và open source collection

### 🏗️ LLM infrastructure

**ollama/ollama** (181K ⭐)
- Support Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, Gemma
- Standard de facto cho local LLM deployment

**langchain-ai/langchain** (146K ⭐)
- "The agent engineering platform"
- Định hình cách build AI agents

**langgenius/dify** (156K ⭐)
- Build Agentic workflows + RAG pipelines
- Cloud, VPC, self-hosted deployment
- From prototype to production không rebuild stack

---

## 📦 AI Applications - Vertical Solutions

**ever-co/ever-gauzy** (+191 ⭐)
- Open Business Management Platform (ERP/CRM/HRM/ATS/PM)

**melgarafael/DeskcommCRM** (+432 ⭐)
- Self-hosted CRM với native AI agents + WhatsApp
- Open alternative cho Kommo, Octadesk, Intercom
- MCP-ready, multi-tenant

**bilawalsidhu/gods-eye-view** (+2,680 ⭐ - TOP 3)
- Spy satellite simulator in browser
- Real-time open source spatial intelligence trên 3D globe

**hugohe3/ppt-master** (54K ⭐)
- AI turns documents thành native PowerPoint
- Native shapes, transitions, animations, charts, tables
- Audio narration từ speaker notes

**harry0703/MoneyPrinterTurbo** (123K ⭐)
- Generate HD short videos từ topic/keyword
- AI workflow automation cho video content

**ZhuLinsen/daily_stock_analysis** (65K ⭐)
- Multi-market stock analysis với LLM
- Multi-source data, real-time news, automated notifications

---

## 🔌 Embedded AI - NPU, Edge, Hardware

### 🍊 Orange Pi & Rockchip ecosystem

**jaylfc/taOS** (528 ⭐)
- Self-hosted AI agent OS chạy trên hardware bạn sở hữu
- Offline by default, cloud by choice
- Auto-clustering across Orange Pi, Raspberry Pi, Mac mini, gaming PC

**Leon6225/InternVL3.5-4B-NPU** (5 ⭐)
- Multimodal AI InternVL3.5-4B cho RK3588 NPU
- Vision + language understanding trên edge device

**AKHYui/rkllama-webui** (1 ⭐)
- Web UI cho RKLLM NPU models trên RK3588
- Multi-session chat với SSE streaming
- RAG knowledge base (bge-small-zh + ChromaDB)

**ambagesthickskin162/Qwen3.5-4B-NPU** (fresh)
- Deploy Qwen3.5-4B trên NPU hardware
- Efficient local inference

### 🔧 Infrastructure & Tools

**freed-dev-llc/terraform-provider-turingpi** (7 ⭐)
- Terraform provider cho Turing Pi 2.5 BMC
- Infrastructure-as-code cho edge clusters

**isac322/rkmon** (11 ⭐)
- Real-time hardware monitor TUI cho RK3588
- Như htop nhưng cho GPU, NPU, VPU, RGA

**dnhkng/open-rknpu** (1 ⭐)
- Open compiler + runtime cho RV1103/RV1106 NPU
- No vendor SDK, no RKNN library - fully open

**boundarybitlabs/rkllm-rs** (0 ⭐)
- Rust bindings cho RKNN-LLM runtime

**MichaIng/DietPi** (6.3K ⭐)
- Lightweight OS cho single-board computers
- Orange Pi support

---

## 🔍 Tín Hiệu Xu Hướng Nổi Bật

### 1️⃣ **Skill-based Agent Architecture**
Từ monolithic prompts sang modular skills có validation. Agent không còn là "chatbot thông minh" mà là execution platform với skill registry.

### 2️⃣ **Context Compression & Memory**
Token costs đang drive innovation trong context management. Các giải pháp như caveman (-65% tokens), headroom (-60-95%), và persistent memory systems đang mainstream.

### 3️⃣ **Local-first AI Infrastructure**
Privacy và control đang thắng cloud convenience. Từ VoiceStudio (local ElevenLabs) đến colibri (frontier models on consumer hardware), xu hướng là "own your AI stack."

### 4️⃣ **Agent Harness Ecosystem**
Không chỉ build agents mà còn build systems để agents hoạt động tốt hơn: ECC, agent-skills, claude-mem. Meta-tooling cho AI agents.

### 5️⃣ **Vertical Agent Specialization**
General-purpose assistants → domain-specific autonomous agents. Pentesting (pentagi), video production (OpenMontage), math modeling (MathModelAgent), security (Claude-Red).

### 6️⃣ **Edge AI Democracy**
Rockchip NPU + RKLLM đang democratize AI inference. RK3588 boards giá $100-200 có thể chạy 4B parameter models với multi-session support.

### 7️⃣ **System Prompt Transparency**
Leak của system prompts (Claude, GPT, Gemini) đang tạo pressure về transparency và public understanding of AI behavior design.

### 8️⃣ **MCP (Model Context Protocol) Adoption**
Ngày càng nhiều tools mention "MCP-ready". Standard protocol cho agent tool integration đang hình thành.

---

## 🎪 Tâm Điểm Cộng Đồng

### 🏆 Trending champions

1. **colibri** - Proof rằng frontier models không cần datacenter
2. **gods-eye-view** - Viral với concept spy satellite in browser
3. **VoiceStudio** - Democratizing voice AI (alternative cho ElevenLabs $22/month)

### 💬 Đang được bàn luận

- **System prompts leak**: Community đang reverse-engineer cách các công ty lớn shape AI behavior
- **Agent skills security**: agent-skills repo address pain point lớn về trust trong AI agent ecosystem
- **NPU vs Cloud**: Debate về economics và privacy của local inference vs cloud APIs

### 🚀 Momentum builders

- **CherryHQ/cherry-studio** (52K): Unified access tới frontier LLMs
- **CowAgent** (47K): Từ WeChat bot thành full agent framework
- **Codewhale** (41K): Rust-based coding agent cho terminal

### 🔬 Innovation clusters

**Compression & efficiency**: caveman, headroom, colibri - cùng attack problem về token/resource efficiency

**Memory & context**: claude-mem, thedotmack, taosmd - persistent context across sessions

**Edge deployment**: Tập trung mạnh vào Rockchip ecosystem (RK3588, RV1106) với NPU inference

---

## 💡 Kết Luận

2026 đang chứng kiến sự trưởng thành của AI agent ecosystem từ prototype toys sang production-ready systems. Hai xu hướng lớn:

1. **Agents as colleagues, not tools** - Persistent memory, self-evolution, collaboration
2. **Own your stack** - Local-first, privacy-focused, hardware democratization

Edge AI không còn là "compromise" mà đang trở thành first-class deployment option với performance ngày càng tốt. Đồng thời, agent architecture đang standardize around skills, tools, và memory systems.

Điểm thú vị: Nhiều breakthrough đến từ individual developers và small teams, không phải big tech. Open source đang lead innovation trong AI infrastructure.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*