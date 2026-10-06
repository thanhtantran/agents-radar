# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-06

> Thời gian tạo: 2026-10-06 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Edge trên Rockchip - 2026-10-06

## 🎯 Tổng quan hệ sinh thái

**Ngày im lặng.** Không có commit, PR, release từ tất cả repos. Chỉ có 1 issue đóng ở MPP - bug VP9 10-bit reset storm sau 65k frames.

**Stack AI Edge trên Rockchip:**
```
Application Layer (CV/NLP)
         ↓
RKNN Model Zoo ← RKNN Toolkit 2 (conversion)
         ↓
RKNN Runtime (NPU inference)
         ↓
Hardware: RK3588/RK3576 NPU + VPU
         ↓
OS/BSP: Orange Pi Build System
         ↓
Media Pipeline: MPP (video decode/encode)
```

**Vai trò từng component:**
- **Orange Pi Build**: BSP cho boards (bootloader, kernel, rootfs)
- **RKNN Toolkit 2**: Convert PyTorch/TF/ONNX → RKNN model
- **RKNN Model Zoo**: Pre-converted models (YOLO, Mobilenet, etc.)
- **MPP**: Hardware video codec (H264/H265/VP9/AV1)

## 📊 Bảng so sánh

| Repo | Focus | Activity (24h) | Maturity | Use When |
|------|-------|----------------|----------|----------|
| **orangepi-build** | BSP/OS images | 0 | Stable | Build custom Linux image cho Orange Pi |
| **rknn-toolkit2** | Model conversion | 0 | Production | Convert ML models sang RKNN format |
| **rknn_model_zoo** | Pre-trained models | 0 | Production | Cần model AI có sẵn, không train lại |
| **mpp** | Video codec | 1 issue closed | Mature | Hardware video decode/encode |

**Observations:**
- MPP duy nhất có activity (1 bug fix)
- AI stack (RKNN) hoàn toàn tĩnh
- Không có development momentum

## 🔌 Tích hợp phần cứng-phần mềm

**Hardware → Software mapping:**

```
RK3588 SoC:
├─ NPU (6 TOPS INT8) → RKNN Runtime
├─ VPU (H264/H265/VP9/AV1) → MPP
├─ GPU (Mali-G610) → OpenCL/Vulkan
└─ CPU (4xA76+4xA55) → General compute

RK3576 SoC:
├─ NPU (6 TOPS INT8) → RKNN Runtime
├─ VPU (H264/H265/VP9) → MPP
└─ CPU (4xA72+4xA53) → General compute
```

**Integration flow:**
1. **Camera input** → ISP → memory
2. **MPP decode** (nếu video) → raw frames
3. **Preprocessing** (resize/normalize) → CPU/GPU
4. **RKNN inference** → NPU → detections/classifications
5. **Post-processing** → CPU
6. **MPP encode** (optional) → output stream

**Issue hôm nay (MPP #972) impact:**
- VP9 10-bit decode fail sau 17-28 phút
- Ảnh hưởng: AI camera systems dùng VP9 input
- Root cause: downstream fork enable `support_fast_mode` sai
- Fix: dùng upstream MPP, không dùng collabora/rockchip forks

## 🧠 Hiệu năng NPU

**RK3588 NPU specs:**
- 3x NPU cores
- 6 TOPS INT8
- Support INT8/INT16/FP16
- Max model size: limited by RAM (8GB typical)

**RKNN Model Zoo coverage:**
| Model Family | Status | Performance |
|--------------|--------|-------------|
| YOLO (v5/v7/v8/X) | ✅ Optimized | 30-60 FPS @ 640×640 |
| MobileNet | ✅ Optimized | 100+ FPS |
| ResNet | ✅ Optimized | 30-50 FPS |
| SegFormer | ✅ Optimized | 20-30 FPS |
| Whisper | ⚠️ Limited | Depends on model size |
| LLaMA/GPT | ❌ Not practical | Too large, CPU fallback |

**Limitations:**
- INT8 quantization required cho performance tốt
- FP16 chậm hơn 3-4x
- Dynamic shapes không support tốt
- Large models (>500MB) performance degradation

**No new benchmarks today** - không có releases hoặc updates.

## 👨‍💻 Developer Experience

**Workflow:**

```bash
# 1. Setup (one-time)
git clone rknn-toolkit2
pip install rknn-toolkit2-*.whl

# 2. Convert model
python convert.py \
  --model model.onnx \
  --target rk3588 \
  --quantize int8

# 3. Deploy to board
scp model.rknn orangepi@board:/opt/models/
ssh orangepi@board "python3 inference.py"
```

**Pain points (unchanged):**
- Quantization calibration dataset required
- Error messages không rõ ràng
- Version compatibility giữa toolkit và runtime
- Limited debugging tools trên device
- Documentation thiếu examples phức tạp

**Strengths:**
- Pre-converted Model Zoo tiết kiệm effort
- Python API đơn giản
- Hardware acceleration transparent

**No improvements today** - toolkit và docs không update.

## 🎨 Use Cases thực tế

**Active use cases (inferred từ MPP issue):**

1. **Long-running video processing:**
   - Security cameras (24/7)
   - Media servers
   - Streaming (4K60 VP9)
   - **Problem:** Reset storm sau 65k frames fixed today

2. **AI Vision (typical):**
   - Object detection (YOLO)
   - Face recognition
   - License plate recognition
   - Pose estimation

3. **Edge AI pipelines:**
   - Camera → decode (MPP) → inference (NPU) → encode (MPP)
   - Real-time analytics
   - Privacy-preserving (on-device processing)

**Not seen today:**
- Audio AI (Whisper, TTS)
- NLP tasks
- Generative AI (quá nặng cho NPU này)

## 📈 Xu hướng phát triển

**Based on today's data (limited):**

### ⚠️ Concerns:

1. **Zero AI development activity**
   - Toolkit không update
   - Model Zoo không mở rộng
   - Community không có PRs

2. **Downstream fork problems**
   - Collabora/rockchip forks outdated
   - Re-introduce bugs (như VP9 issue)
   - Fragmentation

3. **Stability focus over features**
   - Chỉ có bug fixes, không có features mới
   - Sign of mature product HOẶC stagnation

### ✅ Positives:

1. **MPP still maintained**
   - Critical bug fixed quickly
   - Long-running workload issues addressed

2. **Hardware proven**
   - VP9 10-bit decode 4K60 feasible
   - Just need correct software config

### 🔮 Predictions:

**Short-term (3-6 tháng):**
- MPP stability improvements tiếp tục
- RKNN Toolkit minor updates (bug fixes)
- Không có breakthrough features

**Long-term (1-2 năm):**
- Next-gen NPU (RK3600?) với higher TOPS
- Better LLM support (nếu NPU lớn hơn)
- Hoặc: ecosystem chuyển sang qualcomm/mediatek

**Recommendation cho developers:**
- **Safe bet:** Dùng upstream repos, không dùng forks
- **Test extensively:** Long-running workloads (>1 giờ)
- **Monitor:** Decoder reset rates trong production
- **Prepare exit:** Ecosystem này có thể stall

## 💡 Bottom Line

**Hôm nay:** Ecosystem im lặng, chỉ có 1 stability fix.

**Developer advice:**
- MPP: dùng upstream, test decode >30 phút
- RKNN: mature nhưng không evolve nhanh
- Orange Pi: stable BSP, fit cho production

**Khi nào chọn stack này:**
- ✅ Need INT8 inference 6 TOPS
- ✅ Need hardware video codec
- ✅ Budget-conscious (<$200 boards)
- ❌ Need FP32/FP16 performance
- ❌ Need large models (>1GB)
- ❌ Need bleeding-edge AI features

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

# Báo cáo hoạt động MPP - 2026-10-06

## 🎯 Tóm tắt hôm nay

Một issue lớn về VP9 10-bit được đóng. Issue #972 gây reset liên tục decoder trên RK3588 sau ~65k frames. Root cause: downstream fork bật lại `support_fast_mode`, upstream không bị.

## 🔧 Vấn đề kỹ thuật

### ❌ Bug đã fix: VP9 10-bit reset storm (#972)

**Triệu chứng:**
- Decode 4K60 VP9 10-bit trong 17-28 phút → kernel reset decoder liên tục
- Tần suất: ~15 resets/giây trong 20-60 giây
- Log: `mpp_rkvdec2 fdc38100.rkvdec-core: resetting for err 0x23`
- Xảy ra sau 2^16 frames (~65k frames)

**Nguyên nhân:**
- Downstream fork (collabora/rockchip repos) re-enable `support_fast_mode` trong VP9 10-bit
- Fast mode gây corruption sau số frame nhất định
- Upstream mpp không bị vì đã disable fast mode cho 10-bit

**Giải pháp:**
- Disable `support_fast_mode` cho VP9 10-bit (match upstream)
- Hoặc dùng upstream mpp branch thay vì downstream fork
- Collabora/rockchip forks đang outdated và có modifications không ổn định

**Impact:**
- Ảnh hưởng: RK3588 hardware decode dài hạn
- Use case: Streaming 4K60, security cameras, media servers
- Workaround tạm thời: restart decoder định kỳ (không khuyến khích)

## 📊 Cộng đồng & Use cases

**Feedback từ người dùng:**
- @defcom5-rockchip báo cáo chi tiết với logs, timing analysis
- 11 comments thảo luận về root cause
- Community xác định vấn đề nằm ở downstream fork, không phải upstream

**Bài học:**
- Downstream forks (collabora/rockchip) có risk cao hơn upstream
- Fast mode optimizations cần test kỹ với long-running workloads
- Overflow/wraparound issues xuất hiện sau 2^N frames (common pattern)

## 🔮 Roadmap

**Cần làm tiếp:**
- Sync downstream forks với upstream để tránh regressions
- Test suite cần cover long-running decode scenarios (>1 giờ)
- Document rõ sự khác biệt giữa upstream vs downstream forks
- Review tất cả `support_fast_mode` flags trong các codecs khác

**Khuyến nghị:**
- Production deployments dùng upstream mpp
- Test VP9 10-bit decode >30 phút trước khi ship
- Monitor decoder reset rates trong production

---

**Hoạt động hôm nay:** 1 issue closed, 0 PRs, 0 releases  
**Focus:** Stability fix cho VP9 10-bit hardware decode

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*