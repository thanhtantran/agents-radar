# Hướng dẫn Triển khai GitHub Pages

## Tổng quan
Sau khi chạy `pnpm start` thành công và tạo được các file báo cáo trong thư mục `digests/`, bạn cần đẩy các file lên GitHub và cấu hình GitHub Pages để hiển thị trang web.

## Các bước thực hiện

### 1. Tạo manifest.json và feed.xml
Sau khi chạy `pnpm start` và tạo được các file báo cáo, chạy lệnh sau để tạo manifest:

```bash
pnpm manifest
```

Lệnh này sẽ:
- Quét thư mục `digests/` để tìm tất cả các báo cáo
- Tạo file `manifest.json` với danh sách các báo cáo
- Tạo file `feed.xml` (RSS feed)

### 2. Commit và Push lên GitHub

```bash
# Thêm tất cả các file mới
git add digests/ manifest.json feed.xml index.html

# Commit với message mô tả
git commit -m "Update daily reports $(date +%Y-%m-%d)"

# Push lên GitHub
git push origin main
```

### 3. Cấu hình GitHub Pages

#### Bước 3.1: Vào Settings của Repository
1. Truy cập: https://github.com/thanhtantran/agents-radar
2. Click vào tab **Settings**
3. Trong menu bên trái, click vào **Pages**

#### Bước 3.2: Cấu hình Source
Trong phần **Build and deployment**:
- **Source**: Chọn **Deploy from a branch**
- **Branch**: Chọn **main** (hoặc branch bạn đang dùng)
- **Folder**: Chọn **/ (root)**
- Click **Save**

#### Bước 3.3: Đợi Deploy
- GitHub sẽ tự động build và deploy trang web
- Quá trình này mất khoảng 1-2 phút
- Bạn sẽ thấy thông báo: "Your site is live at https://thanhtantran.github.io/agents-radar"

### 4. Kiểm tra Deployment

#### Xem trạng thái deployment:
1. Vào tab **Actions** trong repository
2. Xem workflow **pages build and deployment**
3. Đợi cho đến khi có dấu ✅ (thành công)

#### Truy cập trang web:
Mở trình duyệt và truy cập: https://thanhtantran.github.io/agents-radar

### 5. Tự động hóa với Cronjob

Sau khi cấu hình GitHub Pages thành công, bạn có thể thêm các lệnh git vào script cronjob:

**Cập nhật `scripts/run-daily.sh`:**
```bash
#!/bin/bash
cd ~/agents-radar

# Chạy script tạo báo cáo
NODE_OPTIONS="--dns-result-order=ipv4first" pnpm start

# Tạo manifest
pnpm manifest

# Commit và push lên GitHub
git add digests/ manifest.json feed.xml
git commit -m "Daily report $(date +%Y-%m-%d)"
git push origin main

echo "✅ Daily report completed and pushed to GitHub Pages"
```

**Cập nhật `scripts/run-daily.bat`:**
```batch
@echo off
cd /d %USERPROFILE%\agents-radar

REM Chạy script tạo báo cáo
set NODE_OPTIONS=--dns-result-order=ipv4first
call pnpm start

REM Tạo manifest
call pnpm manifest

REM Commit và push lên GitHub
git add digests/ manifest.json feed.xml
git commit -m "Daily report %date:~-4,4%-%date:~-7,2%-%date:~-10,2%"
git push origin main

echo ✅ Daily report completed and pushed to GitHub Pages
pause
```

## Xử lý Lỗi Thường Gặp

### Lỗi: 404 Not Found
**Nguyên nhân**: GitHub Pages chưa được bật hoặc đang deploy

**Giải pháp**:
1. Kiểm tra Settings > Pages đã cấu hình đúng chưa
2. Đợi vài phút để GitHub deploy xong
3. Kiểm tra tab Actions xem có lỗi không

### Lỗi: Trang hiển thị nhưng không có dữ liệu
**Nguyên nhân**: Chưa có file `manifest.json` hoặc chưa push lên GitHub

**Giải pháp**:
1. Chạy `pnpm manifest` để tạo manifest.json
2. Commit và push file manifest.json lên GitHub
3. Đợi GitHub Pages deploy lại

### Lỗi: Permission denied khi push
**Nguyên nhân**: Chưa cấu hình Git credentials hoặc SSH key

**Giải pháp**:
```bash
# Cấu hình Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Hoặc sử dụng SSH key (khuyến nghị)
# Xem hướng dẫn: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

## Kiểm tra Kết quả

Sau khi deploy thành công, trang web sẽ hiển thị:
- ✅ Danh sách các ngày có báo cáo (sidebar bên trái)
- ✅ 3 loại báo cáo cho mỗi ngày:
  - **Hệ sinh thái Hermes & AI Agents** (ai-agents-vi)
  - **AI Nhúng (Orange Pi, RKLLM, RKNPU)** (ai-embedded-vi)
  - **Xu hướng AI GitHub** (ai-trending-vi)
- ✅ Chức năng tìm kiếm báo cáo
- ✅ Chế độ sáng/tối (Light/Dark theme)
- ✅ RSS feed tại https://thanhtantran.github.io/agents-radar/feed.xml

## Lưu ý Quan trọng

1. **Không cần GitHub Actions**: Vì bạn đã chọn chạy local với cronjob, không cần cấu hình GitHub Actions workflow

2. **Tự động push**: Nếu muốn tự động push lên GitHub sau mỗi lần chạy cronjob, thêm các lệnh git vào script như hướng dẫn ở trên

3. **Bảo mật**: Đảm bảo file `.env` không được commit lên GitHub (đã có trong `.gitignore`)

4. **Bandwidth**: GitHub Pages có giới hạn 100GB bandwidth/tháng, nhưng với trang tĩnh như này thì không lo vượt quá

## Tham khảo

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
