# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-09-27

> Thời gian tạo: 2026-09-27 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So Sánh Hệ Sinh Thái AI Edge Rockchip - 27/09/2026

## 1. Tổng Quan Hệ Sinh Thái

**Ngày chết im lìm.** Toàn bộ 4 repo chính = 0 hoạt động trừ 1 issue về OpenWrt package hosting.

Hệ sinh thái Rockchip AI gồm:
- **Orange Pi Build**: Build system cho board Orange Pi (dùng SoC Rockchip)
- **RKNN Toolkit 2**: SDK convert model PyTorch/TF/ONNX → RKNN format cho NPU
- **RKNN Model Zoo**: Pre-converted models cho NPU Rockchip
- **MPP**: Hardware video codec acceleration (liên quan AI qua decode/preprocess)

Stack điển hình:
```
Application Layer
    ↓
RKNN Toolkit 2 (model conversion)
    ↓
RKNN Runtime (inference)
    ↓
RKNPU Driver
    ↓
NPU Hardware (RK3588/RK3576/etc)
    ↓
Orange Pi Board (physical device)
```

## 2. Bảng So Sánh

| Tiêu chí | Orange Pi Build | RKNN Toolkit 2 | RKNN Model Zoo | MPP |
|----------|----------------|----------------|----------------|-----|
| **Mục đích** | OS build system | Model conversion SDK | Pre-built models | Video codec HAL |
| **Layer** | System | Toolchain | Application | HAL |
| **User target** | Board bringup | ML engineers | App developers | Video pipeline devs |
| **Hoạt động hôm nay** | 1 issue | 0 | 0 | 0 |
| **Active community** | Có (1 issue/ngày) | Không rõ | Không rõ | Không rõ |
| **AI relevance** | Gián tiếp (build OS cho AI board) | Trực tiếp (core toolchain) | Trực tiếp (model library) | Gián tiếp (preprocess video cho AI) |

## 3. Tích Hợp Phần Cứng-Phần Mềm

**Không có cập nhật integration ngày hôm nay.**

Architecture thông thường:

```
Hardware: RK3588 NPU (6 TOPS INT8)
    ↓ driver
Kernel: RKNPU kernel driver
    ↓ API
Runtime: librknnrt.so
    ↓ model
Converted RKNN models (từ RKNN Toolkit 2)
    ↓ app
Application code
```

**Điểm mạnh integration:**
- NPU tight-coupled với ISP/VPU → pipeline video → AI inference nhanh
- MPP handle decode → NPU inference → encode trong 1 pipeline

**Điểm yếu:**
- Proprietary stack, closed-source NPU driver
- Model zoo nhỏ so với TensorFlow Lite
- RISC-V board (như Orange Pi R2S) support yếu (issue #327 chứng minh)

## 4. Hiệu Năng NPU

**Không có benchmark mới hôm nay.**

Specs NPU Rockchip:

| SoC | NPU TOPS | Precision | Use Case |
|-----|----------|-----------|----------|
| RK3588 | 6 INT8 | INT8/INT16 | Detection, segmentation |
| RK3576 | 6 INT8 | INT8/INT16 | Same as 3588 |
| RK3568 | 1 INT8 | INT8 | Lightweight detection |

**So với competition:**
- Jetson Orin Nano: 40 TOPS INT8 (6.7x mạnh hơn, đắt hơn 3-4x)
- Hailo-8: 26 TOPS INT8 (4.3x mạnh hơn, giá tương đương)
- RK3588: tốt nhất về giá/performance trong segment <$100

## 5. Developer Experience

**Đánh giá dựa trên dữ liệu:**

### RKNN Toolkit 2
- ✅ Support PyTorch, TF, ONNX
- ✅ Python API
- ❌ Closed-source
- ❌ Documentation Trung Quốc, English translation vừa phải
- ❌ Không có hoạt động → community support chậm

### RKNN Model Zoo
- ✅ Pre-converted models tiết kiệm thời gian
- ❌ Library nhỏ so với TFLite Model Garden
- ❌ Không update hôm nay

### Orange Pi Build
- ✅ Build system sẵn cho multiple boards
- ❌ Issue #327: RISC-V support vỡ, distfeed không có
- ❌ Feedback loop chậm (1 issue/ngày)

**Kết luận DX:**
- Ecosystem trưởng thành nhưng đang **stagnant**
- Proprietary nature giới hạn community contribution
- RISC-V board là second-class citizen

## 6. Use Cases

**Từ issue #327:** User dùng Orange Pi R2S cho OpenWrt router → inference tại edge router.

**Use cases phổ biến cho RK3588:**
- Smart camera (person detection, face recognition)
- Edge gateway (analyze video streams)
- Robot vision (object detection + tracking)
- Industrial QA (defect detection)
- Retail analytics (people counting, heatmap)

**Missing use cases:**
- LLM inference (NPU 6 TOPS quá yếu cho LLM)
- Generative AI (stable diffusion cần >20 TOPS)

## 7. Xu Hướng Phát Triển

**Dự đoán từ inactive state ngày hôm nay:**

### ⚠️ Cảnh báo
- **4/4 repos không active** = maintenance mode hoặc internal development
- Community momentum thấp
- RISC-V support bị bỏ rơi (issue #327)

### 🔮 Dự đoán
1. **Short-term (3-6 tháng):**
   - Ecosystem sẽ tiếp tục stagnant
   - Competition từ Hailo, Qualcomm, Google Coral gia tăng
   - RISC-V board sẽ không được improve

2. **Mid-term (6-12 tháng):**
   - Rockchip có thể release RK35xx mới với NPU >10 TOPS
   - Nếu không, sẽ mất market share cho competitors
   - LLM inference cần NPU >20 TOPS → RK3588 out of game

3. **Long-term (1-2 năm):**
   - Nếu Rockchip không open-source NPU stack, ecosystem sẽ chết
   - Hailo + edge TPU có momentum tốt hơn
   - RISC-V AI sẽ là trend nhưng không phải với Rockchip

### 💡 Khuyến nghị cho developers

**Nên dùng RK3588 khi:**
- Budget <$100
- Vision inference traditional (detection, classification)
- Cần video pipeline tight-coupled
- Production volume lớn (giá chipset rẻ)

**Không nên dùng khi:**
- Cần LLM/generative AI
- Cần open-source full stack
- Project cần RISC-V
- Cần active community support

---

**TL;DR:** Ecosystem Rockchip AI mature nhưng stagnant. NPU performance tốt cho giá <$100, nhưng closed-source + inactive development = risk lớn cho long-term projects. Ngày 27/09/2026 = 0 progress trừ 1 bug report về RISC-V distfeed.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

# Báo cáo hoạt động Orange Pi Build System - 2026-09-27

## 📊 Tóm tắt hôm nay

Hoạt động rất thấp. 1 issue mới về vấn đề distfeed cho Orange Pi R2S chạy OpenWrt. Không có PR, release, hay cập nhật code.

## 🔧 Cập nhật phần cứng

Không có.

## 🤖 Tích hợp AI/LLM

Không có.

## ⚡ Hiệu năng & Benchmark

Không có.

## 💻 Hỗ trợ phần mềm

Không có.

## 🐛 Vấn đề kỹ thuật

**Issue #327 - Distfeed OpenWrt cho Orange Pi R2S (CPU Khaoyue X1 / RISC-V)**

- **Vấn đề**: Repository package OpenWrt 24.10.0 cho target `ky/riscv64` không tồn tại
- **URL lỗi**: `https://downloads.openwrt.org/releases/24.10.0/targets/ky/riscv64/packages`
- **Board ảnh hưởng**: Orange Pi R2S (RISC-V với CPU Khaoyue X1)
- **Tác động**: Không thể update package sau khi flash OpenWrt
- **Đánh giá**: Vấn đề infrastructure/hosting, không phải build system. Repo OpenWrt chính thức không maintain target này hoặc path sai.

## 👥 Cộng đồng & Use cases

User phàn nàn về việc thiếu support lâu dài cho board R2S RISC-V. Phản ánh vấn đề chung của board RISC-V edge: mainline support yếu, distro support chưa ổn định.

## 🗺️ Roadmap

Không có thông tin. 

---

**Kết luận**: Ngày rất yên tĩnh. Chỉ có 1 issue về OpenWrt distfeed. Không có tiến triển về AI/NPU hay phần cứng edge mới.

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