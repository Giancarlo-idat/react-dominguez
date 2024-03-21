import { Link } from "react-router-dom";
import { CartIcon, FavoriteIcon } from ".";
import { products } from "@/__mocks__";
import "@/assets/styles/main.scss";
import { useCart } from "../context";


export const GridListItem = ({ title }) => {

  const { agregarCarrito } = useCart();


  return (
    <section className="grid-container">
      <div className="grid-title">
        <h3>{title}</h3>
        <Link to="/"> View all</Link>
      </div>

      <div className="grid-content">
        {products?.map(
          (product) => (
            <Link to="/" className="grid-item" key={product.id}>
              <div className="grid-item__content">
                {/* shopping cart icon and favorites icon */}
                <div className="icons">
                  <div className="addCart" onClick={() => agregarCarrito(product)}>
                    <CartIcon />
                  </div>
                  <div className="addFavorite">
                    <FavoriteIcon />
                  </div>
                </div>
                <img src={product.imagen} alt={product.title} loading="lazy" />
                <span>{product.marca}</span>
                <p>{product.modelo}</p>
                <h5>{product.descripcion}</h5>
                <strong>STOCK: {product.stock}</strong>

                <div className="price">
                  <p>S/.{product.precio}</p>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};
