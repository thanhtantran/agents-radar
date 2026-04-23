# 📜 Scripts

Automation scripts for agents-radar daily execution.

## 📁 Files

### `run-daily.sh`
Bash script for Linux/macOS systems.

**Features:**
- ✅ Load environment variables from `.env`
- ✅ Check LLM server connection
- ✅ Check GitHub token
- ✅ Run digest generation
- ✅ Generate manifest and RSS feed
- ✅ Commit and push to GitHub
- ✅ Send Telegram notification
- ✅ Clean up old logs (30 days)
- ✅ Detailed logging

**Usage:**
```bash
chmod +x run-daily.sh
./run-daily.sh
```

**Cronjob:**
```bash
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

### `run-daily.bat`
Batch script for Windows systems.

**Features:**
- Same as `run-daily.sh` but for Windows
- Compatible with Task Scheduler
- Proper error handling
- Log file support

**Usage:**
```cmd
scripts\run-daily.bat
```

**Task Scheduler:**
- Program: `C:\path\to\agents-radar\scripts\run-daily.bat`
- Start in: `C:\path\to\agents-radar`
- Trigger: Daily at 9:00 AM

## 📊 Logs

Logs are saved in `logs/daily-YYYY-MM-DD.log`

**Example log:**
```
[2026-04-22 09:00:01] ==========================================
[2026-04-22 09:00:01] Starting agents-radar daily run
[2026-04-22 09:00:01] ==========================================
[2026-04-22 09:00:01] Loading environment variables from .env
[2026-04-22 09:00:02] Checking LLM server connection...
[2026-04-22 09:00:02] ✓ LLM server is running
[2026-04-22 09:00:02] ✓ GitHub token is set
[2026-04-22 09:00:02] Running digest generation...
[2026-04-22 09:05:30] ✓ Digest generation completed successfully
[2026-04-22 09:05:30] Generating manifest and RSS feed...
[2026-04-22 09:05:31] ✓ Manifest and RSS feed generated
[2026-04-22 09:05:31] Committing changes to git...
[2026-04-22 09:05:32] Pushing to GitHub...
[2026-04-22 09:05:35] ✓ Changes pushed to GitHub
[2026-04-22 09:05:35] Sending Telegram notification...
[2026-04-22 09:05:36] ✓ Telegram notification sent
[2026-04-22 09:05:36] Cleaning up old logs...
[2026-04-22 09:05:36] ==========================================
[2026-04-22 09:05:36] Daily run completed successfully!
[2026-04-22 09:05:36] ==========================================
```

## 🔍 Monitoring

### View latest log
```bash
# Linux/macOS
tail -f logs/daily-$(date +%Y-%m-%d).log

# Windows
type logs\daily-2026-04-22.log
```

### List logs
```bash
# Linux/macOS
ls -lt logs/

# Windows
dir /o-d logs\
```

### Check git commits
```bash
git log --oneline --since="7 days ago"
```

## ⚙️ Configuration

Scripts read configuration from:
1. `.env` file in project root
2. Environment variables

**Required:**
- `GITHUB_TOKEN` - GitHub personal access token

**Optional:**
- `OPENAI_BASE_URL` - LLM endpoint (default: http://localhost:20128/v1)
- `OPENAI_MODEL` - Model name (default: gpt-4o)
- `DIGEST_REPO` - Repository for GitHub Issues
- `TELEGRAM_BOT_TOKEN` - Telegram bot token
- `TELEGRAM_CHAT_ID` - Telegram chat ID

## 🐛 Troubleshooting

### Script fails to run

**Linux/macOS:**
```bash
# Check permissions
ls -la scripts/run-daily.sh

# Add execute permission
chmod +x scripts/run-daily.sh

# Check shebang
head -1 scripts/run-daily.sh  # Should be #!/bin/bash
```

**Windows:**
```cmd
# Run as administrator
# Check file encoding (should be ANSI or UTF-8 without BOM)
```

### LLM server not responding

```bash
# Check if server is running
curl http://localhost:11434/v1/models  # Ollama
curl http://localhost:1234/v1/models   # LM Studio

# Start server if not running
ollama serve  # Ollama
# Or start LM Studio manually
```

### Git push fails

```bash
# Configure git credentials
git config --global credential.helper store

# Or use SSH
ssh-keygen -t ed25519
cat ~/.ssh/id_ed25519.pub  # Add to GitHub

# Test connection
ssh -T git@github.com
```

### Environment variables not loaded

**Linux/macOS:**
```bash
# Check .env file exists
ls -la .env

# Check .env format (no spaces around =)
cat .env

# Source manually
source .env
./scripts/run-daily.sh
```

**Windows:**
```cmd
# Check .env file exists
dir .env

# Check file encoding
# Should be ANSI or UTF-8 without BOM
```

## 📚 Documentation

- [docs/CRONJOB-SETUP.md](../docs/CRONJOB-SETUP.md) - Detailed setup guide
- [CRONJOB-QUICKSTART.md](../CRONJOB-QUICKSTART.md) - Quick start guide
- [README.md](../README.md) - Main documentation

## 🎯 Best Practices

1. **Test manually** before setting up cronjob
2. **Monitor logs** for first few runs
3. **Keep LLM server running** as a service
4. **Backup** `.env` file
5. **Check disk space** regularly
6. **Review output quality** periodically

---

**Need help?** See [docs/CRONJOB-SETUP.md](../docs/CRONJOB-SETUP.md)
