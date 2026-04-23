# agents-radar

English | [Tiếng Việt](./README.md)

A GitHub Actions workflow that runs daily to track and generate reports on:
1. **OpenClaw ecosystem** and similar AI agent projects
2. **Embedded AI**: Orange Pi, RKLLM, RKNPU and related projects

Reports are automatically generated using LLM (running locally), saved as Markdown, and published via GitHub Pages.

## 🌐 Web UI

**[https://thanhtantran.github.io/agents-radar](https://thanhtantran.github.io/agents-radar)**

Browse all historical digests in a clean, dark-themed interface — no login required.

## 📡 RSS Feed

**[https://thanhtantran.github.io/agents-radar/feed.xml](https://thanhtantran.github.io/agents-radar/feed.xml)**

Subscribe in any RSS reader to receive new digests automatically.

## 📊 Data Sources

### 1. OpenClaw Ecosystem & AI Agents

Tracks OpenClaw as the primary reference project, along with related AI agent projects for cross-ecosystem comparison.

### 2. Embedded AI (Orange Pi / RKLLM / RKNPU)

Tracks projects related to AI on embedded hardware, especially Rockchip NPU platforms.

### 3. GitHub Trending

- Daily trending repositories from github.com/trending
- GitHub Search API for repos active in the last 7 days matching topics: `llm`, `ai-agent`, `rag`, `orangepi`, `rkllm`, `rknpu`

## ✨ Features

- ✅ Fetch issues, PRs, and releases updated in the last 24 hours
- ✅ Generate detailed summaries for each project
- ✅ Multi-project comparison analysis
- ✅ Daily GitHub Trending tracking with intelligent categorization
- ✅ Topic-based repository search (AI agents, embedded AI, NPU)
- ✅ Publish GitHub Issues for each report type
- ✅ Commit Markdown files to `digests/YYYY-MM-DD/`
- ✅ Run on schedule via GitHub Actions
- ✅ Support for local LLM (no API key needed)
- ✅ Telegram notifications (optional)
- ✅ Flexible configuration via `config.yml`

## 🚀 Setup

See [Vietnamese README](./README.md) for detailed setup instructions.

## 📝 License

MIT License

## 🙏 Credits

Based on ideas from [compasify/agents-radar](https://github.com/compasify/agents-radar), customized to focus on OpenClaw ecosystem and embedded AI.

---

**⭐ If this project is useful, please give it a star!**
