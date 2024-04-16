import { useCategoriesContext } from "@/context";
import Slider from "react-slick";

export const CategoriesList = () => {
  const { categories, loading } = useCategoriesContext();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="container categories-list">
      <div className="container-principal">
        <Slider {...settings}>
          {categories?.map((category) => (
            <div className="container-categoria" key={category.id}>
              <img src={category.imagen} alt={category.nombre} />
              <h2>{category.nombre}</h2>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
