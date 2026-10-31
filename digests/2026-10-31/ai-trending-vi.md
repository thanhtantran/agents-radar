# Xu hướng AI Mã nguồn mở 2026-10-31

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-31 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 2026-10-31

## 🔥 Tóm tắt hôm nay

Làn sóng AI Agent Infra đạt đỉnh: +16 repo về agent memory, skills framework, và persistent context. Ecosystem mở rộng: từ agent harness cho dev tools đến embedded AI trên Orange Pi/RK3588. RAG evolution: knowledge graph thay vector store. NPU inference tăng tốc với driver mở và matmul thủ công.

---

## 📊 Top repos theo chiều

### 🤖 AI Agents
- **thedotmack/claude-mem** ⭐+1,140 (TypeScript)  
  Persistent context cho mọi agent. Nén session history, inject vào sau. Universal: Claude Code/OpenClaw/Codex/Gemini/Hermes/Copilot.

- **milind-soni/OpenMausBot** ⭐+895 (TypeScript)  
  Grok Bot alternative mở. Bot chạy trong VM.

- **CopilotKit/OpenBot** ⭐+706 (TypeScript)  
  AI coworker riêng: browser + files + tools. Mọi action decide trước, record sau. Support AG-UI agent.

- **obra/superpowers** ⭐+1,259 (Shell)  
  Agentic skills framework + dev methodology works thật.

- **mattpocock/skills** ⭐+876 (Shell)  
  Skills cho Real Engineers. Từ `.agents` directory của Matt.

- **anthropics/skills** ⭐+295 (Python)  
  Public Agent Skills repo chính thức từ Anthropics.

- **expo/skills** ⭐+38 (Shell)  
  Agent skills cho Expo projects + EAS.

### 🔧 AI Infrastructure
- **pbakaus/impeccable** ⭐+2,300 (Rust)  
  Design vocabulary cho agent code. Polish/bolder để steer, critique/audit để review. Catch AI slop trước khi ship.

- **JetBrains/thinkrail** ⭐+722 (TypeScript)  
  Vibe code với pi trong lightweight real IDE, tự custom theo cách làm việc.

- **macro-inc/macro** ⭐+57 (Rust)  
  Unified workspace: email/chat/docs/tasks/agents/calls/CRM — @-linked cùng shared AI memory.

- **lightpanda-io/browser** ⭐+626 (Zig)  
  Headless browser cho AI và automation.

- **headroomlabs-ai/headroom** ⭐78,387 (Python) [7-day trend]  
  Nén tool outputs/logs/files/RAG chunks trước LLM. -20% tokens cho coding agents, -60-95% cho JSON.

### 🧠 Models & Training
- **HKUDS/DeepTutor** ⭐+2,282 (Python)  
  Lifelong Personalized Tutoring.

- **togg53192-cmd/jailbreaks** ⭐+2,055 (None)  
  Tổng hợp jailbreaks.

### 📦 AI Applications
- **pingdotgg/t3code** ⭐+930 (TypeScript)  
  T3 Stack coding tool (no description).

- **Renhuai123/ziwei-doushu** ⭐+1,126 (TypeScript)  
  紫微斗数 open-source engine — Ni Haixia《天纪》system, full 排盘 algo + tứ hóa + cách cục knowledge base + ancient texts data.

- **hugohe3/ppt-master** ⭐71,331 (Python) [7-day trend]  
  AI tạo native PowerPoint từ docs/topics: shapes/transitions/animations, charts/tables on demand, audio narration, .pptx templates.

- **career-ops-hq/career-ops** ⭐78,905 (JavaScript) [7-day trend]  
  AI job search agent: scan/score jobs vs CV, tailor ATS resume, prep interview, tracker. User press Submit.

### 🔍 RAG & Knowledge
- **Graphify-Labs/graphify** ⭐139,503 (Python) [7-day trend]  
  Codebase + docs/SQL/configs/PDFs → queryable knowledge graph. `/graphify` skill cho Claude Code/Cursor/Codex/Gemini. Local deterministic AST parsing, mọi edge explained, không dùng vector store.

- **infiniflow/ragflow** ⭐93,224 (Go) [7-day trend]  
  Leading RAG engine + Agent capabilities. Superior context layer cho LLMs.

- **unclecode/crawl4ai** ⭐86,618 (Python) [7-day trend]  
  Web crawler/scraper cho LLMs: website → clean LLM-ready Markdown. Self-hosted hoặc Crawl4AI Cloud.

- **mem0ai/mem0** ⭐68,118 (Python) [7-day trend]  
  Memory Layer for AI Agents. Persistent context, production-ready.

### 🔌 Embedded AI
- **NotPunchnox/rkllama** ⭐618 (Python) [rkllm search]  
  Ollama alternative cho Rockchip NPU. Optimized inference trên RK devices.

- **happyme531/open_rknpu2_lm_infer** ⭐57 (Rust) [rknpu search]  
  Fully open-source, high-perf LLM inference engine cho RK3588 NPU.

- **gregordinary/ggml-rocket** ⭐25 (C++) [rknpu search]  
  Drop-in ggml backend cho Rockchip NPUs: offload llama.cpp/whisper.cpp prefill lên RK3588 NPU.

- **gregordinary/rocket-userspace** ⭐23 (C) [rknpu search]  
  Userspace driver, matmul, on-NPU op library cho RK3588 & RK3576 via mainline rocket DRM-accel driver.

- **happyme531/rknpu2_matmul_open** ⭐12 (C++) [rknpu search]  
  Matrix mul + quantized LLM kernels cho RK3588 RKNPU2.

- **jaylfc/taOS** ⭐586 (Python) [orangepi search]  
  Self-hosted AI agent OS. Memory/chat/agents/files stay on hardware owned, offline by default. Offline AI memory, multi-framework group chat, web desktop + app store, auto-clustering across consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC).

- **jaylfc/taosmd** ⭐83 (Python) [orangepi search]  
  Local-first AI memory — offline trên machine với 8 GB+ RAM. Zero-loss verbatim archive, knowledge graph, hybrid retrieval. Framework-agnostic, no cloud.

- **Animan-AI/DuckBuddy** ⭐77 (Rust) [orangepi search]  
  Open-source embodied AI robot duck: walks, hears, sees, life of own. Feetech servos + Orange Pi Zero 3W, built on Pollen Robotics' Microduck.

- **nouverse/nouride-releases** ⭐26 (Shell) [orangepi search]  
  Lightweight multi-agent AI engine single daemon. Homelab-friendly cho mini devices (Raspberry/Orange Pi, Geekom, NUC, LXC).

---

## 📈 Phân tích tín hiệu xu hướng

1. **Agent Memory War**: 3 approach nổi lên:
   - Persistent context qua sessions (claude-mem: compress & inject)
   - Knowledge graph thay vector store (graphify: deterministic AST)
   - Local-first offline memory (taosmd: hybrid retrieval, zero-loss)

2. **Skills Ecosystem Explosion**: Agent skills repositories từ vendors (Anthropics, Expo), individuals (mattpocock), frameworks (obra/superpowers). Trend: reusable agent primitives, không còn monolithic.

3. **NPU Renaissance trên RK3588**: Driver mở (rocket mainline), matmul custom, drop-in backends cho ggml/TensorFlow Lite/ONNX Runtime. Community tự build inference stack bypass vendor RKLLM.

4. **Agent Harness Pattern**: Từ code generation đến full workspace (macro: email/chat/docs/tasks/agents @-linked). Single-daemon multi-agent engines cho homelab (nouride: Raspberry/Orange Pi).

5. **Knowledge Graph > Vector Store**: Repo như graphify dùng deterministic AST parsing thay semantic search. Xu hướng: structured reasoning thay similarity matching.

6. **Compression Layer Trend**: headroom nén tool outputs/RAG chunks -60-95% tokens. Impeccable catch AI slop. Pattern: filter trước model inference.

---

## 🌟 Tâm điểm cộng đồng

- **claude-mem (+1,140 stars)**: Universal persistent context layer. Hype cao vì plug-and-play vào mọi agent CLI.

- **impeccable (+2,300 stars)**: Design vocabulary cho agent code. Hit nerve: devs frustrated với AI slop cần review tool.

- **graphify (+139K total)**: Knowledge graph from codebase. Trending vì kill vector store complexity, pure AST + graph.

- **DeepTutor (+2,282 stars)**: Personalized tutoring với lifelong learning. Ed-tech + LLM intersection.

- **open_rknpu2_lm_infer**: Fully open NPU inference engine. Community build alternative cho vendor RKLLM. Embedded AI going open.

- **taOS (+586 stars)**: Self-hosted AI OS cho consumer hardware. Offline-first, privacy-focused. Resonates với self-hosting crowd.

---

**Kết luận**: AI Agent infrastructure đạt maturity mới: persistent memory, skills frameworks, knowledge graphs, compression layers. Embedded AI mở (Orange Pi/RK3588) tạo alternative cho cloud-dependent systems. Pattern rõ: từ monolithic agent → modular skills + portable memory + self-hosted execution.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*