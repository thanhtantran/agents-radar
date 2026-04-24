# ✅ Checklist Cài đặt agents-radar

## 📋 Tổng quan

Danh sách kiểm tra để cài đặt và chạy agents-radar thành công.

---

## 1️⃣ Cài đặt Dependencies

- [ ] Đã cài đặt Node.js (v18+)
- [ ] Đã cài đặt pnpm: `npm install -g pnpm`
- [ ] Đã clone repository: `git clone https://github.com/thanhtantran/agents-radar.git`
- [ ] Đã chạy: `pnpm install`

---

## 2️⃣ Cấu hình LLM Local

- [ ] Đã cài đặt một trong các LLM server:
  - [ ] Ollama (`http://localhost:11434/v1`)
  - [ ] LM Studio (`http://localhost:1234/v1`)
  - [ ] vLLM (`http://localhost:8000/v1`)
  - [ ] Khác: _______________

- [ ] LLM server đang chạy
- [ ] Đã test kết nối: `curl http://localhost:11434/v1/models` (thay đổi URL nếu cần)
- [ ] Đã tải model (khuyến nghị: Qwen2.5 7B/14B hoặc Llama 3.1 8B)

---

## 3️⃣ Cấu hình GitHub

- [ ] Đã tạo GitHub Personal Access Token:
  - Vào: https://github.com/settings/tokens
  - Click: **Generate new token (classic)**
  - Chọn scopes: `repo`, `workflow`
  - Copy token

- [ ] Đã bật GitHub Issues trên repository:
  - Vào: https://github.com/thanhtantran/agents-radar/settings
  - Phần **Features**, check ✅ **Issues**

- [ ] Đã tạo labels trên repository (hoặc để script tự tạo):
  - `openclaw` (màu: #12937c)
  - `embedded` (màu: #ff6b35)
  - `trending` (màu: #4c45f6)
  - `digest` (màu: #34599f)

---

## 4️⃣ Cấu hình file .env

- [ ] Đã copy file mẫu: `cp .env.example .env`
- [ ] Đã điền thông tin vào `.env`:

```bash
# Bắt buộc
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_MODEL=qwen2.5:14b

# Tùy chọn
DIGEST_REPO=thanhtantran/agents-radar
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHI...
TELEGRAM_CHAT_ID=123456789
PAGES_URL=https://thanhtantran.github.io/agents-radar
```

---

## 5️⃣ Cấu hình Telegram (Tùy chọn)

Nếu muốn nhận thông báo qua Telegram:

- [ ] Đã tạo bot qua @BotFather
- [ ] Đã lấy Bot Token
- [ ] Đã lấy Chat ID (qua @userinfobot)
- [ ] Đã thêm vào file `.env`
- [ ] Đã test: `pnpm notify`

📖 Xem hướng dẫn: [TELEGRAM-QUICKSTART.md](./TELEGRAM-QUICKSTART.md)

---

## 6️⃣ Test chạy thử

- [ ] Chạy lần đầu: `NODE_OPTIONS="--dns-result-order=ipv4first" pnpm start`
- [ ] Kiểm tra output:
  - [ ] ✅ Kết nối GitHub API thành công
  - [ ] ✅ Lấy dữ liệu từ repositories
  - [ ] ✅ Gọi LLM thành công
  - [ ] ✅ Tạo file báo cáo trong `digests/YYYY-MM-DD/`
  - [ ] ✅ Tạo GitHub Issues (nếu cấu hình)

- [ ] Kiểm tra file output:
  - [ ] `digests/YYYY-MM-DD/ai-agents-vi.md`
  - [ ] `digests/YYYY-MM-DD/ai-embedded-vi.md`
  - [ ] `digests/YYYY-MM-DD/ai-trending-vi.md`

---

## 7️⃣ Tạo Manifest và RSS

- [ ] Chạy: `pnpm manifest`
- [ ] Kiểm tra file:
  - [ ] `manifest.json` đã được tạo
  - [ ] `feed.xml` đã được tạo

---

## 8️⃣ Cấu hình GitHub Pages

- [ ] Commit và push code lên GitHub:
  ```bash
  git add .
  git commit -m "Initial setup"
  git push origin main
  ```

- [ ] Cấu hình GitHub Pages:
  - [ ] Vào: https://github.com/thanhtantran/agents-radar/settings/pages
  - [ ] Source: **Deploy from a branch**
  - [ ] Branch: **main**, Folder: **/ (root)**
  - [ ] Click **Save**

- [ ] Đợi deploy (1-2 phút)
- [ ] Kiểm tra trang web: https://thanhtantran.github.io/agents-radar

📖 Xem hướng dẫn: [docs/GITHUB-PAGES-DEPLOYMENT.md](./docs/GITHUB-PAGES-DEPLOYMENT.md)

---

## 9️⃣ Cấu hình Cronjob (Tự động hóa)

### Linux/macOS:

- [ ] Chạy: `crontab -e`
- [ ] Thêm dòng (chạy lúc 9:00 AM hàng ngày):
  ```bash
  0 9 * * * cd ~/agents-radar && bash scripts/run-daily.sh
  ```
- [ ] Lưu và thoát

### Windows:

- [ ] Mở **Task Scheduler**
- [ ] Tạo task mới:
  - Name: `agents-radar-daily`
  - Trigger: Daily at 9:00 AM
  - Action: Run `scripts\run-daily.bat`
- [ ] Lưu task

📖 Xem hướng dẫn: [CRONJOB-QUICKSTART.md](./CRONJOB-QUICKSTART.md)

---

## 🔟 Kiểm tra kết quả

- [ ] Trang web hiển thị đúng: https://thanhtantran.github.io/agents-radar
- [ ] RSS feed hoạt động: https://thanhtantran.github.io/agents-radar/feed.xml
- [ ] GitHub Issues được tạo (nếu cấu hình)
- [ ] Telegram notification được gửi (nếu cấu hình)
- [ ] Cronjob chạy tự động hàng ngày

---

## 🎉 Hoàn thành!

Nếu tất cả các bước trên đều ✅, hệ thống đã sẵn sàng hoạt động!

## 📚 Tài liệu tham khảo

- [README.md](./README.md) - Hướng dẫn tổng quan
- [TELEGRAM-QUICKSTART.md](./TELEGRAM-QUICKSTART.md) - Cấu hình Telegram nhanh
- [CRONJOB-QUICKSTART.md](./CRONJOB-QUICKSTART.md) - Cấu hình Cronjob
- [docs/GITHUB-PAGES-DEPLOYMENT.md](./docs/GITHUB-PAGES-DEPLOYMENT.md) - Deploy GitHub Pages
- [docs/TELEGRAM-SETUP.md](./docs/TELEGRAM-SETUP.md) - Cấu hình Telegram chi tiết
- [docs/LLM-SETUP.md](./docs/LLM-SETUP.md) - Cấu hình LLM local

## ❓ Gặp vấn đề?

Kiểm tra log file tại: `logs/daily-YYYY-MM-DD.log`

Các lỗi thường gặp:
- **GitHub API timeout**: Thêm `NODE_OPTIONS="--dns-result-order=ipv4first"`
- **LLM không kết nối được**: Kiểm tra LLM server đang chạy
- **GitHub token invalid**: Tạo lại token với đủ quyền
- **Telegram không gửi được**: Kiểm tra Bot Token và Chat ID
