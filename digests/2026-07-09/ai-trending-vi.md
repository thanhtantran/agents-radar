# Xu hướng AI Mã nguồn mở 2026-07-09

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-07-09 02:00 UTC

---

# 📊 Báo cáo xu hướng AI mã nguồn mở - 09/07/2026

## 1. 🎯 Tóm tắt hôm nay

Hôm nay đánh dấu **sự chuyển mình mạnh mẽ từ AI đơn thuần sang kỷ nguyên AI Agents**. Cộng đồng đang tập trung vào việc **trang bị kỹ năng và khả năng hành động** cho các agents, thay vì chỉ tập trung vào models. 

Điểm nổi bật:
- **Agent Skills** trở thành hot topic với 3 repos đạt 1000+ stars trong ngày
- **Local-first & Privacy** đang là ưu tiên hàng đầu (TencentDB Agent Memory với zero external dependencies)
- **Edge AI** bùng nổ với ecosystem hoàn chỉnh xung quanh Rockchip NPU
- **Multi-modal agents** mở rộng khả năng từ text sang video, WiFi signals, và document processing

## 2. 📂 Top repos theo chiều

### 🤖 AI Agents

**addyosmani/agent-skills** ⭐ +1,297
- Production-grade engineering skills cho AI coding agents
- Tín hiệu: Cộng đồng đang chuẩn hóa các kỹ năng cần thiết cho agents trong môi trường production

**obra/superpowers** ⭐ +1,116
- Agentic skills framework & methodology
- Điểm mạnh: Không chỉ là code mà còn là methodology hoàn chỉnh

**mvanhorn/last30days-skill** ⭐ +352
- Multi-source research agent (Reddit, X, YouTube, HN, Polymarket)
- Xu hướng: Agents tổng hợp thông tin từ nhiều nguồn và sinh ra insights

### 🔧 AI Infrastructure

**TencentCloud/TencentDB-Agent-Memory** ⭐ +318
- Local long-term memory với 4-tier progressive pipeline
- **Zero external API dependencies** - đây là điểm nhấn quan trọng về privacy

**TencentCloud/CubeSandbox** ⭐ +564
- Instant, concurrent, secure sandbox cho AI agents
- Giải quyết bài toán an toàn khi cho agents quyền thực thi code

**wonderwhy-er/DesktopCommanderMCP** ⭐ +28
- MCP server cho Claude: terminal control + file system + diff editing
- Tín hiệu: MCP (Model Context Protocol) đang được adopt rộng rãi

### 🧠 Models & Training

**asgeirtj/system_prompts_leaks** ⭐ +1,218
- Extracted system prompts từ các model lớn (Claude, ChatGPT, Gemini, Grok)
- Giá trị: Transparency về cách các model được prompt internally

### 📦 AI Applications

**iOfficeAI/OfficeCLI** ⭐ +1,717
- Office suite cho AI agents (Word, Excel, PowerPoint)
- Single binary, no Office installation required
- Xu hướng: Vertical tools specifically designed for agents

**bradautomates/claude-video** ⭐ +951
- Cho Claude khả năng "xem" video qua frame extraction + transcription
- Multi-modal capability mở rộng use cases

**ruvnet/RuView** ⭐ +799
- WiFi signals → spatial intelligence + vital sign monitoring
- **Zero pixel video** - sử dụng commodity WiFi thay vì camera
- Breakthrough trong privacy-preserving sensing

### 🔍 RAG & Knowledge

**alibaba/zvec** ⭐ +395
- Lightweight, lightning-fast, in-process vector database
- Xu hướng: Vector DBs nhỏ gọn cho edge/local deployment

### 🔌 Embedded AI

#### Rockchip NPU Ecosystem (RKLLM/RKNPU)

**NotPunchnox/rkllama** ⭐ 570
- Ollama alternative cho Rockchip NPU
- Optimized NPU support cho RK devices

**Leon6225/InternVL3.5-4B-NPU** ⭐ 3
- Multi-modal AI (vision + language) trên RK3588 NPU
- Tín hiệu: Multi-modal đang được port xuống edge devices

**gregordinary/ggml-rocket** ⭐ 3
- Drop-in ggml backend cho Rockchip NPUs
- Offload llama.cpp/whisper.cpp prefill lên NPU

**gregordinary/rocket-userspace** ⭐ 3
- Userspace driver + matmul library cho RK3588 NPU
- Via mainline rocket DRM-accel driver

**YeWenxuan64/rktop** ⭐ 6
- Real-time monitoring tool cho RK3588 (CPU, NPU, GPU, RGA)
- DevEx tools cho embedded AI development

#### Orange Pi & Edge AI

**jaylfc/taOS** ⭐ 411
- Self-hosted AI agent OS
- Offline-first, local memory, auto-clustering across consumer hardware
- Runs on Orange Pi, Raspberry Pi, Mac mini, gaming PC

**jaylfc/taosmd** ⭐ 66
- Local-first AI memory - offline on 8GB+ RAM machines
- Zero-loss verbatim archive + knowledge graph

## 3. 🔮 Phân tích tín hiệu xu hướng

### 🎯 Agent Skills as First-Class Citizens
Cộng đồng đang chuẩn hóa "skills" như các building blocks có thể tái sử dụng. Không còn là monolithic agents mà là **composable skill systems**.

### 🔐 Privacy-First & Local-First
- Zero external dependencies (TencentDB)
- Offline-by-default (taOS, taosmd)
- Self-hosted infrastructure
- Tín hiệu: Phản ứng với concerns về data privacy và vendor lock-in

### 🏭 Production-Grade Agent Infrastructure
- Sandboxing (CubeSandbox)
- Memory management (Agent Memory)
- Security controls
- Xu hướng: Agents đang chuyển từ demos sang production deployments

### 🌐 Edge AI Maturity
Rockchip NPU ecosystem đang phát triển đầy đủ:
- Drivers (rocket-userspace)
- Backends (ggml-rocket, tflite-rocket)
- Tools (rktop)
- Applications (rkllama, InternVL3.5-4B-NPU)

### 🎨 Multi-Modal Expansion
Agents không chỉ text:
- Video processing (claude-video)
- WiFi sensing (RuView)
- Document automation (OfficeCLI)
- Vision + Language (InternVL3.5)

### 🔧 Tooling for Agents
- MCP protocol adoption
- Terminal control capabilities
- File system operations
- Structured editing (diff-based)

## 4. 🔥 Tâm điểm cộng đồng

### 🏆 Top Gainers (1000+ stars trong ngày)

1. **addyosmani/agent-skills** (+1,297)
   - Timing hoàn hảo: market cần standardization
   - Backed by credibility (Addy Osmani - Google Chrome team)

2. **asgeirtj/system_prompts_leaks** (+1,218)
   - Controversial nhưng valuable
   - Transparency movement trong AI

3. **iOfficeAI/OfficeCLI** (+1,717)
   - Giải quyết pain point thực tế
   - Agents cần tương tác với legacy formats

4. **Diolinux/PhotoGIMP** (+1,125)
   - Không phải AI thuần nhưng nằm trong ecosystem
   - UX improvements cho creative tools

### 🌊 Emerging Waves

**Rockchip NPU Community**
- Ecosystem đang build momentum mạnh
- Multiple maintainers (gregordinary, NotPunchnox, Leon6225)
- Infrastructure hoàn chỉnh từ driver → application layer

**Agent Memory & Context**
- Long-term memory solutions
- Local-first approaches
- Multi-tier architectures

**Agent Safety & Sandboxing**
- Security concerns được address nghiêm túc
- Concurrent execution environments
- Isolation mechanisms

### 💡 Insights

**"Skills over Models"** - Cộng đồng đang shift focus từ model capabilities sang **what agents can actually do**. Skills framework sẽ là abstraction layer quan trọng.

**"Local beats Cloud"** - Privacy concerns + cost optimization đang drive movement về local/edge AI. Hardware improvements (NPUs) làm cho local deployment khả thi hơn.

**"Multi-modal is the new normal"** - Text-only agents đã không còn đủ. Video, audio, sensing, documents - tất cả đang được integrate.

**"Production-ready matters"** - Community đã vượt qua giai đoạn demos. Bây giờ cần sandboxing, memory, security, monitoring.

---

**Kết luận**: Ngày 09/07/2026 đánh dấu sự trưởng thành của AI agent ecosystem với focus vào **production readiness**, **privacy**, và **practical capabilities** thay vì chỉ showcasing. Edge AI với Rockchip NPU đang tạo ra một alternative path cho AI deployment ngoài cloud giants.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*