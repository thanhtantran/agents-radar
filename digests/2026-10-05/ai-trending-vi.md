# Xu hướng AI Mã nguồn mở 2026-10-05

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-05 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-10-05

## 🎯 Tóm tắt hôm nay

**Agent Harness chiếm sóng**: Tooling cho AI agents đạt đỉnh. 8/15 top repos tập trung vào skills, workflows, memory cho Claude Code/Cursor/Codex. Cộng đồng đang build "operating system" cho agents thay vì chỉ viết prompts.

**NPU hardware đột phá**: RK3588/RK3576 NPU với RKLLM/RKNPU trở thành platform chính cho local AI. 10+ repos mới về quantization, inference engines, userspace drivers cho edge hardware.

**Zero-cost infrastructure**: Xu hướng self-hosted, offline-first, no API fees. Tools cho scraping (Agent-Reach), compression (headroom), local memory (claude-mem).

## 📊 Top repos theo chiều

### 🤖 **AI Agents**

**NousResearch/hermes-agent** — 251K ⭐  
Agent platform grows with user. Long-term context, learning capability.

**career-ops-hq/career-ops** — 73K ⭐  
Job search automation: scan boards, score matches, tailor resumes, prep interviews. Local CLI integration.

**zhayujie/CowAgent** — 47K ⭐  
Open-source personal AI. Plans tasks, runs tools, self-evolves. Multi-agent, lightweight, one-line install.

**HKUDS/nanobot** — 48K ⭐  
Ultra-lightweight framework. WebUI, tools, memory, MCP, multi-agent workflows. Python.

### 🔧 **AI Infrastructure**

**affaan-m/ECC** — 273K ⭐ (+top)  
Performance optimization system cho agent harness. Skills, instincts, memory, security cho Claude Code/Codex/Cursor.

**DietrichGebert/ponytail** — 154K ⭐ (+1894 hôm nay)  
Makes agents think like lazy senior dev. Best code = code never written. YAGNI philosophy.

**thedotmack/claude-mem** — 96K ⭐ (+628 hôm nay)  
Persistent context across sessions. Compresses everything agent does, injects relevant context back. Universal compatibility.

**addyosmani/agent-skills** — +336 hôm nay  
Production-grade engineering skills collection.

**michael-denyer/pstack-claude** — +232 hôm nay  
Poteto's pstack cho Claude Code/Codex/Pi. Rigorous workflows với Cursor primitives.

**garrytan/gstack** — +125 hôm nay  
Garry Tan's exact setup: 23 opinionated tools = CEO + Designer + Eng Manager + QA.

**headroomlabs-ai/headroom** — 74K ⭐  
Token compression: 20% fewer tokens cho coding agents, 60-95% cho JSON. Library, proxy, MCP server.

### 🧠 **Models & Training**

**ollama/ollama** — 182K ⭐  
Local model runtime. Kimi, GLM, MiniMax, DeepSeek, Qwen, Gemma support.

**huggingface/transformers** — 166K ⭐  
State-of-the-art models: text, vision, audio, multimodal. Inference + training.

**antirez/ds4** — +211 hôm nay  
DeepSeek 4 Flash/PRO local inference cho Metal, CUDA, ROCm.

### 📦 **AI Applications**

**hugohe3/ppt-master** — 57K ⭐  
Docs/topics → native PowerPoint. Native shapes, transitions, animations, charts, audio narration.

**CherryHQ/cherry-studio** — 52K ⭐  
Productivity studio: smart chat, autonomous agents, 300+ assistants. Unified LLM access.

**siyuan-note/siyuan** — 46K ⭐  
Self-hosted knowledge workspace. Humans + AI agents collaborate. Privacy-first.

**ZhuLinsen/daily_stock_analysis** — 65K ⭐  
LLM-powered stock analysis: multi-market data, real-time news, decision dashboard, zero-cost scheduled runs.

**OpenCut-app/OpenCut** — +512 hôm nay  
Open-source CapCut alternative.

**calesthio/OpenMontage** — +245 hôm nay  
First open-source agentic video production. 12 pipelines, 100+ tools, 700+ skills. AI assistant → full video studio.

### 🔍 **RAG & Knowledge**

**Graphify-Labs/graphify** — 123K ⭐  
Codebase → queryable knowledge graph. Local deterministic AST parsing, no vector store. Claude Code skill.

**open-webui/open-webui** — 153K ⭐  
User-friendly AI interface. Ollama, OpenAI API support.

**infiniflow/ragflow** — 91K ⭐  
Leading RAG engine fuses with Agent capabilities. Superior context layer cho LLMs.

**Shubhamsaboo/awesome-llm-apps** — 140K ⭐  
100+ AI Agents, skills, RAG apps. Free, open source.

**Mintplex-Labs/anything-llm** — 66K ⭐  
Stop renting intelligence. Own it. Local-first agent experience.

**mem0ai/mem0** — 66K ⭐  
Memory layer cho AI. Drop-in infrastructure, persistent context, production-ready.

### 🔌 **Embedded AI**

**jaylfc/taOS** — 554 ⭐  
Self-hosted AI agent OS. Memory, chat, agents, files on owned hardware. Offline by default. Auto-clustering across Orange Pi/Raspberry Pi/Mac mini/gaming PC.

**jaylfc/taosmd** — 79 ⭐  
Local-first AI memory. Runs offline on 8GB+ RAM machines. Zero-loss archive, knowledge graph, hybrid retrieval.

**gregordinary/ggml-rocket** — 21 ⭐  
Drop-in ggml backend cho Rockchip NPUs. Offloads llama.cpp/whisper.cpp prefill to RK3588 NPU.

**gregordinary/rocket-userspace** — 18 ⭐  
Userspace driver, matmul, on-NPU op library cho RK3588/RK3576 via mainline rocket DRM-accel driver.

**gregordinary/ort-rocket** — 2 ⭐  
ONNX Runtime execution provider cho RK3588 NPU. Offloads transformer vision encoders (RF-DETR, CLIP/SigLIP, SAM).

**Leon6225/InternVL3.5-4B-NPU** — 5 ⭐  
InternVL3.5-4B multimodal AI cho RK3588 NPU. Vision + language understanding.

**ambagesthickskin162/Qwen3.5-4B-NPU** — 1 ⭐  
Qwen3.5-4B deployment on NPU hardware. Efficient local inference.

**WMXJY/rkllm-openai-server** — 0 ⭐  
OpenAI-compatible RKLLM inference server. Qwen3-VL 2B/4B on RK3576/RK3588. `/v1/chat/completions` API.

**Miayyys/smolvla-rk3588** — 0 ⭐  
SmolVLA mixed-precision quantization. HAQ-inspired RL, knowledge distillation, QAT/PTQ, RKNN/RKLLM inference.

**gregordinary/tflite-rocket** — 5 ⭐  
TensorFlow Lite external delegate cho NPU-accelerated detection on RK3588.

**lona-cn/vision-simple** — 117 ⭐  
Lightweight C++ cross-platform vision inference. YOLOv10/v11/v26, PaddleOCR. ONNXRuntime/RKNPU.

## 🔥 Tín hiệu xu hướng

**1. Agent harness ecosystem mature**  
Từ prompts → skills/workflows/memory systems. ECC, ponytail, pstack patterns cho production agents.

**2. Compression = new optimization frontier**  
Headroom: token compression cho tool outputs. Giảm 20-95% tokens mà giữ nguyên quality.

**3. NPU democratization**  
RK3588 NPU from niche → mainstream cho edge AI. Mainline kernel drivers (rocket), userspace libraries, model quantization tooling mature.

**4. Zero-cost agent operations**  
Agent-Reach: scrape Twitter/Reddit/YouTube zero API fees. Self-hosted alternatives cho mọi paid service.

**5. Memory persistence across sessions**  
Claude-mem pattern: capture → compress → inject. Long-term context cho agents.

**6. Lazy senior dev philosophy spread**  
Ponytail: YAGNI, stdlib first, shortest diff. Anti-abstraction movement.

## 🌟 Tâm điểm cộng đồng

**Agent infrastructure chiến thắng vang dội**:  
- DietrichGebert/ponytail: +1894 stars/day  
- thedotmack/claude-mem: +628 stars/day  
- addyosmani/agent-skills: +336 stars/day  

**Video production agents arrive**:  
OpenMontage (+245): First agentic video system. 12 pipelines, 700+ skills. AI assistant → full studio.

**NPU inference breakthrough**:  
Gregordinary's rocket ecosystem: ggml backend, userspace driver, ONNX Runtime provider cho RK3588. Mainline kernel integration complete.

**Career automation goes mainstream**:  
career-ops-hq: 73K stars. AI job search agent: scan, score, tailor resumes, prep interviews, track applications.

**Design language cho AI agents**:  
pbakaus/impeccable (+1171): Design language makes AI harness better at design.

**Marketing skills cho agents**:  
coreyhaines31/marketingskills (+197): CRO, copywriting, SEO, analytics cho Claude Code/AI agents.

---

**Key insight**: 2026 = year agent infrastructure matures. Focus shift from "can we build agents?" → "how do we operate agents in production?". Tools, memory, compression, embedded deployment, domain skills all converge.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*