# 🕐 Cronjob Setup Summary

## ✅ Files đã tạo

### Scripts
- ✅ `scripts/run-daily.sh` - Bash script cho Linux/macOS
- ✅ `scripts/run-daily.bat` - Batch script cho Windows

### Documentation
- ✅ `docs/CRONJOB-SETUP.md` - Hướng dẫn chi tiết đầy đủ
- ✅ `CRONJOB-QUICKSTART.md` - Hướng dẫn nhanh 5 phút

### Updates
- ✅ `README.md` - Thêm phần về cronjob
- ✅ `QUICKSTART.md` - Cập nhật với cronjob option
- ✅ `SUMMARY.md` - Thêm thông tin cronjob

## 🎯 Tính năng Scripts

### `run-daily.sh` / `run-daily.bat`

**Chức năng:**
1. ✅ Load environment variables từ `.env`
2. ✅ Kiểm tra LLM server đang chạy
3. ✅ Kiểm tra GitHub token
4. ✅ Chạy digest generation (`pnpm start`)
5. ✅ Tạo manifest và RSS feed (`pnpm manifest`)
6. ✅ Commit và push lên GitHub
7. ✅ Gửi Telegram notification (nếu có)
8. ✅ Clean up old logs (giữ 30 ngày)
9. ✅ Ghi log chi tiết vào `logs/daily-YYYY-MM-DD.log`

**Error handling:**
- ✅ Exit on error
- ✅ Retry logic có thể thêm
- ✅ Log tất cả operations
- ✅ Check prerequisites trước khi chạy

## 📋 Setup Instructions

### Linux/macOS

```bash
# 1. Cấp quyền
chmod +x scripts/run-daily.sh

# 2. Test
./scripts/run-daily.sh

# 3. Setup crontab
crontab -e
# Thêm: 0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh

# 4. Setup Ollama service
sudo systemctl enable ollama
sudo systemctl start ollama
```

### Windows

```cmd
# 1. Test
scripts\run-daily.bat

# 2. Setup Task Scheduler
# - Create Task
# - Trigger: Daily 9:00 AM
# - Action: Start scripts\run-daily.bat
# - Run with highest privileges
```

## 🔍 Monitoring

### Log Files

Logs được lưu trong `logs/daily-YYYY-MM-DD.log`:

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

### Commands

```bash
# Xem log mới nhất
tail -f logs/daily-$(date +%Y-%m-%d).log

# List logs
ls -lt logs/

# Kiểm tra git commits
git log --oneline --since="7 days ago"

# Kiểm tra crontab
crontab -l

# Test cronjob manually
./scripts/run-daily.sh
```

## 🛡️ Error Handling

### Script checks:

1. **LLM Server**: Curl check trước khi chạy
2. **GitHub Token**: Verify token tồn tại
3. **Git Status**: Check changes trước khi commit
4. **Exit Codes**: Proper exit codes cho monitoring

### Failure scenarios:

| Error | Action | Exit Code |
|-------|--------|-----------|
| LLM not running | Log error, exit | 1 |
| No GitHub token | Log error, exit | 1 |
| Digest failed | Log error, exit | 1 |
| Manifest failed | Log error, exit | 1 |
| Git push failed | Log error, exit | 1 |
| Telegram failed | Log warning, continue | 0 |

## 🔧 Customization

### Thay đổi thời gian chạy

```bash
# 8h sáng
0 8 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh

# 9h sáng (mặc định)
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh

# Thứ 2-6 only
0 9 * * 1-5 cd /path/to/agents-radar && ./scripts/run-daily.sh

# 2 lần/ngày
0 9,21 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

### Thêm retry logic

Chỉnh sửa `scripts/run-daily.sh`:

```bash
# Retry up to 3 times
for i in {1..3}; do
    if pnpm start; then
        break
    fi
    echo "Retry $i/3 after 5 minutes..."
    sleep 300
done
```

### Thêm email notification

```bash
# Thêm vào crontab
MAILTO=your.email@example.com
0 9 * * * cd /path/to/agents-radar && ./scripts/run-daily.sh
```

## 📊 Benefits vs GitHub Actions

| Aspect | Cronjob Local | GitHub Actions |
|--------|---------------|----------------|
| **Setup** | ⭐⭐⭐⭐⭐ Đơn giản | ⭐⭐ Phức tạp |
| **Cost** | $0 | $$ (nếu dùng cloud LLM) |
| **Speed** | ⚡ Nhanh (local) | 🐌 Chậm (network) |
| **Privacy** | 🔒 100% local | ☁️ Data ra ngoài |
| **Reliability** | ⭐⭐⭐⭐ (nếu máy luôn bật) | ⭐⭐⭐⭐⭐ |
| **Maintenance** | ⭐⭐⭐⭐ Dễ | ⭐⭐⭐ Trung bình |
| **Flexibility** | ⭐⭐⭐⭐⭐ Cao | ⭐⭐⭐ Trung bình |

## ✅ Advantages

1. **Không cần GitHub Actions**
   - Không cần setup workflows
   - Không cần GitHub secrets
   - Không cần public LLM endpoint

2. **Hoàn toàn local**
   - Data không ra ngoài
   - Nhanh hơn
   - Không tốn phí

3. **Dễ debug**
   - Logs local
   - Có thể chạy thủ công bất cứ lúc nào
   - Dễ test và modify

4. **Linh hoạt**
   - Thay đổi thời gian dễ dàng
   - Có thể chạy nhiều lần/ngày
   - Có thể pause/resume bất cứ lúc nào

## ⚠️ Considerations

1. **Máy phải luôn bật**
   - Hoặc dùng server/VPS
   - Hoặc dùng Raspberry Pi
   - Hoặc dùng NAS

2. **LLM server phải luôn chạy**
   - Setup như systemd service
   - Hoặc chạy trong tmux/screen
   - Auto-restart on failure

3. **Internet connection**
   - Cần để push lên GitHub
   - Cần để fetch GitHub data
   - Cần để send Telegram

4. **Disk space**
   - Logs tích lũy theo thời gian
   - Script tự động clean up (30 ngày)
   - Monitor disk usage

## 🎯 Best Practices

1. **Test thoroughly** trước khi setup cronjob
2. **Monitor logs** trong vài ngày đầu
3. **Setup LLM như service** để auto-restart
4. **Backup** `.env` và `config.yml`
5. **Keep system updated** (OS, Node.js, dependencies)
6. **Check disk space** định kỳ
7. **Review output quality** thường xuyên

## 📚 Documentation

- [docs/CRONJOB-SETUP.md](./docs/CRONJOB-SETUP.md) - Chi tiết đầy đủ
- [CRONJOB-QUICKSTART.md](./CRONJOB-QUICKSTART.md) - Hướng dẫn nhanh
- [README.md](./README.md) - Overview
- [QUICKSTART.md](./QUICKSTART.md) - Getting started

## 🎉 Conclusion

Với cronjob setup:
- ✅ Không cần GitHub Actions
- ✅ Hoàn toàn local và private
- ✅ $0 chi phí
- ✅ Dễ setup và maintain
- ✅ Linh hoạt và có thể tùy chỉnh
- ✅ Tự động chạy hàng ngày

**Perfect for local LLM deployment!** 🚀

---

**Created**: 2026-04-22  
**Version**: 2.0.0  
**Status**: ✅ Complete
