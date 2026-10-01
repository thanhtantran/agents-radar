# Xu hướng AI Mã nguồn mở 2026-10-01

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-01 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 01/10/2026

## 📊 Tóm tắt hôm nay

Sóng lớn: AI agent frameworks chiếm spotlight, NVIDIA thả OpenShell (runtime cho autonomous agents). Voice AI và video gen bùng nổ (VoiceStudio 3.4K ⭐, HyperFrames làm video từ HTML). Edge AI/NPU đang hot - nhiều repo deploy LLM xuống RK3588/RK3576. Context optimization cho coding agents nổi lên (context-mode, codegraph, PageIndex). Multi-agent orchestration thành chủ đề chính.

---

## 🗂️ Top repos theo chiều

### 🤖 AI Agents

**Trending hôm nay:**
- **NVIDIA/OpenShell** (+1.3K, Rust) - Runtime an toàn cho autonomous agents. NVIDIA chính thức nhảy vào agent infra
- **mvschwarz/openrig** (+624, TypeScript) - Chạy Claude Code + Codex như một hệ thống. Multi-agent harness
- **debpalash/VoiceStudio** (+3.5K, Python) - Voice cloning, dubbing, transcription cho 646 ngôn ngữ. Local alternative cho ElevenLabs
- **DietrichGebert/ponytail** (+743, JS) - Agent viết code như "lazy senior dev". Tư duy "code best là code never written"
- **openclaw/openclaw** (+136, TypeScript) - AI làm việc trên mọi OS/platform

**Search 7 ngày:**
- **NousResearch/hermes-agent** (250K ⭐) - "The agent that grows with you"
- **shareAI-lab/learn-claude-code** (77K ⭐) - Xây agent harness từ 0 với bash
- **career-ops-hq/career-ops** (73K ⭐) - Agent tìm việc: scan job, đánh giá, tailor CV
- **affaan-m/ECC** (270K ⭐) - Optimization system cho agent harness. Skills, memory, security
- **thedotmack/claude-mem** (95K ⭐) - Context bền vững qua sessions cho mọi agent

### 🔧 AI Infrastructure

**Trending:**
- **mksglu/context-mode** (+90, TypeScript) - Context window optimization: sandbox tool output (98% giảm), session memory, routing 17 platforms qua MCP
- **ComposioHQ/awesome-claude-skills** (+123, Python) - Curated list Claude Skills
- **mattpocock/skills** (+876, Shell) - Skills từ thư mục .agents của dev thật
- **modelcontextprotocol/servers** (+50, TypeScript) - MCP Servers chính thức

**Search:**
- **langchain-ai/langchain** (147K ⭐) - Agent engineering platform
- **Graphify-Labs/graphify** (122K ⭐) - Codebase thành knowledge graph có thể query. Skill cho Claude Code/Cursor
- **colbymchenry/codegraph** (+118, C) - Pre-indexed code knowledge graph, auto sync. Ít tokens, ít tool calls, 100% local
- **headroomlabs-ai/headroom** (74K ⭐) - Nén tool outputs/logs/RAG chunks. 20% ít tokens hơn cho coding agents
- **JuliusBrussee/caveman** (108K ⭐) - Skill + proxy cắt 65% tokens bằng cách nói kiểu caveman

### 🧠 Models & Training

**Search:**
- **huggingface/transformers** (166K ⭐) - Framework cho SOTA models
- **ollama/ollama** (181K ⭐) - Chạy Kimi, GLM, MiniMax, DeepSeek, Qwen, Gemma local

### 📦 AI Applications

**Trending:**
- **harry0703/MoneyPrinterTurbo** (+431, Python) - Gen video ngắn HD từ keyword. AI workflow automation
- **heygen-com/hyperframes** (+349, TypeScript) - Viết HTML, render video. Làm cho agents
- **byoungd/up** (+743, JS) - Guide học AI và tiếng Anh
- **t8y2/dbx** (+1.1K, Rust) - DB client 25MB cho 100+ databases. Built-in AI, MCP Server, CLI

**Search:**
- **CherryHQ/cherry-studio** (52K ⭐) - Studio AI với smart chat, autonomous agents, 300+ assistants
- **hugohe3/ppt-master** (57K ⭐) - Docs → PowerPoint với native shapes, transitions, animations, charts
- **ZhuLinsen/daily_stock_analysis** (65K ⭐) - Hệ thống phân tích chứng khoán đa thị trường driven bởi LLM

### 🔍 RAG & Knowledge

**Trending:**
- **VectifyAI/PageIndex** (+1.1K, Python) - Document index cho vectorless, reasoning-based RAG

**Search:**
- **open-webui/open-webui** (153K ⭐) - UI AI thân thiện (supports Ollama, OpenAI)
- **Shubhamsaboo/awesome-llm-apps** (140K ⭐) - 100+ AI Agents, Skills, RAG Apps
- **infiniflow/ragflow** (91K ⭐) - Open-source RAG engine + Agent capabilities
- **unclecode/crawl4ai** (84K ⭐) - Web crawler cho LLMs: website → clean Markdown
- **Mintplex-Labs/anything-llm** (66K ⭐) - Local-first agent experience. Own your intelligence

### 🔌 Embedded AI (NPU/Edge)

**Search rkllm:**
- **Leon6225/InternVL3.5-4B-NPU** (5 ⭐) - InternVL3.5-4B cho RK3588 NPU. Multimodal AI
- **ambagesthickskin162/Qwen3.5-4B-NPU** (1 ⭐) - Deploy Qwen3.5-4B trên NPU hardware
- **WMXJY/rkllm-openai-server** (0 ⭐) - RKLLM inference server tương thích OpenAI. Deploy Qwen3-VL 2B/4B trên RK3576/RK3588
- **chenchengchen13/rk3588-llm-npu** (0 ⭐) - Deploy LLM (DeepSeek-R1-Distill, Qwen2.5) trên RK3588 NPU. W8A8 quantization, benchmark NPU vs CPU
- **freed-dev-llc/terraform-provider-turingpi** (7 ⭐) - Terraform provider cho Turing Pi 2.5 BMC

**Search rknpu:**
- **jaylfc/taOS** (554 ⭐) - Self-hosted AI agent OS. Memory, chat, agents trên hardware bạn sở hữu. Offline by default, cloud by choice. Auto-clustering qua Orange/Raspberry Pi, Mac mini, gaming PC
- **lona-cn/vision-simple** (85 ⭐) - Lightweight C++ vision inference: YOLOv10/v11/v26, PaddleOCR. ONNXRuntime/RKNPU
- **gregordinary/ggml-rocket** (21 ⭐) - ggml backend cho Rockchip NPUs. Offload llama.cpp/whisper.cpp prefill tới RK3588 NPU
- **gregordinary/ort-rocket** (2 ⭐) - ONNX Runtime EP cho Rockchip NPUs qua mainline rocket driver. Offload vision encoders (DETR, CLIP, SAM, Depth Anything v2) tới NPU
- **JasonYANG170/tspi-AIBox** (2 ⭐) - Taishan Pi RK3566 offline voice assistant. RKNPU speech recognition, local Qwen3

**Search orangepi:**
- **jaylfc/taosmd** (79 ⭐) - Local-first AI memory chạy offline trên máy 8GB+ RAM (SBC, mini PC). Zero-loss archive, knowledge graph, hybrid retrieval
- **nouverse/nouride-releases** (14 ⭐) - Lightweight multi-agent AI engine trong single daemon. Cho homelab và mini devices (Raspberry Pi, Orange Pi, NUC)

---

## 🔥 Phân tích tín hiệu xu hướng

**1. Agent orchestration frameworks bùng nổ**
- OpenShell (NVIDIA), openrig (multi-agent harness), career-ops (job search agent)
- Pattern: multi-agent systems thay thế single-agent approaches
- Meta-frameworks quản lý nhiều coding agents (Claude Code, Codex, Cursor) cùng lúc

**2. Context optimization thành priority**
- context-mode: 98% giảm tool output
- caveman: cắt 65% tokens bằng terse language
- headroom: nén logs/RAG chunks
- codegraph: pre-indexed knowledge graph thay vector store
→ Token cost là bottleneck, giải pháp nén/tối ưu đang đua nhau

**3. Local-first AI infrastructure**
- taOS: agent OS chạy trên hardware riêng, offline by default
- taosmd: AI memory 100% local
- OpenCode, AnythingLLM: own your intelligence
→ Phản ứng với privacy concerns, cloud costs

**4. Edge AI/NPU acceleration mature**
- RK3588/RK3576 trở thành platform chính cho edge LLM
- Toolchain đầy đủ: RKLLM (runtime), ggml-rocket (backend), ort-rocket (ONNX), vision-simple (inference)
- Quantization (W8A8), benchmark NPU vs CPU
- Ứng dụng thực tế: voice assistants, vision models trên SBC

**5. Voice & video generation democratized**
- VoiceStudio: local voice cloning cho 646 ngôn ngữ
- HyperFrames: HTML → video cho agents
- MoneyPrinterTurbo: keyword → HD video
→ Multimodal gen đang commoditized

**6. RAG evolution: vectorless approaches**
- PageIndex: reasoning-based RAG không cần vector DB
- Graphify: knowledge graph thay vector embeddings
→ Shift từ semantic similarity sang structured reasoning

**7. Agent skills ecosystem**
- Repos sharing actual skills từ production (.agents directories)
- MCP (Model Context Protocol) standardization
- Skills cho specific tasks: job search, stock analysis, code graphing

**8. Infrastructure as code cho edge clusters**
- Terraform providers cho Turing Pi
- Auto-clustering Orange Pi/Raspberry Pi
→ Treat SBC clusters like cloud infra

---

## 💡 Tâm điểm cộng đồng

**Viral repos:**
1. **affaan-m/ECC** (270K ⭐) - Agent harness optimization system. Community đang chuẩn hóa agent performance practices
2. **NousResearch/hermes-agent** (250K ⭐) - "Agent that grows with you". Viral vì long-term learning narrative
3. **firecrawl** (187K ⭐) - Web scraper cho AI. Solve data acquisition pain point

**Newly trending:**
- **VoiceStudio** (+3.5K today) - Catch wave của voice AI, vị trí "local ElevenLabs"
- **OpenShell** (+1.3K today) - NVIDIA brand weight + autonomous agents hype
- **dbx** (+1.1K today) - Lightweight DB client với AI built-in. Solve fragmentation 100+ DB types
- **PageIndex** (+1.1K today) - Timing tốt với RAG fatigue, vectorless approach fresh

**Thematic interest:**
- **Agent memory/context persistence** - claude-mem, taosmd, context-mode cùng solve problem
- **Coding agent optimization** - Caveman, ponytail, codegraph, headroom tackle token efficiency
- **Edge LLM deployment** - RK3588 ecosystem (rkllm, rknpu repos) growing fast
- **Multi-agent coordination** - openrig, ECC, Hermes focus on orchestration

**Geographical signals:**
- Chinese AI community mạnh: MoneyPrinterTurbo, daily_stock_analysis, dbx (bilingual docs)
- Japanese contributors visible: tspi-AIBox
- Global collaboration trên edge AI tooling

---

## 🎯 Key takeaways

1. **Agent infrastructure > agent applications** - Frameworks, optimization tools outpace end-user agents
2. **Edge AI đã production-ready** - RK3588 toolchain complete, real deployments
3. **Context efficiency crisis** - Multiple solutions racing, no clear winner
4. **Local-first đang mainstream** - Privacy + cost đẩy shift về on-premise
5. **Multimodal gen commoditized** - Voice/video generation tools ở consumer quality
6. **RAG rethinking fundamentals** - Move beyond vector similarity
7. **Skills marketplaces forming** - Sharing production agent capabilities

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*