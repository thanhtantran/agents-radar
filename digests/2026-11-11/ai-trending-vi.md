# Xu hướng AI Mã nguồn mở 2026-11-11

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-11-11 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-11-11

## 🎯 Tóm tắt hôm nay

**Agent infrastructure chạy nước rút**. Anthropic, Meta, Vercel đồng loạt đẩy open-source tooling cho agent. Cộng đồng phản ứng bằng agent skill repos (+4k stars trong ngày). Đợt sóng này không phải hype mà là vertical integration: từ design system (Astryx), runtime (agent-browser), đến memory layer và skill registry.

**Edge AI đột phá**: RKLLM/RKNPU có production inference engine mã nguồn mở hoàn chỉnh đầu tiên. RK3588 chạy được LLM ở W8A8. Tín hiệu: edge không còn là demo, là deployment target thực.

**Context compression bùng nổ**: 3 repo đột phá (billion-context, headroom, claude-mem) giải quyết vấn đề context window. Phương pháp: semantic compression + selective injection, không phải naïve summarization.

## 🔥 Top repos theo chiều

### 🤖 AI Agents

**meta/astryx** (+3108) — Design system agent-native. TypeScript. Tín hiệu: Big Tech đang build design language riêng cho agent UI, không dùng lại web UI paradigm.

**anthropics/skills** (+1679) — Skill registry chính thức từ Anthropic. Python. Curated, versioned, composable. Quan trọng: không phải prompt library, là executable skills với schema + implementation.

**addyosmani/agent-skills** (+465) — Production-grade engineering skills từ Chrome team. JavaScript. Focus: performance, security, testing patterns cho agent-generated code.

**mattpocock/skills** (+1225) — `.agents` directory từ một TypeScript influencer. Shell scripts. Thực tế: community-driven skill sharing đã bắt đầu.

**NousResearch/hermes-agent** (+262k) — Agent tự tiến hóa. Python. Tín hiệu: memory + self-modification đang trở thành baseline, không phải premium feature.

**affaan-m/ECC** (+300k) — Agent harness optimization system. JavaScript. Multi-agent coordination + performance tuning. Chạy trên Claude Code, Cursor, Codex.

**zhayujie/CowAgent** (+47k) — Personal AI assistant mã nguồn mở. Python. Multi-agent, multi-model, multi-channel. Extensible. One-line install.

**Panniantong/Agent-Reach** (+110k) — Web scraping cho agent. Python. Đọc Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu. Zero API fees.

**career-ops-hq/career-ops** (+81k) — Job search agent. JavaScript. Scan job boards, score theo CV, tailor resume, interview prep, application tracker. Chạy local trong Codex/OpenCode.

**hugohe3/ppt-master** (+75k) — AI tạo PowerPoint thực với native shapes, transitions, animations, charts, audio narration. Python. Không phải export static slides.

**ZhuLinsen/daily_stock_analysis** (+69k) — LLM-driven stock analysis. Python. Multi-market, real-time news, decision dashboard, auto notifications, cost-free scheduled runs.

**HKUDS/nanobot** (+50k) — Lightweight personal agent. Python.

**CopilotKit/CopilotKit** (+38k) — Frontend stack cho agents. TypeScript. React, Angular, Mobile, Slack. AG-UI Protocol makers.

**can1357/oh-my-pi** (+38k) — Coding agent với IDE wired in. TypeScript. Stencil Labs.

### 🔧 AI Infrastructure

**vercel-labs/agent-browser** (+780) — Browser automation CLI cho agent. Rust. Headless browser với clean API, không phải Selenium wrapper.

**homeassistant-ai/ha-mcp** (+790) — Home Assistant MCP server. Python. Configure + automate HA với Claude, ChatGPT. Protocol-compliant.

**tokio-rs/topcoat** (+192) — Batteries-included web framework. Rust. Từ Tokio team. Tín hiệu: async ecosystem mature đủ để build full-stack framework.

**ranxianglei/billion-context** (+375) — Context compression plugin. TypeScript. Month-long sessions (billions tokens), small windows (100K đủ), 5x token savings. Semantic compression không phải truncation.

**thedotmack/claude-mem** (+115k) — Persistent context across sessions. TypeScript. Capture → compress → inject. Chạy với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode.

**headroomlabs-ai/headroom** (+79k) — Compress tool outputs, logs, files, RAG chunks trước khi vào LLM. Python. 20% ít token hơn cho coding agents, 60-95% cho JSON, same answers. Library, proxy, MCP server.

**firecrawl/firecrawl** (+200k) — Web scraping cho AI agents. TypeScript. Library for superintelligence.

**ollama/ollama** (+186k) — Get up and running với Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma. Go.

**browser-use/browser-use** (+120k) — Python library cho AI browser agents + Browser Use Cloud (stealth browsers, hosted agent API).

**unclecode/crawl4ai** (+87k) — Crawl4AI Cloud: hosted web scraping, extraction, search API cho AI agents. Python. Free API key, 1K credits/month. Self-host Apache-2.0.

**codewhale-hq/Codewhale** (+41k) — Terminal agent. Rust. Any provider or model.

### 🧠 Models & Training

**google-deepmind/mujoco** (+456) — Multi-Joint dynamics with Contact. C++. General purpose physics simulator. Tín hiệu: embodied AI cần sim environment chất lượng.

**huggingface/transformers** (+168k) — Model framework. Python. Text, vision, audio, multimodal. Inference + training.

### 📦 AI Applications

**anthropics/claude-quickstarts** (+531) — Deployable apps với Claude API. Python. Official quickstarts.

**we-promise/sure** (+159) — Personal finance app. Ruby. By everyone, for everyone.

**sherlock-project/sherlock** (+2393) — Hunt social media accounts by username. Python.

**harry0703/MoneyPrinterTurbo** (+141k) — AI tự động tạo short video từ topic/keyword. Python. Workflow automation.

**siyuan-note/siyuan** (+47k) — Privacy-first knowledge workspace. TypeScript. Self-hosted. Humans + AI agents collaborate.

### 🔍 RAG & Knowledge

**Graphify-Labs/graphify** (+145k) — Turn codebase (docs, SQL, configs, PDFs) thành knowledge graph. Python. `/graphify` skill cho Claude Code, Cursor, Codex, Gemini CLI. Local deterministic AST parsing, no vector store.

**Shubhamsaboo/awesome-llm-apps** (+144k) — 100+ AI Agents, Agent Skills, RAG Apps. Python. Free and open source.

**infiniflow/ragflow** (+93k) — Agent-native database. Go. RAG engine → context infrastructure.

**mem0ai/mem0** (+68k) — Memory layer cho AI agents. Python. Drop-in memory infrastructure. Context persists. Production-ready.

**open-webui/open-webui** (+158k) — User-friendly AI Interface. Svelte. Support Ollama, OpenAI API.

**langchain-ai/langchain** (+149k) — Agent engineering platform. Python.

**Mintplex-Labs/anything-llm** (+68k) — Stop renting intelligence. Own it. JavaScript. Local-first agent experience.

**langgenius/dify** (+160k) — Build Agentic workflows, RAG pipelines. Python. Rich AI model + tool support. Deploy cloud, VPC, self-hosted. Team collaboration.

**f/prompts.chat** (+176k) — f.k.a. Awesome ChatGPT Prompts. MDX. Share, discover, collect prompts. Free and open source. Self-host với privacy.

**Significant-Gravitas/AutoGPT** (+187k) — Accessible AI for everyone. Python. Vision: use and build on.

### 🔌 Embedded AI

#### Orange Pi

**jaylfc/taOS** (+605) — Self-hosted AI agent OS. Python. Memory, chat, agents, files stay on hardware bạn own. Offline by default, cloud by choice. Auto-clustering across consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC).

**nouverse/nouride** (+97) — Lightweight multi-agent AI engine trong single daemon. TypeScript. Homelab-friendly. Built cho mini devices (Raspberry Pi, Orange Pi, Geekom, NUC, LXC).

**jaylfc/taosmd** (+84) — Local-first AI memory. Python. Offline trên any machine 8GB+ RAM (SBC, mini PC, laptop, workstation). Zero-loss verbatim archive, knowledge graph, hybrid retrieval. Framework-agnostic, no cloud.

**Animan-AI/DuckBuddy** (+90) — Embodied AI robot duck. Rust. Walks, hears, sees, có life riêng. Feetech servos + Orange Pi Zero 3W. Built on Pollen Robotics' Microduck (unofficial).

**MichaIng/DietPi** (6401) — Lightweight justice cho single-board computer. Shell.

**RaspAP/raspap-webgui** (5234) — Wireless router setup cho Debian devices. PHP.

**orangepi-xunlong/orangepi-build** (1222) — Orange Pi build cho H2+, H3, H5, H6, H616, RK3328, RK3399, RK3588(s). Shell.

**ptitSeb/gl4es** (866) — OpenGL 2.1/1.5 to GL ES 2.0/1.1 translation. C. Support Pandora, ODroid, OrangePI, CHIP, Raspberry PI, Android, Emscripten, AmigaOS4.

**orangepi-xunlong/wiringOP** (537) — wiringPi for Orange Pi. C.

**art-den/astra_lite** (54) — Deepsky astrophotography + live stacking trên low power PCs (Raspberry Pi, Orange Pi). Rust.

#### RKLLM / RKNPU

**happyme531/open_rknpu2_lm_infer** (78) — **Đột phá**: Fully open-source, high-performance LLM inference engine cho RK3588 NPU. Rust. Production-ready.

**gregordinary/ggml-rocket** (26) — Drop-in ggml backend cho Rockchip NPUs. C++. Offload llama.cpp/whisper.cpp prefill to RK3588 NPU.

**gregordinary/rocket-userspace** (24) — Userspace driver, matmul, on-NPU op library cho Rockchip NPUs (RK3588 & RK3576) qua mainline rocket DRM-accel driver. C.

**gregordinary/rockchip-npu-notes** (35) — Hardware reference + research notes cho RK3588 NPU + regcmd interface. Shell.

**gregordinary/ort-rocket** (5) — ONNX Runtime execution provider cho Rockchip NPUs (RK3588). C++. Offload transformer vision encoders (RF-DETR, CLIP/SigLIP, SAM, Depth Anything v2) to NPU.

**gregordinary/tflite-rocket** (7) — TensorFlow Lite external delegate cho NPU-accelerated detection trên RK3588. C++.

**2549227674/vlm-sam-industrial-vision-v2** (8) — Defect detection trên MVTec AD dataset. Python. RK3588 C++20 four-thread pipeline (capture, gate, locate, upload), FastAPI backend, Next.js dashboard.

**2549227674/EdgeForge** (0) — Edge model deployment + inference optimization. Python. Gemma4 E4B: data governance, QLoRA fine-tuning, online distillation, RK3588 NPU (RKLLM W8A8) deployment, Triton/NEON operator development, NPU performance evaluation.

**lucasTan-16/rk3588_edge_inspection_agent** (0) — Multimodal inspection agent. Python. YOLOv11n + Qwen2.5-0.5B. Vision-reasoning-action loop.

**legion1581/go2-npu-unlock** (1) — Enable 6 TOPS NPU trên Unitree Go2 với Rockchip rknpu 0.9.8 driver (LLM-capable). C. Runtime, no flashing.

**rockchip-wardner/wdnai** (0) — Secondary wrapper cho Rockchip RKNN3 LLMs. Python. Model-agnostic interface.

**anguoyang/awesome-rockchip** (0) — Curated list: Rockchip boards, OS, RKNN/RKLLM tooling, models, multimedia, dev tools. PRs answered within 48h.

**jsramesh1990/RK3568-DDR-Memory-Manager** (3) — DDR Memory Manager cho RK3568. C. Optimized DDR config, NPU memory allocation, partition management, performance monitoring.

**gclawes/rockchip-dra-driver** (5) — Kubernetes DRA driver cho RK3588 features (GPU, NPU). Go.

**gregordinary/patches** (4) — Out-of-tree patch sets cho boot2deb Debian builder. C. RK3588 mainline rocket NPU driver patches + HW video-transcode (kernel/ffmpeg/MPP) patches.

**freed-dev-llc/terraform-provider-turingpi** (7) — Terraform provider cho Turing Pi 2.5 BMC. Go.

**freed-dev-llc/terraform-turingpi-modules** (2) — Terraform modules cho Turing Pi clusters. HCL.

**airockchip/rknpu** (25) — Không có mô tả. C.

**DMRedstone/rkllm-runtime** (0) — rknn-1.3.1版本外壳实现. Python.

**cloudkucooland/OurVillage** (0) — Small MUD-Like environment cho LLMs. Go.

## 📊 Phân tích tín hiệu xu hướng

### Agent infrastructure consolidation

Không còn là "build your own agent framework". Vertical đang tách ra:
- **Runtime layer**: agent-browser (Vercel), agent harness (ECC)
- **Skill layer**: anthropics/skills (canonical), community repos (addyosmani, mattpocock)
- **Memory layer**: mem0, claude-mem, taosmd
- **Context management**: billion-context, headroom — compression thay vì unlimited context

Tín hiệu mạnh: **skill-as-code standardization**. Anthropic đẩy executable skills với schema. Community follow bằng `.agents` directories. Không phải prompt templates, là versioned callable functions.

### Context compression breakthrough

3 approaches cùng xuất hiện:
1. **Semantic compression** (billion-context): 5x reduction, preserve meaning
2. **Selective injection** (claude-mem): compress history, inject relevant only
3. **Format-aware compression** (headroom): 60-95% cho JSON, 20% cho code

Insight: Context window size race đã chậm lại. Optimization wins now là compression + retrieval, không phải bigger windows.

### Edge AI production viability

RKLLM/RKNPU có:
- **Fully open-source inference engine** (open_rknpu2_lm_infer)
- **Mainline kernel driver** (rocket DRM-accel)
- **Production deployments** (industrial vision, inspection agents)
- **W8A8 quantization** works at usable quality

Tín hiệu: RK3588 không còn là hobby board, là legitimate deployment target cho local-first AI. taOS + taosmd pattern: self-hosted agent OS + offline memory, cluster consumer hardware (Orange Pi, Mac mini, gaming PC).

### RAG → Knowledge graph migration

Graphify: codebase → queryable knowledge graph, no vector store. Deterministic AST parsing, every edge explained.

Pattern shift: vector similarity search → structured graph queries. Dữ liệu technical (code, docs, schemas) benefit từ deterministic structure hơn là embeddings.

### Embodied AI signal

MuJoCo trending (+456), DuckBuddy robot (+90), Unitree Go2 NPU unlock. Sim-to-real pipeline mature: train in MuJoCo, deploy to real hardware với NPU acceleration.

### Browser automation standardization

browser-use, agent-browser, Browser Use Cloud: browser automation đang trở thành core agent capability, không phải niche tool. Pattern: headless browser + stealth + hosted API.

## 🎯 Tâm điểm cộng đồng

### Skill sharing explosion

Anthropic open-sourced skill registry → community phản ứng trong vòng giờ. addyosmani (Chrome team), mattpocock (TypeScript influencer) public `.agents` directories. Tín hiệu: skill distribution model đã tìm được form.

### Edge deployment validation

Industrial use cases xuất hiện (vlm-sam-industrial-vision-v2: defect detection trên MVTec dataset với RK3588). Không phải demo, là production pipelines với FastAPI backend + WebSocket push + Next.js dashboard.

### Self-hosted agent OS

taOS (+605): offline-by-default agent OS, auto-clustering consumer hardware. Community demand mạnh cho privacy-first, self-hosted agent infrastructure. Pattern: own your intelligence, không rent từ cloud.

### Context management arms race

3 major repos cùng tackle context problem trong 1 ngày. Community pain point rõ ràng: token costs + context limits là blocking issue. Solutions converge on compression + selective retrieval, không phải brute-force bigger windows.

### Terminal agent maturation

Codewhale (Rust, +41k), oh-my-pi (TypeScript, +38k): terminal agents với IDE integration. Pattern: không replace IDE, wire vào existing workflow. Rust implementations signal performance + safety concerns được take seriously.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*