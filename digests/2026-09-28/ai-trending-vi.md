# Xu hướng AI Mã nguồn mở 2026-09-28

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-28 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 28/09/2026

## 1. Tóm tắt hôm nay

Cộng đồng AI đang chuyển từ **single-agent** sang **multi-agent orchestration**. Xuất hiện làn sóng "agent harness" - các framework quản lý nhiều AI agent cùng làm việc. Edge AI bùng nổ với Rockchip NPU driver chính thống lên mainline Linux. Local-first infrastructure phát triển mạnh: self-hosted memory, knowledge graph, offline voice assistant.

## 2. Top repos theo chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **paperclipai/paperclip** (+2,401⭐) - TypeScript agent management harness cho enterprise
- **vectorize-io/hindsight** (+4,520⭐) - Agent memory tự học
- **mvschwarz/openrig** (+114⭐) - Multi-agent harness chạy Claude Code + Codex cùng lúc

**Search 7 ngày:**
- **NousResearch/hermes-agent** (249K⭐) - Agent tự phát triển theo user
- **CherryHQ/cherry-studio** (52K⭐) - AI productivity với autonomous agents + 300 assistants
- **bojieli/ai-agent-book** (51K⭐) - Sách "深入理解 AI Agent" - thiết kế và thực hành
- **HKUDS/nanobot** (48K⭐) - Ultra-lightweight agent framework, WebUI, memory, MCP, multi-agent workflow
- **zhayujie/CowAgent** (47K⭐) - Self-evolving agent với memory và knowledge
- **siyuan-note/siyuan** (46K⭐) - Knowledge workspace cho con người + AI agent cộng tác

### 🔧 AI Infrastructure

**Trending hôm nay:**
- **vercel-labs/scriptc** (+102⭐) - TypeScript-to-Native compiler

**Search 7 ngày:**
- **affaan-m/ECC** (268K⭐) - Agent harness performance optimization cho Claude Code/Codex/Cursor
- **Significant-Gravitas/AutoGPT** (187K⭐) - Accessible AI infrastructure
- **firecrawl/firecrawl** (185K⭐) - Web data API: search, scrape, interact at scale
- **ollama/ollama** (181K⭐) - Local model runner: Kimi, GLM, DeepSeek, Qwen, Gemma
- **huggingface/transformers** (166K⭐) - State-of-the-art ML models framework
- **langgenius/dify** (157K⭐) - Agentic workflows + RAG pipelines, cloud/VPC/self-hosted
- **open-webui/open-webui** (153K⭐) - User-friendly AI interface cho Ollama/OpenAI
- **langchain-ai/langchain** (147K⭐) - Agent engineering platform
- **Hmbown/Codewhale** (41K⭐) - Open-source coding agent for terminal, Rust

### 🧠 Models & Training

Không có repo nổi bật trong trending hôm nay. Xu hướng chuyển sang inference và deployment infrastructure.

### 📦 AI Applications

**Trending hôm nay:**
- **debpalash/VoiceStudio** (+3,086⭐) - Open-source ElevenLabs alternative: voice cloning, dubbing, transcription 646 languages, fully local
- **rohitg00/ai-engineering-from-scratch** (+790⭐) - AI engineering learning path
- **dream-num/univer** (+895⭐) - Office Harness for AI Agents: Spreadsheets, Docs, Slides, Canvas trong một runtime

**Search 7 ngày:**
- **career-ops-hq/career-ops** (72K⭐) - AI job search: scan portals, evaluate listings, tailor CV, chạy local trong CLI
- **ZhuLinsen/daily_stock_analysis** (65K⭐) - LLM-driven multi-market stock analysis, real-time news, decision dashboard
- **hugohe3/ppt-master** (56K⭐) - AI tạo PowerPoint từ document/topic với native shapes, transitions, animations
- **harry0703/MoneyPrinterTurbo** (126K⭐) - AI automated workflow tạo HD short videos từ keyword

### 🔍 RAG & Knowledge

**Search 7 ngày:**
- **Shubhamsaboo/awesome-llm-apps** (139K⭐) - 100+ AI Agents + Agent Skills + RAG Apps
- **thedotmack/claude-mem** (94K⭐) - Persistent context across sessions, AI compression, inject vào future sessions
- **infiniflow/ragflow** (91K⭐) - RAG engine kết hợp Agent capabilities
- **unclecode/crawl4ai** (84K⭐) - Web crawler cho LLM: website → LLM-ready Markdown
- **datawhalechina/hello-agents** (81K⭐) - "从零开始构建智能体" - tutorial từ zero
- **headroomlabs-ai/headroom** (73K⭐) - Compress tool outputs, logs, RAG chunks trước khi vào LLM: 20-60% token reduction
- **Mintplex-Labs/anything-llm** (66K⭐) - Local-first agent experience
- **mem0ai/mem0** (66K⭐) - Memory Layer for AI Agents, production-ready
- **run-llama/llama_index** (52K⭐) - Document processing platform for AI
- **Graphify-Labs/graphify** (121K⭐) - Codebase → queryable knowledge graph: AST parsing, deterministic, no vector store

### 🔌 Embedded AI

**Trending hôm nay:**
- **InfinityLoop1308/PipePipe** (+242⭐) - Open-source Android app browse YouTube freely
- **willfaust/Madeira** (+83⭐) - Run x86-64 Windows games trên jailed iOS via FEX-Emu + Wine + DXMT

**Search: rknpu (Rockchip NPU)**
- **jaylfc/taOS** (553⭐) - **BREAKTHROUGH**: Self-hosted AI agent OS offline, clustering across Pi/Mac/PC, Orange Pi support
- **lona-cn/vision-simple** (58⭐) - C++ vision inference: YOLOv10/11/26, PaddleOCR trên RKNPU
- **gregordinary/ggml-rocket** (21⭐) - **CRITICAL**: ggml backend cho Rockchip NPU, offload llama.cpp/whisper.cpp prefill lên RK3588 NPU
- **gregordinary/rocket-userspace** (17⭐) - Userspace driver cho mainline rocket DRM-accel driver
- **gregordinary/tflite-rocket** (4⭐) - TensorFlow Lite delegate cho NPU-accelerated detection
- **gregordinary/ort-rocket** (2⭐) - ONNX Runtime EP cho Rockchip NPU: offload vision transformers (RF-DETR, CLIP, SAM)

**Search: rkllm (Rockchip LLM)**
- **darkautism/rkllm-rs** (13⭐) - rkllm Rust FFI binding
- **Leon6225/InternVL3.5-4B-NPU** (5⭐) - InternVL3.5-4B multimodal cho RK3588 NPU
- **ambagesthickskin162/Qwen3.5-4B-NPU** (1⭐) - Qwen3.5-4B deploy trên NPU hardware

**Search: orangepi**
- **MichaIng/DietPi** (6,312⭐) - Lightweight OS cho SBC
- **jaylfc/taosmd** (79⭐) - Local-first AI memory chạy offline trên 8GB+ RAM (SBC, mini PC)
- **nouverse/nouride-releases** (14⭐) - Lightweight multi-agent engine cho Pi/Orange Pi/NUC
- **JasonYANG170/tspi-AIBox** (2⭐) - 泰山派 RK3566 offline voice assistant: RKNPU speech recognition, local Qwen3

## 3. Phân tích tín hiệu xu hướng

### 🔥 Multi-Agent Orchestration thống trị
Không còn single agent. Cộng đồng build "agent harness" để:
- Chạy nhiều agent parallel (Claude Code + Codex cùng lúc)
- Quản lý agent memory cross-session
- Performance optimization cho agent workflows

### 🏠 Local-First Infrastructure bùng nổ
Phản ứng ngược lại cloud dependency:
- Self-hosted memory systems (taOSmd, claude-mem)
- Offline voice assistants hoàn toàn
- Agent OS chạy trên hardware consumer sở hữu
- Knowledge graph local, không vector store

### ⚡ Rockchip NPU lên mainline Linux
**Game-changer cho edge AI:**
- `rocket` DRM-accel driver vào mainline kernel
- Userspace driver stack hoàn chỉnh
- GGML backend → llama.cpp/whisper.cpp offload lên NPU
- ONNX Runtime EP cho vision transformers
- RK3588 NPU đủ mạnh chạy multimodal 4B models

### 🧠 Knowledge Graph thay thế Vector Store
Graphify-Labs trending mạnh: codebase → queryable graph, deterministic AST parsing. Cộng đồng chán vector embeddings, muốn explainable structure.

### 🎤 Voice AI fully local
VoiceStudio (+3K⭐) đánh chiếm segment ElevenLabs: 646 languages, voice cloning, dubbing. Edge device đủ mạnh chạy voice workload offline (RK3566 đã chạy được).

### 📊 Context Compression warfare
Token cost đẩy focus vào compression:
- headroom: 20-60% token reduction
- RAG chunk compression trước khi vào LLM
- Tool output compression

## 4. Tâm điểm cộng đồng

### 🥇 vectorize-io/hindsight (+4,520⭐)
Agent memory tự học. Cộng đồng đang giải bài toán: agent không nhớ cross-session. Hindsight breakthrough trong space này.

### 🥈 debpalash/VoiceStudio (+3,086⭐)
Open-source ElevenLabs alternative đủ feature, chạy local. Timing hoàn hảo khi edge device NPU đủ mạnh.

### 🥉 paperclipai/paperclip (+2,401⭐)
Enterprise agent management. Doanh nghiệp bắt đầu deploy nhiều agent, cần orchestration layer.

### 🎯 gregordinary ecosystem
Một developer build toàn bộ stack Rockchip NPU mainline:
- Kernel driver notes
- Userspace driver
- GGML backend
- ONNX Runtime EP
- TFLite delegate

Đây là infrastructure foundation cho embedded AI explosion tiếp theo.

### 💎 jaylfc/taOS + taosmd
Vision dài hạn: AI agent OS tự cluster across hardware consumer đã có. Offline-first, cloud optional. Điểm đột phá: không ép người dùng mua hardware mới, leverage Pi/Mac/PC hiện có.

---

**Kết luận:** Tháng 9/2026 đánh dấu chuyển từ "chạy một AI agent trên cloud" sang "orchestrate nhiều agent local trên hardware tự sở hữu." Rockchip NPU mainline là catalyst cho embedded AI bùng nổ. Cộng đồng đang build infrastructure cho future: multi-agent, local-first, explainable.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*