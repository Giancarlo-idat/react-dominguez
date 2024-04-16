import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context";
import { Header } from "@/components";
import { DotsVertical, EmptyCart } from "@/components";

export const ShoppingCartPage = () => {
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const {
    cart,
    incrementarCantidad,
    decrementarCantidad,
    eliminarProductoCarrito,
    totalPrice,
  } = useCart();

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
    setModalDelete(!modalDelete);
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      eliminarProductoCarrito(productIdToDelete);
    }
  };

  const totalQuantity = cart.reduce(
    (total, product) => total + product.cantidad,
    0
  );

  return (
    <>
      <Header />
      <div className="cart">
        <div className="cart__container">
          <div className="cart__container--items">
            {cart?.length !== 0 && (
              <div className="cart__container--products">
                <h2>Carro ({totalQuantity} productos)</h2>
              </div>
            )}

            {cart?.map((product) => (
              <div key={product.id} className="cart__container--item">
                <div className="image">
                  <img
                    src={product.imagen}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>

                <div className="cart__container--item--info">
                  <div className="cart__container--item--info--title">
                    <div className="modelo">
                      <p>{product.modelo}</p>
                    </div>
                    <div className="precio">
                      <p>S/ {product.precio}</p>
                    </div>
                    <div className="delete-product">
                      <button onClick={() => handleDeleteClick(product.id)}>
                        <DotsVertical />
                      </button>
                      {/* Valida el producto ID */}
                      {modalDelete && product.id === productIdToDelete && (
                        <div className="delete-confirmation">
                          <button
                            onClick={handleConfirmDelete}
                            className="button-confirm"
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="cart__container--item--info--price">
                    <div className="marca">
                      <h5>{product.marca}</h5>
                    </div>
                    <div className="cart__container--item--quantity--buttons">
                      <div className="buttons">
                        <button
                          onClick={() => decrementarCantidad(product.id)}
                          className="decrease"
                        >
                          -
                        </button>
                        <p className="quantity">{product.cantidad}</p>
                        {/* Mostrar la cantidad del producto */}
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
                </div>
              </div>
            ))}
          </div>

          {cart?.length === 0 ? (
            <div className="cart__container--empty">
              <div className="container-cart-empty">
                <div className="svg">
                  <EmptyCart />
                  <h4>
                    Tu carro está vacío.
                    <br />
                    <span>¿No sabes qué comprar? ¡Mira las ofertas!</span>
                  </h4>
                </div>
                <Link to={"/home"} className="button">
                  Ver ofertas
                </Link>
              </div>
            </div>
          ) : (
            <div className="cart__container--summary">
              <h2>Resumen de la orden</h2>
              <div className="cart__container--summary--total">
                <div className="cart__container--summary--total--products">
                  <p>Productos({totalQuantity})</p>
                  <p>S/ {totalPrice.toFixed(2)} </p>
                </div>
                <div className="cart__container--summary--total--price">
                  <p>Total:</p>
                  <p>S/ {(totalPrice + 10).toFixed(2)}</p>
                </div>

                <Link
                  to={"/checkout/delivery"}
                  disabled={cart.length === 0}
                  style={{ color: "white", fontWeight: "600" }}
                  className="cart__container--summary--total--checkout"
                >
                  Continuar compra
                </Link>

                <Link
                  style={{ textAlign: "center", textDecoration: "underline" }}
                  to={"/"}
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
