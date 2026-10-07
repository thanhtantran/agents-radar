# Xu hướng AI Mã nguồn mở 2026-10-07

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-07 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 2026-10-07

## Tóm tắt hôm nay

Cộng đồng đang đổ xô vào **tooling cho AI agents** - không phải model mới, mà các **skill, memory system, và agent infrastructure**. Trending list hôm nay gần như toàn repos về việc **làm agent chạy tốt hơn** thay vì xây agent từ đầu.

Dấu hiệu rõ: 7/12 trending repos là agent tooling (testing, memory, skills, reverse engineering, design language). Người dùng đã có agent, giờ cần làm chúng **nhớ được, test được, output đẹp hơn**.

Edge AI (RKLLM/RKNPU) vẫn im lặng trên trending nhưng search results cho thấy **mainline kernel driver đang được xây đầy đủ** - từ DKMS packages đến TFLite delegate, ONNX runtime provider. Infrastructure đang chín, app sẽ theo sau.

---

## Top repos theo chiều

### 🤖 AI Agents

**affaan-m/ECC** (274k⭐)  
Performance optimization system cho agent harness. Skills, instincts, memory cho Claude Code/Codex/Cursor.

**NousResearch/hermes-agent** (252k⭐)  
Agent framework grows với user. Đa năng, production-ready.

**CherryHQ/cherry-studio** (52k⭐)  
Productivity studio. Smart chat, autonomous agents, 300+ assistants. Unified LLM access.

**zhayujie/CowAgent** (47k⭐)  
Personal AI assistant framework. Plans tasks, runs tools, self-evolves. Multi-agent, multi-model.

**HKUDS/nanobot** (49k⭐)  
Ultra-lightweight Python framework. WebUI, tools, memory, MCP, multi-agent workflows.

**codewhale-hq/Codewhale** (41k⭐)  
Terminal coding agent, Rust, community-driven.

### 🔧 AI Infrastructure

**thedotmack/claude-mem** (97k⭐, +534 hôm nay)  
Persistent context across sessions. Captures agent actions, compresses, injects back. Works với mọi major agent CLI.

**headroomlabs-ai/headroom** (75k⭐)  
Token compression. 20% less cho coding agents, 60-95% less cho JSON. Library, proxy, MCP server.

**mattpocock/skills** (+889 hôm nay)  
Skills package từ `.agents` directory. Real engineers, straight from production.

**pbakaus/impeccable** (+616 hôm nay)  
Design language cho AI harness. Làm agent output đẹp hơn.

**ayghri/i-have-adhd** (+326 hôm nay)  
Skill dừng agent buried answer. ADHD-friendly output format.

**cathrynlavery/diagram-design** (+228 hôm nay)  
Editorial diagram design cho agent. 42 diagram types, self-contained HTML+SVG. No Mermaid slop.

**tester-army/e2e** (+1725 hôm nay)  
Next-gen e2e testing framework cho web/mobile apps. Agent-first approach.

**morluto/rea** (+2956 hôm nay)  
Reverse engineer anything với agents. App behavior xuống native binaries.

**earthtojake/text-to-cad** (+619 hôm nay)  
CAD superpowers cho agent. Text-to-3D modeling.

### 🧠 Models & Training

**deepseek-ai/DeepGEMM** (+199 hôm nay)  
Clean, efficient BLAS kernel library trên GPU. Low-level performance.

### 📦 AI Applications

**hugohe3/ppt-master** (58k⭐)  
Document/topic thành PowerPoint deck. Native shapes, transitions, animations, charts, audio narration.

**DuarteSantos8/openGym** (+1419 hôm nay)  
Self-hosted gym tracker. Plan routines, log workouts, muscle tracking. Your data, your server.

**career-ops-hq/career-ops** (74k⭐)  
AI job search agent. Scan boards, score jobs, tailor resume/cover letter, interview prep. Runs locally.

**ZhuLinsen/daily_stock_analysis** (66k⭐)  
LLM-driven stock analysis. Multi-source market data, news, decision dashboard, automated push. Zero-cost scheduled runs.

**msitarzewski/agency-agents** (+623 hôm nay)  
Complete AI agency. Specialized agents với personality, processes. Frontend wizards, Reddit ninjas, reality checkers.

### 🔍 RAG & Knowledge

**Graphify-Labs/graphify** (124k⭐)  
Codebase thành queryable knowledge graph. Local deterministic AST parsing, no vector store. Skill cho Claude Code/Cursor.

**infiniflow/ragflow** (92k⭐)  
Leading RAG engine. Fusion RAG với Agent capabilities.

**unclecode/crawl4ai** (85k⭐)  
Web crawler cho LLMs. Any website thành LLM-ready Markdown.

**mem0ai/mem0** (67k⭐)  
Memory layer cho AI agents. Drop-in infrastructure, persistent context.

**run-llama/llama_index** (52k⭐)  
Document processing platform cho AI.

### 🔌 Embedded AI

**jaylfc/taOS** (554⭐)  
Self-hosted AI agent OS. Memory, chat, agents, files stay local. Offline by default, cloud by choice. Auto-clustering across consumer hardware (Orange Pi, Raspberry Pi, Mac mini, gaming PC).

**gregordinary/ggml-rocket** (21⭐)  
Drop-in ggml backend cho Rockchip NPUs. Offload llama.cpp/whisper.cpp prefill lên RK3588 NPU.

**gregordinary/rocket-userspace** (19⭐)  
Userspace driver, matmul, on-NPU op library cho RK3588/RK3576. Via mainline rocket DRM-accel driver.

**oRKLLM/ork-driver** (5⭐)  
Clean-room userspace matmul library cho Rockchip NPU.

**lurenJBD/rknpu-mainline-dkms** (5⭐)  
Debian DKMS packaging cho mainline RK3588 RKNPU driver. Automated builds, Rocket conflict resolution.

**gregordinary/ort-rocket** (2⭐)  
ONNX Runtime EP cho Rockchip NPUs. Offload transformer vision encoders (RF-DETR, CLIP, SAM, Depth Anything v2) lên NPU.

**gregordinary/tflite-rocket** (6⭐)  
TFLite external delegate cho NPU-accelerated detection trên RK3588.

**jaylfc/taosmd** (79⭐)  
Local-first AI memory. Offline trên bất kỳ máy 8GB+ RAM (SBC, mini PC). Zero-loss archive, knowledge graph, hybrid retrieval.

**lona-cn/vision-simple** (141⭐)  
Lightweight C++ cross-platform vision inference. YOLOv10/v11/v26, PaddleOCR. ONNXRuntime/RKNPU.

**Leon6225/InternVL3.5-4B-NPU** (5⭐)  
Multimodal AI InternVL3.5-4B cho RK3588 NPU.

**boykopovar/AnyPS5** (+949 hôm nay)  
Automatic PS5 executables porting lên Linux/Windows. (Không phải AI nhưng edge computing relevant)

---

## Phân tích tín hiệu xu hướng

### 1. Agent Infrastructure > Agent Frameworks
Shift từ "xây agent" sang "làm agent chạy tốt". Memory systems (claude-mem, mem0, taosmd), skills libraries (mattpocock/skills), testing frameworks (e2e), output formatters (i-have-adhd, diagram-design).

Cộng đồng realized: agent base đã có (Claude Code, Cursor, Copilot), giờ cần **plumbing và polish**.

### 2. Token Efficiency = New Performance Metric
Headroom (75k⭐) attack token overhead. 20-95% compression. Không phải speed, mà **cost và context window**.

Agent chạy lâu → nhiều context → đắt → compression = competitive advantage.

### 3. Mainline Kernel Support cho Edge AI
Rockchip NPU infrastructure going serious:
- DKMS packages (lurenJBD/rknpu-mainline-dkms)
- Userspace drivers (rocket-userspace, ork-driver)
- ML framework integrations (ggml-rocket, ort-rocket, tflite-rocket)

Không còn vendor SDK lock-in. Mainline kernel + standard ML frameworks. **Edge AI sắp commodity hóa**.

### 4. Self-Hosted AI OS Layers
taOS (554⭐) và nanobot (49k⭐) xây **agent OS** thay vì agent app. Auto-clustering, offline-first, multi-agent orchestration.

Pattern: treat agents như services trong distributed system. Home lab AI clusters.

### 5. Agent Reverse Engineering
morluto/rea (+2956): reverse engineer **bằng agents**. Từ app behavior xuống native binaries. Agent không chỉ build code, giờ còn **dissect code**.

### 6. Vertical Agent Solutions
Không generic chatbot. Specific domains:
- career-ops: job search agent
- ppt-master: presentation generation
- openGym: fitness tracking
- daily_stock_analysis: stock analysis

Pattern: "AI agent cho X" thay vì "AI agent platform".

---

## Tâm điểm cộng đồng

**morluto/rea** (+2956): Reverse engineering với agents. Use case mới, kéo attention.

**tester-army/e2e** (+1725): Testing là pain point lớn. Next-gen framework cho web/mobile.

**DuarteSantos8/openGym** (+1419): Self-hosted, privacy-first fitness tracking. Anti-SaaS sentiment.

**boykopovar/AnyPS5** (+949): PS5 porting tool. Gaming community overlap với AI community (both early adopters).

**mattpocock/skills** (+889): Skills từ real `.agents` directory. Credibility từ production usage.

**earthtojake/text-to-cad** (+619): CAD = unexplored domain. Agent superpowers mở ra vertical mới.

**pbakaus/impeccable** (+616): Design language cho agents. Output quality matter.

**msitarzewski/agency-agents** (+623): Complete agency = all-in-one solution. Beginner-friendly.

**thedotmack/claude-mem** (+534, 97k⭐): Memory là foundation. Cross-session context = agent usefulness.

**ayghri/i-have-adhd** (+326): ADHD-friendly output = accessibility. Underserved use case.

---

**Bottom line:** Community đã có agent CLIs. Giờ optimize chúng (memory, compression, testing, output), xây infrastructure (kernel drivers, frameworks), và specialize vào domains cụ thể. Edge AI infrastructure đang silent build. Explosion sẽ đến khi hardware + software stack chín cùng lúc.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*