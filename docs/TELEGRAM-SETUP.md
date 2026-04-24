# Hướng dẫn Cấu hình Telegram Bot

## Tổng quan
Để nhận thông báo hàng ngày qua Telegram khi có báo cáo mới, bạn cần tạo một Telegram Bot và lấy Chat ID.

## Các bước thực hiện

### Bước 1: Tạo Telegram Bot

1. **Mở Telegram** và tìm kiếm bot: `@BotFather`

2. **Gửi lệnh** `/newbot` cho BotFather

3. **Đặt tên cho bot** (ví dụ: "Agents Radar Bot")

4. **Đặt username cho bot** (phải kết thúc bằng `bot`, ví dụ: `agents_radar_bot`)

5. **Lưu lại Bot Token** - BotFather sẽ gửi cho bạn một token dạng:
   ```
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

### Bước 2: Lấy Chat ID

#### Cách 1: Sử dụng bot @userinfobot (Đơn giản nhất)

1. Tìm kiếm bot: `@userinfobot` trên Telegram
2. Gửi bất kỳ tin nhắn nào cho bot
3. Bot sẽ trả về thông tin của bạn, bao gồm **Chat ID**
4. Lưu lại Chat ID (dạng số, ví dụ: `123456789`)

#### Cách 2: Sử dụng API Telegram

1. **Gửi tin nhắn** cho bot của bạn (bot bạn vừa tạo ở Bước 1)
   - Tìm bot bằng username (ví dụ: `@agents_radar_bot`)
   - Gửi tin nhắn: `/start` hoặc bất kỳ tin nhắn nào

2. **Lấy Chat ID** bằng cách truy cập URL sau trong trình duyệt:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
   Thay `<YOUR_BOT_TOKEN>` bằng token bạn nhận được từ BotFather

3. **Tìm Chat ID** trong kết quả JSON:
   ```json
   {
     "ok": true,
     "result": [
       {
         "update_id": 123456789,
         "message": {
           "message_id": 1,
           "from": {
             "id": 123456789,  // <-- Đây là Chat ID của bạn
             "is_bot": false,
             "first_name": "Your Name"
           },
           "chat": {
             "id": 123456789,  // <-- Hoặc đây
             "first_name": "Your Name",
             "type": "private"
           }
         }
       }
     ]
   }
   ```

#### Cách 3: Gửi thông báo cho Group

Nếu muốn gửi thông báo vào một group:

1. **Tạo group** trên Telegram
2. **Thêm bot** vào group (tìm bot bằng username và thêm vào)
3. **Gửi tin nhắn** trong group: `/start@your_bot_username`
4. **Lấy Chat ID** bằng cách truy cập:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
5. Chat ID của group sẽ là số âm (ví dụ: `-987654321`)

### Bước 3: Cấu hình trong file .env

Mở file `.env` trong thư mục gốc của project và thêm 2 dòng sau:

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

**Lưu ý:**
- `TELEGRAM_BOT_TOKEN`: Token bạn nhận được từ BotFather
- `TELEGRAM_CHAT_ID`: Chat ID của bạn hoặc của group

### Bước 4: Kiểm tra cấu hình

Chạy lệnh sau để test thông báo Telegram:

```bash
pnpm notify
```

Nếu cấu hình đúng, bạn sẽ nhận được thông báo trên Telegram!

## Ví dụ file .env hoàn chỉnh

```bash
# GitHub Configuration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DIGEST_REPO=thanhtantran/agents-radar

# LLM Configuration
OPENAI_BASE_URL=http://localhost:20128/v1
OPENAI_API_KEY=not-needed

# Telegram Configuration (Optional)
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Định dạng thông báo

Khi có báo cáo mới, bot sẽ gửi thông báo dạng:

```
📊 Báo cáo AI mới - 2026-04-24

✅ Hệ sinh thái OpenClaw & AI Agents
✅ AI Nhúng (Orange Pi, RKLLM, RKNPU)
✅ Xu hướng AI GitHub

🔗 Xem tại: https://thanhtantran.github.io/agents-radar/#2026-04-24/ai-agents-vi
```

## Xử lý Lỗi

### Lỗi: "Unauthorized"
**Nguyên nhân**: Bot token không đúng

**Giải pháp**: Kiểm tra lại token từ BotFather, đảm bảo copy đầy đủ

### Lỗi: "Bad Request: chat not found"
**Nguyên nhân**: Chat ID không đúng hoặc chưa gửi tin nhắn cho bot

**Giải pháp**: 
1. Gửi tin nhắn `/start` cho bot trước
2. Kiểm tra lại Chat ID

### Lỗi: "Forbidden: bot was blocked by the user"
**Nguyên nhân**: Bạn đã block bot

**Giải pháp**: Unblock bot trong Telegram và gửi lại tin nhắn `/start`

## Tắt thông báo Telegram

Nếu không muốn nhận thông báo Telegram, chỉ cần:
1. Xóa hoặc comment (thêm `#` ở đầu dòng) 2 dòng cấu hình trong `.env`:
   ```bash
   # TELEGRAM_BOT_TOKEN=...
   # TELEGRAM_CHAT_ID=...
   ```
2. Script sẽ tự động bỏ qua việc gửi thông báo

## Tham khảo

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)
- [How to get Chat ID](https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id)
