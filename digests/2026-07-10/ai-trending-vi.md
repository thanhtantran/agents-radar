# Xu hướng AI Mã nguồn mở 2026-07-10

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-10 02:00 UTC

---

# Báo cáo phân tích xu hướng AI mã nguồn mở - 2026-07-10

## 1. Tóm tắt hôm nay

Cộng đồng mã nguồn mở AI đang chứng kiến sự bùng nổ mạnh mẽ của **AI Agents tự động hóa công việc thực tế** - từ tìm việc, giao dịch chứng khoán đến penetration testing. Xu hướng nổi bật nhất là việc các coding agent (Claude Code, Codex, Opencode) trở thành nền tảng để xây dựng các ứng dụng tự động hóa phức tạp. 

Bên cạnh đó, hệ sinh thái **Rockchip NPU** đang có bước đột phá với các driver mã nguồn mở và runtime mới, mở ra khả năng chạy AI trên thiết bị nhúng với hiệu suất cao. RAG và knowledge management cũng tiếp tục phát triển mạnh với các giải pháp local-first và privacy-first.

## 2. Top repos theo chiều

### 🤖 AI Agents

**MadsLorentzen/ai-job-search** (+3,716 ⭐ hôm nay)
- Framework tự động hóa toàn bộ quy trình tìm việc: đánh giá job, tạo CV theo từng vị trí, viết cover letter, chuẩn bị phỏng vấn
- Chạy trên Claude Code, cho thấy xu hướng sử dụng coding agent cho automation thực tế
- TypeScript, dễ fork và customize cho nhu cầu cá nhân

**addyosmani/agent-skills** (+2,554 ⭐)
- Bộ skills production-grade cho AI coding agents
- Từ Google Chrome team, đảm bảo chất lượng enterprise
- JavaScript, tập trung vào engineering skills thực chiến

**vxcontrol/pentagi** (+535 ⭐)
- AI Agent tự động penetration testing
- Golang, fully autonomous, thực hiện các tác vụ bảo mật phức tạp
- Cho thấy AI agent đang thâm nhập vào cybersecurity

**NousResearch/hermes-agent** (212K+ ⭐)
- "The agent that grows with you" - agent có khả năng học và phát triển
- Python, top 1 trong tìm kiếm ai-agent
- Từ Nous Research, đội ngũ đứng sau các mô hình open source chất lượng cao

**ZhuLinsen/daily_stock_analysis** (56K+ ⭐)
- Hệ thống phân tích chứng khoán đa thị trường được LLM điều khiển
- Tích hợp nhiều nguồn dữ liệu, real-time news, dashboard quyết định
- Zero-cost scheduled runs, phù hợp cho retail investors

**zhayujie/CowAgent** (45K+ ⭐)
- Open-source super AI assistant
- Lập kế hoạch, chạy tools, tự tiến hóa với memory và knowledge
- Multi-model, multi-channel, cài đặt một dòng lệnh

### 🔧 AI Infrastructure

**iOfficeAI/OfficeCLI** (+1,929 ⭐)
- CLI đầu tiên và tốt nhất cho AI agents làm việc với Office suite
- C#, single binary, không cần cài Office
- Cho phép agents đọc, edit, tự động hóa Word/Excel/PowerPoint

**wonderwhy-er/DesktopCommanderMCP** (+185 ⭐)
- MCP server cho Claude với khả năng kiểm soát terminal, file system search, diff file editing
- TypeScript, mở rộng khả năng của Claude lên desktop environment
- Model Context Protocol đang trở thành chuẩn mở cho agent integration

**bradautomates/claude-video** (+718 ⭐)
- Cho phép Claude xem và phân tích video
- Python, tự động download, extract frames, transcribe
- Mở rộng khả năng multimodal của LLM

**thedotmack/claude-mem** (86K+ ⭐)
- Persistent context across sessions cho mọi agent
- Capture, compress, inject context vào future sessions
- Works với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot...

**affaan-m/ECC** (227K+ ⭐)
- Agent harness performance optimization system
- Skills, instincts, memory, security, research-first development
- Dành cho Claude Code, Codex, Opencode, Cursor...

**Graphify-Labs/graphify** (81K+ ⭐)
- AI coding assistant skill - biến code/docs/videos thành queryable knowledge graph
- Python, tích hợp app code + database schema + infrastructure
- RAG meets graph databases

**OpenHands/OpenHands** (80K+ ⭐)
- AI-Driven Development platform
- Python, open-source, autonomous development

### 🧠 Models & Training

**asgeirtj/system_prompts_leaks** (+1,125 ⭐)
- Collection các system prompts đã được extract từ Claude, GPT, Gemini, Grok, Cursor, Copilot...
- JavaScript, cập nhật thường xuyên
- Vô giá cho việc học cách prompt engineering và hiểu cách các hệ thống AI được thiết kế

**kyutai-labs/pocket-tts** (+235 ⭐)
- Text-to-Speech nhỏ gọn chạy được trên CPU
- Python, "fits in your pocket"
- Xu hướng democratize AI với models chạy được trên hardware phổ thông

**ollama/ollama** (175K+ ⭐)
- Platform chạy local LLMs: Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, Qwen, Gemma...
- Go, dễ cài đặt và sử dụng
- Standard de facto cho local LLM deployment

### 📦 AI Applications

**VoltAgent/awesome-design-md** (+1,391 ⭐)
- Collection các DESIGN.md files từ popular brand design systems
- Cho phép coding agents generate matching UI
- Chuẩn hóa design system cho AI-generated UIs

**unclecode/crawl4ai** (+215 ⭐)
- LLM-friendly web crawler & scraper
- Python, open-source, tối ưu cho AI workflows
- Essential tool cho data collection và RAG pipelines

**hugohe3/ppt-master** (38K+ ⭐)
- AI tạo PowerPoint thực sự từ bất kỳ document nào
- Native shapes, animations, editable charts, speaker notes với audio narration
- Python, có thể follow template .pptx của bạn

**santifer/career-ops** (59K+ ⭐)
- Open-source AI job search
- Scan job portals, score A-F, tailor CV, track applications
- JavaScript, chạy locally trong AI coding CLI

**browser-use/browser-use** (103K+ ⭐)
- Make websites accessible for AI agents
- Python, automate tasks online
- Web automation cho agents

### 🔍 RAG & Knowledge

**langgenius/dify** (148K+ ⭐)
- Production-ready platform cho agentic workflow development
- TypeScript, đầy đủ tính năng cho enterprise
- Top 1 trong RAG ecosystem

**open-webui/open-webui** (144K+ ⭐)
- User-friendly AI interface
- Python, hỗ trợ Ollama, OpenAI API...
- Self-hosted, privacy-first

**langchain-ai/langchain** (141K+ ⭐)
- The agent engineering platform
- Python, framework chuẩn cho LLM applications
- Ecosystem lớn nhất cho agent development

**Shubhamsaboo/awesome-llm-apps** (117K+ ⭐)
- 100+ AI Agent & RAG apps có thể chạy ngay
- Python, clone, customize, ship
- Resource tuyệt vời cho việc học và implement

**infiniflow/ragflow** (84K+ ⭐)
- RAG engine kết hợp với Agent capabilities
- Go, context layer cao cấp cho LLMs
- Production-ready, scalable

**Mintplex-Labs/anything-llm** (63K+ ⭐)
- "Stop renting your intelligence. Own it."
- JavaScript, local-first agent experience
- Privacy-focused, powerful

**mem0ai/mem0** (60K+ ⭐)
- Universal memory layer cho AI Agents
- Python, persistent context management
- Critical infrastructure cho stateful agents

**jaylfc/taOS** (+416 ⭐)
- Self-hosted AI agent OS
- Memory, chat, agents, files trên hardware bạn sở hữu
- Offline by default, cloud by choice
- Python, auto-clustering trên Orange/Raspberry Pi, Mac mini, gaming PC

**jaylfc/taosmd** (+66 ⭐)
- Local-first AI memory
- Chạy offline trên bất kỳ máy nào với 8GB+ RAM
- Python, zero-loss verbatim archive, knowledge graph, hybrid retrieval

### 🔌 Embedded AI

**NotPunchnox/rkllama** (572 ⭐)
- Ollama alternative cho Rockchip NPU
- Python, giải pháp hiệu quả cho RK3588
- Tối ưu hóa RKLLM support

**gregordinary/ggml-rocket** (4 ⭐)
- Drop-in ggml backend cho Rockchip NPUs
- C++, offload llama.cpp/whisper.cpp prefill lên RK3588 NPU
- Breakthrough cho edge AI

**gregordinary/rocket-userspace** (4 ⭐)
- Userspace driver, matmul, on-NPU op library cho Rockchip NPUs
- C, via mainline rocket DRM-accel driver
- Open-source driver cho RK3588

**fukumori/iwagumi** (2 ⭐)
- Open runtime điều khiển RK3588 NPU trực tiếp
- C, offload GGUF matmul qua ggml backend
- Apache-2.0, clean implementation

**Leon6225/InternVL3.5-4B-NPU** (3 ⭐)
- Multimodal AI InternVL3.5-4B cho RK3588 NPU
- C++, vision và language understanding
- Đưa multimodal lên embedded devices

**YeWenxuan64/rktop** (6 ⭐)
- Lightweight Bash script monitor RK3588 CPU, NPU, GPU, RGA
- Shell, real-time performance monitoring
- Essential tool cho RK3588 developers

**MichaIng/DietPi** (6,141 ⭐)
- "Lightweight justice for your single-board computer"
- Shell, tối ưu cho Orange Pi và SBCs khác
- Base OS tốt nhất cho embedded AI

**jym66/openWRT-OrangePiZero3** (60 ⭐)
- OpenWRT cho Orange Pi Zero 3
- Shell, networking capabilities cho edge devices
- Alternative firmware cho IoT và edge computing

## 3. Phân tích tín hiệu xu hướng

### 🔥 Coding Agents làm nền tảng cho Real-world Automation
Không còn chỉ là code assistant, coding agents (Claude Code, Codex, Opencode) đang trở thành **platform** để xây dựng các ứng dụng tự động hóa phức tạp. Từ tìm việc (ai-job-search), trading (daily_stock_analysis), đến pentesting (pentagi) - tất cả đều chạy trên coding agent infrastructure.

### 🧩 Model Context Protocol (MCP) đang thành chuẩn
MCP servers như DesktopCommanderMCP cho thấy một chuẩn mở đang hình thành cho việc mở rộng khả năng của agents. Khả năng tương tác với desktop, file system, và external tools thông qua MCP sẽ là game-changer.

### 🏠 Local-first và Privacy-first AI đang lên ngôi
Các dự án như taOS, taosmd, anything-llm, open-webui nhấn mạnh vào "own your intelligence", offline by default, cloud by choice. Phản ánh concern về privacy và data sovereignty đang gia tăng.

### 💾 Persistent Memory cho Agents là must-have
Claude-mem (86K ⭐) và mem0 (60K ⭐) cho thấy **context persistence** là yếu tố then chốt để agents thực sự hữu dụng. Agents cần nhớ và học từ các sessions trước.

### 🎯 Knowledge Graphs meet RAG
Graphify (81K ⭐) đại diện cho xu hướng kết hợp graph databases với RAG. Code, schemas, và docs được tổ chức thành knowledge graphs giúp LLMs reasoning tốt hơn nhiều so với vector search thuần túy.

### 🔌 Rockchip NPU Ecosystem đang bùng nổ
Từ drivers (rocket-userspace), runtimes (iwagumi, rkllama), đến multimodal models (InternVL3.5-4B-NPU) - hệ sinh thái open-source cho RK3588 NPU đang phát triển nhanh chóng. Đây là alternative thực sự cho NVIDIA cho edge AI với giá thành hợp lý.

### 📄 Design Systems cho AI-generated UI
Awesome-design-md cho thấy trend mới: chuẩn hóa design language để AI agents có thể generate UI consistent với brand guidelines. "DESIGN.md" có thể trở thành convention như README.md.

### 🎬 Multimodal expansion
Claude-video, InternVL3.5 cho thấy LLMs đang được mở rộng ra ngoài text. Video understanding và vision-language models đang democratize với các giải pháp local/edge.

## 4. Tâm điểm cộng đồng

### 🌟 Top 3 Breakout Projects

**1. ai-job-search (+3,716 ⭐)** - Hit the nerve
- Giải quyết pain point lớn: job search automation
- Timing hoàn hảo khi layoffs vẫn đang diễn ra
- Showcase thực tế về khả năng của coding agents

**2. agent-skills (+2,554 ⭐)** - From Google Chrome team
- Production-grade skills from trusted source
- Fills gap giữa research và production
- Community đang cần standards và best practices

**3. iOfficeAI/OfficeCLI (+1,929 ⭐)** - Unlock huge use case
- Office automation là use case massive
- Single binary, no dependencies = easy adoption
- Mở cửa cho agents vào enterprise workflows

### 🔬 Technical Excellence

**asgeirtj/system_prompts_leaks** (+1,125 ⭐)
- Transparent về cách các AI systems được design
- Vô giá cho prompt engineering community
- Educational value cực cao

**gregordinary's Rockchip NPU stack** (ggml-rocket, rocket-userspace, patches)
- Serious technical achievement
- Mainline kernel driver + userspace stack
- Có thể thay đổi game cho edge AI

### 💡 Visionary Projects

**taOS/taosmd** (+416/+66 ⭐)
- "Self-hosted AI agent OS" là vision đúng hướng
- Offline-first, auto-clustering, privacy-first
- Tận dụng consumer hardware có sẵn

**Graphify** (81K+ ⭐)
- Knowledge graph approach là future của RAG
- Kết nối code + schema + docs + infra
- Next-generation context understanding

---

**Kết luận**: Ngày 2026-07-10 đánh dấu sự trưởng thành của AI agents từ demos sang **real-world production tools**. Coding agents không còn chỉ viết code - chúng đang orchestrate complex workflows, automate professional tasks, và become platforms cho innovation. Đồng thời, embedded AI với Rockchip NPU và local-first solutions cho thấy một future nơi AI không chỉ ở cloud mà ngay trong devices của chúng ta, với full privacy và ownership.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*