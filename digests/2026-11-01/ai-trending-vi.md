# Xu hướng AI Mã nguồn mở 2026-11-01

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-11-01 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-11-01

## 🎯 Tóm tắt hôm nay

**AI Agents lên ngôi:** Ngày hôm nay cộng đồng tập trung vào infrastructure cho AI agents - persistent memory, multi-agent orchestration, skills frameworks. Xu hướng chính: agents cần ngữ cảnh liên tục giữa các session, cần skills/workflows có thể tái sử dụng, và cần coordination để làm việc nhóm.

**Edge AI bùng nổ:** Rockchip NPU (RK3588/RK3576) đang trở thành hot target cho local AI inference. Community đang build open-source stack thay thế vendor BSP - từ kernel driver đến runtime và model optimization.

**Xu hướng local-first:** Tools tập trung vào chạy offline, self-hosted, privacy-first. Không phụ thuộc cloud.

---

## 📊 Top repos theo chiều

### 🤖 AI Agents

**claude-mem** (thedotmack) - +1,723 ⭐
Persistent context cho agents qua sessions. Capture actions → compress bằng AI → inject vào future sessions. Tích hợp Claude Code, Codex, Gemini, Hermes.

**skills** (mattpocock) - +883 ⭐  
Skills từ `.agents` directory. Real engineers chỉ chia sẻ production skills, không phải prompts rỗng.

**Claude-Code-Game-Studios** (Donchitos) - +742 ⭐
49 AI agents + 72 workflow skills tạo game studio hierarchy. Full coordination system.

**OpenMausBot** (milind-soni) - +1,303 ⭐
Open alternative cho Grok Bot. Virtual machine cho bots.

**Orkas** (Orkas-AI) - +1,044 ⭐
Local-first AI team desktop app. Commander phân chia tasks cho 16 specialist agents + Claude Code/Codex/OpenCode integration. Projects, scheduled automations, connectors.

**career-ops** (career-ops-hq) - +79,074 ⭐  
Job search agent: scan boards → score jobs vs CV → tailor resume/cover letter → prep interview → track applications. Runs local trong Codex/OpenCode hoặc Claude Code plugin.

**CowAgent** (zhayujie) - +47,720 ⭐
Personal AI assistant. Plans, runs tools/skills, self-evolves với memory/knowledge. Multi-agent, multi-model, lightweight.

**nanobot** (HKUDS) - +49,706 ⭐
Lightweight open-source personal agent.

**learn-claude-code** (shareAI-lab) - +79,638 ⭐
Nano agent harness build from scratch. "Bash is all you need."

**superpowers** (obra) - +665 ⭐
Agentic skills framework + software development methodology.

### 🔧 AI Infrastructure

**impeccable** (pbakaus) - +1,338 ⭐  
Design vocabulary cho coding agents. Steer với polish/bolder, review với critique/audit. Catch AI slop trước khi ship. Rust.

**ECC** (affaan-m) - +294,103 ⭐
Agent harness performance optimization. Skills, instincts, memory, security, research-first dev cho Claude Code/Codex/Cursor.

**hermes-agent** (NousResearch) - +259,197 ⭐
Agent grows với user.

**firecrawl** (firecrawl) - +197,427 ⭐
Supercharge AI agents với web data. Building library cho superintelligence.

**AutoGPT** (Significant-Gravitas) - +187,850 ⭐
Vision của accessible AI. Tools để focus vào what matters.

**transformers** (huggingface) - +168,399 ⭐
State-of-the-art ML models cho text/vision/audio/multimodal. Inference + training.

**dify** (langgenius) - +160,113 ⭐
Build agentic workflows, RAG pipelines. Rich AI model/tool support. Deploy cloud/VPC/self-hosted.

**CopilotKit** (CopilotKit) - +38,437 ⭐
Frontend Stack cho Agents & Generative UI. React, Angular, Mobile, Slack. Makers của AG-UI Protocol.

**Codewhale** (codewhale-hq) - +41,161 ⭐
Open-source terminal agent bằng Rust. Any provider/model.

**open-webui** (open-webui) - +157,412 ⭐
User-friendly AI interface. Supports Ollama, OpenAI API.

**crawl4ai** (unclecode) - +86,669 ⭐
Web crawler/scraper cho LLMs/agents. Website → clean LLM-ready Markdown. Self-host hoặc Cloud.

**headroom** (headroomlabs-ai) - +78,479 ⭐
Compress tool outputs, logs, files, RAG chunks trước khi đến LLM. 20% fewer tokens cho coding agents, 60-95% cho JSON. Library/proxy/MCP server.

**siyuan-note** (siyuan-note) - +47,023 ⭐
Privacy-first, self-hosted knowledge workspace. Humans + AI agents collaborate.

### 🧠 Models & Training

**ollama** (ollama) - +185,485 ⭐  
Run Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma locally.

**ponytail** (DietrichGebert) - +181,548 ⭐
Makes AI agent think như laziest senior dev. Best code = code never written.

### 📦 AI Applications  

**t3code** (pingdotgg) - +1,148 ⭐
TypeScript project. No description.

**ziwei-doushu** (Renhuai123) - +1,092 ⭐
紫微斗数 open-source. 倪海厦《天纪》体系, full算法, 四化, 格局知识库, 古籍data.

**DeepTutor** (HKUDS) - +1,034 ⭐ & +52,862 ⭐
Lifelong Personalized Tutoring.

**OpenMAIC** (THU-MAIC) - +116 ⭐
Open Multi-Agent Interactive Classroom. Immersive multi-agent learning, one click.

**ppt-master** (hugohe3) - +71,671 ⭐
AI turns docs/topics → native PowerPoint. Shapes, transitions, animations, charts, tables, audio narration.

**daily_stock_analysis** (ZhuLinsen) - +67,347 ⭐
LLM-driven multi-market stock analysis. Multi-source data, real-time news, decision dashboard, auto notifications, cost-free scheduled runs.

**JeecgBoot** (jeecgboot) - +48,356 ⭐
企业级AI低代码. One sentence → full system. AI Skills: 画流程, 设计表单, 生成报表/大屏. AI应用: chat, 知识库, 流程编排, MCP插件. 兼容主流大模型.

### 🔍 RAG & Knowledge

**claude-mem** (duplicate - see Agents)

**ragflow** (infiniflow) - +93,268 ⭐  
Leading RAG engine. RAG + Agent capabilities tạo superior context layer cho LLMs.

**mem0** (mem0ai) - +68,174 ⭐
Memory Layer cho AI Agents. Drop-in memory infrastructure. Context persists. Production-ready.

**anything-llm** (Mintplex-Labs) - +67,800 ⭐
Stop renting intelligence. Own it local-first. Powerful agent experience.

**llama_index** (run-llama) - +52,764 ⭐
Document processing platform cho AI.

**milvus** (milvus-io) - +46,542 ⭐
High-performance cloud-native vector database. Scalable vector ANN search.

### 🔌 Embedded AI

**lightpanda-io/browser** - +929 ⭐  
Headless browser designed cho AI/automation. Zig.

**rkllama** (NotPunchnox) - +618 ⭐
Ollama alternative cho Rockchip NPU. Efficient solution run AI/DL trên Rockchip với NPU support (rkllm).

**taOS** (jaylfc) - +587 ⭐
Self-hosted AI agent OS. Memory/chat/agents/files stay on owned hardware. Offline by default, cloud by choice. Offline AI memory (taOSmd), self-hosted group chat, web desktop + app store, auto-clustering qua consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC).

**taosmd** (jaylfc) - +83 ⭐  
Local-first AI memory. Runs offline trên 8GB+ RAM machine (SBC, mini PC, laptop). Zero-loss archive, knowledge graph, hybrid retrieval. Framework-agnostic.

**DuckBuddy** (Animan-AI) - +78 ⭐
Open-source embodied AI robot duck. Walks, hears, sees, có life riêng. Feetech servos + Orange Pi Zero 3W. Built on Microduck.

**open_rknpu2_lm_infer** (happyme531) - +59 ⭐
Fully open-source, high-performance LLM inference cho RK3588 NPU. Rust.

**astra_lite** (art-den) - +54 ⭐
Deepsky astrophotography + live stacking trên low power PCs (Raspberry/Orange Pi). Rust.

**ggml-rocket** (gregordinary) - +25 ⭐
Drop-in ggml backend cho Rockchip NPUs. Offloads llama.cpp/whisper.cpp prefill lên RK3588 NPU.

**rocket-userspace** (gregordinary) - +23 ⭐
Userspace driver, matmul, on-NPU op library cho Rockchip NPUs (RK3588/RK3576) qua mainline rocket DRM-accel driver.

**tflite-rocket** (gregordinary) - +6 ⭐
TFLite external delegate cho NPU-accelerated detection trên RK3588.

**ort-rocket** (gregordinary) - +5 ⭐
ONNX Runtime execution provider cho Rockchip NPUs qua mainline rocket driver. Offloads transformer vision encoders (RF-DETR, CLIP/SigLIP, SAM, Depth Anything v2) lên NPU.

**DietPi** (MichaIng) - +6,373 ⭐
Lightweight OS cho SBCs.

**raspap-webgui** (RaspAP) - +5,230 ⭐
Full-featured wireless router setup cho Debian devices.

**gl4es** (ptitSeb) - +863 ⭐
OpenGL 2.1/1.5 → GL ES 2.0/1.1 translation. Supports Pandora, ODroid, OrangePI, CHIP, Raspberry PI, Android, Emscripten, AmigaOS4.

**eai-rk3588** (kyshipit) - +4 ⭐
Extensible RK3588 edge inference platform. Multi-threaded pipeline, RKNN adapters, RKLLM chat, coordinator-driven multi-slot activation.

**SmartCockpit** (xubb-programmer) - +0 ⭐
Smart Cockpit Voice Assistant cho RK3588. RKLLM inference, vision analysis, vehicle control.

**rk3576-linux-lab** (C-NHXT-N) - +0 ⭐
RK3576 + Linux tutorial: từ Linux basics, systemd, system programming/drivers → RKNN/RKLLM, ROS 2, embedded AI.

---

## 🔍 Phân tích tín hiệu xu hướng

### 1. **Persistent Memory cho Agents**
claude-mem trend chỉ ra agents cần memory xuyên sessions. Không chỉ in-session context - cần compress experiences thành long-term knowledge và selective retrieval.

**Pattern:** Capture → Compress (AI-driven summarization) → Selective injection  
**Tech stack:** Vector stores + summarization models + context window management

### 2. **Skills-based Agent Architectures**  
Shift từ monolithic agents sang modular skills/workflows. mattpocock/skills, Orkas, superpowers đều theo hướng này. Agents compose reusable skills thay vì hardcode behaviors.

**Implication:** Skills marketplace đang nảy sinh. Sharing/discovering/composing skills = new primitive.

### 3. **Open-source Rockchip NPU Stack**
Community đang build full open stack cho RK3588/RK3576 NPU:
- **Kernel level:** mainline rocket DRM-accel driver (gregordinary patches)
- **Runtime:** open_rknpu2_lm_infer, rocket-userspace  
- **Framework integration:** ggml-rocket, tflite-rocket, ort-rocket
- **Model optimization:** rknpu2_matmul_open, rkllama

**Tín hiệu:** Edge AI không còn phụ thuộc vendor BSP. Open stack → reproducible, hackable, community-driven optimization.

### 4. **Local-first AI Stack**  
taOS, taosmd, anything-llm, Orkas - tất cả nhấn mạnh offline-first, self-hosted, privacy. 

**Driver:** Distrust cloud, data sovereignty, cost control, latency. Tools chạy on hardware users own (SBCs, mini PCs, laptops).

### 5. **Multi-agent Coordination**
Claude-Code-Game-Studios (49 agents), Orkas (16 specialists), OpenMAIC (classroom) - agents không chỉ solo, cần hierarchy/coordination.

**Pattern:** Commander/coordinator + specialist agents. Task decomposition → parallel execution → synthesis.

### 6. **Design Vocabulary cho AI Code**
impeccable đưa design language vào agent workflow: polish, bolder, critique, audit. Catch "AI slop."

**Insight:** Code quality không chỉ "works" - cần aesthetic/design standards. Agents cần vocabulary để discuss và enforce quality.

### 7. **Compression = New Primitive**
headroom: compress trước khi vào LLM. 20-95% token reduction.

**Why now:** Context windows vẫn expensive. Compression ở tool output/file/RAG layer = multiplicative gains.

### 8. **Agent Harness Optimization**
ECC (294K stars) focus vào performance optimization cho agent harnesses. Not just "make it work" - make it fast, secure, research-first.

**Signal:** Agent infrastructure đang mature. Performance/security/reliability = competitive edge.

---

## 🌟 Tâm điểm cộng đồng

### **Most Active Discussions:**

1. **claude-mem (+1,723 ⭐):** Persistent memory = killer feature agents cần. Community discussing compression strategies, retrieval precision, multi-agent shared memory.

2. **ECC (+294K ⭐):** Agent harness wars. Everyone building own harness - performance/security optimization = differentiator.

3. **Rockchip NPU Stack:** gregordinary repos (ggml-rocket, rocket-userspace, ort-rocket) - community rallying around open alternative to vendor BSP. Active kernel patching, model optimization discussions.

4. **impeccable (+1,338 ⭐):** Design vocabulary resonates. Developers tired of "AI slop" - need language + tools to enforce quality.

5. **taOS/taosmd (+587/+83 ⭐):** Local-first AI OS với auto-clustering qua consumer hardware = practical path to self-hosted AI at scale.

### **Emerging Themes:**

- **Skills marketplaces:** Shareable, composable workflows
- **Edge inference maturation:** Open stacks cho NPUs, not just x86/CUDA
- **Memory architectures:** Long-term, compressed, selective
- **Multi-agent systems:** Coordination primitives
- **Quality control:** Design vocabularies, slop detection

### **Surprising Moves:**

- **ziwei-doushu (+1,092 ⭐):** AI applied to traditional Chinese astrology. Niche but shows AI democratization → domain-specific tools.
- **DuckBuddy (+78 ⭐):** Embodied AI robot duck on Orange Pi. Hobbyist robotics meets edge AI.
- **ppt-master (+71K ⭐):** AI → native PowerPoint với animations/charts. Vertical application success.

---

## 💡 Kết luận

Hôm nay = infrastructure day. Community building foundation pieces:
- **Memory systems** cho agents persist knowledge
- **Skills frameworks** cho modular, reusable behaviors  
- **Open NPU stacks** cho edge inference
- **Quality tools** catch AI slop
- **Local-first architectures** escape cloud dependency

Next wave: composition. Skills + memory + coordination → emergent capabilities.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*