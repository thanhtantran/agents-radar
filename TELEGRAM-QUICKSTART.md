# Hướng dẫn Nhanh: Cấu hình Telegram Bot

## Bước 1: Tạo Bot (2 phút)

1. Mở Telegram, tìm: **@BotFather**
2. Gửi: `/newbot`
3. Đặt tên bot: `Agents Radar Bot`
4. Đặt username: `agents_radar_bot` (hoặc tên khác kết thúc bằng `bot`)
5. **Lưu lại Bot Token** (dạng: `1234567890:ABCdefGHI...`)

## Bước 2: Lấy Chat ID (1 phút)

### Cách đơn giản nhất:

1. Tìm bot: **@userinfobot** trên Telegram
2. Gửi bất kỳ tin nhắn nào
3. Bot trả về Chat ID của bạn (dạng số: `123456789`)
4. **Lưu lại Chat ID**

### Hoặc:

1. Gửi tin nhắn `/start` cho bot của bạn (bot vừa tạo ở Bước 1)
2. Mở trình duyệt, truy cập:
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
   (Thay `<BOT_TOKEN>` bằng token của bạn)
3. Tìm `"chat":{"id":123456789}` trong kết quả
4. **Lưu lại Chat ID**

## Bước 3: Cấu hình .env

Mở file `.env` và thêm 2 dòng:

```bash
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Bước 4: Test thử

Chạy lệnh:

```bash
pnpm notify
```

Nếu thành công, bạn sẽ nhận được thông báo trên Telegram! 🎉

## Ví dụ thông báo

```
📊 Báo cáo AI mới · 2026-04-24

✅ Hệ sinh thái OpenClaw & AI Agents
✅ AI Nhúng (Orange Pi, RKLLM, RKNPU)
✅ Xu hướng AI GitHub

🌐 Xem tất cả  ·  📡 RSS
```

## Lưu ý

- Nếu không muốn nhận thông báo, xóa hoặc comment 2 dòng `TELEGRAM_*` trong `.env`
- Script `run-daily.sh` sẽ tự động gửi thông báo sau khi tạo báo cáo
- Xem hướng dẫn chi tiết tại: `docs/TELEGRAM-SETUP.md`

## Xử lý lỗi

**Lỗi "Unauthorized"**: Bot token sai → Kiểm tra lại token từ BotFather

**Lỗi "chat not found"**: Chưa gửi tin nhắn cho bot → Gửi `/start` cho bot trước

**Lỗi "bot was blocked"**: Đã block bot → Unblock và gửi `/start` lại
