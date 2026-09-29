# Xu hướng AI Mã nguồn mở 2026-09-29

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-29 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-09-29

## 🔥 Tóm tắt hôm nay

Agent ecosystem bùng nổ. Voice cloning local, multi-agent harness, agent memory học được. Infrastructure layer trưởng thành: office harness, agent OS, memory cross-session. Edge AI tiếp tục tăng: RK3588 chạy multimodal models, NPU offload cho llama.cpp.

---

## 📊 Top repos theo chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **paperclipai/paperclip** (+3197) - Agent management app cho workplace
- **vectorize-io/hindsight** (+4561) - Agent memory học từ context
- **mvschwarz/openrig** (+734) - Multi-agent harness chạy Claude Code + Codex cùng lúc

**Top 7 ngày:**
- **NousResearch/hermes-agent** (249K ⭐) - Agent grows with you
- **shareAI-lab/learn-claude-code** (77K ⭐) - Agent harness từ scratch bằng Bash
- **career-ops-hq/career-ops** (73K ⭐) - AI job search local, scan + score + tailor CV
- **zhayujie/CowAgent** (47K ⭐) - Open-source super AI assistant, self-evolve với memory
- **bojieli/ai-agent-book** (51K ⭐) - Sách "深入理解 AI Agent" full source + code
- **HKUDS/nanobot** (48K ⭐) - Ultra-lightweight agent framework Python, WebUI + memory + MCP

### 🔧 AI Infrastructure

**Trending hôm nay:**
- **dream-num/univer** (+1099) - Office harness cho AI agents: spreadsheet, docs, slides, canvas, PDF trong 1 runtime

**Top 7 ngày:**
- **affaan-m/ECC** (269K ⭐) - Agent harness performance optimization: skills, instincts, memory, security
- **firecrawl/firecrawl** (186K ⭐) - Web data API scrape + interact at scale
- **thedotmack/claude-mem** (94K ⭐) - Persistent context cross-session cho mọi agent
- **Graphify-Labs/graphify** (122K ⭐) - Codebase → knowledge graph, không dùng vector store
- **headroomlabs-ai/headroom** (74K ⭐) - Compress tool outputs/logs/files trước khi vào LLM, -20-95% tokens
- **siyuan-note/siyuan** (46K ⭐) - Self-hosted knowledge workspace, human + AI agent collaborate

### 🧠 Models & Training

**Top 7 ngày:**
- **ollama/ollama** (181K ⭐) - Run Kimi, GLM, MiniMax, DeepSeek, Qwen, Gemma local
- **huggingface/transformers** (166K ⭐) - SOTA ML models: text, vision, audio, multimodal
- **JuliusBrussee/caveman** (108K ⭐) - Cuts 65% tokens bằng cách nói như caveman

### 📦 AI Applications

**Trending hôm nay:**
- **debpalash/VoiceStudio** (+3221) - ElevenLabs alternative local: voice clone, design, dubbing, transcription 646 languages

**Top 7 ngày:**
- **CherryHQ/cherry-studio** (52K ⭐) - AI productivity studio: chat, agents, 300+ assistants
- **ZhuLinsen/daily_stock_analysis** (65K ⭐) - LLM-driven stock analysis: multi-market, real-time news, auto notification
- **hugohe3/ppt-master** (56K ⭐) - AI tạo native PowerPoint từ docs/topics: shapes, transitions, animations, charts, audio

### 🔍 RAG & Knowledge

**Top 7 ngày:**
- **open-webui/open-webui** (153K ⭐) - User-friendly AI interface support Ollama, OpenAI API
- **langchain-ai/langchain** (147K ⭐) - Agent engineering platform
- **Shubhamsaboo/awesome-llm-apps** (140K ⭐) - 100+ AI agents, agent skills, RAG apps
- **infiniflow/ragflow** (91K ⭐) - RAG engine fused với agent capabilities
- **unclecode/crawl4ai** (84K ⭐) - Web crawler cho LLMs: website → LLM-ready Markdown
- **datawhalechina/hello-agents** (81K ⭐) - Sách "从零开始构建智能体"
- **Mintplex-Labs/anything-llm** (66K ⭐) - Own your intelligence: powerful local-first agent

### 🔌 Embedded AI

**RKLLM (RK3588 LLM):**
- **Leon6225/InternVL3.5-4B-NPU** (5 ⭐) - InternVL3.5-4B multimodal trên RK3588 NPU
- **ambagesthickskin162/Qwen3.5-4B-NPU** (1 ⭐) - Qwen3.5-4B local inference trên NPU
- **davidfeng12/MiniCPM-V-4.6-RK3588S** - MiniCPM-V 4.6 deploy với RKNN + RKLLM, C++ runtime, W8A8 quantization
- **freed-dev-llc/terraform-provider-turingpi** (7 ⭐) - Terraform provider cho Turing Pi 2.5 BMC

**RKNPU (RK3588 NPU):**
- **gregordinary/ggml-rocket** (21 ⭐) - ggml backend cho Rockchip NPU: offload llama.cpp/whisper.cpp prefill lên RK3588 NPU
- **gregordinary/rocket-userspace** (17 ⭐) - Userspace driver + matmul + op library cho RK3588 via mainline rocket DRM-accel
- **gregordinary/ort-rocket** (2 ⭐) - ONNX Runtime EP cho RK3588 NPU: offload transformer vision encoders (RF-DETR, CLIP/SigLIP, SAM, Depth Anything v2)
- **gregordinary/tflite-rocket** (4 ⭐) - TFLite delegate NPU-accelerated detection RK3588
- **lona-cn/vision-simple** (66 ⭐) - Lightweight C++ vision inference: YOLOv10/v11/v26, PaddleOCR với ONNXRuntime/RKNPU

**Orange Pi:**
- **jaylfc/taOS** (553 ⭐) - Self-hosted AI agent OS offline-first: memory, chat, agents, files stay local. Auto-cluster Orange/Raspberry Pi, Mac mini, gaming PC
- **nouverse/nouride-releases** (14 ⭐) - Multi-agent AI engine single daemon, homelab-friendly Raspberry Pi, Orange Pi, NUC

---

## 🔍 Tín hiệu xu hướng

**Agent Harness phổ biến:**
- Multi-agent collaboration (openrig, ECC)
- Agent memory persistent cross-session (hindsight, claude-mem)
- Agent OS/workspace (taOS, siyuan-note)
- Agent harness learning material (learn-claude-code, ai-agent-book)

**Local-first & Privacy:**
- Voice AI local (VoiceStudio)
- Knowledge workspace self-hosted (siyuan, anything-llm)
- Edge AI clustering homelab hardware (taOS, nouride)

**Edge AI maturity:**
- RK3588 chạy multimodal models 4B (InternVL, MiniCPM-V, Qwen)
- NPU offload cho standard frameworks (ggml, ONNX Runtime, TFLite)
- Mainline kernel support (rocket DRM-accel driver)
- Terraform + Kubernetes integration (turing-pi provider, DRA driver)

**Token efficiency:**
- Compression tools (headroom, caveman)
- Knowledge graph thay vector store (graphify)
- Output compression auto (20-95% reduction)

**Infrastructure code:**
- Codebase → knowledge graph deterministic (graphify)
- Office harness unified runtime (univer)
- Web data API scale (firecrawl)

---

## 🎯 Tâm điểm cộng đồng

**🔝 Momentum mạnh (>3K stars 1 ngày):**
1. **vectorize-io/hindsight** (+4561) - Agent memory học được từ past context
2. **debpalash/VoiceStudio** (+3221) - Local voice cloning 646 languages
3. **paperclipai/paperclip** (+3197) - Agent management workplace

**🌟 Long-term growth (>100K stars):**
- **affaan-m/ECC** (269K) - Agent harness optimization system ecosystem leader
- **langchain-ai/langchain** (147K) - Agent engineering platform standard
- **open-webui/open-webui** (153K) - User-friendly AI interface Ollama/OpenAI

**🔬 Technical innovation:**
- **Graphify-Labs/graphify** (122K) - AST parsing deterministic, không vector store
- **ggml-rocket** (21) - NPU offload cho llama.cpp/whisper.cpp mainline kernel
- **thedotmack/claude-mem** (94K) - Persistent context cross-session mọi agent

**🏠 Homelab/Edge trend:**
- RK3588 ecosystem mature: multimodal 4B models, ggml/ONNX support
- Self-hosted agent OS clustering consumer hardware
- Terraform/Kubernetes edge device management

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*