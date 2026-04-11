import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles["header-dtu"]}>

      {/* TOP BAR */}
      <div className={styles["header-top"]}>
        <div className="container d-flex justify-content-between align-items-center">

          <div className={styles["top-left"]}>
            <img
              src="https://files01.duytan.edu.vn/svruploads/sca-duytan/639059675021838960-logo-dtu-top.svg"
              alt="dtu"
            />
            <span>TOP 201-250 THẾ GIỚI (THEO QS RANKING)</span>
          </div>

          <div className={styles["top-right"]}>
            <a href="#">Đối tác</a>
            <a href="#">MyDTU</a>

            <div className={styles["search-box"]}>
              <input type="text" placeholder="Nhập từ khóa" />
              <i className="fa fa-search"></i>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN HEADER */}
      <div className={styles["header-main"]}>
        <div className="container d-flex justify-content-between align-items-center">

          {/* LOGO SCA */}
          <div className={styles["logo-sca"]}>
            <a href="/">
              <img
                src="https://files01.duytan.edu.vn/svruploads/sca-duytan/639059675005628021-logo-sca.svg"
                alt="sca"
              />
            </a>
          </div>

          {/* MENU */}
          <nav className={styles["navigation-dtu"]}>
            <ul className={styles["nav-dtu"]}>
              <li>
                <a href="/programs">CHƯƠNG TRÌNH</a>
                <div className={styles["dropdown-menu-container"]}>
                  <ul className={styles["dropdown-menu"]}>
                    <li><a href="/dai-hoc-5lz">Chương trình Đại học</a></li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="/thong-bao-tuyen-sinh-chp">TUYỂN SINH</a>
                <div className={styles["dropdown-menu-container"]}>
                  <ul className={styles["dropdown-menu"]}>
                    <li><a href="/thong-bao-tuyen-sinh-chp">Thông báo Tuyển sinh</a></li>
                    <li><a href="/undergraduate-fx7">Đại Học</a></li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="/ban-giam-hieu">HỌC BỔNG</a>
                <div className={styles["dropdown-menu-container"]}>
                  <ul className={styles["dropdown-menu"]}>
                    <li><a href="/ban-giam-hieu">Học bổng</a></li>
                  </ul>
                </div>
              </li>  
            </ul>
          </nav>

        </div>
      </div>

    </header>
  );
};

export default Header;