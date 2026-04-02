import React, { useState, useEffect } from 'react';
import styles from './Banner.module.scss';

const images = [
  "https://files01.duytan.edu.vn/svruploads/sca-duytan/639063177013474990-bannersca2.jpg",
  "https://files01.duytan.edu.vn/svruploads/sca-duytan/639063170717090241-bannersca3.jpg",
  "https://files01.duytan.edu.vn/svruploads/sca-duytan/639101402422376607-bannersca1144.jpg"
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động trượt sau mỗi 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className={`${styles.banner} banner-desktop`}>
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className={`${styles['banner__slide']} full-width ${styles['banner__bg-overlay']}`}>
              <div className={styles['carousel-wrap']} style={{ position: 'relative' }}>
                <div className={`${styles['owl-carousel']} ${styles['owl-theme']} ${styles['banner-carousel']}`}>
                  
                  <div 
                    className={styles.item} 
                    style={{ 
                      backgroundImage: `url('${images[currentIndex]}')`,
                      transition: "background-image 0.5s ease-in-out" 
                    }}
                  >
                  </div>

                  {/* Nút điều hướng Carousel */}
                  <div className={styles['owl-controls']}>
                    <div className={styles['owl-nav']}>
                      <div className={styles['owl-prev']} onClick={goToPrev}>
                        <i className="fa fa-angle-left"></i>
                      </div>
                      <div className={styles['owl-next']} onClick={goToNext}>
                        <i className="fa fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
