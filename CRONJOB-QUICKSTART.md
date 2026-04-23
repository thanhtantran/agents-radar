# ⏰ Cronjob Quick Start

Hướng dẫn nhanh setup cronjob để agents-radar tự động chạy mỗi ngày lúc 9h sáng.

## 🚀 Linux/macOS (5 phút)

```bash
# 1. Cấp quyền thực thi
chmod +x scripts/run-daily.sh

# 2. Test script
./scripts/run-daily.sh

# 3. Kiểm tra log
cat logs/daily-$(date +%Y-%m-%d).log

# 4. Thêm vào crontab
crontab -e

# 5. Thêm dòng này (Ctrl+O để save, Ctrl+X để exit)
0 9 * * * cd /home/your-username/agents-radar && ./scripts/run-daily.sh

# 6. Verify
crontab -l
```

**Đảm bảo LLM server luôn chạy:**

```bash
# Tạo systemd service cho Ollama
sudo nano /etc/systemd/system/ollama.service
```

Paste nội dung:
```ini
[Unit]
Description=Ollama LLM Server
After=network.target

[Service]
Type=simple
User=your-username
ExecStart=/usr/local/bin/ollama serve
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable:
```bash
sudo systemctl enable ollama
sudo systemctl start ollama
```

## 🪟 Windows (5 phút)

### 1. Test script

```cmd
cd C:\Users\YourName\agents-radar
scripts\run-daily.bat
```

### 2. Tạo Task Scheduler

1. **Mở Task Scheduler** (Win+R → `taskschd.msc`)

2. **Create Task** (không phải Create Basic Task)

3. **General tab**:
   - Name: `agents-radar-daily`
   - ✅ Run whether user is logged on or not
   - ✅ Run with highest privileges

4. **Triggers tab**:
   - New → Daily → 9:00 AM → OK

5. **Actions tab**:
   - New → Start a program
   - Program: `C:\Users\YourName\agents-radar\scripts\run-daily.bat`
   - Start in: `C:\Users\YourName\agents-radar`
   - OK

6. **Conditions tab**:
   - ❌ Uncheck "Start only if on AC power"
   - ✅ Check "Wake computer to run"

7. **Settings tab**:
   - ✅ Allow task to be run on demand
   - ✅ Run as soon as possible after missed
   - Restart every: 10 minutes, 3 times

8. **OK** → Nhập password

### 3. Test Task

Right-click task → **Run**

Kiểm tra log: `C:\Users\YourName\agents-radar\logs\`

## ✅ Checklist

- [ ] Script chạy thành công
- [ ] Log file được tạo
- [ ] Output files trong `digests/YYYY-MM-DD/`
- [ ] Git commit và push thành công
- [ ] Cronjob/Task Scheduler đã setup
- [ ] LLM server chạy như service
- [ ] Test chạy vào ngày mai

## 🔍 Monitoring

### Xem log mới nhất

```bash
# Linux/macOS
tail -f logs/daily-$(date +%Y-%m-%d).log

# Windows
type logs\daily-2026-04-22.log
```

### Kiểm tra cronjob đã chạy

```bash
# Linux/macOS
ls -lt logs/ | head -5

# Windows
dir /o-d logs\ | more
```

### Kiểm tra git commits

```bash
git log --oneline --since="7 days ago"
```

## ❓ Troubleshooting

### Script không chạy

```bash
# Kiểm tra permissions
ls -la scripts/run-daily.sh

# Nếu không có quyền thực thi
chmod +x scripts/run-daily.sh
```

### LLM không kết nối

```bash
# Kiểm tra Ollama
curl http://localhost:11434/v1/models

# Nếu không chạy
ollama serve
```

### Git push thất bại

```bash
# Cấu hình credential helper
git config --global credential.helper store

# Hoặc dùng SSH
ssh-keygen -t ed25519
cat ~/.ssh/id_ed25519.pub  # Add to GitHub
```

### Cronjob không chạy (Linux)

```bash
# Kiểm tra cron service
sudo systemctl status cron

# Kiểm tra logs
grep CRON /var/log/syslog
```

### Task Scheduler không chạy (Windows)

- Kiểm tra Task Scheduler History
- Đảm bảo đường dẫn đúng
- Chạy với highest privileges
- Kiểm tra log file

## 📚 Chi tiết đầy đủ

Xem hướng dẫn chi tiết: [docs/CRONJOB-SETUP.md](./docs/CRONJOB-SETUP.md)

## 🎯 Các thời gian khác

```bash
# 8h sáng
0 8 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh

# 9h sáng (khuyến nghị)
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh

# 10h sáng
0 10 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh

# Thứ 2-6 (không chạy cuối tuần)
0 9 * * 1-5 cd /path/to/agents-radar && ./scripts/run-daily.sh

# 2 lần/ngày (9h sáng và 9h tối)
0 9,21 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

---

**✅ Setup xong! Hệ thống sẽ tự động chạy mỗi ngày lúc 9h sáng.**
