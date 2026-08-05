# Xu hướng AI Mã nguồn mở 2026-08-05

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-08-05 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn mở - 05/08/2026

## 🎯 Tóm tắt hôm nay

Hôm nay chứng kiến sự bùng nổ của **Agent Memory & Skills** - xu hướng chuyển từ agent đơn lẻ sang các hệ thống có khả năng học hỏi, lưu trữ và chia sẻ kiến thức. Đồng thời, **Edge AI** tiếp tục phát triển mạnh với các giải pháp NPU trên phần cứng consumer. Một điểm nhấn đặc biệt là sự xuất hiện của các **AI coding agent frameworks** được thiết kế riêng cho môi trường phát triển như Claude Code, Cursor, và Kiro.

## 📈 Top Repos Theo Chiều

### 🤖 AI Agents

**TencentCloud/TencentDB-Agent-Memory** (+1,111 ⭐)
- Giải pháp memory hub cấp team cho AI agents
- Chuyển đổi conversations, docs, code thành 4 loại memory assets có thể tái sử dụng
- Hỗ trợ quản trị và chia sẻ memory giữa các agents

**zhaoxuya520/reverse-skill** (+2,297 ⭐)  
- Skill router pack cho reverse engineering và penetration testing
- AI-powered routing + toolchain bootstrapping + knowledge base tự tiến hóa
- Hỗ trợ đa nền tảng AI coding (Claude Code, Kiro, Cursor, Cline)

**obra/superpowers** (+653 ⭐)
- Agentic skills framework thực tế, có thể triển khai ngay
- Tập trung vào methodology cho software development

**NousResearch/hermes-agent** (225,530 ⭐)
- "The agent that grows with you" - agent có khả năng học và phát triển

**zhayujie/CowAgent** (46,319 ⭐)
- Super AI assistant mã nguồn mở với khả năng tự tiến hóa
- Multi-model, multi-channel, nhẹ và dễ mở rộng

### 🔧 AI Infrastructure

**uber/ADR** (+148 ⭐)
- Bảo mật enterprise AI agents thông qua observability và threat detection
- Đã được triển khai production tại Uber

**esengine/DeepSeek-Reasonix** (+922 ⭐)
- AI coding agent tối ưu cho DeepSeek, chạy trên terminal
- Thiết kế xung quanh prefix-cache stability để có thể chạy liên tục

**affaan-m/ECC** (237,714 ⭐)
- Agent harness performance optimization system
- Skills, instincts, memory, security cho Claude Code, Codex, Cursor

**headroomlabs-ai/headroom** (64,785 ⭐)
- Nén tool outputs, logs, RAG chunks trước khi đưa vào LLM
- Giảm 20% tokens cho coding agents, 60-95% cho JSON

**livekit/agents** (+432 ⭐)
- Framework xây dựng realtime voice AI agents

### 🧠 Models & Training

**lyogavin/airllm** (+1,711 ⭐)
- Chạy inference model 70B chỉ với GPU 4GB duy nhất
- Đột phá về tối ưu memory cho edge deployment

**ollama/ollama** (177,798 ⭐)
- Hỗ trợ Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek và nhiều model khác
- Giải pháp local inference phổ biến nhất

### 📦 AI Applications

**Panniantong/Agent-Reach** (66,509 ⭐)
- Cho AI agent "đôi mắt" để xem toàn bộ internet
- Đọc & tìm kiếm Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu
- Zero API fees

**santifer/career-ops** (62,801 ⭐)
- AI job search mã nguồn mở với hệ thống đánh giá A-F
- Tự động tailor CV, theo dõi applications
- Chạy local trong AI coding CLI

**ZhuLinsen/daily_stock_analysis** (60,069 ⭐)
- Hệ thống phân tích chứng khoán đa thị trường chạy bằng LLM
- Multi-source data, real-time news, automated notifications

**hugohe3/ppt-master** (43,021 ⭐)
- AI chuyển documents thành PowerPoint native hoàn chỉnh
- Hỗ trợ transitions, animations, charts, audio narration

**browser-use/video-use** (+320 ⭐)
- Edit video bằng coding agents

### 🔍 RAG & Knowledge

**TencentDB-Agent-Memory** - đã đề cập ở phần Agents
- Chat Memory, Skill, LLM-Wiki, Code-Graph

**Shubhamsaboo/awesome-llm-apps** (130,535 ⭐)
- 100+ AI Agents, Agent Skills và RAG Apps miễn phí

**thedotmack/claude-mem** (89,574 ⭐)
- Persistent context across sessions
- Nén AI-powered và inject context vào future sessions

**infiniflow/ragflow** (86,831 ⭐)
- Leading open-source RAG engine
- Kết hợp RAG với Agent capabilities

**mem0ai/mem0** (62,530 ⭐)
- Universal memory layer cho AI Agents

**jaylfc/taosmd** (72 ⭐)
- Local-first AI memory chạy offline
- Zero-loss verbatim archive, knowledge graph, hybrid retrieval

### 🔌 Embedded AI

**firecrawl/pdf-inspector** (+2,540 ⭐)
- Fast Rust library cho PDF inspection
- Phát hiện thông minh scanned vs text-based PDFs

**jaylfc/taOS** (473 ⭐)
- Self-hosted AI agent OS
- Chạy trên hardware consumer (Orange/Raspberry Pi, Mac mini, gaming PC)
- Offline by default, cloud by choice

**Hanzo-Huang/rkllm-docker** (7 ⭐)
- Dockerized RKLLM runtime cho Rockchip NPU models
- OpenAI-compatible API

**cuiwader51/rk-npu-llm** (0 ⭐ nhưng đáng chú ý)
- Hand-written bare-metal LLM runtime cho RK3588
- Bypass vendor stack để chạy Qwen3 với long context

**oRKLLM/ork-driver** (1 ⭐)
- Clean-room userspace matmul library cho Rockchip NPU

**tristanpenman/vlm-rknn** (1 ⭐)
- Chạy vision-language models trên Rockchip devices

**YeWenxuan64/rktop** (7 ⭐)
- Real-time monitoring cho RK3588 (CPU, NPU, GPU, RGA)

**StepfenShawn/rockchip_yolo26** (1 ⭐)
- YOLO26 trên Rockchip NPU

## 🔥 Phân tích Tín hiệu Xu hướng

### 1. **Agent Memory & Skill Sharing**
Xu hướng mạnh nhất hôm nay. Các agent không còn là đơn vị độc lập mà trở thành phần của một hệ sinh thái chia sẻ kiến thức:
- Team-level memory hubs (TencentDB)
- Self-evolving knowledge bases (reverse-skill, CowAgent)
- Persistent context across sessions (claude-mem)
- Universal memory layers (mem0)

### 2. **Specialized Agent Frameworks cho Coding Environments**
Sự bùng nổ của các frameworks được thiết kế riêng cho AI coding assistants:
- Hỗ trợ đa nền tảng (Claude Code, Cursor, Kiro, Cline, Codex)
- Tối ưu prefix-cache stability
- Performance optimization systems (ECC)
- Context compression (headroom)

### 3. **Edge AI & NPU Democratization**
Rockchip NPU đang trở thành nền tảng phổ biến cho local AI:
- Bare-metal implementations (rk-npu-llm)
- Clean-room drivers (ork-driver)
- Docker containers cho easy deployment
- Vision-language models on edge

### 4. **Vertical AI Applications**
AI không còn là general-purpose mà đi sâu vào các use cases cụ thể:
- Career optimization (career-ops)
- Stock analysis (daily_stock_analysis)
- PowerPoint generation (ppt-master)
- Security research (reverse-skill)

### 5. **Local-First Philosophy**
Xu hướng mạnh về privacy và ownership:
- Self-hosted systems (taOS, Open-WebUI)
- Offline-by-default (taosmd)
- Zero API fees (Agent-Reach)
- Hardware you own (consumer SBCs)

## 🌟 Tâm điểm Cộng đồng

### **TencentDB-Agent-Memory** - Cách mạng Agent Memory
Với +1,111 sao ngay ngày đầu, dự án này đánh dấu sự chuyển mình từ "stateless agents" sang "learning organizations". Khái niệm biến conversations thành reusable assets là game-changer cho enterprise AI.

### **reverse-skill** - Security meets AI Coding
+2,297 sao cho thấy nhu cầu lớn về security tooling trong AI coding environments. AI-powered routing kết hợp self-evolving knowledge base là mô hình mới đáng chú ý.

### **pdf-inspector** - Infrastructure Piece
+2,540 sao cho một Rust library xử lý PDF cho thấy cộng đồng đang tìm kiếm các building blocks chất lượng cao. Smart routing giữa scanned và text-based PDFs là yêu cầu thực tế của RAG systems.

### **Edge AI Movement**
Cộng đồng Rockchip đang phát triển mạnh với nhiều dự án bare-metal và optimization. Từ Docker containers đến hand-written runtimes, mọi người đang nghiêm túc với việc đưa AI về hardware consumer.

### **Agent Harness Ecosystem**
affaan-m/ECC với 237K sao cho thấy một hệ sinh thái đang hình thành xung quanh việc tối ưu hiệu năng agent. Skills, instincts, memory, security - đây là các thành phần cốt lõi của next-gen coding assistants.

---

**💡 Insight chính**: Năm 2026 không còn là về "AI có thể làm gì" mà là về "AI có thể học và chia sẻ gì". Memory, skills, và collaboration giữa agents đang trở thành infrastructure layer mới của AI development.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*