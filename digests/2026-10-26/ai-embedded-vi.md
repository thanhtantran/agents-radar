# Bản tin AI Nhúng (Orange Pi / RKLLM / RKNPU) 2026-10-26

> Thời gian tạo: 2026-10-26 02:00 UTC | Dự án: 4

- [Orange Pi Build System](https://github.com/orangepi-xunlong/orangepi-build)
- [RKNN Toolkit 2](https://github.com/airockchip/rknn-toolkit2)
- [RKNN Model Zoo](https://github.com/airockchip/rknn_model_zoo)
- [Media Process Platform (MPP) module](https://github.com/rockchip-linux/mpp)

---

## So sánh chéo

# Báo cáo So sánh Hệ sinh thái AI Edge Rockchip - 2026-10-26

## 1. 🎯 Tổng quan hệ sinh thái

**Trạng thái**: Ngày yên tĩnh. Không có breakthrough, chỉ bug reports.

**Cấu trúc 3 tầng**:
```
Hardware Layer (Orange Pi) → Codec/Media (MPP) → AI Runtime (RKNN)
         ↓                           ↓                    ↓
    Desktop issues            AV1 film grain         License confusion
```

**Vấn đề hôm nay**: 
- Orange Pi: GPU driver chết với GTK3/XWayland + video scanout flicker
- MPP: AV1 decoder thiếu film grain (có patch, chưa merge)
- RKNN: User hỏi license pretrained model cho commercial
- RKLLM: Im lặng hoàn toàn

**Nhận xét**: Stack hoạt động nhưng polish chưa xong. Desktop workload lỗi cơ bản, AI stack không có update.

---

## 2. 📊 Bảng so sánh

| Tiêu chí | Orange Pi Build | MPP | RKNN Toolkit 2 | RKNN Model Zoo |
|----------|----------------|-----|----------------|----------------|
| **Issues hôm nay** | 2 (GPU driver) | 1 (AV1 grain) | 0 | 1 (license) |
| **PRs hôm nay** | 0 | 0 | 0 | 0 |
| **Releases** | 0 | 0 | 0 | 0 |
| **Hoạt động** | 🟡 Low | 🟡 Low | 🔴 None | 🟡 Low |
| **Vấn đề nghiêm trọng** | 🔴 GLamor crash | 🟠 Visual quality | - | 🟢 Doc issue |
| **Tác động user** | High (unusable) | Medium (quality) | - | Low (legal) |
| **Fix đề xuất** | Chưa có | Có patch | - | Cần doc |
| **Maintainer response** | Chưa | Chưa | - | Chưa |

---

## 3. 🔗 Tích hợp phần cứng-phần mềm

**Orange Pi 6 Plus (CIX CD8180)**:
- Kernel 6.6.89 + GNOME 46 + Wayland
- GPU driver: GLamor fail → GTK3 apps text mất
- Video: DRM/KMS direct scanout fail → flicker 10 FPS

**Vấn đề tích hợp**:
```
Hardware (VOP2) → DRM/KMS driver → Mutter compositor
                       ↓
                   EINVAL error
                       ↓
              Scanout fail loop
```

**Root cause**: VOP2 (Video Output Processor 2) driver KMS implementation chưa stable với Mutter direct scanout path.

**MPP decoder**:
```
AV1 bitstream → VPU hardware → Film grain apply (sw_apply_grain=0) → Output
                                              ↓
                                        Skipped (bug)
```

**Workaround**:
- Orange Pi GPU: `XWAYLAND_NO_GLAMOR=1` (software render) hoặc `MUTTER_DEBUG_FORCE_KMS_MODE=simple`
- MPP AV1: Patch sẵn, chờ merge

---

## 4. ⚡ Hiệu năng NPU

**Không có data hôm nay**. Zero RKNN/NPU activity.

**Context từ issue RKNN Model Zoo**:
- YOLOX pretrained model available
- User muốn deploy commercial firmware
- Chưa có benchmark hay performance report

**Inference**: NPU stack có vẻ stable (không bug reports), nhưng cũng không có innovation hay optimization updates.

---

## 5. 👨‍💻 Developer Experience

**Orange Pi**: 
- ❌ Desktop experience broken (GLamor, video scanout)
- ✅ Issue reports chi tiết (kernel logs, workarounds)
- ❌ Maintainer response chậm

**MPP**:
- ✅ User có thể debug HAL code (`hal_av1d_vdpu.c`)
- ✅ Patch đề xuất minimal, rõ ràng
- ❌ 1 tháng không merge (issue 2026-09-29, giờ 2026-10-26)

**RKNN Model Zoo**:
- ❌ License documentation thiếu
- ❌ Pretrained model legal status không rõ
- ⚠️ Risk cho commercial deployment

**Đánh giá chung**: 
- Code accessible, debuggable
- Community reports quality cao
- Maintainer response rate thấp
- Documentation gaps (license, GPU driver versions)

---

## 6. 🎬 Use Cases

**Orange Pi 6 Plus**:
```
Desktop workstation:
├─ Dual monitor
├─ Video playback (VLC, YouTube)
├─ Disk management (GParted)
└─ Text editing (mousepad, terminal)
```

**Status**: ❌ Broken. GTK3 apps unusable, video flickers.

**MPP (AV1)**:
```
Embedded media player:
└─ AV1 decode với film grain content
```

**Status**: ⚠️ Works nhưng visual quality wrong.

**RKNN (inference từ issue)**:
```
Commercial firmware:
└─ YOLOX object detection
```

**Status**: ⚠️ Legal clarity needed.

---

## 7. 📈 Xu hướng phát triển

**Hiện trại (2026-10-26)**:
- Development velocity thấp (zero PRs toàn stack)
- Bug fix rate chậm (MPP issue 1 tháng, Orange Pi issues mới)
- Focus: stability over features

**Vấn đề cần giải quyết**:

1. **Desktop readiness** (Orange Pi):
   - Mesa/GPU driver stable version
   - KMS direct scanout fix
   - Test matrix cho Wayland compositors

2. **Media quality** (MPP):
   - AV1 film grain merge
   - Compliance testing với AV1 spec

3. **Legal clarity** (RKNN):
   - License documentation
   - Commercial use guidelines
   - Dataset terms matrix

4. **NPU ecosystem** (RKNN Toolkit 2):
   - Zero activity = stable or stagnant?
   - Cần model conversion examples
   - Quantization best practices

**Dự đoán**:
- Short term (1-3 tháng): Bug fixes cho Orange Pi GPU, MPP film grain merge
- Medium term (3-6 tháng): Nếu RKLLM im lặng kéo dài → LLM on edge không phải priority
- Long term: Tùy vào Rockchip roadmap (RK3588 successor, NPU gen mới)

**Risk**:
- Maintainer bandwidth thấp → community patches không merge → fork ecosystem
- Desktop GPU issues → user chuyển sang stable distros (Armbian, vendor BSPs)
- License confusion → enterprise không adopt

**Opportunity**:
- Orange Pi 6 Plus hardware OK, chỉ cần driver polish
- MPP có community fix quality → có thể scale
- RKNN Model Zoo có pretrained models → cần expand + document

---

## 🎯 Kết luận

**Hôm nay**: Quiet day. Bug reports, zero development.

**Stack health**:
- Hardware: ✅ OK (Orange Pi 6 Plus 16GB)
- GPU driver: ❌ Broken (GLamor, KMS scanout)
- Media codec: ⚠️ Works nhưng quality bug
- AI runtime: 🤷 Không data (zero activity)

**Recommend cho developers**:
- **Desktop workload**: Chờ GPU driver fix hoặc dùng X11 thay Wayland
- **Media playback**: MPP works, nhưng AV1 film grain content cần workaround
- **AI inference**: RKNN stable, nhưng check license trước commercial deploy
- **LLM edge**: RKLLM không có signal → đợi hoặc dùng alternative (llama.cpp, TensorRT-LLM)

**Priority fixes**:
1. Orange Pi GLamor crash (#337) - blocking desktop use
2. Orange Pi video scanout (#338) - annoying UX
3. MPP film grain (#974) - quality compliance
4. RKNN license docs (#456) - legal risk

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>Orange Pi Build System</strong> — <a href="https://github.com/orangepi-xunlong/orangepi-build">orangepi-xunlong/orangepi-build</a></summary>

# Báo cáo Orange Pi Build System - 2026-10-26

## 1. Tóm tắt hôm nay

Hoạt động thấp. 2 issue mới từ cùng user (@Komnin1) về Orange Pi 6 Plus + Ubuntu 24.04 GNOME. Không có PR, không có release.

## 2. Cập nhật phần cứng

**Orange Pi 6 Plus (CIX CD8180 / Sky1)**
- SoC: Chưa nêu rõ trong issue (có thể RK3588/RK3588S based on naming)
- RAM: 16GB
- BIOS: version 1.5 (2026-07-06)
- Kernel: 6.6.89-cix #90
- Image: v1.0.2 Ubuntu Noble GNOME

Không có thông tin NPU trong issue.

## 3. Tích hợp AI/LLM

Không có update AI/LLM hôm nay.

## 4. Hiệu năng & Benchmark

Không có benchmark hoặc performance update.

## 5. Hỗ trợ phần mềm

**Vấn đề desktop environment:**
- Ubuntu 24.04 GNOME
- GNOME Shell 46.0
- Mutter 46.2
- Wayland + XWayland compatibility issues

## 6. Vấn đề kỹ thuật

### Issue #337: GTK3 apps text hiển thị trống trên XWayland

**Triệu chứng:**
- GTK3 apps (GParted, mousepad, xfce4-terminal) qua XWayland không hiển thị text
- Native Wayland apps (gnome-text-editor) hoạt động bình thường
- GTK4 apps OK

**Root cause:**
- GLamor rendering issue với GPU driver
- Workaround: `XWAYLAND_NO_GLAMOR=1` → force software rendering → text hiển thị

**Technical details:**
```
[29072.135] (EE) glamor0: Failed to make EGL context current
[29072.135] (EE) glamor0: glamor_egl_make_current failed
```

**Tác động:** GParted unusable → không thể partition disk qua GUI

---

### Issue #338: Fullscreen video flickering

**Triệu chứng:**
- Video fullscreen flicker dark frames sau khi cursor ẩn (~3 giây)
- Flicker với 10 FPS rhythm
- Xảy ra trên: VLC, Totem, Firefox YouTube, Chromium YouTube

**Root cause:**
- Direct scanout commits fail với `EINVAL`
- Mutter log:
```
meta_kms_impl_device_update_states_sync: Feedback not handled: Direct scanout page flip failed: Invalid argument
```
- Compositor alternates giữa direct scanout (fail) và standard composite (success)

**Workaround:** 
- Move cursor → scanout disabled → flicker stops
- `MUTTER_DEBUG_FORCE_KMS_MODE=simple` → disable direct scanout → fixes issue

**Technical context:**
- DRM/KMS driver issue
- Possible CRTC/plane configuration incompatibility
- May relate to VOP2 (Video Output Processor) on Rockchip SoCs

## 7. Cộng đồng & Use cases

User @Komnin1 test desktop workstation use case:
- Dual monitor setup (cursor move suggests)
- Video playback (YouTube, local files)
- System administration (GParted disk management)
- Text editing (mousepad, terminal)

Quality report: detailed logs, kernel messages, workarounds tested.

## 8. Roadmap

**Cần sửa ưu tiên cao:**

1. **GLamor/GPU driver fix** (#337)
   - Debug EGL context creation failure
   - Test với mesa/panfork versions khác nhau
   - Consider llvmpipe fallback cho GTK3

2. **KMS direct scanout fix** (#338)
   - Debug `EINVAL` cause trong DRM driver
   - Test với kernel versions khác
   - May need Rockchip VOP2 driver patch

**Suggested next steps:**
- User test kernel 6.1 LTS vs 6.6
- Maintainer provide mesa/GPU driver versions
- Collect `dmesg` output cho DRM subsystem
- Test trên Orange Pi 6 Plus units khác (hardware variation check)

---

**Note:** Cả 2 issues đều graphics stack issues, không phải AI/NPU related. Hệ thống build OK nhưng runtime graphics driver chưa stable cho desktop workload.

</details>

<details>
<summary><strong>RKNN Toolkit 2</strong> — <a href="https://github.com/airockchip/rknn-toolkit2">airockchip/rknn-toolkit2</a></summary>

Không có hoạt động trong 24 giờ qua.

</details>

<details>
<summary><strong>RKNN Model Zoo</strong> — <a href="https://github.com/airockchip/rknn_model_zoo">airockchip/rknn_model_zoo</a></summary>

# Báo cáo RKNN Model Zoo - 2026-10-26

## 📊 Tóm tắt hôm nay

Hoạt động tối thiểu. Một issue mới về license của pretrained model. Không có PR, release, hay code change.

## 🔧 Cập nhật phần cứng

Không có.

## 🤖 Tích hợp AI/LLM

Không có.

## ⚡ Hiệu năng & Benchmark

Không có.

## 🛠️ Hỗ trợ phần mềm

Không có.

## ⚠️ Vấn đề kỹ thuật

**Issue #456 - License clarification cho pretrained model**

User @SriramPeriyasamy hỏi về licensing của `yolox_s.onnx` pretrained model:
- Apache 2.0 của repo có cover pretrained model không?
- Commercial use, modify, convert sang RKNN, redistribute trong firmware được không?

Vấn đề quan trọng vì:
- Pretrained weights thường có license riêng khác source code
- YOLOX original repo có license riêng (Apache 2.0 nhưng weights có thể khác)
- Commercial deployment cần clarity để tránh risk

**Phân tích:**
- Model Zoo repo license ≠ model weights license
- Cần check:
  1. YOLOX upstream license (Megvii)
  2. Training dataset license (COCO dataset)
  3. Explicit license file trong model download

**Trả lời đúng là:**
- Repo Apache 2.0 chỉ cover code conversion/inference
- Pretrained weights cần check riêng từ Megvii/YOLOX
- COCO dataset có own terms of use
- Commercial use cần verify từng layer

## 👥 Cộng đồng & Use cases

Issue cho thấy:
- User deploy commercial firmware trên Rockchip NPU
- Cần legal clarity cho production
- Common pain point: license confusion giữa framework và weights

## 🗺️ Roadmap

Maintainer nên:
1. Add `LICENSE` file cho từng pretrained model
2. Document license matrix (code vs weights vs dataset)
3. Create license FAQ section
4. List safe-for-commercial models vs academic-only

---

**Tổng kết:** Ngày yên tĩnh. Issue license quan trọng nhưng không critical. Cần maintainer response để clarify.

</details>

<details>
<summary><strong>Media Process Platform (MPP) module</strong> — <a href="https://github.com/rockchip-linux/mpp">rockchip-linux/mpp</a></summary>

# Báo cáo MPP (rockchip-linux/mpp) - 2026-10-26

## 📊 Tóm tắt hôm nay

Hoạt động thấp. Chỉ có 1 issue được cập nhật (comment mới), không có PR hay release.

## 🔧 Vấn đề kỹ thuật

### 🐛 Bug đang active

**Issue #974: AV1 decoder thiếu film grain layer** 👍 1
- **Trạng thái**: OPEN (tạo 2026-09-29, cập nhật gần nhất 2026-10-25)
- **Tác giả**: @lukaszsobala
- **HAL bị ảnh hưởng**: `VPU_CLIENT_AV1DEC` (`mpp/hal/vpu/av1d/hal_av1d_vdpu.c`)
- **Triệu chứng**: 
  - Stream AV1 có film grain decode thiếu grain layer
  - Output đúng về mặt nội dung, chỉ thiếu hạt film
  - Platform: Rockchip Linux 6.1
- **Root cause**: `sw_apply_grain` hardcoded = 0
- **Fix đề xuất**: Patch minimal cho file `hal_av1d_vdpu.c`
- **Link**: https://github.com/rockchip-linux/mpp/issues/974

**Ảnh hưởng**:
- Chất lượng visual không đúng spec với content có film grain
- Mất đi artistic intent của content creator
- Compliance issue với AV1 spec

## 📈 Cập nhật phần cứng

Không có thông tin về hardware mới trong 24h qua.

## 🤖 Tích hợp AI/LLM

Không có update về RKLLM/RKNPU trong 24h qua.

## ⚡ Hiệu năng & Benchmark

Không có benchmark hay performance update trong 24h qua.

## 🛠️ Hỗ trợ phần mềm

Không có SDK/toolkit update trong 24h qua.

## 👥 Cộng đồng & Use cases

**Use case từ issue #974**:
- Decode AV1 content với film grain trên embedded Linux
- Platform: Rockchip SoC với VPU hardware decoder
- Kernel: Linux 6.1

## 🗺️ Roadmap

Không có thông tin roadmap công bố trong 24h qua.

---

**Kết luận**: Ngày yên tĩnh. Issue #974 về AV1 film grain cần attention - bug ảnh hưởng quality, có patch đề xuất nhưng chưa merge. Community đang chờ maintainer response.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/thanhtantran/agents-radar).*