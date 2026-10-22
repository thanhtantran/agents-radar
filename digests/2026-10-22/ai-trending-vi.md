# Xu hướng AI Mã nguồn mở 2026-10-22

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-22 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-10-22

## 1. Tóm tắt hôm nay

Coding agents đang thống trị GitHub. Cộng đồng tập trung vào 3 vấn đề lớn:
- **Agent infrastructure**: Memory, skills, context management cho coding agents
- **Edge AI**: RKNPU/RKLLM trên hardware rẻ (Orange Pi, RK3588)
- **Efficiency**: Token compression, context compression, lazy execution

Tín hiệu mạnh: agents không còn PoC. Production-ready harnesses, security audits, memory systems.

## 2. Top repos theo chiều

### 🤖 AI Agents

**stablyai/orca** (+1541) - TypeScript
- Multi-agent fleet manager cho Grok Bot, Claude Code
- Cross-platform: desktop, mobile, remote runtime
- Pattern: unified interface cho nhiều agent vendors

**NousResearch/hermes-agent** (255,976⭐) - Python
- "Agent grows with you" - learning agent core
- Focus: long-term adaptation

**Significant-Gravitas/AutoGPT** (187,704⭐) - Python
- Veteran project, vẫn top trending
- Mission: accessible AI cho everyone

**affaan-m/ECC** (285,761⭐) - JavaScript
- Agent harness cho Claude Code, Codex, OpenCode
- Skills + instincts + memory + security

**zhayujie/CowAgent** (47,500⭐) - Python
- Personal AI assistant, self-evolving
- Multi-agent, multi-model, multi-channel
- One-line install

**Panniantong/Agent-Reach** (100,678⭐) - Python
- Web scraping cho agents: Twitter, Reddit, YouTube, GitHub, XiaoHongShu
- Zero API fees

**HKUDS/nanobot** (49,257⭐) - Python
- Ultra-lightweight agent framework
- WebUI + tools + memory + MCP + multi-agent workflows

### 🔧 AI Infrastructure

**cloudflare/security-audit-skill** (+2012) - JavaScript
- Coding-agent skill cho security audits
- Multi-phase, machine-readable findings
- Cloudflare vào coding agents game

**DietrichGebert/ponytail** (+2079, cũng 171,746⭐) - JavaScript
- "Laziest senior dev" agent behavior
- Best code = no code
- Philosophy over implementation

**vllm-project/vllm** (+441) - Python
- High-throughput LLM inference engine
- Memory-efficient serving

**headroomlabs-ai/headroom** (+474, cũng 77,288⭐) - Python
- Token compression cho coding agents, RAG
- 20% ít token cho coding, 60-95% cho JSON
- Library + proxy + MCP server

**ollama/ollama** (184,217⭐) - Go
- Local model runner: Kimi, GLM, MiniMax, DeepSeek, Qwen, Gemma

**CherryHQ/cherry-studio** (52,840⭐) - TypeScript
- AI productivity studio
- Smart chat + autonomous agents + 300+ assistants

**codewhale-hq/Codewhale** (41,104⭐) - Rust
- Open-source Rust agent engine + terminal client
- Provider choice, tools, approvals

### 🧠 Models & Training

**shiyu-coder/Kronos** (+575) - Python
- Foundation model cho financial markets
- Specialized domain model trend

**huggingface/transformers** (167,959⭐) - Python
- Veteran, still trending
- Text, vision, audio, multimodal

### 📦 AI Applications

**Comfy-Org/ComfyUI** (+939) - Python
- Diffusion model GUI, graph/nodes interface
- "Fastest local inference engine"

**twentyhq/twenty** (+112) - TypeScript
- Open Salesforce alternative
- Designed for AI

**freehire/freehire** (+360) - Go
- Open-source job search engine

**career-ops-hq/career-ops** (76,419⭐) - JavaScript
- AI job search agent: scan, score, tailor resume, interview prep
- Runs in Claude Code, Codex, OpenCode

**ZhuLinsen/daily_stock_analysis** (66,837⭐) - Python
- LLM stock analysis: multi-market, real-time news, auto notifications
- Zero cost scheduled runs

**hugohe3/ppt-master** (65,256⭐) - Python
- AI tạo native PowerPoint từ docs/topics
- Native shapes, transitions, animations, charts, audio narration

### 🔍 RAG & Knowledge

**akitaonrails/ai-memory** (+286) - Rust
- Long-term memory cho agent coding CLIs
- Handoff between agent vendors

**Graphify-Labs/graphify** (+1433) - Python
- Codebase → queryable knowledge graph
- Local deterministic AST parsing, no vector store
- Skill for Claude Code, Cursor, Codex, Gemini CLI

**morluto/rea** (358,247⭐) - TypeScript
- Reverse engineer anything with agents
- App behavior → native binaries

**thedotmack/claude-mem** (102,164⭐) - TypeScript
- Persistent context across agent sessions
- Captures, compresses, injects context
- Works with Claude Code, OpenClaw, Codex, Gemini, Hermes

**Shubhamsaboo/awesome-llm-apps** (142,535⭐) - Python
- 100+ AI Agents + Agent Skills + RAG Apps

**infiniflow/ragflow** (92,616⭐) - Go
- RAG engine + Agent capabilities

**unclecode/crawl4ai** (85,994⭐) - Python
- Web crawler cho LLMs: website → LLM-ready Markdown
- Self-hosted hoặc cloud

**mem0ai/mem0** (67,602⭐) - Python
- Memory layer for AI agents
- Drop-in infrastructure, persistent context

**Mintplex-Labs/anything-llm** (67,410⭐) - JavaScript
- "Stop renting intelligence"
- Local-first agent experience

**pathwaycom/serviette** (58,782⭐) - Python
- No-code RAG server
- Real-time sync with documents, 8 vector DBs

**run-llama/llama_index** (52,607⭐) - Python
- Document processing platform for AI

**milvus-io/milvus** (46,454⭐) - Go
- High-performance vector database

### 🔌 Embedded AI

**jaylfc/taOS** (577⭐) - Python
- Self-hosted AI agent OS
- Offline by default, cloud by choice
- Runs on Orange Pi, Raspberry Pi, Mac mini, gaming PC
- Offline AI memory (taOSmd), multi-framework group chat, web desktop

**happyme531/open_rknpu2_lm_infer** (42⭐) - Rust
- Fully open-source LLM inference cho RK3588 NPU
- High-performance

**jaylfc/taosmd** (82⭐) - Python
- Local-first AI memory
- Offline trên 8GB+ RAM (SBC, mini PC, laptop)
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval

**Hanzo-Huang/rkllm-docker** (20⭐) - Python
- RKLLM trong một docker command
- Pre-converted models

**Muse-ztl/rk3588-multimodal-edge** (2⭐) - C++
- RK3588S multimodal inference: RF-DETR + Qwen2.5
- Zero-copy, numerical alignment

**kkkzx-hx/qwen-vl-rk3588** (1⭐) - C++
- Qwen2.5-VL-3B offline trên RK3588
- NPU + W8A8

**Animan-AI/DuckBuddy** (31⭐) - Rust
- Open-source embodied AI robot duck
- Walks, hears, sees, has life
- Feetech servos + Orange Pi Zero 3W

**nouverse/nouride-releases** (19⭐) - Shell
- Lightweight multi-agent AI engine
- Single daemon, homelab-friendly
- Raspberry Pi, Orange Pi, NUC

## 3. Phân tích tín hiệu xu hướng

### Agent infrastructure mature
- Không còn demo agents. Production harnesses thống trị.
- Focus: memory (persistent context, knowledge graphs), skills (reusable tools), security audits.
- Cross-agent compatibility: agent vendors muốn interop (ECC, Orca, claude-mem).

### Token efficiency = survival
- Coding agents đụng context limits. Compression solutions trending (headroom, graphify).
- Lazy execution philosophy (ponytail): best code = no code.
- Memory systems shift từ vector stores → knowledge graphs (deterministic, explainable).

### Edge AI acceleration
- RK3588/RKNPU ecosystem explode: inference engines, Docker wrappers, kernel drivers, Terraform providers.
- Target hardware: Orange Pi, Raspberry Pi - hardware rẻ, NPU mạnh.
- Multimodal edge inference real (vision-language models trên RK3588).
- taOS: full AI OS cho homelab, offline-first, cross-device clustering.

### Specialized domain models
- Finance (Kronos), stock analysis, job search - vertical AI applications.
- Không còn general-purpose chatbots. Specific workflows, specific industries.

### Open-source agents vs cloud
- Strong "stop renting intelligence" sentiment (anything-llm, taOS).
- Self-hosted, local-first, privacy-first - user data sovereignty.
- Cloud by choice, not requirement.

### Coding agents = category
- Security audit skills, reverse engineering agents, codebase knowledge graphs.
- Agents không chỉ write code - analyze, audit, understand, maintain.

## 4. Tâm điểm cộng đồng

**Cloudflare vào coding agents** (security-audit-skill +2012)
- Enterprise player legitimize coding agents
- Security audit = real enterprise need

**ponytail philosophy viral** (+2079, 171K⭐)
- "Laziest senior dev" resonate với devs
- Backlash against over-engineering trong AI era

**taOS ecosystem** (577⭐ mới, 82⭐ taosmd)
- Full AI OS cho homelab
- Offline-first, privacy-first
- Community muốn own their AI stack

**Agent memory wars**
- claude-mem (102K⭐), mem0 (67K⭐), taosmd (82⭐), ai-memory (286 today)
- Memory = competitive moat cho agents

**Edge AI democratization**
- RK3588 ecosystem 10+ repos 7 ngày
- $50-100 hardware chạy multimodal LLMs
- Orange Pi = Raspberry Pi competitor cho AI workloads

**RAG → Knowledge Graphs**
- graphify (+1433): deterministic AST parsing, no vectors
- Shift từ semantic search → structured knowledge

**Career automation**
- career-ops (76K⭐): job search agents
- ppt-master (65K⭐): presentation automation
- Agents target real professional workflows

Stars inflate (morluto/rea 358K⭐ unrealistic) - hoặc GitHub API thay đổi metric display, hoặc data source dùng cumulative numbers thay vì point-in-time. Trends vẫn valid.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*