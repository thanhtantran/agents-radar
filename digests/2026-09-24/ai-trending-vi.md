# Xu hướng AI Mã nguồn mở 2026-09-24

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-24 02:00 UTC

---

# Báo cáo Xu hướng GitHub AI Mã nguồn mở - 24/09/2026

## 🎯 Tóm tắt hôm nay

Sóng agentic mạnh nhất từ trước đến nay. Cộng đồng chuyển từ "AI chat" sang "AI orchestration". Google, Anthropic chính thức tham chiến với runtime và framework. Embedded AI (RK3588 NPU) đạt mốc triển khai production với mainline kernel driver. "Agent-native" trở thành design pattern chính thống.

---

## 🔥 Top Repos Theo Chiều

### 🤖 AI Agents

**google/ax** ⭐ +1,543 (Go)
- Google release agentic orchestration runtime mã nguồn mở
- Tín hiệu: big tech chính thức đổ tiền vào agent infrastructure

**agent-substrate/substrate** ⭐ +558 (Go)
- Core system cho agent orchestration
- Pattern: substrate layer tách biệt agent logic khỏi execution

**strands-agents/harness-sdk** ⭐ +115 (Python)
- Production-grade agent harness
- Python + TypeScript, any model, any cloud
- Control end-to-end agent lifecycle

**obra/superpowers** ⭐ +474 (Shell)
- Agent skills framework + methodology
- Tín hiệu: community cần standardized skill system

**BuilderIO/agent-native** ⭐ +87 (TypeScript)
- Framework cho agentic apps
- "Agent-native" = design pattern chính thức

**HKUDS/CLI-Anything** ⭐ +57 (Python)
- Make ALL software agent-native
- CLI-Hub: https://clianything.cc/

### 🔧 AI Infrastructure

**anthropics/financial-services** ⭐ +664 (Python)
- Anthropic tấn công vertical: financial services
- Tín hiệu: từ model provider → solution builder

**davila7/claude-code-templates** ⭐ +389 (Python)
- CLI config + monitoring cho Claude Code
- Developer tooling layer đang bùng nổ

**superdesigndev/treg** ⭐ +506 (Python)
- OpenRouter for agent tools
- Discord: https://discord.gg/6mQYYfFMAn

**DeusData/codebase-memory-mcp** ⭐ +190 (C)
- High-performance code intelligence MCP server
- Persistent knowledge graph, 158 languages, sub-ms queries
- Single static binary, zero dependencies
- Tín hiệu: code understanding = infrastructure layer

### 📦 AI Applications

**dream-num/univer** ⭐ +1,142 (TypeScript)
- Office Harness cho AI Agents
- Spreadsheets + Docs + Slides + Canvas + Tables + PDF
- Single runtime

**Open-Dev-Society/OpenStock** ⭐ +344 (TypeScript)
- Open-source alternative cho market platforms
- Real-time prices, alerts, company insights

**browser-use/video-use** ⭐ +746 (Python)
- Edit videos with coding agents
- Pattern: vertical agent cho creative workflows

**TNT-Likely/PanWatch** ⭐ +95 (Python)
- Self-hosted AI trading assistant
- Multi-agent investment decisions
- A股/港股/美股 real-time monitoring

**pbakaus/impeccable** ⭐ +304 (JavaScript)
- Design language for AI harness
- AI-first design system

### 🔌 Embedded AI (Hot!)

**Leon6225/InternVL3.5-4B-NPU** ⭐ 5 (C++)
- InternVL3.5-4B cho RK3588 NPU
- Multimodal AI on edge

**ambagesthickskin162/Qwen3.5-4B-NPU** ⭐ 1 (C++)
- Qwen3.5-4B deployment trên NPU
- Local inference efficiency

**dnhkng/open-rknpu** ⭐ 5 (Python)
- Open compiler cho Rockchip RV1103/RV1106 NPU
- **No vendor SDK, no RKNN library, no captured binaries**
- Tín hiệu: community reverse-engineer NPU stack

**ruisv/rcdl** ⭐ 1 (C++)
- RKNPU inference + media library
- RK3588/RK3576/RK356x support
- C++17 + Python, zero-copy pipelines

**gjing1st/rk3588-device-plugin** ⭐ 0 (Go)
- Kubernetes device plugin cho RK3588 NPU
- Sysfs auto-detection, 3-unit scheduling
- 麒麟 V10 + openEuler 22.03 信创 support

**darkautism/RockNPU** ⭐ 0 (Rust)
- Open-source Rust userspace runtime + compiler
- Mainline Linux for Rockchip NPUs

**ZephyrSai/rockchip_yolo** ⭐ 0 (Shell)
- YOLO11/YOLO26 diagnostic suite
- RK3588/RK3576 NPU + Mali GPU + CPU
- Linux + Android

**jaylfc/taOS** ⭐ 547 (Python)
- **Self-hosted AI agent OS**
- Memory + chat + agents + files on hardware you own
- Offline by default, cloud by choice
- Auto-clustering Orange/Raspberry Pi, Mac mini, gaming PC

**jaylfc/taosmd** ⭐ 79 (Python)
- Local-first AI memory
- Runs offline on 8 GB+ RAM (SBC, mini PC, laptop)
- Zero-loss verbatim archive, knowledge graph

### 🔍 RAG & Knowledge

Không có repo nổi bật trong trending hôm nay. Search results cho thấy các dự án established (RAGFlow, LlamaIndex, Mem0) ổn định.

### 🧠 Models & Training

**mvt-project/mvt** ⭐ +543 (Python)
- Mobile Verification Toolkit
- Forensics cho mobile devices, phát hiện compromise
- Niche nhưng star spike = ý thức security tăng

**harry7557558/spirula-studio** ⭐ +69 (C++)
- 3D Gaussian Splatting trainer
- Video → splat → mesh
- Vulkan hoặc CUDA

---

## 📊 Phân tích Tín hiệu Xu hướng

### 1. **Agent Orchestration = New Infrastructure Layer**
- Google (ax), agent-substrate (substrate), strands-agents (harness-sdk) cùng release
- Pattern: runtime → harness → skills
- Go dominant cho orchestration layer (performance + concurrency)

### 2. **"Agent-Native" = Design Philosophy**
- BuilderIO/agent-native: framework
- CLI-Anything: make ALL software agent-native
- Impeccable: design language for agent harness
- Shift: không build "AI feature", build "agent-first system"

### 3. **Embedded AI Đột phá Production**
- RK3588 NPU mainline kernel driver (DKMS packaging)
- Kubernetes device plugin
- Open compiler + runtime (no vendor SDK)
- Tín hiệu: edge AI từ prototype → production infrastructure

### 4. **Vertical Solutions > Model APIs**
- Anthropic: financial-services
- TNT-Likely: PanWatch (trading)
- Open-Dev-Society: OpenStock
- Pattern: từ "AI platform" → "AI solution cho domain X"

### 5. **Self-hosted Agent OS**
- taOS: full OS cho AI agents, offline-first
- taosmd: local-first memory
- Mint: own your intelligence
- Xu hướng: anti-cloud, pro-ownership

### 6. **MCP Server Ecosystem**
- codebase-memory-mcp: code intelligence
- claude-mem: persistent context
- Pattern: MCP = plugin system cho agents

---

## 🌟 Tâm điểm Cộng đồng

### **Google Ax** (+1,543 stars)
Sự kiện lớn: Google chính thức tham chiến agentic infrastructure. Open runtime = they chọn battle ground: orchestration layer, không phải model.

### **Univer** (+1,142 stars)
Office suite FOR agents, not BY agents. Paradigm shift: office software = agent execution environment.

### **Browser-use/video-use** (+746 stars)
Coding agents edit videos. Tín hiệu: creative workflows next frontier for agents.

### **Anthropic Financial Services** (+664 stars)
Model company build vertical solutions. Industry = thay đổi Go-To-Market strategy.

### **taOS** (+547 stars)
Self-hosted agent OS cho consumer hardware. Democratize AI agents = chạy trên Pi, Mac mini, gaming PC. Offline-first = major differentiator.

### **Open-RKNPU** (+5 stars small but critical)
No vendor SDK. Pure open stack. Community reverse-engineer NPU. Historic moment cho embedded AI independence.

---

## 💡 Insight Chiến lược

1. **Investment Thesis**: Agent orchestration infrastructure = next $B category. Google bet early.

2. **Developer Mindset**: "Agent-native" = new default. Like "mobile-first" năm 2010, "cloud-native" năm 2015.

3. **Edge AI**: RK3588 NPU với mainline kernel = Android moment cho AI edge. Ecosystem mature.

4. **Ownership Movement**: Self-hosted agent OS (taOS) + local-first memory (taosmd) = phản ứng anti-cloud. Privacy + control.

5. **Vertical Solutions**: Model providers → solution builders. Anthropic financial-services = signal: API business không đủ, cần own use case.

---

**Kết luận**: 24/09/2026 = peak agentic infrastructure. Google vào cuộc, community standardize patterns, embedded AI production-ready, self-hosted movement mạnh. AI development shift from "call API" to "orchestrate agents". Next 6 months: agent marketplace + skill ecosystem sẽ explode.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*