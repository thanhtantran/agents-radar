# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-09-16

> Thời gian tạo: 2026-09-16 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Edge Rockchip - 2026-09-16

## 🎯 Tổng quan hệ sinh thái

**Ngày 2026-09-16: hoạt động durừng lặng hoàn toàn**

Tất cả repo chính không có commit, issue, PR, hay release mới. Hoạt động cuối tuần trước (2026-09-09 đến 09-15).

**Stack công nghệ:**

```
Orange Pi (Hardware)
    ↓
Rockchip SoC (RK3588/RK3576)
    ↓ 
├─ NPU: RKNPU2 runtime
├─ Video: MPP codec
└─ AI: RKNN toolkit
```

Orange Pi = board maker dùng chip Rockchip  
Rockchip = SoC vendor với NPU riêng  
RKNPU/RKNN = AI inference stack của Rockchip  
MPP = hardware video codec library

## 📊 Bảng so sánh

| Tiêu chí | Orange Pi Build | RKNN Toolkit2 | RKNN Model Zoo | MPP |
|----------|----------------|---------------|----------------|-----|
| **Vai trò** | OS build system | AI model convert & deploy | Pre-optimized models | Video encode/decode |
| **Layer** | Board support | AI framework | Model library | Media processing |
| **Target user** | System integrator | ML engineer | App developer | Video developer |
| **Activity (24h)** | 0 | 0 | 0 | 0 new, 2 old issues |
| **Critical issues** | - | - | - | Double-free bug #973 |
| **Hardware tie** | Orange Pi boards | Rockchip NPU | Rockchip NPU | Rockchip VPU |
| **Maturity** | Stable | Production | Growing | Production (có bug) |

## 🔌 Tích hợp phần cứng-phần mềm

**Orange Pi + Rockchip:**
- Orange Pi dùng SoC Rockchip (RK3588, RK3576)
- Không có software stack riêng, rely 100% vào Rockchip libs

**RKNN (NPU) + MPP (VPU):**
```
Video stream → MPP decode → Frame buffer → RKNN inference → Result
              (hardware)                   (NPU)
```

Typical pipeline: MPP decode video → RKNN chạy detection/classification → MPP encode output

**Issue #973 expose integration pain:**
- MPP async API ownership unclear
- User code phải manage frame lifecycle
- Callback free conflict với user free
- Race condition khi integrate với downstream (như RKNN consumer)

## 🚀 Hiệu năng NPU

**Hardware:**
- RK3588: 6 TOPS NPU (3 core)
- RK3576: thông tin chưa rõ

**Model support (RKNN):**
- ONNX, TFLite, PyTorch → chuyển sang RKNN format
- Quantization INT8 support
- Common models: YOLO, ResNet, MobileNet, etc.

**Performance data:** không có benchmark mới ngày hôm nay

**AV1 decode issue #971:** RK3588 crash với file 130MB → NPU/memory bandwidth limit hay allocator bug

## 👨‍💻 Developer Experience

**Documentation:** không đủ dữ liệu đánh giá (không có release notes, changelogs)

**Pain points từ issues:**

1. **API contract unclear:** Issue #973 - không rõ ai own frame sau queue
2. **Memory safety:** 2/2 recent issues về memory corruption
3. **Large file handling:** AV1 decoder fail với 130MB input
4. **Debug support:** malloc corruption hard to trace

**Tooling:** RKNN Toolkit2 có convert tools, không có update ngày hôm nay

**Community:** @nyanmisaka active reporter - khả năng làm production video processing

## 💡 Use Cases thực tế

**Từ MPP issues infer:**

1. **Video streaming/transcoding:**
   - AV1 hardware decode (issue #971)
   - Async encoding với frame reuse
   - Large file processing

2. **AI + Video pipeline:**
   - MPP decode → RKNN inference
   - Memory sharing giữa VPU và NPU
   - Real-time processing requirements

3. **Production deployment:**
   - Detect double-free issues → running in production
   - RK3588 hardware → mid-range edge device
   - Stability critical

**Hardware targets:**
- Orange Pi 5/5+ (RK3588)
- Orange Pi 5 Max/Pro (RK3588)
- Future: RK3576 boards

## 🔮 Xu hướng phát triển

**Từ data ngày 2026-09-16:**

⚠️ **Stagnation warning:** zero activity tất cả repos chính

**Cần urgent:**
1. Fix MPP memory bugs trước khi ảnh hưởng production
2. Clarify API ownership contracts
3. Test coverage cho large file + edge cases

**Dự đoán:**
- **Short-term:** MPP bug fixes sẽ đến (issue #973 critical)
- **Hardware:** RK3576 boards sắp ra → cần RKNN support update
- **Ecosystem:** phụ thuộc quá nhiều vào Rockchip upstream, Orange Pi không có control

**Risk:**
- Rockchip slow updates → Orange Pi ecosystem stall
- Memory safety issues → production deployment risk
- Single vendor lock-in (Rockchip NPU proprietary)

---

**Kết luận ngày 2026-09-16:**

Ecosystem im lặng hoàn toàn. MPP có critical memory bug chưa fix. Không có data mới về performance, features, hay roadmap. Developer experience phụ thuộc vào Rockchip release cadence - hiện tại đang slow.

Production users: kiểm tra MPP version, tránh async encoder nếu gặp double-free. Test thoroughly với large files trên RK3588.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Toolkit 2</strong> — <a href="https://github.com/airockchip/rknn-toolkit2">airockchip/rknn-toolkit2</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Model Zoo</strong> — <a href="https://github.com/airockchip/rknn_model_zoo">airockchip/rknn_model_zoo</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Media Process Platform (MPP) module</strong> — <a href="https://github.com/rockchip-linux/mpp">rockchip-linux/mpp</a></summary>

# Báo cáo MPP (Media Process Platform) - 2026-09-16

## 📊 Tóm tắt hôm nay

Không có hoạt động mới trong ngày 2026-09-16. Issues gần nhất từ 2026-09-09 đến 2026-09-15.

## 🔧 Vấn đề kỹ thuật

### 🐛 Bug nghiêm trọng về memory management

**Issue #973 - Double-free trong async encoding** (mở 2026-09-14)
- **Vấn đề**: `MppFrame` bị free 2 lần - cả user và callback `list_wraper_packet()` trong `mpp.c`
- **Root cause**: commit 8223241 thêm logic free frame trong packet list callback
- **Conflict**: theo `mpp_enc_impl.c`, `KEY_INPUT_FRAME` phải do user free
- **Tác động**: warning double-free, risk crash/corruption trong production
- **Status**: chưa fix, đang chờ maintainer xác nhận intentional hay bug

**Issue #971 - AV1 decoder crash trên RK3588** (đóng 2026-09-15)
- **Error**: `malloc(): unsorted double linked list corrupted` trong `mpi_dec_utils`
- **Hardware**: RK3588 NPU
- **Codec**: AV1 decode
- **Input**: file 130MB
- **Status**: đã đóng, likely fixed

### 💡 Phân tích kỹ thuật

MPP async encoder có race condition trong resource lifecycle:
```
User path:       allocate frame → queue → expect to free
Callback path:   packet done → free frame (8223241)
Result:          double free
```

Pattern này common trong async video pipeline. Fix options:
- Ownership transfer: user free XOR callback free, never both
- Refcount: frame use atomic refcount, free when zero
- Explicit contract: API doc clarify who owns what after queue

AV1 crash trên RK3588 hint memory allocator issue. RK3588 có dual NPU, likely memory pressure khi decode large file.

## 🔍 Cộng đồng & Use cases

@nyanmisaka active reporter - report 2 issues memory-related. Likely làm video transcoding/streaming với MPP.

Use case infer:
- AV1 hardware decode trên RK3588
- Async encoding với frame reuse
- Production workload (detect double-free, large file handling)

## 🚀 Roadmap

Cần fix urgent:
1. Resolve double-free semantic trong async encoder API
2. Stabilize AV1 decoder cho RK3588 large file
3. Document memory ownership contract rõ ràng

---

**Lưu ý**: No PRs, no releases, no updates in last 24h. Activity tập trung tuần trước.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*