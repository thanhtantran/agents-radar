# Xu hướng AI Mã nguồn mở 2026-08-22

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-08-22 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn mở - 22/08/2026

## 🎯 Tóm tắt hôm nay

Ngày hôm nay chứng kiến sự bùng nổ của **agent harness ecosystem** với hàng loạt frameworks tối ưu hiệu suất cho Claude Code, Codex và các coding agents. Xu hướng "skills-as-code" đang thay thế cách tiếp cận monolithic truyền thống. Đồng thời, **Embedded AI trên NPU Rockchip** tiếp tục phát triển mạnh với toolchain hoàn thiện hơn, đặc biệt là khả năng chạy LLM local trên Orange Pi.

## 📂 Top repos theo chiều

### 🤖 AI Agents

**mattpocock/skills** ⭐ 3,362 hôm nay
- Skills framework trực tiếp từ thư mục `.agents`, phản ánh xu hướng "agent as filesystem"
- Đơn giản hóa việc quản lý và chia sẻ agent capabilities

**obra/superpowers** ⭐ 790 hôm nay  
- Agentic skills framework kết hợp software development methodology
- Tập trung vào cấu trúc và best practices cho agent development

**NousResearch/hermes-agent** ⭐ 234,010 total
- "The agent that grows with you" - adaptive learning agent
- Ecosystem lớn nhất trong không gian agent development

**santifer/career-ops** ⭐ 921 hôm nay
- AI job search automation: scan, evaluate (A-F scoring), tailor CV
- Chạy local trong các AI coding CLIs, giải quyết use case thực tế

**ZhuLinsen/daily_stock_analysis** ⭐ 63,583 total
- LLM-driven stock analysis với multi-source data
- Automated notifications và scheduled runs miễn phí

### 🔧 AI Infrastructure

**affaan-m/ECC** ⭐ 357 hôm nay
- Agent harness performance optimization system
- Skills, instincts, memory, security cho Claude Code và derivatives

**ruvnet/ruflo** ⭐ 140 hôm nay
- Original agent meta-harness cho multi-player swarms
- Adaptive memory, self-learning, RAG integration

**apache/maka** ⭐ 148 hôm nay
- Local-first AI agent workspace (Apache Incubating)
- Append-only log architecture cho full observability

**cursor/plugins** ⭐ 388 hôm nay
- Official plugin specification từ Cursor
- Mở rộng khả năng customization cho coding agents

**thedotmack/claude-mem** ⭐ 91,457 total
- Persistent context across sessions
- AI-compressed memory injection cho mọi agent

### 🧠 Models & Training

**huggingface/transformers** ⭐ 164,320 total
- State-of-the-art ML models framework
- Text, vision, audio, multimodal support

**vllm-project/vllm** ⭐ 89,662 total
- High-throughput inference engine
- Memory-efficient serving cho production LLMs

**ollama/ollama** ⭐ 179,128 total
- Local model runtime: Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek
- Simplified deployment cho consumer hardware

### 📦 AI Applications

**harry0703/MoneyPrinterTurbo** ⭐ 1,201 hôm nay
- AI workflow tạo video ngắn HD từ keywords
- Automation cho content creators

**hugohe3/ppt-master** ⭐ 48,484 total
- AI biến documents thành native PowerPoint
- Charts, transitions, animations, audio narration

**CherryHQ/cherry-studio** ⭐ 50,888 total
- AI productivity studio: chat, agents, 300+ assistants
- Unified access to frontier LLMs

**mahlernim/google-timeline-visualizer** ⭐ 1,053 hôm nay
- Visualize travel history từ Google Location data
- Privacy-focused local processing

### 🔍 RAG & Knowledge

**Graphify-Labs/graphify** ⭐ 109,283 total
- Codebase → queryable knowledge graph
- Deterministic AST parsing, no vector store, mọi edge được giải thích

**langgenius/dify** ⭐ 153,148 total
- Agentic workflows + RAG pipelines
- Cloud/VPC/self-hosted, prototype to production

**headroomlabs-ai/headroom** ⭐ 67,122 total
- Compress tool outputs trước khi đến LLM
- 20% fewer tokens for coding, 60-95% for JSON

**infiniflow/ragflow** ⭐ 88,999 total
- Leading RAG engine fused với Agent capabilities
- Superior context layer for LLMs

**Shubhamsaboo/awesome-llm-apps** ⭐ 133,517 total
- 100+ AI Agents, Agent Skills và RAG Apps
- Free and open source collection

### 🔌 Embedded AI

**GatekeeperZA/RKLLM-API-Server** ⭐ 20
- OpenAI-compatible API cho Rockchip NPU (RK3588/RK3576)
- Local LLM inference trên Orange Pi với Open WebUI

**Hanzo-Huang/rkllm-docker** ⭐ 9
- Dockerized RKLLM runtime
- OpenAI-compatible API cho Rockchip NPU models

**Leon6225/InternVL3.5-4B-NPU** ⭐ 5
- Multimodal AI (InternVL3.5-4B) cho RK3588 NPU
- Vision + language understanding trên edge

**hejianglin2001/rk3588_voice_assistant_ros2** ⭐ 1
- RK3588 offline voice + vision detection (ROS2 Humble)
- Full pipeline: Mic→VAD→ASR→LLM→YOLO, hoàn toàn offline

**jaylfc/taOS** ⭐ 494
- Self-hosted AI agent OS cho consumer hardware
- Offline-first, auto-clustering across Orange/Raspberry Pi, Mac mini

**gregordinary/ggml-rocket** ⭐ 13
- Drop-in ggml backend cho Rockchip NPUs
- Offload llama.cpp/whisper.cpp prefill to RK3588

**gregordinary/rocket-userspace** ⭐ 10
- Userspace driver cho Rockchip NPUs
- Mainline rocket DRM-accel driver integration

**isac322/rkmon** ⭐ 7
- Real-time hardware monitor TUI cho RK3588
- GPU, NPU, VPU, RGA, thermal monitoring

## 🔥 Phân tích tín hiệu xu hướng

### 1. **Agent Harness Wars**
Sự cạnh tranh khốc liệt giữa các agent optimization frameworks. ECC, ruflo, superpowers, skills đều cùng launch trong khoảng thời gian tương tự, phản ánh nhu cầu cấp thiết về:
- Performance optimization cho coding agents
- Standardized skills/instincts architecture
- Memory management across sessions
- Security và research-first development

### 2. **Skills-as-Code Movement**
Từ mattpocock/skills đến obra/superpowers, xu hướng quản lý agent capabilities như filesystem thay vì hardcoded. Cho phép:
- Version control agent behaviors
- Community sharing và reuse
- Modular composition
- Declarative agent definition

### 3. **Local-First AI Renaissance**
Nhiều projects nhấn mạnh "self-hosted", "local-first", "offline-by-default":
- siyuan-note: knowledge workspace cho humans + AI agents
- jaylfc/taOS: full AI agent OS chạy offline
- Mintplex-Labs/anything-llm: "Stop renting your intelligence"

Phản ánh privacy concerns và desire for data sovereignty.

### 4. **Rockchip NPU Ecosystem Maturation**
Toolchain cho RK3588/RK3576 NPU đang hoàn thiện:
- OpenAI-compatible API servers
- Docker containerization
- Multimodal model support (InternVL3.5)
- Integration với llama.cpp/ggml
- Full offline voice assistants with ROS2

Orange Pi đang trở thành platform nghiêm túc cho edge AI deployment.

### 5. **Context Compression Arms Race**
Với context window limits, nhiều giải pháp compression:
- headroom: 20-95% token reduction
- JuliusBrussee/caveman: 65% cut bằng "caveman speak"
- thedotmack/claude-mem: AI-compressed memory injection

Optimization cho token economy đang là priority.

### 6. **Agent Observability & Memory**
Append-only logs (apache/maka), persistent context (claude-mem), knowledge graphs (graphify) - tất cả đều giải quyết vấn đề:
- Agent actions must be auditable
- Context must persist across sessions
- Debugging agent behavior requires full trace

### 7. **Vertical AI Applications Boom**
Từ general frameworks đến specific solutions:
- career-ops: job search automation
- ppt-master: document-to-PowerPoint
- daily_stock_analysis: market analysis
- MoneyPrinterTurbo: video generation

AI moving from infrastructure to real-world applications.

## 🌟 Tâm điểm cộng đồng

### **mattpocock/skills** - The "Developer's .agents Directory"
3,362 stars trong một ngày cho thấy community đang khát khao standardization trong agent development. Matt Pocock (TypeScript educator nổi tiếng) mang developer experience mindset vào AI agents.

### **Agent Harness Proliferation**
5+ competing frameworks (ECC, ruflo, superpowers, apache/maka) cùng launch gần như đồng thời. Điều này cho thấy:
- Market validation: agent optimization là bottleneck thực sự
- Lack of standards: chưa có dominant player
- Experimentation phase: community đang khám phá best practices

### **Rockchip NPU "Dark Horse"**
Trong khi mọi người focus vào NVIDIA/Apple Silicon, Rockchip ecosystem quietly building:
- 20+ repos về RKLLM/RKNPU trong 7 ngày
- Full toolchain từ userspace drivers đến ROS2 integration
- Price/performance compelling cho edge deployment

### **"Local-First" Zeitgeist**
Các projects như taOS, siyuan-note, anything-llm đều emphasize "own your intelligence". Phản ánh backlash against cloud dependency và data privacy concerns. Community muốn "sovereign AI".

### **Compression Innovation**
caveman (65% reduction via simplified language) là creative approach cho token optimization. Shows community thinking outside the box - không chỉ technical compression mà còn linguistic optimization.

---

**Kết luận**: Ngày 22/08/2026 đánh dấu sự chuyển mình từ "AI infrastructure" sang "AI optimization" phase. Community không còn hỏi "how to build agents" mà hỏi "how to build BETTER agents". Embedded AI trên consumer hardware (Orange Pi) và local-first movement đang là undercurrents mạnh mẽ. Agent harness wars chưa có winner, nhưng skills-as-code pattern đang emerge as potential standard.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*