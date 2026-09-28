# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-09-28

> Thời gian tạo: 2026-09-28 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Edge Rockchip/Orange Pi
*Ngày 2026-09-28*

## 🎯 Tổng quan hệ sinh thái

Không có hoạt động nào ghi nhận trong 24 giờ qua trên tất cả repos. Đây là ngày cuối tuần (Chủ nhật), phổ biến với open source hardware projects.

Hệ sinh thái gồm 3 tầng:
- **Hardware**: Orange Pi boards (RK3588/RK3576)
- **NPU Runtime**: RKNN (Rockchip Neural Network)
- **Media**: MPP (hardware video encode/decode)

## 📊 Bảng so sánh

| Dự án | Vai trò | Ngôn ngữ chính | Tầng |
|-------|---------|----------------|------|
| orangepi-build | Build system, OS images | Shell/Python | Platform |
| rknn-toolkit2 | Model conversion, quantization | Python | Toolchain |
| rknn_model_zoo | Pre-converted models | Python/C++ | Application |
| mpp | Video codec acceleration | C | Hardware HAL |

## 🔧 Tích hợp phần cứng-phần mềm

**Orange Pi Build** → OS với driver NPU/VPU baked in
**RKNN Toolkit** → Convert PyTorch/ONNX/TF sang .rknn format
**Model Zoo** → Ready-to-run inference code
**MPP** → Hardware video pipeline kết nối với NPU (object detection trên video stream)

Pipeline điển hình:
```
Camera → MPP decode → RKNN inference → MPP encode → Output
```

## 🚀 Hiệu năng NPU

**RK3588 NPU**: 6 TOPS
**RK3576 NPU**: 6 TOPS

Support:
- INT8/INT16 quantization
- YOLOv5/v7/v8, ResNet, MobileNet, SegNet
- Real-time inference: 30+ FPS trên 1080p

Không support FP32 native, phải quantize.

## 👨‍💻 Developer Experience

**RKNN Toolkit**: Docker image với Python API, conversion workflow OK nhưng debug quantization khó
**Model Zoo**: Example code đầy đủ, nhưng chỉ C/C++, không có Python wrappers
**Orange Pi Build**: Documentation rải rác, phải tự build từ source

Pain points:
- Quantization accuracy loss không predictable
- Proprietary RKNN format, không portable
- Limited profiling tools

## 💡 Use Cases

Từ model zoo:
- License plate recognition (LPR)
- Face detection/landmark
- Object detection (retail, warehouse)
- Pose estimation
- Image classification

Edge deployment ưu điểm:
- Latency thấp (<50ms)
- No cloud cost
- Privacy (data stays local)

## 📈 Xu hướng phát triển

Không có activity → 2 khả năng:
1. Mature, ổn định, ít cần update
2. Stagnant, vendors focus internal tools

Hướng cần cải thiện:
- Transformer model support (ViT, BERT edge versions)
- FP16 support
- Better Python bindings
- Unified SDK thay vì 4 repos riêng

---

**Kết luận**: Hệ sinh thái đủ dùng cho CV tasks cơ bản. RKNN performance OK nhưng ecosystem còn fragmented. Suitable cho production nếu requirements fit model zoo. Custom models cần thời gian tune quantization.

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

Không có hoạt động trong 24 giờ qua.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*