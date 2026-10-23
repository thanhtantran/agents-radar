# Xu hướng AI Mã nguồn mở 2026-10-23

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-23 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-10-23

## 1. Tóm tắt hôm nay

Ngày nổi bật với **agent tooling & infrastructure**. Cộng đồng đang chuyển từ xây model sang xây ecosystem cho agent hoạt động tốt hơn: security audit tự động, code analysis qua knowledge graph, memory persistence cross-session. Embedded AI (RKNPU/RKLLM trên RK3588) đang tăng tốc với kernel driver chính thức + inference engine mới.

## 2. Top repos theo chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **ponytail** (+1,948⭐) - Agent think như lazy senior dev, tối ưu cho "code ít nhất"
- **anthropics/knowledge-work-plugins** (+303⭐) - Plugin repository cho Claude Cowork

**Top 7 ngày (agent frameworks):**
- **NousResearch/hermes-agent** (256K⭐) - Agent grows with you
- **CherryHQ/cherry-studio** (52K⭐) - AI productivity studio với 300+ assistants
- **HKUDS/nanobot** (49K⭐) - Ultra-lightweight self-hosted Python agent framework
- **zhayujie/CowAgent** (47K⭐) - Self-evolving với memory & knowledge, multi-agent/model/channel
- **siyuan-note/siyuan** (46K⭐) - Knowledge workspace cho human + AI agent collaboration
- **codewhale-hq/Codewhale** (41K⭐) - Terminal agent bằng Rust, provider-agnostic

**Vertical agents:**
- **career-ops-hq/career-ops** (76K⭐) - AI job search: scan/score/tailor/apply tự động
- **hugohe3/ppt-master** (66K⭐) - Doc → native PowerPoint với charts/animations
- **ZhuLinsen/daily_stock_analysis** (66K⭐) - Multi-market stock analysis với LLM

### 🔧 AI Infrastructure

**Trending hôm nay:**
- **cloudflare/security-audit-skill** (+2,979⭐) - Multi-phase security audit với machine-readable findings
- **Graphify-Labs/graphify** (+1,408⭐) - Codebase → queryable knowledge graph, no vector store

**Top 7 ngày:**
- **affaan-m/ECC** (286K⭐) - Agent harness optimization: skills/instincts/memory/security
- **firecrawl/firecrawl** (194K⭐) - Web data cho AI agents
- **ollama/ollama** (184K⭐) - Local model inference cho Kimi/GLM/Qwen/Gemma
- **thedotmack/claude-mem** (102K⭐) - Persistent context cross-session, AI-compressed
- **headroomlabs-ai/headroom** (77K⭐) - Compress tool outputs/logs/RAG 20-95% trước khi vào LLM

**Tools & CLIs:**
- **unclecode/crawl4ai** (86K⭐) - Web crawler → LLM-ready Markdown
- **Panniantong/Agent-Reach** (101K⭐) - Agent đọc Twitter/Reddit/YouTube/GitHub, zero API fees

### 🧠 Models & Training

**Top:**
- **huggingface/transformers** (168K⭐) - Model definition framework cho text/vision/audio
- **langchain-ai/langchain** (148K⭐) - Agent engineering platform

### 📦 AI Applications

**Trending:**
- **luongnv89/claude-howto** (+177⭐) - Visual guide cho Claude Code từ basic → advanced

**Top:**
- **morluto/rea** (366K⭐) - Reverse engineer anything với agents (app → native binaries)
- **open-webui/open-webui** (156K⭐) - User-friendly AI Interface (Ollama/OpenAI)
- **Shubhamsaboo/awesome-llm-apps** (142K⭐) - 100+ AI Agents & RAG Apps
- **langgenius/dify** (159K⭐) - Build agentic workflows/RAG pipelines
- **harry0703/MoneyPrinterTurbo** (134K⭐) - AI tạo video ngắn HD tự động

### 🔍 RAG & Knowledge

**Top:**
- **Graphify-Labs/graphify** (133K⭐) - Codebase → knowledge graph, deterministic AST parsing
- **infiniflow/ragflow** (92K⭐) - RAG + Agent capabilities
- **mem0ai/mem0** (67K⭐) - Memory layer cho AI agents, drop-in infrastructure
- **Mintplex-Labs/anything-llm** (67K⭐) - Own your intelligence, local-first agent

**Self-hosted memory:**
- **jaylfc/taosmd** (82⭐) - Local-first AI memory chạy offline, 8GB+ RAM, zero-loss verbatim

### 🔌 Embedded AI

**RK3588 ecosystem đột phá:**

**RKNPU (NPU drivers & inference):**
- **happyme531/open_rknpu2_lm_infer** (45⭐) - Fully open-source high-perf LLM inference engine cho RK3588 NPU
- **happyme531/rknpu2_matmul_open** (8⭐) - Matrix mul & quantized LLM kernels
- **lurenJBD/rk3588-rknn-core** (2⭐) - Out-of-tree Linux mainline kernel driver: 3-core concurrency, 800MHz devfreq, 4GB+ IOMMU
- **Palmyaen/orangepi** (1⭐) - End-to-end C++ edge-AI: YOLOv5s trên 3 NPU cores, RGA+MPP hardware pipeline, RTMP streaming

**RKLLM (LLM trên NPU):**
- **Hanzo-Huang/rkllm-docker** (20⭐) - Run RKLLM trong một docker command
- **Muse-ztl/rk3588-multimodal-edge** (2⭐) - RF-DETR + Qwen2.5 multimodal inference
- **kkkzx-hx/qwen-vl-rk3588** (1⭐) - Qwen2.5-VL-3B offline deploy (NPU + W8A8)

**Orange Pi infrastructure:**
- **jaylfc/taOS** (577⭐) - Self-hosted AI agent OS chạy offline trên Orange/Raspberry Pi, Mac mini, gaming PC
- **Animan-AI/DuckBuddy** (38⭐) - Embodied AI robot duck: walk/hear/see trên Orange Pi Zero 3W
- **nouverse/nouride-releases** (21⭐) - Lightweight multi-agent daemon cho homelab, mini devices

**Tooling:**
- **YeWenxuan64/Edge_ModelDeploy** - CV model deploy: PyTorch/TF → ONNX → NPU (Rockchip/Qualcomm), INT8/INT4 quantization
- **elct9620/rknpu-device-plugin** (2⭐) - Kubernetes device plugin cho RockChip NPU
- **freed-dev-llc/terraform-provider-turingpi** (7⭐) - Terraform provider cho Turing Pi 2.5 BMC cluster

## 3. Tín hiệu xu hướng

**Agent infrastructure maturity:**
- Security audit automation (Cloudflare skill)
- Knowledge graph thay vector store (Graphify: deterministic AST)
- Persistent memory cross-session (claude-mem, taosmd)
- Context compression before LLM (headroom: 20-95% token reduction)

**Edge AI acceleration (RK3588):**
- Kernel driver chính thức cho mainline Linux (3-core NPU)
- Fully open-source LLM inference engine
- Multimodal inference (vision + LLM) trên edge
- Hardware pipeline tích hợp (RGA + MPP + NPU)

**Self-hosted AI OS:**
- Offline-first memory & agents (taOS, taosmd)
- Multi-device clustering (Orange/Raspberry Pi, mini PC, gaming PC)
- Zero-cloud by default, cloud by choice

**Agent specialization:**
- Vertical agents cho specific jobs (career-ops, ppt-master, stock analysis)
- Security-first agent skills (security-audit-skill)
- Reverse engineering agents (rea: app → binary)

## 4. Tâm điểm cộng đồng

**Graphify (+1,408⭐ trending, 133K total):**
- Codebase → queryable knowledge graph
- No vector store, deterministic AST parsing
- Skill cho Claude Code/Cursor/Codex
- Giải quyết pain point: "AI hiểu code structure thế nào?"

**ponytail (+1,948⭐):**
- Philosophy "lazy senior dev"
- Best code = code never written
- Ngược lại với trend "more agents, more complexity"

**RK3588 ecosystem:**
- Community-driven: kernel driver, inference engine, deployment tools
- Đưa multimodal AI xuống edge hardware giá rẻ (Orange Pi)
- Tín hiệu: edge AI đang shift từ research → production-ready

**Security audit skill (+2,979⭐):**
- Cloudflare open-source
- Machine-readable findings
- Multi-phase audit tự động
- Đáp ứng nhu cầu: AI agent code cần được audit trước deploy

**Agent memory persistence:**
- claude-mem (102K⭐), mem0 (67K⭐), taosmd (82⭐)
- Problem: agent quên context sau restart
- Solution: compress + inject relevant context vào future sessions

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*