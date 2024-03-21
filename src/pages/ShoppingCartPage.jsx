import { Link } from "react-router-dom";
import { useCart } from "../context";
import { useEffect } from "react";

export const ShoppingCartPage = () => {
  const {
    cart,
    incrementarCantidad,
    decrementarCantidad,
    totalQuantity,
    totalPrice,
  } = useCart();

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__container--items">
          <h2>Carro ({totalQuantity} productos)</h2>

          {cart.map((product) => (
            <div key={product.id} className="cart__container--item">
              <img src={product.imagen} alt={product.title} />
              <div className="cart__container--item--info">
                <div className="cart__container--item--info--title">
                  <p className="model">{product.modelo}</p>
                  <h3 className="marca">{product.marca}</h3>
                </div>
                <div className="cart__container--item--info--price">
                  <p>S/ {product.precio}</p>
                </div>
              </div>

              <div className="cart__container--item--quantity">
                <div className="cart__container--item--quantity--buttons">
                  <button
                    onClick={() => decrementarCantidad(product.id)}
                    className="decrease"
                  >
                    -
                  </button>
                  <p className="stock">{product.stock}</p>
                  <button
                    onClick={() => incrementarCantidad(product.id)}
                    className="increase"
                  >
                    +
                  </button>
                </div>
                <span>Máx 10 unidades</span>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__container--summary">
          <h2>Resumen de la orden</h2>
          <div className="cart__container--summary--total">
            <div className="cart__container--summary--total--products">
              <p>Productos({totalQuantity})</p>
              <p>S/ {totalPrice.toFixed(2)} </p>
            </div>
            <div className="cart__container--summary--total--shipping">
              <p>Envío:</p>
              <p>S/ 10</p>
            </div>
            <div className="cart__container--summary--total--price">
              <p>Total:</p>
              <p>S/ {(totalPrice + 10).toFixed(2)}</p>
            </div>

            <Link
              to={"/checkout/delivery"}
              className="cart__container--summary--total--checkout"
            >
              Continuar compra
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
