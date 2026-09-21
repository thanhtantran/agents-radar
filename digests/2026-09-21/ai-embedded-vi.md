# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-09-21

> Thời gian tạo: 2026-09-21 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So Sánh Hệ Sinh Thái AI Edge Rockchip/Orange Pi - 21/09/2026

## 🌐 Tổng quan hệ sinh thái

**Hoạt động: Rất thấp**. 1 repo duy nhất có activity (RKNN Toolkit 2). Orange Pi Build, RKNN Model Zoo, MPP đều im lặng.

Hệ sinh thái Rockchip NPU gồm:
- **Orange Pi**: hardware platform, SBC dùng Rockchip SoC
- **RKNN Toolkit 2**: AI framework convert model sang NPU format
- **RKNPU SDK**: runtime execute model trên NPU
- **Model Zoo**: pre-converted model library
- **MPP**: media processing, thường pair với NPU cho video AI

Ngày hôm nay: không có breakthrough, không có release. Chỉ có bug report và confusion về versioning.

## 📊 Bảng so sánh dự án

| Dự án | Issues mới | PRs | Releases | Hoạt động chính | Trạng thái |
|-------|------------|-----|----------|-----------------|------------|
| **Orange Pi Build** | 0 | 0 | 0 | Không | 🔴 Quiet |
| **RKNN Toolkit 2** | 2 | 0 | 0 | Bug report NPU, SDK confusion | 🟡 Maintenance |
| **RKNN Model Zoo** | 0 | 0 | 0 | Không | 🔴 Quiet |
| **MPP** | 0 | 0 | 0 | Không | 🔴 Quiet |

**Nhận định:** Chỉ toolkit có người dùng tương tác. Model Zoo và Build System không có tín hiệu developer adoption. MPP tách biệt khỏi AI workflow.

## 🔧 Tích hợp phần cứng-phần mềm

### Stack hiện tại:

```
Model (TensorFlow/PyTorch/ONNX)
         ↓
    RKNN Toolkit 2 (convert)
         ↓
    RKNN Model (.rknn)
         ↓
    RKNPU2 SDK (runtime)
         ↓
    RV1126B/RK3588 NPU (hardware)
         ↓
    Orange Pi Board
```

### Điểm integration quan trọng:

**RKNN Toolkit → NPU:** Issue #579 expose bug ở graph compilation layer. Bilinear resize generate sai instruction khi output feed vào op khác. Cho thấy compiler backend chưa stable với topology phức tạp.

**SDK → Hardware:** Version 2.4.2a15 xuất hiện nhưng không rõ feature hay fix gì. Versioning scheme (a2 → a15) không transparent.

**Hardware support:**
- RV1126B: bug resize active, cần firmware investigation
- RK3588: không có report mới, assume stable
- Orange Pi 5/5B/5 Plus (RK3588): no direct mention

### Gap trong integration:

1. **Compiler robustness**: Resize bug chỉ trigger trong intermediate node. Optimizer hoặc instruction generator có edge case.
2. **Debugging tools**: Không có mention về profiler, NPU tracer, hay visual debugger.
3. **Cross-layer optimization**: Không rõ có fuse resize với downstream op không.

## ⚡ Hiệu năng NPU

**Không có benchmark mới**. Dựa vào bug report:

### Resize performance:

| Mode | Correctness | Note |
|------|-------------|------|
| **Bilinear** (intermediate) | ❌ Wrong output | Bug #579 |
| **Bilinear** (terminal) | ✅ Correct | |
| **Nearest** | ✅ Correct | Workaround |

**Impact:** Model có preprocessing resize → inference pipeline bị break nếu dùng bilinear. Phải trade accuracy (nearest) hoặc restructure graph (không khả thi).

### Model support:

Model Zoo quiet → không biết có model mới được optimize không. Assume support matrix không thay đổi:
- YOLO series
- MobileNet
- ResNet
- SegNet
- Transformer-based: unclear

### NPU utilization:

Không có profiling data. Bug resize gợi ý:
- Instruction scheduling có issue
- Memory layout của intermediate tensor có thể không match expectation của downstream op
- Compiler không validate intermediate output format

## 👨‍💻 Developer Experience

### Toolkit (RKNN Toolkit 2):

**Positive:**
- User có thể reproduce bug và report detail (#579)
- Community active enough để phát hiện issue nhanh

**Negative:**
- Bug trong basic op (resize) → QA coverage thiếu
- Không có workaround từ team, user phải tự tìm
- Issue #579 chưa có response

### SDK (RKNPU2):

**Negative:**
- Version 2.4.2a15 appear trên network drive không notice
- Package label 2.4.2a2 nhưng claim a15
- Changelog missing
- User không biết upgrade có safe không

**Developer pain:**
```
Download SDK → Version label không match
Check changelog → Không có
Check release note → Không đồng bộ
Risk assessment → Impossible
Decision → Stuck
```

### Documentation:

Không có update. Assume vẫn gap:
- API reference có nhưng example ít
- Best practice cho model conversion không rõ
- Performance tuning guide thiếu

### Tooling:

Không mention về:
- Visual graph debugger
- NPU profiler
- Model accuracy validator trên hardware

## 🎯 Use Cases

**Không có use case sharing hôm nay**. Dựa vào bug context:

### Active use case (inferred):

1. **Video processing pipeline**: Resize → object detection
2. **Multi-stage inference**: Preprocessing resize → classification/detection
3. **Real-time camera**: Bilinear resize cho quality

### Blocked use case:

Bất kỳ pipeline nào có bilinear resize intermediate trên RV1126B. Example:
- Camera → Resize (bilinear) → YOLOv5 → Post-process
- Video → Resize → Segmentation
- Multi-resolution inference

### Workaround impact:

Switch sang nearest → quality drop cho:
- Face recognition (aliasing)
- Medical imaging
- Document OCR
- Any task sensitive đến interpolation artifact

## 🔮 Xu hướng phát triển

### Ngắn hạn (Q4 2026):

1. **Fix resize bug** - Critical. Block production deployment.
2. **Clarify SDK release process** - Developer trust issue.
3. **Add intermediate tensor validation** - Prevent tương tự bug.

### Trung hạn (2027):

**Nếu activity pattern tiếp tục:**
- Ecosystem growth chậm
- Orange Pi platform không differentiate qua AI
- Developer move sang platform có better tooling (Qualcomm, MediaTek, Apple Silicon)

**Cần để compete:**
- **Debugging tools**: NPU profiler, graph visualizer
- **Model Zoo expansion**: Pre-optimized model cho common task
- **Documentation**: End-to-end tutorial, performance guide
- **Community program**: Public roadmap, regular release cadence

### Dài hạn:

**Opportunity:**
- Edge AI market grow
- China semiconductor push → more Rockchip investment
- Orange Pi price advantage

**Risk:**
- Tooling gap với Qualcomm/MediaTek widening
- Developer experience poor → adoption slow
- Bug như resize expose stability concern

## ⚠️ Red Flags

1. **4/4 repo quiet trừ bug report** - Không có feature development visible
2. **SDK versioning chaos** - Release process broken
3. **Basic op bug** - QA regression
4. **No response trên issue** - Support resource thiếu hoặc slow
5. **Model Zoo dead** - Pre-trained asset không update

## 💡 Khuyến nghị cho Developer

### Nếu đang dùng:

- **Test resize thoroughly** nếu target RV1126B
- **Pin SDK version** - Không upgrade blind
- **Validate trên hardware** - Không trust simulator
- **Have Plan B** - Backend fallback cho critical op

### Nếu đang evaluate:

- **Wait** cho resize fix confirmed
- **Check alternative**: Qualcomm QNN, MediaTek NeuroPilot
- **Test use case** trên actual hardware trước commit
- **Budget time** cho tooling gap

### Nếu contribute:

- **Fix resize bug** (#579) - High impact
- **Add tests** cho intermediate op
- **Document SDK release** - Help community
- **Build debugging tool** - Ecosystem need

---

**Kết luận:** Ngày 21/09/2026 là quiet day cho Rockchip AI ecosystem. Duy nhất highlight là resize bug expose compiler issue. Không có release, không có feature, không có roadmap update. Developer experience bị impact bởi bug và version confusion. Ecosystem cần investment vào tooling và QA để compete.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Toolkit 2</strong> — <a href="https://github.com/airockchip/rknn-toolkit2">airockchip/rknn-toolkit2</a></summary>

# Báo cáo RKNN Toolkit 2 - 2026-09-21

## 🔍 Tóm tắt hôm nay

Hoạt động nhẹ. 2 issues mới, không có PR hay release. Tập trung vào bug NPU và câu hỏi SDK versioning.

## 🐛 Vấn đề kỹ thuật

### Critical: RV1126B NPU Bilinear Resize Bug (#579)

**Triệu chứng:**
- Bilinear resize cho kết quả sai khi output feed vào op khác
- Cùng op chạy đúng khi là terminal output
- Nearest interpolation không bị lỗi

**Chi tiết kỹ thuật:**
- Target: RV1126B NPU
- Chỉ xảy ra với bilinear mode
- Graph topology dependent (intermediate vs output node)
- Có thể là compiler optimization bug hoặc NPU instruction generation issue

**Impact:**
Nghiêm trọng cho production model có resize intermediate. Model output trực tiếp từ resize vẫn OK nhưng không phù hợp architecture thực tế.

**Workaround:**
- Switch sang nearest interpolation
- Đặt resize làm model output (không khả thi cho complex pipeline)

### SDK Version Confusion (#578)

User báo RKNPU2_SDK network drive upgrade lên 2.4.2a15 nhưng:
- Changelog không tìm thấy
- Package contents vẫn label 2.4.2a2
- Timestamp và hash khác nhau
- Không rõ compatibility

**Vấn đề quản lý phát hành:**
- Versioning scheme không rõ ràng (a15 vs a2)
- Documentation thiếu
- Release note không đồng bộ

## 📊 Hiệu năng & Benchmark

Không có update.

## 🔧 Hỗ trợ phần mềm

**RKNPU2 SDK 2.4.2a15:**
- Xuất hiện trên network drive
- Không có changelog official
- Nội dung package gây confusion về version thực

## 💻 Cập nhật phần cứng

**RV1126B NPU:**
- Phát hiện regression trong bilinear resize
- Cần firmware/driver investigation

## 🤖 Tích hợp AI/LLM

Không có update.

## 👥 Cộng đồng & Use cases

Không có discussion về use case cụ thể. Issues tập trung vào bug report technical.

## 🗺️ Roadmap

Không có announcement. Dự đoán priority:

1. **Fix RV1126B resize bug** - blocking production deployment
2. **Clarify SDK versioning** - documentation issue ảnh hưởng developer experience
3. **Release process improvement** - prevent version confusion

---

**Xu hướng:** Low activity day. Bug report chất lượng cao (#579 có reproducible case). Team cần investigate NPU backend code generation cho resize op và làm rõ release process.

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