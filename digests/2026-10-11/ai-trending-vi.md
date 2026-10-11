# Xu hướng AI Mã nguồn mở 2026-10-11

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-10-11 02:00 UTC

---

# Báo cáo xu hướng AI mã nguồn mở - 11/10/2026

## 1. Tóm tắt hôm nay

Ngày hôm nay xuất hiện làn sóng mạnh về **reverse engineering với AI agents** (morluto/rea dẫn đầu với +25K stars), **agent optimization infrastructure** (context-mode, claude-mem), và **edge AI deployment** trên hardware consumer (RK3588 NPU, Orange Pi). Cộng đồng đang chuyển từ "xây agent" sang "tối ưu agent hoạt động hiệu quả" và "đưa AI xuống edge devices".

Tín hiệu rõ: Agent không còn là demo, giờ cần tools để scale production (context compression, memory persistence, multi-agent orchestration).

## 2. Top repos theo chiều

### 🤖 **AI Agents**

**Trending:**
- **morluto/rea** ⭐ +25,793 | TypeScript  
  Reverse engineer bất cứ thứ gì với agents: từ app behavior xuống native binaries

- **NousResearch/hermes-agent** ⭐ 252K | Python  
  "Agent grows with you" - agent framework tự tiến hóa theo workflow user

- **career-ops-hq/career-ops** ⭐ 74K | JavaScript  
  AI job search agent: scan job boards, score CV match, generate ATS-friendly resume, runs local trong CLI

**Search (7 ngày):**
- **HKUDS/nanobot** ⭐ 48,934 | Python  
  Ultra-lightweight self-hosted AI agent: WebUI, tools, memory, MCP, multi-agent workflows

- **zhayujie/CowAgent** ⭐ 47,327 | Python  
  Open-source personal assistant: plans tasks, runs tools, self-evolves với memory

### 🔧 **AI Infrastructure**

**Trending:**
- **mksglu/context-mode** ⭐ +178 | TypeScript  
  Context window optimization cho AI coding agents: sandboxes tool output (98% reduction), persists memory, enforces routing qua 17 platforms via MCP

- **thedotmack/claude-mem** ⭐ 99K | TypeScript  
  Persistent context across sessions: captures agent actions, compresses với AI, injects vào future sessions (Claude Code, Codex, Gemini...)

- **headroomlabs-ai/headroom** ⭐ 75K | Python  
  Compress tool outputs, logs, RAG chunks trước khi đến LLM: 20% fewer tokens cho coding agents, 60-95% cho JSON

**Công cụ dev:**
- **mattpocock/skills** ⭐ +1,736 | Shell  
  "Skills for Real Engineers" - straight from .agents directory

- **multica-ai/andrej-karpathy-skills** ⭐ +278  
  Single CLAUDE.md file cải thiện Claude Code behavior, derived từ Andrej Karpathy's observations

### 🧠 **Models & Training**

**Frameworks lớn:**
- **huggingface/transformers** ⭐ 167K (+96)  
  State-of-the-art model framework cho text, vision, audio, multimodal

- **pytorch/pytorch** ⭐ +84  
  Dynamic neural networks với GPU acceleration

### 📦 **AI Applications**

**Trending:**
- **hugohe3/ppt-master** ⭐ +461 (trending), 59K (search) | Python  
  AI → native PowerPoint: shapes, transitions, animations, data-backed charts, audio narration, template support

- **ZhuLinsen/daily_stock_analysis** ⭐ 66K | Python  
  LLM-driven multi-market stock analysis: multi-source data, real-time news, decision dashboard, automated notifications

- **CherryHQ/cherry-studio** ⭐ 52K | TypeScript  
  AI productivity studio: smart chat, autonomous agents, 300+ assistants, unified LLM access

### 🔍 **RAG & Knowledge**

**Trending:**
- **cathrynlavery/diagram-design** ⭐ +1,190 | HTML  
  Editorial diagram design cho AI coding agents: 44 diagram types, self-contained HTML+SVG, no Mermaid

**Search:**
- **infiniflow/ragflow** ⭐ 92K | Go  
  Leading RAG engine: fuses RAG với Agent capabilities

- **unclecode/crawl4ai** ⭐ 85K | Python  
  Web crawler cho LLMs: any website → clean LLM-ready Markdown

- **mem0ai/mem0** ⭐ 67K | Python  
  Memory Layer for AI Agents: drop-in memory infrastructure, context persists

### 🔌 **Embedded AI**

**Trending:**
- **boykopovar/AnyPS5** ⭐ +5,805 | C++  
  Automatic PS5 executables porting to Linux/Windows

**RK3588 NPU ecosystem (search results):**
- **gregordinary/ggml-rocket** ⭐ 23 | C++  
  Drop-in ggml backend cho Rockchip NPUs: offloads llama.cpp/whisper.cpp prefill to RK3588 NPU

- **gregordinary/rocket-userspace** ⭐ 20 | C  
  Userspace driver, matmul, on-NPU op library cho RK3588/RK3576 via mainline rocket DRM-accel driver

- **Leon6225/InternVL3.5-4B-NPU** ⭐ 5 | C++  
  Multimodal AI với InternVL3.5-4B cho RK3588 NPU

- **suan-4/rk3588-llm-inference** ⭐ 0 | Python  
  RK3588 edge LLM inference: benchmarking, bottleneck analysis, optimization (Qwen3-4B on RKNPU)

**Orange Pi ecosystem:**
- **jaylfc/taOS** ⭐ 556 | Python  
  Self-hosted AI agent OS: memory, chat, agents, files stay on hardware you own, offline-first. Offline AI memory, auto-clustering across consumer hardware (Orange/Raspberry Pi, Mac mini, gaming PC)

- **jaylfc/taosmd** ⭐ 80 | Python  
  Local-first AI memory: runs offline trên máy 8GB+ RAM (SBC, mini PC), zero-loss verbatim archive, knowledge graph

## 3. Phân tích tín hiệu xu hướng

### 🔥 **Context optimization = bottleneck mới**
3 repos trending cùng giải quyết vấn đề context window:
- **context-mode**: compress tool output 98%
- **claude-mem**: persistent context across sessions
- **headroomlabs/headroom**: compress trước khi gửi LLM

→ Agent đã hoạt động được, giờ cần chạy lâu dài không tốn token/tiền

### 🎯 **Agent infrastructure maturity**
Xu hướng từ "build one agent" → "orchestrate many agents":
- Multi-agent workflows (nanobot, CowAgent)
- Cross-platform routing (context-mode: 17 platforms)
- Memory systems (mem0, claude-mem, taosmd)

### 🏭 **Edge AI đang bùng nổ**
RK3588 NPU ecosystem xuất hiện đầy đủ stack:
- Mainline kernel driver (gregordinary/rocket-userspace)
- Backend cho llama.cpp/whisper.cpp (ggml-rocket)
- Vision models (InternVL3.5-4B-NPU)
- Benchmarking tools (rk3588-llm-inference)

→ Consumer hardware (Orange Pi, mini PC) chạy được LLM offline, không cần cloud

### 📐 **AI-native productivity tools**
Vertical products dùng AI làm core:
- **ppt-master**: document → native PowerPoint với animations, charts
- **career-ops**: job search agent chạy local trong CLI
- **daily_stock_analysis**: LLM-driven stock analysis với auto notifications

→ AI không chỉ là chatbot, giờ là automation layer cho knowledge work

### 🛠️ **Developer experience optimization**
Cộng đồng đang standardize best practices cho AI coding:
- Skills from .agents directory (mattpocock/skills)
- Andrej Karpathy's LLM coding pitfalls (multica-ai/andrej-karpathy-skills)
- Diagram design cho AI agents (cathrynlavery/diagram-design)

## 4. Tâm điểm cộng đồng

### 🥇 **morluto/rea** (+25,793 stars)
Reverse engineering với agents - từ app behavior xuống native binaries. Use case cực rộng: security research, legacy code analysis, malware analysis.

### 🥈 **boykopovar/AnyPS5** (+5,805 stars)
PS5 executables → Linux/Windows. Gaming + console emulation đang là battlefield mới cho AI-assisted tooling.

### 🥉 **storytold/artcraft** (+3,222 stars)
Intentional crafting engine cho artists, designers, filmmakers. AI cho creative workflows - niche nhưng growing.

### 💡 **Context compression ecosystem**
Ba projects (context-mode, claude-mem, headroom) cùng trending cho thấy pain point rõ: production agents cần optimize context để giảm cost + tăng session length.

### 🌐 **Edge AI homelab movement**
taOS (556 stars) + taosmd (80 stars) + RK3588 tooling: tín hiệu rõ về "AI stays on your hardware". Privacy-first, offline-first, self-hosted đang là counter-trend với cloud AI.

---

**Kết luận**: Hôm nay là ngày của **infrastructure maturity** - agent đã chạy được, giờ cần optimize để production-ready. Reverse engineering với AI, edge deployment, và context optimization là 3 tín hiệu mạnh nhất.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*