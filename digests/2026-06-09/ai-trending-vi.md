# Xu hướng AI Mã nguồn mở 2026-06-09

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-06-09 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 09/06/2026

## 1. Tóm tắt hôm nay

Hôm nay đánh dấu sự bùng nổ của **hệ sinh thái Agent Skills** - một paradigm shift từ monolithic agents sang modular, composable skills. Cộng đồng đang xây dựng "marketplace" cho AI agents với hàng trăm skills có thể tái sử dụng, từ nghiên cứu thông tin đến quản lý sự nghiệp.

Điểm nhấn khác là **AI infrastructure cho consumer hardware** - Orange Pi, Rockchip NPU, và edge devices đang trở thành nền tảng cho self-hosted AI, không còn phụ thuộc vào cloud.

## 2. Top repos theo chiều

### 🤖 AI Agents

**mvanhorn/last30days-skill** ⭐ +3,558  
Agent skill tổng hợp thông tin từ Reddit, X, YouTube, HN, Polymarket - minh chứng cho xu hướng "research-first agents" tự động thu thập và phân tích dữ liệu đa nguồn.

**Panniantong/Agent-Reach** ⭐ +679  
CLI cho phép agents đọc và tìm kiếm Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu - zero API fees. Giải pháp cho vấn đề chi phí API khi scale agents.

**santifer/career-ops** ⭐ +308  
Hệ thống tìm việc AI-powered với 14 skill modes, Go dashboard, PDF generation. Use case cụ thể cho agents: từ job search đến interview prep.

**google/skills** ⭐ +461  
Google chính thức tham gia cuộc đua Agent Skills với skills cho Google products - tín hiệu về sự chuẩn hóa của agent ecosystem.

**phuryn/pm-skills** ⭐ +164  
100+ skills cho Product Managers - từ discovery đến launch và growth. Vertical specialization cho agents.

**openai/plugins** ⭐ +296  
OpenAI Plugins comeback - có thể là response với Agent Skills trend.

**aaif-goose/goose** ⭐ +699  
Rust-based extensible AI agent đi xa hơn code suggestions - install, execute, edit, test với bất kỳ LLM nào.

### 🔧 AI Infrastructure

**RyanCodrai/turbovec** ⭐ +1,729  
Vector index built on TurboQuant, viết bằng Rust với Python bindings - performance-focused infrastructure cho RAG systems.

**danielmiessler/Personal_AI_Infrastructure** ⭐ +62  
Agentic AI Infrastructure để magnify HUMAN capabilities -철학 "augment humans" thay vì "replace humans".

**Andyyyy64/whichllm** ⭐ +143  
Tìm local LLM phù hợp nhất với hardware của bạn - ranked by real benchmarks, không phải parameter count. Giải quyết pain point khi chọn model.

**MemPalace/mempalace** ⭐ +170  
Best-benchmarked open-source AI memory system - free. Memory layer cho long-term context.

**refactoringhq/tolaria** ⭐ +651  
Desktop app quản lý markdown knowledge bases - bridge giữa personal notes và AI systems.

### 🧠 Models & Training

**roboflow/supervision** ⭐ +1,288  
Reusable computer vision tools - focused on practical CV pipelines.

**CopilotKit/CopilotKit** ⭐ +378  
Frontend Stack for Agents & Generative UI - React, Angular, Mobile, Slack. AG-UI Protocol creators.

### 📦 AI Applications

**luongnv89/claude-howto** ⭐ +312  
Visual guide đến Claude Code - từ basic đến advanced agents với copy-paste templates. Educational content gaining traction.

### 🔍 RAG & Knowledge

Các dự án RAG trong GitHub Search (7 ngày):

**langgenius/dify** ⭐ 144,449  
Production-ready platform for agentic workflow development - leading RAG platform.

**infiniflow/ragflow** ⭐ 82,227  
RAG engine kết hợp Agent capabilities - fusion giữa retrieval và agentic systems.

**safishamsi/graphify** ⭐ 63,441  
Turn code/docs/videos thành queryable knowledge graph - AI coding assistant skill cho Claude Code, Codex, Cursor.

**thedotmack/claude-mem** ⭐ 81,310  
Persistent context across sessions - captures agent actions, compresses, injects back vào future sessions.

### 🔌 Embedded AI

**NotPunchnox/rkllama** ⭐ 550  
Ollama alternative cho Rockchip NPU - optimized NPU support for rkllm. Đây là giải pháp self-hosted AI trên consumer hardware.

**jaylfc/taOS** ⭐ 218  
Self-hosted auto clustering AI agent OS cho consumer hardware (Orange Pi, Raspberry Pi, Mac Mini). Full desktop, app store, agent deployment, distributed compute cluster - **100% offline**.

**jaylfc/taosmd** ⭐ 44  
Local-first AI memory runs offline trên bất kỳ máy 8GB+ RAM. Zero-loss archive, knowledge graph, hybrid retrieval - framework-agnostic, no cloud.

**Nayerim-AI/NPUShield** (mới)  
Production guardrail và RAG layer cho RKLLM trên RK3588 NPU - security layer cho edge AI.

**Leon6225/InternVL3.5-4B-NPU** (mới)  
Multimodal AI (InternVL3.5) cho RK3588 NPU - vision + language understanding trên edge devices.

**MichaIng/DietPi** ⭐ 6,105  
Lightweight OS cho single-board computers - foundation cho edge AI deployments.

## 3. Phân tích tín hiệu xu hướng

### 🔥 Agent Skills Marketplace
Từ monolithic agents → modular, reusable skills. Cộng đồng đang xây "npm for AI agents":
- Google, OpenAI tham gia với official skills
- 100+ PM skills, research skills, career skills
- Skills trở thành unit of composition cho agents

### 🏠 Local-First AI Revolution
Từ cloud-dependent → self-hosted, offline-first:
- Orange Pi, Rockchip NPU become AI compute platforms
- taOS: full agent OS cho consumer hardware
- rkllama: Ollama alternative cho NPU
- Zero cloud dependency, privacy-first

### 🧠 Persistent Memory Systems
Agents không còn "stateless":
- claude-mem: cross-session context
- mempalace: benchmarked memory system
- taosmd: local-first memory với knowledge graph

### 🔗 Knowledge Graph Renaissance
Từ vector search → structured knowledge:
- graphify: code + schema + docs → queryable graph
- Knowledge graphs để agents reasoning tốt hơn

### 🛡️ Production-Ready Agent Infrastructure
Từ demos → production systems:
- NPUShield: guardrails cho edge AI
- Career-ops: 14 skill modes với dashboard
- Focus on reliability, monitoring, safety

## 4. Tâm điểm cộng đồng

### 🌟 Last30Days-Skill (+3,558 stars)
Repo hot nhất hôm nay. Đây là skills nghiên cứu đa nguồn (Reddit, X, YouTube, HN, Polymarket) - showcasing power của composable research agents.

### 🚀 TurboVec (+1,729 stars)
Rust-based vector index - performance đang trở thành competitive advantage cho RAG systems.

### 🏆 Google Skills (+461 stars)
Google entering Agent Skills space - validation cho paradigm này và chuẩn hóa ecosystem.

### 💡 taOS & rkllama
Self-hosted AI movement gaining momentum. Orange Pi + Rockchip NPU = democratized AI compute. Không cần GPU đắt tiền, không phụ thuộc cloud, privacy-first.

---

**Kết luận**: Hôm nay là ngày của **composability** (Agent Skills), **locality** (self-hosted AI), và **practicality** (production-ready infrastructure). AI đang chuyển từ experimental demos sang production systems developers có thể ship ngay.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*