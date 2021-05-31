// ---Dependencys
import React from 'react';
import { Carousel } from 'antd';
// ---Components
import Banner from 'Comp/Client/Home/Banner';
import LazyBanner from 'Comp/Client/Home/LazyBanner';
// ---Media
// import c1 from 'Images/bannerD1.jpg';

// ------------------------------------------ COMPONENT-----------------------------------------
function DinamicCarousel(props) {
  const { banners, isMovil } = props;
  if (banners)
    return (
      <React.Fragment>
        <div className="carousel-cont">
          <Carousel autoplay effect="fade" dotPosition="top">
            {banners.map(element => (
              <Banner
                key={element._id}
                srcImg={isMovil ? element.imgMovil : element.imgDesk}
              />
            ))}
          </Carousel>
        </div>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      {/* ------------ Case No banners ------------ */}
      <div className="carousel-cont">
        <Carousel autoplay effect="fade" dotPosition="top">
          <LazyBanner />
        </Carousel>
      </div>
    </React.Fragment>
  );
}

export default DinamicCarousel;
