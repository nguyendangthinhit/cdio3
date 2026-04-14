import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles["header-dtu"]}>
      {/* MAIN HEADER */}
      <div className={styles["header-main"]}>
        <div className="container d-flex justify-content-between align-items-center">

          {/* LOGO SCA */}
          <div className={styles["logo-dtu"]}>
            <a href="/">
              <img
                src="https://files01.duytan.edu.vn/svruploads/sca-duytan/639059675021838960-logo-dtu-top.svg"
                alt="sca"
              />
              <span>TOP 201-250 THẾ GIỚI (THEO QS RANKING)</span>
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