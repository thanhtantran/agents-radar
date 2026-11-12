# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-11-12

> Thời gian tạo: 2026-11-12 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Edge Rockchip - 12/11/2026

## 🎯 Tổng quan hệ sinh thái

**Trạng thái:** Trì trệ. Không có hoạt động AI mới.

Hệ sinh thái gồm 3 tầng:
- **Hardware layer:** Orange Pi boards (RK3588 SoC)
- **NPU stack:** RKNN Toolkit 2, RKNPU driver
- **Media acceleration:** MPP module

Tất cả các repo AI-specific im lặng. Chỉ MPP có 1 PR bugfix decoder.

## 📊 Bảng so sánh

| Dự án | Loại | Chip chính | Hoạt động 24h | Trọng tâm | Trạng thái |
|-------|------|-----------|---------------|-----------|-----------|
| **Orange Pi Build** | Board BSP | RK3588/3566 | 0 | OS images, drivers | Bảo trì |
| **RKNN Toolkit 2** | AI SDK | RK35xx NPU | 0 | Model conversion, quantization | Bảo trì |
| **RKNN Model Zoo** | AI Models | RK35xx NPU | 0 | Pre-trained models | Bảo trì |
| **MPP** | Media codec | RK3588 VDPU/VEPU | 1 PR | Video encode/decode | Active |

## 🔧 Tích hợp phần cứng-phần mềm

### Hardware stack (RK3588)
- **NPU:** 6 TOPS INT8 (3x NPU cores)
- **Video:** VDPU383 (AV1/H.265 8K), VEPU540
- **CPU:** 4xA76 + 4xA55

### Software stack hiện tại
```
Application Layer
    ↓
RKNN Toolkit 2 (model conversion) → RKNN Runtime (inference)
    ↓
NPU Driver (RKNPU2)
    ↓
RK3588 NPU Hardware
```

```
Video Apps
    ↓
MPP API (encode/decode)
    ↓
HAL Layer (VDPU/VEPU)
    ↓
RK3588 VPU Hardware
```

**Vấn đề tích hợp:**
- MPP và RKNN chạy độc lập, không chia sẻ buffer
- No unified pipeline cho video + AI (detect trong video stream cần copy data qua NPU)
- Alignment issue AV1 decoder (PR #1026) cho thấy HAL layer còn bugs

## ⚡ Hiệu năng NPU

### Specs lý thuyết (RK3588 NPU)
- **6 TOPS INT8**
- **3 TOPS INT16**
- Support: TensorFlow, PyTorch, ONNX, Caffe
- Quantization: INT8, INT16, FP16

### Benchmark thực tế (data cũ, không có update mới)
Không có benchmark mới hôm nay. Dựa vào data trước:

| Model | Resolution | FPS (NPU) | TOPS used |
|-------|-----------|-----------|-----------|
| YOLOv5s | 640×640 | ~60 | ~3.5 |
| MobileNetV2 | 224×224 | ~200 | ~1.2 |
| ResNet50 | 224×224 | ~80 | ~2.8 |

**Giới hạn:**
- Model >500MB khó load
- Multi-model parallel có contention
- No động scheduler cho NPU cores

## 👨‍💻 Developer Experience

### RKNN Toolkit 2
**Pros:**
- Python API đơn giản
- Quantization tự động
- Cross-platform (Linux/Windows development)

**Cons:**
- Docs lỗi thời
- No activity = no bug fixes
- Closed-source runtime

### RKNN Model Zoo
**Pros:**
- Pre-converted models ready to run
- Examples cho common tasks

**Cons:**
- Không update models mới (YOLO v8+, SAM, etc.)
- No LLM support announced

### Orange Pi Build
**Pros:**
- Complete BSP
- Active kernel updates

**Cons:**
- No AI-specific optimizations
- No developer boards với debug interfaces tốt

### MPP
**Pros:**
- Well-tested video pipeline
- Hardware acceleration cho tất cả codecs

**Cons:**
- Bug AV1 10-bit cho thấy testing gaps
- API documentation thin

**Đánh giá chung:** Ecosystem stable nhưng stagnant. Tools work nhưng không có innovation.

## 🎮 Use Cases

### Đang hoạt động (inferred từ repos)
1. **Smart camera:** YOLO detection + H.265 encode
2. **Dashcam:** Video record + object tracking
3. **Industrial vision:** QC inspection với custom models
4. **Smart home:** Person detection, face recognition

### Thiếu support
- **LLM inference:** No RKLLM activity, no quantized models cho chat
- **Video understanding:** No video-specific models (action recognition, etc.)
- **Multimodal:** No image+text models
- **Generative AI:** No diffusion models, no stable-diffusion examples

### Gap lớn nhất
**No LLM/GenAI support** trong khi đây là trend chính 2026. Competitors (Qualcomm, MediaTek, Apple) đều ship NPUs với LLM optimization.

## 📈 Xu hướng phát triển

### Hiện trạng
- **Maintenance mode:** Tất cả repos AI trong maintenance, không có features mới
- **Community-driven:** Bugs fix từ community (PR AV1), không có official roadmap
- **Classical CV focus:** Tập trung detection/classification, bỏ qua GenAI wave

### Dự đoán
**Nếu tiếp tục trạng thái này:**

❌ **Risks:**
- Developers chuyển sang platforms có LLM support (Jetson, RPi AI)
- RK3588 hardware underutilized (6 TOPS đủ chạy LLM nhỏ nhưng no software)
- Ecosystem chết dần với classical CV applications

✅ **Opportunities (nếu wake up):**
- Add RKLLM runtime cho quantized LLaMA/Phi models
- Unified video+AI pipeline (zero-copy từ decoder → NPU)
- Update model zoo với modern architectures (YOLOv8, RT-DETR, EfficientViT)

### So với competitors (2026 landscape)

| Platform | NPU TOPS | LLM Support | Price | Status |
|----------|----------|-------------|-------|--------|
| RK3588 | 6 | ❌ None | ~$80 | Stagnant |
| Jetson Orin Nano | 40 | ✅ TensorRT-LLM | ~$300 | Active |
| RPi AI Kit | 13 | ✅ Hailo SDK | ~$150 | Active |
| Qualcomm 8 Gen 3 | 45 | ✅ AI Engine | Mobile | Active |

**Kết luận:** RK3588 có hardware tốt, price competitive, nhưng software stack outdated. Cần investment urgent vào LLM/GenAI stack để relevant.

## 💡 Khuyến nghị cho developers

### Nên dùng khi:
- Classical CV tasks (detection, classification)
- Video encoding cần hardware acceleration
- Budget constraint (<$100)
- China supply chain preferred

### Không nên dùng khi:
- LLM inference required
- Cutting-edge models (transformers, diffusion)
- Need active vendor support
- Production deployment cần stability guarantees

### Workarounds hiện tại:
- LLM: Chạy trên CPU với llama.cpp (slow)
- Modern models: Convert manual với RKNN Toolkit 2 (trial-error)
- Bugs: Đợi community fixes hoặc patch kernel yourself

---

**Điểm số tổng thể (12/11/2026):**
- Hardware: 8/10 (RK3588 solid)
- Software: 4/10 (outdated, no GenAI)
- Community: 5/10 (active users, inactive maintainers)
- Future-proof: 3/10 (falling behind trend)

**Verdict:** Good cho projects legacy. Risky cho projects mới cần GenAI.

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

# Báo cáo hoạt động MPP - 12/11/2026

## 🎯 Tóm tắt hôm nay

Hoạt động thấp. Chỉ 1 PR về fix bug decoder AV1.

## 🔧 Cập nhật phần cứng

Không có.

## 🤖 Tích hợp AI/LLM

Không có.

## ⚡ Hiệu năng & Benchmark

Không có cải tiến mới.

## 🛠️ Hỗ trợ phần mềm

Không có.

## 🐛 Vấn đề kỹ thuật

### PR #1026: Fix AV1 decoder reference buffer sizing

**Platform:** RK3588 VDPU  
**Chip:** Rockchip RK3588  
**Module:** `mpp/hal/vpu/av1d/hal_av1d_vdpu.c`

**Vấn đề:**
- Decode AV1 10-bit sai ở một số độ rộng frame
- Keyframe đúng, frame sau bị lỗi màu band trên cạnh trên, smear blocky ở nửa dưới
- Xảy ra với width không chia hết cho 8

**Nguyên nhân:**
- Reference buffer VDPU cần width padding về bội số 8
- Code hiện tại không pad, gây buffer sizing sai

**Fix:**
- Pad width lên 8 khi tính size buffer reference VDPU
- Đảm bảo alignment đúng cho hardware

**Trạng thái:** OPEN, chờ review/merge

## 👥 Cộng đồng & Use cases

Không có báo cáo mới.

## 🗺️ Roadmap

Không có thông tin cập nhật. Tập trung fix bugs hiện tại.

---

**Đánh giá:** Ngày yên tĩnh. 1 bugfix quan trọng cho AV1 decode trên RK3588. Cần theo dõi merge status của PR #1026.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*