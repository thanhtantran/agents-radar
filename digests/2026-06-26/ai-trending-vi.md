# Xu hướng AI Mã nguồn mở 2026-06-26

> Nguồn: GitHub Trending + GitHub Search API | Thời gian tạo: 2026-06-26 02:00 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở - 26/06/2026

## 📊 Tóm tắt hôm nay

Cộng đồng AI mã nguồn mở đang chứng kiến sự chuyển dịch mạnh mẽ từ **"coding assistants"** sang **"agentic development platforms"**. Các công cụ không còn chỉ đơn thuần hỗ trợ viết code, mà đang tiến hóa thành các hệ thống tự động có khả năng quản lý dự án, thiết kế kiến trúc, và thực thi workflow phức tạp.

Điểm đặc biệt hôm nay: **sự bùng nổ của embedded AI** với các giải pháp tối ưu cho NPU Rockchip (RKLLM, RKNPU), cho thấy xu hướng đưa AI về thiết bị biên đang đạt đến mức độ thực dụng.

---

## 🗂️ Top repos theo chiều

### 🤖 AI Agents

**1. NousResearch/hermes-agent** ⭐ 203,106 (+203K)
- Agent tự tiến hóa, học hỏi từ tương tác của người dùng
- Đây là con số tăng trưởng bất thường nhất hôm nay - cho thấy nhu cầu về agent có khả năng tự phát triển

**2. shareAI-lab/learn-claude-code** ⭐ 68,428
- Framework "agent harness" xây dựng từ đầu
- "Bash is all you need" - triết lý minimalist trong thiết kế agent

**3. santifer/career-ops** ⭐ 55,748
- Hệ thống tìm việc được AI điều phối với 14 skill modes
- Use case thực tế: từ agent framework đến ứng dụng cụ thể

**4. zhayujie/CowAgent** ⭐ 45,607
- Agent harness nhẹ, mở rộng được, cài đặt 1 dòng
- Multi-model, multi-channel - xu hướng không phụ thuộc vào một LLM

**5. HKUDS/nanobot** ⭐ 44,744
- Agent nhẹ cho tools, chats, workflows
- Tiếp tục xu hướng "lightweight" - quan trọng hơn tính năng là hiệu suất

**6. Panniantong/Agent-Reach** ⭐ 41,272
- Agent có khả năng đọc và search toàn bộ internet
- Zero API fees - mô hình không phụ thuộc vào dịch vụ thương mại

### 🔧 AI Infrastructure

**1. affaan-m/ECC** ⭐ 221,767 (+222K) 🔥
- **REPO NỔI BẬT NHẤT**: Hệ thống tối ưu hiệu suất cho agent harness
- Skills, instincts, memory, security - kiến trúc toàn diện
- Tương thích với Claude Code, Codex, Opencode, Cursor

**2. thedotmack/claude-mem** ⭐ 84,303
- Persistent context giữa các session
- Giải quyết pain point lớn: agent "quên" context khi restart

**3. safishamsi/graphify** ⭐ 72,126
- Biến mọi folder code, schema, docs thành knowledge graph
- Bridge giữa unstructured code và structured knowledge

**4. google-labs-code/design.md** ⭐ 0 (+1,475)
- Spec format mô tả visual identity cho coding agents
- Google Labs chính thức tham gia cuộc chơi agent tooling

**5. garrytan/gstack** ⭐ 0 (+767)
- Setup Claude Code của Garry Tan: 23 opinionated tools
- CEO, Designer, Eng Manager, Release Manager trong một stack

**6. JCodesMore/ai-website-cloner-template** ⭐ 0 (+1,024)
- Clone bất kỳ website nào với 1 command qua AI agent
- Democratizing web scraping và reverse engineering

### 🧠 Models & Training

**1. ollama/ollama** ⭐ 174,912
- Hỗ trợ các model mới: Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek
- Local inference engine tiếp tục là nền tảng quan trọng

**2. huggingface/transformers** ⭐ 161,923
- Framework định nghĩa model state-of-the-art
- Text, vision, audio, multimodal - inference & training

**3. vllm-project/vllm** ⭐ 84,331
- High-throughput, memory-efficient inference engine
- Critical infrastructure cho production LLM serving

### 📦 AI Applications

**1. calesthio/OpenMontage** ⭐ 0 (+3,434) 🎬
- **Ứng dụng đột phá**: Hệ thống sản xuất video agentic đầu tiên
- 12 pipelines, 52 tools, 500+ agent skills
- Biến AI coding assistant thành studio sản xuất video

**2. xbtlin/ai-berkshire** ⭐ 0 (+309)
- Framework nghiên cứu đầu tư giá trị dựa trên Claude Code
- 4 phương pháp luận của các bậc thầy đầu tư + multi-agent analysis

**3. ZhuLinsen/daily_stock_analysis** ⭐ 49,553
- LLM-powered stock analysis: multi-source data, real-time news
- Cost-free scheduled runs - automation cho retail investors

**4. CherryHQ/cherry-studio** ⭐ 47,800
- AI productivity studio với smart chat, autonomous agents
- 300+ assistants, unified access to frontier LLMs

**5. mukul975/Anthropic-Cybersecurity-Skills** ⭐ 0 (+571)
- 817 cybersecurity skills cho AI agents
- Mapped to 6 frameworks: MITRE ATT&CK, NIST CSF, ATLAS, etc.

**6. shanraisshan/claude-code-best-practice** ⭐ 0 (+287)
- "From vibe coding to agentic engineering"
- Best practices documentation cho Claude Code workflow

### 🔍 RAG & Knowledge

**1. langgenius/dify** ⭐ 146,579
- Production-ready platform cho agentic workflow
- Tiếp tục dẫn đầu RAG platform space

**2. open-webui/open-webui** ⭐ 143,013
- User-friendly AI interface
- Bridge giữa technical platform và end-user experience

**3. infiniflow/ragflow** ⭐ 83,639
- RAG engine kết hợp Agent capabilities
- Superior context layer cho LLMs

**4. Mintplex-Labs/anything-llm** ⭐ 62,111
- "Stop renting your intelligence. Own it."
- Local-first agent experience - data sovereignty

**5. opendatalab/MinerU** ⭐ 0 (+644)
- Transform PDFs, Office docs thành LLM-ready markdown/JSON
- Document processing cho agentic workflows

### 🔌 Embedded AI

**1. NotPunchnox/rkllama** ⭐ 561
- **Ollama alternative cho Rockchip NPU**
- Optimized NPU support cho RK3588 và các thiết bị Rockchip

**2. zyp0424/Qwen-Chat-Assistant** ⭐ 17
- Voice chat assistant hoàn toàn local trên RK3588
- Qwen3-2B (rknn+rkllm) + camera + speaker
- KWS wake word + ASR + TTS pipeline

**3. jaylfc/taOS** ⭐ 259
- **Self-hosted AI agent OS**
- Chạy offline trên SBC, mini PC, laptop với 8GB+ RAM
- Memory, chat, agents, files stay on hardware you own

**4. Leon6225/InternVL3.5-4B-NPU** ⭐ 3
- Multimodal AI (InternVL3.5-4B) cho RK3588 NPU
- Vision + language understanding trên edge device

**5. Hanzo-Huang/rk3576-home-assistant-voice** ⭐ 1
- Local Home Assistant voice stack cho RK3576
- NPU-accelerated Whisper + Piper + Wyoming

**6. oRKLLM/oRKLLM** ⭐ 2 (new project)
- Dự án mới trong ecosystem RKLLM

**7. apple/container** ⭐ 0 (+1,351)
- Tool tạo và chạy Linux containers bằng VMs trên Mac
- Swift, optimized cho Apple silicon
- Interesting: Apple vào cuộc chơi containerization

---

## 🔥 Phân tích tín hiệu xu hướng

### 1. **Agent Harness Architecture đang trở thành chuẩn mực**
- Các project không còn xây dựng agent đơn lẻ mà xây **harness** - framework điều phối agent
- ECC, learn-claude-code, CowAgent đều theo mô hình này
- Pattern: Skills + Memory + Tools + Orchestration

### 2. **Embedded AI đạt ngưỡng thực dụng**
- RKLLM/RKNPU cho Rockchip NPU đang có momentum rõ rệt
- Voice assistants, multimodal AI chạy hoàn toàn local trên SBC ~$100
- Xu hướng: từ cloud AI → edge AI → ultra-edge AI (NPU)

### 3. **"Local-first" trở thành selling point chính**
- claude-mem: "persistent context"
- taOS: "hardware you own, offline by default"
- anything-llm: "stop renting your intelligence"
- Phản ứng lại với privacy concerns và vendor lock-in

### 4. **Design-to-Code với Agent Awareness**
- design.md từ Google Labs: agents cần hiểu design system
- Không chỉ "code from spec" mà "maintain design consistency across agent iterations"

### 5. **Vertical AI Applications bùng nổ**
- OpenMontage (video), ai-berkshire (finance), career-ops (recruitment)
- Pattern: General agent platform → Specialized vertical solution
- Cho thấy ecosystem đủ mature để build production apps

### 6. **Multi-Framework Compatibility**
- Most tools support: Claude Code, Codex, Cursor, Gemini, OpenCode
- Standard interface đang hình thành (Claude Code style là de facto standard?)

### 7. **Knowledge Graph > Vector Database**
- graphify: code + schema + infra trong một graph
- Xu hướng: từ semantic search sang relational reasoning

---

## 🎯 Tâm điểm cộng đồng

### 🏆 Breakout Stars (tăng trưởng bất thường)

1. **affaan-m/ECC** (+221K ⭐ trong 1 ngày)
   - Con số này gần như không thể tin được - có thể là viral hit hoặc aggregated launch
   - Nếu thực, đây là dấu hiệu community đang đói khát một "optimization layer" cho agent harness

2. **NousResearch/hermes-agent** (+203K)
   - "Agent that grows with you" - messaging cực kỳ powerful
   - Self-evolution là holy grail của AI agents

3. **calesthio/OpenMontage** (+3,434)
   - First open-source agentic video production system
   - Niche nhưng có tiềm năng massive: democratizing video production

### 🔮 Dark Horses (projects mới nhưng có concept mạnh)

1. **google-labs-code/design.md** (+1,475)
   - Google Labs chính thức nhập cuộc
   - Design system for agents - addressing real pain point

2. **garrytan/gstack** (+767)
   - Personal brand (Garry Tan) + curated toolset
   - "23 opinionated tools" - opinionated trumps flexible trong agent world

3. **jaylfc/taOS** (259 ⭐)
   - Self-hosted AI agent OS
   - Đầy tham vọng: OS-level abstraction cho agents
   - Nếu deliver được, có thể là game changer

### 📚 Educational Movement

**shanraisshan/claude-code-best-practice** (+287)
- "From vibe coding to agentic engineering"
- Community đang chuyển từ experimentation sang systematic practice
- Cần best practices để scale adoption

---

## 💡 Kết luận

**Thị trường đang ở giai đoạn consolidation:**
- Frameworks ổn định → Vertical applications bùng nổ
- Cloud AI → Edge AI migration đang tăng tốc
- Individual agents → Orchestrated multi-agent systems

**Opportunity spaces:**
1. **Agent harness optimization** (ECC đang lead)
2. **Embedded AI tooling** (RKLLM ecosystem đang nóng)
3. **Vertical AI applications** (OpenMontage model)
4. **Local-first infrastructure** (taOS, anything-llm direction)

**Risk:**
- Fragmentation: quá nhiều frameworks, cần standardization
- Complexity creep: agent systems đang trở nên quá phức tạp cho average developer
- Privacy/security: local-first giải quyết privacy nhưng tạo ra security challenges mới

---

*Phân tích dựa trên GitHub trending data ngày 26/06/2026. Star counts có thể bị ảnh hưởng bởi bot/manipulation - luôn verify trước khi đầu tư effort.*

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*