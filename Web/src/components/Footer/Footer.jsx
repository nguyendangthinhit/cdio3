import styles from "./Footer.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles["site-footer"]}>
      <div className="container">
        <div className="row">
          {/* Cột 1 */}
          <div className="col-md-4 mb-4">
            <h5 className={styles["footer-title"]}>
              <a href="https://sca.duytan.edu.vn/">
                Trường Khoa học Máy tính & Trí tuệ Nhân tạo
              </a>
            </h5>
            <ul className={styles["footer-info"]}>
              <li>
                <strong>Hotline:</strong>{" "}
                <a href="tel:(0236)3.747.678">(0236)3.747.678 (ext 11002)</a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:sca@duytan.edu.vn">
                  sca@duytan.edu.vn
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div className="col-md-2 mb-4">
            <h5 className={styles["footer-title"]}>LIÊN KẾT</h5>
            <ul className={styles["footer-links"]}>
              <li><a href="#">Nghiên cứu</a></li>
              <li><a href="#">Giới thiệu</a></li>
              <li><a href="#">Đơn vị</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div className="col-md-3 mb-4">
            <h5 className={styles["footer-title"]}>LIÊN KẾT WEB</h5>
            <ul className={styles["footer-links"]}>
              <li><a href="https://duytan.edu.vn/" target="_blank" rel="noreferrer">Đại học Duy Tân</a></li>
              <li><a href="https://mydtu.duytan.edu.vn/" target="_blank" rel="noreferrer">myDTU</a></li>
              <li><a href="https://careers.duytan.edu.vn/" target="_blank" rel="noreferrer">Tuyển dụng</a></li>
              <li><a href="#">Tra cứu nhanh</a></li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div className="col-md-3 mb-4">
            <h5 className={styles["footer-title"]}>MẠNG XÃ HỘI</h5>
            <div className={styles["footer-social"]}>
              <a href="#" className={`${styles["social-btn"]} fb`}>f</a>
              <a href="#" className={`${styles["social-btn"]} tiktok`}>♪</a>
              <a href="#" className={`${styles["social-btn"]} zalo`}>Zalo</a>
              <a href="#" className={`${styles["social-btn"]} linkedin`}>in</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles["footer-bottom"]}>
          <div className="row align-items-center">
            <div className="col-md-6 text-md-start">
              {year} © - Copyright Duy Tan University
            </div>
            <div className="col-md-6 text-md-end text-right">
              Lượt xem: <span className={styles["view"]}>230031</span> | Visitors:{" "}
              <span className={styles["visitor"]}>47541</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;