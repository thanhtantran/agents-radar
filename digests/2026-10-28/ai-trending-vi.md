# Xu hướng AI Mã nguồn mở 2026-10-28

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-28 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 2026-10-28

## 🎯 Tóm tắt hôm nay

**Bùng nổ "Agent Harness"** - ecosystem xung quanh agent coding tools (Claude Code, Cursor, Codex) thống trị trending. Community đang xây infra layer cho AI agent thay vì chỉ dùng tool.

**Edge AI tăng tốc** - RK3588/RKLLM có loạt project production-ready: local voice assistant, vision-language models, LLM inference engine. Orange Pi, Raspberry Pi chạy local-first AI stack hoàn chỉnh.

**Local-first đè bẹp cloud** - từ memory, RAG, đến full OS cho agent. Developer muốn own data, run offline, tự host.

---

## 🤖 AI Agents

### Trending mạnh (1K-2.8K stars/ngày)

- **[Nutlope/hallmark](https://github.com/Nutlope/hallmark)** (+2,830) - Anti-AI-slop design skill cho agent harness. Phản ứng với vấn đề code gen chất lượng thấp.

- **[elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills)** (+1,395) - Design skills package cho AI coding tools.

- **[pbakaus/impeccable](https://github.com/pbakaus/impeccable)** (+1,449) - Design language viết bằng Rust để AI làm design tốt hơn.

- **[makecindy/cindy](https://github.com/makecindy/cindy)** (+1,465) - Open-source AI agent out-of-the-box, bilingual (中英).

### Long-tail power (100K+ stars tổng)

- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** (257K) - "Agent that grows with you" - khái niệm agent evolve theo user.

- **[Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)** (104K) - Agent có "mắt" để đọc internet: Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu. Zero API fees.

- **[career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops)** (77K) - AI job search agent: scan job boards, score jobs, tailor resume/cover letter, interview prep. Chạy local trong agent harness.

- **[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)** (69K) - AI tạo native PowerPoint deck từ docs/topics với shapes, transitions, animations, charts, audio narration.

- **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)** (67K) - LLM-powered multi-market stock analysis: multi-source data, real-time news, dashboard, auto notifications, scheduled runs zero cost.

---

## 🔧 AI Infrastructure

### Agent Harness Optimization

- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** (+1,165) - Agent harness performance optimization system. Skills, instincts, memory, security cho Claude Code, Codex, Cursor.

- **[obra/superpowers](https://github.com/obra/superpowers)** (+617) - Agentic skills framework & software dev methodology.

- **[shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code)** (79K) - "Bash is all you need" - build nano claude code từ 0.

### Desktop Workspace & Orchestration

- **[nightly-labs/openbot](https://github.com/nightly-labs/openbot)** (+777) - Local-first desktop workspace cho persistent AI teammates. Codex, Claude, Grok với dedicated workspaces, task queues, file sharing, browser control, agent-to-agent collaboration.

- **[JetBrains/thinkrail](https://github.com/JetBrains/thinkrail)** (+1,204) - "Vibe code with pi" - lightweight real IDE tự customize theo workflow. JetBrains enter agent space.

### Memory & Context

- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** (103K) - Persistent context across sessions. Captures everything agent does, compresses với AI, injects relevant context vào future sessions. Works với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode.

- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** (78K) - Compress tool outputs, logs, files, RAG chunks trước khi đến LLM. 20% ít token hơn cho coding agents, 60-95% ít hơn cho JSON. Library, proxy, MCP server.

- **[mem0ai/mem0](https://github.com/mem0ai/mem0)** (67K) - Memory layer cho AI agents. Drop-in memory infra, context persists. Production-ready.

---

## 📦 AI Applications

### Vertical Solutions

- **[gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app)** (+951) - Agentic social media scheduling tool.

- **[HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor)** (+1,598) - Lifelong personalized tutoring.

### Self-hosted Platforms

- **[jaylfc/taOS](https://github.com/jaylfc/taOS)** (581) - Self-hosted AI agent OS. Memory, chat, agents, files trên hardware tự own. Offline by default, cloud by choice. Offline AI memory (taOSmd), multi-framework group chat, full web desktop + app store, auto-clustering across consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC).

- **[CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio)** (53K) - AI productivity studio: smart chat, autonomous agents, 300+ assistants. Unified access to frontier LLMs.

- **[HKUDS/nanobot](https://github.com/HKUDS/nanobot)** (49K) - Ultra-lightweight, self-hosted personal AI agent framework với WebUI, tools, memory, MCP, multi-agent workflows, automation, chat apps.

- **[siyuan-note/siyuan](https://github.com/siyuan-note/siyuan)** (46K) - Open-source, privacy-first, self-hosted knowledge workspace. Humans và AI agents work together.

---

## 🔍 RAG & Knowledge

- **[Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)** (143K) - 100+ AI Agents, Agent Skills, RAG Apps. Free và open source.

- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** (92K) - Leading RAG engine fuses cutting-edge RAG với Agent capabilities. Context layer cho LLMs.

- **[unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)** (86K) - Web crawler & scraper cho LLMs và AI agents. Any website → clean, LLM-ready Markdown. Self-host hoặc dùng Cloud với one key.

- **[Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm)** (67K) - "Stop renting your intelligence. Own it." Powerful local-first agent experience.

---

## 🔌 Embedded AI (Edge NPU)

### RK3588 LLM Inference

- **[happyme531/open_rknpu2_lm_infer](https://github.com/happyme531/open_rknpu2_lm_infer)** (51) - Fully open-source, high-performance LLM inference engine cho RK3588 NPU.

- **[happyme531/rknpu2_matmul_open](https://github.com/happyme531/rknpu2_matmul_open)** (10) - Matrix multiplication và quantized LLM kernels cho RK3588 RKNPU2.

- **[anand34577/ggml-rknpu2](https://github.com/anand34577/ggml-rknpu2)** (0 nhưng mới) - Run llama.cpp trên Rockchip NPU: ggml backend cho RK3588/3576/3566/3568/3562. One-line installer và simple llama-npu command.

### Vision & Multimodal

- **[tristanpenman/vlm-rknn](https://github.com/tristanpenman/vlm-rknn)** (1) - Starter CMake project cho vision-language models trên Rockchip via RKNN/RKLLM.

- **[kkkzx-hx/qwen-vl-rk3588](https://github.com/kkkzx-hx/qwen-vl-rk3588)** (1) - Qwen2.5-VL-3B offline deployment trên RK3588 (NPU + W8A8).

- **[Palmyaen/orangepi](https://github.com/Palmyaen/orangepi)** (1) - End-to-end C++ edge-AI pipeline trên RK3588 (Orange Pi 5): YOLOv5s detection across all 3 NPU cores, RGA + MPP hardware pipeline, live RTMP streaming.

### Voice & Audio

- **[Hanzo-Huang/rk3576-home-assistant-voice](https://github.com/Hanzo-Huang/rk3576-home-assistant-voice)** (19) - Local Home Assistant voice stack cho RK3576 với NPU-accelerated Whisper và Piper through Wyoming, plus openWakeWord và RKLLM.

- **[pomtum/rk3576-asr](https://github.com/pomtum/rk3576-asr)** (0) - Offline streaming speech recognition (English, Chinese) cho Android trên RK3576 NPU, built for blind users.

### System Tools

- **[ajokela/rktop](https://github.com/ajokela/rktop)** (37) - High-performance system monitor cho Rockchip SoCs (RK3588, RK3399) với real-time CPU, GPU, NPU, RGA, memory, process monitoring. Written in Rust.

- **[Hanzo-Huang/rkllm-docker](https://github.com/Hanzo-Huang/rkllm-docker)** (21) - Run RKLLM in one docker command. Already converted models here.

### Hardware Integration

- **[yjdwbj/panther-x2](https://github.com/yjdwbj/panther-x2)** (16) - Panther X2 (RK3566, ex-Helium hotspot) as Linux board: Buildroot + Rockchip 6.12 kernel, SX1302 LoRa gateway (ChirpStack), UVC camera → hardware H.264 + Opus → WebRTC với NPU person detection, Bluetooth console/PAN, MQTT bridge to Zigbee và Home Assistant.

- **[Animan-AI/DuckBuddy](https://github.com/Animan-AI/DuckBuddy)** (70) - Real-life buddy duck: open-source embodied AI robot duck walks, hears, sees, has life. Toàn bộ AI chạy trên robot (Orange Pi Zero 3W). Feetech servos, built on Pollen Robotics' Microduck.

### Local-first AI Memory

- **[jaylfc/taosmd](https://github.com/jaylfc/taosmd)** (82) - Local-first AI memory — chạy offline trên any machine với 8 GB+ RAM (SBC, mini PC, laptop, workstation). Zero-loss verbatim archive, knowledge graph, hybrid retrieval. Framework-agnostic, no cloud.

---

## 📊 Tín hiệu xu hướng

### 1. **Agent Harness như Platform**
Community treat agent coding tools (Claude Code, Cursor, Codex) như platform, build entire ecosystem lên trên: skills packages, memory systems, design languages, performance optimization. Không chỉ dùng tool, mà extend và customize nó.

### 2. **Anti-slop Movement**
Repos như `hallmark`, `impeccable`, `ECC` phản ứng với AI-generated code chất lượng thấp. Focus vào design, architecture, security, performance optimization. Community muốn quality over quantity.

### 3. **Local-first đạt Production-Ready**
RK3588/RKLLM ecosystem mature: LLM inference engines open-source, voice assistants với NPU acceleration, vision-language models, full hardware pipelines. Edge AI không còn là POC.

### 4. **Self-hosted AI OS**
`taOS`, `nanobot`, `siyuan` - trend về complete AI operating environments chạy local. Integrate memory, chat, agents, files, clustering across consumer hardware. Phản ứng với cloud vendor lock-in.

### 5. **Agent-to-Agent Collaboration**
`openbot`, `thinkrail` - persistent AI teammates với dedicated workspaces, task queues, agent-to-agent collaboration. Shift từ "AI assistant" sang "AI coworker".

### 6. **Context Compression đạt Critical Mass**
`claude-mem`, `headroom` - persistent context và compression tech giải quyết context window limits. 20-95% token reduction với same answers. Critical cho long-running agents.

### 7. **Vertical AI Applications tăng tốc**
Job search agent, stock analysis, social media scheduling, tutoring. AI agents move từ general-purpose sang specialized workflows.

### 8. **Hardware Diversity cho Edge AI**
Orange Pi, Raspberry Pi, Mac mini, gaming PC, Android devices - community build cho consumer hardware có sẵn, không cần specialized AI hardware.

---

## 🔥 Tâm điểm cộng đồng

### Hot debate: Agent Harness Standards
`ECC`, `superpowers`, `learn-claude-code` compete về agent skill framework. Community chưa converge về standard. JetBrains enter space với `thinkrail`.

### Rockchip NPU đạt tipping point
Loạt repos production-ready xuất hiện cùng lúc. `open_rknpu2_lm_infer`, `rknpu2_matmul_open`, `ggml-rknpu2` cho LLM inference. `rk3576-home-assistant-voice`, `qwen-vl-rk3588` cho multimodal. RK3588 become de-facto edge AI platform.

### Memory war: Persistent vs Ephemeral
`claude-mem` (103K stars) vs `mem0` (67K stars). Debate về compress vs raw storage, session-based vs lifelong memory, framework-specific vs universal.

### Local-first AI ideology
`taOS`, `anything-llm`, `taosmd` - strong messaging về "stop renting intelligence", "own your data", "offline by default". Phản ứng với OpenAI/Anthropic dominance.

### Jailbreaks trending
`togg53192-cmd/jailbreaks` (+902) - list jailbreaks cho LLMs. Community interest về AI safety, limitations, red-teaming.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*