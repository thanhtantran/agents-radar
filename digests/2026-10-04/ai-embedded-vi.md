# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-04

> Thời gian tạo: 2026-10-04 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ Sinh thái AI Nhúng Rockchip/Orange Pi
**Ngày: 2026-10-04**

---

## 1. 🌐 Tổng quan Hệ Sinh thái

**Trạng thái hiện tại**: Hệ sinh thái đóng băng. Zero hoạt động trên Orange Pi Build, RKNN Toolkit2, RKNN Model Zoo. Chỉ có MPP (media processing) động nhẹ với 1 PR đóng.

**Kiến trúc stack**:
```
Orange Pi Hardware (RK3588/RK3566)
        ↓
MPP (video codec) + RKNPU (AI accelerator)
        ↓
RKNN Toolkit2 (model conversion)
        ↓
RKNN Model Zoo (pre-trained models)
```

**Vấn đề**: Tách rời. MPP focus video decode. NPU/RKNN không có update kết nối với COLMV feature mới. Thiếu tích hợp end-to-end.

---

## 2. 📊 Bảng So sánh Dự án

| Dự án | Issues (24h) | PRs (24h) | Releases (24h) | Focus | Trạng thái |
|-------|--------------|-----------|----------------|-------|------------|
| **Orange Pi Build** | 0 | 0 | 0 | Board support, BSP | 🔴 Im lặng |
| **RKNN Toolkit2** | 0 | 0 | 0 | Model conversion tool | 🔴 Im lặng |
| **RKNN Model Zoo** | 0 | 0 | 0 | Pre-trained models | 🔴 Im lặng |
| **MPP (Rockchip)** | 0 | 1 đóng | 0 | Video codec hardware | 🟡 Hoạt động thấp |

**Insight**: MPP là layer duy nhất động. AI stack (RKNN) zero cập nhật. Disconnect giữa media và AI pipeline.

---

## 3. 🔗 Tích hợp Phần cứng - Phần mềm

### Hardware Layer
- **RK3588**: VDPU34x decoder, NPU 6 TOPS
- **COLMV export** (PR #969): Hardware decoder giờ export motion vector metadata

### Software Layer
```
COLMV data → MppBuffer → Application
                            ↓
                    [Gap ở đây - no RKNN integration]
                            ↓
                         NPU ?
```

**Cơ hội bị bỏ lỡ**: COLMV data = training data cho motion prediction model. Nhưng không có bridge vào RKNN pipeline. Developer phải tự build glue code.

**API mới từ MPP**:
```c
// Config flag
base.enable_colmv = 1;

// Query metadata
MppBuffer colmv_buf;
mpp_frame_get_meta(frame, KEY_DEC_COLMV, &colmv_buf);

RK_U32 colmv_size;
mpp_frame_get_meta(frame, KEY_DEC_COLMV_SIZE, &colmv_size);
```

Disabled mặc định. Zero overhead khi không dùng.

---

## 4. ⚡ Hiệu năng NPU

**Specs RK3588 NPU**:
- 6 TOPS INT8
- Support TensorFlow, PyTorch, ONNX (qua RKNN conversion)
- H.264/H.265 decode offload qua VDPU34x

**Benchmark gap**: Không có số liệu mới. RKNN Model Zoo im lặng = không có model performance update.

**COLMV potential**:
- Motion vector từ hardware = zero CPU decode cost cho feature extraction
- Use case: video analytics không cần decode full frame cho motion data
- Bandwidth save: COLMV data << raw video frame

**Bottleneck**: Không có ready-made RKNN model consume COLMV format. Developer tự convert.

---

## 5. 👨‍💻 Developer Experience

### RKNN Toolkit2
- **Status**: Zero commit trong 24h
- **Pain point**: Không biết compatibility với COLMV format mới
- **Gap**: Docs không update về MPP integration

### MPP
- **API design**: Clean. Opt-in COLMV không break existing code
- **Docs**: PR #969 có technical detail, nhưng thiếu example code end-to-end
- **Review time**: 35 ngày (2026-08-29 → 2026-10-03). Slow merge cycle.

### Orange Pi Build
- **Zero activity** = BSP maintenance mode
- **Issue**: Không rõ COLMV support trong official Orange Pi image

**DX Score**: 4/10. Tools tách rời. Thiếu integration guide. Slow update cycle.

---

## 6. 🎯 Use Cases

### Hiện tại (từ COLMV PR)
1. **Video analytics pipeline**
   - Extract motion vector trực tiếp từ hardware
   - Bypass full decode cho motion-only tasks
   - Real-time scene understanding trên edge

2. **Training data collection**
   - COLMV = ground truth cho motion prediction model
   - Hardware decode → training data pipeline

3. **Post-processing optimization**
   - Motion-aware video enhancement
   - Adaptive encoding dựa trên motion complexity

### Blocked use cases (do thiếu RKNN integration)
- Motion prediction model inference trên NPU với COLMV input
- End-to-end video → COLMV → NPU inference → action
- Pre-trained RKNN model cho motion analysis

---

## 7. 🔮 Xu hướng Phát triển

### Positive signal
- COLMV export = Rockchip nhìn thấy AI/CV use case cho video metadata
- Hardware-accelerated feature extraction trend đúng hướng

### Negative signal
- **Fragmentation**: MPP động, RKNN đứng yên. Không sync.
- **Slow velocity**: 35 ngày merge 1 PR. Innovation bị chậm.
- **Missing glue**: Hardware có feature, AI stack không theo kịp.

### Dự đoán 6 tháng tới

**Nếu tiếp tục hiện trạng**:
- MPP thêm metadata export (optical flow, scene change detection)
- RKNN vẫn tách rời, developer tự bridge
- Community fork tools integration, không official support

**Nếu Rockchip invest integration**:
- RKNN Toolkit2 native support COLMV format
- Model Zoo thêm pre-trained motion analysis model
- Orange Pi BSP bundle MPP + RKNN integration example
- Unified video → AI pipeline với docs

**Khuyến nghị cho Rockchip**:
1. Release RKNN example consume COLMV data
2. Benchmark motion prediction trên NPU với COLMV input
3. Sync release cycle giữa MPP và RKNN
4. End-to-end tutorial: video decode → COLMV → NPU inference

---

## 🎓 Kết luận cho Developer

**Hiện tại (2026-10-04)**:
- MPP COLMV feature production-ready cho C/C++ developer
- RKNN stack không có update integrate với COLMV
- Tự build glue code nếu cần video metadata → AI pipeline

**Khi nào adopt**:
- ✅ Dùng COLMV nếu: video analytics, motion extraction, không cần NPU inference
- ⏸️ Đợi nếu: cần end-to-end NPU pipeline, muốn pre-trained RKNN model

**Alternative**:
- OpenCV optical flow (CPU-based, slower nhưng integrated)
- Custom NPU model, tự convert COLMV format

**Watch list**:
- RKNN Toolkit2 repo cho COLMV support announcement
- MPP docs update với AI use case example
- Orange Pi BSP release notes cho integrated image

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

# Báo cáo hoạt động MPP - 2026-10-04

## 📊 Tóm tắt hôm nay

Hoạt động thấp. Chỉ 1 PR đóng (#969). Không có issue mới, release mới.

## 🔧 Cập nhật phần cứng

**PR #969 - Export raw COLMV metadata từ decoder**
- Target: RK3588 NPU
- Decoder: VDPU34x
- Codec: H.264/H.265 decode

Chi tiết kỹ thuật:
- `base:enable_colmv` flag - tắt mặc định
- `KEY_DEC_COLMV` - buffer chứa COLMV từ hardware  
- `KEY_DEC_COLMV_FMT` - format layout từ hardware
- `KEY_DEC_COLMV_SIZE` - kích thước metadata

## 🤖 Tích hợp AI/LLM

Không có cập nhật RKLLM/RKNPU trong ngày.

## ⚡ Hiệu năng & Benchmark

**COLMV metadata export** - use case:
- Motion vector analysis cho computer vision
- Post-processing optimization  
- ML training data từ hardware decoder trực tiếp
- Opt-in không ảnh hưởng performance baseline

## 🛠️ Hỗ trợ phần mềm

**API mới từ PR #969:**
```
enable_colmv → config flag
KEY_DEC_COLMV → MppBuffer handle
KEY_DEC_COLMV_FMT → layout descriptor
KEY_DEC_COLMV_SIZE → size query
```

Tích hợp vào existing MPP decode pipeline. Không break compatibility - disabled mặc định.

## 🐛 Vấn đề kỹ thuật

Không có bug report mới trong 24h qua.

## 👥 Cộng đồng & Use cases

**Use case tiềm năng từ COLMV export:**
- Video analytics pipeline lấy motion data thẳng từ hardware
- Training data cho motion prediction model
- Real-time scene understanding trên edge device
- Giảm overhead decode lại video cho feature extraction

## 🗺️ Roadmap

Không có thông tin roadmap mới. PR #969 đóng ngày 2026-10-03 sau 35 ngày review (tạo 2026-08-29).

---

**Kết luận**: Ngày yên tĩnh. COLMV feature đóng PR là điểm chính - mở khả năng extract hardware metadata cho AI/CV workload trên RK3588 edge device.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*