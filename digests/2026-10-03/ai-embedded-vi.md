# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-03

> Thời gian tạo: 2026-10-03 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Edge Rockchip/Orange Pi
*Ngày 2026-10-03*

## 🔴 Cảnh báo: Không có dữ liệu hoạt động

Tất cả 4 dự án **không có hoạt động** trong 24h qua (issues/PRs/releases = 0). Báo cáo dựa trên kiến thức về kiến trúc tổng thể.

---

## 1. Tổng quan hệ sinh thái

**Orange Pi Build** → board support, bootloader, kernel  
**RKNN Toolkit 2** → model conversion (TensorFlow/PyTorch/ONNX → RKNN)  
**RKNN Model Zoo** → pre-converted models ready to deploy  
**MPP** → hardware video encode/decode (H.264/H.265/VP9)

**Flow**: Train model → RKNN Toolkit 2 quantize → deploy to Orange Pi với NPU (RK3588/RK3576) → MPP xử lý video pipeline

---

## 2. Bảng so sánh

| Dự án | Mục đích | Target hardware | Độ khó | Output |
|-------|----------|-----------------|--------|---------|
| **Orange Pi Build** | OS/BSP cho boards | RK3588/3576/3566 | Trung bình | bootable images |
| **RKNN Toolkit 2** | Model conversion | x86/ARM dev machine | Cao | `.rknn` files |
| **RKNN Model Zoo** | Pre-trained models | RK NPU-enabled SoCs | Thấp | ready-to-run inference |
| **MPP** | Video codec HAL | Rockchip SoCs | Cao | decoded frames |

---

## 3. Tích hợp phần cứng-phần mềm

**NPU (Neural Processing Unit)**:
- RK3588: 6 TOPS INT8
- RK3576: 6 TOPS INT8
- Chỉ chạy quantized models (INT8/INT16)

**Pipeline điển hình**:
```
Camera → MPP decode → RKNN inference (NPU) → Post-process (CPU/GPU) → Display/Network
```

**Bottlenecks**:
- MPP-RKNN memory copy (zero-copy cần DMA buf sharing)
- INT8 quantization loss (2-5% accuracy drop typical)

---

## 4. Hiệu năng NPU

**RK3588 NPU** (3 cores):
- YOLOv5s: ~50 FPS @ 640x640
- MobileNetV2: ~200 FPS @ 224x224
- ResNet50: ~30 FPS @ 224x224

**Model support**:
- ✅ CNN (YOLO, ResNet, MobileNet, EfficientNet)
- ✅ Transformer (ViT với INT8)
- ❌ LLMs lớn (vượt 1B params, cần CPU fallback)

**Constraints**:
- Max model size: ~2GB
- INT8 only cho peak TOPS
- FP16 fallback chậm hơn 4-8x

---

## 5. Developer Experience

**RKNN Toolkit 2**:
- Python API cho conversion
- Accuracy analyzer built-in
- Dataset calibration cho INT8 quantization
- ❌ Docs tiếng Anh còn thiếu, nhiều ví dụ tiếng Trung

**Orange Pi Build**:
- Debian/Ubuntu base images
- Kernel patches cho NPU driver
- ❌ Build time dài (2-4h full build)

**RKNN Model Zoo**:
- 40+ pre-converted models
- C/Python inference examples
- ✅ Fastest way để prototype

**MPP**:
- Low-level C API
- ❌ Steep learning curve
- FFmpeg wrapper tốt hơn cho most cases

---

## 6. Use Cases

**Đang thấy trong production**:
- Smart cameras (person detection, face recognition)
- Industrial QC (defect detection với custom YOLOv8)
- Retail analytics (people counting, heatmaps)
- Edge AI boxes (multi-stream video analytics)

**Not recommended**:
- LLM inference (dùng CPU hoặc cloud)
- High-accuracy scientific imaging (quantization loss cao)
- Real-time training (NPU inference-only)

---

## 7. Xu hướng phát triển

**Quan sát từ architecture**:

**Rockchip đang push**:
- Tích hợp NPU + ISP tighter (zero-copy pipelines)
- RK3588 thế hệ tiếp có thể 12-18 TOPS
- INT4 quantization support

**Community cần**:
- ONNX Runtime backend cho RKNN (đang experimental)
- Better Transformer support (attention layers)
- PyTorch mobile integration

**Gap lớn**:
- Documentation tiếng Anh chính thức
- Cloud-to-edge model versioning tools
- Debugging tools cho quantization issues

---

## Kết luận cho Developers

**Bắt đầu với**:
1. RKNN Model Zoo → chọn model gần nhất
2. Test trên Orange Pi board
3. Chỉ convert custom model khi cần

**Khi nào dùng stack này**:
- ✅ Budget < $150/device
- ✅ Inference-only workloads
- ✅ CNN architectures
- ✅ Có dataset để calibrate INT8

**Khi nào không dùng**:
- ❌ Cần FP32 precision
- ❌ LLM > 1B params
- ❌ Training at edge
- ❌ Cần enterprise support 24/7

---

**Lưu ý**: Tất cả repos không có activity ngày hôm nay. Check GitHub trực tiếp để xem commit/issue history đầy đủ.

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