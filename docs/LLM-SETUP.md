# Hướng dẫn cài đặt LLM Local

Hệ thống agents-radar cần một LLM server chạy local với OpenAI-compatible API. Dưới đây là các tùy chọn phổ biến:

## 🦙 Ollama (Khuyến nghị)

**Ưu điểm**: Dễ cài đặt, tự động quản lý models, hiệu năng tốt

### Cài đặt

**Windows/Mac/Linux**:
```bash
# Tải từ https://ollama.ai
# Hoặc dùng curl (Linux/Mac)
curl -fsSL https://ollama.ai/install.sh | sh
```

### Chạy model

```bash
# Tải và chạy model (khuyến nghị Qwen2.5)
ollama run qwen2.5:14b

# Hoặc các model khác
ollama run qwen2.5:7b      # Nhẹ hơn, nhanh hơn
ollama run qwen2.5:32b     # Chất lượng cao hơn
ollama run llama3.1:8b     # Alternative
```

### Cấu hình

```bash
export OPENAI_BASE_URL=http://localhost:11434/v1
export OPENAI_MODEL=qwen2.5:14b
```

## 🎨 LM Studio

**Ưu điểm**: Giao diện đẹp, dễ sử dụng, hỗ trợ nhiều model

### Cài đặt

1. Tải LM Studio từ https://lmstudio.ai
2. Mở LM Studio và tải model từ tab "Discover"
3. Khuyến nghị: Qwen2.5, Llama 3.1, Mistral
4. Vào tab "Local Server" và click "Start Server"

### Cấu hình

```bash
export OPENAI_BASE_URL=http://localhost:1234/v1
export OPENAI_MODEL=qwen2.5-14b-instruct  # Tên model trong LM Studio
```

## ⚡ vLLM (Cho GPU mạnh)

**Ưu điểm**: Hiệu năng cao nhất, tối ưu cho GPU

### Cài đặt

```bash
pip install vllm
```

### Chạy server

```bash
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-14B-Instruct \
  --port 8000
```

### Cấu hình

```bash
export OPENAI_BASE_URL=http://localhost:8000/v1
export OPENAI_MODEL=Qwen/Qwen2.5-14B-Instruct
```

## 🌐 Text Generation WebUI

**Ưu điểm**: Nhiều tính năng, hỗ trợ nhiều backend

### Cài đặt

```bash
git clone https://github.com/oobabooga/text-generation-webui
cd text-generation-webui
./start_linux.sh  # hoặc start_windows.bat, start_macos.sh
```

### Cấu hình

1. Tải model trong tab "Model"
2. Bật "openai" extension trong tab "Session"
3. API sẽ chạy ở `http://localhost:5000/v1`

```bash
export OPENAI_BASE_URL=http://localhost:5000/v1
export OPENAI_MODEL=your-model-name
```

## 📊 So sánh các tùy chọn

| Tùy chọn | Dễ cài | Hiệu năng | RAM cần | GPU cần | Khuyến nghị |
|----------|--------|-----------|---------|---------|-------------|
| Ollama | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 8GB+ | Không | ✅ Tốt nhất cho người mới |
| LM Studio | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 8GB+ | Không | ✅ Tốt cho GUI |
| vLLM | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 16GB+ | Có | Cho GPU mạnh |
| Text Gen WebUI | ⭐⭐⭐ | ⭐⭐⭐ | 8GB+ | Tùy chọn | Cho power users |

## 🎯 Khuyến nghị Model

### Cho máy yếu (8-16GB RAM)
- **qwen2.5:7b** - Nhanh, nhẹ, chất lượng tốt
- **llama3.1:8b** - Alternative tốt

### Cho máy trung bình (16-32GB RAM)
- **qwen2.5:14b** ⭐ Khuyến nghị
- **mistral:7b** - Chất lượng cao

### Cho máy mạnh (32GB+ RAM hoặc GPU)
- **qwen2.5:32b** - Chất lượng tốt nhất
- **llama3.1:70b** - Rất mạnh nhưng chậm

## 🔧 Kiểm tra kết nối

Sau khi cài đặt, kiểm tra API:

```bash
curl http://localhost:11434/v1/models  # Ollama
curl http://localhost:1234/v1/models   # LM Studio
curl http://localhost:8000/v1/models   # vLLM
```

Hoặc test với agents-radar:

```bash
export GITHUB_TOKEN=your_token
export OPENAI_BASE_URL=http://localhost:11434/v1
export OPENAI_MODEL=qwen2.5:14b

pnpm start
```

## ❓ Troubleshooting

### Model chạy chậm
- Giảm kích thước model (7B thay vì 14B)
- Tăng RAM/VRAM
- Sử dụng quantized models (Q4, Q5)

### Out of memory
- Đóng các ứng dụng khác
- Sử dụng model nhỏ hơn
- Bật swap (Linux)

### API không kết nối được
- Kiểm tra firewall
- Đảm bảo server đang chạy
- Kiểm tra port đúng

## 📚 Tài liệu thêm

- [Ollama Documentation](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [LM Studio Guide](https://lmstudio.ai/docs)
- [vLLM Documentation](https://docs.vllm.ai/)
- [Text Gen WebUI Wiki](https://github.com/oobabooga/text-generation-webui/wiki)
