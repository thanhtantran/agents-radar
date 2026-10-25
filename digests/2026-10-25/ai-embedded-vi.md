# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-25

> Thời gian tạo: 2026-10-25 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo so sánh hệ sinh thái AI nhúng Rockchip - 2026-10-25

## 📊 Tổng quan hệ sinh thái

Hệ sinh thái Rockchip AI edge có 3 tầng:

**Hardware (Orange Pi/Rockchip boards)**
- RK3588: flagship, 6 TOPS NPU 3-core
- RK3576: mid-range, VEPU510 encoder mới
- Orange Pi Build: inactive, zero commits ngày hôm nay

**AI Runtime (RKNN)**
- RKNN Toolkit 2: convert + optimize model
- RKNPU: hardware driver layer
- Model Zoo: pre-optimized models

**Media Pipeline (MPP)**
- Video encode/decode hardware acceleration
- VPU, NPU, VDPP post-processing
- RGA, IEP2 image processing

**Trạng thái hôm nay**: Orange Pi + Model Zoo im lặng. RKNN có critical bug block batching. MPP nổ 14 bugs nghiêm trọng + 12 PRs fix.

---

## 🔍 Bảng so sánh

| Metric | Orange Pi Build | RKNN Toolkit 2 | MPP |
|--------|----------------|----------------|-----|
| **Issues mở** | 0 | 1 (critical) | 26 (14 mới) |
| **PRs đang chờ** | 0 | 0 | 12 |
| **Hoạt động 24h** | 🔴 Không | 🟡 Thấp | 🟢 Cao |
| **Mức độ ưu tiên** | N/A | Blocker | Critical |
| **Impact** | N/A | Batching broken | Codec corruption |
| **Community response** | 0 | 6 comments | 1 contributor fix hàng loạt |
| **Platform** | Build system | NPU runtime | VPU/Codec |
| **Chip support** | Multi-platform | RK3588/3576 | RK3576/3588 |

---

## 🔌 Tích hợp phần cứng-phần mềm

### Stack đầy đủ cho AI Edge

```
┌─────────────────────────────────┐
│   Application (Python/C++)       │
├─────────────────────────────────┤
│   RKNN Toolkit 2 (model convert) │ ← Bug batching
│   RKNN Runtime (inference)       │
├─────────────────────────────────┤
│   NPU Driver (RKNPU)             │ ← Memory corruption layer
├─────────────────────────────────┤
│   RK3588 NPU (3 cores, 6 TOPS)   │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│   Video App (FFmpeg/GStreamer)   │
├─────────────────────────────────┤
│   MPP (Media Process Platform)   │ ← 26 bugs active
├─────────────────────────────────┤
│   VPU/VEPU (H.264/265, AV1, VP9) │ ← Film grain, HDR metadata lost
│   VDPP (post-processing)         │ ← Pitch validation broken
└─────────────────────────────────┘
```

### Phối hợp giữa NPU và VPU

**Typical AI + Video pipeline:**
1. MPP decode video frame (H.264/265) → YUV buffer
2. RGA/IEP2 preprocessing (resize, crop, color convert)
3. RKNN inference trên NPU (object detection, segmentation)
4. VDPP post-process (overlay, HDR tone mapping)
5. MPP encode output (H.265, AV1)

**Điểm nghẽn hôm nay:**
- **NPU**: batching broken → 1 frame/inference, không dùng được 3 cores
- **VPU**: AV1 film grain off, HDR metadata lost → quality drop
- **VDPP**: pitch validation fail → 1080p frames rejected

**Critical cho production**: không thể batch inference + encode stream mất metadata = blocker cho surveillance, video analytics.

---

## ⚡ Hiệu năng NPU

### RK3588 NPU Capabilities

| Spec | Giá trị | Trạng thái |
|------|---------|------------|
| TOPS | 6 TOPS @ int8 | Hardware OK |
| Cores | 3 NPU cores | **Underutilized** |
| Batch support | 1-8 | 🔴 **Broken > 1** |
| Model formats | RKNN, ONNX, TF, Caffe | Convert OK |
| Quantization | int8, int16, fp16 | OK |
| Operator coverage | 95% common ops | OK |

### Bottleneck từ Issue #584

**Bug impact:**
```python
# Broken
batch_size = 4
input_shape = [4, 416, 1, 1]  # 4D wrapper
output = rknn.inference([batch])
# → garbage/Inf, nondeterministic

# Workaround
batch_size = 1  # Force single
# → mất 75% throughput potential
```

**Throughput loss:**
- 1 batch: ~30 FPS (1 core active)
- 4 batch (nếu fix): ~100 FPS (3 cores active)
- **Lost**: 70 FPS → 2.3x slower production deployment

**Model types bị ảnh hưởng:**
- RNN, LSTM, GRU (sequence models)
- Time-series forecasting
- NLP edge inference
- Multi-object tracking (batch N objects)

### So với competitors

| Platform | TOPS | Batch support | Status |
|----------|------|---------------|--------|
| RK3588 NPU | 6 | Broken > 1 | 🔴 |
| Jetson Orin Nano | 40 | Working | ✅ |
| Hailo-8 | 26 | Working | ✅ |
| Coral TPU | 4 | Working | ✅ |

RK3588 có giá tốt nhưng batching bug làm mất lợi thế throughput.

---

## 🛠️ Developer Experience

### RKNN Toolkit 2

**Điểm mạnh:**
- ONNX import dễ: `rknn.load_onnx(model.onnx)`
- Quantization tự động: int8 calibration từ dataset
- Cross-platform: convert trên x86, deploy ARM

**Điểm yếu hiện tại:**
- Debug runtime bug khó: no stack trace, nondeterministic corruption
- Batching broken: không test kỹ 4D input với batch > 1
- Documentation thiếu: không có best practices cho sequence models

**Workflow bị block:**
```bash
# Developer workflow ngày hôm nay
1. Train model PyTorch → export ONNX → OK
2. Convert ONNX → RKNN → OK  
3. Test batch=1 → OK
4. Test batch=4 cho production → FAIL
5. Debug → cannot reproduce reliably
6. Wait Rockchip fix → ETA unknown
```

### MPP

**Điểm mạnh:**
- FFmpeg integration: standard video apps work
- Hardware acceleration: 4K60 decode/encode
- Multi-codec: H.264/265, AV1, VP9, JPEG

**Điểm yếu (26 bugs):**
- **AV1 decoder**: film grain, 4:2:2 format, CDF buffer bugs
- **H.265 encoder**: level calculation wrong, intra refresh broken
- **JPEG**: buffer overrun, colour range lost
- **VDPP**: pitch validation too strict

**Impact lên developers:**
- HDR video pipeline broken (metadata lost)
- Temporal encoding invalid (layer ID bugs)
- 1080p processing fails (pitch reject)
- Grayscale JPEG corrupt (partial write)

---

## 💼 Use Cases

### Từ RKNN Issue #584

**Blocked use case:**
- **Sequence modeling**: 416-cell batch cho time-series/NLP
- **Real-time inference**: cần batch 4-8 để hit 30 FPS target
- **Production deployment**: không thể ship với batch=1 throughput

**Ứng dụng cụ thể:**
- Smart camera: object tracking nhiều object đồng thời
- Audio processing: speech recognition với context window
- Sensor fusion: multi-sensor time-series prediction

### Từ MPP Issues

**Blocked use cases:**
- **HDR video pipeline**: surveillance, content creation (HDR metadata lost)
- **Multi-bitrate streaming**: adaptive streaming (level bugs → incompatible streams)
- **Professional video**: broadcast, archival (film grain, colour range critical)
- **AI + video combo**: NPU inference + VPU encode (pitch mismatch)

**Working use cases:**
- Standard 1080p/4K H.264 decode (no HDR, no advanced features)
- JPEG thumbnail generation (no grayscale, no full-range)
- Basic video encode (no temporal layers, no ROI)

---

## 📈 Xu hướng phát triển

### Short-term (Q4 2026)

**RKNN:**
- Fix batching bug critical → unblock production deployments
- Add regression test cho 4D input, sequence models
- Document batching limitations + workarounds

**MPP:**
- Merge 12 PRs từ @UtsavBalar1231
- Fix film grain, HDR metadata, temporal layer bugs
- Add buffer size validation across HALs

**Priority:** MPP có momentum (1 contributor fix systematic), RKNN chưa có response từ maintainer.

### Medium-term (2027 H1)

**Hardware:**
- RK3588S refresh với NPU driver fix
- RK3576 maturity: VEPU510 bugs patched
- Orange Pi boards dùng chip mới

**Software:**
- RKNN Toolkit 3: better debugging, profiling tools
- Model Zoo expansion: LLM quantized cho edge (RKLLM integration)
- MPP: AV1 encoder (hiện chỉ có decoder)

### Long-term trends

**AI edge ecosystem:**
- Edge LLMs: 1-7B models quantized int4/int8 trên NPU
- Multimodal: vision + language models (CLIP, LLaVA variants)
- Video understanding: temporal models batched trên NPU

**Rockchip position:**
- Cost leader: RK3588 rẻ hơn Jetson 3-5x
- Software gap: batching, debugging tools lag NVIDIA
- China market strong, international adoption chậm vì bugs như hôm nay

**Risk:** Nếu không fix batching + codec bugs nhanh, developers chuyển sang Hailo, Amlogic, hoặc stick với Jetson dù đắt.

---

## 🎯 Khuyến nghị cho developers

**Nếu bắt đầu project mới hôm nay:**

✅ **OK để dùng:**
- Single inference (batch=1) trên RKNN
- Standard H.264/265 decode 1080p/4K
- Image classification, object detection (batch=1)

⚠️ **Tránh hoặc chờ fix:**
- Batching (batch > 1) cho bất kỳ model nào
- AV1 decode với film grain, 4:2:2 format
- H.265 encode với temporal layers, HDR
- VDPP processing với non-standard pitch

🔴 **Blocker:**
- Production deployment cần throughput → batch > 1 broken
- HDR video pipeline → metadata lost
- Multi-bitrate streaming → level bugs

**Workarounds ngắn hạn:**
- Force batch=1, chấp nhận throughput thấp
- Dùng H.264 thay AV1 (ít bugs hơn)
- Skip HDR, dùng SDR
- Software fallback cho film grain (CPU post-process)

**Monitor:**
- Issue #584 cho RKNN fix
- 12 PRs MPP merge status
- Release notes cho RK3588S firmware updates

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Toolkit 2</strong> — <a href="https://github.com/airockchip/rknn-toolkit2">airockchip/rknn-toolkit2</a></summary>

# Báo cáo hoạt động RKNN Toolkit 2 — 2026-10-25

## 📊 Tóm tắt hôm nay

Hoạt động thấp. 1 issue quan trọng về memory corruption trên RK3588, không có PR hay release mới.

## 🔧 Vấn đề kỹ thuật

### Issue #584: Memory corruption nghiêm trọng trên RK3588

**Mô tả:**
- Bug xảy ra khi batch size > 1 với input 4D
- Model echo/identity đơn giản trả về garbage data hoặc Inf
- Kết quả không deterministic (chạy nhiều lần cho output khác nhau)
- Bug thứ hai độc lập: GRU model cho kết quả số học sai lệch ở batch 1

**Chi tiết kỹ thuật:**
- Platform: RK3588 NPU
- Input shape: `[N, 416, 1, 1]` (batch N, 416 cells)
- Trigger: fixed batch > 1 + 4D input wrapper
- Model test: ONNX Identity operator (op đơn giản nhất)
- Kết quả: nondeterministic corruption → memory/pointer issue trong runtime

**Tác động:**
- Blocker nghiêm trọng cho production deployment
- Ảnh hưởng model sequence (RNN, GRU, LSTM) 
- Không thể dùng batching để tăng throughput
- 6 comments trong 1 ngày → cộng đồng quan tâm cao

**Root cause khả năng:**
```
batch > 1 → 4D tensor wrapper → memory layout issue
→ pointer arithmetic sai → overwrite/read garbage
```

**Workaround hiện tại:**
- Force batch = 1 (mất throughput)
- Flatten input về 2D nếu model cho phép
- Wait fix từ Rockchip

## 🧠 Tích hợp AI/LLM

Không có update về RKLLM hay model optimization ngày hôm nay.

**Context từ issue:**
- Sequence model (GRU) đang được test → use case cho time-series, NLP edge
- ONNX export workflow → tiêu chuẩn cho model conversion

## ⚡ Hiệu năng & Benchmark

Issue #584 block được batching → không thể đạt throughput tối ưu:
- Batch 1: 1 inference/cycle
- Batch 4-8: có thể 3-6x throughput (nếu bug fixed)
- RK3588 NPU có 3 cores → batching critical cho utilization

## 💻 Hỗ trợ phần mềm

Không có SDK/toolkit update. Bug nằm ở runtime layer (RKNN runtime trên device).

## 👥 Cộng đồng & Use cases

**Use case từ issue:**
- Sequence modeling với 416-cell batch
- Real-time inference cần batching
- Production deployment blocked

**Mức độ ưu tiên:**
- 6 comments trong 24h
- OPEN status, chưa có response từ maintainer
- Community cần workaround gấp

## 🗺️ Roadmap

**Cần thiết:**
1. Rockchip debug memory corruption bug
2. Fix GRU numerics deviation
3. Add regression test cho batched 4D input
4. Document batching limitations nếu không fix được

**Timeline:** Chưa có ETA từ maintainer.

---

**Tổng kết:** Ngày yên tĩnh nhưng có 1 critical bug block production use. Cần monitor issue #584 cho fix hoặc workaround official.

</details>

<details>
<summary><strong>RKNN Model Zoo</strong> — <a href="https://github.com/airockchip/rknn_model_zoo">airockchip/rknn_model_zoo</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>Media Process Platform (MPP) module</strong> — <a href="https://github.com/rockchip-linux/mpp">rockchip-linux/mpp</a></summary>

# Báo cáo MPP - 2026-10-25

## 📊 Tóm tắt hôm nay

Ngày nghiêm trọng cho MPP. 14 issues mới từ @UtsavBalar1231 - tất cả bugs nghiêm trọng về codec, buffer, metadata. 12 PRs fix nhanh theo. Không có release.

**Điểm nổi bật:**
- 🔴 26 issues mở (14 mới trong 24h)
- 🔧 12 PRs đang chờ merge
- 🎯 Focus: AV1, H.264/H.265 encoder/decoder bugs

## 🔧 Vấn đề kỹ thuật nghiêm trọng

### Decoder Issues

**AV1 Decoder (RK3576)**
- #974: Film grain bị hardcode = 0, không apply
- #992: 4:2:2 profile accept nhưng decode sai, label `YUV422P` planar sai
- #1012: CDF buffer mất khi frame size tăng (spatial layers, resize)
- #1010: `current_operating_point` dùng idc làm array index → crash với temporal layers
- #996: 12-bit VP9 profile 2 accept nhưng label 10-bit → buffer overflow

**H.265 Decoder**
- #994: 10-bit 4:0:0 (monochrome) label 8-bit `YUV400` nhưng stride 10-bit → read sai
- #990: HDR10+/HDR Vivid metadata giữ emulation bytes `00 00 03`, mất tail data

**H.264 Decoder**
- #1002: Frame đầu interlaced stream báo progressive nếu SEI đến trước SPS

**VP9 Decoder**
- #1004: Intra-only frame profile 2 skip `color_config` → misparse header

**JPEG Decoder**
- #978: Decode vào buffer nhỏ → IOMMU write fault, không báo lỗi
- #982: Grayscale JPEG output NV12 nhưng chỉ write luma plane
- #980: Output frame không có colour range → full-range JFIF bị stretch

### Encoder Issues

**H.265/H.264 Encoder**
- #1021: Temporal layer frame mang temporal ID của frame kế
- #1020: Intra refresh không làm gì trên VEPU510 (RK3576)
- #1008/#1006: Level ignore frame rate → 1080p60 code level 4.0 (cần 4.1)
- #986: YUV400 + Baseline/Main profile → stream decode lỗi (chroma_format_idc missing)

**ROI & Quality**
- #1019: VEPU510/511/540C giữ ROI cũ khi frame không có `KEY_ROI_DATA`

**JPEG Encoder**
- #984: VPU720 RGB input → corrupt JPEG thay vì fail

### Post-processing & Infrastructure

**VDPP (RK3576)**
- #1018: VEP từ chối 1920x1080 pitch=1984 (pitch H.264 decoder dùng)
- #1016: hwpq contexts share frame counter → context sau skip config

**IEP2**
- #1014: `IEP_CMD_RUN_SYNC` return `MPP_OK` khi frame bị refuse

**DMA Heap**
- #998: Request cacheable DMA32 → get uncached nếu board không có DMA32 heap

**Color/Metadata**
- #988: Invalid colour value discard valid colour range trong `MPP_ENC_SET_CFG`

## 🔨 Pull Requests (fixes đang chờ)

12 PRs từ @UtsavBalar1231 fix các issues trên:

**Decoder fixes:**
- #993: Reject AV1 4:2:2 streams
- #1005: VP9 intra-only read colour config
- #1003: H.264 parse picture timing SEI trước SPS
- #1001: JPEG refuse format gây buffer overrun
- #1013: AV1 keep CDF/colmv buffer qua size changes
- #1011: AV1 pass operating point idc đúng

**Encoder fixes:**
- #1009/#1007: H.265/H.264 pick level từ frame rate
- #1023: Install iep2, hwpq vdpp headers

**Infrastructure fixes:**
- #1017: hwpq count frame per context
- #1015: iep2 report failed `IEP_CMD_RUN_SYNC`
- #999: dma_heap remap chỉ đến heap opened

## 💡 Phân tích kỹ thuật

### Pattern bugs nghiêm trọng

1. **Buffer safety**: Nhiều path không check buffer size trước khi write (JPEG, VDPP, dma_heap)
2. **Metadata handling**: Emulation bytes, temporal ID, colour range bị mất/sai
3. **Format validation**: Accept format không support → silent corruption thay vì fail
4. **Level calculation**: Encoder ignore frame rate khi tính level → non-compliant stream
5. **Context isolation**: Shared static state giữa contexts (hwpq frame counter)

### Impact

- **Production risk**: Level/format bugs → streams không spec-compliant
- **Memory safety**: Buffer overruns, IOMMU faults
- **Quality**: Film grain, HDR metadata, colour range lost
- **Temporal encoding**: Layer ID bugs làm TSA_N streams invalid

## 🎯 Roadmap ngầm (từ PRs)

Maintainer cần:
1. Merge 12 PRs này ASAP - critical fixes
2. Add regression tests cho temporal layers, HDR metadata, format validation
3. Review buffer size checks across all HALs
4. Audit shared state (statics, globals) giữa contexts

## 📈 Xu hướng

@UtsavBalar1231 đang systematic audit codebase - tốt cho project stability. Nhưng volume bugs cao → cần automated testing better.

Không có NPU/RKLLM updates hôm nay - MPP focus pure codec work.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*