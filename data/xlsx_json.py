import pandas as pd
import json
import os
from docx import Document

def convert_to_json(file_path):
    file_name = os.path.basename(file_path)
    output_name = file_name.rsplit('.', 1)[0] + ".json"
    
    print(f"--- Đang xử lý: {file_name} ---")
    
    try:
        # Xử lý file EXCEL
        if file_path.endswith('.xlsx'):
            df = pd.read_excel(file_path)
            # Chuyển DataFrame sang list dictionary
            data = df.to_dict(orient='records')
            
        # Xử lý file WORD
        elif file_path.endswith('.docx'):
            doc = Document(file_path)
            # Gom toàn bộ văn bản trong các đoạn (paragraphs)
            full_text = [para.text for para in doc.paragraphs if para.text.strip() != ""]
            # Tạo cấu trúc JSON đơn giản cho Word
            data = {"file_name": file_name, "content": full_text}
            
        else:
            print(f"❌ Định dạng file {file_name} không được hỗ trợ.")
            return

        # Ghi ra file JSON
        with open(output_name, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"✅ Đã tạo thành công: {output_name}")

    except Exception as e:
        print(f"🔥 Lỗi khi xử lý {file_name}: {e}")

# Danh sách 4 file của bạn
files_to_convert = [
    'CachTinhDiemXetTuyen_2026.docx',
    'ThongTinTuyenSinh_2026.docx',
    'chi_tiet_cac_nganh_moi_2026.xlsx',
    'chi_tiet_nganh_dtu_2026.xlsx'
]

if __name__ == "__main__":
    for file in files_to_convert:
        if os.path.exists(file):
            convert_to_json(file)
        else:
            print(f"⚠️ Không tìm thấy file: {file}")