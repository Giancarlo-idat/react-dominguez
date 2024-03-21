import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addToCart, removeItem, addToCartError, clearCart } from "@/redux";

export const useCartStore = () => {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const startAddToCart = (producto) => {
    try {
      // dispatch(addToCartStart()); // Establece loading a true
      // Simulación de una operación sincrónica
      // (No hay necesidad de await o Promise ya que la operación es instantánea)
      dispatch(addToCart(producto));
      Swal.fire("Producto agregado al carrito", "Éxito", "success");
    } catch (error) {
      console.log(error)
      dispatch(addToCartError("Error al agregar el producto al carrito"));
      Swal.fire("Error al agregar el producto al carrito", "Error", "error");
    }
  };

  const startRemoveFromCart = (producto) => {
    try {
      //dispatch(removeFromCartStart()); // Establece loading a true
      // Simulación de una operación sincrónica
      // (No hay necesidad de await o Promise ya que la operación es instantánea)
      dispatch(removeItem(producto));
      Swal.fire("Producto eliminado del carrito", "Éxito", "success");
    } catch (error) {
      dispatch(
        removeFromCartError("Error al eliminar el producto del carrito")
      );
      Swal.fire("Error al eliminar el producto del carrito", "Error", "error");
    }
  };

  const startClearCart = () => {
    try {
      dispatch(clearCart()); // Establece loading a true
      // Simulación de una operación sincrónica
      // (No hay necesidad de await o Promise ya que la operación es instantánea)
      Swal.fire("Carrito vacío", "Éxito", "success");
    } catch (error) {
      dispatch(error("Error al vaciar el carrito"));
      Swal.fire("Error al vaciar el carrito", "Error", "error");
    }
  };

  return {
    cart,
    totalQuantity,
    totalPrice,

    startAddToCart,
    startRemoveFromCart,
    startClearCart,
  };
};
