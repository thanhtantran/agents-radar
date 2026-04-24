#!/usr/bin/env node

/**
 * Script test Telegram Bot
 * Chạy: node test-telegram.js
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env') });

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

console.log('='.repeat(60));
console.log('🔍 Kiểm tra cấu hình Telegram');
console.log('='.repeat(60));

// Bước 1: Kiểm tra biến môi trường
console.log('\n📋 Bước 1: Kiểm tra biến môi trường');
console.log('-'.repeat(60));

if (!BOT_TOKEN) {
  console.log('❌ TELEGRAM_BOT_TOKEN: KHÔNG TÌM THẤY');
  console.log('   → Kiểm tra file .env có dòng: TELEGRAM_BOT_TOKEN=...');
  process.exit(1);
} else {
  const masked = BOT_TOKEN.substring(0, 10) + '...' + BOT_TOKEN.substring(BOT_TOKEN.length - 5);
  console.log(`✅ TELEGRAM_BOT_TOKEN: ${masked}`);
  console.log(`   Độ dài: ${BOT_TOKEN.length} ký tự`);
}

if (!CHAT_ID) {
  console.log('❌ TELEGRAM_CHAT_ID: KHÔNG TÌM THẤY');
  console.log('   → Kiểm tra file .env có dòng: TELEGRAM_CHAT_ID=...');
  process.exit(1);
} else {
  console.log(`✅ TELEGRAM_CHAT_ID: ${CHAT_ID}`);
}

// Bước 2: Test Bot Token với API getMe
console.log('\n🤖 Bước 2: Kiểm tra Bot Token với API getMe');
console.log('-'.repeat(60));

try {
  const getMeUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getMe`;
  const getMeRes = await fetch(getMeUrl);
  const getMeData = await getMeRes.json();

  if (!getMeRes.ok || !getMeData.ok) {
    console.log('❌ Bot Token KHÔNG HỢP LỆ');
    console.log(`   Status: ${getMeRes.status}`);
    console.log(`   Response:`, JSON.stringify(getMeData, null, 2));
    console.log('\n💡 Giải pháp:');
    console.log('   1. Kiểm tra lại Bot Token từ @BotFather');
    console.log('   2. Đảm bảo copy đầy đủ token (không có khoảng trắng)');
    console.log('   3. Token có dạng: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz');
    process.exit(1);
  }

  console.log('✅ Bot Token HỢP LỆ!');
  console.log(`   Bot name: @${getMeData.result.username}`);
  console.log(`   Bot ID: ${getMeData.result.id}`);
  console.log(`   First name: ${getMeData.result.first_name}`);
} catch (error) {
  console.log('❌ Lỗi kết nối API Telegram:', error.message);
  process.exit(1);
}

// Bước 3: Test gửi tin nhắn
console.log('\n📤 Bước 3: Test gửi tin nhắn');
console.log('-'.repeat(60));

try {
  const sendUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const testMessage = `🧪 Test message từ agents-radar\n\nThời gian: ${new Date().toLocaleString('vi-VN')}\n\n✅ Cấu hình Telegram thành công!`;
  
  const sendRes = await fetch(sendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: testMessage,
      parse_mode: 'HTML',
    }),
  });

  const sendData = await sendRes.json();

  if (!sendRes.ok || !sendData.ok) {
    console.log('❌ Không thể gửi tin nhắn');
    console.log(`   Status: ${sendRes.status}`);
    console.log(`   Response:`, JSON.stringify(sendData, null, 2));
    
    if (sendData.error_code === 400 && sendData.description.includes('chat not found')) {
      console.log('\n💡 Giải pháp:');
      console.log('   1. Gửi tin nhắn /start cho bot của bạn trước');
      console.log('   2. Kiểm tra lại Chat ID');
      console.log('   3. Nếu gửi vào group, đảm bảo bot đã được thêm vào group');
    } else if (sendData.error_code === 403) {
      console.log('\n💡 Giải pháp:');
      console.log('   1. Bạn đã block bot → Unblock và gửi /start lại');
      console.log('   2. Bot chưa được thêm vào group/channel');
    }
    process.exit(1);
  }

  console.log('✅ Gửi tin nhắn THÀNH CÔNG!');
  console.log(`   Message ID: ${sendData.result.message_id}`);
  console.log(`   Chat: ${sendData.result.chat.type}`);
  console.log('\n🎉 Kiểm tra Telegram để xem tin nhắn test!');
} catch (error) {
  console.log('❌ Lỗi khi gửi tin nhắn:', error.message);
  process.exit(1);
}

console.log('\n' + '='.repeat(60));
console.log('✅ TẤT CẢ KIỂM TRA ĐỀU THÀNH CÔNG!');
console.log('='.repeat(60));
console.log('\n💡 Bây giờ bạn có thể chạy: pnpm notify');
