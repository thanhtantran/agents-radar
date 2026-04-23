# 📝 TODO List

## ✅ Đã hoàn thành

- [x] Cập nhật `config.yml` với embedded AI repos
- [x] Xóa các module không cần: web.ts, hn.ts, weekly.ts, monthly.ts
- [x] Viết lại `src/index.ts` với logic đơn giản hơn
- [x] Cập nhật `src/config.ts` để load embedded_ai_repos
- [x] Viết lại `src/prompts.ts` chỉ cho tiếng Việt
- [x] Cập nhật `src/trending.ts` với Orange Pi keywords
- [x] Thêm label "embedded" vào `src/report.ts` và `src/github.ts`
- [x] Cập nhật `src/notify.ts` cho Vietnamese only
- [x] Cập nhật URLs trong `src/generate-manifest.ts`
- [x] Viết lại `README.md` hoàn toàn
- [x] Tạo `README.en.md` đơn giản
- [x] Tạo `docs/LLM-SETUP.md`
- [x] Tạo `QUICKSTART.md`
- [x] Tạo `CHANGELOG.md`
- [x] Tạo `MIGRATION-SUMMARY.md`
- [x] Tạo `.env.example`

## 🔄 Cần làm tiếp

### High Priority

- [ ] **Test chạy local**
  - [ ] Cài đặt Ollama với Qwen2.5
  - [ ] Test `pnpm start` với local LLM
  - [ ] Kiểm tra output files
  - [ ] Verify prompts hoạt động tốt

- [ ] **Cập nhật GitHub Actions workflow**
  - [ ] Tạo `.github/workflows/daily.yml`
  - [ ] Cấu hình để chạy hàng ngày
  - [ ] Thêm step để generate manifest
  - [ ] Thêm step để notify Telegram
  - [ ] Test workflow

- [ ] **Cập nhật GitHub Pages**
  - [ ] Cập nhật `index.html` (nếu cần)
  - [ ] Cập nhật `manifest.json` format
  - [ ] Test rendering trên Pages
  - [ ] Verify RSS feed

### Medium Priority

- [ ] **Cải thiện prompts**
  - [ ] Test với nhiều scenarios khác nhau
  - [ ] Điều chỉnh độ dài output
  - [ ] Cải thiện formatting
  - [ ] Thêm emoji phù hợp

- [ ] **Thêm error handling**
  - [ ] Handle GitHub API rate limits
  - [ ] Handle LLM connection errors
  - [ ] Handle empty data cases
  - [ ] Add retry logic

- [ ] **Documentation**
  - [ ] Thêm screenshots vào README
  - [ ] Tạo video demo (optional)
  - [ ] Viết blog post giới thiệu (optional)

### Low Priority

- [ ] **Tối ưu hiệu năng**
  - [ ] Cache GitHub API responses
  - [ ] Parallel LLM calls optimization
  - [ ] Reduce memory usage

- [ ] **Thêm tính năng mới**
  - [ ] Support thêm embedded AI boards
  - [ ] Thêm metrics và analytics
  - [ ] Thêm comparison charts
  - [ ] Export to PDF (optional)

- [ ] **Testing**
  - [ ] Viết unit tests
  - [ ] Viết integration tests
  - [ ] Add CI/CD pipeline

## 🐛 Bugs cần fix

Không có bugs được biết đến.

## 💡 Ideas cho tương lai

- [ ] Thêm support cho Raspberry Pi AI projects
- [ ] Thêm support cho Jetson projects
- [ ] Theo dõi AI frameworks trên embedded (TensorFlow Lite, ONNX Runtime)
- [ ] Thêm benchmark comparisons giữa các NPU
- [ ] Tạo dashboard với charts và graphs
- [ ] Thêm email notifications
- [ ] Thêm Discord bot integration
- [ ] Multi-repo comparison tool
- [ ] Historical trend analysis
- [ ] Community voting cho repos quan trọng

## 📋 Checklist trước khi release

- [ ] All tests pass
- [ ] Documentation complete
- [ ] Examples working
- [ ] No known bugs
- [ ] GitHub Actions working
- [ ] GitHub Pages deployed
- [ ] RSS feed valid
- [ ] Telegram notifications working
- [ ] README accurate
- [ ] CHANGELOG updated
- [ ] Version tagged

## 🎯 Milestones

### v2.0.0 (Current)
- [x] Simplified data sources
- [x] Vietnamese only
- [x] Local LLM support
- [x] Embedded AI tracking
- [ ] Full testing
- [ ] GitHub Actions setup
- [ ] First production run

### v2.1.0 (Future)
- [ ] More embedded AI repos
- [ ] Improved prompts
- [ ] Better error handling
- [ ] Performance optimization

### v2.2.0 (Future)
- [ ] Analytics dashboard
- [ ] Historical trends
- [ ] Community features

## 📞 Notes

- Ưu tiên test local trước khi deploy
- Đảm bảo LLM prompts hoạt động tốt với tiếng Việt
- Monitor GitHub API rate limits
- Keep documentation up to date

---

**Last updated**: 2026-04-22
