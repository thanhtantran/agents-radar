# Xu hướng AI Mã nguồn mở 2026-08-02

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-08-02 02:00 UTC

---

# 📊 Báo cáo Xu hướng AI Mã nguồn mở - 02/08/2026

## 🎯 Tóm tắt hôm nay

Hôm nay đánh dấu sự bùng nổ của **Agent Harness** - hệ thống quản lý và tối ưu hóa AI agents. Cộng đồng đang chuyển từ việc xây dựng agents đơn lẻ sang phát triển các **"operating systems" cho agents**, với memory, skill routing, và khả năng self-evolution. 

Đồng thời, xu hướng **edge AI** trên NPU (Neural Processing Unit) đang nóng lên mạnh mẽ, đặc biệt với chip RK3588 - mở ra kỷ nguyên AI chạy local trên hardware giá rẻ.

**Con số nổi bật**: 236K stars cho ECC - hệ thống tối ưu agent harness, cho thấy nhu cầu lớn về infrastructure chất lượng cao.

---

## 🔍 Top Repos Theo Chiều

### 🤖 AI Agents - Kỷ nguyên Agent Harness

**⭐ Trending hôm nay:**

1. **NousResearch/hermes-agent** (+223K stars) - "The agent that grows with you"
   - Agent có khả năng tự phát triển theo thời gian
   - Đại diện cho xu hướng "living agents" thay vì static tools

2. **shareAI-lab/learn-claude-code** (+72K stars) 
   - "Bash is all you need" - nano agent harness built from 0 to 1
   - Tutorial xây dựng agent từ đầu, không dependencies phức tạp

3. **zhayujie/CowAgent** (+46K stars)
   - Multi-model, multi-channel agent framework
   - Plans tasks, runs tools/skills, **self-evolves with memory**
   - Lightweight, one-line install

4. **bytedance/deer-flow** (+209 stars trending)
   - Long-horizon SuperAgent với sandboxes, memories, tools, **skill system**
   - Xử lý tasks từ vài phút đến vài giờ
   - ByteDance đang đầu tư mạnh vào agent infrastructure

**💡 Insight**: Skill routing system đang trở thành standard - cho phép agents tự động chọn công cụ phù hợp cho từng tác vụ.

---

### 🔧 AI Infrastructure - SDKs & Developer Tools

**⭐ Top picks:**

1. **github/copilot-sdk** (+142 stars trending)
   - Multi-platform SDK tích hợp GitHub Copilot Agent
   - GitHub đang mở rộng Copilot ra ngoài IDE

2. **TencentCloud/TencentDB-Agent-Memory** (+227 stars trending)
   - Team-level memory hub: Chat Memory, Skill, LLM-Wiki, Code-Graph
   - **4 loại memory assets có thể tái sử dụng** giữa các agents
   - Governance và sharing ở cấp độ team

3. **affaan-m/ECC** (236K stars) 
   - Agent harness performance optimization system
   - Skills, instincts, **memory**, security
   - Hỗ trợ Claude Code, Codex, Opencode, Cursor

4. **thedotmack/claude-mem** (+89K stars)
   - Persistent context across sessions
   - Captures + compresses + injects context vào future sessions
   - Framework-agnostic

**💡 Insight**: Memory management đang là bottleneck lớn nhất - các solutions đang tập trung vào compression và selective context injection.

---

### 🧠 Models & Inference Engines

**⭐ Nổi bật:**

1. **ollama/ollama** (177K stars)
   - Hỗ trợ Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, Gemma
   - Standard de facto cho local LLM inference

2. **vllm-project/vllm** (+87K stars)
   - High-throughput inference engine
   - Production-grade serving cho LLMs

3. **microsoft/TRELLIS.2** (+107 stars trending)
   - Native structured latents cho **3D generation**
   - Microsoft đang đẩy mạnh AI tạo nội dung 3D

4. **huggingface/speech-to-speech** (+442 stars trending)
   - Build local voice agents với open-source models
   - HuggingFace tập trung vào voice AI stack

**💡 Insight**: Multimodal đang mở rộng nhanh - từ text sang voice, 3D, vision. Inference engines phải optimize cho nhiều modalities.

---

### 📦 AI Applications - Vertical Solutions

**⭐ Use cases nổi bật:**

1. **santifer/career-ops** (+62K stars)
   - AI job search: scan, evaluate (A-F rubric), tailor CV, track
   - Chạy local trong AI coding CLI
   - Vertical rõ ràng: job hunting automation

2. **ZhuLinsen/daily_stock_analysis** (+59K stars)
   - LLM-driven multi-market stock analysis
   - Real-time news, decision dashboard, **automated notifications**
   - Hỗ trợ zero-cost scheduled runs

3. **hugohe3/ppt-master** (+42K stars)
   - AI turns docs → native PowerPoint với shapes, animations, charts
   - Audio narration from speaker notes
   - Template support

4. **CherryHQ/cherry-studio** (+49K stars)
   - AI productivity studio: chat + **autonomous agents** + 300+ assistants
   - Unified access to frontier LLMs

**💡 Insight**: AI applications đang move beyond chat - focus vào workflows cụ thể (job search, stock analysis, content creation) với automation end-to-end.

---

### 🔍 RAG & Knowledge Systems

**⭐ Top RAG platforms:**

1. **langgenius/dify** (151K stars)
   - Agentic workflows + RAG pipelines
   - Deploy cloud/VPC/self-hosted
   - **Team collaboration** on one workspace

2. **open-webui/open-webui** (147K stars)
   - User-friendly AI interface
   - Ollama + OpenAI API support

3. **Graphify-Labs/graphify** (+100K stars)
   - Turn codebase → queryable **knowledge graph**
   - Local deterministic AST parsing
   - Skill for Claude Code, Cursor, Codex

4. **infiniflow/ragflow** (+86K stars)
   - RAG + **Agent capabilities**
   - Context layer cho LLMs

5. **headroomlabs-ai/headroom** (+63K stars)
   - Compress tool outputs, logs, files, RAG chunks
   - **20% fewer tokens for coding, 60-95% for JSON**
   - Library + proxy + MCP server

**💡 Insight**: Knowledge graphs đang thay thế vector stores cho structured data. Compression là key để giảm chi phí token với agents.

---

### 🔌 Embedded AI - NPU & Edge Computing

**⭐ Edge AI đang bùng nổ:**

#### Hardware Platforms:

1. **jaylfc/taOS** (+468 stars trending) 🔥
   - **Self-hosted AI agent OS**
   - Memory, chat, agents, files on hardware you own
   - **Offline by default, cloud by choice**
   - Auto-clustering across Orange/Raspberry Pi, Mac mini, gaming PC
   - Full web desktop + app store

2. **YeWenxuan64/rktop** (+7 stars)
   - Real-time monitoring RK3588: CPU, NPU, GPU, RGA
   - Lightweight Bash script

3. **jaylfc/taosmd** (+71 stars)
   - Local-first AI memory cho SBCs (8GB+ RAM)
   - Zero-loss verbatim archive + **knowledge graph**
   - Runs offline on Orange Pi, mini PC, laptop

#### NPU Development:

4. **Leon6225/InternVL3.5-4B-NPU** (+5 stars)
   - Multimodal AI cho RK3588 NPU
   - Vision + language understanding

5. **kyshipit/eai-rk3588** (+1 star)
   - Extensible RK3588 edge inference platform
   - Multi-threaded pipeline + **RKLLM chat**

6. **YeWenxuan64/Edge_Inferencer** (+1 star)
   - Unified API: Rockchip NPU + Qualcomm HTP + ONNX Runtime
   - Auto-detects .rknn/.bin/.onnx

#### Infrastructure:

7. **freed-dev-llc/terraform-provider-turingpi** (+7 stars)
   - Terraform provider for Turing Pi 2.5 BMC
   - IaC cho edge AI clusters

8. **gregordinary/patches** (+4 stars)
   - RK3588 mainline NPU driver patches
   - HW video-transcode patches

**💡 Insight**: RK3588 đang trở thành "Raspberry Pi của AI" - NPU 6 TOPS, giá ~$100, đủ chạy 4B-7B models. Cộng đồng đang xây dựng full software stack từ drivers đến OS.

---

## 📈 Phân Tích Tín Hiệu Xu Hướng

### 🔥 Xu hướng nổi bật

#### 1. **Agent Harness Architecture**
- **Pattern**: Skills + Memory + Routing + Self-Evolution
- **Ví dụ**: ECC, CowAgent, deer-flow, reverse-skill
- **Tại sao**: Agents cần infrastructure để scale - không thể hardcode tools cho mọi task

#### 2. **Memory-as-a-Service**
- **Pattern**: Persistent context, compression, selective injection
- **Ví dụ**: claude-mem, TencentDB-Agent-Memory, taosmd
- **Tại sao**: Context window limits là bottleneck - memory systems giải quyết bằng intelligent caching

#### 3. **Local-First AI**
- **Pattern**: Offline by default, cloud by choice
- **Ví dụ**: taOS, HKUDS/nanobot, taosmd
- **Tại sao**: Privacy concerns + cost optimization + reliability (không phụ thuộc cloud)

#### 4. **NPU Democratization**
- **Pattern**: RK3588 + Orange Pi + software stack
- **Ví dụ**: taOS clustering, Edge_Inferencer, rktop
- **Tại sao**: AI đang move từ cloud về edge - NPU $100 đủ chạy practical agents

#### 5. **Vertical AI Applications**
- **Pattern**: End-to-end automation cho specific workflows
- **Ví dụ**: career-ops (job search), daily_stock_analysis, ppt-master
- **Tại sao**: General chatbots đã commodity - value trong vertical solutions

#### 6. **Knowledge Graphs > Vector Stores**
- **Pattern**: Structured knowledge với AST parsing
- **Ví dụ**: Graphify, TencentDB Code-Graph
- **Tại sao**: Vector search không đủ cho code understanding - cần relationships và structure

---

### ⚡ Công nghệ đang nổi lên

1. **Skill Routing Systems**
   - Auto-select tools based on task context
   - Self-learning từ execution history
   
2. **Multi-Framework Agents**
   - Một agent chạy trên nhiều harnesses (Claude Code, Cursor, Codex)
   - Portable skills và memory

3. **Edge AI Clusters**
   - Auto-discovery và load balancing across SBCs
   - Distributed inference trên consumer hardware

4. **Token Compression**
   - 60-95% reduction cho JSON, logs
   - Semantic compression giữ nguyên meaning

5. **Terraform for Edge**
   - IaC cho Turing Pi, Orange Pi clusters
   - GitOps workflows cho edge infrastructure

---

## 🎪 Tâm Điểm Cộng Đồng

### 🏆 Repos đang viral

1. **NousResearch/hermes-agent** (223K stars)
   - Câu chuyện: "Agent that grows with you" - resonates với vision về AI companions
   - Tại sao viral: Nous Research có reputation mạnh, branding xuất sắc

2. **affaan-m/ECC** (236K stars)
   - Câu chuyện: Performance optimization cho agent harness - giải quyết pain point thực tế
   - Tại sao viral: Works với mọi major CLI agents, immediate value

3. **santifer/career-ops** (62K stars)
   - Câu chuyện: AI job search với A-F grading system
   - Tại sao viral: Practical solution cho universal problem, chạy local

### 🌊 Làn sóng công nghệ

**1. "Agent OS" Movement**
- taOS leading với full desktop environment
- Shift từ "tools" sang "operating systems" cho agents
- Community rallying around self-hosted infrastructure

**2. Chinese AI Ecosystem**
- ZhuLinsen, zhayujie, NomaDamas/k-skill
- Strong focus trên local deployment và practical applications
- Language-specific skills (k-skill cho Hàn Quốc, reverse-skill hỗ trợ Chinese)

**3. Embedded AI Renaissance**
- RK3588 trở thành standard platform
- Orange Pi từ hobby projects → production AI edge devices
- Software stack đang mature nhanh (drivers, tools, frameworks)

### 💬 Chủ đề discussion

1. **"Offline AI" vs Cloud**
   - Privacy, cost, reliability đang thắng cloud convenience
   - Cộng đồng đang prove rằng local AI is practical

2. **Skill Portability**
   - Developers muốn write skills once, run anywhere
   - Push for standardized skill formats

3. **Memory Management**
   - Token costs đang drive innovation trong compression
   - Debate: vector stores vs knowledge graphs vs hybrid

---

## 🎓 Bài học cho Developers

### Nếu bạn đang build agents:
✅ Đầu tư vào memory system từ đầu  
✅ Design cho multi-framework compatibility  
✅ Implement skill routing thay vì hardcode tools  
✅ Consider edge deployment từ ngày 1  

### Nếu bạn đang làm infrastructure:
✅ Optimize cho token efficiency (compression, caching)  
✅ Build cho collaboration (team-level memory, shared skills)  
✅ Support offline-first architecture  
✅ Think about NPU/edge as first-class targets  

### Nếu bạn đang làm applications:
✅ Pick một vertical cụ thể thay vì general purpose  
✅ Focus vào end-to-end automation workflows  
✅ Local-first → cloud optional  
✅ Leverage existing agent harnesses thay vì build from scratch  

---

**🚀 Bottom line**: 2026 là năm của **Agent Infrastructure**. Cộng đồng đã chứng minh agents hoạt động - giờ đang build foundations để scale chúng. Edge AI không còn là future - nó đang diễn ra hôm nay trên $100 Orange Pi boards.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*