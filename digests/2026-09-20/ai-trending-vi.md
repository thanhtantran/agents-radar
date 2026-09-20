# Xu hướng AI Mã nguồn mở 2026-09-20

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-09-20 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở 2026-09-20

## 1. Tóm tắt hôm nay

**Bùng nổ AI Agent tooling & infrastructure** — 7/15 repo trending top là công cụ cho coding agent (Claude Code, Codex), từ skill packages đến security audit frameworks. Anthropic ra 2 repo mới (claude-code, knowledge-work-plugins).

**Sóng thứ hai: computer-use agents** — trycua/cua scale computer-use API với cross-OS drivers + benchmarks cho training.

**Edge AI ecosystem trưởng thành** — RKLLM/RKNPU repos tăng đều, xuất hiện Terraform providers cho Turing Pi, Docker images cho RK1820/RK1828, Kubernetes device plugins cho RK3588 NPU.

**Self-hosted vs vendor lock-in** — 4 repo về personal AI OS/memory/search engine tự host (taOS, hister, nanobot, siyuan). Pattern rõ: local-first, offline-capable, hardware bạn sở hữu.

## 2. Top repos theo chiều

### 🤖 AI Agents

**cloudflare/security-audit-skill** (+3155) — coding-agent skill cho security audit nhiều phase, findings machine-readable

**anthropics/claude-code** (+483) — agentic coding tool trong terminal, hiểu codebase, xử lý git workflows qua natural language

**anthropics/knowledge-work-plugins** (+281) — plugin repo cho knowledge workers dùng trong Claude Cowork

**addyosmani/agent-skills** (+556) — production-grade engineering skills cho AI coding agents

**NousResearch/hermes-agent** (247K⭐) — agent grows với user

**career-ops-hq/career-ops** (72K⭐) — AI job search: scan portals, grade listings A-H + score 1-5, tailor CV, track — chạy local trong CLI

**CherryHQ/cherry-studio** (52K⭐) — AI productivity studio: smart chat + autonomous agents + 300+ assistants

**zhayujie/CowAgent** (47K⭐) — super AI assistant: plans tasks, runs tools/skills, self-evolves với memory/knowledge

**HKUDS/nanobot** (48K⭐) — ultra-lightweight self-hosted personal AI agent: WebUI, tools, memory, MCP, multi-agent workflows

### 🔧 AI Infrastructure

**trycua/cua** (+859) — scale computer-use 2.0: open drivers, cross-OS fleets, benchmarks cho training/eval/data gen

**coder/coder** (+402) — secure environments cho developers và agents của họ

**cactus-compute/needle** (+234) — automation foundation model cho tiny devices: 2-bit, 8-29 MB, tool calls, structured extraction trên phones/wearables/IoT

**yynxxxxx/Codex-X** (+32) — OpenAI Codex desktop/CLI visual manager: provider/API switching, session sync, prompt injection, Skills/MCP management

**affaan-m/ECC** (263K⭐) — agent harness performance optimization: skills, instincts, memory, security cho Claude Code/Codex/Opencode/Cursor

**thedotmack/claude-mem** (94K⭐) — persistent context across sessions: captures agent work, AI compression, injects context vào future sessions

**headroomlabs-ai/headroom** (73K⭐) — compress tool outputs/logs/files/RAG chunks: 20% ít hơn tokens cho coding agents, 60-95% cho JSON

**nouverse/nouride-releases** (11⭐) — lightweight multi-agent engine trong single daemon, homelab-friendly cho mini devices

### 🧠 Models & Training

**higgsfield-ai/higgsfield** (+196) — fault-tolerant GPU orchestration + ML framework cho models billions-to-trillions parameters

**ollama/ollama** (181K⭐) — run Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma local

**huggingface/transformers** (166K⭐) — model-definition framework cho SOTA ML models

### 📦 AI Applications

**Open-Dev-Society/OpenStock** (+472) — open-source alternative cho market platforms: real-time prices, alerts, company insights — forever free

**asciimoo/hister** (+420) — your own search engine

**ZhuLinsen/daily_stock_analysis** (65K⭐) — LLM-driven multi-market stock analysis: multi-source data, real-time news, dashboard, auto notifications

**hugohe3/ppt-master** (55K⭐) — AI turns docs/topics → native PowerPoint: shapes, transitions, animations, charts, audio narration

**harry0703/MoneyPrinterTurbo** (125K⭐) — AI workflow tạo HD short videos từ topic/keyword

### 🔍 RAG & Knowledge

**docling-project/docling** (+129) — get documents ready cho gen AI

**Shubhamsaboo/awesome-llm-apps** (139K⭐) — 100+ AI Agents, Agent Skills, RAG Apps

**infiniflow/ragflow** (91K⭐) — RAG engine fuses RAG + Agent capabilities

**PaddlePaddle/PaddleOCR** (90K⭐) — turn PDF/image docs → structured data cho AI, 100+ languages

**mem0ai/mem0** (66K⭐) — memory layer cho AI agents: drop-in infrastructure, context persists

**run-llama/llama_index** (52K⭐) — document processing platform cho AI

**Mintplex-Labs/anything-llm** (66K⭐) — powerful local-first agent experience

### 🔌 Embedded AI

**jaylfc/taOS** (542⭐) — self-hosted AI agent OS: memory, chat, agents, files trên hardware bạn own, offline by default

**darkautism/rkllm-rs** (11⭐) — rkllm rust FFI binding

**Leon6225/InternVL3.5-4B-NPU** (5⭐) — multimodal AI InternVL3.5-4B cho RK3588 NPU

**XiaomingX/awesome-rk3588** (3⭐) — curated index RK3588 resources: boards, communities, OS, mainline kernel, NPU/AI (RKNN/RKLLM)

**Hanzo-Huang/rkllm3-docker** (1⭐) — run RKNN3 LLM models cho RK1820/RK1828 với Docker

**ambagesthickskin162/Qwen3.5-4B-NPU** (1⭐) — deploy Qwen3.5-4B trên NPU hardware

**ruisv/rcdl** (1⭐) — RKNPU inference & media library cho RK3588/RK3576/RK356x: NPU inference, RGA preprocessing, MPP codecs, zero-copy pipelines

**gjing1st/rk3588-device-plugin** (0⭐) — Kubernetes device plugin cho RK3588 NPU, sysfs auto-detection, 3-unit scheduling, 30s health check

**darkautism/RockNPU** (0⭐) — open-source Rust userspace runtime + compiler cho Rockchip NPUs trên mainline Linux

**jaylfc/taosmd** (79⭐) — local-first AI memory chạy offline trên 8GB+ RAM machines (SBC/mini PC): zero-loss archive, knowledge graph, hybrid retrieval

**LingZhen07/ros2-stm32-autonomous-robot** (9⭐) — ROS 2 + STM32 autonomous mobile robot: CAN FD drivetrain, RPLIDAR, SLAM/navigation trên Orange Pi AI Pro

## 3. Phân tích tín hiệu xu hướng

**Agent infrastructure đổ bộ** — Anthropic mở source 2 repos trong 1 ngày. Cloudflare, Addy Osmani đều release agent skills. Pattern: không chỉ là agent framework nữa, giờ là **skill packages & harness optimization**.

**Computer-use mở rộng** — sau Anthropic Computer Use, giờ có open drivers (trycua/cua) cho cross-OS, benchmark cho training. Đây là infrastructure cho wave tiếp theo.

**NPU/edge AI từ hobby → production** — Terraform providers, Kubernetes plugins, Docker images cho RK3588. Ecosystem trưởng thành: không chỉ chạy được mà deploy được vào infra thật.

**Local-first AI đánh vendor lock-in** — taOS (542⭐ mới), hister (420⭐ mới), nanobot (48K⭐), siyuan (46K⭐) — pattern: self-host, offline-first, hardware bạn sở hữu. Reaction tới cloud costs + privacy concerns.

**Compression cho agent efficiency** — headroom (73K⭐): compress tool outputs 20-60% trước khi đưa vào LLM. Tín hiệu: token costs vẫn là bottleneck, optimization layer đang xuất hiện.

**2-bit models cho edge** — needle (234⭐): 2-bit, 8-29 MB models với tool calls trên phones/wearables. Foundation models xuống embedded devices.

**Security audit agent-native** — cloudflare/security-audit-skill: multi-phase audit với machine-readable findings. Security workflows giờ agent-first.

## 4. Tâm điểm cộng đồng

**Anthropic động thái mạnh** — claude-code (483⭐) + knowledge-work-plugins (281⭐) ra cùng ngày. Đang build ecosystem xung quanh Claude.

**Cloudflare vào AI tooling** — security-audit-skill (3155⭐ trong 1 ngày). Signal: infrastructure giants chuyển sang agent tooling.

**Self-hosted AI OS wars** — taOS (542⭐ mới) vs nanobot (48K⭐) vs siyuan (46K⭐). Niche đang nóng: ai làm "operating system for your AI agents" tốt nhất.

**RK3588 ecosystem thành hình** — từ awesome-rk3588 (curated resources) → device plugins → Docker images → Terraform providers. Embedded AI community có infrastructure stack rồi.

**Agent memory persistent** — claude-mem (94K⭐) + mem0 (66K⭐) + taosmd (79⭐). Memory layer cho agents là infrastructure piece thiết yếu giờ.

**Career automation** — career-ops (72K⭐): scan jobs, grade, tailor CV, track. Signal: professional workflows giờ agent-automated end-to-end.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*