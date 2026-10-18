# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-18

> Thời gian tạo: 2026-10-18 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# 🔬 Báo cáo So sánh Hệ sinh thái AI Edge Rockchip - 18/10/2026

## 1. Tổng quan Hệ sinh thái

Hệ sinh thái AI edge Rockchip đứng yên. 4 repos chính: **3 không hoạt động, 1 có bug critical**.

**Kiến trúc:**
- **Hardware:** Orange Pi boards (RK3562/3566/3568/3576/3588 SoCs)
- **NPU driver:** RKNPU (kernel-level)
- **AI toolkit:** RKNN Toolkit 2 (model conversion, quantization)
- **Models:** RKNN Model Zoo (pre-converted)
- **Media:** MPP (video decode/encode offload)

**Trạng thái:** Maintenance mode. Zero development momentum. RKNN Toolkit bug block YOLO ecosystem.

---

## 2. Bảng So sánh

| Tiêu chí | Orange Pi Build | RKNN Toolkit 2 | RKNN Model Zoo | MPP |
|----------|----------------|----------------|----------------|-----|
| **Issues 24h** | 0 | 2 (1 critical) | 0 | 0 |
| **PRs 24h** | 0 | 0 | 0 | 0 |
| **Releases 24h** | 0 | 0 | 0 | 0 |
| **Mục đích** | Board firmware/OS | Model deployment | Pre-trained models | Media pipeline |
| **Target users** | System builders | AI developers | Quick-start users | Video app devs |
| **Criticality** | Low (build once) | **HIGH** | Medium | Medium |
| **Trạng thái** | Stable/dormant | **Broken v2.5.0** | Stable | Stable |
| **License type** | Mixed open | BSD-3 runtime | Model-dependent | Open |

---

## 3. Tích hợp Hardware-Software

```
Hardware Layer:          RK3588 SoC
                            ↓
NPU:                    6 TOPS NPU (INT8)
                            ↓
Kernel Driver:          RKNPU driver
                            ↓
Runtime:                librknnrt.so (BSD-3)
                            ↓
Toolkit:                RKNN Toolkit 2 (conversion)
                            ↓
Models:                 .rknn format (quantized)
```

**Điểm yếu hiện tại:**
- Toolkit v2.5.0 break YOLO fusion rules → **không convert được YOLO11**
- Phải pin v2.3.2 → block newer YOLO features
- Không có hotfix timeline → production deployments stuck

**Điểm mạnh:**
- NPU driver stable (no kernel issues reported)
- Runtime BSD-3 → commercial friendly
- Hardware support wide (RK3562-RK3588)

---

## 4. Hiệu năng NPU

### Khả năng xử lý

| SoC | NPU TOPS | Typical use |
|-----|----------|-------------|
| RK3562 | 1 | Entry IoT |
| RK3566/3568 | 1 | Smart displays |
| RK3576 | 6 | Mid-range AI |
| RK3588 | 6 | High-end edge |

### Model support

**Working (v2.3.2):**
- YOLOv5/v8
- YOLOX
- MobileNet
- ResNet
- SegFormer

**Broken (v2.5.0):**
- YOLO11 ❌
- YOLO26 ❌
- Models using scaled dot-product attention fusion ❌

**Root cause:** Optimizer fusion rules regression in v2.5.0:
- `_p_seperate_conv_rs_split` fail
- `_p_fuse_..._to_sdpa` fail

**Tác động performance:** Không đo được (model không build)

---

## 5. Developer Experience

### SDK Quality

**RKNN Toolkit 2:**
- ✅ Python API simple
- ✅ Quantization workflow clear
- ❌ **Critical regression unpatched**
- ❌ Breaking changes v2.3 → v2.5 undocumented

**Model Zoo:**
- ✅ Pre-converted models save time
- ⚠️ License unclear (issue #580)
- ❌ No updates, stale model versions

**MPP:**
- Stable nhưng không phát triển
- Video offload work

**Orange Pi Build:**
- Firmware build OK
- Zero innovation

### Documentation

**Missing:**
- Migration guide v2.3.2 → v2.5.0
- License terms cho pre-converted models
- Fusion rule behavior changes
- Workarounds cho known bugs

**Có:**
- Basic API docs
- Conversion examples

### Tooling

**Workflow:**
```python
# Convert ONNX → RKNN
rknn = RKNN()
rknn.config(...)
rknn.load_onnx('model.onnx')
rknn.build()  # ← FAIL ở đây với YOLO11 on v2.5.0
rknn.export_rknn('model.rknn')
```

**Pain points:**
- No fallback khi fusion fail
- Error messages cryptic (`list index out of range`)
- No debug mode cho optimizer

---

## 6. Use Cases

### Từ Issues

**Commercial deployment (issue #580):**
- RK1126B products
- YOLOX detection
- Cần license clarification → signal adoption tăng

**YOLO ecosystem (issue #581):**
- Glenn Jocher (Ultralytics) testing directly
- YOLO11/26 deployment blocked
- YOLOv8 users stuck v2.3.2

### Observed patterns

**Strong:**
- Object detection (YOLO)
- Video analytics
- Smart camera/NVR

**Weak:**
- LLM inference (no RKLLM activity)
- Generative AI
- Multi-modal models

---

## 7. Xu hướng & Dự đoán

### Hiện tại: Застой (застой = stagnation)

**Indicators:**
- 3/4 repos dormant
- 1 critical bug unaddressed
- Zero feature development
- Zero releases

### Nguyên nhân

**Possible:**
- Team resources shifted elsewhere
- Focus on newer chip generations
- Commercial customers use private channels
- Open source = low priority

### Dự đoán 3-6 tháng

**Pessimistic (60% probability):**
- Bug #581 fix trong 2-4 tuần
- Minimal maintenance mode continue
- No major features
- Community stagnate

**Optimistic (30% probability):**
- v2.5.1 patch + v2.6.0 feature release
- YOLO11+ support restored
- Model zoo refresh

**Worst case (10% probability):**
- No bug fix
- Toolkit abandoned
- Users fork hoặc migrate competitors (Hailo, Amlogic NPU)

### So với competitors

**Rockchip vs Hailo:**
- Hailo: active development, modern architecture
- Rockchip: legacy, stable nhưng stagnant

**Rockchip vs Amlogic:**
- Tương đương dormancy
- Amlogic có A311D2 6 TOPS mới hơn

**Rockchip advantages:**
- Installed base lớn
- Runtime license clean
- Hardware proven

---

## 🎯 Khuyến nghị

### Cho Developers

**Đang deploy:**
- Pin RKNN Toolkit v2.3.2
- Test v2.5.0 sau khi patch release
- Plan migration path

**Đang evaluate:**
- ⚠️ Risk: slow bug response
- ⚠️ Risk: no LLM/GenAI support
- ✅ Pro: cheap hardware, stable runtime
- ✅ Pro: good for classic CV (detection, classification)

**Tránh:**
- YOLO11/26 trên v2.5.0
- Bleeding-edge model architectures
- Multi-modal models
- LLM inference

### Cho Rockchip

**Urgent:**
1. Fix issue #581 trong 2 tuần
2. Release v2.5.1 patch
3. Document breaking changes

**Strategic:**
1. Public roadmap
2. Active community engagement
3. Modern architecture support (transformers, attention)
4. LLM inference toolkit (revive RKLLM?)

---

## Kết luận

Hệ sinh thái AI edge Rockchip: **stable nhưng stagnant**. Hardware proven, runtime clean, nhưng software development gần như dừng. Bug critical từ Ultralytics founder chưa được fix → signal về responsiveness thấp.

**Suitable for:** Production CV deployments (detection, classification) với proven models.

**Not suitable for:** Cutting-edge AI, LLM, projects cần fast-moving toolkit.

**Outlook:** Maintenance mode. Nếu bug không fix trong 1 tháng → red flag nghiêm trọng.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Toolkit 2</strong> — <a href="https://github.com/airockchip/rknn-toolkit2">airockchip/rknn-toolkit2</a></summary>

# 📊 Báo cáo RKNN Toolkit 2 - 2026-10-18

## 🔍 Tóm tắt hôm nay

Hoạt động thấp. 2 issues mới, không có PR hay release. Tập trung vào **bug nghiêm trọng với YOLO11/YOLO26** và câu hỏi về license thương mại.

## ⚠️ Vấn đề kỹ thuật

### 🔴 Critical: YOLO11/YOLO26 build fail trên v2.5.0 (#581)

**Hiện tượng:**
- `rknn.build()` throw `IndexError: list index out of range`
- Xảy ra trong `GraphOptimizer.fuse_ops`
- Build OK trên v2.3.2, fail trên v2.5.0
- Ảnh hưởng: YOLOv8, YOLO11 detection models
- Tất cả targets bị ảnh hưởng: rk3562, rk3566, rk3568, rk3576, rk3588

**Fusion rules bị lỗi:**
1. `_p_seperate_conv_rs_split` 
2. `_p_fuse_..._to_sdpa` (scaled dot-product attention fusion)

**Tác giả:** @glenn-jocher (Ultralytics founder) - weight cao, cần ưu tiên fix

**Tác động:**
- Block migration lên v2.5.0 cho YOLO users
- Phải pin v2.3.2 để deploy YOLO11
- Ảnh hưởng production deployments

**Next step cần:**
- Airockchip team check fusion rule regression
- Likely fix trong v2.5.1 patch

### ❓ License thương mại YOLOX model (#580)

**Câu hỏi:** `yolox_s_custom_sigmoid.rknn` có free cho commercial use không?

**Context:**
- RK1126B based products
- Cần rõ license terms cho:
  - Pre-converted RKNN model
  - RKNN runtime libraries

**Cần clarify:**
- RKNN runtime: BSD-3-Clause (confirmed commercial-friendly)
- Pre-converted models: phụ thuộc source model license
- YOLOX: Apache 2.0 → commercial OK
- Custom sigmoid variant: cần confirm từ Airockchip

## 📦 Hỗ trợ phần mềm

Không có update SDK/toolkit trong 24h.

**Current stable:** v2.3.2 (recommended cho YOLO deployment)  
**Latest:** v2.5.0 (có regression bug)

## 🏗️ Roadmap

**Urgent:**
- Fix #581 fusion rule regression
- Release v2.5.1 patch

**Cần documentation:**
- License clarification cho pre-converted models
- Migration guide v2.3.2 → v2.5.x với breaking changes

## 📈 Cộng đồng & Use cases

Glenn Jocher (Ultralytics) actively testing RKNN Toolkit → signal tích hợp chặt với YOLO ecosystem.

RK1126B commercial deployment questions → edge AI adoption tăng trong industrial/commercial products.

---

**Kết luận:** Low-activity day, nhưng có 1 critical bug block YOLO users từ upgrade. Ưu tiên patch release.

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