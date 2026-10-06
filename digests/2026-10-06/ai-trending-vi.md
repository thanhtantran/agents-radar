# Xu hướng AI Mã nguồn mở 2026-10-06

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-06 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở ngày 2026-10-06

## 1. Tóm tắt hôm nay

**Agent infrastructure bùng nổ**: 7/13 repo trending focus agent frameworks, memory systems, specialized agents. Community shift from monolithic AI apps to composable agent ecosystems.

**Edge AI maturity**: RKLLM/RKNPU repos show serious production deployment on $2-50 hardware. Quantization (W8A8, QAT), multi-model NPU scheduling, mainstream LLM (Qwen, DeepSeek) on SBC.

**Context compression wave**: Multiple repos tackle token efficiency (claude-mem, headroom). Agent sessions now persist, compress, inject context—memory no longer ephemeral.

**Specialized vertical agents**: CAD generation, video production, gym tracking, job search. Pattern: narrow domain + agent orchestration + self-hosted.

## 2. Top repos theo chiều

### 🤖 AI Agents

**thedotmack/claude-mem** (+534 ⭐)
- Persistent cross-session context for agents
- Captures actions, AI-compresses, injects relevant memory into future runs
- Works: Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode

**Panniantong/Agent-Reach** (+1155 ⭐)
- Internet vision for agents: read/search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- One CLI, zero API fees, self-hosted

**msitarzewski/agency-agents** (+744 ⭐)
- Complete AI agency: specialized agents (frontend, Reddit ninjas, reality checkers)
- Each: personality + processes + deliverables

**calesthio/OpenMontage** (+742 ⭐)
- First open-source agentic video production system
- 12 production pipelines, 100+ tools, 700+ agent skills
- Turns coding assistant into full video studio

**career-ops-hq/career-ops** (+73,574 ⭐ trong 7 ngày)
- AI job search agent: scan boards, score 1-5 vs CV, tailor resume/cover letter
- Interview prep, application tracker
- Runs local in AI coding CLI

### 🔧 AI Infrastructure

**affaan-m/ECC** (+273,681 ⭐ trong 7 ngày)
- Agent harness performance optimization
- Skills, instincts, memory, security
- For Claude Code, Codex, Opencode, Cursor

**NousResearch/hermes-agent** (+251,459 ⭐ trong 7 ngày)
- Agent that grows with you
- Continuous learning, adaptation

**cloudflare/cloudflare-os** (+101 ⭐)
- Agent workspace on Cloudflare Workers
- Create docs, build apps, run agents with company context

**headroomlabs-ai/headroom** (+74,459 ⭐ trong 7 ngày)
- Compress tool outputs, logs, files, RAG chunks before LLM
- 20% fewer tokens (coding agents), 60-95% (JSON)
- Library, proxy, MCP server

### 🧠 Models & Training

**ollama/ollama** (+182,269 ⭐ trong 7 ngày)
- Run Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma
- Local model inference

**huggingface/transformers** (+166,984 ⭐ trong 7 ngày)
- State-of-the-art models: text, vision, audio, multimodal
- Inference + training

### 📦 AI Applications

**tester-army/e2e** (+1398 ⭐)
- Next-gen e2e testing framework
- Web + mobile apps

**earthtojake/text-to-cad** (+437 ⭐)
- CAD superpowers for agents
- Text → CAD models

**DuarteSantos8/openGym** (+1433 ⭐)
- Self-hosted gym tracker: plan routines, log workouts (supersets, warm-ups, cardio)
- Muscle trained/fatigued/detrained tracking
- Import FitNotes/Strong/Hevy, passkey login

**hugohe3/ppt-master** (+57,747 ⭐ trong 7 ngày)
- AI: docs/topics → PowerPoint
- Native shapes, transitions, animations, data-backed charts, audio narration
- Custom .pptx templates

**ZhuLinsen/daily_stock_analysis** (+65,927 ⭐ trong 7 ngày)
- LLM-driven multi-market stock analysis
- Multi-source market data, real-time news, decision dashboard, auto notifications
- Zero-cost scheduled runs

### 🔍 RAG & Knowledge

**thedotmack/claude-mem** (đã list ở Agents—hybrid)

**infiniflow/ragflow** (+91,704 ⭐ trong 7 ngày)
- RAG engine + Agent capabilities
- Context layer for LLMs

**unclecode/crawl4ai** (+84,798 ⭐ trong 7 ngày)
- Web crawler/scraper for LLMs/AI agents
- Website → clean LLM-ready Markdown
- Self-host or Crawl4AI Cloud

**mem0ai/mem0** (+66,627 ⭐ trong 7 ngày)
- Memory layer for AI agents/apps
- Persistent context, production-ready

**jaylfc/taosmd** (+79 ⭐)
- Local-first AI memory: offline on 8GB+ RAM (SBC, mini PC, laptop, workstation)
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval
- Framework-agnostic, no cloud

### 🔌 Embedded AI

**boykopovar/AnyPS5** (+997 ⭐)
- Auto PS5 executables porting to Linux/Windows
- (C++ tool)

**M-Abozaid/esp32-c3-adblock** (+196 ⭐)
- Pi-hole DNS ad-blocker on $2 ESP32-C3
- 537k domains as 40-bit FNV-1a hashes in flash, binary-searched
- UDP DNS sinkhole + web dashboard

**Leon6225/InternVL3.5-4B-NPU** (+5 ⭐)
- InternVL3.5-4B multimodal AI on RK3588 NPU
- Vision + language understanding

**Miayyys/smolvla-rk3588** (mới)
- SmolVLA mixed-precision quantization on RK3588
- HAQ RL, knowledge distillation, QAT/PTQ, RKNN/RKLLM inference

**chenchengchen13/rk3588-llm-npu** (mới)
- LLM (DeepSeek-R1-Distill, Qwen2.5) on RK3588 NPU
- W8A8 quantization, NPU vs CPU benchmark, rkllm-runtime version troubleshooting

**gregordinary/ggml-rocket** (+21 ⭐)
- ggml backend for Rockchip NPUs
- Offloads llama.cpp/whisper.cpp prefill to RK3588 NPU

**gregordinary/rocket-userspace** (+18 ⭐)
- Userspace driver, matmul, on-NPU op library for RK3588/RK3576
- Via mainline rocket DRM-accel driver

**jaylfc/taOS** (+554 ⭐)
- Self-hosted AI agent OS: memory, chat, agents, files on owned hardware
- Offline by default, cloud by choice
- Offline AI memory (taOSmd), multi-framework group chat, web desktop + app store
- Auto-clustering: Orange/Raspberry Pi, Mac mini, gaming PC

**ryan4yin/nixos-rk3588** (+171 ⭐)
- Minimal NixOS on RK3588/RK3588s SBC (Orange Pi 5 Plus, Orange Pi 5, Rock 5A)

**lona-cn/vision-simple** (+127 ⭐)
- Lightweight C++ cross-platform vision inference library
- YOLOv10/v11/v26, PaddleOCR
- ONNXRuntime/RKNPU

## 3. Phân tích tín hiệu xu hướng

**Agent memory persistence**: claude-mem, mem0, taosmd—session memory no longer resets. AI context now compresses, archives, retrieves across sessions. Shift from stateless to stateful agents.

**Agent harness optimization**: ECC, ponytail—meta-tools for agent performance. Skills, instincts, security as modular layers. Research-first dev culture emerging.

**Specialized agents replace general chatbots**: CAD, video production, job search, stock analysis, gym tracking—agents now domain experts. Pattern: narrow vertical + agentic orchestration + self-hosted data control.

**Edge AI maturity**: RK3588 NPU serious production use (W8A8 quantization, DeepSeek/Qwen). SmolVLA mixed-precision, ggml-rocket prefill offload, mainline kernel drivers (rocket-userspace). $2-50 hardware running frontier models.

**Context compression arms race**: headroom (20-95% fewer tokens), claude-mem (AI-compressed session history). Token efficiency now performance bottleneck, not model size.

**Self-hosted agent OS**: taOS, cloudflare-os—multi-agent environments with local memory, clustering, app stores. Shift from cloud SaaS to owned infrastructure.

**Frontend + backend agents**: career-ops, agency-agents—full AI teams (frontend wizards, Reddit ninjas, reality checkers). Specialized roles over general-purpose.

**Embedded ad-blocking**: esp32-c3-adblock (537k domains on $2 hardware)—edge inference patterns (FNV-1a hashing, binary search) applied to network filtering.

## 4. Tâm điểm cộng đồng

**Top momentum**: affaan-m/ECC (+273k ⭐), NousResearch/hermes-agent (+251k ⭐), firecrawl/firecrawl (+188k ⭐)—agent infrastructure arms race.

**Agent memory**: thedotmack/claude-mem (+96k ⭐ trong 7 ngày, +534 hôm nay)—persistent context viral growth. Community wants stateful agents.

**Compression infrastructure**: headroomlabs-ai/headroom (+74k ⭐ trong 7 ngày)—token efficiency critical path.

**Vertical agent apps**: career-ops (+73k ⭐), ppt-master (+57k ⭐), daily_stock_analysis (+65k ⭐)—specialized agents outperform general chatbots.

**Edge AI production**: RK3588 repos (InternVL3.5-4B-NPU, smolvla-rk3588, rk3588-llm-npu, ggml-rocket)—$50 SBC running DeepSeek/Qwen with NPU acceleration. Community pushing edge deployment boundaries.

**Self-hosted agent OS**: jaylfc/taOS (+554 ⭐)—offline-first, owned hardware, auto-clustering. Privacy + control trend.

**Open video production**: calesthio/OpenMontage (+742 ⭐)—12 pipelines, 100+ tools, 700+ skills. Agent orchestration for creative work.

**Developer tools**: tester-army/e2e (+1398 ⭐)—next-gen e2e testing. AI-assisted QA.

**Fitness tracking**: DuarteSantos8/openGym (+1433 ⭐)—self-hosted, muscle fatigue tracking, passkey login. Privacy-first vertical app.

**Job search automation**: career-ops-hq/career-ops (+73k ⭐)—ATS-friendly resume tailoring, interview prep, application tracking. Runs local in AI CLI.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*