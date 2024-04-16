import BannerHome from "../assets/images/bannerHome.jpg";
import BannerTeclados from "../assets/images/bannerTeclado.jpg";
import BannerAudifono from "../assets/images/bannerAudifono.webp";
import BannerMicrofono from "../assets/images/bannerMicrofono.webp";
import BannerSilla from "../assets/images/bannerSilla.jpg";
import { Fragment } from "react";

export const Banner = () => {
  return (
    <Fragment>
      <div className="banner-container">
        <img
          className="banner-img"
          src={BannerHome}
          alt="Banner Home"
          loading="lazy"
        />
      </div>
      <BannerGrid />
    </Fragment>
  );
};

export const BannerGrid = () => {
  const img = [BannerTeclados, BannerAudifono, BannerMicrofono, BannerSilla];

  return (
    <div className="banner-grid">
      {img.map((img, index) => (
        <img
          className="banner-grid-img"
          key={index}
          src={img}
          alt="Banner Home"
          loading="lazy"
        />
      ))}
    </div>
  );
};
