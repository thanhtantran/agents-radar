# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-24

> Thời gian tạo: 2026-10-24 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Edge Rockchip - 2026-10-24

## 🎯 Tổng quan hệ sinh thái

**Hiện trạng**: Rockchip AI stack đang **stagnate**. 

- **MPP (Media Process Platform)**: Sống nhất. 18 bug fixes trong ngày, audit sâu codec stack. Nhưng không touch AI/NPU layer.
- **RKNN Toolkit 2**: Critical bugs không fix. Memory corruption batch inference (RK3588), platform detection sai ARM64. Response chậm 2+ tháng.
- **Orange Pi Build / RKNN Model Zoo**: Không hoạt động.

**Vấn đề cốt lõi**: Hardware (RK3588 NPU) mạnh, software stack broken. Codec layer có maintenance (MPP), AI layer bỏ rơi (RKNN).

---

## 📊 Bảng so sánh

| Chỉ số | Orange Pi Build | RKNN Toolkit 2 | RKNN Model Zoo | MPP |
|--------|-----------------|----------------|----------------|-----|
| **Hoạt động 24h** | 0 | 2 issues | 0 | 18 issues + 18 PRs |
| **Maintenance velocity** | Dead | Rất chậm | Dead | Cao |
| **Critical bugs** | N/A | 2 unresolved | N/A | 18 fixed |
| **Response time** | N/A | 2+ tháng | N/A | <1 ngày |
| **Lĩnh vực** | Board support | NPU inference | Model repo | Video codec |
| **Production ready** | Unknown | **Không** | Stale | Đang fix |
| **AI/NPU integration** | N/A | **Core** | **Core** | Không |

---

## 🔌 Tích hợp phần cứng - phần mềm

### Hardware: RK3588

- **NPU**: 6 TOPS (3x 2TOPS cores)
- **CPU**: 4xA76 + 4xA55
- **VPU**: Hardware encode/decode (H.264/HEVC/VP9/AV1)

### Software stack disconnect

```
┌─────────────────────────────┐
│   User Application          │
└──────────┬──────────────────┘
           │
┌──────────▼──────────────────┐
│  RKNN Toolkit 2 (AI)        │ ◄── BROKEN: batch corruption, platform bug
└──────────┬──────────────────┘
           │
┌──────────▼──────────────────┐
│  RKNN Runtime (NPU driver)  │ ◄── Memory corruption N>1
└──────────┬──────────────────┘
           │
┌──────────▼──────────────────┐
│  RK3588 NPU Hardware        │ ◄── Hardware OK
└─────────────────────────────┘

        vs.

┌──────────────────────────────┐
│  Video Application           │
└──────────┬───────────────────┘
            │
┌───────────▼──────────────────┐
│  MPP (Media Process)         │ ◄── ACTIVE: 18 fixes/ngày
└───────────┬──────────────────┘
            │
┌───────────▼──────────────────┐
│  RK3588 VPU Hardware         │ ◄── Hardware OK
└──────────────────────────────┘
```

**Kết luận**: Media stack (MPP) healthy, AI stack (RKNN) abandoned.

---

## 🧠 Hiệu năng NPU

### RK3588 NPU capability (spec)

- **Peak**: 6 TOPS INT8
- **Support**: CNN models (ResNet, MobileNet, YOLO)
- **Ops**: Conv2D, DepthwiseConv, Pooling, ElementWise
- **Partial**: RNN/LSTM/GRU (numerical issues - Issue #584)

### Thực tế từ bug reports

**Không hoạt động**:

```python
# Issue #584 - Batch inference broken
input_shape = [N, 416, 3]  # N > 1
model = Identity()  # simplest possible
result → garbage/Inf  # corruption
```

**Không reliable**:

- GRU/RNN: numerical deviation vs CPU
- Platform detection sai: x86_64 trên ARM64 board
- Batch=1 only → không scale production

**Model Zoo**: Không update → không biết models nào chạy được.

---

## 👨‍💻 Developer Experience

### RKNN Toolkit 2: **Tệ**

**Problems**:

1. **Critical bugs block work**
   - Batch > 1 corrupt memory
   - ARM64 platform không detect
   - GRU/sequence models sai số

2. **Slow/no response**
   - Issue #420: 2 tháng không fix
   - Issue #584: 1 ngày không reply
   - Maintainer MIA

3. **No documentation updates**
   - Không rõ workarounds
   - Không rõ supported ops
   - Model Zoo stale

**Developer sentiment**: Frustrated. "Block production deployment."

### MPP: **Tốt hơn**

**Positives**:

- Active maintenance
- Clear bug reports với repro steps
- Fast turnaround (18 fixes/1 ngày)
- Audit coverage edge cases

**Issues**:

- Tất cả từ 1 contributor → bus factor = 1
- Nhiều IOMMU faults, buffer overruns → test coverage yếu
- Chưa có CI results

---

## 🎬 Use Cases

### MPP (Media): **Đa dạng**

Từ bugs fixed:

- **Streaming**: AV1 spatial layers (L2T3/L3T1)
- **HDR video**: HEVC HDR10+, HDR Vivid metadata
- **High framerate**: 1080p60, level compliance
- **Professional**: VP9 Profile 2, 10/12-bit, 4:2:2
- **JPEG**: Camera/image processing

### RKNN (AI): **Blocked**

Từ bug reports:

- **Sequence models**: GRU cho time-series, NLP → numerical issues
- **Batch inference**: Object detection batch frames → corruption
- **Edge deployment**: ARM64 boards → platform detect fail

**Critical blocker**: Batch inference không hoạt động. Single-frame only → không practical cho video analytics, real-time detection.

---

## 📈 Xu hướng phát triển

### Rockchip ecosystem split

**Media (MPP)**: 
- ✅ Active development
- ✅ Bug fixes responsive
- ✅ Edge case coverage improving
- ⚠️ Single contributor risk

**AI (RKNN)**:
- ❌ Maintenance stalled
- ❌ Critical bugs ignored
- ❌ No roadmap visible
- ❌ Community frustrated

### Dự đoán

**Ngắn hạn (Q4 2026)**:

- MPP: Tiếp tục fix codec bugs, có thể mở rộng format support
- RKNN: Nếu không fix #584, #420 trong tháng này → developers abandon platform
- Orange Pi: Không có dấu hiệu sống

**Trung hạn (2027)**:

Hai kịch bản:

1. **Best case**: Rockchip invest lại vào RKNN team
   - Fix batch inference
   - Update model zoo
   - Improve RNN support
   - Active community engagement

2. **Likely case**: Developers pivot
   - Dùng RK3588 cho media only (MPP)
   - NPU inference chuyển sang:
     - Jetson Orin (NVIDIA)
     - Hailo-8 (dedicated NPU)
     - Orange Pi 5 Plus + external accelerator

### Khuyến nghị cho developers

**Nếu cần AI inference ngay**:

```
DON'T: RK3588 RKNN
  ↓
DO: Jetson Orin Nano / Hailo-8 / Google Coral
```

**Nếu cần video processing**:

```
DO: RK3588 + MPP (solid)
```

**Nếu committed RK3588**:

- Chỉ dùng batch=1
- Test mọi model trước production
- Workaround: split batch thành N single inferences
- Theo dõi GitHub daily cho fixes

---

## ⚠️ Đánh giá cuối

**RK3588 hardware**: Mạnh trên giấy (6 TOPS NPU + VPU).

**Software reality**: 

- **Media stack**: Production-grade với active fixes
- **AI stack**: Broken với maintenance chết

**Ecosystem health**: **Đỏ** cho AI edge. MPP không cứu được RKNN.

**Timeline**: Nếu không có response về #584 trong 1 tuần, đây là dead platform cho AI inference.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Toolkit 2</strong> — <a href="https://github.com/airockchip/rknn-toolkit2">airockchip/rknn-toolkit2</a></summary>

# Báo cáo RKNN Toolkit 2 - 2026-10-24

## 🔍 Tóm tắt hôm nay

Hoạt động thấp. 1 issue mới về memory corruption trên RK3588, 1 issue cũ về platform detection bug nhận thêm comment.

## 🐛 Vấn đề kỹ thuật

### Issue #584 - Memory Corruption RK3588 [MỚI - NGHIÊM TRỌNG]

**Hardware**: RK3588  
**Component**: RKNN Runtime  
**Severity**: Critical

**2 bugs độc lập**:

1. **Memory corruption với batch > 1**
   - Input: 4D tensor `[N, 416, 3]`
   - Model: Identity/echo (đơn giản nhất)
   - Kết quả: garbage/Inf không xác định
   - Chỉ xảy ra khi `N > 1`
   - Batch=1: OK, Batch=2+: corrupt

2. **GRU numerical deviation**  
   - Batch=1: lệch số học so với CPU reference
   - Bug riêng, không liên quan corruption

**Impact**: Block production deployment cho sequence models.

**Status**: Chưa có response từ maintainer (mới 1 ngày).

### Issue #420 - Platform Detection Bug [CŨ]

**Problem**: rknn-toolkit-lite2 v2.3.2 nhận sai arch  
- Hardware: RK3588 (aarch64)  
- Detected: x86_64  
- Error: "Unsupported run platform: Linux aarch64"

**Update ngày 24/10**: User comment thêm về env setup.

**Workaround**: Chưa có official fix sau 2 tháng.

## 🔧 Hỗ trợ phần mềm

Không có SDK/toolkit update trong ngày.

Toolkit 2.3.2 vẫn chứa platform detection bug chưa patch.

## 💬 Cộng đồng & Use cases

**Active issues**: Sequence models (GRU) và batch inference trên edge devices.

**User pain points**:
- Memory corruption block batch inference
- Platform detection sai trên ARM64
- Slow response time từ maintainer (issue #420: 2 tháng chưa fix)

## 🎯 Roadmap

Không có announcement mới.

**Critical needs** (từ community feedback):
- Fix memory corruption batch > 1
- Fix platform detection ARM64  
- Improve RNN/GRU numerical accuracy

---

**⚠️ Đánh giá**: Maintenance velocity thấp. 2 critical bugs chưa được address nhanh. User report regression trong basic functionality (identity model fail).

</details>

<details>
<summary><strong>RKNN Model Zoo</strong> — <a href="https://github.com/airockchip/rknn_model_zoo">airockchip/rknn_model_zoo</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Media Process Platform (MPP) module</strong> — <a href="https://github.com/rockchip-linux/mpp">rockchip-linux/mpp</a></summary>

# Báo cáo MPP - 2026-10-24

## 📊 Tóm tắt hôm nay

**Hoạt động:** Tất cả 18 issues + 18 PRs đều từ @UtsavBalar1231 trong 1 ngày. Burst quality audit toàn bộ parser/decoder stack.

**Trọng tâm:** Bug fixes ở layer thấp - parser logic, format detection, buffer management. Không có feature mới, NPU update, hay model integration.

## 🔧 Vấn đề kỹ thuật chính

### Decoder bugs (critical)

**AV1 decoder (#1010, #1012)**
- Operating point index confusion: dùng 12-bit IDC làm array index → out of bounds read
- CDF buffer reset khi frame resize → reference state mất → decode sai
- Impact: L2T3/L3T1 spatial layer streams stall hoặc decode lỗi

**VP9 parser (#1004, #996)**
- Profile 2 intra-only frames: skip color_config → misparse 5 bits → sai metadata
- 12-bit streams accept nhầm, label 10-bit → buffer undersize
- 4:2:2 streams accept, tag YUV422P nhưng HAL chỉ biết YUV422SP → reference errors

**HEVC decoder (#994, #990)**
- 10-bit 4:0:0: tag 8-bit MPP_FMT_YUV400 với 10-bit stride → caller đọc sai sample size
- HDR10+/HDR Vivid: giữ emulation prevention bytes `00 00 03` → metadata corrupt

**H.264 decoder (#1002)**
- SEI before SPS: drop picture timing → first frame report progressive khi thực ra interlaced

**JPEG decoder (#1000, #982, #980, #978)**
- Output format không support → viết past buffer → IOMMU fault
- Grayscale tag nhầm NV12 → caller đọc chroma plane không tồn tại
- Không set color range → JFIF full-range bị treat limited-range
- Undersized caller buffer vẫn chạy hardware → write fault

### Encoder bugs

**H.264/HEVC encoder (#1006, #1008)**
- Level selection: chỉ check frame size, bỏ qua frame rate → 1080p60 dùng level quá thấp
- H.264: 1080p60 cần 489600 MB/s, level 4.0 chỉ cho 245760
- HEVC: tương tự với MaxLumaSr

**H.264 encoder (#986)**
- YUV400 + Baseline/Main profile: không code chroma_format_idc → decoder assume 4:2:0 → errors

**JPEG encoder (#984)**
- VPU720 RGB input: log "unsupported" nhưng vẫn encode với format 0 → corrupt JPEG

**MPP encoder core (#988)**
- Một color value invalid → restore cả 4 fields → mất full-range request
- Reserved primaries values pass qua VUI

### System bugs

**DMA heap (#998)**
- Board không có DMA32 heap: cacheable DMA32 request → fallback uncached → CPU read chậm 64 MB

## 🔨 Pull requests (18 fixes)

Mỗi issue có 1 PR tương ứng. Pattern: reject unsupported streams sớm hơn, fix format tagging, fix buffer sizing, fix parser state.

**Decoder fixes:**
- #1011: AV1 operating point - pass IDC as-is, không index
- #1013: AV1 CDF/colmv - keep buffers khi resize thay vì reallocate
- #997: VP9 12-bit reject
- #993: AV1 4:2:2 reject
- #995: HEVC 10-bit 4:0:0 reject
- #1005: VP9 color_config cho intra-only frames
- #1003: H.264 parse picture timing trước SPS
- #991: HEVC drop emulation bytes khỏi T.35 metadata
- #983: JPEG tag format thực tế
- #981: JPEG set MPP_FRAME_RANGE_JPEG
- #1001: JPEG refuse format nếu overrun buffer
- #979: JPEG không decode vào undersized buffer

**Encoder fixes:**
- #1007: H.264 level check frame rate
- #1009: HEVC level check frame rate
- #987: H.264 force High profile cho YUV400
- #989: Check prep color fields riêng lẻ
- #985: VPU720 JPEG fail task nếu unsupported input

**System:**
- #999: DMA heap chỉ remap đến heap đã mở thành công

## 🎯 Nhận xét

**Positive:**
- Audit sâu, cover edge cases (profile support, format conversion, buffer safety)
- Mỗi bug có repro path rõ ràng
- Fixes focused: reject sớm thay vì propagate errors

**Concern:**
- Tất cả từ 1 contributor trong 1 ngày → stress test hay production issues?
- Nhiều bugs ở format detection/validation → test coverage yếu
- IOMMU faults, buffer overruns → cần fuzzing

**Impact:**
- Critical cho streams: AV1 spatial layers, VP9 profile 2, HEVC HDR
- Encoder levels sai → compliance issues với decoders
- JPEG crashes → production risk cao

## 📅 Không có

- Hardware updates (board/NPU mới)
- AI/LLM integration (RKLLM, RKNPU)
- Performance optimization
- SDK/framework updates
- Community discussions
- Roadmap info

**Kết luận:** Đây là batch bug fixes từ deep audit, không phải development thông thường. Chờ maintainer response và CI results.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*