import React, { useEffect, useState } from "react";

export const Carrousel = ({images, autoPlay, showButtons}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (autoPlay || showButtons) {
      const interval = setInterval(() => {
        selectedNewImage(currentIndex, images);
      }, 5000);
      return () => clearInterval(interval);
    }
  });

  const selectedNewImage = (_index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next
        ? currentIndex < images.length - 1
        : currentIndex > 0;
      const nextIndex = next
        ? condition
          ? currentIndex + 1
          : 0
        : condition
        ? currentIndex - 1
        : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setCurrentIndex(nextIndex);
    }, 1000);
  };

  const previous = () => {
    selectedNewImage(currentIndex, images, false);
  };

  const next = () => {
    selectedNewImage(currentIndex, images);
  };

  return (
    <section className="carousel ">
      <div className="carousel-container container-principal">
        <img
          src={`../../../src/assets/images/${selectedImage}`}
          alt="Carousel"
          className={loaded ? "loaded" : ""}
          loading="lazy"
        />

        <div className="carousel-buttons">
          {showButtons ? (
            <>
              <button onClick={previous}>Anterior</button>
              <button onClick={next}>Siguiente</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};
