import { createContext, useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const agregarCarrito = (producto) => {
    let existsProduct = cart.find((item) => item.id === producto.id);
    if (existsProduct) {
      Swal.fire(
        "Producto agregado al carrito",
        "Se agregó a su carrito",
        "success"
      );
      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      Swal.fire(
        "Producto agregado al carrito",
        "Se agregó a su carrito",
        "success"
      );
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }
  };

  const incrementarCantidad = (idProduct) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === idProduct
          ? { ...item, cantidad: Math.min(item.cantidad + 1, 10) }
          : item
      )
    );
  };

  const decrementarCantidad = (idProduct) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === idProduct
            ? item.cantidad === 1
              ? (eliminarProductoCarrito(idProduct), null)
              : { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(Boolean)
    );
  };

  const calcularTotal = () => {
    let cantidad = 0;
    let precio = 0;
    cart.forEach((item) => {
      cantidad += item.cantidad || 0; // Asegurar que la cantidad sea un número válido
      precio += (item.cantidad || 0) * item.precio; // Asegurar que la cantidad sea un número válido
    });
    setTotalQuantity(cantidad);
    setTotalPrice(precio);
  };

  // useEffect para calcular el total cuando cambie el carrito
  useEffect(() => {
    calcularTotal();
  }, [cart]);

  // useEffect para guardar el carrito en el localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const limpiarCarrito = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const eliminarProductoCarrito = async (idProducto) => {
    try {
      setCart(cart?.filter((product) => product.id !== idProducto));
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "Ha ocurrido un error al eliminar el producto del carrito",
        "error"
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        totalPrice,
        agregarCarrito,
        eliminarProductoCarrito,
        incrementarCantidad,
        decrementarCantidad,
        limpiarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
