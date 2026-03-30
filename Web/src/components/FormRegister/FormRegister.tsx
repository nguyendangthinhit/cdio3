import React from 'react';
import styles from './FormRegister.module.scss';

const FormRegister = () => {
    return (
        <section className={`${styles['form-registor']} py-5`} id="DangKyTuVan">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="content-form col-md-6 mb-5 mb-md-0">
                        <h2 className={`text-center fw-bold ${styles['h2-dk']} mb-4`}>
                            Đăng ký Tư vấn
                        </h2>
                        <div className="notification">
                        </div>
                        <form action="/dktv" method="post" encType="multipart/form-data">
                            {/* Họ tên */}
                            <div className="form-group mb-3">
                                <input maxLength={100} type="text" className="form-control" placeholder="Nhập Họ và Tên (*)" name="FULL_NAME" id="FULL_NAME" defaultValue="" />
                            </div>
                            {/* Điện thoại + Email */}
                            <div className="row mb-3">
                                <div className="form-group col-md-6 mb-3 mb-md-0">
                                    <input maxLength={20} type="text" className="form-control" placeholder="Nhập Số điện thoại (*)" name="TELEPHONE" id="TELEPHONE" defaultValue="" />
                                </div>
                                <div className="form-group col-md-6">
                                    <input maxLength={100} type="text" className="form-control" placeholder="Nhập email" name="EMAIL" id="EMAIL" defaultValue="" />
                                </div>
                            </div>
                            {/* Ngành quan tâm */}
                            <div className="form-group mb-3">
                                <label className={`fw-bold mb-2 ${styles['title-pro']}`}>Ngành quan tâm</label>
                                <div className="row card p-3 m-0 shadow-sm border-0">
                                    <div className="col-md-12">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="c1" defaultValue="Chưa có lựa chọn cụ thể" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="c1">Chưa có lựa chọn cụ thể</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <label className={`mb-2 fw-bold text-danger ${styles['title-check-pro']}`}>Chương trình Đại học</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-1" defaultValue="Công nghệ Phần mềm" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-1">Công nghệ Phần mềm</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-14" defaultValue="Thiết kế Games & Multimedia" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-14">Thiết kế Games &amp; Multimedia</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-20" defaultValue="Công nghệ Phần mềm Ô tô thông minh" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-20">Công nghệ Phần mềm Ô tô thông minh</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-21" defaultValue="An toàn Thông tin" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-21">An toàn Thông tin</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-10" defaultValue="Khoa học Máy tính" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-10">Khoa học Máy tính</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-22" defaultValue="Kỹ thuật Máy tính" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-22">Kỹ thuật Máy tính</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-5" defaultValue="Trí Tuệ Nhân Tạo (HP - Chương trình Tài năng)" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-5">Trí Tuệ Nhân Tạo (HP - Chương trình Tài năng)</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-4" defaultValue="Big Data & Machine Learning (HP - Chương trình Tài năng)" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-4">Big Data &amp; Machine Learning (HP - Chương trình Tài năng)</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-3" defaultValue="Kỹ thuật Mạng" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-3">Kỹ thuật Mạng</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-2" defaultValue="Mạng máy tính & Truyền thông Dữ liệu" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-2">Mạng máy tính &amp; Truyền thông Dữ liệu</label>
                                        </div>
                                    </div>

                                    <div style={{ clear: 'both' }}></div>
                                    
                                    <div className="col-md-12 mt-3">
                                        <label className={`mb-2 fw-bold text-danger ${styles['title-check-pro']}`}>Chương trình Thạc Sĩ</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-11" defaultValue="Thạc sĩ Khoa học Máy tính" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-11">Thạc sĩ Khoa học Máy tính</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-16" defaultValue="Thạc sĩ Kỹ thuật phần mềm" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-16">Thạc sĩ Kỹ thuật phần mềm</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-17" defaultValue="Thạc sĩ Hệ thống thông tin" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-17">Thạc sĩ Hệ thống thông tin</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-19" defaultValue="Thạc sĩ An toàn Thông tin" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-19">Thạc sĩ An toàn Thông tin</label>
                                        </div>
                                    </div>
                                    
                                    <div style={{ clear: 'both' }}></div>
                                    
                                    <div className="col-md-12 mt-3">
                                        <label className={`mb-2 fw-bold text-danger ${styles['title-check-pro']}`}>Chương trình Tiến Sĩ</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check mb-2">
                                            <input type="checkbox" className="form-check-input" id="rg-12" defaultValue="Tiến sĩ Khoa học Máy tính" name="ACADEMIC_PROGRAM_LIST" />
                                            <label className="form-check-label" htmlFor="rg-12">Tiến sĩ Khoa học Máy tính</label>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            {/* Vấn đề */}
                            <div className="form-group mb-3">
                                <textarea maxLength={500} className="form-control" rows={5} placeholder="Vấn đề cần tư vấn?" name="QUESTION" id="QUESTION"></textarea>
                            </div>
                            
                            {/* Captcha + Submit */}
                            <div className="row align-items-center mb-3">
                                <div className="form-group col-md-5 mb-3 mb-md-0">
                                    <input maxLength={5} type="text" className="form-control" placeholder="Nhập mã xác nhận" name="CAPTCHAR" defaultValue="" />
                                </div>
                                <div className="form-group col-md-3 mb-3 mb-md-0 d-flex justify-content-center">
                                    <img src="data:image/png;base64,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" className="img-fluid border captcha" alt="captcha" />
                                </div>
                                <div className="form-group col-md-4 text-end mt-3 mt-md-0">
                                    <button className={`btn w-100 fw-bold ${styles['btn-dk']}`} style={{ backgroundColor: '#a62823', color: '#fff' }}>
                                        ĐĂNG KÝ
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="img-form col-md-6 text-center text-md-end">
                        <img src="https://sca.duytan.edu.vn/content/images/human-form.png" className="img-fluid" alt="human form" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormRegister;
