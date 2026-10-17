# Xu hướng AI Mã nguồn mở 2026-10-17

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-17 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 17/10/2026

## 📊 Tóm tắt hôm nay

**Đột phá**: Agent ecosystem bùng nổ với plugins, skills, harness systems.

**Công nghệ nóng**: 
- Agent Skills & Plugins standard đang thống nhất
- Context optimization (98% token reduction)
- Edge AI trên NPU RK3588 trưởng thành
- Self-hosted agent OS cho homelab

**Con số**: 10/13 top trending repos về AI agents và infrastructure.

---

## 🗂️ Top repos theo chiều

### 🤖 AI Agents

**anthropics/claude-plugins-official** ⭐ +1,552
Official plugin directory từ Anthropic, định hướng chuẩn cho Claude Code ecosystem.

**ruvnet/ruflo** ⭐ +672  
Multi-player swarm coordination với adaptive memory, RAG, tích hợp Claude Code/Codex/Hermes.

**obra/superpowers** ⭐ +973  
Agentic skills framework + software dev methodology, focus vào workflow thực tế.

**affaan-m/ECC** ⭐ +1,057  
Agent harness optimization: skills, memory, security cho Claude Code/Codex/Cursor.

**NousResearch/hermes-agent** ⭐ 254K  
Agent tự tiến hóa, top GitHub về popularity.

**zhayujie/CowAgent** ⭐ 47K  
Opensource personal AI assistant, multi-agent/model/channel, lightweight, extensible.

**HKUDS/nanobot** ⭐ 49K  
Ultra-lightweight agent framework với WebUI, tools, memory, MCP, automation.

**career-ops-hq/career-ops** ⭐ 75K  
AI job search agent: score jobs, tailor CV/cover letter, interview prep, chạy local CLI.

---

### 🔧 AI Infrastructure

**K-Dense-AI/scientific-agent-skills** ⭐ +1,158  
177 validated skills + 100+ scientific databases, 250K+ scientists dùng. Agent Skills standard.

**mksglu/context-mode** ⭐ +449  
Context window optimization: sandbox tool output (98% token reduction), session memory, 17 platforms.

**thedotmack/claude-mem** ⭐ 101K  
Persistent context cross-session, AI compression, inject relevant context. Works with mọi agent.

**headroomlabs-ai/headroom** ⭐ 75K  
Compress tool outputs/logs/RAG trước khi đưa vào LLM. 20-95% token reduction.

**Graphify-Labs/graphify** ⭐ 127K  
Codebase → queryable knowledge graph. Local AST parsing, no vector store.

**xerj-org/xerj** ⭐ +1,648  
Autoindex data cho agents, Elasticsearch compatible, dùng 40x ít tokens hơn grep.

**cursor/plugins** ⭐ +278  
Cursor plugin spec + official plugins.

**morluto/rea** ⭐ 291K  
Reverse engineer anything với agents, từ app behavior đến native binaries.

---

### 🧠 Models & Training

**debpalash/VoiceStudio** ⭐ +2,301  
Opensource local ElevenLabs alternative: voice cloning, design, dubbing, transcription 646 ngôn ngữ.

**ollama/ollama** ⭐ 183K  
Run Kimi, GLM, MiniMax, DeepSeek, Qwen, Gemma local.

**huggingface/transformers** ⭐ 167K  
Framework cho SOTA models: text, vision, audio, multimodal.

---

### 📦 AI Applications

**MadsLorentzen/ai-job-search** ⭐ +898  
Job search trên Claude Code: evaluate postings, tailor CV, cover letters, interview prep.

**hmjz100/LinkSwift** ⭐ +538  
Network drive direct link tool cho 8 platforms (Baidu, Aliyun, QuarkCloud...).

**hugohe3/ppt-master** ⭐ 62K  
AI doc/topic → native PowerPoint với shapes, transitions, animations, charts, audio.

**ZhuLinsen/daily_stock_analysis** ⭐ 66K  
LLM multi-market stock analysis: real-time news, decision dashboard, auto notifications.

**harry0703/MoneyPrinterTurbo** ⭐ 132K  
AI tạo HD short videos từ topic/keyword, automated workflow.

---

### 🔍 RAG & Knowledge

**open-webui/open-webui** ⭐ 155K  
User-friendly AI interface, supports Ollama/OpenAI API.

**langchain-ai/langchain** ⭐ 147K  
Agent engineering platform.

**Shubhamsaboo/awesome-llm-apps** ⭐ 142K  
100+ AI Agents, Skills, RAG Apps opensource.

**infiniflow/ragflow** ⭐ 92K  
Leading RAG engine fused với Agent capabilities.

**unclecode/crawl4ai** ⭐ 85K  
Opensource web crawler for LLMs: website → clean Markdown.

**mem0ai/mem0** ⭐ 67K  
Memory layer for AI agents, drop-in infrastructure, production-ready.

**siyuan-note/siyuan** ⭐ 46K  
Opensource knowledge workspace nơi humans + AI agents collaborate.

---

### 🔌 Embedded AI

**jaylfc/taOS** ⭐ 564  
Self-hosted agent OS cho hardware sở hữu: memory, chat, agents, files offline. Auto-clustering Orange Pi, Mac mini, gaming PC.

**jaylfc/taosmd** ⭐ 81  
Local-first AI memory offline trên 8 GB+ RAM (SBC, mini PC). Zero-loss archive, knowledge graph.

**gregordinary/ggml-rocket** ⭐ 24  
Drop-in ggml backend cho Rockchip NPUs: offload llama.cpp/whisper.cpp prefill lên RK3588 NPU.

**happyme531/open_rknpu2_lm_infer** ⭐ 12  
Fully opensource LLM inference engine cho RK3588 NPU.

**Leon6225/InternVL3.5-4B-NPU** ⭐ 5  
Multimodal AI InternVL3.5-4B cho RK3588 NPU.

**kyshipit/eai-rk3588** ⭐ 4  
Extensible RK3588 edge inference platform: multi-threaded pipeline, RKNN adapters, RKLLM chat.

**isac322/rkmon** ⭐ 13  
Real-time hardware monitor TUI cho RK3588 SBCs: GPU, NPU, VPU, RGA, thermal.

**nouverse/nouride-releases** ⭐ 18  
Lightweight multi-agent AI engine daemon cho homelab, Pi/mini devices.

**MichaIng/DietPi** ⭐ 6,330  
Lightweight SBC OS, supports Orange Pi.

---

## 🔥 Phân tích tín hiệu xu hướng

### 1. **Agent Skills Standard hình thành**
- Anthropic official plugins, Cursor spec, scientific-agent-skills
- 177 validated skills cho science domain
- Ecosystem đang thống nhất APIs + protocols

### 2. **Context optimization = bài toán sống còn**
- 98% token reduction (mksglu/context-mode)
- 40x fewer tokens (xerj)
- 20-95% reduction (headroom)
- Agent cost efficiency từ edge case → core value

### 3. **Edge AI NPU trưởng thành**
- RK3588 NPU: từ experimental → production-ready
- ggml backend drop-in, mainline kernel drivers
- Full open-source LLM inference engines
- Homelab/SBC ecosystem bùng nổ (Orange Pi, taOS)

### 4. **Self-hosted agent platforms**
- Privacy-first, offline-by-default (taOS, taosmd)
- Multi-device clustering (SBC + desktop)
- Zero-cloud knowledge workspace (siyuan-note)

### 5. **Vertical AI applications**
- Job search agents (career-ops, ai-job-search)
- Stock analysis (daily_stock_analysis)
- Voice cloning (VoiceStudio)
- Content generation (ppt-master, MoneyPrinterTurbo)

### 6. **Memory & persistence architecture**
- Cross-session context (claude-mem, mem0)
- Knowledge graphs (graphify)
- Offline-first memory (taosmd)
- Agent identity/continuity = core infra

---

## 🎯 Tâm điểm cộng đồng

**🥇 anthropics/claude-plugins-official** (+1,552 ⭐ today)  
Anthropic chính thức tham chiến plugin ecosystem, định hướng chuẩn cho Claude Code. Signal: official backing drives adoption.

**🥈 debpalash/VoiceStudio** (+2,301 ⭐ today)  
Voice cloning opensource local, 646 languages. Replace ElevenLabs cloud. Community thèm privacy + cost control.

**🥉 xerj-org/xerj** (+1,648 ⭐ today)  
Autoindex cho agents, 40x token efficiency. RAG infra lần đầu focus token cost, không chỉ accuracy.

**🔧 K-Dense-AI/scientific-agent-skills** (+1,158 ⭐ today)  
250K+ scientists dùng, 177 validated skills. Agent Skills standard từ vertical domain đi ra. Science = demanding testbed.

**💡 mksglu/context-mode** (+449 ⭐ today)  
98% token reduction từ sandbox tool outputs. Context optimization từ prompt engineering → infrastructure layer.

---

**Kết luận**: Agent ecosystem đang standardize (plugins, skills), edge AI đủ trưởng thành cho production homelab, context optimization = new battleground. Self-hosted + privacy-first gaining traction. Science domain leading Agent Skills standardization.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*