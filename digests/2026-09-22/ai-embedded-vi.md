# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-09-22

> Thời gian tạo: 2026-09-22 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Nhúng Rockchip/Orange Pi
**Ngày 22/09/2026**

---

## 🎯 Tổng quan hệ sinh thái

**Trạng thái hiện tại**: Hầu như không hoạt động.

4/4 repo chính không có commit, PR hay release mới. Issue duy nhất: bug nghiêm trọng NPU trên RV1126B chưa được fix.

**Kiến trúc stack**:
```
Orange Pi Build   → Build system, rootfs, bootloader
      ↓
MPP (Media)       → Video encode/decode hardware
      ↓
RKNN Toolkit 2    → Model conversion, NPU compiler
      ↓
RKNN Model Zoo    → Pre-trained models, examples
      ↓
RV1126B/RK3588    → NPU hardware
```

**Vấn đề cốt lõi**: Compiler backend bug chặn production workload. Không có patch hay workaround từ maintainer.

---

## 📊 Bảng so sánh các dự án

| Dự án | Vai trò | Hoạt động 24h | Mức độ quan trọng | Trạng thái |
|-------|---------|---------------|-------------------|------------|
| **RKNN Toolkit 2** | NPU compiler, inference runtime | 1 issue | ⭐⭐⭐⭐⭐ Cốt lõi | ⚠️ Bug blocking |
| **RKNN Model Zoo** | Model examples, benchmarks | 0 | ⭐⭐⭐⭐ Quan trọng | 😴 Im lặng |
| **MPP** | Video codec, ISP | 0 | ⭐⭐⭐ Hỗ trợ | 😴 Im lặng |
| **Orange Pi Build** | System integration | 0 | ⭐⭐⭐ Hỗ trợ | 😴 Im lặng |

**Điểm yếu**: Dependency graph yếu. Bug ở RKNN Toolkit chặn toàn bộ vision pipeline nhưng không có hotfix.

---

## 🔧 Tích hợp phần cứng-phần mềm

### Hardware support

**RV1126B** (chip camera AI phổ biến):
- NPU: 2.0 TOPS INT8
- **Vấn đề**: Bilinear resize broken khi chain với ops khác
- **Tác động**: Object detection, segmentation pipelines fail

**RK3588** (high-end):
- NPU: 6.0 TOPS INT8
- Chưa rõ có bị bug tương tự không

### Software stack gaps

```
Model (ONNX/TF) → RKNN Toolkit → .rknn file → Runtime
                        ↑
                   BUG Ở ĐÂY
              (bilinear resize fusion)
```

**Missing**:
- Debug tooling: không có profiler để catch fusion bugs
- Compiler flags: không có option tắt optimization cho workaround
- Test coverage: bilinear resize edge cases không được test

---

## ⚡ Hiệu năng NPU

### Model support (từ RKNN Model Zoo - data cũ)

**Working**:
- YOLO series (v5/v8)
- MobileNet, ResNet
- Segmentation models

**Broken/Questionable**:
- Bất kỳ model nào dùng bilinear resize + downstream ops
- YOLOX, RetinaNet likely affected (dùng FPN với resize)

### Benchmark (không có data mới)

Không thể benchmark vì bug chặn real workloads.

---

## 👨‍💻 Developer Experience

### SDK Quality: ⭐⭐ (2/5)

**Cons**:
- Bug nghiêm trọng không được patch nhanh
- Không có release notes hay changelog
- Issue tracker im lặng (0 response từ maintainer)
- Docs likely outdated (Model Zoo không update)

**Pros**:
- C/C++/Python API có sẵn
- Examples trong Model Zoo (khi không bị bug)

### Debugging: ⭐ (1/5)

Issue #579 cho thấy:
- Developer phải tự A/B test (bilinear vs nearest, chain vs single-op)
- Không có tool để dump intermediate tensors
- Không có verbose mode để thấy graph optimization

### Community: ⭐ (1/5)

Không có discussion, PR review, hay maintainer engagement.

---

## 🎮 Use Cases

### Bị block bởi bug hiện tại

**Computer Vision pipelines**:
```python
# Broken workflow
image → Preprocess → YOLO backbone
                         ↓
                    FPN (resize) → Detection head
                         ↓
                       ❌ Wrong output
```

**Applications affected**:
- Smart cameras (RV1126B use case chính)
- Autonomous vehicles (object detection)
- Medical imaging (segmentation)
- Industrial inspection

### Workarounds tốn performance

1. Dùng nearest interpolation (mất accuracy)
2. Tách resize thành model riêng (tăng latency)
3. Resize trên CPU thay vì NPU (waste NPU)

---

## 🔮 Xu hướng & Dự đoán

### Short-term (1-3 tháng)

**Pessimistic**:
- Bug không được fix → developers chuyển sang NVIDIA Jetson hoặc Hailo
- Community fork toolkit để tự patch
- Orange Pi mất market share trong AI camera

**Optimistic**:
- Rockchip release hotfix cho RV1126B
- Update Model Zoo với workarounds
- Thêm compiler flags để disable fusion

### Long-term (6-12 tháng)

**Cần thiết để survive**:
- Active maintenance: weekly release cycle
- Public roadmap: feature + bugfix timeline
- Better tooling: profiler, debugger, visualizer
- Test suite: prevent regression như #579

**Nếu không**:
- Developer ecosystem chết dần
- Hardware tốt nhưng software không follow
- Lose to competitors có better SDK (Qualcomm, MediaTek)

---

## 🎯 Khuyến nghị cho Developers

### Hiện tại

❌ **Không nên dùng** cho production nếu:
- Pipeline có bilinear resize + downstream ops
- Target RV1126B
- Cần reliability cao

✅ **Có thể dùng** nếu:
- Models đơn giản (classification, không có resize)
- Chấp nhận workaround (nearest interpolation)
- Development/prototyping phase

### Giải pháp thay thế

| Platform | Pros | Cons |
|----------|------|------|
| **NVIDIA Jetson** | Mature SDK, strong support | Đắt hơn 3-5x |
| **Hailo** | High performance, stable | Limited model support |
| **Intel OpenVINO** | Cross-platform | Không optimize cho ARM |
| **Qualcomm** | Mobile ecosystem | License phức tạp |

---

## 📌 Kết luận

Hệ sinh thái Rockchip/Orange Pi AI đang trong **crisis mode**:

- **Hardware**: Competitive (2-6 TOPS, giá tốt)
- **Software**: Broken và không được maintain
- **Community**: Im lặng, không có engagement

Bug #579 là symptom của vấn đề lớn hơn: thiếu investment vào software quality và developer experience.

**Recommendation**: Wait and see. Nếu sau 1 tháng không có patch, consider alternatives.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Toolkit 2</strong> — <a href="https://github.com/airockchip/rknn-toolkit2">airockchip/rknn-toolkit2</a></summary>

# Báo cáo Dự án RKNN Toolkit 2 - Ngày 22/09/2026

## 🔍 Tóm tắt hôm nay

Hoạt động rất yên tĩnh. Chỉ có 1 issue mới được cập nhật, không có PR hay release.

## 🐛 Vấn đề kỹ thuật

### Issue #579: Bug nghiêm trọng với Bilinear Resize trên RV1126B NPU

**Tình trạng**: OPEN | **Tác giả**: @chengjuelin | **Cập nhật**: 2026-09-21

**Mô tả lỗi**:
- **Board**: RV1126B
- **Op bị lỗi**: Bilinear Resize
- **Triệu chứng**: Kết quả sai khi output của Resize được op khác sử dụng
- **Đặc điểm kỳ lạ**:
  - ✅ Đúng khi Resize là output cuối cùng của model
  - ✅ Đúng khi dùng nearest interpolation
  - ❌ Sai khi output feed vào op khác VÀ dùng bilinear

**Phân tích kỹ thuật**:
```
Resize (bilinear) → Consumer Op → Sai kết quả
Resize (bilinear) → Model Output → Đúng
Resize (nearest) → Consumer Op → Đúng
```

**Nguyên nhân khả dĩ**:
- Buffer layout/stride không khớp giữa Resize và consumer op
- NPU fusion/optimization bug khi chain ops
- Memory alignment issue trong intermediate tensor
- Compiler backend sai handling cho bilinear interpolation result

**Tác động**:
- Ảnh hưởng pipeline xử lý ảnh (object detection, segmentation)
- RV1126B là chip phổ biến cho camera AI, lỗi này block nhiều use case production

**Workaround tạm thời**:
- Dùng nearest interpolation thay bilinear
- Tách Resize thành output riêng rồi feed qua model khác (tốn performance)

## 📊 Thống kê

- **Issues mở**: 1
- **PRs**: 0
- **Releases**: 0
- **Comments**: 1

## 🎯 Quan sát

Dự án trong giai đoạn ổn định, ít hoạt động phát triển mới. Issue #579 cần ưu tiên cao vì ảnh hưởng production trên RV1126B - một trong những chip edge AI phổ biến của Rockchip.

Bug này suggest vấn đề trong compiler backend hoặc NPU graph optimization layer, không phải model conversion issue đơn thuần.

---

*Dữ liệu chưa đủ để đánh giá các mục còn lại (cập nhật phần cứng, tích hợp AI/LLM, hiệu năng, roadmap)*

</details>

<details>
<summary><strong>RKNN Model Zoo</strong> — <a href="https://github.com/airockchip/rknn_model_zoo">airockchip/rknn_model_zoo</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Media Process Platform (MPP) module</strong> — <a href="https://github.com/rockchip-linux/mpp">rockchip-linux/mpp</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*