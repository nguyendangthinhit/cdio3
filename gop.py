import json
import os

# 1. Cấu hình đường dẫn
source_dir = r"D:\py\git\CDIO_3\data\Tu_van_tuyen_sinh"
output_file_name = "data_Tu_van_tuyen_sinh.json"
output_path = os.path.join(source_dir, output_file_name)

merged_data = {}

# Kiểm tra thư mục có tồn tại không
if not os.path.exists(source_dir):
    print(f"❌ Không tìm thấy thư mục: {source_dir}")
else:
    # 2. Tự động quét toàn bộ file trong thư mục
    files = [f for f in os.listdir(source_dir) if f.endswith('.json') and f != output_file_name]
    
    if not files:
        print("⚠️ Không tìm thấy file JSON nào để gộp.")
    else:
        print(f"📂 Tìm thấy {len(files)} file. Đang tiến hành gộp...")
        
        for file_name in files:
            file_path = os.path.join(source_dir, file_name)
            
            with open(file_path, "r", encoding="utf-8") as f:
                try:
                    data = json.load(f)
                    # Lấy tên file (bỏ đuôi .json) làm key trong dictionary
                    key = os.path.splitext(file_name)[0]
                    merged_data[key] = data
                    print(f"  ✅ Đã gộp: {file_name}")
                except json.JSONDecodeError:
                    print(f"  ⚠️ Lỗi định dạng JSON tại file: {file_name}")
                except Exception as e:
                    print(f"  ❌ Lỗi không xác định với file {file_name}: {e}")

        # 3. Ghi dữ liệu đã gộp ra file
        with open(output_path, "w", encoding="utf-8") as out:
            json.dump(merged_data, out, ensure_ascii=False, indent=4)

        print("-" * 30)
        print(f"🚀 Thành công! Đã gộp {len(merged_data)} file vào:")
        print(f"📍 {output_path}")