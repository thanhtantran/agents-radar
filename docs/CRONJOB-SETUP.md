# 🕐 Hướng dẫn Setup Cronjob

Hướng dẫn cài đặt cronjob để agents-radar tự động chạy hàng ngày lúc 9h sáng.

## 📋 Yêu cầu

- ✅ LLM server đang chạy (Ollama, LM Studio, v.v.)
- ✅ Git đã cấu hình với SSH key hoặc credential helper
- ✅ Environment variables đã được cấu hình
- ✅ Đã test chạy thành công: `pnpm start`

## 🐧 Linux / macOS

### Bước 1: Cấp quyền thực thi cho script

```bash
chmod +x scripts/run-daily.sh
```

### Bước 2: Test script

```bash
cd /path/to/agents-radar
./scripts/run-daily.sh
```

Kiểm tra log trong `logs/daily-YYYY-MM-DD.log`

### Bước 3: Cấu hình crontab

```bash
crontab -e
```

Thêm dòng sau (chạy lúc 9h sáng mỗi ngày):

```bash
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

**Lưu ý**: Thay `/path/to/agents-radar` bằng đường dẫn thực tế của bạn.

### Bước 4: Verify crontab

```bash
crontab -l
```

### Các thời gian khác:

```bash
# 9h sáng mỗi ngày
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh

# 8h sáng mỗi ngày
0 8 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh

# 9h sáng thứ 2-6 (không chạy cuối tuần)
0 9 * * 1-5 cd /path/to/agents-radar && ./scripts/run-daily.sh

# 9h sáng và 9h tối mỗi ngày
0 9,21 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

### Bước 5: Đảm bảo LLM server luôn chạy

#### Option A: Chạy Ollama như service (khuyến nghị)

```bash
# Tạo systemd service
sudo nano /etc/systemd/system/ollama.service
```

Nội dung:

```ini
[Unit]
Description=Ollama LLM Server
After=network.target

[Service]
Type=simple
User=your-username
ExecStart=/usr/local/bin/ollama serve
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable và start:

```bash
sudo systemctl enable ollama
sudo systemctl start ollama
sudo systemctl status ollama
```

#### Option B: Chạy trong tmux/screen

```bash
# Tạo tmux session
tmux new -s ollama

# Chạy Ollama
ollama serve

# Detach: Ctrl+B, D
```

Thêm vào crontab để auto-start khi reboot:

```bash
@reboot tmux new-session -d -s ollama 'ollama serve'
```

## 🪟 Windows

### Bước 1: Test script

```cmd
cd C:\path\to\agents-radar
scripts\run-daily.bat
```

Kiểm tra log trong `logs\daily-YYYY-MM-DD.log`

### Bước 2: Tạo Task Scheduler

1. Mở **Task Scheduler** (Tìm kiếm "Task Scheduler" trong Start Menu)

2. Click **Create Task** (không phải Create Basic Task)

3. Tab **General**:
   - Name: `agents-radar-daily`
   - Description: `Run agents-radar daily digest`
   - ✅ Run whether user is logged on or not
   - ✅ Run with highest privileges

4. Tab **Triggers**:
   - Click **New**
   - Begin the task: **On a schedule**
   - Settings: **Daily**
   - Start: **9:00:00 AM**
   - ✅ Enabled

5. Tab **Actions**:
   - Click **New**
   - Action: **Start a program**
   - Program/script: `C:\path\to\agents-radar\scripts\run-daily.bat`
   - Start in: `C:\path\to\agents-radar`

6. Tab **Conditions**:
   - ❌ Start the task only if the computer is on AC power (uncheck nếu dùng laptop)
   - ✅ Wake the computer to run this task

7. Tab **Settings**:
   - ✅ Allow task to be run on demand
   - ✅ Run task as soon as possible after a scheduled start is missed
   - If the task fails, restart every: **10 minutes**
   - Attempt to restart up to: **3 times**

8. Click **OK** và nhập password nếu được yêu cầu

### Bước 3: Test Task

Right-click task → **Run**

Kiểm tra log trong `logs\`

### Bước 4: Đảm bảo LLM server luôn chạy

#### Option A: Chạy LM Studio như service

1. Tải **NSSM** (Non-Sucking Service Manager): https://nssm.cc/download

2. Cài đặt LM Studio như service:

```cmd
nssm install LMStudio "C:\Users\YourName\AppData\Local\Programs\LM Studio\LM Studio.exe"
nssm set LMStudio AppDirectory "C:\Users\YourName\AppData\Local\Programs\LM Studio"
nssm set LMStudio Start SERVICE_AUTO_START
nssm start LMStudio
```

#### Option B: Chạy Ollama như service

Ollama tự động cài đặt như Windows service khi cài đặt.

Kiểm tra:

```cmd
sc query ollama
```

Nếu không chạy:

```cmd
sc start ollama
```

## 🔧 Troubleshooting

### Cronjob không chạy

**Linux/macOS:**

```bash
# Kiểm tra cron service
sudo systemctl status cron  # hoặc crond

# Kiểm tra cron logs
grep CRON /var/log/syslog  # Ubuntu/Debian
grep CRON /var/log/cron    # CentOS/RHEL

# Test với absolute paths
0 9 * * * /usr/bin/bash /full/path/to/agents-radar/scripts/run-daily.sh
```

**Windows:**

- Kiểm tra Task Scheduler History
- Đảm bảo user có quyền chạy task
- Kiểm tra log file

### LLM server không kết nối được

```bash
# Kiểm tra LLM server
curl http://localhost:11434/v1/models  # Ollama
curl http://localhost:1234/v1/models   # LM Studio

# Kiểm tra port đang được sử dụng
netstat -an | grep 11434  # Linux/macOS
netstat -an | findstr 11434  # Windows
```

### Git push thất bại

```bash
# Cấu hình Git credential helper
git config --global credential.helper store

# Hoặc sử dụng SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub  # Add to GitHub

# Test SSH connection
ssh -T git@github.com
```

### Environment variables không load

**Linux/macOS:**

Thêm vào crontab:

```bash
0 9 * * * cd /path/to/agents-radar && source .env && ./scripts/run-daily.sh
```

Hoặc sử dụng absolute path trong `.env`:

```bash
GITHUB_TOKEN=ghp_xxx
OPENAI_BASE_URL=http://localhost:11434/v1
```

**Windows:**

Đảm bảo `.env` file có format đúng (không có BOM, line endings là CRLF)

### Script chạy nhưng không commit

```bash
# Kiểm tra git status
cd /path/to/agents-radar
git status

# Kiểm tra git config
git config user.name
git config user.email

# Nếu chưa có, cấu hình:
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## 📊 Monitoring

### Xem logs

```bash
# Linux/macOS
tail -f logs/daily-$(date +%Y-%m-%d).log

# Windows
type logs\daily-2026-04-22.log
```

### Kiểm tra cronjob đã chạy

```bash
# Linux/macOS
ls -lt logs/

# Windows
dir /o-d logs\
```

### Kiểm tra git commits

```bash
git log --oneline --since="7 days ago"
```

## 🔔 Notifications

### Email notification (Linux/macOS)

Cài đặt `mailutils`:

```bash
sudo apt-get install mailutils  # Ubuntu/Debian
sudo yum install mailx          # CentOS/RHEL
```

Cập nhật crontab:

```bash
MAILTO=your.email@example.com
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

### Telegram notification

Đã được tích hợp trong script. Chỉ cần cấu hình:

```bash
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=@your_channel
```

## 📝 Best Practices

1. **Test thoroughly** trước khi setup cronjob
2. **Monitor logs** trong vài ngày đầu
3. **Backup** `.env` và `config.yml`
4. **Keep LLM server running** 24/7
5. **Check disk space** định kỳ
6. **Update dependencies** thường xuyên
7. **Review output quality** định kỳ

## 🎯 Advanced Setup

### Chạy nhiều instances

Nếu muốn theo dõi nhiều repos khác nhau:

```bash
# Instance 1: OpenClaw
0 9 * * * cd /path/to/agents-radar-openclaw && ./scripts/run-daily.sh

# Instance 2: Embedded AI
0 10 * * * cd /path/to/agents-radar-embedded && ./scripts/run-daily.sh
```

### Retry on failure

Thêm vào script:

```bash
# Retry up to 3 times
for i in {1..3}; do
    if ./scripts/run-daily.sh; then
        break
    fi
    sleep 300  # Wait 5 minutes before retry
done
```

### Health check

Tạo script `scripts/health-check.sh`:

```bash
#!/bin/bash
# Check if last run was successful
LAST_LOG=$(ls -t logs/daily-*.log | head -1)
if grep -q "completed successfully" "$LAST_LOG"; then
    echo "✓ Last run successful"
    exit 0
else
    echo "✗ Last run failed"
    exit 1
fi
```

Chạy health check mỗi giờ:

```bash
0 * * * * /path/to/agents-radar/scripts/health-check.sh
```

## 📚 Resources

- [Crontab Guru](https://crontab.guru/) - Crontab expression generator
- [Ollama Documentation](https://github.com/ollama/ollama/blob/main/docs/linux.md)
- [Task Scheduler Guide](https://docs.microsoft.com/en-us/windows/win32/taskschd/task-scheduler-start-page)

---

**Chúc bạn setup thành công!** 🎉
