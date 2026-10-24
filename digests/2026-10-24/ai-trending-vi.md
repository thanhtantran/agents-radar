# Xu hướng AI Mã nguồn mở 2026-10-24

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-24 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-10-24

## 📊 Tóm tắt hôm nay

Agent frameworks thống trị. Cloudflare đẩy security auditing vào coding-agent skills (+2.7K⭐). Anthropic ra plugins cho knowledge workers. NVIDIA ship OpenShell - private runtime cho autonomous agents. Trend rõ: từ chat đơn thuần → agents tự chủ với verified execution + plugin ecosystem.

Edge AI tăng tốc. RK3588 NPU xuất hiện dày đặc: multi-core inference, W8A8 quantization, vision-language models chạy offline. Orange Pi thành platform phổ biến cho local-first AI.

Local-first & privacy lên ngôi. taOS (+578⭐) - self-hosted AI OS. Graphify (+133K⭐) - codebase thành knowledge graph, không cần vector store. RAG đi theo hướng deterministic, explainable.

---

## 🔥 Top repos theo chiều

### 🤖 AI Agents

**Hermes Agent** (256K⭐)
- Framework tăng trưởng theo user
- https://github.com/NousResearch/hermes-agent

**Agent-Reach** (101K⭐)  
- Eyes cho agent: Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- Zero API fees
- https://github.com/Panniantong/Agent-Reach

**Career-Ops** (76K⭐)
- Job search agent: scan boards → score jobs → tailor CV → track applications
- Chạy local trong AI CLI
- https://github.com/career-ops-hq/career-ops

**CowAgent** (47K⭐)
- Personal AI assistant framework
- Plans tasks, runs tools, self-evolves với memory
- Multi-agent, multi-model, multi-channel
- https://github.com/zhayujie/CowAgent

**Nanobot** (49K⭐)
- Ultra-lightweight Python agent framework
- WebUI, tools, memory, MCP, workflows
- https://github.com/HKUDS/nanobot

**Cherry Studio** (52K⭐)
- AI productivity với autonomous agents + 300+ assistants
- Unified access tới frontier LLMs
- https://github.com/CherryHQ/cherry-studio

**DuckBuddy** (46⭐)
- Embodied AI robot duck: walks, hears, sees
- Orange Pi Zero 3W + Feetech servos
- https://github.com/Animan-AI/DuckBuddy

**Pepin Robot** (8⭐)
- Home robot: differential drive, 6-DoF arm, 360° lidar
- Orange Pi relay + laptop brain over wifi
- https://github.com/Artod/robot-pepin

### 🔧 AI Infrastructure

**OpenShell** (1.1K⭐ hôm nay)
- NVIDIA's safe, private runtime cho autonomous agents
- Rust
- https://github.com/NVIDIA/OpenShell

**Security-Audit-Skill** (2.7K⭐ hôm nay)
- Cloudflare's coding-agent skill
- Multi-phase security audits với machine-readable findings
- https://github.com/cloudflare/security-audit-skill

**Knowledge-Work-Plugins** (635⭐ hôm nay)
- Anthropic's plugins cho Claude Cowork
- Knowledge worker focus
- https://github.com/anthropics/knowledge-work-plugins

**Claude-Red** (226⭐ hôm nay)
- Offensive security skills cho Claude
- SQLi → shellcode → EDR evasion
- https://github.com/SnailSploit/Claude-Red

**Codewhale** (41K⭐)
- Terminal agent bằng Rust
- Any provider, any model
- https://github.com/codewhale-hq/Codewhale

**ECC** (287K⭐)
- Agent harness performance optimization
- Skills, instincts, memory, security
- https://github.com/affaan-m/ECC

**Claude-Mem** (102K⭐)
- Persistent context across sessions
- Captures, compresses với AI, injects context
- https://github.com/thedotmack/claude-mem

**Headroom** (77K⭐)
- Compress tool outputs, logs, files, RAG chunks trước khi vào LLM
- 20% fewer tokens cho coding agents
- https://github.com/headroomlabs-ai/headroom

**Nouride** (22⭐)
- Lightweight multi-agent AI engine
- Single daemon, homelab-friendly
- Raspberry Pi, Orange Pi, NUC, LXC
- https://github.com/nouverse/nouride-releases

### 🧠 Models & Training

**VoxCPM** (150⭐ hôm nay)
- Tokenizer-free TTS
- Multilingual, creative voice design, cloning
- https://github.com/OpenBMB/VoxCPM

**Open_RKNPU2_LM_Infer** (47⭐)
- Fully open-source, high-performance LLM inference cho RK3588 NPU
- Rust
- https://github.com/happyme531/open_rknpu2_lm_infer

**RKNPU2_Matmul_Open** (8⭐)
- Matrix multiplication + quantized LLM kernels cho RK3588
- https://github.com/happyme531/rknpu2_matmul_open

### 📦 AI Applications

**Rea** (373K⭐)
- Reverse engineer anything với agents
- App behavior → native binaries
- https://github.com/morluto/rea

**Daily Stock Analysis** (66K⭐)
- LLM-driven multi-market stock analysis
- Multi-source data, real-time news, auto notifications
- Zero-cost scheduled runs
- https://github.com/ZhuLinsen/daily_stock_analysis

**PPT Master** (66K⭐)
- AI turns docs/topics → native PowerPoint
- Native shapes, transitions, animations, data-backed charts, audio narration
- https://github.com/hugohe3/ppt-master

**Siyuan** (46K⭐)
- Privacy-first, self-hosted knowledge workspace
- Humans + AI agents collaborate
- https://github.com/siyuan-note/siyuan

### 🔍 RAG & Knowledge

**Graphify** (133K⭐)
- Codebase + docs + SQL + PDFs → queryable knowledge graph
- Local deterministic AST parsing
- No vector store, every edge explained
- https://github.com/Graphify-Labs/graphify

**TaOSmd** (82⭐)
- Local-first AI memory
- Offline, 8GB+ RAM
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval
- https://github.com/jaylfc/taosmd

**RAGFlow** (92K⭐)
- RAG engine + Agent capabilities
- https://github.com/infiniflow/ragflow

**Mem0** (67K⭐)
- Memory layer cho AI agents
- Drop-in infrastructure, persistent context
- https://github.com/mem0ai/mem0

**Crawl4AI** (86K⭐)
- Web crawler cho LLMs
- Any website → clean Markdown
- Self-hosted hoặc cloud
- https://github.com/unclecode/crawl4ai

### 🔌 Embedded AI

**taOS** (578⭐)
- Self-hosted AI agent OS
- Memory, chat, agents, files offline
- Auto-clustering across Orange Pi, Raspberry Pi, Mac mini, gaming PC
- https://github.com/jaylfc/taOS

**RKLLM-Docker** (20⭐)
- Run RKLLM trong one docker command
- Pre-converted models
- https://github.com/Hanzo-Huang/rkllm-docker

**RK3588-Multimodal-Edge** (2⭐)
- RF-DETR segmented inference + Qwen2.5
- Zero-copy + numerical alignment
- https://github.com/Muse-ztl/rk3588-multimodal-edge

**Qwen-VL-RK3588** (1⭐)
- Qwen2.5-VL-3B offline deployment
- NPU + W8A8
- https://github.com/kkkzx-hx/qwen-vl-rk3588

**RKNPU Device Plugin** (2⭐)
- RockChip NPU device plugin cho Kubernetes
- https://github.com/elct9620/rknpu-device-plugin

**RK3588-RKNN-Core** (2⭐)
- Out-of-tree Linux mainline kernel driver
- 3-core concurrency, 800 MHz devfreq, 4+ GiB IOMMU
- https://github.com/lurenJBD/rk3588-rknn-core

**Orange Pi Pipeline** (1⭐)
- End-to-end C++ edge-AI
- YOLOv5s across 3 NPU cores, RGA + MPP hardware pipeline, live RTMP streaming
- https://github.com/Palmyaen/orangepi

**Edge ModelDeploy** (0⭐)
- CV model deployment toolchain
- PyTorch/TensorFlow → ONNX → edge NPUs (Rockchip RKNPU + Qualcomm HTP)
- INT8/INT4 + mixed-precision
- https://github.com/YeWenxuan64/Edge_ModelDeploy

---

## 🔮 Tín hiệu xu hướng

**Coding-agent skills ecosystem nổi lên**
- Cloudflare security audits, Claude-Red offensive security, Anthropic knowledge work plugins
- Agents không còn general-purpose, đang chuyên môn hóa theo vertical

**Local-first + explainable AI thay thế cloud black-box**
- Graphify: deterministic AST parsing thay vector embeddings
- taOS: offline-first, cloud by choice
- taOSmd: zero-loss verbatim archive

**Edge AI/NPU maturity spike**
- RK3588 xuất hiện khắp nơi: multi-core inference, W8A8 quantization, vision-language models
- Orange Pi thành platform phổ biến
- Kubernetes integration cho NPUs (device plugins)

**Agent memory + context compression**
- Claude-Mem, Headroom, Mem0: persistent context across sessions
- Compression before LLM: 20-95% token reduction
- Memory không còn stateless, agents nhớ + evolve

**Security + verification in autonomous agents**
- OpenShell: safe runtime
- Security-audit-skill: machine-readable findings
- Claude-Red: offensive security baked into agent capabilities

**Embodied AI tại homelab scale**
- DuckBuddy: embodied duck robot
- Pepin: home robot với 6-DoF arm
- Orange Pi/Raspberry Pi làm relay/brain

---

## 🎯 Tâm điểm cộng đồng

**Rea (373K⭐)**: reverse engineering với agents - từ app behavior xuống native binaries. Killer use case mới.

**Graphify (133K⭐)**: codebase → queryable knowledge graph, no vector store. Deterministic, explainable. Đánh vào pain point của RAG.

**Agent-Reach (101K⭐)**: eyes cho agents - đọc/tìm Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu. Zero API fees. Internet perception layer.

**Claude-Mem (102K⭐)**: persistent context across sessions. Captures, compresses, injects. Giải quyết stateless problem của agents.

**Career-Ops (76K⭐)**: job search agent - scan → score → tailor → track. Vertical agent đầu tiên cho job hunting.

**Headroom (77K⭐)**: compress tool outputs/logs/files/RAG trước khi vào LLM. 20% fewer tokens cho coding agents. Cost optimization critical khi agents chạy 24/7.

**taOS (578⭐)**: self-hosted AI OS với auto-clustering. Offline by default, cloud by choice. Local-first movement gaining traction.

**Open_RKNPU2_LM_Infer (47⭐)**: fully open-source, high-performance LLM inference cho RK3588. Community building alternative stack cho edge AI.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*