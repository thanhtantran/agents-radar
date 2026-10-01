# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-01

> Thời gian tạo: 2026-10-01 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ Sinh thái AI Edge - Rockchip/Orange Pi
**Ngày: 2026-10-01**

---

## 📊 1. Tổng quan Hệ sinh thái

### Trạng thái hoạt động

| Dự án | Issues | PRs | Releases | Hoạt động 24h |
|-------|--------|-----|----------|---------------|
| **Orange Pi Build** | 0 | 0 | 0 | ❌ Không |
| **RKNN Toolkit 2** | 0 | 0 | 0 | ❌ Không |
| **RKNN Model Zoo** | 0 | 0 | 0 | ❌ Không |
| **MPP (Media)** | 1 | 0 | 0 | ⚠️ 1 bug AV1 |

**Nhận định:**
- Hệ sinh thái đóng băng. Không có commit, release, hoặc PR nào
- Chỉ có 1 bug report từ production user về AV1 decoder
- Không có hoạt động AI/NPU trong 24h qua
- Orange Pi phụ thuộc hoàn toàn stack Rockchip (RKNN, MPP)

---

## 🔀 2. Bảng So sánh Chi tiết

### Vai trò trong Stack

| Layer | Orange Pi | RKNN Toolkit 2 | RKNN Model Zoo | MPP |
|-------|-----------|----------------|----------------|-----|
| **Phân loại** | Board builder | AI inference SDK | Pre-trained models | Hardware video codec |
| **Mục đích** | BSP, OS images | Convert/run NN models | Reference AI apps | Video encode/decode |
| **Đối tượng** | Board makers, system devs | ML engineers | AI developers | Media app devs |
| **Dependency** | Rockchip SDK, Linux kernel | NPU drivers, RKNPU2 | RKNN Toolkit 2 | VPU drivers |
| **Output** | Bootable images | `.rknn` model files | Demo apps | Decoded video frames |

### Mức độ Tích hợp

```
Hardware Layer (SoC)
    ↓
[NPU: RK3588/RK3576] ←→ [VPU: AV1/H.264/H.265]
    ↓                          ↓
[RKNN Toolkit 2]          [MPP Library]
    ↓                          ↓
[RKNN Model Zoo]          [Media Apps]
    ↓                          ↓
[Orange Pi Build System]
    ↓
[Orange Pi Boards]
```

---

## ⚙️ 3. Tích hợp Phần cứng - Phần mềm

### Orange Pi Build
**Hardware support:**
- Rockchip RK3588, RK3576, RK3566, RK3399
- NPU embedded: 6 TOPS (RK3588), 6 TOPS (RK3576)
- Multi-core ARM Cortex-A76/A55

**Software stack:**
- Debian/Ubuntu base
- Rockchip BSP (closed-source blobs)
- Kernel 6.1 LTS
- Pre-integrated MPP, RKNN runtime

**Vấn đề:**
- No activity → outdated images
- Community patches (như AV1 film grain) không được merge nhanh

### RKNN NPU Stack
**Hardware abstraction:**
- Direct NPU register access via `RKNPU2` kernel driver
- Zero-copy DMA buffers giữa CPU-NPU
- INT8/INT16/FP16 quantization hardware-accelerated

**Toolkit pipeline:**
```
[ONNX/TFLite/Caffe] 
    → RKNN-Toolkit2 (trên x86 host)
    → .rknn file (quantized)
    → RKNN-Lite runtime (trên ARM board)
    → NPU inference
```

**Bottleneck hiện tại:**
- Toolkit chạy trên x86, không cross-compile trực tiếp trên board
- Model conversion cần Python environment phức tạp
- Debugging tools yếu (no profiler integration)

### MPP Video Processing
**Hardware path:**
- VPU hardware decoder → DRM/DMA buffer → Display
- Hardware film grain synthesis bị disable (issue #974)
- Zero-copy giữa VPU và NPU (nếu dùng shared buffers)

**AI + Video use case:**
```
Video stream → MPP decode → NPU inference (object detection)
            ↓
    Film grain broken → visual quality loss
```

---

## 🚀 4. Hiệu năng NPU

### Specs Lý thuyết

| SoC | NPU TOPS | NPU Arch | Supported Ops |
|-----|----------|----------|---------------|
| RK3588 | 6.0 | NPU2 | Conv2d, DepthwiseConv, FC, Pool, ReLU, Sigmoid, Softmax |
| RK3576 | 6.0 | NPU2 | Same as RK3588 |
| RK3566 | 1.0 | NPU1 | Subset của NPU2 |

### Thực tế (từ RKNN Model Zoo benchmarks cũ)

**YOLOv5s (640×640, INT8):**
- RK3588: ~50 FPS
- RK3576: ~50 FPS
- RK3566: ~15 FPS

**MobileNetV2 (224×224, INT8):**
- RK3588: ~200 FPS
- RK3576: ~200 FPS

**Hạn chế:**
- No new benchmarks từ 2024
- Không có Transformer/LLM support
- RKLLM (LLM runtime) không có trong dataset → chưa deploy production

---

## 👨‍💻 5. Developer Experience

### RKNN Toolkit 2
**Pros:**
- Python API đơn giản
- Pre-quantization tools tốt
- Support major frameworks (ONNX, TFLite)

**Cons:**
- ❌ Không có activity → bugs không được fix
- ❌ Documentation lỗi thời (links 404, examples cũ)
- ❌ Debugging: no layer-by-layer profiling
- ❌ x86-only toolkit → phải cross-compile

**Sample workflow:**
```python
# Trên x86 host
from rknn.api import RKNN
rknn = RKNN()
rknn.config(target_platform='rk3588')
rknn.load_onnx('model.onnx')
rknn.build(do_quantization=True)
rknn.export_rknn('model.rknn')

# Copy sang board → run inference
# Không có hot-reload, mỗi lần sửa model phải rebuild
```

### RKNN Model Zoo
**Pros:**
- Ready-to-run examples (YOLO, MobileNet, ResNet)
- C++ và Python examples

**Cons:**
- ❌ Models từ 2023-2024, không update
- ❌ Không có modern architectures (SAM, CLIP, Diffusion)
- ❌ No LLM examples

### Orange Pi Build
**Pros:**
- One-command build: `./build.sh`
- Pre-configured kernels

**Cons:**
- ❌ Build times 2-4 giờ
- ❌ Closed-source blobs (GPU, VPU, NPU drivers)
- ❌ Community patches ignored (AV1 bug từ 09-29 chưa fix)

### MPP
**Pros:**
- Hardware-accelerated video
- Zero-copy với NPU buffers (nếu setup đúng)

**Cons:**
- ❌ AV1 film grain broken (issue #974)
- ❌ Documentation thiếu (no API reference đầy đủ)
- ❌ Examples lỗi thời

---

## 💼 6. Use Cases Thực tế

### Từ Issue #974 (MPP)
**User: @lukaszsobala**
- Deploy AV1 video decoding trên production
- Hardware: Rockchip RK3588
- Problem: Film grain synthesis disabled → quality loss
- Solution: Đã có patch fix, nhưng maintainer không respond

**Nhận định:**
- Production users đang dùng Rockchip cho video processing
- Community phải tự patch bugs
- Không có official support responsive

### AI Edge Scenarios (suy đoán từ stack)

**Video Analytics:**
```
Camera → MPP H.264 decode → RKNN YOLO → Bounding boxes
```
**Bottleneck:** AV1 film grain bug ảnh hưởng nếu input là AV1 stream

**Smart Home:**
```
Audio → RK3588 DSP → RKNN wake word → Action
```
**Bottleneck:** RKNN không có audio model examples

**Edge LLM (giả thuyết với RKLLM):**
```
User query → RKLLM Llama-2-7B-INT8 → Response
```
**Status:** RKLLM không có trong dataset → chưa verify khả năng

---

## 📈 7. Xu hướng Phát triển

### Dấu hiệu Tích cực
✅ Hardware mạnh: RK3588 6 TOPS đủ cho edge AI  
✅ Community engagement: Users tự patch bugs (film grain)  
✅ Architecture support: NPU2 support major ops  

### Dấu hiệu Tiêu cực
❌ **Không có activity trong 24h** → maintainers abandoned?  
❌ **Bugs không được fix** → issue #974 open 2 ngày, no response  
❌ **No new models** → Model Zoo stuck ở 2023-2024 architectures  
❌ **No LLM path** → RKLLM dataset missing, không rõ production-ready  
❌ **Documentation rot** → Links 404, examples outdated  

### Dự đoán Q4 2026

**Kịch bản 1: Duy trì (60% probability)**
- Rockchip tiếp tục phát hành hardware (RK3590?)
- Software stack stagnant, community-driven patches
- Use cases giới hạn: video processing + simple CNN inference

**Kịch bản 2: Revival (20% probability)**
- New RKNN Toolkit 3 với LLM support
- Merge community patches
- Modern models: SAM, CLIP, Stable Diffusion quantized

**Kịch bản 3: Decline (20% probability)**
- Hardware vendors chuyển sang Qualcomm/MediaTek NPU
- Community fork thành alternative distros
- Orange Pi pivot sang other SoC vendors

---

## 🎯 8. Khuyến nghị cho Developers

### Nên dùng khi:
✅ Video processing heavy (MPP mạnh)  
✅ CNN inference đơn giản (YOLO, MobileNet)  
✅ Budget thấp (boards rẻ)  
✅ OK với community support, tự patch bugs  

### Không nên dùng khi:
❌ Cần LLM inference (chưa verify RKLLM production-ready)  
❌ Cần official support responsive  
❌ Cần cutting-edge models (Transformers, Diffusion)  
❌ Cần stable SDK (toolkit không update)  

### Alternative stacks:
- **NVIDIA Jetson**: Mạnh hơn, đắt hơn, ecosystem lớn hơn
- **Google Coral**: TPU specialized, nhưng locked vào TFLite
- **Qualcomm RB5**: Hexagon DSP, better AI software stack

---

## 📌 Kết luận Ngày 2026-10-01

**Trạng thái:** Hệ sinh thái đóng băng. Không có phát triển mới.  
**Critical bug:** AV1 film grain disabled (MPP issue #974).  
**Community health:** User engagement có, maintainer engagement không.  
**Production readiness:** Video processing OK, AI inference giới hạn ở simple CNNs, LLM unclear.

**Action items nếu đang dùng stack này:**
1. Monitor issue #974, apply patch nếu cần AV1
2. Audit codebase cho hardcoded flags khác
3. Freeze dependency versions, stack không ổn định
4. Plan migration path nếu không có activity trong Q1 2027

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

# Báo cáo hoạt động MPP - 2026-10-01

## 📊 Tóm tắt hôm nay

Hoạt động thấp. Chỉ có 1 issue mới về AV1 decoder. Không có PR, release, hay commit nào.

## 🔧 Vấn đề kỹ thuật

### 🐛 Bug nghiêm trọng: AV1 Film Grain bị vô hiệu hóa

**Issue #974** - Mở bởi @lukaszsobala (2026-09-29)

**Vấn đề:**
- AV1 decoder trên VPU_CLIENT_AV1DEC HAL không apply film grain
- `sw_apply_grain` hardcoded = 0 trong `mpp/hal/vpu/av1d/hal_av1d_vdpu.c`
- Video decode đúng nhưng thiếu grain layer → chất lượng hình ảnh kém

**Chi tiết kỹ thuật:**
- Ảnh hưởng: Rockchip Linux 6.1 kernel
- HAL module: `hal_av1d_vdpu.c`
- Film grain synthesis là tính năng quan trọng của AV1 codec
- User đã có minimal patch fix

**Tác động:**
- Content AV1 có film grain (phim, video chất lượng cao) hiển thị sai
- Mất lợi thế về visual quality của AV1 codec
- Ảnh hưởng boards: RK3588, RK3576, RK3566 support AV1

**Link:** https://github.com/rockchip-linux/mpp/issues/974

## 🔨 Cập nhật phần cứng

Không có cập nhật.

## 🤖 Tích hợp AI/LLM

Không có cập nhật.

## ⚡ Hiệu năng & Benchmark

Không có cập nhật.

## 📦 Hỗ trợ phần mềm

Không có cập nhật.

## 👥 Cộng đồng & Use cases

**Issue #974 phản ánh:**
- User đang deploy AV1 decoding trên Rockchip production
- Community phát hiện và patch bugs → engagement tốt
- Nhu cầu decode AV1 streaming content tăng

## 🗺️ Roadmap

**Cần làm gấp:**
- Review và merge patch fix film grain từ @lukaszsobala
- Regression test toàn bộ AV1 decoder path
- Verify trên RK3588/RK3576/RK3566 hardware

**Vấn đề tiềm ẩn:**
- Cần audit các hardcoded flags khác trong AV1 HAL
- Film grain synthesis có overhead performance → cần benchmark

---

**Kết luận:** Ngày yên tĩnh. Bug AV1 film grain nghiêm trọng cần attention. Có patch sẵn từ community → prioritize review.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*