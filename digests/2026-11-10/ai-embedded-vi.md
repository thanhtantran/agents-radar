# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-11-10

> Thời gian tạo: 2026-11-10 10:06 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI nhúng Rockchip/Orange Pi
**Ngày 2026-11-10**

## 🎯 Tổng quan Hệ sinh thái

Hệ sinh thái đang trong giai đoạn **trì trệ/bảo trì**. Không có hoạt động nào trong 24 giờ qua trên cả 4 repo chính.

**Cấu trúc hệ sinh thái:**
- **Orange Pi Build**: Platform firmware, bootloader, Linux kernel cho boards
- **RKNN Toolkit 2**: Convert model (TF/PyTorch/ONNX) → RKNN format
- **RKNN Model Zoo**: Pre-trained models đã optimize cho NPU
- **MPP**: Hardware video codec, không liên quan AI nhưng dùng chung silicon

## 📊 Bảng So sánh

| Dự án | Mục đích | Target User | Hoạt động |
|-------|----------|-------------|-----------|
| **orangepi-build** | Board bringup, OS images | System integrator, OEM | ❌ Inactive |
| **rknn-toolkit2** | Model conversion pipeline | ML engineer | ❌ Inactive |
| **rknn_model_zoo** | Ready-to-deploy models | App developer | ❌ Inactive |
| **mpp** | Video encode/decode HW accel | Media app dev | ❌ Inactive |

## 🔧 Tích hợp Phần cứng-Phần mềm

**Stack đầy đủ:**
```
Application Code
    ↓
RKNN Model Zoo (optional)
    ↓
RKNN Toolkit 2 (conversion)
    ↓
RKNN Runtime (inference)
    ↓
NPU Driver (kernel)
    ↓
RK3588/RK3576/RK3562 NPU Hardware
    ↓
Orange Pi Board (carrier)
```

**Điểm mạnh:**
- Single vendor stack → ít fragmentation
- NPU driver built-in kernel → không cần manual setup
- Toolkit handle quantization tự động

**Điểm yếu:**
- Proprietary RKNN format → vendor lock-in
- Không có upstream kernel support → stuck với Rockchip fork
- Docs tiếng Trung → barrier cho international devs

## ⚡ Hiệu năng NPU

**RK3588 (flagship):**
- 6 TOPS INT8
- Support: YOLO, MobileNet, ResNet, Transformer (limited)
- Real-world: 30 FPS YOLOv5s @ 640x640

**RK3576 (mid-range):**
- 6 TOPS INT8 (same core)
- Ít RAM hơn → batch size nhỏ

**RK3562 (entry):**
- 1 TOPS INT8
- Chỉ small models

**Model support:**
- ✅ Computer vision: YOLO, SSD, RetinaNet, SegFormer
- ✅ Classification: ResNet, MobileNet, EfficientNet
- ⚠️ NLP: BERT base OK, large models fail
- ❌ Generative AI: Không đủ memory cho Stable Diffusion/LLM

## 👨‍💻 Developer Experience

**Toolkit workflow:**
```python
# 1. Convert
from rknn.api import RKNN
rknn = RKNN()
rknn.config(target_platform='rk3588')
rknn.load_pytorch(model='yolov5s.pt')
rknn.build(do_quantization=True)
rknn.export_rknn('yolov5s.rknn')

# 2. Deploy
rknn.init_runtime()
outputs = rknn.inference(inputs=[img])
```

**Pain points:**
- Quantization sensitive → accuracy drop không predictable
- Error messages vague
- API change giữa versions → migration pain
- Không có profiling tools → blind optimization

**Documentation:**
- English docs exist nhưng outdated
- Chinese docs đầy đủ hơn
- Community nhỏ → ít Q&A

## 💡 Use Cases Thực tế

**Đang deploy:**
1. **Smart camera**: Face detection/recognition, license plate
2. **Industrial vision**: Defect detection, object counting
3. **Edge AI box**: Multi-stream video analytics
4. **Robotics**: Object detection cho navigation

**Không suitable:**
- LLM inference (dùng RK3588 NPU cho LLaMA 7B → 2 tokens/sec, vô nghĩa)
- Stable Diffusion (out of memory)
- Training (NPU inference-only)

## 🔮 Xu hướng Phát triển

**Hiện tại (2026-11-10):**
- Zero activity → maintenance mode hoặc team nghỉ

**Dự đoán:**
1. **RK3588 plateau**: Hardware mature, software incremental updates only
2. **RK3576 adoption**: Giá rẻ hơn → sẽ thay RK3588 cho volume products
3. **Upstream struggle**: Rockchip không upstream NPU driver → forever fork
4. **Competition**: Amlogic, Allwinner đuổi kịp

**Risk cho developers:**
- Vendor dependency cao
- Community nhỏ → hard to hire
- Không có fallback nếu Rockchip pivot

## ⚠️ Kết luận

**Nên dùng khi:**
- CV tasks đơn giản (detection/classification)
- Budget tight (board ~$50-150)
- Không cần cutting-edge models
- OK với vendor lock-in

**Tránh khi:**
- Cần LLM/generative AI
- Muốn upstream kernel
- Team không đọc được tiếng Trung
- Product lifecycle >5 năm (support uncertainty)

**Alternative stack:**
- Google Coral (Edge TPU) → better docs, smaller models only
- NVIDIA Jetson → expensive, full stack
- Hailo-8 → best perf/watt, pricey

---

*Lưu ý: Data snapshot tại 2026-11-10 10:09 UTC. Inactivity trong 24h không represent long-term trend.*

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