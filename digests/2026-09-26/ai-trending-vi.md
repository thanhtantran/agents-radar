# Xu hướng AI Mã nguồn mở 2026-09-26

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-26 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở ngày 2026-09-26

## 📊 Tóm tắt hôm nay

**Agent infrastructure đang bùng nổ.** Cộng đồng chuyển từ chat đơn thuần sang agent orchestration, skills frameworks, memory systems. Edge AI trên NPU nhận momentum mới với RKLLM/RKNPU ecosystem mature hơn.

**Ba làn sóng chính:**
- Agent harnesses & skills (Anthropic official plugins, superpowers, paperclip)
- Memory & context optimization (hindsight, claude-mem, headroom)
- Edge inference (RKLLM bindings, NPU deployments)

## 🔥 Top repos theo chiều

### 🤖 AI Agents

**paperclipai/paperclip** ⭐ +2109 | TypeScript
Agent management app cho workplace. Highest star velocity today.

**NousResearch/hermes-agent** ⭐ 248,988 | Python  
"Agent grows with you" — adaptive agent architecture.

**google/ax** ⭐ +1379 | Go
Google open agentic orchestration runtime. Big tech entry vào agent space.

**obra/superpowers** ⭐ +468 | Shell  
Agentic skills framework. Community-driven methodology.

**mattpocock/skills** ⭐ +583 | Shell  
"Skills for Real Engineers" — developer skills library.

**anthropics/skills** ⭐ +189 | Python  
Anthropic official public agent skills repo.

**anthropics/claude-plugins-official** ⭐ +83 | Python  
Official Claude Code plugins directory. Platform legitimization.

**affaan-m/ECC** ⭐ 267,528 | JavaScript  
Agent harness performance optimization system cho Claude Code, Cursor, etc.

### 🧠 Models & Memory

**vectorize-io/hindsight** ⭐ +1653 | Python  
"Agent Memory That Learns" — self-improving context.

**thedotmack/claude-mem** ⭐ 94,706 | TypeScript  
Persistent cross-session context cho mọi agent. Compress + inject.

**headroomlabs-ai/headroom** ⭐ 73,821 | Python  
Token compression: 20% fewer tokens coding agents, 60-95% JSON. Library + proxy + MCP server.

**Graphify-Labs/graphify** ⭐ 121,463 | Python  
Codebase → knowledge graph. Local deterministic AST parsing, no vector store.

### 🔧 AI Infrastructure

**dream-num/univer** ⭐ +1050 | TypeScript  
Office harness cho AI agents: Spreadsheets, Docs, Slides, Canvas trong một runtime.

**NVIDIA/Model-Optimizer** ⭐ +359 | Python  
Unified optimization library: quantization, distillation, pruning, NAS cho TensorRT-LLM.

**androoAGI/starnet** ⭐ +93 | JavaScript  
Living pixel-art station. Local-first desktop agent harness.

**pbakaus/impeccable** ⭐ +306 | JavaScript  
Design language cho AI harness design work.

### 📦 AI Applications  

**CherryHQ/cherry-studio** ⭐ 52,154 | TypeScript  
AI productivity studio: smart chat, autonomous agents, 300+ assistants.

**career-ops-hq/career-ops** ⭐ 72,815 | JavaScript  
AI job search: scan portals, evaluate listings, tailor CV, track applications. Runs local trong CLI.

**hugohe3/ppt-master** ⭐ 56,393 | Python  
AI → native PowerPoint: shapes, transitions, animations, charts, audio narration.

**siyuan-note/siyuan** ⭐ 46,505 | TypeScript  
Self-hosted knowledge workspace cho humans + AI agents collab.

### 🔍 RAG & Knowledge

**Shubhamsaboo/awesome-llm-apps** ⭐ 139,774 | Python  
100+ AI Agents, Skills, RAG Apps — free, open-source.

**infiniflow/ragflow** ⭐ 91,308 | Go  
Leading RAG engine fused với Agent capabilities.

**open-webui/open-webui** ⭐ 153,195 | Python  
User-friendly AI interface support Ollama, OpenAI.

**unclecode/crawl4ai** ⭐ 84,269 | Python  
Web crawler cho LLMs: website → clean LLM-ready Markdown.

### 🔌 Embedded AI

**darkautism/rkllm-rs** ⭐ 13 | Rust  
RKLLM Rust FFI binding. Ecosystem ngôn ngữ expand.

**Leon6225/InternVL3.5-4B-NPU** ⭐ 5 | C++  
InternVL3.5-4B cho RK3588 NPU. Multimodal on edge.

**ambagesthickskin162/Qwen3.5-4B-NPU** ⭐ 1 | C++  
Qwen3.5-4B NPU deployment, efficient local inference.

**jaylfc/taOS** ⭐ 549 | Python  
Self-hosted AI agent OS. Memory, chat, agents, files stay local. Auto-clustering across consumer hardware (Orange/Raspberry Pi, Mac mini).

**jaylfc/taosmd** ⭐ 79 | Python  
Local-first AI memory — offline on 8GB+ RAM SBC. Zero-loss archive, knowledge graph.

**nouverse/nouride-releases** ⭐ 13  
Lightweight multi-agent engine trong single daemon. Homelab-friendly cho Pi/Orange Pi/NUC.

**lona-cn/vision-simple** ⭐ 41 | C++  
Lightweight C++ vision inference: YOLOv10/v11/v26, PaddleOCR với ONNXRuntime/RKNPU.

## 🎯 Phân tích tín hiệu xu hướng

### Agent Platforms Đang Consolidate
Anthropic official plugins + skills repo = platform legitimization. Google ax entry = big tech validation. Community response: frameworks như superpowers, ECC optimization systems.

### Memory & Context War
Ba approach: persistent storage (claude-mem), learning systems (hindsight), compression (headroom). Giải quyết context window limit. Production agents need này.

### Edge AI Maturation
RKLLM ecosystem có Rust bindings, multimodal models (InternVL), lightweight runtimes. Orange Pi + Raspberry Pi homelab setups viable cho multi-agent. taOS auto-clustering signal: edge AI không còn single-device.

### Skills > Prompts
Shift từ prompt libraries sang executable skills. Repository pattern: obra/superpowers, mattpocock/skills, anthropics/skills. Declarative, versioned, composable.

### Office Suite Harnesses
dream-num/univer trend: không chỉ chat interface, agents cần native workspace tools. Spreadsheets, docs, canvas trong một runtime.

## 💡 Tâm điểm cộng đồng

**paperclipai/paperclip** (+2109 stars) = highest velocity. Workplace agent management pain point real.

**google/ax** = big tech moving từ research sang open orchestration. Community quan tâm vì Google-scale production learnings.

**Graphify-Labs/graphify** momentum high: "deterministic AST parsing, no vector store" resonates với devs tired of probabilistic RAG.

**Career automation** (career-ops-hq) shows AI agents expanding beyond coding sang professional workflows.

**NPU ecosystem** quiet nhưng persistent: mỗi tuần có new deployments (Qwen, InternVL trên RK3588). Edge inference becoming commodity.

**Compression tech** (headroom 60-95% token reduction) = infrastructure play. Every agent framework cần này.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*