# Hướng dẫn thiết lập GitHub Pages

## Tổng quan
GitHub Pages sẽ tự động xuất bản nội dung từ repo của bạn thành website tại:
**https://thanhtantran.github.io/agents-radar**

## Các bước thiết lập

### 1. Bật GitHub Pages trong repo settings

1. Truy cập: https://github.com/thanhtantran/agents-radar/settings/pages
2. Trong phần **"Source"**:
   - Chọn **"Deploy from a branch"**
   - Branch: **main** (hoặc master nếu bạn dùng tên đó)
   - Folder: **/ (root)**
3. Nhấn **Save**

### 2. Kiểm tra các file cần thiết đã có trong repo

Các file sau PHẢI có trong thư mục gốc của repo:

- ✅ `index.html` - Trang chính của website (đã có)
- ✅ `manifest.json` - Danh sách các báo cáo (sẽ được tạo bởi `pnpm manifest`)
- ✅ `feed.xml` - RSS feed (sẽ được tạo bởi `pnpm manifest`)
- ✅ `digests/` - Thư mục chứa các báo cáo hàng ngày

### 3. Cấu hình Git credentials để tự động push

Bạn có 2 lựa chọn:

#### Lựa chọn A: Sử dụng Git credential helper (khuyến nghị)
```bash
# Lưu credentials vĩnh viễn
git config --global credential.helper store

# Lần đầu tiên push, Git sẽ hỏi username/password
# Nhập GitHub username và Personal Access Token (không phải password)
git push
```

#### Lựa chọn B: Sử dụng SSH key
```bash
# Tạo SSH key (nếu chưa có)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Thêm vào GitHub: Settings → SSH and GPG keys → New SSH key
# Paste nội dung public key vào

# Đổi remote URL sang SSH
git remote set-url origin git@github.com:thanhtantran/agents-radar.git
```

### 4. Chạy lần đầu và commit files

```bash
# Chạy digest generation
pnpm start

# Tạo manifest.json và feed.xml
pnpm manifest

# Kiểm tra các file đã được tạo
ls -la digests/2026-04-23/
ls -la manifest.json feed.xml

# Commit và push
git add digests/ manifest.json feed.xml index.html
git commit -m "📊 Initial GitHub Pages setup"
git push
```

### 5. Đợi GitHub Pages deploy

1. Truy cập: https://github.com/thanhtantran/agents-radar/actions
2. Bạn sẽ thấy workflow **"pages build and deployment"** đang chạy
3. Đợi khoảng 1-2 phút cho đến khi có dấu ✅ màu xanh
4. Nếu có lỗi ❌, click vào để xem chi tiết

### 6. Kiểm tra website

Truy cập: **https://thanhtantran.github.io/agents-radar**

Bạn sẽ thấy:
- Giao diện web với sidebar hiển thị các ngày
- Danh sách các báo cáo: `ai-agents-vi`, `ai-embedded-vi`, `ai-trending-vi`
- Có thể click vào từng báo cáo để xem nội dung

## Xử lý lỗi thường gặp

### Lỗi 1: Website hiển thị 404
**Nguyên nhân**: GitHub Pages chưa được bật hoặc chưa deploy xong

**Giải pháp**:
1. Kiểm tra Settings → Pages đã bật chưa
2. Kiểm tra Actions tab có workflow nào đang chạy không
3. Đợi 2-3 phút sau khi push

### Lỗi 2: Website trống hoặc không có nội dung
**Nguyên nhân**: Chưa có file `manifest.json` hoặc `digests/`

**Giải pháp**:
```bash
# Tạo lại manifest
pnpm manifest

# Commit và push
git add manifest.json feed.xml
git commit -m "Update manifest"
git push
```

### Lỗi 3: Git push bị từ chối (authentication failed)
**Nguyên nhân**: Credentials không đúng hoặc token hết hạn

**Giải pháp**:
1. Tạo Personal Access Token mới tại: https://github.com/settings/tokens
2. Chọn scope: `repo` (full control)
3. Copy token và dùng làm password khi git push

### Lỗi 4: Permission denied khi push
**Nguyên nhân**: Không có quyền write vào repo

**Giải pháp**:
- Kiểm tra bạn là owner hoặc có quyền write vào repo
- Kiểm tra token có scope `repo` đầy đủ

## Tự động hóa với cronjob

Sau khi setup xong, script `scripts/run-daily.sh` sẽ tự động:
1. Chạy `pnpm start` để tạo báo cáo
2. Chạy `pnpm manifest` để cập nhật manifest.json
3. Commit và push lên GitHub
4. GitHub Pages tự động deploy

Thiết lập cronjob (chạy mỗi 9h sáng):
```bash
crontab -e

# Thêm dòng này:
0 9 * * * /home/firefly/agents-radar/scripts/run-daily.sh
```

## Kiểm tra nhanh

Chạy lệnh này để test toàn bộ workflow:
```bash
cd ~/agents-radar
./scripts/run-daily.sh
```

Nếu thành công, bạn sẽ thấy:
```
✓ LLM server is running
✓ GitHub token is set
✓ Digest generation completed successfully
✓ Manifest and RSS feed generated
✓ Changes pushed to GitHub
Daily run completed successfully!
```

## Tài liệu tham khảo

- GitHub Pages docs: https://docs.github.com/en/pages
- GitHub Actions: https://github.com/thanhtantran/agents-radar/actions
- Your website: https://thanhtantran.github.io/agents-radar
