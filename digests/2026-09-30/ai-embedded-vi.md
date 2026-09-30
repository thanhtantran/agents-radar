# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-09-30

> Thời gian tạo: 2026-09-30 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Edge - Rockchip/Orange Pi
## Ngày 30/09/2026

---

## 1. 🎯 Tổng quan Hệ sinh thái

**Trạng thái:** Ngủ đông. Không hoạt động rõ rệt.

**Kiến trúc 3 lớp:**

```
┌─────────────────────────────────────┐
│  Orange Pi Build (Hardware Layer)   │ ← Board configs, kernel, bootloader
├─────────────────────────────────────┤
│  MPP (Media Processing)             │ ← Video encode/decode, ISP
├─────────────────────────────────────┤
│  RKNN (AI/NPU Layer)                │ ← Model inference, NPU runtime
│  ├─ Toolkit2: Convert models        │
│  └─ Model Zoo: Pre-optimized models │
└─────────────────────────────────────┘
```

**Reality check:** Các repo chính đều im lặng. Chỉ có 1 bug report AV1 trong MPP. Không có tích hợp AI/LLM mới, không benchmark, không release.

---

## 2. 📊 Bảng So sánh

| Dự án | Vai trò | Issues (24h) | PRs | Releases | Trạng thái |
|-------|---------|--------------|-----|----------|------------|
| **Orange Pi Build** | BSP & System | 0 | 0 | 0 | Không động |
| **RKNN Toolkit2** | Model conversion | 0 | 0 | 0 | Không động |
| **RKNN Model Zoo** | Reference models | 0 | 0 | 0 | Không động |
| **MPP** | Media pipeline | 1 | 0 | 0 | Bug report duy nhất |

**Insight:** Ecosystem mature rồi hoặc bỏ rơi. Không phân biệt được từ data 1 ngày.

---

## 3. 🔗 Tích hợp Phần cứng - Phần mềm

### Orange Pi Build
- **Chức năng:** Build rootfs, kernel, u-boot cho Orange Pi boards dùng Rockchip SoC
- **Không có thông tin mới** về board mới hay kernel update

### MPP → Hardware
- **Vấn đề phát hiện:** AV1 Film Grain không hoạt động
- **Root cause:** `sw_apply_grain = 0` hardcoded trong HAL layer
- **Ảnh hưởng:** VPU hardware decode đúng nhưng skip grain synthesis step
- **Platform:** Rockchip Linux 6.1

**Phân tích kỹ thuật:**
```c
// File: mpp/hal/vpu/av1d/hal_av1d_vdpu.c
// Bug: sw_apply_grain hardcoded = 0
// Effect: Film grain metadata ignored → visual quality loss
```

Film grain = post-processing effect. Hardware VPU có khả năng nhưng software HAL không enable. Minimal patch có thể fix. Chờ maintainer merge.

---

## 4. 🚀 Hiệu năng NPU

**Không có data mới.**

Thông tin cũ về RKNN (không cập nhật hôm nay):
- NPU support: RK3588, RK3576, RK3566, RK3568
- Models: YOLO, MobileNet, ResNet, Transformer variants
- Quantization: INT8, INT16, FP16
- Frameworks: TensorFlow, PyTorch, ONNX → RKNN

**Thiếu:**
- Không có benchmark số mới
- Không có model optimization case study
- Không có power consumption data

---

## 5. 👨‍💻 Developer Experience

### RKNN Toolkit2
**Không cập nhật** → giả định từ pattern cũ:
- Python API cho model conversion
- Simulation mode cho testing không cần hardware
- Docs thường outdated dựa theo community feedback

### MPP
**Issue #974 cho thấy:**
- User phải đọc source code để tìm bug
- Có minimal patch → code readable
- Maintainer response time: chưa rõ (issue mới 1 ngày)

**Đánh giá:**
- ✅ Code accessible, có thể self-debug
- ❌ Không có test coverage tốt (hardcoded value tồn tại)
- ❓ Maintainer responsiveness unknown

### Orange Pi Build
**Không động** → assume stable hoặc abandoned.

---

## 6. 💼 Use Cases

**Từ Issue #974:**
- AV1 video playback production environment
- User @lukaszsobala decode real-world AV1 streams
- Phát hiện grain missing → artistic/film content bị ảnh hưởng

**Inference (không có proof):**
- Media playback devices
- Set-top boxes
- Digital signage
- Kiosk systems

**Không có evidence cho:**
- AI inference applications
- Edge LLM deployment
- Computer vision pipelines
- Robotics

---

## 7. 🔮 Xu hướng Phát triển

**Từ data 1 ngày: không đủ để predict.**

**Speculation dựa trên pattern:**

### Nếu ecosystem còn sống:
- RK3588 là flagship NPU platform → focus optimizations
- AV1 decode fix → chuẩn bị cho AV1 adoption tăng
- Media + AI convergence → MPP có thể thêm NPU preprocessing

### Nếu ecosystem stagnant:
- Rockchip focus vào commercial customers, not open-source
- Orange Pi dùng pre-built images, không cần build system updates
- Model zoo đủ dùng → không cần thêm models

### Red flags:
- 0 activity trong 4 repos chính
- Chỉ có 1 community bug report
- Không có official communication

---

## 8. ⚠️ Kết luận & Khuyến nghị

### Trạng thái hiện tại
**Đứng yên.** Không có momentum phát triển visible. MPP có 1 bug cần fix, còn lại silent.

### Cho Developers đang cân nhắc platform này:

**✅ Ưu điểm:**
- Hardware NPU mạnh (RK3588)
- Toolchain tồn tại (RKNN Toolkit2)
- Media pipeline hardware-accelerated (MPP)
- Giá board OK

**❌ Rủi ro:**
- Open-source activity thấp
- Maintainer responsiveness chưa rõ
- Documentation có thể outdated
- Community support limited

**🎯 Khuyến nghị:**
1. **Nếu prototype/research:** OK, hardware capable
2. **Nếu production:** Cần test kỹ, chuẩn bị tự maintain patches
3. **Nếu cần support nhanh:** Tìm commercial alternative (NVIDIA Jetson, Google Coral)
4. **Nếu đang dùng:** Monitor Issue #974 để gauge maintainer response time

### Next 30 days cần theo dõi:
- Issue #974 được merge hay bỏ qua?
- Có release nào không?
- Activity pattern tiếp tục flat hay có spike?

---

**Data limited. Conclusions tentative. Need multi-day tracking for real trend analysis.**

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

# Báo cáo Hoạt động MPP - 2026-09-30

## 1. Tóm tắt hôm nay

Hoạt động thấp. Có 1 issue mới về AV1 decoder. Không có PR hay release.

## 2. Cập nhật phần cứng

Không có.

## 3. Tích hợp AI/LLM

Không có.

## 4. Hiệu năng & Benchmark

Không có.

## 5. Hỗ trợ phần mềm

Không có.

## 6. Vấn đề kỹ thuật

### Issue #974: AV1 Film Grain không hoạt động

**Vấn đề:**
- AV1 decoder trên VPU_CLIENT_AV1DEC HAL không apply film grain
- Video decode đúng nhưng thiếu grain layer
- Root cause: `sw_apply_grain` hardcoded = 0 trong `mpp/hal/vpu/av1d/hal_av1d_vdpu.c`

**Chi tiết kỹ thuật:**
- Platform: Rockchip Linux 6.1
- HAL affected: `mpp/hal/vpu/av1d/hal_av1d_vdpu.c`
- User đã có minimal patch để fix

**Tác động:**
- Stream AV1 có film grain sẽ render không đúng visual intent
- Ảnh hưởng quality trên content có grain (phim grain, artistic effect)

**Status:** Open, chờ maintainer review patch

## 7. Cộng đồng & Use cases

User @lukaszsobala phát hiện bug khi decode AV1 stream thực tế. Cho thấy MPP đang được dùng production cho video playback trên Rockchip SoC.

## 8. Roadmap

Không có thông tin roadmap mới. Ưu tiên cần fix AV1 film grain bug để đảm bảo decode correctness.

---

**Đánh giá:** Ngày yên tĩnh. Issue duy nhất là bug cụ thể, có patch, nên resolution nhanh nếu maintainer responsive. Film grain là optional AV1 feature nhưng cần thiết cho quality playback.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*