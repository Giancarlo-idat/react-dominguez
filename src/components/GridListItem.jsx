import { Link } from "react-router-dom";
import { CartIcon, FavoriteIcon } from ".";
import { useCart } from "../context";
import Slider from "react-slick";

export const GridListItem = ({ title, products = [] }) => {
  const { agregarCarrito } = useCart();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
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

  return (
    <section className="grid-container">
      <div className="container-principal">
        <div className="grid-title">
          <h3>{title}</h3>
          <Link to="/"> Ver todos</Link>
        </div>

        <div className="grid-content">
          <Slider {...settings}>
            {products?.map((product) => (
              <div className="grid-item" key={product?.id}>
                <div className="grid-item__content">
                  {/* shopping cart icon and favorites icon */}
                  <div className="icons">
                    <div
                      className="addCart"
                      onClick={() => agregarCarrito(product)}
                    >
                      <CartIcon />
                    </div>
                    <div className="addFavorite">
                      <FavoriteIcon />
                    </div>
                  </div>
                  <img
                    src={product?.imagen}
                    alt={product?.title}
                    loading="lazy"
                  />
                  <Link
                    to={`/product/productDetail/${product?.id}`}
                    className="product-link"
                  >
                    <span>{product?.marca}</span>
                    <h5>{product?.modelo}</h5>
                    <p>{product?.descripcion}</p>
                    <strong>STOCK: {product?.stock}</strong>

                    <div className="price">
                      <p>S/.{product?.precio}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
