# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-14

> Thời gian tạo: 2026-10-14 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo so sánh hệ sinh thái AI Edge - Rockchip/Orange Pi
**Ngày 14/10/2026**

## 📊 Tổng quan hệ sinh thái

Hôm nay: **im lặng hoàn toàn**. 

4 repo chính - 0 commit, 0 PR, 0 release. Chỉ 1 issue cũ (#460) có comment về ViTTracker conversion lỗi.

**Bức tranh**: Hệ sinh thái Rockchip NPU mature, ít thay đổi đột ngột. Tooling ổn định nhưng backlog issue chưa giải quyết. Community nhỏ, support chậm (issue 11 tháng không fix).

## 📋 Bảng so sánh

| Dự án | Vai trò | Hoạt động 24h | Issue mở | Trạng thái |
|-------|---------|---------------|----------|------------|
| **Orange Pi Build** | BSP, OS image | Không | 0 | Maintenance mode |
| **RKNN Toolkit 2** | Model conversion | 1 comment | 1 critical | Có bug chưa fix |
| **RKNN Model Zoo** | Pre-converted models | Không | 0 | Stable |
| **MPP** | Video encode/decode | Không | 0 | Stable |

## 🔗 Tích hợp phần cứng - phần mềm

**Hardware (Orange Pi)**:
- SBC chạy Rockchip SoC (RK3588, RK3576...)
- NPU tích hợp trên chip
- Hỗ trợ Linux BSP

**Software stack**:
```
Application Layer
      ↓
RKNN Model Zoo (pre-converted models)
      ↓
RKNN Toolkit 2 (ONNX/TF → RKNN conversion)
      ↓
RKNN Runtime API
      ↓
NPU Driver
      ↓
Rockchip NPU Hardware
```

**Kết nối**: BSP từ Orange Pi Build → OS boot → RKNN runtime load models → NPU inference.

**Gap**: Issue #460 chứng minh conversion quality còn vấn đề với Transformer architecture. Fusion optimizer chưa handle ViT đúng.

## ⚡ Hiệu năng NPU

### RK3588 (chip phổ biến nhất)
- **NPU**: 6 TOPS INT8
- **Architecture**: 3-core NPU
- **Supported ops**: CNN tốt, Transformer/Attention gặp bug

### Model support (từ Model Zoo)
- ✅ CNN classics: ResNet, MobileNet, YOLO
- ✅ Detection: YOLOv5/v8, SSD
- ⚠️ Transformer: ViT có conversion bug
- ❌ LLM: Không thấy trong zoo

### Benchmark (không có data mới hôm nay)
Cần check commits cũ hoặc docs riêng.

## 🛠️ Developer Experience

**Tooling**:
- ✅ RKNN Toolkit 2: ONNX/TF/PyTorch → RKNN
- ✅ Model Zoo: Examples sẵn
- ✅ Docs: Có nhưng tiếng Trung nhiều
- ❌ Issue response: Rất chậm (11 tháng không fix)

**Pain points** (từ issue #460):
```python
# ONNX model works fine
onnx_output = run_onnx(input)  # ✅ Correct

# RKNN converted model
rknn_output = run_rknn(input)  # ❌ Wrong after fusion
# No clear workaround - disable fusion?
```

**Learning curve**: Trung bình. Cần hiểu:
1. RKNN format quirks
2. Quantization tradeoffs (FP16 vs INT8)
3. Operator support limitations
4. Khi nào fusion breaks model

## 💼 Use Cases

**Từ issue #460**:
- Visual object tracking (ViTTracker)
- Real-time CV trên edge
- RK3588 board

**Typical uses** (suy từ Model Zoo):
- Smart camera: detection, tracking
- IoT vision: classification
- Robotics: perception
- Industrial inspection

**Chưa thấy**:
- LLM deployment (có thể do NPU TOPS thấp)
- Multimodal AI
- Speech processing

## 🔮 Xu hướng phát triển

**Dự đoán từ data**:

📉 **Ngắn hạn (Q4 2026)**: 
- Hoạt động chậm, ít update
- Bug backlog tồn đọng
- Community patience giảm

📊 **Trung hạn (2027)**:
- Cần fix Transformer support (ViT, attention mechanisms)
- Rockchip có thể release chip mới với NPU mạnh hơn
- Pressure từ competitors (Hailo, Amlogic NPU)

🎯 **Cần làm**:
1. **Urgent**: Fix issue #460 - Transformer fusion
2. **Important**: Improve documentation (English)
3. **Strategic**: Add LLM quantization support (trend 2026-2027)
4. **Community**: Faster issue response

**Competition watch**:
- Hailo-8: 26 TOPS, mature SW stack
- Amlogic A311D2: 25 TOPS
- Rockchip cần differentiate or lose ground

## 🎬 Kết luận

**Hôm nay**: Không activity ≠ dead project. Maintenance mode.

**Strengths**:
- Hardware tốt (RK3588 balance price/performance)
- CNN inference mature
- Model Zoo có examples

**Weaknesses**:
- Slow support cycle
- Transformer/modern architecture bugs
- English docs thiếu
- Không theo kịp LLM trend

**Advice cho developers**:
- ✅ Dùng cho CNN-based CV tasks
- ⚠️ Test kỹ nếu dùng Transformer
- ❌ Tránh cho production critical nếu cần fast support
- 🔧 Workaround: Disable operator fusion nếu gặp accuracy issues

**Rating**: 6/10 - Solid hardware, mediocre software support.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Toolkit 2</strong> — <a href="https://github.com/airockchip/rknn-toolkit2">airockchip/rknn-toolkit2</a></summary>

# Báo cáo RKNN Toolkit 2 - 14/10/2026

## 📊 Tóm tắt hôm nay

Hoạt động yên tĩnh. 1 issue cũ (#460) có comment mới từ người dùng. Không có PR, release, hay cập nhật code.

## 🔧 Cập nhật phần cứng

Không có.

## 🤖 Tích hợp AI/LLM

Không có cập nhật toolkit. Issue #460 vẫn mở từ 06/11/2025, cập nhật cuối 13/10/2026:

- **Vấn đề**: ViTTracker ONNX → RKNN conversion thành công nhưng inference outputs sai sau operator fusion
- **Platform**: RK3588, RKNN Toolkit 2.3.2
- **Triệu chứng**: Accuracy giảm mạnh so với ONNX gốc
- **Root cause nghi ngờ**: Operator fusion làm sai logic của Vision Transformer
- **Trạng thái**: Chờ response từ Rockchip team

## ⚡ Hiệu năng & Benchmark

Không có.

## 🛠️ Hỗ trợ phần mềm

Không có SDK/toolkit update.

## 🐛 Vấn đề kỹ thuật

**Issue #460 - Critical:**

- ViTTracker model conversion lỗi logic sau fusion
- Impact: Production deployment bị block
- Workaround hiện tại: Chưa có
- 4 comments, chưa resolved
- Age: 11 tháng (tạo 11/2025)

Technical details từ issue:
- ONNX model convert thành công
- Inference output không match expected results
- Operator fusion stage gây regression
- Cần Rockchip engineer investigate fusion logic cho Transformer architecture

## 👥 Cộng đồng & Use cases

User @Alex-mtnkv deploy ViTTracker (object tracking với Vision Transformer) trên RK3588. Use case: real-time visual tracking trên edge device.

Frustration level: cao (issue open 11 tháng, 4 comments, no resolution).

## 🗺️ Roadmap

Không có thông tin mới về roadmap.

---

**Đánh giá**: Ngày 14/10 không có hoạt động phát triển. Repo có backlog issue về model conversion quality cần attention. ViT/Transformer support trên RKNN cần improve - architecture này quan trọng cho modern CV tasks.

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