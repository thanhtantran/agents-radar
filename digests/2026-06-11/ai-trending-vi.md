# Xu hướng AI Mã nguồn mở 2026-06-11

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-06-11 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn mở - 11/06/2026

## 🎯 Tóm tắt hôm nay

Cộng đồng AI mã nguồn mở đang chứng kiến một làn sóng mới về **agent skills và agentic frameworks**. Xu hướng nổi bật nhất là sự phát triển của các hệ thống kỹ năng có thể tái sử dụng cho AI agents, với hơn 5 repo về "skills" trong top trending. Đồng thời, **embedded AI trên NPU Rockchip** đang có những đột phá quan trọng với các giải pháp chạy LLM trên edge devices. Một tín hiệu thú vị khác là sự quan tâm tới **privacy-first AI**, với nhiều dự án tập trung vào local-first, self-hosted solutions.

## 🏆 Top Repos theo Chiều

### 🤖 AI Agents

**addyosmani/agent-skills** (+821⭐)
- Production-grade engineering skills cho AI coding agents
- Tín hiệu: Cộng đồng đang chuẩn hóa các kỹ năng tái sử dụng thay vì viết lại từ đầu

**phuryn/pm-skills** (+804⭐)
- 100+ agentic skills cho product management
- Từ discovery, strategy, execution đến launch và growth
- Cho thấy AI agents đang mở rộng ra ngoài coding

**obra/superpowers** (+1,104⭐)
- Agentic skills framework & methodology
- Nhấn mạnh vào "methodology that works" - phản ánh nhu cầu về best practices

**mvanhorn/last30days-skill** (+2,535⭐ - cao nhất hôm nay)
- AI agent skill nghiên cứu topic từ Reddit, X, YouTube, HN, Polymarket
- Tổng hợp thông tin từ multiple sources
- Giải quyết pain point: thu thập insight từ nhiều nền tảng

**NousResearch/hermes-agent** (190K⭐)
- "The agent that grows with you"
- Agent có khả năng học và phát triển theo thời gian

**zhayujie/CowAgent** (45K⭐)
- Open-source super AI assistant
- Plans tasks, runs tools, self-evolves với memory và knowledge
- Multi-model, multi-channel, lightweight

**HKUDS/nanobot** (44K⭐)
- Lightweight, open-source AI agent
- Tập trung vào đơn giản hóa việc triển khai agents

### 🔧 AI Infrastructure

**x1xhlol/system-prompts-and-models-of-ai-tools** (+393⭐)
- Leak system prompts của Cursor, Windsurf, Kiro, Replit, v0, và nhiều tools khác
- Phản ánh nhu cầu transparency về cách AI tools hoạt động

**google/skills** (+211⭐)
- Agent Skills cho Google products
- Google chính thức tham gia cuộc chơi agentic skills

**affaan-m/ECC** (212K⭐)
- Agent harness performance optimization system
- Skills, instincts, memory, security cho Claude Code, Codex, Cursor

**thedotmack/claude-mem** (81K⭐)
- Persistent context across sessions cho mọi agent
- Captures, compresses, và inject lại context vào future sessions
- Giải quyết vấn đề context loss giữa các sessions

**safishamsi/graphify** (65K⭐)
- AI coding assistant skill
- Biến code, SQL, docs, videos thành queryable knowledge graph

**apple/container** (+1,611⭐)
- Tool tạo và chạy Linux containers bằng lightweight VMs trên Mac
- Tối ưu cho Apple silicon
- Cho thấy Apple đang đầu tư vào developer tooling

### 🧠 Models & Training

**FareedKhan-dev/train-llm-from-scratch** (+247⭐)
- Phương pháp đơn giản training LLM từ đầu
- Từ download data đến generate text
- Đáp ứng nhu cầu democratize AI training

**hiyouga/LlamaFactory** (72K⭐)
- Unified efficient fine-tuning cho 100+ LLMs & VLMs
- Công cụ quan trọng cho việc customize models

**Leon6225/InternVL3.5-4B-NPU** (mới)
- Multimodal AI cho RK3588 NPU
- Vision + language understanding trên edge

**toopac01/InternVL3.5-8B-NPU** (mới)
- Phiên bản 8B cho RK3588
- Multimodal capabilities trên embedded hardware

### 📦 AI Applications

**harry0703/MoneyPrinterTurbo** (+1,389⭐)
- Tạo short videos tự động bằng AI LLM
- Use case cụ thể, viral trong cộng đồng content creators

**ZhuLinsen/daily_stock_analysis** (41K⭐)
- LLM-driven stock analysis cho A/H/US markets
- Multi-source data + real-time news + LLM decisions
- Zero-cost scheduled runs

**santifer/career-ops** (52K⭐)
- AI-powered job search system trên Claude Code
- 14 skill modes, Go dashboard, PDF generation
- Ứng dụng AI vào job hunting

**maziyarpanahi/openmed** (+527⭐)
- Open-source healthcare AI
- Vertical quan trọng đang được mở rộng

**ruvnet/RuView** (+420⭐)
- Biến WiFi signals thành spatial intelligence, vital signs monitoring
- Không cần camera
- Privacy-preserving sensing technology

### 🔍 RAG & Knowledge

**refactoringhq/tolaria** (+612⭐)
- Desktop app quản lý markdown knowledge bases
- Local-first approach cho personal knowledge

**siyuan-note/siyuan** (44K⭐)
- Privacy-first, self-hosted personal knowledge management
- TypeScript + Golang

**jaylfc/taosmd** (45⭐)
- Local-first AI memory
- Chạy offline trên máy 8GB+ RAM (SBC, mini PC, laptop)
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval

**langgenius/dify** (144K⭐)
- Production-ready platform cho agentic workflow development
- Leader trong RAG space

**infiniflow/ragflow** (82K⭐)
- Leading RAG engine kết hợp RAG với Agent capabilities

### 🔌 Embedded AI

**NotPunchnox/rkllama** (554⭐)
- Ollama alternative cho Rockchip NPU
- Optimized NPU support cho RK devices
- Giải pháp quan trọng cho edge AI

**jaylfc/taOS** (221⭐)
- Self-hosted auto clustering AI agent OS
- Chạy trên consumer hardware (Orange Pi, Raspberry Pi, Mac Mini)
- Full desktop, app store, agent deployment, distributed compute cluster

**YeWenxuan64/rktop** (4⭐)
- Lightweight monitoring cho RK3588 CPU, NPU, GPU, RGA
- Tools cho embedded AI development

**anoxia1/rknn-model-tools** (mới)
- CLI toolkit cho Rockchip NPU
- Model conversion (TFLite/ONNX → RKNN), testing, benchmarking
- Face/hand/emotion models out of the box

**zyp0424/Qwen-Chat-Assistant** (7⭐)
- Voice chat assistant trên RK3588
- Qwen3-2B với rknn+rkllm
- Camera + speaker, hoàn toàn local

**Nayerim-AI/NPUShield** (mới)
- Production guardrail và RAG layer cho RKLLM trên RK3588 NPU
- Security cho embedded AI

**Ponce1969/contador-oriental-ai** (3⭐)
- Financial management system với local AI
- Enterprise architecture với Python, Fleting, PostgreSQL, Ollama
- 100% offline, ready cho Orange Pi 5 Plus

**lmambr2/moneypenny** (2⭐)
- Self-hosted, NPU-accelerated AI + music assistant
- Chạy trên Orange Pi 5 Max (RK3588)
- One repo, one docker compose, no cloud

## 🔥 Phân tích Tín hiệu Xu hướng

### 1. **Agent Skills Marketplace đang hình thành**

Thay vì mỗi dev tự build agents từ đầu, cộng đồng đang chuyển sang model "skills marketplace":
- Production-grade skills có thể plug-and-play
- Kỹ năng chuyên biệt cho từng domain (PM, engineering, research)
- Standardization đang diễn ra (nhiều repos với cùng pattern)

**Tại sao quan trọng**: Giảm thời gian từ ý tưởng đến production. Tương tự như npm packages cho traditional code, giờ có "skills packages" cho AI agents.

### 2. **Embedded AI trên NPU đang bùng nổ**

RK3588 với RKLLM/RKNPU đang trở thành platform phổ biến cho edge AI:
- Multimodal models (vision + language) chạy local
- Voice assistants hoàn toàn offline
- Infrastructure tools (monitoring, conversion, guardrails)

**Tại sao quan trọng**: Privacy-first AI không còn là compromise về performance. Có thể chạy sophisticated AI trên hardware consumer-grade (~$100-200).

### 3. **Local-first & Privacy-preserving AI**

Xu hướng rõ ràng hướng tới decentralized, privacy-first solutions:
- Self-hosted agent OS
- Local memory và knowledge graphs
- Zero-cloud architectures

**Drivers**: 
- Concerns về data privacy
- Chi phí cloud APIs
- Latency requirements
- Desire for control

### 4. **Context Management là bottleneck tiếp theo**

Nhiều projects tập trung giải quyết context loss:
- Persistent memory across sessions
- Knowledge graphs từ codebases
- Compression và retrieval systems

**Tại sao quan trọng**: Context window limits là một trong những hạn chế lớn nhất của LLMs. Solutions ở đây unlock long-running agents.

### 5. **Multimodal trên Edge**

InternVL models chạy trên NPU cho thấy:
- Vision + language không còn là luxury của cloud
- Embedded systems có thể handle sophisticated multimodal tasks
- Price/performance ratio đang improve dramatically

### 6. **Infrastructure cho Agent Development**

Các tools như ECC, claude-mem, graphify cho thấy:
- Agent development đang mature
- Cần tooling riêng cho agent workflows
- Performance optimization là critical

## 💬 Tâm điểm Cộng đồng

### 🏅 Standouts

**mvanhorn/last30days-skill** (+2,535⭐)
- Highest growth hôm nay
- Giải quyết real pain point: research synthesis
- Viral vì immediately useful

**obra/superpowers** (+1,104⭐)
- "Methodology that works" resonates với developers
- Cộng đồng đang tìm kiếm proven patterns, không chỉ raw tools

**apple/container** (+1,611⭐)
- Apple chính thức embrace containerization trên Mac
- Optimized cho Apple Silicon
- Signal về sự support của Apple cho developer workflows

### 🎭 Dark Horses

**x1xhlol/system-prompts-and-models-of-ai-tools** (+393⭐)
- Controversial nhưng valuable
- Transparency về AI tools
- Học được nhiều từ việc study production prompts

**rkllama ecosystem**
- Quiet nhưng steady growth
- Building blocks cho embedded AI revolution
- Community-driven alternative cho proprietary solutions

### 🔮 Predictions

1. **Agent Skills sẽ có package managers riêng** trong 3-6 tháng
2. **RK3588-based AI devices** sẽ có commercial products trong Q3/Q4
3. **Context management solutions** sẽ consolidate thành vài winners
4. **Privacy-first AI** sẽ shift từ niche sang mainstream

---

**Key Takeaway**: Năm 2026 không phải về models lớn hơn, mà về **making AI more accessible, practical, and privacy-preserving**. Cộng đồng đang build infrastructure để AI agents trở thành reality, không chỉ demos.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*