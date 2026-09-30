# Xu hướng AI Mã nguồn mở 2026-09-30

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-30 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-09-30

## 1. Tóm tắt hôm nay

Làn sóng **AI Agent Infrastructure** bùng nổ. Cộng đồng chuyển từ chat đơn giản sang multi-agent orchestration, với focus vào:
- **Local-first runtime** (OpenShell, Hindsight, Paperclip)
- **Voice AI** hoàn toàn offline (VoiceStudio - 4758⭐ trong ngày)
- **Agent memory systems** - học từ lịch sử (Hindsight, PageIndex)
- **Embedded AI** trên NPU RK3588 - chạy LLM/VLM ngay trên edge device

## 2. Top repos theo chiều

### 🤖 AI Agents
**debpalash/VoiceStudio** (Python, +4758⭐)
- ElevenLabs alternative hoàn toàn local
- Voice cloning, dubbing, transcription 646 ngôn ngữ
- Không cần cloud, chạy offline

**NVIDIA/OpenShell** (Rust, +990⭐)
- Runtime an toàn cho autonomous agents
- Sandbox execution, private by default

**vectorize-io/hindsight** (Python, +2575⭐)
- Agent memory tự học
- Lưu context giữa sessions

**paperclipai/paperclip** (TypeScript, +2458⭐)
- Quản lý agents tại workplace
- Multi-agent coordination

**mvschwarz/openrig** (TypeScript, +737⭐)
- Chạy Claude Code + Codex song song như một system

### 🔧 AI Infrastructure
**t8y2/dbx** (Rust, +232⭐)
- DB client 25MB support 100+ databases
- Built-in AI assistant, MCP Server, CLI

**VectifyAI/PageIndex** (Python, +835⭐)
- Document index cho RAG không cần vector
- Reasoning-based retrieval

**dream-num/univer** (TypeScript, +696⭐)
- Office suite cho AI agents
- Spreadsheets, Docs, Slides, Canvas, PDF trong một runtime

### 🔌 Embedded AI

**rkllm search results:**

**Leon6225/InternVL3.5-4B-NPU** (C++, 5⭐)
- Multimodal AI InternVL3.5-4B cho RK3588 NPU
- Vision + language understanding trên edge

**WMXJY/rkllm-openai-server** (Python, 0⭐)
- OpenAI-compatible RKLLM inference
- Deploy Qwen3-VL 2B/4B trên RK3576/RK3588 NPU
- `/v1/chat/completions` API + WebUI

**ambagesthickskin162/Qwen3.5-4B-NPU** (C++, 1⭐)
- Qwen3.5-4B local inference trên NPU

**freed-dev-llc/terraform-provider-turingpi** (Go, 7⭐)
- Terraform provider cho Turing Pi 2.5 BMC
- Cluster deployment automation

**rknpu search results:**

**gregordinary series:**
- **ggml-rocket** (C++, 21⭐) - Drop-in ggml backend cho Rockchip NPU, offload llama.cpp/whisper.cpp prefill lên RK3588
- **rockchip-npu-notes** (Shell, 17⭐) - Hardware reference cho RK3588 NPU
- **rocket-userspace** (C, 17⭐) - Userspace driver, matmul, op library cho RK3588
- **tflite-rocket** (C++, 5⭐) - TFLite delegate cho NPU-accelerated detection
- **ort-rocket** (C++, 2⭐) - ONNX Runtime EP cho RK3588, offload vision transformers (RF-DETR, CLIP/SigLIP, SAM)

**lona-cn/vision-simple** (C++, 79⭐)
- Cross-platform vision inference
- YOLOv10/v11/v26, PaddleOCR
- ONNXRuntime/RKNPU multi-provider

**JasonYANG170/tspi-AIBox** (Python, 2⭐)
- RK3566 offline voice assistant
- RKNPU speech recognition + local Qwen3
- OLED + button control

**orangepi search results:**

**jaylfc/taOS** (Python, 553⭐)
- Self-hosted AI agent OS
- Offline-first memory, chat, agents
- Auto-clustering trên Orange/Raspberry Pi, Mac mini, gaming PC

**nouverse/nouride-releases** (14⭐)
- Lightweight multi-agent engine trong single daemon
- Homelab-friendly cho Raspberry Pi, Orange Pi, Geekom, NUC

**MichaIng/DietPi** (Shell, 6314⭐)
- Lightweight OS cho SBC
- Support Orange Pi boards

**orangepi-xunlong/orangepi-build** (Shell, 1196⭐)
- Build system cho Orange Pi H2+, H3, H5, H6, H616, RK3328, RK3399, RK3588

### 📦 AI Applications
**rohitg00/ai-engineering-from-scratch** (Python, +786⭐)
- Learn → Build → Ship
- AI engineering foundations

**oblien/openship** (TypeScript, +437⭐)
- Self-hosted deployment platform

**averygan/reclip** (HTML, +113⭐)
- Download videos từ bất kỳ website
- Lightweight, self-hosted, clean UI

**willfaust/Madeira** (C, +81⭐)
- Chạy x86-64 Windows PC games trên jailed iOS
- FEX-Emu + Wine + DXMT

### 📚 Educational
**cs341-illinois/coursebook** (TeX, +572⭐)
- Open source systems programming textbook

**rakyll/hey** (Go, +34⭐)
- HTTP load generator thay thế ApacheBench

## 3. Phân tích tín hiệu xu hướng

### 🔥 Hot patterns

**Local-first AI infrastructure:**
- Voice AI hoàn toàn offline (VoiceStudio)
- Agent runtime private-by-default (OpenShell)
- Self-hosted agent management (Paperclip, taOS)
→ Phản ứng với lo ngại privacy + costs của cloud AI

**Agent memory & learning:**
- Hindsight: memory học từ actions
- PageIndex: vectorless RAG
- Claude-mem references trong search results
→ Agents cần context persistence giữa sessions

**Multi-agent orchestration:**
- OpenRig: chạy nhiều agents song song
- Paperclip: manage agents at work
- Univer: Office suite cho agents
→ Single agent không đủ, cần coordination layer

**Embedded AI bùng nổ:**
- RK3588 NPU infrastructure mature (ggml-rocket, rocket-userspace, tflite-rocket, ort-rocket)
- VLM trên edge (InternVL3.5-4B, MiniCPM-V-4.6)
- Qwen3-VL 2B/4B với OpenAI API compatibility
- Homelab AI với Orange Pi clustering (taOS, nouride)
→ Chuyển từ cloud → edge, NPU đủ mạnh chạy multi-billion param models

**Rockchip NPU ecosystem:**
- Mainline kernel driver support (rocket)
- Userspace libraries mature
- Drop-in backends cho major frameworks (ggml, TFLite, ONNX Runtime)
- OpenAI-compatible inference servers
→ RK3588 becoming serious edge AI platform

### 📉 Declining

Monolithic AI platforms. Trend hướng tới:
- Composable pieces thay vì all-in-one
- Self-hosted thay vì managed services
- Specialized tools thay vì generalist chat

## 4. Tâm điểm cộng đồng

**VoiceStudio** chiếm spotlight:
- +4758⭐ trong 1 ngày
- Giải quyết pain point: ElevenLabs đắt, cần internet
- 646 languages = accessibility global

**Embedded AI infrastructure wars:**
- Gregordinary đang xây ecosystem hoàn chỉnh cho RK3588 NPU (7 repos coordinated)
- Drop-in integration với existing tools (llama.cpp, whisper.cpp, TFLite, ONNX Runtime)
- Mainline kernel approach thay vì vendor SDK
- Community đang converge quanh Rockchip NPU cho homelab/edge AI

**Agent memory systems:**
- Hindsight (+2575⭐) và PageIndex (+835⭐) cùng tackle agent memory
- Approaches khác nhau: learning-based vs vectorless reasoning
- Signals: RAG không đủ, agents cần học từ past experiences

**Chinese AI community momentum:**
- Nhiều repos từ China (ZhuLinsen/stock_analysis, hugohe3/ppt-master, bojieli/ai-agent-book)
- Focus vào practical applications
- Bilingual documentation

**Tooling for agent developers:**
- DBX: lightweight DB client với AI assistant
- Univer: office suite cho agents
- Career-ops: job search automation
→ Meta-trend: tools để build tools

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*