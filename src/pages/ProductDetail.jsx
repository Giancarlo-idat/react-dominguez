import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "@/context";
import { Footer, Header } from "@/components";
import { FavoriteIcon, GridListItem } from "../components";

export const ProductDetail = () => {
  const { getProduct, products, product, loading, errorMessage } =
    useProductContext();
  const { id } = useParams();

  useEffect(() => {
    getProduct(id);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  const { conexiones, capacidad, resolucion, hilos, iluminacion_rgb } =
    product?.fichaTecnica || {};

  return (
    <Fragment>
      <Header />
      <div className="product-content">
        <div className="product-detail">
          <div className="product-detail__container">
            <div className="product-detail__container--content">
              <div className="product-detail__container--content--image">
                <img src={product?.imagen} alt={product?.modelo} />
              </div>

              <div className="product-detail__container--content--info">
                <p>{product?.marca}</p>

                <h3 className="model"> {product?.modelo}</h3>

                <div className="product-detail__container--content--info--actions">
                  <div className="specifications">
                    <p>Especificaciones principales:</p>
                    <ul>
                      <li>Conexiones: {conexiones}</li>
                      <li>Capacidad: {capacidad}</li>
                      <li>Resolución: {resolucion}</li>
                      <li>Hilos: {hilos}</li>
                      <li>Iluminación RGB: {iluminacion_rgb}</li>
                      <li>Stock: {product?.stock}</li>
                    </ul>
                  </div>

                  <div className="price favorite">
                    <div className="icons">
                      <span>S/{product?.precio}</span>
                      <FavoriteIcon />
                    </div>

                    <div className="buttons">
                      <button className="add"> + </button>
                      <span>1</span>
                      <button className="subtract"> - </button>
                      <strong>Máximo 10 unidades</strong>
                    </div>

                    <div className="detail-cart">
                      <button className="btn-add">Agregar al carrito</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductInterest products={products} loading={loading} />
        <ProductSpecifications product={product} loading={loading} />
      </div>
      <Footer />
    </Fragment>
  );
};

export const ProductInterest = ({ products = [], loading }) => {
  const productInterest = products?.slice(5, 15);

  if (loading) return <div> Loading ... </div>;

  return (
    <div className="product-interest__container">
      <div className="product-interest">
        <GridListItem
          title={"Productos que te pueden interesar"}
          products={productInterest}
          loading={loading}
        />
      </div>
    </div>
  );
};

export const ProductSpecifications = ({ product = {}, loading }) => {
  if (loading) return <div>Loading...</div>;

  const textTransformCapitalize = (str) => {
    return str?.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const keys = Object.keys(product?.fichaTecnica || {});

  return (
    <div className="product-specification__container">
      <div className="product-specification__content">
        <h5>Información adicional </h5>
        <h3> Ficha del producto :</h3>

        <ul className="product-specification__content--list">
          {keys.map((key, index) => (
            <li key={index}>
              <span>{textTransformCapitalize(key)}: </span>
              <span>{product?.fichaTecnica[key]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
