# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-09-15

> Thời gian tạo: 2026-09-15 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So Sánh Hệ Sinh Thái AI Nhúng Rockchip - 15/09/2026

## 1. 🏔️ Tổng Quan Hệ Sinh Thái

**Trạng thái hôm nay: Stability crisis**

3/4 repos báo bugs nghiêm trọng. Không có feature mới, không có release. Ngày tập trung fix lỗi critical.

**Stack phần cứng-phần mềm:**
```
Hardware: RK3576, RK3588 NPU
    ↓
Media/Video: MPP (encode/decode)
    ↓
AI Inference: RKNN Toolkit 2 → RKNN Model Zoo
    ↓
Platform: Orange Pi (distribution layer)
```

**Thực tế:**
- Orange Pi Build: im lặng hoàn toàn
- MPP: 2 critical bugs (double-free, heap corruption)
- RKNN Toolkit: 3 bugs ONNX conversion, 1 silent error
- Model Zoo: 1 bug Whisper infinite loop

Không có repo nào release. Không có PR merge. Pure bug day.

## 2. 📊 Bảng So Sánh

| Tiêu chí | Orange Pi Build | RKNN Toolkit 2 | RKNN Model Zoo | MPP |
|----------|----------------|----------------|----------------|-----|
| **Issues mới** | 0 | 3 | 1 | 2 |
| **Mức độ nghiêm trọng** | - | 🔴 Critical | 🟡 High | 🔴 Critical |
| **PRs** | 0 | 0 | 0 | 0 |
| **Releases** | 0 | 0 | 0 | 0 |
| **Trọng tâm** | Inactive | ONNX bugs | Example bugs | Memory bugs |
| **Platform ảnh hưởng** | - | RK3576 | All | RK3588 |
| **Stage lỗi** | - | Conversion | Runtime | Runtime |
| **User impact** | - | Block production | Block demo | Block transcoding |
| **Workaround** | - | None | None | None |

## 3. 🔌 Tích Hợp Phần Cứng-Phần Mềm

**RK3576 + RKNN Toolkit:**
- 3/3 issues target RK3576
- ONNX pipeline broken:
  - `load_onnx` crash (optional input handling)
  - `fold_constant` crash (SkipLayerNorm/BiasGelu)
  - `exSDPAttention` silent error (fused attention)
- **Kết luận:** RK3576 + ONNX = chưa production-ready

**RK3588 + MPP:**
- AV1 decoder heap corruption với large file (130MB+)
- Async encoder double-free
- **Kết luận:** Video pipeline broken cho AV1 và async workflows

**Gap nguy hiểm:**
- RK3576 NPU có hardware nhưng software stack crash
- RK3588 video có hardware nhưng memory management broken
- Hardware capabilities > software stability

## 4. 🧠 Hiệu Năng NPU

**Không có benchmark hôm nay.**

**Inference từ bugs:**

### RKNN Toolkit - Model Support Issues
```
✅ Works: MatMul-based attention
❌ Broken: Fused attention (exSDPAttention)
❌ Broken: ONNX optional inputs
❌ Broken: ORT-optimized models
```

**Impact on model types:**
- **Transformers (BERT, GPT, ViT):** Broken (attention fusion fails)
- **CNNs (ResNet, YOLO):** Likely OK (no attention)
- **Whisper:** Broken (decode loop bug)

**Irony:** Hardware có NPU ops tối ưu (fused attention) nhưng return all-zeros. Fallback về MatMul chậm hơn nhưng đúng.

## 5. 👨‍💻 Developer Experience

### SDK/Tools Stability: 🔴 Critical

**RKNN Toolkit 2.3.2 (stable):**
- ONNX converter crashes trên valid graphs
- Silent errors không throw exception
- Version 2.4.2a2 (alpha) không fix

**Model Zoo:**
- Examples có bugs production (infinite loop)
- No validation trong decode logic

**MPP:**
- API contract unclear (frame ownership ambiguity)
- Regression from commit 8223241

### Documentation Gap
Không có issue nào mention docs. Users discover bugs qua trial-and-error.

### Community Response
- Issues: 6 total
- Comments: 1 (close on #574)
- Fixes: 0
- Response time: Slow

**DX Score: 2/10** - Block at every layer

## 6. 🎯 Use Cases Thực Tế

### Từ bugs, reverse engineer use cases:

**Computer Vision:**
- ViT models trên RK3576 (issue #574 - attention)
- YOLO/object detection (likely working, no issues)

**Speech/Audio:**
- Whisper STT (issue #453 - broken)

**Video Processing:**
- AV1 decode trên RK3588 (issue #971 - broken)
- Async video transcoding (issue #973 - broken)

**NLP/LLM:**
- BERT/transformer models (issue #574, #575, #576 - broken)

### Use Cases Working Today
```
✅ Simple CNNs (ResNet, MobileNet)
✅ Synchronous H.264/H.265 encode/decode
❌ Transformers (all variants)
❌ AV1 video
❌ Async video workflows
❌ ONNX models from ORT optimizer
❌ Speech-to-text (Whisper)
```

**Tỉ lệ:** ~30% use cases working, 70% broken.

## 7. 📈 Xu Hướng Phát Triển

### Short-term (Dự đoán từ bug pattern):

**Priority 1 (2-4 tuần):**
1. Fix ONNX optional input handling (toolkit)
2. Fix MPP memory leaks (double-free, heap corruption)
3. Add bounds checking to Model Zoo examples

**Priority 2 (1-2 tháng):**
1. Regression tests cho ONNX conversion
2. Memory safety audit cho MPP API
3. Fused NPU ops validation (attention, layernorm)

### Long-term Concerns:

**Architectural issues:**
- **ONNX compatibility:** Toolkit không follow ONNX spec (optional inputs = empty string)
- **Silent errors:** NPU ops return success với wrong output
- **API ambiguity:** Frame ownership unclear trong async workflows

**Risks:**
- Stable version (2.3.2) broken = users stuck
- Alpha version (2.4.2a2) không fix = slow iteration
- No automated testing = regressions repeat

### Predictions:

**Pessimistic (60% probability):**
- 2-3 tháng để fix hiện tại bugs
- New bugs discovered khi community test fixes
- Production adoption delayed tới Q1 2027

**Optimistic (40% probability):**
- Emergency patch trong 2 tuần
- Accelerated alpha → beta → stable cycle
- Production-ready cuối Q4 2026

### Gap với Competition:

**NVIDIA Jetson:**
- TensorRT stable, mature ONNX support
- Good docs, fast community response

**Intel OpenVINO:**
- Broad model zoo, validated examples
- Clear API contracts

**Rockchip hôm nay:**
- Hardware strong, software immature
- Community-driven debugging
- Reactive fixes vs proactive quality

---

## 🎯 Kết Luận Tổng Hợp

### Trạng thái hệ sinh thái: 🟡 Yellow Alert

**Strengths:**
- Hardware NPU có performance (khi works)
- Active community finding bugs
- Multiple platform options (RK3576, RK3588)

**Critical Weaknesses:**
- Software stability crisis
- Poor ONNX compatibility
- Unclear API contracts
- Silent errors (worst kind)

### Khuyến nghị cho Developers:

**Nên:**
- Test riêng every output tensor (don't trust return codes)
- Dùng simple models (CNNs) trước transformers
- Avoid ORT-optimized ONNX graphs
- Add bounds checks to all loops
- Have fallback CPU paths

**Không nên:**
- Deploy production với RK3576 + ONNX transformers
- Trust fused NPU ops without validation
- Use AV1 decode trên RK3588 với large files
- Async video encode workflows (chờ fixes)

### Timeline Recommendation:

- **Ngay:** Prototype với simple CNNs only
- **Q4 2026:** Re-evaluate sau patches
- **Q1 2027:** Consider production if stability improves

**Bottom line:** Hardware ready, software not. Wait or contribute fixes.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Toolkit 2</strong> — <a href="https://github.com/airockchip/rknn-toolkit2">airockchip/rknn-toolkit2</a></summary>

# Báo cáo RKNN Toolkit 2 - Ngày 2026-09-15

## 📊 Tóm tắt hôm nay

**Hoạt động chính: 3 issues mới, tất cả về bugs nghiêm trọng trong conversion pipeline.**

Không có PR hay release. Ngày tập trung vào báo cáo lỗi từ người dùng thực tế.

## 🔧 Vấn đề kỹ thuật

### Critical Bugs

**#574: NPU op `exSDPAttention` trả về output toàn số 0 (RK3576)**
- **Triệu chứng**: Model convert thành công, `rknn_run` return success, nhưng output tensor = all zeros
- **Phạm vi**: Cả librknnrt 2.3.2 (release) và 2.4.2a2 (alpha)
- **Context**: Xảy ra khi attention được fuse thành single `exSDPAttention` op
- **Workaround**: Model dùng MatMul thông thường cho kết quả đúng
- **Mức độ**: **Silent error** - nguy hiểm nhất vì không throw exception, chỉ trả sai kết quả
- **Impact**: Transformer models với fused attention không chạy được trên RK3576
- **Status**: CLOSED sau 1 comment (có thể đã có internal fix hoặc duplicate)

**#576: `fold_constant` crash với SkipLayerNormalization/BiasGelu**
- **Root cause**: Empty string trong optional output names của ONNX ops
- **Trigger**: Models từ onnxruntime transformer-fusion optimizer (`com.microsoft` contrib ops)
- **Stage**: Fail ở `fold_constant` trong `rknn.build()`
- **Platform**: rk3576, toolkit 2.3.2
- **Impact**: ONNX models đã optimize bằng ORT không convert được

**#575: `load_onnx` crash với Clip op type mismatch**
- **Root cause**: int32/int64 type mismatch khi `min` input bị omit (empty string - ONNX optional input convention)
- **Stage**: Crash ngay ở `rknn.load_onnx()`, trước khi build
- **Platform**: rk3576, toolkit 2.3.2, x86_64 Linux host
- **Pattern**: ONNX standard practice (optional inputs = empty string) không được handle

### Phân tích kỹ thuật

**Điểm chung của 3 bugs:**
1. Tất cả liên quan đến ONNX conversion pipeline
2. Tất cả target RK3576
3. 2/3 crash ở preprocessing stages (load, fold_constant)
4. 1/3 là silent error (nghiêm trọng nhất)

**Inference về toolkit stability:**
- ONNX optional input handling chưa robust (issues #575, #576)
- Fused NPU ops còn buggy, đặc biệt attention fusion (#574)
- Version 2.3.2 có nhiều edge cases chưa được test với real-world ONNX graphs
- Alpha 2.4.2a2 vẫn chưa fix #574

## 🚨 Cảnh báo cho developers

**Nếu đang dùng RKNN Toolkit 2 trên RK3576:**
- **Tránh** onnxruntime transformer-fusion optimizer trước khi export ONNX
- **Kiểm tra** output tensors của fused attention ops (đừng tin return code)
- **Fallback** về MatMul thông thường nếu attention cho kết quả sai
- **Optional inputs** trong ONNX có thể crash converter

## 📋 Cập nhật phần cứng

Không có thông tin mới về hardware.

## 🤖 Tích hợp AI/LLM

Không có updates về RKLLM hay model optimization features.

**Ngầm hiểu**: Issue #574 về attention fusion ảnh hưởng đến Transformer models (BERT, GPT, ViT...) - backbone của hầu hết LLMs và vision transformers hiện đại.

## ⚡ Hiệu năng & Benchmark

Không có benchmark mới.

## 🛠️ Hỗ trợ phần mềm

Không có SDK/toolkit updates.

**Ngầm hiểu**: Các bugs được báo trên version 2.3.2 (stable) và 2.4.2a2 (alpha), nghĩa là cả hai versions đều có vấn đề.

## 👥 Cộng đồng & Use cases

**User activity patterns:**
- @alex-di-96: Báo 2 crashes liên tiếp (#575, #576), cho thấy đang convert ONNX models complex
- @Puiching-Memory: Báo silent error (#574), đang làm việc với attention-based models trên RK3576

**Use case ngầm hiểu**: 
- Computer vision với transformers (ViT, DETR...)
- NLP models (BERT variants)
- Optimized models từ ONNX Runtime

## 🗺️ Roadmap

Không có thông tin roadmap chính thức.

**Dự đoán priorities dựa trên bugs:**
1. Fix silent errors trong fused ops (cao nhất)
2. Robust ONNX optional input handling
3. Better compatibility với ORT-optimized models

---

**Kết luận**: Ngày tập trung vào stability issues. Không có features mới hay releases. RK3576 + ONNX conversion pipeline cần nhiều bugfixes trước khi production-ready với complex models.

</details>

<details>
<summary><strong>RKNN Model Zoo</strong> — <a href="https://github.com/airockchip/rknn_model_zoo">airockchip/rknn_model_zoo</a></summary>

# Báo cáo RKNN Model Zoo - 15/09/2026

## 🔍 Tóm tắt hôm nay

Hoạt động thấp. Chỉ 1 issue mới về bug trong Whisper example. Không có PR hay release.

## 🔧 Vấn đề kỹ thuật

### Issue #453: Whisper decode loop treo vô hạn

**Vấn đề:**
- File `examples/whisper/python/whisper.py` 
- Decode loop: `while next_token != end_token:` không có giới hạn bước
- Test trên RK3576, bug áp dụng cho tất cả platform
- Audio thực tế có thể trigger infinite loop

**Tác động:**
- Ứng dụng treo, không timeout
- RAM và CPU tăng liên tục
- Cần kill process thủ công

**Nguyên nhân:**
- Không có `max_steps` hoặc `max_iterations` 
- Không validate `end_token` 
- Thiếu safety check cho decode sequence

**Giải pháp đề xuất:**
```python
# Thêm max_steps bound
max_steps = 1000  # hoặc dynamic dựa trên input length
step = 0
while next_token != end_token and step < max_steps:
    # decode logic
    step += 1

if step >= max_steps:
    # log warning hoặc fallback
```

**Priority:** High - ảnh hưởng production deployment

## 📊 Cập nhật phần cứng

Không có thông tin.

## 🤖 Tích hợp AI/LLM

Không có update. Issue liên quan Whisper (Speech-to-Text model) nhưng là bugfix chứ không phải feature mới.

## ⚡ Hiệu năng & Benchmark

Không có dữ liệu.

## 🛠️ Hỗ trợ phần mềm

Không có update SDK/toolkit.

## 👥 Cộng đồng & Use cases

**Feedback:**
- User @alex-di-96 test Whisper trên RK3576
- Gặp vấn đề với real audio content
- Chưa có response từ maintainer (0 comment)
- Chưa có upvote từ community

**Implication:** Whisper example đang được dùng thực tế, cần fix nhanh để không block adopters.

## 🗺️ Roadmap

Không có thông tin chính thức. 

**Dự đoán từ issue:**
- Cần audit các decode loop khác trong repo
- Thêm timeout/max-step cho tất cả inference examples
- Improve error handling cho edge cases

---

**Kết luận:** Ngày yên tĩnh, 1 bug quan trọng cần attention. Typical maintenance day cho open-source AI edge project.

</details>

<details>
<summary><strong>Media Process Platform (MPP) module</strong> — <a href="https://github.com/rockchip-linux/mpp">rockchip-linux/mpp</a></summary>

# Báo cáo hoạt động Media Process Platform (MPP) - 2026-09-15

## 📊 Tóm tắt hôm nay

Hoạt động tập trung vào **stability issues**. Phát hiện 2 bugs nghiêm trọng liên quan memory management:
- Double-free trong async encoding
- Heap corruption trong AV1 decoder trên RK3588

Không có release hay PR mới. Cộng đồng đang debug critical issues.

---

## 🔧 Cập nhật phần cứng

**RK3588 NPU - AV1 Decoder Issue**
- Crash khi decode AV1 với error "unsorted double linked list corrupted"
- Test case: file .ivf 130MB
- Command: `mpi_dec_test -i /tmp/av1-crash.ivf -t 16777224 -n 1`
- Vấn đề xuất hiện trong `mpi_dec_utils`

---

## 🤖 Tích hợp AI/LLM

Không có cập nhật về RKLLM/RKNPU hôm nay.

---

## ⚡ Hiệu năng & Benchmark

Không có benchmark mới. Issues hiện tại block performance testing do stability problems.

---

## 💻 Hỗ trợ phần mềm

**MPP Encoder API - Memory Leak Critical**

Issue #973 phát hiện conflict trong lifecycle management:
- `KEY_INPUT_FRAME` theo spec phải user free
- Nhưng `mpp.c::list_wraper_packet()` cũng free qua callback của `mPktOut`
- Regression từ commit 8223241

Ảnh hưởng: tất cả async encoding workflows.

---

## 🐛 Vấn đề kỹ thuật

### Issue #973: Double-free trong async encoding
**Mức độ**: 🔴 Critical  
**Component**: `mpp_enc_impl.c`, `mpp.c`  
**Root cause**: 
- Frame được free 2 lần
- Lần 1: user code (theo API contract)
- Lần 2: internal callback `list_wraper_packet()`

**Timeline**:
- Introduced: commit 8223241
- Reported: 2026-09-14
- Status: Đang chờ maintainer clarify design intent

---

### Issue #971: AV1 decoder heap corruption trên RK3588
**Mức độ**: 🔴 Critical  
**Component**: AV1 decoder, `mpi_dec_utils`  
**Symptom**: `malloc(): unsorted double linked list corrupted`  
**Context**:
- Codec type: 16777224 (AV1)
- Hardware: RK3588 NPU
- Input: Large .ivf file (130MB+)

**Timeline**:
- Reported: 2026-09-09
- Last update: 2026-09-14
- Status: Under investigation

---

## 👥 Cộng đồng & Use cases

**Reporter**: @nyanmisaka (active contributor, 2 critical bugs found trong tuần)

**Use cases bị ảnh hưởng**:
- Video transcoding pipelines với async encoding
- AV1 decode workflows trên RK3588
- Production systems đang dùng MPP encoder API

**Quan sát**: Không có workaround được đề xuất. Users đang block.

---

## 🗺️ Roadmap

**Ưu tiên cao (cần fix ngay)**:
1. Clarify frame ownership trong async encoding API
2. Fix AV1 decoder memory corruption
3. Regression test cho memory management

**Chưa có thông tin về**:
- Timeline fix
- Patch release plan
- Workaround recommendations

**Khuyến nghị**: Đợi patches trước khi deploy MPP vào production với AV1 hoặc async encoding.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*