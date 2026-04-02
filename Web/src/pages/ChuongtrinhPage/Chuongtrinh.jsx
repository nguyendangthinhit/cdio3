import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ChuongtrinhPage = () => {
    return (
        <>
        <Header />
        <div className="container">
            {/* main container */}
            <div className="row">
                <div className="small-12 column">
                    <nav className="breadcrumbs">
                        <ol className="breadcrumbs__list no-bullet">
                            <li className="breadcrumbs__list-item">
                                <a className="breadcrumbs__link" href="https://sca.duytan.edu.vn/">
                                    Trang chủ
                                    <svg className="icon icon-home">
                                        <use xlinkHref="#icon-home" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </a>
                            </li>
                            <li className="breadcrumbs__list-item">
                                <span className="breadcrumbs__current-item">Chương trình Đại học</span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            
            <div className="row row-content">
                <aside className="sidebar small-12 medium-4 medium-pull-8 large-3 large-pull-9 column">
                    <div className="sidebar__inner-container">
                        <section className="component">
                            <nav className="submenu">
                                <h2 className="submenu__heading">
                                    <a style={{ color: "#fff" }} href="https://sca.duytan.edu.vn/programs" title="CHƯƠNG TRÌNH">CHƯƠNG TRÌNH</a>
                                </h2>
                                <ul className="submenu__list no-bullet">
                                    <li className="submenu__list-item">
                                        <a className="submenu__link button" href="https://sca.duytan.edu.vn/dai-hoc-5lz" target="_self" title="Chương trình Đại học">
                                            Chương trình Đại học
                                            <svg className="icon icon-triangle"><use xlinkHref="#icon-triangle" xmlnsXlink="http://www.w3.org/1999/xlink"></use></svg>
                                        </a>
                                    </li>
                                    <li className="submenu__list-item">
                                        <a className="submenu__link button" href="https://sca.duytan.edu.vn/chuong-trinh-thac-si-8l0" target="_self" title="Chương trình Thạc Sĩ">
                                            Chương trình Thạc Sĩ
                                            <svg className="icon icon-triangle"><use xlinkHref="#icon-triangle" xmlnsXlink="http://www.w3.org/1999/xlink"></use></svg>
                                        </a>
                                    </li>
                                    <li className="submenu__list-item">
                                        <a className="submenu__link button" href="https://sca.duytan.edu.vn/sau-dai-hoc-9mi" target="_self" title="Chương trình Tiến Sĩ">
                                            Chương trình Tiến Sĩ
                                            <svg className="icon icon-triangle"><use xlinkHref="#icon-triangle" xmlnsXlink="http://www.w3.org/1999/xlink"></use></svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </section>

                        <div className="advertising">
                            <div className="owl-carousel owl-loaded">
                                <div className="adv-box"></div>
                            </div>
                        </div>
                        <div className="advertising">
                            <div className="owl-carousel owl-loaded">
                                <div className="adv-box"></div>
                            </div>
                        </div>
                    </div>
                </aside>
                
                <main className="main small-12 medium-8 medium-push-4 large-9 large-push-3 column" id="main">
                    <div className="main__inner-container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="section-title slash100per left">Chương trình Đại học</h1>
                            </div>
                        </div>
                        <div className="list-item-pro">
                            <div className="list-item">
                                <div className="row">
                                    <div className="item col-md-4">
                                        <a title="Công nghệ Phần mềm" href="https://sca.duytan.edu.vn/dai-hoc-5lz/software-technology">
                                            <img 
                                                title="Công nghệ Phần mềm" 
                                                alt="Công nghệ Phần mềm" 
                                                src="https://files01.duytan.edu.vn/svruploads/sca-duytan/639087510975859465-mem.png" 
                                            />
                                            <h2 className="title" title="Công nghệ Phần mềm">Công nghệ Phần mềm</h2>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default ChuongtrinhPage;
