import pandas as pd

def excel_to_json(name, sheet_name=0):
    input_file = f"{name}.xlsx"
    output_file = f"{name}.json"

    # Đọc file Excel
    df = pd.read_excel(input_file, sheet_name=sheet_name)

    # Chuyển thành JSON
    json_str = df.to_json(orient="records", force_ascii=False, indent=4)

    # Lưu ra file JSON
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(json_str)

    print(f"Đã chuyển {input_file} → {output_file}")
    return json_str

files = [
    "CachTinhDiemXetTuyen_2026.docx",
    "ThongTinTuyenSinh_2026.docx",
    "chi_tiet_nganh_dtu_2026.xlsx",
    "chi_tiet_cac_nganh_moi_2026.xlsx"
]

for file in files:
    excel_to_json(file)

