# Xu hướng AI Mã nguồn mở 2026-10-21

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-21 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 21/10/2026

## Tóm tắt hôm nay

AI agent đang chiếm ưu thế tuyệt đối. Coding agent vẫn dẫn đầu nhưng vertical agent (job search, security audit, stock analysis) tăng trưởng mạnh. Edge AI trên hardware giá rẻ (RK3588, Orange Pi) bùng nổ - LLM và multimodal inference local đang dân chủ hoá. RAG + memory infrastructure xuất hiện như layer bắt buộc cho production agents.

---

## Top repos theo chiều

### 🤖 AI Agents

**Trending cao:**
- **ai-job-search** (+3861 ⭐) - Job search agent chạy local trên Claude Code, tự động evaluate JD, tailor CV, viết cover letter
- **career-ops** (75.9K ⭐) - Job application agent với scoring, ATS optimization, multi-CLI support  
- **hermes-agent** (255.6K ⭐) - Agent "lớn cùng user", framework mở rộng liên tục
- **Agent-Reach** (100.3K ⭐) - Cho agent "mắt" để đọc Twitter, Reddit, YouTube, GitHub
- **CowAgent** (47.5K ⭐) - Personal assistant với planning, tool execution, self-evolution

**Infrastructure & harness:**
- **orca** (+1565 ⭐) - Fleet management cho nhiều agent (Grok, Claude Code), desktop + mobile + remote
- **ruflo** (+684 ⭐) - Multi-player agent swarms, adaptive memory, federation
- **opencode** (+1240 ⭐) - Coding agent mã nguồn mở
- **Codewhale** (41.1K ⭐) - Rust agent engine với provider choice, approvals, receipts

**Vertical agents:**
- **security-audit-skill** (+1712 ⭐) - Multi-phase security audit với machine-readable findings
- **daily_stock_analysis** (66.8K ⭐) - Multi-market stock analysis với LLM, real-time news, auto notification
- **ppt-master** (64.5K ⭐) - Document → native PowerPoint với shapes, animations, charts, audio narration

**Agent ecosystems:**
- **agency-agents** (+562 ⭐) - Complete AI agency: frontend wizards → Reddit ninjas → reality checkers
- **nanobot** (49.2K ⭐) - Ultra-lightweight agent framework với WebUI, tools, memory, MCP, multi-agent
- **agents** (+93 ⭐) - Multi-harness plugin marketplace cho Claude Code, Codex, Cursor, Copilot
- **agentic-awesome-skills** (+83 ⭐) - Agent-first control plane với 2,600+ skills, catalog, CLI, MCP

### 🔧 AI Infrastructure

**Productivity & tooling:**
- **ponytail** (+1208 ⭐) - Agent prompt khiến AI "nghĩ như senior dev lười nhất" - code ít hơn, tốt hơn
- **cherry-studio** (52.8K ⭐) - AI productivity studio với smart chat, agents, 300+ assistants
- **siyuan** (46.9K ⭐) - Privacy-first knowledge workspace cho human + AI collaboration

**Memory & context:**
- **claude-mem** (102K ⭐) - Persistent context across sessions cho mọi agent, AI-compressed
- **mem0** (67.5K ⭐) - Memory layer cho AI agents, production-ready
- **taosmd** (82 ⭐) - Local-first AI memory chạy offline trên 8GB+ RAM, verbatim archive + knowledge graph

**Performance optimization:**
- **headroom** (+549 ⭐, 76.8K total) - Compress tool output/logs/RAG trước khi vào LLM: -20% tokens coding, -60-95% JSON
- **ECC** (284.9K ⭐) - Agent harness performance optimization: skills, instincts, memory, security

**Knowledge & search:**
- **graphify** (+802 ⭐) - Codebase → queryable knowledge graph, deterministic AST parsing, no vector store
- **Crawl4AI** (85.9K ⭐) - Web crawler for LLMs: website → clean Markdown, self-host or cloud
- **knowledge-work-plugins** (+267 ⭐) - Anthropic official plugins cho Claude Cowork

### 🧠 Models & Training

- **Kronos** (+733 ⭐) - Foundation model cho financial markets language
- **vllm** (+128 ⭐) - High-throughput inference engine cho LLMs

### 📦 AI Applications

- **ComfyUI** (+1206 ⭐) - Powerful modular diffusion model GUI với graph/nodes interface, fastest local inference
- **rea** (348.5K ⭐) - Reverse engineer anything với agents: app behavior → native binaries

### 🔍 RAG & Knowledge

**RAG engines:**
- **RAGFlow** (92.6K ⭐) - Leading open-source RAG engine với Agent capabilities
- **serviette** (58.8K ⭐) - No-code RAG server sync với documents, 8 vector DBs
- **llama_index** (52.6K ⭐) - Document processing platform for AI
- **milvus** (46.5K ⭐) - High-performance cloud-native vector DB

**Data ingestion:**
- **firecrawl** (193.5K ⭐) - Supercharge agents với web data + beyond
- **awesome-llm-apps** (142.4K ⭐) - 100+ AI agents, skills, RAG apps

**Deployment:**
- **anything-llm** (67.4K ⭐) - Local-first agent experience, stop renting intelligence
- **open-webui** (156.3K ⭐) - User-friendly AI interface (Ollama, OpenAI API)
- **dify** (159.1K ⭐) - Agentic workflows + RAG pipelines, cloud/VPC/self-hosted

### 🔌 Embedded AI

**RK3588 ecosystem đang bùng nổ:**

**OS & memory:**
- **taOS** (577 ⭐) - Self-hosted agent OS chạy trên hardware user sở hữu: offline memory, multi-framework chat, web desktop, auto-clustering Raspberry Pi/Orange Pi/Mac mini/gaming PC
- **nouride-releases** (19 ⭐) - Lightweight multi-agent engine daemon cho homelab: Raspberry Pi, Orange Pi, NUC, LXC

**NPU inference:**
- **open_rknpu2_lm_infer** (22 ⭐) - Open-source high-performance LLM inference engine cho RK3588 NPU
- **rknpu2_matmul_open** (5 ⭐) - Matrix multiplication + quantized LLM kernels cho RK3588 RKNPU2
- **rktop** (10 ⭐) - Real-time monitoring RK3588 CPU/NPU/GPU/RGA performance

**RKLLM deployment:**
- **rkllm-docker** (20 ⭐) - Run RKLLM với một docker command, pre-converted models
- **rk3588-multimodal-edge** (1 ⭐) - RF-DETR split inference (NPU backbone + CPU head) + Qwen2.5 RKLLM
- **qwen-vl-rk3588** (1 ⭐) - Qwen2.5-VL-3B offline deployment RK3588 (NPU + W8A8)
- **vlm-rknn** (1 ⭐) - Vision-language models trên Rockchip via RKNN/RKLLM
- **edge-llm-policy-execution-engine** (0 ⭐) - RK3588S edge verifiable control agent (RKLLM + rules + schema)

**Embodied AI:**
- **DuckBuddy** (14 ⭐) - Open-source embodied AI robot duck chạy trên Orange Pi Zero 3W: walks, hears, sees, autonomous life

**Infrastructure:**
- **DietPi** (6.3K ⭐) - Lightweight OS cho single-board computers
- **RaspAP** (5.2K ⭐) - Full-featured wireless router setup cho Debian-based devices
- **astra_lite** (54 ⭐) - Deepsky astrophotography + live stacking trên low-power PCs (Raspberry/Orange Pi)

**Clustering & orchestration:**
- **terraform-provider-turingpi** (7 ⭐) - Terraform provider cho Turing Pi 2.5 BMC cluster deployment
- **terraform-turingpi-modules** (2 ⭐) - Terraform modules cho Turing Pi clusters

---

## Phân tích tín hiệu xu hướng

**1. Vertical agent explosion**
Job search, security audit, stock analysis, PowerPoint generation - agents đang chuyên biệt hoá mạnh. Pattern: domain-specific workflows + LLM reasoning + human-in-the-loop approval.

**2. Agent harness wars**
Claude Code, Codex, Cursor, Copilot - tools đang bành trướng. Orca, ruflo, ECC, opencode xuất hiện để manage fleet, optimize performance, unify experience. Multi-harness compatibility là standard mới.

**3. Memory = differentiator**
claude-mem, mem0, taosmd - persistent context across sessions là bài toán chính. Approaches: AI compression (claude-mem), knowledge graph (taosmd), production infrastructure (mem0).

**4. Edge AI dân chủ hoá**
RK3588 + RKLLM cho phép chạy LLM/VLM local giá rẻ. Orange Pi/Raspberry Pi clusters với agent OS (taOS) + lightweight daemons (nouride) đang tạo alternative cho cloud. Embodied AI (DuckBuddy) chạy full stack trên $50 hardware.

**5. "Code ít hơn" philosophy**
ponytail (+1208 stars) capture zeitgeist: senior dev lười = dev hiệu quả. YAGNI, stdlib first, deletion over addition. Agents đang học pattern này.

**6. RAG infrastructure maturity**
Vector DBs (milvus), RAG engines (RAGFlow), compression (headroom), knowledge graphs (graphify) - stack đầy đủ cho production. No-code options (serviette) xuất hiện.

**7. Open-source model landscape**
ollama support Kimi, GLM, MiniMax, DeepSeek, Qwen - Chinese models đang mainstream. Transformers (167.9K stars) vững vàng training framework. Financial domain model (Kronos) xuất hiện.

---

## Tâm điểm cộng đồng

**Momentum lớn:**
- **ai-job-search** (+3861 trong ngày) - Đánh trúng pain point: job search automation local, zero API fees
- **rea** (348.5K total) - Reverse engineering với agents - use case độc đáo
- **ECC** (284.9K) - Agent performance optimization standard
- **hermes-agent** (255.6K) - "Agent lớn cùng bạn" viral marketing + actual utility

**Newcomers quan trọng:**
- **security-audit-skill** (+1712) - Cloudflare official, machine-readable findings
- **orca** (+1565) - Multi-agent fleet management desktop+mobile
- **opencode** (+1240) - Open-source coding agent competition
- **ponytail** (+1208) - Lazy senior dev meme → actual prompt engineering

**Edge AI cluster:**
- taOS (577 ⭐ mới) + nouride (19 ⭐) + open_rknpu2 (22 ⭐) + rkllm-docker (20 ⭐) - ecosystem đang hình thành cho homelab AI.

**Vertical agents hot:**
- career-ops (75.9K), ppt-master (64.5K), daily_stock_analysis (66.8K) - multi-month stable growth, đạt product-market fit.

**Infrastructure bền vững:**
- AutoGPT (187.7K), ollama (184.1K), transformers (167.9K), dify (159.1K), open-webui (156.3K) - top 5 LLM infrastructure ổn định, community lớn.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*