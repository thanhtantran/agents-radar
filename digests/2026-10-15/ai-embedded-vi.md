# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-15

> Thời gian tạo: 2026-10-15 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Edge - Rockchip/Orange Pi
*Ngày 2026-10-15*

## 🌐 Tổng quan hệ sinh thái

Hệ sinh thái AI edge Rockchip trong trạng thái **ổn định nhưng trì trệ**:

**Kiến trúc tổng thể:**
```
Orange Pi (Hardware Platform)
    ↓
RK3588/RK3568 SoC (NPU 2.3.2)
    ↓
MPP (Video/Media) ← RKNN Runtime (AI) → RKLLM (LLM)
    ↓
RKNN Toolkit 2 (Model Conversion)
    ↓
RKNN Model Zoo (Pre-trained Models)
```

**Trạng thái ngày 15/10/2026:**
- ❌ 0 PR, 0 release trên tất cả repos
- ❌ 0 hoạt động phát triển mới
- ⚠️ 2 issues cũ được cập nhật, cả 2 là vấn đề nghiêm trọng
- 🔴 Performance gap chưa giải quyết

## 📊 Bảng so sánh

| Dự án | Vai trò | Hoạt động 24h | Vấn đề chính | Độ chín |
|-------|---------|---------------|--------------|---------|
| **Orange Pi Build** | Hardware platform, build system | 0 | Không có signal | ⭐⭐⭐ Stable |
| **RKNN Toolkit 2** | Model conversion pipeline | 0 | Không có update | ⭐⭐⭐ Mature |
| **RKNN Model Zoo** | Pre-trained models, benchmarks | 1 issue | **YOLOv11n: 14.7 FPS thực tế vs 60 FPS claim** | ⭐⭐ Problematic |
| **MPP** | Hardware video decode/encode | 1 issue đóng | Confusion về dependency | ⭐⭐⭐ Stable |

## 🔗 Tích hợp phần cứng-phần mềm

### Stack hiện tại (verified từ issues):

**Hardware → Software chain:**
```
RK3588 NPU (6 TOPS INT8)
  ├─ CPU: Overclock max ✓
  ├─ NPU: Overclock max ✓
  └─ DDR: Overclock max ✓
       ↓
RKNN Runtime v2.3.2
  └─ rknn_server v2.3.2
       ↓
RKNN Toolkit 2 v2.3.2
  └─ Model conversion (ONNX→RKNN)
       ↓
Application (Android)
  └─ rknn_run() API
```

**Vấn đề tích hợp:**
- ✅ Hardware: Chip RK3588 mature, NPU v2.3.2
- ✅ Runtime: Version aligned v2.3.2 full stack
- ❌ **Performance: Gap 4x giữa spec và thực tế**
- ❓ Bottleneck: Model conversion? Runtime config? Hardware utilization?

### MPP video pipeline:
```
MPP Core (librockchip_mpp.so)
    ↓
GStreamer-Rockchip plugin (mppvideodec)
    ↓
Application (Buildroot/Linux)
```

Tích hợp ổn định, documentation issue chứ không phải technical bug.

## ⚡ Hiệu năng NPU

### Benchmark thực tế (từ issue #433):

| Model | Input | Platform | Spec Claim | Thực tế | Gap |
|-------|-------|----------|------------|---------|-----|
| **YOLOv11n** | 640×640 | RK3588 NPU | 60 FPS | 14.7 FPS | **4.08x** 🔴 |

**Chi tiết:**
- `rknn_run()`: ~68ms/frame average
- Single thread (theo documentation)
- Hardware đã overclock max
- NPU v2.3.2 mới nhất

**So sánh tiềm năng:**
- RK3588: 6 TOPS INT8 (spec)
- Raspberry Pi 5: ~2 TOPS
- Jetson Nano: 472 GFLOPS FP16
- **RK3588 nhanh hơn trên giấy, chậm hơn trong thực tế**

### Model support:

Từ RKNN Model Zoo (không update hôm nay, thông tin cũ):
- ✅ YOLO series (v5, v6, v7, v8, v11)
- ✅ MobileNet, ResNet, EfficientNet
- ✅ SegFormer, DeepLab
- ❓ LLM support qua RKLLM (không có data mới)

**Vấn đề:** Model converted chạy, nhưng performance không match marketing.

## 🛠️ Developer Experience

### SDK/Toolkit:

| Công cụ | Version | Đánh giá |
|---------|---------|----------|
| RKNN Toolkit 2 | v2.3.2 | ⭐⭐⭐ Conversion works nhưng slow |
| RKNN Runtime | v2.3.2 | ⭐⭐ Performance không match claim |
| MPP | Stable | ⭐⭐⭐ Works, docs confusing |
| Orange Pi Build | Unknown | ⭐⭐ Silent, no activity |

### Documentation:

**Problems từ issues:**
1. RKNN Model Zoo: Claim 60 FPS nhưng không có reference model để verify
2. MPP: Dependency chain không rõ ràng (repo `gstreamer-rockchip` khó tìm)
3. Không có tuning guide cho RK3588 NPU optimization

### Community response:

- RKNN Model Zoo issue #433: **5 comments trong 7 tháng, 0 maintainer response** 🔴
- MPP issue #959: 5 comments trong 3 tháng, có resolution ✅
- Không có PR review activity → Development stalled?

**DX Score: 4/10** - Tools work nhưng support yếu, docs thiếu, performance mystery.

## 💼 Use Cases

### Từ issues hôm nay:

**1. Real-time object detection (RKNN Model Zoo #433)**
- Platform: Android/RK3588
- Model: YOLOv11n 640×640
- Target: 60 FPS real-time
- Status: ❌ Chỉ đạt 14.7 FPS, blocked

**2. Hardware video decode (MPP #959)**
- Platform: Embedded Linux/Buildroot on RK3568
- Use: MPP + GStreamer pipeline
- Status: ✅ Resolved, integration clarified

### Trends từ ecosystem:

**Đang làm:**
- Edge AI inference trên embedded Linux/Android
- Video processing với hardware acceleration
- Object detection, segmentation

**Chưa thấy:**
- LLM deployment (RKLLM silent)
- Edge training
- Multi-model pipeline optimization
- Production case studies với verified performance

## 🔮 Xu hướng phát triển

### Signals từ data 24h qua:

**🔴 Negative:**
- 0 commits, 0 PRs trên tất cả repos
- Performance issue nghiêm trọng (4x gap) không được address
- Community engagement thấp
- Maintainer response rate cực thấp

**🟡 Neutral:**
- Software stack stable ở v2.3.2
- MPP pipeline hoạt động
- Hardware mature (RK3588, RK3568)

**🟢 Positive:**
- Không có (dựa trên data hôm nay)

### Dự đoán:

**Ngắn hạn (Q4 2026):**
- Ecosystem likely stagnant
- Performance issues sẽ tồn đọng
- Developer churn risk cao nếu không fix YOLOv11n bottleneck

**Trung hạn (2027):**
- Nếu không có major update:
  - Competition từ Qualcomm (Snapdragon NPU), MediaTek (APU), Apple (Neural Engine) sẽ vượt xa
  - Developer ecosystem migrate sang platform có better support
- Rockchip cần:
  - Fix performance gap urgent
  - Release reference models với verified benchmarks
  - Publish optimization guides
  - Improve maintainer engagement

**Lâu dài:**
- RK3588 architecture (2022) đang aging
- Cần next-gen NPU với:
  - Better INT8/FP16 performance
  - Transformer optimization
  - LLM inference support
  - Better developer tools

### Khuyến nghị cho developers:

**Tránh nếu:**
- Cần performance guarantee real-time (60+ FPS)
- Cần support nhanh từ maintainers
- Dự án production critical

**Cân nhắc nếu:**
- Budget constrained (RK3588 hardware rẻ)
- Có thời gian tune và debug
- Performance target thấp hơn (<20 FPS OK)
- Có team engineer experienced với ARM SoC

**Alternative options:**
- Jetson Orin Nano: Better support, higher cost
- Raspberry Pi 5 + Hailo AI: Simpler ecosystem
- Qualcomm RB5/RB6: Better docs, higher performance

---

## 📌 Kết luận

Hệ sinh thái Rockchip AI đang trong **crisis mode thầm lặng**:

- Hardware capable nhưng software không unlock được performance
- Documentation claim không match reality
- Community báo bug nghiêm trọng nhưng không được response
- Development activity = 0

**Risk:** Nếu trend tiếp tục, ecosystem sẽ die slow. Developers đang test (issue #433) sẽ abandon nếu không có fix trong vài tuần tới.

**Verdict:** Wait-and-see. Không recommend cho production mới. Monitor issue #433 - nếu được fix nhanh, signal positive. Nếu silent thêm 1-2 tháng, confirm stagnation.

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

# Báo cáo RKNN Model Zoo - 2026-10-15

## 📊 Tóm tắt hôm nay

Hoạt động thấp. Chỉ có 1 issue cũ (#433) được cập nhật bình luận. Không có PR, release, hay code mới.

## 🔧 Cập nhật phần cứng

Không có thông tin mới về hardware.

Issue #433 liên quan RK3588:
- NPU v2.3.2 runtime
- CPU/NPU/DDR đã overclock max
- Vẫn không đạt performance target

## 🤖 Tích hợp AI/LLM

Không có cập nhật về model optimization hay RKLLM.

Issue #433 đề cập:
- YOLOv11n converted bằng rknn-toolkit2 v2.3.2
- Input size 640x640
- Single thread inference

## ⚡ Hiệu năng & Benchmark

**Vấn đề performance nghiêm trọng** từ issue #433:

**Hiện tại:**
- YOLOv11n 640x640 trên RK3588
- `rknn_run()` mất ~68ms average
- = ~14.7 FPS
- Single core

**Mục tiêu:**
- Documentation claim: 60 FPS single core
- Reality: Thiếu 4x performance

**Gap lớn** giữa marketing và thực tế deployment.

## 🛠️ Hỗ trợ phần mềm

Không có SDK/toolkit update mới.

Version stack từ issue:
- RKNN Runtime: v2.3.2
- rknn_server: v2.3.2  
- rknn-toolkit2: v2.3.2
- Android platform

## 🐛 Vấn đề kỹ thuật

Issue #433 - **Performance bottleneck chưa resolve:**

User đã optimize:
- ✅ Hardware: CPU/NPU/DDR maxed
- ✅ Software: Latest v2.3.2 stack
- ✅ Threading: Single thread (theo spec)
- ❌ Vẫn chỉ đạt 14.7 FPS thay vì 60 FPS

Nguyên nhân chưa rõ:
- Model conversion settings?
- Runtime configuration?
- Hardware utilization thấp?
- Documentation sai?

User yêu cầu: Reference model file đạt 60 FPS để benchmark và so sánh.

## 👥 Cộng đồng & Use cases

Community engagement thấp hôm nay.

Issue #433 có:
- 5 comments (từ April đến giờ)
- 1 upvote
- Chưa có solution từ maintainers

**Use case:** Real-time object detection trên Android/RK3588, cần 60 FPS.

## 🗺️ Roadmap

Không có thông tin roadmap mới.

**Cần ưu tiên:**
- Reproduce và fix performance gap YOLOv11n
- Publish reference models với verified FPS claims
- Documentation về expected vs actual performance
- Tuning guide cho RK3588 NPU optimization

---

**Kết luận:** Ngày yên tĩnh về code activity. Performance issue nghiêm trọng vẫn open, chưa có response từ maintainers về 4x performance gap.

</details>

<details>
<summary><strong>Media Process Platform (MPP) module</strong> — <a href="https://github.com/rockchip-linux/mpp">rockchip-linux/mpp</a></summary>

# Báo cáo Hoạt động MPP - 2026-10-15

## 🎯 Tóm tắt hôm nay

Issue #959 đóng sau 3 tháng. User hỏi về gstreamer-rockchip package bị mất trong Buildroot. Thread chỉ đường tới repo chính thức.

**Hoạt động**: 1 issue đóng, 0 PR, 0 release.

## 🔧 Cập nhật phần cứng

Không có cập nhật mới về hardware, driver, NPU.

Thread đề cập RK3568 - chip cũ (2021), không phải tin mới.

## 🤖 Tích hợp AI/LLM

Không có update về RKLLM, RKNPU, model optimization hôm nay.

## ⚡ Hiệu năng & Benchmark

Không có benchmark mới.

## 📦 Hỗ trợ phần mềm

Issue #959 làm rõ dependency chain cho hardware decode trên RK3568:

1. **MPP core**: `github.com/rockchip-linux/mpp` → cung cấp `librockchip_mpp.so`
2. **GStreamer plugin**: `github.com/rockchip-linux/gstreamer-rockchip` → cung cấp `mppvideodec` element

Package `gstreamer-rockchip` không mất, chỉ user không tìm đúng repo.

## 🐛 Vấn đề kỹ thuật

**Issue #959**: Integration confusion, không phải bug.

Root cause: User tự port Buildroot, không rõ dependency. Thread confirm 2 repo cần thiết còn active.

## 👥 Cộng đồng & Use cases

Use case: Hardware video decode trên RK3568 embedded Linux (Buildroot).

Stack: MPP → GStreamer → application layer.

Community response: 5 comments giải quyết trong 3 tháng, issue đóng khi có answer.

## 🗺️ Roadmap

Không có thông tin roadmap mới hôm nay.

---

**Kết luận**: Ngày maintenance thấp. Một issue cũ đóng, không có development activity. Repo ổn định.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*